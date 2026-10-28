迷宫、社交网络、万维网、一个程序各模块之间的依赖关系、一道谜题的走法：它们每一个都是由若干事物以及成对连接构成的**图**。关于它们的许多问题都是*可达性*问题。从这里出发能否走出迷宫，若能，最短的走法是什么？两个人之间隔着几层熟人？各模块按什么次序编译，才能使每个模块都排在它所依赖的一切之后——这样的次序存在吗，还是存在一个循环依赖？哪些网页能够互相到达？能否把聚会宾客分坐两桌，使任意两个仇人不同桌？

回答这些问题的都是**图搜索**：从某个源点出发，沿着边走，系统性地访问每个可达顶点，且每个顶点都不访问两次。探索有两种基本次序。**广度优先搜索**（BFS）像水面的涟漪一样按距离递增的一圈圈向外探索，当每条边的长度都是 $1$ 时它能找出最短路径。**深度优先搜索**（DFS）则一条路尽可能往深处钻，只有走投无路才回溯，就像手执线团探索迷宫的人；它进入和离开各顶点的时刻揭示了图的结构——圈、拓扑序、强连通分量。两者都以**线性时间**运行：对 $n$ 个顶点、$m$ 条边的图是 $O(n + m)$，这已是所能指望的最快——仅仅读出这张图就要花这么多时间。

我们使用记号 $G = (V, E)$、$n = \lvert V\rvert$、$m = \lvert E\rvert$，并用**邻接表**表示图：对每个顶点 $u$，保存一个由满足 $(u, v)$ 为边的顶点 $v$ 组成的表 $\mathrm{Adj}[u]$。各表长度之和对有向图为 $m$，对无向图为 $2m$，因此该表示占用 $\Theta(n + m)$ 空间（与邻接矩阵的比较见 [[data-structures/graph-representations]]）。在 Python 中，一个把每个顶点映到一个列表的字典即可胜任。关于路径、圈、树、连通性的图论数学见 [Maths Atlas：图](/learn/maths/lesson.php?c=discrete&l=graphs)。

## 广度优先搜索

