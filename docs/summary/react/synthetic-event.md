---
title: 合成事件
lastUpdated: Wed May 08 2024 14:57:31 GMT+0800 (中国标准时间)
---

# 合成事件 (SyntheticEvent)

React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等，这套事件机制被称之为合成事件。之所以要封装自己的一套事件机制，目的是为了实现全浏览器的一致性，抹平不同浏览器之间的差异性。

## 实现机制

在 React 底层，主要对合成事件做了两件事：事件委派 和 自动绑定。

## 参考链接

- [浅谈React合成事件](https://juejin.cn/post/6991645668934680584)

- [合成事件](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/synthetic-event/)
