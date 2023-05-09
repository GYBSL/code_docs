---
title: 自动更新gitee pages
order: 3
toc: content
group: 
  title: 编程总结
  order: 3
---


推荐一篇不错的掘金博客 关于`Puppeteer`的 https://juejin.cn/post/6984685772632752164

# 自动更新 gitee pages 脚本

## 1. 新建文件夹

```node
npm init -y 
npm i -s puppeteer@1.8.0
```

`package.json` 中加入如下配置

```json
{
    "dependencies": {
        "puppeteer": "1.8.0"
    },
    "name": "git-update-pages",
    "bin": {
        "update": "index.js"
    }
}
```

## 2. 新建index.js

项目根目录中新建 `index.js` 文件

```javascript
#! /usr/bin/env node
// 此处安装版本为 1.8.0
const puppeteer = require("puppeteer")

// 主要原理在于使用xpath获取html页面dom元素，脚本代替小手自动触发点击事件
async function giteeUpdate() {
  const browser = await puppeteer.launch({
    // 此处可以使用 false 有头模式进行调试, 调试完注释即可
    headless: false
  })
  const page = await browser.newPage()
  await page.goto("https://gitee.com/login")
  
  // 1. 获取账号input，自动输入
  let accountElements = await page.$x('//*[@id="user_login"]') 
  //  🚨需要设置为自己的gitee账户🚨
  await accountElements[0].type("你的gitee账户")
  
  // 2. 获取密码input，自动输入
  let pwdElements = await page.$x('//*[@id="user_password"]')
  // 🚨需要设置自己的gitee密码🚨
  await pwdElements[0].type("你的gitee登录密码")
  
  // 3. 获取登录按钮，触发点击事件
  let loginButtons = await page.$x('//*[@class="git-login-form-fields"]/div[4]/input')
  await loginButtons[0].click()
  
  // 4. 等待登录成功
  await page.waitFor(1000)
  // 🚨需要设置自己的gitee pages页面🚨
  await page.goto("https://gitee.com/gybsl/code_docs/pages")
  
  // 5. 监听触发的确认弹框，并点击确认
  await page.on("dialog", async dialog => {
    console.log("确认更新")
    dialog.accept()
  })
  
  // 6. 点击更新按钮，并弹出确认弹窗
//   网上教程自带的写法，但是触发不了按钮的点击事件，就换成下面的类名获取的了,如果后续页面的dom有变化，可以来这里修改获取更新按钮的方法
//   let updateButtons = await page.$x('//*[@id="pages-branch"]/div[5]')
//   await updateButtons[0].click()
  let updateButtons = await page.$('.update_deploy')
  await updateButtons.click()
  
  //7. 轮询并确认是否更新完毕
  while (true) {
    await page.waitFor(2000)
    try {
      // 获取更新状态标签
      deploying = await page.$x('//*[@id="pages_deploying"]')
      if (deploying.length > 0) {
        console.log("更新中...")
      } else {
        console.log("更新完毕")
        break
      }
    } catch (error) {
      break
    }
  }
  await page.waitFor(500)
  
  // 8.更新完毕，关闭浏览器
  browser.close()
}

giteeUpdate()
```

## 3. 本地使用该npm包

项目根目录运行命令, `npm link` 是本地包调试的命令，执行 `npm link` 会在本地的 c盘中`npm` 中的 `nodemodules` 中添加这个项目的包文件

```node
npm link
```

然后本地使用 `update` 命令就可以了，想自定义命令名的话在 `package.json` 中自行修改 `bin` 字段即可

卸载包, 在项目的根目录中运行 `npm unlink` 即可

```node
npm unlink
```
