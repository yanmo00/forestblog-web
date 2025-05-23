<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import { ref } from 'vue'
import SideBarItem from '../components/SideBarItem.vue';
import TimeLineItem from '@/components/TimeLineItem.vue';

const input = ref('')
</script>

<template>
  <div class="timeline-container">
    <Transition name="fade-slide" appear>
      <div class="content">
        <TimeLineItem class="time-line-item"/>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .timeline-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .time-line-item {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.6s ease-out;
    position: absolute;
    width: 100%;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>