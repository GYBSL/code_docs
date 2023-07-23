---
title: TypeScript
order: 2
toc: content
group:
  title: 前端
  order: 2
---

# TypeScript 基础笔记

## 1. 八种内置类型

```javascript
let str: string = "gy";
let num: number = 24;
let bool: boolean = false;//这里接收的是布尔值，不是布尔值对象(let b:boolean = new Boolean())
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me");
```

## 2. null 和 undefined

默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给其他类型。

```javascript
// null 和 undefined 赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me");
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint = 100n;
big = null
big= undefined
```

如果你在 `tsconfig.json` 指定了 `"strictNullChecks":true` ， null 和 undefined 只能赋值给 void 和它们各自的类型。

## 3. number 和 bigint

虽然 number 和 bigint 都表示数字，但是这两个类型不兼容

```javascript
let big: bigint = 100n;
let num: number = 6;
big = num;
num = big;
```

会抛出一个类型不兼容的 ts (2322) 错误

## 4. 任意类型 any

```javascript
let anys:any = "ddd"
anys = []
anys = 18
anys = {}
anys = Symbol('666')
//any类型就跟原生的是一样的，能够给任意的类型进行定义，所以在在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型 )。
```

作用的地方： 

1. 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 

   这种情况下，我们不希望类型检查器对 这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any 类型来标记这些变量 

2. 在对现有代码进行改写的时候， any 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 

   你可能认为 Object 有相似的作用，就像它在其它语言中那样。 但是 Object 类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法

3. 当你只知道一部分数据的类型时， any 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据

## 5. unknown类型

unknow 类型比 any 类型更安全

就像所有类型都可以被归为 any ，所有类型也都可以被归为 unknown 。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种的 any)

```javascript
let unknow:unknown = {a:():number =>123}
unknow.a()	//报错

// unkonwn类型是不能够去调用属性跟函数的，它是 any 类型对应的安全类型
```

unknown 不能赋值给其他任何类型的变量，除非赋值给 unknown 或 any 类型的变量

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/ts-23-7-22-1.png)

当进行了类型断言或者类型推断后就可以赋值给其他任意类型的变量

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/ts-23-7-22-2.png)

## 6. 接口和对象类型

在 typescript 中，我们定义对象的方式要用关键字 interface（接口），使用 interface 来定义一种约束，让数据的结构满足约束的格式。 

### interface类型

```typescript
interface A{
	readonly name:string,	//这个readonly是只读属性，意思就是说只能读取，不能将其他值赋值给
他
	age?:number		//这个问号就是可选的意思，条件稍微宽松了一些，下面引用这个age的话有没有这个属性都可以，不会报错
}

let obj:A = {
	name = "iii",	//这里如果不写name就会报错，因为我们在上面定义了A类型集合，并且在这个变量中引入了(里面必须要有name属性且类型为字符串)
	age = 18
}
```

注意：这个规定的属性不能多也不能少

### 可选属性 ? 操作符

```typescript
interface A{
    readonly name:string,
    age?:number//这个问号就是可选的意思，条件稍微宽松了一些，下面引用这个age的话有没有这个属性都可以，不会报错
}

let obj:A = {
    name = "小满嗷嗷叫",
    age = 18 //age写不写无所谓
}
```

### 任意属性 [propName:string]

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

```typescript
interface Person{
    name:string,
    age?:number,
    [propName:stirng]:string|number	//这个属性一旦定义了，引用这个Person的对象就能够写入任意属性，属性的形式主要看冒号后面你定义了什么类型，比如在这里定义的类型就是string和number类型，不是这两者的类型就会报错，包括在Person里面定义除了string跟number之外其他类型也会报错
    //可以理解为这个 [propName:stirng]任意属性的优先度相当高
    // 注意string与number中间的 `|` 符号，这是联合类型，后面笔记会写，这里就当作将string和number类型关系到了一块，有点像逻辑或，满足联合起来的其中一个条件都行，两个也可以
}
```

### 只读属性 readonly

只读属性必须在声明时或构造函数里被初始化。

```typescript
interface A{
    readonly name:string	//这个readonly是只读属性，意思就是说只能读取，不能将其他值赋值给他
}

let obj:A = {
    name = "aaa"
}

obj.name = "bbb"	//报错
console.log(obj)	//能够读取

let name1 = obj.name
console.log(name1)
```

### 继承属性 extends

```typescript
interface A{
    name:string
}
interface B extends A{
    age:number
}
let p:B{
    name:"yyy"
    age:88	//两种类型都要写
}
```

## 7. 数组类型

普通的声明方式

