<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="site-footer">
    <span>© 2026 小枫学幽默</span>
    <span class="sep">·</span>
    <a :href="withBase('/feed.xml')" target="_blank" rel="noopener">RSS 订阅</a>
    <span class="sep">·</span>
    <span>用 <a href="https://vitepress.dev" target="_blank" rel="noopener">VitePress</a> 构建</span>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 24px 16px 32px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.site-footer a {
  color: var(--vp-c-text-3);
  text-decoration: none;
  border-bottom: 1px dashed var(--vp-c-text-3);
}

.site-footer a:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.sep {
  color: var(--vp-c-divider);
}
</style>
