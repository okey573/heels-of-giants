---
title: Webpack
outline: [2,6]
---

# Webpack

## 打包流程

- 将命令行参数与 webpack 配置文件 合并、解析得到参数对象。
- 参数对象传给 webpack 执行得到 Compiler 对象。
- 执行 Compiler 的 run方法开始编译。每次执行 run 编译都会生成一个 Compilation 对象。
- 触发 Compiler 的 make方法分析入口文件，调用 compilation 的 buildModule 方法创建主模块对象。
- 生成入口文件 AST(抽象语法树)，通过 AST 分析和递归加载依赖模块。
- 所有模块分析完成后，执行 compilation 的 seal 方法对每个 chunk 进行整理、优化、封装。
- 最后执行 Compiler 的 emitAssets 方法把生成的文件输出到 output 的目录中。

![流程图](/images/webpack-basic-flow.png)

## 热更新原理

TODO

[参考链接](https://juejin.cn/post/6844904008432222215)

## loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

#### 特性

- 单一职责
- 链式组合
- 模块化
- 无状态

#### loader 的执行顺序

###### 分类（按使用的方式分类）

- pre： 前置 loader
- normal： 普通 loader
- inline： 内联 loader
- post： 后置 loader

###### 执行顺序

- 4类 loader 的执行优级为: pre > normal > inline > post
- 相同优先级的 loader 执行顺序为：从右到左，从下到上

#### 实现自定义 loader

> loader 本质上就是一个 function， 接收文件内容并返回文件内容出去，而文件内容可以是字符串也可以是二进制

##### 分类

###### 同步 loader

```javascript
//同步loader
// 写法一
module.exports = function (content) {
  return content;
};

// 写法二
module.exports = function (content, map, meta) {
  /*
      this.callback的参数
      1.err代表是否有错误
      2.content 处理后的内容
      3.source-map 继续传递source-map
      4.meta给下一个loader传递参数
   */
  //   同步loader中不能进行异步操作
  this.callback(null, content, map, meta);
};

```

###### 异步 loader

异步 loader 会等待当前异步任务执行完再执行下一个 loader

```javascript
//异步loader
module.exports = function (content, map, meta) {
  //调用async方法返回callback
  const callback = this.async();

  setTimeout(() => {
    console.log("test2");
    //异步任务作为后调用callback
    callback(null, content, map, meta);
  }, 1000);
};
```

###### raw loader

```javascript
//raw loaders接收到的content是Buffer数据
module.exports = function (content, map, meta) {
  console.log("content", content); //<Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 27 68 65 6c 6c 6f 20 6d 61 69 6e 27 29>
  return content;
};
module.exports.raw = true; // 开启 Raw Loader
```

###### Pitching Loader

> webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法,在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader

```javascript
module.exports = function (content) {
  return content;
};
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("do somethings");
};

```

#### 常用的 loader

###### 样式

- style-loader 将样式模块导出的内容以往 `<head>` 中注入多个 `<style>` 的形式，添加到 DOM 中
- css-loader 加载 CSS 文件并解析 @import 的 CSS 文件，将 url() 处理成 require() 请求，最终返回 CSS 代码
- less-loader 加载并编译 LESS 文件
- sass-loader 加载并编译 SASS/SCSS 文件
- postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件
- stylus-loader 加载并编译 Stylus 文件

###### 语法转换

- babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
- ts-loader 像加载 JavaScript 一样加载 TypeScript 2.0+

###### 文件

- url-loader与 file-loader 类似，但当文件 size 小于设置的 limit 值，会返回 data URL
- file-loader 将文件保存至输出文件夹中并返回 URL (默认是是绝对路径，可以 outputPath 和 publicPath 通过配置成相对路径)

## plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

#### 工作原理

> webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。<br>插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。<br>webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。<br><br>——「深入浅出 Webpack」

站在代码逻辑的角度就是：webpack 在编译代码过程中，会触发一系列 Tapable 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行。

#### 钩子

钩子的本质就是：事件。为了方便我们直接介入和控制编译过程，webpack 把编译过程中触发的各类关键事件封装成事件接口暴露了出来，这些接口被很形象地称做：hooks（钩子）。开发插件，离不开这些钩子。

#### Tapable

Tapable 为 webpack 提供了统一的插件接口（钩子）类型定义，它是 webpack 的核心功能库。webpack 中目前有十种 hooks，在 Tapable 源码中可以看到，他们是：

```javascript
// https://github.com/webpack/tapable/blob/master/lib/index.js

exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
```

Tapable 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：

- tap：可以注册同步钩子和异步钩子。
- tapAsync：回调方式注册异步钩子。
- tapPromise：Promise方式注册异步钩子

webpack 里的几个非常重要的对象，Compiler, Compilation 和 JavascriptParser 都继承了 Tapable 类，它们身上挂着丰富的钩子。

#### Compiler Hooks

Compiler 编译器模块是创建编译实例的主引擎。大多数面向用户的插件都首先在 Compiler 上注册。

_实际上就是 **apply** 函数的参数_

```javascript
// plugins/MyPlugin.js

class MyPlugin {
  apply (compiler) {
    compiler.hooks.done.tap('My Plugin', (stats) => {
      console.log('Bravo!');
    });
  }
}

module.exports = MyPlugin;
```

#### Compilation Hooks

Compilation 是 Compiler 用来创建一次新的编译过程的模块。一个 Compilation 实例可以访问所有模块和它们的依赖。在一次编译阶段，模块被加载、封装、优化、分块、散列和还原。

Compilation 也继承了 Tapable 并提供了很多生命周期钩子。

_实际上就是 Compiler 钩子运行的回调函数的参数_

#### JavascriptParser Hooks

Parser 解析器实例在 Compiler 编译器中产生，用于解析 webpack 正在处理的每个模块。我们可以用它提供的 Tapable 钩子自定义解析过程。

#### 具体实现

- 一个命名的 Javascript 方法或者 JavaScript 类。
- 它的原型上需要定义一个叫做 apply 的方法。
- 注册一个事件钩子。
- 操作webpack内部实例特定数据。
- 功能完成后，调用webpack提供的回调。

#### 开发一个文件清单插件

```javascript
// plugins/FileListPlugin.js

class FileListPlugin {
  constructor (options) {
    // 获取插件配置项
    this.filename = options && options.filename ? options.filename : 'FILELIST.md';
  }

  apply (compiler) {
    // 注册 compiler 上的 emit 钩子
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {

      // 通过 compilation.assets 获取文件数量
      let len = Object.keys(compilation.assets).length;

      // 添加统计信息
      let content = `# ${len} file${len > 1 ? 's' : ''} emitted by webpack\n\n`;

      // 通过 compilation.assets 获取文件名列表
      for (let filename in compilation.assets) {
        content += `- ${filename}\n`;
      }

      // 往 compilation.assets 中添加清单文件
      compilation.assets[this.filename] = {
        // 写入新文件的内容
        source: function () {
          return content;
        },
        // 新文件大小（给 webapck 输出展示用）
        size: function () {
          return content.length;
        }
      }

      // 执行回调，让 webpack 继续执行
      cb();
    })
  }
}

module.exports = FileListPlugin;
```

## 优化

DllPlugin HappyPack ParallelUglifyPlugin [参考链接](https://www.jianshu.com/p/2487e3c5421e)
