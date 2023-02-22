---
title: 实现在vue中用decorator处理函数
---

在vue中使用装饰器

装饰器一般用在class上的，但是vue没有原生支持class-component。就算要用也是采用由vue-class-component提供的Class API。
而且es装饰器的提案直到2022年才到stage3。
诸多原因导致在vue中使用装饰器并没有流行起来。

下面是之前在微信小程序里实现的用于method的装饰器，依赖于`transform-decorators-legacy`这个插件。
并且，理论上这种用法应该只能用在vue的选项式api, setup应该不能直接用（后面有时间再验证）


```javascript
/**
 * 类方法修饰器-防抖
 *
 * 说明：作用于方法上，避免段时间内重复被调用执行
 *
 * 用法:
 * @debounce() | @debounce(1000)
 * submit () {
 *   ...
 * }
 *
 * @author 旷锐锋
 * @date 2020/01/15 09:20
 * @param wait 等待时间
 */
export function debounce (wait = 500) {
  return function (target, name, descriptor) {
    const method = descriptor.value
    let last = 0
    descriptor.value = function (...args) {
      let now = +new Date()
      const context = this
      if (now - last >= wait) {
        method.apply(context, args)
        last = now
      }
    }
  }
}

/**
 * 类方法修饰器-执行一次
 *
 * 说明：作用于方法上，该方法只会执行一次
 *
 * 用法:
 * @once
 * submit () {
 *   ...
 * }
 *
 * @author 旷锐锋
 * @date 2020/01/15 09:20
 */
export function once (target, name, descriptor) {
  let called = false
  const method = descriptor.value
  descriptor.value = function (...args) {
    const context = this
    if (!called) {
      method.apply(context, args)
      called = true
    }
  }
}

/**
 * 类方法修饰器-记录方法执行日志
 *
 * 说明：自动补充方法执行开始和执行结束日志
 * 若执行中出错，将捕获错误，并记录下为error等级的日志
 * 此修饰器会把方法改造为async方法
 *
 * 用法:
 * @log
 * submit (param) {
 *   ...
 * }
 *
 * @author 旷锐锋
 * @date 2020/01/15 09:20
 */
export function log (target, name, descriptor) {
  const method = descriptor.value
  // 这里不能使用箭头函数, 会在执行环境中丢失正确的this指向
  descriptor.value = async function (...args) {
    try {
      this.$logger.info(`Method '${name}' start execution at ${new Date()}`, `parameters: ${JSON.stringify(args)}`)
      const result = await method.apply(this, args)
      this.$logger.info(`Method '${name}' end of execution at ${new Date()}`)
      return result
    } catch (e) {
      this.$logger.error(`An exception occurred during method '${name}' execution`, e)
    }
  }
}

/**
 * 类方法修饰器-确认执行对话框
 *
 * 说明：在方法执行前，弹出对话框，若点击确认则继续执行，若点击取消则取消执行
 *
 * 用法:
 * @confirm('提示', '确认删除吗?')
 * deleteFn () {
 *   ...
 * }
 *
 * @author 旷锐锋
 * @date 2020/01/15 09:20
 * @param title 对话框title
 * @param content 对话框content
 */
export function confirm (title, content) {
  return function (target, name, descriptor) {
    const method = descriptor.value
    descriptor.value = function (...args) {
      const context = this
      wx.showModal({
        title,
        content,
        success (res) {
          if (res.confirm) {
            method.apply(context, args)
          }
        }
      })
    }
  }
}

```
