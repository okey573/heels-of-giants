---
title: vue-router
---

这个路由是建立在spa的概念上的
路由分三个类型 hash, history, memory

## hash

hash模式在页面url上有个#号，是靠监听hash路由实现的

```js
window.addEventListener('hashchange', function () { 
  /**...*/
}, false)
```

## history

history模式是靠window.history的api实现的

- `back()`后退到上一个路由；
- `forward()`前进到下一个路由，如果有的话；
- `go(number)`进入到任意一个路由，正数为前进，负数为后退；
- `pushState(obj, title, url)`前进到指定的 URL，不刷新页面；
- `replaceState(obj, title, url)`用 url 替换当前的路由，不刷新页面；

调用这几种方式时，都会只是修改了当前页面的 URL，页面的内容没有任何的变化。但前 3 个方法只是路由历史记录的前进或者后退，无法跳转到指定的 URL；而pushState和replaceState可以跳转到指定的 URL。如果有面试官问起这个问题“如何仅修改页面的 URL，而不发送请求”，那么答案就是这 5 种方法。

## memory
memory模式适合非浏览器，或者SSR

hash和history都有一个共同点 把所有数据存在路径后面，不论是/1还是/#1，这里的东西一变，所有的东西都改变

memory不使用路径，使用localstorage。只对单机有效，页面没有链接 复制给别人只能进入初始状态


## 传统的前端页面路由也分为三种：传统路由实现，Hash路由方式，H5 Router
