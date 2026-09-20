---
title: 插入自定义 DOM 卡片
---

# 插入自定义 DOM（insertAfter / insertBefore）

## 什么时候用

在发起页/详情页展示 SDK 表单能力之外的辅助信息：统计卡片、说明区块、外部系统摘要。

## API

| API | 说明 |
| --- | --- |
| `cf.insertAfterContainer(containerId, nodes)` | 在某容器**后**插入 DOM，成功返回 `true` |
| `cf.insertBeforeContainer(containerId, nodes)` | 在某容器**前**插入 DOM |

## 示例

```js
cf.ready(function () {
  var card = document.createElement('section')
  card.className = 'my-diy-card'
  card.innerHTML = '<div>这是一个自定义的小卡片</div>'

  // 在标题控件（容器 id _S_TITLE）后插入
  var success = cf.insertAfterContainer('_S_TITLE', card)
  if (!success) {
    console.warn('容器不存在，插入失败')
  }
})
```

## 带样式的完整例子

```js
cf.ready(function () {
  var style = document.createElement('style')
  style.textContent = '.my-diy-card{margin:8px 0;padding:12px 16px;border-radius:8px;background:#f5f3ff;color:#5b21b6;font-size:13px}'
  document.head.appendChild(style)

  var card = document.createElement('section')
  card.className = 'my-diy-card'
  card.textContent = '本月该部门已累计报销 ¥12,340，超出预算 80%'
  cf.insertAfterContainer('_S_TITLE', card)
})
```

## 注意事项

- 发起页每个控件都是一个容器（容器定义持续完善中），`_S_TITLE` 是标题容器
- 插入前判空，避免容器不存在时静默失败
- 深色主题适配需要自己处理样式
