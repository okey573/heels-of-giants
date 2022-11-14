---
title: mvvm
---

mvvm是 Model-View-ViewModel 的缩写，即 模型-视图-视图模型

## mvvm是什么

- Model：应用数据以及逻辑，后端传递的数据。(data，props，computed等部分）
- View：代表 UI 组件，它负责将数据模型转化成 UI 展现出来。（template部分）
- ViewModel：是一个同步View 和 Model的对象。MVVM模式的核心，它是连接Model和View的桥梁。

vue的核心，双向绑定、监听（watch）、操作（methods）等部分

## 为什么需要MVVM

前端开发中暴露出了三个痛点问题：

1. 开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护。
2. 大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
3. 当 Model 频繁发生变化，开发者需要主动更新到 View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到 Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

早期 jquery 的出现就是为了前端能更简洁的操作 DOM 而设计的，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在

## MVVM的优点

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互， Model 和 ViewModel 之间的交互是双向的，
因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到View 上。
ViewModel 通过双向数据绑定把 View 和 Model 连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM， 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## ViewModel的两个方向

1. 将 Model 转化成 View ，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。
2. 将 View 转化成 Model ，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听

这两个方向都实现的，我们称之为数据的双向绑定

## MVC和MVP

#### MVC

MVC表示模型-视图-控制器 Model-View-Controller

用户操作->View（负责接收用户的输入操作）->Controller（业务逻辑处理）->Model（数据持久化）->View（将结果反馈给View）

#### MVP

MVP表示模型-视图-演示者 Model-View-Presenter

View 与 Model之间不通信，都通过 Presenter 传递。Presenter完全把Model和View进行了分离，主要的程序逻辑在Presenter里实现
