---
title: 获取当前流程节点 getCurrentFlowNode
---

# 获取当前流程节点信息

## 什么时候用

按节点差异化逻辑：同一张表单，在不同审批节点展示不同内容、执行不同校验。

## API

`cf.flow.getCurrentFlowNode()`（开始节点暂不支持）

## 示例

```js
cf.ready(function () {
  var nodeInfo = cf.flow.getCurrentFlowNode()
  if (!nodeInfo) return // 开始节点拿不到，注意判空

  if (nodeInfo.name === '财务复核') {
    // 只在财务复核节点插入辅助卡片 / 只读控制
    cf.form.setFieldState('内部成本', 'readOnly')
  }
})
```

## 注意事项

- **开始（发起）节点暂不支持**，返回值注意判空
- 配合 `getCurrentFlowNodeType()` / `getCurrentFlowNodeState()` 使用可做更精细的分支
- 拿整单流程上下文用 `cf.flow.getFlowInfo()`
