---
title: Git学习
order: 1
toc: content
nav:
  title: Git使用
  order: 5
---

# Git学习笔记

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git1.png)

可以把一个版本控制系统（缩写VCS）理解为一个“数据库”，在需要的时候，它可以帮你完整地保存一个项目的快照。当你需要查看一个之前的快照（称之为“版本” ）时，版本控制系统可以显示出当前版本与上一个版本之间的所有改动的细节。

# Git和SVN区别

#### SVN集中式

集中式版本控制系统需要找一个服务器作为大本营，所有的代码都需要提交到服务器上进行统一的管理。当你需要对代码进行改动时，需要先从服务器上下载一份拷贝，修改完成之后，还需要上传回服务器。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git2.png)

SVN优缺点 

优点：

1. 管理员也可以轻松掌控每个开发者的权限。 
2. 代码一致性非常高。 
3. 适合开发人数不多的项目开发。 

缺点： 

1. 服务器压力太大，数据库容量暴增。 
2. 如果不能连接到服务器上，基本上不可以工作，看上面第二步，如果服务器不能连接上，就不能提 
3. 交，还原，对比等等

#### Git分布式

在分布式版本控制系统中，大家都拥有一个完整的版本库，不需要联网也可以提交修改，所以中心服务器就显得不那么重要了。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git3.png)

注意：

Git记录版本历史只关心文件数据的整体是否发生变化。Git 不保存文件内容前后变化的差异数据。

Git优缺点

优点：

1. 适合分布式开发，强调个体。
2. 公共服务器压力和数据量都不会太大。
3. 速度快、灵活。
4. 任意两个开发者之间可以很容易的解决冲突。
5. 离线工作。 

缺点：

1. 学习周期相对而言比较长。
2. 不符合常规思维。
3. 易学难精，80/20

# Git工作流程

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git4.png)

#### 四个工作区域

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git5.png)

Workspace： 工作区，就是你平时存放项目代码的地方

Index / Stage： 暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息

Repository： 仓库区（或版本库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本

Remote： 远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换

#### 工作流程

Git的工作流程一般是这样的：

1. 在工作目录中添加、修改文件；
2. 将需要进行版本管理的文件放入暂存区域；
3. 将暂存区域的文件提交到git仓库。

# 环境配置

#### 设置用户信息

```
git config --global user.name "gemingjia"
git config --global user.email "gemingjia@163.com"
```

#### 查看配置信息

```
git config --list
git config user.name
```

注意：

通过上面的命令设置的信息会保存在~/.gitconfig文件中。

# 初始化本地仓库

```shell
mkdir tmp  #创建tmp目录
git init   #初始化这个目录让Git对这个目录开始进行版本控制。
```

提示：

git init 命令会在上述目录中创建一个名为 .git 的隐藏目录，并在其中创建一个版本库。该目录为文件，查看->显示隐藏目录。整个Git的精华都集中在这个目录中了，现在不先讲细节，只是体会一下使用Git的感觉，后续在详细介绍。

# 文件的两种状态

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git6.png)

注意：

Git不关心文件两个版本之间的具体差别，而是关心文件的整体是否有改变，若文件被改变，在添加提交时就生成文件新版本的快照，而判断文件整体是否改变的方法就是用SHA-1算法计算文件的校验和。

#### untracked未跟踪

未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.

#### tracked已跟踪

被纳入版本控制

- `Unmodified`文件已经入库，未修改,，即版本库中的文件快照内容与文件夹中完全一致.。这种类型的文件有两种去处，如果它被修改，而变为`Modified`，如果使用`git rm`移出版本库，则成为`Untracked`文件。
- `Modified`文件已修改，仅仅是修改，并没有进行其他的操作。这个文件也有两个去处，通过`git add`可进入暂存`staged`状态，使用`git checkout` 则丢弃修改过，返回`unmodify`状态，这个`git checkout`即从库中取出文件，覆盖当前修改。
- `Staged`暂存状态。执行`git commit`则将修改同步到库中，这时库中的文件和本地文件又变为一致，文件为`Unmodify`状态。执行`git reset HEAD filename`取消暂存，文件状态为`Modified`。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git7.png)

