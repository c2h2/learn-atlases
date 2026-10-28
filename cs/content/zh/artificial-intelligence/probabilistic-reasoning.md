你的汽车打不着火。可能是电瓶亏电，也可能是油箱空了——也可能两者皆是；若起动机坏了，则两者皆非。油表显示空，这指向油箱，但电瓶亏电也可能使油表显示空。大灯明亮，则对电瓶不利。基于逻辑的智能体（[[artificial-intelligence/logical-agents]]）只能说哪些解释是*可能的*；而一位修车师傅会给各种解释分配权重，且权重随每一个观察而移动。本章讲的是用**信念程度**——概率——进行推理的智能体。

概率论给出规则——乘法定理、贝叶斯定理、边缘化——这些都教在 [Maths Atlas：条件概率](/learn/maths/lesson.php?c=probability&l=conditional-probability) 里。AI 的难题在于规模。$n$ 个布尔变量的完整联合分布需要 $2^n - 1$ 个数字，超过几十个变量便无法指定、存储或求和。**贝叶斯网络**通过利用**条件独立性**解决这一问题：每个变量只直接依赖于少数其他变量，联合分布因而分解为一些小表。我们定义贝叶斯网络，用 **d-分离**从图上读出独立性，用**变量消元**精确计算后验概率（并证明一般情形下没有方法能高效做到），用**采样**作近似，最后加上时间：**隐马尔可夫模型**与**前向算法**，后者从一串含噪观测中维护智能体对变化着的世界的信念。

## 贝叶斯网络

