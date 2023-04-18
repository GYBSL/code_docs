import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '编程文档',
    logo: "/logo.jpg",
    footer: "别看我,看代码！"
  },
  history: {
    type: "hash"
  },
  base: "/docs-dist/",
  publicPath: "/docs-dist/"
});
