假设你的经理要你写一个程序，把 400 场考试排进 30 个时间槽而不发生冲突，而你一周之后证明了这个问题是 $\mathsf{NP}$ 完全的。这个证明很有价值——它告诉你别再寻找对*一切*可能的输入都快的算法——但它不是撂挑子的借口。考试还得排。$\mathsf{NP}$ 难度是关于所有输入上的最坏情形、关于大输入的极限、关于精确答案的陈述。这三个限定词每一个都开出一条路：你的输入可能有特殊结构；它们可能规模够小，或相关参数够小，以致一个精心组织的指数算法就能胜任；或者，一个够好的答案就够用。

本章综述求精确解的主要技术：识别易处理的特殊情形，例如 $\mathit{2SAT}$；比穷举好得多的指数算法，用递归式分析；**固定参数可处理性**，它把指数爆炸关进一个在实践中很小的参数；现代 **SAT 求解器**背后的 DPLL 与 CDCL 算法，它们在实践中能求解含数百万变元的工业实例；以及**局部搜索**。最后一条路——放弃最优性但保证质量界——是 [[complexity/approximation-pcp]] 的主题。

我们用 $O^*(c^n)$ 记 $O(c^n \cdot p(n))$，其中 $p$ 为多项式：当指数才是要害时，多项式因子就是噪声。

## 易处理的特殊情形

一个 $\mathsf{NP}$ 完全问题往往有一些属于 $\mathsf{P}$ 的自然限制情形：树上或二分图中的 $\mathit{IS}$、最大度为 $2$ 的图上的 $\mathit{3COL}$、每个子句两个文字的 $\mathit{SAT}$。认出这样的情形通常是最省事的出路。

### 2SAT 与蕴含图

子句 $(a \lor b)$ 与两个蕴含 $\overline{a} \Rightarrow b$、$\overline{b} \Rightarrow a$ 都等价：若一个文字为假，另一个必须为真。

