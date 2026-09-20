# 「「云之家」」计算公式之 NOT_CONTAINS 函数

## 一、函数作用

`NOT_CONTAINS` 函数用来**检查是否不包含**，简单来说就是：
- 检查文本中是否不包含某个子文本
- 检查数组中是否不包含某个元素
- 返回 true（不包含）或 false（包含）
- 是 CONTAINS 函数的相反判断

常用于排除筛选、数据过滤、反向匹配等场景。

---

## 二、语法格式

```
NOT_CONTAINS(文本或数组, 子文本或元素)
```

### 参数说明

| 参数 | 说明 | 是否必填 | 示例 |
|------|------|----------|------|
| 文本或数组 | 被检查的对象，可以是：<br>• 文本字符串<br>• 数组<br>• 文本控件 | ✅ 必填 | NOT_CONTAINS("苹果手机", "电脑") |
| 子文本或元素 | 要查找的内容 | ✅ 必填 | "电脑" |

### 返回值

- **不包含时**：返回 **true**
- **包含时**：返回 **false**

---

## 三、实用示例

### 示例 1：检查文本不包含

```js
NOT_CONTAINS("iPhone手机", "电脑")      // 返回：true（不包含）
NOT_CONTAINS("运动鞋", "鞋")            // 返回：false（包含）
NOT_CONTAINS("云之家办公平台", "钉钉")   // 返回：true（不包含）
NOT_CONTAINS("Hello World", "Bye")     // 返回：true（不包含）
```

### 示例 2：检查数组不包含

```js
NOT_CONTAINS(["苹果", "香蕉", "橙子"], "葡萄")   // 返回：true（不包含）
NOT_CONTAINS(["苹果", "香蕉", "橙子"], "苹果")   // 返回：false（包含）
NOT_CONTAINS([1, 2, 3, 4, 5], 6)                // 返回：true（不包含）
NOT_CONTAINS([1, 2, 3, 4, 5], 3)                // 返回：false（包含）
```

### 示例 3：商品筛选

假设有【商品列表】：

| 商品名称 | 类别 |
|---------|------|
| iPhone手机 | 电子产品 |
| 运动鞋 | 服装鞋帽 |
| 笔记本电脑 | 电子产品 |
| 皮鞋 | 服装鞋帽 |

```js
// 筛选非电子产品（商品名称不包含"手机"和"电脑"）
NOT_CONTAINS(商品名称, "手机") && NOT_CONTAINS(商品名称, "电脑") && NOT_CONTAINS(商品名称, "平板")
// 运动鞋 -> true
// 皮鞋 -> true
// iPhone手机 -> false
```

### 示例 4：排除特定品牌

```js
// 排除三星品牌
NOT_CONTAINS(商品名称, "Samsung") && NOT_CONTAINS(商品名称, "三星")

// 排除特定关键词
NOT_CONTAINS(商品名称, "二手") && NOT_CONTAINS(商品名称, "翻新")
```

### 示例 5：权限检查

```js
// 检查权限列表中是否不包含管理员权限
NOT_CONTAINS(权限列表, "admin")  // 返回：true 表示不是管理员

// 检查用户角色是否不包含"访客"
NOT_CONTAINS(用户角色, "访客")
```

---

## 四、实际业务场景

### 场景 1：筛选非促销商品

筛选不在促销中的商品：

```js
// 【是否为正价商品】
NOT_CONTAINS(商品标签, "促销") && NOT_CONTAINS(商品标签, "特价") && NOT_CONTAINS(商品标签, "清仓")

// 【是否为非指定品牌】
NOT_CONTAINS(商品名称, "Apple") && NOT_CONTAINS(商品名称, "Samsung")
```

### 场景 2：客户分类

识别普通客户（非VIP）：

```js
// 【是否为普通客户】
NOT_CONTAINS(客户级别, "VIP") && NOT_CONTAINS(客户级别, "重要客户") && NOT_CONTAINS(客户级别, "大客户")

// 【不需要特殊关注】
NOT_CONTAINS(备注, "重点跟进") && NOT_CONTAINS(备注, "特殊关注")
```

### 场景 3：订单筛选

筛选正常订单（排除异常）：

```js
// 【订单状态正常】
NOT_CONTAINS(订单状态, "退款") &&
NOT_CONTAINS(订单状态, "投诉") &&
NOT_CONTAINS(订单状态, "异常") &&
NOT_CONTAINS(订单状态, "取消")
```

### 场景 4：地区筛选

排除偏远地区：

```js
// 【非偏远地区】
NOT_CONTAINS(收货地址, "西藏") &&
NOT_CONTAINS(收货地址, "新疆") &&
NOT_CONTAINS(收货地址, "内蒙")

// 【无需特殊配送】
NOT_CONTAINS(收货地址, "偏远") && NOT_CONTAINS(收货地址, "山区")
```

### 场景 5：文件类型筛选

排除特定文件类型：

```js
// 【不是可执行文件】
NOT_CONTAINS(文件名, ".exe") && NOT_CONTAINS(文件名, ".bat") && NOT_CONTAINS(文件名, ".sh")

// 【不是图片文件】
NOT_CONTAINS(文件名, ".jpg") && NOT_CONTAINS(文件名, ".png") && NOT_CONTAINS(文件名, ".gif")
```

