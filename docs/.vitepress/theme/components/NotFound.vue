<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <h1>页面走丢了</h1>
    <p class="desc">这里什么都没有 —— 可能是链接过期，或者页面搬了家。</p>
    <div class="actions">
      <a class="btn primary" :href="withBase('/')">回首页</a>
      <a class="btn" href="javascript:history.back()">返回上一页</a>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 420px;
  margin: 0 auto;
  padding: 96px 24px 64px;
  text-align: center;
}

.code {
  font-size: 80px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(120deg, var(--vp-c-brand-2), #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 16px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.btn.primary:hover {
  opacity: 0.9;
}
</style>
