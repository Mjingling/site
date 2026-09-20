---
title: 获取表单字段值 getFieldValue
---

# 获取表单字段值

## 什么时候用

联动取值、提交前校验、把字段值传给自定义接口 —— 几乎所有个性化逻辑的第一步。

## API

- 按 codeId：`cf.form.getFieldValue(codeId)`
- 按标题：`cf.form.getFieldValue(title)`（仅匹配**第一个**同名标题的控件）

## 示例

```js
cf.ready(function () {
  var byCode = cf.form.getFieldValue('Te_0')      // 按 codeId
  var byTitle = cf.form.getFieldValue('文本框1')   // 按标题

  // 数字/金额控件返回的是纯数字字符串，参与运算前记得转型
  var amount = Number(cf.form.getFieldValue('报销金额') || 0)
})
```

## 常见控件返回值格式（速查）

| 控件 | 返回格式 | 说明 |
| --- | --- | --- |
| 单行/多行文本框 | `string` | 直接字符串处理 |
| 数字/金额输入框 | `string` | 纯数字字符串，如 `'123'` |
| 日期选择 | `number` | 毫秒时间戳，置空为 `null` |
| 日期区间 | `[number, number]` | 开始/结束时间戳 |
| 单选框 | `[{}]` | `{label, value}` |
| 多选框 | `[{}, {}]` | 同上，多项 |
| 人员/部门选择 | `[{}, {}]` | 单选时数组内只有一个对象 |
| 开关 | `boolean` | `true` 开 / `false` 关 |
| 图片上传 | `string[]` | 云盘 fileId 数组 |
| 文件上传 | `[{}, {}]` | 文件描述对象，含 `fileId` |
| 明细表格 | `{widgetValue: [{}]}` | 非编辑态下的整表值 |

## 注意事项

- 找不到控件时返回 `undefined`，建议先判空再使用
- 明细内子控件的取值请用 [明细操作](/yunzhijia-sdk/form/06-detail-ops) 的 API
