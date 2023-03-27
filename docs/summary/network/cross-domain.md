---
title: 跨域
---

# 跨域

## 跨域的原因

浏览器的同源策略，为了安全。。

## 解决办法

知道原因就知道怎么解决了。服务端没有跨域，不管是正向还是反向，用一个新服务做一层代理就行了。

script 标签， img 标签没有跨域限制，或者说限制比较宽松

官方推荐的 cors 方法，设置相关的 header

### cors

服务端设置响应头

```
// 允许跨域的站点
Access-Control-Allow-Origin: http://xxxx.com
// 同意接受 cookie
Access-Control-Allow-Credentials: true
// 接受的自定义请求 header
Access-Control-Expose-Headers: CustomHeader
// 请求的方法
Access-Control-Allow-Methods: PUT,GET,POST
// 预检的有效期，在有效时间内不再检测是否跨域
Access-Control-max-age: 3600
```

客户端也要在请求中主动开启设置 cookie

```javascript
xhr.withCredentials = true
```

### jsonp

### 代理

### iframe 跨域

### postMessage 跨域

### WebSocket 协议跨域

