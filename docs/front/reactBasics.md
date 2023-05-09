---
title: React 基础
order: 1
toc: content
nav:
  title: 前端
  order: 2
group: 
  title: 前端
  order: 1
---

## 一、React 简介

**一个专注于构建用户界面的 JavaScript 库，和 vue 和 angular 并称前端三大框架**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/react_jj.png)

> React 英文文档：https://reactjs.org/

> React 中文文档：https://zh-hans.reactjs.org/

### React 特点

1. 声明式

   声明式的意思就是写页面 UI 可以跟写 HTML 一样，抛弃了命令式的繁琐

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/react_2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/react_1.png)

2. 组件化

   组件化可以像搭积木一样构建页面，组件化也能够实现代码复用性和可维护性

3. 跨平台

   react 不仅仅可以构建 web 应用，使用 react-native 还可以构建如安卓和 ios 的原生应用，一套代码多个平台


## 二、React安装使用
1. CDN 引入

   和普通的 JS 库或框架一样，React 也可以从 CDN 引入

   React 的 CDN引入需要引入 2 个 JS 库文件，即 react 和 react-dom

   ```javascript
   react (先引入): 
       <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
   
   react-dom (后引入): 
       <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
   ```

2. 脚手架方式创建项目

   - 创建项目

     `$ npx create-react-app 项目名`

   - 启动项目`$ npm start `

3. 项目目录文件说明

   - `src:` 存放的是这个项目的核心内容，也就是我们的主要工作区域。其中，index.js文件是和index.html进行关联的文件的唯一接口

   - `package.json:` 配置文件

   - `public: 文件夹` 

   - `index.html` 项目的入口文件，引用了第三方类库啊，还可以引入cdn

     ```html
     <div id="root"></div> 是项目的总容器，所有的内容存储在这个容器中。这个容器有且只能有一个。
     ```

   - `Robots.txt` 可以对特定网页进行屏蔽

   - `manifest.json` 扩展的配置文件，指明了扩展的各种信息

   - `index.js` 

     ```javascript
     ReactDOM.render()的作用是将的内容渲染到根“root”中去。
     
     document.getElementById(‘root’)中的"root"便是index.html中的"root"了，便是引用页面内容了。在这里，也可以写一些内容(结构,样式,逻辑)是整个项目的根组件
     
     能够引用的原因是文档内容的头部，有import App from ‘./App’;内容，就是为了将App.js的内容引入到index.js文件中。
     ```

   - `App.js`
   
     ```javascript
     import logo from './logo.svg';
     import './App.css';
     
     function App() {
       return (
         <div className="App">
           <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <p>
               Edit <code>src/App.js</code> and save to reload.
             </p>
             <a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
             >
               Learn React
             </a>
           </header>
         </div>
       );
     }
     
     export default App;
     ```
   
     ```javascript
     export default App;是为了将App公开，index.js才能够引用.
     
     return的内容是类似于html结构的内容，就是jsx，jsx语法是react的主要语法。内部的div的className是为了区分html语法的一个类名，这个是div的样式引用。在这个文件中，只能用一个div容器，如果在div的同级目录添加别的内容，便会报错
     
     className=“App”，是引用到App.css的样式。注意，页面内容样式是就近原则，首先用App.css的样式，App.css是组件的样式，index.css是全局的样式。
     ```

### package.json配置信息详解
1. name 字段

   项目工程名称 `"name": ""`

2. version字段

   项目版本号 `"version": ""`

3. private字段

   发布配置 `"private": true` 

   "private":  true 在 package.json中设置，那么npm将拒绝发布它。这是一种防止意外发布私有存储库的方法。

4. dependencies 字段

   dependencies字段指定了项目运行所依赖的模块 

   latest：安装最新版本

5. scripts 字段

   scripts 指定了运行脚本命令的 npm 命令行缩写，比如 start 指定了运行 npm run start 时，所要执行的命令

6. eslintConfig 字段

   Eslint配置
   
   ```javascript
   "eslintConfig": {
       "extends": "react-app",
       "rules":{
           "no-console":1
       }
   }
   
   
   上面代码，配置了不让输出，否则会warning。
   
   “off” 或者 0：关闭规则
   
   “warn” 或者 1：打开规则，并且作为一个警告（不影响exit code）
   
   “error” 或者 2：打开规则，并且作为一个错误（exit code将会是1）
   ```

7. browserslist字段

   ```javascript
   "browserslist": {
       "production": [
           ">0.2%",
           "not dead",
           "not op_mini all"
       ],
       "development": [
           "last 1 chrome version",
           "last 1 firefox version",
           "last 1 safari version"
       ]
   }
   
   browserlist是一个前端项目配置工具，功能是在前端工具之间共享目标环境的浏览信息
   
   比如我们项目构建的时候一般会用到babel，postCss等等，提供了对应的浏览器信息后，他们就会针对浏览器信息采取不同的编译策略。
   ```




## 三、JSX

概念：JSX是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构，是一种js的语法糖

作用：在React中创建HTML结构（页面UI结构）

优势：

