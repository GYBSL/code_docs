---
title: JavaScript篇
toc: content
---

# 前端高频面试题 JavaScript 篇

## 1. 其他值到数字值的转换规则

- Undefined 类型的值转换为 NaN。

- Null 类型的值转换为 0。

- Boolean 类型的值，true 转换为 1，false 转换为 0。

- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。

- Symbol 类型的值不能转换为数字，会报错。

  ```javascript
  t TypeError: Cannot convert a Symbol value to a number
  ```

- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

### 1.1 将其他类型转换为number的方法

1. 使用 `Number()` 函数

   ```javascript
   // 使用Number()函数进行转换,纯数字可以直接转换为数字
   // 但是字符串里有非数字，则会转化为NaN
   // 字符串里面若为空，则转换为0
   // 布尔值，true转换为1，false转换为0
   // null转换为数字0，undefined转换为NaN
   
   console.log(Number(undefined))	// NaN
   
   console.log(Number(null))	// 0
   
   console.log(Number(true))	// 1
   
   console.log(Number(false))	// 0
   
   console.log(Number(''))		// 0
   
   console.log(Number('999w'))	// NaN
   
   console.log(Number('w999'))	// NaN
   
   console.log(Number(obj2))	// 对象也是NaN
   ```

2. 使用 `parseInt()` 或者 `parseFloat()` 

   ```javascript
   parseInt() 把一个字符串转换为一个整数
   parseFloat() 把一个字符串转换为一个浮点数
   
   parseInt() 和 parseFloat()，专门转换字符串
   可以将字符串中有效的整数或者浮点数取出来，从左往右，遇非数字，舍弃后边所有，故第一个若为非数字，则返回NaN
   parseFloat(),如果遇到有两个点，则舍弃第二个点，以及后面内容
   对非string使用，会将其转换为string，然后再操作，会返回NaN
   
   在js中，如果需要表示16进制的数字，则需要以0x开头
   如果需要表示8进制的数字，则需要以0开头
   如果要要表示2进制的数字，则需要以0b开头
   但是不是所有的浏览器都支持
   
   可以在parseInt()中传递一个第二个参数，来指定数字的进制
   如：parseInt("999aaa",10);
   
   // parseInt
   console.log(parseInt("999.8"))	// 999
   
   console.log(parseInt("999www"))	// 999
   
   console.log(parseInt("www999www"))	// NaN
   
   console.log(parseInt(null))	// NaN
   
   console.log(parseInt(undefined))	// NaN
   
   console.log(parseInt(''))	// NaN
   
   console.log(parseInt('  '))	// NaN 字符串中空格也是NaN
   
   console.log(parseInt(true))	// NaN
   
   console.log(parseInt(0xc,10))	// 12
   
   console.log(parseInt(0xc,8))	// 10
   
   // parseFloat
   console.log(parseFloat('222.3'))	// 222.3
   
   console.log(parseFloat('222www'))	// 222
   
   console.log(parseFloat('222www.9'))	// 222
   
   console.log(parseFloat('ww222'))	// NaN
   
   console.log(parseFloat(null))	// NaN
   
   console.log(parseFloat(undefined))	// NaN
   
   console.log(parseFloat('123.123.123'))	// 123.123
   
   console.log(parseFloat(true))	// NaN
   ```

3. 隐式转换

   ```javascript
   若字符串中的是纯数字，则直接返回该数值
   若字符串中不是纯数字，则返回NaN
   若字符串为空，则返回0
   转换布尔型，则true返回1，false返回0
   转换undefined，则返回NaN
   
   
   let bbb=+'99.9'
   console.log(bbb)	// 99.9
   
   bbb='99.9'-1
   console.log(bbb)	// 98.9
   
   bbb=+true
   console.log(bbb)	// 1
   
   bbb=+""
   console.log(bbb)	// 0
   
   bbb=+"888w"
   console.log(bbb)	// NaN
   
   bbb=+undefined
   console.log(bbb)	// NaN
   ```



## 2. 其他值到字符串的转换规则

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 `toString()` 方法，否则会调用 `toString()（Object.prototype.toString()）`来返回内部属性` [[Class]] `的值，如"[object Object]"。如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

