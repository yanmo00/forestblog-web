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
  <div class="sidebar sm:hidden md:block">
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
.sidebar {
  // display: none;
  width: var(--sidebar-width);
  position: fixed;
  top: 120px;
  left: 90px;
  // width: 300px;
  // padding: 1.5rem;
  padding-top: .5rem;
  border-radius: var(--radius-lg);
  text-align: center;
  color: var(--text-primary);
  transition: var(--transition-base);
  z-index: 100;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    left: 0;
    padding: .5rem;
    display: none;
  }

  @media (max-width: 1280px) {
    left: 10px;
    padding: .5rem;
    // width: 200px !important;
  }

  
}

.sidebar-header {
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  text-align: center;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  padding: 2rem;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;

  @media (max-width: 1280px) {
    padding: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
    opacity: 0;
    transition: var(--transition-base);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);

    &::after {
      opacity: 1;
    }

    img {
      transform: scale(1.05) rotate(5deg);
    }
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    transition: var(--transition-base);
    border: 3px solid var(--border-color);
    padding: 0.5rem;
    background: var(--bg-darker);
    object-fit: cover;

    &:hover {
      border-color: var(--primary-color);
    }
  }

  p {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--text-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .title, .value {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
  }

  .title p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    transition: var(--transition-base);
    font-weight: normal;

    &:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  }

  .value p {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.sidebar-center {
  padding: 2rem;
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  text-align: center;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;

  @media (max-width: 1280px) {
    padding: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
    opacity: 0;
    transition: var(--transition-base);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);

    &::before {
      opacity: 1;
    }

    span {
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  }

  span {
    display: block;
    margin: 1rem 0;
    font-size: 0.95rem;
    color: var(--text-secondary);
    transition: var(--transition-base);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    background: var(--bg-darker);

    &:hover {
      background: rgba(64, 158, 255, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: relative;
    top: 0;
    left: 0;
    width: 95%;
    margin: 1rem auto;
    max-height: none;
  }

  .sidebar-header {
    margin-top: 2rem;
    padding: 1.5rem;
    
    img {
      width: 100px;
      height: 100px;
    }

    p {
      font-size: 1.5rem;
    }
  }

  .sidebar-center {
    padding: 1.5rem;
  }
}
</style>