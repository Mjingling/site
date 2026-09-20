import { defineConfig } from 'vitepress'

// base 自适应：
// - 本地默认 '/'
// - CI（.github/workflows/deploy.yml）通过环境变量 BASE_PATH 传入：
//   仓库为「用户名.github.io」→ '/'，否则 → '/仓库名/'
const base = process.env.BASE_PATH || '/'

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
      { text: '捐赠', link: '/donate' }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Mjingling' }],

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
