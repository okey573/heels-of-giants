---
title: 实现一个同步cookies的浏览器插件
---

有些系统是通过登录后在cookie中注入token，然后在不同系统通过携带cookie信息进行认证的。

因为本地开发环境localhost和公司的系统域名肯定是不在一个域的，所以在开发时模拟登录后需要手动写入cookie。

然后浏览器插件是有操作cookie的权限的，所以用一个插件把线上系统的cookie同步到localhost来。

后面有时间再把代码贴上来。。