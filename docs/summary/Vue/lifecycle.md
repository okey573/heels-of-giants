---
title: 生命周期
---
vue 实例从创建到销毁的过程，具体来说就是 vue 实例从开始创建、初始化数据、编译模板、挂载 Dom、渲染数据、更新数据、最后销毁这样的一个过程

## vue2 生命周期

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. activated(keep-alive组件特有)
8. deactivated(keep-alive组件特有)
9. beforeDestroy
10. destroyed
11. errorCaptured(2.5.0+ 新增)

![生命周期](/images/vue2_lifecycle.png)

## vue3 生命周期

vue3 的生命周期，在使用时，区分选项式和组合式

#### 选项式

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. beforeUnmount
8. unmounted
9. errorCaptured
10. renderTracked(dev only)
11. renderTriggered(dev only)
12. activated(keep-alive组件特有)
13. deactivated(keep-alive组件特有)
14. serverPrefetch(ssr only 当组件实例在服务器上被渲染之前要完成的异步函数)

#### 组合式

0. setup(beforeCreate & created)
1. onBeforeMount
2. onMounted
3. onBeforeUpdate
4. onUpdated
5. onBeforeUnmount
6. onUnmounted
7. onErrorCaptured
8. onRenderTracked(dev only)
9. onRenderTriggered(dev only)
10. onActivated(keep-alive组件特有)
11. onDeactivated(keep-alive组件特有)
12. onServerPrefetch(ssr only 当组件实例在服务器上被渲染之前要完成的异步函数)

![生命周期](/images/vue3_lifecycle.png)

## 父子组件生命周期执行顺序

#### 挂载阶段

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

#### 更新阶段

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

#### 销毁阶段

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

规律就是：父组件先开始执行，然后等到子组件执行完，父组件收尾。
