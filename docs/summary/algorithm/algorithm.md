---
title: 算法
lastUpdated: Thu May 09 2024 10:04:46 GMT+0800 (中国标准时间)
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
