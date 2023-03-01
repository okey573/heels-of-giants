---
title: 数组和链表
outline: [2,6]
---

# 数组和链表

## 链表

### 反转单链表

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
