关于实轴的反射$f(z) = \bar z$，大概是人们所能想象的平面上最无害的映射了。作为$\R^2$上的映射，它是线性的，因而在[[multivariable/partial-derivatives]]一章的意义下无穷次可微。然而，作为复变量的函数，它在任何一点处都**不**可微。原因在于，复导数

$$
f'(z_0) = \lim_{h \to 0}\frac{f(z_0 + h) - f(z_0)}{h}
$$

要除以复数$h$，而$h$可以从平面上的任何方向趋于$0$。对$f(z) = \bar z$，差商为$\bar h / h$，当$h$为实数时它等于$1$，当$h$为纯虚数时它等于$-1$。复导数必须同时在所有方向上给出相同的结果，这是一个非常苛刻的限制。

本章讨论通过这一检验的函数。我们将看到，复可微性等价于一对偏微分方程，即**柯西-黎曼方程**；它迫使映射在局部上表现得像先旋转再伸缩；并且这类函数的实部和虚部都满足拉普拉斯方程。后面的章节还将揭示多得多的性质：在开集上复可微的函数自动无穷次可微，并且等于它的泰勒级数之和。正因如此，这些函数值得拥有一个专门的名称——**解析**函数。

## 复变量的函数

**复函数**是定义在集合$S \subseteq \C$上的函数$f\colon S \to \C$。记$z = x + iy$，并把函数值分成实部和虚部，

$$
f(x + iy) = u(x, y) + i\,v(x,y),
$$

可以看出，$f$就相当于一对二元实函数$u = \operatorname{Re} f$和$v = \operatorname{Im} f$。例如：

| $f(z)$ | $u(x,y)$ | $v(x,y)$ |
|---|---|---|
| $z^2$ | $x^2 - y^2$ | $2xy$ |
| $1/z$ | $\dfrac{x}{x^2+y^2}$ | $\dfrac{-y}{x^2+y^2}$ |
| $\bar z$ | $x$ | $-y$ |
| $\abs{z}^2$ | $x^2 + y^2$ | $0$ |

（对$1/z$，分子分母同乘以共轭：$\frac{1}{x+iy} = \frac{x - iy}{x^2+y^2}$。）

$f$的图像将是$\C\times\C = \R^4$的一个子集，我们无法把它画出来。本课程始终使用两种替代方法。第一种把定义域和目标平面并排画出，展示$f$如何移动一组网格线（下面就会用到）。第二种是**定义域着色**，它给定义域中的每一点$z$涂上一种编码了函数值$f(z)$的颜色：**色相**表示$f(z)$的辐角（按通常的约定，红色表示正实数值；辐角增加$2\pi$时，颜色沿色轮转一整圈），**亮度**表示模。

::: widget complexmap
f: (z - 1)/(z^2 + 1)
mode: domain
x: -2.5, 2.5
y: -2.5, 2.5
caption: $f(z) = \frac{z-1}{z^2+1}$的定义域着色图：色相表示$f(z)$的辐角，亮度表示它的模。所有颜色都汇聚于零点$z = 1$和极点$z = \pm i$。沿逆时针方向绕每个特殊点走一圈：绕零点时，颜色按一种顺序把色轮走一遍；绕每个极点时，则按相反的顺序走一遍。这种“颜色环绕”将在[[complex-analysis/residues]]一章中由辐角原理加以解释。
:::

## 极限与连续性

由于$\abs{z - w}$就是$\R^2$中的欧几里得距离，$\C$中的极限与连续性恰好就是[[real-analysis/metric-spaces]]一章中的极限与连续性，只是用模来书写。

