如果你恰好用一小时开了100 km，那么在旅途中的某个时刻，你的速度表一定恰好显示100 km/h。你不可能全程都开得比100 km/h慢（否则就到不了），也不可能全程都开得比它快；又因为你的速度是连续变化的，所以在某个时刻它恰好等于平均速度。这就是**中值定理**；它看似平淡无奇，却是微分学中最重要的理论结果。

导数是一个**局部**的量：$f'(a)$只依赖于$f$在任意接近$a$处的取值。而我们想回答的大多数问题是**整体**的：$f$在某个区间上是否递增？$f(b) - f(a)$能有多大？导数为零的函数是否为常数？中值定理正是从局部信息通向整体结论的桥梁。本章从费马（Fermat）关于最大值的观察和罗尔（Rolle）定理出发证明中值定理，推导它的主要推论，并利用它的一个推广来证明求未定式极限的洛必达（L'Hôpital）法则。

## 局部极值与费马定理

::: definition 局部极值与全局极值 {#def-local-extremum}
设$f$定义在集合$D$上，$c\in D$。若对所有$x\in D$都有$f(x)\le f(c)$，则称$f$在$c$处取得$D$上的**全局**（或**绝对**）**最大值**；若对某个包含$c$的开区间中的所有$x\in D$都有$f(x)\le f(c)$，则称$f$在$c$处取得**局部极大值**。全局**最小值**和局部**极小值**的定义与此类似，只需把不等式改为$f(x)\ge f(c)$。最大值或最小值统称为**极值**。
:::

每个全局极值都是局部极值，反之则不然：函数$x^3 - 3x$在$x = -1$处取得局部极大值，但当$x > 2$时它取更大的值。在一座光滑山丘的顶部，切线是水平的，这就是关键的观察。

::: theorem 关于极值的费马定理 {#thm-fermat}
设$f$在$c$处取得局部极值，$f$在某个包含$c$的开区间上有定义，且$f$在$c$处可导。则$f'(c) = 0$。
:::

::: proof
设$f$在$c$处取得局部极大值（对于最小值，把论证用于$-f$即可）。则存在$\delta > 0$，使得只要$\abs{h} < \delta$，就有$f(c+h) \le f(c)$。对$0 < h < \delta$，差商满足

$$
\frac{f(c+h) - f(c)}{h} \le 0,
$$

因为分子$\le 0$而分母为正。极限保持非严格不等式（[[calculus-1/limits#thm-order]]；同样的证明也适用于单侧极限），所以差商的右极限（它等于$f'(c)$）$\le 0$。对$-\delta < h < 0$，分子仍然$\le 0$，但分母为负，所以差商$\ge 0$，取左极限得$f'(c)\ge0$。因此$f'(c) = 0$。
:::

::: warning f′(c) = 0 并不意味着极值，极值点处也未必有 f′(c) = 0
费马定理的逆命题不成立：$f(x) = x^3$满足$f'(0) = 0$，但在$0$处没有极值——它在经过$0$时是递增的。而且该定理的假设不可缺少：$\abs{x}$在$0$处取得最小值，但在那里不可导；在$[0,1]$上，函数$f(x) = x$在端点$1$处取得最大值，而$f'(1) = 1$。费马定理只是说：可导函数的内部极值点都在$f'$的零点之中，仅此而已。
:::

## 罗尔定理与中值定理

把费马定理与最值定理结合起来，就得到我们的第一个整体性结果。

::: theorem 罗尔定理 {#thm-rolle}
设$f$在$[a,b]$上连续，在$(a,b)$内可导，且$f(a) = f(b)$。则存在$c\in(a,b)$，使得$f'(c) = 0$。
:::

::: proof
由最值定理（[[calculus-1/continuity#thm-evt]]），$f$在$[a,b]$上取得最大值$M$和最小值$m$。若二者都只在端点处取得，则由于$f(a) = f(b)$，有$M = m = f(a)$；于是$f$为常数，对每个$c\in(a,b)$都有$f'(c) = 0$。否则，其中之一在某个内点$c\in(a,b)$处取得。$f$在那里取得局部极值并且可导，所以由[[#thm-fermat]]，$f'(c) = 0$。
:::

中值定理就是把罗尔定理倾斜一个角度来看。

::: theorem 中值定理 {#thm-mvt}
设$f$在$[a,b]$上连续，在$(a,b)$内可导。则存在$c\in(a,b)$，使得

$$
f'(c) = \frac{f(b) - f(a)}{b - a}, \qquad\text{等价地}\qquad f(b) - f(a) = f'(c)(b-a).
$$ {#eq-mvt}
:::

::: proof
设$s(x) = f(a) + \dfrac{f(b) - f(a)}{b-a}(x - a)$是过$(a, f(a))$和$(b, f(b))$的割线，$g(x) = f(x) - s(x)$是从割线到图像的竖直距离。则$g$在$[a,b]$上连续，在$(a,b)$内可导，且$g(a) = 0 = g(b)$。由[[#thm-rolle]]，存在$c\in(a,b)$，使得$0 = g'(c) = f'(c) - \dfrac{f(b) - f(a)}{b-a}$。
:::

从几何上看：在$a$与$b$之间的某处，切线与割线平行。从物理上看：在某个时刻，瞬时速度等于平均速度。这个定理并没有说$c$在**哪里**，而且这样的点可能不止一个；它的威力在于这样的$c$一定存在。

::: widget plot
f: x^3 - 3x + 1; x + 1
x: -2.5, 2.5
y: -4, 5
points: -2, -1; 2, 3
tangent: 0
labels: f(x) = x^3 - 3x + 1; \text{割线}
caption: 过两个小圆点$(-2,-1)$和$(2,3)$的固定直线是割线，斜率为$1$；另一条直线是大圆点处的切线。拖动圆点，直到切线与割线平行。这样的点有两个，即$c = \pm 2/\sqrt3 \approx \pm1.155$，在那里$f'(c) = 3c^2 - 3 = 1$。中值定理保证至少有一个这样的点，但并不说明它在哪里。
:::

::: example 求中值点 {#ex-mvt-point}
对$[0, 4]$上的$f(x) = \sqrt{x}$验证中值定理。
::: solution
$f$在$[0,4]$上连续，在$(0,4)$内可导，且$f'(x) = \frac{1}{2\sqrt x}$。（它在$0$处**不**可导，但定理只要求在开区间内可导。）割线斜率为$\frac{\sqrt4 - \sqrt0}{4 - 0} = \frac12$。解$\frac{1}{2\sqrt c} = \frac12$得$\sqrt{c} = 1$，所以$c = 1\in(0,4)$。
:::
:::

::: warning 假设条件不能去掉
在$[-1,1]$上，函数$\abs{x}$在两个端点处的值相等，但它的导数在存在之处都等于$\pm1$：罗尔定理之所以不成立，是因为$\abs{x}$在$0$处不可导。在$[0,1)$上等于$x$、且$f(1) = 0$的函数在$(0,1)$内可导，并且$f(0) = f(1)$，但同样处处有$f'(c) = 1\neq0$：这一次不成立的是在端点处的连续性。
:::

::: quiz
一辆汽车正午时位于$0$千米处，下午2点时位于$150$千米处。假设它的位置是时间的可导函数，下列哪些说法**一定**正确？（选出所有正确选项。）
- [x] 在正午到下午2点之间的某个时刻，它的速率恰好是$75$ km/h。
- [ ] 在某个时刻，它的速率恰好是$100$ km/h。
- [x] 它的平均速度是$75$ km/h。
- [ ] 下午1点时，它的速率是$75$ km/h。
::: solution
平均速度（位移除以时间）为$150/2 = 75$ km/h，由中值定理，在某个时刻瞬时速度等于它，因此那时的速率也是$75$ km/h。（平均**速率**可能更大：如果汽车开过了$150$千米处又折返回来。）没有任何理由迫使速率一定会达到$100$ km/h（汽车可能始终以$75$的速率匀速行驶），也没有任何结论说明速率**何时**为$75$。
:::
:::

## 中值定理的推论

第一个推论回答了一个听起来显而易见、却需要证明的问题：如果一个函数的导数处处为零，那么这个函数是常数吗？

::: corollary 导数为零则函数为常数 {#cor-zero-derivative}
设$f$在区间$I$上连续，且在$I$的每个内点$x$处$f'(x) = 0$。则$f$在$I$上为常数。
:::

::: proof
设$x_1 < x_2$是$I$中的点。[[#thm-mvt]]的假设在$[x_1, x_2]$上成立，所以存在$c\in(x_1,x_2)$，使得$f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$。这个$c$是$I$的内点，所以$f'(c) = 0$，从而$f(x_2) = f(x_1)$。由于$x_1, x_2$是任意的，$f$为常数。
:::

::: corollary 导数相同的函数 {#cor-same-derivative}
若$f$和$g$在区间$I$上连续，且在$I$的每个内点处$f'(x) = g'(x)$，则$f - g$在$I$上为常数：存在常数$C$，使得对所有$x \in I$有$f(x) = g(x) + C$。
:::

::: proof
对$f - g$应用[[#cor-zero-derivative]]即可，它的导数为$f' - g' = 0$。
:::

这是积分理论的基础：一旦知道了一个函数的某个原函数，那么在一个区间上，其余所有原函数都与它只相差一个常数（[[calculus-1/integrals]]）。“区间”这个词很重要。当$x<0$时等于$0$、当$x>0$时等于$1$的函数，在其定义域$\R\setminus\set{0}$上导数为零，却不是常数。

::: theorem 单调性判别法 {#thm-monotonicity}
设$f$在区间$I$上连续，且在$I$的每个内点处可导。

1. 若在每个内点处$f'(x) > 0$，则$f$在$I$上严格递增。
2. 若在每个内点处$f'(x) \ge 0$，则$f$在$I$上递增。
3. 若在每个内点处$f'(x) < 0$（相应地，$\le 0$），则$f$在$I$上严格递减（相应地，递减）。
:::

::: proof
设$I$中的$x_1 < x_2$。由中值定理，存在某个内点$c$，使得$f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$。由于$x_2 - x_1 > 0$，差$f(x_2) - f(x_1)$与$f'(c)$同号：在情形1中为正，在情形2中非负，在情形3中为负或非正。
:::

部分逆命题很容易证明：若$f$递增且可导，则它所有的差商都$\ge 0$，所以$f'\ge0$。但严格递增的函数可以在孤立点处有$f'(c) = 0$，例如$x^3$在$0$处就是如此。

::: quiz
设$f$在$\R\setminus\set{0}$上可导，且对每个$x\neq0$有$f'(x) < 0$。下列哪些说法一定正确？（选出所有正确选项。）
- [x] $f$在$(0,\infty)$上严格递减。
- [x] $f$在$(-\infty, 0)$上严格递减。
- [ ] $f(-1) > f(1)$。
- [ ] $f$在$\R\setminus\set{0}$上严格递减。
::: solution
[[#thm-monotonicity]]可以分别应用于区间$(0,\infty)$和$(-\infty,0)$。但它没有告诉我们如何比较一个区间中的点与另一个区间中的点：$f(x) = 1/x$满足$f'(x) = -1/x^2<0$，然而$f(-1) = -1 < 1 = f(1)$。由于$\R\setminus\set{0}$不是区间，该定理不适用于它。
:::
:::

::: example 证明不等式 {#ex-inequalities}
证明：对所有实数$x$有$e^x \ge 1 + x$，且仅在$x = 0$时等号成立；并由此推出对所有$x > -1$有$\ln(1 + x) \le x$。
::: solution
令$g(x) = e^x - 1 - x$，则$g'(x) = e^x - 1$。当$x<0$时它为负，当$x > 0$时它为正。由[[#thm-monotonicity]]，$g$在$(-\infty, 0]$上严格递减，在$[0,\infty)$上严格递增。因此对每个$x\neq0$有$g(x) > g(0) = 0$，即当$x\neq0$时$e^x > 1 + x$。

当$x > -1$时，$1 + x$和$e^x$都是正的，而$\ln$是递增的，所以对$1 + x\le e^x$两边取$\ln$，得$\ln(1+x)\le x$。
:::
:::

::: widget plot
f: exp(x); 1 + x; ln(1 + x); x
x: -2, 3
y: -3, 4
labels: e^x; 1 + x; \ln(1+x); x
caption: 直线$y = 1 + x$是$e^x$在$0$处的切线，$e^x$的图像处处位于它的上方。把两者关于$y = x$作对称再平移，就得到与之相伴的不等式：$\ln(1+x)$位于它的切线$y = x$的下方。将鼠标悬停在图上比较函数值：在$0$附近，两处的差距都约为$x^2/2$，离$0$越远，差距越大。
:::

::: example 恰有一个根 {#ex-one-root}
证明：方程$x^5 + 2x - 1 = 0$恰有一个实数解。
::: solution
令$p(x) = x^5 + 2x - 1$。**存在性：**$p(0) = -1 < 0$，$p(1) = 2>0$，所以由介值定理（[[calculus-1/continuity#cor-bolzano]]），在$(0,1)$内有一个根。**唯一性：**对所有$x$有$p'(x) = 5x^4 + 2 > 0$，所以由[[#thm-monotonicity]]，$p$在$\R$上严格递增，从而是单射，至多取值$0$一次。

（另一种证法：若$p$有两个根$r_1<r_2$，则由罗尔定理，存在$c \in(r_1,r_2)$使$p'(c) = 0$，而这是不可能的。）注意，我们证明了恰有一个根（它是$0.48638\ldots$），却无法把它写出来——而且对这个多项式而言，根本不存在用根式表示的求根公式，这是伽罗瓦理论的一个推论（[[abstract-algebra/fields-galois]]）。
:::
:::

中值定理还能给出定量的估计。若在某个区间上$\abs{f'(x)}\le M$，则对该区间中的任意两点，有

$$
\abs{f(x) - f(y)} \le M\abs{x - y}.
$$ {#eq-lipschitz}

例如$\abs{\sin x - \sin y} = \abs{\cos c}\,\abs{x - y}\le\abs{x-y}$——这正是[[calculus-1/continuity#prop-trig-continuous]]中正弦函数连续性背后的不等式。

::: example 估计平方根 {#ex-sqrt-estimate}
用中值定理证明$10.0497 < \sqrt{101} < 10.05$。
::: solution
对$[100, 101]$上的$f(x) = \sqrt{x}$应用[[#thm-mvt]]：存在某个$c\in(100,101)$，使得

$$
\sqrt{101} - 10 = \frac{1}{2\sqrt{c}}\,(101 - 100) = \frac{1}{2\sqrt{c}}.
$$

由于$\sqrt{c} > 10$，上式小于$\frac{1}{20}$，所以$\sqrt{101} < 10.05$。再把这个结果代回去：$\sqrt{c} < \sqrt{101} < 10.05$，所以$\frac{1}{2\sqrt c} > \frac{1}{20.1} > 0.04975$，从而$\sqrt{101} > 10.0497$。（真实值为$10.04987\ldots$。）
:::
:::

::: example 指数增长是唯一的解 {#ex-exp-unique}
设$k$为常数，$f$在$\R$上可导，且对所有$x$有$f'(x) = kf(x)$。证明$f(x) = f(0)e^{kx}$。
::: solution
考虑$g(x) = f(x)e^{-kx}$。由乘积法则和链式法则，

$$
g'(x) = f'(x)e^{-kx} - kf(x)e^{-kx} = \bigl(f'(x) - kf(x)\bigr)e^{-kx} = 0.
$$

由[[#cor-zero-derivative]]，$g$为常数，等于$g(0) = f(0)$。因此$f(x) = f(0)e^{kx}$。这就是为什么任何以与自身大小成正比的速率增长或衰减的量——细菌培养物、放射性样品、按连续复利计息的存款——都遵循指数规律。
:::
:::

## 柯西中值定理与洛必达法则

中值定理的一个涉及两个函数的推广，引出了一种求未定式极限的有力方法。

::: theorem 柯西中值定理 {#thm-cauchy-mvt}
设$f$和$g$在$[a,b]$上连续，在$(a,b)$内可导。则存在$c\in(a,b)$，使得

$$
\bigl(f(b) - f(a)\bigr)\,g'(c) = \bigl(g(b) - g(a)\bigr)\,f'(c).
$$
:::

::: proof
令$h(x) = \bigl(f(b) - f(a)\bigr)g(x) - \bigl(g(b) - g(a)\bigr)f(x)$。则$h$在$[a,b]$上连续，在$(a,b)$内可导，直接计算得$h(a) = f(b)g(a) - g(b)f(a) = h(b)$。由罗尔定理，存在$c\in(a,b)$使$h'(c) = 0$，这正是要证的等式。
:::

取$g(x) = x$，它就是通常的中值定理。若$g'$不为零，该等式可以写成$\dfrac{f(b) - f(a)}{g(b) - g(a)} = \dfrac{f'(c)}{g'(c)}$；从几何上看，点$(g(t), f(t))$描出的曲线有一条切线平行于连接其两个端点的弦。

::: theorem 洛必达法则 {#thm-lhopital}
设$f$和$g$在包含$a$的开区间$I$上可导（$a$本身可能除外），且对$x\in I$，$x \neq a$有$g'(x)\neq0$。假设

- 或者$\lim_{x\to a}f(x) = 0$且$\lim_{x\to a}g(x) = 0$（$\frac00$型），
- 或者$\lim_{x\to a}g(x) = \infty$或$-\infty$（其中包括$\frac\infty\infty$型）。

若$\displaystyle\lim_{x\to a}\frac{f'(x)}{g'(x)} = L$，其中$L$是实数、$\infty$或$-\infty$，则$\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)} = L$。对单侧极限以及$x\to\infty$或$x\to-\infty$时的极限，同样的结论也成立。
:::

::: proof
我们对$L$为实数、$x\to a^+$的情形证明$\frac00$型；左极限的情形类似，两者合起来就给出双侧极限。重新定义$f(a) = g(a) = 0$；这不影响$x\to a$时的任何极限，并使$f$和$g$对$I$中每个$x > a$都在$[a, x]$上连续。

首先，对$I$中的$x>a$，有$g(x)\neq0$：否则在$[a, x]$上应用罗尔定理，会得到$g'$在$(a,x)$内的一个零点。现在固定这样一个$x$。在$[a, x]$上应用[[#thm-cauchy-mvt]]，存在$c_x\in(a,x)$，使得$f(x)g'(c_x) = g(x)f'(c_x)$，即

$$
\frac{f(x)}{g(x)} = \frac{f'(c_x)}{g'(c_x)}.
$$

设$\eps > 0$，取$\delta>0$，使得只要$a < t < a + \delta$，就有$\abs{f'(t)/g'(t) - L} < \eps$。若$a < x < a + \delta$，则$c_x$也位于$(a, a + \delta)$中，所以$\abs{f(x)/g(x) - L} < \eps$。因此当$x\to a^+$时$f(x)/g(x)\to L$。（若$L = \pm\infty$，把“与$L$的距离小于$\eps$”换成“越过$\pm M$”即可。）

对于$x\to\infty$，对很小的$t>0$令$F(t) = f(1/t)$，$G(t) = g(1/t)$。由链式法则，当$t\to0^+$时$\dfrac{F'(t)}{G'(t)} = \dfrac{-t^{-2}f'(1/t)}{-t^{-2}g'(1/t)} = \dfrac{f'(1/t)}{g'(1/t)}\to L$，所以由已证的情形得$F(t)/G(t)\to L$，这正是所要证的。$g\to\pm\infty$的情形需要用同样的工具作更精细的论证；见[[real-analysis/differentiation]]。
:::

当$f'/g'$仍是$\frac00$型时，可以反复应用这一法则。在逻辑上，论证是倒过来进行的：最后的极限一旦求出，就保证了前面每一步的正确性。

::: example 反复应用洛必达法则 {#ex-lhopital}
求 (a) $\displaystyle\lim_{x\to0}\frac{\sin x - x}{x^3}$；(b) $\displaystyle\lim_{x\to\infty}\frac{x^2}{e^x}$。
::: solution
(a) 分子和分母都趋于$0$。分别对它们求导，

$$
\lim_{x\to0}\frac{\sin x - x}{x^3} \overset{?}{=} \lim_{x\to0}\frac{\cos x - 1}{3x^2} \overset{?}{=} \lim_{x\to0}\frac{-\sin x}{6x} = -\frac16 .
$$

中间的极限仍是$\frac00$型；由[[calculus-1/limits#thm-sinx]]，最后一个极限存在。从右往左读，洛必达法则保证了每一个“$\overset{?}{=}$”都成立（当$x\neq0$时，导数$6x$和$3x^2$都不为零）。所以该极限为$-\frac16$，这表明当$x$很小时$\sin x\approx x - x^3/6$——这正是正弦函数泰勒级数的开头（[[calculus-2/taylor-series]]）。

(b) 这是$\frac\infty\infty$型。应用两次洛必达法则，

$$
\lim_{x\to\infty}\frac{x^2}{e^x} = \lim_{x\to\infty}\frac{2x}{e^x} = \lim_{x\to\infty}\frac{2}{e^x} = 0.
$$

由数学归纳法，对每个$n$都有$x^n/e^x\to0$：指数函数最终会压倒任何幂函数。类似地，对每个$p > 0$有$\dfrac{\ln x}{x^p} \to 0$，因为$\dfrac{1/x}{px^{p-1}} = \dfrac{1}{px^p}\to0$：任何幂函数都会压倒对数函数。
:::
:::

::: widget plot
f: (exp(x) - 1 - x)/x^2; (exp(x) - 1)/(2x); exp(x)/2
x: -2, 2
y: 0, 1.6
hlines: 0.5
labels: \frac{e^x - 1 - x}{x^2}; \frac{e^x - 1}{2x}; \frac{e^x}{2}
caption: 取$f(x) = e^x - 1 - x$，$g(x) = x^2$，三条曲线分别是$f/g$、$f'/g'$和$f''/g''$。前两个函数在$0$处没有定义，但三者在那里都趋于同一个值$\frac12$——这正是洛必达法则的内容。在远离$0$处，这三个函数相差很大：洛必达法则对函数值没有任何断言，它只涉及极限。
:::

### 其他未定式

乘积、差和幂往往可以改写成商。

- **$0\cdot\infty$：**写成$fg = \dfrac{f}{1/g}$或$\dfrac{g}{1/f}$。
- **$\infty - \infty$：**通分合并成一个分式，或者提取公因式。
- **$0^0$、$1^\infty$、$\infty^0$：**取对数。若$y = f(x)^{g(x)}$，则$\ln y = g(x)\ln f(x)$是$0\cdot\infty$型；若$\ln y\to\ell$，则由指数函数的连续性，$y = e^{\ln y}\to e^\ell$。

::: example 乘积与幂 {#ex-indeterminate}
求 (a) $\displaystyle\lim_{x\to0^+}x\ln x$；(b) $\displaystyle\lim_{x\to0^+}x^x$；(c) $\displaystyle\lim_{x\to\infty}\Bigl(1 + \frac1x\Bigr)^x$。
::: solution
(a) 这是$0\cdot(-\infty)$型。把它改写成$\frac{-\infty}{\infty}$型的商：

$$
\lim_{x\to0^+}x\ln x = \lim_{x\to0^+}\frac{\ln x}{1/x} = \lim_{x\to0^+}\frac{1/x}{-1/x^2} = \lim_{x\to0^+}(-x) = 0.
$$

(b) 这是$0^0$型。由于$x^x = e^{x\ln x}$，且由(a)知$x\ln x\to0$，由$\exp$的连续性得$x^x\to e^0 = 1$。

(c) 这是$1^\infty$型。取对数得$x\ln\bigl(1 + \frac1x\bigr) = \dfrac{\ln(1 + 1/x)}{1/x}$，当$x\to\infty$时为$\frac00$型。由洛必达法则，

$$
\lim_{x\to\infty}\frac{\ln(1 + 1/x)}{1/x} = \lim_{x\to\infty}\frac{\frac{1}{1 + 1/x}\cdot\bigl(-\frac{1}{x^2}\bigr)}{-\frac{1}{x^2}} = \lim_{x\to\infty}\frac{1}{1 + 1/x} = 1,
$$

所以$\bigl(1 + \frac1x\bigr)^x\to e^1 = e$。这就是复利的极限：1英镑按$100\%$的年利率计息，每年复利$x$次，将增长为$\bigl(1 + \frac1x\bigr)^x$英镑；当复利变为连续复利时，它趋于$e\approx2.718$英镑。
:::
:::

::: warning 应用洛必达法则之前先检查类型
该法则只适用于未定式。对于$\lim_{x\to0}\frac{\cos x}{x + 1}$，直接代入得$\frac11 = 1$；如果仍然“应用洛必达法则”，就会得到$\lim\frac{-\sin x}{1} = 0$，这是错误的。另有两个陷阱：要对分子和分母**分别**求导（而不是使用商法则）；并且要记住，这一法则只在一个方向上成立——如果$\lim f'/g'$不存在，那么什么结论也得不出。例如，当$x\to\infty$时$\frac{x + \sin x}{x}\to1$，尽管$\frac{1 + \cos x}{1}$没有极限。
:::

::: quiz
$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}$等于多少？
- [ ] $0$
- [x] $\tfrac12$
- [ ] $1$
- [ ] 不存在
::: solution
分子和分母都趋于$0$。应用一次洛必达法则得$\lim\frac{\sin x}{2x}$，仍是$\frac00$型；再应用一次得$\lim\frac{\cos x}{2} = \frac12$。（这与[[calculus-1/limits]]一章中乘以共轭式的方法所得的结果一致。）答案$0$来自只做一步就停下，并错误地对$\frac{\sin x}{2x}$进行“代入”。
:::
:::

::: history
中值定理源于代数。1691年，米歇尔·罗尔（Michel Rolle）——他后来成了新兴微积分的激烈批评者——用纯代数的方法证明了：在多项式的两个根之间，存在我们今天称为该多项式导数的那个多项式的一个根。约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在他的《解析函数论》（*Théorie des fonctions analytiques*，1797）中叙述了一般的中值定理；奥古斯丁-路易·柯西（Augustin-Louis Cauchy）于1823年在假定导数连续的条件下证明了它，并且还发现了涉及两个函数的推广形式；这里给出的借助罗尔定理的简短证明，通常归功于奥西安·博内（Ossian Bonnet），它出现在约瑟夫·塞雷（Joseph Serret）1868年的教科书中。洛必达法则的历史则更富传奇色彩。法国侯爵纪尧姆·德·洛必达（Guillaume de l'Hôpital）付钱给年轻的约翰·伯努利（Johann Bernoulli），换取他的授课以及使用其发现的权利。伯努利在1694年的一封信中把这一法则告诉了他，后来它以洛必达的名义出现在洛必达的《无穷小分析》（*Analyse des infiniment petits*，1696）中——这是第一本微分学教科书。
:::

## 后续内容

中值定理几乎在此后的每一个论证中都会用到，而且常常是不加声明地使用。在[[calculus-1/curve-sketching]]一章中，单调性判别法成为分析函数图像和求最大值的主要工具。在[[calculus-1/integrals]]一章中，中值定理是证明微积分基本定理的关键一步，而[[#cor-same-derivative]]解释了为什么原函数在相差一个常数的意义下是唯一的。泰勒定理（[[calculus-2/taylor-series]]）是一个高阶的中值定理，它控制着多项式近似的误差；在[[numerical-analysis/root-finding]]一章中，它解释了牛顿法为什么收敛得如此之快。并非每一种推广都依然成立：当$t$取遍$[0, 2\pi]$时，点$(\cos t, \sin t)$沿单位圆绕行一周，所以它的平均速度为零，然而它的速度$(-\sin t, \cos t)$从不为零。对于平面曲线（[[multivariable/vector-functions]]）以及像$e^{it}$这样的复值函数，保留下来的只有一个不等式。

::: summary
- 费马定理：可导函数在内部的局部极值点处有$f'(c) = 0$。其逆命题不成立（$x^3$在$0$处）。
- 罗尔定理：若$f$在$[a,b]$上连续，在$(a,b)$内可导，且$f(a) = f(b)$，则存在$c\in(a,b)$使$f'(c) = 0$。
- 中值定理：在去掉$f(a) = f(b)$后的相同假设下，存在$c\in(a,b)$使$f(b) - f(a) = f'(c)(b-a)$。
- 在区间上：$f' = 0$蕴涵$f$为常数；$f' = g'$蕴涵$f - g$为常数；$f'>0$蕴涵$f$严格递增。在不是区间的集合上，这些结论都不成立。
- 中值定理把导数的界转化为不等式和估计，例如$e^x\ge1+x$和$\abs{f(x)-f(y)}\le M\abs{x-y}$。
- 洛必达法则：对于$\frac00$型或$\frac{\cdot}{\pm\infty}$型，只要等式右边的极限存在，就有$\lim\frac fg = \lim\frac{f'}{g'}$。其他类型先改写成商，幂的情形要借助对数。
:::

## 习题

::: exercise 抛物线的中值点 {level=1 check="2"}
对$[1, 3]$上的$f(x) = x^2$，求中值定理所保证的数$c$。
::: solution
割线斜率为$\frac{9 - 1}{3 - 1} = 4$，由$f'(c) = 2c = 4$得$c = 2$。（对抛物线而言，$c$总是区间的中点。）
:::
:::

::: exercise 未定式型的商 {level=1 check="9/2"}
求$\displaystyle\lim_{x\to0}\frac{1-\cos 3x}{x^2}$。
::: solution
这是$\frac00$型。两次应用洛必达法则，

$$
\lim_{x\to0}\frac{1-\cos3x}{x^2} = \lim_{x\to0}\frac{3\sin3x}{2x} = \lim_{x\to0}\frac{9\cos 3x}{2} = \frac92.
$$
:::
:::

::: exercise 由导数还原函数 {level=1 check="8"}
设$f$在$\R$上可导，对所有$x$有$f'(x) = 2x$，且$f(1) = 5$。求$f(2)$。
::: solution
函数$x^2$与$f$有相同的导数，所以由[[#cor-same-derivative]]，存在常数$C$使$f(x) = x^2 + C$。由$f(1) = 1 + C = 5$得$C = 4$，所以$f(x) = x^2 + 4$，$f(2) = 8$。
:::
:::

::: exercise 恰有一个解 {level=2}
证明方程$2x - 1 = \sin x$恰有一个实数解。
::: solution
令$g(x) = 2x - 1 - \sin x$。则$g(0) = -1 < 0$，$g(\pi) = 2\pi - 1 > 0$，所以由介值定理，$g$在$(0,\pi)$内有一个根。此外，对所有$x$有$g'(x) = 2 - \cos x\ge1 > 0$，所以$g$在$\R$上严格递增（[[#thm-monotonicity]]），至多有一个根。因此方程恰有一个解（$x\approx0.8879$）。
:::
:::

::: exercise 极限为 e³ 的幂 {level=2 check="e^3"}
求$\displaystyle\lim_{x\to\infty}\Bigl(1 + \frac{3}{x}\Bigr)^x$。
::: solution
取对数得$x\ln(1 + 3/x) = \dfrac{\ln(1 + 3/x)}{1/x}$，这是$\frac00$型。由洛必达法则，

$$
\lim_{x\to\infty}\frac{\frac{1}{1+3/x}\cdot\bigl(-\frac{3}{x^2}\bigr)}{-\frac{1}{x^2}} = \lim_{x\to\infty}\frac{3}{1 + 3/x} = 3,
$$

所以该极限为$e^3$。
:::
:::

::: exercise 两个有用的不等式 {level=2}
证明：对所有$x > 0$有$\sin x < x$；对所有实数$a, b$有$\abs{\arctan a - \arctan b}\le\abs{a - b}$。
::: solution
令$g(x) = x - \sin x$。则$g'(x) = 1 - \cos x\ge0$，且等号仅在孤立点$x = 2k\pi$处成立。在每个区间$[2k\pi, 2(k+1)\pi]$的内部有$g'>0$，所以由[[#thm-monotonicity]]，$g$在该区间上严格递增；因此$g$在$[0,\infty)$上严格递增，当$x>0$时$g(x) > g(0) = 0$。

对于第二个不等式，$\frac{d}{dx}\arctan x = \frac{1}{1+x^2}$，其绝对值至多为$1$。由中值定理，存在介于$a$与$b$之间的某个$c$，使得$\arctan a - \arctan b = \frac{1}{1+c^2}(a - b)$，所以$\abs{\arctan a - \arctan b} \le\abs{a-b}$。（若$a = b$，则无需证明。）
:::
:::

::: exercise 0⁰ 型极限 {level=2 check="1"}
求$\displaystyle\lim_{x\to0^+}x^{\sin x}$。
::: hint
写成$\sin x\ln x = \dfrac{\sin x}{x}\cdot x\ln x$。
:::
::: solution
我们有$x^{\sin x} = e^{\sin x\ln x}$，并且

$$
\sin x\ln x = \frac{\sin x}{x}\cdot x\ln x \longrightarrow 1\cdot 0 = 0 \qquad (x\to0^+),
$$

这里用到了[[calculus-1/limits#thm-sinx]]和[[#ex-indeterminate]]。由指数函数的连续性，$x^{\sin x}\to e^0 = 1$。
:::
:::

::: exercise 伯努利不等式 {level=3}
设$r\ge1$。证明对每个$x > -1$有$(1+x)^r\ge1 + rx$。
::: solution
在$(-1,\infty)$上令$g(x) = (1+x)^r - 1 - rx$。由[[calculus-1/chain-rule#thm-real-power]]和链式法则，

$$
g'(x) = r(1+x)^{r-1} - r = r\bigl((1+x)^{r-1} - 1\bigr).
$$

由于$r - 1\ge0$，函数$t\mapsto t^{r-1}$在$(0,\infty)$上递增，且在$t = 1$处等于$1$。所以当$x \ge 0$时，$(1+x)^{r-1}\ge1$，$g'(x)\ge0$；而当$-1<x\le0$时，$(1+x)^{r-1}\le1$，$g'(x)\le0$。由[[#thm-monotonicity]]，$g$在$[0,\infty)$上递增，在$(-1, 0]$上递减。因此对所有$x > -1$有$g(x)\ge g(0) = 0$，这就是所要证的不等式。
:::
:::

::: exercise 两次应用罗尔定理 {level=3}
设$f$在$\R$上二阶可导，且$f(0) = f(1) = f(2) = 0$。证明存在$c\in(0,2)$使$f''(c) = 0$。
::: solution
在$[0,1]$和$[1,2]$上分别应用罗尔定理，得到$c_1\in(0,1)$和$c_2\in(1,2)$，使$f'(c_1) = 0 = f'(c_2)$。由于$f$二阶可导，函数$f'$在$\R$上可导，从而连续，所以可以在$[c_1, c_2]$上对$f'$应用罗尔定理：存在$c\in(c_1, c_2)\subseteq(0,2)$使$f''(c) = 0$。更一般地，若$n$阶可导的函数$f$有$n+1$个零点，则$f^{(n)}$在其中最小者与最大者之间有一个零点。
:::
:::

::: exercise 导数为正还不够 {level=3}
当$x\neq0$时令$f(x) = x + 2x^2\sin(1/x)$，并令$f(0) = 0$。证明$f'(0) = 1$，但$f$在任何包含$0$的开区间上都不是递增的。
::: solution
在$0$处：$\dfrac{f(h) - f(0)}{h} = 1 + 2h\sin\dfrac1h\to1$，因为$\abs{2h\sin(1/h)}\le2\abs h$。所以$f'(0) = 1$。

当$x\neq0$时，$f'(x) = 1 + 4x\sin\dfrac1x - 2\cos\dfrac1x$。在点$x_n = \dfrac{1}{2n\pi}$处，$\sin(1/x_n) = 0$，$\cos(1/x_n) = 1$，所以$f'(x_n) = -1$。由于$f'$在$\R\setminus\set{0}$上连续，它在$x_n$附近的某个开区间$J_n$上保持为负（保号性），于是由[[#thm-monotonicity]]，$f$在$J_n$上严格递减。每个包含$0$的开区间，对所有充分大的$n$都包含$x_n$，从而包含一个（必要时缩小后的）小区间$J_n$，$f$在其上递减。所以尽管$f'(0) > 0$，$f$在任何包含$0$的开区间上都不是递增的。单调性判别法需要的是$f'$在整个区间上的符号，而不是在单独一点处的符号。
:::
:::
