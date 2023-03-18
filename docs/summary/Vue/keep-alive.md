---
title: keep-alive
outline: [2,6]
---

vue的内置组件[keep-alive](https://cn.vuejs.org/guide/built-ins/keep-alive.html#keepalive)

## 作用

keep-alive的作用是多个组件间动态切换时缓存被移除的组件实例

## 声明周期

keep-alive组件会增加两个生命周期：activated和deactivated

若当前组件加入了keep-alive

第一次进入这个组件会执行beforeCreate、created、beforeMount、mounted和activated五个生命周期

第二次或者第N次进去组件只会执行一个生命周期activated

## 包含/排除

keep-alive默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop 来定制该行为

## 原理

定义一个KeepAlive组件，定义了一个abstract属性，props接受所有支持的参数

keep-alive在它生命周期内定义了三个钩子函数：

#### created

初始化两个对象分别缓存VNode（虚拟DOM）和VNode对应的键集合

#### destroyed

删除this.cache中缓存的VNode实例。我们留意到，这里不是简单地将this.cache置为null，而是遍历调用pruneCacheEntry函数删除。

删除缓存VNode还要对应执行组件实例的destory钩子函数。

#### mounted

在mounted这个钩子中对include和exclude参数进行监听，然后实时地更新（删除）this.cache对象数据。pruneCache函数的核心也是去调用pruneCacheEntry。

#### render

- 第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
- 第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
- 第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；
- 第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max的设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）。
- 第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。

#### 不生成真正的dom节点

Vue在初始化生命周期的时候，为组件实例建立父子关系会根据abstract属性决定是否忽略某个组件。在keep-alive中，设置了abstract: true，那Vue就会跳过该组件实例。

#### 只执行一次的钩子函数

当vnode.componentInstance和keepAlive同时为truly值时，不再进入$mount过程，那mounted之前的所有钩子函数（beforeCreate、created、mounted）都不再执行。
