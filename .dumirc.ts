import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '编程文档',
    logo: "/code_docs/logo.jpg",
    footer: "别看我,看代码！"
  },
  history: {
    type: "hash"
  },
  base: "/", // 文档起始路由
  publicPath: "/code_docs/" // 静态资源起始路径
});
