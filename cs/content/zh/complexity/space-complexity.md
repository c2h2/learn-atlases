时间不是算法消耗的唯一资源。一个运行一周却只需要一兆字节内存的程序，可以放着让它跑；一个需要一千万亿（petabyte）字节内存的程序则根本无法运行。而内存在一个关键方面与时间不同：**它可以被重复使用**。一段计算一旦用完一块内存，就可以在那里写别的东西；而花掉的一秒钟则永远消失。本章展示这个差别有多深远。看似需要指数时间的问题——判定一个棋盘博弈的胜负、求值一个含有大量交替"任意"与"存在"量词的公式——可以用多项式*空间*解决；而非确定性看似要付出指数的时间代价，在空间上只付出平方。

我们定义空间复杂性类，把它们与时间联系起来，并证明三个中心定理：**Savitch 定理**（$\mathsf{NSPACE}(f) \subseteq \mathsf{SPACE}(f^2)$，于是 $\mathsf{PSPACE} = \mathsf{NPSPACE}$）、**量化布尔公式的 $\mathsf{PSPACE}$ 完全性**，以及**非确定性空间在补运算下封闭（Immerman–Szelepcsényi 定理）**。途中我们会遇到用对数内存——刚好够几个指向输入的指针——求解的问题类 $\mathsf{L}$ 与 $\mathsf{NL}$，并说明图的可达性如何恰好刻画 $\mathsf{NL}$。

## 度量空间

