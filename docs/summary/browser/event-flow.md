---
title: 事件流
outline: [2,6]
---

# 事件流描述了html页面接受事件的顺序

## 事件的传播模式

#### 事件冒泡

事件由最具体的元素接收，不断经过上级节点，直到 body，最后到页面元素 document

#### 事件捕获

事件由最外层页面元素接收，不断经过下级节点，直到触发的目标节点

_IE浏览器没有事件捕获_

> 我们现在使用DOM标准事件流的传播顺序的是W3C统一后的标准——先捕获后冒泡。即当出发DOM事件时，会先进行事件捕获，捕获到事件源之后通过事件传播进行事件冒泡

#### 事件监听器 addEventListener

useCapture 指定事件传播模式，表示以哪个顺序接收事件。false (默认) 冒泡传播 true 捕获传播

```javascript
addEventListener(eventName, callback, useCapture)
```

## 三个阶段

- 冒泡阶段： 冒泡传播模式中，由目标节点到document的过程，叫冒泡阶段。
- 目标阶段： 事件不断传递(或直接触发)，最终在具体元素(目标节点)上触发的时候，叫做目标阶段。
- 捕获阶段：捕获传播模式中，由document到目标节点的过程，叫捕获阶段。

可打印e.eventPhase判断当前属于什么阶段：1-捕获 2-目标 3-冒泡

> 也就是在 `addEventListener` 的回调中，可以获取到 e.eventPhase , 中间的节点就是 **1** 或者 **3** 最终目标节点就是 **2**

## 事件委托

#### 原理

利用了事件冒泡机制，就是当事件触发时，把要做的事委托给父元素来处理。

````javascript
document.addEventListener('click', e => {
  console.log(e.target)
  // 可根据e的一些属性或nodeName判断是子元素还是父元素
});
````

#### 优点

- 减少内存占用，减少事件注册
- js新增子元素动态绑定事件（无需再次对其绑定）

#### 注意事项

使用“事件委托”时，并不是说把事件委托给的元素越靠近顶层就越好。事件冒泡的过程也需要耗时，越靠近顶层，事件的”事件传播链”越长，也就越耗时。如果DOM嵌套结构很深，事件冒泡通过大量祖先元素会导致性能损失

## 阻止默认事件

```javascript
event.preventDefault();
```

## 阻止事件冒泡或者捕获

```javascript
event.stopPropagation();
```


## currentTarget 和 target

- target：触发事件的元素
- currentTarget：事件绑定的元素
