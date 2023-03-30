---
title: 观察者模式
outline: [2,6]
---

# 观察者模式

发布-订阅模式里面包含了两个模块，发布者和订阅者。

观察者模式定义了对象间的一种一对多（实际上可以多对多）的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。

_和观察者模式区别是在于没有事件调度中心。_

## 实现

Publisher 发布者

```javascript
class Publisher {
  constructor (state = {}) {
    this.state = state
    this.observers = []
  }

  setState (newState) {
    this.state = newState
    this.notify()
  }

  addObserver ({ name, fn }) {
    this.observers.push({ name, fn })
  }

  removeObserver ({ name }) {
    const index = this.observers.findIndex(_name => _name === name)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify () {
    this.observers.forEach(observer => observer['fn']())
  }
}
```

Observer 订阅者

```javascript
class Observer {
  constructor (name, fn) {
    this.name = name
    this.fn = fn
  }
}
```

## 使用

```javascript
const publisher = new Publisher({ name: '小红' })

const observer1 = new Observer('阿强', function () {
  console.log('阿强接收到事件了')
})
const observer2 = new Observer('阿伟', function () {
  console.log('阿伟接收到事件了')
})

// 绑定观察者关系，或者这里也可以在创建对象的时候绑定
publisher.addObserver(observer1)
publisher.addObserver(observer2)

// 发布订阅
publisher.setState({ name: '小绿' })
```

## Proxy 和 Reflect 实现

```javascript
const observedQueue = []

const observe = (fn) => {
  observedQueue.push(fn)
}

const observable = (obj) => {
  return new Proxy(obj, {
    set (target, ...args) {
      const res = Reflect.set(target, ...args)
      observedQueue.forEach(fn => fn(target))
      return res
    }
  })
}

const observedInstance = observable({
  name: 'abc'
})

observe(console.log)

observedInstance.name = '123'
observedInstance.age = 108
```
