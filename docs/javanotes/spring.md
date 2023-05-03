---
title: Spring
order: 4
toc: content
group: 
  title: Java
  order: 4
---


# Spring笔记

参考了b站动力节点spring课程的配套笔记

动力节点spring笔记地址：[Spring6 (yuque.com)](https://www.yuque.com/dujubin/ltckqu/kipzgd)

## 环境准备

`Spring6` 最低要求的版本是 `JDK17`

先将工程的 jdk 改为 17，编译器也改为 17

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring1.png)

再将工程的 `maven` 改为自己的本地的maven地址

settings也要改为自己本地的 `maven` 下的 `conf` 文件夹下的 `settings.xml`

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring2.png)



## OCP开闭原则

- 什么是 `OCP`?

  `OCP` 是软件七大开发原则当中最基本的一个原则:

  开闭原则对什么开?	对扩展开放。

  对什么闭?	对修改关闭。

- `OCP` 原则是最核心的，最基本的，其他的六个原则都是为这个原则服务的。

- `OCP` 开闭原则的核心是什么?

  只要你在扩展系统功能的时候，没有修改以前写好的代码，那么你就是符合OCP原则的。

  反之，如果在扩展系统功能的时候，你修改了之前的代码，那么这个设计是失败的，违背OCP原则。

- 当进行系统功能扩展的时候，如果动了之前稳定的程序，修改了之前的程序，之前所有程序都需要进行重新测试。这是不想看到的，因为非常麻烦。



## DIP依赖倒置原则

`UserAction` 依赖了具体的 `UserServicelmpl`

`UserServicelmpl` 依赖了具体的 `UserDaolmplForMysQL` 

目前来说:	上是依赖下的。

- 凡是上依赖下的，都违背了依赖倒置原则。

- 什么叫做符合依赖倒置原则?	什么叫做遵守依赖倒置原则?

  上不再依赖下了。表示符合依赖倒置原则。

- 依赖倒置原则的核心是什么?

  倡导面向接口编程，面向抽象编程，不要面向具体编程。

### 什么是依赖倒置原则?

面向接口编程，面向抽象编程，不要面向具体编程。

### 依赖倒置原则的目的?

降低程序的耦合度，提高扩展力。

### 什么叫做符合依赖倒置?

上 不依赖 下，就是符合。

### 什么叫做违背依赖倒置?

上 依赖 下，就是违背。

只要“下”一改动，“上" 就受到牵连。

当前程序的设计，显然既违背OCP，又违背DIP，怎么办?

可以采用 “控制反转" 这种编程思想来解决这个问题。

### 什么是控制反转?

控制反转: `IoC` (Inversion of Control) 

反转是什么呢?

​	反转的是两件事 :

​	第一件事:  我不在程序中采用硬编码的方式来new对象了。(new对象我不管了，new对象的权利交出去了。)

​	第二件事:  我不在程序中采用硬编码的方式来维护对象的关系了。(对象之间关系的维护权，我也不管了，交出去了。)



控制反转:  是一种编程思想。或者叫做一种新型的设计模式。由于出现的比较晚，没有被纳入GoF23种设计模式范围内。



## Spring 概述

* Spring框架实现了控制反转IoC这种思想
  Spring框架可以帮你new对象。
  Spring框架可以帮你维护对象和对象之间的关系。

* Spring是一个实现了IoC思想的容器。

* 控制反转的实现方式有多种，其中比较重要的叫做:依赖注入(Dependency Injection，简称DI)。

* 控制反转是思想。依赖注入是这种思想的具体实现。

* 依赖注入DI，又包括常见的两种方式:

第一种: set注入(执行set方法给属性赋值)

第二种: 构造方法注入(执行构造方法给属性赋值)

* 依赖注入中 “依赖" 是什么意思?  “注入" 是什么意思?

依赖:  A对象和B对象的关系。

注入:  是一种手段，通过这种手段，可以让A对象和B对象产生关系。

依赖注入:  对象A和对象B之间的关系，靠注入的手段来维护。



依赖注入的实现由包括两种方式：

- set方法注入

- 构造方法注入



### Spring简介

Spring是一个开源框架，它由Rod Johnson创建。它是为了解决企业应用开发的复杂性而创建的。

从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。

**Spring是一个轻量级的控制反转(IoC)和面向切面(AOP)的容器框架。**

**Spring最初的出现是为了解决EJB臃肿的设计，以及难以测试等问题。**

**Spring为简化开发而生，让程序员只需关注核心业务的实现，尽可能的不再关注非业务逻辑代码（事务控制，安全日志等）。**



### Spring8大模块

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring3.png)

#### 1. Spring Core模块

这是`Spring`框架最基础的部分，它提供了依赖注入（DependencyInjection）特征来实现容器对`Bean`的管理。核心容器的主要组件是` BeanFactory，BeanFactory`是工厂模式的一个实现，是任何`Spring`应用的核心。它使用`IoC`将应用配置和依赖从实际的应用代码中分离出来。

