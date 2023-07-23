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

## 24. 泛型约束|泛型类

### 使用 keyof 约束对象

其中使用了 TS 泛型和泛型约束。

首先定义了 T 类型并使用 extends 关键字继承 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，它的返回 类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型

```typescript
function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let o = { a: 1, b: 2, c: 3 }
prop(o, 'a')
prop(o, 'd')
// 我们需要约束一下这个o里面并没有的东西，此时就会报错发现找不到
// 通过提示，我门可以看到类型"d"的参数不能赋给类型"a"|"b"|"c"的参数
```

### 泛型类

声明方法跟函数类似名称后面定义 <类型> 

使用的时候确定类型 new Sub()

```typescript
//定义泛型的一个类
class Sub<T>{
    attr:T[] = []//这里的:只是普通的:
    add(a:T):T[]{
        return [a]
    }
}

let s = new Sub<number>()//这里已经使用泛型固定为number了
s.attr = [123]//正常运行
s.attr = ['123']//报错
s.add(123)//也是只能传数字

let str = new Sub<string>()//这里已经使用泛型固定为number了
str.attr = [123]//报错
str.attr = ['123']//正常运行
str.add('123')//也是只能传字符串
console.log(s,str)
```

### 泛型工具类型(大量补充额外内容)

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者可以更好的学习其它的工具类型。

1. **typeof**

   typeof 的主要用途是在类型上下文中获取变量或者属性的类型，下面我们通过一个具体示例来理解一 下。

   ```typescript
   interface Person {
       name: string;
       age: number;
   }
   
   const sem: Person = { name: "semlinker", age: 30 };
   type Sem = typeof sem; // type Sem = Person
   ```

   在上面代码中，我们通过 typeof 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型：

   ```typescript
   const lolo: Sem = { name: "lolo", age: 5 }
   ```

   你也可以对嵌套对象执行相同的操作：

   ```typescript
   const Message = {
       name: "jimmy",
       age: 18,
       address: {
           province: '四川',
           city: '成都'
       }
   }
   
   type message = typeof Message;
   /*
   type message = {
       name: string;
       age: number;
       address: {
           province: string;
           city: string;
       };
   }
   */
   ```

   此外， typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：

   ```typescript
   function toArray(x: number): Array<number> {
       return [x];
   }
   
   type Func = typeof toArray; // -> (x: number) => number[]
   ```

