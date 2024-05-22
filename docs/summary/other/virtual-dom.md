---
title: 虚拟 dom
outline: [2,6]
lastUpdated: Wed May 22 2024 20:28:03 GMT+0800 (中国标准时间)
---

# 虚拟 dom （Virtual DOM）

## 什么是 Virtual DOM

Virtual DOM是对真实 DOM 的抽象,本质上是 JavaScript 对象,这个对象就是更加轻量级的对 DOM 的描述.

## Virtual DOM 的特点

#### 优点

- 可以减少操作 dom 的次数，不仅是因为操作 dom 相对较慢，更因为频繁变动DOM会造成浏览器的回流或者重绘，因此我们需要这一层抽象，在 patch 过程中尽可能地一次性将差异更新到 DOM 中,这样保证了 DOM 不会出现性能很差的情况。
- 现代框架都是数据驱动视图，要求无须操作dom
- 更好的跨平台，更好的实现SSR

#### 缺点

- 无法极致性能优化
- 初始化 dom 时，因为多了一层计算，会比正常的慢

#### 要素

- Virtual DOM 创建
- Virtual DOM Tree 创建
- Virtual DOM 更新
- Virtual DOM Diff 算法

## 相关算法真实代码

#### 定义 VNode 类

```javascript
class VNode {
  constructor ({ tagName, attributes, nodeType, nodeValue }) {
    this.tagName = tagName?.toLowerCase()
    this.attributes = attributes
    this.nodeType = nodeType
    this.nodeValue = nodeValue
    this.children = []
  }

  appendChild (node) {
    this.children.push(node)
  }
}
```

#### 真实 DOM 转虚拟 DOM

```javascript
const createVNode = (element) => {
  // element 一般都是 HTMLElement 但是要当做 Node 类型来使用
  const tagName = element.tagName
  const nodeType = element.nodeType
  const nodeValue = element.nodeValue
  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(nodeType)) return null

  const props = {}
  for (const attribute of element.attributes) {
    props[attribute.nodeName] = attribute.nodeValue
  }

  const vNode = new VNode({ tagName, props, nodeType, nodeValue })

  // 这里不能循环 element.children 会丢失文本类型的子节点
  for (const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      vNode.appendChild(new VNode({
        tagName: child.nodeName,
        attributes: null,
        nodeType: child.nodeType,
        nodeValue: child.nodeValue
      }))
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      vNode.appendChild(createVNode(child))
    }
  }
  return vNode
}
```

#### 虚拟 DOM 转真实 DOM

```javascript
const render = (vNode) => {
    if (vNode.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(vNode.nodeValue)
    }
    const el = document.createElement(vNode.tagName)
    for (const [name, value] of Object.entries(el.attributes)) {
      el.setAttribute(name, value)
    }
    for (const child of vNode.children) {
      el.appendChild(render(child))
    }
    return el
  }
```

## 参考链接

- [[react] 什么是虚拟dom？虚拟dom比操作原生dom要快吗？虚拟dom是如何转变成真实dom并渲染到页面的?](https://blog.csdn.net/echolunzi/article/details/125586796)

- [深度剖析：如何实现一个 Virtual DOM 算法 #13](https://github.com/livoras/blog/issues/13)

- [Node：nodeType 属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)

- [从VirtualDom（虚拟Dom）到真实DOM](https://blog.csdn.net/qq_39958056/article/details/123846067)
