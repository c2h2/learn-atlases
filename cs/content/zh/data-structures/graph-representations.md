导航应用要在含有数千万路口的路网中找一条路线。社交网络根据“朋友的朋友”推荐“也许认识的人”。构建系统在一次改动之后决定重新编译哪些文件；编译器通过给一张图染色来分配寄存器，图中的变量是同时活跃的；搜索引擎顺着超链接给网页排名。这些工作都是在**图**——由成对连接联结起来的对象集合——上进行的，而其中第一个决策总是：如何把图存进内存。这个在**邻接矩阵**与**邻接表**（以及几种变体）之间的选择，决定了程序需要多少内存，也决定了它能多快回答每个图算法都要问的两个基本问题：*$u$ 到 $v$ 之间有边吗？*以及*$u$ 的邻点是哪些？*

本章引入计算机科学其余部分通用的图术语，给出标准表示以及每个基本操作的精确代价，并说明为什么对实际中遇到的稀疏图，邻接表能让图上搜索在以图的大小为线性的时间内完成。算法本身——广度优先与深度优先搜索、最短路径、生成树、流——属于 [[algorithms]]；这里铺好它们运行的地面。图的数学在[数学图谱：图](/learn/maths/lesson.php?c=discrete&l=graphs)中展开。

## 图的术语