#### 2. Spring Context模块

如果说核心模块中的`BeanFactory`使`Spring`成为容器的话，那么上下文模块就是`Spring`成为框架的原因。

这个模块扩展了`BeanFactory`，增加了对国际化`（I18N）`消息、事件传播、验证的支持。另外提供了许多企业服务，例如电子邮件、JNDI访问、EJB集成、远程以及时序调度（scheduling）服务。也包括了对模版框架例如`Velocity`和`FreeMarker`集成的支持

#### 3. Spring AOP模块

`Spring`在它的`AOP`模块中提供了对面向切面编程的丰富支持，`Spring AOP` 模块为基于 `Spring` 的应用程序中的对象提供了事务管理服务。通过使用 `Spring AOP`，不用依赖组件，就可以将声明性事务管理集成到应用程序中，可以自定义拦截器、切点、日志等操作。

#### 4. Spring DAO模块

提供了一个`JDBC`的抽象层和异常层次结构，消除了烦琐的`JDBC`编码和数据库厂商特有的错误代码解析，用于简化`JDBC`。

#### 5. Spring ORM模块

`Spring` 提供了`ORM`模块。`Spring`并不试图实现它自己的`ORM`解决方案，而是为几种流行的`ORM`框架提供了集成方案，包括`Hibernate、JDO和iBATIS SQL`映射，这些都遵从 `Spring` 的通用事务和 `DAO` 异常层次结构。

#### 6. Spring Web MVC模块

`Spring` 为构建 `Web` 应用提供了一个功能全面的 `MVC` 框架。虽然 `Spring` 可以很容易地与其它 `MVC` 框架集成，例如 `Struts`，但 `Spring` 的 `MVC` 框架使用 `IoC` 对控制逻辑和业务对象提供了完全的分离。

#### 7. Spring WebFlux模块

`Spring Framework` 中包含的原始 `Web` 框架 `Spring Web MVC` 是专门为 `Servlet API` 和 `Servlet` 容器构建的。反应式堆栈 Web 框架 `Spring WebFlux` 是在 5.0 版的后期添加的。它是完全非阻塞的，支持反应式流(Reactive Stream)背压，并在`Netty，Undertow和Servlet 3.1+`容器等服务器上运行。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring4.png)

#### 8. Spring Web模块

`Web` 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文，提供了 `Spring` 和其它 `Web` 框架的集成，比如 `Struts、WebWork`。还提供了一些面向服务支持，例如：实现文件上传的`multipart`请求。



### Spring特点

1. 轻量

2. - 从大小与开销两方面而言Spring都是轻量的。完整的Spring框架可以在一个大小只有`1MB`多的`JAR`文件里发布。并且Spring所需的处理开销也是微不足道的。
   - Spring是非侵入式的：Spring应用中的对象不依赖于Spring的特定类。

3. 控制反转

4. - Spring通过一种称作控制反转（IoC）的技术促进了松耦合。当应用了IoC，一个对象依赖的其它对象会通过被动的方式传递进来，而不是这个对象自己创建或者查找依赖对象。你可以认为IoC与JNDI相反——不是对象从容器中查找依赖，而是容器在对象初始化时不等对象请求就主动将依赖传递给它。

5. 面向切面

6. - Spring提供了面向切面编程的丰富支持，允许通过分离应用的业务逻辑与系统级服务（例如审计（auditing）和事务（transaction）管理）进行内聚性的开发。应用对象只实现它们应该做的——完成业务逻辑——仅此而已。它们并不负责（甚至是意识）其它的系统级关注点，例如日志或事务支持。

7. 容器

8. - Spring 包含并管理应用对象的配置和生命周期，在这个意义上它是一种容器，你可以配置你的每个bean如何被创建——基于一个可配置原型（prototype），你的bean可以创建一个单独的实例或者每次需要时都生成一个新的实例——以及它们是如何相互关联的。然而，Spring不应该被混同于传统的重量级的EJB容器，它们经常是庞大与笨重的，难以使用。

9. 框架

10. - Spring可以将简单的组件配置、组合成为复杂的应用。在Spring中，应用对象被声明式地组合，典型地是在一个XML文件里。Spring也提供了很多基础功能（事务管理、持久化框架集成等等），将应用逻辑的开发留给了你。

所有Spring的这些特征使你能够编写更干净、更可管理、并且更易于测试的代码。它们也为Spring中的各种模块提供了基础支持。



## Spring入门

官网地址：https://spring.io/

官网地址（中文）：http://spring.p2hp.com/

### Spring的下载引入

注意

如果你只是想用Spring的IoC功能，仅需要引入：spring-context即可。将这个jar包添加到classpath当中。

如果采用maven只需要引入context的依赖即可。

