---
title: Promise
---

# Promise是什么？

Promise 是异步编程的一种解决方案： 从语法上讲，promise是一个对象，从它可以获取异步操作的消息

## Promise解决的问题

- 回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象
- promise可以支持多个并发的请求，获取并发请求中的数据
- 这个promise可以解决异步的问题，本身不能说promise是异步的

## Promise的状态

promise 有 3 个状态，分别是 pending, fulfilled 和 rejected

在 pending 状态，promise 可以切换到 fulfilled 或 rejected

在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value

在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason

## Promise的一些特性

- Promise构造函数是同步执行的，promise.then中的函数是异步执行的
- 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用
- promise 可以链式调用。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用
- promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值
- .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。可以使用Promise.reject或者throw new Error
- .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
- promise.then属于microtask

## 实现Promise

_coming soon..._
