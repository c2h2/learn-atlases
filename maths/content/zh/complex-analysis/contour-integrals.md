在实直线上，从$a$到$b$的积分本质上只有一种：沿着区间积分。在复平面上，从一点到另一点有无穷多条路线，复积分是沿着选定的曲线进行的。下面这个计算推动着本课程余下的全部内容。沿单位圆周$z = e^{it}$（$0 \le t \le 2\pi$）走一圈，把$1/z$的值乘以小步长$dz = ie^{it}\,dt$后加起来：

$$
\oint_{\abs z = 1}\frac{dz}{z} = \int_0^{2\pi}\frac{ie^{it}}{e^{it}}\,dt = \int_0^{2\pi} i\,dt = 2\pi i .
$$

尽管路径是闭的，答案却不是零——而且我们将会看到，如果把圆周换成任何其他绕原点一圈的闭曲线，答案也不会改变。这个积分探测到了使$1/z$出问题的点$0$，并计数曲线绕它转了多少圈。柯西定理、柯西积分公式和留数定理，都是这一个计算的深化和展开。

本章定义路径与围道积分，学习用参数化计算围道积分，用**ML不等式**估计它们，并弄清何时可以用原函数来计算它们——以及何时不能，比如$1/z$沿绕原点的曲线的积分。

## 路径与围道

::: definition 路径与围道 {#def-path}
**路径**是指连续映射$\gamma\colon[a, b]\to\C$；它的**起点**是$\gamma(a)$，**终点**是$\gamma(b)$。若$\gamma(a) = \gamma(b)$，则称路径是**闭**的；若路径不自交（对$s < t$有$\gamma(s) \neq \gamma(t)$，但对闭路径允许$\gamma(a) = \gamma(b)$），则称它是**简单**的。若$\gamma$在$[a,b]$上有连续导数$\gamma'(t) = x'(t) + iy'(t)$（在端点处取单侧导数），则称路径是**光滑**的；若路径是**逐段光滑**的，即$[a,b]$可以分成有限个子区间，使$\gamma$在每个子区间上都光滑，则称它为**围道**。
:::

最常用的两种围道是：

- 从$z_0$到$z_1$的**线段**，记作$[z_0, z_1]$：$\gamma(t) = z_0 + t(z_1 - z_0)$，$0\le t\le1$，$\gamma'(t) = z_1 - z_0$；
- 以$a$为圆心、$r$为半径的正向（逆时针方向）**圆周**，记作$\abs{z - a} = r$或$C(a, r)$：$\gamma(t) = a + re^{it}$，$0 \le t\le 2\pi$，$\gamma'(t) = ire^{it}$。

$\gamma\colon[a,b]\to\C$的**反向路径**是$\gamma^-(t) = \gamma(a + b - t)$，即沿相反方向走过的同一条曲线。若$\gamma_1$的终点是$\gamma_2$的起点，则**拼接**$\gamma_1 + \gamma_2$先沿$\gamma_1$走、再沿$\gamma_2$走；例如，多边形就是它各边的拼接。

导数$\gamma'(t)$是动点$\gamma(t)$的**速度**，它是一个与曲线相切的向量，而$\abs{\gamma'(t)}$是它的速率。围道的**长度**是速率的积分，

