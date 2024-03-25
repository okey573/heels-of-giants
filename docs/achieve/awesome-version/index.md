---
title: 灵活控制SPA版本的vite插件
outline: [ 2,6 ]
---

# 灵活控制SPA版本的vite插件

## 解决的问题

### 背景

现在的 SPA 项目通常的部署方式是打包成一个 **index.html**， 在这个 html 中再加载 assets

访问页面 实际就是访问这个 **index.html**

### 问题

发布新版本时，服务器上的 **index.html** 文件一但被替换，不考虑缓存的情况下，用户访问页面会立即发生变化。
若使用 ci/cd 流水线等自动化部署手段，静态文件的替换时间很难把控，且发生问题后不能快速回滚，需求修改代码重新发布

## 插件原理

用一句来概括就是：在 **index.html** 中读取指定版本后渲染对应版本的页面

### 添加版本概念

每次打包都以当前时间生成唯一一个版本号，例如 20240227d171504t

以这个版本号去重命名 index.html 和 assetsDir ，新的文件结构如下：
::: code-group

``` markdown [赋予版本后] {2,3}
|-- dist
|   |-- index.20240227d171504t.html
|   |-- 20240227d171504t
|       |-- a.css
|       |-- b.js
|       |-- c.js
```

``` markdown [赋予版本前] {2,3}
|-- dist
|   |-- index.html
|   |-- assets
|       |-- a.css
|       |-- b.js
|       |-- c.js
```

:::

### 生成新的 index.html

原本的 **index.html** 被重名成携带版本号的文件了，例如 **index.20240227d171504t.html**

而访问页面时依旧访问的是 **index.html** 所以还需要生成一个 index 文件，这个文件要做的事就是**读取指定版本后渲染对应版本的页面
**

### 增量部署

要求部署时 不能删除之前版本的 assets 和 html 文件，一个部署了多次，有多个版本的结构可能如下：

``` markdown
|-- dist
|   |-- index.html
|   |-- index.20240325d171504t.html
|   |-- index.20240326d151630t.html
|   |-- index.20240327d192245t.html
|   |-- 20240325d171504t
|       |-- a.css
|       |-- b.js
|       |-- c.js
|   |-- 20240326d151630t
|       |-- d.css
|       |-- e.js
|       |-- f.js
|   |-- 20240327d192245t
|       |-- g.css
|       |-- h.js
```

::: warning
增量部署要求使用方自己完成，插件实现不了
:::

### 渲染指定版本 html 内容

在 **index.html** 读取服务端的版本号，根据版本号获取 html 和 assets 完成渲染页面

::: tip
其实到这里，可以想到有其它很多方案，比如配置一下 nginx 指向不同版本的 html ， 但这里不考虑这些方案
:::

## 插件实现

显然，插件需要两部分：

1. 应用在前端代码中的 vite 插件
2. 一个版本控制的服务端，提供配置和查询版本的能力：以 http 接口的形式提供

这里只考虑前端 vite 插件，服务端的实现很普通，就一个简单的配置系统

### 三个钩子

首先定义一个 vite 插件，在这个插件中使用到了三个钩子函数

- config 修改打包的 assetsDir 配置
- generateBundle 将原本的 index.html 重命名
- closeBundle 生成新的 index.html

::: details 查看伪代码

```javascript
// 生成一个版本号
const version = date2version()

return {
  config (conf) {
    return {
      build: {
        assetsDir: version,
        // 需要增量部署，不清空之前的文件
        emptyOutDir: false
      }
    }
  },

  generateBundle (options, bundle) {
    bundle['index.html'].fileName = `index.${version}.html`
  },

  closeBundle () {
    // 考虑到用户可能修改了默认 outDir， 所以要通过配置获取到真整的 outDir  
    const dest = path.resolve(path.resolve(cwd, outDir), `index.html`)
    // 写入新的 html
    fs.writeFileSync(dest, writeHTMLByTemplate())
  }
}
```

:::

### 通过版本号读取html后渲染

#### 获取 html 字符串

众所周知，处于安全考虑，浏览器是不允许读取本地文件的，所以通过一个 http 请求获取到版本号后怎么获取到对应的 html 内容成了个问题。对此有两个解决办法：

- 服务端直接存储 html 字符串内容
- 浏览器获取到版本号后，拼接成完整的网络链接，再访问读取 html

#### 通过 html 渲染页面

获取到 html 字符串后就可以渲染页面了，这里采用的实现方式如下：

```javascript
var newWin = window.open('', '_self')
newWin.document.write(htmlStr)
newWin.document.close()
```

::: details 查看 writeHTMLByTemplate 伪代码

```javascript
export default function (options) {
  // options 参数是应用的一些配置信息，包括应用名，秘钥等信息
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vite-plugin-awesome-version</title>
    <script>
      var newWin = window.open('', '_self')
      
      // 使用 XHR 不用 fetch api 提高兼容性
      var xhr = new XMLHttpRequest()
      
      // 发起请求 获取版本号
      xhr.open('get', 'http://localhost:3000?app=${options.app}&appKey=${options.appKey}')
      xhr.send()
      
      xhr.onload = function () {
        var response = xhr.response
        var data = JSON.parse(response)
        // 这里采用的是直接在服务端存储 html 字符串的方式，若存储的是版本号，还需要发起一个 get 请求去远程获取 html 字符串
        newWin.document.write(data.html)
        newWin.document.close()
      }
    </script>
</head>
<body>
</body>
</html>
`
}

```

:::

## 其他思考

### 安全性

其实 html 内容本就是公开的，所以提供一个免验签的查询 html 字符串的接口 也不会有什么风险

### 保存 html 的时机

关于版本控制的服务端，如果不想做界面，也可以直接操作数据库。切换生效版本的版本时一个 sql 就搞定

在打包新版本之后，若要保存新版本到服务端，默认是采用手动的方式，把版本号复制下来，然后插入数据库。或者还有一个做法是：在 vite 插件的 closeBundle 钩子函数中，发起一个 http 请求，采用自动调接口的方式插入数据

## 完整代码

_TODO: 后面把项目传到 github 然后把链接贴上来_
