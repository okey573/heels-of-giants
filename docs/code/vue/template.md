---
title: template
outline: [2,6]
lastUpdated: Tue May 28 2024 20:57:55 GMT+0800 (中国标准时间)
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
