<template>
  <div class="article-wrapper">
    <Transition name="fade-slide" appear>
      <div class="content" :key="route.params.id">
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
              <el-icon :size="20" color>
                <Edit />
              </el-icon>
              <el-icon color="#409efc" class="no-inherit">
                <Share />
              </el-icon>
              <el-icon>
                <Delete />
              </el-icon>
            </div>
            <div class="flex-center gap-5">
              <div class="flex-center gap-2">
                <el-icon><Calendar /></el-icon>
                <el-icon :size="20">
    <Edit />
  </el-icon>
  <el-icon color="#409efc" class="no-inherit">
    <Share />
  </el-icon>
  <el-icon>
    <Delete />
  </el-icon>
                <div>{{ dayjs(detail.updatedAt).format("YYYY-MM-DD") }}</div>
              </div>
              <div class="flex-center gap-1">
                <el-icon><User /></el-icon>
                <div>{{ detail.author }}</div>
              </div>
            </div>
            <el-scrollbar height="calc(100vh - 200px)" class="scrollbar-wrapper">
              <div class="article-content" v-html="parseMarkdown(detail.content)"></div>
            </el-scrollbar>
          </div>
        </div>
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
  position: relative;
  width: 100%;
  height: 92vh;
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
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.article {
  height: 100%;
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 1200px;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);

  &:hover {
    border-color: var(--border-hover);
  }

  .article-header {
    position: relative;
    margin-bottom: 2rem;
    padding: 2rem 2rem 0;

    .back-btn {
      position: absolute;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      transition: var(--transition-base);
      color: var(--text-secondary);
      font-size: 0.95rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-sm);
      background: var(--bg-darker);
      border: 1px solid var(--border-color);
      
      &:hover {
        color: var(--primary-color);
        background: rgba(64, 158, 255, 0.1);
        transform: translateY(-50%) translateX(-4px);
        border-color: var(--primary-color);
      }

      :deep(.el-icon) {
        margin-right: 6px;
        font-size: 1.1em;
      }
    }

    h1 {
      margin: 0;
      padding: 0 60px;
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.4;
      text-align: center;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
      color: var(--text-secondary);
      font-size: 0.95rem;

      .el-icon {
        color: var(--primary-color);
        font-size: 1.2em;
      }
    }
  }

  .scrollbar-wrapper {
    flex: 1;
    overflow: hidden;
    padding: 0 2rem 2rem;

    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
    }
  }

  .article-content {
    padding: 1.5rem 0;
    max-width: 100%;
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(h2) {
      font-size: 2rem;
      color: var(--text-primary);
      margin: 2.5rem 0 1.5rem;
      font-weight: 600;
      position: relative;
      padding-left: 1rem;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 1.5em;
        background: var(--primary-color);
        border-radius: var(--radius-sm);
      }
    }

    :deep(h3) {
      font-size: 1.75rem;
      color: var(--text-primary);
      margin: 2rem 0 1.25rem;
      font-weight: 600;
    }

    :deep(p) {
      margin: 1.25rem 0;
    }

    :deep(code) {
      background: var(--bg-darker);
      padding: 0.2rem 0.4rem;
      border-radius: var(--radius-sm);
      font-family: 'Fira Code', monospace;
      font-size: 0.95em;
      color: var(--primary-color);
    }

    :deep(pre) {
      background: var(--bg-darker);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      margin: 1.5rem 0;
      overflow-x: auto;
      border: 1px solid var(--border-color);

      code {
        background: none;
        padding: 0;
        color: var(--text-primary);
      }
    }

    :deep(blockquote) {
      border-left: 4px solid var(--primary-color);
      margin: 1.5rem 0;
      padding: 1rem 0 1rem 1.5rem;
      color: var(--text-secondary);
      background: var(--bg-darker);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      font-style: italic;
    }

    :deep(a) {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition-base);
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--primary-color);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }

      &:hover {
        color: var(--primary-hover);
        
        &::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }

    :deep(img) {
      max-width: 100%;
      border-radius: var(--radius-md);
      margin: 1.5rem 0;
      box-shadow: var(--shadow-md);
      transition: var(--transition-base);
      
      &:hover {
        transform: scale(1.02);
      }
    }

    :deep(ul), :deep(ol) {
      padding-left: 1.5rem;
      margin: 1.25rem 0;
      
      li {
        margin: 0.5rem 0;
      }
    }

    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: var(--bg-darker);
      border-radius: var(--radius-md);
      overflow: hidden;
      
      th, td {
        padding: 1rem;
        border: 1px solid var(--border-color);
      }
      
      th {
        background: var(--primary-color);
        color: var(--text-primary);
        font-weight: 600;
      }
      
      tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}

.fade-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

@media (max-width: 768px) {
  .article {
    .article-header {
      padding: 1.5rem 1.5rem 0;
      
      h1 {
        font-size: 1.75rem;
        padding: 0 50px;
      }
      
      .back-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
    }
    
    .article-content {
      padding: 1rem 0;
      font-size: 1rem;
      
      :deep(h2) {
        font-size: 1.75rem;
      }
      
      :deep(h3) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>