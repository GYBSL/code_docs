---
title: web综合篇
toc: content
---

# 前端高频面试题 web 综合篇

## 1. 前端需要注意哪些SEO

- 合理的`title`、`description`、`keywords`：搜索对着三项的权重逐个减小，`title`值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面`title`要有所不同；`description`把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面`description`有所不同；`keywords`列举出重要关键词即可
- 语义化的`HTML`代码，符合W3C规范：语义化代码让搜索引擎容易理解网页
- 重要内容`HTML`代码放在最前：搜索引擎抓取`HTML`顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用`js`输出：爬虫不会执行js获取内容
- 少用`iframe`：搜索引擎不会抓取`iframe`中的内容
- 非装饰性图片必须加`alt`
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

<TipP>合理的 title、description、keywords, 语义化标签的使用, 重要内容不要用 js 输出, 少用 iframe, 图片加 alt</TipP>

## 2. 从浏览器地址栏输入url到显示页面的步骤过程

基础版：

1. 浏览器发送请求，`url` 地址进行 `DNS` 解析，找到对应的ip服务器地址，与服务器进行TCP连接，进行三次握手。
2. 三次握手成功后，服务器返回资源给浏览器，浏览器根据请求到的资源构建DOM树、CSS树，将DOM树和CSS树结合生成Rander渲染树
3. 展示完整页面

详细版：

1. 输入`URL` ，浏览器会先去缓存中通过 `cache-control` 的 `max-age` 字段来判断请求的资源是否新鲜，如果是`HTTP/1.0` 版本的话，是根据 `Expries` 来判断资源是否新鲜的，如果资源的缓存日期新鲜，则直接将缓存中的资源返回给浏览器，如果缓存中的资源已经过期了，则进入下一步

2. 如果缓存中的资源过期了，则根据请求的 `URL` 进行 `DNS` 解析，找到对应的 `ip`地址，然后浏览器会和服务器建立起一个 `socket` 来进行 `TCP` 连接三次握手，`TCP` 三次握手的过程是：

   - 客户端发送一个标志位 `SYN=1` , 序号 `seq=x` 的包给服务器
   - 服务器接收到之后，返回一个标志位 `SYN=1` ，确认号 `ack=x+1`, 序号 `seq=y` 的包
   - 客户端接收服务器返回的包之后，在发送一个确认号 `ack=y+1` ，序号 `seq=Z` 的包给服务器，完成三次握手

3. 完成 `TCP` 三次握手之后发送 `HTTP` 请求，服务器接收到 `HTTP` 请求之后返回响应报文给浏览器并关闭 `TCP` l连接，关闭 `TCP` 连接需要进行四次挥手：

   挥手请求可以是 `Client` 端，也可以是 `Server` 端发起的，我们假设是 `Client` 端发起

   - **第一次挥手**： `Client` 端发起挥手请求，向 `Server` 端发送标志位是`FIN` 报文段，设置序列号 `seq`，此时，`Client` 端进入 `FIN_WAIT_1` 状态，这表示 `Client` 端没有数据要发送给 `Server` 端了。
   - **第二次挥手**：`Server` 端收到了 `Client` 端发送的 `FIN` 报文段，向 `Client` 端返回一个标志位是 `ACK` 的报文段，`ack` 设为 `seq` 加 `1` ，`Client` 端进入 `FIN_WAIT_2` 状态，`Server` 端告诉 `Client` 端，我确认并同意你的关闭请求。
   - **第三次挥手**： `Server` 端向 `Client` 端发送标志位是 `FIN` 的报文段，请求关闭连接，同时 `Client` 端进入 `LAST_ACK` 状态。
   - **第四次挥手** ： `Client` 端收到 `Server` 端发送的 `FIN` 报文段，向 `Server` 端发送标志位是 `ACK` 的报文段，然后 `Client` 端进入 `TIME_WAIT` 状态。`Server` 端收到 `Client` 端的 `ACK` 报文段以后，就关闭连接。此时，`Client` 端等待**2MSL**的时间后依然没有收到回复，则证明 `Server` 端已正常关闭，那好，`Client` 端也可以关闭连接了。

4. `TCP` 连接关闭之后，浏览器会解析响应状态码，是否为 1 开头，3 开头， 4 开头， 5 开头，这些情况处理与 2 开头不同

5. 浏览器判断解析完响应状态码之后，检查响应信息中是否有可缓存的资源，如果资源可缓存则缓存，然后再对服务器返回的资源进行解码，根据资源的类型决定如何处理

6. 如果资源是 `HTML` 文档，则构建 `DOM` 树，构建 `DOM` 树的过程中如果遇到图片、样式表、`js` 脚本，则会进行下载

7. `DOM` 树构建完成之后，构建 `CSSOM` 树，然后根据  `DOM` 树和 `CSSOM` 树构建渲染树

8. 浏览器根据渲染树进行回流，确定节点的大小和位置等几何信息，然后再再根据渲染树和回流的几何信息进行重绘，得到节点的绝对像素

