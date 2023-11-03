---
title: 实现一个同步cookies的浏览器插件
---

有些系统是通过登录后在 cookie 中注入 token，然后在不同系统通过携带 cookie 信息进行认证的（也就是 cas 单点登录）。

有时候需要本地开发，调用线上的接口，这时候需要先登录线上系统拿到 cookie，然后再写到本地开发环境里，否则因为本地 localhost 和系统域名肯定是不在一个域的，所以请求时肯定不会携带 cookie，所以在开发时模拟登录后需要手动写入 cookie。

然后浏览器插件是有操作 cookie 的权限的，所以用一个插件把线上系统的 cookie 同步到 localhost 来，也就是省略一个步骤。

其实对于这个问题，还有很多解决办法：

- 比如新加一个 host: `127.0.0.1 domain.com`，然后开发调试的时候不要打开localhost或者127.0.0.1，而是用 `domain.com`，这样先登录线上系统后改 host 然后打开开发页面也会有 cookie
- 如果这个前端项目包含了登录的代码，也就是在这个前端工程内完成登录的，那么用 http-proxy 的 cookieRewrite 相关的属性，把 cookie 写到 localhost 也行

后面有时间再把代码插件的贴上来。。