```java
// spring bean依赖

<!--Spring6的正式版发布之前，这个仓库地址是需要的-->
<repositories>
  <repository>
    <id>repository.spring.milestone</id>
    <name>Spring Milestone Repository</name>
    <url>https://repo.spring.io/milestone</url>
  </repository>
</repositories>

<dependencies>
  <!--如果idea中报红就把M2去掉，右键maven，重新加载项目-->
  <!--spring context依赖：使用的是6.0.0-M2里程碑版-->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.0-M2</version>
  </dependency>
</dependencies>
```

如：

```java
// pom.xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.powernode</groupId>
    <artifactId>spring6-001-first</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <repositories>
        <repository>
            <id>repository.spring.milestone</id>
            <name>Spring Milestone Repository</name>
            <url>https://repo.spring.io/milestone</url>
        </repository>
    </repositories>

    <dependencies>
        <!--spring context依赖-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>6.0.0-M2</version>
        </dependency>
    </dependencies>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

</project>
```



引入依赖之后，需要创建一个.xml配置文件

```xml
<! --这就是Spring 的配置文件-->
<! --IDEA工具为我们提供了这个文件的模板，一定要使用这个模板来创建。-->
<! --这个文件名不一定叫做spring.xml，可以是其它名字。-->
<! --这个文件最好是放在类路径当中，方便后期的移植。-->
<! --放在resources根目录下，就相当于是放到了类的根路径下。-->
<! --配置bean，这样spring才可以帮助我们管理这个对象。->

bean标签的两个重要属性:
	id:是这个bean的身份证号，不能重复，是唯一的标识。
	class:必须填写类的全路径，全限定类名。（带包名的类名)

如：
// bean.xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="userBean" class="com.powernode.spring6.bean.User"/>
</beans>
```



### spring 的第一个程序

1. 先在pom.xml中引入相关依赖

   如：

   ```java
   // pom.xml 中引入相关jar包依赖
   
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
   
       <groupId>com.powernode</groupId>
       <artifactId>spring6-001-first</artifactId>
       <version>1.0-SNAPSHOT</version>
       <packaging>jar</packaging>
   
       <repositories>
           <repository>
               <id>repository.spring.milestone</id>
               <name>Spring Milestone Repository</name>
               <url>https://repo.spring.io/milestone</url>
           </repository>
       </repositories>
   
       <dependencies>
           <!--spring context依赖-->
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-context</artifactId>
               <version>6.0.0-M2</version>
           </dependency>
           <!--junit-->
           <dependency>
               <groupId>junit</groupId>
               <artifactId>junit</artifactId>
               <version>4.13.2</version>
               <scope>test</scope>
           </dependency>
       </dependencies>
   
       <properties>
           <maven.compiler.source>17</maven.compiler.source>
           <maven.compiler.target>17</maven.compiler.target>
       </properties>
   
   </project>
               
               
   // 注意：打包方式jar
   // spring aop：面向切面编程
   // spring beans：IoC核心
   // spring core：spring的核心工具包
   // spring jcl：spring的日志包
   // spring expression：spring表达式
   ```

2. 在main下新建包并创建所需类

   如：

   ```java
   // User.javas
   
   package com.gybsl.bean;
   
   public class User {
   }
   ```

   

3. 在src/main/resources中创建xml配置文件,**该文件放在类的根路径下**

   如：

   ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring1_1.png)

   ```java
   // beans.xml
   
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
       
       <bean id="userBean" class="com.powernode.spring6.bean.User"/>
   </beans>
           
           
   bean的id和class属性：
   ● id属性：代表对象的唯一标识。可以看做一个人的身份证号。
   ● class属性：用来指定要创建的java对象的类名，这个类名必须是全限定类名（带包名）。
   ```

4. 然后编写测试程序

   ```java
   package com.gybsl.test;
   
   import org.junit.Test;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.support.ClassPathXmlApplicationContext;
   
   public class Spring6Test {
   
       @Test
       public void testFirst(){
           // 初始化Spring容器上下文（解析beans.xml文件，创建所有的bean对象）
           ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
           // 根据id获取bean对象,这里的id是xml中bean标签设置的id
           Object userBean = applicationContext.getBean("userBean");
           System.out.println(userBean);
       }
   }
   ```

#### 第一个Spring程序详细剖析

- 在spring的配置文件中id是不能重名。

  - 在spring的配置文件中id是不能重名。

- 底层是怎么创建对象的，是通过反射机制调用无参数构造方法吗？

  - 创建对象时确实调用了无参数构造方法

- 如果提供一个有参数构造方法，不提供无参数构造方法会怎样呢？

  - spring是通过调用类的无参数构造方法来创建对象的，所以要想让spring给你创建对象，必须保证无参数构造方法是存在的

- Spring是如何创建对象的呢？原理是什么？

  - dom4j (一个xml文件解析工具) 解析beans.xml文件，从中获取class的全限定类名
  - 通过反射机制调用无参数构造方法创建对象

- 把创建好的对象存储到一个什么样的数据结构当中了呢？

  - 会存储在 `Map<String,Object>` 类型中
  - 如：![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/spring1_2.png)

