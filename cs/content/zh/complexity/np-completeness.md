到 1970 年代初，计算机科学家手里已经有一长串问题——调度、路由、染色、覆盖、打包、可满足性——尽管付出了巨大努力，没有人能为它们找到多项式时间算法。每一个看上去都是一次孤立的失败。然后库克（Cook，1971）与列文（Levin，1973）证明了一件非凡的事：存在一个问题——布尔可满足性——使得 $\mathsf{NP}$ 中的*每一个*问题都能被有效地翻译成它。一个判定可满足性的多项式时间算法将给出 $\mathsf{NP}$ 中每个问题的多项式时间算法。一年之后，卡普（Karp）证明了二十一个经典难题也具有同样的性质。这些彼此独立的失败，原来是从许多个侧面看到的同一次失败。

本章发展这些发现背后的工具。**多项式时间归约**比较问题的难度；一个问题若是属于 $\mathsf{NP}$，并且 $\mathsf{NP}$ 中的每个问题都归约到它，它就是 **$\mathsf{NP}$ 完全的**。我们将完整地证明**库克–列文（Cook–Levin）定理**——$\mathit{SAT}$ 是 $\mathsf{NP}$ 完全的——这是全书唯一一处必须直接对任意非确定性机器的计算进行推理的地方；随后证明受限问题 $\mathit{3SAT}$ 也是 $\mathsf{NP}$ 完全的，这使它成为 [[complexity/np-complete-problems]] 中大量归约的出发点。

## 多项式时间归约

归约是 [[theory-of-computation/reductions]] 的主要工具。在那里，归约只须可计算；现在它还必须快，否则它干脆把问题自己解掉了。

