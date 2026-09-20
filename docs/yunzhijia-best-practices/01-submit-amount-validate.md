---
title: 提交前金额校验
---

# 提交前金额校验

## 需求

报销单提交时，若【报销金额】为负数，阻断提交并提示用户。

## 思路

`BEFORE_SUBMIT` 钩子里取值校验；不通过则 `next(false)` 阻断并用 `alert` 说明原因。金额控件返回的是**字符串**，先 `Number` 转型。

## 完整代码

```js
function beforeSubmitHandler(next) {
  var raw = cf.getFieldValue('报销金额') // 字符串，如 '873'
  var amount = Number(raw || 0)

  if (raw === undefined || raw === '') {
    cf.call('alert', { content: '请先填写报销金额' })
    next(false)
    return
  }
  if (amount < 0) {
    cf.call('alert', { content: '报销金额不可以为负值哦~' })
    next(false) // 阻断提交
    return
  }
  next() // 放行
}

cf.ready(function () {
  cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, beforeSubmitHandler)
})
```

## 注意事项

- 金额/数字控件返回纯数字**字符串**，直接比较 `'873' < 0` 结果不可靠，务必转型
- 提示用 `alert`（阻断式）而不是 `toast`，用户更容易注意到
- handler 用具名函数，便于后续移除或防重复绑定