2. **keyof**

   keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

   ```typescript
   interface Person {
       name: string;
       age: number;
   }
   
   type K1 = keyof Person; // "name" | "age"
   type K2 = keyof Person[]; 
   // "length" | "toString" | "pop" | "push" | "concat" | "join"
   type K3 = keyof { [x: string]: Person }; // string | number
   ```

   在 TypeScript 中支持两种索引签名，数字索引和字符串索引：

   ```typescript
   interface StringArray {
       // 字符串索引 -> keyof StringArray => string | number
       [index: string]: string;
   }
   
   interface StringArray1 {
       // 数字索引 -> keyof StringArray1 => number
       [index: number]: string;
   }
   ```

   为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。

   其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。

   所以 keyof { [x: string]: Person } 的结果会返回 string | number 。

   keyof 也支持基本数据类型：

   ```typescript
   let K1: keyof boolean; // let K1: "valueOf"
   let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
   let K3: keyof symbol; // let K1: "valueOf"
   ```

   **keyof 的作用**

   JavaScript 是一种高度动态的语言。有时在静态类型系统中捕获某些操作的语义可能会很棘手。以一个 简单的 prop 函数为例：

   ```typescript
   function prop(obj, key) {
       return obj[key];
   }
   ```

   该函数接收 obj 和 key 两个参数，并返回对应属性的值。对象上的不同属性，可以具有完全不同的类型，我们甚至不知道 obj 对象长什么样。

   那么在 TypeScript 中如何定义上面的 prop 函数呢？我们来尝试一下：

   ```typescript
   function prop(obj: object, key: string) {
       return obj[key];
   }
   ```

   在上面代码中，为了避免调用 prop 函数时传入错误的参数类型，我们为 obj 和 key 参数设置了类型， 分别为 {} 和 string 类型。

   然而，事情并没有那么简单。针对上述的代码，TypeScript 编译器会输出 以下错误信息：

   ```typescript
   Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
   ```

   元素隐式地拥有 any 类型，因为 string 类型不能被用于索引 {} 类型。要解决这个问题，你可以使 用以下非常暴力的方案：

   ```typescript
   function prop(obj: object, key: string) {
       return (obj as any)[key];
   }
   ```

   很明显该方案并不是一个好的方案，我们来回顾一下 prop 函数的作用，该函数用于获取某个对象中指 定属性的属性值。因此我们期望用户输入的属性是对象上已存在的属性，那么如何限制属性名的范围呢？这时我们可以利用本文的主角 keyof 操作符：

   ```typescript
   function prop<T extends object, K extends keyof T>(obj: T, key: K) {
       return obj[key];
   }
   ```

   在以上代码中，我们使用了 TypeScript 的泛型和泛型约束。

   首先定义了 T 类型并使用 extends 关键字 约束该类型必须是 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，其返回类型是 联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。 是骡子是马拉 出来遛遛就知道了，我们来实际测试一下：

   ```typescript
   type Todo = {
       id: number;
       text: string;
       done: boolean;
   }
   const todo: Todo = {
       id: 1,
       text: "Learn TypeScript keyof",
       done: false
   }
   function prop<T extends object, K extends keyof T>(obj: T, key: K) {
       return obj[key];
   }
   const id = prop(todo, "id"); // const id: number
   const text = prop(todo, "text"); // const text: string
   const done = prop(todo, "done"); // const done: boolean
   ```

   很明显使用泛型，重新定义后的 prop(obj: T, key: K) 函数，已经可以正确地推导出指定键对应的类型。那么当访问 todo 对象上不存在的属性时，会出现什么情况？比如：

   ```typescript
   const date = prop(todo, "date");
   ```

   对于上述代码，TypeScript 编译器会提示以下错误：

   ```typescript
   Argument of type '"date"' is not assignable to parameter of type '"id" | "text" | "done"'.
   ```

   这就阻止我们尝试读取不存在的属性

3. **in**

   in 用来遍历枚举类型：

   ```typescript
   type Keys = "a" | "b" | "c"
   type Obj = {
       [p in Keys]: any
   } // -> { a: any, b: any, c: any }
   ```

4. **infer**

   在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

   ```typescript
   type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
   ```

   以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数 返回值的类型方便之后使用。

5. **extends**

   有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

   ```typescript
   interface Lengthwise {
       length: number;
   }
   function loggingIdentity<T extends Lengthwise>(arg: T): T {
       console.log(arg.length);
       return arg;
   }
   ```

   现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

   ```typescript
   loggingIdentity(3); // Error, number doesn't have a .length property
   ```

   这时我们需要传入符合约束类型的值，必须包含 length 属性：

   ```typescript
   loggingIdentity({length: 10, value: 3});
   ```

