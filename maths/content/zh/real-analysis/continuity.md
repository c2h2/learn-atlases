关于实数的那一章是从一个本该有根却没有根的函数开始的：在$\Q$上，$f(x) = x^2 - 2$在$[1, 2]$上变号，却从不取零值。在$\R$上这个根是存在的，而这一事实背后的一般原理——连续函数不穿过一条直线，就不能从直线下方到达直线上方——就是介值定理。本章将证明它，以及关于有界闭区间上连续函数的其他几个重要定理：这样的函数有界，能取到最大值和最小值，并且是**一致**连续的。

首先，我们必须精确地说明什么是连续性。“一笔画成、不用提笔的图像”是一个有用的形象，却是一个糟糕的定义：对于像下面的托马（Thomae）函数（也称黎曼函数）这样的函数，它什么也说不出来——托马函数在每个无理数处连续，在每个有理数处间断。[[calculus-1/limits]]中的ε-δ定义可以轻松处理这样的函数，并且它与[[real-analysis/sequences]]中关于数列的定理配合得天衣无缝：本章的每个证明都把关于函数的问题归结为关于数列的问题。

## 函数的极限

在[[calculus-1/limits]]中，我们对定义在某点周围整个区间上的函数取极限。分析学需要更大的灵活性——函数可能定义在$\Q$上、$[0, 1]$上，或$\set{1/n : n \in \N}$上——所以我们允许任意的定义域$A \subseteq \R$，并在$A$之内趋近$c$。

若每个区间$(c - \delta, c + \delta)$都包含$A$中异于$c$的点，则称点$c \in \R$是$A$的一个**聚点**。例如，$[0, 1]$中的每个点都是$(0, 1)$的聚点；$0$是$\set{1/n : n \in \N}$的聚点，但$1/2$不是。$A$中不是$A$的聚点的点称为$A$的**孤立点**。

