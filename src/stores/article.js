import { defineStore } from 'pinia'
import axios from 'axios' // 假设你使用 axios 进行 HTTP 请求
const api = 'http://localhost:7002/prod-api'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
  }),
  actions: {
      // 获取文章列表
    async fetchArticles() {
      try {
        const response = await axios.get(api +'/article/selectAll');
        this.articles = response.data.data;
        console.log('Fetched articles:', this.articles)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }
  }
})