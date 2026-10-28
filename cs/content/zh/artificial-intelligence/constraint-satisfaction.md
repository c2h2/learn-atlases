给地图着色使相邻区域颜色不同。在棋盘上放八个皇后使任意两个互不攻击。填一个数独。为大学考试排时间表使没有学生同一时刻有两场考试，或者安排工厂的工件使每台机器同一时刻只做一件事且每个期限都被满足。在这些难题中，解不是一个*动作序列*而是一个*赋值*：一组变量中的每个变量取一个值，并满足变量之间的约束。把这样的问题当作普通搜索问题（[[artificial-intelligence/search]]）来处理，就把它的结构丢掉了——搜索不会知道，一旦两个相邻区域染上了同一种颜色，对其他区域做什么都无法挽回这个错误。

**约束满足问题**（CSP）把这种结构暴露出来。状态被*因子化*为变量，目标测试是关于少数几个变量的小组的约束的合取，通用算法可以利用约束在搜索开始之前先剪掉搜索空间。本章展开三个主要思想。**回溯搜索**一次给一个变量赋值，撤销违反约束的赋值；好的**变量与取值排序**启发式能使它大幅缩小。**约束传播**删去不可能是任何解的一部分的取值；我们证明经典算法 AC-3 正确地做到这一点、运行时间为 $O(cd^3)$，并且在树结构的问题上，仅靠传播就能在线性时间内得到解。最后，**局部搜索**——最小冲突、爬山法与模拟退火——一步一步地修补一个完整但有缺陷的赋值，结果它能在几秒内求解百万皇后问题。

## 约束满足问题

