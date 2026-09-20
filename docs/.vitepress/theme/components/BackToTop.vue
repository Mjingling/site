<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const THRESHOLD = 400 // 滚动超过约 400px 出现
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // 处理刷新后已在页面中部的情况
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="backtop-fade">
    <button
      v-show="visible"
      class="back-to-top"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
      @click="scrollToTop"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.5rem;
  bottom: 3rem;
  z-index: 30;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  box-shadow: var(--vp-shadow-1);
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}

.back-to-top:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* 移动端：稍微上移、缩小，避免遮挡底部内容 */
@media (max-width: 768px) {
  .back-to-top {
    right: 1rem;
    bottom: 5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* 淡入淡出 + 轻微上移过渡 */
.backtop-fade-enter-active,
.backtop-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.backtop-fade-enter-from,
.backtop-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
