<script setup>
  import { ref, onMounted } from 'vue'
  import { marked } from 'marked';
  import { useArticleStore } from '@/stores/article'

  const articleStore = useArticleStore();
  const articles = ref([])
  
  onMounted(async () => {
  try {
    await articleStore.fetchArticles()
    console.log('Articles fetched successfully in ArticleItem.vue:', articleStore.articles)
    articles.value = articleStore.articles // 确保将数据赋值给 articles
    console.log(articles.value);
    
  } catch (error) {
    console.error('Failed to fetch articles in ArticleItem.vue:', error)
  }
})

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

</script>

<template>
  <div class="article-list">
    <div v-for="(article, index) in articles" :key="index" class="article-item">
      <p class="title">{{ article.title }}</p>
      <div class="content" v-html="parseMarkdown(article.content)"></div>
      <p class="author">作者: {{ article.author }}</p>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <p class="date">发布日期: {{ formatDate(article.publishdate) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>  
  .article-list {
    .article-item {
        // width:80rem;
        padding: 10px;
        background-color: #000000;
        border-radius: 15px;
        margin-bottom: 15px;     
        // margin-left: 25rem;
        opacity: 80%;
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
