---
title: 明细自动汇总填充
---

# 明细自动汇总填充

## 需求

明细里每行的金额变化时：自动重算【合计金额】回填主表单；某行数量超 100 时标红提示。

## 思路

监听明细子控件值变化 → 读整张明细 `getFieldValue('明细')` → 遍历 `widgetValue` 求和 → `setFieldValue` 回填。明细联动是「监听子控件 + 整表读写」的组合拳。

## 完整代码

```js
cf.ready(function () {
  var DETAIL = '明细'        // 明细控件标题
  var AMOUNT_FIELD = 'Te_2'  // 明细内金额子控件 codeId

  function recalcTotal() {
    var detail = cf.form.getFieldValue(DETAIL) || {}
    var rows = detail.widgetValue || []

    var total = rows.reduce(function (sum, row) {
      var cell = row[AMOUNT_FIELD]
      // cell 结构与主表控件一致，按实际返回格式取值
      var num = Number((cell && cell.value !== undefined ? cell.value : cell) || 0)
      return sum + (isNaN(num) ? 0 : num)
    }, 0)

    cf.form.setFieldValue('合计金额', String(total))

    // 数量异常提示
    rows.forEach(function (row, i) {
      var qty = Number(row['Te_1'] || 0)
      if (qty > 100) {
        cf.call('toast', {
          status: 'warn',
          content: '第 ' + (i + 1) + ' 行数量超过 100，请确认是否填写有误'
        })
      }
    })
  }

  // 监听明细内子控件变化（绑定明细控件的行级监听）
  cf.form.addFieldValueChangeEventListener(DETAIL, recalcTotal)

  // 进页面先算一次（草稿/回显场景）
  recalcTotal()
})
```

## 注意事项

- 非编辑态读明细用 `getFieldValue('明细')` 拿 `{widgetValue: [...]}`；编辑态行级操作用 `getDetailFieldValue` 系列
- 子控件在行内的取值结构以实际打印为准，先 `console.log(rows[0])` 看清再写取值逻辑
- `reduce` 求和时对非数字做 `isNaN` 兜底，避免 `NaN` 传染
- 更复杂的「明细筛选回填主表」场景见片段《[从明细中筛选符合条件记录并自动填充至主表单控件](/snippets/filter-detail-fill-main-form.html)》
