---
title: 触发字段校验 triggerFieldValidate
---

# 触发表单字段校验

## 什么时候用

在自定义逻辑修改了字段值后，手动触发该字段的校验规则，让红字提示即时刷新。

## API

`cf.form.triggerFieldValidate(codeIdOrTitle)`，成功返回 `true`。

## 示例

```js
cf.ready(function () {
  // 联动改值后触发校验，确保必填/格式提示同步
  cf.form.setFieldValue('联系电话', '13800138000')
  var ok = cf.form.triggerFieldValidate('联系电话')
  if (!ok) {
    console.warn('控件不存在或触发失败')
  }
})
```

## 注意事项

- 只触发**校验提示**，不会阻断提交；要阻断流转请用 [事件钩子](/yunzhijia-sdk/event/02-block-submit)
- 仅作用于第一个同名标题控件
