---
title: rel 属性
---

# link 标签的 rel 属性

## preload

指定用户代理必须根据 as 属性给出的潜在目的地（以及与相应目的地相关的优先级），为当前导航预先获取和缓存目标资源。

基本使用

```html

<head>
    <link rel="preload" as="script" href="foo.js">
</head>
```

## prefetch

指定用户代理应预先获取并缓存目标资源，因为后续的导航可能需要它。

## preconnect

向浏览器提供提示，建议它提前打开与链接网站的连接，而不透露任何私人信息或下载任何内容，以便在跟踪链接时能更快地获取链接内容。

## dns-prefetch

指定用户代理应预先获取并缓存目标资源，因为后续导航可能需要该资源。链接预取常见问题有关于哪些链接可以被预取以及替代方法的详细信息

## modulepreload

对于提高性能很有用，并且与文档中的 <link> 元素相关，设置 rel="modulepreload" 告诉浏览器预先获取脚本（和依赖关系）并存储在文档的模块映射中，以便以后评估。 modulepreload 链接可以确保网络抓取时，模块映射中的模块已经准备好（但没有评估），然后才一定需要它。参见 modulepreload (en-US)。

## 参考链接

- [HTML 属性：rel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel)

- [性能优化之 preload、prefetch、preconnect 的区别与使用](https://juejin.cn/post/7128400578467594248)
