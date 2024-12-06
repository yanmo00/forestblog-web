import { defineStore } from 'pinia'
import { queryArticleByTag, queryArticleList } from '@/api/home'
import { storage } from '@/utils/Storage';

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: storage.get('articles', []),
    articlesWithTags: []
  }),
  actions: {
    // 获取文章详情
    getArticleById(id) {
      // TODO: 修改为你的查询文字详情方法
      return this.articles.find((article) => article.id === +id)
    },
      // 获取文章列表
    async fetchArticles() {
      try {
        const { data } = await queryArticleList();
        this.articles = data;
        // 设置缓存
        storage.set('articles', data);
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