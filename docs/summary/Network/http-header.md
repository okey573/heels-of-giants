---
title: http header
---

# http 协议报文头

## 通用头部

|       通用头部        |                                                  作用（请求报文和响应报文都可能使用）                                                   |
|:-----------------:|:---------------------------------------------------------------------------------------------------------------------:|
|   Cache-Control   | 控制缓存的行为：no-cache（强制向服务器再次验证）、no-store（不做任何缓存）、max-age=111111（资源可缓存最大时间 秒）、public（客户端、代理服务器都可利用缓存）、private（代理服务器不可用缓存） |
|    Connection     |                                      浏览器想要优先使用的连接类型： keep-alive close（开启和关闭持久连接）                                      |
|       Date        |                                                        创建报文时间                                                         |
|      Pragma       |                                              只用于请求报文，客户端要求中间服务器不返回缓存的资源                                               |
|        Via        |                                          代理服务器相关信息，每经过一个代理服务器就会添加相关信息，用逗号分割                                           |
| Transfer-Encoding |                                                  传输编码方式：chunked分块传输                                                   |
|      Upgrade      |                                   要求客户端使用的升级协议，需配合Connection: Upgrade一起使用：websocket                                   |
|      Warning      |                                                       缓存相关问题的警告                                                       |

## 请求头部

|        请求头部         |                       作用（请求报文专用）                       |
|:-------------------:|:------------------------------------------------------:|
|       Accept        |         能正确接收的媒体类型：application/json text/plain         |
|   Accept-Charset    |                 能正确接收的字符集: unicode-1-1                 |
|   Accept-Encoding   |               能正确接收的编码格式列表：gzip deflate                |
|   Accept-Language   |           能正确接收的语言列表：zh-cn,zh;1=0.9,en,1=0.8           |
|    Authorization    |      客户端认证信息：Bearer dSdSdFFlsfdjasd123，一般存token用       |
|       Cookie        |                    发送给服务器的Cookie信息                     |
|       Expect        |                       期待服务端的指定行为                       |
|        From         |                        请求方邮箱地址                         |
|        Host         |     服务器的域名，用于区分单台服务器多个域名的虚拟主机，是HTTP/1.1唯一必须包含的字段。      |
|      If-Match       | 两端资源标记比较，只有判断条件为真服务端才会接受请求：If-Mach: "123456，和服务端文件标记比较 |
|  If-Modified-Since  |                  本地资源未修改返回 304（比较时间）                   |
|    If-None-Match    |                  本地资源未修改返回 304（比较标记）                   |
|     User-Agent      |                         客户端信息                          |
|    Max-Forwards     |                     限制可被代理及网关转发的次数                     |
| Proxy-Authorization |                      向代理服务器发送验证信息                      |
|        Range        |                请求某个内容的一部分，配合If-Range使用                 |
|       Referer       |                      请求发起页面的原始URI                      |
|         TE          |                         传输编码方式                         |

## 响应头部

|        响应头部        |           作用（响应报文专用）           |
|:------------------:|:------------------------------:|
|   Accept-Ranges    | 告知客户端服务器是否可接受范围请求，是bytes，否none |
|        Age         |         资源在代理缓存中存在的时间          |
|        ETag        |      资源标识，资源发生变化时标识也会发生改变      |
|      Location      |         客户端重定向到某个 URL          |
| Proxy-Authenticate |          向代理服务器发送验证信息          |
|       Server       |       服务器名字：Apache Nginx       |
|  WWW-Authenticate  |          获取资源需要的认证方案           |
|     Set-Cookie     |     需要存在客户端的信息，一般用于识别用户身份      |

## 实体头部

|       实体头部       |                作用（补充请求报文或响应报文相关信息）                 |
|:----------------:|:--------------------------------------------------:|
|      Allow       |              资源的正确请求方式：GET HEAD POST               |
| Content-Encoding |                内容的编码格式：gzip deflate                |
| Content-Language |                   内容使用的语言：zh-CN                    |
|  Content-Length  |             request body 长度（即实体主体的大小）：             |
| Content-Location |                     返回数据的备用地址                      |
|   Content-MD5    |                Base64加密格式的内容 MD5检验值                |
|  Content-Range   |                     响应主体的内容范围                      |
|   Content-Type   | 内容的媒体类型（如'application/json;charset=UTF-8'则会发送预检请求） |
|     Expires      |                      内容的过期时间                       |
|  Last_modified   |                     内容的最后修改时间                      |
