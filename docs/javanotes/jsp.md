---
title: JSP
order: 3
toc: content
group: 
  title: Java
  order: 3
---


# JSP笔记

虽然JSP已经是一种过时的技术，但是对于初学java和java web的同学来说还是有必要了解学习一下的

古往今来，优胜劣汰，旧技术终会淘汰，要时刻保持对新技术的追求和对基础的牢牢把握

## 一、jsp注释

一种是显式注释，这种注释是允许客户端看见的；一种是隐式注释，这种是客户端无法看见的

1. 显式注释语法：从HTML风格继承而来
2. 隐式注释语法：从java风格继承而来；jsp自己的注释

jsp的三种注释方式：

```java
1. // 注释，单行注释  /* 多行注释*/ （隐式注释）
    
2. <!-- HTML风格的注释 --> （显式注释）
    
3. <%-- JSP注释  --%> （隐式注释）
```



## 二、Scriptlet

在jsp中最重要的就是Scriptlet (**脚本小程序**)，**所有嵌套在HTML代码中的java程序**

在jsp中有三种Scriptlet代码：**都必须使用Scriptlet标记出来**

```java
1. <%   %>: java脚本段，可以定义局部变量、方法、类

2. <%!   %>: 声明，可以定义全局（成员）变量、方法、类
    
3. <%=   %>: 输出表达式，输出一个变量或具体内容
```



## 三、jsp的指令标签

使用包含我们可以将一些重复代码进行复用

**静态包含、动态包含**

静态包含使用include指令即可，动态包含则需要使用include动作标签

### include静态包含

```java
<%@ include file="要包含的文件路径" %> <!-- 相对路径 -->
```

例：

```java
<%@ include file="include.jsp" %>
或
<%@ include file="include.html" %>
```

特点：

```java
1. 将内容进行了直接的替换
2. 静态包含只会生成一个源码文件，最终的内容全部在_jspService方法体中（源文件中）
3. 不能出现同名变量
4. 运行效率高一点，耦合性较高，不够灵活
```

### include动态包含

动态包含在代码的编译阶段，包含和被包含部分是两个独立的部分，只有运行时，才会动态包含进来，好比方法的调用

```java
<jsp:include page="include.jsp"></jsp:include>
```

**注意：** 没有传参时，动态包含标签中间不要加任何内容，包含空格和回车等，除非要使用参数，否则会报错！

```java
<jsp:include page="include.jsp"></jsp:include>
    <%
    	String str="hello.jsp";
    %>
<jsp:include page="<%=str%>"></jsp:include>
```

**特点：**

```java
1.动态包含会生成多个源码文件
2.动态包含相当于方法的调用
3.可以定义同名变量
4.效率高，耦合低
```

使用动态包含还可以通过在页面之间传参

接收参数通过`request.getParameter(name)`;

例：

```java
<jsp:include page="include.jsp">
    <jsp:param name="uname" value="admin"> // 接收之后就是一个uname的变量，值为admin
	<jsp:param name="msg" value="<%=str%>"> //str是变量,接收后为一个msg的变量，值为str的值
</jsp:include>
    
    
<%
    String name=request.getParameter(uname); //admin
	String msg=request.getParameter(msg); //admin
%>
```



## 四、jsp四大域对象

在jsp中提供了四种属性的保存范围，指的是设置一个对象，可以在多个页面中保存并可以继续使用

```java
1.page范围
    在当前页面有效，跳转之后无效
    pageContext.setAttribute("name1","zhangsan"); //传输数据
2.request范围
    在一次请求中有效，服务端跳转有效，客户端跳转无效
    如果是客户端跳转，相当于发出两次请求，第一次请求将不存在
    request.setAttribute("name2","lisi");
3.session范围
    在一次会话中有效，服务端和客户端跳转都有效
    保存在浏览器中，重新开一个浏览器则不存在
    session.setAttribute("name3","wangwu");
4.application范围
    在整个应用中有效，服务器不关就一直有效
    保存在服务器中
    application.setAttribute("name4","zhaoliu");
```

