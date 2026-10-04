[[calculus-1/limits]]一章以一个问题开篇：一块下落的石块在$t = 2$这一时刻运动得有多快？从静止释放的石块在$t$秒内下落$s(t) = 4.9t^2$米，所以在从$2$到$2 + h$的这段时间内，它的平均速度是

$$
\frac{s(2+h) - s(2)}{h} = \frac{4.9\bigl(4 + 4h + h^2\bigr) - 19.6}{h} = 19.6 + 4.9h \qquad (h\neq0).
$$

当$h \to 0$时它趋于$19.6$，我们就把$19.6$ m/s称为石块在$t = 2$这一时刻的速度。同一个极限还回答了一个几何问题：当图像上的两点合而为一时，过这两点的直线的斜率趋于**切线**的斜率。

差商的这个极限就是**导数**，它是微分学的核心概念。它度量各种各样的瞬时变化率：速度、人口的增长率、生产的边际成本、曲线的斜率。本章定义导数，考察它在哪里存在、在哪里不存在，把它解释为最佳线性近似，并证明使导数易于计算的各项法则——包括和、积、商的求导法则，以及三角函数和指数函数的导数。

## 切线与变化率

设$f$是一个函数，$a$是其定义域中的一点。过$(a, f(a))$和$(a+h, f(a+h))$的**割线**的斜率为

$$
\frac{f(a+h) - f(a)}{h},
$$

称为$f$在$a$处的**差商**。它也是$f$在$a$与$a+h$之间的区间上的**平均变化率**。如果当$h\to0$时这些斜率趋近于一个确定的数，割线就会转向过$(a,f(a))$的一条极限位置的直线：切线。

::: widget secant
f: x^2
x0: 1
h: 1.5
caption: 过$(1, 1)$和$(1+h, (1+h)^2)$的割线的斜率为$\frac{(1+h)^2 - 1}{h} = 2 + h$。从任意一侧把$h$滑向$0$：割线变成切线，它的斜率趋近$2$，即$x^2$在$1$处的导数。在$h = 0$本身，商是$0/0$——只有极限才有意义。
:::

