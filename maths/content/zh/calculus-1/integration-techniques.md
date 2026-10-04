求导是一个机械的过程：利用[[calculus-1/derivatives]]和[[calculus-1/chain-rule]]两章中的法则，任何初等函数，无论多么复杂，都能求出导数。积分则不同。微积分基本定理（[[calculus-1/integrals]]）把$\int_a^bf$的计算归结为求一个原函数，但对于原函数，并没有总能奏效的乘积法则、商法则或链式法则。我们有的只是一套方法，每种方法都把一个积分转化为更容易的积分——此外还需要在这些方法之间作出选择的一些技巧。

两种最重要的方法都是倒过来读的求导法则：链式法则变成**换元法**，乘积法则变成**分部积分法**。此外，我们还要介绍适用于特定类型被积函数的代数方法：用三角恒等式处理正弦和余弦的幂，用**三角代换**处理二次式的平方根，用**部分分式**处理有理函数。最后，我们会遇到任何方法都无法求出封闭形式的积分，例如$\int e^{-x^2}\,dx$，并看看这时能做些什么。

请始终记住：任何一个候选的原函数都可以通过求导来检验。即使求原函数的过程并不机械，这种检验也是机械的。

## 换元法

由链式法则，$\frac{d}{dx}F(g(x)) = F'(g(x))\,g'(x)$。倒过来读，形如$f(g(x))\,g'(x)$的被积函数——“$g(x)$的一个函数乘以$g(x)$的导数”——有原函数$F(g(x))$，其中$F' = f$。

