---
title: new
---

## 理解

new实际上就是使用这个构造函数的原型对象的一个拷贝对象，作为上下文调用这个构造函数，如果这个构造函数原本就返回了一个对象，那么就返回这个对象，否则返回这个拷贝对象

## 实现

```js
function theNew () {
  const [constructor, ...args] = arguments
  if (typeof constructor !== 'function') {
    throw 'first param must be a function'
  }
  // 设置target的目的是实现es6中的new.target
  theNew.target = constructor
  const context = Object.create(constructor.prototype)
  const result = constructor.apply(context, args)
  if (result && typeof result === 'object' || typeof result === 'function') {
    return result
  }
  return context
}

/********************* test *********************/
function Boy (name, age) {
  this.name = name
  this.age = age
}

const boy1 = new Boy('boy1', 10)
const boy2 = theNew(Boy, 'boy2', 20)
console.log(boy1)
console.log(boy2)
```
