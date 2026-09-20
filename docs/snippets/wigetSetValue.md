---
title: 云之家控件赋值示例（setValue）
tags: [云之家, 个性化开发]
lang: js
date: 2026-09-20
---

# 写在前面：

以下代码基于现有情况编写，除官方文档写明的不会改变外，其余赋值示例可能会因为迭代，后续发生变更哈～后续以官方文档为准哈～

# 基础控件

## 基本类型

### 单行文本框

```js
// 设置为 你好
cf.form.setFieldValue('Te_0', '你好')

// 设置为空，即清空控件值
cf.form.setFieldValue('Te_0', '')
```

### 多行文本框

```js
// 设置为 你好多行文本框
cf.form.setFieldValue('Ta_0', '你好多行文本框')

// 设置为空，即清空控件值
cf.form.setFieldValue('Ta_0', '')
```

### 数字输入框

```js
// 设置为 25
cf.form.setFieldValue('Nu_0', 25)

// 设置为空，即清空控件值
cf.form.setFieldValue('Nu_0', '')
```

### 金额输入框

```js
// 设置为 25
cf.form.setFieldValue('Mo_0', 25)

// 设置为空，即清空控件值
cf.form.setFieldValue('Mo_0', '')
```

## 文件类

### 图片上传

- 图片上传控件赋值时，需要传入图片的id数组
- 图片id可以通过图片上传控件获取，也可以自己通过`ajax`将文件上传至文件服务后获取

