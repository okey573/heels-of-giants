---
title: 继承
---

# 继承

JavaScript 实现继承的几种方式

## 原型链继承

把子类的原型对象设置为父类的一个实例

```javascript
// 父类
function Parent (name) {
  this.name = name
}

Parent.prototype.someProp = 'xxx'

// 子类
function Child (age) {
  this.age = age
}

Child.prototype = new Parent();
// 这里会引发一个错误
Child.prototype.constuctor === Child; // false
```

缺点：

- 只能继承父类原型上的方法和属性，不能继承父类的实例属性和方法
- 创建子类实例时，不能像父类传参

## 构造函数继承

在子类的构造函数中，执行父类的构造函数

```javascript
function Parent (name) {
  this.name = name
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
```

缺点：

- 只能继承父类实例的属性和方法，不能继承原型上的属性和方法

## 组合继承

原型链继承和构造函数继承的结合

```javascript
function Parent (name) {
  this.name = name
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
```

## 原型式继承

利用Object.creat(parentInstance)创建一个原型指向 parentInstance 的对象

```javascript
const parentInstance = {
  name: 'parent'
}

const childInstance = Object.create(parentInstance)
childInstance.age = 100
```

缺点：

- 无法传递参数
- 原型链继承多个实例时，实例引用类型指向相同，存在篡改的可能

## 寄生式继承

在原型上的基础上新增属性和方法增强函数

```javascript
const parentInstance = {
  name: 'parent'
}

function Child (age) {
  const child = Object.create(parentInstance)
  child.age = 100
  return child
}
```

## 寄生组合式继承

组合式和寄生式结合起来的实现方式

```javascript
function Parent (name) {
  this.name = name
}

function Child (age) {
  Parent.call(this, age)
  this.age = age
}

Child.prototype = Object.create(Parent.constructor)
```

## ES6 继承

```javascript
class Parent {
  constructor (name) {
    this.name = name
  }
}

class Child extends Parent {
  constructor (name, age) {
    super(name)
    this.age = age
  }
}
```

## 参考链接

- [JavaScript的八种继承方法](https://www.cnblogs.com/zimengxiyu/p/16811093.html)

- [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
