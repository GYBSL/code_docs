---
title: Java Web
order: 2
toc: content
group: 
  title: Java
  order: 2
---



# JAVA WEB笔记

## 一、数据库相关概念

### 数据库

存储数据的仓库，数据是有组织的进行存储

英文:DataBase，简称DB

### 数据库管理系统

管理数据库的大型软件
英文:DataBase Management System，简称DBMS

### SQL

英文: Structured Query Language，简称SQL，结构化查询语言

操作关系型数据库的编程语言

定义操作所有关系型数据库的统一标准

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/db1.png)



### MySQL数据模型

#### 关系型数据库

关系型数据库是建立在关系模型基础上的数据库，简单说，关系型数据库是由多张能互相连接的二维表组成的数据库

优点

1. 都是使用表结构，格式一致，易于维护。
2. 使用通用的SQL语言操作，使用方便，可用于复杂查询。
3. 数据存储在磁盘中，安全。

### SQL简介

- 英文: Structured Query Language，简称SQL
- 结构化查询语言，一门操作关系型数据库的编程语言
- 定义操作所有关系型数据库的统一标准
- 对于同一个需求，每一种数据库操作的方式可能会存在一些不一样的地方，我们称为“方言”

### SQL通用语法

1. SQL语句可以单行或多行书写，以分号结尾。
2. MySQL数据库的SQL语句不区分大小写，关键字建议使用大写。
3. SQL语句可以使用空格/缩进来增强语句的可读性。
4. 注释
   - 单行注释: -- 注释内容 或 #注释内容(MySQL特有)
   - 多行注释: /* 注释 */

### SQL分类

- DDL(Data Definition Language) 数据定义语言，用来定义数据库对象: 数据库，表，字段等
- DML(Data Manipulation Language) 数据操作语言，用来对数据库中表的数据进行增删改
- DQL(Data Query Language) 数据查询语言，用来查询数据库中表的记录(数据)
- DCL(Data Control Language) 数据控制语言，用来定义数据库的访问权限和安全级别，及创建用户

简化理解：

+ DDL: 操作数据库，表等
+ DML: 对表中的数据进行增删改
+ DQL: 对表中的数据进行查询
+ DCL: 对数据库进行权限控制

#### DDL --操作数据库

1. 查询
   - 查询所有数据库:  show databases;
   - 查询当前数据库:  select database();
2. 创建

   - 创建数据库
     - CREATE DATABASE [ if not exists ] 数据库名称;
   - 创建数据库(判断，如果不存在则创建)
     - CREATE DATABASE IF NOT EXISTS 数据库名称;
3. 删除

   - 删除数据库
     - DROP DATABASE 数据库名称;
   - ·删除数据库(判断，如果存在则删除)
     - DROP DATABASE IF EXISTS 数据库名称;
4. 使用数据库

   - .查看当前使用的数据库
     - SELECT DATABASE();
   - 使用数据库
     - USE 数据库名称;


注意事项

上述语法中的database，也可以替换成schema。如: create schema db01;

#### DDL --操作表

1. 查询表

   - 查询当前数据库下所有表名称
     - SHOW  TABLES;
   - 查询表结构
     - DESC 表名称;

2. 创建表

   ```sql
   CREATE TABLE 表名(
       字段名1 数据类型1,
       字段名2 数据类型2,
       ...
       字段名n 数据类型n
   );
   
   -- 注意:最后一行末尾，不能加逗号
   ```

   数据类型: 

   - MySQL支持多种类型，可以分为三类:
     - 数值
     - 日期
     - 字符串

   ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/db3.png)

3. 删除表

   - 删除表
     - DROP TABLE 表名;
   - 删除表时判断表是否存在
     - DROP TABLE IF EXISTS 表名;

4. 修改表

   - 修改表名
     - ALTER TABLE 表名 RENAME TO 新的表名;
   - 添加一列
     - ALTER TABLE 表名 ADD 列名 数据类型;
   - 修改数据类型
     - ALTER TABLE 表名 MODIFY 列名 新数据类型;
   - 修改列名和数据类型
     - ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;
   - 删除列
     - ALTER TABLE 表名 DROP 列名;



#### DML

- 添加(insert)
- 修改(update)
- 删除(delete)

1. 添加数据

   - 给指定列添加数据
     - INSERT INTO 表名(列名1,列名2,...) VALUES(值1,值2,...);
   - 给全部列添加数据
     - INSERT INTO 表名 VALUES(值1,值2,...);

2. 批量添加数据

   - INSERT INTO 表名 VALUES(值1,值2...),(值1,值2,...),(值1,值2...);
   - INSERT INTO 表名 VALUES(值1,值2...),(值1,值2,...),(值1,值2...);

3. 修改数据

   - 修改表数据

     - UPDATE 表名 SET 列名1=值1,列名2=值2... [WHERE 条件];

       注意: 修改语句中如果不加条件，则将所有数据都修改!

4. 删除数据

   - 删除数据
     - DELETE FROM 表名 [WHERE条件];

​					注意: 删除语句中如果不加条件，则将所有数据都删除!

#### DQL

查询语法

```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段
HAVING
	分组后条件
ORDER BY
	排序字段
LIMIT
	分页限定
```

1. 基础查询

   - 查询多个字段

     ```sql
     SELECT 字段列表 FROM 表名;
     SELECT * FROM 表名; -- 查询所有数据
     ```

   - 去除重复记录

     ```sql
     SELECT DISTINCT 字段列表 FROM 表名;
     ```

   - 起别名

     ```sql
     AS: AS也可以省略
     ```

2. 条件查询(WHERE)

   ```sql
   SELECT 字段列表 FROM 表名 WHERE 条件列表;
   ```

   条件：

   ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/db4.png)

3. 分组查询(GROUP BY)

   ```sql
   聚合函数
   	1. 概念: 将一列数据作为一个整体，进行纵向计算。
   	2. 聚合函数分类: 
   		count(列名)
   		max(列名)
   		min(列名)
   		sum(列名)
   		avg(列名)
   	3. 聚合函数语法:
   		SELECT 聚合函数名(列教) FROM 表;
   		
   注意: null值不参与所有聚合函数运算
   
   
   聚合函数例：
   	-- 1.统计班级一共有多少个学生
   	select count(id) from stu ; -- count统计的列名不能为null
   	-- 2.查询数学成绩的最高分
   	select max(math) from stu;
   ```

   分组查询语法:

   ```sql
   SELECT 字段列表 FROM表名 [WHERE 分组前条件限定] GROUP_BY 分组字段名[HAVING 分组后条件过滤];
   
   注意: 分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义
   
   where和having区别:
   	执行时机不一样: where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤。
   	可判断的条件不一样: where不能对聚合函数进行判断，having可以。
   	
   	执行顺序: where >聚合函数> having
   	
   	
   例子：
   	-- 1．查询男同学和女同学各自的数学平均分
   	select avg(math) from stu group by sex;
   	-- 3．查询男同学和女同学各自的数学平均分，以及各自人数，要求:分数低于70分的不参与分组
   	select sex，avg(math) , count(*) from stu where math > 70 group by sex;
   	-- 4．查询男同学和女同学各自的数学平均分，以及各自人数，要求:分数低于70分的不参与分组，分组之后人数大于2
   	select sex,avg(math),count(*) from stu where math > 10 group by sex having count(*)>2;
   ```

   

4. 排序查询(ORDER BY)

   ```sql
   SELECT 字段列表 FROW 表名 ORDER BY 排序字段名1 [排序方式1],排序字段名2 [排序方式2]...;
   
   排序方式:
   	ASC: 升序排列（默认值)
   	DESC: 降序排列
   	
   如：
   	select * from stu order by age desc, english asc;
   	
   注意: 如果有多个排序条件，当前边的条件值一样时，才会根据第二条件进行排序
   ```

   

5. 分页查询(LIMIT)

   分页查询语法

   ```sql
   SELECT 字段列表 FROM 表名 LIMIT 起始索引,查询条目数;
   
   起始索引:从O开始
   
   计算公式: 起始索引=(当前页码-1)*每页显示的条数
   
   分页查询limit是MySQL数据库的方言
   Oracle分页查询使用rownumber
   SQL Server分页查询使用top
   
   例子：
   	-- 1．从0开始查询,查询3条数据
   	select * from stu limit 0,3;
   ```

   

### 约束

#### 约束的概念和分类

```sql
1.约束的概念
	约束是作用于表中列上的规则，用于限制加入表的数据
	约束的存在保证了数据库中数据的正确性、有效性和完整性
	
2.约束的分类
	非空约束	保证列中所有数据不能有null值	NOT NULL
    唯一约束	保证列中所有数据各不相同	UNIQUE
    主键约束	主键是一行数据的唯一标识，要求非空且唯一	PRIMARY KEY
    检查约束	保证列中的值满足某一条件	CHECK
    默认约束	保存数据时，未指定值则采用默认值	DEFAULT
    外键约束	外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性	FOREIGN KEY
    
    
注意: MySQL不支持检查约束
```

```sql
例子：
CREATE TABLE emp (
	id INT PRIMARY KEY , -- 员工id，主键且自增长
    ename VARCHAR (50) NOT NULL UNIQUE,-- 员工姓名，非空并且唯一
    joindate DATE NOT NULL , -- 入职自期,非空
    salary DOUBLE(7,2) NOT NULL , -- 工资，非空
    bonus DOUBLE(7,2) DEFAULT 0 -- 奖金，如果没有奖金默认为0
);
```

```sql
非空约束:
	非空约束用于保证列中所有数据不能有NULL值
	
(1)添加约束
	-- 创建表时添加非空约束
	CREATE TABLE 表名(
        列名 数据类型 NOT NULL,
        ...
	);
	
	-- 建完表后添加非空约束
	ALTER TABLE 表名 MODIFY 字段名 数据类型 NOT NULL;
	
(2)删除约束
	ALTER TABLE 表名 MODIFY 字段名 数据类型;
```

```sql
唯一约束:
	唯一约束用于保证列中所有数据各不相同
	
(1)添加约束
	-- 创建表时添加唯一约束
	CREATE TABLE 表名(
        列名 数据类型 UNIQUE [AUTO_INCREMENT],
        -- AUTO_INCREMENT: 当不指定值时自动增长
        ...
	);
	
	CREATE TABLE 表名(
        列名 数据类型,
        ...
        [CONSTRAINT] [约束名称] UNIQUE(列名)
	);
	
	-- 建完表后添加唯一约束
	ALTER TABLE 表名 MODIFY 字段名 数据类型 UNIQUE;
	
(2)删除约束
	ALTER TABLE 表名 DROP INDEX 字段名;
```

```sql
默认约束:
	保存数据时,未指定值则采用默认值
	
(1)添加约束
	-- 创建表时添加默认约束
	CREATE TABLE 表名(
        列名 数据类型 DEFAULT 默认值,
        ...
	);
	
	-- 建完表后添加默认约束
	ALTER TABLE 表名 ALTER 列名 SET DEFAULT 默认值;
	
(2)删除约束
	ALTER TABLE 表名 ALTER 列名 DROP DEFAULT;
```

```sql
外键约束:
	外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性
	
(1)添加约束
	-- 创建表时添加外键约束
	CREATE TABLE 表名(
        列名 数据类型,
        ...
        [CONSTRAINT] [外键名称] FOREIGN KEY(外键列名）REFERENCES 主表(主表列名)
	);
        
	-- 建完表后添加外键约束
	ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FORETGN KEY(外键字段名称) REFERENCES 主表名称(主表列名称);
        
(2)删除约束
	ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
        
        
例子：
	-- 添加外键dep id,关联dept表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id);
```



### 数据库设计概念

