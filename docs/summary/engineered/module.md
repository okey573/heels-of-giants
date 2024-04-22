---
title: 模块化
---

# 模块化

## CommonJS

CommonJS 是社区规范，不是官方规范。所以它对应的 **module** 和 **require** 这些并不是关键字，只是一个对象或者函数。

## ESM

ES Module

## CommonJS 和 ESM 的区别

- CommonJS 模块输出的是一个值的拷贝，ESM 模块输出的是值的引用
- CommonJS 模块是运行时加载，ESM 模块是编译时输出接口
- CommonJS 模块的 require() 是同步加载模块，ESM 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段
- ESM 更好的支持 tree-shaking ，因为可以静态分析。就是 CommonJS 的 require 中可以写变量，无法做到静态分析

## 参考链接

- [Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)

- [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.cn/post/6844903576309858318)

- [浅谈前端模块化的发展历程](https://www.jianshu.com/p/850c139899f5)

- [「万字进阶」深入浅出 Commonjs 和 Es Module](https://blog.csdn.net/qq_53669554/article/details/122112232)
