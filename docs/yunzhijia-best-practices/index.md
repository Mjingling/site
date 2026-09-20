---
title: 个性化开发最佳实践
description: 云之家智能审批个性化开发的典型场景与完整可抄代码
---

# 最佳实践

按真实业务场景组织的完整方案：每篇都是**需求 → 思路 → 完整代码 → 注意事项**的结构，代码可直接抄去改字段名使用。API 细节见 [JS SDK 片段](/yunzhijia-sdk/)。

> 所有代码都基于智能审批 JS-SDK（`@cloudflow/cloudflow-js-sdk`），务必包裹在 `cf.ready()` 中执行。

## 场景清单

| 场景 | 一句话 |
| --- | --- |
| [提交前金额校验](/yunzhijia-best-practices/01-submit-amount-validate) | 报销金额为负不允许提交 |
| [请假次数拦截](/yunzhijia-best-practices/02-leave-count-limit) | 本月已请三次假，禁止再发起 |
| [审批页辅助信息卡片](/yunzhijia-best-practices/03-approval-info-card) | 给审批人展示统计/余额等参考信息 |
| [自定义接口闸门](/yunzhijia-best-practices/04-custom-api-gate) | 提交前调用自己的接口判断能否继续 |
| [字段联动显隐](/yunzhijia-best-practices/05-field-linkage) | 按字段值/节点动态控制显隐与只读 |
| [智能退回拦截](/yunzhijia-best-practices/06-smart-return-block) | 不允许智能退回的单据 |
| [明细自动汇总填充](/yunzhijia-best-practices/07-detail-autofill) | 明细变化自动算合计、回填主表 |
