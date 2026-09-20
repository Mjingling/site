<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import BackToTop from './components/BackToTop.vue'

const { Layout } = DefaultTheme
const route = useRoute()

onMounted(async () => {
  // 全站文档图片点击放大（medium-zoom）
  // 动态引入避免 SSR 阶段访问 window；路由切换后 refresh() 重新绑定新页面的图片
  const { default: mediumZoom } = await import('medium-zoom')
  const zoom = mediumZoom('.vp-doc img', {
    background: 'var(--vp-c-bg)',
    margin: 24
  })
  watch(
    () => route.path,
    () => nextTick(() => zoom.refresh())
  )
})
</script>

<template>
  <Layout>
    <!-- 挂在 layout-bottom 插槽：不覆盖默认导航与侧边栏 -->
    <template #layout-bottom>
      <BackToTop />
    </template>
  </Layout>
</template>
