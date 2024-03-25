---
title: 面试总结
outline: [2,6]
hidden: true
---

# 面试中遇到的问题

## 算法类

#### 一道考察括号匹配的问题

::: details 题目
输入一个字符串，字符串包括数字、英文和英文括号，将该字符串反转，反转要求如下：

1. 英文左右括号内的内容连同左右括号当成一个整体处理，匹配的左右括号内无内容，将左右括号看成一个整体。
2. 左右括号必须成对匹配，且左右括号内不能存在无匹配的左括号或右括号， 方能看做一个整体，只要文字被左右括号包围，就可将左右括号和括号内的内容看成一个整体。
3. 左右括号内再包含匹配成功的左右括号，按照最外层括号看成整体。
4. 无匹配的左括号和右括号当成一个单一元素处理，和数字、英文处理逻辑一致。

**如**:
输入 abcd 返回dcba

输入 abcd(efg 返回 gfe(dcba

输入 abcd(efg) 返回 (efg)dcba

输入 如abc(efg(dfg)) 返回 (efg(dfg))cba （每个左右括号都有右括号匹配，按照最外层匹配括号看成一个整体）

输入 abc(efg(dfg)  返回(dfg)gfe(cba    (由于第一个左括号无右括号匹配)

输入 )abcd(  返回(dcba)    (由于第一个左括号无右括号匹配)
:::

::: details 答案

```javascript
function fn(str) {
    console.log('输入==>: ', str)
    const result = []
    const stack = []
    for (const s of str) {
        if ('(' === s) {
            stack.push(s)
        } else if (')' === s) {
            let tempS = ''
            while (stack.length) {
                const popS = stack.pop()
                if ('(' === popS) {
                    tempS = '(' + tempS + ')'
                    break
                }
                tempS = popS + tempS
            }
            if (tempS) {
                if (stack.length) {
                    stack.push(tempS)
                } else {
                    result.unshift(tempS)
                }
            } else {
                result.unshift(s)
            }
        } else {
            if (stack.length) {
                stack.push(s)
            } else {
                result.unshift(s)
            }
        }
    }
    console.log('输出==>: ', [...stack.reverse(), ...result].join(''), '\n')
}
```

:::

#### LC 31. 下一个排列

::: details 题目
[原题目链接](https://leetcode.cn/problems/next-permutation)

理解： 找几个数字排列组合后，大于它的数字中的最小值...
:::

::: details 答案

```typescript
function nextPermutation(nums: number[]): void {
    const swap = (nums, i, j) => {
        const temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }

    const reverse = (nums, start) => {
        let left = start
        let right = nums.length - 1
        while (left < right) {
            swap(nums, left, right)
            left++
            right--
        }
    }

    let i = nums.length - 2
    /**
     * step1: 找到数组中从右开始 [... a,b ...] 找到第一个 【a < b】 a 的位置
     */
    while (i >= 0) {
        if (nums[i] < nums[i + 1]) {
            break
        }
        i--
    }
    /**
     * step2:
     * 将上面step1找到的a的位置设为 i
     *
     * - 如果 i < 0 (也可能等于 -1)就说明 nums 是严格递减的数组， 它的下一个排列就是将它反转
     *
     * - 如果 i >= 0 进到step3
     */
    if (i < 0) {
        // 因为题目要求不返回，操作自身 所以要自身反转 不能直接nums.reverse()
        reverse(nums, i + 1)
    } else {
        /**
         * step3:
         * 找到 i 右边，最接近nums[i]且大于nums[i]的数字位置（也就是所有大于nums[i]中的最小的数字位置）
         * 因为上面找到i的逻辑是递减的，所以i后面的数组部分是严格递减的，所以从数组结尾开始往前遍历，第一个大于num[i]的数字就是我们要找的数字
         * 将上面找到的数字设为j
         */
        let j = nums.length - 1
        while (j >= 0 && nums[i] >= nums[j]) {
            j--
        }
        /**
         * step4:
         * 交换 i 和 j对应的数字
         */
        swap(nums, i, j)
        /**
         * step5:
         * 将 i 后面的数组部分按递增顺序排序就得到了结果
         */
        reverse(nums, i + 1)
    }
}
```

:::

## js 基础类

#### 执行上下文相关

::: details 题目
预测输出

```javascript
var b = 10;
(function b() {
    b = 20
    console.log(b)
})()
```

:::

::: details 答案

严格模式下会报错

非严格模式下会打印 `b` 这个 function

**解析：**

- IIFE 中有独立作用域
- 函数表达式标识符不可被修改（所以在 IIFE 中，给 b 赋值会报错，因为 b 已经是一个 function 了）

[**在JavaScript的立即执行的具名函数A内修改A的值时到底发生了什么？**](https://segmentfault.com/q/1010000002810093)

:::
