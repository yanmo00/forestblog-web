<script setup>
import { ref } from 'vue'
import SearchResultItem from '@/components/SearchResultItem.vue';

const input = ref('')
const handleOpenArticle = (article) => {
    console.log(article)
    router.push({ name: 'article', params: { id: article.id } })
  }
</script>

<template>
  <div class="container">
    <Transition name="fade-slide" appear>
      <div class="content">
        <SearchResultItem class="search-result-item"/>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 60px;
    width: 100%;
    min-height: 100vh;
  }

  .content {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .search-result-item {
    position: relative;
    left: 3rem;
    top: 60rem;
    width: 100%;
    box-sizing: border-box;
    padding-top: 30rem;
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.6s ease-out;
    position: absolute;
    width: 100%;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>