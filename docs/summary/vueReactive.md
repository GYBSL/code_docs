---
title: Vue响应式原理
order: 2
toc: content
group: 
  title: 开发总结
  order: 2
---


# Vue响应式原理

## vue2 响应式原理

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



## vue3 响应式原理

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
