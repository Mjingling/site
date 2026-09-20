---
title: 吐司提示
---

# 弹出吐司提示

## 什么时候用

轻量反馈：校验不通过、操作成功、自动填充完成时的非阻断提示。

## API

`cf.call('toast', payload)` —— 弹出成功返回 Toast 实例（有 `close` 方法）。

## 示例

```js
cf.ready(function () {
  var payload = {
    status: 'warn',           // 'success' | 'error' | 'warn'，默认 warn
    content: '温馨提示：存在错误问题！', // 必填
    duration: 3000            // 毫秒；-1 表示不自动关闭
  }
  var instance = cf.call('toast', payload)

  // 需要手动关闭时
  setTimeout(function () {
    instance.close()
  }, 2000)
})
```

## 注意事项

- `content` 必填；其余可选
- `duration: -1` 不会自动关闭，记得留好 `close` 的触发路径
- 会阻断操作的提示请用 [alert 弹窗](/yunzhijia-sdk/ui/02-alert)
