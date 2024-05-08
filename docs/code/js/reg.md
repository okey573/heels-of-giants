---
title: 正则表达式
outline: [2,6]
lastUpdated: Wed May 08 2024 09:23:38 GMT+0800 (中国标准时间)
---

# 正则表达式相关

## 提取文本中的url链接

```javascript
'text'.match(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g)
```

## 整数数字千分位

```javascript
'1234567890'.replace(/\B(?=(\d{3})+$)/g, ',')
```
