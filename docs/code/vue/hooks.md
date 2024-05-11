---
title: hooks
outline: [2,6]
lastUpdated: Sat May 11 2024 16:41:23 GMT+0800 (中国标准时间)
---

一些自定义 hooks

## useProxyModel

```javascript
/**
 * @description
 * 通常用在需要绑定的属性类型为 object，且子组件会直接操作修改该 object 的属性的情况 <br>
 * 为了保证单项数据流，通常不应该在子组件中直接修改父组件传递的 props <br>
 * 所以代理这个对象，属性修改时直接重新给整个对象赋值
 * <br>
 *
 * @param model {ModelRef}
 *
 * @example 定义
 * const model = defineModel({ type: Object, default: () => ({})})
 * const proxyModel = useProxyModel(model)
 *
 * @example 在模板中双向绑定
 * <input v-model="proxyModel.name">
 *
 * @example 在 js 代码中赋值
 * proxyModel.value.name = 'abc'
 * proxyModel.value.age = 18
 *
 * console.log(proxyModel.value)
 * // 输出: {}
 * // 这是因为将属性赋值操作改成了对象赋值，在 defineModel 的底层会相当于触发 emit 这个“异步事件”，由父组件修改 prop 完成赋值
 * // 所以紧接着打印 proxyModel.value 整个对象将为修改属性之前的值
 *
 * console.log(proxyModel.value.name)
 * // 输出: 'abc'
 * // 直接读取修改后的属性值会获得修改后的值，这是因为走到了 get 方法，读取到的实际是存在 snapshot 上的属性值
 *
 * @todo
 * 目前没有好办法解决上面异步赋值，导致不能通过同步代码及时读取到整个修改后的最新的对象的问题
 */
export default function (model) {
  return computed({
    get () {
      // 这里做一个快照，用来记录对 target 的 set 操作
      const snapshot = Object.create(null)
      return new Proxy(model.value, {
        set (target, prop, newValue) {
          /**
           * 这里先把新属性值，赋值到 snapshot 上，这样做的目的如下，考虑下面这一段代码：
           * proxyModel.value.key1 = '1'
           * proxyModel.value.key2 = '2'
           * 此时如果不使用 snapshot 直接这样使用 newValue 覆盖：
           * model.value = { ...target, [prop]:newValue }
           *
           * 当执行到给 key2 赋值时，由于上一次给 key1 赋值是基于 emit 的“异步”，此时 target 上还没有 key1 的值
           * 所以会导致最终结果只有 key2 的值也就是：
           * proxyModel.value 等于 { key2: '2' }
           */
          Reflect.set(snapshot, prop, newValue)
          model.value = {
            ...target,
            ...snapshot
          }
          return true
        },
        get (target, prop) {
          // 优先读取 snapshot 上的值
          if (Reflect.has(snapshot, prop)) {
            return Reflect.get(snapshot, prop)
          } else {
            return Reflect.get(target, prop)
          }
        }
      })
    },
    set (v) {
      model.value = v
    }
  })
}

```
