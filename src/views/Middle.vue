<!-- App.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import HeaderItem from '@/components/HeaderItem.vue'
import SideBarItem from '@/components/SideBarItem.vue'
import { useArticleStore } from '@/stores/article'
import image from '@/assets/bg.png'
import Starback from 'starback'

const articleStore = useArticleStore()
const windowWidth = ref(0);
const paddingX = ref(60);
const sidebarWidth = ref(300)
const isMobile = ref(false)

// 监听屏幕宽度，去修改windowWidth
window.onresize = () => {
  return (() => {
    windowWidth.value = document.body.clientWidth
  })()
}

watch(windowWidth, (newWidth) => {
  if (newWidth >= 1280) {
    sidebarWidth.value = 300;
    paddingX.value = 60;
  } else if (newWidth >= 768) {
    sidebarWidth.value = 200;
    paddingX.value = 20;
  } else if (newWidth >= 540) {
    sidebarWidth.value = 0;
    paddingX.value = 0;
  }
}, { immediate: true })

onMounted(async () => {
  try {
    await articleStore.fetchArticles()
  } catch (error) {
    console.error('Failed to fetch articles in ArticleItem.vue:', error)
  }
})
</script>

<template>
  <div class="w-100vw overflow-x-hidden" :style="{
    '--sidebar-width': sidebarWidth + 'px',
    '--padding-x': paddingX + 'px'
  }">
    <HeaderItem class="header-item" />
    
    <!-- <div class="mac-w-100% w-100% pt-120px md:px-20px xl:px-90px flex md:gap-3 xl:gap--50"> -->
    <div class="mac-w-100% w-100% pt-120px flex md:gap-3 xl:gap-30 2xl:gap-50 2xl:px-50px" style="transform: translate(0, 0, 0)">
      <!-- <div class="md:min-w-200px"></div> -->
      <SideBarItem class="w-300px" />
      <div class="sidebar-empty" :style="{ 
        width: sidebarWidth + 'px', 
        minWidth: sidebarWidth + 'px' }"
      ></div>
      <RouterView class="flex-1" />
    </div>
  </div>
</template>

<style lang="scss" scoped> 
  $sidebar-width: 300px;
  
  .header-item {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* 确保 header 在其他内容之上 */
    background-color: rgba(0, 0, 0, 0.8); /* 使用半透明背景 */
    padding: 15px;
  }

  .sidebar-empty {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 1280px) {
    $sidebar-width: 200px;
  }
</style>