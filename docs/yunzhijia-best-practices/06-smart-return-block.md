---
title: 智能退回拦截
---

# 智能退回拦截

## 需求

某些单据（如已进入财务归档流程）不允许审批人使用「智能退回」，普通退回不受影响。

## 思路

`BEFORE_RETURNED` 钩子的 `payload` 里带 `smartReturn` 标志（以及用户填写的审批意见 `opinion`、`imgs`、`files`），按标志决定放行。

## 完整代码

```js
function beforeReturnedHandler(next, payload) {
  // payload: { opinion, imgs, files, smartReturn, returnActivityInstId, ... }
  if (payload && payload.smartReturn) {
    cf.call('alert', {
      title: '不允许智能退回',
      content: '本单据已进入归档流程，请使用普通退回联系发起人修改。'
    })
    next(false)
    return
  }
  next()
}

cf.ready(function () {
  cf.addEventHook(cf.EVENT_HOOKS.BEFORE_RETURNED, beforeReturnedHandler)
})
```

## 变体：退回前必须填意见

```js
cf.addEventHook(cf.EVENT_HOOKS.BEFORE_RETURNED, function (next, payload) {
  if (!payload || !payload.opinion || !String(payload.opinion).trim()) {
    cf.call('alert', { content: '退回前请填写审批意见，说明退回原因' })
    next(false)
  } else {
    next()
  }
})
```

## 注意事项

- `BEFORE_DISAGREE`（不同意前）钩子的 payload 同样带 `opinion/imgs/files`，可复用「必须填意见」模板
- 阻断提示要说明**为什么**以及**该怎么操作**，降低审批人困惑
