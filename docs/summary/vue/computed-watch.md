---
title: computed 和 watch
---

# computed 和 watch

## computed 和 watch 的区别

#### computed

- 是计算值
- 需要主动调用
- 不支持异步
- 不应该具有副作用（改变程序里的状态）
- 具有缓存能力只有数据再次改变才会重新渲染，否则就会直接拿取缓存中的数据。

#### watch

- 是观察的动作
- 不需要主动调用
- 支持异步
- 可以具有副作用
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据。可以配合computed使用。完成异步或同步任务

## watch和watchEffect

|     对比      |        是否惰性        |         参数         |              获得值              |
|:-----------:|:------------------:|:------------------:|:-----------------------------:|
|    watch    | 有惰性，数值再次改变后执行监听函数  |     可以侦听多个数据的变     |         参数可以拿到当前值和原始值         |
| watchEffect |  立即执行没有惰性，至少会执行一次  | 不需要传递侦听内容，自动感知代码依赖 | 不需要传递到很多参数，不能获取原始值，返回一个stop函数 |