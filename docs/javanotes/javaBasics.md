---
title: Java 基础
order: 1
toc: content
nav:
  title: Java
  order: 3
group: 
  title: Java
  order: 1
---



从集合开始的笔记，因为集合之前偷懒没做笔记 😂

## 集合进阶（集合体系结构）

```java
List系列集合：添加的元素是有序、可重复、有索引
    包含：ArrayList、LinkedList、Vector
    
Set系列集合：添加的元素是无序、不重复、无索引
    包含：TreeSet、HashSet ->(包含) LinkedHashSet
```

### Collection集合

Collection是单列集合的祖宗接口，它的功能就是全部单列集合都可以继承使用的。

```java
常用方法：
    public boolean add(E e) // 把给定的对象添加到当前集合中
    public void clear() // 清空集合中所有元素
    public boolean remove(E e) // 把给定的对象在当前集合中删除
    public boolean contains(Object obj) // 判断当前集合中是否包含给定的对象
    public boolean isEmpty() // 判断当前集合是否为空
    public int size() // 返回集合中元素的个数/集合的长度
```

注意：Collection是一个接口，我们不能直接创建他的对象。所以学习他的方法时，只能创建他的实现类的对象，实现类：ArrayList

例如：`ArrayList<> list = new ArrayList<>();`

```java
1.添加元素
    list.add("aaa");

细节1：如果我们要往List系列集合中添加数据，那么方法永远返回true，因为List系列的是允许元素重复的。
细节2：如果我们往Set系列中添加数据，如果当前元素不存在，方法返回true，表示添加成功。如果要添加的元素已经存在，方法返回false，表示添加失败，因为Set系列是不允许重复的。
```

```java
2.清空元素
    list.clear();
方法会清空集合中的所有元素
```

```java
3.删除元素
    list.remove("aaa")

细节1：因为Collection里面定义的是共性的方法，所以此时不能通过索引进行删除。只能通过元素的对象删除。
细节2：方法会返回一个布尔值，删除成功返回true，删除失败返回false，如果元素不存在则删除失败返回false
```

```java
4.判断元素是否包含
    User user = new User();
	list.add(user);

    list.contains("aaa");
	list.contains(user);

细节1：底层是依赖equals方法进行判断是否存在
    因此，集合中的定义的对象也想通过contains方法判断是否包含，那么必须在JavaBean类中，重写equals方法

注：
    如果存在自定义对象，没有重写equals方法，那么默认使用在Object类中的equals方法进行判断，而Object类中equals方法，依赖地址值进行判断
```

```java
5.获取集合的长度
    list.size();
```

**Collection系列集合的三种遍历方式**

```java
1.迭代器遍历
2.增强for遍历
3.lambda表达式遍历
```



#### 迭代器

**Collection系列集合三种通用遍历方式**

```java
1.迭代器遍历
2.增强for遍历
3.lambda表达式遍历
```

**迭代器遍历相关的三个方法：**

```java
Iterator<E> iterator(): 获取一个迭代器对象
boolean hashNext(): 判断当前指向的位置是否有元素
E next(): 获取当前指向的元素并移动指针
```

**迭代器的细节注意点：**

```java
1.报错NoSuchElementException 
2.迭代器遍历完毕，指针不会复位
3.循环中只能使用一次next方法
4.迭代器遍历时，不能使用集合的方法进行删除或增加
```

**使用**

```java
// 创建集合
Collection<String> coll = new ArrayList<>();
coll.add("aaa");
coll.add("bbb");

// 获取迭代器对象
// 迭代器默认指向集合的0索引处
Interator<String> it = coll.interator();
// 利用循环不断的去获取集合中的每一个元素
while(it.hasNext()){
    // next方法的两件事情：获取元素并移动指针
    String str = it.next();
    System.out.println(str);
} // 当循环结束之后，迭代器的指针已经指向了最后没有元素的位置
System.out.println(it.next()); // 此时如果再次调用next方法，则会报错：NoSuchElementException
// 指针不会自动复位，hasNext 返回false

// 如果要再次遍历，需要重新获取一个迭代器对象
Interator<String> it2 = coll.interator();
```

```java
// 如果在迭代器中使用集合的方法删除元素，则会报错
while(it.hasNext()){
    String str = it.next();
    if("bbb".equals(str)){
        coll.remove("bbb"); // 使用集合的方法删除元素会报错
    }
} 

// 若要删除，使用迭代器中的remove
while(it.hasNext()){
    String str = it.next();
    it.remove(); // 这种方法就可以实现删除元素
} 
```

**总结：**

```java
1.迭代器在遍历结集合的时候是不依赖索引的
2.迭代器需要掌握三个方法：
    iterator() // 创建迭代器
    hasNext() // 判断是否有下一个元素
    next() // 获取当前指针的元素，并移动指针到下一个
3.迭代器的四个细节：
    如果当前位置没有元素，还要强行获取，会报错NoSuchElementException
    迭代器遍历完毕，指针不会复位
    循环中只能使用一次next方法
    迭代器遍历时不能使用集合的方法进行增加或删除
```

**迭代器的底层原理：**

```java
调用方法iterator：
    方法底层实际上是创建了一个内部类的对象
    所以这个内部类就表示是ArrayList的迭代器
    那么相当于我们调用多次这个方法就是创建多个迭代器对象
    return new Itr();

Itr实际上是一个继承Iterator接口的类
Itr内部有一个int类型的cursor变量、int类型的lastRet变量和int类型的modCount变量
    cursor 光标，表示是迭代器里面的那个指针，默认指向0索引的位置
    lastRet 表示上一次操作的索引，默认值为-1
    modCount
    	表示集合变化的次数
    	每add或者remove一次，这个变量就会自增
    	当我们创建迭代器对象的时候，就会吧把这个次数告诉迭代器
    
当在迭代器中使用集合的方法删除或增加就会报并发修改异常
    并发修改异常原理：
    	当调用迭代器的next方法时，会在方法体中判断 当前集合中最新的变化次数跟一开始记录的次数是否相同，如果相同，证明当前集合没有发生改变，如果不一样，证明在迭代器集合的过程中使用了集合的方法添加或删除了元素

```

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/java_ddq.png)



#### 增强for遍历

增强for的底层就是迭代器，为了简化迭代器的代码书写的。

它是JDK5之后出现的，其内部原理就是一个Iterator迭代器

所有的单列集合和数组才能用增强for进行遍历

```java
格式：
    for(元素的数据类型 变量名:数组或集合){}
如：
    for(String s : list){
        System.out.println(s);
    }
```

**细节**

```java
修改增强for中的变量，不会改变集合中原本的数据
    for(String s : list){
        s="aaa" // 不会改变原集合的数据
    }
```



#### lambda表达式遍历

得益于JDK8开始的新技术Lambda表达式

```java
default void forEach(Consumer<? super T> action);
```

```java
//  创建集合并添加元素
Collection<String> coll = new ArrayList<>();
coll.add("zhangsan");
coll.add("lisi");

// 利用匿名内部类的形式
// 底层原理：
// 其实也会自己遍历集合，依次得到每一个元素
// 把得到的每一个元素传递给accept方法
// s表示集合中的每一个元素
coll.forEach(new Consumer<String>(){
    @Override
    public void accept(String s){
        System.out.println(s);
    }
});

//  lambda表达式
// ()->{}
coll.forEach(s > System.out.println(s));
```



### List集合

**list其实也是一个继承Collection的接口，不能创建接口的对象，继承了Collection的所有方法**

List 集合因为有索引，所以多了很多索引操作的方法

```java
List 系列独有的方法：
    void add(int index,E element) // 在此集合中的指定位置插入指定的元素
    E remove(int index) // 删除指定索引处的元素，返回被删除的元素
    E set(int index,E element) // 修改指定索引处的元素，返回被修改的元素
    E get(int index) // 返回指定索引处的元素
```

**使用**

```java
// 1.创建一个集合
List<String> list = new ArrayList<>();

// 2.添加元素
list.add("aaa");
list.add(1,"bbb"); // 在指定位置插入
list.add("ccc");

// 3.删除元素,可以是索引也可以是元素的值，remove方法不会进行自动装箱
list.remove(0);

// 4.修改元素
list.set(0,"222");
```

#### List集合的遍历方式

```java
1.迭代器遍历
2.列表迭代器遍历
3.增强for遍历
4.lambda表达式遍历
5.普通for循环遍历（因为List集合存在索引）
```

```java
// 1.迭代器遍历
Iterator<String> it = list.iterator();
while(it.hasNext()){
    String str = it.next();
    System.out.println(str);
}

// 2.增强for遍历
for(String s : list){
    System.out.println(s);
}

// 3.lambda表达式遍历
list.forEach(s -> System.out.println(s));

// 4.普通for循环遍历
for(int i = 0;i<list.size();i++){
    String s = list.get(i);
    System.out.println(s);
}

// 5.列表迭代器遍历
ListIterator<String> it = list.listIterator();
while(it.hasNext()){
    String str = it.next();
    if("bbb".equals(str)){
        it.add("222"); // 迭代器的方法才能在迭代器的遍历中添加元素
    }
}
```

#### 五种遍历方式对比

```java
迭代器遍历：在遍历的时候需要删除元素，用迭代器
列表迭代器：在遍历的时候需要添加元素，用列表迭代器
增强for遍历：仅仅需要遍历，使用增强for和lambda表达式遍历
lambda表达式
普通for：如果遍历的时候想操作索引，可以使用for
```



### ArrayList集合

#### ArrayList底层原理

```java
ArrayList<String> list = new ArrayList<>();
```

```java
1.利用空参创建的集合，在底层创建一个默认长度为0的数组
2.添加第一个元素时，底层会创建一个新的长度为10的数组
3.存满时，会扩容1.5倍
4.再存满时还是扩容1.5倍
5.如果一次添加多个元素，1.5倍放不下，则会以实际的需要长度为准来创建指定长度（此时数组长度要加上原来的默认创建的10）
```



**底层方法实现图解**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/java_list2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/java_list3.png)

### LinkedList集合

底层数据结构是双链表，查询慢，首尾操作的极快，所以多了很多首尾操作的方法

```java
public void addFirst(E e) // 在该列表的开头插入指定的元素
public void addLast(E e) // 在指定的元素追加到此列表的末尾
public void getFirst(E e) // 返回此列表中的第一个元素
public void getLast(E e) // 返回此列表中的最后一个元素
public void removeFirst(E e) // 从此列表中删除并返回第一个元素
public void removeLast(E e) // 从此列表中删除并返回最后一个元素
```

**LinkedList源码图解：**

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/java_linklist1.png)



### 泛型概述

泛型：是JDK5中引入的特性，可以在编译阶段约束操作的数据类型，并进行检查

泛型格式：<数据类型>

注意：泛型只能支持引用数据类型

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(111);
```

**泛型的知识点**

```java
如果我们没有指定集合的类型，默认认为所有的数据类型都是Object类型
此时可以往集合中添加任意的数据类型
带来一个坏处：我们在获取数据的时候，无法使用他的特有行为（因为多态是不能访问子类的特有功能的）
此时推出了泛型，可以在添加数据的时候把类型进行统一
而且我们在获取数据的时候，也省去了强转，非常方便
    
没有使用泛型时：
ArrayList list = new ArrayList();
// 可以添加任意的object类型的数据
// java底层会对基本数据类型进行自动装箱和拆箱
list.add(111);
list.add("aaa");

Interator it = list.iterator();
while(it.hasNext()){
    Object obj = it.next();
    sout(obj);
    
    // obj.length(); 这个时候就无法使用集合中对象的特有方法，因为多态的弊端就是不能访问子类的特有功能
}
```

**泛型的好处**

统一数据类型

把运行时期的问题提前到了编译时期，避免强转可能产生的异常

**扩展知识点**

java中的泛型是伪泛型

因为java文件编译为class文件会进行泛型的擦除

**泛型的细节**

泛型中不能写基本数据类型

指定泛型的具体类型后，传递数据时，可以传入该类型或者其他子类类型

如果不写泛型，类型默认是Object



#### 泛型类

```java
使用场景:
	当一个类中，某个变量的数据类型不确定时，就可以定义带有泛型的类
            
格式:
	修饰符 class 类名<类型>{}

举例:
	public class ArrayList<E> {
		创建该类对象时，E就确定类型
	}

此处E可以理解为变量，但是不是用来记录数据的，而是记录数据的类型，可以写成:T、E、K、V等
```

```java
// 当我在编写一个类的时候。如果不确定类型，那么这个类就可以定义为泛型类。
// 如：
public class MyArrayList<E> {
    object[] obj = new 0bject[10];
    int size;
    
    // E:表示是不确定的类型。该类型在类名后面已经定义过了。
    // e:形参的名字，变量名
    public boolean add(E e){
        obj[size] = e;
        size++;
		return true;
    }
    
    public E get(int index){
        return (E)obj[index];
	}
}
```



#### 泛型方法

```java
方法中形参类型不确定时，可以使用类名后面定义的泛型<E>
    public class MyArrayList {
        public boolean add(E e){
            obj[size] = e;
            size++;
            return true;
        }
    }
```

```java
方法中形参类型不确定时
    方案1: 使用类名后面定义的泛型 (所有方法都能用)
	方案2: 在方法申明上定义自己的泛型 (只有本方法能用)
```

```java
格式:
	修饰符<类型> 返回值类型 方法名(类型 变量名){}

举例:
	调用该方法时，T就确定类型
	public<T> void show (T t){}
	或
	public static<T> void show (T t){}

此处T可以理解为变量，但是不是用来记录数据的，而是记录类型的，可以写成:T、E、K、V等
    
例：
    public static<E> void addAll(ArrayList<E> list,E e1,E e2,E e3,E e4){
        list.add(e1);
        list.add(e2);
        list.add(e3);
        list.add(e4);
    }
```



#### 泛型接口

```java
格式:
	修饰符 interface 接口名<类型>{}

举例:
	public interface List<E> {}

重点: 如何使用一个带泛型的接口
    方式1: 实现类给出具体类型
	方式2: 实现类延续泛型，创建对象时再确定
   
// 方式1
public class MyArrayList2 implements List<String> {}
// 方式2
public class MyAnravList3<E> implements List<E> {}
```



#### 泛型的继承和通配符

**泛型不具备继承性，但是数据具备继承性**

```java
Arraylist<Ye> list1 = new ArrayList<>();
ArrayList<Fu> list2 = new ArrayList<>();
ArrayList<zi> list3 = new ArrayList<>();

// 泛型不具备继承性:
//调用method方法
method(list1);
method(list2);//报错
method(list3);//报错

// 但是数据具备继承性:
list1.add(new Ye());
list1.add(new Fu());//不报错
list1.add(new zi());//不报错

// 此时，泛型里面写的是什么类型,那么只能传递什么类型的数据。
public static void method(ArrayList<Ye> list) {}
```

```java
使用泛型的通配符:
	?也表示不确定的类型
	他可以进行类型的限定
    ? extends E: 表示可以传递E或者E所有的子类类型
	? super E: 表示可以传递E或者E所有的父类类型
        
如：
public static void method(ArrayListc<? extends e> list) {}


应用场景:
	1.如果我们在定义类、方法、接口的时候，如果类型不确定，就可以定义泛型类、泛型方法、泛型接口
	2.如果类型不确定，但是能知道以后只能传递某个继承体系中的，就可以泛型的通配符
        
泛型的通配符:
	关键点: 可以限定类型的范围。
```

#### 总结

```java
1．什么是泛型?
	JDK5引入的特性，可以在编译阶段约束操作的数据类型，并进行检查
    
2.泛型的好处?
	统一数据类型
	把运行时期的问题提前到了编译期间，避免了强制类型转换可能出现的异常，因为在编译阶段类型就能确定下来。
    
3．泛型的细节?
	泛型中不能写基本数据类型
	指定泛型的具体类型后，传递数据时，可以传入该类型和他的子类类型如果不写泛型，类型默认是Object
    
4．哪里定义泛型?
	泛型类: 在类名后面定义泛型，创建该类对象的时候，确定类型
	泛型方法: 在修饰符后面定义泛型，调用该方法的时候，确定类型
	泛型接口∶在接口名后面定义泛型，实现类确定类型，实现类延续泛型
        
5．泛型的继承和通配符
	泛型不具备继承性，但是数据具备继承性
	泛型的通配符: ?
	? extend E
	? super E
        
6．使用场景
	定义类、方法、接口的时候，如果类型不确定，就可以定义泛型
	如果类型不确定，但是能知道是哪个继承体系中的，可以使用泛型的通配符
