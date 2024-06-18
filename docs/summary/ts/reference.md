---
title: 参考
lastUpdated: 2024/6/18 19:44:18 GMT+0800 (中国标准时间)
---

# REFERENCE

## 基础

- `&` 交叉类型

```typescript
type a = b & c

// 可以理解成 `a` 这个类型既是 `b` 也是 `c`，所以会有 `b` 和 `c` 的全部属性
```

- `|` 联合类型

```typescript
type a = b | c

// 可以理解成 `a` 这个类型既可以是 `b` 也可以是 `c`，所以只会明确的有 `b` 和 `c` 的共有属性
```

- `keyof` 属性keys值

## Utility Types

- `Partial<T>` 让T类型中的所有属性可选
- `Required<T>` 让T类型中的所有属性必选
- `Readonly<T>` 让T类型中的所有属性只读
- `Pick<T, K extends keyof T>` 从T中，选K对应的一组属性
- `Record<K extends keyof any, T>` K对应一组属性，都赋予T对应的类型
- `Exclude<T, U>` 从T中剔除可以赋值给U的类型
- `Extract<T, U>` 提取T中可以赋值给U的类型
- `Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>`  从T中选取所有的属性值，然后移除属性名在K中的属性值
- `NonNullable<T>` 从T中剔除null和undefined
- `Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never`
- `ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never`
- `ReturnType<T>` 获取函数返回值类型。
- `InstanceType<T>` 获取构造函数类型的实例类型。
- `Uppercase<S extends string> = intrinsic`
- `Lowercase<S extends string> = intrinsic`
- `Capitalize<S extends string> = intrinsic`
- `Uncapitalize<S extends string> = intrinsic`
- `Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>`

## 其他

- `infer` TypeScript 中的一个类型推断关键字，用于从类型别名或泛型中提取类型信息。它通常与条件类型结合使用，允许在类型操作中进行更复杂的类型推断。
- `intrinsic` **一个内置关键字，还没搞懂**

## 参考链接

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
