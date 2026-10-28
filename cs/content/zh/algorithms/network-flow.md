原油从炼厂经一张管道网流向港口，每根管道每小时至多输送一定桶数。每小时最多能有多少桶抵达港口？应当怎样安排输送？计算机网络提出的是同一个问题，只不过把油换成数据；铁路亦然——它最初的动机是 1955 年一项关于苏联铁路网向东欧运送货物之运能的研究。它还有一个孪生问题：拆掉一组最便宜的管道（或铁路线），使港口被完全切断，至少要花多少钱？组合优化中最优美的定理之一断言，这两个答案总是*相等*的：最大流等于最小割的容量。

**最大流问题**同时是一件通用工具。许多看上去全然不是流的问题——给学生分配课题、把求职者与空缺职位配对、带可用时间约束的排班、寻找互不相交的路径、图像分割——都能**归约**到最大流：把它们翻译成一个流网络，其最大流就编码了答案。本章定义流网络，发展**Ford–Fulkerson 方法**——在**残量网络**中沿**增广路径**反复输送流量——证明**最大流最小割定理**，分析选取最短增广路径、运行时间为 $O(nm^2)$ 的 **Edmonds–Karp** 算法，然后把**二分图匹配**归约为流。它的主要子过程是广度优先搜索（[[algorithms/graph-search#thm-bfs]]）。

## 流网络

::: definition 流网络与流 {#def-flow}
**流网络**是一个有向图 $G = (V, E)$，带有**源** $s$ 与**汇** $t \ne s$，每条边有**容量** $c(u, v) \ge 0$；若 $(u, v)$ 不是边则规定 $c(u, v) = 0$，并为简单起见假设 $G$ 中没有反向平行的边对 $(u, v), (v, u)$。一个**流**是满足下列条件的函数 $f\colon V\times V \to \mathbb R$：

1. **容量限制**：对所有 $u, v$，$0 \le f(u, v) \le c(u, v)$；
2. **流量守恒**：对每个 $u \ne s, t$，$\sum_{v} f(v, u) = \sum_{v} f(u, v)$——流入多少就流出多少。

$f$ 的**流量**是源流出的净值，$\lvert f\rvert = \sum_v f(s, v) - \sum_v f(v, s)$。**最大流问题**要求流量最大的流。
:::

没有反向平行边的假设不损失一般性：与边 $(u, v)$ 相对的边 $(v, u)$ 可以通过引入新顶点 $x$、拆成 $(v, x)$ 与 $(x, u)$ 并保留容量来处理。这样记账更干净。

::: widget graph
nodes: s@0,1; a@1,2; c@1,0; b@2,2; d@2,0; t@3,1
edges: s>a:16; s>c:13; a>b:12; c>a:4; b>c:9; c>d:14; d>b:7; b>t:20; d>t:4
algorithm: bfs
start: s
caption: 一个流网络：源 $s$、汇 $t$，边上标容量。从 $s$ 出发逐步演示广度优先搜索：BFS 树沿 $s \to a \to b \to t$ 到达 $t$，这是一条最短路径，其最小容量 $12$ 就是最先能沿它输送的流量。这正是下文要跟踪的 Edmonds–Karp 算法的第一步；最终最大流为 $23$，而边 $a \to b$、$d \to b$、$d \to t$（容量 $12 + 7 + 4 = 23$）构成一个最小割。
:::

### 割

::: definition 流网络的割 {#def-st-cut}
**$s$–$t$ 割** $(S, T)$ 是 $V$ 的一个划分，满足 $s \in S$、$t \in T$。其**容量**为 $c(S, T) = \sum_{u\in S, v\in T} c(u, v)$——只计从 $S$ 指向 $T$ 的边。穿过它的**净流出**为 $f(S, T) = \sum_{u\in S, v\in T}f(u, v) - \sum_{u\in S, v\in T}f(v, u)$。
:::

::: lemma 穿过割的流量 {#lem-cut-flow}
对任意流 $f$ 和任意 $s$–$t$ 割 $(S, T)$，$f(S, T) = \lvert f\rvert \le c(S, T)$。
:::

::: proof
把守恒等式写成 $\sum_v f(u, v) - \sum_v f(v, u) = 0$ 的形式，对一切 $u \in S \setminus \{s\}$ 求和，再加上 $u = s$ 时 $\lvert f\rvert$ 的定义：
$$
\lvert f\rvert = \sum_{u \in S}\Big(\sum_{v\in V}f(u, v) - \sum_{v\in V}f(v, u)\Big).
$$
把每个内层和对 $v \in S$ 与 $v \in T$ 分拆。两个端点都在 $S$ 中的项成对抵消：$f(u, v)$ 带加号出现一次（在 $u$ 的和式中）、带减号出现一次（在 $v$ 的和式中）。剩下的是 $\sum_{u\in S, v\in T}f(u, v) - \sum_{u \in S, v\in T}f(v, u) = f(S, T)$。再由 $f \ge 0$ 与容量限制，$f(S, T) \le \sum_{u \in S, v\in T}f(u, v) \le \sum_{u\in S, v\in T}c(u, v) = c(S, T)$。
:::

于是*每个*割的容量都是*每个*流量的上界：最大流不超过最小割。本章的定理说的是等号成立。

::: example 一个流与两个割 {#ex-cut}
在图中的网络上，沿 $s \to a \to b \to t$ 输送 $11$ 个单位，沿 $s \to c \to d \to b \to t$ 输送 $7$ 个单位，沿 $s \to c \to d \to t$ 输送 $4$ 个单位。验证这是一个流，求出它的流量，并计算割 $S_1 = \{s\}$ 与 $S_2 = \{s, a, c, d\}$ 的净流出与容量。
::: solution
该流为 $f(s, a) = 11$，$f(a, b) = 11$，$f(s, c) = 11$，$f(c, d) = 11$，$f(d, b) = 7$，$f(d, t) = 4$，$f(b, t) = 18$，$c \to a$ 与 $b \to c$ 上为 $0$。容量限制成立（$11 \le 16, 12, 13, 14$；$7 \le 7$；$4 \le 4$；$18 \le 20$）。守恒：$a$ 流入 $11$、流出 $11$；$c$ 流入 $11$、流出 $11$；$d$ 流入 $11$、流出 $7 + 4$；$b$ 流入 $11 + 7 = 18$、流出 $18$。流量为 $11 + 11 = 22$。

割 $S_1 = \{s\}$：净流出 $11 + 11 = 22$，容量 $16 + 13 = 29$。割 $S_2 = \{s, a, c, d\}$：离开的边是 $a \to b$、$d \to b$、$d \to t$，流量 $11 + 7 + 4 = 22$；进入它的边 $b \to c$ 载流 $0$；净流出 $22$——[[#lem-cut-flow]] 保证必然如此。其容量为 $12 + 7 + 4 = 23$。所以这个流离最优只差 $1$，而任何流都不能超过 $23$——割 $S_2$ 就是证明。
:::
:::

## Ford–Fulkerson 方法

一个自然的想法：找一条从 $s$ 到 $t$、每条边都还有余量的路径，沿它尽量输送，然后重复。仅此是不够的——一条选得不好的早期路径可能挡住更好的路径。补救办法是允许把流量*往回推*：沿 $v \to u$ 送流可以取消先前沿 $u \to v$ 送的流。残量网络把这两种可能都记录下来。

::: definition 残量网络与增广路径 {#def-residual}
给定流 $f$，有序对 $(u, v)$ 的**残量**为
$$
c_f(u, v) = \begin{cases} c(u, v) - f(u, v) & \text{当 } (u, v) \in E,\\ f(v, u) & \text{当 } (v, u) \in E,\\ 0 & \text{其他情况}.\end{cases}
$$
**残量网络** $G_f$ 对每个满足 $c_f(u, v) > 0$ 的有序对 $(u, v)$ 各含一条边：还有余量的前向边，以及可以取消流量的后向边。**增广路径**是 $G_f$ 中一条从 $s$ 到 $t$ 的路径；其**瓶颈** $b$ 是沿途最小的残量。
:::

::: lemma 增广 {#lem-augment}
设 $p$ 是瓶颈 $b > 0$ 的增广路径。按下述方式由 $f$ 定义 $f'$：对 $p$ 的每条边 $(u, v)$，若 $(u, v) \in E$，把 $f(u, v)$ 增加 $b$；否则把 $f(v, u)$ 减少 $b$。则 $f'$ 是流，且 $\lvert f'\rvert = \lvert f\rvert + b$。
:::

::: proof
*容量：*前向边上，$f(u, v) + b \le f(u, v) + c_f(u, v) = c(u, v)$；后向边上，$f(v, u) - b \ge f(v, u) - c_f(u, v) = 0$。*守恒：*简单路径 $p$ 的内部顶点 $x$ 恰有一条路径边进入、一条离开。四种组合（进入的是前向边或后向边、离开的是前向边或后向边）都使 $x$ 的流入量与流出量改变同样的数值：例如进入为前向、离开为后向，就是给一条入边的流量加 $b$、给另一条入边的流量减 $b$。*流量：*$p$ 的第一条边离开 $s$；若是前向边，把 $s$ 的流出量增加 $b$，若是后向边，把 $s$ 的流入量减少 $b$；两种情形下净流出都增加 $b$（且 $p$ 是简单路径，不会回到 $s$）。
:::

::: example 为什么需要后向边 {#ex-backward}
网络有边 $s \to a$、$s \to b$、$a \to b$、$a \to t$、$b \to t$，容量全为 $1$。设第一条选的路径是 $s, a, b, t$。试证：没有后向边就会停留在流量 $1$，而残量网络能找到最大流 $2$。
::: solution
沿 $s, a, b, t$ 输送 $1$ 个单位后，边 $s \to a$、$a \to b$、$b \to t$ 都已饱和。只找全由有余量的边构成的路径，则从 $s$ 能到达 $b$ 但到不了 $b$ 之后（$b \to t$ 已满），朴素方法止步于 $1$。在残量网络中，$a \to b$ 上的流产生了一条残量为 $1$ 的后向边 $b \to a$，而 $s \to b \to a \to t$ 是一条增广路径。沿它增展会*取消* $a \to b$ 上的流并重新布线：最终的流是 $s \to a \to t$ 与 $s \to b \to t$，流量为 $2$，等于割 $\{s\}$ 的容量。
:::
:::

::: algorithm Ford–Fulkerson 方法 {#alg-ford-fulkerson}
从 $f = 0$ 出发。只要残量网络 $G_f$ 中存在从 $s$ 到 $t$ 的路径：选一条 $p$，沿 $p$ 以瓶颈量增广 $f$（[[#lem-augment]]）。返回 $f$。
:::

::: theorem 最大流最小割定理 {#thm-maxflow-mincut}
对流网络中的流 $f$，以下三条等价：

1. $f$ 是最大流；
2. 残量网络 $G_f$ 中没有增广路径；
3. 存在某个 $s$–$t$ 割 $(S, T)$ 使 $\lvert f\rvert = c(S, T)$。

由此，最大流的流量等于最小割的容量。
:::

::: proof
(1 ⇒ 2) 若存在增广路径，[[#lem-augment]] 就给出流量更大的流。

(2 ⇒ 3) 令 $S$ 为 $G_f$ 中从 $s$ 可达的顶点集，$T = V \setminus S$。则 $s \in S$，且 $t \in T$（因为没有增广路径），所以 $(S, T)$ 是一个割。对 $u \in S$、$v \in T$：若 $(u, v) \in E$，则 $f(u, v) = c(u, v)$，否则 $c_f(u, v) > 0$、$v$ 就可达了；若 $(v, u) \in E$，则 $f(v, u) = 0$，否则 $c_f(u, v) = f(v, u) > 0$。于是由 [[#lem-cut-flow]]，$\lvert f\rvert = f(S, T) = \sum_{u\in S, v\in T}c(u, v) - 0 = c(S, T)$。

(3 ⇒ 1) 由 [[#lem-cut-flow]]，任意流 $g$ 都有 $\lvert g\rvert \le c(S, T) = \lvert f\rvert$。

最后，最大流存在（流的集合是 $\mathbb R^E$ 中的有界闭集，而流量是连续函数；对整数容量，存在性也由 [[#thm-integrality]] 得到）。由 1 ⇒ 3，它的值等于某个割的容量；而由 [[#lem-cut-flow]]，没有割的容量更小。
:::

这个证明同时也是求最小割的算法：Ford–Fulkerson 一旦停止，残量网络中从 $s$ 可达的顶点就构成一个最小割的源侧。

::: theorem 整数性与终止 {#thm-integrality}
若所有容量都是整数，Ford–Fulkerson 方法至多增广 $\lvert f^\ast\rvert$ 次后终止（$\lvert f^\ast\rvert$ 为最大流量），且返回的每个 $f(u, v)$ 都是整数的最大流。每次增广耗时 $O(m)$（在 $G_f$ 上做 BFS 或 DFS），故总运行时间为 $O(m\lvert f^\ast\rvert)$。
:::

::: proof
归纳可知流量始终保持整数：残量是整数，故瓶颈是整数，每次增广对各边流量改动一个整数。每次增广把 $\lvert f\rvert$ 提高一个正整数（至少 $1$），而流量从不超过 $\lvert f^\ast\rvert \le c(\{s\}, V\setminus\{s\})$，所以增广至多 $\lvert f^\ast\rvert$ 次。方法停止时没有增广路径，故由 [[#thm-maxflow-mincut]]，所得的流是最大流。（可设每个顶点都在某条从 $s$ 出发的路径上，于是 $m \ge n - 1$，一次搜索代价为 $O(m)$。）
:::

**整数性**——整数容量必有整数最大流——正是流可用于匹配这类组合问题的原因，在那里“半条边”毫无意义。

::: warning 路径的选择很重要
界 $O(m\lvert f^\ast\rvert)$ 对输入规模并不是多项式，因为 $\lvert f^\ast\rvert$ 关于容量的比特数可以是指数级的。考虑边 $s \to a$、$s \to b$、$a \to t$、$b \to t$ 容量为 $10^9$、中间边 $a \to b$ 容量为 $1$ 的网络：若漫不经心地选路，就会在 $s, a, b, t$ 与 $s, b, a, t$（使用后向残量边 $b \to a$）之间来回交替，每次只多得 $1$：要增广二十亿次，而两次足矣。对**无理性**容量，Ford–Fulkerson 可能根本不终止，流量值甚至可能收敛到严格小于最大流的数（涉及黄金比例的例子出自 Zwick，1995）。把增广路径选得好——如下文的最短路径，或瓶颈大的路径——两个毛病都可避免。
:::

## Edmonds–Karp 算法

**Edmonds–Karp** 就是按广度优先搜索在 $G_f$ 中找增广路径的 Ford–Fulkerson，从而每条增广路径都是*最短*的（边数最少）。记 $\delta_f(s, v)$ 为 $G_f$ 中 $s$ 到 $v$ 的 BFS 距离。

::: lemma 残量距离不下降 {#lem-ek-monotone}
在 Edmonds–Karp 算法中，对每个顶点 $v$，$\delta_f(s, v)$ 随各次增广单调不减。
:::

::: proof
设某次增广把 $f$ 变为 $f'$，且有些距离下降了。在距离下降的顶点中，取 $\delta_{f'}(s, v)$ 最小的 $v$；则 $v \ne s$，且 $v$ 在 $G_{f'}$ 中可达。设 $u$ 是 $G_{f'}$ 中 $s$ 到 $v$ 的最短路径上 $v$ 的前驱，于是 $(u, v) \in E_{f'}$ 且 $\delta_{f'}(s, u) = \delta_{f'}(s, v) - 1$。由 $v$ 的取法，$u$ 的距离没有下降：$\delta_f(s, u) \le \delta_{f'}(s, u)$。

若 $(u, v) \in E_f$，则 $\delta_f(s, v) \le \delta_f(s, u) + 1 \le \delta_{f'}(s, u) + 1 = \delta_{f'}(s, v)$，$v$ 的距离没有下降——矛盾。若 $(u, v) \notin E_f$ 而 $(u, v) \in E_{f'}$，则这条残量边是这次增广造出来的，而这只发生在它沿 $(v, u)$ 输送了流量之时；于是 $(v, u)$ 在增广路径（$G_f$ 中的最短路径）上，$\delta_f(s, u) = \delta_f(s, v) + 1$。从而 $\delta_f(s, v) = \delta_f(s, u) - 1 \le \delta_{f'}(s, u) - 1 = \delta_{f'}(s, v) - 2$，又与下降矛盾。
:::

::: theorem Edmonds–Karp 的运行时间 {#thm-edmonds-karp}
对任意非负实容量，Edmonds–Karp 算法作 $O(nm)$ 次增广，运行时间 $O(nm^2)$。
:::

::: proof
称残量边 $(u, v)$ 在增广路径上**关键**，如果它的残量等于瓶颈。每次增广至少有一条关键边，且增广会把它从残量网络中删去。设 $(u, v)$ 对流 $f$ 是关键边。因 $p$ 是最短路径，$\delta_f(s, v) = \delta_f(s, u) + 1$。边 $(u, v)$ 要重新出现在某个残量网络中，必须是之后某次从流 $f'$ 出发的增广沿 $(v, u)$ 输送了流量，于是那时 $\delta_{f'}(s, u) = \delta_{f'}(s, v) + 1$。由 [[#lem-ek-monotone]]，$\delta_{f'}(s, v) \ge \delta_f(s, v)$，故
$$
\delta_{f'}(s, u) = \delta_{f'}(s, v) + 1 \ge \delta_f(s, v) + 1 = \delta_f(s, u) + 2.
$$
所以 $(u, v)$ 两次成为关键边之间，$u$ 的距离至少增长 $2$。增广路径上（除 $t$ 外）顶点的距离至多 $n - 2$，于是至多 $2m$ 条可能的残量边中每条成为关键边的次数至多 $n/2$，增广至多 $nm$ 次。每次增广的 BFS 与更新共 $O(m)$，合计 $O(nm^2)$。该界与容量无关，所以即使容量是无理数算法也会终止。
:::

```python
from collections import deque

def max_flow(cap, s, t):
    """Edmonds-Karp. cap: dict of dicts of capacities. Returns (value, flow)."""
    res = {u: dict(nbrs) for u, nbrs in cap.items()}     # 残量
    for u in cap:
        for v in cap[u]:
            res.setdefault(v, {}).setdefault(u, 0)       # 反向残量边
    value = 0
    while True:
        parent = {s: None}                               # 在残量图中做 BFS
        queue = deque([s])
        while queue and t not in parent:
            u = queue.popleft()
            for v, c in res[u].items():
                if c > 0 and v not in parent:
                    parent[v] = u
                    queue.append(v)
        if t not in parent:
            break                                        # 已无增广路径
        path, v = [], t
        while parent[v] is not None:
            path.append((parent[v], v)); v = parent[v]
        b = min(res[u][v] for u, v in path)              # 瓶颈
        for u, v in path:
            res[u][v] -= b
            res[v][u] += b
        value += b
        print('augment', [u for u, _ in reversed(path)] + [t], 'by', b)
    flow = {(u, v): cap[u][v] - res[u][v] for u in cap for v in cap[u]}
    return value, flow, set(parent)                      # parent = 可达集

if __name__ == '__main__':
    cap = {'s': {'a': 16, 'c': 13}, 'a': {'b': 12}, 'b': {'c': 9, 't': 20},
           'c': {'a': 4, 'd': 14}, 'd': {'b': 7, 't': 4}, 't': {}}
    value, flow, S = max_flow(cap, 's', 't')
    print(value, sorted(S))
```

```console
$ python3 flow.py
augment ['s', 'a', 'b', 't'] by 12
augment ['s', 'c', 'd', 't'] by 4
augment ['s', 'c', 'd', 'b', 't'] by 7
23 ['a', 'c', 'd', 's']
```

（该函数除流量与流之外，还返回最后一次不成功的 BFS 所到达的顶点集——即一个最小割的源侧。它如 [[#def-flow]] 所设，假定不存在反向平行的边。）

::: example 逐步执行 Edmonds–Karp {#ex-edmonds-karp}
解释图中网络上打印出的三次增广，并验证最小割。
::: solution
1. BFS 找到最短路径 $s, a, b, t$（三条边），残量容量 $16, 12, 20$；瓶颈为 $12$。此时 $a \to b$ 饱和，出现残量边 $b \to a$（12）、$a \to s$（12）与 $t \to b$（12）。
2. 下一条最短路径是 $s, c, d, t$，容量 $13, 14, 4$：瓶颈 $4$，$d \to t$ 饱和。
3. 三条边的路径已不存在；BFS 找到 $s, c, d, b, t$（四条边），残量容量 $13 - 4 = 9$、$14 - 4 = 10$、$7$ 与 $20 - 12 = 8$：瓶颈 $7$，$d \to b$ 饱和。

流量为 $12 + 4 + 7 = 23$。在最终的残量网络中，$s$ 能到达 $c$（残量 $2$）、$a$（残量 $4$），并由 $c$ 到达 $d$（残量 $3$）；从 $a$ 出发唯一的前向边 $a \to b$ 饱和，$d$ 的两条边 $d \to b$、$d \to t$ 也都饱和。于是 $S = \{s, a, c, d\}$，割边是 $a \to b$（$12$）、$d \to b$（$7$）、$d \to t$（$4$），容量合计 $23$，与流量相等——两者同为最优的证明。边 $b \to c$ 从 $T$ 指向 $S$，不计入容量；它不载流，[[#thm-maxflow-mincut]] 的证明正要求如此。
:::
:::

还有更快的算法。Dinic 算法（1970）沿全部最短路径一次性增广，复杂度 $O(n^2m)$；预流推进类方法（Goldberg 与 Tarjan，1988）达到 $O(n^3)$ 甚至更好，实际运行很快；2022 年 Chen、Kyng、Liu、Peng、Probst Gutenberg 与 Sachdeva 宣布了运行时间 $m^{1+o(1)}$（近线性）的算法，这是一项理论突破，截至 2026 年尚未投入实用。

::: quiz
最大流求出之后，原网络中能够穿过某个最小割 $(S, T)$ 从 $S$ 到达 $T$ 的是哪些边？

- [x] 只有饱和边（$f = c$）
- [ ] 只有零流边
- [ ] 任意边都行，只要其容量之和等于 $\lvert f\rvert$
- [ ] 双向都有、都载着流量的边
::: solution
对任意最大流 $f$ 与最小割，$\lvert f\rvert = f(S, T) \le c(S, T) = \lvert f\rvert$ 迫使 [[#lem-cut-flow]] 证明中的每一处不等式都取等：每条从 $S$ 到 $T$ 的边都饱和，每条从 $T$ 到 $S$ 的边流量为零。这对*每个*最小割都成立，而不仅是残量搜索找到的那一个；它是检验计算结果的好办法。
:::
:::

## 二分图匹配

无向图中的**匹配**是一个两两没有公共端点的边集合。在两侧为 $L$ 与 $R$ 的二分图中——求职者与职位、学生与课题、乐手与乐器——**最大匹配**要配对尽可能多的顶点，每一对之间都有一条边。

::: algorithm 用最大流求匹配 {#alg-matching}
给定二分图 $G = (L \cup R, E)$，构造流网络 $G'$：加源 $s$，对每个 $u \in L$ 连一条容量 $1$ 的边 $s \to u$；加汇 $t$，对每个 $v \in R$ 连一条容量 $1$ 的边 $v \to t$；把每条边 $\{u, v\} \in E$ 变成从 $u \in L$ 指向 $v \in R$、容量为 $1$ 的有向边。计算 $G'$ 的整数最大流 $f$（由 [[#thm-integrality]]），返回 $M = \{\{u, v\} \in E : f(u, v) = 1\}$。
:::

::: theorem 匹配就是整数流 {#thm-matching}
$G$ 的最大匹配的边数等于 $G'$ 的最大流量，且 [[#alg-matching]] 返回一个最大匹配；用 Ford–Fulkerson 耗时 $O(nm)$。
:::

::: proof
*由匹配到流：*给定匹配 $M$，对每个 $\{u, v\} \in M$ 沿 $s \to u \to v \to t$ 输送 $1$ 个单位。$M$ 中每个顶点至多属于一条边，故容量限制成立；守恒由构造成立；流量为 $\lvert M\rvert$。*由流到匹配：*设 $f$ 是整数流。每条边容量为 $1$，故每个 $f(u, v) \in \{0, 1\}$。顶点 $u \in L$ 至多收到 $1$ 个单位（只来自 $s$），由守恒，离开 $u$ 的边至多一条载流；同样，每个 $v \in R$ 送往 $t$ 至多 $1$ 个单位，故进入 $v$ 的边至多一条载流。于是 $M = \{\{u, v\} : f(u, v) = 1\}$ 是匹配，且由 [[#lem-cut-flow]]，$\lvert M\rvert = f(\{s\} \cup L, R \cup \{t\}) = \lvert f\rvert$。所以最大匹配与最大整数流等大，而整数最大流就是最大流。*时间：*增广至多 $\lvert f^\ast\rvert \le \lvert L\rvert \le n$ 次，每次 $O(n + m)$。
:::

```python
from flow import max_flow

def max_matching(left, right, edges):
    """Maximum bipartite matching by reduction to maximum flow."""
    cap = {'s': {u: 1 for u in left}, 't': {}}
    for u in left:
        cap[u] = {}
    for v in right:
        cap[v] = {'t': 1}
    for u, v in edges:
        cap[u][v] = 1                    # 容量 1 已足够（任何 >= 1 均可）
    value, flow, _ = max_flow(cap, 's', 't')
    return value, sorted((u, v) for u, v in edges if flow[(u, v)] == 1)

left = ['Ana', 'Ben', 'Cai', 'Dev']
right = ['cello', 'drums', 'flute', 'harp']
edges = [('Ana', 'cello'), ('Ana', 'flute'), ('Ben', 'cello'),
         ('Cai', 'drums'), ('Cai', 'flute'), ('Cai', 'harp'), ('Dev', 'cello')]
print(max_matching(left, right, edges))
```

```console
$ python3 matching.py
augment ['s', 'Ana', 'cello', 't'] by 1
augment ['s', 'Cai', 'drums', 't'] by 1
augment ['s', 'Ben', 'cello', 'Ana', 'flute', 't'] by 1
(3, [('Ana', 'flute'), ('Ben', 'cello'), ('Cai', 'drums')])
```

::: example 一条交错路径 {#ex-matching}
解释输出中的第三次增广，并说明为什么不存在边数为 $4$ 的匹配。
::: solution
在配好 Ana–cello 与 Cai–drums 之后，BFS 找到 $s$、Ben、cello、Ana、flute、$t$。其中 cello $\to$ Ana 这一步用的是 Ana $\to$ cello 上流量的*后向*残量边：它把大提琴从 Ana 手中收回、交给 Ben，并把 Ana 移去长笛。用匹配的语言说，这条增广路径在不属于匹配的边（Ben–cello、Ana–flute）与属于匹配的边（Ana–cello）之间交替，把它们互换身份就使匹配多出一对——这就是**交错路径**，一切匹配算法的基础。不存在边数为 $4$ 的匹配：Ben 和 Dev 都只会拉大提琴，两人不可能同时配上。用流的语言说，源侧为 $\{s, \text{Ben}, \text{Dev}, \text{cello}\}$ 的割容量为 $c(s, \text{Ana}) + c(s, \text{Cai}) + c(\text{cello}, t) = 3$。
:::
:::

::: widget graph
nodes: Ana@0,3; Ben@0,2; Cai@0,1; Dev@0,0; cello@2,3; drums@2,2; flute@2,1; harp@2,0
edges: Ana-cello; Ana-flute; Ben-cello; Cai-drums; Cai-flute; Cai-harp; Dev-cello
algorithm: colour
caption: 例中的乐手与乐器，画成二分图。贪心染色证实两种颜色就够——乐手在一侧，乐器在另一侧。最大匹配有 $3$ 条边，例如 Ana–flute、Ben–cello、Cai–drums；Ben 与 Dev 争抢大提琴——它是两人中任一人唯一会演奏的乐器，这正是 Hall 障碍（见习题）：$2$ 名乐手的集合合起来只有 $1$ 件可配的乐器。
:::

专门的 **Hopcroft–Karp 算法**（1973）求二分图最大匹配只需 $O(m\sqrt n)$ 时间：每一阶段沿一组极大的、顶点互不相交的最短交错路径同时增广；$\sqrt n$ 个阶段之后，剩余的增广至多还有 $\sqrt n$ 次。

## 更多归约

流网络能建模的远不止管道。每个归约都像匹配那样从两个方向证明：原问题的解给出相应流量的流，整数流则给出一个解。

- **边不交路径。** 有向图中从 $s$ 到 $t$ 的边不交路径的最大数目，等于所有容量取 $1$ 时的最大流——并且由最大流最小割定理，还等于使 $t$ 与 $s$ 分离所需删去的最少边数。这就是 **Menger 定理**（1927），在此作为推论得到。
- **点容量**的处理办法是把每个顶点 $v$ 拆成 $v_{\text{入}} \to v_{\text{出}}$，用一条容量为该顶点容量的边代替。
- **多个源与汇**：用容量为无穷大的边把它们分别接到一个超级源和一个超级汇上。
- **带容量的分配**——每个课题至多收 $k$ 名学生，每名学生从自己认可的清单中选一个课题——就是匹配，只需把课题到汇的边容量取为 $k$。
- **图像分割**成前景与背景、分开相似的相邻像素要付惩罚，是一个最小割问题。

::: quiz
要在有向图中求从 $s$ 到 $t$ 的、除 $s$ 与 $t$ 外不共享任何*顶点*的路径的最大数目，应当构造哪个网络？

- [ ] 原图，所有边容量取 $1$
- [x] 每个顶点 $v \ne s, t$ 拆成容量 $1$ 的 $v_{\text{入}} \to v_{\text{出}}$，一切进入 $v$ 的边改为进入 $v_{\text{入}}$，一切离开 $v$ 的边改为从 $v_{\text{出}}$ 出发
- [ ] 原图，所有边容量取 $1$，并令 $s$、$t$ 处的边容量为 $\infty$
- [ ] 把图当作无向图、所有边容量取 $1$
::: solution
给边容量取 $1$ 只阻止共享**边**：两条路径仍可用不同的边穿过同一个顶点。拆点把容量 $1$ 加在顶点本身上，因为穿过 $v$ 的一切流都必须走边 $v_{\text{入}} \to v_{\text{出}}$。配合整数流，最大流就能分解成那么多条内部顶点互不相交的路径——这就是 Menger 定理的顶点形式。
:::
:::

::: history
最大流问题由 T. E. Harris 与 F. S. Ross 在 1955 年一份兰德公司报告中提出（该报告被保密至 1999 年），研究苏联与东欧铁路网的运能；他们的最小割就是空军要切断运输所需瘫痪的一组铁路线。Lester Ford 与 Delbert Fulkerson 在论文 "Maximal flow through a network"（1956，*Canadian Journal of Mathematics*）中证明了最大流最小割定理并给出增广路径法；Peter Elias、Amiel Feinstein 与香农（Shannon）在同年独立证明了该定理。Jack Edmonds 与 Richard 卡普（Karp）于 1972 年发表了最短增广路径算法及其多项式上界；Yefim Dinitz（Dinic）早在 1970 年就在苏联给出了相关的 $O(n^2m)$ 算法。John Hopcroft 与 Richard 卡普的 $O(m\sqrt n)$ 匹配算法发表于 1973 年。匹配理论更老：Dénes Kőnig（1931）与 Jenő Egerváry 证明了二分图匹配的极小极大定理，Philip Hall 给出了婚配定理（1935），Harold Kuhn 求解带权分配的“匈牙利法”（1955）正是为向他们致敬而命名。
:::

## 后续内容

最大流最小割是**对偶**的第一个例子：一个最大化问题的最优值等于某个相关的最小化问题的最优值。线性规划把它推广开去，流与割互为对偶的线性规划。最小费用流、带权匹配（匈牙利算法）与一般（非二分）匹配（Edmonds 的开花算法，1965）是本讲的延伸。[[algorithms/randomised-algorithms]] 给出一种完全不同的、随机化的方法来做*全局*最小割——不需要指定源和汇。问题之间的归约——把一个问题翻译成另一个问题，正如我们对匹配所做的——是 [[complexity]] 的中心工具。

::: summary
- **流**尊重容量限制、在内部顶点守恒；其流量是 $s$ 的净流出（[[#def-flow]]）。任何割的容量都是任何流量的上界（[[#lem-cut-flow]]）。
- **残量网络**含有余量的前向边与可取消流量的后向边；沿其中一条 $s$–$t$ 路径增广使流量增加瓶颈那么多（[[#lem-augment]]）。
- **最大流最小割**：$f$ 最大 ⇔ 无增广路径 ⇔ $\lvert f\rvert$ 等于某个割的容量（[[#thm-maxflow-mincut]]）。最终残量网络中可达的顶点给出一个最小割。
- 容量为整数时，Ford–Fulkerson 终止并得到**整数**最大流，耗时 $O(m\lvert f^\ast\rvert)$（[[#thm-integrality]]）；选路草率时这可以是指数级的，容量为无理数时甚至可能不终止。
- **Edmonds–Karp**（BFS 找增广路径）运行时间 $O(nm^2)$：残量距离不下降（[[#lem-ek-monotone]]），且每条边至多成为关键边 $O(n)$ 次（[[#thm-edmonds-karp]]）。
- **二分图匹配**归约为单位容量流（[[#thm-matching]]）；增广路径变成交错路径。Hopcroft–Karp 需 $O(m\sqrt n)$。
:::

## 习题

::: exercise 割的容量 {level=1 check="42"}
图中网络里，$S = \{s, a, b\}$ 的割的容量是多少？（输入容量。）
::: solution
从 $S = \{s, a, b\}$ 指向 $T = \{c, d, t\}$ 的边是 $s \to c$（$13$）、$b \to c$（$9$）与 $b \to t$（$20$）；边 $c \to a$ 与 $d \to b$ 从 $T$ 指向 $S$，不计入。$a \to b$ 位于 $S$ 内部。容量为 $13 + 9 + 20 = 42$，远大于最大流 $23$，[[#lem-cut-flow]] 正要求如此。
:::
:::

::: exercise 残量网络 {level=1}
在容量为 $c(s, a) = 2$、$c(s, b) = 3$、$c(a, t) = 3$、$c(b, t) = 1$、$c(a, b) = 2$ 的网络中，对流量 $f(s, a) = 2$、$f(a, t) = 2$、$f(s, b) = 0$、$f(b, t) = 0$、$f(a, b) = 0$，画出残量网络并找一条增广路径。
::: solution
残量边：$s \to a$ 为 $0$（饱和），$a \to s$ 为 $2$；$s \to b$：$3$；$a \to t$：$1$，$t \to a$：$2$；$b \to t$：$1$；$a \to b$：$2$。一条增广路径是 $s \to b \to t$，瓶颈 $1$；此后 $s$ 仍能到达 $b$（残量 $2$），但 $b \to t$ 已饱和，$b$ 再无其他出发的残量边（不存在残量边 $b \to a$，因为 $f(a, b) = 0$）。所以最大流为 $3$，最小割为 $S = \{s, b\}$：边 $s \to a$（$2$）与 $b \to t$（$1$）。
:::
:::

::: exercise 不交路径 {level=2 check="2"}
在有向图，边为 $s \to a$、$s \to b$、$a \to b$、$a \to c$、$b \to c$、$c \to t$、$b \to t$ 中，从 $s$ 到 $t$ 的边不交路径的最大数目是多少？给出这些路径和一个与之相配的割。（输入该数。）
::: solution
两条：$s \to a \to c \to t$ 与 $s \to b \to t$。三条不可能，因为 $s$ 只有两条出边 $\{s \to a, s \to b\}$，它们构成一个容量为 $2$ 的割。由 Menger 定理（单位容量的最大流最小割）最大值恰为 $2$。
:::
:::

::: exercise Hall 定理 {level=2}
证明 **Hall 定理**：两侧为 $L$ 与 $R$ 的二分图存在覆盖 $L$ 中每个顶点的匹配，当且仅当每个集合 $A \subseteq L$ 在 $R$ 中至少有 $\lvert A\rvert$ 个邻居。
::: solution
($\Rightarrow$) 这样的匹配中 $A$ 的配对对象是 $A$ 的互异邻居。($\Leftarrow$) 设不存在边数为 $\lvert L\rvert$ 的匹配。则 [[#alg-matching]] 的 $G'$ 中最大流小于 $\lvert L\rvert$，于是存在割 $(S, T)$ 使 $c(S, T) < \lvert L\rvert$。把 $L \to R$ 边的容量改为 $\lvert L\rvert + 1$ 而不是 $1$（这不改变任何匹配的大小，[[#thm-matching]] 的证明已经说明）；于是容量 $< \lvert L\rvert$ 的割不含 $L \to R$ 边。令 $A = L \cap S$。$A$ 的每个邻居都在 $S$ 中（否则一条 $L\to R$ 边就穿过割了），所以 $c(S, T) \ge \lvert L \setminus A\rvert + \lvert N(A)\rvert$——数的是 $u \in L \setminus A$ 的边 $s \to u$ 与 $v \in N(A)$ 的边 $v \to t$。由 $\lvert L\setminus A\rvert + \lvert N(A)\rvert < \lvert L\rvert$ 得 $\lvert N(A)\rvert < \lvert A\rvert$，违反 Hall 条件。
:::
:::

::: exercise 一次缓慢的 Ford–Fulkerson 运行 {level=2 check="2000"}
在边 $s \to a$、$s \to b$、$a \to t$、$b \to t$ 容量为 $1000$、$a \to b$ 容量为 $1$ 的网络上，若 Ford–Fulkerson 总在路径 $s, a, b, t$ 与 $s, b, a, t$ 之间交替，它要做多少次增广？（输入该数。）Edmonds–Karp 要做多少次？
::: solution
这两条路径的瓶颈都是 $1$：前者用 $a \to b$（容量 $1$），后者用后向残量边 $b \to a$（第一次之后残量为 $1$）。每次增广增加 $1$，而最大流为 $2000$，故 $2000$ 次增广。Edmonds–Karp 选最短路径（两条边）：$s, a, t$ 与 $s, b, t$，瓶颈各 $1000$——两次增广。
:::
:::

::: exercise 课题分配 {level=2}
$n$ 名学生各列出自己可接受的课题；课题 $j$ 至多收 $k_j$ 名学生；每名学生恰好需要一个课题。把问题建模为最大流，并证明：每名学生都能得到安置当且仅当最大流量等于 $n$。
::: solution
网络：$s \to$ 每名学生（容量 $1$），学生 $\to$ 每个可接受的课题（容量 $1$），课题 $j \to t$（容量 $k_j$）。一个安置给出流量为 $n$ 的流（每名学生沿其课题输送一个单位），并尊重容量 $k_j$。反过来，流量为 $n$ 的整数流（[[#thm-integrality]]）让每名学生送出 $1$ 个单位（$\{s\}$ 割的容量是 $n$，所有 $s$ 出边都饱和），且恰好沿一条学生–课题边（整数、容量 $1$），进入课题 $j$ 至多 $k_j$ 个单位；读出这些边就得到一个合法安置。
:::
:::

::: exercise 更新最大流 {level=3}
整数容量的网络中已知最大流 $f$。把一条边的容量增加 $1$。说明如何在 $O(n + m)$ 时间内算出新的最大流。若是把一条边的容量*减少* $1$ 呢？
::: solution
*增加：*$f$ 仍是流，且最大流量至多增加 $1$（每个割的容量至多增加 $1$，而最小割约束流量）。在新的残量网络中搜索一次增广路径（$O(n + m)$）；若有，就增广 $1$（整数瓶颈 $\ge 1$，而流量至多上升 $1$）；若没有，$f$ 仍是最大流。*把 $(u, v)$ 减少 $1$：*若 $f(u, v) \le c(u, v) - 1$，$f$ 仍可行且最大（容量只会变小）。否则 $f(u, v) = c(u, v)$ 比新容量超出 $1$。由于流量为整数且守恒，存在载流路径从 $s$ 到 $u$、从 $v$ 到 $t$（把流分解成路径）；沿 $s \leadsto u \to v \leadsto t$ 取消 $1$ 个单位，$f$ 恢复可行，流量为 $\lvert f\rvert - 1$。再作一次增广路径搜索，至多找回 $1$，恢复最大性。两步都是 $O(n + m)$。
:::
:::

::: exercise König 定理 {level=3}
图的**点覆盖**是一个与每条边都相交的顶点集合。证明 **König 定理**：二分图中，匹配的最大边数等于点覆盖的最小顶点数。
::: solution
匹配的每条边都需要各自单独的覆盖顶点（匹配的边无公共端点），故对任何匹配 $M$ 与覆盖 $C$ 有 $\lvert M\rvert \le \lvert C\rvert$。为证等号可达，仿照 [[#alg-matching]] 构造 $G'$，但把 $L \to R$ 边的容量取为 $\infty$（或 $n + 1$）；由 [[#thm-matching]]，其最大流仍等于最大匹配的边数 $\nu$，于是存在容量为 $\nu$ 的割 $(S, T)$，它不含 $L \to R$ 边。令 $C = (L \cap T) \cup (R \cap S)$；数 $u \in L \cap T$ 的边 $s \to u$ 与 $v \in R \cap S$ 的边 $v \to t$，得 $\lvert C\rvert = c(S, T) = \nu$。$C$ 是覆盖：若一条边 $\{u, v\}$ 满足 $u \in L$、$v \in R$ 且两端都不在 $C$ 中，则 $u \in S$、$v \in T$，一条无穷容量的边穿过割——不可能。
:::
:::
