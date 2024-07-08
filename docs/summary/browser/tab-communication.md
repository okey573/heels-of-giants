---
title: 标签页通信
lastUpdated: 2024/07/08 15:43:44 GMT+0800 (中国标准时间)
---

# 跨浏览器标签页通信

简单来分类，可以分为需要服务端和不需要服务端两类。不需要服务端就需要使用浏览器原生的一些 API

## Cookie

使用 Cookie 进行数据存储和通信，并通过定时器轮询 (setInterval) 来检查数据变化

## LocalStorage & window.onstorage

通过 LocalStorage 存储数据，并利用 window.onstorage 事件监听数据变化，实现不同标签页间的数据同步。这种方法也受限于同源策略

## IndexedDB

通过 IndexedDB 数据库存储数据，并使用定时器轮询 (setInterval) 来同步数据变化

## BroadcastChannel

这是一种允许同源的不同浏览器窗口、标签页、frame 或者 iframe 之间进行通信的技术。通过创建一个 BroadcastChannel 实例并监听消息事件，可以实现数据的实时广播和接收。但是，它受限于同源策略

## window.open & window.postMessage

使用 window.open 打开新的标签页，并通过 postMessage 方法安全地进行跨源通信。接收方通过监听 message 事件来接收数据

## ServiceWorker

Service Worker 作为浏览器后台运行的脚本，可以拦截网络请求并处理消息事件，实现跨标签页通信

## SharedWorker

Shared Worker 允许多个标签页访问同一个 worker，通过内部通信实现数据共享

## WebSocket & EventSource

通过 WebSocket 服务器实现不同标签页之间的实时通信。服务器收到消息后，可以广播给所有连接的客户端