```typescript
//类型加中括号
let arr:number[] = [123]

//这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']

//操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
let arr:number[] = [1,2,3,4];//数字类型的数组
let arr2:string[] = ["1","2","3","4"];//字符串类型的数组
let arr3:any[] = [1,"2",true,undefined,[],{}];//任意类型的数组
let arr4:number[][][] = [[[]],[[]],[[]]]

//这个也能够决定你二维数组还是三维数组想要套几层就写几层
```

## 8. 泛型 Array <类型>

规则 Array <类型>

```typescript
let arr1:Array<number> = [1,2,3,4,5]
let arr2:Array<string> = ["1,2,3,4,5"]
let arr3:Array<boolean> = [true]

//泛型数组套娃写法(还能够决定数组里面数组的类型之类的)
let arr4:Array<Array<number>> = [[123],[456]]
```

## 9. 类数组 arguments

是所有参数的一个集合

```typescript
function Arr(...args:any):void{		//...args为ES6的解构方式，任意类型，不能有返回值
    console.log(arguments)	//	输出{'0':4,'1':56,'2':789}
    let arr:number[] = arguments	//会报错，报缺少类型number[]的以下属性：pop,push,concat,join
    let arr:IArguments = arguments//解决方法
    //其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
}

Arr(4,56,789)
```

## 10. 接口表示数组

一般用来描述类数组

```typescript
interface ArrNumber {
    [index: number]: number;	//后面的才是定义类型的
    //[index: number]: string;	这个就是定义字符串的了
}
let Arr: ArrNumber = [1, 2, 3, 4, 5];
//let Arr: ArrNumber = ["1", "2", "3", "4", "5"];
//表示：只要索引的类型是数字时，那么值的类型必须是数字。
```

## 11. 函数扩展

函数内参数类型也是可以定义的

```typescript
const fn(name:string,age:number):string{
    return name + age
}
let a = fn('iii',10000)
console.log(a)	//iii10000

// 默认参数
const fn(name:string,age:number = 666):string{
    return name + age
}
let a = fn('iii')
console.log(a)	//iii666

// ?操作符，age传不传就变成可选的了
const fn(name:string,age?:number = 666):string{
    return name + age
}
let a = fn('iii')
console.log(a)	// iii
```

## 12. 对象形式的定义

跟定义对象差不多，但是在针对多个参数的时候会更加的方便，且记得引用的时候要写成({xxxx}) 形式，不然会报错，输出的是数组形式的

```typescript
interface User{
    name:string;
    age:number
}

const fn(user:User):User{
    return user
}

let a = fn({
    name:"iii",
    age:18
})
console.log(a)	// {name:'iii',age:18}
```

## 13. 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。 

如果参数类型不同，则参数类型应设置为 any。 

参数数量不同你可以将不同的参数设置为可选。

为了让编译器能够选择正确的检查类型，它与 JavaScript 里的处理流程相似。 

它查找重载列表， 尝试使用第一个重载定义。

如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

```typescript
// 第一套规则
function fn(params:number):void	{
    console.log(params)
}

// 第二套规则
function fn(params:string,params2:number):void{
    console.log(params)
    console.log(params2)
}

function fn(params:any,params?:any):void{
    console.log(params)
    console.log(params2)
}

let a = fn(1,1)

let a = fn("1",1)
//输出"1"跟1，遵循的是第二套规则
```

## 14. 联合类型|类型断言|交叉类型

### 联合类型

联合类型能够让我们可选我们自己需要的类型部分，如果需要的类型超过或者达到2个，那就可以 使用。 

那为什么不使用any呢？那是因为我们需要的并不是所有类型都能通过，我只希望这两个或者3个 类型能够通过，如果需要的类型超过或着达到两个都使用any的话，那就和JavaScript原生没有区别了

```typescript
let myPhone: number | string = '010-820'

//这样写是会报错的应为我们的联合类型只有数字和字符串并没有布尔值
let myPhone: number | string = true//报错
```

### 函数使用联合类型

```typescript
let fn = function(type:number):boolean {
    return !!type	//将type强行转化为布尔值类型，如果没用进行转化的话是会报错的
}

let fn = function(type:number|boolean):boolean {
    return !!type	//将type强行转化为布尔值类型，如果没用进行转化的话是会报错的
}

let result = fn(1)
console.log(result);//true
```

### 交叉类型

多种类型的集合，联合对象将具有所联合类型的所有成员

