---
title: cookie 和 web storage
outline: [2,6]
---

# Cookie SessionStorage LocalStorage

## Cookie

cookie是客户端与服务器端进行会话使用的一个能够在浏览器本地化存储的技术。简言之，cookie是服务器端发给客户端的文本文件,但只能储存4kb的数据;目的是用于辨别用户身份，记录跟踪购物车的商品信息（如数量）、记录用户访问次数等。

> cookie的内容主要包括：名字name，值value，过期时间expires，路径path和域domain。路径和域一起构成cookie的作用范围。一般cookie储存在内存里，若设置了过期时间则储存在硬盘里，浏览器页面关闭也不会失效，直到设置的过期时间后才失效。若不设置cookie的过期时间，则有效期为浏览器窗口的会话期间，关闭浏览器窗口就失效。

#### Cookie的httpOnly属性

设置httpOnly后，cookie不能在js中被读取。这也是防御XSS的一种方法。

#### Cookie的Path属性

path决定了cookie的生效路径，生效路径为设置的path及其子目录。

一般都是设置成`/`， 全站可用。

#### Cookie的SameSite属性

SameSite属性可以设置三个值：Strict、Lax、None

- Strict: 完全禁止第三方获取cookie，跨站点时，任何情况下都不会发送cookie；只有当前网页的 URL 与请求目标一致，才会带上 Cookie
- Lax: 防范跨站，大多数情况下禁止获取cookie，除非导航到目标网址的GET请求（链接、预加载、GET表单）；设置了Strict或Lax以后，基本就杜绝了 CSRF 攻击

|    请求类型     |                   示例                   |  正常情况  |   Lax   |
|:-----------:|:--------------------------------------:|:------:|:-------:|
|     连接      |          `<a href="..."></a>`          |   携带   |   携带    |
|     预加载     |  `<link rel="prerender" href="..."/>`  |   携带   |   携带    |
|   GET 表单    |   `<form method="GET" action="...">`   |   携带   |   携带    |
|   POST 表单   |  `<form method="POST" action="...">`   |   携带   |   不携带   |
|   iframe    |     `<iframe src="..."></iframe>`      |   携带   |   不携带   |
|    AJAX     |             `$.get("...")`             |   携带   |   不携带   |
|    Image    |           `<img src="...">`            |   携带   |   不携带   |

谷歌发布Chrome 80稳定版后，默认值改为Lax

这一默认值是可以在浏览器中修改的，`chrome://flags/#same-site-by-default-cookies`。但是在后来的某个版本中被去掉了

#### Cookie的SameParty属性

在第一方Cookie和第三方Cookie被区别对待的情况下，Chrome新推出了一个First-Party Sets策略，它可以允许由同一实体拥有的不同关域名都被视为第一方

SameParty的cookie是配合First-Party Sets的使用，First-Party Sets的配置是托管在`/.well-known/first-party-set`路由下，members和owner都要配置

配置完成后，设置了SameParty属性的就能使用了

## Web Storage

> web Storeage的概念和cookie很相似，区别在于web Storage更够储存各多的数据，cookie的大小是受限的，并且每次请求一个新的页面的时候都会被发送过去，无形中浪费了带宽，另外cookie还需要指定作用域，不可跨越调用。
> HTML5增加了两个储存方式：localStorage和sessionStorage

sessionStorage 和 localStorage是HTML5中新增的两种本地存储机制，使用它可以在客户端本地建立一个数据库，原本必须保存在服务器端数据库中的内容现在可以直接保存在客户端本地了，这大大减轻了服务器端的负担，同时也加快了访问数据的速度。

#### SessionStorage

sessionStorage的生命周期是在仅在当前会话下有效。

> sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。

#### LocalStorage

localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失

## 区别

- cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存
- 存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
- 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。