```java
// 接收数据
pageContext.getAttribute("name1");
request.getAttribute("name2");
session.getAttribute("name3");
application.getAttribute("name4");
```

### jsp中跳转方式

```java
1.服务端跳转
    <jsp:forword page="跳转的页面地址"></jsp:forword>
2.客户端跳转
    超链接
	<a href="" />
```



## 五、EL表达式

### EL表达式的语法

EL表达式是为了简化jsp代码书写

**语法结构**

```java
${变量或其他}
```

EL表达式一般操作的是域对象中的数据，操作不了局部变量

域对象的概念在jsp中一共有四个：**pageContext,request,session,application;** 作用范围依次是：本页面，一次请求，一次会话，整个应用程序。

获取数据可以使用四个域对象对应的空间对象，分别是：**pageScope,requestScope,sessionScope,applicationScope**

EL默认的查找的方式为从小到大，找到即可。当域对象中找完了还没找到则返回空字符串。

**EL表达式概述：**

```java
作用：简化jsp代码
格式：${域对象的名称}
操作对象：EL表达式一般操作是域对象，不能操作局部变量
操作范围：
    page范围
    	当前页面
    request范围
    	在一次请求
    seesion范围
    	在一次会话
    application范围
    	在整个应用
例如：
    pageContext.setAttribute("uname","zhangsan");//page作用域
	request.setAttribute("uname","lisi");//request作用域
	session.setAttribute("uname","lisi");//session作用域
	application.setAttribute("uname","lisi");//application作用域

    ${pageScope.uname}
	${request.uname}
	${session.uname}
	${application.uname}

注：
    1.如果el表达式获取的域对象的值为空，默认显示的是空字符串
    2.el表达式默认从小到大范围去找，找到即可，如果四个范围都未找到，则显示空字符串
```



### EL表达式的使用

#### 获取对象

```java
获取域对象的值

// 设置域对象的数据
<%
    pageContext.setAttribute("uname","zhangsan");//page作用域
	request.setAttribute("uname","lisi");//request作用域
	session.setAttribute("uname","lisi");//session作用域
	application.setAttribute("uname","lisi");//application作用域
%>
    
// 获取域对象的值
    ${pageScope.uname}
	${request.uname}
	${session.uname}
	${application.uname}
注：
    获取域对象的数据默认是查找方式由大范围到小范围，找到即止，若四个范围都未找到，则返回空字符串
```

```java
获取List
    
// 创建一个List（数组）并加到域对象
<%
    List<String> list = new ArrayList<>();
	List.add("aaa");
	List.add("bbb");
	List.add("ccc");
	reuqest.setAttribute("list",list);
%>
    
// EL表达式获取List
${list.size()}	// 获取list的长度
${list[1]}	// 获取指定下标的值
```

```java
获取Map

// 创建一个Map并存到域对象
<%
    Map map = new HashMap();
	map.put("aaa","111");
	map.put("bbb",222);
	map.put("ccc",333);
	reuqest.setAttribute("map",map);
%>
    
// EL表达式获取Map
${map.aaa}
或
${map["aaa"]}
```

```java
获取JavaBean对象
    
// new一个对象(示列)
<%
    User user = new User();
	user.setUserId(1);
	user.setNmae("zhangsan");
	reuqest.setAttribute("user",user);
%>

// EL获取JavaBean对象
${user.name}
或
${user.getName()}

注：
    JavaBean对象必须提供get方法
```



#### EL表达式中的empty

```java
empty:
	判断域对象是否为空，为空返回true，不为空返回false
使用：
	判断对象为空
	${empty 限域变量名}
	判断对象不为空
	${!empty 限域变量名}
```

```java
// 判断字符串
<%
    reuqest.setAttribute("str1","abc");
	reuqest.setAttribute("str2","");
	reuqest.setAttribute("str3",null);
%>

${empty str}	// true str不存在则为空
${empty str1}	// false 不为空返回false
${empty str2}	// 空字符串返回true
${empty str3}	// null为空 返回true
```

