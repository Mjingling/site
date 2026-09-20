---
title: 从明细中筛选符合条件记录并自动填充至主表单控件
tags: [云之家, 计算公式]
lang: html
date: 2026-09-20
---

# 从明细中筛选符合条件记录并自动填充至主表单控件

## 场景

当在【教育经历明细】中录入【教育经历】信息时，自动筛选【是否最高学历】为【是】的学历的【最高学历】、【最高学历形式】、【最高学历院校名称】、【最高学历院校专业】，并填入主表单对应控件中，简化填写步骤

## 模板设计如下

最高学历：单选框 对应【教育经历明细】中的【学历】最高学历形式：单选框  对应【教育经历明细】中的【学历形式】最高学历院校名称：单行文本框  对应【教育经历明细】中的【院校】最高学历院校专业：单行文本框  对应【教育经历明细】中的【专业】\
![图片](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/268afc5df12842979d8b4074925ab4f9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5p6r5a2m5bm96buY:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiOTQwODM3NjgzNTk4NjM4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1790479282&x-orig-sign=Ub%2BX875wNq5yn3HtTqj45p6hHv8%3D)

##

```html
<script type="text/javascript">
    cf.ready(function () {
        var formInfo = {}
        cf.flow.getFormInfo().then(function (res) {
            formInfo = res
            setUp()
        }) // 值改变时判断应该给文事会关联控件设置什么状态
        function assignWidgets(highOne) {
            // 最高学历
            cf.form.setFieldValue(
                'Ra_4',
                findWidgetOptionLabel('Ra_18', highOne.Ra_18, 'Ra_4'),
            ) // 最高学历形式
            cf.form.setFieldValue(
                'Ra_5',
                findWidgetOptionLabel('Ra_16', highOne.Ra_16, 'Ra_5'),
            ) // 最高学历院校名称
            cf.form.setFieldValue('Te_19', highOne.Te_20) // 最高学历院校专业
            cf.form.setFieldValue('Te_67', highOne.Te_21)
        }

        function findWidgetOptionLabel(widgetCodeId, key, targetCodeId) {
            var widgetsMap = formInfo.widgetsMap
            var options = widgetsMap[widgetCodeId].options || []
            var yesOption = cf.find(options, function (o) {
                return o.key === key
            })
            return yesOption
                ? findMatchWidgetOptionValue(targetCodeId, yesOption.value)
                : ''
        }

        function findMatchWidgetOptionValue(widgetCodeId, value) {
            var widgetsMap = formInfo.widgetsMap
            var options = widgetsMap[widgetCodeId].options || []
            var yesOption = cf.find(options, function (o) {
                return o.value === value
            })
            return yesOption ? yesOption.key : ''
        }
        function setUp() {
            var widgetsMap = formInfo.widgetsMap // 监听教育经历改变
            cf.form.subscribeFieldValueChange('Dd_0', (eventValue) => {
                var widgetValue = eventValue.widgetValue || [] // 找到最高学历
                var highOne = cf.find(widgetValue, function (row) {
                    var options = widgetsMap.Ra_15.options || []
                    var yesOption = cf.find(options, function (o) {
                        return o.value === '是'
                    }) // 判断是否最高学历
                    return row.Ra_15 && row.Ra_15 === yesOption.key
                })
                if (highOne) {
                    assignWidgets(highOne)
                }
            })
        }
    })
</script>
```

**欢迎关注我的个人公众号「「小枫学幽默」」一起成长，一起分享生活！！**

<p align="center"><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d7c481ff960b4c5992210a492a4cc093~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5p6r5a2m5bm96buY:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiOTQwODM3NjgzNTk4NjM4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1790479282&x-orig-sign=i8Az5okan5JuigQ%2B8McTy9eiiyQ%3D" alt="扫码关注我.png" width="50%"></p>