::: theorem 换元积分法则 {#thm-substitution}
设$g$在区间$I$上有连续导数，$f$在一个包含$g(I)$的区间上连续。若$F$是$f$的一个原函数，则

$$
\int f\bigl(g(x)\bigr)\,g'(x)\,dx = F\bigl(g(x)\bigr) + C,
$$

并且对$a, b\in I$，

$$
\int_a^b f\bigl(g(x)\bigr)\,g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du.
$$ {#eq-substitution}
:::

::: proof
由链式法则，$\frac{d}{dx}F(g(x)) = f(g(x))\,g'(x)$，这就证明了第一个公式。[[#eq-substitution]]中两边的被积函数都连续，所以可以用微积分基本定理（[[calculus-1/integrals#thm-ftc2]]）计算两边：左边等于$F(g(b)) - F(g(a))$，因为$F\circ g$是其被积函数的一个原函数；右边也等于$F(g(b)) - F(g(a))$，因为$F$是$f$的一个原函数。
:::

实际计算时，换元借助莱布尼茨（Leibniz）记号来进行：令$u = g(x)$，写出$du = g'(x)\,dx$，再把出现$x$的每一处都换成$u$。记号替我们完成了记账工作，而上述定理保证了这种做法完全合理。

::: intuition 为什么会出现因子 g′(x)
考虑$u$轴上$\int f(u)\,du$的一个黎曼和。若$u = g(x)$，则$x$轴上长度为$\Delta x$的一个小区间被映成$u$轴上长度为$\Delta u\approx g'(x)\,\Delta x$的区间：$g'(x)$是这一代换的局部伸缩因子。因此，$u$轴上和式的每一项$f(u)\,\Delta u$都近似等于$x$轴上的$f(g(x))\,g'(x)\,\Delta x$。换元积分法则说的是：取极限后，这些近似变成了精确的等式。在多元情形中，伸缩因子变成了雅可比行列式（[[multivariable/change-of-variables]]）。
:::

::: example 换元积分 {#ex-substitution}
求(a)$\displaystyle\int2x\cos(x^2)\,dx$；(b)$\displaystyle\int\frac{x}{x^2+1}\,dx$；(c)$\displaystyle\int\tan x\,dx$；(d)$\displaystyle\int_0^1x\sqrt{1 - x^2}\,dx$。
::: solution
(a) 令$u = x^2$，$du = 2x\,dx$：$\int\cos u\,du = \sin u + C = \sin(x^2) + C$。

(b) 令$u = x^2 + 1$，则$du = 2x\,dx$，所以$x\,dx = \frac12du$：

$$
\int\frac{x}{x^2+1}\,dx = \frac12\int\frac{du}{u} = \frac12\ln\abs{u} + C = \frac12\ln(x^2+1) + C.
$$

分母的导数只需在相差一个常数因子的意义下出现即可。

(c) 写成$\tan x = \frac{\sin x}{\cos x}$，并令$u = \cos x$，$du = -\sin x\,dx$：

$$
\int\tan x\,dx = -\int\frac{du}{u} = -\ln\abs{\cos x} + C = \ln\abs{\sec x} + C.
$$

(d) 令$u = 1 - x^2$，$du = -2x\,dx$。积分限也随之改变：$x = 0$对应$u = 1$，$x = 1$对应$u = 0$。由[[#eq-substitution]]，

$$
\int_0^1x\sqrt{1-x^2}\,dx = -\frac12\int_1^0\sqrt{u}\,du = \frac12\int_0^1u^{1/2}\,du = \frac12\cdot\frac23 = \frac13 .
$$
:::
:::

::: warning 改变积分限，并彻底消去 x
在定积分中，要么把积分限换成$u$的相应值（如(d)所示），要么先换回$x$再代入原来的积分限——切勿把两种做法混在一起。此外，换元之后不能残留任何$x$：在$\int x^2\sqrt{1 - x^2}\,dx$中，若取$u = 1-x^2$，就会剩下一个因子$x$，它无法仅用$du = -2x\,dx$来表示（还需要$x = \sqrt{1-u}$），这表明这个代换不会使问题简化。这时需要另一种方法（下文的三角代换）。
:::

::: widget plot
f: 2x*cos(x^2); cos(x)
x: -0.5, 3.6
y: -4, 4
shade: 0, sqrt(pi)
labels: 2x\cos(x^2); \cos u
caption: 代换$u = x^2$把$\int_0^{\sqrt\pi}2x\cos(x^2)\,dx$（阴影部分）变成$\int_0^{\pi}\cos u\,du$（$[0,\pi]$上的橙色曲线）。两个区域看上去完全不同——随着$x$增大，前者振荡得更快，也变得更高——但它们的有向面积相等，都等于$\sin\pi - \sin 0 = 0$。因子$2x = du/dx$恰好补偿了坐标轴的伸缩。
:::

::: quiz
$\displaystyle\int\cos(5x)\,dx$等于什么？
- [x] $\frac15\sin(5x) + C$
- [ ] $5\sin(5x) + C$
- [ ] $\sin(5x) + C$
- [ ] $-\frac15\sin(5x) + C$
::: solution
令$u = 5x$，则$dx = \frac15du$，所以$\int\cos(5x)\,dx = \frac15\sin(5x) + C$。求导检验：链式法则产生的因子$5$与$\frac15$相消。答案$5\sin 5x$来自乘以内层函数的导数，而不是除以它。
:::
:::

## 分部积分法

对乘积法则$(uv)' = u'v + uv'$积分，就得到第二种重要方法。

::: theorem 分部积分公式 {#thm-parts}
若$u$和$v$在某区间上有连续导数，则

$$
\int u(x)\,v'(x)\,dx = u(x)\,v(x) - \int u'(x)\,v(x)\,dx,
$$

并且对该区间中的$a$，$b$，

$$
\int_a^bu\,v'\,dx = \bigl[u\,v\bigr]_a^b - \int_a^bu'\,v\,dx .
$$ {#eq-parts}
:::

::: proof
由乘积法则，$uv$是连续函数$u'v + uv'$的一个原函数。所以$\int(u'v + uv')\,dx = uv + C$，移项即得第一个公式。对于定积分的情形，由微积分基本定理得$\int_a^b(u'v + uv')\,dx = \bigl[uv\bigr]_a^b$，再利用线性性把积分拆开即可。
:::

用微分记号，这一法则写作$\int u\,dv = uv - \int v\,du$。技巧在于如何选取$u$和$dv$：我们希望$u$求导后变得更简单，而$dv$容易积分。一个粗略的准则是：在列表**对数函数、反三角函数、代数函数（幂函数）、三角函数、指数函数**中，取最先出现的那个因子作为$u$。

::: example 分部积分 {#ex-parts}
求(a)$\displaystyle\int xe^x\,dx$；(b)$\displaystyle\int\ln x\,dx$；(c)$\displaystyle\int x^2\sin x\,dx$；(d)$\displaystyle\int e^x\sin x\,dx$。
::: solution
(a) 取$u = x$，$dv = e^x\,dx$，则$du = dx$，$v = e^x$：

$$
\int xe^x\,dx = xe^x - \int e^x\,dx = (x - 1)e^x + C.
$$

（反过来取$u = e^x$，$dv = x\,dx$，会得到$\int\frac{x^2}{2}e^x\,dx$，情况反而更糟。）

(b) 被积函数似乎只有一个因子，但我们可以取$u = \ln x$，$dv = dx$，则$du = \frac{dx}{x}$，$v = x$：

$$
\int\ln x\,dx = x\ln x - \int x\cdot\frac1x\,dx = x\ln x - x + C.
$$

(c) 两轮分部积分把$x$的幂次降为零。取$u = x^2$，$dv = \sin x\,dx$：$\int x^2\sin x\,dx = -x^2\cos x + \int2x\cos x\,dx$。再取$u = 2x$，$dv = \cos x\,dx$：$\int2x\cos x\,dx = 2x\sin x - \int2\sin x\,dx = 2x\sin x + 2\cos x$。合起来，

$$
\int x^2\sin x\,dx = -x^2\cos x + 2x\sin x + 2\cos x + C.
$$

(d) 两个因子求导后都不会变简单，但两次分部积分会使原积分重新出现。记$I = \int e^x\sin x\,dx$。取$u = \sin x$，$dv = e^x\,dx$：$I = e^x\sin x - \int e^x\cos x\,dx$。取$u = \cos x$，$dv = e^x\,dx$：$\int e^x\cos x\,dx = e^x\cos x + \int e^x\sin x\,dx = e^x\cos x + I$。因此

$$
I = e^x\sin x - e^x\cos x - I \quad\Longrightarrow\quad I = \frac{e^x}{2}(\sin x - \cos x) + C.
$$

（解出$I$时必须记住任意常数；它在最后加上。）
:::
:::

::: quiz
对于$\displaystyle\int x\ln x\,dx$，$u$和$dv$怎样选取能得到更容易的积分？
- [x] $u = \ln x$，$dv = x\,dx$
- [ ] $u = x$，$dv = \ln x\,dx$
- [ ] $u = x\ln x$，$dv = dx$
- [ ] 这里不能使用分部积分法
::: solution
取$u = \ln x$，$dv = x\,dx$，得$du = \frac{dx}x$，$v = \frac{x^2}{2}$，所以$\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int\frac x2\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C$。另外两种选法最终也能成功，但不那么直接：每一种都会使$\int x\ln x\,dx$本身重新出现，然后必须像[[#ex-parts]]的(d)那样把它解出来。
:::
:::

::: remark 把导数从一个因子移到另一个因子上
分部积分把导数从被积函数的一个因子转移到另一个因子上，代价是多出一个边界项并改变符号。当边界项为零时——因为某个因子在两个端点处都为零，或者因为一切都在无穷远处衰减——这一法则就简化为$\int_a^bu\,v' = -\int_a^bu'\,v$。这种形式在物理学和微分方程理论中经常使用：正是用这种方法，导数从未知函数上被移到已知函数上；在[[pde/fourier-series]]一章中，它解释了为什么光滑函数的傅里叶系数下降得很快。
:::

分部积分还能给出**递推公式**，它把含有幂次$n$的积分用同类型但幂次更低的积分来表示。

::: example 一个递推公式 {#ex-reduction}
设$I_n = \displaystyle\int_0^{\pi/2}\sin^nx\,dx$。证明当$n\ge2$时$I_n = \dfrac{n-1}{n}I_{n-2}$，并计算$I_4$。
::: solution
写出$\sin^nx = \sin^{n-1}x\cdot\sin x$，取$u = \sin^{n-1}x$，$dv = \sin x\,dx$作分部积分，则$du = (n-1)\sin^{n-2}x\cos x\,dx$，$v = -\cos x$。当$n\ge2$时，边界项$\bigl[-\sin^{n-1}x\cos x\bigr]_0^{\pi/2}$为零，所以

$$
I_n = (n-1)\int_0^{\pi/2}\sin^{n-2}x\cos^2x\,dx = (n-1)\int_0^{\pi/2}\sin^{n-2}x\,(1 - \sin^2x)\,dx = (n-1)(I_{n-2} - I_n).
$$

解出$I_n$得$nI_n = (n-1)I_{n-2}$。由于$I_0 = \frac\pi2$，

$$
I_4 = \frac34I_2 = \frac34\cdot\frac12I_0 = \frac{3\pi}{16}.
$$

类似地，从$I_1 = 1$出发可知，奇数次幂的积分都是有理数（[[#exr-wallis]]）。
:::
:::

## 三角函数的积分

正弦与余弦的幂之积的积分，可以利用恒等式$\sin^2x + \cos^2x = 1$和二倍角公式$\cos^2x = \frac{1+\cos2x}{2}$，$\sin^2x = \frac{1 - \cos2x}{2}$（[[calculus-1/real-functions#eq-double-angle]]）来处理。对于$\int\sin^mx\cos^nx\,dx$：

- **若$n$为奇数**，留出一个因子$\cos x$，把余下的余弦偶次幂化为正弦，再令$u = \sin x$。
- **若$m$为奇数**，留出一个因子$\sin x$，把其余部分化为余弦，再令$u = \cos x$。
- **若两者都是偶数**，用二倍角公式把幂次减半，必要时反复进行。

::: example 正弦与余弦的幂 {#ex-trig-integrals}
求(a)$\displaystyle\int\sin^3x\,dx$；(b)$\displaystyle\int\sin^2x\cos^3x\,dx$；(c)$\displaystyle\int_0^\pi\sin^2x\,dx$。
::: solution
(a) 留出一个$\sin x$：$\sin^3x = (1 - \cos^2x)\sin x$。令$u = \cos x$，$du = -\sin x\,dx$，

$$
\int\sin^3x\,dx = -\int(1 - u^2)\,du = -u + \frac{u^3}{3} + C = -\cos x + \frac{\cos^3x}{3} + C.
$$

(b) 余弦的幂次是奇数：$\sin^2x\cos^3x = \sin^2x(1 - \sin^2x)\cos x$。令$u = \sin x$，

$$
\int\sin^2x\cos^3x\,dx = \int(u^2 - u^4)\,du = \frac{\sin^3x}{3} - \frac{\sin^5x}{5} + C.
$$

(c) 两个幂次都是偶数，所以利用$\sin^2x = \frac{1-\cos2x}{2}$：

$$
\int_0^\pi\sin^2x\,dx = \int_0^\pi\frac{1 - \cos2x}{2}\,dx = \Bigl[\frac x2 - \frac{\sin2x}{4}\Bigr]_0^\pi = \frac\pi2.
$$

这恰好是区间长度的一半：在一个完整周期上，$\sin^2$与$\cos^2$的积分相同，而两者之和为$1$，所以各自的平均值都是$\frac12$——这一事实在物理学和信号处理中经常用到。
:::
:::

::: warning 形式不同的答案可能都正确
用不同方法求出的不定积分，形式往往不同。对于$\int\sin x\cos x\,dx$，代换$u = \sin x$给出$\frac12\sin^2x + C$，代换$u = \cos x$给出$-\frac12\cos^2x + C$，而利用恒等式$\sin x\cos x = \frac12\sin2x$则得到$-\frac14\cos2x + C$。三者都正确：它们只相差常数（$\frac12\sin^2x + \frac12\cos^2x = \frac12$，$\frac12\sin^2x + \frac14\cos 2x = \frac14$），这些常数被任意常数$C$吸收了。把你的答案与书上的答案比较时，应对两者都求导，而不是设法让它们的形式一致。
:::

正切与正割的积分可以类似地处理，要用到$\sec^2x = 1 + \tan^2x$以及导数$(\tan x)' = \sec^2x$，$(\sec x)' = \sec x\tan x$。有一个积分需要一点技巧：分子分母同乘以$\sec x + \tan x$，

$$
\int\sec x\,dx = \int\frac{\sec^2x + \sec x\tan x}{\sec x + \tan x}\,dx = \ln\abs{\sec x + \tan x} + C,
$$

这是因为分子恰好是分母的导数。

## 三角代换

二次式的平方根可以通过代入一个三角函数、并利用三角函数的平方关系来消去：

| 表达式 | 代换 | 所用恒等式 |
|---|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta,\ -\frac\pi2\le\theta\le\frac\pi2$ | $1 - \sin^2\theta = \cos^2\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta,\ -\frac\pi2<\theta<\frac\pi2$ | $1 + \tan^2\theta = \sec^2\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta,\ 0\le\theta<\frac\pi2$（当$x \ge a$时） | $\sec^2\theta - 1 = \tan^2\theta$ |

这里代换的方向相反，是$x = g(\theta)$，其合理性来自从右往左读的[[#thm-substitution]]：对$\theta$的限制使$g$成为一一映射，因此可以通过$\theta = g^{-1}(x)$回到$x$；这一限制还确定了平方根的符号（例如在$[-\frac\pi2,\frac\pi2]$上$\cos\theta\ge0$，所以$\sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta$）。

::: example 圆的面积 {#ex-circle-area}
求$\displaystyle\int\sqrt{1 - x^2}\,dx$，并由此推出半径为$r$的圆的面积为$\pi r^2$。
::: solution
令$x = \sin\theta$，$\theta\in[-\frac\pi2,\frac\pi2]$，则$dx = \cos\theta\,d\theta$，$\sqrt{1 - x^2} = \cos\theta$。于是

$$
\int\sqrt{1-x^2}\,dx = \int\cos^2\theta\,d\theta = \frac\theta2 + \frac{\sin2\theta}{4} + C = \frac{\theta + \sin\theta\cos\theta}{2} + C = \frac{\arcsin x + x\sqrt{1-x^2}}{2} + C,
$$

这里利用$\sin2\theta = 2\sin\theta\cos\theta$和$\cos\theta = \sqrt{1-x^2}$换回了$x$。

圆$x^2 + y^2 = r^2$的上半部分是$\sqrt{r^2 - x^2}$的图像。代入$x = rs$并利用上面的结果，

$$
\int_{-r}^r\sqrt{r^2 - x^2}\,dx = r^2\int_{-1}^1\sqrt{1-s^2}\,ds = r^2\Bigl[\frac{\arcsin s + s\sqrt{1-s^2}}{2}\Bigr]_{-1}^1 = r^2\cdot\frac{\frac\pi2 - (-\frac\pi2)}{2} = \frac{\pi r^2}{2}.
$$

所以整个圆盘的面积为$\pi r^2$。这印证了熟知的公式，但在本课程中它并不是一个独立的证明：$\sin$的导数依赖于$\lim_{x\to0}\frac{\sin x}{x} = 1$，而[[calculus-1/limits#thm-sinx]]中对这一极限的证明比较的正是扇形的面积。完全避免循环论证的处理方式是用幂级数定义$\sin$和$\cos$（[[calculus-2/power-series]]），再通过它们定义$\pi$；这样一来，上述计算就真正证明了圆盘的面积是$\pi r^2$。
:::
:::

::: example 正切代换 {#ex-tan-sub}
求$\displaystyle\int\frac{dx}{(1 + x^2)^{3/2}}$。
::: solution
令$x = \tan\theta$，$\theta\in(-\frac\pi2,\frac\pi2)$，则$dx = \sec^2\theta\,d\theta$，$1 + x^2 = \sec^2\theta$，从而$(1+x^2)^{3/2} = \sec^3\theta$（因为在该区间上$\sec\theta>0$）。于是

$$
\int\frac{dx}{(1+x^2)^{3/2}} = \int\frac{\sec^2\theta}{\sec^3\theta}\,d\theta = \int\cos\theta\,d\theta = \sin\theta + C = \frac{x}{\sqrt{1+x^2}} + C,
$$

其中$\sin(\arctan x)$的表达式用到了[[calculus-1/real-functions#ex-arc-compositions]]。求导即可验证这一答案。
:::
:::

第三种代换的做法相同。例如，对$x>1$，令$x = \sec\theta$，$0\le\theta<\frac\pi2$，则$dx = \sec\theta\tan\theta\,d\theta$，且$\sqrt{x^2 - 1} = \tan\theta\ge0$。于是

$$
\int\frac{dx}{\sqrt{x^2-1}} = \int\frac{\sec\theta\tan\theta}{\tan\theta}\,d\theta = \int\sec\theta\,d\theta = \ln(\sec\theta + \tan\theta) + C = \ln\bigl(x + \sqrt{x^2-1}\bigr) + C.
$$

所得结果正是[[calculus-1/real-functions#eq-hyperbolic]]中双曲余弦的反函数，这解释了为什么像$x = \cosh t$这样的双曲代换为求同样的积分提供了另一条途径。

## 部分分式

要积分有理函数$p(x)/q(x)$，先用多项式除法把它化为**真分式**（$\deg p<\deg q$），再把它拆成可以直接积分的简单部分。

::: theorem 部分分式分解 {#thm-partial-fractions}
设$p/q$是有理真分式，把$q$分解为一次因式$(x - r)$与满足$b^2 < 4c$的不可约二次因式$(x^2 + bx + c)$的乘积。则$p/q$是若干如下形式的项之和：

$$
\frac{A}{(x - r)^k} \qquad\text{和}\qquad \frac{Bx + C}{(x^2 + bx + c)^k},
$$

其中对$q$的每个因式$(x - r)^m$，都出现$k = 1, \dots, m$的各项，每个二次因式的情形类似；常数$A$、$B$、$C$是唯一确定的。
:::

::: proof {collapsed}
**证明概要。**每个实系数多项式都能分解为实的一次因式与不可约二次因式之积，这是代数基本定理的推论：实系数多项式的复根成共轭对$\alpha, \bar\alpha$出现，而$(x - \alpha)(x - \bar\alpha)$是实系数二次式（[[complex-analysis/cauchy-theorem]]一章证明了代数基本定理）。若$q = q_1q_2$，且$q_1$与$q_2$没有公因式，则多项式的欧几里得算法（辗转相除法）给出满足$s_1q_1 + s_2q_2 = 1$的多项式$s_1, s_2$，所以$\frac{p}{q} = \frac{ps_2}{q_1} + \frac{ps_1}{q_2}$；反复这样做，就把$p/q$拆成了分母都是单个因式之幂的若干分式，再把分子按该因式的幂展开，就得到所列的各项。唯一性可通过比较系数得到。有关的代数内容见[[abstract-algebra/polynomials]]。
:::

求这些常数时，先在等式两边同乘以$q(x)$，然后比较系数，或者代入$x$的一些方便的值。对于单重一次因式$x - r$，代入$x = r$可以立即分离出它的系数（即“遮盖法”）：其余各项都还含有因子$x - r$，因而为零。检验分解形式的一个有用方法是数未知数的个数。重复$m$次的一次因式贡献$m$个常数，重复$m$次的二次因式贡献$2m$个常数，所以未知数的总数总是等于$q$的次数——恰好是真分式$p/q$的分子所能有的系数个数。因此，比较系数得到的是一个方程个数与未知数个数相等的线性方程组，而定理保证了它有唯一解。

::: example 部分分式 {#ex-partial-fractions}
求(a)$\displaystyle\int\frac{x+5}{x^2 + x - 2}\,dx$；(b)$\displaystyle\int\frac{dx}{x^2(x+1)}$；(c)$\displaystyle\int\frac{2x + 3}{x^2 + 2x + 5}\,dx$。
::: solution
(a) 分母可分解为$(x-1)(x+2)$，所以设$\dfrac{x+5}{(x-1)(x+2)} = \dfrac{A}{x-1} + \dfrac{B}{x+2}$，即$x + 5 = A(x+2) + B(x-1)$。令$x = 1$：$6 = 3A$，所以$A = 2$。令$x = -2$：$3 = -3B$，所以$B = -1$。因此

$$
\int\frac{x+5}{x^2+x-2}\,dx = 2\ln\abs{x-1} - \ln\abs{x+2} + C.
$$

(b) 重因式$x^2$需要两项：$\dfrac{1}{x^2(x+1)} = \dfrac Ax + \dfrac B{x^2} + \dfrac{C}{x+1}$，所以$1 = Ax(x+1) + B(x+1) + Cx^2$。令$x = 0$：$B = 1$。令$x = -1$：$C = 1$。比较$x^2$的系数：$0 = A + C$，所以$A = -1$。因此

$$
\int\frac{dx}{x^2(x+1)} = -\ln\abs{x} - \frac1x + \ln\abs{x+1} + C.
$$

(c) $x^2 + 2x + 5$的判别式为$4 - 20<0$，所以它不可约。配方得$x^2 + 2x + 5 = (x+1)^2 + 4$，再把分子拆成分母导数的倍数加上一个常数：$2x + 3 = (2x + 2) + 1$。于是

$$
\int\frac{2x+3}{x^2+2x+5}\,dx = \int\frac{2x+2}{x^2+2x+5}\,dx + \int\frac{dx}{(x+1)^2 + 4} = \ln(x^2+2x+5) + \frac12\arctan\frac{x+1}{2} + C,
$$

其中第一个积分用了$u = x^2 + 2x + 5$，第二个积分用了$u = \frac{x+1}{2}$。
:::
:::

::: application 逻辑斯谛增长
资源有限的种群$P(t)$常用**逻辑斯谛方程**$\frac{dP}{dt} = kP\bigl(1 - \frac PM\bigr)$来建模，其中$k>0$是增长率，$M$是环境容纳量。分离变量（这一方法的合理性见[[ode/first-order]]）得到$\int\frac{M\,dP}{P(M-P)} = \int k\,dt$。由部分分式得$\frac{M}{P(M-P)} = \frac1P + \frac{1}{M-P}$，所以当$0<P<M$时

$$
\ln\frac{P}{M-P} = kt + C, \qquad\text{从而}\qquad P(t) = \frac{M}{1 + Ae^{-kt}}
$$

其中常数$A>0$由初始种群数量确定。由此得到的S形曲线——开始时增长缓慢，中间阶段增长迅速，最后在$M$处趋于饱和——描述了传染病和创新的传播、酵母菌培养物的增长以及新技术的普及。
:::

::: widget plot
f: 1/(x^2 - 1); 0.5/(x - 1); -0.5/(x + 1)
x: -4, 4
y: -5, 5
vlines: -1; 1
labels: \frac{1}{x^2-1}; \frac{1/2}{x-1}; \frac{-1/2}{x+1}
caption: 部分分式分解$\frac{1}{x^2-1} = \frac{1/2}{x-1} - \frac{1/2}{x+1}$把一个有两条竖直渐近线的函数拆成两条简单的双曲线，每条渐近线对应一条。把鼠标悬停在任意$x$处，检验蓝色曲线的值是另外两条曲线的值之和。每条双曲线积分后都是一个对数，从而得到$\int\frac{dx}{x^2-1} = \frac12\ln\bigl\lvert\frac{x-1}{x+1}\bigr\rvert + C$。
:::

::: quiz
$\dfrac{3x+1}{(x-1)^2(x^2+1)}$的部分分式分解的正确形式是什么？
- [ ] $\dfrac{A}{x-1} + \dfrac{B}{x^2+1}$
- [ ] $\dfrac{A}{(x-1)^2} + \dfrac{Bx + C}{x^2+1}$
- [x] $\dfrac{A}{x-1} + \dfrac{B}{(x-1)^2} + \dfrac{Cx+D}{x^2+1}$
- [ ] $\dfrac{A}{x-1} + \dfrac{B}{x-1} + \dfrac{C}{x^2+1}$
::: solution
重复的一次因式$(x-1)^2$贡献两项，分母分别为$x - 1$和$(x-1)^2$；不可约二次因式则需要一个**一次**分子$Cx + D$。这样共有四个未知数，与分母的次数$4$相符。
:::
:::

## 没有初等原函数的积分

借助这些方法，再加上代数变形，可以计算非常多的积分。一个合理的策略是：化简被积函数；寻找可用的代换（某个内层表达式的导数是否出现在被积函数中？）；判断类型（不同类型函数的乘积→分部积分；三角函数的幂→恒等式；二次式的平方根→三角代换；有理函数→部分分式）；如果这些都行不通，就尝试把被积函数写成另一种形式。积分表和计算机代数系统可以把其中的大部分工作自动化。

::: example 用哪种方法？ {#ex-strategy}
为下列每个积分选择一种方法，并求出积分：(a)$\displaystyle\int\frac{x}{\sqrt{1-x^2}}\,dx$；(b)$\displaystyle\int\frac{x^2}{\sqrt{1-x^2}}\,dx$；(c)$\displaystyle\int\sqrt{x}\,\ln x\,dx$；(d)$\displaystyle\int\frac{x^3+1}{x^2-x}\,dx$。
::: solution
(a) 分子在相差一个常数因子的意义下是$1 - x^2$的导数，所以令$u = 1 - x^2$，$du = -2x\,dx$：$\int\frac{x\,dx}{\sqrt{1-x^2}} = -\frac12\int u^{-1/2}\,du = -\sqrt{1 - x^2} + C$。

(b) 多出的因子$x$使上述代换失效，正如第一节中的警示所说。平方根$\sqrt{1 - x^2}$提示我们令$x = \sin\theta$，$dx = \cos\theta\,d\theta$：

$$
\int\frac{x^2}{\sqrt{1-x^2}}\,dx = \int\frac{\sin^2\theta}{\cos\theta}\cos\theta\,d\theta = \int\sin^2\theta\,d\theta = \frac\theta2 - \frac{\sin\theta\cos\theta}{2} + C = \frac{\arcsin x - x\sqrt{1-x^2}}{2} + C.
$$

(c) 这是幂函数与对数函数的乘积：取$u = \ln x$（在前面的准则中对数函数排在第一位），$dv = x^{1/2}\,dx$，作分部积分，则$v = \frac23x^{3/2}$：

$$
\int\sqrt x\ln x\,dx = \frac23x^{3/2}\ln x - \frac23\int x^{1/2}\,dx = \frac23x^{3/2}\ln x - \frac49x^{3/2} + C.
$$

(d) 这个有理函数不是真分式，所以先做除法：$x^3 + 1 = (x^2 - x)(x + 1) + (x + 1)$。再拆分真分式部分：$\frac{x+1}{x(x-1)} = -\frac1x + \frac{2}{x-1}$（在$x = 0$和$x = 1$处用遮盖法）：

$$
\int\frac{x^3+1}{x^2-x}\,dx = \int\Bigl(x + 1 - \frac1x + \frac{2}{x-1}\Bigr)dx = \frac{x^2}{2} + x - \ln\abs x + 2\ln\abs{x-1} + C.
$$
:::
:::

但有些积分根本无法求出封闭形式。为了准确说明这是什么意思，我们需要给一直在使用的这类函数起一个名字。

::: definition 初等函数 {#def-elementary}
**初等函数**是指由常数、恒等函数$x$、指数函数、对数函数、三角函数及其反函数，经过有限次加、减、乘、除、复合和开方运算构造出来的函数。
:::

由微积分基本定理的第一部分，连续函数$e^{-x^2}$当然有原函数，即$\int_0^xe^{-t^2}\,dt$；问题在于这个原函数不是初等函数。$\frac{\sin x}{x}$、$\sqrt{1 + x^3}$和$\frac{1}{\ln x}$也是如此。这样的原函数就是一些新的函数；例如，**误差函数**

$$
\operatorname{erf}(x) = \frac{2}{\sqrt\pi}\int_0^xe^{-t^2}\,dt
$$

与$\sin$或$\ln$一样被人们透彻地理解，也一样容易计算，它给出统计学中正态分布的概率（[[probability/continuous-random-variables]]）。当需要定积分的数值时，加细的黎曼和就能胜任。

另一条途径是借助无穷级数。对级数$e^{-t^2} = 1 - t^2 + \frac{t^4}{2!} - \frac{t^6}{3!} + \cdots$逐项积分，得到

$$
\int_0^xe^{-t^2}\,dt = x - \frac{x^3}{3} + \frac{x^5}{5\cdot2!} - \frac{x^7}{7\cdot3!} + \cdots,
$$

这个公式对每个$x$都成立，并且当$x$不太大时收敛很快。逐项积分的合理性论证是[[calculus-2/power-series]]一章的主题之一。

::: widget riemann
f: exp(-x^2)
a: 0
b: 1
n: 4
method: simpson
caption: 辛普森（Simpson）公式用依次经过相邻每三个点的抛物线来拟合。对于没有初等原函数的$\int_0^1e^{-x^2}\,dx = 0.746824\ldots$，取$n = 4$个子区间就已得到$0.746855$，误差为$3\times10^{-5}$；把$n$加倍，误差大约减小为原来的$16$分之一。与中点公式和梯形公式比较一下：它们的误差只减小为原来的约$4$分之一。
:::

::: application 数值积分
凡是认真计算一个没有封闭形式的积分——椭圆的弧长、正态分布的量落在某个范围内的概率、黑体辐射的能量——都要用到辛普森公式这样的数值求积公式。对这些公式的分析，包括为什么对光滑的被积函数，辛普森公式的误差表现得像$1/n^4$，以及自适应方法如何把计算量集中在被积函数变化最快的地方，属于[[numerical-analysis/numerical-integration]]一章的内容。
:::

::: history
换元法和分部积分法从微积分诞生之初就已被使用；在莱布尼茨（Leibniz）的记号中有$du = g'(x)\,dx$，这使换元几乎成了自动的操作。1702年，莱布尼茨和约翰·伯努利（Johann Bernoulli）各自独立地说明了如何通过拆成部分分式来积分有理函数。不过，莱布尼茨认为$x^4 + a^4$不能分解为实系数二次式之积——实际上$x^4 + a^4 = (x^2 + \sqrt2ax + a^2)(x^2 - \sqrt2ax + a^2)$——而实系数多项式的一般因式分解直到代数基本定理出现后才有了可靠的基础；这一定理由卡尔·弗里德里希·高斯（Carl Friedrich Gauss）于1799年首次证明（按现代标准，这个证明有一处漏洞）。约翰·沃利斯（John Wallis）在《无穷算术》（*Arithmetica infinitorum*，1656年）中以一种等价的形式利用正弦幂的积分，得到了他关于$\pi$的无穷乘积。19世纪30年代，约瑟夫·刘维尔（Joseph Liouville）在一系列论文中证明了$\int e^{-x^2}\,dx$这样的积分不能用初等函数表示；1969年，罗伯特·里施（Robert Risch）给出了一个判定初等原函数是否存在的算法——这是计算机代数系统中积分程序的基础。
:::

## 后续内容

本章的方法将贯穿本课程的其余部分：在[[calculus-1/integral-applications]]一章中用于计算面积、体积和弧长，在[[calculus-1/improper-integrals]]一章中用于无穷区间上的积分。在多元情形中，换元法变成带有雅可比行列式的变量替换公式（[[multivariable/change-of-variables]]），分部积分则变成散度定理（[[multivariable/stokes-divergence]]）。分部积分还是傅里叶分析的引擎（[[pde/fourier-series]]），而部分分式会在求拉普拉斯逆变换（[[ode/laplace-transform]]）和用留数计算积分（[[complex-analysis/residues]]）时再次出现。

::: summary
- 换元法$\int f(g(x))g'(x)\,dx = \int f(u)\,du$（其中$u = g(x)$）就是倒过来的链式法则；在定积分中，积分限相应地变为$g(a)$和$g(b)$。
- 分部积分法$\int u\,dv = uv - \int v\,du$就是倒过来的乘积法则；选取$u$时应使它求导后变简单。分部积分还能给出递推公式。
- 正弦与余弦的幂：从奇次幂中分出一个因子再换元，或者用二倍角公式把偶次幂减半。
- 三角代换$x = a\sin\theta$、$a\tan\theta$、$a\sec\theta$分别消去$\sqrt{a^2 - x^2}$、$\sqrt{a^2 + x^2}$、$\sqrt{x^2 - a^2}$。
- 有理真分式可以拆成部分分式$\frac{A}{(x - r)^k}$和$\frac{Bx + C}{(x^2 + bx + c)^k}$，它们积分后是对数、幂和反正切。
- 有些初等函数（例如$e^{-x^2}$）没有初等原函数；它们的积分定义了新的函数，或者用数值方法计算。
- 务必通过求导来检验原函数。
:::

## 习题

::: exercise 换元 {level=1 check="(e - 1)/2"}
计算$\displaystyle\int_0^1xe^{x^2}\,dx$。
::: solution
令$u = x^2$，$du = 2x\,dx$，积分限变为$0$和$1$：$\displaystyle\frac12\int_0^1e^u\,du = \frac{e - 1}{2}$。
:::
:::

::: exercise 对数函数 {level=1 check="1"}
计算$\displaystyle\int_1^e\ln x\,dx$。
::: solution
由[[#ex-parts]](b)，$x\ln x - x$是一个原函数，所以积分值为$(e\cdot1 - e) - (1\cdot0 - 1) = 1$。
:::
:::

::: exercise 偶次幂 {level=1 check="pi/4"}
计算$\displaystyle\int_0^{\pi/2}\sin^2x\,dx$。
::: solution
利用$\sin^2x = \frac{1 - \cos 2x}{2}$：$\Bigl[\frac x2 - \frac{\sin2x}{4}\Bigr]_0^{\pi/2} = \frac\pi4$。
:::
:::

::: exercise 两次分部积分 {level=2}
求$\displaystyle\int x^2e^{-x}\,dx$。
::: solution
取$u = x^2$，$dv = e^{-x}\,dx$（$v = -e^{-x}$）：$\int x^2e^{-x}\,dx = -x^2e^{-x} + \int2xe^{-x}\,dx$。再取$u = 2x$，$dv = e^{-x}\,dx$：$\int2xe^{-x}\,dx = -2xe^{-x} + \int2e^{-x}\,dx = -2xe^{-x} - 2e^{-x}$。因此

$$
\int x^2e^{-x}\,dx = -e^{-x}(x^2 + 2x + 2) + C,
$$

这可以通过求导来验证。
:::
:::

::: exercise 部分分式 {level=2 check="ln(4/3)"}
计算$\displaystyle\int_0^1\frac{dx}{x^2 + 3x + 2}$。
::: solution
$x^2 + 3x + 2 = (x+1)(x+2)$，且$\dfrac{1}{(x+1)(x+2)} = \dfrac{1}{x+1} - \dfrac{1}{x+2}$（遮盖法：$A = \frac{1}{-1+2}$，$B = \frac{1}{-2+1}$）。所以积分值为

$$
\Bigl[\ln\frac{x+1}{x+2}\Bigr]_0^1 = \ln\frac23 - \ln\frac12 = \ln\frac43 .
$$
:::
:::

::: exercise 稍加变化的换元 {level=2 check="(2 - sqrt(2))/3"}
计算$\displaystyle\int_0^1\frac{x^3}{\sqrt{1 + x^2}}\,dx$。
::: hint
令$u = 1 + x^2$，并写成$x^3\,dx = x^2\cdot x\,dx = (u - 1)\cdot\frac12du$。
:::
::: solution
令$u = 1 + x^2$，则$du = 2x\,dx$，$x^2 = u - 1$；积分限变为$1$和$2$：

$$
\frac12\int_1^2\frac{u - 1}{\sqrt u}\,du = \frac12\Bigl[\frac23u^{3/2} - 2u^{1/2}\Bigr]_1^2 = \frac12\Bigl(\frac{4\sqrt2}{3} - 2\sqrt2 - \frac23 + 2\Bigr) = \frac{2 - \sqrt2}{3}.
$$
:::
:::

::: exercise 指数函数乘余弦 {level=2}
求$\displaystyle\int e^{2x}\cos x\,dx$。
::: solution
记$I = \int e^{2x}\cos x\,dx$。取$u = e^{2x}$，$dv = \cos x\,dx$：$I = e^{2x}\sin x - 2\int e^{2x}\sin x\,dx$。再取$u = e^{2x}$，$dv = \sin x\,dx$：$\int e^{2x}\sin x\,dx = -e^{2x}\cos x + 2I$。因此$I = e^{2x}\sin x + 2e^{2x}\cos x - 4I$，所以

$$
I = \frac{e^{2x}(\sin x + 2\cos x)}{5} + C.
$$
:::
:::

::: exercise 对数的幂 {level=3 check="6 - 2*e"}
设$J_n = \displaystyle\int_1^e(\ln x)^n\,dx$。证明当$n\ge1$时$J_n = e - nJ_{n-1}$，并计算$J_3$。
::: solution
取$u = (\ln x)^n$，$dv = dx$作分部积分，则$du = n(\ln x)^{n-1}\frac{dx}{x}$，$v = x$：

$$
J_n = \bigl[x(\ln x)^n\bigr]_1^e - n\int_1^e(\ln x)^{n-1}\,dx = e - nJ_{n-1},
$$

这是因为$(\ln e)^n = 1$且$\ln 1 = 0$。从$J_0 = e - 1$出发：$J_1 = e - (e - 1) = 1$，$J_2 = e - 2$，$J_3 = e - 3(e - 2) = 6 - 2e\approx0.563$。
:::
:::

::: exercise 沃利斯积分 {#exr-wallis level=3 check="8/15"}
利用[[#ex-reduction]]中的递推公式，证明

$$
\int_0^{\pi/2}\sin^{2n+1}x\,dx = \frac{2\cdot4\cdots(2n)}{3\cdot5\cdots(2n+1)}
$$

对$n\ge1$成立，并计算$n = 2$时的值。
::: solution
对$n$用数学归纳法。当$n = 1$时，$I_3 = \frac23I_1 = \frac23$，因为$I_1 = \int_0^{\pi/2}\sin x\,dx = 1$。若公式对$n$成立，则由指数为$2n+3$的递推公式，

$$
I_{2n+3} = \frac{2n+2}{2n+3}I_{2n+1} = \frac{2\cdot4\cdots(2n)(2n+2)}{3\cdot5\cdots(2n+1)(2n+3)},
$$

这正是$n + 1$时的公式。当$n = 2$时：$I_5 = \frac{2\cdot4}{3\cdot5} = \frac{8}{15}$。（比较$I_{2n}$、$I_{2n+1}$和$I_{2n+2}$——由于$0 \le \sin x\le1$，它们随$n$递减——就得到沃利斯乘积$\frac\pi2 = \frac{2}{1}\cdot\frac23\cdot\frac43\cdot\frac45\cdot\frac65\cdots$。）
:::
:::

::: exercise 半角代换 {level=3 check="pi/(3*sqrt(3))"}
代换$t = \tan(x/2)$把$\sin x$与$\cos x$的任意有理函数变成$t$的有理函数。证明在这一代换下$\sin x = \dfrac{2t}{1+t^2}$，$\cos x = \dfrac{1-t^2}{1+t^2}$，$dx = \dfrac{2\,dt}{1+t^2}$，并用它计算$\displaystyle\int_0^{\pi/2}\frac{dx}{2 + \cos x}$。
::: solution
设$\varphi = x/2\in(-\frac\pi2, \frac\pi2)$，$t = \tan\varphi$，则$\cos^2\varphi = \frac{1}{1+t^2}$，所以

$$
\sin x = 2\sin\varphi\cos\varphi = 2\tan\varphi\cos^2\varphi = \frac{2t}{1+t^2}, \qquad \cos x = \cos^2\varphi - \sin^2\varphi = (1 - t^2)\cos^2\varphi = \frac{1-t^2}{1+t^2}.
$$

又$x = 2\arctan t$，所以$dx = \frac{2\,dt}{1+t^2}$。对于所求积分，$x = 0$对应$t = 0$，$x = \frac\pi2$对应$t = 1$，并且$2 + \cos x = \frac{2(1+t^2) + 1 - t^2}{1+t^2} = \frac{3 + t^2}{1+t^2}$。因此

$$
\int_0^{\pi/2}\frac{dx}{2+\cos x} = \int_0^1\frac{2\,dt}{3 + t^2} = \frac{2}{\sqrt3}\Bigl[\arctan\frac{t}{\sqrt3}\Bigr]_0^1 = \frac{2}{\sqrt3}\cdot\frac\pi6 = \frac{\pi}{3\sqrt3}\approx0.6046.
$$
:::
:::
