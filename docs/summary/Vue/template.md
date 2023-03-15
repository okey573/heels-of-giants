---
title: template
---

# vue 的 template

## vue 的编译流程

1. 通过 html-parser 将 template 解析成 ast抽象语法树
2. 通过 optimize 优化 ast 并标记静态节点和静态根节点
3. 通过 generate 将 ast 抽象语法树编译成 render 字符串并将静态部分放到 staticRenderFns 中，最后通过 new Function(render) 生成 render 函数
4. 在 beforeMount 和 mounted 之间执行 render 函数生成 VNode，然后通过 patch(VNode) 生成 dom 树并挂载，调用 mounted

## 和 render 函数的联系和区别

- render 函数跟 template 一样都是创建 html 模板
- render 的性能较高，template 性能较低。因为没有编译过程
- render 优先级高于 template

