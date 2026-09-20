---
title: 提交后跳转与刷新
---

# 提交后跳转与刷新

## 需求

- 提交成功后给个成功提示，并自动刷新页面状态
- 批量处理场景：提交完当前单据，自动跳到下一单的审批编辑页继续处理

## 思路

`cf.route` 提供页面导航能力（SDK 类型定义 `src/types/sdk.ts`）：

| API | 说明 |
| --- | --- |
| `push(config)` | 跳转到指定页面 |
| `redirectTo(config)` | 重定向（不可回退） |
| `refreshPage()` | 刷新当前页面 |
| `resolveUrl(config)` | 只解析 URL 不跳转 |

内置页面名（源码 `_pageNames`）：`apply-create`（发起）、`apply-draft`（发起草稿）、`approval-edit`（审批编辑）、`approval-detail`（单据详情）、`approval-draft`（单据草稿）。

## 完整代码

```js
cf.ready(function () {
  // 1. 提交成功：提示 + 刷新
  cf.addEventHook(cf.EVENT_HOOKS.AFTER_SUBMIT, function () {
    cf.call('toast', { status: 'success', content: '提交成功，页面即将刷新' })
    setTimeout(function () {
      cf.route.refreshPage()
    }, 1200)
  })

  // 2. 审批完成后跳到下一单（示意：next 从自己的待办接口拿）
  cf.addEventHook(cf.EVENT_HOOKS.AFTER_AGREE, function () {
    getNextTodo().then(function (next) {
      if (!next) return
      cf.route.push({
        name: 'approval-edit',
        params: {
          flowInstId: next.flowInstId,
          formCodeId: next.formCodeId,
          formDefId: next.formDefId,
          formInstId: next.formInstId
        }
      })
    })
  })
})
```

## 注意事项

- 跳 `approval-edit` 需要四个 id（`flowInstId` / `formCodeId` / `formDefId` / `formInstId`），从待办列表接口或 `cf.flow.getFlowInfo()` 中取
- 移动端与 PC 端路由参数结构不同（源码对两端做了适配），传 params 即可，别自己拼 URL
- `AFTER_*` 钩子里跳转前留出 toast 时间，避免用户没看到成功提示页面就切走
