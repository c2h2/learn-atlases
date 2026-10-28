图书馆的罚款系统是八年前由一位早已离职的人编写的。它能用——大体上能用——而且谁都不想碰它。现在图书馆要加一条新规则：有声读物的罚款按 DVD 计，但封顶 15 英镑。计算罚款的那个函数是二十行嵌套的 `if` 语句，而且还顺带排版打印报表；没有任何测试；上一个改动它的人引入了一个缺陷，使儿童在一个月里被双倍收费。改动本身就是一行代码。真正的工作是找到这一行该加在哪里、确信其他什么都没坏，并且把代码留给下一个人时不比现在更糟。

一个成功的程序，其一生中的大部分时间是在被修改中度过的。本章讲如何把修改做好：**维护**由什么构成、软件为什么会腐化，**重构**——在不改变行为的前提下，以小步且每步经过验证的方式改进代码结构——暗示该在哪里重构的**代码异味**，针对没有测试的**遗留代码**的**特征化测试**及其他技术，度量复杂度与寻找**热点**，以及**技术债**这一隐喻及其用处与局限。[[software-engineering/testing]] 的测试与 [[software-engineering/design-principles]] 的原则是工具；本章讲的是把它们应用到已经存在的代码上。

## 维护与演化

::: definition 维护的种类 {#def-maintenance}
**软件维护**是在软件产品交付之后对其进行的修改。它通常被划分为**改正性维护**（corrective，修正缺陷）、**适应性维护**（adaptive，使软件在变化了的环境中继续工作——新的操作系统、库版本、法规或数据格式）、**完善性维护**（perfective，响应用户增加功能、改进性能或可用性）以及**预防性维护**（preventive，使以后的维护更容易的修改，如重构与添加测试）。
:::

E. Burton Swanson 于 1976 年提出了前三类；第四类出现较晚，见于维护的国际标准 ISO/IEC 14764。令人意外的一个事实是——自 Lientz 与 Swanson 20 世纪 70 年代末的研究以来，一项又一项调查都在重复它——改正性工作反而是*较小*的部分：多数维护精力花在适应用户想让它做更多事情的系统上。精确的百分比取决于如何定义「维护」，常被引用的「维护占总成本的 60–90%」的说法并无单一可靠的出处，但方向是一致的：成功的软件被修改的时间，远比编写它所用的时间长。

梅尔·莱曼（Meir Lehman）与拉斯洛·贝莱迪（László Belady）研究了 IBM 的 OS/360 及其他大型系统在许多版本中的演化，提出了**软件演化定律**（Lehman，"Programs, life cycles, and laws of software evolution"，*Proceedings of the IEEE*，1980）。它们是关于嵌入真实世界的长命系统的经验性概括，不是定理。被引用最多的是前两条。**持续变化**：这样的程序必须不断适应，否则就日益不令人满意——因为它所建模的世界在变化。**复杂度递增**：随着它被修改，其复杂度会上升，除非下功夫维持或降低它。后来的工作广泛证实了第一定律，其余定律则对一些系统成立、对另一些不成立；例如开源项目有时比莱曼的模型预言的增长得更快。

第二条定律描述了**软件腐化**：每一次匆忙做出的、不顾设计的修改，都会增加一个特例、一条重复的规则、一个方向错误的依赖。没有哪一次修改会毁掉设计；它们的累积才会。重构正是抵消它的工作。

## 重构

::: definition 重构 {#def-refactoring}
**重构**是对软件内部结构的修改，它保持软件的**可观察行为**不变：对每个满足规格说明前置条件的输入，修改前后的输出与外部可见效果相同。**重构**（动词）指应用这样一串修改，每一步都小到足以检查——通常是在每一步之后运行测试。
:::

马丁·福勒（Martin Fowler）的目录性著作《重构》（*Refactoring*，1999；第二版改以 JavaScript 为例，2018）列出了约六十种重构手法及其操作：**提取函数**（Extract Function，把一段代码变成带名字的函数）、**内联函数**（Inline Function，反方向）、**重命名变量**、**搬移函数**（Move Function，搬到它最常使用其数据的模块）、**引入参数对象**（Introduce Parameter Object，把总是同行的参数归组）、**以多态取代条件表达式**（Replace Conditional with Polymorphism）、**分离阶段**（Split Phase，把一次计算分为计算与呈现两部分）、**以命名常量取代魔法字面量**。多数手法机械到现代编辑器能自动完成的程度。

「可观察」的含义必须确定。通常取规格说明的口径：返回值、异常、输出、对文件与数据库的写入。运行时间、内存使用与日志消息的顺序通常*不是*可观察的——如果它们是规格说明的一部分（比如实时系统），那么改变它们的「重构」就是行为变更。

::: proposition 重构可以复合 {#prop-refactor-compose}
若序列 $P_0 \to P_1 \to \dots \to P_n$ 的每一步都是相对于同一规格说明的重构，则 $P_0 \to P_n$ 也是重构。
:::

::: proof
当 $P$ 与 $Q$ 在每个满足前置条件的输入上具有相同的可观察行为时，记 $P \approx Q$。这是一个等价关系：自反性与对称性由定义即得；传递性成立，因为若 $P$ 与 $Q$ 在每个合法输入上一致，且 $Q$ 与 $R$ 在每个合法输入上一致，则 $P$ 与 $R$ 在每个合法输入上一致。对 $n$ 归纳即得 $P_0 \approx P_n$。
:::

这个命题很简单，但它正是这套方法的逻辑基础：一次整体根本无法验证的大型重构，只要它是由每一小步都经过验证的步骤组成的链条，就是安全的。验证通常靠测试，而测试是对行为的抽样，并非等价的证明；每一步保持小，正是为了让测试有较大的机会抓住错误，并让失败的测试指向造成它的那一步（[[software-engineering/version-control]] 使每次测试全绿之后就提交、以及回退都很廉价）。

自动化重构只有在其**前置条件**成立时才是安全的，威廉·奥普代克（William Opdyke）1992 年的博士论文——对重构的第一个系统研究——把前置条件明确写了出来。只有在 `total` 的使用处没有其他名为 `t` 的变量可见时，把局部变量 `total` 改名为 `t` 才保持行为不变——否则引用会被**捕获**，含义随之改变。把一段代码提取成函数，要求该段代码对局部变量的赋值被返回或传回。

::: warning 「重构」不是「重写」
这个词常被用来指对代码的任何大型改动——「我们在重构支付系统」其实意思是「我们要花三个月重写它」。那是重新设计，也许很不错，但它缺少使重构安全的东西：小步，且在每一个时刻都让系统保持工作、保持有测试。改变行为的修改——哪怕是顺手修掉你在途中发现的一个缺陷——不是重构；要把它作为单独的一步来做，配上自己的测试，这样一旦出事，你知道是哪一类改动造成的。肯特·贝克（Kent Beck）的意象是两顶帽子：重构时不增加功能，增加功能时不重排结构。
:::

### 代码异味

应该在哪里重构？肯特·贝克与马丁·福勒把问题的症状称为**代码异味**（code smells）——它们不是缺陷，而是设计将抗拒改变的信号。最常见的几种及其典型处置手法如下：

| 异味 | 症状 | 典型重构 |
|---|---|---|
| 过长的函数 | 需要用注释来解释各段的函数 | 提取函数、分离阶段 |
| 重复的代码 | 同一条规则写在多处（[[software-engineering/design-principles]]） | 提取函数、搬移函数 |
| 过长的参数列表 | 参数很多，其中一些总是成组传递 | 引入参数对象 |
| 发散式变化 | 一个模块因许多不同原因被修改 | 按职责拆分 |
| 霰弹式修改 | 一种改动触及许多模块 | 用搬移函数把规则收拢 |
| 依恋情结 | 一个函数使用别的模块的数据多于自己的数据 | 搬移函数 |
| 重复的 switch | 同一条按类型码分支的 `if`/`elif` 链出现在多处 | 以多态或一张表取代条件表达式 |
| 基本类型偏执 | 用浮点数表示钱、用字符串表示日期、用裸整数表示代码 | 引入小的值类型 |
| 神秘的命名 | `d`、`f`、`t`、`process`、`data2` | 重命名 |

## 重构实践

### 先把当前行为钉住

没有测试的代码无法安全地重构，因为没有任何东西能告诉你行为是否得到了保持。迈克尔·费瑟斯（Michael Feathers）在《修改代码的艺术》（*Working Effectively with Legacy Code*，2004）中，把**遗留代码**干脆定义为没有测试的代码，并给出了标准的起手式。

::: definition 特征化测试 {#def-characterisation}
**特征化测试**记录一段代码*实际做了什么*，而不是规格说明说它应当做什么：在选定的输入上运行代码，捕获其输出，并把这些输出作为测试的期望值。它的目的是检测重构期间行为的*任何*变化；若记录下来的行为看起来有问题，就把它标记出来供人决策，但在重构期间不改动它。
:::

::: example 一个特征化测试 {#ex-characterise}
下面是罚款函数。请为它写一个特征化测试。

```python
def report(loans, today):
    out = "Overdue items\n"
    t = 0
    for l in loans:
        d = today - l["due"]
        if d > 0:
            if l["kind"] == "book":
                f = d * 0.25
                if f > 10:
                    f = 10
            elif l["kind"] == "dvd":
                f = d * 1.0
                if f > 20:
                    f = 20
            else:
                f = d * 0.10
            if l["member"] == "child":
                f = f / 2
            t = t + f
            out += "  " + l["title"] + ": " + str(d) + " days, " + "%.2f" % f + "\n"
    out += "Total: " + "%.2f" % t + "\n"
    return out
```

::: solution
选择能覆盖每个分支的输入——一本书、一张 DVD、另一种类型、一名儿童会员、一个尚未逾期的条目——并包含一个触及封顶值的情形。运行代码，对照馆员所说的规则检查输出，再把它粘贴进测试。测试导入环境变量 `FINES` 所指定版本的模块，从而同一个测试可以在重构的每一步之后运行：

```python
import importlib, os
fines = importlib.import_module(os.environ.get("FINES", "fines_v0"))

LOANS = [
    {"title": "Dune", "kind": "book", "due": 100, "member": "adult"},
    {"title": "Alien", "kind": "dvd", "due": 95, "member": "adult"},
    {"title": "Gruffalo", "kind": "book", "due": 60, "member": "child"},
    {"title": "Nature", "kind": "magazine", "due": 98, "member": "adult"},
    {"title": "Emma", "kind": "book", "due": 120, "member": "adult"},   # 尚未逾期
]

def test_characterise_report():
    # 特征化测试：期望文本是代码在 2026-03-10 产生的输出，
    # 已对照图书馆的罚款规则人工核对过。
    assert fines.report(LOANS, today=110) == (
        "Overdue items\n"
        "  Dune: 10 days, 2.50\n"
        "  Alien: 15 days, 15.00\n"
        "  Gruffalo: 50 days, 5.00\n"
        "  Nature: 12 days, 1.20\n"
        "Total: 23.70\n")
```

```console
$ FINES=fines_v0 pytest -q test_fines.py
.                                                                        [100%]
1 passed in 0.11s
```

编写测试揭示了两个值得追问的事实。一本逾期 50 天的儿童图书罚款 5.00 英镑：先把 12.50 英镑封顶到 10 英镑，*然后*减半；这是规则本意，还是应先打折再封顶（那样是 6.25 英镑，未超封顶）？而杂志根本没有封顶：一本逾期一年的杂志要收 36.50 英镑。特征化测试把两个行为都原样保留；要不要改它们是需求问题（[[software-engineering/requirements]]），应另行回答。
:::
:::

### 小步前进

::: example 重构罚款报表函数 {#ex-refactor-steps}
分三步重构 `report`——提取罚款计算、以表取代条件、把计算与呈现分离——每一步之后都运行特征化测试。
::: solution
**第 1 步：提取函数。** 把罚款计算移到 `fine(loan, days)` 中；`report` 调用它。只有名字变了：在新函数内部 `l` 变成了 `loan`。

```python
def fine(loan, days):
    if loan["kind"] == "book":
        f = days * 0.25
        if f > 10:
            f = 10
    elif loan["kind"] == "dvd":
        f = days * 1.0
        if f > 20:
            f = 20
    else:
        f = days * 0.10
    if loan["member"] == "child":
        f = f / 2
    return f
```

**第 2 步：以表取代条件，并给魔法数字命名。** 每个分支形状相同——每日费率与一个封顶值——于是规则变成了数据：

```python
# 类型 -> (每日罚款, 罚款上限)；未列出的类型用 DEFAULT_RATE
RATES = {"book": (0.25, 10.0), "dvd": (1.0, 20.0)}
DEFAULT_RATE = (0.10, float("inf"))
CHILD_DISCOUNT = 0.5

def fine(loan, days):
    per_day, cap = RATES.get(loan["kind"], DEFAULT_RATE)
    f = min(days * per_day, cap)
    return f * CHILD_DISCOUNT if loan["member"] == "child" else f
```

这一步真的保持行为不变吗？对每个浮点数 `x`，`min(x, 10.0)` 都等于原来的 `if f > 10: f = 10`；无穷大的封顶复现了「不封顶」；而乘以 $0.5$ 与除以 $2$ 给出完全相同的浮点数，因为两者只改变指数（[[computer-systems/floating-point]]）。测试也这样认为。

**第 3 步：分离阶段。** 把*该付多少*与*怎么打印*分开：

```python
def overdue(loans, today):
    """第 1 阶段，计算：每个逾期借阅的（书名、逾期天数、罚款）。"""
    for loan in loans:
        days = today - loan["due"]
        if days > 0:
            yield loan["title"], days, fine(loan, days)

def report(loans, today):
    """第 2 阶段，呈现：把算好的行排成文本。"""
    rows = list(overdue(loans, today))
    lines = ["Overdue items"]
    lines += [f"  {title}: {days} days, {amount:.2f}" for title, days, amount in rows]
    lines.append(f"Total: {sum(amount for _, _, amount in rows):.2f}")
    return "\n".join(lines) + "\n"
```

每一步之后运行测试：

```console
$ for v in v0 v1 v2 v3; do FINES=fines_$v pytest -q test_fines.py | tail -1; done
1 passed in 0.11s
1 passed in 0.14s
1 passed in 0.12s
1 passed in 0.14s
```

现在，所要求的改动——有声读物每天 1 英镑、封顶 15 英镑——就是一行：在 `RATES` 里加上 `"audiobook": (1.0, 15.0)`，再加上一个针对它的测试。计算部分无需解析文本就能测试，第二种呈现（一个 HTML 页面、一封电子邮件）可以复用 `overdue`。每一步都小到读一遍就能检查；而由 [[#prop-refactor-compose]]，它们合起来保持了测试所钉住的行为——就测试采样到的范围而言。
:::
:::

## 复杂度度量

托马斯·麦凯布（Thomas McCabe）提出用控制流图的结构来度量函数的复杂度（"A complexity measure"，*IEEE TSE*，1976）。

::: definition 圈复杂度 {#def-cyclomatic}
对一张有 $E$ 条边、$N$ 个结点、$P$ 个连通分支（每个函数一个）的控制流图，其**圈复杂度**为 $V = E - N + 2P$。单个函数时 $P = 1$，$V = E - N + 2$。
:::

$V$ 是图中线性无关路径的条数，因此它也是某一路径覆盖形式所需的测试数（麦凯布的**基路径测试**），并且是分支覆盖所有独立路径所需测试数的下界。最简单的做法是直接从代码上计算。

::: proposition 复杂度数的是判定 {#prop-cyclomatic}
对一个由简单语句经顺序、`if`（带或不带 `else`）与 `while` 构成、具有单入口单出口的函数，$V = d + 1$，其中 $d$ 是二元判定的个数（其 `if` 与 `while` 语句的条件数）。
:::

::: proof
对代码结构归纳，由部件的图搭出每种构造的图，每个部件图都只有一个入口结点和一个出口结点。记 $V(X) = E_X - N_X + 2$。

**简单语句：** 一个结点，没有边，$V = 0 - 1 + 2 = 1$，且 $d = 0$。

**序列 $X; Y$：** 两个图之间用一条从 $X$ 的出口到 $Y$ 的入口的边连接，故 $E = E_X + E_Y + 1$，$N = N_X + N_Y$，于是 $V = V(X) + V(Y) - 1 = (d_X + 1) + (d_Y + 1) - 1 = d_X + d_Y + 1$。

**`if` $c$ `then` $X$ `else` $Y$：** 添加一个判定结点和一个汇合结点，边为 判定 → $X$、判定 → $Y$、$X$ → 汇合、$Y$ → 汇合：$E = E_X + E_Y + 4$，$N = N_X + N_Y + 2$，于是 $V = V(X) + V(Y) = d_X + d_Y + 2$，即 $d + 1$，其中 $d = d_X + d_Y + 1$。不带 `else` 时，边 判定 → $Y$ → 汇合 被一条边 判定 → 汇合 取代：$E = E_X + 3$，$N = N_X + 2$，$V = V(X) + 1 = d_X + 2$。

**`while` $c$ `do` $X$：** 添加一个判定结点和一个出口结点，边为 判定 → $X$、$X$ → 判定、判定 → 出口：$E = E_X + 3$，$N = N_X + 2$，$V = V(X) + 1 = d_X + 2$。

每种情形都有 $V = d + 1$，归纳完成。
:::

`for` 循环是变装的 `while` 循环，算一个判定；每个 `and`/`or` 也增加一个判定，因为短路求值（[[programming-1/values-types#def-short-circuit]]）使它有自己的分支。

::: example 重构前后的复杂度 {#ex-complexity}
写一个工具，计算文件中每个顶层函数的圈复杂度，并把它应用到 [[#ex-refactor-steps]] 中罚款模块的四个版本上。
::: solution
Python 的 `ast` 模块给出语法树，其中的判定结点是类型已知的结点：

```python
import ast, sys

DECISIONS = (ast.If, ast.For, ast.While, ast.IfExp, ast.comprehension, ast.ExceptHandler)

def cyclomatic(func):
    """麦凯布复杂度：1 + 判定点的个数（每个多出的 and/or 也计数）。"""
    v = 1
    for node in ast.walk(func):
        if isinstance(node, DECISIONS):
            v += 1
        elif isinstance(node, ast.BoolOp):
            v += len(node.values) - 1
    return v

if __name__ == "__main__":
    for path in sys.argv[1:]:
        tree = ast.parse(open(path).read())
        funcs = [n for n in tree.body if isinstance(n, ast.FunctionDef)]
        print(path.ljust(12), ", ".join(f"{f.name}={cyclomatic(f)}" for f in funcs))
```

```console
$ python3 complexity.py fines_v0.py fines_v1.py fines_v2.py fines_v3.py
fines_v0.py  report=8
fines_v1.py  fine=6, report=3
fines_v2.py  fine=2, report=3
fines_v3.py  fine=2, overdue=3, report=3
```

原来的 `report` 有七个判定——循环、`d > 0`、图书与 DVD 两个测试、两个封顶测试、儿童测试——所以 $V = 8$。提取 `fine` 把它分成 6 和 3 两块；表格则从 `fine` 中一共去掉了四个判定，因为差异搬进了数据。（在最后一个版本中，`report` 里的两个推导式算作判定，多数工具也这样计数。）麦凯布建议拆分 $V > 10$ 的函数；和一切这样的阈值一样，这是一种约定，不是研究结论。
:::
:::

::: widget graph
nodes: kind@0,1; book@1,0; cap10@2,0; dvd@1,2; cap20@2,2; set20@3,3; set10@3,0; other@2,3.6; child@4,1; halve@5,0; ret@6,1
edges: kind>book; kind>dvd; book>cap10; cap10>set10; cap10>child; set10>child; dvd>cap20; dvd>other; cap20>set20; cap20>child; set20>child; other>child; child>halve; child>ret; halve>ret
algorithm: dfs
start: kind
caption: [[#ex-refactor-steps]] 第 1 步之后 `fine` 的控制流图：判定结点 `kind`（是图书吗？）、`dvd`、`cap10`、`cap20` 与 `child`，以及赋值对应的语句结点。数一数：11 个结点、15 条边，故 $V = 15 - 11 + 2 = 6$；判定有 5 个，与 [[#prop-cyclomatic]] 一致。逐步执行深度优先搜索来遍历这张图。从 `kind` 到 `ret` 共有 10 条完整路径，但*线性无关*的只有 6 条：每条路径都是某个 6 元基的组合，这正是 $V$ 所计的数。第 2 步之后，整张图坍缩成一个判定。
:::

### 从哪里下手：热点

一个大型遗留系统的异味多到谁也修不完。亚当·托恩希尔（Adam Tornhill，《Your Code as a Crime Scene》，2015）推广了把两个度量结合起来做选择的做法：复杂度说明代码有多难改，来自版本历史的**变更频率**说明人们多有频繁不得不改它。没人碰的复杂模块代价不大；天天改的简单模块代价也不大；既复杂又常被改的——**热点**——才是重构有回报的地方。缺陷预测研究早已发现，变更历史的度量——如近期变更次数、不同作者人数——是缺陷将出现在何处的较强预测因子之一（例如 Nagappan 与 Ball，"Use of relative code churn measures to predict system defect density"，ICSE 2005，针对 Windows Server 2003），这支持这一启发式做法，不过这类预测的强度因项目而异。

### 大规模遗留代码

费瑟斯的书很大程度上讲的是如何把遗留代码纳入测试框架这一难题：一个在构造函数中打开数据库连接的类，在测试里根本实例化不了。他的答案是寻找**接缝**（seam）——无需修改当地代码就能改变行为之处，例如一个可以传入假对象的参数，或一个可以在测试子类中覆写的函数；若无处可寻，就用尽可能小的改动制造一个（又是依赖倒置，[[software-engineering/design-principles#ex-dip]]）。

::: example 制造一个接缝 {#ex-seam}
一个遗留类在构造函数中连接生产数据库，因此无法测试。请做出能让测试在一个一次性数据库上运行它的最小改动，并写出测试。

```python
import sqlite3

class MemberReport:
    def __init__(self):
        self.conn = sqlite3.connect("/srv/library/members.db")

    def overdue_counts(self):
        rows = self.conn.execute(
            "SELECT member, COUNT(*) FROM loans WHERE returned = 0 GROUP BY member")
        return dict(rows.fetchall())
```
::: solution
把硬编码的路径改成默认值等于原值的参数。每个现有调用者都不传参数，行为与从前完全一样——这个改动是重构——但测试现在可以传入 SQLite 的特殊名字 `":memory:"` 得到一个全新的空数据库：

```python
import sqlite3

class MemberReport:
    def __init__(self, db_path="/srv/library/members.db"):   # 接缝：一个参数
        self.conn = sqlite3.connect(db_path)

    def overdue_counts(self):
        rows = self.conn.execute(
            "SELECT member, COUNT(*) FROM loans WHERE returned = 0 GROUP BY member")
        return dict(rows.fetchall())
```

```python
from members import MemberReport

def test_overdue_counts_ignores_returned_loans():
    report = MemberReport(":memory:")          # 一个空的内存数据库
    report.conn.executescript("""
        CREATE TABLE loans (member TEXT, title TEXT, returned INTEGER);
        INSERT INTO loans VALUES ('ada', 'Dune', 0), ('ada', 'Emma', 0),
                                 ('bo', 'Alien', 1), ('bo', 'Nature', 0);
    """)
    assert report.overdue_counts() == {"ada": 2, "bo": 1}
```

```console
$ pytest -q test_members.py
.                                                                        [100%]
1 passed in 0.14s
```

测试伸手进 `report.conn` 去建表，这使它耦合于类的内部；作为第一个立足点，这是可以接受的。类一旦有了测试保护，后续重构就可以传入一个连接或类似 `OrderStore` 的接口来代替路径，测试也就不必再碰内部了。（SQL 本身见 [[databases/sql]]。）
:::
:::

对于在无测试代码中增加新行为，他建议**生枝**（sprouting）：把新逻辑写成一个经过测试的新函数，用一行改动从遗留代码里调用它。

要替换整个遗留系统，已知最安全的策略是渐进式的。马丁·福勒将其命名为**绞杀无花果**（strangler fig）模式（2004），名字来自一种藤蔓：它缠绕大树生长，直到自己能够独立挺立——在旧系统之前放一个路由层，在新系统中一次实现一个功能，把该功能的流量改道过去，再一块一块地退役旧代码。每一步都小、可回退、在生产环境中运行。另一种做法是一次性替换一切的「大爆炸」式重写，在实践者文献中声名不佳，因为旧系统未成文的行为——多年积累的特例——往往直到切换之后才被重新发现。

::: quiz
一个团队必须修改一个没有测试的 2,000 行函数。哪个第一步最安全？
- [ ] 按规格说明重写这个函数，它可能比代码更正确。
- [ ] 先仔细读代码、把它重构成更小的函数，然后再写测试。
- [x] 通过其现有接口编写特征化测试，然后小步重构。
- [ ] 直接做改动，靠用户报告任何问题。
::: solution
特征化测试钉住当前行为，包括用户依赖的未成文部分，从而每个重构步骤都能被检查。按规格说明重写丢掉的恰恰是这些部分；在测试之前重构则无可对照；而用户是一套昂贵、缓慢的测试。
:::
:::

## 技术债

沃德·坎宁安（Ward Cunningham）在 OOPSLA 1992 的一篇经验报告中提出了**技术债**隐喻，讲的是一套金融应用：交付体现着不完全理解的代码就像借钱——它能加快开发，前提是随理解加深及时修订代码、尽快还债；危险在于未还的债会积累**利息**，表现为后来的每次修改都更慢。这一隐喻已被扩展到涵盖代码的任何缺陷，马丁·福勒的「技术债四象限」（2009）区分**故意**欠下的债（「我们必须现在发布，后果自负」）与**无意**欠下的债（「现在我们知道了当初该怎么做」），以及**审慎**与**鲁莽**（「我们没时间做设计」）。只有审慎且故意的债才是一项商业决策；其余的只是对代码怎么变成这样的描述。

一个玩具模型说明利息为何要紧。设每次改动花费 $c$ 份工作，此外每单位累积债务 $D$ 再加 $k$ 份，而每次不清理的改动使债务增加 $\delta$。第 $n$ 次改动之前债务为 $(n - 1)\delta$，这样 $n$ 次改动之后的总花费为
$$
\sum_{j=0}^{n-1} (c + k j \delta) = n c + k \delta \,\frac{n (n-1)}{2},
$$ {#eq-debt}
关于 $n$ 是二次的。一支团队若每次改动多花 $r$ 用于重构，把债务保持在零，则总花费为 $n(c + r)$：线性。二次的终会超过线性的，大约在 $n \approx 2r/(k\delta) + 1$；在那之前，不重构更便宜。这个模型是幅漫画——真实的债务并不均匀，其利息只在代码被改动处支付，这正是热点的论据——但它既解释了为什么跳过清理短期内看似理性，也解释了为什么长期会失败。

::: widget plot
f: x*c + k*d*x*(x - 1)/2; x*(c + r)
x: 0, 100
y: 0, 600
sliders: c=1:0.5:5:2; k=0:0.01:0.5:0.1; d=0:0.1:2:0.5; r=0:0.1:3:0.5
labels: \text{no clean-up: } nc + k\delta n(n-1)/2; \text{refactor each change: } n(c + r)
caption: 玩具债务模型 [[#eq-debt]]：$n$ 次改动（横轴）后的累积花费（纵轴），其中每次改动的基础成本为 $c$、每单位债务的利息为 $k$、每次不清理的改动增加债务 $\delta$（`d`）、重构开销为 $r$。默认参数下，两曲线在 $n = 2r/(k\delta) + 1 = 21$ 处相交。把 $k$ 调到接近零——再也不会碰的代码——清理就永远不划算；把 $\delta$ 调大，清理几乎立刻划算。这是对隐喻的演示，不是任何经过标定的项目模型。
:::

技术债在实践中有多大？这很难度量，因为「债」是和某个并不存在的更好设计相比较而言的。调查给人的是印象而不是数字：Besker、Martini 与 Bosch（*Journal of Systems and Software*，2019）结合一项调查与开发者自己的日志，报告开发者估计自己平均约 23% 的工作时间因技术债而浪费。自报的浪费时间估计应当谨慎看待，但它们表明这一代价被认为相当大、持续存在，而非偶发。

::: history
E. Burton Swanson 1976 年的论文 "The dimensions of maintenance" 提出了改正性/适应性/完善性的分类；Lehman 与 Belady 对 OS/360 的研究导出了 Lehman 定律，汇集在他 1980 年的论文中。Thomas McCabe 于 1976 年发表了圈复杂度。William Opdyke 1992 年在伊利诺伊大学的博士论文（导师为 Ralph Johnson）给出了对重构及其前置条件的第一个形式化处理；John Brant 与 Don Roberts 的 Smalltalk Refactoring Browser（1997）实现了自动化。Ward Cunningham 于 1992 年创造了「技术债」一词。Martin Fowler 的《重构》（*Refactoring*，1999，含 Kent Beck 撰写的异味一章；第二版 2018）与 Michael Feathers 的《修改代码的艺术》（2004）使这些实践成为主流，如今自动化重构已是程序设计编辑器的标配。
:::

## 后续内容

重构的安全程度取决于它背后的测试（[[software-engineering/testing]]）；测试不够时，等价性证明与静态分析（[[software-engineering/verification]]）可以帮忙，而 [[compilers/dataflow-optimisation]] 中的编译器正带着证明执行这种保持行为的变换。重构把代码引向的设计原则见 [[software-engineering/design-principles]]；整个系统的演化——一次迁移一个服务——见 [[software-engineering/software-architecture]]。

::: summary
- 花在成功软件上的大部分精力是交付之后的修改——改正性、适应性、完善性与预防性**维护**（[[#def-maintenance]]）。莱曼定律：现实世界的软件必须不断改变，其复杂度除非下功夫降低就会增长。
- **重构**保持可观察行为（[[#def-refactoring]]）；一串小的、经过检查的重构仍是一次重构（[[#prop-refactor-compose]]）。尊重每种重构的前置条件，绝不把重构与行为变更混在一起。
- **代码异味**——过长的函数、重复、霰弹式修改、重复的 switch——暗示该在哪里重构。
- 对**遗留代码**，先为代码实际所做的一切写**特征化测试**（[[#def-characterisation]]），寻找或制造接缝，然后分步重构；大型系统要逐渐替换（绞杀无花果）。
- **圈复杂度** $V = E - N + 2$ 对结构化代码等于判定数 $+1$（[[#def-cyclomatic]]、[[#prop-cyclomatic]]）；把它与变更频率结合，寻找**热点**。
- **技术债**是一个隐喻，指设计落后于理解的代码所带来的额外修改代价；它的利息在代码被改动处支付，所以要在那里还债（[[#eq-debt]]）。
:::

## 习题

::: exercise 数判定 {level=1 check="4"}
按 [[#prop-cyclomatic]]，这个函数的圈复杂度是多少？（填入数字。）

```python
def classify(n):
    if n < 0:
        return "negative"
    while n % 2 == 0 and n > 0:
        n //= 2
    return "odd part " + str(n)
```
::: solution
判定为 `if`、`while`，以及 `and` 的短路求值多出来的一个分支：$d = 3$，故 $V = 4$。四个测试即可走过各条独立路径：负数、奇数（循环未进入）、零（`and` 的第二个操作数为假）、正的偶数（循环进入）。
:::
:::

::: exercise 哪一类维护？ {level=1}
按 [[#def-maintenance]] 给每项改动分类：(a) 修复输入文件为空时的崩溃；(b) 把一个旧版本已不再被支持的 Web 框架升级到新主版本；(c) 应用户要求增加导出为电子表格格式的功能；(d) 拆分一个 3,000 行的模块并添加测试，行为不变；(e) 法律变更后修改增值税的计算。
::: solution
(a) 改正性。(b) 适应性——环境变了。(c) 完善性。(d) 预防性。(e) 适应性：软件的——这里是法律——环境变了；若用户主动要求，也可算完善性，这说明这些范畴是用来思考的，不是用来精确记账的。
:::
:::

::: exercise 说出异味名 {level=1}
说出异味的名字：(a) 增加一种新货币需要改动价格显示、发票生成器、税务模块和数据库模式。(b) 一个函数 `print_invoice(name, street, city, postcode, country, ...)` 有十一个参数，其中前五个总是来自同一个客户记录。(c) `Order.total()` 读取 `self.customer.discount_tier`、`self.customer.region` 与 `self.customer.loyalty_years`，并用它们完成全部计算。
::: solution
(a) 霰弹式修改：一种改动散在许多模块；把货币处理收拢进一个 `Money` 类型与一个货币模块。(b) 过长的参数列表，具体说是数据泥团；引入参数对象（传入一个 `Address`，或客户本身）。(c) 依恋情结：计算属于客户——把函数搬移为 `Customer.discount_for(order)`。
:::
:::

::: exercise 一张图的复杂度 {level=2 check="5"}
一个函数的控制流图有 14 个结点、17 条边。它的圈复杂度是多少？若它是 [[#prop-cyclomatic]] 那样的结构化函数，它含多少个二元判定？（填入复杂度。）
::: solution
$V = E - N + 2 = 17 - 14 + 2 = 5$，故由 [[#prop-cyclomatic]] 它有 $d = V - 1 = 4$ 个二元判定。
:::
:::

::: exercise 一次并非重构的重命名 {level=2}
下面的代码中，一位开发者用文本编辑器的查找替换，把 `price` 中的形参 `rate` 全部改名为 `r`。说明为什么这不是重构，以及自动化重命名会怎么做。

```python
r = 0.2                      # 模块级增值税率

def price(amount, rate):
    return amount * (1 + rate) * (1 + r)
```
::: solution
文本替换之后，函数变成 `return amount * (1 + r) * (1 + r)`：两处现在都指*形参*，对模块级 `r` 的引用被**捕获**了。调用 `price(100, 0.1)` 原来返回 $100 \times 1.1 \times 1.2 = 132$，现在返回 $100 \times 1.1 \times 1.1 = 121$，行为改变了。这次改名违反了它的前置条件（新名字在该作用域中不得已经可见）。自动化重命名要么拒绝执行，要么警告存在冲突；细心的人会换一个名字，或先给全局变量改名（`VAT_RATE`，反正它是更好的名字）。
:::
:::

::: exercise 先特征化，再改动 {level=2}
下面的函数已在生产中使用且没有测试。请为它编写特征化测试、记下任何可疑之处，然后在保持行为不变的前提下把折扣规则提取成自己的函数。

```python
def basket_total(items, coupon):
    t = 0
    for name, price, qty in items:
        t += price * qty
    if coupon == "SAVE10" and t > 50:
        t = t * 0.9
    elif coupon == "SAVE5":
        t = t - 5
    return round(t, 2)
```
::: solution
在覆盖每个分支与边界的输入上运行它，记录结果：

```python
from basket import basket_total

def test_characterise():
    items = [("tea", 3.5, 4), ("cake", 12.0, 3)]          # 14 + 36 = 50
    assert basket_total(items, None) == 50.0
    assert basket_total(items, "SAVE10") == 50.0           # 恰为 50：无折扣
    assert basket_total(items + [("jam", 0.01, 1)], "SAVE10") == 45.01
    assert basket_total(items, "SAVE5") == 45.0
    assert basket_total([("pen", 2.0, 1)], "SAVE5") == -3.0   # 可疑！
    assert basket_total([], "save10") == 0                  # 优惠码区分大小写
```

可疑的行为要向业务方提出，而*不*在重构期间修复：`SAVE5` 可能把总额变成负数，且优惠码区分大小写。然后提取：

```python
def apply_coupon(total, coupon):
    if coupon == "SAVE10" and total > 50:
        return total * 0.9
    if coupon == "SAVE5":
        return total - 5
    return total

def basket_total(items, coupon):
    t = sum(price * qty for _, price, qty in items)
    return round(apply_coupon(t, coupon), 2)
```

```console
$ pytest -q test_basket.py
.                                                                        [100%]
1 passed in 0.12s
```

两个版本都通过。注意 `sum` 与原来的循环按相同顺序累加相同的值，因此连浮点结果都完全相同；若改变相加的顺序，就保证不了这一点了。
:::
:::

::: exercise 寻找热点 {level=3}
写一个程序，把 Git 仓库的变更历史与本章的圈复杂度工具结合，按**热点分数** =（改动过该文件的提交数）×（其中函数的最高复杂度，没有函数则为 1）为 Python 文件排序。在一个小仓库上测试。
::: solution
```python
import ast, subprocess, sys
from collections import Counter
from complexity import cyclomatic          # 上面的函数

def changes(repo):
    """每个文件被多少个提交改动过。"""
    log = subprocess.run(["git", "-C", repo, "log", "--format=", "--name-only"],
                         capture_output=True, text=True, check=True).stdout
    return Counter(line for line in log.splitlines() if line)

def max_complexity(path):
    funcs = [n for n in ast.walk(ast.parse(open(path).read()))
             if isinstance(n, ast.FunctionDef)]
    return max((cyclomatic(f) for f in funcs), default=1)

repo = sys.argv[1]
rows = [(n * max_complexity(f"{repo}/{name}"), name, n)
        for name, n in changes(repo).items() if name.endswith(".py")]
for score, name, n in sorted(rows, reverse=True):
    print(f"{name:10} changes={n:2}  complexity={score // n:2}  hotspot score={score}")
```

一个测试仓库里有最初的 `fines.py`（在 8 个提交中改动过）、一行的 `config.py`（10 个提交）与一个不大的 `loans.py`（3 个提交）：

```console
$ git -C lib log --format= --name-only | sort | uniq -c | sort -rn
     10 config.py
      8 fines.py
      3 loans.py
$ python3 hotspot.py lib
fines.py   changes= 8  complexity= 8  hotspot score=64
config.py  changes=10  complexity= 1  hotspot score=10
loans.py   changes= 3  complexity= 1  hotspot score=3
```

`config.py` 改动最频繁但无关紧要；`fines.py` 既复杂又常被改，所以排第一。程序假设历史中出现过的每个文件仍然存在（已删除或改名的文件会让 `open` 失败；真正的工具会跳过它们，或用 `git log --follow` 追踪改名），而且对所有历史一视同仁地计数，而近期变更通常更有信息量。
:::
:::

::: exercise 清理何时划算？ {level=3 check="21"}
在 [[#eq-debt]] 的玩具模型中，证明不清理的累积花费恰在 $n > 1 + 2r/(k\delta)$ 时超过清理的花费，并求 $c = 2$、$r = 0.5$、$k = 0.1$、$\delta = 0.5$ 时的盈亏平衡改动次数。（填入盈亏平衡的 $n$。）
::: solution
不清理的花费为 $nc + k\delta\, n(n-1)/2$；清理的花费为 $n(c + r)$。前者超过后者，当且仅当 $k\delta\, n(n-1)/2 > nr$，两边除以 $n > 0$，当且仅当 $k\delta (n - 1)/2 > r$，即 $n > 1 + 2r/(k\delta)$。注意 $c$ 被消掉了：每次改动的基础成本无关紧要，要紧的只是重构的开销与省下的利息之比。代入所给数值，$1 + 2 \times 0.5/(0.1 \times 0.5) = 1 + 20 = 21$：21 次改动之后两种策略花费相同（两种方式都是 $21 \times 2.5 = 52.5$），此后清理占优，且优势按二次速度增长。
:::
:::
