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

## 4. 谈一谈对 vue 组件化的理解
`webComponent` 组件化的核心组成:	模板、属性、事件、插槽、生命周期。

组件化好处:	高内聚、可重用、可组合

- 组件化开发能大幅提高应用开发效率、测试性、复用性等;
- 降低更新范围，只重新渲染变化的组件;

补充:

- vue 中的每个组件都有一个渲染函数 `watcher` (vue2)、`effect` (vue3)。
- 数据是响应式的，数据变化后会执行watcher或者effect。
- 组件要合理的划分，如果不拆分组件，那更新的时候整个页面都要重新更新。
- 如果过分的拆分组件会导致watcher、effect产生过多也会造成性能浪费。

## 5.既然 Vue 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 DOM 进行 diff 检测差异?
Vue 内部设计原因导致，vue 设计的是每个组件一个 watcher (渲染 watcher)，没有采用一个属性对应一个 watcher。粒度过低这样会导致大量 watcher 的产生而且浪费内存，如果粒度过低也无法精准检测变化。所以采用 diff 算法＋组件级 swatcher。

## 6. Vue响应式原理

### 6.1 vue2 响应式原理

> 实现原理

- 对象类型: 通过 `object.defineProperty()` 对属性的读取、修改进行拦截(数据劫持)
- 数组类型: 通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了包裹)
  - 如：vue 中对数组的 `push、pop、shift` 等方法重写实现响应式
  - 但是有缺陷：数组的索引和长度的变化是无法监听的


```js
// 对象实现响应式的原理代码
Object.defineProperty(data,key,{
    get{},
	set{}
})
```

手写vue响应式（对象类型）：

```javascript
let obj = {name:'gy',age:23,n:{sex:'男'}}

function defineReactive(target,key,value){
    observe(value)

    Object.defineProperty(target,key,{
        get(){
            return value
        },
        set(newValue){
            if(value!==newValue){
                value==newValue
                observe(newValue)
            }
        }
    })
}

function observe(data){
    if(typeof data !=="object" || data == null){
        return data
    }

    for(let key in data){
        defineReactive(data,key,data[key])
    }
}


observe(obj)
console.log(obj)
```

效果：

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-28-4.png)

手写vue2响应式原理（数组的方法重写原理）：

```javascript
let arr=[1,2,3,4,5]

let oldArray=Array.prototype;
let newArray=Object.create(Array.prototype);// Object.create方法接收两个参数，第一个参数是要继承的原型（也就是说第一个参数会作为原型prototype被挂载，第二个参数也是一个对象，可以对新对象做初始化，第二个参数可省略）

['push','shift','unshift','pop','reverse','sort','splice'].forEach(method=>{
    newArray[method]=(...args)=>{
        console.log('调用了'+method+'方法')
    }
})

function defineReactive(target,key,value){
    observe(value)

    Object.defineProperty(target,key,{
        get(){
            console.log('222');
            return value
        },
        set(newValue){
            console.log(333);
            if(value!==newValue){
                value==newValue
                observe(newValue)
            }
        }
    })
}

function observe(data){
    if(typeof data !=="object" || data == null){
        return data
    }

    // 如果是数组，就将该数组的原型__proto__指向自己重写了方法的数组原型上去
    if(Array.isArray(data)){
        data.__proto__=newArray
    }

    for(let key in data){
        defineReactive(data,key,data[key])
    }
}

observe(arr)
```

效果：

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-29-1.png)

### 6.2 vue2 处理缺陷

- 在vue2的时候使用`defineProperty` 来进行数据的劫持, 需要对属性进行重写添加`getter`及`setter`性能差。
- 当新增属性和删除属性时无法监控变化。需要通过$set、$delete实现
- 数组不采用`defineProperty`来进行劫持（浪费性能，对所有索引进行劫持会造成性能浪费）需要对数组单独进行处理。
- 对于ES6中新产生的Map、Set这些数据结构不支持。

### 6.3 vue3 响应式原理

> 实现原理:

- 通过`Proxy` (代理): 拦截对 `data` 任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等

手写vue3响应式：

```javascript
let obj = {name:'gy',age:23,n:{sex:'男'}}

let handler = {
    get(target,key){
        console.log('取值');
        let temp = target[key]
        if(typeof temp ==="object"){
            return new Proxy(temp,handler)
        }
        return temp
    },
    set(target,key,value){
        console.log('赋值');
        target[key]=value
    }
}

function reactive(target){
    return new Proxy(target,handler)
}

let proxy=reactive(obj)
console.log(proxy)
```

效果：

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-28-5.png)

## 7. vue中如何进行依赖收集?

### 7.1 依赖收集的流程

- 每个属性都拥有自己的`dep`属性，存放他所依赖的`watcher`，当属性变化后会通知自己对应的`watcher`去更新
- 默认在初始化时会调用`render`函数，此时会触发属性依赖收集`dep.depend`
- 当属性发生修改时会触发`watcher`更新`dep.notify`

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/vue-5-29-2.png)

