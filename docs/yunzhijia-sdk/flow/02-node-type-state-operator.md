---
title: 节点类型 / 状态 / 操作人
---

# 节点类型、状态与操作人

## 什么时候用

- 按**节点类型**（审批/抄送/办理）决定是否执行逻辑
- 按**状态**判断单据是进行中还是已结束
- 按**当前操作人**做权限相关的显隐控制

## API

| API | 说明 |
| --- | --- |
| `cf.flow.getCurrentFlowNodeType()` | 当前流程节点类型 |
| `cf.flow.getCurrentFlowNodeState()` | 当前流程节点状态 |
| `cf.flow.getCurrentFlowNodeOperator()` | 当前流程节点操作人 |

## 示例

```js
cf.ready(function () {
  var type = cf.flow.getCurrentFlowNodeType()
  var state = cf.flow.getCurrentFlowNodeState()
  var operator = cf.flow.getCurrentFlowNodeOperator()

  // 示例：仅审批节点且特定操作人可见成本字段
  if (operator && operator.name === '王财务') {
    cf.form.setFieldState('内部成本', 'readOnly')
  } else {
    cf.form.setFieldState('内部成本', 'hidden')
  }
})
```

## 注意事项

- 开始节点相关接口暂不支持，务必判空
- 操作人对象结构以运行时返回为准，先 `console.log` 看一眼再写字段判断
