---
title: 请假次数拦截
---

# 请假次数拦截

## 需求

发起请假单时，若本月已请假 3 次，不允许再发起。

## 思路

请假次数通常来自服务端（表单上没有现成字段）：`cf.ready` 后先 `cf.request` 查次数，把结果记到闭包变量；`BEFORE_SUBMIT` 时按闭包结果决定放行或阻断。

## 完整代码

```js
cf.ready(function () {
  var leaveCount = 0 // 服务端返回的本月请假次数

  // 1. 进页面就查好次数（异步，不阻塞用户填写）
  cf.request({
    url: 'https://your-server.com/leave/count',
    method: 'POST',
    data: { month: new Date().getMonth() + 1 }
  })
    .then(function (res) {
      leaveCount = (res.data && res.data.count) || 0
      if (leaveCount >= 3) {
        cf.call('toast', {
          status: 'warn',
          content: '你本月已请假 ' + leaveCount + ' 次，提交将被拦截',
          duration: 5000
        })
      }
    })
    .catch(function () {
      console.warn('次数查询失败，按不拦截处理（按业务需要也可改为拦截）')
    })

  // 2. 提交前按查询结果拦截
  cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, function (next) {
    if (leaveCount >= 3) {
      cf.call('alert', { content: '你本月已请三次假，不可以再请假了哦~' })
      next(false)
    } else {
      next()
    }
  })
})
```

## 注意事项

- 接口失败时的策略要想清楚：**放行**（可用性优先）还是**拦截**（管控优先）
- 查询放在 `cf.ready` 里立刻执行，用户填完表单时结果大概率已就绪
- 次数也可以在提交钩子里实时查询，但要处理异步时序（请求返回前不要调用 `next`）