```js
1. 采用类似于HTML的语法，降低学习成本，会HTML就会JSX
2. 充分利用JS自身的可编程能力创建HTML结构
```

注意：JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 @babel/plugin-transform-react-jsx 包，用来解析该语法

### JSX中使用js表达式

语法：

```js
let str='world!'
<h1>hello {str}</h1>
```

注意：

```js
if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 {} 中！！
```

### JSX列表渲染

实现：使用数组的 map 方法

```js
const list=[
    {id: 1, name: '小王'},
    {id: 2, name: '小芳'},
    {id: 3, name: '小军'}
];

function APP() {
    return (
        <div className="App">
            <ul>
                {
                    list.map(item => <li key={item.id}>item.name</li>)
                }
            </ul>
        </div>
    )
}

export default App
```

注意点：需要为遍历项添加 key 属性

### JSX条件渲染

实现：可以使用 三元运算符 或   逻辑与(&&)运算符

```js
const flag = true;

function App() {
return (
    <div className="App">
    {/* 条件渲染字符串 */}
    {flag ? 'yes' : 'no'}
    {/* 条件渲染标签/组件 */}
    {flag ? <span>this is a span</span> : null}
    </div>
)
}

export default App
```

### JSX样式处理

行内样式

```js
function App(){
    return (
        <div className="App">
            <span style={{ color: 'red' }}>Hello world!</span>
        </div>
    );
}

export default App
```

行内样式优化

```js
const style = {
    color: '#000000'
}

function App(){
    return (
        <div className="App">
            <span style={ style }>Hello world!</span>
        </div>
    );
}

export default App
```

className类名

```js
//新建一个.css文件
.active{
    color: red;
    font-size: 20px;
}

// 引入.css文件
import './app.css';

// 创建一个变量就可以动态控制类名了
const classFlag = true;

function App(){
    return (
        <div>
            <span className={ classFlag ? 'active' : '' }>Hello jsx</span>
        </div>
    );
}

export default App
```

### JSX需要注意的地方

```js
1、jsx需要并且只能有一个根节点，也可以用<></> (幽灵节点)来当根节点，不会渲染
2、所有标签必须形成闭合，成对闭合或者自闭合都可以
3、属性命名采用驼峰写法，class -> className , for -> htmlFor
4、jsx中如果是多行的话，需要用 () 包裹
```



## 四、react组件基础

### 函数组件

```javascript
//定义函数组件
function Hello(){
    return (
        <div>hello react</div>
    );
}

function App(){
    return (
        <Hello></Hello>
    );
}

export default App
```

#### 规范：

组件的名称 *必须首字母大写* ，react就是通过判断首字母的大小写来确定是组件还是普通html标签

组件必须 *要 return 返回值* ，如果不需要渲染，就返回null

函数名称定义的组件，*可以成对出现也可以自闭和*

### 类组件

```js
import React from 'react';

class Hello extends React.Cmponent{
    render(){
        return <div>我是一个类组件</div>
    }
}

function App () {
    return (
        <div className="App">
            <Hello></Hello>
        </div>
    )
}

export default App
```

同样是要首字母大写

继承 React.Component 父类，从而使用父类中提供的方法或属性

类组件必须提供 render 方法 render 方法必须有返回值，表示该组件的 UI 结构 



## 五、组件的事件绑定

### 函数组件的事件绑定

语法: on + 事件名称 = { 事件处理程序 }  比如：<div onClick={ onClick }></div> 

react事件采用驼峰命名法，比如：onMouseEnter、onFocus 

**普通事件（无传参）**

```js
function Hello() {
    // 定义函数
    const hand = () => {
        console.log("111");
    }

    // 返回绑定点击事件的节点
    return <div onClick={hand}></div>
}
```

**事件对象e**

```js
// 也可以获取事件对象
function Hello(){
    // 事件对象e
    const hand = (e) => {
        console.log(e);
    }

    return <div onClick={ hand }></div>
}
```

**传递额外参数**

```js
function Hello(){
    // 定义方法
    const hand = (e,id) => {
        console.log( e,id );
    }

    // 不能写成{hand(id)}，应该写在一个箭头函数中，然后返回一个携带参数的方法
    return <div onClick={ (e) => hand(e,id) }>Hello function</div>
}
```


### 类组件的事件绑定

```js
import React from "react"

class Hello extends React.Component {
    hand = (e,id) => {
        console.log(e,id);
    }

    render(){
        return (
            <div onClick={ (e) => this.hand(e,id) }>Hit me!</div>
        )
    }
}
```



## 六、组件状态


理解：组件初始化状态 ---> 视图读取渲染初始状态 ---> 状态更新 ---> 视图使用新状态自动更新

### 状态初始化、读取、修改

```js
class Hello extends React.Component{
    // 状态变量一般放在state属性中，state是一个对象，可以存放多个状态
    state = {
        num: 0
    }

    handCount = () => {
        // 通过setState修改状态
        this.setState(){
            num: this.state.num++
        }
    }

    render(){
        // 通过this.state可以读取状态值渲染到页面上
        return <button onClick={ this.handCount }>现在的值为{ this.state.num }</button>
    }
}
```

