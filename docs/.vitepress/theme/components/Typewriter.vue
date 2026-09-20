<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

// 轮播标语：换成你想展示的任意句子
const PHRASES = [
  '🔧 云之家个性化开发实战笔记',
  '📖 61 篇计算公式函数手册',
  '🧩 iframe 助手 Chrome 扩展',
  '🤖 智能体 & 常用代码片段'
]

const text = ref('')
let timer: ReturnType<typeof setTimeout> | null = null
let phraseIndex = 0
let charIndex = 0
let deleting = false

function tick() {
  const current = PHRASES[phraseIndex]
  if (!deleting) {
    charIndex++
    text.value = current.slice(0, charIndex)
    if (charIndex === current.length) {
      deleting = true
      timer = setTimeout(tick, 1800) // 完整展示停留
      return
    }
    timer = setTimeout(tick, 110)
  } else {
    charIndex--
    text.value = current.slice(0, charIndex)
    if (charIndex === 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % PHRASES.length
      timer = setTimeout(tick, 420) // 切句间隔
      return
    }
    timer = setTimeout(tick, 45)
  }
}

onMounted(() => {
  timer = setTimeout(tick, 600)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="type-line">
    <span class="type-arrow">▸</span>
    <span class="type-text">{{ text }}</span>
    <span class="type-caret" />
  </div>
</template>

<style scoped>
.type-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  min-height: 26px;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.type-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.type-caret {
  width: 2px;
  height: 18px;
  background: var(--vp-c-brand-1);
  animation: caret-blink 1s steps(1) infinite;
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}
</style>