- spring配置文件的名字必须叫做beans.xml吗？

  - xml配置文件的名字随意

- 像这样的beans.xml文件可以有多个吗？

  - spring的配置文件可以有多个，在ClassPathXmlApplicationContext构造方法的参数上传递文件路径即可

  - ```java
    如：
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml","spring.xml");
    ```

- 在配置文件中配置的类必须是自定义的吗，可以使用JDK中的类吗，例如：java.util.Date？

  - 在 spring 配置文件中配置的 bean 可以任意类，只要这个类不是抽象的，并且提供了无参数构造方法

- `getBean()`方法调用时，如果指定的id不存在会怎样？

  - 当 id 不存在的时候，会出现异常

- getBean()方法返回的类型是Object，如果访问子类的特有属性和方法时，还需要向下转型，有其它办法可以解决这个问题吗？

  - ```java
    如：
        // 将该类的字节码文件传过去
        User user = applicationContext.getBean("userBean", User.class);
    ```

- ClassPathXmlApplicationContext是从类路径中加载配置文件，如果没有在类路径当中，又应该如何加载配置文件呢？

  - 没有在类路径中的话，需要使用FileSystemXmlApplicationContext类进行加载配置文件。

    这种方式较少用。一般都是将配置文件放到类路径当中，这样可移植性更强。

- `ApplicationContext`的超级父接口`BeanFactory`

  - ```java
    BeanFactory是ApplicationContext的最上层父接口
    BeanFactory是Spring容器的超级接口。ApplicationContext是BeanFactory的子接口
    如：
        
    BeanFactory beanFactory = new ClassPathXmlApplicationContext("spring.xml");
    Object vipBean = beanFactory.getBean("vipBean");
    System.out.println(vipBean);
    ```



### Spring6启用Log4j2日志框架

1. 引入Log4j2的依赖

   ```java
   <!--log4j2的依赖-->
   <dependency>
     <groupId>org.apache.logging.log4j</groupId>
     <artifactId>log4j-core</artifactId>
     <version>2.19.0</version>
   </dependency>
   <dependency>
     <groupId>org.apache.logging.log4j</groupId>
     <artifactId>log4j-slf4j2-impl</artifactId>
     <version>2.19.0</version>
   </dependency>
   ```

2. 在类的根路径下提供log4j2.xml配置文件（文件名固定为：log4j2.xml，文件必须放到类根路径下。）,如在resource目录中创建

   ```java
   // log4j2.xml中
   
   <?xml version="1.0" encoding="UTF-8"?>
   
   <configuration>
   
       <loggers>
           <!--
               level指定日志级别，从低到高的优先级：
                   ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < OFF
           -->
           <root level="DEBUG">
               <appender-ref ref="spring6log"/>
           </root>
       </loggers>
   
       <appenders>
           <!--输出日志信息到控制台-->
           <console name="spring6log" target="SYSTEM_OUT">
               <!--控制日志输出的格式-->
               <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss SSS} [%t] %-3level %logger{1024} - %msg%n"/>
           </console>
       </appenders>
   
   </configuration>
   ```

3. 使用日志框架

   ```java
   Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
   logger.info("我是一条日志消息");
   ```



## Spring对IoC的实现

### IoC 控制反转

- 控制反转是一种思想。
- 控制反转是为了降低程序耦合度，提高程序扩展力，达到OCP原则，达到DIP原则。
- 控制反转，反转的是什么？

- - 将对象的创建权利交出去，交给第三方容器负责。
  - 将对象和对象之间关系的维护权交出去，交给第三方容器负责。

- 控制反转这种思想如何实现呢？

- - DI（Dependency Injection）：依赖注入

### 依赖注入

依赖注入实现了控制反转的思想。

Spring通过依赖注入的方式来完成Bean管理的。

Bean管理说的是：Bean对象的创建，以及Bean对象中属性的赋值（或者叫做Bean对象之间关系的维护）。

依赖注入：

- 依赖指的是对象和对象之间的关联关系。
- 注入指的是一种数据传递行为，通过注入行为来让对象和对象产生关系。

依赖注入常见的实现方式包括两种：

- 第一种：set注入
- 第二种：构造注入

#### set注入

- 具体实现步骤可以看动力节点的文档

set注入，基于set方法实现的，底层会通过反射机制调用属性对应的set方法然后给属性赋值。这种方式要求属性必须对外提供set方法。

```java
// 如下

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>

    <bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
        <property name="userDao" ref="userDaoBean"/>
    </bean>

</beans>
```

实现原理：

通过property标签获取到属性名：userDao

通过属性名推断出set方法名：setUserDao

通过反射机制调用setUserDao()方法给属性赋值

property标签的name是属性名。

property标签的ref是要注入的bean对象的id。**(通过ref属性来完成bean的装配，这是bean最简单的一种装配方式。装配指的是：创建系统组件之间关联的动作)**



