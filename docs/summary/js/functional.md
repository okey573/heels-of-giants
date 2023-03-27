---
title: 函数式编程
---

# 函数式编程

## 纯函数

不会产生副作用，对于相同的参数每次执行结果都一样。例如 splice 和 slice 来说， splice 就不是纯函数， slice 是纯函数

## pipe

返回一个函数，参数是多个函数。返回的函数被调用时，参数函数从左到右执行

## compose

返回一个函数，参数是多个函数。返回的函数被调用时，参数函数从右到左执行

## curry

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

## container & functor

产生一种对应的新数据结构，对数据封装，只能在容器内操作数据

## 参考链接

- [JavaScript 函数式编程](https://cheogo.github.io/learn-javascript/201710/functional.html)
