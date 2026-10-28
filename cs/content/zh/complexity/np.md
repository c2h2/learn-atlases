来看一个谜题。一辆送货车要沿一张给定地图上的道路行驶，恰好各访问一次 30 家店铺。这样的路线存在吗？没有人知道有什么方法能比试遍天文数字般的访问次序有实质性的改进；而对一张刻意画出的地图，这场搜索耗时可能比任何计算机能运行的时间都长。然而，倘若同事递给你一条路线，你一分钟就能检验它：是否恰好把每家店铺各列了一次，且每一对相邻店铺之间是否都有道路相连？

许多问题都是这个形状：**解可能难找，却易检验**。分解一个数、用三种颜色给地图着色、把箱子装进货车、给考试排考场、找一条长度有界的定理证明——每一例中，候选答案都能被迅速验证。本章把这一观察变成一个定义——类 $\mathsf{NP}$——证明它与非确定机器上的多项式时间一致，并陈述全课程处于正中央的问题：凡解能被迅速检验的问题，其解是否也能被*迅速找到*？也就是说，$\mathsf{P} = \mathsf{NP}$ 吗？

## 验证器与证书

::: definition 验证器 {#def-verifier}
语言 $L$ 的一个**验证器**是一个确定算法 $V$，它在所有输入上停机，且满足

$$
L = \{w : \text{存在串 } c \text{ 使 } V \text{ 接受 } \langle w, c\rangle\}.
$$ {#eq-verifier}

若串 $c$ 使 $V$ 接受 $\langle w, c\rangle$，则称 $c$ 为 $w$ 的一个**证书**（或**见证**）。若 $V$ 的运行时间关于 $\lvert w\rvert$——仅关于 $w$ 的长度——是多项式的，则称 $V$ 为**多项式时间验证器**。
:::

[[#eq-verifier]] 中藏着两个条件。**完全性**：每个 $w \in L$ 都至少有一个证书。**可靠性**：没有 $w \notin L$ 拥有证书——无论证书选得多么巧妙都不行，验证器不能受骗。由于多项式时间验证器至多能读入其输入的多项式多个符号，我们不妨设证书的长度至多为 $p(\lvert w\rvert)$，$p$ 为某个多项式；更长的证书永远用不上。

::: definition 类 NP {#def-np}
$\mathsf{NP}$ 是拥有多项式时间验证器的语言之类。
:::

这个名字是**非确定多项式时间**的缩写，理由见 [[#sec-ntm]]——而不是"非多项式"。下面这些例子将伴随我们走完全程。

- $\mathit{HAMPATH} = \{\langle G, s, t\rangle : G$ 是有从 $s$ 到 $t$ 的**哈密顿路径**的有向图$\}$，即恰好经过每个顶点一次的路径。证书：顶点序列。
- $\mathit{CLIQUE} = \{\langle G, k\rangle : G$ 是含有 $k$-**团**的无向图$\}$，即两两相邻的 $k$ 个顶点的集合。证书：这 $k$ 个顶点。
- $\mathit{SUBSET\text{-}SUM} = \{\langle a_1, \dots, a_m, T\rangle :$ 某个 $a_i$ 的子集之和为 $T\}$，数以二进制给出。证书：所选各数的下标。
- $\mathit{COMPOSITES} = \{\langle N\rangle : N = pq \text{ 对某两个整数 } p, q \ge 2\}$，$N$ 以二进制给出。证书：一个因子 $p$。
- $\mathit{SAT} = \{\langle\varphi\rangle : \varphi$ 是可满足的布尔公式$\}$。证书：一个满足赋值。

::: example CLIQUE 与 HAMPATH 的验证器 {#ex-verifiers}
为 $\mathit{CLIQUE}$ 与 $\mathit{HAMPATH}$ 写出多项式时间验证器，并在顶点为 $1, \dots, 6$、边为 $12, 13, 23, 24, 34, 45, 46, 56$ 的图上运行它们。
::: solution
```python
from itertools import combinations

def verify_clique(edges, k, cert):
    """当且仅当 cert 是一组两两相邻的 k 个顶点时接受。"""
    E = {frozenset(e) for e in edges}
    return (len(set(cert)) == k and
            all(frozenset((u, v)) in E for u, v in combinations(cert, 2)))

def verify_hampath(vertices, edges, s, t, cert, directed=False):
    """当且仅当 cert 把每个顶点恰好列一次、沿边从 s 走到 t 时接受。"""
    E = set(map(tuple, edges)) | (set() if directed else {(v, u) for u, v in edges})
    return (sorted(cert) == sorted(vertices) and cert[0] == s and cert[-1] == t
            and all((cert[i], cert[i + 1]) in E for i in range(len(cert) - 1)))

V = [1, 2, 3, 4, 5, 6]
E = [(1, 2), (1, 3), (2, 3), (2, 4), (3, 4), (4, 5), (4, 6), (5, 6)]
print(verify_clique(E, 3, [2, 3, 4]), verify_clique(E, 4, [1, 2, 3, 4]))
print(verify_hampath(V, E, 1, 6, [1, 3, 2, 4, 5, 6]),
      verify_hampath(V, E, 1, 6, [1, 2, 3, 4, 6, 5]))
```

```console
$ python3 verify.py
True False
True False
```

$\{2, 3, 4\}$ 是一个三角形，故 $\langle G, 3\rangle \in \mathit{CLIQUE}$。证书 $\{1, 2, 3, 4\}$ 被拒绝，因为 $1$ 与 $4$ 不相邻——这不表明 $G$ 没有 $4$ 团，只表明这个证书是坏的（事实上 $G$ 确实没有）。路线 $1, 3, 2, 4, 5, 6$ 是从 $1$ 到 $6$ 的一条哈密顿路径；第二个候选失败，因为它终止于 $5$。每个验证器在 $O(m)$ 时间内建成边集之后，作 $O(k^2)$ 或 $O(n)$ 次集合查找——关于输入长度是多项式的。
:::
:::

注意验证器*不*做什么：它们从不开搜。问题的全部难度都被移进了证书，而证书是直接递到验证器手上的。

::: widget graph
nodes: 1@0,1; 2@1,2; 3@1,0; 4@2,1; 5@3,2; 6@3,0
edges: 1-2; 1-3; 2-3; 2-4; 3-4; 4-5; 4-6; 5-6
algorithm: dfs
start: 1
caption: [[#ex-verifiers]] 中的图。拖动顶点，找出三角形 $\{2,3,4\}$ 与哈密顿路径 $1, 3, 2, 4, 5, 6$。一步步演示从 $1$ 出发的深度优先搜索：它以线性时间访问每个顶点，但 DFS 树一般不是哈密顿路径——而寻找哈密顿路径的搜索，据任何人所知，最坏情况要考虑指数多个次序。
:::

## 非确定时间 {#sec-ntm}

$\mathsf{NP}$ 的原始定义使用非确定图灵机（[[theory-of-computation/turing-machines#thm-ntm]]）。

::: definition 非确定时间 {#def-ntime}
若非确定图灵机在长度 $n$ 的每个输入上，其计算的每条分支都在 $t(n)$ 步内停机，则称它是 **$t(n)$ 时间判定器**。$\mathsf{NTIME}(t(n))$ 是由 $O(t(n))$ 时间的非确定多带图灵机判定的语言之类。
:::

只要*某条*分支接受，机器就接受。不妨想象它会走运地猜测：凡有选择时，只要诸种走法中有能通往接受的，它就取那种。判定 $\mathit{CLIQUE}$ 的非确定机器"猜"出 $k$ 个顶点，然后检验它们。这种猜测–检验模式恰是验证器，两个定义是一致的。

::: theorem 验证器与非确定性 {#thm-np-ntm}
$$
\mathsf{NP} = \bigcup_{k \ge 0} \mathsf{NTIME}(n^k).
$$
:::

::: proof
*验证器 $\Rightarrow$ 机器。*设 $V$ 以 $n^k$ 时间验证 $L$（对 $n \ge 2$；常数无关紧要）。则长度超过 $n^k$ 的证书从不会被读完，故不妨只考虑长度至多 $n^k$ 的证书。造一台非确定机器 $N$：在长度为 $n$ 的输入 $w$ 上，非确定地写出一个长度至多 $n^k$ 的串 $c$（每步选一个符号，或者停笔），然后在 $\langle w, c\rangle$ 上运行 $V$，当且仅当 $V$ 接受时接受。每条分支都在写串的 $O(n^k)$ 步加上 $V$ 的 $O(n^k)$ 步内停机。某条分支接受，当且仅当某个证书有效，当且仅当 $w \in L$。

*机器 $\Rightarrow$ 验证器。*设 $N$ 以非确定时间 $n^k$ 判定 $L$，每步至多 $b$ 种走法。$N$ 在 $w$ 上的一条分支由它的选择序列决定：$\{1, \dots, b\}$ 上长度至多 $n^k$ 的一个串。定义 $V$：在输入 $\langle w, c\rangle$ 上模拟 $N$ 于 $w$，用 $c$ 的第 $i$ 个符号决定第 $i$ 次选择；若 $c$ 指出一个不存在的走法或已经用尽，则拒绝；当且仅当这条分支接受时接受。$V$ 是确定的，运行时间为 $O(n^k)$。若 $w \in L$，某条接受分支的选择序列就是证书；若 $w \notin L$，没有分支接受，于是没有 $c$ 能使 $V$ 接受。
:::

两种观点都有用。要证明一个问题属于 $\mathsf{NP}$，验证器观点通常更容易，它也解释了 $\mathsf{NP}$ "真正"说的是什么：存在简短、可有效检验的从属证明。机器观点则把 $\mathsf{NP}$ 与其他由机器定义的复杂性类联系起来，例如 [[complexity/space-complexity]] 中的 $\mathsf{NL}$。

::: example 数一数 CLIQUE 的猜测 {#ex-clique-branches}
对 $\langle G, 3\rangle$，其中 $G$ 是 [[#ex-verifiers]] 中的图：候选证书（$3$ 个顶点的集合）有多少个？多少个会被接受？一台非确定机器需要多少条分支才能成功？
::: solution
三元集合共有 $\binom{6}{3} = 20$ 个。被接受的是 $G$ 的三角形：$\{1, 2, 3\}$、$\{2, 3, 4\}$ 与 $\{4, 5, 6\}$——二十之中得三。非确定机器只需要一条接受分支；确定搜索在最坏情况要把 $\binom{n}{k}$ 个集合全部试一遍，$k = n/2$ 时约为 $2^n/\sqrt{n}$。
:::
:::

## P、NP 与指数时间

::: definition 指数时间 {#def-exp}
$$
\mathsf{EXP} = \bigcup_{k \ge 0} \mathsf{TIME}\bigl(2^{n^k}\bigr).
$$
:::

::: theorem P ⊆ NP ⊆ EXP {#thm-p-np-exp}
$\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{EXP}$。
:::

::: proof
若 $L \in \mathsf{P}$，$L$ 的多项式时间判定器就是一个无视其证书的验证器（取 $c = \varepsilon$）。若 $L \in \mathsf{NP}$，验证器 $V$ 在字母表 $\Sigma$ 上以 $p(n)$ 时间运行，则对长度至多 $p(n)$ 的每个串 $c$，在 $\langle w, c\rangle$ 上运行 $V$，由此判定 $L$。这样的串至多有 $(\lvert\Sigma\rvert + 1)^{p(n)} = 2^{O(p(n))}$ 个，每次运行耗 $p(n)$ 步，故对合适的 $k$ 与充分大的 $n$，总时间为 $2^{O(p(n))} \cdot p(n) \le 2^{n^k}$。
:::

我们知道 $\mathsf{P} \ne \mathsf{EXP}$（时间层次定理，[[complexity/hierarchies]]），所以两个包含关系中至少有一个是真包含。是哪一个——还是两个都是——不得而知。多数研究者认为两个都是。

::: quiz
哪些论断可由定义与 [[#thm-p-np-exp]] 推出？
- [x] 每个属于 $\mathsf{P}$ 的问题都属于 $\mathsf{NP}$。
- [ ] 每个属于 $\mathsf{NP}$ 的问题都需要指数时间。
- [x] 每个属于 $\mathsf{NP}$ 的问题都可用指数时间判定。
- [ ] 若一个问题的候选"否"答案能被迅速检验，它就属于 $\mathsf{NP}$。
::: solution
$\mathsf{P} \subseteq \mathsf{NP}$ 与 $\mathsf{NP} \subseteq \mathsf{EXP}$ 已于上面证明。"需要指数时间"这一说法，对 $\mathsf{NP}$ 中的任何问题都无人能够证实——那将蕴涵 $\mathsf{P} \ne \mathsf{NP}$——而对属于 $\mathsf{P}$ 的问题它是假的。$\mathsf{NP}$ 要求的是*从属*（"是"答案）的证书；"否"答案的短证书定义了下文的 $\mathsf{coNP}$。
:::
:::

## 搜索与判定

$\mathsf{NP}$ 是是/否问题之类，但实践中我们想要的是那个团、那条路线或那个赋值，而不只是一个"是"。在我们关心的一切问题上，两个版本难度相当，至多差一个多项式因子。

::: theorem SAT 的搜索可归约到判定 {#thm-self-reduction}
若 $\mathit{SAT} \in \mathsf{P}$，则存在一个多项式时间算法：给定可满足的公式 $\varphi$，输出一个满足赋值。
:::

::: proof
设 $D$ 以多项式时间判定 $\mathit{SAT}$，$\varphi$ 的变元为 $x_1, \dots, x_n$。对 $i = 1, \dots, n$：令 $\varphi_1$ 为把 $\varphi$ 中 $x_i$ 换成 $\mathsf{true}$（并化简）所得的公式。若 $D$ 接受 $\varphi_1$，置 $x_i \gets \mathsf{true}$ 且 $\varphi \gets \varphi_1$；否则置 $x_i \gets \mathsf{false}$，并把 $\varphi$ 中的 $x_i$ 换成 $\mathsf{false}$。

*不变式：*第 $i$ 步之后，当前公式可满足。初始时成立。若 $\varphi$ 可满足，某个满足赋值给 $x_i$ 某个值 $v$；若 $v = \mathsf{true}$，则 $\varphi_1$ 可满足，我们取它；若 $\varphi_1$ 不可满足，则每个满足赋值都有 $v = \mathsf{false}$，另一分支可满足。第 $n$ 步后公式已无变元且可满足，故它为真，而所选的各值满足原来的 $\varphi$。算法在长不超过 $\varphi$ 的公式上调用 $D$ 共 $n$ 次，外加替换的多项式工作量：多项式时间。
:::

这一性质称为**自归约性**。我们将遇到的每个 $\mathsf{NP}$ 完全问题都具有它；在 [[complexity/np-completeness]] 中还会看到，$\mathit{SAT}$ 的一个多项式时间算法将给出 $\mathsf{NP}$ 中一切问题的多项式时间*搜索*算法。

::: example 一次固定一个变元 {#ex-self-reduction}
把 [[#thm-self-reduction]] 的步骤施于 $\varphi = (x_1 \lor x_2) \land (\lnot x_1 \lor x_3) \land (\lnot x_2 \lor \lnot x_3)$，用穷举充当"判定器"。
::: solution
置 $x_1 = \mathsf{true}$ 剩下 $x_3 \land (\lnot x_2 \lor \lnot x_3)$，它可满足（$x_2 = \mathsf{false}$，$x_3 = \mathsf{true}$）：保留 $x_1 = \mathsf{true}$。置 $x_2 = \mathsf{true}$ 剩下 $x_3 \land \lnot x_3$，不可满足：于是 $x_2 = \mathsf{false}$，剩下 $x_3$。置 $x_3 = \mathsf{true}$ 剩下空合取式，为真：保留。输出 $(x_1, x_2, x_3) = (\mathsf{true}, \mathsf{false}, \mathsf{true})$，确实三个子句都成立。用代码写（子句表示为带符号变元号的表）：

```python
from itertools import product

def satisfiable(clauses, n):
    """穷举 SAT 检验（充当假想中的快判定器）。"""
    return any(all(any((lit > 0) == a[abs(lit) - 1] for lit in c) for c in clauses)
               for a in product([False, True], repeat=n))

def restrict(clauses, var, value):
    """把变元 var 置为 value：删去已满足的子句，删去为假的文字。"""
    out = []
    for c in clauses:
        if (var if value else -var) in c:
            continue                      # 子句已满足
        out.append([lit for lit in c if abs(lit) != var])
    return out

def find_assignment(clauses, n):
    if not satisfiable(clauses, n):
        return None
    assignment = []
    for v in range(1, n + 1):
        trial = restrict(clauses, v, True)
        value = satisfiable(trial, n)     # 每个变元一次判定询问
        clauses = trial if value else restrict(clauses, v, False)
        assignment.append(value)
    return assignment

phi = [[1, 2], [-1, 3], [-2, -3]]         # (x1 v x2)(~x1 v x3)(~x2 v ~x3)
print(find_assignment(phi, 3))
```

```console
$ python3 selfred.py
[True, False, True]
```

空子句 `[]`（其各文字皆被置假）是不可满足的，因为 `any([])` 为假。
:::
:::

## coNP

$\mathsf{NP}$ 是不对称的。可满足的公式有一个可满足性的短证明，但一个公式*不可*满足的短证明是什么？列出全部 $2^n$ 个赋值算不上短。

::: definition coNP {#def-conp}
$\mathsf{coNP} = \{L : \overline{L} \in \mathsf{NP}\}$。等价地，$L \in \mathsf{coNP}$ 当且仅当存在多项式 $p$ 与多项式时间算法 $V$，使得 $w \in L$ 当且仅当对长度至多 $p(\lvert w\rvert)$ 的**每个** $c$，$V$ 都接受 $\langle w, c\rangle$。
:::

（严格地说，$\overline{L}$ 还包括根本不构成公式编码的串；这类串可在多项式时间内识别，我们略去不谈。）例子：$\mathit{UNSAT}$，不可满足的公式；$\mathit{TAUT}$，在每个赋值下都为真的公式；$\mathit{PRIMES}$，因为其补集是 $\mathit{COMPOSITES}$。每一例中"否"答案都有短证书——一个满足赋值、一个使公式为假的赋值、一个因子。

::: theorem coNP 的基本事实 {#thm-conp}
1. $\mathsf{P} \subseteq \mathsf{NP} \cap \mathsf{coNP}$。
2. 若 $\mathsf{P} = \mathsf{NP}$，则 $\mathsf{NP} = \mathsf{coNP}$。
3. 等价地：若 $\mathsf{NP} \ne \mathsf{coNP}$，则 $\mathsf{P} \ne \mathsf{NP}$。
:::

::: proof
(1) $\mathsf{P}$ 对补封闭（交换接受与拒绝状态），故 $L \in \mathsf{P}$ 给出 $\overline{L} \in \mathsf{P} \subseteq \mathsf{NP}$，即 $L \in \mathsf{coNP}$；且由 [[#thm-p-np-exp]] 有 $L \in \mathsf{NP}$。(2) 若 $\mathsf{P} = \mathsf{NP}$，则 $L \in \mathsf{NP} \Rightarrow L \in \mathsf{P} \Rightarrow \overline{L} \in \mathsf{P} = \mathsf{NP} \Rightarrow L \in \mathsf{coNP}$，对称地 $\mathsf{coNP} \subseteq \mathsf{NP}$。(3) 即 (2) 的逆否命题。
:::

(2) 的逆命题无人知晓：即使 $\mathsf{P} \ne \mathsf{NP}$，$\mathsf{NP} = \mathsf{coNP}$ 也可能成立。人们普遍相信 $\mathsf{NP} \ne \mathsf{coNP}$；那将意味着某些真命题——例如"这个公式是重言式"——在*任何*可有效检验的证明系统中都没有短证明——这是在证明复杂性中研究的问题。

### 属于 NP ∩ coNP 的问题

属于 $\mathsf{NP} \cap \mathsf{coNP}$ 的问题对两种答案都有短证书。杰克·埃德蒙兹称这样的问题有**好的刻画**；历史上许多情形是先有好的刻画、后有多项式时间算法：线性规划（对偶性给出两种证书），以及素性。

::: theorem 素性有短证书 {#thm-pratt}
$\mathit{PRIMES} \in \mathsf{NP} \cap \mathsf{coNP}$。
:::

::: proof
$\mathit{PRIMES} \in \mathsf{coNP}$，因为合数的一个因子就是证书。为证 $\mathit{PRIMES} \in \mathsf{NP}$，我们引用数论中的一个事实：整数 $p \ge 3$ 是素数，当且仅当存在 $g$ 使得 $g^{p-1} \equiv 1 \pmod p$，且对每个整除 $p - 1$ 的素数 $q$ 有 $g^{(p-1)/q} \not\equiv 1 \pmod p$。

*事实为何成立。*两个条件恰是说 $g$ 在模 $p$ 单位乘法群中的阶为 $p - 1$：由第一个条件，阶整除 $p - 1$；由第二个条件，阶不是 $p - 1$ 的真因子（$p - 1$ 的任何真因子都整除某个 $(p-1)/q$，$q$ 为素数）。若 $p$ 是素数，则存在阶为 $p - 1$ 的**原根**（[Maths Atlas：数论](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)）。反之，若 $g$ 的阶为 $p - 1$，则 $1, g, \dots, g^{p-2}$ 是模 $p$ 的 $p - 1$ 个互异单位，于是 $1, \dots, p - 1$ 中每一个都与 $p$ 互素，$p$ 是素数。

对 $p$ 的*证书*（普拉特（Pratt），1975）是：$g$；素因数分解 $p - 1 = q_1^{e_1} \cdots q_r^{e_r}$；以及对每个奇素数 $q_i$ 递归给出的证书（$q = 2$ 时什么也不要）。验证器检验该分解乘出来等于 $p - 1$，用快速模幂检验 $g$ 的条件（每次检验只需 $O(\log p)$ 次模 $p$ 乘法），并检验各子证书。

*规模。*设 $N(p)$ 为证书树中出现的素数的个数，规定 $N(2) = 1$，且对 $p - 1$ 的各奇素因子 $q_i$ 有 $N(p) \le 2 + \sum_i N(q_i)$。对奇素数 $p$ 用归纳法证明 $N(p) \le 3\log_2 p - 1$。若 $p - 1$ 是 $2$ 的方幂，则 $N(p) = 2 \le 3\log_2 3 - 1$。否则 $p - 1 = 2^{a}\prod q_i^{e_i}$，其中 $a \ge 1$ 且至少有一个奇 $q_i$，于是 $\prod_i q_i \le (p-1)/2$，故

$$
N(p) \le 2 + \sum_i (3\log_2 q_i - 1) \le 2 + 3\log_2\tfrac{p-1}{2} - 1 < 3\log_2 p - 2.
$$

每个结点带有 $O(\log p)$ 个 $O(\log p)$ 位的数（素因子至多 $\log_2 p$ 个），而一个结点上的检验耗关于 $\log p$ 的多项式时间。于是整个证书的长度关于输入长度 $\log p$ 是多项式的，并可在多项式时间内验证。
:::

::: example 97 是素数的一个证书 {#ex-pratt}
写出并检验 97 的一个普拉特证书。
::: solution
$96 = 2^5 \cdot 3$，取 $g = 5$ 可行：模 $97$ 下 $5^{96} \equiv 1$，$5^{96/2} = 5^{48} \equiv 96 \equiv -1$，$5^{96/3} = 5^{32} \equiv 35$，后两者皆不为 $1$。（Python：`pow(5, 48, 97)` 给出 `96`，`pow(5, 32, 97)` 给出 `35`。）对因子 $3$：$3 - 1 = 2$，取 $g = 2$，有 $2^2 = 4 \equiv 1$ 而 $2^1 = 2 \not\equiv 1 \pmod 3$。素数 $2$ 什么也不需要。证书树有结点 $97, 2, 3, 2$：四个素数，远在界 $3\log_2 97 - 1 \approx 18.8$ 之内。
:::
:::

2002 年以来我们知道得更多：$\mathit{PRIMES} \in \mathsf{P}$（阿格拉瓦尔–卡亚尔–萨克塞纳（Agrawal–Kayal–Saxena））。截至 2026 年，**分解**的判定版本——给定 $N$ 与 $k$，$N$ 是否有不超过 $k$ 的素因子？——属于 $\mathsf{NP} \cap \mathsf{coNP}$（[[#ex-factor-np-conp]]），但无人知道它属于 $\mathsf{P}$。这是人们不指望分解是 $\mathsf{NP}$ 完全的原因之一：一个属于 $\mathsf{coNP}$ 的 $\mathsf{NP}$ 完全问题将迫使 $\mathsf{NP} = \mathsf{coNP}$。

::: widget venn
sets: 2
expr: A & B
labels: NP; coNP
caption: 人们相信的图景。交集 $\mathsf{NP} \cap \mathsf{coNP}$（阴影部分）包含 $\mathsf{P}$，也包含像分解（判定版本）这样无人知道属于 $\mathsf{P}$ 的问题。$\mathit{SAT}$ 位于 $\mathsf{NP}$ 中交集之外的部分，$\mathit{TAUT}$ 位于 $\mathsf{coNP}$ 中交集之外的部分——除非 $\mathsf{NP} = \mathsf{coNP}$，那时两个圆重合。试取表达式 `A | B` 表示 $\mathsf{NP} \cup \mathsf{coNP}$，取 `A - B` 表示那些能见证 $\mathsf{NP} \ne \mathsf{coNP}$ 的问题。
:::

::: quiz
下列语言中哪些已知属于 $\mathsf{coNP}$？
- [x] $\mathit{TAUT}$，在每个赋值下都为真的布尔公式。
- [x] $\mathit{PATH}$（有向图中的可达性）。
- [x] $\{\langle G, k\rangle : G \text{ 不含 } k \text{ 团}\}$。
- [ ] $\mathit{HAMPATH}$。
::: solution
$\mathit{TAUT}$：一个使公式为假的赋值证明不属于。$\mathit{PATH} \in \mathsf{P} \subseteq \mathsf{coNP}$。"无 $k$ 团"是 $\mathit{CLIQUE} \in \mathsf{NP}$ 的补集，故按定义属于 $\mathsf{coNP}$。$\mathit{HAMPATH}$ 属于 $\mathsf{NP}$；它属于 $\mathsf{coNP}$ 仅当 $\mathsf{NP} = \mathsf{coNP}$，因为它是 $\mathsf{NP}$ 完全的（[[complexity/np-complete-problems]] 及 [[#ex-factor-np-conp]] 的论证）。
:::
:::

有一个把这两个类读作证明系统的有用方式。若证明者发一条短信就能使多项式时间检验者相信 $w \in L$，则该语言属于 $\mathsf{NP}$；若证明者能对 $w \notin L$ 做到同样的事，则它属于 $\mathsf{coNP}$。属于 $\mathsf{P}$ 则根本不需要证明者。下面几章的核心问题——$\mathsf{P} = \mathsf{NP}$ 吗？$\mathsf{NP} = \mathsf{coNP}$ 吗？——问的都是证明者的帮助究竟有没有实质作用。后面还有让证明者与检验者互动、抛硬币、或只读证明的几个比特的章节；[[complexity/approximation-pcp]] 表明，最后这一条出人意料地导致对近似算法的强限制。

## P 对 NP 问题

$$
\mathsf{P} \overset{?}{=} \mathsf{NP}
$$

若 $\mathsf{P} = \mathsf{NP}$，则凡解可有效检验的问题都可有效求解，而且——由自归约性——解也能被*找到*，同样有效。凡有简洁证书的调度、路径、装箱与蛋白质折叠模型都将变得易处理；今天依赖 $\mathsf{NP}$ 问题平均情形困难的大部分公钥密码，原则上都会被攻破；凡是具有合理长度证明的定理，其证明都能以几乎与检验同样快的速度找到。若 $\mathsf{P} \ne \mathsf{NP}$，则对某些问题穷举搜索在所难免——其含义是不存在能在多项式时间内解其全部实例的算法。

截至 2026 年，这一问题仍是**悬案**。它是克雷数学研究所（Clay Mathematics Institute）2000 年公布的七大千禧年大奖难题之一，每题奖金一百万美元。多数研究者相信 $\mathsf{P} \ne \mathsf{NP}$，其理由并非证明：数十年间，为成千上万个 $\mathsf{NP}$ 完全问题寻找有效算法的尝试悉数失败——其中任何一个成功就足够了（[[complexity/np-completeness]]）；密码学的成功；还有与数学的类比——在数学中，检验一个证明比找到一个证明容易得多。[[complexity/hierarchies]] 解释了为什么标准的证明技术无法解决这一问题。

::: warning NP 并不意味着"非多项式"
$\mathsf{NP}$ 是*非确定*多项式时间，它包含 $\mathsf{P}$：排序、最短路以及一切其他多项式时间问题都在 $\mathsf{NP}$ 中。说"这个问题是 NP 的，所以需要指数时间"错了两次：属于 $\mathsf{NP}$ 是难度的一个*上*界（解能被迅速检验），而且没有任何一个 $\mathsf{NP}$ 中的问题被证明需要超过多项式的时间。人们通常真正想说的是"这个问题是 $\mathsf{NP}$ 难的，所以为它找到多项式时间算法就将证明 $\mathsf{P} = \mathsf{NP}$"——见 [[complexity/np-completeness]]。另请注意 $\mathsf{NP}$ 由*判定性*问题构成；"旅行商问题在 NP 中"指的是它的是/否版本（"是否存在长度不超过 $B$ 的巡回路线？"）。
:::

::: history
在 1956 年 3 月 20 日的一封信中，哥德尔（Gödel）问冯·诺依曼（von Neumann）：判定一个公式是否有长度为 $n$ 的证明，机器需要走多少步——是 $n$ 的线性或平方级，还是必然是指数级——并指出肯定的回答将有"极其重大的后果"；这封信在 1980 年代末被重新发现。杰克·埃德蒙兹（1965）把有"好的刻画"（用现代语言说是 $\mathsf{NP} \cap \mathsf{coNP}$）的问题与有好算法的问题区分开来。类 $\mathsf{NP}$ 与 $\mathsf{P}$ 对 $\mathsf{NP}$ 问题由史蒂芬·库克（Stephen Cook）在 "The complexity of theorem-proving procedures"（1971）中提出，苏联的列昂尼德·列文（Leonid Levin）也独立地提出了它们（1973 年发表）；$\mathsf{NP}$ 这个名称在理查德·卡普（Richard Karp）1972 年的论文之后成为标准。沃恩·普拉特在 "Every prime has a succinct certificate"（*SIAM Journal on Computing*，1975）中发表了他的素数短证书。克雷数学研究所 2000 年将 $\mathsf{P}$ 对 $\mathsf{NP}$ 列入其千禧年大奖难题。
:::

## 后续内容

要论证某个特定问题不太可能属于 $\mathsf{P}$，我们需要比较问题的办法。[[complexity/np-completeness]] 引入多项式时间归约，并证明库克–列文（Cook–Levin）定理：$\mathit{SAT}$ 与 $\mathsf{NP}$ 中的每个问题一样难。[[complexity/np-complete-problems]] 表明 $\mathit{CLIQUE}$、$\mathit{HAMPATH}$、$\mathit{SUBSET\text{-}SUM}$ 以及许多其他问题同样难。量词将在 [[complexity/hierarchies]] 中重现：$\mathsf{NP}$ 由一个关于证书的"存在"定义，$\mathsf{coNP}$ 由一个"任意"定义，二者交替便得到多项式层次。

::: summary
- **验证器**对某个证书 $c$ 接受 $\langle w, c\rangle$ 当且仅当 $w \in L$（[[#def-verifier]]）；$\mathsf{NP}$ 是有多项式时间验证器的语言之类（[[#def-np]]）。于是证书具有多项式长度。
- $\mathsf{NP} = \bigcup_k \mathsf{NTIME}(n^k)$：猜一个证书再检验它，与非确定多项式时间是一回事（[[#thm-np-ntm]]）。
- $\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{EXP}$（[[#thm-p-np-exp]]）；对证书穷举耗指数时间。
- 对 $\mathit{SAT}$，求解除非 $n$ 次可满足性判定询问便可化归为判定问题（**自归约性**，[[#thm-self-reduction]]）。
- $\mathsf{coNP}$ 对"否"答案有短证书（[[#def-conp]]）；$\mathsf{P} \subseteq \mathsf{NP} \cap \mathsf{coNP}$，且 $\mathsf{P} = \mathsf{NP}$ 将蕴涵 $\mathsf{NP} = \mathsf{coNP}$（[[#thm-conp]]）。由普拉特证书，$\mathit{PRIMES}$ 属于 $\mathsf{NP} \cap \mathsf{coNP}$（[[#thm-pratt]]），而且事实上属于 $\mathsf{P}$。
- $\mathsf{P} = \mathsf{NP}$ 与否截至 2026 年悬而未决；人们普遍相信 $\mathsf{P} \ne \mathsf{NP}$ 且 $\mathsf{NP} \ne \mathsf{coNP}$。
:::

## 习题

::: exercise 哪些证书是短的？ {level=1}
对每门语言，给出一个短证书与一项多项式时间检验，或说明显而易见的证书为何不短：(a) $\{\langle G\rangle : G$ 是 $3$-可着色的$\}$；(b) $\{\langle G\rangle : G$ *不是* $3$-可着色的$\}$；(c) $\{\langle G, k\rangle : G$ 有大小不超过 $k$ 的顶点覆盖$\}$；(d) $\{\langle a_1, \dots, a_m\rangle :$ 各 $a_i$ 可分成和相等的两组$\}$。
::: solution
(a) 一种着色 $c\colon V \to \{1, 2, 3\}$；对每条边检验 $c(u) \ne c(v)$：$O(m)$。属于 $\mathsf{NP}$。
(b) 显而易见的证书——"$3^n$ 种着色全都失败"——长度为指数。该问题属于 $\mathsf{coNP}$；无人知道（也不被认为）它属于 $\mathsf{NP}$。
(c) 一个至多含 $k$ 个顶点的集合 $C$；检验每条边都有端点在 $C$ 中。属于 $\mathsf{NP}$。
(d) 第一组各数的下标集；把两组的和各加出来比较。属于 $\mathsf{NP}$（$\mathit{PARTITION}$；它是 $\mathsf{NP}$ 完全的）。
:::
:::

::: exercise 数候选证书 {level=1 check="20"}
对 $\mathit{CLIQUE}$ 的一个穷举算法，在有 $6$ 个顶点、$k = 3$ 的图上尝试每个 $3$ 顶点集合时，要检验多少个候选证书？（输入该数。）
::: solution
$\binom{6}{3} = \frac{6 \cdot 5 \cdot 4}{3!} = 20$。（对 [[#ex-clique-branches]] 中的图，其中 $3$ 个是三角形。）
:::
:::

::: exercise 检验一条路线 {level=1}
在边为 $s \to a$、$s \to b$、$a \to b$、$b \to a$、$a \to t$、$b \to t$ 的有向图中，序列 $s, a, b, t$；$s, b, a, t$；$s, a, t$；$s, b, t, a$ 中哪些是从 $s$ 到 $t$ 的哈密顿路径？
::: solution
$s, a, b, t$：边 $s \to a$、$a \to b$、$b \to t$ 都存在，四个顶点各经过一次，终止于 $t$——是。$s, b, a, t$：$s \to b$、$b \to a$、$a \to t$——是。$s, a, t$ 漏掉了 $b$——否。$s, b, t, a$ 不终止于 $t$，还用到了不存在的 $t \to a$——否。
:::
:::

::: exercise NP 的封闭性 {level=2}
证明 $\mathsf{NP}$ 对并、交、连接与 Kleene 星封闭。同样的办法为什么不能证明 $\mathsf{NP}$ 对补封闭？
::: solution
设 $V_1$、$V_2$ 分别是 $L_1$、$L_2$ 的多项式时间验证器。*并：*证书是一对 $(i, c)$，$i \in \{1, 2\}$；当且仅当 $V_i$ 接受 $\langle w, c\rangle$ 时接受。*交：*证书 $(c_1, c_2)$；二者都接受才接受。*连接：*证书 $(j, c_1, c_2)$；当且仅当 $V_1$ 接受 $\langle w_1\cdots w_j, c_1\rangle$ 且 $V_2$ 接受 $\langle w_{j+1}\cdots w_n, c_2\rangle$ 时接受。*星：*证书是分点 $0 = j_0 < j_1 < \dots < j_r = n$ 与各段的证书 $c_1, \dots, c_r$（$\varepsilon$ 直接接受）；由于 $r \le n$，证书长度为多项式，检验也耗多项式时间。每个验证器之所以可靠，是因为只有各部分确有货真价实的证书时它才接受。对补，我们将需要一个断言 $w$ 在 $L_1$ 中*没有*证书的证书；把 $V_1$ 的"接受"与"拒绝"对调，得到的验证器只要*某个* $c$ 被 $V_1$ 拒绝它就接受 $\langle w, c\rangle$，那是另一门（通常平凡的）语言。
:::
:::

::: exercise 模 23 的一个原根 {level=2 check="5"}
求对 $p = 23$ 满足 [[#thm-pratt]] 各条件的最小 $g \ge 2$，并完成 23 的一个普拉特证书。（输入 $g$。）
::: solution
$22 = 2 \cdot 11$，故 $g$ 须在模 $23$ 下满足 $g^{11} \not\equiv 1$ 且 $g^{2} \not\equiv 1$。$g = 2$：$2^{11} = 2048 = 89 \cdot 23 + 1 \equiv 1$，失败。$g = 3$：$3^{11} \equiv 1$（模 $23$ 下 $3$ 是二次剩余，因为 $7^2 = 49 \equiv 3$），失败。$g = 4 = 2^2$：是平方，失败。$g = 5$：$5^{11} \equiv 22 \equiv -1$，且 $5^2 = 25 \equiv 2$，故 $g = 5$ 可行。对 $11$：$10 = 2 \cdot 5$，取 $g = 2$ 可行（$2^5 = 32 \equiv 10$，$2^2 = 4$）。对 $5$：$4 = 2^2$，取 $g = 2$ 可行（$2^2 = 4 \not\equiv 1 \pmod 5$）。于是证书为 $(23; 5; 2 \cdot 11)$、$(11; 2; 2 \cdot 5)$、$(5; 2; 2^2)$。
:::
:::

::: exercise 搜索团 {level=2}
设多项式时间算法 $D$ 判定 $\mathit{CLIQUE}$。说明如何对含有 $k$ 团的图，用至多 $n$ 次对 $D$ 的调用*找出*一个 $k$ 团。
::: solution
依次处理各顶点 $v_1, \dots, v_n$，维护一个仍含 $k$ 团的图 $H$（初始为 $G$）。对每个 $v_i$，问 $D$：$H - v_i$（删去 $v_i$ 及其各边）是否含 $k$ 团；若是，置 $H \gets H - v_i$；否则保留 $v_i$。*不变式：*$H$ 含 $k$ 团。结束时，剩下的每个顶点 $v$ 都不可或缺：删掉它将毁掉所有 $k$ 团——可当初在更大的 $H$ 上确实测试过删除 $v$，而若终图 $H$ 中有一个避开 $v$ 的 $k$ 团，它当初同样会避开 $v$。于是终图 $H$ 的每个 $k$ 团都包含 $H$ 的一切顶点，即 $H$ 本身就是一个 $k$ 团。共 $n$ 次调用，外加多项式工作量。
:::
:::

::: exercise 由判定程序做分解 {level=3}
设 $\mathit{FACTOR} = \{\langle N, k\rangle : N$ 有满足 $2 \le d \le k$ 的因子 $d\}$。证明 $\mathit{FACTOR} \in \mathsf{NP}$；并证明若 $\mathit{FACTOR} \in \mathsf{P}$，则可在关于 $\log N$ 的多项式时间内算出 $N$ 的完整素因数分解。用 Python 实现这个搜索，判定器用一个（慢的）替身。
::: solution
*属于 $\mathsf{NP}$：*证书是 $d$；检验 $2 \le d \le k$ 且 $d \mid N$。

*搜索：*$N$ 的最小不小于 $2$ 的因子 $d$ 是素数，且 $\langle N, k\rangle \in \mathit{FACTOR}$ 当且仅当 $k \ge d$。对 $k \in [2, N]$ 作二分查找，用 $O(\log N)$ 次调用找出 $d$。把 $N$ 除以 $d$ 再重复；每次 $N$ 至少减半，故至多 $\log_2 N$ 轮，共 $O(\log^2 N)$ 次调用，每次都在 $O(\log N)$ 位的数上操作。

```python
def factor_oracle(N, k):              # 替身：真正的判定器会很快
    return any(N % d == 0 for d in range(2, min(k, N) + 1))

def smallest_divisor(N):
    lo, hi = 2, N                     # N 整除 N 自身，故答案在 [lo, hi] 内
    while lo < hi:
        mid = (lo + hi) // 2
        if factor_oracle(N, mid): hi = mid
        else: lo = mid + 1
    return lo

def factorise(N):
    primes = []
    while N > 1:
        d = smallest_divisor(N); primes.append(d); N //= d
    return primes

print(factorise(2 * 3 * 3 * 101 * 9973))
```

```console
$ python3 factor.py
[2, 3, 3, 101, 9973]
```
:::
:::

::: exercise 分解属于 NP ∩ coNP {#ex-factor-np-conp level=3}
证明上一题的 $\mathit{FACTOR}$ 属于 $\mathsf{coNP}$。由此得出结论：若 $\mathit{FACTOR}$ 是 $\mathsf{NP}$ 完全的（$\mathsf{NP}$ 中每个问题都可多项式时间归约到它；见 [[complexity/np-completeness]]），则 $\mathsf{NP} = \mathsf{coNP}$。
::: solution
*$\langle N, k\rangle \notin \mathit{FACTOR}$ 的证书：*素因数分解 $N = p_1 p_2 \cdots p_r$（可重复），外加每个 $p_i$ 的普拉特证书（[[#thm-pratt]]）。验证器检验乘积为 $N$、每个 $p_i$ 是素数（凭其证书，或如今也可用 AKS 算法）、且每个 $p_i > k$。由于 $r \le \log_2 N$ 而每个普拉特证书的长度关于 $\log N$ 是多项式的，这是一项多项式时间检验。可靠性：$N$ 的最小不小于 $2$ 的因子是素数，由唯一分解定理它必为诸 $p_i$ 之一，故若所有 $p_i > k$，则 $N$ 在 $[2, k]$ 中没有因子。

*推论：*设 $\mathit{FACTOR}$ 是 $\mathsf{NP}$ 完全的，取 $L \in \mathsf{NP}$，$f$ 是从 $L$ 到 $\mathit{FACTOR}$ 的多项式时间归约。则 $w \notin L$ 当且仅当 $f(w) \notin \mathit{FACTOR}$，而后者有短证书。于是 $\overline{L} \in \mathsf{NP}$，即 $L \in \mathsf{coNP}$。故 $\mathsf{NP} \subseteq \mathsf{coNP}$；再取补集，得 $\mathsf{coNP} \subseteq \mathsf{NP}$。
:::
:::
