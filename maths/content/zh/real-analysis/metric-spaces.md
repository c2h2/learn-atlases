回顾本课程中的证明，同样的几个思想反复出现。数列收敛，是指它与极限的距离趋于$0$。柯西列是其各项彼此越来越接近的数列。函数连续，是指相近的点有相近的像。波尔查诺-魏尔斯特拉斯定理能抽出收敛的子列，借助它我们证明了$[a, b]$上的连续函数能取得最大值，并且是一致连续的。而在[[real-analysis/uniform-convergence]]一章中，完全相同的论证对**函数**也行得通，只需把$\abs{x - y}$换成$\sup\abs{f - g}$。

所有这些论证只用到了距离的少数几条性质。**度量空间**就是一个带有具备这些性质的距离函数的集合，此外别无其他。这样做的回报是简洁和广泛：一个证明同时适用于实数轴、$\R^n$以及函数空间——在函数空间中，“点”是函数，“球”是与给定函数相近的函数所成的集合。本章将建立相应的术语——开集与闭集、收敛、连续、完备性与紧性——最后讨论压缩映射原理，这一个结果就能求解各种各样的方程，从$x = \cos x$到微分方程。

## 度量

::: definition 度量空间 {#def-metric}
集合$X$上的**度量**是一个函数$d\colon X \times X \to [0, \infty)$，它对所有$x, y, z \in X$满足：

1. $d(x, y) = 0$当且仅当$x = y$；
2. $d(x, y) = d(y, x)$（对称性）；
3. $d(x, z) \le d(x, y) + d(y, z)$（三角不等式）。

**度量空间**$(X, d)$是带有一个度量的集合。任何子集$A \subseteq X$在限制后的度量下仍是度量空间，称为$X$的**子空间**。
:::

::: example 度量一览 {#ex-metrics}
验证下列都是度量空间：(a) 带有$d(x, y) = \abs{x - y}$的$\R$；(b) 带有以下三种度量的$\R^n$：

$$
d_1(x, y) = \sum_{i=1}^n\abs{x_i - y_i}, \qquad d_2(x, y) = \Bigl(\sum_{i=1}^n(x_i - y_i)^2\Bigr)^{1/2}, \qquad d_\infty(x, y) = \max_i\abs{x_i - y_i};
$$

(c) 带有**离散度量**（当$x \ne y$时$d(x, y) = 1$，$d(x, x) = 0$）的任意集合；(d) $[a, b]$上的连续函数构成的空间$C[a, b]$，分别带有$d_\infty(f, g) = \sup_{x}\abs{f(x) - g(x)}$和$d_1(f, g) = \int_a^b\abs{f - g}$。
::: solution
在每种情形中，性质1和2都是显然的，也许只有$C[a, b]$上$d_1$的性质1除外：若$\int_a^b\abs{f - g} = 0$，而$\abs{f - g}$连续且非负，则$f = g$（[[real-analysis/riemann-integral#exr-6-4]]）。真正需要验证的是三角不等式。

(a) 就是[[real-analysis/real-numbers#thm-triangle]]。对于$\R^n$上的$d_1$和$d_\infty$，逐个坐标应用它：$\abs{x_i - z_i} \le \abs{x_i - y_i} + \abs{y_i - z_i}$，然后对$i$求和，或对$i$取最大值（和的最大值不超过最大值之和）。对于$d_2$，三角不等式就是欧几里得范数的闵可夫斯基（Minkowski）不等式$\norm{u + v} \le \norm u + \norm v$，它可由柯西-施瓦茨（Cauchy–Schwarz）不等式推出（[[linear-algebra/inner-products]]）。(c) 若$x \ne z$，则$y$至少与$x, z$之一不同，所以$d(x, y) + d(y, z) \ge 1 = d(x, z)$。(d) 对每个$t$，$\abs{f(t) - h(t)} \le \abs{f(t) - g(t)} + \abs{g(t) - h(t)} \le d_\infty(f, g) + d_\infty(g, h)$；再对$t$取上确界。对于$d_1$，利用积分的单调性和线性性，把逐点成立的不等式积分即可。上确界是有限的，因为$[a, b]$上的连续函数有界。
:::
:::

$\R^n$上的这三种度量互不相同，但可以相互比较：对所有$x, y$，

$$
d_\infty(x, y) \le d_2(x, y) \le d_1(x, y) \le n\,d_\infty(x, y).
$$ {#eq-equivalent}

（前两个不等式是说：单独一项，或平方和的平方根，不超过相应的和；最后一个不等式则用最大的一项来估计$n$项中的每一项。）因此，它们有相同的收敛序列、相同的开集和相同的连续函数；只有球的形状不同。

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: 平面上关于$d_1$（菱形）、$d_2$（圆盘）和$d_\infty$（正方形）的单位球$\set{x : d(0, x) < 1}$。拖动球心和半径，并让$p$在介于它们之间的各个$p$-度量中变化。菱形 ⊂ 圆盘 ⊂ 正方形的嵌套关系正是[[#eq-equivalent]]：一种度量的每个球都包含另一种度量的一个同心球，这就是这三种度量定义出相同开集的原因。
:::

::: quiz
下列哪些在$\R$上定义了度量？选出所有正确的选项。
- [ ] $d(x, y) = (x - y)^2$
- [x] $d(x, y) = \dfrac{\abs{x - y}}{1 + \abs{x - y}}$
- [ ] $d(x, y) = \abs{x^2 - y^2}$
- [x] $d(x, y) = \sqrt{\abs{x - y}}$
::: solution
$(x - y)^2$不满足三角不等式：$d(0, 2) = 4 > d(0, 1) + d(1, 2) = 2$。$\abs{x^2 - y^2}$不满足性质1：$d(1, -1) = 0$。另外两个是度量：它们都具有$\varphi(\abs{x - y})$的形式，其中$\varphi$递增，$\varphi(0) = 0$，且$\varphi(s + t) \le \varphi(s) + \varphi(t)$——第二个见[[#exr-8-4]]；对最后一个，$\sqrt{s + t} \le \sqrt s + \sqrt t$（两边平方即可）。第二个度量以$1$为界，但它与$\abs{x - y}$有相同的收敛序列：度量是否有界，并不说明空间的任何性质。
:::
:::

## 开集与闭集

在度量空间$(X, d)$中，以$x$为球心、$r > 0$为半径的**开球**是$B(x, r) = \set{y \in X : d(x, y) < r}$。

::: definition 开集与闭集 {#def-open}
如果对每个$x \in U$，存在$r > 0$使$B(x, r) \subseteq U$，就称集合$U \subseteq X$是**开集**。如果集合$F \subseteq X$的补集$X \setminus F$是开集，就称$F$是**闭集**。
:::

每个开球都是开集：若$y \in B(x, r)$，则$s = r - d(x, y) > 0$，且$B(y, s) \subseteq B(x, r)$，因为对$z \in B(y, s)$有$d(x, z) \le d(x, y) + d(y, z) < d(x, y) + s = r$。在$\R$中，开区间是开集，闭区间$[a, b]$是闭集（它的补集是两个开区间之并），而$[a, b)$既不是开集也不是闭集。“开”与“闭”可不像门那样非此即彼：$\R$和$\varnothing$既是开集又是闭集；在离散度量空间中，由于$B(x, \tfrac12) = \set{x}$，每个集合都既开又闭。

::: theorem 并与交 {#thm-open-sets}
在任何度量空间中：$\varnothing$和$X$是开集；任意多个开集之并是开集；**有限多个**开集之交是开集。对偶地，任意多个闭集之交以及有限多个闭集之并都是闭集。
:::

::: proof
$\varnothing$是开集，因为没有什么需要验证；$X$是开集，因为每个球都含于$X$。若$x$属于开集之并$\bigcup_\alpha U_\alpha$，则它属于某个$U_\beta$，而$U_\beta$包含一个球$B(x, r)$；这个球含于该并集。若$x \in U_1 \cap \cdots \cap U_n$，取$r_i > 0$使$B(x, r_i) \subseteq U_i$，并令$r = \min(r_1, \dots, r_n) > 0$；则$B(x, r)$含于每个$U_i$。关于闭集的结论通过取补集即得（德摩根律，[[proofs/sets]]）。
:::

::: warning 开集的无限交
[[#thm-open-sets]]中的有限性是要紧的：$\bigcap_{n\ge1}(-\tfrac1n, \tfrac1n) = \set{0}$，它在$\R$中不是开集。证明之所以失效，是因为无穷多个半径的$\min(r_1, r_2, \dots)$可以是$0$。同样，无穷多个闭集之并不一定是闭集：$\bigcup_n[\tfrac1n, 1] = (0, 1]$。
:::

一个集合是否为开集，取决于它所在的空间。在带有通常度量的$X = [0, 2]$中，集合$[0, 1)$是开集，因为$[0, 1) = X \cap (-1, 1)$，而$X$中的球就是$\R$中的球与$X$的交；在$\R$中它不是开集。

如果$d(x_n, x) \to 0$，就称$X$中的序列$(x_n)$**收敛**于$x \in X$；由三角不等式，极限是唯一的，证明与[[real-analysis/sequences#thm-limit-unique]]完全相同。在$\R^n$中，由[[#eq-equivalent]]，按$d_1$、$d_2$、$d_\infty$中任何一种收敛，都意味着每个坐标收敛；在$(C[a, b], d_\infty)$中，收敛就意味着一致收敛。闭集恰好是那些无法通过取极限而逃出的集合。

::: theorem 闭集包含其极限 {#thm-closed-sequential}
集合$F \subseteq X$是闭集，当且仅当只要对所有$n$有$x_n \in F$且$x_n \to x \in X$，极限$x$就属于$F$。
:::

::: proof
设$F$是闭集，$x_n \in F$且$x_n \to x$。若$x \notin F$，则$x$属于开集$X\setminus F$，所以某个球$B(x, r)$与$F$不相交。但当$n$充分大时$d(x_n, x) < r$，于是$x_n \in B(x, r)$，这与$x_n \in F$矛盾。

反之，设$F$包含其中收敛序列的极限，并设$x \in X\setminus F$。如果没有一个球$B(x, r)$含于$X \setminus F$，那么每个$B(x, 1/n)$都含有一点$x_n \in F$；于是$x_n \to x$，从而$x \in F$——矛盾。因此$X\setminus F$是开集，$F$是闭集。
:::

::: example 函数的闭集与非闭集 {#ex-closed-functions}
在$(C[0, 1], d_\infty)$中，证明$F = \set{f : f(0) = 0}$是闭集，而多项式函数的集合$P$不是闭集。
::: solution
若$f_n \in F$且按$d_\infty$有$f_n \to f$，则$\abs{f(0)} = \abs{f(0) - f_n(0)} \le d_\infty(f, f_n) \to 0$，所以$f(0) = 0$，$f \in F$；由[[#thm-closed-sequential]]，$F$是闭集。对于$P$：由魏尔斯特拉斯逼近定理（[[real-analysis/uniform-convergence#thm-weierstrass-approx]]），存在多项式$p_n$使$d_\infty(p_n, e^x) < 1/n$，所以$p_n \to e^x$；但$e^x$不是多项式（它的各阶导数都是$e^x \ne 0$）。所以$P$不包含其中序列的极限：它不是闭集。事实上，每个连续函数都是这样的极限——多项式在$C[0, 1]$中**稠密**。
:::
:::

## 连续性

ε-δ定义可以逐字照搬：如果对每个$\eps > 0$，存在$\delta > 0$，使得只要$d(x, y) < \delta$，就有$\rho(f(x), f(y)) < \eps$，就称$f\colon (X, d) \to (Y, \rho)$**在**$x$**处连续**。在度量空间中，这一定义有一个完全不提及数的等价表述。

::: theorem 连续性的三副面孔 {#thm-continuity-open}
对$f\colon (X, d) \to (Y, \rho)$，下列条件等价：

1. $f$在$X$的每一点处连续；
2. 只要在$X$中$x_n \to x$，就有在$Y$中$f(x_n) \to f(x)$；
3. 对每个开集$V \subseteq Y$，原像$f^{-1}(V) = \set{x \in X : f(x) \in V}$是$X$中的开集。
:::

::: proof
(1) ⇔ (2) 的证明与[[real-analysis/continuity#thm-sequential-continuity]]完全相同，只需把$\abs{\cdot}$换成$d$和$\rho$。

(1) ⇒ (3)。设$V$是开集，$x \in f^{-1}(V)$。由于$f(x) \in V$且$V$是开集，对某个$\eps > 0$有$B(f(x), \eps) \subseteq V$。由连续性，存在$\delta > 0$使$f(B(x, \delta)) \subseteq B(f(x), \eps) \subseteq V$，即$B(x, \delta) \subseteq f^{-1}(V)$。所以$f^{-1}(V)$是开集。

(3) ⇒ (1)。设$x \in X$，$\eps > 0$。球$B(f(x), \eps)$是开集，所以它的原像是一个包含$x$的开集，因而包含某个球$B(x, \delta)$。这恰好是说：由$d(x, y) < \delta$可推出$\rho(f(x), f(y)) < \eps$。
:::

取补集可知，(3)等价于：闭集的原像是闭集。这为证明一个集合是开集或闭集提供了快捷的方法：对连续函数$g\colon \R^n \to \R$，集合$\set{x : g(x) > 0}$是开集（它是$(0, \infty)$的原像），$\set{x : g(x) = 0}$是闭集（它是$\set{0}$的原像）。例如，单位球面$\set{x : d_2(x, 0) = 1}$是$\R^n$中的闭集。在拓扑学中（[[topology/continuous-maps]]），那里根本没有度量，条件(3)被取作连续性的**定义**。

## 完备性

::: definition 完备度量空间 {#def-complete}
如果对每个$\eps > 0$，存在$N$，使得对所有$m, n \ge N$有$d(x_m, x_n) < \eps$，就称度量空间中的序列$(x_n)$是**柯西列**。如果空间中的每个柯西列都收敛于该空间中的一点，就称这个空间是**完备**的。
:::

每个收敛序列都是柯西列（由三角不等式）；完备性就是其逆命题。由柯西准则（[[real-analysis/sequences#thm-cauchy]]），$\R$是完备的。$\Q$不是完备的（考虑$\sqrt2$的十进制近似值），$\R$的子空间$(0, 1]$也不是（$x_n = 1/n$是柯西列，而它的极限$0$不在其中）。由[[#eq-equivalent]]，$\R^n$中的序列是柯西列当且仅当每个坐标序列都是柯西列，所以$\R^n$是完备的。离散度量空间是完备的，因为其中的柯西列最终是常数列。有两个一般性的事实经常用到：**完备空间的闭子集是完备的**，并且**任何度量空间的完备子空间都是闭的**（[[#exr-8-5]]）。

除$\R^n$之外，最重要的完备空间是一个函数空间。

::: theorem C[a, b]是完备的 {#thm-c-complete}
$[a, b]$上的连续实函数构成的空间$C[a, b]$，在度量$d_\infty(f, g) = \sup_x\abs{f(x) - g(x)}$下是完备的。
:::

::: proof
设$(f_n)$是按$d_\infty$的柯西列：对每个$\eps > 0$，存在$N$，使得对所有$m, n \ge N$和所有$x$有$\abs{f_n(x) - f_m(x)} < \eps$。这正是一致收敛的柯西准则，所以由[[real-analysis/uniform-convergence#thm-uniform-cauchy]]，该序列一致收敛于某个函数$f$。由[[real-analysis/uniform-convergence#thm-uniform-continuous]]，$f$连续，所以$f \in C[a, b]$，而一致收敛恰好就是$d_\infty(f_n, f) \to 0$。
:::

::: example 一个不完备的函数空间 {#ex-incomplete}
证明带有度量$d_1(f, g) = \int_0^1\abs{f - g}$的$C[0, 1]$不是完备的。
::: solution
（对$n \ge 2$）设$f_n$在$[0, \tfrac12]$上为$0$，在$[\tfrac12, \tfrac12 + \tfrac1n]$上从$0$线性上升到$1$，在$[\tfrac12 + \tfrac1n, 1]$上等于$1$。每个$f_n$都连续，$\int_0^1 f_n = \frac12 - \frac{1}{2n}$，并且当$m > n$时$f_m \ge f_n$，所以

$$
d_1(f_m, f_n) = \int_0^1(f_m - f_n) = \frac{1}{2n} - \frac{1}{2m} < \frac{1}{2n}.
$$

所以$(f_n)$是柯西列。设对某个连续函数$f$有$d_1(f_n, f) \to 0$。则$\int_0^{1/2}\abs f \le d_1(f_n, f) \to 0$，所以在$[0, \tfrac12]$上$f = 0$（积分为$0$的非负连续函数恒为零）。对任意$\delta > 0$和$n > 1/\delta$，$\int_{1/2+\delta}^1\abs{f - 1} \le d_1(f_n, f) \to 0$，所以在$[\tfrac12 + \delta, 1]$上$f = 1$，从而在$(\tfrac12, 1]$上$f = 1$。这样的$f$在$\tfrac12$处不连续——矛盾。这个“极限”是一个阶梯函数，它不在这个空间中。把这个空间完备化，就得到[[measure-theory/lp-spaces]]一章中的勒贝格空间$L^1$。
:::
:::

## 紧性

波尔查诺-魏尔斯特拉斯定理使有界闭区间与众不同：$[a, b]$中的每个序列都有一个收敛于$[a, b]$**中**某点的子列。这一性质是最值定理和海涅-康托尔定理的关键，值得给它一个名称。

::: definition 紧性 {#def-compact}
如果度量空间的子集$K$中的每个序列都有一个收敛于$K$中某点的子列，就称$K$是**（序列）紧**的。$K$的一个**开覆盖**是指一族开集，其并集包含$K$；如果$K$的每个开覆盖都有一个仍覆盖$K$的有限子族，就称$K$具有**有限子覆盖性质**。
:::

对于度量空间的子集，这两条性质是等价的（见下面的注记），二者都可以称为紧性。序列形式在分析学中很自然；覆盖形式则能推广到拓扑学中（[[topology/compactness]]），并且是测度论所需要的形式。对于区间，我们两者都加以证明。

::: theorem 海涅-博雷尔定理 {#thm-heine-borel}
1. 有界闭区间$[a, b]$的每个开覆盖都有有限子覆盖。
2. $\R^n$的子集是紧的，当且仅当它闭且有界。
:::

::: proof
(1) 设$\mathcal{U}$是覆盖$[a, b]$的一族开集，令

$$
S = \set{x \in [a, b] : [a, x] \text{ 能被有限多个集合覆盖，这些集合都取自 } \mathcal{U}}.
$$

$a \in S$，因为$a$属于$\mathcal U$的某个成员。$S$以$b$为上界，所以$s = \sup S$存在，且$a \le s \le b$。点$s$属于某个$U_0 \in \mathcal{U}$；由于$U_0$是开集，对某个$r > 0$有$(s - r, s + r) \subseteq U_0$。由逼近性质（[[real-analysis/real-numbers#lem-sup-approx]]），存在$x \in S$使$s - r < x \le s$。取$\mathcal U$中覆盖$[a, x]$的有限多个成员，再添上$U_0$，它包含$[x, s + r/2]$。于是$[a, t]$被有限多个集合覆盖，其中$t = \min(s + r/2,\ b)$，所以$t \in S$，从而$t \le s$。由于$s + r/2 > s$，这迫使$t = b$，因此$b \le s$，所以$s = b$，且$b = t \in S$：整个$[a, b]$被$\mathcal U$中的有限多个成员覆盖。

(2) 设$K \subseteq \R^n$是紧的。若$K$无界，则可以取$x_k \in K$使$d_2(x_k, 0) > k$；它的每个子列都无界，因而不可能收敛。若$x_k \in K$且$x_k \to x$，则由紧性，存在收敛于$K$中某点的子列，而这个点必定是$x$（收敛序列的子列有相同的极限）；所以$x \in K$，由[[#thm-closed-sequential]]，$K$是闭集。

反之，设$K$闭且有界，$(x_k)$是$K$中的序列。它的第一个坐标构成一个有界实数列，所以由波尔查诺-魏尔斯特拉斯定理（[[real-analysis/sequences#thm-bw]]），某个子列的第一个坐标收敛。这个子列的第二个坐标有界，所以可以再取一个子列，使第二个坐标也收敛。经过$n$步，就得到一个各坐标都收敛的子列，所以它在$\R^n$中收敛，而由于$K$是闭集，它的极限属于$K$。
:::

::: warning 一般情况下，闭且有界是不够的
在$(C[0, 1], d_\infty)$中，闭单位球$\set{f : d_\infty(f, 0) \le 1}$闭且有界，但不是紧的。函数$f_n(x) = x^n$都属于它，但没有一个子列按$d_\infty$收敛：子列的一致极限必定连续，并且等于逐点极限，而逐点极限在$1$处不连续。类似地，带有离散度量的$\N$闭且有界（所有距离都不超过$1$），但序列$1, 2, 3, \dots$没有收敛的子列。海涅-博雷尔定理是关于$\R^n$的定理，而不是紧性的定义。
:::

关于紧集的基本定理很简短——而它把[[real-analysis/continuity]]一章中的有界性定理和最值定理作为特例包含在内。

::: theorem 紧集的连续像 {#thm-compact-image}
设$f\colon X \to Y$连续，$K \subseteq X$是紧的。则$f(K)$是紧的。特别地，若$Y = \R$，则$f$在$K$上有界，并且（若$K \ne \varnothing$）在$K$上取得最大值和最小值。
:::

::: proof
设$(y_n)$是$f(K)$中的序列，记$y_n = f(x_n)$，其中$x_n \in K$。由紧性，某个子列$x_{n_k}$收敛于某个$x \in K$，再由连续性，$y_{n_k} = f(x_{n_k}) \to f(x) \in f(K)$。所以$f(K)$是紧的。若$Y = \R$，则由[[#thm-heine-borel]]，$f(K)$闭且有界；它的上确界是$f(K)$中某个序列的极限（逼近性质），由于$f(K)$是闭集，上确界属于$f(K)$。所以最大值可以取到，最小值同理。
:::

::: remark 序列紧性与开覆盖
在度量空间中，$K$是序列紧的，当且仅当它具有有限子覆盖性质。**证明概要。**如果每个开覆盖都有有限子覆盖，而$(x_n)$没有在$K$中收敛的子列，那么$K$的每一点都有一个以它为中心的球，只对有限多个$n$含有$x_n$；有限多个这样的球就覆盖了$K$，可是它们合起来只含有该序列的有限多项——这是不可能的。反之，序列紧的$K$是**完全有界**的（对每个$\eps$，它能被有限多个$\eps$-球覆盖），并且每个开覆盖都有一个**勒贝格数**$\delta > 0$，使得每个球心在$K$中、半径为$\delta$的球都含于该覆盖的某一个成员之中；于是用有限多个$\delta$-球覆盖$K$，就得到一个有限子覆盖。完整的证明见鲁丁（Rudin）《数学分析原理》（*Principles of Mathematical Analysis*）第2章，以及[[topology/compactness]]。
:::

::: quiz
下列$\R$的子集中哪些是紧的？选出所有正确的选项。
- [x] $[0, 1] \cup [2, 3]$
- [ ] $[0, \infty)$
- [x] $\set{0} \cup \set{1/n : n \in \N}$
- [ ] $\Q \cap [0, 1]$
::: solution
由海涅-博雷尔定理，需要闭且有界。$[0,1]\cup[2,3]$是有限多个闭集之并，并且有界。$[0, \infty)$无界。$\set{0}\cup\set{1/n}$有界且闭：各点$1/n$唯一的聚点是$0$，而它包含在内。$\Q\cap[0,1]$有界但不闭——有理数可以收敛于$\sqrt2/2$，而这个点不在其中。
:::
:::

## 压缩映射原理

许多问题都可以写成$x = T(x)$的形式：求映射$T$的一个**不动点**。最简单的方法是迭代——从任意一点出发，计算$x_1 = T(x_0)$，$x_2 = T(x_1)$，依此类推——并希望迭代序列收敛。当$T$按一个固定的比例缩小距离、而空间又是完备的时候，这个希望就能实现。

如果存在常数$k$，$0 \le k < 1$，使得对所有$x, y \in X$有$d(T(x), T(y)) \le k\,d(x, y)$，就称映射$T\colon X \to X$是**压缩映射**。

::: theorem 压缩映射原理 {#thm-contraction}
设$(X, d)$是非空的完备度量空间，$T\colon X \to X$是常数为$k < 1$的压缩映射。则$T$恰有一个不动点$x^*$。此外，对任意初始点$x_0 \in X$，迭代序列$x_{n+1} = T(x_n)$收敛于$x^*$，并且

$$
d(x_n, x^*) \le \frac{k^n}{1 - k}\,d(x_0, x_1).
$$ {#eq-contraction-bound}
:::

::: proof
**迭代序列是柯西列。**由归纳法，$d(x_{j+1}, x_j) \le k^j d(x_1, x_0)$：当$j = 0$时它成立，并且$d(x_{j+2}, x_{j+1}) = d(T(x_{j+1}), T(x_j)) \le k\,d(x_{j+1}, x_j)$。对$m > n$，由三角不等式和几何级数得

$$
d(x_m, x_n) \le \sum_{j=n}^{m-1}d(x_{j+1}, x_j) \le d(x_1, x_0)\sum_{j=n}^{\infty}k^j = \frac{k^n}{1 - k}\,d(x_1, x_0).
$$ {#eq-cauchy-iterates}

由于$k^n \to 0$，$(x_n)$是柯西列；又由于$X$完备，它收敛于某个$x^* \in X$。

**极限是不动点。**$T$连续（它是利普希茨常数为$k$的利普希茨映射），所以$T(x^*) = \lim T(x_n) = \lim x_{n+1} = x^*$。

**唯一性。**若还有$T(y^*) = y^*$，则$d(x^*, y^*) = d(T(x^*), T(y^*)) \le k\,d(x^*, y^*)$，所以$(1 - k)\,d(x^*, y^*) \le 0$，从而$x^* = y^*$。

**误差界。**在[[#eq-cauchy-iterates]]中令$m \to \infty$；由于$d(x_m, x_n) \to d(x^*, x_n)$（由三角不等式），就得到[[#eq-contraction-bound]]。
:::

误差界[[#eq-contraction-bound]]在迭代开始**之前**就可以算出，只需用到第一步：它告诉我们，要达到给定的精度，迭代多少次就足够了。这个定理还保证了唯一性，而在存在唯一性问题中，唯一性往往是较难的部分。

::: example 求解x = cos x {#ex-cos}
证明$x = \cos x$在$[0, 1]$中恰有一个解，并且从$x_0 = 1$出发迭代$x_{n+1} = \cos x_n$收敛于这个解。
::: solution
令$X = [0, 1]$，作为$\R$的闭子集，它是完备的；令$T(x) = \cos x$。由于$\cos$在$[0, 1]$上递减，$T(X) = [\cos 1, 1] \subseteq [0, 1]$，所以$T$把$X$映到自身。由中值定理，对$x, y \in [0, 1]$，存在介于它们之间的$c$，使得

$$
\abs{\cos x - \cos y} = \abs{\sin c}\,\abs{x - y} \le \sin(1)\,\abs{x - y},
$$

而$k = \sin 1 \approx 0.841 < 1$。所以$T$是压缩映射，由[[#thm-contraction]]，它有唯一的不动点$x^* \approx 0.739085$，它是从$[0, 1]$中任一点出发的迭代序列的极限。先验估计[[#eq-contraction-bound]]（其中$d(x_0, x_1) = 1 - \cos 1 \approx 0.460$）保证$47$步之后误差小于$10^{-3}$（[[#exr-8-7]]）；实际上$15$步就够了，因为在$x^*$附近，真正的压缩因子是$\abs{\sin x^*} \approx 0.674$。
:::
:::

::: widget cobweb
g: cos(x)
x0: 1
steps: 20
x: 0, 1.2
caption: 从$x_0 = 1$出发的$x_{n+1} = \cos x_n$的蛛网图。由于$\cos$递减，轨道绕着图像与对角线$y = x$的交点（即不动点）向内盘旋，每一圈都比上一圈小，比例约为$\lvert\cos'(x^*)\rvert = \sin x^* \approx 0.67$。试试其他初始值：$[0, 1]$中的每条轨道都被吸引到同一点——这就是唯一性的体现。
:::

::: application 用迭代法解微分方程
初值问题$y' = F(t, y)$，$y(0) = y_0$等价于积分方程$y(t) = y_0 + \int_0^t F(s, y(s))\,ds$，这是连续函数空间上映射$(Ty)(t) = y_0 + \int_0^t F(s, y(s))\,ds$的不动点问题。对$[0, \tfrac12]$上的$y' = y$，$y(0) = 1$：$\abs{(Tf)(t) - (Tg)(t)} \le \int_0^t\abs{f - g} \le \tfrac12 d_\infty(f, g)$，所以$T$是完备空间$(C[0, \tfrac12], d_\infty)$（[[#thm-c-complete]]）上的压缩映射。从$f_0 = 1$出发，迭代得到$1$，$1 + t$，$1 + t + \frac{t^2}{2}$，…，即$e^t$的部分和。当$F$关于$y$满足利普希茨条件时，同样的论证可以证明皮卡-林德勒夫（Picard–Lindelöf）存在唯一性定理（[[ode/existence-uniqueness]]）；取$T(x) = x - f(x)/f'(x)$，它还解释了牛顿法在单根附近的收敛性（[[numerical-analysis/root-finding]]）。
:::

::: warning 两个假设都不可缺少
没有完备性：$T(x) = x/2$是$(0, 1]$上的压缩映射，却没有不动点（本应是不动点的$0$不在空间中）。没有**一致**的常数$k < 1$：$T(x) = x + 1/x$把$[1, \infty)$映入自身，并且当$x \ne y$时满足$\abs{T(x) - T(y)} = \abs{x - y}\bigl(1 - \frac{1}{xy}\bigr) < \abs{x - y}$，然而$T(x) = x$要求$1/x = 0$。距离确实在缩小，但缩小的比例可以逐渐逼近$1$。
:::

::: history
莫里斯·弗雷歇（Maurice Fréchet）在1906年的博士论文中引入了带有距离的抽象空间，把以往分别针对数、点和函数所作的收敛论证统一了起来；费利克斯·豪斯多夫（Felix Hausdorff）在《集合论基础》（*Grundzüge der Mengenlehre*，1914年）中把它们命名为“度量空间”，这部著作还系统地发展了开集和拓扑的理论。$[a, b]$的有限子覆盖性质可以追溯到爱德华·海涅（Eduard Heine）1872年关于一致连续性的工作，以及埃米尔·博雷尔（Émile Borel）——他在1895年对由开区间构成的可数覆盖证明了这一性质；后来它被推广到任意覆盖。埃米尔·皮卡（Émile Picard）在1890年用逐次逼近法求解微分方程，斯特凡·巴拿赫（Stefan Banach）则在他1922年发表的博士论文中提炼出了抽象的压缩映射原理。
:::

## 后续内容

度量空间是通往拓扑学的大门：在拓扑学中，开集被取作基本概念，连续性则由[[#thm-continuity-open]](3)来定义，见[[topology/topological-spaces]]；不借助序列的紧性见[[topology/compactness]]。由函数构成的完备度量空间是泛函分析的舞台。在[[measure-theory/lp-spaces]]一章中，[[#ex-incomplete]]中的不完备空间被完备化为勒贝格空间$L^1$，而上面图示的$p$-度量则成为函数空间上的$L^p$范数。压缩映射原理给出了微分方程解的存在唯一性（[[ode/existence-uniqueness]]）、多元微积分中的反函数定理和隐函数定理，以及迭代法的收敛性分析（[[numerical-analysis/iterative-methods]]）。

::: summary
- 度量是一个距离函数：仅在相同的点之间为零，具有对称性，并满足三角不等式（[[#def-metric]]）。例子：$\R^n$上的$d_1, d_2, d_\infty$，离散度量，$C[a, b]$上的$d_\infty$和$d_1$。
- 开集包含以其每一点为中心的某个球；开集的并以及有限交是开集；闭集恰好是那些包含其中收敛序列的极限的集合（[[#thm-closed-sequential]]）。
- 连续性可以用ε和δ表述，可以用序列表述，也可以用“开集的原像是开集”来表述（[[#thm-continuity-open]]）。
- 完备空间：每个柯西列都收敛。$\R^n$和$(C[a, b], d_\infty)$是完备的（[[#thm-c-complete]]）；$\Q$和$(C[0,1], d_1)$不是。
- 紧集：每个序列都有在该集合中收敛的子列。在$\R^n$中，紧集恰好是有界闭集，并且$[a, b]$具有有限子覆盖性质（[[#thm-heine-borel]]）；一般情况下，闭且有界是不够的。
- 紧集的连续像是紧的，由此可得任意度量空间中的最值定理（[[#thm-compact-image]]）。
- 完备空间上的压缩映射有唯一的不动点，它可以通过迭代求得，误差不超过$\frac{k^n}{1-k}d(x_0, x_1)$（[[#thm-contraction]]）。
:::

## 习题

::: exercise 三种距离 {level=1 check="5"}
求$\R^2$中点$(1, 2)$与$(4, -2)$之间的$d_1$、$d_2$和$d_\infty$。（填写$d_2$。）
::: solution
坐标差的绝对值分别为$3$和$4$。所以$d_1 = 3 + 4 = 7$，$d_2 = \sqrt{9 + 16} = 5$，$d_\infty = \max(3, 4) = 4$，这与$d_\infty \le d_2 \le d_1 \le 2d_\infty$相符。
:::
:::

::: exercise 离散空间 {level=1}
设$X$带有离散度量。证明$X$的每个子集都既是开集又是闭集，并且一个序列收敛当且仅当它最终是常数列。
::: solution
对$x \in A \subseteq X$，球$B(x, \tfrac12) = \set{x}$含于$A$，所以每个$A$都是开集；它的补集也是开集，所以$A$也是闭集。若$x_n \to x$，则当$n \ge N$时$d(x_n, x) < \tfrac12$，这迫使当$n \ge N$时$x_n = x$。反之，最终为常数的序列显然收敛。
:::
:::

::: exercise 距离函数是连续的 {level=1}
设$a$是度量空间$X$中的一点。证明$f(x) = d(x, a)$满足$\abs{f(x) - f(y)} \le d(x, y)$，并由此推出闭球$\set{x : d(x, a) \le r}$是闭集。
::: solution
由三角不等式，$d(x, a) \le d(x, y) + d(y, a)$，所以$f(x) - f(y) \le d(x, y)$；交换$x$与$y$，得$f(y) - f(x) \le d(x, y)$。所以$f$是$1$-利普希茨的，因而连续。闭球是$f^{-1}([0, r])$，即$\R$的一个闭子集的原像，所以由[[#thm-continuity-open]]，它是闭集。
:::
:::

::: exercise 一个有界度量 {level=2}
证明$\rho(x, y) = \dfrac{\abs{x - y}}{1 + \abs{x - y}}$是$\R$上的度量，并且按$\rho$有$x_n \to x$，当且仅当按通常度量有$x_n \to x$。
::: hint
$\varphi(t) = \frac{t}{1+t}$在$[0, \infty)$上递增，并且$\varphi(s + t) \le \varphi(s) + \varphi(t)$。
:::
::: solution
性质1和2是显然的。$\varphi(t) = 1 - \frac{1}{1+t}$递增，并且对$s, t \ge 0$，

$$
\varphi(s + t) = \frac{s}{1 + s + t} + \frac{t}{1 + s + t} \le \frac{s}{1+s} + \frac{t}{1+t} = \varphi(s) + \varphi(t).
$$

因此$\rho(x, z) = \varphi(\abs{x - z}) \le \varphi(\abs{x-y} + \abs{y - z}) \le \rho(x, y) + \rho(y, z)$。关于收敛：$\varphi$连续且$\varphi(0) = 0$，所以由$\abs{x_n - x} \to 0$可推出$\rho(x_n, x) \to 0$；反之，$\abs{x_n - x} = \frac{\rho}{1 - \rho}$（解出$t$即得），当$\rho(x_n, x) \to 0$时它趋于$0$。
:::
:::

::: exercise 完备与闭 {level=2}
设$Y$是度量空间$X$的子集。证明：(a) 若$X$完备且$Y$是闭集，则$Y$完备；(b) 若$Y$（作为子空间）完备，则$Y$是$X$中的闭集。
::: solution
(a) $Y$中的柯西列也是$X$中的柯西列，所以它收敛于某个$x \in X$；由于$Y$是闭集，由[[#thm-closed-sequential]]，$x \in Y$。(b) 设$y_n \in Y$且$y_n \to x \in X$。收敛序列是柯西列，所以$(y_n)$是$Y$中的柯西列，从而收敛于某个$y \in Y$。由$X$中极限的唯一性，$x = y \in Y$。所以$Y$是闭集。
:::
:::

::: exercise 非负函数 {level=2}
证明$F = \set{f \in C[0, 1] : f(x) \ge 0 \text{ 对所有 } x}$是$(C[0, 1], d_\infty)$中的闭集，但不是开集。
::: solution
若$f_n \in F$且一致地有$f_n \to f$，则对每个$x$，$f(x) = \lim f_n(x) \ge 0$（极限保持非严格不等式），所以$f \in F$，从而$F$是闭集。它不是开集：零函数属于$F$，但对每个$r > 0$，常值函数$-r/2$属于球$B(0, r)$而不属于$F$。
:::
:::

::: exercise 计算迭代次数 {level=2 check="47"}
对$[0, 1]$上的$T(x) = \cos x$，取$k = \sin 1$，$x_0 = 1$，求使误差界[[#eq-contraction-bound]]能保证$\abs{x_n - x^*} < 10^{-3}$的最小的$n$。
::: solution
这里$d(x_0, x_1) = 1 - \cos 1 \approx 0.45970$，$k = \sin 1 \approx 0.84147$，所以需要$\frac{k^n}{1-k}\cdot 0.45970 < 10^{-3}$，即$k^n < 3.449\times10^{-4}$，或$n > \frac{\ln(3.449\times 10^{-4})}{\ln 0.84147} \approx 46.2$。所以$n = 47$。（实际误差在$15$步之后就降到$10^{-3}$以下：先验估计是可靠的，但偏于保守。）
:::
:::

::: exercise 紧集上的一致连续性 {level=3}
设$K$是紧度量空间，$f\colon K \to Y$连续。证明$f$一致连续：对每个$\eps > 0$，存在$\delta > 0$，使得只要$d(x, y) < \delta$，就有$\rho(f(x), f(y)) < \eps$。
::: hint
仿照[[real-analysis/continuity#thm-heine-cantor]]的证明，把波尔查诺-魏尔斯特拉斯定理换成紧性。
:::
::: solution
假设不然。则存在$\eps_0 > 0$以及点$x_n, y_n \in K$，使得$d(x_n, y_n) < 1/n$，但$\rho(f(x_n), f(y_n)) \ge \eps_0$。由紧性，存在子列$x_{n_k} \to x \in K$，于是$d(y_{n_k}, x) \le d(y_{n_k}, x_{n_k}) + d(x_{n_k}, x) \to 0$，所以也有$y_{n_k} \to x$。由连续性，$f(x_{n_k}) \to f(x)$且$f(y_{n_k}) \to f(x)$，所以$\rho(f(x_{n_k}), f(y_{n_k})) \le \rho(f(x_{n_k}), f(x)) + \rho(f(x), f(y_{n_k})) \to 0$，这与$\rho(f(x_{n_k}), f(y_{n_k})) \ge \eps_0$矛盾。
:::
:::

::: exercise 紧空间上缩小距离的映射 {level=3}
设$K$是非空的紧度量空间，映射$T\colon K \to K$满足：只要$x \ne y$，就有$d(T(x), T(y)) < d(x, y)$。证明$T$恰有一个不动点。（与上面的警示比较：在非紧空间$[1, \infty)$上，这一结论不成立。）
::: hint
在$K$上求连续函数$g(x) = d(x, T(x))$的最小值。
:::
::: solution
$T$连续（它是$1$-利普希茨的），所以$g(x) = d(x, T(x))$连续：$\abs{g(x) - g(y)} \le d(x, y) + d(T(x), T(y)) \le 2d(x, y)$。由[[#thm-compact-image]]，$g$在某个$x^* \in K$处取得最小值。若$T(x^*) \ne x^*$，则$g(T(x^*)) = d(T(x^*), T(T(x^*))) < d(x^*, T(x^*)) = g(x^*)$，与最小性矛盾。所以$T(x^*) = x^*$。若$y^*$是另一个不动点，则$d(x^*, y^*) = d(T(x^*), T(y^*)) < d(x^*, y^*)$，这是不可能的。
:::
:::
