<script setup>
  import { ref, onMounted } from 'vue'
  import { marked } from 'marked';
  import router from '@/router';
  import { useArticleStore } from '@/stores/article'

  const articleStore = useArticleStore();
  

  // 方法：格式化日期为年月日格式
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 定义一个方法来解析 markdown 内容
  const parseMarkdown = (content) => {
    return marked.parse(content || '');
  };

  const handleOpenArticle = (article) => {
    router.push({ name: 'article', params: { id: article.id } })
    console.log(article)
  }

</script>

<template>
  <div class="article-list">
    <div v-for="(article, index) in articleStore.articlesWithTags" :key="article.id" class="article-item" @click="handleOpenArticle(article)">
      <!-- <p class="title cursor-pointer" @click="handleOpenArticle(article)">{{ article.title }}</p> -->
      <router-link 
        class="title cursor-pointer" 
        :to="{ name: 'article', params: { id: article.id } }"
      >{{ article.title }}</router-link>
      <div class="content" v-html="parseMarkdown(article.content)"></div>
      <p class="author">作者: {{ article.author }}&nbsp;&nbsp;|&nbsp;&nbsp;发布日期: {{ formatDate(article.publishdate) }}</p>

    </div>
  </div>
</template>

<style lang="scss" scoped>  
  .article-list {
    // 100vw - padding - sideBarWidth - gap-15
    max-width: calc(100vw - 90px * 2 - 300px - 3.75rem);

    .article-item {
        // width:80rem;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 15px;
        margin-bottom: 15px;     
        // margin-left: 25rem;
        padding-left: 2rem;

        .title {
          font-size: 1.5rem;
          color: white;
        }

        .content {
            font-size: 0.75rem;
            color: #ccc;
            display: -webkit-box;
            -webkit-line-clamp: 3; /* 限制为三行 */
            -webkit-box-orient: vertical;
            line-clamp: 3; /* 标准属性 */
            overflow: hidden;
            text-overflow: ellipsis;
        }
      

        .author {
            font-size: 0.9rem;
            display: inline;
            color: #ccc;
        }
        .date {
            font-size: 0.9rem;
            display: inline;
            color: #ccc;
        }                                          
    }
  }
</style>