### 修改状态

修改状态需要通过 setState

```js
// 如：
this.setState({
    num: this.state.num++,
    arr: [...this.state.arr,1,2],
    obj: {
        ...this.state.obj,
        name: '张三'
    },
});
```



## 七、表单处理 和 ref

### 受控表单

组件中的 state 绑定到 input 的 value 上，实现状态和表单 value 数据的一致性（类似 vue 中的双向绑定）

```js
import React from 'react';

class Hello extends React.Component {
  state = {
    values: 'hello input',
  };

  changeValue(e) {
    this.setState({
      values: e.target.value,
    });
  }

  render() {
    return <input value={this.state.values} onChange={changeValue} />;
  }
}

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;
```



### react 中获取 dom 节点

通过 createRef 函数和 ref 实现

```js
import React, { createRef } from 'react';

class Hello extends React.Component {
  domRef = createRef();

  // 通过.current可以获取dom节点的信息 .current.value 是获取的 input 节点的value值
  hand = () => console.log(this.domRef.current.value);

  render() {
    return (
      <>
        <input ref={this.domRef} />
        <button onClick={this.hand}>点我log出获取的dom信息</button>
      </>
    );
  }
}
```



## 八、react组件通信

### react组件常见通信方式

```js
1、子传父、父传子
2、兄弟组件间：自定义事件模式产生技术方法 eventBus  /  通过共同的父组件通信
3、也可以通过状态管理工具 mobx / redux / zustand 实现组件间的通信
```

### 父传子实现

```js
// 代码实现
import React from 'react'

// 函数式子组件
function HelloSon(props){
    return (
        <div>
            子组件1 { props.msg }
        </div>
    )
}

// 类子组件
class HelloClassSon extends React.Component {
    render(){
        return (
            <div>
                <p>这是类组件中的接收父组件传值的方法 --- { this.props.msg }</p>
            </div>
        )
    }
}

// 父组件
class App extends React.Component {
    state = {
        msg: "父传子的实现"
    }

    render(){
        return (
            <>
                <HelloSon msg={ this.state.msg } />
                <HelloClassSon msg={ this.state.msg } />
            </>
        )
    }
}

export default App
```


### 子传父实现

子传父实现的原理就是 父组件定义一个回调函数 一起传给子组件 子组件调用这个回调函数并携带参数 父组件中的回调函数接收传递的参数来修改state中的状态

```js
// 代码实现
import React from 'react'

function HelloSon(){
    hand(){
        props.changeMsg('123456')
    }

    return (
        <div>
            <span>{ props.msg }</span>
            <button onClick={ hand }></button>
        </div>
    )
}

class APP extends React.Component{
    state = {
        msg: "子传父实现"
    }

    changeMsg = (n) => {
        this.setState({
            msg: n
        })
    }

    render(){
        return (
            <HelloSon msg={ this.state.msg } changeMsg={ this.changeMsg } />
        )
    }
}
```


### 兄弟组件之间的传值

思路：利用共同的父组件来实现传值

### 跨组件通信Context

```js
//代码实现
import React,{ createContext } from 'react'

// 1、创建createContext对象
const { Provider,Consumer } = createContext()
```


```js
function conOne(){
    return (
        <conTwo />
    )
}

function conTwo(){
    return (
        <Consumer>
            { value => (
                <div>
                    <span>{ value }</span>
                </div>
            )}
        </Consumer>
    )
}

class App extends React.Component{
    state = {
        msg: "hello context"
    }

    render(){
        return (
            <Provider value={ this.state.msg }>
                <div className='App'>
                    <conOne />
                </div>
            </Provider>
        )
    }
}
   
export default App
```



## 九、react组件children和组件校验

### 组件 children

**children 属性**

表示该组件的子节点，只要组件内部有子节点，props 中就有该属性

其中 children 中可以传递：

```js
1.普通文本
2.普通标签元素
3.函数
4.jsx

import React from 'react'

// 解构chidldren
function Lister({ children }){
    return <div>这是一个组件{children}</div>
}

class App extends React.Component{
    render()  {
        return(
            <Lister>这是传的children子节点</Lister>
        )
    }
}

export default App
```

**传递多个节点**

```js
import React from 'react';

function Listviews({ chialdren }) {
  return (
    <>
      {
        children.map((item) => item) // 通过map遍历传过来的children
      }
    </>
  );
}

class App extends React.Component {
  render() {
    return (
      <Listview>
        // 传多个节点
        <p>这是一个p标签</p>
        <span>这是一个span标签</span>
      </Listview>
    );
  }
}
```

### props 类型校验

为什么要进行类型校验

> 如果组件接收的类型是一个数组的话，传过去的值是一个其他类型的值就会报错，所以要进行类型校验

**实现方法**

1、安装并引入第三方库包文件

 `npm` 方式： `npm i prop-types`

 `yarn` 方式：`yarn add prop-types`

2、导入`prop-types` 包

 `import PropTypes from 'prop-types'`

3、使用 `组件名.propTypes = {}` 给组件添加校验规则

