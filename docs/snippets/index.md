---
title: 代码片段
description: 可搜索、可按标签筛选的代码片段合集
---

# 代码片段

这里收录我常用的代码片段：

- 下方支持按**标题 / 标签 / 小节名**实时搜索，点击标签胶囊可筛选（再点一次取消）
- 右上角的搜索框是全站全文搜索（开启详细视图，结果直接展示代码内容）

新增片段：在 `docs/snippets/` 下新建 Markdown 文件（frontmatter 含 `title` / `tags` / `lang` / `date`，小节用 `## 标题 {#锚点}`），重新构建后会自动进入本页索引与 RSS。格式详见仓库 README。

<ClientOnly>
  <SnippetBrowser />
</ClientOnly>
