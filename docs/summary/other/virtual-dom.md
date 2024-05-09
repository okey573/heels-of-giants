---
title: virtual dom
---

# virtual DOM

## 什么是 virtual DOM

Virtual DOM是对真实 DOM 的抽象,本质上是 JavaScript 对象,这个对象就是更加轻量级的对 DOM 的描述.

## Virtual DOM 的优点

- 可以减少操作 dom 的次数，不仅是因为操作 dom 相对较慢，更因为频繁变动DOM会造成浏览器的回流或者重绘，因此我们需要这一层抽象，在 patch 过程中尽可能地一次性将差异更新到 DOM 中,这样保证了 DOM 不会出现性能很差的情况。
- 现代框架都是数据驱动视图，要求无须操作dom
- 更好的跨平台，更好的实现SSR

## Virtual DOM 的缺点

- 无法极致性能优化
- 初始化 dom 时，因为多了一层计算，会比正常的慢

## Virtual DOM 的要素

- Virtual DOM 创建
- Virtual DOM Tree 创建
- Virtual DOM 更新
- Virtual DOM Diff 算法

## 参考链接

- [[react] 什么是虚拟dom？虚拟dom比操作原生dom要快吗？虚拟dom是如何转变成真实dom并渲染到页面的?](https://blog.csdn.net/echolunzi/article/details/125586796)
