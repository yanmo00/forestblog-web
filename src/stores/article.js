import { defineStore } from 'pinia'
import { queryArticleList } from '@/api/home'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
  }),
  actions: {
      // 获取文章列表
    async fetchArticles() {
      try {
        const { data } = await queryArticleList();
        this.articles = data;
        console.log('Fetched articles:', this.articles)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }
  }
})