---
title: Generator
outline: [2,6]
---

# Generator 函数

## Generator 函数的定义

- 语法上，`Generator` 函数是一个状态机，封装了多个内部状态。
- 形式上，`Generator` 是一个函数。不同于普通函数，是可以暂停执行的，所以函数名之前要加星号，以示区别。
- 整个 `Generator` 函数就是一个封装的异步任务，或者说是异步任务的容器，异步操作需要暂停的地方，都用 `yield` 语句。

> function 关键字和函数之间有一个星号(*),且内部使用yield表达式，定义不同的内部状态。 <br> 调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。

## 使用示例

```javascript
function* g (x) {
  console.log(`x=${x}`)
  const y = yield x + 1
  console.log(`y=${y}`)
  return y + 1
}

// 对于上面的这个函数，首先调用它，将不会有任何返回，函数内部也不会执行
const t = g(1)
// 此时不会有任何输出，而 t 是一个迭代器对象
// console.log(Object.prototype.toString.call(t).match(/\[object (.*?)\]/)[1].toLowerCase())
// 输出 `generator`

const t1 = t.next()
// 此时函数将开始执行打印 x=1
// 而 t1 的值是一个迭代器对象，内部有两个属性 `value` 和 `done`
// value 对应的值是 `g` 函数内部第一个 `yield` 的值，也就是 1 + 1 = 2
// done 对应的值时 false , 因为函数还没执行完
console.log(`t1 = ${JSON.stringify(t1)}`)

const t2 = t.next(100)
// 函数继续执行，这里传了一个参数 100 ， 它将被上面的 `y` 接受。
// yield 返回的值和接受的值无关，也就是不管上面的 `yield x + 1` yield 后面是多少，或者是 undefined null 都行，只要 t2=t.next(100)，那么函数中的y始终是100
console.log(`t2 = ${JSON.stringify(t2)}`)
// 这里t2.value = 101, 因为函数也执行完了，是return回来的，所以done=true

// 至此，已经迭代完了，如果继续执行next()也还是会返回对象，但是对象value=undefined，done=true
const t3 = t.next()
console.log(`t3 = ${JSON.stringify(t3)}`)

```

## 迭代器

### 迭代器协议

定义了一种标准的方式来产生一个有限或无限序列的值； 当一个对象被认为是一个迭代器时，它实现了一个 next() 的方法，next()返回值如下：

```
{
 "done":true, // false迭代是否结束，
 "value": v, // 迭代器返回值
}
```

## promise generator async/await

三者都是异步编程的解决方案

不同的是, promise为较早出来的, 其次generator, 最后为async/await。三者象征了前端进行解决异步编程的进化路程。

而且 async/await 就是generator函数的语法糖


## generator 将异步同步化的例子

```javascript
function* main () {
  const result = yield request('https://unpkg.com/vue/package.json')
  // 这里将获取到 vue 的 packageJson
  console.log(result)
}

const it = main()
it.next()

function request (url) {
  fetch(url).then(response => {
    // 使用 fetch 
    response.json().then(data => {
      it.next(data)
    })
  })
}
```
