---
title: 事件钩子总览
---

# 事件钩子总览

## 什么时候用

在流程流转的关键时机插入自定义逻辑：**校验拦截、埋点通知、提交后同步**。

## API

- 添加：`cf.addEventHook(hookName, handler)`
- 移除：`cf.removeEventHook(hookName, handler)`

## 全部钩子（`cf.EVENT_HOOKS`）

| 钩子名 | 时机 |
| --- | --- |
| `BEFORE_SUBMIT` | 提交前 |
| `AFTER_SUBMIT` | 提交后 |
| `BEFORE_AGREE` | 同意前 |
| `AFTER_AGREE` | 同意后 |
| `BEFORE_RETURNED` | 退回前 |
| `AFTER_RETURNED` | 退回后 |
| `BEFORE_DISAGREE` | 不同意前 |
| `AFTER_DISAGREE` | 不同意后 |

## handler 约定

```js
function handler(next, payload) {
  // next()       -> 不阻断，继续执行后续钩子
  // 不调用 next  -> 阻断本次流转
  // next(false)  -> 显式阻断
  // payload      -> 仅退回/不同意前钩子有：审批意见 opinion、imgs、files 等
}
```

## 示例

```js
cf.addEventHook(cf.EVENT_HOOKS.AFTER_SUBMIT, function () {
  // 提交成功后通知自己的服务器
  cf.request({ url: 'https://your-server.com/api/notify', method: 'POST', data: { type: 'submitted' } })
})
```

## 注意事项

- `BEFORE_*` 钩子在用户点击按钮后、请求发出前触发
- 具体拦截实战见 [提交前校验拦截](/yunzhijia-sdk/event/02-block-submit)
