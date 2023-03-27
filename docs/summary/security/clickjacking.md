---
title: 点击劫持
---

# 点击劫持

## 什么是点击劫持

点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌入自己的网页中，并将 iframe 设置为透明，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的iframe页面

## 防御办法

使用一个HTTP响应头 **X-Frame-Options** 它有三个可选的值：

- DENY：浏览器会拒绝当前页面加载任何frame页面；
- SAMEORIGIN：frame页面的地址只能为同源域名下的页面；
- ALLOW-FROM origin：允许frame加载的页面地址；