```typescript
interface Pople{
    name:string
    age:number
}

interface Man{
    sex:number
}

const p = (man:Pople & Man):void => {
    //这里通过了&将Pople跟Man交叉在了一起，则man需要处理Pople也要处理Man。还可以继续跟更多个interface
    console.log(man)
}

p({
    name:"iii"
    age:18
    sex:1//如果sex不写是会报错的，会提示你少写了一个sex
})
```

### 类型断言

语法格式，值 as 类型 或者 <类型>值

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用 类型断言可能会导致运行时错误

覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误

类型断言的用途:

1. 将一个联合类型推断为其中一个类型 
2. 将一个父类断言为更加具体的子类
3. 将任何一个类型断言为 any
4. 将 any 断言为一个具体的类型

```typescript
// 原型：
let fn = function(num:number | string):void{
    console.log(num.length);//这里会报错，因为我们确实没有.length这个内容
}
fn("12345")

断言写法
let fn = function(num:number | string):void{
    console.log((num as string).length);//用括号括起来，as断言他是string类型
}

fn("12345")//这样会打印出5
fn(12345)//这样会打印出undefined
```

另一个例子

```typescript
interface A{
    run:string
}

interface B{
    build:string
}

let fn(type:A | B) =>{
    console.log((<A>type).run);
}

fn({
    build:"123"		//这里是没办法传过去的，断言是不能够滥用的，因为我们确实没有.run这个内容
})
```

### 临时断言

使用 any 临时断言

```typescript
window.abc = 123
// 这样写会报错因为 window 没有abc这个东西

(window as any).abc = 123
// 可以使用 any 临时断言在 any 类型的变量上，访问任何属性都是允许的。
```

在下面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用并不会影响结果，因为编译过程中会删除类型断言

```typescript
function toBoolean(something: any): boolean {
    return something as boolean;
}

let bbb = toBoolean(1);
console.log(bbb)
// 返回值为 1
```

### as const

是对字面值的断言，与 const 直接定义常量是有区别的

如果是普通类型跟直接 const 声明是一样的

```typescript
const names = 'iii'
names = 'aa' //无法修改

let names2 = 'iii' as const
names2 = 'aa' //无法修改
```

```typescript
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];

a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针。之所以没有修改指针是因为const的性质是决定了指针指向的位置是已经固定不会发生改变的了，这个30想要添加进去除非直接修改存储值的地方
```

## 15. 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。 Boolean 、Number、 string 、 RegExp 、 Date 、 Error

```typescript
const regexp:Regexp = /\w\d\s/	//声明正则
const date:Date = new Date()	//对象类型

const date:Date = new Date().getTime() //number类型
const error:Error('错误')
```

```typescript
let b: Boolean = new Boolean(1)

let n: Number = new Number(true)

let s: String = new String('iii')

let d: Date = new Date()

let r: RegExp = /^1/

let e: Error = new Error("error!")
```

### DOM 和 BOM 的内置对象

Document 、 HTMLElement 、 Event 、 NodeList 等

```typescript
const list:NodeList = document.querySelectorAll('#list li')

//NodeList 实例对象是一个类似数组的对象，它的成员是节点对象。Node.childNodes、document.querySelectorAll () 返回的都是 NodeList 实例对象。 [1] NodeList 对象代表一个有序的节点列表。
const body:HTMLElement = document.body

const div:HTMLDivElement = document.querySelector('div')

document.body.addEventListener('click',(e:MouseEvent)=>{
    console.log(e)
})

//promise
function promise():Promise<number>{
    //Promise是类型,number是泛型
    return new Promise<number>(resolve,rejuct)=>{
        resolve(1)//如果不进行断言的话会报错
    }
}

promise().then(res=>{
    console.log(res)//返回1，这里会提示你res应该输入number类型
})
```

## 16. Class类

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。

通过 class 关键字，可以定义类。

基本上，ES6 的 class 可以看作只是一个 语法糖 ，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```javascript
js写法

//定义类 JavaScript写法
class Person {
    constructor (name,age,sub) {
        this.name = name
        this.age = age
        this.sub = sub
    }
}
new Person("iii",22,false)
```

```typescript
//在TypeScript中是需要提前声明类型的
class Person {
    name:string
    age:number
    sub:boolean
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
        //上面定义了变量就需要使用，如果没用使用的话声明的变量就会标红(就算不标红不提示，真运行下去也会报错)，不能就那么放着，要么就用上，要么就给他个默认值0塞着
    }
}
new Person("iii",22,false)
```

### public

public内部外部都可以访问，如果定义了public，像p就能够访问constructor内部的变量了。当 然，默认情况下也是public

```typescript
class Person {
    public name:string
    public age:number
    public sub:boolean
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
    }
}

let p = new Person("iii",22,false)
p.age p.name p.sub//都可以访问
```

