---
title: 发起人与流程详情
---

# 获取发起人与流程详情

## 什么时候用

- 展示发起人信息卡片
- 拿完整流程上下文（单据 id、模板 id、流转信息）传给自定义接口

## API

| API | 说明 |
| --- | --- |
| `cf.flow.getFlowApplier()` | 当前流程发起人 |
| `cf.flow.getFlowInfo()` | 当前流程详情（开始节点暂不支持） |

## 示例

```js
cf.ready(function () {
  var applier = cf.flow.getFlowApplier()

  cf.flow.getFlowInfo().then(function (flowInfo) {
    console.log(flowInfo)
    // 把单据上下文传给自己的服务端做统计
    cf.request({
      url: 'https://your-server.com/api/track',
      method: 'POST',
      data: {
        applier: applier && applier.name,
        flow: flowInfo
      }
    })
  })
})
```

## 注意事项

- `getFlowInfo` 在开始节点暂不支持，`then` 之前先判空或做好异常兜底
- 详情对象字段较多，建议先打印结构再取值
