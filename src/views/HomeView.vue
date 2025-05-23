<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import { ref } from 'vue'
import SideBarItem from '../components/SideBarItem.vue';
import ArticleItem from '../components/ArticleItem.vue';

const input = ref('')

</script>

<template>
  <div class="container">
    <Transition name="fade-slide" appear>
      <div class="content">
        <ArticleItem class="article-item"/>
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
    width: 100%;
    margin-left: 18rem;
    min-height: 100vh;
  }
  @media (min-width: 1280px) {
    .container {
      margin-top: 60rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      margin-left: -5rem;
      width: 250px;
      padding-top: 40px;
    }

    .article-item {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      padding-top: 0.5rem;
    }

    :deep(.article-list) {
      max-width: 100%;
      margin: 0;
      padding: 0 0.5rem;
      
      .article-item {
        padding: 1rem;
        margin-top: 0.75rem;
        
        .title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .content {
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          -webkit-line-clamp: 2;
        }

        .author {
          font-size: 0.75rem;
        }
      }
    }
  }

  .content {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .article-item {
    position: relative;
    left: 3rem;
    width: 70%;
    height: 60%;
    margin-left: 3rem;
    box-sizing: border-box;
  }

  // 修改动画
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