::: definition 一点处的导数 {#def-derivative}
设$f$在某个包含$a$的开区间上有定义。如果极限

$$
f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}
$$ {#eq-derivative}

（作为实数）存在，就称$f$**在**$a$**处可导**。数$f'(a)$称为$f$在$a$处的**导数**。此时，$f$的图像在$(a, f(a))$处的**切线**是过该点、斜率为$f'(a)$的直线：

$$
y = f(a) + f'(a)(x - a).
$$ {#eq-tangent}
:::

令$x = a + h$，就得到等价的形式$f'(a) = \lim_{x\to a}\dfrac{f(x) - f(a)}{x - a}$，它有时更方便。从物理上看，如果$f(t)$是物体在时刻$t$的位置，那么$f'(a)$就是它在时刻$a$的**速度**；一般地，$f'(a)$是$f$在$a$处的**瞬时变化率**，其单位是“$f$的单位每$x$的单位”。

::: example 抛物线 {#ex-def-square}
求$f(x) = x^2$在任意点$a$处的导数，以及在$a = 1$处的切线。
::: solution
对$h\neq0$，

$$
\frac{f(a+h) - f(a)}{h} = \frac{a^2 + 2ah + h^2 - a^2}{h} = 2a + h.
$$

当$h \to 0$时它趋于$2a$，所以$f'(a) = 2a$。在$a = 1$处斜率为$2$，切线为$y = 1 + 2(x - 1)$，即$y = 2x - 1$。
:::
:::

约去$h$是每个这类计算的关键。约去之前，商是$0/0$型未定式；约去之后，极限就可以通过代入求得。

::: example 倒数与平方根 {#ex-def-recip-sqrt}
由定义求$g(x) = 1/x$在$a\neq0$处的导数，以及$k(x) = \sqrt{x}$在$a > 0$处的导数。
::: solution
对$1/x$，先通分：

$$
\frac{g(a+h) - g(a)}{h} = \frac1h\Bigl(\frac{1}{a+h} - \frac1a\Bigr) = \frac1h\cdot\frac{a - (a+h)}{a(a+h)} = \frac{-1}{a(a+h)} \longrightarrow -\frac{1}{a^2}.
$$

对$\sqrt{x}$，乘以共轭式（$h$取得足够小，使$a + h > 0$）：

$$
\frac{\sqrt{a+h} - \sqrt{a}}{h} = \frac{(a+h) - a}{h\bigl(\sqrt{a+h} + \sqrt{a}\bigr)} = \frac{1}{\sqrt{a+h} + \sqrt{a}} \longrightarrow \frac{1}{2\sqrt a},
$$

这里用到了平方根函数的连续性（[[calculus-1/continuity#ex-sqrt]]）。所以$g'(a) = -1/a^2$，$k'(a) = 1/(2\sqrt{a})$。在$a = 0$处平方根函数没有导数：当$h\to0^+$时，商$\sqrt{h}/h = 1/\sqrt{h}$趋于$\infty$，图像在那里有一条竖直切线。
:::
:::

::: quiz
设$f'(2) = 3$。下列哪些说法是正确的？（选出所有正确选项。）
- [x] 图像在$(2, f(2))$处的切线的斜率为$3$。
- [ ] $f(2) = 3$。
- [x] $f$在$2$处连续。
- [x] $f(2.01)$近似等于$f(2) + 0.03$。
::: solution
第一个说法就是定义。导数并没有告诉我们值$f(2)$本身是多少。在$2$处的连续性可由可导性推出，我们将在[[#thm-diff-cont]]中证明这一点。最后一个说法是取$h = 0.01$时的线性近似$f(a+h)\approx f(a) + f'(a)h$，下面的[[#prop-linear-approx]]将讨论它。
:::
:::

## 导函数

让这个点变动，就得到一个新的函数。

::: definition 导函数 {#def-derivative-function}
$f$的**导数**（导函数）是这样的函数$f'$：它在$x$处的值为$f'(x) = \lim_{h\to0}\frac{f(x+h)-f(x)}{h}$，在使这个极限存在的每个$x$处有定义。如果$f'(x)$对开区间$I$中的每个$x$都存在，就称$f$**在**$I$**上可导**。
:::

导数有好几种记号，你应当熟练掌握所有这些记号。若$y = f(x)$，则

$$
f'(x) = \frac{dy}{dx} = \frac{df}{dx} = \frac{d}{dx}f(x) = Df(x),
$$

在物理学中，对时间的导数用一个圆点表示：$\dot{s} = ds/dt$。**莱布尼茨记号**$dy/dx$让人联想到导数所由产生的小增量之商$\Delta y/\Delta x$。它是一个整体的符号，而不是分数，但它的表现与分数非常相像（链式法则将表明这一点），因此极为方便。在一点处的值记作$f'(a)$或$\left.\dfrac{dy}{dx}\right|_{x=a}$。

由上面的例子：$\dfrac{d}{dx}x^2 = 2x$，$\dfrac{d}{dx}\dfrac1x = -\dfrac1{x^2}$，以及当$x > 0$时$\dfrac{d}{dx}\sqrt{x} = \dfrac1{2\sqrt x}$。另外两个可以立即得到：常数函数的导数为$0$（它的差商全都是$0$），以及$\frac{d}{dx}x = 1$（它的差商全都是$1$）。

::: widget plot
f: sin(x); cos(x)
x: -2pi, 2pi
y: -1.6, 1.6
piticks: true
tangent: 1
labels: \sin x; \cos x
caption: 沿$\sin x$的图像拖动切点，把切线的斜率与$\cos x$的图像在同一$x$处的高度作比较。两者总是相等：$\sin$的导数是$\cos$，我们将在[[#thm-trig-deriv]]中证明这一点。在$\sin$的峰顶或谷底处，切线是水平的，而$\cos x = 0$。
:::

## 可导性与连续性

函数必须连续才可能可导。

::: theorem 可导函数是连续的 {#thm-diff-cont}
若$f$在$a$处可导，则$f$在$a$处连续。
:::

::: proof
对$h\neq0$，可以写成

$$
f(a+h) - f(a) = \frac{f(a+h) - f(a)}{h}\cdot h.
$$

当$h\to0$时，第一个因子趋于$f'(a)$，第二个因子趋于$0$，所以由极限的乘积法则，$f(a+h) - f(a) \to f'(a)\cdot 0 = 0$。因此$\lim_{h\to0}f(a+h) = f(a)$，这正是在$a$处的连续性。
:::

逆命题不成立：连续函数不一定可导。图像在一点处没有切线的情形有好几种。

::: example 角点 {#ex-abs}
证明$f(x) = \abs{x}$在$0$处连续但不可导。
::: solution
在$0$处的连续性已在[[calculus-1/continuity#exr-abs]]中证明。在$0$处的差商为

$$
\frac{\abs{0+h} - \abs{0}}{h} = \frac{\abs{h}}{h} = \begin{cases} 1, & h>0,\\ -1, & h<0.\end{cases}
$$

它的两个单侧极限分别是$1$和$-1$，所以双侧极限不存在（[[calculus-1/limits#thm-two-sided]]），$f'(0)$没有定义。从几何上看，图像有一个角点：斜率为$1$和$-1$的直线分别从两侧贴合图像，但没有一条单独的切线能做到这一点。对$x\neq0$，在$x$附近$\abs{x}$与$x$或$-x$一致，所以$f'(x) = \sgn x$。
:::
:::

连续函数在$a$处不可导，有三种典型的情形：

- **角点**：差商的两个单侧极限不相等，如$\abs{x}$在$0$处；
- **竖直切线**：差商趋于$\pm\infty$，如$\sqrt[3]{x}$在$0$处，其差商为$h^{1/3}/h = h^{-2/3}\to\infty$；
- **振荡**：差商即使在广义的意义下也没有极限，如$x\sin(1/x)$（在$0$处取值$0$），其差商$\sin(1/h)$振荡不止。

::: quiz
下列函数中，哪些在$0$处可导？（每个函数在$0$处都取值$0$。）选出所有正确选项。
- [ ] $\abs{x}$
- [x] $x\abs{x}$
- [ ] $\sqrt[3]{x}$
- [x] $x^2\sin(1/x)$
::: solution
逐个计算在$0$处的差商。对$\abs{x}$，差商是$\sgn h$，没有极限。对$x\abs{x}$，差商是$h\abs{h}/h = \abs{h}\to0$，所以导数为$0$。对$\sqrt[3]{x}$，差商是$h^{-2/3}\to\infty$：竖直切线。对$x^2\sin(1/x)$，差商是$h\sin(1/h)$，由于$\abs{h\sin(1/h)}\le\abs{h}$，由夹逼定理它趋于$0$。多乘一个因子$x$可以修复角点或振荡。
:::
:::

::: remark 连续但处处不可导
连续函数可以像上面那样在少数几个点处不可导——但它也可以在**每一个**点处都不可导。卡尔·魏尔斯特拉斯（Karl Weierstrass）在1872年构造了这样一个函数，它是一列频率迅速增大、振幅逐渐减小的余弦波的无穷和；它的图像是一个分形，在每一种尺度上都有角点。这类函数在[[real-analysis/uniform-convergence]]中构造。它们表明，“连续函数的图像是偶尔带有角点的光滑曲线”这种直觉是错误的。
:::

## 线性近似

在可导点附近，函数可以用它的切线很好地近似。记$f(a+h) = f(a) + f'(a)h + E(h)$，于是$E(h)$就是用切线代替图像所产生的误差。这个误差不仅很小，而且**与$h$相比**也很小。

::: proposition 切线是最佳线性近似 {#prop-linear-approx}
设$f$在某个包含$a$的开区间上有定义。则$f$在$a$处可导当且仅当存在数$m$，使得

$$
f(a+h) = f(a) + mh + E(h) \qquad\text{其中}\qquad \lim_{h\to0}\frac{E(h)}{h} = 0.
$$ {#eq-linear-approx}

此时$m = f'(a)$。
:::

::: proof
对任意给定的数$m$，定义$E(h) = f(a+h) - f(a) - mh$。则对$h\neq0$，

$$
\frac{E(h)}{h} = \frac{f(a+h) - f(a)}{h} - m.
$$

所以$E(h)/h \to 0$当且仅当差商趋于$m$，即当且仅当$f$在$a$处可导且$f'(a) = m$。
:::

这个命题是说，在所有过$(a, f(a))$的直线中，切线是唯一一条其误差与到$a$的距离$h$相比可以忽略的直线。这种观点——把导数看作线性近似——可以推广到多元函数（[[multivariable/partial-derivatives]]）：在那里“斜率”不再有意义，但“最佳线性近似”仍然有意义。

::: example 近似计算平方根 {#ex-linear-approx}
利用$\sqrt{x}$在$4$处的切线求$\sqrt{4.1}$的近似值。
::: solution
令$f(x) = \sqrt{x}$，则$f(4) = 2$，并且由[[#ex-def-recip-sqrt]]，$f'(4) = \frac{1}{2\sqrt4} = \frac14$。取$h = 0.1$，

$$
\sqrt{4.1} \approx f(4) + f'(4)\cdot0.1 = 2 + 0.025 = 2.025.
$$

真值为$2.024846\ldots$，所以误差约为$1.5\times10^{-4}$——正如[[#prop-linear-approx]]所预言的，它比$h = 0.1$小得多。（在[[calculus-2/taylor-series]]中我们将看到，误差大致与$h^2$成正比。）
:::
:::

::: application 边际成本
如果$C(q)$是生产$q$个单位某种产品的成本，经济学家就把$C'(q)$称为**边际成本**。由$h = 1$时的线性近似，$C(q+1) - C(q)\approx C'(q)$：边际成本近似等于多生产一个单位的成本。例如，若$C(q) = 2000 + 3q + 0.01q^2$英镑，则$C'(q) = 3 + 0.02q$，所以在产量为$500$个单位时，边际成本为每单位$C'(500) = 13$英镑；第501个单位的确切成本是$C(501) - C(500) = 13.01$英镑。用导数而不是差分来处理问题，使经济学家能够把整个微积分——特别是[[calculus-1/curve-sketching]]中的最优化方法——应用于这类模型。
:::

::: application 小角近似
由于$\sin'(0) = \cos 0 = 1$，$\sin$在$0$处的切线是$y = x$，所以对很小的$\theta$（以弧度计）有$\sin\theta\approx\theta$。物理学家利用这一点，把单摆方程$\ddot\theta = -\frac{g}{\ell}\sin\theta$替换为简单得多的$\ddot\theta = -\frac{g}{\ell}\theta$，后者的解是周期为$2\pi\sqrt{\ell/g}$的正弦波。对于$10^\circ$（$0.1745$ rad）的摆幅，误差$\theta - \sin\theta$只有$\theta$的$0.5\%$左右。
:::

## 求导法则

每个导数都从定义出发来计算会很费力。我们转而一劳永逸地证明几条法则。

::: theorem 和与常数倍 {#thm-linearity}
若$f$和$g$在$x$处可导，$c$为常数，则$f + g$和$cf$在$x$处可导，并且

$$
(f + g)'(x) = f'(x) + g'(x), \qquad (cf)'(x) = c\,f'(x).
$$
:::

::: proof
$f + g$的差商是$f$和$g$的差商之和：

$$
\frac{(f+g)(x+h) - (f+g)(x)}{h} = \frac{f(x+h) - f(x)}{h} + \frac{g(x+h)-g(x)}{h} \longrightarrow f'(x) + g'(x)
$$

这里用到了极限的求和法则。类似地，$cf$的差商是$f$的差商的$c$倍，它趋于$cf'(x)$。
:::

::: theorem 幂法则 {#thm-power}
对每个正整数$n$，$\dfrac{d}{dx}x^n = nx^{n-1}$。
:::

::: proof
固定$a$。由[[calculus-1/real-functions#thm-factor]]中用过的因式分解，对$x\neq a$，

$$
\frac{x^n - a^n}{x - a} = x^{n-1} + x^{n-2}a + \dots + xa^{n-2} + a^{n-1}.
$$

右边是$n$项之和，每一项都是$x$的多项式，当$x\to a$时趋于$a^{n-1}$。因此极限为$na^{n-1}$。
:::

结合上面两个定理，可以对每个多项式逐项求导：例如$\frac{d}{dx}\bigl(4x^5 - 3x^2 + 7\bigr) = 20x^4 - 6x$。

::: theorem 乘积法则 {#thm-product}
若$f$和$g$在$x$处可导，则$fg$也在$x$处可导，并且

$$
(fg)'(x) = f'(x)\,g(x) + f(x)\,g'(x).
$$
:::

::: proof
在差商的分子中加上再减去$f(x+h)g(x)$：

$$
\frac{f(x+h)g(x+h) - f(x)g(x)}{h} = f(x+h)\,\frac{g(x+h) - g(x)}{h} + g(x)\,\frac{f(x+h) - f(x)}{h}.
$$

当$h\to0$时，由于$f$在$x$处连续（[[#thm-diff-cont]]），$f(x+h)\to f(x)$，而两个差商分别趋于$g'(x)$和$f'(x)$。由极限运算法则，整个表达式趋于$f(x)g'(x) + g(x)f'(x)$。
:::

::: intuition 把乘积法则看作面积的变化
把$f(x)g(x)$看作边长为$f$和$g$的矩形的面积。当$x$略微增大时，两边分别增长$\Delta f$和$\Delta g$，面积增长$g\,\Delta f + f\,\Delta g + \Delta f\,\Delta g$：两个细长条加上一个小角块。除以$\Delta x$并令$\Delta x\to0$，两个长条给出$gf' + fg'$，而角块贡献的是$\Delta f\cdot\frac{\Delta g}{\Delta x}\to 0\cdot g'$。莱布尼茨最初发现这条法则，基本上就是这样做的。
:::

::: theorem 商法则 {#thm-quotient}
若$f$和$g$在$x$处可导，且$g(x)\neq0$，则$f/g$在$x$处可导，并且

$$
\Bigl(\frac{f}{g}\Bigr)'(x) = \frac{f'(x)\,g(x) - f(x)\,g'(x)}{g(x)^2}.
$$
:::

::: proof
先考虑$1/g$。由于$g$在$x$处连续且$g(x)\neq0$，对所有足够小的$h$都有$g(x+h)\neq0$（由[[calculus-1/limits]]中的保号性论证），所以下面的商有定义，并且

$$
\frac{1}{h}\Bigl(\frac{1}{g(x+h)} - \frac{1}{g(x)}\Bigr) = -\frac{g(x+h) - g(x)}{h}\cdot\frac{1}{g(x+h)\,g(x)} \longrightarrow -\frac{g'(x)}{g(x)^2},
$$

这里再次用到了$g(x+h)\to g(x)$。现在$f/g = f\cdot(1/g)$，由乘积法则得

$$
\Bigl(\frac fg\Bigr)' = f'\cdot\frac1g + f\cdot\Bigl(-\frac{g'}{g^2}\Bigr) = \frac{f'g - fg'}{g^2}.
$$
:::

取$f = 1$，$g(x) = x^n$，由商法则得$\frac{d}{dx}x^{-n} = \frac{-nx^{n-1}}{x^{2n}} = -nx^{-n-1}$。所以幂法则$\frac{d}{dx}x^k = kx^{k-1}$对每个整数$k$都成立（当$k<0$时要求$x\neq0$）。在[[calculus-1/chain-rule]]中，我们将把它推广到所有实数指数。

::: example 运用求导法则 {#ex-rules}
求下列函数的导数：(a) $p(x) = (x^2 + 1)(x^3 - 2x)$；(b) $q(x) = \dfrac{x^2-1}{x^2+1}$。
::: solution
(a) 由乘积法则，

$$
p'(x) = 2x\,(x^3 - 2x) + (x^2 + 1)(3x^2 - 2) = 2x^4 - 4x^2 + 3x^4 + x^2 - 2 = 5x^4 - 3x^2 - 2.
$$

作为验证，先展开得$p(x) = x^5 - x^3 - 2x$，它的导数与上面相同。

(b) 由商法则，

$$
q'(x) = \frac{2x(x^2+1) - (x^2-1)\,2x}{(x^2+1)^2} = \frac{4x}{(x^2+1)^2}.
$$
:::
:::

::: warning 积的导数不是导数的积
人们很容易写出$(fg)' = f'g'$和$(f/g)' = f'/g'$。两者都是错的：对$f(x) = g(x) = x$，$(fg)' = (x^2)' = 2x$，而$f'g' = 1$。在商法则中，要分清分子中两项的顺序——“分子的导数乘以分母，**减去**分子乘以分母的导数”——因为交换两项会改变符号。
:::

::: example 水平切线与平行切线 {#ex-horizontal}
求曲线$y = x^3 - 3x^2 - 9x + 5$上切线为水平的点，以及切线与直线$y = 15x$平行的点。
::: solution
在$x$处切线的斜率为

$$
y' = 3x^2 - 6x - 9 = 3(x - 3)(x + 1).
$$

它在$x = 3$和$x = -1$处为零，所以切线在点$(3, -22)$和$(-1, 10)$处是水平的。它们是图像的“转折点”，我们将在[[calculus-1/curve-sketching]]中学习如何对它们进行分类。

当切线的斜率为$15$时，它与$y = 15x$平行：

$$
3x^2 - 6x - 9 = 15 \iff x^2 - 2x - 8 = 0 \iff (x-4)(x+2) = 0.
$$

在$x = 4$处，切点为$(4, -15)$，切线为$y = -15 + 15(x - 4) = 15x - 75$；在$x = -2$处，切点为$(-2, 3)$，切线为$y = 3 + 15(x+2) = 15x + 33$。
:::
:::

## 三角函数与指数函数的导数

正弦和余弦的导数依赖于[[calculus-1/limits]]中证明的两个三角极限：$\frac{\sin h}{h}\to1$（[[calculus-1/limits#thm-sinx]]）和$\frac{1-\cos h}{h}\to0$（[[calculus-1/limits#cor-cos]]）。

::: theorem 正弦和余弦的导数 {#thm-trig-deriv}
对所有实数$x$（以弧度计），$\dfrac{d}{dx}\sin x = \cos x$，$\dfrac{d}{dx}\cos x = -\sin x$。
:::

::: proof
由和差角公式（[[calculus-1/real-functions#thm-addition]]），

$$
\frac{\sin(x+h) - \sin x}{h} = \frac{\sin x\cos h + \cos x\sin h - \sin x}{h} = \cos x\,\frac{\sin h}{h} - \sin x\,\frac{1 - \cos h}{h}.
$$

当$h\to0$时，它趋于$\cos x\cdot1 - \sin x\cdot0 = \cos x$。类似地，

$$
\frac{\cos(x+h) - \cos x}{h} = \frac{\cos x\cos h - \sin x\sin h - \cos x}{h} = -\cos x\,\frac{1-\cos h}{h} - \sin x\,\frac{\sin h}{h} \longrightarrow -\sin x.
$$
:::

其余三角函数的导数现在可以由商法则得到。例如，

$$
\frac{d}{dx}\tan x = \frac{\cos x\cdot\cos x - \sin x\cdot(-\sin x)}{\cos^2 x} = \frac{1}{\cos^2x} = \sec^2 x,
$$

用同样的方法可得$\frac{d}{dx}\sec x = \sec x\tan x$和$\frac{d}{dx}\cot x = -\csc^2 x$（[[#exr-trig-derivs]]），以及$\frac{d}{dx}\csc x = -\csc x\cot x$。

::: quiz
设$f(x) = x\sin x$。$f'(\pi)$等于多少？
- [ ] $0$
- [x] $-\pi$
- [ ] $\pi$
- [ ] $-1$
::: solution
由乘积法则，$f'(x) = \sin x + x\cos x$，所以$f'(\pi) = \sin\pi + \pi\cos\pi = 0 - \pi = -\pi$。错误的答案来自典型的失误：错误的法则$(fg)' = f'g'$给出$1\cdot\cos\pi = -1$，而只保留$\sin x$这一项则给出$0$。
:::
:::

### 指数函数与数e

对指数函数$f(x) = a^x$（$a>0$），由指数运算法则得

$$
\frac{a^{x+h} - a^x}{h} = a^x\cdot\frac{a^h - 1}{h}.
$$

所以只要$a^x$在$0$处可导，它就处处可导，并且$\frac{d}{dx}a^x = a^x\cdot L(a)$，其中$L(a) = \lim_{h\to0}\frac{a^h-1}{h}$是$a^x$的图像在$x = 0$处的斜率。**指数函数的导数与该指数函数本身成正比。**取$h = 10^{-6}$，数值结果如下：

| $a$ | $2$ | $2.5$ | $2.7$ | $2.72$ | $2.8$ | $3$ |
|---|---|---|---|---|---|---|
| $\frac{a^h - 1}{h}$ | $0.6931$ | $0.9163$ | $0.9933$ | $1.0006$ | $1.0296$ | $1.0986$ |

在$0$处的斜率随$a$增大而增大，并在$2.7$与$2.72$之间经过$1$。

::: definition 数e {#def-e}
数$e$是这样的底：以它为底的指数函数在$x = 0$处的斜率恰好为$1$：

$$
\lim_{h\to0}\frac{e^h - 1}{h} = 1.
$$ {#eq-e}

数值上，$e = 2.718281828\ldots$
:::

极限$L(a)$对每个$a>0$都存在，并且恰有一个底使$L(a) = 1$，这需要对$a^x$作细致的构造。我们暂时直接接受这一点。一条严格的途径是把自然对数定义为一个积分，在[[calculus-1/integrals]]中有概述；另一条途径使用幂级数（[[calculus-2/power-series]]）。

::: theorem 指数函数的导数 {#thm-exp-deriv}
对所有$x$，$\dfrac{d}{dx}e^x = e^x$。
:::

::: proof
在上面的计算中取$a = e$，差商为$e^x\cdot\frac{e^h-1}{h}$，由[[#eq-e]]，它趋于$e^x\cdot 1 = e^x$。
:::

所以$e^x$是一个等于其自身导数的函数——这一性质使它成为微分方程$y' = y$的基本解，也解释了它为何在增长与衰减的模型中无处不在（[[ode/first-order]]）。对其他的底，我们将在[[calculus-1/chain-rule]]中证明$L(a) = \ln a$，从而$\frac{d}{dx}a^x = a^x\ln a$；上表证实了$L(2) = 0.6931\ldots = \ln 2$。

::: widget plot
f: a^x; 1 + x
sliders: a=2:1.5:3.5:0.01
x: -2, 2
y: -1, 5
tangent: 0
labels: a^x; y = 1 + x
caption: 调节$a$，直到$a^x$的图像恰好在$(0, 1)$处与直线$y = 1 + x$相切，即在$0$处的切线与这条直线重合。只有当在$0$处的斜率等于$1$，即$a = e \approx 2.718$时，才会如此。当$a = e$时，图像处处位于其切线上方，由此得到一个有用的不等式$e^x \ge 1 + x$。
:::

## 高阶导数

导数$f'$本身也是一个函数，它也可能有自己的导数。

::: definition 高阶导数 {#def-higher}
$f$的**二阶导数**是$f'' = (f')'$，**三阶导数**是$f''' = (f'')'$；一般地，$n$阶导数$f^{(n)}$是$f^{(n-1)}$的导数（约定$f^{(0)} = f$）。用莱布尼茨记号，$f''(x) = \dfrac{d^2y}{dx^2}$，$f^{(n)}(x) = \dfrac{d^ny}{dx^n}$。
:::

如果$s(t)$是运动物体的位置，那么$v(t) = s'(t)$是它的速度，$a(t) = v'(t) = s''(t)$是它的**加速度**。有些函数族的高阶导数具有整齐的规律：$\sin$的各阶导数依次为$\cos, -\sin, -\cos, \sin$，以$4$为周期循环；$x^n$的$n$阶导数是常数$n!$；$e^x$的每一阶导数都是$e^x$。

::: example 直线运动 {#ex-motion}
一个质点沿直线运动，在时刻$t\in[0,4]$（秒）的位置为$s(t) = t^3 - 6t^2 + 9t$（米）。它何时静止？何时向后运动？总共走了多远？
::: solution
速度和加速度分别为

$$
v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3), \qquad a(t) = v'(t) = 6t - 12.
$$

当$v(t) = 0$，即$t = 1$和$t = 3$时，质点静止。$v$在$[0,1)$上为正，在$(1,3)$上为负，在$(3,4]$上为正，所以质点先向前运动，在$t = 1$与$t = 3$之间向后运动，然后再次向前。它在转向点和两端处的位置为

$$
s(0) = 0, \qquad s(1) = 4, \qquad s(3) = 0, \qquad s(4) = 4,
$$

所以它总共走了$4 + 4 + 4 = 12$米，尽管它的净位移只有$s(4) - s(0) = 4$米。加速度在$t = 2$处为零，此时向后的速度最大：$v(2) = -3$ m/s。
:::
:::

::: history
皮埃尔·德·费马（Pierre de Fermat）在17世纪30年代用一种他称为“准相等”（*adequality*）的方法求切线和极大值：比较$f(x)$与$f(x + e)$，除以$e$，然后令$e = 0$——这实际上就是差商，只是没有这个名称而已。艾萨克·牛顿（Isaac Newton）在1665—1666年间把量看作随时间流动的；后来他把这些量的变化率称为“流数”（*fluxions*），并从17世纪90年代起用一个圆点来表示它们，如$\dot x$。戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）于1684年在一篇题为《求极大值与极小值的新方法》（*Nova methodus pro maximis et minimis*）的短文中发表了关于微分学的第一篇论述；其中已经包含了和、积、商与幂的求导法则，所用的记号$dx$、$dy$我们至今仍在使用。记号$f'(x)$和“导数”这一名称来自约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）的《解析函数论》（*Théorie des fonctions analytiques*，1797年）。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）终于在1823年把导数定义为差商的极限，为这门学科奠定了本章所用的基础。
:::

## 后续内容

本章的法则处理和、积与商；下一章[[calculus-1/chain-rule]]处理复合函数和反函数，从而补全对每个初等函数求导的工具箱。导数能告诉我们关于函数的哪些信息——例如，导数为正意味着函数递增——这个更深入的问题需要用到中值定理（[[calculus-1/mean-value-theorem]]），并将在[[calculus-1/curve-sketching]]中付诸应用。多元函数的导数是[[multivariable/partial-derivatives]]的主题；把函数与其自身的导数联系起来的微分方程，从[[ode/first-order]]开始讨论；而复可微性比相应的实可微性要强得多（[[complex-analysis/analytic-functions]]）。

::: summary
- 导数$f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}$是切线的斜率，也是$f$在$a$处的瞬时变化率。
- 可导蕴涵连续，但反之不然：角点（$\abs{x}$）、竖直切线（$\sqrt[3]{x}$）和振荡（$x\sin(1/x)$）都会使导数不存在。
- 等价地说，$f(a+h) = f(a) + f'(a)h + E(h)$，其中$E(h)/h\to0$：切线是最佳线性近似。
- 求导法则：$(f+g)' = f'+g'$，$(cf)' = cf'$，$(fg)' = f'g + fg'$，$(f/g)' = (f'g - fg')/g^2$，以及对每个整数$n$，$(x^n)' = nx^{n-1}$。
- $(\sin x)' = \cos x$，$(\cos x)' = -\sin x$（以弧度计）；$(\tan x)' = \sec^2x$。
- $e$是使指数函数在$0$处的斜率为$1$的底，且$(e^x)' = e^x$。
- 高阶导数描述加速度以及其他二阶行为。
:::

## 习题

::: exercise 多项式 {level=1 check="15"}
设$f(x) = 3x^4 - 2x^2 + 7x - 5$。计算$f'(1)$。
::: solution
由幂法则和线性性，$f'(x) = 12x^3 - 4x + 7$，所以$f'(1) = 12 - 4 + 7 = 15$。
:::
:::

::: exercise 由定义求导 {level=1}
用导数的定义求$f(x) = \dfrac{1}{2x+1}$的导数$f'(x)$。
::: solution
对$x\neq-\frac12$和很小的$h \neq 0$，

$$
\frac{f(x+h) - f(x)}{h} = \frac1h\cdot\frac{(2x+1) - (2x+2h+1)}{(2x+2h+1)(2x+1)} = \frac{-2}{(2x+2h+1)(2x+1)}.
$$

当$h\to0$时，它趋于$f'(x) = \dfrac{-2}{(2x+1)^2}$。
:::
:::

::: exercise 一条切线 {level=1 check="22"}
求$y = \dfrac{x^2+1}{x-2}$在$x = 3$处的切线，并给出它在$y$轴上的截距。
::: solution
在$x = 3$处，$y = 10/1 = 10$。由商法则，

$$
y' = \frac{2x(x-2) - (x^2+1)}{(x-2)^2} = \frac{x^2 - 4x - 1}{(x-2)^2},
$$

所以在$3$处的斜率为$\frac{9 - 12 - 1}{1} = -4$。切线为$y = 10 - 4(x - 3) = -4x + 22$，在$y$轴上的截距为$22$。
:::
:::

::: exercise 偶函数的导数 {level=2}
设$f$是在$\R$上可导的偶函数。证明$f'$是奇函数。
::: solution
固定$x$。利用对每个$y$都有$f(-y) = f(y)$，得

$$
f'(-x) = \lim_{h\to0}\frac{f(-x+h) - f(-x)}{h} = \lim_{h\to0}\frac{f(x - h) - f(x)}{h} = -\lim_{h\to0}\frac{f(x-h) - f(x)}{-h}.
$$

令$k = -h$（$k$趋于$0$当且仅当$h$趋于$0$），最后那个极限就是$\lim_{k\to0}\frac{f(x+k)-f(x)}{k} = f'(x)$。因此$f'(-x) = -f'(x)$。例如，$\cos$是偶函数，它的导数$-\sin$是奇函数。
:::
:::

::: exercise 光滑地连接两段 {level=2}
求常数$a$和$b$，使得

$$
f(x) = \begin{cases} x^2, & x\le1,\\ ax + b, & x > 1\end{cases}
$$

在$1$处可导。
::: solution
可导函数必定连续（[[#thm-diff-cont]]），所以首先$f(1) = 1$必须等于右极限$a + b$：我们需要$a + b = 1$。于是在$1$处的两个单侧差商为

$$
\frac{(1+h)^2 - 1}{h} = 2 + h \to 2 \quad (h\to0^-), \qquad \frac{a(1+h) + b - 1}{h} = \frac{ah}{h} = a \quad (h > 0).
$$

它们的极限相同当且仅当$a = 2$。所以$a = 2$，$b = -1$：直线$y = 2x - 1$正是$y = x^2$在$x = 1$处的切线（参见[[#ex-def-square]]）。
:::
:::

::: exercise 向上抛出的球 {level=2 check="100/49"}
一个向上抛出的球在$t$秒后的高度为$s(t) = 20t - 4.9t^2$米。它的速度在什么时刻为零？
::: solution
速度为$v(t) = s'(t) = 20 - 9.8t$，它在$t = \frac{20}{9.8} = \frac{100}{49}\approx 2.04$秒时为零。此刻球位于飞行的最高点，高度为$s(100/49) = \frac{1000}{49}\approx 20.4$ m。它的加速度始终是$s''(t) = -9.8$ m/s²：这就是重力的作用。
:::
:::

::: exercise 更多三角函数的导数 {#exr-trig-derivs level=2}
利用商法则和乘积法则证明$\dfrac{d}{dx}\sec x = \sec x\tan x$，$\dfrac{d}{dx}\cot x = -\csc^2 x$，以及$\dfrac{d}{dx}(\sin x\cos x) = \cos 2x$。
::: solution
由$\sec x = 1/\cos x$，商法则给出$\dfrac{0\cdot\cos x - 1\cdot(-\sin x)}{\cos^2 x} = \dfrac{\sin x}{\cos^2 x} = \dfrac{1}{\cos x}\cdot\dfrac{\sin x}{\cos x} = \sec x\tan x$。

由$\cot x = \cos x/\sin x$，商法则给出$\dfrac{-\sin x\cdot\sin x - \cos x\cdot\cos x}{\sin^2 x} = -\dfrac{1}{\sin^2 x} = -\csc^2 x$。

由乘积法则以及二倍角公式（[[calculus-1/real-functions#eq-double-angle]]），$\frac{d}{dx}(\sin x\cos x) = \cos x\cos x + \sin x(-\sin x) = \cos^2 x - \sin^2 x = \cos 2x$。这与$\sin x\cos x = \frac12\sin 2x$是一致的。
:::
:::

::: exercise 1/x的各阶导数 {level=3}
用数学归纳法证明：对$f(x) = 1/x$和每个$n\ge1$，

$$
f^{(n)}(x) = \frac{(-1)^n\, n!}{x^{n+1}} \qquad (x\neq0).
$$
::: solution
当$n = 1$时，$f'(x) = -x^{-2} = \frac{(-1)^1 1!}{x^2}$（[[#ex-def-recip-sqrt]]）。设公式对某个$n\ge1$成立。由负整数指数的幂法则，

$$
f^{(n+1)}(x) = \frac{d}{dx}\Bigl((-1)^n n!\,x^{-n-1}\Bigr) = (-1)^n n!\,(-n-1)\,x^{-n-2} = \frac{(-1)^{n+1}(n+1)!}{x^{n+2}},
$$

这正是$n + 1$时的公式。由数学归纳法，公式对所有$n\ge1$成立。
:::
:::

::: exercise 一阶可导但二阶不可导 {level=3}
设$f(x) = x\abs{x}$。证明$f$在$\R$上可导，$f'(x) = 2\abs{x}$，并且$f'$在$0$处不可导。
::: solution
当$x > 0$时，在$x$的某个邻域上$f(x) = x^2$，所以$f'(x) = 2x = 2\abs{x}$。当$x<0$时，在$x$附近$f(x) = -x^2$，所以$f'(x) = -2x = 2\abs{x}$。在$0$处，差商为$\frac{h\abs{h}}{h} = \abs{h}\to 0$，所以$f'(0) = 0 = 2\abs{0}$。因此对所有$x$有$f'(x) = 2\abs{x}$，而由[[#ex-abs]]，它在$0$处不可导。所以$f$处处有一阶导数，但在$0$处没有二阶导数。
:::
:::

::: exercise 莱布尼茨公式 {level=3}
设$f$和$g$具有直到$n$阶的各阶导数。证明

$$
(fg)^{(n)} = \sum_{k=0}^{n}\binom{n}{k}f^{(k)}g^{(n-k)}.
$$
::: hint
对$n$用数学归纳法，并利用乘积法则和帕斯卡法则$\binom{n}{k-1} + \binom{n}{k} = \binom{n+1}{k}$。
:::
::: solution
当$n = 1$时，该公式就是乘积法则。设它对$n$成立（并设$f, g$有$n+1$阶导数）。用乘积法则对每一项求导，得

$$
(fg)^{(n+1)} = \sum_{k=0}^n\binom nk\Bigl(f^{(k+1)}g^{(n-k)} + f^{(k)}g^{(n+1-k)}\Bigr).
$$

在第一部分中令$j = k+1$，它变为$\sum_{j=1}^{n+1}\binom{n}{j-1}f^{(j)}g^{(n+1-j)}$；第二部分为$\sum_{j=0}^{n}\binom nj f^{(j)}g^{(n+1-j)}$。合并$f^{(j)}g^{(n+1-j)}$的系数：当$1\le j\le n$时，系数为$\binom{n}{j-1} + \binom nj = \binom{n+1}{j}$；当$j = 0$时为$1 = \binom{n+1}{0}$；当$j = n+1$时为$1 = \binom{n+1}{n+1}$。因此$(fg)^{(n+1)} = \sum_{j=0}^{n+1}\binom{n+1}{j}f^{(j)}g^{(n+1-j)}$，归纳完成。（这个公式与$(a+b)^n$的二项式定理如出一辙。）
:::
:::