注意：

- 新建文件--->Untracked
- 使用add命令将新建的文件加入到暂存区--->Staged
- 使用commit命令将暂存区的文件提交到本地仓库--->Unmodified
- 如果对Unmodified状态的文件进行修改---> modified
- 如果对Unmodified状态的文件进行remove操作--->Untracked

#### 查看文件状态命令

```
git status
```

- -s： 简洁输出

# Git命令

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git8.PNG)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git9.png)

#### 查看文件状态命令

```
git status -s
```

#### 文件加入暂存区

```
git add 文件名
```

`git add .` 所有文件加入暂存区

#### 文件取消暂存区命令

```
git reset 文件名
```

#### 文件提交命令

```
git commit -m "提交信息"
```

#### 修改commit记录

要改动Commit记录有几种方式。

- 把.git目录整个删除（不建议）。
- 使用git rebase命令来改动历史记录。
- 先把 Commit用git reset命令删除，整理后再重新Commit。
- 使用--amend参数改动最后一次的Commit。

#### 查看日志

```
git log --oneline
```

参数：

- --graph ： 查看分支合并图
- --oneline : 标记把每一个提交压缩到了一行中

#### 使用--amend参数进行Commit

```
git commit --amend  -m "welcome to facebook"
```

#### 删除文件

```
git rm 文件名
```

用命令会删除暂存区的文件，直接删除不会删除暂存区的文件。

注意：

删除的文件只是删除工作目录的文件，我们的版本库里面还是存在的。 删除文件会把这个文件直接放入暂存区。

#### 恢复被删除的文件或目录

```
git checkout index.html
```

注意：

当使用git checkout命令时，Git 会切换到指定的分支，但如果后面接的是文件名或路径，Git则不会切换分支，而是把文件从.git目录中复制一份到当前的工作目录。更精准地说，这个命令会把暂存区中的内容或文件拿来覆盖工作目录中。

#### 文件添加至忽略列

```shell
# / 表示当前文件所在的目录

# 忽略public下的所有目录及文件
/public/*

#不忽略/public/assets，就是特例的意思，assets文件不忽略
!/public/assets

# 忽略具体的文件
index.class

# 忽略所有的class
*.class

# 忽略 a.class b.class
[ab].class
```

注意：

- \#匹配规则和linux文件匹配一样
- \#以斜杠“/”开头表示目录
- \#以星号“*”通配多个字符
- \#以问号“?”通配单个字符
- \#以方括号“[]”包含单个字符的匹配列表
- \#以叹号“!”表示不忽略(跟踪)匹配到的文件或目录

#### 获取执行过的命令

```
git reflog
```

#### 比较文件差异

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git10.png)

```
git diff [--cached]
```

- ---：标记原始文件
- +++：标记新文件
- @@：两个不同文件版本的上下文行号。
- -： 原始文件删除改行
- +：原始文件增加一行

本地工作区和暂存区的diff信息：`git diff`或者 `git diff file`

暂存区和版本库的diff信息（使用git add 将工作区修改保存到了暂存区后）：`git diff --cached`

版本库中不同commit、分支的diff信息（使用git commit 将暂存区修改提交到了版本库）：`git diff commit1 commit2` 或 `git diff branch1 branch2`

#### 还原文件

对于修改的文件有三种情况：

1. 只是修改了文件，没有任何 Git 操作

```
git checkout -- aaa.txt
```

1. 修改了文件，并提交到暂存区（即编辑之后，gitadd但没有gitadd但没有 git commit -m ....）

```shell
$ git log --oneline   # 可以省略
$ git reset HEAD   # 回退到当前版本
$ git checkout -- aaa.txt   # aaa.txt为文件名
```

