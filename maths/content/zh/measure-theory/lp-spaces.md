两个函数相距多远？不同的问题需要不同的答案。如果我们希望$g$在**每一**点处都逼近$f$，合适的距离就是最大的差距$\sup\abs{f - g}$，而按这种距离收敛就是一致收敛（[[real-analysis/uniform-convergence]]）。如果我们只关心平均误差，那么面积$\int\abs{f - g}$更合适。工程师和统计学家用$\int\abs{f - g}^2$来度量误差，即“能量”或均方误差，它具有内积的几何结构。每一种选择都使一个函数空间成为度量空间（[[real-analysis/metric-spaces]]），并且每一种选择都赋予“$f_n \to f$”不同的含义。

本章研究整个距离族$\norm{f - g}_p = \bigl(\int\abs{f - g}^p\,d\mu\bigr)^{1/p}$。我们将证明使它们成为距离的两个不等式——赫尔德（Hölder）不等式和闵可夫斯基（Minkowski）不等式——以及使它们有用的定理：空间$L^p$是**完备**的。这正是现代分析学偏爱勒贝格（Lebesgue）积分而不是黎曼（Riemann）积分的深层原因：在[[real-analysis/metric-spaces#ex-incomplete]]中我们看到，连续函数在距离$\int\abs{f - g}$下构成一个不完备的空间，而勒贝格可积函数恰好就是填补这些空洞所需要的东西。最后，我们比较各种不同的收敛方式——几乎处处收敛、$L^p$收敛、依测度收敛、一致收敛——并通过例子看到，其中任何两种都不相同。

本章中，$(X, \mathcal{A}, \mu)$始终是一个测度空间。

## Lp空间

::: definition Lp空间 {#def-lp}
对$1 \le p < \infty$和可测函数$f\colon X\to\R$，令

$$
\norm{f}_p = \Bigl(\int_X\abs{f}^p\,d\mu\Bigr)^{1/p},
$$

并令$\norm{f}_\infty = \inf\set{M \ge 0 : \abs{f} \le M \text{ 几乎处处成立}}$，称为$\abs f$的**本性上确界**。对$1 \le p \le \infty$，$L^p(\mu)$是满足$\norm f_p < \infty$的可测函数$f$的全体，其中几乎处处相等的两个函数视为同一个元素。
:::

这种等同是不得不做的：由马尔可夫（Markov）不等式（[[measure-theory/lebesgue-integral#thm-markov]]），$\norm{f}_p = 0$当且仅当几乎处处有$f = 0$，而距离只能在相等的点之间为零。所以$L^p$的元素实际上是函数的等价类，“$f$在点$x$处的值”没有意义，而积分、范数以及“几乎处处”成立的命题都有意义。定义$\norm{f}_\infty$的下确界是可以取到的：对每个$n$，几乎处处有$\abs f \le \norm f_\infty + \frac1n$，而可数多个零测集之并仍是零测集。所以，例如，在$[0, 2]$上等于$x^2$、只在$x = 1$处取值$100$的函数满足$\norm{f}_\infty = 4$：一个点不起作用。

有两种特殊情形值得专门命名。对区间上的勒贝格测度，记为$L^p(a, b)$。对$\N$上的计数测度，$L^p$就是满足$\norm{a}_p = \bigl(\sum\abs{a_n}^p\bigr)^{1/p} < \infty$的数列$a = (a_n)$所构成的空间$\ell^p$（这里每个点的测度都是正的，所以不需要作任何等同）。对$\set{1, \dots, n}$上的计数测度，我们就回到了$\R^n$上的范数$\norm{x}_p$，它们的单位球画在下文中。

::: example x的幂 {#ex-powers}
设$a > 0$，$1 \le p < \infty$。判断$f(x) = x^{-a}$何时属于$L^p(0, 1)$，何时属于$L^p(1, \infty)$。
::: solution
$\abs f^p = x^{-ap}$。在$(0, 1)$上，由单调收敛定理，$\int_0^1x^{-ap}\,dx = \lim_{\delta\to0}\int_\delta^1x^{-ap}\,dx$，它有限（且等于$\frac{1}{1 - ap}$）当且仅当$ap < 1$。在$(1, \infty)$上，$\int_1^\infty x^{-ap}\,dx = \lim_N\int_1^N x^{-ap}\,dx$有限（等于$\frac{1}{ap - 1}$）当且仅当$ap > 1$。所以$x^{-a} \in L^p(0, 1)$当且仅当$p < 1/a$，而$x^{-a} \in L^p(1, \infty)$当且仅当$p > 1/a$。大的$p$惩罚高耸的尖峰；小的$p$惩罚衰减缓慢的尾部。在$(0, \infty)$上，$x$的任何幂都不属于任何$L^p$。
:::
:::

::: widget plot
f: x^(-a)
x: 0.02, 4
y: 0, 8
sliders: a=0.5:0.1:2:0.05
vlines: 1
caption: 函数$x^{-a}$。在$0$附近，图像是一个尖峰，其$p$次幂下方的面积有限当且仅当$ap < 1$；在$x = 1$之外，图像是一条尾巴，其$p$次幂下方的面积有限当且仅当$ap > 1$。当$a = \tfrac12$时：尖峰属于$L^1(0,1)$，但不属于$L^2(0, 1)$；尾部只在$p > 2$时属于$L^p(1, \infty)$。移动$a$，并对$p = 1$和$p = 2$判断函数在虚线的哪一侧是$p$次可积的。
:::

## 赫尔德不等式与闵可夫斯基不等式

若指数$p, q \in [1, \infty]$满足$\frac1p + \frac1q = 1$（约定$\frac1\infty = 0$），就称它们是**共轭**的：例如$2$与$2$，$3$与$\tfrac32$，$1$与$\infty$。一切都建立在一个关于数的不等式之上。

::: lemma 杨（Young）不等式 {#lem-young}
设$1 < p, q < \infty$是共轭指数。则对所有$a, b \ge 0$，

$$
ab \le \frac{a^p}{p} + \frac{b^q}{q},
$$

且等号成立当且仅当$a^p = b^q$。
:::

::: proof
若$a = 0$或$b = 0$，不等式显然成立，且等号成立当且仅当两者都为$0$。否则，对数函数在$(0, \infty)$上是严格凹函数（它的二阶导数为$-1/t^2 < 0$），所以对$u, v > 0$和$\theta = \frac1p \in (0, 1)$，

$$
\ln\bigl(\theta u + (1 - \theta)v\bigr) \ge \theta\ln u + (1 - \theta)\ln v,
$$

且仅当$u = v$时等号成立。取$u = a^p$，$v = b^q$，并注意$1 - \theta = \frac1q$：右端为$\ln a + \ln b = \ln(ab)$，两边取指数即得所要的不等式，且等号成立当且仅当$a^p = b^q$。
:::

从几何上看，$ab$是一个矩形的面积，而$\frac{a^p}{p}$，$\frac{b^q}{q}$分别是曲线$y = x^{p-1}$与两条坐标轴之间、到$x = a$为止和到$y = b$为止的区域的面积；这两个曲边区域总能覆盖这个矩形。

::: theorem 赫尔德不等式 {#thm-holder}
设$1 \le p, q \le \infty$是共轭指数，$f \in L^p(\mu)$，$g \in L^q(\mu)$。则$fg \in L^1(\mu)$，且

$$
\int_X\abs{fg}\,d\mu \le \norm{f}_p\,\norm{g}_q.
$$ {#eq-holder}
:::

::: proof
若$p = 1$，$q = \infty$：几乎处处有$\abs{fg} \le \abs f\,\norm g_\infty$，积分即得结论；$p = \infty$，$q = 1$的情形只需交换$f$与$g$。现在设$1 < p < \infty$。若$\norm f_p = 0$或$\norm g_q = 0$，则几乎处处有$f = 0$，或几乎处处有$g = 0$，所以几乎处处有$fg = 0$，两边都为零。否则，令$F = \abs f/\norm f_p$，$G = \abs g/\norm g_q$，于是$\int F^p = \int G^q = 1$。在每一点处应用杨不等式，得$FG \le \frac{F^p}{p} + \frac{G^q}{q}$，积分得

$$
\int FG\,d\mu \le \frac1p + \frac1q = 1.
$$

乘以$\norm f_p\norm g_q$，即得[[#eq-holder]]。
:::

$p = q = 2$的情形就是**柯西-施瓦茨（Cauchy–Schwarz）不等式**$\int\abs{fg} \le \norm f_2\norm g_2$，它表明对所有$f, g \in L^2$，$\inner{f}{g} = \int fg\,d\mu$都有定义；它是$L^2$上的内积，且$\norm{f}_2 = \sqrt{\inner ff}$（[[linear-algebra/inner-products]]）。它让我们初步看到$L^p$范数是如何控制函数的。

::: example 平方可积的导数 {#ex-holder-continuity}
设$f \in L^2(0, 1)$，$F(x) = \int_0^x f\,d\lambda$。证明：对所有$x, y \in [0, 1]$，$\abs{F(x) - F(y)} \le \norm{f}_2\,\abs{x - y}^{1/2}$。
::: solution
首先，由柯西-施瓦茨不等式，$\int_0^1\abs f \le \norm f_2\norm{1}_2 = \norm f_2$，所以$f$在$(0,1)$上可积，从而$F$有定义。对$y < x$，对$f$和$\mathbf{1}_{[y, x]}$应用柯西-施瓦茨不等式：

$$
\abs{F(x) - F(y)} = \Bigl\lvert\int_0^1 f\,\mathbf{1}_{[y,x]}\,d\lambda\Bigr\rvert \le \norm{f}_2\,\norm{\mathbf{1}_{[y, x]}}_2 = \norm f_2\,(x - y)^{1/2}.
$$

所以$F$是指数为$\tfrac12$的赫尔德连续函数：这个界比[[real-analysis/riemann-integral#thm-ftc1]]中的利普希茨（Lipschitz）界弱（后者要求$f$有界），但它对每个$f \in L^2$都成立，不论$f$是否有界。若$f \in L^p$，用赫尔德不等式作同样的论证，可得指数$1 - \frac1p$。
:::
:::

赫尔德不等式还可以在有限测度空间上比较不同的$L^p$范数。

::: corollary 有限测度空间上的包含关系 {#cor-inclusion}
若$\mu(X) < \infty$，$1 \le p < r \le \infty$，则$L^r(\mu) \subseteq L^p(\mu)$，并且$\norm{f}_p \le \mu(X)^{\frac1p - \frac1r}\norm{f}_r$。特别地，在概率空间上，$\norm{f}_p$随$p$递增。
:::

::: proof
当$r = \infty$时，$\int\abs f^p \le \norm f_\infty^p\,\mu(X)$。当$r < \infty$时，以$s = r/p > 1$和$s' = \frac{s}{s-1}$为共轭指数，对$\abs f^p\cdot 1$应用赫尔德不等式：

$$
\int\abs f^p\,d\mu \le \Bigl(\int\abs f^{r}\,d\mu\Bigr)^{p/r}\Bigl(\int1\,d\mu\Bigr)^{1 - p/r} = \norm f_r^p\,\mu(X)^{1 - p/r}.
$$

两边开$p$次方即得该不等式。
:::

::: example 为什么本性上确界记作‖·‖∞ {#ex-p-infinity}
设$\mu(X) < \infty$，$f \in L^\infty(\mu)$。证明：当$p \to \infty$时，$\norm{f}_p \to \norm{f}_\infty$。
::: solution
**上界。**$\int\abs f^p \le \norm f_\infty^p\mu(X)$，所以$\norm f_p \le \mu(X)^{1/p}\norm f_\infty$，而$\mu(X)^{1/p} \to 1$（若$\mu(X) > 0$；若$\mu(X) = 0$，则所有范数都为零）。因此$\limsup_p\norm f_p \le \norm f_\infty$。

**下界。**设$0 \le M < \norm f_\infty$。集合$A = \set{\abs f > M}$的测度为正（否则$M$就是一个几乎处处成立的界），且$\int\abs f^p \ge M^p\mu(A)$，所以$\norm f_p \ge M\mu(A)^{1/p} \to M$。因此对每个$M < \norm f_\infty$都有$\liminf_p\norm f_p \ge M$，从而$\liminf_p\norm f_p \ge \norm f_\infty$。

随着$p$增大，$\int\abs f^p$越来越由$\abs f$的最大值所主导——但只在零测集上取到的值永远不起作用。这就是记号$\norm{\cdot}_\infty$的由来，也解释了下图中$p$-球的形状：当$p \to \infty$时，它们趋近于$\infty$-球。
:::
:::

在$\R$这样测度无限的空间上，两个方向的包含关系都可能不成立（[[#ex-powers]]）；对数列，包含关系反了过来：当$p < r$时，$\ell^p \subseteq \ell^r$（[[#exr-5-4]]）。

::: theorem 闵可夫斯基不等式 {#thm-minkowski}
对$1 \le p \le \infty$和$f, g \in L^p(\mu)$，有$f + g \in L^p(\mu)$，且

$$
\norm{f + g}_p \le \norm{f}_p + \norm{g}_p.
$$
:::

::: proof
当$p = 1$时，对$\abs{f + g} \le \abs f + \abs g$积分即可；当$p = \infty$时，注意几乎处处有$\abs{f + g} \le \norm f_\infty + \norm g_\infty$。设$1 < p < \infty$。首先，$f + g \in L^p$，因为$\abs{f + g}^p \le \bigl(2\max(\abs f, \abs g)\bigr)^p \le 2^p\bigl(\abs f^p + \abs g^p\bigr)$。现在写出

$$
\abs{f + g}^p \le \abs{f}\,\abs{f + g}^{p-1} + \abs{g}\,\abs{f + g}^{p-1}
$$

并以$q = \frac{p}{p-1}$为共轭指数，对每一项应用赫尔德不等式。由于$(p - 1)q = p$，我们有$\bigl\lVert\abs{f+g}^{p-1}\bigr\rVert_q = \bigl(\int\abs{f + g}^p\bigr)^{1/q} = \norm{f + g}_p^{p-1}$，所以

$$
\norm{f + g}_p^p \le \bigl(\norm f_p + \norm g_p\bigr)\norm{f + g}_p^{p-1}.
$$

若$\norm{f + g}_p = 0$，则无需证明；否则两边除以$\norm{f + g}_p^{p-1}$即可。
:::

所以$\norm{\cdot}_p$是$L^p$上的**范数**：它只在$0$处为零（这要归功于把几乎处处相等的函数等同起来），$\norm{cf}_p = \abs c\norm f_p$，并且它满足三角不等式。因此$d(f, g) = \norm{f - g}_p$是一个度量（[[real-analysis/metric-spaces#def-metric]]）。

::: intuition 选哪个p？
指数$p$决定了误差如何加权。在$\norm{f - g}_1$中，每一单位面积都同等重要，所以一个又高又窄的尖峰并不比一个面积相同、又低又宽的鼓包代价更大。在积分之前把$\abs{f - g}$升到$p > 1$次幂，会使大偏差比小偏差受到更重的惩罚，而当$p \to \infty$时，只有最坏的偏差才起作用（[[#ex-p-infinity]]）。居中的情形$p = 2$之所以特殊，则另有原因：它是唯一一个来自内积的$L^p$范数，所以它带有角度、正交性和投影的几何结构——这就是为什么最小二乘、傅里叶（Fourier）级数和方差都生活在$L^2$中。
:::

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: $\R^2$中的单位球$\set{x : \norm{x}_p < 1}$——即两点集上计数测度的空间$L^p$。把$p$从$1$滑动到$\infty$：球从菱形膨胀为正方形，并且始终是**凸**的。闵可夫斯基不等式恰好就是这种凸性。把$p$滑到$1$以下：“球”$\lvert x_1\rvert^p + \lvert x_2\rvert^p < 1$变成星形，各边向内弯曲，连接其边界上两点的红色虚线弦跑到了球外，三角不等式不再成立。
:::

::: warning p小于1时没有三角不等式
当$0 < p < 1$时，公式$\bigl(\int\abs f^p\bigr)^{1/p}$仍有意义，但它不是范数。取$\set{1, 2}$上的计数测度，$f = (1, 0)$和$g = (0, 1)$满足$\norm f_{1/2} = \norm g_{1/2} = 1$，而$\norm{f + g}_{1/2} = (1 + 1)^2 = 4 > 2$。闵可夫斯基不等式的证明之所以失效，是因为赫尔德不等式要求$p \ge 1$。
:::

::: quiz
设$f \in L^2(0, 1)$。由柯西-施瓦茨不等式可以得到$\int_0^1\abs{f(x)}\sqrt x\,dx$的下列哪个上界？
- [x] $\norm f_2/\sqrt2$
- [ ] $\norm f_2/2$
- [ ] $\norm f_2/\sqrt3$
- [ ] $\norm{f}_2^2$
::: solution
由柯西-施瓦茨不等式，$\int_0^1\abs f\sqrt x\,dx \le \norm f_2\bigl(\int_0^1x\,dx\bigr)^{1/2} = \norm f_2\cdot\frac{1}{\sqrt2}$。其他几个界一般都不成立。对$f(x) = \sqrt x$，柯西-施瓦茨不等式取等号，积分等于$\frac12 = \norm f_2/\sqrt2$，大于$\norm f_2/2$和$\norm f_2/\sqrt3$；而$\norm f_2^2$的齐次性不对（把$f$加倍，界应该加倍，而不是变为四倍）。
:::
:::

::: remark 对偶性
赫尔德不等式表明，每个$g \in L^q$都定义了$L^p$上的一个线性泛函$\Lambda_g(f) = \int fg\,d\mu$，且$\abs{\Lambda_g(f)} \le \norm g_q\norm f_p$。杨不等式中等号成立的情形表明这个界是精确的：当$1 < p < \infty$时，函数$f = \abs g^{q-1}\sgn g$使等号成立，所以$\Lambda_g$的范数恰好是$\norm g_q$。**里斯（Riesz）表示定理**给出了逆命题：当$1 \le p < \infty$时（$p = 1$时还要求$\mu$是σ-有限的），$L^p$上的每个有界线性泛函都具有$\Lambda_g$的形式，其中$g \in L^q$是唯一的，因此$L^p$的对偶空间是$L^q$。它的证明要用到拉东-尼科迪姆（Radon–Nikodym）定理；见福兰德（Folland）《实分析》（*Real Analysis*）第6章。当$p = \infty$时，对偶空间一般严格大于$L^1$（例如对勒贝格测度）。
:::

## 完备性：里斯-费希尔定理

$L^p$的决定性性质是：柯西列都收敛。证明要用到一个在任何赋范空间中都成立的判别准则，以及上一章的单调收敛定理和控制收敛定理。

::: lemma 绝对收敛级数 {#lem-abs-series}
设$V$是赋范空间。若$V$中每个满足$\sum\norm{v_k} < \infty$的级数$\sum v_k$都在$V$中收敛，则$V$是完备的。
:::

::: proof
设$(f_n)$是柯西列。取$n_1 < n_2 < \cdots$，使得对所有$m, n \ge n_k$都有$\norm{f_m - f_n} < 2^{-k}$。级数$f_{n_1} + \sum_k(f_{n_{k+1}} - f_{n_k})$满足$\sum_k\norm{f_{n_{k+1}} - f_{n_k}} < \sum 2^{-k} < \infty$，所以它收敛于某个$f \in V$；它的部分和是$f_{n_{k+1}}$，所以$f_{n_k} \to f$。有收敛子列的柯西列本身也收敛（且极限相同）：给定$\eps$，当$n$和$n_k$充分大时，$\norm{f_n - f} \le \norm{f_n - f_{n_k}} + \norm{f_{n_k} - f} < \eps$。
:::

::: theorem 里斯-费希尔（Riesz–Fischer）定理 {#thm-riesz-fischer}
对$1 \le p \le \infty$，空间$L^p(\mu)$是完备的。此外，若在$L^p(\mu)$中$f_n \to f$，则$(f_n)$有一个子列几乎处处收敛于$f$。
:::

::: proof
**情形$1 \le p < \infty$。**由[[#lem-abs-series]]，只需证明：若$\sum_k\norm{g_k}_p = B < \infty$，则$\sum g_k$在$L^p$中收敛。令$G_K = \sum_{k\le K}\abs{g_k}$，$G = \sum_{k\ge1}\abs{g_k}$（取值于$[0, \infty]$）。由闵可夫斯基不等式，$\norm{G_K}_p \le B$，又$G_K^p \uparrow G^p$，所以由单调收敛定理（[[measure-theory/lebesgue-integral#thm-monotone-convergence]]），

$$
\int G^p\,d\mu = \lim_{K\to\infty}\int G_K^p\,d\mu \le B^p < \infty.
$$

因此几乎处处有$G < \infty$，而在每个这样的点处，级数$\sum g_k(x)$绝对收敛；令$S(x)$为它的和（在$G = \infty$的零测集上令$S = 0$）。部分和$S_K = \sum_{k\le K}g_k$满足：几乎处处有$S_K \to S$，且$\abs{S_K - S}^p \le (2G)^p$，而后者可积。由控制收敛定理（[[measure-theory/lebesgue-integral#thm-dct]]），$\norm{S_K - S}_p^p = \int\abs{S_K - S}^p \to 0$。又$\abs S \le G$，所以$S \in L^p$。于是$\sum g_k$在$L^p$中收敛于$S$。

**子列。**若在$L^p$中$f_n \to f$，则该序列是柯西列，而[[#lem-abs-series]]的证明与上面的论证结合起来，就给出一个子列$f_{n_k}$，它几乎处处收敛（它是一个几乎处处绝对收敛的级数的部分和$f_{n_{k+1}}$），也在$L^p$中收敛，并且两种意义下的极限是同一个函数$S$。度量空间中的极限是唯一的，所以在$L^p$中$S = f$，即几乎处处有$S = f$，从而几乎处处有$f_{n_k} \to f$。

**情形$p = \infty$。**设$(f_n)$是$L^\infty$中的柯西列。对每个$n$，使$\abs{f_n} > \norm{f_n}_\infty$的点集是零测集；对每一对$m, n$，使$\abs{f_m - f_n} > \norm{f_m - f_n}_\infty$的点集也是零测集。设$N$是这可数多个零测集之并。在$N$之外，该序列是一致柯西的，所以它一致收敛于一个有界函数$f$（[[real-analysis/uniform-convergence#thm-uniform-cauchy]]）；在$N$上令$f = 0$，就得到$\norm{f_n - f}_\infty \to 0$。类似地，若在$L^\infty$中$f_n \to f$，则在某个零测集之外，对每个$n$都有$\abs{f_n - f} \le \norm{f_n - f}_\infty$，所以当$p = \infty$时，整个序列都几乎处处收敛于$f$。
:::

::: remark 完备化与稠密性
在完备空间中，一个稠密子空间决定了一切。对$1 \le p < \infty$，在测度有限的集合之外为零的简单函数在$L^p(\mu)$中稠密：对$f \ge 0$，[[measure-theory/measurable-functions#thm-simple-approx]]中的逼近$\varphi_n \uparrow f$满足$\abs{f - \varphi_n}^p \le f^p$，所以由控制收敛定理，$\norm{f - \varphi_n}_p \to 0$；每个$\varphi_n$在$\set{f \ge 2^{-n}}$之外为零，而由马尔可夫不等式，这个集合的测度有限；对一般的$f$，利用$f = f^+ - f^-$即可。对勒贝格测度，还可以更进一步：利用勒贝格测度的正则性（[[measure-theory/lebesgue-measure#thm-regularity]]）把可测集换成有限多个区间之并，可知当$p < \infty$时，阶梯函数以及在有界区间之外为零的连续函数都在$L^p(\R)$中稠密。用[[real-analysis/metric-spaces]]一章的语言来说，$L^1(a, b)$是[[real-analysis/metric-spaces#ex-incomplete]]中不完备空间$(C[a,b], d_1)$的完备化。（当$p = \infty$时，稠密性不成立：连续函数的一致极限是连续的，所以$\mathbf{1}_{[0, 1/2]}$不在$C[0, 1]$的闭包中。）
:::

::: application 傅里叶级数与最小二乘
$L^2$是完备的内积空间——即**希尔伯特（Hilbert）空间**——傅里叶级数正是在这里安家的。函数$\frac{1}{\sqrt{2\pi}}e^{inx}$构成$L^2(-\pi, \pi)$的一组标准正交基，每个$f \in L^2$都是它的傅里叶部分和的$L^2$极限，并且帕塞瓦尔（Parseval）恒等式$\norm{f}_2^2 = \sum\abs{\hat f(n)}^2$成立，其中$\hat f(n) = \inner{f}{\tfrac{1}{\sqrt{2\pi}}e^{inx}}$是$f$在这组基下的系数（[[pde/fourier-series]]）。里斯-费希尔定理给出了逆命题：每个平方可和的系数序列都是某个$f \in L^2$的傅里叶系数序列——这正是里斯和费希尔在1907年证明的结果。$L^2$中的正交投影就是最小二乘逼近（[[linear-algebra/least-squares]]），而在概率论中，$\norm{X - \E X}_2^2$就是方差。
:::

## 收敛方式

函数列可以在许多不同的意义下收敛。除了逐点收敛和一致收敛（[[real-analysis/uniform-convergence]]）、几乎处处收敛以及$L^p$收敛之外，还有一种在概率论中很自然的收敛方式。

::: definition 依测度收敛 {#def-convergence-in-measure}
可测函数$f_n$**依测度收敛**于$f$，是指对每个$\eps > 0$，

$$
\mu\bigl(\set{x : \abs{f_n(x) - f(x)} > \eps}\bigr) \to 0 \qquad (n\to\infty).
$$

在概率论中，这称为**依概率收敛**。
:::

$L^p$收敛（$p < \infty$）蕴涵依测度收敛，这只需对$\abs{f_n - f}^p$应用马尔可夫不等式：

$$
\mu\bigl(\set{\abs{f_n - f} > \eps}\bigr) \le \frac{1}{\eps^p}\int\abs{f_n - f}^p\,d\mu = \frac{\norm{f_n - f}_p^p}{\eps^p} \to 0.
$$ {#eq-chebyshev}

在有限测度空间上，几乎处处收敛也蕴涵依测度收敛（[[#exr-5-7]]；它也可以由叶戈罗夫（Egorov）定理（[[measure-theory/measurable-functions#thm-egorov]]）直接推出，因为在一个测度可以任意小的集合之外，对所有充分大的$n$都有$\abs{f_n - f} \le \eps$）。依测度收敛并不蕴涵几乎处处收敛——但也相差不远。

::: theorem 里斯子列定理 {#thm-riesz-subsequence}
若依测度有$f_n \to f$，则存在子列$f_{n_k}$几乎处处收敛于$f$。
:::

::: proof
取$n_1 < n_2 < \cdots$，使得集合$A_k = \set{\abs{f_{n_k} - f} > 2^{-k}}$满足$\mu(A_k) < 2^{-k}$。由于$\sum_k\mu(A_k) < \infty$，由博雷尔-坎泰利（Borel–Cantelli）引理（[[measure-theory/sigma-algebras#thm-borel-cantelli]]），几乎每个$x$都只属于有限多个$A_k$。对这样的$x$，存在$K$，使得对所有$k \ge K$都有$\abs{f_{n_k}(x) - f(x)} \le 2^{-k}$，所以$f_{n_k}(x) \to f(x)$。
:::

确实需要取子列，这一点由这门学科中最有启发性的例子说明。

::: example 打字机序列 {#ex-typewriter}
每个$n \in \N$都可以唯一地写成$n = 2^k + j$，其中$k \ge 0$，$0 \le j < 2^k$。在$[0, 1]$上令$f_n = \mathbf{1}_{[j2^{-k},\,(j+1)2^{-k}]}$。证明：对每个$p < \infty$，$f_n \to 0$既在$L^p$中成立，也依测度成立；但对**任何**$x \in [0, 1]$，$(f_n(x))$都不收敛。
::: solution
当$n$从$2^k$变到$2^{k+1} - 1$时，$f_n$对应的区间（长度为$2^{-k}$）从左到右扫过$[0, 1]$，就像打字机的字车一样；然后$k$增大，区间长度减半，扫描重新开始。

**在$L^p$中收敛与依测度收敛。**$\norm{f_n}_p = \bigl(2^{-k}\bigr)^{1/p} \to 0$，因为当$n \to \infty$时$k \to \infty$。由[[#eq-chebyshev]]，依测度也有$f_n \to 0$。

**不逐点收敛。**固定$x \in [0, 1]$。在每一轮扫描（每个$k$）中，总有某个区间包含$x$，所以在每一段$2^k \le n < 2^{k+1}$中至少有一个$n$使$f_n(x) = 1$；而当$k \ge 2$时，这一轮扫描中也有某个区间不包含$x$（共有$2^k \ge 4$个区间，而$x$至多属于其中两个），所以在这一段中还有另一个$n$使$f_n(x) = 0$。因此$f_n(x) = 1$无穷多次成立，$f_n(x) = 0$也无穷多次成立，从而$(f_n(x))$发散。

正如里斯定理所预言的，确实有子列几乎处处收敛：在每个$x > 0$处都有$f_{2^k} = \mathbf{1}_{[0, 2^{-k}]} \to 0$。
:::
:::

::: widget plot
f: if(x >= (n - 2^floor(log2(n)))/2^floor(log2(n)) && x <= (n - 2^floor(log2(n)) + 1)/2^floor(log2(n)), 1, 0)
x: 0, 1
y: -0.1, 1.2
sliders: n=5:1:64:1
caption: 打字机序列$f_n$，其中$n = 2^k + j$。逐步增大$n$：高为$1$的方块扫过$[0, 1]$，然后宽度减半，再扫一遍。它的面积$2^{-k}$趋于$0$，所以在$L^1$中以及依测度都有$f_n \to 0$——然而在每一点处，方块都会一次又一次地回来，所以值$0, 1$永远交替出现。盯住一个点，比如$x = 0.3$：每一轮扫描都会击中它一次。
:::

::: example 一个序列，多种收敛方式 {#ex-modes}
在$[0, 1]$上设$f_n = \sqrt n\,\mathbf{1}_{(0, 1/n)}$。判断$f_n \to 0$是否(a) 处处成立，(b) 一致成立，(c) 依测度成立，(d) 在$L^p$中成立（对每个$p \in [1, \infty]$）。
::: solution
(a) 是：$f_n(0) = 0$，而对$x > 0$，一旦$n \ge 1/x$，就有$f_n(x) = 0$。(b) 否：$\sup f_n = \sqrt n \to \infty$。(c) 是：对$\eps > 0$，$\lambda(\set{f_n > \eps}) \le \lambda((0, 1/n)) = 1/n \to 0$（或者利用(a)和测度的有限性）。(d) 当$p < \infty$时，$\norm{f_n}_p^p = n^{p/2}\cdot\frac1n = n^{p/2 - 1}$，它在$p < 2$时趋于$0$，在$p = 2$时等于$1$，在$p > 2$时趋于$\infty$；而$\norm{f_n}_\infty = \sqrt n \to \infty$。所以$f_n \to 0$在$L^p$中成立当且仅当$1 \le p < 2$。指数越高，对又高又细的尖峰越敏感——这与[[#cor-inclusion]]是一致的，因为在有限测度空间上，当$p < r$时，$L^r$收敛蕴涵$L^p$收敛。
:::
:::

再看两个例子，全貌就完整了。在$[0, 1]$上，$g_n = n\mathbf{1}_{(0, 1/n)}$处处收敛于$0$，也依测度收敛于$0$，但$\norm{g_n}_1 = 1$，所以不在$L^1$中收敛：没有控制条件时，几乎处处收敛不蕴涵$L^p$收敛。在$\R$上，$h_n = \mathbf{1}_{[n, n+1]}$处处收敛于$0$，但不依测度收敛，因为$\lambda(\set{h_n > \tfrac12}) = 1$：在测度无限的空间上，几乎处处收敛甚至不蕴涵依测度收敛。下表总结了$1 \le p < \infty$时的这些关系，其中“有控制”是指存在同一个$g \in L^p$，使得对所有$n$都有$\abs{f_n} \le g$。

| 从 ↓ / 到 → | 几乎处处收敛 | 依测度收敛 | $L^p$收敛 |
|---|---|---|---|
| 一致收敛 | 是 | 是 | 当$\mu(X) < \infty$时是 |
| 几乎处处收敛 | — | 当$\mu(X) < \infty$时是 | 有控制时是（[[measure-theory/lebesgue-integral#thm-dct]]） |
| 依测度收敛 | 有子列收敛（[[#thm-riesz-subsequence]]） | — | 有控制时是 |
| $L^p$收敛 | 有子列收敛（[[#thm-riesz-fischer]]） | 是，由[[#eq-chebyshev]] | — |

::: quiz
对[[#ex-typewriter]]中的打字机序列$(f_n)$，下列哪些命题成立？选出所有正确的选项。
- [x] 在$L^1[0,1]$中$f_n \to 0$。
- [ ] 几乎处处有$f_n \to 0$。
- [x] $(f_n)$的某个子列几乎处处收敛于$0$。
- [ ] $f_n \to 0$在$[\tfrac12, 1]$上一致成立。
::: solution
$\norm{f_n}_1 = 2^{-k} \to 0$，并且由里斯定理（或者直接取$f_{2^k}$），有子列几乎处处收敛。但$(f_n(x))$在任何点处都不收敛，所以当然不是几乎处处收敛，在任何子区间上也不一致收敛：在$[\tfrac12, 1]$上，对无穷多个$n$有$\sup f_n = 1$。
:::
:::

::: history
现在以奥托·赫尔德（Otto Hölder）命名的不等式，是由伦纳德·詹姆斯·罗杰斯（Leonard James Rogers）在1888年、赫尔德在1889年发现的；赫尔曼·闵可夫斯基（Hermann Minkowski）的不等式出现在他的《数的几何》（*Geometrie der Zahlen*，1896年）中。威廉·亨利·杨（William Henry Young）在1912年发表了他关于乘积的不等式。1907年，弗里杰什·里斯（Frigyes Riesz）和恩斯特·费希尔（Ernst Fischer）各自独立地证明了平方可积函数构成的空间是完备的——这个定理表明新的勒贝格积分是不可或缺的。1909年，里斯引入了依测度收敛，并证明了由它可以得到一个几乎处处收敛的子列；1910年，他定义并研究了$1 < p < \infty$时的空间$L^p$。斯特凡·巴拿赫（Stefan Banach）的《线性运算理论》（*Théorie des opérations linéaires*，1932年）把这些空间纳入完备赋范空间的一般理论之中，这类空间现在称为巴拿赫空间。
:::

## 后续内容

$L^p$空间是测度论与泛函分析的交汇点。$L^2$是希尔伯特空间，它的几何结构——正交性、投影、基——是傅里叶级数（[[pde/fourier-series]]）、傅里叶变换（[[pde/fourier-transform]]）、量子力学和信号处理的基础。其他的$L^p$是巴拿赫空间；当$1 \le p < \infty$时（$p = 1$时要求测度空间是σ-有限的），$L^p$的对偶空间是$L^q$，这是里斯的一个定理，它建立在赫尔德不等式的基础上。在概率论中（[[probability/limit-theorems]]），本章的各种收敛方式表现为几乎必然收敛、依概率收敛和平均收敛，而强大数定律和弱大数定律正是关于这些收敛方式的命题。建立在$L^p$之上的弱导数和索伯列夫（Sobolev）空间，则是现代偏微分方程理论的舞台。

::: summary
- $L^p(\mu)$由满足$\norm f_p = (\int\abs f^p)^{1/p} < \infty$的可测函数组成（$p = \infty$时由本性有界函数组成），其中几乎处处相等的函数视为同一个元素（[[#def-lp]]）。
- 由杨不等式$ab \le \frac{a^p}{p} + \frac{b^q}{q}$可得共轭指数的赫尔德不等式$\int\abs{fg} \le \norm f_p\norm g_q$（[[#thm-holder]]）；$p = q = 2$时就是柯西-施瓦茨不等式。
- 闵可夫斯基不等式$\norm{f + g}_p \le \norm f_p + \norm g_p$使$L^p$在$p \ge 1$时成为赋范空间（[[#thm-minkowski]]）；当$p < 1$时它不成立。
- 在有限测度空间上，当$p < r$时$L^r \subseteq L^p$；在$\R$上，任何包含关系都不成立；而对数列，$\ell^p \subseteq \ell^r$。
- 里斯-费希尔定理：$L^p$是完备的，并且$L^p$收敛的序列有几乎处处收敛的子列（[[#thm-riesz-fischer]]）；当$p < \infty$时，简单函数是稠密的，（对勒贝格测度）阶梯函数和连续函数也是稠密的。
- $L^p$收敛蕴涵依测度收敛，而依测度收敛又蕴涵有子列几乎处处收敛（[[#thm-riesz-subsequence]]）；打字机序列在$L^p$中收敛，却在任何点处都不逐点收敛。
:::

## 习题

::: exercise 一个L2范数 {level=1 check="1/sqrt(3)"}
在$L^2(0, 1)$中，对$f(x) = x$计算$\norm{f}_2$。
::: solution
$\norm f_2^2 = \int_0^1x^2\,dx = \frac13$，所以$\norm f_2 = \frac{1}{\sqrt3} \approx 0.577$。
:::
:::

::: exercise 一个本性上确界 {level=1 check="4"}
对$x \in [0, 2]$令$f(x) = x^2$，但$f(1) = 100$，并且对每个有理数$q \in (1, 2)$，$f(q) = 0$。在$L^\infty(0, 2)$中求$\norm{f}_\infty$。
::: solution
$f$在集合$\set{1}\cup(\Q\cap(1,2))$之外与$x^2$相等，而这个集合可数，因而是零测集，所以$\norm f_\infty = \norm{x^2}_\infty$。由于在$[0,2]$上处处有$x^2 \le 4$，所以$\norm{x^2}_\infty \le 4$；而对每个$M < 4$，集合$\set{x^2 > M}\cap[0,2]$都是长度为正的区间，所以$M$不是几乎处处成立的界。因此$\norm f_\infty = 4$。
:::
:::

::: exercise 幂函数属于哪些空间 {level=1}
对哪些$p \in [1, \infty)$，$f(x) = x^{-1/2}$属于$L^p(0, 1)$？属于$L^p(1, \infty)$呢？它属于$L^\infty(1, \infty)$吗？
::: solution
在[[#ex-powers]]中取$a = \frac12$：$f \in L^p(0, 1)$当且仅当$p < 2$，而$f \in L^p(1, \infty)$当且仅当$p > 2$。在$(1, \infty)$上$0 < f \le 1$，所以$f \in L^\infty(1, \infty)$，且$\norm f_\infty = 1$。在$(0, 1)$上，它在每个区间$(0, \delta)$上都无界，所以它不属于$L^\infty(0, 1)$。
:::
:::

::: exercise 数列空间是嵌套的 {level=2}
设$1 \le p < r \le \infty$。证明$\ell^p \subseteq \ell^r$，并且$\norm{a}_r \le \norm{a}_p$。
::: hint
先归一化，使$\norm a_p = 1$；这时每个$\abs{a_n} \le 1$。
:::
::: solution
若$a = 0$，则无需证明；否则，由齐次性，不妨设$\norm a_p = 1$。于是$\abs{a_n}^p \le \sum\abs{a_k}^p = 1$，所以对所有$n$都有$\abs{a_n} \le 1$，由此得$\norm{a}_\infty \le 1$，并且当$r < \infty$时$\abs{a_n}^r \le \abs{a_n}^p$。求和得$\norm a_r^r \le \norm a_p^p = 1$，所以$\norm a_r \le 1 = \norm a_p$。这个包含关系是严格的：$a_n = n^{-1/p}$属于$\ell^r$，但不属于$\ell^p$。与[[#cor-inclusion]]比较：在有限测度空间上，包含关系的方向恰好相反。
:::
:::

::: exercise 一个加权和 {level=2}
证明：对每个满足$\sum a_n^2 < \infty$的实数列$(a_n)$，

$$
\Bigl(\sum_{n=1}^\infty\frac{\abs{a_n}}{n}\Bigr)^2 \le \frac{\pi^2}{6}\sum_{n=1}^\infty a_n^2.
$$
::: solution
这就是把$\ell^2$中的柯西-施瓦茨不等式（即计数测度下$p = q = 2$的赫尔德不等式）应用于数列$(\abs{a_n})$和$(1/n)$：$\sum\frac{\abs{a_n}}{n} \le \bigl(\sum a_n^2\bigr)^{1/2}\bigl(\sum\frac1{n^2}\bigr)^{1/2}$，而$\sum 1/n^2 = \pi^2/6$。两边平方即得结论。
:::
:::

::: exercise 和的依测度收敛 {level=2}
设依测度有$f_n \to f$和$g_n \to g$。证明依测度有$f_n + g_n \to f + g$。
::: solution
若$\abs{(f_n + g_n) - (f + g)} > \eps$，则$\abs{f_n - f} > \eps/2$或$\abs{g_n - g} > \eps/2$。所以

$$
\mu\bigl(\abs{(f_n + g_n) - (f + g)} > \eps\bigr) \le \mu\bigl(\abs{f_n - f} > \tfrac\eps2\bigr) + \mu\bigl(\abs{g_n - g} > \tfrac\eps2\bigr) \to 0.
$$
:::
:::

::: exercise 几乎处处收敛蕴涵依测度收敛 {level=2}
设$\mu(X) < \infty$，几乎处处有$f_n \to f$，且所有函数都是实值可测函数。证明依测度有$f_n \to f$。举例说明$\mu$有限这一条件是必需的。
::: solution
固定$\eps > 0$，令$B_n = \bigcup_{m\ge n}\set{\abs{f_m - f} > \eps}$。这些集合递减，并且每个使$f_m(x) \to f(x)$的点$x$在$n$充分大时都位于$B_n$之外；所以$\bigcap_n B_n$包含在使收敛不成立的零测集之中。由于$\mu(B_1) \le \mu(X) < \infty$，由上连续性（[[measure-theory/sigma-algebras#thm-continuity-measure]]）得$\mu(B_n) \to 0$，从而$\mu(\abs{f_n - f} > \eps) \le \mu(B_n) \to 0$。没有有限性时的反例：在$\R$上处处有$\mathbf{1}_{[n,n+1]} \to 0$，但对每个$n$都有$\lambda(\set{\mathbf{1}_{[n,n+1]} > \tfrac12}) = 1$。
:::
:::

::: exercise 一个插值不等式 {level=3}
设$1 \le p < r < q < \infty$，并由$\frac1r = \frac\theta p + \frac{1-\theta}{q}$定义$\theta \in (0, 1)$。证明：对所有可测函数$f$，$\norm{f}_r \le \norm{f}_p^\theta\,\norm{f}_q^{1-\theta}$。由此推出$L^p\cap L^q \subseteq L^r$。
::: hint
写成$\abs f^r = \abs f^{\theta r}\abs f^{(1-\theta)r}$，并以$\frac{p}{\theta r}$和$\frac{q}{(1-\theta)r}$为指数应用赫尔德不等式。
:::
::: solution
指数$s = \frac{p}{\theta r}$和$s' = \frac{q}{(1-\theta)r}$是共轭的，因为$\frac1s + \frac1{s'} = \frac{\theta r}{p} + \frac{(1-\theta)r}{q} = r\cdot\frac1r = 1$，并且两者都大于$1$。由赫尔德不等式，

$$
\int\abs f^r = \int\abs f^{\theta r}\abs f^{(1-\theta)r} \le \Bigl(\int\abs f^{p}\Bigr)^{\theta r/p}\Bigl(\int\abs f^{q}\Bigr)^{(1-\theta)r/q} = \norm f_p^{\theta r}\norm f_q^{(1-\theta)r}.
$$

两边开$r$次方即得该不等式（在通常的约定下，当某些范数为无穷时它也成立）；若$f \in L^p\cap L^q$，则右边有限。
:::
:::

::: exercise 黎曼-勒贝格引理 {level=3}
设$f \in L^1(\R)$。证明：当$n \to \infty$时，$\displaystyle\int_\R f(x)\cos(nx)\,dx \to 0$。可以利用阶梯函数（有界区间的示性函数的有限线性组合）在$L^1(\R)$中稠密这一事实。
::: hint
先对$\mathbf{1}_{[a,b]}$验证结论，然后再作逼近。
:::
::: solution
对$f = \mathbf{1}_{[a, b]}$，$\int_a^b\cos(nx)\,dx = \frac{\sin(nb) - \sin(na)}{n}$，其绝对值至多为$\frac2n \to 0$。由线性性，结论对每个阶梯函数都成立。对一般的$f \in L^1$和$\eps > 0$，取阶梯函数$s$，使$\norm{f - s}_1 < \eps/2$。则

$$
\Bigl\lvert\int f(x)\cos(nx)\,dx\Bigr\rvert \le \int\abs{f - s}\,\abs{\cos(nx)}\,dx + \Bigl\lvert\int s(x)\cos(nx)\,dx\Bigr\rvert < \frac\eps2 + \Bigl\lvert\int s(x)\cos(nx)\,dx\Bigr\rvert,
$$

而当$n$充分大时，最后一项小于$\eps/2$。因此这些积分趋于$0$。（所以可积函数的傅里叶系数趋于$0$：[[pde/fourier-series]]。）
:::
:::