```



### Set集合系列

添加的元素是无序的、不重复、无索引

- 无序: 存取顺序不一致
- 不重复: 可以去除重复
- 无索引: 没有带索引的方法，所以不能使用普通for循环遍历，也不能通过索引来获取元素

**set集合的实现类**

- HashSet : 无序、不重复、无索引
- LinkedHashSet: 有序、不重复、无索引
- TreeSet: 可排序、不重复、无索引

***Set 接口中的方法上基本上与Collection的API一致。***

***Collection是单列集合的祖宗接口，它的功能是全部单列集合都可以继承使用的。***



**Set遍历方式：**

- 迭代器
- 增强for
- Lambda表达式



#### 总结

1. Set系列集合的特点
   - 无序、不重复、无索引
   - Set集合的方法上基本上与Collection的API一致
2. Set集合的实现类特点
   - HashSet : 无序、不重复、无索引
   - LinkedHashSet: 有序、不重复、无索引
   - TreeSet: 可排序、不重复、无索引



#### HashSet底层原理

- HashSet集合底层采取哈希表存储数据
- 哈希表是一种对于增删改查数据性能都较好的结构

#### 哈希表组成

- JDK8之前: 数组+链表
- JDK8开始: 数组+链表+红黑树

#### 哈希值

哈希值：对象的整数表现形式

- 根据hashCode方法算出来的int类型的整数
- 该方法定义在Object类中，所有对象都可以调用，默认使用地址值进行计算
- 一般情况下，会重写hashcode方法，利用对象内部的属性值计算哈希值

**对象的哈希值特点**

- 如果没有重写hashCode方法，不同对象计算出的哈希值是不同的（因为不重写hashCode方法默认用地址值计算）
- 如果已经重写hashcode方法，不同的对象只要属性值相同，计算出的哈希值就是一样的
- 在小部分情况下，不同的属性值或者不同的地址值计算出来的哈希值也有可能一样。(哈希碰撞)

#### HashSet底层原理详细

1. 创建一个默认长度16，默认加载因为0.75的数组，数组名table
2. 根据元素的哈希值跟数组的长度计算出应存入的位置
3. 判断当前位置是否为null，如果是null直接存入
4. 如果位置不为null，表示有元素，则调用equals方法比较属性值
   - 一样: 不存
   - 不一样: 存入数组，形成链表
     - JDK8以前: 新元素存入数组，老元素挂在新元素下面
     - JDK8以后: 新元素直接挂在老元素下面

JDK8以后，当链表长度超过8，而且数组长度大于等于64时，自动转换为红黑树

如果集合中存储的是自定义对象，必须要重写hashCode和equals方法

#### LinkedHashSet底层原理

- 有序、不重复、无索引。
- 这里的有序指的是保证存储和取出的元素顺序一致
- 原理: 底层数据结构是依然哈希表，只是每个元素又额外的多了一个双链表的机制记录存储的顺序。

LinkedHashSet 集合的特点和原理是怎么样的?

- 有序、不重复、无索引
- 底层基于哈希表，使用双链表记录添加顺序

在以后如果要数据去重，我们使用哪个?

- 默认使用HashSet
- 如果要求去重且存取有序，才使用LinkedHashSet



#### TreeSet

**TreeSet的特点**

- 不重复、无索引、可排序
- 可排序:按照元素的默认规则(有小到大）排序。
- TreeSet集合底层是基于红黑树的数据结构实现排序的，增删改查性能都较好。

```java
// 1.创建TreeSet集合对象
TreeSet<Integer> ts = new Treeset<>():
// 2.添加元素
ts.add(4);
ts.add(5);
ts.add(1);
// 3.打印集合
System.out.println(ts);


// 遍历的三种方式
1. 迭代器
2. 增强for
3. lambda
```

**TreeSet集合默认的规则**

- 对于数值类型: Integer , Double，默认按照从小到大的顺序进行排序。
- 对于字符、字符串类型: 按照字符在ASCll码表中的数字升序进行排序。

**Treeet的两种比较方式**

方式一:

​	默认排序/自然排序: Javabean类实现Comparable接口指定比较规则

```java
排序规则:
@Override
public int compareTo(student o) {
	//指定排序的规则
	//只看年龄。我想要按照年龄的升序进行排列
    return this.getAge() - o.getAge();
}
this: 表示当前要添加的元素
o: 表示已经在红黑树存在的元素
返回值:
负数:认为要添加的元素是小的，存左边
正数:认为要添加的元素是大的。存右边
0: 认为要添加的元素已经存在，舍弃
```



方式二:

​	比较器排序: 创建TreeSet对象时候，传递比较器Comparator指定规则

使用原则: 默认使用第一种，如果第一种不能满足当前需求，就使用第二种

```java
TreeSet<String> ts = new TreeSet<>(new Comparatorstring>(){
	@Override
	public int compare(string o1，string o2){
		//按照长度排序
		int i = o1.length() - o2.length();
		//如果一样长则按照首字母排序
		i = i == e ? o1.compareTo(o2) : i;
		return i;
	}
});
```



**总结**

1. Treeset集合的特点是怎么样的?
   - 可排序、不重复、无索引
   - 底层基于红黑树实现排序，增删改查性能较好
2.  Treeset集合自定义排序规则有几种方式
   - 方式一:  Javabean类实现Comparable接口，指定比较规则
   - 方式二: 创建集合时，自定义Comparator比较器对象，指定比较规则

3. 方法返回值的特点
   - 负数: 表示当前要添加的元素是小的，存左边
   - 正数: 表示当前要添加的元素是大的，存右边
   - 0: 表示当前要添加的元素已经存在，舍弃



1．如果想要集合中的元素可重复

- 用ArrayList集合，基于数组的。（用的最多)

2．如果想要集合中的元素可重复，而且当前的增删操作明显多于查询

- 用LinkedList集合，基于链表的。

3．如果想对集合中的元素去重

- 用HashSet集合，基于哈希表的。(用的最多)

4．如果想对集合中的元素去重，而且保证存取顺序

- 用LinkedHashSet集合，基于哈希表和双链表，效率低于HashSet。

5．如果想对集合中的元素进行排序

- 用TreeSet集合，基于红黑树。后续也可以用List集合实现排序。



### 双列集合

#### 双列集合的特点

- 双列集合一次需要存一对数据，分别为键和值
- 键不能重复，值可以重复
- 键和值是一一对应的，每一个键只能找到自己对应的值
- 键＋值这个整体我们称之为“键值对”或者“键值对对象”，在Java中叫做“Entry对象”

```java
Map  -> HashMap/TreeMap
    HashMap -> LinkedHashMap
    
相互包含
```

#### Map的常见API

Map是双列集合的顶层接口，它的功能是全部双列集合都可以继承使用的

public interface Map<K，V>

```java
put(K key,V value) // 添加元素
    
remove(object key) // 根据键删除键值对元素
    
clear() // 移除所有的键值对元素
    
containsKey(object key) // 判断集合是否包含指定的键
    
containsValue(Object value) // 判断集合是否包含指定的值
    
isEmpty() // 判断集合是否为空
    
size() // 集合的长度，也就是集合中键值对的个数
```

```java
// 1.创建Map集合的对象
Map<string,string> m= new HashMap<>();

// 2.添加元素
m.put(""郭靖"。""黄蓉");
m.put("韦小宝"",""沐剑屏");
m.put(尹志平”,"黄蓉");

// 删除
String result = m.remove(”郭清");// 返回被删除的元素的值 黄蓉
                         
// 清空
m.clear();
                         
// 判断是否包含
boolean keyResult = m.containsKey(郭靖"");
System.out.println(keyResult);//true
                         
boolean valueResult = m.containsValue("小龙女");
system.out.printin(valueResult);
                         
boolean result = m.isEmpty();

int size = m.size();
```

#### Map的遍历方式

##### 键找值

```java
// 1.创建Map集合的对象
Map<String,string> map = new HashMap<>();

// 2.添加元素
map.put(""尹志平”,"小龙女");
map.put(郭靖","穆念慈");
map.put("欧阳克","黄蓉");
        
        
// 3.通过键找值
// 3.1获取所有的键,把这些键放到一个单列集合当中
Set<string> keys = map.keySet();
        
// 3.2遍历单列集合,得到每一个键
for (string key : keys) {
	// System.out.println(key) ;
	// 3.3 利用map集合中的键获取对应的值
    getString value = map.get(key);
	System.out.println( key + ” =" + value);
}
```



##### 键值对

```java
// 3.Map集合的第二种遍历方式/通过链值对对象进行遍历
// 3.1通过一个方法获取所有的键值对对象,返回一个Set集合
Set<Map.Entry<string,string> entries = map.entrySet();

// 3.2遍历entries这个集合。去得到里面的每一个键值对对象
for (Map.Entry<String，String> entry : entries) {
	// 3.3利用entry调用get方法获取键和值
	String key = entry.getKey();
	String value = entry.getValue();
	System.out.println(key + "=”" + value);
}
```



##### Lambda表达式

```java
// 3.利用lambda表达式进行遍历
map.forEach(new BiConsumer<String,string>() {
	@Override
	public void accept(String key,String value){
		System.out.println(key + “=” + value);
	}
});

// lambda表达式
map.forEach( (key, value)->system.out.println( key + "=" + value));
```



#### HasMap

##### HashMap的特点

- HashMap是Map里面的一个实现类。
- 没有额外需要学习的特有方法，直接使用Map里面的方法就可以了
- 特点都是由键决定的: 无序、不重复、无索引
- HashMap跟HashSet底层原理是一模一样的，都是哈希表结构

核心点:
	HashMap的键位置如果存储的是自定义对象，需要重写hashcode和lequals方法。

##### HashMap的底层原理、源码

JDK8开始：长度超过8&数组长度>=64，自动转成红黑树

```java
1.看源码之前需要了解的一些内容

Node<K,V>[] table   哈希表结构中数组的名字

DEFAULT_INITIAL_CAPACITY：   数组默认长度16

DEFAULT_LOAD_FACTOR：        默认加载因子0.75



HashMap里面每一个对象包含以下内容：
1.1 链表中的键值对对象
    包含：  
			int hash;         //键的哈希值
            final K key;      //键
            V value;          //值
            Node<K,V> next;   //下一个节点的地址值
			
			
1.2 红黑树中的键值对对象
	包含：
			int hash;         		//键的哈希值
            final K key;      		//键
            V value;         	 	//值
            TreeNode<K,V> parent;  	//父节点的地址值
			TreeNode<K,V> left;		//左子节点的地址值
			TreeNode<K,V> right;	//右子节点的地址值
			boolean red;			//节点的颜色
					


2.添加元素
HashMap<String,Integer> hm = new HashMap<>();
hm.put("aaa" , 111);
hm.put("bbb" , 222);
hm.put("ccc" , 333);
hm.put("ddd" , 444);
hm.put("eee" , 555);

添加元素的时候至少考虑三种情况：
2.1数组位置为null
2.2数组位置不为null，键不重复，挂在下面形成链表或者红黑树
2.3数组位置不为null，键重复，元素覆盖



//参数一：键
//参数二：值

//返回值：被覆盖元素的值，如果没有覆盖，返回null
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}


//利用键计算出对应的哈希值，再把哈希值进行一些额外的处理
//简单理解：返回值就是返回键的哈希值
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

//参数一：键的哈希值
//参数二：键
//参数三：值
//参数四：如果键重复了是否保留
//		   true，表示老元素的值保留，不会覆盖
//		   false，表示老元素的值不保留，会进行覆盖
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,boolean evict) {
	    //定义一个局部变量，用来记录哈希表中数组的地址值。
        Node<K,V>[] tab;
		
		//临时的第三方变量，用来记录键值对对象的地址值
        Node<K,V> p;
        
		//表示当前数组的长度
		int n;
		
		//表示索引
        int i;
		
		//把哈希表中数组的地址值，赋值给局部变量tab
		tab = table;

        if (tab == null || (n = tab.length) == 0){
			//1.如果当前是第一次添加数据，底层会创建一个默认长度为16，加载因子为0.75的数组
			//2.如果不是第一次添加数据，会看数组中的元素是否达到了扩容的条件
			//如果没有达到扩容条件，底层不会做任何操作
			//如果达到了扩容条件，底层会把数组扩容为原先的两倍，并把数据全部转移到新的哈希表中
			tab = resize();
			//表示把当前数组的长度赋值给n
            n = tab.length;
        }

		//拿着数组的长度跟键的哈希值进行计算，计算出当前键值对对象，在数组中应存入的位置
		i = (n - 1) & hash;//index
		//获取数组中对应元素的数据
		p = tab[i];
		
		
        if (p == null){
			//底层会创建一个键值对对象，直接放到数组当中
            tab[i] = newNode(hash, key, value, null);
        }else {
            Node<K,V> e;
            K k;
			
			//等号的左边：数组中键值对的哈希值
			//等号的右边：当前要添加键值对的哈希值
			//如果键不一样，此时返回false
			//如果键一样，返回true
			boolean b1 = p.hash == hash;
			
            if (b1 && ((k = p.key) == key || (key != null && key.equals(k)))){
                e = p;
            } else if (p instanceof TreeNode){
				//判断数组中获取出来的键值对是不是红黑树中的节点
				//如果是，则调用方法putTreeVal，把当前的节点按照红黑树的规则添加到树当中。
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            } else {
				//如果从数组中获取出来的键值对不是红黑树中的节点
				//表示此时下面挂的是链表
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
						//此时就会创建一个新的节点，挂在下面形成链表
                        p.next = newNode(hash, key, value, null);
						//判断当前链表长度是否超过8，如果超过8，就会调用方法treeifyBin
						//treeifyBin方法的底层还会继续判断
						//判断数组的长度是否大于等于64
						//如果同时满足这两个条件，就会把这个链表转成红黑树
                        if (binCount >= TREEIFY_THRESHOLD - 1)
                            treeifyBin(tab, hash);
                        break;
                    }
					//e：			  0x0044  ddd  444
					//要添加的元素： 0x0055   ddd   555
					//如果哈希值一样，就会调用equals方法比较内部的属性值是否相同
                    if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))){
						 break;
					}

                    p = e;
                }
            }
			
			//如果e为null，表示当前不需要覆盖任何元素
			//如果e不为null，表示当前的键是一样的，值会被覆盖
			//e:0x0044  ddd  555
			//要添加的元素： 0x0055   ddd   555
            if (e != null) {
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null){
					
					//等号的右边：当前要添加的值
					//等号的左边：0x0044的值
					e.value = value;
				}
                afterNodeAccess(e);
                return oldValue;
            }
        }
		
        //threshold：记录的就是数组的长度 * 0.75，哈希表的扩容时机  16 * 0.75 = 12
        if (++size > threshold){
			 resize();
		}
        
		//表示当前没有覆盖任何元素，返回null
        return null;
    }

```

图解：

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/HashMap.png)



##### 总结

1. HashMap底层是哈希表结构的
2. 依赖hashCode方法和equals方法保证键的唯一
3. 如果键存储的是自定义对象，需要重写hashCode和equals方法，如果值存储自定义对象，不需要重写hashCode和equals方法



#### LinkedHashMap

- 由键决定: 有序、不重复、无索引。
- 这里的有序指的是保证存储和取出的元素顺序一致
- 原理: 底层数据结构是依然哈希表，只是每个键值对元素又额外的多了一个双链表的机制记录存储的顺序。

#### TreeMap

- TreeMap跟TreeSet底层原理一样，都是红黑树结构的。
- 由键决定特性:不重复、无索引、可排序
- 可排序: 对键进行排序。
- 注意: 默认按照键的从小到大进行排序，也可以自己规定键的排序规则

##### 代码书写两种排序规则

- 实现 Comparable 接口，指定比较规则。
- 创建集合时传递 Comparator 比较器对象，指定比较规则。

##### TreeMap 源码、底层原理

```java
1.TreeMap中每一个节点的内部属性
K key;					//键
V value;				//值
Entry<K,V> left;		//左子节点
Entry<K,V> right;		//右子节点
Entry<K,V> parent;		//父节点
boolean color;			//节点的颜色




2.TreeMap类中中要知道的一些成员变量
public class TreeMap<K,V>{
   
    //比较器对象
    private final Comparator<? super K> comparator;

	//根节点
    private transient Entry<K,V> root;

	//集合的长度
    private transient int size = 0;

   

3.空参构造
	//空参构造就是没有传递比较器对象
	 public TreeMap() {
        comparator = null;
    }
	
	
	
4.带参构造
	//带参构造就是传递了比较器对象。
	public TreeMap(Comparator<? super K> comparator) {
        this.comparator = comparator;
    }
	
	
5.添加元素
	public V put(K key, V value) {
        return put(key, value, true);
    }

参数一：键
参数二：值
参数三：当键重复的时候，是否需要覆盖值
		true：覆盖
		false：不覆盖
		
	private V put(K key, V value, boolean replaceOld) {
		//获取根节点的地址值，赋值给局部变量t
        Entry<K,V> t = root;
		//判断根节点是否为null
		//如果为null，表示当前是第一次添加，会把当前要添加的元素，当做根节点
		//如果不为null，表示当前不是第一次添加，跳过这个判断继续执行下面的代码
        if (t == null) {
			//方法的底层，会创建一个Entry对象，把他当做根节点
            addEntryToEmptyMap(key, value);
			//表示此时没有覆盖任何的元素
            return null;
        }
		//表示两个元素的键比较之后的结果
        int cmp;
		//表示当前要添加节点的父节点
        Entry<K,V> parent;
		
		//表示当前的比较规则
		//如果我们是采取默认的自然排序，那么此时comparator记录的是null，cpr记录的也是null
		//如果我们是采取比较去排序方式，那么此时comparator记录的是就是比较器
        Comparator<? super K> cpr = comparator;
		//表示判断当前是否有比较器对象
		//如果传递了比较器对象，就执行if里面的代码，此时以比较器的规则为准
		//如果没有传递比较器对象，就执行else里面的代码，此时以自然排序的规则为准
        if (cpr != null) {
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else {
                    V oldValue = t.value;
                    if (replaceOld || oldValue == null) {
                        t.value = value;
                    }
                    return oldValue;
                }
            } while (t != null);
        } else {
			//把键进行强转，强转成Comparable类型的
			//要求：键必须要实现Comparable接口，如果没有实现这个接口
			//此时在强转的时候，就会报错。
            Comparable<? super K> k = (Comparable<? super K>) key;
            do {
				//把根节点当做当前节点的父节点
                parent = t;
				//调用compareTo方法，比较根节点和当前要添加节点的大小关系
                cmp = k.compareTo(t.key);
				
                if (cmp < 0)
					//如果比较的结果为负数
					//那么继续到根节点的左边去找
                    t = t.left;
                else if (cmp > 0)
					//如果比较的结果为正数
					//那么继续到根节点的右边去找
                    t = t.right;
                else {
					//如果比较的结果为0，会覆盖
                    V oldValue = t.value;
                    if (replaceOld || oldValue == null) {
                        t.value = value;
                    }
                    return oldValue;
                }
            } while (t != null);
        }
		//就会把当前节点按照指定的规则进行添加
        addEntry(key, value, parent, cmp < 0);
        return null;
    }	
	
	
	
	 private void addEntry(K key, V value, Entry<K, V> parent, boolean addToLeft) {
        Entry<K,V> e = new Entry<>(key, value, parent);
        if (addToLeft)
            parent.left = e;
        else
            parent.right = e;
		//添加完毕之后，需要按照红黑树的规则进行调整
        fixAfterInsertion(e);
        size++;
        modCount++;
    }
	
	
	
	private void fixAfterInsertion(Entry<K,V> x) {
		//因为红黑树的节点默认就是红色的
        x.color = RED;

		//按照红黑规则进行调整
		
		//parentOf:获取x的父节点
		//parentOf(parentOf(x)):获取x的爷爷节点
		//leftOf:获取左子节点
        while (x != null && x != root && x.parent.color == RED) {
			
			
			//判断当前节点的父节点是爷爷节点的左子节点还是右子节点
			//目的：为了获取当前节点的叔叔节点
            if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
				//表示当前节点的父节点是爷爷节点的左子节点
				//那么下面就可以用rightOf获取到当前节点的叔叔节点
                Entry<K,V> y = rightOf(parentOf(parentOf(x)));
                if (colorOf(y) == RED) {
					//叔叔节点为红色的处理方案
					
					//把父节点设置为黑色
                    setColor(parentOf(x), BLACK);
					//把叔叔节点设置为黑色
                    setColor(y, BLACK);
					//把爷爷节点设置为红色
                    setColor(parentOf(parentOf(x)), RED);
					
					//把爷爷节点设置为当前节点
                    x = parentOf(parentOf(x));
                } else {
					
					//叔叔节点为黑色的处理方案
					
					
					//表示判断当前节点是否为父节点的右子节点
                    if (x == rightOf(parentOf(x))) {
						
						//表示当前节点是父节点的右子节点
                        x = parentOf(x);
						//左旋
                        rotateLeft(x);
                    }
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateRight(parentOf(parentOf(x)));
                }
            } else {
				//表示当前节点的父节点是爷爷节点的右子节点
				//那么下面就可以用leftOf获取到当前节点的叔叔节点
                Entry<K,V> y = leftOf(parentOf(parentOf(x)));
                if (colorOf(y) == RED) {
                    setColor(parentOf(x), BLACK);
                    setColor(y, BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    x = parentOf(parentOf(x));
                } else {
                    if (x == leftOf(parentOf(x))) {
                        x = parentOf(x);
                        rotateRight(x);
                    }
                    setColor(parentOf(x), BLACK);
                    setColor(parentOf(parentOf(x)), RED);
                    rotateLeft(parentOf(parentOf(x)));
                }
            }
        }
		
		//把根节点设置为黑色
        root.color = BLACK;
    }
	
	
	
	
	
	
	
