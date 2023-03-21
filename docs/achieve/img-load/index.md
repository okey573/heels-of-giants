---
title: 实现一个图片加载的指令
---

# 实现一个 vue custom directive

作用： 用在 img 标签上， 可自动实现图片懒加载或者预加载

## 懒加载

#### 实现

```javascript
  const vLazy = {
  mounted (el, binding) {
    const lazy = binding.value
    if (!lazy) {
      el.src = el.dataset.src
      return
    }
    el.src = 'data:image/png;base64,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'
    const observer = new IntersectionObserver(entries => {
      const [imgEntry] = entries
      if (imgEntry.isIntersecting) {
        el.src = el.dataset.src
        observer.unobserve(el)
      }
    })
    observer.observe(el)
  }
}
```

#### 用法

```html
<img v-lazy="true" data-src="https://img0.baidu.com/it/u=2078471082,1063663748&fm=253&fmt=auto&app=138&f=JPEG">
```

## 预加载

严格意义上来说，没有“预”加载，如果需要的话需要提前收集图片信息。只是用 worker 开启了一个线程加载 👻👻    

#### 实现

// main.js

```javascript
const vPre = {
  mounted (el, binding) {
    el.src = 'data:image/png;base64,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'
    const worker = new Worker('src/directives/v-lazy/worker.js')
    worker.addEventListener('message', e => {
      el.src = el.dataset.src
    })
    worker.postMessage(el.dataset.src)
  }
}
```

// worker.js

```javascript
self.addEventListener('message', async e => {
  await fetch(e.data)
  self.postMessage('done')
})
```
