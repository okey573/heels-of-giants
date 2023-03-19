---
title: BEM
---

# BEM

BEM是一种命名规范。或者说是一种class书写方式的方法论（methodology）

BEM是Block（块）、Element（元素）、Modifier（修饰符）的简写

## 规则

- 块名称为其元素和修饰符定义了命名空间。
- 块名称与元素名称之间用双连字符--分隔。
- 块名称与修饰符或元素与修饰符之间用双下划线__分隔。
- 命名一般使用小写字母。
- 单词之间可以使用-分隔。

## 表现

```css
.block {}

.block__element {}

.block--modifier {}

.block__element--modifier {}
```