### private

private 私有变量只能在内部访问

```typescript
class Person {
    private name:string
    private age:number
    private sub:boolean
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
    }
}

let p = new Person("iii",22,false)
p.age p.name p.sub//都访问不到了
```

### protected

protected 内部和子类中访问 provate 跟 protectd 他们的区别是一个是只能在内部使用，一个是内部与子类访问，例子如下

```typescript
class Person {
    protected name:string
    private age:number
    public sub:boolean
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
    }
}

//这两个都可以访问到，this.age访问不到。因为age是private，private只能在内部使用而不能在子类访问，Man是Person的子类
class Man extends Person{
    constructor(){
        super("iii",22,false)
        this.name
        this.sub
    }
}

let p = new Person("iii",22,false)
p.age p.name p.sub
```

### static 静态属性 和 静态方法

- 静态属性和非静态属性的区别：
  - 在内存中存放的位置不同：所有 static 修饰的属性和方法都存放在内存的方法区里，而非静态的都存在堆内存中
  - 出现的时机不同：静态属性和方法在没创建对象之前就存在，而非静态的需要在创建对象才存在
  - 静态属性是整个类都公用的
  - 生命周期不一样，静态在类消失后被销毁，非静态在对象销毁后销毁
  - 用法：静态的可以直接通过类名访问，非静态只能通过对象进行访问

- 使用 static 注意事项
  - 带静态修饰符的方法只能访问静态属性
  - 非静态方法既能访问静态属性也能访问非静态属性
  - 非静态方法不能定义静态变量
  - 静态方法不能使用 this 关键字
  - 静态方法不能调用非静态方法，反之可以

- 父子类中静态和非静态的关系

  - 对于非静态属性，子类可以继承父类非静态属性，但是当父子类出现相同的非静态属性 时，不会发生子类的重写并覆盖父类的非静态属性，而是隐藏父类的非静态属性
  - 对于非静态方法，子类可以继承并重写父类的非静态方法
  - 对于静态属性，子类可以继承父类的静态属性，但是如何和非静态属性一样时，会被隐藏
  - 对于静态方法，子类可以继承父类的静态方法，但是不能重写静态方法，同名时会隐藏父类的

  注：静态属性、静态方法、非静态属性都可以被继承和隐藏，但是不可以被重写，非静态方法可以被重写和继承

- 静态代码块的作用：

  - 一般情况下，有些代码需要在项目启动的时候就执行，这时候就需要静态代码块，比如一个 项目启动需要加载配置文件，或初始化内容等。

- 静态代码块不能出现在任何方法体内

  - 对于普通方法：普通方法是需要加载类 new 出一个实例化对象，通过运行这个对象才能运行 代码块，而静态方法随着类加载就运行了。 
  - 对于静态方法：在类加载时静态方法也加载了，但是必须需要类名或者对象名才可以访问， 相比于静态代码块，静态方法是被动运行，而静态代码块是主动运行

- 静态代码块不能访问普通变量

  普通变量只能通过对象调用的，所以普通变量不能放在静态代码块中。

普通代码块和构造代码块：

- 静态代码块和构造代码块在声明上少一个 static 关键字

- 执行时机： 

  构造代码块在创建对象时被调用，每次创建对象都会调用一次，且优先于构造函数执行。 

  注：不是优先于构造函数执行，而是依托于构造函数，如果不创建对象就不会执行构造代码块

- 普通代码块和构造代码块的区别在于，构造代码块是在类中定于的，而普通代码块是在方法体中定义的，执行顺序和书写顺序一致。

执行顺序：

- 静态代码块 > 构造代码块 > 构造函数 > 普通代码块

```typescript
class Person {
    protected name:string
    private age:number
    public sub:boolean
    static aaa:string = '123456'	//静态属性
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
        this.run()	//会报错，调用不了。互斥的，不能够通过this去访问内部的变量，或者是在内部的变量去调用外部的静态函数
        Person.run()	//只能这样去调用
    }
    
    static run (){
        this.dev()	//静态函数之间可以互相调用
        this.aaa	//用this的话只能访问上面static类型的，其他的不管是public还是private或者是protected都是不能够访问的(会报不存在属性的错误) 因为这里的this指的是当前这个类，而构造函数里面的this指的是新的实例对象
        return '789'
    }
    
    static dev(){
        this.aaa	//静态函数之间可以互相调用
        return 'dev'
    }
}

console.log(Person.run())	//返回789
Person.aaa	//能够直接访问，不需要再new一下
console.log(Person.aaa)
let p = new Person("iii",22,false)
```

