<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const goToHome = () => {
  router.push({ name: 'home' }); // 跳转到首页
};
const input = ref('')
const links = [
  { text: '主页', to: '/home' },
  { text: '分类', to: '/classification' },
  { text: '时间线', to: '/timeline' }
]
</script>

<template>
  <header>
    <div>
      <img class="logo" height="50rpx" src="../assets/logo.jpg" />
      <h3 class="title" @click="goToHome()">Forest-Blog</h3>
    </div>
    <div>
      <el-input 
        v-model="input"
        aria-placeholder="Please Input"
        :suffix-icon="Search"/>
      <nav>
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="link in links" :key="link.to">
            <RouterLink :to="link.to">{{ link.text }}</RouterLink>
          </el-breadcrumb-item>
        </el-breadcrumb> -->
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
    // width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
    display: flex;

    .nav-item {
      display: flex;
      align-items: center;

      a {
        &.router-link-exact-active {
          // color: #5d86d2;
          color: #fff;
        }

        &.router-link-exact-active:hover {
          background-color: black;
        }

        display: inline-block;
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

    > div {
      display: flex;
      align-items: center;
    }
    
    .logo {
      margin: 0 2rem 0 0;
    }

    .title {
      width: 250px;
      color: white;
      cursor: pointer;
    }

    nav {
      text-align: left;
      font-size: 15px;
      // width: 41rem;
      padding: 1rem 0;
      margin-top: -0.25rem;
      // margin-right: 5rem;
      
      .el-breadcrumb {
        font-size: 17px;
      }
    }

    .el-input {
      width: 340px;
      background-color: transparent;
      // margin-left: 63rem;
    }

  }
</style>
