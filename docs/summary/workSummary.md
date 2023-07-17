---
title: 工作总结
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

## 2. Git Submodule管理git子模块

常用子模块命令：

```bash
git clone <repository> --recursive 递归的方式克隆整个项目
git submodule add <repository> <path> 添加子模块
git submodule init 初始化子模块
git submodule update 更新子模块
git submodule foreach git pull 拉取所有子模块
```

关于git submodule的不错的文章：[Git--子模块（submodule）介绍_git submodule_worthsen的博客-CSDN博客](https://blog.csdn.net/qq_38880380/article/details/123288706)
