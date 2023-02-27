---
title: 盒模型
outline: [2,6]
---

盒模型

## 定义

所有 HTML 元素都可以视为方块，它具有： content，padding，border，margin 四个属性。然后这个方块又包着几个小方块，如同盒子一层层的包裹着，这就是所谓的盒模型。

## 分类

#### W3C 标准盒模型

属性 width, height 只包含内容 content，不包含 border 和 padding

#### IE 盒模型

属性 width,height 包含 border 和 padding，指的是 content + padding + border

## 设置盒模型类型的方法

- css 设置标准模型：box-sizing: context-box (也是浏览器默认的盒模型)；
- css 设置Ie模型：box-sizing: border-box

