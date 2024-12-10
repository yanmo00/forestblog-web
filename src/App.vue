<!-- App.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderItem from '@/components/HeaderItem.vue'
import SideBarItem from '@/components/SideBarItem.vue'
import { useArticleStore } from '@/stores/article'
import image from '@/assets/bg.png'
import Starback from 'starback'

const articleStore = useArticleStore()

onMounted(async () => {
  try {
    await articleStore.fetchArticles()
  } catch (error) {
    console.error('Failed to fetch articles in ArticleItem.vue:', error)
  }

  const starback = new Starback("#canvas", {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    type: 'line',
    speed: 5,
    frequency: 100,
    slope: { x: -1, y: -1 },
    directionX: 0,
    speed: 10,
    spread: -10,
    randomOpacity: true,
    backgroundColor: ['#000000','#292a3a', '#536976','#000001','#000001'],
    quantity: 30,
  })

  let mountain = new Image()
  mountain.src = image

  mountain.onload = () => {
    starback.addToFront((ctx) => {
      ctx.drawImage(
        mountain,
        0,
        0,
        mountain.width,
        mountain.height,
        0,
        canvas.height - mountain.height,
        canvas.width,
        mountain.height
      )
    })
  }
})
</script>

<template>
  <section id="hero">
    <canvas id="canvas"></canvas>
  </section>
    <RouterView />
</template>

<style lang="scss" scoped>
  canvas {
    -webkit-transform: translate3d(10px, 10px, 2px);
    transform: translate3d(10px, 10px, 2px);
    -moz-transform: translate3d(0, 0, 0);
    z-index: -1;
    position: fixed; /* 确保 canvas 在其他内容之下 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
 

  .header-item {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* 确保 header 在其他内容之上 */
    background-color: rgba(0, 0, 0, 0.8); /* 使用半透明背景 */
    padding: 15px;
  }
</style>