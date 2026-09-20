---
title: 提交前校验拦截
---

# 提交前校验拦截（BEFORE_SUBMIT）

## 什么时候用

提交前的最后一道自定义闸门：金额校验、库存检查、黑名单……不通过就不让单子流出去。

## API

`cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, handler)`

## 示例：报销金额不能为负

```js
function beforeSubmitHandler(next) {
  var amount = Number(cf.getFieldValue('报销金额') || 0)
  if (amount < 0) {
    // 不调用 next（或 next(false)）代表阻断
    cf.call('alert', { content: '报销金额不可以为负值哦~' })
    next(false)
  } else {
    // 调用 next() 允许继续提交
    next()
  }
}
cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, beforeSubmitHandler)
```

## 示例：退回前拦截智能退回

```js
function beforeReturnedHandler(next, payload) {
  // payload 含用户填写的审批意见 opinion、imgs、files
  if (payload.smartReturn) {
    cf.call('alert', { content: '本单据不允许智能退回' })
    next(false)
  } else {
    next()
  }
}
cf.addEventHook(cf.EVENT_HOOKS.BEFORE_RETURNED, beforeReturnedHandler)
```

## 注意事项

- 阻断后给用户明确提示（`alert`/`toast`），不要静默失败
- `BEFORE_*` 系列钩子都是同样的 next 模式，可复用此模板
- handler 建议用具名函数，方便 [移除](/yunzhijia-sdk/event/03-remove-hook)
