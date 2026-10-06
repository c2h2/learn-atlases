向一块圆形靶盘投掷一支飞镖，它落在靶盘上一个均匀随机的点处。落点的横坐标和纵坐标是两个随机变量。它们相互独立吗？平均而言，落在很靠右的位置的飞镖是倾向于偏高还是偏低？人们很自然地会回答“独立”和“都不是”，但只有第二个回答是对的。得知飞镖落在靠近右边缘的地方，你就知道它不可能远高于或远低于圆心，所以两个坐标并不独立，尽管其中一个并没有随另一个增大而增大的趋势。

大多数有意思的问题都同时涉及多个随机量：一个人的身高和体重，两只股票的收益，一台机器中各个部件的寿命，两颗骰子的点数之和。要回答这些问题，我们需要这些随机变量的**联合分布**：它不仅分别描述每个变量，还描述它们之间的关系。本章介绍联合概率质量函数与联合密度、由它们导出的边缘分布和条件分布、随机变量的独立性、作为线性关联度量的**协方差**和**相关系数**、独立随机变量之和的分布，以及二维正态分布。

## 离散型随机变量的联合分布 {#discrete-joint}

::: definition 联合概率质量函数 {#def-joint-pmf}
定义在同一概率空间上的离散型随机变量$X$与$Y$的**联合概率质量函数**为

$$
p_{X,Y}(x,y) = \Prob(X = x,\ Y = y),
$$

其中逗号表示“且”：$\Prob(X = x, Y = y) = \Prob(\{X = x\}\cap\{Y = y\})$。
:::

与单个随机变量的情形一样，联合概率质量函数非负，对所有数对求和等于$1$，并且决定了与这对随机变量有关的每个事件的概率：$\Prob\bigl((X,Y)\in A\bigr) = \sum_{(x,y)\in A}p_{X,Y}(x,y)$。

$X$和$Y$各自的分布称为**边缘分布**，因为把联合概率质量函数写成表格时，它们作为行和与列和出现在表格的边缘上。诸事件$\{Y = y\}$构成一个划分（至多相差一个概率为零的事件），所以由全概率公式，

$$
p_X(x) = \sum_y p_{X,Y}(x,y),\qquad p_Y(y) = \sum_x p_{X,Y}(x,y).
$$ {#eq-marginal-pmf}

条件化的做法与事件的情形相同：给定$Y = y$（其中$p_Y(y) > 0$）时，$X$的**条件概率质量函数**为

$$
p_{X\mid Y}(x\mid y) = \Prob(X = x\mid Y = y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}.
$$

::: example 不放回抽取 {#ex-urn}
一个罐子里有$3$个红球和$2$个蓝球，不放回地从中取出两个球。若第一个球是红球，令$X = 1$，否则令$X = 0$；对第二个球用同样的方式定义$Y$。求联合概率质量函数、两个边缘概率质量函数，以及给定$X = 1$时$Y$的条件概率质量函数。
::: solution
由乘法公式，$\Prob(X = 1, Y = 1) = \tfrac35\cdot\tfrac24 = \tfrac{3}{10}$，$\Prob(X=1,Y=0) = \tfrac35\cdot\tfrac24 = \tfrac{3}{10}$，$\Prob(X=0,Y=1) = \tfrac25\cdot\tfrac34 = \tfrac{3}{10}$，$\Prob(X=0,Y=0) = \tfrac25\cdot\tfrac14 = \tfrac{1}{10}$。加上边缘后得到：

| | $Y = 0$ | $Y = 1$ | $p_X$ |
|---|---|---|---|
| $X = 0$ | $1/10$ | $3/10$ | $2/5$ |
| $X = 1$ | $3/10$ | $3/10$ | $3/5$ |
| $p_Y$ | $2/5$ | $3/5$ | $1$ |

所以$X$和$Y$有相同的边缘分布$\operatorname{Bernoulli}(\tfrac35)$：在你看第一个球之前，第二个球是红球的可能性与第一个球一样大。但它们并不独立：$\Prob(Y = 1\mid X = 1) = \dfrac{3/10}{3/5} = \dfrac12$，而$\Prob(Y=1\mid X = 0) = \dfrac{3/10}{2/5} = \dfrac34$。第一个球是红球，会使第二个球是红球的可能性变小。
:::
:::

## 联合连续型随机变量 {#continuous-joint}

::: definition 联合密度 {#def-joint-density}
称随机变量$X$和$Y$是**联合连续**的，并以$f_{X,Y}\colon\R^2\to[0,\infty)$为**联合密度**，如果

$$
\Prob\bigl((X,Y)\in A\bigr) = \iint_A f_{X,Y}(x,y)\,dx\,dy
$$

对每个合理的区域$A\subseteq\R^2$（矩形、圆盘、半平面，一般地说，所有博雷尔集）都成立。
:::

联合密度是每单位**面积**上的概率：对一个小矩形，$\Prob(x<X\le x+h,\ y<Y\le y+k)\approx f_{X,Y}(x,y)\,hk$。它的图像是平面上方的一张曲面，与平面围成的体积为$1$；概率就是这张曲面下方的体积，用二重积分（[[multivariable/multiple-integrals]]）来计算。

::: proposition 边缘密度 {#prop-marginal-density}
若$(X,Y)$有联合密度$f_{X,Y}$，则$X$和$Y$都是连续型随机变量，其密度分别为

$$
f_X(x) = \int_{-\infty}^\infty f_{X,Y}(x,y)\,dy, \qquad f_Y(y) = \int_{-\infty}^\infty f_{X,Y}(x,y)\,dx .
$$
:::

::: proof
对任意$a$，事件$\{X\le a\}$就是$\{(X,Y)\in A\}$，其中$A$为半平面$\{(x,y): x\le a\}$。把$A$上的二重积分写成累次积分（由托内利（Tonelli）定理，对非负被积函数这样做是合理的），得

$$
F_X(a) = \iint_A f_{X,Y}(x,y)\,dx\,dy = \int_{-\infty}^a\Bigl(\int_{-\infty}^\infty f_{X,Y}(x,y)\,dy\Bigr)dx,
$$

所以内层积分是$X$在[[probability/continuous-random-variables#def-density]]意义下的一个密度。对$Y$的论证完全相同。
:::

类比离散情形，给定$X = x$时$Y$的**条件密度**为

$$
f_{Y\mid X}(y\mid x) = \frac{f_{X,Y}(x,y)}{f_X(x)}\qquad\text{当 } f_X(x) > 0.
$$ {#eq-conditional-density}

由于$\Prob(X = x) = 0$，这不能直接由条件概率的定义来论证；不过，在较弱的连续性条件下，当$h\to0$时$\Prob(Y\le y\mid x\le X\le x+h)$趋于$\int_{-\infty}^{y} f_{Y\mid X}(t\mid x)\,dt$，并且对每个固定的$x$，$f_{Y\mid X}(\cdot\mid x)$是关于$y$的一个密度。

::: example 正方形上的一个非均匀密度 {#ex-xy-density}
设当$0\le x,y\le1$时$f(x,y) = x + y$，在其他地方为$0$。验证$f$是一个联合密度，求$X$的边缘密度，并计算$\Prob(X + Y\le1)$。
::: solution
$f$在单位正方形上的积分为$\int_0^1\int_0^1(x+y)\,dy\,dx = \int_0^1\bigl(x + \tfrac12\bigr)dx = 1$，且$f\ge0$，所以它是一个联合密度。其中的内层积分就是边缘密度：当$0\le x\le1$时$f_X(x) = x + \tfrac12$；由对称性，$f_Y(y) = y + \tfrac12$。对于事件$X + Y\le1$，我们在直线$y = 1 - x$下方的三角形上积分：

$$
\Prob(X+Y\le1) = \int_0^1\int_0^{1-x}(x+y)\,dy\,dx = \int_0^1\Bigl(x(1-x) + \frac{(1-x)^2}{2}\Bigr)dx = \int_0^1\Bigl(\frac12 - \frac{x^2}{2}\Bigr)dx = \frac13 .
$$

这个三角形的面积是正方形的一半，概率却只有三分之一，因为密度在原点附近较小。
:::
:::

::: example 圆盘内的均匀随机点 {#ex-disc}
设$(X,Y)$在单位圆盘$D = \{x^2+y^2\le1\}$上服从均匀分布，即在$D$上$f_{X,Y} = 1/\pi$，在$D$外为$0$。求$X$的边缘密度，以及给定$X = x$时$Y$的条件分布。
::: solution
当$-1\le x\le1$时，过$x$的竖直线与$D$相交于线段$\lvert y\rvert\le\sqrt{1-x^2}$，所以

$$
f_X(x) = \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}}\frac1\pi\,dy = \frac2\pi\sqrt{1-x^2}.
$$

这个半圆形的密度**不是**均匀的：$X$取$0$附近的值的可能性更大，因为圆盘在那里更高。当$\lvert x\rvert<1$时，

$$
f_{Y\mid X}(y\mid x) = \frac{1/\pi}{\tfrac2\pi\sqrt{1-x^2}} = \frac{1}{2\sqrt{1-x^2}}\qquad\text{当 }\lvert y\rvert\le\sqrt{1-x^2},
$$

所以给定$X = x$时，$Y$在$[-\sqrt{1-x^2},\sqrt{1-x^2}]$上服从均匀分布。条件分布依赖于$x$：在边缘附近，$Y$被限制在一个很短的区间里。这正是引言中所描述的那种依赖关系。
:::
:::

## 独立的随机变量 {#independence}

::: definition 独立的随机变量 {#def-independent-rv}
称随机变量$X$和$Y$**独立**，如果

$$
\Prob(X\in A,\ Y\in B) = \Prob(X\in A)\,\Prob(Y\in B)
$$

对所有（博雷尔）集$A, B\subseteq\R$都成立；也就是说，由$X$决定的每个事件都与由$Y$决定的每个事件独立。更一般地，如果对所有$A_1,\ldots,A_n$都有$\Prob(X_1\in A_1,\ldots,X_n\in A_n) = \prod_i\Prob(X_i\in A_i)$，则称$X_1,\ldots,X_n$相互独立；如果一个无穷序列的每个有限子族都相互独立，则称这个无穷序列相互独立。
:::

实际中不可能逐一检验所有的集合$A$、$B$；下面的定理把独立性归结为联合概率质量函数或联合密度能否分解为乘积。

::: theorem 独立性的判别准则 {#thm-independence-criteria}
1. 离散型随机变量$X$与$Y$独立，当且仅当对所有$x$、$y$都有$p_{X,Y}(x,y) = p_X(x)\,p_Y(y)$。
2. 联合连续的$X$与$Y$独立，当且仅当$f_X(x)f_Y(y)$是$(X,Y)$的一个联合密度，即$f_{X,Y}(x,y) = f_X(x)f_Y(y)$（可能要除去一个面积为零的集合）。
:::

::: proof
(1) 若$X$与$Y$独立，取$A = \{x\}$，$B = \{y\}$即可。反之，若概率质量函数可以分解为乘积，则对任意$A$、$B$，对所有可能的取值求和，得

$$
\Prob(X\in A, Y\in B) = \sum_{x\in A}\sum_{y\in B}p_X(x)p_Y(y) = \Bigl(\sum_{x\in A}p_X(x)\Bigr)\Bigl(\sum_{y\in B}p_Y(y)\Bigr) = \Prob(X\in A)\Prob(Y\in B).
$$

(2) 若$f_X(x)f_Y(y)$是联合密度，则在矩形$A\times B$上用二重积分做同样的计算，得到$\Prob(X\in A,Y\in B) = \int_A f_X\int_B f_Y = \Prob(X\in A)\Prob(Y\in B)$。反之，若$X$与$Y$独立，则对所有$a$、$b$，

$$
\Prob(X\le a, Y\le b) = F_X(a)F_Y(b) = \int_{-\infty}^a\int_{-\infty}^bf_X(x)f_Y(y)\,dy\,dx,
$$

所以$(X,Y)$的概率测度与由密度$f_Xf_Y$定义的概率测度在所有象限$(-\infty,a]\times(-\infty,b]$上一致。测度论中的一个唯一性定理（[[measure-theory/sigma-algebras]]）指出，$\R^2$上两个在所有象限上都一致的概率测度在所有博雷尔集上都一致，所以$f_Xf_Y$是一个联合密度。同一分布的两个密度至多在一个面积为零的集合上不同。
:::

一个有用的推论：若联合密度在一个**矩形**$I\times J$（可以是无界的）上具有$f(x,y) = g(x)h(y)$的形式，而在矩形外为零，则$X$与$Y$独立，且它们的密度分别在$I$上与$g$成正比、在$J$上与$h$成正比。没有矩形这个条件，结论就不成立：[[#ex-disc]]中圆盘上的均匀密度在圆盘内是常数，但圆盘不是矩形，两个坐标并不独立。

独立性可以传递给函数：若$X$与$Y$独立，则对任意函数$g$、$h$，$g(X)$与$h(Y)$也独立，因为$\{g(X)\in A\} = \{X\in g^{-1}(A)\}$是由$X$决定的事件。把相互独立的随机变量分成互不相交的若干组，各组的函数同样相互独立，例如$X_1 + X_2$与$X_3X_4$。

::: example 相互竞争的指数时钟 {#ex-competing}
两个部件分别在时刻$X\sim\operatorname{Exp}(\lambda)$和$Y\sim\operatorname{Exp}(\mu)$独立地失效。求首次失效时刻$T = \min(X,Y)$的分布，以及第一个部件先失效的概率。
::: solution
最小值超过$t$当且仅当两个寿命都超过$t$，所以由独立性，对$t\ge0$，

$$
\Prob(T>t) = \Prob(X>t)\Prob(Y>t) = e^{-\lambda t}e^{-\mu t} = e^{-(\lambda+\mu)t}.
$$

因此$T\sim\operatorname{Exp}(\lambda+\mu)$：独立部件的失效率相加。对于第二个问题，在区域$\{x<y\}$上对联合密度$\lambda e^{-\lambda x}\mu e^{-\mu y}$积分：

$$
\Prob(X<Y) = \int_0^\infty\lambda e^{-\lambda x}\Bigl(\int_x^\infty\mu e^{-\mu y}\,dy\Bigr)dx = \int_0^\infty\lambda e^{-(\lambda+\mu)x}\,dx = \frac{\lambda}{\lambda+\mu}.
$$

例如，若平均寿命分别为$1000$小时和$2000$小时（$\lambda = 0.001$，$\mu = 0.0005$），则首次失效平均在$1/0.0015\approx667$小时后发生，而先失效的是第一个部件的概率为$\tfrac23$。
:::
:::

::: quiz
$X$和$Y$的联合密度为：当$0<x<y<1$时$f(x,y) = 8xy$，其他情形为$0$。这个公式是$x$的函数与$y$的函数的乘积。$X$与$Y$独立吗？
- [ ] 是，因为$f$可以分解为$8x\cdot y$。
- [x] 否，因为使$f>0$的区域是三角形，而不是矩形。
- [ ] 是，因为$f$的积分等于$1$。
- [ ] 这取决于$y$的值。
::: solution
密度为$8xy\cdot\mathbf{1}_{\{x<y\}}$，而其中的示性函数不能分解为乘积。具体地说，由于总有$X<Y$，所以$\Prob(X>\tfrac12, Y<\tfrac12) = 0$；但$\Prob(X>\tfrac12)$和$\Prob(Y<\tfrac12)$都是正的，所以它们的乘积不为$0$。只有当区域是矩形时，能分解为乘积才能证明独立性。
:::
:::

## 协方差与相关系数 {#covariance}

要度量两个随机变量如何共同变化，我们需要两者的函数的数学期望。单个变量的相应法则可以推广过来，证明也相同（指离散情形；连续情形同样是积分理论中的一个定理）：

$$
\E\,g(X,Y) = \sum_{x,y}g(x,y)\,p_{X,Y}(x,y)\qquad\text{或}\qquad\E\,g(X,Y) = \iint g(x,y)\,f_{X,Y}(x,y)\,dx\,dy,
$$ {#eq-lotus-2d}

这里要求和式或积分绝对收敛。取$g(x,y) = ax+by$并利用边缘分布的公式，就得到**期望的线性性**：对**任意**有数学期望的$X$和$Y$，无论它们是否独立，都有$\E(aX+bY) = a\E X+b\E Y$。例如在离散情形，

$$
\E(X+Y) = \sum_{x,y}(x+y)p_{X,Y}(x,y) = \sum_xx\sum_yp_{X,Y}(x,y) + \sum_yy\sum_xp_{X,Y}(x,y) = \E X + \E Y .
$$

线性性及其应用是[[probability/expectation]]一章的主题。

::: theorem 独立随机变量之积的数学期望 {#thm-product}
若$X$与$Y$独立且数学期望都存在，则$XY$的数学期望存在，且$\E(XY) = \E X\,\E Y$。
:::

::: proof
在离散情形，由[[#eq-lotus-2d]]和[[#thm-independence-criteria]]，

$$
\E(XY) = \sum_{x,y}xy\,p_X(x)p_Y(y) = \Bigl(\sum_xx\,p_X(x)\Bigr)\Bigl(\sum_yy\,p_Y(y)\Bigr) = \E X\,\E Y,
$$

而对$\lvert x\rvert\lvert y\rvert$做同样的计算可知这个二重和绝对收敛，这就说明把它拆开是合理的。在连续情形，把和式换成积分，并把联合密度换成$f_X(x)f_Y(y)$即可。
:::

::: definition 协方差与相关系数 {#def-covariance}
设$X$与$Y$的方差有限，均值分别为$\mu_X$、$\mu_Y$，标准差分别为$\sigma_X$、$\sigma_Y$。它们的**协方差**为

$$
\Cov(X,Y) = \E\bigl[(X-\mu_X)(Y-\mu_Y)\bigr] = \E(XY) - \mu_X\mu_Y,
$$

当$\sigma_X,\sigma_Y>0$时，它们的**相关系数**为

$$
\Corr(X,Y) = \rho_{X,Y} = \frac{\Cov(X,Y)}{\sigma_X\sigma_Y}.
$$

若$\Cov(X,Y) = 0$，则称$X$与$Y$**不相关**。
:::

（协方差的第二个公式可以通过展开乘积并利用线性性得到：$\E(XY - \mu_YX - \mu_XY + \mu_X\mu_Y) = \E(XY) - \mu_X\mu_Y$。乘积$XY$的数学期望存在，因为$\lvert xy\rvert\le\tfrac12(x^2+y^2)$。）当$X$与$Y$倾向于同时高于各自的均值、同时低于各自的均值时，协方差为正；当一个偏高时另一个倾向于偏低，协方差为负。

::: theorem 协方差的性质 {#thm-covariance}
对方差有限的随机变量和常数$a, b, c$，有：

1. $\Cov(X,Y) = \Cov(Y,X)$，且$\Cov(X,X) = \Var X$；
2. $\Cov(aX + bY + c, Z) = a\Cov(X,Z) + b\Cov(Y,Z)$；
3. $\Var(X+Y) = \Var X + \Var Y + 2\Cov(X,Y)$，更一般地，$\Var\bigl(\sum_iX_i\bigr) = \sum_i\Var X_i + 2\sum_{i<j}\Cov(X_i,X_j)$；
4. 若$X$与$Y$独立，则$\Cov(X,Y) = 0$，且$\Var(X+Y) = \Var X + \Var Y$。
:::

::: proof
(1)由定义立即可得。(2) $aX+bY+c$的均值为$a\mu_X + b\mu_Y + c$，所以$(aX + bY + c) - \E(aX+bY+c) = a(X-\mu_X) + b(Y-\mu_Y)$；乘以$Z - \mu_Z$，再利用线性性取数学期望即可。(3) 由(1)和(2)，$\Var(X+Y) = \Cov(X+Y, X+Y) = \Cov(X,X) + \Cov(X,Y) + \Cov(Y,X) + \Cov(Y,Y)$，这就是所要的公式；一般情形用同样的方法展开$\Cov\bigl(\sum_iX_i,\sum_jX_j\bigr)$即可。(4) 由[[#thm-product]]，$\E(XY) = \mu_X\mu_Y$，所以$\Cov(X,Y) = 0$；再利用(3)即可。
:::

第(4)条正是[[probability/discrete-random-variables]]一章中那条警示背后的事实：两次金额相同的独立赌注，总收益的方差为$2\Var X$；而把一次赌注加倍，方差为$4\Var X$。对于[[#ex-urn]]中的罐子，$\E(XY) = \Prob(X=1,Y=1) = \tfrac{3}{10}$，$\E X = \E Y = \tfrac35$，所以

$$
\Cov(X,Y) = \frac{3}{10} - \frac{9}{25} = -\frac{3}{50}, \qquad \Corr(X,Y) = \frac{-3/50}{\tfrac35\cdot\tfrac25} = -\frac14 .
$$

负号反映了这样一个事实：第一次取到红球，会使第二次取到红球的可能性变小。协方差的单位用起来不方便（它是$X$的单位与$Y$的单位之积）；相关系数则是无量纲的，并且总是介于$-1$与$1$之间。

::: theorem 相关系数不等式 {#thm-correlation-bound}
若$X$与$Y$的方差有限且为正，则$-1\le\Corr(X,Y)\le1$。此外，$\Corr(X,Y) = 1$当且仅当存在常数$a$和$b>0$，使得以概率$1$有$Y = a + bX$；$\Corr(X,Y) = -1$当且仅当同样的结论对某个$b<0$成立。
:::

::: proof
设$X^* = (X-\mu_X)/\sigma_X$与$Y^* = (Y-\mu_Y)/\sigma_Y$为标准化变量，它们的均值为$0$、方差为$1$；由[[#thm-covariance]]的第(2)条，$\Cov(X^*,Y^*) = \rho$，即$X$与$Y$的相关系数。由第(3)条，

$$
0\le\Var(X^*\mp Y^*) = 1 + 1 \mp 2\rho = 2(1\mp\rho).
$$

两种符号分别给出$\rho\le1$和$\rho\ge-1$。若$\rho = 1$，则$\Var(X^* - Y^*) = 0$，所以$X^* - Y^*$以概率$1$等于它的均值$0$，即$Y = \mu_Y + \frac{\sigma_Y}{\sigma_X}(X - \mu_X)$，这是一个斜率为正的线性函数。若$\rho = -1$，则以概率$1$有$X^*+Y^* = 0$，斜率为负。反之，若$Y = a + bX$，则$\Cov(X,Y) = b\Var X$且$\sigma_Y = \lvert b\rvert\sigma_X$，所以$\rho = b/\lvert b\rvert = \pm1$。
:::

这个定理表明了相关系数度量的是什么：这对随机变量离落在一条直线上有多近。对于非线性关系，它什么也没有说。

::: widget regression
points: 1,1.8; 2,2.6; 3,3.9; 4,4.1; 5,5.4; 6,5.9; 7,7.2
degree: 1
caption: 对于一团散点，相关系数的平方等于与拟合直线一同显示的$R^2$（[[statistics/regression]]）。把点拖离直线，观察$R^2$如何下降；把一个点拖到很远处，看看单个离群点如何制造或消除相关性。然后把这些点排列在一条抛物线上：关系是完美的，$R^2$却可以接近$0$。
:::

::: warning 不相关并不意味着独立
独立蕴含协方差为零，但反之不然。若$X\sim\operatorname{U}(-1,1)$，$Y = X^2$，则$Y$是$X$的函数——依赖关系强到不能再强——然而由对称性，$\Cov(X,Y) = \E X^3 - \E X\,\E X^2 = 0$。类似地，圆盘内均匀随机点（[[#ex-disc]]）的两个坐标不相关（由对称性，$\E(XY) = 0 = \E X\,\E Y$），但并不独立。相关系数只能检测**线性**关联。而且，即使两个变量之间有很强的相关性，也不能说明其中一个是另一个的原因；两者可能都是由第三个变量驱动的，就像辛普森（Simpson）悖论（[[probability/conditional-probability]]）中那样。
:::

::: quiz
$X$与$Y$独立，$\Var X = 4$，$\Var Y = 9$。$\Var(X - Y)$等于多少？
- [ ] $-5$
- [ ] $5$
- [x] $13$
- [ ] $\sqrt{13}$
::: solution
$\Var(X - Y) = \Var X + \Var(-Y) + 2\Cov(X,-Y) = 4 + (-1)^2\cdot9 + 0 = 13$。即使把变量相减，独立随机变量的方差也是相加的：减去$Y$和加上$Y$一样，都会增加不确定性。
:::
:::

## 独立随机变量之和 {#sums}

我们经常需要$X + Y$的分布：总等待时间、总索赔额、测量误差之和。当$X$与$Y$独立时，它由**卷积**给出。

::: theorem 卷积公式 {#thm-convolution}
设$X$与$Y$独立。

1. 若它们是离散的，则$\displaystyle\Prob(X+Y = z) = \sum_xp_X(x)\,p_Y(z-x)$。
2. 若它们是连续的，则$X+Y$也是连续的，其密度为$\displaystyle f_{X+Y}(z) = \int_{-\infty}^\infty f_X(x)\,f_Y(z-x)\,dx$。
:::

::: proof
(1) 事件$\{X+Y = z\}$是诸事件$\{X = x, Y = z - x\}$（$x$取遍所有值）的不交并，由独立性，每个这样的事件的概率为$p_X(x)p_Y(z-x)$。

(2) 由独立性，联合密度为$f_X(x)f_Y(y)$。对每个$z$，在半平面$\{x+y\le z\}$上对它积分：在内层积分中作代换$y = u - x$，然后交换积分次序（托内利定理），得

$$
\Prob(X+Y\le z) = \int_{-\infty}^\infty f_X(x)\int_{-\infty}^{z-x}f_Y(y)\,dy\,dx = \int_{-\infty}^z\Bigl(\int_{-\infty}^\infty f_X(x)f_Y(u-x)\,dx\Bigr)du .
$$

所以内层积分是$X+Y$的一个密度。
:::

::: example 泊松随机变量之和 {#ex-poisson-sum}
设$X\sim\operatorname{Poisson}(\lambda)$与$Y\sim\operatorname{Poisson}(\mu)$独立。证明$X+Y\sim\operatorname{Poisson}(\lambda+\mu)$。
::: solution
对$n\ge0$，卷积和中只有$0\le k\le n$的项有贡献，由二项式定理，

$$
\Prob(X+Y = n) = \sum_{k=0}^ne^{-\lambda}\frac{\lambda^k}{k!}e^{-\mu}\frac{\mu^{n-k}}{(n-k)!} = \frac{e^{-(\lambda+\mu)}}{n!}\sum_{k=0}^n\binom nk\lambda^k\mu^{n-k} = e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^n}{n!}.
$$

因此，如果一家商店的一条电话线平均每小时接到$3$个电话，另一条平均每小时接到$2$个，两者相互独立且都服从泊松分布，那么电话总数服从$\operatorname{Poisson}(5)$。这与“稀有事件”的图景是一致的：把两个稀有事件的来源合在一起，得到的仍是一个稀有事件的来源。
:::
:::

::: example 两个均匀随机变量之和 {#ex-uniform-sum}
设$X$与$Y$是相互独立的$\operatorname{U}(0,1)$随机变量。求$S = X+Y$的密度。
::: solution
这里$f_X(x)f_Y(z-x) = 1$当且仅当$0\le x\le1$且$0\le z-x\le1$，即$\max(0,z-1)\le x\le\min(1,z)$；在其他情形下它为$0$。所以$f_S(z)$就是这个区间的长度：

$$
f_S(z) = \begin{cases} z, & 0\le z\le1,\\ 2 - z, & 1\le z\le2,\\ 0, & \text{其他。}\end{cases}
$$

两个平坦的密度相加，得到一个在$1$处达到峰值的三角形：靠近中间的和可以由更多种方式凑成，正如$7$是两颗骰子最可能掷出的点数和。再加上第三个均匀随机变量，就得到一个分段二次的密度，它看上去已经是钟形的了——这是对中心极限定理的初次一瞥。
:::
:::

对指数分布反复做卷积，就得到**伽马**分布：若$X_1,\ldots,X_n$是相互独立的$\operatorname{Exp}(\lambda)$随机变量，利用[[#thm-convolution]]作归纳可知，$X_1+\dots+X_n$的密度为

$$
f(x) = \frac{\lambda^nx^{n-1}}{(n-1)!}e^{-\lambda x}\qquad(x>0).
$$ {#eq-gamma}

这就是泊松过程中直到第$n$个事件发生为止的等待时间（$n=2$的情形见习题）。

::: widget plot
f: x^(n - 1)*exp(-x)/gamma(n)
x: 0, 25
y: 0, 1
sliders: n=1:1:12:1
labels: \text{密度：} X_1 + \dots + X_n
caption: $n$个相互独立的$\operatorname{Exp}(1)$随机变量之和的密度。$n = 1$时它就是指数密度；随着$n$增大，峰向右移动（均值为$n$），宽度按$\sqrt n$的比例展开，并且变得越来越对称、越来越接近钟形。[[probability/limit-theorems]]一章中的中心极限定理解释了其中的原因。
:::

## 二维正态分布 {#bivariate-normal}

最重要的联合分布是二维正态分布。它描述的是诸如父亲与儿子的身高、一次测量在两个坐标上的误差这样的数对，其中每个变量都服从正态分布，而依赖关系是线性的。

::: definition 标准二维正态分布 {#def-bivariate-normal}
设$-1<\rho<1$。称数对$(X,Y)$服从**相关系数为$\rho$的标准二维正态分布**，如果它的联合密度为

$$
f(x,y) = \frac{1}{2\pi\sqrt{1-\rho^2}}\exp\Bigl(-\frac{x^2 - 2\rho xy + y^2}{2(1-\rho^2)}\Bigr),\qquad (x,y)\in\R^2.
$$ {#eq-bivariate-normal}
:::

::: proposition 二维正态分布的性质 {#prop-bivariate-normal}
若$(X,Y)$服从相关系数为$\rho$的标准二维正态分布，则

1. $X$和$Y$都服从$\Normal(0,1)$；
2. 给定$X = x$时，$Y$服从$\Normal(\rho x, 1-\rho^2)$分布；
3. $\Corr(X,Y) = \rho$；
4. $X$与$Y$独立当且仅当$\rho = 0$。
:::

::: proof
对$y$配方：$x^2 - 2\rho xy + y^2 = (y - \rho x)^2 + (1-\rho^2)x^2$。因此

$$
f(x,y) = \underbrace{\frac{1}{\sqrt{2\pi}}e^{-x^2/2}}_{\varphi(x)}\cdot\underbrace{\frac{1}{\sqrt{2\pi(1-\rho^2)}}\exp\Bigl(-\frac{(y-\rho x)^2}{2(1-\rho^2)}\Bigr)}_{g_x(y)},
$$

其中对每个固定的$x$，$g_x$是关于$y$的$\Normal(\rho x, 1-\rho^2)$密度。对$y$积分得$f_X(x) = \varphi(x)$，这就对$X$证明了(1)；由于[[#eq-bivariate-normal]]关于$x$和$y$对称，同样的结论对$Y$也成立。于是$f_{Y\mid X}(y\mid x) = f(x,y)/\varphi(x) = g_x(y)$，这就是(2)。对于(3)，均值都是$0$，方差都是$1$，所以$\Corr(X,Y) = \E(XY)$；先对$y$积分（$g_x$的均值为$\rho x$），得

$$
\E(XY) = \int_{-\infty}^\infty x\varphi(x)\Bigl(\int_{-\infty}^\infty y\,g_x(y)\,dy\Bigr)dx = \int_{-\infty}^\infty\rho x^2\varphi(x)\,dx = \rho\,\E X^2 = \rho .
$$

(4) 若$\rho = 0$，则$f(x,y) = \varphi(x)\varphi(y)$，由[[#thm-independence-criteria]]，$X$与$Y$独立；若它们独立，则由[[#thm-covariance]]，$\rho = \Corr(X,Y) = 0$。
:::

第(4)条是特殊的：对于联合正态的变量，不相关意味着独立；但一般情况下并非如此（见前面的警示），即使$X$和$Y$各自都服从正态分布也不行。若$X\sim\Normal(0,1)$，$Y = SX$，其中$S = \pm1$是与$X$独立的、等可能取正负号的随机符号，则$Y\sim\Normal(0,1)$且$\Cov(X,Y) = \E S\,\E X^2 = 0$，然而$\lvert Y\rvert = \lvert X\rvert$；这对随机变量并不服从二维正态分布（它落在两条直线$y = \pm x$上，因而根本没有联合密度）。一般的二维正态分布可以通过伸缩和平移得到，即$(\mu_X+\sigma_XX,\ \mu_Y+\sigma_YY)$；它的密度的等高线是以$(\mu_X,\mu_Y)$为中心的椭圆，其倾斜方向取决于$\rho$的符号。

::: widget surface
f: exp(-(x^2 - 2*r*x*y + y^2)/(2*(1 - r^2)))/(2*pi*sqrt(1 - r^2))
x: -3, 3
y: -3, 3
sliders: r=0.6:-0.95:0.95:0.05
contours: true
caption: 相关系数为$r$的标准二维正态密度。$r = 0$时，曲面是一座圆形的山丘，等高线为圆，它是两条正态曲线的乘积。当$r$趋向$1$时，山丘被挤压成沿直线$y = x$的山脊；当$r$趋向$-1$时，则被挤压成沿$y = -x$的山脊。每个竖直截面都是一条钟形曲线：在$x$处的截面以$rx$为中心，这正是第(2)条中的条件均值。
:::

第(2)条包含了弗朗西斯·高尔顿（Francis Galton）称为**向均值回归**的现象。若父亲（$X$）与成年儿子（$Y$）的标准化身高服从$\rho = 0.5$的二维正态分布，则身高比平均值高两个标准差的父亲，他们的儿子平均只比平均值高$\rho\cdot2 = 1$个标准差。并没有什么力量把儿子们拉向平庸；这一效应之所以产生，是因为父亲的身高只有一部分会传给儿子，而且它反过来同样成立（高个子儿子的父亲也没有那么极端）。它将在[[statistics/regression]]中再次出现。

::: history
二维正态密度出现在关于二维观测误差的研究中，其中最著名的是奥古斯特·布拉维（Auguste Bravais）1846年的工作。弗朗西斯·高尔顿（Francis Galton）认识到了它在统计上的重要性：19世纪80年代，他研究父母与子女的身高，在数据中发现了椭圆形的等高线，并引入回归（1886年）和相关（1888年）来描述它们。19世纪90年代，卡尔·皮尔逊（Karl Pearson）用积矩公式为相关性奠定了系统的数学基础，这个公式如今称为皮尔逊相关系数。
:::

## 后续内容 {#where-next}

期望的线性性、条件期望$\E(Y\mid X)$以及生成函数（它把卷积变成乘积）将在[[probability/expectation]]一章中展开。本章所计算的独立随机变量之和的方差，是[[probability/limit-theorems]]一章中大数定律和中心极限定理的原动力。在统计学中，样本的联合分布是一切的基础：正态数据的样本均值与样本方差相互独立（[[statistics/sampling]]），以及[[statistics/regression]]中的二维正态模型，都以它为基础。$n$维随机向量用协方差矩阵代替单个协方差，把本章与[[linear-algebra/spectral-theorem]]联系起来。

::: summary
- $(X,Y)$的联合概率质量函数或联合密度决定了关于这对随机变量的一切概率；对另一个变量求和或积分即得边缘分布，除以边缘分布即得条件分布。
- 若关于$X$的所有事件都与关于$Y$的所有事件独立，则$X$与$Y$独立；等价地，联合概率质量函数或联合密度可以分解为乘积——在一个矩形上。
- $\E g(X,Y)$是一个二重和或二重积分；线性性$\E(X+Y) = \E X+\E Y$总成立，而当$X$、$Y$独立时，$\E(XY) = \E X\,\E Y$。
- $\Cov(X,Y) = \E(XY) - \E X\E Y$；$\Var(X+Y) = \Var X+\Var Y+2\Cov(X,Y)$，所以独立变量的方差相加。
- $\Corr(X,Y)\in[-1,1]$，取$\pm1$当且仅当存在严格的线性关系；相关系数为零并不蕴含独立，相关也不蕴含因果。
- 独立随机变量之和的分布是卷积：泊松加泊松仍是泊松，均匀加均匀是三角形分布，指数分布之和是伽马分布。
- 在二维正态分布中，边缘分布和条件分布都是正态的，$\E(Y\mid X=x) = \rho x$（向均值回归），并且不相关就意味着独立。
:::

## 习题

::: exercise 联合分布表 {level=1 check="1/20"}
$X$和$Y$在$\{0,1\}$中取值，且$p(0,0) = 0.2$，$p(0,1) = 0.3$，$p(1,0) = 0.1$，$p(1,1) = 0.4$。求边缘概率质量函数和$\Cov(X,Y)$。
::: solution
$\Prob(X = 1) = 0.1+0.4 = 0.5$，$\Prob(Y=1) = 0.3+0.4 = 0.7$，所以$\E X = 0.5$，$\E Y = 0.7$。又$\E(XY) = p(1,1) = 0.4$。因此$\Cov(X,Y) = 0.4 - 0.5\times0.7 = 0.05$。
:::
:::

::: exercise 线性组合的方差 {level=1 check="17"}
$X$与$Y$独立，$\Var X = 3$，$\Var Y = 5$。求$\Var(2X - Y + 7)$。
::: solution
$\Var(2X - Y + 7) = 4\Var X + \Var Y = 12 + 5 = 17$，这里用到了[[#thm-covariance]]以及$\Cov(X,Y) = 0$；常数项不影响结果。
:::
:::

::: exercise 可分解的密度 {level=1 check="2/5"}
$(X,Y)$在单位正方形$0\le x,y\le1$上的联合密度为$f(x,y) = 6x^2y$。证明$X$与$Y$独立，并求$\Prob(X<Y)$。
::: solution
在这个正方形（一个矩形）上，$f(x,y) = 3x^2\cdot2y$是$[0,1]$上两个密度的乘积，所以$X$与$Y$独立，且$f_X(x) = 3x^2$，$f_Y(y) = 2y$。于是

$$
\Prob(X<Y) = \int_0^1 2y\Bigl(\int_0^y3x^2\,dx\Bigr)dy = \int_0^12y^4\,dy = \frac25 .
$$
:::
:::

::: exercise 首次失效 {level=2 check="500"}
三个相互独立的部件的寿命都服从指数分布，均值分别为$1000$、$2000$和$2000$小时。只要其中任何一个部件失效，系统就失效。求系统的期望寿命，以及最先失效的恰好是第一个部件的概率；请填写期望寿命。
::: solution
失效率分别为每小时$0.001$、$0.0005$和$0.0005$。与[[#ex-competing]]一样，独立指数寿命的最小值超过$t$当且仅当三个寿命都超过$t$，所以$\Prob(T>t) = e^{-0.001t}e^{-0.0005t}e^{-0.0005t} = e^{-0.002t}$：系统寿命服从$\operatorname{Exp}(0.002)$，均值为$1/0.002 = 500$小时。第一个部件最先失效的概率为$0.001/(0.001 + 0.0005 + 0.0005) = \tfrac12$，这可以用该例中同样的积分得到，只需把$\mu$换成另外两个部件的合并失效率$0.001$（它们的最小值服从$\operatorname{Exp}(0.001)$，且与第一个部件的寿命独立）。
:::
:::

::: exercise 和的相关系数 {level=2 check="1/sqrt(2)"}
$X$与$Y$独立，方差同为$\sigma^2>0$。求$\Corr(X, X+Y)$。
::: solution
$\Cov(X,X+Y) = \Var X + \Cov(X,Y) = \sigma^2$，$\Var(X+Y) = 2\sigma^2$，所以

$$
\Corr(X,X+Y) = \frac{\sigma^2}{\sigma\cdot\sqrt2\,\sigma} = \frac{1}{\sqrt2}\approx0.707 .
$$
:::
:::

::: exercise 非均匀密度的相关系数 {level=2 check="-1/11"}
对于[[#ex-xy-density]]中单位正方形上的密度$f(x,y) = x + y$，求$\Corr(X,Y)$。
::: solution
由$f_X(x) = x+\tfrac12$得：$\E X = \int_0^1x\bigl(x+\tfrac12\bigr)dx = \tfrac13 + \tfrac14 = \tfrac7{12}$，$\E X^2 = \tfrac14 + \tfrac16 = \tfrac5{12}$，所以$\Var X = \tfrac5{12} - \tfrac{49}{144} = \tfrac{11}{144}$；$Y$也是如此。其次，

$$
\E(XY) = \int_0^1\int_0^1xy(x+y)\,dx\,dy = \frac13\cdot\frac12 + \frac12\cdot\frac13 = \frac13,
$$

所以$\Cov(X,Y) = \tfrac13 - \tfrac{49}{144} = -\tfrac{1}{144}$，$\Corr(X,Y) = \dfrac{-1/144}{11/144} = -\dfrac{1}{11}$。尽管密度在角点$(1,1)$附近最大，相关系数仍是弱负的。给定$X = x$时，$Y$的密度为$(x+y)/(x+\tfrac12)$，它向较大$y$值的倾斜随$x$的增大而减弱；因此$\E(Y\mid X = x) = \dfrac{3x+2}{6x+3}$从$x = 0$时的$\tfrac23$下降到$x = 1$时的$\tfrac59$。
:::
:::

::: exercise 不相关但不独立 {level=3}
设$X\sim\operatorname{U}(-1,1)$，$Y = X^2$。证明$\Cov(X,Y) = 0$，但$X$与$Y$不独立。
::: solution
$\E X = 0$，且$\E X^3 = \int_{-1}^1\tfrac12x^3\,dx = 0$（被积函数是奇函数），所以$\Cov(X,Y) = \E(X\cdot X^2) - \E X\,\E X^2 = 0$。为证明不独立，考虑$A = \{X>\tfrac12\}$和$B = \{Y<\tfrac14\}$。则$\Prob(A) = \tfrac14$，$\Prob(B) = \Prob(\lvert X\rvert<\tfrac12) = \tfrac12$，但$A\cap B = \varnothing$，因为$X>\tfrac12$迫使$Y>\tfrac14$。所以$\Prob(A\cap B) = 0\ne\tfrac18 = \Prob(A)\Prob(B)$。
:::
:::

::: exercise 二项加二项 {level=3}
设$X\sim\Bin(m,p)$与$Y\sim\Bin(n,p)$独立。用卷积公式证明$X+Y\sim\Bin(m+n,p)$，并用伯努利试验解释这一结果。
::: hint
需要用到范德蒙德（Vandermonde）恒等式$\sum_k\binom mk\binom{n}{j-k} = \binom{m+n}{j}$。
:::
::: solution
记$q = 1-p$，对$0\le j\le m+n$，

$$
\Prob(X+Y = j) = \sum_k\binom mkp^kq^{m-k}\binom{n}{j-k}p^{j-k}q^{n-j+k} = p^jq^{m+n-j}\sum_k\binom mk\binom n{j-k} = \binom{m+n}jp^jq^{m+n-j},
$$

这里用到了范德蒙德恒等式（从$m+n$个对象中选出$j$个，就是对某个$k$，从前$m$个中选出$k$个，再从另外$n$个中选出$j-k$个；见[[discrete/counting]]）。用试验的语言来说：$X$是$m$次独立试验中的成功次数，$Y$是与之独立的另外$n$次试验中的成功次数，所以$X+Y$是成功概率相同的$m+n$次独立试验中的成功次数。
:::
:::

::: exercise 第二次到达 {level=3}
设$X$与$Y$是相互独立的$\operatorname{Exp}(\lambda)$随机变量。用卷积公式证明：当$z>0$时，$X+Y$的密度为$\lambda^2ze^{-\lambda z}$，这正是[[#eq-gamma]]在$n = 2$时的断言；并求$\lambda = 1$时的$\Prob(X+Y>1)$。
::: solution
对$z>0$，$f_X(x)f_Y(z-x)$仅当$0<x<z$时非零，此时它等于$\lambda e^{-\lambda x}\lambda e^{-\lambda(z-x)} = \lambda^2e^{-\lambda z}$，与$x$无关。因此$f_{X+Y}(z) = \int_0^z\lambda^2e^{-\lambda z}\,dx = \lambda^2ze^{-\lambda z}$。当$\lambda = 1$时，分部积分得

$$
\Prob(X+Y>1) = \int_1^\infty ze^{-z}\,dz = \Bigl[-ze^{-z} - e^{-z}\Bigr]_1^\infty = 2e^{-1}\approx0.736 .
$$

这也等于$\Prob(N\le1)$，其中$N\sim\operatorname{Poisson}(1)$是速率为$1$的泊松过程在$[0,1]$中的事件数：第二个事件在时刻$1$之后发生，当且仅当到那时为止至多发生了一个事件，而$e^{-1}(1+1) = 2e^{-1}$。
:::
:::
