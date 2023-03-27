---
title: 订阅-发布模式
outline: [2,6]
---

# 订阅-发布模式

发布-订阅模式里面包含了三个模块，发布者，订阅者和处事件调度中心。

发布-订阅模式是将发布者和订阅者解耦了。发布者触发某个事件，只向调度中心通知，并不关注它怎么处理或者有多少订阅者响应。而订阅者也只是在调度中心订阅。

_和观察者模式很类似，区别是在于多了一个事件调度中心。_

## 实现

这个Event class实际上就是一个事件调度中心

```javascript
class Event {
  constructor () {
    this.handlers = {}
  }

  on (name, fn) {
    // TODO name, fn 类型校验
    if (!this.handlers.name) {
      this.handlers.name = []
    }
    this.handlers.name.push(fn)
  }

  emit (name, ...args) {
    if (!this.handlers[name]) {
      throw new Error(`未注册${name}事件`)
    }
    this.handlers[name].forEach(fn => fn(...args))
  }

  remove (name, fn) {
    // TODO 类型校验
    const index = this.handlers[name].findIndex(_fn => _fn === fn)
    if (index > -1) {
      this.handlers[name].splice(index, 1)
    }
  }
}
```

## 使用

```javascript
const event = new Event()

// 订阅者注册事件
event.on('event1', function () {
  console.log('event1')
})
event.on('event2', function (a, b) {
  console.log('event2', a, b)
})

// 发布者触发事件

event.emit('event1')
event.emit('event2', 'aaa', 'bbb')
```
