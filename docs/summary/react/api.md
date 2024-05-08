---
title: api
outline: [2,6]
lastUpdated: Wed May 08 2024 10:01:38 GMT+0800 (中国标准时间)
---

# api

React 官方的一些 api

## use

> use 是一个 React API，它可以让你读取类似于 Promise 或 context 的资源的值。

一般是配合 Suspense 组件使用，注意 use 所包裹的 promise **不应该在 hooks 或者组件中创建**

```typescript
// 对于参数是 Promise 类型的简单实现如下：
const use = (promise: Promise) => {
  if (promise.status === 'fulfilled') {
    return promise.value
  } else if (promise.status === 'rejected') {
    throw promise.reason
  } else if (promise.status === 'pending') {
    throw promise
  } else {
    promise.status = 'pending'
    promise.then(
      // @ts-ignore
      result => {
        promise.status = 'fulfilled'
        promise.value = result
      },
      // @ts-ignore
      reason => {
        promise.status = 'rejected'
        promise.reason = reason
      },
    )
    throw promise
  }
}
```

## memo

::: info memo 允许你的组件在 props 没有改变的情况下跳过重新渲染

```typescript
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```