::: algorithm 广度优先搜索 {#alg-bfs}
```text
BFS(G, s)
1  for each vertex u: u.d ← ∞, u.π ← NIL
2  s.d ← 0
3  Q ← a queue containing only s
4  while Q is not empty
5      u ← DEQUEUE(Q)
6      for each v in Adj[u]
7          if v.d = ∞                    ▷ v 第一次被发现
8              v.d ← u.d + 1
9              v.π ← u
10             ENQUEUE(Q, v)
```
:::

每个被到达的顶点**被发现**一次（当它的距离变为有限时），进队一次；使它被发现的那条边 $(v.\pi, v)$ 是一条**树边**，所有树边构成以 $s$ 为根的**广度优先树**。沿父指针 $\pi$ 从 $v$ 一路回溯到 $s$ 就得到一条路径。

```python
from collections import deque

def bfs(adj, s):
    """Distances (in edges) and BFS-tree parents from s."""
    dist, parent = {s: 0}, {s: None}
    queue = deque([s])
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if v not in dist:            # v 第一次被发现
                dist[v] = dist[u] + 1
                parent[v] = u
                queue.append(v)
    return dist, parent

adj = {'s': ['a', 'b'], 'a': ['s', 'c'], 'b': ['s', 'c', 'd'],
       'c': ['a', 'b', 'e'], 'd': ['b', 'e'], 'e': ['c', 'd', 'f'], 'f': ['e']}
dist, parent = bfs(adj, 's')
print(dist)
path, v = [], 'f'
while v is not None:                     # 沿父指针回溯到 s
    path.append(v); v = parent[v]
print(path[::-1])
```

```console
$ python3 bfs.py
{'s': 0, 'a': 1, 'b': 1, 'c': 2, 'd': 2, 'e': 3, 'f': 4}
['s', 'a', 'c', 'e', 'f']
```

::: widget graph
nodes: s@0,1; a@1,2; b@1,0; c@2,1.5; d@2,0; e@3,1; f@4,1
edges: s-a; s-b; a-c; b-c; b-d; c-e; d-e; e-f
algorithm: bfs
start: s
caption: 在列表中的图上从 $s$ 出发进行广度优先搜索。逐步演示并观察队列：距离为 $1$ 的顶点（$a$、$b$）全部出队之后，距离为 $2$ 的顶点（$c$、$d$）才会出队，如此等等。高亮的树边构成广度优先树；树中从 $s$ 到 $f$ 的路径含 $4$ 条边，即距离。拖动顶点可以把图画理清；也可以试试从别的顶点出发。
:::

### 正确性

以 $\delta(s, v)$ 表示从 $s$ 到 $v$ 的**距离**：从 $s$ 到 $v$ 的路径上边数的最小值；若不存在这样的路径则为 $\infty$。目标是证明 BFS 对每个 $v$ 都有 $v.d = \delta(s, v)$。关于队列的两个事实是证明的核心。

::: lemma 队列中至多出现两个相邻的距离值 {#lem-bfs-queue}
在 BFS 运行的任一时刻，若队列从头到尾存有 $v_1, v_2, \dots, v_r$，则 $v_1.d \le v_2.d \le \dots \le v_r.d \le v_1.d + 1$。
:::

::: proof
对队列操作次数归纳。初始时队列为 $\langle s\rangle$。一次出队移除 $v_1$；剩余序列仍满足不等式，因为 $v_r.d \le v_1.d + 1 \le v_2.d + 1$。$v$ 的一次入队发生在扫描刚出队的顶点 $u$ 的 $\mathrm{Adj}[u]$ 期间，并置 $v.d = u.d + 1$。在 $u$ 被移除之前它是队头，故由假设队列中每个顶点都有 $d \le u.d + 1 = v.d$；而新的队头（若存在）$v_1$ 满足 $v_1.d \ge u.d$，于是 $v.d = u.d + 1 \le v_1.d + 1$。入队之后两个不等式都成立。

特别地，队头的 $d$ 总是队列中最小的，且任何随后入队的顶点的 $d$ 至少与当前队头一样大；因此顶点按 $d$ 的非降次序*出队*。
:::

::: theorem BFS 计算距离 {#thm-bfs}
设 BFS 在有向图或无向图上从 $s$ 运行。则它会终止；每个从 $s$ 可达的顶点 $v$ 都会被发现，且 $v.d = \delta(s, v)$；而对可达的 $v \ne s$，从 $s$ 到 $v$ 的一条最短路径由从 $s$ 到 $v.\pi$ 的一条最短路径再接上边 $(v.\pi, v)$ 构成。不可达的顶点保持 $v.d = \infty$。运行时间为 $O(n + m)$。
:::

::: proof
*上界。*若 $v.d$ 有限，则存在一条从 $s$ 到 $v$ 含 $v.d$ 条边的路径（树路径，对发现次序归纳），故 $v.d \ge \delta(s, v)$；不可达的顶点永远不会被发现。

*相等。*反设某个顶点得到了错误的值，并在这些顶点中取 $\delta(s, v)$ 最小的 $v$。则 $v \ne s$，且 $\delta(s, v) < \infty$（由上界论证，距离为无穷的顶点是正确的）。设 $u$ 为从 $s$ 到 $v$ 的某条最短路径上 $v$ 的前驱，于是 $\delta(s, u) = \delta(s, v) - 1$，且由 $v$ 的选取有 $u.d = \delta(s, u)$。这样 $v.d > \delta(s, v) = u.d + 1$。考虑 $u$ 出队的时刻（它可达且正确，故必已被发现并入队）。此时 $v$ 或白、或灰、或黑：

- 若 $v$ 尚未被发现（该时刻 $v.d = \infty$），扫描 $\mathrm{Adj}[u]$ 将置 $v.d = u.d + 1$，矛盾；
- 若 $v$ 已经出队，则它在 $u$ 之前离开队列，由 [[#lem-bfs-queue]]（距离按非降次序离队）有 $v.d \le u.d$，矛盾；
- 若 $v$ 在队列中，则它是扫描某个 $w$ 时入队的，满足 $v.d = w.d + 1$，而 $w$ 在 $u$ 之前出队，故 $w.d \le u.d$，从而 $v.d \le u.d + 1$，矛盾。

于是每个顶点都是正确的。关于 $v.\pi$ 的结论由 $v.d = v.\pi.d + 1$ 得到。

*时间。*每个顶点至多入队一次（仅当 $v.d$ 从 $\infty$ 改变时），因而至多出队一次，其邻接表至多被扫描一次。初始化是 $O(n)$，全部扫描总计 $O(m)$。
:::

::: example 演示 BFS {#ex-bfs}
在列表中的图上从 $s$ 运行 [[#alg-bfs]]，给出每次出队后的队列。
::: solution
| 出队的 $u$ | 新发现的顶点（及其 $d$） | 其后的队列 |
|---|---|---|
| — | $s$ (0) | $s$ |
| $s$ | $a$ (1), $b$ (1) | $a, b$ |
| $a$ | $c$ (2) | $b, c$ |
| $b$ | $d$ (2) | $c, d$ |
| $c$ | $e$ (3) | $d, e$ |
| $d$ | —（$e$ 已被发现） | $e$ |
| $e$ | $f$ (4) | $f$ |
| $f$ | — | 空 |

距离与输出相符。扫描 $b$ 时，$c$ 已被（由 $a$）发现，所以进入 $c$ 的树边是 $(a, c)$ 而不是 $(b, c)$；这就是打印出的路径经过 $a$ 的原因。$s, a, c, e, f$ 和 $s, b, d, e, f$ 都是最短路径；BFS 返回其中一条，由邻接表的顺序决定。
:::
:::

BFS 是求无权最短路径的算法；在无向图上从每个未发现的顶点各运行一次可找出其连通分量；从种子页面出发按一圈圈地抓取万维网、以求解最少步数的谜题，用的也是 BFS。若边带有*长度*，BFS 就不再能找出最短路径了；这是 [[algorithms/shortest-paths]] 的主题，其中的迪杰斯特拉算法用优先队列替换普通队列，把 BFS 推广开来。

::: quiz
在无向图上从 $s$ 运行 BFS，边 $\{u, v\}$ 满足 $u.d = 3$。$v.d$ 可能取哪些值？

- [ ] 任何不小于 $3$ 的值
- [x] $2$、$3$ 或 $4$
- [ ] 仅 $4$
- [ ] 仅 $2$ 或 $4$
::: solution
在无向图中，$\delta(s, v) \le \delta(s, u) + 1$ 且 $\delta(s, u) \le \delta(s, v) + 1$，因为这条边能把最短路径延长到任一端点。故 $v.d \in \{2, 3, 4\}$。连接两个等距顶点的边（$v.d = 3$）正是使图在 [[#thm-bipartite]] 中不是二分图的原因。在*有向*图中，边 $(u, v)$ 还可以指向距离更小的任意顶点，因为它并不给出从 $v$ 到 $u$ 的路径。
:::
:::

## 深度优先搜索

DFS 用一个栈代替队列——最自然的就是递归过程的调用栈。它为每个顶点记录两个**时间戳**：$u.d$ 是 $u$ 被发现的时刻，$u.f$ 是它**完成**的时刻，即其所有邻接点都已探索完毕的时刻。顶点在被发现之前是**白色**的，在发现之后、完成之前是**灰色**的，完成之后是**黑色**的。

::: algorithm 深度优先搜索 {#alg-dfs}
```text
DFS(G)
1  for each vertex u: u.colour ← WHITE, u.π ← NIL
2  time ← 0
3  for each vertex u
4      if u.colour = WHITE
5          DFS-VISIT(G, u)

DFS-VISIT(G, u)
1  time ← time + 1;  u.d ← time;  u.colour ← GREY
2  for each v in Adj[u]
3      if v.colour = WHITE
4          v.π ← u
5          DFS-VISIT(G, v)
6  time ← time + 1;  u.f ← time;  u.colour ← BLACK
```
:::

外层循环从每个尚未到达的顶点重新起动搜索，因此 DFS 会访问整个图，树边 $(u.\pi, u)$ 构成一片**深度优先森林**。它以 $\Theta(n + m)$ 时间运行：`DFS-VISIT` 对每个顶点恰好调用一次（只对白色顶点调用，而调用即使其变灰），且每个邻接表只被扫描一次。Python 实现：

```python
def dfs(adj):
    """Discovery and finish times of a depth-first search of every vertex."""
    time, d, f = 0, {}, {}
    def visit(u):
        nonlocal time
        time += 1; d[u] = time           # u 变灰
        for v in adj[u]:
            if v not in d:               # v 为白色：树边 (u, v)
                visit(v)
        time += 1; f[u] = time           # u 变黑
    for u in adj:
        if u not in d:
            visit(u)
    return d, f

def topological_order(adj):
    d, f = dfs(adj)
    return sorted(adj, key=lambda u: -f[u])   # 按完成时间递减

dag = {'shorts': ['trousers', 'shoes'], 'trousers': ['belt', 'shoes'],
       'belt': ['jacket'], 'shirt': ['belt', 'tie'], 'tie': ['jacket'],
       'jacket': [], 'socks': ['shoes'], 'shoes': [], 'watch': []}
d, f = dfs(dag)
print({u: (d[u], f[u]) for u in dag})
print(topological_order(dag))
```

```console
$ python3 dfs.py
{'shorts': (1, 10), 'trousers': (2, 9), 'belt': (3, 6), 'shirt': (11, 14), 'tie': (12, 13), 'jacket': (4, 5), 'socks': (15, 16), 'shoes': (7, 8), 'watch': (17, 18)}
['watch', 'socks', 'shirt', 'tie', 'shorts', 'trousers', 'shoes', 'belt', 'jacket']
```

（Python 默认的递归深度限制约为 $1000$ 帧，这个递归版本在长路径上会失败；对大型图请使用显式栈，见 [[#ex-iterative-dfs]]。）

### 时间戳的结构

时间戳像括号一样嵌套：在 $u$ 被发现时写下 "$(u$"，在它完成时写下 "$u)$"，所得便是一个合式括号串。对穿衣依赖图，它是 $(\text{shorts}\ (\text{trousers}\ (\text{belt}\ (\text{jacket}\ \text{jacket})\ \text{belt})\ (\text{shoes}\ \text{shoes})\ \text{trousers})\ \text{shorts})\ (\text{shirt}\ (\text{tie}\ \text{tie})\ \text{shirt}) \dots$

::: theorem 括号定理 {#thm-parenthesis}
在任何深度优先搜索中，对任意两个顶点 $u$ 和 $v$，下面恰有一种情形成立：

1. 区间 $[u.d, u.f]$ 与 $[v.d, v.f]$ 不相交，且在深度优先森林中二者互不为后代；
2. $[u.d, u.f]$ 包含 $[v.d, v.f]$，且 $v$ 是 $u$ 的后代；
3. $[v.d, v.f]$ 包含 $[u.d, u.f]$，且 $u$ 是 $v$ 的后代。
:::

::: proof
设 $u.d < v.d$（另一种情形对称）。若 $v.d < u.f$，则 $v$ 是在 $u$ 为灰色时发现的，即在 `DFS-VISIT(u)` 尚在调用栈上时发现的；于是对 $v$ 的调用直接或间接地由对 $u$ 的调用发出，$v$ 是 $u$ 的后代。内层调用先于外层返回，故 $v.f < u.f$：情形 2。若 $v.d > u.f$，则 $u.d < u.f < v.d < v.f$，区间不相交；又 $v$ 是在 `DFS-VISIT(u)` 返回之后发现的，故 $v$ 不是 $u$ 的后代（$u$ 的后代都在该次调用期间发现）；$u$ 也不是 $v$ 的后代，因为 $v$ 发现得更晚。这就是情形 1。
:::

::: theorem 白路径定理 {#thm-white-path}
在深度优先森林中，$v$ 是 $u$ 的后代，当且仅当在 $u$ 被发现的时刻 $u.d$，存在一条从 $u$ 到 $v$、全由白色顶点组成的路径。
:::

::: proof
($\Rightarrow$) 若 $v$ 是 $u$ 的后代，则 $u$ 到 $v$ 的树路径上的每个顶点 $w$ 都是 $u$ 的后代，由 [[#thm-parenthesis]] 有 $u.d \le w.d$，于是除 $u$ 之外它们在时刻 $u.d$ 都是白色的。

($\Leftarrow$) 设在时刻 $u.d$ 存在白色路径 $u = w_0, w_1, \dots, w_k = v$，但 $v$ 没有成为 $u$ 的后代。取路径上第一个不是 $u$ 的后代的顶点 $w_i$；则 $i \ge 1$，而 $w_{i-1}$ 是 $u$ 的后代（或就是 $u$ 本身），故 $w_{i-1}.f \le u.f$。由于 $w_i$ 在时刻 $u.d$ 是白色的，$w_i.d > u.d$。由于 $(w_{i-1}, w_i)$ 是边，$w_i$ 必须在 $w_{i-1}$ 完成之前被发现（`DFS-VISIT(w_{i-1})` 会扫描这条边，且若 $w_i$ 仍为白色就去访问它），于是 $u.d < w_i.d < w_{i-1}.f \le u.f$。由 [[#thm-parenthesis]]，$[w_i.d, w_i.f]$ 落在 $[u.d, u.f]$ 内部，故 $w_i$ 是 $u$ 的后代——矛盾。
:::

### 边的分类

DFS 根据边 $(u, v)$ 第一次从 $u$ 探索时 $v$ 的颜色，把有向图的边分成四类：

- **树边**：$v$ 为白色——这条边在深度优先森林中；
- **回边**：$v$ 为灰色——$v$ 是 $u$ 的祖先（或就是 $u$ 自身，即自环）；
- **前向边**：$v$ 为黑色且 $u.d < v.d$——$v$ 是 $u$ 的非树后代；
- **横叉边**：$v$ 为黑色且 $v.d < u.d$——$v$ 在更早的子树或更早的树中；二者互不为后代。

在*无向*图中，每条边第一次被检查时都是树边或回边：一条指向黑色顶点 $v$ 的边将意味着 $v$ 在尚未探索它通向 $u$ 的那条边时就已经完成，这是不可能的。

::: theorem 圈与回边 {#thm-back-edge}
有向图含有圈当且仅当对它的深度优先搜索找到一条回边。
:::

::: proof
($\Leftarrow$) 回边 $(u, v)$ 从 $u$ 指向它的祖先 $v$；从 $v$ 到 $u$ 的树路径再接上这条边就是一个圈。（$\Rightarrow$）设 $C$ 是一个圈，$v$ 是 $C$ 中最先被发现的顶点，$u$ 是 $v$ 在 $C$ 上的前驱，于是 $(u, v)$ 是一条边。在时刻 $v.d$，$C$ 的其余部分都是白色的，所以沿 $C$ 存在一条从 $v$ 到 $u$ 的白色路径，由 [[#thm-white-path]]，$u$ 成为 $v$ 的后代。当 $(u, v)$ 从 $u$ 被探索时，$v$ 仍为灰色（$u$ 在 `DFS-VISIT(v)` 执行期间被发现并完成），故它是回边。
:::

::: quiz
在有向图的一次 DFS 中，探索边 $(u, v)$ 时 $v$ 为黑色且 $v.d < u.d$。这是哪一类边？意味着什么？

- [ ] 回边，因此图中有圈。
- [ ] 前向边：$v$ 是 $u$ 的后代。
- [x] 横叉边：$v$ 在 $u$ 被发现之前已经完成，且二者互不为后代。
- [ ] 树边。
::: solution
$v$ 为黑色，故它已经完成；此时 $u$ 为灰色，由 $v.d < u.d$ 知 $u$ 不是 $v$ 的后代（若是，$v$ 将仍为灰色）。由 [[#thm-parenthesis]]，两区间不相交且 $v.f < u.d$。横叉边只存在于有向图中，且自身绝不会构成圈。注意 $v.f < u.f$——这正是下面拓扑排序所使用的事实。
:::
:::

## 拓扑排序

**有向无环图**（DAG）刻画依赖关系：边 $(u, v)$ 表示 $u$ 必须排在 $v$ 之前——先修课程排在需要它的课程之前，被导入的模块排在导入它的模块之前，产出结果的任务排在需要该结果的任务之前。

::: definition 拓扑序 {#def-topo}
有向图的一个**拓扑序**是其顶点的一个线性序，使得对每条边 $(u, v)$，$u$ 都排在 $v$ 之前。
:::

含圈的图没有拓扑序（圈上在序中最先出现的顶点，其在圈上的前驱会排在它之后）。反之，每个 DAG 都有拓扑序，而 DFS 能找到它。

::: theorem DFS 给出拓扑排序 {#thm-topo}
若 $G$ 是 DAG，则按其顶点 DFS 完成时间的递减次序列出即得一个拓扑序。在顶点完成时把它追加到一个表尾，所需时间为 $\Theta(n + m)$。
:::

::: proof
设 $(u, v)$ 为一条边；我们证明 $v.f < u.f$。当这条边从 $u$ 被探索时，$v$ 不是灰色的，因为若 $v$ 为灰色，则 $(u, v)$ 是回边，$G$ 就含有圈（[[#thm-back-edge]]）。若 $v$ 为白色，它成为 $u$ 的后代，由 [[#thm-parenthesis]] 有 $v.f < u.f$。若 $v$ 为黑色，则它已经完成而 $u$ 尚未：$v.f < u.f$。
:::

::: example 穿衣问题 {#ex-topo}
利用上面打印出的时间戳验证穿衣依赖图的拓扑序，并找出第二个合法次序。
::: solution
完成时间：watch $18$、socks $16$、shirt $14$、tie $13$、shorts $10$、trousers $9$、shoes $8$、belt $6$、jacket $5$。按完成时间递减排列即得打印出的次序。每条边都从较大的完成时间指向较小的完成时间：shorts ($10$) $\to$ trousers ($9$)、shoes ($8$)；trousers ($9$) $\to$ belt ($6$)、shoes ($8$)；belt ($6$) $\to$ jacket ($5$)；shirt ($14$) $\to$ belt、tie ($13$)；tie $\to$ jacket；socks ($16$) $\to$ shoes。拓扑序很少唯一：shirt、tie、socks、shorts、trousers、belt、jacket、shoes、watch 是另一个，因为它同样让每条边都指向前方。
:::
:::

::: widget graph
nodes: shorts@0,2; trousers@1,2; belt@2,2; jacket@3,2; shirt@1,3; tie@2,3; socks@0,1; shoes@1.5,1; watch@3,1
edges: shorts>trousers; shorts>shoes; trousers>belt; trousers>shoes; belt>jacket; shirt>belt; shirt>tie; tie>jacket; socks>shoes
algorithm: topo
caption: 穿衣依赖 DAG。逐步演示拓扑排序：它产生的次序中每条箭头都指向前方。然后从 jacket 到 shirt 添加一条边（编辑边表，或想象这条边）：图中便有了圈（shirt → belt → jacket → shirt），拓扑序也就不存在了。
:::

另一个算法是 **Kahn 算法**（1962）：反复从剩余图中取出一个入度为 $0$ 的顶点输出并删除；维护入度计数和一个入度为零的顶点队列，同样达到 $\Theta(n + m)$，且若它在输出所有顶点之前停止，则剩下的图中含有圈（[[#ex-kahn]]）。

## 强连通分量

在有向图中，若 $u$ 到 $v$ 和 $v$ 到 $u$ 都有路径，则称 $u$ 和 $v$ **强连通**。这是一个等价关系，其等价类就是**强连通分量**（SCC）。把每个强连通分量收缩成一个顶点，得到**分量图** $G^{\mathrm{SCC}}$，它必然是一个 DAG：若两个分量之间有圈经过，它们就合成一个分量。因此每个有向图都是由强连通块构成的 DAG。

Kosaraju 算法用两次深度优先搜索求各强连通分量。设 $G^{\mathsf T}$ 为 $G$ 的**转置**：每条边都取反向；它与 $G$ 有相同的强连通分量。

::: algorithm Kosaraju 算法 {#alg-kosaraju}
1. 在 $G$ 上运行 DFS，求出完成时间 $u.f$。
2. 求出 $G^{\mathsf T}$。
3. 在 $G^{\mathsf T}$ 上运行 DFS，主循环中按 $u.f$ 的*递减*次序处理顶点。第二片深度优先森林的每棵树恰是一个强连通分量。
:::

对顶点集 $C$，记 $f(C) = \max_{u\in C} u.f$，即第一次搜索中 $C$ 里最晚的完成时间。

::: lemma 分量之间的完成时间 {#lem-scc}
设 $C$ 和 $C'$ 是 $G$ 的两个不同的强连通分量，且存在边 $(u, v)$ 满足 $u \in C$、$v \in C'$。则 $f(C) > f(C')$。
:::

::: proof
设 $x$ 为第一次搜索中 $C \cup C'$ 里最先被发现的顶点。若 $x \in C$，则在时刻 $x.d$，$C \cup C'$ 全体为白色，且 $C \cup C'$ 中每个顶点都可由 $x$ 沿白色路径到达（在 $C$ 内到 $u$，跨过边 $(u, v)$，再在 $C'$ 内行进）。由 [[#thm-white-path]]，它们全都成为 $x$ 的后代，因而都在 $x$ 之前完成：$f(C) = x.f > f(C')$。若 $x \in C'$，则 $C'$ 全体成为 $x$ 的后代并在 $x.f$ 之前完成，故 $f(C') = x.f$。$C$ 中没有顶点可由 $x$ 到达——否则就存在一条从 $C'$ 到 $C$ 的路径，它连同边 $(u, v)$ 会把 $C$ 和 $C'$ 合并成一个强连通分量。于是在时刻 $x.f$，$C$ 的每个顶点仍为白色；它们更晚被发现，故 $f(C) > x.f = f(C')$。
:::

::: theorem Kosaraju 算法的正确性 {#thm-kosaraju}
[[#alg-kosaraju]] 恰好输出 $G$ 的各个强连通分量，用时 $\Theta(n + m)$。
:::

::: proof
对 $k$ 归纳证明第二次搜索的前 $k$ 棵树都是强连通分量。设前 $k$ 棵树是强连通分量，第 $(k+1)$ 棵树从尚未访问的顶点中完成时间最大的顶点 $x$ 开始；设 $C$ 为 $x$ 所属的分量。$C$ 的全部顶点都未被访问（先前的树不可能含有 $C$ 的一部分，因为先前的树是完整的分量），且 $f(C) = x.f$。在 $G^{\mathsf T}$ 中，$x$ 可到达 $C$ 的每个顶点，故这棵树包含 $C$ 的全部。它可能含有另一个分量 $C'$ 的顶点吗？只有当 $G^{\mathsf T}$ 有一条从 $C$ 到某个未访问的 $C'$ 的边时才可能，即 $G$ 有一条从 $C'$ 到 $C$ 的边；由 [[#lem-scc]]，这意味着 $f(C') > f(C) = x.f$，与 $x$ 取为未访问顶点中完成时间最大者矛盾。指向已访问分量的边只通向黑色顶点，不会带来新顶点。所以这棵树恰为 $C$。两次搜索与求转置各耗时 $\Theta(n + m)$。
:::

```python
def finish_order(adj):
    """Vertices in increasing order of DFS finish time."""
    seen, order = set(), []
    def visit(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                visit(v)
        order.append(u)                  # u 完成
    for u in adj:
        if u not in seen:
            visit(u)
    return order

def strongly_connected_components(adj):
    """Kosaraju: DFS on G, then DFS on the reverse graph by decreasing finish."""
    rev = {u: [] for u in adj}
    for u in adj:
        for v in adj[u]:
            rev[v].append(u)
    comp = {}
    def collect(u, root):
        comp[u] = root
        for v in rev[u]:
            if v not in comp:
                collect(v, root)
    for u in reversed(finish_order(adj)):
        if u not in comp:
            collect(u, u)                # 一个新分量，以根命名
    groups = {}
    for u, r in comp.items():
        groups.setdefault(r, []).append(u)
    return list(groups.values())

g = {'a': ['b'], 'b': ['c', 'e', 'f'], 'c': ['d', 'g'], 'd': ['c', 'h'],
     'e': ['a', 'f'], 'f': ['g'], 'g': ['f', 'h'], 'h': ['h']}
print(finish_order(g))
print(strongly_connected_components(g))
```

```console
$ python3 scc.py
['h', 'd', 'f', 'g', 'c', 'e', 'b', 'a']
[['a', 'e', 'b'], ['c', 'd'], ['g', 'f'], ['h']]
```

::: example 两趟搜索 {#ex-scc}
解释列表程序的输出：第二次搜索为什么从 $a$ 出发，又为什么在 $\{a, e, b\}$ 处停止？
::: solution
第一次搜索从 $a$ 出发，沿 $a \to b \to c \to d \to h$ 前进，于是 $h$ 最先完成；根 $a$ 最后完成。按完成时间递减，第二次搜索在 $G^{\mathsf T}$ 中从 $a$ 开始。在 $G^{\mathsf T}$ 中，进入 $a$ 的边来自 $e$，进入 $e$ 的边来自 $b$，进入 $b$ 的边来自 $a$：树就是 $\{a, e, b\}$。它无法越出这个集合，因为 $G^{\mathsf T}$ 中从 $\{a, b, e\}$ 指出的边对应于 $G$ 中从外部进入 $\{a, b, e\}$ 的边，而这样的边不存在——$\{a, b, e\}$ 是分量图的一个源，拥有最大的完成时间，正如 [[#lem-scc]] 所预言。按完成时间递减，下一个未访问的顶点是 $c$，得到 $\{c, d\}$（它指向 $b$ 的反向边通向已访问过的顶点）；接着是 $g$，得到 $\{g, f\}$；最后是 $h$。分量图有边 $\{a,b,e\} \to \{c,d\}$、$\{a,b,e\} \to \{f,g\}$、$\{c,d\} \to \{f,g\}$、$\{c,d\} \to \{h\}$ 和 $\{f,g\} \to \{h\}$；第二次搜索正是按分量图的一个拓扑序访问各分量的。
:::
:::

Tarjan 算法（1972）借助“low-link”值和一个栈，在一次深度优先搜索中求出全部强连通分量；它是通常被实现的算法，而 Kosaraju 算法更容易证明。

## 二分图

若无向图的顶点可以划分为两个集合，使每条边恰有一端在各集合中，则称它是**二分图**——等价地，若能以两种颜色为顶点染色使相邻顶点颜色不同。把考试安排到两个时段以避免学生冲突、把求职者与工作相匹配（[[algorithms/network-flow]]），都是二分图上的问题。

::: theorem 二分图与奇圈 {#thm-bipartite}
无向图是二分图当且仅当它不含长度为奇数的圈。BFS 能判定这一点，用时 $O(n + m)$，并给出一个 2-染色或一个奇圈。
:::

::: proof
($\Rightarrow$) 在 2-染色的图中，颜色沿圈交替出现，故圈只有经过偶数条边才能回到起始颜色。

($\Leftarrow$，以及算法。) 在每个连通分量中分别工作；从某个 $s$ 运行 BFS，按每个顶点距离的奇偶染色：$\delta(s, v) \bmod 2$。每条边 $(u, v)$ 两端点的距离之差至多为 $1$（若 $\delta(s, v) > \delta(s, u) + 1$，则经过 $u$ 的路径会更短）。若每条边都连接距离奇偶不同的顶点，则该染色是正常的，图是二分图。否则存在边 $(u, v)$ 使 $\delta(s, u) = \delta(s, v) = k$。设 $z$ 为 $u$ 和 $v$ 在 BFS 树中的最低公共祖先，深度 $j < k$。从 $z$ 到 $u$ 与从 $z$ 到 $v$ 的树路径只共用 $z$，它们连同边 $(u, v)$ 构成一个长度为 $(k - j) + (k - j) + 1$ 的圈，其为奇数。所以不含奇圈的图是二分图，且当图不是二分图时该算法会找出一个奇圈。
:::

```python
from collections import deque

def two_colour(adj):
    """Return a 2-colouring dict, or an odd cycle as a list of vertices."""
    colour, parent = {}, {}
    for s in adj:
        if s in colour:
            continue
        colour[s], parent[s] = 0, None
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if v not in colour:
                    colour[v], parent[v] = 1 - colour[u], u
                    queue.append(v)
                elif colour[v] == colour[u]:     # 同一层内的边
                    return odd_cycle(parent, u, v)
    return colour

def odd_cycle(parent, u, v):
    """Join the BFS-tree paths from u and v at their lowest common ancestor."""
    pu, pv = [u], [v]
    while pu[-1] is not None:
        pu.append(parent[pu[-1]])
    while pv[-1] is not None:
        pv.append(parent[pv[-1]])
    pu, pv = pu[:-1], pv[:-1]
    while len(pu) > 1 and len(pv) > 1 and pu[-2] == pv[-2]:
        pu.pop(); pv.pop()               # 去掉最低公共祖先以上的公共部分
    return pu + pv[-2::-1]               # u ... lca ... v

square = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [3, 1]}
pentagon = {1: [2, 5], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 1]}
print(two_colour(square))
print(two_colour(pentagon))
```

```console
$ python3 bip.py
{1: 0, 2: 1, 4: 1, 3: 0}
[3, 2, 1, 5, 4]
```

方形图是二分图（$\{1, 3\}$ 与 $\{2, 4\}$ 分居两侧）；对五边形图，函数返回奇圈 $3, 2, 1, 5, 4$（由边 $4$–$3$ 闭合）。这里 `u, v` 是 $3$ 和 $4$，它们到顶点 $1$ 的距离都是 $2$，而 $1$ 正是它们的最低公共祖先。

::: example 两节考试 {#ex-exams}
$5$ 门考试 $A, \dots, E$ 要安排在两个时段举行，若两门考试有学生同时选修则冲突。冲突为 $A$–$B$、$A$–$D$、$B$–$C$、$C$–$D$、$C$–$E$ 和 $D$–$E$。两时段的安排可能吗？
::: solution
建立冲突图，从 $A$ 运行 2-染色 BFS：$A$ 染颜色 $0$；其邻点 $B$、$D$ 染颜色 $1$；扫描 $B$ 给 $C$ 染颜色 $0$；扫描 $D$ 发现 $C$（颜色 $0 \ne 1$，合法）并给 $E$ 染颜色 $0$；扫描 $C$ 发现 $E$ 同为颜色 $0$——同一层内冲突。由树路径可找出奇圈：$C$ 和 $E$ 的距离都是 $2$，父顶点分别为 $B$ 和 $D$，其最低公共祖先为 $A$，得到圈 $C, B, A, D, E$（由边 $E$–$C$ 闭合）——五门考试、一个奇圈，故由 [[#thm-bipartite]]，两时段的安排不可能。（较短的奇圈 $C, D, E$ 也说明了这一点。）若允许三个时段，$\{A, C\}$、$\{B, D\}$、$\{E\}$ 可行。
:::
:::

::: warning DFS 不寻找最短路径
人们禁不住想用 DFS 解决一切问题，因为递归版本如此简短。但深度优先树中从 $s$ 到 $v$ 的树路径可能比最短路径长得多：在 $n$ 个顶点的圈上从一个顶点出发，DFS 可能沿整整一圈才到达它的邻点——一条 $n - 1$ 条边的路径。求距离需要 BFS（有权时是 [[algorithms/shortest-paths]]）。反之，BFS 的完成次序毫无意义，所以拓扑排序和强连通分量需要 DFS（或 Kahn 的入度方法）。还有，一个顶点被*发现*并不等于它被*完成*：在拓扑排序中混淆 $u.d$ 与 $u.f$，在像 $a \to b$、$c \to a$ 这样的图上从 $a$ 起动搜索就会产生错误的次序。
:::

::: history
对迷宫的系统探索可上溯到十九世纪：Charles Pierre Trémaux 的通道标记法（由爱德华·卢卡斯（Édouard Lucas）于 1882 年记述）就是深度优先搜索。广度优先搜索由爱德华·穆尔（Edward F. Moore）于 1959 年发表（“The shortest path through a maze”），C. Y. Lee 于 1961 年在为电路板布线时也独立提出了它。卡恩（Kahn）在 1962 年一篇讨论大型工程调度的论文中给出了用于拓扑排序的入度算法。深度优先搜索的现代理论——时间戳、边的分类，以及双连通性、强连通分量与平面性的线性时间算法——由罗伯特·塔扬（Robert Tarjan）与约翰·霍普克罗夫特（John Hopcroft）于 1971–1974 年间创建；塔扬的论文 “Depth-first search and linear graph algorithms”（1972）给出了单趟求强连通分量的算法。萨·饶·科萨拉朱（S. Rao Kosaraju）于 1978 年发现了两趟算法（未发表），米哈·沙里尔（Micha Sharir）于 1981 年独立发表。霍普克罗夫特与塔扬荣获 1986 年图灵奖，部分原因正是这项工作。
:::

## 后续内容

BFS 可推广为 [[algorithms/shortest-paths]] 中的迪杰斯特拉算法，也可推广为 [[algorithms/network-flow]] 中求增广路径的搜索——Edmonds–Karp 算法正因为 BFS 能求最短路径而采用它。基于 DFS 的拓扑排序是 DAG 上的 [[algorithms/dynamic-programming]]、构建系统与电子表格重算的骨干。图搜索找到的连通分量还是 [[algorithms/greedy-algorithms]] 的起点：克鲁斯卡尔算法用并查集维护各连通分量。在 [[artificial-intelligence]] 中，BFS 和 DFS 成为无信息搜索策略，并经启发式精化为 A*。

::: summary
- 图搜索把从源点可达的每个顶点恰好访问一次；用邻接表时以 $\Theta(n + m)$ 运行。
- **BFS** 使用队列；其队列中至多出现两个相邻的距离值（[[#lem-bfs-queue]]），它计算无权图中的最短路径距离，并给出一棵最短路径树（[[#thm-bfs]]）。
- **DFS** 记录像括号一样嵌套的发现与完成时间（[[#thm-parenthesis]]）；**白路径定理**刻画了哪些顶点会成为后代（[[#thm-white-path]]）。
- 有向图无圈当且仅当 DFS 找不到**回边**（[[#thm-back-edge]]）；在 DAG 中，完成时间递减给出**拓扑序**（[[#thm-topo]]）。
- Kosaraju 算法在 $G$ 上运行 DFS，再按完成时间递减在 $G^{\mathsf T}$ 上运行 DFS，从而求出**强连通分量**（[[#thm-kosaraju]]）。
- 图是**二分图**当且仅当它不含奇圈；BFS 的分层给出一个 2-染色或一个奇圈（[[#thm-bipartite]]）。
:::

## 习题

::: exercise BFS 的距离 {level=1 check="3"}
在具有边 $1$–$2$、$1$–$3$、$2$–$4$、$3$–$4$、$4$–$5$、$5$–$6$、$3$–$6$ 的图中，从 $1$ 到 $5$ 的 BFS 距离是多少？（输入距离。）
::: solution
从 $1$ 出发：$2$ 和 $3$ 的距离为 $1$；$4$ 的距离为 $2$（经过 $2$ 或 $3$），$6$ 的距离为 $2$（经过 $3$）；$5$ 的距离为 $3$（经过 $4$ 或 $6$）。故 $\delta(1, 5) = 3$。
:::
:::

::: exercise 数时间戳 {level=1 check="18"}
在一个有 $9$ 个顶点的有向图上运行深度优先搜索。被赋出的最大时间戳是多少？（输入数字。）
::: solution
每个顶点得到两个时间戳——发现时刻与完成时刻——且 `time` 每次加一，所以时间戳恰为 $1, 2, \dots, 2n$。$n = 9$ 时最大者为 $18$——正如穿衣一例中，watch 在 $18$ 时刻完成。
:::
:::

::: exercise 边的类别 {level=1}
在有如下边的有向图上运行 DFS：$a \to b$、$b \to c$、$c \to a$、$a \to c$、$d \to c$，先从 $a$ 开始，再从 $d$ 开始，邻接表按字母序处理。对每条边分类。
::: solution
$a$ ($d = 1$) 探索 $b$ (2)，$b$ 探索 $c$ (3)；$c$ 指向 $a$ 的边发现 $a$ 为灰色：**回边**，于是有圈 $a \to b \to c \to a$。$c$ 完成 (4)，$b$ 完成 (5)。回到 $a$，边 $a \to c$ 发现 $c$ 为黑色且 $c.d = 3 > a.d = 1$：**前向边**。$a$ 完成 (6)。随后 $d$ (7) 探索 $c$，$c$ 为黑色且 $c.d < d.d$：**横叉边**；$d$ 完成 (8)。树边：$a \to b$、$b \to c$。
:::
:::

::: exercise 迭代 DFS {#ex-iterative-dfs level=2}
用显式栈写出一个非递归的 Python DFS，计算发现与完成时间，并在穿衣图上验证它给出与递归版本相同的时间戳。
::: solution
栈中存放（顶点，其邻接点的迭代器）二元对，于是顶点恰在其迭代器耗尽时完成——与递归调用一一对应。

```python
def dfs_iterative(adj):
    time, d, f = 0, {}, {}
    for s in adj:
        if s in d:
            continue
        time += 1; d[s] = time
        stack = [(s, iter(adj[s]))]
        while stack:
            u, it = stack[-1]
            for v in it:                       # 继续扫描 u 的邻接表
                if v not in d:
                    time += 1; d[v] = time
                    stack.append((v, iter(adj[v])))
                    break
            else:                              # 已无白色邻接点
                stack.pop()
                time += 1; f[u] = time
    return d, f

dag = {'shorts': ['trousers', 'shoes'], 'trousers': ['belt', 'shoes'],
       'belt': ['jacket'], 'shirt': ['belt', 'tie'], 'tie': ['jacket'],
       'jacket': [], 'socks': ['shoes'], 'shoes': [], 'watch': []}
d, f = dfs_iterative(dag)
print({u: (d[u], f[u]) for u in dag})
```

```console
$ python3 dfsit.py
{'shorts': (1, 10), 'trousers': (2, 9), 'belt': (3, 6), 'shirt': (11, 14), 'tie': (12, 13), 'jacket': (4, 5), 'socks': (15, 16), 'shoes': (7, 8), 'watch': (17, 18)}
```

时间戳一致。（把某个顶点的所有邻接点一次性压入栈中——一个常见的捷径——会以类似深度优先的次序访问顶点，却不能给出正确的完成时间。）
:::
:::

::: exercise Kahn 算法 {#ex-kahn level=2}
证明 Kahn 算法——反复删除一个入度为 $0$ 的顶点并输出它——在 $G$ 是 DAG 时输出一个拓扑序，在 $G$ 含圈时必然停步且有顶点剩余。
::: solution
*DAG 必有入度为 $0$ 的顶点：*否则从任一顶点沿入边不断后退就永不停止，$n + 1$ 步之后必有顶点重复，形成一个圈。从 DAG 中删除一个顶点剩下的仍是 DAG，故算法总能继续直到输出所有顶点。*次序：*当 $v$ 被输出时，它在剩余图中的入度为 $0$，所以每个有边 $(u, v)$ 的 $u$ 都已被输出：每条边都指向前方。*圈：*圈上的顶点不可能在其圈上前驱之前被输出，故圈上没有顶点会被输出；算法停步时它们被剩下。
:::
:::

::: exercise 分量图 {level=2 check="3"}
具有边 $1\to2$、$2\to3$、$3\to1$、$3\to4$、$4\to5$、$5\to6$、$6\to4$、$6\to7$ 的图有几个强连通分量？画出它的分量图。（输入分量数。）
::: solution
$1 \to 2 \to 3 \to 1$ 是一个圈，故 $\{1, 2, 3\}$ 在同一个分量中；同理 $\{4, 5, 6\}$（圈 $4 \to 5 \to 6 \to 4$）。（$\{4, \dots, 7\}$ 中没有顶点能到达 $\{1, 2, 3\}$（没有边指回去），而 $7$ 没有出边，故它独自成一个分量。）共有 $3$ 个分量，分量图是路径 $\{1,2,3\} \to \{4,5,6\} \to \{7\}$，如它必然的那样是一个 DAG。
:::
:::

::: exercise 是二分图吗 {level=1}
判定立方体图（顶点为 $8$ 个长度为 $3$ 的二进制串，只差一位的两个串之间有边）与 Petersen 图是否为二分图。
::: solution
立方体图是二分图：按串中 $1$ 的个数的奇偶染色；翻转一位会改变奇偶，故每条边的两端颜色不同。Petersen 图不是：其外圈是一个 $5$-圈，即奇圈，故由 [[#thm-bipartite]] 不存在 2-染色。
:::
:::

::: exercise 半连通性 {level=3}
若有向图对每一对顶点 $u, v$，都存在从 $u$ 到 $v$ 或从 $v$ 到 $u$ 的路径，则称它是**半连通**的。给出一个 $O(n + m)$ 的算法判定半连通性，并证明其正确。
::: solution
在 $O(n + m)$ 内求出各强连通分量与分量图 $H$（一个 DAG），把 $H$ 拓扑排序为 $C_1, \dots, C_k$，当且仅当对每个 $i < k$，$H$ 都有边 $(C_i, C_{i+1})$ 时回答“是”。*正确性：*强连通分量内任意两点互达，故 $G$ 半连通当且仅当任意两个分量在 $H$ 中按可达性可比。若所有边 $C_i \to C_{i+1}$ 都存在，则 $H$ 中含一条按序经过所有分量的路径，于是每个 $C_i$ 都能到达每个 $j > i$ 的 $C_j$。反之，若某条边 $C_i \to C_{i+1}$ 不存在，则 $C_{i+1}$ 不能到达 $C_i$（$H$ 中的边按拓扑序向前），而 $C_i$ 也不能到达 $C_{i+1}$：从 $C_i$ 到 $C_{i+1}$ 的路径必须经过某个在序中严格位于二者之间的分量，但这样的分量不存在，而直接的边又缺失。
:::
:::

::: exercise 最短路径计数 {level=3}
修改 BFS，使它还对每个顶点 $v$ 计算从 $s$ 到 $v$ 的不同最短路径的条数 $N(v)$，而运行时间仍为 $O(n + m)$（计数运算视为常数时间）。证明其正确，并求 [[#ex-bfs]] 中的图的 $N(f)$。
::: solution
置 $N(s) = 1$，其余 $N(v) = 0$。从出队顶点 $u$ 扫描边 $(u, v)$ 时：若 $v$ 未被发现，照常发现它（使 $v.d = u.d + 1$）并置 $N(v) \gets N(u)$；若 $v$ 已被发现且 $v.d = u.d + 1$，则加上 $N(v) \gets N(v) + N(u)$。

*正确性。*到 $v \ne s$ 的最短路径由到某个满足 $\delta(s, u) = \delta(s, v) - 1$ 的 $u$ 的一条最短路径加上边 $(u, v)$ 构成，而不同的 $u$ 或到 $u$ 的不同路径给出不同的路径，故 $N(v) = \sum N(u)$，对满足 $\delta(s, u) = \delta(s, v) - 1$ 的边 $(u, v)$ 求和。算法恰好加上这些项：由 [[#thm-bfs]]，$u.d = \delta(s, u)$，且每条进入 $v$ 的边都在其尾出队时被扫描一次。还须看到 $u$ 出队时 $N(u)$ 已定终值：$N(u)$ 的一切贡献都来自距离为 $\delta(s, u) - 1$ 的顶点，而它们先于 $u$ 出队，因为顶点按距离的非降次序离队（[[#lem-bfs-queue]]）。于是对距离归纳，每个 $N(u)$ 在被使用时都已正确。附加的功为每条边 $O(1)$。

*例。*$N(s) = 1$；$N(a) = N(b) = 1$；$N(c) = N(a) + N(b) = 2$（来自 $a$ 和 $b$ 的边）；$N(d) = N(b) = 1$；$N(e) = N(c) + N(d) = 3$；$N(f) = N(e) = 3$。到 $f$ 的三条最短路径是 $s\,a\,c\,e\,f$、$s\,b\,c\,e\,f$ 和 $s\,b\,d\,e\,f$。
:::
:::
