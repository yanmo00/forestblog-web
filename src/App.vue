<script setup>
import { ref,onMounted } from 'vue'
import { RouterView } from 'vue-router';
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore();
const articles = ref([])
const input = ref('')
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

</script>

<template>
  <RouterLink to="/home" class="home">Home</RouterLink>
  <RouterView/>
  
</template>

<style lang="scss" scoped>



</style>