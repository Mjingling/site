---
title: 自定义接口闸门
---

# 调用自定义接口判断能否提交

## 需求

提交前调用企业自己的接口（如库存、预算、黑名单），接口说不行就不让提交。

## 思路

在 `BEFORE_SUBMIT` 钩子里发请求，**在 Promise 回调里再决定是否 `next()`** —— 这是本场景的关键：`next` 可以晚点调用，但绝不能在请求返回前放行。

## 完整代码

```js
function apiGateHandler(next) {
  var payload = {
    amount: cf.getFieldValue('报销金额'),
    applier: (cf.flow.getFlowApplier() || {}).name,
    title: cf.getFieldValue('标题')
  }

  cf.request({
    url: 'https://your-server.com/expense/gate',
    method: 'POST',
    data: payload,
    dataType: 'json'
  })
    .then(function (res) {
      if (res.data && res.data.pass) {
        next() // 接口放行
      } else {
        cf.call('alert', {
          title: '无法提交',
          content: (res.data && res.data.reason) || '校验未通过，请联系管理员'
        })
        next(false) // 接口拦截
      }
    })
    .catch(function () {
      // 网络异常的策略：这里选择放行并提示；管控严格的场景可改为 next(false)
      cf.call('toast', { status: 'error', content: '校验服务暂不可用，本次跳过校验' })
      next()
    })
}

cf.ready(function () {
  cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, apiGateHandler)
})
```

## 注意事项

- **`next()` 必须且只能在接口结论出来后调用一次** —— 提前调用等于没有闸门
- 超时兜底：接口很慢时用户会以为按钮失灵，服务端尽量 < 1s，或前端加 loading 提示
- 接口域名需在可信白名单内；跨域由服务端 CORS 解决
- 返回的 `reason` 直接展示给用户，让拦截可解释