数据库设计就是根据业务系统的具体需求，结合我们所选用的DBMS，为这个业务系统构造出最优的数据存储模型。

建立数据库中的表结构以及表与表之间的关联关系的过程。

有哪些表?表里有哪些字段? 表和表之间有什么关系?

**数据库设计的步骤**
需求分析（数据是什么?数据具有哪些属性?数据与属性的特点是什么)

逻辑分析（通过ER图对数据库进行逻辑建模，不需要考虑我们所选用的数据库管理系统)

物理设计（根据数据库自身的特点把逻辑设计转换为物理设计)

维护设计（1.对新的需求进行建表;2.表优化)



#### 表关系

**一对一:**

​	如: 用户和用户详情

​	一对一关系多用于表拆分，将一个实体中经常使用的字段放一张表，不经常使用的字段放另一张表，用于提升查询性能

**一对多(多对一):**

​	如: 部门和员工

​	一个部门对应多个员工，一个员工对应一个部门

**多对多:**

​	如: 商品和订单

​	一个商品对应多个订单，一个订单包含多个商品



#### 总结

1．数据库设计设计什么?

- 有哪些表
- 表里有哪些字段
- 表和表之间是什么关系

2.表关系有哪几种?

- 一对一
- —对多(多对一)
- 多对多



**一对多实现方式**

在多的一方建立外键关联一的一方主键

**多对多实现方式**

建立第三张中间表

中间表至少包含2个外键，分别关联双方主键

**一对一实现方式**

在任意一方建立外键，关联对方主键，并设置外键唯一



### 多表查询

笛卡尔积: 取A,B集合所有组合情况

**多表查询:**

从多张表查询数据

- 连接查询
  - 内连接: 相当于查询AB交集数据
  - 外连接: 
    - 左外连接: 相当于查询A表所有数据和交集部分数据
    - 右外连接: 相当于查询B表所有数据和交集部分数据

- 子查询

#### 内连接查询语法

```sql
-- 隐式内连接
SELECT 字段列表 FROM 表1,表2... WHERE 条件;

-- 显示内连接
sELECT 字段列表 FROM 表1 [INNER] J0IN 表2 ON 条件;

内连接相当于查询AB交集数据
```

#### 外连接查询语法

```sql
-- 左外连接
SELECT 字段列表 FROM 表1 LEFT [OUTER] J0IN 表2 ON 条件;

-- 右外连接
SELECT 字段列表 FROM 表1 RIGHT [OUTER] J0IN 表2 ON 条件;

左外连接: 相当于查询A表所有数据和交集部分数据
右外连接: 相当于查询B表所有数据和交集部分数据
```

#### 子查询

1. 子查询概念:
   - 查询中嵌套查询，称嵌套查询为子查询
2. 子查询根据查询结果不同，作用不同:
   - 单行单列
   - 多行单列
   - 多行多列

```sql
如：
	-- 查询工资高于猪八戒的员工信息
	select * from emp where salary > (select salary from emp where name = '猪八戒');
```

```sql
1．子查询根据查询结果不同，作用不同:
	单行单列: 作为条件值，使用=!=><等进行条件判断
	SELECT 字段列表 FROM 表 WHERE 字段名=(子查询);
	
	多行单列: 作为条件值，使用in等关键字进行条件判断
	SELECT 字段列表 FROM 表 WHERE 字段名 in (子查询);
	
	多行多列: 作为虚拟表
	SELECT 字段列表 FROM (子查询) WHERE 条件;
```



### 事务

#### 事务简介

- 数据库的事务(Transaction)是一种机制、一个操作序列，包含了一组数据库操作命令
- 事务把所有的命令作为一个整体一起向系统提交或撤销操作请求，即这一组数据库命令要么同时成功，要么同时失败
- 事务是一个不可分割的工作逻辑单元

```sql
-- 开启事务
START TRANSACTION;
或者 BEGIN;

-- 提交事务
COMMIT;

-- 回滚事务 
ROLLBACK;
```

#### 事务四大特征

- 原子性(Atomicity): 事务是不可分割的最小操作单位，要么同时成功，要么同时失败。
- 一致性(Consistency): 事务完成时，必须使所有的数据都保持一致状态
- 隔离性(lsolation): 多个事务之间，操作的可见性
- 持久性(Durability): 事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

**MySQL事务默认自动提交**

```sql
-- 查看事务的默认提交方式
SELECT @@autocommit;
-- 1 自动提交 0 手动提交
-- 修改事务提交方式
set @@autocommit = 0;
```



### MySQL客户端工具-图形化工具

DataGrip

介绍：  DataGrip是JetBrains旗下的一款数据库管理工具，是管理和开发MySQL、Oracle、PostgreSQL的理想解决方案

官网: https://www.jetbrains.com/zh-cn/datagrip


## 二、JDBC

### JDBC简介

**JDBC概念**

- JDBC 就是使用Java语言操作关系型数据库的一套API
- 全称: ( Java DataBase Connectivity ) Java数据库连接
- 同一套Java代码，操作不同的关系型数据库

**JDBC本质**

- 官方(sun公司)定义的一套操作所有关系型数据库的规则，即接口
- 各个数据库厂商去实现这套接口，提供数据库驱动jar包
- 我们可以使用这套接口(JDBC)编程，真正执行的代码是驱动jar包中的实现类

**JDBC好处**

- 各数据库厂商使用相同的接口，Java代码不需要针对不同数据库分别开发
- 可随时替换底层数据库，访问数据库的Java代码基本不变



### JDBC快速入门

