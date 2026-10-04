一个放射性原子**恰好**在从现在起$3.000\ldots$秒时衰变的概率是多少？随机选出的一位女性身高**恰好**为$165$ cm的概率又是多少？在任何合理的模型中，答案都是$0$：可能的取值有不可数多个，其中没有哪一个能单独带有正概率。然而，诸如“这个原子再存活一小时的机会有多大？”或“身高超过$175$ cm的女性占多大比例？”这样的问题却有完全确定的答案。对于连续变化的量，概率并不集中在点上，而是沿着直线分布开来，就像质量沿一根细杆分布一样，它由**密度**来描述。

本章平行于[[probability/discrete-random-variables]]一章中的离散理论，发展连续型随机变量的理论，只是把求和换成积分（[[calculus-1/integrals]]）。我们从对每个随机变量都适用的分布函数开始，然后定义密度、数学期望和方差。在应用中占主导地位的有三种分布：**均匀分布**、**指数分布**（几何分布的连续类比，也是唯一具有无记忆性的连续分布）和**正态分布**，即钟形曲线。最后，我们学习如何求随机变量的函数的分布，这除了别的用处之外，还说明了计算机如何模拟具有任意指定分布的随机数。

## 分布函数 {#cdf}

分布函数在讨论离散型随机变量时已经引入，它对每个随机变量都有意义，是离散情形与连续情形的共同语言。

