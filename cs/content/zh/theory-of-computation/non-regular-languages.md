有限自动机能检查表达式中的括号是否配对吗？试构造一个。它必须接受 `()`、`(())`、`((()))` 等等，并且拒绝 `(()` 和 `((())`。读完一串左括号之后，它必须知道一共有多少个，因为后面必须恰好跟上同样多个右括号。只有 $k$ 个状态，它至多能区分 $k$ 种不同的数目，所以在输入 $(^{k}\,)^{k}$ 上，前缀 $\varepsilon, (, ((, \dots, (^k$ 中必有两个把自动机带到同一个状态——而从那一刻起，机器再也无法分辨它们。于是它或者接受某个不平衡的串，或者拒绝某个平衡的串。

本章把这一直觉变成证明。有三个工具可以证明一个语言*不是*正则的：上面勾勒的**区分串**论证、**泵引理**和**封闭性**。把区分串论证严格化，就得到 **Myhill–Nerode 定理**，它完全刻画了正则语言，还附带一个构造性的好处：每个正则语言都有唯一的最小 DFA，并且存在有效算法，从该语言的任意一个 DFA 求出这个最小 DFA。因此在这一章里，我们既了解有限自动机不能做什么，也学会如何把自己构造的自动机做到尽可能小。

## 区分串

[[theory-of-computation/nondeterminism#thm-blowup]] 的关键观察对任何语言都适用。固定一个语言 $L \subseteq \Sigma^*$。

::: definition 可区分的串 {#def-distinguishable}
若存在串 $z$，使得 $xz$ 与 $yz$ 恰有一个属于 $L$，则串 $x, y \in \Sigma^*$ 称为**被 $L$ 区分**，$z$ 称为**区分**它们。否则称 $x$ 和 $y$ **在 $L$ 下不可区分**，记作 $x \equiv_L y$：

$$
x \equiv_L y \iff \text{对所有 } z \in \Sigma^*:\ \bigl(xz \in L \iff yz \in L\bigr).
$$
:::

于是 $x \equiv_L y$ 意味着：无论再接着输入什么，都永远无法揭示我们当初是从 $x$ 还是从 $y$ 出发的。这正是识别器可以放心遗忘的信息。

::: lemma 可区分的串需要不同状态 {#lem-dist}
设 $M = (Q, \Sigma, \delta, q_0, F)$ 是识别 $L$ 的 DFA。若 $x$ 和 $y$ 被 $L$ 区分，则 $\hat\delta(q_0, x) \ne \hat\delta(q_0, y)$。 于是若 $L$ 有 $k$ 个两两可区分的串，则 $L$ 的每个 DFA 至少有 $k$ 个状态；若有无穷多个两两可区分的串，则 $L$ 不是正则的。
:::

::: proof
设 $z$ 区分 $x$ 和 $y$。若 $\hat\delta(q_0, x) = \hat\delta(q_0, y)$，则由 [[theory-of-computation/finite-automata#lem-compose]] 有 $\hat\delta(q_0, xz) = \hat\delta(q_0, yz)$，于是 $M$ 同时接受 $xz$ 和 $yz$，或两者都不接受；但 $M$ 识别 $L$，而两者恰有一个属于 $L$。故两个状态不同。于是两两可区分的串到达两两不同的状态，状态数至少与这样的串一样多；无穷多个就需要无穷多个状态。
:::

::: example $0^n1^n$ 不是正则的 {#ex-0n1n-dist}
证明 $B = \{0^n 1^n : n \ge 0\}$ 不是正则的。
::: solution
串 $0^0, 0^1, 0^2, \dots$ 两两可区分：对 $i \ne j$，取串 $z = 1^i$，有 $0^i1^i \in B$ 但 $0^j1^i \notin B$。由 [[#lem-dist]]，没有 DFA 识别 $B$。
:::
:::

这个论证很短，而且如我们将看到的，只要语言不是正则的，它总能奏效。唯一的困难是选出那个无穷串族。经典的替代工具是泵引理。

## 泵引理

一个有 $p$ 个状态的 DFA 读入长度至少为 $p$ 的串时，会访问 $p + 1$ 个状态（把开始状态也算上），于是由鸽笼原理必有某个状态被访问两次。两次访问之间读入的那段输入把机器带过一个圈，而这个圈可以被走任意多遍——包括零遍——而不改变结果。

::: theorem 正则语言的泵引理 {#thm-pumping}
若 $L$ 是正则语言，则存在数 $p \ge 1$（**泵长度**），使得每个满足 $\lvert s\rvert \ge p$ 的串 $s \in L$ 都可写成 $s = xyz$，其中

1. $\lvert y\rvert \ge 1$；
2. $\lvert xy\rvert \le p$；并且
3. 对每个 $i \ge 0$，$xy^iz \in L$。
:::

::: proof
设 $M = (Q, \Sigma, \delta, q_0, F)$ 是识别 $L$ 的 DFA，取 $p = \lvert Q\rvert$。取 $s = a_1 a_2 \cdots a_n \in L$ 且 $n \ge p$，令 $r_j = \hat\delta(q_0, a_1 \cdots a_j)$（$0 \le j \le n$）为其运行轨迹；$r_n \in F$。在 $p + 1$ 个状态 $r_0, r_1, \dots, r_p$ 中必有两个相等，因为状态只有 $p$ 个：设 $r_j = r_k$，其中 $0 \le j < k \le p$。令

$$
x = a_1 \cdots a_j, \qquad y = a_{j+1} \cdots a_k, \qquad z = a_{k+1} \cdots a_n.
$$

则 $\lvert y\rvert = k - j \ge 1$ 且 $\lvert xy\rvert = k \le p$。记 $q = r_j = r_k$，则 $\hat\delta(q_0, x) = q$，$\hat\delta(q, y) = q$，$\hat\delta(q, z) = r_n \in F$。由 [[theory-of-computation/finite-automata#lem-compose]] 以及对 $i$ 归纳，$\hat\delta(q, y^i) = q$ 对每个 $i \ge 0$ 成立，于是 $\hat\delta(q_0, xy^iz) = \hat\delta(\hat\delta(\hat\delta(q_0, x), y^i), z) = \hat\delta(q, z) \in F$。故 $xy^iz \in L$。
:::

泵引理是一条量词交替命题，要用对它就须尊重这些量词。把它写开：

$$
L \text{ 正则} \implies \exists p \ge 1\ \forall s \in L,\ \lvert s\rvert \ge p\ \ \exists x,y,z \ \bigl(s = xyz,\ \lvert y\rvert \ge 1,\ \lvert xy\rvert \le p,\ \forall i \ge 0:\ xy^iz \in L\bigr).
$$

要证明 $L$ *不*正则，就证明右端的否定（见 [Maths Atlas：量词](/learn/maths/lesson.php?c=proofs&l=quantifiers)）：

$$
\forall p \ge 1\ \exists s \in L,\ \lvert s\rvert \ge p\ \ \forall x,y,z \text{ 满足 } s = xyz,\ \lvert y\rvert \ge 1,\ \lvert xy\rvert \le p\ \ \exists i \ge 0:\ xy^iz \notin L.
$$

不妨把它想成一场与对手对弈的游戏。对手挑 $p$。**你**挑一个长度至少为 $p$ 的串 $s \in L$——这是你的选择，也是唯一需要巧妙的地方。对手把 $s$ 拆成 $s = xyz$，须遵守两个长度条件。**你**挑 $i$ 并证明 $xy^iz \notin L$。你必须对*每个* $p$ 和*每个*合法拆分都取胜；你有权选择 $s$ 和 $i$。

::: example 泵 $0^n1^n$ {#ex-pump-0n1n}
用泵引理证明 $B = \{0^n1^n : n \ge 0\}$ 不是正则的。
::: solution
设 $B$ 正则，泵长度为 $p$。取 $s = 0^p1^p \in B$，其长度 $2p \ge p$。考虑任一满足 $\lvert xy\rvert \le p$ 且 $\lvert y \rvert \ge 1$ 的拆分 $s = xyz$。由于 $s$ 的前 $p$ 个符号都是 $0$，$x$ 与 $y$ 只由 $0$ 组成：$y = 0^k$，$k \ge 1$。取 $i = 2$：$xy^2z = 0^{p+k}1^p$ 的 $0$ 比 $1$ 多，故不属于 $B$。这与泵引理矛盾，所以 $B$ 不是正则的。

$s$ 的选取很要紧。若取 $s = 0^{\lceil p/2\rceil}1^{\lceil p/2 \rceil}$，对手可以选 $y = 01$，泵 $y$ 不改变两种符号的数目——结果 $0\cdots0(01)^i1\cdots1$ 当 $i \ge 2$ 时不在 $B$ 中，但这需要另外分情形讨论。选取 $s$ 使得条件 $\lvert xy\rvert \le p$ 把 $y$ 钉死在单个块内，可以省去这番功夫。
:::
:::

::: example 平方串与向上泵 {#ex-pump-square}
证明 $Q = \{0^{n^2} : n \ge 0\}$（长度为完全平方数的 $0$ 串）不是正则的。
::: solution
设 $Q$ 正则，泵长度为 $p$，取 $s = 0^{p^2}$。在任何合法拆分中 $y = 0^k$，$1 \le k \le p$。于是 $xy^2z = 0^{p^2 + k}$，且

$$
p^2 < p^2 + k \le p^2 + p < p^2 + 2p + 1 = (p+1)^2.
$$

所以 $p^2 + k$ 严格介于两个相邻平方数之间，不是平方数：$xy^2z \notin Q$，矛盾。（引理还告诉我们更多：一元正则语言的串长集合是*最终周期*的，而平方数之间的间隔却无界地增大。）
:::
:::

::: example 向下泵 {#ex-pump-down}
证明 $D = \{0^i1^j : i > j \ge 0\}$ 不是正则的。
::: solution
设 $D$ 正则，泵长度为 $p$，取 $s = 0^{p+1}1^p \in D$。任何合法拆分都有 $y = 0^k$，$k \ge 1$，落在前 $p$ 个符号之内。*向上*泵没有用：添加 $0$ 之后仍有 $i > j$。改为*向下*泵，取 $i = 0$：$xz = 0^{p+1-k}1^p$ 至多有 $p$ 个 $0$ 而恰有 $p$ 个 $1$，故 $p + 1 - k \le p = j$，从而 $xz \notin D$。矛盾。
:::
:::

::: quiz
一名学生按如下方式证明 $\{0^n1^n\}$ 不是正则的：“设 $p$ 为泵长度，$s = 0^p1^p$。把 $s$ 拆成 $x = \varepsilon$，$y = 0^p$，$z = 1^p$。则 $xy^2z = 0^{2p}1^p \notin L$。”这里错在哪里？
- [ ] 串 $s$ 太短了。
- [x] 拆分是学生自己选的；证明必须对每个合法拆分都成立。
- [ ] $i = 2$ 不允许，只允许 $i = 0$。
- [ ] 没有错。
::: solution
$x, y, z$ 应由对手来选。说明*某一个*拆分失败毫无意义：引理只保证存在*某个*可行拆分。补救办法见 [[#ex-pump-0n1n]]：对所有满足 $\lvert xy\rvert \le p$ 且 $\lvert y \rvert \ge 1$ 的拆分进行论证，这些拆分都有 $y = 0^k$。
:::
:::

::: warning 泵引理是必要条件而非充分条件
每个正则语言都满足泵条件，但一些非正则语言同样满足：对每个足够长的串都能“泵”成功并不能证明什么。例如令

$$
L = \{a^i b^j c^k : i, j, k \ge 0, \text{ 且若 } i = 1 \text{ 则 } j = k\}.
$$

取 $p = 2$，每个足够长的串都可以泵：若 $i = 0$ 或 $i \ge 3$，取 $y$ 为首符号（泵之后保持 $i \ne 1$，或使 $i = 0$，或在 $i = 0$ 时可随意泵 $b$ 或 $c$）；若 $i = 2$，取 $y = aa$（于是 $i$ 变为 $0, 2, 4, \dots$，永远不是 $1$）；若 $i = 1$，取 $y = a$（于是 $i$ 变为 $0, 1, 2, \dots$，而在 $i = 1$ 的情形串就是原来的串）。然而 $L$ 不是正则的：若它正则，则 $L \cap ab^*c^* = \{ab^jc^j : j \ge 0\}$ 也正则，而串 $ab^j$ 两两可区分。当泵不出矛盾时，试试区分串或封闭性。
:::

## 利用封闭性的证明

封闭性（[[theory-of-computation/finite-automata#thm-union-intersection]]，[[theory-of-computation/nondeterminism]]）能把一个非正则性证明放大成许多个。若 $L$ 正则而 $R$ 正则，则 $L \cap R$、$\overline{L}$、$L^R$ 以及 $L$ 在正则运算下的任何像都是正则的；所以其中任何一个已知非正则，$L$ 就非正则。

- $E = \{w \in \{0,1\}^* : w \text{ 中 } 0 \text{ 与 } 1 \text{ 的个数相等}\}$ 不是正则的，因为 $E \cap 0^*1^* = \{0^n1^n\}$。
- 平衡括号串的语言不是正则的，因为它与 $(^*)^*$ 的交是 $\{(^n)^n\}$，而这不过是改换了记号的 $\{0^n1^n\}$。
- $\overline{\{0^n1^n\}}$ 不是正则的，因为正则语言对补运算封闭。

这个方法只朝一个方向有效。两个非正则语言的并或交*可以*是正则的：$\{0^n1^n\} \cup \overline{\{0^n1^n\}} = \Sigma^*$。

## Myhill–Nerode 定理

关系 $\equiv_L$ 是 $\Sigma^*$ 上的一个**等价关系**——自反、对称、传递，凡是“对所有 $z$ 当且仅当”式的关系都是如此（见 [Maths Atlas：关系](/learn/maths/lesson.php?c=proofs&l=relations)）。它的等价类把识别器可以一视同仁的前缀归并在一起。它还是**右不变**的：若 $x \equiv_L y$，则对每个符号 $a$ 都有 $xa \equiv_L ya$，因为任何区分 $xa$ 与 $ya$ 的 $z$ 都会给出区分 $x$ 与 $y$ 的 $az$。$\equiv_L$ 的**指数**是其等价类的个数（可以无穷）。

::: theorem Myhill–Nerode 定理 {#thm-myhill-nerode}
语言 $L \subseteq \Sigma^*$ 正则当且仅当 $\equiv_L$ 有有限指数。此时等价类的个数等于识别 $L$ 的最小 DFA 的状态数。
:::

::: proof
*($\Rightarrow$)* 设 $M$ 是有 $k$ 个状态、识别 $L$ 的 DFA。从 $\equiv_L$ 的每个等价类中各取一个串，得到两两可区分的串族，故由 [[#lem-dist]] 至多有 $k$ 个类。特别地，指数不超过 $L$ 的*任何* DFA 的状态数。

*($\Leftarrow$)* 设 $\equiv_L$ 有 $k$ 个类，用 $[x]$ 表示 $x$ 的类。定义 $M_L = (Q, \Sigma, \delta, q_0, F)$ 为

$$
Q = \{[x] : x \in \Sigma^*\}, \quad \delta([x], a) = [xa], \quad q_0 = [\varepsilon], \quad F = \{[x] : x \in L\}.
$$

这些定义与代表的选取无关：若 $[x] = [y]$，则由右不变性 $[xa] = [ya]$，且 $x \in L \iff y \in L$（取 $z = \varepsilon$）。对 $\lvert w\rvert$ 归纳可证 $\hat\delta([\varepsilon], w) = [w]$：对 $\varepsilon$ 成立，且 $\hat\delta([\varepsilon], wa) = \delta([w], a) = [wa]$。于是 $M_L$ 接受 $w$ 当且仅当 $[w] \in F$ 当且仅当 $w \in L$。$M_L$ 是有 $k$ 个状态、识别 $L$ 的 DFA。

合并两半：$L$ 的每个 DFA 至少有 $k$ 个状态，而 $M_L$ 恰有 $k$ 个，故最小值为 $k$。
:::

这个定理给出了证明非正则性的*完备*方法——语言非正则恰好当存在无穷多个两两可区分的串——并且它告诉我们最小 DFA 长什么样：它的状态*就是* $\equiv_L$ 的等价类。还可以进一步证明，$L$ 的每个状态数最少的 DFA 都是把 $M_L$ 的状态改名得到的：最小 DFA **在同构意义下唯一**。（证明概要：在最小 DFA $M$ 中每个状态都可达，故每个状态 $q$ 都形如 $\hat\delta(q_0, x)$；令 $q \mapsto [x]$。到达同一状态的串不可区分，故此映射定义良好；构造保证它是满射，而两边都有 $k$ 个元素，故它也是单射，从而是双射；并且它保持转移和接受状态。）

::: example 数等价类 {#ex-classes}
求 $L = \{w \in \{0,1\}^* : w \text{ 以 } 01 \text{ 结尾}\}$ 的 $\equiv_L$ 等价类，并由此给出最小 DFA 的状态数。
::: solution
前缀 $x$ 唯一要紧的是它已经提供了结尾 $01$ 的多少部分。考虑三个类：$C_2$，以 $01$ 结尾的串；$C_1$，以 $0$ 结尾的串；$C_0$，其余所有（$\varepsilon$、$1$ 以及以 $11$ 结尾的串）。同一类内所有串的表现完全相同：对 $x \in C_1$，$xz \in L$ 当且仅当 $z = 1$ 或 $z$ 以 $01$ 结尾；对 $x \in C_2$，$xz \in L$ 当且仅当 $z = \varepsilon$ 或 $z$ 以 $01$ 结尾；对 $x \in C_0$，$xz \in L$ 当且仅当 $z$ 以 $01$ 结尾。$z$ 的这些条件只依赖于类，故同类中的串等价。不同类中的串可被区分：$z = \varepsilon$ 把 $C_2$ 与其他类分开，$z = 1$ 把 $C_1$ 与 $C_0$ 分开。所以恰有三个等价类，最小 DFA 有三个状态——即 [[theory-of-computation/regular-expressions]] 图中那个 DFA。
:::
:::

::: quiz
对 $L = \{0^n1^n : n \ge 0\}$，$\equiv_L$ 有几个等价类？举出其中几个。
- [ ] $2$ 个：$L$ 和它的补。
- [ ] $3$ 个
- [x] 无穷多个，例如每个 $k$ 对应 $[0^k]$，外加一个包含 $10$ 的“死”类。
::: solution
串 $0^k$ 两两可区分（用 $1^k$ 区分），所以类 $[0^k]$ 两两不同。像 $10$ 或 $0110$ 这样根本无法延拓成 $L$ 中串的串构成又一个类。（还有别的类：$1 \le j \le k$ 时的 $[0^k1^j]$，其中 $0^k1^j \equiv_L 0^{k-j+1}1$。）指数无穷：不是正则的。
:::
:::

## DFA 的最小化

Myhill–Nerode 定理说明最小 DFA 存在；下面从任一给定 DFA $M = (Q, \Sigma, \delta, q_0, F)$ 把它算出来。$M$ 比必要规模更大只可能有两种原因。某些状态可能从 $q_0$ **不可达**；它们可以删去。还有些可达状态可能**等价**：被任何后续输入都无法区分。

::: definition 等价状态 {#def-state-equiv}
DFA 的状态 $p, q$ 称为**等价**的，记 $p \approx q$，若对每个 $z \in \Sigma^*$，$\hat\delta(p, z) \in F \iff \hat\delta(q, z) \in F$。若这对所有满足 $\lvert z\rvert \le k$ 的 $z$ 成立，则称 $p, q$ 是 **$k$-等价**的，记 $p \approx_k q$。
:::

$p \approx_0 q$ 只是说 $p$ 与 $q$ 同为接受状态或同为非接受状态。而 $p \approx_{k+1} q$ 成立当且仅当 $p \approx_k q$ 且对每个符号 $a$ 有 $\delta(p, a) \approx_k \delta(q, a)$——因为长度不超过 $k + 1$ 的串要么较短（$\le k$），要么是一个符号后面接一个长度不超过 $k$ 的串。这个递归关系本身就是一个算法。

::: algorithm Moore 的分割细化 {#alg-moore}
1. 删去所有从 $q_0$ 不可达的状态（图搜索）。
2. 取初始分割 $P_0 = \{F, Q \setminus F\}$（空的块舍去）。
3. 对 $k = 0, 1, 2, \dots$ 反复执行：当且仅当 $p$ 与 $q$ 在 $P_k$ 的同一块中，并且对每个 $a \in \Sigma$，$\delta(p, a)$ 与 $\delta(q, a)$ 在 $P_k$ 的同一块中时，把 $p$ 与 $q$ 放入 $P_{k+1}$ 的同一块。当 $P_{k+1}$ 与 $P_k$ 块数相同时停止。
4. 输出**商** DFA：每块一个状态；$q$ 所在的块读 $a$ 转移到 $\delta(q, a)$ 所在的块；开始状态是 $q_0$ 所在的块；接受状态是包含于 $F$ 的块。
:::

::: theorem 最小化的正确性 {#thm-minimise}
[[#alg-moore]] 至多经过 $\lvert Q\rvert - 1$ 轮细化便停止；其最终分割恰是把可达状态按 $\approx$ 类划分得到的分割；商 DFA 识别 $L(M)$ 且为最小。
:::

::: proof
对 $k$ 归纳，$P_k$ 的块恰是 $\approx_k$ 的类：$k = 0$ 时成立，而第 3 步正是实现了上面关于 $\approx_{k+1}$ 的递归。每个 $P_{k+1}$ 都细化 $P_k$。若某轮没有分裂任何块，则 $P_{k+1} = P_k$，于是（因为 $P_{k+2}$ 由 $P_{k+1}$ 计算的方式与 $P_{k+1}$ 由 $P_k$ 计算完全相同）此后每个分割都相同；故 $\approx_k = \approx_{k+1} = \approx_{k+2} = \cdots$，凡在所有长度上等价的两个状态就等价：$P_k$ 就是按 $\approx$ 类的划分。只要算法仍在继续，每轮都使块数至少增加 $1$，而块数从至少 $1$ 开始、从不超过 $\lvert Q\rvert$，故分裂轮数至多 $\lvert Q\rvert - 1$。

商 DFA 定义良好：若 $p \approx q$，则 $\delta(p, a) \approx \delta(q, a)$（后继的一个区分串 $z$ 就给出 $p, q$ 的区分串 $az$），且 $p, q$ 同为接受或同非接受。对串归纳，商 DFA 在 $w$ 上的运行恰好访问 $M$ 运行所经状态所在的块，故它恰接受 $L(M)$。

最小性：商 DFA 的每个状态都可达（不可达状态已删），故每块都被某个串到达；两个不同块中含不等价的状态 $p, q$，若 $x$ 到达 $p$ 而 $y$ 到达 $q$，则分离 $p$ 与 $q$ 的 $z$ 就关于 $L$ 区分了 $x$ 与 $y$。于是商 DFA 的状态对应于两两可区分的串族，由 [[#lem-dist]]，$L$ 的 DFA 没有更小的。
:::

对“签名”作哈希处理，Moore 算法每轮代价为 $O(\lvert Q\rvert \lvert\Sigma\rvert)$，故最坏情况总代价为 $O(\lvert Q\rvert^2 \lvert\Sigma\rvert)$。约翰·霍普克罗夫特（Hopcroft）1971 年的算法细化得更巧妙——总是拿块中较小的一半来分裂——运行时间为 $O(\lvert Q\rvert\,\lvert\Sigma\rvert \log \lvert Q\rvert)$。下面是 Moore 版本的实现：

```python
def minimise(states, sigma, delta, start, accept):
    """Moore 算法：细化 {F, Q-F} 直到没有块再分裂."""
    reach, todo = {start}, [start]           # 1. 删去不可达状态
    while todo:
        q = todo.pop()
        for a in sigma:
            if delta[q, a] not in reach:
                reach.add(delta[q, a]); todo.append(delta[q, a])
    block = {q: (q in accept) for q in reach}            # 2. 初始划分
    rounds = 0
    while True:
        rounds += 1
        # 签名：自己所在的块加上所有后继所在的块
        sig = {q: (block[q],) + tuple(block[delta[q, a]] for a in sigma) for q in reach}
        ids = {s: i for i, s in enumerate(sorted(set(sig.values()), key=str))}
        new = {q: ids[sig[q]] for q in reach}
        if len(set(new.values())) == len(set(block.values())):
            break                            # 没有块分裂：已稳定
        block = new
    classes = {}
    for q in sorted(reach):
        classes.setdefault(block[q], []).append(q)
    return list(classes.values()), rounds

# 一个识别“1 的个数能被 3 整除”的 6 状态 DFA，故意写得很浪费
delta = {}
for q in range(6):
    delta[q, "0"] = q                        # 读 0 保持计数
    delta[q, "1"] = (q + 1) % 6              # 模 6 统计 1 的个数
delta[6, "0"] = delta[6, "1"] = 0            # 状态 6 不可达
classes, rounds = minimise(range(7), "01", delta, 0, {0, 3, 6})
print(classes, "after", rounds, "rounds")
```

```console
$ python3 minimise.py
[[0, 3], [1, 4], [2, 5]] after 2 rounds
```

::: example 手工最小化 {#ex-minimise}
对上面程序中的 DFA 运行 [[#alg-moore]]：状态 $0$–$6$，读 $1$ 时 $q$ 移到 $(q + 1) \bmod 6$（$q \le 5$），读 $0$ 自环，状态 $6$（不可达）移到 $0$，且 $F = \{0, 3, 6\}$。
::: solution
*第 1 步。* 从 $0$ 出发可到达 $1, 2, 3, 4, 5$；状态 $6$ 不可达，删去。

*第 2 步。* $P_0 = \bigl\{\{0, 3\}, \{1, 2, 4, 5\}\bigr\}$。

*第 1 轮。* 读 $0$ 时每个状态原地不动，故只需看读 $1$ 的后继。在 $\{0, 3\}$ 中：$0 \to 1$，$3 \to 4$，都在非接受块——不分裂。在 $\{1, 2, 4, 5\}$ 中：$1 \to 2$（非接受），$2 \to 3$（接受），$4 \to 5$（非接受），$5 \to 0$（接受）。于是它分裂为 $\{1, 4\}$ 和 $\{2, 5\}$。$P_1 = \bigl\{\{0,3\}, \{1,4\}, \{2,5\}\bigr\}$。

*第 2 轮。* $\{0,3\}$：读 $1$ 的后继是 $1, 4$，同块。$\{1, 4\}$：后继 $2, 5$，同块。$\{2, 5\}$：后继 $3, 0$，同块。不分裂；停止。

商 DFA 有三个状态——“$1$ 的个数模 $3$ 为 $0$、$1$、$2$”——并且是最小的。原机器模 $6$ 计数，白白多记了一个语言从不用到的信息位（$\lfloor \#1/3 \rfloor$ 的奇偶性）。
:::
:::

::: widget graph
nodes: q0@0,1; q1@1.7,2; q2@3.4,2; q3@5.1,1; q4@3.4,0; q5@1.7,0
edges: q0>q0:0; q0>q1:1; q1>q1:0; q1>q2:1; q2>q2:0; q2>q3:1; q3>q3:0; q3>q4:1; q4>q4:0; q4>q5:1; q5>q5:0; q5>q0:1
algorithm: none
caption: [[#ex-minimise]] 中那个浪费的六状态 DFA；$q_0$ 与 $q_3$ 是接受状态。等价的状态位于环上彼此相对的位置：$q_0 \approx q_3$，$q_1 \approx q_4$，$q_2 \approx q_5$。把六边形对折，就得到三状态的最小 DFA。不妨对着这张图在脑中跑一遍 Moore 算法：一轮之后三对状态分开，两轮之后一切不变。
:::

::: application 等价关系与作为规范形式的极小 DFA
由于最小 DFA 在状态改名下唯一，它是正则语言的一个**规范形式**：两个正则表达式或自动机描述同一个语言，当且仅当它们的最小 DFA 在状态按规范方式编号（例如从开始状态按广度优先次序、符号按固定次序）之后完全相同。比较规格说明、缓存已编译的模式、或者检查重构后的词法分析器行为不变的工具，用的正是这一点。代价是确定化可能引起的指数膨胀。
:::

::: history
阿尼尔·涅罗德（Nerode）在论文“Linear automaton transformations”（1958）中发表了用等价类作出的刻画；约翰·迈希尔（Myhill）早在 1957 年的一份报告中就一个双侧同余证明了密切相关的结果，故该定理以两人命名。爱德华·摩尔（Moore）的“Gedanken-experiments on sequential machines”（1956）提出了通过对机器输入做实验来区分其状态的分割细化思想，大卫·哈夫曼（Huffman）（1954）最小化了时序电路。约翰·霍普克罗夫特（Hopcroft）的 $n \log n$ 最小化算法发表于 1971 年。正则语言的泵引理通常归于耶霍舒亚·巴尔-希勒尔（Bar-Hillel）、米哈·珀尔斯（Perles）与埃利·沙米尔（Shamir）（1961），他们那篇关于短语结构文法的论文同时也包含 [[theory-of-computation/pushdown-automata]] 中上下文无关语言的泵引理；其中反复出现状态的鸽笼原理式论证，在拉宾（Rabin）与斯科特（Scott）（1959）的论文里已经出现。
:::

## 后续内容

像 $\{0^n1^n\}$、平衡括号串和 $\{ww^R\}$ 这样的语言之所以非正则，是因为它们需要无界内存——但只是后进先出这种特殊形态的内存。[[theory-of-computation/context-free-grammars]] 用递归文法刻画它们，[[theory-of-computation/pushdown-automata]] 用一个栈来识别它们，并为这个更大的类证明一条泵引理。而 $\{ww\}$ 和 $\{0^n1^n2^n\}$ 这样的语言连这个类都不属于，需要 [[theory-of-computation/turing-machines]] 的全部威力。

::: summary
- 若某个后续输入使两个串恰有一个属于 $L$，则它们**可被** $L$ **区分**；可区分的串需要不同的 DFA 状态（[[#lem-dist]]）。无穷多个两两可区分的串证明非正则性。
- **泵引理**（[[#thm-pumping]]）：在泵长度为 $p$ 的正则语言中，每个 $\lvert s\rvert \ge p$ 的 $s \in L$ 都可拆成 $xyz$，满足 $\lvert y\rvert \ge 1$、$\lvert xy\rvert \le p$，且对所有 $i \ge 0$ 有 $xy^iz \in L$。使用它时，$s$ 和 $i$ 由*你*选；你必须处理*每个*合法拆分。
- 泵引理对正则性是必要而非充分的；与正则语言求交这一封闭性常能简化证明。
- **Myhill–Nerode**（[[#thm-myhill-nerode]]）：$L$ 正则当且仅当 $\equiv_L$ 只有有限多个等价类，而等价类的个数就是最小 DFA 的状态数，最小 DFA 在改名下唯一。
- **最小化**（[[#alg-moore]]，[[#thm-minimise]]）：删去不可达状态，然后细化 $\{F, Q \setminus F\}$ 直到稳定，并把每块合并为一个状态。Moore 算法为 $O(n^2\lvert\Sigma\rvert)$，霍普克罗夫特算法为 $O(n\lvert\Sigma\rvert\log n)$。
:::

## 习题

::: exercise 泵长度 {level=1}
(a) $L = \{0\}^*$，(b) $L = \{01\}$，(c) $L = 0^*1$ 的最小泵长度各是多少？简要说明理由。
::: solution
(a) $p = 1$：每个非空串 $0^n$ 都可以在开头取 $y = 0$ 来拆分，泵之得 $0^{n - 1 + i} \in L$。（按定义 $p$ 至少为 $1$。）
(b) $p = 3$：$L$ 中没有长度 $\ge 3$ 的串，条件空真成立；若 $p = 2$，串 $01$ 就必须能泵，而仅有的合法拆分是 $y = 0$ 或 $y = 01$（此时 $x = \varepsilon$）以及 $y = 1$（此时 $x = 0$）；向下泵得 $1$、$\varepsilon$ 或 $0$，没有一个属于 $L$。
(c) $p = 2$：串 $0^n1$（$n \ge 1$）可取 $y = 0$ 来泵。若 $p = 1$，串 $1 \in L$ 就得能取 $y = 1$ 泵，得到 $\varepsilon \notin L$。
:::
:::

::: exercise 一个语言的等价类 {level=1 check="6"}
$\{a\}$ 上长度能被 $2$ 或被 $3$ 整除的串的语言，其最小 DFA 有多少个状态？（填入数字。）
::: solution
$a^n$ 是否属于该语言只取决于 $n \bmod 6$，故至多有 $6$ 个类：$[a^0], \dots, [a^5]$。它们两两可区分：对 $0 \le i < j \le 5$，寻找 $z = a^t$ 使 $i + t$、$j + t$ 中恰有一个能被 $2$ 或 $3$ 整除。$L$ 中的剩余类是 $\{0, 2, 3, 4\}$，不在 $L$ 中的是 $\{1, 5\}$；平移 $t$ 之后，除非 $i \equiv j \pmod 6$，否则存在 $t$ 使 $i$ 与 $j$ 的模式不同（集合 $\{0,2,3,4\}$ 模 $6$ 没有非平凡周期：把它平移 $1, \dots, 5$ 分别得 $\{1,3,4,5\}$、$\{2,4,5,0\}$、$\{3,5,0,1\}$、$\{4,0,1,2\}$、$\{5,1,2,3\}$，都与自身不同）。所以有 $6$ 个类、$6$ 个状态——与 [[theory-of-computation/nondeterminism]] 中的注记相符。
:::
:::

::: exercise 选串 {level=1}
用泵引理证明 $P = \{ww^R : w \in \{0,1\}^*\}$（偶长回文串）不是正则的。
::: solution
设 $P$ 正则，泵长度为 $p$，取 $s = 0^p 1 1 0^p \in P$（取 $w = 0^p1$）。任何满足 $\lvert xy\rvert \le p$ 的拆分都有 $y = 0^k$，$k \ge 1$，位于第一个块内。于是 $xy^2z = 0^{p+k}110^p$ 不是回文串（第一个 $1$ 从左数位于第 $p + k + 1$ 位，从右数却位于第 $p + 1$ 位），故不属于 $P$。矛盾。
:::
:::

::: exercise 素数 {level=2}
证明 $\{0^n : n \text{ 是素数}\}$ 不是正则的。
::: solution
设其正则，泵长度为 $p$。取素数 $n \ge p + 2$，令 $s = 0^n$。任何合法拆分都有 $y = 0^k$，$1 \le k \le p$。取 $i = n - k$：则 $\lvert xy^iz\rvert = (n - k) + ik = (n - k) + (n - k)k = (n - k)(1 + k)$。两个因子都至少为 $2$（$n - k \ge n - p \ge 2$ 且 $1 + k \ge 2$），故长度是合数，$xy^iz \notin L$。矛盾。
:::
:::

::: exercise 正则还是不正则？ {level=2}
判定 $\{0,1\}$ 上下列哪些语言是正则的，并给出证明：(a) $\{0^m1^n : m \ne n\}$；(b) $\{0^m1^n : m + n \text{ 是偶数}\}$；(c) $\{w : w \text{ 中 } 01 \text{ 与 } 10 \text{ 出现的次数相等}\}$。
::: solution
(a) 非正则：其补集与 $0^*1^*$ 的交是 $\{0^n1^n\}$；若 (a) 正则，该交集也将正则。（直接泵这里很别扭——正是封闭性派上用场的场合。）
(b) 正则：$m + n$ 为偶数当且仅当 $m$ 与 $n$ 同奇偶，故该语言由表达式 $(00)^*(11)^* \mid 0(00)^*1(11)^*$ 描述。
(c) 出人意料地正则：$01$ 出现的次数与 $10$ 出现的次数至多相差一，且两者相等当且仅当 $w$ 为空串或首尾符号相同（每个 $01$ 是一次从 $0$ 的游程到 $1$ 的游程的切换，每个 $10$ 是相反方向的切换，而切换交替出现）。这正是 [[theory-of-computation/finite-automata]] 中首尾符号相同串的那道习题的语言（那里 $a, b$ 对应这里的 $0, 1$），再加上 $\varepsilon$——正则。
:::
:::

::: exercise 跑一遍最小化器 {level=2 check="3"}
对 $\{0,1\}$ 上状态为 $A$–$F$、开始状态 $A$、接受状态 $\{C, D, E\}$、转移为 $A: 0{\to}B, 1{\to}C$；$B: 0{\to}A, 1{\to}D$；$C: 0{\to}E, 1{\to}F$；$D: 0{\to}E, 1{\to}F$；$E: 0{\to}E, 1{\to}F$；$F: 0{\to}F, 1{\to}F$ 的 DFA 应用 [[#alg-moore]]。最小 DFA 有多少个状态？（填入数字。）描述它识别的语言。
::: solution
所有状态都可达。$P_0 = \{\{C,D,E\}, \{A,B,F\}\}$。第 1 轮：$\{C, D, E\}$ 中三者的后继都是 $(E, F)$——同块，不分裂。$\{A, B, F\}$ 中：$A \to (B, C)$ =（非接受，接受），$B \to (A, D)$ =（非接受，接受），$F \to (F, F)$ =（非接受，非接受）：分裂为 $\{A, B\}$ 和 $\{F\}$。第 2 轮：$\{A, B\}$：$A \to (B, C)$，$B \to (A, D)$，两者块都是 $(\{A,B\}, \{C,D,E\})$；$\{C, D, E\}$：全为 $(E, F)$，块为 $(\{C,D,E\}, \{F\})$。不分裂。最终分割 $\{A,B\}, \{C,D,E\}, \{F\}$：**3 个状态**。该语言是 $0^*10^*$：任意多个 $0$，恰好一个 $1$，再任意多个 $0$——恰有一个 $1$。
:::
:::

::: exercise $\{0^n1^n\}$ 的 Myhill–Nerode 类 {level=3}
对 $B = \{0^n1^n : n \ge 0\}$，描述 $\equiv_B$ 的所有等价类。对每个类，给出它的**未来** $\{z : xz \in B\}$（类中每个 $x$ 的未来都相同），并证明不同的类有不同的未来。
::: solution
每个串恰属于下列种类之一，其未来如所述。

- $\varepsilon$：未来为 $B$。
- $0^k$，$k \ge 1$：未来为 $\{0^i1^{k+i} : i \ge 0\}$（还可以继续添加 $0$，但随后必须把所有 $0$ 全部闭合）。
- $V_k = \{0^m1^j : j \ge 1,\ m - j = k\}$，$k \ge 0$（已经读到至少一个 $1$，还欠 $k$ 个 $0$ 待闭合）：未来为 $\{1^k\}$，因为 $1$ 之后不允许再出现 $0$。注意 $V_0 = B \setminus \{\varepsilon\}$。
- $D$，其余所有（$1$ 后又出现 $0$，或者前缀 $0^m1^j$ 中 $1$ 比 $0$ 多）：未来为 $\emptyset$。

未来相同的串按 $\equiv_B$ 的定义等价，故每种串都包含在某个类中。不同种类的未来不同，故它们是不同类：$\varepsilon$ 的未来是唯一同时含有 $\varepsilon$ 和 $01$ 的那个；$0^k$ 的未来是无穷集且其最短元素为 $1^k$，故不同的 $k$ 给出不同的未来；$V_k$ 的未来是单个串 $1^k$，随 $k$ 不同而不同，且它有限（不像 $0^k$ 的未来）而非空（不像 $D$ 的未来）。所以等价类为 $\{\varepsilon\}$、每个 $k \ge 1$ 的 $\{0^k\}$、每个 $k \ge 0$ 的 $V_k$，以及 $D$——无穷多个，印证了 $B$ 不是正则的。注意 $0^k$ 与 $0^{k+1}1$ *不*等价，尽管两者都“还欠 $k$ 个 $1$”：$z = 01^{k+1}$ 就区分了它们。
:::
:::

::: exercise 泵引理蕴含最终周期性 {level=3}
设 $L \subseteq \{0\}^*$ 正则。证明长度集合 $N = \{n : 0^n \in L\}$ 是**最终周期**的：存在 $n_0 \ge 0$ 与 $t \ge 1$，使得对所有 $n \ge n_0$，$n \in N \iff n + t \in N$。并由此再次推出 $\{0^{n^2}\}$ 和 $\{0^{2^n}\}$ 不是正则的。
::: solution
设 $M$ 是 $L$ 的一个有 $k$ 个状态的 DFA。在单字母表上，从 $q_0$ 出发的运行是一条单一的路径 $q_0, q_1 = \delta(q_0, 0), q_2, \dots$，而状态只有 $k$ 个，故存在 $0 \le j < j + t \le k$ 使 $q_j = q_{j+t}$。下一状态只依赖当前状态，故对所有 $n \ge j$ 有 $q_{n} = q_{n+t}$。于是取 $n_0 = j$：对 $n \ge n_0$，$0^n \in L \iff q_n \in F \iff q_{n+t} \in F \iff 0^{n+t} \in L$。

对平方数：若 $N = \{n^2\}$ 以 $t$ 为周期最终周期，则对充分大的平方数 $m^2 \ge n_0$ 也有 $m^2 + t \in N$；但当 $m > t/2$ 时，$m^2$ 之后的下一个平方数是 $m^2 + 2m + 1 > m^2 + t$，故 $m^2 + t$ 不是平方数。矛盾。对 $2$ 的幂：在最终周期的无穷集合中，相邻元素之间的间隔有界（在 $n_0$ 之后不超过 $t$），但间隔 $2^{n+1} - 2^n = 2^n$ 无界。
:::
:::
