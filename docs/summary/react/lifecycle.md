---
title: 生命周期
lastUpdated: Wed May 08 2024 10:27:38 GMT+0800 (中国标准时间)
---

# 生命周期

生命周期一般分为四个阶段：挂载阶段、更新阶段、卸载阶段、错误处理

## 旧的生命周期

![生命周期](/images/react_lifecycle_old.png)

### 挂载阶段

- constructor
- componentWillMount
- render
- componentDidMount

### 更新阶段

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### 卸载阶段

- componentWillUnmount

### 错误处理

- getDerivedStateFromError
- componentDidCatch

## 新的生命周期

![新生命周期](/images/react_lifecycle_new.png)

### 挂载阶段

- constructor
- getDerivedStateFromProps
- render
- componentDidMount

### 更新阶段

- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

### 卸载阶段

- componentWillUnmount

### 卸载阶段

- componentWillUnmount
- componentDidCatch

## 新旧对比

::: code-group

```diff [挂载]
constructor
- componentWillMount
+ getDevicdeStatFromProp
render
componentDidMount
```

```diff [更新]
- componentWillReceiveProps
+ getDevicdeStatFromProp
shouldComponentUpdate
- componentWillUpdate
render
+ getSnapshotBeforeUpdate
componentDidUpdate
```

```diff [卸载]
componentWillUnmount
```

```diff [错误处理]
getDerivedStateFromError
componentDidCatch
```

:::

## hook 和生命周期的等价写法

|         class 组件         |       Hooks 组件        |
|:------------------------:|:---------------------:|
|       constructor        |       useState        |
| getDerivedStateFromProps | useState 里面 update 函数 |
|  shouldComponentUpdate   |        useMemo        |
|          render          |         函数本身          |
|    componentDidMount     |       useEffect       |
|    componentDidUpdate    |       useEffect       |
|   componentWillUnmount   |  useEffect  里面返回的函数   |
|    componentDidCatch     |           无           |
| getDerivedStateFromError |           无           |

## 参考链接

- [React.Component](https://zh-hans.legacy.reactjs.org/docs/react-component.html)

- [深入详解React生命周期](https://juejin.cn/post/6914112105964634119)

- [重新认识 React 生命周期](https://blog.hhking.cn/2018/09/18/react-lifecycle-change/)

- [Hooks 与 React 生命周期的关系](https://juejin.cn/post/6844903901620092941)