```java
// 判断List(集合)
<%
    List list1 = new ArrayList<>();
	List list2 = null;
	List list3 = new ArrayList<>();
	list3.add(1);

	reuqest.setAttribute("list1",list1);
	reuqest.setAttribute("list2",list2);
	reuqest.setAttribute("list3",list3);
%>
    
${empty list1}	// true 没有长度的空集合
${empty list2}	// true
${empty list3}	// 有元素的集合，不为空 false
```

```java
// 判断Map
<%
    Map map1 = null;
	Map map2 = new HashMap<>();
	Map map3 = new HashMap<>();
	map3.put(1,2);

	reuqest.setAttribute("map1",map1);
	reuqest.setAttribute("map2",map2);
	reuqest.setAttribute("map3",map3);
%>
    
${empty map1}	// true 空
${empty map2}	// true 空Map对象
${empty map3}	// 有元素的Map，不为空 false
```

```java
// 判断JavaBean对象
<%
    User user1 = null;
	User user2 = new User();
	User user3 = new User();
	user3.setUserId(1);
	
	reuqest.setAttribute("user1",user1);
	reuqest.setAttribute("user2",user2);
	reuqest.setAttribute("user3",user3);
%>
    
${empty user1}	// true 空
${empty user2}	// false 对象创建之后不为空
${empty user3}	// false
```



#### EL运算

```java
<%
	reuqest.setAttribute("a",10);
	reuqest.setAttribute("b",2);
	reuqest.setAttribute("c","aa");
	reuqest.setAttribute("d","bb");
%>
```

**等值判断**

```java
${a == b}	// false
${c == d}	//false
${c eq d}	//false
${a == 10}	//true
${c == 'aa'}	//true

注：
    eq和==一样 都是等值判断
```

**算术运算**

```java
${a + b}
${a / b}
${a div b}

注：
    加法：+
    减法：-
    乘法：*
    除法：/ 或 div
```

**大小比较**

```java
${a > b}
${a < b}
${a >= b}
${a <= b}

${a <= b && b>5} // 与运算
${a <= b || b>5} // 或运算

注：
    大于：>
    小于：<
    大于等于：>=
    小于等于：<=
```



## 六、JSTL

### JSTL标签的使用

Java Server Page Standard Tag Libray (JSTL)：JSP标准标签库，是一个订制标签类库的集合，用于解决一些常见问题。

**核心标签库：**

​	http://java.sun.com/jsp/jstl/core

​	包含web应用的常见工作，比如：循环、表达式赋值、基本输入输出等

**格式化标签库：**

​	http://java.sun.com/jsp/jstl/fmt

​	用来格式化显示数据的工作，比如：不同区域的日期格式化等

为了在JSP页面使用JSTL类库，必须先使用`taglib`指令引入

```java
<%@taglib uri="" prefix="" %>
```

例如：

```java
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```

**JSTL的使用**

```java
1.下载JSTL所需要的jar包(standard.jar 和 jstl.jar)
2.在项目的web目录下的WEB-INF中新建lib目录，将jar包拷贝进去
3.选择“File”，再选择“Project Structure”
4.选择“Modules”，选择右侧的“Dependenices”，选择“+”号，将对应的lib目录添加进去
5.在需要的页面中通过 taglib 标签引入指定的库
```



### 条件动作标签

#### if标签

```java
if标签
    格式：
    	<c:if text="<boolean>" var="<string>" scope="<string>">...</c:if>
	常用属性：
        test：条件判断，操作的是域对象，接收返回结果是Boolean类型的值（必要属性）
		var：限域变量名（存放在作用域中的变量），用来接收判断结果的值（可选属性）
		scope：限制变量的范围（page、request、session、application）（可选属性）
```

**使用**

```java
// 先在页面中的head标签中引入jar库
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
// 设置数据
<%
    request.setAttribute("num",10);
%>
// 页面中使用if
<c:if text="${num > 0}">
    111	//如果满足text中的条件就显示标签中的内容
</c:if>
或
<c:if text="${num > 100}" var="flag" scope="request">
    222	//如果满足text中的条件就显示标签中的内容
</c:if>
${flag} --- ${requestScope.flag} --- ${sessionScope.flag}

注：
    1.标签操作的一般是域对象
    2.if标签没有else，如果想要else的效果，就需要设置两个完全相反的条件
```