property标签的name是：setUserDao()方法名演变得到的。演变的规律是：

- setUsername() 演变为 username
- setPassword() 演变为 password
- setUserDao() 演变为 userDao
- setUserService() 演变为 userService

另外，对于property标签来说，ref属性也可以采用标签的方式，但使用ref属性是多数的：

```java
<bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
  <property name="userDao">
    <ref bean="userDaoBean"/>
  </property>
</bean>
```

**总结：set注入的核心实现原理：通过反射机制调用set方法来给属性赋值，让两个对象之间产生关系。**



#### 构造注入

核心原理：通过调用构造方法来给属性赋值。

```java
<bean id="orderDaoBean" class="com.powernode.spring6.dao.OrderDao"/>
<bean id="orderServiceBean" class="com.powernode.spring6.service.OrderService">
  <!--第一个参数下标是0-->
  <constructor-arg index="0" ref="orderDaoBean"/>
  <!--第二个参数下标是1-->
  <constructor-arg index="1" ref="userDaoBean"/>
</bean>
```

- 不使用参数下标，使用参数的名字可以吗？

  可以

  如：

  ```java
  <bean id="orderDaoBean" class="com.powernode.spring6.dao.OrderDao"/>
  
  <bean id="orderServiceBean" class="com.powernode.spring6.service.OrderService">
    <!--这里使用了构造方法上参数的名字-->
    <constructor-arg name="orderDao" ref="orderDaoBean"/>
    <constructor-arg name="userDao" ref="userDaoBean"/>
  </bean>
  
  <bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>
  ```

- 不指定参数下标，不指定参数名字，可以吗？

  可以

  如：

  ```java
  <bean id="orderDaoBean" class="com.powernode.spring6.dao.OrderDao"/>
  <bean id="orderServiceBean" class="com.powernode.spring6.service.OrderService">
    <!--没有指定下标，也没有指定参数名字-->
    <constructor-arg ref="orderDaoBean"/>
    <constructor-arg ref="userDaoBean"/>
  </bean>
  
  <bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>
  ```

- 配置文件中构造方法参数的类型顺序和构造方法参数的类型顺序不一致呢？

  也是可以的

  ```xml
  <bean id="orderDaoBean" class="com.powernode.spring6.dao.OrderDao"/>
  
  <bean id="orderServiceBean" class="com.powernode.spring6.service.OrderService">
    <!--顺序已经和构造方法的参数顺序不同了-->
    <constructor-arg ref="userDaoBean"/>
    <constructor-arg ref="orderDaoBean"/>
  </bean>
  
  <bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>
  ```

得知，通过构造方法注入的时候：

- 可以通过下标
- 可以通过参数名
- 也可以不指定下标和参数名，可以类型自动推断。

Spring在装配方面做的还是比较健壮的。



### set注入专题

#### 注入外部Bean

```xml
<bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>

<bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
    // 通过ref引入的就是外部注入
	<property name="userDao" ref="userDaoBean"/>
</bean>
```

#### 注入内部Bean

在bean标签中嵌套bean标签

```xml
<bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
    <property name="userDao">
    	<bean class="com.powernode.spring6.dao.UserDao"/>
	</property>
</bean>
```

#### 注入简单类型

需要特别注意：如果给简单类型赋值，使用value属性或value标签。而不是ref

```xml
<bean id="userBean" class="com.powernode.spring6.beans.User">
    <!--如果像这种int类型的属性，我们称为简单类型，这种简单类型在注入的时候要使用value属性，不能使用ref-->
    <!--<property name="age" value="20"/>-->
    <property name="age">
        <value>20</value>
    </property>
</bean>

或者使用value属性

<bean id="outB" class="com.gybsl.bean.outBean">
    <property name="age" value="23"></property>
</bean>
```

- 什么是简单类型

  ```java
  // BeanUtils
  
  public static boolean isSimpleValueType(Class<?> type) {
      return (Void.class != type && void.class != type &&
              (ClassUtils.isPrimitiveOrWrapper(type) ||
               Enum.class.isAssignableFrom(type) ||
               CharSequence.class.isAssignableFrom(type) ||
               Number.class.isAssignableFrom(type) ||
               Date.class.isAssignableFrom(type) ||
               Temporal.class.isAssignableFrom(type) ||
               URI.class == type ||
               URL.class == type ||
               Locale.class == type ||
               Class.class == type));
  }
  ```

  **通过源码分析得知，简单类型包括：**

  - **基本数据类型**
  - **基本数据类型对应的包装类**
  - **String或其他的CharSequence子类**
  - **Number子类**
  - **Date子类**
  - **Enum子类**
  - **URI**
  - **URL**
  - **Temporal子类**
  - **Locale**
  - **Class**
  - **另外还包括以上简单值类型对应的数组类型。**

  

  **注意: **

  ```xml
  <!--注意：value后面的日期字符串格式不能随便写，必须是Date对象toString()方法执行的结果。-->
  <!--如果想使用其他格式的日期字符串，就需要进行特殊处理了。-->
  <property name="date" value="Fri Sep 30 15:26:38 CST 2022"/>
  ```

  **需要注意的是：**

  - **如果把Date当做简单类型的话，日期字符串格式不能随便写。格式必须符合Date的toString()方法格式。显然这就比较鸡肋了。如果我们提供一个这样的日期字符串：2010-10-11，在这里是无法赋值给Date类型的属性的。**
  - **spring6之后，当注入的是URL，那么这个url字符串是会进行有效性检测的。如果是一个存在的url，那就没问题。如果不存在则报错。**

