import { defineStore } from 'pinia'
import { queryArticleByTag, queryArticleList } from '@/api/home'
import { storage } from '@/utils/Storage';

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: storage.get('articles', []),
    articlesWithTags: [],
    articlesWithSearch: []
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
    async fetchArticlesByTag(tag) {
      try {
        const { data } = await queryArticleByTag(tag);
        this.articlesWithTags = data;
        console.log('Fetched articles by tag:', this.articlesWithTags);
      } catch (error) {
        console.error('Error fetching articles by tag:', error);
      }
    },

  async searchArticles(condition) {
    try {
      const { data } = await queryArticleByContent(condition);

      if (data.length === 0) {
        // 如果通过内容搜索的结果为空，尝试通过标题搜索
        const { data: titleData } = await queryArticleByTitle(condition);
        if (titleData.length === 0) {
          // 如果通过标题搜索的结果也为空，提示用户
          console.log('搜索结果为空');
        } else {
          // 如果通过标题搜索有结果，更新文章列表
          this.articlesWithSearch = titleData;
        }
      } else {
        // 如果通过内容搜索有结果，更新文章列表
        this.articlesWithSearch = data;
      }
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  }
  }
})
