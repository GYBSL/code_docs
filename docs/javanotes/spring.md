---
title: Spring
order: 4
group: 
  title: Java后端
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



## Spring框架

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



## Spring的入门程序

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



### Spring对IoC的实现

#### IoC 控制反转

- 控制反转是一种思想。
- 控制反转是为了降低程序耦合度，提高程序扩展力，达到OCP原则，达到DIP原则。
- 控制反转，反转的是什么？

- - 将对象的创建权利交出去，交给第三方容器负责。
  - 将对象和对象之间关系的维护权交出去，交给第三方容器负责。

- 控制反转这种思想如何实现呢？

- - DI（Dependency Injection）：依赖注入

#### 依赖注入

依赖注入实现了控制反转的思想。

Spring通过依赖注入的方式来完成Bean管理的。

Bean管理说的是：Bean对象的创建，以及Bean对象中属性的赋值（或者叫做Bean对象之间关系的维护）。

依赖注入：

- 依赖指的是对象和对象之间的关联关系。
- 注入指的是一种数据传递行为，通过注入行为来让对象和对象产生关系。

依赖注入常见的实现方式包括两种：

- 第一种：set注入
- 第二种：构造注入

##### set注入

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



##### 构造注入

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

  ```java
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
