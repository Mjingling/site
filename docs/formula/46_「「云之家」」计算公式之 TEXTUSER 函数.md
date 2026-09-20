# 「「云之家」」计算公式之 TEXTUSER 函数

## 一、函数作用

`TEXTUSER` 函数用来**从用户控件数据中提取文本信息**，支持：
- 提取用户姓名
- 提取用户OID（用户唯一标识）
- 提取用户所属部门名称

常用于在公式中获取用户控件的显示值或进行数据传递。

---

## 二、语法格式


TEXTUSER(用户数组, 属性名)


### 参数说明

| 参数 | 说明 | 是否必填 | 示例 |
|------|------|----------|------|
| 用户数组 | 用户控件的数据（数组格式） | ✅ 必填 | 审批人控件、经办人控件 |
| 属性名 | 要提取的属性，支持 "name"、"oid"、"departmentName" | ✅ 必填 | "name"、"oid"、"departmentName" |

### 返回值

- **正常情况**：返回用户的姓名、OID或部门名称
- **特殊情况**：
  - 如果参数为空，返回空字符串
  - 如果属性名为空，返回空字符串
  - 如果用户数组为空，返回空字符串

---

## 三、实用示例

### 示例 1：获取用户姓名

TEXTUSER(审批人, 'name')
返回：'张三'

### 示例 2：获取用户OID

TEXTUSER(经办人, 'oid')
返回：'5fbf03f1e4b086beeb103e7a'

### 示例 3：获取用户部门

TEXTUSER(申请人, 'departmentName')
返回：'技术部'

### 示例 4：处理空值情况

TEXTUSER()
返回：''（无参数）

TEXTUSER(null, 'name')
返回：''（用户为空）

TEXTUSER(审批人, null)
返回：''（属性名为空）

TEXTUSER([], 'name')
返回：''（空数组）

### 示例 5：用户数据格式

用户控件存储的数据格式示例（供参考）
        image: 'https://...',
        companyName: '金蝶国际软件集团有限公司',
        jobTitle: '前端工程师'
    }
]


---

## 四、实际业务场景

### 场景 1：在文本中显示审批人


"审批人：" + TEXTUSER(审批人, 'name') + 
"（" + TEXTUSER(审批人, 'departmentName') + "）"


### 场景 2：根据用户信息计算


IF(TEXTUSER(经办人, 'name') == '管理员', 
    "自动审批", 
    "人工审批")


### 场景 3：用户数据传递

将用户信息传递给其他系统

TEXTUSER(审批人, 'oid')
TEXTUSER(审批人, 'name')
TEXTUSER(审批人, 'departmentName')


### 场景 4：审批流程中使用


"请 " + TEXTUSER(部门经理, 'name') + " 审批"


### 场景 5：权限控制


IF(TEXTUSER(当前用户, 'departmentName') == '财务部',
    "可查看所有数据",
    "只能查看本部门数据")


---

## 五、常见问题

### ❓ 如果用户控件选择了多个用户怎么办？

函数只返回第一个用户的信息。


TEXTUSER(审批人, 'name')   // 返回：'张三'（只取第一个）


### ❓ OID 是什么？

OID 是用户的唯一标识符（Object ID），用于在系统中唯一标识一个用户。常用于：
- API调用时传递用户标识
- 数据关联时作为外键
- 权限判断时识别用户


'5fbf03f1e4b086beeb103e7a'


### ❓ 为什么有时候取不到部门名称？

可能的原因：
1. 用户没有设置部门信息
2. 用户数据格式异常
3. 属性名填写错误（必须是 "departmentName"）


TEXTUSER(申请人, 'departmentName')   // ✅
TEXTUSER(申请人, 'dept')              // ❌ 错误的属性名


### ❓ TEXTUSER 和 GET_PROPERTY 有什么区别？

- `TEXTUSER` 专门处理用户控件数据，自动标准化数据格式
- `GET_PROPERTY` 是通用函数，适用于任何对象/数组


TEXTUSER(申请人, 'name')
GET_PROPERTY(申请人, 'name')



### ❓ 如何获取用户的其他信息？

用户数据包含很多字段，可以使用 GET_PROPERTY 访问：


GET_PROPERTY(申请人, 'userId')      // 用户ID
GET_PROPERTY(申请人, 'personId')    // 人员ID
GET_PROPERTY(申请人, 'jobTitle')    // 职位
GET_PROPERTY(申请人, 'companyName') // 公司名称


---

## 六、搭配使用技巧

### 技巧 1：结合 IF 函数进行用户判断


IF(TEXTUSER(审批人, 'name') != '', 
    "已指定审批人：" + TEXTUSER(审批人, 'name'),
    "未指定审批人")


### 技巧 2：拼接用户信息


"经办人：" + TEXTUSER(经办人, 'name') + 
"（" + TEXTUSER(经办人, 'departmentName') + "）"


### 技巧 3：与部门控件联动


IF(TEXTUSER(申请人, 'departmentName') == '技术部',
    TEXTDEPT(技术部门, 'name'),
    TEXTDEPT(默认部门, 'name'))


### 技巧 4：多用户场景处理

如果需要处理多选用户控件，可以使用数组函数：




---

## 七、注意事项

1. **单值返回**：只返回第一个用户的信息，不支持多用户
2. **属性名限制**：只支持 "name"、"oid"、"departmentName" 三个属性
3. **数据格式**：用户控件存储的是数组，即使只选择了一个用户
4. **部门名称**：部门名称可能来自多个字段（dept、department、originData.department），函数会自动处理
5. **OID 兼容**：支持 oid 和 oId 两种写法

---

## 八、属性对照表

| 属性名 | 说明 | 数据来源字段 |
|--------|------|--------------|
| name | 用户姓名 | name |
| oid | 用户唯一标识 | oid、oId |
| departmentName | 用户部门 | dept、department、originData.department |

---
