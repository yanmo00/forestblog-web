<script setup>
  import { ref, onMounted } from 'vue'
  import { useArticleStore } from '@/stores/article'

  const articleStore = useArticleStore();
  const articles = ref([]);
  const hoveredIndex = ref(null);

  onMounted(async () => {
    try {
      await articleStore.fetchArticles();
      articles.value = articleStore.articles; // 确保将数据赋值给 articles
    } catch (error) {
      console.error('Failed to fetch articles in TimeLineItem.vue:', error);
    }
  });

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
    return hoveredIndex.value === index ? '#ffcc00' : '#ffffff';
  };
</script>

<template>
  <div class="timeline">
    <el-timeline style="max-width: 600px">
      <el-timeline-item 
        :color="getTimelineItemColor(index)"
        v-for="(article, index) in articles"
        :key="index"
        @mouseover="handleMouseOver(index)"
        @mouseleave="handleMouseLeave"
      >
        <router-link
          style="font-size: var(--el-font-size-large); color: var(--el-text-color-secondary);"
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave"
          :to="{ name: 'article', params: { id: article.id } }"
          :style="{ color: hoveredIndex === index ? '#ffcc00' : '' }"
        >
          {{ formatDate(article.publishdate) }} &emsp; {{ article.title }}
        </router-link>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
  .timeline {
    border-radius: 15px;
    opacity: 80%;
    height: 30rem;
    margin-top: -9.5rem;
    background-color: black;

    &.time-line-item {
      position: relative;
      left: 29rem;
      top: 15rem;
      width: 80rem;
      height: 150%;
      box-sizing: border-box;
      padding-top: 3rem;
      padding-left: 3rem;

      span:hover {
        cursor: pointer;
      }
    }
  }
</style>