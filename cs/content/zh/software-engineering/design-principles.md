一个报表模块通过针对 PostgreSQL 数据库运行 SQL 查询来计算月度销售额。它工作得很好。然后在一年之内发生了三件事：财务部门想从文件里的归档数据得到同一份报表；开发者想在不必启动数据库的情况下测试这份报表；运维团队把生产数据迁移到了另一种数据库产品。每一项需求都意味着要修改这份报表——以及调用它的各个网页，因为它们向它传入数据库连接——还有订单模块，它共用这份报表的查询辅助函数。这些变化没有一项是不合理或不可预见的。代码的编排方式，只是让一个很可能改变的决定（数据存放在哪里）为许多模块所知，而一个本应稳定的模块（报表的业务逻辑）却依赖于一个不稳定的模块。

**设计原则**是从这类经验中提炼出来的、关于如何编排代码使可能的变更保持局部的经验法则。它们不是定理：每一条都是有代价的启发式方法，盲目套用某一条会产生它自己的一类混乱。不过其中几条可以被表述得足够精确而可以度量，其背后的推理与 [[program-design/modules-patterns]] 借助信息隐藏、耦合与内聚引入的关于依赖的推理是同一种。本章在那一基础上继续：我们度量依赖及其后果，用可运行的小例子研究五条 **SOLID** 原则和迪米特法则，最后讨论如何为变更而设计、而又不为一切能想到的变更而设计。

## 依赖与涟漪效应

