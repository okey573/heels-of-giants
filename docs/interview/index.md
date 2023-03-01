---
title: 面试总结
outline: [2,6]
---

# 面试中遇到的问题

## 工作中比较有成就感的事情

<details>
<summary><b>答案</b></summary>
<p>

- 工作一年独立负责前端
- 小程序（微信生态）
- 后端接口的缓存器（Redis实现）
- 参与后端接口优化（数据库层面）
- 升级 vue 版本，并制定相关规范， 搭建文档中心
- vite(create-vue) 还是 webpack(vue-cli) 打包 sdk
- 自定义 bpmn-js 的属性控制面板

</p>
</details>

## 优化

<details>
<summary><b>答案</b></summary>
<p>

有可量化的优化，也有很宏观的，主观的优化：

- 优化界面渲染速度，打包速度等等。这部分甚至可以从快慢属性说起，然后到做网络缓存之类的
- 开发效率工具，给团队赋能

</p>
</details>

## 遇到了哪些问题，如何解决？

<details>
<summary><b>答案</b></summary>
<p>

- NodeJS 环境中怎么获取某个npm包的最新版本？

  使用 fetch 查询 cdn 中的 packge.json 文件

- BPMN 自定义属性操作面板

  翻源码，用 react jsx， 模拟实现一个 plugin

- 开发 create-app 原本使用esm + esBuild 打包的架构，但是 esBuild 不能解析 `import.meta.url`

  还是改成了使用CommonJS

- cli 中判断 sdk 的版本实际只需要读取一个version文件就行，怎么避免把整个 repo clone 下来

  `git archive` 导出指定目录 zip 格式，然后解压

  ```javascript
  execute(`git archive -o ${tempZipSdkDir} --remote "${repo}" "${branch}" "${latestSdkPath}"`)
  await compressing.zip.uncompress(tempZipSdkDir, tempSdkDir)
  ```
  
</p>
</details>

## 最近新学到的内容？

<details>
<summary><b>答案</b></summary>
<p>

- scroll snap
- fast-glob
- Deno
- vmin
- 字符串的码点和码元
- WebContainer

</p>
</details>

## 算法类题目

#### 一道考察括号匹配的问题

<details>
<summary><b>题目</b></summary>
<p>

输入一个字符串，字符串包括数字、英文和英文括号，将该字符串反转，反转要求如下：

1. 英文左右括号内的内容连同左右括号当成一个整体处理，匹配的左右括号内无内容，将左右括号看成一个整体。
2. 左右括号必须成对匹配，且左右括号内不能存在无匹配的左括号或右括号， 方能看做一个整体，只要文字被左右括号包围，就可将左右括号和括号内的内容看成一个整体。
3. 左右括号内再包含匹配成功的左右括号，按照最外层括号看成整体。
4. 无匹配的左括号和右括号当成一个单一元素处理，和数字、英文处理逻辑一致。

**如**:
输入 abcd 返回dcba

输入 abcd(efg 返回 gfe(dcba

输入 abcd(efg) 返回 (efg)dcba

输入 如abc(efg(dfg)) 返回 (efg(dfg))cba （每个左右括号都有右括号匹配，按照最外层匹配括号看成一个整体）

输入 abc(efg(dfg)  返回(dfg)gfe(cba    (由于第一个左括号无右括号匹配)

输入 )abcd(  返回(dcba)    (由于第一个左括号无右括号匹配)


</p>
</details>

<details>
<summary><b>答案</b></summary>
<p>

```javascript
function fn (str) {
  console.log('输入==>: ', str)
  const result = []
  const stack = []
  for (const s of str) {
    if ('(' === s) {
      stack.push(s)
    } else if (')' === s) {
      let tempS = ''
      while (stack.length) {
        const popS = stack.pop()
        if ('(' === popS) {
          tempS = '(' + tempS + ')'
          break
        }
        tempS = popS + tempS
      }
      if (tempS) {
        if (stack.length) {
          stack.push(tempS)
        } else {
          result.unshift(tempS)
        }
      } else {
        result.unshift(s)
      }
    } else {
      if (stack.length) {
        stack.push(s)
      } else {
        result.unshift(s)
      }
    }
  }
  console.log('输出==>: ', [...stack.reverse(), ...result].join(''), '\n')
}
```

</p>
</details>