1. 修改了文件，并提交到仓库区（即编辑之后，gitadd和gitadd和 git commit -m ....）

```shell
$ git log --oneline   # 可以省略
$ git reset HEAD^   # 回退到上一个版本
$ git checkout -- aaa.txt   # aaa.txt为文件名
```

# Git远程仓库

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git11.png)

#### 添加远程仓库

```
git remote add <项目名称><url>
```

#### 查看远程仓库

```
git remote
```

#### 克隆远程仓库

```
git clone 远程仓库地址url
```

#### 移除无效的远程仓库

```
git remote rm  远程仓库名字
```

此命令只是从本地移除远程仓库的记录，并不会真正影响到远程仓库。

#### 远程仓库_推送

```
git push [remote-name][branch-name]
```

#### 从远程仓库中抓取

```
git fetch
```

注意：

git fetch是从远程仓库获取最新版本到本地仓库，不会自动merge，想看见文件就需要手动进行合并文件 git merge 仓库名/分支。

#### 从远程仓库中拉取

```
git pull
```

注意：

git pull是从远程仓库获取最新版本到本地仓库，会自动merge。

#### 多人协作冲突问题

先pull再push

#### SSH协议推送

配置SSH协议

1. 使用命令ssh-keygen -t rsa生成公钥和私钥

```
ssh-keygen -t rsa
```

注意：

执行完成后在window本地用户.ssh目录(C:\Users\用户名.ssh)下生成如下名称的公钥和私钥。

1. 复制公钥文件内容至服务器上

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git12.png)

 github/gitee添加ssh公钥

### 分支操作

#### 查看分支

```
git branch 
```

参数：

- -r : 列出所有远程分支
- -a ：列出所有本地分支和远程分支

#### 创建分支

```
git branch 分支名字
```

-m 修改分支名字

#### 切换分支

```
git checkout ge1
```

#### 合并分支

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git13.png)

```
git merge ge1
```

切换分支Git干了什么

1. 更新暂存区和工作目录
2. 变更HEAD的位置

#### 删除本地仓库分支

```
git branch -d b1
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git14.png)

#### 恢复删除的分支

```
git branch new_cat 968a614
```

#### 删除远程仓库分支

```
git push 仓库名 -d 分支名字
```



![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git15.png)

#### 列出已有标签

```
git tag
```

#### 创建标签

```
git tag 标签名字
```

#### 查看标签信息

```
git show 标签名
```

#### 标签推送远程仓库

```
git push [remote] [tag]
```

#### 检出标签

新建一个分支，指向某个tag

```
git checkout -b [branch] [tag]
```

#### 删除本地标签

```
git tag -d [tag]
```

#### 删除远程标签

```
git push 仓库名字:refs/tags/标签名字
```

# Git Flow

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git16.png)

解释：

- master 主干分支，开发完成的上线的项目版本
- hotixes 热部署分支，进行主干分支的补丁操作
- release 预部署分支，测试工程师的调用的分支
- develop 开发分支，开发源代码分支
- feature 功能分支，你们调用分支

### Master/Devlop 分支

所有在Master分支上的Commit应该打上Tag，一般情况下Master不存在Commit，Devlop分支基于Master分支创建

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git17.png)

### Feature 分支

Feature分支做完后，必须合并回Develop分支, 合并完分支后一般会删点这个Feature分支，但是我们也可以保留。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git18.png)

### Release 分支

Release分支基于Develop分支创建，打完Release分之后，我们可以在这个Release分支上测试，修改Bug等。同时，其它开发人员可以基于开发新的Feature 发布Release分支时，合并Release到Master和Develop， 同时在Master分支上打个Tag记住Release版本号，然后可以删除Release分支了。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git19.png)

注意：

一旦打了Release分支之后不要从Develop分支上合并新的改动到Release分支。

### Hotfix 分支

hotfix分支基于Master分支创建，开发完后需要合并回Master和Develop分支，同时在Master上打一个tag。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/git20.png)
