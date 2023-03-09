---
title: canvas
---

# Canvas基本绘图API

## 获取绘制上下文

```javascript
// cvs为canvas元素
const ctx = cvs.getContext("2d");
// 之后使用上下文对象ctx完成后续绘图
```

- 所有的绘图都必须在上下文中完成
- 同一个canvas元素只能产生唯一的上下文
- 上下文类型可以是：
    - 2d：绘制2d图形
    - bitmaprenderer：绘制位图上下文
    - webgl：绘制3d的上下文，只在实现[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)版本 1(OpenGL ES 2.0) 的浏览器上可用
    - webgl2：绘制3d的上下文，只在实现 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 版本 2 (OpenGL ES 3.0) 的浏览器上可用

## Context2D绘图

通过`cvs.getContext('2d')`，

会产生一个`CanvasRenderingContext2D`对象，它里面包含非常多的绘图方法。

利用这些绘图方法，我们可以完成下列图形的绘制：

1. 直线

   有简易版的矩形API

2. 曲线

   有简易版的椭圆API

3. 文字

4. 图片

利用上面基本形状以及它们的组合，再配合它提供的各种样式设置，就可以完成任意二维图像的绘制。

完整的API：https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#reference

中文版：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D

## requestAnimationFrame

它是一个浏览器的宏任务

requestAnimationFrame的用法与settimeout很相似，只是不需要设置时间间隔而已。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行

#### requestAnimationFrame特点

【1】requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，如果系统绘制率是 60Hz，那么回调函数就会16.7ms再 被执行一次，如果绘制频率是75Hz，那么这个间隔时间就变成了 1000/75=13.3ms。换句话说就是，requestAnimationFrame的执行步伐跟着系统的绘制频率走。它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

【2】在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量

【3】requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

#### 跟setTimeout和setInterva的对比

setTimeout和setInterval的问题是，它们都不精确。它们的内在运行机制决定了时间间隔，参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行

requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果

#### 应用场景

- 监听 scroll 函数
- 大量数据渲染
- 监控卡顿方法
- 动画

<script setup>
import TheCanvas from './components/TheCanvas.vue'
</script>

<TheCanvas />