6.课堂思考问题：
6.1TreeMap添加元素的时候，键是否需要重写hashCode和equals方法？
此时是不需要重写的。


6.2HashMap是哈希表结构的，JDK8开始由数组，链表，红黑树组成的。
既然有红黑树，HashMap的键是否需要实现Compareable接口或者传递比较器对象呢？
不需要的。
因为在HashMap的底层，默认是利用哈希值的大小关系来创建红黑树的




6.3TreeMap和HashMap谁的效率更高？
如果是最坏情况，添加了8个元素，这8个元素形成了链表，此时TreeMap的效率要更高
但是这种情况出现的几率非常的少。
一般而言，还是HashMap的效率要更高。



6.4你觉得在Map集合中，java会提供一个如果键重复了，不会覆盖的put方法呢？
此时putIfAbsent本身不重要。
传递一个思想：
	代码中的逻辑都有两面性，如果我们只知道了其中的A面，而且代码中还发现了有变量可以控制两面性的发生。
	那么该逻辑一定会有B面。
	
	习惯：
		boolean类型的变量控制，一般只有AB两面，因为boolean只有两个值
		int类型的变量控制，一般至少有三面，因为int可以取多个值。
		



6.5三种双列集合，以后如何选择？
	HashMap LinkedHashMap TreeMap
	
	默认：HashMap（效率最高）
	如果要保证存取有序：LinkedHashMap
	如果要进行排序：TreeMap
```



#### 不可变集合

不可变集合: 不可以被修改的集合

**创建不可变集合的应用场景**

- 如果某个数据不能被修改，把它防御性地拷贝到不可变集合中是个很好的实践。
- 当集合对象被不可信的库调用时，不可变形式是安全的。

简单理解: 不想让别人修改集合中的内容

**创建不可变集合的书写格式**

在List、Set、Map接口中，都存在静态的of方法，可以获取一个不可变的集合。

`static <E> List<E> of(E...elements)`	创建一个具有指定元素的List集合对象

`static <E> Set<E> of(E...elements)`	创建一个具有指定元素的Set集合对象

`static <K , V> Map<K,V>of(E...elements)`	创建一个具有指定元素的Map集合对象

注意: 这个集合不能添加，不能删除，不能修改。

如：

```java
// 创建不可变集合
Listc<String> list = List.of("张三"，"李四","王五"，"赵六");
或
// 当我们要获取一个不可变的Set集合时,里面的参数一定要保证唯一性
Set<String> set = Set.of("张三"，"李四"，"王五"，"赵六");
或
// 键是不能重复的
// Map里面的of方法,参数是有上限的 最多只能传递20个参数,10个健值对
// 如果我们要传递多个键值对对象,数量大于10个。在Map接口中还有一个方法
Map<String,String> map = Map.of(k1:"111",k2:"222");

// 获取到所有的键值对对象（Entry对象)
Set<Map.Entry<string,string>> entries = hm.entrySet();
// 把entries变成一个数组
Map.Entry[] arr1 = new Map.Entry[0];
// toArray方法在底层会比较集合的长度跟数组的长度两者的大小
// 如果集合的长度 > 数组的长度: 数据在数组中放不下，此时会根据实际数据的个数，重新创建数组
// 如果集合的长度 <= 数组的长度: 数据在数组中放的下，此时不会创建新的数组，而是直接用
Map.Entry[] arr2 = entries.toArray(arr1);
// 不可变的map集合
Map map = Map.ofEntries(arr2);

// jdk10之后的方法，创建map的不可变集合
Map<String, String> map = Map.copyOf(hm);
```

**总结**

1. 不可变集合的特点?

   - 定义完成后不可以修改，或者添加、删除

2. 如何创建不可变集合?

   - List、Set、Map接口中，都存在of方法可以创建不可变集合

3. 三种方式的细节

   List: 直接用

   Set: 元素不能重复

   Map: 元素不能重复、键值对数量最多是10个。

   超过10个用ofEntries方法



## Stream流的作用
结合了Lambda表达式，简化集合、数组的操作

Stream流的使用步骤:

- 先得到一条Stream流（流水线)，并把数据放上去

- 利用Stream流中的API进行各种操作

过滤 转换	中间方法	方法调用完毕之后，还可以调用其他方法
统计 打印	终结方法	最后一步，调用完毕之后，不能调用其他方法

**使用步骤**

- 先得到一条Stream流（流水线)，并把数据放上去
- 使用中间方法对流水线上的数据进行操作
- 使用终结方法对流水线上的数据进行操作

### 获取stream流的方法

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/stream1.png)

#### 单列集合获取stream流

```java
// 1.单列集合获取Stream流
Arraylist<String> list = new ArrayList<>();
Collections.addAlL(1ist,"a","b,"c","d" ,"e"); 
// 获取到一条流水线,并把集合中的数据放到流水线上
stream<String> stream1 = list.stream();
list.stream().forEach(s -> System.out.println(s));
```

#### 双列集合获取stream流

```java
// 1.创建双列集合
HashMap<String, Integer> hm = new HashMap<>();
// 2.添加数据
hm.put("aaa",111);
hm.put("bbb",222);
hm.put("ccc",333);
hm.put(""ddd",444);
// 3.第一种获取stream流
hm.keySet().stream( ).forEach(s -> System.out.println(s));
// 4.第二种获取stream流
hm.entrySet().stream().forEach(s-> System.out.println(s));

```

#### 数组获取stream流

```java
// 1.创建数组
int[] arr1 = {1,2,3,4,5,6,7,8,9,10};
String[] arr2 = ["a","b","c"];
// 2.获取stream流
Arrays.stream(arr1).forEach(s-> System.out.println(s));

Arrays.stream(arr2).forEach(s-> System.out. println(s));

```

#### 一堆零散数据获取stream流

```java
Stream.of(1,2,3,4,5).forEach(s-> System.out.println(s));
Stream.of("a","b","c","d","e").forEach(s-> System.out.print1n(s));
```



### stream流的中间方法

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/stream2.png)

注意1: 中间方法，返回新的Stream流，原来的Stream流只能使用一次，建议使用链式编程

注意2: 修改Stream流中的数据，不会影响原来集合或者数组中的数据

#### filter

```java
// filter过滤把张开头的留下,其余数据过滤不要
list.stream().filter(new Predicatec<String>(){
	@Override
	public boolean test(String s) {
	// 如果返回值为true.表示当前数据留下
	// 如果返回值为false.表示当前数据含弃不要
    return s.startswith("张");
}).forEach(s -> System.out.println(s));

// lambda表达式简化匿名内部类
list.stream().filter(s -> s.startswith(""张"")).forEach(s -> System.out.println(s));

```

#### limit

```java
// 获取前几个元素，limit中传递的是个数
list.stream().limit(3).forEach(s -> System.out.print1n(s));
```

#### skip

```java
// 跳过前几个元素，skip中传递的是个数
list.stream().skip(4).forEach(s -> System.out.println(s));
```

#### distinct

```java
// 去重
list1.stream().distinct().forEach(s -> System.out.println(s));
```

#### concat

```java
// 合并两个流
stream.concat(list1.stream(),list2.stream()).forEach(s -> System.out.println(s));
```

#### map

```java
// 第一个类型: 流中原本的数据类型
//第二个类型: 要转成之后的类型
// apply的形参s: 依次表示流里面的每一个数据
// 返回值: 表示转换之后的数据
// 当map方法执行完毕之后,流上的数据就变成了整数
//所以在下面forEach当中.s依次表示流里面的每一个数据，这个数据现在就是整数了
list.stream().map(new Function<string,Integer>() {
	@Override
	public Integer apply(String s) {
		String[] arr = s.split("-");
        String ageString = arr[1];
		int age = Integer.parseInt(agestring);
        return age;
    }
}).forEach(s-> System.out.println(s));


// lambda表达式形式
list.stream().map(s-> Integer.parseInt(s.split("-")[1])).forEach(s-> System.out.printin(s));

```



### Stream流的终结方法

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/stream3.png)

#### foreach

```java
// void forEach(Consumer action) 遍历
// consumer的泛型: 表示流中数据的类型
// accept方法的形参s: 依次表示流里面的每一个数据
// 方法体: 对每一个数据的处理操作（打印)
list.stream( ).forEach(new Consumer<String>() {
	@Override
	public void accept(String s) {
		System.out.println(s);
    }
});

// lambda表达式书写
list.stream( ).forEach(s -> System.out.println(s));
```

#### count 和 toArray

```java
// long count() 统计
long count = list.stream().count();
System.out.println(count);

// toArray() 收集流中的数据,放到数组中
Object[] arr1 = list.stream().toArray();
System.out.println(Arrays.toString(arr1));

// IntFunction的泛型: 具体类型的数组
// apply的形参: 流中数据的个数，要跟数组的长度保持一致
// apply的返回值: 具体类型的数组
// 方法体: 就是创建数组
// toArray方法的参数的作用: 负责创建一个指定类型的数组
// toArray方法的底层，会依次得到流里面的每一个数据，并把数据放到数组当中
// toAray方法的返回值:是一个装着流里面所有数据的数组
string[] arr = list.stream().toArray(new IntFunction<String[]>() {
	@Override
	public String[] apply(int value) {
		return new string[value];
	}
});
System.out.println(Arrays.tostring( arr));

// lambda 表达式
String[] arr2 = list.stream().toArray(value -> new String[value]);
```

#### collect 

注意点:

**如果我们要收集到Map集合当中，键不能重复，否则会报错**

```java
//收集List集合当中
//需求:
// 我要把所有的男性收集起来
List<string> newList = list.stream().filter(s ->"男".equals(s.split("-")[1])).collect(Collectors.toList());
```

```java
//收集Set集合当中
//需求:
//我要把所有的男性收集起来
Set<String> newList2 = list.stream().filter(s ->"男".equals(s.split("-")[1]))
.collect(Collectors.toSet());
```

```java
// 收集Map集合当中
// 谁作为键,谁作为值.
// 我要把所有的男性收集起来
// 键: 姓名。值: 年龄
// 张无忌-男-15
list.stream().filter(s ->"男".equals(s.split("-")[1])).collect(Collectors.toMap(键的规则,值的规则));

toMap : 
	参数一表示键的生成规则
	参数二表示值的生成规则
参数一:
	Function泛型一: 表示流中每一个数据的类型
			泛型二: 表示Map集合中键的数据类型
	方法apply形参: 依次表示流里面的每一个数据
			方法体: 生成键的代码
			返回值: 已经生成的键

参数二:
	Function泛型一: 表示流中每一个数据的类型
			泛型二: 表示Map集合中值的数据类型
	方法apply形参: 依次表示流里面的每一个数据
			方法体: 生成值的代码
			返回值: 已经生成的值

                
list.stream().filter(s ->"男".equals(s.split("-")[1])).collect(Collectors.toMap( new Function<String，string>() {
	@Override
	public String apply(String s) {
		//张无忌-男-15
		return s.split("-")[0];
	}
},
new Function<String，Integer>() {
	@Override
	public Integer apply(String s) {
		return Integer.parseInt(s.split("-")[2]);
	}
}));


// lambda 表达式
Map<String,Integer> map2 = list.stream().filter(s ->“男".equals(s.split("-")[1])).collect(Collectors.toMap( 
s -> s.split( regex: "-")[0],
s -> Integer.parseInt(s.split( regex:"-")[2])));

```



### 总结

1. Stream流的作用

  结合了Lambda表达式，简化集合、数组的操作

1. Stream的使用步骤

获取Stream流对象使用中间方法处理数据使用终结方法处理数据

3. 如何获取Stream流对象

  单列集合: Collection中的默认方法stream

  双列集合: 不能直接获取

  数组:  Arrays工具类型中的静态方法stream

  一堆零散的数据: Stream接口中的静态方法of

1. 常见方法
中间方法:    filter,limit,skip, distinct,concat,map
终结方法:    forEach, count,collect



## 方法引用

把已经有的方法拿过来用，当做函数式接口中抽象方法的方法体

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/ffyy1.png)

```java
//匿名内部类
Arrays.sort(arr, new Comparator<Integer>() {
	@Override
	public int compare( Integer o1，Integer o2) {
		return o2 - o1;
	}
});

// lambda表达式
// 因为第二个参数的类型Comparator是一个函数式接口
Arrays.sort(arr,(Integer o1， Integer o2)->{i
	return o2 - o1;
});

// lambda表达式简化格式
Arrays.sort(arr,(o1，o2)->o2 - o1 );

//方法引用
//1.引用处需要是函数式接口
//2.被引用的方法需要已经存在
//3.被引用方法的形参和返回值需要跟抽象方法的形参和返回值保持一致
//4.被引用方法的功能需要满足当前的要求
//表示引用FunctionDemo1类里面的subtraction方法
//把这个方法当做抽象方法的方法体
// FunctionDemo1是类名
Arrays.sort(arr,FunctionDemo1 : : subtraction) ;



// 写好的方法
public int subtraction(int n1， int n2) {
	return n2 - n1;
}
```

**总结**

1. 什么是方法引用?

   把已经存在的方法拿过来用，当做函数式接口中抽象方法的方法体

2. ::是什么符号?

   方法引用符

3. 方法引用时要注意什么?

   需要有函数式接口

   被引用方法必须已经存在

   被引用方法的形参和返回值需要跟抽象方法保持一致

   被引用方法的功能要满足当前的需求

### 方法引用的分类
1. 引用静态方法

2. 引用成员方法

   引用其他类的成员方法

   引用本类的成员方法

   引用父类的成员方法

3. 引用构造方法

4. 其他调用方式

   使用类名引用成员方法

   引用数组的构造方法

#### 引用静态方法
```java
格式: 类名::静态方法
范例: Integer::parseInt
```

如：

```java
// 把他们都变成int类型
list.stream().map(new Function<string，Integer>() {
	@Override
	public Integer apply(String s) {
		int i = Integer.parseInt(s);
        return i;
    }
}).forEach(s -> System.out.println(s));


// 方法引用,引用Integer类的静态方法parseInt
list.stream().map( Integer::parseInt).forEach(s-> System.out.println(s));

```

#### 引用成员方法
```java
格式: 对象::成员方法
其他类: 其他类对象:方法名
本类: this::方法名
父类: super::方法名
```

如：

```java
Stringoperation so = new Stringoperation();
list.stream().filter(so::stringJudge).forEach(s-> System.out.println(s));


//静态方法中是没有this的,直接new一个对象
list.stream().filter(new FunctionDemo3()::stringJudge).forEach(s-> System.out.println(s));


// 写好的方法
public boolean stringudge(String s){
	return s.startswith("张")&& s.length() == 3;
}
```

### 引用构造方法
```java
格式: 类名::new
范例: student::new
```

如：

```java
List<Student> newList2 = list.stream().map(Student::new).collect(Collectors.toList());
```

#### 使用类名引用成员方法
```java
格式: 类名::成员方法
范例: string::substring
```

```java
方法引用的规则:
1.需要有函数式接口
2.被引用的方法必须已经存在
3.被引用方法的形参，需要跟抽象方法的第二个形参到最后一个形参保持一致，返回值需要保持一致。
4.被引用方法的功能需要满足当前的需求
    
抽象方法形参的详解:
第一个参数: 
表示被引用方法的调用者，决定了可以引用哪些类中的方法
在Stream流当中，第一个参数一般都表示流里面的每一个数据。
假设流里面的数据是字符串，那么使用这种方式进行方法引用，只能引用string这个类中的方法
    
第二个参数到最后一个参数: 跟被引用方法的形参保持一致，如果没有第二个参数，说明被引用的方法需要是无参的成员方法

局限性:
不能引用所有类中的成员方法。
是跟抽象方法的第一个参数有关，这个参数是什么类型的，那么就只能引用这个类中的方法。

```

#### 引用数组的构造方法
```java
格式: 数据类型[]::new
范例: int[ ]::new
```

如：

```java
Integer[] arr2 = list.stream().toArray(Integer[]::new);
```



#### 总结

```java
1．什么是方法引用?
	把已经存在的方法拿过来用，当做函数式接口中抽象方法的方法体
2.∶:是什么符号?
	方法引用符
3．方法引用时要注意什么?
	需要有函数式接口
	被引用方法必须已经存在
	被引用方法的形参和返回值需要跟抽象方法保持一致
    被引用方法的功能要满足当前的需求


1．引用静态方法
	类名::静态方法
2.引用成员方法
	对象::成员方法
	this::成员方法
	super::成员方法
3．引用构造方法
	类名:: new
4．使用类名引用成员方法
	类名::成员方法
    不能引用所有类中的成员方法
	如果抽象方法的第一个参数是A类型的只能引用A类中的方法
5．引用数组的构造方法
	数据类型[]::new
```



## 异常

### 异常的分类

异常: 异常就是代表程序出现的问题

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/yc1.png)

```java
Java.lang.Throwable包含：Error、Exception
    
Error: 代表的系统级别错误(属于严重问题)
系统一旦出现问题，sun公司会把这些错误封装成Error对象。Error是给sun公司自己用的，不是给我们程序员用的。因此我们开发人员不用管它。
    
Exception: 叫做异常，代表程序可能出现的问题。
我们通常会用Exception以及他的子类来封装程序出现的问题。
```

```java
Exception包含：RuntimeException和除了RuntimeException的所有其他异常（编译时异常）

RuntimeException及其子类：运行时异常，编译阶段不会出现异常提醒。运行时出现的异常（如:数组索引越界异常)

编译时异常: 编译阶段就会出现异常提醒的。（如:日期解析异常)
```

#### 总结

1. 异常是什么?

   程序中可能出现的问题

2. 异常体系的最上层父类是谁? 异常分为几类?
   父类: Exception。
   异常分为两类:编译时异常、运行时异常

3. 编译时异常和运行时异常的区别 ?

   - 编译时异常: 没有继承 RuntimeExcpetion 的异常，直接继承于Excpetion。

     编译阶段就会错误提示

   - 运行时异常: RuntimeException 本身和子类。

     编译阶段没有错误提示，运行时出现的

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/yc2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/yc3.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/yc4.png)

### 编译时异常和运行时异常

**总结**

运行时异常和编译时异常的区别?

- 编译时异常: 除了RuntimeExcpetion和他的子类，其他都是编译时异常。

  编译阶段需要进行处理，作用在于提醒程序员。

- 运行时异常: RuntimeException本身和所有子类，都是运行时异常。

  编译阶段不报错，是程序运行时出现的。

  —般是由于参数传递错误带来的问题

### 异常的作用

- 作用一: 异常是用来查询bug的关键参考信息
- 作用二︰异常可以作为方法内部的一种特殊返回值，以便通知调用者底层的执行情况

### 异常的处理方式
- JVM默认的处理方式

  - 把异常的名称，异常原因及异常出现的位置等信息输出在了控制台
  - 程序停止执行，下面的代码不会再执行了

- 自己处理

  格式:

  ```java
  try {
  	可能出现异常的代码;
  } catch (异常类名 变量名) {
  	异常的处理代码;
  }
  
  
  如：
  try{
  	// 可能出现异常的代码;
  	System.out. print1n(arr[10]);
  } catch(ArrayIndexoutOfBoundsException e){
  	// 如果出现了ArrayIndexoutOfBoundsException异常，我该如何处理
      System.out.print1n("索引越界了");
  )
  ```

  目的: 当代码出现异常时，可以让程序继续往下执行。

- 抛出异常

#### 如果try中没有遇到问题，怎么执行?

- 会把 try 里面所有的代码全部执行完毕，不会执行 catch 里面的代码

- 注意:
  - 只有当出现了异常才会执行 catch 里面的代码

#### 如果try中可能会遇到多个问题，怎么执行?

- 会写多个catch与之对应

- 细节:

  - 如果我们要捕获多个异常，这些异常中如果存在父子关系的话，那么父类一定要写在下面

- 了解性:

  - 在DK7之后，我们可以在catch中同时捕获多个异常，中间用 `| ` 进行隔开表示如果出现了A异常或者B异常的话，采取同一种处理方案

    ```java
    catch(ArrayIndexOutOfBoundsException | ArithmeticException e){}
    ```

如：

```java
int[] arr = {1，2，3，4，5，6};

