<script lang="ts" setup>
    import { ref } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import ArticleItem from './ArticleItem.vue';
    import { useArticleStore } from '@/stores/article'

    const articleStore = useArticleStore()
    const activeName = ref('前端')
    const tags = [
      {
        label: '前端',
        component: ArticleItem
      },
      {
        label: '后端',
        component: null
      },
      {
        label: '运维',
        component: null
      },
      {
        label: '移动端',
        component: null
      }
    ]
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
  </script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane 
        v-for="tag in tags" :key="tag.label"
        :label="tag.label"
        :name="tag.label"
      >
        <component :is='tag.component'></component>
      </el-tab-pane>

    </el-tabs>
  </template>

  
  
  <style>
    .demo-tabs > .el-tabs__content {
      /* padding: 32px; */
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
      max-height: calc(100vh - 120px - 55px);
      overflow: auto;
    }
  </style>
  