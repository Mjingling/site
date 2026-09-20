---
title: 警告弹窗 alert
---

# 弹出警告弹窗 alert

## 什么时候用

需要用户确认后再继续的场景：二次确认、错误阻断说明。调用后会阻断页面，后续逻辑写在 then/catch 里。

## API

`cf.call('alert', payload)` —— 返回 Promise：确认走 `then`，取消走 `catch`。

## 示例

```js
cf.ready(function () {
  cf.call('alert', {
    title: '提示',                              // 可选，默认「标题」
    content: '确定要提交吗？',                   // 必填
    onlyAlert: false,                          // 可选：true 则只有确认按钮
    confirmBtnTxt: '确定',
    cancelBtnTxt: '取消',
    textAlign: 'center'
  })
    .then(function () {
      cf.call('toast', { status: 'success', content: '你点击了确定' })
      // 确认后的业务逻辑写在这里
    })
    .catch(function () {
      cf.call('toast', { status: 'warn', content: '你点击了取消' })
    })
  // ⚠️ 在这下面同步编写的代码不会等待用户操作，属于无效逻辑
})
```

## 注意事项

- **弹窗后面的代码要写进 then/catch**，直接跟在后面写的同步代码会立即执行
- `header` 里不能设置 Referer（同 request 的限制）
