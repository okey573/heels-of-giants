---
title: ajax
outline: [2,6]
---

# ajax

> AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）。简单点说，就是使用 XMLHttpRequest 对象与服务器通信。它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据。AJAX 最吸引人的就是它的“异步”特性，也就是说它可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。
> <br>
> <br>
> 你可以使用 AJAX 最主要的两个特性做下列事：
> <br>
> - 在不重新加载页面的情况下发送请求给服务器。
>
> - 接受并使用从服务器发来的数据。

## 请求方法

- GET: get 方法一般用于获取服务器资源
- POST: post 方法一般用于传输实体主体
- PUT: put 方法一般用于传输文件
- DELETE: delete 方法用于删除文件
- HEAD: head 方法用于获取报文首部，不返回报文主体
- OPTIONS: options 方法用于询问请求URI资源支持的方法

## get 和 post 的区别

#### 表面答案

- get 在浏览器回退时是无害的，而 post 会再次提交请求
- get 产生的URL地址可以被Bookmark，而 post 不可以
- get 请求会被浏览器主动cache，而 post 不会，除非手动设置
- get 请求只能进行url编码，而 post 支持多种编码方式
- get 请求参数会被完整保留在浏览器历史记录里，而 post 中的参数不会被保留
- get 请求在URL中传送的参数是有长度限制的，而 post 么有
- 对参数的数据类型，get 只接受ASCII字符，而 post 没有限制
- get 比 post 更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
- get 参数通过URL传递， post 放在Request body中

#### 真的答案

get 和 post 都是 http 协议的请求方法，它们都是基于 tcp/ip 协议族的，所以本质上它们是没有区别的， post 也可以再 url 上加参数，get 也可以加 request body

总结就是： 由于 http 的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同

> **另外：GET产生一个TCP数据包；POST产生两个TCP数据包**
>
> 对于 get 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应200（返回数据）
>
> 而对于 post，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）
>
> **但是**并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。

上面这段话，我晕了，tcp 不是传输层的协议吗，和浏览器有什么关系？

[GET和POST两种基本请求方法的区别](https://www.cnblogs.com/logsharing/p/8448446.html)

## 简单请求和复杂请求

#### 简单请求

1. 请求方法是 **get** **post** **head** 之一
2. 不能有自定义请求头，如 **Authorization**，请求头有限制
3. content-type 是 **text/plain** **multipart/form-data** **application/x-www-form-urlencoded** 之一

#### 复杂请求

除了简单请求都是复杂请求，复杂请求在跨域时会先发送预检请求

## fetch 和 ajax 的区别

准确来说，应该要对比的是 **fetch** 和 **xhr** 的区别

因为 **fetch** 也是对 **ajax** 的一种实现，是基于 promise 的

#### fetch 的优点

- fetch的语法简洁，更语义化
- 基于promise，支持 async / await
- 同构方便，使用 isomorphic-fetch

#### fetch 的缺点

- fetch 只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
- fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- fetch没有办法用原生监测异步请求，而XHR可以
