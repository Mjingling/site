---
title: CSS 常用片段
tags: [CSS, 布局]
lang: css
date: 2026-08-28
---

# CSS 常用片段

## 渐变文字 {#gradient-text}

```css
.gradient-text {
  background: linear-gradient(120deg, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

## 单行 / 多行省略号 {#ellipsis}

```css
/* 单行 */
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 两行 */
.ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

## 水平垂直居中 {#center}

```css
.center {
  display: grid;
  place-items: center;
}
```
