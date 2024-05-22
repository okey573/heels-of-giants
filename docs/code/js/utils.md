---
title: 工具类
lastUpdated: Wed May 22 2024 15:45:11 GMT+0800 (中国标准时间)
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

## createDefaultValueObjectArray

创建一个指定长度的数组，存在每个数组元素都指向同一块内存的引用问题

```javascript
const createArray = (length, obj) => {
  return Array.apply(null, { length }).map(_ => obj)
  // return Array.from(Array(length), item => obj)
}
```

## badge log

```javascript
function badgeLog (leftText, rightText, leftColor = '#606060', rightColor = '#1475b2') {
  console.log(`%c ${leftText} %c ${rightText} `, `padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ${leftColor};`, `padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ${rightColor};`)
}
```

## timer log

```javascript
const id = 'id'
console.time(id)
// do something
console.timeEnd(id)
```
