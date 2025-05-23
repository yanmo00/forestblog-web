<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useArticleStore } from '@/stores/article'
  import { User, Calendar } from '@element-plus/icons-vue'
  import router from '@/router'
  import { marked } from 'marked'

  const articleStore = useArticleStore();
  const articles = ref([]);
  const hoveredIndex = ref(null);

  onMounted(async () => {
    try {
      // 确保先获取文章数据
      await articleStore.fetchArticles();
      // 检查文章数据是否存在
      if (articleStore.articles && articleStore.articles.length > 0) {
        articles.value = articleStore.articles.sort((a, b) => 
          new Date(b.publishdate) - new Date(a.publishdate)
        );
      } else {
        console.warn('No articles found in store');
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  });

  // 添加一个计算属性来检查是否有文章
  const hasArticles = computed(() => articles.value.length > 0);

  // 方法：格式化日期为年月日格式
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 方法：处理鼠标悬停事件
  const handleMouseOver = (index) => {
    hoveredIndex.value = index;
  };

  const handleMouseLeave = () => {
    hoveredIndex.value = null;
  };

  // 方法：根据条件返回不同的颜色
  const getTimelineItemColor = (index) => {
    if (hoveredIndex.value === index) {
      return 'var(--primary-color)';
    }
    const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
    return colors[index % colors.length];
  };

  // 添加获取时间线项目类型的方法
  const getTimelineItemType = (index) => {
    // 根据索引返回不同的类型
    const types = ['primary', 'success', 'warning', 'danger'];
    return types[index % types.length];
  };

  const handleArticleClick = (article) => {
    router.push({ name: 'article', params: { id: article.id } });
  };

  const getArticleExcerpt = (content) => {
    const plainText = marked.parse(content || '').replace(/<[^>]+>/g, '');
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  };
</script>

<template>
  <div class="timeline-wrapper">
    <div class="timeline-container">
      <div class="timeline-header">
        <h1>归档时间线</h1>
        <p class="subtitle">记录每一篇博客的创作时光</p>
      </div>
      
      <div class="timeline-content">
        <el-timeline v-if="hasArticles">
          <el-timeline-item
            v-for="(article, index) in articles"
            :key="article.id"
            :type="getTimelineItemType(index)"
            :color="getTimelineItemColor(index)"
            :hollow="hoveredIndex !== index"
            :timestamp="formatDate(article.publishdate)"
            placement="top"
            :class="{ 'is-hovered': hoveredIndex === index }"
            @mouseover="handleMouseOver(index)"
            @mouseleave="handleMouseLeave"
          >
            <div class="timeline-card" @click="handleArticleClick(article)">
              <h3 class="article-title">{{ article.title }}</h3>
              <div class="article-meta">
                <span class="meta-item">
                  <el-icon><User /></el-icon>
                  {{ article.author }}
                </span>
                <span class="meta-item">
                  <el-icon><Calendar /></el-icon>
                  {{ formatDate(article.publishdate) }}
                </span>
              </div>
              <p class="article-excerpt">{{ getArticleExcerpt(article.content) }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
        <div v-else class="no-data">
          <el-empty description="暂无文章数据" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .timeline-wrapper {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }

  .timeline-container {
    width: 100%;
    max-width: 1000px;
    margin-left: 14rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .timeline-header {
    text-align: center;
    padding: 1.5rem;
    margin-left: 5rem;
    background: var(--bg-dark);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    transition: var(--transition-base);
    flex-shrink: 0; // 防止header被压缩

    h1 {
      font-size: 2rem;
      color: var(--text-primary);
      margin: 0;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0.75rem 0 0;
    }
  }

  .timeline-content {
    flex: 1;
    padding: 1.5rem;
    margin-left: 5rem;

    background: var(--bg-dark);
    border-radius: 10px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    transition: var(--transition-base);
    height: calc(100vh - 300px); // 调整高度，留出header的空间
    overflow-y: auto;

    :deep(.el-timeline) {
      padding: 0;
    }

    :deep(.el-timeline-item__node) {
      transition: var(--transition-base);
    }

    :deep(.el-timeline-item__timestamp) {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      background: var(--bg-darker);
      border-radius: var(--radius-md);
    }
  }

  .timeline-card {
    background: var(--bg-darker);
    border-radius: var(--radius-lg);
    padding: 1.25rem;
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: var(--transition-base);

    .article-title {
      font-size: 1.25rem;
      color: var(--text-primary);
      margin: 0 0 0.75rem;
      font-weight: 600;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .article-excerpt {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  :deep(.el-timeline-item.is-hovered) {
    .el-timeline-item__node {
      transform: scale(1.2);
    }

    .timeline-card {
      transform: translateX(8px);
      border-color: var(--primary-color);
      background: rgba(64, 158, 255, 0.05);
    }
  }

  @media (max-width: 768px) {
    .timeline-container {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .timeline-header {
      padding: 1.5rem;
      margin-bottom: 2rem;
      margin-left: -1.5rem;
      width: 100%;

      h1 {
        font-size: 2rem;
      }
    }

    .timeline-content {
      padding: 1.5rem;
      width: 100%;
      margin-left: -1.5rem;

    }

    .timeline-card {
      padding: 1.25rem;

      .article-title {
        font-size: 1.25rem;
      }
    }
  }

  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: var(--bg-darker);
    border-radius: var(--radius-lg);
    padding: 2rem;
  }

  // 自定义滚动条样式
  .timeline-content::-webkit-scrollbar {
    width: 8px;
  }

  .timeline-content::-webkit-scrollbar-track {
    background: var(--bg-darker);
    border-radius: 4px;
  }

  .timeline-content::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
    
    &:hover {
      background: var(--primary-color);
    }
  }
</style>