黎曼积分把函数的**定义域**切成小区间，再把（高×宽）加起来。勒贝格积分切分的则是**值域**：对每一小段取值范围$[y, y + h)$，它考察$f$的值落在这一段中的那些点所成之集有多大，再把（值×该集合的大小）加起来。勒贝格本人把这两种方法比作清点一堆硬币的两种方式：按照硬币到手的顺序依次相加，或者先按面值把硬币分类，再数出每种面值各有多少枚。

只有当集合$\set{x : y \le f(x) < y + h}$可以度量时，第二种方法才有意义。使这一点成立的函数就是**可测函数**，它们是本章的主题。可测函数之于测度空间，正如连续函数之于度量空间——把“开集的原像是开集”（[[real-analysis/metric-spaces#thm-continuity-open]]）与下面的“博雷尔集的原像是可测集”对比一下——但有一个重大的区别：可测性在逐点极限下得以保持。我们还将介绍**简单函数**，它们只取有限个值，将成为构造积分的基本材料；以及叶戈罗夫（Egorov）和卢津（Lusin）的两个定理，它们表明可测函数及其极限**近乎**和连续函数及一致极限一样好。

## 可测函数

本章中，$(X, \mathcal{A})$始终是一个可测空间（[[measure-theory/sigma-algebras#def-sigma-algebra]]）。由于实函数的上确界和极限可能是无穷大，我们允许函数取值$\pm\infty$，在**广义实数轴**$[-\infty, \infty]$上讨论。我们把$\set{x \in X : f(x) > a}$简记为$\set{f > a}$。

::: definition 可测函数 {#def-measurable-function}
称函数$f\colon X \to [-\infty, \infty]$（关于$\mathcal{A}$）是**可测**的，如果

$$
\set{f > a} \in \mathcal{A} \qquad\text{对每个 } a \in \R.
$$

当$X = \R$且$\mathcal{A}$是勒贝格σ-代数$\mathcal{L}$时，我们说**勒贝格可测**；当$\mathcal{A} = \mathcal{B}(\R)$时，说**博雷尔可测**。
:::

::: theorem 可测性的等价形式 {#thm-measurable-equiv}
对$f\colon X \to [-\infty, \infty]$，下列条件等价：

1. 对所有$a \in \R$，$\set{f > a} \in \mathcal{A}$；
2. 对所有$a \in \R$，$\set{f \ge a} \in \mathcal{A}$；
3. 对所有$a \in \R$，$\set{f < a} \in \mathcal{A}$；
4. 对所有$a \in \R$，$\set{f \le a} \in \mathcal{A}$。

若$f$是实值函数，它们还等价于：对每个博雷尔集$B \subseteq \R$，$f^{-1}(B) \in \mathcal{A}$。
:::

::: proof
这四个条件通过可数次运算联系在一起：

$$
\set{f \ge a} = \bigcap_{n=1}^\infty\set{f > a - \tfrac1n}, \quad \set{f < a} = \set{f\ge a}^c, \quad \set{f \le a} = \bigcap_{n=1}^\infty\set{f < a + \tfrac1n}, \quad \set{f > a} = \set{f \le a}^c.
$$

所以(1) ⇒ (2) ⇒ (3) ⇒ (4) ⇒ (1)，因为σ-代数对取补集和可数交封闭。

对实值函数$f$，博雷尔集的原像包括集合$f^{-1}((a, \infty)) = \set{f > a}$，所以最后一个条件蕴含(1)。反之，设(1)成立，令$\mathcal{G} = \set{B \subseteq \R : f^{-1}(B) \in \mathcal{A}}$。由于$f^{-1}(B^c) = f^{-1}(B)^c$且$f^{-1}\bigl(\bigcup B_n\bigr) = \bigcup f^{-1}(B_n)$，集族$\mathcal{G}$是σ-代数；由(1)，它包含每条半直线$(a, \infty)$。这些半直线生成$\mathcal{B}(\R)$（[[measure-theory/sigma-algebras#thm-borel-generators]]），所以$\mathcal{B}(\R) \subseteq \mathcal{G}$。
:::

最后这部分又是好集原理，它也正是可测性成为一个稳健概念的原因：尽管定义中只提到半直线，可测函数却把**每个**博雷尔集都拉回为可测集。此外，$\set{f = \infty} = \bigcap_n\set{f > n}$和$\set{f = -\infty} = \bigcap_n\set{f < -n}$都是可测的。

::: example 可测函数与不可测函数 {#ex-measurable}
(a) 证明示性函数$\mathbf{1}_E$可测当且仅当$E \in \mathcal{A}$。(b) 证明每个连续函数$f\colon \R\to\R$和每个单调函数$f\colon \R \to \R$都是博雷尔可测的。(c) 狄利克雷（Dirichlet）函数$\mathbf{1}_{\Q}$是博雷尔可测的吗？
::: solution
(a) 当$a < 0$时，$\set{\mathbf{1}_E > a}$是$X$；当$0 \le a < 1$时，它是$E$；当$a \ge 1$时，它是$\varnothing$。所以这些集合全都可测当且仅当$E$可测。特别地，若$V$是维塔利（Vitali）不可测集（[[measure-theory/lebesgue-measure#thm-vitali]]），则$\mathbf{1}_V$不是勒贝格可测的。

(b) 对连续函数$f$，$\set{f > a}$是开集$(a, \infty)$的原像，因而是开集（[[real-analysis/metric-spaces#thm-continuity-open]]），从而是博雷尔集。对递增函数$f$，若$x \in \set{f > a}$且$y > x$，则$f(y) \ge f(x) > a$；所以$\set{f > a}$是形如$(c, \infty)$或$[c, \infty)$的区间（或者是$\varnothing$或$\R$），因而是博雷尔集。递减函数可以同样处理。

(c) 是的：$\Q$是可数个闭的单点集的并，所以它是博雷尔集，由(a)，$\mathbf{1}_\Q$是博雷尔可测的——尽管它处处不连续，也不黎曼可积。可测性是比连续性弱得多的要求。
:::
:::

复合运算需要稍加小心。若$f\colon X \to \R$可测，$g\colon \R\to\R$博雷尔可测（例如连续），则$g\circ f$可测，因为$(g\circ f)^{-1}(B) = f^{-1}\bigl(g^{-1}(B)\bigr)$，而$g^{-1}(B)$是博雷尔集。所以只要$f$可测，$\abs{f}$、$f^2$、$e^f$、$\sin f$和$\abs f^p$就都可测。但如果$g$仅仅是**勒贝格**可测的，$g^{-1}(B)$就未必是博雷尔集，此时即使$f$连续，$g\circ f$也可能不是勒贝格可测的（[[#ex-cantor-function]]）。

::: theorem 代数运算 {#thm-measurable-algebra}
设$f, g\colon X \to \R$可测，$c \in \R$。则$cf$、$f + g$、$fg$、$\max(f, g)$、$\min(f, g)$、**正部**$f^+ = \max(f, 0)$、**负部**$f^- = \max(-f, 0)$以及$\abs f$都可测；若$f$处处不为零，则$1/f$也可测。
:::

::: proof
当$c > 0$时，$\set{cf > a}$是$\set{f > a/c}$；当$c < 0$时，它是$\set{f < a/c}$；当$c = 0$时，它是$X$或$\varnothing$。

**和。**若$f(x) + g(x) > a$，则$f(x) > a - g(x)$，由$\Q$的稠密性，存在有理数$q$使$a - g(x) < q < f(x)$，于是$f(x) > q$且$g(x) > a - q$。反之，由这两个不等式可得$f(x) + g(x) > a$。因此

$$
\set{f + g > a} = \bigcup_{q\in\Q}\bigl(\set{f > q}\cap\set{g > a - q}\bigr),
$$

这是可数个可测集的并。

**积。**$f^2$可测：当$a < 0$时$\set{f^2 > a} = X$，当$a \ge 0$时它$= \set{f > \sqrt a}\cup\set{f < -\sqrt a}$。于是由前面几步，$fg = \frac14\bigl((f + g)^2 - (f - g)^2\bigr)$可测。

**最大值与最小值。**$\set{\max(f,g) > a} = \set{f > a}\cup\set{g > a}$，$\set{\min(f, g) > a} = \set{f > a}\cap\set{g > a}$。于是$f^+ = \max(f, 0)$、$f^- = \max(-f, 0)$和$\abs f = f^+ + f^-$都可测（常数是可测的）。

**倒数。**当$a > 0$时，$\set{1/f > a} = \set{0 < f < 1/a}$；当$a = 0$时，它是$\set{f > 0}$；当$a < 0$时，它是$\set{f > 0}\cup\set{f < 1/a}$。这些集合都可测。
:::

分解式$f = f^+ - f^-$，$\abs{f} = f^+ + f^-$（其中$f^\pm \ge 0$）使我们可以先对非负函数定义积分，然后再加以推广。

## 可测函数的极限

在这一点上，可测函数胜过连续函数和黎曼可积函数：可测函数类对一切可数的极限过程都封闭。

::: theorem 可测函数的极限 {#thm-measurable-limits}
设对每个$n \in \N$，$f_n\colon X\to[-\infty, \infty]$都可测。则函数

$$
\sup_n f_n, \qquad \inf_n f_n, \qquad \limsup_{n\to\infty}f_n, \qquad \liminf_{n\to\infty}f_n
$$

（逐点定义）都是可测的。特别地，若对每个$x$都有$f_n(x) \to f(x)$，则$f$可测。
:::

::: proof
对每个$a$，$\sup_n f_n(x) > a$当且仅当对某个$n$有$f_n(x) > a$，所以

$$
\Bigl\{\sup_n f_n > a\Bigr\} = \bigcup_{n=1}^\infty\set{f_n > a} \in \mathcal{A}.
$$

类似地，$\set{\inf_n f_n < a} = \bigcup_n\set{f_n < a}$，所以由[[#thm-measurable-equiv]]，$\inf_n f_n$可测。于是两次应用刚刚证明的结论，可知$\limsup_n f_n = \inf_{k}\bigl(\sup_{n\ge k}f_n\bigr)$和$\liminf_n f_n = \sup_k\bigl(\inf_{n\ge k}f_n\bigr)$都可测。若$f_n \to f$逐点成立，则$f = \limsup_n f_n$。
:::

::: example 可数性至关重要 {#ex-uncountable-sup}
对每个$t \in \R$，函数$\mathbf{1}_{\set{t}}$都是博雷尔可测的。证明这类函数中**不可数**多个的上确界可能不是勒贝格可测的。
::: solution
设$V$是维塔利不可测集（[[measure-theory/lebesgue-measure#thm-vitali]]）。对每个$x$，当$x \in V$时$\sup_{t\in V}\mathbf{1}_{\set{t}}(x)$为$1$，否则为$0$，所以这个上确界就是$\mathbf{1}_V$，它不可测。[[#thm-measurable-limits]]的证明把$\set{\sup_n f_n > a}$写成集合$\set{f_n > a}$的并；对不可数的函数族，这个并就不再是可数次运算了，而σ-代数只对可数次运算封闭。
:::
:::

对比一下：连续函数的逐点极限未必连续（$[0, 1]$上的$x^n$，[[real-analysis/uniform-convergence#ex-failures]]），黎曼可积函数的逐点极限未必黎曼可积（狄利克雷函数）。而可测函数的逐点极限总是可测的。正是这一事实，使得勒贝格积分处理极限的能力远胜于黎曼积分。

::: quiz
下列$\R$上的函数中，哪些是勒贝格可测的？选出所有正确的选项。
- [x] $\mathbf{1}_\Q$，即有理数集的示性函数
- [x] $f(x) = \sup_{n\in\N}\sin(nx)$
- [ ] $\mathbf{1}_V$，其中$V$是维塔利不可测集
- [x] 连续函数列的逐点极限
::: solution
$\Q$是博雷尔集，所以$\mathbf{1}_\Q$可测。每个$\sin(nx)$都连续，因而可测，所以由[[#thm-measurable-limits]]，它们的上确界可测；连续函数的任何逐点极限也是如此。$\mathbf{1}_V$只有在$V$可测时才可测，而$V$不可测（[[#ex-measurable]](a)）。
:::
:::

## 简单函数

::: definition 简单函数 {#def-simple}
只取有限个值的可测函数$\varphi\colon X\to\R$称为**简单函数**。若它的互不相同的值为$c_1, \dots, c_m$，并令$E_k = \set{\varphi = c_k}$，则各集合$E_k$可测、两两不相交、覆盖$X$，并且

$$
\varphi = \sum_{k=1}^m c_k\,\mathbf{1}_{E_k}.
$$ {#eq-canonical}

这称为$\varphi$的**标准表示**。
:::

::: example 一个标准表示 {#ex-canonical}
把$\varphi = 2\cdot\mathbf{1}_{[0, 2]} + 3\cdot\mathbf{1}_{[1, 3]}$写成标准形式。
::: solution
求出$\varphi$在由$[0, 2]$和$[1, 3]$生成的划分的每一块上的值：在$[0, 1)$上只有第一个示性函数为$1$，所以$\varphi = 2$；在$[1, 2]$上两个都为$1$，所以$\varphi = 5$；在$(2, 3]$上只有第二个为$1$，所以$\varphi = 3$；在其他地方$\varphi = 0$。因此

$$
\varphi = 2\cdot\mathbf{1}_{[0,1)} + 5\cdot\mathbf{1}_{[1, 2]} + 3\cdot\mathbf{1}_{(2, 3]} + 0\cdot\mathbf{1}_{\R\setminus[0,3]}.
$$

这些集合互不相交，每个值恰好在其中一个集合上取到，并且它们覆盖$\R$。在下一章中，$\varphi$的积分将是$2\cdot1 + 5\cdot1 + 3\cdot1 = 10$——与由原来的表示算出的$2\lambda([0,2]) + 3\lambda([1,3])$相同，理应如此。
:::
:::

任何有限组合$\sum_{j=1}^n a_j\mathbf{1}_{A_j}$（其中$A_j \in \mathcal{A}$）都是简单函数（由[[#thm-measurable-algebra]]它可测，而且至多取$2^n$个值），但这样的表示远不是唯一的——$\mathbf{1}_{[0,2]} = \mathbf{1}_{[0,1)} + \mathbf{1}_{[1,2]}$——这正是标准表示有用的原因。阶梯函数是集合$E_k$都是区间的简单函数；一般的简单函数可以使用任意可测集，例如$\Q$或康托尔集。简单函数的和、积、最大值与最小值仍是简单函数。关键的事实是：通过切分**值域**，每个非负可测函数都可以用简单函数从下方逼近。

::: theorem 简单函数逼近定理 {#thm-simple-approx}
设$f\colon X\to[0, \infty]$可测，对$n \in \N$定义

$$
\varphi_n = \min\Bigl(n,\ \frac{\lfloor 2^n f\rfloor}{2^n}\Bigr) \qquad (\text{约定 } \varphi_n = n \text{，若 } f = \infty).
$$ {#eq-phi-n}

则每个$\varphi_n$都是简单函数，$0 \le \varphi_1 \le \varphi_2 \le \cdots \le f$，并且对每个$x$都有$\varphi_n(x) \to f(x)$。在$f$有界的任何集合上，这一收敛是一致的。
:::

::: proof
**简单性。**$\varphi_n$只取值$k/2^n$，其中$0 \le k \le n2^n$：当$k < n2^n$时，它在$\set{k2^{-n} \le f < (k+1)2^{-n}}$上等于$k/2^n$；它在$\set{f \ge n}$上等于$n$。由[[#thm-measurable-equiv]]，这些集合都可测。

**不超过$f$且递增。**由$\lfloor t\rfloor \le t$得$\varphi_n \le f$。对任意实数$y$，$\lfloor 2y\rfloor \ge 2\lfloor y\rfloor$，所以$\frac{\lfloor 2^{n+1}t\rfloor}{2^{n+1}} \ge \frac{\lfloor 2^nt\rfloor}{2^n}$；而且$n + 1 > n$。两个较大的量的最小值也较大，所以$\varphi_{n+1} \ge \varphi_n$。

**收敛性。**若$f(x) = \infty$，则$\varphi_n(x) = n \to \infty$。若$f(x) < \infty$，则对每个$n > f(x)$，最小值由第二项取得，并且$0 \le f(x) - \varphi_n(x) < 2^{-n}$。若在集合$S$上$f \le M$，则只要$n > M$，同样的界对所有$x \in S$都成立，这就是在$S$上的一致收敛。
:::

对实值可测函数$f$，把这个定理分别用于$f^+$和$f^-$，就得到简单函数$\psi_n = \varphi_n^+ - \varphi_n^-$，使得$\psi_n \to f$逐点成立，且$\abs{\psi_n} \le \abs{f}$。

::: widget plot
f: min(n, floor(2^n*x^2)/2^n); x^2
x: 0, 2.2
y: 0, 4.5
sliders: n=1:1:6:1
labels: \varphi_n; f(x) = x^2
caption: 对$f(x) = x^2$的简单函数$\varphi_n = \min(n, 2^{-n}\lfloor 2^nf\rfloor)$。值域被切成高为$2^{-n}$的水平带；在$f$的值落在某一带中的集合上，$\varphi_n$取该带的底值。增大$n$：带宽减半，上限$n$升高，阶梯从下方向图像攀升，在$f$有界的地方一致地逼近。各台阶是形如$\set{a \le f < b}$的集合——对于怪异的$f$，它们根本不必是区间。
:::

::: intuition 定义域与值域
对$[a, b]$上的连续函数$f$，黎曼的竖直条和勒贝格的水平带给出相同的结果。差别体现在怪异的函数上。狄利克雷函数只有两个值：勒贝格的方法把点分成使$f = 1$的集合$\Q$和使$f = 0$的集合$\R\setminus\Q$，由于$\lambda(\Q\cap[0,1]) = 0$，积分将是$1\cdot0 + 0\cdot1 = 0$。黎曼的方法失效，因为每个竖直条无论多窄，都同时含有这两类点。
:::

## 几乎处处

从现在起，设$(X, \mathcal{A}, \mu)$是测度空间。积分不会区分只在零测集上不同的函数，所以我们需要[[measure-theory/sigma-algebras#def-null]]中的语言。

::: definition 几乎处处相等与几乎处处收敛 {#def-ae}
若$\set{x : f(x) \ne g(x)}$包含在某个零测集中，则称$X$上的函数$f$与$g$**几乎处处相等**，记作“$f = g$ a.e.”。若在某个零测集之外的所有$x$处都有$f_n(x) \to f(x)$，则称函数列$f_n$**几乎处处收敛**于$f$。
:::

例如，关于勒贝格测度有$\mathbf{1}_\Q = 0$ a.e.；在$[0, 1]$上$x^n \to 0$ a.e.（除$x = 1$外处处成立）。如果测度是完备的（勒贝格测度就是如此），那么几乎处处等于某个可测函数的函数本身也是可测的：若在零测集$N$之外$f = g$，则$\set{g > a}$与$\set{f > a}$只相差$N$的一个子集，而这个子集是可测的。因此，对于完备测度，可测函数列的几乎处处极限是可测的。对不完备的测度，这可能不成立；这正是我们宁可使用完备的σ-代数$\mathcal{L}$而不用$\mathcal{B}(\R)$的原因之一。

## 叶戈罗夫定理与卢津定理

逐点收敛比一致收敛弱得多，可测函数也比连续函数一般得多。但在测度有限的集合上，二者的差距在一种精确的意义下是小的：我们可以扔掉一个测度任意小的集合，从而重新得到一致收敛或连续性。

::: theorem 叶戈罗夫定理 {#thm-egorov}
设$\mu(X) < \infty$，$f_n$与$f$是可测的实值函数，且$f_n \to f$几乎处处成立。则对每个$\eps > 0$，存在可测集$E$，使$\mu(X\setminus E) < \eps$，并且在$E$上$f_n \to f$**一致**成立。
:::

::: proof
设$N$是一个零测集，在它之外$f_n \to f$。对$k, n \in \N$，令

$$
E^k_n = \bigcup_{m\ge n}\set{x \in X\setminus N : \abs{f_m(x) - f(x)} \ge 1/k},
$$

它是这样一些好点所成之集：在这些点处，仍有某个$m \ge n$的$f_m$与$f$的距离至少为$1/k$。这些集合可测，并且对固定的$k$，它们随$n$增大而递减。它们对$n$的交是空集：若$x \notin N$，则$f_m(x) \to f(x)$，所以对所有充分大的$m$，$\abs{f_m(x) - f(x)} < 1/k$。由于$\mu(X) < \infty$，由上连续性（[[measure-theory/sigma-algebras#thm-continuity-measure]]），当$n \to \infty$时$\mu(E^k_n) \to 0$。取$n_k$使$\mu(E^k_{n_k}) < \eps/2^k$，并令

$$
E = X\setminus\Bigl(N \cup\bigcup_{k=1}^\infty E^k_{n_k}\Bigr).
$$

于是$\mu(X\setminus E) \le \mu(N) + \sum_k\mu(E^k_{n_k}) < 0 + \sum_k\eps/2^k = \eps$。若$x \in E$，则对每个$k$都有$x \notin E^k_{n_k}$，所以对所有$m \ge n_k$，$\abs{f_m(x) - f(x)} < 1/k$。由于$n_k$不依赖于$x$，在$E$上的收敛是一致的。
:::

::: widget plot
f: x^n
x: 0, 1
y: -0.05, 1.1
sliders: n=1:1:60:1
vlines: 0.9
labels: x^n
caption: 叶戈罗夫定理最简单的实例。函数$x^n$在$[0, 1)$的每一点都收敛于$0$，但由于$1$附近的点，收敛不是一致的。去掉虚线右边的短区间$(0.9, 1]$：在$[0, 0.9]$上，$\sup x^n = 0.9^n \to 0$，所以收敛在那里是一致的。无论给定怎样的$\eps > 0$，去掉测度小于$\eps$的区间$(1 - \eps/2, 1]$都能做到这一点。
:::

::: quiz
设在$[0, 1]$上（取勒贝格测度）$f_n \to f$几乎处处成立。叶戈罗夫定理保证了什么？
- [ ] 在$[0, 1]$上$f_n \to f$一致成立。
- [ ] 在某个测度为$1$的集合上$f_n \to f$一致成立。
- [x] 对每个$\eps > 0$，在某个满足$\lambda([0,1]\setminus E) < \eps$的可测集$E$上$f_n \to f$一致成立。
- [ ] 在$[0, 1]$的每个闭子集上$f_n \to f$一致成立。
::: solution
这正是[[#thm-egorov]]的结论。第二个选项是错的：在$[0, 1]$上$x^n \to 0$ a.e.，但任何测度为$1$的集合都含有任意接近$1$的点，在这些点处$x^n$接近$1$。必须允许例外集具有很小的**正**测度。对同一个例子取闭集$[0, 1]$，可知最后一个选项也不成立。
:::
:::

::: warning 叶戈罗夫定理需要有限测度
在取勒贝格测度的$\R$上，$f_n = \mathbf{1}_{[n, n+1]}$在每一点都趋于$0$，但在任何满足$\lambda(\R\setminus E) < 1$的集合$E$上，收敛都不是一致的：这样的$E$与每个区间$[n, n+1]$都相交，所以对所有$n$都有$\sup_E f_n = 1$。证明在上连续性这一步失效，因为上连续性需要一个测度有限的集合。（[[#exr-3-8]]要求补出细节。）
:::

卢津定理是关于连续性的类似结果：区间上的可测函数在去掉一个测度很小的集合之后就是连续的。

::: theorem 卢津定理 {#thm-lusin}
设$f\colon [a, b]\to\R$勒贝格可测。则对每个$\eps > 0$，存在闭集$F \subseteq [a, b]$，使$\lambda([a, b]\setminus F) < \eps$，并且限制$f|_F$是连续的。
:::

::: proof
**简单函数。**设$\varphi = \sum_{k=1}^m c_k\mathbf{1}_{E_k}$是标准形式。由正则性（[[measure-theory/lebesgue-measure#thm-regularity]]），存在闭集$F_k \subseteq E_k$，使$\lambda(E_k\setminus F_k) < \eps/m$。它们的并$F$是闭集，$\lambda([a,b]\setminus F) < \eps$，并且$\varphi$在每个$F_k$上是常数。各$F_k$互不相交且都是紧集，所以$F_k$的每一点都有一个不与其他任何$F_j$相交的邻域（互不相交的紧集之间的距离为正）；因此$\varphi|_F$连续。

**一般的$f$。**由[[#thm-simple-approx]]（用于$f^\pm$），存在简单函数$\psi_n$，使$\psi_n \to f$处处成立。对每个$n$，取闭集$F_n$，使$\lambda([a, b]\setminus F_n) < \eps/2^{n+1}$且$\psi_n|_{F_n}$连续。由叶戈罗夫定理，存在可测集$E$，使$\lambda([a, b]\setminus E) < \eps/4$且在$E$上$\psi_n \to f$一致成立；再由正则性，存在闭集$F_0 \subseteq E$，使$\lambda(E \setminus F_0) < \eps/4$。令$F = \bigcap_{n\ge0}F_n$，它是闭集，且$\lambda([a,b]\setminus F) < \eps/2 + \eps/2 = \eps$。在$F$上，每个$\psi_n$都连续，并且$\psi_n \to f$一致成立，所以由[[real-analysis/uniform-convergence#thm-uniform-continuous]]，$f|_F$连续。
:::

::: warning 在F上连续不等于在F的各点处连续
卢津定理说的是**限制**$f|_F$连续，而不是说$f$在$F$的各点处连续。狄利克雷函数$\mathbf{1}_\Q$处处不连续，然而在[[measure-theory/lebesgue-measure#ex-open-dense]]中的闭集$F = [0, 1]\setminus U$上（它不含有理数，测度至少为$1 - \eps$），它的限制是常数$0$。
:::

::: remark 利特尔伍德三原则
J. E. 利特尔伍德（J. E. Littlewood）用三条原则概括了这门学科的精神：每个可测集都近乎是有限个区间的并（正则性）；每个可测函数都近乎是连续的（卢津）；每个收敛的可测函数列都近乎是一致收敛的（叶戈罗夫）。“近乎”的意思总是：去掉一个测度很小的集合之后。测度论中的许多证明，就是先应用其中一条原则，再在剩下的大的好集上进行经典的论证。
:::

## 康托尔函数

我们的最后一个例子是一个连续递增函数，它从$0$爬升到$1$，却几乎处处是平的；它表明可测函数在复合运算下可能有出人意料的表现。

::: example 康托尔函数 {#ex-cantor-function}
设$C$是康托尔集（[[measure-theory/lebesgue-measure#ex-cantor-set]]）。对三进制数字为$d_k \in \set{0, 2}$的$x \in C$，令$\Phi(x) = \sum_{k\ge1}\frac{d_k}{2}\,2^{-k}$（把各位数字减半，再按二进制读出）。证明$\Phi$可以延拓为连续递增函数$\Phi\colon [0, 1]\to[0, 1]$，它在构造$C$时去掉的每个区间上都是常数，并且$\Phi(C) = [0, 1]$。再利用$\psi(x) = x + \Phi(x)$证明：勒贝格可测函数与连续函数的复合未必是勒贝格可测的。
::: solution
**延拓。**一个被去掉的区间的两个端点有三进制展开$0.d_1\ldots d_{k-1}0222\ldots$和$0.d_1\ldots d_{k-1}2000\ldots$，$\Phi$把它们映为**同一个**数的两个二进制展开$0.b_1\ldots b_{k-1}0111\ldots$和$0.b_1\ldots b_{k-1}1000\ldots$。在被去掉的区间上，定义$\Phi$为这个公共值。逐位比较展开式，可知$\Phi$在$[0, 1]$上递增。

**满射性与连续性。**每个$y \in [0, 1]$都有二进制展开$0.b_1b_2\ldots$，而$C$中三进制数字为$2b_k$的点被映为$y$；所以$\Phi(C) = [0, 1]$。像为区间的递增函数没有跳跃（[[real-analysis/continuity#thm-monotone-jumps]]：跳跃会在像中留下空隙），所以$\Phi$连续。它在每个被去掉的区间上是常数，所以在$[0,1]\setminus C$（一个测度为$1$的集合）上可导且$\Phi' = 0$；然而$\Phi(0) = 0$，$\Phi(1) = 1$。（与微积分基本定理对比：$\Phi$不是其导数的积分。）

**一个糟糕的复合。**$\psi(x) = x + \Phi(x)$连续且严格递增，把$[0, 1]$映满$[0, 2]$，所以它有连续的反函数$h = \psi^{-1}$（[[real-analysis/continuity#cor-inverse]]）。在每个被去掉的区间上，$\psi$是一个平移，所以$\psi$把$[0, 1]\setminus C$映成一个测度为$1$的集合（被去掉的区间的像是互不相交的区间，总长度不变），因此$\lambda(\psi(C)) = 2 - 1 = 1$。由[[measure-theory/lebesgue-measure#exr-2-8]]，$\psi(C)$含有一个不可测集$W$。令$E = \psi^{-1}(W) \subseteq C$。由于$\lambda(C) = 0$且$\lambda$是完备的，$E$是勒贝格可测的（并且是零测集），所以$g = \mathbf{1}_E$勒贝格可测。但$g \circ h = \mathbf{1}_{\psi(E)} = \mathbf{1}_W$不可测，尽管$h$是连续的。（特别地，$E$不是博雷尔集：否则$W = h^{-1}(E)$将是博雷尔集。）
:::
:::

::: application 随机变量
在概率论中，概率空间$(\Omega, \mathcal{F}, P)$上的**随机变量**不过是一个可测函数$X\colon\Omega\to\R$。正是可测性使$P(X \le a) = P(\set{X \le a})$有意义，而由[[#thm-measurable-equiv]]，它使$P(X \in B)$对每个博雷尔集$B$都有意义。函数$B \mapsto P(X \in B)$是$\mathcal{B}(\R)$上的一个概率测度，称为$X$的**分布**；由[[measure-theory/sigma-algebras#thm-uniqueness]]，它由累积分布函数$F(a) = P(X \le a)$决定。由本章的定理，随机变量的和、积、极限以及随机变量的连续函数仍是随机变量（[[probability/continuous-random-variables]]）。
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1
b: 1
cdf: true
caption: 随机变量$X$的分布是博雷尔集上的一个测度，由它的分布函数$F(a) = P(X \le a)$决定。这里$X$服从标准正态分布；阴影部分的概率$P(-1 \le X \le 1) = F(1) - F(-1) \approx 0.683$就是博雷尔集$[-1, 1]$的测度。改变分布和区间：你能算出的每个概率都是某个集合$\set{X \in B}$的测度，而这个测度之所以存在，是因为$X$可测。
:::

::: history
亨利·勒贝格（Henri Lebesgue）在1902年的博士论文中引入了可测函数，作为能够定义他的积分的那类函数，并证明了它们对逐点极限封闭。格奥尔格·康托尔（Georg Cantor）在1884年研究完全集时，描述了如今以他的名字命名的函数。德米特里·叶戈罗夫（Dmitri Egorov）在1911年发表了他关于近一致收敛的定理，他的学生尼古拉·卢津（Nikolai Lusin）在1912年发表了关于近乎连续性的定理；围绕他们成长起来的莫斯科实变函数论学派，是20世纪最有影响力的学派之一。J. E. 利特尔伍德（J. E. Littlewood）在他的《函数论讲义》（*Lectures on the Theory of Functions*，1944年）中陈述了他的三原则。
:::

## 后续内容

简单函数按显然的公式$\int\sum c_k\mathbf{1}_{E_k}\,d\mu = \sum c_k\mu(E_k)$求积分；[[measure-theory/lebesgue-integral]]一章把非负可测函数的积分定义为位于它下方的简单函数——例如[[#thm-simple-approx]]中的那些逼近函数——的积分的上确界，并证明单调收敛定理，它是[[#thm-measurable-limits]]的积分版本。叶戈罗夫定理将在[[measure-theory/lp-spaces]]一章中再次出现，在那里它把几乎处处收敛与依测度收敛联系起来。在概率论中（[[probability/limit-theorems]]），强大数定律就是一个关于可测函数几乎处处收敛的定理。

::: summary
- 当每个集合$\set{f > a}$都可测时，$f$是可测的；等价地，可以改用$\set{f \ge a}$、$\set{f < a}$或$\set{f\le a}$；对实值的$f$，这又等价于每个博雷尔集的原像都可测（[[#thm-measurable-equiv]]）。
- 连续函数和单调函数都是博雷尔可测的；示性函数$\mathbf{1}_E$可测当且仅当$E$可测。
- 可测函数的和、积、最大值、$f^\pm$、$\abs f$以及可测函数的连续函数都是可测的（[[#thm-measurable-algebra]]）。
- 可测函数的上确界、下确界、$\limsup$、$\liminf$和逐点极限都是可测的（[[#thm-measurable-limits]]）——这与连续性和黎曼可积性不同。
- 每个非负可测函数$f$都是简单函数$\min(n, 2^{-n}\lfloor 2^nf\rfloor)$的递增逐点极限（[[#thm-simple-approx]]）。
- 在有限测度空间上，几乎处处收敛在去掉一个测度很小的集合之后是一致收敛（叶戈罗夫）；$[a, b]$上的可测函数在测度近乎满的闭集上是连续的（卢津）。
- 康托尔函数连续、递增、映满$[0, 1]$且几乎处处是平的；由它可以得到一个不是博雷尔集的勒贝格可测集。
:::

## 习题

::: exercise 示性函数 {level=1}
设$E \subseteq X$。证明$\mathbf{1}_E$可测当且仅当$E \in \mathcal{A}$，并证明$\mathbf{1}_{A\cap B} = \mathbf{1}_A\mathbf{1}_B$以及$\mathbf{1}_{A\cup B} = \max(\mathbf{1}_A, \mathbf{1}_B)$。
::: solution
第一个结论就是[[#ex-measurable]](a)：$\set{\mathbf{1}_E > a}$是$X$、$E$或$\varnothing$。至于两个恒等式，每个等式的两边都只取值$0$和$1$，并且两边恰好都在$A\cap B$（相应地，$A \cup B$）的点处等于$1$。
:::
:::

::: exercise 单调函数 {level=1}
设$f\colon \R\to\R$递减。直接证明$f$是博雷尔可测的。
::: solution
若$f(x) > a$且$y < x$，则$f(y) \ge f(x) > a$。所以$\set{f > a}$只要包含某一点，就包含该点左边的每一点：它是$\varnothing$、$\R$，或者是区间$(-\infty, c)$或$(-\infty, c]$。这些都是博雷尔集。
:::
:::

::: exercise 简单逼近函数的一个值 {level=1 check="3/8"}
对$f(x) = x^2$，计算$\varphi_3(0.7)$，其中$\varphi_n$由[[#eq-phi-n]]定义。
::: solution
$f(0.7) = 0.49$，而$2^3\cdot0.49 = 3.92$，其向下取整为$3$。所以$\varphi_3(0.7) = \min(3, 3/8) = 3/8$。误差为$0.49 - 0.375 = 0.115 < 2^{-3}$，正如[[#thm-simple-approx]]的证明所保证的那样。
:::
:::

::: exercise 导数是可测的 {level=2}
设$f\colon \R\to\R$可导。证明$f'$是博雷尔可测的。
::: solution
$f$连续，所以每个$g_n(x) = n\bigl(f(x + \tfrac1n) - f(x)\bigr)$都连续，因而是博雷尔可测的。由导数的定义（沿$h = 1/n$），对每个$x$都有$g_n(x) \to f'(x)$。由[[#thm-measurable-limits]]，逐点极限$f'$是博雷尔可测的。（导数未必连续——[[real-analysis/differentiation#ex-discontinuous-derivative]]——但总是可测的。）
:::
:::

::: exercise 函数列的收敛点集 {level=2}
设$f_n\colon X\to\R$可测。证明使$(f_n(x))$收敛（于一个实数）的点$x$所成之集是可测的。
::: hint
利用柯西准则，用可数并与可数交写出这个集合。
:::
::: solution
由柯西准则，$(f_n(x))$收敛当且仅当对每个$k$，存在$N$，使得对所有$m, n \ge N$都有$\abs{f_m(x) - f_n(x)} < 1/k$。所以这个集合是

$$
\bigcap_{k=1}^\infty\ \bigcup_{N=1}^\infty\ \bigcap_{m, n\ge N}\set{\abs{f_m - f_n} < 1/k},
$$

而每个$\set{\abs{f_m - f_n} < 1/k}$都可测，因为$\abs{f_m - f_n}$可测（[[#thm-measurable-algebra]]）。可测集的可数并与可数交都是可测的。
:::
:::

::: exercise 康托尔函数的一个值 {level=2 check="1/3"}
求$\Phi(1/4)$，其中$\Phi$是[[#ex-cantor-function]]中的康托尔函数。
::: solution
$\tfrac14 = \sum_{k\ge1}2\cdot 9^{-k} = 0.020202\ldots_3$（事实上，$2\sum 9^{-k} = 2\cdot\frac{1/9}{1 - 1/9} = \frac14$）。它的三进制数字为$0, 2, 0, 2, \dots$，所以$\tfrac14 \in C$；把各位数字减半，得到二进制数$0.010101\ldots_2 = \sum_{k\ge1}4^{-k} = \tfrac13$。所以$\Phi(1/4) = 1/3$。
:::
:::

::: exercise 狄利克雷函数的卢津定理 {level=2}
给定$\eps > 0$，明确地找出一个闭集$F \subseteq [0, 1]$，使$\lambda([0,1]\setminus F) < \eps$，并且$\mathbf{1}_\Q$在$F$上的限制是连续函数。
::: solution
把$[0, 1]$中的有理数排成$q_1, q_2, \dots$，令$U = \bigcup_k(q_k - \eps2^{-k-2}, q_k + \eps 2^{-k-2})$，这是一个测度至多为$\eps/2$、包含$[0,1]$中每个有理数的开集。于是$F = [0, 1]\setminus U$是闭集，不含有理数，并且$\lambda([0, 1]\setminus F) \le \lambda(U) \le \eps/2 < \eps$。在$F$上，$\mathbf{1}_\Q$恒等于$0$，这是连续的。
:::
:::

::: exercise 叶戈罗夫定理在实数轴上不成立 {level=2}
在取勒贝格测度的$\R$上，令$f_n = \mathbf{1}_{[n, n+1]}$。证明$f_n \to 0$处处成立，但不存在满足$\lambda(\R\setminus E) < 1$、且在其上$f_n \to 0$一致成立的可测集$E$。[[#thm-egorov]]的哪个假设不成立？
::: solution
对固定的$x$，只要$n > x$就有$f_n(x) = 0$，所以$f_n \to 0$处处成立。若$\lambda(\R\setminus E) < 1$，则$E$不可能完全错过任何一个区间$[n, n+1]$（单是这个区间的测度就为$1$），所以对每个$n$，都存在$x \in E$使$f_n(x) = 1$，从而$\sup_E\abs{f_n} = 1 \not\to 0$。不成立的假设是$\mu(X) < \infty$：在证明中，集合$E^1_n = [n, \infty)$递减趋于$\varnothing$，但它们的测度都是无穷大，所以不能使用上连续性。
:::
:::

::: exercise 勒贝格可测函数几乎处处等于博雷尔可测函数 {level=3}
设$f\colon\R\to\R$勒贝格可测。证明存在博雷尔可测函数$g\colon\R\to\R$，使$f = g$几乎处处成立。
::: hint
先对勒贝格可测集的示性函数证明（利用[[measure-theory/lebesgue-measure#thm-regularity]]），再对简单函数证明，然后利用[[#thm-simple-approx]]。
:::
::: solution
**示性函数。**若$E \in \mathcal{L}$，由正则性，存在博雷尔集（$G_\delta$型集）$G$和零测集$Z$，使$E = G\setminus Z$，所以在$Z$之外$\mathbf{1}_E = \mathbf{1}_G$。

**简单函数。**若$\varphi = \sum c_k\mathbf{1}_{E_k}$，把每个$E_k$换成这样的$G_k$；所得的博雷尔简单函数在零测集$\bigcup Z_k$之外与$\varphi$相等。

**一般的$f$。**设$\psi_n \to f$逐点成立，其中各$\psi_n$为简单函数（由[[#thm-simple-approx]]用于$f^\pm$得到），并设$\tilde\psi_n$是博雷尔简单函数，在零测集$N_n$之外$\tilde\psi_n = \psi_n$。在零测集$N = \bigcup_n N_n$之外，$\tilde\psi_n \to f$。设$B$是包含$N$的博雷尔零测集（再次利用正则性：$N$包含于某个$G_\delta$型零测集），令$g = \limsup_n\bigl(\mathbf{1}_{\R\setminus B}\,\tilde\psi_n\bigr)$。每个$\mathbf{1}_{\R\setminus B}\tilde\psi_n$都是博雷尔简单函数，所以由[[#thm-measurable-limits]]，$g$是博雷尔可测的。在$B$上每一项都是$0$，所以在$B$上$g = 0$；在$B$之外，各项收敛于$f$，所以在那里$g = f$。因此$g$是实值的、博雷尔可测的，并且在零测集$B$之外$g = f$。
:::
:::

::: exercise 几乎处处收敛于f的连续函数列 {level=3}
设$f\colon[0, 1]\to\R$勒贝格可测。证明存在$[0, 1]$上的连续函数$g_n$，使$g_n \to f$几乎处处成立。你可以利用这样一个事实：闭集$F \subseteq [0,1]$上的连续函数可以延拓为$[0, 1]$上的连续函数（在$[0,1]\setminus F$的各个开区间上作线性插值）。
::: hint
取$\eps = 2^{-n}$应用卢津定理，再应用博雷尔-坎泰利引理。
:::
::: solution
对每个$n$，由卢津定理，存在闭集$F_n$，使$\lambda([0,1]\setminus F_n) < 2^{-n}$且$f|_{F_n}$连续；把$f|_{F_n}$延拓为$[0, 1]$上的连续函数$g_n$，于是在$F_n$上$g_n = f$。由于$\sum_n\lambda([0, 1]\setminus F_n) < \infty$，博雷尔-坎泰利引理（[[measure-theory/sigma-algebras#thm-borel-cantelli]]）表明，几乎每个$x$都只属于集合$[0,1]\setminus F_n$中的有限多个，也就是说，对所有充分大的$n$都有$x \in F_n$。对这样的$x$，当$n$充分大时$g_n(x) = f(x)$，所以$g_n(x) \to f(x)$。因此$g_n \to f$几乎处处成立。
:::
:::
