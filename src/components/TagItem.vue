<script lang="ts" setup>
    import { ref } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import ArticleItem from './ArticleItem.vue';
    import { useArticleStore } from '@/stores/article'

    const articleStore = useArticleStore()
    const articles = ref(articleStore.articlesWithTags)
    const activeName = ref('first')
    const tags = ref(['前端','后端','运维','移动端'])
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
  </script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="tags" v-for="tag in tags" :key="tag">
        
      </el-tab-pane>

    </el-tabs>
  </template>

  
  
  <style>
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
  </style>
  