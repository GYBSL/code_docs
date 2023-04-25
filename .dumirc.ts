import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '编程文档',
    logo: "/logo.jpg",
    footer: "别看我,看代码！"
  },
  // nav: {
  //   mode: "override",
  //   value: [
  //     { title: '开发总结', link: '/summary/vantSp'},
  //     { title: 'java后端', link: '/javanotes/javaBasics'},
  //     { title: '前端', link: '/front'},
  //   ]
  // },
  history: {
    type: "hash"
  },
  // base: "/docs-dist",
  // publicPath: "/docs-dist/"
});
