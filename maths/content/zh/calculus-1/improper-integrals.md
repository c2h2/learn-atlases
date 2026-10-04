把质量为$m$的火箭从地球表面送到无穷远处需要做多少功？在距地心$r$处，引力的大小为$GMm/r^2$，所以由[[calculus-1/integral-applications#def-work]]，从距地心$R$的地面到达距地心$t$处所需的功为

$$
\int_R^t\frac{GMm}{r^2}\,dr = GMm\Bigl(\frac1R - \frac1t\Bigr).
$$

当$t\to\infty$时，它趋于一个**有限**值$GMm/R$：永远摆脱地球引力只需要有限的能量。令它等于动能$\frac12mv^2$，就得到**逃逸速度**$v = \sqrt{2GM/R}\approx11.2$ km/s。

[[calculus-1/integrals]]一章中的黎曼积分只对有界区间上的有界函数有定义，然而像这样的问题——以及[[calculus-1/integral-applications#ex-exponential-wait]]中等待时间的总概率或均值——需要在无穷区间上积分，或者对趋于无穷的函数积分。本章把这样的**反常积分**定义为普通积分的极限，计算一些基本例子，并建立无须任何计算就能判断收敛性的比较判别法。在此过程中，我们会遇到把阶乘推广到非整数的伽马函数，以及一个体积有限而表面积无穷大的号角。

## 无穷区间上的积分

::: definition 无穷区间上的反常积分 {#def-improper-infinite}
设对每个$t>a$，$f$在$[a, t]$上可积。若极限

$$
\int_a^\infty f(x)\,dx = \lim_{t\to\infty}\int_a^tf(x)\,dx
$$

存在（且为实数），则称该反常积分**收敛**于这个值；否则称它**发散**。积分$\int_{-\infty}^bf(x)\,dx = \lim_{t\to-\infty}\int_t^bf(x)\,dx$的定义与此相同。最后，

$$
\int_{-\infty}^\infty f(x)\,dx = \int_{-\infty}^cf(x)\,dx + \int_c^\infty f(x)\,dx,
$$

其中$c$是任意实数，这里要求右边的**两个**积分都收敛。
:::

由可加性，最后一部分中$c$的选取无关紧要。实际计算时，我们先求出一个原函数$G$，算出$\int_a^tf = G(t) - G(a)$，再取极限。

::: example 三个基本例子 {#ex-improper-basic}
计算(a)$\displaystyle\int_1^\infty\frac{dx}{x^2}$；(b)$\displaystyle\int_1^\infty\frac{dx}{x}$；(c)$\displaystyle\int_{-\infty}^\infty\frac{dx}{1+x^2}$。
::: solution
(a) 当$t\to\infty$时，$\displaystyle\int_1^t\frac{dx}{x^2} = \Bigl[-\frac1x\Bigr]_1^t = 1 - \frac1t\to1$。积分收敛于$1$：$1/x^2$下方这个无限长的区域，面积为$1$。

(b) $\displaystyle\int_1^t\frac{dx}{x} = \ln t\to\infty$，所以积分发散。虽然$1/x\to0$，但它减小得不够快。

(c) 在$0$处拆开。由于当$t\to\infty$时$\int_0^t\frac{dx}{1+x^2} = \arctan t\to\frac\pi2$，并且由对称性，当$t\to-\infty$时$\int_t^0\frac{dx}{1+x^2} = -\arctan t\to\frac\pi2$，两半都收敛，且

$$
\int_{-\infty}^\infty\frac{dx}{1+x^2} = \frac\pi2 + \frac\pi2 = \pi .
$$
:::
:::

例(a)和例(b)分别位于幂函数之间一条分界线的两侧。

::: theorem 无穷远处的 p 判别法 {#thm-p-infinity}
积分$\displaystyle\int_1^\infty\frac{dx}{x^p}$当$p>1$时收敛，其值为$\dfrac{1}{p-1}$；当$p\le1$时发散。
:::

::: proof
当$p = 1$时，这就是[[#ex-improper-basic]](b)。当$p\neq1$时，

$$
\int_1^t\frac{dx}{x^p} = \Bigl[\frac{x^{1-p}}{1-p}\Bigr]_1^t = \frac{t^{1-p} - 1}{1-p}.
$$

若$p>1$，则$1 - p<0$，$t^{1-p}\to0$，所以积分趋于$\frac{-1}{1-p} = \frac{1}{p-1}$。若$p<1$，则$t^{1-p}\to\infty$，积分发散。
:::

::: intuition 为什么 1/x 是分界线
把$[1,\infty)$切成长度逐次加倍的区间$[1,2], [2,4], [4,8], \dots$。对于$f(x) = \frac1x$，每一段贡献的面积都相同：$\int_{2^k}^{2^{k+1}}\frac{dx}{x} = \ln2$，因为区间长度加倍，而函数的高度减半。无穷多个相等的贡献加起来是无穷大。对于$\frac{1}{x^2}$，宽度加倍时高度降为原来的$4$分之一，所以各段的贡献$\frac12, \frac14, \frac18, \dots$每次减半，构成一个收敛的几何级数。任何$p>1$的幂$x^{-p}$都与第二种情形类似，而任何$p<1$的幂则像第一种情形的更糟的版本。
:::

::: widget plot
f: x^(-p); 1/x
sliders: p=1.5:0.3:2.5:0.05
x: 0, 20
y: 0, 1.5
shade: 1, 20
labels: x^{-p}; 1/x
caption: 阴影部分的面积为$\int_1^{20}x^{-p}\,dx = \frac{1 - 20^{1-p}}{p-1}$。设想把阴影的右端一直推向无穷远。当$p>1$时，面积始终小于$\frac{1}{p-1}$；当$p = 1$时（橙色曲线$1/x$），面积像$\ln t$一样无限增长。在远处，这些曲线看上去几乎一样——收敛与否取决于尾部衰减得**多快**，而不是它是否趋于$0$。
:::

::: quiz
$\displaystyle\int_1^\infty x^{-3/2}\,dx$等于什么？
- [ ] 发散
- [ ] $\tfrac23$
- [x] $2$
- [ ] $\tfrac12$
::: solution
由[[#thm-p-infinity]]，$p = \frac32>1$，积分收敛于$\frac{1}{p-1} = 2$。也可以直接计算：$\int_1^tx^{-3/2}\,dx = \bigl[-2x^{-1/2}\bigr]_1^t = 2 - \frac{2}{\sqrt t}\to2$。
:::
:::

::: warning 两端必须分别收敛
人们很容易想把$\int_{-\infty}^\infty f$定义为$\lim_{t\to\infty}\int_{-t}^tf$。那样就会得到$\int_{-\infty}^\infty x\,dx = 0$，因为对每个$t$都有$\int_{-t}^tx\,dx = 0$。但$\int_0^\infty x\,dx$发散，所以按照我们的定义，$\int_{-\infty}^\infty x\,dx$发散。这种对称的极限称为**柯西（Cauchy）主值**，在某些场合很有用，但它让两块无穷大的面积相互抵消，从而掩盖了发散；如果把截断点不对称地移动，它甚至会改变，因为$\int_{-t}^{2t}x\,dx = \frac32t^2\to\infty$。
:::

::: quiz
对每个$t>0$都有$\int_{-t}^tx^3\,dx = 0$。$\displaystyle\int_{-\infty}^\infty x^3\,dx$收敛吗？
- [ ] 收敛，其值为$0$，因为$x^3$是奇函数
- [x] 不收敛
- [ ] 收敛，其值为$\infty$
- [ ] 取决于在何处把积分拆开
::: solution
按照[[#def-improper-infinite]]，需要$\int_0^\infty x^3\,dx$和$\int_{-\infty}^0x^3\,dx$分别收敛，而$\int_0^tx^3\,dx = t^4/4\to\infty$。所以该积分发散，尽管它的主值为$0$。拆分点的选取从不影响收敛性。
:::
:::

## 无界函数的积分

第二类反常积分的积分区间是有限的，但被积函数在某一点处趋于无穷。

::: definition 无界函数的反常积分 {#def-improper-unbounded}
设对每个$t\in(a,b)$，$f$在$[t, b]$上可积，但在$a$附近无界。则令

$$
\int_a^bf(x)\,dx = \lim_{t\to a^+}\int_t^bf(x)\,dx,
$$

若这个极限存在，就称该积分**收敛**。右端点处的瑕点用$\lim_{t\to b^-}\int_a^t f$来处理。若$f$在某个内点$c$附近无界，则$\int_a^bf = \int_a^cf + \int_c^bf$，这里要求两者都收敛。
:::

如果$f$恰好在整个$[a,b]$上连续，那么这个极限就是普通的积分（由$t \mapsto \int_t^bf$的连续性），所以这些定义是相容的。

[[calculus-1/integration-techniques]]一章中的法则可以推广到反常积分：先在这些法则成立的有界区间$[a,t]$（或$[t,b]$）上应用它们，再取极限。例如，令$u = x^2$，

$$
\int_0^\infty xe^{-x^2}\,dx = \lim_{t\to\infty}\frac12\int_0^{t^2}e^{-u}\,du = \lim_{t\to\infty}\frac{1 - e^{-t^2}}{2} = \frac12,
$$

这与盲目地把积分限$0$和$\infty$换成$u = 0$和$u = \infty$所得的结果相同。当代换是单调的、且涉及的每个积分都收敛时，这样的捷径是安全的；如有疑问，就回到定义。分部积分需要格外小心，因为边界项$\bigl[uv\bigr]_a^t$本身必须有极限——下文伽马函数的计算中正是如此。

::: theorem 零点处的 p 判别法 {#thm-p-zero}
积分$\displaystyle\int_0^1\frac{dx}{x^p}$当$p<1$时收敛，其值为$\dfrac{1}{1-p}$；当$p\ge1$时发散。
:::

::: proof
当$p = 1$时，$\int_t^1\frac{dx}{x} = -\ln t\to\infty$（$t\to0^+$）。当$p\neq1$时，

$$
\int_t^1\frac{dx}{x^p} = \frac{1 - t^{1-p}}{1-p}.
$$

若$p<1$，则当$t\to0^+$时$t^{1-p}\to0$，极限为$\frac{1}{1-p}$；若$p>1$，则$t^{1-p}\to\infty$。
:::

两个$p$判别法的方向恰好相反：在无穷远附近，$1/x$的高次幂可积，因为它们衰减得快；在零附近，低次幂可积，因为它们趋于无穷的速度慢。只有$1/x$在两端都不可积。

::: example 对数函数与隐藏的瑕点 {#ex-improper-unbounded}
计算(a)$\displaystyle\int_0^1\ln x\,dx$；(b)$\displaystyle\int_0^3\frac{dx}{(x-1)^{2/3}}$。
::: solution
(a) 当$x\to0^+$时被积函数趋于$-\infty$。利用原函数$x\ln x - x$（[[calculus-1/integration-techniques#ex-parts]]），

$$
\int_t^1\ln x\,dx = (0 - 1) - (t\ln t - t) \longrightarrow -1 \qquad (t\to0^+),
$$

这是因为$t\ln t\to0$（[[calculus-1/mean-value-theorem#ex-indeterminate]]）。所以积分收敛于$-1$。

(b) 瑕点位于内点$x = 1$处，所以必须在那里拆开。$3(x-1)^{1/3}$是一个原函数，而且它是连续的，所以单侧极限很容易求：

$$
\int_0^1\frac{dx}{(x-1)^{2/3}} = \lim_{t\to1^-}\Bigl[3(x-1)^{1/3}\Bigr]_0^t = 0 - 3(-1) = 3, \qquad \int_1^3\frac{dx}{(x-1)^{2/3}} = 3\cdot2^{1/3} - 0.
$$

两者都收敛，所以积分等于$3 + 3\sqrt[3]{2}\approx6.78$。
:::
:::

::: warning 被积函数不必趋于零
$\int_a^\infty f$的收敛性关乎面积，而不关乎$f$的取值。即使$f(x)\to0$，积分仍可能发散（例如$\frac1x$）。不那么明显的是，即使$f(x)$**不**趋于$0$，非负连续函数的积分也可能收敛：设想一个函数，它除了在每个整数$n\ge2$处有一个以该整数为中心、高为$1$、宽为$\frac{2}{n^2}$的狭窄三角形尖峰之外都等于$0$。它的总面积为$\sum_{n\ge2}\frac{1}{n^2}<1$（[[#exr-integral-test]]），但对每个$n$都有$f(n) = 1$。基于被积函数大小的判别法比较的是面积，下一节就是这样做的。
:::

::: warning 注意区间内部的瑕点
在[[calculus-1/integrals]]一章中，我们见过错误的计算$\int_{-1}^1\frac{dx}{x^2} = \bigl[-\frac1x\bigr]_{-1}^1 = -2$。若正确地把它看作以$0$为瑕点的反常积分，它就要拆成$\int_{-1}^0\frac{dx}{x^2} + \int_0^1\frac{dx}{x^2}$，而由[[#thm-p-zero]]（取$p = 2$），第二部分发散。所以这个积分发散。在应用微积分基本定理之前，务必检查被积函数在整个区间上是否有界。
:::

## 比较判别法

我们常常只需要知道反常积分**是否**收敛，而原函数可能无法求出——$\int_0^\infty e^{-x^2}\,dx$是最著名的例子。对于非负的被积函数，可以通过与已知积分比较来判断收敛性。关键在于单调函数的一个性质，它依赖于实数的完备性。

::: lemma 单调函数的极限 {#lem-monotone-limit}
若$F$在$[a,\infty)$上递增且有上界，则$\lim_{t\to\infty}F(t)$存在，并且等于$F$的值的上确界。
:::

::: proof
由完备性，值集$\set{F(t) : t\ge a}$非空且有上界，因而有上确界$L$。设$\eps>0$。由于$L - \eps$不是上界，存在$t_0$使$F(t_0) > L - \eps$。对每个$t\ge t_0$，由单调性得$L - \eps < F(t_0)\le F(t)\le L$。因此对所有$t\ge t_0$都有$\abs{F(t) - L}<\eps$，这正是$\lim_{t\to\infty}F(t) = L$的定义（[[calculus-1/limits#def-limit-infinity]]）。
:::

::: theorem 比较判别法 {#thm-comparison}
设对每个$t>a$，$f$和$g$在$[a, t]$上可积，且对所有$x\ge a$有$0\le f(x)\le g(x)$。

1. 若$\int_a^\infty g(x)\,dx$收敛，则$\int_a^\infty f(x)\,dx$也收敛，且$\int_a^\infty f\le\int_a^\infty g$。
2. 若$\int_a^\infty f(x)\,dx$发散，则$\int_a^\infty g(x)\,dx$也发散。

对于无界函数的反常积分，类似的结论也成立。
:::

::: proof
令$F(t) = \int_a^tf$，$G(t) = \int_a^tg$。由于$f\ge0$，$F$是递增的：当$t'>t$时$F(t') - F(t) = \int_t^{t'}f\ge0$。由积分的比较性质，$F(t)\le G(t)$。若$\int_a^\infty g$收敛，那么由于$G$也是递增的，对所有$t$都有$G(t)\le\int_a^\infty g$；于是$F$递增且有上界，由[[#lem-monotone-limit]]，它收敛于一个不超过$\int_a^\infty g$的极限。结论2是结论1的逆否命题。
:::

例如，与$\int_1^\infty\frac{dx}{x^2}$比较可知$\int_1^\infty\frac{\abs{\sin x}}{x^2}\,dx$收敛；由于$2 + \cos x\ge1$，与$\int_1^\infty\frac{dx}{\sqrt x}$比较可知$\int_1^\infty\frac{2 + \cos x}{\sqrt x}\,dx$发散。不等式往往不容易精确地建立，但当$x$很大时，被积函数**表现得像**一个简单的幂函数；下面这种形式的判别法可以处理这种情况。

::: theorem 极限比较判别法 {#thm-limit-comparison}
设$f$和$g$在$[a,\infty)$上连续且为正，并设$\displaystyle\lim_{x\to\infty}\frac{f(x)}{g(x)} = L$，其中$0<L<\infty$。则$\int_a^\infty f$与$\int_a^\infty g$同时收敛或同时发散。
:::

::: proof
在极限的定义中取$\eps = L/2$，则存在$N\ge a$，使得对所有$x\ge N$都有$\frac L2<\frac{f(x)}{g(x)}<2L$，即$\frac L2g(x)<f(x)<2Lg(x)$。若$\int_N^\infty g$收敛，则$\int_N^\infty 2Lg$也收敛，从而由[[#thm-comparison]]，$\int_N^\infty f$收敛；若$\int_N^\infty f$收敛，则$\int_N^\infty\frac{2}{L}f\ge\int_N^\infty g$也收敛。$[a,N]$上的积分是连续函数的普通积分，所以在$[a,\infty)$上收敛等价于在$[N,\infty)$上收敛。
:::

::: example 比较判别 {#ex-comparison}
判断下列积分是否收敛：(a)$\displaystyle\int_0^\infty e^{-x^2}\,dx$；(b)$\displaystyle\int_1^\infty\frac{x+1}{\sqrt{x^4 + x}}\,dx$。
::: solution
(a) 被积函数在$[0,1]$上连续，所以只有尾部是要紧的。当$x\ge1$时$x^2\ge x$，所以$0<e^{-x^2}\le e^{-x}$，而$\int_1^\infty e^{-x}\,dx = e^{-1}$收敛。由[[#thm-comparison]]，$\int_0^\infty e^{-x^2}\,dx$收敛。它的值$\frac{\sqrt\pi}{2}$无法通过原函数求得；[[multivariable/multiple-integrals]]一章将借助极坐标，用一个漂亮的技巧算出它。

(b) 当$x$很大时，分子的表现像$x$，分母的表现像$\sqrt{x^4} = x^2$，所以被积函数的表现像$1/x$。准确地说，取$g(x) = 1/x$，

$$
\frac{f(x)}{g(x)} = \frac{x(x+1)}{\sqrt{x^4 + x}} = \frac{1 + 1/x}{\sqrt{1 + 1/x^3}}\longrightarrow1 .
$$

由于$\int_1^\infty\frac{dx}{x}$发散，由[[#thm-limit-comparison]]，所给积分也发散。
:::
:::

比较判别法在瑕点处同样适用，这时要考察的是被积函数趋于无穷的速度。

::: example 正弦型瑕点 {#ex-comparison-singular}
证明$\displaystyle\int_0^1\frac{dx}{\sqrt{\sin x}}$收敛，并证明$\displaystyle\int_0^\infty\frac{e^{-x}}{\sqrt x}\,dx$收敛。
::: solution
在$(0,1]$上，第一个被积函数为正且连续，只在$0$附近无界。由于$\frac{\sin x}{x}\to1$（[[calculus-1/limits#thm-sinx]]），当$x\to0^+$时，$\frac{1}{\sqrt{\sin x}}$与$\frac{1}{\sqrt x}$之比$\sqrt{\frac{x}{\sin x}}\to1$。由$0$处的极限比较判别法，该积分与$\int_0^1x^{-1/2}\,dx$同时收敛，而后者由[[#thm-p-zero]]收敛。（其数值约为$2.03$。）

第二个积分在两端都是反常的。在$(0,1]$上，$0<\frac{e^{-x}}{\sqrt x}\le\frac{1}{\sqrt x}$，而后者的积分收敛；在$[1,\infty)$上，$0<\frac{e^{-x}}{\sqrt x}\le e^{-x}$，后者的积分也收敛。所以整个积分收敛。它就是下文讨论的伽马函数值$\Gamma\bigl(\frac12\bigr)$，等于$\sqrt\pi$。
:::
:::

::: quiz
下列反常积分中哪些收敛？（选出所有正确的选项。）
- [x] $\displaystyle\int_1^\infty\frac{dx}{x^2+1}$
- [ ] $\displaystyle\int_1^\infty\frac{dx}{\sqrt x}$
- [x] $\displaystyle\int_0^1\frac{dx}{\sqrt x}$
- [ ] $\displaystyle\int_0^1\frac{dx}{x^2}$
::: solution
与$1/x^2$比较可知第一个收敛。第二个发散（在无穷远处$p = \frac12\le1$），而第三个收敛（在零处$p = \frac12<1$）——同一个函数，在两端的表现截然相反。最后一个发散（在零处$p = 2\ge1$）。
:::
:::

对于变号的被积函数，比较判别法适用于$\abs{f}$。

::: theorem 绝对收敛必收敛 {#thm-absolute}
若对每个$t>a$，$f$在$[a,t]$上可积，且$\int_a^\infty\abs{f(x)}\,dx$收敛，则$\int_a^\infty f(x)\,dx$收敛。
:::

::: proof
由于$-\abs f\le f\le\abs f$，有$0\le f + \abs{f}\le2\abs{f}$。积分$\int_a^\infty2\abs f$收敛，所以由[[#thm-comparison]]，$\int_a^\infty(f + \abs f)$也收敛。于是$\int_a^tf = \int_a^t(f + \abs f) - \int_a^t\abs f$是两个具有有限极限的$t$的函数之差，所以当$t\to\infty$时它有有限极限。
:::

逆命题不成立。积分$\int_1^\infty\frac{\sin x}{x}\,dx$收敛，因为$\sin x/x$的正拱和负拱部分地相互抵消，而$\int_1^\infty\frac{\abs{\sin x}}{x}\,dx$发散（[[#exr-dirichlet]]）。这样的积分称为**条件收敛**。

## 伽马函数及其他应用

::: example 伽马函数 {#ex-gamma}
对$s>0$，定义$\displaystyle\Gamma(s) = \int_0^\infty x^{s-1}e^{-x}\,dx$。证明这个积分收敛，$\Gamma(s+1) = s\,\Gamma(s)$，并且对每个整数$n\ge0$有$\Gamma(n+1) = n!$。
::: solution
**收敛性。**在$1$处拆开。在$(0,1]$上，$0<x^{s-1}e^{-x}\le x^{s-1} = \frac{1}{x^{1-s}}$，而由于$1 - s<1$，由[[#thm-p-zero]]，$\int_0^1x^{s-1}\,dx$收敛。在$[1,\infty)$上，写$x^{s-1}e^{-x} = \bigl(x^{s-1}e^{-x/2}\bigr)e^{-x/2}$。当$x\to\infty$时括号中的部分趋于$0$（指数函数压倒幂函数，[[calculus-1/mean-value-theorem#ex-lhopital]]），所以它在$[1,\infty)$上以某个常数$C$为界，从而$x^{s-1}e^{-x}\le Ce^{-x/2}$，而后者的积分收敛。由[[#thm-comparison]]，两部分都收敛。

**递推公式。**在$[\delta, t]$上取$u = x^s$，$dv = e^{-x}\,dx$作分部积分：

$$
\int_\delta^tx^se^{-x}\,dx = \bigl[-x^se^{-x}\bigr]_\delta^t + s\int_\delta^tx^{s-1}e^{-x}\,dx .
$$

当$\delta\to0^+$，$t\to\infty$时，边界项$\delta^se^{-\delta}$和$t^se^{-t}$都趋于$0$，所以$\Gamma(s+1) = s\,\Gamma(s)$。

**阶乘。**$\Gamma(1) = \int_0^\infty e^{-x}\,dx = 1$，于是$\Gamma(2) = 1\cdot\Gamma(1) = 1$，$\Gamma(3) = 2\Gamma(2) = 2$，由归纳法得$\Gamma(n+1) = n\cdot(n-1)! = n!$。伽马函数光滑地插值了阶乘；例如$\Gamma\bigl(\frac12\bigr) = \sqrt\pi$，所以“$\bigl(-\frac12\bigr)! = \sqrt\pi$”。它在概率论与统计学中随处可见（[[probability/continuous-random-variables]]）。

在$\frac12$处的值来自高斯积分：代换$x = u^2$（于是$dx = 2u\,du$，$x^{-1/2} = u^{-1}$）给出$\Gamma\bigl(\frac12\bigr) = \int_0^\infty x^{-1/2}e^{-x}\,dx = 2\int_0^\infty e^{-u^2}\,du = 2\cdot\frac{\sqrt\pi}{2} = \sqrt\pi$，这里用到了[[#ex-comparison]]中给出的$\int_0^\infty e^{-u^2}\,du$的值。
:::
:::

::: application 等待时间及其均值
[[calculus-1/integral-applications#ex-exponential-wait]]中的指数密度$f(x) = \lambda e^{-\lambda x}$（$x\ge0$）的总概率为$\int_0^\infty\lambda e^{-\lambda x}\,dx = \lim_{t\to\infty}\bigl(1 - e^{-\lambda t}\bigr) = 1$，这正是密度所必须满足的。利用代换$u = \lambda x$和伽马函数，它的均值为

$$
\int_0^\infty x\,\lambda e^{-\lambda x}\,dx = \frac1\lambda\int_0^\infty ue^{-u}\,du = \frac{\Gamma(2)}{\lambda} = \frac1\lambda .
$$

所以当$\lambda = 0.1$（每分钟）时，平均等待时间为$10$分钟，与前面所说的一致。反常积分是连续型概率论的自然语言，因为等待时间、寿命和测量误差都没有上界。
:::

::: application 永续年金的价值
永远收到钱，在今天值多少钱？如果一笔支付流以每年$c$英镑的速率连续到来，而资金能以连续复利利率$r$生息，那么在时刻$t$到期的一英镑今天值$e^{-rt}$英镑，整个支付流的**现值**为

$$
\int_0^\infty ce^{-rt}\,dt = \lim_{T\to\infty}\frac{c}{r}\bigl(1 - e^{-rT}\bigr) = \frac{c}{r}.
$$

当$r = 5\%$时，每年$1000$英镑、永续不断的收入现在值$20\,000$英镑——这是有限的，因为遥远未来的支付按指数方式贴现。经济学家用同样的反常积分来评估土地、无到期日债券的价值以及气候变化的长期成本。
:::

并非每个密度都有均值。**柯西密度**$f(x) = \frac{1}{\pi(1+x^2)}$是一个真正的概率密度——由[[#ex-improper-basic]](c)，它的总积分为$\frac\pi\pi = 1$——但它的尾部衰减得太慢，以致$\int_0^\infty\frac{x}{\pi(1+x^2)}\,dx$发散：这可以由与$\frac1x$的极限比较得出，也可以直接算出$\int_0^t\frac{x\,dx}{1+x^2} = \frac12\ln(1+t^2)\to\infty$。

::: widget distribution
dist: cauchy
params: x0=0, gamma=1
a: -1
b: 1
caption: 柯西密度看上去像一条钟形曲线，且$\Prob(-1\le X\le1) = \frac{1}{\pi}\bigl(\arctan1 - \arctan(-1)\bigr) = \frac12$。但它的尾部只像$\frac{1}{\pi x^2}$那样衰减，所以$x f(x)$的表现像$\frac{1}{\pi x}$，其积分在两端都发散：柯西分布没有均值。[[probability/limit-theorems]]一章将探讨由此带来的一个后果：柯西样本的平均值永远不会稳定下来。
:::

::: example 加百列号角 {#ex-gabriel}
把曲线$y = \frac1x$，$x\ge1$绕$x$轴旋转。证明所得的无限长号角体积有限，而表面积无穷大。（旋转曲面的面积为$\int2\pi f(x)\sqrt{1 + f'(x)^2}\,dx$，它像弧长那样通过用窄带近似得到；见[[multivariable/surface-integrals]]。）
::: solution
由圆盘法（[[calculus-1/integral-applications#def-volume]]）和[[#thm-p-infinity]]，

$$
V = \int_1^\infty\pi\Bigl(\frac1x\Bigr)^2dx = \pi\int_1^\infty\frac{dx}{x^2} = \pi .
$$

对于表面积，$f'(x) = -\frac{1}{x^2}$，所以

$$
S = \int_1^\infty\frac{2\pi}{x}\sqrt{1 + \frac{1}{x^4}}\,dx \ge\int_1^\infty\frac{2\pi}{x}\,dx = \infty
$$

这里用到了[[#thm-comparison]]。这个悖论——号角可以用$\pi$立方单位的油漆灌满，其内壁却无法刷满油漆——只要注意到以下事实就消解了：一层固定厚度的油漆会有无穷大的体积，而灌满号角的油漆则变得越来越细。
:::
:::

::: widget surface
fx: u
fy: cos(v)/u
fz: sin(v)/u
u: 1, 10
v: 0, 2pi
color: height
caption: 加百列号角（这里截止于$x = 10$）。$x$处的截面半径为$1/x$，面积为$\pi/x^2$，其积分收敛；而周长$2\pi/x$只像$1/x$那样衰减，所以随着号角的延长，表面积无限增大。
:::

::: history
1641年，伽利略（Galileo）的学生埃万杰利斯塔·托里拆利（Evangelista Torricelli）证明了：把双曲线旋转所得的无限长立体——加百列号角——体积有限，这令他的同时代人大为震惊；这一结果于1644年发表，引发了一场关于无穷之本性的哲学争论。1729年和1730年，莱昂哈德·欧拉（Leonhard Euler）在写给克里斯蒂安·哥德巴赫（Christian Goldbach）的信中解决了把阶乘推广到非整数自变量的问题，得到了如今用来定义伽马函数的积分。19世纪20年代，奥古斯丁-路易·柯西（Augustin-Louis Cauchy）像本章这样，把无穷区间上的积分和取无穷值的函数的积分系统地作为极限来处理，并对某些发散积分引入了主值。
:::

## 后续内容

反常积分与无穷级数是近亲：对正的递减函数$f$，级数$\sum f(n)$与积分$\int_1^\infty f$同时收敛或同时发散（积分判别法，见[[#exr-integral-test]]和[[calculus-2/convergence-tests]]）。比较判别法对级数也有完全类似的形式。含参数的反常积分定义了拉普拉斯变换（[[ode/laplace-transform]]）和傅里叶变换（[[pde/fourier-transform]]），其中许多积分，例如$\int_{-\infty}^\infty\frac{dx}{1+x^4}$，用复分析计算最为简便（[[complex-analysis/residues]]）。在勒贝格积分理论（[[measure-theory/lebesgue-integral]]）中，绝对收敛的反常积分成为普通的积分，而像$\int\frac{\sin x}{x}$这样条件收敛的积分则保持其特殊地位。

::: summary
- 反常积分是普通积分的极限：$\int_a^\infty f = \lim_{t\to\infty}\int_a^tf$；对于在$a$处无界的被积函数，$\int_a^bf = \lim_{t\to a^+}\int_t^bf$。当极限有限时，反常积分收敛。
- 两端都是无穷的积分，或者区间内部有瑕点的积分，必须拆开，并且每一部分都必须各自收敛；对称的主值是另一个不同的概念。
- $p$判别法：$\int_1^\infty x^{-p}\,dx$当且仅当$p>1$时收敛，$\int_0^1x^{-p}\,dx$当且仅当$p<1$时收敛。
- 对于非负的被积函数，与一个更大的收敛积分比较可得收敛，与一个更小的发散积分比较可得发散；极限比较判别法比较的是增长速度。两者都依赖于$\R$的完备性。
- 绝对收敛蕴涵收敛，但反之不然：$\int_1^\infty\frac{\sin x}{x}\,dx$只是条件收敛。
- 伽马函数$\Gamma(s) = \int_0^\infty x^{s-1}e^{-x}\,dx$满足$\Gamma(s+1) = s\Gamma(s)$和$\Gamma(n+1) = n!$。
- 反常积分给出连续分布的总概率和均值；有些密度（例如柯西密度）没有均值。
:::

## 习题

::: exercise 指数型尾部 {level=1 check="1/2"}
计算$\displaystyle\int_0^\infty e^{-2x}\,dx$。
::: solution
当$t\to\infty$时，$\int_0^te^{-2x}\,dx = \frac12\bigl(1 - e^{-2t}\bigr)\to\frac12$。
:::
:::

::: exercise 幂型尾部 {level=1 check="1/8"}
计算$\displaystyle\int_2^\infty\frac{dx}{x^3}$。
::: solution
$\int_2^t x^{-3}\,dx = \Bigl[-\frac{1}{2x^2}\Bigr]_2^t = \frac18 - \frac{1}{2t^2}\to\frac18$。
:::
:::

::: exercise 无界的被积函数 {level=1 check="4"}
计算$\displaystyle\int_0^4\frac{dx}{\sqrt x}$。
::: solution
被积函数在$0$附近无界。当$t\to0^+$时，$\int_t^4x^{-1/2}\,dx = \bigl[2\sqrt x\bigr]_t^4 = 4 - 2\sqrt t\to4$。
:::
:::

::: exercise 收敛还是发散？ {level=2}
判断下列各积分是否收敛，并说明理由：(a)$\displaystyle\int_1^\infty\frac{dx}{x^3 + 1}$；(b)$\displaystyle\int_1^\infty\frac{2 + \sin x}{x}\,dx$；(c)$\displaystyle\int_0^1\frac{dx}{x + \sqrt x}$；(d)$\displaystyle\int_1^\infty\frac{\ln x}{x^2}\,dx$。
::: solution
(a) 收敛：$0<\frac{1}{x^3+1}\le\frac{1}{x^3}$，而$\int_1^\infty x^{-3}\,dx$收敛。

(b) 发散：$\frac{2 + \sin x}{x}\ge\frac{1}{x}$，而$\int_1^\infty\frac{dx}{x}$发散。

(c) 收敛：当$0<x\le1$时，$\frac{1}{x + \sqrt x}\le\frac{1}{\sqrt x}$，而由[[#thm-p-zero]]，$\int_0^1x^{-1/2}\,dx$收敛。

(d) 收敛：当$x\to\infty$时$\frac{\ln x}{\sqrt x}\to0$（任何幂函数都压倒对数函数），所以存在某个常数$C$，使得当$x \ge 1$时$\ln x\le C\sqrt{x}$；于是$0\le\frac{\ln x}{x^2}\le\frac{C}{x^{3/2}}$，而后者的积分收敛。（事实上，用分部积分可求得该积分等于$1$。）
:::
:::

::: exercise 配方 {level=2 check="pi"}
计算$\displaystyle\int_{-\infty}^\infty\frac{dx}{x^2 + 2x + 2}$。
::: solution
由于$x^2 + 2x + 2 = (x+1)^2 + 1$，$\arctan(x+1)$是一个原函数。在$-1$处拆开：$\int_{-1}^\infty = \lim_{t\to\infty}\arctan(t+1) - 0 = \frac\pi2$，$\int_{-\infty}^{-1} = 0 - \lim_{t\to-\infty}\arctan(t+1) = \frac\pi2$。两者都收敛，总和为$\pi$。
:::
:::

::: exercise 对数代换 {level=2 check="1"}
计算$\displaystyle\int_e^\infty\frac{dx}{x(\ln x)^2}$。
::: solution
令$u = \ln x$，$du = \frac{dx}{x}$，则$[e,t]$上的积分变为$\int_1^{\ln t}\frac{du}{u^2} = 1 - \frac{1}{\ln t}\to1$。（与$\int_e^\infty\frac{dx}{x\ln x} = \lim\ln(\ln t) = \infty$比较：被积函数非常微小的变化就可能决定收敛与否。）
:::
:::

::: exercise 对数奇点 {level=2 check="-1/4"}
计算$\displaystyle\int_0^1x\ln x\,dx$。
::: solution
取$u = \ln x$，$dv = x\,dx$作分部积分：$\int x\ln x\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4}$。所以当$t\to0^+$时，$\int_t^1x\ln x\,dx = -\frac14 - \frac{t^2}{2}\ln t + \frac{t^2}{4}\to-\frac14$，因为$t^2\ln t\to0$。（被积函数实际上是有界的，因为$x\ln x\to0$；这个积分之所以是反常的，只是因为$\ln x$在$0$处没有定义。）
:::
:::

::: exercise 狄利克雷积分 {#exr-dirichlet level=3}
证明$\displaystyle\int_1^\infty\frac{\sin x}{x}\,dx$收敛，但$\displaystyle\int_1^\infty\frac{\abs{\sin x}}{x}\,dx$发散。
::: hint
对于前者，用分部积分得到$\frac{\cos x}{x^2}$。对于后者，利用$\abs{\sin x}\ge\sin^2x = \frac{1 - \cos 2x}{2}$。
:::
::: solution
**收敛性。**取$u = \frac1x$，$dv = \sin x\,dx$作分部积分，

$$
\int_1^t\frac{\sin x}{x}\,dx = \Bigl[-\frac{\cos x}{x}\Bigr]_1^t - \int_1^t\frac{\cos x}{x^2}\,dx = \cos 1 - \frac{\cos t}{t} - \int_1^t\frac{\cos x}{x^2}\,dx .
$$

当$t\to\infty$时$\frac{\cos t}{t}\to0$，而$\int_1^\infty\frac{\cos x}{x^2}\,dx$绝对收敛（比较$\frac{\abs{\cos x}}{x^2}\le\frac{1}{x^2}$），因而由[[#thm-absolute]]收敛。所以左边有有限极限。

**绝对值积分的发散性。**由于$0\le\abs{\sin x}\le1$，有$\abs{\sin x}\ge\sin^2x = \frac{1-\cos2x}{2}$，所以

$$
\int_1^t\frac{\abs{\sin x}}{x}\,dx\ge\frac12\int_1^t\frac{dx}{x} - \frac12\int_1^t\frac{\cos 2x}{x}\,dx .
$$

当$t\to\infty$时，最后一个积分有有限极限（用与上面相同的分部积分，只是把$x$换成$2x$），而$\frac12\int_1^t\frac{dx}x = \frac12\ln t\to\infty$。因此绝对值积分发散。（利用复分析可以证明$\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$。）
:::
:::

::: exercise 两端都反常 {level=3}
对哪些实数$p$，$\displaystyle\int_0^\infty\frac{dx}{x^p(1+x)}$收敛？
::: solution
被积函数在$(0,\infty)$上为正且连续，所以在$1$处拆开，用[[#thm-limit-comparison]]（及其在$0$处的类似形式）分别考察两端。

在$0$附近：$\frac{1}{x^p(1+x)}\big/\frac{1}{x^p} = \frac{1}{1+x}\to1$，所以$\int_0^1$收敛当且仅当$\int_0^1x^{-p}\,dx$收敛，即当且仅当$p<1$。

在$\infty$附近：$\frac{1}{x^p(1+x)}\big/\frac{1}{x^{p+1}} = \frac{x}{1+x}\to1$，所以$\int_1^\infty$收敛当且仅当$\int_1^\infty x^{-(p+1)}\,dx$收敛，即当且仅当$p + 1>1$，亦即$p>0$。

整个积分收敛当且仅当两部分都收敛：恰好是$0<p<1$的情形。（当$p = \frac12$时，代换$x = u^2$给出$\int_0^\infty\frac{2\,du}{1+u^2} = \pi$。）
:::
:::

::: exercise 积分判别法 {#exr-integral-test level=3}
设$f$在$[1,\infty)$上连续、非负且递减。证明对每个整数$N\ge2$，

$$
\sum_{n=2}^Nf(n)\le\int_1^Nf(x)\,dx\le\sum_{n=1}^{N-1}f(n),
$$

并由此推出：当$N\to\infty$时$\sum_{n=1}^N\frac1n\to\infty$，而$\sum\frac{1}{n^2}$的部分和始终小于$2$。
::: solution
当$n\le x\le n+1$时，由单调性得$f(n+1)\le f(x)\le f(n)$，所以由积分的估值性质，$f(n+1)\le\int_n^{n+1}f\le f(n)$。对$n = 1, \dots, N-1$把这些不等式相加，并利用可加性，就得到所要的两个不等式。

取$f(x) = \frac1x$：$\sum_{n=1}^{N-1}\frac1n\ge\int_1^N\frac{dx}{x} = \ln N$，它趋于无穷，所以调和级数的部分和无界。

取$f(x) = \frac1{x^2}$：$\sum_{n=2}^N\frac{1}{n^2}\le\int_1^N\frac{dx}{x^2} = 1 - \frac1N<1$，所以对所有$N$都有$\sum_{n=1}^N\frac1{n^2}<2$。这些部分和递增且有界，所以收敛（这是[[#lem-monotone-limit]]的离散类比）；欧拉在1734年证明了这个极限是$\frac{\pi^2}{6}$。这类级数是[[calculus-2/series]]一章的主题。
:::
:::
