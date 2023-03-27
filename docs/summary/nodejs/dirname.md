---
title: __dirname 和 import.meta.url
---

在commonJS中除了 require ，exports 等模块相关 API之外，还有两个特殊的成员：

- __dirname：用来动态获取当前文件模块所属目录的绝对路径
- __filename：用来动态获取当前文件的绝对路径

但是现在在 ES Modules 中是没有的，但有相对应的替代方案。

## import.meta.url

import.meta 包含当前模块的一些信息，其中 import.meta.url 表示当前模块的 file: 绝对路径，拿到这个绝对路径我们就可以配合其他 API 来实现 __filename 和 __dirname。

```javascript
console.log(import.meta.url)
```

运行会得到一个基于 file 协议的 URL：file:///Users/ape/Desktop/temp/index.js

## fileURLToPath

```javascript
import { fileURLToPath } from "node:url";

console.log(fileURLToPath(import.meta.url));
```

#### __filename

通过 import.meta.url 和 fileURLToPath 可以得到 __filename

```javascript
const __filename = fileURLToPath(import.meta.url);
```

#### __dirname

获取到 __filename 后通过Node.js 的内部模块 path 的 dirname 方法可以获取到 __dirname

```javascript
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
```

或者通过 URL API也可以

```javascript
import { URL, fileURLToPath } from "node:url"

const url = new URL(".", import.meta.url);
const __dirname = fileURLToPath(url);

console.log(__dirname);
```

## process.cwd()

process.cwd() 是当前Node.js进程执行时的文件夹地址——工作目录
