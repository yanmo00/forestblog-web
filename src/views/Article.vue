<template>
  <div class="article">
    <h1 class="mb-20px text-center">{{ detail.title }}</h1>
    <div class="flex-center gap-5">
      <div class="flex-center gap-2">
        <el-icon>
          <Calendar />
        </el-icon>
        <div>{{ dayjs(detail.updatedAt).format("YYYY-MM-DD") }}</div>
      </div>
      <div class="flex-center gap-1">
        <el-icon>
          <User />
        </el-icon>
        <div>{{ detail.author }}</div>
      </div>
    </div>
    <div class="article-content" v-html="parseMarkdown(detail.content)"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
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

  // 定义一个方法来解析 markdown 内容
  const parseMarkdown = (content) => {
    return marked.parse(content || '');
  };

</script>

<style lang="scss" scoped>
.article {
  height: calc(100vh - 120px - 30px);
  overflow: auto;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 15px;

  .article-content {
    // max-width: calc(100vw - 90px * 2 - 300px - 15rem);
    // max-width: calc(100vw - 90px * 2 - 300px);
    max-width: 100%;
    overflow: auto;
  }
}
</style>