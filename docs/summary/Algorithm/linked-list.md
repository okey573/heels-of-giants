---
title: 链表
---

一些链表类的算法

## 反转单链表

```javascript
function reserve (head) {
  if (!head) return head
  let p1 = head
  let p2
  while (p1) {
    const temp = p1.next
    p1.next = p2
    p2 = p1
    p1 = temp
  }
  return p2
}
```
