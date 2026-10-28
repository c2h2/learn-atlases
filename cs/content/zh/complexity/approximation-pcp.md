多数 $\mathsf{NP}$ 完全问题其实是伪装的**优化**问题：我们不仅想知道是否存在规模为 $k$ 的顶点覆盖，还想要最小的那一个；不满足于知道是否存在长度为 $B$ 的周游，而要最短的周游。若 $\mathsf{P} \ne \mathsf{NP}$，最坏情形下我们不可能高效求出最优解。但一个规模是最优两倍、总长是最短周游 $1.5$ 倍的解也许完全够用——只要我们能*证明*算法绝不至于更差。

本章研究这类**近似算法**。我们为三个经典算法给出保证——顶点覆盖的因子 $2$、集合覆盖的 $\ln n + 1$、度量 $\mathit{TSP}$ 的 $2$——为 $\mathit{MAX\text{-}3SAT}$ 的随机赋值给出保证，并说明一般 $\mathit{TSP}$ 除非 $\mathsf{P} = \mathsf{NP}$ 否则不能在*任何*因子内近似。然后转向极限。长期以来，人们不明白为什么某些问题的近似性能远好于另一些。答案来自一个意想不到的方向：$\mathsf{NP}$ 的一个新刻画——**PCP 定理**——它说每个 $\mathsf{NP}$ 断言都有一个只需读常数个比特就能检验的证明。我们陈述该定理（其证明超出本课程范围），证明它等价于逼近 $\mathit{MAX\text{-}3SAT}$ 的困难性，并综述其后可得的精确不可近似性结果。

## 近似比

