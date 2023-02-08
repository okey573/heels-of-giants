---
title: Web Worker
---

Javascript是运行在单线程环境中，也就是说无法同时运行多个脚本。假设用户点击一个按钮，触发了一段用于计算的Javascript代码，那么在这段代码执行完毕之前，页面是无法响应用户操作的。但是，如果将这段代码交给Web Worker去运行的话，那么情况就不一样了：浏览器会在后台启动一个独立的worker线程来专门负责这段代码的运行，因此，页面在这段Javascript代码运行期间依然可以响应用户的其他操作

## WebWorker线程数据通讯方式

Worker 与其主页面之间的通信是通过 onmessage 事件和 postMessage() 方法实现的


## WebWorker适合使用的场景
- 加密数据
- 预取数据
- 预渲染
- 复杂数据处理场景
- 预加载图片
