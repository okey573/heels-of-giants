---
title: 参考
lastUpdated: Thu May 09 2024 18:01:26 GMT+0800 (中国标准时间)
---

# REFERENCE

## 基础

- `&` 交叉类型
- `|` 联合类型
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

- `infer` **还没搞懂**
- `intrinsic` **一个内置关键字，还没搞懂**

## 参考链接

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
