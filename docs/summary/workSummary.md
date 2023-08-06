---
title: 工作所学
order: 4
toc: content
group: 
  title: 编程总结
  order: 4
---

# 工作所学

## 1.nvm管理node版本

使用nvm可以轻松管理多个node的版本

nvm的安装使用步骤：

1. github下载nvm：[Releases · coreybutler/nvm-windows (github.com)](https://github.com/coreybutler/nvm-windows/releases)

2. 安装前先删掉电脑上原来的node，避免nvm下载之后检测到有node版本导致的冲突

3. 运行下载的nvm程序，安装成功之后需要进行一个环境的配置，不做这一步就会导致nvm安装完指定的版本但是npm无法使用的问题

   找到自己的nvm安装路径，在安装根路径下新建一个nodejs的目录，打开环境变量，**用户变量和系统变量都需要设置**，找到环境变量中的`NVM_SYMLINK`，路径改为刚刚新建的nodejs目录的路径即可

4. 然后就可以使用nvm来下载管理我们的node了

nvm常用命令：

```node.js
nvm list	// 查看已安装的node版本
nvm install 版本号		// 安装指定的node版本
nvm use 版本号		// 使用/切换你需要的版本（这个命令在有些电脑环境下需要用管理员方式才能生效）
nvm uninstall 版本号	// 卸载/删除node某版本
```

## 2. 使用 nvm 安装 node 踩坑

使用nvm安装node之后，使用npm安装依赖的时候报以下错误：

```bash
npm ERR! Unexpected token '.'
npm ERR! A complete log of this run can be found in:
npm ERR! C:\Users\1\AppData\Local\npm-cache\_logs\2023-08-04108_55_20_093Z-debug-0. 1og
```

网上查了之后，说是nvm的版本问题

1. 先使用 `nvm uninstall v版本号` 卸载了全部的 node 之后

2. 将原来电脑上的 1.1.7 的 nvm 删掉，重新去 nvm 官方的 github 上面下载了新的 1.1.11 版本

3. 再在nvm的安装目录中新建 `nodejs` 目录，然后将 `nodejs` 目录路径添加替换系统环境变量中的 `NVM_SYMLINK` ，这个步骤是防止使用 nvm 安装完 node 之后，npm 没有安装导致的无法使用的问题

4. 来到安装 nvm 的文件夹，找到 `settings.text` 文本文件，里面要添加的两句内容，改镜像：

   ```bash
   node_mirror: https://npm.taobao.org/mirrors/node/
   npm_mirror: https://npm.taobao.org/mirrors/npm/
   ```

5. 然后再使用 nvm 安装想要的 node，就可以放心使用了

## 3. yarn和npm安装依赖的缓存清理

`npm cache verify`

`yarn cache clean`

以上的两个命令可以清除安装依赖时的缓存，可以解决因为缓存导致安装依赖失败的一些问题

## 4. Git Submodule管理git子模块

常用子模块命令：

```bash
git clone <repository> --recursive 递归的方式克隆整个项目
git submodule add <repository> <path> 添加子模块
git submodule init 初始化子模块
git submodule update 更新子模块
git submodule foreach git pull 拉取所有子模块
```

关于git submodule的不错的文章：[Git--子模块（submodule）介绍_git submodule_worthsen的博客-CSDN博客](https://blog.csdn.net/qq_38880380/article/details/123288706)

## 5. Git 常用命令及规范

```bash
git branch #显示本地所有分支，分支名前面有*号的代表当前正处于哪个分支
git branch -v #查看本地分支+上次提交的信息
git branch -vv #查看本地分支+上次提交的信息+本地和远程分支的关系
git branch -vv -a #查看本地分支+上次提交的信息+本地和远程分支的关系+远程分支，如果不想显示提交的信息，也可以去掉-vv参数
git branch -r #只查看远程分支
git branch -d (branchName) #删除本地分支
git checkout (branchName) #切换本地分支
git branch (branchName) #创建本地分支
git checkout -b (branchName) #创建本地分支并切换
git branch -m (new-branch-name) #更改分支名称
```

```bash
commit 提交信息规范∶
  feat: 添加了个很棒的功能
  fix: 修复了一些bug
  docs: 更新了一下文档
  chore: 对脚手架做了些更改
  locale: 为国际化做了微小的贡献. module :新增了一个很牛逼的模块
  del: 删除了一些垃圾代码
  style: 格式(不影响代码运行的变动)refactor:重构（即不是新增功能，也不是修改bug的代码变动)
  perf: 优化相关，比如提升性能、体验
  chore: 构建过程或辅助工具的变动
  revert: 回滚到上一个版本
  merge: 代码合并
  sync: 同步主线或分支的Bug
    
<类型>: <内容> 冒号后面有空格
```

## 6. git修改本地项目仓库地址的常用方法

```bash
1. 先查看本地git仓库的地址
git remote -v                       // 查看git对应的远程仓库地址

2. 删除本地的git地址，origin就是通过上面的remote -v展示出来的前缀，可能是其他名称
git remote rm origin                // 删除关联对应的远程仓库地址

3. 再次查看本地git地址信息
git remote -v                       // 查看是否删除成功，如果没有任何返回结果，表示OK

4. 重新关联一下新的git仓库地址
git remote add origin "新的仓库地址" // 重新关联git远程仓库地址
```

## 7. 微前端架构分享

### 什么是微前端

官方和ChatGPT： 微前端是一种将前端应用程序拆分为更小、更容易管理的部分的方法。这些部分可以由不同的团队独立开发、部署和维护。微前端旨在使前端开发更加可持续和可扩展。

Notion AI：微前端是一种前端架构风格，旨在帮助团队构建基于微服务思想的大型 Web 应用。它是将一个大型应用拆分成更小、可独立开发、独立部署的多个微应用，并且每个微应用都有自己的技术栈和开发团队。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/wqd-1.png)

### 微前端使用场景

1. **遗留系统的维护：**一些时间较久的项目，采用的技术和依赖的版本落后，不能及时升级。

2. **技术栈无关性：**核心价值，微前端架构允许每个微应用独立地选择和使用技术栈，这样就可以根据不同的需求选择不同的技术栈进行开发，而不会受到其他微应用的限制。 

   例：有一个老的项目是用react 框架和webpack（构建工具）进行开发的，而新的项目是用的 vue 框架和 vite（构建工具）进行开发的，现在要实现将两个项目合并，使用同一份菜单，点击不同菜单展示不同项目的不同路由。

   目前市面上的前端项目主要使用框架（React、Vue、Angular、Svelte、Solid）和 jQuery 库，配合一些打包工具（webpack，vite）进行开发。

3. **大型应用：**这类应用的特点是系统体量较大，而且随着业务上的功能升级，项目体积还会不断增大。阿里云就是这个场景下微前端很好的实践成果，采用微前端架构方式可无限扩展，其复杂度不会很明显的增长。（微前端最先提出来的主要原因，就是如何将巨石应用解构）

### 常见的微前端解决方案

1. iframe：如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案。iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。 缺点：

   1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
   2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中。
   3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信麻烦。
   4. 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

2. [single-spa](https://github.com/CanopyTax/single-spa)：最早的微前端框架，兼容多种前端技术。

   缺点：

   1. 无通信机制
   2. 样式冲突

3. [qiankun](https://qiankun.umijs.org/zh/guide)：基于 [single-spa](https://github.com/CanopyTax/single-spa) 的[微前端](https://micro-frontends.org/)实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统,优化了single-spa的缺点。

4. [Micro App](https://micro-zoe.github.io/micro-app/)： 是京东推出的微前端框架，不同于目前流行的开源框架，它从组件化的思维实现微前端，旨在降低上手难度、提升工作效率。它是目前市面上接入微前端成本最低的框架，其他微前端的框架优点它都有。

5. [wujie](https://github.com/Tencent/wujie): 无界微前端是一款基于 Web Components + iframe 微前端框架，具备成本低、速度快、原生隔离、功能强等一系列优点。

### 微前端如何落地

基于现有项目要实现微前端落地需要考虑以下几点因素

1. 目标：在转换项目之前，需要明确为什么要实现微前端以及期望实现的目标是什么。这有助于确保微前端的实施过程中能够保持方向一致，并且能够为团队提供清晰的方向和指导。

2. 技术选型：综合(社区活跃度、稳定性、线上案例数量)考虑市面上常见的微前端框架，偏向于qiankun框架。

3. 拆分基座和微应用：根据已有的项目和需求考虑可以将项目分成以下几个部分：

   - 基座：基座主要负责登陆及权限、主页面中头部和导航，**共用组件和各微应用之间的通信**，确定场景入口，在现有的项目上去除无用代码。
   - 微应用：以功能模块拆分微应用，路由改造，添加与主应用之间的通信，对代码进行瘦身。

   ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/wqd-2.png)

4. 测试：当项目改成微前端时，需要全面考虑测试问题，确保整个系统的稳定性、可靠性和安全性。

5. 部署：需要将基座和各微应用进行独立部署。

### 存在的问题

1. 项目中存在共用代码解决方案：
   - 基座： 如果将公共代码放入到基座中，没有做到完全独立。
   - 微应用：如果每个微应用中都存放公共组件，代码重复率高。
2. 数据共享：不同微应用之间的数据共享可能会带来一些问题，例如数据的一致性和安全性等问题。
