---
title: 响应式原理
---

# 响应式原理

## 1. initState初始化响应式对象

在 Vue 的初始化阶段，_init 方法执行的时候，会执行 initState(vm) 方法。

initState 方法主要是对 props、methods、data、computed 和 wathcer 等属性做了初始化操作。
initState 对于props和data主要完成了两件事

- 调用 defineReactive 把 prop 和 data变成响应式的。而 defineReactive 的核心是使用 Observer， Observer 是一个类，它的作用是给对象的属性添加 getter 和 setter，用于依赖收集和派发更新
- 把 data 和 prop 代理到 vm 实例上

## 2. 收集依赖（vue采用观察者模式完成依赖收集）

**getter部分**

- 依赖的数据是`观察目标`
- 视图、计算属性、侦听器这些是`观察者`

每个组件实例都有相应的watcher实例

- 渲染组件的过程，会把属性记录为依赖
- 当我们操纵一个数据时，依赖项的setter会被调用，从而通知watcher重新计算，从而致使与之相关联的组件得以更新

###### 每一个数据都有的Dep类实例

Dep类实例依附于每个数据而出来，用来管理依赖数据的Watcher类实例

###### Vue源码中实现依赖收集，实现了三个类：

- `Dep`：扮演观察目标的角色，每一个数据都会有Dep类实例，它内部有个subs队列，subs就是subscribers的意思，保存着依赖本数据的观察者，当本数据变更时，调用dep.notify()通知观察者
- `Watcher`：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例
- `Observer`：辅助的可观测类，数组/对象通过它的转化，可成为可观测数据

## 3. 派发更新

**setter部分**

当我们在组件中对响应的数据做了修改，就会触发 setter 的逻辑，最后调用 dep.notify() 方法， 它是 Dep 的一个实例方法。

这个方法的逻辑就是遍历所有的 subs，也就是 Watcher 的实例数组，然后调用每一个 watcher 的 update

## vue2

**Object.defineProperty**

Object.defineProperty 的缺陷在于需要深度遍历并对每一个属性进行劫持。

对于没有属性的数组而言，数组的索引也可以视为被劫持的属性。所以，Object.defineProperty是有监控数组下标变化的能力的，只是 Vue2.x 放弃了这个特性。

对象相同，对于新增的元素而言，不会触发监听事件，vue 对此的解决方案是劫持数组原型链上的函数（push、pop、shift、unshift、splice、sort、reverse）

## vue3

**Proxy**

Proxy 更加便捷
- 只需要劫持需要监听的对象即可
- 对新增的属性也不用再手动 observe
- Proxy支持 13 种拦截操作。
  - get
  - set
  - has
  - deleteProperty
  - ownKeys
  - getOwnPropertyDescriptor
  - defineProperty
  - preventExtensions
  - getPrototypeOf
  - isExtensible
  - setPrototypeOf
  - apply
  - construct
- 但是兼容性比defineProperty差，基本不支持ie。而且没有一个完美的 Polyfill

#### 惰性响应式

vue3 的响应式还是惰性响应式的，不会像 vue2 一样在初始化的时候就递归处理深层响应式对象， vue3 是在 get 函数中处理响应式。其中用了 weakMap 对象，做缓存区，避免重复代理的问题 
