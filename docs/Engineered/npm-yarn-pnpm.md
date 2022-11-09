---
title: npm yarn pnpm 发展历程
---

_从上往下按发布时间排序_

#### npm v1 / npm v2

不足：依赖包嵌套的问题，导致 node_modules 体积越来越大；没有cahce，没有离线功能

#### npm v3

peerDependencies不再导致隐式安装任何东西。如果缺少包 peerDependencies，npm会发出警告；

扁平化 node_modules

#### pnpm 发布（默默无名）

#### yarn 发布初始版本（kpm）

lockfiles(yarn.lock)

与 npm 和 bower 工作流程兼容

更加语义化

更加简洁，可读的cli输出

各指标超越npm

#### npm v4

npm-shrinkwrap.json确保你在其中指定的模块完全按照指定的内容安装（package-lock.json前身）

#### npm v5

package-lock.json默认生成，并兼容npm-shrinkwrap.json

重构npm-cache，提升下载速度

对离线模式及缓存安装进行了优化

#### npm v5.2

发布npx命令

#### yarn@1.0.0发布

Yarn Workspaces 更加友好。它可以让人们自动聚合来自多个 package.json 文件的所有依赖项，并一次性安装它们。

根目录使用单个 yarn.lock 文件，将它们全部锁定。

Yarn 将在碰巧相互依赖的所有工作区之间创建符号链接，以便最终在所有项目中始终使用最新的代码。

#### npm v6

发布npm init

#### pnpm@1.0.0发布

节约磁盘空间并提升安装速度，解决依赖分身（doppelgangers）的问题

创建非扁平化的 node_modules 文件夹，软连接结构，解决幽灵依赖的问题

#### pnpm@2.0.0发布

#### pnpm@3.0.0发布

#### pnpm@4.0.0发布

修复bug、优化性能、提高兼容性

#### yarn 2.0.0

可读性更高的 CLI 输出

更好的 workspaces 支持

yarn dlx（与 npx 类似）

#### pnpm@5.0.0发布

#### npm v7 支持workspaces概念

自动安装peerDependencies中的依赖

#### pnpm@6.0.0发布

#### yarn@3.0.0发布

支持 node 的exports字段

不再支持 Node 10

#### npm v8

不再支持node10, node11

不再支持require('npm')
