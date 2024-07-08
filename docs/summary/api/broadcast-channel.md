---
title: BroadcastChannel
lastUpdated: 2024/07/08 15:25:52 GMT+0800 (中国标准时间)
---

# BroadcastChannel

**`BroadcastChannel`** 接口代理了一个命名频道，可以让指定 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin) 下的任意 [browsing context](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context) 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 [`message`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/message_event) 事件，消息可以广播到所有监听了该频道的 `BroadcastChannel` 对象。

## 特点

- 同源策略：只能在相同源（协议、域名、端口都相同）的浏览上下文中使用。
- 广播消息：向所有同源的 BroadcastChannel 实例发送消息，无论它们在哪个浏览上下文。
- 自动连接：不需要显式连接或断开连接，实例化 BroadcastChannel 时自动连接。
- 事件驱动：使用 message 事件来接收消息

## 使用场景

- 多标签页应用：在一个网站的不同标签页之间共享实时数据或状态。
- 跨 iframe 通信：在同一页面的不同 iframe 之间共享信息。

## 示例

假设你有一个网页应用，用户可以打开多个标签页，你希望在一个标签页中触发的操作能够被其他所有标签页感知。比如，一个实时更新的新闻网站，当新闻更新时，所有打开的标签页都应该显示最新的新闻。

```javascript
// 在所有标签页中创建一个 BroadcastChannel 实例
const channel = new BroadcastChannel('newsUpdates');

// 监听消息的函数
function receiveNewsUpdate (event) {
  console.log('News update received:', event.data);
// 这里可以更新页面上的新闻内容
}

// 为 channel 添加消息监听器
channel.addEventListener('message', receiveNewsUpdate);

// 发送消息的函数
function sendNewsUpdate (news) {
  channel.postMessage(news);
}

// 假设这是从服务器接收到的新闻更新
const newNews = { headline: 'Breaking News!', content: 'Here is the latest news...' };
sendNewsUpdate(newNews);
```

在这个示例中，无论哪个标签页调用了 sendNewsUpdate 函数，所有其他标签页都会通过 receiveNewsUpdate 函数接收到更新。

## 参考链接

- [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

- [MessageChannel是什么，怎么使用？](https://www.jianshu.com/p/4f07ef18b5d7)
