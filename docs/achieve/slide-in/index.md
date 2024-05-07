---
title: 实现一个平滑上升的指令
lastUpdate: Tue May 07 2024 22:22:54 GMT+0800 (中国标准时间)
---

# 实现一个 vue custom directive

作用： 用在任意元素上，添加页面往上滑动时平滑上升的效果

## 实现

```typescript
import type { ObjectDirective } from 'vue'

const map = new WeakMap()
const intersectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target)
      animation?.play()
      intersectionObserver.unobserve(entry.target)
    }
  }
})

const isBelowViewport = (el) => {
  const rect = el.getBoundingClientRect()
  return rect.top - window.innerHeight > 0
}

const vSlideIn: ObjectDirective = {
  mounted(el) {
    if (!isBelowViewport(el)) return

    const animation = el.animate([{
      transform: `translateY(100px)`,
      opacity: 0.5
    }, {
      transform: `translateY(0)`,
      opacity: 1
    }], {
      duration: 500,
      ease: 'ease-out',
      fill: 'forwards'
    })
    animation.pause()

    intersectionObserver.observe(el)
    map.set(el, animation)
  },
  unmounted(el) {
    intersectionObserver.unobserve(el)
  }
}
```

## 用法

```html

<div v-for="item in 30" v-slide-in class="item" />
```

## 完整代码

```vue

<script setup lang="ts">
  import type { ObjectDirective } from 'vue'

  const map = new WeakMap()
  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const animation = map.get(entry.target)
        animation?.play()
        intersectionObserver.unobserve(entry.target)
      }
    }
  })

  const isBelowViewport = (el) => {
    const rect = el.getBoundingClientRect()
    return rect.top - window.innerHeight > 0
  }

  const vSlideIn: ObjectDirective = {
    mounted(el) {
      if (!isBelowViewport(el)) return

      const animation = el.animate([{
        transform: `translateY(100px)`,
        opacity: 0.5
      }, {
        transform: `translateY(0)`,
        opacity: 1
      }], {
        duration: 500,
        ease: 'ease-out',
        fill: 'forwards'
      })
      animation.pause()

      intersectionObserver.observe(el)
      map.set(el, animation)
    },
    unmounted(el) {
      intersectionObserver.unobserve(el)
    }
  }
</script>

<template>
  <div class="page">
    <div v-for="item in 30" v-slide-in class="item" />
  </div>
</template>

<style scoped lang="scss">
  @function random-color() {
    $random-red: random(255);
    $random-green: random(255);
    $random-blue: random(255);
    @return rgb($random-red, $random-green, $random-blue);
  }

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    height: 300px;
    width: 80%;
    margin-top: 50px;
  }

  @for $i from 1 through 30 {
    .item:nth-child(#{$i}) {
      background-color: random-color();
    }
  }

  .item:last-child {
    margin-bottom: 50px;
  }
</style>
```