---
title: 执行上下文和执行栈
---

## 写在前面

_现在网上找到的很多执行上下文和执行栈相关的文章，都是ES3的旧解释。ES5和ES2018都有一些变化_

#### 执行上下文在 ES3 中，包含三个部分

scope：作用域，也常常被叫做作用域链。

variable object：变量对象，用于存储变量的对象。

this value：this 值。

#### 在 ES5 中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子

lexical environment：词法环境，当获取变量时使用。

variable environment：变量环境，当声明变量时使用。

this value：this 值。

#### 在 ES2018 中，执行上下文又变成了这个样子，this 值被归入 lexical environment，但是增加了不少内容。

lexical environment：词法环境，当获取变量或者 this 值时使用。

variable environment：变量环境，当声明变量时使用

code evaluation state：用于恢复代码执行位置。

Function：执行的任务是函数时使用，表示正在被执行的函数。

ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。

Realm：使用的基础库和内置对象实例。

Generator：仅生成器上下文有这个属性，表示当前生成器。

## 执行上下文的类型

在JavaScript中有三种类型的执行上下文

- 全局执行上下文——这是默认的或基本的执行上下文。任何不在函数内部的代码位于全局执行上下文中。它执行两件事:它创建一个全局对象，它是一个window对象(在浏览器的情况下)，并将this的值设置为等于全局对象。一个程序中只能有一个全局执行上下文。
- 函数执行上下文——每次调用函数时，都会为该函数创建一个全新的执行上下文。每个函数都有自己的执行上下文，但它是在调用或调用（原文是it’s created when the function is invoked or called）函数时创建的。可以有任意数量的函数执行上下文。每当创建一个新的执行上下文时，它都会按照已定义的顺序执行一系列步骤。
- Eval函数执行上下文——在Eval函数内部执行的代码也会获得它自己的执行上下文。

## 执行上下文的生命周期

生命周期分为创建阶段和执行阶段

#### 创建阶段

1. this 值的决定，即我们所熟知的 This 绑定
2. 创建词法环境组件。
3. 创建变量环境组件。

#### 执行阶段

完成对所有这些变量的分配，最后执行代码

在进入执行阶段之前，变量对象中的属性都不可访问。进入执行阶段后，变量对象 变成活动对象（Activation Object），里面的属性可以被访问了，然后执行代码(ES3)

## 变量提升

在ES6中,词法环境（LexicalEnvironment）组件和变量环境（VariableEnvironment）组件之间的一个区别是，前者用于存储函数声明和变量(let和const)绑定，而后者仅用于存储变量(var)绑定

let和const定义的变量在创建阶段没有任何关联的值，但是var定义的变量被设置为undefined。 这是因为，在创建阶段，代码被扫描以查找变量和函数声明，而函数声明被完整地存储在环境中，变量最初被设置为未定义(对于var)或保持未初始化(对于let和const)。 这就是为什么你可以在声明之前访问var定义的变量(虽然未定义)，但在声明之前访问let和const变量时会得到引用错误的原因。

这就是我们所说的变量提升（hoisting）

## 演练

```js
function foo1 () {
  console.log(bar)
  // undefined

  var bar = function () {
  }
}

function foo2 () {
  console.log(bar)
  // [Function: bar]

  function bar () {
  }
}

function foo3 () {
  // console.log(a)
  // error

  // console.log(b)
  // error

  console.log(c)
  const a = 'a'
  let b
  var c = 'c'
}

foo1()
foo2()
foo3()

```

- [ES2018 最新 【译】理解Javascript中的执行上下文和执行栈](https://juejin.cn/post/7129510217863299102)
- [变量对象、活动对象](https://blog.csdn.net/sonicwater/article/details/112350423)
