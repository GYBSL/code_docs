import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist', // 打包之后的文件夹
  themeConfig: {
    name: '编程文档',
    logo: "/code_docs/logo.jpg",
    footer: "别看我,看代码！🫠"
  },
  favicons: ['/code_docs/favicon.ico'],
  history: {
    type: "hash" // hash模式
  },
  analytics: {
    // 百度统计的 key
    baidu: '3ea846ff08b64301f51a1bd92e3a5019',
  },
  base: "/", // 文档起始路由
  publicPath: "/code_docs/" // 静态资源起始路径
});
