---
title: 事件机制
---

# 事件循环机制

## 写在前面

_js的运行机制在node环境和在浏览器环境是不同的_

对于浏览器环境，主要是运行在浏览器的渲染进程中的 JS 引擎线程上，其他事件比如定时任务，运行在对应的定时触发器线程上

## 事件执行顺序

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。任务分为同步任务和异步任务，异步任务分为宏任务和微任务（并不是所有的宏任务都是异步任务，例如整个script块就是宏任务）
2. 执行同步任务，异步任务进入event table，进入到event table的任务到了指定时间会进入event queue（比如ajax返回，setTimeout的延迟结束）
3. event queue分为宏任务的队列和微任务的队列，从event table进入到event queue时，会根据任务类型进入到不同的队列
4. 执行宏任务
5. 执行所有队列中的微任务，包括在执行过程中新进入队列的微任务
6. js线程挂起，gui接管 dom渲染更新
7. vue的nextTick就是在此时执行

## 宏任务和微任务的区分

- 宏任务：当前调用栈中执行的代码成为宏任务。（主代码快，宿主发起的任务也就是node或者浏览器发起的任务，定时器等等）。
- 微任务： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件。（promise.then，proness.nextTick等等）。
- 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护

## vue的nextTick

首先有个重点，dom的更新是实时的。DOM的操作是能够实时得到反馈的，上一行代码操作了DOM，下一行就能获取到；

但是Vue实现响应式并不是数据发生变化之后DOM立即变化，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。

_Vue 开启一个异步队列，并缓冲在此事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次_

nextTick声明了microTimerFunc和macroTimerFunc 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。

对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel（后来改用了MutationObserver），如果也不支持的话就会降级为 setTimeout 0；
而对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现。

## 验证

```js
console.log('1')

// setTimeout是宏任务
setTimeout(function () {
  console.log('2')
  process.nextTick(function () {
    console.log('3')
  })
  new Promise(function (resolve) {
    console.log('4')
    resolve()
  }).then(function () {
    console.log('5')
  })
})

// nextTick是微任务
process.nextTick(function () {
  console.log('6')
})

// promise.then是微任务, 本身是同步任务; promise.then的优先级低于nextTick
new Promise(function (resolve) {
  console.log('7')
  resolve()
}).then(function () {
  console.log('8')
})

// setTimeout是宏任务
setTimeout(function () {
  console.log('9')
  process.nextTick(function () {
    console.log('10')
  })
  new Promise(function (resolve) {
    console.log('11')
    resolve()
  }).then(function () {
    console.log('12')
  })
})


/**
 * 1
 * 7
 * 6
 * 8
 * 2
 * 4
 * 3
 * 5
 * 9
 * 11
 * 10
 * 12
 */

```
## 新的事件循环

每个任务都有一个任务类型， 同⼀个类型的任务必须在⼀个队列， 不同类型的任务可以分属于不同的队列。

- 延时队列：⽤于存放计时器到达后的回调任务，优先级「中」
- 交互队列：⽤于存放⽤户操作后产⽣的事件处理任务，优先级「⾼」
- 微队列：⽤户存放需要最快执⾏的任务，优先级「最⾼」
