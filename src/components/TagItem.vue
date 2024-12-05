<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">
        <ArticleItem/>
      </el-tab-pane>
      
      <el-tab-pane label="Config" name="second">
        
      </el-tab-pane>

      <el-tab-pane label="Role" name="third">
        
      </el-tab-pane>

      <el-tab-pane label="Task" name="fourth">
        
      </el-tab-pane>
    </el-tabs>
  </template>
  <script lang="ts" setup>
    import { ref } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
import ArticleItem from './ArticleItem.vue';
    
    const activeName = ref('first')
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
  </script>
  
  <style>
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
  </style>
  