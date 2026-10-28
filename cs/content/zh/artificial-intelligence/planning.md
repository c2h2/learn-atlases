一家物流公司要用十二辆卡车和三架飞机送两百件包裹；一个空间探测器必须在可见窗口内把仪器对准目标、给相机预热并传回数据；仓库里的机器人必须取货、搬运、码放。每个问题都是对动作序列的搜索，与 [[artificial-intelligence/search]] 相同，但有两点要紧的差别。状态空间大得离谱——包裹位置的每一种组合都是一个状态——而且它不是靠为眼前问题专门写的后继函数来描述的，而是靠一种通用的**动作语言**：每个动作是一个带有前置条件与效果的模式，写一次，就对在场的一切对象施行。**规划器**接受这样的描述和一个目标，然后找出一个计划，其中不需要任何问题专用的代码。

经典规划利用的正是这种结构。由于状态被*因子化*为 $\mathit{At}(\mathit{Truck}_1, \mathit{Leeds})$ 这样的原子，规划器可以看进动作与目标的内部：它可以从目标反向搜索，可以推理各个目标之间的相互影响，而且——这是现代规划器的关键——可以通过求解一个动作没有负效果的**松弛**问题来自动计算启发式。本章介绍 STRIPS 表示、正向与反向搜索、删除松弛及其启发式 $h^+$、$h_{\max}$ 和 $h_{\mathrm{add}}$，以及**规划图**——它给出 GraphPlan 算法和一个更强的可容许启发式。我们还要证明：计划的存在性可判定但是 $\mathsf{PSPACE}$ 完全的，这就解释了为什么没有规划器能在所有问题上都快。

## 规划问题的表示

