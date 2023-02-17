---
title: create-custom-app
outline: [2,6]
---

实现一个类似create-react-app, create-vue类似的工具

## 准备

一个npm账号，以及发布npm包相关知识

## 实现

> https://github.com/okey573/create-custom-app.git

**主要是参考[create-vue](https://github.com/vuejs/create-vue)**

但是create-vue是把模板源码放在这里，和工具一起发布的，就相当于把模板代码开源公开了，这种操作在实际工作中一般都是违反公司规定的。

所以改成了从git读取模板代码，把模板代码放在一个指定repo，这个repo肯定是有权限控制的，如果创建模板时没有登录git或者没有相关权限就会报错退出，从而解决了代码私密性这个问题。

#### 检查版本更新的问题

这个工具还实现了在使用时可以检查本地是不是最新版本

实现方法: 读取cdn@latest中package.json的version信息 [链接](https://github.com/okey573/create-custom-app/blob/master/utils/checkLatestVersion.js)
