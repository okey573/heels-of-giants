---
title: 实现action自动部署pages
outline: [2,6]
---

使用github的action自动部署vitepress文档工程到github.io的静态站点pages

## 概述

#### 需要掌握的内容

- VitePress
- [GitHub Action](https://docs.github.com/en/pages)
- [GitHub Pages](https://docs.github.com/en/actions) _也可以看[阮一峰的入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)_

#### 项目说明（共涉及两个Repo）

1. 采用VitePress搭建的文档工程，也就是本站的源码工程 [源码链接](https://github.com/okey573/heels-of-giants)
2. GitHub Pages工程，也就是username.github.io工程 [源码链接](https://github.com/okey573/okey573.github.io)

#### 实现的功能

在VitePress工程中编写或更新文档，将相关改动push到远程后，实现自动打包部署，然后可以在页面上最新改动。

## 实现

#### 说明

跟着上面提到的[阮一峰的入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)操作就能理解。但是这个文章是很古老的版本的，里面用到action的配置现在都不对了，要注意甄别。

然而现在的和它有几点不用之处，也就是本文需要解决的问题

1. cra创建的工程，默认打开输出是在项目根目录下，而VitePress打包之后的目录是在/docs/.vitepress/dist
2. 现在我们要做的是把文档工程打包，然后把打包后的产物提交到另外一个专门用来放pages的工程，然后由github再重新部署。所以我们要做的事情就是**npm run build->将build产物dist文件夹push到pages工程对应分支的对应位置**

#### 代码

在文档工程的根目录下添加.github/workflows/ci.yml文件，内容如下

```yaml
name: CI
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3
        with:
          persist-credentials: false

      - name: Install and Build 🔧
        run: |
          npm ci
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: docs/.vitepress/dist
          branch: master
          token: ${{ secrets.personal_access_token }}
          repository-name: okey573/okey573.github.io
          target-folder: docs
```

#### 针对上面YML的说明

上面两个step都好理解，checkout和打包，主要说明**Deploy**步骤里的with参数

- folder 打包产物的路径，就正常写从根目录开始的真实路径就行了
- branch 要推送到哪个Repo的哪个分支
- token 就是github的token，怎么生成的可以参考[官方文档](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- repository-name 要推送到哪个Repo，就是github的Repo的完整路径（例如`https://github.com/okey573/okey573.github.io`）`https://github.com/`后面的部分（也就是`okey573/okey573.github.io`）。
- target-folder就是要推送目标Repo的哪个目录
