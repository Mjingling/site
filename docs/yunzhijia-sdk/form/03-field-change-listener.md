---
title: 监听字段值改变
---

# 监听字段值改变

## 什么时候用

字段联动：A 变了自动改 B（自动计算、联动显隐、级联填充）。

## API

- 添加：`cf.form.addFieldValueChangeEventListener(codeIdOrTitle, handler)`，成功返回 `true`
- 移除：`cf.form.removeFieldValueChangeEventListener(codeIdOrTitle, handler)`（仅表单编辑态可用）

## 示例

```js
cf.ready(function () {
  // 记录 handler 引用，移除时要用同一个引用
  function onAmountChange(value) {
    // 回调参数 value 的格式同 getFieldValue 的返回值
    var amount = Number(value || 0)
    if (amount > 10000) {
      cf.form.setFieldValue('大额备注', '金额超限，需附件说明')
    }
  }

  var ok = cf.form.addFieldValueChangeEventListener('报销金额', onAmountChange)

  // 不再需要时移除
  // cf.form.removeFieldValueChangeEventListener('报销金额', onAmountChange)
})
```

## 注意事项

- 回调参数 `value` 的格式与 `getFieldValue` 一致（数组控件拿到数组、日期拿到时间戳）
- 移除监听必须传**同一个函数引用**，匿名函数无法移除
- 明细内子控件的监听见 [明细操作](/yunzhijia-sdk/form/06-detail-ops)