```js
import PropTypes from 'prop-types';

const List = (props) => {
  const arr = props.colors;
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>);
  return <ul>{lis}</ul>;
};

List.propTypes = {
  colors: PropTypes.array,
};
```

### props 校验常用规则

  1. 常见类型：array、bool、func、number、object、string
  2. React元素类型：element
  3. 必填项：isRequired
  4. 特定的结构对象：shape({})

```js
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
})
```

官网文档相关链接：https://reactjs.org/docs/typechecking-with-proptypes.html

### props 校验默认值

给props设置默认值的方法：

1、函数组件中可以直接在接收props解构赋值时设置默认值

```js
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}

// 不传入pageSize属性
<List />
```

2、类组件中使用静态属性声明默认值 static defaultProps = {}

```js
class List extends Component {
  static defaultProps = {
    pageSize: 10
  }
  render() {
    return (
      <div>
        此处展示props的默认值：{this.props.pageSize}
      </div>
    )
  }
}
<List />
```



## 十、生命周期

> 生命周期是组件从创建到挂载页面，到更新，到页面卸载的过程

注意：类组件需要实例化，有生命周期 函数组件不需要实例化，没有生命周期

官网生命周期图解：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/life.png)

### 生命周期 - 挂载阶段

> 组件的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程，注意，只有类组件才有生命周期（类组件 实例化 函数组件 不需要实例化）

挂载阶段的几个钩子函数：

**constructor**

```js
constructor()：构造函数，创建组件时，最先执行，初始化的时候只执行一次

作用：1. 初始化state  2. 创建 Ref 3. 使用 bind 解决 this 指向问题等
```

**getDerivedStateFromProps**

```js
getDerivedStateFromProps(): 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
```

**render**

```js
render(): 每次组件渲染都会触发

作用：渲染UI（注意： 不能在里面调用setState() ）
```

**componentDidMount**

```js
componentDidMount(): 组件挂载（完成DOM渲染）后执行，初始化的时候执行一次

作用：1. 发送网络请求   2.DOM操作
```

### 生命周期 - 更新阶段

> 每当组件的 state 或 props 发生变化时，组件就会更新。
>
> 当组件的 props 或 state 发生变化时会触发更新。

组件更新阶段的钩子函数：

**getDerivedStateFromProps**

```js
getDerivedStateFromProps(): 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
```

**shouldComponentUpdate**

```js
shouldComponentUpdate():当 props 或 state 发生变化时，shouldComponentUpdate() 会在render渲染执行之前被调用。

会返回一个布尔值，指定 React 是否应该继续渲染，默认值是 true， 即 state 每次发生变化组件都会重新渲染。

shouldComponentUpdate() 的返回值用于判断 React 组件的输出是否受当前 state 或 props 更改的影响，当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
```

**render**

```js
每次组件渲染都会触发;
```

**getSnapshotBeforeUpdate**

```js
getSnapshotBeforeUpdate(): 在最近一次渲染输出（提交到 DOM 节点）之前调用。

在 getSnapshotBeforeUpdate() 方法中，我们可以访问更新前的 props 和 state。

getSnapshotBeforeUpdate() 方法需要与 componentDidUpdate() 方法一起使用，否则会出现错误。
```

**componentDidUpdate**

```js
componentDidUpdate(): 组件更新后（DOM渲染完毕）

作用：DOM操作，可以获取到更新后的DOM内容，不要直接调用setState
```

### 生命周期 - 卸载阶段

**componentWillUnmount**

```js
componentWillUnmount(): 组件卸载, 执行清理工作（比如：清理定时器等）
```





## 十一、Hooks

> 一套能够使函数组件更强大，更灵活的“钩子”

React 中的组件分为 类组件 和 函数组件

函数组件是一个更加匹配 React 的设计理念 UI = f(data)，也更有利于逻辑拆分与重用的组件表达形式，而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从 react v16.8 开始，Hooks 应运而生

**注意：**

    1. 有了hooks之后，为了兼容老版本，class类组件并没有被移除，俩者都可以使用
    2. 有了hooks之后，不能在把函数成为无状态组件了，因为hooks为函数组件提供了状态
    3. hooks只能在函数组件中使用

> Hooks 的出现解决了俩个问题 1. 组件的状态逻辑复用 2.class 组件自身的问题

### Hook 的优势

- Hook 使你在无需改变组件结构的情况下复用状态逻辑（自定义 Hook）
- Hook 将组件中互相关联的部分拆分成更小的函数（比如设置订阅或请求数据）
- Hook 使你在非 class 的情况下可以使用更多的 React 特性

### Hook 使用规则

Hook 就是 Javascript 函数，使用它们时有两个额外的规则：

- 只能在函数外层调用 Hook，不要在循环、条件判断或者子函数中调用
- 只能在 React 的函数组件和自定义 Hook 中调用 Hook。不要在其他 JavaScript 函数中调用

### useState

> 作用：useState 为函数组件提供状态（state）

**使用步骤**

1. 导入 useState 函数
2. 调用 useState 函数，并传入状态的初始值
3. 从 useState 函数的返回值中，拿到状态和修改状态的方法
4. 在 JSX 中展示状态
5. 调用修改状态的方法更新状态

