---
title: 面试总结
outline: [2,6]
lastUpdated: Wed May 08 2024 19:24:07 GMT+0800 (中国标准时间)
---

# 面试中遇到的问题

## 算法类

#### 一道考察括号匹配的问题

::: details 题目
输入一个字符串，字符串包括数字、英文和英文括号，将该字符串反转，反转要求如下：

1. 英文左右括号内的内容连同左右括号当成一个整体处理，匹配的左右括号内无内容，将左右括号看成一个整体。
2. 左右括号必须成对匹配，且左右括号内不能存在无匹配的左括号或右括号， 方能看做一个整体，只要文字被左右括号包围，就可将左右括号和括号内的内容看成一个整体。
3. 左右括号内再包含匹配成功的左右括号，按照最外层括号看成整体。
4. 无匹配的左括号和右括号当成一个单一元素处理，和数字、英文处理逻辑一致。

**如**:
输入 abcd 返回dcba

输入 abcd(efg 返回 gfe(dcba

输入 abcd(efg) 返回 (efg)dcba

输入 如abc(efg(dfg)) 返回 (efg(dfg))cba （每个左右括号都有右括号匹配，按照最外层匹配括号看成一个整体）

输入 abc(efg(dfg)  返回(dfg)gfe(cba    (由于第一个左括号无右括号匹配)

输入 )abcd(  返回(dcba)    (由于第一个左括号无右括号匹配)
:::

::: details 答案

```javascript
function fn (str) {
  console.log('输入==>: ', str)
  const result = []
  const stack = []
  for (const s of str) {
    if ('(' === s) {
      stack.push(s)
    } else if (')' === s) {
      let tempS = ''
      while (stack.length) {
        const popS = stack.pop()
        if ('(' === popS) {
          tempS = '(' + tempS + ')'
          break
        }
        tempS = popS + tempS
      }
      if (tempS) {
        if (stack.length) {
          stack.push(tempS)
        } else {
          result.unshift(tempS)
        }
      } else {
        result.unshift(s)
      }
    } else {
      if (stack.length) {
        stack.push(s)
      } else {
        result.unshift(s)
      }
    }
  }
  console.log('输出==>: ', [...stack.reverse(), ...result].join(''), '\n')
}
```

:::

#### LC 31. 下一个排列

::: details 题目
[原题目链接](https://leetcode.cn/problems/next-permutation)

理解： 找几个数字排列组合后，大于它的数字中的最小值...
:::

::: details 答案

```typescript
function nextPermutation(nums: number[]): void {
  const swap = (nums, i, j) => {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }

  const reverse = (nums, start) => {
    let left = start
    let right = nums.length - 1
    while (left < right) {
      swap(nums, left, right)
      left++
      right--
    }
  }

  let i = nums.length - 2
  /**
   * step1: 找到数组中从右开始 [... a,b ...] 找到第一个 【a < b】 a 的位置
   */
  while (i >= 0) {
    if (nums[i] < nums[i + 1]) {
      break
    }
    i--
  }
  /**
   * step2:
   * 将上面step1找到的a的位置设为 i
   *
   * - 如果 i < 0 (也可能等于 -1)就说明 nums 是严格递减的数组， 它的下一个排列就是将它反转
   *
   * - 如果 i >= 0 进到step3
   */
  if (i < 0) {
    // 因为题目要求不返回，操作自身 所以要自身反转 不能直接nums.reverse()
    reverse(nums, i + 1)
  } else {
    /**
     * step3:
     * 找到 i 右边，最接近nums[i]且大于nums[i]的数字位置（也就是所有大于nums[i]中的最小的数字位置）
     * 因为上面找到i的逻辑是递减的，所以i后面的数组部分是严格递减的，所以从数组结尾开始往前遍历，第一个大于num[i]的数字就是我们要找的数字
     * 将上面找到的数字设为j
     */
    let j = nums.length - 1
    while (j >= 0 && nums[i] >= nums[j]) {
      j--
    }
    /**
     * step4:
     * 交换 i 和 j对应的数字
     */
    swap(nums, i, j)
    /**
     * step5:
     * 将 i 后面的数组部分按递增顺序排序就得到了结果
     */
    reverse(nums, i + 1)
  }
}
```

:::

## js 基础类

#### 执行上下文相关

::: details 题目
预测输出

```javascript
var b = 10;
(function b () {
  b = 20
  console.log(b)
})()
```

:::

::: details 答案

严格模式下会报错

非严格模式下会打印 `b` 这个 function

**解析：**

- IIFE 中有独立作用域
- 函数表达式标识符不可被修改（所以在 IIFE 中，给 b 赋值会报错，因为 b 已经是一个 function 了）

[**在JavaScript的立即执行的具名函数A内修改A的值时到底发生了什么？**](https://segmentfault.com/q/1010000002810093)

:::

#### 实现一个 query 方法，实现对数据的链式查询和处理

::: details 题目
提供了一个数组结构的 data，要求实现一个 query 方法，返回一个新的数组，query 方法内部有 过滤、排序、分组 等操作，并且支持链式调用，调用最终的 execute 方法返回结果：

```javascript
const data = [
  { id: 3, name: 'Charlie', age: 30, gender: 'male' },
  { id: 4, name: 'David', age: 35, gender: 'male' },
  { id: 2, name: 'Bob', age: 25, gender: 'male' },
  { id: 5, name: 'Ella', age: 40, gender: 'female' },
  { id: 1, name: 'Alice', age: 20, gender: 'female' }
]


const result = query(data)
  .where(item => item.age > 23)
  .sortBy('id')
  .groupBy('gender')
  .execute()

console.log(result)
```

:::

::: details 答案
思路：用一个类来实现，实现这个类的 where sortBy groupBy 等方法，关键是每个方法最终都要返回对象本身

::: code-group

```javascript [class 语法]
class Query {
  constructor (list) {
    this.value = list
  }

  where (cb) {
    this.value = this.value.filter(cb)
    return this
  }

  sortBy (key) {
    this.value.sort((left, right) => left[key] - right[key])
    return this
  }

  groupBy (key) {
    const map = new Map()
    for (const item of this.value) {
      if (map.has(item[key])) {
        map.get(item[key]).push(item)
      } else {
        map.set(item[key], [item])
      }
    }
    this.value = map
    return this
  }

  execute () {
    return this.value
  }
}
```

```javascript [function 语法]
function query (list) {
  const wrappedList = {
    value: list
  }

  const prototype = Object.getPrototypeOf(wrappedList)
  prototype.where = (cb) => {
    wrappedList.value = wrappedList.value.filter(cb)
    return wrappedList
  }
  prototype.sortBy = (key) => {
    wrappedList.value.sort((left, right) => left[key] - right[key])
    return wrappedList
  }
  prototype.groupBy = (key) => {
    const map = new Map()
    for (const item of wrappedList.value) {
      if (map.has(item[key])) {
        map.get(item[key]).push(item)
      } else {
        map.set(item[key], [item])
      }
    }
    wrappedList.value = map
    return wrappedList
  }
  prototype.execute = () => {
    return wrappedList.value
  }

  return wrappedList
}
```

:::

#### 限制 request 的最大并发个数

::: details 题目
给出一组 request url 和一个 limit，限制并发请求个数为 limit ，完成这些请求
:::

::: details 答案

```javascript:line-numbers {1-6,22-64}
// 请求池
const pool = new Set()
// 请求队列
const queue = []
// 最大的并发请求数
const limit = 3

/**
 * 模拟请求，耗时不确定，结果也可能成功或失败
 */
const fakeFetch = (url) => new Promise((resolve, reject) => {
  const rn = Math.random() * 1000
  setTimeout(() => {
    if (rn > 500) {
      resolve(url + ' success')
    } else {
      reject(url + ' error')
    }
  }, rn)
})

const request = (url) => {
  return new Promise((resolve, reject) => {
    const task = async function () {
      console.log(url + ' start request....')
      try {
        const data = await fakeFetch(url)
        resolve(data)
      } catch (e) {
        reject(e)
      } finally {
        // 重点在这里，fetch 执行完成必要执行这段代码：
        console.log(url + ' end request....')
        // 1. 从请求池中移除当前的请求任务
        pool.delete(task)
        // 2. 从请求队列中取出一个请求任务执行
        const newTask = queue.shift()
        if (newTask) {
          // 注意！！ 这里要先放到 pool 里再执行
          pool.add(newTask)
          newTask()
        }
      }
      // fakeFetch(url).then(resolve).catch(reject).finally(() => {
      //   console.log(url + ' end request....')
      //   pool.delete(task)
      //   const newTask = queue.shift()
      //   if (newTask) {
      //     pool.add(newTask)
      //     newTask()
      //   }
      // })
    }

    // 请求池已满，放入队列
    if (pool.size >= limit) {
      queue.push(task)
    } else {
      // 请求池未满，放入请求池中执行
      pool.add(task)
      task()
    }
  })
}

/******************************以下为测试代码******************************/

const urls = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
]
urls.forEach(async (url) => {
  try {
    const data = await request(url)
    console.log(data)
  } catch (e) {
    console.warn(e)
  }
})
```

:::

#### Promise.retry

::: details 题目
实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
:::

::: details 答案

```javascript
Promise.retry = function (fn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        const data = await fn()
        resolve(data)
        break
      } catch (e) {
        if (!times) reject(e)
      }
    }
  })
}

/******************************以下为测试代码******************************/

function getProm () {
  const n = Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => n > 0.9 ? resolve(n) : reject(n), 1000);
  })
}

Promise.retry(getProm)
```

:::

#### class 转 function

::: details 题目
将一个 es6 的 class 转成 function

```javascript
class Example {
  constructor (name) {
    this.name = name
  }

  func () {
    console.log(this.name)
  }
}
```

:::

::: details 答案

```javascript
'use strict' // class 中的代码全部都是在一个严格模式下，对于一些不安全的操作会抛出错误，使代码更加规范。

function ExampleFunction (name) { // 这是一个函数声明，函数名为 Example，它接受一个参数 name。这个函数充当了类的构造函数的角色。函数名与class名相同。
  if (!new.target) { // 这一行检查函数是否通过 new 关键字调用。class 写法只能通过 new 关键字调用的。否则就会报如下错误
    throw new TypeError(`Class constructor Example cannot be invoked without 'new'`)
  }
  this.name = name // 这里相当于构造函数的函数体，最终不需要 return 回去，因为这个步骤是在 new 操作符中作的，简单来说就是 Object.create 一个 ExampleFunction 的原型对象，以这个新创建的对象当作上下文 调用这个函数

  Object.defineProperty(ExampleFunction.prototype, 'func', { // class中的方法是不会被枚举的。所以需要通过Object.defineProperty(Example.prototype, 'func', { ... }): 这一行定义了一个不可枚举的属性 func，它是 Example.prototype 对象的一个属性。
    value: function () {
      if (new.target) { //通过 new 关键字去调用 class 中的方法也会报错 
        throw new TypeError('ExampleFunction.prototype.func is not a constructor')
      }
      console.log(this.name)
    },
    enumerable: false // class 中的方法是不会被枚举的
  })
}
```

:::
