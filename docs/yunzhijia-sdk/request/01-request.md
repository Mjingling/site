---
title: 网络请求 cf.request
---

# 网络请求 cf.request

## 什么时候用

调用你自己的服务端接口：查库存、查余额、校验黑名单、提交后同步数据。

## API

`cf.request(options)`，返回 Promise。

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| `url` | string | 是 | 请求地址 |
| `method` | string | 是 | `'GET'` / `'POST'` |
| `data` | Object | 否 | 请求参数 |
| `header` | Object | 否 | 自定义 header（不能设置 Referer；`content-type` 默认 `application/json`） |
| `dataType` | string | 否 | 返回类型，默认 `json`（自动 `JSON.parse`） |

## 示例

```js
cf.ready(function () {
  // GET
  cf.request({
    url: 'https://your-server.com/user/getUserInfo',
    method: 'GET'
  })
    .then(function (res) { console.log(res.data) })
    .catch(function (err) { console.log(err) })

  // POST + 自定义 header
  cf.request({
    url: 'https://your-server.com/expense/check',
    method: 'POST',
    data: { amount: cf.getFieldValue('报销金额') },
    header: { 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' }
  })
    .then(function (res) { console.log(res.data) })
    .catch(function (err) { console.log(err) })
})
```

## 注意事项

- 目标接口需在企业可信域名/白名单内，跨域由服务端 CORS 配合解决
- 接口慢时注意与 `BEFORE_SUBMIT` 拦截配合的时序：请求返回前不要放行 `next()`
- 完整场景见最佳实践《[调用自定义接口判断能否提交](/yunzhijia-best-practices/04-custom-api-gate)》
