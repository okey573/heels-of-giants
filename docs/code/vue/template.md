---
title: template
outline: [2,6]
lastUpdated: Sat May 11 2024 16:41:23 GMT+0800 (中国标准时间)
---

一些常用的模板

## 转发 slots

```vue

<script setup>
  import { omit } from 'lodash'
</script>

<template v-for="(slotValue, slotName, index) in omit($slots, 'default')" :key="index" v-slot:[slotName]="slotProps">
  <slot :name="slotName" v-bind="slotProps" />
  <slot />
</template>
```
