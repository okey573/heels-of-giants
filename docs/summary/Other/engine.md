---
title: 浏览器引擎
outline: [2,6]
---

# 浏览器引擎分为 js 引擎和渲染引擎

## js 引擎

### v8

谷歌， nodejs 以及 deno 都是使用的v8引擎，也是使用范围最广的 js 引擎。

它是用C++编写，实现了ECMAScript和WebAssembly

### JaegerMonkey

Firefox 目前使用的引擎，前身是 java 编写的 SpiderMonkey

### 其他

ie 使用的Chakra (JScript引擎)，中文译名为查克拉

## 渲染引擎

主流： Gecko、Trident、Webkit、Blink、Chromium

- 1997年 Trident
- 1998年 KHTML
- 2000年 Gecko
- 2001年 WebKit
- 2003年 Presto
- 2008年 Chromium
- 2010年 混合引擎(双核）
- 2013年 Blink
- 2015年 EdgeHtml

火狐：Gecko
谷歌：Blink
Edge：EdgeHTML 后来改用 Chromium

![关系图](/images/render-engine.png)

## 参考链接

- [引擎浅谈 SpiderMonkey & Google V8](https://www.wangshaoxing.com/blog/javascript-engines.html)