我们处理离散的**随机变量** $X_1, \dots, X_n$，用大写书写，取值用小写；$\Prob(X)$ 表示 $X$ 的分布（一张表），$\Prob(x)$ 表示取某个值的概率。回顾下面一切都赖以建立的两个事实：
$$
\Prob(x_1, \dots, x_n) = \prod_{i=1}^n \Prob(x_i \mid x_1, \dots, x_{i-1}) \quad\text{（链式法则）}, \qquad \Prob(x \mid e) = \frac{\Prob(x, e)}{\Prob(e)} = \alpha\, \Prob(x, e),
$$ {#eq-chain-rule}
其中 $\alpha = 1/\Prob(e)$ 是**归一化常数**：我们对每个 $x$ 计算 $\Prob(x, e)$，再重新缩放使总和为 $1$。若只要 $\Prob(y, z) > 0$ 就有 $\Prob(x \mid y, z) = \Prob(x \mid z)$，则称变量 $X$ 与 $Y$ 在给定 $Z$ 下**条件独立**，记作 $X \perp Y \mid Z$；等价地，$\Prob(x, y \mid z) = \Prob(x \mid z)\Prob(y \mid z)$。

::: definition 贝叶斯网络 {#def-bayes-net}
一个**贝叶斯网络**由一个顶点为随机变量 $X_1, \dots, X_n$ 的有向无环图，以及对每个 $X_i$ 的一张**条件概率表**（CPT）$\theta(x_i \mid \mathrm{pa}_i)$ 构成：对父母 $\mathrm{Pa}(X_i)$ 取值的每种组合 $\mathrm{pa}_i$，它给出 $X_i$ 上的一个分布。它定义了联合分布
$$
\Prob(x_1, \dots, x_n) = \prod_{i=1}^n \theta(x_i \mid \mathrm{pa}_i).
$$ {#eq-bn-factorisation}
:::

::: theorem 该网络定义一个具有给定条件分布的分布 {#thm-bn-semantics}
乘积 [[#eq-bn-factorisation]] 是一个概率分布，且在其中对每个 $i$ 都有 $\Prob(x_i \mid \mathrm{pa}_i) = \theta(x_i \mid \mathrm{pa}_i)$（只要 $\Prob(\mathrm{pa}_i) > 0$）。此外，每个变量在给定其父母的条件下，与其非后代条件独立（**局部马尔可夫性质**）。
:::

::: proof
把变量按拓扑序编号，使父母先于孩子。*总和为一。*先对 $x_n$ 求和这个乘积：$X_n$ 只出现在一个因子 $\theta(x_n \mid \mathrm{pa}_n)$ 中，因为它不是任何人的孩子，且 $\sum_{x_n} \theta(x_n \mid \mathrm{pa}_n) = 1$。剩下的是 $X_1, \dots, X_{n-1}$ 的乘积；重复此操作，总和为 $1$。同样的论证表明，对每个 $k$，$X_1, \dots, X_k$ 的边缘分布是 $\Prob(x_1, \dots, x_k) = \prod_{i \le k} \theta(x_i \mid \mathrm{pa}_i)$。*条件分布。*于是 $\Prob(x_k \mid x_1, \dots, x_{k-1}) = \Prob(x_1, \dots, x_k)/\Prob(x_1, \dots, x_{k-1}) = \theta(x_k \mid \mathrm{pa}_k)$，它通过父母依赖于较早的变量，别无其他。所以 $X_k$ 在给定父母的条件下独立于它的前驱，而对非父母的先前驱求和便得 $\Prob(x_k \mid \mathrm{pa}_k) = \theta(x_k \mid \mathrm{pa}_k)$。*局部马尔可夫性质。*对给定的 $X_k$，选取拓扑序使 $X_k$ 的所有非后代都排在它之前（这是可行的：$X_k$ 的非后代连同 $X_k$ 的祖先构成一个对"取父母"封闭的集合）。上一步便表明 $X_k$ 在给定父母的条件下独立于它的全部前驱——其中包含它的全部非后代。
:::

省下的规模是巨大的。若每个变量至多有 $k$ 个父母，网络对布尔变量至多需要 $n \cdot 2^k$ 个数字，而完整联合分布需要 $2^n - 1$ 个。建模也更容易：CPT 是一条局部的、往往带因果意味的陈述——给定电瓶与油箱的状态，油表显示空的概率有多大——专家可以估计它，也可以从数据中学到它。

::: example 一个诊断网络 {#ex-car-network}
用布尔变量 $B$（电瓶亏电）、$F$（油箱空了）、$L$（灯光昏暗）、$G$（油表显示空）与 $S$（汽车发动）为这辆车建模，弧为 $B \to L$、$B \to G$、$F \to G$、$B \to S$、$F \to S$。选取 CPT，并用对联合分布求和计算：在汽车未能发动的条件下电瓶亏电的概率；以及进一步加入证据后该概率如何变化。
::: solution
CPT 给出每个变量为真的概率：$\Prob(B) = 0.05$、$\Prob(F) = 0.10$、$\Prob(L \mid B) = 0.90$、$\Prob(L \mid \lnot B) = 0.05$，以及

| $B$ | $F$ | $\Prob(G \mid B, F)$ | $\Prob(S \mid B, F)$ |
|---|---|---|---|
| T | T | $0.95$ | $0.00$ |
| T | F | $0.80$ | $0.02$ |
| F | T | $0.95$ | $0.01$ |
| F | F | $0.02$ | $0.97$ |

这是 $1 + 1 + 2 + 4 + 4 = 12$ 个数字，而不是 $2^5 - 1 = 31$ 个。枚举式推理对与证据相容的所有世界求和乘积 [[#eq-bn-factorisation]]：

```python
from itertools import product

parents = {"B": [], "F": [], "L": ["B"], "G": ["B", "F"], "S": ["B", "F"]}
cpt = {"B": {(): 0.05}, "F": {(): 0.10},
       "L": {(True,): 0.90, (False,): 0.05},
       "G": {(True, True): 0.95, (True, False): 0.80, (False, True): 0.95, (False, False): 0.02},
       "S": {(True, True): 0.00, (True, False): 0.02, (False, True): 0.01, (False, False): 0.97}}
order = ["B", "F", "L", "G", "S"]            # 一个拓扑序

def p(var, value, world):
    pt = cpt[var][tuple(world[u] for u in parents[var])]
    return pt if value else 1 - pt

def joint(world):                            # 贝叶斯网络的链式法则
    prob = 1.0
    for v in order: prob *= p(v, world[v], world)
    return prob

def enumerate_ask(query, evidence):
    """对所有世界求和联合分布，计算 P(query | evidence)。"""
    dist = {}
    for vals in product([True, False], repeat=len(order)):
        w = dict(zip(order, vals))
        if all(w[e] == x for e, x in evidence.items()):
            dist[w[query]] = dist.get(w[query], 0) + joint(w)
    z = sum(dist.values())
    return {k: round(v / z, 4) for k, v in dist.items()}
```

```console
$ python3 bn.py
P(B)                  {True: 0.05, False: 0.95}
P(B | S=F)            {True: 0.2909, False: 0.7091}
P(F | S=F)            {True: 0.5868, False: 0.4132}
P(B | S=F, F=T)       {True: 0.0505, False: 0.9495}
P(B | S=F, G=T)       {True: 0.3082, False: 0.6918}
P(F | S=F, G=T)       {True: 0.7244, False: 0.2756}
P(B | S=F, G=T, L=F)  {True: 0.0448, False: 0.9552}
```

未能发动的汽车把电瓶亏电的概率从 $5\%$ 抬到 $29\%$，把油箱空了的概率从 $10\%$ 抬到 $59\%$。若随后得知油箱*确实*空了，电瓶的概率又落回 $5\%$：空油箱完全**消去了解释**（explaining away）——未能发动一事已被它解释。油表显示空使两个假说都上升，因为两者都可能造成它；而大灯明亮（$L$ 为假）几乎排除了电瓶（$4.5\%$）。每一行都是从同一个模型上得到的一个不同问题的答案——这正是陈述性表示的意义。
:::
:::

::: widget bayes
mode: test
prevalence: 0.05
sensitivity: 0.9
specificity: 0.95
caption: 单因单果的贝叶斯规则，以自然频率呈现。把"prevalence"读作 $\Prob(B) = 0.05$（电瓶亏电），"sensitivity"读作 $\Prob(L \mid B) = 0.9$（亏电时灯光昏暗），"specificity"读作 $\Prob(\lnot L \mid \lnot B) = 0.95$。在灯光昏暗的汽车中，电瓶亏电的占多大比例？把 prevalence 调低，就会看到即使"检测"很好，后验也会塌缩——这是每个诊断智能体都必须尊重的基率效应。
:::

## 从图读出独立性：d-分离

局部马尔可夫性质说的是图对每个变量与其非后代隐含了什么。还有哪些独立性成立？**d-分离**只凭图回答这个问题，方法是考察变量之间的路径。每条路径都由中间顶点 $M$ 处的三种连接方式构成：

- **链** $X \to M \to Y$（或 $X \leftarrow M \leftarrow Y$）：除非 $M$ 被观察，信息便穿过 $M$ 流动——得知电瓶亏电之后，灯光的状态对电瓶告诉我们能否发动一事就无关紧要了；
- **叉** $X \leftarrow M \to Y$（共同原因）：除非 $M$ 被观察，$X$ 与 $Y$ 通过 $M$ 相关——灯光昏暗与汽车未能发动相关，但一旦知道电瓶的状态就不再相关；
- **碰撞点** $X \to M \leftarrow Y$（共同结果）：除非 $M$ *或它的某个后代*被观察，$X$ 与 $Y$ 独立——电瓶与油箱独立，但一旦知道汽车未能发动，对一个不利的证据就是对另一个有利的证据（消去解释）。

::: definition d-分离 {#def-dsep}
$X$ 与 $Y$ 之间的一条路径（忽略弧的方向）被变量集 $Z$ **阻断**，若路径上存在一个中间顶点 $M$，使得或者 $M$ 是路径上的链顶点或叉顶点且 $M \in Z$，或者 $M$ 是路径上的碰撞点且 $M$ 及 $M$ 的任何后代都不在 $Z$ 中。若 $X$ 的顶点与 $Y$ 的顶点之间的每条路径都被 $Z$ 阻断，则称集 $X$ 与 $Y$ 被 $Z$ **d-分离**。
:::

::: theorem d-分离是可靠的且（一般地）完备 {#thm-dsep}
*（韦尔马（Verma）与珀尔（Pearl），1988；盖格（Geiger）与珀尔，1990；米克（Meek），1995。）*若 $X$ 与 $Y$ 在某个 DAG 中被 $Z$ d-分离，则在任何按该 DAG 分解的分布中都有 $X \perp Y \mid Z$。反之，若它们不被 d-分离，则存在一个按该 DAG 分解的分布使得 $X \not\perp Y \mid Z$——事实上，除了一个测度为零的集合中的 CPT 取值，这种相关性总成立。
:::

我们不作证明地陈述这一结论。一个等价的、容易编程实现的检验（劳里岑（Lauritzen）与合作者，1990）：$X$ 与 $Y$ 被 $Z$ d-分离，当且仅当 $Z$ 在**道德化的祖先图**中把 $X$ 与 $Y$ 分开——取由 $X \cup Y \cup Z$ 及其祖先导出的子图，把每个孩子的一对父母两两相连（"结婚"），去掉方向，然后问 $X$ 到 $Y$ 的每条路径是否都经过 $Z$。

::: example 读出独立性 {#ex-dsep}
在汽车网络中判定：(a) $B \perp F$；(b) $B \perp F \mid S$；(c) $L \perp F$；(d) $L \perp F \mid S$；(e) $L \perp G \mid B$；(f) $G \perp S \mid \{B, F\}$；(g) $G \perp S$。
::: solution
```python
def d_separated(parents, X, Y, Z):
    """当且仅当 X 与 Y 被 Z d-分离时为真：在道德化的祖先图中检验分离。"""
    relevant, stack = set(), list(X | Y | Z)
    while stack:                                  # 1. X、Y 与 Z 的祖先（含自身）
        v = stack.pop()
        if v not in relevant:
            relevant.add(v); stack.extend(parents[v])
    nbrs = {v: set() for v in relevant}           # 2. 道德化：共父母者连边，去掉方向
    for v in relevant:
        ps = parents[v]
        for u in ps:
            nbrs[u].add(v); nbrs[v].add(u)
        for i, u in enumerate(ps):
            for w in ps[i + 1:]:
                nbrs[u].add(w); nbrs[w].add(u)
    seen, stack = set(X), list(X)                 # 3. X 能否不经过 Z 到达 Y？
    while stack:
        v = stack.pop()
        for w in nbrs[v] - Z:
            if w in Y: return False
            if w not in seen: seen.add(w); stack.append(w)
    return True
```

```console
$ python3 dsep.py
B _|_ F | {}: True
B _|_ F | {S}: False
L _|_ F | {}: True
L _|_ F | {S}: False
L _|_ G | {B}: True
G _|_ S | {B,F}: True
G _|_ S | {}: False
```

手算：(a) 路径 $B \to G \leftarrow F$ 与 $B \to S \leftarrow F$ 都带有未被观察的碰撞点：阻断，独立。(b) 观察碰撞点 $S$ 打开了 $B \to S \leftarrow F$：相关——这就是 [[#ex-car-network]] 中的消去解释，那里 $\Prob(B \mid \lnot S) = 0.29$ 而 $\Prob(B \mid \lnot S, F) = 0.05$。(c) $L$ 到 $F$ 的每条路径都经过 $B$、然后经过一个碰撞点（$G$ 或 $S$）：阻断。(d) $S$ 被观察时，路径 $L \leftarrow B \to S \leftarrow F$ 是打开的：$B$ 是未被观察的叉顶点，让信息通过；碰撞点 $S$ 被观察，使路径打开。相关。(e) $L$ 出发的所有路径都以 $L \leftarrow B$ 开头，而 $B$ 是被观察的链顶点或叉顶点：阻断。(f) $G$ 到 $S$ 的路径以叉顶点的身份经过 $B$ 或 $F$，两者都被观察：阻断。(g) 什么也没观察时，叉 $G \leftarrow B \to S$ 是打开的：相关。
:::
:::

::: quiz
在网络 $A \to C \leftarrow B$、$C \to D$ 中，哪些命题在每个按该图分解的分布中都成立？

- [x] $A \perp B$
- [ ] $A \perp B \mid D$
- [x] $A \perp D \mid C$
- [ ] $A \perp D$
::: solution
$A \perp B$：唯一的路径带有未被观察的碰撞点 $C$（其后代 $D$ 也未被观察），故被阻断。给定 $D$ 时，碰撞点的一个后代被观察，路径被打开：一般不独立。$A \perp D \mid C$：唯一的路径 $A \to C \to D$ 是经过被观察的 $C$ 的链：阻断。$A \perp D$ 不成立：链 $A \to C \to D$ 在 $C$ 未被观察时是打开的。
:::
:::

## 精确推理

基本的推理任务是：给定**证据** $e$（某些变量 $E$ 的观察值），计算查询变量 $X$ 的**后验** $\Prob(X \mid e)$，把**隐**变量 $Y$ 消去：
$$
\Prob(X \mid e) = \alpha \sum_{y} \prod_{i=1}^n \theta(x_i \mid \mathrm{pa}_i), \qquad \text{其中 } X = x,\; E = e,\; Y = y \text{ 出现在每一项中}。
$$ {#eq-inference}
枚举法逐词计算这个和，对布尔变量耗时 $O(n \cdot 2^{\lvert Y\rvert})$。但这个和具有结构：每个因子只涉及少数变量，所以我们可以把求和号向内推，越过不依赖它们的因子，正如 $\sum_y \sum_z f(x, y) g(y, z) = \sum_y f(x, y) \sum_z g(y, z)$。系统性地这样做并存储中间结果，就是**变量消元**。

::: definition 因子 {#def-factor}
变量集 $\mathrm{vars}(f)$ 上的一个**因子** $f$ 是一张表，为它们取值的每种组合赋予一个非负数。**乘积** $f \cdot g$ 是 $\mathrm{vars}(f) \cup \mathrm{vars}(g)$ 上的因子，满足 $(f \cdot g)(u) = f(u_f)\, g(u_g)$，其中 $u_f$、$u_g$ 是 $u$ 的相应限制。从 $f$ 中**消去** $Y$ 得到 $\mathrm{vars}(f) \setminus \{Y\}$ 上的因子 $\sum_y f$。每张 CPT 在证据变量固定为观察值之后都是一个因子。
:::

::: algorithm 变量消元 {#alg-ve}
给定网络的因子（限制到证据上的 CPT）与隐变量的一个**消元序**：
1. 按序对每个隐变量 $Y$：从表中删去所有提到 $Y$ 的因子，把它们相乘，消去 $Y$，再把所得因子放回。
2. 把剩下的因子相乘（它们只提到查询变量），并归一化。
:::

正确性就是分配律：乘法对加法可分配，因此只对提到 $Y$ 的那些因子的乘积消去 $Y$、再乘上其余因子，与从所有因子的乘积中消去 $Y$ 得到同一个函数。对消元序归纳，最后的因子就是 $\Prob(X, e)$，只差运算顺序；归一化即得 [[#eq-inference]]。

::: example 在汽车网络上作变量消元 {#ex-ve}
用消元序 $L, F$ 以变量消元计算 $\Prob(B \mid \lnot S, G)$，并数一数表操作次数。
::: solution
固定 $S = \text{假}$ 与 $G = \text{真}$ 之后，因子为 $\theta(B)$、$\theta(F)$、$\theta(L \mid B)$、$f_G(B, F) = \theta(G \mid B, F)$ 与 $f_S(B, F) = \theta(\lnot S \mid B, F)$。消去 $L$：提到它的因子只有 $\theta(L \mid B)$，而 $\sum_\ell \theta(\ell \mid B) = 1$——一个恒等于 $1$ 的因子。（凡不是查询或证据的祖先的变量都这样求和为 $1$，可以在推理之前剪掉。）消去 $F$：把 $\theta(F)$、$f_G(B, F)$、$f_S(B, F)$ 乘成 $\{B, F\}$ 上的一个因子并消去 $F$，剩下一个因子 $h(B)$。最后乘上 $\theta(B)$ 并归一化：
$$
h(B) = \sum_f \theta(f)\, \theta(G \mid B, f)\, \theta(\lnot S \mid B, f).
$$
$B$ 为真时：$0.1 \cdot 0.95 \cdot 1 + 0.9 \cdot 0.8 \cdot 0.98 = 0.095 + 0.7056 = 0.8006$。$B$ 为假时：$0.1 \cdot 0.95 \cdot 0.99 + 0.9 \cdot 0.02 \cdot 0.03 = 0.09405 + 0.00054 = 0.09459$。于是 $\Prob(B \mid \lnot S, G) = \alpha\,(0.05 \cdot 0.8006,\; 0.95 \cdot 0.09459) = \alpha\,(0.04003, 0.08986)$，所以 $\Prob(B \mid \lnot S, G) = 0.04003/0.12989 = 0.3082$，与枚举一致。一个基于因子的实现（相乘、消去、归一化）打印

```console
$ python3 ve.py
({True: 0.3082, False: 0.6918}, 20)
({True: 0.7244, False: 0.2756}, 22)
```

分别用了 $20$ 与 $22$ 次表操作；枚举与证据相容的八个世界则需 $8 \cdot 5 = 40$ 次 CPT 查表。五个变量时节省不大；对具有好的消元序的大网络，节省是指数级的。
:::
:::

变量消元的代价由它造出的最大因子支配。对一个次序 $\sigma$，令**导出宽度** $w_\sigma$ 为最大因子的变量集的大小减一；则对大小为 $d$ 的取值域，消元耗时 $O(n\, d^{w_\sigma + 1})$。在 **polytree**（任意两个顶点之间至多一条无向路径的网络）上，合适的次序使因子不超过 CPT 的大小，时间对网络规模是线性的。所有次序中导出宽度的最小值是道德化图的**树宽**——正是使树结构 CSP 变简单的那个概念（[[artificial-intelligence/constraint-satisfaction#thm-tree-csp]]）。找最优次序本身是 $\mathsf{NP}$ 难的，但贪心启发式（消去产生最小新因子的变量）效果不错。而任何聪明的次序都无法在一般情形拯救我们：

::: theorem 精确推理是 NP 难的 {#thm-inference-hard}
判定布尔变量的贝叶斯网络中 $\Prob(X = \text{真}) > 0$ 是否成立是 $\mathsf{NP}$ 难的（库珀（Cooper），1990）。因此精确计算后验概率是 $\mathsf{NP}$ 难的。
:::

::: proof
从 3SAT 归约（[[complexity/np-completeness#thm-3sat]]）。给定一个含变量 $u_1, \dots, u_m$ 与子句 $C_1, \dots, C_k$ 的公式，构造一个网络：每个变量一个根结点 $U_j$，取 $\Prob(U_j = \text{真}) = 1/2$；每个子句一个结点 $K_i$，其父母是 $C_i$ 的（至多三个）变量，配一个确定性的 CPT，使得当且仅当子句被父母取值满足时 $K_i$ 为真；以及一条确定性的与门链 $A_1, \dots, A_k$，满足 $A_1 = K_1$、$A_i = A_{i-1} \land K_i$（每个有两个父母，故每张 CPT 至多 $8$ 行）。令 $X = A_k$。$U_j$ 的每个赋值概率为 $2^{-m}$，且当且仅当赋值满足所有子句时 $X$ 为真，所以 $\Prob(X = \text{真}) = (\text{满足赋值的个数})/2^m$，当且仅当公式可满足时为正。网络规模对公式是多项式的。
:::

同样的构造表明，精确计算 $\Prob(X = \text{真})$ 与*计数*满足赋值的个数一样难，而后者是 $\#\mathsf{P}$ 难问题。树宽小时精确推理可行；否则我们作近似。

## 用采样作近似推理

采样方法用在网络上抽取的随机样本中事件的频率来估计概率。**先验采样**按拓扑序对每个变量在其父母已抽到的取值给定的条件下从 CPT 抽取；由 [[#thm-bn-semantics]]，这恰好以 [[#eq-bn-factorisation]] 的概率生成完整的世界。**拒绝采样**估计 $\Prob(X \mid e)$ 时丢弃与 $e$ 不相容的样本，在剩下的样本中计数——极限下正确，但很浪费：保留的比例是 $\Prob(e)$，证据多时微乎其微。

**似然加权**避免拒绝：它把证据变量固定在观察值上，只抽取其余变量，并给每个样本乘以该样本中证据在其父母条件下的概率作为权重，$w = \prod_{E_j \in E} \theta(e_j \mid \mathrm{pa}_j)$。$\Prob(x \mid e)$ 的估计是满足 $X = x$ 的样本的总权重除以总权重。

::: proposition 似然加权是一致的 {#prop-lw}
随着样本数增长，似然加权的加权样本估计以概率 $1$ 收敛到 $\Prob(x \mid e)$。
:::

::: proof
一个样本是与 $e$ 相容的完整世界 $u$，以概率 $q(u) = \prod_{Y \notin E} \theta(y \mid \mathrm{pa}_Y)$ 产生（非证据变量从各自的 CPT 抽取；证据固定）。它的权重为 $w(u) = \prod_{E_j} \theta(e_j \mid \mathrm{pa}_j)$，故由 [[#eq-bn-factorisation]]，$q(u)\,w(u) = \Prob(u)$。于是样本权重的期望值（只在 $X = x$ 时计数）为 $\sum_{u : X = x} q(u) w(u) = \Prob(x, e)$，而整体的期望权重为 $\Prob(e)$。由强大数定律，两个平均值以概率 $1$ 收敛到这两个期望值，其比值收敛到 $\Prob(x, e)/\Prob(e) = \Prob(x \mid e)$。
:::

::: example 在汽车网络上采样 {#ex-sampling}
用似然加权与拒绝采样估计精确值为 $0.3082$ 的 $\Prob(B \mid \lnot S, G)$，样本数从 $100$ 到 $100{,}000$（种子 $1988$）。
::: solution
```python
def likelihood_weighting(query, evidence, n, rng):
    """非证据变量从各自 CPT 抽取；每个样本按 P(evidence | parents) 加权。"""
    totals = {True: 0.0, False: 0.0}
    for _ in range(n):
        world, weight = {}, 1.0
        for v in order:                                  # 拓扑序
            if v in evidence:
                world[v] = evidence[v]; weight *= p(v, evidence[v], world)
            else:
                world[v] = rng.random() < p(v, True, world)
        totals[world[query]] += weight
    z = totals[True] + totals[False]
    return round(totals[True] / z, 4)
```

拒绝采样（未展示）打印它的估计以及保留下来的样本数：

```console
$ python3 lw.py
100 LW: 0.1422  rejection: (0.1538, 13)
1000 LW: 0.2658  rejection: (0.3276, 116)
10000 LW: 0.3084  rejection: (0.314, 1325)
100000 LW: 0.3144  rejection: (0.3104, 13044)
```

拒绝采样大约保留 $13\%$ 的样本——那正是证据的概率 $\Prob(\lnot S, G) \approx 0.13$。两个估计都逼近 $0.3082$，误差量级为 $1/\sqrt{N_{\mathrm{eff}}}$，$N_{\mathrm{eff}}$ 是有效样本数；$100{,}000$ 个样本的那次误差约 $0.006$ 以内。似然加权用到了每一个样本，但它的权重参差不齐：电瓶完好、油箱满的样本权重只有 $0.02 \cdot 0.03 = 0.0006$，几乎不作出贡献。当证据位于隐原因的下游很远时，大多数权重都微不足道——这就是大规模网络更青睐**马尔可夫链蒙特卡洛**方法（如吉布斯采样——每次在给定某变量的**马尔可夫毯**（父母、孩子以及孩子的其他父母）的条件下重新抽取一个变量）的原因。
:::
:::

::: warning 模型算出的概率只和模型一样好
从贝叶斯网络精确算出的后验对*那个网络*是精确的。两种错误很常见。一是把弧当作已被证实的因果关系来读：网络编码的是一个分解，许多不同的 DAG 编码同样的独立性（把 $B \to L$ 反转，只就 $B$ 与 $L$ 而言没有改变任何可观察的东西）；因果结论需要因果假设或干预。二是忘记小的 CPT 元可以关系重大：在汽车网络里设 $\Prob(S \mid B, F) = 0$，说的是电瓶亏电且油箱空时*绝不*可能发动，任何证据都无法修正这一点。零概率应留给真正的逻辑不可能；其余场合，用小的正数。
:::

## 随时间推理：隐马尔可夫模型

一个变化的世界需要在每个时间步为每个变量复制一份。最简单的此类模型每步只有一个离散的隐**状态**变量 $X_t$ 与一个**证据**变量 $E_t$。

::: definition 隐马尔可夫模型 {#def-hmm}
一个**隐马尔可夫模型**（HMM）具有：隐状态 $X_0, X_1, X_2, \dots$，取值于有限集；观测 $E_1, E_2, \dots$；一个**先验** $\Prob(X_0)$；一个**转移模型** $\Prob(X_t \mid X_{t-1})$；以及一个**传感器模型** $\Prob(E_t \mid X_t)$，对一切 $t$ 相同（**平稳性**）。它就是 $X_0 \to X_1 \to X_2 \to \cdots$ 且对每个 $t \ge 1$ 有 $X_t \to E_t$ 的贝叶斯网络；因此（**马尔可夫假设**）$X_t \perp X_{0:t-2}, E_{1:t-1} \mid X_{t-1}$，并且（**传感器马尔可夫假设**）$E_t \perp X_{0:t-1}, E_{1:t-1} \mid X_t$。
:::

基本任务是**滤波**：随着每个观测到来，计算**信念状态** $\Prob(X_t \mid e_{1:t})$——把基于模型的智能体（[[artificial-intelligence/intelligent-agents]]）的内部状态精确化——而不重新处理整段历史。

::: theorem 前向算法 {#thm-forward}
设 $f_t(x) = \Prob(X_t = x \mid e_{1:t})$，且 $f_0 = \Prob(X_0)$。则
$$
f_t(x) = \alpha_t\, \Prob(e_t \mid x) \sum_{x'} \Prob(x \mid x')\, f_{t-1}(x'),
$$ {#eq-forward}
其中 $\alpha_t$ 把 $f_t$ 归一化使总和为 $1$；且 $1/\alpha_t = \Prob(e_t \mid e_{1:t-1})$。设有 $S$ 个状态，每一步耗时 $O(S^2)$，整个序列耗时 $O(TS^2)$、空间 $O(S)$。
:::

::: proof
由贝叶斯规则与传感器马尔可夫假设，
$$
\Prob(x \mid e_{1:t}) = \frac{\Prob(e_t \mid x, e_{1:t-1})\, \Prob(x \mid e_{1:t-1})}{\Prob(e_t \mid e_{1:t-1})} = \frac{\Prob(e_t \mid x)\, \Prob(x \mid e_{1:t-1})}{\Prob(e_t \mid e_{1:t-1})}.
$$
**预测** $\Prob(x \mid e_{1:t-1})$ 通过对前一状态作条件化并使用马尔可夫假设得到：
$$
\Prob(x \mid e_{1:t-1}) = \sum_{x'} \Prob(x \mid x', e_{1:t-1})\, \Prob(x' \mid e_{1:t-1}) = \sum_{x'} \Prob(x \mid x')\, f_{t-1}(x').
$$
代回即得 [[#eq-forward]]，其中 $\alpha_t = 1/\Prob(e_t \mid e_{1:t-1})$，正是对 $x$ 求和的未归一化值之和的倒数。对 $x$ 的 $S$ 个取值，每个都对 $x'$ 作 $O(S)$ 的求和。
:::

把归一化常数相乘即得观测的**似然** $\Prob(e_{1:T}) = \prod_t 1/\alpha_t$，可用于比较模型。把 [[#eq-forward]] 中的求和换成最大值就得到**维特比算法**（Viterbi），它找出隐状态的最大似然*序列*——在状态与时间构成的网格上做一次动态规划（[[algorithms/dynamic-programming]]）。**平滑** $\Prob(X_k \mid e_{1:T})$（$k < T$）把前向消息与一次后向传递结合起来（**前向–后向**算法）。

::: example 机器在磨损吗？ {#ex-hmm}
一台机器处于*良好*或*磨损*状态。初始时 $\Prob(\mathit{Worn}) = 0.1$；每小时一台良好的机器以 $0.05$ 的概率变为磨损，且磨损不可逆。一个振动传感器对良好的机器以 $0.2$ 的概率读作*高*，对磨损的机器以 $0.7$ 的概率读作*高*。六小时的读数依次为低、高、低、高、高、高。计算每次读数后的信念 $\Prob(\mathit{Worn} \mid e_{1:t})$。
::: solution
```python
states = ["Good", "Worn"]
prior = {"Good": 0.9, "Worn": 0.1}
trans = {"Good": {"Good": 0.95, "Worn": 0.05}, "Worn": {"Good": 0.0, "Worn": 1.0}}   # 磨损不可逆
emit = {"Good": {"Low": 0.8, "High": 0.2}, "Worn": {"Low": 0.3, "High": 0.7}}

def forward(observations):
    """滤波：用前向算法（归一化）计算每个 t 的 P(X_t | e_1..e_t)。"""
    belief = dict(prior); out = []
    for e in observations:
        predicted = {x: sum(belief[y] * trans[y][x] for y in states) for x in states}   # 预测
        unnorm = {x: emit[x][e] * predicted[x] for x in states}                         # 更新
        z = sum(unnorm.values())
        belief = {x: unnorm[x] / z for x in states}
        out.append((e, round(belief["Worn"], 4), round(z, 4)))
    return out
```

```console
$ python3 hmm.py
1 ('Low', 0.0598, 0.7275)
2 ('High', 0.295, 0.2534)
3 ('Low', 0.1561, 0.6349)
4 ('High', 0.464, 0.2991)
5 ('High', 0.7713, 0.4454)
6 ('High', 0.9265, 0.5914)
```

第 1 步手算：预测为 $\Prob(\mathit{Worn}) = 0.1 + 0.9 \cdot 0.05 = 0.145$；更新乘以 $\Prob(\mathit{Low} \mid \cdot)$：$\mathit{Worn}$：$0.3 \cdot 0.145 = 0.0435$，$\mathit{Good}$：$0.8 \cdot 0.855 = 0.684$；总和为 $0.7275 = \Prob(e_1)$，且 $\Prob(\mathit{Worn} \mid e_1) = 0.0435/0.7275 = 0.0598$。单个*高*读数并不可靠（它把信念抬到 $0.30$，而下一个*低*又压低），但连续三个把它推到 $0.9$ 以上。第三列是 $\Prob(e_t \mid e_{1:t-1})$；它们的乘积约 $0.0092$，就是整个序列在模型下的概率。
:::
:::

::: widget markov
matrix: 0.95,0.05; 0,1
states: Good; Worn
start: 0
steps: 40
caption: 机器自己的隐转移模型，不带观测。运行这条随机游走并观察 $n$ 步后的分布：$\Prob(\mathit{Good}$ 在第 $n$ 步$) = 0.95^n$ 几何衰减，而吸收状态 $\mathit{Worn}$ 是平稳分布。滤波把这种漂移与证据结合起来：前向算法的预测步骤恰是把这条链作用一步于当前的信念。
:::

::: quiz
在机器的 HMM 中，磨损的机器不会再变好。一串很长的*高*读数之后，对 *Worn* 的滤波信念是 $0.999$。随后连续来了十个*低*读数。信念会怎样？

- [ ] 保持 $0.999$，因为磨损不可逆。
- [x] 下降，因为*低*读数对良好的机器更可能，证据在累积。
- [ ] 第一个*低*读数之后就降到 $0$。
- [ ] 无定义，因为读数与模型矛盾。
::: solution
转移模型使磨损不可逆，但智能体并*不知道*机器已磨损，只是相信而已。每个*低*读数在 [[#eq-forward]] 的更新步骤中把 *Good* 对 *Worn* 的比值乘以 $0.8/0.3 \approx 2.7$（预测步骤只把 *Good* 的 $5\%$ 移到 *Worn*），所以每个*低*读数把 *Good* 的比值约乘 $2.67 \cdot 0.95 \approx 2.5$。十个这样的读数把比值乘近 $10^4$ 倍，从 $1 : 999$ 变为有利于 *Good* 的约 $8 : 1$：从 $0.999$ 的信念出发运行滤波器得 $\Prob(\mathit{Worn}) \approx 0.11$。什么也没被否定：每个读数在两个状态下都有正的概率。
:::
:::

HMM 以及它们的连续对应物**卡尔曼滤波**（Kalman filter，转移与传感器模型均为线性高斯，前向递推传播一个均值与一个协方差）是目标跟踪、语音识别（直到 2010 年代大体被深度神经网络取代）、基因发现与机器人定位的主力。**动态贝叶斯网络**把它们推广为每步多个变量的因子化状态；**粒子滤波**用一族带权样本近似前向递推——即随时间推进的似然加权，外加重采样。

::: history
托马斯·贝叶斯（Thomas Bayes）关于反概率的论文于 1763 年遗作发表；皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）自 1774 年起系统发展了贝叶斯推断。早期的诊断 AI 系统因联合分布的规模而回避概率，改用特制的确定性因子（MYCIN，1970 年代）。朱迪亚·珀尔（Judea Pearl）的《概率推理与智能系统》（*Probabilistic Reasoning in Intelligent Systems*，1988）引入了贝叶斯网络、d-分离以及多叉树上的信念传播；斯特芬·劳里岑（Steffen Lauritzen）与戴维·施皮格尔哈尔特（David Spiegelhalter）（1988）用连接树给出了一般网络上的精确推理。格雷戈里·库珀（Gregory Cooper）于 1990 年证明了精确推理是 $\mathsf{NP}$ 难的；保罗·达格姆（Paul Dagum）与迈克尔·卢比（Michael Luby）于 1993 年表明，即便把后验逼近到固定的绝对误差以内也是 $\mathsf{NP}$ 难的。现代形式的变量消元归功于内文·张（Nevin Zhang）与戴维·普尔（David Poole）（1994）以及里娜·德赫特（Rina Dechter）（1996）。隐马尔可夫链由伦纳德·鲍姆（Leonard Baum）与合作者于 1960 年代末发展；安德鲁·维特比（Andrew Viterbi）的算法始于 1967 年，鲁道夫·卡尔曼（Rudolf Kálmán）的滤波器始于 1960 年。达芙妮·科勒（Daphne Koller）与尼尔·弗里德曼（Nir Friedman）的《概率图模型》（*Probabilistic Graphical Models*，2009）是标准的全景著作。
:::

## 后续内容

信念是为了行动：[[artificial-intelligence/decision-making]] 把概率与效用结合来选择动作，并随时间以马尔可夫决策过程进行——那是转移由智能体自己控制的马尔可夫链。隐状态不被观察时，决策问题成为部分可观测 MDP，其状态正是这里算出的信念状态。从数据学习网络的参数与结构、以及在语音与语言中取代 HMM 的神经模型，在 [LLM Atlas](/learn/llm/course.php?c=ml-fundamentals) 中讲授；概率论本身在 [Maths Atlas：概率](/learn/maths/course.php?c=probability)。

::: summary
- **贝叶斯网络**（[[#def-bayes-net]]）是每个变量配一张 CPT 的 DAG；它把联合分布定义为 CPT 的乘积（[[#eq-bn-factorisation]]），每个变量在给定父母的条件下独立于其非后代（[[#thm-bn-semantics]]）。它需要 $O(n2^k)$ 个数字而非 $2^n$ 个。
- **d-分离**（[[#def-dsep]]）从图上读出条件独立性：链和叉被观察阻断，碰撞点被观察打开（消去解释）；它可靠且一般地完备（[[#thm-dsep]]）。
- **变量消元**（[[#alg-ve]]）一次消去一个隐变量；其代价只对消元序的导出宽度呈指数。一般地，精确推理是 $\mathsf{NP}$ 难的（[[#thm-inference-hard]]）。
- **采样**估计后验：拒绝采样浪费与证据矛盾的样本；**似然加权**给样本加权，且是一致的（[[#prop-lw]]）。
- **HMM**（[[#def-hmm]])建模由含噪传感器观察的隐状态；**前向算法**（[[#thm-forward]]）每步以 $O(S^2)$ 维护信念状态；维特比与前向–后向分别计算最大似然路径与平滑估计。
:::

## 习题

::: exercise 数参数 {level=1 check="42"}
一个含 $10$ 个布尔变量的贝叶斯网络有 $2$ 个根结点、$6$ 个各有 $2$ 个父母的结点以及 $2$ 个各有 $3$ 个父母的结点。它的 CPT 一共包含多少个独立的数？（输入数字。）
::: solution
一个有 $k$ 个父母的布尔结点需要每个父母组合一个数：$2^k$。根结点：$2 \cdot 1 = 2$；两父母的结点：$6 \cdot 4 = 24$；三父母的结点：$2 \cdot 8 = 16$。合计 $2 + 24 + 16 = 42$，而完整联合分布要 $2^{10} - 1 = 1023$ 个。
:::
:::

::: exercise 一个联合概率 {level=1 check="0.031752"}
在 [[#ex-car-network]] 的汽车网络中，计算 $\Prob(B, \lnot F, L, G, \lnot S)$——电瓶亏电、油箱未空、灯光昏暗、油表显示空且汽车未能发动。（输入概率。）
::: solution
由 [[#eq-bn-factorisation]]，它是 $\Prob(B)\,\Prob(\lnot F)\,\Prob(L \mid B)\,\Prob(G \mid B, \lnot F)\,\Prob(\lnot S \mid B, \lnot F) = 0.05 \cdot 0.9 \cdot 0.9 \cdot 0.8 \cdot 0.98$。逐步：$0.05 \cdot 0.9 = 0.045$，$\cdot\, 0.9 = 0.0405$，$\cdot\, 0.8 = 0.0324$，$\cdot\, 0.98 = 0.031752$。
:::
:::

::: exercise 手算 d-分离 {level=1}
在网络 $A \to B \to C$、$A \to D$、$D \to C$、$C \to E$ 中，判定：(a) $B \perp D \mid A$；(b) $B \perp D \mid \{A, C\}$；(c) $A \perp E \mid C$；(d) $A \perp E \mid \{B, D\}$。
::: solution
$B$ 与 $D$ 之间的路径是 $B \leftarrow A \to D$（$A$ 处的叉）与 $B \to C \leftarrow D$（$C$ 处的碰撞点）。(a) 给定 $A$ 时叉被阻断，碰撞点 $C$ 未被观察（其后代 $E$ 也未被观察）：阻断；独立。(b) 观察 $C$ 打开碰撞点：相关。(c) $A$ 到 $E$ 的每条路径都以 $\to C \to E$ 收尾，是经过被观察的 $C$ 的链：独立。(d) 路径 $A \to B \to C \to E$ 与 $A \to D \to C \to E$ 在被观察的链顶点 $B$、$D$ 处被阻断：独立。
:::
:::

::: exercise 滤波的一步 {level=2 check="0.5"}
一个 HMM 具有状态 $\{s_1, s_2\}$，$\Prob(X_0 = s_1) = 0.5$，转移 $\Prob(s_1 \to s_1) = 0.7$、$\Prob(s_2 \to s_2) = 0.7$，对观察到的读数 $e$，传感器模型为 $\Prob(e \mid s_1) = 0.6$、$\Prob(e \mid s_2) = 0.6$。问 $\Prob(X_1 = s_1 \mid e_1 = e)$ 是多少？解释这一结果。（输入概率。）
::: solution
预测：$\Prob(X_1 = s_1) = 0.5 \cdot 0.7 + 0.5 \cdot 0.3 = 0.5$。更新：两个状态都以概率 $0.6$ 给出该读数，故未归一化的值为 $0.3$ 与 $0.3$，$\Prob(X_1 = s_1 \mid e) = 0.5$。一个在每个状态下都同样可能的观测不携带信息——似然比为 $1$——而对称的转移模型使均匀先验保持均匀。
:::
:::

::: exercise 消去解释，数值版 {level=2}
两个独立的因 $A$ 与 $B$，先验概率各为 $0.1$，有一个共同的果 $C$，满足 $\Prob(C \mid A, B) = 0.99$、$\Prob(C \mid A, \lnot B) = 0.9$、$\Prob(C \mid \lnot A, B) = 0.9$、$\Prob(C \mid \lnot A, \lnot B) = 0.01$。计算 $\Prob(A \mid C)$ 与 $\Prob(A \mid C, B)$。
::: solution
$\Prob(A, C) = 0.1\,(0.1 \cdot 0.99 + 0.9 \cdot 0.9) = 0.1 \cdot 0.909 = 0.0909$。$\Prob(\lnot A, C) = 0.9\,(0.1 \cdot 0.9 + 0.9 \cdot 0.01) = 0.9 \cdot 0.099 = 0.0891$。于是 $\Prob(A \mid C) = 0.0909/0.18 = 0.505$。再给定 $B$：$\Prob(A \mid C, B) = \Prob(A)\Prob(C \mid A, B) / [\Prob(A)\Prob(C \mid A, B) + \Prob(\lnot A)\Prob(C \mid \lnot A, B)] = 0.099/(0.099 + 0.81) = 0.109$。观察这个果把 $A$ 从 $0.1$ 抬到约 $0.5$；得知另一个因 $B$ 存在，又把它压回约 $0.11$。$A$ 与 $B$ 先验独立，但在给定 $C$ 时相关——d-分离对碰撞点的预言正是如此。
:::
:::

::: exercise 消元序很重要 {level=2}
在一个网络中，$Q$ 是 $H_1, \dots, H_n$ 的父母，每个 $H_i$ 只有一个孩子 $O_i$；所有变量都是布尔的。证据是 $O_2, \dots, O_n$，查询是 $O_1$。比较变量消元在消元序 $H_2, \dots, H_n, Q, H_1$ 下造出的最大因子，与先消去 $Q$ 的消元序下的最大因子。
::: solution
消元序 $H_2, \dots, H_n, Q, H_1$：消去 $H_i$（$i \ge 2$）时把 $\theta(H_i \mid Q)$ 与 $\theta(o_i \mid H_i)$ 相乘并对 $H_i$ 求和，得到只含 $Q$ 的因子。消去 $Q$ 时把 $\theta(Q)$、这 $n - 1$ 个单变量因子与 $\theta(H_1 \mid Q)$ 相乘，得到 $H_1$ 上的一个因子；消去 $H_1$ 时再乘 $\theta(O_1 \mid H_1)$，得到关于 $O_1$ 的答案。没有因子超过 $2$ 个变量，代价为 $O(n)$。若先消去 $Q$，它的因子 $\theta(Q)$ 与所有 $i$ 的 $\theta(H_i \mid Q)$ 会被乘成一个 $Q, H_1, \dots, H_n$ 上含 $2^{n+1}$ 项的因子，消去 $Q$ 后剩下全部 $n$ 个 $H_i$ 上的一个因子——指数级。该网络是一棵树（树宽 $1$），但只有从叶子向内消去的消元序才能达到这一点；贪心的"最小新因子优先"启发式在这里能找到这样的序。
:::
:::

::: exercise 归约式推理 {level=3}
(a) 用 [[#thm-inference-hard]] 的构造，公式 $(u_1 \lor u_2) \land (\lnot u_1 \lor u_2) \land (u_1 \lor \lnot u_2)$ 的 $\Prob(X = \text{真})$ 是多少？(b) 解释为什么该构造表明精确计算 $\Prob(X = \text{真})$ 是 $\#\mathsf{P}$ 难的，以及为什么它本身并不表明：对可满足的公式，把它逼近到因子 $2$ 以内也是难的。
::: solution
(a) 只有 $u_1 = u_2 = \text{真}$ 满足该公式（第一个子句排除两者皆假，第二个排除 $u_1$ 真且 $u_2$ 假，第三个排除 $u_1$ 假且 $u_2$ 真）。所以 $\Prob(X = \text{真}) = 1/2^2 = 0.25$。(b) $\Prob(X = \text{真}) \cdot 2^m$ 是满足赋值的个数，因此一个精确的推理算法就能计数，而计数是 $\#\mathsf{P}$ 难的。至于逼近：判定概率是零还是正，是 $\mathsf{NP}$ 难的，这就排除了任何乘性逼近（$0$ 的因子 $2$ 逼近还是 $0$），除非 $\mathsf{P} = \mathsf{NP}$。但对已知可满足的公式，概率可以小至 $2^{-m}$，此时该归约对乘性估计一无所知；达格姆与卢比（1993）另行证明了逼近贝叶斯网络的后验同样是 $\mathsf{NP}$ 难的。
:::
:::

::: exercise 维特比算法 {level=3}
把 [[#ex-hmm]] 的前向算法改造为维特比算法（用最大值替换求和并保存回溯指针），找出六个读数的最大似然状态序列。最大似然序列把磨损的起始时间放在哪里？它与滤波信念相比如何？
::: solution
```python
def viterbi(observations):
    m = {x: prior[x] for x in states}; back = []          # m[x]：以 x 结尾的路径的最大概率
    for e in observations:
        step, ptr = {}, {}
        for x in states:
            y = max(states, key=lambda y: m[y] * trans[y][x])
            step[x] = m[y] * trans[y][x] * emit[x][e]; ptr[x] = y
        m = step; back.append(ptr)
    x = max(states, key=m.get); path = [x]
    for ptr in reversed(back[1:]):                        # 沿回溯指针走回（X_1 .. X_T）
        x = ptr[x]; path.append(x)
    return path[::-1], m

print(viterbi(["Low", "High", "Low", "High", "High", "High"]))
```

```console
$ python3 viterbi.py
(['Good', 'Worn', 'Worn', 'Worn', 'Worn', 'Worn'], {'Good': 0.0006774606864000002, 'Worn': 0.002463425999999999})
```

最大似然的单一历史是：机器第 $1$ 小时良好，第 $2$ 小时起磨损。第 $2$ 小时的*高*读数用磨损解释，第 $3$ 小时的*低*解释为磨损机器一次寻常的*低*读（概率 $0.3$），这比先付一台良好机器的*高*（$0.2$）、之后再磨损更便宜。滤波信念讲的是更犹豫的故事——在第 $3$ 小时的*低*之后回落到 $0.16$，直到第 $5$ 小时才越过 $0.5$——因为它们回答的是另一个问题：给定过去的*现在*处于某状态的概率，而不是给定全部六个读数的单一最大似然历史。两者未必一致，也都不是"那个"答案；用哪个取决于要做的决策。
:::
:::
