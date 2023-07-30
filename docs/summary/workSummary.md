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

## 2. yarn和npm安装依赖的缓存清理

`npm cache verify`

`yarn cache clean`

以上的两个命令可以清除安装依赖时的缓存，可以解决因为缓存导致安装依赖失败的一些问题

## 3. Git Submodule管理git子模块

常用子模块命令：

```bash
git clone <repository> --recursive 递归的方式克隆整个项目
git submodule add <repository> <path> 添加子模块
git submodule init 初始化子模块
git submodule update 更新子模块
git submodule foreach git pull 拉取所有子模块
```

关于git submodule的不错的文章：[Git--子模块（submodule）介绍_git submodule_worthsen的博客-CSDN博客](https://blog.csdn.net/qq_38880380/article/details/123288706)

## 4. Git 常用命令及规范

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

## 5. git修改本地项目仓库地址的常用方法

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



