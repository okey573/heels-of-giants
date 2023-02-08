---
title: instanceof
---

## 理解

判断一个function的prototype是否存在于某一个对象的原型链上

- [原型链](/summary/JavaScript/prototype-chain#图解)

## 实现

```js
const theInstanceof = function (object, constructor) {
  if (typeof object !== 'object' || typeof constructor !== 'function') {
    return false
  }
  // getPrototypeOf这个api等价于直接访问对象的__proto__属性
  let proto = Object.getPrototypeOf(object)
  while (proto) {
    const prototype = constructor.prototype
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

/********************* 验证 *********************/
function Foo () {
}

const foo1 = new Foo()
const anyObj = {}

console.log(foo1 instanceof Foo === theInstanceof(foo1, Foo))
console.log(anyObj instanceof Foo === theInstanceof(anyObj, Foo))
console.log(foo1 instanceof Object === theInstanceof(foo1, Object))
```