**状态的读取和修改**

读取状态

    该方式提供的状态，是函数内部的局部变量，可以在函数内的任意位置使用

修改状态

1. setCount 是一个函数，参数表示最新的状态值
2. 调用该函数后，将使用新值替换旧值
3. 修改状态后，由于状态发生变化，会引起视图变化

注意事项

    修改状态的时候，一定要使用新的状态替换旧的状态，不能直接修改旧的状态，尤其是引用类型

**组件的更新过程**

函数组件使用 useState hook 后的执行过程，以及状态值的变化

- 组件第一次渲染

  1. 从头开始执行该组件中的代码逻辑
  2. 调用 `useState(0)` 将传入的参数作为状态初始值，即：0
  3. 渲染组件，此时，获取到的状态 count 值为： 0

- 组件第二次渲染

  1. 点击按钮，调用 `setCount(count + 1)` 修改状态，因为状态发生改变，所以，该组件会重新渲染
  2. 组件重新渲染时，会再次执行该组件中的代码逻辑
  3. 再次调用 `useState(0)`，此时 React 内部会拿到最新的状态值而非初始值，比如，该案例中最新的状态值为 1
  4. 再次渲染组件，此时，获取到的状态 count 值为：1

```js
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  // 在这里可以进行打印测试
  console.log(count);
  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </button>
  );
}
export default App;
```

注意：useState 的初始值(参数)只会在组件第一次渲染时生效。也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件会记住每次最新的状态值

**使用规则**

useState 函数可以执行多次，每次执行互相独立，每调用一次为函数组件提供一个状态

```js
function List() {
  // 以字符串为初始值
  const [name, setName] = useState('cp');
  // 以数组为初始值
  const [list, setList] = useState([]);
}
```

useState 注意事项

1. 只能出现在函数组件或者其他 hook 函数中
2. 不能嵌套在 if/for/其它函数中（react 按照 hooks 的调用顺序识别每一个 hook）
3. 可以通过开发者工具查看 hooks 状态

```js
//错误示范
let num = 1;
function List() {
  num++;
  if (num / 2 === 0) {
    const [name, setName] = useState('cp');
  }
  const [list, setList] = useState([]);
}
// 俩个hook的顺序不是固定的，这是不可以的！！！
```

### useEffect

**1. 理解函数副作用**

什么是副作用：

> 副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）

常见的副作用

1. 数据请求 ajax 发送
2. 手动修改 dom
3. localstorage 操作

`useEffect` 函数的作用就是为 react 函数组件提供副作用处理的！

**2. 基础使用**

作用：为 react 函数组件提供副作用处理

使用步骤：

1. 导入 useEffect 函数
2. 调用 useEffect 函数，并传入回调函数
3. 在回调函数中编写副作用处理（dom 操作）
4. 修改数据状态
5. 检测副作用是否生效

代码实现

```js
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // dom操作
    document.title = `当前已点击了${count}次`;
  });
  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </button>
  );
}

export default App;
```

**3. 依赖项控制执行时机**

1. 不添加依赖项

```js
// 组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行
// 组件初始渲染
// 组件更新 （不管是哪个状态引起的更新）

useEffect(() => {
  console.log('副作用执行了');
});
```

2. 添加空数组

```js
// 组件只在首次渲染时执行一次

useEffect(() => {
  console.log('副作用执行了');
}, []);
```

3. 添加特定依赖项

```js
// 副作用函数在首次渲染时执行，在依赖项发生变化时重新执行

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('zs');

  useEffect(() => {
    console.log('副作用执行了');
  }, [count]);

  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      <button
        onClick={() => {
          setName('cp');
        }}
      >
        {name}
      </button>
    </>
  );
}
```

注意事项

`useEffect` 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有 bug 出现

**4. 清理副作用**

```
如果想要清理副作用 可以在副作用函数中的末尾return一个新的函数，在新的函数中编写清理副作用的逻辑
注意执行时机为：
1. 组件卸载时自动执行
2. 组件更新时，下一个useEffect副作用函数执行之前自动执行
```

```js
import { useEffect, useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      // 用来清理副作用的事情
      clearInterval(timerId);
    };
  }, [count]);
  return <div>{count}</div>;
};

export default App;
```



## 十二、Hooks 进阶

### useState - 回调函数的参数

**使用场景**

参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用

语法

```js
const [name, setName] = useState(() => {
  // 编写计算逻辑    return '计算之后的初始值'
});
```

**语法规则**

1. 回调函数 return 出去的值将作为 name 的初始值
2. 回调函数中的逻辑只会在组件初始化的时候执行一次

**语法选择**

1. 如果就是初始化一个普通的数据 直接使用 useState(普通数据) 即可
2. 如果要初始化的数据无法直接得到需要通过计算才能获取到，使用 useState(()=>{})

**使用示例**

```js
import { useState } from 'react';

function Counter(props) {
  const [count, setCount] = useState(() => {
    return props.count;
  });
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

function App() {
  return (
    <>
      <Counter count={10} />
      <Counter count={20} />
    </>
  );
}

export default App;
```

