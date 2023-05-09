# 编程文档

基于 dumi2 的文档

dumi2：[dumi - 为组件研发而生的静态站点框架 (umijs.org)](https://d.umijs.org/)

首页新增一言接口，每次刷新页面都会获取不同的格言⭐⭐⭐

## 开始

```bash
# 安装依赖
$ npm install

# 开发运行
$ npm start

# 开发组件文档的时候打包用
$ npm run build

# 单纯写文档库，没有用到src目录下的东西来写组件的时候用下面的命令打包
$ npm run docs:build
```

### 打包部署修改路径

记得改 `.dumirc.ts` 中的配置，如下修改 `base ` 和 `publicPath`

```javascript
base: "/", // 文档起始路由 
publicPath: "/docs-dist/" // 静态资源起始路径

如果要托管到github或者gitee上的话
publicPath要改成你的仓库名称，比如：publicPath: "/code_docs/"
```

### dumi 页面路由注意

dumi 是采用的约定式路由

这块可以看一下官方文档，用到的比较多

### dumi 页面中的约定式 tab 的排序

约定式 tab 的排序是按照你定义的文件名称长度，长的排在前面

如：`interview.$tab-html` 和 `interview.$tab-css` 中html长度为4、css长度为3, 所以页面tab默认html排在css前面