6. **索引类型**

   在实际开发中，我们经常能遇到这样的场景，在对象中获取一些属性的值，然后建立对应的集合。

   ```typescript
   let person = {
       name: 'musion',
       age: 35
   }
   function getValues(person: any, keys: string[]) {
       return keys.map(key => person[key])
   }
   console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
   console.log(getValues(person, ['gender'])) // [undefined]
   ```

   在上述例子中，可以看到 getValues (persion, ['gender']) 打印出来的是 [undefined]，但是 ts 编译器并没有给出报错信息，那么如何使用 ts 对这种模式进行类型约束呢？这里就要用到了索引类型，改造一下 getValues 函数，通过 索引类型查询和 索引访问操作符：

   ```typescript
   function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
       return keys.map(key => person[key]);
   }
   
   interface Person {
       name: string;
       age: number;
   }
   
   const person: Person = {
       name: 'musion',
       age: 35
   }
   
   getValues(person, ['name']) // ['musion']
   getValues(person, ['gender']) // 报错：
   // Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
   // Type "gender" is not assignable to type "name" | "age".
   ```

   编译器会检查传入的值是否是 Person 的一部分。通过下面的概念来理解上面的代码：

   ```typescript
   T[K]表示对象T的属性K所表示的类型，在上述例子中，T[K][] 表示变量T取属性K的值的数组
   // 通过[]索引类型访问操作符, 我们就能得到某个索引的类型
   class Person {
       name:string;
       age:number;
   }
   type MyType = Person['name']; //Person中name的类型为string type MyType = string
   ```

   介绍完概念之后，应该就可以理解上面的代码了。首先看泛型，这里有 T 和 K 两种类型，根据类型推 断，第一个参数 person 就是 person，类型会被推断为 Person。而第二个数组参数的类型推断（K extends keyof T），keyof 关键字可以获取 T，也就是 Person 的所有属性名，即 ['name', 'age']。而 extends 关键字让泛型 K 继承了 Person 的所有属性名，即 ['name', 'age']。这三个特性组合保证了代码 的动态性和准确性，也让代码提示变得更加丰富了

   ```typescript
   getValues(person, ['gender']) // 报错：
   // Argument of Type '"gender"[]' is not assignable to parameter of type '("name"
   | "age")[]'.
   // Type "gender" is not assignable to type "name" | "age".
   ```

7. **映射类型**

   根据旧的类型创建出新的类型，我们称之为映射类型

   比如我们定义一个接口:

   ```typescript
   interface TestInterface{
       name:string,
       age:number
   }
   ```

   我们把上面定义的接口里面的属性全部变成可选

   ```typescript
   // 我们可以通过+/-来指定添加还是删除
   type OptionalTestInterface<T> = {
       [p in keyof T]+?:T[p]
   }
   
   type newTestInterface = OptionalTestInterface<TestInterface>
   // type newTestInterface = {
       // name?:string,
       // age?:number
   // }
   ```

   比如我们再加上只读

   ```typescript
   type OptionalTestInterface<T> = {
       +readonly [p in keyof T]+?:T[p]
   }
   
   type newTestInterface = OptionalTestInterface<TestInterface>
   // type newTestInterface = {
       // readonly name?:string,
       // readonly age?:number
   // }
   ```

   由于生成只读属性和可选属性比较常用，所以 TS 内部已经给我们提供了现成的实现 Readonly / Partial, 会面内置的工具类型会介绍.

#### 内置的工具类型

1. **Partial**

   Partial 将类型的属性变成可选

   ```typescript
   type Partial<T> = {
       [P in keyof T]?: T[P];
   };
   ```

   在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P ，最后通过 T[P] 取得相应的属性值的类。中间的 ? 号，用于将所有属性变为可选。

   ```typescript
   interface UserInfo {
       id: string;
       name: string;
   }
   // error：Property 'id' is missing in type '{ name: string; }' but required in
   type 'UserInfo'
   const xiaoming: UserInfo = {
       name: 'xiaoming'
   }
   ```

   使用 Partial：

   ```typescript
   type NewUserInfo = Partial<UserInfo>;
   const xiaoming: NewUserInfo = {
       name: 'xiaoming'
   }
   ```

   这个 NewUserInfo 就相当于

   ```typescript
   interface NewUserInfo {
       id?: string;
       name?: string;
   }
   ```

   但是 Partial 有个局限性，就是只支持处理第一层的属性，如果我的接口定义是这样的

   ```typescript
   interface UserInfo {
       id: string;
       name: string;
       fruits: {
           appleNumber: number;
           orangeNumber: number;
       }
   }
   type NewUserInfo = Partial<UserInfo>;
   // Property 'appleNumber' is missing in type '{ orangeNumber: number; }' but required in type '{ appleNumber: number; orangeNumber: number; }'.
   const xiaoming: NewUserInfo = {
       name: 'xiaoming',
       fruits: {
           orangeNumber: 1,
       }
   }
   ```

   可以看到，第二层以后就不会处理了，如果要处理多层，就可以自己实现

2. **DeepPartial**

   ```typescript
   type DeepPartial<T> = {
       // 如果是 object，则递归类型
       [U in keyof T]?: T[U] extends object
       ? DeepPartial<T[U]>
       : T[U]
   };
   type PartialedWindow = DeepPartial<T>; // 现在T上所有属性都变成了可选啦
   ```

