---
title: MessageChannel
lastUpdated: Tue May 07 2024 17:25:11 GMT+0800 (中国标准时间)
---

# MessageChannel

Channel Messaging API 的 MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据。

## tips

- MessageChannel 还可用作深拷贝。但 message 事件是异步的（宏任务），且拷贝的对象不能含有 function。

## 参考链接

- [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

- [MessageChannel是什么，怎么使用？](https://www.jianshu.com/p/4f07ef18b5d7)
