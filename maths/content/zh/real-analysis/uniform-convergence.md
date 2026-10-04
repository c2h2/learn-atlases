柯西（Cauchy）在1821年的《分析教程》（*Cours d'analyse*）中，把“由连续函数构成的收敛级数，其和是连续的”作为一个定理提了出来。五年后，阿贝尔（Abel）指出，傅里叶级数

$$
\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \cdots
$$

对每个$x$都收敛，各项都连续，然而它的和在$x = \pi$处发生跳跃：当$-\pi < x < \pi$时它等于$x/2$，而在$x = \pi$处等于$0$。柯西的论证中缺少了某样东西，而人们花了二十年才把它确切地说清楚：级数在每一点处都收敛，但在各点处收敛的**速度**并不相同。缺少的假设就是**一致收敛**。

本章讨论函数列与函数项级数$f_n\colon A \to \R$。基本的问题是：$f_n$的性质——连续性、积分、导数——能否传递给极限。等价地说，这是关于交换极限次序的问题：$\lim_n\lim_{x\to c}f_n(x) = \lim_{x\to c}\lim_n f_n(x)$是否成立？$\lim_n\int f_n = \int\lim_n f_n$是否成立？我们将看到，朴素的收敛概念每一次给出的回答都是“不一定”，而一致收敛给出的回答是“是”（对导数还需要更仔细一些）。收获是：幂级数的严格理论、一个处处不可导的连续函数，以及魏尔斯特拉斯（Weierstrass）定理——$[a, b]$上的每个连续函数都是多项式的一致极限。

## 逐点收敛及其缺陷

