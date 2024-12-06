import { defineStore } from 'pinia'
import { queryArticleByTag, queryArticleList } from '@/api/home'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    articlesWithTags: []
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
    },
    async fetchArticlesByTag(tags) {
      try {
        const { data } = await queryArticleByTag(tag);
        this.articlesWithTags = data;
        console.log('Fetched articles by tag:', this.articlesWithTags);
      } catch (error) {
        console.error('Error fetching articles by tag:', error);
      }
    }
  }
})