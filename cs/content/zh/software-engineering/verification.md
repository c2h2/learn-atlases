1996 年 6 月 4 日，第一枚阿丽亚娜 5 号（Ariane 5）火箭在起飞约 37 秒后偏离航向、空中解体。由雅克-路易·莱昂斯（Jacques-Louis Lions）主持的调查委员会把损失追溯到惯性基准系统里的几行代码。一个与火箭水平速度有关的 64 位浮点值被转换为 16 位带符号整数；该值超过了 32,767，转换引发异常，而异常未被处理，于是惯性基准计算机关机。运行同一套软件的备用计算机，早在几分之一秒前已经同样失效。主机随后把诊断数据当作飞行数据读取，命令喷管满舵偏转。这套软件沿自阿丽亚娜 4 号，后者的航迹使该值保持很小；当初基于一个对阿丽亚娜 4 号正确的分析，有意没有给转换加保护。更糟的是，所涉函数在起飞后毫无用处。没有一个测试使用过阿丽亚娜 5 号的航迹。

测试是对行为的抽样；阿丽亚娜的失败藏在没有人抽样的输入里。本章讲的是能对*全部*行为进行推理、或在测试无能为力的地方给出定量信心的技术：**可信性**（dependability）的术语体系，测试对极高可靠性系统所能说明之点的极限，**静态分析**及其根本局限，**形式规格说明**与**契约式设计**，并发设计的**模型检测**，以及**安全攸关**软件的标准与实践。推理程序的逻辑——霍尔三元组、不变式——已在 [[program-design/abstraction-specifications]] 中建立；这里我们借助工具应用这种推理。

## 可信性