try{
	System.out.println(arr[10]); // ArrayIndexoutOfBoundsException
    
    System.out.print1n(2/0); // ArithmeticException
    
	String s = null;
	System.out.print1n(s.equals("abc") );
} catch(ArrayIndexOutOfBoundsException e) {
	System.out.print1n("索引越界了");
} catch(ArithmeticException e) {
	System.out.print1n("除数不能为8");
} catch(Nu11PointerException e) {
	System.out.print1n("空指针异常");
} catch (Exception e){
	System.out.println("Exception");
}
```

#### 如果try中遇到的问题没有被捕获，怎么执行?

- 相当于 try. . .catch 的代码白写了，最终还是会交给虚拟机进行处理。

#### 如果try中遇到了问题，那么try下面的其他代码还会执行吗?

- 下面的代码就不会执行了，直接跳转到对应的catch当中，执行catch里面的语句体但是如果没有对应catch与之匹配，那么还是会交给虚拟机进行处理



![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/catch1.png)



### 异常中的常见方法

- Throwable的成员方法
  - `public string getMessage()`  返回此`throwable`的详细消息字符串
  - `public string toString()`     返回此可抛出的简短描述
  - `public void printStackTrace()`   把异常的错误信息输出在控制台
    - 在底层是利用 `System.err.println` 进行输出把异常的错误信息以红色字体输出在控制台
    - 细节:  仅仅是打印信息，不会停止程序运行

### 抛出处理
- throws

  - 注意:	写在方法定义处，表示声明一个异常
  - 告诉调用者，使用本方法可能会有哪些异常

  ```java
  public void 方法() throws 异常类名1,异常类名2...{
      ...
  }
  ```

  - 编译时异常:	必须要写。
  - 运行时异常:    可以不写。

- throw

  - 注意:	写在方法内，结束方法
  - 手动抛出异常对象，交给调用者方法中下面的代码不再执行了

  ```java
  如：
  public void 方法(){
  	throw new NullPointerException();
  }
  ```

### 总结

1. 虚拟机默认处理异常的方式

   把异常信息以红色字体打印在控制台，并结束程序

2. 捕获: `try...catch`

   一般用在调用处，能让代码继续往下运行。

3. 抛出: `throw throws`

   在方法中，出现异常了。

   方法就没有继续运行下去的意义了，采取抛出处理。

   让该方法结束运行并告诉调用者出现了问题。

### 自定义异常
1. 定义异常类
2. 写继承关系
3. 空参构造
4. 带参构造

意义:	就是为了让控制台的报错信息更加的见名之意

如：

```java
public class NameFormatException extends RuntimeException {
	//技巧:
	// NameFormat:当前异常的名字，表示姓名格式化问题
    // Exception:表示当前类是一个异常类
	//运行时: RuntimeException核心就表示由于参数错误而导致的问题
    //编译时: Exception核心提醒程序员检查本地信息
    
    // 空参构造
	public NameFormatException() {}
	//带参构造
    public NameFormatException(String message) {
		super(message);
    }
}


// 使用
if(len < 3 |len > 10){
	throw new NameFormatException(name +"格式有误，长度应该为: 3~10");
}

```



## File

- 相对路径

  `路径1: "a.txt  路径2: "abclla.txt""`

- 绝对踣轻

  `路径1: "C:\\a.txt"   路径2:"C:\\abc\\a.txt"`



### File 的概述 和 构造方法

- File对象就表示一个路径，可以是文件的路径、也可以是文件夹的路径
- 这个路径可以是存在的，也允许是不存在的

#### 方法名称

- `public File(String pathname)`   根据文件路径创建文件对象
- `public File(String parent,String child)`     根据父路径名字符串和子路径名字符串创建文件对象
- `public File(File parent,String child)`     根据父路径对应文件对象和子路径名字符串创建文件对象

如：

```java
// 1.根据字符串表示的路径，变成File对象
String str = "C:\\Users\\alienware\\Desktop\\a.txt";
File f1 = new File(str);
System.out.println(f1);  // C: \Users\alienware\Desktopla.txt

// 2.父级路径: C: \Users \alienware\Desktop
// 子级路径: a.txt
String parent = "C: \\Users\\alienware\\Desktop";
String child = "a.txt";
File f2 = new File(parent,child);
System.out.println(f2);    //C:\Users\alienware\Desktop\\a.txt


File f3 = new File(parent + "\\" + child);
System.out.print1n(f3);   //C:\Users\alienware\Desktop\a.txt

//3.把一个File表示的路径和IString表示路径进行拼接
File parent2 = new File("C: \\Users\\alienware\\Desktop");
String child2 = "a.txt";
File f4 = new File(parent2,child2);
System.out.print1n(f4);  //C: Users\alienware \DesktopMa.txt
```

#### 总结

1. File表示什么?

  File对象表示路径，可以是文件、也可以是文件夹。

  这个路径可以是存在的，也可以是不存在的

2. 绝对路径和相对路径是什么意思?

  绝对路径是带盘符的。

  相对路径是不带盘符的，默认到当前项目下去找。

3. File三种构造方法的作用?

  - public File(String pathname)	把字符串表示的路径变成File对象
  - public File(String parent，String child)	把父级路径和子级路径进行拼接
  - public File(File parent,String child)	把父级路径和子级路径进行拼接

### File 的常见成员方法(判断、获取)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/file1.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/file2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/file3.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/file4.png)

#### 判断

- `public boolean isDirectory()`	判断此路径名表示的File是否为文件夹
- `public boolean isFile()`	判断此路径名表示的File是否为文件
- `public boolean exists()`	判断此路径名表示的File是否存在

如：

```java
// 1.对一个文件的路径进行判断
File f1 = new File("D: \\aaa\\a.txt");
System.out.println(f1.isDirectory());//false
System.out.print1n(f1.isFile()); //true
System.out.println(f1.exists()); //true

//2.对一个文件夹的路径进行判断
File f2 = new File("D: \\aaa\\bbb");
System.out.println(f2.isDirectory()); // true
System.out.print1n(f2.isFile()); // false
System.out.print1n(f2.exists()); //true

// 3.对一个不存在的路径进行判断
File f3 = new File("D: \\aaa\\bbb");
System.out.print1n(f3.isDirectory()); // truesy
System.out.print1n(f3.isFile()); //false
System.out.println(f3.exists()); //true

```

#### 获取

- `public long length()`	返回文件的大小(字节数量)
- `public String getAbsolutePath()`	返回文件的绝对路径
- `public String getPath()`	返回定义文件时使用的路径
- `public String getName()`	返回文件的名称，带后缀
- `public long lastModified()`	返回文件的最后修改时间(时间毫秒值)

如：

```java
// 1.length返回文件的大小(字节数量)
// 细节1: 这个方法只能获取文件的大小，单位是字节

// 如果单位我们要是M,G，可以不断的除以1024
// 细节2: 这个方法无法获取文件夹的大小
// 如果我们要获取一个文件夹的大小，需要把这个文件夹里面所有的文件大小都累加在一起。
File f1 = new File("D: \\aaa\\a.txt");
long len = f1.length();
System.out.print1n(len);// 12  返回文件的大小(字节数量)

File f2 = new File("D: \\aaa\\bbb");
long len2 = f2.length();
System.out.print1n(len2); // 0



// 2.getAbsolutePath 返回文件的绝对路径
File f3 = new File("D:\\aaa\\a.txt");
String path1 = f3.getAbsolutePath();
System.out.println(path1); // D:\\aaa\\a.txt

File f4 = new File("myFile\\a.txt");
String path2 = f4.getAbsolutePath();
System.out.println(path2); //D:\\aaa\\myFile\\a.txt


// 3.getPath 返回定义文件时使用的路径
File f5 = new File("D:\\aaa\\a.txt");
String path3 = f5.getPath();
System.out.println(path3); // D: \aaa\a.txt

File f6 = new File( pathname: "myFile\la.txt" );
String path4 = f6.getPath();
System.out.print1n(path4); // myFile\a.txt


// 4.getName获取名字
// 细节1:
// a.txt:
// a文件名
// txt后缀名、扩展名

// 细节2:
// 文件夹: 返回的就是文件夹的名字
File f7 = new File("D: \\aaa\\a.txt");
String name1 = f7.getName();
System.out.println(name1);  // a.txt:

File f8 = new File("D: \\aaa\\bbb");
String name2 = f8.getName();
System.out.print1n(name2); // bbb



// 5.lastModified 返回文件的最后修改时间(时间毫秒值)
File f9 = new File("D: \\aaa\\a.txt");
long time = f9.lastModified();
System.out.println(time); // 1667380952425
```

#### 创建

- `public boolean createNewFile()`	创建一个新的空的文件
- `public boolean mkdir()`	创建单级文件夹
- `public boolean mkdirs()`	创建多级文件夹
- `public boolean delete()`	删除文件、空文件夹

如：

```java
// 1.createNewFile 创建一个新的空的文件
// 细节1: 如果当前路径表示的文件是不存在的，则创建成功，方法返回 true

// 如果当前路径表示的文件是存在的，则创建失败，方法返回 false
// 细节2: 如果父级路径是不存在的，那么方法会有异常IOException
// 细节3: createNewFile方法创建的一定是文件，如果路径中不包含后缀名，则创建一个没有后缀的文件
File f1 = new File("D: \\aaa\\ddd" );
boolean b = f1.createNewFile();
System.out.println(b); // true

// 2.mkdir make Directory，文件夹(目录)
// 细节1: windows当中路径是唯一的，如果当前路径已经存在，则创建失败，返回 false
// 细节2: mkdir方法只能创建单级文件夹，无法创建多级文件夹。
File f2 = new File("D: \\aaa\\aaa\\bbb\\ccc");
boolean b = f2.mkdir();
System.out.println(b);


// 3.mkdirs 创建多级文件夹
// 细节: 既可以创建单级的，又可以创建多级的文件夹
File f3 = new File("D: \\aaa\\ggg");
boolean b = f3.mkdirs();
System.out.print1n(b); // true
```



#### 删除

delete方法默认只能删除文件和空文件夹，delete方法直接删除不走回收站

```java
public boolean delete() 删除文件、空文件夹
细节:
如果删除的是文件，则直接删除，不走回收站。
如果删除的是空文件夹，则直接删除，不走回收站
如果删除的是有内容的文件夹，则删除失败

// 1.创建File对象
File f1 = new File("D: \\aaalleee"); 
// 2.删除
boolean b = f1.delete();
System.out.print1n(b);

