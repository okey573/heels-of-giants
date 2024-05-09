---
title: bfc
lastUpdated: Thu May 09 2024 16:31:39 GMT+0800 (中国标准时间)
---

# BFC

**区块格式化上下文**（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

## 触发条件

* 文档的根元素（`<html>`）。
* 浮动元素（即 `float` 值不为 `none` 的元素）。
* 绝对定位元素（`position` 值为 `absolute` 或 `fixed` 的元素）。
* 行内块元素（`display` 值为 `inline-block` 的元素）。
* 表格单元格（`display` 值为 `table-cell`，HTML 表格单元格默认值）。
* 表格标题（`display` 值为 `table-caption`，HTML 表格标题默认值）。
* 匿名表格单元格元素（`display` 值为 `table`（HTML 表格默认值）、`table-row`（表格行默认值）、`table-row-group`（表格体默认值）、`table-header-group`（表格头部默认值）、`table-footer-group`（表格尾部默认值）或 `inline-table`）。
* `overflow` 值不为 `visible` 或 `clip` 的块级元素。
* `display` 值为 `flow-root` 的元素。
* `contain` 值为 `layout`、`content` 或 `paint` 的元素。
* 弹性元素（`display` 值为 `flex` 或 `inline-flex` 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
* 网格元素（`display` 值为 `grid` 或 `inline-grid` 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
* 多列容器（`column-count` 或 `column-width` 值不为 `auto`，且含有 `column-count: 1` 的元素）。
* `column-span` 值为 `all` 的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中

## BFC 的作用

- 包含内部浮动（解决高度坍塌）
- 排除外部浮动（阻止元素被浮动元素覆盖）
- 防止外边距重叠（解决margin重叠问题）

## 布局规则

- 内部的Box会在垂直方向，一个一个地布置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的Margin会发生重叠，也就是外边距塌陷。
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box叠加。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
- 计算BFC的高度时，浮动元素也参与计算。

## IFC

TODO

## 参考链接

- [区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

- [面试官：谈谈你对BFC的理解？](https://vue3js.cn/interview/css/BFC.html)

- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
