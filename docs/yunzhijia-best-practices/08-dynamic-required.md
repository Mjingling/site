---
title: 动态必填控制
---

# 动态必填控制（字段状态四态）

## 需求

- 报销金额 > 5000 时，【大额附件】自动变**必填**
- 差旅类型时【出行城市】必填，其他类型选填
- 提交被驳回后，发起人页面上某字段从只读恢复**可编辑**

## 思路

字段状态不止文档常见的 `hidden` / `readOnly` —— SDK 源码（`src/formDesign/validate.ts`）中合法状态共**四种**：

```
'hidden' | 'readOnly' | 'editable' | 'required'
```

按条件切换状态即可，`editable` 用来恢复可编辑、`required` 动态必填。

## 完整代码

```js
cf.ready(function () {
  // 金额档位 → 附件必填
  function onAmountChange(value) {
    var big = Number(value || 0) > 5000
    cf.form.setFieldState('大额附件', big ? 'required' : 'editable')
  }
  cf.form.addFieldValueChangeEventListener('报销金额', onAmountChange)
  onAmountChange(cf.form.getFieldValue('报销金额'))

  // 类型 → 城市必填
  function onTypeChange(value) {
    var isTravel = value && value[0] && value[0].value === '差旅'
    cf.form.setFieldState('出行城市', isTravel ? 'required' : 'editable')
  }
  cf.form.addFieldValueChangeEventListener('报销类型', onTypeChange)
  onTypeChange(cf.form.getFieldValue('报销类型'))

  // 被退回重填：恢复某字段可编辑
  if (cf.helper.isApplyCreateEdit) {
    cf.form.setFieldState('行程说明', 'editable')
  }
})
```

## 注意事项

- 状态值以源码 `WidgetStateArray` 为准，传错值会静默失败（控制台有 `state - 参数错误` 日志）
- `required` 只是加必填标记；真正的「不能提交」兜底仍建议配合 [提交前校验](/yunzhijia-best-practices/01-submit-amount-validate)
- 切换状态不会清空字段值，`hidden` 的字段值仍会随单据提交
