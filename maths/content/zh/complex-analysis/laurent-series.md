实泰勒级数中有两个著名的谜题。函数$\frac{1}{1 + x^2}$在整个实轴上无穷次可微，性质非常温和，然而它在$0$处的泰勒级数

$$
\frac{1}{1 + x^2} = 1 - x^2 + x^4 - x^6 + \cdots,
$$

却只在$\abs x < 1$时收敛。在$x = \pm1$处并没有发生任何能解释这一现象的事情。其次，在$x\neq0$时等于$e^{-1/x^2}$、在$0$处等于$0$的函数无穷次可微，并且它在$0$处的各阶导数都为零，所以它的泰勒级数恒为零——完全不能表示这个函数。实分析对这两种现象都给不出解释。复分析则一举解释了二者。函数$\frac{1}{1 + z^2}$在$z = \pm i$处有极点，它们到原点的距离恰好是$1$，而幂级数不可能在含有极点的圆盘上收敛。至于$e^{-1/z^2}$，它在复平面上甚至在$z = 0$处都不连续（沿虚轴它趋于无穷），所以没有理由期望它在那里有泰勒级数。

本章将证明：每个解析函数在它解析的最大圆盘上都等于它的泰勒级数之和。其推论包括**唯一性定理**：区域上的解析函数由它在任何一个在区域内有聚点的集合上的值所确定。然后我们把泰勒级数推广为**洛朗（Laurent）级数**——它允许出现负幂次，可以在圆环上表示函数——并用它把**孤立奇点**分为可去奇点、极点和本性奇点。

## 复平面上的幂级数

以$a$为中心的**幂级数**是指复系数级数$\sum_{n=0}^\infty c_n(z - a)^n$。你已在[[calculus-2/power-series]]一章中见过实幂级数；这套理论几乎原封不动地适用于复数，只是收敛范围变成了一个圆盘。

