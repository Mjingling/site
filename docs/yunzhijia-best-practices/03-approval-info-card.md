---
title: 审批页辅助信息卡片
---

# 审批页辅助信息卡片

## 需求

审批人处理单据时，展示发起人的假期余额、部门月度报销统计等参考信息，辅助决策。

## 思路

只在**详情页**（`cf.helper.isApprovalDetail`）插入；`cf.request` 拿统计数据 → 拼 DOM → `insertAfterContainer` 插到标题容器后。样式随卡片一起注入，不污染全局。

## 完整代码

```js
cf.ready(function () {
  if (!cf.helper.isApprovalDetail) return // 只在详情页展示

  var applier = cf.flow.getFlowApplier()
  var who = (applier && applier.name) || '发起人'

  cf.request({
    url: 'https://your-server.com/stats/summary',
    method: 'POST',
    data: { user: who }
  })
    .then(function (res) {
      var d = (res.data || {})

      // 卡片样式（作用域限定在 .cf-assist-card 内）
      var style = document.createElement('style')
      style.textContent = [
        '.cf-assist-card{margin:8px 0;padding:12px 16px;border-radius:10px;',
        'background:#f5f3ff;border:1px solid #ddd6fe;color:#4c1d95;font-size:13px;line-height:1.8}',
        '.cf-assist-card b{margin-right:16px}',
        '@media (prefers-color-scheme: dark){.cf-assist-card{background:#1e1b2e;border-color:#3b2d63;color:#c4b5fd}}'
      ].join('')
      document.head.appendChild(style)

      var card = document.createElement('section')
      card.className = 'cf-assist-card'
      card.innerHTML =
        '<div><b>📋 审批参考</b></div>' +
        '<div>假期余额：<b>' + (d.leaveBalance || '-') + '</b>' +
        ' 本月部门报销：<b>¥' + (d.deptExpense || '0') + '</b></div>' +
        '<div>近 90 天单量：<b>' + (d.recentCount || '0') + '</b>' +
        ' 平均审批时长：<b>' + (d.avgHours || '-') + 'h</b></div>'

      var ok = cf.insertAfterContainer('_S_TITLE', card)
      if (!ok) console.warn('标题容器不存在，卡片未插入')
    })
    .catch(function () {
      console.warn('统计数据获取失败，跳过卡片插入')
    })
})
```

## 注意事项

- 用 `isApprovalDetail` 限定页面，避免发起页也出现卡片
- 接口失败时**跳过插入**而不是报错 —— 辅助信息不能阻塞审批
- `innerHTML` 拼接的内容来自自己的接口，注意服务端数据要转义，防注入
- 深色模式适配用 `prefers-color-scheme` 媒体查询（示例已包含）
