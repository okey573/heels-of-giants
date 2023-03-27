---
title: 原型链
---

# 原型链

## 理解

- Object方法继承了Function
- Function的constructor是它自己
- Function是Object方法的一个实例
- 每个function的prototype都有constructor属性，等于这个function本身

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