::: definition STRIPS 规划问题 {#def-strips}
一个 **STRIPS 规划问题**由以下部分构成：有限的基**原子**（如 $\mathit{On}(A, B)$ 这样的事实）集 $F$；**初始状态** $I \subseteq F$；**目标** $G \subseteq F$；以及有限的**动作**集，每个动作带有 $F$ 的三个子集：**前置条件** $\mathrm{pre}(a)$、**添加表** $\mathrm{add}(a)$ 与**删除表** $\mathrm{del}(a)$。**状态**是原子的集合 $s \subseteq F$——其中的原子为真，其余一切为假（**闭世界假设**）。当 $\mathrm{pre}(a) \subseteq s$ 时动作 $a$ 在 $s$ 中**可适用**，此时
$$
\mathrm{Result}(s, a) = (s \setminus \mathrm{del}(a)) \cup \mathrm{add}(a).
$$
**计划**是一个动作序列 $a_1, \dots, a_k$，其中每个动作都在由前驱从 $I$ 产生的状态中可适用，且最终状态 $s_k$ 满足 $G \subseteq s_k$。除非另有说明，每个动作代价为 $1$，**最优**计划是最短的计划。
:::

动作写成带变量的**模式**，用问题的对象实例化。在**积木世界**里，积木放在桌面或彼此上面，一块积木当它上面没有东西时可以移动：

```text
Move(b, x, y)            ▷ 把积木 b 从 x 移到积木 y 上
  pre:  On(b, x), Clear(b), Clear(y)
  add:  On(b, y), Clear(x)
  del:  On(b, x), Clear(y)
MoveToTable(b, x)        ▷ 把积木 b 从积木 x 上移回桌面
  pre:  On(b, x), Clear(b)
  add:  On(b, Table), Clear(x)
  del:  On(b, x)
```

（桌面永远是空的，所以它没有 $\mathit{Clear}$ 原子；还有第三个模式把积木从桌面移到某块积木上。）这就是**规划领域定义语言**（PDDL）的核心——规划器的标准输入语言——它进一步增加了类型、负前置条件、条件效果、数值量、持续时间与代价。STRIPS 假设——动作恰好改变其添加表与删除表中的原子、此外什么都不改变——解决了逻辑形式语言的**框架问题**，否则就得写出公理来逐一说明每个动作*不*改变什么。

::: example 萨斯曼反例 {#ex-sussman}
三块积木：起初 $C$ 在 $A$ 上，$A$ 与 $B$ 在桌面上。目标是 $\mathit{On}(A, B) \land \mathit{On}(B, C)$。把问题写成 STRIPS，并用状态上的广度优先搜索找出最优计划。它为什么被称为一个"反例"（anomaly）？
::: solution
对积木 $A, B, C$，基原子是 $\mathit{On}(b, x)$（$x$ 为另一块积木或桌面）与 $\mathit{Clear}(b)$：共 $3 \cdot 3 + 3 = 12$ 个原子。把移动模式实例化得到 $18$ 个动作（每块积木都能从三处之一移到另外两处之一）。初始状态是 $I = \{\mathit{On}(C, A), \mathit{On}(A, \mathit{Table}), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C), \mathit{Clear}(B)\}$，$G = \{\mathit{On}(A, B), \mathit{On}(B, C)\}$。

```python
import heapq, itertools
from collections import namedtuple

Action = namedtuple("Action", "name pre add delete")

def blocks_world(blocks):
    """把一块空积木移到桌面或另一块空积木上的 STRIPS 动作。"""
    acts = []
    for b in blocks:
        for x in blocks + ["Table"]:
            if x == b: continue
            for y in blocks + ["Table"]:
                if y in (b, x): continue
                pre = {f"On({b},{x})", f"Clear({b})"} | ({f"Clear({y})"} if y != "Table" else set())
                add = {f"On({b},{y})"} | ({f"Clear({x})"} if x != "Table" else set())
                dele = {f"On({b},{x})"} | ({f"Clear({y})"} if y != "Table" else set())
                acts.append(Action(f"Move({b},{x},{y})", frozenset(pre), frozenset(add), frozenset(dele)))
    return acts

def successors(state, actions):
    for a in actions:
        if a.pre <= state:
            yield a, (state - a.delete) | a.add
```

广度优先搜索（下面不带启发式的 `search` 函数）扩展 $12$ 个状态并返回

```console
BFS           expanded  12: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
```

——把 $C$ 放到桌面，把 $B$ 放到 $C$ 上，再把 $A$ 放到 $B$ 上：三步。杰拉尔德·萨斯曼（Gerald Sussman）在 1970 年代初注意到的这个"反例"是说：这个短计划无法靠*先后*实现两个目标找到——早期规划器正是这样做的。先实现 $\mathit{On}(A, B)$（移开 $C$，把 $A$ 放到 $B$ 上），$A$ 就压在 $B$ 上面，$\mathit{On}(B, C)$ 接着又要求把它拆掉；先实现 $\mathit{On}(B, C)$ 则把 $A$ 埋到 $C$、$B$ 底下。这两个子目标**相互作用**，规划器必须把两者的步骤交错起来。
:::
:::

::: widget graph
nodes: A_B_C@0,0; A_BC@0,1.5; ABC@0,3; BA_C@-1.3,0.75; CBA@-2.6,1.5; AB_C@-1.3,-0.75; CAB@-2.6,-1.5; AC_B@0,-1.5; BAC@0,-3; A_CB@1.3,-0.75; ACB@2.6,-1.5; B_CA@1.3,0.75; BCA@2.6,1.5
edges: ABC-A_BC; AB_C-AC_B; AB_C-A_B_C; AB_C-CAB; ACB-A_CB; AC_B-A_B_C; AC_B-BAC; A_BC-A_B_C; A_BC-BA_C; A_B_C-A_CB; A_B_C-BA_C; A_B_C-B_CA; A_CB-B_CA; BA_C-CBA; BCA-B_CA
algorithm: bfs
start: B_CA
caption: 三积木世界的整个状态空间：$13$ 个状态，每个状态用它从上到下读出的各座塔命名、塔之间以下划线分隔（$\mathit{B\_CA}$ 是萨斯曼反例的初始状态：$B$ 单独一塔，$C$ 在 $A$ 上；$\mathit{ABC}$ 是目标塔）。每步移动都可逆，所以图是无向的。从起点一步步演示广度优先搜索，确认目标在距离 $3$ 处。$n$ 块积木的状态空间比 $n!$ 增长还快（$5$ 块有 $501$ 个状态，$7$ 块有 $37{,}633$ 个），这就是规划器需要启发式的原因。
:::

### 规划有多难？

规划问题是潜在状态有 $2^{\lvert F\rvert}$ 个的搜索问题，而其描述只占用关于 $\lvert F\rvert$ 与动作数目多项式的空间。计划可以指数地长：$n$ 个圆盘的汉诺塔是一个只有 $O(n^2)$ 个原子的 STRIPS 问题，最短计划却要 $2^n - 1$ 步。

::: theorem STRIPS 规划的复杂性 {#thm-planning-pspace}
判定一个 STRIPS 规划问题是否有计划是 $\mathsf{PSPACE}$ 完全的（拜兰德（Bylander），1994）。
:::

::: proof
*属于 $\mathsf{PSPACE}$。* 若存在计划，则存在一个不重访任何状态的计划（把两次重访之间的环剪掉），所以存在长度小于 $2^{\lvert F\rvert}$ 的计划。一个非确定算法一次猜一个动作，只保存当前状态（$\lvert F\rvert$ 位）和步数计数器（$\lvert F\rvert$ 位）；它检查可适用性、执行动作，目标成立时接受，计数器溢出时拒绝。这使用多项式空间，所以计划存在性属于 $\mathsf{NPSPACE}$，而由萨维奇（Savitch）定理（[[complexity/space-complexity#cor-pspace-npspace]]）它等于 $\mathsf{PSPACE}$。

*困难性*（要点，不在此证明）。给定在输入 $w$ 上只用多项式空间 $p(n)$ 的图灵机 $M$，构造"格 $i$ 含符号 $\sigma$"、"读写头在格 $i$"、"机器处于状态 $q$"这些原子，每个转移和读写头方向一个动作，初始格局作为 $I$，"机器处于接受状态"作为 $G$。计划存在当且仅当 $M$ 接受 $w$。拜兰德的论文还给出了哪些句法限制（例如每个动作只有一个前置条件、只有正效果）会使问题变容易。
:::

所以我们不能指望多项式时间的规划器，甚至连*有界*计划存在性——是否存在长度不超过 $k$ 的计划，$k$ 以一元写出——也是 $\mathsf{NP}$ 完全的。实用规划器依赖启发式，而这正是 STRIPS 结构得到回报的地方。

## 状态空间搜索

**正向（进展）搜索**是从 $I$ 出发、以 $\mathrm{Result}$ 为转移函数、以 $G \subseteq s$ 为目标测试的搜索；[[artificial-intelligence/search]] 的任何算法都可用。分支因子是可应用的基动作数目，在实际领域里可达数千——其中大多数与目标无关。没有启发式时，正向搜索在大型问题上毫无希望。

**反向（回归）搜索**从目标出发向初始状态推进，只考虑**相关**的动作——实现当前子目标的一部分的那些——分支因子通常小得多。

::: definition 回归 {#def-regression}
设 $g$ 是一组原子（一个子目标），$a$ 是一个对它**相关**——$\mathrm{add}(a) \cap g \ne \emptyset$——且与之**相容**——$\mathrm{del}(a) \cap g = \emptyset$——的动作。$g$ 经过 $a$ 的**回归**是
$$
\mathrm{Regress}(g, a) = (g \setminus \mathrm{add}(a)) \cup \mathrm{pre}(a).
$$
反向搜索从 $G$ 出发，经过相关且相容的动作作回归，直到某个子目标 $g$ 满足 $g \subseteq I$ 时停止。
:::

::: theorem 回归的可靠性与完备性 {#thm-regression}
(1) 若 $s \supseteq \mathrm{Regress}(g, a)$，则 $a$ 在 $s$ 中可适用且 $\mathrm{Result}(s, a) \supseteq g$。(2) 于是，若反向搜索找到 $G = g_0, g_1, \dots, g_k$，其中 $g_{i} = \mathrm{Regress}(g_{i-1}, a_i)$ 且 $g_k \subseteq I$，则 $a_k, a_{k-1}, \dots, a_1$ 是一个计划。(3) 反过来，若 $a_1, \dots, a_k$ 是一个计划，且其中每个动作对从它回归的子目标都相关，反向搜索就能找到它。
:::

::: proof
(1) $\mathrm{pre}(a) \subseteq \mathrm{Regress}(g, a) \subseteq s$，所以 $a$ 可适用。设 $p \in g$。若 $p \in \mathrm{add}(a)$，则 $p \in \mathrm{Result}(s, a)$。否则 $p \in g \setminus \mathrm{add}(a) \subseteq s$，且由相容性 $p \notin \mathrm{del}(a)$，所以 $p$ 保留下来：$p \in (s \setminus \mathrm{del}(a))$。(2) 设 $s_0 = I \supseteq g_k$，依次施加 $a_k, \dots, a_1$。由 (1) 与归纳，施加 $a_k, \dots, a_{i}$ 之后状态包含 $g_{i-1}$；结束时包含 $g_0 = G$。(3) 设 $s_0 = I, s_1, \dots, s_k$ 是计划经历的状态，把目标依次经过 $a_k, a_{k-1}, \dots$ 回归：经过 $a_k, \dots, a_{k-j+1}$ 回归后得到的子目标 $g_j$ 满足 $g_j \subseteq s_{k-j}$，归纳证明——$\mathrm{pre}(a_i) \subseteq s_{i-1}$，而 $g_{j-1} \subseteq s_{k-j+1}$ 中没有被 $a_{k-j+1}$ 添加的原子本来就在 $s_{k-j}$ 中。相容性成立，因为被 $a_i$ 删去的原子不在 $s_i$ 中，而经过 $a_i$ 回归的子目标是 $s_i$ 的子集。结束时 $g_k \subseteq s_0 = I$。
:::

::: example 萨斯曼反例上的反向搜索 {#ex-regression}
把 [[#ex-sussman]] 的目标 $G = \{\mathit{On}(A, B), \mathit{On}(B, C)\}$ 依次经过最优计划的最后两个动作回归，并检验第一步动作之后的状态满足所得结果。
::: solution
最后一个动作是 $\mathit{Move}(A, \mathit{Table}, B)$（前置条件 $\mathit{On}(A, \mathit{Table})$、$\mathit{Clear}(A)$、$\mathit{Clear}(B)$；添加 $\mathit{On}(A, B)$；删除 $\mathit{On}(A, \mathit{Table})$、$\mathit{Clear}(B)$）。它相关（添加 $\mathit{On}(A, B)$）且相容（不删除 $G$ 中的任何东西）：
$$
g_1 = \{\mathit{On}(B, C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}.
$$
再前一个动作是 $\mathit{Move}(B, \mathit{Table}, C)$（前置条件 $\mathit{On}(B, \mathit{Table})$、$\mathit{Clear}(B)$、$\mathit{Clear}(C)$；添加 $\mathit{On}(B, C)$；删除 $\mathit{On}(B, \mathit{Table})$、$\mathit{Clear}(C)$），它对 $\mathit{On}(B, C)$ 相关、与 $g_1$ 相容：
$$
g_2 = \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C)\}.
$$
第一步动作 $\mathit{Move}(C, A, \mathit{Table})$ 之后状态是 $\{\mathit{On}(C, \mathit{Table}), \mathit{On}(A, \mathit{Table}), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{Clear}(C)\}$，它包含 $g_2$；再经过 $\mathit{Move}(C, A, \mathit{Table})$ 回归一次得 $\{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{On}(C, A), \mathit{Clear}(C)\} \subseteq I$，反向搜索停止。注意每一步只考虑了添加某个目标原子的动作——$18$ 个中的两三个——而从 $I$ 出发的正向搜索必须考虑每个可应用的动作。
:::
:::

回归的短处在于子目标是*状态集合*，而许多子目标是不可能满足的——比如 $\{\mathit{On}(A, B), \mathit{On}(B, A)\}$——反向搜索却不容易看出。启发式已被证明对正向搜索更易计算，现代规划器大多是正向搜索的。

::: quiz
在积木世界中，把子目标 $g = \{\mathit{On}(A, B), \mathit{Clear}(C)\}$ 经过 $\mathit{Move}(A, \mathit{Table}, B)$ 回归，该动作的前置条件是 $\mathit{On}(A, \mathit{Table})$、$\mathit{Clear}(A)$、$\mathit{Clear}(B)$，添加 $\mathit{On}(A, B)$，删除 $\mathit{On}(A, \mathit{Table})$、$\mathit{Clear}(B)$。结果是什么？

- [ ] $\{\mathit{On}(A, B), \mathit{Clear}(C), \mathit{On}(A, \mathit{Table})\}$
- [x] $\{\mathit{Clear}(C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$
- [ ] $\{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$
- [ ] 该动作不相关，回归无定义。
::: solution
该动作相关（它添加 $\mathit{On}(A, B) \in g$）且相容（不删除 $g$ 的任一原子）。由 [[#def-regression]]，去掉它添加的，加上它的前置条件：$(g \setminus \{\mathit{On}(A, B)\}) \cup \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$。动作没有碰到的原子 $\mathit{Clear}(C)$，在它执行之前就必须已经成立。
:::
:::

## 由删除松弛构造启发式

经典规划最成功的思想，是通过自动求解从真实问题导出的一个更简单的规划问题，来估计到目标的距离。

::: definition 删除松弛 {#def-delete-relaxation}
STRIPS 问题的**删除松弛**把每个动作 $a$ 换成 $a^+$：同样的前置条件与添加表、空的删除表。松弛问题的一个计划称为**松弛计划**；$h^+(s)$ 是从 $s$ 出发的最短松弛计划的长度（不存在时为 $\infty$）。
:::

在松弛问题中，一旦为真的原子永远为真：状态只增不减。松弛规划容易得多——*是否存在*某个松弛计划可以在多项式时间内判定，把所有可应用的动作一直用到没有变化为止——但求*最短*的仍是 $\mathsf{NP}$-难的（拜兰德（Bylander），1994）。规划器于是近似 $h^+$。对每个原子 $p$，用不动点方程定义它从 $s$ 出发的**代价**：
$$
\mathrm{cost}_s(p) = \begin{cases} 0 & p \in s,\\ \min_{a : p \in \mathrm{add}(a)} \bigl(1 + \mathrm{cost}_s(\mathrm{pre}(a))\bigr) & \text{否则，} \end{cases}
$$ {#eq-atom-cost}
其中原子集的代价取两者的最大值（得到 $h_{\max}$）或求和（得到 $h_{\mathrm{add}}$），而 $h_{\max}(s) = \max_{g \in G} \mathrm{cost}_s(g)$，$h_{\mathrm{add}}(s) = \sum_{g \in G} \mathrm{cost}_s(g)$。两者都可以用类贝尔曼-福特迭代在多项式时间内算出。

::: theorem 松弛启发式的可容许性 {#thm-hmax}
对每个状态 $s$，$h_{\max}(s) \le h^+(s) \le h^*(s)$，其中 $h^*(s)$ 是从 $s$ 出发的最短真实计划的长度。所以 $h_{\max}$ 与 $h^+$ 都可容许。启发式 $h_{\mathrm{add}}$ 一般不可容许。
:::

::: proof
*$h^+ \le h^*$。* 设 $a_1, \dots, a_k$ 是从 $s$ 出发的真实计划，经历状态 $s = s_0, s_1, \dots, s_k$；令 $t_0 = s$、$t_i = t_{i-1} \cup \mathrm{add}(a_i)$ 为同样这些动作在松弛问题中的状态。归纳得 $s_i \subseteq t_i$：$s_i = (s_{i-1} \setminus \mathrm{del}(a_i)) \cup \mathrm{add}(a_i) \subseteq t_{i-1} \cup \mathrm{add}(a_i) = t_i$。于是每个 $a_i$ 在 $t_{i-1} \supseteq s_{i-1} \supseteq \mathrm{pre}(a_i)$ 中可适用，且 $G \subseteq s_k \subseteq t_k$：真实计划也是松弛计划，所以最短的松弛计划不会更长。

*$h_{\max} \le h^+$。* 设 $a_1, \dots, a_k$ 是从 $s$ 出发的最短松弛计划，松弛状态 $t_0 = s \subseteq t_1 \subseteq \dots \subseteq t_k$。对 $i$ 归纳证明 $t_i$ 的每个原子 $p$ 都有 $\mathrm{cost}_s(p) \le i$（代价取 $\max$）。$i = 0$ 时，$s$ 的原子代价为 $0$。原子 $p \in t_i \setminus t_{i-1}$ 由 $a_i$ 添加，$a_i$ 的前置条件都在 $t_{i-1}$ 中、代价各至多 $i - 1$；由 [[#eq-atom-cost]]，$\mathrm{cost}_s(p) \le 1 + (i - 1) = i$。由于 $G \subseteq t_k$，$h_{\max}(s) = \max_{g \in G} \mathrm{cost}_s(g) \le k = h^+(s)$。

*$h_{\mathrm{add}}$ 会高估。* 若一个在 $s$ 中可适用的动作 $a$ 同时添加两个目标原子 $g_1$ 与 $g_2$，则 $h^* = 1$ 而 $h_{\mathrm{add}}(s) = \mathrm{cost}(g_1) + \mathrm{cost}(g_2) = 2$：求和把 $a$ 数了两遍。
:::

两个启发式的偏差方向相反。$h_{\max}$ 可容许但太弱：它只看最难的那一个目标。$h_{\mathrm{add}}$ 假定各目标被独立地实现，从而多数了共享的动作，但它包含的信息多得多，配贪心最佳优先搜索也非常快。**FF 启发式**（霍夫曼（Hoffmann）与内贝尔（Nebel），2001）从代价计算中提取一个真正的松弛计划并数它的动作，避免了共享动作的重复计数；它也不可容许，却是许多成功的满足型规划器所用的启发式。

```python
def h_relaxed(state, goal, actions, combine):
    """忽略删除表后的原子代价：combine=max 得 h_max，combine=sum 得 h_add。"""
    cost = {p: 0 for p in state}; changed = True
    while changed:
        changed = False
        for a in actions:
            if all(p in cost for p in a.pre):
                c = 1 + combine([cost[p] for p in a.pre] or [0])
                for q in a.add:
                    if c < cost.get(q, float("inf")): cost[q] = c; changed = True
    if not all(g in cost for g in goal): return float("inf")
    return combine([cost[g] for g in goal] or [0])

def search(init, goal, actions, h=None, weight_g=1):
    """带启发式 h 的 A*（weight_g=1）或贪心最佳优先（weight_g=0）；h 为 None 时是 BFS。"""
    tie = itertools.count(); start = frozenset(init)
    frontier = [(0, next(tie), start, 0, [])]; best = {start: 0}; expanded = 0
    while frontier:
        _, _, s, g, plan = heapq.heappop(frontier)
        if goal <= s: return plan, expanded
        if g > best[s]: continue
        expanded += 1
        for a, t in successors(s, actions):
            if g + 1 < best.get(t, float("inf")):
                best[t] = g + 1
                f = (g + 1) if h is None else weight_g * (g + 1) + h(t)
                heapq.heappush(frontier, (f, next(tie), t, g + 1, plan + [a.name]))
```

::: example 积木世界中的启发式规划 {#ex-heuristic-planning}
在萨斯曼反例以及 $5$、$6$、$7$ 块积木的随机积木世界问题上，比较广度优先搜索、带 $h_{\max}$ 的 A* 和带 $h_{\mathrm{add}}$ 的贪心最佳优先搜索。
::: solution
在萨斯曼反例上，$h_{\max}(I) = 2$、$h_{\mathrm{add}}(I) = 3$（最优计划长度为 $3$）：

```console
$ python3 strips.py
18 actions; h_max = 2 h_add = 3
BFS           expanded  12: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
A* h_max      expanded   4: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
greedy h_add  expanded   3: ['Move(C,A,Table)', 'Move(B,Table,C)', 'Move(A,Table,B)']
```

随机问题用固定种子随机抽取初始摆法与目标摆法（把积木随机排好后切成若干塔）；目标由第二种摆法的 $\mathit{On}$ 原子构成。每行给出计划长度与扩展的状态数：

```console
$ python3 strips_rand.py
 n  BFS (len/exp)   A* h_max (len/exp)   greedy h_add (len/exp)
 5   6 /   180    6 /    30    8 /     8
 5   4 /    60    4 /    14    4 /     4
 6   6 /  1512    6 /   137    6 /     6
 6   5 /  1375    5 /   120    5 /     5
 7   8 / 25523    8 /  2515    9 /     9
 7   6 /  4684    6 /   360    7 /     7
```

带 $h_{\max}$ 的 A* 总能找到最优计划（它可容许，而且事实上是一致的，所以 [[artificial-intelligence/search#thm-astar-graph]] 适用），扩展的状态比 BFS 少约十倍。带 $h_{\mathrm{add}}$ 的贪心搜索每走一步计划只扩展一个状态——它径直走向目标——但它的计划有时比最优的长（$8$ 对 $6$，$9$ 对 $8$，$7$ 对 $6$）。这就是典型的取舍：包含信息的不可容许启发式配贪心搜索能很快找到不错的计划；可容许启发式配 A* 则以高得多的代价证明最优性。
:::
:::

::: warning 松弛计划可能错得离谱
删除松弛忽略动作之间的一切冲突，所以对造成规划之难的某些困难它完全看不见。在松弛的积木世界里，一旦两个原子都被添加过，一块积木就可以同时"在"两块积木上；在松弛的物流问题里，一辆卡车可以同时在各座城市。在依赖**资源**的问题上——燃料、单只夹爪、单车道桥——$h^+$ 会以任意大的倍数低估真实代价，而在许多子目标共享动作的问题上 $h_{\mathrm{add}}$ 会高估它。初始状态上一个漂亮的启发式值，完全不能说明计划究竟存不存在：松弛计划可能存在而真实计划不存在（例如某个必需的动作删去了不可替代的东西）。规划器把松弛启发式与其他启发式——陆标、抽象、模式数据库——结合使用，正是出于这些原因。
:::

## 规划图与 GraphPlan

**规划图**把松弛可达性计算组织成层，并对删除松弛忽略的冲突给出一种便宜而有力的近似。

::: definition 规划图 {#def-planning-graph}
规划图交替出现**原子层** $P_0, P_1, \dots$ 与**动作层** $A_0, A_1, \dots$。$P_0 = I$。$A_i$ 包含每个前置条件都在 $P_i$ 中且两两不互斥的动作，外加 $P_i$ 每个原子的一个**空操作**（no-op，以该原子为前置条件与添加效果）。$P_{i+1}$ 是 $A_i$ 中动作添加的原子的集合。$A_i$ 中两个动作**互斥**（mutually exclusive，mutex），当且仅当：一个删除另一个的前置条件或添加效果（**干涉**、**效果不一致**）；或一个的某个前置条件与另一个的某个前置条件在层 $P_i$ 互斥（**需求冲突**）。$P_{i+1}$ 中两个原子互斥，当且仅当 $A_i$ 中添加其一的每个动作都与添加其二的每个动作互斥（**支持不一致**）。
:::

::: lemma 互斥是可靠的；图会趋于平稳 {#lem-planning-graph}
(1) 若从 $I$ 出发的一列 $i$ 个动作到达状态 $s$，则 $s \subseteq P_i$ 且 $s$ 中没有两个原子在 $P_i$ 中互斥；特别地，$i$ 步之后每个可应用的动作都属于 $A_i$。(2) 原子层是增长的：$P_i \subseteq P_{i+1}$，而对两层中都有的原子，互斥关系只会减少。由于一切都是有限的，经过有限多层之后图**趋于平稳**：$P_{i+1} = P_i$ 且互斥相同，此后各层全部相同。
:::

::: proof
(1) 对 $i$ 归纳。$i = 0$ 时，$0$ 步可达的唯一状态是 $I = P_0$，它没有互斥对。设 $s$ 由 $a_1, \dots, a_{i+1}$ 到达，$s'$ 为 $i$ 步后的状态。由归纳假设，$s'$ 的原子全在 $P_i$ 中且两两不互斥，于是 $a_{i+1}$（其前置条件在 $s'$ 中）属于 $A_i$，$s'$ 中未被 $a_{i+1}$ 删除的原子对应的空操作也属于 $A_i$。每个原子 $p \in s$ 或由 $a_{i+1}$ 添加，或由 $p$ 的空操作添加，故 $p \in P_{i+1}$。对 $p, q \in s$ 这两个原子，取支撑它们的动作 $x$（支撑 $p$）与 $y$（支撑 $q$）。若 $x = y = a_{i+1}$，它们不互斥（动作不与自身互斥）。否则至少一个是 $s'$ 中未被 $a_{i+1}$ 删除的某个原子 $r$ 的空操作；逐一检查三个条件：没有干涉（$a_{i+1}$ 保留的原子其空操作不被 $a_{i+1}$ 删除，而空操作什么都不删），也没有需求冲突（所有前置条件都在 $s'$ 中，而 $s'$ 两两不互斥，由归纳假设）。于是 $x$ 与 $y$ 不互斥，$p$、$q$ 也就不支持不一致：它们在 $P_{i+1}$ 中不互斥。

(2) $P_i \subseteq P_{i+1}$ 是空操作的缘故。互斥只会消失由类似的归纳证明：第 $i$ 层有更多原子、更少互斥，$A_i$ 就至少含有 $A_{i-1}$ 的动作，于是每对原子至少有着同样多的潜在支撑者，本来不互斥的支撑者保持不互斥。原子与互斥对的数目有限，故两者都稳定。
:::

因此，所有目标原子首次两两不互斥地出现的那一层，是任何计划长度的下界——一个可容许启发式，至少和 $h_{\max}$ 一样强（$h_{\max}$ 是不看互斥时所有目标首次出现的那一层）。

::: example 萨斯曼反例的规划图 {#ex-planning-graph}
构造 [[#ex-sussman]] 的规划图，分别在有、无互斥两种情形下找出目标首次出现的那一层。
::: solution
一个用全部四条互斥规则（和 $18$ 个基动作）逐层展开的短小程序，打印目标首次两两不互斥出现的层，以及每层的原子数：

```console
$ python3 pgraph.py
(3, [5, 9, 12, 12])
(2, [5, 9, 12])
```

第二行是单个目标 $\mathit{On}(A, B)$ 的结果。第 $0$ 层有 $5$ 个初始原子；第 $1$ 层添上一步可达的原子（如 $\mathit{On}(C, \mathit{Table})$、$\mathit{Clear}(A)$、$\mathit{On}(B, C)$、$\mathit{On}(C, B)$）；第 $2$ 层有全部 $12$ 个原子。不看互斥时两个目标在第 $2$ 层都已出现——这就是 $h_{\max} = 2$。但在第 $2$ 层，$\mathit{On}(A, B)$ 与 $\mathit{On}(B, C)$ 互斥：实现 $\mathit{On}(A, B)$ 的每一种两步做法都要先把 $C$ 移回桌面、再把 $A$ 放到 $B$ 上，这与把 $B$ 放到 $C$ 上冲突（彼此都要求对方被撤销）。到第 $3$ 层两个目标才不互斥，得到下界 $3$——恰是最优计划长度。互斥精确地抓住了那个使"逐个子目标"式天真规划失败的子目标相互作用。
:::
:::

::: algorithm GraphPlan {#alg-graphplan}
1. 从 $P_0 = I$ 起逐层构造规划图。
2. 当某层 $P_k$ 两两不互斥地包含全部目标时，反向搜索一个计划：为第 $k$ 层的目标在 $A_{k-1}$ 中选一组两两不互斥、能实现它们的动作；它们的前置条件成为第 $k - 1$ 层的目标；一直做到第 $0$ 层。所得是一个**并行计划**——一串互不干涉的动作集合——每个集合内部可以任意次序执行。
3. 若反向搜索失败，就把该层失败的这一组目标记为一个**坏组合**（nogood），把图再扩一层，重试。当图已趋于平稳且坏组合集不再变化时，报告失败。
:::

GraphPlan 的反向搜索是一个约束满足问题——每层每个目标一个变量，取值是实现它的动作，互斥充当约束——而规划图可以直接转化为一个 SAT 公式：**SATPlan** 固定计划长度 $k$，用时刻 $0, \dots, k$ 的原子变量与时刻 $0, \dots, k-1$ 的动作变量编码"存在长度为 $k$ 的计划"，交给 SAT 求解器（[[artificial-intelligence/logical-agents]]），不断增大 $k$ 直到公式可满足。

::: quiz
规划图的某第 2 层上，目标 $g_1$ 与 $g_2$ 都已出现但互斥。你能得出什么结论？

- [x] 不存在长度不超过 $2$ 的计划同时实现这两个目标。
- [ ] 该问题无解。
- [ ] 存在长度为 $3$ 的计划。
- [ ] $h_{\max} \ge 3$。
::: solution
由 [[#lem-planning-graph]]，若两个目标在 $2$ 个动作之后都为真，它们在第 $2$ 层就不互斥；所以不存在长度为 $2$ 的计划（更短的也没有，因为更短的计划可以在并行计划里用空操作补齐）。别的什么也推不出：计划可能需要 $3$ 步、更多步，也可能根本不存在。$h_{\max}$ 不看互斥，而这里两个目标都在第 $2$ 层出现，所以 $h_{\max} \le 2$。
:::
:::

## 其他方法

- **偏序规划**在*计划*空间而非状态空间中搜索。一个偏序计划是带次序约束与**因果链**（"$a$ 为 $b$ 实现 $p$"）的一组动作；规划器反复挑一个未满足的前置条件，添加一个动作或一条链来实现它，并把**威胁**（可能介于 $a$ 与 $b$ 之间删去 $p$ 的动作）通过把它排到 $a$ 之前或 $b$ 之后来化解。它只在必要时才承诺次序，因此能自然地处理萨斯曼反例，而且产出的计划灵活；但到 1990 年代末，启发式状态空间规划器在性能上超过了它。
- **层次任务网络（HTN）规划**把高层任务（"送包裹"）按领域设计者提供的方法分解为子任务。它编码了关于*如何*解题的专家知识，在实践中（以及电子游戏里）被广泛使用。
- **不确定环境下的规划**：动作非确定时，计划变成**条件式**的（依观察分支）；加上概率与回报，问题成为马尔可夫决策过程（[[artificial-intelligence/decision-making]]）。

::: history
斯坦福研究所的问题求解器 STRIPS 由理查德·法伊克斯（Richard Fikes）与尼尔斯·尼尔松（Nils Nilsson）提出（*STRIPS: a new approach to the application of theorem proving to problem solving*，*Artificial Intelligence*，1971），为机器人 Shakey 做规划，并引入了添加-删除的动作表示。约翰·麦卡锡（John McCarthy）与帕特里克·海斯（Patrick Hayes）早在 1969 年就提出了框架问题。杰拉尔德·萨斯曼（Gerald Sussman）1970 年代初在积木世界上的工作揭示了目标相互作用；厄尔·萨塞多蒂（Earl Sacerdoti）的 NOAH（1975）与奥斯汀·泰特（Austin Tate）的 NONLIN（1977）开创了偏序规划与层次规划；大卫·麦克阿莱斯特（David McAllester）与大卫·罗森布拉特（David Rosenblitt）的 SNLP（1991）给出了一个干净的偏序规划器。汤姆·拜兰德（Tom Bylander）于 1994 年证明了 STRIPS 规划的 $\mathsf{PSPACE}$ 完全性。艾维里姆·布鲁姆（Avrim Blum）与梅里克·弗斯特（Merrick Furst）的 GraphPlan（1995，期刊版 1997）引入了规划图；亨利·考茨（Henry Kautz）与巴特·塞尔曼（Bart Selman）的 SATPlan（1992、1996）提出了作为可满足性的规划。布莱·博内（Blai Bonet）与埃克托·赫夫纳（Héctor Geffner）的 HSP（1997–2001）与约尔格·霍夫曼（Jörg Hoffmann）、伯恩哈德·内贝尔（Bernhard Nebel）的 FF（2001）使带删除松弛启发式的启发式正向搜索成为主流。PDDL 由德鲁·麦克德莫特（Drew McDermott）及其同事为首届国际规划大赛于 1998 年定义。
:::

## 实际应用

截至 2026 年，领先的经典规划器——许多建立在马尔特·黑尔梅特（Malte Helmert）的 Fast Downward 系统（2006）之上——使用正向启发式搜索，组合松弛、陆标与抽象启发式；自 1998 年起定期举办的国际规划大赛在 PDDL 基准上跟踪它们的进展。规划被用于航天器运作、物流、制造、机器人，也作为电子游戏 AI 的组件（目标导向动作规划）。用自然语言"规划"的基于语言模型的智能体是另一种不断演化的做法；除非用动作模型加以检验，它们的计划不附带任何有效性保证，把它们与经典规划器和验证器结合是活跃的研究领域——见 LLM Atlas 的[智能体规划](/learn/llm/lesson.php?c=agents&l=planning)。

## 后续内容

经典规划假定世界已知、确定、完全可观察。当动作结果不确定时，计划变成把状态映到动作的策略，由 [[artificial-intelligence/decision-making]] 的动态规划算出；当模型本身未知时，智能体必须学会模型，或直接学一个策略（[[artificial-intelligence/reinforcement-learning]]）。本章的启发式都是 [[artificial-intelligence/search#thm-relaxation]] 的一般松弛原则的实例，而 SATPlan 把规划连到 [[artificial-intelligence/logical-agents]] 与 [[complexity/coping-with-hardness]] 的 SAT 求解器上。

::: summary
- **STRIPS** 问题（[[#def-strips]]）用原子集合描述状态，用前置条件、添加表与删除表描述动作；PDDL 是它的标准扩展。计划存在性是 $\mathsf{PSPACE}$ 完全的（[[#thm-planning-pspace]]），计划可以指数地长。
- 规划器或者从初始状态正向搜索，或者经过相关动作**回归**反向搜索（[[#def-regression]]、[[#thm-regression]]）；子目标会**相互作用**，萨斯曼反例即是明证（[[#ex-sussman]]）。
- **删除松弛**（[[#def-delete-relaxation]]）给出 $h^+$，用 $h_{\max}$（可容许）与 $h_{\mathrm{add}}$（信息多、不可容许）近似：$h_{\max} \le h^+ \le h^*$（[[#thm-hmax]]）。
- 带 $h_{\max}$ 的 A* 找到最优计划；带 $h_{\mathrm{add}}$ 的贪心搜索快得多地找到不错的计划（[[#ex-heuristic-planning]]）。
- **规划图**给松弛可达性加上可靠的互斥关系（[[#lem-planning-graph]]）；目标首次两两不互斥出现的层是一个可容许下界，**GraphPlan**（[[#alg-graphplan]]）从图中提取并行计划。SATPlan 把有界规划编码为可满足性。
:::

## 习题

::: exercise 执行一个动作 {level=1}
在状态 $s = \{\mathit{On}(A, \mathit{Table}), \mathit{On}(B, A), \mathit{On}(C, \mathit{Table}), \mathit{Clear}(B), \mathit{Clear}(C)\}$ 中，$\mathit{Move}(B, A, C)$ 可适用吗？若可适用，算出结果状态。
::: solution
它的前置条件是 $\mathit{On}(B, A)$、$\mathit{Clear}(B)$、$\mathit{Clear}(C)$，都在 $s$ 中：可适用。它删除 $\mathit{On}(B, A)$ 与 $\mathit{Clear}(C)$，添加 $\mathit{On}(B, C)$ 与 $\mathit{Clear}(A)$，得到 $\{\mathit{On}(A, \mathit{Table}), \mathit{On}(C, \mathit{Table}), \mathit{On}(B, C), \mathit{Clear}(B), \mathit{Clear}(A)\}$。
:::
:::

::: exercise 数基动作 {level=1 check="48"}
[[#ex-sussman]] 的编码对 $n = 4$ 块积木会产生多少个基 $\mathit{Move}(b, x, y)$ 动作？（$b$ 是积木，$x$ 与 $y$ 是互不相同的位置——另一块积木或桌面——且都不等于 $b$。）（填入动作数。）
::: solution
对每块积木 $b$，$x$ 有 $n$ 个不是 $b$ 的位置（$n - 1$ 块积木加桌面），接着 $y \ne x$ 有 $n - 1$ 种选法。所以动作数为 $n \cdot n \cdot (n - 1)$。$n = 3$ 时得 $3 \cdot 3 \cdot 2 = 18$，与程序的输出一致；$n = 4$ 时得 $4 \cdot 4 \cdot 3 = 48$。
:::
:::

::: exercise 计算 $h_{\max}$ 与 $h_{\mathrm{add}}$ {#ex-hadd level=1 check="8"}
动作（代价全为 $1$）：$a_1$：前置 $\{\}$，添加 $\{p\}$；$a_2$：前置 $\{p\}$，添加 $\{q\}$；$a_3$：前置 $\{p\}$，添加 $\{r\}$；$a_4$：前置 $\{q, r\}$，添加 $\{g_1\}$；$a_5$：前置 $\{q\}$，添加 $\{g_2\}$。从空状态出发、目标为 $\{g_1, g_2\}$，计算 $h_{\max}$、$h_{\mathrm{add}}$ 与 $h^+$。（填入 $h_{\mathrm{add}}$。）
::: solution
取 $\max$ 的代价：$p = 1$、$q = 2$、$r = 2$、$g_1 = 1 + \max(2, 2) = 3$、$g_2 = 1 + 2 = 3$，所以 $h_{\max} = 3$。取求和的代价：$p = 1$、$q = 2$、$r = 2$、$g_1 = 1 + 2 + 2 = 5$、$g_2 = 1 + 2 = 3$，所以 $h_{\mathrm{add}} = 5 + 3 = 8$。最短松弛计划是 $a_1, a_2, a_3, a_4, a_5$：每个动作都添加了某个目标需要的、且别无他法的原子，所以 $h^+ = 5$。于是 $h_{\max} = 3 \le h^+ = 5 \le h_{\mathrm{add}} = 8$：求和把 $a_1$ 数了三遍、$a_2$ 数了两遍。
:::
:::

::: exercise 计划可以很长 {level=2}
(a) 用 $O(n^2)$ 个原子把 $n$ 个圆盘的汉诺塔写成 STRIPS。(b) 证明任何计划都至少要 $2^n - 1$ 步。(c) 这对显式输出计划的规划器意味着什么？
::: solution
(a) 原子 $\mathit{On}(d, x)$：每个圆盘 $d$ 与每个更大的圆盘或柱子 $x$；以及圆盘和柱子上的 $\mathit{Clear}(x)$；动作 $\mathit{Move}(d, x, y)$，$y$ 为更大的圆盘或柱子，前置条件与效果同积木世界。原子共 $O(n^2)$ 个、动作 $O(n^3)$ 个。(b) 设 $T(n)$ 为把 $n$ 个圆盘的塔移到另一根柱子的最少步数。要移动最大的圆盘，$n - 1$ 个较小的圆盘必须全在第三根柱子上（最大圆盘须无遮挡，且目标柱须空），至少要 $T(n-1)$ 步；最大圆盘移动（至少 $1$ 步）之后，还要把较小的圆盘移到它上面，至少再 $T(n - 1)$ 步。所以 $T(n) \ge 2T(n-1) + 1$ 且 $T(1) = 1$，得 $T(n) \ge 2^n - 1$。(c) 由于输出长度是输入规模的指数，没有规划器能在所有输入上多项式时间运行——无论 $\mathsf{P}$ 与 $\mathsf{PSPACE}$ 之争结果如何。计划的*存在性*是另一回事：对汉诺塔它平凡得很（永远有解）。
:::
:::

::: exercise $h_{\max}$ 是一致的 {level=2}
证明 $h_{\max}$ 是一致的：对每个在 $s$ 中可适用的动作 $a$，$h_{\max}(s) \le 1 + h_{\max}(\mathrm{Result}(s, a))$。
::: solution
设 $s' = \mathrm{Result}(s, a)$。我们对 $k = \mathrm{cost}_{s'}(p)$ 归纳，证明对每个 $\mathrm{cost}_{s'}(p)$ 有限的原子 $p$ 有 $\mathrm{cost}_s(p) \le 1 + \mathrm{cost}_{s'}(p)$（代价取 $\max$ 计算）。$k = 0$ 时 $p \in s'$：或 $p \in s$，则 $\mathrm{cost}_s(p) = 0$；或 $p \in \mathrm{add}(a)$ 且 $\mathrm{pre}(a) \subseteq s$，则 $\mathrm{cost}_s(p) \le 1$。$k > 0$ 时，由 [[#eq-atom-cost]] 某个动作 $b$ 添加 $p$ 且其所有前置条件的 $\mathrm{cost}_{s'} \le k - 1$；由归纳假设它们的 $\mathrm{cost}_s \le k$，所以 $\mathrm{cost}_s(p) \le 1 + k$。对目标取最大即得 $h_{\max}(s) \le 1 + h_{\max}(s')$；且目标状态处 $h_{\max} = 0$。配上 [[artificial-intelligence/search#thm-astar-graph]]，带 $h_{\max}$ 的 A* 图搜索无需重新打开即是最优的。
:::
:::

::: exercise 回归会找到不可能的子目标 {level=2}
在三积木世界中，把目标 $\{\mathit{On}(A, B), \mathit{On}(B, C)\}$ 经过 $\mathit{Move}(A, \mathit{Table}, B)$ 回归，再把结果经过 $\mathit{Move}(B, \mathit{Table}, C)$ 回归。最终的子目标能被某个状态满足吗？反向规划器能拿这类不可能的子目标怎么办？
::: solution
第一次回归：删去 $\mathit{On}(A, B)$，加上 $\mathit{On}(A, \mathit{Table})$、$\mathit{Clear}(A)$、$\mathit{Clear}(B)$：$g_1 = \{\mathit{On}(B, C), \mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B)\}$。$\mathit{Move}(B, \mathit{Table}, C)$ 与 $g_1$ 相容吗？它删除 $\mathit{On}(B, \mathit{Table})$ 与 $\mathit{Clear}(C)$，都不在 $g_1$ 中：相容。回归：删去 $\mathit{On}(B, C)$，加上 $\mathit{On}(B, \mathit{Table})$、$\mathit{Clear}(B)$、$\mathit{Clear}(C)$：$g_2 = \{\mathit{On}(A, \mathit{Table}), \mathit{Clear}(A), \mathit{Clear}(B), \mathit{On}(B, \mathit{Table}), \mathit{Clear}(C)\}$——三块积木全是空的且 $A$、$B$ 在桌面上，这是可满足的（$C$ 也在桌面上）。这一串没有问题。不可能的子目标会这样出现：比如*先*把 $\{\mathit{On}(A, B), \mathit{On}(B, C)\}$ 经过 $\mathit{Move}(B, \mathit{Table}, C)$ 回归：它要求 $\mathit{Clear}(B)$，得到 $\{\mathit{On}(A, B), \mathit{Clear}(B), \dots\}$，没有任何状态满足它（$A$ 在 $B$ 上意味着 $B$ 不是空的）——但 STRIPS 并不知道 $\mathit{On}(A, B)$ 与 $\mathit{Clear}(B)$ 互相排斥。反向规划器可以用**状态不变式**（例如"$\mathit{On}(x, B)$ 与 $\mathit{Clear}(B)$ 互斥"，它可以自动算出）来剪掉这类子目标，或者用从 $I$ 正向算出的规划图互斥：含有在每一层都互斥的原子对的子目标是不可达的。
:::
:::

::: exercise SATPlan 编码的规模 {level=2 check="102"}
SATPlan 用每原子乘时刻 $0, \dots, k$ 各一个布尔变量、每动作乘时刻 $0, \dots, k - 1$ 各一个布尔变量，来编码"存在 $k$ 步的计划吗？"。三积木世界（$12$ 个原子、$18$ 个动作）取 $k = 3$ 需要多少个变量？需要哪些子句？（填入变量数。）
::: solution
原子：$12 \cdot (k + 1) = 48$；动作：$18 \cdot k = 54$；共 $102$ 个变量。子句说的是：初始状态在时刻 $0$ 成立（其原子各一个单元子句，其余原子各一个负单元子句）；目标原子在时刻 $k$ 成立；时刻 $t$ 的每个动作蕴含它在时刻 $t$ 的前置条件，以及时刻 $t + 1$ 的添加效果、删除效果之非；**解释性框架公理**：若某原子在 $t$ 与 $t + 1$ 之间改变真值，则时刻 $t$ 有某个动作导致了它（$\lnot p_t \land p_{t+1} \Rightarrow \bigvee_{a : p \in \mathrm{add}(a)} a_t$，删除同理）；以及**排斥公理**：禁止同一时刻两个互相干涉的动作（顺序计划则禁止任何两个动作）。一个满足赋值沿动作变量读出来就是一个计划。
:::
:::

::: exercise 实现 FF 启发式 {level=3}
实现 $h_{\mathrm{FF}}$：像 $h_{\max}$ 那样取 $\max$ 计算 $\mathrm{cost}_s$，同时为每个原子记下首次实现它的动作；然后从目标出发反向提取松弛计划（对每个不在 $s$ 中的目标，纳入它的实现者，并递归纳入该动作前置条件的实现者），返回不同动作的个数。在 $h_{\max}$ 与 $h_{\mathrm{add}}$ 那一题的问题上与 $h_{\max}$、$h_{\mathrm{add}}$ 比较，并在随机积木世界问题上与贪心最佳优先搜索比较。
::: solution
```python
def h_ff(state, goal, actions):
    cost = {p: 0 for p in state}; achiever = {}; changed = True
    while changed:                                     # h_max 的代价，同时记住实现者
        changed = False
        for a in actions:
            if all(p in cost for p in a.pre):
                c = 1 + max([cost[p] for p in a.pre] or [0])
                for q in a.add:
                    if c < cost.get(q, float("inf")):
                        cost[q] = c; achiever[q] = a; changed = True
    if not all(g in cost for g in goal): return float("inf")
    plan, todo = set(), [g for g in goal if g not in state]
    while todo:                                        # 反向提取一个松弛计划
        p = todo.pop()
        a = achiever[p]
        if a.name in plan: continue
        plan.add(a.name)
        todo.extend(q for q in a.pre if q not in state)
    return len(plan)
```

在 [[#ex-hadd]] 的五动作问题上，此函数返回 $5$：松弛计划 $\{a_1, \dots, a_5\}$，其中 $a_1$ 与 $a_2$ 各数一次——在这里恰是 $h^+$，介于 $h_{\max} = 3$ 与 $h_{\mathrm{add}} = 8$ 之间。一般有 $h_{\mathrm{FF}} \ge h^+$（它数的是一个合法松弛计划，未必最短），并不可容许，但它避免了 $h_{\mathrm{add}}$ 的重复计数。把 `search` 函数的启发式换成 `lambda s: h_ff(s, goal, acts)`、`weight_g=0`，在 [[#ex-heuristic-planning]] 的六个随机问题上（同一种子），贪心搜索仍是每步计划只扩展一个状态，找到的计划长度为 $6, 4, 6, 6, 9, 8$；最优解为 $6, 4, 6, 5, 8, 6$，贪心 $h_{\mathrm{add}}$ 的结果是 $8, 4, 6, 5, 9, 7$：一个实例更好，另一个更差。正因如此，满足型启发式的比较要在大型基准集上进行。
:::
:::
