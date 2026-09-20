---
title: 多语言环境
---

# 多语言环境（cf.env）

## 什么时候用

自定义卡片/提示文案需要跟随系统语言时，按 `cf.env.language` 输出对应文案。

## API

`cf.env.language` —— 当前项目语言，如 `'zh-CN'`（简体中文）、`'en-US'`（英文）。

## 示例

```js
cf.ready(function () {
  var i18n = {
    'zh-CN': { tip: '报销金额不能为负数' },
    'en-US': { tip: 'Expense amount cannot be negative' }
  }
  var lang = cf.env.language || 'zh-CN'
  var text = (i18n[lang] || i18n['zh-CN']).tip

  cf.addEventHook(cf.EVENT_HOOKS.BEFORE_SUBMIT, function (next) {
    if (Number(cf.getFieldValue('报销金额') || 0) < 0) {
      cf.call('alert', { content: text })
      next(false)
    } else {
      next()
    }
  })
})
```

## 注意事项

- 取不到时做好默认语言兜底（示例中的 `|| 'zh-CN'`）
- `cf.env` 下还有其他环境信息，以 SDK 文档「数据结构」章节为准