回忆 [[program-design/modules-patterns#def-coupling]]：**耦合**刻画模块彼此依赖的程度，**内聚**刻画一个模块的各部分彼此归属的程度。拉里·康斯坦丁（Larry Constantine）在 1960 年代末提出了这两个概念，史蒂文斯（Stevens）、迈尔斯（Myers）与康斯坦丁的论文 "Structured design"（*IBM Systems Journal*，1974）使它们成为标准概念。低耦合为什么好？因为变更沿依赖传播。

::: definition 依赖者与影响集 {#def-impact}
在一个依赖图中，边 $A \to B$ 表示「模块 $A$ 使用模块 $B$」。$B$ 的**依赖者**（dependents）是有边指向 $B$ 的那些模块；$B$ 的**影响集**（impact set）是除 $B$ 以外存在一条有向路径到达 $B$ 的那些模块组成的集合——当 $B$ 的接口或行为改变时，可能需要修改、重新测试或重新部署的模块。
:::

影响集是最坏情形：一个保持 $B$ 的规格说明（[[program-design/abstraction-specifications]]）的变更不影响任何客户程序，而对接口的改变可能一路向上波及。它可以在反向图上做图搜索来算出。罗伯特·马丁（Robert Martin）为每个模块在图中的位置提出了简单的度量。

::: definition 传入耦合、传出耦合与不稳定性 {#def-instability}
对模块 $M$，**传入耦合** $C_a(M)$ 是依赖 $M$ 的模块数（它的扇入），**传出耦合** $C_e(M)$ 是 $M$ 依赖的模块数（它的扇出）。它的**不稳定性**为
$$
I(M) = \frac{C_e(M)}{C_a(M) + C_e(M)} \in [0, 1],
$$
（孤立模块取 $0$）。$I = 0$ 的模块是**稳定的**——许多模块依赖它而它不依赖任何模块，所以难以改动；$I = 1$ 的模块是**不稳定的**——没有模块依赖它，所以可以随意改动。
:::

这里的「稳定」意味着*改动代价高*，而不是*不太可能改变*。危险在于错配：一个改动代价高、实际上却很可能会改变的模块。马丁的**稳定依赖原则**说：沿着稳定的方向去依赖。引言里的数据库模块就违反了它——它是具体的，充满了可能改变的细节，业务逻辑却依赖于它。

::: example 度量报表系统 {#ex-instability}
对这家商店的报表代码，计算每个模块的不稳定性以及 `postgres` 的影响集，分别在「报表模块与订单模块改为依赖接口 `store`（由 PostgreSQL 适配器实现）」之前与之后。
::: solution
```python
from collections import deque

def dependents(deps):
    """反转图：模块 -> 导入它的模块集合。"""
    rev = {m: set() for m in deps}
    for m, used in deps.items():
        for u in used:
            rev[u].add(m)
    return rev

def instability(deps):
    rev = dependents(deps)
    out = {}
    for m in deps:
        ce, ca = len(deps[m]), len(rev[m])      # 传出（出边）、传入（入边）
        out[m] = (ca, ce, ce / (ca + ce) if ca + ce else 0.0)
    return out

def impact(deps, changed):
    """当 `changed` 改变时可能需要改动的模块：那些有路径到达它的模块。"""
    rev, seen, queue = dependents(deps), {changed}, deque([changed])
    while queue:
        for m in rev[queue.popleft()]:
            if m not in seen:
                seen.add(m)
                queue.append(m)
    return sorted(seen - {changed})

before = {"web": {"reports", "orders"}, "reports": {"postgres"},
          "orders": {"postgres", "pricing"}, "pricing": set(), "postgres": set(),
          "main": {"web"}}
after = {"web": {"reports", "orders"}, "reports": {"store"},
         "orders": {"store", "pricing"}, "pricing": set(), "store": set(),
         "postgres": {"store"},               # 数据库适配器实现 `store`
         "main": {"web", "postgres"}}         # 组合根：把 postgres 插接进来

for name, deps in (("before", before), ("after", after)):
    print(name)
    for m, (ca, ce, i) in instability(deps).items():
        print(f"  {m:9} Ca={ca} Ce={ce} I={i:.2f}")
    print("  impact of changing postgres:", impact(deps, "postgres"))
```

```console
$ python3 metrics.py
before
  web       Ca=1 Ce=2 I=0.67
  reports   Ca=1 Ce=1 I=0.50
  orders    Ca=1 Ce=2 I=0.67
  pricing   Ca=1 Ce=0 I=0.00
  postgres  Ca=2 Ce=0 I=0.00
  main      Ca=0 Ce=1 I=1.00
  impact of changing postgres: ['main', 'orders', 'reports', 'web']
after
  web       Ca=1 Ce=2 I=0.67
  reports   Ca=1 Ce=1 I=0.50
  orders    Ca=1 Ce=2 I=0.67
  pricing   Ca=1 Ce=0 I=0.00
  store     Ca=3 Ce=0 I=0.00
  postgres  Ca=1 Ce=1 I=0.50
  main      Ca=0 Ce=2 I=1.00
  impact of changing postgres: ['main']
```

改动之前，`postgres` 是最大稳定的（$I = 0$）——有两个模块直接依赖它，并且传递地，所有模块都依赖它——尽管它是最可能改变的模块。改动之后，稳定的位置被 `store` 占据——一个不含任何细节的接口——而 `postgres` 移到了 $I = 0.5$，只有组合根 `main`（它创建对象并把它们互相插接起来）依赖它。现在替换 PostgreSQL 只影响 `main` 中的一行。`impact` 函数就是在反向图上做广度优先搜索（[[algorithms/graph-search]]）。
:::
:::

::: widget graph
nodes: main@0,0; web@1,0; reports@1,1; orders@2,1; pricing@3,2; postgres@1.5,2.2
edges: postgres>orders; postgres>reports; reports>web; orders>web; web>main; pricing>orders
algorithm: bfs
start: postgres
caption: [[#ex-instability]] 中「改动之前」的设计，其中每支箭头都已*反向*：从 $B$ 到 $A$ 的箭头表示「$A$ 依赖 $B$」，于是一次变更沿箭头流动。从 `postgres` 出发做广度优先搜索，访问到的是它的影响集——除 `pricing` 外的所有模块。改从 `pricing` 出发试试：只能到达 `orders`、`web` 和 `main`。一个具体的、易变模块的影响集应当小；「改动之后」的设计把 `postgres` 的影响集缩小到只剩 `main`。
:::

马丁还度量一个包的**抽象性** $A$——其中抽象类型（接口、协议、抽象类）所占的比例——并主张稳定的包应当是抽象的、不稳定的包应当是具体的，从而使设计良好的包落在「主序列」$A + I = 1$ 附近。一个 $A = 0$、$I = 0$ 的包（具体且被大量依赖）处于「痛苦区」：任何变更都很痛；一个 $A = 1$、$I = 1$ 的包（抽象且无人使用）处于「无用区」。

::: widget plot
f: 1 - x
x: 0, 1
y: 0, 1
points: 0, 1; 0.5, 0; 0, 0; 1, 1; 0.67, 0.1
labels: \text{主序列 } A + I = 1
caption: 马丁的抽象性—不稳定性图：横轴是不稳定性 $I$，纵轴是抽象性 $A$。[[#ex-instability]] 中的接口 `store` 位于 $(0, 1)$，恰在主序列上；PostgreSQL 适配器位于 $(0.5, 0)$；一个所有人都用的具体工具模块位于 $(0, 0)$，在痛苦区；一个无人使用的抽象位于 $(1, 1)$；一个主要具体的应用模块位于 $(0.67, 0.1)$。到直线的距离 $\lvert A + I - 1\rvert$ 只是一个粗略的警示信号，不是质量得分：像 `math` 这样的标准库模块人畜无害地待在 $(0, 0)$，因为它们几乎从不改变。
:::

这类指标能预测质量的证据有多好？褒贬不一。巴西利（Basili）、布里昂（Briand）与梅洛（Melo）（"A validation of object-oriented design metrics as quality indicators"，*IEEE TSE*，1996）发现，奇丹伯（Chidamber）与凯默勒（Kemerer）的若干类度量——包括对象间耦合——在一套学生开发的系统中与易错类相关联。但埃尔·伊曼（El Emam）与合作者（"The confounding effect of class size on the validity of object-oriented metrics"，*IEEE TSE*，2001）表明，一旦控制住类的大小，这类关联的大部分就消失了：大的类既有更多的耦合，*也*有更多的缺陷。要把指标当作发现值得一看之处的手段，而不是目标。

## SOLID 原则

罗伯特·马丁在 1990 年代末汇集了五条面向对象设计原则，并在 2000 年的文章 "Design principles and design patterns" 中作了阐述；迈克尔·菲瑟斯（Michael Feathers）后来把它们的首字母排成了缩写 **SOLID**。这些原则针对类而陈述，但同样适用于模块与服务。

::: definition SOLID 原则 {#def-solid}
- **单一职责**（SRP）：一个模块只应对一个、且仅一个*角色*（actor）负责——只有一个可能要求它改变的人的群体。等价地说，它应该只有一个改变的理由。
- **开闭原则**（OCP，伯特兰·迈耶（Bertrand Meyer），1988）：软件实体应对扩展开放、对修改关闭——新行为通过添加代码来加入，而不是通过编辑已经工作的代码。
- **里氏替换**（LSP，芭芭拉·利斯科夫（Barbara Liskov），1987）：子类型的对象必须能在期望超类型对象的任何地方替换使用，而不破坏任何客户程序的正确性（[[program-design/inheritance-polymorphism#def-lsp]]）。
- **接口隔离**（ISP）：不应强迫客户程序依赖它们不使用的操作；宁用若干小接口，不用一个大接口。
- **依赖倒置**（DIP）：高层模块不应依赖低层模块；两者都应依赖抽象。抽象不应依赖细节；细节应依赖抽象。
:::

### 单一职责

「职责」一词引出了关于什么才算*一件事*的无休止争论。马丁后来按角色给出的表述更有用：问一问*谁*会要求改这段代码。一个 `Invoice` 类计算总额（财务部门改动税规则时它要变）、把自己渲染成 HTML（设计师改版式时它要变）、又把自己存进数据库（运维团队迁移存储时它要变），它服务三个角色。任何一个角色提出的变更都有危及其他两个的风险，三个团队会在同一个文件里相撞。把它拆成发票计算、渲染器和仓储，每个团队就只编辑自己的模块。SRP 就是按变更来源定义的内聚（[[program-design/modules-patterns#def-coupling]]）。

### 开闭原则

用一串 `if kind == ...` 测试来选择行为的代码，每来一种新种类都必须编辑。开闭原则要求的结构是：新种类通过编写可插入其中的新代码来加入。

::: example 可插入的折扣规则 {#ex-ocp}
这家商店的定价支持若干条折扣规则，而市场部门每季度发明新规则。编排代码，使得添加一条规则不需要修改 `total` 或任何现有规则。
::: solution
每条规则都是从购物车到它所给折扣额的函数，规则由一个装饰器按名字登记在字典里（[[program-design/higher-order-functions]]）：

```python
from typing import Callable

Cart = list[float]                       # 商品单价
Rule = Callable[[Cart], float]           # 一条规则返回它给出的折扣额
RULES: dict[str, Rule] = {}

def rule(name: str) -> Callable[[Rule], Rule]:
    """装饰器：按名字登记一条折扣规则。"""
    def register(f: Rule) -> Rule:
        RULES[name] = f
        return f
    return register

@rule("none")
def no_discount(cart: Cart) -> float:
    return 0.0

@rule("ten_percent")
def ten_percent(cart: Cart) -> float:
    return 0.1 * sum(cart)

def total(cart: Cart, rule_name: str) -> float:   # 关闭：新规则从不要求编辑它
    return round(sum(cart) - RULES[rule_name](cart), 2)

# 数月之后，在一个新模块中：扩展而不修改。
@rule("cheapest_half_price")
def cheapest_half_price(cart: Cart) -> float:
    return min(cart) / 2 if len(cart) >= 2 else 0.0

cart = [12.0, 6.0, 8.0]
for name in RULES:
    print(f"{name:20} {total(cart, name)}")
```

```console
$ python3 discounts.py
none                 26.0
ten_percent          23.4
cheapest_half_price  23.0
$ mypy --strict discounts.py
Success: no issues found in 1 source file
```

新规则没有碰任何已有的行；`total` 和已有的规则不必因为它而重新测试（尽管新规则本身必须测）。这个设计就是带登记表的策略模式（[[program-design/modules-patterns#ex-strategy]]）。它的代价：现在要看全部规则，你得去搜索 `@rule`，而不是读一条 `if` 链；规则名字写错要到运行时才发现（`KeyError`），而不是读链子的时候。
:::
:::

没有代码能对*一切*变更关闭。这个设计对形如「购物车 → 折扣额」的新规则开放、也对它们关闭；一条需要顾客购买历史的规则不符合 `Rule` 类型，要加它就意味着修改抽象。OCP 是关于*让哪些*变更变廉价的决策，而且它应当为那些可能的变更而做——通常是在同类变更第二次、第三次被提出之后。

### 里氏替换

替换原则在 [[program-design/inheritance-polymorphism]] 中已被详细讨论，其中 [[program-design/inheritance-polymorphism#thm-lsp]] 证明了方法具有更弱前置条件与更强后置条件的子类可以被安全替换，而正方形—长方形例子给出了一个不能替换的子类。它在设计原则中的角色是让 OCP 和 DIP 变得安全：两者都依赖客户程序能与抽象的任一实现打交道，而这只有当每个实现都遵守抽象的规格说明时才成立。

### 接口隔离

一个大接口把每个客户程序与它的全部内容耦合起来。若一个报表模块依赖一个有四十个方法的 `Database` 接口却只用到两个，那么对其余三十八个方法的任何改变都可能迫使它重新编译、重新测试，至少重新阅读；而它测试中用到的任何假对象都必须实现全部四十个方法。

::: definition 角色接口 {#def-role-interface}
**角色接口**是由某一个客户程序（或某一类客户程序）对一个协作者的需要来定义的接口，而不是由这个协作者能做的一切来定义。按 ISP，一个类可以实现多个角色接口，而每个客户程序只依赖它自己的那个。
:::

在 Python 中，角色接口自然地写成**协议**（protocol）——结构化类型，任何具有合适方法的类都满足它，而无需继承它们（[[program-design/types-interfaces#def-subtyping]]）。

### 依赖倒置

这个原则的名字指的是箭头的方向。在朴素设计里，高层策略（报表）依赖低层细节（数据库）。在 DIP 之下，策略*拥有*一个描述其需要的抽象，而细节依赖——实现——那个抽象。源代码中的依赖现在指向控制流的反方向：报表在运行时调用数据库，但数据库适配器的代码导入报表的接口。

::: example 倒置报表的依赖 {#ex-dip}
重写月度报表，使它依赖一个自己拥有的角色接口，为它提供一个供测试用的内存实现，并展示类型检查器对一个方法签名错误的实现会说什么。
::: solution
```python
from typing import Protocol

class OrderStore(Protocol):
    """报表对存储的需要——归报表所在的层所有。"""
    def orders_between(self, start: str, end: str) -> list[tuple[str, float]]: ...

def monthly_total(store: OrderStore, month: str) -> float:
    rows = store.orders_between(f"{month}-01", f"{month}-31")
    return round(sum(amount for _, amount in rows), 2)

class InMemoryStore:
    """供测试用的假对象：不需要数据库。"""
    def __init__(self, rows: list[tuple[str, float]]) -> None:
        self.rows = rows
    def orders_between(self, start: str, end: str) -> list[tuple[str, float]]:
        return [(d, a) for d, a in self.rows if start <= d <= end]

class BrokenStore:
    def orders_between(self, start: str) -> list[tuple[str, float]]:   # 错误的签名
        return []

store = InMemoryStore([("2026-03-02", 19.5), ("2026-03-30", 5.25), ("2026-04-01", 99.0)])
print(monthly_total(store, "2026-03"))
monthly_total(BrokenStore(), "2026-03")
```

（ISO 日期作为字符串比较是正确的，而 `"…-31"` 对任何月份都是一个上界。）检查器在程序运行之前就抓住了这个坏掉的实现：

```console
$ mypy reports.py
reports.py:24: error: Argument 1 to "monthly_total" has incompatible type "BrokenStore"; expected "OrderStore"  [arg-type]
reports.py:24: note: Following member(s) of "BrokenStore" have conflicts:
reports.py:24: note:     Expected:
reports.py:24: note:         def orders_between(self, start: str, end: str) -> list[tuple[str, float]]
reports.py:24: note:     Got:
reports.py:24: note:         def orders_between(self, start: str) -> list[tuple[str, float]]
Found 1 error in 1 file (checked 1 source file)
$ python3 reports.py
24.75
Traceback (most recent call last):
  ...
TypeError: BrokenStore.orders_between() takes 2 positional arguments but 3 were given
```

报表现在对 PostgreSQL 一无所知。数据访问层里有一个方法相同的 `PostgresStore` 类，由组合根把它传进来——这种把协作者传入的做法称为**依赖注入**。测试使用 `InMemoryStore`，几微秒就能跑完。`OrderStore` 也是 [[#def-role-interface]] 意义上的角色接口：一个方法，恰是报表需要的，不管存储层还提供什么别的。
:::
:::

::: proposition 倒置限定细节的影响 {#prop-dip}
设一组高层模块 $H$ 只经由接口模块 $S$ 使用具体模块 $C$，使得 $H$ 中没有模块有路径到达 $C$，而 $C$ 依赖 $S$。假设唯一有边指向 $C$ 的模块是组合根 $R$，且没有模块依赖 $R$。那么 $C$ 的影响集是 $\{R\}$，而 $C$ 的保持 $S$ 的规格说明的变更不要求 $H$ 中有任何改动。
:::

::: proof
一个模块属于 $C$ 的影响集，当且仅当它有一条有向路径到达 $C$（[[#def-impact]]）。任何这样的路径都以一条指向 $C$ 的边结束，而这样的边只有从 $R$ 出发的那条；所以路径形如 $X \to \dots \to R \to C$。由于没有模块依赖 $R$，不存在指向 $R$ 的边，于是路径就是 $R \to C$ 且 $X = R$。故影响集是 $\{R\}$。对第二个论断，$H$ 中的模块只通过调用 $S$ 的操作与 $C$ 打交道；若 $C$ 仍满足 $S$ 的规格说明，每个客户程序中依赖该规格说明的推理就仍然有效（[[program-design/abstraction-specifications#thm-substitute]]）。
:::

::: warning 原则不是法律，间接也不免费
本章的每条原则都增加间接层：一个接口、一张登记表、一个工厂。间接层使变更得以局部化，但它也让代码更难读——要找 `store.orders_between` 到底做什么，必须查出被注入的是哪个对象——而且每个抽象都是对哪些变更将会到来的猜测。把这些原则用在永远不会变化的代码上，产生的东西有时被称作推测性通用性：只有一个实现、也永远不会有第二个实现的接口；只创建一个类的工厂；为没人做出的选择准备的配置。相反的原则 **YAGNI**（"you aren't gonna need it"，你不会需要它，出自极限编程）同样成立。一个合理的默认做法是先写直接版本，等第二个变体真的出现、或测试有所需要时再引入抽象——然后再重构（[[software-engineering/refactoring-maintenance]]），而不是预先设计。
:::

::: quiz
`UserService` 类有方法 `register`、`login`、`export_to_csv` 和 `send_newsletter`。简报代码由市场部门维护，CSV 导出由数据分析团队维护，其余由账户团队维护。这个设计最直接地违反了哪条原则？
- [x] 单一职责
- [ ] 里氏替换
- [ ] 依赖倒置
- [ ] 迪米特法则
::: solution
三个角色——账户、数据分析、市场——都要求修改同一个类，所以它有三个改变的理由：这是马丁基于角色的表述下的 SRP 违规。这里不涉及子类型（LSP），不涉及依赖的方向（DIP），也不涉及穿透对象（迪米特）。一个自然的修复是三个类，可能共享一个 `UserRepository` 角色接口。
:::
:::

## 其他原则

### 迪米特法则

**迪米特法则**出自东北大学（Northeastern University）的 Demeter 项目（利伯赫（Lieberherr）、霍兰（Holland）与里尔（Riel），OOPSLA 1988），它限制一个方法可以对其他对象的结构知道多少。

::: definition 迪米特法则 {#def-demeter}
对象 $o$ 的方法 $m$ 只应调用下列对象的方法：$o$ 自身；$m$ 的参数；$m$ 创建的对象；以及 $o$ 的直接组成部分（它的属性）。特别地，它不应调用此类调用*返回*的对象的方法。非正式地说：只与你的直接朋友交谈。
:::

```python
class Address:
    def __init__(self, city):
        self.city = city

class Customer:
    def __init__(self, name, address):
        self.name, self.address = name, address
    def city(self):                       # 顾客替自己的组成部分作答
        return self.address.city

class Order:
    def __init__(self, customer):
        self.customer = customer
    def shipping_city(self):
        return self.customer.city()

order = Order(Customer("Ada", Address("Leeds")))
print(order.customer.address.city)        # 穿透两个对象：知道了它们的内部结构
print(order.shipping_city())              # 只问自己的邻居；结构保持隐藏
```

```console
$ python3 demeter.py
Leeds
Leeds
```

两行打印相同的内容，但第一行把它的调用者与 `Order`、`Customer`、`Address` 的内部结构耦合起来；如果顾客可以有多个地址，每条这样的链都会断裂，而 `shipping_city` 只需在一处修改。代价是许多小型转发方法，而且这条法则不应应用于普通数据结构和以暴露自身结构为目的的流畅接口（`text.strip().lower()` 返回的是新字符串，不是内部构件）。

### 不要重复自己——但也不要统一错误的东西

安德鲁·亨特（Andrew Hunt）与大卫·托马斯（David Thomas）的《程序员修炼之道》（*The Pragmatic Programmer*，1999）提出了 **DRY**（Don't Repeat Yourself，不要重复自己）：「系统内的每一处知识，都必须有单一、无歧义、权威的表示。」税率、订单号的格式、哪些用户能看某份报表的规则——每一样都应当只写一次，使得变更不会在一处改了而另一处被忘掉。注意 DRY 关乎*知识*，不是文本。两个代码相同、却编码不同知识的函数（增值税率，以及恰好也是同一个数字的员工折扣）应当保持分开，因为它们会因不同的原因而改变；合并它们会造成虚假的耦合。桑迪·梅茨（Sandi Metz）被广泛引用的建议——「重复远比错误的抽象便宜」（2016）——是来自经验的观点而非度量结果，但它道出了权衡：在你理解这些重复有什么共同之处以前，先不要提取。

### 组合优于继承

《设计模式》一书（伽玛（Gamma）、赫尔姆（Helm）、约翰逊（Johnson）与弗拉迪西德斯（Vlissides），1994）建议「优先使用对象组合，而不是类继承」。子类的依赖不止于超类的接口，还包括其实现——即 [[program-design/inheritance-polymorphism#ex-fragile]] 的脆弱基类问题——而一个持有协作者并通过接口调用它的对象只依赖接口。本章大多数例子都使用组合：报表持有一个存储，定价持有一张规则表。

## 为变更而设计

所有这些原则都服务于大卫·帕纳斯（David Parnas）在两篇论文中陈述的一个目标："On the criteria to be used in decomposing systems into modules"（1972）——把每个可能改变的决定隐藏在接口之后——以及 "Designing software for ease of extension and contraction"（1979），其中论证软件应当按一个程序**家族**来设计，使有用的子集与扩展能通过添加或移除模块来产生，而不是通过重写。实践上：

1. **列出可能的变更。** 不同的数据源、新的折扣规则、第二个用户界面、法规变化、规模增长。需求（[[software-engineering/requirements]]）与同类系统的历史是最好的指南。
2. **给每个可能的变更一个模块**把它隐藏起来，并让系统的其余部分依赖该模块的接口而不是它的实现（信息隐藏、DIP）。
3. **使 uses 关系保持无环并指向稳定的方向**，从而使每个易变模块的影响集都小（[[#def-impact]]）。
4. **不抽象不太可能的变更**，并接受某些未预见的变更将需要一次重构。

::: example 是哪条原则？ {#ex-diagnose}
对每个症状，说出被违反的原则并给出修复。(a) 要添加一种支付方式，开发者要编辑一个 400 行、每种方式一个分支的 `process_payment` 函数。(b) 运费计算器的单元测试需要一个运行着的 SMTP 邮件服务器。(c) 类 `Bird` 有方法 `fly`，子类 `Penguin` 把它重写为抛出 `NotImplementedError`。(d) 一个 `Printer` 接口要求 `print`、`scan`、`fax` 和 `staple`，而简单打印机类把其中三个实现为 `pass`。
::: solution
(a) **开闭原则**：每种支付方式都应是 `PaymentMethod` 接口的一个独立实现，登记或注入进来，于是新方法就是新代码。(b) **依赖倒置**（以及单一职责）：计算器根本不该发邮件，或者应依赖一个 `Notifier` 角色接口，测试用假对象替换它。(c) **里氏替换**：调用 `fly` 的 `Bird` 客户程序碰到企鹅就会坏；`fly` 应属于 `FlyingBird` 抽象，或者把飞行做成一个能力对象，组合进会飞的鸟。(d) **接口隔离**：拆成 `Printer`、`Scanner`、`Fax`、`Stapler` 角色，让每个设备实现它真正支持的角色。注意那些 `pass` 实现同样违反 LSP：调用 `fax` 而期待发出传真的客户程序被无声地欺骗了。
:::
:::

::: history
拉里·康斯坦丁在 1960 年代发展了耦合与内聚，史蒂文斯、迈尔斯与康斯坦丁 1974 年的论文 "Structured design" 使它们为广泛读者所知。帕纳斯关于信息隐藏（1972）与程序家族（1979）的论文提供了更深刻的准则。伯特兰·迈耶在《面向对象软件构造》（*Object-Oriented Software Construction*，1988）中陈述了开闭原则，同年利伯赫、霍兰与里尔发表了迪米特法则；芭芭拉·利斯科夫 1987 年的主旨报告 "Data abstraction and hierarchy" 引入了替换思想，由利斯科夫与温（Wing）在 1994 年将其精确化。《设计模式》一书出版于 1994 年，带 DRY 的《程序员修炼之道》出版于 1999 年。罗伯特·马丁在 2000 年前后汇集了 SOLID 五原则，其著作《敏捷软件开发：原则、模式与实践》（*Agile Software Development: Principles, Patterns, and Practices*，2002）给出了不稳定性和抽象性的包度量。
:::

## 后续内容

原则大多应用于已经存在的代码：接下来关于版本控制与测试的两章提供安全网，而 [[software-engineering/refactoring-maintenance]] 展示如何以小步、保持行为的方式把现有代码移向这些原则。依赖倒置正是使 [[software-engineering/testing]] 的测试替身成为可能的东西。检查接口的类型系统（本章 `mypy` 所做）见 [[programming-languages/type-systems]]，同样的原则在更大的尺度上重现于服务边界（[[software-engineering/software-architecture]]）与安全边界（[[security/security-principles]]）。

::: summary
- 变更沿依赖扩散；模块的**影响集**是一切有路径到达它的模块（[[#def-impact]]）。让易变模块的影响集保持小。
- **不稳定性** $I = C_e/(C_a + C_e)$ 度量一个模块可以随意改动的自由程度（[[#def-instability]]）；沿稳定的方向依赖，并让稳定的模块是抽象的。指标指向需要仔细看的地方，而不是质量本身。
- **SOLID**（[[#def-solid]]）：一个模块一个角色；靠添加代码来扩展；子类型必须可替换；小的角色接口（[[#def-role-interface]]）；高层策略拥有细节所实现的抽象。
- 带组合根的**依赖倒置**把一个具体模块的影响限定在根上（[[#prop-dip]]），并使代码可以用假对象来测试。
- **迪米特法则**（[[#def-demeter]]）隐藏对象结构；**DRY** 关乎知识而非文本；优先**组合**而非继承。
- 每个抽象都有间接层的代价；把原则用在可能的变更上，等变更真的到来再重构（YAGNI）。
:::

## 习题

::: exercise 不稳定性 {level=1 check="0.75"}
模块 $M$ 被 2 个模块导入，它自己导入 6 个。它的不稳定性是多少？（输入数值。）
::: solution
由 [[#def-instability]]，$I = C_e/(C_a + C_e) = 6/(2 + 6) = 0.75$：相当不稳定。若 $M$ 是一个具体的、应用层的模块，这没什么问题；若它打算做共享的基础设施，这就是一个警示信号。
:::
:::

::: exercise 影响集大小 {level=1 check="3"}
模块及其导入：`app` 导入 `ui` 和 `core`；`ui` 导入 `core` 和 `widgets`；`core` 导入 `util`；`widgets` 导入 `util`；`cli` 导入 `core`。`core` 的影响集里有多少个模块？（输入数值。）
::: solution
有路径到达 `core` 的模块是 `app`（直接，也经由 `ui`）、`ui`（直接）和 `cli`（直接）：三个。`widgets` 和 `util` 不依赖 `core`。相比之下，`util` 的影响集是其余所有模块：`core`、`widgets`、`ui`、`app`、`cli`——五个——这正是 `util` 要么事实上非常稳定、要么必须藏在接口之后的原因。
:::
:::

::: exercise 找出违反迪米特法则的调用 {level=1}
在类 `Checkout` 的一个方法内部（该类有属性 `self.cart` 和参数 `payment`），下面哪些调用违反了迪米特法则（[[#def-demeter]]）？(a) `self.cart.total()` (b) `payment.authorise(amount)` (c) `self.cart.items[0].product.supplier.email()` (d) `Receipt(self.cart).render()`
::: solution
(a) 允许：`cart` 是直接组成部分。(b) 允许：`payment` 是参数。(c) 违反法则：它调用了一个经由三个中间对象到达的对象（供应商）的方法，把 `Checkout` 与购物车、条目、商品的结构耦合了起来。(d) 允许：`Receipt(...)` 是方法自己创建的对象。
:::
:::

::: exercise 按角色拆分 {level=2}
`Payslip`（工资单）类有方法 `gross_pay()`（规则来自工资部门）、`tax()`（规则来自税务机关，由财务团队实现）、`to_pdf()`（版式来自宣传团队）和 `save()`（存储由运维团队负责）。给出一个满足 SRP 的设计，并说明 (i) 引入新的税档、(ii) 公司徽标更换时，各有哪些类要变。
::: solution
四个模块，一个角色一个：`PayCalculator`（应发工资）、`TaxCalculator`、`PayslipRenderer`、`PayslipRepository`，再加上一个普通数据类 `Payslip` 存放它们之间传递的数字。计算器是雇员记录与规则的纯函数（[[program-design/functional-style]]）；渲染器接受一个 `Payslip` 并产出 PDF；仓储负责保存一份。(i) 新税档只改 `TaxCalculator`（以及它的测试）。(ii) 新徽标只改 `PayslipRenderer`。拆分之前，两个变更都要编辑同一个类，版式改动中的一个错误可能破坏税款计算。
:::
:::

::: exercise 一个隔离的接口 {level=2}
`Storage` 协议有方法 `read(key)`、`write(key, value)`、`delete(key)` 和 `list_keys()`。一个缓存预热作业只读；一个夜间清理作业只列出和删除。用 `typing.Protocol` 类为两个作业写出角色接口，给出一个同时满足两者的 `FileStorage` 类，并解释两个作业的测试会有什么变化。
::: solution
```python
from typing import Protocol

class Reader(Protocol):
    def read(self, key: str) -> bytes: ...

class Cleaner(Protocol):
    def list_keys(self) -> list[str]: ...
    def delete(self, key: str) -> None: ...

class FileStorage:                       # 满足 Reader 和 Cleaner（还多不少）
    def __init__(self) -> None:
        self.data: dict[str, bytes] = {}
    def read(self, key: str) -> bytes:
        return self.data[key]
    def write(self, key: str, value: bytes) -> None:
        self.data[key] = value
    def delete(self, key: str) -> None:
        del self.data[key]
    def list_keys(self) -> list[str]:
        return sorted(self.data)

def warm_cache(src: Reader, keys: list[str]) -> int:
    return sum(len(src.read(k)) for k in keys)

def clean_up(store: Cleaner, prefix: str) -> None:
    for k in store.list_keys():
        if k.startswith(prefix):
            store.delete(k)

fs = FileStorage()
fs.write("tmp/a", b"xyz"); fs.write("img/b", b"12")
print(warm_cache(fs, ["tmp/a", "img/b"]))
clean_up(fs, "tmp/")
print(fs.list_keys())
```

```console
$ python3 roles.py
5
['img/b']
$ mypy --strict roles.py
Success: no issues found in 1 source file
```

`FileStorage` 从不提及 `Reader` 或 `Cleaner`；它从结构上满足这两个协议。每个作业的测试假对象现在只需要一两个方法而不是四个；对 `write` 的改变——比如为过期时间增加一个新参数——既影响不到任何一个作业，也影响不到它们的测试。
:::
:::

::: exercise 知识还是巧合？ {level=2}
程序在结账处写着 `price * 1.2`（加收 20% 增值税），在工资模块写着 `salary * 1.2`（加班的 20% 奖金）。一位同事提议把两处都换成共享函数 `add_twenty_percent(x)`。用正确理解的 DRY 评价这个提议。
::: solution
两个表达式共享文本而不共享知识：一个编码增值税率（由政府确定），另一个编码薪酬规则（由公司确定）。它们会因不同的原因、在不同的时间改变。共享函数会把它们虚假地耦合起来：增值税改到 22% 时，要么奖金被意外改掉，要么必须有人发现并把函数再拆开。DRY 要求的是*每处*知识只表示一次：一个 `VAT_RATE` 常量，被每个计算增值税的地方使用；工资模块里一个 `OVERTIME_BONUS`。这个提议消除了文本的重复，却引入了一个错误的抽象。
:::
:::

::: exercise 影响集与环 {level=3}
证明：若模块 $X$ 与 $Y$ 位于依赖图的同一个有向环上，则除去自身之外它们有相同的影响集：$\mathrm{impact}(X) \cup \{X\} = \mathrm{impact}(Y) \cup \{Y\}$。由此推出：在有一条大环穿过全部 $n$ 个模块的图中，每个模块的影响集都有 $n - 1$ 个元素，并解释这对维护意味着什么。
::: solution
由于 $X$ 与 $Y$ 位于同一个环上，存在路径 $X \leadsto Y$ 与 $Y \leadsto X$。设 $Z \in \mathrm{impact}(X) \cup \{X\}$，于是存在路径 $Z \leadsto X$（当 $Z = X$ 时长度为零）。接上 $X \leadsto Y$ 就得到路径 $Z \leadsto Y$，所以 $Z \in \mathrm{impact}(Y) \cup \{Y\}$——若 $Z \ne Y$，则路径长度为正，$Z \in \mathrm{impact}(Y)$。由对称性，两个集合相等。若一个环穿过全部 $n$ 个模块，则每一对都在环上，于是每个模块的集合 $\mathrm{impact}(M) \cup \{M\}$ 等于全部 $n$ 个模块的集合，而 $\mathrm{impact}(M)$ 有 $n - 1$ 个元素。就维护而言这是最坏情形：*任何*模块接口的改动都可能影响*所有*其他模块，没有任何东西能被单独测试或复用，也不存在任何构建或初始化次序（[[program-design/modules-patterns#thm-dependency-order]]）。这就是 uses 关系中的环是第一个要消除的东西的原因，通常用依赖倒置：引入一个由环的一侧拥有、另一侧实现的接口，就反转了环中的一条边。
:::
:::

::: exercise 破除一个环 {level=3}
在模块图中，`orders` 导入 `customers`（要查顾客的折扣等级），`customers` 导入 `orders`（要计算顾客的累计消费）。用依赖倒置破除这个环，用协议（Protocol）以 Python 写出结果并运行。
::: solution
让 `customers` 拥有一个描述它对订单需要的角色接口，让 `orders` 实现它；于是 `orders → customers` 保留，而旧的边 `customers → orders` 被换成 `orders` 实现一个定义在 `customers` 中的接口：

```python
from typing import Protocol

# --- 模块 customers：拥有自己需要的抽象
class SpendingSource(Protocol):
    def spending_of(self, customer_id: int) -> float: ...

class Customers:
    def __init__(self, spending: SpendingSource) -> None:
        self.spending = spending
    def tier(self, customer_id: int) -> str:
        return "gold" if self.spending.spending_of(customer_id) >= 1000 else "standard"

# --- 模块 orders：依赖 customers，实现 SpendingSource
class Orders:
    def __init__(self) -> None:
        self.history: dict[int, list[float]] = {}
    def add(self, customer_id: int, amount: float) -> None:
        self.history.setdefault(customer_id, []).append(amount)
    def spending_of(self, customer_id: int) -> float:
        return sum(self.history.get(customer_id, []))
    def discount(self, customers: Customers, customer_id: int) -> float:
        return 0.1 if customers.tier(customer_id) == "gold" else 0.0

# --- 组合根
orders = Orders()
customers = Customers(orders)
orders.add(7, 800.0); orders.add(7, 300.0); orders.add(8, 50.0)
print(customers.tier(7), orders.discount(customers, 7))
print(customers.tier(8), orders.discount(customers, 8))
```

```console
$ python3 cycle.py
gold 0.1
standard 0.0
$ mypy --strict cycle.py
Success: no issues found in 1 source file
```

在源代码里，`customers` 现在只引用它自己定义的 `SpendingSource`；`orders` 引用 `Customers`；只有组合根知道两个具体类。运行时的调用仍然双向——这正是倒置的要义：控制流不变，而依赖图成了无环的，于是每个模块都可以用另一个的假对象来单独测试。
:::
:::
