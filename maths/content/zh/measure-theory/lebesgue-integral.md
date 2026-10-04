积分的极限什么时候等于极限的积分？对黎曼（Riemann）积分，[[real-analysis/uniform-convergence#thm-uniform-integral]]给出的回答是：当收敛是一致收敛时。这个假设常常得不到满足——$[0, 1]$上的函数$x^n$并不一致收敛，尽管$\int_0^1 x^n\,dx = \frac{1}{n+1}$显然趋于$0 = \int_0^1 0\,dx$——而有时极限函数根本没有黎曼积分。

本章利用前几章的测度与可测函数构造勒贝格（Lebesgue）积分。它给出了好得多的回答，集中体现在三个定理中，它们都属于整个分析学中最常用的结果：

- **单调收敛定理**：对非负函数构成的递增序列，极限与积分**总是**可以交换次序；
- **法图（Fatou）引理**：对非负函数，极限的积分不超过积分的极限——取极限时质量可能丢失，但绝不会凭空产生；
- **控制收敛定理**：如果所有函数都以同一个固定的可积函数为界，极限与积分就可以交换次序。

构造分三步进行——简单函数、非负函数、可积函数——然后我们把所得结果与黎曼积分作比较，并利用它在积分号下求导。本章中，$(X, \mathcal{A}, \mu)$始终是一个测度空间，我们采用$[0, \infty]$中的算术运算，并约定$0\cdot\infty = 0$。

## 简单函数的积分

::: definition 简单函数的积分 {#def-integral-simple}
设$\varphi = \sum_{k=1}^m c_k\mathbf{1}_{E_k}$是一个写成标准形式的非负简单函数（[[measure-theory/measurable-functions#def-simple]]）。它的**积分**为

$$
\int_X\varphi\,d\mu = \sum_{k=1}^m c_k\,\mu(E_k) \ \in [0, \infty].
$$

对$A \in \mathcal{A}$，记$\int_A\varphi\,d\mu = \int_X\varphi\,\mathbf{1}_A\,d\mu$。
:::

这恰好就是“函数值 × 取该值的集合的大小”，再对有限多个值求和。约定$0\cdot\infty = 0$意味着$\R$上的零函数的积分为$0$，尽管$\lambda(\R) = \infty$。

::: lemma 简单函数积分的性质 {#lem-simple-well-defined}
设$\varphi$，$\psi$是非负简单函数。

1. 若$\varphi = \sum_j a_j\mathbf{1}_{A_j}$，其中$A_j \in \mathcal{A}$两两不交（这一表示不必是标准形式），则$\int\varphi\,d\mu = \sum_j a_j\mu(A_j)$。
2. 对所有$a, b \ge 0$，$\int(a\varphi + b\psi)\,d\mu = a\int\varphi\,d\mu + b\int\psi\,d\mu$。
3. 若$\varphi \le \psi$，则$\int\varphi\,d\mu \le \int\psi\,d\mu$。
4. $A \mapsto \int_A\varphi\,d\mu$是$\mathcal{A}$上的测度。
:::

::: proof
(1) 按取值把集合$A_j$分组：对$\varphi$的每个值$c_k$，集合$E_k = \set{\varphi = c_k}$是满足$a_j = c_k$的那些$A_j$的不交并（$\varphi$在其上为$0$的集合$A_j$无论如何都只贡献$0$）。所以$\mu(E_k) = \sum_{j : a_j = c_k}\mu(A_j)$，乘以$c_k$再对$k$求和即得结论。

(2) 把$\varphi = \sum_k c_k\mathbf{1}_{E_k}$和$\psi = \sum_l d_l\mathbf{1}_{F_l}$写成标准形式。集合$E_k\cap F_l$两两不交，$a\varphi + b\psi = \sum_{k,l}(ac_k + bd_l)\mathbf{1}_{E_k\cap F_l}$，于是由(1)得

$$
\int(a\varphi + b\psi)\,d\mu = \sum_{k,l}(ac_k + bd_l)\mu(E_k\cap F_l) = a\sum_k c_k\mu(E_k) + b\sum_l d_l\mu(F_l),
$$

这是因为$E_k$是集合$E_k\cap F_l$（$l$取遍所有下标）的不交并，而$F_l$是集合$E_k\cap F_l$（$k$取遍所有下标）的不交并。

(3) 沿用同样的记号，只要$E_k\cap F_l \ne\varnothing$，就有$c_k \le d_l$，所以$\sum_{k,l}c_k\mu(E_k\cap F_l) \le \sum_{k,l}d_l\mu(E_k\cap F_l)$。

(4) 由(1)，$\int_A\varphi\,d\mu = \sum_k c_k\mu(E_k\cap A)$。每个$A \mapsto \mu(E_k\cap A)$都是测度，而测度的非负线性组合仍是测度。
:::

## 非负函数的积分

::: definition 非负可测函数的积分 {#def-integral-nonneg}
对可测函数$f\colon X\to[0, \infty]$，定义

$$
\int_X f\,d\mu = \sup\set{\int_X\varphi\,d\mu : \varphi \text{ 为简单函数},\ 0 \le \varphi \le f}.
$$
:::

由[[#lem-simple-well-defined]](3)，当$f$本身是简单函数时，这一定义与[[#def-integral-simple]]一致。由定义立即可得两条性质：若$0 \le f \le g$，则$\int f \le \int g$（$f$下方的每个简单函数都在$g$下方）；对常数$c \ge 0$，$\int cf = c\int f$。可加性$\int(f + g) = \int f + \int g$从上确界的定义来看**并不**显然——它是第一个重要定理的推论。

::: theorem 单调收敛定理（列维定理） {#thm-monotone-convergence}
设$f_1 \le f_2 \le f_3 \le \cdots$是可测函数$X\to[0,\infty]$，并设$f = \lim_n f_n$（逐点极限）。则

$$
\int_X f\,d\mu = \lim_{n\to\infty}\int_X f_n\,d\mu.
$$
:::

::: proof
$f$是可测的（[[measure-theory/measurable-functions#thm-measurable-limits]]）。积分$\int f_n$递增，且都不超过$\int f$（单调性），所以$L = \lim\int f_n$在$[0, \infty]$中存在，且$L \le \int f$。

为证反向不等式，设$\varphi$是满足$0 \le \varphi \le f$的简单函数，并设$0 < t < 1$。令

$$
E_n = \set{x : f_n(x) \ge t\varphi(x)}.
$$

这些集合可测，且随$n$递增。它们的并是$X$：若$\varphi(x) = 0$，则$x \in E_1$；若$\varphi(x) > 0$，则$f(x) \ge \varphi(x) > t\varphi(x)$，所以当$n$充分大时$f_n(x) > t\varphi(x)$。而$f_n \ge f_n\mathbf{1}_{E_n} \ge t\varphi\mathbf{1}_{E_n}$，所以

$$
\int f_n\,d\mu \ \ge\ t\int_{E_n}\varphi\,d\mu.
$$

由[[#lem-simple-well-defined]](4)和测度的下连续性（[[measure-theory/sigma-algebras#thm-continuity-measure]]），右端趋于$t\int_X\varphi\,d\mu$。因此$L \ge t\int\varphi$。令$t \to 1$，再对$\varphi$取上确界，即得$L \ge \int f$。
:::

::: intuition 为什么单调极限无害
非负函数的积分定义为位于图像**下方**的简单函数的面积的上确界。若$f_n$递增趋于$f$，则位于$f$下方的每个简单函数——除去一个可以任意接近$1$的因子$t$，并且限制在一列穷竭整个空间的集合上——最终都位于$f_n$的下方。所以极限函数的下方逼近最终也是序列各项的下方逼近，两个上确界必然相等。什么也不会丢失，因为图像只会向上移动；什么也不会多出来，因为图像永远不会越过$f$。
:::

注意证明在哪里用到了因子$t < 1$：没有它，集合$\set{f_n \ge \varphi}$不一定穷竭$X$（取$\varphi = f$）。该定理允许$\int f = \infty$，并且不需要控制函数，不需要一致性，也不需要测度有限——只需要单调性和非负性。

::: corollary 可加性与级数 {#cor-additivity}
对可测函数$f, g\colon X\to[0,\infty]$，有$\int(f + g)\,d\mu = \int f\,d\mu + \int g\,d\mu$。对可测函数$f_n\colon X\to[0,\infty]$，有

$$
\int_X\sum_{n=1}^\infty f_n\,d\mu = \sum_{n=1}^\infty\int_X f_n\,d\mu.
$$
:::

::: proof
由简单函数逼近定理（[[measure-theory/measurable-functions#thm-simple-approx]]），存在简单函数$\varphi_n \uparrow f$和$\psi_n \uparrow g$。于是$\varphi_n + \psi_n$是简单函数，且递增趋于$f + g$，所以由单调收敛定理和[[#lem-simple-well-defined]](2)，

$$
\int(f + g) = \lim\int(\varphi_n + \psi_n) = \lim\Bigl(\int\varphi_n + \int\psi_n\Bigr) = \int f + \int g.
$$

由归纳法，有限和的积分等于积分之和；而$\sum f_n$的部分和递增趋于整个级数的和，再用单调收敛定理即可完成证明。
:::

级数形式是一个有力的计算工具：对非负的项，积分与求和总可以交换次序。在下面的例子中，我们要用到稍后在[[#thm-riemann-lebesgue]]中证明的事实：在有界闭区间上，黎曼可积函数的勒贝格积分就是它的黎曼积分；两者我们都记为$\int_a^b f\,dx$。

::: quiz
设$f_n\colon X\to[0,\infty]$可测。在没有其他假设的情况下，下列哪个命题总是成立？
- [ ] 只要$f_n \to f$逐点成立，就有$\int\lim_n f_n = \lim_n\int f_n$。
- [x] $\int\sum_n f_n = \sum_n\int f_n$。
- [ ] $\int\sup_n f_n = \sup_n\int f_n$。
- [ ] $\int\liminf_n f_n = \liminf_n\int f_n$。
::: solution
非负函数项级数总可以逐项积分（[[#cor-additivity]]），因为部分和是递增的。其余命题都不成立：对$f_n = n\mathbf{1}_{(0,1/n)}$，逐点极限为$0$，而每个积分都是$1$，所以第一个和最后一个命题不成立；对$f_n = \mathbf{1}_{[n, n+1]}$，有$\int\sup_n f_n = \infty$，但$\sup_n\int f_n = 1$。当序列递增时，关于上确界的等式成立——这正是单调收敛定理。
:::
:::

::: example 通过积分求级数的和 {#ex-series}
证明$\displaystyle\int_0^\infty\frac{x}{e^x - 1}\,dx = \sum_{k=1}^\infty\frac{1}{k^2} = \frac{\pi^2}{6}$。
::: solution
当$x > 0$时，$\frac{x}{e^x - 1} = \frac{xe^{-x}}{1 - e^{-x}} = \sum_{k\ge1}xe^{-kx}$，这是公比为$e^{-x} < 1$的几何级数。各项非负，所以由[[#cor-additivity]]，可以在$(0, \infty)$上逐项积分：

$$
\int_0^\infty\frac{x}{e^x - 1}\,dx = \sum_{k=1}^\infty\int_0^\infty xe^{-kx}\,dx = \sum_{k=1}^\infty\frac{1}{k^2}.
$$

这里$\int_0^\infty xe^{-kx}\,dx = \lim_{N\to\infty}\int_0^N xe^{-kx}\,dx = \frac1{k^2}$（用分部积分法，并对$N\to\infty$用单调收敛定理）。级数之和为$\pi^2/6$，这是欧拉（Euler）的结果；两边的数值都是$1.6449\ldots$。这里不需要一致收敛——而且也没有一致收敛：对每个$K$，余项$\sum_{k>K}xe^{-kx} = \frac{xe^{-(K+1)x}}{1 - e^{-x}}$当$x \to 0^+$时都趋于$1$，而且积分区间是无穷区间。单调收敛定理一举解决了这两个困难。
:::
:::

::: widget plot
f: if(x <= n, (1 - x/n)^n, 0); exp(-x)
x: 0, 6
y: 0, 1.05
sliders: n=1:1:40:1
labels: (1 - x/n)^n\,\mathbf{1}_{[0,n]}; e^{-x}
caption: 函数$f_n = (1 - x/n)^n$（定义在$[0, n]$上，在此区间之外为$0$）随$n$递增趋于$e^{-x}$。观察这些图像如何在极限曲线下方单调上升。由单调收敛定理，$\int_0^n(1 - x/n)^n\,dx \to \int_0^\infty e^{-x}\,dx = 1$——不需要$[0, \infty)$上的一致收敛（实际上收敛确实是一致的，但积分是在无界区间上进行的，在那里单凭一致收敛什么也证明不了）。
:::

::: example 用单调收敛定理求极限 {#ex-mct-limit}
证明$\displaystyle\lim_{n\to\infty}\int_0^n\Bigl(1 - \frac xn\Bigr)^n dx = 1$。
::: solution
对$0 \le x \le n$，令$f_n(x) = (1 - x/n)^n$；对$x > n$，令$f_n(x) = 0$。固定$x$，当$n > x$时记$u = x/n \in [0, 1)$；则$\frac{d}{dn}\bigl[n\ln(1 - x/n)\bigr] = \ln(1 - u) + \frac{u}{1 - u} \ge 0$，因为右端在$u = 0$处为零，且其导数为$\frac{u}{(1-u)^2} \ge 0$。所以一旦$n > x$，$f_n(x)$就随$n$递增，而在此之前它等于$0$；因此$(f_n)$是递增的，其极限为$e^{-x}$（由$n\ln(1 - x/n) \to -x$）。由单调收敛定理，

$$
\lim_{n\to\infty}\int_0^n\Bigl(1 - \frac xn\Bigr)^ndx = \int_0^\infty e^{-x}\,dx = 1.
$$
:::
:::

## 零测集、马尔可夫不等式与法图引理

::: theorem 马尔可夫（Markov）不等式 {#thm-markov}
若$f\colon X\to[0, \infty]$可测，且$t > 0$，则

$$
\mu\bigl(\set{f \ge t}\bigr) \le \frac1t\int_X f\,d\mu.
$$
:::

::: proof
逐点地有$t\,\mathbf{1}_{\set{f\ge t}} \le f$，而左边是一个简单函数，其积分为$t\,\mu(\set{f \ge t})$。
:::

下面三个推论把“积分不受零测集影响”这一想法精确化。

- 若$f \ge 0$且$\int f\,d\mu = 0$，则几乎处处有$f = 0$：$\set{f > 0} = \bigcup_n\set{f \ge 1/n}$，而其中每个集合的测度都不超过$n\int f = 0$。
- 若$\int f\,d\mu < \infty$，则几乎处处有$f < \infty$：对每个$n$，$\mu(\set{f = \infty}) \le \mu(\set{f \ge n}) \le \frac1n\int f$。
- 若几乎处处有$f = g$（两者都非负），则$\int f = \int g$：设$N$是一个零测集，在$N$之外两者相等，则任何满足$\varphi \le f$的简单函数都满足$\int\varphi = \int\varphi\mathbf{1}_{N^c} + \int\varphi\mathbf{1}_N$，其中最后一项为$0$，且$\varphi\mathbf{1}_{N^c} \le g$；所以$\int f \le \int g$，由对称性，两者相等。

例如$\int_{[0,1]}\mathbf{1}_\Q\,d\lambda = 1\cdot\lambda(\Q\cap[0,1]) = 0$：[[real-analysis/riemann-integral#ex-dirichlet-integral]]中的“反派”狄利克雷（Dirichlet）函数，其勒贝格积分为$0$。在没有单调性可用时，第二个定理对积分可能出现的情况给出了限制。

::: theorem 法图引理 {#thm-fatou}
对任意可测函数$f_n\colon X\to[0,\infty]$，

$$
\int_X\liminf_{n\to\infty}f_n\,d\mu \ \le\ \liminf_{n\to\infty}\int_X f_n\,d\mu.
$$
:::

::: proof
令$g_k = \inf_{n\ge k}f_n$。它们可测、非负、随$k$递增，且$\lim_k g_k = \liminf_n f_n$。由于对每个$n \ge k$都有$g_k \le f_n$，由单调性得$\int g_k \le \inf_{n\ge k}\int f_n$。由单调收敛定理，

$$
\int\liminf_n f_n = \lim_{k\to\infty}\int g_k \le \lim_{k\to\infty}\inf_{n\ge k}\int f_n = \liminf_n\int f_n.
$$
:::

::: example 质量可能消失 {#ex-fatou-strict}
利用(a) $[0, 1]$上的$f_n = n\mathbf{1}_{(0, 1/n)}$和(b) $\R$上的$g_n = \mathbf{1}_{[n, n+1]}$，说明法图引理中的不等号可以严格成立。
::: solution
(a) 对$x \in (0, 1]$，只要$n \ge 1/x$，就有$f_n(x) = 0$；又$f_n(0) = 0$。所以处处有$f_n \to 0$，从而$\int\liminf f_n = 0$。但对所有$n$都有$\int f_n = n\cdot\frac1n = 1$，所以$\liminf\int f_n = 1$。质量集中到越来越小的集合上，“竖直地”消失了。

(b) 一旦$n > x$，就有$g_n(x) = 0$，所以极限仍为$0$，而对所有$n$都有$\int g_n = 1$。这里质量“水平地”逃逸到了无穷远处。两种情形下都是$0 < 1$：取极限时，质量可能丢失，但绝不会增加。
:::
:::

::: widget plot
f: n^2*x*exp(-n*x)
x: 0, 2
y: 0, 8
sliders: n=1:1:25:1
labels: f_n(x) = n^2xe^{-nx}
caption: 另一个丢失质量的序列：$f_n(x) = n^2xe^{-nx}$在每个$x \ge 0$处都趋于$0$，但对每个$n$都有$\int_0^\infty f_n = 1$。法图引理允许这种情况发生（$0 \le 1$）。控制收敛定理不适用，图像显示了原因：没有一个可积函数能位于所有$f_n$的上方——它们的上包络在$0$附近的行为像$4/(e^2x)$，而这个函数不可积。
:::

## 可积函数

为了对可正可负的函数积分，我们把它分解为$f = f^+ - f^-$（[[measure-theory/measurable-functions#thm-measurable-algebra]]），然后相减，只要不出现$\infty - \infty$即可。

::: definition 可积函数 {#def-integrable}
若可测函数$f\colon X\to[-\infty,\infty]$满足$\int_X\abs{f}\,d\mu < \infty$，就称$f$是**可积**的。此时它的积分为

$$
\int_X f\,d\mu = \int_X f^+\,d\mu - \int_X f^-\,d\mu,
$$

这是两个有限数之差（因为$f^\pm \le \abs f$）。可积函数的全体记为$L^1(\mu)$或$L^1(X)$；对区间上的勒贝格测度，记为$L^1(a, b)$。
:::

可积函数几乎处处有限（马尔可夫不等式），所以在一个零测集上修改它的值、使之成为实值函数，不会改变任何东西。注意，定义要求的是**绝对**可积：勒贝格积分中没有“条件收敛”的积分，正如实数的无序和只对绝对收敛的级数才有意义（[[real-analysis/series#thm-rearrangement-abs]]）。

::: theorem 线性性与单调性 {#thm-integral-linear}
设$f, g\colon X\to\R$可积，$a, b \in \R$。则$af + bg$可积，且

$$
\int(af + bg)\,d\mu = a\int f\,d\mu + b\int g\,d\mu.
$$

若几乎处处有$f \le g$，则$\int f\,d\mu \le \int g\,d\mu$；并且$\bigl\lvert\int f\,d\mu\bigr\rvert \le \int\abs f\,d\mu$。
:::

::: proof
$\abs{af + bg} \le \abs a\abs f + \abs b\abs g$，由[[#cor-additivity]]，右边的积分有限，所以$af + bg$可积。对$h = f + g$，有$h^+ - h^- = f^+ - f^- + g^+ - g^-$，因此$h^+ + f^- + g^- = h^- + f^+ + g^+$，这是非负函数之间的恒等式。利用[[#cor-additivity]]对两边积分，再减去（有限的）量$\int h^- + \int f^- + \int g^-$，就得到$\int h = \int f + \int g$。当$c \ge 0$时，$(cf)^\pm = cf^\pm$；当$c < 0$时，$(cf)^\pm = \abs c f^\mp$；无论哪种情形，都有$\int cf = c\int f$。

若几乎处处有$f \le g$，则$g - f$几乎处处等于一个非负函数，所以$\int g - \int f = \int(g - f) \ge 0$。最后，$\bigl\lvert\int f\bigr\rvert = \bigl\lvert\int f^+ - \int f^-\bigr\rvert \le \int f^+ + \int f^- = \int\abs f$。
:::

下面是第三个、也是最常用的收敛定理。通过巧妙地选取非负函数，它可以由法图引理推出。

::: theorem 控制收敛定理 {#thm-dct}
设$f_n$是可测函数，几乎处处有$f_n \to f$，并设存在可积函数$g$，使得对每个$n$，几乎处处有$\abs{f_n} \le g$。则$f$可积，

$$
\int_X\abs{f_n - f}\,d\mu \to 0, \qquad\text{特别地}\qquad \int_X f_n\,d\mu \to \int_X f\,d\mu.
$$
:::

::: proof
在一个零测集上改变所有函数的值不会改变任何积分，所以我们可以假定（在一个适当的零测集上把它们重新定义为$0$）$f_n \to f$和$\abs{f_n} \le g$处处成立，并且$g$取有限值。于是$f$可测，且$\abs f \le g$，所以$f$可积。函数$2g - \abs{f_n - f}$非负（因为$\abs{f_n - f} \le \abs{f_n} + \abs f \le 2g$），并且收敛于$2g$。由法图引理得

$$
\int 2g\,d\mu \le \liminf_n\int\bigl(2g - \abs{f_n - f}\bigr)d\mu = \int 2g\,d\mu - \limsup_n\int\abs{f_n - f}\,d\mu.
$$

由于$\int 2g < \infty$，可以把它从两边消去：$\limsup_n\int\abs{f_n - f} \le 0$，所以$\int\abs{f_n - f} \to 0$。最后，由[[#thm-integral-linear]]，$\bigl\lvert\int f_n - \int f\bigr\rvert \le \int\abs{f_n - f}$。
:::

::: warning 控制函数不能依赖于n
界$\abs{f_n} \le g$必须对所有$n$用**同一个**可积函数$g$成立。在[[#ex-fatou-strict]]中，每个$f_n = n\mathbf{1}_{(0,1/n)}$都可积，但位于它们全体上方的最小函数$\sup_n f_n$在$0$附近约为$1/x$，不可积——而定理的结论也不成立。应用该定理时，要明确写出控制函数，并验证它可积。
:::

::: example 控制收敛定理的应用 {#ex-dct}
求$\displaystyle\lim_{n\to\infty}\int_0^\infty\frac{n\sin(x/n)}{x(1 + x^2)}\,dx$。
::: solution
对$x > 0$，令$f_n(x) = \frac{n\sin(x/n)}{x(1+x^2)}$。由于当$u \to 0$时$\frac{\sin u}{u} \to 1$，对固定的$x$有$n\sin(x/n) = x\cdot\frac{\sin(x/n)}{x/n} \to x$，所以$f_n(x) \to \frac{1}{1+x^2}$。由于$\abs{\sin u} \le \abs u$，有$\abs{f_n(x)} \le \frac{x}{x(1+x^2)} = \frac{1}{1 + x^2}$，它在$(0, \infty)$上可积，积分为$\lim_{N}\arctan N = \frac\pi2$（单调收敛定理）。由控制收敛定理，

$$
\lim_{n\to\infty}\int_0^\infty\frac{n\sin(x/n)}{x(1+x^2)}\,dx = \int_0^\infty\frac{dx}{1 + x^2} = \frac{\pi}{2}.
$$

（数值上，$n = 10$时该积分为$1.4948$，$n = 1000$时为$1.5700$。）
:::
:::

::: remark 如何选择收敛定理
要证明$\int f_n \to \int f$，可依次进行以下检查。

| 情形 | 工具 | 需要验证的条件 |
|---|---|---|
| $0 \le f_1 \le f_2 \le \cdots$ | 单调收敛定理 | 可测性、非负性、单调性 |
| 非负级数$\sum f_n$ | [[#cor-additivity]] | 各项非负 |
| 几乎处处$f_n \to f$，$\abs{f_n} \le g$ | 控制收敛定理 | 一个明确给出的、与$n$无关的$g$，且$\int g < \infty$ |
| $f_n \ge 0$，只需要一个不等式 | 法图引理 | 非负性 |
| 有限测度空间上的有界函数$f_n$ | 取$g$为常数的控制收敛定理 | 一致的界$\abs{f_n} \le M$以及$\mu(X) < \infty$ |

如果都不适用，那么在尝试证明收敛之前，先看看是否有质量逃逸——像$n\mathbf{1}_{(0,1/n)}$那样向上逃逸，或像$\mathbf{1}_{[n,n+1]}$那样逃逸到无穷远处：积分也许根本就不收敛于极限函数的积分。
:::

::: quiz
用勒贝格理论论证$\displaystyle\lim_{n\to\infty}\int_0^1 x^n\,dx = 0$时，下列哪个理由是正确的？
- [ ] 单调收敛定理，因为$x^n \to 0$。
- [x] 控制收敛定理，取$[0, 1]$上的$g = 1$。
- [ ] $x^n$在$[0, 1]$上一致收敛。
- [ ] 法图引理，它在这里给出等式。
::: solution
对$x \in [0, 1)$有$x^n \to 0$，因而在$[0,1]$上几乎处处成立；又$\abs{x^n} \le 1$，右边的常数在$[0, 1]$上可积（测度有限）。所以由控制收敛定理，极限为$\int 0 = 0$。按照上面的表述，单调收敛定理需要一个**递增**的序列（这里的序列是递减的）；收敛不是一致的；而法图引理只给出不等式$0 \le \liminf\int x^n$。
:::
:::

## 黎曼积分与勒贝格积分

新的积分与旧的积分一致吗？对黎曼可积函数来说，答案是肯定的；而且证明还给出了勒贝格对黎曼可积性的刻画。

::: theorem 黎曼可积函数是勒贝格可积的 {#thm-riemann-lebesgue}
设$f\colon[a, b]\to\R$有界。

1. 若$f$黎曼可积，则$f$勒贝格可测且可积，并且$\int_{[a,b]}f\,d\lambda = \int_a^b f(x)\,dx$。
2. （**勒贝格准则**）$f$黎曼可积，当且仅当$f$的不连续点所成的集合的勒贝格测度为$0$。
:::

::: proof
取$[a, b]$的一列分割$P_1 \subseteq P_2 \subseteq \cdots$，每一个都是前一个的加细，并且细度（最长子区间的长度）趋于$0$；若$f$黎曼可积，还要求它们满足$U(f, P_k) - L(f, P_k) \to 0$（由[[real-analysis/riemann-integral#thm-riemann-criterion]]并利用加细，这是可以做到的）。设$\ell_k$和$u_k$是这样的阶梯函数：在$P_k$的每个子区间$I$的内部，它们分别等于$\inf_I f$和$\sup_I f$，而在有限多个分点处等于$f$。于是$\ell_k \le f \le u_k$，$\ell_k$递增而$u_k$递减（由加细），并且

$$
\int\ell_k\,d\lambda = L(f, P_k), \qquad \int u_k\,d\lambda = U(f, P_k).
$$

令$\ell = \lim\ell_k$，$u = \lim u_k$；它们是博雷尔（Borel）可测的，$\ell \le f \le u$，并且由控制收敛定理（所有函数都以$\sup\abs f$为界，且定义在测度有限的集合上），$\int\ell = \lim L(f, P_k)$，$\int u = \lim U(f,P_k)$。

**关键观察。**设$x$不是任何$P_k$的分点（除可数多个点外，所有点都是如此）。则$u(x) = \ell(x)$当且仅当$f$在$x$处连续。事实上，若$f$在$x$处连续，且$\eps > 0$，取$\delta$使得当$\abs{y - x} < \delta$时$\abs{f(y) - f(x)} < \eps$；一旦细度小于$\delta$，$P_k$中含$x$的子区间就落在与$x$的距离小于$\delta$的范围内，所以$u_k(x) - \ell_k(x) \le 2\eps$。反之，若$u(x) = \ell(x)$且$\eps > 0$，则存在某个$k$使$u_k(x) - \ell_k(x) < \eps$；$x$位于$P_k$的某个子区间$I$的内部，并且每个$y \in I$都满足$\abs{f(y) - f(x)} \le \sup_I f - \inf_I f < \eps$。所以$f$在$x$处连续。

(1) 若$f$黎曼可积，则$\int(u - \ell)\,d\lambda = \lim\bigl(U(f, P_k) - L(f, P_k)\bigr) = 0$，所以几乎处处有$u = \ell$（马尔可夫不等式），从而几乎处处有$f = \ell$。由于$\lambda$是完备的，$f$勒贝格可测，并且$\int f\,d\lambda = \int\ell\,d\lambda = \lim L(f, P_k) = \int_a^b f$。

(2) 由关键观察，$f$的不连续点集$D$与$\set{u \ne \ell}$只相差可数多个点。若$f$黎曼可积，则由(1)，$\set{u \ne \ell}$是零测集，所以$D$是零测集。反之，若$D$是零测集，则几乎处处有$u = \ell$，所以$\lim(U(f, P_k) - L(f, P_k)) = \int(u - \ell) = 0$，由黎曼准则，$f$黎曼可积。
:::

这就完成了[[real-analysis/riemann-integral#thm-lebesgue-criterion]]的证明，该定理在黎曼积分一章中没有给出完整的证明。勒贝格积分是真正的推广：狄利克雷函数勒贝格可积，但不黎曼可积；无界函数也不需要特殊处理——例如，对$x^{-1/2}\mathbf{1}_{[1/n, 1]}$应用单调收敛定理，得$\int_{(0,1]}x^{-1/2}\,d\lambda = \lim_n\int_{1/n}^1x^{-1/2}\,dx = \lim(2 - 2/\sqrt n) = 2$。

::: remark 反常积分
有一种情形**没有**被涵盖：条件收敛的反常积分。反常黎曼积分$\int_0^\infty\frac{\sin x}{x}\,dx = \lim_{N\to\infty}\int_0^N\frac{\sin x}{x}\,dx$存在（并且等于$\pi/2$），但$\frac{\sin x}{x}$在$(0,\infty)$上不是勒贝格可积的：在$[k\pi, (k+1)\pi]$上，$\abs{\sin x}/x$的积分至少为$\frac{2}{(k+1)\pi}$，而这些数像调和级数一样，加起来等于$\infty$。与此相反，对非负函数，由单调收敛定理，反常黎曼积分与勒贝格积分总是一致的。
:::

## 积分号下求导

控制收敛定理把许多经典的形式运算变成了定理。其中最有用的是对含参变量积分求导。

::: theorem 积分号下求导 {#thm-diff-under-integral}
设$(a, b)$是开区间，$f\colon X\times(a, b)\to\R$是满足以下条件的函数：

1. 对每个$t \in (a, b)$，$x \mapsto f(x, t)$可积；
2. 对每个$x$，$t \mapsto f(x, t)$可导；
3. 存在可积函数$g$，使得对所有$x$和$t$，$\bigl\lvert\frac{\partial f}{\partial t}(x, t)\bigr\rvert \le g(x)$。

则$F(t) = \int_X f(x, t)\,d\mu(x)$在$(a, b)$上可导，且$F'(t) = \displaystyle\int_X\frac{\partial f}{\partial t}(x, t)\,d\mu(x)$。
:::

::: proof
固定$t$，并设$h_n \to 0$，$h_n \ne 0$，且$t + h_n \in (a, b)$。差商

$$
q_n(x) = \frac{f(x, t + h_n) - f(x, t)}{h_n}
$$

可测，并且对每个$x$都收敛于$\frac{\partial f}{\partial t}(x, t)$，因此后者也可测。由中值定理（[[real-analysis/differentiation#thm-mvt]]），对介于$t$与$t + h_n$之间的某个$s$，有$q_n(x) = \frac{\partial f}{\partial t}(x, s)$，所以$\abs{q_n(x)} \le g(x)$。由控制收敛定理和线性性，

$$
\frac{F(t + h_n) - F(t)}{h_n} = \int_X q_n\,d\mu \ \longrightarrow\ \int_X\frac{\partial f}{\partial t}(x, t)\,d\mu(x).
$$

由于这对每个序列$h_n \to 0$都成立，由极限的序列准则（[[real-analysis/continuity#thm-sequential-limit]]）即得所求的导数。
:::

::: example 一个高斯（Gauss）积分 {#ex-gaussian}
设$F(t) = \displaystyle\int_0^\infty e^{-x^2}\cos(tx)\,dx$。已知$F(0) = \frac{\sqrt\pi}{2}$，证明$F(t) = \frac{\sqrt\pi}{2}e^{-t^2/4}$。
::: solution
被积函数可积（以$e^{-x^2}$为界），并且$\bigl\lvert\frac{\partial}{\partial t}e^{-x^2}\cos(tx)\bigr\rvert = \abs{xe^{-x^2}\sin(tx)} \le xe^{-x^2}$，后者在$(0, \infty)$上可积，且与$t$无关。由[[#thm-diff-under-integral]]，

$$
F'(t) = -\int_0^\infty xe^{-x^2}\sin(tx)\,dx = \Bigl[\tfrac12e^{-x^2}\sin(tx)\Bigr]_0^\infty - \frac t2\int_0^\infty e^{-x^2}\cos(tx)\,dx = -\frac t2F(t),
$$

这里在$[0, N]$上分部积分，再令$N\to\infty$。所以$\frac{d}{dt}\bigl(e^{t^2/4}F(t)\bigr) = e^{t^2/4}\bigl(F'(t) + \frac t2F(t)\bigr) = 0$，从而$e^{t^2/4}F(t) = F(0)$。因此$F(t) = \frac{\sqrt\pi}2e^{-t^2/4}$——这正是高斯函数的傅里叶（Fourier）变换背后的计算（[[pde/fourier-transform]]）。
:::
:::

::: application 数学期望
在概率论中，概率空间$(\Omega, \mathcal{F}, P)$上的随机变量$X$的积分就是它的**数学期望**$\E[X] = \int_\Omega X\,dP$。本章的定理成为这门学科的基本法则：马尔可夫不等式$P(\abs X \ge t) \le \E\abs X/t$；期望的线性性；对非负的$X_n$，$\E\bigl[\sum X_n\bigr] = \sum\E[X_n]$（因此在$A_1, A_2, \dots$中发生的事件个数的期望为$\sum P(A_n)$）；以及在控制条件下极限与期望的交换，这在[[probability/limit-theorems]]一章中随处可见。
:::

::: history
亨利·勒贝格（Henri Lebesgue）在1902年的博士论文《积分、长度与面积》（*Intégrale, longueur, aire*）和《积分与原函数研究讲义》（*Leçons sur l'intégration et la recherche des fonctions primitives*，1904年）中提出了他的积分；博士论文中已经包含了有界收敛定理，它是控制收敛定理的一个特例，勒贝格后来证明了一般情形。贝波·列维（Beppo Levi）在1906年证明了单调收敛定理；同年，皮埃尔·法图（Pierre Fatou）关于三角级数和泰勒级数的博士论文中包含了现在以他的名字命名的引理。朱塞佩·维塔利（Giuseppe Vitali）在1907年找到了在有限测度空间上极限与积分可以交换次序的确切条件（一致可积性）。像本章这样在抽象测度空间上构造积分的做法，是在随后几十年中发展起来的，其中值得一提的是弗雷歇（Fréchet）1915年的工作，以及柯尔莫哥洛夫（Kolmogorov）1933年的测度论概率论。
:::

## 后续内容

本章的积分是现代分析学和概率论的基础。在[[measure-theory/lp-spaces]]一章中，可积函数构成赋范空间$L^1$，与之并列的还有满足$\int\abs f^p < \infty$的函数所构成的空间$L^p$；我们将证明它们是完备的——这就是里斯-费希尔（Riesz–Fischer）定理，它的证明是单调收敛定理和法图引理的直接应用——并比较函数列各种不同的收敛方式。在概率论中（[[probability/expectation]]），积分就是**数学期望**$\E[X] = \int X\,dP$，而收敛定理为[[probability/limit-theorems]]一章中随处可见的极限与期望的交换提供了依据。关于累次积分的富比尼（Fubini）定理、傅里叶变换（[[pde/fourier-transform]]）以及微分方程理论，都建立在这里所证明的定理之上。

::: summary
- 对非负简单函数，$\int\sum c_k\mathbf{1}_{E_k} = \sum c_k\mu(E_k)$；对非负可测函数$f$，$\int f$是位于$f$下方的简单函数的积分的上确界。
- **单调收敛定理**：若$0 \le f_n \uparrow f$，则$\int f_n \to \int f$（[[#thm-monotone-convergence]]）。推论：可加性，以及非负级数的逐项积分。
- 马尔可夫不等式$\mu(f \ge t) \le \frac1t\int f$；$\int\abs{f} = 0$当且仅当几乎处处有$f = 0$；积分不受零测集的影响。
- **法图引理**：对$f_n \ge 0$，$\int\liminf f_n \le \liminf\int f_n$；取极限时质量可能消失，但不会凭空出现。
- 若$\int\abs f < \infty$，则称$f$可积，并且$\int f = \int f^+ - \int f^-$；积分具有线性性和单调性。
- **控制收敛定理**：几乎处处$f_n \to f$且$\abs{f_n} \le g \in L^1$蕴涵$\int\abs{f_n - f} \to 0$（[[#thm-dct]]）；它为积分号下求导提供了依据。
- 黎曼可积函数是勒贝格可积的，且积分相同；有界函数黎曼可积，当且仅当它的不连续点构成零测集（[[#thm-riemann-lebesgue]]）。
:::

## 习题

::: exercise 计算简单函数的积分 {level=1 check="10"}
对$\varphi = 2\cdot\mathbf{1}_{[0,2]} + 3\cdot\mathbf{1}_{[1,3]}$，计算$\int_\R\varphi\,d\lambda$。
::: solution
由[[#lem-simple-well-defined]](2)，积分是可加的，所以它等于$2\lambda([0, 2]) + 3\lambda([1, 3]) = 4 + 6 = 10$。用[[measure-theory/measurable-functions#ex-canonical]]中的标准形式计算，同样得到$2\cdot1 + 5\cdot1 + 3\cdot1 = 10$。
:::
:::

::: exercise 托马（Thomae）函数 {level=1 check="0"}
计算$\int_{[0,1]}T\,d\lambda$，其中$T$是托马函数（[[real-analysis/continuity#ex-thomae]]）。
::: solution
除了在可数集$\Q\cap[0,1]$上之外，$T = 0$，而这个可数集是零测集。所以几乎处处有$T = 0$，从而$\int T\,d\lambda = 0$，这与[[real-analysis/riemann-integral#ex-thomae-integral]]中算出的黎曼积分一致。
:::
:::

::: exercise 无界的被积函数 {level=1 check="3/2"}
计算$\int_{(0, 1]}x^{-1/3}\,d\lambda$。
::: solution
函数$f_n = x^{-1/3}\mathbf{1}_{[1/n, 1]}$在$(0,1]$上递增趋于$x^{-1/3}$，并且由微积分基本定理和[[#thm-riemann-lebesgue]]，$\int f_n = \int_{1/n}^1x^{-1/3}\,dx = \frac32\bigl(1 - n^{-2/3}\bigr)$。由单调收敛定理，所求积分为$\lim\frac32(1 - n^{-2/3}) = \frac32$。
:::
:::

::: exercise 积分的极限 {level=2 check="e - 1"}
求$\displaystyle\lim_{n\to\infty}\int_0^1\Bigl(1 + \frac xn\Bigr)^ndx$，并指出你所用的收敛定理。
::: solution
对每个$x \in [0, 1]$，$(1 + x/n)^n \to e^x$（其对数$n\ln(1 + x/n) \to x$）。由于$\ln(1 + u) \le u$，在$[0, 1]$上有$(1 + x/n)^n \le e^x \le e$，而常数$e$在$[0,1]$上可积。由控制收敛定理，极限为$\int_0^1e^x\,dx = e - 1$。（该序列关于$n$也是递增的，所以用单调收敛定理同样可以。）
:::
:::

::: exercise 对级数逐项积分 {level=2 check="pi^2/6"}
证明$\displaystyle\int_0^1\frac{-\ln x}{1 - x}\,dx = \sum_{k=1}^\infty\frac{1}{k^2}$，并由此求出它的值。
::: hint
展开$\frac{1}{1-x} = \sum_{k\ge0}x^k$，并利用$\int_0^1x^k(-\ln x)\,dx = \frac{1}{(k+1)^2}$。
:::
::: solution
当$0 < x < 1$时，$\frac{-\ln x}{1-x} = \sum_{k\ge0}x^k(-\ln x)$，这是一个非负项级数。由[[#cor-additivity]]，

$$
\int_0^1\frac{-\ln x}{1 - x}\,dx = \sum_{k=0}^\infty\int_0^1x^k(-\ln x)\,dx = \sum_{k=0}^\infty\frac{1}{(k+1)^2} = \frac{\pi^2}{6}.
$$

积分$\int_0^1x^k(-\ln x)\,dx = \frac{1}{(k+1)^2}$可以这样得到：在$[\delta, 1]$上分部积分，再令$\delta \to 0$并利用单调收敛定理。
:::
:::

::: exercise 法图引理需要非负性 {level=2}
设$\R$上的$f_n = -\mathbf{1}_{[n, n+1]}$。计算$\int\liminf_n f_n\,d\lambda$和$\liminf_n\int f_n\,d\lambda$，并解释为什么这与法图引理并不矛盾。
::: solution
一旦$n > x$，就有$f_n(x) = 0$，所以$\liminf_n f_n = 0$，$\int\liminf f_n = 0$。但对每个$n$都有$\int f_n = -1$，所以$\liminf\int f_n = -1$。这里$\int\liminf f_n = 0 > -1 = \liminf\int f_n$，与法图不等式的方向相反。这并不矛盾，因为$f_n$不是非负的；对于以某个固定的可积函数为下界的函数（$f_n \ge -g$），该引理确实成立（将它应用于$f_n + g$即可）。
:::
:::

::: exercise 积分为零 {level=2}
设$f$可积。证明：对每个$A \in \mathcal{A}$都有$\int_A f\,d\mu = 0$，当且仅当几乎处处有$f = 0$。
::: solution
若几乎处处有$f = 0$，则几乎处处有$f\mathbf{1}_A = 0$，所以$\int_A f = 0$。反之，取$A = \set{f > 0}$：则$\int f^+ = \int_A f = 0$，由马尔可夫不等式的第一个推论，几乎处处有$f^+ = 0$。类似地，取$A = \set{f < 0}$，得$\int f^- = -\int_A f = 0$，从而几乎处处有$f^- = 0$。所以几乎处处有$f = f^+ - f^- = 0$。
:::
:::

::: exercise 可积函数项级数 {level=3}
设$f_n$可积，且$\sum_n\int\abs{f_n}\,d\mu < \infty$。证明：对几乎每个$x$，$\sum_n f_n(x)$绝对收敛；其和$f$可积；并且$\int f\,d\mu = \sum_n\int f_n\,d\mu$。
::: hint
对$G = \sum\abs{f_n}$应用[[#cor-additivity]]，再对部分和应用控制收敛定理。
:::
::: solution
令$G = \sum_n\abs{f_n}$，它是取值于$[0, \infty]$的可测函数。由[[#cor-additivity]]，$\int G = \sum\int\abs{f_n} < \infty$，所以几乎处处有$G < \infty$（马尔可夫不等式）。在$G(x) < \infty$的点处，级数$\sum f_n(x)$绝对收敛；令$f$在这些点处等于级数的和，在其余点处等于$0$。部分和$S_N = \sum_{n\le N}f_n$几乎处处收敛于$f$，并满足$\abs{S_N} \le G$，而$G$可积。由控制收敛定理和线性性，$\int f = \lim_N\int S_N = \lim_N\sum_{n\le N}\int f_n = \sum_n\int f_n$。
:::
:::

::: exercise 积分的绝对连续性 {level=3}
设$f$可积。证明：对每个$\eps > 0$，存在$\delta > 0$，使得只要$\mu(A) < \delta$，就有$\int_A\abs{f}\,d\mu < \eps$。
::: hint
截断：$\min(\abs f, n) \uparrow \abs f$。
:::
::: solution
令$g_n = \min(\abs f, n)$。它们递增趋于$\abs f$，所以由单调收敛定理，$\int(\abs f - g_n) \to 0$；取$n$使$\int(\abs f - g_n) < \eps/2$。令$\delta = \eps/(2n)$。若$\mu(A) < \delta$，则

$$
\int_A\abs f\,d\mu = \int_A(\abs f - g_n)\,d\mu + \int_Ag_n\,d\mu \le \frac\eps2 + n\,\mu(A) < \frac\eps2 + \frac\eps2 = \eps.
$$

（对可积函数而言，小集合上的积分也小——序列$n\mathbf{1}_{(0, 1/n)}$就不具有这一性质：它的每一项都可积，但不是**一致**地可积。）
:::
:::