::: definition 多项式时间可计算函数 {#def-poly-computable}
函数 $f\colon \Sigma^* \to \Sigma^*$ 称为**多项式时间可计算**，若存在一台确定性图灵机，对每个输入 $w$，都在 $p(\lvert w\rvert)$ 步内停机（$p$ 为某个多项式），且带上恰为 $f(w)$。
:::

特别地 $\lvert f(w)\rvert \le p(\lvert w\rvert)$：一台机器写出的符号数不会超过它走的步数。

::: definition 多项式时间归约 {#def-poly-reduction}
语言 $A$ 称为**多项式时间（映射）归约可**到 $B$，记作 $A \le_p B$，若存在多项式时间可计算的 $f$，使得对每个 $w$，

$$
w \in A \iff f(w) \in B.
$$ {#eq-poly-reduction}
:::

这就是 [[theory-of-computation/reductions#def-mapping-reduction]] 的映射归约加上时间限制。它常被称为**卡普（Karp）归约**；允许多次调用关于 $B$ 的子程序并对答案作后处理的归约是**库克（Cook）归约**（多项式时间图灵归约）。我们全程使用卡普归约，因为它们使 $\mathsf{NP}$ 与 $\mathsf{coNP}$ 保持分立（[[#ex-conp-reduction]]）。

::: theorem 多项式时间归约的性质 {#thm-reduction-p}
设 $A \le_p B$。

1. 若 $B \in \mathsf{P}$，则 $A \in \mathsf{P}$。
2. 若 $B \in \mathsf{NP}$，则 $A \in \mathsf{NP}$。
3. 若 $B \le_p C$，则 $A \le_p C$（传递性）。
4. 由同一个函数，$\overline{A} \le_p \overline{B}$。
:::

::: proof
设 $f$ 在时间 $p(n)$ 内算出。(1) 若 $M$ 在时间 $q(n)$ 内判定 $B$，则"在输入 $w$ 上算出 $f(w)$，在它上面运行 $M$"判定 $A$，由 [[#eq-poly-reduction]]。由于 $\lvert f(w)\rvert \le p(n)$，它在时间 $p(n) + q(p(n))$ 内运行，是一个多项式。(2) 若 $V$ 验证 $B$，则"在输入 $\langle w, c\rangle$ 上，在 $\langle f(w), c\rangle$ 上运行 $V$"验证 $A$：$w \in A$ 当且仅当 $f(w)$ 有证书，当且仅当 $w$ 有证书。由同样的理由，它的运行时间是 $\lvert w\rvert$ 的多项式。(3) 若 $g$ 在时间 $q(n)$ 内把 $B$ 归约到 $C$，则 $g \circ f$ 在时间 $p(n) + q(p(n))$ 内把 $A$ 归约到 $C$。(4) [[#eq-poly-reduction]] 等价于 $w \notin A \iff f(w) \notin B$。
:::

于是 $A \le_p B$ 的意思是"$B$ 至少和 $A$ 一样难（差多项式因子）"。方向就是全部：要证明一个新问题 $B$ 难，应把一个已知的难题归约*到* $B$。

::: example 团与独立集 {#ex-clique-is}
图中的**独立集**是两两不相邻的顶点集；$\mathit{IS} = \{\langle G, k\rangle : G$ 含有大小为 $k$ 的独立集$\}$。证明 $\mathit{CLIQUE} \le_p \mathit{IS}$ 且 $\mathit{IS} \le_p \mathit{CLIQUE}$。
::: solution
$G = (V, E)$ 的**补图** $\overline{G}$ 有同样的顶点，且对 $u \ne v$ 之间有边，当且仅当 $\{u, v\} \notin E$。集合 $S$ 是 $G$ 中的团，当且仅当 $S$ 中每一对都是 $G$ 的边，当且仅当 $S$ 中没有一对是 $\overline{G}$ 的边，当且仅当 $S$ 在 $\overline{G}$ 中独立。于是 $f(\langle G, k\rangle) = \langle\overline{G}, k\rangle$ 满足 $\langle G, k\rangle \in \mathit{CLIQUE} \iff f(\langle G, k\rangle) \in \mathit{IS}$，而由邻接矩阵算出 $\overline{G}$ 就是翻转 $n^2 - n$ 个比特：多项式时间。由于 $\overline{\overline{G}} = G$，同一个映射也把 $\mathit{IS}$ 归约到 $\mathit{CLIQUE}$。例如，在 [[complexity/np#ex-verifiers]] 的图中，三角形 $\{2, 3, 4\}$ 是补图的一个独立集。
:::
:::

## NP 完全性

::: definition NP 难与 NP 完全 {#def-npc}
若对每个 $A \in \mathsf{NP}$ 都有 $A \le_p B$，则语言 $B$ 是 **$\mathsf{NP}$ 难**的。若此外还有 $B \in \mathsf{NP}$，则 $B$ 是 **$\mathsf{NP}$ 完全**的。
:::

::: theorem NP 完全问题与 P 对 NP {#thm-npc}
1. 若存在一个属于 $\mathsf{P}$ 的 $\mathsf{NP}$ 完全语言，则 $\mathsf{P} = \mathsf{NP}$。
2. 若 $\mathsf{P} \ne \mathsf{NP}$，则没有 $\mathsf{NP}$ 完全语言属于 $\mathsf{P}$。
3. 若 $B$ 是 $\mathsf{NP}$ 完全的，$B \le_p C$ 且 $C \in \mathsf{NP}$，则 $C$ 是 $\mathsf{NP}$ 完全的。
:::

::: proof
(1) 设 $B \in \mathsf{P}$ 是 $\mathsf{NP}$ 完全的，$A \in \mathsf{NP}$。则 $A \le_p B$，故由 [[#thm-reduction-p]] (1) 有 $A \in \mathsf{P}$。于是 $\mathsf{NP} \subseteq \mathsf{P}$，而 $\mathsf{P} \subseteq \mathsf{NP}$ 恒成立。(2) 是 (1) 的逆否命题。(3) 对 $A \in \mathsf{NP}$，$A \le_p B$ 且 $B \le_p C$，故由传递性 $A \le_p C$；而 $C \in \mathsf{NP}$ 是假设。
:::

第 (3) 条是整个理论的引擎：一旦知道一个 $\mathsf{NP}$ 完全问题，每个新的 $\mathsf{NP}$ 完全问题只需从一个已知问题出发给出一次归约，而不必从 $\mathsf{NP}$ 的每个问题出发归约。然而第一个问题必须从头证明。

::: warning 关于 NP 难度的三个常见混淆
1. **方向。**"我把我的问题 $X$ 归约到了 $\mathit{SAT}$，所以 $X$ 是 $\mathsf{NP}$ 难的"是错的：$X \le_p \mathit{SAT}$ 只说明 $X$ *至多*和 $\mathit{SAT}$ 一样难，即 $X \in \mathsf{NP}$。难度需要的是 $\mathit{SAT} \le_p X$。
2. **$\mathsf{NP}$ 难不等于 $\mathsf{NP}$ 完全。**一个 $\mathsf{NP}$ 难问题未必属于 $\mathsf{NP}$，甚至未必可判定：$\mathit{HALT}_{\mathsf{TM}}$ 是 $\mathsf{NP}$ 难的（[[#ex-halt-np-hard]]）。
3. **难的是最坏情形，不是所有实例。**$\mathsf{NP}$ 完全性是一个关于最坏情形的陈述。它对你实际手里的实例什么也没说——其中许多可能很容易——这正是 SAT 求解器在实践中如此有效的原因（[[complexity/coping-with-hardness]]）。
:::

若 $\mathsf{P} \ne \mathsf{NP}$，$\mathsf{NP}$ 中的每个问题是否要么属于 $\mathsf{P}$、要么 $\mathsf{NP}$ 完全？不是：**拉德纳（Ladner）定理**（1975）说，若 $\mathsf{P} \ne \mathsf{NP}$，则存在 $\mathsf{NP} \setminus \mathsf{P}$ 中不是 $\mathsf{NP}$ 完全的问题（"$\mathsf{NP}$ 中间"问题）。证明中构造的问题是人为的；自然的候选者有整数分解与图同构，但没有任何一个自然问题在仅有 $\mathsf{P} \ne \mathsf{NP}$ 这一假设下被证明是 $\mathsf{NP}$ 中间的。

## 可满足性

::: definition 布尔公式与 CNF {#def-cnf-formula}
**布尔公式**由**变元** $x_1, x_2, \dots$（取值为 $\mathsf{true}$/$\mathsf{false}$，或 $1$/$0$）经由 $\land$、$\lor$ 与 $\lnot$ 构成。一个**文字**是变元 $x$ 或其否定 $\overline{x}$；一个**子句**是文字的析取，如 $(x_1 \lor \overline{x_2} \lor x_4)$；一个公式若为子句的合取，则称它属于**合取范式**（CNF），若每个子句恰含三个文字则属于 **3CNF**。若有某个对变元的赋值使公式为真，则称该公式**可满足**。我们定义
$$
\mathit{SAT} = \{\langle\varphi\rangle : \varphi \text{ 是可满足的布尔公式}\}, \qquad \mathit{3SAT} = \{\langle\varphi\rangle : \varphi \text{ 是可满足的 3CNF 公式}\}.
$$
:::

一个 CNF 公式为真，当且仅当*每个*子句都含有*至少一个*真文字。两个问题都属于 $\mathsf{NP}$：证书是一个满足赋值，对它求值公式即可在线性时间内检验。真值表（[Maths Atlas：命题逻辑](/learn/maths/lesson.php?c=proofs&l=propositional-logic)）以公式长度乘以 $2^n$ 的时间判定可满足性。

::: widget truthtable
formula: (a | b | c) & ~(a & b) & ~(a & c) & ~(b & c)
caption: "恰好 $a, b, c$ 之一为真"写成 CNF：一个子句说*至少一个*，三个子句 $\lnot(a \land b) \equiv (\overline{a} \lor \overline{b})$ 等说*至多一个*。该公式恰在三行为真。下文库克–列文构造对表格的每个格子使用这样一个公式，格子可能装入的每个符号对应一个变元；符号有 $\ell$ 个时，该公式有 $1 + \binom{\ell}{2}$ 个子句。
:::

## 库克–列文定理

::: theorem 库克–列文定理 {#thm-cook-levin}
$\mathit{SAT}$ 是 $\mathsf{NP}$ 完全的。
:::

我们已知 $\mathit{SAT} \in \mathsf{NP}$。对难度，任取 $A \in \mathsf{NP}$。由 [[complexity/np#thm-np-ntm]]，某台非确定性单带图灵机 $N$ 在多项式时间内判定 $A$；我们必须给出一个多项式时间归约，把每个输入 $w$ 变成一个公式 $\varphi_w$，使得 $\varphi_w$ 可满足当且仅当 $N$ 接受 $w$。思路是：$\varphi_w$ 的一个满足赋值*就是* $N$ 在 $w$ 上的一次接受计算，铺成一张表，而 $\varphi_w$ 的各子句检验这张表是正确的——正是验证器对证书所做的事，只不过检验现在由一个公式完成。

### 表格

固定 $N = (Q, \Sigma, \Gamma, \delta, q_0, q_{\text{acc}}, q_{\text{rej}})$ 与 $k$，使得对长度 $n \ge 2$ 的输入，$N$ 的每条分支都在 $T = n^k$ 步内停机。（小输入可以由归约内部的一张查询表处理。）我们使用 [[theory-of-computation/turing-machines#def-tm-config]] 的格局记号 $u\,q\,v$，并作一个无害的约定：停机格局**导出自身**。于是每条分支都可延长为恰好 $T$ 步，且 $N$ 接受 $w$ 当且仅当存在格局序列 $C_0, C_1, \dots, C_T$，每个格局导出下一个，以 $q_0 w$ 开头且含有 $q_{\text{acc}}$。

$T$ 步内读头只访问磁带格子 $1, \dots, T + 1$，所以每个格局都放得进一行 $W = T + 4$ 个符号：一个 $\#$，接着是格子 $1, \dots, T+1$ 的内容并在被读格子之前插入状态符号（$T + 2$ 个符号），再接一个 $\#$。

::: definition 表格 {#def-tableau}
$N$ 在 $w$ 上的一个**表格**是字母表 $C = Q \cup \Gamma \cup \{\#\}$ 上的一个 $(T + 1) \times W$ 表，其各行是按上述方式书写的格局。若它的第一行是初始格局 $\#\,q_0\,w_1 \cdots w_n \sqcup \cdots \sqcup\,\#$，每一行导出下一行，且某一行含有 $q_{\text{acc}}$，则称它是**接受的**。
:::

于是 $N$ 接受 $w$ 当且仅当存在一个接受表格。现在我们用布尔变元描述一个表格：对每一行 $i \in \{0, \dots, T\}$、每一列 $j \in \{1, \dots, W\}$ 与每个符号 $s \in C$，一个变元

$$
x_{i, j, s} \quad \text{意为 "格子 } (i, j) \text{ 含 } s\text{"}.
$$

由于 $\lvert C\rvert$ 是只依赖于 $N$ 的常数，这样的变元共有 $(T + 1)\,W\,\lvert C\rvert = O(n^{2k})$ 个。公式为

$$
\varphi_w = \varphi_{\text{cell}} \land \varphi_{\text{start}} \land \varphi_{\text{accept}} \land \varphi_{\text{move}}.
$$ {#eq-cook-levin}

**每个格子恰含一个符号。**
$$
\varphi_{\text{cell}} = \bigwedge_{i, j}\Bigl[\Bigl(\bigvee_{s \in C} x_{i, j, s}\Bigr) \land \bigwedge_{s \ne t \in C}\bigl(\overline{x_{i, j, s}} \lor \overline{x_{i, j, t}}\bigr)\Bigr].
$$
因此，满足 $\varphi_{\text{cell}}$ 的一个赋值描述了一张表：每个格子恰有一个符号，恰如上面的真值表。

**第一行是初始格局。**
$$
\varphi_{\text{start}} = x_{0,1,\#} \land x_{0,2,q_0} \land x_{0,3,w_1} \land \cdots \land x_{0,n+2,w_n} \land x_{0,n+3,\sqcup} \land \cdots \land x_{0,W-1,\sqcup} \land x_{0,W,\#}.
$$

**某个格子含接受状态。**
$$
\varphi_{\text{accept}} = \bigvee_{i, j} x_{i, j, q_{\text{acc}}}.
$$

**每一行导出下一行。**这是证明的核心。我们无法直接写出"第 $i + 1$ 行由第 $i$ 行导出"，但事实证明检验小块就够了。一个**窗口**是一个 $2 \times 3$ 的格子块，由第 $i, i+1$ 行与第 $j - 1, j, j + 1$ 列组成，其中 $1 \le i + 1 \le T$，$2 \le j \le W - 1$。

::: definition 合法窗口 {#def-legal-window}
$C$ 的符号的一个 $2 \times 3$ 阵列称为**合法窗口**，若它在某个位置上出现在某个宽度为 $W$ 的行对 $(R, R')$ 之中，其中 $R$ 是一个格局且 $R$ 导出 $R'$。
:::

当 $R$ 导出 $R'$ 时，两行至多在状态符号周围的三个格子上不同：右移把 $u\,a\,q\,b\,v$ 变成 $u\,a\,c\,q'\,v$，左移把它变成 $u\,q'\,a\,c\,v$，而在最左端 $\#\,q\,b\,v$ 变成 $\#\,q'\,c\,v$。于是一个给定阵列是否为合法窗口，只依赖于它的六个符号与 $\delta$（状态符号相对于窗口可能有的位置只有常数多个，逐一检验即可），而合法窗口的全体是一个有限集，归约可以由 $N$ 一劳永逸地算出。现在令

$$
\varphi_{\text{move}} = \bigwedge_{i = 0}^{T - 1}\ \bigwedge_{j = 2}^{W - 1}\ \bigvee_{\substack{\text{合法窗口}\\ (a_1, a_2, a_3;\ b_1, b_2, b_3)}} \bigl(x_{i, j-1, a_1} \land x_{i, j, a_2} \land x_{i, j+1, a_3} \land x_{i+1, j-1, b_1} \land x_{i+1, j, b_2} \land x_{i+1, j+1, b_3}\bigr).
$$

它说的是：表格的每个窗口都合法。

::: example 哪些窗口合法？ {#ex-windows}
设 $N$ 有 $\Gamma = \{0, 1, \sqcup\}$ 与转移 $\delta(q, 0) = \{(r, 1, R)\}$、$\delta(q, 1) = \{(q, 0, L), (r, 1, R)\}$。下列窗口（上一行叠着下一行）哪些合法？

$$
\text{(a) } \begin{smallmatrix} 0 & q & 1\\ q & 0 & 0\end{smallmatrix} \quad
\text{(b) } \begin{smallmatrix} 0 & q & 1\\ 0 & 0 & r\end{smallmatrix} \quad
\text{(c) } \begin{smallmatrix} 1 & 0 & 0\\ 1 & 0 & 1\end{smallmatrix} \quad
\text{(d) } \begin{smallmatrix} 0 & 0 & 0\\ 0 & 0 & q\end{smallmatrix} \quad
\text{(e) } \begin{smallmatrix} 0 & 0 & 0\\ 0 & 0 & r\end{smallmatrix} \quad
\text{(f) } \begin{smallmatrix} 1 & 0 & 0\\ r & 0 & 0\end{smallmatrix}
$$
::: solution
(a) 合法：状态 $q$ 读 $1$，转移 $(q, 0, L)$ 把 $0\,q\,1$ 变成 $q\,0\,0$。(b) 不合法：从 $(q, 1)$ 出发的唯一右移写下 $1$，得到 $0\,1\,r$，而不是 $0\,0\,r$。(c) 不合法：上一行没有状态符号，所以状态至少在窗口外一列；右端格子 $0 \to 1$ 的变化要求状态恰在其右方，而状态左边紧邻的格子只会变成一个状态符号（左移时）或干脆不变。(d) 合法：状态 $q$ 恰在窗口右方，读 $1$，经由 $(q, 0, L)$ 左移，把新状态 $q$ 放入右下角的格子。(e) 不合法：没有进入 $r$ 的左移。(f) 合法：状态原先恰在窗口左方，读那个 $1$；右移 $(r, 1, R)$ 把那个 $1$ 变成 $r$。一个穷举程序对这台机器造出宽度 $8$ 的一切行对并收集它们的窗口，与以上六个判断全部一致。注意 (d) 与 (f)：上一行根本没有状态、下一行却有状态的窗口——窗口只看得见一次移动的一部分。
:::
:::

### 为什么局部检验就够

::: lemma 合法窗口强制合法移动 {#lem-windows}
设 $R$ 是一个宽度为 $W$ 的格局行，$R'$ 是任意一个宽度为 $W$ 的行。若以 $R$ 在上、$R'$ 在下组成的每个窗口都合法，则 $R$ 导出 $R'$。
:::

::: proof
设 $R$ 的状态符号在第 $j$ 列，于是被读符号在第 $j + 1$ 列。

*远离状态的列照抄。*取列 $p$ 满足 $\lvert p - j\rvert \ge 2$ 且 $2 \le p \le W - 1$。以 $p$ 为中心的窗口合法，所以它出现在某个行对 $(S, S')$ 中且 $S$ 导出 $S'$；它的上一行不含状态符号，故 $S$ 的状态到窗口中心列的距离至少为 $2$，中心格子不在发生变化的三个格子之列。于是 $R'[p] = R[p]$。端列 $1$ 与 $W$ 在 $R$ 中是 $\#$；在任何 $S$ 导出 $S'$ 的行对 $(S, S')$ 中，$\#$ 格子不变，所以以 $2$ 与 $W - 1$ 为中心的合法窗口迫使 $R'[1] = R'[W] = \#$。

*状态周围的格子遵从同一个转移。*以 $j$ 为中心的窗口上一行为 $R[j-1]\,R[j]\,R[j+1] = a\,q\,b$，它合法，故出现在某个行对 $(S, S')$ 中：$S$ 中状态 $q$ 读着 $b$、其左邻是 $a$（磁带符号或 $\#$），而窗口下一行正是某个特定转移 $\tau \in \delta(q, b)$——若 $q$ 是停机状态则没有转移——对 $a\,q\,b$ 所做的：右移为 $a\,c\,q'$，左移（$a \ne \#$）为 $q'\,a\,c$，最左端为 $\#\,q'\,c$，停机状态为 $a\,q\,b$。每种情形下，这三个格子就是移动改变的全部。把同一个 $\tau$ 作用到 $R$（它有同样的 $q$、$b$ 与 $a$）上，恰好以同样方式改变第 $j - 1, j, j + 1$ 列，其余各列原封不动。由上一段，$R'$ 在这些列之外与 $R$ 相同；由窗口，$R'$ 在这些列之内与 $\tau$ 的结果相同。所以 $R'$ 就是 $R$ 经 $\tau$ 导出的格局。
:::

::: proof 库克–列文定理的证明
*正确性。*设 $N$ 接受 $w$。取一条接受分支，靠重复停机格局把它延长到 $T$ 步，并把各格局写成一个表格。令 $x_{i, j, s}$ 为真当且仅当格子 $(i, j)$ 含 $s$。则 $\varphi_{\text{cell}}$、$\varphi_{\text{start}}$ 与 $\varphi_{\text{accept}}$ 由构造成立，且每个窗口都合法，因为每一行导出下一行。于是 $\varphi_w$ 可满足。

反之，设某个赋值满足 $\varphi_w$。由 $\varphi_{\text{cell}}$，它描述一张每格恰有一个符号的表；由 $\varphi_{\text{start}}$，第 $0$ 行是初始格局；由 $\varphi_{\text{move}}$，每个窗口都合法。由 [[#lem-windows]] 与对 $i$ 的归纳，每一行 $i$ 都是一个格局且由前一行导出：第 $0$ 行是格局，且若第 $i$ 行是格局，则第 $i+1$ 行就是它导出的格局。于是各行组成 $N$ 在 $w$ 上计算的一条分支，而由 $\varphi_{\text{accept}}$，这条分支到达 $q_{\text{acc}}$。故 $N$ 接受 $w$，即 $w \in A$。

*规模与时间。*$\varphi_{\text{cell}}$ 每个格子贡献 $O(1)$ 个文字，共 $O(n^{2k})$ 个；$\varphi_{\text{start}}$ 有 $W = O(n^k)$ 个文字；$\varphi_{\text{accept}}$ 有 $O(n^{2k})$ 个；$\varphi_{\text{move}}$ 的每个窗口位置有一个常数规模的子公式（窗口至多 $\lvert C\rvert^6$ 个，每个是 $6$ 个文字的合取），共 $O(n^{2k})$。每个变元名 $x_{i,j,s}$ 用 $O(\log n)$ 比特写出，故 $\lvert\varphi_w\rvert = O(n^{2k}\log n)$。归约用对 $i$、$j$ 的简单嵌套循环与 $N$ 的固定表写出这些部分，时间关于 $n$ 多项式。所以 $w \mapsto \varphi_w$ 是从 $A$ 到 $\mathit{SAT}$ 的多项式时间归约。由于 $A \in \mathsf{NP}$ 是任取的，$\mathit{SAT}$ 是 $\mathsf{NP}$ 难的。
:::

::: example 库克–列文公式有多大？ {#ex-tableau-size}
一台有 $\lvert C\rvert = 12$ 个符号的非确定性机器以时间 $T = n^2$ 运行。对长度 $n = 10$ 的输入，$\varphi_w$ 有多少个变元？$\varphi_{\text{cell}}$ 大约贡献多少个子句？
::: solution
$T = 100$，所以表格有 $T + 1 = 101$ 行、$W = T + 4 = 104$ 列：$101 \cdot 104 = 10\,504$ 个格子，$10\,504 \cdot 12 = 126\,048$ 个变元。每个格子向 $\varphi_{\text{cell}}$ 贡献 $1 + \binom{12}{2} = 67$ 个子句，总共约 $704\,000$ 个。大，但是多项式：$n$ 加倍将使这些数大约乘以 $16 = 2^{2k}$（此处 $k = 2$）。相形之下，直接确定性模拟可能要探索 $b^{100}$ 条分支。
:::
:::

证明显示的比定理声明的还多一点。公式 $\varphi_w$ 几乎是 CNF 的：$\varphi_{\text{cell}}$、$\varphi_{\text{start}}$ 与 $\varphi_{\text{accept}}$ 是子句的合取，而 $\varphi_{\text{move}}$ 中每个窗口约束是关于 $6\lvert C\rvert$ 个变元的一个固定公式，可以改写为子句数为常数的等价 CNF 公式（例如由它的真值表：对它所涉变元的每个使其为假的赋值，取一个排除该赋值的子句）。所以 $\mathit{CNF\text{-}SAT}$——限制在 CNF 公式上的可满足性问题——也是 $\mathsf{NP}$ 完全的。此外，满足赋值可以被读成一次接受计算，于是这个归约把证书双向地映成证书；具有这一性质的归约称为**列文（Levin）归约**。

::: quiz
设从任意的 $A \in \mathsf{NP}$ 到 $\mathit{SAT}$ 的归约使用一个 $T$ 行 $T$ 列的表格，其中 $T = 2^n$。会出什么问题？
- [ ] 当 $w \in A$ 时，公式将不再可满足。
- [x] 归约将不会以多项式时间运行。
- [ ] [[#lem-windows]] 的证明将失效。
- [ ] 什么也不会：任何可计算的归约都能证明 $\mathsf{NP}$ 难度。
::: solution
构造仍然正确，但写出 $\Theta(T^2) = \Theta(4^n)$ 个子句需要指数时间，所以它不是多项式时间归约，关于 $\mathsf{NP}$ 难度什么也证明不了。（一个可计算但慢的归约尽可自己判定 $A$，然后输出一个固定的可满足或不可满足公式。）正是 $N$ 的多项式运行时间保证了表格的多项式规模。
:::
:::

## 3SAT 是 NP 完全的

当公式有一个刻板形状时，从 $\mathit{SAT}$ 出发的归约更容易设计。标准形状是 3CNF。

::: lemma 拆分子句 {#lem-clause-split}
设 $c = (\ell_1 \lor \ell_2 \lor \cdots \lor \ell_k)$ 是一个含 $k \ge 4$ 个文字的子句，$z_1, \dots, z_{k-3}$ 是新的变元。则
$$
c' = (\ell_1 \lor \ell_2 \lor z_1) \land (\overline{z_1} \lor \ell_3 \lor z_2) \land (\overline{z_2} \lor \ell_4 \lor z_3) \land \cdots \land (\overline{z_{k-3}} \lor \ell_{k-1} \lor \ell_k)
$$
由 $k - 2$ 个三文字子句构成，且原有变元的一个赋值满足 $c$，当且仅当它可以扩展到各 $z_i$ 上使其满足 $c'$。
:::

::: proof
设某个赋值使某个 $\ell_m$ 为真。对 $i \le m - 2$ 令 $z_i$ 为真，对 $i \ge m - 1$ 令 $z_i$ 为假。含 $\ell_m$ 的子句被 $\ell_m$ 满足；它左边的每个子句都含某个 $i \le m - 2$ 的正文字 $z_i$，为真；它右边的每个子句都含某个 $i \ge m - 1$ 的负文字 $\overline{z_i}$，为真。（$m \le 2$ 时所有 $z_i$ 为假；$m \ge k - 1$ 时所有 $z_i$ 为真。）反之，设每个 $\ell_m$ 都为假，而某个扩展满足 $c'$。第一个子句迫使 $z_1$ 为真；第二个子句此时是 $(\overline{z_1} \lor \ell_3 \lor z_2)$，其中 $\overline{z_1}$ 与 $\ell_3$ 为假，故迫使 $z_2$ 为真；如此下去，直到 $z_{k-3}$ 为真。于是最后一个子句 $(\overline{z_{k-3}} \lor \ell_{k-1} \lor \ell_k)$ 为假——矛盾。
:::

::: theorem 3SAT 是 NP 完全的 {#thm-3sat}
$\mathit{3SAT}$ 是 $\mathsf{NP}$ 完全的。
:::

::: proof
$\mathit{3SAT} \in \mathsf{NP}$，因为它是 $\mathit{SAT}$ 的特例。我们从一个在库克–列文证明之后的评注中已知 $\mathsf{NP}$ 完全的 $\mathit{CNF\text{-}SAT}$ 归约到 $\mathit{3SAT}$。给定一个 CNF 公式，把每个含 $k \ge 4$ 个文字的子句替换成 [[#lem-clause-split]] 的 $k - 2$ 个子句，每次都使用新的变元；对含一个或两个文字的子句，靠重复文字补足到三个（$(\ell) \equiv (\ell \lor \ell \lor \ell)$，$(\ell_1 \lor \ell_2) \equiv (\ell_1 \lor \ell_2 \lor \ell_2)$)。若某个赋值满足原公式，就按引理逐个子句地扩展它；不同子句的新变元互不相交，所以各次扩展互不冲突。若新公式可满足，引理表明它在原有变元上的限制满足每一个原子句。输出的文字数至多是输入的三倍，且可在线性时间内算出。
:::

::: example 拆分一个五文字子句 {#ex-split}
把 $(x_1 \lor \overline{x_2} \lor x_3 \lor x_4 \lor \overline{x_5})$ 化为 3CNF，并用穷举检验结果。
::: solution
$k = 5$ 需要 $k - 3 = 2$ 个新变元 $z_1 = x_6$、$z_2 = x_7$，得到 $k - 2 = 3$ 个子句：
$$
(x_1 \lor \overline{x_2} \lor z_1) \land (\overline{z_1} \lor x_3 \lor z_2) \land (\overline{z_2} \lor x_4 \lor \overline{x_5}).
$$
例如，若各文字中只有 $x_3$ 为真（于是 $x_1 = 0$、$x_2 = 1$、$x_4 = 0$、$x_5 = 1$），证明的作法取 $z_1 = 1$、$z_2 = 0$，三个子句全部成立。下面的程序实现 [[#thm-3sat]] 的归约，并在 2000 个随机 CNF 公式上——变元至多五个、子句至多六个文字——比较变换前后的可满足性。

```python
from itertools import product
import random

def to_3cnf(clauses, n):
    """拆长子句，补短子句。返回（新子句表，新变元数）。"""
    out = []
    for c in clauses:
        c = list(c)
        if len(c) <= 3:
            out.append((c + [c[0]] * 3)[:3])          # 重复一个文字补足长度 3
            continue
        z = n + 1; n += 1
        out.append([c[0], c[1], z])                   # (l1 v l2 v z1)
        for lit in c[2:-2]:
            out.append([-z, lit, z + 1]); z += 1; n += 1   # (~z_i v l_{i+2} v z_{i+1})
        out.append([-z, c[-2], c[-1]])                # (~z_last v l_{k-1} v l_k)
    return out, n

def sat(clauses, n):
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in clauses)
               for a in product([False, True], repeat=n))

random.seed(1)
trials = mism = 0
for _ in range(2000):
    n = random.randint(1, 5)
    cls = [[random.choice([1, -1]) * random.randint(1, n) for _ in range(random.randint(1, 6))]
           for _ in range(random.randint(1, 5))]
    new, m = to_3cnf(cls, n)
    trials += 1; mism += sat(cls, n) != sat(new, m)
print(trials, "formulas,", mism, "mismatches")
print(to_3cnf([[1, -2, 3, 4, -5]], 5))
```

```console
$ python3 split.py
2000 formulas, 0 mismatches
([[1, -2, 6], [-6, 3, 7], [-7, 4, -5]], 7)
```

在随机实例上做试验不是证明——证明是 [[#lem-clause-split]]——但它是揪出归约实现中差一错误的廉价办法，而在 [[complexity/np-complete-problems]] 中我们对每个归约都使用同样的方法。
:::
:::

两个文字的子句呢？$\mathit{2SAT}$ 属于 $\mathsf{P}$（它归约到"蕴含图"的强连通分量：[[complexity/coping-with-hardness]]），所以每个子句两个文字到三个文字的跨越，恰好是可满足性变难的门槛。没有任何拆分技巧能在保持可满足性的同时把三文字子句变成二文字子句——除非 $\mathsf{P} = \mathsf{NP}$，因为那样的多项式时间归约将把 $\mathit{3SAT}$ 放进 $\mathsf{P}$。

::: history
史蒂芬·库克（Stephen Cook）在 "The complexity of theorem-proving procedures"（1971 年 5 月宣读于第三届 ACM 计算理论年会）中证明：可满足性（我们所说的 CNF 公式的可满足性）关于非确定多项式时间是完全的。他使用的是多项式时间图灵归约，并同时证明了 3-可满足性与子图同构的完全性。列昂尼德·列文（Leonid Levin）在莫斯科独立工作，在 "Universal sequential search problems"（*Problemy Peredachi Informatsii*，1973）中描述了六个"通用搜索问题"，其中包括铺砖与可满足性；他的结果约在 1971–72 年即已获得，但发表有所延误。理查德·卡普（Richard Karp）的 "Reducibility among combinatorial problems"（1972）以现代形式引入了多项式时间多一归约，并对二十一个问题证明了 $\mathsf{NP}$ 完全性，把库克的定理变成了一种方法。理查德·拉德纳（Richard Ladner）在 1975 年证明了 $\mathsf{NP}$ 中间问题的存在（假定 $\mathsf{P} \ne \mathsf{NP}$）。库克于 1982 年获图灵奖，卡普于 1985 年获图灵奖；列文于 2012 年获高德纳奖（Knuth Prize）。
:::

## 后续内容

有了 $\mathit{3SAT}$，[[complexity/np-complete-problems]] 将用显式的构造归约证明独立集、团、顶点覆盖、哈密顿路径与回路、子集和以及三色问题的 $\mathsf{NP}$ 完全性。表格法本身还要多次复用：把时间换成空间，它证明 $\mathit{TQBF}$ 是 $\mathsf{PSPACE}$ 完全的（[[complexity/space-complexity]]）；而"局部检验就够"这一思想的概率化强化，正是 PCP 定理的核心（[[complexity/approximation-pcp]]）。

::: summary
- 若存在多项式时间可计算的 $f$ 把是实例映成是实例、否实例映成否实例，则 $A \le_p B$（[[#def-poly-reduction]]）；属于 $\mathsf{P}$、属于 $\mathsf{NP}$ 都从 $B$ 传给 $A$，且 $\le_p$ 具有传递性（[[#thm-reduction-p]]）。
- 若每个 $\mathsf{NP}$ 语言都归约到 $B$，则 $B$ 是 $\mathsf{NP}$ 难的；若此外 $B \in \mathsf{NP}$，则 $B$ 是 $\mathsf{NP}$ 完全的（[[#def-npc]]）；一个属于 $\mathsf{P}$ 的 $\mathsf{NP}$ 完全问题将给出 $\mathsf{P} = \mathsf{NP}$（[[#thm-npc]]）。
- 要证一个新问题 $\mathsf{NP}$ 难，把一个已知的 $\mathsf{NP}$ 完全问题归约**到**它。
- **库克–列文**（[[#thm-cook-levin]]）：多项式时间 NTM 的一次接受计算是一个多项式规模的表格，而一个几乎是 CNF 的公式逐格、逐窗口地检验它；合法的 $2 \times 3$ 窗口强制出合法的移动（[[#lem-windows]]）。
- **$\mathit{3SAT}$ 是 $\mathsf{NP}$ 完全的**（[[#thm-3sat]]）：长子句拆成由新变元串联的三文字子句链（[[#lem-clause-split]]），保持的是可满足性（不是等价）。
- 若 $\mathsf{P} \ne \mathsf{NP}$，则存在既不属于 $\mathsf{P}$ 也不 $\mathsf{NP}$ 完全的 $\mathsf{NP}$ 问题（拉德纳）。
:::

## 习题

::: exercise 能推出什么？ {level=1}
设 $\mathsf{P} \ne \mathsf{NP}$。对问题 $X$ 与 $Y$，哪些结论是有效的？(a) $X \le_p \mathit{SAT}$，故 $X$ 是 $\mathsf{NP}$ 完全的。(b) $\mathit{SAT} \le_p X$ 且 $X \in \mathsf{NP}$，故 $X \notin \mathsf{P}$。(c) $X \le_p Y$ 且 $Y \in \mathsf{P}$，故 $X \in \mathsf{P}$。(d) $X \le_p Y$ 且 $X \notin \mathsf{P}$，故 $Y$ 是 $\mathsf{NP}$ 难的。
::: solution
(a) 无效：它只说明 $X \in \mathsf{NP}$；例如 $\mathit{PATH} \le_p \mathit{SAT}$。(b) 有效：$X$ 是 $\mathsf{NP}$ 完全的，由 [[#thm-npc]] (2) 它不属于 $\mathsf{P}$。(c) 由 [[#thm-reduction-p]] (1) 有效（而且不需要任何假设）。(d) 无效：它说明了 $Y \notin \mathsf{P}$，却没有说明每个 $\mathsf{NP}$ 问题都归约到 $Y$；$X$ 可以是一个 $\mathsf{NP}$ 中间问题。
:::
:::

::: exercise 数表格变元 {level=1 check="7500"}
在一个简化版的表格——$n^k$ 行 $n^k$ 列——中，$n = 5$、$k = 2$、$\lvert C\rvert = 12$ 时变元 $x_{i,j,s}$ 有多少个？（填写数字。）
::: solution
$n^k = 25$，于是格子有 $25 \cdot 25 = 625$ 个，变元有 $625 \cdot 12 = 7500$ 个。
:::
:::

::: exercise 拆分长子句 {level=1 check="4"}
对含 $6$ 个文字的子句，[[#lem-clause-split]] 产生多少个三文字子句？引入多少个新变元？（填写子句数。）
::: solution
子句 $k - 2 = 4$ 个，新变元 $k - 3 = 3$ 个：$(\ell_1 \lor \ell_2 \lor z_1)(\overline{z_1} \lor \ell_3 \lor z_2)(\overline{z_2} \lor \ell_4 \lor z_3)(\overline{z_3} \lor \ell_5 \lor \ell_6)$。
:::
:::

::: exercise 停机问题是 NP 难的 {#ex-halt-np-hard level=2}
证明 $\mathit{HALT}_{\mathsf{TM}} = \{\langle M, x\rangle : M$ 在 $x$ 上停机$\}$ 是 $\mathsf{NP}$ 难的。它是 $\mathsf{NP}$ 完全的吗？
::: solution
只要证明 $\mathit{SAT} \le_p \mathit{HALT}_{\mathsf{TM}}$（再结合库克–列文定理用传递性）。把 $\varphi$ 映为 $\langle M, \varphi\rangle$，其中 $M$ 是固定机器"在输入 $\psi$ 上，逐一尝试所有赋值；若有一个满足 $\psi$，就停机；否则永远循环"。这个映射只是往 $\varphi$ 后面接一个固定串，耗时线性。$\varphi$ 可满足当且仅当 $M$ 在 $\varphi$ 上停机。$\mathit{HALT}_{\mathsf{TM}}$ 不是 $\mathsf{NP}$ 完全的，因为它不可判定，而 $\mathsf{NP}$ 的每个语言都可判定（[[complexity/np#thm-p-np-exp]]）。
:::
:::

::: exercise 若 P = NP {level=2}
证明：若 $\mathsf{P} = \mathsf{NP}$，则除 $\emptyset$ 与 $\Sigma^*$ 外，每个 $B \in \mathsf{P}$ 都是 $\mathsf{NP}$ 完全的。为什么要排除 $\emptyset$ 与 $\Sigma^*$？
::: solution
取定 $y_1 \in B$ 与 $y_0 \notin B$（因 $B \ne \emptyset, \Sigma^*$，它们存在）。设 $A \in \mathsf{NP} = \mathsf{P}$，由 $M$ 在多项式时间内判定。定义：$M$ 接受 $w$ 时 $f(w) = y_1$，否则 $f(w) = y_0$：多项式时间可计算，且 $w \in A \iff f(w) \in B$。于是 $A \le_p B$；而 $B \in \mathsf{P} \subseteq \mathsf{NP}$。对 $B = \emptyset$，没有可映射到的"是"实例，所以只有 $A = \emptyset$ 归约到它；类似地，只有 $\Sigma^*$ 归约到 $\Sigma^*$。这两个语言永远不会是 $\mathsf{NP}$ 完全的（因为 $\mathsf{NP}$ 含有别的语言）。
:::
:::

::: exercise 卡普归约与 coNP {#ex-conp-reduction level=2}
(a) 证明 $\overline{\mathit{SAT}}$（不可满足的公式，连同不是公式的串）在 $\le_p$ 下是 $\mathsf{coNP}$ 完全的：它属于 $\mathsf{coNP}$，且 $\mathsf{coNP}$ 的每个语言都归约到它。(b) 证明 $\overline{\mathit{SAT}}$ 确实*可以*库克归约到 $\mathit{SAT}$。(c) 证明若 $\overline{\mathit{SAT}} \le_p \mathit{SAT}$，则 $\mathsf{NP} = \mathsf{coNP}$。
::: solution
(a) $\overline{\mathit{SAT}} \in \mathsf{coNP}$，因为它的补 $\mathit{SAT}$ 属于 $\mathsf{NP}$。若 $L \in \mathsf{coNP}$，则 $\overline{L} \in \mathsf{NP}$，于是由库克–列文有 $\overline{L} \le_p \mathit{SAT}$，再由 [[#thm-reduction-p]] (4) 有 $L \le_p \overline{\mathit{SAT}}$。
(b) 向 $\mathit{SAT}$ 子程序问一次，再把答案取反——库克归约允许对答案作后处理。
(c) 若 $\overline{\mathit{SAT}} \le_p \mathit{SAT}$，则由 [[#thm-reduction-p]] (2)，$\overline{\mathit{SAT}} \in \mathsf{NP}$。对任意 $L \in \mathsf{coNP}$，由 (a) 有 $L \le_p \overline{\mathit{SAT}}$，故 $L \in \mathsf{NP}$。于是 $\mathsf{coNP} \subseteq \mathsf{NP}$，取补得 $\mathsf{NP} \subseteq \mathsf{coNP}$。所以（若二者不同）卡普归约使 $\mathsf{NP}$ 与 $\mathsf{coNP}$ 分立，而库克归约做不到。
:::
:::

::: exercise 一个通用的 NP 完全问题 {level=3}
设 $U = \{\langle N, x, 1^t\rangle : N$ 是某条分支在 $t$ 步内接受 $x$ 的非确定性图灵机$\}$。不用库克–列文定理，直接证明 $U$ 是 $\mathsf{NP}$ 完全的。时间界为什么要用一元书写？
::: solution
*$U \in \mathsf{NP}$:* 证书是至多 $t$ 个猜测组成的序列；验证器依这些猜测在 $x$ 上模拟 $N$ 至多 $t$ 步，时间关于 $t$ 与 $\lvert\langle N\rangle\rvert$ 多项式（每一步模拟查一次 $N$ 的转移表）——而这是输入长度的多项式，因为 $t$ 以一元书写，不超过输入长度。
*$U$ 是 $\mathsf{NP}$ 难的:* 设 $A \in \mathsf{NP}$ 由 NTM $N_A$ 以时间 $n^k$ 判定。把 $x$ 映为 $\langle N_A, x, 1^{\lvert x\rvert^k}\rangle$；耗时 $O(\lvert x\rvert^k)$，且 $x \in A$ 当且仅当 $N_A$ 在 $\lvert x\rvert^k$ 步内接受 $x$。
*一元：* 若 $t$ 以二进制书写，验证器的模拟将耗时输入长度的指数，属于 $\mathsf{NP}$ 便不成立（二进制版本是 $\mathsf{NEXP}$ 完全的）。$U$ 说明 $\mathsf{NP}$ 完全问题的存在有平凡的理由；库克–列文的实质内容在于：一个*自然的*问题——$\mathit{SAT}$——就是其中之一。
:::
:::

::: exercise 电路与采廷变换 {level=3}
(a) 证明把公式通过把 $\lor$ 对 $\land$ 分配展开化为 CNF 会造成指数膨胀：$(x_1 \land y_1) \lor (x_2 \land y_2) \lor \cdots \lor (x_n \land y_n)$ 由此得到的 CNF 有 $2^n$ 个子句。(b) **采廷（Tseitin）变换**则相反：为每个门引入一个新变元 $g$，并加上说 $g$ 等于其门输出的子句：对 $g = a \land b$，子句 $(\overline{g} \lor a)(\overline{g} \lor b)(g \lor \overline{a} \lor \overline{b})$；对 $g = a \lor b$，$(g \lor \overline{a})(g \lor \overline{b})(\overline{g} \lor a \lor b)$；对 $g = \lnot a$，$(\overline{g} \lor \overline{a})(g \lor a)$；再加上输出门的单元子句 $(o)$。证明所得公式可满足当且仅当电路可满足，并实现它。
::: solution
(a) 分配展开后，从每对 $\{x_i, y_i\}$ 中各取一个变元的每种取法给出一个子句：$(z_1 \lor \cdots \lor z_n)$，其中 $z_i \in \{x_i, y_i\}$，即 $2^n$ 个子句，且没有多余的。（事实上，与它等价的每个 CNF 公式都至少有 $2^n$ 个子句。）
(b) 给定电路的一个使输出为真的输入赋值，让每个门变元取它的门所算出的值：每个门的子句都成立（它们说的正是"$g$ 等于它的门对其输入的函数值"），而 $(o)$ 成立，因为输出为真。反之，子句的一个满足赋值按拓扑序逐门迫使每个 $g$ 等于它的门在输入变元上的值；于是输出门的值就是 $o$ 的值，而 $o$ 为真。CNF 的子句数是 $O(\text{门的个数})$，所以这是一个线性时间归约 $\mathit{CIRCUIT\text{-}SAT} \le_p \mathit{CNF\text{-}SAT}$，没有指数爆炸。

```python
from itertools import product

def tseitin(gates, inputs, output):
    """gates: {name: (op, args)}，op 取 'and'、'or'、'not'。变元是输入与各门的
    名字，编号 1, 2, ...；返回以带符号整数表示的 CNF 子句。"""
    num = {v: i + 1 for i, v in enumerate(inputs + list(gates))}
    cnf = []
    for g, (op, args) in gates.items():
        x, ys = num[g], [num[a] for a in args]
        if op == "not":
            cnf += [[-x, -ys[0]], [x, ys[0]]]
        elif op == "and":                     # x <-> y1 & y2 & ...
            cnf += [[-x, y] for y in ys] + [[x] + [-y for y in ys]]
        elif op == "or":                      # x <-> y1 | y2 | ...
            cnf += [[x, -y] for y in ys] + [[-x] + ys]
    return cnf + [[num[output]]], len(num)

def sat(cnf, n):
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in cnf)
               for a in product([False, True], repeat=n))

# (a & b) | (~a & ~b)：即 "a 等于 b"，可满足；以及 a & ~a，不可满足
g1 = {"na": ("not", ["a"]), "nb": ("not", ["b"]), "p": ("and", ["a", "b"]),
      "q": ("and", ["na", "nb"]), "out": ("or", ["p", "q"])}
g2 = {"na": ("not", ["a"]), "out": ("and", ["a", "na"])}
for g in (g1, g2):
    cnf, n = tseitin(g, ["a", "b"], "out")
    print(len(cnf), "clauses,", n, "variables, satisfiable:", sat(cnf, n))
```

```console
$ python3 tseitin.py
14 clauses, 7 variables, satisfiable: True
6 clauses, 4 variables, satisfiable: False
```

每个布尔公式都是一个电路（每个运算符一个门），所以采廷变换也在线性时间内把任意公式的 $\mathit{SAT}$ 归约到 $\mathit{CNF\text{-}SAT}$——这正是 SAT 求解器能够接受任意约束的方式。
:::
:::