### 2.1 将其他类型转换为String类型的方法

1. 使用`toString()`方法

   ```javascript
   console.log((222).toString())	// 字符串222
   
   console.log(true.toString())	// 字符串true
   ```

2. 调用 `String()` 函数

   ```javascript
   console.log(String(null))	// 字符串null
   
   console.log(String(undefined))	// 字符串undefined
   
   console.log(String(obj))	// [object Object] 未重写toString方法的对象会输出内部属性[[Class]]的值
   ```

3. 使用隐式转换

   ```javascript
   console.log(''+true)	// 字符串true
   ```

## 3. 其他值到布尔类型的值的转换规则

以下这些是假值： • undefined • null • false • +0、-0 和 NaN • ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值以外的都应该是真值。

```javascript
console.log(Boolean(undefined))	// false

console.log(Boolean(null))	// false

console.log(Boolean(false))	// false

console.log(Boolean(0))	// false

console.log(Boolean(+0))	// false

console.log(Boolean(-0))	// false

console.log(Boolean(NaN))	// false

console.log(Boolean(""))	// false
```

## 4. || 和 && 操作符的返回值

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

## 5. Object.is() 与比较操作符 “===”、“==” 的区别

`Object.is()` 方法用来判断两个值是否相等，它接收两个参数，分别是需要比较的两个值。

返回一个 `Boolean` 值标示这两个值是否相等。

```javascript
Object.is(123, 123);  // true
Object.is(123, '123');  // false
Object.is([], []);  // false
Object.is(NaN, NaN); // true
```

### 5.1 与 "==" 比较

 我们都知道 `==` 比较两个值是否相等，如果两边的值不是同一个类型的话，会将他们转为同一个类型后再进行比较。

```javascript
123 == '123';   // true
'' == false;    // true
false == 0;     // true
NaN == NaN;     // false
[]==[]			// false
```

而 `Object.is()` 不会对要比较的内容的类型进行转换

```javascript
Object.is(123, 123);  // true
Object.is(123, '123');  // false
Object.is(undefined, undefined);   // true
Object.is(0, false);    // false
```

### 5.2 与 “===” 比较

 `===` 不会对类型进行转换，两边的值必须相等且类型相同才会等到 `true` 。

```javascript
123 === 123;     // true
123 === '123';   // false
'' === false;    // false
false === 0;     // false
NaN === NaN;     // false
```

需要特殊注意的是，对于 `0` 和 `NaN` 的比较。无论 `0` 的正负，他们都是相等的，而 `NaN` 是与任何值都不相等的，包括他本身。

```javascript
+0 === -0;  // true
0 === -0;  // true
+0 === 0;  // true
NaN === NaN;  // false
```

 而 `Object.is()` 会将 `NaN` 与 `NaN` 视为相等，无符号的 `0` 归为整数

```javascript
Object.is(0, +0);    // true
Object.is(-0, 0);    // false
Object.is(-0, +0);    // true
Object.is(NaN, NaN);    // true
```

### 5.3 对于 引用类型 的值的比较

JavaScript的数据类型分为 `值类型` 和 `引用类型` 两种：

- 值类型：字符串（string）、数值（number）、布尔值（boolean）、undefined、null
- 引用类型：对象（Object）、数组（Array）、函数（Function）

**区别：**

- 值类型
  - 占用空间固定，保存在栈中
  - 保存与复制的是值本身
  - 使用typeof检测数据的类型
- 引用类型
  - 占用空间不固定，保存在堆中
  - 保存与复制的是指向对象的一个指针
  - 使用instanceof检测数据类型
  - 使用new()方法构造出的对象是引用型

来看几个例子：

```javascript
const a = {text: '123'};
const b = {text: '123'};
const c = a;

Object.is(a, b);  // false
Object.is(a, c);  // true
```

这与 `==` 和 `===` 的结果一致的，因为 a 与 b 不相等因为他们指向了不同的地址，c 是由a赋值而来的，他们指向的是同一个地址，因此是相等的。

```javascript
c.name = "hello";
Object.is(a, c);  // true

console.log(c);   // {text: "123", name: "hello"}
console.log(a);   // {text: "123", name: "hello"}
```