::: definition 蕴含图 {#def-implication-graph}
2CNF 公式 $\varphi$（关于变元 $x_1, \dots, x_n$）的**蕴含图**是以 $2n$ 个文字为顶点的有向图，且对每个子句 $(a \lor b)$ 含有边 $\overline{a} \to b$ 与 $\overline{b} \to a$。
:::

从 $u$ 到 $v$ 的一条路径意味着：在任何满足赋值中，$u$ 为真迫使 $v$ 为真（沿边逐个蕴含走过去）。这张图还有一层对称性：有边 $u \to v$ 当且仅当有边 $\overline{v} \to \overline{u}$，所以从 $u$ 到 $v$ 有路径当且仅当从 $\overline{v}$ 到 $\overline{u}$ 有路径。

::: theorem 2SAT 属于 P {#thm-2sat}
2CNF 公式 $\varphi$ 可满足当且仅当没有变元 $x$ 与 $\overline{x}$ 落在蕴含图的同一个强连通分量中。于是 $\mathit{2SAT} \in \mathsf{P}$，且满足赋值可在线性时间内求出。
:::

::: proof
*必要性。*若 $x$ 与 $\overline{x}$ 在同一个分量中，则有路径 $x \leadsto \overline{x}$ 与 $\overline{x} \leadsto x$。在满足赋值中，$x$ 为真将迫使 $\overline{x}$ 为真，而 $x$ 为假（$\overline{x}$ 为真）将迫使 $x$ 为真；两者都不可能。

*充分性。*设没有 $x$ 与 $\overline{x}$ 同分量。算出各分量与分量图的拓扑序（[[algorithms/graph-search#thm-kosaraju]]）。对每个文字 $u$，当 $u$ 的分量在该序中排在 $\overline{u}$ 的分量**之后**时置 $u$ 为真。这是一个相容的赋值：$u$、$\overline{u}$ 中恰有一个更靠后。假设某个子句 $(a \lor b)$ 为假，即 $a$ 与 $b$ 都为假：$\mathrm{comp}(a)$ 排在 $\mathrm{comp}(\overline{a})$ 之前，且 $\mathrm{comp}(b)$ 排在 $\mathrm{comp}(\overline{b})$ 之前。边 $\overline{a} \to b$ 表明拓扑序中 $\mathrm{comp}(\overline{a})$ 不在 $\mathrm{comp}(b)$ 之后，边 $\overline{b} \to a$ 表明 $\mathrm{comp}(\overline{b})$ 不在 $\mathrm{comp}(a)$ 之后。把这些串起来，用 $\preceq$ 表示"不在……之后"：
$$
\mathrm{comp}(a) \prec \mathrm{comp}(\overline{a}) \preceq \mathrm{comp}(b) \prec \mathrm{comp}(\overline{b}) \preceq \mathrm{comp}(a),
$$
矛盾。于是每个子句都为真。对 $m$ 个子句，建图并求分量耗时 $O(n + m)$。
:::

```python
import sys
sys.setrecursionlimit(10000)

def two_sat(n, clauses):
    """clauses：有符号整数对。返回一个满足赋值，或 None。"""
    node = lambda l: 2 * (abs(l) - 1) + (l < 0)          # 文字 -> 顶点 0 .. 2n-1
    G = [[] for _ in range(2 * n)]; R = [[] for _ in range(2 * n)]
    for a, b in clauses:                                  # (a v b)：~a -> b 与 ~b -> a
        for u, v in ((node(-a), node(b)), (node(-b), node(a))):
            G[u].append(v); R[v].append(u)
    order, seen = [], [False] * (2 * n)
    def dfs1(u):
        seen[u] = True
        for v in G[u]:
            if not seen[v]: dfs1(v)
        order.append(u)                                   # 结束次序
    for u in range(2 * n):
        if not seen[u]: dfs1(u)
    comp = [-1] * (2 * n)
    def dfs2(u, c):
        comp[u] = c
        for v in R[u]:
            if comp[v] < 0: dfs2(v, c)
    c = 0
    for u in reversed(order):                             # Kosaraju：按拓扑序给出各分量
        if comp[u] < 0: dfs2(u, c); c += 1
    if any(comp[2 * i] == comp[2 * i + 1] for i in range(n)):
        return None                                       # x 与 ~x 在同一分量
    return [comp[2 * i] > comp[2 * i + 1] for i in range(n)]   # x 为真 <=> 其分量更靠后

print(two_sat(3, [(1, 2), (-1, 3), (-2, -3), (2, 3)]))
print(two_sat(2, [(1, 2), (1, -2), (-1, 2), (-1, -2)]))
```

```console
$ python3 twosat.py
[True, False, True]
None
```

第二个公式排除了 $x_1, x_2$ 的全部四个赋值，而 $x_1 \to x_2 \to \overline{x_1} \to \overline{x_2} \to x_1$ 确实是一条穿过每个变元两个文字的回路。（该实现还在 3000 个随机 2CNF 公式上与穷举法对照检验过。）

::: widget graph
nodes: x1@0,2; ¬x1@4,2; x2@2,3.5; ¬x2@2,0.5; x3@6,3.5; ¬x3@6,0.5
edges: ¬x1>x2; ¬x2>x1; x1>x3; ¬x3>¬x1; x2>¬x3; x3>¬x2; ¬x2>x3; ¬x3>x2
algorithm: dfs
start: x1
caption: $(x_1 \lor x_2) \land (\overline{x_1} \lor x_3) \land (\overline{x_2} \lor \overline{x_3}) \land (x_2 \lor x_3)$ 的蕴含图。每个子句给出两条边。从 $x_1$ 逐步播放深度优先搜索：它到达 $x_3$ 与 $\overline{x_2}$，所以 $x_1$ 迫使 $x_3$ 与 $\overline{x_2}$——与程序求得的赋值 $(1, 0, 1)$ 相容。改 `start` 为 $\overline{x_1}$ 再从它出发搜索：它也到达 $x_1$，所以 $x_1$ 在任何满足赋值中都必须为真。
:::

## 精确指数算法

没有特殊结构时，指数算法仍可能实用——只要底数够小。$2^n$ 与 $1.3^n$ 的差别，就是同一时间内 $n = 40$ 与 $n = 105$ 的差别。

### 子集上的动态规划

旅行商问题的穷举要试 $(n-1)!$ 条巡回。动态规划把它降到约 $2^n$，办法是只记住一条部分巡回访问过*哪些*城市、现在身在何处，而不记访问顺序。

::: algorithm Held–Karp {#alg-held-karp}
城市 $0, \dots, n - 1$，距离 $d(i, j)$。对每个集合 $S \subseteq \{1, \dots, n-1\}$ 与每个 $j \in S$，令 $C(S, j)$ 为从 $0$ 出发、恰好访问 $S$ 中诸城市、终点为 $j$ 的最短路径的长度。

1. $C(\{j\}, j) = d(0, j)$。
2. 对 $\lvert S\rvert \ge 2$ 与 $j \in S$：$C(S, j) = \min_{i \in S \setminus \{j\}} \bigl(C(S \setminus \{j\}, i) + d(i, j)\bigr)$，按集合大小依次计算。
3. 最优巡回的长度为 $\min_{j} \bigl(C(\{1, \dots, n-1\}, j) + d(j, 0)\bigr)$。
:::

::: theorem Held–Karp 正确且运行时间为 $O(2^n n^2)$ {#thm-held-karp}
[[#alg-held-karp]] 用 $O(2^n n^2)$ 次算术运算与 $O(2^n n)$ 的内存算出最短巡回的长度。
:::

::: proof
*正确性*，对 $\lvert S\rvert$ 归纳。$\lvert S\rvert = 1$ 时唯一的路径就是边 $0 \to j$。对更大的 $S$，从 $0$ 经过 $S$ 且终于 $j$ 的最短路径有一个倒数第二个城市 $i \in S \setminus \{j\}$，而它在 $j$ 之前的部分是 $0$ 经过 $S \setminus \{j\}$ 终于 $i$ 的路径，这条路径本身必须是这类路径中最短的（否则换一条更短的即可：即 [[algorithms/dynamic-programming#def-dp]] 里那种交换论证）。递归式对 $i$ 的一切取法取最小。一条巡回就是这样一条经过所有城市的路径再接上回到 $0$ 的边，此即第 3 步。

*代价。*集合至多 $2^{n-1}$ 个，$j$ 有 $n$ 种取法，所以表项有 $O(2^n n)$ 个，每项是至多 $n$ 个值的最小值。
:::

::: example 四个城市上的 Held–Karp {#ex-held-karp}
在下面的非对称距离矩阵 $d$ 上运行 [[#alg-held-karp]]（第 $i$ 行第 $j$ 列给出 $d(i, j)$）。
$$
d = \begin{pmatrix} 0 & 2 & 9 & 10\\ 1 & 0 & 6 & 4\\ 15 & 7 & 0 & 8\\ 6 & 3 & 12 & 0\end{pmatrix}
$$
::: solution
单点集：$C(\{1\}, 1) = 2$、$C(\{2\}, 2) = 9$、$C(\{3\}, 3) = 10$。二元集：

- $C(\{1,2\}, 1) = C(\{2\}, 2) + d(2, 1) = 9 + 7 = 16$；$C(\{1,2\}, 2) = 2 + 6 = 8$；
- $C(\{1,3\}, 1) = 10 + 3 = 13$；$C(\{1,3\}, 3) = 2 + 4 = 6$；
- $C(\{2,3\}, 2) = 10 + 12 = 22$；$C(\{2,3\}, 3) = 9 + 8 = 17$。

全集：

- $C(\{1,2,3\}, 1) = \min(C(\{2,3\}, 2) + d(2,1),\ C(\{2,3\}, 3) + d(3,1)) = \min(22 + 7, 17 + 3) = 20$；
- $C(\{1,2,3\}, 2) = \min(13 + 6, 6 + 12) = 18$；
- $C(\{1,2,3\}, 3) = \min(16 + 4, 8 + 8) = 16$。

收束成巡回：$\min(20 + 1, 18 + 15, 16 + 6) = 21$，在终于城市 $1$ 时取得，而到 $1$ 的最优路径来自 $\{2, 3\}$ 中终于 $3$ 的那条，那条又来自 $\{2\}$：巡回 $0 \to 2 \to 3 \to 1 \to 0$，长度 $9 + 8 + 3 + 1 = 21$。

```python
from itertools import combinations, permutations

def held_karp(d):
    """经过城市 0..n-1、从 0 出发并回到 0 的最短巡回的长度。"""
    n = len(d)
    C = {(1 << j, j): d[0][j] for j in range(1, n)}      # C[S, j]：经集合 S 的最短 0 -> j 路径
    for size in range(2, n):
        for subset in combinations(range(1, n), size):
            S = sum(1 << j for j in subset)
            for j in subset:
                C[S, j] = min(C[S ^ (1 << j), i] + d[i][j] for i in subset if i != j)
    full = (1 << n) - 2                                   # 除 0 外的所有城市
    return min(C[full, j] + d[j][0] for j in range(1, n))

d = [[0, 2, 9, 10],
     [1, 0, 6, 4],
     [15, 7, 0, 8],
     [6, 3, 12, 0]]
brute = min(sum(d[a][b] for a, b in zip((0,) + p, p + (0,))) for p in permutations(range(1, 4)))
print(held_karp(d), brute)
```

```console
$ python3 heldkarp.py
21 21
```
:::
:::

对 $n = 30$ 个城市，穷举要检查 $29! \approx 8.8 \times 10^{30}$ 条巡回，而 Held–Karp 需要约 $2^{30} \cdot 30^2 \approx 10^{12}$ 次运算——慢，但可行。截至 2026 年，对一般 $\mathit{TSP}$ 没有人知道运行时间为 $O^*(c^n)$、常数 $c < 2$ 的算法。实践中，精确 $\mathit{TSP}$ 求解器在线性规划松弛上使用分支切割，已经求解了数万个城市的实例——这远远超出任何最坏情形界所暗示的能力。

### 分支算法

**分支算法**把一个实例分裂成若干更小的实例，它们的解合并成整个实例的解。它的运行时间是搜索树的大小，后者满足一个递归式。

::: example 在一个 3SAT 子句上分支 {#ex-branch-3sat}
分析下面这个求解 $\mathit{3SAT}$ 的算法：选一个含三个不同变元的子句 $(\ell_1 \lor \ell_2 \lor \ell_3)$，对三个公式递归：$\ell_1$ 为真的公式；$\ell_1$ 为假且 $\ell_2$ 为真的公式；$\ell_1, \ell_2$ 为假且 $\ell_3$ 为真的公式。（变短的子句用同样的方式处理，分支更少。）
::: solution
每个满足赋值恰落入三种情形之一，所以算法正确。三个分支分别固定 $1$、$2$ 和 $3$ 个变元，于是叶子数 $T(n)$ 满足 $T(n) \le T(n - 1) + T(n - 2) + T(n - 3)$。试 $T(n) = c^n$ 得 $c^3 = c^2 + c + 1$，其实根为 $c \approx 1.8393$（"三波那契常数"）。所以算法的运行时间为 $O^*(1.8393^n)$——比 $2^n$ 好，而且这个技巧可以推广：在长度为 $k$ 的子句上分支，得到的 $c$ 是 $c^k = c^{k-1} + \dots + 1$ 的根，它小于 $2$。
:::
:::

一般地，若某条分支规则总在它的 $r$ 个分支中把测度 $n$ 分别减小 $t_1, \dots, t_r$，则搜索树有 $O(c^n)$ 个叶子，其中 $c$ 是方程 $1 = \sum_i c^{-t_i}$ 的大于 $1$ 的唯一根。向量 $(t_1, \dots, t_r)$ 称为**分支向量**；减小得越多，$c$ 越小。

::: theorem 独立集的一个分支算法 {#thm-mis-branch}
$n$ 个顶点的图的最大独立集可在 $O^*(1.3803^n)$ 时间内求出。
:::

::: proof
算法 $\mathrm{MIS}(G)$：若 $G$ 有度至少 $3$ 的顶点 $v$，就返回 $\mathrm{MIS}(G - v)$（不含 $v$ 的解）与 $1 + \mathrm{MIS}(G - N[v])$（含 $v$ 的解；$N[v]$ 是 $v$ 连同其邻居，它们此后必须被排除）中较大的那个。否则每个顶点的度至多 $2$，于是 $G$ 是若干条路与若干个圈的不交并；对 $p$ 个顶点的路求 $\sum \lceil p/2\rceil$、对 $c$ 个顶点的圈求 $\sum \lfloor c/2\rfloor$ 再相加，线性时间可算。

*正确性：*每个独立集或者避开 $v$，或者含 $v$ 且不含 $v$ 的任何邻居。路与圈的公式很容易验证（隔一个取一个）。

*时间：*第一个分支去掉 $1$ 个顶点，第二个至少去掉 $4$ 个，所以 $T(n) \le T(n - 1) + T(n - 4) + O(n^2)$。试 $T(n) = c^n$ 需要 $c^4 \ge c^3 + 1$，其根为 $c \approx 1.3803$。严格地，对合适的常数 $K$ 归纳可证 $T(n) \le K c^n n^2$，因为 $c^{n-1} + c^{n-4} = c^n$。
:::

更精细的分支规则与"测度与征服"（measure and conquer）分析把最大独立集推进到 $O^*(1.2202^n)$（Fomin、Grandoni 与 Kratsch，2009），后续工作更是低于 $O^*(1.2^n)$。对 $\mathit{3SAT}$，截至 2026 年最好的已知算法是 PPSZ 算法（Paturi、Pudlák、Saks 与 Zane，2005）的随机化后代，运行时间约 $O^*(1.307^n)$（Hertli 2011；Hansen、Kaplan、Zamir 与 Zwick 2019）。

有极限吗？**指数时间假设**（ETH；Impagliazzo 与 Paturi，2001）猜想 $\mathit{3SAT}$ 不能在 $2^{o(n)}$ 时间内求解；**强 ETH** 猜想对每个 $\varepsilon > 0$ 都存在 $k$，使 $k$-SAT 不能在 $O^*((2 - \varepsilon)^n)$ 时间内求解。两者都未被证明（它们蕴含 $\mathsf{P} \ne \mathsf{NP}$），却被广泛使用：通过归约，ETH 蕴含例如 $\mathit{3COL}$ 与 $\mathit{HAMCYCLE}$ 也没有 $2^{o(n)}$ 时间的算法。

::: widget plot
f: 2^x; 1.8393^x; 1.3803^x; (4/3)^x
x: 0, 40
y: 0, 100000
labels: 2^n; 1.8393^n; 1.3803^n; (4/3)^n
caption: 指数算法的底数要紧。对赋值的穷举（$2^n$）与 3SAT 的子句分支（$1.8393^n$）在 $n = 20$ 之前就冲出了画面；独立集的分支（$1.3803^n$）与 Schöning 的随机游走（$(4/3)^n$）到 $n = 36$–$40$ 附近才达到 $10^5$。在 $n = 40$ 处，$2^n \approx 1.1 \times 10^{12}$，而 $(4/3)^n \approx 10^5$。
:::

## 固定参数可处理性

实例常常有一个远小于其规模的自然参数：我们期望的顶点覆盖的大小 $k$、颜色的种数、路网的树宽。运行时间 $2^k n$ 的算法对 $k = 30$、$n = 10^6$ 完全实用，而 $n^k$ 不实用。

::: definition 固定参数可处理 {#def-fpt}
**参数化问题**是形如 $(x, k)$ 的语言，其中 $k \in \N$ 称为**参数**。若它能被某个关于 $\lvert x\rvert$ 与 $k$ 的算法在 $f(k) \cdot \lvert x\rvert^{c}$ 时间内判定——其中 $f$ 为某可计算函数，常数 $c$ 与 $k$ 无关——则称它是**固定参数可处理的**（属于 $\mathsf{FPT}$）。
:::

::: theorem 用有界搜索树做顶点覆盖 {#thm-vc-fpt}
$n$ 个顶点、$m$ 条边的图是否有大小不超过 $k$ 的顶点覆盖，可在 $O(2^k (n + m))$ 时间内判定。
:::

::: proof
取任意一条边 $\{u, v\}$。每个顶点覆盖都含 $u$ 或 $v$。于是 $G$ 有大小 $\le k$ 的覆盖当且仅当 $G - u$ 有大小 $\le k - 1$ 的覆盖或 $G - v$ 有。递归；边恰好用完时以"是"停止，还有边但 $k = 0$ 时以"否"停止。递归树是二叉的，深度至多 $k$，故结点至多 $2^{k+1} - 1$ 个，每个结点做 $O(n + m)$ 的工作来删一个顶点、找一条边。
:::

拿参数为 $k$ 的 $\mathit{CLIQUE}$ 对比：显然算法耗时 $O(n^k k^2)$，而没有人知道 $f(k) n^c$ 形式的算法。$k$-团是参数化复杂性类 $\mathsf{W[1]}$ 的完全问题，且在 ETH 下没有 $f(k) n^{o(k)}$ 时间的算法（Chen、Huang、Kanj 与 Xia，2006）。于是这两个作为经典问题经 [[complexity/np-complete-problems#thm-clique-vc]] 互相归约的问题，参数化之后表现得截然不同——归约 $\langle G, k\rangle \mapsto \langle G, n - k\rangle$ 并没有把参数保持在小处。

### 核

第二种 FPT 技术是先把实例缩小。

::: theorem 顶点覆盖的 Buss 核 {#thm-buss}
给定 $(G, k)$，可以在多项式时间内算出答案"否"，或一个等价的实例 $(G', k')$，其中 $k' \le k$ 且边数至多 $k'^2$。
:::

::: proof
*规则：*若顶点 $v$ 的度大于 $k$，则 $v$ 属于每个大小不超过 $k$ 的顶点覆盖——否则它那 $k$ 个以上的邻居全都得进去。于是把 $(G, k)$ 换成 $(G - v, k - 1)$，并重复。当没有顶点的度大于当前的 $k'$ 时，每个顶点至多覆盖 $k'$ 条边，所以大小 $k'$ 的覆盖至多覆盖 $k'^2$ 条边；若剩下的边多于 $k'^2$ 条，回答"否"（$k'$ 变成负数时同样如此）。否则 $(G', k')$（不含孤立顶点）就是核，且每一步都保持了答案。
:::

在核上运行 [[#thm-vc-fpt]] 的搜索树，得到时间 $O(kn + 2^k k^2)$，其中指数部分与 $n$ 无关。截至 2026 年最快的已知算法运行时间为 $O(1.2738^k + kn)$（Chen、Kanj 与 Xia，2010）。

::: example 核化与分支 {#ex-vc-fpt}
在由中心为 $0$、叶子为 $1, \dots, 6$ 的星，加上路 $7 - 8 - 9 - 10$ 构成的图中，求一个大小不超过 $3$ 的顶点覆盖。有没有大小为 $2$ 的覆盖？
::: solution
$k = 3$ 时，顶点 $0$ 的度为 $6 > 3$，所以它非进不可：$k' = 2$，星的边全部消失。剩下的图是那条路，最大度 $2 \le k'$，边数 $3 \le k'^2 = 4$，这就是核。对边 $\{7, 8\}$ 分支：取 $7$ 剩下 $\{8,9\}, \{9,10\}$，预算 $1$；对 $\{8, 9\}$ 分支，取 $8$ 剩下 $\{9, 10\}$，预算 $0$（失败），取 $9$ 什么都不剩（成功）。覆盖：$\{0, 7, 9\}$。$k = 2$ 时顶点 $0$ 又被强制，$k' = 1$；路有 $3 > 1^2$ 条边，于是无需任何分支，答案就是"否"。

```python
def vc_branch(edges, k):
    """返回大小 <= k 的顶点覆盖（集合形式），或 None。有界搜索树。"""
    if not edges:
        return set()
    if k == 0:
        return None
    u, v = edges[0]                                   # 这条边的某个端点在覆盖中
    for w in (u, v):
        rest = [e for e in edges if w not in e]
        sub = vc_branch(rest, k - 1)
        if sub is not None:
            return sub | {w}
    return None

def buss_kernel(edges, k):
    """Buss 规则：度 > k 的顶点必在任何大小 <= k 的覆盖中。"""
    forced = set()
    while True:
        deg = {}
        for e in edges:
            for w in e: deg[w] = deg.get(w, 0) + 1
        high = [w for w, dw in deg.items() if dw > k - len(forced)]
        if not high: break
        forced.add(high[0]); edges = [e for e in edges if high[0] not in e]
    if len(forced) > k or len(edges) > (k - len(forced)) ** 2:
        return None                                   # 不存在大小 <= k 的覆盖
    return edges, k - len(forced), forced

def vertex_cover(edges, k):
    ker = buss_kernel(edges, k)
    if ker is None: return None
    rest, k2, forced = ker
    sub = vc_branch(rest, k2)
    return None if sub is None else forced | sub

# 中心 0、叶子 1..6 的星，加一条路 7-8-9-10
E = [(0, i) for i in range(1, 7)] + [(7, 8), (8, 9), (9, 10)]
print(buss_kernel(E, 3), vertex_cover(E, 3), vertex_cover(E, 2))
```

```console
$ python3 vc.py
([(7, 8), (8, 9), (9, 10)], 2, {0}) {0, 9, 7} None
```

（集合 $\{0, 7, 9\}$ 以什么顺序打印由 Python 自己决定。）
:::
:::

其他参数带来其他 FPT 结果。许多在一般图上 $\mathsf{NP}$ 难的问题——包括独立集、三色问题与哈密顿回路——在**树宽**为 $w$ 的图上都能在 $f(w) \cdot n$ 时间内求解：这类图可以分解成沿至多 $w + 1$ 个顶点粘合的小块，在分解上作动态规划即可；Courcelle 定理（1990）对每个可用单子二阶逻辑表达的性质都给出这样的算法。树的树宽为 $1$，而 [[#ex-tree-mis]] 是这一思想的最简单实例。

::: quiz
下列哪些运行时间说明一个参数化问题是固定参数可处理的？
- [x] $O(2^k \cdot n^3)$
- [ ] $O(n^k)$
- [x] $O(k^{k} + n^2)$
- [ ] $O(n^{\log k})$
::: solution
$\mathsf{FPT}$ 要求 $f(k) \cdot n^c$ 且 $c$ 与 $k$ 无关。$2^k n^3$ 与 $k^k + n^2 \le (k^k + 1) n^2$ 都合格，无论 $f$ 增长多快。$n^k$ 与 $n^{\log k}$ 把参数放在 $n$ 的指数上，多项式的次数随 $k$ 增长；这样的算法把问题放在类 $\mathsf{XP}$ 里，而不是 $\mathsf{FPT}$。
:::
:::

## SAT 求解器

库克–列文说每个 $\mathsf{NP}$ 问题都归约到 $\mathit{SAT}$。实践把这倒过来：不为每个问题写巧妙算法，而是把问题编码成 CNF，交给通用求解器。硬件与软件验证、规划、调度、密码分析与组合学都已把它当作常规做法。

::: algorithm DPLL {#alg-dpll}
$\mathrm{DPLL}(\varphi)$，输入为 CNF 公式 $\varphi$：

1. **单元传播**：只要 $\varphi$ 有一个只含一个文字 $\ell$ 的子句，就置 $\ell$ 为真（删去含 $\ell$ 的子句，并从其余子句中删去 $\overline{\ell}$）。
2. 若 $\varphi$ 含空子句，返回"不可满足"；若已没有子句，返回"可满足"。
3. 选一个文字 $\ell$（一次**决策**）。若 $\mathrm{DPLL}(\varphi \text{ 置 } \ell \text{ 为真})$ 可满足就返回它，否则返回 $\mathrm{DPLL}(\varphi \text{ 置 } \ell \text{ 为假})$。
:::

DPLL 的正确性与穷举同一个理由——第 3 步两种取值都试——而单元传播只做出被迫的选择。它的威力来自传播：一次决策常常固定许多变元。现代的**冲突驱动子句学习**（CDCL）求解器加入三个想法。当传播产生空子句时，它们分析*原因*，导出一个排除冲突成因的新子句（它是 $\varphi$ 由归结推出的推论），把它加入公式，并**跳跃回溯**到该负责的那次决策，而不只是上一次。它们按近期冲突中的活跃度选择决策变元（VSIDS 启发式），并周期性地**重启**而保留学到的子句。惰性数据结构（"两个被监视文字"）使传播廉价。

*观察（截至 2026 年）：*CDCL 求解器能例行判定来自硬件验证与规划的、含数百万变元与子句的工业公式，每年的 SAT 竞赛追踪它们的进展。这是关于实际出现的实例的经验事实，不是定理：同一些求解器会在某些只有几百个变元的公式上失败。

::: theorem Haken 下界 {#thm-haken}
鸽巢公式 $\mathit{PHP}_n$——它说 $n + 1$ 只鸽子要进 $n$ 个洞且没有两只同洞——的每个归结反驳的大小都是 $2^{\Omega(n)}$（Haken，1985）。
:::

我们不证明它。这里要紧的是它的推论：DPLL 或 CDCL 求解器在不可满足公式上的运行可以转化为一个大小关于其运行时间多项式的归结反驳，所以在 $\mathit{PHP}_n$ 上每个这样的求解器都要花指数时间——尽管该公式只有 $O(n^3)$ 个文字，且其不可满足性对一个会数数的人来说一目了然。

::: example 在鸽巢公式上运行 DPLL {#ex-dpll-php}
实现 [[#alg-dpll]]，并数它在 $n = 2, \dots, 7$ 的 $\mathit{PHP}_n$ 上做出多少次决策。
::: solution
变元 $p_{i,h}$ 表示鸽子 $i$ 进洞 $h$。子句为：每只鸽子一个 $(p_{i,1} \lor \cdots \lor p_{i,n})$（它总要进某个洞），每个洞与每对鸽子一个 $(\overline{p_{i,h}} \lor \overline{p_{j,h}})$（不许共洞）：长度为 $n$ 的子句 $n + 1$ 个，长度为 $2$ 的子句 $n\binom{n+1}{2}$ 个。

```python
def simplify(clauses, lit):
    """置 lit 为真：删去被满足的子句，并删去相反的文字。"""
    return [[l for l in c if l != -lit] for c in clauses if lit not in c]

def dpll(clauses, stats):
    """返回一个满足这些子句的真文字列表，或 None。"""
    trail = []
    while True:                                       # 单元传播
        if any(len(c) == 0 for c in clauses):
            return None                               # 冲突：出现空子句
        unit = next((c[0] for c in clauses if len(c) == 1), None)
        if unit is None: break
        trail.append(unit); clauses = simplify(clauses, unit)
    if not clauses:
        return trail
    lit = clauses[0][0]                               # 在第一个子句的某个文字上分支
    for choice in (lit, -lit):
        stats["decisions"] += 1
        result = dpll(simplify(clauses, choice), stats)
        if result is not None:
            return trail + [choice] + result
    return None

def pigeonhole(n):
    """n + 1 只鸽子进 n 个洞；变元 p*n + h + 1 表示鸽子 p 进洞 h。"""
    x = lambda p, h: p * n + h + 1
    every_pigeon = [[x(p, h) for h in range(n)] for p in range(n + 1)]
    no_sharing = [[-x(p, h), -x(q, h)] for h in range(n)
                  for p in range(n + 1) for q in range(p + 1, n + 1)]
    return every_pigeon + no_sharing

for n in range(2, 8):
    stats = {"decisions": 0}
    print(n, dpll(pigeonhole(n), stats), stats["decisions"])
```

```console
$ python3 dpll.py
2 None 2
3 None 10
4 None 46
5 None 238
6 None 1438
7 None 10078
```

每个公式都（正确地）不可满足，且决策数每多一个洞就乘以大约 $5$ 到 $7$，乘数本身还在增大——搜索本质上在尝试安置鸽子的所有方式。（同一程序在 2000 个随机极小公式上与穷举法对照检验过。）带子句学习的求解器在小情形上好得多，但由 [[#thm-haken]]，它也是指数的。
:::
:::

::: warning NP 完全不等于"没救了"，SAT 求解器也不等于"容易"
两个相反方向的错误都很常见。一个是问题一被证明 $\mathsf{NP}$ 完全就撂挑子，尽管实际遇到的实例可能很小、有结构、或有一个小参数，SAT 求解器或整数规划求解器可能几秒钟就处理好。另一个是相信求解器已使 $\mathsf{NP}$ 完全性不再相干：它们的成功是经验的、依赖实例的，而有些很短的公式（鸽巢原理、接近每变元约 $4.27$ 个子句这一可满足性阈值的随机 3CNF 公式、编码大数分解之困难的公式）是它们无力承受的。在贴近现实的实例上度量，并留一条退路——一个时限和一个近似答案。
:::

## 局部搜索

局部搜索从某个候选解出发，反复做出使它改进的小改动。对可满足性，候选是一个赋值，改动是翻转一个变元。

::: algorithm 求解可满足性的随机游走 {#alg-random-walk}
从任意赋值出发。重复至多 $t$ 次：若每个子句都已满足，停止并输出该赋值；否则任取一个未满足的子句，并在其文字对应的变元中均匀随机选一个翻转。若始终没找到满足赋值，回答"很可能不可满足"。
:::

::: theorem 随机游走求解 2SAT {#thm-random-walk-2sat}
对 $n$ 个变元的可满足 2CNF 公式，[[#alg-random-walk]] 取 $t = 2n^2$ 能以至少 $1/2$ 的概率找到满足赋值（Papadimitriou，1991）。
:::

::: proof
固定一个满足赋值 $A^*$，设 $X$ 为当前赋值与 $A^*$ 取值相同的变元数。算法最迟在 $X = n$ 时停止。当它翻转未满足子句 $(a \lor b)$ 的一个变元时，当前赋值使 $a$ 与 $b$ 都假，而 $A^*$ 使至少一个为真，所以这两个变元中至少一个与 $A^*$ 的取值不同。被翻转的变元各以概率 $1/2$ 选中，于是 $X$ 至少以概率 $1/2$ 增加 $1$，否则减少 $1$。

把它与 $\{0, 1, \dots, n\}$ 上的公平随机游走比较：该游走以各 $1/2$ 的概率上移或下移（在 $0$ 处必上移）。令 $h_j$ 为它从 $j$ 到达 $n$ 的期望时间。则 $h_n = 0$、$h_0 = 1 + h_1$，且对 $0 < j < n$ 有 $h_j = 1 + \frac12 h_{j-1} + \frac12 h_{j+1}$。函数 $h_j = n^2 - j^2$ 满足这些方程（$h_0 = n^2 = 1 + (n^2 - 1)$，且 $\frac12((n^2 - (j-1)^2) + (n^2 - (j+1)^2)) = n^2 - j^2 - 1$），而解唯一，故 $h_j \le n^2$。由于我们的游走至少以概率 $1/2$ 上移，它可以与公平游走耦合，使其总不低于后者，于是它到达 $n$ 的期望时间至多 $n^2$。由马尔可夫不等式（[[algorithms/randomised-algorithms#thm-markov]]），步数超过 $2n^2$ 的概率至多 $1/2$。
:::

用独立的硬币把游走重复 $r$ 次，可把失败概率降到 $2^{-r}$。对 $\mathit{3SAT}$，同样的论证给出一个只有 $1/3$ 的概率走对方向的游走，于是需要重启：**Schöning 算法**（1999）从均匀随机赋值重启，走 $3n$ 步；每次重启至多以约 $(3/4)^n$（差一个多项式因子）成功，从而在可满足的 3CNF 公式上给出期望时间 $O^*((4/3)^n)$。（在不可满足公式上它永远找不到赋值，所以重启足够多次之后它会回答"不可满足"，出错的概率很小——这正是 [[complexity/randomised-complexity]] 中研究的那类单侧错误。）WalkSAT 等实用局部搜索求解器把随机翻转与满足最多子句的贪心翻转混合使用；相关的元启发式——模拟退火、禁忌搜索、遗传算法——没有保证，只能凭实验评判。

::: history
Davis–Putnam 程序（Martin Davis 与 Hilary Putnam，1960）用归结消去变元；Davis、George Logemann 与 Donald Loveland 在 1962 年用分支取代消去，得到 DPLL。Michael Held 与 Richard Karp（以及独立工作的 Richard Bellman）在 1962 年发表了求解 $\mathit{TSP}$ 的 $O(2^n n^2)$ 动态规划。Bengt Aspvall、Michael Plass 与 Robert Tarjan 在 1979 年给出借助强连通分量的线性时间 2SAT 算法。子句学习随 GRASP（João Marques-Silva 与 Karem Sakallah，1996）进入 SAT 求解，Chaff（Moskewicz、Madigan、Zhao、Zhang 与 Malik，2001）引入被监视文字与 VSIDS 启发式。Armin Haken 在 1985 年证明了鸽巢原理归结证明的指数下界。参数化复杂性由 Rodney Downey 与 Michael Fellows 自 1992 年起的一系列论文及其 1999 年的专著奠基；Sam Buss 的顶点覆盖核记载于 Buss 与 Goldsmith 1993 年的一篇论文。Uwe Schöning 的随机游走算法发表于 1999 年，Russell Impagliazzo 与 Ramamohan Paturi 在 2001 年提出了指数时间假设。
:::

## 后续内容

当这些工具都够不着精确解时，我们可以要求*可证明地*接近最优的解：[[complexity/approximation-pcp]] 给出顶点覆盖的 $2$ 倍近似与集合覆盖的 $\ln n$ 近似，并说明某些问题连近似都是 $\mathsf{NP}$ 难的。上面的随机游走是带单侧错误的随机算法，[[complexity/randomised-complexity]] 把它们整理成复杂性类。向 SAT 与整数规划的编码在验证与规划中再次出现（[[software-engineering]]、[[artificial-intelligence]]）。

::: summary
- $\mathsf{NP}$ 难度关乎所有输入上的最坏情形；特殊结构、小参数、小规模与近似答案都是出路。
- **2SAT** 属于 $\mathsf{P}$：不可满足当且仅当某个 $x$ 与 $\overline{x}$ 在蕴含图的同一个强连通分量中（[[#thm-2sat]]）。
- **精确指数算法**：子集上的动态规划以 $O(2^n n^2)$ 解 $\mathit{TSP}$（[[#thm-held-karp]]）；分支算法用 $T(n) \le T(n-1) + T(n-4)$ 一类的递归式分析，独立集得到 $O^*(1.3803^n)$（[[#thm-mis-branch]]）。ETH 猜想 $\mathit{3SAT}$ 需要 $2^{\Omega(n)}$ 时间。
- **FPT**：时间 $f(k) \cdot n^c$（[[#def-fpt]]）；顶点覆盖以有界搜索树在 $O(2^k(n + m))$ 内求解（[[#thm-vc-fpt]]），并有 $k^2$ 条边的核（[[#thm-buss]]）；$k$-团被认为不是 FPT。
- **SAT 求解器**（DPLL，[[#alg-dpll]]，以及 CDCL）能求解许多巨大的实际公式，但基于归结的求解器在鸽巢公式上需要指数时间（[[#thm-haken]]）。
- **局部搜索**：随机游走以期望 $O(n^2)$ 次翻转求解 2SAT（[[#thm-random-walk-2sat]]）；Schöning 的重启对 3SAT 给出 $O^*((4/3)^n)$。
:::

## 习题

::: exercise 斐波那契分支数 {level=1 check="(1+sqrt(5))/2"}
一个求解顶点覆盖的分支算法选一个度至少 $2$ 的顶点 $v$ 并分支：或者 $v$ 在覆盖中（$k$ 减 $1$），或者它的所有邻居都在（$k$ 至少减 $2$）。由此得到的叶子数 $O^*(c^k)$ 界的底数 $c$ 是多少？（精确填写 $c$，或保留四位小数。）
::: solution
$T(k) \le T(k-1) + T(k-2)$，于是 $c^2 = c + 1$，$c = (1 + \sqrt5)/2 \approx 1.6180$，黄金分割比。这条规则正确，因为不含 $v$ 的覆盖必须含 $v$ 的每个邻居。当每个顶点的度至多 $1$ 时图是一个匹配，最小覆盖对每条边恰取一个端点，无需分支——这改进了 [[#thm-vc-fpt]] 的 $2^k$。
:::
:::

::: exercise Held–Karp 表的大小 {level=1 check="2304"}
对 $n = 10$ 个城市，[[#alg-held-karp]] 计算多少个条目 $C(S, j)$（其中 $S \subseteq \{1, \dots, 9\}$ 非空且 $j \in S$）？（填写数字。）
::: solution
$\{1, \dots, 9\}$ 的每个城市 $j$ 属于 $2^8 = 256$ 个子集，所以满足 $j \in S$ 的对 $(S, j)$ 有 $9 \cdot 256 = 2304$ 个。（等价地，$\sum_{s=1}^{9} s\binom{9}{s} = 9 \cdot 2^8$。）
:::
:::

::: exercise 手工做一个 2SAT 实例 {level=1}
画出 $(x_1 \lor x_2) \land (\overline{x_1} \lor x_2) \land (x_1 \lor \overline{x_2}) \land (\overline{x_2} \lor x_3)$ 的蕴含图，并判定它是否可满足。若可满足，读出一个赋值。
::: solution
边：$(x_1 \lor x_2)$：$\overline{x_1} \to x_2$、$\overline{x_2} \to x_1$。$(\overline{x_1} \lor x_2)$：$x_1 \to x_2$、$\overline{x_2} \to \overline{x_1}$。$(x_1 \lor \overline{x_2})$：$\overline{x_1} \to \overline{x_2}$、$x_2 \to x_1$。$(\overline{x_2} \lor x_3)$：$x_2 \to x_3$、$\overline{x_3} \to \overline{x_2}$。现在有 $\overline{x_1} \to x_2 \to x_1$ 与 $x_1 \to x_2$，所以 $x_1$ 与 $x_2$ 在同一个分量；$\overline{x_1} \to \overline{x_2} \to \overline{x_1}$ 构成另一个分量。没有 $x_i$ 与 $\overline{x_i}$ 同分量，故公式可满足。由 $\overline{x_1} \leadsto x_1$，$x_1$ 的分量更靠后，所以 $x_1 = x_2 = 1$；于是 $x_2 \to x_3$ 迫使 $x_3 = 1$。检验：赋值 $(1, 1, 1)$ 下四个子句全真。
:::
:::

::: exercise 搜索树的大小 {level=2 check="2047"}
[[#thm-vc-fpt]] 的递归树在 $k = 10$ 时至多有多少个结点？（填写数字。）
::: solution
深度至多 $k$ 的二叉树至多有 $1 + 2 + \dots + 2^k = 2^{k+1} - 1$ 个结点；$k = 10$ 时是 $2047$。每个结点耗 $O(n + m)$，所以总数为 $O(2^k(n + m))$。
:::
:::

::: exercise 树上的独立集 {#ex-tree-mis level=2}
给出树上最大独立集的线性时间算法，证明其正确，并实现它。
::: solution
把树定根。对每个顶点 $v$，令 $\mathrm{in}(v)$ 为 $v$ 的子树中含 $v$ 的最大独立集的大小，$\mathrm{out}(v)$ 为不含 $v$ 的最大独立集的大小。若 $v$ 入选，它的孩子都不入选；若 $v$ 不入选，每个孩子可独立地在或不在：
$$
\mathrm{in}(v) = 1 + \sum_{c} \mathrm{out}(c), \qquad \mathrm{out}(v) = \sum_{c} \max(\mathrm{in}(c), \mathrm{out}(c)).
$$
正确性由对高度的归纳得出，因为不同孩子的子树不共享顶点也不共享边，各选择可以自由合并。答案就是根 $r$ 处的 $\max(\mathrm{in}(r), \mathrm{out}(r))$；每个顶点只处理一次。

```python
def tree_mis(children, root):
    def go(v):
        inc, exc = 1, 0
        for c in children.get(v, []):
            ci, co = go(c)
            inc += co; exc += max(ci, co)
        return inc, exc
    return max(go(root))

# 以 1 为根的路 1-2-3-4-5，3 之下再挂叶子 6、7
print(tree_mis({1: [2], 2: [3], 3: [4, 6, 7], 4: [5]}, 1))
```

```console
$ python3 treemis.py
4
```

例如 $\{1, 5, 6, 7\}$——或 $\{2, 4, 6, 7\}$——是独立集，而任意五个顶点都不独立。
:::
:::

::: exercise 把染色编码成 SAT {level=2}
写出一个 CNF 公式，使其可满足当且仅当图 $G = (V, E)$ 可 $k$-染色，数出它的子句，并用 [[#ex-dpll-php]] 的 DPLL 代码证明 5-圈需要三种颜色。
::: solution
变元 $c_{v,i}$（"$v$ 有颜色 $i$"）。子句：每个顶点一个 $(c_{v,1} \lor \cdots \lor c_{v,k})$；每条边每种颜色一个 $(\overline{c_{u,i}} \lor \overline{c_{v,i}})$。（"至多一种颜色"的子句不必要：从一个某顶点带多种颜色的解中保留任意一种即可。）子句共 $\lvert V\rvert + k\lvert E\rvert$ 个。

```python
from dpll import dpll                       # 上一题的函数

def colouring_cnf(n, edges, k):
    x = lambda v, i: v * k + i + 1
    return ([[x(v, i) for i in range(k)] for v in range(n)] +
            [[-x(u, i), -x(v, i)] for u, v in edges for i in range(k)])

C5 = [(i, (i + 1) % 5) for i in range(5)]
for k in (2, 3):
    model = dpll(colouring_cnf(5, C5, k), {"decisions": 0})
    print(k, None if model is None else sorted(l for l in model if l > 0))
```

```console
$ python3 colour_sat.py
2 None
3 [1, 5, 7, 11, 15]
```

$k = 3$ 时，变元 $3v + i + 1$ 表示顶点 $v$ 有颜色 $i$：$1 \mapsto (0, 0)$、$5 \mapsto (1, 1)$、$7 \mapsto (2, 0)$、$11 \mapsto (3, 1)$、$15 \mapsto (4, 2)$。于是沿圈的颜色是 $0, 1, 0, 1, 2$，而顶点 $4$ 与 $3$（颜色 $1$）和 $0$（颜色 $0$）都相邻，需要第三种颜色：这是一个正常 3-染色。两种颜色时，奇圈不可染色，符合预期。（要运行这段代码，把 `simplify`、`dpll` 与 `pigeonhole` 的定义留在 `dpll.py` 中，并用 `if __name__ == "__main__":` 守住其中的测试循环。）
:::
:::

::: exercise 证明分支界 {level=3}
严格证明 [[#thm-mis-branch]] 的递归做出 $O(c^n)$ 次调用，其中 $c \approx 1.3803$ 是 $c^4 = c^3 + 1$ 的实根。然后说明：用度 $\ge 4$ 的顶点分支（并假设存在最大度 $3$ 图上的多项式算法）将得到 $c^5 = c^4 + 1$ 对应的界，并算出那个根。为什么这个改进不会白来？
::: solution
设 $L(n)$ 为顶点数至多 $n$ 的图上递归树的树叶数的最大值。顶点数至多 $3$ 的图最大度至多 $2$，所以它就是树叶：$n \le 3$ 时 $L(n) = 1$。对 $n \ge 4$，一次调用或者是树叶，或分支到顶点数至多 $n - 1$ 与至多 $n - 4$ 的图，所以 $L(n) \le \max(1, L(n - 1) + L(n - 4))$。断言：对所有 $n \ge 0$ 有 $L(n) \le c^{n}$，其中 $c^4 = c^3 + 1$。$n \le 3$ 时 $L(n) = 1 \le c^n$。归纳地，$L(n) \le c^{n-1} + c^{n-4} = c^{n-4}(c^3 + 1) = c^{n-4}c^4 = c^n$。二叉树的内部结点少于树叶，所以调用有 $O(c^n)$ 次，每次耗多项式时间。求根：$c^4 - c^3 - 1 = 0$ 的根 $c \approx 1.3803$（二分法：$1.38^4 - 1.38^3 - 1 \approx -0.0013$，$1.381^4 - 1.381^3 - 1 \approx 0.003$）。

若用度 $\ge 4$ 的顶点，第二个分支至少去掉 $5$ 个顶点：$c^5 = c^4 + 1$，$c \approx 1.3247$。但最大独立集在最大度 $3$ 的图上就已经 $\mathsf{NP}$ 难（Garey、Johnson 与 Stockmeyer，1976），所以除非 $\mathsf{P} = \mathsf{NP}$ 不存在多项式的归纳基础；在度为 $3$ 的图上也必须分支，还要更精细的分析——这正是文献中那些改进算法所做的事。
:::
:::

::: exercise 3SAT 的随机游走 {level=3}
解释 [[#thm-random-walk-2sat]] 的证明为何对 3CNF 公式失效，并证明：从距离 $j$（当前赋值与 $A^*$ 取值不同的变元数）出发，连续 $j$ 次翻转全部走对的概率至少 $3^{-j}$。再利用均匀随机起始赋值落在距离 $j$ 的概率是 $\binom{n}{j}2^{-n}$，证明单个随机起点加上 $n$ 次翻转能以至少 $(2/3)^n$ 的概率找到满足赋值，并由此得出 $O^*(1.5^n)$ 的期望运行时间。（Schöning 更精细的分析允许一些错误步，得到 $(4/3)^n$。）
::: solution
在未满足的 3-子句中，$A^*$ 使三个文字中至少一个为真，所以随机翻转只有至少 $1/3$ 的概率朝 $A^*$ 移动，游走会漂离：期望到达时间是指数的，$n^2$ 界失效。从距离 $j$ 出发，连续 $j$ 次翻转每次都至少以概率 $1/3$ 更接近，且相互独立，所以 $j$ 次全部成功的概率至少 $3^{-j}$（此后赋值即为 $A^*$，或游走更早已在另一个满足赋值处停止）。对随机起点取平均，
$$
\Prob[\text{成功}] \ge \sum_{j=0}^{n} \binom{n}{j} 2^{-n} 3^{-j} = 2^{-n}\left(1 + \tfrac13\right)^n = \left(\tfrac{2}{3}\right)^n.
$$
独立重复，成功前重启次数的期望至多 $(3/2)^n$，每次耗 $O(n \cdot \lvert\varphi\rvert)$：期望时间 $O^*(1.5^n)$，已经好于 $2^n$。
:::
:::
