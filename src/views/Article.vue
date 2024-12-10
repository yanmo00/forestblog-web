<template>
  <div class="article-wrapper">
    <Transition name="fade-slide" appear>
      <div class="content" :key="route.params.id">
        <el-scrollbar height="750px">
          <div class="article-container">
            <div class="article">
              <div class="article-header">
                <el-button 
                  class="back-btn" 
                  @click="router.go(-1)" 
                  text
                  :icon="ArrowLeft"
                >
                  返回
                </el-button>
                <h1 class="mb-20px text-center">{{ detail.title }}</h1>
              </div>
              <div class="flex-center gap-5">
                <div class="flex-center gap-2">
                  <el-icon><Calendar /></el-icon>
                  <div>{{ dayjs(detail.updatedAt).format("YYYY-MM-DD") }}</div>
                </div>
                <div class="flex-center gap-1">
                  <el-icon><User /></el-icon>
                  <div>{{ detail.author }}</div>
                </div>
              </div>
              <div class="article-content" v-html="parseMarkdown(detail.content)"></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
import { useArticleStore } from '@/stores/article'
import { marked } from 'marked';
import { onMounted } from 'vue';
import dayjs from 'dayjs'
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

var renderer = new marked.Renderer();

renderer.heading = function ({ text, depth }) {
  // 移除一级标题
  if (depth === 1) return ''
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth}>
      <a name="${escapedText}" class="anchor" hred="#${escapedText}">
        <span class="header-link"></span>
      </a>
      ${text}
    </h${depth}>`
}

onMounted(() => {
  // 移除手动高亮代码块的逻辑
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
})

marked.setOptions({
  renderer,
  gfm: true,//默认为true。 允许 Git Hub标准的markdown.
  tables: true,//默认为true。 允许支持表格语法。该选项要求 gfm 为true。
  breaks: false,//默认为false。 允许回车换行。该选项要求 gfm 为true。
  pedantic: false,//默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false,//对输出进行过滤（清理）
  smartLists: true,
  smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
  // highlight: function (pre,code) {
  //   return require('highlight.js').highlightAuto(pre,code).value;
  // }
})

  const route = useRoute();
  const articleStore = useArticleStore();
  const detail = articleStore.getArticleById(route.params.id);

  const router = useRouter()

  // 定义一个方法来解析 markdown 内容
  const parseMarkdown = (content) => {
    return marked.parse(content || '');
  };

</script>

<style lang="scss" scoped>
.article-wrapper {
  position: fixed;
  top: 7rem;
  left: 5rem;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
}

.article-container {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.article {
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 15px;
  width: 80%;  // 设置文章宽度
  max-width: 1200px;  // 最大宽度
  position: relative;

  .article-header {
    position: relative;
    margin-bottom: 2rem;

    .back-btn {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      
      &:hover {
        color: #fff;
        transform: translateY(-50%) translateX(-3px);
      }

      :deep(.el-icon) {
        margin-right: 4px;
      }
    }

    h1 {
      margin: 0;
      padding: 0 60px;
    }
  }

  .article-content {
    padding-top: 1rem;
    margin-left: 2rem;
    max-width: 100%;
  }
}

// 优化动画
.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>