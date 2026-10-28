两个团队按同一份需求构建同一家网上商店。第一个团队写一个程序，它提供网页、计算价格并与数据库对话；第二个团队把工作拆成六个通过网络彼此通话的服务。两家商店展示同样的页面、接同样的订单。然而它们在压力下的表现大不相同。数据库变慢时，第一家商店到处都变慢，第二家仍能展示商品目录，只是无法收款。开发者想修改折扣的计算方式时，第一个团队改一个函数然后重新部署整个系统；第二个团队改一个服务、只重新部署它——前提是先确认其余五个服务仍然看得懂它的消息。总体上没有哪个更好。他们做出了不同的**体系结构**决策，而正是这些决策——远比任何单行代码更重要——决定了系统的性能、故障方式与演化能力。

本章谈的就是这些决策。我们定义软件体系结构与驱动它的**质量属性**，研究主要的**体系结构风格**——分层、客户端-服务器、管道-过滤器、事件驱动与面向服务——及每种风格的权衡，计算组件的复合对可用性与时延的影响，考察组织如何塑造体系结构（康威定律）、以及团队如何记录自己决策的理由。[[program-design/modules-patterns]] 的模块级思想——信息隐藏、耦合、依赖图——是这里的基础；体系结构把它们应用到整个系统。

## 什么是体系结构

