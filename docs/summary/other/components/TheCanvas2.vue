<template>
    <div class="wrapper">
        <canvas ref="canvasRef" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref()

const randomChar = () => {
    const str = '0123456789qwertyuiopasdfghjklzxcvbnm'
    return str[Math.floor(Math.random() * 36)]
}
const draw = ({ cvs, ctx, fontSize, columnCount, charIndex }) => {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    ctx.fillStyle = '#6BE445'
    ctx.textBaseline = 'top'
    for (let i = 0; i < columnCount; i++) {
        const char = randomChar()
        const x = i * fontSize
        const y = charIndex[i] * fontSize
        ctx.fillText(char, x, y)
        if (y > cvs.height && Math.random() > 0.999) {
            charIndex[i] = 0
        } else {
            charIndex[i]++
        }
    }

}
onMounted(() => {
    const cvs = canvasRef.value
    const ctx = cvs.getContext('2d')
    cvs.width = cvs.clientWidth 
    cvs.height = cvs.clientHeight

    const fontSize = 10
    const font = `${fontSize}px "Roboto Mono"`
    ctx.font = font
    const columnCount = Math.floor(cvs.width / fontSize)
    const charIndex = new Array(columnCount).fill(0)

    const drawHandler = () => {
        requestAnimationFrame(drawHandler)
        draw({ cvs, ctx, fontSize, columnCount, charIndex })
    }
    drawHandler()
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
    background-color: #222;
}
</style>
  