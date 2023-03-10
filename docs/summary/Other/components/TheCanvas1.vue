<template>
  <div class="wrapper">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { Graph } from './utils'

  const canvasRef = ref()

  onMounted(() => {
    const cvs = canvasRef.value
    const ctx = cvs.getContext('2d')
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight
    const graph = new Graph(cvs, ctx)
    graph.draw()
  })
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 400px;
    margin-top: 20px;

  }

  canvas {
    width: 100%;
    height: 100%;
    background-color: #000;
  }
</style>