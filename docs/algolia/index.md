---
title: VitePress集成algolia实现搜索
outline: [2,6]
---

把algolia集成到VitePress文档工程里，实现搜索功能

## 概述

VitePress是支持algolia的，但是官方文档中没有指引。可以看到vue3文档，vite文档，elementPlus文档等等都采用的是algolia实现搜索。

#### 了解algolia

algolia实现搜索就是通过把网站数据上传到algolia（实际上是algolia爬取网站数据），然后搜索时是向algolia发送请求，然后把返回展示在网站上，实现搜索。

## 实现

#### 注册algolia账号

官网地址：https://www.algolia.com

注册一个免费账号，然后获取Api Keys，Search-Only API Key在项目中使用的，Admin API Key 是用于一会爬虫的key，放在Github Secrets中。

#### 在项目中配置

修改VitePress配置文件：docs/.vitepress/config

```
{
  algolia: {
    appId: 'SQ5GQ6SV73',
    apiKey: 'cba98dd04dea30f0007609408f2ccc74',
    indexName: 'heels-of-giants docs search engine',
    placeholder: '请输入关键词',
    buttonText: '搜索'
  }
}
```

#### 把上面获取到的私钥放在Github Secrets中

> github->setting->Security->secrets and variables->Actions

新建一个Secrets

#### 根目录创建crawlerConfig.json

start_urls需要替换成自己的真实上线后的地址

```json
{
  "index_name": "heels-of-giants docs search engine",
  "start_urls": [
    "https://okey573.github.io/docs/"
  ],
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li"
  },
  "selectors_exclude": [
    "aside",
    ".page-footer",
    ".next-and-prev-link",
    ".table-of-contents"
  ],
  "js_render": true
}
```

#### 添加action脚本

注意branch, env等参数

```yaml
name: Algolia
on:
  push:
    branches:
      - master
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawler.config.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}

```
