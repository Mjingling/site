---
title: "GET_PROPERTY 函数"
---

# 「「云之家」」计算公式之 GET_PROPERTY 函数

## 一、函数作用

`GET_PROPERTY` 函数用来**从对象或数组中获取指定属性的值**，支持：
- 从对象中获取属性值
- 从数组中获取第一个元素的属性值
- 支持嵌套属性路径（如 `user.profile.name`）
- 如果属性不存在，返回空字符串

常用于处理复杂的数据结构，提取深层嵌套的属性值。

---

## 二、语法格式


GET_PROPERTY(对象或数组, 属性路径)


### 参数说明

| 参数 | 说明 | 是否必填 | 示例 |
|------|------|----------|------|
| 对象或数组 | 要获取属性的对象或数组 | ✅ 必填 | 用户对象、部门数组等 |
| 属性路径 | 要获取的属性名，支持嵌套路径（用点号分隔） | ✅ 必填 | "name"、"user.profile.name" |

### 返回值

- **正常情况**：返回指定属性的值
- **特殊情况**：
  - 如果对象/数组为空或 null，返回空字符串
  - 如果属性不存在，返回空字符串
  - 如果是数组，返回第一个元素的属性值

---

## 三、实用示例

### 示例 1：从对象获取属性

假设有一个用户对象

GET_PROPERTY(用户对象, 'name')
返回：'张三'

GET_PROPERTY(用户对象, 'age')
返回：25

GET_PROPERTY(用户对象, 'city')
返回：'北京'

GET_PROPERTY(用户对象, 'email')
返回：''（属性不存在）

### 示例 2：从数组获取属性

假设有一个部门数组

GET_PROPERTY(部门数组, 'name')
返回：'技术部'（取第一个元素）

GET_PROPERTY(部门数组, 'id')
返回：'001'

### 示例 3：获取嵌套属性

GET_PROPERTY(数据对象, 'user.profile.name')
返回：'李四'

GET_PROPERTY(数据对象, 'user.profile.age')
返回：30


### 示例 4：处理空值情况

GET_PROPERTY(null, 'name')
返回：''

GET_PROPERTY(undefined, 'name')
返回：''

GET_PROPERTY([], 'name')
返回：''

GET_PROPERTY({ name: 'test' }, null)
返回：''

---

## 四、实际业务场景

### 场景 1：提取用户控件数据

在表单中，用户控件存储的是数组格式，需要提取第一个用户的属性

GET_PROPERTY(经办人, 'name')
获取用户姓名

GET_PROPERTY(经办人, 'oid')
获取用户OID

GET_PROPERTY(经办人, 'departmentName')
获取用户部门

### 场景 2：提取部门控件数据

GET_PROPERTY(所属部门, 'name')
获取部门名称

GET_PROPERTY(所属部门, 'id')
获取部门ID


### 场景 3：提取基础资料控件的属性


GET_PROPERTY(物料, 'FNumber')     // 获取物料编码
GET_PROPERTY(物料, 'FName')       // 获取物料名称
GET_PROPERTY(物料, 'FSpec')       // 获取物料规格


### 场景 4：提取复杂数据结构


const apiData = {
    response: {
        data: {
            items: [
                { id: 1, name: '项目1' }
            ]
        }
    }
}

GET_PROPERTY(apiData, 'response.data.items')  // 获取 items 数组


---

## 五、常见问题

### ❓ 如果数组有多个元素，会返回什么？

只返回第一个元素的属性值。如果需要处理所有元素，应该使用 `MAP` 函数。


const arr = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 }
]

GET_PROPERTY(arr, 'name')   // 返回：'张三'（只取第一个）


### ❓ 属性路径中包含点号怎么办？

如果属性名本身包含点号，无法使用嵌套路径访问，建议使用单层属性名。

### ❓ 如何判断返回值是空字符串还是真的空值？

函数统一返回空字符串作为默认值，无法区分"属性不存在"和"属性值为空"。


const obj = { name: '' }
GET_PROPERTY(obj, 'name')         // 返回：''
GET_PROPERTY(obj, 'nonexistent')  // 返回：''


### ❓ 能否用于基础类型（字符串、数字）？

不能。如果第一个参数不是对象或数组，返回空字符串。


GET_PROPERTY('hello', 'length')    // 返回：''
GET_PROPERTY(123, 'toString')      // 返回：''


---

## 六、搭配使用技巧

### 技巧 1：结合 IF 函数判断属性是否存在


IF(GET_PROPERTY(用户, 'name') != '', "有值", "无值")


### 技巧 2：处理可能为空的嵌套对象



GET_PROPERTY(user, 'profile.name')


### 技巧 3：从表单控件提取显示值


GET_PROPERTY(审批人, 'name')


---

## 七、注意事项

1. **数组取第一个元素**：当参数为数组时，只返回第一个元素的属性值
2. **空值处理**：各种异常情况都返回空字符串，不会报错
3. **嵌套路径**：支持用点号访问嵌套属性，如 `user.profile.name`
4. **性能考虑**：对于频繁访问的深层嵌套属性，建议在数据源头就处理好结构

---
