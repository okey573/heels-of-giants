---
title: diff 算法
outline: [2,6]
---

# vue 的 diff算法

> diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。

换句话说就是

> diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁

## 两个特点

- 比较只会在同层级进行, 不会跨层级比较
- 在diff比较的过程中，循环从两边向中间比较

## diff算法流程图

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。

![生命周期](/images/diff-process.png)

## 具体分析

### patch

```javascript
function patch (oldVnode, vnode) {
  // some code
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  } else {
    const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
    let parentEle = api.parentNode(oEl)  // 父元素
    createEle(vnode)  // 根据Vnode生成新元素
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
      oldVnode = null
    }
  }
  // some code 
  return vnode
}
```

patch函数接收两个参数oldVnode和Vnode分别代表新的节点和之前的旧节点

- 判断两节点是否值得比较，值得比较则执行patchVnode

```javascript
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

- 不值得比较则用Vnode替换oldVnode。如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。

  虽然这两个节点不一样但是他们的子节点一样怎么办？别忘了，diff可是逐层比较的，如果第一层不一样那么就不会继续深入比较第二层了。（我在想这算是一个缺点吗？相同子节点不能重复利用了...）

### patchVnode

当我们确定两个节点值得比较之后我们会对两个节点指定patchVnode方法

```javascript
function patchVnode (oldVnode, vnode) {
  const el = vnode.el = oldVnode.el
  let i, oldCh = oldVnode.children, ch = vnode.children
  if (oldVnode === vnode) return
  if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
    api.setTextContent(el, vnode.text)
  } else {
    updateEle(el, vnode, oldVnode)
    if (oldCh && ch && oldCh !== ch) {
      updateChildren(el, oldCh, ch)
    } else if (ch) {
      createEle(vnode) //create el's children dom
    } else if (oldCh) {
      api.removeChildren(el)
    }
  }
}
```

这个函数做了以下事情：

- 找到对应的真实dom，称为el
- 判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
- 如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
- 如果oldVnode有子节点而Vnode没有，则删除el的子节点
- 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
- 如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要

### updateChildren

#### vue2 的 双端交叉指针

这个函数做了如下的事：

- 将 newChildren 和 oldChildren 提取出来(下面简称 new 和 old)
- new 和 old 各设置 start 和 end 两组两个指针，共四个指针（双端交叉指针）
- 两组指针交叉比较，共有四种比较方式
- 如果找到相同节点则两个匹配到的节点都往中间靠拢，把匹配到的节点放到结果数组中
- 如果四次比较都没有匹配到，则会遍历 old 和 new 的第一个元素比较，然后找到对应的匹配节点，把这个节点移动到 当前 old 的前面，然后把它原本的位置设置成 undefined 后面再遇到 undefined 就跳过。然后重新开始判断移动
- 再如果上面的遍历 old 都没找到匹配的元素，那就说明 new 的第一个元素是新的，直接添加就行了
- 一旦 start > end 表明 new 和 old 至少有一个已经遍历完了，就会结束比较
- 如果 new 没有剩余节点了，则匹配结束
- 如果 old 没有剩余节点了，则剩余的 new 节点插入

#### vue3 的双端快速 diff

这个函数做的事情：

- 将 newChildren 和 oldChildren 提取出来(下面简称 new 和 old)
- new 和 old 各设置 start 和 end 两组两个指针，共四个指针
- 从头部开始遍历，判断 new 的头部和 old 的头部，遇到相同节点则继续，下标 + 1，不同节点则跳出循环
- 从尾部开始遍历，遇到相同节点则继续，length - 1，不同节点则跳出循环
- 如果旧节点已遍历完毕，并且新节点还有剩余，则遍历剩下的进行新增
- 如果新节点已经遍历完毕，则说明多余的节点需要卸载
- 新旧节点都没有遍历完成的情况就有点麻烦，这里涉及到最长递增子序列。用下标找到不需要改动的 old 节点然后复用

vue2 的算法复杂度是 o(n) vue3 的 复杂度是 o(n*Logn) 出发点是减少 dom 的移动, 用 js 消耗换浏览器渲染性能 是值得的

减少 dom 的移动, js 消耗换浏览器渲染性能 是值得的

## 参考链接

- [Vue 3 Virtual Dom Diff源码阅读](https://segmentfault.com/a/1190000038654183?utm_source=sf-backlinks)
