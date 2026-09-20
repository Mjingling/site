---
title: 设置表单字段值 setFieldValue
---

# 设置表单字段值

## 什么时候用

自动填充默认值、接口回填、联动计算结果写回表单。

## API

`cf.form.setFieldValue(codeIdOrTitle, value)` —— 仅设置第一个同名标题的控件；赋值成功返回 `true`。

## 示例

```js
cf.ready(function () {
  cf.form.setFieldValue('标题', '张大山的请假申请')
  cf.form.setFieldValue('报销金额', '873')            // 数字/金额传字符串
  cf.form.setFieldValue('日期', 1646632642659)        // 日期传时间戳
  cf.form.setFieldValue('开始日期', [1646632642659, 1646755200000]) // 日期区间
  cf.form.setFieldValue('开关', true)
  cf.form.setFieldValue('图片', ['fileId1', 'fileId2']) // 云盘 fileId
  cf.form.setFieldValue('人员选择', [{ oid: 'xxx', name: '张三' }])
  cf.form.setFieldValue('部门选择', [{ id: 'xxx', name: '财务部' }])
})
```

## 单选/多选框：要传选项 key 而不是显示文字

```js
// 知道 key 直接传
cf.form.setFieldValue('单选框', 'AaBaCcDd')
cf.form.setFieldValue('多选框', ['AaBaCcDd', 'EeFfGgHh'])

// 只知道显示文字时，先查模板拿到 key
cf.flow.getFormInfo().then(function (formInfo) {
  var options = formInfo.widgetsMap['Ra_0'].options || []
  var matched = options.find(function (o) { return o.value === '单选框选项1' })
  if (matched) cf.form.setFieldValue('Ra_0', matched.key)
})
```

## 注意事项

- 清空：文本传 `''`、数组类传 `[]`、图片传 `[]`
- 运算控件、说明文字、流水号等系统控件**不可**赋值
- 明细内子控件请用 [明细操作](/yunzhijia-sdk/form/06-detail-ops)
