<script setup>
import { ref, onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore();
const uptime = ref('');

// 计算本周内文章数量
const weeklyArticleCount = computed(() => {
  const now = new Date();  
  const dayOfWeek = now.getDay(); // 获取当前是星期几，0 表示周日，1 表示周一，依此类推
  const startOfWeek = new Date(now.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // 获取本周一的时间
  const endOfWeek = new Date(startOfWeek); 
  endOfWeek.setDate(endOfWeek.getDate() + 6); // 获取本周末的时间

  return articleStore.articles.filter(article => {
    const publishDate = new Date(article.publishdate);
    return publishDate >= startOfWeek && publishDate <= endOfWeek;
  }).length;
});

// 计算本月文章数量
const monthlyArticleCount = computed(() => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 获取本月第一天
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 获取本月最后一天

  return articleStore.articles.filter(article => {
    const publishDate = new Date(article.publishdate);
    return publishDate >= startOfMonth && publishDate <= endOfMonth;
  }).length;
});

onMounted(() => {
  // 初始化建站时间
  const startTime = new Date('2024-12-01T00:00:00');
  updateUptime(startTime);

  // 每秒更新一次建站时间
  setInterval(() => {
    updateUptime(startTime);
  }, 1000);
});

function updateUptime(startTime) {
  const now = new Date();
  const diff = now - startTime;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  uptime.value = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="../assets/logo.jpg" alt="Profile Picture">
      <p>Forest</p>
      <div class="value">
        <p>{{ articleStore.articles.length }}</p>
        <p>{{ monthlyArticleCount }}</p>
        <p>{{ weeklyArticleCount }}</p>
      </div>
      <div class="title">
        <p>博客文章</p>
        <p>本月更新</p>
        <p>本周更新</p>
      </div>
    </div>
    <div class="sidebar-center">
      <span>文章总数：{{ articleStore.articles.length }}</span>
      <span>建站时间：{{ uptime }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-header {
  width: 300px;
  padding: 10px;
  background-color: #000000;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 15px;
  color: white;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .title, .value {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}

.sidebar-center {
  width: 300px;
  padding: 10px;
  background-color: #000;
  border-radius: 15px;
  text-align: center;
  opacity: 80%;
  color: white;

  span {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>