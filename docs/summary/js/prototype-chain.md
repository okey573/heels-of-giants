---
title: 原型链
lastUpdated: Wed May 08 2024 18:23:09 GMT+0800 (中国标准时间)
---

# 原型链

## 理解

- 每个可当作构造函数的函数都有一个 **prototype** 属性（箭头函数、 async 函数、匿名函数不可以当作构造函数），这个属性值是一个对象 被称为 **原型对象**
- 每个对象都有一个 **__proto__** 属性，这个属性值是一个对象，通常等于这个对象构造函数的 **原型对象**。而 **__proto__** 这个属性被称为 **对象原型** （也就是一个对象的原型）
- Object 可看作是一个构造函数， 是由 Function 实例化产生的
- Function 也是一个对象，也就是拥有继承自 Object.prototype 的继承属性
- Function 的 constructor 是它自己
- 每个 Function 的 prototype 都有 constructor 属性，等于这个function本身

## 演练

```js
function Foo () {
  this.name = 'a foo test'
}

Foo.prototype.age = 10

const foo1 = new Foo()

console.log(foo1.age)
// 10

console.log(Object.__proto__ === Function.__proto__)
// true

console.log(Foo === Foo.prototype.constructor)
// true

console.log(foo1.constructor === Foo.prototype.constructor)
// true

console.log(Function.prototype === Function.constructor.prototype)
// true

console.log(Object.prototype === Function.prototype.__proto__)
// true

console.log(Function.constructor === Function)
// true

console.log(Object.constructor === Function)
// true

console.log(Object.__proto__ === Function.prototype)
// true

```

## 图解

![原型链](/images/prototype-chain.png)

## 参考链接

- [帮你彻底搞懂JS中的prototype、__proto__与constructor（图解）](https://blog.csdn.net/cc18868876837/article/details/81211729)