::: definition 函数的极限 {#def-function-limit}
设$f\colon A \to \R$，$c$是$A$的聚点。记号$\lim_{x\to c} f(x) = L$是指：对每个$\eps > 0$，存在$\delta > 0$，使得

$$
x \in A \ \text{ 且 }\ 0 < \abs{x - c} < \delta \quad\implies\quad \abs{f(x) - L} < \eps.
$$
:::

要求$c$是聚点，保证了有可供检验的点$x$，并使极限唯一（证明与[[calculus-1/limits]]中唯一性定理的证明相同）。连接函数极限与数列极限的桥梁是下面这个定理，它的证明在[[calculus-1/limits]]中曾经许诺过。

::: theorem 极限的序列准则（归结原则） {#thm-sequential-limit}
设$f\colon A \to \R$，$c$是$A$的聚点。则$\lim_{x \to c} f(x) = L$当且仅当对$A$中**每个**满足“对所有$n$有$x_n \ne c$”且$x_n \to c$的数列$(x_n)$，都有$f(x_n) \to L$。
:::

::: proof
**极限蕴涵序列条件。**设$(x_n)$是这样的数列，$\eps > 0$。按[[#def-function-limit]]取$\delta$，再取$N$使得对所有$n \ge N$有$\abs{x_n - c} < \delta$。当$n \ge N$时，$x_n \in A$且$0 < \abs{x_n - c} < \delta$，所以$\abs{f(x_n) - L} < \eps$。因此$f(x_n) \to L$。

**序列条件蕴涵极限。**我们证明其逆否命题。设$\lim_{x\to c} f(x) = L$不成立。否定定义可知，存在$\eps_0 > 0$，使得对每个$\delta > 0$，有某个$x \in A$满足$0 < \abs{x - c} < \delta$，但$\abs{f(x) - L} \ge \eps_0$。对每个$n \in \N$取$\delta = 1/n$，就得到点$x_n \in A$，满足$0 < \abs{x_n - c} < 1/n$且$\abs{f(x_n) - L} \ge \eps_0$。于是$x_n \ne c$，$x_n \to c$（由夹逼定理），但$f(x_n) \not\to L$。所以序列条件不成立。
:::

由此立即得到两个推论。第一，函数极限的运算法则（和、积、商、不等式、夹逼）可以由数列的相应法则（[[real-analysis/sequences#thm-algebra-limits]]）推出，无需任何新的ε-δ论证。第二，我们得到一个判定极限**不**存在的实用方法：找出两个数列$x_n \to c$和$y_n \to c$（各项$\ne c$），使$f$沿它们有不同的极限。

::: example 一个不存在的极限 {#ex-sin-recip}
证明$\lim_{x\to0}\sin(1/x)$不存在，但$\lim_{x\to 0} x\sin(1/x) = 0$。
::: solution
令$x_n = \dfrac{1}{n\pi}$，$y_n = \dfrac{1}{2n\pi + \pi/2}$。这两个数列都由趋于$0$的非零数组成，但$\sin(1/x_n) = \sin(n\pi) = 0 \to 0$，而$\sin(1/y_n) = \sin(2n\pi + \pi/2) = 1 \to 1$。由[[#thm-sequential-limit]]，没有哪个数$L$能是极限，因为两个数列都必须给出$L$。

对第二个函数，当$x \ne 0$时$\abs{x\sin(1/x) - 0} \le \abs{x}$。给定$\eps > 0$，取$\delta = \eps$：若$0 < \abs{x} < \delta$，则$\abs{x\sin(1/x)} \le \abs{x} < \eps$。
:::
:::

::: widget plot
f: sin(1/x); x*sin(1/x)
x: -0.5, 0.5
y: -1.2, 1.2
labels: \sin(1/x); x\sin(1/x)
caption: 在$0$附近，$\sin(1/x)$在$-1$与$1$之间无穷多次地振荡，所以没有哪个值能是它的极限。乘以$x$之后，振荡被压进楔形区域$\lvert y\rvert \le \lvert x\rvert$之中，极限为$0$。在脑海中放大来看：无论$0$周围的窗口多么小，第一个图像仍然扫过整个高度。
:::

## 连续性

::: definition 连续性 {#def-continuous}
设$f\colon A \to \R$，$c \in A$。称函数$f$**在**$c$**处连续**，是指对每个$\eps > 0$，存在$\delta > 0$，使得

$$
x \in A \ \text{ 且 }\ \abs{x - c} < \delta \quad\implies\quad \abs{f(x) - f(c)} < \eps.
$$

若$f$在$A$的每一点处都连续，则称$f$**在**$A$**上连续**（或简称连续）。
:::

若$c$是$A$的聚点，则$f$在$c$处连续恰好是说$\lim_{x\to c} f(x)$存在且等于$f(c)$。在$A$的孤立点处，每个函数都连续（取$\delta$充分小，使得$c$是$A$中与$c$的距离小于$\delta$的唯一的点）。注意，连续性是函数**连同其定义域**的性质：$f(x) = 1/x$在它的定义域$\R\setminus\set{0}$上连续，而问它在$0$处是否连续是没有意义的。

::: theorem 连续性的序列刻画 {#thm-sequential-continuity}
$f\colon A \to \R$在$c \in A$处连续，当且仅当对$A$中每个满足$x_n \to c$的数列$(x_n)$，都有$f(x_n) \to f(c)$。
:::

::: proof
证明就是在[[#thm-sequential-limit]]的证明中取$L = f(c)$，并去掉条件$x_n \ne c$。若$f$在$c$处连续且$x_n \to c$，则对给定的$\eps$，相应的$\delta$最终大于$\abs{x_n - c}$，从而$\abs{f(x_n) - f(c)} < \eps$。若$f$在$c$处不连续，则存在$\eps_0 > 0$，并且对每个$n$，存在点$x_n \in A$，满足$\abs{x_n - c} < 1/n$且$\abs{f(x_n) - f(c)} \ge \eps_0$；于是$x_n \to c$，但$f(x_n) \not\to f(c)$。
:::

::: theorem 连续函数的运算与复合 {#thm-composition}
设$f, g\colon A \to \R$在$c \in A$处连续。则$f + g$、$fg$和$\lambda f$（$\lambda \in \R$）在$c$处连续；若在$A$上$g(x) \ne 0$，则$f/g$也在$c$处连续。若$f\colon A \to B$在$c$处连续，$h\colon B \to \R$在$f(c)$处连续，则复合函数$h \circ f$在$c$处连续。
:::

::: proof
设$A$中的数列$x_n \to c$。由[[#thm-sequential-continuity]]，$f(x_n) \to f(c)$，$g(x_n) \to g(c)$，所以由极限的四则运算，$f(x_n) + g(x_n) \to f(c) + g(c)$，积、数乘与商的情形类似；再由[[#thm-sequential-continuity]]即得这些组合的连续性。至于复合函数：$f(x_n)$是$B$中趋于$f(c)$的数列，而$h$在$f(c)$处连续，所以$h(f(x_n)) \to h(f(c))$。
:::

由于常数函数和$x \mapsto x$都连续，每个多项式在$\R$上连续，每个有理函数在其定义域上连续。然而，有两个最重要的例子是由有理数和无理数构造出来的，它们表明函数可以多么狂野。

::: example 狄利克雷函数 {#ex-dirichlet}
当$x \in \Q$时令$D(x) = 1$，当$x \notin \Q$时令$D(x) = 0$。证明$D$在每一点处都间断。
::: solution
设$c \in \R$。由有理数和无理数的稠密性（[[real-analysis/real-numbers#thm-q-dense]]和[[real-analysis/real-numbers#exr-1-7]]），每个区间$(c - \frac1n, c + \frac1n)$都包含一个有理数$q_n$和一个无理数$r_n$。两个数列都趋于$c$，但对所有$n$有$D(q_n) = 1$，$D(r_n) = 0$。它们不可能都趋于$D(c)$，所以由[[#thm-sequential-continuity]]，$D$在$c$处不连续。（与此形成对照的是，$x\,D(x)$在$0$处连续，而在其他点处都不连续：[[#exr-4-7]]。）
:::
:::

::: example 托马函数 {#ex-thomae}
若$x$是有理数，写成既约分数$x = p/q$（$q \ge 1$），则定义$T(x) = 1/q$（于是$T(0) = 1$）；若$x$是无理数，则定义$T(x) = 0$。证明$T$在每个有理数处间断，在每个无理数处连续。
::: solution
**有理点。**若$c = p/q$，则$T(c) = 1/q > 0$，但无理数$r_n \in (c - \frac1n, c + \frac1n)$满足$r_n \to c$，而$T(r_n) = 0 \not\to T(c)$。

**无理点。**设$c$是无理数，于是$T(c) = 0$，并设$\eps > 0$。考虑由满足$\abs{p/q - c} < 1$且$q \le 1/\eps$的既约分数$p/q$构成的集合$F$。可取的分母$q$只有有限多个，对其中每一个，条件$q(c - 1) < p < q(c+1)$至多允许$2q + 1$个分子，所以$F$是有限集；又由于$c$是无理数，$c \notin F$。令$\delta$为$1$与$c$到$F$中各点的距离中的最小者（若$F = \varnothing$，则$\delta = 1$）；于是$\delta > 0$。若$\abs{x - c} < \delta$，则$x \notin F$，所以要么$x$是无理数，$T(x) = 0$；要么$x = p/q$是既约分数且$q > 1/\eps$，从而$T(x) = 1/q < \eps$。无论哪种情形，都有$\abs{T(x) - T(c)} < \eps$。
:::
:::

论证后半部分的要点是：在一个无理数附近，所有分母较小的有理数都与它保持一个正的距离，而其余的有理数处$T$的值都很小。托马函数将在[[real-analysis/riemann-integral]]中再次出现，作为一个有无穷多个间断点的可积函数。

::: quiz
下列函数（每个都定义在整个$\R$上）中，哪些在$0$处连续？选出所有正确的选项。
- [x] $f(x) = x\,D(x)$，其中$D$是狄利克雷函数
- [ ] $D(x)$本身
- [ ] 当$x \ne 0$时$g(x) = \sin(1/x)$，$g(0) = 0$
- [x] 当$x \ne 0$时$h(x) = x\sin(1/x)$，$h(0) = 0$
::: solution
$\abs{x\,D(x) - 0} \le \abs{x}$，$\abs{h(x) - 0} \le \abs{x}$，所以对两者取$\delta = \eps$都可行。$D$处处间断（[[#ex-dirichlet]]），而$g$在$0$处没有极限（[[#ex-sin-recip]]），所以无论怎样选取$g(0)$，都不能使它在$0$处连续。
:::
:::

## 有界闭区间上的连续函数

下面三个定理正是连续性之所以重要的原因。如果函数不连续，三者都会失效；如果区间不是闭的或不是有界的，前两个也会失效，而第三个只要求定义域是一个区间（正如我们看到的，它在$\Q$上不成立）。它们每一个都是把连续性与完备性结合起来证明的，而完备性以波尔查诺-魏尔斯特拉斯定理（[[real-analysis/sequences#thm-bw]]）或上确界的形式出现。

::: theorem 有界性定理 {#thm-bounded}
连续函数$f\colon [a, b] \to \R$有界。
:::

::: proof
假设不然。则对每个$n \in \N$，存在$x_n \in [a, b]$使$\abs{f(x_n)} > n$。数列$(x_n)$有界，所以由波尔查诺-魏尔斯特拉斯定理，它有子列$x_{n_k} \to c$。由于对所有$k$有$a \le x_{n_k} \le b$，所以也有$a \le c \le b$（[[real-analysis/sequences#thm-order-limits]]）——这里用到了区间是**闭的**。由$f$在$c$处的连续性，$f(x_{n_k}) \to f(c)$，所以数列$(f(x_{n_k}))$收敛，从而有界。但对每个$k$有$\abs{f(x_{n_k})} > n_k \ge k$，矛盾。
:::

::: theorem 最值定理 {#thm-evt}
连续函数$f\colon [a, b] \to \R$能取到最大值和最小值：存在$c, d \in [a, b]$，使得对所有$x \in [a, b]$有$f(d) \le f(x) \le f(c)$。
:::

::: proof
由[[#thm-bounded]]，集合$f([a,b]) = \set{f(x) : x \in [a, b]}$有界，所以由完备性，$M = \sup f([a, b])$存在。对每个$n$，由逼近性质，存在$x_n \in [a, b]$使$M - \frac1n < f(x_n) \le M$。由波尔查诺-魏尔斯特拉斯定理，某个子列$x_{n_k}$收敛于一点$c$，并且与前面一样，$c \in [a, b]$。一方面，由连续性，$f(x_{n_k}) \to f(c)$；另一方面，由$M - \frac{1}{n_k} < f(x_{n_k}) \le M$及夹逼定理得$f(x_{n_k}) \to M$。由极限的唯一性，$f(c) = M$，所以上确界能取到。把这一结论应用于$-f$，即得最小值。
:::

::: warning 每个假设都不可缺少
在$(0, 1]$上，$f(x) = 1/x$连续但无界；在$[0, \infty)$上，$f(x) = x$无界；在$(0, 1)$上，$f(x) = x$有界，但既没有最大值也没有最小值。在闭区间$[0, 1]$上，当$x < 1$时$f(x) = x$、而$f(1) = 0$的这个**不连续**函数的上确界为$1$，却没有最大值。对每个证明，找出失效的那一步。
:::

::: theorem 介值定理 {#thm-ivt}
设$f\colon [a, b] \to \R$连续，$y$是介于$f(a)$与$f(b)$之间的任意一个数。则存在$c \in [a, b]$使$f(c) = y$。
:::

::: proof
若$y$等于$f(a)$或$f(b)$，则无需证明。设$f(a) < y < f(b)$；$f(a) > y > f(b)$的情形只需把这一情形应用于$-f$和$-y$即可。令

$$
S = \set{x \in [a, b] : f(x) < y}.
$$

$S$包含$a$，并以$b$为上界，所以$c = \sup S$存在，且$a \le c \le b$。我们来排除$f(c) < y$和$f(c) > y$这两种情形。

**若$f(c) < y$：**由于$f(b) > y$，所以$c \ne b$。在$c$处的连续性（取$\eps = y - f(c)$）给出$\delta > 0$，使得对所有满足$\abs{x - c} < \delta$的$x \in [a, b]$有$f(x) < f(c) + \eps = y$。于是任何满足$x < c + \delta$的$x \in (c, b]$都属于$S$且大于$c$——这与$c$是$S$的上界矛盾。

**若$f(c) > y$：**由于$f(a) < y$，所以$c \ne a$。由连续性（取$\eps = f(c) - y$），存在$\delta > 0$，使得对所有满足$\abs{x - c} < \delta$的$x \in [a, b]$有$f(x) > y$。所以$S$中没有点落在$(c - \delta, c]$中；又由于$S$的每个点都不超过$c$，数$\max(a, c - \delta) < c$是$S$的一个上界——这与$c$是最小上界矛盾。

因此$f(c) = y$。
:::

把这个定理应用于$[1, 2]$上的$f(x) = x^2 - 2$，就又一次得到了$\sqrt2$——这一次是作为一个一般原理的特例。更一般地，它给出$n$次方根（考虑$[0, 1 + a]$上的$x^n - a$），表明每个奇数次多项式都有实根（[[#exr-4-3]]处理了一个三次多项式），并且与[[#thm-evt]]结合起来，表明**连续函数把有界闭区间映成有界闭区间**：$f([a, b]) = [m, M]$，其中$m$和$M$分别是最小值和最大值。[[numerical-analysis/root-finding]]中的二分法就是这个证明的构造性版本。

::: example 确定根的位置 {#ex-root}
证明方程$\cos x = x$在$[0, \pi/2]$中有解，并且$x^3 - x - 1 = 0$在$[1, 2]$中有解。
::: solution
令$g(x) = \cos x - x$，它作为连续函数之差在$[0, \pi/2]$上连续。于是$g(0) = 1 > 0$，$g(\pi/2) = -\pi/2 < 0$，所以$0$介于$g(0)$与$g(\pi/2)$之间，由[[#thm-ivt]]，存在$c$使$g(c) = 0$，即$\cos c = c$。（数值上$c \approx 0.739$；这个点将在[[real-analysis/metric-spaces]]中作为一个压缩映射的不动点再次出现。）类似地，$p(x) = x^3 - x - 1$满足$p(1) = -1 < 0 < 5 = p(2)$，所以它在$(1, 2)$中有一个根。
:::
:::

::: widget plot
f: x^3 - x - 1; k
x: 0.5, 2.2
y: -2, 6
sliders: k=2:-1:5:0.1
labels: x^3 - x - 1; y = k
caption: $[1, 2]$上$p(x) = x^3 - x - 1$的介值定理，其中$p(1) = -1$，$p(2) = 5$。把水平$k$滑到$-1$与$5$之间的任意位置：水平直线总会在$[1, 2]$这一段上与图像相交，正如[[#thm-ivt]]所保证的。证明把一个交点确定为图像仍位于直线下方的那些点的上确界。
:::

## 一致连续性

在集合上连续的定义中，$\delta$可以既依赖于$\eps$，又依赖于点$c$。而且往往必须如此。对$(0, 1]$上的$f(x) = 1/x$，对给定的$\eps$，在$c$处可用的最大的$\delta$是$\dfrac{\eps c^2}{1 + \eps c}$，当$c \to 0$时它缩小到$0$：在$0$附近，图像如此陡峭，以至于$x$的微小变化会引起$f(x)$的巨大变化。

::: widget plot
f: 1/x; 1/c + e; 1/c - e
x: 0.05, 2.2
y: 0, 12
sliders: c=1:0.1:2:0.01; e=0.5:0.1:1:0.05
labels: 1/x; 1/c+\varepsilon; 1/c-\varepsilon
caption: 以高度$1/c$为中心、半宽为$\eps$（滑块$e$）的带形区域。只有当$x$位于$c$附近一个长度约为$2\eps c^2$的短区间内时，$1/x$的图像才落在带形区域之中。固定$\eps$，把$c$向$0$滑动：可用的区间缩小到几乎没有，所以没有一个$\delta$能适用于每一点。这就是一致连续性的失效。
:::

::: definition 一致连续 {#def-uniform-continuity}
称函数$f\colon A \to \R$在$A$上**一致连续**，是指对每个$\eps > 0$，存在$\delta > 0$，使得

$$
x, y \in A \ \text{ 且 }\ \abs{x - y} < \delta \quad\implies\quad \abs{f(x) - f(y)} < \eps.
$$
:::

它与连续性的区别仅在于量词的次序——是“对每个$\eps$，存在$\delta$，使得对所有$x, y$”，而不是“对每个$c$和每个$\eps$，存在$\delta$”——但这是一个实质性的区别：一个$\delta$必须同时适用于整个定义域。与[[#thm-sequential-limit]]的证明中完全一样，取$\delta = 1/n$来否定这个定义，就得到一个实用的判别法。

::: lemma 非一致连续的序列判别法 {#lem-not-uc}
$f\colon A \to \R$不一致连续，当且仅当存在$\eps_0 > 0$以及$A$中的数列$(x_n)$、$(y_n)$，使得$\abs{x_n - y_n} \to 0$，但对所有$n$有$\abs{f(x_n) - f(y_n)} \ge \eps_0$。
:::

::: proof
若$f$不一致连续，则有某个$\eps_0 > 0$找不到合适的$\delta$；特别地，$\delta = 1/n$不可行，这就给出了满足$\abs{x_n - y_n} < 1/n$且$\abs{f(x_n) - f(y_n)} \ge \eps_0$的$x_n, y_n \in A$。反之，给定这样的数列，对任何提出的$\delta > 0$，取$n$充分大使$\abs{x_n - y_n} < \delta$，则数对$x_n, y_n$就使这个$\delta$失效。
:::

::: example 哪些函数一致连续？ {#ex-uc}
判断下列各函数是否一致连续：(a) $\R$上的$\sin x$；(b) $[0, \infty)$上的$\sqrt x$；(c) $\R$上的$x^2$；(d) $(0, 1]$上的$1/x$。
::: solution
(a) 是。由$\sin x - \sin y = 2\cos\frac{x+y}{2}\sin\frac{x-y}{2}$和$\abs{\sin t} \le \abs t$，得$\abs{\sin x - \sin y} \le \abs{x - y}$，所以取$\delta = \eps$即可。一般地，**利普希茨**函数——即对某个常数$K$满足$\abs{f(x) - f(y)} \le K\abs{x - y}$的函数——是一致连续的，取$\delta = \eps/K$即可。

(b) 是，尽管$\sqrt x$在$0$附近不是利普希茨的。当$0 \le y \le x$时有$\sqrt x - \sqrt y \le \sqrt{x - y}$（两边平方：由于$y \le \sqrt{xy}$，有$x - 2\sqrt{xy} + y \le x - y$）。所以$\abs{\sqrt x - \sqrt y} \le \sqrt{\abs{x - y}}$，取$\delta = \eps^2$即可。

(c) 否。取$x_n = n + \frac1n$，$y_n = n$：则$\abs{x_n - y_n} = \frac1n \to 0$，但$x_n^2 - y_n^2 = 2 + \frac1{n^2} \ge 2$。由[[#lem-not-uc]]（取$\eps_0 = 2$），这个函数不一致连续。它的图像越来越陡。

(d) 否。取$x_n = \frac1n$，$y_n = \frac{1}{n+1}$：则$\abs{x_n - y_n} = \frac{1}{n(n+1)} \to 0$，但$\abs{f(x_n) - f(y_n)} = 1$。
:::
:::

在(c)中，麻烦出在无穷远处；在(d)中，麻烦出在一个缺失的端点处。在有界闭区间上，这两种情况都不会发生。

::: theorem 海涅-康托尔定理 {#thm-heine-cantor}
连续函数$f\colon [a, b] \to \R$是一致连续的。
:::

::: proof
假设不然。由[[#lem-not-uc]]，存在$\eps_0 > 0$以及点$x_n, y_n \in [a, b]$，满足$\abs{x_n - y_n} < 1/n$且$\abs{f(x_n) - f(y_n)} \ge \eps_0$。由波尔查诺-魏尔斯特拉斯定理，某个子列$x_{n_k}$收敛于某个$c$，并且由于区间是闭的，$c \in [a, b]$。于是也有$y_{n_k} \to c$，因为$\abs{y_{n_k} - c} \le \abs{y_{n_k} - x_{n_k}} + \abs{x_{n_k} - c} < \frac{1}{n_k} + \abs{x_{n_k} - c} \to 0$。由$f$在$c$处的连续性，$f(x_{n_k})$和$f(y_{n_k})$都趋于$f(c)$，所以它们的差趋于$0$——这与$\abs{f(x_{n_k}) - f(y_{n_k})} \ge \eps_0$矛盾。
:::

一致连续性正是使连续函数可积的原因：在[[real-analysis/riemann-integral]]中，对整个区间只用一个$\delta$，就能使黎曼和中的每个矩形同时都足够精确。

::: quiz
下列函数中，哪些在开区间$(0, 1)$上一致连续？选出所有正确的选项。
- [x] $x^2$
- [ ] $1/x$
- [ ] $\sin(1/x)$
- [x] $x\sin(1/x)$
::: solution
$x^2$和$x\sin(1/x)$都可以延拓为$[0, 1]$上的连续函数（令后者在$0$处的值为$0$），由[[#thm-heine-cantor]]，它们在$[0, 1]$上一致连续，从而在更小的集合$(0, 1)$上也一致连续。由[[#ex-uc]](d)，$1/x$不一致连续；$\sin(1/x)$也不一致连续，因为点$x_n = \frac{1}{2n\pi}$与$y_n = \frac{1}{2n\pi + \pi/2}$可以任意接近，而$\abs{\sin(1/x_n) - \sin(1/y_n)} = 1$。一般地，$(a, b)$上的连续函数一致连续，当且仅当它能连续地延拓到$[a, b]$上。
:::
:::

## 单调函数

单调函数的性态比一般函数好得多：它们只可能发生跳跃，而且跳跃只有可数多次。

::: theorem 单调函数的间断点 {#thm-monotone-jumps}
设$f\colon (a, b) \to \R$递增。则在每个$c \in (a, b)$处，单侧极限都存在，并且

$$
f(c^-) = \lim_{x\to c^-} f(x) = \sup_{x < c} f(x) \ \le\ f(c)\ \le\ \inf_{x > c} f(x) = \lim_{x \to c^+}f(x) = f(c^+).
$$

$f$在$c$处连续当且仅当$f(c^-) = f(c^+)$，并且$f$的间断点构成的集合是可数的。
:::

::: proof
集合$\set{f(x) : a < x < c}$非空，并以$f(c)$为上界；设$s$是它的上确界，于是$s \le f(c)$。给定$\eps > 0$，由逼近性质，存在$x_0 \in (a, c)$使$f(x_0) > s - \eps$，而当$x_0 < x < c$时，由单调性得$s - \eps < f(x_0) \le f(x) \le s$。所以$\lim_{x\to c^-}f(x) = s$（取$\delta = c - x_0$）。右极限可以用下确界同样处理。

由用单侧极限刻画双侧极限的结论（[[calculus-1/limits]]），$f$在$c$处连续当且仅当两个单侧极限都等于$f(c)$；而由于$f(c^-) \le f(c) \le f(c^+)$，这恰好在$f(c^-) = f(c^+)$时发生。

对每个间断点$c$，开区间$J_c = (f(c^-), f(c^+))$非空；取一个有理数$r(c) \in J_c$。若$c < d$是两个这样的点，则对任意$x \in (c, d)$有$f(c^+) \le f(x) \le f(d^-)$，所以$J_c$整个位于$J_d$的下方，两个区间不相交。因此$r(c) \ne r(d)$：映射$c \mapsto r(c)$是从间断点集到$\Q$的一个单射，而$\Q$是可数的（[[proofs/cardinality]]）。
:::

::: corollary 反函数的连续性 {#cor-inverse}
设$I$是一个区间，$f\colon I \to \R$连续且严格递增。则$J = f(I)$是一个区间，并且反函数$f^{-1}\colon J \to I$连续且严格递增。
:::

::: proof
若$y_1 < y < y_2$，其中$y_1 = f(x_1)$，$y_2 = f(x_2)$，则在$[x_1, x_2]$上应用介值定理，可得$x$使$f(x) = y$；所以$J$是一个区间。反函数$g = f^{-1}$严格递增（若$y < y'$而$g(y) \ge g(y')$，作用$f$将得到$y \ge y'$）。假设$g$在$J$的某个内点$y_0$处间断。由[[#thm-monotone-jumps]]，$g(y_0^-) < g(y_0^+)$，所以区间$\bigl(g(y_0^-), g(y_0)\bigr)$与$\bigl(g(y_0), g(y_0^+)\bigr)$中至少有一个非空；不妨设是前者。它位于区间$I$之内，介于某个$y < y_0$处的值$g(y)$与$g(y_0)$之间。但$g$没有任何值落在其中：当$y < y_0$时$g(y) \le g(y_0^-)$，当$y \ge y_0$时$g(y) \ge g(y_0)$。这与$g(J) = I$矛盾。在$J$的端点处，用单侧极限作同样的论证即可。
:::

仅这一个推论就给出了$\sqrt[n]{x}$在$[0, \infty)$上的连续性、$\ln$在$(0, \infty)$上的连续性（它是$\exp$的反函数），以及$\arcsin$、$\arccos$、$\arctan$在各自定义域上的连续性——无需任何新的ε-δ估计。

::: remark 函数可以在哪些点处间断？
托马函数恰好在$\Q$上间断。能否有某个函数恰好在**无理数**处间断，也就是恰好在有理数处连续？答案是否定的：任何函数$\R \to \R$的连续点集都是可数多个开集的交，而贝尔纲定理表明$\Q$不具有这种形式。完整的讨论见阿博特（Abbott）《理解分析》（*Understanding Analysis*）第4.6节。
:::

::: history
伯纳德·波尔查诺（Bernard Bolzano）1817年的小册子首次从连续性的定义出发，而不是从几何直观出发，证明了介值定理；奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在他的《分析教程》（*Cours d'analyse*，1821年）中这样定义连续性：自变量的无穷小增量产生函数的无穷小增量。彼得·古斯塔夫·勒热纳·狄利克雷（Peter Gustav Lejeune Dirichlet）于1829年在关于傅里叶级数的研究中引入了他的处处间断的函数，作为一个不能积分的函数的例子。卡尔·魏尔斯特拉斯（Karl Weierstrass）在19世纪60年代的柏林讲课中证明了最值定理。爱德华·海涅（Eduard Heine）于1872年发表了“有界闭区间上的连续函数一致连续”这一定理（狄利克雷在1854年的讲课中已经用过这一思想），而卡尔·约翰内斯·托马（Carl Johannes Thomae）于1875年描述了以他命名的函数。
:::

## 后续内容

本章的定理是后面两章的基础。[[real-analysis/differentiation]]中的中值定理由最值定理证明，而[[real-analysis/riemann-integral]]中连续函数的可积性依赖于海涅-康托尔定理。在[[real-analysis/uniform-convergence]]中，我们要问连续函数的极限何时连续；在[[real-analysis/metric-spaces]]中，上面的证明将在其自然的一般性中得到理解：紧集的连续像是紧的，这一结论同时包含了有界性定理和最值定理；而且连续性完全可以不用ε或δ，而用开集来表述（[[topology/continuous-maps]]）。

::: summary
- $\lim_{x\to c}f(x) = L$当且仅当对每个满足$x_n \ne c$的数列$x_n \to c$都有$f(x_n) \to L$（[[#thm-sequential-limit]]）；两个给出不同极限的数列可以证明极限不存在。
- 当对所有$x_n \to c$都有$f(x_n) \to f(c)$时，$f$在$c$处连续；连续函数的和、积、商与复合都连续。
- 狄利克雷函数处处不连续；托马函数恰好在无理数处连续。
- 在有界闭区间上，连续函数有界，能取到最大值和最小值（[[#thm-evt]]），能取到每个中间值（[[#thm-ivt]]），并且一致连续（[[#thm-heine-cantor]]）。在开区间或无界区间上，除介值性质外，每个结论都可能不成立。
- 一致连续：一个$\delta$适用于整个定义域。要否定它，就找出$x_n, y_n$，使$\abs{x_n - y_n} \to 0$，但$\abs{f(x_n) - f(y_n)} \ge \eps_0$。
- 单调函数处处有单侧极限，并且至多有可数多个跳跃；连续且严格单调的函数有连续的反函数。
:::

## 习题

::: exercise 一个线性函数 {level=1}
用[[#def-continuous]]证明$f(x) = 3x - 2$在每个$c \in \R$处连续。它一致连续吗？
::: solution
$\abs{f(x) - f(c)} = 3\abs{x - c}$。给定$\eps > 0$，取$\delta = \eps/3$：若$\abs{x - c} < \delta$，则$\abs{f(x) - f(c)} < \eps$。由于$\delta$不依赖于$c$，同样的计算表明$f$一致连续（它是利普希茨常数为$3$的利普希茨函数）。
:::
:::

::: exercise 可去间断 {level=1 check="3"}
当$x \ne 0$时令$f(x) = \dfrac{\sin 3x}{x}$，并令$f(0) = k$。$k$取何值时$f$在$0$处连续？
::: solution
$f$在$0$处连续，当且仅当$k = \lim_{x\to0}\frac{\sin 3x}{x} = \lim_{x\to 0}3\cdot\frac{\sin 3x}{3x} = 3$，这里用到了[[calculus-1/limits]]中的基本三角极限。所以$k = 3$。
:::
:::

::: exercise 三次方程的根 {level=1}
证明$x^3 + x - 1 = 0$恰有一个实数解，并且它位于$(0, 1)$中。
::: solution
$p(x) = x^3 + x - 1$连续，且$p(0) = -1 < 0 < 1 = p(1)$，所以由[[#thm-ivt]]，它在$(0, 1)$中有一个根。它只有一个根，因为$p$严格递增：若$x < y$，则$x^3 < y^3$，从而$p(x) < p(y)$。
:::
:::

::: exercise 一个不动点定理 {level=2}
设$f\colon [0, 1] \to [0, 1]$连续。证明$f$有**不动点**，即存在某个$c \in [0,1]$使$f(c) = c$。
::: hint
对$g(x) = f(x) - x$应用介值定理。
:::
::: solution
$g(x) = f(x) - x$在$[0,1]$上连续，并且由于$f$的值都在$[0, 1]$中，$g(0) = f(0) \ge 0$，$g(1) = f(1) - 1 \le 0$。所以$0$介于$g(0)$与$g(1)$之间，由[[#thm-ivt]]，存在$c$使$g(c) = 0$，即$f(c) = c$。（从几何上看，$f$的图像必定与单位正方形的对角线相交。）
:::
:::

::: exercise 在有理数上相等的函数 {level=2}
设$f, g\colon \R \to \R$连续，并且对每个$q \in \Q$有$f(q) = g(q)$。证明$f = g$。
::: solution
设$x \in \R$。由$\Q$的稠密性，取有理数$q_n$使$\abs{q_n - x} < 1/n$，于是$q_n \to x$。由[[#thm-sequential-continuity]]，$f(q_n) \to f(x)$，$g(q_n) \to g(x)$。但对每个$n$有$f(q_n) = g(q_n)$，所以由极限的唯一性，两个极限相同：$f(x) = g(x)$。（所以连续函数由它在一个稠密集上的值所决定。）
:::
:::

::: exercise 一个有界的利普希茨函数 {level=2}
证明$f(x) = \dfrac{1}{1 + x^2}$在$\R$上一致连续。
::: hint
利用$\dfrac{\abs{t}}{1 + t^2} \le \dfrac12$，证明$\abs{f(x) - f(y)} \le \abs{x - y}$。
:::
::: solution
对所有$x, y$，

$$
\abs{f(x) - f(y)} = \frac{\abs{y^2 - x^2}}{(1+x^2)(1+y^2)} \le \abs{x - y}\left(\frac{\abs{x}}{(1+x^2)(1+y^2)} + \frac{\abs{y}}{(1+x^2)(1+y^2)}\right) \le \abs{x - y}\left(\frac12 + \frac12\right),
$$

这里先用了$\abs{x + y} \le \abs x + \abs y$，再从每个分母中去掉一个$\ge 1$的因子，并应用$\frac{\abs t}{1+t^2} \le \frac12$（它等价于$(\abs t - 1)^2 \ge 0$）。所以$f$是利普希茨常数为$1$的利普希茨函数，取$\delta = \eps$即可。
:::
:::

::: exercise 恰在一点处连续 {level=2}
设$D$是狄利克雷函数。证明$f(x) = x\,D(x)$在$0$处连续，而在每个$c \ne 0$处间断。
::: solution
在$0$处：$\abs{f(x) - f(0)} = \abs{x}D(x) \le \abs{x}$，所以取$\delta = \eps$即可。在$c \ne 0$处：取有理数$q_n \to c$和无理数$r_n \to c$。则$f(q_n) = q_n \to c$，$f(r_n) = 0 \to 0$。由于$c \ne 0$，这两个极限不同，所以它们不可能都等于$f(c)$，由[[#thm-sequential-continuity]]可知$f$在$c$处不连续。
:::
:::

::: exercise 一致连续性与有界性 {level=3}
证明一致连续函数$f\colon (0, 1) \to \R$有界。由此再次推出$1/x$在$(0,1)$上不一致连续。
::: hint
取对应于$\eps = 1$的$\delta$，并用有限多个长度小于$\delta$的区间覆盖$(0, 1)$。
:::
::: solution
取$\delta > 0$，使得由$\abs{x - y} < \delta$可推出$\abs{f(x) - f(y)} < 1$。取$m \in \N$使$1/m < \delta$，并考虑点$p_k = k/(m+1)$（$k = 1, \dots, m$），它们都位于$(0, 1)$中。每个$x \in (0, 1)$与某个$p_k$（即满足$1 \le k \le m$的最近的格点$k/(m+1)$）的距离都在$\frac{1}{m+1} < \delta$以内。因此对每个$x \in (0,1)$有$\abs{f(x)} \le \abs{f(p_k)} + 1 \le \max_{1\le k\le m}\abs{f(p_k)} + 1$，这是一个与$x$无关的界。由于$1/x$在$(0, 1)$上无界，它在那里不可能一致连续。
:::
:::

::: exercise 在无穷远处趋于零 {level=3}
设$f\colon \R \to \R$连续，且$\lim_{x\to\infty}f(x) = \lim_{x\to-\infty}f(x) = 0$。证明$f$一致连续。
::: hint
在一个大区间$[-R, R]$之外，函数与$0$的距离小于$\eps/2$；在一个稍大一些的区间之内，利用[[#thm-heine-cantor]]。
:::
::: solution
设$\eps > 0$。取$R > 0$，使得只要$\abs x \ge R$就有$\abs{f(x)} < \eps/2$。由[[#thm-heine-cantor]]，$f$在$[-R-1, R+1]$上一致连续：存在$\delta_1 > 0$，使得由$x, y \in [-R-1, R+1]$且$\abs{x - y} < \delta_1$可推出$\abs{f(x) - f(y)} < \eps$。令$\delta = \min(\delta_1, 1)$，并设$\abs{x - y} < \delta$。若$x$和$y$都在$[-R-1, R+1]$中，则$\abs{f(x) - f(y)} < \eps$。否则其中之一，比如$x$，满足$\abs{x} > R + 1$；由于$\abs{x - y} < 1$，有$\abs{y} > R$，从而$\abs{f(x) - f(y)} \le \abs{f(x)} + \abs{f(y)} < \eps/2 + \eps/2 = \eps$。
:::
:::

::: exercise 有理数与无理数的互换 {level=3}
证明：不存在把每个有理数映为无理数、把每个无理数映为有理数的连续函数$f\colon \R \to \R$。
::: hint
像$f(\R)$是一个区间（由介值定理）；证明它是可数的。
:::
::: solution
假设这样的$f$存在。由[[#thm-ivt]]，像$f(\R)$是一个区间：若$f(x_1) < y < f(x_2)$，则$x_1$与$x_2$之间的某个点被映为$y$。另一方面，$f(\R) = f(\Q) \cup f(\R\setminus\Q)$，其中$f(\Q)$是可数的（可数集的像），$f(\R\setminus\Q) \subseteq \Q$也是可数的。所以$f(\R)$是一个可数的区间。包含两个点$u < v$的区间包含整个$[u, v]$，而$[u, v]$不可数（[[real-analysis/real-numbers#thm-r-uncountable]]）；所以$f(\R)$是单点集，$f$是常数，设$f \equiv k$。但这样一来，$k = f(0)$是无理数（因为$0 \in \Q$），而$k = f(\sqrt2)$是有理数，这是不可能的。
:::
:::
