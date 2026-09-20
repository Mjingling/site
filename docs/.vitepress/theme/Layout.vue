<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import BackToTop from './components/BackToTop.vue'
import HeroAurora from './components/HeroAurora.vue'
import Typewriter from './components/Typewriter.vue'
import SiteFooter from './components/SiteFooter.vue'
import NotFound from './components/NotFound.vue'

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
      <SiteFooter />
      <BackToTop />
    </template>

    <!-- 首页 hero 装饰：极光背景 + 打字机标语 -->
    <template #home-hero-before>
      <HeroAurora />
    </template>
    <template #home-hero-actions-after>
      <Typewriter />
    </template>

    <!-- 自定义中文 404 页 -->
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
