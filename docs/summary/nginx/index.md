---
title: nginx
---

# nginx

## 基本命令

- 查看版本号

```shell
./nginx -v
```

- 启动 nginx

```shell
./nginx
```

- 检查 nginx 配置文件是否正确命令

```shell
./nginx -t
```

- 指定检测特定 nginx 配置文件：-c 表示 configuration，指定配置文件

```shell
./nginx -t -c /usr/local/nginx/conf/nginx.conf
```

- nginx 指定启动配置文件命令

```shell
./nginx -c /usr/local/nginx/conf/nginx.conf
```

- 暴力停止 nginx 服务器命令

```shell
./nginx -s stop
```

- 停止 nginx 服务器命令

```shell
./nginx -s quit
```

- nginx 重新加载配置文件命令

```shell
./nginx -s reload
```

## 配置文件

## 参考链接

- [Nginx proxy_pass详解](https://blog.csdn.net/erik_tse/article/details/121966757)
