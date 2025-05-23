<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/article';

const articleStore = useArticleStore();
const searchResult = ref('')
const router = useRouter();
const showSearchBox = ref(false);
const input = ref('')

const goToHome = () => {
  router.push({ name: 'home' });
};

const links = [
  { text: '主页', to: '/home' },
  { text: '分类', to: '/classification' },
  { text: '归档', to: '/timeline' },
  { text: '我的', to: '/mine' },
]

const handleSearch = () => {
  console.log(input.value);
  articleStore.searchArticles(input.value);
  console.log(articleStore.articlesWithSearch.length);
}

const handleEnterup = () => {
  router.push({ name: 'searchresult' })
  showSearchBox.value = false;
}

const toggleSearchBox = () => {
  showSearchBox.value = !showSearchBox.value;
  if (showSearchBox.value) {
    // 在下一个 tick 后聚焦输入框
    setTimeout(() => {
      const inputEl = document.querySelector('.search-input input');
      if (inputEl) inputEl.focus();
    }, 100);
  }
}

// 点击外部关闭搜索框
const handleClickOutside = (event) => {
  const searchBox = document.querySelector('.search-box');
  const searchIcon = document.querySelector('.search-icon');
  if (searchBox && !searchBox.contains(event.target) && 
      searchIcon && !searchIcon.contains(event.target)) {
    showSearchBox.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

</script>

<template>
  <header>
    <div @click="goToHome()">
      <img class="logo" height="50rpx" src="../assets/logo.jpg" />
      <h3 class="title">Forest-Blog</h3>
    </div>
    <div class="header-right">
      <!-- 桌面端搜索框 -->
      <el-input 
        v-model="input"
        placeholder="请输入关键词"
        @input="handleSearch()"
        @keyup.enter.native="handleEnterup()"
        :suffix-icon="Search"
        class="desktop-search"
      />
      <!-- 移动端搜索图标 -->
      <el-button 
        class="search-icon"
        @click="toggleSearchBox"
        :icon="Search"
        circle
      />
      <!-- 移动端悬浮搜索框 -->
      <div v-show="showSearchBox" class="search-box">
        <el-input 
          v-model="input"
          placeholder="请输入关键词"
          @input="handleSearch()"
          @keyup.enter.native="handleEnterup()"
          :suffix-icon="Search"
          class="search-input"
        />
      </div>
      <nav>
        <div class="nav-item" v-for="(link, index) in links" :key="link.to">
          <router-link :to="link.to"> {{ link.text }} </router-link>
          <span class="nav-item-separate" v-if="index !== links.length - 1">/</span>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  $color-text: #000; 
  $color-border: #ccc; 

  nav {
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
    display: flex;

    .nav-item {
      display: flex;
      align-items: center;

      a {
        &:hover {
          color: hsla(160, 100%, 37%, 1);
        }

        &.router-link-exact-active {
          color: hsla(160, 100%, 37%, 1);
        }

        &.router-link-exact-active:hover {
          background-color: black;
        }

        flex-shrink: 0;
        color: #fff;
        padding: 0 1rem;
        font-size: 17px;
        font-weight: bold;
      }

      .nav-item-separate {
        font-size: 20px; 
        font-weight: bold; 
        color: var(--el-text-color-placeholder);
      }
    }
  }

  header {
    display: flex;
    place-items: center;
    position: fixed;
    left: 8rem;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 2rem;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);

    > div {
      display: flex;
      align-items: center;
    }
    
    .logo {
      margin: 0 2rem 0 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      transition: var(--transition-base);

      &:hover {
        transform: scale(1.05);
      }
    }

    .title {
      width: 250px;
      color: white;
      cursor: pointer;
      font-size: 1.25rem;
      margin: 0;
      transition: var(--transition-base);

      &:hover {
        color: hsla(160, 100%, 37%, 1);
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    nav {
      text-align: left;
      font-size: 15px;
      padding: 0.5rem 0;
      margin-top: 0;
      display: flex;

      .nav-item {
        display: flex;
        align-items: center;

        a {
          &:hover {
            color: hsla(160, 100%, 37%, 1);
          }

          &.router-link-exact-active {
            color: hsla(160, 100%, 37%, 1);
          }

          &.router-link-exact-active:hover {
            background-color: black;
          }

          flex-shrink: 0;
          color: #fff;
          padding: 0 0.75rem;
          font-size: 15px;
          font-weight: bold;
        }

        .nav-item-separate {
          font-size: 16px; 
          font-weight: bold; 
          color: var(--el-text-color-placeholder);
        }
      }
    }

    .desktop-search {
      width: 340px;
      background-color: transparent;
    }

    .search-icon {
      display: none;
      background: transparent;
      border: none;
      color: white;
      font-size: 1.25rem;
      padding: 0.5rem;
      transition: var(--transition-base);

      &:hover {
        color: hsla(160, 100%, 37%, 1);
        transform: scale(1.1);
      }
    }

    .search-box {
      display: none;
      position: absolute;
      top: 100%;
      right: 1rem;
      width: 300px;
      padding: 1rem;
      background: var(--bg-dark);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      z-index: 1001;
      animation: slideDown 0.3s ease-out;

      .search-input {
        width: 100%;
      }
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    header {
      left: 0;
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      gap: 0.5rem;

      > div:first-child {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .logo {
        margin: 0;
        width: 28px;
        height: 28px;
      }

      .title {
        width: auto;
        font-size: 1rem;
        text-align: left;
        margin: 0;
      }

      .header-right {
        width: auto;
        display: flex;
        left: -8rem;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        position: relative;
      }

      .desktop-search {
        display: none;
      }

      .search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 1.5rem;
        font-size: 1.1rem;
      }

      .search-box {
        display: block;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: 90%;
        max-width: 300px;
        padding: 0.75rem;
      }

      nav {
        margin: 0;
        justify-content: center;
        flex-wrap: nowrap;
        gap: 0.25rem;
        width: auto;
        padding: 0;

        .nav-item {
          a {
            font-size: 12px;
            padding: 0 0.35rem;
          }

          .nav-item-separate {
            font-size: 10px;
          }
        }
      }
    }
  }
</style>