$$
L(\gamma) = \int_a^b\abs{\gamma'(t)}\,dt ,
$$

它与[[multivariable/vector-functions]]一章中的弧长一致。对圆周$C(a, r)$，$\abs{\gamma'(t)} = r$，$L = 2\pi r$。

::: widget parametric
fx: 0.5 + a*cos(t)
fy: a*sin(t)
t: 0, 2pi
sliders: a=1:0.3:2:0.1
x: -1.7, 2.7
y: -2.2, 2.2
equal: true
trace: true
caption: 沿逆时针方向描出的圆周$\gamma(t) = \tfrac12 + ae^{it}$及其速度向量$\gamma'(t) = iae^{it}$。乘以$i$把半径向量旋转一个直角，所以速度总是与圆周相切，其长度是恒定的速率$a$。用滑块改变半径：路径的长度$2\pi a$等于时间（$2\pi$）乘以速率。
:::

## 实变量复值函数的积分

在沿曲线积分之前，我们需要区间上复值函数的积分。若$\phi\colon[a,b]\to\C$连续（或逐段连续），$\phi = \alpha + i\beta$，我们定义

$$
\int_a^b\phi(t)\,dt = \int_a^b\alpha(t)\,dt + i\int_a^b\beta(t)\,dt .
$$

这个积分在$\C$上是线性的（把被积函数分成实部和虚部，即可验证对复数$c$有$\int c\phi = c\int\phi$），并且微积分基本定理成立：若在$[a,b]$上$\Phi' = \phi$，则$\int_a^b\phi = \Phi(b) - \Phi(a)$，只需对实部和虚部分别应用实的定理即可。例如，由于$\frac{d}{dt}\frac{e^{it}}{i} = e^{it}$，

$$
\int_0^{\pi}e^{it}\,dt = \frac{e^{i\pi} - 1}{i} = \frac{-2}{i} = 2i,
$$

这与$\int_0^\pi\cos t\,dt + i\int_0^\pi\sin t\,dt = 0 + 2i$相符。

唯一需要一点技巧的性质是积分的三角不等式。

::: lemma 积分的模 {#lem-modulus}
若$\phi\colon[a,b]\to\C$逐段连续，则

$$
\left\lvert\int_a^b\phi(t)\,dt\right\rvert \le \int_a^b\abs{\phi(t)}\,dt .
$$
:::

::: proof
令$I = \int_a^b\phi(t)\,dt$。若$I = 0$，则无需证明。否则记$I = \abs Ie^{i\theta}$。于是由线性性，

$$
\abs I = e^{-i\theta}I = \int_a^b e^{-i\theta}\phi(t)\,dt .
$$

左端是实数，所以右端等于它自身的实部，即$\int_a^b\operatorname{Re}\big(e^{-i\theta}\phi(t)\big)\,dt$。由于$\operatorname{Re} w \le \abs w$且$\abs{e^{-i\theta}} = 1$，

$$
\abs I = \int_a^b\operatorname{Re}\big(e^{-i\theta}\phi(t)\big)\,dt \le \int_a^b\abs{\phi(t)}\,dt .
$$
:::

这个技巧——把积分旋转到正实轴上，再比较实部——值得记住：它把一个关于复数的命题化为实积分的单调性。

## 围道积分

::: definition 围道积分 {#def-contour-integral}
设$\gamma\colon[a,b]\to\C$是围道，$f$是在$\gamma$的像上连续的函数。**$f$沿$\gamma$的积分**为

$$
\int_\gamma f(z)\,dz = \int_a^b f\big(\gamma(t)\big)\,\gamma'(t)\,dt .
$$ {#eq-contour}

（在$\gamma'$发生跳跃的有限个点处，被积函数有跳跃间断点，但它们不影响积分；等价地，也可以对各光滑段上的积分求和。）对闭围道，常写成$\oint_\gamma$。
:::

这个公式正是记号所暗示的：代入$z = \gamma(t)$和$dz = \gamma'(t)\,dt$。它也是对曲线上的点$z_k$所作的黎曼和$\sum f(z_k)(z_{k+1} - z_k)$的极限——复数值乘以复数步长。

::: proposition 基本性质 {#prop-props}
设$\gamma$是围道，$f, g$在其上连续。

1. **线性性**：对$\alpha,\beta\in\C$，$\int_\gamma(\alpha f + \beta g)\,dz = \alpha\int_\gamma f\,dz + \beta\int_\gamma g\,dz$。
2. **重新参数化**：若$\varphi\colon[c,d]\to[a,b]$是连续可微的递增双射，则$\int_{\gamma\circ\varphi}f\,dz = \int_\gamma f\,dz$。
3. **反向**：$\int_{\gamma^-}f\,dz = -\int_\gamma f\,dz$。
4. **可加性**：$\int_{\gamma_1 + \gamma_2} f\,dz = \int_{\gamma_1}f\,dz + \int_{\gamma_2}f\,dz$。
:::

::: proof
(1) 由实变量复值函数积分的线性性得到。对于(2)，先设$\gamma$光滑；由链式法则，$(\gamma\circ\varphi)'(s) = \gamma'(\varphi(s))\varphi'(s)$，而换元$t = \varphi(s)$（分别用于实部和虚部）给出

$$
\int_c^d f(\gamma(\varphi(s)))\,\gamma'(\varphi(s))\,\varphi'(s)\,ds = \int_a^b f(\gamma(t))\,\gamma'(t)\,dt .
$$

对于围道，把这一结果用于每个光滑段即可。(3) 这里$(\gamma^-)'(t) = -\gamma'(a + b - t)$，而换元$s = a + b - t$使积分上下限互换：

$$
\int_a^b f(\gamma(a + b - t))\,\big(-\gamma'(a+b-t)\big)\,dt = -\int_a^b f(\gamma(s))\,\gamma'(s)\,ds .
$$

(4) 在相邻区间上对$\gamma_1 + \gamma_2$进行参数化之后，这就是积分对子区间的可加性。
:::

所以围道积分只依赖于有向曲线，而与走过它的快慢无关。记$f = u + iv$，$dz = dx + i\,dy$，乘开得

$$
\int_\gamma f\,dz = \int_\gamma(u\,dx - v\,dy) + i\int_\gamma(v\,dx + u\,dy),
$$ {#eq-line-integrals}

所以围道积分就是一对[[multivariable/line-integrals]]一章所研究的那种实曲线积分。

::: theorem 基本积分 {#thm-fundamental}
对$a\in\C$，$r > 0$和$n\in\Z$，

$$
\oint_{\abs{z-a} = r}(z - a)^n\,dz = \begin{cases} 2\pi i & \text{若 } n = -1,\\ 0 & \text{若 } n\neq -1.\end{cases}
$$
:::

::: proof
取$\gamma(t) = a + re^{it}$，则$(\gamma(t) - a)^n = r^ne^{int}$，$\gamma'(t) = ire^{it}$，所以

$$
\oint_{\abs{z-a}=r}(z - a)^n\,dz = \int_0^{2\pi}r^ne^{int}\,ire^{it}\,dt = ir^{n+1}\int_0^{2\pi}e^{i(n+1)t}\,dt .
$$

若$n = -1$，则被积函数为$1$，积分为$2\pi i$。否则$\frac{e^{i(n+1)t}}{i(n+1)}$是$e^{i(n+1)t}$的一个原函数，它在$t = 0$和$t = 2\pi$处取相同的值，所以积分为$0$。
:::

这个定理连同它的证明都值得记住。它将是留数定理的引擎：在那里，函数被展开成幂$(z - a)^n$之和，而积分之后只有$n = -1$的项保留下来。

::: example 端点相同，结果不同 {#ex-path-dependence}
沿下列路径计算从$0$到$1 + i$的积分$\int_\gamma\bar z\,dz$和$\int_\gamma z^2\,dz$：(a) 线段$[0, 1 + i]$；(b) 先沿直线从$0$到$1$、再沿直线从$1$到$1+i$的路径$\gamma_2$。
::: solution
(a) 在线段上，$z = (1 + i)t$，$dz = (1+i)\,dt$，$\bar z = (1 - i)t$：

$$
\int_{[0, 1+i]}\bar z\,dz = \int_0^1(1 - i)t\,(1 + i)\,dt = 2\int_0^1 t\,dt = 1 .
$$

(b) 在$[0, 1]$上，$z = t$，$dz = dt$，得$\int_0^1t\,dt = \tfrac12$。在$[1, 1+i]$上，$z = 1 + it$，$dz = i\,dt$，$\bar z = 1 - it$，得

$$
\int_0^1(1 - it)\,i\,dt = i\int_0^1(1 - it)\,dt = i\Big(1 - \frac i2\Big) = \frac12 + i .
$$

沿$\gamma_2$的总和为$1 + i \neq 1$：**$\bar z$的积分依赖于路径。**

对于$z^2$：在线段上，$\int_0^1(1+i)^2t^2(1 + i)\,dt = \frac{(1+i)^3}{3}$。沿$\gamma_2$：$\int_0^1t^2\,dt + \int_0^1(1 + it)^2\,i\,dt = \tfrac13 + \big[\tfrac{(1+it)^3}{3}\big]_0^1 = \tfrac13 + \tfrac{(1+i)^3 - 1}{3} = \tfrac{(1+i)^3}{3}$。两条路线都给出$\frac{(1+i)^3}{3} = \frac{-2 + 2i}{3}$。对解析函数$z^2$而言，路径无关紧要；我们将在关于原函数的一节中看到其中的原因。
:::
:::

::: quiz
$\displaystyle\oint_{\abs z = 2}\bar z\,dz$等于多少？
- [ ] $0$，因为路径是闭的
- [ ] $2\pi i$
- [x] $8\pi i$
- [ ] $4\pi i$
::: solution
在圆周$\abs z = 2$上有$z\bar z = 4$，所以在那里$\bar z = 4/z$，从而由[[#thm-fundamental]]，$\oint 4/z\,dz = 4\cdot2\pi i = 8\pi i$。（直接计算：$\int_0^{2\pi}2e^{-it}\cdot 2ie^{it}\,dt = 8\pi i$。）只有对特殊的被积函数，沿闭路径的积分才为零；$\bar z$不是解析的，一般地，$\oint_{\abs z = r}\bar z\,dz = 2\pi i r^2$，即所围面积的$2i$倍（[[#exr-area]]）。
:::
:::

::: widget contourint
f: 1/z
center: 0.3, 0.2
radius: 1
poles: 0, 0
caption: $1/z$沿一个可移动圆周的数值积分，并与$2\pi i$乘以圆内的留数作比较（$1/z$只有一个留数，即原点处的$1$；留数的定义见[[complex-analysis/residues]]一章）。拖动圆周并改变其大小：只要圆周包围原点，无论圆心和半径如何，积分都恰好是$2\pi i \approx 6.283i$；一旦原点位于圆外，积分就降为$0$。一般性地证明这一点是[[complex-analysis/cauchy-theorem]]一章的任务。
:::

## ML不等式

大多数围道积分无法精确计算，但可以估计，而估计往往就是我们所需要的全部——例如，证明沿一个大半圆周的积分趋于$0$，这是用留数计算实积分的关键步骤。

::: theorem ML不等式 {#thm-ml}
设$\gamma$是长度为$L$的围道，$f$在$\gamma$上连续，且对$\gamma$上的一切$z$有$\abs{f(z)}\le M$。则

$$
\left\lvert\int_\gamma f(z)\,dz\right\rvert\le ML .
$$
:::

::: proof
由[[#lem-modulus]]以及$f$的界，

$$
\left\lvert\int_a^b f(\gamma(t))\gamma'(t)\,dt\right\rvert \le \int_a^b\abs{f(\gamma(t))}\,\abs{\gamma'(t)}\,dt \le M\int_a^b\abs{\gamma'(t)}\,dt = ML .
$$
:::

::: example 沿大半圆周的积分 {#ex-semicircle}
设$C_R$是圆周$\abs z = R$的上半部分，从$R$到$-R$。证明当$R \to\infty$时$\displaystyle\int_{C_R}\frac{dz}{z^2 + 1}\to 0$。
::: solution
$C_R$的长度为$\pi R$。为了从**上方**估计$\frac{1}{\abs{z^2+1}}$，需要从**下方**估计$\abs{z^2 + 1}$，这由反向三角不等式给出：对$\abs z = R > 1$，

$$
\abs{z^2 + 1}\ge\abs z^2 - 1 = R^2 - 1, \qquad\text{所以}\qquad \left\lvert\frac{1}{z^2 + 1}\right\rvert\le\frac{1}{R^2 - 1} .
$$

由[[#thm-ml]]，

$$
\left\lvert\int_{C_R}\frac{dz}{z^2+1}\right\rvert\le\frac{\pi R}{R^2 - 1}\longrightarrow 0 \qquad (R\to\infty).
$$

在[[complex-analysis/residues]]一章中，这一估计与留数定理相结合，无需求原函数就给出$\int_{-\infty}^\infty\frac{dx}{x^2+1} = \pi$。
:::
:::

::: warning 从下方估计分母
一个常见的错误是写出$\abs{z^2 + 1}\le R^2 + 1$，然后得出$\frac{1}{\abs{z^2 + 1}} \le \frac{1}{R^2 + 1}$。第一个不等式是对的，但取倒数会使不等号反向：分母的**上**界给出的是分式的**下**界。要从上方估计一个商，需要分子的上界和分母的下界，后者通常由$\abs{z - w}\ge\bigl\lvert\abs z - \abs w\bigr\rvert$得到。
:::

ML不等式的第二个推论使我们可以交换极限与积分的次序，这在处理幂级数时会用到。

::: corollary 一致极限 {#cor-uniform}
若在围道$\gamma$上$f_n\to f$一致收敛（所有函数都连续），则$\int_\gamma f_n\,dz\to\int_\gamma f\,dz$。特别地，在$\gamma$上一致收敛的连续函数项级数$\sum g_k$可以逐项积分。
:::

::: proof
令$M_n = \sup_{z\in\gamma}\abs{f_n(z) - f(z)}$；一致收敛意味着$M_n \to 0$。由[[#thm-ml]]，$\left\lvert\int_\gamma f_n\,dz - \int_\gamma f\,dz\right\rvert \le M_nL(\gamma) \to 0$。对于级数，利用线性性，把这一结论用于部分和即可。
:::

一致收敛在[[real-analysis/uniform-convergence]]一章中研究；魏尔斯特拉斯M判别法是证明一致收敛的常用方法。

## 原函数

对实函数，只要$F' = f$，就有$\int_a^b f = F(b) - F(a)$。沿任何围道，同样的结论也成立。

::: definition 原函数 {#def-primitive}
设$f$在区域$D$上连续。$f$在$D$上的**原函数**（primitive，也称 antiderivative）是指$D$上满足$F' = f$的解析函数$F$。
:::

::: theorem 围道积分基本定理 {#thm-ftc}
若$F$是$f$在$D$上的原函数，$\gamma$是$D$中从$z_0$到$z_1$的围道，则

$$
\int_\gamma f(z)\,dz = F(z_1) - F(z_0) .
$$

特别地，对$D$中的每条闭围道$\gamma$，$\oint_\gamma f(z)\,dz = 0$。
:::

::: proof
在每个光滑段上，由[[complex-analysis/analytic-functions#lem-curve]]，$\frac{d}{dt}F(\gamma(t)) = F'(\gamma(t))\gamma'(t) = f(\gamma(t))\gamma'(t)$，所以由实变量复值函数的微积分基本定理，在该段上的积分等于$F\circ\gamma$在该段两端的值之差。对各段求和，中间的值相互抵消，剩下$F(\gamma(b)) - F(\gamma(a)) = F(z_1) - F(z_0)$。
:::

这就解释了[[#ex-path-dependence]]：$z^2$在$\C$上有原函数$z^3/3$，所以它沿**任何**围道从$0$到$1+i$的积分都是$(1+i)^3/3$。它还重新证明了[[#thm-fundamental]]的一半：当$n\neq-1$时，$(z - a)^n$在$\C\setminus\set a$上有原函数$(z-a)^{n+1}/(n+1)$，所以它沿任何不经过$a$的闭围道的积分都为零。它还表明，$\bar z$在任何区域上都没有原函数，因为它的积分依赖于路径。

$n = -1$的情形则不同。如果$1/z$在$\C\setminus\set0$上有原函数，那么它沿单位圆周的积分就会为零——但这个积分是$2\pi i$。所以**$1/z$在去掉原点的平面上没有原函数**。在割缝平面$\C\setminus(-\infty,0]$上它确实有原函数，即$\Log z$（[[complex-analysis/elementary-functions#thm-log]]）；在任何存在对数分支的区域上它也有原函数。

::: example 用对数计算1/z的积分 {#ex-log-primitive}
设$\gamma$是单位圆周的右半部分，从$-i$到$i$；$\sigma$是左半部分，从$i$到$-i$（都沿逆时针方向）。计算$\int_\gamma\frac{dz}z$和$\int_\sigma \frac{dz}{z}$。
::: solution
$\gamma$位于割缝平面内，在那里$\Log$是$1/z$的原函数，所以由[[#thm-ftc]]，

$$
\int_\gamma\frac{dz}z = \Log i - \Log(-i) = \frac{i\pi}{2} - \Big(-\frac{i\pi}2\Big) = i\pi .
$$

$\sigma$穿过负实轴，所以不能用$\Log$。改用分支$L(z) = \ln\abs z + i\arg z$，其中$\arg z\in(0, 2\pi)$，它在包含$\sigma$的$\C\setminus[0,\infty)$上有定义且解析。对这个分支，$L(i) = \frac{i\pi}{2}$，$L(-i) = \frac{3i\pi}{2}$，所以

$$
\int_\sigma\frac{dz}{z} = L(-i) - L(i) = i\pi .
$$

$\gamma + \sigma$合起来就是整个圆周，而$i\pi + i\pi = 2\pi i$，与[[#thm-fundamental]]一致。之所以出现$2\pi i$，恰恰是因为没有**单独一个**对数分支能在整个圆周上适用。
:::
:::

同样的思想可以逐段地计算沿非圆周曲线的$\oint dz/z$。

::: example 绕正方形一周 {#ex-square}
设$Q$是以$\pm1\pm i$为顶点的正方形的边界，沿逆时针方向绕行。不对任何一条边作参数化，计算$\oint_Q\frac{dz}{z}$。
::: solution
考虑右边$\sigma_1$，即从$1 - i$到$1 + i$的线段。它位于割缝平面内，在那里$\Log$是$1/z$的原函数，所以

$$
\int_{\sigma_1}\frac{dz}{z} = \Log(1 + i) - \Log(1 - i) = \Big(\ln\sqrt2 + \frac{i\pi}{4}\Big) - \Big(\ln\sqrt2 - \frac{i\pi}{4}\Big) = \frac{i\pi}{2}.
$$

另外三条边可以由$\sigma_1$分别乘以$i$、$i^2$和$i^3$（即旋转若干个四分之一周）得到。若$\sigma_2 = i\sigma_1$，即$\sigma_2(t) = i\sigma_1(t)$，则$\sigma_2'(t) = i\sigma_1'(t)$，并且

$$
\int_{\sigma_2}\frac{dz}{z} = \int\frac{i\sigma_1'(t)}{i\sigma_1(t)}\,dt = \int_{\sigma_1}\frac{dz}{z} = \frac{i\pi}2 ,
$$

另外两条边也一样。总和为$4\cdot\frac{i\pi}{2} = 2\pi i$，与圆周的结果相同。每条边贡献的是它在原点处所张的角乘以$i$：$1/z$的积分度量的是沿曲线辐角的总变化。
:::
:::

连续函数何时有原函数？答案是：当且仅当它沿所有闭围道的积分都为零。

::: theorem 原函数的存在性 {#thm-primitive}
设$f$在区域$D$上连续。下列条件等价：

1. $f$在$D$上有原函数；
2. 对$D$中的每条闭围道$\gamma$，$\oint_\gamma f\,dz = 0$；
3. 对$D$中的围道$\gamma$，$\int_\gamma f\,dz$只依赖于$\gamma$的端点。
:::

::: proof
(1) ⇒ (2)就是[[#thm-ftc]]。(2) ⇒ (3)：若$\gamma_1$和$\gamma_2$都从$z_0$到$z_1$，则$\gamma_1 + \gamma_2^-$是闭的，所以由[[#prop-props]]，$0 = \int_{\gamma_1}f - \int_{\gamma_2}f$。

(3) ⇒ (1)：固定$z_0\in D$，对$D$中任一条从$z_0$到$z$的围道$\gamma$，定义$F(z) = \int_{\gamma}f(\zeta)\,d\zeta$；由于$D$是区域，这样的围道（折线）是存在的，并且由(3)，这个值与围道的选取无关。设$z\in D$，取$r > 0$使$D(z, r)\subseteq D$。当$0 < \abs h < r$时，线段$[z, z + h]$含于$D$；先沿一条围道到达$z$，再沿这条线段前进，即可看出$F(z + h) - F(z) = \int_{[z, z+h]}f(\zeta)\,d\zeta$。由于$\int_{[z,z+h]}d\zeta = h$，

$$
\frac{F(z + h) - F(z)}{h} - f(z) = \frac1h\int_{[z,z+h]}\big(f(\zeta) - f(z)\big)\,d\zeta .
$$

任给$\eps > 0$，由$f$在$z$处的连续性，存在$\delta > 0$，使得当$\abs{\zeta - z} < \delta$时$\abs{f(\zeta) - f(z)} < \eps$。当$0 < \abs h < \min(r, \delta)$时，线段上的每个$\zeta$都满足这一条件，于是由ML不等式（长度为$\abs h$），右端的模不超过$\frac{1}{\abs h}\eps\abs h = \eps$。因此$F'(z) = f(z)$。
:::

::: quiz
下列函数中哪些在去掉原点的平面$\C\setminus\set0$上有原函数？（可能有多个正确答案。）
- [ ] $1/z$
- [x] $1/z^2$
- [x] $e^z + z^{-5}$
- [ ] $\bar z$
::: solution
$1/z^2$有原函数$-1/z$，$e^z + z^{-5}$有原函数$e^z - \tfrac14z^{-4}$，它们都在$\C\setminus\set0$上解析。函数$1/z$在那里没有原函数，因为它沿单位圆周的积分为$2\pi i\neq0$（[[#thm-primitive]]）；而$\bar z$在任何区域上都没有原函数，因为它沿一个小圆周的积分$2\pi ir^2$不为零。
:::
:::

所以原函数的存在性等价于所有闭围道积分都为零。下一章的柯西定理指出，对圆盘上以及任何“没有洞”的区域上的解析函数，后者成立——而去掉原点的平面在$0$处有一个洞，这正是$1/z$不满足这一点的地方。

::: example 不作参数化的积分 {#ex-no-param}
计算$\displaystyle\int_\gamma ze^{z^2}\,dz$，其中$\gamma$是从$0$到$i\sqrt\pi$的任一围道——例如一条螺线，或一段抛物线弧。
::: solution
由链式法则，$\frac{d}{dz}\frac12e^{z^2} = ze^{z^2}$，所以$F(z) = \frac12 e^{z^2}$是$\C$上的原函数。由[[#thm-ftc]]，

$$
\int_\gamma ze^{z^2}\,dz = \frac12e^{(i\sqrt\pi)^2} - \frac12e^0 = \frac{e^{-\pi} - 1}{2}\approx -0.4784,
$$

这与$\gamma$的形状无关。
:::
:::

[[#ex-square]]中的正方形以及此前的圆周提示了一个在后面将处于中心地位的定义。

::: definition 环绕数 {#def-winding}
设$\gamma$是闭围道，$p$是不在$\gamma$上的点。$\gamma$关于$p$的**环绕数**（或指标）为

$$
n(\gamma, p) = \frac{1}{2\pi i}\oint_\gamma\frac{dz}{z - p} .
$$
:::

对圆周$\abs{z - a} = r$，[[#thm-fundamental]]给出圆心$p = a$处$n = 1$，而[[#thm-ftc]]之后的说明给出：对圆外的点$n = 0$（对圆外的点，$1/(z - p)$在一个包含该圆周但不含$p$的圆盘上有原函数$\log(z - p)$）。对绕行两周的圆周，$n = 2$。一般地，环绕数总是整数，并且当$p$移动而不穿过曲线时保持不变；所以圆内的每一点（不只是圆心）都有$n = 1$。

::: proposition 环绕数是整数 {#prop-winding}
对每条闭围道$\gamma\colon[\alpha,\beta]\to\C$和每个不在$\gamma$上的点$p$，$n(\gamma, p)\in\Z$。
:::

::: proof
对$t\in[\alpha,\beta]$定义$g(t) = \displaystyle\int_\alpha^t\frac{\gamma'(s)}{\gamma(s) - p}\,ds$，于是$g(\beta) = 2\pi i\,n(\gamma,p)$；再令$h(t) = (\gamma(t) - p)e^{-g(t)}$。除了$\gamma$的有限个角点之外，

$$
h'(t) = \gamma'(t)e^{-g(t)} - (\gamma(t) - p)\,\frac{\gamma'(t)}{\gamma(t) - p}\,e^{-g(t)} = 0 ,
$$

而$h$是连续的，所以$h$是常数：$h(t) = h(\alpha) = \gamma(\alpha) - p$。于是$e^{g(t)} = \dfrac{\gamma(t) - p}{\gamma(\alpha) - p}$，而由于$\gamma(\beta) = \gamma(\alpha)$，在$t = \beta$处右端等于$1$。由[[complex-analysis/elementary-functions#thm-exp]]，$g(\beta)\in2\pi i\Z$，所以$n(\gamma,p)\in\Z$。
:::

证明中的函数$g(t)$（在相差一个常数的意义下）是沿曲线的$\gamma(t) - p$的一个连续对数，所以$\operatorname{Im} g(\beta)$是$\gamma(t) - p$的辐角的总变化——环绕数计数的是完整的圈数。环绕数将在[[complex-analysis/residues]]一章的留数定理和辐角原理中再次出现，并在[[topology/fundamental-group]]一章中以闭路的度的身份出现。

::: application 环量与通量
二维向量场$\mathbf V = (P, Q)$可以打包成复函数$f = P - iQ = \overline{P + iQ}$。于是[[#eq-line-integrals]]变为

$$
\oint_\gamma f\,dz = \oint_\gamma(P\,dx + Q\,dy) + i\oint_\gamma(P\,dy - Q\,dx),
$$

即$\mathbf V$沿$\gamma$的**环量**（功）加上$i$乘以$\mathbf V$穿过$\gamma$的**通量**。对$f(z) = 1/z$，相应的向量场是$\mathbf V = \overline{1/z} = (x, y)/(x^2 + y^2)$，即位于原点的一个源：它的环量为$0$，通量为$2\pi$，与$\oint dz/z = 0 + 2\pi i$相符。这种**波利亚场**（Pólya field）的观点把复积分与格林公式（[[multivariable/greens-theorem]]）以及理想流体的流动联系了起来。
:::

::: widget vectorfield
P: x/(x^2 + y^2)
Q: y/(x^2 + y^2)
x: -2, 2
y: -2, 2
cx: 0.3 + 1.2*cos(t)
cy: 0.2 + 1.2*sin(t)
t: 0, 2pi
caption: $f(z) = 1/z$的波利亚场$(x, y)/(x^2+y^2)$，以及沿一个圆周的功和通量。功（环量）为$0$，通量为$2\pi$，所以$\oint dz/z = 0 + 2\pi i$。不包围原点的曲线的通量也为零：流进多少，就流出多少。
:::

::: history
卡尔·弗里德里希·高斯（Carl Friedrich Gauss）已经认识到，两个复数积分限之间的积分可能依赖于路径。他在1811年写信给弗里德里希·贝塞尔（Friedrich Bessel），指出：只要函数在两条路径之间的区域内不变为无穷大，函数在两点之间沿不同路径的积分就有相同的值。高斯从未发表这一结果。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1814年提交给巴黎科学院的一篇关于定积分的论文（1827年发表）中发展了复积分，最初是把它作为计算实积分的一种方法；1825年，他发表了关于“在虚数限之间所取的”积分的论文，其中包含柯西定理的第一个一般形式。
:::

## 后续内容

基本积分$\oint dz/(z - a) = 2\pi i$和原函数的存在性定理为[[complex-analysis/cauchy-theorem]]一章搭好了舞台；那一章将证明，圆盘上（以及单连通区域上）的解析函数有原函数，从而它们沿闭围道的积分为零。ML不等式是柯西积分公式中的各种估计以及借助[[complex-analysis/residues]]一章计算实积分时的主力工具，而逐项积分（[[#cor-uniform]]）是通往[[complex-analysis/laurent-series]]一章中幂级数的桥梁。数$\frac{1}{2\pi i}\oint\frac{dz}{z - a}$计数的是曲线绕$a$的圈数——这是[[topology/fundamental-group]]一章所研究的一个拓扑不变量。

::: summary
- 围道是逐段光滑的路径；$\int_\gamma f\,dz = \int_a^b f(\gamma(t))\gamma'(t)\,dt$在重新参数化下不变，在路径反向时变号。
- 基本的计算：$\oint_{\abs{z-a}=r}(z-a)^n\,dz$在$n = -1$时为$2\pi i$，对其他每个整数$n$都为$0$。
- $\left\lvert\int\phi\right\rvert \le\int\abs\phi$，由此得到ML不等式$\left\lvert\int_\gamma f\,dz\right\rvert\le M\,L(\gamma)$；要估计一个商的上界，就用反向三角不等式从下方估计分母。
- 在$\gamma$上一致收敛时，极限与级数可以逐项积分。
- 若在$D$上$F' = f$，则对$D$中的每条围道，$\int_\gamma f\,dz = F(\text{终点}) - F(\text{起点})$，并且沿闭围道的积分为零。
- 连续函数$f$在区域上有原函数，当且仅当它沿所有闭围道的积分都为零；$1/z$在$\C\setminus\set0$上没有原函数，但在割缝平面上有原函数$\Log z$。
:::

## 习题

::: exercise 与路径无关 {level=1 check="2/3"}
计算$\int_\gamma z^2\,dz$，其中$\gamma$是从$-1$到$1$的任一围道。
::: solution
$z^3/3$是$z^2$在$\C$上的原函数，所以由[[#thm-ftc]]，对每条围道，积分都等于$\frac{1^3}{3} - \frac{(-1)^3}{3} = \frac23$。
:::
:::

::: exercise 螺线的长度 {level=1 check="sqrt(2)*(e - 1)"}
求路径$\gamma(t) = e^{(1 + i)t}$，$0\le t\le1$的长度。
::: solution
$\gamma'(t) = (1 + i)e^{(1+i)t}$，所以$\abs{\gamma'(t)} = \abs{1+i}\,e^t = \sqrt2\,e^t$。因此$L = \int_0^1\sqrt2\,e^t\,dt = \sqrt2(e - 1)\approx 2.430$。
:::
:::

::: exercise 利用基本积分 {level=1 check="5"}
计算$\dfrac{1}{2\pi i}\displaystyle\oint_{\abs{z - 2} = 1}\Big(\frac{5}{z - 2} + 3(z-2)^2 + \frac{7}{(z-2)^3}\Big)\,dz$。
::: solution
由线性性和$a = 2$时的[[#thm-fundamental]]，只有含$(z-2)^{-1}$的项有贡献：积分为$5\cdot2\pi i + 0 + 0$，除以$2\pi i$得$5$。
:::
:::

::: exercise 共轭沿圆周的积分 {level=2 check="8"}
用参数化计算$\dfrac{1}{\pi i}\displaystyle\oint_{\abs z = 2}\bar z\,dz$，并利用圆周上的$\bar z = 4/z$验证答案。
::: solution
令$z = 2e^{it}$：$\bar z = 2e^{-it}$，$dz = 2ie^{it}\,dt$，所以$\oint\bar z\,dz = \int_0^{2\pi}4i\,dt = 8\pi i$。另一种方法：在圆周上$\bar z = \abs z^2/z = 4/z$，而由[[#thm-fundamental]]，$\oint 4/z\,dz = 8\pi i$。除以$\pi i$得$8$。
:::
:::

::: exercise 一个ML估计 {level=2}
证明$\displaystyle\left\lvert\oint_{\abs z = 2}\frac{e^z}{z^2 + 1}\,dz\right\rvert\le\frac{4\pi e^2}{3}$。
::: solution
在$\abs z = 2$上：$\abs{e^z} = e^{\operatorname{Re} z}\le e^2$，且$\abs{z^2 + 1}\ge\abs z^2 - 1 = 3$。所以被积函数的模至多为$M = e^2/3$，而圆周的长度为$L = 4\pi$。由[[#thm-ml]]，积分的模至多为$ML = 4\pi e^2/3$。
:::
:::

::: exercise 半个圆周 {level=2 check="pi"}
设$\gamma$是单位圆周的上半部分，从$1$到$-1$。(a) 用参数化，(b) 用对数的一个分支，计算$\int_\gamma\frac{dz}{z}$。它的虚部是多少？
::: solution
(a) $z = e^{it}$，$0\le t\le\pi$：$\int_0^\pi\frac{ie^{it}}{e^{it}}\,dt = i\pi$。(b) 取$\arg z\in(-\pi/2, 3\pi/2)$的分支，它在$\C$去掉负虚轴后的集合上解析，该集合包含$\gamma$；这个分支在$1$处取值$0$，在$-1$处取值$i\pi$，所以积分为$i\pi - 0 = i\pi$。虚部为$\pi$。（不能直接使用对数主值$\Log$，因为$-1$位于它的割线上。）
:::
:::

::: exercise 高斯型积分 {level=2 check="(exp(-pi) - 1)/2"}
沿从$0$到$i\sqrt\pi$的直线段，用参数化计算$\displaystyle\int_\gamma ze^{z^2}\,dz$，并验证[[#ex-no-param]]中求得的值。
::: solution
令$z = i\sqrt\pi\,t$，$0\le t\le1$，$dz = i\sqrt\pi\,dt$。则$z^2 = -\pi t^2$，并且

$$
\int_0^1 i\sqrt\pi\,t\,e^{-\pi t^2}\,i\sqrt\pi\,dt = -\pi\int_0^1 te^{-\pi t^2}\,dt = -\pi\Big[-\frac{e^{-\pi t^2}}{2\pi}\Big]_0^1 = \frac{e^{-\pi} - 1}{2}.
$$
:::
:::

::: exercise 路径反向 {level=2}
设$\gamma$是从$1$到$i$的线段。直接计算$\int_\gamma\operatorname{Re}(z)\,dz$和$\int_{\gamma^-}\operatorname{Re}(z)\,dz$，并验证[[#prop-props]](3)。
::: solution
$\gamma(t) = 1 + t(i - 1)$，所以$\operatorname{Re}\gamma(t) = 1 - t$，$\gamma'(t) = i - 1$：$\int_\gamma\operatorname{Re} z\,dz = (i - 1)\int_0^1(1 - t)\,dt = \frac{i-1}{2}$。反向路径为$\gamma^-(t) = i + t(1 - i)$，$\operatorname{Re}\gamma^-(t) = t$，$(\gamma^-)'(t) = 1 - i$：$\int_{\gamma^-}\operatorname{Re} z\,dz = (1 - i)\int_0^1t\,dt = \frac{1 - i}{2} = -\frac{i - 1}{2}$，与预言一致。
:::
:::

::: exercise 面积公式 {#exr-area level=3}
设$\gamma$是正向简单闭围道，它所围的区域$\Omega$适用格林公式。证明

$$
\oint_\gamma\bar z\,dz = 2i\,\operatorname{Area}(\Omega),
$$

并对圆周$\abs z = r$以及以$0, 1, 1+i, i$为顶点的单位正方形验证它。
::: hint
在[[#eq-line-integrals]]中取$u = x$，$v = -y$，再用格林公式（[[multivariable/greens-theorem]]）。
:::
::: solution
取$f = \bar z = x - iy$，$u = x$，$v = -y$，由[[#eq-line-integrals]]得

$$
\oint_\gamma\bar z\,dz = \oint_\gamma(x\,dx + y\,dy) + i\oint_\gamma(-y\,dx + x\,dy).
$$

由格林公式，$\oint(P\,dx + Q\,dy) = \iint_\Omega(Q_x - P_y)\,dA$。对第一个积分，$Q_x - P_y = 0 - 0 = 0$；对第二个积分，$P = -y$，$Q = x$，给出$Q_x - P_y = 2$。因此$\oint_\gamma\bar z\,dz = 0 + 2i\operatorname{Area}(\Omega)$。对$\abs z = r$，它等于$2\pi i r^2$，与上面测验中的直接计算相符。对单位正方形：四条边$z = t$、$1 + it$、$(1 - t) + i$、$i(1 - t)$（$0\le t\le1$）的贡献分别为$\frac12$、$\frac12 + i$、$-\frac12 + i$和$-\frac12$（各自用参数化验证），总和为$2i = 2i\cdot1$。
:::
:::

::: exercise 收缩的圆周 {level=3}
设$f$在包含$a$的某个开集上连续。证明

$$
\lim_{r\to0^+}\oint_{\abs{z - a} = r}\frac{f(z)}{z - a}\,dz = 2\pi i f(a).
$$
::: hint
减去$f(a)\oint\frac{dz}{z-a} = 2\pi if(a)$，再用ML不等式。
:::
::: solution
由[[#thm-fundamental]]，对每个$r > 0$，$2\pi if(a) = \oint_{\abs{z - a}=r}\frac{f(a)}{z-a}\,dz$。因此

$$
\left\lvert\oint_{\abs{z-a}=r}\frac{f(z)}{z-a}\,dz - 2\pi if(a)\right\rvert = \left\lvert\oint_{\abs{z-a} = r}\frac{f(z) - f(a)}{z - a}\,dz\right\rvert\le\max_{\abs{z-a} = r}\frac{\abs{f(z) - f(a)}}{r}\cdot2\pi r = 2\pi\max_{\abs{z-a}=r}\abs{f(z) - f(a)} .
$$

由$f$在$a$处的连续性，任给$\eps > 0$，存在$\delta > 0$，使得当$\abs{z - a} < \delta$时$\abs{f(z) - f(a)} < \eps$；所以当$0 < r < \delta$时，右端小于$2\pi\eps$。这就证明了该极限。（柯西定理将表明，当$f$解析时这个积分与$r$无关；把它与这里的结果结合起来，就得到柯西积分公式。）
:::
:::
