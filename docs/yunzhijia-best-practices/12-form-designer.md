---
title: 表单设计器属性注入
---

# 表单设计器属性注入

## 需求

- 模板设计阶段（不是填写阶段）批量微调控件属性：统一日期格式、统一附件数量上限
- 设计时读取某控件的完整属性做校验脚本

## 思路

`cf.formdesign` 面向**设计器**场景（SDK 源码 `src/formDesign/FormDesign.ts`）：

| API | 说明 |
| --- | --- |
| `getWidgetProps(selector)` | 读取控件属性对象 |
| `setWidgetProp(selector, propValueMap)` | 批量写入控件属性，成功返回 `true` |

配合 `cf.flow.getFormInfo()` 的 `widgetsMap` 可遍历全部控件；控件类型目录见源码 `src/modules/widget.ts` 的 `WidgetTypes`（如 `dateWidget`、`attachmentWidget`、`checkboxWidget`、`detailedWidget`…）。

## 完整代码

```js
cf.ready(function () {
  cf.flow.getFormInfo().then(function (formInfo) {
    var widgetsMap = formInfo.widgetsMap || {}

    Object.keys(widgetsMap).forEach(function (codeId) {
      var widget = widgetsMap[codeId]

      // 1. 所有日期控件统一格式为 yyyy-MM-dd
      if (widget.type === 'dateWidget') {
        cf.formdesign.setWidgetProp(codeId, { format: 'yyyy-MM-dd' })
      }

      // 2. 所有附件控件限制 5 个
      if (widget.type === 'attachmentWidget') {
        cf.formdesign.setWidgetProp(codeId, { limit: 5 })
      }
    })

    // 3. 读取单个控件完整属性
    var props = cf.formdesign.getWidgetProps('Te_0')
    console.log('控件完整属性', props)
  })
})
```

## 注意事项

- `setWidgetProp` 的可写属性以设计器运行时为准，写入不支持的 key 不会生效 —— 改动后**发布模板**验证一次
- 控件 `type` 字符串对照 `WidgetTypes` 目录（`dateWidget`、`imageWidget`、`detailedWidget` 等，源码 `src/modules/widget.ts`）
- 设计器场景与填写场景是两套 API：填写态用 `cf.form`，设计态用 `cf.formdesign`，别混用