#### 级联属性赋值（了解）

**要点：**

- **在spring配置文件中，如上，注意顺序。**
- **在spring配置文件中，clazz属性必须提供getter方法。**

就是一个类如果有一个引用类型的成员，可以通过级联的赋值方法给引用类型的成员里面的成员赋值

```xml
<bean id="clazzBean" class="com.powernode.spring6.beans.Clazz"/>

<bean id="student" class="com.powernode.spring6.beans.Student">
    <property name="name" value="张三"/>

    <!--要点1：以下两行配置的顺序不能颠倒-->
    <property name="clazz" ref="clazzBean"/>
    <!--要点2：clazz属性必须有getter方法-->
    <property name="clazz.name" value="高三一班"/>
</bean>
```

#### 注入数组

```xml
当数组中是简单类型时用如下方式：

<bean id="person" class="com.powernode.spring6.beans.Person">
        <property name="favariteFoods">
            <array>
                <value>鸡排</value>
                <value>汉堡</value>
                <value>鹅肝</value>
            </array>
        </property>
</bean>


当数组中不是简单类型时，如下：

<bean id="order" class="com.powernode.spring6.beans.Order">
    <property name="goods">
        <array>
            <!--这里使用ref标签即可-->
            <ref bean="goods1"/>
            <ref bean="goods2"/>
        </array>
    </property>
</bean>

<bean id="goods1" class="com.powernode.spring6.beans.Goods">
    <property name="name" value="西瓜"/>
</bean>

<bean id="goods2" class="com.powernode.spring6.beans.Goods">
    <property name="name" value="苹果"/>
</bean>
```

#### 注入List集合

List集合：有序可重复

**注意：注入List集合的时候使用list标签，如果List集合中是简单类型使用value标签，反之使用ref标签**

```xml
<bean id="peopleBean" class="com.powernode.spring6.beans.People">
    <property name="names">
        <list>
            <value>铁锤</value>
            <value>张三</value>
            <value>张三</value>
            <value>张三</value>
            <value>狼</value>
        </list>
    </property>
</bean>
```

#### 注入Set集合

Set集合：无序不可重复

如果有重复值则会自动去重

```xml
<bean id="peopleBean" class="com.powernode.spring6.beans.People">
    <property name="phones">
        <set>
            <!--非简单类型可以使用ref，简单类型使用value-->
            <value>110</value>
            <value>110</value>
            <value>120</value>
            <value>120</value>
            <value>119</value>
            <value>119</value>
        </set>
    </property>
</bean>
```

**要点：**

- **使用`<set>`标签**
- **set集合中元素是简单类型的使用value标签，反之使用ref标签。**

#### 注入Map集合

```xml
<bean id="peopleBean" class="com.powernode.spring6.beans.People">
    <property name="addrs">
        <map>
            <!--如果key不是简单类型，使用 key-ref 属性-->
            <!--如果value不是简单类型，使用 value-ref 属性-->
            <entry key="1" value="北京大兴区"/>
            <entry key="2" value="上海浦东区"/>
            <entry key="3" value="深圳宝安区"/>
        </map>
    </property>
</bean>
```

**要点：**

- **使用`<map>`标签**
- **如果key是简单类型，使用 key 属性，反之使用 key-ref 属性。**
- **如果value是简单类型，使用 value 属性，反之使用 value-ref 属性。**

#### 注入Properties

```xml
<bean id="peopleBean" class="com.powernode.spring6.beans.People">
    <property name="properties">
        <props>
            <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
            <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
            <prop key="username">root</prop>
            <prop key="password">123456</prop>
        </props>
    </property>
</bean>
```

**要点：**

- **使用`<props>`标签嵌套`<prop>`标签完成。**

#### 注入null和空字符串

注入空字符串使用：`<value/>` 或者 value=""

注入null使用：`<null/>` 或者 不为该属性赋值

```xml
注入空字符串

<bean id="vipBean" class="com.powernode.spring6.beans.Vip">
    <!--空串的第一种方式-->
    <!--<property name="email" value=""/>-->
    <!--空串的第二种方式-->
    <property name="email">
        <value/>
    </property>
</bean>
```

```xml
注入null

不给属性赋值
<bean id="vipBean" class="com.powernode.spring6.beans.Vip" />

或使用<null/>
<bean id="vipBean" class="com.powernode.spring6.beans.Vip">
    <property name="email">
        <null/>
    </property>
</bean>
```

