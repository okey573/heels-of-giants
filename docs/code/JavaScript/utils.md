---
title: 工具类
---

工具类型的方法

## 防抖

```javascript
const debounce = function (fn, wait, immediate) {
  // 自由变量，debounce执行完成被释放，time也不会被释放
  let time;
  // 返回一个闭包，接受参数
  return function (...args) {
    // 保存闭包被调用时的this
    const this_ = this;
    // 清除上一次的定时器
    if (time) {
      clearTimeout(time);
    }
    // 配置开关
    if (immediate) {
      const action = !time;
      // time没置空前因为time存在，所以fn不会执行
      time = setTimeout(function () {
        fn.apply(this_, args);
        // 每隔wait时间将time置为空
        time = null;
      }, wait);
      if (action) {
        fn.apply(this_, args);
      }
    } else {
      // 不再是直接执行fn，在内部传递参数
      time = setTimeout(function () {
        // 通过apply修改fn的this
        fn.apply(this_, args);
      }, wait);
    }
  }
};
```

## 节流

```javascript
const throttle = function (fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}
```

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