::: definition 约束满足问题 {#def-csp}
一个**约束满足问题**由以下部分构成：一个有限的**变量**集 $X_1, \dots, X_n$；每个变量一个有限的**域** $D_i$（可能取值的集合）；以及一组**约束**。每个约束有一个**作用域**，即一个变量组 $(X_{i_1}, \dots, X_{i_k})$，以及一个**关系** $R \subseteq D_{i_1} \times \dots \times D_{i_k}$，列出允许的取值组合。**赋值**给某些变量指定值；若它不违反任何一个作用域已被它完全指定的约束，则称它**相容**；若它指定了每个变量，则称它**完整**。**解**是一个完整且相容的赋值。
:::

含一个变量的约束称为**单元约束**（unary），含两个的称为**二元约束**；任何 CSP 都能转化为只含二元约束的 CSP（通过引入辅助变量），所以算法通常按二元 CSP 来描述。二元 CSP 有一张**约束图**：每个变量一个顶点，两个变量共享约束时之间连一条边。用 $n$ 表示变量个数，$d$ 表示最大的域大小，$c$ 表示二元约束的个数。

判定一个 CSP 是否有解是 $\mathsf{NP}$ 完全的，即使约束全是二元的、域的大小都是 $3$——图的 $3$ 着色就是特例（[[complexity/np-complete-problems#thm-3col]]）——所以我们不能指望最坏情况下也快的算法。但最坏情况很少是典型情况，本章的算法通常能解含数千个变量的 CSP。

::: example 三种 CSP 形式化 {#ex-csp-formulations}
把下列问题形式化为 CSP：(a) 用三种颜色给澳大利亚大陆与塔斯马尼亚的地图着色；(b) $n$ 皇后问题；(c) 一个数独。
::: solution
(a) 变量 $\mathit{WA}, \mathit{NT}, \mathit{SA}, \mathit{Q}, \mathit{NSW}, \mathit{V}, \mathit{T}$（各州与领地）；每个域都是 $\{\text{红}, \text{绿}, \text{蓝}\}$；每对共享边界的区域之间一条二元约束 $X \ne Y$：$\mathit{WA}$–$\mathit{NT}$、$\mathit{WA}$–$\mathit{SA}$、$\mathit{NT}$–$\mathit{SA}$、$\mathit{NT}$–$\mathit{Q}$、$\mathit{SA}$–$\mathit{Q}$、$\mathit{SA}$–$\mathit{NSW}$、$\mathit{SA}$–$\mathit{V}$、$\mathit{Q}$–$\mathit{NSW}$、$\mathit{NSW}$–$\mathit{V}$。塔斯马尼亚（$\mathit{T}$）与任何区域都不相邻。完整赋值共有 $3^7 = 2187$ 个。

(b) 每一列 $j = 1, \dots, n$ 一个变量 $Q_j$，其值是该列中皇后所在的行（于是按构造没有两个皇后同列）；域为 $\{1, \dots, n\}$；对每一对 $j < k$ 有约束 $Q_j \ne Q_k$ 且 $\lvert Q_j - Q_k\rvert \ne k - j$（不同行、不同对角线）。选择这种形式化而不是"每个方格一个布尔变量"，对 $n = 8$ 已经把空间从 $2^{64}$ 降到 $8^8 \approx 1.7 \times 10^7$。

(c) $81$ 个变量，每格一个，域为 $\{1, \dots, 9\}$（已给出的格是单元素域），以及 $27$ 个**全局约束** $\mathrm{AllDiff}$，每行、每列、每宫各一个，每个都等价于 $\binom92 = 36$ 个二元 $\ne$ 约束。
:::
:::

::: widget graph
nodes: WA@0,1; NT@1,2; SA@1.4,0.9; Q@2.4,2; NSW@2.6,0.9; V@2,0; T@2.6,-0.8
edges: WA-NT; WA-SA; NT-SA; NT-Q; SA-Q; SA-NSW; SA-V; Q-NSW; NSW-V
algorithm: colour
caption: 澳大利亚地图着色 CSP 的约束图，按贪心方式着色。一步步演示：每个顶点取它的已着色邻顶点没有用过的第一种颜色。三种颜色就够了；与五个区域相邻的南澳大利亚（$\mathit{SA}$）约束最紧。塔斯马尼亚是一个独立的连通分量——一个可以单独求解的独立子问题。拖动顶点观察结构；试着删去边 $\mathit{SA}$–$\mathit{V}$，预测着色是否会改变。
:::

约束可以是**硬**的（必须成立）或**软**的（偏好，违反它们要付出代价）；排班问题通常两者兼有。含软约束的 CSP 是**约束优化**问题，用下述方法的分支定界版本或整数规划来求解。我们只考虑硬约束。

## 回溯搜索

CSP 可以用搜索来求解：状态是部分赋值，动作是给一个未赋值的变量指定一个值，目标是完整相容的赋值。两个观察使它高效。第一，赋值是**可交换的**：变量被指定的先后次序无关紧要，所以我们在每个结点可以固定一个变量来分支，得到一棵有 $d^n$ 个叶子的树，而不是 $n!\,d^n$ 棵叶子的树。第二，不相容的部分赋值绝不可能扩展为解，所以搜索一旦违反约束就可以回退。

::: algorithm 回溯搜索 {#alg-backtracking}
```text
BACKTRACK(assignment, csp)
1  if assignment is complete: return assignment
2  X ← SELECT-UNASSIGNED-VARIABLE(csp, assignment)
3  for each value v in ORDER-DOMAIN-VALUES(X, assignment, csp)
4      if v is consistent with assignment
5          add X = v to assignment
6          inferences ← INFERENCE(csp, X, v)       ▷ 例如前瞻检查或 AC-3
7          if inferences ≠ failure
8              add inferences to the CSP (shrink domains)
9              result ← BACKTRACK(assignment, csp)
10             if result ≠ failure: return result
11         remove X = v and the inferences
12 return failure
```
初始调用是 $\mathrm{BACKTRACK}(\emptyset, \mathit{csp})$。
:::

回溯是对相容部分赋值之树的深度优先搜索，这棵树是有限的（深度 $n$，分支至多 $d$），所以它是**完备的**：只要推理步骤只删去不属于任何"扩展当前赋值的解"的取值，它就在一有解时返回一个解，否则返回失败。它的效率取决于三个选择。

**下一步选哪个变量？** **最小剩余值**（MRV）启发式选取剩余合法取值最少的变量——"最受约束"或"先失败"的选择。若某个变量没有合法取值，MRV 立刻选中它，搜索随即回溯，而不是在许多层之后才发现死胡同。平局由**度启发式**打破：优先选与未赋值变量之间的约束最多的那个变量（地图中的 $\mathit{SA}$）。

**先试哪个值？** **最少约束值**启发式偏好为相邻变量排除选择最少的那个值——对取值而言的"后失败"。这种不对称是有意为之：每个变量终究要被赋值，所以我们希望尽早发现失败；但只有一个取值需要成功，所以我们先试最有希望的。（若我们想要*所有*解，取值次序就无关紧要了。）

**什么推理？** **前瞻检查**（forward checking）：指定 $X = v$ 之后，从每个未赋值的邻变量 $Y$ 的域中删去与 $X = v$ 不相容的每个取值；若某个域变空，立即失败。它使 MRV 行之有效，因为域的大小始终保持最新。更强的推理——维持弧相容性，见下文——能更早地发现更多失败。

::: example $n$ 皇后上的排序启发式 {#ex-queens-backtracking}
数一数回溯在找到 $n$ 皇后问题的第一个解之前尝试的赋值个数：一次按列从左到右、行从小到大尝试（朴素方式），一次用 MRV 加前瞻检查。
::: solution
```python
def attacks(c1, r1, c2, r2):
    return r1 == r2 or abs(r1 - r2) == abs(c1 - c2)

def backtrack(n, mrv_fc):
    """返回 (解, 尝试的赋值个数)。变量是列，值是行。"""
    domains = {c: list(range(n)) for c in range(n)}
    assignment = {}; count = 0
    def search():
        nonlocal count
        if len(assignment) == n: return True
        if mrv_fc:   # 最小剩余值，平局按列下标打破
            col = min((c for c in range(n) if c not in assignment), key=lambda c: len(domains[c]))
        else:
            col = len(assignment)
        for row in domains[col]:
            if not mrv_fc and any(attacks(col, row, c, r) for c, r in assignment.items()):
                continue
            count += 1; assignment[col] = row
            saved = None
            if mrv_fc:   # 前瞻检查：剪去未赋值列的域
                saved = {c: domains[c] for c in range(n) if c not in assignment}
                for c in saved:
                    domains[c] = [r for r in domains[c] if not attacks(col, row, c, r)]
                if any(not domains[c] for c in saved):
                    domains.update(saved); del assignment[col]; continue
            if search(): return True
            if saved: domains.update(saved)
            del assignment[col]
        return False
    search()
    return assignment, count
```

```console
$ python3 queens.py
 n   plain   MRV+FC
 8      113      75
12      261     153
16    10052      44
20   199635     145
24   411608      43
```

朴素回溯的功夫时多时少且急剧增长——按行序的第一个解在 $n = 16$ 到 $24$ 时恰好位于树的深处。用上 MRV 与前瞻检查后，计数保持很小且几乎不增长：某个列的行用完时前瞻检查立刻察觉，MRV 随即转到选择最少的列，于是大多数死胡同在一两层内就被剪掉。（计数依赖于平局的打破方式；*趋势*才是要点。）
:::
:::

### 智能回溯

一条分支失败时，朴素回溯撤销*最近*的一次赋值，即使那次赋值与失败毫不相干——**时序回溯**。假设我们指定了 $\mathit{Q} = \text{红}$、$\mathit{NSW} = \text{绿}$、$\mathit{V} = \text{蓝}$、$\mathit{T} = \text{红}$，现在发现 $\mathit{SA}$ 没有相容的取值。改 $\mathit{T}$ 无济于事；$\mathit{SA}$ 的**冲突集**是 $\{\mathit{Q}, \mathit{NSW}, \mathit{V}\}$。**冲突导向回溯跳转**跳回冲突集中最近被指定的变量，并在跳转途中合并冲突集。**约束学习**把冲突的取值组合记录为一个新约束（一个**坏组合**，nogood），使它永不再被尝试——这与 SAT 求解器中的子句学习（[[complexity/coping-with-hardness#alg-dpll]] 及其后的 CDCL 讨论）是同一个思想。

::: quiz
带 MRV 的回溯正在求解一个地图着色 CSP。几次赋值之后，变量 $X$ 还有 $2$ 个合法取值，$Y$ 有 $0$ 个，$Z$ 有 $1$ 个。MRV 选哪个变量，会发生什么？

- [ ] $X$，因为它选择最多，最不可能失败。
- [ ] $Z$，因为它的值已被强制。
- [x] $Y$，搜索立即回溯。
- [ ] 存在平局，所以必须改用度启发式。
::: solution
MRV 选取剩余合法取值最少的变量，这里是取值个为零的 $Y$。对 $Y$ 的取值循环是空的，于是这次调用立即失败、搜索回溯——没有指定 $X$ 或 $Z$ 就发现了这个失败。不用 MRV，搜索可能先指定 $X$ 与 $Z$，探索它们的整棵子树之后才发现 $Y$ 是不可能的。
:::
:::

## 约束传播

前瞻检查删去与某个*赋值*冲突的取值。我们可以更进一步，在任何东西被指定之前，就删去与剩余*域*冲突的取值。

::: definition 弧相容性 {#def-arc-consistency}
对 $X$ 与 $Y$ 之间的一个二元约束，若对每个取值 $a \in D_X$ 都存在某个取值 $b \in D_Y$（$a$ 的一个**支持**）使 $(a, b)$ 满足约束，则称**弧** $(X, Y)$ 是**相容的**。若每条弧在两个方向上都相容，则称 CSP **弧相容**。**修订**弧 $(X, Y)$ 就是从 $D_X$ 中删去每个在 $D_Y$ 中没有支持的取值。
:::

没有支持的取值不可能属于任何解，所以删去它是安全的。但从 $D_X$ 的一次删除可能移除某个邻变量 $Z$ 的某个取值的最后一个支持，所以必须反复修订直到没有任何变化。

::: algorithm AC-3 {#alg-ac3}
```python
from collections import deque

def ac3(domains, neighbours, ok, trace=False):
    """使每条弧 (X, Y) 相容；域就地修改。若某个域变空则返回 False。"""
    queue = deque((x, y) for x in domains for y in neighbours[x])
    while queue:
        x, y = queue.popleft()
        removed = [a for a in domains[x] if not any(ok(x, a, y, b) for b in domains[y])]
        if removed:                                   # revise(x, y) 改变了 D(x)
            domains[x] = [a for a in domains[x] if a not in removed]
            if trace: print(f"revise({x},{y}) removes {removed} -> D({x}) = {domains[x]}")
            if not domains[x]: return False
            queue.extend((z, x) for z in neighbours[x] if z != y)
    return True
```
这里 `ok(x, a, y, b)` 测试 $X = a$、$Y = b$ 是否满足 $X$ 与 $Y$ 之间的约束。（修订 $(X, Y)$ 之后不把弧 $(Y, X)$ 重新入队：删去 $X$ 的没有支持的取值不可能移除 $Y$ 的某个取值正在使用的一个支持——被删的取值本来没有支持过任何东西。）
:::

::: theorem AC-3 的正确性与代价 {#thm-ac3}
对有 $c$ 个约束、域大小至多为 $d$ 的二元 CSP：
1. AC-3 只删去不属于任何解的取值；因此若它返回 False，则该 CSP 无解。
2. 若它返回 True，则所得 CSP 弧相容；事实上，无论以什么次序处理弧，结果都是原域的弧相容子域族的唯一最大者。
3. 它在 $O(cd^3)$ 时间内运行。
:::

::: proof
1. 对删除次数归纳：取值 $a$ 从 $D_X$ 被删去，仅当*当前*的 $D_Y$ 中没有任何 $b$ 支持它。由归纳假设，已从 $D_Y$ 删去的每个取值都不属于任何解，所以在任何解中 $Y$ 取当前 $D_Y$ 中的一个值，而这些取值没有一个与 $X = a$ 相容。于是 $X = a$ 不在任何解中。

2. *最终弧相容。* 断言：任一时刻，每条不在队列中的弧 $(X, Y)$ 都是相容的。起初所有弧都在队列中。当 $(X, Y)$ 出队并被修订后，它变得相容。它的相容性之后只能被一次来自 $D_Y$ 的删除破坏，而每一次来自 $D_Y$ 的删除（修订某个 $(Y, W)$ 时发生）都会把所有 $Z \ne W$ 的弧 $(Z, Y)$ 重新入队；弧 $(W, Y)$ 自身保持相容，因为从 $D_Y$ 删去的取值在 $D_W$ 中没有支持，因而没有支持过 $D_W$ 的任何取值。队列为空时，每条弧都相容。*最大性。* 设 $D'$ 为任意一族弧相容的子域 $D'_X \subseteq D_X$。归纳可证 $D'$ 的取值从不会被删：$a \in D'_X$ 在 $D'_Y$ 中有一个支持，它（归纳假设）仍在当前的 $D_Y$ 中，所以 revise 不会删去 $a$。于是结果包含每一族弧相容的子域族，而它自身弧相容：它就是那个唯一的最大者，与处理次序无关。

3. 每个约束给出两条弧，所以最初入队 $2c$ 条弧。弧 $(Z, X)$ 只在 $D_X$ 失去一个取值时才重新入队，这至多发生 $d$ 次；于是每条弧至多入队 $d + 1$ 次，修订至多 $2c(d + 1)$ 次。修订 $(X, Y)$ 时，拿 $Y$ 至多 $d$ 个取值去检查 $X$ 至多 $d$ 个取值中的每一个：$O(d^2)$。总计 $O(cd \cdot d^2) = O(cd^3)$。
:::

像 AC-4 与 AC-2001 这样的算法通过记住支持达到最优的 $O(cd^2)$，但 AC-3 简单而且通常很快。在回溯中每次赋值之后都运行弧相容性，称为**维持弧相容**（MAC）；它包含前瞻检查。

::: example AC-3 解出澳大利亚大部分地区 {#ex-ac3}
地图着色 CSP 起初取 $\mathit{WA} = \text{红}$、$\mathit{NT} = \text{绿}$（单元素域），其余域为 $\{\text{红}, \text{绿}, \text{蓝}\}$。运行 AC-3。
::: solution
用上面的清单，取 `ok = lambda x, a, y, b: a != b` 和九条边界：

```console
$ python3 ac3.py
revise(SA,WA) removes ['red'] -> D(SA) = ['green', 'blue']
revise(SA,NT) removes ['green'] -> D(SA) = ['blue']
revise(Q,NT) removes ['green'] -> D(Q) = ['red', 'blue']
revise(Q,SA) removes ['blue'] -> D(Q) = ['red']
revise(NSW,SA) removes ['blue'] -> D(NSW) = ['red', 'green']
revise(NSW,Q) removes ['red'] -> D(NSW) = ['green']
revise(V,SA) removes ['blue'] -> D(V) = ['red', 'green']
revise(V,NSW) removes ['green'] -> D(V) = ['red']
True
{'WA': ['red'], 'NT': ['green'], 'SA': ['blue'], 'Q': ['red'], 'NSW': ['green'], 'V': ['red'], 'T': ['red', 'green', 'blue']}
```

$\mathit{SA}$ 必须不同于红与绿，所以它是蓝；于是（与绿的 $\mathit{NT}$、蓝的 $\mathit{SA}$ 都相邻的）$\mathit{Q}$ 是红，$\mathit{NSW}$ 绿，$\mathit{V}$ 红。仅凭传播就解出了大陆；塔斯马尼亚保留全部三种取值，取其中任何一种都能补成一个解。八次修订删去了取值；由 [[#thm-ac3]]，结果不依赖于队列的次序。
:::
:::

::: warning 弧相容不意味着有解
弧相容的 CSP 可能没有解。只用两种颜色 $\{\text{红}, \text{绿}\}$ 给三角形 $\mathit{WA}$、$\mathit{NT}$、$\mathit{SA}$ 着色：每条弧都相容（一个区域的每种颜色都被每个邻区域中的另一种颜色支持），然而三个两两相邻的区域不可能用两种颜色着色。弧相容是一个*局部*性质——它一次只看一个约束——全局的不相容会从它眼下溜走。还有更强的概念：**路径相容**考察三个变量的组，而 $k = n$ 时的**强 $k$-相容**保证无回溯搜索，但强制 $k$-相容的代价随 $k$ 指数增长。一般而言，传播是使搜索更便宜的过滤器，而不是搜索的替代品——树等特殊结构除外。
:::

### 树结构 CSP

若约束图无圈，单方向的传播就够了。

::: theorem 树结构 CSP 是容易的 {#thm-tree-csp}
约束图为树（或森林）的二元 CSP 可在 $O(nd^2)$ 时间内求解：把变量排成 $X_1, \dots, X_n$，使每个变量在树中的父变量排在它之前；对 $j = n, n - 1, \dots, 2$ 修订弧 $(\mathrm{parent}(X_j), X_j)$；若没有域变空，就按 $X_1, X_2, \dots$ 的次序依次赋值，每个变量取它的域中与其父变量的值相容的一个值。
:::

::: proof
反向遍历之后，每条弧 $(\mathrm{parent}(X_j), X_j)$ 都相容。修订它只从父变量删去取值，而父变量排在更前。修订 $(\mathrm{parent}(X_j), X_j)$ 时，$D_{X_j}$ 已经定型：取值只会在修订从 $X_j$ 指向其子变量的弧时从 $X_j$ 删去，而这些子变量排在更后、更早被处理。其后的修订只从作为更早变量的父亲的变量删去取值；若其中某个是 $\mathrm{parent}(X_j)$，删去父变量的取值仍使弧 $(\mathrm{parent}(X_j), X_j)$ 保持相容（剩下的父变量取值保有自己的支持）。正向遍历时，$X_1$ 取域中剩下的任何值。轮到 $X_j$ 时，它的父变量在（修订后的）域中有一个值，由弧 $(\mathrm{parent}(X_j), X_j)$ 的相容性，它在 $D_{X_j}$ 中有一个支持；把这个值给 $X_j$。$X_j$ 与更早的变量之间唯一的约束就是与父变量之间的那条（图是树），所以赋值保持相容。若某个域变空，由 [[#thm-ac3]]（第 1 部分）无解。代价：$n - 1$ 次修订，每次 $O(d^2)$，加上正向遍历的 $O(nd)$。
:::

几乎是树的图也能归约为树。**割集条件化**（cutset conditioning）：选取一个变量集 $S$，使删去它后余下森林（$S$ 是一个**环割集**），对 $S$ 逐个尝试每个相容赋值，每种情形求解余下的树，时间为 $O(d^{\lvert S\rvert} (n - \lvert S\rvert) d^2)$。在地图中，删去 $\mathit{SA}$ 后余下森林，所以至多要解 $3$ 个树问题。**树分解**把变量分组成按树排列的重叠团；其代价只随**树宽**——最大团的规模减一——指数增长。这两个思想在概率推理（[[artificial-intelligence/probabilistic-reasoning]]）中再次出现，那里变量消除在小树宽图上很高效。

::: example 无回溯地求解一个树问题 {#ex-tree-csp}
变量 $A, B, C, D$ 的域都是 $\{1, 2, 3\}$，约束为 $A < B$、$B > C$、$B < D$（一棵以 $A$ 为根的树，$B$ 是它的子，$C$、$D$ 是 $B$ 的子）。用 [[#thm-tree-csp]] 求解。
::: solution
次序 $A, B, C, D$。反向遍历：修订 $(B, D)$：$B < D$ 需要 $D > B$；$B = 3$ 没有支持，所以 $D_B = \{1, 2\}$。修订 $(B, C)$：$B > C$；$B = 1$ 没有支持（$C$ 得是 $0$），所以 $D_B = \{2\}$。修订 $(A, B)$：$A < 2$，所以 $D_A = \{1\}$。正向遍历：$A = 1$；$B = 2$（与 $A$ 相容）；$C = 1$（低于 $2$ 的唯一取值）；$D = 3$。解为 $A = 1$、$B = 2$、$C = 1$、$D = 3$，用了三次修订、没有回溯就找到了。
:::
:::

## CSP 的局部搜索

回溯增量地构造解。**局部搜索**则从一个完整赋值开始——通常违反许多约束——反复改变一个变量的取值以减少违反数。它只保存当前状态，所以几乎不占内存，并且能处理远超系统搜索能力的问题。代价是它**不完备**：可能找不到存在的解，也永远不能证明不存在解。

::: algorithm 最小冲突 {#alg-min-conflicts}
1. 从一个完整赋值开始（随机的，或贪心构造的）。
2. 重复至多规定的最大步数：若赋值是解，返回它。否则等可能随机地选一个涉及被违反约束的变量（一个**冲突**变量），给它一个使被违反约束数最小的取值，平局随机打破。
3. 返回失败。
:::

::: example 一千个皇后 {#ex-min-conflicts}
从随机初始赋值出发，用固定随机种子对 $n$-皇后问题运行最小冲突，取 $n = 8$、$100$ 和 $1000$，至多允许 $100{,}000$ 步。
::: solution
统计每行与每条对角线上的皇后数，就能把一个方格的冲突数算成 $O(1)$：

```python
def min_conflicts(n, max_steps, rng):
    """局部搜索；rows[c] 是列 c 中皇后所在行。返回所用步数，或 None。"""
    rows = [rng.randrange(n) for _ in range(n)]
    on_row = [0] * n; on_d1 = [0] * (2 * n); on_d2 = [0] * (2 * n)     # 每条线上的皇后数
    def place(c, r, k):
        on_row[r] += k; on_d1[r + c] += k; on_d2[r - c + n] += k
    for c, r in enumerate(rows): place(c, r, 1)
    def conflicts(c, r):            # 攻击方格 (c, r) 的皇后数，不含列 c 中的那个
        return on_row[r] + on_d1[r + c] + on_d2[r - c + n] - 3 * (rows[c] == r)
    for step in range(max_steps):
        bad = [c for c in range(n) if conflicts(c, rows[c]) > 0]
        if not bad: return step
        c = rng.choice(bad)                                  # 一个冲突变量
        costs = [conflicts(c, r) for r in range(n)]
        best = min(costs)
        place(c, rows[c], -1)
        rows[c] = rng.choice([r for r in range(n) if costs[r] == best])   # 最小冲突取值
        place(c, rows[c], 1)
    return None
```

每个 $n$ 运行五次（种子 $42$）：

```console
min-conflicts n=8: steps [111, 63, 54, None, 688]
min-conflicts n=100: steps [158, 111, 98, 121, 146]
min-conflicts n=1000: steps [777, 725, 726, 675, 656]
```

$n = 1000$ 时约 $700$ 步就够——平均每个皇后还摊不到一次改动——因为许多皇后的随机摆法已经接近解，而且几乎每一次修补都有帮助。引人注目的是，对局部搜索而言 $n = 8$ 反而*更难*：五次运行中的一次（`None`）在 $100{,}000$ 步内从未找到解，在一两个冲突的赋值之间来回循环。小而约束紧密的问题有贪心修补逃不出去的局部极小值与高原；补救办法是随机重启，或模拟退火的随机性。
:::
:::

### 爬山法与模拟退火

最小冲突是**爬山法**（这里是下降）的一个实例：把被违反约束的个数看作赋值 $x$ 的**能量** $E(x)$，向能量更低的邻域移动。爬山法会卡在**局部极小值**（没有更好的邻居）、**高原**（所有邻居都一样）与**山脊**上。标准的逃脱手段是**随机重启**（若每次运行以概率 $p$ 成功，运行次数的期望是 $1/p$）、高原上的**横向移动**、禁止访问近期经过状态的**禁忌表**，以及偶尔的随机移动。

**模拟退火**把那些随机移动系统化。它提议一个随机邻居 $x'$，并按**梅特罗波利斯规则**（Metropolis rule）接受它：$\Delta E = E(x') - E(x) \le 0$ 时总是接受，否则以概率 $e^{-\Delta E/T}$ 接受，其中**温度** $T > 0$ 逐渐降低。高温时搜索几乎随机游荡；$T \to 0$ 时它变成爬山法。

::: theorem 梅特罗波利斯链采样玻尔兹曼分布 {#thm-metropolis}
设状态空间有限，且提议是对称的：从 $x$ 出发，每个邻居 $x'$ 以概率 $q(x, x') = q(x', x)$ 被提议，邻域图连通。在固定温度 $T$ 下使用梅特罗波利斯规则，当前状态的马尔可夫链有平稳分布
$$
\pi_T(x) = \frac{e^{-E(x)/T}}{Z_T}, \qquad Z_T = \sum_y e^{-E(y)/T}.
$$
当 $T \to 0$ 时，$\pi_T$ 集中于能量最低的状态。
:::

::: proof
$x \ne x'$ 时的转移概率为 $P(x, x') = q(x, x') \min(1, e^{-(E(x') - E(x))/T})$。我们验证**细致平衡**：$\pi_T(x) P(x, x') = \pi_T(x') P(x', x)$。设 $E(x') \ge E(x)$（另一种情形对称）。于是 $P(x, x') = q(x, x') e^{-(E(x') - E(x))/T}$ 而 $P(x', x) = q(x', x)$，所以
$$
\pi_T(x) P(x, x') = \frac{e^{-E(x)/T}}{Z_T}\, q(x, x')\, e^{-(E(x') - E(x))/T} = \frac{e^{-E(x')/T}}{Z_T}\, q(x', x) = \pi_T(x') P(x', x).
$$
对细致平衡关于 $x$ 求和得 $\sum_x \pi_T(x) P(x, x') = \pi_T(x') \sum_x P(x', x) = \pi_T(x')$，所以 $\pi_T$ 是平稳的。（提议的连通性使链不可约，从而这个平稳分布唯一；见 [Maths Atlas：马尔可夫链](/learn/maths/lesson.php?c=probability&l=markov-chains)。）最后，设 $E_{\min}$ 为最小能量，$M$ 为最小元之集。对 $x \notin M$，对任何 $m \in M$ 有 $\pi_T(x)/\pi_T(m) = e^{-(E(x) - E_{\min})/T} \to 0$（$T \to 0$），故 $\pi_T(M) \to 1$。
:::

该定理解释了退火的设计：在每个温度下，搜索按 $e^{-E/T}$ 的比例在各状态上停留，低 $T$ 时它由最好的状态支配；缓慢降温让链跟上分布的变化。若温度降得足够慢——对数地，$T_k \ge C/\ln(k + 1)$，常数 $C$ 依赖于问题（格曼（Geman）与格曼（Geman），1984；哈耶克（Hajek），1988）——处于全局最小值的概率趋于 $1$。这样的降温时间表在实践中慢得没法用；实际实现按几何降温（比如 $T \gets 0.99\,T$），放弃保证。

::: widget plot
f: exp(-1/T); exp(-2/T); exp(-4/T)
x: 0, 1
y: 0, 1
sliders: T=0.05:0.05:5
labels: \Delta E = 1; \Delta E = 2; \Delta E = 4
caption: 梅特罗波利斯接受概率 $e^{-\Delta E/T}$，对应增量为 $\Delta E = 1, 2, 4$ 的上坡移动，画在当前温度 $T$ 处的水平线上（它们不依赖于 $x$）。用滑块降低 $T$：$T = 5$ 时，连增加四个冲突的移动也几乎有一半时候被接受；$T = 0.25$ 时，增加一个冲突的移动只有 $2\%$ 的时候被接受，更大的几乎绝不被接受。
:::

::: example 爬山法对阵模拟退火 {#ex-annealing}
在 8 皇后问题上取能量 = 互相攻击的皇后对数，比较最陡下降爬山法（在所在列内移动使能量下降最多的那一个皇后；没有移动有用时停止）从 $1000$ 个随机起点出发，与模拟退火（$T_0 = 2$，每步 $T \gets 0.999\,T$，至多 $20{,}000$ 步）从同一批起点中的 $200$ 个出发。
::: solution
```python
import math, random

def energy(rows):          # 互相攻击的皇后对数
    n = len(rows)
    return sum(rows[i] == rows[j] or abs(rows[i] - rows[j]) == j - i
               for i in range(n) for j in range(i + 1, n))

def anneal(rows, rng, T0=2.0, cooling=0.999, steps=20000):
    e = energy(rows); T = T0
    for _ in range(steps):
        if e == 0: break
        c, r = rng.randrange(len(rows)), rng.randrange(len(rows))
        new = rows[:c] + [r] + rows[c+1:]; e2 = energy(new)
        if e2 <= e or rng.random() < math.exp(-(e2 - e) / T):   # 梅特罗波利斯规则
            rows, e = new, e2
        T *= cooling
    return rows, e
```

配合一个尝试全部 $8 \times 7 = 56$ 种单皇后移动并取最优者的爬山函数，随机种子取 $7$：

```console
$ python3 anneal.py
hill climbing solves 165 of 1000; simulated annealing solves 197 of 200
```

最陡下降只从 $16.5\%$ 的起点到达解；其余的结束于局部极小值，通常还剩一对互相攻击的皇后。用随机重启，平均需要约 $1/0.165 \approx 6$ 次运行。模拟退火早期偶尔接受上坡移动、直到温度下降才变得贪心，单次运行就解出了 $98.5\%$ 的实例。
:::
:::

::: quiz
模拟退火在一个固定的、非常高的温度 $T$ 下运行很长时间。它当前状态的分布是什么样的？

- [ ] 集中在解上。
- [x] 接近仅由提议链决定的平稳分布；提议对称时它是均匀分布。
- [ ] 集中在局部极小值上。
- [ ] 不收敛。
::: solution
由 [[#thm-metropolis]]，平稳分布正比于 $e^{-E(x)/T}$。$T \to \infty$ 时每个因子趋于 $1$，所以分布趋于均匀：几乎每个提议都被接受，搜索成为随机游走。只有随着 $T$ 下降，分布才偏向低能量。这就是退火必须降温的原因。
:::
:::

其他局部搜索方法共享同样的取舍：**局部束搜索**维护 $k$ 个状态并从它们全部后继中选出最好的 $k$ 个；**遗传算法**用交叉把状态成对组合。对连续变量，爬山法的对应物是梯度下降，即机器学习的主力（[LLM Atlas：优化器](/learn/llm/lesson.php?c=neural-networks&l=optimisers)）。

::: history
大卫·沃尔茨（David Waltz）1975 年为多面体场景线条标注编写的程序传播了顶点之间的约束。乌戈·蒙塔纳里（Ugo Montanari，1974）引入了约束网络与路径相容；艾伦·麦肯沃思（Alan Mackworth）的 "Consistency in networks of relations"（*Artificial Intelligence*，1977）给出了 AC-1 到 AC-3 算法；麦肯沃思与尤金·弗罗伊德尔（Eugene Freuder）于 1985 年分析了 AC-3 的复杂性；罗杰·莫尔（Roger Mohr）与托马斯·亨德森（Thomas Henderson）于 1986 年给出了最优的 AC-4。罗伯特·哈拉利克（Robert Haralick）与戈登·埃利奥特（Gordon Elliott）于 1980 年研究了前瞻检查与"先失败"原则。弗罗伊德尔（1982）把无回溯搜索与树结构、相容性联系起来；里娜·德赫特（Rina Dechter）与朱迪亚·珀尔（Judea Pearl）在 1980 年代后期发展了树分解与割集条件化。史蒂文·明顿（Steven Minton）、马克·约翰斯顿（Mark Johnston）、安德鲁·菲利普斯（Andrew Philips）与菲利普·莱尔德（Philip Laird）的最小冲突启发式（1992）源于对哈勃空间望远镜排程工作的观察。模拟退火由斯科特·柯克帕特里克（Scott Kirkpatrick）、丹尼尔·杰拉特（Daniel Gelatt）与马里奥·韦基（Mario Vecchi）（*Science*，1983）提出，弗拉迪米尔·切尔尼（Vladimír Černý，1985）独立提出，其基础是 1953 年的梅特罗波利斯算法。
:::

## 实际应用

约束程序设计系统（截至 2026 年，有 Gecode、Choco 与 Google 的 OR-Tools CP-SAT 等开源求解器）把回溯、为全局约束配备专用算法的传播——$\mathrm{AllDiff}$ 用二分图匹配传播，排程约束用"边寻找"（edge finding）——以及越来越多从 SAT 求解器借来的子句学习结合在一起。它们被用于排考、排班、生产排程、配置与车辆路径问题。许多 CSP 也通过翻译成 SAT（[[artificial-intelligence/logical-agents]]）或整数线性规划来求解。对"得到一个不错的赋值比最优性的证明更要紧"的巨型问题，局部搜索仍是首选方法。

## 后续内容

以子句为约束、变量取布尔值的 CSP 就是可满足性问题，即 [[artificial-intelligence/logical-agents]] 中命题推理的主题，那里的 DPLL 就是带单元传播的回溯——对子句而言的前瞻检查。规划问题可以通过固定计划长度编译成 CSP 或 SAT 实例（[[artificial-intelligence/planning]]）。本章的结构思想——约束图、消除次序、树宽——在贝叶斯网络（[[artificial-intelligence/probabilistic-reasoning]]）中再次出现，那里约束变成了概率表，"有没有解？"变成了"概率是多少？"。

::: summary
- **CSP**（[[#def-csp]]）有变量、有限域与约束；它的解是完整相容的赋值。判定可满足性是 $\mathsf{NP}$ 完全的，但结构能帮上忙。
- **回溯**（[[#alg-backtracking]]）每层指定一个变量，一有违反就回退；**MRV**（先失败）、度启发式、**最少约束值**与**前瞻检查**使搜索规模大幅缩小（[[#ex-queens-backtracking]]）；回溯跳转与坏组合学习避免重复失败。
- **弧相容**（[[#def-arc-consistency]]）删去没有支持的取值；**AC-3** 正确、与次序无关、运行时间 $O(cd^3)$（[[#thm-ac3]]），但弧相容不蕴含可解。
- **树结构** CSP 可用一遍单方向弧相容加无回溯赋值在 $O(nd^2)$ 内求解（[[#thm-tree-csp]]）；割集条件化与树分解把它推广到接近树的图。
- **局部搜索**：最小冲突约 $n$ 步就能解巨大的 $n$-皇后问题（[[#ex-min-conflicts]]），但不完备；**模拟退火**以概率 $e^{-\Delta E/T}$ 接受上坡移动从而逃出局部极小值，固定 $T$ 下采样玻尔兹曼分布（[[#thm-metropolis]]）。
:::

## 习题

::: exercise 数一数赋值 {level=1 check="2187"}
三种颜色的澳大利亚地图着色 CSP 有多少个完整赋值，不论相容与否？（填入数目。）
::: solution
七个变量，每个三个取值：$3^7 = 2187$。其中 $18$ 个是解：大陆有 $6$ 种着色法（一旦选定 $\mathit{SA}$ 与 $\mathit{NT}$，就有 $3 \cdot 2 = 6$ 种，其余全被强制：$\mathit{WA}$ 与 $\mathit{Q}$ 取第三种颜色，$\mathit{NSW}$ 取 $\mathit{NT}$ 的颜色，$\mathit{V}$ 取第三种颜色），塔斯马尼亚有 $3$ 种。
:::
:::

::: exercise 修订一条弧 {level=1 check="2"}
$X$ 与 $Y$ 的域为 $D_X = \{1, 2, 3, 4\}$、$D_Y = \{1, 2, 3\}$，约束为 $X > Y + 1$。修订弧 $(X, Y)$ 之后 $D_X$ 中还剩几个取值？（填入取值个数。）
::: solution
$X = a$ 需要某个 $b \in \{1, 2, 3\}$ 使 $a > b + 1$，即 $a \ge 3$（取 $b = 1$）。所以 $1$ 与 $2$ 被删去，$D_X = \{3, 4\}$：剩两个取值。再修订 $(Y, X)$ 会删去 $Y = 3$（它需要 $X > 4$）。
:::
:::

::: exercise 哪个启发式？ {level=1}
在地图着色 CSP 中，尚未指定任何变量时 MRV 选哪个变量？度启发式选哪个？在 $\mathit{SA} = \text{蓝}$ 且用前瞻检查之后，带度平局打破的 MRV 接下来会选哪个变量？
::: solution
任何赋值之前所有域的大小都是 $3$，所以 MRV 在七个变量之间打平；度启发式把平局判给 $\mathit{SA}$，它有五个邻接变量。$\mathit{SA} = \text{蓝}$ 之后，前瞻检查给 $\mathit{WA}, \mathit{NT}, \mathit{Q}, \mathit{NSW}, \mathit{V}$ 留下 $\{\text{红}, \text{绿}\}$，$\mathit{T}$ 仍是三个取值。MRV 在五个大陆区域之间打平；数一数与*未赋值*变量之间的约束，$\mathit{NT}$ 与 $\mathit{NSW}$ 各两个（$\mathit{NT}$：$\mathit{WA}$、$\mathit{Q}$；$\mathit{NSW}$：$\mathit{Q}$、$\mathit{V}$），$\mathit{Q}$ 两个（$\mathit{NT}$、$\mathit{NSW}$），$\mathit{WA}$ 与 $\mathit{V}$ 各一个。所以是 $\mathit{NT}$、$\mathit{Q}$、$\mathit{NSW}$ 之一，取决于最后的平局打破方式。
:::
:::

::: exercise AC-3 的代价 {level=2}
(a) 给出二元 CSP 的一个族，使 AC-3 总共删去 $\Theta(cd)$ 个取值。(b) 证明 AC-3 可以做到 $O(cd^2)$ 时间：为 $X$ 的每个取值 $a$ 与每个邻变量 $Y$ 记住上次找到的支持，并从此处继续搜索新的支持（假设每个域有次序、取值只会被删）。这就是 AC-2001 的思想。
::: solution
(a) 取一条链 $X_1 - X_2 - \dots - X_n$，域为 $\{1, \dots, n\}$（故 $d = n$），约束为 $X_i < X_{i+1}$。弧相容的域是 $D_{X_i} = \{i\}$：$X_i$ 左边需要 $i - 1$ 个更小的取值、右边需要 $n - i$ 个更大的取值。所以 AC-3 删去 $n(n - 1) = cd$ 个取值（$c = n - 1$ 个约束）；程序对 $n = 6$ 确认 $30$ 次删除。于是 [[#thm-ac3]] 的证明中用到的删除次数 $O(cd)$ 的上界可以取到。（这里仅靠传播就解出了问题。）

(b) 对每对 $(a, Y)$ 保存一个指向 $a$ 在 $D_Y$ 中最后那个支持 $b$ 的指针。修订 $(X, Y)$ 时，检查那个 $b$ 是否还在 $D_Y$ 中；若在，$a$ 仍有支持（代价 $O(1)$）。若不在，就从 $b$ *之后*的位置继续搜索下一个支持——更早的取值或者本来就不是支持、或者已被删去。在整个运行中，$(a, Y)$ 的指针在 $D_Y$ 中至多前移一遍：每对 $(a, Y)$ 总代价 $O(d)$，而这样的对共有 $O(cd)$ 个（每条弧、弧尾的每个取值）。再加上每次修订中每个检查 $O(1)$：共有 $O(cd)$ 次修订、每次 $O(d)$ 个检查。总计 $O(cd^2)$，已是最优，因为光是读完约束关系就可能要这么久。
:::
:::

::: exercise 一个树 CSP {level=2 check="2"}
变量 $A, B, C$ 的域都是 $\{1, 2, 3, 4\}$，构成一条路径 $A - B - C$，约束为 $A = B + 2$ 与 $C = 2B$。按次序 $A, B, C$ 应用 [[#thm-tree-csp]]。共有几个解？（填入解的个数。）
::: solution
反向遍历。修订 $(B, C)$：$B$ 需要某个 $C \in \{1, \dots, 4\}$ 使 $C = 2B$，所以 $D_B = \{1, 2\}$。修订 $(A, B)$：$A = B + 2$ 且 $B \in \{1, 2\}$，所以 $D_A = \{3, 4\}$。正向遍历：$A = 3$ 强制 $B = 1$、$C = 2$；$A = 4$ 强制 $B = 2$、$C = 4$。两个都满足约束（$3 = 1 + 2$、$2 = 2 \cdot 1$；$4 = 2 + 2$、$4 = 2 \cdot 2$），且每个解都如此得到，所以有 $2$ 个解。
:::
:::

::: exercise 手算平稳分布 {level=2 check="1/(1+2*exp(-1))"}
一个状态空间有三个状态 $x_0$、$x_1$、$x_2$，能量分别为 $0, 1, 1$；提议在另外两个状态中等可能地选一个。温度 $T = 1$ 时用梅特罗波利斯规则，$x_0$ 的平稳概率是多少？（填入 $\pi(x_0)$。）
::: solution
提议对称（任意两个不同状态之间 $q = 1/2$）且连通，所以由 [[#thm-metropolis]]，$\pi(x) \propto e^{-E(x)}$：权重 $1, e^{-1}, e^{-1}$。于是 $\pi(x_0) = 1/(1 + 2e^{-1}) \approx 0.576$。直接验证细致平衡：$\pi(x_0) P(x_0, x_1) = \pi(x_0) \cdot \tfrac12 e^{-1}$，而 $\pi(x_1) P(x_1, x_0) = \pi(x_0) e^{-1} \cdot \tfrac12$。相等。
:::
:::

::: exercise 靠传播解数独 {level=3}
实现一个数独求解器：在带 MRV 的回溯内部（即维持弧相容），对共享行、列或宫的格之间用带 $\ne$ 约束的 AC-3。在你挑的一个谜题上测试，并报告回溯次数。为什么许多报纸谜题用这个求解器*完全不需要*回溯？
::: solution
```python
from itertools import product

def peers(cell):
    r, c = cell
    box = {(r // 3 * 3 + i, c // 3 * 3 + j) for i in range(3) for j in range(3)}
    return ({(r, k) for k in range(9)} | {(k, c) for k in range(9)} | box) - {cell}

CELLS = list(product(range(9), range(9)))
NEIGH = {x: peers(x) for x in CELLS}

def ac3(D):
    queue = [(x, y) for x in CELLS for y in NEIGH[x]]
    while queue:
        x, y = queue.pop()
        if len(D[y]) == 1 and D[y] <= D[x]:          # x 必须不同于 y 的唯一取值
            D[x] = D[x] - D[y]
            if not D[x]: return False
            queue.extend((z, x) for z in NEIGH[x] if z != y)
    return True

def solve(D, stats):
    if not ac3(D): return None
    if all(len(D[x]) == 1 for x in CELLS): return D
    x = min((x for x in CELLS if len(D[x]) > 1), key=lambda x: len(D[x]))   # MRV
    for v in sorted(D[x]):
        E = {k: set(s) for k, s in D.items()}; E[x] = {v}
        result = solve(E, stats)
        if result: return result
        stats["backtracks"] += 1
    return None

grid = ("53..7...." "6..195..." ".98....6." "8...6...3" "4..8.3..1"
        "7...2...6" ".6....28." "...419..5" "....8..79")
D = {x: {int(ch)} if ch != "." else set(range(1, 10)) for x, ch in zip(CELLS, grid)}
stats = {"backtracks": 0}
S = solve(D, stats)
print("".join(str(min(S[(r, c)])) for r in range(9) for c in range(9))[:18], stats)
```

```console
$ python3 sudoku.py
534678912672195348 {'backtracks': 0}
```

对 $\ne$ 约束，修订 $(X, Y)$ 只会在 $Y$ 的域是包含该取值的单元素集时从 $X$ 删去一个取值，这正是那条捷径所检验的。这个谜题被传播和每次第一次都猜对的 MRV 选择解出：零次回溯。为人设计的谜题通常能用"显性单值"（naked single）式的推理解出，而这正是弧相容所做的事；更难的谜题需要搜索或更强的传播（例如 $\mathrm{AllDiff}$ 推理，它能找到"隐性单值"：某个数字在一组中只有一个可放的格）。
:::
:::

::: exercise 随机重启 {level=3 check="4"}
(a) 一次局部搜索运行以概率 $p$ 成功，且各次运行相互独立。证明到首次成功为止的运行次数期望是 $1/p$。(b) 对成功率为 $p = 0.165$ 的 8 皇后爬山法（[[#ex-annealing]]），使 $k$ 次运行全部失败的概率低于 $0.5$ 的最小的独立重启次数 $k$ 是多少？（填入 $k$。）
::: solution
(a) 到首次成功的运行次数 $R$ 服从几何分布：$\Pr(R = k) = (1 - p)^{k-1} p$，所以 $\E[R] = \sum_{k \ge 1} k (1 - p)^{k-1} p = p / (1 - (1 - p))^2 = 1/p$，其中用到 $\sum_k k x^{k-1} = 1/(1-x)^2$。

(b) $k$ 次运行全部失败的概率是 $(1 - p)^k = 0.835^k$。$0.835^3 \approx 0.582$，$0.835^4 \approx 0.486 < 0.5$，所以 $k = 4$。（要有 $99\%$ 的成功把握，$k = \lceil \ln 0.01 / \ln 0.835\rceil = 26$。）
:::
:::