jar包下载：[MySQL :: Download Connector/J](https://dev.mysql.com/downloads/connector/j/)

```java
// 0.创建工程,导入驱动jar包
// mysql-connector-java-5.1.48.jar

// 1.注册驱动
class.forName("com.mysql.jdbc.Driver);

//2.获取连接对象
String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
String username = "root";
String password = "1234";
Connection conn = DriverManager.getConnection(url,username,password);

//3．定义SQL
String sql = "update account set money = 2000 where id = 1";

//4．获取执行sql的对象
Statement stmt = conn.createStatement();

//5.执行sql
int count = stmt.executeUpdate(sql);

// 6.处理结果
// System.out.println(count);

// 7.释放资源
stmt.close();
conn.close():
```



### JDBC API详解

#### DriverManager

DriverManager (驱动管理类) 作用:

1. 注册驱动
2. 获取数据库连接

**注册驱动**

```java
Class.forName("com.mysql.jdbc.Driver); // 这一段可以省略，因为底层源码在内存中加载类的时候就会自动加载静态代码块，执行驱动注册方法

// 查看Driver类源码
static {
	try {
		DriverManager.registerDriver(new Driver());
	} catch (SQLException var1) {
		throw ew RuntimeException("can't register driver!");
	}
}
              
提示:
	MySQL 5之后的驱动包，可以省略注册驱动的步骤
	自动加载jar包中META-INF/services/java.sql.Driver文件中的驱动类
```

**获取连接**

```java
// 使用静态方法Connection就可以建立数据库的连接
static Connection
// 需要传入url: 连接路径 user:用户名 password:密码
getConnection(String url,String user,String password)
```

```java
url: 连接路径
语法: jdbc:mysql://ip地址(域名):端口号/数据库名称?参数键值对1&参数键值对2...
示例: jdbc:mysql://127.0.0.1:3306/db1

细节:
如果连接的是本机mysql服务器，并且mysql服务默认端口是3306，则ur可以简写为: jdbc.mysql:///数据库名称?参数键值对
配置useSSL=false参数，禁用安全连接方式，解决警告提示
```

#### Connection

Connection(数据库连接对象)作用:

1. 获取执行SQL的对象
2. 管理事务

Connection是一个接口

**1.获取执行SQL的对象**

普通执行SQL对象

```java
Statement createStatement()
```

预编译SQL的执行SQL对象: 防止SQL注入

```java
PreparedStatement prepareStatement(sql)
```

执行存储过程的对象

```java
CallableStatement prepareCall(sql)
```

**2.MysQL事务管理**

```java
开启事务: BEGIN;/START TRANSACTION;
提交事务: COMMIT;
回滚事务: ROLLBACK;

MySQL默认自动提交事务
```

**3. JDBC事务管理:Connection接口中定义了3个对应的方法**

```java
开启事务: setAutoCommit(boolean autoCommit): true为自动提交事务; false为手动提交事务，即为开启事务提交事务:commit()
回滚事务:rollback()
```

**示列**

```java
// 建立数据库的连接
Connection conn = DriverManager.getConnection(url,username,password);

// 定义SQL
String sql1 = "update account set money = 2000 where id = 1";
String sql2 = "update account set money = 2000 where id = 2";

//4．获取执行sql的对象
Statement stmt = conn.createStatement();

try {
    // 开启事务
    conn.setAutocommit(false);
    // 执行sql
    int count1 = stmt.executeUpdate(sql1);//受影响的行数
    // 处理结果
    system.out.println(count1);
	// 执行sql
	int count2 = stmt.executeUpdate(sql2);//受影响的行数
    // 处理结果
	System.out.println(count2);
	// 提交事务
	conn.commit();
catch(Exception throwables) {
    //回滚事务
    conn.rollback();
	throwables.printStackTrace();
}
```



#### Statement

Statement作用:

执行SQL语句

**执行SQL语句**

```java
int executeUpdate(sql): 执行DML、DDL语句
返回值: (1) DML语句影响的行数 (2) DDL语句执行后，执行成功也可能返回0
    
ResultSet executeQuery(sql): 执行DQL语句
返回值: ResultSet结果集对象
```

**示例**

```java
// 建立数据库的连接
Connection conn = DriverManager.getConnection(url,username,password);

// 定义SQL
String sql = "update account set money = 2000 where id = 1";

// 获取执行sql的对象Statement
Statement stmt = conn.createStatement();

// 执行sql
int count = stmt.executeUpdate(sql);
//执行完DML语句，受影响的行数
// 处理结果
// System.out.println(count) ;
if(count > 0){
    System.out.println("修改成功~");
}else{
    System.out.println(""修改失败~");
}
                       
// 释放资源
stmt.close();
conn.close();
```

```java
String sql = "drop database db2";
// 执行sql
int count = stmt.executeUpdate(sql);//执行完DDL语句，可能是0
```



#### ResultSet

ResultSet(结果集对象)作用:

1. 封装了DQL查询语句的结果

   ```java
   ResultSet stmt.executeQuery(sql);// 执行DQL语句，返回ResultSet对象。
   ```

2. 获取查询结果

   ```java
   boolean next():(1)将光标从当前位置向前移动一行 (2)判断当前行是否为有效行
       返回值:
   		true: 有效行，当前行有数据
   		false: 无效行，当前行没有数据
               
               
   xxx getXxx(参数): 获取数据
   xxx: 数据类型; 如: int getInt(参数); String getString(参数)
   参数:
   	int: 列的编号，从1开始
   	String: 列的名称
   ```

   **使用步骤**

   ```java
   1. 游标向下移动一行，并判断该行否有数据: next
   2. 获取数据: getXxx(参数)
       
   // 循环判断游标是否是最后一行末尾
   while(rs.next(){}
   	//获取数据
   	rs.getXxx(参数);
   }
   ```

   ```java
   // 建立数据库的连接
   Connection conn = DriverManager.getConnection(url,username,password);
   
   // 定义SQL
   String sql = "select * from account";
   
   // 获取执行sql
   Resultset rs = stmt.executeQuery(sql);
   
   // 处理结果。遍历rs中的所有数据
   // 光标向下移动一行，并且判断当前行是否有数据
   while (rs.next()){
       // 获取数据getXxx()
       int id = rs.getInt(1); // 获取第一行数据
       String name = rs.getstring(2); // 获取第二行数据
       double money = rs.getDouble(3); // 获取第三行数据
       
       // 也可以使用字段名获取
       int id = rs.getInt("id");
   	String name = rs.getString("name" );
       double money = rs.getDouble("money");
   }
   
   // 释放资源
   stmt.close();
   conn.close();
   ```

   

#### PreparedStatement

PreparedStatement作用:

- 预编译SQL语句并执行: 预防SQL注入问题

SQL注入

- SQL注入是通过操作输入来修改事先定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法。

1. 语句获取 PreparedStatement 对象

```java
// SQL语句中的参数值，使用?占位符替代
String sql = "select * from user where username = ? and password = ?";
// 通过Connection对象获取,并传入对应的sql语句
PreparedStatement pstmt = conn.prepareStatement(sql);
```

2. 设置参数值

   ```java
   PreparedStatement对象: setXxx(参数1，参数2):给?赋值
   Xxx: 数据类型; 如setInt(参数1，参数2)
   参数:
   参数1: ?的位置编号,从1开始
   参数2: ?的值
   ```

3. 执行SQL

   ```java
   executeUpdate(); 或 executeQuery(); 不需要再传递sql
   ```

**示例**

```java
// 定义sql
String sql = "select * from tb_user where username = ? and password = ?";
// 获取pstmt对象
PreparedStatement pstmt = conn.preparestatement(sql);
// 没置?的值
pstmt.setString(1, name);
pstmt.setString(2, pwd);
// 执行sql
Resultset rs = pstmt.executeQuery();
// 判断登录是否成功
if(rs.next()){
    System.out.printin(登录成功~");
}else{
    System.out.printin(登录失败~");
}
// 释放资源
rs.close();
stmt.close();
conn.close();
```

#### PreparedStatement原理

PreparedStatement 好处:

1. 预编译SQL，性能更高
2. 防止SQL注入: 将敏感字符进行转义



**PreparedStatement 预编译功能开启: `useServerPrepStmts=true` **

```java
// 获取连接:如果连接的是本机mysql并且端口是默认的3306可以简化书写
string url = "jdbc:mysql:///db1?usesSL=false&useServerPrepstmts=true";
```

**配置MySQL执行日志(重启mysql服务后生效)**

```java
log-output=FILE
general-log=1
general_log_file="D:\mysql.log"
slow-query-log=1
slow_query_log_file="D:\mysql_slow.log"
long_query_time=2
```

**PreparedStatement原理:**

1. 在获取PreparedStatement对象时，将sql语句发送给mysql服务器进行检查，编译(这些步骤很耗时)
2. 执行时就不用再进行这些步骤了，速度更快
3. 如果sql模板一样,则只需要进行一次检查、编译



### 数据库连接池

#### 数据库连接池简介

- 数据库连接池是个容器，负责分配、管理数据库连接(Connection)
- 它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个;
- 释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏
- 好处:
  - 资源重用
  - 提升系统响应速度
  - 避免数据库连接遗漏

#### 数据库连接池实现

**标准接口: DataSource**

- 官方(SUN)提供的数据库连接池标准接口，由第三方组织实现此接口。

- 功能: 获取连接

  ```java
  Connection getConnection()
  ```

**常见的数据库连接池:**

- DBCP

- C3P0

- Druid

Druid(德鲁伊)

- Druid连接池是阿里巴巴开源的数据库连接池项目
- 功能强大，性能优秀，是Java语言最好的数据库连接池之一

Driud使用步骤

1. 导入jar包druid-1.1.12.jar
2. 定义配置文件
3. 加载配置文件
4. 获取数据库连接池对象
5. 获取连接

```java
// 1.导入jar包druid-1.1.12.jar到项目的lib目录中，并配置jar包module有效

// 2.定义配置文件 在项目的src目录下创建druid.properties文件，文件中写如下配置
driverclassName=com.mysql.jdbc.Driver
url=jdbc:mysql:///db1?useSSL=false&useServerPrepStmts=true
username=root
password=1234
# 初始化连接数量
initialSize=5
# 最大连接数
maxActive=10
# 最大等待时间
maxWait=3000
    
    
// 3．加载配置文件
Properties prop = new Properties();
prop.load(new FileInputstream("jdbc-demo/src/druid.properties"));// 自己项目的下的配置文件路径
// 4．获取连接池对象
DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);

//5．获取数据库连接Connection
Connection connection = dataSource.getConnection();
```



## 三、Maven

Maven是专门用于管理和构建Java项目的工具，它的主要功能有:

- 提供了一套标准化的项目结构
- 提供了一套标准化的构建流程(编译，测试，打包，发布…..)
- 提供了一套依赖管理机制

注：

- Maven提供了一套标准化的项目结构，所有IDE使用Maven构建的项目结构完全一样，所有IDE创建的Maven项目可以通用
- Maven提供了一套简单的命令来完成项目构建
- 依赖管理
  依赖管理其实就是管理你项目所依赖的第三方资源(jar包、插件...)

### Maven简介

Apache Maven是一个项目管理和构建工具，它基于项目对象模型

(POM)的概念，通过一小段描述信息来管理项目的构建、报告和文档

官网: http://maven.apache.org/



**仓库分类:**

- 本地仓库: 自己计算机上的一个目录

- 中央仓库: 由Maven团队维护的全球唯一的仓库

  - 地址: https://repo1.maven.org/maven2/

- 远程仓库(私服): 一般由公司团队搭建的私有仓库

  

  当项目中使用坐标引入对应依赖jar包后，首先会查找本地仓库中是否有对应的jar包

  如果有，则在项目直接引用;

  如果没有，则去中央仓库中下载对应的jar包到本地仓库。还可以搭建远程仓库，将来jar包的查找顺序

  则变为:

  本地仓库→远程仓库→中央仓库

### Maven 作用

- 标准化的项目结构
- 标准化的构建流程
- 方便的依赖管理

### Maven模型

- 项目对象模型(Project Object Model)
- 依赖管理模型(Dependency)
- 插件(Plugin)



### Maven安装配置

1. 解压apache-maven-3.6.1.rar 既安装完成
2. 配置环境变量MAVEN_HOME为安装路径的bin目录
3. 配置本地仓库: 修改conf/settings.xml中的`<localRepository>`为一个指定目录
4. 配置阿里云私服: 修改conf/settings.xml中的`<mirrors>`标签，为其添加如下子标签:

```java
<mirror>
	<id>alimaven<lid>
	<name>aliyun maven</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
	<mirrorOf>central</mirrorOf>
</mirror>
```

### Maven基本使用

**Maven常用命令**

- compile : 编译
- clean: 清理
- test: 测试
- package: 打包
- install: 安装

### IDEA配置Maven

lDEA配置Maven环境

1. 选择IDEA中 File --> Settings
2. 搜索maven
3. 设置IDEA使用本地安装的Maven，并修改配置文件路径

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven2.png)

#### 配置Maven环境(全局)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven111.png)

### Maven坐标详解

- 什么是坐标?

  Maven中的坐标是资源的唯一标识，通过该坐标可以唯一定位资源位置。

  使用坐标来定义项目或引入项目中需要的依赖

- Maven 坐标主要组成

  - groupld: 定义当前Maven项目隶属组织名称（通常是域名反写，例如: com.itheima)
  - artifactld: 定义当前Maven项目名称（通常是模块名称，例如order-service、goods-service)
  - version: 定义当前项目版本号

```java
<groupId>com.itheima</groupId>
<artifactId>maven-demo</artifactId>
<version>1.0-SNAPSHOT</version>
    
如：
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<version>5.1.46</version>
</ dependency>
```

### IDEA创建Maven项目

1. 创建模块，选择Maven，点击Next
2. 填写模块名称，坐标信息，点击finish，创建完成
3. 编写HelloWorld，并运行

空项目中

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven222.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven3.png)

### IDEA导入Maven项目

1. 选择右侧Maven面板，点击＋号
2. 选中对应项目的pom.xml文件，双击即可
3. 如果没有Maven面板，选择View → Appearance > Tool Window Bars

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven4.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven333.png)

### 配置Maven-Helper插件

1. 选择IDEA中 File --> Settings
2. 选择Plugins
3. 搜索Maven，选择第一个Maven Helper，点击Install安装，弹出面板中点击Accept
4. 重启IDEA

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven5.png)

### 使用坐标导入jar包

1. 在pom.xml中编写`<dependencies>`标签
2. 在`<dependencies>`标签中使用`<dependency>`引入坐标
3. 定义坐标的groupld，artifactld,version
4. 点击刷新按钮，使坐标生效

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven6.png)

### 使用坐标导入jar包-自动导入

1. 选择IDEA中 File --> Settings
2. 在弹出的面板中找到Build Tools
3. 选择Any changes，点击ok 即可生效

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven7.png)

### 使用坐标导入jar包-快捷方式

1. 在pom.xml中按alt + insert，选择 Dependency
2. 在弹出的面板中搜索对应坐标，然后双击选中对应坐标
3. 点击刷新按钮，使坐标生效

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven8.png)

### 依赖管理

#### 依赖范围

通过设置坐标的依赖范围(scope)，可以设置对应jar包的作用范围: 编译环境、测试环境、运行环境

依赖的jar包，默认情况下，可以在任何地方使用。可以通过`<scope>..</ scope>`设置其作用范围。

作用范围:

>主程序范围有效。( main文件夹范围内)
>
>测试程序范围有效。( test文件夹范围内)
>
>是否参与打包运行。( package指令范围内)

```java
<dependency>
	<groupld>junit</groupld>
    <artifactld>junit</artifactld>
    <version>4.10</version>
    <scope>test</ scope >
</dependency>
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven9.png)



#### 依赖配置

依赖: 指当前项目运行所需要的jar包，一个项目中可以引入多个依赖。

配置:

1. 在pom.xml中编写`<dependencies>`标签
2. 在`<dependencies>`标签中使用`<dependency>`引入坐标
3. 定义坐标的groupld,artifactld,version
4. 点击刷新按钮，引入最新加入的坐标

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven444.png)

注意事项

- 如果引入的依赖，在本地仓库不存在，将会连接远程仓库/中央仓库，然后下载依赖。(这个过程会比较耗时，耐心等待)
- 如果不知道依赖的坐标信息，可以到https://mvnrepository.com/中搜索。

#### 依赖传递

依赖具有传递性

- 直接依赖: 在当前项目中通过依赖配置建立的依赖关系
- 间接依赖: 被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven555.png)

- 排除依赖

  排除依赖指主动断开依赖的资源，被排除的资源无需指定版本。

  ```java
  <dependency>
      <groupld>com.itheima</groupld>
      <artifactld>maven-projectB</artifactld>
      <version>1.0-SNAPSHOT</version>
      <exclusions>
          <exclusion>
              <groupld>junit</groupld>
              <artifactld>junit</artifactld>
          </exclusion>
      </exclusions>
  </dependency>
  ```

#### Maven生命周期

- Maven构建项目生命周期描述的是一次构建过程经历经历了多少个事件
- Maven的生命周期就是为了对所有的maven项目构建过程进行抽象和统一。
- Maven对项目构建的生命周期划分为3套
  - clean清理工作
  - default: 核心工作，例如编译，测试，打包，安装等
  - site: 产生报告，发布站点等

**每套生命周期包含一些阶段(phase)，阶段是有顺序的，后面的阶段依赖于前面的阶段。**

**同一生命周期内，执行后边的命令，前边的所有命令会自动执行**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/maven1.png)

##### 生命周期阶段

- clean:  移除上一次构建生成的文件
- compile:   编译项目源代码
- test:  使用合适的单元测试框架运行测试(junit)
- package:   将编译后的文件打包，如: jar、war等
- install:  安装项目到本地仓库

> clean: 清理
> compile: 编译
> test: 测试
> package: 打包
> install: 安装

## 四、MyBatis

### 什么是MyBatis?

- MyBatis是一款优秀的持久层框架，用于简化JDBC开发
- MyBatis 本是 Apache的一个开源项目 iBatis, 2010年这个项目由apache softwarefoundation迁移到了google code，并且改名为MyBatis 。2013年11月迁移到Github
- 官网: https://mybatis.org/mybatis-3/zh/index.html
- MyBatis 免除了几乎所有的JDBC代码以及设置参数和获取结果集的工作

**持久层**

- 负责将数据到保存到数据库的那一层代码

- JavaEE三层架构: 表现层、业务层、持久层

  

**框架**

- 框架就是一个半成品软件，是一套可重用的、通用的、软件基础代码模型
- 在框架的基础之上构建软件编写更加高效、规范、通用、可扩展

**JDBC缺点**

1. 硬编码
   注册驱动，获取连接

   SQL语句

2. 操作繁琐

   手动设置参数

   手动封装结果集

### MyBatis 快速入门

**步骤**

```java
1．创建user表，添加数据
2．创建模块，导入坐标
3．编写MyBatis核心配置文件-->替换连接信息解决硬编码问题
4. 编写SQL映射文件-->统一管理sql语句，解决硬编码问题
5．编码
    1.定义POJO类
	2．加载核心配置文件，获取SqlSessionFactory对象
    3．获取SqlSession对象，执行SQL语句
	4．释放资源