### interface 定义类

ts interface 定义类 使用关键字 implements 后面跟 interface 的名字多个用逗号隔开

继承还是用 extends 通过接口去约束类

```typescript
interface Person{
    run(type:boolean):boolean
}

class Man implements Person{
    //会提示我们Man中缺少属性run，但类型Person中需要该属性
}
```

```typescript
//通过接口去约束类
interface Person{
    run(type:boolean):boolean
}

interface H{
    set():void
}

class Man implements Person,H{//会报错，提示我们缺少set属性
    run(type:boolean):boolean{
        return type
    }
}
```

```typescript
interface Person{
    run(type:boolean):boolean
}

interface H{
    set():void
}

class A{//也可以使用继承去使用
    params:string
    constructor(params){
        this.params = params
    }
}

class Man extends A implements Person,H{
    run(type:boolean):boolean{
        return type
    }
    set(){
        //啥也没有，这就是用接口去描述类
    }
}
```

### 抽象类

用关键词 abstract 修饰的类称为 abstract 类（抽象类） 

应用场景如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类

或者你也可以把他作为一个基类 -> 通过继承一个派生类去实现基类的一些方法

对于 abstract 方法只允许声明，不允许实现（因为没有方法体）（毕竟叫抽象，当然不能实实在在的让你实现），并且不允许使用 final 和 abstract 同时修饰一个方法或者类，也不允许使用 static 修饰 abstract 方法。也就是说，abstract 方法只能是实例方法，不能是类方法。

```typescript
abstract class A{
    name:string
    construct(name:string){
        this.name = name
    }
    
    abstract getName(){
    	//方法getName不能具有实现，因为它标记为抽象。定义抽象类的函数
        return 213
    }
    
    setName(name:string){
        this.name = name
    }
    
    abstract getName():string//抽象类
}

class B extends A{
    //派生类。定义了抽象类必须在派生类里实现
    //B类是继承A类的，此时A类就是一个抽象类
    constructor(){
        super('iii')
    }
    
    getName():string{
        return this.name
    }
}

//此时A类是无法被创建实例的(new A)，也就是无法创建抽象类的实例
//B类是可以创建实例的(new B)

let b = new B
b.setName("ooo")//通过抽象类的设置，成功修改掉子类的内容

console.log(b.getName())
```

## 17. 元组类型

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

```typescript
let arr:[string,number] = ['iii',22]
//这样的方式就叫做元组，定义了每个位置需要满足的不同类型

arr[0].length//有
arr[1].length//无，因为上面的定义类型会自动帮我们推断是否有该方法
//Number 类型是没有 length 属性的
```

### 越界的元组

当添加的元组越界的时候，越界的类型会被限制为元组类型中每个类型的联合类型

```typescript
let arr:[string,number] = ['iii',22]/
    
arr.push(true) //会报错，因为类型boolean参数不能赋值给string|number的类型

//这个就是元组对越界元素的处理
arr.push('111',2222)//这种就可以
//也可以对二维数组进行限制规定类型
```

## 18. 枚举类型

在 javaScript 中是没有 枚举 的概念的 TS 帮我们定义了枚举这个类型

enum 关键字定义枚举

### 数字定义枚举

默认从0开始的

```typescript
enum Color{
    red,
    green,
    blue
}

console.log(Color.red,Color.blue,Color.green)
//能够得到他们的顺序数字，这里返回0，2，1
```

### 增长枚举

能够通过自定义开头决定从哪个数字开始枚举，其他位置的都可以定义，后面的数字就按顺序枚举

```typescript
enum Color{
    red=2,
    green,
    blue
}
console.log(Color.red,Color.blue,Color.green)//能够得到他们的顺序数字，这里返回2，4，3
```

### 字符串枚举

字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个 字符串枚举成员进行初始化。

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

```typescript
enum Types{
    Red = 'red',
    Green = 'green',
    BLue = 'blue'
}
```

### 异构枚举

枚举可以混合字符串和数字成员

```typescript
enum Types{
    No = "No",
    Yes = 1,
}
console.log(Types.NO,Types.Yes)
```

### 接口枚举

定义一个枚举 Types 定义一个接口 A 他有一个属性 red 值为 Types.yyds 

声明对象的时候要遵循这个规则

```typescript
enum Color{
    no = "NO",
    yes = 1
}

interface A{
    red:Color.yes
}

let B:A{
    red:Color.yes
    //或者直接red:1，只能填入这两个内容其中之一，其他的会报错
}
```

### const枚举

let 和 var 都是不允许的声明只能使用 const

