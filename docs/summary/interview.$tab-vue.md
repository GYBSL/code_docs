---
title: Vue篇
toc: content
---

# 前端高频面试题 Vue 篇

## 1. 谈谈你对vue的理解

官方：Vue是一套用于构建用户界面的**渐进式框架**，Vue的核心库只关注视图层

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-28-1.png)

### 1.1 声明式框架

Vue 的核心特点，用起来简单。那我们就有必要知道**命令式和声明式**的区别!

- 早在 JQ 的时代编写的代码都是命令式的，命令式框架重要特点就是关注过程。
- 声明式框架更加关注结果。命令式的代码封装到了 Vuejs 中，过程靠 vuejs 来实现

声明式代码更加简单，不需要关注实现，按照要求填代码就可以(给上原材料就出结果)

```javascript
-命令式编程:
let numbers = [1,2,3,4,5]
let total = 0
for(let i = 0; i < numbers.length; i++) {
    total += numbers[i] -关注了过程
}
console.log(tota1)

-声明式编程:
let total2 = numbers.reduce(function (memo , current) {
	return memo + current
},0)
console.log(total2)
```

### 1.2 MVVM 模式

说起`MVVM`，就要知道另一个东东那就是`MVC`。为什么要有这些模式呢? 

目的: 职责划分、分层管理.

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-28-2.png)

对于前端而言就是如何将数据同步到页面上，也是借鉴后端思想。

- MVC 模式: `Backbone + underscore + jquery`

  对于前端而言，数据变化无法同步到视图中。需要将逻辑聚拢在controller 层

- MVVM 模式︰映射关系的简化 (隐藏controller)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-28-3.png)

虽然没有完全遵循MVVM模型，但是Vue的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel的缩写) 这个变量名表示 Vue 实例。

### 1.3 采用虚拟DOM

传统更新页面，拼接一个完整的字符串 innerHTML 全部重新渲染，添加虚拟DOM后，可以比较新旧虚拟节点，找到变化再进行更新。虚拟DOM就是一个对象，用来描述真实 DOM 的
https://github.com/vuejs/vue/blob/main/src/core/vdom/vnode.ts

### 1.4 区分编译时(打包)和运行(浏览器)时

- Vue 的渲染核心就是调用渲染（render) 方法将虚拟 DOM 渲染成真实 DOM (缺点就是虚拟DOM编写麻烦)
- 专门写个编译时可以将模板编译成虚拟 DOM (在构建的时候进行编译性能更高，不需要再运行的时候进行编译)

### 1.5 组件化

实现高内聚、低耦合、单向数据流

- 组件化开发能大幅提高应用开发效率、测试性、复用性等;
- 降低更新范围，只重新渲染变化的组件

<TipP>Vue 是一个渐进式的框架，它具有声明式渲染，采用 MVVM 的模式进行数据的绑定渲染，但是又不是完全的 MVVM 模式，它只是借鉴了 MVVM 模式的思想，vue 采用模板语法来操作虚拟 dom，来实现跨平台和减少操作真实 dom 的效果，vue还区分了编译时和运行时，vue也是支持组件化开发的这么一个前端框架。</TipP>

## 2. 谈谈你对SPA的理解?

### 2.1 理解基本概念

- SPA (single-page application) 单页应用，默认情况下我们编写 Vue、React 都只有一个 html 页面，并且提供一个挂载点，最终打包后会再此页面中引入对应的资源。(页面的渲染全部是由 JS 动态进行渲染的)。切换页面时通过监听路由变化，渲染对应的页面 **Client Side Rendering ，客户端渲染CSR**
- MPA (Multi-page application) 多页应用，多个html页面。每个页面必须重复加载 js，css 等相关资源。(服务端返回完整的html，同时数据也可以再后端进行获取一并返回"模板引擎")。多页应用跳转需要整页资源刷新。**Server side Rendering，服务器端渲染 SSR**

如何分清在哪渲染:	HTML是在前端动态生成的“客户端渲染”，在服务端处理好并返回的是"服务端渲染"。

### 2.2 优缺点

|                  | **单页面应用 SPA**   | **多页面应用 MPA**               |
| ---------------- | -------------------- | -------------------------------- |
| 组成             | 一个主页面和页面组件 | 多个完整页面                     |
| 刷新方式         | 局部刷新             | 整页刷新                         |
| SEO 搜索引擎优化 | 无法实现             | 容易实现                         |
| 页面切换         | 速度快，用户体验好   | 切换加载资源，速度慢，用户体验差 |
| 维护成本         | 相对容易             | 相对️复杂                         |

- 用户体验好、快，内容的改变不需要重新加载整个页面，服务端压力小。
- SPA应用不利于搜索引擎的抓取。
- 首次渲染速度相对较慢 (第一次返回空的 html，需要再次请求首屏数据) 白屏时间长。

### 2.3 解决方案

- 静态页面预渲染(Static Site Generation) SSG，在构建时生成完整的 html 页面。(就是在打包的时候，先将页面放到浏览器中运行一下，将 HTML 保存起来)，仅适合静态页面网站。变化率不高的网站
- `SSR + CSR` 的方式，首屏采用服务端渲染的方式，后续交互采用客户端渲染方式。`NuxtJS`

## 3. Vue 为什么需要虚拟DOM?

### 3.1 基本概念

