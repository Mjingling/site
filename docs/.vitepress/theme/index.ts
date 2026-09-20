import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import SnippetBrowser from './components/SnippetBrowser.vue'
import './custom.css'

// 扩展默认主题：保留默认导航/侧边栏/搜索，仅注入自定义 Layout 与片段搜索组件
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('SnippetBrowser', SnippetBrowser)
  }
}