大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的 代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const 枚举。 常量枚举通过在枚举上使用 const 修饰符来定义

const 声明的枚举会被编译成常量

普通声明的枚举编译完后是个对象

```typescript
const enum Types{//有没有const决定是编译成对象还是编译成常量
    sucess,
    fail
}

let code:number = 0
if(code === sucess){//是能执行的
    console.log("rrr")
}
```

### 反向映射

它包含了正向映射（ name -> value ）和反向映射（ value -> name ） 

要注意的是不会为字符串枚举成员生成反向映射。

```typescript
enum Types{
    one
}
let success:number = Types.success
console.log(success)//读取得出来为0

enum Types{
    success
}

let success:number = Types.success
let key = Types[success]
console.log(`value---${success}`,`key----${key}`)//value---0,key----success
```

## 19. 类型推论|类型别名

### 类型推论

我声明了一个变量但是没有定义类型

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论

```typescript
let str = "iii"
str = 123//会报错，虽然我们没用明确限制类型，但是TS编辑器会自动推论为string类型。就不能够在赋值给别的类型
```

如果你声明变量没有定义类型也没有赋值这时候 TS 会推断成 any 类型可以进行任何操作

```typescript
let str//为any类型
str = 123
str = "ttt"
str = false
str = []
```

### 函数式的类型别名

type 关键字（可以给一个类型定义一个名字）多用于符合类型，但也可以要求有固定的东西

**定义类型别名**

```typescript
type str = string
let s:str = "iii"
```

**定义函数别名**

```typescript
type str = () => string
let s: str = () => "iii"
```

**定义联合类型别名**

```typescript
type str = string | number
let s: str = 123
let s2: str = '123'
```

**定义值的别名**

```typescript
type value = boolean | 0 | '213'
let s:value = true
//变量s的值 只能是上面value定义的值
```

## 20. never类型

TypeScript将使用 never 类型来表示不应该存在的状态

返回never的函数必须存在无法达到的终点

```typescript
function error(message:string):never {//因为必定抛出异常，所以 error 将不会有返回值
    throw new Error(message)
}

function loop():never{
    while(true){
        //因为这个是死循环，永远不会去返回的
    }
}
```

```typescript
interface A{
    type:"保安"
}

interface B{
    type:"草莓"
}

interface C{
    type:"卷心菜"
}

type All = A|B
function type(val:All){
    while(val.type){
        case "保安":break
        case "草莓":break
        case "卷心菜":break
        default://兜底机制，此时C没有用上就会报错提示。这就算never的作用
        const check:never = val
        break
    }
}
```

## 21. Symbol类型

symbol 是一种新的原生类型，就像 number 和 string 一样 

symbol 类型的值是通过 Symbol构造函数创建的

可以传递参做为唯一标识 只支持 string 和 number 类型的参数

```typescript
let s:symbol = Symbol('小满')
let num:symbol = Symbol('小满')
let obj = {
    [num] = "value"	//Symbol
    [s] = "草莓"	//Symbol
	name:"小满"
	sex:"男"
}
console.log(obj.[num])//取到value
console.log(s,num)//返回Symbol(小满)Symbol(小满)
console.log(s === num)//false
//这个值看似一样，其实因为内存地址指针位置不同，所以是唯一值
for(let key in boj){
    console.log(key)
}//只会打印出name跟sex，[num]与[s]将打印不出来
console.log(Object.keys(obj))//["name","sex"]
console.log(Object.getOwnPropertyNames(obj))//["name","sex"]，跟上面一样，打印不出来
console.log(JSON.stringify(obj));//["name":"小满","sex":"男"]，一样打印不出来
```

### 能够读取到Symbol的两种方式

静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组(Array)。

语法：Reflect.ownKeys(target) => target 获取自身属性键的目标对象。

Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target) ) 。

```typescript
console.log(Object.getOwnPropertySymbol(obj));//能打印出来两个Symbol，另外两个普通的不会打印出来
Reflect.ownKeys()//此属性是将所有的属性都列出来
console.log(Reflect.ownKeys())//四个全部圆满的打印出来
```

## 22. 迭代器|生成器

迭代器:Symbol.iterator

迭代器（Iterator）是⼀种对象，它能够⽤来遍历标准模板库容器中的部分或全部元素，每个迭代 器对象代表容器中的确定的地址

通俗点说，迭代器表现的像指针，读取集合或者数组中的⼀个值，读完以后⼜指向下⼀条数据，⼀ 个个数过去。

生成器: for of

### 迭代器

迭代器Interator 的用法

