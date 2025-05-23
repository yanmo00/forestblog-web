<!-- App.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import HeaderItem from '@/components/HeaderItem.vue'
import SideBarItem from '@/components/SideBarItem.vue'
import { useArticleStore } from '@/stores/article'
import image from '@/assets/bg.png'
import Starback from 'starback'

const articleStore = useArticleStore()
const route = useRoute()
const router = useRouter()
const isWelcome = computed(() => route.path === '/' || route.path === '')

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

const handleEnter = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <section id="hero">
    <canvas id="canvas"></canvas>
  </section>
  <Transition name="welcome">
    <div class="welcome-container" v-if="isWelcome">
      <h1 class="welcome-text">欢迎来到我的Blog</h1>
      <button class="enter-button" @click="handleEnter">
        进入首页
      </button>
    </div>
  </Transition>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
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
  .welcome-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
  }

  .welcome-text {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    animation: fadeInDown 1s ease-out;
  }

  .enter-button {
    padding: 12px 24px;
    font-size: 1.2rem;
    background: transparent;
    border: 2px solid #fff;
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeInUp 1s ease-out 0.5s backwards;

    &:hover {
      background: #fff;
      color: #000;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
    }
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

  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  
  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // 欢迎页面的进入和离开动画
  .welcome-enter-active,
  .welcome-leave-active {
    transition: all 0.5s ease;
  }

  .welcome-enter-from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }

  .welcome-leave-to {
    opacity: 0;
    transform: translate(-50%, -60%);
  }

  .welcome-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
  }
</style>

<style>
:root {
  --primary-color: #409EFF;
  --primary-hover: #66b1ff;
  --bg-dark: rgba(0, 0, 0, 0.85);
  --bg-darker: rgba(0, 0, 0, 0.95);
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border-color: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(255, 255, 255, 0.2);
  --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --shadow-sm: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.2);
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: var(--text-primary);
  min-height: 100vh;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-dark);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
  transition: var(--transition-base);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-hover);
}

/* 全局过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 全局卡片样式 */
.card {
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  transition: var(--transition-base);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-hover);
}

/* 全局链接样式 */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition-base);
}

a:hover {
  color: var(--primary-hover);
}

/* 全局按钮样式 */
.el-button {
  transition: var(--transition-base) !important;
}

.el-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 全局输入框样式 */
.el-input__inner {
  background: var(--bg-darker) !important;
  border-color: var(--border-color) !important;
  color: var(--text-primary) !important;
  transition: var(--transition-base) !important;
}

.el-input__inner:focus {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important;
}

/* 全局标签页样式 */
.el-tabs__item {
  color: var(--text-secondary) !important;
  transition: var(--transition-base) !important;
}

.el-tabs__item.is-active {
  color: var(--primary-color) !important;
}

.el-tabs__active-bar {
  background-color: var(--primary-color) !important;
}
</style>