::: definition 空间复杂性 {#def-space}
设 $M$ 是一台在每个输入上都停机的确定性图灵机。它的**空间复杂性**是函数 $f\colon \N \to \N$，其中 $f(n)$ 是 $M$ 在长度为 $n$ 的输入上扫过的格子数的最大值。对分支全部停机的非确定性判定器 $N$，$f(n)$ 是对一切分支取最大值。对函数 $f$，
$$
\mathsf{SPACE}(f(n)) \text{ 与 } \mathsf{NSPACE}(f(n))
$$
分别是由使用 $O(f(n))$ 空间的、确定性图灵机与非确定性图灵机判定的语言类。
:::

要允许*小于*输入的空间，我们使用双带机器：一条**只读输入带**，其读头只能移动不能书写，以及一条读写的**工作带**。只有工作带的格子计数。当 $f(n) \ge n$ 时这没有改变什么，而 $f(n) < n$ 时这是唯一合理的选择，因为否则光是读入输入就要耗去 $n$ 个格子。

::: definition 多项式空间与对数空间 {#def-pspace}
$$
\mathsf{PSPACE} = \bigcup_k \mathsf{SPACE}(n^k), \quad \mathsf{NPSPACE} = \bigcup_k \mathsf{NSPACE}(n^k), \quad \mathsf{L} = \mathsf{SPACE}(\log n), \quad \mathsf{NL} = \mathsf{NSPACE}(\log n).
$$
:::

对数空间足以存储常数个计数器和指向输入的指针——每个 $O(\log n)$ 比特——但不足以复制输入，也不足以在图上标记哪些顶点已被访问。

::: example 线性空间内的可满足性 {#ex-sat-space}
证明 $\mathit{SAT} \in \mathsf{SPACE}(n)$ 且 $\{0^k1^k : k \ge 0\} \in \mathsf{L}$。
::: solution
对 $\mathit{SAT}$：在含 $m \le n$ 个变元的公式 $\varphi$ 上，在工作带上保留一个 $m$ 位的二进制计数器，让它走完全部 $2^m$ 个赋值。对每个赋值求值 $\varphi$——这需要一点额外空间就地求值公式（例如一个栈，其深度至多嵌套深度 $O(n)$）——若公式为真则接受。每次求值之后重复使用同样的格子。总空间 $O(n)$，尽管时间是 $2^{\Omega(m)}$。

对 $0^k1^k$：扫输入一遍，检查没有 $1$ 后面跟着 $0$；然后用两个 $O(\log n)$ 位的二进制计数器分别数 $0$ 和 $1$ 的个数并比较。输入只是被读，所以工作空间是 $O(\log n)$。
:::
:::

### 空间与时间

只用很少空间的机器无法在不重复自身的情况下运行很久。为把这一点讲精确，我们数它的**格局**：对一台带只读输入带的机器，一个格局由状态、输入读头位置、工作读头位置和工作带内容组成。（输入本身在计算过程中固定不变，不是格局的一部分。）

::: lemma 格局计数 {#lem-configs}
状态集为 $Q$、工作字母表为 $\Gamma$、工作格数至多 $f(n)$ 的机器，在长度 $n$ 的输入上至多有 $\lvert Q\rvert \cdot n \cdot f(n) \cdot \lvert\Gamma\rvert^{f(n)}$ 个格局。若 $f(n) \ge \log n$，这是 $2^{O(f(n))}$。
:::

::: proof
各个因子分别数状态、输入读头位置、工作读头位置与工作带内容。若 $f(n) \ge \log n$，则 $n = 2^{\log n} \le 2^{f(n)}$，且 $f(n) \le 2^{f(n)}$，所以乘积至多为 $\lvert Q\rvert\, 2^{f(n)}\, 2^{f(n)}\, 2^{f(n)\log\lvert\Gamma\rvert} = 2^{O(f(n))}$。
:::

::: theorem 时间与空间 {#thm-time-space}
设 $f(n) \ge \log n$ 且 $t(n) \ge n$：
1. $\mathsf{TIME}(t(n)) \subseteq \mathsf{NTIME}(t(n)) \subseteq \mathsf{SPACE}(t(n))$；
2. $\mathsf{NSPACE}(f(n)) \subseteq \mathsf{TIME}(2^{O(f(n))})$。

于是 $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P}$ 且 $\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP}$。
:::

::: proof
(1) 一台机器每步至多扫描一个新格子，所以时间 $t(n)$ 的机器用 $O(t(n))$ 空间。对时间 $t(n)$ 的非确定性机器，确定性机器可以按选择序列的次序逐一尝试所有分支，并重复使用空间：它存下当前的选择序列（$O(t(n))$ 个符号）与被模拟的带（$O(t(n))$ 个格子），在进入下一分支之前把带擦掉。

(2) 设 $N$ 以非确定性空间 $f(n)$ 判定 $L$。它在输入 $w$ 上的**格局图**以格局为顶点，且当 $C$ 能一步导出 $C'$ 时有边 $C \to C'$。$N$ 接受 $w$ 当且仅当某个接受格局可从初始格局到达。由 [[#lem-configs]]，该图有 $2^{O(f(n))}$ 个顶点，而每条边只要查看 $N$ 的转移函数即可确定，所以确定性机器可以构造它并运行广度优先搜索，时间关于图的大小多项，即 $2^{O(f(n))}$。

对推论部分：$\mathsf{NL} = \mathsf{NSPACE}(\log n) \subseteq \mathsf{TIME}(2^{O(\log n)}) = \mathsf{TIME}(n^{O(1)}) = \mathsf{P}$；而 $\mathsf{NP} \subseteq \mathsf{PSPACE}$ 由 (1)，$\mathsf{PSPACE} \subseteq \mathsf{EXP}$ 由 (2) 取 $f(n) = n^k$。
:::

格局图是空间复杂性中单个最有用的想法：一个有空间界的计算，是一道关于可达性的问题——其背后的图关于空间界指数之大，却由机器隐式地描述。

## Savitch 定理

[[#thm-time-space]] (2) 中的模拟使用广度优先搜索，而它必须记住自己见过哪些格局——指数多个。Walter Savitch 找到了一个用极少内存搜索格局图的办法，代价是更多的时间。

令 $\mathrm{CANYIELD}(c_1, c_2, t)$ 是问题"格局 $c_1$ 能否在至多 $t$ 步内到达 $c_2$？"。若 $t \le 1$，答案可以直接从转移函数读出。否则，$c_1$ 在 $t$ 步内到达 $c_2$ 当且仅当存在一个**中点**格局 $c_m$，使 $c_1$ 在 $\lceil t/2\rceil$ 步内到达 $c_m$ 且 $c_m$ 在 $\lfloor t/2\rfloor$ 步内到达 $c_2$。依次尝试一切可能的 $c_m$——并且*对每次尝试重复使用同一份空间*。

::: algorithm CANYIELD {#alg-canyield}
$\mathrm{CANYIELD}(c_1, c_2, t)$：

1. 若 $t \le 1$：返回"$c_1 = c_2$ 或 $c_1$ 一步导出 $c_2$"是否成立。
2. 对每个格局 $c_m$（给定规模，按某个固定次序）：
   1. 若 $\mathrm{CANYIELD}(c_1, c_m, \lceil t/2\rceil)$ 且 $\mathrm{CANYIELD}(c_m, c_2, \lfloor t/2\rfloor)$，返回真。
3. 返回假。
:::

::: theorem Savitch 定理 {#thm-savitch}
对每个空间可构造的函数 $f(n) \ge \log n$，
$$
\mathsf{NSPACE}(f(n)) \subseteq \mathsf{SPACE}(f(n)^2).
$$
:::

（函数 $f$ 称为**空间可构造**的，若某台机器能用 $O(f(n))$ 空间从 $1^n$ 以二进制算出 $f(n)$；一切常用函数——$\log n$、$n^k$、$2^n$——都是。[[complexity/hierarchies]] 使用同样的概念。）

::: proof
设 $N$ 以空间 $f(n)$ 判定 $L$。修改 $N$，使它在接受之前先擦掉工作带并把两个读头移到最左端；于是存在唯一的接受格局 $c_{\text{acc}}$。由 [[#lem-configs]]，存在常数 $d$，使 $N$ 在长度 $n$ 的输入上至多有 $2^{d f(n)}$ 个格局；接受分支若存在，就在格局图中有一条不重复格局的接受路径，因而长度至多 $2^{d f(n)}$。

确定性机器 $M$ 在输入 $w$ 上先算出 $f(n)$（由可构造性，可用 $O(f(n))$ 空间完成），再返回 $\mathrm{CANYIELD}(c_{\text{start}}, c_{\text{acc}}, 2^{d f(n)})$，用栈来实现。$\mathrm{CANYIELD}$ 的*正确性*对 $t$ 归纳：从 $c_1$ 到 $c_2$ 长度至多 $t$ 的路径，在 $\lceil t/2\rceil$ 步之后（若路径更短则在其终点处）经过某个格局 $c_m$，把它分成长度至多 $\lceil t/2\rceil$ 与 $\lfloor t/2\rfloor$ 的两段；反之，这样两段拼成长度至多 $t$ 的路径。

*空间。*每个栈帧存 $c_1$、$c_2$、$t$ 与当前的 $c_m$：格局各占 $O(f(n))$ 个格子（输入读头位置需要 $O(\log n) \le O(f(n))$ 比特），$t \le 2^{d f(n)}$ 需要 $O(f(n))$ 比特。参数 $t$ 每层（大致）减半，所以递归深度为 $O(\log 2^{d f(n)}) = O(f(n))$。一次调用返回时其栈帧弹出，空间即被重复使用。总计 $O(f(n)) \cdot O(f(n)) = O(f(n)^2)$。
:::

可构造性的假设可以去掉：若不知道 $f$，就依次对 $f = 1, 2, 3, \dots$ 运行该过程，每步检查 $N$ 能否到达*任何*使用更多空间的格局。所用的时间大得惊人——$\mathrm{CANYIELD}$ 在 $O(f(n))$ 层的每一层做出 $2^{O(f(n))}$ 次递归调用，共 $2^{O(f(n)^2)}$ 时间——但时间不是此刻在计数的资源。

::: corollary PSPACE = NPSPACE {#cor-pspace-npspace}
$\mathsf{PSPACE} = \mathsf{NPSPACE}$，且 $\mathsf{NL} \subseteq \mathsf{SPACE}(\log^2 n)$。
:::

::: proof
多项式的平方仍是多项式，所以 $\mathsf{NSPACE}(n^k) \subseteq \mathsf{SPACE}(n^{2k})$。对 $\mathsf{NL}$ 取 $f(n) = \log n$。
:::

::: example 用对数栈做可达性 {#ex-canyield}
在有向路 $0 \to 1 \to \cdots \to 15$ 上运行 $\mathrm{CANYIELD}$，取 $t = 16$，数调用次数与最大递归深度。
::: solution
```python
def can_yield(adj, u, v, t, stats, depth=1):
    """u 到 v 是否有长度 <= t 的路径？同时存活的栈帧只有 O(log t) 个。"""
    stats["calls"] += 1; stats["depth"] = max(stats["depth"], depth)
    if t <= 1:
        return u == v or v in adj[u]
    half = (t + 1) // 2
    for m in adj:                                     # 依次尝试每个中点，重复使用空间
        if can_yield(adj, u, m, half, stats, depth + 1) and can_yield(adj, m, v, t - half, stats, depth + 1):
            return True
    return False

n = 16                                                # 有向路 0 -> 1 -> ... -> 15
adj = {i: {i + 1} if i + 1 < n else set() for i in range(n)}
for target in (15, 0):
    stats = {"calls": 0, "depth": 0}
    print(target, can_yield(adj, 0, target, n, stats), stats)
stats = {"calls": 0, "depth": 0}
print("15 -> 0:", can_yield(adj, 15, 0, n, stats), stats)
```

```console
$ python3 savitch.py
15 True {'calls': 47038, 'depth': 5}
0 True {'calls': 31, 'depth': 5}
15 -> 0: False {'calls': 88741, 'depth': 5}
```

每种情形的深度都是 $1 + \log_2 16 = 5$：至多五个栈帧，各存两个顶点名、一个长度和一个中点——每个 $O(\log n)$ 比特，总共 $O(\log^2 n)$。但调用次数很大：到达顶点 $15$ 需要 $47\,038$ 次调用，证明 $15$ 到不了 $0$ 需要 $88\,741$ 次，因为每一层都必须尝试每一个中点。一般地，时间是 $n^{O(\log n)}$：准多项式。相形之下，广度优先搜索耗时 $O(n)$ 而空间 $\Theta(n)$。Savitch 的算法用时间换空间。
:::
:::

::: warning Savitch 的技巧为何不能证明 P = NP
Savitch 定理说明非确定性在*空间*上至多付出平方。同样的中点递归对*时间*没有帮助：它在 $O(f)$ 层的每一层尝试全部 $2^{O(f)}$ 个中点，费用相乘，得到 $2^{O(f^2)}$ 的时间。空间可以在各次尝试之间重复使用；时间不能。$\mathsf{P} = \mathsf{NP}$ 与否不受影响，$\mathsf{L} = \mathsf{NL}$ 与否同样不受影响，因为 $\log^2 n$ 大于 $\log n$。
:::

## PSPACE 完全性

::: definition PSPACE 完全 {#def-pspace-complete}
语言 $B$ 称为**$\mathsf{PSPACE}$ 完全**的，若 $B \in \mathsf{PSPACE}$ 且对每个 $A \in \mathsf{PSPACE}$ 都有 $A \le_p B$（多项式时间归约，[[complexity/np-completeness#def-poly-reduction]]）。
:::

由于 $\mathsf{NP} \subseteq \mathsf{PSPACE}$，$\mathsf{PSPACE}$ 完全问题既是 $\mathsf{NP}$ 难的也是 $\mathsf{coNP}$ 难的；若它属于 $\mathsf{P}$，则 $\mathsf{P} = \mathsf{PSPACE}$。人们普遍相信 $\mathsf{NP} \ne \mathsf{PSPACE}$（截至 2026 年仍是未决问题），所以 $\mathsf{PSPACE}$ 完全问题被认为比 $\mathsf{NP}$ 完全问题更难：连短证书都不指望存在。

### 量化布尔公式

::: definition TQBF {#def-tqbf}
**全量化布尔公式**形如 $Q_1 x_1\, Q_2 x_2 \cdots Q_k x_k\ \psi$，其中每个 $Q_i$ 是 $\exists$ 或 $\forall$，$x_i$ 在 $\{0, 1\}$ 上取值，$\psi$ 是关于 $x_1, \dots, x_k$ 的布尔公式。它非真即假。$\mathit{TQBF}$ 是真全量化布尔公式的语言。
:::

$\mathit{SAT}$ 是每个量词都是 $\exists$ 的特例，$\mathit{TAUT}$ 是每个量词都是 $\forall$ 的特例。交替使问题看起来像一场**博弈**：$\exists$-玩家为 $\exists$-变元选值，$\forall$-玩家为 $\forall$-变元选值，按顺序进行，若 $\psi$ 最后为真则 $\exists$-玩家获胜。公式为真当且仅当 $\exists$-玩家有必胜策略。

::: theorem TQBF 是 PSPACE 完全的 {#thm-tqbf}
$\mathit{TQBF}$ 是 $\mathsf{PSPACE}$ 完全的。
:::

::: proof
*$\mathit{TQBF} \in \mathsf{PSPACE}$。*递归求值：对 $\exists x\,\Phi$，先令 $x = 0$ 求值 $\Phi$，再令 $x = 1$ 求值，返回"或"；对 $\forall x\,\Phi$ 返回"与"；量词用完就求 $\psi$ 的值。递归深度是变元数 $k$，每层栈帧存一个比特和一个位置；第二次求值重复使用第一次的空间。空间 $O(n)$。

*难度。*设 $A$ 由确定性机器 $M$ 以空间 $n^k$ 判定；由 [[#lem-configs]]，对某个常数 $d$，$M$ 至多有 $2^{d n^k}$ 个格局，所以它在 $T = 2^{d n^k}$ 步内停机。固定长度 $n$ 的输入 $w$。与库克–列文的证明（[[complexity/np-completeness#thm-cook-levin]]）一样，格局是 $O(n^k)$ 个格子的一行，我们用一个 $O(n^k)$ 个布尔变元的方块来表示它，说明哪个格子装着哪个符号。对变元方块 $c_1, c_2$ 与 $t \ge 1$，我们构造一个量化公式 $\varphi_{c_1, c_2, t}$，以 $c_1, c_2$ 为自由变元，使得它为真当且仅当 $c_1$ 与 $c_2$ 编码格局且 $c_1$ 能在至多 $t$ 步内到达 $c_2$。

- $t = 1$：$\varphi_{c_1, c_2, 1}$ 说 $c_1$ 与 $c_2$ 是合法良构的格局，且或者 $c_1 = c_2$（对应的变元全部相等），或者 $c_1$ 在 $c_2$ 之上的每个 $2 \times 3$ 窗口都合法。由 [[complexity/np-completeness#lem-windows]]，这就表达了"$c_1$ 导出 $c_2$"，而公式的大小是 $O(n^k)$。
- $t > 1$：显然的递归 $\exists m\,(\varphi_{c_1, m, \lceil t/2\rceil} \land \varphi_{m, c_2, \lceil t/2\rceil})$ 是正确的，但每一层都把规模翻倍——总共 $O(T) = 2^{O(n^k)}$。技巧是让两个半段共用一份子公式，由一个全称量词决定它检查哪一半：
$$
\varphi_{c_1, c_2, t} = \exists m\ \forall c_3\, \forall c_4\ \Bigl[\bigl((c_3 = c_1 \land c_4 = m) \lor (c_3 = m \land c_4 = c_2)\bigr) \to \varphi_{c_3, c_4, \lceil t/2\rceil}\Bigr].
$$ {#eq-tqbf-step}

这里 $\exists m$ 与 $\forall c_3$ 是对整个方块的所有变元量化之缩写，而 $c_3 = c_1$ 是对应变元的 $x \leftrightarrow y$ 的合取。公式说的是：存在中点 $m$，使得对 $(c_3, c_4) = (c_1, m)$ 与 $(m, c_2)$ 这两对都有 $c_3$ 在 $\lceil t/2\rceil$ 步内到达 $c_4$——正是 [[#alg-canyield]] 的中点条件。（不属这两型的 $(c_3, c_4)$ 使蕴含式为真。）

*规模。*每层添加 $O(n^k)$ 个符号（量词方块与等式），并只含下一层公式的一份拷贝。层数为 $\lceil\log_2 T\rceil = O(n^k)$，所以 $\varphi_{c_1, c_2, T}$ 的大小是 $O(n^{2k})$，且由一个简单的递归过程在多项式时间内写出。

最后，输出 $\varphi_w = \varphi_{c_{\text{start}}, c_{\text{acc}}, T}$，把 $c_{\text{start}}$ 的变元固定为 $w$ 上的初始格局，把 $c_{\text{acc}}$ 的变元固定为（在 [[#thm-savitch]] 证明的修改之后唯一的）接受格局。把所有量词提到最前（把约束变元改名区分开）就得到一个全量化公式，它为真当且仅当 $M$ 接受 $w$。
:::

上面的证明从未用到 $M$ 是确定性的：同一个公式对非确定性机器同样有效，这给出 $\mathsf{NPSPACE} \subseteq \mathsf{PSPACE}$ 的第二个证明。[[#eq-tqbf-step]] 中的全称量词正是让公式保持短小的东西；若只有存在量词，我们就回到库克–列文构造，它需要每个时间步一行。

::: example 求值一个量化公式 {#ex-qbf}
判定 $\forall x_1\, \exists x_2\ (x_1 \lor x_2) \land (\overline{x_1} \lor \overline{x_2})$ 与 $\exists x_1\, \forall x_2\ (x_1 \lor x_2) \land (\overline{x_1} \lor \overline{x_2})$。
::: solution
矩阵说的是 $x_1 \ne x_2$。第一个公式里，无论 $\forall$-玩家选什么 $x_1$，$\exists$-玩家都应答 $x_2 = \overline{x_1}$：真。第二个公式里，$\exists$-玩家必须先对 $x_1$ 表态，随后 $\forall$-玩家选 $x_2 = x_1$：假。量词的次序要紧，就像整数上 $\forall x\, \exists y\, (y > x)$ 与 $\exists y\, \forall x\, (y > x)$ 之别。

```python
def qbf(prefix, matrix, assignment=()):
    """prefix：每个变元 x1, x2, ... 对应一个 'E' 或 'A' 的字符串；matrix：其上的 CNF。
    深度优先求值：空间只需博弈树中的一条路径，时间 2^n。"""
    i = len(assignment)
    if i == len(prefix):
        return all(any((l > 0) == assignment[abs(l) - 1] for l in c) for c in matrix)
    branches = (qbf(prefix, matrix, assignment + (b,)) for b in (False, True))
    return any(branches) if prefix[i] == "E" else all(branches)

phi = [[1, 2], [-1, -2]]                  # (x1 v x2) & (~x1 v ~x2)：即 "x1 与 x2 不同"
print(qbf("AE", phi), qbf("EA", phi))     # 任意 x1 存在 x2 ...；存在 x1 任意 x2 ...
```

```console
$ python3 qbf.py
True False
```
:::
:::

### 博弈

许多完全信息双人博弈，推广到规模 $n$ 的棋盘后，只要每盘棋的步数以多项式为界就是 $\mathsf{PSPACE}$ 完全的——博弈树的深度是多项式的，所以可以用多项式空间作深度优先搜索，而 $\mathit{TQBF}$ 能归约到它们。例子有**广义地理**（双方交替地在有向图中延长一条简单路径；无路可走者输；Schaefer，1978）与 $n \times n$ 棋盘上的 **Hex**（Reisch，1981）。一个局面可能持续指数多步的博弈可能更难：广义国际象棋（Fraenkel 与 Lichtenstein，1981）与采用日本劫规则的围棋（Robson，1983）是 $\mathsf{EXP}$ 完全的，因而可证明不属于 $\mathsf{P}$（[[complexity/hierarchies]]）。

::: quiz
下列哪些是已知为真的？
- [x] $\mathsf{NP} \subseteq \mathsf{PSPACE}$
- [x] $\mathsf{NPSPACE} = \mathsf{PSPACE}$
- [ ] $\mathsf{PSPACE} = \mathsf{P}$
- [x] 若 $\mathit{TQBF} \in \mathsf{NP}$，则 $\mathsf{NP} = \mathsf{PSPACE}$。
::: solution
$\mathsf{NP} \subseteq \mathsf{PSPACE}$ 由 [[#thm-time-space]]，$\mathsf{NPSPACE} = \mathsf{PSPACE}$ 由 Savitch。$\mathsf{P} = \mathsf{PSPACE}$ 与否是未决问题（人们相信它不成立）。若 $\mathsf{PSPACE}$ 完全的 $\mathit{TQBF}$ 属于 $\mathsf{NP}$，则每个 $A \in \mathsf{PSPACE}$ 都归约到它并由 [[complexity/np-completeness#thm-reduction-p]] (2) 属于 $\mathsf{NP}$。
:::
:::

## 对数空间

### 对数空间归约与 NL 完全性

$\mathsf{NL}$ 中的每个问题都属于 $\mathsf{P}$，所以多项式时间归约在比较 $\mathsf{NL}$ 内部的问题时无用：归约完全可以把问题自己解掉。我们需要更弱的归约。

::: definition 对数空间归约 {#def-logspace-reduction}
**对数空间换标机**是这样一个图灵机：一条只读输入带、一条 $O(\log n)$ 格的工作带，以及一条只能右移读头的只写输出带。这样的机器计算的函数称为**对数空间可计算**的。若 $A$ 经一个对数空间可计算的函数归约到 $B$，记 $A \le_L B$。若 $B \in \mathsf{NL}$ 且对每个 $A \in \mathsf{NL}$ 都有 $A \le_L B$，则 $B$ 是 **$\mathsf{NL}$ 完全**的。
:::

对数空间换标机的格局只有多项式多个（[[#lem-configs]]）且会停机，所以它以多项式时间运行，输出长度也是多项式的——输出可能比它的工作带长得多的多。

::: lemma 对数空间归约的复合 {#lem-logspace-compose}
若 $A \le_L B$ 且 $B \in \mathsf{L}$，则 $A \in \mathsf{L}$。若 $A \le_L B$ 且 $B \le_L C$，则 $A \le_L C$。
:::

::: proof
设 $f$ 由对数空间换标机 $T$ 计算，$M$ 以对数空间判定 $B$。我们不能把 $f(w)$ 写下来：它可能有多项式长。替代的办法是模拟 $M$ 在 $f(w)$ 上的运行，只保存 $M$ 输入读头的*位置* $i$，用 $O(\log n)$ 比特。每当 $M$ 需要 $f(w)$ 的第 $i$ 个符号，就从头在 $w$ 上运行 $T$，丢弃输出但数它写出的符号，直到写出第 $i$ 个。每次重新计算都使用 $T$ 的 $O(\log n)$ 工作空间并被重复使用；$M$ 自己的空间是 $O(\log\lvert f(w)\rvert) = O(\log n)$。第二个断言是同样的构造，把 $M$ 换成 $B \le_L C$ 的换标机即可。
:::

::: theorem PATH 是 NL 完全的 {#thm-path-nl}
$\mathit{PATH} = \{\langle G, s, t\rangle : $ 有向图 $G$ 有从 $s$ 到 $t$ 的路径$\}$ 是 $\mathsf{NL}$ 完全的。
:::

::: proof
*$\mathit{PATH} \in \mathsf{NL}$。*在工作带上保留当前顶点 $v$（初始为 $s$）与一个步数计数器。重复至多 $n$ 次：若 $v = t$ 就接受；否则非确定性地选一个顶点 $u$，在输入上检查 $(v, u)$ 是边（若不是就拒绝这条分支），并置 $v \gets u$。$n$ 步之后拒绝。某条分支接受当且仅当路径存在（路径若有，至多 $n - 1$ 条边）。工作带上存两个顶点名和一个计数器：$O(\log n)$ 比特。

*难度。*设 $A$ 由对数空间非确定性机器 $N$ 判定，并把 $N$ 修改为具有唯一的接受格局。把 $w$ 映为 $\langle G, c_{\text{start}}, c_{\text{acc}}\rangle$，其中 $G$ 是 $N$ 在 $w$ 上的格局图。则 $w \in A$ 当且仅当 $c_{\text{acc}}$ 可从 $c_{\text{start}}$ 到达。对数空间换标机可以输出 $G$：每个格局是 $O(\log n)$ 比特的串，所以它可以对这样的串的一切对 $(c, c')$ 循环——数对只占 $O(\log n)$ 工作空间——并在 $c$ 导出 $c'$ 时输出边 $(c, c')$；检验这一点只需查看 $c$ 的输入读头下的输入符号和 $N$ 的转移表。
:::

于是 $\mathit{PATH} \in \mathsf{L}$ 当且仅当 $\mathsf{L} = \mathsf{NL}$。截至 2026 年这仍是未决问题。对**无向**图答案已知：Omer Reingold 在 2005 年证明无向可达性属于 $\mathsf{L}$，其办法是用扩展图使图对确定性游走"显得很小"。其他 $\mathsf{NL}$ 完全问题包括 $\mathit{2SAT}$ 的补（[[#ex-2sat-nl]]）与 NFA 的空性问题。

::: widget graph
nodes: s@0,1; a@1.5,2; b@1.5,0; c@3,2; d@3,0; t@4.5,1; e@4.5,2.6
edges: s>a; s>b; a>c; b>d; d>c; c>e; e>a; d>t
algorithm: bfs
start: s
caption: 格局图的微缩模型：$\mathit{PATH}$ 问 $t$ 是否从 $s$ 可达。广度优先搜索（逐步播放）以线性时间回答，但要标记每个访问过的顶点——线性空间。非确定性对数空间机器则一次猜一个顶点地猜出路径 $s, b, d, t$，只记住当前顶点和一个计数器。要在对数空间内*反驳*可达性——比如从 $t$ 出发到不了 $s$——它就得数数，如下文 Immerman–Szelepcsényi 定理所做。把 `start` 改成 `t`：它什么也到不了。
:::

### 非确定性空间在补运算下封闭

对时间，我们不知道 $\mathsf{NP}$ 是否等于 $\mathsf{coNP}$，并且相信不相等。对空间，答案是已知的，而且出人意料。

::: theorem Immerman–Szelepcsényi 定理 {#thm-immerman}
对每个空间可构造的 $s(n) \ge \log n$，$\mathsf{NSPACE}(s(n)) = \mathsf{coNSPACE}(s(n))$。特别地 $\mathsf{NL} = \mathsf{coNL}$。
:::

只需证明 $\overline{\mathit{PATH}}$——"从 $s$ 到 $t$ **没有**路径"——属于 $\mathsf{NL}$：则对任何 $A \in \mathsf{NL}$，由 [[#thm-path-nl]] 的归约有 $\overline{A} \le_L \overline{\mathit{PATH}}$（它把 $w \notin A$ 映成一个没有路径的实例），再由 [[#lem-logspace-compose]] 的非确定性版本得 $\overline{A} \in \mathsf{NL}$。对一般的 $s(n)$，把同样的论证用于有 $2^{O(s(n))}$ 个顶点的格局图。

当路径不存在时，非确定性机器要做什么才能*接受*？它无法直接猜一个短的不可达证书。想法是**归纳计数**：若机器知道从 $s$ 可达的顶点*个数* $c$，它就能通过举出 $c$ 个可达的顶点——每个都配一条猜出的路径——而其中没有 $t$，来认证 $t$ 不可达。而数 $c$ 本身可以非确定性地逐层算出。

说精确些：令 $R_i$ 为能从 $s$ 经至多 $i$ 条边的路径到达的顶点集，$c_i = \lvert R_i\rvert$。于是 $R_0 = \{s\}$、$c_0 = 1$，而 $R_{n-1}$ 就是从 $s$ 可达的一切顶点的集合。我们说一台非确定性机器**算出**某个值，若每条分支或者拒绝、或者带着正确的值停机，且至少有一条分支带着它停机。

::: lemma 归纳计数 {#lem-inductive-counting}
给定 $\langle G, s\rangle$、$i$ 与正确的值 $c_i$，非确定性机器能以 $O(\log n)$ 空间算出 $c_{i+1}$。
:::

::: proof
机器保留一个计数器 $c$（初始为 $0$），并对所有顶点 $v$ 依次过一遍，逐个判定 $v \in R_{i+1}$ 是否成立；若成立就给 $c$ 加一。结束时输出 $c$。判定单个 $v$ 的办法：

- 置计数器 $d \gets 0$ 与标志 $\mathit{in} \gets$ 假。对每个顶点 $u$ 依次：非确定性地猜 $u \in R_i$ 是否成立。若猜"是"，就*验证*之：一次一个顶点地猜一条从 $s$ 到 $u$ 至多 $i$ 条边的路径，如 [[#thm-path-nl]] 那样；若猜出的路径失败，就**拒绝**（这条分支就此消亡）。若验证通过，给 $d$ 加一，且若 $u = v$ 或 $(u, v)$ 是边，就置 $\mathit{in} \gets$ 真。
- 所有 $u$ 处理完后：若 $d \ne c_i$，**拒绝**。否则 $v \in R_{i+1}$ 当且仅当 $\mathit{in}$ 为真。

*正确性。*在一条未拒绝的分支上，计入 $d$ 的每个 $u$ 都被验证属于 $R_i$，且 $d = c_i = \lvert R_i\rvert$，所以这条分支对 $R_i$ 的*每个*成员都猜了"是"。于是 $\mathit{in}$ 为真当且仅当某个 $u \in R_i$ 等于 $v$ 或有边通向 $v$，即当且仅当 $v \in R_{i+1}$。所以每条存活分支对每个 $v$ 都到达正确的判定，最终计数就是 $c_{i+1}$。一条始终猜对、且猜出的路径都合法的分支会存活，所以至少有一条分支输出 $c_{i+1}$。

*空间。*机器存 $i$、$c_i$、$c$、$v$、$d$、$u$、$\mathit{in}$，以及猜出路径的当前顶点与步数：常数多个 $O(\log n)$ 位的值，在各轮之间重复使用。
:::

::: proof of the Immerman–Szelepcsényi theorem
$\overline{\mathit{PATH}}$ 的一个 $\mathsf{NL}$ 机器，输入 $\langle G, s, t\rangle$：从 $c_0 = 1$ 出发，应用 [[#lem-inductive-counting]] $n - 1$ 次，只保留当前的计数，在每条存活分支上得到 $c = c_{n-1} = \lvert R_{n-1}\rvert$。然后再把所有顶点 $u$ 过一遍，逐个猜它是否可达，每个"是"都配一条至多 $n - 1$ 条边的猜测路径来验证（验证失败就拒绝；若某个验证通过的 $u$ 等于 $t$ 也拒绝）；数出验证通过的顶点数。若计数等于 $c$ 就**接受**；否则拒绝。

若 $t$ 不可达，则把一切都猜对的分支恰验证 $c$ 个可达顶点且其中没有 $t$，于是接受。若 $t$ 可达，一条接受分支本应验证 $c$ 个互不相同的可达顶点且没有一个等于 $t$——但可达顶点一共只有 $c$ 个而 $t$ 是其一，所以不验证 $t$ 至多只能验证 $c - 1$ 个顶点：没有分支接受。全程空间都是 $O(\log n)$。
:::

::: example 数可达的顶点 {#ex-inductive-counting}
对顶点为 $1, \dots, 6$、边为 $1 \to 2$、$2 \to 3$、$1 \to 4$、$4 \to 3$、$3 \to 5$、$6 \to 1$ 且 $s = 1$ 的图，算出各计数 $c_0, \dots, c_5$，并说明机器如何认证 $6$ 从 $1$ 不可达。
::: solution
$R_0 = \{1\}$、$c_0 = 1$。$R_1 = \{1, 2, 4\}$、$c_1 = 3$。$R_2 = \{1, 2, 4, 3\}$（$3$ 经由 $2$ 或 $4$）、$c_2 = 4$。$R_3 = R_2 \cup \{5\}$、$c_3 = 5$。于是 $c_4 = c_5 = 5$。以从 $c_1 = 3$ 算 $c_2$ 为例，机器对每个 $v$ 作检验：对 $v = 3$，它必须举出 $R_1$ 的三个经过验证的成员（只能靠找到 $1$、$2$、$4$ 及长度 $\le 1$ 的路径），并看到了边 $2 \to 3$，所以 $3 \in R_2$；对 $v = 5$，在验证同样三个顶点之后它找不到进入 $5$ 的边，而它已把 $R_1$ 的全部 $c_1 = 3$ 个成员都算过了，于是断定 $5 \notin R_2$。在最后一遍中它验证了五个可达顶点 $1, 2, 3, 4, 5$——其中没有 $6$——并且由于 $c_5 = 5$，接受：$6$ 不可达。顶点 $6$ 有一条*指向* $1$ 的边，这与可达性无关；只有从可达顶点出发的边才要紧。
:::
:::

这个定理在自动机理论中有一个优雅的推论：上下文有关语言（由线性有界自动机判定的语言，即属于 $\mathsf{NSPACE}(n)$ 的语言）的补也是上下文有关的——这就是自 1964 年悬而未决、由本定理解决的"第二个 LBA 问题"。"第一个 LBA 问题"，即 $\mathsf{NSPACE}(n) = \mathsf{SPACE}(n)$ 与否，至今未决。

已知的关系是
$$
\mathsf{L} \subseteq \mathsf{NL} = \mathsf{coNL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} = \mathsf{NPSPACE} \subseteq \mathsf{EXP}.
$$
由 [[complexity/hierarchies]] 的空间层次定理，$\mathsf{NL} \subsetneq \mathsf{PSPACE}$，所以它们之间的包含中至少有一个是严格的；截至 2026 年，其中任何一个单独是否严格都尚不可知。

::: history
空间复杂性类与最早的空间层次结果由 Philip Lewis、Richard Stearns 与 Juris Hartmanis 于 1965 年引入。Walter Savitch 在 "Relationships between nondeterministic and deterministic tape complexities"（*Journal of Computer and System Sciences*，1970）中证明了他的定理。Larry Stockmeyer 与 Albert Meyer 在 1973 年证明量化布尔公式是 $\mathsf{PSPACE}$ 完全的。Neil Jones 在 1975 年引入了对数空间归约与 $\mathsf{NL}$ 完全性。Neil Immerman（1988）与 Róbert Szelepcsényi（1987 年，期刊版 1988）独立证明了非确定性空间在补运算下封闭，回答了 S.-Y. Kuroda 于 1964 年提出的第二个 LBA 问题；他们共同获得 1995 年哥德尔奖。Omer Reingold 关于无向可达性属于确定性对数空间的证明于 2005 年发表、2008 年刊出，并获得 2009 年哥德尔奖。
:::

## 后续内容

[[complexity/hierarchies]] 的层次定理说明更多的空间带来更多能力（$\mathsf{L} \ne \mathsf{PSPACE}$），而曾使 $\mathit{TQBF}$ 变难的交替量词在那里以多项式层次的面目回归：限制量词交替的层数，就得到介于 $\mathsf{NP}$ 与 $\mathsf{PSPACE}$ 之间的类。交互证明——一个多项式时间的随机化验证器同一个全能力证明者对话——恰好吃下 $\mathsf{PSPACE}$（Shamir，1992；见 [[complexity/randomised-complexity]]）。在实践中，并发程序与规划问题（[[artificial-intelligence]]）的模型检查通常是 $\mathsf{PSPACE}$ 完全的，这正是它们的工具要巧妙地而并非穷尽地搜索状态空间的原因。

::: summary
- 空间数的是工作带格子；有了只读输入带，$\log n$ 这样的次线性空间才有意义（[[#def-space]]、[[#def-pspace]]）。
- 用空间 $f \ge \log n$ 的机器有 $2^{O(f)}$ 个格局（[[#lem-configs]]），于是 $\mathsf{NSPACE}(f) \subseteq \mathsf{TIME}(2^{O(f)})$，且 $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP}$（[[#thm-time-space]]）。
- **Savitch**：以重复使用空间的递归中点搜索得 $\mathsf{NSPACE}(f) \subseteq \mathsf{SPACE}(f^2)$（[[#thm-savitch]]）；于是 $\mathsf{PSPACE} = \mathsf{NPSPACE}$。
- **$\mathit{TQBF}$ 是 $\mathsf{PSPACE}$ 完全的**（[[#thm-tqbf]]）：一个全称量词让"$\lceil t/2\rceil$ 步内可达"公式的一份拷贝同时服务两个半段；许多长度多项式的博弈是 $\mathsf{PSPACE}$ 完全的。
- **$\mathit{PATH}$ 在对数空间归约下是 $\mathsf{NL}$ 完全的**（[[#thm-path-nl]]）；无向可达性属于 $\mathsf{L}$（Reingold）。
- **Immerman–Szelepcsényi**：$\mathsf{NL} = \mathsf{coNL}$，办法是非确定性地数 $i$ 步内可达的顶点数（[[#thm-immerman]]、[[#lem-inductive-counting]]）。$\mathsf{L} = \mathsf{NL}$、$\mathsf{P} = \mathsf{PSPACE}$ 与 $\mathsf{NP} = \mathsf{PSPACE}$ 是否为真均未决。
:::

## 习题

::: exercise 数格局 {level=1 check="16200"}
用 [[#lem-configs]] 的界，状态数 $\lvert Q\rvert = 5$、工作字母表大小 $\lvert\Gamma\rvert = 3$ 的机器，在长度 $n = 10$ 的输入上、使用 $f(n) = 4$ 个工作格时，可以有多少个格局？（填写数字。）
::: solution
$\lvert Q\rvert \cdot n \cdot f(n) \cdot \lvert\Gamma\rvert^{f(n)} = 5 \cdot 10 \cdot 4 \cdot 3^4 = 200 \cdot 81 = 16\,200$。
:::
:::

::: exercise Savitch 递归的深度 {level=1 check="20"}
$t = 2^{20}$ 时，$\mathrm{CANYIELD}(c_1, c_2, t)$ 在顶层调用之下有多少层递归？（填写数字。）
::: solution
每层把 $t$ 减半：$2^{20} \to 2^{19} \to \cdots \to 2^0 = 1$，共 $20$ 次减半，所以顶层调用之下 $20$ 层（例题对 $t = 16 = 2^4$ 报出的深度 $5$ 把顶层调用也算在内）。
:::
:::

::: exercise 判断真假？{level=1}
判定：(a) $\exists x\, \forall y\ (x \lor y)$；(b) $\forall y\, \exists x\ (x \land y) \lor (\overline{x} \land \overline{y})$；(c) $\exists x\, \forall y\ (x \land y) \lor (\overline{x} \land \overline{y})$。
::: solution
(a) 真：取 $x = 1$。(b) 矩阵说的是 $x = y$；对每个 $y$ 取 $x = y$：真。(c) $x$ 必须同时等于 $y = 0$ 与 $y = 1$：假。
:::
:::

::: exercise NP 与 coNP 含于 PSPACE {level=2}
不用 [[#thm-time-space]]，直接用验证器证明 $\mathsf{NP} \subseteq \mathsf{PSPACE}$ 与 $\mathsf{coNP} \subseteq \mathsf{PSPACE}$。
::: solution
设 $V$ 以时间 $p(n)$ 验证 $L \in \mathsf{NP}$，证书长至多 $p(n)$。在输入 $w$ 上，按短字典序遍历长度至多 $p(n)$ 的一切串 $c$，重复使用一个 $p(n)$ 格的缓冲区，在 $\langle w, c\rangle$ 上运行 $V$（至多再用 $p(n)$ 个格子，用完擦掉）；只要某次运行接受就接受。空间是 $O(p(n))$。$\mathsf{PSPACE}$ 在补运算下封闭（确定性判定器可以交换自己的答案），所以 $\mathsf{coNP} \subseteq \mathsf{PSPACE}$ 也成立。
:::
:::

::: exercise 一个对数空间算法 {level=2}
证明 $\{(, )\}$ 上平衡括号串的语言属于 $\mathsf{L}$。两种括号 $\{(, ), [, ]\}$ 的平衡串语言也属于 $\mathsf{L}$ 吗？
::: solution
一种括号：从左到右扫描，保留（开-闭）计数器的值，$O(\log n)$ 比特；一旦变负就拒绝；结束时恰为 $0$ 才接受。两种括号时单个计数器不够，但对数空间仍然够：串平衡当且仅当 (i) 把两种括号当成一种时它平衡，且 (ii) 对每个 $i$，若 $i$ 处是闭括号，则与它配对的开括号与它同类。对 (ii)，从位置 $i$ 向左扫，配一个从 $0$ 起步的深度计数器：遇到闭括号加一；遇到开括号，若计数器为 $0$ 它就是配对者，否则减一。把配对括号的种类与 $i$ 处的种类比较。这只用常数多个 $O(\log n)$ 位的计数器与位置。
:::
:::

::: exercise 2SAT 属于 NL {#ex-2sat-nl level=2}
证明 $\overline{\mathit{2SAT}}$（不可满足的 2CNF 公式）属于 $\mathsf{NL}$，并由此得出 $\mathit{2SAT} \in \mathsf{NL}$。
::: solution
由 [[complexity/coping-with-hardness#thm-2sat]]，$\varphi$ 不可满足当且仅当存在某个变元 $x$，使蕴含图有路径 $x \leadsto \overline{x}$ 与 $\overline{x} \leadsto x$。非确定性对数空间机器猜 $x$，然后逐顶点猜第一条路径（如 [[#thm-path-nl]] 那样），再猜第二条。蕴含图的边可以直接对照输入带上的子句来检验，所以这张图从不需要写出来。于是 $\overline{\mathit{2SAT}} \in \mathsf{NL}$，而由 Immerman–Szelepcsényi 得 $\mathit{2SAT} \in \mathsf{coNL} = \mathsf{NL}$。（事实上 $\overline{\mathit{2SAT}}$ 是 $\mathsf{NL}$ 完全的。）
:::
:::

::: exercise 朴素的递归太长了 {level=3}
在 [[#thm-tqbf]] 的证明中，若递归不是 [[#eq-tqbf-step]] 而是 $\exists m\,(\varphi_{c_1, m, t/2} \land \varphi_{m, c_2, t/2})$，令 $s(t)$ 为公式 $\varphi_{c_1, c_2, t}$ 的大小，设 $s(1) = a$、每层另加 $b$ 个符号，其中 $a$ 与 $b$ 都是 $\Theta(n^k)$。对 $t$ 为 $2$ 的幂解这个递归式，并与实际构造比较。
::: solution
朴素递归式是 $s(t) = 2s(t/2) + b$、$s(1) = a$，于是 $s(t) = at + b(t - 1) = \Theta(n^k t)$。取 $t = T = 2^{dn^k}$，这是指数的——不比写出一整条计算历史好。而带全称量词的构造满足 $s(t) = s(t/2) + b'$，$b' = \Theta(n^k)$，于是 $s(T) = a + b'\log_2 T = O(n^k + n^k \cdot dn^k) = O(n^{2k})$。一份拷贝之所以可行，是因为量化公式为真要求它的主体对 $(c_1, m)$ 与 $(m, c_2)$ *两对*都成立。
:::
:::

::: exercise 广义地理属于 PSPACE {level=3}
在**广义地理**中，输入是有向图 $G$ 与起点 $b$。玩家 I 从 $b$ 出发；双方交替地沿一条边从当前顶点走到尚未访问的顶点；无路可走的玩家输。证明"玩家 I 是否有必胜策略"属于 $\mathsf{PSPACE}$，并实现该判定程序。
::: solution
一盘棋至多 $n$ 步（每步访问一个新顶点）。定义 $\mathrm{WIN}(v, \mathit{visited})$——"即将从 $v$ 走棋的玩家获胜"——为真当且仅当存在边 $v \to u$，$u \notin \mathit{visited}$，使 $\mathrm{WIN}(u, \mathit{visited} \cup \{u\})$ 为假。深度优先求值。递归深度至多 $n$，每层栈帧存一个顶点和一个迭代器，而 $\mathit{visited}$ 是一个共享的 $n$ 比特集合，下行时更新、回程时复原：总共 $O(n \log n)$ 空间。先从 $b$ 走棋的玩家 I 获胜当且仅当 $\mathrm{WIN}(b, \{b\})$ 为真。

```python
def wins(adj, v, visited):
    """即将从 v 走棋的玩家是否获胜（正常玩法，不许重访）。"""
    for u in adj.get(v, []):
        if u not in visited:
            visited.add(u)
            opponent_wins = wins(adj, u, visited)
            visited.remove(u)                 # 复原：空间被重复使用
            if not opponent_wins:
                return True
    return False

G = {1: [2, 3], 2: [4], 3: [4], 4: [5], 5: []}
P = {1: [2], 2: [3], 3: []}
print(wins(G, 1, {1}), wins(P, 1, {1}))
```

```console
$ python3 geography.py
True False
```

在 $G$ 中，玩家 I 走 $1 \to 2$（或 $1 \to 3$），玩家 II 只能走到 $4$，玩家 I 走到 $5$，玩家 II 无路可走：`wins(G, 5)` 为假，所以 `wins(G, 4)` 为真，`wins(G, 2)` 与 `wins(G, 3)` 为假，而 `wins(G, 1)` 为真。在路 $1 \to 2 \to 3$ 上，玩家 I 走到 $2$，玩家 II 走到 $3$，玩家 I 无路可走。$\mathsf{PSPACE}$ 难度（Schaefer，1978）由一个从 $\mathit{TQBF}$ 出发的归约证明：每个变元变成一个菱形，菱形两侧代表它的两个取值，由拥有那个量词的玩家选择。
:::
:::