::: definition 极限与连续性 {#def-limit}
设$f$在以$z_0$为中心的某个去心圆盘上有定义。我们说$\lim_{z \to z_0} f(z) = L$，是指对每个$\eps > 0$，都存在$\delta > 0$，使得

$$
0 < \abs{z - z_0} < \delta \implies \abs{f(z) - L} < \eps .
$$

若$f$在$z_0$处也有定义，且$\lim_{z\to z_0}f(z) = f(z_0)$，则称$f$在$z_0$处**连续**。若$f$在一个集合的每一点处都连续，则称它在该集合上连续。
:::

这个定义与[[calculus-1/limits]]一章中的定义一字不差，只是$z$在一个**圆盘**而不是区间中变化：$z$可以沿任何曲线趋于$z_0$。极限运算法则（和、积、商）的证明与实函数的情形完全相同，因为这些证明只用到三角不等式和$\abs{zw} = \abs z\abs w$。因此，多项式处处连续，有理函数在分母不为零的点处都连续。

::: proposition 按分量求极限 {#prop-componentwise}
记$f = u + iv$，$L = a + bi$。则$\lim_{z \to z_0} f(z) = L$的充要条件是：当$(x,y) \to (x_0,y_0)$时，$\lim u(x,y) = a$且$\lim v(x,y) = b$。
:::

::: proof
不等式$\abs{u - a} \le \abs{f - L}$和$\abs{v - b} \le \abs{f - L}$（由$\abs{\operatorname{Re}w}, \abs{\operatorname{Im}w} \le \abs{w}$得到）表明：若$f \to L$，则用同一个$\delta$即可得到$u \to a$和$v\to b$。反之，由三角不等式，$\abs{f - L} \le \abs{u - a} + \abs{v - b}$，所以若$\delta_1$使$\abs{u - a} < \eps/2$，$\delta_2$使$\abs{v - b} < \eps/2$，则$\delta = \min(\delta_1,\delta_2)$使$\abs{f - L} < \eps$。
:::

::: example 依赖于方向的极限 {#ex-direction}
证明$\displaystyle\lim_{z\to0}\frac{\bar z}{z}$不存在。
::: solution
沿一条射线趋于$0$：令$z = re^{i\theta}$，其中$\theta$固定，$r \to 0^+$。则$\bar z = re^{-i\theta}$，所以

$$
\frac{\bar z}{z} = e^{-2i\theta},
$$

它沿每条射线都是常数，但在不同的射线上取不同的值：沿实轴（$\theta = 0$）为$1$，沿虚轴（$\theta = \pi/2$）为$-1$。如果极限为$L$，那么取$\eps = 1$，就存在满足$r < \delta$的点$z = r$和$z = ir$，使得$\abs{1 - L} < 1$且$\abs{-1 - L} < 1$，从而$2 \le \abs{1-L} + \abs{L + 1} < 2$，矛盾。
:::
:::

## 复可微性

::: definition 复导数，解析函数 {#def-derivative}
设$f$在包含$z_0$的某个开集上有定义。若极限

$$
f'(z_0) = \lim_{h \to 0}\frac{f(z_0 + h) - f(z_0)}{h} \qquad (h \in \C)
$$ {#eq-derivative}

存在，则称$f$在$z_0$处**（复）可微**。若函数在开集$U$的每一点处都可微，则称它在$U$上**解析**（或**全纯**）；若函数在以$z_0$为中心的某个开圆盘上解析，则称它在点$z_0$处解析。在整个$\C$上解析的函数称为**整函数**。
:::

“在$z_0$处可微”与“在$z_0$处解析”的区别是重要的：我们将遇到只在一个点或只沿一条直线可微、却处处不解析的函数。本课程中所有强有力的定理都要求函数在开集上解析。

通常的求导法则仍然成立，证明与[[calculus-1/derivatives]]和[[calculus-1/chain-rule]]两章中的相同，因为那些证明只用到极限的代数运算：

$$
(f + g)' = f' + g', \qquad (fg)' = f'g + fg', \qquad \Big(\frac fg\Big)' = \frac{f'g - fg'}{g^2}, \qquad (g\circ f)'(z) = g'(f(z))\,f'(z).
$$

与实的情形一样，在$z_0$处可微的函数在该点连续：$f(z_0 + h) - f(z_0) = h\cdot\frac{f(z_0+h) - f(z_0)}{h} \to 0\cdot f'(z_0) = 0$。

::: example 幂函数与多项式 {#ex-powers}
证明对每个整数$n \ge 1$有$\dfrac{d}{dz}z^n = nz^{n-1}$，并由此推出多项式是整函数，有理函数在其分母的零点以外解析。
::: solution
由二项式定理（它在任何域中都成立），

$$
\frac{(z + h)^n - z^n}{h} = \frac{1}{h}\sum_{k=1}^{n}\binom nk z^{n-k}h^k = nz^{n-1} + \sum_{k=2}^{n}\binom nk z^{n-k}h^{k-1}.
$$

最后那个和式的每一项都含有因子$h$，所以当$h\to 0$时它趋于$0$，从而差商趋于$nz^{n-1}$。由和的求导法则与常数倍法则，每个多项式处处可微，即为整函数；由商的求导法则，$p/q$在所有满足$q \neq 0$的点处可微，而这些点构成一个开集。例如，当$z \neq 1$时，$\dfrac{d}{dz}\dfrac{z+1}{z-1} = \dfrac{(z - 1) - (z + 1)}{(z-1)^2} = \dfrac{-2}{(z-1)^2}$。
:::
:::

::: example 两个不解析的光滑映射 {#ex-not-analytic}
(a) 证明$f(z) = \bar z$处处不可微。(b) 证明$g(z) = \abs z^2$在$0$处可微，而在其他点处都不可微。
::: solution
(a) 差商为$\dfrac{\overline{z_0 + h} - \bar z_0}{h} = \dfrac{\bar h}{h}$，由[[#ex-direction]]，无论$z_0$是什么，当$h \to 0$时它都没有极限。

(b) 这里

$$
\frac{\abs{z_0 + h}^2 - \abs{z_0}^2}{h} = \frac{(z_0 + h)(\bar z_0 + \bar h) - z_0\bar z_0}{h} = \bar z_0 + \bar h + z_0\,\frac{\bar h}{h}.
$$

当$h \to 0$时，项$\bar h$趋于$0$。若$z_0 = 0$，差商就是$\bar h \to 0$，所以$g'(0) = 0$。若$z_0 \neq 0$，则项$z_0\bar h/h$没有极限（沿实方向和虚方向，它分别取值$z_0$和$-z_0$），所以差商也没有极限。因此$g$只在$0$处可微；由于没有哪个开圆盘完全由可微点组成，$g$处处不解析。
:::
:::

::: quiz
下列函数中哪一个是整函数？
- [ ] $f(z) = \bar z$
- [ ] $f(z) = \abs z^2$
- [x] $f(z) = z^3 - iz + 2$
- [ ] $f(z) = \operatorname{Re} z$
::: solution
$z$的多项式是整函数（[[#ex-powers]]）。其余三个都是由$\bar z$构造的：$\bar z$处处不可微，$\abs z^2 = z\bar z$只在$0$处可微，$\operatorname{Re} z = (z + \bar z)/2$处处不可微（它的差商是$\frac12(1 + \bar h/h)$，没有极限）。一条有用的经验法则（下面关于$\partial/\partial\bar z$的注记将使之精确化）：真正含有$\bar z$的表达式不是解析的。
:::
:::

## 柯西-黎曼方程

如果$f = u + iv$是由$u$和$v$的公式给出的，怎样判断它是否复可微呢？想法是让$h$沿两个坐标方向趋于$0$，并要求得到相同的结果。

::: theorem 柯西-黎曼方程 {#thm-cr}
设$f = u + iv$在$z_0 = x_0 + iy_0$处复可微。则$u$和$v$的偏导数在$(x_0,y_0)$处存在，并满足**柯西-黎曼方程**

$$
u_x = v_y, \qquad u_y = -v_x \qquad\text{于 } (x_0, y_0).
$$ {#eq-cr}

并且在该点处$f'(z_0) = u_x + i v_x = v_y - i u_y$。
:::

::: proof
设$f'(z_0) = A$。由于极限[[#eq-derivative]]存在，可以沿任何路线来计算它。首先令$h = t$为实数，$t \to 0$：

$$
A = \lim_{t\to0}\frac{u(x_0 + t, y_0) - u(x_0,y_0)}{t} + i\,\frac{v(x_0 + t, y_0) - v(x_0, y_0)}{t}.
$$

由[[#prop-componentwise]]，实部和虚部分别收敛，所以$u_x$和$v_x$在$(x_0,y_0)$处存在，且$A = u_x + iv_x$。其次令$h = it$为纯虚数：

$$
A = \lim_{t \to 0}\frac{u(x_0, y_0 + t) - u(x_0,y_0) + i\big(v(x_0,y_0 + t) - v(x_0,y_0)\big)}{it} = \frac{1}{i}(u_y + i v_y) = v_y - i u_y .
$$

比较$A$的这两个表达式，由实部得$u_x = v_y$，由虚部得$v_x = -u_y$。
:::

::: example 验证柯西-黎曼方程 {#ex-cr-check}
(a) 对$f(z) = z^2$验证柯西-黎曼方程。(b) 证明$f(x + iy) = x^2 + iy^2$只在直线$y = x$上可微，并且处处不解析。
::: solution
(a) $u = x^2 - y^2$，$v = 2xy$，所以$u_x = 2x = v_y$，$u_y = -2y = -v_x$。导数为$u_x + iv_x = 2x + 2iy = 2z$，与预期相符。

(b) 这里$u = x^2$，$v = y^2$，$u_x = 2x$，$u_y = 0$，$v_x = 0$，$v_y = 2y$。第二个方程$u_y = -v_x$总是成立；第一个方程$2x = 2y$只在直线$y = x$上成立。由[[#thm-cr]]，$f$在这条直线以外不可微。在这条直线上，偏导数连续且满足[[#eq-cr]]，所以由下面的充分性定理，$f$在那里**确实**可微，且$f'(x + ix) = u_x + iv_x = 2x$。直线不包含任何开圆盘，所以$f$处处不解析。
:::
:::

柯西-黎曼方程有一个引人注目的几何意义。把$f$看作$\R^2$上的映射，它的导数就是它的雅可比矩阵，而[[#eq-cr]]表明这个矩阵具有特殊的形式

$$
J_f = \begin{pmatrix} u_x & u_y \\ v_x & v_y\end{pmatrix} = \begin{pmatrix} a & -b \\ b & a\end{pmatrix}, \qquad a + bi = f'(z_0).
$$

正如我们在[[complex-analysis/complex-numbers]]一章中看到的，这恰好是乘以复数$f'(z_0)$的矩阵：旋转角度$\Arg f'(z_0)$，再伸缩为$\abs{f'(z_0)}$倍。所以复可微映射就是这样的映射：在非常小的尺度上，它只**旋转和伸缩**，而不剪切，也不反射。无穷小的正方形被映成无穷小的正方形。特里斯坦·尼达姆（Tristan Needham）把“旋转角与伸缩因子”这一对量称为$f$的**伸扭**（amplitwist）。

::: widget complexmap
f: z^2
mode: grid
x: -1.5, 1.5
y: -1.5, 1.5
caption: 正方形网格在$f(z) = z^2$下的像。竖直线和水平线变成两族抛物线，而它们仍然以直角相交——无穷小的正方形被旋转和伸缩，但从不被剪切。例外的是原点，那里$f'(0) = 0$：在原点处，两条坐标轴之间的夹角被加倍。不解析的映射（例如$z + \tfrac12\bar z$）则会把小正方形变成平行四边形。
:::

柯西-黎曼方程是可微的必要条件。再加上一个温和的附加假设，它们也是充分条件。

::: theorem 可微的充分条件 {#thm-cr-sufficient}
设$f = u + iv$在开集$U$上有定义，$u$和$v$的一阶偏导数在$U$上存在，并且在$(x_0, y_0) \in U$处连续。若柯西-黎曼方程在$(x_0, y_0)$处成立，则$f$在$z_0 = x_0 + iy_0$处复可微，且$f'(z_0) = u_x + iv_x$。

特别地，若$u$和$v$在整个$U$上具有连续的偏导数且满足[[#eq-cr]]，则$f$在$U$上解析。
:::

::: proof
偏导数在$(x_0,y_0)$处连续，蕴涵$u$作为二元实函数在该点可微（[[multivariable/partial-derivatives]]）：记$h = h_1 + ih_2$，则

$$
u(x_0 + h_1, y_0 + h_2) - u(x_0, y_0) = u_x h_1 + u_y h_2 + \eps_1(h)\abs h, \qquad \eps_1(h) \to 0 \text{ 当 } h \to 0,
$$

其中偏导数都在$(x_0,y_0)$处取值；对$v$也有类似的式子，误差项为$\eps_2(h)\abs h$。令$a = u_x$，$b = v_x$（在$(x_0,y_0)$处取值）；柯西-黎曼方程表明$u_y = -b$，$v_y = a$。因此

$$
\begin{aligned}
f(z_0 + h) - f(z_0) &= (a h_1 - b h_2) + i(b h_1 + a h_2) + (\eps_1 + i\eps_2)\abs h \\
&= (a + bi)(h_1 + i h_2) + (\eps_1 + i\eps_2)\abs h .
\end{aligned}
$$

两边除以$h$，

$$
\left\lvert\frac{f(z_0 + h) - f(z_0)}{h} - (a + bi)\right\rvert = \abs{\eps_1 + i\eps_2}\,\frac{\abs h}{\abs h} \le \abs{\eps_1} + \abs{\eps_2} \to 0,
$$

所以$f'(z_0)$存在，且等于$a + bi = u_x + iv_x$。
:::

::: example 指数函数预览 {#ex-exp-preview}
证明$f(x + iy) = e^x(\cos y + i\sin y)$是整函数，并且$f' = f$。
::: solution
这里$u = e^x\cos y$，$v = e^x\sin y$，它们的偏导数

$$
u_x = e^x\cos y, \quad u_y = -e^x\sin y, \quad v_x = e^x\sin y, \quad v_y = e^x\cos y
$$

在整个$\R^2$上连续。它们处处满足$u_x = v_y$和$u_y = -v_x$，所以由[[#thm-cr-sufficient]]，$f$是整函数，且$f' = u_x + iv_x = e^x\cos y + ie^x\sin y = f$。这个函数就是复指数函数$e^z$，将在[[complex-analysis/elementary-functions]]一章中研究。
:::
:::

::: warning 仅在一点满足方程是不够的
[[#thm-cr-sufficient]]要求偏导数连续；仅在一点满足柯西-黎曼方程并不能推出可微。令$f(x + iy) = \sqrt{\abs{xy}}$，于是$u = \sqrt{\abs{xy}}$，$v = 0$。由于$u$在两条坐标轴上都为零，$u_x(0,0) = u_y(0,0) = 0$，而显然$v_x = v_y = 0$：方程在原点成立。但沿对角线$h = t(1 + i)$，差商为$\dfrac{\abs t}{t(1+i)}$，当$t > 0$时它等于$\frac{1}{1+i}$，当$t < 0$时等于$-\frac1{1+i}$，所以$f'(0)$不存在。（在原点附近，$u_y$在$x$轴上的点处不存在，而在坐标轴以外偏导数无界，所以连续性假设不成立。）
:::

::: remark 算子∂/∂z̄
由于$x = (z + \bar z)/2$，$y = (z - \bar z)/(2i)$，定义如下的微分算子会很方便：

$$
\frac{\partial}{\partial z} = \frac12\Big(\frac{\partial}{\partial x} - i\frac{\partial}{\partial y}\Big), \qquad \frac{\partial}{\partial \bar z} = \frac12\Big(\frac{\partial}{\partial x} + i\frac{\partial}{\partial y}\Big).
$$

简单的计算表明$\dfrac{\partial f}{\partial \bar z} = \tfrac12\big((u_x - v_y) + i(v_x + u_y)\big)$，所以两个柯西-黎曼方程合起来就是一个复方程$\partial f/\partial\bar z = 0$，此时$f' = \partial f/\partial z$。通俗地说：**解析函数就是不依赖于$\bar z$的$z$的函数**。例如$\partial(z\bar z)/\partial \bar z = z$只在$0$处为零，这与[[#ex-not-analytic]]一致。
:::

## 柯西-黎曼方程的推论

在连通开集上，解析性是如此刚性，以至于很弱的信息就能迫使函数为常数。第一个工具是解析函数与曲线复合时的链式法则。

::: lemma 沿曲线的导数 {#lem-curve}
设$\gamma\colon [a,b] \to U$（作为到$\R^2$中的映射）可微，$f$在开集$U$上解析。则$f\circ\gamma$可微，且$(f\circ\gamma)'(t) = f'(\gamma(t))\,\gamma'(t)$。
:::

::: proof
固定$t$，令$w = \gamma(t)$。对$\zeta \neq w$定义$\phi(\zeta) = \dfrac{f(\zeta) - f(w)}{\zeta - w}$，并令$\phi(w) = f'(w)$；则$\phi$在$w$处连续，且对一切$\zeta \in U$有$f(\zeta) - f(w) = \phi(\zeta)(\zeta - w)$。因此

$$
\frac{f(\gamma(t + s)) - f(\gamma(t))}{s} = \phi(\gamma(t + s))\,\frac{\gamma(t+s) - \gamma(t)}{s} \longrightarrow \phi(w)\,\gamma'(t) = f'(\gamma(t))\gamma'(t)
$$

（当$s \to 0$时），这是因为$\gamma(t+s) \to w$，且$\phi$在$w$处连续。
:::

::: theorem 导数为零的函数是常数 {#thm-zero-derivative}
若$f$在区域$D$上解析，且对一切$z \in D$有$f'(z) = 0$，则$f$在$D$上是常数。
:::

::: proof
先设$p, q \in D$使得线段$[p, q]$含于$D$，对$t \in [0,1]$令$g(t) = f(p + t(q - p))$。由[[#lem-curve]]，$g'(t) = f'(p + t(q-p))(q - p) = 0$。于是实函数$\operatorname{Re} g$和$\operatorname{Im} g$在$[0,1]$上的导数为零，从而由中值定理（[[calculus-1/mean-value-theorem]]）它们是常数，故$f(p) = g(0) = g(1) = f(q)$。现在设$z, w \in D$是任意的。由于$D$是区域，$D$中存在折线$z = p_0, p_1, \dots, p_m = w$，其各段$[p_{k-1}, p_k]$都含于$D$。对每一段应用第一步，就得到$f(z) = f(p_1) = \dots = f(w)$。
:::

$D$的连通性是必不可少的，[[complex-analysis/complex-numbers]]一章中那个在一个圆盘上等于$0$、在另一个圆盘上等于$1$的函数的例子说明了这一点。

::: corollary 刚性 {#cor-rigid}
设$f = u + iv$在区域$D$上解析。若$u$、$v$、$\abs f$中有任何一个在$D$上是常数，则$f$在$D$上是常数。特别地，区域上的实值解析函数是常数。
:::

::: proof
若$u$是常数，则$u_x = u_y = 0$，于是由柯西-黎曼方程，$v_y = v_x = 0$，$f' = u_x + iv_x = 0$；再应用[[#thm-zero-derivative]]即可。$v$为常数的情形与此相同。设$\abs f^2 = u^2 + v^2 = c$是常数。若$c = 0$，则$f = 0$。否则，分别对$x$和$y$求导：

$$
u u_x + v v_x = 0, \qquad u u_y + v v_y = 0 .
$$

利用$v_x = -u_y$和$v_y = u_x$，它们变为$u u_x - v u_y = 0$和$v u_x + u u_y = 0$，这是关于$(u_x, u_y)$的线性方程组，其行列式为$u^2 + v^2 = c \neq 0$。因此在每一点处都有$u_x = u_y = 0$，所以在$D$上$f' = u_x + iv_x = u_x - iu_y = 0$，由[[#thm-zero-derivative]]，$f$是常数。
:::

这是一个反复出现的主题的第一个实例：解析函数的模不可能在开集上是常数，除非函数本身是常数。在[[complex-analysis/cauchy-theorem]]一章中，同样的刚性将给出最大模原理。

## 调和函数

对柯西-黎曼方程再求一次导数，就揭示出$u$和$v$最重要的性质。设$u$和$v$具有连续的二阶偏导数。则

$$
u_{xx} = (v_y)_x = (v_x)_y = (-u_y)_y = -u_{yy},
$$

其中中间一步用到了混合偏导数相等。所以$u_{xx} + u_{yy} = 0$，对$v$也类似。

::: definition 调和函数 {#def-harmonic}
开集$U \subseteq \R^2$上的实函数$u$称为**调和**的，是指它具有连续的二阶偏导数，并满足**拉普拉斯方程**

$$
\Delta u = u_{xx} + u_{yy} = 0 .
$$

若$u$和$v$在$U$上调和，且$u + iv$在$U$上解析，则称$v$是$u$的**共轭调和函数**。
:::

::: theorem 实部与虚部是调和函数 {#thm-harmonic}
若$f = u + iv$在开集$U$上解析，且$u, v$具有连续的二阶偏导数，则$u$和$v$在$U$上调和，并且$v$是$u$的共轭调和函数。
:::

::: proof
上面的计算表明$\Delta u = 0$；类似地，$v_{xx} = (-u_y)_x = -(u_x)_y = -(v_y)_y = -v_{yy}$，所以$\Delta v = 0$。
:::

关于二阶导数的假设其实是多余的：在[[complex-analysis/cauchy-theorem]]一章中我们将证明，解析函数的导数仍然解析，所以$u$和$v$自动无穷次可微。

反过来，圆盘上的每个调和函数都是某个解析函数的实部，而共轭调和函数可以通过对柯西-黎曼方程积分求得。

::: theorem 圆盘上共轭调和函数的存在性 {#thm-conjugate}
设$u$在以$(x_0, y_0)$为中心的开圆盘$D$上调和。则

$$
v(x, y) = \int_{y_0}^{y} u_x(x, t)\,dt - \int_{x_0}^{x} u_y(s, y_0)\,ds
$$ {#eq-conjugate}

是$u$在$D$上的一个共轭调和函数，并且任意两个共轭调和函数只相差一个常数。
:::

::: proof
对$(x,y) \in D$，点$(x, y_0)$属于$D$，从$(x_0,y_0)$到$(x, y_0)$以及从$(x, y_0)$到$(x,y)$的线段也都含于$D$，因为圆盘包含其中任意两点之间的线段；所以[[#eq-conjugate]]有意义。由微积分基本定理，$v_y(x,y) = u_x(x,y)$。在积分号下求导（由于$u_{xx}$连续，这是允许的），

$$
v_x(x,y) = \int_{y_0}^{y} u_{xx}(x,t)\,dt - u_y(x, y_0) = -\int_{y_0}^{y}u_{yy}(x,t)\,dt - u_y(x,y_0) = -u_y(x,y),
$$

这里用到了$u_{xx} = -u_{yy}$，并再次用到微积分基本定理。所以$u, v$具有满足柯西-黎曼方程的连续偏导数，由[[#thm-cr-sufficient]]，$u + iv$解析；再由[[#thm-harmonic]]，$v$是调和的（它的二阶偏导数$v_{xx} = -u_{yx}$等都是连续的）。若$v_1$和$v_2$是两个共轭调和函数，则$i(v_1 - v_2) = (u + iv_1) - (u + iv_2)$解析且实部为常数，因而由[[#cor-rigid]]，它是常数。
:::

在实际计算中，人们并不直接使用[[#eq-conjugate]]，而是像下面这样手工对方程积分。

::: example 求共轭调和函数 {#ex-conjugate}
证明$u(x,y) = x^3 - 3xy^2 + 2y$在$\R^2$上调和，求出一个共轭调和函数$v$，并把$f = u + iv$用$z$表示出来。
::: solution
$u_{xx} = 6x$，$u_{yy} = -6x$，所以$\Delta u = 0$。我们需要$v_y = u_x = 3x^2 - 3y^2$。对$y$积分，得

$$
v = 3x^2y - y^3 + g(x)
$$

其中$g$是只依赖于$x$的某个函数。第二个方程要求$v_x = -u_y = -(-6xy + 2) = 6xy - 2$。而由上式，$v_x = 6xy + g'(x)$，所以$g'(x) = -2$，$g(x) = -2x + C$。因此

$$
v(x,y) = 3x^2y - y^3 - 2x + C .
$$

为了认出$f$，注意$x^3 - 3xy^2 + i(3x^2y - y^3) = (x + iy)^3$，而$2y - 2ix = -2i(x + iy)$。所以$f(z) = z^3 - 2iz + iC$，并且确实有$\operatorname{Re}(z^3 - 2iz) = u$。猜出$f$的一个快捷方法是：令$y = 0$，得$f(x) = u(x,0) + iv(x,0) = x^3 - 2ix + iC$，再把$x$换成$z$（这一技巧的合理性由[[complex-analysis/laurent-series]]一章中的唯一性定理保证）。
:::
:::

::: quiz
常数$a$取何值时$u = x^3 + a\,xy^2$是调和函数？此时以$u$为实部的一个解析函数是什么？
- [ ] $a = 3$，$f = z^3$
- [x] $a = -3$，$f = z^3$
- [ ] $a = -3$，$f = iz^3$
- [ ] $u$永远不是调和函数
::: solution
$\Delta u = 6x + 2ax$，它恒为零当且仅当$a = -3$。此时$u = x^3 - 3xy^2 = \operatorname{Re}(z^3)$，因为$(x + iy)^3 = x^3 - 3xy^2 + i(3x^2y - y^3)$。（而$f = iz^3$的实部是$-(3x^2y - y^3)$。）
:::
:::

在有洞的区域上，共轭调和函数未必存在。函数$u = \ln\abs z = \frac12\ln(x^2 + y^2)$在$\C\setminus\set0$上调和，在任何不含$0$的圆盘上，它的共轭调和函数就是$\arg z$的各种连续选取。但在整个去掉原点的平面上不存在$\arg z$的连续选取——绕原点一圈，辐角就增加$2\pi$。这一现象是支割线的根源，将在[[complex-analysis/elementary-functions]]一章中研究。

$u$和$v$的等值线之间有一种几何关系。在$f' \neq 0$的点处，梯度$\nabla u = (u_x, u_y)$和$\nabla v = (v_x, v_y) = (-u_y, u_x)$都不为零，并且

$$
\nabla u\cdot\nabla v = -u_xu_y + u_yu_x = 0 ,
$$

所以曲线$u = \text{常数}$与$v = \text{常数}$以直角相交。对$f(z) = z^2$，它们就是两族双曲线$x^2 - y^2 = c$和$2xy = c'$。

::: widget contour
f: x^2 - y^2
x: -2, 2
y: -2, 2
levels: 14
gradient: true
point: 1, 0.5
caption: 调和函数$u = x^2 - y^2 = \operatorname{Re}(z^2)$的等值线。拖动该点：梯度$\nabla u$垂直于过该点的等值线，并且与共轭调和函数$v = 2xy$的等值线（双曲线$xy = \text{常数}$，图中未画出）相切。在流体流动中，$u$是速度势，而曲线$v = \text{常数}$是绕过拐角的流动的流线。
:::

::: application 理想流动与静电学
在不可压缩流体的定常、二维、无旋流动中，速度场是一个调和的**速度势**$\phi$的梯度，而流体沿着一个共轭调和函数$\psi$（即**流函数**）的等值线运动。解析函数$F = \phi + i\psi$称为该流动的**复势**，速度为$\overline{F'(z)}$。例如，$F(z) = Uz$是速度为$U$的均匀流，$F(z) = z^2$是流入直角拐角的流动。二维静电学与此完全相同，其中$\phi$是电势，$\psi$的等值线是电力线。由于调和函数之和仍是调和函数，把复势相加就可以叠加流动；在[[complex-analysis/conformal-maps]]一章中我们将用这种方法求出绕圆柱的流动，而在[[pde/laplace-equation]]一章中将专门研究拉普拉斯方程。
:::

::: history
方程$u_x = v_y$，$u_y = -v_x$最早出现在让·勒朗·达朗贝尔（Jean le Rond d'Alembert）关于流体阻力的研究（1752年）中，其中$u$和$v$是流动的速度分量。莱昂哈德·欧拉（Leonhard Euler）在1777年把它们与复变量函数联系起来。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）从1814年起把它们作为他的复积分理论的基础，而伯恩哈德·黎曼（Bernhard Riemann）1851年的博士论文直接把它们作为解析函数的定义，并强调了它们与拉普拉斯方程以及映射的几何之间的联系。这组方程正是因为后两人的这些贡献而以他们的名字命名。
:::

## 后续内容

解析函数是本课程余下部分的主角。[[complex-analysis/elementary-functions]]一章中的指数函数、对数函数和幂函数是最早出现的非多项式的例子。在[[complex-analysis/contour-integrals]]和[[complex-analysis/cauchy-theorem]]两章中我们对它们进行积分，柯西-黎曼方程将通过格林公式（[[multivariable/greens-theorem]]）再次出现，成为它们沿闭曲线的积分为零的原因。复可微性的几何意义——局部的旋转与伸缩——是[[complex-analysis/conformal-maps]]一章的主题，而调和函数就是[[pde/laplace-equation]]一章中拉普拉斯方程的解。

::: summary
- 若当**复数**$h \to 0$（可从任意方向）时$\frac{f(z_0+h) - f(z_0)}{h}$有极限，则称$f$在$z_0$处复可微；若$f$在开集的每一点处都可微，则称$f$在该开集上解析；在$\C$上解析的函数称为整函数。
- 多项式是整函数，有理函数在分母的零点以外解析；$\bar z$、$\operatorname{Re} z$和$\abs z^2$处处不解析。
- 可微蕴涵柯西-黎曼方程$u_x = v_y$，$u_y = -v_x$，且$f' = u_x + iv_x$（[[#thm-cr]]）；反之，满足这组方程的连续偏导数保证可微（[[#thm-cr-sufficient]]）。
- 从几何上看，$f'(z_0)$的作用是旋转角度$\Arg f'(z_0)$并伸缩为$\abs{f'(z_0)}$倍：解析映射在$f' \neq 0$的点处保持角度。
- 在区域上，$f' = 0$迫使$f$为常数；$\operatorname{Re} f$、$\operatorname{Im} f$或$\abs f$为常数也是如此。
- 解析函数的实部和虚部都是调和函数；在圆盘上，每个调和函数都有共轭调和函数，可以通过对柯西-黎曼方程积分求得。
:::

## 习题

::: exercise 求导数 {level=1 check="-1"}
设$f(z) = z^3 + 2z$。求$f'(i)$。
::: solution
由[[#ex-powers]]，$f'(z) = 3z^2 + 2$，所以$f'(i) = 3i^2 + 2 = -3 + 2 = -1$。
:::
:::

::: exercise 商的导数 {level=1 check="-2"}
$f(z) = \dfrac{z+1}{z-1}$在何处解析？计算$f'(0)$。
::: solution
$f$是有理函数，其分母只在$z = 1$处为零，所以它在$\C\setminus\set1$上解析。由商的求导法则，$f'(z) = \dfrac{(z-1) - (z+1)}{(z-1)^2} = \dfrac{-2}{(z-1)^2}$，所以$f'(0) = -2$。
:::
:::

::: exercise 第一个共轭调和函数 {level=1}
证明$u(x,y) = x^2 - y^2 + x$在$\R^2$上调和，并求一个满足$\operatorname{Re} f = u$的整函数$f$。
::: solution
$u_{xx} + u_{yy} = 2 - 2 = 0$。我们需要$v_y = u_x = 2x + 1$，所以$v = 2xy + y + g(x)$；于是$v_x = 2y + g'(x)$必须等于$-u_y = 2y$，所以$g$是常数。取$g = 0$，得$v = 2xy + y$，$f = u + iv = (x^2 - y^2 + 2ixy) + (x + iy) = z^2 + z$。
:::
:::

::: exercise 确定系数 {level=2 check="-3"}
求实常数$a$的值，使$u(x, y) = ax^2y + y^3$是调和函数，并对这个$a$值求一个以$u$为实部的整函数。
::: solution
$\Delta u = 2ay + 6y$，它恒为零当且仅当$a = -3$。此时$u = y^3 - 3x^2y = -\operatorname{Im}(z^3)$。由于$\operatorname{Re}(iw) = -\operatorname{Im} w$，函数$f(z) = iz^3$的实部为$-\operatorname{Im}(z^3) = u$。（用柯西-黎曼方程验证：$v = \operatorname{Im}(iz^3) = \operatorname{Re}(z^3) = x^3 - 3xy^2$，而$u_x = -6xy = v_y$，$u_y = 3y^2 - 3x^2 = -v_x$。）
:::
:::

::: exercise 仅在一点可微 {level=2}
设$f(x + iy) = x^3 + i(1 - y)^3$。证明$f$恰在一个点处复可微，求出$f'$在该点的值，并解释为什么$f$处处不解析。
::: solution
$u = x^3$，$v = (1-y)^3$；$u_x = 3x^2$，$u_y = 0$，$v_x = 0$，$v_y = -3(1-y)^2$。方程$u_y = -v_x$总是成立，而$u_x = v_y$即$3x^2 = -3(1-y)^2$，这迫使$x = 0$且$y = 1$。所以由[[#thm-cr]]，$f$在任何$z \neq i$处都不可微；又由于所有偏导数都连续，由[[#thm-cr-sufficient]]可知$f$在$z = i$处可微，且$f'(i) = u_x + iv_x = 0$。单独一个点不包含任何圆盘，所以$f$处处不解析。
:::
:::

::: exercise 极坐标形式的柯西-黎曼方程 {level=2}
设$f = u + iv$在$z_0 \neq 0$附近解析，把$u, v$写成极坐标$(r, \theta)$的函数。证明

$$
u_r = \frac1r v_\theta, \qquad v_r = -\frac1r u_\theta,
$$

并对$f(z) = z^n$验证这两个方程。
::: hint
对$x = r\cos\theta$，$y = r\sin\theta$应用链式法则。
:::
::: solution
由链式法则，$u_r = u_x\cos\theta + u_y\sin\theta$，$u_\theta = -u_x r\sin\theta + u_y r\cos\theta$，对$v$也类似。利用$v_x = -u_y$和$v_y = u_x$：

$$
\frac1r v_\theta = -v_x\sin\theta + v_y\cos\theta = u_y\sin\theta + u_x\cos\theta = u_r ,
$$

$$
-\frac1r u_\theta = u_x\sin\theta - u_y\cos\theta = v_y \sin\theta + v_x\cos\theta = v_r .
$$

对$z^n = r^ne^{in\theta}$：$u = r^n\cos n\theta$，$v = r^n\sin n\theta$，所以$u_r = nr^{n-1}\cos n\theta = \frac1r\,(nr^n\cos n\theta) = \frac1r v_\theta$，$v_r = nr^{n-1}\sin n\theta = -\frac1r(-nr^n\sin n\theta) = -\frac1r u_\theta$。
:::
:::

::: exercise 另一个刚性命题 {level=2}
设$f = u + iv$在区域$D$上解析，并且在$D$上$v = u^2$。证明$f$是常数。
::: solution
对$v = u^2$求导，得$v_x = 2uu_x$，$v_y = 2uu_y$。由柯西-黎曼方程，$u_x = v_y = 2uu_y$，$u_y = -v_x = -2uu_x$。把后者代入前者，得$u_x = 2u(-2uu_x) = -4u^2u_x$，所以$u_x(1 + 4u^2) = 0$。由于$1 + 4u^2 > 0$，故$u_x = 0$，进而$u_y = -2uu_x = 0$。所以在$D$上$f' = u_x - iu_y = 0$，由[[#thm-zero-derivative]]，$f$是常数。
:::
:::

::: exercise f与它的共轭 {level=3}
设$f$和$\bar f$都在区域$D$上解析。证明$f$是常数。
::: solution
这时$\operatorname{Re} f = \frac12(f + \bar f)$在$D$上解析（作为解析函数之和），并且是实值的。由[[#cor-rigid]]，它是常数。所以$f$是实部为常数的解析函数，再次应用[[#cor-rigid]]，$f$是常数。（也可以直接用方程：由$f = u + iv$得$u_x = v_y$，$u_y = -v_x$，而由$\bar f = u - iv$得$u_x = -v_y$，$u_y = v_x$；合起来可知四个偏导数全为零。）
:::
:::

::: exercise 满足柯西-黎曼方程却不可微 {level=3}
对$z \neq 0$定义$f(z) = z^5/\abs z^4$，并令$f(0) = 0$。证明$u = \operatorname{Re} f$和$v = \operatorname{Im} f$在原点满足柯西-黎曼方程，但$f$在原点不复可微。为什么这与[[#thm-cr-sufficient]]不矛盾？
::: solution
在实轴上，$f(x) = x^5/x^4 = x$，所以$u(x, 0) = x$，$v(x,0) = 0$，从而$u_x(0,0) = 1$，$v_x(0,0) = 0$。在虚轴上，$f(iy) = (iy)^5/y^4 = iy$，所以$u(0,y) = 0$，$v(0,y) = y$，从而$u_y(0,0) = 0$，$v_y(0,0) = 1$。因此在原点处$u_x = v_y = 1$，$u_y = -v_x = 0$。然而，差商为

$$
\frac{f(h) - f(0)}{h} = \frac{h^4}{\abs h^4} = e^{4i\theta} \qquad (h = \abs h e^{i\theta}),
$$

它沿实轴等于$1$，沿对角线$\theta = \pi/4$等于$e^{i\pi} = -1$；所以它没有极限。这并不矛盾，因为$u$和$v$的偏导数在原点不连续（它们是$0$次齐次函数，且不是常数），所以[[#thm-cr-sufficient]]的假设不成立。
:::
:::

::: exercise 模平方的拉普拉斯算子 {level=3}
设$f = u + iv$在一个开集上解析，且$u, v$具有连续的二阶偏导数。证明

$$
\Delta\big(\abs{f}^2\big) = 4\abs{f'}^2 .
$$

由此推出$\abs f^2$只在$f'$为零的地方是调和的。
::: solution
对任何$C^2$函数$w$，$\Delta(w^2) = \partial_x(2ww_x) + \partial_y(2ww_y) = 2(w_x^2 + w_y^2) + 2w\Delta w$。把它用于调和函数$u$和$v$，

$$
\Delta(u^2 + v^2) = 2(u_x^2 + u_y^2) + 2(v_x^2 + v_y^2).
$$

由柯西-黎曼方程，$u_y^2 = v_x^2$，$v_y^2 = u_x^2$，所以右端为$4(u_x^2 + v_x^2) = 4\abs{u_x + iv_x}^2 = 4\abs{f'}^2$。因此$\Delta\abs f^2 \ge 0$，且等号恰在$f' = 0$处成立；$\abs f^2$在一个开集上调和，仅当$f'$在该开集上恒为零，也就是说（在区域上）仅当$f$是常数。
:::
:::
