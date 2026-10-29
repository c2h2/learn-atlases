[[agents/agent-loops]] 的智能体循环一次只决定一步。对短任务，以及对每个观察都会改变下一步该做什么的任务，这就够了。但对许多部分相互依赖的任务——把代码库迁移到新的库、给十二个人安排一次学术会议出行、复现一篇论文的分析——并不够：不顾全局的一步可能让后面的步骤再也无法完成，而丢失了总体目标的智能体会四处游荡。对这样的任务，智能体会**规划**：在执行之前或执行之中，产生一个由步骤与子目标构成的显式结构，照着它执行，并在现实不配合时修改它。

规划是人工智能最古老的课题之一，而经典理论为语言模型智能体以粗糙方式面对的问题给出了精确的回答：什么是计划、计划何时正确、为什么找一个计划很难、子目标为什么不能总是一个一个地实现。我们从这里讲起：STRIPS 表示（Fikes 与 Nilsson，1971）、它的后继 PDDL、作为搜索的规划，并配一个用普通 Python 写成的迷你规划器。然后转向语言模型智能体如何规划——带重新规划的规划–执行循环、层次分解，以及 LLM+P（Liu 等，2023）中的分工：模型把问题翻译成形式语言，经典规划器负责求解。本章最后是关于语言模型独自规划得多么好的证据（Valmeekam 等，2023 及其后续工作）——这是本课程中最有争议的题目之一，我们把双方的论据都摆出来。

## 经典规划 {#sec-classical}

经典规划研究的是规划仍然困难的最简单设定：完全可观察的世界、确定性的动作、已知的初始状态与目标。CS 图谱对其有深入处理（[规划](/learn/cs/lesson.php?c=artificial-intelligence&l=planning)，搜索算法见[搜索](/learn/cs/lesson.php?c=artificial-intelligence&l=search)）；这里只需要其核心。

