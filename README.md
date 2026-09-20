# 个人静态网站（VitePress 1.x）

基于 VitePress 的个人站点：首页、关于我、小工具与友链、可搜索的代码片段、捐赠、微信公众号引流；自带 Atom RSS 与 GitHub Pages 自动部署。

## 功能一览

- **首页**：hero 主标题紫→粉渐变文字、圆形头像（带渐变光晕）、三个快捷按钮、四个板块卡片
- **代码片段**：构建时生成 `snippets-index.json`，前端组件支持实时搜索（标题/标签/小节名）与标签胶囊筛选（再点取消）；同时保留 VitePress 本地全文搜索（`detailedView: true`，界面已汉化）
- **主题**：扩展默认主题实现（`extends: DefaultTheme`），紫色系配色（`#6d28d9`），深色模式为浅紫变量
- **交互**：返回顶部按钮（滚动超过约 400px 出现，移动端位置自适应）、medium-zoom 图片点击放大（路由切换自动重绑）
- **RSS**：构建时生成 Atom 格式 `feed.xml`（最新 20 篇）
- **CI**：push 到 `main` 自动部署 GitHub Pages，`base` 按仓库名自适应

## 环境要求

- Node.js ≥ 20
- Python 3（RSS 脚本，仅用标准库，无需安装依赖）

## 本地开发

```bash
npm install
npm run dev     # 生成片段索引 + RSS，然后启动开发服务器
```

其他命令：

```bash
npm run snippets-index   # 仅生成 docs/public/snippets-index.json
npm run rss              # 仅生成 docs/public/feed.xml
npm run build            # 片段索引 → RSS → vitepress build
npm run preview          # 本地预览构建产物
```

> 开发模式下新增/修改片段 md 后，索引不会热更新，需重启 `npm run dev`（或手动执行 `npm run snippets-index`）。
>
> 如果 `npm install` 很慢或失败：本项目 `package-lock.json` 是从公共镜像 npmmirror 解析的，也可以删掉 lockfile 后用你自己的 registry 重新安装。

## 新增代码片段

在 `docs/snippets/` 下新建 md 文件：

```md
---
title: 片段标题
tags: [标签1, 标签2]
lang: js
date: 2026-09-20
---

# 片段标题

## 小节名 {#anchor}

代码……
```

规则：

- `frontmatter` 四个字段必填（缺一构建时会直接报错提示）
- `date`（`YYYY-MM-DD`）同时决定 RSS 收录与片段卡片排序（倒序）；不想进 RSS 的页面不要写 `date`
- 小节请始终写显式锚点 `{#...}`，搜索结果的深链依赖它
- 注意：代码块里以 `## ` 开头的行会被索引脚本误认为小节，请避免

## 配置 RSS

编辑 `scripts/gen_rss.py` 顶部常量：`SITE_URL` / `SITE_TITLE` / `SITE_AUTHOR` / `SITE_DESCRIPTION`。

> 子路径部署（仓库名不是 `用户名.github.io`）时，`SITE_URL` 需包含子路径，如 `https://user.github.io/repo`。

## 部署到 GitHub Pages

1. 把仓库推到 GitHub 的 `main` 分支
2. 仓库 **Settings → Pages → Build and deployment → Source 选择 GitHub Actions**（只需设置一次）
3. 之后 push 到 `main` 会自动构建部署；`base` 自动适配：仓库为 `用户名.github.io` 时为 `/`，否则为 `/仓库名/`（见 `.github/workflows/deploy.yml`）

## 想改什么 → 改哪个文件

| 想改什么 | 改哪里 |
| --- | --- |
| 站点名 / 描述 / 导航 / 社交链接 / 搜索汉化 | `docs/.vitepress/config.mts` |
| 首页 hero 与板块卡片 | `docs/index.md` |
| 个人介绍 / 公众号版块 | `docs/about.md` |
| 小工具 / 友链 / 交换友链说明 | `docs/tools.md` |
| 捐赠按钮 / 收款码 / 公众号引流 | `docs/donate.md` |
| 片段总览页文案 | `docs/snippets/index.md` |
| 新增片段 | `docs/snippets/` 下新建 md |
| 片段索引生成逻辑 | `scripts/gen-snippets-index.mjs` |
| RSS 站点信息 | `scripts/gen_rss.py` 顶部常量 |
| 主题色 / 渐变标题 / 头像光晕 / 二维码卡片样式 | `docs/.vitepress/theme/custom.css` |
| 返回顶部按钮 | `docs/.vitepress/theme/components/BackToTop.vue` |
| 片段搜索组件 | `docs/.vitepress/theme/components/SnippetBrowser.vue` |
| 图片点击放大 / Layout 插槽挂载 | `docs/.vitepress/theme/Layout.vue` |
| 部署流程 / base 计算 | `.github/workflows/deploy.yml` |

## 替换占位内容

- 文中所有 `【请替换】` 字样按提示改为真实信息
- `docs/public/` 下的占位图同名覆盖即可：
  - `avatar.png` — 头像（建议正方形 ≥ 400px）
  - `wechat-mp-qr.png` — 微信公众号二维码
  - `donate-wechat-qr.png` / `donate-alipay-qr.png` — 收款码
- 文件名含 `qr` 的图片会自动套白底圆角卡片样式（保证扫码清晰）；重命名时请保留 `qr` 字样，或同步修改 `custom.css` 里的 `img[src*='qr']` 选择器
