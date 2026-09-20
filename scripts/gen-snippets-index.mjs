#!/usr/bin/env node
/**
 * 片段索引生成脚本（零依赖，Node 18+）
 *
 * 扫描 docs/snippets/*.md，生成 docs/public/snippets-index.json，
 * 供 docs/.vitepress/theme/components/SnippetBrowser.vue 做站内搜索与标签筛选。
 *
 * 片段文件约定：
 * - frontmatter 必须包含 title / tags / lang / date（date 格式 YYYY-MM-DD）
 * - 每个小节使用「## 小节标题 {#锚点}」，锚点用于搜索结果的深链
 * - 注意：代码块内以「## 」开头的行也会被当作小节，请避免
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SNIPPETS_DIR = path.join(ROOT, 'docs', 'snippets')
const OUT_FILE = path.join(ROOT, 'docs', 'public', 'snippets-index.json')

/** 去掉首尾引号 */
function unquote(value) {
  const v = value.trim()
  if (v.length >= 2 && v[0] === v.at(-1) && (v[0] === '"' || v[0] === "'")) {
    return v.slice(1, -1)
  }
  return v
}

/**
 * 解析 --- 包裹的 frontmatter。
 * 仅支持本站用到的 YAML 子集：key: value、key: [a, b]、key: 块状列表。
 */
function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
  if (!match) return { data: {}, body: text }

  const data = {}
  let currentKey = null
  for (const rawLine of match[1].split(/\r?\n/)) {
    const trimmed = rawLine.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // 块状列表项：- xxx
    const listItem = /^-\s+(.+)$/.exec(trimmed)
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = []
      data[currentKey].push(unquote(listItem[1]))
      continue
    }

    const kv = /^([\w-]+)\s*:\s*(.*)$/.exec(rawLine)
    if (kv) {
      currentKey = kv[1]
      const value = kv[2].trim()
      if (value.startsWith('[') && value.endsWith(']')) {
        data[currentKey] = value
          .slice(1, -1)
          .split(',')
          .map((s) => unquote(s))
          .filter(Boolean)
      } else {
        data[currentKey] = unquote(value)
      }
    }
  }
  return { data, body: text.slice(match[0].length) }
}

/** 提取「## 标题 {#锚点}」小节；未写显式锚点时按标题生成（与 VitePress 规则接近） */
function parseSections(body) {
  const sections = []
  for (const line of body.split(/\r?\n/)) {
    const m = /^##\s+(.+?)\s*(?:\{#([^}\s]+)\})?\s*$/.exec(line)
    if (!m) continue
    sections.push({
      title: m[1].trim(),
      anchor: m[2] ? m[2] : m[1].trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-')
    })
  }
  return sections
}

const files = (await readdir(SNIPPETS_DIR))
  .filter((f) => f.endsWith('.md') && f !== 'index.md')
  .sort()

const items = []
for (const file of files) {
  const { data, body } = parseFrontmatter(await readFile(path.join(SNIPPETS_DIR, file), 'utf8'))

  for (const field of ['title', 'tags', 'lang', 'date']) {
    if (data[field] === undefined) {
      throw new Error(`docs/snippets/${file} 的 frontmatter 缺少字段：${field}`)
    }
  }

  items.push({
    file: file.replace(/\.md$/, ''),
    title: data.title,
    tags: Array.isArray(data.tags) ? data.tags : [data.tags],
    lang: data.lang,
    date: data.date,
    sections: parseSections(body)
  })
}

// 按日期倒序（同日按标题稳定排序）
items.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title, 'zh') : a.date < b.date ? 1 : -1))

if (!existsSync(path.dirname(OUT_FILE))) {
  await mkdir(path.dirname(OUT_FILE), { recursive: true })
}
await writeFile(OUT_FILE, JSON.stringify(items, null, 2) + '\n', 'utf8')
console.log(`✅ 片段索引已生成：${path.relative(ROOT, OUT_FILE)}（${items.length} 个片段）`)
