---
title: plugin
outline: [2,6]
---

一些自定义插件

## 修改 `index.html` 文件名插件
```javascript
const renameIndexPlugin = (newFilename) => {
  if (!newFilename) return
  return {
    name: 'renameIndex',
    enforce: 'post',
    generateBundle (options, bundle) {
      const indexHtml = bundle['index.html']
      indexHtml.fileName = newFilename
    },
  }
}
```