::: definition 故障、错误、失效 {#def-fault-error-failure}
**失效**是系统所提供的服务偏离正确服务——偏离其规格说明所要求者——的事件。**错误**是系统状态中可能导致失效的那一部分。**故障**是被判定或被假设的错误成因——代码中的缺陷、硬件故障、操作员的误操作。故障产生错误时称为**激活**；错误会**传播**，直到被发现并处理，或导致失效。
:::

这套术语出自阿维日尼斯（Avižienis）、拉普里（Laprie）、兰德尔（Randell）与兰德韦尔（Landwehr）的 "Basic concepts and taxonomy of dependable and secure computing"（*IEEE Transactions on Dependable and Secure Computing*，2004），它把 故障 → 错误 → 失效 这条链分开，而每一环都是可以下手的地方。**故障预防**（良好的设计、严谨的语言）、**故障排除**（测试、评审、验证）与**容错**（在错误变成失效之前检测错误并恢复——冗余、异常处理、重启）互为补充。在阿丽亚娜事故中，故障是那个没有保护的转换，错误是溢出的值；它之所以变成失效，是因为错误处理的设计——出现任何异常就关闭计算机，假定那是硬件故障——对一个同等地影响两台计算机的软件故障而言是错的。

**可靠性**是在给定环境中于给定时间内无失效运行的概率；**可用性**是系统处于随时可用状态的时间比例；**安全性**是不对人及环境造成灾难性后果；**信息安全**是保护机密性、完整性与可用性不受蓄意攻击（[[security/security-principles]]）。彼此是不同的：一列永不出站的火车是安全的，但不可用。

::: proposition 稳态可用性 {#prop-availability-mc}
把一个可修复系统建模为每小时观测一次的二状态马尔可夫链：处于上（up）状态时，它在下一小时以概率 $p$ 失效；处于下（down）状态时，以概率 $q$ 在下一小时被修复（$0 < p, q \le 1$）。它长期处于上状态的时间比例为
$$
A = \frac{q}{p + q} = \frac{\mathrm{MTTF}}{\mathrm{MTTF} + \mathrm{MTTR}},
$$
其中 $\mathrm{MTTF} = 1/p$ 与 $\mathrm{MTTR} = 1/q$ 是以小时计的平均失效时间与平均修复时间。
:::

::: proof
当 $p, q > 0$ 且两者不都为 1 时，该链不可约且非周期（$p = q = 1$ 的情形每小时交替一次，时间平均为 $1/2$，与公式一致）。其平稳分布 $(\pi_u, \pi_d)$ 满足平衡方程 $\pi_u p = \pi_d q$——从上到下的流等于从下到上的流——且 $\pi_u + \pi_d = 1$，解得 $\pi_u = q/(p+q)$；由马尔可夫链的遍历定理（[数学图谱：马尔可夫链](/learn/maths/lesson.php?c=probability&l=markov-chains)），这就是长期处于上状态的小时比例。从上状态到失效的时间服从均值为 $1/p$ 的几何分布，修复时间服从均值为 $1/q$ 的几何分布；代入 $p = 1/\mathrm{MTTF}$、$q = 1/\mathrm{MTTR}$ 即得第二种形式。
:::

::: widget markov
matrix: 0.999, 0.001; 0.25, 0.75
states: Up; Down
start: 0
steps: 50
caption: [[#prop-availability-mc]] 的马尔可夫链，$p = 0.001$ 每小时（$\mathrm{MTTF} = 1000$ h）、$q = 0.25$ 每小时（$\mathrm{MTTR} = 4$ h）。由平稳分布得 $A = 0.25/0.251 \approx 0.99602$，由 $1000/1004$ 也得此值。试试把修复时间减半（把 Down 行设为 0.5, 0.5）：可用性升到约 0.998，与把 MTTF 加倍的收益相同。更快的恢复往往是更便宜的可用性来源，这也是*服务恢复时间*被当作交付度量的原因之一（[[software-engineering/software-process]]）。
:::

### 测试不能说明什么

假设我们要证明某个飞行控制函数的失效频率低于每 $10^9$ 小时一次——民用航空器灾难性失效条件所要求的量级。在真实条件下测试（按运行剖面做「统计测试」）可以估计失效率，但算术不饶人。

::: proposition 为极高可靠性做测试 {#prop-test-infeasible}
设失效按运行每小时恒定速率 $\lambda$ 的泊松过程发生。若系统在 $t$ 小时的真实测试中无失效运行，那么只有当
$$
t \ge \frac{\ln(1/\alpha)}{\lambda_0}
$$
时，断言 $\lambda \le \lambda_0$ 才在 $1 - \alpha$ 的置信水平上得到支持（其含义是：一个 $\lambda > \lambda_0$ 的系统通过这样的测试的概率小于 $\alpha$）。
:::

::: proof
在模型下，$t$ 小时内的失效数服从均值 $\lambda t$ 的泊松分布，故一次都不失效的概率是 $e^{-\lambda t}$。对速率 $\lambda > \lambda_0$ 的系统，它小于 $e^{-\lambda_0 t}$。我们需要 $e^{-\lambda_0 t} \le \alpha$，即 $\lambda_0 t \ge \ln(1/\alpha)$。
:::

对 $\lambda_0 = 10^{-9}$ 每小时、99% 置信，$t \ge \ln 100 / 10^{-9} \approx 4.6 \times 10^{9}$ 小时——相当于 50 万多年的无失效测试。里基·巴特勒（Ricky Butler）与乔治·菲内利（George Finelli）在 "The infeasibility of quantifying the reliability of life-critical real-time software"（*IEEE TSE*，1993）中提出了这一论证。并行运行许多副本在实践中也逃不掉它，贝叶斯式的修正只能略微缓和这些数字。结论不是这样的软件造不出来，而是它的可信性不能*仅仅*靠测试来*论证*：证据还必须来自它被建造的方式——严谨的过程、分析、证明、体系结构——以及来自同类系统的经验。模型假设失效是随机的，这对软件本身就成疑问，因为软件的故障是确定性的；随机性在于到来的是哪些输入。

通往高可靠性的另一条路是**设计多样性**：独立开发若干版本，然后投票。若各版本独立失效，三个失效概率各为 $10^{-4}$ 的版本几乎永远不会被多数票否决。约翰·奈特（John Knight）与南希·莱维森（Nancy Leveson）用实验检验了独立性假设（"An experimental evaluation of the assumption of independence in multiversion programming"，*IEEE TSE*，1986）：同一份规格说明独立编写的 27 个程序版本，在相同输入上一起失效的次数远高于独立性的预言，独立性假设被拒绝——人们会在同一个问题的同一难点上犯同样的错。多样性有用，但帮助小于概率相乘给人的印象（[[software-engineering/software-architecture]] 的共因模型在此适用）。

## 静态分析

**静态分析**在不运行程序的情况下检查程序，以确立其所有执行的性质：「没有变量在赋值前被使用」「这个下标总在范围内」「没有任何 `None` 会到达这次加法」。编译器的类型检查器就是静态分析器；代码检查工具（linter）、以及证明运行期错误不存在的工具也是。

::: definition 可靠且完备的分析 {#def-sound}
设 $\Phi$ 是程序的某个性质（例如「从不除以零」）。一个只回答「是，程序具有 $\Phi$」或「可能不」的分析称为**可靠的**（sound），只要它说「是」时程序确实具有 $\Phi$（不放过任何违反，即没有**漏报**，false negatives）；它称为**完备的**，只要程序具有 $\Phi$ 时它就说「是」（没有**误报**，false alarms）。
:::

::: proposition 没有完美的分析 {#prop-rice}
对图灵完备语言的程序的任何非平凡语义性质 $\Phi$——只依赖程序的输入–输出行为、且对某些程序成立而对另一些不成立的性质——不存在既能总是停机、又对 $\Phi$ 既可靠又完备的分析。
:::

::: proof
这样的分析就能判定 $\Phi$：它说「是」时回答「具有 $\Phi$」，说「可能不」时回答「不具有 $\Phi$」（由完备性，它只对不具有 $\Phi$ 的程序这样说）。由赖斯定理（Rice's theorem，[[theory-of-computation/decidability]]），没有算法能判定非平凡的语义性质，故这样的分析不存在。
:::

因此每个实用的分析器都要放弃一点什么。用于安全攸关代码的**可靠**分析器可能报出必须由人来查看的误报。用于多数日常开发的**不可靠**缺陷查找器报告可能的缺陷，并接受自己会漏掉一些，换来的是很少误报——一个喊「狼来了」的工具会被人无视。`mypy` 这类类型检查器是务实的中间派：在它们理解的 Python 片段上可靠，在理解不了的地方留出逃生舱（`Any`、`cast`）。

::: example 漏网的 None {#ex-mypy-none}
一个函数返回会员的借阅上限，对不存在的会员返回 `None`。请说明类型检查器如何找出 `None` 会造成运行期失败的位置。
::: solution
```python
def loan_limit(limits: dict[str, int], member: str) -> int | None:
    """会员的借阅上限；对不存在的会员返回 None。"""
    return limits.get(member)

def can_borrow(limits: dict[str, int], member: str, on_loan: int) -> bool:
    return on_loan < loan_limit(limits, member)
```

```console
$ mypy members.py
members.py:6: error: Unsupported operand types for < ("int" and "None")  [operator]
members.py:6: note: Right operand is of type "int | None"
Found 1 error in 1 file (checked 1 source file)
```

所有已知会员的测试都能通过；只有未知会员时缺陷才出现，此时 Python 在运行期抛出 `TypeError`。检查器对*所有*输入进行推理：声明的返回类型 `int | None` 包含 `None`，而 `<` 对 `None` 没有定义。修复的做法是把这一情形显式化，检查器会跟着 `if` 知道其后 `limit` 是 `int`：

```python
def can_borrow(limits: dict[str, int], member: str, on_loan: int) -> bool:
    limit = loan_limit(limits, member)
    if limit is None:              # 检查器现在知道以下各行的 limit 是 int
        return False
    return on_loan < limit
```

```console
$ mypy members_fixed.py
Success: no issues found in 1 source file
```

东尼·霍尔（Tony Hoare）1965 年在 ALGOL W 中引入了空引用，后来称之为自己「价值十亿美元的失误」；像这里这样把「不存在」写进类型，正是静态分析给出的解药。
:::
:::

### 抽象解释

分析器怎么可能不逐个尝试就对所有输入进行推理？帕特里克·库索（Patrick Cousot）与拉迪娅·库索（Radhia Cousot）（POPL 1977）形式化了的**抽象解释**，在*抽象值*上运行程序：每个抽象值代表一集具体值——符号、区间、可能类型的集合——并使用保证过度近似具体运算的抽象运算。

::: proposition 区间运算是可靠的 {#prop-intervals}
设对由常数、变量、$+$、$-$ 与 $\times$ 构成的算术表达式的每个变量 $x$ 指派一个区间 $[a_x, b_x]$，并按规则 $[a, b] + [c, d] = [a + c,\ b + d]$、$[a, b] - [c, d] = [a - d,\ b - c]$ 与 $[a, b] \times [c, d] = [\min P, \max P]$（其中 $P = \{ac, ad, bc, bd\}$）计算表达式的区间。则对 $x \in [a_x, b_x]$ 的任何取值，表达式的值都落在算得的区间内。
:::

::: proof
对表达式归纳。常数 $k$ 得 $[k, k]$，变量得它自己的区间：两者都包含其值。对 $e_1 + e_2$，由归纳假设 $u \in [a, b]$、$v \in [c, d]$，有 $a + c \le u + v \le b + d$。减法中，$u - v$ 在 $u = a$ 且 $v = d$ 时最小，在 $u = b$ 且 $v = c$ 时最大。乘法中，固定 $v$ 时函数 $u \mapsto uv$ 是线性的，故它在 $[a, b]$ 上的最值在 $u = a$ 或 $u = b$ 处取得；对 $v$ 同理；于是 $uv$ 在矩形上的最值在四个角点之积 $P$ 之中。
:::

这些规则可靠但不完备：对 $x \in [0, 1]$，表达式 $x - x$ 得到的区间是 $[-1, 1]$，尽管它的值恒为 $0$，因为规则忘了两个操作数是同一个变量。这种不精确是停机与速度的代价，也是误报的来源。

::: example 这个转换会溢出吗？ {#ex-intervals}
一段导航程序计算 `64 * v - 3 * drift`，并把结果存入 16 位带符号整数。旧飞行器上 $v \in [0, 400]$、$\mathit{drift} \in [-50, 50]$；新的一型更快，$v \in [0, 600]$。（数字仅为示例。）请证明该转换安全，或者把它标出来。
::: solution
```python
import ast

def interval(node, env):
    """在已知各变量区间的前提下，求包含表达式所有可能值的
    最小区间 [lo, hi]（抽象解释）。"""
    if isinstance(node, ast.Constant):
        return (node.value, node.value)
    if isinstance(node, ast.Name):
        return env[node.id]
    if isinstance(node, ast.BinOp):
        (a, b), (c, d) = interval(node.left, env), interval(node.right, env)
        if isinstance(node.op, ast.Add):
            return (a + c, b + d)
        if isinstance(node.op, ast.Sub):
            return (a - d, b - c)
        if isinstance(node.op, ast.Mult):
            products = [a * c, a * d, b * c, b * d]
            return (min(products), max(products))
    raise ValueError(f"unsupported: {ast.dump(node)}")

INT16 = (-32768, 32767)

def check_int16(expr, env):
    lo, hi = interval(ast.parse(expr, mode="eval").body, env)
    safe = INT16[0] <= lo and hi <= INT16[1]
    print(f"{expr} in [{lo}, {hi}]:", "safe" if safe else "MAY OVERFLOW int16")

expr = "64 * v - 3 * drift"
check_int16(expr, {"v": (0, 400), "drift": (-50, 50)})     # 旧飞行器的包线
check_int16(expr, {"v": (0, 600), "drift": (-50, 50)})     # 更快的飞行器
```

```console
$ python3 intervals.py
64 * v - 3 * drift in [-150, 25750]: safe
64 * v - 3 * drift in [-150, 38550]: MAY OVERFLOW int16
```

对旧的包线，[[#prop-intervals]] *证明*了每个值都落在 $[-32768, 32767]$ 内：没有任何测试能对一切输入确立这一点。对新的包线，分析器把转换标了出来。这里的警报是真的（$v = 600$、$\mathit{drift} = -50$ 得 $38{,}550$），尽管一般情形下警报只意味着「有可能」。这正是阿丽亚娜的教训：安全性的证明依赖于关于输入的假设（$v \le 400$），而复用悄悄改变了假设。溢出时发生什么则是另一个设计选择。Python 的 `struct.pack("<h", 38000)` 会报错，就像阿丽亚娜的 Ada 代码；`ctypes.c_int16(38000).value` 则悄悄回绕成 $-27{,}536$，就像 C。两者都不安全；安全的设计检查范围，并显式处理越界值。
:::
:::

工业界的可靠分析器就是这样造的，只是抽象域丰富得多。法国高等师范学校（École normale supérieure）开发的 Astrée 自 2003 年起用于证明空客电传操纵软件 C 代码中运行期错误（溢出、除零、越界访问）的不存在，且在这些代码上几乎没有误报。基于类似思想、不保证可靠但可扩展的分析器，在大型科技公司里每次变更都会运行。

## 行为规格说明

静态分析证明的是*一般性*性质——不崩溃、不溢出。要证明程序做了它该做的事，就需要一份关于它该做什么的**形式规格说明**：用逻辑或数学记号写出的精确陈述。规格说明语言包括 **Z**（Jean-Raymond Abrial 与牛津的同事们，始于 20 世纪 70 年代末）、**VDM**、**B 方法**（Abrial，用于 1998 年开通的巴黎地铁 14 号线无人驾驶系统）、兰波特（Lamport）面向并发与分布式系统的 **TLA+**（*Specifying Systems*，2002），以及丹尼尔·杰克逊（Daniel Jackson）2002 年带有自动分析器的结构化建模语言 **Alloy**。即便什么都未证明，编写形式规格说明本身就有价值：它迫使需求（[[software-engineering/requirements]]）中的含糊之处暴露出来。

在代码这一层，**契约式设计**（design by contract）——伯特兰·梅耶（Bertrand Meyer）的术语，内置于他的 Eiffel 语言（1986）——为每个例程附上调用者必须建立成立的**前置条件**、例程保证的**后置条件**，为每个类附上每个公开操作都必须保持成立的**不变式**。它们就是 [[program-design/abstraction-specifications]] 与 [[program-design/abstract-data-types]] 中的规格说明与表示不变式的可执行版本：测试期间在运行期检查，也是验证工具中证明的对象。契约还裁决*责任归属*：前置条件被违反是调用方的过错，后置条件被违反则是例程本身的过错。

::: example 契约即断言 {#ex-contracts}
给一个有界栈配上以断言书写的、每个操作的前置条件、后置条件与不变式，并展示当调用方违反前置条件时会发生什么——Python 的 `-O` 选项开与关两种情形。
::: solution
```python
class BoundedStack:
    """最多容纳 `capacity` 个元素的栈。
    不变式：0 <= len(self._items) <= self.capacity。"""
    def __init__(self, capacity):
        assert capacity >= 1, "precondition: capacity >= 1"
        self.capacity, self._items = capacity, []
        self._check()

    def _check(self):
        assert 0 <= len(self._items) <= self.capacity, "invariant broken"

    def push(self, x):
        assert len(self._items) < self.capacity, "precondition: stack not full"
        old = len(self._items)
        self._items.append(x)
        assert len(self._items) == old + 1 and self._items[-1] == x, "postcondition"
        self._check()

    def pop(self):
        assert self._items, "precondition: stack not empty"
        x = self._items.pop()
        self._check()
        return x

s = BoundedStack(2)
s.push("a"); s.push("b")
print(s.pop(), s.pop())
s.push("c"); s.push("d"); s.push("e")
```

```console
$ python3 contracts.py
b a
Traceback (most recent call last):
  File ".../contracts.py", line 28, in <module>
    s.push("c"); s.push("d"); s.push("e")
                              ~~~~~~^^^^^
  File ".../contracts.py", line 13, in push
    assert len(self._items) < self.capacity, "precondition: stack not full"
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: precondition: stack not full
$ python3 -O contracts.py; echo "exit $?"
b a
exit 0
```

第三次 `push` 违反了前置条件，消息也这么说了：缺陷在*调用方*——它往已满的栈上压——不在 `push` 里。后置条件与不变式检查守护的是栈自身的代码；它们在这里从未触发，这正是我们想要的。在 `python3 -O` 之下每个 `assert` 都被删掉（[[programming-1/testing-debugging]]），程序悄悄地把第三项压进了容量为 2 的栈——不变式被破坏而无人被告知。对于只是*调试*辅助、且程序已经验证过会尊重这些检查的情形，这是可以接受的；如果不受你控制的调用方可能违反前置条件，就用 `if` 检查它，并抛出属于接口的异常。运行期的契约检查只在实际运行的输入上发现违反；同样的契约交给验证器，可以对所有输入加以证明。
:::
:::

## 模型检测

并发程序是最常颠覆直觉的地方，因为即使只有两个短进程，调序的数目也很大，而坏的调序在测试中难得出现。**模型检测**穷举系统有限模型的*每一个*可达状态。

::: definition 迁移系统、不变式、反例 {#def-transition-system}
**迁移系统**由**状态**集 $S$、**初始状态** $s_0 \in S$ 以及**后继**关系（给出每个状态一步之内可达的状态）组成。若存在一条从 $s_0$ 出发的路径到达某状态，则称该状态**可达**。**不变式**是关于状态的谓词 $I$；若 $I$ 在每个可达状态成立，则系统**满足**它。**反例**是从 $s_0$ 到一个 $I$ 为假的可达状态的路径。
:::

::: algorithm 显式状态不变式检测 {#alg-model-check}
**输入：** 具有有限多个可达状态的迁移系统，不变式 $I$。**输出：**「满足」，或一个最短反例。

1. 把 $s_0$ 标为已见、无前驱，放入 FIFO 队列。
2. 当队列非空时：
   1. 取出队首状态 $s$。
   2. 若 $I(s)$ 为假，沿父指针从 $s$ 回溯到 $s_0$，返回逆序的路径。
   3. 对 $s$ 的每个尚未见过的后继 $t$：标记为已见，把 $s$ 记为其父，并入队。
3. 返回「满足」。
:::

::: theorem 模型检测可靠、完备且给出最短反例 {#thm-model-check}
在具有有限多个可达状态的迁移系统上，[[#alg-model-check]] 停机；当且仅当不变式在每个可达状态成立时它返回「满足」；而它返回反例时，不存在更短的反例。
:::

::: proof
这就是广度优先搜索（[[algorithms/graph-search#thm-bfs]]）。每个可达状态至多入队一次，因为它在首次入队时被标记，而这样的状态只有有限多个，故循环停机。每个入队的状态都可达（其父指针链就是从 $s_0$ 出发的路径）；而每个可达状态最终都会入队并被检查，除非算法提前停止：对它的最短路径长度归纳即可，因为该路径上它的前驱会被检查，若还没有人让它入队，前驱就会让它入队。于是若不变式在某处不成立，就有一个违反的状态被检查并返回反例；若它处处成立，队列排空，返回「满足」。广度优先搜索按距 $s_0$ 距离不减的顺序检查状态，父指针记录的是最短路径；所以第一个被检查的违反状态处于最小距离，其路径就是最短反例。
:::

::: example 一把坏掉的锁 {#ex-model-check}
两个进程共用一把由两个标志构造的锁。每个进程反复执行：*只要对方的标志抬起就等待；抬起自己的标志；进入临界区；放下自己的标志。*请检查「两者从不同时处于临界区」这一不变式。
::: solution
检测器就是上面那个算法的通用写法：

```python
from collections import deque

def check(initial, successors, invariant):
    """广度优先搜索所有可达状态。若不变式处处成立，返回（已探索状态数, None）；
    否则返回 (n, path)，其中 path 是从初始状态到违反状态的最短状态序列。"""
    parent = {initial: None}
    queue = deque([initial])
    while queue:
        s = queue.popleft()
        if not invariant(s):
            path = []
            while s is not None:
                path.append(s)
                s = parent[s]
            return len(parent), path[::-1]
        for t in successors(s):
            if t not in parent:
                parent[t] = s
                queue.append(t)
    return len(parent), None
```

状态由两个程序计数器与两个标志组成；每一步让一个进程执行一条语句：

```python
from modelcheck import check

# 每个进程执行：  while flag[other]: 等待；  flag[me] = True；  临界区；  flag[me] = False
# 程序计数器：0 = 测试对方的标志，1 = 抬起自己的标志，2 = 临界区。
def naive_successors(state):
    pc, flag = list(state[0]), list(state[1])
    for me in (0, 1):
        other = 1 - me
        p, f = pc[:], flag[:]
        if pc[me] == 0:
            if flag[other]:
                continue                 # 被阻塞：对方的标志抬着
            p[me] = 1
        elif pc[me] == 1:
            f[me], p[me] = True, 2
        else:                            # 离开临界区
            f[me], p[me] = False, 0
        yield (tuple(p), tuple(f))

mutex = lambda s: s[0] != (2, 2)         # 两者不同时处于临界区
n, trace = check(((0, 0), (False, False)), naive_successors, mutex)
print(n, "states explored; counterexample:")
for pcs, flags in trace:
    print("  pc =", pcs, " flags =", flags)
```

```console
$ python3 locks.py
9 states explored; counterexample:
  pc = (0, 0)  flags = (False, False)
  pc = (1, 0)  flags = (False, False)
  pc = (1, 1)  flags = (False, False)
  pc = (2, 1)  flags = (True, False)
  pc = (2, 2)  flags = (True, True)
```

读这条踪迹：进程 0 看到标志 1 是放下的，就往下走；*在它抬起自己的标志之前*，进程 1 也看到标志 0 是放下的，也往下走；接着两者都抬起标志、都进入临界区。测试与置位不是原子的。这个缺陷只需要四个步的一种特定调序；把两个进程作为线程跑的测试可能成千上万次都通过。加里·彼得森（Gary Peterson）的算法（1981）通过增加一个共享的 `turn` 变量修复了它：*抬起自己的标志；把轮次让给对方；只要对方标志抬着且轮到对方就等待*。用同样的方式建模（见 [[#ex-peterson]]），检测器穷举全部 20 个可达状态并报告互斥成立。在真实硬件上，彼得森算法还需要内存屏障，因为处理器会对内存操作重排序（[[operating-systems/synchronisation]]）；模型假设它们不重排。
:::
:::

::: widget graph
nodes: 00FF@0,0; 10FF@1,0; 20TF@2,0; 01FF@0,1; 11FF@1,1; 21TF@2,1; 02FT@0,2; 12FT@1,2; 22TT@2,2
edges: 00FF>01FF; 00FF>10FF; 01FF>02FT; 01FF>11FF; 02FT>00FF; 10FF>11FF; 10FF>20TF; 11FF>12FT; 11FF>21TF; 12FT>10FF; 12FT>22TT; 20TF>00FF; 21TF>01FF; 21TF>22TT; 22TT>02FT; 22TT>20TF
algorithm: bfs
start: 00FF
caption: [[#ex-model-check]] 中那把坏锁的完整状态空间：每个状态先写两个程序计数器、再写两个标志（`T`/`F`），布局为进程 0 的计数器沿横轴、进程 1 的沿纵轴。从 `00FF` 执行广度优先搜索：它在深度 4 处沿检测器打印的那条路径到达 `22TT`，即两个进程都在临界区的状态。9 个状态全部可达；对 $k$ 个进程、每个 $m$ 个局部状态的情形，状态空间可以按 $m^k$ 增长——这就是限制显式状态模型检测的**状态爆炸**。
:::

真正的模型检测器——SPIN（杰拉德·霍尔兹曼（Gerard Holzmann），贝尔实验室）、TLA+ 的 TLC 检测器、NuSMV、C 语言的 CBMC——做的是同一件事，外加工业级的工程：紧凑的状态存储、偏序归约（跳过不可能有影响的调序）、用二元判定图做符号表示，以及**有界模型检测**——把「存在长度不超过 $k$ 的反例吗？」编码为 SAT 或 SMT 求解器的可满足性问题。它们还检查**活动性**（liveness）性质（「每个想要锁的进程最终都能得到锁」），用 LTL 这样的时序逻辑表达。埃德蒙·克拉克（Edmund Clarke）、艾伦·埃默森（Allen Emerson）与约瑟夫·西法基斯（Joseph Sifakis）因 1981–82 年开创这一领域而获得 2007 年图灵奖。一份被广泛引用的工业报告——Newcombe 等人的 "How Amazon Web Services uses formal methods"（*Communications of the ACM*，2015）——描述了工程师们如何用 TLA+ 指定分布式算法、并用模型检测器发现细微的设计缺陷——其中 DynamoDB 复制协议的一个缺陷，其最短反例有 35 步——这些缺陷都曾通过评审与大量测试。

### 经过验证的软件

对「代码满足形式规格说明」的完全证明已从研究走进了少数真实系统。**seL4** 微内核（Klein 等人，SOSP 2009）在 Isabelle/HOL 证明助手中被证明实现了其抽象规格说明，于是在该证明的假设之下（关于编译器、硬件与引导代码），崩溃、缓冲区溢出、空指针解引用等整类缺陷不会出现在它的 C 代码中。泽维耶·勒鲁瓦（Xavier Leroy）的 **CompCert** C 编译器（始于 2006 年）在 Coq 中被证明保持程序的语义。当 Yang、Chen、Eide 与 Regehr 用随机生成的程序测试 C 编译器（"Finding and understanding bugs in C compilers"，PLDI 2011）时，他们在 GCC 与 LLVM 中发现了数百个缺陷，而在 CompCert 经过验证的部分一个也没发现——这既是「证明买来了什么」的有力证据，也说明了它的限度，因为他们确实在 CompCert 未经验证的前端发现了缺陷。代价高昂——seL4 的证明在约 10,000 行 C 代码上花了约 20 人年——所以完全验证只留给小的、攸关核心的部分。

::: warning 「形式验证过」不等于「不会失败」
证明表明的是一个模型在所述假设之下满足规格说明。规格说明可能是错的或不完整的（它对真正要紧的情形只字未提）；模型可能与代码有出入，代码也可能与实际运行的东西有出入（编译器、库、硬件）；假设也可能在现场失效（阿丽亚娜的输入范围）。验证把风险从「代码有缺陷」移到「规格说明和假设是错的」，这是很大的收获，因为规格说明更短、可以被评审——但剩余的风险仍须靠评审、测试与安全性设计来管理。反过来，「我们彻底测试过」对没有测到的输入什么也不能说明。
:::

::: quiz
一个除零静态分析器对一个程序没有报告任何警告。在哪种情形下你能断定该程序从不除以零？
- [x] 该分析器对该性质是可靠的，且程序不超出它所建模的语言特性范围。
- [ ] 该分析器对该性质是完备的。
- [ ] 该程序还通过了具有 100% 分支覆盖率的测试套件。
- [ ] 该分析器对其他程序没有报过误报。
::: solution
「没有警告」意味着「分析器说是，性质成立」。可靠性（[[#def-sound]]）恰恰是「说是即为真」的保证。完备性承诺的是相反的方向（没有误报），所以一个完备但不可靠的分析器会漏掉真实的违反。其他程序上的测试与低误报率是证据，不是证明。而且可靠性总是相对于某个语言模型而言的：类型转换、外部代码或分析器忽略的特性都能破坏它。
:::
:::

## 安全攸关软件

在软件失效可能致死的场合，其开发受标准约束，标准按照可能失效的严重程度规定过程、证据与独立性。**DO-178C**（RTCA，2011；其前身 DO-178B 出自 1992 年）管辖机载软件，给每个功能定一个从 A（失效可能是灾难性的）到 E（无安全影响）的级别；A 级除其他诸多要求外，还要求基于需求的测试与 MC/DC 结构覆盖（[[software-engineering/testing#def-mcdc]]）以及双向可追踪性（[[software-engineering/requirements#def-traceability]]），其补充文件允许用形式方法取代部分测试。**IEC 61508** 是电气与可编程安全系统的通用标准，设安全完整性等级 SIL 1 到 4；**ISO 26262**（2011 年，第二版 2018 年）把它改编用于道路车辆，**IEC 62304** 则管辖医疗器械软件。它们共享同一种哲学：先识别危险，从中导出安全需求，并产出一份**安全性论证**（safety case）——一个由证据支撑、论证系统在其使用环境中安全到可接受程度的结构化论证。

最常被作为鉴戒讲授的案例是 **Therac-25**，一台放射治疗机，其软件促成了 1985 至 1987 年间的六起已知事故，患者接受了严重超量的辐射，有的致死（南希·莱维森与克拉克·特纳（Clark Turner），"An investigation of the Therac-25 accidents"，*IEEE Computer*，1993）。原因不是一个缺陷而是一个系统：较早型号的硬件联锁已被取消，代之以软件检查；一个竞争条件让操作迅速的人的一次编辑使机器处于不一致状态；错误消息（"MALFUNCTION 54"）晦涩难懂又频繁得让操作员学会了把它们越过去；而厂商的早期回应假定是硬件故障，并因为软件沿用自较早的机器而高估了它的可靠性。这几条——拆掉纵深防御、并发缺陷、糟糕的人机界面、因复用而过度自信——每一条都在后来的事故中重现，包括阿丽亚娜 5 号。

::: history
阿兰·图灵（Turing）1949 年的短文 "Checking a large routine" 与罗伯特·弗洛伊德（Robert Floyd）1967 年的 "Assigning meanings to programs" 开创了程序证明，霍尔（Hoare）1969 年的公理化基础使它成为一种逻辑。赖斯定理（1953）划定了自动分析的极限。帕特里克·库索与拉迪娅·库索于 1977 年引入抽象解释。埃德蒙·克拉克与艾伦·埃默森（1981）以及独立地让-皮埃尔·凯耶（Jean-Pierre Queille）与约瑟夫·西法基斯（1982）发明了模型检测；霍尔兹曼在 20 世纪 80 年代于贝尔实验室开发的 SPIN 获得了 2001 年 ACM 软件系统奖。阿丽亚娜 5 号的调查报告发表于 1996 年 7 月，莱维森与特纳的 Therac-25 调查与巴特勒和菲内利的不可行性论证同年问世。seL4 的证明发表于 2009 年，同年 CompCert 的验证工作摘要刊登于 *Communications of the ACM*。
:::

## 后续内容

理论基础在图谱的别处：[[#prop-rice]] 背后的不可判定性在 [[theory-of-computation/decidability]]，作为使用最广的静态分析的类型系统在 [[programming-languages/type-systems]]，编译器的主力静态分析数据流分析在 [[compilers/dataflow-optimisation]]。并发与互斥问题在 [[operating-systems/synchronisation]]，分布式协议——TLA+ 使用最多的地方——在 [[distributed-systems/consensus]]。安全开发的实践，包括针对漏洞的模糊测试与分析，在 [[security/secure-development]]。建造关乎生命之系统的工程师应承担的责任，是 [[software-engineering/professional-ethics]] 的主题。

::: summary
- 区分**故障 → 错误 → 失效**（[[#def-fault-error-failure]]）；预防故障、排除故障，并容忍剩下的。可用性为 $\mathrm{MTTF}/(\mathrm{MTTF} + \mathrm{MTTR})$（[[#prop-availability-mc]]）：修复更快与失效更少帮助一样大。
- 用测试论证失效率 $\lambda_0$ 大约需要 $\ln(1/\alpha)/\lambda_0$ 小时的无失效测试（[[#prop-test-infeasible]]）——对每小时 $10^{-9}$ 是不可行的。独立的版本一起失效远比独立性所预言的频繁。
- 对非平凡语义性质，不存在既可靠、又完备、又总停机的分析（[[#prop-rice]]）；可靠分析器报误报，缺陷查找器漏缺陷（[[#def-sound]]）。
- **抽象解释**在区间等的过度近似上计算（[[#prop-intervals]]），能对*一切*输入证明溢出不存在——在所声明的输入假设之下。
- **形式规格说明**与**契约式设计**让需求精确、让代码可检查。
- **模型检测**穷举有限模型的每个可达状态并返回最短反例（[[#alg-model-check]]、[[#thm-model-check]]）；状态爆炸是它的极限。
- 安全攸关软件遵循标准（DO-178C、IEC 61508、ISO 26262），并以**安全性论证**论证其安全性；阿丽亚娜 5 号与 Therac-25 展示了复用、被拆除的保障与未经检查的假设如何合谋。
:::

## 习题

::: exercise 可用性 {level=1 check="0.995"}
某服务平均每 199 小时失效一次，平均恢复需要 1 小时。它的稳态可用性是多少？（填入数字。）
::: solution
由 [[#prop-availability-mc]]，$A = 199/(199 + 1) = 0.995$：每月宕机约 3.6 小时。
:::
:::

::: exercise 故障、错误还是失效？ {level=1}
按 [[#def-fault-error-failure]] 给阿丽亚娜 5 号故事中的每项分类：(a) 转换缺少范围检查；(b) 惯性基准计算机中溢出的值；(c) 火箭偏离其轨道；(d) 发送给主机、被当作飞行数据解读的诊断比特模式。
::: solution
(a) 故障——成因（「出现任何异常就关机」的决定同样是成因）。(b) 错误——错误的状态。(c) 失效——所提供的服务（按轨道飞行）偏离了规格说明。(d) 一个传播开来的错误：主机中的错误状态，由第一台计算机的失效引起，而从主机的角度看，那是其输入中的一个故障。
:::
:::

::: exercise 可靠还是完备？ {level=1}
三个工具检查程序中可能的空指针解引用。工具 A 报告每一个真实的空解引用，外加一些假的。工具 B 只报告真实的，但会漏掉一些。工具 C 对任何程序什么都不报告。哪些是可靠的，哪些是完备的（把「无空解引用」当作性质 $\Phi$，把「无报告」当作工具的「是」）？
::: solution
A 可靠：它说「是」（无报告）时，确实没有空解引用；它不完备，因为它对一些正确的程序报误报。B 完备：每个正确的程序都得到「无报告」；它不可靠，因为它对一些有问题的程序说「是」。C 永远说「是」：它（平凡地）完备，且极不可靠。由 [[#prop-rice]]，没有工具能同时可靠、完备且总是停机。
:::
:::

::: exercise 要测多少？ {level=2 check="46052"}
在 [[#prop-test-infeasible]] 的模型下，要在 99% 置信水平上支持 $\lambda \le 10^{-4}$ 每小时，需要多少小时的无失效测试？向上取整到整小时。（填入数字。）
::: solution
$t \ge \ln(100)/10^{-4} = 4.60517 \times 10^4 \approx 46{,}051.7$ 小时，即 $46{,}052$ 小时——约 5.3 年。对这样一个适中的目标，用许多机器并行是可行的；问题在于它与 $10^{-9}$ 之间隔着五个数量级。
:::
:::

::: exercise 一个误报 {level=2}
用 [[#prop-intervals]] 的规则计算 `x * x - 2 * x + 1` 在 $x \in [0, 2]$ 下的区间，并与真实值域比较。改写表达式，使区间分析恰好精确。
::: solution
`x * x`：四角 $0, 0, 0, 4$，故 $[0, 4]$。`2 * x`：$[0, 4]$。两者之差：$[0 - 4, 4 - 0] = [-4, 4]$。加 $1$：$[-3, 5]$。$x^2 - 2x + 1 = (x - 1)^2$ 在 $[0, 2]$ 上的真实值域是 $[0, 1]$。分析是可靠的（$[0, 1] \subseteq [-3, 5]$）但不精确，因为它把 $x$ 的两次出现当作独立的。写成 `(x - 1) * (x - 1)`：`x - 1` $\in [-1, 1]$，然后四角 $1, -1, -1, 1$，得 $[-1, 1]$——因为同样的原因，仍然不精确。带有自己规则的平方运算（$a \le 0 \le b$ 时 $[a, b]^2 = [0, \max(a^2, b^2)]$）给出 $[0, 1]$，精确。真实的分析器使用这类专门规则和关系域（跟踪 $y = x - 1$ 这样的关系）来减少误报。
:::
:::

::: exercise 彼得森算法 {level=2 #ex-peterson}
把 [[#ex-model-check]] 中描述的彼得森算法建模——程序计数器 0（抬起自己的标志）、1（把轮次让给对方）、2（只要对方标志抬着且轮到对方就等待）、3（临界区；离开时放下自己的标志）——并用同一个检测器检查互斥。同时检查没有可达状态是**死锁**（没有后继的状态）。
::: solution
```python
from modelcheck import check

# 彼得森算法。pc：0 = 抬起自己的标志，1 = 把轮次让给对方，
# 2 = 只要（对方标志抬着且轮到对方）就等待，3 = 临界区。
def peterson_successors(state):
    pc, flag, turn = state
    for me in (0, 1):
        other = 1 - me
        p, f, t = list(pc), list(flag), turn
        if pc[me] == 0:
            f[me], p[me] = True, 1
        elif pc[me] == 1:
            t, p[me] = other, 2
        elif pc[me] == 2:
            if flag[other] and turn == other:
                continue                 # 仍在等待
            p[me] = 3
        else:
            f[me], p[me] = False, 0      # 离开临界区
        yield (tuple(p), tuple(f), t)

mutex = lambda s: s[0] != (3, 3)
print(check(((0, 0), (False, False), 0), peterson_successors, mutex))
no_deadlock = lambda s: any(True for _ in peterson_successors(s))
print(check(((0, 0), (False, False), 0), peterson_successors, no_deadlock))
```

```console
$ python3 peterson.py
(20, None)
(20, None)
```

全部 20 个可达状态都满足两个不变式：互斥成立，且每个状态都有后继。（无死锁比**免饥饿**——每个等待的进程最终都能进入——弱，后者是活动性性质；它对彼得森算法也成立，但检查它需要公平性假设和环搜索，而不是可达性搜索。）
:::
:::

::: exercise 独立的版本 {level=3}
三个独立开发的版本进行投票，若至少两个版本在同一输入上失效，系统就失效。(a) 若每个版本在一个输入上以概率 $p = 10^{-3}$ 独立失效，系统在一个输入上失效的概率是多少？(b) 再设比例为 $\theta = 10^{-4}$ 的输入是「难的」，在难输入上每个版本以概率 $0.5$ 失效（在给定输入难的条件下各自独立），而在其他输入上各版本从不失效。于是每个版本的失效概率为 $\theta/2 = 5 \times 10^{-5}$。此时系统的失效概率是多少？这个比较说明了什么？
::: solution
(a) 恰有两个或三个失效时系统失效：$3p^2(1 - p) + p^3 = 3 \times 10^{-6} \times 0.999 + 10^{-9} \approx 2.998 \times 10^{-6}$——比单个版本好约 333 倍。

(b) 在一个难输入上，三个版本中至少两个失效的概率是 $3 \times 0.5^2 \times 0.5 + 0.5^3 = 0.5$。所以系统以概率 $\theta \times 0.5 = 5 \times 10^{-5}$ 失效——*与单个版本完全相同*。(a) 假设了独立性，而 (b) 中独立性不成立：失效集中在同样的难输入上，因而彼此重合。这正是奈特与莱维森在实验中观察到的现象，可由 Eckhardt 与 Lee（1985）的模型解释：即便各版本独立开发，输入的*难度*也是共享的，投票只在各版本失效于不同输入的范围内起作用。
:::
:::

::: exercise 最短反例需要广度优先搜索 {level=3}
把 [[#alg-model-check]] 中的队列换成栈（深度优先搜索）。证明修改后的算法仍然停机，对不变式仍然可靠、完备，但给出一个使其返回非最短反例的迁移系统。为什么实用的模型检测器却常常使用深度优先搜索？
::: solution
停机性、可靠性与完备性从 [[#thm-model-check]] 的证明照搬：每个可达状态至多入栈一次，每个入栈的状态都可达，且每个可达状态最终都会被入栈并检查，除非先发现了违反——那部分论证不依赖取出的顺序。只有最短路径的结论用到了 FIFO 顺序。一个反例：状态 $s_0, a, b, c, d$，转移为 $s_0 \to c$、$s_0 \to a$（后继按此顺序生成）、$a \to b$、$b \to d$、$c \to d$，且不变式仅在 $d$ 为假。

```python
def check_dfs(initial, successors, invariant):
    """与 check() 相同，但用栈代替队列。"""
    parent, stack = {initial: None}, [initial]
    while stack:
        s = stack.pop()
        if not invariant(s):
            path = []
            while s is not None:
                path.append(s)
                s = parent[s]
            return path[::-1]
        for t in successors(s):
            if t not in parent:
                parent[t] = s
                stack.append(t)
    return None

from modelcheck import check
graph = {"s0": ["c", "a"], "a": ["b"], "b": ["d"], "c": ["d"], "d": []}
ok = lambda s: s != "d"
print("DFS:", check_dfs("s0", graph.__getitem__, ok))
print("BFS:", check("s0", graph.__getitem__, ok)[1])
```

```console
$ python3 dfscheck.py
DFS: ['s0', 'a', 'b', 'd']
BFS: ['s0', 'c', 'd']
```

栈先弹出（最后入栈的）$a$ 而不是 $c$，于是在 $c$ 被展开之前就经 $a$、$b$ 到达 $d$，把 $b$ 记为 $d$ 的父，返回一个 3 步的反例，而 2 步的反例明明存在。深度优先搜索仍然很受欢迎——SPIN 默认就用它——因为搜索栈*就是*当前路径，这使活动性性质所需的环检测变得自然（嵌套深度优先搜索），而且只需要访问集和一条路径的内存；更短的反例可以事后再求，用迭代加深或广度优先重跑。长的反例没有错，只是更难读。
:::
:::
