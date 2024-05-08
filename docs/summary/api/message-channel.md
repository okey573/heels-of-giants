---
title: MessageChannel
lastUpdated: Tue May 07 2024 17:25:11 GMT+0800 (中国标准时间)
---

# MessageChannel

Service Worker 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门。 现在，它们已包括如推送通知和后台同步等功能。 将来，Service Worker 将会支持如定期同步或地理围栏等其他功能。 本教程讨论的核心功能是拦截和处理网络请求，包括通过程序来管理缓存中的响应。

## tips

- MessageChannel 还可用作深拷贝。但 message 事件是异步的（宏任务），且拷贝的对象不能含有 function。

## 参考链接

- [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

- [MessageChannel是什么，怎么使用？](https://www.jianshu.com/p/4f07ef18b5d7)
