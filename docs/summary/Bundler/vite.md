---
title: vite
---

# [Vite](https://cn.vitejs.dev/)

## 定义

> Vite 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：<br>一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。<br>一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## 和 Webpack的区别

- Webpack启动的时候，要根据entry找到所有的依赖模块，然后对代码进行编译、打包、压缩的。所以Webpack是 bundle based dev server
- Vite的核心思想是：利用浏览器的能力，将解析依赖和获取JS模块的工具交给浏览器去做。 **本地服务器支队模块进行基本的transform，减少了分析依赖跟源码打包的成本。** 因此，Vite的原理是Native ESM based dev server

#### 理解

**并不能直接说 Vite 比 Webpack 快。**

- Vite 启动开发服务非常快，因为是 Native ESM based dev server 的原理，把部分在 webpack 启动时做的工作，交给了浏览器去做了。

- Vite 首次启动后加载慢。因为模块以 ES6 原生的模块加载机制的方式被浏览器加载，没有对代码进行打包跟压缩处理，因此请求数会更多，下载文件也会更大。

- Vite 是牺牲了页面首次加载时间来加快项目启动时间，但是仅仅是首次！Vite的第二次启动是会有缓存的。

## 参考链接

- [为什么有人说 vite 快，有人却说 vite 慢？](https://juejin.cn/post/7129041114174062628)
