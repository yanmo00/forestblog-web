<script setup>
  import { ref, onMounted } from 'vue'
  import { marked } from 'marked';
  import { useArticleStore } from '@/stores/article'
  import router from '@/router';

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
    <div v-for="(article, index) in articleStore.articlesWithSearch" :key="article.id" class="article-item" @click="handleOpenArticle(article)">
      <router-link 
        class="title" 
        :to="{ name: 'article', params: { id: article.id } }"
      >{{ article.title }}</router-link>
      <div class="content" v-html="parseMarkdown(article.content)"></div>
      <div class="meta-info">
        <span class="author">
          <el-icon><User /></el-icon>
          {{ article.author }}
        </span>
        <span class="date">
          <el-icon><Calendar /></el-icon>
          {{ formatDate(article.publishdate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>  
  .article-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-left: 5rem;
    
    .article-item {
      padding: 1.5rem;
      background: var(--bg-dark);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
      transition: var(--transition-base);
      cursor: pointer;
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
        transform: translateX(8px);
        border-color: var(--border-hover);
        box-shadow: var(--shadow-md);

        &::before {
          opacity: 1;
        }

        .title {
          color: var(--primary-color);
        }
      }

      .title {
        font-size: 1.4rem;
        color: var(--text-primary);
        font-weight: 600;
        margin-bottom: 1rem;
        display: block;
        transition: var(--transition-base);
        line-height: 1.4;
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
      }

      .meta-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--text-secondary);
        font-size: 0.9rem;

        .author, .date {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .el-icon {
            font-size: 1.1em;
            color: var(--primary-color);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .article-list {
      margin-left: 0;
      padding: 0 1rem;
      gap: 1rem;
      
      .article-item {
        padding: 1.25rem;
        margin: 0;

        .title {
          font-size: 1.25rem;
        }

        .content {
          font-size: 0.9rem;
        }
      }
    }
  }
</style>
