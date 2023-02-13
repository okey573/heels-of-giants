---
title: JS代码片段
outline: [2,6]
---

正则表达式相关

## 提取文本中的url链接
```javascript
'text'.match(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g)
```
