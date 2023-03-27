---
title: 引擎
outline: [2,6]
---

# 浏览器引擎

## js 引擎

### v8

谷歌， nodejs 以及 deno 都是使用的v8引擎，也是使用范围最广的 js 引擎。 它是用 C++ 编写，实现了 ECMAScript 和 WebAssembly

#### v8 引擎的主要工作

- 编译和执行 js 代码
- 处理调用栈
- 内存的分配
- 垃圾的回收

#### v8 引擎的主要组成

- Parser: 解析器，负责将源代码解析成AST
- Ignition: 解释器，负责将AST转换成字节码并执行，同时会标记热点代码
- TurboFan: 编译器，负责将热点代码编译成机器码并执行
- Orinoco: 垃圾回收器，负责进行内存空间回收

#### v8 引擎执行 js 代码的流程

1. 经过 Parser 模块，将代码解析成抽象语法树（词法分析和语法分析）
2. 经过 Ignition 模块，解释成字节码，这个字节码可以直接被解释器执行。如果一个函数被调用很多次，那这个函数会被标记成热点函数 (hot func), 会经过 TurboFan，转成优化之后的机器码
3. 如果一个热点函数在调用的过程中，类型发生了改变，那么还是要经过 Ignition 来进行反优化，有机器码再转为字节码，然后再转为机器码进行运行。机器码执行效率高于字节码

#### v8 引擎为什么不直接翻译成机器码

因为无法确定这个代码会运行在怎样的环境上（windows，mac，linux），不同环境的 cpu 架构不同，不同 cpu 架构能执行的机器指令不同，所以无法确定机器指令，所以才转化为字节码。字节码可以跨平台，转化为机器指令后就可以运行了

#### 总结

v8 引擎是使用了一种 jit (即时编译执行) 的模式

### SpiderMonkey

Firefox 目前使用的引擎，最开始由 C 语言实现，后来加上了 C++， C/C++共同编译。另外还有一个叫做Rhino的Java版本。

#### 编译器

SpiderMonkey 前后出现了 TraceMonkey , JägerMonkey ,IonMonkey 等 JIT 编译器

#### 解释执行

SpiderMonkey 首先将 js 文件转换成抽象语法树(AST)再转换成字节码文件 (这一步与java等大多数语言类似), 这种字节码文件可以一行行的丢给解释引擎来执行,我们只需要根据不同 platform 开发出不同的解释引擎就可以了. 本质来讲, SpiderMonkey 就是一个虚拟机 VM. 解释引擎消化字节码的效率就是整个js文件被执行效率. 那我们为什么不直接把 AST 丢给解释器呢 ? 原因是字节码比 AST 有更好的内存布局,曾经有人做过实验,同样的逻辑使用字节码比使用 AST 效率高3倍以上,当然这紧紧是在解释执行层面上的结论. 对于编译执行的方式,直接使用 AST 也未尝不可

#### 总结

SpiderMonkey 采用了解释执行 / jit (即时编译执行) 混合方式。

### v8 和 SpiderMonkey 的区别

- 实现方式不同
- 编译方式不用， v8 是纯粹的 jit， 而 SpiderMonkey 采用了混合模式。另外，v8 曾经抛弃过字节码，将 js 代码直接编译成二进制机器代码，但由于编译时间过长，和编译过后的二进制代码占用更多空间等问题，又重新引入了二进制机器码

### 其他

ie 使用的Chakra (JScript引擎)，中文译名为查克拉

## 渲染引擎

主流： Gecko、Trident、Webkit、Blink、Chromium

- 1997年 Trident
- 1998年 KHTML
- 2000年 Gecko
- 2001年 WebKit
- 2003年 Presto
- 2008年 Chromium
- 2010年 混合引擎(双核）
- 2013年 Blink
- 2015年 EdgeHtml

火狐：Gecko
谷歌：Blink
Edge：EdgeHTML 后来改用 Chromium

![关系图](/images/render-engine.png)

## 参考链接

- [引擎浅谈 SpiderMonkey & Google V8](https://www.wangshaoxing.com/blog/javascript-engines.html)

- [V8为什么又重新引入字节码](https://blog.csdn.net/kaimo313/article/details/125334521)
