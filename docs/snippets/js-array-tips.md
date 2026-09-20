---
title: JavaScript 数组技巧
tags: [JavaScript, ES2020]
lang: js
date: 2026-09-10
---

# JavaScript 数组技巧

日常写脚本时最常用的几个数组操作【占位】。

## 数组去重 {#unique}

```js
const unique = (arr) => [...new Set(arr)]
unique([1, 1, 2, 3, 3]) // [1, 2, 3]
```

## 拍平嵌套数组 {#flat}

```js
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]
```

## 洗牌算法 {#shuffle}

Fisher–Yates，O(n) 且分布均匀：

```js
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
```
