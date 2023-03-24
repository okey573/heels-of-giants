---
title: instanceof
---

# instanceof 关键字

## 理解

判断一个 function 的 prototype 是否存在于某一个对象的原型链上

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

## 和 `typeof` `toString` 的区别

- typeof 会返回一个运算数的基本类型，也就是 number string boolean bigint 那些基本类型；instanceof 返回的是布尔值
- instanceof 可以准确判断引用数据类型，但是不能正确判断原始数据类型
- typeof虽然可以判断原始数据类型（null 除外），但是无法判断引用数据类型（function 除外）
- Object.prototype.toString.call() 返回的是对应的构造函数
