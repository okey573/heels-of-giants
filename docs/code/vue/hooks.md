---
title: hooks
outline: [2,6]
---

一些自定义 hooks

## useModelProxy

```javascript
import { computed } from 'vue'

/**
 * 通常用在需要绑定的属性类型为 object，且子组件会直接操作修改该 object 的属性的情况 <br>
 * 为了保证单项数据流，即：不能在子组件中直接修改父组件传递的 props <br>
 * 所以代理这个对象，属性修改时触发 emit update 事件， 由父组件完整属性修改
 */
export default function (props, propsKey, emits) {
  return computed({
    get () {
      return new Proxy(props[propsKey], {
        set (target, name, value) {
          emits(`update:${propsKey}`, {
            ...target,
            [name]: value
          })
          return true
        }
      })
    },
    set (value) {
      emits(`update:${propsKey}`, value)
    }
  })
}
```