```

步骤如下：

```java
// 在pom.xml文件中导入所需要的包文件的坐标

如：	
	<dependencies>
        <!--mybatis 依赖包-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.6</version>
        </dependency>

        <!--mysql依赖包-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
    </dependencies>
```



```java
// 在resources下创建mybatis-config.xml文件，写如下配置
// 更改数据库连接信息、加载sql的映射文件

如：
    
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--数据库连接信息-->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!--加载sql的映射文件-->
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```

```java
// 在resources下创建对应的映射文件，写如下配置
// 映射文件名如：UserMapper.xml
// 更改namespace:名称空间、resultType

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!--namespace:名称空间-->
<mapper namespace="test">
    <select id="selectAll" resultType="com.gybsl.User">
        select * from tb_user
    </select>
</mapper>
```

```java
// 在main\java文件夹下新建包名加类名，如com.gybsl.User
// 编写好User类之后
// 在测试类中编写如下代码

如：
    // 加载mybatis中的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

	// 获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();

	// 执行sql
        List<User> user = sqlSession.selectList("test.selectAll");
		System.out.println(user);

        // 释放资源
        sqlSession.close();
```



### Mapper代理开发

目的

- 解决原生方式中的硬编码
- 简化后期执行SQL

```java
// 3．执行sql
List<User> users = sqlSession.selectList("test.selectAll");
System.out.println(users) ;

//3．获取接口代理对象
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
//4，执行方法，其实就是执行sqli语句
List<User> users = userMapper.selectAll();
```

#### 使用Mapper代理方式完成入门案例

1. 定义与SQL映射文件同名的Mapper接口，并且将Mapper接口和SQL映射文件放置在同一目录下
2. 设置SQL映射文件的namespace属性为Mapper接口全限定名
3. 在 Mapper接口中定义方法，方法名就是SQL映射文件中sql语句的id，并保持参数类型和返回值类型一致
4. 编码
   - 通过SqISession的 getMapper方法获取Mapper接口的代理对象
   - 调用对应方法完成sql的执行

细节: 如果Mapper接口名称和SQL映射文件名称相同，并在同一目录下，则可以使用包扫描的方式简化SQL映射文件的加载

```java
<mappers>
	<!-- 加战sqL的映射文件 -->
	<!-- <mapper resource="com/itheima/mapper2/UserMapper.xml " /> -->
    <package name="com.itheima.mapper" />
</mappers>
```



### MyBatis核心配置文件详解

MyBatis核心配置文件的顶层结构如下:

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/mybatis1.png)

类型别名(typeAliases)

```java
<typeAliases>
	<package name="com.itheima.pojo" />
</typeAliases>
```

细节: 配置各个标签时，需要遵守前后顺序



### MyBatisX插件

MybatisX是一款基于IDEA的快速开发插件，为效率而生。

主要功能:

- XML和接口方法相互跳转
- 根据接口方法生成statement
- 在idea插件市场直接下载安装



### MyBatis的增删查改

#### MyBatis的查询

要先创建一个xml和对应的mapper接口文件

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/mybatis-2-1.png)

然后加载映射文件

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/mybatis-2-2.png)

```java
// 加载mybatis中的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        // 获取sqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 获取Mapper接口的代理对象
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        // 执行sql
        List<Brand> brands = brandMapper.selectAll();
```

```java
数据库表的字段名称 和 实体类的属性名称不一样，则不能自动封装数据
起别名: 对不一样的列名起别名,让别名和实体类的属性名一样
缺点: 每次查询都要定义一次别名
解决1：sql片段：
    <sql id="brand_column">
		id,brand_name as brandName，company_name as companyName，ordered，description，status
    </sql>
    <select id="selectAll" resultType="com.gybsl.Brand">
        select <include refid="brand_column"/> from tb_brand;
    </select>
        
        
        
解决2：resultMap:
	1．定义<resultMap>标签
	2．在<select>标签中，使用resultMap属性替换resultType属性

 // id:唯一标识
 // type:映射的类型。支持别名
<resultMap id="brandResultMap" type="brand"">
        <!-- id:完成主键字段的映射
				column:表的列名
				property:实体类的属性名
			resUlt:完成一股字段的映射
				column:表的列名
				property:实体类的属性名
		-->
	<result column="brand_name" property="brandName" />
	<result column="company_name" property="companyName" />
</resultMap>
<select id="selectAll" resultMap="brandResultMap">
	select * from tb_brand;
</select>
```

实体类属性名和数据库表列名不一致，不能自动封装数据

1. 起别名:在sQL语句中，对不一样的列名起别名，别名和实体类属性名一样*可以定义`<sql>`片段，提升复用性

2) resultMap: 定义`<resultMap>`完成不一致的属性名和列名的映射

#### 查询传参

```java
// 如mapper接口类中的方法需传参实现查看详情: 根据Id查询
Brand selectByld(int id);

// xml中
<select id="selectByld" parameterType="int" resultType="brand">
    select * from tb_brand where id = #{id};
</select>
    
// 执行方法
    int id = 1;
	Brand brand = brandMapper.selectById(id);
```

```java
参数占位符:
	1．#{}: 会将其替换为?，为了防止SQL注入
	2．${}: 拼sql,会存在SQL注入问题
	3．使用时机:
		参数传递的时候: #[}
		表名或者列名不固定的情况下: ${}会存在SQL注入问题
                   
参数类型: parameterType:可以省略
如：
<select id="selectByld" parameterType="int" resultType="brand">
    select * from tb_brand where id = #{id};
</select>
                   
sQL语句中特殊字符处理: 
	转义字符
	<![CDATA[内容]]>
```

总结

```java
1.参数占位符:
	1) #{}: 执行sQL时，会将#{}占位符替换为?,将来自动设置参数值
	2) ${}: 拼sQL。会存在sQL注入问题
	3).使用时机:
	*参数传递，都使用#{}
	*如果要对表名、列名进行动态设置，只能使用$进行sql拼接。
2. parameterType:
	*用于设置参数类型，该参数可以省略
3. SQL语句中特殊字符处理:
	*转义字符
	<[CDATA[内容]]>
```



#### 查询-多条件查询

1. 编写接口方法: Mapper接口
   - 参数: 所有查询条件
   - 结果: `List<Brand>`
2. 编写SQL语句: SQL映射文件
3. 执行方法，测试

**条件查询**

```java
// mapper接口文件中定义方法如下三种方式

// 如：

// 参数接收:
// 1．散装参数: 如果方法中有多个参数。需要使用@Param("sQL参数占位符名称")
List<Brand> selectByCondition(@Param("status") int status,@Param("companyName") String companyName,@Param("brandName") String brandName);

// 2.对象参数:对象的属性名称要和参数占位符名称一致
List<Brand> selectByCondition(Brand brand);

// 3. map集合参数
List<Brand> selectByCondition(Map map);
```

```java
// mapper对应的xml中如下

// 条件查询
// 如：

// 散装参数
<select id="selectByCondition" resultHap="brandResultMap">
    select *
    from tb_brand
    where status = #{status}
    and company_name like #{comparlyName}
	and brand_name like #{brandName}
</select>
```

```java
// 测试方法中如下

// 接收参数
int status = 1;
String companyName ="华为";
String brandName = "华为"";
    
// 处理参数
companyName = "%" + companyName + "%";
brandName ="%" + brandName + "%";

// 封装对象
Brand brand = new Brand();
brand.setStatus(status);
brand.setCompanyName(companyName);
brand.setBrandName(brandName);

Map map = new HashMap();
map.put("status",status);
map.put("companyName",companyName);
map.put("status",status);

// 1．获取SqlSessionFactory
String resource = "mybatis-config.xml";
Inputstream inputstream = Resources.getResourceAsStream(resource);
sqlSessionFactory sqlSessionFactory = new sqlSessionFactoryBuilder().build(inputstream);

// 2．获取SqlSession对象
sqlsession sqlSession = sqlsessionFactory.opensession();

// 3．获取Mapper接口的代理对象
BrandMapper brandHapper = sqlSession.getHapper(BrandMapper.class);

// 4．执行方法
List<Brand> brands = brandHapper.selectByCondition(status,companyName,brandName);
List<Brand> brands = brandHapper.selectByCondition(brand);
List<Brand> brands = brandHapper.selectByCondition(map);

System.out.println(brands);

// 5．释放资源
sqlSession.close();
```

##### 总结

```java
SQL语句设置多个参数有几种方式?
	1)散装参数: 需要使用@Param("sQL中的参数占位符名称")
	2)实体类封装参数
		只需要保证SQL中的参数名和实体类属性名对应上，即可设置成功
	3)map集合
 		只需要保证SQL中的参数名和map集合的键的名称对应上，即可设置成功
```



#### 查询-多条件-动态条件查询

SQL语句会随着用户的输入或外部条件的变化而变化，我们称为动态SQL

MyBatis 对动态SQL有很强大的支撑:

- if
- choose (when, otherwise)
- trim (where, set)
- foreach

**if、where动态条件查询**

```java
if: 条件判断
	test: 逻辑表达式
问题解决:
	恒等式 where 1=1
	<where>替换where关健字
        
如：
        
<where>
	<if test="status != null">
		and status = #istatus}
	</if>
	<if test="companyName != null and companyName != '' ">
		and company_name like #{companyName}
	</if>
	<if test="brandName != null and brandName != '' ">
		and brand_name like #{brandName}
	</if>
</where>
```

##### if的总结

动态SQL

- if : 用于判断参数是否有值，使用test属性进行条件判断
  - 存在的问题: 第一个条件不需要逻辑运算符
  - 解决方案:
    1) 使用恒等式让所有条件格式都一样
    2) `<where>`标签替换where关键字



**choose 动态条件查询**

从多个条件中选择一个

- choose (when, otherwise): 选择，类似于Java中的switch语句

```java
如：
    
<select id="selectByConditionSingle" resultMap="brandResultMap">
	select *
	from tb_brand
    where
	<choose> <!--类似于switch-->
		<when test="status != null"><!--类似于case-->
    		status = #{status}
		</when>
		<when test="companyName != null and companyName !='' ">
            company_name like #{companyName}
		</when>
		<when test="brandName != null and brandName !='' ">
            brand_name like #{brandName}
		</when>
		<otherwise> <!--类似于default-->
			1=1
		</otherwise>
	</choose>
