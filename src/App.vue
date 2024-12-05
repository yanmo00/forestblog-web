<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';

const input = ref('')

</script>

<template>
  <RouterLink to="/home" class="home">Home</RouterLink>
  <RouterView/>
  
</template>

<style lang="scss" scoped>
  .home {
    font-size: 50rem;
  }


</style>