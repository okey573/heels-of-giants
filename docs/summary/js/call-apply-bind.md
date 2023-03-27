---
title: call apply bind
---

# call apply bind

_本文重点在[实现bind](/summary/js/call-apply-bind#实现bind)_

## 实现call

```js
Function.prototype.theCall = function () {
  const [context, ...args] = arguments
  context.fn = this
  context.fn(...args)
  delete context.fn
}
```

## 实现apply

```js
Function.prototype.theApply = function () {
  const [context, args] = arguments
  context.fn = this
  context.fn(...args)
  delete context.fn
}
```

## 实现bind

实现bind时，要考虑将function当做构造函数使用，以及bind时传参加上调用时传参的情况

- 当做构造函数调用，bind时传入的context是没有用的
- bind时的参数，会加在调用时的参数前面

```js{6}
Function.prototype.theBind = function () {
  const fn = this
  const [context, ...outArgs] = arguments
  const bound = function (...inArgs) {
    const args = outArgs.concat(inArgs)
    if (this instanceof bound) {
      return new fn(...args)
    } else {
      return fn.theApply(context, args)
    }
  }
  return bound
}
```

要理解上面高亮的这行代码，需要理解[new操作符](/summary/js/new)，[apply方法](/summary/js/call-apply-bind#实现apply)，和[instanceof](/summary/js/instanceof)

new操作符 是把构造函数的原型对象的一个拷贝对象当做构造函数的上下文，然后执行这个构造函数，然后返回对象

所以下面那行代码if判断中的this，就是这个拷贝对象。如果这个拷贝对象的原型链中有bound的原型对象，就是执行的new操作符

但是这个判断不是最完美的，因为这个情况也可以手动模拟，最好是用es6中的new.target来做判断
