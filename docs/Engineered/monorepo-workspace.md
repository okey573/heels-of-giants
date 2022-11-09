---
title: monorepo&workspace
titleTemplate: monorepo&workspace
description: monorepo和workspace
lastUpdated: true
layout: doc
aside: true
outline: 2
---

# monorepo
monorepo（单一代码库）不是什么特定的技术或框架或算法，是一种概念。意思是在版本控制系统的单个代码库里包含了许多项目的代码。这些项目虽然有可能是相关的，但通常在逻辑上是独立的，并由不同的团队维护。可以单独运行发布。与之相对的是multirepo（多代码库）。

## monorepo的优点
- 可见性
- 更简单的依赖关系
- 唯一依赖源
- 一致性
- 共享时间线
- 原子提交
- 隐式 CI
- 统一的构建流程

## monorepo的缺点
- 代码量巨大
- 性能差
- 破坏主线
- 所有权难以控制


# workspace
通常与monorepo一起使用的还有workspace，这是包管理器的功能，npm v7开始也支持。yarn pnpm learn 这些都同样支持。通常是只要完成配置即可。