```



#### 获取并遍历
`public File[] listFiles()`	获取当前该路径下所有内容

如：

```java
// public File[] listFiles()  获取当前该路径下所有内容
// 1.创建File对象
File f = new File("D: \\aaa");
// 2.listFiles方法
// 作用: 获取aaa文件夹里面的所有内容，把所有的内容放到数组中返回
File[] files = f.listFiles();
for (File file : files) {
	// file依次表示aaa文件夹里面的每一个文件或者文件夹
    System.out.println(file);
}
```

注意：

- 当调用者File表示的路径不存在时，返回null
- 当调用者File表示的路径是文件时，返回null
- 当调用者File表示的路径是一个空文件夹时，返回一个长度为0的数组
- 当调用者File表示的路径是一个有内容的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回
- 当调用者File表示的路径是一个有隐藏文件的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回，包含隐藏文件
- 当调用者File表示的路径是需要权限才能访问的文件夹时，返回null

#### 所有获取并遍历的方法

- `public static File[] listRoots()`	列出可用的文件系统根
- `public String[] list()`	获取当前该路径下所有内容
- `public String[] list(FilenameFilter filter)`	利用文件名过滤器获取当前该路径下所有内容
- (掌握）`public File[] listFiles()`	获取当前该路径下所有内容
- `public File[listFiles(FileFilter filter)`	利用文件名过滤器获取当前该路径下所有内容
- `public File[] listFiles(FilenameFilter filter)`	用文件名过滤器获取当前该路径下所有内容

如：

```java
// 1.listRoots获取系统中所有的盘符
File[] arr = File.listRoots();
System.out.println(Arrays.tostring(arr));

// 2.list()获取当前该路径下所有内容(仅仅能获取名字)
File f1 = new File("D: \\aaa");
String[] arr2 = f1.list();
for (String s : arr2) {
	System.out.println(s);
}

// 3.list(FilenameFilter filter) 利用文件名过滤器获取当前该路径下所有内容
// 需求: 我现在要获取 D: \\aaa文件夹里面所有的txt文件
File f2 = new File("D: \\aaa");
// accept 方法的形参，依次表示aaa文件夹里面每一个文件或者文件夹的路径
// 参数一: 父级路径
// 参数二: 子级路径
// 返回值: 如果返回值为 true ，就表示当前路径保留
// 如果返回值为false, 就表示当前路径舍弃不要
String[] arr3 = f2.list(new FilenameFilter() {
	@Override
	public boolean accept(File dir,String name) {
		return true;
    }
});

System.out.println(Arrays.toString(arr3));
```



## IO流

### IO流概述

IO流: 存储和读取数据的解决方案

### IO流的分类

- 流的方向
  - 输入流（读取）
  - 输出流（写出）
- 操作文件类型
  - 字节流（所有类型的文件）
  - 字符流（纯文本文件： Windows自带的记事本打开能读懂）

#### 总结

1. 什么是IO流?

   存储和读取数据的解决方案: 

   I:   input

   O: output

   流:  像水流一样传输数据

2. IO流的作用?

   用于读写数据（本地文件，网络)

3. IO流按照流向可以分类哪两种流?

   输出流:  程序 -> 文件
   输入流:  文件 -> 程序

4. IO流按照操作文件的类型可以分类哪两种流?

   字节流:  可以操作所有类型的文件

   字符流:  只能操作纯文本文件

5. 什么是纯文本文件?

   用windows系统自带的记事本打开并且能读懂的文件txt文件，md文件，xml文件，Irc文件等



### 字节流

#### OutputStream（字节输出流）

##### FileoutputStream
操作本地文件的字节输出流，可以把程序中的数据写到本地文件中。

书写步骤:

1. 创建字节输出流对象
2. 写数据
3. 释放资源

```java
// 1.创建对象
// 写出输出流outputstream
//本地文件 File
FileOutputstream fos = new FileOutputstream("myiolla.txt");

// 2.写出数据
fos.write(97);

//3.释放资源
fos.close();
```

###### 字节输出流的细节
1. 创建字节输出流对象

   - 细节1:  参数是字符串表示的路径或者是File对象都是可以的
   - 细节2:  如果文件不存在会创建一个新的文件，但是要保证父级路径是存在的。
   - 细节3:  如果文件已经存在，则会清空文件

2. 写数据

   - 细节:  write方法的参数是整数，但是实际上写到本地文件中的是整数在ASCII上对应的字符

3. 释放资源

   每次使用完流之后都要释放资源

###### FileOutputStream写数据的3种方式
`void write(int b)`	一次写一个字节数据

`void write(byte[] b)`	一次写一个字节数组数据

`void write(byte[] b, int off, int len)`	一次写一个字节数组的部分数据

	write(byte[] b, int off, int len)
	参数一:
		数组
	参数二:
		起始索引
	参数三:
		个数
如：

```java
// 1.创建对象
FileOutputstream fos = new FileOutputstream("myio\\a.txt");

// 2.写出数据
// write(int b)
fos.write(97); // a
fos.write(98); // b

byte[] bytes = {97，98，99，100，101};
// write(byte[] b)
fos.write(bytes);  // abcde

fos.write(bytes,1,2);// b c

// 3.释放资源
fos.close();
```

###### 换行和续写

- 换行写:

  再次写出一个换行符就可以了

  windows: \r\n

  Linux:	\n

  Mac :	\r

  - 细节:

    在windows操作系统当中, java对回车换行进行了优化。虽然完整的是\r\n，但是我们写其中一个\r或者\n, java也可以实现换行，因为java在底层会补全。

  - 建议:

    不要省略，还是写全了。

```java
如：
// 1.创建对象
FileOutputstream fos = new FileOutputstream("myiolla.txt");

//2.写出数据
String str = "kankelaoyezuishuai";
byte[] bytes1 = str.getBytes();
fos.write(bytes1);

// 再次写出一个换行符就可以了
String wrap = "\r\n";
byte[] bytes2 = wrap.getBytes();
fos.write(bytes2);

String str2 = "666";
byte[] bytes3 = str2.getBytes();
fos.write(bytes3);

//3.释放资源
fos.close();
```

- 续写:

  如果想要续写，打开续写开关即可开关位置:  创建对象的第二个参数

  默认false:  表示关闭续写，此时创建对象会清空文件

  手动传递true:  表示打开续写，此时创建对象不会清空文件

```java
如：
FileOutputstream fos = new FileOutputstream("myiolla.txt",true);
```

###### 总结

1. FileoutputStream的作用

  可以把程序中的数据写到本地文件上，是字节流的基本流。

1. 书写步骤

创建对象，写出数据，释放资源

1. 三步操作的细节

创建对象: 文件存在、文件不存在、追加写入

写出数据: 写出整数、写出字节数组、换行写

释放资源: 关闭通道



#### lnputStream（字节输入流）

##### FilelnputStream

操作本地文件的字节输入流

操作本地文件的字节输入流，可以把本地文件中的数据读取到程序中来。

实现步骤:

1. 创建对象
2. 读取数据
3. 释放资源

```java
如：
// 1.创建对象
FileInputstream fis = new FileInputstream("myio\\a.txt");

// 2.读取数据
int b1 = fis.read();
System.out.print1n(b1); // 读取的是ASCII中
    
// 3.释放资源
fis.close();
```

###### 字节输入流的细节

1. 创建字节输入流对象

   细节1:  如果文件不存在，就直接报错。

2. 写数据

   细节1:  一次读一个字节，读出来的是数据在ASCII上对应的数字

   细节2:  读到文件末尾了. read方法返回-1。

3. 释放资源

   细节:  每次使用完流之后都要释放资源

###### 字节输入流循环读取

read() 方法:  表示读取数据，而且是读取一个数据就移动一次指针

```java
// 1.创建对象
FileInputStream fis = new FileInputstream("myiolla.txt");

//2.循环读取
int b;
while ((b-fis.read()) != -1) {
	System.out.print1n((char) b);
}

// 3.释放资源
fis.close();
```

```java
// 读取文件复制到其他地方

// 1.创建对象
FileInputstream fis = new FileInputstream("D:\\itheima\\movie.mp4");
Fileoutputstream fos = new Fileoutputstream("myiollcopy.mp4");
// 2.拷贝
// 核心思想:  边读边写

int b;
while((b = fis.read()) != -1){
	fos.write(b);
}

// 3.释放资源
// 规则: 先开的最后关闭
fos.close();
fis.close();
```

IO流:   如果拷贝的文件过大，那么普通循环读取速度会很慢

弊端:  一次读写一个字节

###### FilelnputStream一次读多个字节

`public int read()`	一次读一个字节数据

`public int read(byte[] buffer)`	一次读一个字节数组数据

注意:  一次读一个字节数组的数据，每次读取会尽可能把数组装满

```java
如：
// 1.创建对象
FileInputstream fis = new FileInputstream("D:\\itheima\\movie.mp4");
Fileoutputstream fos = new FileOutputstream("myiollcopy.mp4");

// 2.拷贝
int len;
byte[] bytes = new byte[1024* 1024* 5];

while(( len = fis.read(bytes)) != -1){
	fos.write(bytes,0,len);
}

// 3.释放资源
fos.close();
fis.close();
```

###### IO流中不同的版本捕获异常的方式

特点:  finally里面的代码一定被执行，除非虚拟机停止

```java
// 1.创建对象
FileInputstream fis = null;
Fileoutputstream fos = null;
try {
	fis = new FileInputstream("D:\\itheima\\b.mp4");
    fos = new Fileoutputstream( name: "myiollcopy.mp4" );
    //2.拷贝
	int len;
	byte[] bytes = new byte[1024 * 1024* 5];
    while((len = fis.read(bytes)) != -1){
		fos.write(bytes, off: 0,len);
    }
} catch (IOException e) {
	// e.printstackTrace();
} finally {
	//3.释放资源
    
	if(fos != null){
        try {
        	fos.close();
        } catch (IOException e) {
        	e.printstackTrace();
        }
    }

    if(fis != null){
		try {
        	fis.close();
        } catch (IOException e){
        	e.printstackTrace();
        }
    }
}
```

接口:  AutoCloseable
特点:  特定的情况下，可以自动释放资源

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/io2.png)



### IO 流字符集详解

字节流读取文件的时候,文件中不要有中文

计算机的存储规则

在计算机中, 任意数据都是以二进制的形式来存储的

字节： 计算机中最小的存储单元

#### 字符集

存储英文，一个字节就足以

- ASClI 	英文
- GBK（国家标准字符集）      英文 中文
- Unicode（万国码） 英文 中文

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj1.png)

- 计算机的存储规则
  1. GB2312字符集:   1980年发布，1981年5月1日实施的简体中文汉字编码国家标准。
     收录7445个图形字符，其中包括6763个简体汉字
  2. BIG5字符集:   台湾地区繁体中文标准字符集，共收录13053个中文字，1984年实施。
  3. GBK字符集:    2000年3月17日发布，收录21003个汉字。
     包含国家标准GB13000-1中的全部中日韩汉字，和BIG5编码中的所有汉字。
     windows系统默认使用的就是GBK。系统显示:  ANSI
  4. Unicode字符集:  国际标准字符集，它将世界各种语言的每个字符定义一个唯一的编码，以满足跨语言、跨平台的文本信息转换。

##### GBK

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj2.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj3.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj4.png)

- 计算机的存储规则(汉字)(GBK)
  - 规则1:  汉字两个字节存储
  - 规则2:  高位字节二进制一定以1开头，转成十进制之后是一个负数
- 计算机的存储规则(英文)(GBK)
  - 规则:  英文一个字节存储，兼容ASCII, 二进制前面补0

**核心1:  GBK中,一个英文字母一个字节，二进制第一位是0
核心2:  GBK中,一个中文汉字两个字节, 二进制第一位是1**



##### Unicode（万国码）

研发方:  统一码联盟（也叫Unicode组织)

总部位置:  美国加州

研发时间:  1990年

发布时间:  1994年发布1.0版本，期间不断添加新的文字，最新的版本是2022年9月13日发布的15.0版本。

联盟组成:  世界各地主要的电脑制造商、软件开发商、数据库开发商、政府部门、研究机构、国际机构、及个人组成

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj5.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj6.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj7.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zfj8.png)



#### 总结

1. 在计算机中，任意数据都是以二进制的形式来存储的
2. 计算机中最小的存储单元是一个字节
3. ASCII字符集中，一个英文占一个字节
4. 简体中文版Windows，默认使用GBK字符集
5. GBK字符集完全兼容ASCII字符集
   - 一个英文占一个字节，二进制第一位是0
   - 一个中文占两个字节，二进制高位字节的第一位是1
6. Unicode字符集的UTF-8编码格式
   - 一个英文占一个字节，二进制第一位是0，转成十进制是正数
   - 一个中文占三个字节，二进制第一位是1，第一个字节转成十进制是负数



#### 为什么会有乱码?
- 原因1∶读取数据时未读完整个汉字

- 原因2:  编码和解码时的方式不统一

#### 如何不产生乱码?
1. 不要用字节流读取文本文件
2. 编码解码时使用同一个码表，同一个编码方式

#### java中编码和解码

- Java中编码的方法

  `public byte[] getBytes()`	使用默认方式进行编码

  `public byte[] (String charsetName)`	使用指定方式进行编码

- Java中解码的方法

  `String(byte[] bytes)`	使用默认方式进行解码

  `String(byte[] bytes, String charsetName)`	使用指定方式进行解码

```java
// 1.编码
String str = "ai你哟";

// 字符转二进制
byte[] bytes1 = str.getBytes();
System.out.print1n(Arrays.tostring(bytes1));

// 字符转gbk编码，指定编码名称
byte[] bytes2 = str.getBytes("GBK");
System.out.println(Arrays.toString(bytes2));



// 2.解码
String str2 = new String(bytes1);
System.out.print1n(str2);
// 指定解码格式
String str3 = new String(bytes1,"GBK");
System.out.print1n(str3);
```

#### 为什么会有乱码?
原因1:  读取数据时未读完整个汉字

原因2:  编码和解码时的方式不统一



### IO 字符流
- 字符流的底层其实就是字节流

​		字符流 = 字节流 + 字符集

- 特点

​		输入流:  一次读一个字节，遇到中文时，一次读多个字节

​		输出流:  底层会把数据按照指定的编码方式进行编码，变成字节再写到文件中

- 使用场景

​		对于纯文本文件进行读写操作

#### FileReader

1. 创建字符输入流对象
   - `public FileReader(File file)`	创建字符输入流关联本地文件
   - `public FileReader(string pathname)`	创建字符输入流关联本地文件
   - 细节1∶ 如果文件不存在，就直接报错。
2. 读取数据
   - `public int read()`	读取数据，读到末尾返回-1
   - `public int read(char[] buffer)`	读取多个数据，读到末尾返回
   - 细节1:  按字节进行读取，遇到中文，一次读多个字节，读取后解码，返回一个整数
   - 细节2:  读到文件末尾了, read方法返回-1。
3. 释放资源
   - `public intl close()`	释放资源/关流

如：

```java
// 1.创建对象并关联本地文件
FileReader fr = new FileReader("myiolla.txt");

// 2.读取数据 read()
// 字符流的底层也是字节流，默认也是一个字节一个字节的读取的。
// 如果遇到中文就会一次读取多个，GBK一次读两个字节，UTF-8一次读三个字节

// read ()细节:
// 1. read():  默认也是一个字节一个字节的读取的,如果遇到中文就会一次读取多个
// 2. 在读取之后，方法的底层还会进行解码并转成十进制。
// 最终把这个十进制作为返回值
// 这个十进制的数据也表示在字符集上的数字
// 英文: 文件里面二进制数据 0110 0001
// read 方法进行读取，解码并转成十进制 97
// 中文: 文件里面的二进制数据11100110 10110001 10001001
// read 方法进行读取，解码并转成十进制 27721
// 我想看到中文汉字，就是把这些十进制数据，再进行强转就可以了
int ch;
while((ch = fr.read()) != -1){
	System.out.print((char)ch);
}

// 3.释放资源
fr.close();
```

```java
// 1.创建对象
FileReader fr = new FileReader("myiolla.txt");

// 2.读取数据
char[] chars = new char[2];
int len;

// read(chars): 读取数据，解码，强转三步合并了，把强转之后的字符放到数组当中
// 空参的read + 强转类型转换
while((len = fr.read(chars)) != -1){
	// 把数组中的数据变成字符串再进行打印
	System.out.print1n(new String( chars, 0,len));
}

// 3.释放资源
fr.close();
```

#### FileWriter构造方法
- `public Filewriter(File file)`	创建字符输出流关联本地文件
- `public Filewriter(String pathname)`	创建字符输出流关联本地文件
- `public Filewriter(File file, boolean append)`	创建字符输出流关联本地文件，续写
- `public Filewriter(String pathname, boolean append)`	创建字符输出流关联本地文件，续写

#### FileWriter成员方法
- `void write(int c)`	写出一个字符
- `void write(String str)`	写出一个字符串
- `void write(String str, int off, int len)`	写出一个字符串的一部分
- `void write(char[] cbuf)`	写出一个字符数组
- `void write(char[] cbuf, int off, int len)`	写出字符数组的一部分

#### FileWriter书写细节
1. 创建字符输出流对象
   - 细节1:  参数是字符串表示的路径或者File对象都是可以的
   - 细节2:  如果文件不存在会创建一个新的文件，但是要保证父级路径是存在的
   - 细节3:  如果文件已经存在，则会清空文件，如果不想清空可以打开续写开关
2. 写数据
   - 细节:  如果write方法的参数是整数，但是实际上写到本地文件中的是整数在字符集上对应的字符
3. 释放资源
   - 细节:  每次使用完流之后都要释放资源

如：

```java
// 创建字符输出流对象
Filewriter fw = new Filewriter("myiolla.txt");

// 写入数据为整数，则为字符集上对应的字符
fw.write(25105);
// 也可以直接传字符串
fw.write("你好威啊???");

// 也可以写入字符数组
char[] chars = { 'a', 'b' ,'c','我'}; 
fw. write(chars); //abc我

// 释放资源
fw.close();
```

#### 字符流原理解析

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/io2222.png)

##### 字符输入流的原理

- 创建字符输入流对象

  底层:  关联文件，并创建缓冲区（长度为8192的字节数组)

- 读取数据

  底层:  

  1. 判断缓冲区中是否有数据可以读取

  2. 缓冲区没有数据:  就从文件中获取数据，装到缓冲区中，每次尽可能装满缓冲区

     如果文件中也没有数据了，返回-1

  3. 缓冲区有数据:就从缓冲区中读取。

     空参的read方法:  一次读取一个字节，遇到中文一次读多个字节，把字节解码并转成十进制返回

     有参的read方法:  把读取字节，解码，强转三步合并了，强转之后的字符放到数组中

##### 字符输出流的原理

`public void flush()`	将缓冲区中的数据，刷新到本地文件中

`public void close()`	释放资源/关流

`flush刷新`:  	刷新之后,还可以继续往文件中写出数据

`close关流`:   断开通道，无法再往文件中写出数据

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/io3333.png)



### 字节缓冲流

原理:  底层自带了长度为8192的缓冲区提高性能

#### 字节缓冲输入流

##### BufferedInputStream

- `public BufferedInputStream(InputStream is)`	把基本流包装成高级流，提高读取数据的性能

#### 字节缓冲输出流

##### BufferedOutputStream

- `public BufferedOutputStream(OutputStream os)`	把基本流包装成高级流
  ，提高写出数据的性能

如：

```java
// 1.创建缓冲流的对象
BufferedInputStream bis = new BufferedInputStream(new FileInputStream( "myiolla.txt"));
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream( "myiollcopy.txt"));

// 2.循环读取并写到目的地
int b;
while ((b = bis.read()) != -1) {
	bos.write(b);
}

// 3.释放资源
bos.close();
bis.close();
```

```java
// 1.创建缓冲流的对象
BufferedInputStream bis = new BufferedInputStream(new FileInputStream( "myio\la.txt"));
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream( ."myiolcopy2.txt"));

// 2.拷贝(一次读写多个字节)
byte[] bytes = new byte[ 1024];

int len;
while((len = bis.read(bytes)) != -1){
	bos.write(bytes,0,len);
}
// 3.释放资源
bos.close();
bis.close();
```

#### 字节缓冲流提高效率的原理

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zjhcl1.png)

### 字符缓冲流

原理: 底层自带了长度为8192的缓冲区提高性能

#### 字符缓冲输入流

##### BufferedReader

- `public BufferedReader(Reader r)`	把基本流变成高级流

**字符缓冲输入流特有方法**

`public string readLine()`	读取一行数据，如果没有数据可读了，会返回null

#### 字符缓冲输出流

##### BufferedWriter

- `public BufferedWriter(Writer r)`	把基本流变成高级流

**字符缓冲输出流特有方法**

`public void newLine()`	跨平台的换行



如：

```java
// 1.创建字符缓冲输入流的对象
BufferedReader br = new BufferedReader(new FileReader("myiolla.txt"));

