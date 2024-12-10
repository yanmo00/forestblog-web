<script lang="ts" setup>
    import { ref,onMounted } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import ArticleItem from './ArticleItem.vue';
    import { useArticleStore } from '@/stores/article'
    import ClassfiedIem from './ClassfiedItem.vue';

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
        <Transition name="tab-fade" mode="out-in">
          <div class="tab-content" :key="tag.name">
            <ClassfiedIem/>
          </div>
        </Transition>
      </el-tab-pane>
    </el-tabs>
  </template>

  
  
  <style lang="scss" scoped>
    .demo-tabs {
      margin-left: 3.0rem;
    }

    .demo-tabs > :deep(.el-tabs__content) {
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
      max-height: calc(100vh - 120px - 55px);
      overflow: auto;
    }

    /* 隐藏滚动条 */
    .demo-tabs > :deep(.el-tabs__content::-webkit-scrollbar) {
      display: none;
    }

    // 添加动画样式
    .tab-content {
      position: relative;
      width: 100%;
    }

    .tab-fade-enter-active,
    .tab-fade-leave-active {
      transition: all 0.3s ease;
    }

    .tab-fade-enter-from {
      opacity: 0;
      transform: translateX(20px);
    }

    .tab-fade-leave-to {
      opacity: 0;
      transform: translateX(-20px);
    }
  </style>
  