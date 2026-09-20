---
title: 明细表格操作
---

# 明细表格操作

## 什么时候用

对明细（表格）里某一行某个子控件精准取值/赋值/监听 —— 比整表读写更细粒度。

## API 一览

| API | 说明 |
| --- | --- |
| `getDetailFieldValue({parentCodeId, codeId, _id_})` | 取明细某行某控件的值 |
| `setDetailFieldValue({parentCodeId, codeId, _id_, value})` | 设置明细某行某控件的值 |
| `setDetailFieldState({parentCodeId, codeId, _id_, state})` | 设置明细某行某控件的状态 |
| `getDetailFieldProps({parentCodeId, codeId, _id_})` | 获取明细子控件属性（仅表单编辑模式） |

## 示例

```js
cf.ready(function () {
  var rowId = '1' // 明细行标识

  // 取值
  var price = cf.form.getDetailFieldValue({
    parentCodeId: 'Dd_0', // 明细控件 codeId
    codeId: 'Te_0',       // 子控件 codeId
    _id_: rowId
  })

  // 赋值
  cf.form.setDetailFieldValue({
    parentCodeId: 'Dd_0',
    codeId: 'Te_0',
    _id_: rowId,
    value: '自动填充的内容'
  })
})
```

## 非编辑态整表读写

```js
// 取整张明细
var detail = cf.form.getFieldValue('明细') // { widgetValue: [行, 行, ...] }

// 整表重设
cf.form.setFieldValue('明细', [ /* 新的行数组 */ ])
```

## 注意事项

- 行级 API 仅在**明细编辑状态**下生效；非编辑态用整表 getFieldValue / setFieldValue
- 监听明细内子控件值变化同样有对应的 listener API，用法同 [字段监听](/yunzhijia-sdk/form/03-field-change-listener)
- 实战案例可参考片段《[从明细中筛选符合条件记录并自动填充至主表单控件](/snippets/filter-detail-fill-main-form.html)》
