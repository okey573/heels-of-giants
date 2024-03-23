---
title: 缓存
outline: [2,6]
---

# 浏览器缓存（HTTP缓存）

## 什么是浏览器缓存

浏览器缓存（Browser Caching）是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览。

<br>

以上是百度百科对于浏览器缓存的定义

可见浏览器缓存目的：为了节约网络的资源加速浏览

而方式是：对请求的文档进行存储

而文档具体就是指：html , js , css , 图片,其他媒体文件等

<details>
<summary><b>相关的 header</b></summary>
<p>

- Expires
- Cache-Control
- Last-Modified
- If-modified-since
- Etag
- If-none-match

</p>
</details>

## 浏览器缓存的规则和分类

#### 强缓存

- 定义：强缓存就是浏览器直接读取缓存，不发出任何请求，性能提升最大
- 表现：强缓存命中时，返回的http状态为200，在Google浏览器的开发者工具的Network里面的size会显示memory cache

###### cache-control

浏览器缓存里, Cache-Control是金字塔顶尖的规则, 它藐视一切其他设置, 只要其他设置与其抵触, 一律覆盖之.不仅如此, 它还是一个复合规则, 包含多种值, 横跨 存储策略, 过期策略 两种, 同时在请求头和响应头都可设置

而且浏览器缓存采用了**保守策略**

###### Expires

Expires 是 Http/1.0 规定的响应头，它的含义就是代表该资源在未来某个时间点失效

#### 协商缓存

- 表现和定义：协商缓存就是浏览器向服务器发送一个请求，服务器会检查该资源是否有更新，如果有更新，就返回最新的资源，状态码200，如果没有更新，状态码304，不返回资源，浏览器从缓存中读取资源

###### ETag 和 If-None-Match

服务器可以通过某种自定的算法对资源生成一个唯一的标识(比如md5标识)，然后在浏览器第一次请求某一个URL时把这个标识放到响应头传到浏览器，浏览器会把这个ETag的值存起来，服务器端的返回状态会是200。

以后如果浏览器要再发送该请求，会在request header 中加上If-None-Match, 而该请求头的值就是上一次存的ETag的值，用以发送给服务端来验证资源有没有修改。

Get请求中，当且仅当服务器上没有任何资源的ETag属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为200。

如果有资源的ETag值相匹配，那么返回304状态码。浏览器就会从缓存中获取该请求资源，从而达到节省开销加快用户访问速度的目的

###### Last-Modified 和 If-Modified-Since

响应头中会加上 Last-Modified 表示上次修改时间，下次再发起相同请求时，将会在请求头上携带If-Modified-Since，这个值就是之前获取到的Last-Modified

当Response Header中没有ETag，Cache-Control，Expires，Pragma这类缓存相关字段，只有Last-Modified，浏览器也会缓存，理论上，应该会在下一次请求中带上If-Modified-Since的请求头，去服务端验证资源是否过期，过期就响应码就为200并返回相应的资源，没过期响应码就是304，浏览器会从缓存中获取资源。

**但实际上，各个浏览器对这部分的实现不太相同**

_Last-Modified 和 If-Modified-Since 的值都是时间_

#### 优先级

强缓存优先级高于协商缓存

## 参考链接

- [浏览器http请求缓存，cache-control是服务器设置，还是浏览器设置](https://blog.csdn.net/qq_17335549/article/details/128630153)

- [深入理解浏览器的缓存机制之协商缓存与强缓存](https://blog.csdn.net/sunyctf/article/details/129865320)
