---
title: 文件相关
outline: [2,6]
---

操作文件相关

## 删除文件目录

```javascript
import * as fs from 'node:fs'

export function deleteDir (path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      let curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
```
