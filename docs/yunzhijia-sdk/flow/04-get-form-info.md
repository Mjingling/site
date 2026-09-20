---
title: 获取表单模板信息
---

# 获取表单模板信息

## 什么时候用

- 拿控件的 `options` 反查单选/多选框的 key（赋值需要 key 而非显示文字）
- 遍历控件做批量处理（如全部明细子控件）

## API

`cf.flow.getFormInfo()`，返回 Promise，resolve 表单模板信息。

## 示例

```js
cf.ready(function () {
  cf.flow.getFormInfo().then(function (formInfo) {
    // widgetsMap: codeId -> 控件定义
    var radio = formInfo.widgetsMap['Ra_0']

    // 已知显示文字，反查选项 key 后赋值
    var matched = (radio.options || []).find(function (o) {
      return o.value === '紧急'
    })
    if (matched) {
      cf.form.setFieldValue('Ra_0', matched.key)
    }
  })
})
```

## 注意事项

- 模板信息里控件定义较多，只取需要的 `widgetsMap[codeId]`
- 与 [设置字段值](/yunzhijia-sdk/form/02-set-field-value) 配合解决「只知道显示文字」的赋值问题
