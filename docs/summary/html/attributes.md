---
title: HTML 元素属性
lastUpdated: Mon May 06 2024 16:47:26 GMT+0800 (中国标准时间)
---

# HTML 元素的常见属性

## href 和 src 的区别

**href 用于在当前文档和引用资源之间确立联系；src 用于替换当前内容**

- 当浏览器遇到href会并行下载资源并且不会停止对当前文档的处理。(同时也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式)
- 当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。(这也是script标签为什么放在底部而不是头部的原因)
