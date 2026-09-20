---
title: 机器人与结束节点处理
---

# 机器人与结束节点特殊处理

## 需求

- 机器人节点自动流转，不应弹交互提示/插卡片（用户根本看不到）
- 单据到达**结束节点**时做归档动作：通知、回写业务系统

## 思路

`cf.flowdesign` 提供一组**当前节点判断属性**（SDK 源码 `src/flowdesign/flowdesign.ts`，文档未展开）：

| 属性 | 说明 |
| --- | --- |
| `isCurrentNodeRobot` | 当前节点是否机器人节点 |
| `isCurrentNodeEnd` | 当前节点是否结束节点 |
| `currentNodeType` | 当前节点类型（默认 `multiApproval`） |
| `currentNodeId` | 当前节点 id |
| `lastNodeConfig` | 最后一个节点配置（可判断结束前节点） |

## 完整代码

```js
cf.ready(function () {
  // 1. 机器人节点：跳过所有 UI 交互
  if (cf.flowdesign.isCurrentNodeRobot) return

  // 2. 结束节点：归档通知
  if (cf.flowdesign.isCurrentNodeEnd) {
    cf.request({
      url: 'https://your-server.com/archive/notify',
      method: 'POST',
      data: {
        flowInstId: (cf.flow.getFlowInfo() || {}).flowInstId,
        finishedAt: Date.now()
      }
    }).then(function () {
      cf.call('toast', { status: 'success', content: '单据已归档' })
    })
    return
  }

  // 3. 普通审批节点：插入辅助卡片
  var card = document.createElement('section')
  card.textContent = '审批参考信息……'
  cf.insertAfterContainer('_S_TITLE', card)
})
```

## 注意事项

- 这组属性来自源码公开 getter，字段结构建议先 `console.log(cf.flowdesign)` 打印确认再取值
- 开始节点部分 API 不支持（`getCurrentFlowNode` 等），判断逻辑务必带兜底分支
- 机器人节点的提示用户看不到 —— 交互逻辑最前面就 return，别浪费请求
