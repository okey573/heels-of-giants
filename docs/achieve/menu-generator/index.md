---
title: 实现VitePress自动生成菜单
---

**vite** 提供了 `import.meta.glob` ， 可以实现根据文件目录自动生成路由等，但 VitePress 却不支持。

了解后得知， `import.meta.glob` 是通过 **fast-glob** 实现的， 所以自己动手实现一个吧。

## 自动生成顶部导航

比如当前这篇文章是在顶部导航**👻 落地实现**这个菜单组下面的，对应的源文件都在是 achieve 这个目录下，所以读取这个目录下的所有md，然后获取到 **title** 作为菜单名就行了

```javascript
import fg from 'fast-glob'
import matter from 'gray-matter'

const achieveItems = fg.sync(['achieve/**/*.md'], { cwd: 'docs' }).map(file => {
  const { data } = matter.read('docs/' + file)
  return { text: '💪 ' + data.title, link: file }
})
```

## 自动生成sidebar菜单

做法就是
1. 读取docs下的一级目录（排除public, .vitepress, 以及上面的 achieve 等），下面称作**module**
2. 然后把每个 module 当做一个 tab， 先读取下面所有的md，然后通过 module 下的一级目录分组， 下面称作**group**
3. 每个group构造成items（按需转换成中文，否则就是文件夹名作为页面上的分组名）

```javascript
import fg from 'fast-glob'
import matter from 'gray-matter'

export default fg.sync([
  '*/',
  '!.vitepress/',
  '!achieve/',
  '!public/',
], {
  cwd: 'docs',
  onlyFiles: false,
  deep: 1,
  dot: true
}).reduce((previousValue, currentValue) => ({
  ...previousValue,
  [`/${currentValue}/`]: getItems(currentValue)
}), {})

function getItems (module) {
  // 这里的module就是 code summary 这些模块
  // 先获取module下的所有md， 排除模块下的index.md
  const files = fg.sync(['*/**/*.md'], { cwd: `docs/${module}` })
  // 根据第一级目录分组收纳
  const result = []
  for (const file of files) {
    const group = file.split('/')[0]
    const groupZh = translateGroup(group)
    const index = result.findIndex(res => res.text === groupZh)
    const { data } = matter.read(`docs/${module}/` + file)
    const item = { text: data.title, link: `/${module}/` + file }
    if (index > -1) {
      result[index].items.push(item)
    } else {
      result.push({
        text: groupZh,
        collapsible: true,
        items: [item]
      })
    }
  }
  return result
}

function translateGroup (group) {
  return ({
    'Algorithm': '算法',
    'Engineered': '工程化'
    // ...
  })[group] || group
}
```