#### 注入的值中含有特殊符号

XML中有5个特殊字符，分别是：`<、>、'、"、&`

以上5个特殊符号在XML中会被特殊对待，会被当做XML语法的一部分进行解析，如果这些特殊符号直接出现在注入的字符串当中，会报错。

解决方案包括两种：

- 第一种：特殊符号使用转义字符代替。
- 第二种：将含有特殊符号的字符串放到：<![CDATA[]]> 当中。因为放在CDATA区中的数据不会被XML文件解析器解析。

5个特殊字符对应的转义字符分别是：

| **特殊字符** | **转义字符** |
| ------------ | ------------ |
| >            | &gt;         |
| <            | &lt;         |
| '            | &apos;       |
| "            | &quot;       |
| &            | &amp;        |

先使用转义字符来代替：

如：

```xml
<bean id="mathBean" class="com.powernode.spring6.beans.Math">
    <property name="result" value="2 &lt; 3"/>
</bean>
```

我们再来使用CDATA方式：

`<![CDATA[2 < 3]]>`标签中的东西会被自动解析成字符串，不会校验里面的特殊符号

```xml
<bean id="mathBean" class="com.powernode.spring6.beans.Math">
    <property name="result">
        <!--只能使用value标签-->
        <value><![CDATA[2 < 3]]></value>
    </property>
</bean>
```

**注意：使用CDATA时，不能使用value属性，只能使用value标签。**



### p命名空间注入

使用p命名空间注入的前提条件包括两个

- 第一：在XML头部信息中添加p命名空间的配置信息：`xmlns:p="http://www.springframework.org/schema/p"`
- 第二：p命名空间注入是基于setter方法的，所以需要对应的属性提供setter方法。

如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="customerBean" class="com.powernode.spring6.beans.Customer" p:name="zhangsan" p:age="20"/>

</beans>
```

非简单类型：

​	`p:birth-ref="bean的ID"`

所以p命名空间实际上是对set注入的简化。



### c命名空间注入

是对构造方法注入的简化

c命名空间是简化构造方法注入的。

使用c命名空间的两个前提条件：

第一：需要在xml配置文件头部添加信息：`xmlns:c="http://www.springframework.org/schema/c"`

第二：需要提供构造方法。

如：

```java
// javabean中提供对应的构造方法

public MyTime(int year, int month, int day) {
    this.year = year;
    this.month = month;
    this.day = day;
}
```

```xml
<!-- xml中 -->

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:c="http://www.springframework.org/schema/c"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--<bean id="myTimeBean" class="com.powernode.spring6.beans.MyTime" c:year="1970" c:month="1" c:day="1"/>-->
	
    <!-- 通过c:参数名或者c:_0来注入 -->
    <bean id="myTimeBean" class="com.powernode.spring6.beans.MyTime" c:_0="2008" c:_1="8" c:_2="8"/>

</beans>
```

所以，c命名空间是依靠构造方法的。

注意：不管是p命名空间还是c命名空间，注入的时候都可以注入简单类型以及非简单类型。



### util命名空间

主要是对于集合。

底层调用的是set方法

使用util命名空间可以让**配置复用**。

使用util命名空间的前提是：在spring配置文件头部添加配置信息。如下：

- xsd文件其实就是schemal文件，用来约束此配置文件中可以写什么标签

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

    <util:properties id="prop">
        <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
        <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
        <prop key="username">root</prop>
        <prop key="password">123456</prop>
    </util:properties>

    <bean id="dataSource1" class="com.powernode.spring6.beans.MyDataSource1">
        <property name="properties" ref="prop"/>
    </bean>

    <bean id="dataSource2" class="com.powernode.spring6.beans.MyDataSource2">
        <property name="properties" ref="prop"/>
    </bean>
</beans>
```

```java
// javabean中

public class MyDataSource1 {
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "MyDataSource1{" +
            "properties=" + properties +
            '}';
    }
}
```



### 基于XML的自动装配

Spring 还可以完成自动化的注入，自动化注入又被称为自动装配。它可以根据**名字**进行自动装配，也可以根据**类型**进行自动装配。

#### 根据名称自动装配

如：

```java
// UserDao.java

public class UserDao {
    public void insert(){
        System.out.println("正在保存用户数据。");
    }
}
```

```java
// UserService.java

public class UserService {

    private UserDao aaa;

    // 这个set方法非常关键
    public void setAaa(UserDao aaa) {
        this.aaa = aaa;
    }

    public void save(){
        aaa.insert();
    }
}
```

```xml
<!--xml-->

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userService" class="com.powernode.spring6.service.UserService" autowire="byName"/>

    <bean id="aaa" class="com.powernode.spring6.dao.UserDao"/>

</beans>
```

这个配置起到关键作用：