::: theorem 收敛圆盘 {#thm-radius}
对每个幂级数$\sum c_n(z - a)^n$，存在$R\in[0,\infty]$（称为**收敛半径**），使得该级数在$\abs{z - a} < R$时绝对收敛，在$\abs{z - a} > R$时发散。在每个满足$r < R$的闭圆盘$\abs{z - a}\le r$上，级数一致收敛。此外，

$$
\frac1R = \limsup_{n\to\infty}\abs{c_n}^{1/n} \qquad\text{（柯西-阿达马公式）},
$$

并且若$\abs{c_{n+1}/c_n}$有极限$L$，则$R = 1/L$。
:::

::: proof
**阿贝尔（Abel）引理。**设级数在某点$z_1\neq a$处收敛，则它的项趋于$0$，所以存在$K$，使得对所有$n$有$\abs{c_n}\abs{z_1 - a}^n\le K$。若$\abs{z - a}\le r < \abs{z_1 - a}$，令$q = r/\abs{z_1 - a} < 1$，则

$$
\abs{c_n(z - a)^n}\le\abs{c_n}\abs{z_1 - a}^nq^n\le Kq^n,
$$

而$\sum Kq^n < \infty$，所以由魏尔斯特拉斯M判别法，级数在$\abs{z - a}\le r$上绝对且一致收敛。

现在令$R$为级数收敛的所有点$z$所对应的$\abs{z - a}$的上确界。若$\abs{z - a} < R$，则存在收敛点$z_1$满足$\abs{z_1 - a} > \abs{z - a}$，由阿贝尔引理，级数在$z$处绝对收敛，并且对任意$r < \abs{z_1 - a}$，在$\abs{z - a}\le r$上一致收敛；由于对每个$r < R$都存在这样的$z_1$，级数在每个半径$r < R$的闭圆盘上一致收敛。若$\abs{z - a} > R$，则由$R$的定义，级数发散。关于$R$的公式可以由绝对收敛的根值判别法和比值判别法推出，与实的情形完全一样（[[calculus-2/power-series]]）。
:::

在圆周$\abs{z - a} = R$本身上，什么情况都可能发生：$\sum z^n$在单位圆周的每一点处都发散，$\sum z^n/n^2$在每一点处都收敛，而$\sum z^n/n$在除$z = 1$以外的每一点处都收敛。

::: theorem 幂级数是解析的 {#thm-series-analytic}
若$\sum c_n(z - a)^n$的收敛半径$R > 0$，则它的和函数$f$在$D(a, R)$上解析，并且可以逐项求导：

$$
f'(z) = \sum_{n=1}^\infty nc_n(z - a)^{n-1}\qquad(\abs{z - a} < R).
$$

因此$f$有各阶导数，且$c_n = \dfrac{f^{(n)}(a)}{n!}$；特别地，幂级数的系数由它的和函数确定。
:::

::: proof
部分和$S_N$是多项式，并且在每个闭圆盘$\abs{z - a}\le r < R$上一致收敛于$f$（[[#thm-radius]]）；特别地，$f$在$D(a,R)$上连续。若$T$是$D(a, R)$中的三角形，则$\partial T$位于这样一个闭圆盘中，所以由[[complex-analysis/contour-integrals#cor-uniform]]和柯西-古尔萨定理，$\oint_{\partial T}f\,dz = \lim_N\oint_{\partial T}S_N\,dz = 0$。由莫雷拉定理（[[complex-analysis/cauchy-theorem#thm-morera]]），$f$在$D(a,R)$上解析。为了计算$f'$，固定满足$\abs{w - a} < r < R$的$w$。对$f$和$S_N$应用高阶导数的柯西公式（[[complex-analysis/cauchy-theorem#thm-derivatives]]），并利用在圆周$\abs{z - a} = r$上的一致收敛性（[[complex-analysis/contour-integrals#cor-uniform]]），得

$$
f'(w) = \frac{1}{2\pi i}\oint_{\abs{z-a}=r}\frac{f(z)}{(z - w)^2}\,dz = \lim_{N\to\infty}\frac{1}{2\pi i}\oint_{\abs{z-a}=r}\frac{S_N(z)}{(z - w)^2}\,dz = \lim_{N\to\infty}S_N'(w),
$$

这正是逐项求导的结果。重复这一过程得$f^{(k)}(a) = k!\,c_k$，因为逐项求导$k$次后的级数的其他各项在$z = a$处都为零。
:::

## 泰勒定理

现在来看逆命题，它在实函数中没有对应的结论。

::: theorem 泰勒定理 {#thm-taylor}
设$f$在圆盘$D(a, R)$上解析（允许$R = \infty$），则

$$
f(z) = \sum_{n=0}^\infty c_n(z - a)^n \quad\text{对所有 } z \in D(a,R), \qquad c_n = \frac{f^{(n)}(a)}{n!} = \frac{1}{2\pi i}\oint_{\abs{\zeta - a} = r}\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta,
$$ {#eq-taylor}

其中$0 < r < R$任意。特别地，泰勒级数的收敛半径至少为$R$。
:::

::: proof
固定$z\in D(a, R)$，取$r$使得$\abs{z - a} < r < R$。在圆周$C$：$\abs{\zeta - a} = r$上应用柯西积分公式，得

$$
f(z) = \frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{\zeta - z}\,d\zeta .
$$

对$\zeta\in C$，令$q = \abs{z - a}/r < 1$，并像[[complex-analysis/cauchy-theorem#lem-off-centre]]中那样展开：

$$
\frac{1}{\zeta - z} = \frac{1}{(\zeta - a) - (z - a)} = \sum_{n=0}^\infty\frac{(z - a)^n}{(\zeta - a)^{n+1}} .
$$

记$M = \max_C\abs f$，则这样展开的$\frac{f(\zeta)}{\zeta - z}$的第$n$项在$C$上的模至多为$Mq^n/r$，所以该级数在$C$上一致收敛，可以逐项积分：

$$
f(z) = \sum_{n=0}^\infty\Big(\frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta\Big)(z - a)^n .
$$

由[[complex-analysis/cauchy-theorem#eq-cif-n]]，系数等于$f^{(n)}(a)/n!$，与$r$无关。所以泰勒级数在$D(a, R)$的每一点处都收敛于$f(z)$。
:::

把这两个定理结合起来：**函数在开集上解析，当且仅当它在局部上是某个收敛幂级数的和。**这就是“解析”（原意是“由幂级数给出”）与“全纯”（复可微）两个词可以互换使用的原因。

::: corollary 收敛半径等于到最近奇点的距离 {#cor-radius}
若$f$在区域$D$上解析且$a\in D$，则$f$在$a$处的泰勒级数在含于$D$的以$a$为圆心的最大开圆盘上收敛于$f$。若$f$不能解析延拓到以$a$为圆心的任何更大的圆盘上——例如因为在边界圆周的某一点处$\abs f\to\infty$——则收敛半径恰好等于该圆盘的半径。
:::

::: proof
第一个结论就是把[[#thm-taylor]]应用于最大的圆盘$D(a,R)\subseteq D$。至于第二个结论：假如收敛半径$\rho$大于$R$，级数的和就是$D(a,\rho)$上延拓了$f$的一个解析函数（[[#thm-series-analytic]]），而这已被排除。
:::

所以，除了在$\pm i$处趋于无穷之外处处解析的$\frac{1}{1 + z^2}$，在$0$处的泰勒级数的收敛半径为$1$——这就解释了实分析中的那个谜题——而在$a = 1$处的泰勒级数的收敛半径为$\abs{1 - i} = \sqrt2$。

::: widget taylor
f: 1/(1 + x^2)
a: 0
n: 10
x: -2, 2
y: -1, 2
caption: $\frac{1}{1+x^2}$在$0$处的泰勒多项式。提高次数：在$(-1, 1)$内，多项式越来越紧地贴近函数图像；在区间外，它们剧烈地摆离图像——尽管实函数的图像在$x = \pm1$处完全光滑。移动中心$a$：收敛区间变为$(a - \sqrt{1 + a^2},\ a + \sqrt{1 + a^2})$，因为它的半径是$a$到复极点$\pm i$的距离。
:::

::: example 用部分分式求泰勒级数 {#ex-partial-fractions}
求$f(z) = \dfrac{1}{z^2 - 3z + 2}$在$0$处的泰勒级数及其收敛半径。
::: solution
因式分解并拆项：$z^2 - 3z + 2 = (z - 1)(z - 2)$，且

$$
f(z) = \frac{1}{z - 2} - \frac{1}{z - 1} = \frac{1}{1 - z} - \frac12\cdot\frac{1}{1 - z/2} .
$$

当$\abs z < 1$时，两个几何级数都收敛，并且

$$
f(z) = \sum_{n=0}^\infty z^n - \sum_{n=0}^\infty\frac{z^n}{2^{n+1}} = \sum_{n=0}^\infty\Big(1 - \frac{1}{2^{n+1}}\Big)z^n = \frac12 + \frac34z + \frac78z^2 + \cdots
$$

由系数的唯一性（[[#thm-series-analytic]]），这**就是**泰勒级数。它的收敛半径为$1$，即$0$到最近的极点$z = 1$的距离，与[[#cor-radius]]的预言一致。（也可以直接验证：$c_{n+1}/c_n\to1$。）
:::
:::

::: quiz
$\dfrac{1}{z^2 + 4}$在$z = 1$处的泰勒级数的收敛半径是多少？
- [ ] $1$
- [ ] $2$
- [x] $\sqrt5$
- [ ] $3$
::: solution
由[[#cor-radius]]，收敛半径等于$1$到函数不解析的最近点的距离。极点为$\pm2i$，而$\abs{1 - 2i} = \abs{1 + 2i} = \sqrt5$。
:::
:::

## 零点与唯一性定理

借助幂级数，零点的局部结构一目了然。

::: definition 零点的阶 {#def-zero-order}
设$f$在$a$附近解析，$f(a) = 0$，且$f$在$a$附近不恒为零。使$f^{(m)}(a)\neq0$的最小的$m\ge1$称为该零点的**阶**（或重数）。等价地，$f(z) = (z - a)^mg(z)$，其中$g$在$a$附近解析且$g(a)\neq0$。
:::

这种等价性来自泰勒级数：若$c_0 = \dots = c_{m-1} = 0\neq c_m$，则$f(z) = (z - a)^m\sum_{k\ge0}c_{m+k}(z - a)^k$，而后一个级数定义了一个解析函数$g$，且$g(a) = c_m\neq0$。例如，$z - \sin z = \frac{z^3}{6} - \frac{z^5}{120} + \cdots$在$0$处有$3$阶零点。

::: theorem 零点的孤立性 {#thm-isolated-zeros}
设$f$在区域$D$上解析且不恒为零，则$f$的每个零点$a$都具有有限的阶，并且存在$r > 0$，使得当$0 < \abs{z - a} < r$时$f(z)\neq0$。
:::

::: proof
设$E$是使$f$及其各阶导数都为零的点$z\in D$的集合。**$E$是开集**：若$z_0\in E$，则$f$在$z_0$处的泰勒级数恒为零，所以由[[#thm-taylor]]，在以$z_0$为圆心的某个圆盘上$f = 0$，从而各阶导数在该圆盘上也都为零。**$E$在$D$中是闭集**：它是闭集$\set{f^{(n)} = 0}$的交。与最大模原理（[[complex-analysis/cauchy-theorem#thm-max]]）的证明一样，区域的一个既开又闭的子集要么是空集，要么是整个区域。由于$f\not\equiv0$，$E$不是整个区域，所以$E = \emptyset$。因此在每个零点$a$处，总有某阶导数不为零，该零点具有有限的阶$m$，并且$f(z) = (z - a)^mg(z)$，$g(a)\neq0$。由连续性，在某个圆盘$D(a, r)$上$g\neq0$，于是在该圆盘上，当$z\neq a$时$f(z)\neq0$。
:::

::: theorem 唯一性定理 {#thm-identity}
设$f$和$g$在区域$D$上解析。若对某个在$D$中有聚点的集合$S\subseteq D$中的所有$z$都有$f(z) = g(z)$，则在整个$D$上$f = g$。
:::

::: proof
令$h = f - g$，并设$a\in D$是$S$的一个聚点。存在点$s_n\in S$，$s_n\neq a$，使得$s_n\to a$，且$h(s_n) = 0$；由连续性，$h(a) = 0$。所以$a$是$h$的一个非孤立的零点。由[[#thm-isolated-zeros]]，$h$在$D$上必定恒为零。
:::

唯一性定理正是解析函数如此“刚性”的原因：函数在一条线段上的值，或在一列收敛点列上的值，就决定了它在整个区域上的值。它还保证了对实自变量证明的恒等式对复自变量仍然成立。例如，$\sin^2z + \cos^2z - 1$是整函数，并且在$\R$上为零，所以它在$\C$上为零；而对实数$z, w$成立的$e^{z+w} = e^ze^w$，可以先推广到复数$z$（固定实数$w$），再推广到复数$w$。

::: example 由一列点上的值确定函数 {#ex-identity}
(a)求在单位圆盘上解析、且对所有$n\ge2$满足$f(1/n) = 1/n^2$的所有函数$f$。(b)是否存在单位圆盘上的解析函数，对所有$n\ge2$满足$f(1/n) = (-1)^n/n$？
::: solution
(a)$g(z) = z^2$满足$g(1/n) = 1/n^2$。集合$S = \set{1/n : n\ge2}$有聚点$0$，它位于圆盘内，所以由[[#thm-identity]]，$f = g$：满足条件的函数只有$f(z) = z^2$。

(b)不存在。沿偶数$n = 2k$将有$f(1/2k) = 1/2k$，而集合$\set{1/2k}$以$0$为聚点，所以由唯一性定理，$f(z) = z$。但这样一来$f(1/3) = 1/3\neq-1/3$。与此相反，**光滑的实**函数并不由它在点$1/n$处的值所确定：$x^2 + e^{-1/x^2}\sin(\pi/x)$（在$x = 0$处取值$0$）在$\R$上无穷次可微，并且在每个$x = 1/n$处都等于$1/n^2$，但它不是$x^2$——这从另一个方面说明，实光滑性比复解析性弱得多。
:::
:::

::: warning 聚点必须在区域内
函数$\sin(1/z)$在$\C\setminus\set0$上解析，并在点$1/(k\pi)$处为零，这些点以$0$为聚点。它并不恒为零——这与[[#thm-identity]]并不矛盾，因为聚点$0$不在定义区域内。类似地，在趋于区域边界的点列上相等的两个解析函数，未必处处相等。
:::

## 洛朗级数

像$\frac{e^z}{z^2}$或$e^{1/z}$这样的函数在去心圆盘上解析，但在圆心处不解析，所以在那里没有泰勒级数。允许出现负幂次就能弥补这一点。

::: lemma 圆环中的圆周 {#lem-annulus}
设$g$在圆环$A = \set{z : r < \abs{z - a} < R}$上解析，则对所有$\rho\in(r, R)$，$I(\rho) = \oint_{\abs{z - a} = \rho}g(z)\,dz$都相同。
:::

::: proof
写$I(\rho) = \int_0^{2\pi}g(a + \rho e^{it})\,i\rho e^{it}\,dt$。被积函数关于$\rho$有连续的偏导数（因为$g'$连续，[[complex-analysis/cauchy-theorem#thm-derivatives]]），所以可以在积分号下求导：

$$
I'(\rho) = \int_0^{2\pi}\Big(g'(a + \rho e^{it})\,e^{it}\cdot i\rho e^{it} + g(a + \rho e^{it})\,ie^{it}\Big)\,dt = \int_0^{2\pi}\frac{\partial}{\partial t}\Big(g(a + \rho e^{it})\,e^{it}\Big)\,dt = 0,
$$

这是因为函数$t\mapsto g(a + \rho e^{it})e^{it}$以$2\pi$为周期。所以$I$在$(r, R)$上是常数。
:::

::: theorem 洛朗展开 {#thm-laurent}
设$f$在圆环$A = \set{z : r < \abs{z - a} < R}$上解析，其中$0\le r < R\le\infty$，则

$$
f(z) = \sum_{n=-\infty}^{\infty}c_n(z - a)^n, \qquad c_n = \frac{1}{2\pi i}\oint_{\abs{\zeta - a} = \rho}\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta \quad (r < \rho < R),
$$ {#eq-laurent}

其中$\sum_{n\ge0}$和$\sum_{n<0}$两部分都在$A$内绝对收敛，并在每个闭子圆环$r < \rho_1\le\abs{z - a}\le\rho_2 < R$上一致收敛。系数与$\rho$无关，并且展开式是唯一的：任何以这种方式在$A$上收敛于$f$的级数$\sum b_n(z-a)^n$都满足$b_n = c_n$。
:::

::: proof
**圆环上的积分公式。**固定$z\in A$以及半径$r < \rho_1 < \abs{z - a} < \rho_2 < R$；记$C_1, C_2$为以$a$为圆心、半径分别为$\rho_1, \rho_2$的圆周。函数$g(\zeta) = \frac{f(\zeta) - f(z)}{\zeta - z}$（令$g(z) = f'(z)$）在$A$上连续，并且除了可能在$z$处以外都解析，因而由莫雷拉定理和[[complex-analysis/cauchy-theorem#lem-goursat-point]]，它在$A$上解析。由[[#lem-annulus]]，$\oint_{C_2}g = \oint_{C_1}g$。而$\oint_{C_2}\frac{d\zeta}{\zeta - z} = 2\pi i$（[[complex-analysis/cauchy-theorem#lem-off-centre]]），同时$\oint_{C_1}\frac{d\zeta}{\zeta - z} = 0$，因为$\frac{1}{\zeta - z}$在包含$C_1$的圆盘$\abs{\zeta - a} < \abs{z - a}$上解析。代入$g$的定义，得

$$
f(z) = \frac{1}{2\pi i}\oint_{C_2}\frac{f(\zeta)}{\zeta - z}\,d\zeta - \frac{1}{2\pi i}\oint_{C_1}\frac{f(\zeta)}{\zeta - z}\,d\zeta .
$$

**展开。**在$C_2$上$\abs{z - a} < \abs{\zeta - a}$，与[[#thm-taylor]]中一样，$\frac{1}{\zeta - z} = \sum_{n\ge0}\frac{(z - a)^n}{(\zeta - a)^{n+1}}$在$C_2$上一致成立。在$C_1$上$\abs{\zeta - a} < \abs{z - a}$，二者的角色互换：

$$
-\frac{1}{\zeta - z} = \frac{1}{(z - a) - (\zeta - a)} = \sum_{m\ge0}\frac{(\zeta - a)^m}{(z - a)^{m+1}},
$$

在$C_1$上一致成立。逐项积分，得

$$
f(z) = \sum_{n\ge0}\Big(\frac{1}{2\pi i}\oint_{C_2}\frac{f(\zeta)\,d\zeta}{(\zeta - a)^{n+1}}\Big)(z - a)^n + \sum_{m\ge0}\Big(\frac{1}{2\pi i}\oint_{C_1}f(\zeta)(\zeta - a)^m\,d\zeta\Big)(z - a)^{-m-1}.
$$

在第二个和式中令$n = -m-1$，两类系数就都具有[[#eq-laurent]]的形式，并且由[[#lem-annulus]]（应用于解析函数$f(\zeta)(\zeta - a)^{-n-1}$），积分圆周可以取任意的$\abs{\zeta - a} = \rho$。关于两部分的收敛性：正幂部分是在$D(a, R)$上收敛的幂级数，负幂部分是关于$w = 1/(z - a)$的、在$\abs w < 1/r$时收敛的幂级数；由[[#thm-radius]]即得绝对收敛性和局部一致收敛性。

**唯一性。**若$f(z) = \sum b_n(z - a)^n$，且在圆周$\abs{z - a} = \rho$上一致收敛，则乘以$(z - a)^{-k-1}$后逐项积分：由[[complex-analysis/contour-integrals#thm-fundamental]]，只有$n = k$的项保留下来，得$\oint f(z)(z - a)^{-k-1}\,dz = 2\pi i\,b_k$，所以$b_k = c_k$。
:::

$\sum_{n<0}c_n(z - a)^n$这一部分称为洛朗级数的**主要部分**。正是唯一性使洛朗级数在实际中可以计算：我们从不直接使用[[#eq-laurent]]，而是对已知的级数进行运算，凡是用合法手段得到的展开式，**就是**洛朗级数。

::: example 一个函数，三个洛朗级数 {#ex-three-laurent}
把$f(z) = \dfrac{1}{z(z - 1)}$分别在下列圆环上展开成洛朗级数：(a)$0 < \abs z < 1$；(b)$\abs z > 1$；(c)$0 < \abs{z - 1} < 1$。
::: solution
(a)当$\abs z < 1$时，$\frac{1}{z - 1} = -\sum_{n\ge0}z^n$，所以

$$
f(z) = -\frac1z\sum_{n\ge0}z^n = -\frac1z - 1 - z - z^2 - \cdots\qquad(0 < \abs z < 1).
$$

(b)当$\abs z > 1$时，必须按$1/z$的幂展开：$\frac{1}{z - 1} = \frac1z\cdot\frac{1}{1 - 1/z} = \sum_{n\ge0}z^{-n-1}$，所以

$$
f(z) = \sum_{n\ge0}z^{-n-2} = \frac{1}{z^2} + \frac{1}{z^3} + \frac1{z^4} + \cdots\qquad(\abs z > 1).
$$

(c)令$w = z - 1$，$0 < \abs w < 1$：$f = \frac{1}{w(1 + w)} = \frac1w\sum_{n\ge0}(-1)^nw^n$，所以

$$
f(z) = \frac{1}{z - 1} - 1 + (z - 1) - (z - 1)^2 + \cdots\qquad(0 < \abs{z - 1} < 1).
$$

同一个函数在不同的圆环上有不同的洛朗级数；每个级数在它自己的圆环上是唯一的。注意负一次幂的系数：(a)中为$-1$，(b)中为$0$，(c)中为$1$。由[[#eq-laurent]]（取$n = -1$），它等于$\frac{1}{2\pi i}\oint f$，其中积分沿圆环中的一个圆周——这一观察就是留数定理的雏形（[[complex-analysis/residues]]）。
:::
:::

## 孤立奇点

::: definition 孤立奇点 {#def-singularity}
若$f$在去心圆盘$0 < \abs{z - a} < r$上解析，但在$a$处不解析（或不知道是否解析），则称点$a$是$f$的**孤立奇点**。设$\sum c_n(z - a)^n$是$f$在该去心圆盘上的洛朗级数。称这个奇点为

1. **可去奇点**，若对所有$n < 0$都有$c_n = 0$；
2. **$m$阶极点**，若$c_{-m}\neq0$，且对所有$n < -m$都有$c_n = 0$（$1$阶极点称为**单极点**）；
3. **本性奇点**，若有无穷多个$n < 0$使$c_n\neq0$。
:::

在可去奇点处，令$f(a) = c_0$，就使$f$在$a$处解析（此时洛朗级数是一个幂级数）。以下是$a = 0$处的典型例子：

| $f(z)$ | 以$0$为中心的洛朗级数 | 类型 |
|---|---|---|
| $\dfrac{\sin z}{z}$ | $1 - \dfrac{z^2}{6} + \dfrac{z^4}{120} - \cdots$ | 可去奇点 |
| $\dfrac{\sin z}{z^3}$ | $\dfrac{1}{z^2} - \dfrac16 + \dfrac{z^2}{120} - \cdots$ | $2$阶极点 |
| $\dfrac{1}{e^z - 1}$ | $\dfrac1z - \dfrac12 + \dfrac{z}{12} - \cdots$ | 单极点 |
| $e^{1/z}$ | $1 + \dfrac1z + \dfrac{1}{2!\,z^2} + \dfrac{1}{3!\,z^3} + \cdots$ | 本性奇点 |

每一种类型都可以根据$f$在$a$附近的性态来识别，而无需算出级数。

::: theorem 黎曼可去奇点定理 {#thm-removable}
设$f$在$0 < \abs{z - a} < r$上解析。若当$z\to a$时$(z - a)f(z)\to0$——特别地，若$f$在$a$附近有界——则$a$是可去奇点。
:::

::: proof
设$\eps > 0$，取$\rho_0$，使得当$0 < \abs{z - a} < \rho_0$时$\abs{(z - a)f(z)} < \eps$。对$n\ge1$和$0 < \rho < \rho_0$，把ML不等式应用于[[#eq-laurent]]，得

$$
\abs{c_{-n}} = \left\lvert\frac{1}{2\pi i}\oint_{\abs{\zeta - a} = \rho}f(\zeta)(\zeta - a)^{n-1}\,d\zeta\right\rvert\le\frac{1}{2\pi}\cdot\frac{\eps}{\rho}\,\rho^{n-1}\cdot2\pi\rho = \eps\rho^{n-1}\le\eps\rho_0^{n-1} .
$$

当$n = 1$时，这说明对每个$\eps$都有$\abs{c_{-1}} \le \eps$；当$n\ge2$时，在$\eps\rho^{n-1}$中令$\rho\to0$。无论哪种情形，都有$c_{-n} = 0$。
:::

::: theorem 极点的刻画 {#thm-poles}
设$a$是$f$的孤立奇点，$m\ge1$。下列条件等价：

1. $a$是$m$阶极点；
2. 在$a$附近$f(z) = \dfrac{g(z)}{(z - a)^m}$，其中$g$在$a$处解析且$g(a)\neq0$；
3. $\dfrac1f$以$a$为可去奇点，且其延拓在$a$处有$m$阶零点。

此外，$a$是（某个阶的）极点，当且仅当$z\to a$时$\abs{f(z)}\to\infty$。
:::

::: proof
(1) ⇒ (2)：$f(z) = (z - a)^{-m}\sum_{k\ge0}c_{k-m}(z - a)^k$，该级数定义了$g$，且$g(a) = c_{-m}\neq0$。(2) ⇒ (1)：把$g$展开成泰勒级数，再除以$(z - a)^m$。(2) ⇒ (3)：$\frac1f = \frac{(z - a)^m}{g}$，而由于$g(a)\neq0$，$\frac1g$在$a$附近解析。(3) ⇒ (2)：若$\frac1f = (z - a)^mh$，其中$h$解析且$h(a)\neq0$，则$f = \frac{1/h}{(z - a)^m}$。

若$a$是极点，由(2)得$\abs{f(z)} = \frac{\abs{g(z)}}{\abs{z - a}^m}\to\infty$。反之，若$\abs f\to\infty$，则在$a$附近$f\neq0$，且$\frac1f\to0$；由[[#thm-removable]]，$\frac1f$可以解析延拓到$a$，在$a$处取值$0$，且不恒为零，所以由[[#thm-isolated-zeros]]，该零点具有某个有限的阶$m$，从而(3)成立。
:::

在本性奇点处，函数的性态极其狂野。

::: theorem 卡索拉蒂-魏尔斯特拉斯定理 {#thm-casorati}
若$a$是$f$的本性奇点，则对每个$w\in\C$、每个$\eps > 0$和每个$\delta > 0$，都存在$z$，满足$0 < \abs{z - a} < \delta$且$\abs{f(z) - w} < \eps$。也就是说，$f$在以$a$为圆心的任何去心圆盘上的值在$\C$中稠密。
:::

::: proof
假设结论不成立：对某个$w$、$\eps$和$\delta$，对所有$0 < \abs{z - a} < \delta$都有$\abs{f(z) - w}\ge\eps$。于是$h(z) = \frac{1}{f(z) - w}$在该去心圆盘上解析，并以$1/\eps$为界，所以它以$a$为可去奇点（[[#thm-removable]]）。若延拓后的$h$满足$h(a)\neq0$，则$f = w + \frac1h$在$a$处解析；若$h(a) = 0$，则$h$的这个零点具有有限的阶（$h$不恒为零），由[[#thm-poles]]，$f = w + \frac1h$以$a$为极点。无论哪种情形，$a$都不是本性奇点——矛盾。
:::

::: widget complexmap
f: exp(1/z)
mode: domain
x: -0.6, 0.6
y: -0.6, 0.6
caption: $e^{1/z}$在其本性奇点$0$附近的定义域着色图。在脑海中把原点附近不断放大：在$0$的每个邻域中，每种颜色（辐角）和每种亮度（模）都会出现——这就是看得见的卡索拉蒂-魏尔斯特拉斯定理。与极点作比较：在极点附近，图像是单一的一个色轮，亮度向中心递增。
:::

事实上，还有强得多的结论成立。**皮卡（Picard）大定理**（1879年）指出：在本性奇点的每个去心邻域中，$f$取**每一个**复数值无穷多次，至多有一个例外值。对于$e^{1/z}$，例外值是$0$：给定$w\neq0$，方程$e^{1/z} = w$的解为$z = \frac{1}{\Log w + 2\pi ik}$，$k\in\Z$（当$w = 1$时$k\neq0$），当$\abs k\to\infty$时它们趋于$0$。

::: example 奇点的分类 {#ex-classify}
求出下列函数的奇点并判断其类型：(a)$\dfrac{1 - \cos z}{z^4}$；(b)$\dfrac{1}{e^z - 1}$；(c)$z\sin\dfrac1z$。
::: solution
(a)唯一的奇点是$0$。由$1 - \cos z = \frac{z^2}{2} - \frac{z^4}{24} + \cdots$，得

$$
\frac{1 - \cos z}{z^4} = \frac{1}{2z^2} - \frac{1}{24} + \frac{z^2}{720} - \cdots,
$$

所以$0$是$2$阶极点。（等价地：分子有$2$阶零点，分母有$4$阶零点。）

(b)$e^z = 1$当且仅当$z = 2\pi ik$，$k\in\Z$。在每个这样的点处，$e^z - 1$的导数为$e^{2\pi ik} = 1\neq0$，所以$e^z - 1$有单零点，由[[#thm-poles]](3)，$\frac{1}{e^z - 1}$在该点有单极点。

(c)唯一的奇点是$0$，而$z\sin\frac1z = z\Big(\frac1z - \frac{1}{3!\,z^3} + \frac{1}{5!\,z^5} - \cdots\Big) = 1 - \frac{1}{6z^2} + \frac{1}{120z^4} - \cdots$含有无穷多个负幂项：$0$是本性奇点。（注意$z\sin\frac1z$在$0$附近的**实**轴上有界，但在虚轴上无界，在虚轴上$\sin\frac{1}{iy} = -i\sinh\frac1y$急剧增大。）
:::
:::

::: quiz
$\dfrac{z}{\sin z}$在$z = 0$和$z = \pi$处分别有什么类型的奇点？
- [ ] 在$0$处是单极点，在$\pi$处是单极点
- [x] 在$0$处是可去奇点，在$\pi$处是单极点
- [ ] 在两点处都是可去奇点
- [ ] 在$0$处是本性奇点
::: solution
在$0$处，$\frac{z}{\sin z}\to1$（因为$\frac{\sin z}{z}\to1$），所以它有界，由[[#thm-removable]]，该奇点是可去的。在$\pi$处，分子为$\pi\neq0$，而$\sin z$有单零点（$\cos\pi = -1\neq0$），所以倒数$\frac{\sin z}{z}$在$\pi$处有单零点，由[[#thm-poles]]，$\frac{z}{\sin z}$在该点有单极点。
:::
:::

::: application 解析延拓与ζ函数
黎曼ζ函数在级数收敛的范围$\operatorname{Re} s > 1$内由$\zeta(s) = \sum_{n\ge1}n^{-s}$定义。黎曼（Riemann）在1859年证明了它可以延拓为$\C\setminus\set1$上的解析函数，在$s = 1$处有单极点。由唯一性定理，这样的延拓是唯一的，所以像$\zeta(-1) = -\frac{1}{12}$这样的值是有意义的，尽管级数在那里发散。这个延拓的零点的位置决定着素数的分布，而所有非实零点都位于直线$\operatorname{Re} s = \frac12$上这一猜想——黎曼猜想——是数学中最著名的未解决问题。同样的唯一性使物理学家和工程师可以放心地把由级数或积分定义的函数延拓到其原定义域之外。
:::

::: history
泰勒级数以布鲁克·泰勒（Brook Taylor，1715年）命名；柯西（Cauchy）在1831年的都灵论文中证明了：复可微函数在它可微的任何圆盘上都等于它的幂级数之和。含负幂次的级数是皮埃尔·阿方斯·洛朗（Pierre Alphonse Laurent）在1843年提交给巴黎科学院的一篇论文中引入的；卡尔·魏尔斯特拉斯（Karl Weierstrass）早在1841年就已发现这种展开，但他的论文直到1894年才发表。本性奇点附近的函数值稠密这一定理，由费利切·卡索拉蒂（Felice Casorati）和尤利安·索霍茨基（Yulian Sokhotski）于1868年、魏尔斯特拉斯于1876年分别发表；埃米尔·皮卡（Émile Picard）的强得多的定理于1879年问世。
:::

## 后续内容

洛朗级数是[[complex-analysis/residues]]一章的原材料：系数$c_{-1}$，即**留数**，是洛朗级数沿圆周积分后唯一留下的部分，而留数定理把围道积分化为留数之和。奇点的分类告诉我们如何计算留数，而零点和极点的个数由辐角原理来计数。唯一性定理是解析延拓、对称原理以及[[pde]]和数学物理中许多问题的解的唯一性的基础。

::: summary
- 幂级数在圆盘$\abs{z - a} < R$上绝对收敛（在更小的闭圆盘上一致收敛），在圆盘外发散；在圆盘内，其和函数解析，并且可以逐项求导。
- $D(a,R)$上的每个解析函数在该圆盘上都等于它的泰勒级数，其中$c_n = f^{(n)}(a)/n! = \frac{1}{2\pi i}\oint\frac{f(\zeta)\,d\zeta}{(\zeta - a)^{n+1}}$；收敛半径等于到最近奇点的距离。
- 区域上不恒为零的解析函数的零点是孤立的，并且具有有限的阶；若两个解析函数在一个在区域内有聚点的集合上相等，则它们处处相等（唯一性定理）。
- 在圆环上，解析函数有唯一的洛朗展开式$\sum_{n=-\infty}^\infty c_n(z - a)^n$；可以通过对几何级数和其他已知级数进行运算来求出它。
- 孤立奇点分为可去奇点（在$a$附近有界）、极点（$\abs f\to\infty$；有限个负幂项）和本性奇点（无穷多个负幂项）。
- 在本性奇点附近，$f$可以任意接近每一个值（卡索拉蒂-魏尔斯特拉斯定理），事实上取到每一个值，至多只有一个例外（皮卡定理）。
:::

## 习题

::: exercise 收敛半径 {level=1 check="3"}
求$\displaystyle\sum_{n=1}^\infty\frac{n^2}{3^n}z^n$的收敛半径。
::: solution
由于$n^{1/n}\to1$，$\abs{c_n}^{1/n} = \frac{n^{2/n}}{3}\to\frac13$。由[[#thm-radius]]，$R = 3$。（或用比值判别法：$\frac{c_{n+1}}{c_n} = \frac{(n+1)^2}{3n^2}\to\frac13$。）
:::
:::

::: exercise 由奇点求收敛半径 {level=1 check="5"}
不计算任何系数，求$\dfrac{1}{z^2 + 9}$在$z = 4$处的泰勒级数的收敛半径。
::: solution
该函数除在极点$\pm3i$处趋于无穷外处处解析。由[[#cor-radius]]，收敛半径等于$4$到较近的极点的距离：$\abs{4 - 3i} = \abs{4 + 3i} = 5$。
:::
:::

::: exercise 一个洛朗系数 {level=1 check="1/6"}
求$z^2e^{1/z}$以$0$为中心的洛朗级数中$z^{-1}$的系数。
::: solution
$z^2e^{1/z} = z^2\sum_{n\ge0}\frac{1}{n!\,z^n} = \sum_{n\ge0}\frac{z^{2-n}}{n!}$。幂$z^{-1}$出现在$n = 3$时，系数为$\frac{1}{3!} = \frac16$。
:::
:::

::: exercise 零点的阶 {level=2 check="3"}
求$f(z) = z - \sin z$在$z = 0$处零点的阶，以及$g(z) = z^2(e^{z} - 1)$在$0$处零点的阶。
::: solution
$z - \sin z = \frac{z^3}{3!} - \frac{z^5}{5!} + \cdots$，第一个非零系数是$z^3$的系数：阶为$3$。（用导数验证：$f'(0) = 1 - \cos 0 = 0$，$f''(0) = \sin0 = 0$，$f'''(0) = \cos0 = 1\neq0$。）对$g$：$e^z - 1$有单零点，所以$g = z^3\cdot\frac{e^z - 1}{z}$，其中$\frac{e^z-1}{z}\to1$；阶同样为$3$。
:::
:::

::: exercise 正切函数的一个泰勒系数 {level=2 check="2/15"}
求$\tan z$在$0$处的泰勒级数中$z^5$的系数。该级数的收敛半径是多少？
::: hint
写$\tan z = c_1z + c_3z^3 + c_5z^5 + \cdots$（它是奇函数），并比较$\sin z = \tan z\cdot\cos z$两边的系数。
:::
::: solution
把$(c_1z + c_3z^3 + c_5z^5 + \cdots)\big(1 - \frac{z^2}{2} + \frac{z^4}{24} - \cdots\big)$乘开，并与$z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots$比较：

$$
c_1 = 1, \qquad c_3 - \frac{c_1}{2} = -\frac16\ \Rightarrow\ c_3 = \frac13, \qquad c_5 - \frac{c_3}{2} + \frac{c_1}{24} = \frac{1}{120}\ \Rightarrow\ c_5 = \frac1{120} + \frac16 - \frac1{24} = \frac{2}{15}.
$$

$\tan z$离$0$最近的奇点是$\cos z$的零点$\pm\frac\pi2$（单极点），所以由[[#cor-radius]]，收敛半径为$\frac\pi2$。
:::
:::

::: exercise 圆环上的洛朗级数 {level=2}
求$f(z) = \dfrac{1}{(z - 1)(z - 2)}$在圆环$1 < \abs z < 2$上的洛朗级数。
::: solution
由部分分式，$f(z) = \frac{1}{z - 2} - \frac{1}{z - 1}$。在$\abs z < 2$上：$\frac{1}{z - 2} = -\frac12\cdot\frac{1}{1 - z/2} = -\sum_{n\ge0}\frac{z^n}{2^{n+1}}$。在$\abs z > 1$上：$\frac{1}{z - 1} = \frac1z\cdot\frac{1}{1 - 1/z} = \sum_{n\ge0}z^{-n-1}$。所以在$1 < \abs z < 2$上，

$$
f(z) = -\sum_{n\ge1}z^{-n} - \sum_{n\ge0}\frac{z^n}{2^{n+1}} = \cdots - \frac{1}{z^2} - \frac1z - \frac12 - \frac z4 - \frac{z^2}{8} - \cdots
$$
:::
:::

::: exercise 奇点分类 {level=2}
求出下列函数的所有奇点并判断其类型：(a)$\dfrac{z}{\sin^2z}$；(b)$\dfrac{e^z - 1}{z^2}$；(c)$\cos\dfrac{1}{z - 1}$。
::: solution
(a)$\sin^2z$在$z = k\pi$处有$2$阶零点。当$k = 0$时，分子有单零点，所以$\frac{z}{\sin^2z} = \frac{z}{z^2(1 - z^2/6 + \cdots)^2}$有单极点；当$k\neq0$时，分子不为零，所以是$2$阶极点。(b)只有$z = 0$：$\frac{e^z - 1}{z^2} = \frac1z + \frac12 + \frac{z}{6} + \cdots$，是单极点。(c)只有$z = 1$：令$w = z - 1$，$\cos\frac{1}{w} = 1 - \frac{1}{2w^2} + \frac{1}{24w^4} - \cdots$含有无穷多个负幂项，是本性奇点。
:::
:::

::: exercise 趋于无穷的整函数 {level=3}
设$f$是整函数，且当$\abs z\to\infty$时$\abs{f(z)}\to\infty$。证明$f$是多项式。
::: hint
在$w = 0$处对$F(w) = f(1/w)$应用[[#thm-poles]]，再利用[[complex-analysis/cauchy-theorem#exr-poly-growth]]中关于多项式增长的习题。
:::
::: solution
取$R > 0$，使得当$\abs z\ge R$时$\abs{f(z)}\ge1$，并考虑$F(w) = f(1/w)$，它在$0 < \abs w < 1/R$上解析。当$w\to0$时$\abs{F(w)}\to\infty$，所以由[[#thm-poles]]，$F$以$0$为极点，设其阶为$m$：当$\abs w$很小时$\abs{F(w)}\le C\abs w^{-m}$。因此当$\abs z$很大时$\abs{f(z)}\le C\abs z^m$，由[[complex-analysis/cauchy-theorem#exr-poly-growth]]，$f$是次数至多为$m$的多项式。
:::
:::

::: exercise 温和的奇点是可去的 {level=3}
设$f$在$0 < \abs{z - a} < r$上解析，且$\abs{f(z)}\le M\abs{z - a}^{-1/2}$。证明$a$是可去奇点。把指数$-1/2$换成$-1$，结论是否仍然成立？
::: solution
$\abs{(z - a)f(z)}\le M\abs{z - a}^{1/2}\to0$，所以可以应用[[#thm-removable]]。指数为$-1$时结论不成立：$f(z) = \frac{1}{z - a}$满足$\abs f\le\abs{z - a}^{-1}$，却有单极点。（此时[[#thm-removable]]的证明只能给出当$n\ge2$时$c_{-n} = 0$：该奇点至多是单极点。）
:::
:::

::: exercise 没有零因子 {level=3}
设$f$和$g$在区域$D$上解析，且对所有$z\in D$有$f(z)g(z) = 0$。证明$f\equiv0$或$g\equiv0$。并说明：若$D$不连通，这一命题不成立；对$\R$上无穷次可微的实函数，它也不成立。
::: solution
设$f\not\equiv0$，则存在$z_0\in D$使$f(z_0)\neq0$，由连续性，在某个圆盘$D(z_0, r)$上$f\neq0$。在该圆盘上$g = 0$。这个圆盘是一个在$D$中有聚点的集合，所以由[[#thm-identity]]，在$D$上$g\equiv0$。在不连通的集合$D = D(0,1)\cup D(3, 1)$上，在第一个圆盘上令$f = 1$，在第二个圆盘上令其为$0$，并令$g = 1 - f$：则$fg = 0$，但二者都不恒为零。在$\R$上，令$x > 0$时$\phi(x) = e^{-1/x^2}$，$x\le0$时$\phi(x) = 0$；则$\phi(x)$和$\phi(-x)$都是光滑的，都不恒为零，而它们的乘积为$0$。用[[abstract-algebra/rings]]一章的语言来说，区域上的解析函数构成一个整环，而$\R$上的光滑函数则不构成整环。
:::
:::
