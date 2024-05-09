---
title: type 和 interface
---

# type 和 interface

## interface 和 type 的继承和实现

- interface 继承 interface

```typescript
interface Person {
  name: string
}

interface Student extends Person {
  stuNo: number
}
```

- interface 继承 type

```typescript
type Person = {
  name: string
}

interface Student extends Person {
  stuNo: number
}
```

- type 继承 type

```typescript
type Person = {
  name: string
}
type Student = Person & {stuNo: number}
```

- type 继承 interface

```typescript
interface Person {
  name: string
}

type Student = Person & {stuNo: number}
```

- 类可以实现 interface 以及 type (除联合类型外)

## interface 和 type 的区别

- type 可以定义基本类型别名
- type 可以声明联合类型
- type 可以声明元组
- interface 声明合并：如果你多次声明一个同名的接口，TypeScript 会将它们合并到一个声明中，并将它们视为一个接口。这称为声明合并
- 索引签名问题

## 参考链接

- [详解TypeScript中type与interface的区别](https://www.jb51.net/article/243639.htm)