vue2中，在创建vue实例的时候，执行到`$mount` 挂载组件的时候，会给每一个组件对应的创建一个`watcher` ，`watcher`会调用`rander`函数去渲染页面，渲染的过程中会调用一些响应式数据，每个数据的属性都会有一个`dep`属性，这个`dep`会记录组件watcher的全局地址值，如果数据变化了，set方法就会通过dep属性找到并调用notify方法通知对应组件的进行渲染

vue3中也是同理，只不过稍有不同

### 7.2 vue3依赖收集

- vue3中会通过Map结构将属性和`effect`映射起来。

- 默认在初始化时会调用render函数，此时会触发属性依赖收集track 
- 当属性发生修改时会找到对应的effect列表依次执行trigger

## 8. vue. set 方法是如何实现的
vue2中不允许在已经创建的实例上动态添加新的响应式属性；数组的索引和长度的变化也不会被响应式监听

所以 `Vue. set` 可以将对象的属性和数组的索引和长度的变化响应式化

`Vue. set`和 `$set` 是同一个东西

源码如下：

```javascript
export function set(
  target: any[] | Record<string, any>,
  key: any,
  val: any
): any {
  // 1.是开发环境 target 没定义或者是基础类型则报错
  if (__DEV__ && (isUndef(target) || isPrimitive(target))) {
    warn(
      `Cannot set reactive property on undefined, null, or primitive value: ${target}`
    )
  }
  if (isReadonly(target)) {
    __DEV__ && warn(`Set operation on key "${key}" failed: target is readonly.`)
    return
  }
  const ob = (target as any).__ob__
  // 2. 如果是数组 Vue.set(array,1,100); 调用我们重写的splice方法（这样可以通知更新视图）
  if (isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    // when mocking for SSR, array methods are not hijacked
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true)
    }
    return val
  }
  // 3. 如果是对象本身的属性，则直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 4. 如果是Vue实例或根数据data时报错，（更新_data_无意义）
  if ((target as any)._isVue || (ob && ob.vmCount)) {
    __DEV__ &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
    return val
  }
  // 5. 如果不是响应式的也不需要将其定义成响应式属性
  if (!ob) {
    target[key] = val
    return val
  }
  // 6. 将属性定义成响应式的
  defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock)
  if (__DEV__) {
    ob.dep.notify({
      type: TriggerOpTypes.ADD,
      target: target,
      key,
      newValue: val,
      oldValue: undefined
    })
  } else {
    // 通知视图更新
    ob.dep.notify()
  }
  return val
}
```

当我们选择新增属性时，可以考虑使用对象合并的方式实现

```
this.info = {...this.info,...{inewProperty1:1, newProperty2:2...}}
```

## 9. Vue中的v-show 和v-if 怎么理解?
### 9.1 基本概念

- v-if 如果条件不成立不会渲染当前指令所在节点的dom元素
- v-show只是切换当前dom的显示或者隐藏display、opacity、visivibility
- v-show 的实现会记录原有dom节点上的display属性，如果有display属性就会记录其值，如果没有就不会记录，调用v-show时就会在dom上添加display属性，属性值为原来记录的值和none

### 9.2 如何选择

v-if 可以阻断内部代码是否执行，如果条件不成立不会执行内部逻辑

如果页面逻辑在第一次加载的时候已经被确认后续不会频繁更改则采用 v-if

## 10. computed和watch区别
Vue2中有三种watcher(渲染watcher、计算属性watcher、用户watcher)

Vue3中有三种effect(渲染effect 、计算属性effect、用户effect)

### 10.1 computed

- 计算属性仅当用户取值时才会执行对应的方法。
- computed 属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重新执行。
- 计算属性可以简化模板中复杂表达式。
- 计算属性中不支持异步逻辑。
- computed属性是可以再模板中使用的。
- 多次执行会通过dirty变量来控制是否重新执行

### 10.2 watch

watch则是监控值的变化，当值发生变化时调用对应的回调函数。经常用于监控某个值的变化，进行一些操作。(异步要注意竞态问题)

vue3提供了onCleanup函数，让用户更加方便使用也解决了清理问题。

## 11. 解释 ref 和 reactive 区别?

### 11.1 基本概念

ref 和 reactive 是 Vue3 数据响应式中非常重要的两个概念。

- `reactive` 用于处理对象类型的数据响应式。底层采用的是`new Proxy()`，`reactive`中只能处理对象类型的数据，如果嵌套`ref`，则会进行自动拆包，调用不需要 `.value`
- `ref` 通常用于处理基本类型数据的响应式, ref 主要解决原始值的响应式问题。底层采用的是`Object.defineProperty()` 实现的。ref 也可以操作引用类型的数据，底层是通过`new Proxy()` 代理。
