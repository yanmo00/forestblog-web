<script setup>
import { ref,onMounted } from 'vue'
import { RouterView } from 'vue-router';
import HeaderItem from '@/components/HeaderItem.vue'
import SideBarItem from '@/components/SideBarItem.vue';
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore();
onMounted(async () => {
  try {
    await articleStore.fetchArticles()
    // console.log('Articles fetched successfully in ArticleItem.vue:', articleStore.articles)
    
  } catch (error) {
    console.error('Failed to fetch articles in ArticleItem.vue:', error)
  }
})

</script>

<template>
  <HeaderItem class="header-item"/>
  <div class="w-100vw pt-120px px-90px flex gap-15">
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
    background-color: #000; /* 添加背景颜色以覆盖内容 */
    padding: 15px;
    opacity: 80%;
  }


</style>