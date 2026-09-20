---
title: JavaScript 防抖与节流
tags: [JavaScript, 性能优化]
lang: js
date: 2026-09-18
---

# JavaScript 防抖与节流

处理滚动、输入、resize 这类高频事件的两件套【占位：替换成你自己的常用实现】。

## 防抖 debounce {#debounce}

事件停止触发 N 毫秒后才执行，适合「输入框搜索联想」：

```js
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
```

## 节流 throttle {#throttle}

固定时间窗口内最多执行一次，适合「滚动加载、按钮防连点」：

```js
function throttle(fn, interval = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}
```

## 使用示例 {#usage}

```js
window.addEventListener('resize', debounce(() => console.log('resize end'), 200))
window.addEventListener('scroll', throttle(() => console.log('scrolling'), 100))
```
