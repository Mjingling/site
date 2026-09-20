---
title: "控件值类型说明"
---

# 控件值类型说明

本文档说明智能审批表单中各个控件的值类型（Value Type）。

| 控件类型 | codeId 前缀 | Value 格式 | 说明 |
|---|---|---|---|
| 单行文本框 | Te_ | `string` | 标题、流水号、组合文本控件、用户自定义单行文本框等 |
| 多行文本框 | Ta_ | `string` | 多行文本输入控件 |
| 数字输入框 | Nu_ | `string`（纯数字字符串，如 `"12345"`） | 公式中通过 `Number(value)` 转为数字参与计算 |
| 金额输入框 | Mo_ | `string`（纯数字字符串，如 `"1234565"`） | 同数字输入框 |
| 运算控件 | Ar_ | `string`（纯数字字符串） | 由其他数字型控件运算赋值，不可手动修改，公式中转为数字 |
| 单选框 | Ra_ | `string`（key 值） | 存储选项 key，公式中自动转为选项 value（显示文本） |
| 多选框 | Cb_ | `string[]`（key 值数组） | 存储选项 key 数组，公式中自动转为 value 数组 |
| 开关 | Sw_ | `string`（`"1"` / `"0"`） | 公式中 `"1"` 解析为 `true`，`"0"` 解析为 `false` |
| 人员选择 | Ps_ | `Object[]`（oid 数组） | 单选时数组仅一个元素；含 oid、name、departmentName、photoUrl 等，公式中通过 `infoMap.persons` 补充完整信息 |
| 部门选择 | Ds_ | `Object[]`（id 数组） | 单选时数组仅一个元素；含 id、name 等，公式中通过 `infoMap.orgs` 补充完整信息 |
| 岗位选择 | — | `Object[]`（jobId 数组） | 公式中通过 `infoMap.positions` 补充完整信息 |
| 日期 | Da_ | `number`（13 位毫秒时间戳） | 如 `1646323200000`，置空为 `null` |
| 日期区间 | Dr_ | `[number, number]` | `[开始时间戳, 结束时间戳]`，置空为 `[null, null]` |
| 图片上传 | Im_ | `string[]`（fileId 数组） | 图片文件在云盘的 fileId，如 `["6221c04c1b8f3d0023d6c06a"]` |
| 文件上传 | At_ | `Object[]` | 对象含 `fileId`、`fileName`、`fileExt`、`fileSize`、`fileType` |
| 关联审批单 | Re_ | `Object[]` | 对象含 `flowInstId`、`formInstId`、`title`、`serialNo` 等 |
| 明细表格 | Dd_ | `{ widgetValue: [{...}, {...}] }` | `widgetValue` 为明细行数组，每行含 `_id_` 及各子控件值 |
| 子明细表格 | SD_ | `{ widgetValue: [{...}, {...}] }` | 嵌套在父明细内的子明细，格式同明细表格 |
| 说明文字 | De_ | `string` | 不可修改或置空 |
| 地理位置 | Lo_ | `Object` | 含 `longitude`、`latitude`、`address`、`city`、`province` 等 |
| 电子签章 | Si_ | `Object[]` | 对象含 `signTime`、`signer`（含 oid/name）、`fileId` 等 |
| 知识目录 | Ca_ | `Object[]` | 对象含 `id`、`catalogName`、`fullPath` |
| 基础资料 | Bd_ | `Object`（含 `_dataSource_`） | 支持通过 `Bd_1.属性名` 获取子属性；多选为 `multiBasicDataWidget` |
| 单据(融合表单) | Fu_ | `Object`（含 `_dataSource_`） | 支持通过 `Fu_1.属性名` 获取子属性；多选为 `multiFusionFormWidget` |
| 审批意见 | — | `Object[]` | 含审批人、审批意见、时间等信息 |
| 枚举 | — | `Object[]` | |
| 附件预览 | — | `null` | Office 预览控件 |
| 内部链接 | — | `Object[]` | |
| 评分 | — | `string` | |
| 流水号 | — | `string` | 自动编号 |
| 组合文本 | — | `string` | 组合多个字段值显示 |
| 编号 | — | `string` | 发文编号 |
| API集成 | — | `Object[]` | |
