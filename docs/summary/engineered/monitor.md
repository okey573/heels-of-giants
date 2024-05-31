---
title: 监控
outline: [2,3]
lastUpdated: Fri May 24 2024 16:27:37 GMT+0800 (中国标准时间)
---

# 监控

## 前端监控

### 数据监控（监控用户行为）

- PV (page view)：即页面浏览量或点击量
- UV：指访问某个站点或点击某条新闻的不同 IP 地址的人数
- 用户在每一个页面的停留时间、触发的行为......

### 性能监控（监控页面性能）

- FP
- FCP
- DCL
- LCP
- L

### 异常监控（监控系统异常）

|                      方式                       |                 特点                  |
|:---------------------------------------------:|:-----------------------------------:|
|                window.onerror                 |                                     |
|       window.addEventListener('error')        | 可以全局捕获资源加载异常的错误，会比window.onerror先触发 |
| window.addEventListener('unhandledrejection') |        捕获 promise reject 异常         |
|                框架的 error 生命周期                 |                                     |
|                   try catch                   |                                     |

#### 异常处理

- sourceMap

## 页面埋点

### 手动埋点

### 自动埋点

## 数据上报

### image 对象

### xhr 和 fetch

### Beacon API

## 参考链接

- [如何在线上使用 SourceMap ？](https://blog.csdn.net/xgangzai/article/details/136668414)

- [Webpack 实战系列一：正确使用 Sourcemap](https://www.51cto.com/article/695341.html)

- [一文看懂 webpack 的所有 source map ！](https://juejin.cn/post/7016510600960278565)
