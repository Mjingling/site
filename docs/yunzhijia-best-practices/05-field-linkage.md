---
title: 字段联动显隐与只读
---

# 字段联动显隐与只读

## 需求

- 报销类型选「差旅」时才显示【出行城市】【住宿标准】
- 金额超过 5000 时【大额附件】变必填提示、【预算科目】只读
- 不同审批节点隐藏无关字段

## 思路

`addFieldValueChangeEventListener` 监听源字段 → 按值调用 `setFieldState` 控制目标字段；节点差异用 `getCurrentFlowNodeOperator` / helper 场景判断。

## 完整代码

```js
cf.ready(function () {
  // ---- 1. 类型联动显隐 ----
  function onTypeChange(value) {
    var isTravel = value && value[0] && value[0].value === '差旅'
    cf.form.setFieldState('出行城市', isTravel ? '' : 'hidden')
    cf.form.setFieldState('住宿标准', isTravel ? '' : 'hidden')
  }
  cf.form.addFieldValueChangeEventListener('报销类型', onTypeChange)
  onTypeChange(cf.form.getFieldValue('报销类型')) // 进页面先执行一次，处理草稿/回显值

  // ---- 2. 金额联动只读 ----
  function onAmountChange(value) {
    var big = Number(value || 0) > 5000
    cf.form.setFieldState('预算科目', big ? 'readOnly' : '')
    if (big) {
      cf.call('toast', { content: '金额超 5000，请上传大额附件', duration: 4000 })
      cf.form.triggerFieldValidate('大额附件') // 触发必填校验提示
    }
  }
  cf.form.addFieldValueChangeEventListener('报销金额', onAmountChange)
  onAmountChange(cf.form.getFieldValue('报销金额'))

  // ---- 3. 按操作人隐藏敏感字段 ----
  var operator = cf.flow.getCurrentFlowNodeOperator()
  var isFinance = operator && operator.name === '王财务'
  cf.form.setFieldState('内部成本', isFinance ? '' : 'hidden')
})
```

## 注意事项

- 监听绑好后**手动补执行一次**初始值判断 —— 草稿/回显的数据不会触发 change 事件
- 单选框的值是 `[{label, value}]` 数组，取 `value[0].value` 比较
- `setFieldState` 传空字符串恢复默认状态；系统控件（流水号/发起人等）只能 `hidden`
