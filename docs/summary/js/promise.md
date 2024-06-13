---
title: promise
outline: [2,6]
lastUpdated: Thu Jun 13 2024 16:22:04 GMT+0800 (中国标准时间)
---

# Promise是什么？

Promise 是异步编程的一种解决方案： 从语法上讲，promise是一个对象，从它可以获取异步操作的消息

## Promise 解决的问题

- 回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象
- promise可以支持多个并发的请求，获取并发请求中的数据
- 这个promise可以解决异步的问题，本身不能说promise是异步的

## Promise 的状态

promise 有 3 个状态，分别是 pending, fulfilled 和 rejected

在 pending 状态，promise 可以切换到 fulfilled 或 rejected

在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value

在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason

## Promise 的一些特性

- Promise构造函数是同步执行的，promise.then中的函数是异步执行的
- 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用
- promise 可以链式调用。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用
- promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值
- .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。可以使用Promise.reject或者throw new Error
- .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
- promise.then属于microtask

## Promise A+

Promise A+ 是一个规范，只要是满足这个规范的对象，都可以当成ES6的promise来使用，例如使用await关键字等

https://promisesaplus.com/

## Promise 的静态方法

|    **方法**     |                                                                              **描述**                                                                              |
|:-------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|      all      | 接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。 |
|  allSettled   |                       将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。                        |
|      any      |    将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。    |
|     race      |                                            接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着第一个 promise 的敲定而敲定。                                             |
|    reject     |                                                            返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数。                                                             |
|    resolve    |           将给定的值转换为一个 Promise。如果该值本身就是一个 Promise，那么该 Promise 将被返回；如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；否则，返回的 Promise 将会以该值兑现。            |
| withResolvers |                                              返回一个对象，其包含一个新的 Promise 对象和两个函数，用于解决或拒绝它，对应于传入给 Promise() 构造函数执行器的两个参数。                                              |

## 实现 Promise

_TODO 实现 Promise 类_

### 实现 Promise.all

```javascript
function theAll (promises) {
  let count = 0
  const vals = new Array(promises.length)
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((resp) => {
        vals[i] = resp
        count++
        if (count === promises.length) {
          resolve[vals]
        }
      }, (err) => {
        reject(err)
        return
      })
    }
  })
}
```

### 实现 Promise.race

```javascript
function theRace (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve, reject)
    })
  })
}
```

### 实现 Promise.allSettled

```javascript
function theAllSettled (promises) {
  let count = 0
  const vals = new Array(promises.length)
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((resp) => {
        vals[i] = {
          satus: 'fulfilled',
          value: resp
        }
        count++
        if (count === promises.length) {
          resolve[vals]
        }
      }, (err) => {
        vals[i] = {
          satus: 'rejected',
          value: err
        }
        count++
        if (count === promises.length) {
          resolve[vals]
        }
      })
    }
  })
}
```

## 一些零碎的问题

::: details Promise then 第二个参数和 catch 的区别
区别就是 catch 可以继续捕获 then 当中抛出的异常
:::