即使我们在后面对 c 的属性进行一些修改，它与 a 仍然是相等的。因为修改的是 a 与 c 共同指向的那个地址的值。

### 5.4 Object.is 如何实现的

`Object.is()` 除了 `IE` 浏览器不支持，其他的浏览器全部支持，如果要需要兼容IE的话，需要做一些兼容处理。

```javascript
if (!Object.is) {
    Object.is = function(x, y) {
        if (x === y) {
            // 判断0与+0
            return x !== 0 || 1/x === 1/y;
        } else {
            // 判断是否都为 NaN
            return x !== x && y !== y;
        }
    }
}
```

通过与 `===` 的比较我们知道，他只在 `0` 和 `NaN` 上的判断有所区别，我们只需要处理这这个特殊情况即可。

- 先判断 `x===y` ，为 `true` 时说明其中没有 `NaN`；如果x为 `+0` 或 `0` ，则 `+0 !== 0` 为 `false`，需要继续判断  `1/x === 1/y`；如果 x 或 y 其中有一个是 `-0` ，则运算后为 `-Infinity === Infinity` ，返回 `false`。
- 如果 `x!==y` 包含一个特殊情况，就是两个都为 `NaN` 的时候应该返回 `true`；因为 `NaN` 是与任何值都不相等的，包括它本身，那么只要 x 和 y 都不等于他们本身，就说们他们都是 `NaN` 。

## 6. 什么是 JavaScript 中的包装类型

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：

```javascript
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

在访问`'abc'.length`时，JavaScript 将`'abc'`在后台转换成`String('abc')`，然后再访问其`length`属性。

JavaScript也可以使用`Object`函数显式地将基本类型转换为包装类型：

```javascript
var a = 'abc'
Object(a) // String {"abc"}
```

也可以使用`valueOf`方法将包装类型倒转成基本类型：

```javascript
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```

看看如下代码会打印出什么：

```javascript
var a = new Boolean( false );
if (!a) {
	console.log( "Oops" ); // never runs
}
```

答案是什么都不会打印，因为虽然包裹的基本类型是`false`，但是`false`被包裹成包装类型后就成了对象，所以其非值为`false`，所以循环体中的内容不会运行。

### 6.1 valueOf() 方法的详解

1. `JavaScript` 中的 `valueOf()` 方法用于返回指定对象的原始值，若对象没有原始值，则将返回对象本身。**通常由`JavaScript`内部调用，而不是在代码中显式调用。**
2. 默认情况下，`valueOf` 方法由 `Object` 后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。
3. `JavaScript` 的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的 `valueOf()` 方法的返回值和返回值类型均可能不同。

不同类型对象的 valueOf() 方法的返回值：

```javascript
Array：返回数组对象本身。

Boolean： 返回布尔值

Date：存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。

Function： 返回函数本身。

Number： 返回数字值。

Object：返回对象本身。这是默认情况。

String：返回字符串值。

Math 和 Error 对象没有 valueOf 方法。
```

```javascript
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
// Sun Aug 18 2013 23:11:59 GMT+0800 (中国标准时间)
var date = new Date(2013, 7, 18, 23, 11, 59, 230); 
console.log(date.valueOf());   // 1376838719230

// Number：返回数字值
var num =  15.26540; // 15.2654
num.valueOf() // 15.2654
console.log(num.valueOf() === num);   // true

// 布尔：返回布尔值true或false
var bool = true;
console.log(bool.valueOf() === bool);   // true

// new一个Boolean对象
var newBool = new Boolean(true); // Boolean {true}
newBool.valueOf() // true
// valueOf()返回的是true，两者的值相等
console.log(newBool.valueOf() == newBool);   // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool);   // false


// Function：返回函数本身
function foo(){}
console.log( foo.valueOf() === foo );   // true

var foo2 =  new Function("x", "y", "return x + y;");
console.log( foo2.valueOf() === foo2); // true

// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );   // true

// String：返回字符串值
var str = "http://www.xyz.com";
console.log( str.valueOf() === str );   // true

// new一个字符串对象
// String {"http://www.xyz.com"}
var str2 = new String("http://www.xyz.com"); 
str2.valueOf() // "http://www.xyz.com"
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log( str2.valueOf() === str2 );   // false
```

