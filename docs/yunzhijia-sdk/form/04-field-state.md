---
title: 设置字段状态 setFieldState
---

# 设置字段状态（显隐 / 只读）

## 什么时候用

按流程节点或字段值控制控件显示、隐藏、只读，减少无效填写。

## API

`cf.form.setFieldState(codeIdOrTitle, state)`，成功返回 `true`。常用 state：`'hidden'`、`'readOnly'`。

## 示例

```js
cf.ready(function () {
  // 按控件标题设置只读
  cf.form.setFieldState('合同编号', 'readOnly')

  // 条件隐藏：非财务审批人隐藏敏感字段
  var operator = cf.flow.getCurrentFlowNodeOperator()
  if (operator && operator.name !== '财务审核员') {
    cf.form.setFieldState('内部成本', 'hidden')
  }
})
```

## 明细内某行某控件的状态

```js
cf.form.setDetailFieldState({
  parentCodeId: 'Dd_0', // 明细控件 codeId
  codeId: 'Te_0',       // 子控件 codeId
  _id_: '1',            // 行标识
  state: 'readOnly'
})
```

## 注意事项

- 流水号 / 发起人 / 申请日期 / 编号 / 所属部门等系统控件**只允许** `hidden`
- 组合文本控件不支持设置状态
- 仅作用于第一个同名标题控件