9. 然后将绝对像素信息发送给 `GPU` 调用系统的 `GUI` 的 `API` 进行页面的展示

10. 如果在构建渲染树的过程中遇到 `js` 代码，则会停止构建渲染，加载执行 `js` 代码，执行完之后再从中断的地方接着构建渲染。

## 3. 如何进行网站性能优化（你有用过哪些前端性能优化的方法？）

- 减少http请求次数：CSS精灵图, 静态资源 JS、CSS源码压缩；网页Gzip，CDN托管，使用浏览器缓存，组件懒加载
- 前端模板 JS+数据，减少由于 HTML 标签导致的带宽浪费，前端用变量保存 AJAX 请求结果，每次操作本地变量，不用请求，减少请求次数
- 用 innerHTML 代替DOM操作，减少DOM操作次数，优化 javascript 性能。
- 当需要设置的样式很多时设置 className 而不是直接操作 style
- 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作
- 避免使用 css表达式
- 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳
- 避免在页面的主体布局中使用 table，table 要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢
- 前端工程化（gulp/webpack）

## 4. HTTP状态码及其含义

- 1XX：

  信息状态码

  - `100 Continue` 继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息

- 2XX：

  成功状态码

  - `200 OK` 正常返回信息
  - `201 Created` 请求成功并且服务器创建了新的资源
  - `202 Accepted` 服务器已接受请求，但尚未处理

- 3XX：

  重定向

  - `301 Moved Permanently` 请求的网页已永久移动到新位置。
  - `302 Found` 临时性重定向。
  - `303 See Other` 临时性重定向，且总是使用 `GET` 请求新的 `URI`。
  - `304 Not Modified` 自从上次请求后，请求的网页未修改过。

- 4XX：

  客户端错误

  - `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  - `401 Unauthorized` 请求未授权。
  - `403 Forbidden` 禁止访问。
  - `404 Not Found` 找不到如何与 `URI` 相匹配的资源。

- 5XX:

  服务器错误

  - `500 Internal Server Error` 最常见的服务器端错误。
  - `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）。

## 5. 介绍一下你对浏览器内核的理解

- 主要分成两部分：渲染引擎(`layout engineer`或`Rendering Engine`)和`JS`引擎

- 渲染引擎：负责取得网页的内容（`HTML`、`XML`、图像等等）、整理讯息（例如加入`CSS`等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核
- `JS`引擎则：解析和执行`javascript`来实现网页的动态效果
- 最开始渲染引擎和`JS`引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎

### 5.1 常见的浏览器内核有哪些

- `Trident`内核：`IE,MaxThon,TT,The World,360`,搜狗浏览器等。[又称MSHTML]
- `Gecko`内核：`Netscape6`及以上版本，`FF,MozillaSuite/SeaMonkey`等
- `Presto`内核：`Opera7`及以上。 [`Opera`内核原为：Presto，现为：`Blink`;]
- `Webkit`内核：`Safari,Chrome`等。 [ `Chrome`的`Blink`（`WebKit`的分支）]

## 6. 请描述一下 `cookies`，`sessionStorage` 和 `localStorage` 的区别？

- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 存储大小：
  - `cookie`数据大小不能超过4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大
- 有期时间：
  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - `sessionStorage` 数据在当前浏览器窗口关闭后自动删除
  - `cookie` 设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭

## 7. HTTP-报文结构

### 7.1 HTTP request 报文（请求报文）结构是怎样的

- 请求行：由三部分组成，请求方法、请求URL（不包括域名）、HTTP协议版本。

- 请求头：

  请求头由关键字/值对组成，每行一对

  - `User-Agent` : 产生请求的浏览器类型
  - `Accept` : 客户端希望接受的数据类型，比如 `Accept：text/xml（application/json）`表示希望接受到的是`xml（json）`类型
  - `Content-Type`：发送端发送的实体数据的数据类型。
  - 比如，`Content-Type：text/html（application/json）`表示发送的是`html`类型。
  - `Host` : 请求的主机名，允许多个域名同处一个`IP`地址，即虚拟主机

  `Content-Type:`

  ![](https://gitee.com/gybsl/image-upload/raw/master/image_docs/content-type.png)

  **`multipart/form-data`**

  　　用以支持向服务器发送二进制数据，以便可以在 POST 请求中实现文件上传等功能

- 空行

  - 请求头之后是一个空行，通知服务器以下不再有请求头

- 请求体

  - GET没有请求数据，POST有。

```http
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25 
```

### 7.2 HTTP response报文（响应报文）结构是怎样的

- 状态行: HTTP 响应报文的第一行

  状态行包括三个字段：协议版本、状态码与原因短语

  状态码：由3位数字组成，第一个数字定义了响应的类别

- 首行之后是**若干行响应头**，包括：**通用头部，响应头部，实体头部**
- 响应头部和响应实体之间用**一个CRLF空行**分隔
- 最后是一个响应正文

```http
HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25} 
```