- `UserService Bean`中需要添加`autowire="byName"`，表示通过名称进行装配。
- `UserService`类中有一个UserDao属性，而`UserDao`属性的名字是aaa，**对应的set方法是`setAaa()`**，正好和`UserDao Bean`的id是一样的。这就是根据名称自动装配。

**如果根据名称装配(byName)，底层会调用set方法进行注入。**

例如：setAge() 对应的名字是age，setPassword()对应的名字是password，setEmail()对应的名字是email。



#### 根据类型自动装配

如：

```xml
<!--xml-->

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--byType表示根据类型自动装配-->
    <bean id="accountService" class="com.powernode.spring6.service.AccountService" autowire="byType"/>

    <bean class="com.powernode.spring6.dao.AccountDao"/>

</beans>
```

无论是`byName`还是`byType`，在装配的时候都是基于set方法的。所以set方法是必须要提供的。提供构造方法是不行的，大家可以测试一下。这里就不再赘述。

如果byType，根据类型装配时，如果配置文件中有两个类型一样的bean会出现什么问题呢？

如：

```xml
会报错

<bean id="accountService" class="com.powernode.spring6.service.AccountService" autowire="byType"/>

<bean id="x" class="com.powernode.spring6.dao.AccountDao"/>
<bean id="y" class="com.powernode.spring6.dao.AccountDao"/>
```

当byType进行自动装配的时候，配置文件中某种类型的Bean必须是唯一的，不能出现多个。



### Spring引入外部属性配置文件

我们都知道编写数据源的时候是需要连接数据库的信息的，例如：driver url username password等信息。这些信息可以单独写到一个属性配置文件中吗，这样用户修改起来会更加的方便。当然可以。

第一步：写一个数据源类，提供相关属性。

```java
package com.powernode.spring6.beans;

import javax.sql.DataSource;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.logging.Logger;

public class MyDataSource implements DataSource {
    @Override
    public String toString() {
        return "MyDataSource{" +
                "driver='" + driver + '\'' +
                ", url='" + url + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    private String driver;
    private String url;
    private String username;
    private String password;

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //......
}
```

第二步：在类路径下新建`jdbc.properties`文件，并配置信息。

```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/spring
username=root
password=root123
```

第三步：在spring配置文件中引入context命名空间。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```

第四步：在spring中配置使用jdbc.properties文件。

使用：`<context:property-placeholder location="jdbc.properties"/>`

取值：`${key}`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder location="jdbc.properties"/>
    
    <bean id="dataSource" class="com.powernode.spring6.beans.MyDataSource">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
    </bean>
</beans>
```





## Bean的作用域

### singleton

默认情况下，Spring的IoC容器创建的Bean对象是单例的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="sb" class="com.powernode.spring6.beans.SpringBean" />

</beans>
```

默认情况下，Bean对象的创建是在初始化Spring上下文的时候就完成的

就是在执行`ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");`这段代码的时候就已经创建了一个对象了

### prototype

如果想让Spring的Bean对象以多例的形式存在，可以在bean标签中指定scope属性的值为：**prototype**，这样Spring会在每一次执行`getBean()`方法的时候创建Bean对象，调用几次则创建几次。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="sb" class="com.powernode.spring6.beans.SpringBean" scope="prototype" />

</beans>
```

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");

    SpringBean sb1 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb1);

    SpringBean sb2 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb2);
}

会输出不同的对象
```

scope如果没有配置，它的默认值是什么呢？默认值是singleton，单例的

### 其它scope

scope属性的值不止两个，它一共包括8个选项：

- singleton：默认的，单例。
- prototype：原型。每调用一次getBean()方法则获取一个新的Bean对象。或每次注入的时候都是新对象。
- request：一个请求对应一个Bean。**仅限于在WEB应用中使用**。
- session：一个会话对应一个Bean。**仅限于在WEB应用中使用**。
- global session：**portlet应用中专用的**。如果在Servlet的WEB应用中使用global session的话，和session一个效果。（portlet和servlet都是规范。servlet运行在servlet容器中，例如Tomcat。portlet运行在portlet容器中。）
- application：一个应用对应一个Bean。**仅限于在WEB应用中使用。**
- websocket：一个websocket生命周期对应一个Bean。**仅限于在WEB应用中使用。**
- 自定义scope：很少使用。



接下来咱们自定义一个Scope，线程级别的Scope，在同一个线程中，获取的Bean都是同一个。跨线程则是不同的对象：（以下内容作为了解）

- 第一步：自定义Scope。（实现Scope接口）

- - spring内置了线程范围的类：org.springframework.context.support.SimpleThreadScope，可以直接用。

- 第二步：将自定义的Scope注册到Spring容器中。

```xml
<bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
  <property name="scopes">
    <map>
      <entry key="myThread">
        <bean class="org.springframework.context.support.SimpleThreadScope"/>
      </entry>
    </map>
  </property>
</bean>
```

- 第三步：使用Scope。

  ```xml
  <bean id="sb" class="com.powernode.spring6.beans.SpringBean" scope="myThread" />
  ```



