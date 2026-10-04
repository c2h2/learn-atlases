试着计算

$$
\int_{-\infty}^{\infty}\frac{dx}{1 + x^4}
$$

——用[[calculus-1/integration-techniques]]一章中的方法。分母在$\R$上分解为$(x^2 + \sqrt2x + 1)(x^2 - \sqrt2x + 1)$，部分分式中既有对数又有反正切，经过一整页的代数运算，才得出答案是$\pi/\sqrt2$。用本章的方法，同样的答案只需五行就能得到；而像$\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$这样根本不存在初等原函数的积分，也变成了例行计算。

这种方法依赖于一个定理。若$f$在闭围道内部除有限个孤立奇点外处处解析，则$f$沿该围道的积分等于$2\pi i$乘以$f$在这些奇点处的**留数**之和——留数就是$f$的洛朗级数中$(z - a)^{-1}$的系数。由于留数通常可以通过求导和代数运算求出，围道积分就变成了一件记账的事。本章将证明**留数定理**，把它系统地应用于实积分，然后把它用于函数$f'/f$来计数零点和极点：这就是**辐角原理**和**儒歇（Rouché）定理**。

## 留数

::: definition 留数 {#def-residue}
设$a$是$f$的孤立奇点，$f$在去心圆盘$0 < \abs{z - a} < r$上的洛朗级数为$f(z) = \sum_{n=-\infty}^\infty c_n(z - a)^n$。$f$在$a$处的**留数**为

$$
\Res_{z = a}f(z) = c_{-1} = \frac{1}{2\pi i}\oint_{\abs{z - a} = \rho}f(z)\,dz \qquad(0 < \rho < r).
$$
:::

其中的积分公式就是[[complex-analysis/laurent-series#eq-laurent]]取$n = -1$的情形。它表明：**在$a$附近，留数是$f$绕$a$积分后唯一留下的部分**——其他每个幂$(z - a)^n$在去心圆盘上都有原函数。在可去奇点处，留数为$0$。对于本性奇点，必须求出洛朗级数；在极点处则有方便的公式。

::: proposition 极点处留数的计算 {#prop-res-formulas}
1. 若$a$是单极点，则$\displaystyle\Res_{z=a}f(z) = \lim_{z\to a}(z - a)f(z)$。
2. 若$f = g/h$，其中$g$、$h$在$a$处解析，$g(a)\neq0$，$h(a) = 0$且$h'(a)\neq0$，则$\displaystyle\Res_{z=a}\frac{g(z)}{h(z)} = \frac{g(a)}{h'(a)}$。
3. 若$a$是阶至多为$m$的极点，则

$$
\Res_{z=a}f(z) = \frac{1}{(m-1)!}\lim_{z\to a}\frac{d^{m-1}}{dz^{m-1}}\Big((z - a)^mf(z)\Big).
$$ {#eq-res-order-m}
:::

::: proof
(3)若极点的阶至多为$m$，则$(z - a)^mf(z) = c_{-m} + c_{-m+1}(z - a) + \dots + c_{-1}(z - a)^{m-1} + c_0(z - a)^m + \cdots$（去掉奇点之后）是一个幂级数，而$c_{-1}$是其中$(z - a)^{m-1}$的系数，由[[complex-analysis/laurent-series#thm-series-analytic]]，它等于该幂级数在$a$处的$(m-1)$阶导数除以$(m-1)!$。(1)是$m = 1$的情形。(2)$h$在$a$处有单零点且$g(a)\neq0$，所以$g/h$有单极点，由(1)得

$$
\lim_{z\to a}(z - a)\frac{g(z)}{h(z)} = \lim_{z\to a}\frac{g(z)}{\dfrac{h(z) - h(a)}{z - a}} = \frac{g(a)}{h'(a)} .
$$
:::

::: example 四个留数 {#ex-residues}
计算(a)$\Res_{z=i}\dfrac{1}{z^2 + 1}$；(b)$\Res_{z=0}\dfrac{e^z}{z^3}$；(c)$\Res_{z=a}\dfrac{1}{z^4 + 1}$，其中$a = e^{i\pi/4}$；(d)$\Res_{z = 0}\,e^{1/z}$。
::: solution
(a)由公式(2)，取$g = 1$，$h = z^2 + 1$：$\dfrac{1}{h'(i)} = \dfrac{1}{2i} = -\dfrac i2$。

(b)$\dfrac{e^z}{z^3} = \dfrac1{z^3}\Big(1 + z + \dfrac{z^2}{2} + \cdots\Big)$；$z^{-1}$的系数为$\dfrac12$。（取$m = 3$的公式(3)给出同样的结果：$\frac{1}{2!}\frac{d^2}{dz^2}e^z\big|_{z=0} = \frac12$。）

(c)$a$是$z^4 + 1$的单零点，所以由(2)，留数为$\dfrac{1}{4a^3} = \dfrac{a}{4a^4} = -\dfrac a4$，这里用到了$a^4 = -1$。分子分母同乘以$a$是一个标准技巧，可以避免计算$a^3$。

(d)$e^{1/z} = 1 + \dfrac1z + \dfrac{1}{2!\,z^2} + \cdots$，所以留数为$1$。在这个本性奇点处，关于极点的公式都不适用。
:::
:::

::: warning 阶要取得足够大
当$m$**不小于**极点的阶时，公式[[#eq-res-order-m]]成立；$m$取得过大无妨，但取得过小就会得出荒谬的结果。对$f(z) = \frac{1}{z^2\sin z}$，$0$是$3$阶（而不是$2$阶）极点，因为$\sin z$又贡献了一个单零点；取$m = 3$，得$\frac{1}{2!}\frac{d^2}{dz^2}\frac{z}{\sin z}\big|_{0} = \frac16$。同样，公式(2)要求$h$有**单**零点：对$\frac{1}{(z - 1)^2}$，它将导致除以$h'(1) = 0$。
:::

::: quiz
$\displaystyle\Res_{z = 0}\frac{\cos z}{z^3}$等于多少？
- [ ] $1$
- [ ] $0$，因为$\cos z/z^3$有$3$阶极点
- [x] $-\tfrac12$
- [ ] $\tfrac12$
::: solution
$\dfrac{\cos z}{z^3} = \dfrac{1}{z^3}\Big(1 - \dfrac{z^2}{2} + \dfrac{z^4}{24} - \cdots\Big) = \dfrac1{z^3} - \dfrac{1}{2z} + \dfrac{z}{24} - \cdots$，所以$z^{-1}$的系数为$-\frac12$。$3$阶极点完全可以有非零的留数；留数是$1/z$的系数，而不是首项的系数。
:::
:::

## 留数定理

::: theorem 留数定理 {#thm-residue}
设$\gamma$是正向简单闭围道，$f$在包含$\gamma$及其内部的某个开集上除$\gamma$内部的有限个点$a_1,\dots,a_k$外处处解析，则

$$
\oint_\gamma f(z)\,dz = 2\pi i\sum_{j=1}^k\Res_{z = a_j}f(z) .
$$ {#eq-residue-thm}
:::

::: proof
对每个$j$，设$P_j(z) = \sum_{n=1}^{\infty}c^{(j)}_{-n}(z - a_j)^{-n}$是$f$在$a_j$处的洛朗级数的主要部分。它是关于$w = 1/(z - a_j)$的幂级数，并且对所有$w$都收敛（它在$\abs{z - a_j}$任意小，即$\abs w$任意大时收敛），所以$P_j$在$\C\setminus\set{a_j}$上解析，并且该级数在与$a_j$保持正距离的$\gamma$上一致收敛。

函数$g = f - P_1 - \dots - P_k$在每个$a_j$处都有可去奇点：在$a_j$附近，$f - P_j$由洛朗级数的非负幂部分给出，而其他的$P_i$在$a_j$处解析。去掉这些奇点之后，$g$在包含$\gamma$及其内部的某个开集上解析，所以由[[complex-analysis/cauchy-theorem]]一章中所述形式的柯西积分定理，$\oint_\gamma g\,dz = 0$。因此$\oint_\gamma f = \sum_j\oint_\gamma P_j$。对$P_j$逐项积分（[[complex-analysis/contour-integrals#cor-uniform]]）：当$n\ge2$时，$(z - a_j)^{-n}$在$\C\setminus\set{a_j}$上有原函数，所以它的积分为$0$；而$\oint_\gamma\frac{dz}{z - a_j} = 2\pi i$，因为$a_j$位于正向简单闭曲线$\gamma$的内部（对圆周来说，这就是[[complex-analysis/cauchy-theorem#lem-off-centre]]；一般情形可以把$\gamma$变形为绕$a_j$的小圆周而得到）。所以$\oint_\gamma P_j = 2\pi i\,c^{(j)}_{-1}$，再对$j$求和即得[[#eq-residue-thm]]。
:::

更一般地，设$f$在某个单连通区域内除$a_1,\dots,a_k$外处处解析，则对该区域中任何一条闭围道$\gamma$（不经过这些点），同样的证明给出$\oint_\gamma f\,dz = 2\pi i\sum_j n(\gamma, a_j)\Res_{a_j}f$，其中$n(\gamma, a_j)$是[[complex-analysis/contour-integrals#def-winding]]中的环绕数。绕一个极点两圈的曲线会把该极点的留数计入两次。

::: widget contourint
f: 1/(z^4 + 1)
center: 0, 0.6
radius: 1
poles: 0.7071, 0.7071; -0.7071, 0.7071; -0.7071, -0.7071; 0.7071, -0.7071
caption: $\frac{1}{z^4+1}$的四个单极点位于$e^{\pm i\pi/4}$和$e^{\pm 3i\pi/4}$。移动圆周并改变其大小，把$\oint f\,dz$的数值与$2\pi i$乘以所包围的留数之和作比较：二者一致，而且只有当某个极点穿过圆周时积分才会改变。当包围上方的两个极点时，积分为$\pi/\sqrt2\approx 2.221$——这正是下面将要算出的$\int_{-\infty}^\infty\frac{dx}{1+x^4}$的值。
:::

## 三角函数的积分

$\cos\theta$和$\sin\theta$的有理函数在一个完整周期上的积分，可以化为沿单位圆周的围道积分。令$z = e^{i\theta}$，$0\le\theta\le2\pi$，则$dz = iz\,d\theta$，并且

$$
\cos\theta = \frac12\Big(z + \frac1z\Big), \qquad \sin\theta = \frac{1}{2i}\Big(z - \frac1z\Big), \qquad d\theta = \frac{dz}{iz} .
$$ {#eq-trig-sub}

::: example 一个三角函数积分 {#ex-trig}
计算$\displaystyle\int_0^{2\pi}\frac{d\theta}{2 + \cos\theta}$。
::: solution
由[[#eq-trig-sub]]，该积分等于

$$
\oint_{\abs z = 1}\frac{1}{2 + \frac12(z + z^{-1})}\cdot\frac{dz}{iz} = \oint_{\abs z = 1}\frac{2\,dz}{iz\,(4 + z + z^{-1})} = \frac2i\oint_{\abs z = 1}\frac{dz}{z^2 + 4z + 1} .
$$

分母在$z = -2\pm\sqrt3$处为零。由于$\sqrt3\approx1.732$，根$z_1 = -2 + \sqrt3\approx-0.268$位于单位圆内，而$z_2 = -2 - \sqrt3\approx-3.73$位于单位圆外。在单极点$z_1$处，由[[#prop-res-formulas]]中的公式(2)，留数为$\frac{1}{2z_1 + 4} = \frac{1}{2\sqrt3}$。由留数定理，

$$
\int_0^{2\pi}\frac{d\theta}{2 + \cos\theta} = \frac2i\cdot2\pi i\cdot\frac{1}{2\sqrt3} = \frac{2\pi}{\sqrt3}\approx3.628 .
$$

快速检验一下合理性：被积函数介于$\frac13$与$1$之间，所以积分介于$\frac{2\pi}{3}\approx2.09$与$2\pi\approx6.28$之间。
:::
:::

## 有理函数的反常积分

对于整个实轴上的积分，我们用一个大半圆把区间$[-R, R]$封闭起来，并证明在极限下半圆上的积分没有贡献。

::: proposition 有理函数的积分 {#prop-rational}
设$P$和$Q$是多项式，$\deg Q\ge\deg P + 2$，且$Q$没有实零点，则

$$
\int_{-\infty}^\infty\frac{P(x)}{Q(x)}\,dx = 2\pi i\sum_{\operatorname{Im} a > 0}\Res_{z=a}\frac{P(z)}{Q(z)},
$$

其中求和取遍$Q$在上半平面内的零点。
:::

::: proof
令$f = P/Q$。由于$\deg Q\ge\deg P + 2$，存在常数$C$和$R_0$，使得当$\abs z\ge R_0$时$\abs{f(z)}\le C/\abs z^2$（与代数基本定理的证明中一样，比较首项即可）。特别地，$\int_{-\infty}^\infty f$绝对收敛。对大于$Q$的所有零点的模的$R > R_0$，令$\gamma_R$为线段$[-R, R]$接上半圆$C_R$：$z = Re^{it}$，$0\le t\le\pi$。这条正向简单闭围道所包围的恰好是$Q$在上半平面内的零点，所以

$$
\int_{-R}^R f(x)\,dx + \int_{C_R}f(z)\,dz = 2\pi i\sum_{\operatorname{Im} a > 0}\Res_a f .
$$

由ML不等式，$\left\lvert\int_{C_R}f\right\rvert\le\frac{C}{R^2}\cdot\pi R\to0$，令$R\to\infty$即得结论。
:::

::: example 引言中的积分 {#ex-quartic}
证明$\displaystyle\int_{-\infty}^\infty\frac{dx}{1 + x^4} = \frac{\pi}{\sqrt2}$。
::: solution
$z^4 + 1$的零点是$-1$的四个四次方根：$e^{i\pi/4}, e^{3i\pi/4}, e^{5i\pi/4}, e^{7i\pi/4}$。其中位于上半平面的两个是$a_1 = e^{i\pi/4} = \frac{1 + i}{\sqrt2}$和$a_2 = e^{3i\pi/4} = \frac{-1 + i}{\sqrt2}$。由[[#ex-residues]](c)，在$z^4 + 1$的单零点$a$处的留数为$-a/4$，所以

$$
\Res_{a_1} + \Res_{a_2} = -\frac{a_1 + a_2}{4} = -\frac14\cdot\frac{2i}{\sqrt2} = -\frac{i}{2\sqrt2} .
$$

[[#prop-rational]]中的次数条件成立（$4\ge0 + 2$），所以

$$
\int_{-\infty}^\infty\frac{dx}{1 + x^4} = 2\pi i\cdot\Big(-\frac{i}{2\sqrt2}\Big) = \frac{\pi}{\sqrt2}\approx2.221 .
$$

答案是正实数，这是理所当然的——这可以用来检验符号是否有误。
:::
:::

::: example 二阶极点 {#ex-double-pole}
计算$\displaystyle\int_{-\infty}^\infty\frac{dx}{(x^2 + 1)^2}$。
::: solution
$\frac{1}{(z^2+1)^2} = \frac{1}{(z - i)^2(z + i)^2}$在$i$处有$2$阶极点，这是上半平面内唯一的极点。由[[#eq-res-order-m]]（取$m = 2$），

$$
\Res_{z = i}\frac{1}{(z^2 + 1)^2} = \frac{d}{dz}\frac{1}{(z + i)^2}\Big|_{z = i} = \frac{-2}{(2i)^3} = \frac{-2}{-8i} = \frac{1}{4i} .
$$

所以积分等于$2\pi i\cdot\frac{1}{4i} = \frac\pi2$。（验证：作代换$x = \tan\theta$，积分化为$\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = \frac\pi2$。）
:::
:::

## 傅里叶积分与若尔当引理

像$\int_{-\infty}^\infty\frac{\cos x}{x^2 + 1}\,dx$这样的积分在傅里叶分析中经常出现。自然的想法是沿半圆积分$\frac{\cos z}{z^2 + 1}$——但这行不通，因为$\cos z$在上半平面内并不小：$\abs{\cos(iy)} = \cosh y$呈指数增长。补救的办法是改用在上半平面内**衰减**的$e^{iz}$（$\abs{e^{iz}} = e^{-\operatorname{Im} z}$），最后再取实部。

::: lemma 若尔当（Jordan）引理 {#lem-jordan}
设$C_R$为半圆$z = Re^{it}$，$0\le t\le\pi$，并设在$C_R$上$\abs{f(z)}\le M_R$，则

$$
\left\lvert\int_{C_R}f(z)e^{iz}\,dz\right\rvert\le\pi M_R .
$$

特别地，若当$R\to\infty$时$M_R\to0$，则$\int_{C_R}f(z)e^{iz}\,dz\to0$。
:::

::: proof
在$C_R$上，$\abs{e^{iz}} = e^{-R\sin t}$，$\abs{dz} = R\,dt$，所以

$$
\left\lvert\int_{C_R}f(z)e^{iz}\,dz\right\rvert\le M_R\int_0^\pi e^{-R\sin t}R\,dt = 2M_RR\int_0^{\pi/2}e^{-R\sin t}\,dt .
$$

由于$\sin$在$[0,\pi/2]$上是凹函数，它的图像位于弦的上方：在该区间上$\sin t\ge\frac{2t}{\pi}$。因此

$$
2M_RR\int_0^{\pi/2}e^{-R\sin t}\,dt\le2M_RR\int_0^{\pi/2}e^{-2Rt/\pi}\,dt = 2M_RR\cdot\frac{\pi}{2R}\big(1 - e^{-R}\big) < \pi M_R .
$$
:::

若尔当引理的要点在于只需$M_R\to0$——单纯的ML不等式则需要$M_R\cdot\pi R\to0$，而对$f(z) = 1/z$这并不成立。

::: example 一个傅里叶积分 {#ex-fourier}
证明$\displaystyle\int_{-\infty}^\infty\frac{\cos x}{x^2 + 1}\,dx = \frac{\pi}{e}$。
::: solution
令$f(z) = \frac{e^{iz}}{z^2 + 1}$，并用半圆$C_R$（$R > 1$）把$[-R, R]$封闭起来。内部唯一的极点是单极点$z = i$，其留数为

$$
\Res_{z=i}\frac{e^{iz}}{z^2 + 1} = \frac{e^{i\cdot i}}{2i} = \frac{e^{-1}}{2i} .
$$

所以$\int_{-R}^Rf(x)\,dx + \int_{C_R}f(z)\,dz = 2\pi i\cdot\frac{e^{-1}}{2i} = \frac\pi e$。在$C_R$上，$\big\lvert\frac{1}{z^2 + 1}\big\rvert\le\frac{1}{R^2 - 1} = M_R\to0$，所以由[[#lem-jordan]]，半圆上的积分趋于$0$（这里甚至用ML不等式就够了）。因此

$$
\int_{-\infty}^\infty\frac{e^{ix}}{x^2 + 1}\,dx = \frac{\pi}{e} .
$$

取实部得$\int_{-\infty}^\infty\frac{\cos x}{x^2+1}\,dx = \frac{\pi}{e}\approx1.156$，取虚部得$\int_{-\infty}^\infty\frac{\sin x}{x^2 + 1}\,dx = 0$，这对奇的被积函数而言正在意料之中。
:::
:::

当被积函数在实轴**上**有单极点时，我们沿一个小半圆绕过它。

::: lemma 小半圆 {#lem-indent}
设$f$以$a$为单极点，$c_\eps$是上半圆$z = a + \eps e^{it}$，方向为从$t = \pi$到$t = 0$（顺时针，从$a - \eps$到$a + \eps$），则

$$
\lim_{\eps\to0^+}\int_{c_\eps}f(z)\,dz = -\pi i\Res_{z=a}f(z) .
$$
:::

::: proof
在$a$附近，$f(z) = \frac{c_{-1}}{z - a} + h(z)$，其中$h$解析，因而在$a$附近以某个$K$为界。直接计算得$\int_{c_\eps}\frac{c_{-1}}{z - a}\,dz = \int_\pi^0\frac{c_{-1}}{\eps e^{it}}\,i\eps e^{it}\,dt = -\pi i\,c_{-1}$，而$\left\lvert\int_{c_\eps}h\right\rvert\le K\pi\eps\to0$。
:::

::: example 狄利克雷积分 {#ex-dirichlet}
证明$\displaystyle\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$。
::: solution
函数$f(z) = \frac{e^{iz}}{z}$以$0$为单极点，留数为$e^0 = 1$。沿如下闭围道对它积分：线段$[-R, -\eps]$，[[#lem-indent]]中的小半圆$c_\eps$（从$-\eps$到$\eps$，经过$0$的上方），线段$[\eps, R]$，以及大半圆$C_R$。该围道内部没有奇点，所以由柯西积分定理，

$$
\int_{-R}^{-\eps}\frac{e^{ix}}{x}\,dx + \int_{c_\eps}f\,dz + \int_\eps^R\frac{e^{ix}}{x}\,dx + \int_{C_R}f\,dz = 0 .
$$

在第一个积分中作代换$x\mapsto-x$，两段直线上的积分合并为

$$
\int_\eps^R\frac{e^{ix} - e^{-ix}}{x}\,dx = 2i\int_\eps^R\frac{\sin x}{x}\,dx .
$$

当$R\to\infty$时，由若尔当引理（取$M_R = 1/R$），$\int_{C_R}f\to0$。当$\eps\to0$时，由[[#lem-indent]]，$\int_{c_\eps}f\to-\pi i\cdot1$。取极限得$2i\int_0^\infty\frac{\sin x}{x}\,dx - \pi i = 0$，所以$\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$。（这个积分只是条件收敛的，所以需要对称的积分限，并仔细处理两端。）
:::
:::

::: quiz
要用留数计算$\int_{-\infty}^\infty\frac{\cos 3x}{x^2 + 4}\,dx$，应该沿上半平面中的大半圆对哪个函数积分？
- [ ] $\dfrac{\cos 3z}{z^2 + 4}$
- [x] $\dfrac{e^{3iz}}{z^2 + 4}$
- [ ] $\dfrac{e^{-3iz}}{z^2 + 4}$
- [ ] $\dfrac{\sin 3z}{z^2 + 4}$
::: solution
离开实轴后，$\cos 3z$和$\sin 3z$像$\frac12e^{3\abs y}$那样增长，所以它们在半圆上的积分不趋于零。$e^{3iz}$在上半平面内的模为$e^{-3y}\le1$，并且（作代换$w = 3z$后）可以应用若尔当引理。$e^{-3iz}$则是在**下**半平面内衰减。答案是$2\pi i\Res_{z = 2i}\frac{e^{3iz}}{z^2+4} = 2\pi i\frac{e^{-6}}{4i} = \frac{\pi}{2}e^{-6}$的实部。
:::
:::

## 辐角原理与儒歇定理

留数还能用来计数。若$f$在$a$处有$m$阶零点，则$f(z) = (z - a)^mg(z)$，其中$g(a)\neq0$，而**对数导数**为

$$
\frac{f'(z)}{f(z)} = \frac{m(z - a)^{m-1}g(z) + (z - a)^mg'(z)}{(z - a)^mg(z)} = \frac{m}{z - a} + \frac{g'(z)}{g(z)},
$$

其中$g'/g$在$a$附近解析。所以$f'/f$在$a$处有单极点，留数为$m$。在$m$阶极点处，用$(z - a)^{-m}$作同样的计算，得到留数$-m$。在开集上除极点外处处解析的函数称为在该开集上**亚纯**。

::: theorem 辐角原理 {#thm-argument}
设$\gamma$是正向简单闭围道，$f$在包含$\gamma$及其内部的某个开集上亚纯，并且在$\gamma$上没有零点和极点，则

$$
\frac{1}{2\pi i}\oint_\gamma\frac{f'(z)}{f(z)}\,dz = Z - P,
$$ {#eq-argument}

其中$Z$和$P$分别是$f$在$\gamma$内部的零点个数和极点个数（按重数计算）。
:::

::: proof
不恒为零的亚纯函数的零点和极点都是孤立的，所以在由$\gamma$围成的紧区域中只有有限个。函数$f'/f$除这些点外处处解析；由上面的计算，它在这些点处有单极点，在$m$阶零点处留数为$m$，在$m$阶极点处留数为$-m$。由留数定理即得[[#eq-argument]]。
:::

为什么叫“辐角”原理？作代换$w = f(z)$，[[#eq-argument]]的左端变为$\frac{1}{2\pi i}\oint_{f\circ\gamma}\frac{dw}{w}$，这就是像曲线绕原点的环绕数$n(f\circ\gamma, 0)$（[[complex-analysis/contour-integrals#def-winding]]）。等价地，它是当$z$沿$\gamma$绕行一周时$\arg f(z)$的总改变量除以$2\pi$。所以，**$\gamma$内部的零点个数减去极点个数，等于$f(\gamma)$绕$0$的圈数**——这是可以从图上读出来的。

::: widget winding
fx: cos(5t) + 3cos(t) + 1
fy: sin(5t) + 3sin(t)
t: 0, 2pi
point: 0, 0
caption: 单位圆周在$f(z) = z^5 + 3z + 1$下的像。当该点位于原点时，环绕数为$1$，所以$f$在单位圆盘内恰有一个零点。把该点拖到某个值$w$：绕$w$的环绕数就是方程$f(z) = w$在圆盘内的解的个数。圆周$\lvert z\rvert = 2$的像（图中未画出）绕$0$转$5$圈——全部五个零点都位于$\lvert z\rvert < 2$内。
:::

辐角原理有一个非常稳健的推论：小的扰动不能改变零点的个数。

::: theorem 儒歇定理 {#thm-rouche}
设$\gamma$是简单闭围道，$f$和$g$在包含$\gamma$及其内部的某个开集上解析。若

$$
\abs{g(z)} < \abs{f(z)}\qquad\text{对所有 } z \text{（在 } \gamma \text{ 上）},
$$

则$f$与$f + g$在$\gamma$内部的零点个数（按重数计算）相同。
:::

::: proof
对$0\le t\le1$，令$f_t = f + tg$。在$\gamma$上，$\abs{f_t}\ge\abs f - t\abs g\ge\abs f - \abs g > 0$，所以每个$f_t$在$\gamma$上都不为零，由辐角原理，$f_t$在$\gamma$内部的零点个数为

$$
N(t) = \frac{1}{2\pi i}\oint_\gamma\frac{f'(z) + tg'(z)}{f(z) + tg(z)}\,dz .
$$

被积函数连续地依赖于$(t, z)\in[0,1]\times\gamma$，并且它的分母的模有正的下界$\min_\gamma(\abs f - \abs g) > 0$（这是正的连续函数在紧集$\gamma$上的最小值）。所以$N(t)$是$t$的连续函数（被积函数在紧集$[0,1]\times\gamma$上一致连续）。但对每个$t$，$N(t)$都是整数。$[0,1]$上取整数值的连续函数是常数，所以$N(0) = N(1)$：$f$与$f + g$的零点个数相同。
:::

直观图景：把$f(z)$想象成一个绕着一棵树（原点）散步的人，把$f(z) + g(z)$想象成一条用长为$\abs{g(z)}$的绳子牵着的狗。如果绳子始终比人到树的距离短，那么狗绕树的圈数就恰好与人相同。

::: example 圆环中零点的个数 {#ex-rouche}
$p(z) = z^5 + 3z + 1$在圆盘$\abs z < 1$内有多少个零点？在圆环$1 < \abs z < 2$内有多少个？
::: solution
**在$\abs z = 1$上：**取$f(z) = 3z$，$g(z) = z^5 + 1$，则$\abs g\le\abs z^5 + 1 = 2 < 3 = \abs f$。由儒歇定理，$p = f + g$在$\abs z < 1$内的零点个数与$3z$相同，即一个。

**在$\abs z = 2$上：**取$f(z) = z^5$，$g(z) = 3z + 1$，则$\abs g\le3\cdot2 + 1 = 7 < 32 = \abs f$。所以$p$在$\abs z < 2$内的零点个数与$z^5$相同，即五个。

$\abs z = 1$上的严格不等式还表明$p$在单位圆周**上**没有零点（在那里$\abs p\ge\abs f - \abs g > 0$）。因此恰有$5 - 1 = 4$个零点位于圆环$1 < \abs z < 2$内。数值计算表明，这些零点的模约为$0.33$、$1.26$、$1.26$、$1.37$和$1.37$。
:::
:::

儒歇定理又给出了代数基本定理的一个证明：对$p(z) = z^n + a_{n-1}z^{n-1} + \dots + a_0$，在$R > 1 + \abs{a_{n-1}} + \dots + \abs{a_0}$的圆周$\abs z = R$上，低次项之和的模小于$z^n$的模，所以$p$在$\abs z < R$内恰有$n$个零点。

::: quiz
$z^7 - 5z^3 + 1$在单位圆盘$\abs z < 1$内有多少个零点？
- [ ] $7$
- [x] $3$
- [ ] $1$
- [ ] $0$
::: solution
在$\abs z = 1$上与占优项$f(z) = -5z^3$比较：其余部分$g(z) = z^7 + 1$满足$\abs g\le2 < 5 = \abs f$。由儒歇定理，该多项式在圆盘内的零点个数与$-5z^3$相同，即$3$个（原点处的三重零点，按重数计算）。
:::
:::

::: application 稳定性与奈奎斯特判据
线性系统——电路、机械结构、自动驾驶仪——当其传递函数的所有极点都位于左半平面$\operatorname{Re} s < 0$内时是稳定的，因为每个极点$s_0$都会给响应贡献一项$e^{s_0t}$。在开环传递函数为$L(s)$的反馈回路中，闭环极点就是$1 + L(s)$的零点。在一个包围右半平面的巨大半圆上对$1 + L$应用辐角原理，就得到**奈奎斯特稳定性判据**（Harry Nyquist，1932年）：闭环系统稳定，当且仅当曲线$\omega\mapsto L(i\omega)$按逆时针方向绕点$-1$的圈数等于$L$在右半平面内的极点个数。工程师直接从这张图上读出稳定裕度，而无需计算任何一个极点。传递函数来自[[ode/laplace-transform]]一章中的拉普拉斯变换。
:::

::: history
柯西（Cauchy）在用围道积分计算定积分十年之后，于1826年在他的《数学习题集》（*Exercices de mathématiques*）中引入了留数（*résidus*）；辐角原理也可以追溯到他的工作。欧仁·儒歇（Eugène Rouché）于1862年在《巴黎综合理工学院学报》（*Journal de l'École polytechnique*）上的一篇论文中发表了他的定理。恩斯特·林德勒夫（Ernst Lindelöf）的著作《留数演算》（*Le calcul des résidus*，1905年）汇集了计算积分与求和的各种技巧，这些技巧至今仍在讲授。20世纪，通过奈奎斯特（Nyquist）1932年对反馈放大器的分析，辐角原理在工程学中找到了一个意想不到的用武之地。
:::

## 后续内容

留数定理是复分析中应用最广泛的工具。它可以计算拉普拉斯逆变换和傅里叶逆变换（[[ode/laplace-transform]]，[[pde/fourier-transform]]），可以求像$\sum 1/n^2$这样的级数的和（[[#exr-basel]]），还可以通过生成函数给出组合学中的渐近公式（[[discrete/generating-functions]]）。辐角原理和儒歇定理可以确定多项式和超越函数的零点位置，而它们背后的环绕数就是闭曲线的度，[[topology/fundamental-group]]一章将从拓扑的角度研究它。最后，由辐角原理推出的开映射性质——非常数解析函数把开集映为开集——是[[complex-analysis/conformal-maps]]一章的出发点。

::: summary
- $f$在孤立奇点处的留数是洛朗系数$c_{-1} = \frac{1}{2\pi i}\oint f$（沿一个小圆周积分）；在单极点处它等于$\lim(z - a)f(z)$或$g(a)/h'(a)$，在$m$阶极点处用[[#eq-res-order-m]]，在本性奇点处则展开成级数。
- 留数定理：$\oint_\gamma f = 2\pi i\sum\Res$，求和取遍正向简单闭围道内部的奇点。
- $\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta$：代换$z = e^{i\theta}$，再对单位圆内的留数求和。
- $\int_{-\infty}^\infty P/Q$（$\deg Q\ge\deg P + 2$）：用半圆封闭；结果是$2\pi i$乘以上半平面内的留数之和。
- 对$\int f(x)\cos x\,dx$，使用$e^{iz}$和若尔当引理；用小半圆绕过实轴上的极点，每个顺时针小半圆贡献$-\pi i\Res$。
- 辐角原理：$\frac{1}{2\pi i}\oint f'/f = Z - P$，即$f(\gamma)$绕$0$的环绕数。儒歇定理：若在$\gamma$上$\abs g < \abs f$，则$f$与$f + g$在$\gamma$内部的零点个数相同。
:::

## 习题

::: exercise 由级数求留数 {level=1 check="-1/6"}
求$\displaystyle\Res_{z = 0}\frac{\sin z}{z^4}$。
::: solution
$\dfrac{\sin z}{z^4} = \dfrac{1}{z^4}\Big(z - \dfrac{z^3}{6} + \dfrac{z^5}{120} - \cdots\Big) = \dfrac{1}{z^3} - \dfrac{1}{6z} + \dfrac{z}{120} - \cdots$，所以留数为$-\frac16$。
:::
:::

::: exercise 三阶极点 {level=1 check="2"}
求$\displaystyle\Res_{z = 0}\frac{e^{2z}}{z^3}$。
::: solution
由[[#eq-res-order-m]]，取$m = 3$：$\frac{1}{2!}\frac{d^2}{dz^2}e^{2z}\big|_{z=0} = \frac{4}{2} = 2$。（由级数：$e^{2z} = 1 + 2z + 2z^2 + \cdots$，$z^2$的系数为$2$。）
:::
:::

::: exercise 第一个实积分 {level=1 check="pi/2"}
用留数计算$\displaystyle\int_{-\infty}^\infty\frac{dx}{x^2 + 4}$，并用反正切函数验证答案。
::: solution
上半平面内唯一的极点是$2i$，留数为$\frac{1}{2\cdot2i} = \frac1{4i}$。由[[#prop-rational]]，积分等于$2\pi i\cdot\frac{1}{4i} = \frac\pi2$。验证：$\int\frac{dx}{x^2+4} = \frac12\arctan\frac x2$，它在整个实轴上的增量为$\frac12\pi$。
:::
:::

::: exercise 一个三角函数积分 {level=2 check="pi/2"}
计算$\displaystyle\int_0^{2\pi}\frac{d\theta}{5 + 3\cos\theta}$。
::: solution
利用[[#eq-trig-sub]]：$\oint_{\abs z = 1}\frac{1}{5 + \frac32(z + z^{-1})}\frac{dz}{iz} = \frac{2}{i}\oint_{\abs z = 1}\frac{dz}{3z^2 + 10z + 3}$。$3z^2 + 10z + 3 = 3(z + \frac13)(z + 3)$的根为$-\frac13$（在内部）和$-3$（在外部）。在$-\frac13$处的留数为$\frac{1}{6z + 10}\big|_{z = -1/3} = \frac18$。所以积分等于$\frac2i\cdot2\pi i\cdot\frac18 = \frac\pi2$。（一般地，当$a > \abs b$时，$\int_0^{2\pi}\frac{d\theta}{a + b\cos\theta} = \frac{2\pi}{\sqrt{a^2 - b^2}}$；这里为$\frac{2\pi}{4}$。）
:::
:::

::: exercise 带分子的四次有理函数 {level=2 check="pi/sqrt(2)"}
计算$\displaystyle\int_{-\infty}^\infty\frac{x^2}{x^4 + 1}\,dx$。
::: solution
次数条件成立（$4\ge2 + 2$）。在$z^4 + 1$的单零点$a$处，$\frac{z^2}{z^4+1}$的留数为$\frac{a^2}{4a^3} = \frac1{4a} = \frac{\bar a}{4}$（因为$\abs a = 1$）。对$a_1 = e^{i\pi/4}$和$a_2 = e^{3i\pi/4}$：$\frac{\bar a_1 + \bar a_2}{4} = \frac14\Big(\frac{1 - i}{\sqrt2} + \frac{-1 - i}{\sqrt2}\Big) = -\frac{i}{2\sqrt2}$。积分等于$2\pi i\cdot\big(-\frac{i}{2\sqrt2}\big) = \frac{\pi}{\sqrt2}$——与$\int\frac{dx}{1 + x^4}$的值相同，这一点由代换$x\mapsto1/x$也可以看出。
:::
:::

::: exercise 一个衰减的傅里叶积分 {level=2 check="pi*exp(-2)"}
计算$\displaystyle\int_{-\infty}^\infty\frac{\cos 2x}{x^2 + 1}\,dx$。
::: solution
沿上半圆围道对$\frac{e^{2iz}}{z^2 + 1}$积分。在$C_R$上，$\abs{e^{2iz}}\le1$且$\frac{1}{\abs{z^2+1}}\le\frac{1}{R^2 - 1}$，所以单用ML不等式就可以说明圆弧上积分的模至多为$\frac{\pi R}{R^2 - 1}\to0$。在$i$处的留数为$\frac{e^{2i\cdot i}}{2i} = \frac{e^{-2}}{2i}$，所以$\int_{-\infty}^\infty\frac{e^{2ix}}{x^2 + 1}\,dx = 2\pi i\cdot\frac{e^{-2}}{2i} = \pi e^{-2}$，取实部即得答案$\pi e^{-2}\approx0.425$。
:::
:::

::: exercise 圆环中的零点 {level=2 check="3"}
$z^4 - 6z + 3$在圆环$1 < \abs z < 2$内有多少个零点？
::: solution
在$\abs z = 2$上：$\abs{z^4} = 16 > 15\ge\abs{-6z + 3}$，所以在$\abs z < 2$内有$4$个零点。在$\abs z = 1$上：$\abs{-6z} = 6 > 4\ge\abs{z^4 + 3}$，所以在$\abs z < 1$内有$1$个零点，并且在$\abs z = 1$上没有零点。因此有$4 - 1 = 3$个零点位于圆环内。
:::
:::

::: exercise 钥匙孔形围道 {level=3}
设$0 < a < 1$。证明

$$
\int_0^\infty\frac{x^{a-1}}{1 + x}\,dx = \frac{\pi}{\sin\pi a} .
$$
::: hint
沿一个“钥匙孔”对$f(z) = \frac{z^{a-1}}{1 + z}$积分，其中$z^{a-1} = e^{(a-1)\log z}$，$\arg z\in(0, 2\pi)$；钥匙孔由大圆周$\abs z = R$、小圆周$\abs z = \eps$（顺时针）以及沿正实轴的割线的两岸组成。
:::
::: solution
取分支$z^{a-1} = \abs z^{a-1}e^{i(a-1)\theta}$，其中$\theta = \arg z\in(0, 2\pi)$，它在$\C\setminus[0,\infty)$上解析。钥匙孔形围道由以下几部分组成：割线上岸从$\eps$到$R$的部分（在那里$\theta\to0$，所以$z^{a-1} = x^{a-1}$）；逆时针方向的圆周$C_R$；下岸从$R$回到$\eps$的部分（在那里$\theta\to2\pi$，所以$z^{a-1} = x^{a-1}e^{2\pi i(a-1)} = x^{a-1}e^{2\pi ia}$）；以及顺时针方向的圆周$c_\eps$。围道内部只有一个单极点$z = -1 = e^{i\pi}$，其留数为$(-1)^{a-1} = e^{i\pi(a-1)} = -e^{i\pi a}$。

**圆周上的积分趋于零。**在$C_R$上：$\abs{f}\le\frac{R^{a-1}}{R - 1}$，由ML不等式，积分的模至多为$\frac{2\pi R^a}{R - 1}\to0$，这是因为$a < 1$。在$c_\eps$上：$\abs f\le\frac{\eps^{a-1}}{1 - \eps}$，积分的模至多为$\frac{2\pi\eps^a}{1 - \eps}\to0$，这是因为$a > 0$。

**割线的两岸。**记$I = \int_0^\infty\frac{x^{a-1}}{1 + x}\,dx$（当$0 < a < 1$时它在两端都收敛），则在极限下两岸的贡献为$I - e^{2\pi ia}I$。由留数定理（钥匙孔形围道是绕$-1$的简单闭围道），

$$
(1 - e^{2\pi ia})\,I = 2\pi i\cdot\big(-e^{i\pi a}\big) .
$$

因此

$$
I = \frac{-2\pi ie^{i\pi a}}{1 - e^{2\pi ia}} = \frac{-2\pi i}{e^{-i\pi a} - e^{i\pi a}} = \frac{-2\pi i}{-2i\sin\pi a} = \frac{\pi}{\sin\pi a} .
$$

取$a = \frac12$，得$\int_0^\infty\frac{dx}{\sqrt x(1 + x)} = \pi$，这可以用代换$x = t^2$来验证。
:::
:::

::: exercise 平方倒数之和 {#exr-basel level=3 check="pi^2/6"}
利用$f(z) = \dfrac{\pi\cot\pi z}{z^2}$以及以$(N + \frac12)(\pm1\pm i)$为顶点的正方形$Q_N$，证明$\displaystyle\sum_{n=1}^\infty\frac{1}{n^2} = \frac{\pi^2}{6}$。可以利用在$0$附近$\pi\cot\pi z = \frac1z - \frac{\pi^2}{3}z + O(z^3)$这一事实。
::: hint
证明在每个$Q_N$上$\abs{\cot\pi z}\le2$，从而$\oint_{Q_N}f\to0$，再计算在各整数点处的留数。
:::
::: solution
**留数。**$\pi\cot\pi z = \frac{\pi\cos\pi z}{\sin\pi z}$在各整数$n$处有单极点，由公式(2)，留数为$\frac{\pi\cos\pi n}{\pi\cos\pi n} = 1$。当$n\neq0$时，因子$1/z^2$在$n$处解析，所以$\Res_{z = n}f = \frac{1}{n^2}$。在$0$处，$f(z) = \frac{1}{z^3} - \frac{\pi^2}{3z} + O(z)$，所以$\Res_0 f = -\frac{\pi^2}{3}$。

**估计。**写$z = x + iy$，则$\abs{\cot\pi z}^2 = \frac{\cos^2\pi x + \sinh^2\pi y}{\sin^2\pi x + \sinh^2\pi y}$（由[[complex-analysis/elementary-functions]]一章中关于$\abs{\sin}$和$\abs{\cos}$的公式）。在竖直边$x = \pm(N + \frac12)$上，$\cos\pi x = 0$，$\sin^2\pi x = 1$，所以$\abs{\cot\pi z}^2 = \frac{\sinh^2\pi y}{1 + \sinh^2\pi y}\le1$。在水平边上$\abs y = N + \frac12\ge\frac12$，所以$\abs{\cot\pi z}^2\le\frac{1 + \sinh^2\pi y}{\sinh^2\pi y} = \coth^2\pi y\le\coth^2\frac\pi2 < 4$。所以在$Q_N$上（那里$\abs z\ge N + \frac12$）$\abs{f}\le\frac{2\pi}{(N + 1/2)^2}$，而$Q_N$的长度为$8(N + \frac12)$；由ML不等式得$\left\lvert\oint_{Q_N}f\right\rvert\le\frac{16\pi}{N + 1/2}\to0$。

**结论。**$Q_N$包围极点$-N,\dots,N$，所以由留数定理，

$$
\oint_{Q_N}f\,dz = 2\pi i\Big(-\frac{\pi^2}{3} + 2\sum_{n=1}^N\frac{1}{n^2}\Big)\longrightarrow0,
$$

因此$\sum_{n\ge1}\frac{1}{n^2} = \frac{\pi^2}{6}$。
:::
:::

::: exercise 扇形围道 {level=3 check="2*pi/(3*sqrt(3))"}
通过沿扇形$\set{re^{i\theta} : 0\le r\le R,\ 0\le\theta\le\frac{2\pi}{3}}$的边界对$\frac{1}{1 + z^3}$积分，计算$\displaystyle\int_0^\infty\frac{dx}{1 + x^3}$。
::: solution
令$\omega = e^{2\pi i/3}$，$I = \int_0^\infty\frac{dx}{1 + x^3}$。扇形的边界由$[0, R]$、从$R$到$R\omega$的圆弧$\Gamma_R$，以及从$R\omega$回到$0$的线段组成。在该线段上$z = t\omega$，$z^3 = t^3$，所以它的贡献为$-\omega\int_0^R\frac{dt}{1 + t^3}$。圆弧上积分的模至多为$\frac{2\pi R/3}{R^3 - 1}\to0$。$1 + z^3$在扇形内部唯一的零点是$a = e^{i\pi/3}$（其余两个是$-1$和$e^{-i\pi/3}$），留数为$\frac{1}{3a^2} = \frac{a}{3a^3} = -\frac{a}{3}$。令$R\to\infty$，得

$$
(1 - \omega)I = 2\pi i\Big(-\frac{e^{i\pi/3}}{3}\Big) .
$$

由于$1 - \omega = 1 - e^{2\pi i/3} = e^{i\pi/3}\big(e^{-i\pi/3} - e^{i\pi/3}\big) = -2i\sin\frac\pi3\,e^{i\pi/3} = -i\sqrt3\,e^{i\pi/3}$，我们得到

$$
I = \frac{-2\pi ie^{i\pi/3}/3}{-i\sqrt3\,e^{i\pi/3}} = \frac{2\pi}{3\sqrt3}\approx1.2092 .
$$
:::
:::