// 2.读取数据
// 细节：
// readLine方法在读取的时候，一次读一整行，遇到回车换行结束
// 但是他不会把回车换行读到内存当中
String line = br.readLine();
System.out.println(line);

// 3.释放资源
br.close();
```

```java
// 1.创建字符缓冲输出流的对象
Bufferedwriter bw = new Bufferedwriter(new Filewriter("b.txt"));

// 2.写出数据
bw.write("你嘴角上扬的样子，百度搜索不到");
bw.newLine();
bw.write("以后如果我结婚了，你一定要来哦，没有新娘我会很尴尬");
bw.newLine();

// 3.释放资源
bw.close();
```

### 缓冲流的总结

1. 缓冲流有几种?
   - 字节缓冲输入流:  BufferedlnputStream
   - 字节缓冲输出流:  BufferedOutputStream
   - 字符缓冲输入流:  BufferedReader
   - 字符缓冲输出流:  BufferedWriter
2. 缓冲流为什么能提高性能
   - 缓冲流自带长度为8192的缓冲区
   - 可以显著提高字节流的读写性能
   - 对于字符流提升不明显，对于字符缓冲流而言关键点是两个特有的方法
3. 字符缓冲流两个特有的方法是什么?
   - 字符缓冲输入流BufferedReader:  readLine()
   - 字符缓冲输出流BufferedWriter:  newLine()

### 转换流
是字符流和字节流之间的桥梁

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/zhl1.png)

#### 创建转换流

如：

```java
// 第一种方式创建转换流
利用转换流按照指定字符编码读取(了解)
因为JDK11:  这种方式被淘汰了。替代方案(掌握)

// 1.创建对象并指定字符编码
InputStreamReader isr = new InputStreamReader(new FileInputStream("myiolLgbkfile.txt"),"GBK");

// 2.读取数据
int ch;
while ((ch = isr.read()) != -1){
	System.out.print( (char)ch);
}

// 3.释放资源
isr.close();
```

```java
// 第二种方式创建转换流

FileReader fr = new FileReader("myiolIgbkfile.txt" ,Charset.forName("GBK"));

// 2.读取数据
int ch;
while ((ch = fr.read()) != -1){
    System.out.print( (char)ch);
}

// 3.释放资源
fr.close();
```



#### 利用转换流按照指定字符编码写出

```java
// 1.创建转换流的对象
outputStreamMniter osw = new OutputStreamw/riter(new FileOutputStream("myiol|b.txt" ),"GBK");

// 2.写出数搁
osw.write("你好你好");

// 3.释放资源
osw.close();
```

```java
Filewriter fw = new Filewriter("myiollc.txt",Charset.forName("GBK"));
fw.write("你好你好");
fw.close();
```

#### 将本地文件中的GBK文件，转成UTF-8

```java
// 1.JDK11以前的方案
InputStreamReader isr = new InputStreamReader(new FileInputStream( "myiolb.txt" ), "GBK");

OutputStreamMriter osw = new OutputStreamwriter(new FileOutputStream("myio\\d.txt" ),"UTF-8");

int b;
while((b = isr.read()) != -1){
	osw.write(b);
}

osw.close();
isr.close();
```

```java
// 2.替代方案
FileReader fr = new FileReader("myio\lb.txt"，Charset.forName(" GBK"));
Filewriter fw = new Filewriter("myiolle.txt " , Charset.forName ( "UTF-8"));

int b;
while ((b = fr.read()) != -1){
    fw.write(b)
};
                              
fw.close();
fr.close();
```

#### 利用字节流读取文件中的数据，每次读一整行，而且不能出现乱码

```java
// 1.字节流在读取中文的时候，是会出现乱码的，但是字符流可以搞定
// 2.字节流里面是没有读一整行的方法的，只有字符缓冲流才能搞定

FileInputstream fis = new FileInputstream("myio\\a.txt");
InputStreamReader isr = new InputstreamReader(fis);

BufferedReader br = new BufferedReader(isr);

String str = br.readLine();
System.out.print1n(str);
br.close();


// 简写
BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream( "myiolla.txt")));
String line;
while ((line = br.readLine()) != null){
    System.out.println(line);
}
br.close();
```

#### 总结

1. 转换流的名字是什么?
   - 字符转换输入流:  InputStreamReader
   - 字符转换输出流:  OutputStreamWriter
2. 转换流的作用是什么?
   - 指定字符集读写数据(JDK11之后已淘汰)
   - 字节流想要使用字符流中的方法了

### 序列化流

#### ObjectOutputStream（序列化流）

可以把Java中的对象写到本地文件中

构造方法：`public ObjectOutputStream(OutputStream out)`	把基本流包装成高级流

成员方法： `public final void writeObject(Object obj)`	把对象序列化（写出）到文件中去

**序列化流的小细节**

使用对象输出流将对象保存到文件时会出现`NotSerializableException`异常

解决方案:  需要让Javabean类实现`Serializable`接口

```java
public class student implements serializable {}
```

`serializable` 接口里面是没有抽象方法，标记型接口

一旦实现了这个接口，那么就表示当前的Student类可以被序列化

如：

```java
// 1.创建对象
Student stu = new Student("zhangsan",23);
// 2.创建序列化流的对象/对象操作输出流
ObjectoutputStream oos = new objectoutputstream(new FileOutputStream("myiolla.txt"));
// 3.写出数据
oos.writeobject(stu) ;

// 4.释放资源
oos.close();
```

#### ObjectInputStream（反序列化流）

反序列化流 / 对象操作输入流

可以把序列化到本地文件中的对象，读取到程序中来

`public ObjectInputStream(InputStream out)`	把基本流变成高级流

`public Object readObject()`	把序列化到本地文件中的对象,读取到程序中来

```java
// 1.创建反序列化流的对象
ObjectInputStream ois = new 0bjectInputStream(new FileInputStream("myiolla.txt"));

// 2.读取数据
Object o = ois.readobject();

// 3.打印对象
System.out.println(o);

// 4.释放资源
ois.close();
```

#### 反序列化的细节

如果读取报错的原因:  文件中的版本号,跟Javabean的版本号不匹配

此时要固定版本号：

```java
public class Student implements Serializable {
	private static final long 版本号 = 1L; // 因为是long类型，所以要加个L
    private String name;
	private int age;
	private String address;
}

或者
    
public class Student implements Serializable {
	@Serial
	private static final long serialVersionuID = -6357601841666449654L;
    private String name;
	private int age;
	private String address;
}
```

transient:  瞬态关键字
作用:  不会把当前属性序列化到本地文件当中

如：

```java
private transient String address;
```

#### 序列化流/反序列化流的细节汇总
1. 使用序列化流将对象写到文件时，需要让Javabean类实现Serializable接口。
   否则，会出现NotSerializableException异常

2. 序列化流写到文件中的数据是不能修改的，一旦修改就无法再次读回来了

3. 序列化对象后，修改了Javabean类，再次反序列化，会不会有问题?会出问题，会抛出InvalidclassException异常

   解决方案:  给Javabean类添加serialversionuID（序列号、版本号)

4. 如果一个对象中的某个成员变量的值不想被序列化，又该如何实现呢?

   解决方案:  给该成员变量加 transient 关键字修饰，该关键字标记的成员变量不参与序列化过程



### 打印流

#### 字节打印流

- 分类:  打印流一般是指:  `PrintStream`, `PrintWriter`两个类

- 特点1:  打印流只操作文件目的地，不操作数据源

- 特点2:  特有的写出方法可以实现，数据原样写出

  例如:  打印:  97

  文件中:  97

  打印:  true

  文件中:  true

- 特点3:  特有的写出方法，可以实现自动刷新，自动换行

  打印一次数据 = 写出＋换行＋刷新

##### 构造方法

- `public PrintStream(OutputStream/File/String)`	关联字节输出流 / 文件 / 文件路径
- `public PrintStream(String fileName,Charset charset)`	指定字符编码
- `public PrintStream(OutputStream out,boolean autoFlush)`	自动刷新
- `public PrintStream(OutputStream out, boolean autoFlush, String encoding)`	指定字符编码且自动刷新

字节流底层没有缓冲区，开不开自动刷新都一样

##### 成员方法

- `public void write(int b)`	常规方法:  规则跟之前一样，将指定的字节写出
- `public void print1n(XxX xx)`	特有方法:  打印任意数据  自动刷新，自动换行
- `public void print(Xxx XX)`	特有方法:  打印任意数据，不换行
- `public void printf(String format，Object... args)`	特有方法:  带有占位符的打印语句，不换行

如：

```java
// 1.创建字节打印流的对象
Printstream ps = new PrintStream(new Fileoutputstream("myiolla.txt"),true,Charset.forName("UTF-8"));

// 2.写出数据
ps.println(97); // 打印任意数据  自动刷新，自动换行
ps.print(true);  // 打印任意数据，不换行
ps.print1n();  
ps.printf("s爱上了%s","阿珍","阿强");  // 带有占位符的打印语句，不换行


// 3.释放资源
ps.close();
```

**占位符**

```java
// %n表示换行
ps.printf("我叫%s %n"，"阿玮");
ps.printf("%s喜欢%s %n"，"阿珍"，"阿强");
ps.printf("字母H的大写:%c %n"，'H');
ps.printf("8>3的结果是:%b %n",8 > 3);
ps.printf("100的一半是:%d %n"，100/ 2);
ps.printf( "100的.6进制数是:%x %n", 100);
ps.printf("100的8进制数是:%o %n", 100) ;
ps.printf("50元的书打8.5折扣是:%f元%n",50 * 0.85);
ps.printf("计算的结果转16进制:%a %n"，50* 0.85);
ps.printf("计算的结果转科学计数法表示:%e %n",50 * 0.85);
ps.printf("计算的结果转成指数和浮点数，结果的长度较短的是:%g %n"，50 * 0.85);
ps.printf("带有百分号的符号表示法，以百分之85为例:%d8% %n",85);

// 文件中
我叫阿玮
阿珍喜欢阿强
字母H的大写:H
8>3的结果是: true
100的一半是: 50
100的16进制数是: 64
100的8进制数是: 144
50元的书打8.5折扣是: 42.500000元
计算的结果转16进制: 0x1.54p5
计算的结果转科学计数法表示: 4.250000e+01
计算的结果转成指数和浮点数，结果的长度较短的是:
带有百分号的符号表示法，以百分之85为例: 85%
```



#### 字符打印流

字符流底层有缓冲区，想要自动刷新需要开启

##### 构造方法

- `public PrintWriter(Write/File/String)`	关联字节输出流/文件/文件路径
- `public PrintWriter(String fileName,Charset charset)`	指定字符编码
- `public PrintWriter(Write w, boolean autoFlush)`	自动刷新
- `public PrintWriter(OutputStream out，boolean autoFlush,Charset charset)`	指定字符编码且自动刷新

##### 成员方法

- `public void write( ... )`	常规方法: 规则跟之前一样,写出字节或者字符串
- `public void println(Xxx xx)`	特有方法: 打印任意类型的数据并且换行
- `public void print(XxX xx)`	特有方法: 打印任意类型的数据，不换行
- `public void printf(String format，0bject... args)`	特有方法: 带有占位符的打印语句

如：

```java
// 1.创建字符打印流的对象
Printwriter pw = new Printwriter(new Filewriter("myiolla.txt"),true);
                                 
// 2.写出数据
pw.println("今天你终于叫我名字了，虽然叫错了，但是没关系，我马上改");
pw.print("你好你好");
pw.printf("%s爱上了%s","阿珍","阿强");
                                 
// 3.释放资源
pw.close();
```

##### 打印流的应用场景

```java
// 获取打印流的对象，此打印流在虚拟机启动的时候，由虚拟机创建，默认指向控制台
// 特殊的打印流，系统中的标准输出流,是不能关闭，在系统中是唯一的。
PrintStream ps = System.out;

// 调用打印流中的方法println
// 写出数据，自动换行，自动刷新
ps.println("123");
ps.close();

ps.println("你好你好");
```

#### 总结

1. 打印流有几种? 各有什么特点?
   - 有字节打印流和字符打印流两种
   - 打印流不操作数据源，只能操作目的地
   - 字节打印流:  默认自动刷新，特有的println自动换行
   - 字符打印流:  自动刷新需要开启，特有的println自动换行



### 解压缩流

压缩包里面的每一个文件	ZipEntry

解压本质:  把每一个ZipEntry按照层级拷贝到本地另一个文件夹中

如：

```java
// 1.创建一个File表示要解压的压缩包
File src = new File("D: \\aaa.zip");

// 2.创建一个File表示解压的目的地
File dest = new File("D: \\");

//调用方法
unzip(src,dest);


//定义一个方法用来解压
public static void unzip(File src,File dest) throws IOException {
	//解压的本质:把压缩包里面的每一个文件或者文件夹读取出来，按照层级拷贝到目的地当中
	//创建一个解压缩流用来读取压缩包中的数据
	ZipInputstream zip = new ZipInputstream(new FileInputStream(src));
    
    //要先获取到压缩包里面的每一个zipentry对象
    //表示当前在压缩包中获取到的文件或者文件夹zipEntry entry;
	while((entry = zip.getNextEntry()) != nul1){
		System.out.print1n(entry);
		if(entry.isDirectory()){
            // 文件夹: 需要在目的地dest处创建一个同样的文件夹
            File file = new File(dest,entry.toString());
            file.mkdirs();
		}else{
			//文件:需要读取到压缩包中的文件，并把他存放到目的地dest文件夹中(按照层级目录进行存放)
            Fileoutputstream fos = new FileoutputstreamO;
            int b;
            while((b = zip.read()) != -1){
                //写到目的地
                fos.write(b);
            }
            fos.close();
            //表示在压缩包中的一个文件处理完毕了。
            zip.closeEntry();
		}
	}
    zip.close();
}
```

### 压缩流

压缩本质:  把每一个(文件/文件夹）看成ZipEntry对象放到压缩包中

如：

压缩文件

```java
// 1.创建File对象表示要压缩的文件
File src = new File("D: lla.txt" );

// 2.创建File对象表示压缩包的位置
File dest = new File("D:\\");

//3.调用方法用来压缩
tozip(src,dest);

作用: 压缩
参数一: 表示要压缩的文件
参数二: 表示压缩包的位置
    
