---
title: MessageChannel
lastUpdated: 2024/07/08 15:25:52 GMT+0800 (中国标准时间)
---

# MessageChannel

Channel Messaging API 的 MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据。

## 特点

- 双向通信：创建一个通道，可以发送和接收消息。
- 跨上下文：可以在不同的浏览上下文之间使用，不受同源策略限制。
- 灵活的通信方式：可以通过 postMessage 方法发送消息，并使用 onmessage 事件监听器接收消息。
- 需要显式创建和维护通道。

## 使用场景

- 跨窗口通信：如在弹出窗口和父窗口之间通信。
- 跨 iframe 通信：在不同源的 iframe 之间进行通信。
- Web Worker 通信：在主线程和 Web Worker 之间或多个 Web Worker 之间进行通信。

## 示例

假设你有一个网页，它包含一个 iframe，你希望在父页面和 iframe 之间进行通信。比如，父页面需要根据 iframe 中用户的操作来更新一些内容。

```javascript
// 父页面代码
// 创建一个新的 MessageChannel
const channel = new MessageChannel();

// 设置接收消息的监听器
channel.port1.onmessage = function (event) {
  console.log('Message from iframe:', event.data);
  // 根据消息更新页面内容
};

// 将其中一个端口发送到 iframe
document.querySelector('iframe').contentWindow.postMessage('Hello from parent', '*', [channel.port2]);

// 子页面（iframe）中的代码
// 监听消息
window.addEventListener('message', function (event) {
  console.log('Message from parent:', event.data);
  // 将消息发送回父页面
  const replyChannel = event.ports[0];
  replyChannel.postMessage('Hello from iframe');
});
```

在这个示例中，父页面创建了一个 MessageChannel 并将其中一个端口通过 postMessage 发送到了 iframe。iframe 接收到消息后，可以使用收到的端口与父页面进行通信。

## tips

- MessageChannel 还可用作深拷贝。但 message 事件是异步的（宏任务），且拷贝的对象不能含有 function。

```javascript
const copy = (obj) => {
  const { resolve, promise } = Promise.withResolvers()
  const { port1, port2 } = new MessageChannel()
  port1.onmessage = (e) => {
    resolve(e.data)
  }
  port2.postMessage(obj)
  return promise
}
```

## 参考链接

- [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

- [MessageChannel是什么，怎么使用？](https://www.jianshu.com/p/4f07ef18b5d7)