::: definition 逐点收敛 {#def-pointwise}
如果对每个$x \in A$都有$f_n(x) \to f(x)$，就称函数列$f_n\colon A \to \R$在$A$上**逐点收敛**于$f\colon A \to \R$；也就是说，对每个$x \in A$和每个$\eps > 0$，存在$N$（依赖于$x$和$\eps$），使得对所有$n \ge N$有$\abs{f_n(x) - f(x)} < \eps$。
:::

逐点收敛不过是在每一点处各有一个数列收敛而已。下面三个例子表明，它能保持的性质少得可怜。

::: example 逐点收敛的三种失效 {#ex-failures}
求下列函数列的逐点极限：(a) $[0, 1]$上的$f_n(x) = x^n$；(b) $[0, 1]$上的$h_n(x) = n^2xe^{-nx}$；(c) $\R$上的$d_n(x) = \dfrac{\sin(nx)}{\sqrt n}$。对每种情形，判断连续性、积分或导数在取极限后是否得以保留。
::: solution
(a) 当$0 \le x < 1$时，$x^n \to 0$（[[real-analysis/sequences#ex-standard]]）；在$x = 1$处，$1^n = 1$。所以极限为：当$x < 1$时$f(x) = 0$，且$f(1) = 1$。每个$f_n$都连续，但$f$不连续。等价地说，$\lim_{x\to1^-}\lim_n x^n = 0$，而$\lim_n\lim_{x\to1^-}x^n = 1$。

(b) $h_n(0) = 0$，而当$x > 0$时，$h_n(x) = n^2xe^{-nx} \to 0$，因为指数衰减胜过多项式增长。所以极限为$0$。但令$u = nx$，得

$$
\int_0^1 h_n(x)\,dx = \int_0^n ue^{-u}\,du = 1 - (n+1)e^{-n} \to 1 \ne 0 = \int_0^1 0\,dx.
$$

积分的极限不等于极限的积分。

(c) $\abs{d_n(x)} \le 1/\sqrt n \to 0$，所以$d_n \to 0$——甚至在下面定义的意义下是一致的。但$d_n'(x) = \sqrt n\cos(nx)$，且$d_n'(0) = \sqrt n \to \infty$：导数并不收敛于极限函数的导数$0$。
:::
:::

::: widget plot
f: x^n
x: 0, 1
y: -0.05, 1.1
sliders: n=1:1:60:1
labels: x^n
caption: $[0, 1]$上的函数$x^n$。增大$n$：在每个固定的$x < 1$处，函数值都降到$0$，但$x$越接近$1$，下降得越慢，而图像在$x = 1$处总是爬回到$1$。取一个水平，例如$\tfrac12$：对每个$n$，都存在使$x^n > \tfrac12$的点（在$1$附近）。没有哪一个$N$能同时对所有$x$都适用——收敛不是一致的，而极限函数不连续。
:::

## 一致收敛

在例(a)中，麻烦在于：当$x \to 1$时，在点$x$处所需的$N$无限增大。一致收敛禁止这种情况：一个$N$必须对每个$x$都适用。

::: definition 一致收敛 {#def-uniform}
函数列$f_n\colon A \to \R$在$A$上**一致收敛**于$f$是指：对每个$\eps > 0$，存在$N$，使得

$$
\abs{f_n(x) - f(x)} < \eps \qquad\text{对所有 } n \ge N \text{ 和所有 } x \in A.
$$

等价地，$\norm{f_n - f}_\infty \to 0$，其中$\norm{g}_\infty = \sup_{x \in A}\abs{g(x)}$是**上确界范数**。
:::

这两个定义的区别仅在于量词的顺序——“对每个$\eps$，存在$N$，使得对所有$x$”与“对每个$x$和$\eps$，存在$N$”——这与一致连续性（[[real-analysis/continuity#def-uniform-continuity]]）的情形完全一样。从几何上看，一致收敛是说：当$n \ge N$时，$f_n$的整个图像都位于$f$的图像周围竖直半宽为$\eps$的带状区域内。一致收敛蕴涵逐点收敛，并且极限相同。

要检验一致收敛，就计算（或估计）$\norm{f_n - f}_\infty$。对$[0, b]$（$b < 1$）上的$x^n$，$\sup_{[0,b]}x^n = b^n \to 0$，所以收敛是一致的；在$[0, 1)$上，对每个$n$上确界都是$1$，所以收敛不是一致的。对(b)中的$h_n$，用微积分可知最大值在$x = 1/n$处取得，所以$\norm{h_n}_\infty = h_n(1/n) = n/e \to \infty$：也不是一致的。与数列的情形一样，存在一个不需要知道极限的准则。

::: theorem 一致收敛的柯西准则 {#thm-uniform-cauchy}
函数列$f_n\colon A \to \R$在$A$上一致收敛，当且仅当对每个$\eps > 0$，存在$N$，使得对所有$m, n \ge N$和所有$x \in A$，都有$\abs{f_n(x) - f_m(x)} < \eps$。
:::

::: proof
若$f_n \to f$是一致的，取$N$，使得当$n \ge N$时对所有$x$有$\abs{f_n(x) - f(x)} < \eps/2$；则当$m, n \ge N$时$\abs{f_n(x) - f_m(x)} < \eps$。

反之，设条件成立。对每个固定的$x$，$(f_n(x))$是一个柯西数列，因而收敛（[[real-analysis/sequences#thm-cauchy]]）；记其极限为$f(x)$。给定$\eps > 0$，取条件中的$N$。对$n \ge N$和任意$x \in A$，在$\abs{f_n(x) - f_m(x)} < \eps$中令$m \to \infty$，得$\abs{f_n(x) - f(x)} \le \eps$（[[real-analysis/sequences#thm-order-limits]]）。由于$N$不依赖于$x$，收敛是一致的。
:::

下面是使一致收敛值得拥有的那些定理。

::: theorem 连续函数的一致极限连续 {#thm-uniform-continuous}
若每个$f_n\colon A \to \R$都在$c \in A$处连续，且在$A$上一致地有$f_n \to f$，则$f$在$c$处连续。
:::

::: proof
设$\eps > 0$。取$N$，使得对所有$x \in A$有$\abs{f_N(x) - f(x)} < \eps/3$。由于$f_N$在$c$处连续，存在$\delta > 0$，使得只要$x \in A$且$\abs{x - c} < \delta$，就有$\abs{f_N(x) - f_N(c)} < \eps/3$。对这样的$x$，

$$
\abs{f(x) - f(c)} \le \abs{f(x) - f_N(x)} + \abs{f_N(x) - f_N(c)} + \abs{f_N(c) - f(c)} < \frac\eps3 + \frac\eps3 + \frac\eps3 = \eps.
$$
:::

这就是“$\eps/3$论证”：经由$f_N$从$f(x)$走到$f(c)$，第一步和最后一步用一致性，中间一步用单个函数$f_N$的连续性。哪里需要一致性？在第一步：$\abs{f(x) - f_N(x)}$必须**对我们尚未选定的$x$**也很小，所以$N$不能依赖于$x$。反过来读，这个定理就是一个检验法：由于$[0, 1]$上$x^n$的极限不连续，这个收敛不可能是一致的。

::: quiz
设$f_n(x) = x/n$。在哪个定义域上一致地有$f_n \to 0$？
- [ ] 在$\R$上
- [x] 在$[0, 1]$上，但不在$\R$上
- [ ] 两者都不是，因为极限函数只在有界集上连续
- [ ] 两者都是，因为对每个$x$都有$x/n \to 0$
::: solution
在$[0, 1]$上，$\sup\abs{x/n} = 1/n \to 0$，所以收敛是一致的。在$\R$上，对每个$n$都有$\sup_x\abs{x/n} = \infty$：无论$n$多大，都有$f_n(n) = 1$。处处逐点收敛并不蕴涵一致收敛，即使极限函数连续也是如此。
:::
:::

::: theorem 一致极限的积分 {#thm-uniform-integral}
若每个$f_n$都在$[a, b]$上黎曼可积，且在$[a, b]$上一致地有$f_n \to f$，则$f$可积，并且

$$
\lim_{n\to\infty}\int_a^b f_n = \int_a^b f.
$$
:::

::: proof
令$\eps_n = \norm{f_n - f}_\infty \to 0$。则$f_n - \eps_n \le f \le f_n + \eps_n$，所以$f$有界，并且在任一分割$P$的每个子区间上，$f$的上确界和下确界与$f_n$的相应值相差都不超过$\eps_n$。因此

$$
U(f, P) - L(f, P) \le U(f_n, P) - L(f_n, P) + 2\eps_n(b - a).
$$

给定$\eps > 0$，先固定$n$使$2\eps_n(b - a) < \eps/2$，再取分割$P$使$U(f_n, P) - L(f_n, P) < \eps/2$（[[real-analysis/riemann-integral#thm-riemann-criterion]]）。则$U(f, P) - L(f, P) < \eps$，所以$f$可积。最后，由积分的性质（[[real-analysis/riemann-integral#thm-integral-properties]]），

$$
\Bigl\lvert\int_a^b f_n - \int_a^b f\Bigr\rvert \le \int_a^b\abs{f_n - f} \le \eps_n(b - a) \to 0.
$$
:::

::: widget plot
f: n^2*x*exp(-n*x)
x: 0, 1
y: 0, 8
sliders: n=1:1:20:1
labels: h_n(x) = n^2xe^{-nx}
caption: [[#ex-failures]]中的鼓包$h_n(x) = n^2xe^{-nx}$。随着$n$增大，每个鼓包都更高（在$x = 1/n$处高为$n/e$）、更窄，并向$x = 0$滑去。在每个固定的$x > 0$处，函数值最终都会消失，所以$h_n \to 0$逐点成立；但每个鼓包下方的面积始终接近$1$。质量沿竖直轴向上逃逸了——而一致收敛不允许这种情况发生。
:::

导数的情形更微妙。$f_n$的一致收敛对$f_n'$没有任何约束（例(c)）；正确的假设是**导数**的一致收敛。

::: theorem 极限的求导 {#thm-uniform-derivative}
设每个$f_n$都在$[a, b]$上可导。又设$(f_n')$在$[a, b]$上一致收敛于函数$g$，且对某个$x_0 \in [a, b]$，$(f_n(x_0))$收敛。则$(f_n)$在$[a, b]$上一致收敛于一个可导函数$f$，并且$f' = g$。
:::

::: proof
**$(f_n)$的一致收敛。**对任意$m, n$，函数$f_n - f_m$可导，所以由中值定理（[[real-analysis/differentiation#thm-mvt]]），对所有$x, y \in [a, b]$，

$$
\bigl\lvert(f_n - f_m)(x) - (f_n - f_m)(y)\bigr\rvert \le \norm{f_n' - f_m'}_\infty\,\abs{x - y}.
$$ {#eq-mvt-diff}

取$y = x_0$：$\abs{f_n(x) - f_m(x)} \le \abs{f_n(x_0) - f_m(x_0)} + (b - a)\norm{f_n' - f_m'}_\infty$。当$m, n$充分大时，两项都很小（第一项是因为$(f_n(x_0))$收敛，第二项则由对$f_n'$应用[[#thm-uniform-cauchy]]得到），并且关于$x$是一致的。所以由[[#thm-uniform-cauchy]]，$(f_n)$一致收敛于某个$f$。

**导数。**固定$c \in [a, b]$，对$x \ne c$令

$$
\varphi_n(x) = \frac{f_n(x) - f_n(c)}{x - c}, \qquad \varphi(x) = \frac{f(x) - f(c)}{x - c}.
$$

则在$[a,b]\setminus\set{c}$上$\varphi_n \to \varphi$逐点成立，并且在[[#eq-mvt-diff]]中取$y = c$，得$\abs{\varphi_n(x) - \varphi_m(x)} \le \norm{f_n' - f_m'}_\infty$；令$m \to\infty$，得$\abs{\varphi_n(x) - \varphi(x)} \le \sup_{m\ge n}\norm{f_n' - f_m'}_\infty$，当$n\to\infty$时它趋于$0$，且与$x$无关。设$\eps > 0$。取$N$，使得对所有$x \ne c$有$\abs{\varphi_N(x) - \varphi(x)} < \eps/3$，并且$\abs{f_N'(c) - g(c)} < \eps/3$。由于当$x \to c$时$\varphi_N(x) \to f_N'(c)$，存在$\delta > 0$，使得当$0 < \abs{x - c} < \delta$时$\abs{\varphi_N(x) - f_N'(c)} < \eps/3$。对这样的$x$，

$$
\abs{\varphi(x) - g(c)} \le \abs{\varphi(x) - \varphi_N(x)} + \abs{\varphi_N(x) - f_N'(c)} + \abs{f_N'(c) - g(c)} < \eps.
$$

所以当$x \to c$时$\varphi(x) \to g(c)$：$f$在$c$处可导，且$f'(c) = g(c)$。
:::

如果各$f_n'$都连续，还有一条更短的途径：由微积分基本定理，$f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'$，再由[[#thm-uniform-integral]]就可以取极限。上面的证明避免了这一假设。

::: example 一致收敛控制不了导数 {#ex-derivative-limit}
设$\R$上的$f_n(x) = \dfrac{x}{1 + nx^2}$。证明$f_n \to 0$是一致的，且对每个$x$，$f_n'(x)$都收敛，但$\lim_n f_n'(0) \ne 0$。[[#thm-uniform-derivative]]的哪个假设不成立？
::: solution
对$x \ne 0$，由算术-几何平均不等式得$1 + nx^2 \ge 2\sqrt n\,\abs x$，所以$\abs{f_n(x)} \le \frac{1}{2\sqrt n}$，等号在$x = \pm1/\sqrt n$处成立；又$f_n(0) = 0$。因此$\norm{f_n}_\infty = \frac{1}{2\sqrt n} \to 0$：收敛是一致的，极限为$f = 0$。

导数为$f_n'(x) = \dfrac{1 - nx^2}{(1 + nx^2)^2}$。在$x = 0$处，对每个$n$都有$f_n'(0) = 1$。对$x \ne 0$，$\abs{f_n'(x)} \le \dfrac{1 + nx^2}{(1 + nx^2)^2} = \dfrac{1}{1 + nx^2} \to 0$。所以$f_n' \to g$逐点成立，其中$g(0) = 1$，在其他点处$g(x) = 0$——但$f' = 0$，而$f'(0) = 0 \ne 1 = g(0)$。

不成立的假设是$(f_n')$的**一致**收敛：它的极限$g$在$0$处不连续，所以由[[#thm-uniform-continuous]]，连续函数$f_n'$不可能在任何包含$0$的区间上一致收敛。在远离$0$的$[\delta, \infty)$上，它们确实一致收敛，而在那里正如定理所预言的，$f' = g = 0$。
:::
:::

::: warning 函数本身的一致收敛是不够的
在[[#ex-failures]](c)中，在$\R$上一致地有$d_n \to 0$，但$d_n'(0) = \sqrt n$发散。图像在一致意义下的接近，对它们的斜率没有任何约束：一个函数可以一致地很小，同时剧烈地摆动。对于导数，必须检验$(f_n')$的收敛性。
:::

## 函数项级数与M判别法

如果函数项级数$\sum_n f_n$的部分和$S_N = \sum_{n=1}^N f_n$在$A$上一致收敛，就称该级数在$A$上**一致收敛**。上面的每个定理都有级数形式：由连续函数构成的一致收敛级数，其和是连续的；由可积函数构成的一致收敛级数可以逐项积分。证明级数一致收敛的标准方法，是把它与一个收敛的数项级数作比较。

::: theorem 魏尔斯特拉斯M判别法 {#thm-m-test}
设$f_n\colon A \to \R$，并设存在常数$M_n$，使得对所有$x \in A$有$\abs{f_n(x)} \le M_n$，且$\sum_n M_n < \infty$。则$\sum_n f_n$在$A$上绝对且一致收敛。
:::

::: proof
对每个$x$，与$\sum M_n$比较可知$\sum\abs{f_n(x)}$收敛。为证一致性，设$\eps > 0$，对$\sum M_n$应用柯西准则（[[real-analysis/series#thm-cauchy-series]]），取$N$，使得当$n > m \ge N$时$\sum_{k=m+1}^n M_k < \eps$。则对所有$x \in A$，

$$
\abs{S_n(x) - S_m(x)} = \Bigl\lvert\sum_{k=m+1}^n f_k(x)\Bigr\rvert \le \sum_{k=m+1}^n M_k < \eps,
$$

由[[#thm-uniform-cauchy]]即得一致收敛。
:::

M判别法产生了分析学中最令人惊讶的对象之一。固定$0 < a < 1$和奇数$b \ge 3$，令

$$
W(x) = \sum_{k=0}^\infty a^k\cos(b^k\pi x).
$$ {#eq-weierstrass}

每一项都连续，且以$M_k = a^k$为界，而$\sum a^k$收敛，所以该级数一致收敛，由[[#thm-uniform-continuous]]，$W$**在$\R$上连续**。魏尔斯特拉斯在1872年证明了：若$ab > 1 + \frac{3\pi}{2}$，则$W$**在任何点处都不可导**；哈代（G. H. Hardy）在1916年证明了$ab \ge 1$就足够了。$W$没有导数的证明太长，这里无法给出（一个密切相关的函数的证明见阿博特（Abbott）《理解分析》（*Understanding Analysis*）第5.4节），但其思想是看得见的：第$k$项的斜率是$(ab)^k$量级的，所以当$ab \ge 1$时，后面各项的摆动太陡，无法相互抵消。

::: widget plot
f: sum(cos(3^k*pi*x)/2^k, k, 0, N)
x: -1, 1
y: -2.2, 2.2
sliders: N=4:0:8:1
labels: \sum_{k=0}^{N}2^{-k}\cos(3^k\pi x)
caption: 取$a = \tfrac12$，$b = 3$时魏尔斯特拉斯函数的部分和（这里$ab = \tfrac32 \ge 1$）。增大$N$：每新增一项，就添上频率为前一项三倍、高度为前一项一半的摆动。部分和一致收敛（取$M_k = 2^{-k}$应用M判别法），所以极限是连续的；但每增加一项，都使图像在越来越多的点处变得更陡，而极限函数在任何地方都没有切线。
:::

::: example 逐项积分的级数 {#ex-term-by-term}
证明$F(x) = \displaystyle\sum_{n=1}^\infty\frac{\cos(nx)}{n^2}$在$\R$上连续，并把$\displaystyle\int_0^{\pi/2}F(x)\,dx$表示为级数。
::: solution
$\abs{\cos(nx)/n^2} \le 1/n^2$，且$\sum 1/n^2$收敛，所以由M判别法，该级数在$\R$上一致收敛，从而$F$连续。对部分和应用[[#thm-uniform-integral]]，可以逐项积分：

$$
\int_0^{\pi/2}F(x)\,dx = \sum_{n=1}^\infty\frac{1}{n^2}\int_0^{\pi/2}\cos(nx)\,dx = \sum_{n=1}^\infty\frac{\sin(n\pi/2)}{n^3} = 1 - \frac{1}{3^3} + \frac{1}{5^3} - \frac{1}{7^3} + \cdots,
$$

这是因为当$n$为偶数时$\sin(n\pi/2)$为$0$，当$n$为奇数时它交替取$1, -1$。（这个和等于$\pi^3/32$，这个值可以由傅里叶级数求得。）相比之下，逐项求导则是不合法的：逐项求导所得的级数$-\sum\frac{\sin nx}{n}$在任何包含$2\pi$的倍数的区间上都不一致收敛，因为它的和在那里发生跳跃。
:::
:::

## 幂级数

以$a$为中心的**幂级数**是形如$\sum_{n=0}^\infty c_n(x - a)^n$的级数。它的性态由一个数决定。

::: theorem 柯西-阿达马定理 {#thm-cauchy-hadamard}
令$R = 1\big/\limsup_{n\to\infty}\abs{c_n}^{1/n}$，并约定$1/0 = \infty$，$1/\infty = 0$。则幂级数$\sum c_n(x - a)^n$

1. 当$\abs{x - a} < R$时绝对收敛，当$\abs{x - a} > R$时发散；
2. 对每个$0 < r < R$，在$[a - r, a + r]$上一致收敛。

$R$称为**收敛半径**。
:::

::: proof
(1) 对各项$c_n(x - a)^n$应用根值判别法（[[real-analysis/series#thm-root]]）：$\limsup\abs{c_n(x - a)^n}^{1/n} = \abs{x - a}\limsup\abs{c_n}^{1/n} = \abs{x - a}/R$，当$\abs{x - a} < R$时它小于$1$，当$\abs{x - a} > R$时它大于$1$。

(2) 当$\abs{x - a} \le r$时，$\abs{c_n(x - a)^n} \le \abs{c_n}r^n = M_n$，而由于$r < R$，在点$x = a + r$处应用第(1)部分可知$\sum M_n$收敛。由M判别法即得一致收敛。
:::

在$\abs{x - a} = R$处，什么情况都可能发生：$\sum x^n$在$x = \pm1$两点处都发散，$\sum x^n/n$只在$-1$处收敛，而$\sum x^n/n^2$在两点处都收敛。此外，收敛在$(a - R, a + R)$的闭子区间上是一致的，但在整个开区间上不一定是一致的（$(-1, 1)$上的$\sum x^n$是无界的）。这对于主要定理已经足够了。

::: theorem 幂级数是光滑的 {#thm-power-series}
设$\sum c_n(x - a)^n$的收敛半径为$R > 0$，并设当$\abs{x - a} < R$时$f(x)$为它的和。则$f$在$(a - R, a + R)$内可导，并且

$$
f'(x) = \sum_{n=1}^\infty nc_n(x - a)^{n-1},
$$

这是一个收敛半径同为$R$的幂级数。因此$f$有任意阶导数，$c_n = f^{(n)}(a)/n!$，并且当$\abs{x - a} < R$时$\int_a^x f = \sum_{n\ge0}\frac{c_n}{n+1}(x - a)^{n+1}$。
:::

::: proof
**收敛半径相同。**逐项求导后的级数$\sum nc_n(x - a)^{n-1}$在$x$处收敛，当且仅当$\sum nc_n(x-a)^n$在$x$处收敛（乘以非零数$x - a$即可），所以它的收敛半径为$1/\limsup(n\abs{c_n})^{1/n}$。由于$n^{1/n} \to 1$，对每个$\eps > 0$，当$n$充分大时有$1 \le n^{1/n} < 1 + \eps$，所以最终有$\abs{c_n}^{1/n} \le (n\abs{c_n})^{1/n} \le (1 + \eps)\abs{c_n}^{1/n}$，从而两个上极限相等。

**求导。**设$\abs{x_1 - a} < R$，取$r$使$\abs{x_1 - a} < r < R$。在$[a - r, a + r]$上，$f$的级数的部分和$S_N$都是多项式，它们的导数$S_N'$是逐项求导后的级数的部分和，由[[#thm-cauchy-hadamard]]，它们在那里一致收敛，并且$S_N(a) = c_0$收敛。由[[#thm-uniform-derivative]]，$f$在$[a - r, a + r]$上可导——特别地，在$x_1$处可导——且$f' = \lim S_N'$。

**推论。**反复应用这一结论，可知$f$有任意阶导数，每一阶导数都由一个收敛半径为$R$的幂级数给出；逐项计算$f^{(n)}(a)$，只剩下$n!\,c_n$。最后，$\sum\frac{c_n}{n+1}(x-a)^{n+1}$的收敛半径为$R$（同样的论证），导数为$f$，并且在$a$处为零，所以由微积分基本定理，它等于$\int_a^x f$。
:::

所以在收敛区间内部，幂级数可以逐项求导和逐项积分，并且它就是其和函数的泰勒级数。特别地，[[real-analysis/differentiation#ex-flat]]中的函数$e^{-1/x^2}$不能由任何以$0$为中心的幂级数给出。

::: example 对数级数 {#ex-log-series}
证明当$\abs{x} < 1$时$\ln(1 + x) = \displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}x^n$。
::: solution
该级数的收敛半径为$1$，因为$\abs{(-1)^{n+1}/n}^{1/n} = 1/n^{1/n} \to 1$。设$g(x)$为它的和。由[[#thm-power-series]]，当$\abs x < 1$时，

$$
g'(x) = \sum_{n=1}^\infty(-1)^{n+1}x^{n-1} = 1 - x + x^2 - \cdots = \frac{1}{1 + x},
$$

这是一个几何级数。所以$g(x) - \ln(1 + x)$在$(-1, 1)$上的导数为$0$，且在$x = 0$处为零；由[[real-analysis/differentiation#cor-monotone]]，它恒为$0$。在$x = 1$处，该级数仍然收敛（由交错级数判别法），而阿贝尔的一个定理表明，此时级数的和等于$x \to 1^-$时$g(x)$的极限，即$\ln 2$——这与[[real-analysis/series#exr-3-6]]一致。
:::
:::

::: quiz
幂级数$\sum_{n\ge0}(-1)^n x^{2n}$表示$\frac{1}{1 + x^2}$，这是一个在整个$\R$上都光滑的函数。它的收敛半径是多少？
- [ ] $\infty$，因为$\frac{1}{1+x^2}$处处光滑
- [x] $1$
- [ ] $\tfrac12$
- [ ] $0$
::: solution
系数为$c_{2n} = (-1)^n$，$c_{2n+1} = 0$，所以$\limsup\abs{c_k}^{1/k} = 1$，$R = 1$；事实上，当$\abs x \ge 1$时，各项不趋于$0$。从这个实函数本身看不出任何征兆。解释在复平面中：$\frac{1}{1 + z^2}$在$z = \pm i$处趋于无穷，这两点到$0$的距离为$1$，而收敛半径就是到最近的复奇点的距离（[[complex-analysis/laurent-series]]）。
:::
:::

## 魏尔斯特拉斯逼近定理

幂级数是非常特殊的连续函数。值得注意的是，多项式——所有函数中最简单的一类——能够在有界闭区间上一致地逼近**每一个**连续函数。

::: theorem 魏尔斯特拉斯逼近定理 {#thm-weierstrass-approx}
若$f\colon [a, b] \to \R$连续，则对每个$\eps > 0$，存在多项式$p$，使得对所有$x \in [a, b]$有$\abs{f(x) - p(x)} < \eps$。
:::

::: proof
代换$x = a + (b - a)t$把$[0, 1]$映满$[a, b]$，并把$t$的多项式变为$x$的多项式，所以不妨设$[a, b] = [0, 1]$。我们使用**伯恩斯坦多项式**

$$
B_nf(x) = \sum_{k=0}^n f\Bigl(\frac kn\Bigr)b_{n,k}(x), \qquad b_{n,k}(x) = \binom nk x^k(1 - x)^{n-k}.
$$

**三个恒等式。**由二项式定理，$\sum_k b_{n,k}(x) = (x + (1 - x))^n = 1$。把$(x + y)^n = \sum_k\binom nk x^ky^{n-k}$对$x$求一阶和二阶导数，分别乘以$x$和$x^2$，再令$y = 1 - x$，就得到$\sum_k k\,b_{n,k}(x) = nx$和$\sum_k k(k-1)b_{n,k}(x) = n(n-1)x^2$。把这三个恒等式结合起来，得

$$
\sum_{k=0}^n\Bigl(\frac kn - x\Bigr)^2b_{n,k}(x) = \frac{x(1 - x)}{n} \le \frac{1}{4n}.
$$ {#eq-bernstein-variance}

**估计。**$f$有界，设$\abs f \le M$，并且$f$一致连续（[[real-analysis/continuity#thm-heine-cantor]]）。设$\eps > 0$，取$\delta > 0$，使得由$\abs{s - t} < \delta$可推出$\abs{f(s) - f(t)} < \eps/2$。固定$x \in [0, 1]$。由于各$b_{n,k}(x)$非负且和为$1$，

$$
\abs{B_nf(x) - f(x)} = \Bigl\lvert\sum_{k=0}^n\Bigl(f\bigl(\tfrac kn\bigr) - f(x)\Bigr)b_{n,k}(x)\Bigr\rvert \le \sum_{k=0}^n\Bigl\lvert f\bigl(\tfrac kn\bigr) - f(x)\Bigr\rvert\,b_{n,k}(x).
$$

把和式拆开。满足$\abs{k/n - x} < \delta$的项的贡献小于$\frac\eps2\sum_k b_{n,k}(x) = \frac\eps2$。在其余各项中，$\abs{f(k/n) - f(x)} \le 2M$且$1 \le (k/n - x)^2/\delta^2$，所以由[[#eq-bernstein-variance]]，它们的贡献至多为

$$
2M\sum_{k}\frac{(k/n - x)^2}{\delta^2}\,b_{n,k}(x) \le \frac{2M}{4n\delta^2} = \frac{M}{2n\delta^2}.
$$

只要$n > M/(\eps\delta^2)$，它就小于$\eps/2$，而这个条件与$x$无关。对这样的$n$，对每个$x \in [0, 1]$都有$\abs{B_nf(x) - f(x)} < \eps$。
:::

这个证明有一种概率解释：$B_nf(x)$是$f(S_n/n)$的数学期望，其中$S_n$是成功概率为$x$的$n$次独立试验中成功的次数，而[[#eq-bernstein-variance]]就是$S_n/n$的方差。这个估计实质上就是切比雪夫（Chebyshev）不等式，而这个定理就是一个弱大数定律（[[probability/limit-theorems]]）。

::: widget plot
f: sum(abs(k/n - 1/2)*binom(n, k)*x^k*(1 - x)^(n - k), k, 0, n); abs(x - 1/2)
x: 0, 1
y: 0, 0.55
sliders: n=10:1:60:1
labels: B_n f; f(x) = \lvert x - \tfrac12\rvert
caption: 带角点的函数$\lvert x - \tfrac12\rvert$的伯恩斯坦多项式。增大$n$：多项式一致地、但缓慢地向图像逼近——在角点处误差仍约为$0.4/\sqrt n$。魏尔斯特拉斯定理保证每个连续函数（包括带角点的函数）都能被一致逼近，但对逼近的速度只字未提。
:::

::: history
柯西（Cauchy）的《分析教程》（*Cours d'analyse*，1821年）断言，由连续函数构成的收敛级数，其和是连续的；1826年，尼尔斯·亨里克·阿贝尔（Niels Henrik Abel）给出了反例$\sum(-1)^{n+1}\sin(nx)/n$。1847年，菲利普·路德维希·冯·赛德尔（Philipp Ludwig von Seidel）和乔治·加布里埃尔·斯托克斯（George Gabriel Stokes）各自独立地找到了漏洞所在：在某一点附近收敛变得任意缓慢。一致收敛的概念出现在克里斯托夫·古德曼（Christoph Gudermann）1838年起的工作中，他的学生卡尔·魏尔斯特拉斯（Karl Weierstrass）在柏林的讲课中使之成为分析学的核心概念。魏尔斯特拉斯在1872年向柏林科学院提交了他的处处不可导的连续函数，并在1885年证明了逼近定理。1912年，谢尔盖·伯恩斯坦（Sergei Bernstein）用以他的名字命名的多项式给出了概率论证明；1916年，G. H. 哈代（G. H. Hardy）推广了魏尔斯特拉斯的不可导性结果。
:::

## 后续内容

一致收敛就是按上确界范数收敛，在[[real-analysis/metric-spaces]]一章中，它成为度量空间$C[a, b]$中的收敛；[[#thm-uniform-cauchy]]说明这个空间是完备的，这是压缩映射原理以及微分方程存在性定理（[[ode/existence-uniqueness]]）的关键。傅里叶级数（[[pde/fourier-series]]）很少一致收敛——阿贝尔的例子就有跳跃——因而需要更弱的收敛概念。测度论提供了这些概念：在[[measure-theory/lebesgue-integral]]一章中，单调收敛定理和控制收敛定理允许在比一致收敛弱得多的假设下交换极限与积分的次序，而[[measure-theory/lp-spaces]]一章比较了函数收敛的多种方式。在复平面中，幂级数的性态甚至更好：[[complex-analysis/analytic-functions]]一章表明，复可微函数总是其泰勒级数之和。

::: summary
- 逐点收敛（在每个$x$处$f_n(x) \to f(x)$）不能保持连续性（$x^n$）、积分（逃逸的鼓包）或导数（$\sin(nx)/\sqrt n$）。
- 一致收敛：$\sup_x\abs{f_n(x) - f(x)} \to 0$——一个$N$对所有$x$都适用（[[#def-uniform]]）；它有柯西准则（[[#thm-uniform-cauchy]]）。
- 连续函数的一致极限连续（$\eps/3$论证，[[#thm-uniform-continuous]]）；一致极限的积分等于积分的极限。
- 对于导数，要求$f_n'$一致收敛，且函数列在某一点处收敛（[[#thm-uniform-derivative]]）。
- 魏尔斯特拉斯M判别法：由$\abs{f_n} \le M_n$且$\sum M_n < \infty$可得一致收敛；它表明魏尔斯特拉斯的处处不可导函数是连续的。
- 幂级数在其收敛半径$R = 1/\limsup\abs{c_n}^{1/n}$以内绝对收敛，在更小的闭区间上一致收敛，并且在那里可以逐项求导和逐项积分。
- $[a, b]$上的每个连续函数都是多项式的一致极限（魏尔斯特拉斯），例如是它的伯恩斯坦多项式的一致极限。
:::

## 习题

::: exercise 一致收敛而导数不收敛 {level=1}
证明$f_n(x) = \dfrac{\sin(nx)}{n}$在$\R$上一致收敛于$0$，但$f_n'(0) \not\to 0$，并且$(f_n'(\pi))$不收敛。
::: solution
对所有$x$有$\abs{f_n(x)} \le 1/n$，所以$\norm{f_n}_\infty \le 1/n \to 0$。但$f_n'(x) = \cos(nx)$，且对每个$n$都有$f_n'(0) = 1$，它不趋于极限函数的导数$0$。（在$x = \pi$处，$f_n'(\pi) = (-1)^n$根本不收敛。）
:::
:::

::: exercise 求收敛半径 {level=1 check="3"}
求$\displaystyle\sum_{n=1}^\infty\frac{n^2}{3^n}x^n$的收敛半径。
::: solution
由于$n^{1/n} \to 1$，$\abs{c_n}^{1/n} = \frac{(n^{1/n})^2}{3} \to \frac13$。由[[#thm-cauchy-hadamard]]，$R = 3$。（比值判别法给出同样的结果：$\frac{c_{n+1}}{c_n} = \frac{(n+1)^2}{3n^2} \to \frac13$。）
:::
:::

::: exercise 有界定义域与无界定义域 {level=1}
设$f_n(x) = \dfrac{x^2}{n}$。证明在$[-5, 5]$上一致地有$f_n \to 0$，但在$\R$上不是一致的。
::: solution
在$[-5, 5]$上，$\sup\abs{f_n} = 25/n \to 0$。在$\R$上，对每个$n$都有$f_n(\sqrt n) = 1$，所以$\norm{f_n}_\infty \ge 1$（事实上它是无穷大），因而收敛不是一致的，尽管对每个$x$都有$f_n(x) \to 0$。
:::
:::

::: exercise 移动的峰 {level=2}
设$[0, 1]$上的$f_n(x) = \dfrac{nx}{1 + n^2x^2}$。求其逐点极限，并证明收敛在$[0, 1]$上不是一致的，但对每个$\delta > 0$，在$[\delta, 1]$上是一致的。
::: solution
$f_n(0) = 0$，而当$x > 0$时，$f_n(x) \le \frac{nx}{n^2x^2} = \frac{1}{nx} \to 0$。所以$f_n \to 0$逐点成立。但对每个$n$都有$f_n(1/n) = \frac{1}{2}$，所以$\norm{f_n}_\infty \ge \frac12$，收敛不是一致的。在$[\delta, 1]$上，同样的估计给出$\sup\abs{f_n} \le \frac{1}{n\delta} \to 0$，所以在那里收敛是一致的。（位于$x = 1/n$处的峰跑进了角落$x = 0$。）
:::
:::

::: exercise 对级数求导 {level=2 check="2"}
利用几何级数的逐项求导，求$\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$。
::: hint
当$\abs x < 1$时，$\sum_{n\ge0}x^n = \frac{1}{1-x}$；求导后再乘以$x$。
:::
::: solution
由[[#thm-power-series]]，在$(-1, 1)$上对$\sum_{n\ge0}x^n = \frac1{1-x}$求导，得$\sum_{n\ge1}nx^{n-1} = \frac{1}{(1-x)^2}$，所以$\sum_{n\ge1}nx^n = \frac{x}{(1-x)^2}$。在$x = \frac12$处，它等于$\frac{1/2}{1/4} = 2$。
:::
:::

::: exercise 由级数给出的连续函数 {level=2}
证明$f(x) = \displaystyle\sum_{n=1}^\infty\frac{\sin(nx)}{n^2}$在$\R$上连续，并且$\displaystyle\int_0^\pi f(x)\,dx = \sum_{k=1}^\infty\frac{2}{(2k-1)^3}$。
::: solution
各项以$1/n^2$为界，所以由M判别法，级数在$\R$上一致收敛，再由[[#thm-uniform-continuous]]，$f$连续。由[[#thm-uniform-integral]]，可以在$[0, \pi]$上逐项积分：

$$
\int_0^\pi\frac{\sin(nx)}{n^2}\,dx = \frac{1 - \cos(n\pi)}{n^3} = \begin{cases}2/n^3 & n \text{ 为奇数},\\ 0 & n\text{ 为偶数},\end{cases}
$$

所以$\int_0^\pi f = \sum_{k\ge1}\frac{2}{(2k-1)^3}$。
:::
:::

::: exercise 迪尼定理 {level=3}
设$f_n\colon [a, b] \to \R$连续，对每个$x$有$f_1(x) \ge f_2(x) \ge f_3(x) \ge \cdots$，且对每个$x$有$f_n(x) \to 0$。证明在$[a, b]$上一致地有$f_n \to 0$。
::: hint
用反证法：若对所有$n$有$\sup f_n \ge \eps$，取$x_n$使$f_n(x_n) \ge \eps$，然后结合波尔查诺-魏尔斯特拉斯定理和关于$n$的单调性。
:::
::: solution
注意$f_n \ge 0$（极限为$0$的递减数列始终不小于$0$），所以$\norm{f_n}_\infty = \sup f_n$，它随$n$递减。假设它不趋于$0$：则存在$\eps > 0$，使得对所有$n$有$\sup f_n \ge \eps$；又由于$f_n$在$[a,b]$上连续，上确界可以取到（[[real-analysis/continuity#thm-evt]]）：对某个$x_n$有$f_n(x_n) \ge \eps$。由波尔查诺-魏尔斯特拉斯定理，存在子列$x_{n_j} \to c \in [a, b]$。任意固定$m$。当$n_j \ge m$时，由单调性得$f_m(x_{n_j}) \ge f_{n_j}(x_{n_j}) \ge \eps$，令$j \to \infty$，由$f_m$的连续性得$f_m(c) \ge \eps$。这对每个$m$都成立，与$f_m(c) \to 0$矛盾。因此一致地有$f_n \to 0$。（$[0, 1)$上的函数$x^n$表明定义域的紧性是必需的；在$[0,1]$上，极限在$x = 1$处不为$0$。）
:::
:::

::: exercise 直线上多项式的一致极限 {level=3}
设多项式$p_n$在$\R$上一致收敛于函数$f$。证明$f$是多项式。
::: hint
当$m, n$充分大时，多项式$p_n - p_m$在$\R$上有界。
:::
::: solution
由[[#thm-uniform-cauchy]]，存在$N$，使得对所有$x \in \R$和$m, n \ge N$有$\abs{p_n(x) - p_m(x)} < 1$。在$\R$上有界的多项式是常数（非常数多项式在$x \to \infty$时趋于$\pm\infty$）。所以对每个$n \ge N$，$p_n - p_N = c_n$是常数。由于$p_n(0) \to f(0)$，常数$c_n = p_n(0) - p_N(0)$收敛于某个$c$。于是对每个$x$，$f(x) = \lim_n p_n(x) = p_N(x) + c$，这是一个多项式。（所以魏尔斯特拉斯定理在无界区间上完全不成立：$e^x$不是$\R$上多项式的一致极限。）
:::
:::

::: exercise 大二学生之梦 {level=3}
证明约翰·伯努利（Johann Bernoulli）的恒等式$\displaystyle\int_0^1 x^{-x}\,dx = \sum_{n=1}^\infty\frac{1}{n^n}$。
::: hint
写出$x^{-x} = e^{-x\ln x} = \sum_{k\ge0}\frac{(-x\ln x)^k}{k!}$，利用在$(0, 1]$上$\abs{x\ln x} \le 1/e$，并通过代换$x = e^{-t}$证明$\int_0^1(-x\ln x)^k\,dx = \frac{k!}{(k+1)^{k+1}}$。
:::
::: solution
当$0 < x \le 1$时令$u(x) = -x\ln x$，并令$u(0) = 0$；$u$在$[0, 1]$上连续，且$0 \le u \le 1/e$（最大值在$x = 1/e$处取得）。取$M_k = e^{-k}/k!$，由M判别法，指数级数$e^u = \sum_k u^k/k!$在$[0, 1]$上一致收敛。由[[#thm-uniform-integral]]，

$$
\int_0^1 x^{-x}\,dx = \int_0^1 e^{u(x)}\,dx = \sum_{k=0}^\infty\frac{1}{k!}\int_0^1(-x\ln x)^k\,dx.
$$

令$x = e^{-t}$（于是$-\ln x = t$，$dx = -e^{-t}dt$），则$\int_0^1(-x\ln x)^k\,dx = \int_0^\infty t^ke^{-(k+1)t}\,dt = \frac{k!}{(k+1)^{k+1}}$，这里用到了$\int_0^\infty t^ke^{-st}\,dt = k!/s^{k+1}$（这是一个反常积分；当$k \ge 1$时，被积函数$(-x\ln x)^k$在$[0,1]$上连续，当$k = 0$时积分为$1$）。因此和为$\sum_{k\ge0}\frac{1}{(k+1)^{k+1}} = \sum_{n\ge1}n^{-n} \approx 1.29129$。
:::
:::
