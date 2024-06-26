---
title: 数据结构
lastUpdated: Thu May 30 2024 10:29:35 GMT+0800 (中国标准时间)
---

# 数据结构

- 数组与链表：单 / 双向链表、跳舞链
- 栈与队列
- 树与图：最近公共祖先、并查集
- 哈希表
- 堆：大 / 小根堆、可并堆
- 字符串：字典树、后缀树

## 区间数组

- 和并两个区间数组，一共有6种可能情况。经排序后，可合并成3种情况
- 合并多个区间，可排序后两两合并

### 例题

[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/merge-intervals/description/)

### 参考题解

[吃🐳！🤷‍♀️竟然一眼秒懂合并区间！](https://leetcode.cn/problems/merge-intervals/solutions/204805/chi-jing-ran-yi-yan-miao-dong-by-sweetiee/?envType=study-plan-v2&envId=top-100-liked)

## 二叉树

- 二叉树的遍历
    - 先序遍历： 先访问根节点，然后访问左子树， 最后访问右子树
    - 中序遍历： 先访问左子树，然后访问根节点， 最后访问右子树
    - 后序遍历： 先访问左子树，然后访问右子树， 最后访问根节点
- 二叉树的很多问题基本都是用递归解决的
- 满二叉树 > 完全二叉树
- 前缀树 Trie树，即字典，又称单词查找树或键树，是一种树形结构，是一种哈希树的变种。
    - 典型应用是用于统计和排序大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。
    - 优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较

## 链表

- 相交链表 消除步差 [判断链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists/solutions/10774/tu-jie-xiang-jiao-lian-biao-by-user7208t/)

- 用一个 Map 递归深拷贝带有随机指针的链表

### 例题

[138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/description/)