---

## 五、常见问题

### NOT_CONTAINS 和 CONTAINS 的关系？

NOT_CONTAINS 是 CONTAINS 的相反判断：

```js
NOT_CONTAINS("手机", "电脑")  // 返回：true
// 等同于
!CONTAINS("手机", "电脑")     // 返回：true
```

**两种写法对比：**

```js
// 方法1：使用 NOT_CONTAINS
NOT_CONTAINS(商品名称, "手机")

// 方法2：使用 !CONTAINS
!CONTAINS(商品名称, "手机")

// 两者完全等价，推荐使用 NOT_CONTAINS，语义更清晰
```

### NOT_CONTAINS 区分大小写吗？

**是的**，NOT_CONTAINS 区分大小写。

```js
NOT_CONTAINS("Hello World", "world")   // 返回：true（不包含，大小写不同）
NOT_CONTAINS("Hello World", "World")   // 返回：false（包含）
NOT_CONTAINS("iPhone", "iphone")       // 返回：true（不包含，大小写不同）
```

### 空值会怎样？

如果被检查的文本为空，返回 **true**（空文本不包含任何内容）。

```js
NOT_CONTAINS("", "test")      // 返回：true
NOT_CONTAINS(空控件, "test")  // 返回：true
```

### 如何排除多个关键词？

使用 `&&`（且）运算符连接多个 NOT_CONTAINS：

```js
// 排除所有电子产品
NOT_CONTAINS(商品名称, "手机") &&
NOT_CONTAINS(商品名称, "电脑") &&
NOT_CONTAINS(商品名称, "平板") &&
NOT_CONTAINS(商品名称, "相机")
```

### 如何实现"包含A但不包含B"？

组合使用 CONTAINS 和 NOT_CONTAINS：

```js
// 包含"手机"但不包含"二手"
CONTAINS(商品名称, "手机") && NOT_CONTAINS(商品名称, "二手")

// 包含"苹果"但不包含"iPhone"
CONTAINS(商品名称, "苹果") && NOT_CONTAINS(商品名称, "iPhone")
```

---

## 六、搭配使用技巧

### 技巧 1：结合 IF 过滤数据

```js
// 只显示非电子产品
IF(NOT_CONTAINS(商品名称, "手机") && NOT_CONTAINS(商品名称, "电脑"), "显示", "隐藏")
```

### 技巧 2：设置数据验证

```js
// 验证备注中不能包含敏感词
IF(NOT_CONTAINS(备注, "禁用词1") && NOT_CONTAINS(备注, "禁用词2"),
   "✅ 通过",
   "❌ 包含敏感词")
```

### 技巧 3：多条件筛选

```js
// 筛选普通价位的非电子产品
NOT_CONTAINS(商品类别, "电子") &&
NOT_CONTAINS(商品类别, "数码") &&
商品价格 >= 100 &&
商品价格 <= 500
```

### 技巧 4：权限控制

```js
// 检查用户不是管理员也不是超级用户
NOT_CONTAINS(用户权限, "admin") && NOT_CONTAINS(用户权限, "superuser")
```

### 技巧 5：在 COUNTIF 中使用

```js
// 统计不包含"促销"的商品数量
COUNTIF(商品明细.控件自身, NOT_CONTAINS(商品明细.商品名称, "促销"))
```

---

## 七、相关函数对比

| 函数 | 作用 | 示例 | 结果 |
|------|------|------|------|
| **CONTAINS** | 检查是否包含 | CONTAINS("iPhone手机", "手机") | true |
| **NOT_CONTAINS** | 检查是否不包含 | NOT_CONTAINS("iPhone手机", "电脑") | true |
| **!CONTAINS** | 取反（等同NOT_CONTAINS） | !CONTAINS("iPhone手机", "电脑") | true |

**详细对比：**

```js
// 假设商品名称为"苹果手机"

CONTAINS(商品名称, "手机")         // 返回：true（包含）
NOT_CONTAINS(商品名称, "手机")     // 返回：false（包含，所以NOT返回false）
CONTAINS(商品名称, "电脑")         // 返回：false（不包含）
NOT_CONTAINS(商品名称, "电脑")     // 返回：true（不包含）
```

**记忆方法**：
- CONTAINS = 包含吗？
- NOT_CONTAINS = 不包含吗？

---

## 八、常见应用模式

### 模式 1：黑名单过滤

```js
// 过滤掉包含黑名单关键词的记录
NOT_CONTAINS(标题, "广告") &&
NOT_CONTAINS(标题, "spam") &&
NOT_CONTAINS(标题, "推广")
```

### 模式 2：排除特定类别

```js
// 只看非电子产品
IF(NOT_CONTAINS(商品分类, "电子") && NOT_CONTAINS(商品分类, "数码"),
   "显示此商品",
   "")
```

### 模式 3：安全检查

```js
// 确保文件名不包含危险字符
NOT_CONTAINS(文件名, "..") &&
NOT_CONTAINS(文件名, "/") &&
NOT_CONTAINS(文件名, "\\")
```

### 模式 4：数据清洗

```js
// 筛选干净的数据（不包含特殊标记）
NOT_CONTAINS(数据, "null") &&
NOT_CONTAINS(数据, "undefined") &&
NOT_CONTAINS(数据, "N/A")
```

---