### useEffect - 发送网络请求

**使用场景**

在 useEffect 中发送网络请求，并且封装同步 async await 操作

**语法要求**

不可以直接在 useEffect 的回调函数外层直接包裹 await ，因为异步会导致清理函数无法立即返回

```js
useEffect(async () => {
  const res = await axios.get('http://xxx.net');
  console.log(res);
}, []);
```

**正确写法**

在内部单独定义一个函数，然后把这个函数包装成同步

```js
useEffect(()=>{
    async function fetchData(){
       const res = await axios.get('http://geek.itheima.net/v1_0/channels')                            console.log(res)
    }
},[])
```

### useRef

**使用场景**

在函数组件中获取真实的 dom 元素对象或者是组件对象

**使用步骤**

1. 导入 useRef 函数
2. 执行 useRef 函数并传入 null，返回值为一个对象 内部有一个 current 属性存放拿到的 dom 对象（组件实例）
3. 通过 ref 绑定 要获取的元素或者组件

```js
import { useEffect, useRef } from 'react';
function App() {
  const h1Ref = useRef(null);
  useEffect(() => {
    console.log(h1Ref);
  }, []);
  return (
    <div>
      <h1 ref={h1Ref}>this is h1</h1>
    </div>
  );
}
export default App;
```

**获取组件实例**

函数组件由于没有实例，不能使用 ref 获取，如果想获取组件实例，必须是类组件

```js
//Foo.js
class Foo extends React.Component {
    sayHi = () => {
        console.log('say hi')
    }
    render(){
        return <div>Foo</div>
    }
}

export default Foo



//App.js
import { useEffect, useRef } from 'react'
import Foo from './Foo'

function App() {
    const h1Foo = useRef(null)
    useEffect(() => {
        console.log(h1Foo)
    }, [])
    return (
        <div> <Foo ref={ h1Foo } /></div>
    )
}
export default App
```

### useContext

**实现步骤**

1. 使用 createContext 创建 Context 对象
2. 在顶层组件通过 Provider 提供数据
3. 在底层组件通过 useContext 函数获取数据

**代码实现**

```js
import { createContext, useContext } from 'react';
// 创建Context对象
const Context = createContext();

function Foo() {
  return (
    <div>
      Foo <Bar />
    </div>
  );
}

function Bar() {
  // 底层组件通过useContext函数获取数据
  const name = useContext(Context);
  return <div>Bar {name}</div>;
}

function App() {
  return (
    // 顶层组件通过Provider 提供数据
    <Context.Provider value={'this is name'}>
      <div>
        <Foo />
      </div>
    </Context.Provider>
  );
}

export default App;
```



## 十三、React-Router

**1、安装路由依赖**

```js
# 安装react-router包
$ yarn add react-router-dom@6
```

**2、基础使用**

实现步骤：

1. 导入必要的路由 router 内置组件
2. 创建 React 组件
3. 按照路由的规则进行路由配置

```js
// 引入必要的内置组件
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 准备俩个路由组件

const Home = () => <div>this is home</div>;
const About = () => <div>this is about</div>;

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        //路由出口
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

**3. 核心内置组件说明**

1. BrowerRouter

> 作用: 包裹整个应用，一个 React 应用只需要使用一次

> 模式: HashRouter( 哈希模式 ) BrowerRouter( history 模式 )

2. Link

> 作用: 用于指定导航链接，完成声明式的路由跳转 类似于 `<router-link/>`

这里 to 属性用于指定路由地址，表示要跳转到哪里去，Link 组件最终会被渲染为原生的 a 链接

3. Routes

> 作用: 提供一个路由出口，组件内部会存在多个内置的 Route 组件，满足条件的路由会被渲染到组件内部类比 router-view

4. Route

> 作用: 用于定义路由路径和渲染组件的对应关系 [element：因为 react 体系内 把组件叫做 react element]

其中 path 属性用来指定匹配的路径地址，element 属性指定要渲染的组件

**4. 编程式导航**

声明式 【 Link to】 vs 编程式 【调用路由方法进行路由跳转】

概念: 通过 js 编程的方式进行路由页面跳转，比如说从首页跳转到关于页

实现步骤：

1. 导入一个 useNavigate 钩子函数
2. 执行 useNavigate 函数 得到 跳转函数
3. 在事件中执行跳转函数完成路由跳转

```js
// 导入useNavigate函数
import { useNavigate } from 'react-router-dom';
const Home = () => {
  // 执行函数
  const navigate = useNavigate();
  return (
    <div>
      Home
      <button onClick={() => navigate('/about')}> 跳转关于页 </button>
    </div>
  );
};

