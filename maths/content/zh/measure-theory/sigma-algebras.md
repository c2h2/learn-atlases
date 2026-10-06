[[real-analysis/riemann-integral]]一章中的黎曼积分是一套优美的理论，但它有三个严重的缺陷。

**它在取极限时很脆弱。**把$[0, 1]$中的有理数排成$q_1, q_2, q_3, \dots$，令$f_n$为在$q_1, \dots, q_n$处取值$1$、在其他点处取值$0$的函数。每个$f_n$只在有限个点处不等于$0$，所以它黎曼可积，且$\int_0^1 f_n = 0$。这个函数列是递增的，它的逐点极限是狄利克雷（Dirichlet）函数$D$：$D$在有理数处取值$1$，在其他点处取值$0$——而它根本没有黎曼积分（[[real-analysis/riemann-integral#ex-dirichlet-integral]]）。然而显而易见的答案应当是$\int_0^1 D = 0$：$D$只在有理数集上不为零，而有理数集是可数集，在任何意义下都可以忽略不计。

**它不能度量集合。**$[0, 1]$中有理数集的长度是多少？十进制展开中不出现数字$7$的数所成之集的长度又是多少？积分是面积，而面积是由长度构造出来的；要对怪异的函数求积分，就需要度量怪异的集合。

**它不是处理概率的合适工具。**“一枚均匀的硬币无休止地抛掷下去，出现正面的极限频率为$\tfrac12$”，这是关于一个由无穷多次抛掷所定义的事件的命题。要赋予它一个概率，就需要为那些由较简单的事件经**可数**并与可数交构造出来的事件指定概率。

::: widget cantor
mode: rationals
size: 8
caption: 之字形枚举把每个正有理数恰好列出一次（跳过诸如$2/4 = 1/2$这样的重复）。限制在$[0, 1]$上，这样的一个列表$q_1, q_2, q_3, \dots$正是把狄利克雷函数构造为一列黎曼积分为$0$的函数$f_n$的递增极限所用的工具：每一步多“点亮”一个有理数。可数集在某种意义下是“小”的，黎曼积分察觉不到这一点，测度却能察觉到。
:::

测度论回答了这三个问题。它的第一步（也就是本章的内容）是确定我们要度量哪些集合（**σ-代数**），以及测度必须具有哪些性质（**可数可加性**）。下一章构造最重要的例子——$\R$上的勒贝格测度，并说明我们不能指望度量**每一个**集合；再往后的几章建立积分。

## σ-代数

理想的情况是给$\R$的每个子集都指定一个长度。1905年，维塔利（Vitali）证明了：如果要求长度是平移不变且可数可加的，这就不可能做到（[[measure-theory/lebesgue-measure#thm-vitali]]）。因此我们必须选取一族“可测”集合，它应当对分析中用来构造集合的运算封闭：取补集，以及可数并与可数交。

::: definition σ-代数 {#def-sigma-algebra}
设$X$是一个集合。若由$X$的子集构成的集族$\mathcal{A}$满足下列条件，则称$\mathcal{A}$为$X$上的**σ-代数**：

1. $X \in \mathcal{A}$；
2. 若$A \in \mathcal{A}$，则其补集$A^c = X \setminus A \in \mathcal{A}$；
3. 若$A_1, A_2, A_3, \ldots \in \mathcal{A}$，则$\bigcup_{n=1}^\infty A_n \in \mathcal{A}$。

称$(X, \mathcal{A})$为**可测空间**，并称$\mathcal{A}$的成员为**可测集**。
:::

由此立即得到另外几条封闭性质。$\varnothing = X^c \in \mathcal{A}$。有限并就是从某一项起$A_n = \varnothing$的可数并。由德摩根（De Morgan）律，$\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c \in \mathcal{A}$，所以可以取可数交；并且只要$A$和$B$属于$\mathcal{A}$，$A \setminus B = A \cap B^c$和$A \triangle B = (A\setminus B)\cup(B\setminus A)$也都属于$\mathcal{A}$。简而言之，σ-代数对每次只涉及可数个集合的一切集合运算都封闭。包含$X$、并且只对取补集和**有限**并封闭的集族称为集合的**代数**（集代数）。

::: example 大大小小的σ-代数 {#ex-sigma-algebras}
证明下列每一个都是$X$上的σ-代数：(a) 幂集$\mathcal{P}(X)$；(b) $\set{\varnothing, X}$；(c) $\set{\varnothing, A, A^c, X}$，其中$A \subseteq X$是取定的集合；(d) 当$X = \R$时，由满足“$A$或$A^c$可数”的集合$A$构成的集族$\mathcal{C}$。再证明$\R$中区间（有界或无界）的有限并构成一个代数，但不构成σ-代数。
::: solution
(a)–(c)：直接验证可知，它们对取补集和任意并都封闭。

(d) 由于$\R$的补集$\varnothing$可数，所以$\R \in \mathcal{C}$；而且这个条件关于$A$与$A^c$是对称的。设$A_1, A_2, \ldots \in \mathcal{C}$。若每个$A_n$都可数，则$\bigcup A_n$也可数（可数个可数集的并，[[proofs/cardinality]]）。否则某个$A_m$的补集可数，从而$\bigl(\bigcup_n A_n\bigr)^c \subseteq A_m^c$可数。无论哪种情形，都有$\bigcup A_n \in \mathcal{C}$。

最后，对区间的有限并取补集或作有限并，所得结果仍具有这种形式，所以它们构成一个代数。但每个单点集$\set{q}$都是一个（退化的）区间，而$\Q \cap [0, 1] = \bigcup_n\set{q_n}$是可数个单点集的并，它不是区间的有限并：不含任何无理数的有限个区间之并只由有限个点组成（每个长度为正的区间都含有无理数），而$\Q \cap [0, 1]$是无限集。所以这个代数不是σ-代数。
:::
:::

有意义的σ-代数通常不是通过列出其成员来描述的，而是通过指明它必须包含的少数几个集合来描述。

::: lemma σ-代数的交 {#lem-intersection}
若$\set{\mathcal{A}_i : i \in I}$是由$X$上的σ-代数构成的任意一个非空族，则$\bigcap_{i\in I}\mathcal{A}_i$是$X$上的σ-代数。
:::

::: proof
$X$属于每个$\mathcal{A}_i$。若$A$属于每个$\mathcal{A}_i$，则$A^c$也属于每个$\mathcal{A}_i$；若每个$A_n$都属于每个$\mathcal{A}_i$，则$\bigcup_n A_n$也属于每个$\mathcal{A}_i$。
:::

::: definition 生成的σ-代数 {#def-generated}
对$X$的任一子集族$\mathcal{C}$，**由$\mathcal{C}$生成的σ-代数**定义为

$$
\sigma(\mathcal{C}) = \bigcap\set{\mathcal{A} : \mathcal{A} \text{ 是 } \sigma\text{-代数（在 } X \text{ 上），且 } \mathcal{C} \subseteq \mathcal{A}}.
$$

由[[#lem-intersection]]，它是一个σ-代数（这个族非空，因为它含有$\mathcal{P}(X)$）；它包含$\mathcal{C}$，并且包含于每个包含$\mathcal{C}$的σ-代数之中：它是包含$\mathcal{C}$的**最小**σ-代数。
:::

这个定义并没有给出列出$\sigma(\mathcal{C})$的成员的办法，一般来说也不存在这样的办法。取而代之，我们使用**好集原理**：要证明$\sigma(\mathcal{C})$中的每个集合都具有某一性质，只需证明具有该性质的集合构成一个σ-代数，并且$\mathcal{C}$的每个成员都具有该性质。这样，那个σ-代数包含$\mathcal{C}$，从而包含$\sigma(\mathcal{C})$。例如，由$\R$的单点生成的σ-代数很容易确定。

::: example 由单点生成的σ-代数 {#ex-singletons}
证明由单点集$\set{x}$（$x \in \R$）生成的$\R$上的σ-代数，就是[[#ex-sigma-algebras]](d)中的可数-余可数σ-代数$\mathcal{C}$。
::: solution
**$\sigma(\text{单点集}) \subseteq \mathcal{C}$。**由[[#ex-sigma-algebras]](d)，$\mathcal{C}$是σ-代数，并且它包含每个单点集（单点集是可数的）。由最小性（[[#def-generated]]），$\mathcal{C}$包含由单点集生成的σ-代数。这是好集原理最简单的形式。

**$\mathcal{C} \subseteq \sigma(\text{单点集})$。**可数集$A = \set{a_1, a_2, \dots}$是可数并$\bigcup_n\set{a_n}$，所以它属于每个包含所有单点集的σ-代数；余可数集则是这样一个并的补集。因此这两个σ-代数相等。特别地，这个生成的σ-代数不包含$(0, 1)$（[[#exr-1-5]]）：知道哪些单点属于一个集合，远远谈不上知道这个集合。
:::
:::

::: widget venn
sets: 2
expr: A - B
labels: A; B
caption: 两个集合$A$、$B$把$X$分成四个**原子**：$A \cap B$、$A \setminus B$、$B \setminus A$和$(A \cup B)^c$。输入其他表达式——`(A | B)'`、`A & B'`、`(A - B) | (B - A)`——你会注意到，每个表达式涂出的区域都是若干个完整原子的并。所以$\sigma(\set{A, B})$由原子的全部$2^4 = 16$种并组成（当四个原子都非空时）。
:::

::: quiz
设$A, B \subseteq X$使得四个原子$A\cap B$、$A\setminus B$、$B \setminus A$、$(A\cup B)^c$都非空。$\sigma(\set{A, B})$含有多少个集合？
- [ ] $4$
- [ ] $8$
- [x] $16$
- [ ] 无穷多个
::: solution
原子之并构成一个σ-代数（原子之并的补集与并仍是原子之并），并且它包含$A$和$B$；任何包含$A$和$B$的σ-代数都包含这些原子，从而包含它们的并。所以$\sigma(\set{A, B})$恰好是由原子之并构成的集族：四个原子的每个子集对应一个并，共$2^4 = 16$个。一般地，由$n$个集合生成的σ-代数至多有$2^{2^n}$个成员。
:::
:::

## 博雷尔集

$\R$上最重要的σ-代数是由开集生成的。

::: definition 博雷尔σ-代数 {#def-borel}
**博雷尔（Borel）σ-代数**$\mathcal{B}(\R)$是由$\R$的开子集生成的σ-代数，它的成员称为**博雷尔集**。更一般地，对任一度量空间$X$（[[real-analysis/metric-spaces]]），$\mathcal{B}(X)$是由$X$的开子集生成的σ-代数。
:::

每个开集和每个闭集都是博雷尔集，开集的每个可数交（**$G_\delta$型集**）和闭集的每个可数并（**$F_\sigma$型集**）也都是博雷尔集。可数集是博雷尔集，因为它是可数个闭的单点集的并；所以$\Q$是$F_\sigma$型集，而无理数全体构成一个$G_\delta$型集。还可以继续下去——$G_\delta$型集的可数并，等等——博雷尔集包含了从区间出发经可数步所能构造出的一切集合。即便如此，一个基数论证表明，博雷尔集的个数只与实数一样多，而$\R$的子集比这严格更多；所以$\R$的大多数子集都不是博雷尔集。同样的博雷尔集可以由许多不同的生成族得到。

::: theorem 博雷尔集的生成族 {#thm-borel-generators}
$\mathcal{B}(\R)$可以由下列每一个集族生成：

1. 端点$a < b$为有理数的开区间$(a, b)$；
2. 闭集；
3. 半直线$(-\infty, a]$，$a \in \R$；
4. 半直线$(a, \infty)$，$a \in \R$。
:::

::: proof
**关键事实：每个开集$U \subseteq \R$都是可数个端点为有理数的开区间的并。**设$\mathcal{I}_U$是满足$p < q$为有理数且$(p, q) \subseteq U$的区间$(p, q)$的全体；它是可数的，因为$\Q\times\Q$可数。每个$x \in U$都属于其中某个区间：$U$包含某个$(x - r, x + r)$，由$\Q$的稠密性，可以取有理数$p \in (x - r, x)$和$q \in (x, x + r)$。所以$U = \bigcup\mathcal{I}_U$。

(1) 设$\mathcal{E}_1$是端点为有理数的开区间构成的集族。其中每个区间都是开集，所以$\sigma(\mathcal{E}_1) \subseteq \mathcal{B}(\R)$。反之，由关键事实，每个开集都是$\mathcal{E}_1$中可数个成员的并，所以它属于$\sigma(\mathcal{E}_1)$；因此$\sigma(\mathcal{E}_1)$是包含所有开集的σ-代数，从而$\mathcal{B}(\R) \subseteq \sigma(\mathcal{E}_1)$。

(2) 闭集就是开集的补集，所以一个σ-代数包含所有开集当且仅当它包含所有闭集。

(3) 每个$(-\infty, a]$都是闭集，因而是博雷尔集。反之，在由这些半直线生成的σ-代数$\mathcal{S}$中，

$$
(-\infty, b) = \bigcup_{n=1}^\infty\bigl(-\infty, b - \tfrac1n\bigr] \in \mathcal{S} \qquad\text{且}\qquad (a, b) = (-\infty, b) \cap (-\infty, a]^c \in \mathcal{S},
$$

所以$\mathcal{S}$包含每个开区间，由(1)得$\mathcal{B}(\R) \subseteq \mathcal{S}$。

(4) $(a, \infty) = (-\infty, a]^c$，所以(3)和(4)中的集族生成同一个σ-代数。
:::

生成族(3)在概率论中很重要：随机变量$X$由事件$\set{X \le a}$的概率来描述，而下面的[[#thm-uniqueness]]表明，这些概率决定了所有博雷尔事件的概率。

## 测度

::: definition 测度 {#def-measure}
可测空间$(X, \mathcal{A})$上的**测度**是满足下列条件的函数$\mu\colon \mathcal{A} \to [0, \infty]$：

1. $\mu(\varnothing) = 0$；
2. （**可数可加性**）若$A_1, A_2, \ldots \in \mathcal{A}$两两不相交，则$\mu\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \sum_{n=1}^\infty\mu(A_n)$。

称三元组$(X, \mathcal{A}, \mu)$为**测度空间**。若$\mu(X) < \infty$，则称该测度是**有限**的；若$\mu(X) = 1$，则称它是**概率测度**；若$X$是可数个测度有限的集合的并，则称它是**σ-有限**的。
:::

测度允许取值$\infty$；在求和中我们约定$a + \infty = \infty$，并且各项属于$[0, \infty]$的级数总有一个属于$[0, \infty]$的和（即其部分和的上确界），所以这个定义无需任何收敛性假设就有意义。

::: example 测度的例子 {#ex-measures}
验证下列函数都是测度：(a) $(X, \mathcal{P}(X))$上的**计数测度**，$\#(A) = $集合$A$的元素个数（或$\infty$）；(b) **狄拉克（Dirac）测度**：当$x \in A$时$\delta_x(A) = 1$，否则为$0$；(c) 在$\R$的可数-余可数σ-代数上，若$A$可数则$\mu(A) = 0$，若$A^c$可数则$\mu(A) = 1$。再证明：在$\N$上，定义在由有限集和余有限集构成的代数上、对有限集$A$取$\nu(A) = 0$、对余有限集$A$取$\nu(A) = 1$的函数，对**有限**个互不相交的集合是可加的，但不是可数可加的。
::: solution
(a) 若互不相交的集合$A_n$都是有限集且它们的并是有限集，则两边计数的是同样的元素；若并是无限集，则或者某个$A_n$是无限集，或者有无穷多个$A_n$非空，此时两边都是$\infty$。(b) $x$至多属于互不相交的集合$A_n$中的一个，所以右端等于$1$当且仅当$x \in \bigcup A_n$。

(c) 两个余可数集不可能互不相交：它们的补集都可数，所以这两个补集的并不是整个$\R$（$\R$不可数），从而这两个集合的交非空。因此在两两不相交的集合$A_n \in \mathcal{C}$中，至多有一个是余可数集。若其中没有余可数集，则并是可数集，两边都为$0$；若恰有一个是余可数集，则并是余可数集，两边都为$1$。

关于$\nu$：两个不相交的集合不可能都是余有限集，所以有限可加性可以像(c)那样验证。但$\N = \bigcup_n\set{n}$是可数个有限集的不交并，所以$\nu(\N) = 1 \ne 0 = \sum_n\nu(\set n)$。有限可加性推不出可数可加性。
:::
:::

由这些例子还可以构造出更多的例子：对权$w(x) \ge 0$，有**加权计数测度**$\mu(A) = \sum_{x\in A}w(x)$；有测度在一个固定集合$B \in \mathcal{A}$上的**限制**$\mu_B(A) = \mu(A \cap B)$；还有测度的正倍数以及可数个测度之和。所有测度中最重要的是$\mathcal{B}(\R)$上满足$\lambda((a, b)) = b - a$的**勒贝格测度**，它的构造出人意料地困难，[[measure-theory/lebesgue-measure]]一章专门讨论它。

::: theorem 测度的基本性质 {#thm-measure-properties}
设$(X, \mathcal{A}, \mu)$是测度空间，并设下面出现的集合都属于$\mathcal{A}$。

1. （**有限可加性。**）若$A_1, \dots, A_n$两两不相交，则$\mu(A_1 \cup \cdots \cup A_n) = \mu(A_1) + \cdots + \mu(A_n)$。
2. （**单调性。**）若$A \subseteq B$，则$\mu(A) \le \mu(B)$；若还有$\mu(A) < \infty$，则$\mu(B \setminus A) = \mu(B) - \mu(A)$。
3. （**可数次可加性。**）对任意集合$A_n$，$\mu\bigl(\bigcup_{n=1}^\infty A_n\bigr) \le \sum_{n=1}^\infty\mu(A_n)$。
4. （**容斥原理。**）$\mu(A \cup B) + \mu(A \cap B) = \mu(A) + \mu(B)$。
:::

::: proof
(1) 对$A_1, \dots, A_n, \varnothing, \varnothing, \ldots$应用可数可加性，并利用$\mu(\varnothing) = 0$。

(2) $B$是$A$与$B \setminus A$的不交并，所以$\mu(B) = \mu(A) + \mu(B\setminus A) \ge \mu(A)$；若$\mu(A) < \infty$，可以从两边减去它。

(3) **不交化**：令$B_1 = A_1$，$B_n = A_n \setminus (A_1 \cup \cdots \cup A_{n-1})$。各$B_n$都可测、两两不相交，$B_n \subseteq A_n$，并且$\bigcup_n B_n = \bigcup_n A_n$（并集中的每个点都有它所属的第一个$A_n$，从而属于$B_n$）。由可数可加性和单调性，$\mu\bigl(\bigcup A_n\bigr) = \sum\mu(B_n) \le \sum\mu(A_n)$。

(4) $A \cup B$是$A$与$B\setminus A$的不交并，$B$是$A \cap B$与$B \setminus A$的不交并。所以$\mu(A \cup B) + \mu(A\cap B) = \mu(A) + \mu(B\setminus A) + \mu(A\cap B) = \mu(A) + \mu(B)$。
:::

可数可加性有一个等价的重新表述，它才是坚持要求可数可加性的真正理由：测度与集合的单调极限可以交换次序。

::: theorem 测度的连续性 {#thm-continuity-measure}
设$(X, \mathcal{A}, \mu)$是测度空间。

1. （**下连续性。**）若$A_1 \subseteq A_2 \subseteq \cdots$，则$\mu\bigl(\bigcup_n A_n\bigr) = \lim_{n\to\infty}\mu(A_n)$。
2. （**上连续性。**）若$A_1 \supseteq A_2 \supseteq \cdots$且$\mu(A_1) < \infty$，则$\mu\bigl(\bigcap_n A_n\bigr) = \lim_{n\to\infty}\mu(A_n)$。
:::

::: proof
(1) 令$B_1 = A_1$，并对$n \ge 2$令$B_n = A_n \setminus A_{n-1}$。这些集合互不相交，$A_n = B_1 \cup \cdots \cup B_n$，并且$\bigcup_n A_n = \bigcup_n B_n$。因此

$$
\mu\Bigl(\bigcup_n A_n\Bigr) = \sum_{k=1}^\infty\mu(B_k) = \lim_{n\to\infty}\sum_{k=1}^n\mu(B_k) = \lim_{n\to\infty}\mu(A_n).
$$

(2) 集合$C_n = A_1 \setminus A_n$递增趋于$A_1 \setminus \bigcap_n A_n$。由于所涉及的测度都不超过$\mu(A_1) < \infty$，由[[#thm-measure-properties]]的第(2)部分得$\mu(C_n) = \mu(A_1) - \mu(A_n)$以及$\mu\bigl(A_1 \setminus \bigcap A_n\bigr) = \mu(A_1) - \mu\bigl(\bigcap A_n\bigr)$。由第(1)部分，$\mu(A_1) - \mu\bigl(\bigcap A_n\bigr) = \lim\bigl(\mu(A_1) - \mu(A_n)\bigr)$，消去有限数$\mu(A_1)$即得结论。
:::

::: warning 上连续性要求测度有限
对于$\N$上的计数测度，集合$A_n = \set{n, n+1, n+2, \dots}$递减趋于$\varnothing$，但对每个$n$都有$\mu(A_n) = \infty$，所以$\lim\mu(A_n) = \infty \ne 0 = \mu(\varnothing)$。证明恰好在减去$\mu(A_n) = \infty$的那一步失效。只要**某个**$A_n$的测度有限就够了（让序列从那一项开始），但仅仅极限集的测度有限是不够的。
:::

::: example 永远不出现正面的硬币 {#ex-coin}
把一枚均匀的硬币抛掷无穷多次；假设在与这些抛掷有关的事件上有一个概率测度$P$，满足$P(\text{前 } n \text{ 次抛掷都是反面}) = 2^{-n}$。证明以概率$1$，硬币在某一次抛掷中出现正面。
::: solution
设$A_n$为“前$n$次抛掷都是反面”这一事件。则$A_1 \supseteq A_2 \supseteq \cdots$，而$\bigcap_n A_n$是“每次抛掷都是反面”这一事件。由于$P$是有限测度，由上连续性得$P\bigl(\bigcap A_n\bigr) = \lim 2^{-n} = 0$。所以“从不出现正面”的概率为$0$，“某次出现正面”的概率为$1$。注意，“从不出现正面”并不是不可能的——序列TTT…是一个完全合法的结果——它只是一个**零测**事件。使这类论证变得合法，正是柯尔莫哥洛夫（Kolmogorov）用测度论为概率论奠基的动机之一（[[probability/probability-spaces]]）。
:::
:::

## 零测集与几乎处处

::: definition 零测集、几乎处处、完备性 {#def-null}
设$(X, \mathcal{A}, \mu)$是测度空间。满足$\mu(N) = 0$的集合$N \in \mathcal{A}$称为**零测集**。如果关于点$x \in X$的某一性质不成立的点的全体包含在某个零测集中，就说该性质**几乎处处**成立（记作a.e.，或$\mu$-a.e.）。如果零测集的每个子集都属于$\mathcal{A}$（从而也是零测集），就称该测度空间是**完备**的。
:::

由可数次可加性，可数个零测集的并是零测集。诸如“$f = g$几乎处处成立”或“$f_n \to f$几乎处处成立”这样的命题，是后面几章的家常便饭：积分看不见零测集上发生的事情。每个测度空间都可以**完备化**：形如$A \cup Z$（其中$A \in \mathcal{A}$，$Z$是某个零测集的子集）的集合构成一个σ-代数$\overline{\mathcal{A}}$，而$\bar\mu(A \cup Z) = \mu(A)$是它上面一个良定义的完备测度（[[#exr-1-9]]）。下一章构造的勒贝格测度，就是它在博雷尔集上的限制的完备化。

第一博雷尔-坎泰利（Borel–Cantelli）引理是可数次可加性的一个简单而漂亮的推论。对集合$A_n$，集合

$$
\limsup_{n\to\infty}A_n = \bigcap_{N=1}^\infty\bigcup_{n=N}^\infty A_n = \set{x : x \in A_n \text{ 对无穷多个 } n}
$$

就是事件“$A_n$发生无穷多次”。（一个点对每个$N$都属于$\bigcup_{n\ge N}A_n$，当且仅当它对任意大的$n$属于$A_n$。）

::: theorem 第一博雷尔-坎泰利引理 {#thm-borel-cantelli}
若$\sum_{n=1}^\infty\mu(A_n) < \infty$，则$\mu\bigl(\limsup_n A_n\bigr) = 0$：几乎每个点都只属于集合$A_n$中的有限多个。
:::

::: proof
对每个$N$，$\limsup_n A_n \subseteq \bigcup_{n\ge N}A_n$，所以由单调性和可数次可加性，

$$
\mu\Bigl(\limsup_n A_n\Bigr) \le \sum_{n=N}^\infty\mu(A_n).
$$

右端是一个收敛级数的尾部，所以当$N \to \infty$时它趋于$0$（[[real-analysis/series]]）。因此不依赖于$N$的左端等于$0$。
:::

::: widget sequence
a: 1/n^2
mode: sums
N: 40
limit: pi^2/6
caption: 设事件$A_n$的概率为$1/n^2$。$\sum P(A_n)$的部分和趋于$\pi^2/6$；取$N$项之后，曲线与其极限之间的差距——即尾部$\sum_{n>N}1/n^2 \approx 1/N$——是第$N$个事件之后还有某个事件发生的概率的上界。发生无穷多次的概率不超过每一个这样的尾部，所以它等于$0$。若$P(A_n) = 1/n$，则部分和发散，该引理不能给出任何结论。
:::

这个引理不需要独立性，也不需要关于$A_n$如何相互重叠的任何信息；这正是它的威力所在。（它的一个部分逆命题，即第二博雷尔-坎泰利引理，确实需要独立性：若事件$A_n$相互独立且$\sum P(A_n) = \infty$，则以概率$1$有无穷多个$A_n$发生。）它是证明某件事以概率1只发生有限多次的标准工具——例如证明：在$n$次抛掷中，正面所占的比例最终会一直落在$\tfrac12$的任意给定的$\eps$范围之内；[[probability/limit-theorems]]一章正是这样证明强大数定律的。

::: quiz
对集合序列$A_n$，关于$\limsup_n A_n$的哪个说法是正确的？
- [ ] 它是除有限多个$A_n$之外属于所有$A_n$的点的全体。
- [x] 它是属于无穷多个$A_n$的点的全体。
- [ ] 它就是$\bigcup_n A_n$。
- [ ] 它的测度等于$\limsup_n\mu(A_n)$。
::: solution
$x \in \bigcap_N\bigcup_{n\ge N}A_n$的意思是：对每个$N$，都存在$n \ge N$使$x \in A_n$——即有无穷多个这样的$n$。除有限多个$A_n$之外属于所有$A_n$的点构成的是较小的集合$\liminf A_n = \bigcup_N\bigcap_{n \ge N}A_n$。一般来说$\mu(\limsup A_n)$不等于$\limsup\mu(A_n)$：在以长度为测度的$\R$中取$A_n = [n, n+1]$，每个$\mu(A_n) = 1$，但$\limsup A_n = \varnothing$。
:::
:::

## 两个测度何时相等？

要指定一个测度，我们通常给出它在一个较小的集族上的值——区间的长度，或者概率$P(X \le a)$——并希望这些值能决定它在整个σ-代数上的值。只要这个集族对交运算封闭，情况确实如此。

若$X$的子集族$\mathcal{P}$满足：只要$A, B \in \mathcal{P}$就有$A \cap B \in \mathcal{P}$，则称$\mathcal{P}$为**π-系**。若集族$\mathcal{D}$满足：$X \in \mathcal{D}$；只要$A, B \in \mathcal{D}$且$A \subseteq B$，就有$B \setminus A \in \mathcal{D}$；只要$\mathcal{D}$中的$A_1 \subseteq A_2 \subseteq \cdots$，就有$\bigcup_n A_n \in \mathcal{D}$，则称$\mathcal{D}$为**λ-系**，也称狄金（Dynkin）系。半直线$(-\infty, a]$连同$\varnothing$构成一个π-系；区间$(a, b]$连同$\varnothing$也构成π-系。

::: theorem 狄金π-λ定理 {#thm-pi-lambda}
若$\mathcal{P}$是π-系，$\mathcal{D}$是λ-系，且$\mathcal{P} \subseteq \mathcal{D}$，则$\sigma(\mathcal{P}) \subseteq \mathcal{D}$。
:::

::: proof
**第1步：既是π-系又是λ-系的集族是σ-代数。**它包含$X$；对它的每个成员$A$，它包含$A^c = X\setminus A$；它包含$A \cup B = (A^c \cap B^c)^c$，从而包含所有有限并；而可数并$\bigcup_n A_n$是有限并$A_1 \cup\cdots\cup A_n$的递增并。

**第2步。**λ-系的交仍是λ-系（与[[#lem-intersection]]同理），所以存在包含$\mathcal{P}$的最小λ-系$\mathcal{D}_0$，且$\mathcal{D}_0 \subseteq \mathcal{D}$。我们来证明$\mathcal{D}_0$是π-系。对$A \in \mathcal{D}_0$，令$\mathcal{G}_A = \set{B \subseteq X : A \cap B \in \mathcal{D}_0}$。这是一个λ-系：$A \cap X = A \in \mathcal{D}_0$；若$\mathcal{G}_A$中的$B \subseteq C$，则$A \cap (C\setminus B) = (A\cap C)\setminus(A\cap B)$，其中$A \cap B \subseteq A \cap C$都属于$\mathcal{D}_0$；而递增并与“同$A$取交”可以交换次序。

若$A \in \mathcal{P}$，则由于$\mathcal{P}$是π-系，有$\mathcal{P} \subseteq \mathcal{G}_A$，于是由最小性得$\mathcal{D}_0 \subseteq \mathcal{G}_A$：对所有$A \in \mathcal{P}$和$B \in \mathcal{D}_0$，都有$A \cap B \in \mathcal{D}_0$。反过来读，这就是说：对每个$B \in \mathcal{D}_0$，都有$\mathcal{P} \subseteq \mathcal{G}_B$，从而再由最小性得$\mathcal{D}_0 \subseteq \mathcal{G}_B$：$\mathcal{D}_0$对交运算封闭。

由第1步，$\mathcal{D}_0$是包含$\mathcal{P}$的σ-代数，所以$\sigma(\mathcal{P}) \subseteq \mathcal{D}_0 \subseteq \mathcal{D}$。
:::

::: theorem 测度的唯一性 {#thm-uniqueness}
设$\mu$和$\nu$是$(X, \sigma(\mathcal{P}))$上的测度，其中$\mathcal{P}$是π-系。若对每个$A \in \mathcal{P}$都有$\mu(A) = \nu(A)$，且$\mu(X) = \nu(X) < \infty$，则在整个$\sigma(\mathcal{P})$上$\mu = \nu$。
:::

::: proof
令$\mathcal{D} = \set{A \in \sigma(\mathcal{P}) : \mu(A) = \nu(A)}$。它包含$\mathcal{P}$和$X$。若$\mathcal{D}$中的$A \subseteq B$，则$\mu(B \setminus A) = \mu(B) - \mu(A) = \nu(B) - \nu(A) = \nu(B \setminus A)$，由于测度有限，这里的减法是合法的。若$\mathcal{D}$中的$A_1 \subseteq A_2 \subseteq \cdots$，则由下连续性得$\mu(\bigcup A_n) = \lim\mu(A_n) = \lim\nu(A_n) = \nu(\bigcup A_n)$。所以$\mathcal{D}$是λ-系，由[[#thm-pi-lambda]]得$\sigma(\mathcal{P}) \subseteq \mathcal{D}$。
:::

由此得到两个重要推论。$\R$上的博雷尔概率测度$\mu$由它的**分布函数**$F(a) = \mu((-\infty, a])$决定，因为半直线构成一个生成$\mathcal{B}(\R)$的π-系（[[#thm-borel-generators]]）；这就是为什么在概率论中，随机变量的分布可以用它的累积分布函数来描述（[[probability/continuous-random-variables]]）。此外，只要测度有限的那些部分可以从$\mathcal{P}$中选取，该定理就可以推广到σ-有限测度：若$\mathcal{P}$中的$X_1 \subseteq X_2 \subseteq \cdots$的并为$X$，且$\mu(X_n) < \infty$，则$A \mapsto \mu(A \cap X_n)$与$A \mapsto \nu(A \cap X_n)$是在$\mathcal{P}$上（因为$A \cap X_n \in \mathcal{P}$）和在$X$上都相等的有限测度，因而处处相等；再利用下连续性令$n \to \infty$即可。取$\mathcal{P}$为区间$(a, b]$（连同$\varnothing$）、$X_n = (-n, n]$，就表明$\mathcal{B}(\R)$上至多有一个测度使每个区间的测度等于它的长度。没有这个附加条件，推广就会失败：$\Q$上的计数测度与两倍计数测度都是σ-有限的，它们在每个集合$(a, b]\cap\Q$上都相等，因为这些集合都是无限集或空集。

::: history
埃米尔·博雷尔（Émile Borel）的《函数论讲义》（*Leçons sur la théorie des fonctions*，1898年）提出了这样的想法：为那些从区间出发经可数并和取补集所能得到的集合指定测度；他还坚持要求可数可加性。亨利·勒贝格（Henri Lebesgue）在1902年的博士论文中以此为基础建立了他的积分。1905年，朱塞佩·维塔利（Giuseppe Vitali）证明了并非每个实数集都能有一个平移不变且可数可加的长度；而费利克斯·豪斯多夫（Felix Hausdorff，1914年）的悖论以及斯特凡·巴拿赫（Stefan Banach）和阿尔弗雷德·塔斯基（Alfred Tarski，1924年）的悖论表明，在三维空间中，对任意集合而言，即使只要求有限可加性也办不到。抽象测度空间在20世纪10年代和20年代发展起来；1933年，安德烈·柯尔莫哥洛夫（Andrey Kolmogorov）的《概率论基本概念》（*Grundbegriffe der Wahrscheinlichkeitsrechnung*）把概率论建立在由事件构成的σ-代数和总质量为1的测度之上。π-λ定理可以追溯到瓦茨瓦夫·谢尔品斯基（Wacław Sierpiński，1928年），并在20世纪50年代因叶夫根尼·狄金（Eugene Dynkin）的推介而广为人知。
:::

## 后续内容

我们现在知道了什么是测度，但手头只有一些平凡的例子。[[measure-theory/lebesgue-measure]]一章用区间从外部逼近集合，并利用卡拉泰奥多里（Carathéodory）条件挑选出可测集，由此构造$\R$上的勒贝格测度；该章还证明了维塔利定理：有些集合无法度量。[[measure-theory/measurable-functions]]一章引入与σ-代数相容的函数，[[measure-theory/lebesgue-integral]]一章对它们求积分，测度的连续性（[[#thm-continuity-measure]]）将以单调收敛定理的形式再次出现。在概率论中（[[probability/probability-spaces]]），概率空间就是总质量为1的测度空间，而博雷尔-坎泰利引理是证明强大数定律的一个基本工具。

::: summary
- σ-代数包含$X$，并且对取补集和可数并封闭——从而对一切可数次的集合运算封闭（[[#def-sigma-algebra]]）。测度只定义在σ-代数上，因为并非每个集合都能被度量。
- $\sigma(\mathcal{C})$是包含$\mathcal{C}$的最小σ-代数；关于它的事实可以用好集原理来证明。
- 博雷尔σ-代数由开集生成，同样也可以由开区间、闭集或半直线$(-\infty, a]$生成（[[#thm-borel-generators]]）。
- 测度是满足$\mu(\varnothing) = 0$的可数可加函数；它具有单调性和可数次可加性（[[#thm-measure-properties]]）。
- 测度沿递增集合列是连续的；若某个集合的测度有限，则沿递减集合列也是连续的（[[#thm-continuity-measure]]）。
- 零测集与“几乎处处”：可数个零测集的并是零测集。博雷尔-坎泰利引理：若$\sum\mu(A_n) < \infty$，则几乎每个点都只属于有限多个$A_n$。
- 总测度相同、且在一个π-系上相等的有限测度，在它生成的σ-代数上也相等（[[#thm-uniqueness]]）；$\R$上的概率测度由它的分布函数决定。
:::

## 习题

::: exercise 封闭性质 {level=1}
设$\mathcal{A}$是σ-代数，$A, B, A_1, A_2, \ldots \in \mathcal{A}$。证明$A\setminus B$、$A \triangle B$、$\bigcap_n A_n$以及$\liminf_n A_n = \bigcup_N\bigcap_{n\ge N}A_n$都属于$\mathcal{A}$。
::: solution
$A\setminus B = A \cap B^c = (A^c \cup B)^c \in \mathcal{A}$。$A \triangle B = (A \setminus B)\cup(B\setminus A)$是两个成员的并。$\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c$。最后，每个$\bigcap_{n\ge N}A_n$都属于$\mathcal{A}$，它们的可数并$\liminf_n A_n$也属于$\mathcal{A}$。
:::
:::

::: exercise 集合计数 {level=1 check="256"}
设$A, B, C \subseteq X$是三个集合，它们的八个原子（形如$A^{\pm}\cap B^{\pm}\cap C^{\pm}$的集合，其中$A^+ = A$，$A^- = A^c$）都非空。$\sigma(\set{A, B, C})$中有多少个集合？
::: solution
与前面的小测验一样，$\sigma(\set{A,B,C})$由所有原子之并组成：原子之并构成一个包含$A$、$B$、$C$的σ-代数，而每个包含它们的σ-代数都包含这些原子。八个原子都非空时，共有$2^8 = 256$个并。
:::
:::

::: exercise 狄拉克测度与计数测度 {level=1}
设$x \in X$。证明$\mu = \delta_x + 2\#$（其中$\#$是计数测度）是$\mathcal{P}(X)$上的测度，并对$y \ne x$计算$\mu(\set{x, y})$。
::: solution
测度的和与正倍数仍是测度：$\mu(\varnothing) = 0 + 0 = 0$，并且对互不相交的$A_n$，$\mu(\bigcup A_n) = \delta_x(\bigcup A_n) + 2\#(\bigcup A_n) = \sum\delta_x(A_n) + 2\sum\#(A_n) = \sum\mu(A_n)$，其中把两个非负项级数逐项相加是合法的。于是$\mu(\set{x, y}) = 1 + 2\cdot2 = 5$。
:::
:::

::: exercise 由区间构成的π-系 {level=2}
证明$\mathcal{P} = \set{(a, b] : a < b} \cup \set{\varnothing}$是生成$\mathcal{B}(\R)$的π-系。由此推出：$\mathcal{B}(\R)$上两个在所有区间$(a, b]$上取值相同且总质量相同的有限测度必相等。
::: solution
$(a, b] \cap (c, d] = (\max(a,c), \min(b,d)]$，它或者具有同样的形式，或者是空集，所以$\mathcal{P}$是π-系。每个$(a, b] = (-\infty, b]\cap(-\infty, a]^c$都是博雷尔集，所以$\sigma(\mathcal{P}) \subseteq \mathcal{B}(\R)$。反之，$(a, b) = \bigcup_n(a, b - \tfrac1n]$（对满足$b - \frac1n > a$的$n$取并）属于$\sigma(\mathcal{P})$，所以由[[#thm-borel-generators]]，$\mathcal{B}(\R) \subseteq \sigma(\mathcal{P})$。后一结论就是[[#thm-uniqueness]]。
:::
:::

::: exercise 并非每个博雷尔集都是可数集或余可数集 {level=2}
证明区间$(0, 1)$不属于$\R$上的可数-余可数σ-代数，从而这个σ-代数严格小于$\mathcal{B}(\R)$。
::: solution
$(0, 1)$不可数（[[real-analysis/real-numbers#thm-r-uncountable]]），它的补集也不可数，因为补集包含$[1, \infty)$。所以$(0,1)$和它的补集都不是可数集。而可数-余可数σ-代数是由单点集生成的，单点集都是博雷尔集，所以它包含于$\mathcal{B}(\R)$，并且这个包含关系是严格的。
:::
:::

::: exercise 有限可加性加上连续性 {level=2}
设$\mathcal{A}$是σ-代数，$\mu\colon\mathcal{A} \to [0, \infty]$满足$\mu(\varnothing) = 0$、有限可加性和下连续性。证明$\mu$是测度。
::: solution
设$A_1, A_2, \ldots$互不相交，$B_n = A_1 \cup \cdots \cup A_n$。各$B_n$递增趋于$\bigcup_k A_k$。由下连续性和有限可加性，

$$
\mu\Bigl(\bigcup_k A_k\Bigr) = \lim_{n\to\infty}\mu(B_n) = \lim_{n\to\infty}\sum_{k=1}^n\mu(A_k) = \sum_{k=1}^\infty\mu(A_k).
$$

所以$\mu$是可数可加的。（[[#ex-measures]]中有限可加的$\nu$沿$\set{1}, \set{1,2}, \dots$不满足下连续性。）
:::
:::

::: exercise 集合的法图引理 {level=2}
设$\mu$是测度。证明$\mu\bigl(\liminf_n A_n\bigr) \le \liminf_n\mu(A_n)$，并证明若$\mu(X) < \infty$，则$\mu\bigl(\limsup_n A_n\bigr) \ge \limsup_n\mu(A_n)$。
::: solution
令$C_N = \bigcap_{n\ge N}A_n$；它们递增趋于$\liminf A_n$，并且对每个$n \ge N$都有$C_N \subseteq A_n$，所以$\mu(C_N) \le \inf_{n\ge N}\mu(A_n)$。由下连续性，$\mu(\liminf A_n) = \lim_N\mu(C_N) \le \lim_N\inf_{n\ge N}\mu(A_n) = \liminf\mu(A_n)$。类似地，$D_N = \bigcup_{n\ge N}A_n$递减趋于$\limsup A_n$，并且$\mu(D_N) \ge \sup_{n\ge N}\mu(A_n)$；若$\mu(X) < \infty$，则由上连续性得$\mu(\limsup A_n) = \lim\mu(D_N) \ge \limsup\mu(A_n)$。
:::
:::

::: exercise 无限σ-代数是不可数的 {level=3}
证明：含有无穷多个成员的σ-代数$\mathcal{A}$包含一个由两两不相交的非空集合构成的无穷序列，并由此推出$\mathcal{A}$不可数。
::: hint
若$\mathcal{A}$中有无穷多个成员是$E$的子集，就称$E \in \mathcal{A}$是**丰富**的。证明一个丰富的集合可以分拆成$\mathcal{A}$的一个非空成员与一个丰富的集合。
:::
::: solution
$X$是丰富的。设$E$是丰富的，取$B \in \mathcal{A}$，使$B \subseteq E$，$B \ne \varnothing$，$B \ne E$（这是可以做到的，因为$E$有无穷多个可测子集）。每个可测集$C \subseteq E$都由$B$的可测子集与$E \setminus B$的可测子集所成的对$(C\cap B, C\setminus B)$决定；所以如果$B$和$E\setminus B$都只有有限多个可测子集，那么$E$也只有有限多个。因此$B$与$E \setminus B$中有一个是丰富的：记它为$E'$，另一个记为$F$。则$F \ne \varnothing$，$F \in \mathcal{A}$，且$F \cap E' = \varnothing$。

从$E_0 = X$开始重复这一过程：$E_k$分拆成互不相交的非空集$F_{k+1}$与丰富集$E_{k+1}$，且$F_{k+1}\cup E_{k+1} = E_k$。由于$F_{j} \subseteq E_{j-1}$，且当$k \ge j$时$E_k \subseteq E_{j}$，集合$F_1, F_2, \dots$两两不相交且非空。对每个$S \subseteq \N$，并集$\bigcup_{k\in S}F_k$属于$\mathcal{A}$，而且不同的$S$给出不同的并集（因为各$F_k$互不相交且非空）。所以$\mathcal{A}$所含集合至少与$\mathcal{P}(\N)$一样多，而$\mathcal{P}(\N)$是不可数的（[[proofs/cardinality]]）。
:::
:::

::: exercise 测度空间的完备化 {level=3}
设$(X, \mathcal{A}, \mu)$是测度空间，$\mathcal{N}$是由零测集的子集构成的集族。令$\overline{\mathcal{A}} = \set{A \cup Z : A \in \mathcal{A}, Z \in \mathcal{N}}$，$\bar\mu(A \cup Z) = \mu(A)$。证明$\overline{\mathcal{A}}$是σ-代数，$\bar\mu$是良定义的，并且$\bar\mu$是扩张了$\mu$的完备测度。
::: solution
**σ-代数。**可数并：$\bigcup(A_n \cup Z_n) = \bigl(\bigcup A_n\bigr)\cup\bigl(\bigcup Z_n\bigr)$，而若$Z_n \subseteq N_n$，则$\bigcup Z_n \subseteq \bigcup N_n$，后者是零测集。补集：若$Z \subseteq N$，$N$为零测集，则$(A\cup Z)^c = (A \cup N)^c \cup (N \setminus (A \cup Z))$，其中$(A\cup N)^c \in \mathcal{A}$，$N\setminus(A\cup Z) \subseteq N$。此外$X = X \cup\varnothing$。

**良定义。**若$A \cup Z = A' \cup Z'$，其中$Z \subseteq N$，$Z' \subseteq N'$，而$N$与$N'$都是零测集，则$A \subseteq A' \cup Z' \subseteq A' \cup N'$，所以$\mu(A) \le \mu(A') + \mu(N') = \mu(A')$；由对称性，$\mu(A) = \mu(A')$。

**测度。**$\bar\mu(\varnothing) = 0$。若集合$A_n \cup Z_n$互不相交，则各$A_n$也互不相交，于是$\bar\mu\bigl(\bigcup(A_n\cup Z_n)\bigr) = \mu\bigl(\bigcup A_n\bigr) = \sum\mu(A_n)$。它是$\mu$的扩张（取$Z = \varnothing$）。

**完备性。**若$\bar\mu(A \cup Z) = 0$，其中$Z \subseteq N$，则$A \cup Z \subseteq A \cup N$，而后者是$\mathcal{A}$中的零测集；所以$A \cup Z$的任何子集都属于$\mathcal{N} \subseteq \overline{\mathcal{A}}$。
:::
:::
