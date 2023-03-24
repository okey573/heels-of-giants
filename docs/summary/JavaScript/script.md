---
title: script 标签
---

# script 标签相关的内容

## 基础知识

浏览器的解析规则是：如果遇到 script 标签，则暂停构建 DOM，转而开始执行 script 标签，如果是外部 script，那么浏览器还需要一直等待其「下载」并「执行」后，再继续解析后面的 HTML。

如果有多个 script 标签，是按照顺序下载然后执行的，但是 Chrome 针对这个情况做了个优化，会先并行下载，然后按原本的顺序执行。

结论： script 标签会阻塞浏览器解析 HTML，如果把 script 都放在 head 中，或者头部，在网络不佳的情况下，就会导致页面长期处于白屏状态。

## defer

> 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。有 defer 属性的脚本会阻止 DOMContentLoaded 事件，直到脚本被加载并且解析完成

如果在 script 标签上设置了 defer 属性，那么在浏览器解析到这里时，会默默的在后台开始下载此脚本，并继续解析后面的 HTML，并不会阻塞解析操作。

等到 HTML 解析完成之后，浏览器会立即执行后台下载的脚本，脚本执行完成之后，才会触发 DOMContentLoaded 事件。

**2 个小细节：**

Q1： 如果 HTML 解析完成之后，设置了 defer 属性的脚本还没下载完成，会怎样？

A1： 浏览器会等脚本下载完成之后，再执行此脚本，执行完成之后，再触发 DOMContentLoaded 事件。

Q2： 如果有多个设置了 defer 属性的脚本，那浏览器会如何处理？

A2： 浏览器会并行的在后台下载这些脚本，等 HTML 解析完成，并且所有脚本下载完成之后，再按照他们在 HTML 中出现的相对顺序执行，等所有脚本执行完成之后，再触发 DOMContentLoaded 事件。

**最佳实践：**

建议所有的外联脚本都默认设置此属性，因为他不会阻塞 HTML 解析，可以并行下载 JavaScript 资源，还可以按照他们在 HTML 中的相对顺序执行，确保有依赖关系的脚本运行时，不会缺少依赖。

在 SPA 的应用中，可以考虑把所有的 script 标签加上 defer 属性，并且放到 body 的最后面。在现代浏览器中，可以并行下载提升速度，也可以确保在老浏览器中，不阻塞浏览器解析 HTML，起到降级的作用。

**注意：**

defer 属性仅适用于外部脚本，如果 script 脚本没有 src，则会忽略 defer 特性。

defer 属性对模块脚本（script type=‘module’）无效，因为模块脚本就是以 defer 的形式加载的。

## async

> 对于普通脚本，如果存在 async 属性，那么普通脚本会被并行请求，并尽快解析和执行。
> 对于模块脚本，如果存在 async 属性，那么脚本及其所有依赖都会在延缓队列中执行，因此它们会被并行请求，并尽快解析和执行。该属性能够消除解析阻塞的 Javascript。解析阻塞的 Javascript 会导致浏览器必须加载并且执行脚本，之后才能继续解析。

浏览器在解析到带有 async 属性的 script 标签时，也不会阻塞页面，同样是在后台默默下载此脚本。当他下载完后，浏览器会暂停解析 HTML，立马执行此脚本。

**2 个小细节：**

Q1： 如果设置了 async 属性的 script 下载完之后，浏览器还没解析完 HTML，会怎样？

A1： 浏览器会暂停解析 HTML，立马执行此脚本，等执行完之后，再继续解析 HTML。

Q2： 如果有多个 async 属性的 script 标签，那等他们下载完成之后，会按照代码顺序执行吗？

A2： 不会。执行顺序是：谁先下载完成，谁先执行。async 的特点是「完全独立」，不依赖其他内容。

**最佳实践：**

当我们的项目，需要集成其他独立的第三方库时，可以使用此属性，他们不依赖我们，我们也不依赖于他们。
通过设置此属性，让浏览器异步下载并执行他，是个不错的优化方案。

**注意：**

async 特性仅适用于外部脚本，如果 script 脚本没有 src，则会忽略 async 特性。

## async 和 defer 总结

#### async

- 不阻塞浏览器解析 HTML，等解析完 HTML 之后，才会执行 script。
- 会并行下载 JavaScript 资源。
- 会按照 HTML 中的相对顺序执行脚本。
- 会在脚本下载并执行完成之后，才会触发 DOMContentLoaded 事件。
- 在脚本执行过程中，一定可以获取到 HTML 中已有的元素。
- defer 属性对模块脚本无效。
- 适用于：所有外部脚本（通过 src 引用的 script）

#### async

- 不阻塞浏览器解析 HTML，但是 script 下载完成后，会立即中断浏览器解析 HTML，并执行此 script。
- 会并行下载 JavaScript 资源。
- 互相独立，谁先下载完，谁先执行，没有固定的先后顺序，不可控。
- 由于没有确定的执行时机，所以在脚本里面可能会获取不到 HTML 中已有的元素。
- DOMContentLoaded 事件和 script 脚本无相关性，无法确定他们的先后顺序。
- 适用于：独立的第三方脚本。

#### 其他

async 的优先级比 defer 高，也就是如果同时存在这 2 个属性，那么浏览器将会以 async 的特性去加载此脚本。 分两种情况：

- 如果是「普通脚本」，浏览器会优先判断async属性是否存在，如果存在，则以async特性去加载此脚本，如果不存在，再去判断是否存在defer属性。

- 如果是「模块脚本」，浏览器会判断async属性是否存在：

  如果存在，浏览器会并行下载此模块和他的所有依赖模块，等全部下载完成之后，会立刻执行此脚本。

  如果不存在，浏览器也会并行下载此模块和他的所有依赖模块，然后等浏览器解析完 HTML 之后，再执行此脚本。

#### 图解

![script](/images/script.png)

## type=module

这个布尔属性被设置来标明这个脚本在支持 ES2015 modules 的浏览器中不执行。 — 实际上，这可用于在不支持模块化 JavaScript 的旧浏览器中提供回退脚本

## type=importmap

```html

<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.skypack.dev/dayjs@1.10.7",
  }
}


</script>
<script type="module">
    import dayjs from 'dayjs';

    console.log(dayjs('2019-01-25').format('YYYY-MM-DDTHH:mm:ssZ[Z]'));
</script>
```

## 参考链接

- [script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

- [type=“module“ 你了解，但 type=“importmap“ 你知道吗](https://blog.csdn.net/qq449245884/article/details/126133582)
