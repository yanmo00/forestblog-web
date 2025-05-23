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
      background: var(--bg-dark);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
      box-shadow: var(--shadow-md);
      transition: var(--transition-base);

      &:hover {
        border-color: var(--border-hover);
      }

      :deep(.el-tabs__header) {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
      }

      :deep(.el-tabs__nav-wrap::after) {
        height: 1px;
        background: var(--border-color);
      }

      :deep(.el-tabs__item) {
        height: 48px;
        line-height: 48px;
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--text-secondary) !important;
        transition: var(--transition-base) !important;
        padding: 0 1.5rem;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: var(--primary-color);
          transition: var(--transition-base);
          transform: translateX(-50%);
          border-radius: var(--radius-sm);
        }

        &:hover {
          color: var(--primary-color) !important;
          transform: translateY(-2px);

          &::before {
            width: 30%;
          }
        }

        &.is-active {
          color: var(--primary-color) !important;
          font-weight: 600;

          &::before {
            width: 50%;
          }
        }
      }

      :deep(.el-tabs__active-bar) {
        display: none;
      }

      :deep(.el-tabs__content) {
        color: var(--text-secondary);
        font-size: 1rem;
        max-height: calc(100vh - 200px);
        overflow: auto;
        padding: 0.5rem;
      }

      /* 隐藏滚动条 */
      :deep(.el-tabs__content::-webkit-scrollbar) {
        display: none;
      }
    }

    .tab-content {
      position: relative;
      width: 100%;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tab-fade-enter-active,
    .tab-fade-leave-active {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tab-fade-enter-from {
      opacity: 0;
      transform: translateX(20px);
    }

    .tab-fade-leave-to {
      opacity: 0;
      transform: translateX(-20px);
    }

    @media (max-width: 768px) {
      .demo-tabs {
        margin: 1rem;
        padding: 1rem;

        :deep(.el-tabs__item) {
          height: 40px;
          line-height: 40px;
          font-size: 1rem;
          padding: 0 1rem;
        }
      }
    }
  </style>
  