::: definition 优化问题与近似比 {#def-approx}
**优化问题**给每个实例 $x$ 指派一组可行解，每个解带一个正的**代价**（求极小）或**价值**（求极大）；$\mathrm{OPT}(x)$ 是最优可达值。若多项式时间算法 $A$ 对每个实例 $x$ 都返回一个可行解，且
$$
\mathrm{cost}(A(x)) \le \rho\cdot\mathrm{OPT}(x) \ \ \text{（极小化）}, \qquad \mathrm{value}(A(x)) \ge \mathrm{OPT}(x)/\rho \ \ \text{（极大化）},
$$
则称 $A$ 是一个 **$\rho$-近似**，其中 $\rho \ge 1$（可以依赖输入规模）。
:::

这个比是对一切实例的**最坏情形**保证。证明一个这样的保证的难处在于：我们不知道 $\mathrm{OPT}(x)$——算它是 $\mathsf{NP}$ 难的。所以下文每个证明都把算法的解与一个*能*算出的 $\mathrm{OPT}$ 的**下界**（极小化时）相比较：一个匹配、一棵生成树、一个分数计数。

## 顶点覆盖：因子 2

::: algorithm 基于匹配的顶点覆盖 {#alg-vc-approx}
从 $C = \emptyset$ 开始。依次考察每条边 $\{u, v\}$：若 $u$ 与 $v$ 都不在 $C$ 中，就把两者都加入。输出 $C$。
:::

::: theorem 匹配算法是 2-近似的 {#thm-vc-approx}
[[#alg-vc-approx]] 以线性时间运行，并输出满足 $\lvert C\rvert \le 2\,\mathrm{OPT}$ 的顶点覆盖 $C$。
:::

::: proof
*覆盖性：*扫描结束后，每条边都有一个端点在 $C$ 中——或者考察它时已被覆盖，或者它的两个端点正是在那时被加入。*近似比：*令 $M$ 为端点被加入的那些边之集。$M$ 中任意两条边不共顶点（一条边加入 $M$ 时，其两个端点都不在 $C$ 中，所以它与 $M$ 中更早的边没有公共顶点），故 $M$ 是一个**匹配**，且 $\lvert C\rvert = 2\lvert M\rvert$。任何顶点覆盖都必须包含 $M$ 中每条边的一个端点，而这些端点两两不同，所以 $\mathrm{OPT} \ge \lvert M\rvert$。于是 $\lvert C\rvert = 2\lvert M\rvert \le 2\,\mathrm{OPT}$。
:::

::: example 匹配算法在一个小图上的运行 {#ex-vc-approx}
在带边 $12, 13, 23, 24, 34, 45, 46, 56$（按此顺序）的图上运行 [[#alg-vc-approx]]，并与最优解比较。
::: solution
边 $12$：两端都未覆盖，$C = \{1, 2\}$。边 $13$、$23$、$24$ 此后已被覆盖。边 $34$：两端都未覆盖，$C = \{1, 2, 3, 4\}$。边 $45$、$46$ 已被覆盖。边 $56$：两端都未覆盖，$C = \{1, \dots, 6\}$。匹配是 $\{12, 34, 56\}$，所以 $\lvert C\rvert = 6$，证明保证 $\mathrm{OPT} \ge 3$。实际上 $\mathrm{OPT} = 4$，例如 $\{2, 3, 4, 5\}$，于是实际达到的比是 $1.5$。

```python
from itertools import combinations

def matching_cover(edges):
    """贪心构造极大匹配，取匹配中每条边的两个端点。"""
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:       # 该边仍未覆盖：把它加入匹配
            cover |= {u, v}
    return cover

def min_cover_size(vertices, edges):                # 暴力枚举，用作对照
    return next(k for k in range(len(vertices) + 1)
                for C in combinations(vertices, k)
                if all(u in C or v in C for u, v in edges))

E = [(1, 2), (1, 3), (2, 3), (2, 4), (3, 4), (4, 5), (4, 6), (5, 6)]
print(sorted(matching_cover(E)), min_cover_size(range(1, 7), E))
```

```console
$ python3 vc2.py
[1, 2, 3, 4, 5, 6] 4
```
:::
:::

::: widget graph
nodes: 1@0,1; 2@1,2; 3@1,0; 4@2,1; 5@3,2; 6@3,0
edges: 1-2; 1-3; 2-3; 2-4; 3-4; 4-5; 4-6; 5-6
algorithm: none
caption: [[#ex-vc-approx]] 中的图。算法找到的匹配 $\{12, 34, 56\}$ 迫使任何覆盖含有三个两两不同的顶点，每条匹配边取一个——这就是下界 $\mathrm{OPT} \ge 3$。真正的最优解 $\{2, 3, 4, 5\}$ 有四个顶点；验证每条边都与它相碰。仅三角形 $\{1, 2, 3\}$ 就需要两个覆盖顶点，这就是这里 $\mathrm{OPT} > 3$ 的原因。
:::

因子 $2$ 对该算法是紧的：在完全二部图 $K_{n,n}$ 上它可能取到一个完美匹配并输出全部 $2n$ 个顶点，而一侧（$n$ 个顶点）就是一个覆盖。尽管有数十年的努力，仍未知道存在对某个常数 $\varepsilon > 0$ 达到比 $2 - \varepsilon$ 的多项式时间算法，而且有证据表明这样的算法不存在（[[#sec-inapprox]]）。

::: warning 近似性不在 NP 完全归约下保存
$\mathit{IS}$、$\mathit{VC}$ 与 $\mathit{CLIQUE}$ 作为判定问题是等价的（[[complexity/np-complete-problems#thm-clique-vc]]），但它们的可近似性截然不同。顶点覆盖 $C$ 给出独立集 $V \setminus C$，而一个达到最优因子 $2$ 的覆盖仍可能给出一个毫无用处的独立集：若 $\mathrm{OPT}_{\mathit{VC}} = n/2$，规模为 $n$ 的覆盖是 $2$-近似，而它的补集是空的。事实上独立集（等价地，团）除非 $\mathsf{P} = \mathsf{NP}$ 否则不能在 $n^{1 - \varepsilon}$ 因子内近似。多项式时间归约保持的是*精确*可解性，不是近似解的质量；转移可近似性需要专门的**近似保持归约**。
:::

## 集合覆盖：对数因子

$\mathit{SETCOVER}$：给定 $n$ 个元素的全集 $U$ 与并集为 $U$ 的集合 $S_1, \dots, S_r \subseteq U$，选出尽量少的集合使其并集为 $U$。（顶点覆盖是元素为边、集合为各顶点的关联边集的特例。）

::: algorithm 贪心集合覆盖 {#alg-greedy-set-cover}
只要有元素未被覆盖，就选取能覆盖最多未覆盖元素的集合。
:::

::: theorem 贪心集合覆盖是 $H_n$-近似的 {#thm-set-cover}
[[#alg-greedy-set-cover]] 选取的集合数至多为 $H_n\,\mathrm{OPT}$，其中 $H_n = 1 + \frac12 + \dots + \frac1n \le \ln n + 1$。
:::

::: proof
贪心算法选取一个覆盖 $k$ 个新元素的集合时，向每个这样的元素收取**价格** $1/k$。所有元素的总价格恰等于选出的集合数。把元素按被覆盖的次序排成 $e_1, \dots, e_n$（同时被覆盖的任意排序）。$e_j$ 被覆盖之前，至少还有 $n - j + 1$ 个元素未被覆盖，而它们全被最优解的 $\mathrm{OPT}$ 个集合覆盖，所以其中某个集合至少覆盖它们的 $(n - j + 1)/\mathrm{OPT}$。贪心的选择覆盖的新元素不少于它，故 $e_j$ 的价格至多为 $\mathrm{OPT}/(n - j + 1)$。求和得
$$
\#\text{选出的集合数} = \sum_{j=1}^{n} \mathrm{price}(e_j) \le \mathrm{OPT}\sum_{j=1}^{n}\frac{1}{n - j + 1} = H_n\,\mathrm{OPT}.
$$
最后 $H_n \le 1 + \int_1^n dx/x = 1 + \ln n$。
:::

::: example 贪心会被对数因子欺骗 {#ex-set-cover}
构造一些实例，使贪心用掉大约 $\tfrac12\log_2 n$ 倍于必要的集合数。
::: solution
把 $2(2^k - 1)$ 个元素排成两行、每行 $2^k - 1$ 列。最优覆盖用两个集合 $\mathrm{TOP}$ 与 $\mathrm{BOTTOM}$（每行一个）。再添加集合 $S_{k-1}, S_{k-2}, \dots, S_0$，其中 $S_j$ 由连续 $2^j$ 列的两行组成（依次为 $2^{k-1}, 2^{k-2}, \dots, 1$ 列宽的块并排摆放）。开始时 $S_{k-1}$ 覆盖 $2^k$ 个元素，多于一行的 $2^k - 1$ 个，所以贪心取它；接着 $S_{k-2}$ 覆盖 $2^{k-1}$ 个元素，而每行只剩 $2^{k-1} - 1$ 个；如此下去。贪心取走全部 $k$ 个块。

```python
def greedy_set_cover(universe, sets):
    """反复选取覆盖最多未覆盖元素的集合。"""
    uncovered, chosen = set(universe), []
    while uncovered:
        name = max(sets, key=lambda s: len(sets[s] & uncovered))
        if not sets[name] & uncovered:
            raise ValueError("the sets do not cover the universe")
        chosen.append(name); uncovered -= sets[name]
    return chosen

def bad_instance(k):
    """两行各 2^k - 1 个元素；OPT = 2（两行本身），但贪心取那 k 个块。"""
    top = [("t", i) for i in range(2 ** k - 1)]
    bottom = [("b", i) for i in range(2 ** k - 1)]
    sets = {"TOP": set(top), "BOTTOM": set(bottom)}
    start = 0
    for j in range(k - 1, -1, -1):              # 宽 2^j 列的块，从大到小
        cols = range(start, start + 2 ** j)
        sets[f"S{j}"] = {(r, i) for r in "tb" for i in cols}
        start += 2 ** j
    return top + bottom, sets

for k in (2, 3, 4, 5):
    U, S = bad_instance(k)
    print(k, len(U), greedy_set_cover(U, S))
```

```console
$ python3 setcover.py
2 6 ['S1', 'S0']
3 14 ['S2', 'S1', 'S0']
4 30 ['S3', 'S2', 'S1', 'S0']
5 62 ['S4', 'S3', 'S2', 'S1', 'S0']
```

元素数 $n = 2^{k+1} - 2$ 时，贪心用掉 $k = \log_2(n + 2) - 1$ 个集合，而 $\mathrm{OPT} = 2$：比约为 $\tfrac12\log_2 n$，与 $\ln n + 1$ 的保证只差常数因子。（更精巧的实例说明 $H_n$ 本身对贪心基本是紧的。）
:::
:::

::: widget plot
f: 1 + ln(x); ln(x); log(x)/log(2)/2
x: 1, 1000
labels: \ln n + 1 \text{ （贪心保证）}; \ln n \text{ （困难性阈值）}; \tfrac12\log_2 n \text{ （反例实例）}
caption: $n$ 个元素的集合覆盖的三个对数。贪心从不超过最优的 $H_n \le \ln n + 1$ 倍；[[#ex-set-cover]] 的实例迫使它达到约 $\tfrac12\log_2 n \approx 0.72\ln n$；而除非 $\mathsf{P} = \mathsf{NP}$，没有多项式时间算法能达到 $(1 - \varepsilon)\ln n$（迪努尔（Dinur）与施托伊勒（Steurer），2014）。所以简单的贪心算法除低阶项外已是最好可能。
:::

## 旅行商问题

对 $\mathit{TSP}$，答案取决于距离。

::: theorem 一般 TSP 不可近似 {#thm-tsp-inapprox}
若 $\mathsf{P} \ne \mathsf{NP}$，则对任何多项式时间可计算的 $\rho(n) \ge 1$，都不存在距离取任意正整数时 $\mathit{TSP}$ 的多项式时间 $\rho(n)$-近似算法。
:::

::: proof
反设 $A$ 是这样的算法。给定有 $n$ 个顶点的图 $G$——一个 $\mathit{HAMCYCLE}$ 实例（由 [[complexity/np-complete-problems#thm-uhampath]]，它是 $\mathsf{NP}$ 完全的）——在同样的顶点集上构造完全图：$\{u, v\}$ 是 $G$ 的边时令 $d(u, v) = 1$，否则令 $d(u, v) = \rho(n)\,n + 1$。若 $G$ 有哈密顿圈，最优周游长度为 $n$，于是 $A$ 返回长度不超过 $\rho(n)\,n$ 的周游——它不可能用到任何非边，因为单独一条非边就值 $\rho(n)\,n + 1$。所以 $A$ 的周游就是 $G$ 的一个哈密顿圈。若 $G$ 没有哈密顿圈，则每条周游都用到非边，长度超过 $\rho(n)\,n$。于是检查 $A$ 的周游长度是否为 $n$，就可在多项式时间内判定 $\mathit{HAMCYCLE}$。（那些大距离有 $O(\log(\rho(n)\,n))$ 位，所以实例规模是多项式的。）
:::

这个归约用到的距离违反**三角不等式** $d(u, w) \le d(u, v) + d(v, w)$。满足三角不等式的距离——公路里程、欧氏距离——使问题变得可近似。

::: algorithm 度量 TSP 的双树算法 {#alg-double-tree}
求一棵最小生成树 $T$（[[algorithms/greedy-algorithms#alg-kruskal]]）。按深度优先遍历 $T$ 首次到达各顶点的次序列出这些顶点，输出按此次序访问它们并返回起点的周游。
:::

::: theorem 双树算法是度量 TSP 的 2-近似 {#thm-double-tree}
若 $d$ 满足三角不等式，[[#alg-double-tree]] 输出的周游长度至多 $2\,\mathrm{OPT}$。
:::

::: proof
*下界：*从最优周游中删去一条边得到一条生成路，它是一棵生成树，所以 $w(T) \le \mathrm{OPT}$。*上界：*绕 $T$ 走一圈的完整深度优先行走——每条边都下去又折回——是一条长 $2w(T)$、访问每个顶点的闭行走。输出的周游按顶点在该行走中首次出现的次序访问它们，从一个顶点直接跳到下一个新顶点。由三角不等式（反复使用），每次跳跃都不长于它所跳过的那段行走。所以周游长度至多 $2w(T) \le 2\,\mathrm{OPT}$。
:::

克里斯托菲季斯（Christofides）算法（1976；谢尔久科夫（Serdyukov）独立发现，1978）不去倍增生成树，而是在树的奇度顶点上加一个最小权完美匹配，把近似比改进到 $3/2$。此后四十多年没有更好的结果；2021 年，安娜·卡林（Anna Karlin）、内森·克莱因（Nathan Klein）与沙扬·奥韦斯·加拉恩（Shayan Oveis Gharan）给出一个比率为 $3/2 - 10^{-36}$ 的随机化算法，改进虽小却是实质进展。另一侧，除非 $\mathsf{P} = \mathsf{NP}$，度量 $\mathit{TSP}$ 不能在 $123/122$ 因子内近似（卡尔平斯基（Karpinski）、兰皮斯（Lampis）与施米德（Schmied），2015）。对欧氏平面上的点集存在**多项式时间近似方案**（PTAS）：对每个固定的 $\varepsilon > 0$，有一个 $(1 + \varepsilon)$-近似以多项式时间运行（阿尔奥拉（Arora），1998；米切尔（Mitchell），1999）。

::: definition 近似方案 {#def-ptas}
优化问题的 **PTAS** 是一族算法，每个 $\varepsilon > 0$ 对应一个，对每个固定的 $\varepsilon$ 以关于 $n$ 多项式的时间达到比 $1 + \varepsilon$（例如 $n^{1/\varepsilon}$）。**FPTAS** 则要求时间关于 $n$ 和 $1/\varepsilon$ 都是多项式的。
:::

背包问题有 FPTAS（伊巴拉（Ibarra）与金（Kim），1975）：把每个价值向下取整到 $\varepsilon\,v_{\max}/n$ 的倍数，再对价值做动态规划精确求解取整后的实例，时间 $O(n^3/\varepsilon)$。这之所以可能，是因为背包只是弱 $\mathsf{NP}$ 完全的（[[complexity/np-complete-problems#def-strong-npc]]）：若一个强 $\mathsf{NP}$ 完全问题（目标函数值为多项式有界的整数）有多项式时间的 FPTAS，取 $\varepsilon$ 小于 $1/\mathrm{OPT}$ 就精确解出了它，所以除非 $\mathsf{P} = \mathsf{NP}$ 它不存在。

## MAX-3SAT 与条件期望法

$\mathit{MAX\text{-}3SAT}$：给定一个含 $m$ 个子句、每个子句含三个不同变元的 3CNF 公式，求满足尽量多子句的赋值。

::: theorem 随机赋值满足 7/8 的子句 {#thm-max3sat}
均匀随机赋值平均满足 $7m/8$ 个子句。于是每个这样的公式都有一个满足至少 $7m/8$ 个子句的赋值，且可以在多项式时间内确定性找到；这是一个 $8/7$-近似。
:::

::: proof
含三个不同变元的子句只有在三个文字全假时才假，这以概率 $(1/2)^3 = 1/8$ 发生。由期望的线性性，被满足子句数的期望是 $\frac78 m$。于是存在某个赋值，其满足的子句数不小于期望值。

*用条件期望去随机化。*令 $E(\text{部分赋值})$ 为未赋值变元随机时满足子句数的期望。它可在多项式时间内算出：已满足的子句贡献 $1$；其余含 $f$ 个未赋值文字的子句贡献 $1 - 2^{-f}$（故 $f = 0$ 时贡献 $0$）。依次处理每个变元：变元未赋值时的 $E$ 是令 $x_i = 0$ 与 $x_i = 1$ 时 $E$ 的平均，所以两个取值之一不会使 $E$ 下降；就取它。结束时所有变元都已赋值，$E$ 就是实际满足的子句数，至少为最初的 $7m/8$。由于 $\mathrm{OPT} \le m$，比至多 $8/7$。
:::

::: example 逐个定值而不失阵地 {#ex-conditional}
对七个子句 $(x_1 \lor x_2 \lor x_3)$、$(\overline{x_1} \lor x_2 \lor \overline{x_4})$、$(x_1 \lor \overline{x_3} \lor x_4)$、$(\overline{x_2} \lor \overline{x_3} \lor \overline{x_4})$、$(\overline{x_1} \lor \overline{x_2} \lor x_3)$、$(x_2 \lor x_3 \lor x_4)$、$(\overline{x_1} \lor x_3 \lor \overline{x_4})$ 应用条件期望法。
::: solution
```python
from fractions import Fraction
from itertools import product

def expected_satisfied(clauses, fixed):
    """`fixed` 中变量已赋值、其余随机时，被满足子句数的期望 E。"""
    total = Fraction(0)
    for c in clauses:
        if any(fixed.get(abs(l)) == (l > 0) for l in c):
            total += 1                                    # 该子句已满足
        else:
            free = len({abs(l) for l in c if abs(l) not in fixed})
            total += 1 - Fraction(1, 2 ** free)           # 只有全部自由文字为假才不满足
    return total

def conditional_expectations(clauses, n):
    fixed = {}
    for v in range(1, n + 1):                             # 保证期望不下降
        fixed[v] = max((True, False), key=lambda b: expected_satisfied(clauses, {**fixed, v: b}))
    return fixed

phi = [[1, 2, 3], [-1, 2, -4], [1, -3, 4], [-2, -3, -4], [-1, -2, 3], [2, 3, 4], [-1, 3, -4]]
a = conditional_expectations(phi, 4)
best = max(sum(any((l > 0) == bits[abs(l) - 1] for l in c) for c in phi)
           for bits in product([False, True], repeat=4))
print(expected_satisfied(phi, {}), a, expected_satisfied(phi, a), best)
```

```console
$ python3 maxsat.py
49/8 {1: False, 2: True, 3: False, 4: True} 7 7
```

初始期望是 $7 \cdot \frac78 = \frac{49}{8} = 6.125$。逐个固定 $x_1 = 0$、$x_2 = 1$、$x_3 = 0$、$x_4 = 1$ 从不使它下降，而最终的赋值满足全部 $7$ 个子句——这里它正是穷举搜出的最优解；保证是至少 $6.125$ 个被满足的子句，而计数是整数，故至少 $7$ 个。
:::
:::

值得注意的是，$7/8$ 已是终点：对每个 $\varepsilon > 0$，对可满足的 $\mathit{MAX\text{-}3SAT}$ 实例达到最优的 $7/8 + \varepsilon$ 是 $\mathsf{NP}$ 难的（霍斯塔德（Håstad），2001）。这一结果背后的工具就是 PCP 定理。

::: quiz
下列哪些近似保证已知可在多项式时间内达到？
- [x] 顶点覆盖，因子 $2$。
- [x] 集合覆盖，因子 $\ln n + 1$。
- [ ] 距离任意的 $\mathit{TSP}$，因子 $1000$。
- [x] $\mathit{MAX\text{-}3SAT}$，因子 $8/7$。
::: solution
顶点覆盖（[[#thm-vc-approx]]）、集合覆盖（[[#thm-set-cover]]）与 $\mathit{MAX\text{-}3SAT}$（[[#thm-max3sat]]）有这些保证。一般 $\mathit{TSP}$ 除非 $\mathsf{P} = \mathsf{NP}$ 没有任何常数因子近似（[[#thm-tsp-inapprox]]）；只有度量 $\mathit{TSP}$ 可近似。
:::
:::

## 概率可检验证明

$\mathsf{NP}$ 验证器要读完整份证书。若它只能随机读其中几个比特呢？

::: definition PCP 验证器 {#def-pcp}
设 $r, q\colon \N \to \N$。若存在一台多项式时间的概率机器 $V$——**验证器**——可随机访问一份**证明**串 $\pi$，使得在长度 $n$ 的输入 $x$ 上，$V$ 使用 $O(r(n))$ 个随机比特、读 $\pi$ 的 $O(q(n))$ 个比特（读的位置由 $x$ 与随机比特算出），且

- **完备性**：若 $x \in L$，存在证明 $\pi$ 使 $\Prob[V^\pi(x) \text{ 接受}] = 1$；
- **可靠性**：若 $x \notin L$，则对每个 $\pi$，$\Prob[V^\pi(x) \text{ 接受}] \le 1/2$，

则称语言 $L$ 属于 $\mathsf{PCP}(r(n), q(n))$。
:::

两个简单情形钉定了两端。$\mathsf{PCP}(0, \mathrm{poly}(n)) = \mathsf{NP}$：没有随机性时，验证器就是普通的 $\mathsf{NP}$ 验证器。又 $\mathsf{PCP}(\log n, 1) \subseteq \mathsf{NP}$：$O(\log n)$ 个随机比特只有多项式多个随机串，每个只引起 $O(1)$ 次查询，所以验证器总共只看 $\pi$ 的多项式多个位置；一台 $\mathsf{NP}$ 机器可以猜出这些位置上的比特，对*每个*随机串运行验证器，仅当全部运行都接受时接受（[[#ex-pcp-np]]）。

::: theorem PCP 定理 {#thm-pcp}
$\mathsf{NP} = \mathsf{PCP}(\log n, 1)$。
:::

包含关系 $\mathsf{NP} \subseteq \mathsf{PCP}(\log n, 1)$ 我们不复证明：原始证明（阿尔奥拉与萨夫拉（Safra）；阿尔奥拉、伦德（Lund）、莫特瓦尼（Motwani）、苏丹（Sudan）与塞格迪（Szegedy），均发表于 1998 年，源自 1992 年的会议论文）用低次多项式对证明作代数编码并串接一列复合验证器；迪努尔（Dinur）的组合证明（2007）则在约束图上反复做"间隙放大"；每一个都够写满阿尔奥拉–巴拉克（Arora–Barak）教科书的整整一章。仅陈述本身就足够惊人：每个数学证明（$\mathsf{NP}$ 形式、且带多项式长证明的断言）都可以在多项式膨胀之内改写成一种形式，使一个只读、比如说 $30$ 个随机选取比特的验证器，能以至少 $1/2$ 的概率抓住原证明中的任意错误——再用 $k$ 组独立样本重复，错误概率就压到 $2^{-k}$ 以下。这样的证明里错误藏不住：它们被摊得满纸都是。

### PCP 与近似困难性

与近似的联系经由**间隙问题**。对 $0 < \varepsilon < 1$，令 $\mathit{GAP\text{-}3SAT}_\varepsilon$ 为如下承诺问题：区分可满足的 3CNF 公式与那些*每个*赋值都留下超过 $\varepsilon$ 比例的子句不满足的公式。

::: theorem 作为近似困难性的 PCP 定理 {#thm-pcp-gap}
PCP 定理蕴含：存在常数 $\varepsilon > 0$ 使 $\mathit{GAP\text{-}3SAT}_\varepsilon$ 是 $\mathsf{NP}$ 难的——存在多项式时间归约，把每个 $\mathit{3SAT}$ 实例 $\varphi$ 映为 3CNF 公式 $\psi$，使得 $\varphi$ 可满足时 $\psi$ 也可满足，而 $\varphi$ 不可满足时每个赋值都违反 $\psi$ 超过 $\varepsilon$ 比例的子句。因此，若 $\mathsf{P} \ne \mathsf{NP}$，则对 $\rho < 1/(1 - \varepsilon)$，$\mathit{MAX\text{-}3SAT}$ 没有多项式时间的 $\rho$-近似。
:::

::: proof
由 PCP 定理，$\mathit{3SAT}$ 有一个使用 $c\log n$ 个随机比特、$q$ 次查询的验证器 $V$，其中 $c, q$ 为常数。给定规模 $n$ 的 $\varphi$，考察 $R = 2^{c\log n} = n^c$ 个随机串 $\rho$ 中的每一个。对每个 $\rho$，$V$ 在多项式时间内算出证明的 $q$ 个位置 $i_1, \dots, i_q$ 与一个布尔函数 $f_\rho\colon \{0, 1\}^q \to \{0, 1\}$，它根据该处读到的比特决定是否接受。把证明的比特视为布尔变元 $y_1, y_2, \dots$。把 $f_\rho(y_{i_1}, \dots, y_{i_q})$ 写成至多 $2^q$ 个子句、每子句 $q$ 个文字的 CNF 公式（对每个使 $q$ 个比特被拒的组合取一个排除它的子句），再把每个子句用新变元化为至多 $q$ 个三文字子句（[[complexity/np-completeness#lem-clause-split]]）。令 $\psi$ 为对一切 $\rho$ 的合取：每个随机串至多 $K = q\,2^q$ 个子句，共 $R \cdot K$ 个——因 $q$ 是常数，这是多项式的。

若 $\varphi$ 可满足，某个证明 $\pi$ 使 $V$ 对每个 $\rho$ 都接受；令 $y = \pi$ 就满足每个 $f_\rho$，而新变元可取得让每个拆分出的子句都满足。若 $\varphi$ 不可满足，则对任何赋值，把它的 $y$ 部分读作证明 $\pi$：$V$ 对至少一半随机串拒绝，而对每个拒绝的 $\rho$，$f_\rho$ 的 CNF 有一个假子句，所以来自 $\rho$ 的 $\le K$ 个三文字子句中至少一个为假，无论新变元取什么。于是至多 $RK$ 个子句中至少 $R/2$ 个不被满足：比例至少 $\varepsilon = 1/(2K) = 1/(q\,2^{q+1})$。（严格地说，对任何更小的正 $\varepsilon$，"超过"成立。）

最后，若 $\rho$-近似 $A$ 满足 $\rho < 1/(1 - \varepsilon)$，它就能判定 $\mathit{3SAT}$：对可满足的 $\varphi$ 产生的 $\psi$，它至少满足 $m/\rho > (1 - \varepsilon)m$ 个子句；而对不可满足的 $\varphi$，没有赋值能满足超过 $(1 - \varepsilon)m$ 个。把 $A$ 的计数与 $(1 - \varepsilon)m$ 比较即可分开两种情形。
:::

反过来也成立：从归约到 $\mathit{GAP\text{-}3SAT}_\varepsilon$ 出发，可以造出一个 PCP 验证器——它随机挑 $\psi$ 的 $O(1/\varepsilon)$ 个子句，并在一份列出满足赋值的证明中读每个子句的三个变元。所以 PCP 定理与逼近 $\mathit{MAX\text{-}3SAT}$ 的常数因子困难性是同一陈述的两种语言——"证明的局部可检验性"与"近似之困难"。

::: example 间隙的大小 {#ex-gap}
一个用于 $\mathit{3SAT}$ 的 PCP 验证器使用 $c\log n$ 个随机比特、读 $q = 3$ 个证明比特。[[#thm-pcp-gap]] 的构造对每个随机串产生多少个三文字子句？对不可满足的输入，它保证多大比例的子句不被满足？
::: solution
$q = 3$ 时，三个比特上的接受判定本身已是至多 $2^3 = 8$ 个子句的 3CNF 公式（无需拆分），所以 $K = 8$，$\varepsilon = 1/(2 \cdot 8) = 1/16$：若 $\varphi$ 不可满足，每个赋值都违反 $\psi$ 的至少 $1/16$ 个子句。霍斯塔德的最优 3-查询 PCP（2001）有更精细的结构——验证器检查单个线性方程 $y_i \oplus y_j \oplus y_k = b$，接受正确证明的概率为 $1 - \delta$、接受错误证明的概率至多 $1/2 + \delta$——正是它把 $\mathit{MAX\text{-}3SAT}$ 的困难性阈值一路推到 $7/8 + \varepsilon$。
:::
:::

## 不可近似性的全景 {#sec-inapprox}

在 PCP 定理之上，经典问题的可近似性现在多半已被精确知晓。下表总结截至 2026 年的已知状况；" $\mathsf{NP}$ 难"的意思是（除非另有说明）：达到该比率的多项式时间算法将蕴含 $\mathsf{P} = \mathsf{NP}$。

| 问题 | 多项式时间内已知的最好比 | 困难性 |
|---|---|---|
| $\mathit{MAX\text{-}3SAT}$ | $8/7$（随机赋值） | $8/7 - \varepsilon$ 是 $\mathsf{NP}$ 难的（霍斯塔德，2001） |
| 顶点覆盖 | $2$ | $\sqrt2 - \varepsilon$ 为 $\mathsf{NP}$ 难（霍特（Khot）、明策（Minzer）与萨夫拉，2018）；$2 - \varepsilon$ 在唯一博弈猜想下难（霍特与雷格夫（Regev），2008） |
| 集合覆盖 | $\ln n + 1$（贪心） | $(1 - \varepsilon)\ln n$ 为 $\mathsf{NP}$ 难（迪努尔与施托伊勒，2014；更早法伊格（Feige），1998，在更强假设下） |
| 团、独立集 | $O(n(\log\log n)^2/\log^3 n)$（法伊格，2004） | $n^{1 - \varepsilon}$ 为 $\mathsf{NP}$ 难（霍斯塔德，1999，假设 $\mathsf{NP} \ne \mathsf{ZPP}$；祖克曼（Zuckerman），2007，假设 $\mathsf{P} \ne \mathsf{NP}$） |
| 度量 $\mathit{TSP}$ | $3/2 - 10^{-36}$（卡林、克莱因与奥韦斯·加拉恩，2021） | $123/122$ 为 $\mathsf{NP}$ 难（卡尔平斯基、兰皮斯与施米德，2015） |
| $\mathit{MAX\text{-}CUT}$ | $\approx 1/0.878$（戈曼斯（Goemans）与威廉姆森（Williamson），1995） | 在唯一博弈猜想下最优（霍特、金德勒（Kindler）、莫塞尔（Mossel）与奥唐奈（O'Donnell），2007）；$17/16 - \varepsilon$ 为 $\mathsf{NP}$ 难（霍斯塔德，2001） |
| 背包、欧氏 $\mathit{TSP}$ | $1 + \varepsilon$（FPTAS、PTAS） | — |

**唯一博弈猜想**（Unique Games Conjecture，霍特，2002）断言：一个大字母表上、约束均为置换的约束满足问题的某个特定间隙问题是 $\mathsf{NP}$ 难的。截至 2026 年它仍是**未决**的。它将蕴含表中若干行的简单算法恰为最优；相关的 2 对 2 博弈定理（霍特、明策与萨夫拉，2018）的证明是它的部分证据。

::: history
戴维·约翰逊（David Johnson）的 "Approximation algorithms for combinatorial problems"（1974）分析了贪心集合覆盖算法（带 $H_n$ 界——洛瓦兹于 1975 年也独立证明，赫瓦塔尔（Chvátal）于 1979 年推广到加权情形）与 $\mathit{MAX\text{-}SAT}$ 的随机赋值。萨塔季·萨赫尼（Sartaj Sahni）与特奥菲洛·冈萨雷斯（Teofilo Gonzalez）在 1976 年——即尼科斯·克里斯托菲季斯（Nicos Christofides）的 $3/2$ 算法发表之年——证明了一般 $\mathit{TSP}$ 的不可近似性；奥斯卡·伊巴拉（Oscar Ibarra）与金（Chul Kim）于 1975 年给出背包的 FPTAS。PCP 定理萌生于交互证明的研究：法伊格、戈德瓦瑟（Goldwasser）、洛瓦兹、萨夫拉与塞格迪把多证明者证明与团问题的近似困难性联系起来（1991），萨尼耶夫·阿尔奥拉（Sanjeev Arora）与施穆埃尔·萨夫拉（Shmuel Safra），以及阿尔奥拉、卡斯滕·伦德（Carsten Lund）、拉吉夫·莫特瓦尼（Rajeev Motwani）、马杜·苏丹（Madhu Sudan）与马里奥·塞格迪，于 1992 年证明了定理（期刊版 1998 年）。这些论文的九位作者共同获得 2001 年哥德尔奖；约翰·霍斯塔德（Johan Håstad）因其最优不可近似性结果于 2011 年获奖，伊里特·迪努尔（Irit Dinur）因 PCP 定理的组合证明（2007）于 2019 年获奖。萨巴什·霍特（Subhash Khot）于 2002 年提出唯一博弈猜想，并于 2014 年获内万林纳奖。
:::

## 后续内容

近似算法自成一门领域，拥有强大的通用技术——线性规划松弛与取整、原始–对偶方法、半定规划（如戈曼斯–威廉姆森算法）——带保证的局部搜索等等，参见威廉姆森与什莫伊斯（Shmoys）的 *The Design of Approximation Algorithms* 等教材。PCP 定理属于证明系统更大故事的一部分：交互证明（$\mathsf{IP} = \mathsf{PSPACE}$，[[complexity/randomised-complexity]]）、零知识证明（[[cryptography]]），以及简洁论证——基于 PCP 的协议，截至 2026 年已用于实际部署的密码系统中，以快速验证大规模计算。[[quantum-computing]] 则追问：这些问题中哪些是量子计算机能更快求解或近似的。

::: summary
- **$\rho$-近似**在多项式时间内返回每个实例上距最优因子 $\rho$ 以内的解（[[#def-approx]]）；证明拿可计算的 $\mathrm{OPT}$ 界作比较。
- **顶点覆盖**：极大匹配的两个端点给出 $2$-近似（[[#thm-vc-approx]]）。**集合覆盖**：贪心达到 $H_n \le \ln n + 1$（[[#thm-set-cover]]），基本最优。
- **TSP**：距离任意时任何因子都不可近似（[[#thm-tsp-inapprox]]）；有三角不等式时，倍增最小生成树得 $2$（[[#thm-double-tree]]），克里斯托菲季斯得 $3/2$。
- **MAX-3SAT**：随机赋值平均满足 $7/8$ 的子句，用条件期望去随机化（[[#thm-max3sat]]）；$7/8 + \varepsilon$ 是 $\mathsf{NP}$ 难的。
- **PCP 定理**：$\mathsf{NP} = \mathsf{PCP}(\log n, 1)$（[[#thm-pcp]]，只陈述未证明）：证明可以只读随机选出的常数个比特来检验。它等价于 $\mathit{MAX\text{-}3SAT}$ 常数间隙的 $\mathsf{NP}$ 难度（[[#thm-pcp-gap]]）。
- 作为判定问题等价的问题，可近似性可以天差地别；唯一博弈猜想（截至 2026 年未决）将解决若干尚存间隙。
:::

## 习题

::: exercise 读匹配界 {level=1 check="10"}
在某个图上，[[#alg-vc-approx]] 构造出一个有 $5$ 条边的极大匹配。它输出的覆盖有多少个顶点？关于 $\mathrm{OPT}$ 你能得出什么结论？（填写覆盖的大小。）
::: solution
覆盖有 $2 \cdot 5 = 10$ 个顶点。每个覆盖都必须包含 $5$ 条两两不相交的匹配边各自的端点，所以 $\mathrm{OPT} \ge 5$，从而该覆盖距最优不超过因子 $10/5 = 2$（并且 $5 \le \mathrm{OPT} \le 10$）。
:::
:::

::: exercise 一个调和数 {level=1 check="25/12"}
计算 $H_4$，即 [[#thm-set-cover]] 对 $4$ 个元素的全集给出的保证。（填写分数。）
::: solution
$H_4 = 1 + \frac12 + \frac13 + \frac14 = \frac{12 + 6 + 4 + 3}{12} = \frac{25}{12} \approx 2.083$，略小于 $\ln 4 + 1 \approx 2.386$。
:::
:::

::: exercise 被满足子句的期望 {level=1 check="35"}
一个 3CNF 公式有 $40$ 个子句，每个含三个不同变元。均匀随机赋值平均满足多少个子句？（填写数字。）
::: solution
$\frac78 \cdot 40 = 35$。于是某个赋值至少满足 $35$ 个子句。
:::
:::

::: exercise 因子 2 是紧的 {level=2}
用完全图证明：[[#alg-vc-approx]] 可能输出规模恰为 $2\,\mathrm{OPT}$ 的覆盖；而下界"$\mathrm{OPT} \ge$ 极大匹配的大小"在另一个方向上可能差近因子 $2$。
::: solution
在 $K_{n,n}$ 上（无论边的次序如何）算法找到一个极大匹配；$K_{n,n}$ 的每个极大匹配都是完美匹配，有 $n$ 条边，所以输出有 $2n$ 个顶点，而二分部的一侧——$n$ 个顶点——是覆盖：比恰为 $2$。在完全图 $K_{2n}$ 上，完美匹配有 $n$ 条边，但 $\mathrm{OPT} = 2n - 1$（漏掉两个顶点就会漏掉它们之间的边），所以匹配界 $n$ 约为 $\mathrm{OPT}$ 的一半，而此时算法的 $2n$ 个顶点几乎最优。
:::
:::

::: exercise 抄近路的树游走 {level=2}
城市 $A, B, C, D, E$ 位于点 $(0,0)$、$(2,0)$、$(4,0)$、$(2,2)$、$(2,-2)$，距离取欧氏距离。求一棵最小生成树、从 $A$ 出发的双树周游及其长度，并与界 $2\,w(T)$ 比较。
::: solution
距离：$AB = BC = BD = BE = 2$；$AD = AE = CD = CE = 2\sqrt2 \approx 2.83$；$AC = DE = 4$。以 $B$ 为中心的星（边 $BA, BC, BD, BE$）权为 $8$，是最小生成树（每棵生成树有 $4$ 条边，没有边短于 $2$）。从 $A$ 出发的深度优先遍历先走 $A, B$，再按某个次序走 $B$ 的其余孩子，比如 $C, D, E$：周游 $A, B, C, D, E, A$ 长 $2 + 2 + 2\sqrt2 + 4 + 2\sqrt2 = 8 + 4\sqrt2 \approx 13.66 \le 2w(T) = 16$。换一个孩子的次序 $D, C, E$ 更好：$A, B, D, C, E, A$ 长 $2 + 2 + 2\sqrt2 + 2\sqrt2 + 2\sqrt2 = 4 + 6\sqrt2 \approx 12.49$，对从 $A$ 出发全部 $24$ 条周游穷举验证它是最优的。由于 $\mathrm{OPT} \ge w(T) = 8$，两条双树周游都被保证落在因子 $2$ 以内；这里它们距最优不到 $1.1$。
:::
:::

::: exercise 手工去随机化 {level=2}
对由两个子句 $(x_1 \lor x_2 \lor x_3)$ 与 $(\overline{x_1} \lor \overline{x_2} \lor \overline{x_3})$ 组成的公式应用条件期望法，依次固定 $x_1, x_2, x_3$，平局时取"真"。写出每步之后的条件期望。
::: solution
初始 $E = 2 \cdot \frac78 = 1.75$。固定 $x_1$：取 $x_1 = 1$ 时第一个子句已满足（$1$），第二个子句剩两个自由文字（$1 - \frac14 = 0.75$），$E = 1.75$；取 $x_1 = 0$ 由对称性也是 $E = 1.75$。平局：取 $x_1 = 1$。固定 $x_2$：$x_2 = 1$ 给出 $1 + (1 - \frac12) = 1.5$；$x_2 = 0$ 给出 $1 + 1 = 2$。取 $x_2 = 0$，$E = 2$。固定 $x_3$：两个取值都保持两个子句满足，$E = 2$；取 $x_3 = 1$。最终赋值 $(1, 0, 1)$ 满足两个子句。期望从未下降：$1.75 \to 1.75 \to 2 \to 2$。
:::
:::

::: exercise 团没有常数因子近似 {level=3}
对图 $G$、$H$，令 $G \times H$ 为以有序对 $(g, h)$ 为顶点的图：$(g, h)$ 与 $(g', h')$ 相邻当且仅当（$g = g'$ 或 $g g'$ 是边）且（$h = h'$ 或 $h h'$ 是边），并且两对不同。(a) 证明 $\omega(G \times G) = \omega(G)^2$，其中 $\omega$ 是团数。(b) 推出：若团有多项式时间的常数因子 $\rho$-近似，则它对每个常数 $\rho' > 1$ 都有。(c) 结合"由 PCP 定理，某个常数 $\rho_0 > 1$ 对团是 $\mathsf{NP}$ 难的"，得出结论：除非 $\mathsf{P} = \mathsf{NP}$，任何常数因子都不可达。
::: solution
(a) 若 $K$ 是 $G$ 的团，则 $K \times K$ 是 $G \times G$ 的团（任意两个不同的对在每个坐标上或相同或相邻），故 $\omega(G \times G) \ge \omega(G)^2$。反过来，若 $Q$ 是 $G \times G$ 的团，它在两个坐标上的投影 $Q_1, Q_2$ 是 $G$ 的团（$Q$ 中不同对的第一个坐标两两必须相邻），且 $Q \subseteq Q_1 \times Q_2$，故 $\lvert Q\rvert \le \omega(G)^2$。
(b) 给定 $G^{\times k}$（$k$ 重积，$k$ 为 $2$ 的常数幂，规模 $n^k$）的一个团 $Q$，(a) 的论证从它的投影中提取出 $G$ 的一个大小至少 $\lvert Q\rvert^{1/k}$ 的团。若 $A$ 找到大小至少 $\omega(G^{\times k})/\rho = \omega(G)^k/\rho$ 的团，我们就得到 $G$ 中大小至少 $\omega(G)/\rho^{1/k}$ 的团。取 $k$ 使 $\rho^{1/k} \le \rho'$，就得到一个 $\rho'$-近似，其运行时间关于 $n^k$ 多项式，$k$ 为常数时仍是多项式。
(c) 若某个常数 $\rho$ 可达，(b) 就给出 $\rho' < \rho_0$ 的近似，而这是 $\mathsf{NP}$ 难的；于是 $\mathsf{P} = \mathsf{NP}$。（用更好的 PCP 更细致地运用同一想法，可得表中 $n^{1 - \varepsilon}$ 的困难性。）
:::
:::

::: exercise PCP 定理的容易方向 {#ex-pcp-np level=3}
证明 $\mathsf{PCP}(\log n, 1) \subseteq \mathsf{NP}$ 且 $\mathsf{PCP}(0, \log n) \subseteq \mathsf{P}$。
::: solution
*第一个断言。*设 $V$ 至多用 $c\log n$ 个随机比特、$q$ 次查询。随机串至多 $n^c$ 个，对每个随机串，$V$（其自适应程度至多有界）读至多 $q$ 个位置；由于 $V$ 以多项式时间运行，被查询位置的下标多项式有界，而对所有随机串与对更早查询的一切可能回答，至多 $n^c \cdot 2^q \cdot q$ 个位置可能被读到。$\mathsf{NP}$ 证书就是这些位置上的证明比特之列表（其余位置补零）。$\mathsf{NP}$ 验证器用这份证明在每个随机串上运行 $V$，仅当每次运行都接受时接受。若 $x \in L$，使 $V$ 以概率 $1$ 接受的那个证明可行。若 $x \notin L$，任何证明都使至少一半运行拒绝，所以 $\mathsf{NP}$ 验证器拒绝每个证书。
*第二个断言。*没有随机性时 $V$ 是确定性的，读 $q = O(\log n)$ 个比特——是自适应地读，所读比特可能依赖早先的回答，但回答序列只有 $2^q = \mathrm{poly}(n)$ 种。一个确定性多项式时间算法对每个回答序列模拟 $V$，仅当某个序列导致接受时接受（该序列对应一份证明，把被查询位置相应设值即可；一次运行中的不同查询是不同位置，所以赋值相容）。由可靠性，若 $x \notin L$，没有证明——因而没有由证明实现的回答序列——能使 $V$ 接受。
:::
:::
