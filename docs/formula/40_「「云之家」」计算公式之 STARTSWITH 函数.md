# 「「云之家」」计算公式之 STARTSWITH 函数

## 一、函数作用

`STARTSWITH` 函数用来**判断文本是否以指定前缀开头**,简单来说就是:
- 检查一个文本字符串是否以另一个字符串开头
- 返回true（真）或false（假）
- 可以用于文本验证和筛选
- 区分大小写

常用于数据验证、分类筛选、条件判断等场景。

---

## 二、语法格式

```
STARTSWITH(文本, 前缀)
```

### 参数说明

| 参数 | 说明 | 是否必填 | 示例 |
|------|------|----------|------|
| 文本 | 需要检查的文本字符串 | ✅ 必填 | "Hello World" |
| 前缀 | 要匹配的前缀字符串 | ✅ 必填 | "Hello" |

### 返回值

- **正常情况**:返回true（以该前缀开头）或false（不以该前缀开头）
- **特殊情况**:空字符串或空控件参数将返回false

---

## 三、实用示例

### 示例 1:基本用法

```js
// 检查是否以指定前缀开头
STARTSWITH("Hello World", "Hello")  // 返回: true
STARTSWITH("Hello World", "World")  // 返回: false
```

### 示例 2:验证手机号码前缀

```js
// 判断是否为移动手机号（以13、15、18开头）
STARTSWITH([手机号], "13") OR STARTSWITH([手机号], "15") OR STARTSWITH([手机号], "18")
```

### 示例 3:分类产品编号

```js
// 判断产品编号是否为A类产品
IF(STARTSWITH([产品编号], "A"), "A类产品", "其他类产品")
```

### 示例 4:检查URL协议

```js
// 检查URL是否为HTTPS
IF(STARTSWITH([网址], "https://"), "安全连接", "非安全连接")
```

### 示例 5:文件类型判断

```js
// 判断文件是否为图片文件
STARTSWITH([文件名], "IMG_") OR STARTSWITH([文件名], "PHOTO_")
```

### 示例 6:地区代码验证

```js
// 判断是否为北京地区（区号010开头）
IF(STARTSWITH([电话号码], "010"), "北京", "其他地区")
```

---

## 四、实际业务场景

### 场景 1:订单编号分类

根据订单编号前缀自动分类订单类型。

```js
// 【订单类型】的计算公式
IF(STARTSWITH([订单编号], "PO"), "采购订单",
   IF(STARTSWITH([订单编号], "SO"), "销售订单",
      IF(STARTSWITH([订单编号], "RO"), "退货订单", "其他订单")))
```

### 场景 2:员工工号归属判断

根据员工工号前缀判断所属部门。

```js
// 【所属部门】的计算公式
IF(STARTSWITH([员工工号], "DEV"), "研发部",
   IF(STARTSWITH([员工工号], "SAL"), "销售部",
      IF(STARTSWITH([员工工号], "HR"), "人力资源部", "其他部门")))
```

### 场景 3:客户等级识别

根据客户编号前缀识别客户等级。

```js
// 【客户等级】的计算公式
IF(STARTSWITH([客户编号], "VIP"), "VIP客户",
   IF(STARTSWITH([客户编号], "GOLD"), "金牌客户", "普通客户"))
```

### 场景 4:发票类型判断

根据发票号码前缀判断发票类型。

```js
// 【发票类型】的计算公式
IF(STARTSWITH([发票号码], "VAT"), "增值税专用发票",
   IF(STARTSWITH([发票号码], "COMMON"), "普通发票", "其他发票"))
```

---

## 五、常见问题

### ❓ STARTSWITH函数区分大小写吗？

是的,STARTSWITH函数区分大小写。

```js
// ✅ 正确:区分大小写
STARTSWITH("Hello", "Hello")  // 返回: true
STARTSWITH("Hello", "hello")  // 返回: false

// 如需不区分大小写,需要先转换
STARTSWITH(LOWER("Hello"), LOWER("hello"))  // 返回: true
```

### ❓ 空字符串作为前缀会返回什么？

空字符串作为前缀会返回false,因为函数对空值有保护处理。

```js
// ✅ 正确理解
STARTSWITH("Hello", "")  // 返回: false
STARTSWITH("", "")       // 返回: false

// ❌ 错误理解
// 不是返回true，空字符串被函数判为无效参数
```

### ❓ 如何处理空值？

使用IF函数进行空值判断。

```js
// ✅ 正确:处理空值
IF(ISNULL([文本]), false, STARTSWITH([文本], "前缀"))

// ❌ 错误:不处理空值
STARTSWITH([文本], "前缀")  // 文本为空时可能出错
```

### ❓ 如何实现不区分大小写的前缀匹配？

结合LOWER或UPPER函数将文本统一转换为小写或大写。

