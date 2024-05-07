---
title: fiber
lastUpdated: Tue May 07 2024 15:52:42 GMT+0800 (中国标准时间)
---

# fiber

## 解决的问题

JavaScript 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待

如果 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿

而这也正是 React 15 的 Stack Reconciler 所面临的问题，当 React在渲染组件时，从开始到渲染完成整个过程是一气呵成的，无法中断

如果组件较大，那么js线程会一直执行，然后等到整棵 VDOM 树计算完成后，才会交给渲染的线程

这就会导致一些用户交互、动画等任务无法立即得到处理，导致卡顿的情况

[Fiber vs Stack Demo](https://github.com/claudiopro/react-fiber-vs-stack-demo)

## fiber 是什么

- 从架构角度来看，Fiber 是对 React 核心算法（即调和过程）的重写
- 从运行机制上来解释，fiber是一种流程让出机制，它能让react中的同步渲染进行中断，并将渲染的控制权让回浏览器，从而达到不阻塞浏览器渲染的目的。
- 从数据角度来解释，fiber能细化成一种数据结构，或者一个执行单元。

## 实现原理

react 通过 MessageChannel + requestAnimationFrame 自己模拟实现了 requestIdleCallback 实现的

## 参考链接

- [【react】什么是fiber？fiber解决了什么问题？从源码角度深入了解fiber运行机制与diff执行](https://blog.csdn.net/echolunzi/article/details/125586636)

- [面试官：说说对Fiber架构的理解？解决了什么问题？](https://vue3js.cn/interview/React/Fiber.html)
