---
title: 云之家 JS SDK 片段
description: 智能审批 JS-SDK（cloudflow-js-sdk）常用 API 速查，按模块分类
---

# 云之家 JS SDK 片段

[智能审批 JS-SDK]（`@cloudflow/cloudflow-js-sdk`，源码仓库 `cloudflow-js-sdk`）用于在表单发起、审批、流转过程中添加自定义行为。本板块按模块整理最常用的 API 片段，左侧边栏可按分类浏览，示例均整理自 SDK 官方文档（`docs/open/`，SDK 版本 v0.10.29）。

> ⚠️ **所有 API 必须在 `cf.ready()` 回调中使用**，否则可能因 SDK 未初始化而报错：
>
> ```js
> cf.ready(function () {
>   // 这里写你的逻辑
> })
> ```

## 模块导航

| 模块 | 内容 |
| --- | --- |
| [表单字段](/yunzhijia-sdk/form/01-get-field-value) | 取值 / 赋值 / 监听变化 / 显隐只读 / 校验 / 明细操作 |
| [流程信息](/yunzhijia-sdk/flow/01-current-node) | 当前节点 / 节点类型状态 / 操作人 / 发起人 / 表单模板 |
| [事件钩子](/yunzhijia-sdk/event/01-hooks-overview) | 提交、同意、退回、不同意的前后拦截 |
| [界面交互](/yunzhijia-sdk/ui/01-toast) | toast / alert / 插入自定义 DOM 卡片 |
| [网络请求](/yunzhijia-sdk/request/01-request) | `cf.request` 调用自定义接口 |
| [环境与工具](/yunzhijia-sdk/helper/01-scene-judgment) | 页面场景判断 / 多语言环境 |

## 典型用法一览

```js
// 1. 取值与赋值
var amount = cf.form.getFieldValue('报销金额')
cf.form.setFieldValue('备注', '已自动填充')

// 2. 提交前拦截（不调用 next 即阻断）
cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, function (next) {
  if (Number(amount) < 0) {
    cf.call('alert', { content: '报销金额不能为负数' })
  } else {
    next()
  }
})

// 3. 审批页插入辅助信息卡片
cf.ready(function () {
  var card = document.createElement('section')
  card.innerHTML = '<div>当前部门本月报销统计……</div>'
  cf.insertAfterContainer('_S_TITLE', card)
})
```

更多完整场景见 [最佳实践](/yunzhijia-best-practices/)。