#### choose、when 和 otherwise 标签

choose、when 和 otherwise 标签的作用和 switch 与 case 关键字的作用类似

**语法格式**

```java
<c:choose>
    <c:when test="<boolean>">
        ...
    </c:when>
	<c:when test="<boolean>">
        ...
    </c:when>
	<c:when test="<boolean>">
        ...
    </c:when>
	<c:otherwise>
        ...
	</c:otherwise>
</c:choose>
```

**属性**

```java
1.choose标签没有属性
2.when标签只有一个test属性，必须属性
3.otherwise标签没有属性
```

**注意**

```java
1.choose标签和otherwise标签没有属性，而when标签必须有一个test属性
2.choose标签中必须包含一个至少一个when标签，可以没有otherwise标签
3.otherwise标签必须设置在所有的when标签后面
4.choose标签中只能放when和otherwise标签，不能写其他内容，内容需要写在when和otherwise标签中
5.when标签和otherwise标签可以嵌套其他标签
6.otherwise标签会在所有的when标签不满足的情况下执行
```



### 迭代标签

forEach是将一个主体内容迭代多次，或者迭代一个对象集合。

#### forEach标签

**语法格式**

```java
<c:forEach>
    items="<object>"
    begin="<int>"
    end="<int>"
    step="<int>"
    var="<string>"
    varStatus="<string>"
</c:forEach>
```

**属性**

```java
begin: 开始数
end: 结束数
step: 间隔数
var: 限域变量名，用来接收当前遍历的成员
items: 要循环的数据（数组、List、Map等）
varStatus: 
	index: 当前遍历的索引
	count: 当前的迭代从1开始的迭代计数
	first: 是否是第一次索引，是返回true，不是返回false
	last: 是否是最后一次索引，是返回true，不是返回false

1.迭代主体内容多次
    <c:forEach begin="开始数" end="结束数" step="间隔数" var="接收每次循环的变量">		</c:forEach>

相当于Java中的for循环
            
例：
	<c:forEach begin="1" end="10" step="1" var="i">
        ${i} // 依次输出12345678910
	</c:forEach>
        

        
2.循环
	<c:forEach items="要被循环的数据" var="接收每次循环的变量">
    </c:forEach>
        
相当于Java中的foreach
        for(String:str : list){}

例：
<%
    List<String> list = new ArrayList<>();
	for(int i;i<=10;i++){
        list.add("A:"+i);
    }
	pageContext.setAttribute("li",list);
%>
<c:forEach items="${li}" var="item">
    ${item} // 依次输出A:1到A:10
</c:forEach>
    
    
varStatus的使用：
    <c:forEach items="${li}" var="item" varStatus="itemp">
        <span>${item}</span>
        <span>${itemp.index}</span> // 输出当前的索引
        <span>${itemp.count}</span> //输出当前的遍历次数，索引+1
        <span>${itemp.first}</span> // 输出true，false
        <span>${itemp.last}</span> // 输出true，false
    </c:forEach>
```

```java
循环对象集合：
    <%
    	List<user> uList = new ArrayList<>();
		User u1 = new User(1,"zhangsan",22);
		User u2 = new User(2,"zhangsan",21);
		User u3 = new User(3,"zhangsan",23);
		User u4 = new User(4,"zhangsan",24);

		uList.add(u1);
		uList.add(u2);
		uList.add(u3);
		uList.add(u4);

		request.setAttribute("uList",uList);
    %>
    
	// 判断集合是否为空
	<c:if test="${!empty uList}">
        <c:forEach items="${uList}" var="user">
            ${user.uId}
			${user.uName}
			${user.uAge}
		</c:forEach>
	</c:if>
```