[>>点我查看文件上传文档<<](https://open.yunzhijia.com/opendocs/docs.html#/server-api/business/cloudflow?id=%e6%96%87%e4%bb%b6%e6%93%8d%e4%bd%9c%e6%8e%a5%e5%8f%a3)

\[<https://open.yunzhijia.com/opendocs/docs.html#/server-api/business/cloudflow?id=%e6%96%87%e4%bb%b6%e6%93%8d%e4%bd%9c%e6%8e%a5%e5%8f%a3>]

```js
// 设置为图片id数组 676684af817bec00014d28e7 对应的文件 需要提前上传到文件服务
cf.form.setFieldValue('Im_0', ['676684af817bec00014d28e7'])

// 设置为空，即清空控件值
cf.form.setFieldValue('Im_0', [])
```

### 文件上传

```js
// 设置为文件id数组 676684af817bec00014d28e7 对应的文件 需要提前上传到文件服务
// cf.form.setFieldValue('At_0', ["676684af817bec00014d28e7"]);

// 设置为空，即清空控件值
cf.form.setFieldValue('At_0', [])
```

## 选项类型

`单选框`、`多选框`赋值时，都需要传入选项的`key`值，即类似唯一编码的值，可以通过`formInfo`获取到控件的`options`，然后找到对应的`key`值

### 单选框

```js
/**
 * @description: 从控件选项中查找匹配的值
 * @params {string} widgetCodeId 控件id
 * @params {string} label 选项label
 * @return {*}
 */
function findMatchWidgetOptionValue(formInfo, widgetCodeId, label) {
    // 找到所有的控件
    var widgetsMap = formInfo.widgetsMap
    // 找到控件的options
    var options = widgetsMap[widgetCodeId].options || []
    // 从控件的options中找到匹配的选项
    var yesOption = cf.find(options, function (o) {
        return o.value === label
    })
    // 返回匹配的选项的key
    return yesOption ? yesOption.key : ''
}
// 获取表单模板信息
cf.flow.getFormInfo().then(function (formInfo) {
    let value = findMatchWidgetOptionValue(formInfo, 'Ra_0', '单选框选项1')
    cf.form.setFieldValue('Ra_0', value)
    // 如果你知道key值，也可以直接传入key值
    cf.form.setFieldValue('Ra_0', 'AaBaCcDd')
})

// 设置为空，即清空控件值
cf.form.setFieldValue('Ra_0', '')
```

### 多选框

```js
/**
 * @description: 从控件选项中查找匹配的值
 * @params {string} widgetCodeId 控件id
 * @params {string} label 选项label
 * @return {*}
 */
function findMatchWidgetOptionValue(formInfo, widgetCodeId, label) {
    // 找到所有的控件
    var widgetsMap = formInfo.widgetsMap
    // 找到控件的options
    var options = widgetsMap[widgetCodeId].options || []
    // 从控件的options中找到匹配的选项
    var yesOption = cf.find(options, function (o) {
        return o.value === label
    })
    // 返回匹配的选项的key
    return yesOption ? yesOption.key : ''
}
// 获取表单模板信息
cf.flow.getFormInfo().then(function (formInfo) {
    let value1 = findMatchWidgetOptionValue(formInfo, 'Cb_0', '多选框选项1')
    let value2 = findMatchWidgetOptionValue(formInfo, 'Cb_0', '多选框选项2')
    cf.form.setFieldValue('Cb_0', [value1, value2])
})

// 如果你知道key值，也可以直接传入key值
cf.form.setFieldValue('Cb_0', ['AaBaCcDd', 'EeFfGgHh'])

// 设置为空，即清空控件值
cf.form.setFieldValue('Cb_0', [])
```

### 开关

开关设置为`true`时，显示为`开`，`false`时，显示为`关`

```js
// 设置为开
cf.form.setFieldValue('Sww_0', true)
// 设置为关
cf.form.setFieldValue('Sww_0', false)
```

### 人员选择

```js
// 设置人员
cf.form.setFieldValue('Ps_0', [
    {
        departmentName: '下一代金蝶云测试2022',
        name: '7001',
        oid: '5e8e7b1de4b0087cebbd7c2b',
        eid: '100030',
        photoUrl:
            'https://devtest.kdweibo.cn/space/c/photo/load?id=66ac822480e8870001ff0e97',
    },
])

// 清空人员，即清空控件值
cf.form.setFieldValue('Ps_0', [])
```

### 部门选择

```js
cf.form.setFieldValue('Ds_0', [
    {
        name: '测试A',
        id: '2371d8d4-3fc4-4160-8689-b1b2ae6aa07c',
    },
])

// 清空部门，即清空控件值
cf.form.setFieldValue('Ds_0', [])
```

### 公共选择框

```js
cf.form.setFieldValue('Pw_0', [
    {
        title: '支票1',
        dicId: 'd008a0002',
    },
])
```

## 日期类型

日期类型控件赋值时，需要传入`时间戳`，时间戳为毫秒级`时间戳`

### 日期选择

```js
let date = new Date(2022, 8, 1)
let timestamp = date.getTime()
cf.form.setFieldValue('Da_0', timestamp)

// 设置为空，即清空控件值
cf.form.setFieldValue('Da_0', null)
```

### 日期区间

```js
let date1 = new Date(2022, 8, 1)
let timestamp1 = date1.getTime()
let date2 = new Date(2022, 8, 2)
let timestamp2 = date2.getTime()
cf.form.setFieldValue('Dr_0', [timestamp1, timestamp2])

// 设置为空，即清空控件值
cf.form.setFieldValue('Dr_0', [])
```

## 高级控件

### 地理位置

```js
cf.form.setFieldValue('Lo_0', {
    address: '金蝶大厦内部停车场',
    addressdetail: '广东省深圳市南山区高新南七道与高新南六道交叉口西南100米',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    latitude: 22.533996,
    name: '金蝶大厦内部停车场',
    direction: 0,
    longitude: 113.95442,
})

// 设置为空，即清空控件值
cf.form.setFieldValue('Lo_0', null)
```

### 明细控件

```js
// 清空明细值
cf.form.setFieldValue('Dd_0', [])

// 获取明细组件实例
let dd = cf.form.getField('Dd_0')
// 删除某一行
dd.deleteRowById('1') // 根据id删除某一行
dd.deleteRowByIndex(1) // 根据索引删除某一行

// 删除多条
dd.deleteRowsByIds(['1', '2', '3']) // 根据id删除多条
dd.deleteRowsByIndexs([0, 1, 2]) // 根据索引删除多条

// 新增一行
dd.addRow({
    Te_1: '',
    Ta_1: '',
})
// 新增多行
dd.addRows([
    {
        Te_1: '33',
        Ta_1: '44',
    },
    {
        Te_1: '55',
        Ta_1: '66',
    },
])

// 清空一整行
dd.clearRowById('1') // 根据id清空某一行
dd.clearRowByIndex(0) // 根据索引清空某一行

// 更新某行某控件的值 注意：此 Api只针对明细中子控件处于可编辑状态时生效
var success = cf.form.setDetailFieldValue({
    parentCodeId: 'Dd_0', // 明细控件codeId
    codeId: 'Te_0', // 明细控件中子控件的codeId
    _id_: '1', // 明细行id
    value: '456', // 明细控件中子控件的值
})
```

# 互联控件

## 融合中心控件

**注意：融合中心控件除非你知道你在做什么，否则不建议使用 sdk 修改值，否则可能会出现数据字段缺失**

融合中心的控件，被设置值时，需保证值中必须包含在【流程模板设计时】设置为展示字段的字段，否则会造成界面显示异常，或设置后无效问题

### 单据控件

```js
cf.form.setFieldValue('Ff_0', [
    {
        FBillNo: '202401301000',
        FID: 100013,
        F_ABCD_OrgId: null,
        'F_ABCD_OrgId.FNumber': null,
        F_ABCD_Text: '',
        'F_ABCD_OrgId.FCreateDate': null,
        F_ABCD_Remarks: '',
        FEntity: [],
        'F_ABCD_OrgId.FName': null,
    },
])

// 设置为空，即清空控件值
cf.form.setFieldValue('Ff_0', [])
```

### 基础资料控件

```js
cf.form.setFieldValue('Bd_0', [
    {
        FBILLTYPEID_Name: '付款结算单',
        FUSEDAMOUNTFOR: 11,
        FDocumentStatus_Name: '',
        PAYBILL: {
            FPAYBILLID: -1000040000,
            FBILLTYPEID: {
                FBILLTYPEID: '57d60b26287089',
                FNumber: 'FKJSD01_SYS',
                FName: '付款结算单',
            },
            FBILLTYPEID_Name: '付款结算单',
            FUSEDAMOUNTFOR: 11,
            FDocumentStatus_Name: '',
            FNumber: 'FKJSD00000004',
            FName: null,
            FDate: '2024-11-06 00:00:00',
            FDocumentStatus: null,
        },
        FName: '啦啦啦',
        FDate: '2024-11-06 00:00:00',
        FDocumentStatus: null,
        FPAYBILLID: -1000040000,
        FBILLTYPEID: {
            FBILLTYPEID: '57d60b26287089',
            FNumber: 'FKJSD01_SYS',
            FName: '付款结算单',
        },
        FNumber: 'FKJSD00000004',
    },
])

// 设置为空，即清空控件值
cf.form.setFieldValue('Bd_0', [])
```

### 枚举

```js
cf.form.setFieldValue('En_0', [
    {
        value: '1',
        name: '列表',
    },
])

// 清空枚举，即清空控件值
cf.form.setFieldValue('En_0', [])
```

**欢迎关注我的个人公众号「「小枫学幽默」」一起成长，一起分享生活！！**

<p align="center"><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d7c481ff960b4c5992210a492a4cc093~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5p6r5a2m5bm96buY:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiOTQwODM3NjgzNTk4NjM4In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1790479251&x-orig-sign=Zrj8WZAo8gjihKH7n1nDlYRT4aQ%3D" alt="扫码关注我.png" width="50%"></p>
