<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

// 数据来自构建脚本生成的 docs/public/snippets-index.json
const items = ref([])
const loading = ref(true)
const keyword = ref('')
const activeTag = ref('')

onMounted(async () => {
  try {
    const res = await fetch(withBase('/snippets-index.json'))
    items.value = await res.json()
  } catch (e) {
    console.error('加载片段索引失败，请先运行 npm run snippets-index', e)
  } finally {
    loading.value = false
  }
})

const allTags = computed(() => {
  const set = new Set()
  for (const item of items.value) {
    for (const t of item.tags || []) set.add(t)
  }
  return [...set]
})

// 实时过滤：标题 / 标签 / 小节名，命中任意一个即返回；与标签筛选叠加
const filtered = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  const tag = activeTag.value
  return items.value.filter((item) => {
    if (tag && !(item.tags || []).includes(tag)) return false
    if (!q) return true
    if (item.title.toLowerCase().includes(q)) return true
    if ((item.tags || []).some((t) => t.toLowerCase().includes(q))) return true
    if ((item.sections || []).some((s) => s.title.toLowerCase().includes(q))) return true
    return false
  })
})

// 再点一次取消筛选
function toggleTag(tag) {
  activeTag.value = activeTag.value === tag ? '' : tag
}

function pageLink(file) {
  return withBase(`/snippets/${file}.html`)
}

function anchorLink(file, anchor) {
  return `${pageLink(file)}#${anchor}`
}
</script>

<template>
  <div class="snippet-browser">
    <div class="snippet-toolbar">
      <input
        v-model="keyword"
        class="snippet-search"
        type="search"
        placeholder="搜索标题 / 标签 / 小节名…"
        aria-label="搜索片段"
      />
      <div v-if="allTags.length" class="snippet-tags">
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          class="snippet-tag"
          :class="{ active: tag === activeTag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <p v-if="loading" class="snippet-status">正在加载片段索引…</p>
    <p v-else-if="!filtered.length" class="snippet-status">
      没有匹配的片段，换个关键词或标签试试？
    </p>

    <div v-else class="snippet-cards">
      <article v-for="item in filtered" :key="item.file" class="snippet-card">
        <div class="snippet-card-head">
          <a :href="pageLink(item.file)" class="snippet-card-title">{{ item.title }}</a>
          <span class="snippet-lang">{{ item.lang }}</span>
        </div>
        <div class="snippet-card-meta">
          <time :datetime="item.date">{{ item.date }}</time>
          <span v-for="t in item.tags" :key="t" class="snippet-card-tag"># {{ t }}</span>
        </div>
        <ul v-if="item.sections && item.sections.length" class="snippet-sections">
          <li v-for="s in item.sections" :key="s.anchor">
            <a :href="anchorLink(item.file, s.anchor)">{{ s.title }}</a>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<!-- 全部使用 VitePress CSS 变量，深浅色模式自动适配 -->
<style scoped>
.snippet-browser {
  margin-top: 8px;
}

.snippet-toolbar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.snippet-search {
  width: 100%;
  max-width: 420px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s;
}

.snippet-search:focus {
  border-color: var(--vp-c-brand-1);
}

.snippet-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.snippet-tag {
  padding: 3px 12px;
  font-size: 13px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.snippet-tag:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.snippet-tag.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.snippet-status {
  padding: 24px 0;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.snippet-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.snippet-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, transform 0.2s;
}

.snippet-card:hover {
  border-color: var(--vp-c-brand-3);
  transform: translateY(-2px);
}

.snippet-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.snippet-card-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.snippet-card-title:hover {
  color: var(--vp-c-brand-1);
}

.snippet-lang {
  flex-shrink: 0;
  padding: 1px 8px;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.snippet-card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.snippet-card-tag {
  color: var(--vp-c-brand-1);
}

.snippet-sections {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.snippet-sections a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.snippet-sections a:hover {
  color: var(--vp-c-brand-1);
}
</style>