```java
循环Map：
<%
    Map<String,Object> map = new HashMap<>();
	map.put("m1","aaa");
	map.put("m2","bbb");

	request.setAttribute("map",map);
%>
<c:forEach items="${map}" var="m">
	${m.key}
	${m.value}
</c:forEach>
```



### 格式化动作标签

JSTL提供了格式化和解析数字和日期的标签，我们讨论里面有：`formatNumber` `formatDate` `parseNumber` `parseDate`

#### formatNumber标签

formatNumber标签用于格式化数字、百分比、货币。该标签用于指定的格式或精度来格式化数字。（将数值类型转换成指定的字符串类型）

**语法格式**

```java
<fmt:formatNumber
    value="<string>"
    type="string"
    var="string"
    scope="string" />
```

**常用属性**

```java
value: 要格式化的数值
type: 要格式化的类型
	number：数值型（默认）
    percent：百分比类型
    currency：货币类型

var：用来接收格式化后的结果
scope：var属性的范围（page、request、session、application）
    
注：
    1.如果使用了var属性，标签不会输出结果，需要通过el表达式获取
    2.默认的类型（type）的取值number
```



**使用**

```java
// 先引入格式化标签库
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    
<fmt:formatNumber value="10" type="number" var="num" /> ${num}

<fmt:formatNumber value="10" type="percent" /> // 百分比类型
    
<fmt:formatNumber value="10" type="currency" /> //货币类型 中国时区的货币类型
    
// 设置时区
<fmt:setLocale value="en_US" />
<fmt:formatNumber value="10" type="currency" /> //货币类型 美国时区的货币类型
```



#### formatDate标签

formatDate标签用于使用不同的方式格式化日期。（将Date型数据转化成正指定格式的字符串类型）

**语法格式**

```java
<fmt:formatNumber
    value="<string>"
    type="string"
    dateStyle="<string>"
    timeStyle="<string>"
    pattern="<string>"
    timeZone="<string>"
    var="string"
    scope="string" />
```

**属性**

```java
value: 要格式化的日期
type: 格式化的类型
    date 日期型 年月日
    time 时间型 时分秒
    both 日期时间型
dateStyle: 日期格式
    FULL LONG MEDIUM SHORT DEFAULT
timeStyle: 日期时间
    FULL LONG MEDIUM SHORT DEFAULT
pattern: 自定义格式
timeZone: 显示日期的时区
var: 接收格式化后的值
scope: 存格式化日志变量的范围
    
    
标签格式模式
    y 年
    M 月
    d 日
    h 12小时制
    H 24小时制
    m 分
    s 秒
```

**使用**

```java
<fmt:formatNumber value="${myDate}" />
<fmt:formatNumber value="${myDate}" type="date" />
<fmt:formatNumber value="${myDate}" type="time" />
<fmt:formatNumber value="${myDate}" type="both" />
<fmt:formatNumber value="${myDate}" type="both" dateStyle="FULL" />
<fmt:formatNumber value="${myDate}" type="both" timeStyle="short" />
<fmt:formatNumber value="${myDate}" type="both" pattern="yyyy-MM-dd" />
```





#### parseNumber标签

parseNumber标签用来解析数字，百分数，货币。（parseNumber可以将数字、货币或百分比类型的字符串转成数值型）

**语法格式**

```java
<fmt:parseNumber
    value="<string>"
    type="<string>"
    var="<string>"
    scope="<string>" />
```

**使用**

```java
<fmt:parseNumber value="100" /> // 100
<fmt:parseNumber value="100" type="number" /> // 100
<fmt:parseNumber value="100%" type="percent" /> // 1
<fmt:parseNumber value="￥100" type="curency" /> // 100
```



#### parseDate标签

将日期型的字符串转成Date型

**格式**

```java
<fmt:parseDate
    value="<string>"
    type="<string>"
    dateStyle="<string>"
    timeStyle="<string>"
    pattern="<string>"
    timeZone="<string>"
    var="<string>"
    scope="<string>" />
```

**使用**

```java
<fmt:parseDate value="2023-02-28" /> 
<fmt:parseDate value="2023/02/28" pattern="yyyy/MM/dd" /> 
```

