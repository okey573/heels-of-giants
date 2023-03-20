---
title: 变量类型
outline: [2,6]
---

# variable

变量类型可分为基本类型和引用类型（对象）

## 基本类型

在 JavaScript 中，基本类型（基本数值、基本数据类型）是一种既非对象也无方法或属性 (en-US)的数据。有 7 种原始数据类型

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

所有基本类型的值都是不可改变的。但需要注意的是，基本类型本身和一个赋值为基本类型的变量的区别。变量会被赋予一个新值，而基本类型不能像数组、对象以及函数那样被改变。

基本类型没有方法，但仍然表现得像有方法一样。当在基本类型上访问属性时，JavaScript 自动将值装入包装器对象中，并访问该对象上的属性。例如，"foo".includes("f") 隐式创建了一个 String 包装对象，并在该对象上调用 String.prototype.includes()。这种自动装箱行为在 JavaScript 代码中是无法观察到的，但却是各种行为的一个很好的心理模型——例如，为什么“改变”基本类型不起作用（因为 str.Foo = 1 不是赋值给 str 本身的 Foo 属性，而是赋值给了一个临时包装器对象）

## 引用类型（对象）

- Object
- Function
- Date
- 一大堆...


## 隐式类型转换

### 转换为 String

算法运算符（+）， 任何值和字符串做 + 时，都会先转换为字符串

### 转换为Number

算法运算符（- * / %），任何值做 - * / % ，都会将其转换为 Number ，再做运算

一元运算符（+），对于非 Number类型的值，会把任意变量都转换成数字

### 转换为Boolean

逻辑计算符（!非），! 对一个布尔值做取反运算；如果对非布尔值取反，则会将其转换为布尔值，再取反；

### 字符串和数字运算

- 字符串加数字 数字就会转成字符串
- 数字减字符串，字符串转成数字。如果字符串不是纯数字就会转成NaN。字符串减数字也一样。两个字符串相减也先转成数字

### == 运算时的类型转换

- undefined == null
- 字符串和数字比较时，字符串转数字
- 数字为布尔比较时，布尔转数字
- 字符串和布尔比较时，两者转数字

### 类型转换表

| 始值               | 转换为数字     | 转换为字符串            | 转换为逻辑 |
|:----------------:|:---------:|:-----------------:|:-----:|
| false            | 0         | "false"           | false |
| true             | 1         | "true"            | true  |
| 0                | 0         | "0"               | false |
| 1                | 1         | "1"               | true  |
| "0"              | 0         | "0"               | true  |
| "000"            | 0         | "000"             | true  |
| "1"              | 1         | "1"               | true  |
| NaN              | NaN       | "NaN"             | false |
| Infinity         | Infinity  | "Infinity"        | true  |
| -Infinity        | -Infinity | "-Infinity"       | true  |
| ""               | 0         | ""                | false |
| "20"             | 20        | "20"              | true  |
| "twenty"         | NaN       | "twenty"          | true  |
| [ ]              | 0         | ""                | true  |
| [20]             | 20        | "20"              | true  |
| [10,20]          | NaN       | "10,20"           | true  |
| ["twenty"]       | NaN       | "twenty"          | true  |
| ["ten","twenty"] | NaN       | "ten,twenty"      | true  |
| function(){}     | NaN       | "function(){}"    | true  |
| {}              | NaN       | "[object Object]" | true  |
| null             | 0         | "null"            | false |
| undefined        | NaN       | "undefined"       | false |

## 参考链接

- [JavaScript 类型转换](https://www.w3school.com.cn/js/js_type_conversion.asp)

- [js隐式类型转换](https://juejin.cn/post/7006210269345120293)