1. Interator 是 es6 引入的一种新的遍历机制。两个核心：
   - 迭代器是一个统一的接口，它的作用是使各种 数据结构 可被便捷的访问，它是通过一个键为 Symbol.iterator 的方法来实现
   - 迭代器是用于 遍历 数据结构元素的指针（如数据库中的游标）
2. 使用迭代
   - 使用 Symbol.interator 创建一个迭代器
   - 调用 next 方法向下迭代，next 方法会返回当前的位置
   - 当 done 为 true 时则遍历结束
3. 注意点：
   - 在迭代器迭代元素的过程中，不允许使⽤集合对象改变集合中的元素个数，如果需要添加或 者删除只能使⽤迭代器的⽅法操作。
   - 如果使⽤了集合对象改变集合中的元素个数那么就会报错：不改变个数即可，替换也可以 的。
   - 迭代器的⽣存周期为创建到使⽤结束的时段。
   - foreach : Iterator 的封装变形，变得⽐ Iterator更简单。但是他也需要知道数组或集合的类 型。并且，Iterator 需要注意的，foreach 同样需要注意。

```typescript
let arr:Array<number> = [1,5,6]
let it:Intertor<number> = arr[Symbol.interator]()//注意这里的接收类型<number>是固定要写的

//next一次只遍历一个数，下一次调用将从上一次遍历到的位置开始下一个
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next()); //{ value: 5, done: false }
console.log(iterator.next()); //{ value: 6, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }
//返回的有两个属性，一个value，一个done。value当读取到值的时候，done为false、读取不到为true
```

```typescript
type mapKeys = string|number//相当于起别名，在下方使用的时候集合了string与number就会相对
方便不少
let set:Set<number> = new Set([1,2,3])
let map:Map<mapKeys,mapKeys> = new Map()//这里断言两个mapKeys，一个对应key，一个对应
value
map.set('1','iii')
map.set('2','ooo')
//迭代器的实现
function gen(erg:any){//这里定义为any类型是因为上面要传到这里的有多种不同类型
    let it:interator<any> = erg[Symbol.interator]()
    let next:any = {done:false}
    while(!next.done){//判断next，由于next默认为fasle，while循环只有true会通过，所以需要取反
        next = it.next()//刚开始是声明next给个默认值，等到开始循环的时候再把真正的值赋给他
        if(!next.done){
            console.log(next);
        }
    }
}
gen(arr)//调用第一个代码块的arr，输出了与console.log(iterator.next());一样的内容
//对象是不支持迭代器的使用的，其实我们在控制台输出一个对象，查找他内置的属性，也是找不到
Symbol.interator的
```

#### Symbol列表

Symbol.hasInstance 方法，会被 instanceof 运算符调用。构造器对象用来识别一个对象是否是其实例。

Symbol.isConcatSpreadable 布尔值，表示当在一个对象上调用 Array.prototype.concat 时，这个对象的数组元素是否可展开。

Symbol.iterator 方法，被 for-of 语句调用。返回对象的默认迭代器。

Symbol.match 方法，被 String.prototype.match 调用。正则表达式用来匹配字符串。

Symbol.replace 方法，被 String.prototype.replace 调用。正则表达式用来替换字符串中匹配的子串。

Symbol.search 方法，被 String.prototype.search 调用。正则表达式返回被匹配部分在字符串中的索引。

Symbol.species 函数值，为一个构造函数。用来创建派生对象。

Symbol.split 方法，被 String.prototype.split 调用。正则表达式来用分割字符串。

Symbol.toPrimitive 方法，被 ToPrimitive 抽象操作调用。把对象转换为相应的原始值。

Symbol.toStringTag 方法，被内置方法 Object.prototype.toString 调用。返回创建对象时默认的字符串描述。

Symbol.unscopables 对象，它自己拥有的属性会被 with 作用域排除在外。

### 生成器（Builder）

又称建造者模式，该模式是一种创建型设计模式，能够分步骤创建复杂对象。该模式允许使用相同 的创建代码生成不同类型和形式的对象。

#### for…of 语句

for…of 会遍历可迭代的对象，调用对象上的 Symbol.iterator 方法。(此对象非彼对象，这个对 象是指你即将下手的目标) 对象也是不支持的，因为对象没用 Symbol.iterator 方法。

```typescript
type mapKeys = string|number//相当于起别名，在下方使用的时候集合了string与number就会相对方便不少

let set:Set<number> = new Set([1,2,3])
let map:Map<mapKeys,mapKeys> = new Map()//这里断言两个mapKeys，一个对应key，一个对应value

map.set('1','iii')
map.set('2','ooo')

for (let item of set){
    console.log(item)
}//打印出1 2 3

for (let item of arr){
    console.log(item)
}//打印出4 5 6

for (let item of map){
    console.log(item)
}//打印出['1','小满'] ['2','看看腿']
//其实这就是一个语法糖，将of后面的内容遍历存储到of前面的变量中
```