export default Home;
```

注: 如果在跳转时不想添加历史记录，可以添加额外参数 replace 为 true

```js
navigate('/about', { replace: true });
```

**5. 路由传参**

> 场景：跳转路由的同时，有时候要需要传递参数

1.searchParams 传参

    路由传参:
    
    ```js
    navigage('/about?id=1')
    ```
    
    路由取参:
    
    ```js
    let [params] = useSearchParams()
    let id = params.get('id')
    ```

2.params 传参

    路由传参:
    
    ```js
    navigage('/about/111')
    ```
    
    路由取参:
    
    ```js
    let [params] = useParams()
    let id = params.id
    ```

**6. 嵌套路由**

实现步骤：

1. App.js 中定义嵌套路由声明
2. Layout 组件内部通过 `<Outlet/>` 指定二级路由出口

```js
// 1- App.js组件中定义路由嵌套关系

<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="board" element={<Board />} />
    <Route path="article" element={<Article />} />
  </Route>
  {/* 省略部分  */}
</Routes>
```

```js
2- Layout.js组件中使用 Outlet 组件添加二级路由出口

import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      layout
      { /* 二级路由的path等于 一级path + 二级path  */ }
      <Link to="/board">board</Link>
      <Link to="/article">article</Link>
      { /* 二级路由出口 */ }
      <Outlet/>
    </div>
  )
}
export default Layout
```

**7. 默认二级路由**

场景: 应用首次渲染完毕就需要显示的二级路由

实现步骤:

1. 给默认二级路由标记 index 属性
2. 把原本的路径 path 属性去掉

```js
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Board />} />
    <Route path="article" element={<Article />} />
  </Route>
</Routes>
```

**8. 404 路由配置**

> 场景：当 url 的路径在整个路由配置中都找不到对应的 path，使用 404 兜底组件进行渲染

```js
// 1- 准备一个NotFound组件
const NotFound = () => {
  return <div>this is NotFound</div>;
};

export default NotFound;
```

```js
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Board />} />
      <Route path="article" element={<Article />} />
    </Route>
    // 通配符* 捕获404路由
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
</BrowserRouter>
```

**9. 集中式路由配置**

> 场景: 当我们需要路由权限控制点时候, 对路由数组做一些权限的筛选过滤，所谓的集中式路由配置就是用一个数组统一把所有的路由对应关系写好替换 本来的 Roues 组件

```js
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';

import Layout from './pages/Layout';
import Board from './pages/Board';
import Article from './pages/Article';
import NotFound from './pages/NotFound';

// 1. 准备一个路由数组 数组中定义所有的路由对应关系
const routesList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: 'article',
        element: <Article />,
      },
    ],
  },
  // 增加n个路由对应关系
  {
    path: '*',
    element: <NotFound />,
  },
];

// 2. 使用useRoutes方法传入routesList生成Routes组件
function WrapperRoutes() {
  let element = useRoutes(routesList);
  return element;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 3. 替换之前的Routes组件 */}
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
```



## 十四、Mobx

> 一个可以和 React 良好配合的集中状态管理工具，和 Redux 解决的问题相似，都可以独立组件进行集中状态管理

**优势**

1. `简单` 编写无模板的极简代码精准描述你的意图
2. `轻松实现最优渲染` 依赖自动追踪，实现最小渲染优化
3. `架构自由` 可移植, 可测试 无特殊心智负担

**2. 配置开发环境**

> Mobx 是一个独立的响应式的库，可以独立于任何 UI 框架存在，但是通常大家习惯把它和 React 进行绑定使用，用 Mobx 来做响应式数据建模，React 作为 UI 视图框架渲染内容，我们环境的配置需要三个部分

1. 一个 create-react-app 创建好的 React 项目环境
2. mobx 框架本身
3. 一个用来链接 mobx 和 React 的中间件

```base
# 创建项目
$ yarn create vite react-mobx --template react

# 安装mobx和中间件工具 mobx-react-lite  只能函数组件中使用
$ yarn add  mobx  mobx-react-lite
```

**3. 基础使用**

1. 初始化 mobx

   初始化步骤:

   1. 定义数据状态 state
   2. 在构造器中实现数据响应式处理 makeAutoObservble
   3. 定义修改数据的函数 action
   4. 实例化 store 并导出

```js
import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0; // 定义数据
  constructor() {
    makeAutoObservable(this); // 响应式处理
  }
  // 定义修改数据的方法
  addCount = () => {
    this.count++;
  };
}

const counter = new CounterStore();
export default counter;
```

2. React 使用 store

   实现步骤:

   1. 在组件中导入 counterStore 实例对象
   2. 在组件中使用 storeStore 实例对象中的数据
   3. 通过事件调用修改数据的方法修改 store 中的数据
   4. 让组件响应数据变化

```js
// 导入counterStore
import counterStore from './store';
// 导入observer方法
import { observer } from 'mobx-react-lite';
function App() {
  return (
    <div className="App">
      <button onClick={() => counterStore.addCount()}>{counterStore.count}</button>
    </div>
  );
}
// 包裹组件让视图响应数据变化
export default observer(App);
```

**4. 计算属性（衍生状态）**

> 概念: 有一些状态根据现有的状态计算（衍生）得到，我们把这种状态叫做计算属性

```base
实现步骤:

1. 生命一个存在的数据
2. 通过get关键词 定义计算属性
3. 在 makeAutoObservable 方法中标记计算属性
```

```js
// counterStore.js

