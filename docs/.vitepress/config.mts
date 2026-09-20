import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

// base 自适应：
// - 本地默认 '/'
// - CI（.github/workflows/deploy.yml）通过环境变量 BASE_PATH 传入：
//   仓库为「用户名.github.io」→ '/'，否则 → '/仓库名/'
const base = process.env.BASE_PATH || '/'

// 「云之家计算公式」侧边栏：总览置顶，函数按分类目录（与 cloudflow 源码
// FormFormula/functions/ 的分类一致）自动分组；新增 md 后需重启 dev / 重新构建
const FORMULA_CATEGORIES: Array<[dir: string, label: string]> = [
  ['math', '数学函数'],
  ['date', '日期函数'],
  ['text', '文本函数'],
  ['logic', '逻辑函数'],
  ['advanced', '高级函数'],
  ['data', '数据函数']
]

function formulaSidebar() {
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../yunzhijia-formulas')
  if (!fs.existsSync(dir)) return []

  const toItem = (fullPath: string, link: string) => ({
    text:
      /^title:\s*"(.+)"$/m.exec(fs.readFileSync(fullPath, 'utf-8').slice(0, 300))?.[1] ??
      path.basename(fullPath, '.md'),
    link
  })

  const overview = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .sort()
    .map((f) => toItem(path.join(dir, f), `/yunzhijia-formulas/${f.replace(/\.md$/, '')}`))

  const groups = FORMULA_CATEGORIES.filter(([cat]) => fs.existsSync(path.join(dir, cat))).map(
    ([cat, label]) => ({
      text: label,
      collapsed: true,
      items: fs
        .readdirSync(path.join(dir, cat))
        .filter((f) => f.endsWith('.md'))
        .sort()
        .map((f) => toItem(path.join(dir, cat, f), `/yunzhijia-formulas/${cat}/${f.replace(/\.md$/, '')}`))
    })
  )

  return [{ text: '总览', items: overview }, ...groups]
}

export default defineConfig({
  lang: 'zh-CN',
  title: '小枫学幽默的小站',
  description: '个人介绍、小工具、代码片段与捐赠',

  base,

  head: [['link', { rel: 'icon', href: '/avatar.png' }]],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '小工具', link: '/tools' },
      { text: '代码片段', link: '/snippets/' },
      { text: '云之家个性化开发', link: '/yunzhijia' },
      { text: '云之家计算公式', link: '/yunzhijia-formulas/' },
      { text: '捐赠', link: '/donate' }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Mjingling' }],

    // 云之家计算公式：函数手册侧边栏（自动生成）
    sidebar: {
      '/yunzhijia-formulas/': [{ text: '计算公式函数手册', items: formulaSidebar() }]
    },

    // 本地全文搜索：结果直接展示代码内容（detailedView），界面已汉化
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 界面文案汉化
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
