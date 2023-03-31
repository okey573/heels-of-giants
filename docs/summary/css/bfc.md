---
title: bfc
---

# BFC

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

MDN给出的解释是：BFC是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

## 布局规则

- 内部的Box会在垂直方向，一个一个地布置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的Margin会发生重叠，也就是外边距塌陷。
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box叠加。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
- 计算BFC的高度时，浮动元素也参与计算。

## 触发条件

- 设置浮动，float的值不为none
- 设置定位，position的值为absolute或fixed
- 行内块显示模式，display的值为inline-block,inline-flex,table-cell等
- 设置overflow，值不为visible

## BFC的作用

1. 解决高度坍塌
2. 解决margin重叠问题
3. 阻止元素被浮动元素覆盖


## IFC

TODO
