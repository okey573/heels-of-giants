---
title: 箭头函数
---

# 箭头函数

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的 this，arguments，super 或 new.target。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数

## this

1. 箭头函数没有自己的 this 对象，内部的 this 就是定义时上层作用域中的 this，也就是说，箭头函数内部的 this 指向是固定的
2. 箭头函数的 this 不能被 call、apply、bind 改变

## 箭头函数的原型是 undefined

```javascript
const fn = v => v
console.log(fn.prototype);
// expect undefined
```

## 箭头函数不能当成一个构造函数

## 不能使用 new.target

## 箭头函数没有 arguments 对象
