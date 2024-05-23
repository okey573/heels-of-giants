---
title: 算法
lastUpdated: Sun May 12 2024 13:13:52 GMT+0800 (中国标准时间)
---

# 算法

- 排序算法：快速排序、归并排序、计数排序
- 搜索算法：回溯、递归、剪枝技巧
- 图论：最短路、最小生成树、网络流建模
- 动态规划：背包问题、最长子序列、计数问题
- 基础技巧：分治、倍增、二分、贪心

## 滑动窗口

- 滑动窗口初始化完成以后，滑动时只需要更新窗口的第一个元素和最后一个元素
- 滑动窗口的遍历条件：startIndex = 0; startIndex <= arrayLength - windowSize; startIndex++

### 例题

[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/)

## 动态规划

- 动态规划的重点是找出转移方程
- 有时候 dp 的条件不一定要完全满足题目的要求，最终的结果也可以通过最后的 dp 数组再经过一些计算得到

### 例题

[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray)

## 前缀和

- 一维前缀和就是一个简单的 dp: dp[i] = dp[i - 1] + dp[i - 2]
- 二维前缀和 dp[x, y] = dp[x - 1, y] + dp[x, y - 1] - dp[x - 1, y - 1] + grip[x, y]

## 背包问题

- 0-1 背包一般可以使用动态规划解决 `dp[i][j]`是二维数组 表示从0到i的物品，背包容量为0到j的最大容量
- 初始化时分别对 i=0 和 j=0 的两种情况初始化
- 状态转移也分两种情况，`nums[i]` 大于 容量 `j`； `nums[i]` 小于等于 容量 `j`

### 例题

[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/description/)

## 回溯

- 寻找所有可行解的题，都可以尝试用「搜索回溯」的方法来解决 (dfs)

### 例题

[39. 组合总和](https://leetcode.cn/problems/combination-sum/description)

## 二分查找

- 中点算法 `low + Math.floor((high - low) / 2)`
- 复杂的条件，可以拆分成不同条件的多次二分查找。最终时间复杂度仍然为间复杂度为 O(log n)