::: definition STRIPS 规划问题 {#def-strips}
一个 **STRIPS 问题**是一个元组 $(F, A, s_0, G)$：基**原子**（如 `on(A,B)` 这样的事实）的有限集 $F$、动作集 $A$、**初始状态** $s_0\subseteq F$ 与**目标** $G\subseteq F$。**状态**是原子的集合，即当前为真的那些。每个动作 $a$ 带一个**前置条件** $\operatorname{pre}(a)$、一个**添加表** $\operatorname{add}(a)$ 与一个**删除表** $\operatorname{del}(a)$，都是 $F$ 的子集。当 $\operatorname{pre}(a)\subseteq s$ 时，动作 $a$ 在 $s$ 中**可适用**，此时其结果为
$$
\gamma(s, a) = \big(s\setminus\operatorname{del}(a)\big)\cup\operatorname{add}(a).
$$ {#eq-progression}
**计划**是一个序列 $a_1, \dots, a_n$，其中每个 $a_i$ 都在 $s_{i-1} = \gamma(s_{i-2}, a_{i-1})$ 中可适用；当 $G\subseteq s_n$ 时它**求解**该问题。其长度为 $n$。
:::

STRIPS——斯坦福研究所问题求解器（Stanford Research Institute Problem Solver）——由 Fikes 与 Nilsson（1971）为移动机器人 Shakey 规划动作而建造。它的算法早已作古，表示却活了下来。**规划领域定义语言**（Planning Domain Definition Language，PDDL）由 McDermott 及其同事在 1998 年为首届国际规划大赛引入，用带类型变量的标准语法书写 STRIPS 风格的问题，并把**领域文件**（谓词与带参数的动作模式）和**问题文件**（对象、初始状态、目标）分开；后续版本又加入了数值量、持续时间与偏好。像 `move(?b ?x ?y)` 这样的动作模式代表它的全部基例。

标准的玩具领域是**积木世界**：积木放在桌面上，一块积木上面至多直接摞一块积木；动作可以把一块空积木（上面没有东西的积木）移到桌面或另一块空积木上。

::: example 积木世界的基动作 {#ex-ground}
对动作模式 $\textsf{move}(b, x, y)$——把积木 $b$ 从 $x$ 移到 $y$，其中 $x$ 与 $y$ 是积木或桌面——写出前置条件、添加表与删除表，并数一数 $3$ 块积木共有多少个基动作。
::: solution
$\operatorname{pre} = \{\textsf{on}(b, x), \textsf{clear}(b), \textsf{clear}(y)\}$，其中当 $y$ 是桌面时省掉 $\textsf{clear}(y)$（桌面永远有空位）。$\operatorname{add} = \{\textsf{on}(b, y), \textsf{clear}(x)\}$（$x$ 是桌面时省掉 $\textsf{clear}(x)$），$\operatorname{del} = \{\textsf{on}(b, x), \textsf{clear}(y)\}$（$y$ 是桌面时省掉 $\textsf{clear}(y)$）。对积木 $\{A, B, C\}$，$b$ 有 $3$ 种选法；$x$ 与 $y$ 是其余三个位置（另外两块积木和桌面）中两个不同的位置，共 $3\cdot2 = 6$ 个有序对。合计 $3\cdot6 = 18$ 个基动作——下面的清单打印的正是这个数。
:::
:::

### 作为搜索的规划

一个 STRIPS 问题定义一个有向图：顶点是状态，每个可适用的动作给出一条边 $s\to\gamma(s, a)$。计划是一条从 $s_0$ 到某个包含 $G$ 的状态的路径，而最短计划就是最短路径，所以任何图搜索算法都是规划器。广度优先搜索能找到最短计划；带可容许启发式的 A* 同样能，且启发式有信息量时扩展的状态更少。

::: widget graph
nodes: A|B|C@0,0; AB|C@1.50,0.00; ABC@3.00,0.00; A|CB@0.75,1.30; CBA@1.50,2.60; AC|B@-0.75,1.30; ACB@-1.50,2.60; A|BC@-1.50,0.00; BCA@-3.00,0.00; BA|C@-0.75,-1.30; BAC@-1.50,-2.60; B|CA@0.75,-1.30; CAB@1.50,-2.60
edges: ABC-AB|C; AB|C-A|B|C; AB|C-A|CB; ACB-AC|B; AC|B-A|BC; AC|B-A|B|C; A|BC-A|B|C; A|BC-BCA; A|B|C-A|CB; A|B|C-BA|C; A|B|C-B|CA; A|CB-CBA; BAC-BA|C; BA|C-B|CA; B|CA-CAB
algorithm: bfs
start: AC|B
caption: 三积木世界的整个状态空间：$13$ 个状态、$15$ 步可逆的移动。每个名字把各座塔自底向上列出、塔之间用竖棒分隔，所以 AC|B 表示 C 在 A 上、B 在桌面上，而 CBA 是一座塔，C 在底、A 在顶。从 AC|B——萨斯曼反例的初始状态——一步步演示广度优先搜索（[[#ex-sussman]]）；目标 CBA 在第 $3$ 层首次到达：把 C 移到桌面，B 移到 C 上，A 移到 B 上。$n$ 块积木的状态数比 $n!$ 增长还快：四块 $73$ 个、五块 $501$ 个、六块 $4{,}051$ 个。
:::

这张图的大小就是困难所在。判定一个 STRIPS 问题有没有解，一般情形下是 PSPACE-完全的（Bylander，1994），而状态空间的大小随原子数指数增长。实用规划器之所以奏效，靠的是从问题描述本身计算的启发式——最著名的是**删除松弛**：忽略删除表，得到一个更容易的问题，用它的解的代价来估计真实问题的代价——也靠数十年工程的积累，如 Fast Downward 系统（Helmert，2006）。

### 一个用普通 Python 写成的规划器

下面的清单把积木世界的动作实例化为基动作，实现进展公式 [[#eq-progression]]，并用广度优先搜索与 A* 搜索——先用 $h = 0$，此时 A* 就是一致代价搜索；再用**目标计数启发式**：尚未为真的目标原子的个数。它会求解三积木的萨斯曼反例，以及反转一座六积木塔的问题。

```python
import heapq
from collections import deque

def blocks_actions(blocks):
    """生成基 STRIPS 动作 move(b, x, y)：把积木 b 从 x 移到 y 上（x、y 为积木或 'table'）。"""
    acts = []
    places = list(blocks) + ["table"]
    for b in blocks:
        for x in places:
            for y in places:
                if len({b, x, y}) < 3 or (x == "table" and y == "table"):
                    continue
                pre = {f"on({b},{x})", f"clear({b})"} | ({f"clear({y})"} if y != "table" else set())
                add = {f"on({b},{y})"} | ({f"clear({x})"} if x != "table" else set())
                dele = {f"on({b},{x})"} | ({f"clear({y})"} if y != "table" else set())
                acts.append((f"move({b},{x},{y})", frozenset(pre), frozenset(add), frozenset(dele)))
    return acts

def successors(state, acts):
    for name, pre, add, dele in acts:
        if pre <= state:                         # 可适用：前置条件成立
            yield name, (state - dele) | add     # STRIPS 进展

def bfs(init, goal, acts):
    frontier, parent, expanded = deque([init]), {init: None}, 0
    while frontier:
        s = frontier.popleft(); expanded += 1
        if goal <= s:
            return extract(parent, s), expanded, len(parent)
        for name, t in successors(s, acts):
            if t not in parent:
                parent[t] = (s, name); frontier.append(t)

def astar(init, goal, acts, h):
    g, parent, expanded, tie = {init: 0}, {init: None}, 0, 0
    heap = [(h(init, goal), 0, init)]
    while heap:
        f, _, s = heapq.heappop(heap)
        if f > g[s] + h(s, goal): continue       # 过时的堆条目
        expanded += 1
        if goal <= s:
            return extract(parent, s), expanded, len(parent)
        for name, t in successors(s, acts):
            if t not in g or g[s] + 1 < g[t]:
                g[t], parent[t] = g[s] + 1, (s, name)
                tie += 1; heapq.heappush(heap, (g[t] + h(t, goal), tie, t))

def extract(parent, s):
    plan = []
    while parent[s]:
        s, name = parent[s]; plan.append(name)
    return plan[::-1]

goal_count = lambda s, goal: len(goal - s)       # 未满足的目标原子数（一般不可容许）
zero = lambda s, goal: 0                         # h = 0 的 A* 即一致代价搜索

# 萨斯曼反例：C 在 A 上；A、B 在桌面。目标：A 在 B 上，B 在 C 上。
B3 = "ABC"
init = frozenset({"on(C,A)", "on(A,table)", "on(B,table)", "clear(C)", "clear(B)"})
goal = frozenset({"on(A,B)", "on(B,C)"})
acts = blocks_actions(B3)
print(len(acts), "ground actions")
for name, search in [("BFS", lambda: bfs(init, goal, acts)),
                     ("A*, h=0", lambda: astar(init, goal, acts, zero)),
                     ("A*, goal count", lambda: astar(init, goal, acts, goal_count))]:
    plan, expanded, generated = search()
    print(f"{name:15s} plan {plan}  expanded {expanded}  generated {generated}")

# 一个更大的问题：把 6 块积木的塔反过来。
B6 = "ABCDEF"
tower = [f"on({B6[0]},table)"] + [f"on({B6[i]},{B6[i-1]})" for i in range(1, 6)]
init6 = frozenset(tower + [f"clear({B6[-1]})"])
goal6 = frozenset([f"on({B6[i-1]},{B6[i]})" for i in range(1, 6)])
acts6 = blocks_actions(B6)
for name, search in [("BFS", lambda: bfs(init6, goal6, acts6)),
                     ("A*, goal count", lambda: astar(init6, goal6, acts6, goal_count))]:
    plan, expanded, generated = search()
    print(f"6 blocks {name:15s} length {len(plan)}  expanded {expanded}  generated {generated}")
```

```text
18 ground actions
BFS             plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 13  generated 13
A*, h=0         plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 13  generated 13
A*, goal count  plan ['move(C,A,table)', 'move(B,table,C)', 'move(A,table,B)']  expanded 7  generated 11
6 blocks BFS             length 6  expanded 143  generated 565
6 blocks A*, goal count  length 6  expanded 7  generated 11
```

在三块积木上，两个无信息搜索在到达目标之前把 $13$ 个状态的整个空间都扩展了；目标计数把它们减半。在六块积木上，两者的差距是扩展次数的二十倍，而且随积木增多会迅速扩大。目标计数启发式一般并不可容许（在某些领域里，一个动作可以同时实现好几个目标原子），所以带它的 A* 不保证找到最短计划——尽管在这里找到了。这段代码真正值得看的，是它的形状：只要领域模型正确，几十行代码返回的计划**保证有效**——每个前置条件都核对过，每个效果都执行过。

### 为什么子目标会相互作用

对合取目标，最显然的规划办法是一个接一个地实现各部分。积木世界里就有那个经典的反例。

::: example 萨斯曼反例 {#ex-sussman}
初始状态：C 在 A 上；A 与 B 在桌面上。目标：$\textsf{on}(A, B)\wedge\textsf{on}(B, C)$。证明：先以自己的最短计划实现任意一个子目标、再在不反悔它的前提下实现另一个，会失败。
::: solution
**先实现 $\textsf{on}(A, B)$：**把 C 移到桌面，再把 A 放到 B 上。这时 B 压在 A 底下，要把 B 放到 C 上，就得先把 A 搬走——这就推翻了第一个子目标。**先实现 $\textsf{on}(B, C)$：**把 B 放到 C 上。这时仍然在 A 上面的 C 又被 B 压住，A 埋没在 C 与 B 之下，要把 A 放到 B 上就得拆掉这座塔。两种次序都迫使规划器撤销已经达成的目标。上面搜索找到的最优计划把两者交错进行：C 移到桌面（表面上对哪个目标都没有推进），B 移到 C 上，A 移到 B 上。Sussman（1975）用这个例子说明，把子目标当作彼此独立的规划器——「线性」规划器——是不完备的。
:::
:::

这个反例不是什么玩具积木的奇闻。每个共享资源的真实任务都有它：一次重构必须按特定顺序改动一个接口和它所有的调用处；一份日程里，订下第一班航班会决定还剩哪些酒店可选。这正是为什么把任务分解成子目标——语言模型规划的主要技术——必须为子目标其实并不独立的情形留一条退路。

## 语言模型智能体如何规划 {#sec-llm-planning}

语言模型智能体手里很少有形式化的领域模型。它只有自然语言的任务、只从描述中知道效果的工具，以及可能部分未知的环境。因此它的计划是文本——带编号的步骤清单、任务树、一个待办文件——由模型生成，再由模型解读。常见的模式有三种。

### 规划、执行、重新规划

::: definition 带重新规划的规划–执行 {#def-plan-execute}
一次**规划器**（planner）调用从任务与当前上下文产生一个自然语言步骤的计划 $\pi = (\sigma_1, \dots, \sigma_n)$。一个**执行器**——一个智能体循环（[[agents/agent-loops#def-loop]]），常常用更便宜的模型或更窄的工具集——按次序完成各步，每一步执行到它报告成功或失败为止。在每一步之后，或仅在失败之后，一次**重新规划器**（replanner）调用接收任务、原计划与已有的结果，返回剩余工作的修订计划，或者最终答案。
:::

把规划与执行分开有三个好处。计划是一种承诺，能让长程运行不偏航，而且它就写在上下文里，之后的每一步都看得见。执行器的上下文可以限于当前这一步及其输入，从而保持短小（[[agents/memory-context]]）。而计划是天然的人工监督点：在发生任何不可逆的事情之前，人可以阅读并纠正它。缺点是：在第一次观察之前写下的计划往往是错的——这正是重新规划被列入定义的原因。Wang 等（2023）表明，即便只在一次回答之内，让模型「先制定计划，再照着执行」（plan-and-solve 提示）在推理题上也优于普通的思维链；智能体框架把这个想法推广到带显式重新规划步骤的工具调用上。

::: example 多久重新规划一次？ {#ex-replan}
一个计划有 $8$ 步。每步的每次执行以概率 $0.15$ 失败，各步相互独立；每次失败后，智能体重新规划剩余的工作（花费一次规划器调用），然后重试该步。重新规划调用次数的期望是多少？若智能体改为不待失败、每执行完一步就重新规划，又会如何？
::: solution
每步所需的尝试次数服从成功概率为 $0.85$ 的几何分布，均值 $1/0.85 = 1.176$，于是平均每步失败——并重划——$0.176$ 次，总共 $8\cdot0.15/0.85 = 1.41$ 次重划。每步之后都重划要花费 $8$ 次规划器调用（再加上失败步引发的那些，若一个失败步之后两者都算），多出五倍以上。每步重划能更快地适应新信息；失败才重划更便宜。许多智能体采用后者，并允许执行器在得知使计划作废的情况时主动请求重新规划。
:::
:::

### 层次分解

长任务被递归地分解：目标分成子目标，子目标再分成步骤，直到每一小块都小到可以直接执行。least-to-most 提示（Zhou 等，2023）把问题分解为若干个按顺序求解的更简单子问题，前一个答案喂给下一个；HuggingGPT（Shen 等，2023）让模型把一个请求切成子任务，并把每个子任务指派给一个专门的模型；而编排者–执行者系统（[[agents/multi-agent-systems]]）则把子目标交给不同的智能体。经典的对应物是层次任务网络（HTN）：其方法库规定了每个复合任务如何分解。分解为什么省——以及何时成立——这笔算术很简单。

::: proposition 分解缩小搜索 {#prop-decompose}
设分支因子为 $b\ge2$ 的规划问题有一个长度 $d$ 的最短解，而广度优先搜索扩展约 $b^d$ 个状态。若问题可拆成 $k$ 个先后求解的子问题，每个的解长为 $d/k$、分支因子相同，且各子问题的解能拼接成整个问题的解，那么求解各子问题的代价约为 $k\,b^{d/k}$ 次扩展。省下的倍数为 $b^{d(1 - 1/k)}/k$，当 $k\ge2$ 时至少是 $b^{d/2}/k$。
:::

::: proof
每个子问题约需 $b^{d/k}$ 次扩展，共 $k$ 个，于是总量为 $k\,b^{d/k}$。两者之比为 $b^d/(k\,b^{d/k}) = b^{d(1 - 1/k)}/k$；当 $k\ge2$ 时指数满足 $d(1 - 1/k)\ge d/2$，所以比值至少为 $b^{d/2}/k$。
:::

::: widget plot
f: x*log(b)/log(10); log(k)/log(10) + (x/k)*log(b)/log(10)
x: 1, 30
y: 0, 30
sliders: b=10:2:20:1; k=4:2:10:1
labels: 整个问题 $\log_{10} b^d$; $k$ 个可串行子问题 $\log_{10}(k\,b^{d/k})$
points: 12,12; 12,3.602
caption: 扩展的状态数（对数尺度，即十的幂）随解长 $d$ 的变化，对比对整个问题的搜索与对 $k$ 个可串行子问题的搜索（[[#prop-decompose]]）。$b = 10$、$d = 12$、$k = 4$ 时，标注的两点是 $10^{12}$ 与 $4\cdot10^3$。在这个尺度上，差距随 $d$ 线性张开——真实情形则是指数——前提是各子问题真的相互独立。
:::

省下的数目是巨大的：$b = 10$、$d = 12$、$k = 4$ 时，从 $10^{12}$ 降到 $4\cdot10^3$。但这一切都系于一个条件：各部分能拼接成整体——子目标是**可串行的**（serialisable）——而萨斯曼反例违反的恰恰就是它。条件不成立时，基于分解的规划器必须发现冲突（后面的步骤要撤销前面的子目标），并重新排序子目标、把它们合并，或退回到对合并问题的规划。对语言模型智能体而言，这种发现通常发生在执行时、某一步失败之际——这又是重新规划列入 [[#def-plan-execute]] 的一条理由。

### 借助经典规划器规划：LLM+P

语言模型规划不可靠，但翻译在行；经典规划器可靠，却需要形式化的输入——两者可以拼在一起。

::: definition LLM+P {#def-llmp}
在 **LLM+P**（Liu 等，2023）中，语言模型得到：一份由人写好的 PDDL 领域文件；一道自然语言问题连同其 PDDL 问题文件的一个例子；以及一道新的自然语言问题。它为新问题写出 PDDL 问题文件；经典规划器（论文中用 Fast Downward）搜索一个计划；模型再把计划翻译回自然语言。
:::

Liu 等报告，在一组标准规划领域上，LLM+P 对多数问题产生了正确的计划，而同一个语言模型用自然语言直接规划则在多数问题上失败。这个方法的长处与短处是同一样东西：规划器保证的是返回的计划**对 PDDL 模型**有效。若模型把问题译错了——初始状态漏了一个原子、目标写错——那么计划有效，只不过对的是另一个问题。而且它需要一份领域文件：物流与机器人基准有，「迁移这个代码库」就没有。后续工作让模型连领域文件也一起写（Guan 等，2023），由人来纠正；更一般地，是使用外部验证器而非求解器：**LLM-Modulo** 框架（Kambhampati 等，2024）提出让模型生成候选计划，交给一批外部审查者——验证器、模拟器、人——接受或拒绝，并把拒绝反馈给模型。

::: example 验证一个候选计划 {#ex-validate}
对萨斯曼反例，某模型提出计划 $\textsf{move}(B, \text{table}, C)$、$\textsf{move}(C, A, \text{table})$、$\textsf{move}(A, \text{table}, B)$。用进展验证它，并像计划验证器那样报告第一处失败。
::: solution
状态 $s_0$：$\textsf{on}(C, A)$、$\textsf{on}(A, \text{table})$、$\textsf{on}(B, \text{table})$、$\textsf{clear}(C)$、$\textsf{clear}(B)$。第 1 步，$\textsf{move}(B, \text{table}, C)$：前置条件 $\textsf{on}(B, \text{table})$、$\textsf{clear}(B)$、$\textsf{clear}(C)$ 成立；结果添加 $\textsf{on}(B, C)$，删除 $\textsf{on}(B, \text{table})$ 与 $\textsf{clear}(C)$。第 2 步，$\textsf{move}(C, A, \text{table})$：前置条件 $\textsf{clear}(C)$ 不成立——B 此刻已在 C 上。验证器报告：「step 2: precondition clear(C) false (B is on C)」。这条信息反馈给模型，恰恰是 [[agents/agent-loops#prop-retry]] 表明起决定作用的那类检测信号。模型计划里那三个移动本身都对，只是次序错了——一种很典型的错误。
:::
:::

## 语言模型的规划能力有多强？ {#sec-evidence}

语言模型究竟能不能规划，认真的研究者也有分歧；诚实的总结是：答案取决于所说的规划指什么、说的是哪些模型，以及测量做于何时。

**怀疑一方的证据。** Valmeekam 等（2023）构建了 PlanBench：把国际规划大赛领域（包括积木世界）中的问题用自然语言呈现给模型，计划由自动验证器检查。他们报告，当时的模型在自主使用时很少产生有效的计划：最好的模型（GPT-4）在各领域上平均只有约 $12\%$ 的成功率。两项对照让结果更加锋利。其一是「Mystery Blocksworld」：同样的问题，动作名与谓词名被换成不相干的词，逻辑结构原样保留——成功率进一步暴跌，说明表现依靠的是对标准领域的熟悉，而不是对所陈述规则的推理。其二是当模型的计划交给外部验证器检查、并把错误反馈回去（「backprompting」）时，成功率大幅提高——这正是催生 LLM-Modulo 的结果。作者们的解读是：语言模型是在检索并改写貌似计划的文本，而不是在规划；它们最好的用法，是为可靠的验证器生成候选。

**更乐观一方的证据。** 模型在进步。2024 年，Valmeekam 与合作者在同一基准上评测了一个早期的推理模型——OpenAI 的 o1-preview——报告在标准积木世界问题上跃升一大截，在原始测试集上近乎全对；但在混淆化的领域和更长的题目上表现弱得多，而且每题成本高昂。而在实践中，智能体规划的场合也与 PlanBench 很不相同：有工具、只能部分观察、能够尝试、观察并重新规划，在这种条件下，一个由反馈纠正的不完美计划可以成功，而单次成型的计划会失败。真实智能体任务的基准（[[agents/code-agents]]、[[agents/computer-use]]）度量的正是这种组合，而它们的成功率在 2024 与 2025 年间稳步上升。

**双方都同意的部分。** 对许多步骤相互牵制的问题，让模型一次成型的计划闭着眼睛执行并不可靠；有计划再交由可靠的验证器、模拟器或环境检验，就要好得多；混淆化测试是对「把熟悉当推理」的有用对照。截至 2026 年，推理模型在内部究竟做了多少真正的搜索与约束跟踪（[[reasoning/search]]），仍无定论。但实际结论不依赖于这一争论的结果：带着反馈来规划，凡有验证器处就检验。

::: warning 貌似合理的计划不是有效的计划
文本计划读起来很顺。一张八步、步步看起来都合理的编号清单里，可能含有前置条件从未被建立的动作、两个次序不可能的步骤（如 [[#ex-validate]]），或某一步悄悄推翻了前面的步骤。流利不是有效性的证据。凡是领域能检验的地方——依赖图、日程、测试套件、试运行——都在执行之前检验计划，并把每一步的失败当作关于计划的信息，而不仅仅是关于那一步的信息。
:::

::: quiz
一个智能体要为 $12$ 名员工排一张满足 $30$ 条硬约束（可上班时间、最长工时、每班所需技能）的周值班表。哪种设计最可能产生有效的值班表？
- [ ] 在一次回答里向模型要一张值班表，把约束都列在提示中。
- [ ] 向模型要一张值班表，再问它所有约束是否都满足了，模型说是就接受。
- [x] 让模型把需求翻译成形式化的约束模型，交给求解器检验并求解；由人来审查模型对每条约束的翻译。
- [ ] 生成十张值班表，挑模型评价最高的那张。
::: solution
三十条相互牵制的硬约束是经典的约束满足问题，求解器能精确处理；模型的长处是翻译，正如 LLM+P（[[#def-llmp]]）。由人来审查翻译——那是求解器无法察觉的失败模式。没有外部检验的自我评估并不可靠（[[agents/agent-loops#sec-reflexion]]），而模型的好评并不检验约束。
:::
:::

::: history
把规划作为课题，始于 Newell 与 Simon 的通用问题求解器（1959），其手段–目的分析缩小当前状态与目标之间的差异。Fikes 与 Nilsson 的 STRIPS（1971）为机器人 Shakey 提出了用前置条件、添加表与删除表表示动作的做法；Sussman 的博士论文（1975）给出了击败线性规划器的那个反例；Sacerdoti 的 NOAH（1975）与其后的系统用部分有序的步骤与层次分解来规划，是层次任务网络的前身。Bylander（1994）证明了 STRIPS 计划存在性是 PSPACE-完全的。McDermott 及其同事为首届国际规划大赛定义了 PDDL（1998）；Blum 与 Furst 的 Graphplan（1995）、Kautz 与 Selman 的作为可满足性的规划（1992、1996），以及 HSP（Bonet 与 Geffner，2001）、FF（Hoffmann 与 Nebel，2001）、Fast Downward（Helmert，2006）等启发式搜索规划器，让经典规划在大问题上变得可用。进入语言模型时代，Huang 等（2022）用提示让模型逐步产出家务计划，Zhou 等（2023）提出 least-to-most 分解，Wang 等（2023）提出 plan-and-solve 提示，Yao 等（2023）提出在中间步骤上做的思维树搜索，Liu 等（2023）提出 LLM+P。Valmeekam 等（2023）与 Kambhampati 等（2024）以 PlanBench 与 LLM-Modulo 主张模型应为外部验证器生成候选；他们 2024 年的后续工作测出了推理模型带来的收益以及仍存的局限。
:::

::: summary
- STRIPS 问题由原子、带前置条件与添加表、删除表的动作、初始状态和目标构成；计划是可适用动作的序列，其最终状态满足目标。PDDL 用标准语法书写这类问题。
- 规划是在指数级大的状态图上搜索（一般情形 PSPACE-完全）；目标计数、删除松弛等启发式使其可行，而给定正确模型的规划器只返回有效的计划。
- 子目标会相互作用：萨斯曼反例表明，逐个实现合取目标可能失败，所以分解需要一条退路。
- 语言模型智能体用文本来规划：带重新规划的规划–执行、层次分解，以及像 LLM+P 那样把问题翻译给经典规划器的混合方案。
- 分解成 $k$ 个可串行的子问题可把搜索从约 $b^d$ 降到 $k\,b^{d/k}$——前提是各子问题真的相互独立。
- 证据：2023 年的模型在形式化基准上很少单次产生有效计划，名字混淆化时尤甚；验证器的反馈帮助很大；推理模型在 2024 年改善了结果，但没有弥合更难变体上的差距。带着反馈规划，凡可检验处就检验。
:::

## 习题

::: exercise 应用一个动作 {level=1}
在状态 $\{\textsf{on}(A, \text{table}), \textsf{on}(B, A), \textsf{on}(C, \text{table}), \textsf{clear}(B), \textsf{clear}(C)\}$ 中，$\textsf{move}(B, A, C)$ 可适用吗？若可，用 [[#eq-progression]] 算出结果状态。
::: solution
前置条件 $\textsf{on}(B, A)$、$\textsf{clear}(B)$、$\textsf{clear}(C)$ 全部成立，所以可适用。删除 $\textsf{on}(B, A)$ 与 $\textsf{clear}(C)$；添加 $\textsf{on}(B, C)$ 与 $\textsf{clear}(A)$。结果：$\{\textsf{on}(A, \text{table}), \textsf{on}(C, \text{table}), \textsf{on}(B, C), \textsf{clear}(A), \textsf{clear}(B)\}$。
:::
:::

::: exercise 四块积木的基动作 {level=1 check="48"}
$4$ 块积木的积木世界有多少个基 $\textsf{move}(b, x, y)$ 动作？
::: solution
对每块积木 $b$（四种选法），$x$ 与 $y$ 是从其余三块积木加桌面共四个位置中选出的两个不同位置：$4\cdot3 = 12$ 个有序对。合计 $4\cdot12 = 48$。$n$ 块积木时为 $n\cdot n(n - 1) = n^2(n - 1)$；$n = 3$ 时为 $18$，与清单一致。
:::
:::

::: exercise 重新规划的期望 {level=1 check="1.41"}
在 [[#ex-replan]] 的设定下，计算每步失败概率为 $0.15$ 的 $8$ 步计划中重新规划调用次数的期望。保留两位小数。
::: solution
$8\cdot0.15/0.85 = 1.4118$，即 $1.41$。
:::
:::

::: exercise 数状态 {level=2 check="73"}
数出四块积木世界的状态数。（提示：状态是一组非空塔的集合，每座塔是积木的一个有序序列。把 $n$ 个带标签的积木排成 $k$ 座有次序的塔，而塔与塔之间不论次序，数一数有多少种方式。）
::: solution
把 $n$ 个带标签的元素分成 $k$ 个非空有序列表（列表之间相互无次序）的方式数是拉埃数（Lah number）$L(n, k) = \binom{n-1}{k-1}\frac{n!}{k!}$。$n = 4$ 时：$L(4, 1) = 24$，$L(4, 2) = 3\cdot12 = 36$，$L(4, 3) = 3\cdot4 = 12$，$L(4, 4) = 1$。合计 $24 + 36 + 12 + 1 = 73$。$n = 3$ 时：$6 + 6 + 1 = 13$，与图一致。
:::
:::

::: exercise 不可容许的目标计数 {level=2}
构造一个 STRIPS 领域（不是积木世界）和一个状态，使目标计数启发式高估到目标的真实代价，并说明这对 A* 的后果。
::: solution
取原子 $p, q$，初始状态 $\varnothing$，目标 $\{p, q\}$，只有一个动作 $a$，其前置条件为空、$\operatorname{add}(a) = \{p, q\}$。初始状态的目标计数是 $2$，但一个动作就到得了目标：这是高估，所以不可容许。启发式不可容许时，A* 可能返回比最优更长的计划，因为它可能在代价更便宜的路径（其 $f$ 值被估高了）探索完之前，就经由一条更贵的路径把目标状态弹出堆。在积木世界里，一次移动至多实现一个 $\textsf{on}$ 原子，所以对由 $\textsf{on}$ 原子构成的目标，目标计数在那里是可容许的——这就是清单找到最优计划的原因。
:::
:::

::: exercise 分解省多少 {level=2 check="250000000"}
在 [[#prop-decompose]] 的模型下，分支因子 $b = 10$、解长 $d = 12$ 时，拆成 $k = 4$ 个长度 $3$ 的可串行子问题，扩展次数降到几分之一？
::: solution
$b^d/(k\,b^{d/k}) = 10^{12}/(4\cdot10^3) = 2.5\cdot10^{8}$，即 $250{,}000{,}000$ 倍。
:::
:::

::: exercise 混淆化的领域 {level=3}
说明 Mystery Blocksworld 这样的混淆化领域控制了哪些因素、没有控制哪些因素，以及为什么在它上面准确率的下降与两种不同的假说都相容。设计一个能把它们区分开的实验。
::: solution
给动作与谓词改名保持了问题的逻辑结构，所以一个纯粹照陈述规则规划的系统本应不受影响；准确率下降说明表现依赖过那些名字——依赖从预训练带来的关于积木与堆叠的知识。这与两种解读都相容：(1) 模型根本不从规则出发推理，只是检索熟悉的计划模式；(2) 模型确实从规则出发推理，但当它无法借助世界知识检查自己时就不那么可靠——人对逻辑推理题的抽象版本也做得比对熟悉的版本差（Wason 选择任务）。要区分两者，可在混淆化领域内改变问题的规模与结构：在 (1) 下，即使题目非常短，准确率也应接近瞎猜；在 (2) 下，短题目上应很高、随长度衰减，而且提供验证器反馈的帮助在 (2) 下应当大得多。还可以测迁移：在混淆化领域里教一条新规则，检查计划是否遵守它。
:::
:::

::: exercise 一个计划验证器 {level=3}
为清单的 STRIPS 表示写一个函数 `validate(plan, init, goal, acts)`，返回「valid」，或第一个不可适用步骤的序号与其未满足的前置条件（或未达成的目标原子）。用它检验 [[#ex-validate]] 中的计划和搜索找到的计划。
::: solution
```python
def validate(plan, init, goal, acts):
    table = {name: (pre, add, dele) for name, pre, add, dele in acts}
    s = init
    for i, name in enumerate(plan, 1):
        if name not in table:
            return f"step {i}: unknown action {name}"
        pre, add, dele = table[name]
        if not pre <= s:
            return f"step {i}: {name} has false preconditions {sorted(pre - s)}"
        s = (s - dele) | add
    if not goal <= s:
        return f"goal atoms not reached: {sorted(goal - s)}"
    return "valid"

bad = ["move(B,table,C)", "move(C,A,table)", "move(A,table,B)"]
good = ["move(C,A,table)", "move(B,table,C)", "move(A,table,B)"]
print(validate(bad, init, goal, acts))
print(validate(good, init, goal, acts))
```

```text
step 2: move(C,A,table) has false preconditions ['clear(C)']
valid
```

信息里点出了步骤和未满足的原子，而这正是模型修复计划所需要的。这样的验证器是混合规划器里最便宜、也最可靠的部件：只有几行，是精确的，而它的输出是 [[agents/agent-loops#prop-retry]] 意义上的检测信号。
:::
:::