3. **Required**

   Required 将类型的属性变成必选

   ```typescript
   type Required<T> = {
       [P in keyof T]-?: T[P]
   };
   ```

   其中 -? 是代表移除 ? 这个 modifier 的标识。再拓展一下，除了可以应用于 ? 这个 modifiers ，还有 应用在 readonly ，比如 Readonly 这个类型

   ```typescript
   type Readonly<T> = {
       readonly [p in keyof T]: T[p];
   }
   ```

4. **Readonly**

   Readonly 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋 值。

   ```typescript
   type Readonly<T> = {
       readonly [P in keyof T]: T[P];
   };
   ```

   ```typescript
   interface Todo {
       title: string;
   }
   const todo: Readonly<Todo> = {
       title: "Delete inactive users"
   };
   todo.title = "Hello"; // Error: cannot reassign a readonly property
   ```

5. **Pick**

   Pick 从某个类型中挑出一些属性出来

   ```typescript
   type Pick<T, K extends keyof T> = {
       [P in K]: T[P];
   };
   ```

   ```typescript
   interface Todo {
       title: string;
       description: string;
       completed: boolean;
   }
   type TodoPreview = Pick<Todo, "title" | "completed">;
   const todo: TodoPreview = {
       title: "Clean room",
       completed: false,
   };
   ```

   可以看到 NewUserInfo 中就只有个 name 的属性了。

6. **Record**

   Record 的作用是将 K 中所有的属性的值转化为 T 类型。

   ```typescript
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   ```

   ```typescript
   interface PageInfo {
       title: string;
   }
   type Page = "home" | "about" | "contact";
   const x: Record<Page, PageInfo> = {
       about: { title: "about" },
       contact: { title: "contact" },
       home: { title: "home" },
   };
   ```

7. **ReturnType**

   用来得到一个函数的返回值类型

   ```typescript
   type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
   ```

   infer 在这里用于提取函数类型的返回值类型。 ReturnType 只是将 infer R 从参数位置移动到返 回值位置，因此此时 R 即是表示待推断的返回值类型。

   ```typescript
   type Func = (value: number) => string;
   const foo: ReturnType<Func> = "1";
   ```

   ReturnType 获取到 Func 的返回值类型为 string ，所以， foo 也就只能被赋值为字符串了。

8. **Exclude**

   Exclude 的作用是将某个类型中属于另一个的类型移除掉。

   ```typescript
   type Exclude<T, U> = T extends U ? never : T;
   ```

   如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。最终实现的效果就是将 T 中某些属于 U 的类型移除掉。

   ```typescript
   type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
   type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
   type T2 = Exclude<string | number | (() => void), Function>; // string | number
   ```

9. **Extract**

   Extract 的作用是从 T 中提取出 U 。

   ```typescript
   type Extract<T, U> = T extends U ? T : never;
   ```

   ```typescript
   type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
   type T1 = Extract<string | number | (() => void), Function>; // () =>void
   ```

10. **Omit**

    Omit 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个 新的类型。

    ```typescript
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
    ```

    ```typescript
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }
    
    type TodoPreview = Omit<Todo, "description">;
    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
    ```

11. **NonNullable**

    NonNullable 的作用是用来过滤类型中的 null 及 undefined 类型。

    ```typescript
    type NonNullable<T> = T extendsnull | undefined ? never : T;
    ```

    ```typescript
    type T0 = NonNullable<string | number | undefined>; // string | number
    type T1 = NonNullable<string[] | null | undefined>; // string[]
    ```

12. **Parameters**

    Parameters 的作用是用于获得函数的参数类型组成的元组类型。

    ```typescript
    type Parameters<T extends (...args: any) => any> = T extends (...args:infer P) => any ? P : never;
    ```

    ```typescript
    type A = Parameters<() =>void>; // []
    type B = Parameters<typeofArray.isArray>; // [any]
    type C = Parameters<typeofparseInt>; // [string, (number | undefined)?]
    type D = Parameters<typeofMath.max>; // number[]
    ```

