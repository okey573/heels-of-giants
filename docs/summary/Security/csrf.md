---
title: csrf
outline: [2,6]
---

# CSRF

## 什么是CSRF

CSRF 全称为(Cross-Site Request Forgery)，即跨站请求伪造，也称为One Click Attack，一键攻击，因为其通常会通过一个图片或者链接并诱导用户去点击，当用户点击这个图片或者链接后，这个链接通常包含了一些攻击性的操作和参数，即所谓的伪造的请求，就会以用户的身份向服务器发起这个伪造的请求，服务器收到这个伪造的请求后，就会认为是用户自己许可的操作，导致用户数据丢失等。

## CSRF的条件

由于CSRF是伪造用户请求，并且以用户的身份向服务器发起请求，导致用户数据丢失，所以用户必须先登录获取对应的登录cookie之后，伪造的请求才会生效，才会导致用户数据丢失。所以CSRF攻击的前提条件是:

- 用户必须先登录信任网站，并且在本地生成对应的cookie；
- 在用户没有登出的情况下，访问了危险网站；

## CSRF防御

- 增加 token 校验
- 校验请求头的 referer 属性值
- 合理使用 cookie 的 sameSite 属性

## 参考链接

- [CSRF简介](https://blog.csdn.net/qq_45803593/article/details/124727762)

- [什么是 CSRF 攻击](https://blog.csdn.net/ihtml5/article/details/115283688)
