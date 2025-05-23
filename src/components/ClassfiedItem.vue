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
  max-width: calc(100vw - 90px * 2 - 300px - 3.75rem);
  margin-right: 3rem;
  
  .article-item {
    padding: 1.75rem;
    background: var(--bg-dark);
    border-radius: var(--radius-lg);
    margin-top: 1.5rem;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    transition: var(--transition-base);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--primary-color);
      opacity: 0;
      transition: var(--transition-base);
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--border-hover);
      
      &::before {
        opacity: 1;
      }
      
      .title {
        color: var(--primary-color);
      }
    }

    .title {
      font-size: 1.5rem;
      color: var(--text-primary);
      font-weight: 600;
      margin-bottom: 1rem;
      display: block;
      transition: var(--transition-base);
      line-height: 1.4;
      
      &:hover {
        color: var(--primary-hover);
      }
    }

    .content {
      font-size: 0.95rem;
      color: var(--text-secondary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 1rem;
      line-height: 1.6;
      
      :deep(p) {
        margin: 0;
      }
      
      :deep(code) {
        background: var(--bg-darker);
        padding: 0.2rem 0.4rem;
        border-radius: var(--radius-sm);
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
      }
    }
  
    .author, .date {
      font-size: 0.85rem;
      display: inline-flex;
      align-items: center;
      color: var(--text-secondary);
      transition: var(--transition-base);
      
      .el-icon {
        margin-right: 0.5rem;
        font-size: 1.1em;
      }
    }
    
    .author {
      margin-right: 1rem;
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    .date {
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .article-list {
    max-width: 100%;
    margin: 1rem;
    
    .article-item {
      padding: 1.25rem;
      
      .title {
        font-size: 1.35rem;
      }
      
      .content {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