#### 跟for in 的区别

for in循环出来的是索引而不是内容，这个应该是最本质的区别了

因为for of会调用底层interator里面那个list的.value

## 23. 泛型(generic)

泛型简单来说就是类型变量，在 ts 中存在类型，如 number、string、boolean等。泛型就是使用 一个类型变量来表示一种类型，类型值通常是在使用的时候才会设置。泛型的使用场景非常多，可 以在函数、类、interface 接口中使用

TypeScript中不建议使用 any 类型，不能保证类型安全，调试时缺乏完整的信息。

TypeScript 可以使用泛型来创建可重用的组件。支持当前数据类型，同时也能支持未来的数据类 型。扩展灵活，可以在编译时发现类型错误，从而保证了类型安全。

### 无泛型用法

```typescript
//数字类型
function num(A:number,B:number):Array<number>{//Array<number>为希望返回number类型的数组
    return [a,b]
}
num(6,9)

//字符串类型
function str(A:string,B:string):Array<string>{//Array<number>为希望返回number类型的数组
    return [a,b]
}
str('iii','ooo')
```

一个笨的方法就像上面那样，也就是说 JS 提供多少种类型，就需要复制多少份代码，然后改下类 型签名。这对程序员来说是致命的。这种复制粘贴增加了出错的概率，使得代码难以维护，牵一发 而动全身。并且将来 JS 新增新的类型，你仍然需要修改代码，也就是说你的代码对修改开放，这 样不好。

如果你使用 any 的话，怎么写都是 ok 的， 这就丧失了类型检查的效果。实际上我知道我传给你 的是 string，返回来的也一定是 string，而 string 上没有 toFixed 方法，因此需要报错才是我想要 的。也就是说我真正想要的效果是： 当我用到id的时候，你根据我传给你的类型进行推导 。比如我传 入的是 string，但是使用了 number 上的方法，你就应该报错。

### 使用泛型优化

为了解决上面的这些问题，我们使用泛型对上面的代码进行重构。和我们的定义不同，这里用了一 个 类型 T，这个 T 是一个抽象类型，只有在调用的时候才确定它的值，这就不用我们复制粘贴无 数份代码了。

其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名 称代替。除了 T 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型； 
- V（Value）：表示对象中的值类型； 
- E（Element）：表示元素类型。

```typescript
function add<T>(a:T,b:T):Array<T>{//通常定义的时候类型是不明确的，所以一般使用T来定义
    return [a,b];
}
add<number>(1,2)//1对应a，2对应b、返回的都是number类型
add<string>('1','2')//这个时候，我们只需要改动这个string，传递到上面的时候就会自动推断为string类型了
//甚至我们可以简写
add(1,2)
add('1','2')//编辑器会自动推断类型，但最好还是写一下，如果你知道你具体需要的是什么的话
//对泛型进行总结就是：定义前不明确类型，使用的时候再明确类型，能够给我们保留有足够的自由度，又不会像any丧失类型检查的效果
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```typescript
function Sub<T,U>(a:T,b:U):Array<T|U> {//这个T跟U随便起名字都行，没有强制规范
const params:Array<T|U> = [a,b]
return params
}

Sub<Boolean,number>(false,1)//我们这里就将其定义为布尔值类型跟数字类型
```

### 定义泛型接口

声明接口的时候 在名字后面加一个 <参数> 

使用的时候传递类型

```typescript
interface MyInter<T> {
    (arg: T): T
}

function fn<T>(arg: T): T {
    return arg
}

let result: MyInter<number> = fn
result(123)
```

### 对象字面量泛型

```typescript
let foo: { <T>(arg: T): T }
foo = function <T>(arg:T):T {
    return arg
}

foo(123)
```

### 泛型约束(函数类)

我们期望在一个泛型的变量上面，获取其 length 参数，但是，有的数据类型是没有 length 属 性的

```typescript
function getLegnth<T>(arg:T) {
    return arg.length
}
```

这个时候，我们就可以对其进行约束

```typescript
interface Len{
    length:number
}
function getLegnth<T extends Len>(arg:T) {//使用接口让泛型T继承了Len
    return arg.length
}
getLength(1)//这个时候我们这样使用就会提示我们类型"number"的参数不能赋给"Len"的参数
//我们依次对数组、字符串、布尔值都进行尝试，分别为可以、可以、不可以
```

