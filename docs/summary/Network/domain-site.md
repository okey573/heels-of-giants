---
title: domain&site
outline: [2,6]
---

域和站

## 域名是什么

域名，是由一串用点分隔的字符组成的互联网上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位。域名可以说是一个IP地址的代称，目的是为了便于记忆后者。当我们使用域名的时候，会通过DNS去查找对应的ip，从而找到对应的计算机电子方位。

域名有一套复杂的定义规则，我们简单了解下。以www.baidu.com为例，其中.com就是顶级域名，.baidu则是二级域名，www是主机名。

额～主机名是啥？如果你在服务器手动放置静态HTML资源的时候，会不会发现一般都是放在www文件夹下？这就是主机名，它一般被附在域名系统（DNS）的域名之后，形成完整域名。当然，主机名也不一定非得是www，你可以随便定义

## 顶级域名

- TLD：即Top-Level Domain，顶级域名，它是一个因特网域名的最后部分，也就是任何域名的最后一个点后面的字母组成的部分。比如：.com、.net、.edu等。
- gTLD：即Generic top-level domain，通用顶级域名，是供一些特定组织使用的顶级域，以其代表组织英文名称的头几个英文字母代表，如 .com代表商业机构。
- ccTLD：即Country Code Top Level Domain，国家顶级域名，嗯，只供国家使用的，比如 .cn。
- eTLD：即Effective Top-Level Domain，有效顶级域名。

#### 有效顶级域名(eTLD)

顶级域名也就是TLD一般是指域名中的最后一个"."后面的内容，TLD会记录在一个叫做Root Zone Database的列表中，它记录了所有的顶级域名，顶级域名并不一定只有一级，也不一定都是短单词。

有效顶级域名eTLD，存储在Public Suffix List中，因为顶级域名并不一定可以被所有需要注册域名的用户所使用，所以用户可以根据顶级域名注册自己想要的二级域名，比如example.com这样。所以有效顶级域名的存在根本的原因是让域名的控制权在使用者手中。比如.com.cn或者.github.io就是一个eTLD。

_[完整的Public Suffix List](https://publicsuffix.org/list/public_suffix_list.dat)_

#### eTLD+1

**eTLD+1表示eTLD再加一级域名，举例`a.github.io`或者`baidu.com.cn`**

为什么`a.taobao.com`和`www.b.taobao.com`是同站，`a.github.io`和`b.github.io`却是跨站呢？

——因为`github.io`在公共后缀列表里，但`taobao.com`不在公共后缀列表里

## 跨域和跨站

#### 跨域

跨域的定义，并不是指域名不同，或者域不同，而是不同源。其次，同源的定义则是需要协议、域名、端口号三者都相同的URL才行

#### 跨站

eTLD+1相同 + 协议相同

这里的跨站和cookie中的“跨站”不同。cookie中的SameSite认为eTLD+1相同就是同站，不论协议是否相同


## 参考链接
https://cloud.tencent.com/developer/article/2134072
