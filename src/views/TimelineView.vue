<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import { ref } from 'vue'
import SideBarItem from '../components/SideBarItem.vue';
import TimeLineItem from '@/components/TimeLineItem.vue';

const input = ref('')
</script>

<template>
  <div class="container">
    <TimeLineItem class="time-line-item"/>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    .time-line-item {
      position: relative;
      top: 13rem;
      left: 22.5rem;
      height: 120%;
      box-sizing: border-box;
    }
  }
  
</style>