public static void toZip(File src,File dest) throws FileNotFoundException {
	// 1.创建压缩流关联压缩包
	ZipOutputStream zos = new ZipOutputStream(new FileOutputStream((new File(dest,child: "a.zip")));
	// 2.创建ZipEntry对象，表示压缩包里面的每一个文件和文件夹
	ZipEntry entry = new ZipEntry("a.txt");
	// 3.把zipEntry对象放到压缩包当中
	zos.putNextEntry(entry);
	// 4.把src文件中的数据写到压缩包当中
	FileInputStream fis = new FileInputstream(src) ;
	int b;
    while((b = fis.read()) != -1){
    	zos.write(b);
    }
    zos.closeEntry();
	zos.close();
}
```

压缩文件夹

```java
// 1.创建File对象表示要压缩的文件夹
File src = new File("D:\\aaa");

// 2.创建 File 对象表示压缩包放在哪里(压缩包的父级路径)
File destParent = src.getParentFile(); // D: \\

// 3.创建File对象表示压缩包的路径
File dest = new File(destParent,src.getName() + ".zip");

//4.创建压缩流关联压缩包
ZipOutputstream zos = new ZipOutputstream(new Fileoutputstream(dest));

// 5.获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包当中

// 6.释放资源
zos.close();



作用: 获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包当中
参数一: 数据源
参数二: 压缩流
参数三: 压缩包内部的路径
public static void toZip(File src,ZipoutputStream zos,String name) throws IOException {
	// 1.进入src文件夹
	File[] files = src.listFiles();
    //2.遍历数组
	for (Fil1e file : files) {
		if(file.isFile()){
            // 3.判断-文件，变成ZipEntry对象，放入到压缩包当中
            ZipEntry entry = new ZipEntry(name+"\\"+file.getName());
            zos.putNextEntry(entry);
            // 读取文件中的数据，写到压缩包
            FileInputStream fis = new FileInputstream(file);
            int b;
            while((b = fis.read())!= -1){
            	zos.write(b);
            }
            fis.close();
            zos.closeEntry();
		}else{
			// 4.判断-文件夹，递归
            toZip(file,zos, name + "\\"+ file.getName());
		}
	}
}
```



### Commons-io 工具包
Commons-io 是 apache 开源基金组织提供的一组有关IO操作的开源工具包。

作用:  提高IO流的开发效率。

#### Commons-io使用步骤

1. 在项目中创建一个文件夹:  lib
2. 将 jar 包复制粘贴到 lib 文件夹
3. 右键点击jar包，选择Add as Library ->点击OK
4. 在类中导包使用

#### Commons-io常见方法
##### FileUtils类（文件/文件夹相关)

- `static void copyFile(File srcFile,File destFile)`	复制文件
- `static void copyDirectory(File srcDir,File destDir)`	复制文件夹
- `static void copyDirectoryToDirectory(File srcDir,File destDir)`	复制文件夹
- `static void deleteDirectory(File directory)`	删除文件夹
- `static void cleanDirectory(File directory)`	清空文件夹
- `static String readFileToString(File file,Charset encoding)`	读取文件中的数据变成成字符串
- `static void write(File file,CharSequence data,String encoding)`	写出数据

##### IOUtils类（流相关相关)
- `public static int copy(Inputstream input,OutputStream output)`	复制文件
- `public static int copyLarge(Reader input,Writer output)`	复制大文件
- `public static string readLines(Reader input)`	读取数据
- `public static void write(String data,OutputStream output)`	写出数据

如：

```java
// Commons-io中使用方法简化io流的操作
File src = new File( "myiolla.txt");
File dest = new File( "myio\lcopy.txt" );
Fileutils.copyFile(src ,dest);

File src = new File("D: \\aaa");
File dest = new File("D: \\bbb");
Fileutils.copyDirectory(src,dest);
```

### Hutool 工具包

#### 相关类

- `IoUtil`	流操作工具类
- `FileUtil`	文件读写和操作的工具类
- `FileTypeUtil`	文件类型判断工具类
- `WatchMonitor`	目录、文件监听
- `ClassPathResource`	针对ClassPath中资源的访问封装
- `FileReader`	封装文件读取
- `FileWriter`	封装文件写入

#### FileUtil 类:

- `file`:  根据参数创建一个file对象
- `touch`:  根据参数创建文件
- `writeLines`:  把集合中的数据写出到文件中，覆盖模式。
- `appendLines`:  把集合中的数据写出到文件中，续写模式。
- `readLines`:  指定字符编码，把文件中的数据，读到集合中。
- `readUtf8Lines`:  按照UTF-8的形式，把文件中的数据，读到集合中
- `copy`:  拷贝文件或者文件夹

如：

```java
File file = FileUtil.file("D:\\","aaa","bbb","a.txt");
System.out.println(file);	//D: \laaa\bbb\a.txt

File touch = FileUtil.touch(file);
System.out.print1n(touch);
```





## 多线程

- 线程

  线程是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。

- 进程

  进程是程序的基本执行实体

- 多线程的应用场景

  - 拷贝、迁移大文件
  - 软件中的耗时操作
  - 加载大量的资源文件
  - 所有的聊天软件
  - 所有的后台服务器

- 总结

  1. 什么是多线程?

     有了多线程，我们就可以让程序同时做多件事情

  2. 多线程的作用?

     提高效率

  3. 多线程的应用场景?

     只要你想让多个事情同时运行就需要用到多线程

     比如:  软件中的耗时操作、所有的聊天软件、所有的服务器

### 并发和并行
- 并发:  在同一时刻，有多个指令在单个CPU上交替执行
- 并行:  在同一时刻，有多个指令在多个CPU上同时执行

### 多线程的实现方式
1. 继承`Thread`类的方式进行实现
2. 实现`Runnable`接口的方式进行实现
3. 利用`Callable`接口和`Future`接口方式实现

如：

```java
多线程的第一种启动方式:
1．自己定义一个类继承Thread
2．重写run方法
3．创建子类的对象，并启动线程

// main方法中
MyThread t1 = new MyThread();
MyThread t2 = new MyThread();
t1.start();
t2.start();


public class MyThread extends Thread{
    @Override
    public void run() {
        //书写线程要执行代码
        for (int i = e; i < 100; i++) {
            System.out.print1n ( "Hellowor1d" );
        }
	}
}

```

```java
多线程的第二种启动方式:
1. 自己定义一个类实现Runnable接口
2. 重写里面的run方法
3. 创建自己的类的对象
4. 创建一个Thread类的对象，并开启线程

    
// 创建MyRun的对象
// 表示多线程要执行的任务
MyRun mr = new MyRun();

// 创建线程对象
Thread t1 = new Thread(mr);
Thread t2 = new Thread(mr);

// 给线程设置名字
t1.setName("线程1");
t2.setName("线程2");

// 开启线程
t1.start();
t2.start();



public class MyRun implements Runnable{
    @Override
    public void run() {
        // 书写线程要执行的代码
        for (int i = 0; i < 100; i++){
            //获取到当前线程的对象
            Thread t = Thread.currentThread();
            System.out.println(t.getName() + "He1lowor1d!");
        }
    }
}
```

```java
多线程的第三种实现方式:
特点:可以获取到多线程运行的结果
1．创建一个类MyCallable实现Callable接口
2．重写call (是有返回值的，表示多线程运行的结果)
3．创建Mycallable的对象(表示多线程要执行的任务)
4．创建FutureTask的对象(作用管理多线程运行的结果)
5．创建Thread类的对象，并启动(表示线程)

    
//创建Mycallable的对象（表示多线程要执行的任务)
Mycallable me = new Mycallable();

//创建FutureTask的对象（作用管理多线程运行的结果)
FutureTask<Integer> ft = new FutureTask<>(mc) ;
    
//创建线程的对象
Thread t1 = new Thread(ft);

//启动线程
t1.start();

//获取多线程运行的结果
Integer result = ft.get();
System.out.println(resu1t);



public class Mycallable implements callable<Integer> {
    @0verride
    public Integer cal1() throws Exception {
        //求1~100之间的和
        int sum = o;
        for (int i = 1; i <= 100; i++) {
        	sum = sum + i;
        }
        return sum;
    }
}
```

#### 多线程三种实现方式对比
- 继承Thread类
  - 编程比较简单，可以直接使用Thread类中的方法
  - 可以扩展性较差，不能再继承其他的类

- 实现Runnable接口 和 实现callable接口
  - 扩展性强，实现该接口的同时还可以继承其他的类
  - 编程相对复杂，不能直接使用Thread类中的方法



### Thread 常见的成员方法
- `String getName()`	返回此线程的名称
- `void setName(String name)`	设置线程的名字(构造方法也可以设置名字)
- `static Thread currentThread()`	获取当前线程的对象
- `static void sleep( long time)`	让线程休眠指定的时间，单位为毫秒
- `setPriority(int newPriority)`	设置线程的优先级
- `final int getPriority()`	获取线程的优先级
- `final void setDaemon(boolean on)`	设置为守护线程
- `public static void yield()`	出让线程/礼让线程
- `public static void join()`	插入线程/插队线程

```java
String getName()	返回此线程的名称
void setName(String name)	设置线程的名字(构造方法也可设置名子)
细节:
1、如果我们没有给线程设置名字，线程也是有默认的名字的
格式: Thread-x(X序号，从0开始的)

static Thread currentThread()	获取当前线程的对象
细节:
当JVM虚拟机启动之后，会自动的启动多条线程其中有一条线程就叫做main线程
他的作用就是去调用main方法，并执行里面的代码
在以前，我们写的所有的代码，其实都是运行在main线程当中

    
static void sleep(long time)
让线程休眠指定的时间，单位为毫秒
细节:
1、哪条线程执行到这个方法，那么哪条线程就会在这里停留对应的时间
2、方法的参数:就表示睡眠的时间，单位毫秒
	1秒= 1000毫秒
3、当时间到了之后,线程会自动的醒来，继续执行下面的其他代码

    
    
//哪条线程执行到这个方法，此时获取的就是哪条线程的对象
Thread t = Thread.currentThread();
String name = t.getName();
System.out.println(name); // main



setPriority(int newPriority)	设置线程的优先级
final int getPriority()	获取线程的优先级


// 创建线程要执行的参数对象 MyRunnable是自己创建的类
MyRunnable mr = new MyRunnable();
//创建线程对象
Thread t1 = new Thread(mr,"飞机");
Thread t2 = new Thread(mr,"坦克");
t1.setPriority(1);
t2.setPriority(10);

t1.start();
t2.start();



final void setDaemon(boolean on)	设置为守护线程
细节:
当其他的非守护线程执行完毕之后，守护线程会陆续结束
通俗易懂:
当女神线程结束了，那么备胎也没有存在的必要了

MyThread1 t1 = new MyThread1();
MyThread2 t2 = new MyThread2();
t1.setName("女神");
t2.setName("备胎");
// 把第二个线程设置为守护线程(备胎线程)
t2.setDaemon(true);


public static void yield()	出让线程/礼让线程
例如：
    public class MyThread extends Thread{
        @Override
        public void run() {
            for (int i = 1; i =100; i++) {
                System.out.println(getName( ) +"@"+ i);

                //表示出让当前CPU的执行权
                Thread.yieLd();
            }
        }
	}


public final void join()	插入线程/插队线程
如：// MyThread自己创建的类
MyThread t = new MyThread();
t.setName("土豆");
t.start();
// 表示把t这个线程，插入到当前线程之前。
//t: 土豆
// 当前线程: main线程
t.join();
// 执行在main线程当中的
for (int i = e; i< 10; i++) {
	System.out.println("main线程”+ i);
}

```

java中采用的是抢占式调度



### 线程的生命周期

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/thread1.png)

### 同步代码块

`synchronized{...}`

```java
MyThread.class为类的字节码文件，类的字节码文件唯一，可作为锁对象，锁对象可以是任意的唯一的对象
synchronized (MyThread.class){}
```



```java
如：

// 表示这个类所有的对象，都共享ticket数据
static int ticket = 0;

// e ~ 99
// 锁对象，一定要是唯一的
static Object obj = new object();

@Override
public void run() {
    while (true){
        // 同步代码块
        synchronized (obj){
            if(ticket < 100){
                try {
                  Thread.sLeep(100);
                }catch (InterruptedException e){
                    e.printstackTrace();
                }
                ticket++;
                System.out.println(getName() +“正在卖第”+ ticket +“张票!!! ");
			}else{
            	break;
            }
        }
    }
}

```

### 同步方法
就是把`synchronized`关键字加到方法上

格式:

```java
修饰符 synchronized 返回值类型 方法名(方法参数) {...}
```

- 特点1:  同步方法是锁住方法里面所有的代码

- 特点2:  锁对象不能自己指定

  非静态:  this

  静态:  当前类的字节码文件对象

如：

```java
@Override
public void run() {
    // 1.循环
    while (true) {
        if (method()) break;
    }
}

// 同步方法
private static synchronized boolean method() {
    // 3.判断共享数据是否到了末尾,如果到了末尾
    if (ticket == 100){
		return true;
	} else {
    	// 4.判断共享数据是否到了末尾,如果没有到末尾
        try {
            Thread.sleep( millis: 10);
        } catch (InterruptedException e){
            e.printstackTrace();
        }
        ticket++;
        System.out.println(Thread.currentThread().getName()+"在卖第"+ ticket +"张票!!!");
    }
    return false;
}
```

### lock锁

虽然我们可以理解同步代码块和同步方法的锁对象问题，

但是我们并没有直接看到在哪里加上了锁，在哪里释放了锁，

为了更清晰的表达如何加锁和释放锁，JDK5以后提供了一个新的锁对象Lock

`Lock` 实现提供比使用`synchronized`方法和语句可以获得更广泛的锁定操作

Lock中提供了获得锁和释放锁的方法  ( 手动上锁、手动释放锁 )

`void lock()`:  获得锁

`void unlock()`:  释放锁

Lock 是接口不能直接实例化，这里采用它的实现类 `ReentrantLock` 来实例化

`ReentrantLock` 的构造方法

`ReentrantLock()`:  创建一个`ReentrantLock`的实例

如：

```java
// 在类中使用，必须用static修饰，确保唯一性
static Lock lock = new ReentrantLock();


public void run() {
    //1.循环
    while(true){
        // 获得锁
		Lock.lock();
        try {
            // 3.判断
            if(ticket == 100) {
                break;
            } else {
                Thread.sleep(10);
                ticket++;
                System.out.println(getName());
            }
        } catch (InterruptedException e) {
        	e.printstackTrace();
        } finally {
            // 释放锁
        	Lock.unlock();
        }
    }
}
```

### 死锁

```java
static Object objA = new object();
static Object objB = new 0bject();

@Override
public void run() {
    // 1.循环
    while(true) {
        if("线程A".equals(getName())){
            synchronized (objA) {
                System.out.print1n("线程A拿到了A锁，准备拿B锁");

                synchronized (objB) {
                    System.out. println("线程A拿到了B锁，顺利执行完一轮");
                }
			}
		} else if("线程B".equals(getName())) {
        if(“线程B".equals(getName())) {
            synchronized (objB){
                System.out.print1n(“线程B拿到了B锁,准备拿A锁");
                                   
                synchronized (objA){
                	System.out.print1n("线程B拿到了A锁,顺利执行完一轮");
                }
            }
        }
    }
}
```

**上面代码块嵌套就会造成死锁的情况，所以避免使用代码块嵌套**



### 生产者和消费者（等待唤醒机制)
生产者消费者模式是一个十分经典的多线程协作的模式

#### 常见方法

- `void wait()`	当前线程等待，直到被其他线程唤醒
- `void notify()`	随机唤醒单个线程
- `void notifyAll()`	唤醒所有线程

#### 等待唤醒机制基本写法

```java
// 生产者
1．循环
2．同步代码块
3．判断共享数据是否到了末尾(到了末尾)
4．判断共享数据是否到了末尾(没有到末尾,执行核心逻辑)
    
public class Cook extends Thread{
    @Override
    public void run() {
        while(true){
            synchronized (Desk.Lock){
                if(Desk.count == 0){
                    break;
                } else {
                    //判断桌子上是否有食物
                    if(Desk.foodFLag == 1){
                        //如果有，就等待
                        try {
                            Desk.Lock.wait();
                        } catch (InterruptedException e) {
                        	e.printStackTrace();
                        }
                    } else {
                        //如果没有，就制作食物
                        System.out.println("厨师做了一碗面条");
                        //修改桌子上的食物状态
                        Desk.foodFLag = 1;
                        //叫醒等待的消费者开吃
                        Desk.Lock.notifyA1l();
                    }
                }
            }
        }
    }
}


// 消费者
1．循环
2．同步代码块
3．判断共享数据是否到了末尾(到了末尾)
4．判断共享数据是否到了末尾(没有到末尾,执行核心逻辑)

public class Fooide extends Thread{
    @Override
    public void run() {
        while(true){
            synchronized (Desk.Lock){
                if(Desk.count == 0){
                	break;
                } else {
                	//先判断桌子上是否有面条
                    if(Desk.foodFLag == 0){
                		// 如果没有，就等待
                        try {
                            // 让当前线程跟锁进行绑定
                    		Desk.Lock.wait();
                        } catch (InterruptedException e) {
                    		e.printstackTrace();
                        }
                    } else {
                        //把吃的总数-1
						Desk.count--;
						//如果有，就开吃
                        System.out.println("吃货在吃面条，还能再吃"+Desk.count +"碗!!! ");
						//吃完之后，唤醒厨师继续做
                        Desk.Lock.notifyA11();
                        //修改桌子的状态
                        Desk.foodFLag = 0;
                    }
                }
            }
        }
    }
}


// 控制类，作用:控制生产者和消费者的执行
public class Desk{
    //是否有面条 0:没有面条 1:有面条
    public static int foodFLag = 0;
    
	//总个数
	public static int count = 10;
    
	//锁对象
	public static Object Lock = new 0bject();

}
```

#### 阻塞队列方式实现

- 阻塞队列的继承结构（四个接口）
  - lterable
  - collection
  - Queue
  - BlockingQueue

- 要创建实现类
  - ArrayBlockingQueue
  - LinkedBlockingQueue

```java
// 生产者
public class Cook extends Thread{
    // 类中定义一个空阻塞队列
    ArrayBlockingQueue<String> queue;
    // 通过构造方法接收一个阻塞队列的地址值赋值给成员队列
    public Cook(ArrayBlockingQueue<String> queue){
        this.queue = queue;
    }

    @Override
    public void run() {
        while(true){
			//不断的把面条放到阻塞队列当中
            try {
            	queue.put(“面条");
            	System.out.println(""厨师放了一碗面条");
			} catch (InterruptedException e) {
            	e.printstackTrace();
            }
        }
    }
}



// 消费者
public class Fooide extends Thread{
    // 类中定义一个空阻塞队列
    ArrayBlockingQueue<String> queue;
    // 通过构造方法接收一个阻塞队列的地址值赋值给成员队列
    public Fooide(ArrayBlockingQueue<String> queue){
        this.queue = queue;
    }
    
    @Override
    public void run() {
        while(true)	{
			//不断从阻塞队列中获取面条
            try {
                String food = queue.take();
                System.out.printin(food);
            } catch (InterruptedException e) {
                e.printstackTrace();
            }
		}
    }
}



// 测试类
需求:利用阻塞队列完成生产者和消费者（等待唤醒机制）的代码
细节:
    生产者和消费者必须使用同一个阻塞队列
public class ThreadDemo {
    public static void main(string[] args) {
   		// 1.创建阻塞队列的对象,要指定队列中的最大能放多少个元素
		ArrayBlockingQueue<String> queue = new ArrayBlockingQueue<>(1);
        
		//2.创建线程的对象，并把阻塞队列传递过去
        Cook c = new cook(queue) ;
        Foodie f = new Foodie(queue);
        
        //3.开启线程
        c.start();
        f.start();
    }
}

```

### 线程的状态

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/thread22.png)

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/thread33.png)

### 线程池

以前写多线程的弊端

- 弊端1:  用到线程的时候就创建
- 弊端2:  用完之后线程消失

#### 线程池主要核心原理
1. 创建一个池子，池子中是空的
2. 提交任务时，池子会创建新的线程对象，任务执行完毕，线程归还给池子下回再次提交任务时，不需要创建新的线程，直接复用已有的线程即可
3. 但是如果提交任务时，池子中没有空闲线程，也无法创建新的线程，任务就会排队等待

#### 线程池代码实现
1. 创建线程池
2. 提交任务
3. 所有的任务全部执行完毕，关闭线程池

`Executors`:  线程池的工具类通过调用方法返回不同类型的线程池对象。

`public static ExecutorService newCachedThreadPool()`	创建一个没有上限的线程池

`public static ExecutorService newFixedThreadPool(int nThreads)`	创建有上限的线程池

```java
// 1.获取线程池对象
ExecutorService pool1 = Executors.newcachedThreadPool();
// 2.提交任务
pool1.submit(new MyRunnable());
// 3.销毁线程池
pool1.shutdown();
```

#### 自定义线程池超详细解析

`ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(核心线程数量, 最大线程数量, 空闲线程最大存活时间, 任务队列,创建线程工厂, 任务的拒绝策略);`

- 参数一:  核心线程数量	不能小于0
- 参数二:  最大线程数	不能小于等于0，最大数量>=核心线程数量
- 参数三:  空闲线程最大存活时间	不能小于0
- 参数四:  时间单位	用`TimeUnit`指定
- 参数五:  任务队列	不能为null
- 参数六:  创建线程工厂	不能为null
- 参数七:  任务的拒绝策略	不能为null

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/thread443.png)

```java
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    3,//核心线程数量，能小于0
    6,//最大线程数，不能小于0，最大数量>=核心线程数量
    60,//空闲线程最大存活时间
    Timeunit.SECONDs,//时间单位
    new ArrayBlockingQueue<>(3),//任务队列
    Executors.defaultThreadFactory(),//创建线程工厂
    new ThreadPoolExecutor.AbortPolicy()//任务的拒绝策略
);
```



#### 任务拒绝策略
`ThreadPoolExecutor.AbortPolicy`	默认策略:  丢弃任务并抛出`RejectedExecutionException`异常

`ThreadPoolExecutor.DiscardPolicy`	丢弃任务，但是不抛出异常这是不推荐的做法

`ThreadPoolExecutor.DiscardoldestPolicy`	抛弃队列中等待最久的任务然后把当前任务加入队列中

`ThreadPoolExecutor.callerRunsPolicy`	调用任务的run()方法绕过线程池直接执行

#### 自定义线程池小结
1. 创建一个空的池子
2. 有任务提交时，线程池会创建线程去执行任务，执行完毕归还线程

不断的提交任务，会有以下三个临界点:

1. 当核心线程满时，再提交任务就会排队
2. 当核心线程满，队伍满时，会创建临时线程
3. 当核心线程满，队伍满，临时线程满时，会触发任务拒绝策略

#### 最大并行数

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/thread224.png)

```java
//向Java虚拟机返回可用处理器的数目
int count = Runtime.getRuntime( ).availableProcessors();
System.out. println(count);
```

volatile
JMM
悲观锁、乐观锁、CAS
原子性
并发工具类



## 网络编程

### 什么是网络编程

在网络通信协议下，不同计算机上运行的程序，进行的数据传输。

- 应用场景:即时通信、网游对战、金融证券、国际贸易、邮件、等等。
- 不管是什么场景，都是计算机跟计算机之间通过网络进行数据传输。
- Java中可以使用java.net包下的技术轻松开发出常见的网络应用程序。

#### 总结

1. 什么网络编程?

   计算机跟计算机之间通过网络进行数据传输。

2. 常见软件架构有哪些?

   CS / BS

3. 通信的软件架构 CS \ BS 的各有什么区别和优缺点

   CS: 客户端服务端模式需要开发客户端

   BS: 浏览器服务端模式不需要开发客户端。

   CS: 适合定制专业化的办公类软件 如: IDEA、网游

   BS: 适合移动互联网应用，可以在任何地方随时访问的系统。

### 网络编程三要素分别是什么

- IP

- 端口号

- 协议

- 网络编程三要素分别表示什么?

  - lP: 设备在网络中的地址，是唯一的标识

  - 端口号: 应用程序在设备中唯一的标识。

  - 协议:  

    数据在网络中传输的规则

    常见的协议有UDP、TCP、http、https、ftp

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/ipv6.png)



#### IP

1. lp的作用

   设备在网络中的地址，是唯一的标识

2. IPv4有什么特点

   目前的主流方案
   最多只有2^32次方个ip，目前已经用完了

3. IPv6有什么特点

   为了解决IPv4不够用而出现的最多有 2^128 次方个 ip
   可以为地球上的每一粒沙子都设定 ip

##### IPv4的小细节

1. 现在如何解决IPv4不够的问题?

   利用局域网IP解决IP不够的问题

2. 特殊的IP是什么?

   127.0.0.1(永远表示本机)

3. 常见的两个CMD命令?

   ipconfig:  查看本机

   IP 地址 ping:  检查网络是否连通

#### 端口号

应用程序在设备中唯一的标识。

端口号: 由两个字节表示的整数，取值范围: 0~65535

其中 0~1023 之间的端口号用于一些知名的网络服务或者应用。我们自己使用1024以上的端口号就可以了。

注意:  一个端口号只能被一个应用程序使用。

#### 协议

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/wlbcxy.png)

计算机网络中，连接和通信的规则被称为网络通信协议

UDP协议

用户数据报协议 (User Datagram Protocol) UDP 是面向无连接通信协议。

速度快，有大小限制一次最多发送64K，数据不安全，易丢失数据

TCP 协议

传输控制协议 TCP (Transmission Control Protocol) TCP 协议是面向连接的通信协议。

速度慢，没有大小限制，数据安全。

### UDP协议发送数据

```java
// 1.创建DatagramSocket对象(快递公司)
// 细节:
// 绑定端口，以后我们就是通过这个端口往外发送
// 空参: 所有可用的端口中随机一个进行使用
// 有参: 指定端口号进行绑定
DatagramSocket ds = new DatagramSocket();

// 2.打包数据
String str = "你好威啊!!!";
byte[] bytes = str.getBytes();
InetAddress address = InetAddress.getByName("127.0.0.1");
int port = 10086;
DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address, port);

// 3.发送数据
ds.send(dp);

// 4.释放资源
ds.close();
```

### UDP接收数据

```java
// 接收数据
// 1.创建DatagramSocket对象（快递公司)
//细节:
// 在接收的时候，一定要绑定端口
// 而且绑定的端口一定要跟发送的端口保持一致
DatagramSocket ds = new DatagramSocket( port: 10086);

// 2.接收数据包
byte[] bytes = new byte[1024];
DatagramPacket dp = new DatagramPacket(bytes,bytes.length);ds.receive(dp);

//3.解析数据包
byte[] data = dp.getData();
int len = dp.getLength();
InetAddress address = dp.getAddress();
int port = dp.getPort();
System.out.print1n("接收到数据" + new String(data,0,len));
System.out.print1n("该数据是从" + address + "这台电脑中的" + port + "这个端口发出的");

// 4.释放资源
ds.close();
```

### InetAddress

- `static InetAddress getByName(string host)`	确定主机名称的IP地址。主机名称可以是机器名称，也可以是IP地址
- `String getHostName()`	获取此IP地址的主机名
- `String getHostAddress()`	返回文本显示中的IP地址字符串

如：

```java
// 1.获取InetAddress的对象
// IP的对象一台电脑的对象
InetAddress address = InetAddress.getByName("DESKTOP-5033SAM");
System.out.println(address);
String name = address.getHostName();
System.out.println(name); // DESKTOP-5033SAM
String ip = address.getHostAddress();
System.out.println(ip); //192.168.1.100
```

### UDP的三种通信方式

1. 单播

   以前的代码就是单播

2. 组播

   组播地址: 224.0.0.0 ~ 239.255.255.255

   其中 224.0.0.0~224.0.0.255 为预留的组播地址

3. 广播

   广播地址: 255.255.255.255

```java
组播发送端代码
    
// 创建Multicastsocket对象
Multicastsocket ms = new MulticastSocket();

// 创建DatagramPacket对象
String s = "你好,你好!”;
byte[] bytes = s.getBytes();
InetAddress address = InetAddress.getByName("224.0.0.1");
int port = 10000;
DatagramPacket datagramPacket = new DatagramPacket(bytes， bytes.length，address，port) ;

// 调用MulticastSocket发送数据方法发送数据
ms .send(datagramPacket);

// 释放资源
ms.close();
```

```java
组播接收端代码

// 1、创建Multicastsocket对象
Multicastsocket ms = new MulticastSocket(10000);

// 2．将将当前本机，添加到224.0.8.1的这一组当中
InetAddress address = InetAddress.getByName("224.0.0.1");ms.joinGroup( address);

// 3．创建DatagramPacket数据包对象
byte[] bytes = new byte[1024];
DatagramPacket dp = new DatagramPacket(bytes, bytes.length);

// 4．接收数据
ms.receive(dp);

//5．解析数据
byte[] data = dp.getData();
int len = dp.getLength();
String ip = dp.getAddress().getHostAddress();
String name = dp.getAddress().getHostName();
System.out.printIn("ip为: " + ip + "",主机名为:"+ name + “的人，发送了数据: ”+ new String(data,0,len));

// 释放资源
ms.close();
```

### TCP通信程序

TCP通信协议是一种可靠的网络协议，它在通信的两端各建立一个Socket对象

通信之前要保证连接已经建立

通过Socket产生IO流来进行网络通信

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/tcp1.png)

```java
客户端

1. 创建客户端的Socket对象(Socket)与指定服务端连接
    Socket(String host，int port)
2. 获取输出流，写数据
	Outputstream getOutputStream()
3. 释放资源
	void close()
    
    
服务器端

1. 创建服务器端的Socket对象(ServerSocket)
    Serversocket(int port)
2. 监听客户端连接，返回一个Socket对象
    Socket accept()
3. 获取输入流，读数据，并把数据显示在控制台
    Inputstream getInputstream()
4. 释放资源
	void close()
```

如：

```java
客户端
    
// TCP协议，发送数据
// 1.创建Socket对象
// 细节: 在创建对象的同时会连接服务端
// 如果连接不上，代码会报错
Socket socket = new Socket("127.0.0.1", 10000); // ip和端口

// 2.可以从连接通道中获取输出流
Outputstream os = socket.getOutputStream();
// 写出数据
os.write("你好你好".getBytes());

// 3.释放资源
os.close();
socket.close();
```

```java
服务器端
    
// TCP 协议，接收数据
// 1. 创建对象ServerSocker
Serversocket ss = new ServerSocket(10000);

// 2.监听客户端的链接
socket socket = ss.accept();

// 3.从连接通道中获取输入流读取数据
Inputstream is = socket.getInputStream();
InputStreamReader isr = new InputStreamReader(is); // 转换流，将字节流转换成字符流，解决中文乱码的问题

int b;
while((b = is.read()) != -1){
	System.out.print((char) b);
}

//4.释放资源
socket.close();
ss.close();
```





## 反射

什么是反射?

反射允许对成员变量，成员方法和构造方法的信息进行编程访问

### 获取class对象的三种方式

1. class.forName( "全类名");
2. 类名.class
3. 对象.getclass();

![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/fanshe1.png)

如：

```java
// 1．第一种方式
// 全类名: 包名＋类名
class clazz1 = Class.forName( "com.itheima .myreflect1.Student");

// 2．第二种方式
class clazz2 = Student.class;

// 3.第三种方式
Student s = new Student();
Class clazz3 = s.getclass();

System.out. print1n(clazz1 == clazz2); // true
System.out.println(clazz2 == clazz3); // true
```

### 利用反射获取构造方法

Class类中用于获取构造方法的方法

- `Constructor<?>[] getConstructors()`:  返回所有公共构造方法对象的数组
- `Constructor<?>[] getDeclaredConstructors()`:  返回所有构造方法对象的数组
- `Constructor<T> getConstructor(Class<?>... parameterTypes)`:  返回单个公共构造方法对象
- `Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)`:  返回单个构造方法对象



`Constructor ` 类中用于创建对象的方法

- `T newInstance(Object... initargs)`:  根据指定的构造方法创建对象

- `setAccessible(boolean flag)`:  设置为true,表示取消访问检查



如：

```java
// 1.获取class字节码文件对象
class clazz = class.forName("com.itheima.myreflect2.student");

// 2.获取构造方法
Constructor[] cons = clazz.getConstructors();
for (Constructor con: cons){
	System.out.println(con);
}

// 获取所有构造方法
Constructor[] cons2 = clazz.getDeclaredconstructors();

// 获取空参构造
constructor con1 = clazz.getDeclaredconstructor();

// 获取一个参数为String类型的构造方法
Constructor con2 = clazz.getDeclaredConstructor(String.class);

// 获取两个参数的构造方法
Constructor con4 = clazz.getDeclaredConstructor(String.class,int.class);

// 获取构造方法的权限修饰符，返回的是一个int类型的数字
int modifiers = con4.getModifiers();

// 获取所有的构造方法的参数
Parameter[] parameters = con4.getParameters();


con4.setAccessible(true); // 暴力反射: 表示临时取消权限校验
Student stu = (Student) con4.newInstance("张三",23);
```



### 利用反射获取成员变量

Class类中用于获取成员变量的方法

- `Field[] getFields()`:  返回所有公共成员变量对象的数组
- `Field[] getDeclaredFields()`:  返回所有成员变量对象的数组
- `Field getField(String name)`:  返回单个公共成员变量对象
- `Field getDeclaredField(String name)`:  返回单个成员变量对象

`Field` 类中用于创建对象的方法

- `void set(Object obj, Object value)`:  赋值
- `Object get(Object obj)` 获取值。

如：

```java
// 1.获取class字节码文件对象
class clazz = class.forName("com.itheima.myreflect2.student");

// 获取单个的成员变量
Field name = clazz.getDeclaredField("name");

// 获取权限修饰符
int modifiers = name.getModifiers();

// 获取成员变量的名字
String n = name.getName();

// 获取成员变量的数据类型
Class<?> type = name.getType();

// 获取成员变量记录的值
Student s = new Student("zhangsan",23,"男");
name.setAccessible(true);
Object value = name.get(s);

//修改对象里面记录的值
name.set(s,"lisi");
```

### 反射获取成员方法

Class 类中用于获取成员方法的方法

- `Method[] getMethods()`:  返回所有公共成员方法对象的数组，包括继承的
- `Method[] getDeclaredMethods()`:  返回所有成员方法对象的数组，不包括继承的
- `Method getMethod(String name, Class<?>... parameterTypes)`:  返回单个公共成员方法对象
- `Method getDeclaredMethod(String name, Class<?>... parameterTypes)`:  返回单个成员方法对象

Method 类中用于创建对象的方法

- `Object invoke(Object obj, Object... args)`:  运行方法
  - 参数一:  用obj对象调用该方法
  - 参数二:  调用方法的传递的参数（如果没有就不写)
  - 返回值:  方法的返回值（如果没有就不写)

如：

```java
// 1．获取class字节码文件对象
Class clazz = class.forName("com.itheima.myreflect4.Student");

// 2．获取里面所有的方法对象(包含父类中所有的公共方法)
Method[] methods = clazz.getMethods();

// 获取里面所有的方法对象(不能获取父类的，但是可以获取本类中私有方法)
Method[] methods = clazz.getDeclaredMethods();

// 获取指定的单一方法
Method m = clazz.getDeclaredMethod("eat",String.class);

// 获取方法的修饰符
int modifiers = m.getModifiers();

// 获取方法的名字
String name = m.getName();

// 获取方法的形参
Parameter[] parameters = m.getParameters();

// 获取方法的抛出的异常
Class[] exceptionTypes = m.getExceptionTypes();

// 方法运行
Student s = new Student();
m.setAccessible(true);
// 参数一s: 表示方法的调用者
// 参数二"汉堡":  表示在调用方法的时候传递的实际参数
// 可接收方法的返回值
String result = (String) m.invoke(s,"汉堡");
```

### 反射的作用

1. 获取一个类里面所有的信息，获取到了之后，再执行其他的业务逻辑
2. 结合配置文件，动态的创建对象并调用方法

如：

```java
// 1.获取字节码文件的对象
Class clazz = obj.getclass();

// 2．创建I0流
Bufferedwriter bw = new Bufferedwriter(new Filewriter("myreflect\\a.txt"));

// 3．获取所有的成员变量
Field[] fields = clazz.getDeclaredFields();
for (Field field : fields) {
    field.setAccessible(true);	//获取成员变量的名字
    String name = field.getName();	//获取成员变量的值
    Object value = field.get(obj);	//写出数据
    bw.write(name + "=" + value);
    bw.newLine();
}

bw.close();
```

```java
// 1.读取配置文件中的信息
Properties prop = new Properties();
FileInputStream fis = new FileInputStream("myreflect\\prop.properties");
prop.load(fis);
fis.close();

// 2.获取全类名和方法名
String className = (String) prop.get("classname");
String methodName = (String) prop.get("method");

// 3.利用反射创建对象并运行方法
class clazz = class.forName(className);

// 获取构造方法
Constructor con = clazz.getDeclaredConstructor();
Object o = con.newInstance();

// 获取成员方法并运行
Method method = clazz.getDeclaredMethod(methodName);
method.setAccessible(true); 
method.invoke(o);
```

### 总结

1. 反射的作用
   - 获取任意一个类中的所有信息
   - 结合配置文件动态创建对象
2. 获得 class 字节码文件对象的三种方式
   - Class.forName("全类名");
   - 类名.class
   - 对象.getClass();
3. 如何获取构造方法、成员方法、成员变量
   get: 获取
   set: 设置
   Constructor: 构造方法
   Parameter: 参数
   Field: 成员变量
   Modifiers: 修饰符
   Method: 方法
   Declared: 私有的

## 动态代理

什么是动态代理?

特点:  无侵入式的给代码增加额外的功能

- 为什么需要代理?

  代理可以无侵入式的给对象增强其他的功能

- 代理长什么样?

  代理里面就是对象要被代理的方法

- Java通过什么来保证代理的样子?

  通过接口保证，后面的对象和代理需要实现同一个接口

  接口中就是被代理的所有方法

### 如何为 Java 对象创建一个代理对象?

`java.lang.reflect.Proxy`类:  提供了为对象产生代理对象的方法:

`public static Object newProxyInstance(ClassLoader loader,Class<?>[] interfaces，InvocationHandler h)`

参数一:  用于指定用哪个类加载器，去加载生成的代理类

参数二:  指定接口，这些接口用于指定生成的代理长什么，也就是有哪些方法

参数三:  用来指定生成的代理对象要干什么事情

如：

```java
Star star = (Star) Proxy.newProxyInstance(
    // ProxyUtil是自己创建的一个类
    ProxyUtil.class.getClassLoader(),	// 参数一: 用于指定用哪个类加载器，去加载生成的代理类
    new class[]{Star.class},	// 参数二: 指定接口，这些接口用于指定生成的代理长什么，也就是有哪些方法
    // 参数三:用来指定生成的代理对象要干什么事情
    new InvocationHandler() {
    	@Override
    	public Object invoke(0bject proxy，Method method,object[] args) throws Throwable {
    		// 参数一: 代理的对象
            // 参数二: 要运行的方法
            // 参数三: 调用要运行的方法时，传递的实参

    		return method.invoke(bigStar,args);
    	}
    }
);
return star;
```