## 25. tsconfig.json配置文件

### 生成 tsconfig.json 文件

这个文件是通过 tsc --init 命令生成的

tsconfig.json 是 TypeScript 项目的配置文件。如果一个目录下存在一个 tsconfig.json 文件，那么 往往意味着这个目录就是 TypeScript 项目的根目录。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编 译出 ES6、ES5、node 的代码。

### 配置详解

```json
"compilerOptions": {
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
"allowJS": true, // 允许编译器编译JS，JSX文件
"checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
"outDir": "./dist", // 指定输出目录
"rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
"declaration": true, // 生成声明文件，开启后会自动生成声明文件
"declarationDir": "./file", // 指定生成声明文件存放目录
"emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
"sourceMap": true, // 生成目标文件的sourceMap文件
"inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
"declarationMap": true, // 为声明文件生成sourceMap
"typeRoots": [], // 声明文件目录，默认时node_modules/@types
"types": [], // 加载的声明文件包
"removeComments":true, // 删除注释
"noEmit": true, // 不输出文件,即编译后不会生成任何js文件
"noEmitOnError": true, // 发送错误时不输出任何文件
"noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
"importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
"downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
"strict": true, // 开启所有严格的类型检查
"alwaysStrict": true, // 在代码中注入'use strict'
"noImplicitAny": true, // 不允许隐式的any类型
"strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
"strictFunctionTypes": true, // 不允许函数参数双向协变
"strictPropertyInitialization": true, // 类的实例属性必须初始化
"strictBindCallApply": true, // 严格的bind/call/apply检查
"noImplicitThis": true, // 不允许this有隐式的any类型
"noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
"noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
"noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
"noImplicitReturns": true, //每个分支都会有返回值
"esModuleInterop": true, // 允许export=导出，由import from 导入
"allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
"moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
"baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
"paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
},
"rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
"listEmittedFiles": true, // 打印输出文件
"listFiles": true// 打印编译的文件(包括引用的声明文件)
}
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
    "src/**/*"
],
// 指定一个排除列表（include的反向操作）
"exclude": [
    "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
"files": [
    "demo.ts"
]
```

上面的配置详解有点繁杂，我们或许可以将其分类一下

#### 配置分类(compilerOptions 选项)

```json
{
    "compilerOptions": {
        /* 基本选项 */
        "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
        "module": "commonjs", // 指定使用模块: 'commonjs', 'amd','system', 'umd' or 'es2015'
        "lib": [], // 指定要包含在编译中的库文件
        "allowJs": true, // 允许编译 javascript 文件
        "checkJs": true, // 报告 javascript 文件中的错误
        "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve',
        'react-native', or 'react'
        "declaration": true, // 生成相应的 '.d.ts' 文件
        "sourceMap": true, // 生成相应的 '.map' 文件
        "outFile": "./", // 将输出文件合并为一个文件
        "outDir": "./", // 指定输出目录
        "rootDir": "./", // 用来控制输出目录结构 --outDir.
        "removeComments": true, // 删除编译后的所有的注释
        "noEmit": true, // 不生成输出文件
        "importHelpers": true, // 从 tslib 导入辅助工具函数
        "isolatedModules": true, // 将每个文件做为单独的模块 （与'ts.transpileModule' 类似）.
        /* 严格的类型检查选项 */
        "strict": true, // 启用所有严格类型检查选项
        "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
        "strictNullChecks": true, // 启用严格的 null 检查
        "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
        "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入'use strict'
        /* 额外的检查 */
        "noUnusedLocals": true, // 有未使用的变量时，抛出错误
        "noUnusedParameters": true, // 有未使用的参数时，抛出错误
        "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
        "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
        /* 模块解析选项 */
        "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
        "baseUrl": "./", // 用于解析非相对模块名称的基目录
        "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
}
}
```

#### 常用的配置

终端命令:

```bash
echo ''>index.ts(创建一个空的名叫index.ts的文件)
tsc -init(创建一个tsconfig.json)
del index.js(删除名叫index.js文件)
mkdir dist(创建一个名叫dist的文件夹)
tsc(运行)
```

