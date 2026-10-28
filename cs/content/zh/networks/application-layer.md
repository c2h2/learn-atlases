在你自己的机器上启动一个微型 Web 服务器——Python 标准库里就带一个——然后用 `curl -v` 向它要两个文件；`curl -v` 会打印它发出的每一行（`>`）和收到的每一行（`<`）：

```python
# serve11.py：用 HTTP/1.1 在 127.0.0.1:8000 上提供当前目录的服务
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"      # 保持连接打开（持续连接）

ThreadingHTTPServer(("127.0.0.1", 8000), Handler).serve_forever()
```

```console
$ curl -sv http://127.0.0.1:8000/index.html http://127.0.0.1:8000/style.css
* Established connection to 127.0.0.1 (127.0.0.1 port 8000) from 127.0.0.1 port 51946
> GET /index.html HTTP/1.1
> Host: 127.0.0.1:8000
> User-Agent: curl/8.18.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: SimpleHTTP/0.6 Python/3.14.4
< Date: Tue, 27 Oct 2026 07:44:46 GMT
< Content-type: text/html
< Content-Length: 60
< Last-Modified: Tue, 27 Oct 2026 07:44:25 GMT
<
<!doctype html>
<title>Hello</title>
<p>Hello, network.</p>
* Reusing existing http: connection with host 127.0.0.1
> GET /style.css HTTP/1.1
...
< HTTP/1.1 200 OK
< Content-type: text/css
< Content-Length: 29
```

（输出在标出之处有删节。）这就是万维网核心协议的全部：几行文本，按名字请求一个资源；回信也是几行文本，加上资源本身。本章其余的一切——持续连接、缓存、Cookie、HTTP/2 和 HTTP/3、把 `www.example.org` 变成地址的域名系统、电子邮件与内容分发网络——都是为了让这个交换对数十亿用户而言快速、可扩展且安全。

**应用层**是网络应用程序的所在地：万维网、电子邮件、视频通话、游戏、文件同步。这一层的协议数量最多、也最引人注目，而且是最多程序员直接设计或使用的协议。我们详细研究其中最古老也最重要的三个，并用它们来说明每个应用层协议都必须回答的问题：谁和谁通信、消息长什么样、下面的传输层提供什么、以及设计如何应对规模与对手。

## 网络应用的组织方式

一个网络应用是一组运行在不同主机上、通过网络相互通信的程序。这些程序是[[computer-systems/exceptions-processes]]意义上的**进程**，它们通过操作系统交换消息。