```js
// ✅ 正确:不区分大小写匹配
STARTSWITH(LOWER([文本]), LOWER("Hello"))

// 示例
STARTSWITH(LOWER("HELLO World"), LOWER("hello"))  // 返回: true
```

### ❓ STARTSWITH能匹配多个前缀吗？

需要使用OR连接多个STARTSWITH判断。

```js
// ✅ 正确:匹配多个前缀
STARTSWITH([文本], "A") OR STARTSWITH([文本], "B") OR STARTSWITH([文本], "C")

// 示例:判断是否以A、B、C开头
STARTSWITH("A001", "A") OR STARTSWITH("A001", "B")  // 返回: true
```

### ❓ STARTSWITH和CONTAINS的区别？

STARTSWITH只检查开头,CONTAINS检查整个字符串是否包含。

```js
// ✅ 正确理解差异
STARTSWITH("Hello World", "World")  // 返回: false (World不在开头)
CONTAINS("Hello World", "World")    // 返回: true (包含World)

STARTSWITH("Hello World", "Hello")  // 返回: true (Hello在开头)
CONTAINS("Hello World", "Hello")    // 返回: true (包含Hello)
```

---

## 六、搭配使用技巧

### 技巧 1:多条件前缀匹配

使用OR连接多个STARTSWITH判断。

```js
IF(STARTSWITH([编号], "A") OR STARTSWITH([编号], "B"), "AB类", "其他类")
```

### 技巧 2:不区分大小写匹配

结合LOWER函数实现不区分大小写。

```js
STARTSWITH(LOWER([文本]), LOWER([前缀]))
```

### 技巧 3:复合条件筛选

结合其他条件进行复合筛选。

```js
IF(STARTSWITH([产品编号], "A") AND [价格] > 1000, "高端A类产品", "其他")
```

### 技巧 4:嵌套判断多级分类

使用嵌套IF进行多级分类。

```js
IF(STARTSWITH([编号], "A1"), "A1类",
   IF(STARTSWITH([编号], "A2"), "A2类",
      IF(STARTSWITH([编号], "A"), "A类", "其他")))
```

### 技巧 5:前缀提取和验证

先提取前缀再验证。

```js
STARTSWITH(LEFT([文本], 3), "ABC")  // 提取前3个字符后判断
```

---

## 七、相关函数对比

| 函数 | 作用 | 返回值示例 | 使用场景 |
|------|------|-----------|---------|
| **STARTSWITH** | 判断是否以指定前缀开头 | true/false | 前缀验证、分类 |
| **CONTAINS** | 判断是否包含指定子串 | true/false | 内容搜索、筛选 |
| **LEFT** | 提取左侧指定长度的字符 | "Hello" | 提取前缀文本 |
| **FIND** | 查找子串位置 | 1、-1 | 定位子串位置 |

**详细对比:**

```js
// 文本: "Hello World"
STARTSWITH("Hello World", "Hello")  // 返回: true (以Hello开头)
CONTAINS("Hello World", "World")    // 返回: true (包含World)
LEFT("Hello World", 5)              // 返回: "Hello" (提取前5个字符)
FIND("Hello World", "World")        // 返回: "orld" (提取World)，不是位置值
```

---

## 八、注意事项

### ⚠️ 函数区分大小写

STARTSWITH区分大小写,需要注意大小写匹配。

```js
// ❌ 错误:大小写不匹配
STARTSWITH("Hello", "hello")  // 返回: false

// ✅ 正确:统一大小写
STARTSWITH(LOWER("Hello"), LOWER("hello"))  // 返回: true
```

### ⚠️ 注意空值处理

对可能为空的字段进行空值判断。

```js
// ❌ 错误
STARTSWITH([文本字段], "前缀")  // 空值时可能出错

// ✅ 正确
IF(ISNULL([文本字段]), false, STARTSWITH([文本字段], "前缀"))
```

### ⚠️ 前缀必须精确匹配

前缀必须从第一个字符开始完全匹配。

```js
// ❌ 错误:前缀不在开头
STARTSWITH("Hello World", "World")  // 返回: false

// ✅ 正确:前缀在开头
STARTSWITH("Hello World", "Hello")  // 返回: true
```

### ⚠️ 空字符串前缀特殊情况

空字符串作为前缀将返回false,因为函数对空值进行了保护处理。

```js
// ❌ 错误:误以为返回true
STARTSWITH("Hello", "")  // 返回: false

// ✅ 正确:空字符串不会误判为匹配
IF([前缀] = "", false, STARTSWITH([文本], [前缀]))  // 先排除空前缀
```

### ⚠️ 注意空格影响

前后的空格会影响匹配结果。

```js
// ❌ 错误:有空格干扰
STARTSWITH(" Hello", "Hello")  // 返回: false (开头有空格)

// ✅ 正确:先清理空格
STARTSWITH(TRIM(" Hello"), "Hello")  // 返回: true
```

---
