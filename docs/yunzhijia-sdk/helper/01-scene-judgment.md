---
title: 页面场景判断 cf.helper
---

# 页面场景判断（cf.helper）

## 什么时候用

同一段脚本会注入多个页面（发起/详情/草稿/编辑）时，先判断场景再执行对应逻辑，避免误伤。

## API 一览

| 属性 | 说明 |
| --- | --- |
| `cf.helper.isApprovalDetail` | 是否单据详情页 |
| `cf.helper.isApprovalDraftDetail` | 是否单据草稿详情页 |
| `cf.helper.isApprovalEdit` | 是否审批编辑页 |
| `cf.helper.isApplyCreate` | 是否发起创建页 |
| `cf.helper.isApplyCreateEdit` | 是否发起编辑页 |
| `cf.helper.isApplyDraftEdit` | 是否发起草稿编辑页 |
| `cf.helper.isMobile` | 是否移动端 |
| `cf.helper.getUrlObj()` | 解析当前 URL |

## 示例

```js
cf.ready(function () {
  // 只在详情页插入辅助卡片
  if (cf.helper.isApprovalDetail) {
    var card = document.createElement('section')
    card.textContent = '审批参考信息……'
    cf.insertAfterContainer('_S_TITLE', card)
  }

  // 只在发起页做自动填充
  if (cf.helper.isApplyCreate) {
    cf.form.setFieldValue('申请日期', Date.now())
  }

  // 移动端差异化处理
  if (cf.helper.isMobile) {
    console.log('移动端逻辑')
  }
})
```

## 注意事项

- 这些是**属性**不是方法（`isMobile` 不带括号）
- 还有更多设备/浏览器布尔属性（`cf.isWX`、`cf.isMiniApp`、`cf.isHarmony`、`cf.isAndroid` 等），见 SDK 文档 `static` 章节
