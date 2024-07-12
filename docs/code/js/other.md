---
title: 其他
lastUpdated: 2024/07/12 19:40:00 GMT+0800 (中国标准时间)
---

# 其他一些零碎的代码

## 用二进制实现自由组合的类型

```javascript
/**
 * 先用二进制数字定义所有的类型
 */
const TYPE_1 = 0b00001
const TYPE_2 = 0b00010
const TYPE_3 = 0b00100
const TYPE_4 = 0b01000
const TYPE_5 = 0b10000


/** 组合类型 */
const unionTypes = (...types) => {
  return types.reduce((previous, current) => previous | current, 0b0)
}

/** 移除类型 */
const removeTypes = (originType, ...deletedTypes) => {
  return deletedTypes.reduce((previous, current) => previous & ~current, originType)
}

/** 判断 originType 中是否存在 targetType 类型 */
const hasType = (originType, targetType) => {
  return (originType & targetType) === targetType
}

/** 判断 originType 中是否存在 targetTypes 中的任一类型 */
const hasAnyTypes = (originType, ...targetTypes) => {
  return targetTypes.some(targetType => hasType(originType, targetType))
}

/** 判断 originType 中是否存在 targetTypes 中的所有类型 */
const hasAllTypes = (originType, ...targetTypes) => {
  return targetTypes.every(targetType => hasType(originType, targetType))
}

const unionType1 = unionTypes(TYPE_1, TYPE_2)
const unionType2 = unionTypes(TYPE_1, TYPE_3, TYPE_4, TYPE_5)
const unionType3 = removeTypes(unionType2, TYPE_4)

// expect: 00011
console.log('unionType1 =', unionType1.toString(2).padStart(5, 0))

// expect: 11101
console.log('unionType2 =', unionType2.toString(2).padStart(5, 0))

// expect: 10101
console.log('unionType3 =', unionType3.toString(2).padStart(5, 0))

// expect: true
console.log('unionType3 has TYPE_5 ?', hasType(unionType3, TYPE_5))

// expect: true
console.log('unionType3 hasAnyTypes TYPE_5 & TYPE_3 & TYPE_1 ?', hasAnyTypes(unionType3, TYPE_5, TYPE_3, TYPE_2))

// expect: false
console.log('unionType3 hasAllTypes TYPE_5 & TYPE_3 & TYPE_1 ?', hasAllTypes(unionType3, TYPE_5, TYPE_3, TYPE_1, TYPE_2))
```
