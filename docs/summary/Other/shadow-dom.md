---
title: shadow dom
---

# Shadow DOM

_qiankun.js 采用了 shadow dom_

## 什么是 shadow DOM

**shadow dom**（影子 dom）能够为 web 组件中的 dom 和 css 提供了封装，实际上是在浏览器渲染文档的时候会给指定的 dom 结构插入编写好的 dom 元素

但是插入的 shadow dom 会与主文档的 dom 保持分离，也就是说 shadow dom 不存在于主 dom 树上

类似 `input`, `video`, `audio`, 等标签，明明就是一个空元素，却能在页面上渲染出各种复杂的内容，就是因为采用了 shadow dom

## 查看 shadow dom

以 chrome 为例。打开控制台，右上角齿轮按钮设置 -> Preference -> Elements -> Show user anent shadow DOM

## shadow dom 的用法

- 使用 **attachShadow** api 创建一个 shadow dom。 attachShadow 接受一个对象配置，改对象有一个 **mode** 属性，值可以是 open 或者 closed

```javascript
let shadow = elementRef.attachShadow({ mode: 'open' });
let shadow = elementRef.attachShadow({ mode: 'closed' });
```

open 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用 Element.shadowRoot 属性：

```javascript
let myShadowDom = myCustomElem.shadowRoot;
```

将 Shadow DOM 附加到一个元素之后，就可以使用 DOM APIs 对它进行操作，就和处理常规 DOM 一样

```javascript
var para = document.createElement('p');
shadow.appendChild(para);
```

要注意的是，不是每一种类型的元素都可以附加到 shadow root（影子根）下面。出于安全考虑，一些元素不能使用 shadow DOM

## 参考链接

- [使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

- [Element.attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)