::: definition 客户端、服务器与套接字 {#def-client-server}
在**客户端–服务器**体系结构中，**服务器**是运行在常开主机上、拥有固定知名地址、等待请求的进程；**客户端**是主动联系服务器、发送请求并接收响应的进程。在**对等**（peer-to-peer）体系结构中，主机（**对等方**）相互兼作客户端与服务器，不依赖专用服务器。

进程通过**套接字**收发消息，套接字是应用层与传输层之间的接口。一个进程在网络上的标识是它所在主机的 **IP 地址**加上该主机上的一个 16 位**端口号**。知名服务器使用标准端口：HTTP 用 80，HTTPS 用 443，DNS 用 53，邮件服务器之间的 SMTP 用 25。
:::

万维网和电子邮件是客户端–服务器的；用 BitTorrent 共享文件和许多视频通话的媒体通路是对等的。对等设计天然可扩展——每个新对等方既带来需求也带来容量——但必须应对来来去去的对等方和地址转换器后面的主机（[[networks/network-layer]]）。今天大多数大型服务仍是客户端–服务器的，其中的“服务器”实际上是一个拥有数千台机器、共用一个名字的数据中心。

应用自己选择需要的传输服务。**TCP** 提供带拥塞控制的可靠、有序字节流；**UDP** 逐个交付数据报，不做任何保证，自身也不添时延；较新的、构建在 UDP 之上的传输协议 **QUIC** 提供多条可靠流并内置加密。它们都不保证吞吐量或定时：需要最低速率（视频）或有界时延（语音）的应用必须适应网络所能提供的东西。套接字编程是 [[networks/sockets]] 的主题，传输协议本身在 [[networks/reliable-transport]] 与 [[networks/tcp-congestion]] 中构造。

::: definition 应用层协议 {#def-app-protocol}
**应用层协议**规定所交换消息的类型（请求与响应）、它们的语法（字段及其分隔方式）、语义（字段的含义），以及进程何时、如何发送和响应消息的规则。HTTP、SMTP 这类开放协议以 RFC 公布，因而彼此独立的实现之间能够互通；许多应用使用私有协议。
:::

## 万维网与 HTTP

一个**网页**由一个 **HTML 基文件**和它所引用的**对象**组成：图像、样式表、脚本、字体。每个对象由一个 **URL**（如 `https://www.example.org/images/logo.png`）命名：一个协议方案（`https`）、一个主机名（`www.example.org`）和一个路径（`/images/logo.png`）。**超文本传输协议**（HTTP）定义客户端（浏览器）如何请求对象、服务器如何响应。它的语义——方法、状态码、首部字段、缓存——在 RFC 9110（2022）中对所有版本统一定义；各版本在网线上使用的格式分别是 RFC 9112（HTTP/1.1）、RFC 9113（HTTP/2）和 RFC 9114（HTTP/3）。

::: definition HTTP 消息 {#def-http}
一条 HTTP/1.1 **请求**由一个请求行——**方法**、请求目标和版本，如 `GET /index.html HTTP/1.1`——后接若干形如 `Name: value` 的**首部字段**（每行一个）、一个空行和一个可选**主体**构成。每行以回车加换行（`\r\n`）结束。`Host` 首部在 HTTP/1.1 中是必须的，这样一个服务器地址才能承载许多网站。

一条**响应**由一个状态行——版本、三位**状态码**和一句理由短语，如 `HTTP/1.1 200 OK`——后接首部字段、一个空行和主体构成。主体的长度由 `Content-Length` 或分块传输编码给出。
:::

常用方法有 `GET`（获取资源）、`HEAD`（同上，只要首部）、`POST`（提交数据请其处理）、`PUT`（存放一个资源）和 `DELETE`。`GET`、`HEAD`、`PUT` 与 `DELETE` 是**幂等**的——重复执行与执行一次效果相同——当响应丢失后客户端重试时这一点就重要了。状态码按首位数字分组：1xx 信息性、2xx 成功（`200 OK`）、3xx 重定向（`301 Moved Permanently`、`304 Not Modified`）、4xx 客户端错误（`404 Not Found`、`403 Forbidden`）、5xx 服务器错误（`500 Internal Server Error`、`503 Service Unavailable`）。

HTTP 是**无状态的**：服务器不保留对同一客户端先前请求的记忆。这让服务器很简单，并让请求可以由许多台机器中的任何一台应答。需要状态的应用——购物车、登录——使用 **Cookie**（RFC 6265）：服务器在响应中发送 `Set-Cookie: session=…`，浏览器在之后访问该网站的请求中带回 `Cookie: session=…`。Cookie 也是跨站跟踪背后的机制，这就是浏览器如今限制“第三方” Cookie（由被访问网站之外的网站设置的 Cookie）的原因。

### 连接与响应时间

HTTP 运行在 TCP（HTTP/1.1 和 HTTP/2）或 QUIC（HTTP/3）之上。第一个请求之前，TCP 需要一个**三次握手**：客户端发出连接请求，服务器应答，客户端确认——并且可以连同确认一起发出自己的请求。所以在一条新 TCP 连接上发一个请求，要付出打开连接一个往返、请求与响应又一个往返的代价。

::: proposition HTTP 响应时间 {#prop-http-time}
一个网页由一个基文件和同一服务器上的 $n$ 个其他小对象组成；往返时间为 $\text{RTT}$，发送时间可忽略，不使用 TLS。则最后一个对象到达之前的时间为

- 逐条先后打开的**非持续连接**（每个对象一条新 TCP 连接）：$2(n + 1)\,\text{RTT}$；
- 一条**持续连接**、每个请求在上一响应之后才发出：$(n + 2)\,\text{RTT}$；
- 一条持续连接、基文件解析出来后把 $n$ 个对象的请求一次性发出（HTTP/1.1 的流水线，或 HTTP/2、HTTP/3 的多路复用）：$3\,\text{RTT}$。
:::

::: proof
一次非持续获取需要握手一个 RTT、请求与响应一个 RTT，即每个对象 $2$ 个 RTT，而 $n + 1$ 次获取是串行的。持续连接时握手只付一次（$1$ 个 RTT）；随后基文件（$1$ 个 RTT）和 $n$ 个对象（每个 $1$ 个 RTT）依次而来，得 $(n + 2)$ 个 RTT。若基文件一解析完就把所有对象的请求一起发出，它们的响应会在再一个 RTT 内全部返回：$1 + 1 + 1 = 3$ 个 RTT。（对象不能在基文件到达之前被请求，因为客户端是从基文件里才知道对象名字的。）
:::

::: example 一个十幅图像的网页 {#ex-page-time}
一个网页有一个基文件和 $10$ 幅图像。到服务器的 RTT 是 $40$ ms。对 [[#prop-http-time]] 的三种情形分别计算网页装入时间。
::: solution
非持续、串行：$2 \times 11 \times 40 = 880$ ms。持续但不流水线：$12 \times 40 = 480$ ms。持续且所有请求一次发出：$3 \times 40 = 120$ ms。HTTP/2 之前的浏览器通过每台服务器最多开六条并行 TCP 连接来绕开串行请求的开销；HTTP/2 下，一条连接就并发承载所有请求。若服务器在另一个大洲、RTT 为 $200$ ms，三个数字将是 $4.4$ s、$2.4$ s 和 $0.6$ s，而链路速率提高一百倍也不会改变其中任何一个——这是 [[networks/network-principles#ex-lfn]] 的警告换了一副面孔。
:::
:::

::: widget plot
f: 2*(x + 1)*r; (x + 2)*r; 3*r
x: 0, 20
y: 0, 2000
sliders: r=40:5:200:5
labels: \text{非持续连接}; \text{持续、串行}; \text{持续、并发}
caption: 网页装入时间（毫秒）随基文件引用对象数 $x$ 的变化，RTT 为 $r$ ms（[[#prop-http-time]]）。每条线都与 $r$ 成正比：把到服务器的距离减半，每条曲线都跟着减半——内容分发网络利用的正是这一点。注意并发请求让装入时间与对象数无关——直到对象大到发送时间（本模型忽略了它）开始占主导。
:::

### 缓存与条件请求

最快的请求是根本不发出的请求。**Web 缓存**（**代理**）保存最近获取对象的副本并自己应答重复请求；浏览器有私有缓存，机构和内容分发网络运行共享缓存。服务器用 `Cache-Control: max-age=3600`（秒）声明响应可以复用多久。当缓存中的副本可能过期时，缓存带着它先前拿到的验证器向源服务器发出**条件请求**询问是否已变——用 `Last-Modified` 里的日期配 `If-Modified-Since`，或用 `ETag` 里的实体标记配 `If-None-Match`。若对象未变，服务器回一个不带主体的 `304 Not Modified`。对上面那台本地服务器：

```console
$ curl -s -o /dev/null -D - -H "If-Modified-Since: Tue, 27 Oct 2026 07:44:25 GMT" \
       http://127.0.0.1:8000/index.html
HTTP/1.1 304 Not Modified
Server: SimpleHTTP/0.6 Python/3.14.4
Date: Tue, 27 Oct 2026 07:45:42 GMT
```

::: example 机构接入链路上的缓存 {#ex-cache}
某机构通往互联网的 20 Mb/s 接入链路承载平均 18 Mb/s 的 Web 流量，全部是对内部请求的响应。把链路建模为一个 M/M/1 队列（[[networks/network-principles#thm-mm1]]）。若在机构内部安装一个能应答 40% 请求的缓存（对等长对象而言，也即省去 40% 的流量），接入链路时延中排队的部分变为原来的几分之一？
::: solution
没有缓存时利用率 $\rho = 18/20 = 0.9$，链路上的平均时间为 $(1/\mu)/(1 - 0.9) = 10/\mu$。有了缓存，只有 $60\%$ 的流量穿越链路：$\rho = 0.6 \times 0.9 = 0.54$，平均时间为 $(1/\mu)/0.46 \approx 2.17/\mu$。链路时延缩小为约 $1/4.6$，而且 40% 的请求根本不再过链路，由快速的本地网络直接应答。一个远比升级接入链路便宜的缓存消去了大部分拥塞——这是对 [[networks/network-principles]] 那条陡峭曲线的直接应用。
:::
:::

### HTTP/2、HTTP/3 与 TLS

HTTP/1.1 的文本格式和一次只处理一个请求的连接，对上百个对象的网页成了瓶颈。**HTTP/2**（2015 年 RFC 7540，现为 RFC 9113）保留 HTTP 的语义但更换网线格式：消息被拆成属于带编号**流**的二进制**帧**，许多条流交错复用（多路复用）在一条 TCP 连接上，首部字段加以压缩（HPACK，RFC 7541）。这消除了 HTTP 层的**队首阻塞**——一个大响应不再拖累排在它后面的小响应——但消不掉 TCP 的：TCP 交付的是一个有序字节流，所以一个分组丢失时，连接上每条流都要等它重传，哪怕某条流的数据早已全部到达。

**HTTP/3**（RFC 9114，2022）通过运行在 **QUIC**（RFC 9000，2021）之上来解决这一点——QUIC 是 UDP 之上的传输协议，在一条连接里提供多条独立定序的流：丢失的分组只拖累它承载过数据的那些流。QUIC 还把传输握手与加密握手合二为一，并用连接标识符而不是地址来标识连接，因此手机从 Wi-Fi 切换到移动网络也能保住自己的连接。截至 2026 年，W3Techs 报告约 38–40% 的网站支持 HTTP/3，大型内容分发网络上的比例高得多。

如今几乎所有 Web 流量都用**传输层安全**（TLS 1.3，RFC 8446，2018）加密——`https` 是 HTTP over TLS over TCP，QUIC 内部使用 TLS 1.3 握手。TLS 提供**机密性**（窃听者只见密文）、**完整性**（篡改会被发现）与**服务器认证**：服务器用客户信任的证书授权机构签名的证书，证明它持有客户所请求名字对应的私钥。TLS 1.3 握手中，客户的第一条消息 `ClientHello` 就已带上它参与 Diffie–Hellman 密钥交换的那一份；服务器回以自己的那一份、它的证书和一个签名，此后一切都被加密。其中的数学属于 [[cryptography]]；此处要紧的是往返时间上的代价。

::: example 到第一个字节的时间 {#ex-ttfb}
浏览器以 RTT $50$ ms 从一台新服务器获取一个网页（服务器地址已知）。(a) HTTP/1.1 over TLS 1.3 over TCP，(b) 同样的组合换成较早的 TLS 1.2，(c) HTTP/3 over QUIC，(d) HTTP/3 恢复此前的会话并带 0-RTT 数据——每种情况下响应第一个字节要多久才能到达？
::: solution
(a) TCP 握手 $1$ 个 RTT、TLS 1.3 握手 $1$ 个 RTT、请求与响应 $1$ 个 RTT：$3 \times 50 = 150$ ms。(b) TLS 1.2 的完整握手要两个往返：$4 \times 50 = 200$ ms。(c) QUIC 把传输与 TLS 握手合成一个往返：$2 \times 50 = 100$ ms。(d) 带着从以前连接记住的密钥，客户可以在第一个飞行包里就发出请求（“0-RTT 数据”）：$1 \times 50 = 50$ ms。0-RTT 数据可能被记录下第一个飞行包并重新发送的攻击者**重放**，所以 TLS 1.3（RFC 8446 第 8 节）与 HTTP 把它限制在重复执行也安全的请求上，例如幂等的 `GET`。
:::
:::

::: warning HTTPS 不隐藏你访问哪个网站
TLS 加密请求与响应的内容——路径、Cookie、表单数据、页面——但不是全部。服务器的 IP 地址对路径上每个网络都可见。查询这个名字的 DNS 请求传统上是不加密发送的（除非使用下文的 DNS over TLS 或 DNS over HTTPS）。而服务器名字在 `ClientHello` 的**服务器名字指示**（Server Name Indication）字段里是明文发送的，这样承载多个网站的服务器才能选对证书——除非两端都支持较新的 Encrypted Client Hello 扩展。加密分组的尺寸和时间也能泄露多得惊人的信息。HTTPS 保护“你在某个网站上做什么”远好于保护“你访问哪个网站”。
:::

## 域名系统

人使用 `www.example.org` 这样的名字；IP 把分组按 `192.0.2.10` 或 `2001:db8::10` 这样的地址路由。**域名系统**（DNS，RFC 1034 与 RFC 1035，1987）就是把前者映射到后者——以及做更多事情——的分布式数据库。几乎每一次网络交互都始于一次 DNS 查询。

一台中央名字服务器会是单点故障、流量瓶颈、离大多数用户都很远，而且对数亿个名字而言根本不可能保持更新。DNS 转而把数据库分布在服务器的层次上，每台负责**名字空间**的一块。

::: definition DNS 名字空间、区域与服务器 {#def-dns}
域名构成一棵树：树顶是**根**，其下是**顶级域**（TLD）如 `org`、`uk`、`com`，再下是它们的子域；一个名字把它的各段标签从叶子到根、用点分隔地列出来。这棵树划分为若干**区域**，每个区域由一个组织管理，并由它的**权威名字服务器**提供服务；权威服务器持有区域内名字的权威记录，并把子树**委托**给其他区域。

- **根服务器**知道每个 TLD 的权威服务器。根服务器标识共 13 个，`a.root-servers.net` 到 `m.root-servers.net`，由 12 个独立运营者运行，每一个都通过任意播（anycast）在许多地点设有复制实例（[[networks/routing]]）。
- **TLD 服务器**知道注册在该 TLD 下的每个域的权威服务器。
- **权威服务器**回答本区域内名字的问题。

客户端通常不直接找它们。主机把查询发给一个**递归解析器**（由其 ISP、所属机构或某个公共服务运营），解析器通过询问权威服务器求得答案，并把学到的东西**缓存**起来。
:::

::: definition 资源记录 {#def-rr}
DNS 数据库由**资源记录** $(\text{name}, \text{TTL}, \text{class}, \text{type}, \text{value})$ 组成，其中 **TTL**（生存时间）以秒为单位给出该记录可以被缓存多久，class 几乎总是 `IN`（internet）。常见类型：

| 类型 | 值 |
|---|---|
| `A` | 该名字的一个 IPv4 地址 |
| `AAAA` | 该名字的一个 IPv6 地址 |
| `NS` | 所命名区域的一个权威服务器的名字 |
| `CNAME` | 本名字所指向的规范名字（本名字是它的别名） |
| `MX` | 该域的邮件服务器，带一个优先级号 |
| `TXT` | 自由文本，用于域名验证和邮件认证 |
| `SOA` | 区域的管理数据（序列号、定时器） |
:::

::: algorithm 迭代解析 {#alg-dns-resolve}
一个递归解析器按如下方式回答关于名字 $q$、类型 $t$ 的查询：

1. 若缓存中有一个关于 $(q, t)$ 的有效（未过期）答案，返回它。
2. 设 $S$ 为最近的、其 `NS` 记录已在缓存中的包含区域的服务器（最坏情形是根服务器，其地址作为**根提示**预先配置）。
3. 重复：
   1. 把查询 $(q, t)$ 发给 $S$ 中的一台服务器。
   2. 若回复是答案，连同其 TTL 一起缓存并返回。
   3. 若回复是**引用**（referral）——关于更接近 $q$ 的区域的 `NS` 记录，通常还带着这些服务器的地址（“胶合”，glue）——就缓存它们，并把 $S$ 设为这些服务器。
   4. 若回复说该名字不存在（`NXDOMAIN`），缓存这个否定答案（RFC 2308）并返回它。
:::

解析器发出的查询是**迭代**的（每台服务器只按自己所知作答——答案或引用），而客户端发给解析器的查询是**递归**的（解析器包办全部工作）。每一步都严格地沿树向 $q$ 下行，所以只要委托中没有环，算法至多经过 $q$ 的标签数那么多次引用就会结束（外加对未带胶合地址的名字服务器名字、以及 `CNAME` 链的额外查询）。

::: example 从头解析一个名字 {#ex-resolve}
一台笔记本向它的解析器查询 `www.example.org` 的 `A` 记录。解析器的缓存是空的。RTT 分别为：笔记本到解析器 $10$ ms，解析器到某台根服务器 $20$ ms，到 `org` 服务器 $30$ ms，到 `example.org` 的权威服务器 $80$ ms。跟踪解析过程，求出时延；并求一分钟后再查询 `mail.example.org` 的时延。
::: solution
1. 笔记本 → 解析器：`www.example.org A?`（递归）。
2. 解析器 → 根服务器：`www.example.org A?`。回复：一条引用，“`org` 由这些名字服务器负责”，并附上它们的地址。
3. 解析器 → 某 `org` 服务器：同样的问题。回复：指向 `example.org` 的名字服务器的引用。
4. 解析器 → 某 `example.org` 服务器：同样的问题。回复：权威答案 `www.example.org. 300 IN A 192.0.2.10`。
5. 解析器 → 笔记本：答案。解析器把它缓存 300 s。

时延为 $10 + 20 + 30 + 80 = 140$ ms。一分钟后，解析器还留着 `example.org` 的 `NS` 记录（委托的 TTL 通常是几小时甚至几天），所以直接跳到第 4 步：$10 + 80 = 90$ ms。若 300 s 内第三次查询 `www.example.org`，则从缓存以 $10$ ms 应答。缓存正是 DNS 可扩展的原因：根服务器只看到全部查询中极小的一部分。
:::
:::

### DNS 消息

DNS 的查询与回复共用一个二进制格式（RFC 1035，第 4 节）。12 字节的**首部**含一个 16 位**标识符**，由查询者选定并复制进回复，使回复能与查询配对；16 位标志（本条是查询还是响应 `QR`、操作码、“权威应答” `AA`、“截断” `TC`、“希望递归” `RD`、“可以递归” `RA`，以及 4 位响应码 `RCODE`——0 表示无错误，3 表示 `NXDOMAIN`）；还有四个 16 位计数：问题、答案、权威记录和附加记录各几条。之后是这些节本身。一个名字编码成若干**标签**的序列：每个标签是一个长度字节加上那么多个字符，以表示根的零字节结尾；为省空间，名字的后继出现可以换成一个 2 字节的**指针**，其最高 2 位为 `11`，其余 14 位是该名字先前副本在消息中的偏移。

想看到这个格式，下面是一个只服务一个名字的玩具权威服务器，它可以在你自己的机器上运行。它监听环回地址的 UDP 端口 5353，因此不需要特权，也不碰任何真实网络。地址段 `192.0.2.0/24` 和后缀 `.test` 为文档与测试保留（RFC 5737、RFC 6761），不会与真实值冲突。

```python
# dnstoy.py：一个只服务一个名字的玩具权威 DNS 服务器，监听 127.0.0.1:5353（UDP）
import socket, struct

ZONE = {"www.example.test": "192.0.2.10"}       # 名字 -> IPv4 地址（A 记录）

def parse_name(msg, i):
    labels = []
    while msg[i] != 0:                          # 一串带长度前缀的标签
        n = msg[i]
        labels.append(msg[i + 1:i + 1 + n].decode("ascii"))
        i += 1 + n
    return ".".join(labels).lower(), i + 1      # 跳过结尾的零字节

def answer(query):
    qid, flags = struct.unpack("!HH", query[:4])
    name, end = parse_name(query, 12)
    qtype, qclass = struct.unpack("!HH", query[end:end + 4])
    question = query[12:end + 4]
    rcode = 0 if name in ZONE else 3            # 3 = NXDOMAIN（无此名字）
    rd = flags & 0x0100                         # 回显“希望递归”位
    found = rcode == 0 and qtype == 1 and qclass == 1
    header = struct.pack("!HHHHHH", qid, 0x8400 | rd | rcode,   # QR=1，AA=1
                         1, 1 if found else 0, 0, 0)
    if not found:
        return header + question
    rr = struct.pack("!HHHIH", 0xC00C, 1, 1, 300, 4)   # 指向名字的指针、A、IN、TTL、长度
    return header + question + rr + socket.inet_aton(ZONE[name])

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("127.0.0.1", 5353))
while True:
    query, client = sock.recvfrom(512)
    sock.sendto(answer(query), client)
```

（它信任自己的输入，而真正的服务器绝不可以这样：一个截断的或恶意的查询会让它抛出异常。）标准工具 `dig` 可以向它查询：

```console
$ python3 dnstoy.py &
$ dig @127.0.0.1 -p 5353 www.example.test A +norecurse
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39301
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.example.test.		IN	A

;; ANSWER SECTION:
www.example.test.	300	IN	A	192.0.2.10

;; Query time: 1 msec
;; SERVER: 127.0.0.1#5353(127.0.0.1) (UDP)
;; MSG SIZE  rcvd: 50
```

::: example 逐字节的 DNS 查询 {#ex-dns-bytes}
手工构造对 `www.example.test`、类型 `A` 的查询，把它发给玩具服务器并解码回复。
::: solution
```python
# dnsquery.py：手工构造 DNS 查询，发给玩具服务器，解码回复
import socket, struct

def encode_name(name):
    out = b""
    for label in name.split("."):
        out += bytes([len(label)]) + label.encode("ascii")
    return out + b"\x00"

query = (struct.pack("!HHHHHH", 0x1234, 0x0000, 1, 0, 0, 0)   # ID、标志、1 个问题
         + encode_name("www.example.test") + struct.pack("!HH", 1, 1))  # 类型 A，类别 IN
print("query ", len(query), "bytes:", query.hex(" "))

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.settimeout(2)
sock.sendto(query, ("127.0.0.1", 5353))
reply, _ = sock.recvfrom(512)
print("reply ", len(reply), "bytes:", reply.hex(" "))
qid, flags, qd, an, ns, ar = struct.unpack("!HHHHHH", reply[:12])
print(f"id={qid:#06x} flags={flags:#06x} answers={an}")
ttl, rdlen = struct.unpack("!IH", reply[-10:-4])
print("TTL", ttl, "address", socket.inet_ntoa(reply[-4:]))
```

```console
$ python3 dnsquery.py
query  34 bytes: 12 34 00 00 00 01 00 00 00 00 00 00 03 77 77 77 07 65 78 61 6d 70 6c 65 04 74 65 73 74 00 00 01 00 01
reply  50 bytes: 12 34 84 00 00 01 00 01 00 00 00 00 03 77 77 77 07 65 78 61 6d 70 6c 65 04 74 65 73 74 00 00 01 00 01 c0 0c 00 01 00 01 00 00 01 2c 00 04 c0 00 02 0a
id=0x1234 flags=0x8400 answers=1
TTL 300 address 192.0.2.10
```

读查询：`12 34` 是标识符；`00 00` 是标志（标准查询，不希望递归）；`00 01` 一个查询，其后是三个零计数。名字是 `03 77 77 77`（“3，`www`”）、`07` 加 `example`、`04` 加 `test`、`00`；然后是类型 `00 01`（A）和类别 `00 01`（IN）。名字占 $1 + 3 + 1 + 7 + 1 + 4 + 1 = 18$ 字节，查询共 $12 + 18 + 4 = 34$ 字节。

回复重复了标识符和查询部分。它的标志 `84 00` 二进制为 `1000 0100 0000 0000`：`QR` = 1（响应），操作码 0，`AA` = 1（权威），`RCODE` = 0。答案记录以 `c0 0c` 开头——一个指针（最高 2 位 `11`），指向偏移 `0x0c` = 12，即名字在查询部分开始的地方——用 2 字节顶替了 18 字节。然后是类型 A、类别 IN、TTL `00 00 01 2c` = 300 秒、数据长度 4，以及地址 `c0 00 02 0a` = 192.0.2.10。总计 $34 + 16 = 50$ 字节，与 `dig` 报告的一致。
:::
:::

DNS 通常运行在 UDP 端口 53 之上：一次查询就是一个小查询加一个小回复，丢掉的那次在超时后重新发送就是了。对一条 UDP 报文来说太大的回复会置起 `TC` 标志，改由 TCP 重新获取。加密传输——DNS over TLS（RFC 7858）和 DNS over HTTPS（RFC 8484）——能向客户端与其解析器之间的各网络隐藏查询内容，不过解析器本身仍然看得到它们。

### 对 DNS 的攻击与其防御

因为解析器接受一个 UDP 回复，只要它的标识符和问题与解析器发出的某个查询相匹配，一个在路径之外、能猜中这两个值的攻击者就能赶在真正的服务器之前送回伪造的回复，让假数据被缓存——**缓存投毒**。丹·卡明斯基（Dan Kaminsky）在 2008 年表明：询问许多随机的不存在名字，就给攻击者提供了无穷多次赛跑的机会，单靠 16 位标识符毫无希望。应急的防御是把解析器 UDP 源端口也随机化（RFC 5452），使猜测空间扩大数万倍。长久之计是 **DNSSEC**（RFC 4033–4035）：区域给自己的记录签名，解析器沿一条从根开始的信任链验证签名，于是伪造的记录无论来得多快都会被拒绝。DNS 还被用来放大拒绝服务攻击，因为一个用伪造源地址发出的小查询能引出发往受害者的巨大回复；对策是解析器只服务自己的客户、限速，以及网络边缘的源地址过滤（[[networks/network-principles]]）。

::: quiz
一个解析器刚查询过 `www.example.org`，收到 `org` 的 `NS` 记录（TTL 2 天）、`example.org` 的 `NS` 记录（TTL 1 天）和 `www.example.org` 的 `A` 记录（TTL 5 分钟）。一小时后，一个客户请求 `shop.example.net`，一个在另一个 TLD 中的名字。解析器必须联系哪些服务器？
- [x] 一台根服务器，然后一台 `net` 服务器，再然后 `example.net` 的一个权威服务器。
- [ ] 只需 `example.net` 的一个权威服务器，因为 `example` 已被缓存。
- [ ] 只需 `org` 服务器，由它转发查询。
- [ ] 哪家都不用：答案在缓存里。
::: solution
缓存里没有任何东西有用：缓存存着 `org` 和 `example.org` 的委托，但 `example.net` 在 `net` 区，所以最近的已缓存包含区域是根。解析器需要完整的链条：根 → `net` → `example.net`（并顺手缓存 `net` 的委托备用）。名字是从右往左逐标签匹配的；`example.net` 和 `example.org` 除了根没有任何共同之处。
:::
:::

## 电子邮件

电子邮件仍在大体量使用，是历史最悠久的应用，其体系结构早于万维网。邮件从发件人的**用户代理**（邮件程序或网页邮箱页面）发出，到达发件人的**邮件服务器**，后者用运行在 TCP 端口 25 上的**简单邮件传输协议**（SMTP，RFC 5321）把它转递到收件人的邮件服务器。收件人的邮件服务器把邮件存进邮箱，收件人的用户代理稍后用 **IMAP（RFC 9051）之类的访问协议**或通过网页界面把它取回。SMTP 是一个*推送*协议（由发送方发起传输）；取回则是*拉取*。转递的服务器通过查询 `@` 之后那个域的 `MX` 记录找到收件人的服务器。

SMTP 的一次交换是文本命令与三位数字回复构成的对话，风格与 HTTP 相同。下面是虚构域 `example.org` 与 `example.net` 两台服务器之间一次有代表性的会话（S = 接收服务器，C = 发送服务器）：

```text
S: 220 mx.example.net ESMTP ready
C: EHLO mail.example.org
S: 250-mx.example.net
S: 250 STARTTLS
C: STARTTLS
S: 220 Go ahead
   （TLS 握手；会话接着在加密下继续）
C: MAIL FROM:<alice@example.org>
S: 250 OK
C: RCPT TO:<bob@example.net>
S: 250 OK
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: From: Alice <alice@example.org>
C: To: Bob <bob@example.net>
C: Subject: Lunch
C:
C: Are you free at one?
C: .
S: 250 OK: queued
C: QUIT
S: 221 Bye
```

注意两个层次的地址：**信封**（`MAIL FROM`、`RCPT TO`），SMTP 用它投递；以及**邮件首部**（`From:`、`To:`，由 RFC 5322 定义），它是邮件内容的一部分、展示给读者看。原始 SMTP 不检验这两者中任何一个是否真实，这就是伪造发件人地址成为垃圾邮件与钓鱼常态的原因。现代防御层层叠加：**SPF**（RFC 7208）在 DNS 中公布哪些服务器可以为某域发邮件，**DKIM**（RFC 6376）让发件域给邮件签名，**DMARC**（RFC 7489）告诉接收方如何处置通不过这些检查的邮件。`STARTTLS`（RFC 3207）加密服务器之间每一跳的传输，但不加密存在服务器上的邮件本身。

## 内容分发网络

一个流行的视频服务或软件更新无法由一个数据中心来服务：对远方用户而言 RTT 会让每个请求都很慢（[[#prop-http-time]]），数据中心的链路会成为瓶颈，同样的字节会千万次地穿越同样的昂贵长距离链路。**内容分发网络**（CDN）转而把内容副本存放在许多地点的服务器上——在接入 ISP 内部、在互联网交换点、在区域数据中心——并把每个客户导向一个就近的副本。

起导向作用的机制有两个。一是 **DNS 重定向**：内容提供商的名字（比如 `video.example.com`）是 CDN 区域中某个名字的 `CNAME`，其权威服务器针对每个查询，用一个为发起查询的解析器挑好的集群的地址作答——离它近、负载轻、并且持有该内容。二是**任意播**（anycast）：许多集群向路由系统宣告*同一个* IP 地址，由路由本身把每个客户的分组送到就近的集群（[[networks/routing]]）。无论哪种方式，RTT 都从几百毫秒降到几毫秒，提供商的链路对每个对象只需为每个集群承载一次而不是为每个用户承载一次，而流量骤增——或一场拒绝服务攻击——的冲击被摊到整个网络上。

::: history
蒂姆·伯纳斯-李（Tim Berners-Lee）1989 年 3 月在 CERN 提出万维网，到 1990 年底就让第一台服务器、浏览器和 HTML 运行起来；HTTP 起初是一个只有一行的协议，先以 HTTP/1.0 写入 RFC 1945（1996），后以 HTTP/1.1 写入 RFC 2068（1997）和 RFC 2616（1999）。DNS 之前，每台 ARPANET 主机的名字都列在一个单文件 `HOSTS.TXT` 里，由 SRI 维护、人人转发拷贝；保罗·莫卡佩特里斯（Paul Mockapetris）1983 年设计了域名系统（RFC 882 和 883），1987 年修订为 RFC 1034 和 1035。机器之间的电子邮件比这两者都早：雷·汤姆林森（Ray Tomlinson）1971 年发出第一封网络邮件，并选定了 `@` 符号；乔恩·波斯特尔（Jon Postel）的 SMTP 于 1982 年以 RFC 821 发表。Akamai 公司 1998 年从麻省理工学院的研究中创办，建成了第一个大型商用 CDN。谷歌的实验性协议 SPDY（2009）成为 HTTP/2（2015）的基础，其 QUIC 实验（始于 2012 年）由 IETF 于 2021 年标准化为 RFC 9000，HTTP/3 随后于 2022 年写入 RFC 9114。
:::

## 后续内容

下一章 [[networks/sockets]] 将用 Python 和 C 写出本章这样的客户端和服务器。[[networks/reliable-transport]] 与 [[networks/tcp-congestion]] 打开 HTTP、SMTP 和 DNS 赖以为生的传输层，解释 [[#prop-http-time]] 中数过的那些握手，以及 TCP 的单一字节流为什么造成队首阻塞。任意播以及 CDN 所利用的路由属于 [[networks/routing]]。TLS、证书及其背后的公钥密码学在 [[cryptography]] 与 [[security]] 中展开，散布在许多数据中心的复制服务在 [[distributed-systems]] 中讨论。

::: summary
- 应用的组织方式是**客户端–服务器**或**对等**；进程通过以 IP 地址和端口标识的**套接字**通信，并按所需服务挑选传输协议（TCP、UDP 或 QUIC）。
- **HTTP** 是一个由方法、状态码和首部字段构成的无状态请求–响应协议（RFC 9110）；Cookie 给它加上状态。
- 网页装入时间由往返时间主导：非持续连接每个对象花 $2$ 个 RTT，持续连接花 $1$ 个，并发请求使花销与对象数无关（[[#prop-http-time]]）。
- **缓存**与**条件请求**（`304 Not Modified`）避免传输；一个缓存能消去繁忙接入链路上的大部分排队（[[#ex-cache]]）。
- **HTTP/2** 在一条 TCP 连接上复用多条流；**HTTP/3** 跑在 **QUIC** 上，除掉了 TCP 的队首阻塞，并把传输与 TLS 1.3 握手合二为一。
- **DNS** 是一个分层的、带缓存的分布式资源记录数据库；解析器从根开始迭代地解析名字（[[#alg-dns-resolve]]），缓存使它可扩展。它的二进制消息格式用指针压缩名字。
- **SMTP** 在服务器之间推送邮件；SPF、DKIM、DMARC 和 TLS 是后加的补丁，用来弥补它缺乏认证。**CDN** 通过就近副本提供服务把往返时间降下来，副本由 DNS 或任意播选定。
:::

## 习题

::: exercise 串行的非持续连接 {level=1 check="880"}
一个网页有一个基文件和同一服务器上的 10 个小图像，RTT 为 40 ms。用逐条先后打开的非持续连接、忽略发送时间，网页装载要花多长时间？（时间以毫秒为单位。）
::: solution
由 [[#prop-http-time]]，$11$ 个对象各需 $2$ 个 RTT（握手，然后请求与响应）：$2 \times 11 \times 40 = 880$ ms（[[#ex-page-time]]）。
:::
:::

::: exercise 读懂状态码 {level=1}
解释客户端收到下列每个响应后应当做什么：(a) 带 `Location: https://www.example.org/new` 的 `301 Moved Permanently`；(b) `304 Not Modified`；(c) `404 Not Found`；(d) 带 `Retry-After: 120` 的 `503 Service Unavailable`。
::: solution
(a) 资源有了新的永久 URL，在 `Location` 中给出：改从那里获取；缓存或书签可以更新旧的 URL。(b) 客户端发的是条件请求，且它的缓存副本仍然有效：使用缓存副本（并根据响应首部刷新它的新鲜期）。(c) 服务器在该 URL 上没有资源：显示错误；除非情况有变，重试无济于事。(d) 服务器暂时过载或在维护：至少等 120 秒再试。客户端立即而反复的重试会让过载更糟，这正是这类提示——以及带随机化的递增退避——重要之处。
:::
:::

::: exercise 网线上的名字 {level=1 check="17"}
名字 `www.example.com` 在 DNS 消息中完整写出（不用压缩指针）要占多少字节？（输入字节数。）
::: solution
每个标签是一个长度字节加上标签本身的字符，名字以一个零字节结尾：$(1 + 3) + (1 + 7) + (1 + 3) + 1 = 17$ 字节。一般地，$k$ 个标签、共 $c$ 个字符的名字占 $c + k + 1$ 字节，即点分名字的长度再加 $2$。
:::
:::

::: exercise 握手与第一个字节 {level=2 check="150"}
一个已有缓存 DNS 答案的浏览器以 RTT 50 ms 连接一台新服务器，用 HTTP/1.1 over TLS 1.3 over TCP 请求一个网页。响应的第一个字节多久到达？改用 HTTP/3 能省下多少？（第一个时间以毫秒为单位。）
::: solution
TCP 握手（$1$ 个 RTT）、TLS 1.3 握手（$1$ 个 RTT）和请求与响应（$1$ 个 RTT）：$150$ ms。HTTP/3 over QUIC 把前两者合二为一，得 $100$ ms——每条新连接省 $50$ ms，即三分之一（[[#ex-ttfb]]）。
:::
:::

::: exercise 接入链路上的缓存 {level=2 check="0.54"}
在 [[#ex-cache]] 中，缓存安装后接入链路的利用率是多少？要把利用率降到 $0.45$ 又需要多大的命中率？（输入装上 40% 命中率缓存后的利用率。）
::: solution
链路承载 $1 - h$ 的流量，$h$ 是命中率。$h = 0.4$ 时：$\rho = 0.6 \times 18/20 = 0.54$。要 $\rho = 0.45$，需 $(1 - h) \times 0.9 = 0.45$，故 $h = 0.5$。（大小不一的对象会让事情复杂化：要紧的是缓存服务的**字节**比例，它通常小于请求的比例，因为热门对象往往很小。）
:::
:::

::: exercise 数一数 DNS 查询 {level=2 check="3"}
一个缓存里只有根提示的解析器解析 `www.cs.example.ac.uk`。假设每处区域边界都在一个点上——`uk`、`ac.uk`、`example.ac.uk`、`cs.example.ac.uk` 是各自独立的区域——且每次引用都带胶合地址。(a) 解析器要发出多少个查询？(b) 若 `uk` 和 `ac.uk` 由同一批服务器服务，`uk` 服务器自己回答 `ac.uk` 那一段，而 `cs.example.ac.uk` 不是独立区域、只是 `example.ac.uk` 的一部分，解析器要发多少个查询？（输入 (b) 的答案。）
::: solution
(a) 根（引用到 `uk`）、`uk`（引用到 `ac.uk`）、`ac.uk`（引用到 `example.ac.uk`）、`example.ac.uk`（引用到 `cs.example.ac.uk`）、`cs.example.ac.uk`（答案）：$5$ 个查询。(b) 根引用到 `uk` 服务器；它们也持有 `ac.uk` 区域，直接引用到 `example.ac.uk`；后者的服务器回答 `www.cs.example.ac.uk`，因为不存在更深的委托：$3$ 个查询。查询数取决于区域在哪里切分，而不取决于标签数。
:::
:::

::: exercise 并行连接 {level=3 check="240"}
HTTP/2 之前，浏览器通过至多 $k$ 条并行连接获取对象。(a) 证明：在 [[#prop-http-time]] 的假设下，一个基文件加 $n$ 个小对象的网页，用非持续连接、每次至多 $k$ 条地获取，耗时 $2\,\text{RTT}\,(1 + \lceil n/k \rceil)$。(b) 对 $n = 10$、$k = 5$、$\text{RTT} = 40$ ms 求值。(c) 若改用 $k$ 条持续连接、每条在上一个响应之后才发出下一个请求，相应的时间是多少？并行连接为什么可能对瓶颈链路上的其他用户不公平？（把 (b) 的时间以毫秒为单位输入。）
::: solution
(a) 基文件需要自己的一条连接（$2$ 个 RTT），因为在它到达之前谁也不知道对象的名字。$n$ 个对象随后以每轮至多 $k$ 个并发获取的方式推进；每轮 $2$ 个 RTT（握手和请求–响应，在所有连接上并行），共需 $\lceil n/k\rceil$ 轮。合计：$2\,\text{RTT}(1 + \lceil n/k\rceil)$。

(b) $2 \times 40 \times (1 + 2) = 240$ ms。

(c) 打开第一条连接并获取基文件（$2$ 个 RTT）；打开其余 $k-1$ 条连接（$1$ 个 RTT，不过浏览器可以在基文件到达的同时把它们打开），然后在每条连接上依次获取 $\lceil n/k\rceil$ 个对象，$\lceil n/k\rceil$ 个 RTT。至多 $(3 + \lceil n/k\rceil)$ 个 RTT $= 200$ ms，若多余连接开得早就 $(2 + \lceil n/k \rceil)$ 个 RTT $= 160$ ms。拥塞控制（[[networks/tcp-congestion]]）大致*按连接*均分瓶颈，所以六条连接的客户端大约得到单条连接客户端六倍的份额：并行连接改善一个用户的装入时间，一部分是从别人那里拿来的。HTTP/2 的单条复用连接消除了这个动机。
:::
:::

::: exercise 解码压缩名字 {level=3}
写一个 Python 函数 `decode_name(msg, i)`，从消息 `msg` 的偏移 `i` 处开始解码 DNS 名字，沿压缩指针前进，返回名字以及*原位置上*紧随其后的偏移（若跟过指针，则指指针之后）。对指针成环的消息必须拒绝。在 [[#ex-dns-bytes]] 那个 50 字节的回复上测试它。
::: solution
指针会跳到别处，但*正在解析的那条记录里的名字*在两个指针字节之后恰好结束，所以第一次跟指针时要记住那个位置。恶意消息可以包含指向自身的指针；真正的解析器会限制跳转次数（或要求指针严格向后指）。

```python
def decode_name(msg, i):
    """返回 msg[i] 处 DNS 名字的 (name, next_index)。"""
    labels, end, hops = [], None, 0
    while True:
        n = msg[i]
        if n == 0:                         # 根标签：名字到此完整
            i += 1
            break
        if n & 0xC0 == 0xC0:               # 压缩指针：14 位偏移
            if end is None:
                end = i + 2                # 名字在指针之后结束
            i = ((n & 0x3F) << 8) | msg[i + 1]
            hops += 1
            if hops > 64:
                raise ValueError("pointer loop")
            continue
        labels.append(msg[i + 1:i + 1 + n].decode("ascii"))
        i += 1 + n
    return ".".join(labels), (end if end is not None else i)

reply = bytes.fromhex("12348400000100010000000003777777076578616d706c6504746573740000010001"
                      "c00c000100010000012c0004c000020a")
print(decode_name(reply, 12))      # 问题部分
print(decode_name(reply, 34))      # 答案的名字：指向偏移 12 的指针
loop = b"\x00" * 12 + b"\xc0\x0c"
try:
    decode_name(loop, 12)
except ValueError as e:
    print("error:", e)
```

```console
$ python3 dname.py
('www.example.test', 30)
('www.example.test', 36)
error: pointer loop
```

问题部分的名字在偏移 $30$ 结束（它的类型字段从这里开始），而答案的名字——偏移 $34$–$35$ 处的一个指针——在 $36$ 结束，答案的类型字段从那里开始。生产环境的解析器还应对照 `len(msg)` 检查每个下标（这里越界下标会抛出 `IndexError`），并把名字限制在 255 字节以内，RFC 1035 有此要求：防御性地解析不可信输入，正是服务器避免崩溃和内存安全缺陷的办法。
:::
:::

::: exercise 队首阻塞 {level=3}
一条跑在 TCP 上的 HTTP/2 连接承载四条流，各自下载不同的图像；RTT 为 100 ms。一个只携带流 1 数据的 TCP 报文段丢失；发送方在一个 RTT 后重传它，此后的所有报文段都到达了。(a) 在丢失段之后到达的、流 2–4 的数据大约被扣住多久不能交给浏览器？(b) HTTP/3 over QUIC 会怎样？(c) HTTP/2 的设计者为什么不能在不改传输协议的情况下解决这个问题？
::: solution
(a) TCP 严格按序向应用交付字节。空洞之后的一切——四条流都是如此，因为它们交错在同一个字节流里——都待在接收方缓冲区里，直到重传到达，大约一个 RTT（这里是约 100 ms，再加上发现丢失的时间）。(b) QUIC 按流编号、按流定序。丢失分组里的数据只属于流 1，所以流 2–4 随到随交付；只有流 1 等重传。(c) 阻塞发生在 TCP 内部、操作系统内核里，HTTP 够不着的地方：TCP 的服务是单一有序字节流，它完全不知道这些字节属于相互独立的流。要修复它，需要一个把流作为一等概念的传输协议——QUIC；而它建立在 UDP 之上、实现在用户空间，因而无须等待每个操作系统和每个中间盒更新就能部署。
:::
:::
