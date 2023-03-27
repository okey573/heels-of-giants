---
title: vuex 和 pinia
outline: [2,6]
---

# vuex 和 pinia

## vuex

#### state

#### getter

#### mutation

#### action

#### module

## pinia

#### state

#### getter

#### mutation

## 对比

- 相比于Vuex，pinia是可以直接修改状态的。pinia去掉了mutations，所以在actions中修改state就行，而Vuex在mutations修改state一样。这样可以实现整个数据流程都在状态管理器内部，便于管理
- pinia没有modules配置，每一个独立的仓库都是defineStore生成出来的

## 总结

pinia从各个角度来说,使用都更方便