基本上所有框架都引入了虚拟DOM来对真实DOM进行抽象，也就是现在大家所熟知的`VNode`和`VDOM`

- `Virtual DOM` 就是用 js 对象来描述真实 DOM，是对真实 DOM 的抽象，由于直接操作 DOM 性能低但是js 层的操作效率高，可以将 DOM 操作转化成对象操作，最终通过 `diff` 算法比对差异进行更新 DOM（减少了对真实DOM的操作）。
- 虚拟DOM不依赖真实平台环境从而也可以实现跨平台。

### 3.2 补充: VDOM是如何生成的?

- 在 vue 中我们常常会为组件编写模板 - template
- 这个模板会被编译器编译为渲染函数 - render
- 在接下来的挂载过程中会调用 render 函数，返回的对象就是虚拟 dom
- 会在后续的patch过程中进—步转化为真实 dom

### 3.3 再次补充: VDOM如何做diff 的?
- 挂载过程结束后，会记录第一次生成的 VDOM - oldVnode
- 当响应式数据发生变化时，将会引起组件重新 render，此时就会生成新的 VDOM - newVnode
- 使用 oldVnode 与 newVnode 做 diff 操作，将更改的部分应到真实 DOM 上，从而转换为最小量的 dom 操作，高效更新视图。







## 1. Vue响应式原理

### vue2 响应式原理

> 实现原理

- 对象类型: 通过 `object.defineProperty()` 对属性的读取、修改进行拦截(数据劫持)
- 数组类型: 通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了包裹)
  - 如：vue 中对数组的 `push、pop、shift` 等方法重写实现响应式


```js
// 对象实现响应式的原理代码
Object.defineProperty(data,key,{
    get{},
	set{}
})
```

- 问题（vue2中实现响应式的方式任然存在一些问题）
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}



知道了 `vue2` 的响应式原理和存在的问题后，那让我们练一下 `vue2` 响应式的实现案例：

```js
// 源数据
let person = {
    name: "张三",
    age: 23
};

// 创建一个空对象
let p = {};
// 通过 Object.keys 遍历 person 对象
// Object.keys 会返回一个数组，数组中包含传入对象的每个属性名,如 Object.keys(person) 返回：["name","age"]
Object.keys(person).forEach(key=>{
    Object.defineProperty(p,key,{
        // 想要删除 p 中的属性想要配置 configurable 为 true
        configurable: true,
        // 当读取 p 中某个属性时调用 get 方法
        get(){
            console.log(`读取了p的${key}属性`);
            // 返回读取的属性值
        	return person[key];
		},
        // 当修改或者新增 p 中某个属性时调用 set 方法
        set(value){
        	console.log(`${key}属性的值被修改成了${value}，这里可以写更新页面的逻辑了`);
            // 修改person的属性值
        	person[key]=value
        }
    });
})
```

在浏览器控制台中，我们依次访问 `person` 、`p` 对象，打印如下图

当我们读取 `p` 的属性时，会触发 `get` 方法；同理修改 `p` 的属性值时，也会触发 `set` 方法

现在我们知道，在 `set` 方法中封装实现页面更新的代码逻辑就可以实现响应式了

但是 `vue2` 的这种响应式原理任然存在部分缺点

如下图，我们在 `p` 中添加新属性 `sex` 时，并没有触发  `get` 或 `set` 方法，因此也不能触发响应式的逻辑代码

删除某个属性时，同样不会触发  `get` 或 `set` 方法

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue2xysyl.png)



### vue3 响应式原理

> 实现原理:

- 通过`Proxy` (代理): 拦截对 `data` 任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等
- 通过 `Reflect` (反射): 动态对被代理对象的相应属性进行特定的操作



> 这里需要知道 `Reflect` 

**Reflect的概述**

Reflect 将 Object 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty` ），放到 Reflect 对象上

修改某些 Object 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时会抛出一个错误定义成功时返回修改后的对象。而 `Reflect.defineProperty(obj, name, desc)` 在定义属性成功时返回 `true` 失败时返回 `false`。



知道了实现原理和`Reflect`，让我们手撸一下 `vue3` 实现原理案例

```js
// 源数据
let person = {
    name: "张三",
    age: 23
};

// 创建一个 Proxy 的对象，在 Proxy 对象中传入一个源数据和一个对象
const p = new Proxy(person,{
    // 当读取 p 中某个属性时调用 get 方法
    // target形参是指向源数据，propName形参是被读取或者修改的属性名
    get(target,propName){
        console.log(`读取了p的${propName}属性`);
        return Reflect.get(target,propName)
    },
    // 当修改或者新增 p 中某个属性时调用 set 方法
    set(target,propName,value){
        console.log(`修改了p的${propName}属性的值，修改成了${value},可以更新页面了`);
        Reflect.set(target,propName,value)
    },
    // 当删除 p 中某个属性时调用 deleteProperty 方法
    deleteProperty(target,propName){
        console.log(`删除了p的${propName}属性`);
        return Reflect.deleteProperty(target,propName)
    }
});
```



同样，在浏览器控制台中，我们依次访问 `p` 、 `person` 对象，打印如下图

发现 `p` 是一个 `Proxy` 的对象

` vue3` 的这种响应式原理，解决了 `vue2` 对象直接新添加的属性或删除已有属性, 不会触发 `set` 方法，界面不会自动更新的问题

同时，`Reflect` 使代码的健壮性更好


![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue3xysyl.png)
