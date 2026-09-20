---
title: 移除事件钩子 removeEventHook
---

# 移除事件钩子

## 什么时候用

单页应用反复注入脚本的场景（或动态开关拦截逻辑），避免钩子重复叠加、重复弹窗。

## API

`cf.removeEventHook(hookName, handler)` —— 必须传**同一个函数引用**。

## 示例

```js
// 1. 具名定义
function afterSubmitHandler() {
  cf.request({ url: 'https://your-server.com/api/notify', method: 'POST', data: {} })
}

// 2. 绑定
cf.addEventHook(cf.EVENT_HOOKS.AFTER_SUBMIT, afterSubmitHandler)

// 3. 需要时移除
cf.removeEventHook(cf.EVENT_HOOKS.AFTER_SUBMIT, afterSubmitHandler)
```

## 注意事项

- 匿名函数 `cf.addEventHook(X, function(){})` 无法被移除 —— 绑定多少次就触发多少次
- 重复注入脚本前先移除旧钩子，是排查「弹窗弹两次」的第一检查点