::: definition 软件体系结构 {#def-architecture}
一个系统的**软件体系结构**是对它进行推理所需要的那组结构：它的**元素**（模块、组件、进程、服务、数据存储）、它们之间的**关系**（使用、调用、发送消息给、运行于）、以及两者的对外可见**性质**（接口、协议、性能、故障行为）。**体系结构决策**是固定这些结构的那些设计决策；它们通常是日后改动代价高昂、且同时影响许多质量属性的那些。
:::

这个定义接近巴斯（Bass）、克莱门茨（Clements）与卡兹曼（Kazman）《软件体系结构实践》（*Software Architecture in Practice*）中的定义，它说「结构」用的是复数，因为没有哪张单独的图能刻画一个系统。标准的**视图**有三种。**模块视图**显示代码单位及其依赖——谁 import 谁——对构建、测试和修改系统最重要。**组件-连接件视图**显示运行中的系统：进程、服务和数据存储，以及它们借此交互的连接件（调用、消息队列、共享数据库）；它对性能和故障最重要。**分配视图**把软件映射到硬件、网络和团队上。菲利普·克鲁奇滕（Philippe Kruchten）的「4+1」模型（1995）是一个著名版本：逻辑、开发、过程与物理四个视图，由场景穿在一起。

### 质量属性驱动体系结构

如果体系结构主要不是为了功能——好几种体系结构都能提供同样的功能——那是为了什么？为了**质量属性**，即 [[software-engineering/requirements]] 中的非功能需求：性能、可用性、安全性、可修改性、可测试性、可部署性、易用性。每种风格成就一些、损害另一些，所以架构师的工作是弄清哪些品质对*这个*系统最重要，并让它们精确到足以据此评估设计。

::: definition 质量属性场景 {#def-qa-scenario}
**质量属性场景**用六个部分把一个质量需求精确化：刺激的**来源**（一个用户、一个攻击者、一个开发者、一块坏掉的磁盘）、**刺激**本身（一个请求、一次攻击、一个变更请求、一次崩溃）、**环境**（正常运行、高峰负载、部署期间）、被刺激的**制品**（整个系统、某一个服务、数据库）、系统必须做出的**响应**，以及用来评判该响应的**响应度量**（时延、恢复时间、以人·日计的工作量、丢失数据的比例）。
:::

::: example 网上商店的场景 {#ex-qa-scenarios}
为这家网上商店的可用性、可修改性与性能各写一个质量属性场景，并说明每个场景对体系结构的提示。
::: solution
**可用性。** 来源：硬件。刺激：运行支付组件的服务器崩溃。环境：正常运行。制品：支付处理。响应：故障被检测到，请求被路由到一台备用机；支付进行到一半的顾客被告知重试，且没有任何支付被收取两次。度量：支付在 30 秒内恢复可用；零重复扣款。*提示：*支付组件的冗余实例、健康检查，以及幂等的支付请求。

**可修改性。** 来源：市场团队。刺激：新增一种折扣的请求（「买两件，便宜的那件半价」）。环境：开发期。制品：定价。响应：在不修改定价之外的任何地方的情况下完成、测试并部署这一变更。度量：至多 3 人日；没有别的组件需要重新部署。*提示：*把定价放在一个藏起折扣规则的窄接口之后——信息隐藏（[[program-design/modules-patterns#def-information-hiding]]）在体系结构尺度上的运用。

**性能。** 来源：顾客。刺激：每秒 500 次商品目录页请求。环境：大促日。制品：整个系统。响应：页面得到服务。度量：99% 在 400 ms 内。*提示：*缓存很少变化的目录页，并把慢组件（比如推荐）挪出页面请求的关键路径。

这三个场景朝不同方向拉扯：复制与缓存增加了活动的部件，使系统更难修改和测试。把它们摆到明面上，正是为了让权衡能够被讨论，而不是等到问题自己暴露。
:::
:::

## 体系结构风格

**体系结构风格**（或**模式**）是一组有名字、可复用的元素类型、连接件类型及其组合约束的搭配，外加它已知能够成就的品质。玛丽·肖（Mary Shaw）与戴维·加兰（David Garlan）在《软件体系结构：一门新兴学科的观点》（*Software Architecture: Perspectives on an Emerging Discipline*，1996）中整理了经典风格。了解它们，你就能认出系统的形状、借用已知的解法、预判已知的问题。

### 分层

::: definition 分层体系结构 {#def-layered}
在**分层体系结构**中，模块被划分为按序排列的层 $1, 2, \dots, h$，第 $i$ 层的模块只能使用层号 $j \le i$ 的模块。**严格**分层下它只能使用自己这一层和第 $i - 1$ 层；**宽松**分层下则可用任何更低的层。每一层向上面的层提供一个**虚拟机**——一组服务。
:::

典型的商业应用有一个表示层（网页或用户界面）、一个应用层或领域层（业务规则）、一个数据访问层（数据库）。操作系统（[[operating-systems/os-structure]]）和网络协议栈（[[networks/network-principles]]）也是分层的：TCP 使用 IP，IP 使用链路层，而它们都不使用任何更高的一层。

::: proposition 分层买到了什么 {#prop-layers}
(a) 分层系统的依赖图没有同时穿过两个不同层的环；此外，若每层内部的模块之间也不互相循环依赖，则整张图无环，模块可以自底向上地构建、测试和初始化。(b) 在严格分层的系统中，修改第 $i$ 层的接口只可能要求修改第 $i$ 层和第 $i + 1$ 层。
:::

::: proof
(a) 沿任何一条依赖路径，层号从不增大，因为每条边都从第 $i$ 层指向某个 $j \le i$ 的层。一个环回到它的起始模块，也就回到它的起始层，所以层号必须一路保持不变：这个环位于单独一层之内。若每一层都没有内部环，就根本没有任何环，于是由 [[program-design/modules-patterns#thm-dependency-order]]，依赖次序存在。(b) 严格分层下，只有第 $i$ 层与第 $i + 1$ 层的模块可能使用第 $i$ 层的接口，所以只有它们会受该接口修改的影响。
:::

(b) 正是网络协议的分层如此经久不衰的原因：新的链路技术（先是 Wi-Fi，后是 5G）只需要改动栈的底部，IP 之上的一切不受影响。分层的代价是性能（一次请求可能穿越好几层，每层都添一份工作，而严格性禁止抄近路）和判断某个功能应当属于哪一层的困难：例如错误处理和安全就横切所有层。

分层规则不强制执行就一文不值，而在大型代码库里，它会被一次次「方便的捷径」磨掉。执行它的办法只是一个简单的静态分析。

::: example 检查分层 {#ex-layer-check}
商店的包 `shop` 有模块 `web`（第 3 层）、`orders` 与 `pricing`（第 2 层）、`db`（第 1 层）。写一个检查器，报告每一个*向上*的 import，并运行它。
::: solution
Python 标准库的 `ast` 模块把源文件解析成语法树，其中每条 `import` 语句都是一个节点；我们遍历语法树，收集每个文件 import 的 `shop` 的各个模块，再比较层号。

```python
import ast, pathlib

LAYERS = {"web": 3, "orders": 2, "pricing": 2, "db": 1}   # 高层可以使用低层

def imports(path):
    """一个源文件 import 的 `shop` 包内模块的名字。"""
    tree = ast.parse(path.read_text())
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom) and node.module == "shop":
            yield from (alias.name for alias in node.names)
        elif isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name.startswith("shop."):
                    yield alias.name.split(".")[1]

def violations(package_dir):
    for path in sorted(pathlib.Path(package_dir).glob("*.py")):
        user = path.stem
        if user not in LAYERS:
            continue
        for used in imports(path):
            if LAYERS[used] > LAYERS[user]:          # 一个向上的依赖
                yield f"{user} (layer {LAYERS[user]}) imports {used} (layer {LAYERS[used]})"

if __name__ == "__main__":
    found = list(violations("shop"))
    for v in found:
        print("violation:", v)
    raise SystemExit(1 if found else 0)       # 非零退出状态使 CI 构建失败
```

该包里 `web` import `orders`，`orders` import `db` 和 `pricing`，`pricing` import `db`，另外 `db.py` 里有一行写着 `from shop import web  # 有人为了复用一个格式化辅助函数抄的近路`。

```console
$ python3 layers.py
violation: db (layer 1) imports web (layer 3)
```

这条捷径造出了环 `web → orders → db → web`，由 [[#prop-layers]]，这种环在分层系统中不可能存在，而且它会让 Python 对 `shop.web` 的 import 失败或只完成一半（[[program-design/modules-patterns]]）。补救是把格式化辅助函数下移进第 1 层的一个工具模块，或上移到它本应所属的 `web`。把这样的检查放进持续集成（[[software-engineering/version-control]]），就能在第一笔违反的提交处止住侵蚀。（许多语言都有专门工具；上面这二十行说明它们并没有什么魔法。）
:::
:::

::: widget graph
nodes: web@1,0; orders@0,1; pricing@2,1; db@1,2
edges: web>orders; orders>pricing; orders>db; pricing>db; db>web
algorithm: topo
caption: 商店的模块视图，每个模块用箭头指向它 import 的每个模块，包括被禁止的 `db → web`。逐步执行拓扑排序：它卡住了，因为每个模块要么位于某个环上（`web → orders → db → web`），要么依赖某个环。在脑中删掉那条边——剩下的分层图有次序 `web, orders, pricing, db`，其逆序就是一个合法的构建与测试次序。
:::

### 客户端与服务器

在**客户端-服务器**风格中，**服务器**通过网络提供服务，**客户端**请求服务；服务器事先不认识它的客户，同时为许多客户服务。这种风格集中了数据与控制，从而简化了安全、一致性与更新（改动服务器，每个客户都受益），代价是除非复制服务器，否则服务器就是性能瓶颈和单点故障。**三层**体系结构把它与分层结合：浏览器、应用服务器、数据库服务器。万维网就建立在这种风格之上，罗伊·菲尔丁（Roy Fielding）2000 年的博士论文把 **REST**（representational state transfer，表现层状态转换）定义为它的一种精化——无状态请求、命名资源上的统一接口、可缓存的响应——以解释万维网为何能扩展；具体协议在 [[networks/application-layer]]。

### 管道与过滤器

在**管道-过滤器**风格中，每个组件（一个**过滤器**）读取一个数据流、变换它、写出一个流；**管道**把一个过滤器的输出接到下一个的输入。过滤器之间不共享状态、也不认识自己的邻居，所以它们可以被独立地开发、测试、复用，并且并发运行。Unix shell 是经典例子：

```console
$ cat access.log
GET /index.html 200
GET /cart 200
POST /cart 500
GET /index.html 200
GET /missing 404
POST /cart 500
GET /cart 200
POST /checkout 500
$ grep ' 500$' access.log | cut -d' ' -f2 | sort | uniq -c | sort -rn
      2 /cart
      1 /checkout
```

五个通用程序，没有一个是为这个任务写的，却回答了「哪些页面出错最多？」。编译器也是流水线（词法分析、语法分析、检查、优化、生成代码——[[compilers/compiler-structure]]），数据处理系统亦然；而在一个 Python 程序内部，生成器表达的正是同一种风格（[[program-design/iterators-generators]]）。这种风格适合数据的成批变换，却不适合交互式系统——后者的组件需要彼此响应，而不是对一个流响应。

### 事件

在**事件驱动**（或**发布-订阅**）体系结构中，组件通过**发布一个事件**来宣布某事已经发生，其他组件**订阅**它们关心的那几类事件。发布者不知道有没有人在听、有谁在听。这是观察者模式（[[program-design/modules-patterns]]）放大到整个系统的尺度，进程之间通常隔着一个消息代理。

::: example 事件总线 {#ex-event-bus}
订单成立时，必须预留库存并发送收据邮件。实现这一点，同时让订单组件对库存和邮件一无所知。
::: solution
```python
from collections import defaultdict

class EventBus:
    """发布者与订阅者知道总线和事件名，而不知道彼此。"""
    def __init__(self):
        self._handlers = defaultdict(list)
    def subscribe(self, event, handler):
        self._handlers[event].append(handler)
    def publish(self, event, **data):
        for handler in self._handlers[event]:
            handler(**data)

bus = EventBus()
stock = {"tea": 10}

def reserve_stock(order_id, items):
    for item in items:
        stock[item] -= 1
    print(f"stock: reserved {items} for order {order_id}")

def send_receipt(order_id, items):
    print(f"email: receipt for order {order_id}")

def place_order(order_id, items):          # 发布者
    print(f"orders: placed {order_id}")
    bus.publish("order_placed", order_id=order_id, items=items)

bus.subscribe("order_placed", reserve_stock)
bus.subscribe("order_placed", send_receipt)
place_order(17, ["tea", "tea"])
print("stock left:", stock)
```

```console
$ python3 events.py
orders: placed 17
stock: reserved ['tea', 'tea'] for order 17
email: receipt for order 17
stock left: {'tea': 8}
```

日后要加会员积分，只需一个新订阅者，`place_order` 一个字都不用改：这种风格成就可以修改性。但看看已经失去了什么。读 `place_order` 不再能告诉你下单时会发生什么；你必须找出每一个订阅者。若 `reserve_stock` 抛出异常，收据还应不应发送？在这里，它不会发送——这是订阅次序造成的一次偶然。在分布式版本里，事件经由代理异步地被处理，所以订阅者可能迟到地、重复地或乱序地看到它们，库存数量与订单之间只是**最终**一致，而不再时时一致（[[distributed-systems/replication-consistency]]）。事件驱动的系统用可追踪性和简单的一致性换来了解耦。
:::
:::

### 单体与服务

**单体**作为一个单元部署（它内部可以模块化得很好）；**面向服务**的体系结构——其细粒度形式即**微服务**（microservices），得名于詹姆斯·刘易斯（James Lewis）与马丁·福勒（Martin Fowler）2014 年一篇有影响的短文——把每个部分部署为独立进程，自己拥有自己的数据，通过网络接口通信。服务可以由不同的团队用不同的语言独立地部署、扩缩和重写。但它们之间的每次调用如今都是一次网络调用，可能很慢，可能失败，而且可能*部分*失败（请求到达了，回复丢了）。下面两个结果量化了这一代价。

::: proposition 复合组件的可用性 {#prop-availability}
假设各组件独立地失效，组件 $i$ 以概率 $a_i$ 可用（正常工作）。(a) 若完成一次请求**全部**需要组件 $1, \dots, n$（一条串行链），则请求以概率 $\prod_{i=1}^{n} a_i$ 成功。(b) 若只需要 $k$ 个副本中的**任意一个**，每个副本以概率 $a$ 可用，则请求以概率 $1 - (1 - a)^k$ 成功。
:::

::: proof
(a) 请求成功当且仅当每个组件都可用；由独立性，交事件的概率就是乘积。(b) 请求失败当且仅当 $k$ 个副本全不可用，由独立性其概率为 $(1 - a)^k$；成功概率取对立事件的概率。
:::

五个服务串成一条链，每个的可用时间为 99.9%，合起来是 $0.999^5 \approx 99.5\%$——不可用时间从每月约 43 分钟涨到了约 3.6 小时。一个 99% 组件配两个副本给 $1 - 0.01^2 = 99.99\%$。把一个系统拆成服务会降低可用性，除非每个服务都有副本；而副本只有当失效确实独立时才起作用：同一数据中心里、运行同一有 bug 版本的两个副本，往往一起失效。（可用性的算术及其局限在 [[distributed-systems/fault-tolerance]] 中继续。）

::: proposition 扇出放大尾部时延 {#prop-tail}
设一次请求要等 $n$ 个独立的后端调用全部回复才得到答复，而每个调用以概率 $p$ 缓慢（超过某个阈值）。则该请求以概率 $1 - (1 - p)^n$ 缓慢。
:::

::: proof
请求快当且仅当 $n$ 个调用全都快；由独立性，其概率为 $(1 - p)^n$。
:::

这正是杰弗里·迪恩（Jeffrey Dean）与路易兹·巴罗索（Luiz Barroso）《规模化之下的长尾》（"The tail at scale"，*Communications of the ACM*，2013）中的例子：若百分之一的服务器响应缓慢（$p = 0.01$），一个扇出到 100 台服务器的请求就有 $1 - 0.99^{100} \approx 63\%$ 的时间是慢的。各部分的罕见变慢变成了整体的常见变慢。设计上的应对是超时与对冲请求（第一个慢了再发第二份），或把扇出挪出关键路径。

::: widget plot
f: a^x; 1 - (1 - a)^x
x: 1, 20
y: 0, 1
sliders: a=0.9:0.005:0.999:0.99
labels: \text{全部 } n \text{ 个都需要：} a^n; \text{任取 } n \text{ 个副本之一：} 1-(1-a)^n
caption: [[#prop-availability]]：横轴为组件数 $n$，每个组件以概率 $a$ 可用。下降的曲线是串行链，上升的是副本集合。把 $a$ 设为 $0.99$：链上的 20 个服务只有约 82% 的时间可用，而两个副本就已给出 99.99%。同一条下降曲线按 $1 - (1-p)^n$（$p = 1 - a$）来读，就是 [[#prop-tail]] 中 $n$ 次扇出的调用至少撞上一次慢请求的概率。两者都建立在独立性之上，而真实的失效常常违背它。
:::

::: quiz
一个页面需要 4 个服务分别答复，每个独立地有 99% 的时间可用。哪种改变更能提高页面的可用性？
- [ ] 把其中一个服务提高到 99.9% 可用
- [x] 给每个服务运行两个独立副本
- [ ] 增加一个缓存结果的第五服务
- [ ] 把两个服务并入一个 99% 可用的进程
::: solution
现在页面有 $0.99^4 \approx 96.1\%$ 的时间可用。把一个服务提高到 99.9% 得 $0.99^3 \times 0.999 \approx 96.9\%$。每个服务两个副本得 $(1 - 0.01^2)^4 \approx 99.96\%$。链上的第五个服务反而*降低*可用性，除非它能在别的服务宕机时代行其职。把两个服务并成一个 99% 的组件得 $0.99^3 \approx 97.0\%$——比四个分开的更好，这正是在各部分无法复制时少而大的服务更优这一真实论据。
:::
:::

::: warning 微服务不等于模块化
人们很容易相信把一个系统拆成服务就使它设计良好。网络边界强制的是*分离*——一个服务够不着另一个服务的变量——但不是*好*的分离。边界划得不好，每个特性都需要对若干服务做协调一致的修改，而这些服务就必须亦步亦趋地一起部署：一个「分布式单体」，带着单体的全部耦合，外加网络时延、部分失败和分布式数据。好的边界来自信息隐藏——每个服务藏起一个很可能变化的决策——而这在一个结构良好的单体内部同样可以做到，而且更便宜。许多团队明智地从模块化单体开始，只在确实需要独立部署或独立扩缩的地方才抽出服务。
:::

## 体系结构与组织

1968 年，梅尔文·康威（Melvin Conway）在《数据自动化》（*Datamation*）上发表了《委员会如何发明东西？》，论证系统的结构映照设计它的组织的沟通结构。四个团队造的编译器倾向于是一个四遍的编译器；两个很少交谈的团队造出两个组件，中间隔着一条薄而僵硬的接口。弗雷德里克·布鲁克斯（Frederick Brooks）在《人月神话》中把这一观察命名为**康威定律**。

这条定律比多数坊间说法有证据得多。麦克科马克（MacCormack）、拉斯纳克（Rusnak）与鲍德温（Baldwin）（"Exploring the duality between product and organizational architectures"，*Research Policy*，2012）比较了功能相近、分别由高度集成的公司和松散耦合的开源社区构建的产品对，发现分散的组织的产品明显更模块化，正如「镜像假说」所预言。纳加潘（Nagappan）、墨菲（Murphy）与巴西利（Basili）（"The influence of organizational structure on software quality"，ICSE 2008）发现，组织层面的度量——有多少工程师和团队碰过一个组件、所有权多么分散——比代码度量更能预测 Windows Vista 组件的易故障性。两者都是对特定组织的观察性研究，所以它们显示的是相关性，不是普适定律。实际推论叫作**逆康威运动**：想要某种体系结构，就按它来组织团队，让每个团队拥有一个接口清晰的组件的所有权，使体系结构所要求的沟通恰好就是组织本来就有的沟通。

## 记录与评估决策

体系结构很少被整体地文档化，而图会过时。新人最需要、也最常缺的，是*理由*：团队为什么选消息队列，报表为什么要从副本读取。迈克尔·奈加德（Michael Nygard）提议把每个重要决策记录在一个与代码放在一起的短文本文件里。

::: definition 架构决策记录 {#def-adr}
**架构决策记录**（ADR）是一份记录单个体系结构决策的短文档：**标题**；**状态**（提议、已接受、已弃用、被另一条 ADR 取代）；**背景**——那些使决策成为必要的力量、需求与约束；**决策**本身，用主动语态陈述（「我们将……」）；以及它的**后果**，好的和坏的都要。ADR 有编号，接受之后除了改状态一概不改，并保存在版本控制之下，于是记录序列就是体系结构的历史。
:::

::: example 一份 ADR {#ex-adr}
为商店「异步发送收据」这个决策写一份 ADR。
::: solution
**ADR 7：通过消息队列发送订单收据。** *状态：*已接受。

*背景。* 目前下单时同步发送收据邮件。外部邮件服务本季度已有两次长达 20 分钟的中断，期间订单失败，尽管库存和支付都没问题。可用性场景要求非核心服务失效时下单照常工作。顾客能容忍收据晚到几分钟。我们本来就在为库存更新运行一个消息代理。

*决策。* 我们将在订单提交后向代理发布一个 `order_placed` 事件，由一个独立的收据工作进程消费它并发送邮件，失败则带退避地重试。

*后果。* 下单不再依赖邮件服务。收据可能延迟，并且若工作进程在发送之后、确认之前崩溃，收据可能发两次，所以工作进程必须记录已发送的收据并跳过重复。排查一张缺失的收据现在需要查看代理和工作进程的日志，而代理本身也需要监控。取代 ADR 2 中要求同步通知的那部分。
:::
:::

决策也可以在做出之前加以评估。**架构权衡分析法**（ATAM）约 2000 年由软件工程学院的里克·卡兹曼（Rick Kazman）、马克·克莱因（Mark Klein）与保罗·克莱门茨（Paul Clements）开发：把干系人聚到一起给质量属性场景（[[#def-qa-scenario]]）排序，并把最重要的几个沿提议的体系结构走一遍，找出**敏感点**（某品质依赖的决策）、**权衡点**（对几种品质起相反作用的决策）与风险。轻量版本——团队围着一块白板把前五个场景走一遍——一个下午就能抓到其中不少同样的问题。

::: history
艾兹格·迪杰斯特拉（Edsger Dijkstra）对 THE 多道程序系统的描述（*Communications of the ACM*，1968）把操作系统组织成层层相依的层次，每层只依赖其下各层，并论证这使它可能被令人信服地测试。梅尔文·康威（Melvin Conway）关于组织与设计的论文发表于同年。德韦恩·佩里（Dewayne Perry）与亚历山大·沃尔夫（Alexander Wolf）的《软件体系结构研究的基础》（1992）以及玛丽·肖（Mary Shaw）与戴维·加兰（David Garlan）的书（1996）确立了体系结构作为一个研究领域，以风格为其词汇；菲利普·克鲁奇滕（Philippe Kruchten）的 4+1 视图模型随后于 1995 年发表，罗伊·菲尔丁（Roy Fielding）定义 REST 的论文则在 2000 年。迈克尔·奈加德（Michael Nygard）2011 年的文章《记录体系结构决策》引入了 ADR，刘易斯（Lewis）与福勒（Fowler）2014 年的文章为微服务风格命名。
:::

## 后续内容

下一章 [[software-engineering/design-principles]] 从系统下降到类与模块：可度量的耦合与内聚、SOLID 原则，以及依赖倒置——分层体系结构正是靠它才能替换自己的下层。真实系统的体系结构在图谱的其他部分有深入研究：分层内核在 [[operating-systems/os-structure]]，协议栈在 [[networks/network-principles]]，副本服务及其一致性在 [[distributed-systems]]，体系结构边界的安全后果在 [[security/security-principles]]。

::: summary
- **体系结构**是对系统进行推理所需要的那组结构——元素、关系、性质——以及固定它们的决策（[[#def-architecture]]）；要用多个视图来描述它。
- 体系结构由**质量属性**驱动，把它们精确化为六要素场景（[[#def-qa-scenario]]），而场景彼此拉扯。
- **分层**（[[#def-layered]]）使跨层的依赖图无环，并把接口修改圈在两层之内（[[#prop-layers]]）；要机械地执行分层规则，否则它会被磨掉。
- **客户端-服务器**集中数据与控制；**管道-过滤器**复合独立的流变换器；**事件驱动**系统解耦发布者与订阅者，代价是可追踪性与简单的一致性。
- 服务复合会连乘可用性、放大时延：链是 $\prod a_i$，副本是 $1 - (1-a)^k$，慢的扇出是 $1 - (1-p)^n$（[[#prop-availability]]、[[#prop-tail]]）——全部以独立性为前提。
- **康威定律**：系统映照构建它的组织的沟通结构；有证据支持，而且可以为了想要的体系结构来组织团队。
- 用 **ADR**（[[#def-adr]]）记录决策的*理由*，并在承诺之前对照场景评估决策。
:::

## 习题

::: exercise 一条服务链 {level=1 check="0.97"}
一个请求依次通过三个独立服务，可用性分别为 $0.99$、$0.995$ 与 $0.985$。它成功的概率（保留两位小数）是多少？（填入概率。）
::: solution
由 [[#prop-availability]](a)，$0.99 \times 0.995 \times 0.985 = 0.97027\ldots \approx 0.97$。不可用时间约 3%，接近三个不可用时间之*和*（$1\% + 0.5\% + 1.5\%$）——只要它们都很小，情况总是如此。
:::
:::

::: exercise 说出风格 {level=1}
说出各者的主要体系结构风格：(a) 一个先词法分析、再语法分析、类型检查并生成代码的编译器，每一阶段消费前一阶段的输出；(b) 一个电子表格，改动一个单元格就更新所有依赖它的单元格；(c) 一个邮件客户端与一台 IMAP 邮件服务器；(d) 一个操作系统内核，带一个硬件抽象层，其上是调度器和内存管理器，最上面是系统调用。
::: solution
(a) 管道-过滤器（实践中带一个共享符号表，所以不纯粹）。(b) 事件驱动：一次改动向订阅了它的从属单元格发布一个事件——观察者模式；更新要能终止，依赖图必须无环。(c) 客户端-服务器。(d) 分层。
:::
:::

::: exercise 需要多少副本 {level=1 check="4"}
一个组件有 95% 的时间可用，副本的失效相互独立。要使「至少一个可用」的概率不低于 $0.9999$，最少需要多少个副本？（填入数字。）
::: solution
由 [[#prop-availability]](b) 需要 $1 - 0.05^k \ge 0.9999$，即 $0.05^k \le 10^{-4}$。而 $0.05^3 = 1.25 \times 10^{-4}$，可用性 $0.999875$，差一点；$0.05^4 = 6.25 \times 10^{-6}$ 足够。所以 $k = 4$。
:::
:::

::: exercise 扇出多少？{level=2 check="69"}
每个后端调用以概率 $0.01$ 独立地变慢。按 [[#prop-tail]] 的意义，使至少一半请求变慢的最小扇出 $n$ 是多少？（填入 $n$。）
::: solution
需要 $1 - 0.99^n \ge 0.5$，即 $n \ge \ln 0.5 / \ln 0.99 \approx 68.97$，所以 $n = 69$。核对：$1 - 0.99^{68} \approx 0.495$，$1 - 0.99^{69} \approx 0.5002$。一个要碰 69 台服务器的请求，多数时候是慢的，尽管每台服务器只有 1% 的时间慢。
:::
:::

::: exercise 一个可测试性的场景 {level=2}
为这家商店定价组件的*可测试性*写一个六要素质量属性场景（[[#def-qa-scenario]]），并说出两个有助于达成它的体系结构决策。
::: solution
来源：一位开发者。刺激：完成了对折扣规则的一处改动，想知道定价是否仍然正确。环境：开发者的笔记本电脑上，没有网络。制品：定价组件。响应：组件的整套测试运行并报告。度量：30 秒以内；没有任何数据库、邮件服务器或其他服务在运行；并且每条定价规则至少被一个测试覆盖。有帮助的决策：(1) 定价是购物车与一张规则表上的纯函数——它内部不读数据库——测试可以直接调用它（[[program-design/functional-style]]）；(2) 定价需要数据（当前价格）时，经一个接口取得，测试可以把它替换成内存里的假对象——依赖倒置，即 [[software-engineering/design-principles]] 的主题。
:::
:::

::: exercise 强制执行严格分层 {level=2}
把 [[#ex-layer-check]] 的检查器扩展为强制*严格*分层（[[#def-layered]]），把向上的 import 与跨层的 import 分开报告。加一个位于第 3 层、直接 import `db` 的模块 `admin` 后再测试它。
::: solution
新检查器复用 `layers.py` 的 `imports` 与 `LAYERS`（它的报告与退出只在 `if __name__ == "__main__":` 下运行，所以 import 它不会触发任何事）：

```python
from layers import imports, LAYERS
import pathlib
LAYERS["admin"] = 3

def strict_violations(package_dir):
    for path in sorted(pathlib.Path(package_dir).glob("*.py")):
        user = path.stem
        if user not in LAYERS:
            continue
        for used in imports(path):
            gap = LAYERS[user] - LAYERS[used]
            if gap < 0:
                yield f"upward:   {user} -> {used}"
            elif gap > 1:
                yield f"skipping: {user} -> {used} (skips {gap - 1} layer)"

for v in strict_violations("shop"):
    print(v)
```

`shop/admin.py` 里写着 `from shop import db`：

```console
$ python3 strict.py
skipping: admin -> db (skips 1 layer)
upward:   db -> web
```

`admin → db` 是否可以接受是一个设计决策：严格分层会把它改道经过 `orders` 或一个新的第 2 层 `inventory` 模块，以获得 [[#prop-layers]](b) 的保证，代价是一个额外的转发函数。许多团队采用宽松分层，只禁止向上的依赖。
:::
:::

::: exercise 反过来的康威定律 {level=2}
一家公司有三支团队——Web 前端、手机应用、后端数据库——想增加一个推荐功能，该功能必须由既懂用户界面又懂数据的人快速开发和修改。预测若由现有团队分工会得到什么体系结构，并提出一个有利于更好体系的组织改动。
::: solution
交给现有团队的话，推荐逻辑很可能沿团队边界被切开：一部分在 Web 前端，一部分在手机应用里重复一份，一部分在数据库查询里，每次改动都需要三个团队协调，而它们之间的接口被这份协调的成本冻结住——系统映照了组织。逆康威运动是组建一个端到端拥有推荐的小团队，它有自己的服务（或定义良好的模块），藏在 Web 与移动端客户端调用的接口之后。团队的边界与组件的边界重合之后，推荐内部的改动就不再需要跨团队谈判。
:::
:::

::: exercise 共因失效 {level=3}
副本很少独立失效。在 **beta 因子模型**中，每个副本以概率 $u$ 不可用，但其中一份比例 $\beta$ 来自会同时打倒全部副本的共因（一次糟糕的部署、一个共享电源）：以概率 $\beta u$ 全部 $k$ 个副本一起失效，否则每个副本以概率 $(1-\beta)u$ 独立失效。证明 $k$ 个副本的可用性是 $A_k = 1 - \bigl(\beta u + (1 - \beta u)((1 - \beta)u)^k\bigr)$，并推出任何数量的副本都无法使可用性超过 $1 - \beta u$。对 $u = 0.01$、$\beta = 0.1$ 求 $A_1, A_2, A_{10}$。
::: solution
服务不可用当且仅当所有副本都宕。要么共因发生（概率 $\beta u$），此时全部宕掉；要么不发生（概率 $1 - \beta u$），此时由剩余失效的独立性，$k$ 个全部宕掉的概率为 $((1-\beta)u)^k$。由全概率公式，不可用性为 $\beta u + (1 - \beta u)((1-\beta)u)^k$，即得公式。由于 $((1-\beta)u)^k \to 0$（$k \to \infty$）且对每个 $k$ 为正，不可用性递减地趋于 $\beta u$ 而永不低于它：所以对所有 $k$ 有 $A_k < 1 - \beta u$。

代入 $u = 0.01$、$\beta = 0.1$：$A_1 = 1 - (0.001 + 0.999 \times 0.009) = 0.990009$；$A_2 = 1 - (0.001 + 0.999 \times 0.000081) \approx 0.998919$；$A_{10} \approx 0.999000$。独立副本会给 $A_2 = 0.9999$；只有 10% 的共因时，两个副本约得 $0.9989$，十个副本也到不了 $0.999$。两三个副本之外，把功夫花在消除共因——错峰部署、独立的电源与网络、多样化的实现——比继续加副本更划算。
:::
:::

::: exercise 隔离订阅者 {level=3}
在 [[#ex-event-bus]] 中，一个订阅者抛出的异常会阻止后面的订阅者运行。修改 `publish`，使每个订阅者都被调用（即使有的失败），并把失败返回。在一个单位库存、一张两张的订单下运行它。隔离了失败，系统就正确了吗？
::: solution
```python
from collections import defaultdict

class EventBus:
    def __init__(self):
        self._handlers = defaultdict(list)
    def subscribe(self, event, handler):
        self._handlers[event].append(handler)
    def publish(self, event, **data):
        """调用每个处理器，即使有的失败；返回失败列表。"""
        errors = []
        for handler in self._handlers[event]:
            try:
                handler(**data)
            except Exception as exc:          # 隔离单个订阅者的失败
                errors.append((handler.__name__, exc))
        return errors

bus = EventBus()
stock = {"tea": 1}

def reserve_stock(order_id, items):
    for item in items:
        if stock[item] == 0:
            raise ValueError(f"out of {item}")
        stock[item] -= 1

def send_receipt(order_id, items):
    print(f"email: receipt for order {order_id}")

bus.subscribe("order_placed", reserve_stock)
bus.subscribe("order_placed", send_receipt)
print(bus.publish("order_placed", order_id=18, items=["tea", "tea"]))
print("stock left:", stock)
```

```console
$ python3 bus2.py
email: receipt for order 18
[('reserve_stock', ValueError('out of tea'))]
stock left: {'tea': 0}
```

总线如今是皮实了，但*系统*以运行中暴露出的两种方式出错。顾客收到了一张根本无法履约的订单的收据，而 `reserve_stock` 半途失败，为一个不会发货的订单留下一件占用的库存。隔离能让一个订阅者的失败不致噤掉其他订阅者；它不能让对一个事件的反应变成原子的。真实的设计会让每个处理器要么全做要么全不做（改动任何一件之前先检查全部），或发布一个补偿事件（`order_failed`，收据发送者也订阅它），或*在接受订单之前*检查库存——这是一个关于哪个组件负责这一决定的需求问题（[[distributed-systems/distributed-transactions]]）。
:::
:::