::: definition 分布函数 {#def-cdf}
随机变量$X$的（累积）**分布函数**是$F_X\colon\R\to[0,1]$，

$$
F_X(x) = \Prob(X\le x).
$$
:::

对任意$a < b$，事件$\{X\le b\}$是$\{X\le a\}$与$\{a < X\le b\}$的不交并，所以

$$
\Prob(a < X\le b) = F_X(b) - F_X(a).
$$ {#eq-interval}

每个分布函数都具有下面的三条性质；反之，任何具有这三条性质的函数都是某个随机变量的分布函数（这一事实在[[measure-theory/lebesgue-measure]]一章中证明）。

::: theorem 分布函数的性质 {#thm-cdf}
设$F$是随机变量$X$的分布函数。则

1. $F$单调不减：若$x\le y$，则$F(x)\le F(y)$；
2. $\lim_{x\to-\infty}F(x) = 0$且$\lim_{x\to\infty}F(x) = 1$；
3. $F$右连续：对每个$x$，$\lim_{h\to0^+}F(x+h) = F(x)$；
4. $\Prob(X = x) = F(x) - F(x^-)$，其中$F(x^-) = \lim_{h\to0^+}F(x-h)$。
:::

::: proof
(1) 若$x\le y$，则$\{X\le x\}\subseteq\{X\le y\}$；应用概率的单调性即可。

对其余各条，我们沿序列使用概率的连续性（[[probability/probability-spaces#thm-continuity]]）；由于$F$是单调的，沿序列的极限决定了单侧极限。(2) 事件$\{X\le -n\}$递减到$\varnothing$（没有一个实数对每个$n$都$\le -n$），所以$F(-n)\to\Prob(\varnothing) = 0$。事件$\{X\le n\}$递增到$\Omega$（每个实数对某个$n$都$\le n$），所以$F(n)\to1$。

(3) 事件$\{X\le x + 1/n\}$递减到$\{X\le x\}$，所以$F(x+1/n)\to F(x)$。

(4) 事件$\{X\le x - 1/n\}$递增到$\{X < x\}$，所以$F(x^-) = \Prob(X<x)$，从而$\Prob(X = x) = \Prob(X\le x) - \Prob(X<x) = F(x) - F(x^-)$。
:::

第(4)条说明，$F$的跳跃对应于带有正概率的取值。离散型随机变量的分布函数是阶梯函数；而我们下面定义的连续型随机变量，其分布函数根本没有跳跃。

## 概率密度 {#densities}

::: definition 连续型随机变量与密度 {#def-density}
称随机变量$X$是**连续型**的，是指存在函数$f_X\colon\R\to[0,\infty)$——称为$X$的一个（概率）**密度**——使得

$$
F_X(x) = \int_{-\infty}^x f_X(t)\,dt\qquad\text{对所有 } x\in\R.
$$ {#eq-density}
:::

令$x\to\infty$，可知$\int_{-\infty}^\infty f_X(t)\,dt = 1$（这是一个反常积分，[[calculus-1/improper-integrals]]）；反之，任何总积分为$1$的非负可积函数$f$都是某个随机变量的密度。把[[#eq-density]]与[[#eq-interval]]结合起来，得

$$
\Prob(a < X\le b) = \int_a^b f_X(x)\,dx,
$$

更一般地，对任何合理的集合$A$（用测度论的语言说，任何博雷尔集），$\Prob(X\in A) = \int_A f_X(x)\,dx$。由于$F_X$是一个积分，它是连续的，所以由[[#thm-cdf]]的第(4)条，对每个$x$都有$\Prob(X = x) = 0$。特别地，区间是否包含端点无关紧要：$\Prob(a\le X\le b) = \Prob(a<X<b)$。由微积分基本定理，在$f_X$连续的每一点处都有$F_X' = f_X$。

密度**不是**概率。它的含义来自小区间：若$f_X$在$x$处连续，则

$$
\Prob(x < X\le x + h) = \int_x^{x+h} f_X(t)\,dt \approx f_X(x)\,h \qquad\text{对很小的 } h > 0,
$$

所以$f_X(x)$是$x$附近**每单位长度**上的概率，正如细杆的密度是每单位长度上的质量。

::: warning 密度不是概率
密度的值可以超过$1$。$[0, \tfrac12]$上的均匀密度在该区间上等于$2$，而标准差为$0.01$的正态密度的峰值约为$40$。必须等于$1$的是密度曲线下的**面积**。同样，$f_X(x) = 0.3$并不意味着“以概率$0.3$有$X = x$”：对每个$x$，这个概率都是$0$。
:::

::: example 确定常数 {#ex-density-constant}
设当$-1\le x\le1$时$f(x) = c\,(1 - x^2)$，其他情形$f(x) = 0$。求使$f$成为密度的$c$值、相应的分布函数以及$\Prob(X > \tfrac12)$。
::: solution
总面积必须为$1$：

$$
\int_{-1}^1 c(1-x^2)\,dx = c\Bigl[x - \frac{x^3}{3}\Bigr]_{-1}^1 = \frac43c = 1, \qquad\text{所以 } c = \frac34 .
$$

（我们还需要$f\ge0$，这是成立的，因为在$[-1,1]$上$1-x^2\ge0$。）当$-1\le x\le 1$时，

$$
F(x) = \int_{-1}^x\frac34(1-t^2)\,dt = \frac34\Bigl(x - \frac{x^3}{3} + \frac23\Bigr) = \frac12 + \frac34x - \frac14x^3,
$$

而当$x<-1$时$F(x) = 0$，当$x > 1$时$F(x) = 1$。于是$\Prob(X > \tfrac12) = 1 - F(\tfrac12) = 1 - \bigl(\tfrac12 + \tfrac38 - \tfrac1{32}\bigr) = \tfrac{5}{32}\approx 0.156$。
:::
:::

::: quiz
连续型随机变量$X$的密度为：当$0\le x\le\tfrac12$时$f(x) = 2$，其他情形$f(x) = 0$。下列哪个说法正确？
- [ ] $f$不是合格的密度，因为$f(x) > 1$。
- [ ] $\Prob(X = 0.25) = 2$。
- [x] $\Prob(X\le0.1) = 0.2$。
- [ ] $\Prob(X\le 0.1) = 0.1$。
::: solution
$f\ge0$，且它下方的面积为$2\times\tfrac12 = 1$，所以它是合格的密度。概率就是面积：$\Prob(X\le 0.1) = \int_0^{0.1}2\,dx = 0.2$。单个值的概率为$0$；数$2$是**每单位长度**上的概率。
:::
:::

## 数学期望与方差 {#expectation}

连续型随机变量的数学期望仿照离散情形来定义，只是把概率质量函数换成密度，把求和换成积分。

::: definition 连续型随机变量的数学期望 {#def-expectation-cont}
若$X$的密度为$f_X$，则它的**数学期望**为

$$
\E X = \int_{-\infty}^\infty x\,f_X(x)\,dx,
$$

这里要求$\int_{-\infty}^\infty\lvert x\rvert f_X(x)\,dx < \infty$。方差为$\Var X = \E\bigl[(X - \E X)^2\bigr]$，当$\E X^2<\infty$时有定义。
:::

关于函数的法则同样适用：对任何合理的函数$g$（例如分段连续函数），

$$
\E\,g(X) = \int_{-\infty}^\infty g(x)\,f_X(x)\,dx,
$$ {#eq-lotus-cont}

只要该积分绝对收敛。对于单调可导的$g$，这可以由本章后面的变量替换定理通过换元得到；一般情形是积分理论中的一个定理，在[[measure-theory/lebesgue-integral]]一章中证明。与离散情形一样，由[[#eq-lotus-cont]]可推出$\E(aX+b) = a\E X+b$，$\Var X = \E X^2 - (\E X)^2$以及$\Var(aX+b) = a^2\Var X$，证明也相同。

对于[[#ex-density-constant]]中的密度，关于$0$的对称性给出$\E X = 0$（被积函数$x f(x)$是奇函数），其方差在习题中计算。

::: remark 没有均值的密度
**柯西**密度$f(x) = \dfrac{1}{\pi(1+x^2)}$关于$0$对称，但它没有数学期望：$\int_0^\infty\frac{x}{\pi(1+x^2)}\,dx = \lim_{R\to\infty}\frac{1}{2\pi}\ln(1 + R^2) = \infty$。它的尾部衰减得如此之慢，以致大的取值主导了任何平均。我们将在[[probability/limit-theorems]]一章中看到，柯西随机变量的平均值根本不会趋于稳定。
:::

## 均匀分布 {#uniform}

::: definition 均匀分布 {#def-uniform}
若$X$的密度为：当$a\le x\le b$时$f(x) = \dfrac{1}{b-a}$，其他情形为$0$，则称$X$服从$[a,b]$上的**均匀分布**，记作$X\sim\operatorname{U}(a,b)$。
:::

子区间的概率与其长度成正比，这正是[[probability/probability-spaces]]一章中“随机选取的点”的模型。均值是区间中点，方差只依赖于区间长度：

$$
\E X = \int_a^b\frac{x}{b-a}\,dx = \frac{a+b}{2}, \qquad \E X^2 = \frac{a^2 + ab + b^2}{3},\qquad \Var X = \frac{(b-a)^2}{12}.
$$

（方差为$\E X^2 - (\E X)^2 = \frac{4(a^2+ab+b^2) - 3(a+b)^2}{12} = \frac{(b-a)^2}{12}$。）例如，如果公交车恰好每$10$分钟来一班，而你在一个均匀随机的时刻到达车站，那么你的等待时间服从$\operatorname{U}(0,10)$：平均等待$5$分钟，标准差为$10/\sqrt{12}\approx2.9$分钟，等待超过$7$分钟的概率为$0.3$。

## 指数分布 {#exponential}

::: definition 指数分布 {#def-exponential}
若$X$的密度为：当$x\ge0$时$f(x) = \lambda e^{-\lambda x}$，当$x < 0$时$f(x) = 0$，则称$X$服从速率为$\lambda>0$的**指数分布**，记作$X\sim\operatorname{Exp}(\lambda)$。
:::

积分得：当$x\ge0$时$F(x) = 1 - e^{-\lambda x}$，而**生存函数**为

$$
\Prob(X > x) = e^{-\lambda x}\qquad(x\ge0).
$$ {#eq-exp-tail}

分部积分给出$\E X = \int_0^\infty x\lambda e^{-\lambda x}\,dx = \dfrac1\lambda$和$\E X^2 = \dfrac{2}{\lambda^2}$，所以$\Var X = \dfrac{1}{\lambda^2}$。指数分布用来为不会老化的事物的寿命建模（放射性原子、处于正常使用期的电子元件），也用来为以每单位时间$\lambda$的速率“随机”发生的事件之间的等待时间建模，例如打进求助热线的电话。在后一种角色中，它与泊松分布联系在一起：如果事件的发生方式使得任一长为$t$的区间内的事件数都服从$\operatorname{Poisson}(\lambda t)$（这称为**泊松过程**），那么直到第一个事件发生的等待时间$T$满足$\Prob(T>t) = \Prob(\text{没有事件发生于 }[0,t]) = e^{-\lambda t}$，所以$T\sim\operatorname{Exp}(\lambda)$。

::: widget distribution
dist: exponential
params: lambda=1
cdf: true
caption: $\operatorname{Exp}(\lambda)$的密度和分布函数。改变速率$\lambda$：密度总是从高度$\lambda$开始，而均值$1/\lambda$（图中标出了均值$\pm$一个标准差，标准差也是$1/\lambda$）与$\lambda$成反比地移动。分布函数在均值处升到$1 - e^{-1}\approx 0.63$，所以大约$63\%$的寿命短于平均寿命。
:::

::: example 放射性碳 {#ex-carbon}
碳-14的**半衰期**约为$5730$年：在这段时间内，大量原子构成的样本中有一半会衰变。把单个原子的寿命建模为$\operatorname{Exp}(\lambda)$。求$\lambda$、平均寿命以及一个原子存活$10\,000$年的概率。
::: solution
半衰期$h$就是寿命的中位数：$\Prob(T > h) = e^{-\lambda h} = \tfrac12$，所以$\lambda = \ln 2/h = \ln2/5730\approx1.21\times10^{-4}$（每年）。平均寿命为$1/\lambda = 5730/\ln2\approx 8267$年，比半衰期长，因为这个分布有一条长长的右尾。最后，

$$
\Prob(T > 10\,000) = e^{-10\,000\lambda} = 2^{-10\,000/5730}\approx0.298 .
$$

放射性碳定年法就是把这个计算倒过来：测得样本中碳-14的剩余比例，就能确定样本的年代。
:::
:::

与几何分布一样，指数分布也具有**无记忆性**：由[[#eq-exp-tail]]，对$s,t\ge0$，

$$
\Prob(X > s+t\mid X>s) = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = \Prob(X>t).
$$

一个已经存活了一千年的原子和新的一样。值得注意的是，这一性质刻画了指数分布。

::: example 在服务台等待 {#ex-help-desk}
打进某服务台的电话构成一个泊松过程，平均每小时$4$个。求等到第一个电话的期望等待时间、等待超过半小时的概率，以及在前$20$分钟没有电话打进的条件下，还要再等待超过半小时的概率。
::: solution
以小时为单位，等待时间$T\sim\operatorname{Exp}(4)$，所以$\E T = \tfrac14$小时$= 15$分钟，并且

$$
\Prob(T>\tfrac12) = e^{-4\cdot\frac12} = e^{-2}\approx0.135 .
$$

由无记忆性，$\Prob\bigl(T > \tfrac13 + \tfrac12\mid T>\tfrac13\bigr) = \Prob(T > \tfrac12) = e^{-2}$也成立：平静的二十分钟并不会让电话来得更快。此外$\Prob(T\le\tfrac{1}{12}) = 1 - e^{-1/3}\approx0.283$，所以尽管平均等待时间为$15$分钟，仍有超过四分之一的等待时间不到$5$分钟。短的等待时间最有可能出现；长的等待时间较少见，但也不可忽略。
:::
:::

::: theorem 指数分布是唯一的无记忆分布 {#thm-exp-memoryless}
设随机变量$T$对每个$t\ge0$都满足$\Prob(T>t)>0$，且$\Prob(T > 0) = 1$；又设对所有$s,t\ge0$都有$\Prob(T > s+t\mid T > s) = \Prob(T>t)$。则存在某个$\lambda>0$使$T\sim\operatorname{Exp}(\lambda)$。
:::

::: proof
令$G(t) = \Prob(T>t) = 1 - F_T(t)$。题设条件就是：对所有$s, t\ge0$有$G(s+t) = G(s)G(t)$，并且$G(0) = 1$。由[[#thm-cdf]]，$G$单调不增、右连续，且当$t\to\infty$时$G(t)\to0$。

令$c = G(1) > 0$。如果$c$等于$1$，那么对每个整数$n$都有$G(n) = G(1)^n = 1$，这与$G(n)\to0$矛盾；所以$0 < c < 1$，并且$c = e^{-\lambda}$，其中$\lambda = -\ln c > 0$。对正整数$m, n$，反复应用这个函数方程，得$G(1) = G(1/n)^n$，所以$G(1/n) = c^{1/n}$（唯一的正$n$次方根），进而$G(m/n) = G(1/n)^m = c^{m/n}$。于是对每个正有理数$t$都有$G(t) = e^{-\lambda t}$。对任意实数$t\ge0$，取递减趋于$t$的有理数列$r_k$；由右连续性得$G(t) = \lim_k e^{-\lambda r_k} = e^{-\lambda t}$。所以当$t\ge0$时$F_T(t) = 1 - e^{-\lambda t}$，当$t<0$时$F_T(t) = 0$，这正是$\operatorname{Exp}(\lambda)$的分布函数。
:::

## 正态分布 {#normal}

概率论与统计学中最重要的分布是正态分布，也称高斯分布。它的重要性来自中心极限定理（[[probability/limit-theorems]]）：许多微小的独立效应之和近似服从正态分布，而不管各个效应本身服从什么分布。测量误差、身高、考试分数以及许多其他的量都可以用它很好地建模。

::: definition 正态分布 {#def-normal}
称$X$服从均值为$\mu\in\R$、方差为$\sigma^2>0$的**正态分布**，记作$X\sim\Normal(\mu,\sigma^2)$，是指它的密度为

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\Bigl(-\frac{(x-\mu)^2}{2\sigma^2}\Bigr), \qquad x\in\R.
$$ {#eq-normal-density}

$\mu = 0$，$\sigma = 1$的情形称为**标准正态**分布，其密度为$\varphi(z) = e^{-z^2/2}/\sqrt{2\pi}$，分布函数为$\Phi(z) = \int_{-\infty}^z\varphi(t)\,dt$。
:::

这个密度是一条关于$\mu$对称的钟形曲线，拐点位于$\mu\pm\sigma$。常数$1/(\sigma\sqrt{2\pi})$之所以正确，依赖于一个著名的积分。

::: theorem 高斯积分 {#thm-gaussian-integral}
$$
\int_{-\infty}^\infty e^{-x^2/2}\,dx = \sqrt{2\pi}.
$$
:::

::: proof
记这个积分为$I$；它是收敛的，因为$e^{-x^2/2}\le e^{1/2 - \lvert x\rvert}$（由于$x^2/2 \ge \lvert x\rvert - 1/2$）。于是$I^2$是两个这样的积分的乘积，我们把它写成平面上的二重积分，并在极坐标$x = r\cos\theta$，$y = r\sin\theta$，$dx\,dy = r\,dr\,d\theta$下计算（[[multivariable/change-of-variables]]）：

$$
I^2 = \int_{-\infty}^\infty\int_{-\infty}^\infty e^{-(x^2+y^2)/2}\,dx\,dy = \int_0^{2\pi}\int_0^\infty e^{-r^2/2}\,r\,dr\,d\theta = 2\pi\Bigl[-e^{-r^2/2}\Bigr]_0^\infty = 2\pi.
$$

（对于非负的被积函数，在任一坐标系中把反常二重积分写成累次积分都是合理的，其依据是托内利（Tonelli）定理。）由于$I>0$，所以$I = \sqrt{2\pi}$。
:::

作代换$z = (x-\mu)/\sigma$，可知对每个$\mu$和$\sigma$，[[#eq-normal-density]]的积分都为$1$。两个参数的名称可以这样来说明。若$Z\sim\Normal(0,1)$，则$\E Z = 0$，因为$z\varphi(z)$是可积的奇函数；再取$u = z$，$dv = z\varphi(z)\,dz$（于是$v = -\varphi(z)$）进行分部积分，得

$$
\E Z^2 = \int_{-\infty}^\infty z\cdot z\varphi(z)\,dz = \Bigl[-z\varphi(z)\Bigr]_{-\infty}^\infty + \int_{-\infty}^\infty\varphi(z)\,dz = 0 + 1 = 1 .
$$

所以$\Var Z = 1$。每个正态随机变量都是标准正态变量经过伸缩平移得到的：若$Z\sim\Normal(0,1)$，则$X = \mu + \sigma Z\sim\Normal(\mu,\sigma^2)$；反之，若$X\sim\Normal(\mu,\sigma^2)$，则

$$
Z = \frac{X-\mu}{\sigma}\sim\Normal(0,1)
$$ {#eq-standardise}

（这两个事实都可由下面的变量替换定理推出）。因此$\E X = \mu + \sigma\E Z = \mu$，$\Var X = \sigma^2\Var Z = \sigma^2$，并且每个正态概率都归结为$\Phi$的一个值：

$$
\Prob(X\le x) = \Prob\Bigl(Z\le\frac{x-\mu}{\sigma}\Bigr) = \Phi\Bigl(\frac{x-\mu}{\sigma}\Bigr).
$$

函数$\Phi$不能用初等函数的公式表示；人们为它编制了数值表，每个统计软件包也都内置了它。由对称性，$\Phi(-z) = 1 - \Phi(z)$，所以数值表只列出$z\ge0$的值。下面是一些值得记住的值：

| $z$ | $0$ | $0.5$ | $1$ | $1.282$ | $1.5$ | $1.645$ | $1.96$ | $2$ | $2.326$ | $2.576$ | $3$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | $0.5$ | $0.6915$ | $0.8413$ | $0.9000$ | $0.9332$ | $0.9500$ | $0.9750$ | $0.9772$ | $0.9900$ | $0.9950$ | $0.9987$ |

特别地，正态随机变量落在其均值的一个、两个和三个标准差范围之内的概率分别为

$$
\Prob(\lvert X-\mu\rvert<\sigma)\approx0.683,\qquad\Prob(\lvert X-\mu\rvert<2\sigma)\approx0.954,\qquad\Prob(\lvert X-\mu\rvert<3\sigma)\approx0.997,
$$

这就是**68–95–99.7法则**。

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1
b: 1
caption: 标准正态密度，阴影部分为$\Prob(-1\le Z\le1)\approx0.683$。把阴影区间的两端拖到$\pm1.96$，就涵盖了$95\%$的概率，这正是[[statistics/confidence-intervals]]一章中置信区间所用的乘数。改变$\mu$会平移曲线而不改变其形状；改变$\sigma$会把曲线在水平方向拉伸、在竖直方向压扁，同时保持面积等于$1$。
:::

::: example 身高 {#ex-heights}
假设某人群中成年女性的身高（以厘米为单位）用$\Normal(165, 7^2)$来建模。求身高超过$175$ cm的比例、身高在$160$ cm到$175$ cm之间的比例，以及只有$5\%$的女性超过的那个身高。
::: solution
用[[#eq-standardise]]进行标准化：$175$ cm对应于$z = (175-165)/7 = 10/7\approx1.43$，所以

$$
\Prob(X>175) = 1 - \Phi(10/7)\approx 1 - 0.9234 = 0.0766,
$$

约为$7.7\%$。类似地，$160$ cm对应于$z = -5/7\approx-0.71$，并且$\Prob(160<X<175) = \Phi(10/7) - \Phi(-5/7)\approx0.9234 - 0.2375 = 0.686$。最后一问需要第$95$百分位数：$\Phi(z) = 0.95$时$z\approx1.645$，所以这个身高为$165 + 1.645\times7\approx176.5$ cm。
:::
:::

::: quiz
若$X\sim\Normal(50, 10^2)$，下列哪个表达式等于$\Prob(X\le 70)$？
- [ ] $\Phi(70)$
- [ ] $\Phi(20)$
- [x] $\Phi(2)$
- [ ] $\Phi(0.2)$
::: solution
标准化后，$\Prob(X\le70) = \Prob\bigl(Z\le\frac{70-50}{10}\bigr) = \Phi(2)\approx0.977$。值$70$位于均值上方两个标准差处。注意$\Normal(50, 10^2)$中的第二个参数是**方差**；标准差是$10$。
:::
:::

## 随机变量的函数 {#transformations}

若$X$的分布已知，$Y = g(X)$的分布是什么？最可靠的方法是先求$Y$的分布函数——把$\{Y\le y\}$表示为关于$X$的事件——然后求导。

::: example 标准正态变量的平方 {#ex-chi-square}
设$Z\sim\Normal(0,1)$，$Y = Z^2$。求$Y$的密度。
::: solution
当$y\le0$时，$F_Y(y) = 0$。当$y>0$时，

$$
F_Y(y) = \Prob(Z^2\le y) = \Prob(-\sqrt y\le Z\le\sqrt y) = \Phi(\sqrt y) - \Phi(-\sqrt y) = 2\Phi(\sqrt y) - 1.
$$

用链式法则求导（$\Phi' = \varphi$是连续的），得

$$
f_Y(y) = 2\varphi(\sqrt y)\cdot\frac{1}{2\sqrt y} = \frac{1}{\sqrt{2\pi y}}e^{-y/2}\qquad(y>0).
$$

这就是**自由度为1的卡方分布**，它在[[statistics/sampling]]一章中起着核心作用。注意当$y\to0^+$时$f_Y(y)\to\infty$：密度可以是无界的，只要它的积分为$1$。
:::
:::

::: example 把木棍折断一次 {#ex-stick-once}
把一根长为$1$的木棍在一个均匀随机的点$U$处折断。设$L = \max(U, 1-U)$为较长一段的长度。求$L$的分布、它的均值，以及较短一段与较长一段之比的期望。
::: solution
$L$取值于$[\tfrac12, 1]$。对$\tfrac12\le x\le1$，较长一段的长度不超过$x$，当且仅当两段的长度都不超过$x$，即$U\le x$且$1 - U\le x$：

$$
F_L(x) = \Prob(1 - x\le U\le x) = x - (1-x) = 2x - 1 .
$$

所以在$[\tfrac12,1]$上$f_L(x) = 2$：$L\sim\operatorname{U}(\tfrac12,1)$，并且$\E L = \tfrac34$。较短的一段为$S = 1 - L$，$\E S = \tfrac14$。由[[#eq-lotus-cont]]，

$$
\E\Bigl(\frac SL\Bigr) = \int_{1/2}^1\frac{1-x}{x}\cdot2\,dx = 2\Bigl[\ln x - x\Bigr]_{1/2}^1 = 2\ln2 - 1\approx0.386,
$$

它**不**等于$\E S/\E L = \tfrac13$。比值的期望不等于期望的比值。
:::
:::

当$g$严格单调时，这一计算可以一劳永逸地完成。

::: theorem 密度的变量替换 {#thm-change-variables}
设$X$的密度为$f_X$，并设对某个开区间$I$有$\Prob(X\in I) = 1$。设$g\colon I\to\R$严格单调且连续可导，在$I$上$g'(x)\neq0$，并设$h = g^{-1}$是它的反函数，定义在区间$g(I)$上。则$Y = g(X)$的密度为

$$
f_Y(y) = f_X\bigl(h(y)\bigr)\,\lvert h'(y)\rvert\quad(y\in g(I)),\qquad f_Y(y) = 0 \text{（其他情形）}.
$$ {#eq-change-variables}
:::

::: proof
先设$g$递增，并设$\alpha$是$g(I)$的左端点（可能为$-\infty$）。对$y\in g(I)$，事件$\{g(X)\le y\}$等于$\{X\le h(y)\}$（至多相差概率为$0$的事件$X\notin I$），所以作代换$x = h(u)$，$dx = h'(u)\,du$，得

$$
F_Y(y) = \int_{-\infty}^{h(y)}f_X(x)\,dx = \int_\alpha^y f_X\bigl(h(u)\bigr)h'(u)\,du .
$$

这里$h' > 0$，所以被积函数就是$f_X(h(u))\lvert h'(u)\rvert$；由于$F_Y$是这个函数的积分（在$g(I)$左侧$F_Y = 0$，在其右侧$F_Y = 1$），这个函数就是$Y$的一个密度。若$g$递减，则$\{g(X)\le y\} = \{X\ge h(y)\}$，同样的代换给出$F_Y(y) = \int_\alpha^y f_X(h(u))\,(-h'(u))\,du$，此时$-h' = \lvert h'\rvert > 0$。
:::

因子$\lvert h'(y)\rvert$反映了伸缩：在$g$把一段$x$值的区间展开到一段更长的$y$值区间的地方，每单位长度上的概率就会降低。对于线性映射$Y = a + bX$（$b\ne0$），$h(y) = (y-a)/b$，并且

$$
f_Y(y) = \frac{1}{\lvert b\rvert}f_X\Bigl(\frac{y-a}{b}\Bigr).
$$

取$X = Z$为标准正态变量，$a = \mu$，$b = \sigma$，这正是$\Normal(\mu,\sigma^2)$的密度，从而证明了关于[[#eq-standardise]]的论断。

把这个定理应用于$Y = e^X$，其中$X\sim\Normal(\mu,\sigma^2)$（于是$h(y) = \ln y$，$h'(y) = 1/y$），就得到$y>0$上的**对数正态**密度$f_Y(y) = \dfrac{1}{y\sigma\sqrt{2\pi}}\exp\bigl(-(\ln y-\mu)^2/(2\sigma^2)\bigr)$。对数正态模型适用于由许多微小的**乘性**效应产生的量，例如收入、颗粒大小和股价。

::: widget distribution
dist: lognormal
params: mu=0, sigma=0.5
caption: $Y = e^X$（其中$X\sim\Normal(\mu,\sigma^2)$）的对数正态密度。指数映射拉伸了正态曲线的右半部分，压缩了左半部分，从而产生一条长长的右尾。增大$\sigma$，观察偏度的增大：均值$e^{\mu+\sigma^2/2}$（见习题）越来越远地位于中位数$e^{\mu}$的右侧。
:::

最后介绍一个几乎是所有模拟之基础的定理：每个连续分布都可以由一个均匀随机数制造出来。

::: theorem 逆变换抽样 {#thm-inverse-transform}
设$F$是一个连续的分布函数，并且在区间$J = \{x : 0 < F(x) < 1\}$上严格递增；设$F^{-1}\colon(0,1)\to J$是它在该区间上的反函数。

1. 若$U\sim\operatorname{U}(0,1)$，则$X = F^{-1}(U)$的分布函数为$F$。
2. 反之，若$X$的分布函数为$F$，则$F(X)\sim\operatorname{U}(0,1)$。
:::

::: proof
(1) $X$取值于$J$。对$x\in J$，由于$F$在$J$上严格递增，$F^{-1}(U)\le x$当且仅当$U\le F(x)$；因此$\Prob(X\le x) = \Prob(U\le F(x)) = F(x)$，因为对$u\in[0,1]$有$\Prob(U\le u) = u$。对$J$左侧的$x$，$F(x) = 0 = \Prob(X\le x)$；对$J$右侧的$x$，$F(x) = 1 = \Prob(X\le x)$。

(2) 对$u\in(0,1)$，$F(X)\le u$当且仅当$X\le F^{-1}(u)$，至多相差事件$X\notin J$，而由于$F$连续，这个事件的概率为零。因此$\Prob(F(X)\le u) = F\bigl(F^{-1}(u)\bigr) = u$，这正是均匀分布的分布函数。
:::

例如，指数分布函数$F(x) = 1 - e^{-\lambda x}$的反函数为$F^{-1}(u) = -\ln(1-u)/\lambda$，所以$-\ln(1-U)/\lambda\sim\operatorname{Exp}(\lambda)$；由于$1 - U$也是均匀的，$-\ln U/\lambda$同样可用。第(2)部分称为**概率积分变换**，[[statistics/hypothesis-testing#thm-p-uniform]]用它来证明：当原假设成立时，p 值服从均匀分布。

::: quiz
设$U\sim\operatorname{U}(0,1)$。$Y = 3U + 2$服从什么分布？
- [ ] $\operatorname{U}(0, 3)$
- [x] $\operatorname{U}(2, 5)$
- [ ] $\operatorname{U}(2, 3)$
- [ ] 不是均匀分布：密度变为原来的$3$倍
::: solution
由[[#thm-change-variables]]，取$h(y) = (y-2)/3$，得$f_Y(y) = \tfrac13 f_U\bigl(\tfrac{y-2}{3}\bigr)$，它在$2\le y\le5$时为$\tfrac13$，其他情形为$0$：这正是$\operatorname{U}(2,5)$的密度。拉伸$3$倍使密度**缩小**$3$倍，从而使面积保持为$1$。
:::
:::

::: history
正态曲线最早出现在1733年，当时亚伯拉罕·棣莫弗（Abraham de Moivre）发现它是试验次数很多时二项概率的近似；他把这一结果收入了《机会学说》（*The Doctrine of Chances*）的第二版（1738）。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在《天体运动论》（*Theoria motus corporum coelestium*，1809）中结合最小二乘法，把正态律作为观测误差的分布推导出来；而皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）1810年的中心极限定理解释了它为什么会如此频繁地出现。19世纪30年代和40年代，阿道夫·凯特勒（Adolphe Quetelet）把这条曲线应用于人体测量数据，例如士兵的胸围。“正态”（normal）这个名称在19世纪后期通过弗朗西斯·高尔顿（Francis Galton）和卡尔·皮尔逊（Karl Pearson）而得到普遍使用；皮尔逊后来评论说，这个名称避免了在高斯与拉普拉斯之间的优先权问题上偏袒任何一方，但它有一个缺点，就是暗示其他分布都是“不正常的”（abnormal）。放射性衰变的指数律是欧内斯特·卢瑟福（Ernest Rutherford）和弗雷德里克·索迪（Frederick Soddy）在1902—1903年间确立的。
:::

## 后续内容 {#where-next}

多个连续型随机变量放在一起时由联合密度描述，这是[[probability/joint-distributions]]一章的主题，在那里我们还将求出$X+Y$这类和的分布。[[probability/expectation]]一章中的矩母函数提供了一种识别分布的优雅方法，例如识别正态变量之和的分布。正态分布将作为中心极限定理中的普适极限再次出现（[[probability/limit-theorems]]）；而[[#ex-chi-square]]中的卡方分布及其“近亲”$t$分布和$F$分布，构成了[[statistics/sampling]]一章的骨干。

::: summary
- 每个随机变量都有分布函数$F_X(x) = \Prob(X\le x)$：它单调不减、右连续，从$0$增加到$1$，恰好在具有正概率的取值处跳跃。
- 连续型随机变量有密度$f_X\ge0$，满足$\Prob(a<X\le b) = \int_a^bf_X$；单点的概率为$0$，$f_X(x)$是每单位长度上的概率，而不是概率。
- $\E X = \int xf_X(x)\,dx$，$\E g(X) = \int g(x)f_X(x)\,dx$，方差的运算法则与离散情形相同。
- $\operatorname{U}(a,b)$：均值为$\tfrac{a+b}2$，方差为$\tfrac{(b-a)^2}{12}$。$\operatorname{Exp}(\lambda)$：$\Prob(X>x) = e^{-\lambda x}$，均值为$1/\lambda$，方差为$1/\lambda^2$，它是唯一具有无记忆性的连续分布。
- $\Normal(\mu,\sigma^2)$：用$Z = (X-\mu)/\sigma$标准化，再利用$\Phi$；约有$68\%$、$95\%$和$99.7\%$的概率分别落在$1$个、$2$个和$3$个标准差的范围之内。
- 要求$g(X)$的分布，就计算$\Prob(g(X)\le y)$再求导；对单调的$g$，$f_Y(y) = f_X(h(y))\lvert h'(y)\rvert$，其中$h = g^{-1}$。
- 当$U$服从均匀分布时，$F^{-1}(U)$的分布函数为$F$；而$F(X)$服从均匀分布：这是模拟和 p 值的基础。
:::

## 习题

::: exercise 三角形密度 {level=1 check="1/4"}
$X$的密度为：当$0\le x\le1$时$f(x) = 2x$（其他情形为$0$）。求$\Prob(X\le\tfrac12)$和$\E X$；请填写这个概率。
::: solution
$\Prob(X\le\tfrac12) = \int_0^{1/2}2x\,dx = \tfrac14$，$\E X = \int_0^1 2x^2\,dx = \tfrac23$。
:::
:::

::: exercise 元件的寿命 {level=1 check="exp(-1.5)"}
某元件的寿命服从均值为$2$年的指数分布。求它的寿命超过$3$年的概率。
::: solution
速率为每年$\lambda = 1/2$，所以$\Prob(T>3) = e^{-3/2}\approx0.223$。
:::
:::

::: exercise 均匀分布的方差 {level=1 check="25/3"}
求$\operatorname{U}(0,10)$随机变量的方差。
::: solution
$\Var X = (10-0)^2/12 = 100/12 = 25/3\approx8.33$。
:::
:::

::: exercise 抛物线形密度的方差 {level=2 check="1/5"}
对[[#ex-density-constant]]中$[-1,1]$上的密度$f(x) = \tfrac34(1-x^2)$，求$\Var X$。
::: solution
由对称性$\E X = 0$，所以$\Var X = \E X^2 = \dfrac34\displaystyle\int_{-1}^1(x^2 - x^4)\,dx = \dfrac34\Bigl(\dfrac23 - \dfrac25\Bigr) = \dfrac34\cdot\dfrac{4}{15} = \dfrac15$。
:::
:::

::: exercise 智商分数 {level=2}
智商分数被设计为近似服从$\Normal(100, 15^2)$。求智商高于$130$的人所占的比例，以及处于前$10\%$的分数线。
::: solution
$\Prob(X>130) = 1 - \Phi\bigl(\tfrac{130-100}{15}\bigr) = 1 - \Phi(2)\approx0.0228$，约为$2.3\%$。前$10\%$从第$90$百分位数开始：$\Phi(z) = 0.9$时$z\approx1.2816$，所以分数线为$100 + 1.2816\times15\approx119.2$。
:::
:::

::: exercise 指数分布的中位数 {level=2 check="2*ln(2)"}
求$\operatorname{Exp}(\lambda)$分布的中位数$m$（即满足$\Prob(X\le m) = \tfrac12$的值），并计算$\lambda = 0.5$时它的值。中位数比均值小还是大？
::: solution
由$1 - e^{-\lambda m} = \tfrac12$得$m = \ln2/\lambda$。当$\lambda = 0.5$时，$m = 2\ln2\approx1.386$。由于$\ln2\approx0.693 < 1$，中位数小于均值$1/\lambda$：长长的右尾把均值拉高了。
:::
:::

::: exercise 从均匀分布到指数分布 {level=2}
设$U\sim\operatorname{U}(0,1)$，$Y = -\ln U$。利用[[#thm-change-variables]]证明$Y\sim\operatorname{Exp}(1)$。
::: solution
在$I = (0,1)$上，$g(u) = -\ln u$严格递减且可导，$g(I) = (0,\infty)$，反函数为$h(y) = e^{-y}$，$h'(y) = -e^{-y}$。因此当$y>0$时$f_Y(y) = f_U(e^{-y})\,\lvert -e^{-y}\rvert = 1\cdot e^{-y}$，当$y\le0$时$f_Y(y) = 0$。这正是$\operatorname{Exp}(1)$的密度。（这就是[[#thm-inverse-transform]]的一个实际应用。）
:::
:::

::: exercise 正态变量绝对值的均值 {level=3 check="sqrt(2/pi)"}
设$Z\sim\Normal(0,1)$。求$\E\lvert Z\rvert$。
::: solution
由对称性并作代换$u = z^2/2$，

$$
\E\lvert Z\rvert = 2\int_0^\infty z\frac{e^{-z^2/2}}{\sqrt{2\pi}}\,dz = \frac{2}{\sqrt{2\pi}}\int_0^\infty e^{-u}\,du = \sqrt{\frac2\pi}\approx0.798 .
$$

所以到均值的平均距离约为$0.8$个标准差。
:::
:::

::: exercise 对数正态分布的均值 {level=3}
设$X\sim\Normal(\mu,\sigma^2)$。证明$\E\,e^X = e^{\mu+\sigma^2/2}$。（因此对数正态分布的均值大于其中位数$e^\mu$。）
::: hint
写成$X = \mu + \sigma Z$，并对指数配方。
:::
::: solution
由$X = \mu+\sigma Z$得$\E e^X = e^\mu\,\E e^{\sigma Z}$，而

$$
\E e^{\sigma Z} = \int_{-\infty}^\infty e^{\sigma z}\frac{e^{-z^2/2}}{\sqrt{2\pi}}\,dz = e^{\sigma^2/2}\int_{-\infty}^\infty\frac{e^{-(z-\sigma)^2/2}}{\sqrt{2\pi}}\,dz = e^{\sigma^2/2},
$$

这是因为$\sigma z - z^2/2 = \sigma^2/2 - (z-\sigma)^2/2$，而最后一个被积函数是$\Normal(\sigma, 1)$的密度，其积分为$1$。因此$\E e^X = e^{\mu+\sigma^2/2}$。$e^X$的中位数是$e^\mu$，因为$e^x$递增，而$X$的中位数是$\mu$；均值比中位数大，相差因子$e^{\sigma^2/2}>1$。
:::
:::

::: exercise 指数变量的向上取整 {level=3}
设$X\sim\operatorname{Exp}(\lambda)$，$N = \lceil X\rceil$为$X$向上取整所得的整数。证明$N\sim\operatorname{Geom}(p)$，其中$p = 1 - e^{-\lambda}$。（几何分布是指数分布的“离散影子”。）
::: solution
$N$取值于$\{1, 2, \ldots\}$（以概率$1$，因为$\Prob(X = 0) = 0$且$X<\infty$），并且对整数$k\ge 0$，$N > k$当且仅当$X > k$。因此

$$
\Prob(N>k) = \Prob(X>k) = e^{-\lambda k} = (e^{-\lambda})^k = (1-p)^k .
$$

这正是$\operatorname{Geom}(p)$分布的尾概率（[[probability/discrete-random-variables]]），而尾概率通过$\Prob(N = k) = \Prob(N>k-1) - \Prob(N>k) = (1-p)^{k-1}p$决定了概率质量函数。
:::
:::
