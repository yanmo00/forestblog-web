<script lang="ts" setup>
    import { ref,onMounted } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import ArticleItem from './ArticleItem.vue';
    import { useArticleStore } from '@/stores/article'
    import ClassfiedIem from './ClassfiedIem.vue';

    const articleStore = useArticleStore()
    const activeName = ref('前端')
    const tags = [
      { label: '前端', name: '前端' },
      { label: '后端', name: '后端' },
      { label: '运维', name: '运维' },
      { label: '移动端', name: '移动端' }
    ]   
    const handleClick = async (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
      articleStore.fetchArticlesByTag(tab.props.name)
    }

    onMounted(() => {
      articleStore.fetchArticlesByTag(activeName.value)
    })

  </script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane 
      v-for="tag in tags" :key="tag.name"
      :label="tag.label"
      :name="tag.name"
      >
        <ClassfiedIem/>
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

    /* 隐藏滚动条 */
    .demo-tabs > .el-tabs__content::-webkit-scrollbar {
      display: none; /* Chrome, Safari 和 Opera */
    }
  </style>
  