import { computed, makeAutoObservable } from 'mobx';

class CounterStore {
  list = [1, 2, 3, 4, 5, 6];
  constructor() {
    makeAutoObservable(this, {
      filterList: computed,
    });
  }
  // 修改原数组
  changeList = () => {
    this.list.push(7, 8, 9);
  };
  // 定义计算属性
  get filterList() {
    return this.list.filter((item) => item > 4);
  }
}

const counter = new CounterStore();

export default counter;
```

```js
// app.js

// 导入counterStore
import counterStore from './store';
// 导入observer方法
import { observer } from 'mobx-react-lite';
function App() {
  return (
    <div className="App">
      {/* 原数组 */}
      {JSON.stringify(counterStore.list)}
      {/* 计算属性 */}
      {JSON.stringify(counterStore.filterList)}
      <button onClick={() => counterStore.changeList()}>change list</button>
    </div>
  );
}
// 包裹组件让视图响应数据变化
export default observer(App);
```

**5. 异步数据处理**

```base
实现步骤:

1. 在mobx中编写异步请求方法 获取数据 存入state中
2. 组件中通过 useEffect + 空依赖  触发action函数的执行
```

```js
// channelStore.js

// 异步的获取

import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class ChannelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }
  // 只要调用这个方法 就可以从后端拿到数据并且存入channelList
  setChannelList = async () => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels');
    this.channelList = res.data.data.channels;
  };
}
const channlStore = new ChannelStore();
export default channlStore;
```

```js
// App.js

import { useEffect } from 'react';
import { useStore } from './store';
import { observer } from 'mobx-react-lite';
function App() {
  const { channlStore } = useStore();
  // 1. 使用数据渲染组件
  // 2. 触发action函数发送异步请求
  useEffect(() => {
    channlStore.setChannelList();
  }, []);
  return (
    <ul>
      {channlStore.channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
// 让组件可以响应数据的变化[也就是数据一变组件重新渲染]
export default observer(App);
```

**6. 模块化**

> 场景: 一个项目有很多的业务模块，我们不能把所有的代码都写到一起，这样不好维护，提了提供可维护性，需要引入模块化机制

```base
实现步骤:

1. 拆分模块js文件，每个模块中定义自己独立的state/action
2. 在store/index.js中导入拆分之后的模块，进行模块组合
3. 利用React的context的机制导出统一的useStore方法，给业务组件使用
```

```js
// 1- 定义task模块

import { makeAutoObservable } from 'mobx';

class TaskStore {
  taskList = [];
  constructor() {
    makeAutoObservable(this);
  }
  addTask() {
    this.taskList.push('vue', 'react');
  }
}

const task = new TaskStore();

export default task;
```

```js
// 2- 定义counterStore

import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0;
  list = [1, 2, 3, 4, 5, 6];
  constructor() {
    makeAutoObservable(this);
  }
  addCount = () => {
    this.count++;
  };
  changeList = () => {
    this.list.push(7, 8, 9);
  };
  get filterList() {
    return this.list.filter((item) => item > 4);
  }
}

const counter = new CounterStore();

export default counter;
```

```js
// 3- 组合模块导出统一方法

import React from 'react';

import counter from './counterStore';
import task from './taskStore';

class RootStore {
  constructor() {
    this.counterStore = counter;
    this.taskStore = task;
  }
}

const rootStore = new RootStore();

// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);
// useStore() =>  rootStore  { counterStore, taskStore }

export { useStore };
```

```js
// 4- 组件使用模块中的数据

import { observer } from 'mobx-react-lite';
// 导入方法
import { useStore } from './store';
function App() {
  // 得到store
  const store = useStore();
  return (
    <div className="App">
      <button onClick={() => store.counterStore.addCount()}>{store.counterStore.count}</button>
    </div>
  );
}
// 包裹组件让视图响应数据变化
export default observer(App);
```

**7. 多组件共享数据**

> 目标：当数据发生变化 所有用到数据的组件都会得到同步的组件的更新
>
> 实现步骤：在 Foo 组件和 Bar 组件中分别使用 store 中的数据，然后在 app 组件中进行数据修改，查看 Foo 组件和 Bar 组件是否得到更新

```js
// Bar.jsx

// 用taskStore中的taskList数据
import { useStore } from './store';
import { observer } from 'mobx-react-lite';
const Bar = () => {
  const { taskStore } = useStore();
  return (
    <ul>
      {taskStore.taskList.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

export default observer(Son);
```

```js
// Foo.jsx

// 用taskStore中的taskList数据
import { useStore } from './store';
import { observer } from 'mobx-react-lite';
const Bar = () => {
  const { taskStore } = useStore();
  return (
    <ul>
      {taskStore.taskList.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

export default observer(Son);
```

```js
// App.jsx

import Bar from './Bar';
import Foo from './Foo';
import { useStore } from './store';
function App() {
  const { taskStore } = useStore();
  return (
    <div className="App">
      <Bar />
      <button onClick={() => taskStore.setTaskList('angular')}>修改taskStore</button>
    </div>
  );
}
export default App;
```
