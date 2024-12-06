<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import HeaderItem from '@/components/HeaderItem.vue'
import SideBarItem from '@/components/SideBarItem.vue';

const input = ref('')

</script>

<template>
  <!-- <RouterLink to="/home" class="home">Home</RouterLink> -->
  <div> 
    <HeaderItem class="header-item"/>
    <div class="pt-90px px-90px flex">
      <!-- <SideBarItem class="fixed top-30%" /> -->
      <SideBarItem />
      <RouterView />
    </div>
   </div>
</template>

<style lang="scss" scoped>
  .home {
    font-size: 50rem;
  }

  .header-item {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* 确保 header 在其他内容之上 */
    background-color: #000; /* 添加背景颜色以覆盖内容 */
    padding: 15px;
    opacity: 80%;
  }


</style>