::: definition 图 {#def-graph}
**图** $G = (V, E)$ 由一个有限集 $V$，其元素称为**顶点**（或结点），以及一个**边**的集合 $E$ 组成。**无向图**中每条边是一个互异顶点的无序对 $\set{u, v}$；**有向图**（digraph）中每条边是一个有序对 $(u, v)$，即一条从 $u$ 到 $v$ 的**弧**（并且可能允许 $u = v$，即**自环**）。记 $n = \lvert V\rvert$，$m = \lvert E\rvert$。**带权**图还带有一个函数 $w\colon E \to \R$，给每条边一个权（长度、费用或容量）。
:::

术语一览：

- 在无向图中，若 $\set{u, v} \in E$，则 $u$ 与 $v$ **相邻**（互为邻点）；**度** $\deg(v)$ 是 $v$ 的邻点个数。在有向图中，$v$ 的**出度**是离开它的弧数，**入度**是进入它的弧数。
- **路径**是一个顶点序列 $v_0, v_1, \dots, v_k$，其中相邻的顶点由边相连（有向图中是弧，且全部朝前进方向）；它的**长度**是 $k$，即边数。若无顶点重复，称之为**简单**的。**回路**是长度至少为 $1$（无向图中至少为 $3$）、回到起点且除起点外无重复顶点的路径。允许重复的序列称为**途径**（walk）。
- 无向图是**连通的**，如果每对顶点之间都有路径相连；它的极大连通子图称为**连通分量**。无回路的连通图是**树**（[[data-structures/trees]]）；无有向回路的有向图是**有向无环图**（DAG）。

本章的图都是**简单**的——没有自环（除非另有说明，指有向图）也没有重边——所以无向图至多有 $\binom n2 = n(n-1)/2$ 条边，有向图至多有 $n(n-1)$ 条弧（允许自环则为 $n^2$）。若 $m$ 接近该最大值 $\Theta(n^2)$，图称为**稠密**；若 $m$ 远小于它——典型的是 $O(n)$ 或 $O(n\log n)$——则称为**稀疏**。实际遇到的图大多是稀疏的：一个路口只有几条路，一个人相对于亿万人口只有几百个朋友，一个网页只有几十条链接。

::: proposition 握手引理 {#prop-handshake}
无向图中 $\sum_{v \in V}\deg(v) = 2m$。有向图中 $\sum_{v}\text{出度}(v) = \sum_v \text{入度}(v) = m$。
:::

::: proof
每条无向边 $\set{u, v}$ 恰给 $\deg(u)$ 贡献 $1$、给 $\deg(v)$ 贡献 $1$，因此在总和中恰被数两次。每条弧 $(u, v)$ 给 $u$ 的出度贡献 $1$、给 $v$ 的入度贡献 $1$。
:::

这个小恒等式是图算法中一切线性时间界的底牌：一个在每个顶点 $v$ 处做 $O(1 + \deg(v))$ 工作的算法总共做 $O(n + m)$ 工作。（一个值得记住的推论：度为奇数的顶点个数总是偶数。）

## 邻接矩阵

::: definition 邻接矩阵 {#def-adj-matrix}
把顶点编号为 $0, \dots, n-1$。$G$ 的**邻接矩阵**是 $n \times n$ 矩阵 $A$，当 $u$ 到 $v$ 有边时 $A[u][v] = 1$，否则 $A[u][v] = 0$。无向图的 $A$ 对称且对角线为零。带权图则在 $1$ 的位置存 $w(u, v)$，在没有边的位置存一个哨兵值，如 $\infty$（或 `None`）。
:::

检验 $u$ 与 $v$ 是否相邻是一次数组访问，$O(1)$；加边或删边是 $O(1)$。但列出 $u$ 的邻点意味着扫完一整行，*无论 $u$ 的邻点有多*少*都要 $\Theta(n)$ 时间*，而且无论 $m$ 是多少矩阵都占 $\Theta(n^2)$ 空间。位矩阵按每字 $64$ 位打包，用 $n^2/8$ 字节。

::: widget relation
set: 0; 1; 2; 3; 4
pairs: 0,1; 1,0; 0,2; 2,0; 1,2; 2,1; 1,3; 3,1; 3,4; 4,3
view: properties
name: E
caption: [[#ex-two-reps]] 的图作为 $\set{0,1,2,3,4}$ 上的关系 $E$：这张 0–1 矩阵就*是*它的邻接矩阵，而右边的图就是那个图，每条无向边画成一对弧。该关系对称（无向图）且反自反（无自环）。点击一个条目添加或删去一条弧，看对称性如何被破坏：你就得到了一个有向图。第 $u$ 行列出 $u$ 的邻点；一行求和便是度数。
:::

矩阵的观点还把图与线性代数联系起来。$A$ 的幂计数途径：

::: theorem 邻接矩阵的幂计数途径 {#thm-walks}
对每个 $k \ge 1$，元素 $(A^k)[u][v]$ 是从 $u$ 到 $v$ 的长度为 $k$ 的途径条数。
:::

::: proof
对 $k$ 归纳。$k = 1$ 时，$A[u][v]$ 为 $1$ 恰当存在从 $u$ 到 $v$ 的长度 $1$ 的途径（一条边）。$k \ge 1$ 时，每条从 $u$ 到 $v$ 的长度 $k+1$ 的途径由一条从 $u$ 到某个顶点 $x$ 的长度 $k$ 的途径、后接一条从 $x$ 到 $v$ 的边构成，且 $x$ 或前半段取法不同就给出不同的途径。于是这样的途径数为

$$
\sum_{x} (A^k)[u][x]\cdot A[x][v] = (A^k A)[u][v] = (A^{k+1})[u][v],
$$

第一个因子用了归纳假设，最后一步用了矩阵乘法的定义。
:::

特别地，无向图中 $(A^2)[v][v] = \deg(v)$（沿一条边走出去再走回来），而 $A^3$ 的迹是三角形个数的 $6$ 倍，因为每个三角形从它的 $3$ 个顶点中的每个、沿 $2$ 个方向各给出一条长度为 $3$ 的闭途径。计算 $A^k$ 要做矩阵乘法，显然的算法每次 $\Theta(n^3)$——对小而稠密的图尚可，对路网则毫无希望。图上的线性代数（谱方法、PageRank）在[数学图谱：线性代数](/learn/maths/lesson.php?c=linear-algebra&l=matrices)与 [[information-retrieval]] 中展开。

## 邻接表

::: definition 邻接表 {#def-adj-list}
$G$ 的**邻接表**表示为每个顶点 $u$ 存一个表 $\mathit{adj}[u]$，含所有使 $u$ 到 $v$ 有边的顶点 $v$（带权图里 $v$ 旁边放着权 $w(u, v)$）。无向图中每条边 $\set{u, v}$ 出现两次：作为 $\mathit{adj}[u]$ 中的 $v$ 和作为 $\mathit{adj}[v]$ 中的 $u$。这些表存放在一个按顶点索引的数组（或以顶点名为键的哈希表）中。
:::

由 [[#prop-handshake]]，无向图的邻接表共含 $2m$ 个条目，有向图含 $m$ 个，所以该表示占 $\Theta(n + m)$ 空间——每个顶点一格，每条边的每个端点一格。列出 $u$ 的邻点花 $\Theta(\deg(u))$ 时间，已是最好可能。代价是边检验：判定 $v \in \mathit{adj}[u]$ 要扫一遍表，$O(\deg(u))$。

::: example 同一个图的两种表示 {#ex-two-reps}
为顶点 $0, \dots, 4$、边为 $\set{0,1}, \set{0,2}, \set{1,2}, \set{1,3}, \set{3,4}$ 的无向图建立两种表示，并验证握手引理。
::: solution
```python
edges = [(0, 1), (0, 2), (1, 2), (1, 3), (3, 4)]   # 无向图
n = 5

# 邻接矩阵：n x n，有边处填 1
matrix = [[0] * n for _ in range(n)]       # n 个互不相同的行（见下面的警告）
for u, v in edges:
    matrix[u][v] = matrix[v][u] = 1

# 邻接表：每个顶点一个邻点表
adj = [[] for _ in range(n)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

for row in matrix:
    print(row)
print(adj)
print("degrees:", [len(nbrs) for nbrs in adj], "sum =", sum(map(len, adj)))
```

```console
$ python3 reps.py
[0, 1, 1, 0, 0]
[1, 0, 1, 1, 0]
[1, 1, 0, 0, 0]
[0, 1, 0, 0, 1]
[0, 0, 0, 1, 0]
[[1, 2], [0, 2, 3], [0, 1], [1, 4], [3]]
degrees: [2, 3, 2, 2, 1] sum = 10
```

矩阵有 $25$ 个元素，其中 $10$ 个是 $1$；邻接表恰好装下那 $10$ 个条目，每条边两个。度数之和为 $10 = 2m$，与 [[#prop-handshake]] 一致。矩阵中顶点 $1$ 的那一行与它的表 `[0, 2, 3]` 携带同样的信息；表只是省掉了零。
:::
:::

::: warning 用 `[[0] * n] * n` 建矩阵的陷阱
在 Python 中，`[[0] * n] * n` 并**不**创建 $n$ 行：它创建了*一个*行和一个含 $n$ 个指向它的引用的表。于是 `m[0][1] = 1` 会把每一行的第 $1$ 列都置起来：

```python
m = [[0] * 3] * 3
m[0][1] = 1
print(m)
```

```console
[[0, 1, 0], [0, 1, 0], [0, 1, 0]]
```

要用 `[[0] * n for _ in range(n)]`，它对每一行都重新求值 `[0] * n`。（里面的 `[0] * n` 是安全的，因为整数不可变。同样的陷阱也会以 `[[]] * n` 的形式在邻接表上等着你。）
:::

### 变体

**邻接集合。** 把每个表换成哈希集合（[[data-structures/hash-tables]]），边检验变为期望 $O(1)$，同时保持 $\Theta(n + m)$ 空间与 $\Theta(\deg(u))$ 的邻点遍历，代价是每个条目的常数更大，并且失去邻点的固定次序。在 Python 中，把每个顶点映到一个邻点 `set` 的 `dict` 是一种灵活的通用表示，还支持任意名字的顶点与边的快速删除。

**边表。** 就是 $m$ 条边的一个表，如上面代码中的 `edges` 变量。它是自然的输入格式，适合按某种次序处理边的算法——克鲁斯卡尔最小生成树算法要给边按权排序——但它对两个基本问题都回答不快。

**压缩稀疏行（CSR）。** 对规模大且不改变的图，邻接表可以打包进两个数组：`targets` 把所有表首尾相接存成一串，`offsets` 中 `offsets[u]` 是 $u$ 的表的起始位置，于是 $u$ 的邻点就是 `targets[offsets[u]:offsets[u+1]]`。它只用 $n + 1 + m$ 个整数，没有每表的额外开销，局部性完美，因此科学计算、图分析库与稀疏矩阵代码都用它。

::: example 建立 CSR 与反转有向图 {#ex-csr}
把顶点 $0..3$、弧为 $(0,1), (0,2), (1,2), (2,0), (2,3), (3,3)$ 的有向图转换为 CSR 形式，再以 $O(n + m)$ 时间求出它的**转置**（所有弧反向）。
::: solution
数出各顶点的出度得 $2, 1, 2, 1$；求前缀和得 `offsets = [0, 2, 3, 5, 6]`；然后把每条弧写进它所在行的下一个空位。

```python
def to_csr(n, arcs):
    """Compressed sparse row form of a directed graph with vertices 0..n-1."""
    offsets = [0] * (n + 1)
    for u, _ in arcs:
        offsets[u + 1] += 1               # 数每个顶点的出度
    for u in range(n):
        offsets[u + 1] += offsets[u]      # 前缀和：每行从哪里开始
    targets = [None] * len(arcs)
    fill = offsets[:]                     # 每行的下一个空位
    for u, v in arcs:
        targets[fill[u]] = v
        fill[u] += 1
    return offsets, targets

def reverse(n, offsets, targets):         # 转置图，耗时 O(n + m)
    arcs = [(targets[i], u) for u in range(n)
            for i in range(offsets[u], offsets[u + 1])]
    return to_csr(n, arcs)

arcs = [(0, 1), (0, 2), (1, 2), (2, 0), (2, 3), (3, 3)]
off, tgt = to_csr(4, arcs)
print(off, tgt)
print("out-neighbours of 2:", tgt[off[2]:off[3]])
print(reverse(4, off, tgt))
```

```console
$ python3 csr.py
[0, 2, 3, 5, 6] [1, 2, 2, 0, 3, 3]
out-neighbours of 2: [0, 3]
([0, 1, 2, 4, 6], [2, 0, 0, 1, 2, 3])
```

转置图中，顶点 $2$ 的入邻点 $0$ 和 $1$ 成了它的出邻点（`targets[2:4] = [0, 1]`），$3$ 处的自环保留不变。每个函数对 $n$ 个顶点与 $m$ 条弧做常数次遍历，所以两者都是 $\Theta(n + m)$。用邻接矩阵时转置就是矩阵转置，$\Theta(n^2)$。[[algorithms]] 中的强连通分量算法就需要转置，这是它的一个用武之地。
:::
:::

## 代价对比

对 $n$ 个顶点、$m$ 条边的图（无向图的入度与出度就是度）：

| 操作 | 邻接矩阵 | 邻接表 | 邻接集合（哈希） |
|---|---|---|---|
| 空间 | $\Theta(n^2)$ | $\Theta(n + m)$ | $\Theta(n + m)$ |
| $(u, v)$ 是边吗？ | $O(1)$ | $O(\deg(u))$ | 期望 $O(1)$ |
| 列出 $u$ 的邻点 | $\Theta(n)$ | $\Theta(\deg(u))$ | $\Theta(\deg(u))$ |
| 加一条边 | $O(1)$ | 摊还 $O(1)$ | 期望摊还 $O(1)$ |
| 删一条边 | $O(1)$ | $O(\deg(u) + \deg(v))$ | 期望 $O(1)$ |
| 加一个顶点 | $\Theta(n^2)$（重建）；留有冗余容量则摊还 $\Theta(n)$ | 摊还 $O(1)$ | 摊还 $O(1)$ |
| 访问每条边 | $\Theta(n^2)$ | $\Theta(n + m)$ | $\Theta(n + m)$ |

最后一行是关键的。图的搜索算法把每个顶点处理一次并检查它的全部邻点，所以运行时间由邻点遍历的代价决定。

::: theorem 图上搜索的线性时间 {#thm-search-cost}
以队列和距离数组实现的从顶点 $s$ 出发的广度优先搜索，在邻接表上最坏情况（每个顶点都能从 $s$ 到达时）运行 $\Theta(n + m)$ 时间，在邻接矩阵上运行 $\Theta(n^2)$ 时间。
:::

::: proof
每个顶点至多入队一次——在它第一次被发现时，此时它的距离被确定，此后再也不会入队——于是也至多出队一次。顶点 $u$ 出队时，算法检查它的邻点。用邻接表这花 $\Theta(1 + \deg(u))$（有向图为出度）；对所有顶点求和并用 [[#prop-handshake]]，至多 $\sum_u (1 + \deg(u)) = n + 2m$（或有向图 $n + m$），再加上初始化距离数组的 $\Theta(n)$：所有顶点都可达时为 $\Theta(n + m)$。用矩阵时，检查 $u$ 的邻点要扫它那一整行，不论度数都是 $\Theta(n)$，于是 $n$ 个出队的顶点花 $\Theta(n^2)$。
:::

由于 $m \le n^2$，$\Theta(n + m)$ 渐近地从不比 $\Theta(n^2)$ 差，而对稀疏图它好得多。下面是并排的两种版本（BFS 本身在 [[data-structures/stacks-queues]] 中讲解——那里的动图演示了它——并在 [[algorithms]] 中作完整分析）：

```python
from collections import deque

def bfs_distances(adj, s):
    """Edge-count distances from s; adj[u] lists the neighbours of u."""
    dist = [None] * len(adj)
    dist[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:              # 每条边的端点处检查一次：deg(u) 步
            if dist[v] is None:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

def bfs_distances_matrix(matrix, s):
    n = len(matrix)
    dist = [None] * n
    dist[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for v in range(n):            # 扫描整行：每个顶点 n 步
            if matrix[u][v] and dist[v] is None:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

adj = [[1, 2], [0, 2, 3], [0, 1], [1, 4], [3]]
matrix = [[1 if v in adj[u] else 0 for v in range(5)] for u in range(5)]
print(bfs_distances(adj, 0), bfs_distances_matrix(matrix, 0))
```

```console
$ python3 bfs.py
[0, 1, 1, 2, 3] [0, 1, 1, 2, 3]
```

要看出差别的量级，在一张 $n = 4000$ 个顶点、$m = 8000$ 条边的随机稀疏图上用上面两个函数计时：

```python
import random, time

random.seed(9)
n, m = 4000, 8000
adj = [[] for _ in range(n)]
for _ in range(m):                        # 一张随机稀疏图
    u, v = random.randrange(n), random.randrange(n)
    adj[u].append(v)
    adj[v].append(u)
matrix = [[0] * n for _ in range(n)]
for u in range(n):
    for v in adj[u]:
        matrix[u][v] = 1

for name, f, g in [("lists", bfs_distances, adj), ("matrix", bfs_distances_matrix, matrix)]:
    t = time.perf_counter()
    d = f(g, 0)
    print(f"{name:6}: {time.perf_counter() - t:.4f} s, reached {sum(x is not None for x in d)} vertices")
```

作者机器上的一次运行（2026 年；只是个观察，你的时间会不同）打印了

```console
lists : 0.0012 s, reached 3918 vertices
matrix: 0.5107 s, reached 3918 vertices
```

表版本检查了约 $n + 2m = 20\,000$ 个条目，矩阵版本约 $3918 \times 4000 \approx 1.6\times10^7$ 个，比值约 $800$；实测比值约 $400$，小一些，因为扫描矩阵的一行比顺着表走一圈的内层循环更简单。（这张随机图恰好留下了 $82$ 个从 $0$ 不可达的顶点。）

::: widget graph
nodes: 0@0,1; 1@1,1; 2@0.5,0; 3@2,1; 4@3,1
edges: 0-1; 0-2; 1-2; 1-3; 3-4
algorithm: bfs
start: 0
caption: 在 [[#ex-two-reps]] 的图上做广度优先搜索。每次一个顶点从队列中取出，算法就看它的邻点：用邻接表就是 $\deg(u)$ 个条目——$2$、$3$、$2$、$2$、$1$，共十个——而矩阵要扫描每行全部 $5$ 个条目，共 $25$ 个。求得的距离 $0, 1, 1, 2, 3$ 与上面的程序一致。
:::

::: example 选择表示 {#ex-choose}
一张路网有 $n = 2\times10^7$ 个路口和 $m = 5\times 10^7$ 条路段。估算 (a) 位矩阵与 (b) CSR 形式邻接表（顶点编号占 4 字节、权占 4 字节）各需要多少内存。做路线规划你会用哪个？
::: solution
(a) $n^2 = 4\times10^{14}$ 位 $= 5\times10^{13}$ 字节 $= 50$ TB；若带权（每元素 4 字节）则是 $1.6$ PB——远超截至 2026 年任何单台机器的容量，而且其中几乎全是零：非零元素的比例是 $2m/n^2 = 2.5\times10^{-7}$。

(b) 每条无向路段要存两次，所以有 $2m = 10^8$ 个 8 字节的表条目（目标顶点与权）：$800$ MB，另有 $n + 1$ 个 4 字节的偏移量：$80$ MB。总共约 $880$ MB，装得进一台普通计算机的内存。

邻接表（取 CSR 形式，因为道路很少变动）是唯一明智的选择。边检验“$u$ 到 $v$ 有路吗”本来也不是路线规划要问的问题：迪杰斯特拉（Dijkstra）算法（[[data-structures/heaps]]）自始至终只遍历邻点。
:::
:::

::: example 计数途径与三角形 {#ex-walks}
对 [[#ex-two-reps]] 的图计算 $A^2$ 与 $A^3$。从 $0$ 到 $3$ 有多少条长度为 $3$ 的途径？这个图有几个三角形？
::: solution
```python
def mat_mult(X, Y):
    n = len(X)
    return [[sum(X[i][k] * Y[k][j] for k in range(n)) for j in range(n)]
            for i in range(n)]

A = [[0, 1, 1, 0, 0],
     [1, 0, 1, 1, 0],
     [1, 1, 0, 0, 0],
     [0, 1, 0, 0, 1],
     [0, 0, 0, 1, 0]]
A2 = mat_mult(A, A)
A3 = mat_mult(A2, A)
for row in A2:
    print(row)
print("walks of length 3 from 0 to 3:", A3[0][3])
print("triangles:", sum(A3[i][i] for i in range(5)) // 6)
```

```console
$ python3 walks.py
[2, 1, 1, 1, 0]
[1, 3, 1, 0, 1]
[1, 1, 2, 1, 0]
[1, 0, 1, 2, 0]
[0, 1, 0, 0, 1]
walks of length 3 from 0 to 3: 1
triangles: 1
```

$A^2$ 的对角线就是度序列 $2, 3, 2, 2, 1$。$(A^2)[0][3] = 1$ 数的是唯一那条途径 $0, 1, 3$。由 [[#thm-walks]]，从 $0$ 到 $3$ 恰有一条长度为 $3$ 的途径；它就是 $0, 2, 1, 3$（途径 $0, 1, x, 3$ 需要 $1$ 与 $3$ 的公共邻点 $x$，而它不存在）。$A^3$ 的迹是 $6$，所以有 $6/6 = 1$ 个三角形，即 $\set{0, 1, 2}$。
:::
:::

::: quiz
一张图有 $n = 10^4$ 个顶点、$m = 3\times10^4$ 条边，你的算法要对 $10^6$ 个任意的对问“$u$ 与 $v$ 相邻吗”，从不列出邻点。哪种表示最好？
- [ ] 邻接表，因为图是稀疏的
- [x] 邻接集合（或边集的哈希集合）；$n^2$ 位装得下的话用位矩阵
- [ ] 边表
- [ ] 无所谓
::: solution
边检验用邻接表是 $O(\deg(u))$，用边表是 $O(m)$。哈希集合在 $\Theta(n + m)$ 空间里给期望 $O(1)$。这里位矩阵也可行——$10^8$ 位是 $12.5$ MB——而且给出最坏情况 $O(1)$ 的检验，常数还非常好。合适的表示取决于算法问什么问题，而不只是稀疏与否。
:::
:::

::: quiz
$n = 7$ 个顶点的无向图的度依次为 $3, 3, 2, 2, 2, 1, 1$。它有几条边？
- [ ] $14$
- [x] $7$
- [ ] $12$
- [ ] 这样的图不可能存在。
::: solution
度数之和为 $14 = 2m$，故 $m = 7$（[[#prop-handshake]]）。和是偶数，这是必然的；和为奇数的度序列（如 $3, 2, 2$）不可能实现。
:::
:::

::: history
图论始于欧拉（Euler）对柯尼斯堡七桥问题的解答——1735 年宣读、1741 年发表——它证明不存在每条桥恰好经过一次的走法。“图”（graph）一词是西尔维斯特（James Joseph Sylvester）在 1878 年引入的，类比化学中的图示记法；克尼希（Dénes Kőnig）的 *Theorie der endlichen und unendlichen Graphen*（1936）是第一本图论教科书。在计算领域，邻接矩阵是早期天然的表示，许多早期图算法的运行时间是 $\Theta(n^2)$ 甚至更差。霍普克罗夫特（John Hopcroft）与塔扬（Robert Tarjan）在 1970 年代初的工作——塔扬的 "Depth-first search and linear graph algorithms"（*SIAM Journal on Computing*，1972）与两人的 "Efficient algorithms for graph manipulation"（*Communications of the ACM*，1973）——使邻接表成为标准，他们证明借助它，深度优先搜索能以 $O(n + m)$ 时间解决连通性、双连通性与平面性等问题；霍普克罗夫特与塔扬获得 1986 年图灵奖（Turing Award）的原因之一正是这项工作。
:::

## 后续内容

图以邻接表存放后，[[algorithms]] 中的算法就能以这样的时间运行：广度优先与深度优先搜索、拓扑排序与强连通分量为 $O(n + m)$，配二叉堆的迪杰斯特拉最短路为 $O((n + m)\log n)$（[[data-structures/heaps]]），最小生成树为 $O(m\log n)$。图数据库与网络分析（[[databases]]、[[information-retrieval]]）对几十亿条边的图使用类 CSR 布局，分布式图处理则把它们划分到各台机器上（[[distributed-systems]]）。在 [[networks]] 中，路由器本身就构成一张图，路由协议计算的正是它的最短路径。本章为课程收官：本课程中的每一种结构——数组、链表、栈、队列、哈希表、树、堆——都出现在随后的图算法内部。

::: summary
- **图** $G = (V, E)$（[[#def-graph]]）有 $n$ 个顶点、$m$ 条边，可有向可无向、可带权；简单图有 $m \le n(n-1)/2$（无向）。多数真实图是稀疏的。
- 无向图的度数之和为 $2m$（[[#prop-handshake]]），它把“每个顶点 $O(1 + \deg(v))$”变成总共 $O(n + m)$。
- **邻接矩阵**（[[#def-adj-matrix]]）占 $\Theta(n^2)$ 空间，边检验 $O(1)$，列邻点 $\Theta(n)$；它的幂计数途径（[[#thm-walks]]）。
- **邻接表**（[[#def-adj-list]]）占 $\Theta(n + m)$ 空间，列邻点 $\Theta(\deg(u))$，但边检验要 $O(\deg(u))$；邻接集合另加期望 $O(1)$ 的边检验。
- 图上搜索用表为 $\Theta(n + m)$、用矩阵为 $\Theta(n^2)$（[[#thm-search-cost]]）；稀疏图默认用表。
- **CSR** 把邻接表打包进两个数组，适合大规模静态图；边表适合按边次序处理的算法，如克鲁斯卡尔。
- 按算法执行的操作和图的稠密程度来选择表示。
:::

## 习题

::: exercise 边数的最大值 {level=1 check="190"}
$20$ 个顶点的简单无向图最多有多少条边？（填入数目。）
::: solution
$\binom{20}{2} = 20\cdot19/2 = 190$。无自环的简单有向图可以有双倍数目的弧，$380$ 条。
:::
:::

::: exercise 由表到矩阵 {level=1}
顶点 $0..3$ 的有向图的邻接表为 `[[1, 3], [2], [0, 3], []]`。写出它的邻接矩阵、各顶点的入度与出度，并验证有向情形的握手引理。
::: solution
$$
A = \begin{pmatrix} 0 & 1 & 0 & 1 \\ 0 & 0 & 1 & 0 \\ 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix}.
$$
出度（行和）：$2, 1, 2, 0$。入度（列和）：$1, 1, 1, 2$。两者之和都是 $5 = m$。
:::
:::

::: exercise 矩阵的内存 {level=1 check="1250000000"}
$n = 10^5$ 个顶点的图，其位邻接矩阵需要多少字节？（填入字节数。）
::: solution
$n^2 = (10^5)^2 = 10^{10}$ 位，$10^{10}/8 = 1.25\times10^9$ 字节，约 $1.25$ GB（即 $1.16$ GiB）——对一张若每个顶点只有几条边、做成邻接表只需几兆字节的图来说，这已经相当多了。
:::
:::

::: exercise 各表示下的度 {level=2}
求无向图每个顶点的度，(a) 从以 Python 表存放的邻接表，(b) 从邻接矩阵，(c) 从边表，各要多久？给出算法。
::: solution
(a) `[len(adj[u]) for u in range(n)]`：Python 的表存着自己的长度，故 $\Theta(n)$。（若不存长度，走一遍各表要 $\Theta(n + m)$。）(b) 对每行求和：$\Theta(n^2)$。(c) 从一个 $n$ 元零数组出发，对每条边的两个端点各加 $1$：$\Theta(n + m)$。
:::
:::

::: exercise 公共邻点 {level=2}
写一个函数，输入邻接集合（顶点到邻点 `set` 的 `dict`），返回 $u$ 与 $v$ 的公共邻点个数，并说明其期望运行时间。要为一个顶点 $u$ 找出与 $u$ 不相邻且公共邻点最多的顶点 $v \ne u$（“也许认识的人”），你该怎么做？
::: solution
```python
def common(adj, u, v):
    small, large = sorted((adj[u], adj[v]), key=len)
    return sum(1 for x in small if x in large)     # 期望 O(min(deg u, deg v))
```

遍历较小的集合、在较大的集合中做成员检验，期望花 $O(\min(\deg u, \deg v))$ 时间（Python 的 `len(adj[u] & adj[v])` 做的是同一件事）。要做推荐，就沿“朋友的朋友”走：对 $u$ 的每个邻点 $x$ 和 $x$ 的每个满足 $y \ne u$ 且 $y \notin \mathit{adj}[u]$ 的邻点 $y$，在字典中把 $y$ 的计数加一；返回计数最大的 $y$。这期望花 $O(\sum_{x \in \mathit{adj}[u]} \deg x)$ 时间，对非常受欢迎的 $x$ 可能很大——真实系统会对这类贡献做抽样或截断。
:::
:::

::: exercise 三角形 {level=2 check="4"}
完全图 $K_4$ 有几个三角形？对它的邻接矩阵计算 $A^3$ 的迹来验证。（填入三角形个数。）
::: solution
$4$ 个顶点中任取 $3$ 个都是一个三角形：$\binom43 = 4$。对 $K_4$，$A = J - I$（全 1 矩阵减去单位矩阵），$A^3$ 的对角元素等于从一个顶点出发的长度为 $3$ 的闭途径条数：选第二个顶点（$3$ 种）和第三个顶点（$2$ 种，与前两个都不同，然后返回）：$6$。迹为 $4 \cdot 6 = 24$，$24/6 = 4$ 个三角形。
:::
:::

::: exercise 数途径不等于数路径 {level=3}
(a) 证明 $(A^k)[u][v] > 0$ 当且仅当存在一条从 $u$ 到 $v$、长度恰为 $k$ 的途径，并由此得出一个用矩阵幂判定 $v$ 是否从 $u$ 可达的 $O(n^4)$ 算法。(b) 解释为什么 $A^k$ 不能直接数长度为 $k$ 的*简单*路径，并给一个小图的例子。(c) 为什么说 BFS（[[#thm-search-cost]]）是判定可达性好得多的办法？
::: solution
(a) 由 [[#thm-walks]] 立得：该元素数的就是这样的途径。若 $v$ 从 $u$ 可达（$u \ne v$），最短路是一条长度不超过 $n - 1$ 的简单路径，于是 $v$ 可达当且仅当 $(A + A^2 + \dots + A^{n-1})[u][v] > 0$。计算这 $n - 1$ 个幂、每次乘法 $\Theta(n^3)$，共 $\Theta(n^4)$（或用布尔运算对 $I + A$ 反复平方则 $O(n^3\log n)$）。

(b) 途径允许重复顶点。在 [[#ex-two-reps]] 的图中，$(A^2)[0][0] = 2$ 数的是途径 $0, 1, 0$ 与 $0, 2, 0$，它们都不是路径；而 $(A^3)[0][1] = 4$ 数了 $0,1,0,1$；$0,2,0,1$；$0,1,2,1$ 与 $0,1,3,1$，尽管从 $0$ 到 $1$ 长度为 $3$ 的简单路径根本不存在。数长度为 $k$ 的简单路径一般是困难问题（$k = n - 1$ 时它包含判定哈密顿路径是否存在，这是 NP 完全的——见 [[complexity]]）。

(c) BFS 以 $\Theta(n + m) = O(n^2)$ 时间一次判定从 $u$ 到*所有*顶点的可达性，而不是 $\Theta(n^4)$，而且只需 $\Theta(n + m)$ 内存。
:::
:::

::: exercise 实现无向图类 {level=3}
实现一个类 `Graph`，用 `set` 的 `dict` 存无向图，带有方法 `add_vertex`、`add_edge`、`remove_edge`、`remove_vertex`、`has_edge`、`neighbours`、`degree`，以及返回若干连通分量（以集的表）的 `components()`。说明每个方法的代价，并在一个含多个分量的小图上测试 `components`。
::: solution
```python
from collections import deque

class Graph:
    def __init__(self):
        self.adj = {}                             # 顶点 -> 邻点集合

    def add_vertex(self, v):                      # 期望 O(1)
        self.adj.setdefault(v, set())

    def add_edge(self, u, v):                     # 期望 O(1)
        self.add_vertex(u); self.add_vertex(v)
        self.adj[u].add(v); self.adj[v].add(u)

    def remove_edge(self, u, v):                  # 期望 O(1)
        self.adj[u].discard(v); self.adj[v].discard(u)

    def remove_vertex(self, v):                   # 期望 O(deg v)
        for u in self.adj.pop(v):
            self.adj[u].discard(v)

    def has_edge(self, u, v):                     # 期望 O(1)
        return v in self.adj.get(u, ())

    def neighbours(self, v):                      # 返回 O(1)；遍历 O(deg v)
        return self.adj[v]

    def degree(self, v):                          # O(1)
        return len(self.adj[v])

    def components(self):                         # 期望 O(n + m)：从每个新顶点做一次 BFS
        seen, result = set(), []
        for s in self.adj:
            if s in seen:
                continue
            comp, q = {s}, deque([s])
            seen.add(s)
            while q:
                u = q.popleft()
                for w in self.adj[u]:
                    if w not in seen:
                        seen.add(w); comp.add(w); q.append(w)
            result.append(comp)
        return result

g = Graph()
for u, v in [(1, 2), (2, 3), (4, 5), (6, 7), (7, 8), (8, 6)]:
    g.add_edge(u, v)
g.add_vertex(9)
print(sorted(sorted(c) for c in g.components()), g.has_edge(3, 1), g.degree(7))
g.remove_vertex(7)
print(sorted(sorted(c) for c in g.components()))
```

```console
$ python3 graph.py
[[1, 2, 3], [4, 5], [6, 7, 8], [9]] False 2
[[1, 2, 3], [4, 5], [6, 8], [9]]
```

（含孤立顶点 $9$ 时有四个分量；去掉它则三个。）`components` 把每个顶点访问一次、每条边访问两次：期望 $O(n + m)$。
:::
:::
