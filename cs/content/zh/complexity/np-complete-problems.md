库克（Cook）–列文（Levin）定理通过一段关于图灵机的漫长论证给了我们一个 $\mathsf{NP}$ 完全问题。此后每一个都要便宜得多：由 [[complexity/np-completeness#thm-npc]] (3)，要证明某个问题 $X \in \mathsf{NP}$ 是 $\mathsf{NP}$ 完全的，只需把*一个*已知的 $\mathsf{NP}$ 完全问题归约到它。理查德·卡普（Richard Karp）在 1972 年对 21 个问题这样做了；Garey 与 Johnson 1979 年的著作编目了 300 多个；今天已有数千个之多，从蛋白质折叠模型到电子游戏关卡。

本章用从 $\mathit{3SAT}$ 出发的显式归约搭建这份目录的核心：归约到独立集、团与顶点覆盖；归约到哈密顿路径与回路以及旅行商问题；归约到子集和；以及归约到图三色问题。每个归约都遵循同样的模式：构造**构件**——目标实例中模仿变量（一个二选一）与子句（至少有一个文字为真的约束）的小块——并把它们连接起来，使新实例的解对应于满足赋值。对每个归约我们都证明两个方向，并且还要拿实现与穷举法对照检验：这是对付构件构造中频发的差一错误的一道廉价保险。

## NP 完全性证明的形状

::: algorithm 证明一个问题 NP 完全 {#alg-npc-recipe}
要证明语言 $X$ 是 $\mathsf{NP}$ 完全的：

1. 证明 $X \in \mathsf{NP}$：给出证书与多项式时间验证器。
2. 选取一个已知的 $\mathsf{NP}$ 完全问题 $A$（常取 $\mathit{3SAT}$）。
3. 描述一个函数 $f$，把 $A$ 的每个实例 $w$ 映为 $X$ 的实例 $f(w)$，并论证它可在多项式时间内计算（通常的论证是：输出的规模是多项式的，且由简单循环写出）。
4. 证明**归约的完备性**：若 $w \in A$ 则 $f(w) \in X$（把 $w$ 的解变成 $f(w)$ 的解）。
5. 证明**归约的可靠性**：若 $f(w) \in X$ 则 $w \in A$（把 $f(w)$ 的解变成 $w$ 的解）——或等价地，$w \notin A \Rightarrow f(w) \notin X$。
:::

::: warning 半个归约不是归约
最常见的错误是只证明第 4 步："一个满足赋值给出一个大小为 $k$ 的团"。这很容易，而且什么也证明不了——映射 $\varphi \mapsto$ "一个完全图"也有这个性质。归约的实质在第 5 步：所构实例的每一个解——包括设计者始料未及的怪异解——都必须给出原问题的解。第二个常见错误是把归约反着做，把新问题的实例归约到 $\mathit{3SAT}$；为何那只能说明属于 $\mathsf{NP}$，见 [[complexity/np-completeness#thm-reduction-p]]。
:::

## 独立集、团与顶点覆盖

回忆 [[complexity/np-completeness#ex-clique-is]]：$\mathit{IS} = \{\langle G, k\rangle : G$ 含有大小为 $k$ 的独立集$\}$。

::: theorem 独立集是 NP 完全的 {#thm-is}
$\mathit{IS}$ 是 $\mathsf{NP}$ 完全的。
:::

::: proof
*属于 $\mathsf{NP}$：*证书就是那个顶点集；检验它的大小，并检验没有边连接其中两个顶点。

*从 $\mathit{3SAT}$ 归约。*设 $\varphi = c_1 \land \cdots \land c_m$，其中 $c_j = (\ell_{j,1} \lor \ell_{j,2} \lor \ell_{j,3})$。为每个文字出现 $\ell_{j,p}$ 建一个顶点 $v_{j,p}$——共 $3m$ 个顶点——并加入两类边：

- **子句三角形**：每个子句的三个顶点两两相连；
- **冲突边**：只要 $\ell_{j,p}$ 与 $\ell_{j',p'}$ 是互补文字（$x$ 与 $\overline{x}$），就把 $v_{j,p}$ 与 $v_{j',p'}$ 相连。

输出 $\langle G, m\rangle$。这需要 $O(m^2)$ 时间。

*若 $\varphi$ 可满足，*取定一个满足赋值，在每个子句中选出一个为真的文字出现。选出的 $m$ 个顶点分属不同的三角形，且其中任意两个都不是互补文字（两者皆为真），所以它们构成一个大小为 $m$ 的独立集。

*若 $G$ 有大小为 $m$ 的独立集 $S$，*则 $S$ 至多含每个三角形的一个顶点，于是恰含一个。$S$ 中的文字不含互补对（$S$ 内部没有冲突边），所以可以把它们全部置为真；其余变量任意赋值。每个子句都含有 $S$ 中的一个文字，它是真的，故 $\varphi$ 被满足。
:::

::: widget graph
nodes: 1.x1@0,0; 1.x2@1,1.6; 1.¬x3@2,0; 2.¬x1@3.5,0; 2.x2@4.5,1.6; 2.x3@5.5,0; 3.¬x1@7,0; 3.¬x2@8,1.6; 3.¬x3@9,0
edges: 1.x1-1.x2; 1.x2-1.¬x3; 1.x1-1.¬x3; 2.¬x1-2.x2; 2.x2-2.x3; 2.¬x1-2.x3; 3.¬x1-3.¬x2; 3.¬x2-3.¬x3; 3.¬x1-3.¬x3; 1.x1-2.¬x1; 1.x1-3.¬x1; 1.x2-3.¬x2; 2.x2-3.¬x2; 1.¬x3-2.x3; 2.x3-3.¬x3
algorithm: none
caption: [[#thm-is]] 从 $\varphi = (x_1 \lor x_2 \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor x_3) \land (\overline{x_1} \lor \overline{x_2} \lor \overline{x_3})$ 构造的图：三个子句三角形与六条冲突边（顶点 $j.\ell$ 是子句 $j$ 中的文字 $\ell$）。找一个大小为 $3$ 的独立集——每个三角形取一个顶点，且不含冲突边——并读出赋值；例如 $\{1.x_2, 2.x_2, 3.\overline{x_1}\}$ 给出 $x_1 = 0$、$x_2 = 1$。拖动顶点可以把图理顺。
:::

::: example 一个是实例与一个非实例 {#ex-is}
(a) 对图中的公式，列出冲突边，并把独立集 $\{1.x_2,\ 2.x_3,\ 3.\overline{x_1}\}$ 变成一个满足赋值。(b) 为不可满足公式 $\psi = (x_1 \lor x_1 \lor x_1) \land (\overline{x_1} \lor \overline{x_1} \lor \overline{x_1})$ 构造图，并验证它没有大小为 $2$ 的独立集。
::: solution
(a) 冲突边连接不同子句中的互补文字：$1.x_1$–$2.\overline{x_1}$、$1.x_1$–$3.\overline{x_1}$、$1.x_2$–$3.\overline{x_2}$、$2.x_2$–$3.\overline{x_2}$、$1.\overline{x_3}$–$2.x_3$ 与 $2.x_3$–$3.\overline{x_3}$——共六条。集合 $\{1.x_2, 2.x_3, 3.\overline{x_1}\}$ 在每个三角形中取一个顶点，而六条边中没有一条连接其中两个顶点。把它的文字都置为真给出 $x_2 = 1$、$x_3 = 1$、$x_1 = 0$。检验：子句 1 含 $x_2$，子句 2 含 $x_3$，子句 3 含 $\overline{x_1}$，全为真。
(b) 该图有两个三角形：第一个子句的三个出现构成的 $\{1.x_1^{(1)}, 1.x_1^{(2)}, 1.x_1^{(3)}\}$，第二个子句同理；而 $x_1$ 的一个出现与 $\overline{x_1}$ 的一个出现组成的 $3 \cdot 3 = 9$ 对，每一对都是冲突边。于是任意两个顶点都相邻——该图就是完全图 $K_6$——最大的独立集只有一个顶点，少于 $m = 2$。这正是可靠性方向在起作用：当没有任何赋值能使所有文字为真时，冲突边使得不可能从每个子句中挑出一个"真"文字。
:::
:::

团与顶点覆盖由简单变形即得。$G$ 的一个**顶点覆盖**是顶点集 $C$，使得每条边至少有一个端点属于 $C$；$\mathit{VC} = \{\langle G, k\rangle : G$ 含有大小不超过 $k$ 的顶点覆盖$\}$。

::: theorem 团与顶点覆盖是 NP 完全的 {#thm-clique-vc}
$\mathit{CLIQUE}$ 与 $\mathit{VC}$ 是 $\mathsf{NP}$ 完全的。
:::

::: proof
二者都属于 $\mathsf{NP}$（证书：那个集合）。由 $\langle G, k\rangle \mapsto \langle\overline{G}, k\rangle$ 得 $\mathit{IS} \le_p \mathit{CLIQUE}$（[[complexity/np-completeness#ex-clique-is]]）。对 $\mathit{VC}$：在 $G = (V, E)$ 中，集合 $S$ 独立当且仅当没有边的两个端点都在 $S$ 中，当且仅当每条边都有一个端点在 $V \setminus S$ 中，当且仅当 $V \setminus S$ 是顶点覆盖。于是 $G$ 有大小为 $k$ 的独立集当且仅当它有大小为 $n - k$ 的顶点覆盖（大小小于 $n - k$ 的覆盖总可以扩充），而 $\langle G, k\rangle \mapsto \langle G, n - k\rangle$ 把 $\mathit{IS}$ 归约到 $\mathit{VC}$。
:::

## 哈密顿路径与回路

带全局约束——访问*每个*顶点——的图问题需要更精巧的构件。我们采用 Sipser 教材中的构造，并给出困难方向的完整证明。

::: theorem 哈密顿路径是 NP 完全的 {#thm-hampath}
$\mathit{HAMPATH} = \{\langle G, s, t\rangle : G$ 是有向图且含有从 $s$ 到 $t$ 的哈密顿路径$\}$ 是 $\mathsf{NP}$ 完全的。
:::

*构造。*设 $\varphi$ 有变元 $x_1, \dots, x_n$ 与子句 $c_1, \dots, c_m$（为方便计，子句指标取 $j = 0, \dots, m - 1$）。对每个变元 $x_i$ 构造一个**菱形**：一个顶顶点 $a_i$、一个底顶点 $a_{i+1}$（与下一个菱形共用），以及一行水平排列的 $3m + 1$ 个顶点 $u_{i,0}, u_{i,1}, \dots, u_{i,3m}$，相邻的 $u_{i,t} \leftrightarrow u_{i,t+1}$ 之间有双向边。再加边 $a_i \to u_{i,0}$、$a_i \to u_{i,3m}$、$u_{i,0} \to a_{i+1}$ 与 $u_{i,3m} \to a_{i+1}$。在每行中，顶点 $u_{i,3j+1}, u_{i,3j+2}$ 构成子句 $j$ 的**对**，而顶点 $u_{i,3j}$（以及 $u_{i,3m}$）是**分隔顶点**。每个子句加一个顶点 $c_j$，并且

- 若 $x_i$ 出现在 $c_j$ 中，加边 $u_{i,3j+1} \to c_j \to u_{i,3j+2}$（一次自左至右的绕行）；
- 若 $\overline{x_i}$ 出现在 $c_j$ 中，加边 $u_{i,3j+2} \to c_j \to u_{i,3j+1}$（一次自右至左的绕行）。

最后令 $s = a_1$、$t = a_{n+1}$。图有 $n(3m + 1) + (n + 1) + m$ 个顶点。

期望的读法是：一条哈密顿路径自上而下穿过各菱形，并且第 $i$ 行要么**自左至右**经过（$x_i$ 为真），要么**自右至左**经过（$x_i$ 为假）。一个子句顶点只有当所在行沿使该文字为真的方向经过时，才能被第 $i$ 行的一次绕行顺路带走。

::: proof
*属于 $\mathsf{NP}$：*[[complexity/np#ex-verifiers]]。

*若 $\varphi$ 可满足，*取定满足赋值，并为每个子句 $c_j$ 选一个为真的文字，设它属于变元 $x_i$。沿 $a_1, \text{第 } 1 \text{ 行}, a_2, \text{第 } 2 \text{ 行}, \dots, a_{n+1}$ 行走：若 $x_i$ 为真则第 $i$ 行从 $u_{i,0}$ 走到 $u_{i,3m}$，若为假则从 $u_{i,3m}$ 走到 $u_{i,0}$。对每个子句，当行走经过所选的对 $u_{i,3j+1}, u_{i,3j+2}$ 时，把这一步替换成经过 $c_j$ 的绕行：若 $x_i \in c_j$ 且该行自左至右经过，则边 $u_{i,3j+1} \to c_j \to u_{i,3j+2}$ 存在；若 $\overline{x_i} \in c_j$ 且该行自右至左经过，则边 $u_{i,3j+2} \to c_j \to u_{i,3j+1}$ 存在。每个子句顶点恰被访问一次，其余每个顶点也恰被访问一次。

*若存在从 $s$ 到 $t$ 的哈密顿路径 $P$，*我们先证明它以"只在某一个对内绕行"的方式访问每个子句顶点。除 $s$ 与 $t$ 外，每个顶点在 $P$ 上都有前驱与后继，我们称这两个顶点为它的两个 **$P$-邻居**。

1. *分隔顶点在所在行内经过。*内部分隔顶点 $u_{i,3j}$（$1 \le j \le m - 1$）只有 $u_{i,3j-1}$ 与 $u_{i,3j+1}$ 两个邻居，所以它们就是它的 $P$-邻居。端点分隔顶点 $u_{i,0}$ 的邻居是 $a_i$、$a_{i+1}$ 与 $u_{i,1}$。若它的 $P$-邻居是 $a_i$ 与 $a_{i+1}$，那么 $a_i$ 的后继与 $a_{i+1}$ 的前驱就都是 $u_{i,0}$，而 $u_{i,3m}$——它的邻居是 $a_i$、$a_{i+1}$ 与 $u_{i,3m-1}$——就只剩一个可能的 $P$-邻居 $u_{i,3m-1}$，可它需要两个。于是 $u_{i,1}$ 是 $u_{i,0}$ 的 $P$-邻居，同理 $u_{i,3m-1}$ 是 $u_{i,3m}$ 的一个 $P$-邻居。
2. *每一对要么直接经过，要么经其子句顶点经过。*设 $l = u_{i,3j+1}$、$r = u_{i,3j+2}$。由第 1 步，$l$ 以左侧分隔顶点为一个 $P$-邻居，而它其余的邻居只有 $r$ 与 $c_j$；同理 $r$ 以右侧分隔顶点为一个 $P$-邻居，其余邻居是 $l$ 与 $c_j$。于是或者 $l$ 与 $r$ 互为 $P$-邻居，或者二者互不为 $P$-邻居——这时*两者*都以 $c_j$ 为第二个 $P$-邻居。
3. *子句顶点只在一对内绕行。*$c_j$ 的前驱 $x$ 是某一行 $i$ 的对顶点。对该对用第 2 步，它的搭档也是 $c_j$ 的 $P$-邻居；而 $c_j$ 只有两个 $P$-邻居，所以它的后继就是这个搭档。

现在从 $P$ 中删去每个子句顶点，把 $x \to c_j \to y$ 换回行边 $x \to y$。所得的 $P'$ 是在去掉了子句顶点的图中从 $s$ 到 $t$ 的哈密顿路径。在那个图中，第 $i$ 行只能从 $a_i$ 进入（只进一次，因为 $a_i$ 只有一个后继），只能经由 $a_{i+1}$ 离开，于是 $P'$ 以一段连续行程经过第 $i$ 行：从行的一个端点出发，覆盖整行——它必须从一个端点笔直走到另一个端点。所以 $P'$ 就是 $a_1$、第 $1$ 行、$a_2$、……、$a_{n+1}$，每行各按一个方向经过。令 $x_i$ 为真当且仅当第 $i$ 行自左至右经过。对每个子句 $c_j$，$P$ 中的绕行 $x \to c_j \to y$ 变成了 $P'$ 中沿其所在行经过方向的步行 $x \to y$。若它是 $u_{i,3j+1} \to c_j \to u_{i,3j+2}$，则第 $i$ 行自左至右经过，$x_i$ 为真，而边 $u_{i,3j+1} \to c_j$ 只有当 $x_i$ 出现在 $c_j$ 中时才存在：该子句被满足。若它是 $u_{i,3j+2} \to c_j \to u_{i,3j+1}$，则 $x_i$ 为假且 $\overline{x_i}$ 出现在 $c_j$ 中。于是每个子句都被满足。

图有 $O(nm)$ 个顶点和边，且由简单循环构造：归约以多项式时间运行。
:::

分隔顶点正是第 2 步成立的关键：没有它们，两个子句对就会相邻，一条路径就可能从某一行进入一个子句顶点，又离开它进入另一行。

::: theorem 无向哈密顿路径、回路与 TSP {#thm-uhampath}
下列问题是 $\mathsf{NP}$ 完全的：(1) $\mathit{UHAMPATH}$，无向图中的哈密顿路径；(2) $\mathit{HAMCYCLE}$，一个图（有向或无向）是否有经过每个顶点恰一次的回路；(3) $\mathit{TSP} = \{\langle K, w, B\rangle :$ 带边权 $w$ 的完全图 $K$ 有总权重不超过 $B$ 的巡回$\}$。
:::

::: proof
三者都属于 $\mathsf{NP}$（证书：那条路径、回路或巡回）。

(1) $\mathit{HAMPATH} \le_p \mathit{UHAMPATH}$。把有向图中每个 $v \notin \{s, t\}$ 换成一条路径 $v_{\text{in}} - v_{\text{mid}} - v_{\text{out}}$；把 $s$ 换成 $s_{\text{out}}$，把 $t$ 换成 $t_{\text{in}}$；对每条有向边 $u \to v$ 加无向边 $\{u_{\text{out}}, v_{\text{in}}\}$（进入 $s$ 或离开 $t$ 的边删去）。一条有向哈密顿路径 $s, v_1, \dots, v_k, t$ 变为 $s_{\text{out}}, v_{1,\text{in}}, v_{1,\text{mid}}, v_{1,\text{out}}, \dots, t_{\text{in}}$。反之，在从 $s_{\text{out}}$ 到 $t_{\text{in}}$ 的无向哈密顿路径中，每个 $v_{\text{mid}}$ 的度为 $2$，所以它的 $P$-邻居就是 $v_{\text{in}}$ 与 $v_{\text{out}}$。沿路径从 $s_{\text{out}}$ 走：从某个 $u_{\text{out}}$ 出发，下一个顶点是某个 $v_{\text{in}}$（$u_{\text{out}}$ 的邻居只有 $u_{\text{mid}}$——已经用过——和各个 $\text{in}$-顶点）；从 $v_{\text{in}}$ 出发，下一个顶点必须是 $v_{\text{mid}}$，因为 $v_{\text{mid}}$ 需要 $v_{\text{in}}$ 作 $P$-邻居，而 $v_{\text{in}}$ 已经在 $u_{\text{out}}$ 上用掉了一个 $P$-邻居；接着就是 $v_{\text{out}}$。于是路径读作 $s_{\text{out}}, (v_{1,\text{in}}, v_{1,\text{mid}}, v_{1,\text{out}}), \dots, t_{\text{in}}$，且有向边 $s \to v_1 \to \cdots \to t$ 都存在。

(2) $\mathit{HAMPATH} \le_p \mathit{HAMCYCLE}$：加一个新顶点 $z$，配边 $t \to z \to s$。哈密顿回路必须经过 $t \to z \to s$（这是 $z$ 仅有的两条边），删去 $z$ 就剩下从 $s$ 到 $t$ 的哈密顿路径；反方向是直接的。无向版本把 $\mathit{HAMPATH}$ 换成 $\mathit{UHAMPATH}$，同样成立。

(3) $\mathit{HAMCYCLE} \le_p \mathit{TSP}$（无向）：给定有 $n$ 个顶点的 $G$，令 $K$ 为其顶点集上的完全图，若 $\{u, v\}$ 是 $G$ 的边则 $w(u, v) = 1$，否则为 $2$，并取 $B = n$。巡回有 $n$ 条边，所以它的权重为 $n$ 当且仅当它只使用 $G$ 的边，当且仅当它是 $G$ 的哈密顿回路。
:::

在下面的清单中，`karp.py` 汇集本章的诸归约，每个都配有一个求解目标问题的穷举程序。前两个归约的函数在此展示；子集和与染色两部分在其各自的小节中给出。

```python
from itertools import product, combinations

def sat(phi, n):                                  # 子句：有符号整数构成的列表
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in phi)
               for a in product([False, True], repeat=n))

def to_is(phi, n):                                # 3SAT -> 独立集
    V = [(j, p) for j in range(len(phi)) for p in range(3)]
    lit = {(j, p): phi[j][p] for (j, p) in V}
    E = {frozenset((u, v)) for u, v in combinations(V, 2)
         if u[0] == v[0] or lit[u] == -lit[v]}      # 三角形 + 冲突边
    return V, E, len(phi)

def has_is(V, E, k):
    return any(all(frozenset(p) not in E for p in combinations(S, 2))
               for S in combinations(V, k))
```

```python
def to_hampath(phi, n):                           # 3SAT -> 有向 HAMPATH
    m, E = len(phi), set()
    for i in range(1, n + 1):
        a, b, row = ("a", i), ("a", i + 1), [("u", i, t) for t in range(3 * m + 1)]
        E |= {(a, row[0]), (a, row[-1]), (row[0], b), (row[-1], b)}
        E |= {(row[t], row[t + 1]) for t in range(3 * m)} | {(row[t + 1], row[t]) for t in range(3 * m)}
        for j, c in enumerate(phi):
            l, r = row[3 * j + 1], row[3 * j + 2]
            if i in c:  E |= {(l, ("c", j)), (("c", j), r)}
            if -i in c: E |= {(r, ("c", j)), (("c", j), l)}
    V = {v for e in E for v in e} | {("c", j) for j in range(m)}
    return V, E, ("a", 1), ("a", n + 1)

def hampath(V, E, s, t):                          # 回溯搜索
    out = {}
    for u, v in E: out.setdefault(u, []).append(v)
    seen = {s}
    def go(v):
        if len(seen) == len(V): return v == t
        for w in out.get(v, []):
            if w not in seen and (w != t or len(seen) == len(V) - 1):
                seen.add(w)
                if go(w): return True
                seen.remove(w)
        return False
    return go(s)
```

::: example 数哈密顿路径构件 {#ex-hampath-size}
[[#thm-hampath]] 的构造对 $n = 3$ 个变元、$m = 4$ 个子句且每个子句含三个不同变元的公式，产生多少个顶点和边？
::: solution
顶点：三行，每行 $3m + 1 = 13$ 个顶点，四个菱形尖端 $a_1, \dots, a_4$，以及 $4$ 个子句顶点：$39 + 4 + 4 = 47$。边：每行 $2 \cdot 12 = 24$ 条行边，每个菱形 $4$ 条尖端边，共 $3 \cdot 28 = 84$；$3m = 12$ 个文字出现各加 $2$ 条绕行边，$24$。总计 $108$。比较一下：$\mathit{3SAT}$ 的穷举只需 $2^3 = 8$ 个赋值，而朴素的哈密顿路径搜索要遍历至多 $45!$ 种顺序。归约对*这些具体的图*有多难一无所语——它只说明：对*一切图*的快速算法将给出 $\mathit{3SAT}$ 的快速算法。
:::
:::

## 子集和

数字也可以充当构件——只要把它们写进足够大的进制，使加法永不进位。

::: theorem 子集和是 NP 完全的 {#thm-subset-sum}
$\mathit{SUBSET\text{-}SUM} = \{\langle a_1, \dots, a_k, T\rangle :$ 某个 $a_i$ 的子集合之和为 $T\}$（数字以二进制写出）是 $\mathsf{NP}$ 完全的。
:::

::: proof
*属于 $\mathsf{NP}$：*证书就是那个子集合。

*从 $\mathit{3SAT}$ 归约。*给定有变元 $x_1, \dots, x_n$ 与子句 $c_1, \dots, c_m$ 的 $\varphi$，用**十进制**写 $n + m$ 位的数：每个变元一位，然后每个子句一位。构造

- 对每个变元 $x_i$，两个数 $y_i$ 与 $z_i$，在 $x_i$ 位都是 $1$；此外，子句 $c_j$ 位在 $y_i$ 中是 $x_i$ 在 $c_j$ 中出现的次数，在 $z_i$ 中是 $\overline{x_i}$ 出现的次数；
- 对每个子句 $c_j$，两个"松弛"数 $g_j = h_j$，在 $c_j$ 位是 $1$、其余位是 $0$；
- 目标 $T = 1\cdots1\,3\cdots3$：每个变元位是 $1$，每个子句位是 $3$。

在每一位上，*所有*数的和至多 $5$（变元位两个；子句位至多 $3$ 个文字出现加两个松弛），所以任何子集和都永不进位，而某个子集之和为 $T$ 当且仅当它逐位给出正确的和。

*若 $\varphi$ 可满足，*当 $x_i$ 为真取 $y_i$，为假取 $z_i$。每个变元位都是 $1$。在子句位 $c_j$，所选的数贡献 $c_j$ 中真文字出现的个数——是 $1$、$2$ 或 $3$——再取 $2$、$1$ 或 $0$ 个松弛 $g_j, h_j$ 把它凑成 $3$。

*若某个子集之和为 $T$，*变元位 $x_i$ 迫使 $y_i, z_i$ 中恰有一个入选；令 $x_i$ 为真当且仅当 $y_i$ 入选。在子句位 $c_j$，松弛至多贡献 $2$，所以所选的 $y$ 与 $z$ 至少贡献 $1$：某个入选的数对应 $c_j$ 中的一个文字出现，而按赋值的选择，那个文字为真。于是每个子句都被满足。

$2n + 2m + 1$ 个数各有 $n + m$ 个十进制位，故输出的长度为 $O((n + m)^2)$，可在多项式时间内写出（以二进制计也是 $O((n+m)^2)$ 比特）。
:::

::: example 两个子句公式的子集和实例 {#ex-subset-sum}
为 $\varphi = (x_1 \lor x_2 \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor x_3)$ 构造实例，并求一个和为 $T$ 的子集。
::: solution
位序为 $x_1\,x_2\,x_3\,|\,c_1\,c_2$：

| 数 | $x_1$ | $x_2$ | $x_3$ | $c_1$ | $c_2$ | 值 |
|---|---|---|---|---|---|---|
| $y_1$ | 1 | 0 | 0 | 1 | 0 | $10010$ |
| $z_1$ | 1 | 0 | 0 | 0 | 1 | $10001$ |
| $y_2$ | 0 | 1 | 0 | 1 | 1 | $1011$ |
| $z_2$ | 0 | 1 | 0 | 0 | 0 | $1000$ |
| $y_3$ | 0 | 0 | 1 | 0 | 1 | $101$ |
| $z_3$ | 0 | 0 | 1 | 1 | 0 | $110$ |
| $g_1 = h_1$ | 0 | 0 | 0 | 1 | 0 | $10$ |
| $g_2 = h_2$ | 0 | 0 | 0 | 0 | 1 | $1$ |
| $T$ | 1 | 1 | 1 | 3 | 3 | $11133$ |

赋值 $x_1 = 1$、$x_2 = 1$、$x_3 = 0$ 选出 $y_1 + y_2 + z_3 = 10010 + 1011 + 110 = 11131$。子句 $c_1$ 有三个真文字（该位为 $3$），$c_2$ 只有一个（该位为 $1$），所以加上 $g_2 + h_2 = 2$：总和为 $11133 = T$。

```python
def to_subset_sum(phi, n):                        # 3SAT -> SUBSET-SUM (karp.py)
    m = len(phi)
    def num(var, clause_counts):                  # 前 n 位是变元位，后 m 位是子句位
        d = [0] * (n + m)
        if var is not None: d[var - 1] = 1
        for j, count in clause_counts: d[n + j] += count
        return int("".join(map(str, d)))
    nums = []
    for i in range(1, n + 1):
        nums.append(num(i, [(j, c.count(i)) for j, c in enumerate(phi)]))     # y_i
        nums.append(num(i, [(j, c.count(-i)) for j, c in enumerate(phi)]))    # z_i
    for j in range(m):
        nums += [num(None, [(j, 1)])] * 2                                     # g_j, h_j
    return nums, int("1" * n + "3" * m)

def has_subset_sum(nums, t):                      # 可达和的集合，以 t 封顶
    reach = {0}
    for a in nums:
        reach |= {s + a for s in reach if s + a <= t}
    return t in reach

if __name__ == "__main__":
    print(to_subset_sum([[1, 2, -3], [-1, 2, 3]], 3))
```

```console
$ python3 karp.py
([10010, 10001, 1011, 1000, 101, 110, 10, 10, 1, 1], 11133)
```
:::
:::

### 数字与强 NP 完全性

[[complexity/time-complexity]] 中的动态规划能在 $O(kT)$ 步内解 $\mathit{SUBSET\text{-}SUM}$，当数字小时这是多项式的。这里没有矛盾：上面的归约产生的数有 $n + m$ 个十进制位，关于公式规模是指数级的大。这类只因数字可能巨大才难的问题称为**弱 $\mathsf{NP}$ 完全**。

::: definition 强 NP 完全性 {#def-strong-npc}
对一个带数字问题的实例 $w$，令 $\mathrm{max}(w)$ 为其中最大的数。若算法的运行时间关于 $\lvert w\rvert$ 与 $\mathrm{max}(w)$ 是多项式的，就称它是**伪多项式**的。一个问题称为**强 $\mathsf{NP}$ 完全**，若把它限制在满足 $\mathrm{max}(w) \le p(\lvert w\rvert)$ 的实例上（$p$ 为某个多项式）后仍是 $\mathsf{NP}$ 完全的——等价地，当它的数字用一进制写出时仍是 $\mathsf{NP}$ 完全的。
:::

::: proposition 强 NP 完全问题的伪多项式算法 {#prop-strong}
若一个强 $\mathsf{NP}$ 完全问题有伪多项式算法，则 $\mathsf{P} = \mathsf{NP}$。
:::

::: proof
在限制实例 $\mathrm{max}(w) \le p(\lvert w\rvert)$ 上，关于 $\lvert w\rvert$ 与 $\mathrm{max}(w)$ 多项式的运行时间就是关于 $\lvert w\rvert$ 多项式的。于是这个 $\mathsf{NP}$ 完全的限制问题属于 $\mathsf{P}$；用 [[complexity/np-completeness#thm-npc]]。
:::

$\mathit{TSP}$ 是强 $\mathsf{NP}$ 完全的——从 $\mathit{HAMCYCLE}$ 出发的归约只用到权重 $1$ 与 $2$——装箱与 3-划分亦然（Garey 与 Johnson，1975）。除非 $\mathsf{P} = \mathsf{NP}$，$\mathit{SUBSET\text{-}SUM}$、$\mathit{PARTITION}$ 与 $\mathit{KNAPSACK}$ 都不是强 $\mathsf{NP}$ 完全的，因为它们有伪多项式算法。这一区分能预测可近似性：背包有任意好的多项式时间近似（[[complexity/approximation-pcp]]），装箱则没有。

## 图染色

图的**正常 $k$-染色**给每个顶点赋 $k$ 种颜色之一，使相邻顶点颜色不同；$\mathit{3COL} = \{\langle G\rangle : G$ 有正常 3-染色$\}$。能否二染色就是二分性，由 BFS 判定（[[algorithms/graph-search#thm-bipartite]]）。三种颜色就难得多了。

::: lemma OR 构件 {#lem-or-gadget}
设 $x$ 与 $y$ 是颜色取于 $\{T, F\}$ 的两个顶点，这是三种颜色 $T, F, B$ 中的两种。加入一个三角形 $g_0, g_1, g_2$ 以及边 $\{x, g_0\}$ 与 $\{y, g_1\}$。则 (i) 若 $x$ 与 $y$ 同为颜色 $F$，任何正常染色都给 $g_2$ 颜色 $F$；(ii) 若 $x$ 或 $y$ 为颜色 $T$，该构件有一个把 $g_2$ 染成 $T$ 的正常染色。
:::

::: proof
(i) $g_0 \ne F$ 且 $g_1 \ne F$（它们是 $x$、$y$ 的邻居），且 $g_0 \ne g_1$，所以 $\{g_0, g_1\} = \{T, B\}$，而与两者都相邻的 $g_2$ 就是 $F$。(ii) 若 $x = T$：染 $g_0 = F$、$g_1 = B$、$g_2 = T$；$g_1 = B$ 不同于 $y \in \{T, F\}$。若 $y = T$：染 $g_1 = F$、$g_0 = B$、$g_2 = T$。
:::

于是 $g_2$ 的表现就像 $x \lor y$：$g_2$ 能染成 $T$ 当且仅当 $x \lor y$ 为真。（在情形 (ii)，构件并不*强制* $T$，只是允许它——而这就够了。）

::: theorem 三色问题是 NP 完全的 {#thm-3col}
$\mathit{3COL}$ 是 $\mathsf{NP}$ 完全的。
:::

::: proof
*属于 $\mathsf{NP}$：*证书就是染色。

*从 $\mathit{3SAT}$ 归约。*按如下方式构造 $G$。

- 一个**调色板**三角形，顶点命名为 $T$、$F$、$B$。在任何正常 3-染色中它们染三种不同的颜色；我们按它们为颜色命名。
- 对每个变元 $x_i$，顶点 $x_i$ 与 $\overline{x_i}$ 同 $B$ 构成一个三角形。于是每个文字顶点染 $T$ 或 $F$，且 $x_i$ 与 $\overline{x_i}$ 颜色相反：这就是一个真值赋值。
- 对每个子句 $(\ell_1 \lor \ell_2 \lor \ell_3)$，一个输入为 $\ell_1, \ell_2$、输出为 $g_2$ 的 OR 构件，一个输入为 $g_2, \ell_3$、输出为 $g_5$ 的 OR 构件，以及边 $\{g_5, F\}$ 与 $\{g_5, B\}$——它们迫使 $g_5$ 染颜色 $T$。

*若 $\varphi$ 可满足，*先染调色板，按赋值把每个文字顶点染成 $T$ 或 $F$，再染每个子句的构件：由 [[#lem-or-gadget]] (ii)，当 $\ell_1 \lor \ell_2$ 为真时第一个构件能输出 $T$，否则把它染成输出 $F$（情形 (i) 给出一个 $g_0, g_1 \in \{T, B\}$ 的正常染色）；无论哪种情形都有 $g_2 \in \{T, F\}$，且由于子句被满足，$g_2 = T$ 或 $\ell_3 = T$，于是第二个构件能输出 $g_5 = T$，与它到 $F$、$B$ 的边相容。不同子句的构件只共享文字顶点，所以各染色可以合并。

*若 $G$ 可 3-染，*从 $x_i$ 的颜色读出赋值。假设某个子句的三个文字都染 $F$。由 [[#lem-or-gadget]] (i)，$g_2 = F$；于是第二个构件的两个输入都是 $F$，所以 $g_5 = F$——但 $g_5$ 与调色板顶点 $F$ 相邻。所以每个子句都有一个染成 $T$（即为真）的文字。

$G$ 有 $3 + 2n + 6m$ 个顶点和 $3 + 3n + 12m$ 条边。
:::

```python
def to_3col(phi, n):                              # 3SAT -> 3COL (karp.py)
    E = [("T", "F"), ("F", "B"), ("B", "T")]      # 调色板三角形
    L = lambda l: ("x", l)                        # 文字顶点
    for i in range(1, n + 1):
        E += [(L(i), L(-i)), (L(i), "B"), (L(-i), "B")]
    for j, (a, b, c) in enumerate(phi):
        g = [("g", j, t) for t in range(6)]
        E += [(L(a), g[0]), (L(b), g[1]), (g[0], g[1]), (g[0], g[2]), (g[1], g[2])]   # g2 = OR(a, b)
        E += [(g[2], g[3]), (L(c), g[4]), (g[3], g[4]), (g[3], g[5]), (g[4], g[5])]   # g5 = OR(g2, c)
        E += [(g[5], "F"), (g[5], "B")]                                              # 迫使 g5 = T
    return (E,)

def colourable(E, k=3):                           # 回溯，高度数顶点优先
    adj = {}
    for u, v in E:
        adj.setdefault(u, set()).add(v); adj.setdefault(v, set()).add(u)
    order, col = sorted(adj, key=lambda v: -len(adj[v])), {}
    def go(i):
        if i == len(order): return True
        for c in range(k):
            if all(col.get(w) != c for w in adj[order[i]]):
                col[order[i]] = c
                if go(i + 1): return True
                del col[order[i]]
        return False
    return go(0)
```

::: example 检验四个归约 {#ex-karp-test}
在随机的极小公式上，把 `karp.py` 的四个归约与穷举可满足性对照检验，并确保其中包括不可满足的公式。
::: solution
子句数少的随机 3CNF 公式几乎总是可满足的，所以测试用两三个变元、至多八个子句，其中一些形如 $(a \lor b \lor a)$（含重复文字），以排除更多的赋值。

```python
import random
from karp import sat, to_is, has_is, to_hampath, hampath, to_subset_sum, has_subset_sum, to_3col, colourable

def random_clause(n):
    vs = random.sample(range(1, n + 1), min(n, random.choice([2, 3])))
    lits = [v * random.choice([1, -1]) for v in vs]
    return (lits * 2)[:3]                     # (a v b) 变成 (a v b v a)

random.seed(2026)
checks = {"IS": (to_is, has_is), "HAMPATH": (to_hampath, hampath),
          "SUBSET-SUM": (to_subset_sum, has_subset_sum), "3COL": (to_3col, colourable)}
wrong = dict.fromkeys(checks, 0); count = [0, 0]
for _ in range(400):
    n = random.choice([2, 3]); m = random.randint(1, 8 if n == 2 else 6)
    phi = [random_clause(n) for _ in range(m)]
    s = sat(phi, n); count[s] += 1
    for name, (reduce, solve) in checks.items():
        wrong[name] += solve(*reduce(phi, n)) != s
print(count[1], "satisfiable and", count[0], "unsatisfiable formulas")
print("disagreements with brute force:", wrong)
```

```console
$ python3 karp_test.py
366 satisfiable and 34 unsatisfiable formulas
disagreements with brute force: {'IS': 0, 'HAMPATH': 0, 'SUBSET-SUM': 0, '3COL': 0}
```

这个测试耗时约 25 秒，几乎全部花在不可满足实例的哈密顿路径搜索上——那里回溯必须穷尽一切可能。对 [[#thm-uhampath]] 的无向构造另有专门的测试：在三到五个顶点的 300 个随机有向图上运行（其中 41 个有哈密顿路径），同样没有发现不一致。几百个实例上的一致不能证明归约正确，但一个错误的构件几乎总会在这样的测试上迅速暴露。
:::
:::

## 更宽的目录

下表把 $\mathsf{P}$ 中的问题与表面上极为相似的 $\mathsf{NP}$ 完全问题配成对；两者的分界常常就是一个词。

| $\mathsf{P}$ 中 | $\mathsf{NP}$ 完全 |
|---|---|
| $\mathit{2SAT}$（每子句两个文字）| $\mathit{3SAT}$ |
| 二染色（二分性）| 三色问题，即使限制在最大度 4 的平面图上 |
| 欧拉回路（每条*边*恰走一次）| 哈密顿回路（每个*顶点*恰走一次）|
| 最短简单路径 | 最长简单路径 |
| 最小割（[[algorithms/network-flow#thm-maxflow-mincut]]）| 最大割 |
| 二分（二维）匹配 | 三维匹配 |
| 线性规划 | 整数线性规划（0–1 规划）|
| 最小生成树 | 斯坦纳树（只连接给定的部分顶点，总权重最小）|
| 边覆盖 | 顶点覆盖 |

目录中其他标准成员还包括：**集合覆盖**（从覆盖一个全集的集合族中至多选 $k$ 个）、**精确覆盖**、**装箱**、**划分**（[[#ex-partition]]）、**背包**、**子图同构**（$G$ 是否含有 $H$ 的一份拷贝？）、许多**调度**问题，以及推广的谜题：$n^2 \times n^2$ 数独完成问题（Yato 与 Seta，2003）与扫雷一致性（Kaye，2000）。

::: widget graph
nodes: SAT@0,2; 3SAT@2,2; IS@4,3.5; CLIQUE@6,4.2; VC@6,2.8; HAMPATH@4,2; UHAMPATH@6,1.4; HAMCYCLE@8,2; TSP@10,2; SUBSETSUM@4,0.6; PARTITION@6,0; 3COL@2,0.2; SETCOVER@8,3.5
edges: SAT>3SAT; 3SAT>IS; IS>CLIQUE; IS>VC; VC>SETCOVER; 3SAT>HAMPATH; HAMPATH>UHAMPATH; HAMPATH>HAMCYCLE; HAMCYCLE>TSP; 3SAT>SUBSETSUM; SUBSETSUM>PARTITION; 3SAT>3COL
algorithm: topo
start: SAT
caption: 本章及其习题的归约；箭头 $A \to B$ 表示 $A \le_p B$，于是 $\mathsf{NP}$ 难度沿箭头从 $\mathit{SAT}$（库克–列文）流出。逐步播放拓扑排序，可看到一个能依次证明各结果的顺序。无向回路与 $\mathit{TSP}$ 使用 $\mathit{UHAMPATH}$ 的方式，与有向回路使用 $\mathit{HAMPATH}$ 的方式相同。
:::

::: quiz
一名学生证明"$\mathit{LONGEST\text{-}PATH} = \{\langle G, s, t, k\rangle : G$ 有从 $s$ 到 $t$ 至少含 $k$ 条边的简单路径$\}$ 是 $\mathsf{NP}$ 完全的"。哪个论证是可行的？
- [x] 它属于 $\mathsf{NP}$，且 $\langle G, s, t\rangle \mapsto \langle G, s, t, n - 1\rangle$ 把 $\mathit{HAMPATH}$ 归约到它。
- [ ] 把它归约到 $\mathit{SAT}$。
- [ ] 最短路属于 $\mathsf{P}$，最长路是与之"相反"的问题，所以它难。
- [ ] 把所有边权取负并用贝尔曼-福特算法。
::: solution
含 $n - 1$ 条边的简单路径访问全部 $n$ 个顶点，所以它就是哈密顿路径：$\mathit{HAMPATH}$ 是 $k = n - 1$ 的特例，这是一次通过限制完成的归约。归约到 $\mathit{SAT}$ 只说明属于 $\mathsf{NP}$。"相反"不是论证（最小生成树与最大生成树都容易）。权重取负后贝尔曼-福特算法失效，因为图中此时有负权回路，而且它计算的是最短*游走*，不是简单路径。
:::
:::

::: history
理查德·卡普（Richard Karp）的 "Reducibility among combinatorial problems"（收录于 *Complexity of Computer Computations*，1972）证明了 21 个问题 $\mathsf{NP}$ 完全，其中包括团、顶点覆盖、集合覆盖、哈密顿回路（有向与无向）、色数、精确覆盖、三维匹配、背包（就是我们称为子集和的形式）、划分、最大割与 0–1 整数规划。1976 年，Michael Garey、David Johnson 与 Larry Stockmeyer 证明三色问题在平面图上仍是 $\mathsf{NP}$ 完全的，Garey 与 Johnson 提出了强 $\mathsf{NP}$ 完全性（1978）。他们的著作 *Computers and Intractability: A Guide to the Theory of NP-Completeness*（1979）附有 300 多个问题的附录，成为标准参考；Johnson 在 *Journal of Algorithms* 上的"NP 完全性专栏"（1981–1992）使其保持最新。这里哈密顿路径所用的菱形构造遵循 Sipser 的 *Introduction to the Theory of Computation*。
:::

## 后续内容

对一个实际问题而言，$\mathsf{NP}$ 完全性不是故事的结尾，而是另一个故事的开头。[[complexity/coping-with-hardness]] 处理在真实实例上很快的指数算法、固定参数算法（$k$ 很小的顶点覆盖容易解）以及 SAT 求解器——后者把库克–列文的方向反过来：把别的问题归约*到* $\mathit{SAT}$ 来求解。[[complexity/approximation-pcp]] 问：对这些问题的优化版本，多项式时间算法能离最优解多近——并且发现答案差异极大：顶点覆盖在 $2$ 倍以内，集合覆盖在 $\ln n$ 倍以内，而一般的 $\mathit{TSP}$ 与团则不在任何常数倍以内。

::: summary
- $\mathsf{NP}$ 完全性的证明要说明属于 $\mathsf{NP}$，并给出从一个已知 $\mathsf{NP}$ 完全问题**出发**的多项式时间归约，且**两个**方向都要证（[[#alg-npc-recipe]]）。
- $\mathit{3SAT} \le_p \mathit{IS}$ 用子句三角形与冲突边（[[#thm-is]]）；$\mathit{CLIQUE}$（补图）与 $\mathit{VC}$（补集）随之而来（[[#thm-clique-vc]]）。
- $\mathit{3SAT} \le_p \mathit{HAMPATH}$ 用自左至右或自右至左经过的菱形，配上子句绕行与分隔顶点（[[#thm-hampath]]）；无向路径、回路与 $\mathit{TSP}$ 随之而来（[[#thm-uhampath]]）。
- $\mathit{3SAT} \le_p \mathit{SUBSET\text{-}SUM}$ 用每个变元、每个子句各占一位且永不进位的十进制数（[[#thm-subset-sum]]）；它只是**弱** $\mathsf{NP}$ 完全的，而 $\mathit{TSP}$ 与装箱是**强** $\mathsf{NP}$ 完全的（[[#def-strong-npc]]）。
- $\mathit{3SAT} \le_p \mathit{3COL}$ 用调色板三角形、文字三角形与 OR 构件（[[#thm-3col]]）。
- 把归约实现出来，并在极小实例（包括"否"实例）上与穷举对照检验，能抓住构件的绝大多数错误。
:::

## 习题

::: exercise 独立集图的规模 {level=1 check="24"}
按 [[#thm-is]] 为 $\varphi = (x_1 \lor x_2 \lor x_3) \land (\overline{x_1} \lor \overline{x_2} \lor x_3) \land (x_1 \lor \overline{x_2} \lor \overline{x_3}) \land (\overline{x_1} \lor x_2 \lor \overline{x_3})$ 构造图。它有多少个顶点和边？$k$ 是多少？（填写边数。）
::: solution
$12$ 个顶点，$k = m = 4$。三角形边：$4 \cdot 3 = 12$。冲突边：$x_1$ 在子句 $1, 3$ 中取正、在 $2, 4$ 中取负，给出 $2 \cdot 2 = 4$ 条边；$x_2$ 在 $1, 4$ 中取正、在 $2, 3$ 中取负，$4$ 条边；$x_3$ 在 $1, 2$ 中取正、在 $3, 4$ 中取负，$4$ 条边。总计 $12 + 12 = 24$。（赋值 $x_1 = x_2 = x_3 = 1$ 满足该公式：每个子句都含至少一个正文字。所以图有大小为 $4$ 的独立集，例如在子句 $1$–$4$ 中取正文字 $x_1, x_3, x_1, x_2$ 对应的四个顶点。）
:::
:::

::: exercise 从独立集到顶点覆盖 {level=1 check="6"}
一个图有 $10$ 个顶点，其最大独立集有 $4$ 个顶点。它的最小顶点覆盖有多大？（填写数字。）
::: solution
由 [[#thm-clique-vc]] 的证明，$S$ 独立当且仅当 $V \setminus S$ 是顶点覆盖，所以最小顶点覆盖的大小为 $n - \alpha(G) = 10 - 4 = 6$。
:::
:::

::: exercise 子集和的目标 {level=1 check="1111333"}
[[#thm-subset-sum]] 的归约对 $4$ 个变元、$3$ 个子句的公式，目标 $T$ 是什么？实例有多少个数？（填写 $T$。）
::: solution
$T$ 在 $4$ 个变元位各为 $1$，随后 $3$ 个子句位各为 $3$：$T = 1111333$。共有 $2n + 2m = 8 + 6 = 14$ 个数。
:::
:::

::: exercise 划分问题 {#ex-partition level=2}
$\mathit{PARTITION} = \{\langle a_1, \dots, a_k\rangle :$ 可把这些数分成和相等的两组$\}$。用从 $\mathit{SUBSET\text{-}SUM}$ 出发的归约证明它是 $\mathsf{NP}$ 完全的。
::: solution
属于 $\mathsf{NP}$：证书是一组。给定 $\langle a_1, \dots, a_k, T\rangle$，令 $S = \sum a_i$。若 $T > S$，输出一个固定的否实例，如 $\langle 1, 2\rangle$。否则输出 $\langle a_1, \dots, a_k, b, c\rangle$，其中 $b = S + T$、$c = 2S - T$。总和为 $S + (S + T) + (2S - T) = 4S$，所以每组之和必须是 $2S$。由于 $b + c = 3S > 2S$，$b$ 与 $c$ 分属两组。含 $c$ 的那组还需要从 $a_i$ 中凑出 $T$，另一组需要 $2S - (S + T) = S - T$，即其余部分。于是存在划分当且仅当某个 $a_i$ 的子集合之和为 $T$。新数有 $O(\log S)$ 比特：多项式时间。
:::
:::

::: exercise 四种颜色 {level=2}
证明 $\mathit{4COL}$ 是 $\mathsf{NP}$ 完全的。这为何不与四色定理矛盾？
::: solution
由染色证书知属于 $\mathsf{NP}$。把 $\mathit{3COL}$ 归约过来：加一个新顶点 $u$，与 $G$ 的每个顶点都相邻。在 $G + u$ 的一个 4-染色中，$u$ 的颜色不在别处出现，所以 $G$ 只用了三种颜色；反之，$G$ 的 3-染色通过给 $u$ 第四种颜色而扩展。四色定理说每个*平面*图都可 4-染，所以限制在平面图上的 $\mathit{4COL}$ 是平凡的；但 $G + u$ 一般不是平面图，故没有矛盾。（平面图上的 $\mathit{3COL}$ 是 $\mathsf{NP}$ 完全的。）
:::
:::

::: exercise 从顶点覆盖到集合覆盖 {level=2}
$\mathit{SETCOVER} = \{\langle U, S_1, \dots, S_r, k\rangle :$ 某 $k$ 个集合的并为 $U\}$。证明 $\mathit{VC} \le_p \mathit{SETCOVER}$。
::: solution
给定 $\langle G, k\rangle$，其中 $G = (V, E)$；令 $U = E$，且对每个顶点 $v$ 令 $S_v = \{e \in E : v \in e\}$，即 $v$ 处的诸边。集合 $C \subseteq V$ 是顶点覆盖当且仅当每条边都关联于某个 $v \in C$，当且仅当 $\bigcup_{v \in C} S_v = E$。于是 $G$ 有大小不超过 $k$ 的顶点覆盖当且仅当某 $k$ 个集合覆盖 $U$（覆盖偏小就用任意集合补足；若 $k > n$，大小 $\le n$ 的覆盖平凡存在，可把 $k$ 封顶在 $n$）。属于 $\mathsf{NP}$：所选的集合就是证书。
:::
:::

::: exercise 半大小团 {level=3}
设 $\mathit{HALF\text{-}CLIQUE} = \{\langle G\rangle : G$ 含有大小至少 $n/2$ 的团，$n$ 为顶点数$\}$。证明它是 $\mathsf{NP}$ 完全的。
::: solution
属于 $\mathsf{NP}$：证书是那个团。把 $\mathit{CLIQUE}$ 归约过来：给定有 $n$ 个顶点的 $\langle G, k\rangle$（设 $k \le n$）。若 $k = n/2$，输出 $G$。若 $k < n/2$，添加 $n - 2k$ 个新顶点，它们彼此相邻且与 $G$ 的每个顶点相邻：新图有 $2n - 2k$ 个顶点，且有大小为 $n - k$ 的团当且仅当 $G$ 有大小为 $k$ 的团（新图的极大团包含全部新顶点——它们与一切顶点相邻——再加上 $G$ 的一个团）。若 $k > n/2$，添加 $2k - n$ 个孤立顶点：新图有 $2k$ 个顶点，需要大小为 $k$ 的团，而它不能用到孤立顶点（$k \ge 2$ 时），所以必是 $G$ 的一个 $k$-团。每种情形只添加 $O(n)$ 个顶点：多项式时间。这种"填充"技术说明：把参数固定为 $n$ 的函数常常仍使问题保持困难——相比之下，对*常数* $k$ 的 $k$-团属于 $\mathsf{P}$，因为可以枚举一切 $\binom{n}{k} = O(n^k)$ 个集合。
:::
:::

::: exercise 检验无向构造 {level=3}
实现 [[#thm-uhampath]] 的归约 $\mathit{HAMPATH} \le_p \mathit{UHAMPATH}$，在随机小有向图上检验。然后解释为什么需要中间顶点 $v_{\text{mid}}$：给出一个从 $s$ 到 $t$ 没有哈密顿路径的有向图，使它的"两顶点"版本（只有 $v_{\text{in}} - v_{\text{out}}$）却有一条。
::: solution
```python
import random
from itertools import permutations
def directed_to_undirected(V, E, s, t):
    """HAMPATH <=p UHAMPATH: v -> v_in - v_mid - v_out；s 只留 s_out，t 只留 t_in。"""
    nodes = [(s, "out"), (t, "in")] + [(v, p) for v in V if v not in (s, t) for p in ("in", "mid", "out")]
    F = {frozenset(((v, "in"), (v, "mid"))) for v in V if v not in (s, t)}
    F |= {frozenset(((v, "mid"), (v, "out"))) for v in V if v not in (s, t)}
    F |= {frozenset(((u, "out"), (v, "in"))) for u, v in E if u != t and v != s}
    return nodes, F, (s, "out"), (t, "in")

def ham(V, adj, s, t):          # adj(u, v) -> bool；对一切顺序穷举
    mid = [v for v in V if v not in (s, t)]
    return any(all(adj(a, b) for a, b in zip((s,) + p, p + (t,))) for p in permutations(mid))

random.seed(5); wrong = yes = 0
for _ in range(300):
    n = random.randint(3, 5); V = list(range(n))
    E = {(u, v) for u in V for v in V if u != v and random.random() < 0.4}
    d = ham(V, lambda a, b: (a, b) in E, 0, n - 1); yes += d
    N, F, s2, t2 = directed_to_undirected(V, E, 0, n - 1)
    wrong += d != ham(N, lambda a, b: frozenset((a, b)) in F, s2, t2)
print(yes, "of 300 digraphs have a Hamiltonian path; disagreements:", wrong)
```

```console
$ python3 uham.py
41 of 300 digraphs have a Hamiltonian path; disagreements: 0
```

没有中间顶点时，一条无向路径可以在 $v_{\text{in}}$ 处进入构件，随即沿另一条进入 $v_{\text{in}}$ 的边离开，从而倒着走了一条有向边。对四个顶点上的一切有向图穷举，能找到最小的例子：顶点 $s, a, b, t$，边为 $s \to a$、$a \to b$、$b \to a$、$a \to t$。从 $s$ 到 $t$ 没有有向哈密顿路径：$s$ 之后必是 $a$（$s$ 唯一的出边），然后是 $b$，而 $b$ 没有到 $t$ 的边。但在两顶点版本中

$$
s_{\text{out}} - a_{\text{in}} - b_{\text{out}} - b_{\text{in}} - a_{\text{out}} - t_{\text{in}}
$$

是一条无向哈密顿路径：它倒着用 $b \to a$（从 $a_{\text{in}}$ 到 $b_{\text{out}}$），又倒着用 $a \to b$（从 $b_{\text{in}}$ 到 $a_{\text{out}}$）。有了中间顶点这就不可能：$a_{\text{mid}}$ 的度为 $2$，任何哈密顿路径都必须连续经过 $a_{\text{in}} - a_{\text{mid}} - a_{\text{out}}$。一般的教训正是 [[#thm-hampath]] 第 2 步的那一条：度为 $2$ 的顶点在任何哈密顿路径上都把自己的两个邻居钉死。
:::
:::
