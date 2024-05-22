---
title: 工具类
lastUpdated: Wed May 22 2024 16:05:51 GMT+0800 (中国标准时间)
---

# 工具类型的方法

## 防抖

::: code-group

```javascript [基础版]
const debounce = function (fn, delay) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

```javascript [控制立即执行]
const debounce = function (fn, delay, immediate) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    if (immediate) {
      const action = !timer
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
      action && fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}
```

:::

## 节流

::: code-group

```javascript [时间戳实现]
// 第一次会立即触发
const throttle = function (fn, delay, immediate) {
  let last = 0
  return function (...args) {
    if (Date.now() - last > delay) {
      fn.apply(this, args)
      last = Date.now()
    }
  }
}
```

```javascript [定时器实现]
// 第一次不会立即触发
const throttle = function (fn, delay, immediate) {
  let timer
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}
```

```javascript [二者结合]
// 时间戳和定时器结合，实现最后一次必定触发
const throttle = function (fn, delay) {
  let timer
  let last = 0
  return function (...args) {
    if (Date.now() - last > delay) {
      fn.apply(this, args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        last = Date.now()
      }, delay)
    }
  }
}
```

:::

## delay

```javascript
const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))
```

## typeOf

```javascript
const typeOf = (o) => Object.prototype.toString.call(o).match(/\[object (.*?)\]/)[1].toLowerCase()
```

## 创建数组

[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84)

::: code-group

```javascript [指定长度]
// 用构造函数创建的是稀疏数组，后续还可以用 fill 方法填充值
new Array(100)

// 不同的写法，这样创建的不是稀疏数组
Array.apply(null, { length: 100 })

// Array.from 还有第二个参数是一个 map 函数
Array.from({ length: 100 })
```

```javascript [连续数字数组]
[...new Array(100).keys()]
```

:::

## 控制台

#### badgeLog

```javascript [badgeLog]
function badgeLog (leftText, rightText, leftColor = '#606060', rightColor = '#1475b2') {
  console.log(`%c ${leftText} %c ${rightText} `, `padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ${leftColor};`, `padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ${rightColor};`)
}
```

#### timer log

```javascript
const id = 'id'
console.time(id)
// do something
console.timeEnd(id)
```
