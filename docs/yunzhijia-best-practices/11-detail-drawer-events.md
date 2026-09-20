---
title: 明细抽屉事件
---

# 明细抽屉事件

## 需求

- 用户点开明细行编辑抽屉**之前**，预填一些默认值
- 抽屉里点「保存」「保存并继续」「取消」时，同步做统计或埋点
- 拦截「添加明细行」做配额控制

## 思路

SDK 源码 `src/events/index.ts` 的 `EVENT_NAMES` 里定义了一整组**明细抽屉事件**（文档 main 章节未展开）：

| 事件名 | 时机 |
| --- | --- |
| `BEFORE_DETAIL_EDIT_ROW` | 明细编辑打开抽屉**前** |
| `DETAIL_EDIT_ROW` | 明细编辑打开抽屉时 |
| `DETAIL_DRAWER_SAVE` | 抽屉「保存」 |
| `DETAIL_DRAWER_SAVE_NEXT` | 抽屉「保存并继续」 |
| `DETAIL_DRAWER_CANCEL` | 抽屉「取消」 |
| `DETAIL_ADD_ROW_EVENT_HANDLED` | 明细「添加行」点击事件被处理 |

另有设计器事件（`FORM_WIDGET_ADDED` / `FORM_WIDGET_REMOVE` / `FLOW_PUBLISHED` 等）与流程事件（`AGREE_ADD_SIGN` 加签、`ASK_OPINION` 征求意见等），清单都在源码 `EVENT_NAMES` 枚举里。

## 示例（事件名清单来自源码，订阅入口见注意事项）

```js
cf.ready(function () {
  var E = cf.EVENT_NAMES

  // 打开抽屉前预填默认值
  on(E.BEFORE_DETAIL_EDIT_ROW, function (payload) {
    // payload 含当前行信息，结构以运行时打印为准
    console.log('即将打开明细编辑抽屉', payload)
    // 例如：把当前日期预填到某子控件
  })

  // 抽屉保存后重新汇总
  on(E.DETAIL_DRAWER_SAVE, function () {
    recalcTotal() // 见「明细自动汇总填充」篇
  })

  function on(name, handler) {
    // 订阅方式：cf.event 是 SDK 内置事件总线（@im/modules），
    // 方法名以运行时 console.log(cf.event) 打印结果为准
    cf.event.on && cf.event.on(name, handler)
  }
})
```

## 注意事项

- **事件名清单 100% 来自源码**（`src/events/index.ts`），但事件总线的订阅方法（`on` / `onAny` / `addEventListener`）随 `@im/modules` 版本可能不同 —— 开写前先 `console.log(cf.event)` 看可用方法
- `EVENT_HOOKS`（addEventHook 那套）管流程流转，`EVENT_NAMES` 管页面/组件事件，两套体系别混
- 抽屉事件的 payload 结构同样以运行时打印为准，先打印再取值
