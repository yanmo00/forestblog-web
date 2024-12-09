<script setup>
import { ref } from 'vue'
import SearchResultItem from '@/components/SearchResultItem.vue';

const input = ref('')

</script>

<template>
  <div class="container">
    <SearchResultItem class="search-result-item"/>
  </div>
</template>

<style lang="scss" scoped>

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 靠右对齐 */
    padding-top: 60px; /* 留出 header 的空间 */
  }


  .search-result-item {
    position: relative;
    left: 3rem;
    top: 60rem;
    width: 100%;
    box-sizing: border-box;
    padding-top: 30rem; /* 留出一些顶部空间 */
  }
</style>