<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import { ref } from 'vue'
import SideBarItem from '../components/SideBarItem.vue';
import ArticleItem from '../components/ArticleItem.vue';

const input = ref('')

</script>

<template>
  <div class="container">
    <HeaderItem class="header-item"/>
    <SideBarItem class="side-bar-item" />
    <ArticleItem class="article-item"/>
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

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 靠右对齐 */
    padding-top: 60px; /* 留出 header 的空间 */
  }

  .side-bar-item {
    position: fixed; /* 调整间距 */
    top: 13.5rem;
    left: 5rem;
  }

  .article-item {
    position: relative;
    left: 3rem;
    top: 60rem;
    width: 100%;
    box-sizing: border-box;
    padding-top: 30rem; /* 留出一些顶部空间 */
  }
</style>