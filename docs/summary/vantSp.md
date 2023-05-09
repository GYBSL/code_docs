---
title: Vant实现屏幕适配
order: 2
toc: content
group: 
  title: 编程总结
  order: 2
---

# Vant 实现屏幕适配

自动让所有 px 转成 rem ( 以后我们可以直接写px ) 

`webpack` 配合 `postcss` 和 `postcss-pxtorem` 插件就可以翻译 css 代码, 把 px 转 rem 使用

### 使用步骤

 1. 先在项目中使用 `vant` 组件库

    通过 npm 安装

    ```bash
    # Vue 3 项目，安装最新版 Vant
    npm i vant
    
    # Vue 2 项目，安装 Vant 2
    npm i vant@latest-v2
    ```

    可以通过如下方法自动按需引入组件

    ```bash
    # 在基于 vite、webpack 或 vue-cli 的项目中使用 Vant 时，可以使用 unplugin-vue-components 插件，它可以自动引入组件，并按需引入组件的样式。
    
    # 相比于常规用法，这种方式可以按需引入组件的 CSS 样式，从而减少一部分代码体积，但使用起来会变得繁琐一些。如果业务对 CSS 的体积要求不是特别极致，我们推荐使用更简便的常规用法。
    ```

    ```bash
    1. 安装插件
    
    # 通过 npm 安装
    npm i unplugin-vue-components -D
    
    2. 配置插件
    
    # 如果是基于 vite 的项目，在 vite.config.js 文件中配置插件：
    import vue from '@vitejs/plugin-vue';
    import Components from 'unplugin-vue-components/vite';
    import { VantResolver } from 'unplugin-vue-components/resolvers';
    
    export default {
      plugins: [
        vue(),
        Components({
          resolvers: [VantResolver()],
        }),
      ],
    };
    
    # 如果是基于 vue-cli 的项目，在 vue.config.js 文件中配置插件：
    const { VantResolver } = require('unplugin-vue-components/resolvers');
    const ComponentsPlugin = require('unplugin-vue-components/webpack');
    
    module.exports = {
      configureWebpack: {
        plugins: [
          ComponentsPlugin({
            resolvers: [VantResolver()],
          }),
        ],
      },
    };
    
    # 如果是基于 webpack 的项目，在 webpack.config.js 文件中配置插件：
    const { VantResolver } = require('unplugin-vue-components/resolvers');
    const ComponentsPlugin = require('unplugin-vue-components/webpack');
    
    module.exports = {
      plugins: [
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ],
    };
    ```

 2. 下载 `postcss`  `postcss-pxtorem` 

    ```js
    npm i postcss -D
    npm i postcss-pxtorem -D
    ```

 3. 与 src 文件夹同级，就是项目根目录下创建 `postcss.config.js` 这个文件

  填入插件转换的基准值 ，一般情况下都是 37.5 ( 配置如下，全部复制放到这个js文件下即可 )

  ```javascript
  module.exports = {
    plugins: {
      "postcss-pxtorem": {
          //这是基准值，在375px的屏幕变大rem的值会变大，小于这个大小元素的rem值会变小
  		// 能够把所有元素的px单位转成Rem
  		// rootValue: 转换px的基准值。
  		// 例如一个元素宽是75px，则换成rem之后就是2rem。
        	rootValue: 37.5,
        	propList: ["*"],
      },
    },
  };
  ```

 4. 在 src 文件夹中，创建一个 mobile 文件，里面创建一个 `flexible.js` 文件, 粘贴下面的代码然后在`main.js` 中引入这个文件

  `flexible.js` 代码如下：

  ```javascript
  // 首先是一个立即执行函数，执行时传入的参数是 window 和 document
  (function flexible (window, document) {
      var docEl = document.documentElement // 返回文档的root元素
      var dpr = window.devicePixelRatio || 1 
      // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值
  
      // 调整body标签的fontSize，fontSize = (12 * dpr) + 'px'
      // 设置默认字体大小，默认的字体大小继承自body
      function setBodyFontSize () {
          if (document.body) {
              document.body.style.fontSize = (12 * dpr) + 'px'
          } else {
              document.addEventListener('DOMContentLoaded', setBodyFontSize)
          }
      }
      setBodyFontSize();
  
      // set 1rem = viewWidth / 10
      // 设置root元素的fontSize = 其clientWidth / 10 + ‘px’
      function setRemUnit () {
          var rem = docEl.clientWidth / 10
          docEl.style.fontSize = rem + 'px'
      }
      // 移动端的适配如何做
      // (1): 所有的css单位, rem    (vscode可以自动把px转成rem, pxtorem插件设置基准值37.5) - 1rem等于37.5px
      //  原理: rem要根据html的font-size换算
      //  目标: 网页宽度变小, html的font-size也要变小, ...网页变大, html的font-size变大.
      // (2): flexible.js (专门负责当网页宽度改变, 会修改html的font-size)
  
      setRemUnit()
  
      // 当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
      window.addEventListener('resize', setRemUnit)
      // pageshow 是我们重新加载页面触发的事件
      window.addEventListener('pageshow', function(e) {
          // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem 的大小
          if (e.persisted) {
              setRemUnit()
          }
      })
  
      // 检测0.5px的支持，支持则root元素的class中有hairlines
      if (dpr >= 2) {
          var fakeBody = document.createElement('body')
          var testElement = document.createElement('div')
          testElement.style.border = '.5px solid transparent'
          fakeBody.appendChild(testElement)
          docEl.appendChild(fakeBody)
          if (testElement.offsetHeight === 1) {
              docEl.classList.add('hairlines')
          }
          docEl.removeChild(fakeBody)
      }
  }(window, document))
  ```

  `main.js` 代码如下：

  ```javascript
  import './flexible'
  ```

 5. 重新 run 项目, 观察效果