</select>
            
或
            
<select id="selectByConditionSingle" resultMap="brandResultMap">
	select *
	from tb_brand
    <where>
        <choose> <!--类似于switch-->
            <when test="status != null"><!--类似于case-->
                status = #{status}
            </when>
            <when test="companyName != null and companyName !='' ">
                company_name like #{companyName}
            </when>
            <when test="brandName != null and brandName !='' ">
                brand_name like #{brandName}
            </when>
        </choose>
	</where>
</select>
```



#### 添加

1. 编写接口方法: Mapper接口
   `void add(Brand brand);`
   参数: 除了id之外的所有数据
   结果: void
2. 编写SQL语句: SQL映射文件

```java
// xml中
<insert id=""add">
	insert into tb_brand (brand_name, company_name, ordered, description, status) values (#{brandName},#{companyName}),#{ordered),#{description},#{status);
</insert>
```

3. 执行方法，测试

   MyBatis事务:
   openSession(): 默认开启事务，进行增删改操作后需要使用 sqlSession.commit(); 手动提交事务openSession(true): 可以设置为自动提交事务(关闭事务)

4. 添加–主键返回

   返回添加数据的主键
   `<insert useGeneratedKeys="true" keyProperty="id">`

   在数据添加成功后，需要获取插入数据库数据的主键

   比如: 添加订单和订单项

   1. 添加订单
   2. 添加订单项，订单项中需要设置所属订单的id

```java
<insert id="addOrder" useGeneratedKeys="true" keyProperty="id">
    insert into tb_order (payment, payment_type,status) values (#{payment},#{paymentType},#{status});
</insert>
```

```java
<insert id="addOrderItem" >
	insert into tb_order_item (goods_name, goods_price, count,order_id) values (#{goodsName},#{goodsPrice},#{count},#{orderld});
</insert>
```

```java
// 测试方法中
brandMapper.addOrder(brand);
// 主键返回
Integer id = brand.getId0;
```

**mapper接口中**

```java
void update(Brand brand);
```

**xml中**

```java
<update id="update">
    update tb_brand
	set brand_name = #{brandName},company_name = #{companyName},ordered = #{ordered},
description = #{description},status = #{status}
	where id = #{id};
</update>
```

##### 修改–修改动态字段

```java
<update id="update">
    update tb_brand
    <set>
		<if test="brandName != null and brandName !='' ">
            brand_name = #{brandName},
		</if>
		<if test="companyName != null and companyName !='' ">
			company_name = #{companyName},
		</if>
		<if test="ordered != null>
			ordered = #{ordered},
		</if>
		<if test="description != null and description!='' ">
			description = #{description},
		</if>
		<if test="status != null">
			status = #{status},
		</if>
	</set>
	where id = #{id};
</update>
```



#### 删除

1. 编写接口方法: Mapper接口
   参数: id
   结果: void
2. 编写SQL语句: SQL映射文件
3. 执行方法，测试

**mapper方法中**

```java
void deleteByld(int id);
```

**xml中**

```java
<delete id="deleteByld">
	delete from tb_brand where id = #{id}
</delete>
```

##### 批量删除

1. 编写接口方法: Mapper

   接口参数: id数组
   结果: void

2. 编写SQL语句: SQL映射文件

3. 执行方法，测试

**mapper方法中**

```java
void deleteByIds(@Param("ids") int[] ids);
```

**xml中**

```java
mybatis会将数组参数,封装为一个Map集合。
	默认:array =数组
	使用@Param注解改变map集合的默认key的名称

<delete id="deleteBylds">
    delete from tb_brandwhere id in 
	<foreach collection="ids" item="id" separator="," open="(" close=")">
    	#{id}
	</foreach>
        ;
</delete>
```





## 五、Tomcat

### Tomcat简介和基本使用

**Tomcat简介**

概念:

Tomcat是Apache软件基金会一个核心项目，是一个开源免费的轻量级Web服务器，支持Servlet/JSP
少量JavaEE规范。

- 下载∶官网下载，官网: https://tomcat.apache.org/
- 安装:  绿色版，直接解压即可
- 卸载:  直接删除目录即可
- 启动:  双击: bin\startup.bat

​		控制台中文乱码:  修改conf/logging.properties

- 关闭:

  直接x掉运行窗口:  强制关闭

  bin\shutdown.bat:  正常关闭

  Ctrl+C:  正常关闭

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/tomcat1.png)

**Tomcat基本使用**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/tomcat2.png)

**Tomcat部署项目**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/tomcat3.png)



### IDEA中创建Maven Web项目

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea1.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea3.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea4.png)



### IDEA中使用Tomcat一集成本地Tomcat

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea5.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/idea6.png)



## 六、Servlet

Servlet是Java提供的一门动态web资源开发技术

Servlet是JavaEE规范之一，其实就是一个接口，将来我们需要定义Servlet类实现Servlet接口，并由web服务器运行Servlet

`public interface Servlet`

### Servlet 快速入门

1. 创建web项目，导入Servlet依赖坐标

   ```java
   <dependency>
   	<groupId>javax.servlet</groupId>
   	<artifactId>javax.servlet-api</artifactId>
       <version>3.1.0</version>
   	<scope>provided</scope>
   </dependency>
   ```

2. 创建: 定义一个类，实现Servlet接口，并重写接口中所有方法，并在service方法中输入一句话

   ```java
   public class ServletDemo1 implements Servlet {
   	public void service(){}
   }
   ```

3. 配置:在类上使用@WebServlet注解，配置该Servlet的访问路径

   ```java
   @WebServlet("/demo1")
   public class ServletDemo1 implements Servlet {...}
   ```

4. 访问: 启动Tomcat，浏览器输入URL访问该Servlet

   http://localhost:8080/web-demo/demo1

### Servlet 执行流程

1. Servlet由谁创建? Servlet方法由谁调用?
   - Servlet由web服务器创建，Servlet方法由web服务器调用。
2. 服务器怎么知道servlet中一定有service方法?
   - 因为我们自定义的Servlet，必须实现Servlet接口并复写其方法，而Servlet接口中有service方法

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/servlet1.png)

### Servlet生命周期

对象的生命周期指一个对象从被创建到被销毁的整个过程

**Servlet运行在servlet容器(web服务器)中，其生命周期由容器来管理，分为4个阶段:**

1. `加载和实例化`: 默认情况下，当Servlet第一次被访问时，由容器创建Servlet对象
2. `初始化`: 在servlet实例化之后，容器将调用Servlet的 `init()` 方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化的工作。该方法只调用一次
3. `请求处理`: 每次请求servlet时，Servlet容器都会调用Servlet的 `service()` 方法对请求进行处理。
4. `服务终止`: 当需要释放内存或者服务器关闭时，容器就会调用servlet实例的 `destroy()` 方法完成资源的释放。在destroy()方法调用之后，容器会释放这个Servlet实例，该实例随后会被Java的垃圾收集器所回收

注意：

init() 方法默认Servlet被第一次访问时调用，只调用一次

配置loadOnStartup属性之后，服务器启动时创建Servlet对象，调用init() 方法

```java
@WebServlet(urlPatterns = "/demo",loadOnStartup =1)
负整数: 第—次被访问时创建Servlet对象
0或正整数: 服务器启动时创建Servlet对象，数字越小优先级越高
```

### Servlet 方法和体系结构

**Servlet方法介绍**

- 初始化方法，在Servlet被创建时执行，只执行一次

  ```java
  void init(ServletConfig config)
  ```

- 提供服务方法，每次Servlet被访问，都会调用该方法

  ```java
  void service(ServletRequest req, ServletResponse res)
  ```

- 销毁方法，当Servlet被销毁时，调用该方法。在内存释放或服务器关闭时销毁servlet

  ```java
  void destroy()
  ```

- 获取ServletConfig对象

  ```java
  ServletConfig getServletConfig()
  ```

- 获取Servlet信息

  ```java
  String getServletInfo()
  ```

  

**Servlet 体系结构**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/servlet2.png)

我们将来开发B/S架构的web项目，都是针对HTTP协议，所以我们自定义Servlet，会继承HttpServlet

**总结**

1. HttpServlet使用步骤

  继承HttpServlet

  重写doGet和doPost方法

1. HttpServlet原理

获取请求方式，并根据不同的请求方式，调用不同的doXxx方法

### Servlet urlPattern配置

Servlet要想被访问，必须配置其访问路径(urlPattern)

1. 一个Servlet，可以配置多个 urlPattern

   ```java
   @WebServlet(urlPatterns = {"/demo1" , "/ demo2""})
   ```

2. urlPattern 配置规则

   - 精确匹配

     ```java
     配置路径: @WebServlet("/user/select")
     访问路径: localhost:8080/web-demo/user/select
     ```

   - 目录匹配

     ```java
     配置路径: @WebServlet("/user/*")
     访问路径: localhost:8080/web-demo/user/aaa 或 localhost:8080/web-demo/user/bbb
     ```

   - 扩展名匹配

     ```java
     配置路径: @WebServlet("*.do")
     访问路径: localhost:8080/web-demo/aaa.do 或 localhost:8080/web-demd/bbb.do
     ```

   - 任意匹配

     ```java
     配置路径: @WebServlet("/") 和 @webservlet("/*")
     访问路径: localhost:8080/web-demo/hehe 和 localhost:8080/web-demd/haha
     ```

     `/` 和 `/*` 区别:

     当我们的项目中的Servlet配置了 `/`，会覆盖掉tomcat中的DefaultServlet，当其他的url-pattern都匹配不上时都会走这个Servlet

     当我们的项目中配置了 `/*`，意味着匹配任意访问路径

     优先级: 精确路径>目录路径>扩展名路径>/*>/

### XML配置方式编写Servlet

Servlet 从3.0版本后开始支持使用注解配置，3.0版本前只支持XML配置文件的配置方式

步骤:

1. 编写Servlet类

2. 在web.xml中配置该Servlet

   ```java
   // servlet 全类名
   <servlet>
   	<servlet-name>demo5</servlet-name>
   	<servlet-class>com.itheima.web.servlet.servletDemo5</servlet-class>
   </servlet>
           
   // servlet 访问路径
   <servlet-mapping>
   	<servlet-name>demo5</servlet-name>
   	<url-pattern>/demo5</url-pattern>
   </servlet-mapping>
   ```

   

### Request(请求)

Request: 获取请求数据

Response: 设置响应数据

#### request 继承体系

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/request1.png)

1. Tomcat需要解析请求数据，封装为request对象，并且创建request对象传递到service方法中
2. 使用request对象，查阅JavaEE API文档的 HttpServletRequest 接口

#### Request 获取请求数据

请求数据分为3部分:

1. 请求行:	`GET/request-demo/req1?username=zhangsan HTTP/1.1`

   - `String getMethod()`: 获取请求方式: GET或POST
   - `String getContextPath()`: 获取虚拟目录(项目访问路径):  /request-demo
   - `StringBuffer getRequestURL()`: 获取URL(统一资源定位符): http://localhost:8080/request-demo/req1
   - `String getRequestURI()`: 获取URI(统一资源标识符): /request-demo/req1
   - `String getQueryString()`: 获取请求参数(GET方式): username=zhangsan&password=1232．

2. 请求头:   `User-Agent: Mozilla/5.0 Chrome/91.0.4472.106`

   `String getHeader(String name)`: 根据请求头名称，获取值

3. 请求体:   `username=superbaby&password=123`

   - `ServletInputStream getInputStream()`: 获取字节输入流
   - `BufferedReader getReader()`: 获取字符输入流

   ```java
   // 1．获取字符输入流
   BufferedReader br = req.getReader();
   // 2．读取数据
   string line = br.readLine();
   System.out.println(line);
   ```

##### 通用方式获取请求参数

请求参数获取方式: 

GET方式:
	`String getQueryString()`

POST方式
	`BufferedReader getReader()`

思考:
GET请求方式和POST请求方式区别主要在于获取请求参数的方式不一样，是否可以提供一种统一获取请求参数的方式，从而统一doGet和doPost方法内的代码?

```java
Map<String, String[]> getParameterMap(): 获取所有参数Map集合
    
String[] getParameterValues(String name)︰根据名称获取参数值(数组)
    
String getParameter(String name): 根据名称获取参数值(单个值)
```

如：

```java
// 1．获取所有参数的Map集合
Map<string,String[]> map = req.getParameterMap();

// 2．根据key获取参数值，数组
String[] hobbies = req.getParameterValues("hobby");

// 3．根据key获取单个参数值
String username = req.getParameter( name: "username");
String password = req.getParameter( name: "password");

this.doGet(res,req);
```



![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/request2.png)

##### 请求参数中文乱码处理

请求参数如果存在中文数据，则会乱码

解决方案:

**POST: **

设置输入流的编码req.setCharacterEncoding("UTF-8");

```java
// 1．解决乱码: POST.getReader ()
request.setCharacterEncoding("UTF-8");//设置字符输入流的编码

// 2．获取username
string username = request.getParameter("username");
System.out.println(username);

```



**GET**

通用方式(GET/POST)︰先编码，再解码

`new String(username.getBytes("ISO-8859-1"),"UTF-8");`

```java
// 3. GET，获取参数的方式: getQueryString
//乱码原因: tomcat进行URL解码，默认的字符集工S0-8859-1
// 3.1先对乱码数据进行编码: 转为字节数组
byte[] bytes = username.getBytes(standardCharsets.IS0_8859_1);
// 3.2字节数组解码
username = new String(bytes,StandandChansets.UTE_8);
```

URL编码

1. 将字符串按照编码方式转为二进制
2. 每个字节转为2个16进制数并在前边加上%

Tomcat 8.0之后，已将GET请求乱码问题解决，设置默认的解码方式为UTF-8



**总结**

1. 中文乱码解决方案:
   POST: 设置输入流的编码
   req.setCharacterEncoding(“UTF-8");
   通用方式(GET/POST):  先解码，再编码
   new String(username.getBytes("ISO-8859-1"),"UTF-8");

2. URL编码实现方式:

>编码:
>URLEncoder.encode(str, "utf-8");
>
>解码:
>URLDecoder.decode(s, "ISO-8859-1");

#### Request请求转发

**请求转发**

- 请求转发(forward): 一种在服务器内部的资源跳转方式

- 实现方式:

  ```java
  req.getRequestDispatcher("资源B路径").forward(req,resp);
  ```

- 请求转发资源间共享数据: 使用Request对象

  ```java
  void setAttribute(String name, Object o): 存储数据到request域中
  
  Object getAttribute(String name): 根据key，获取值
      
  void removeAttribute(String name): 根据key，删除该键值对
  ```

- 请求转发特点:

  浏览器地址栏路径不发生变化

  只能转发到当前服务器的内部资源

  一次请求，可以在转发的资源间使用request共享数据

如：

```java
//存储数据
request.setAttribute("msg" , "hello");

// 请求转发
request.getRequestDispatcher("/req6").forward(request, response);

// 获取数据
Object msg = request.getAttribute("msg");

```



### Response(响应)

#### Response设置响应数据功能介绍

响应数据分为3部分:

1. 响应行:	HTTP/1.1200 OK

   `void setStatus(int sc)`: 设置响应状态码

2. 响应头:    Content-Type: text/html

   `void setHeader(String name, String value)∶` 设置响应头键值对

3. 响应体:     `<html><head>head><body></body></html>`

   `PrintWriter getWriter()`: 获取字符输出流

   `ServletOutputStream getOutputStream()`: 获取字节输出流

#### Response完成重定向

重定向(Redirect): 一种资源跳转方式

实现方式:

```java
resp.setStatus(302);
resp.setHeader("location","资源B的路径");
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/resp1.png)

重定向特点:

浏览器地址栏路径发生变化

可以重定向到任意位置的资源（服务器内部、外部均可)

两次请求，不能在多个资源使用request共享数据



如：

```java
// 重定向
// 1.设置响应状态码 302
response.setstatus (302);
// 2．设置响应头 Location
response.setHeader("Location","/request-demo/resp2");

// 简化方式完成重定向
response.sendRedirect("/request-demo/resp2");
```



#### 路径问题

- 明确路径谁使用?
  - 浏览器使用: 需要加虚拟目录(项目访问路径)
  - 服务端使用: 不需要加虚拟目录

```java
// 动态获取虚拟目录
String contextPath = request.getcontextPath();

response.sendRedirect(contextPath+"/resp2");
```

#### Response响应字符数据

使用:

1. 通过 Response 对象获取字符输出流
   `PrintWriter writer = resp.getWriter();`
2. 写数据
   `writer.write("aaa");`
3. 注意:
   - 该流不需要关闭，随着响应结束，response对象销毁，由服务器关闭
   - 中文数据乱码: 原因通过Response获取的字符输出流默认编码: `ISO-8859-1`
     `resp.setContentType("text/html;charset=utf-8");`

如：

```java
// 1．获取字符输出流
PrintWriter writer = response.getWriter();
// content-type 设置响应头信息
response.setHeader("content-type" ,"text/html");
writer.write("aaa");
writer.write("<h1>aaa</h1>");

// 细节:流不需要关闭

// 为了避免中文乱码的问题，如下格式
response.setContentType( "text/html; charset=utf-8");

PrintWriter writer = response.getWriter();

writer.write("aaa");
writer.write("<h1>aaa</h1>");
```


#### Response响应字节数据

使用:

1. 通过Response对象获取字符输出流
   `ServletOutputStream outputStream = resp.getOutputStream();`

2. 写数据
   `outputStream.write(字节数据);`

3. lOUtils工具类使用

   - 导入坐标

     ```java
     <dependency>
     	<groupld>commons-io</groupld>
         <artifactld>commons-io</artifactld>
         <version>2.6</version>
     </dependency>
     ```

   - 使用

     `lOUtils.copy(输入流,输出流);`

如：

```java
// 1．读取文件
FileInputStream fis = new FileInputstream("d://a.jpg");

// 2．获取response字节输出流
servletoutputStream os = response.get0utputstream();

// 3．完成流的copy
byte[] buff = new byte[1024];
int len = 0;
while ((len = fis.read(buff)) != -1){
	os.write(buff, 0, len);
}

fis.close();


读取IO可用工具替换
// pom.xml中
<dependency>
	<groupId>commons-io</groupId>
	<artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>

// 完成流的copy可用如下方法替换循环
IOUtils.copy(fis ,os);
```

 

## 七、JSP

### JSP概述

概念: Java Server Pages，Java服务端页面

一种动态的网页技术，其中既可以定义HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容

JSP = HTML + Java

JSP的作用: 简化开发，避免了在Servlet中直接输出HTML标签

### JSP快速入门

1. 导入JSP坐标

   ```java
   <dependency>
   	<groupld>javax.servlet.jsp</groupld>
       <artifactld>jsp-api<lartifactld>
   	<version>2.2</version>
   	<scope>provided</scope>
   </dependency>
   ```

2. 创建JSP文件

   ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp1.png)

3. 编写HTML标签和Java代码

   ```html
   <body>
   	<h1>hello jsp~</h1>
   
   	<% System.out.printf("jsp hello~");%>
   </body>
   ```

### JSP原理

概念: Java Server Pages，Java服务端页面

JSP = HTML +Java，用于简化开发的

JSP本质上就是一个Servlet

JSP在被访问时，由JSP容器(Tomcat)将其转换为Java文件(Servlet)，在由JSP容器(Tomcat)将其编译，最终对外提供服务的其实就是这个字节码文件

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp2.png)

### JSP脚本

JSP脚本用于在JSP页面内定义Java代码JSP脚本分类:

1. `<%...%>`: 内容会直接放到`_jspService()`方法之中
2. `<%=...%>`: 内容会放到 `out.print()` 中，作为 `out.print()`的参数
3. `<%!...%>`: 内容会放到`_jspService()`方法之外，被类直接包含

如：

```java
<%
	System.out.println("hello,jsp~");
	int i = 3;
%>
    
<%="hello"%>
<%=i%>
    
<%!
	voidshow(){}
	String name = "zhangsan";
%>
```

### JSP缺点

由于JSP页面内，既可以定义HTML标签，又可以定义Java代码，造成了以下问题:

1. 书写麻烦: 特别是复杂的页面
2. 阅读麻烦
3. 复杂度高: 运行需要依赖于各种环境，JRE，JSP容器，JavaEE...
4. 占内存和磁盘: JSP会自动生成,java和.class文件占磁盘，运行的是.class文件占内存
5. 调试困难: 出错后，需要找到自动生成的.java文件进行调试
6. 不利于团队协作: 前端人员不会Java，后端人员不精HTML
7. ....

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp4.png)

### EL表达式

`Expression Language` 表达式语言，用于简化 JSP 页面内的 Java 代码

主要功能: 获取数据

语法: ` ${expression}`

如： `${brands}`∶获取域中存储的key为brands的数据

```java
在servlet中的代码
// 存储到request域中
request.setAttribute("brands" , brands);
// 转发到el-demo.jsp
request.getRequestDispatcher("/el-demo.jsp").forward(request, response);

// 在html中接收
${brands}
```

#### 四大域对象

JavaWeb中的四大域对象:

1.  page: 当前页面有效
2.  request: 当前请求有效
3.  session: 当前会话有效
4.  application: 当前应用有效

el表达式获取数据，会依次从这4个域中寻找，直到找到为止

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp5.png)



### JSTL标签

JSP标准标签库(Jsp Standarded Tag Library)，使用标签取代 JSP 页面上的Java代码

如：

```html
<c:if test="${flag == 1}"”>男</c:if>
<c:if test="${flag == 2]}">女</c:if>
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp6.png)

#### JSTL快速入门

1. 导入坐标

   ```java
   <dependency>
   	<groupld>jstl</groupld>
       <artifactld>jstl<lartifactld>
       <version>1.2</version>
   </dependency>
       
   <dependency>
   	<groupld>taglibs</groupld>
       <artifactld>standard<lartifactld>
       <version>1.1.2</version>
   </dependency>
   ```

2. 在JSP页面上引入JSTL标签库

   `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`

3. 使用
   `<c:if>`

```java
// c:if: 来完成逻辑判断，替换 java中的 if else
<c:if test="true">
	<h1>true</h1>
</c:if>
    
<c:if test="false">
	<h1> false</h1>
</c:if>
    
<c:if test="${status == 1}">
	启用
</c:if>
<c:if test="${status == 0}">
	禁用
</c:if>

```

4. 使用

   `<c:forEach></c:forEach>`

`<c:forEach>`: 相当于for循环

items: 被遍历的容器

var: 遍历产生的临时变量

varStatus: 遍历状态对象

begin: 开始数

end: 结束数

step: 步长

```java
<c:forEach begin="0" end="10" step="1" var="i">
    ${i}
</c:forEach>
```

```java
<c:forEach items="${brands}" var="brand" varStatus="status">
    <tr align="center">
    	<td>${status.index}</td> // 表示索引，从0开始
    	<td>${status.count}</td> // 表示计数，从1开始
        <td>${brand.id}</td>
        <td>${brand.brandName}</td>
        <td>${brand.companyName}</td>
        <td>${brand.description}</td>
    </tr>
</c:forEach>
```



## 八、MVC模式

MVC是一种分层开发的模式，其中:

- M: Model，业务模型，处理业务
- v: View，视图，界面展示
- c: Controller，控制器，处理请求，调用模型和视图

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp8.png)

MVC好处:

- 职责单一，互不影响
- 有利于分工协作
- 有利于组件重用



## 九、三层架构

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp9.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/jsp10.png)

- Controller

  接收请求、响应数据

- Service

  逻辑处理

- Dao

  数据访问

1. `controller`:  控制层，接收前端发送的请求，对请求进行处理，并响应数据。
2. `service`:  业务逻辑层，处理具体的业务逻辑。
3. `dao`:  数据访问层(Data Access Object)(持久层)，负责数据访问操作，包括数据的增、删、改、查。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/scjg.png)

优点：

1. 复用性强
2. 便于维护
3. 利于扩展

### 分层解耦

- 内聚:  软件中各个功能模块内部的功能联系。
- 耦合︰衡量软件中各个层/模块之间的依赖、关联的程度。
- 软件设计原则:  **高内聚低耦合**。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/fcjo1.png)

1. 控制反转:  Inversion Of Control，简称IOC。对象的创建控制权由程序自身转移到外部（容器)，这种思想称为控制反转
2. 依赖注入:  Dependency lnjection，简称DI。容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。
3. Bean对象:  IOC容器中创建、管理的对象，称之为bean。

### IOC & DI 如入门

步骤：

1. service 层及 Dao 层的实现类，交给 IOC 容器管理。
2. 为 Controller 及 Service 注入运行时，依赖的对象。
3. 运行测试。

```java
// 1.使用注解 @Component 把 Dao 层的实现接口的类交给 spring 的容器进行管理
// 将当前类交给IOC容器管理，成为IOC容器中的bean

@Component
public class EmpDaoA implements EmpDao {
    public List<Emp> listEmp(){
	//1.从文件中查询数据
	String file = this.getClass().getClassLoader().getResource( "emp.xml").getFile();
	List<Emp> empList = XmlParserUtils.parse(file,Emp.class);
	return empList;
	}
}

// 2. 使用注解 @Component 把service层实现接口的类交给容器进行管理
// 使用注解 @Autowired 将dao层的类自动引入service中使用，底层spring会自动从容器中找到对应的类并引入使用，达到解耦的效果
// 运行时，IOC容器会提供该类型的bean对象，并赋值给该变量–依赖注入

@Component
public class EmpServiceA implements EmpService {
    @Autowired
	private EmpDao empDao;
    
	public List<Emp> listEmp(){
        // 调用dao层,查询数据
        List<Emp> empList = empDao.listEmp();
        // ......
    }
}

// 使用
@RestController
public class EmpController {
    @Autowired
	private EmpService empService ;
    
	@RequestMapping("/listEmp")
	public Result list() throws Exception {
		List<Emp> empList = empService.listEmp();
        return Result.success(empList);
	}
}
```

### Bean的声明（IOC详解）

要把某个对象交给IOC容器管理，需要在对应的类上加上如下注解之一∶

- @Component
  - 声明bean的基础注解
  - 不属于其他三类时，用此注解
- @Controller
  - @Component的衍生注解
  - 标注在控制器类上
- @Service
  - @Component的衍生注解
  - 标注在业务类上
- @Repository
  - @Component的衍生注解
  - 标注在数据访问类上(由于与mybatis整合，用的少)

**注意事项**

- 声明bean的时候，可以通过`value`属性指定bean的名字，如果没有指定，默认为类名首字母小写。

- 使用以上四个注解都可以声明bean，但是在springboot集成web开发中，声明控制器bean只能用@Controller

### Bean组件扫描

- 前面声明bean的四大注解，要想生效，还需要被组件扫描注解@ComponentScan扫描。
- @ComponentScan注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解@SpringBootApplication中，默认扫描的范围是启动类所在包及其子包。

### bean的注解小结

声明bean的注解

- @Component,@Controller，@Service，@Repository
- @SpringBootApplication具有包扫描作用，默认扫描当前包及其子包



### Bean注入（DI详解）

@Autowired注解，默认是按照类型进行，如果存在多个相同类型的bean，将会报出如下错误:

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/DI1.png)

通过以下几种方案来解决:

- @Primary

  ```java
  // dao层中使用 @Primary 让当前bean生效
  @Primary
  @service
  public class EmpServiceA implements Empservice {}
  ```

- @Qualifier

  ```java
  // Service层中使用@Autowired和@Qualifier("empserviceA")来指定生效的bean
  @RestController
  public class EmpController {
      @Autowired
  	@Qualifier("empserviceA")
      private EmpService empService;
  }
  ```

- @Resource

  ```java
  // Controller层中使用@Resource(name = "empServiceB")来指定生效的bean
  @RestController
  public class EmpController {
  	@Resource(name = "empServiceB")
  	private EmpService empservice ;
  }
  ```

#### 小结

1. 依赖注入的注解

   - @Autowired:  默认按照类型自动装配。

   - 如果同类型的bean存在多个:

     @Primary

     @Autowired +@Qualifier("bean的名称")

     @Resource(name="bean的名称")

2. @Resource 与@Autowired区别

   - @Autowired是spring框架提供的注解，而@Resource是JDK提供的注解
   - @Autowired 默认是按照类型注入，而@Resource默认是按照名称注入

## 十、会话跟踪技术

- 会话: 用户打开浏览器，访问web服务器的资源，会话建立，直到有一方断开连接，会话结束。在一次会话中可以包含多次请求和响应
- 会话跟踪: 一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据
- HTTP协议是无状态的，每次浏览器向服务器请求时，服务器都会将该请求视为新的请求，因此我们需要会话跟踪技术来实现会话内数据共享
- 实现方式:
  1. 客户端会话跟踪技术: Cookie
  2. 服务端会话跟踪技术: Session

### Cookie

Cookie: 客户端会话技术，将数据保存到客户端，以后每次请求都携带Cookie 数据进行访问

#### Cookie基本使用

##### 发送cookie

1. 创建Cookie对象，设置数据

   ```java
   Cookie cookie = new Cookie("key" ,"value");
   ```

2. 发送Cookie到客户端: 使用response对象

   ```java
   response.addCookie(cookie);
   ```

如：

```java
// 1．创建Cookie对象
Cookie cookie = new Cookie("username" ,"zs");
// 2．发送Cookie, response
response.addCookie(cookie);
```

##### 获取cookie

1. 获取客户端携带的所有Cookie，使用request对象

   ```java
   Cookie[] cookies = request.getCookies();
   ```

2. 遍历数组，获取每一个Cookie对象: for

3. 使用Cookie对象方法获取数据

   ```java
   cookie.getName();
   cookie.getValue();
   ```

如：

```java
// servlet中
// 1．获取Cookie数组
Cookie[] cookies = request.getCookies();
// 2．遍历数组
for (Cookie cookie : cookies) {
	//3．获取数据
	String name = cookie.getName();
    String value = cookie.getvalue();
}
```



#### Cookie原理

Cookie 的实现是基于HTTP协议的

- 响应头: set-cookie
- 请求头: cookie

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/cookie1.png)

#### Cookie使用细节

##### Cookie 存活时间

- 默认情况下，Cookie存储在浏览器内存中，当浏览器关闭，内存释放，则Cookie被销毁
- setMaxAge(int seconds): 设置Cookie存活时间
  1. 正数: 将Cookie写入浏览器所在电脑的硬盘，持久化存储。到时间自动删除
  2. 负数: 默认值，Cookie在当前浏览器内存中，当浏览器关闭，则Cookie被销毁
  3. 零: 删除对应Cookie

如：

```java
// 1．创建Cookie对象
Cookie cookie = new Cookie("username" ,"zs");

// 2. 设置存活时间，1周7天
cookie.setMaxAge(60*60*24*7);

// 3．发送Cookie, response
response.addCookie(cookie);
```

##### Cookie 存储中文

Cookie 不能直接存储中文

如需要存储，则需要进行转码: URL编码

```java
//URL编码
String value = URLEncoder.encode("中文","UTF-8");

//URL解码
value = URLDecoder.decode(value,"UTF-8");
```



### Session

- 服务端会话跟踪技术: 将数据保存到服务端

- JavaEE 提供 HttpSession 接口，来实现一次会话的多次请求间数据共享功能

- 使用:

  1. 获取Session对象

     ```java
     HttpSession session = request.getSession();
     ```

  2. Session对象功能:

     - `void setAttribute(String name, Object o)`:  存储数据到session域中
     - `Object getAttribute(String name)`: 根据 key，获取值
     - `void removeAttribute(String name)`: 根据key，删除该键值对

如：

```java
// 1．获取Session对象
Httpsession session = request.getsession();
// 2．存储数据
session.setAttribute("username" ,"zs");


// 另外一个servlet中
// 1．获取Session对象
// 同一个会话中创建的是同一个对象，地址值一样
Httpsession session = request.getSession();
//2．获取数据
0bject username = session.getAttribute("username");
```

#### Session原理

Session是基于Cookie实现的

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/cookie1.png)

#### Session使用细节

- Session 钝化、活化:

  - 服务器重启后，Session中的数据是否还在?
    - 钝化: 在服务器正常关闭后，Tomcat会自动将Session数据写入硬盘的文件中
    - 活化: 再次启动服务器后，从文件中加载数据到Session中

- Seesion销毁:

  默认情况下，无操作，30分钟自动销毁

  可在web.xml中修改

  ```java
  <session-config> 
  	<session-timeout>30</session-timeout>
  </session-config>
  ```

  调用Session对象的invalidate()方法

  ```java
  // 销毁
  session. invalidate();
  ```

#### 小结

Cookie 和 Session 都是来完成─次会话内多次请求间数据共享的

区别:

- 存储位置: Cookie是将数据存储在客户端，Session 将数据存储在服务端
- 安全性: Cookie 不安全，Session安全
- 数据大小: Cookie最大4KB，Session无大小限制
- 存储时间: Cookie可以长期存储，Session默认30分钟
- 服务器性能: Cookie 不占服务器资源，Session占用服务器资源



## 十一、Filter

- 概念:Filter表示过滤器，是JavaWeb三大组件(Servletu。 Filter、Listener)之一。
- 过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能。
- 过滤器一般完成一些通用的操作，比如:权限控制、统一编码处理、敏感字符处理等等...

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/filter1.png)

### Filter 快速入门

1. 定义类，实现Filter接口，并重写其所有方法

   ```java
   public class FilterDemo implements Filter {
   	public void init(FilterConfig filterconfig)
   	public void doFilter(ServletRequest request,...)
   	public void destroy() {}
   }
   ```

2. 配置Filter拦截资源的路径:在类上定义@WebFilter注解

   ```java
   @WebFilter("/*")
   public class FilterDemo implements Filter {}
   ```

3. 在doFilter方法中输出一句话，并放行

   ```java
   public void doFilter(ServletRequest request,...){
   	System.out.println("filter被执行了...");
   	//放行
   	chain.doFilter(request ,response);
   }
   ```



### Filter 执行流程

1. 放行后访问对应资源，资源访问完成后，还会回到Filter中吗?

   会

2. 如果回到Filter中，是重头执行还是执行放行后的逻辑呢?

   放行后逻辑

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/fliter2.png)

如：

```java
// 1．放行前，对 request数据进行处理
System.out.println("1.FilterDemo. . . ");

//放行
chain.doFilter(request , response);

// 2．放行后，对Response数据进行处理
System.out.printin("3.FilterDemo. . .");
```



### Filter 拦截路径配置

Filter可以根据需求，配置不同的拦截资源路径

```java
@WebFilter("/*")
public class FilterDemo(){}
```

- 拦截具体的资源: `/index.jsp`: 只有访问 `index.jsp` 时才会被拦截。
- 目录拦截: `/user/*`: 访问`/user`下的所有资源，都会被拦截
- 后缀名拦截: `*.jsp`: 访问后缀名为 `jsp` 的资源，都会被拦截
- 拦截所有: `/*` : 访问所有资源，都会被拦截

### 过滤器链

- 一个Web应用，可以配置多个过滤器，这多个过滤器称为过滤器链
- 注解配置的Filter，优先级按照过滤器类名(字符串) 的自然排序

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/filter4.png)



## 十二、Listener

- 概念: Listener表示监听器，是JavaWeb三大组件(Servlet、Filter、Listener)之一。
- 监听器可以监听就是在application,session,request三个对象创建、销毁或者往其中添加修改删除属性时自动执行代码的功能组件
- Listener分类: JavaWeb中提供了8个监听器

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/filter5.png)

如:

**ServletContextListener使用**

1. 定义类，实现ServletContextListener接口

   ```java
   public class ContextLoaderListener implements ServletContextListener {
   	// Servletcontext对象被创建: 整个web应用发布成功
   	public void contextInitialized(ServletContextEvent sce){}
       
   	//Servletcontext对象被销毁:整个web应用卸载
   
   	public void contextDestroyed(ServletContextEvent sce){}
   }
   ```

2. 在类上添加@WebListener注解



例如：

```java
@WebListener
public class ContextLoaderListener implements ServletContextListener {
	@0verride
	public void contextInitialized(ServletContextEvent sce){
		//加载资源
		System.out.println("ContextLoaderListener. . ."); 
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		//释放资源
	}
}
```



## 十三、HTTP

- 概念: Hyper Text Transfer Protocol，超文本传输协议，规定了浏览器和服务器之间数据传输的规则。

- 特点:
  1. 基于TCP协议:  面向连接，安全
  2. 基于请求-响应模型的:  一次请求对应一次响应
  3. HTTP协议是无状态的协议:  对于事务处理没有记忆能力。每次请求-响应都是独立的。
     - 缺点:  多次请求间不能共享数据。
     - 优点:  速度快

### 请求数据格式

1. 请求行:  请求数据第一行 
   - 请求方式
     - GET、POST
   - 资源路径
     - 如：`/brand/findAll?name=OPPO&status=1`
   - 请求协议版本
     - HTTP/1.1
2. 请求头： 第二行开始，格式key: value
3. 空行间隔，CRLF
4. 请求体:  POST请求，存放请求参数

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/http1.png)

- 请求方式-GET:  请求参数在请求行中，没有请求体，如:  `/brand/findAll?name=OPPO&status=1`。GET请求大小是有限制的。
- 请求方式-POST:  请求参数在请求体中，POST请求大小是没有限制的。



### 响应数据格式

请求响应介绍-HTTP响应格式

1. 响应行: 响应数据第一行
   - 协议
   - 状态码
   - 状态描述
2. 响应头: 第二行开始，格式key: value
3. 空行间隔，CRLF
4. 响应体: 最后一部分，存放响应数据

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/http2.png)

### 响应状态码

- 1xx

  响应中-临时状态码，表示请求已经接收，告诉客户端应该继续请求或者如果它已经完成则忽略它。

- 2xx

  成功-表示请求已经被成功接收,处理已完成。

- 3xx

  重定向-重定向到其他地方;

  让客户端再发起一次请求以完成整个处理。

- 4xx

  客户端错误-处理发生错误，责任在客户端。如:请求了不存在的资源、客户端未被授权、禁止访问等。

- 5xx

  服务器错误-处理发生错误，责任在服务端。如: 程序抛出异常等。

  ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/http3.png)



状态码大全: https://cloud.tencent.com/developer/chapter/13553

### 响应头

- Content-Type

  表示该响应内容的类型,例如 text/html,application/json

- Content-Length

  表示该响应内容的长度（字节数)。

- Content-Encoding

  表示该响应压缩算法，例如gzip。

- Cache-Control

  指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒。

- Set-Cookie

  告诉浏览器为当前页面所在的域设置cookie。


## 十四、Spring

- 官网: http://spring.io
- Spring发展到今天已经形成了一种开发生态圈，Spring提供了若干个子项目，每个项目用于完成特定的功能。

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/sp1.png)

### SpringBootWeb 入门

Spring Boot可以帮助我们非常快速的构建应用程序、简化开发、提高效率。

1. 创建springboot工程，并勾选web开发相关依赖。
2. 定义HelloController类，添加方法hello，并添加注解。
3. 运行测试

```java
@RestController
public class HelloController {
	@RequestMapping("/hello")
    public String hello(){
		System.out.println("Hello world ~");
		return "Hello world ~";
    }
}
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/sp2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/sp11.png)

起步依赖:

- `spring-boot-starter-web`:  包含了web应用开发所需要的常见依赖

- `spring-boot-starter-test`:  包含了单元测试所需要的常见依赖。

- 官方提供的 `starter`: 

  https://docs.spring.io/spring-boot/docs/2.7.4/reference/htmlsingle/#using.build-systems.starters

#### 小结

1. 起步依赖

   - spring-boot-starter-web
   - spring-boot-starter-test

2. 内嵌Tomcat服务器

   基于Springboot开发的web应用程序，内置了tomcat服务器，当启动类运行时，会自动启动内嵌的tomcat服务器。

- BS架构:  Browser/Server，浏览器/服务器架构模式。客户端只需要浏览器，应用程序的逻辑和数据都存储在服务端。

- CS架构:Client/Server，客户端/服务器架构模式。

#### 前后端分离开发

当前最为主流的开发模式:  前后端分离

#### postman

Postman 是一款功能强大的网页调试与发送网页HTTP请求的 Chrome 插件。

作用∶ 常用于进行接口测试

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/postman1.png)

### 请求响应的参数传递

#### 简单参数

##### 原始方式

在原始的web程序中，获取请求参数，需要通过HttpServletRequest对象手动获取。

如：

```java
@RequestMapping("/simpleParam")
public String simpleParam(HttpservletRequest request){
    String name = request.getParameter("name");
    String ageStr = request.getParameter("age");
    int age = Integer.parseInt(ageStr);
	System.out.println(name+" : "+age);
    return "OK";
}
```

##### SpringBoot方式

1. 简单参数:  参数名与形参变量名相同，定义形参即可接收参数。

如：

```java
@RequestMapping("/simpleParam")
	public String simpleParam(String name , Integer age){
        System.out.println(name+" : "+age);
		return "OK";
	}
}
```

2. 简单参数:  如果方法形参名称与请求参数名称不匹配，可以使用`@RequestParam`完成映射。

```java
@RequestMapping("/simpleParam")
public String simpleParam(@RequestParam(name = "name") String username , Integer age){
    System.out.println(username +" : " + age);
    return "OK";
}
```

**注意事项**

`@RequestParam`中的`required`属性默认为true，代表该请求参数必须传递，如果不传递将报错。如果该参数是可选的，可以将required属性设置为false。

##### 小结

1. 原始方式获取请求参数
   - Controller方法形参中声明HttpServletRequest对象
   - 调用对象的getParameter(参数名)

2. SpringBoot中接收简单参数

- 请求参数名与方法形参变量名相同
- 会自动进行类型转换

2. @RequestParam注解
   方法形参名称与请求参数名称不匹配，通过该注解完成映射
3. 该注解的required属性默认是true，代表请求参数必须传递



#### 实体参数

**简单实体对象**∶

请求参数名与形参对象属性名相同，定义POJO接收即可

如：

```java
@RequestMapping("/simplePojo")
public String simplePojo(User user){
    System.out.println(user);
    return "OK";
}


// 实体类
public class User {
    private String name;
    private Integer age;
}
```

**复杂实体对象**∶

请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套POJO属性参数。

##### 小结

实体对象参数

规则:  请求参数名与形参对象属性名相同，即可直接通过POJO接收



#### 数组集合参数

数组参数:  请求参数名与形参数组名称相同且请求参数为多个，定义数组类型形参即可接收参数

```java
// 数组
@RequestMapping("/arrayParam")
public String arrayParam(String[] hobby){
    System.out.println(Arrays.toString(hobby));
    return "OK";
}
```

集合参数:  请求参数名与形参集合名称相同且请求参数为多个，@RequestParam 绑定参数关系

```java
@RequestMapping("/listParam")
public String listParam(@RequestParam List<String> hobby){
    System.out.println(hobby);
	return "OK";
}
```

##### 小结

数组集合参数

1. 数组:  请求参数名与形参中数组变量名相同，可以直接使用数组封装
2. 集合:  请求参数名与形参中集合变量名相同，通过@RequestParam绑定参数关系



#### 日期参数

日期参数:  使用`@DateTimeFormat`注解完成日期参数格式转换

```java
@RequestMapping("/dateParam")
public String dateParam(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")LocalDateTime updateTime){
    System.out.println(updateTime);
	return "OK";
}
```

#### JSON参数

JSON参数:  JSON数据键名与形参对象属性名相同，定义POJO类型形参即可接收参数，需要使用`@RequestBody`标识

```java
@RequestMapping("/jsonParam")
public String jsonParam(@RequestBody User user){
    System.out.println(user);
	return "OK";
}
```

#### 路径参数

路径参数:  通过请求URL直接传递参数，使用{..]来标识该路径参数，需要使用`@PathVariable`获取路径参数

```java
@RequestMapping("/path/{id}")
public String pathParam(@PathVariable Integer id){
    System.out.println(id);
	return "OK";
}

// 多参数
@RequestMapping("/path/{id}/{name}")
public String pathParam2(@PathVariable Integer id, @PathVariable String name){
    System.out.println(id+" : " +name);
	return "OK";
}
```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/canshu1.png)

### 响应数据

- 类型:  方法注解、类注解
- 位置: Controller方法上/类上
- 作用:  将方法返回值直接响应，如果返回值类型是实体对象/集合，将会转换为JSON格式响应
- 说明: @RestController = @controller + @ResponseBody ;

#### 统一响应结果

```java
public class Result {
	//响应码，1代表成功;0代表失败
    private Integer code;
	//提示信息
	private String msg;
    //返回的数据、
	private Object data;
}
```

#### 小结

1. @ResponseBody

   - 位置:  Controller类上/方法上
   - 作用:  将方法返回值直接响应，若返回值类型是实体对象/集合，转JSON格式响应

2. 统一响应结果

   Result (code、msg、data)



### lombok

Lombok 是一个实用的Java类库，能通过注解的形式自动生成构造器、getter/setter、equals、hashcode、toString等方法，并可以自动化生成品志变量，简化java开发、提高效率。

- `@Getter/@Setter`	为所有的属性提供get/set方法
- `@ToString  `   会给类自动生成易阅读的toString方法
- `@EqualsAndHashCode`     根据类所拥有的非静态字段自动重写equals方法和hashCode方法
- `@Data`     提供了更综合的生成代码功能（@Getter +@Setter +@ToString +@EqualsAndHashCode)
- `@NoArgsConstructor`     为实体类生成无参的构造器方法
- `@AllArgsConstructor`     为实体类生成除了static修饰的字段之外带有各参数的构造器方法。

```java
<dependency>
	<groupld>org.projectlombok</groupld>
    <artifactld>lombok</artifactld>
</dependency>
```

**注意事项**

Lombok会在编译时，自动生成对应的java代码。我们使用lombok时，还需要安装一个ombok的插件(idea自带)。
