import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist', // 打包之后的文件夹
  themeConfig: {
    name: '编程文档',
    logo: "/code_docs/logo.webp",
    footer: "“无人问津也好，技不如人也罢，你都要试着安静下来，去做自己该做的事，而不是让内心的烦躁焦虑毁掉你本就不多的热情和定力” ——人民日报"
  },
  favicons: ['/code_docs/logo.ico'],
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
