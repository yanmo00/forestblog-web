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
})
</script>

<template>
  <HeaderItem class="header-item" />
  <div class="w-100vw pt-120px px-90px flex gap--50">
    <SideBarItem class="w-300px" />
    <RouterView class="flex-1" />
  </div>
</template>

<style lang="scss" scoped> 
  .header-item {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* 确保 header 在其他内容之上 */
    background-color: rgba(0, 0, 0, 0.8); /* 使用半透明背景 */
    padding: 15px;
  }
  
  .w-100vw {
    width: 100vw;
  }

  .pt-120px {
    padding-top: 120px;
  }

  .px-90px {
    padding-left: 90px;
    padding-right: 90px;
  }

  .flex {
    display: flex;
  }

  .gap--50 {
    gap: 50px;
  }

  .w-300px {
    width: 300px;
  }

  .flex-1 {
    flex: 1;
  }
  
  @media (max-width: 768px) {
    .w-100vw {
      width: 100%;
    }

    .pt-120px {
      padding-top: 80px;
    }

    .px-90px {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .gap--50 {
      gap: 1rem;
    }

    .w-300px {
      display: none;
    }

    .flex-1 {
      width: 100%;
    }
  }
</style>