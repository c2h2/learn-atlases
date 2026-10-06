把一枚均匀的硬币抛掷$10\,000$次。你不会恰好得到$5000$次正面（这种情况的概率不到$1\%$），但几乎可以肯定，正面出现的比例会接近$\tfrac12$。更精确地说，正面次数以约$0.955$的概率落在$4900$与$5100$之间，而在$16\,000$次这样的试验中，落在$4800$到$5200$之外的情况还不到一次。偶然性就单次抛掷而言难以捉摸，在总体上却变得几乎完全可以预测。正因为如此，赌场和保险公司才能有把握地制订计划，对一千人的民意调查才能反映数百万人的情况，对重复测量取平均才能减小误差。

有两个定理把这一点精确化了。**大数定律**指出，许多独立观测值的平均值收敛于它们的期望值。**中心极限定理**描述了围绕这一极限的波动：波动的大小为$\sigma/\sqrt n$，其分布近似为正态分布，**无论单个观测值服从什么分布**。这两个定理共同构成了统计学的基础。我们先介绍两个对大偏差的概率给出上界的简单不等式，用它们证明弱大数定律，叙述并部分证明强大数定律，然后利用[[probability/expectation]]一章中的矩母函数证明中心极限定理。

## 马尔可夫不等式与切比雪夫不等式 {#inequalities}

如果我们只知道一个随机变量的均值，或者只知道它的均值和方差，那么关于它远离典型值的概率，我们能说些什么呢？能说的出人意料地多。

::: theorem 马尔可夫不等式 {#thm-markov}
若$X\ge0$，$a>0$，则

$$
\Prob(X\ge a)\le\frac{\E X}{a}.
$$
:::

::: proof
把$X$与随机变量$a\mathbf{1}_{\{X\ge a\}}$作比较：当$X\ge a$时后者等于$a$，否则等于$0$。在第一种情形，$X\ge a$；在第二种情形，$X\ge0$。所以总有$a\mathbf{1}_{\{X\ge a\}}\le X$，取数学期望（数学期望保持不等式，这只需对非负的差应用线性性）即得$a\,\Prob(X\ge a)\le\E X$。
:::

例如，如果一个国家的平均收入是30000英镑，那么收入在300000英镑及以上的人至多占总人口的十分之一——否则仅这些人就会把平均值推高到30000英镑以上。马尔可夫不等式要求$X\ge0$：没有这个条件，以小概率取一个巨大的负值，就可以抵消以大概率取较大的值。

对非负随机变量$(X-\mu)^2$应用马尔可夫不等式，就得到一个用方差表示的上界。

::: theorem 切比雪夫不等式 {#thm-chebyshev}
若$X$的均值为$\mu$，方差$\sigma^2$有限，则对每个$\eps>0$，

$$
\Prob\bigl(\lvert X-\mu\rvert\ge\eps\bigr)\le\frac{\sigma^2}{\eps^2}.
$$ {#eq-chebyshev}

等价地，取$\eps = k\sigma$，得$\Prob(\lvert X-\mu\rvert\ge k\sigma)\le1/k^2$。
:::

::: proof
事件$\{\lvert X-\mu\rvert\ge\eps\}$与$\{(X-\mu)^2\ge\eps^2\}$相同。对$(X-\mu)^2\ge0$取$a = \eps^2$应用马尔可夫不等式，得

$$
\Prob\bigl((X-\mu)^2\ge\eps^2\bigr)\le\frac{\E(X-\mu)^2}{\eps^2} = \frac{\sigma^2}{\eps^2}.
$$
:::

切比雪夫不等式对**每一个**方差有限的分布都成立，这使得它对任何特定的分布来说都很粗糙。把它给出的上界与正态分布的精确值比较一下：

| $k$ | $1.5$ | $2$ | $3$ |
|---|---|---|---|
| $\Prob(\lvert X-\mu\rvert\ge k\sigma)$的切比雪夫上界 | $0.444$ | $0.250$ | $0.111$ |
| $X$服从正态分布时的精确值 | $0.134$ | $0.046$ | $0.003$ |

然而，如果没有进一步的假设，这个上界是不能改进的：若$X$分别以概率$\frac{1}{2k^2}$取$\pm k$，其余情形下$X = 0$，则$\mu = 0$，$\sigma = 1$，且恰好有$\Prob(\lvert X\rvert\ge k) = 1/k^2$。

::: quiz
某随机变量的均值为$100$，标准差为$10$，除此之外对它一无所知。切比雪夫不等式给出的$\Prob(70<X<130)$的最佳下界是多少？
- [ ] $0.997$
- [x] $\tfrac89\approx0.889$
- [ ] $\tfrac23$
- [ ] $\tfrac13$
::: solution
这个区间是$\mu\pm3\sigma$，所以$\Prob(\lvert X-\mu\rvert\ge30)\le\tfrac19$，$\Prob(70<X<130)\ge\tfrac89$。值$0.997$对**正态**随机变量是正确的，但在不知道分布的情况下，我们只有切比雪夫不等式提供的保证。
:::
:::

## 大数定律 {#lln}

设$X_1, X_2, \ldots$是具有共同分布的独立随机变量——即**独立同分布**（independent and identically distributed，简记为iid）的随机变量——其均值为$\mu$，方差为$\sigma^2$。可以把它们看作对同一个量的重复测量。记

$$
S_n = X_1+\dots+X_n,\qquad\bar X_n = \frac{S_n}{n}
$$

分别为前$n$个变量的和与**样本均值**。由线性性，$\E\bar X_n = \mu$；又由于独立随机变量的方差相加（[[probability/joint-distributions#thm-covariance]]），

$$
\Var\bar X_n = \frac{1}{n^2}\Var S_n = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}.
$$ {#eq-var-mean}

平均值的标准差为$\sigma/\sqrt n$：对$100$次测量取平均，误差就变为原来的$10$分之一。要说$\bar X_n$“收敛”于$\mu$，我们需要一个关于随机变量的收敛概念。

::: definition 依概率收敛 {#def-conv-prob}
称随机变量序列$Y_n$**依概率收敛**于常数$c$，记作$Y_n\xrightarrow{\;\Prob\;}c$，如果对每个$\eps>0$，

$$
\Prob\bigl(\lvert Y_n - c\rvert\ge\eps\bigr)\to0\qquad(n\to\infty).
$$
:::

::: theorem 弱大数定律 {#thm-wlln}
设$X_1,X_2,\ldots$独立同分布，均值为$\mu$，方差$\sigma^2$有限。则$\bar X_n\xrightarrow{\;\Prob\;}\mu$；事实上，对每个$\eps>0$，

$$
\Prob\bigl(\lvert\bar X_n-\mu\rvert\ge\eps\bigr)\le\frac{\sigma^2}{n\eps^2}.
$$ {#eq-wlln-bound}
:::

::: proof
由[[#eq-var-mean]]，$\bar X_n$的均值为$\mu$，方差为$\sigma^2/n$，对它应用切比雪夫不等式即可。对每个固定的$\eps$，当$n\to\infty$时这个上界趋于$0$。
:::

证明中只用到了各$X_i$互不相关且具有共同的均值和方差，所以定理在这一较弱的假设下也成立。（多花些功夫，还可以去掉方差有限的假设：只要$\E\lvert X_1\rvert<\infty$就够了。）最重要的特殊情形，正是促使雅各布·伯努利（Jacob Bernoulli）展开研究的那一个。

::: corollary 伯努利大数定律 {#cor-bernoulli}
在一个试验的$n$次独立重复中，设$N_n(A)$为事件$A$发生的次数。则相对频率$N_n(A)/n$依概率收敛于$\Prob(A)$。
:::

::: proof
$N_n(A)/n$是各次试验的独立同分布示性变量$\mathbf{1}_A$的样本均值，这些示性变量的均值为$\Prob(A)$，方差为$\Prob(A)(1-\Prob(A))\le\tfrac14$。应用[[#thm-wlln]]即可。
:::

这就使始于[[probability/probability-spaces]]一章的论证形成了一个闭环：我们曾用相对频率的性态来引出公理，而现在公理**证明**了相对频率收敛于概率。

::: widget lln
experiment: coin
trials: 2000
runs: 5
caption: 五组相互独立的模拟，每组抛掷硬币$2000$次，各自显示正面比例随抛掷次数的变化。起初各条路径大幅游走；后来它们以约$1/\sqrt n$的速率被挤向$\tfrac12$。再运行一次：每次的路径都不同，但约束它们的漏斗形状总是一样的。
:::

::: example 需要抛掷多少次？ {#ex-how-many}
根据上界[[#eq-wlln-bound]]，抛掷一枚均匀的硬币多少次，才能保证正面比例以至少$0.95$的概率落在$\tfrac12$的$0.01$范围之内？
::: solution
这里$\sigma^2 = \tfrac14$，$\eps = 0.01$，我们需要$\dfrac{1/4}{n(0.01)^2}\le0.05$，即$n\ge\dfrac{0.25}{0.05\times0.0001} = 50\,000$。切比雪夫不等式完全没有利用分布的形状，所以这个结果非常保守；后面的中心极限定理将表明，实际上大约$9600$次就够了。
:::
:::

::: warning 大数定律并不会“抵消”偏差
在正面出现得偏多之后，大数定律**并没有**说反面会变得更容易出现以恢复平衡——独立的抛掷没有记忆（[[probability/discrete-random-variables]]）。正面比例收敛于$\tfrac12$，是因为早期的偏差被不断增加的抛掷次数**淹没**了，而不是因为它们得到了纠正。事实上，正面次数与$n/2$之差通常会增大，其量级为$\sqrt n$；只有这个差**除以$n$**之后才会缩小。抛掷$10\,000$次后，正面多出$50$次是完全正常的；抛掷一百万次后，多出$500$次也是如此。
:::

::: quiz
一枚均匀的硬币在前$1000$次抛掷中出现了$520$次正面。抛掷总共$2000$次后，正面次数的期望是多少？
- [ ] $1000$，因为大数定律会纠正多出的部分
- [x] $1020$
- [ ] $980$，因为现在该轮到反面了
- [ ] 不知道前$1000$次结果的顺序就无法计算
::: solution
后$1000$次抛掷与前$1000$次独立，平均贡献$500$次正面，所以总数的期望为$520 + 500 = 1020$。多出的$20$次正面并没有被消除——但期望的**比例**从$0.52$降到了$0.51$，因为现在多出的部分要除以$2000$。大数定律就是这样起作用的。
:::
:::

弱大数定律说的是：对每个大的$n$，$\bar X_n$出现大偏差的可能性很小。一个更强的论断是：以概率$1$，整个平均值序列收敛。

::: definition 几乎必然收敛 {#def-as}
若$\Prob\bigl(Y_n\to c\text{ 当 }n\to\infty\bigr) = 1$，则称$Y_n$**几乎必然**收敛于$c$。
:::

::: theorem 强大数定律 {#thm-slln}
若$X_1,X_2,\ldots$独立同分布，$\E\lvert X_1\rvert<\infty$，均值为$\mu$，则几乎必然有$\bar X_n\to\mu$。
:::

::: proof
我们在附加假设$\E X_1^4<\infty$下证明这个定理；一般情形归功于柯尔莫哥洛夫（Kolmogorov），需要用到截断论证，可以在格里米特（Grimmett）与斯特扎克（Stirzaker）的书的第7章中找到。用$X_i-\mu$代替$X_i$，可以假设$\mu = 0$。展开

$$
\E S_n^4 = \sum_{i,j,k,l}\E(X_iX_jX_kX_l).
$$

由独立性和$\E X_i = 0$，凡是有某个指标恰好出现一次的项都为零。剩下的是$n$个形如$\E X_i^4$的项，以及满足$i\ne j$的形如$\E(X_i^2X_j^2) = \sigma^4$的项，后者共有$3n(n-1)$个（把四个位置分成两对，有$3$种分法，再选一个由不同指标组成的有序对）。所以对某个常数$C$，$\E S_n^4 = n\E X_1^4 + 3n(n-1)\sigma^4\le Cn^2$。对$S_n^4$应用马尔可夫不等式，对每个$\eps>0$，

$$
\Prob(\lvert\bar X_n\rvert\ge\eps) = \Prob\bigl(S_n^4\ge n^4\eps^4\bigr)\le\frac{Cn^2}{n^4\eps^4} = \frac{C}{\eps^4n^2}.
$$

这些概率对$n$求和是有限的。现在利用**博雷尔-坎泰利（Borel–Cantelli）引理**：若事件$A_n$满足$\sum_n\Prob(A_n)<\infty$，则以概率$1$，其中只有有限多个发生。（证明：有无穷多个发生这一事件，对每个$m$都包含在$\bigcup_{n\ge m}A_n$中，由并集上界，后者的概率至多为$\sum_{n\ge m}\Prob(A_n)\to0$。）因此，对每个$\eps>0$，以概率$1$，对所有充分大的$n$都有$\lvert\bar X_n\rvert<\eps$。对$\eps = 1, \tfrac12, \tfrac13, \ldots$应用这一结论，并取这可数多个概率为$1$的事件之交（交的概率仍为$1$），就得到几乎必然有$\bar X_n\to0$。
:::

强大数定律正是**蒙特卡罗方法**的依据：要估计积分$I = \int_0^1g(x)\,dx$，可以生成独立同分布的均匀随机数$U_1,U_2,\ldots$，然后对$g(U_i)$取平均。由于$\E g(U_i) = I$，这些平均值收敛于$I$；由[[#eq-var-mean]]，取$n$个样本后的误差通常约为$\sigma_g/\sqrt n$，其中$\sigma_g$是$g(U)$的标准差。

::: widget montecarlo
mode: integral
f: exp(-x^2)
a: 0
b: 1
n: 1000
caption: 用蒙特卡罗方法估计$\int_0^1e^{-x^2}\,dx\approx0.7468$。这里$\sigma_g\approx0.20$，所以用$n = 1000$个点时，样本均值法的估计值（即上文所述的诸$g(U_i)$的平均值）与真值之差通常在$0.006$左右以内；投点法通过数曲线下方的点来估计，其估计值没有那么准确。多运行几次，把样本均值法估计值的分散程度与这一预测作比较；然后把$n$乘以$4$，验证典型误差减半。
:::

## 依分布收敛与中心极限定理 {#clt}

大数定律告诉我们$\bar X_n - \mu\to0$；[[#eq-var-mean]]说明这个差的量级为$\sigma/\sqrt n$。为了看清它的**形状**，我们把它放大$\sqrt n/\sigma$倍，构成**标准化和**

$$
Z_n = \frac{S_n - n\mu}{\sigma\sqrt n} = \frac{\bar X_n-\mu}{\sigma/\sqrt n},
$$

对每个$n$，它的均值都是$0$，方差都是$1$。令人惊奇的事实是：无论$X_i$服从什么分布，$Z_n$的分布都趋于同一个极限。

::: definition 依分布收敛 {#def-conv-dist}
如果在$F_Y$的每个连续点$x$处都有$F_{Y_n}(x)\to F_Y(x)$，则称随机变量$Y_n$**依分布收敛**于$Y$，记作$Y_n\xrightarrow{\;d\;}Y$。
:::

（之所以要限制在连续点上，是为了使诸如常数$1/n$依分布收敛于常数$0$这样的情形成立，尽管$F_{1/n}(0) = 0$而$F_0(0) = 1$。当极限是正态分布时，$F_Y = \Phi$处处连续。）

::: theorem 中心极限定理 {#thm-clt}
设$X_1,X_2,\ldots$独立同分布，均值为$\mu$，方差$\sigma^2>0$有限。则$Z_n = (S_n-n\mu)/(\sigma\sqrt n)\xrightarrow{\;d\;}\Normal(0,1)$；也就是说，对每个$x\in\R$，

$$
\Prob\Bigl(\frac{S_n - n\mu}{\sigma\sqrt n}\le x\Bigr)\longrightarrow\Phi(x)\qquad(n\to\infty).
$$ {#eq-clt}
:::

在实践中，这个定理被用作一种近似：当$n$很大时，$S_n$近似服从$\Normal(n\mu, n\sigma^2)$，$\bar X_n$近似服从$\Normal(\mu,\sigma^2/n)$。

我们在各$X_i$有矩母函数这一附加假设下证明这个定理。证明依赖于一个我们不加证明地叙述的结果。

::: theorem 矩母函数的连续性定理 {#thm-continuity-mgf}
设$Y_n$与$Y$都有矩母函数，并且对某个区间$(-h,h)$中的每个$t$都有$M_{Y_n}(t)\to M_Y(t)$。则$Y_n\xrightarrow{\;d\;}Y$。
:::

（这一定理属于柯蒂斯（J. H. Curtiss，1942年）；它的证明以及关于特征函数的类似定理，可以在比林斯利（Billingsley）的《概率与测度》（Probability and Measure）以及格里米特与斯特扎克的书中找到。）我们还需要一个熟悉的极限：若实数$c_n\to c$，则

$$
\Bigl(1 + \frac{c_n}{n}\Bigr)^n\to e^c,
$$ {#eq-exp-limit}

这可以像[[probability/discrete-random-variables]]一章中泊松近似的证明那样得到：$n\ln(1 + c_n/n) = c_n\cdot\frac{\ln(1+c_n/n)}{c_n/n}\to c$（第二个因子趋于$1$；若$c_n = 0$，该项反正为$0$）。

::: proof
**在各$X_i$有矩母函数时中心极限定理的证明（一个细致的概要）。**令$Y_i = (X_i-\mu)/\sigma$，它们独立同分布，均值为$0$，方差为$1$；设$M$为它们共同的矩母函数，在某个$(-h,h)$上有限。由[[probability/expectation#thm-mgf]]，$M$在$0$附近可表示为一个收敛的幂级数，且$M(0) = 1$，$M'(0) = \E Y_i = 0$，$M''(0) = \E Y_i^2 = 1$。由泰勒定理，

$$
M(s) = 1 + \frac{s^2}{2} + r(s),\qquad\text{其中 } \frac{r(s)}{s^2}\to0\text{ 当 }s\to0 .
$$

而$Z_n = (Y_1+\dots+Y_n)/\sqrt n$，所以由矩母函数的乘积法则和伸缩法则，对每个固定的$t$以及所有大到使$\lvert t\rvert/\sqrt n<h$的$n$，

$$
M_{Z_n}(t) = M\Bigl(\frac{t}{\sqrt n}\Bigr)^n = \Bigl(1 + \frac{t^2}{2n} + r\Bigl(\frac{t}{\sqrt n}\Bigr)\Bigr)^n = \Bigl(1 + \frac{c_n}{n}\Bigr)^n,\qquad c_n = \frac{t^2}{2} + n\,r\Bigl(\frac{t}{\sqrt n}\Bigr).
$$

当$t\ne0$时，$n\,r(t/\sqrt n) = t^2\cdot\dfrac{r(t/\sqrt n)}{(t/\sqrt n)^2}\to t^2\cdot0 = 0$；当$t = 0$时它就是$0$。因此$c_n\to t^2/2$，由[[#eq-exp-limit]]，$M_{Z_n}(t)\to e^{t^2/2}$，这正是$\Normal(0,1)$的矩母函数。由连续性定理得$Z_n\xrightarrow{\;d\;}\Normal(0,1)$。

没有矩母函数的假设时，同样的论证可以对总是存在的特征函数$\E e^{itX}$进行；见格里米特与斯特扎克的书第5.10节。
:::

这个证明说明了正态分布**为什么**会出现：标准化之后，通过泰勒展开的前两项，只有$X_i$的均值和方差保留到了极限中；所有更高阶的特征（偏度、尾部的形状）都被因子$1/\sqrt n$冲刷掉了。

::: widget clt
dist: exponential
n: 5
samples: 2000
caption: $2000$个模拟样本均值（每个样本含$n$个指数分布观测值）的直方图，以及中心极限定理所预测的正态曲线。指数分布非常偏斜，$n = 1$或$2$时直方图也是如此；到$n = 30$时已接近钟形，尽管仍残留轻微的右偏。也试试双峰总体和骰子总体：起始形状截然不同，极限却相同。
:::

::: warning 中心极限定理说了什么，没说什么
这个定理讨论的是许多独立项的**和与平均值**，而不是单个观测值：$1000$个收入数据组成的样本并不会变成正态分布，但它的**均值**近似服从正态分布。定理需要**有限的方差**：$n$个独立的标准柯西随机变量的平均值与单个标准柯西随机变量同分布，所以它既不会集中，也不会变成正态的。此外，“$n\ge30$”只是经验法则，而不是定理：对于对称的总体，$n = 5$时近似效果就可能很好，而对于非常偏斜的总体（例如稀有事件的示性变量），可能需要数百个观测值。**贝里-埃森（Berry–Esseen）定理**对此给出了定量的刻画：[[#eq-clt]]中的误差至多为$C\,\E\lvert X_1-\mu\rvert^3/(\sigma^3\sqrt n)$，其中常数$C<0.48$。
:::

### 二项分布的正态近似

$\Bin(n,p)$随机变量是$n$个独立的伯努利随机变量之和，每个的均值为$p$、方差为$p(1-p)$，所以当$n$很大时，它近似服从$\Normal\bigl(np, np(1-p)\bigr)$。这一特殊情形由棣莫弗（de Moivre）对$p = \tfrac12$发现，后经拉普拉斯（Laplace）推广，称为**棣莫弗-拉普拉斯定理**。由于二项分布是离散的，可以用**连续性修正**来改进近似：把整数$k$的概率分摊到区间$[k-\tfrac12, k+\tfrac12]$上。

::: example 抛掷一百次 {#ex-hundred-tosses}
把一枚均匀的硬币抛掷$100$次。求至少出现$60$次正面的概率的近似值。
::: solution
$X\sim\Bin(100,\tfrac12)$的均值为$50$，标准差为$\sqrt{100\cdot\tfrac14} = 5$。作连续性修正，$\{X\ge60\} = \{X\ge59.5\}$，于是

$$
\Prob(X\ge60)\approx1 - \Phi\Bigl(\frac{59.5-50}{5}\Bigr) = 1 - \Phi(1.9)\approx0.0287 .
$$

精确的二项概率为$0.0284$。不作连续性修正，我们会得到$1-\Phi(2)\approx0.0228$，近似效果差得多。抛掷一百次出现六十次正面虽不寻常，但也并非异乎寻常：大约每$35$次尝试中出现一次。
:::
:::

::: example 一百颗骰子的总点数 {#ex-hundred-dice}
掷一百颗均匀的骰子。求总点数介于$330$与$370$之间（含两端）的概率的近似值。
::: solution
每颗骰子的均值为$\tfrac72$，方差为$\tfrac{35}{12}$，所以总点数$S$的均值为$350$，方差为$\tfrac{3500}{12}$，标准差为$17.08$。作连续性修正，

$$
\Prob(330\le S\le370)\approx\Phi\Bigl(\frac{370.5-350}{17.08}\Bigr) - \Phi\Bigl(\frac{329.5-350}{17.08}\Bigr) = 2\Phi(1.200) - 1\approx0.770 .
$$

用反复卷积算出的精确概率为$0.7697$。单颗骰子在六个值上均匀分布，与钟形曲线毫无相似之处，然而一百颗骰子的总点数却几乎完美地服从正态分布。
:::
:::

::: example 确定民意调查的样本量 {#ex-poll}
一项民意调查将用容量为$n$的随机样本中的比例$\hat p$来估计支持某政党的选民比例$p$。无论$p$是多少，$n$要多大才能使$\hat p$以约$0.95$的概率落在$p$的$3$个百分点之内？
::: solution
$\hat p$是$n$个参数为$p$的伯努利示性变量的均值，所以它的均值为$p$，标准差为$\sqrt{p(1-p)/n}\le\frac{1}{2\sqrt n}$，因为$p(1-p)\le\tfrac14$。由中心极限定理，$\Prob(\lvert\hat p - p\rvert<1.96\,\mathrm{sd})\approx0.95$。所以我们需要

$$
1.96\cdot\frac{1}{2\sqrt n}\le0.03,\qquad\text{即}\qquad n\ge\Bigl(\frac{1.96}{0.06}\Bigr)^2\approx1067.1,
$$

所以样本容量约为$1068$就够了。切比雪夫不等式则要求$n\ge\frac{1/4}{0.05\times0.03^2}\approx5556$。这就是为什么全国性的民意调查通常只访问一千人左右，而与总体的大小无关——（当总体比样本大得多时）总体的大小几乎没有影响。我们将在[[statistics/confidence-intervals#ex-poll-ci]]中再回到这个计算。
:::
:::

::: example 保险为什么行得通 {#ex-insurance}
一家保险公司售出$n$份相互独立的保单，每份保费550英镑。每份保单的索赔额均值为500英镑，标准差为2000英镑（大多数保单没有索赔，少数保单索赔很多）。对$n = 1000$和$n = 10\,000$，分别求总索赔额超过总保费的概率的近似值。
::: solution
总索赔额$S$的均值为$500n$，标准差为$2000\sqrt n$，总保费为$550n$。由中心极限定理，

$$
\Prob(S>550n)\approx1 - \Phi\Bigl(\frac{550n - 500n}{2000\sqrt n}\Bigr) = 1 - \Phi\Bigl(\frac{\sqrt n}{40}\Bigr).
$$

当$n = 1000$时，它等于$1-\Phi(0.79)\approx0.21$：大约每五年中有一年亏损。当$n = 10\,000$时，它等于$1 - \Phi(2.5)\approx0.006$。期望利润按$n$增长，而总额的标准差只按$\sqrt n$增长，所以足够大的独立风险池使亏损变得非常不可能。（在远尾部，这个近似较为粗糙；而且如果风险不独立，这一论证就不成立——一场洪水或一场大流行病会同时引起大量索赔。）
:::
:::

::: quiz
$X_1,\ldots,X_{48}$相互独立，且都在$[0,1]$上均匀分布。$S = X_1+\dots+X_{48}$近似服从什么分布？
- [ ] $[0, 48]$上的均匀分布
- [ ] $\Normal(24, 48)$
- [x] $\Normal(24, 4)$
- [ ] $\Normal(24, 16)$
::: solution
每个$X_i$的均值为$\tfrac12$，方差为$\tfrac1{12}$，所以$S$的均值为$24$，方差为$48\cdot\tfrac{1}{12} = 4$（标准差为$2$）。由中心极限定理，$S$近似服从$\Normal(24, 4)$。（早年的计算机就是把十二个均匀随机数相加再减去$6$来生成近似正态的随机数的，这样得到的均值为$0$，方差为$1$。）
:::
:::

::: history
雅各布·伯努利（Jacob Bernoulli）经过二十年的工作，在《猜度术》（Ars Conjectandi，1713年）中证明了第一个大数定律，即关于相对频率的大数定律；他称之为自己的“黄金定理”。亚伯拉罕·棣莫弗（Abraham de Moivre）于1733年发现了二项分布的正态近似，皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）于1810年把它推广到相当一般的独立误差之和。西梅翁-德尼·泊松（Siméon-Denis Poisson）于1837年创造了“大数定律”这一名称。伊雷内-朱尔·比奈梅（Irénée-Jules Bienaymé，1853年）和帕夫努季·切比雪夫（Pafnuty Chebyshev，1867年）发现了那个只用两行就能证明弱大数定律的不等式；切比雪夫的学生安德烈·马尔可夫（Andrey Markov）和亚历山大·李雅普诺夫（Aleksandr Lyapunov）把这一理论向前推进，李雅普诺夫1901年在一般条件下对中心极限定理的证明使用了特征函数，特征函数从此成为标准工具。亚尔·瓦尔德马·林德伯格（Jarl Waldemar Lindeberg）于1922年给出了一个精确的一般充分条件，而乔治·波利亚（George Pólya）于1920年把这一结果命名为“中心极限定理”（zentraler Grenzwertsatz），意思是它在概率论中处于中心地位。埃米尔·博雷尔（Émile Borel）于1909年对抛硬币证明了强大数定律，安德烈·柯尔莫哥洛夫（Andrey Kolmogorov）则对所有均值有限的独立同分布序列证明了它。
:::

## 后续内容 {#where-next}

中心极限定理是经典统计学的引擎。它解释了样本均值为什么近似服从正态分布（[[statistics/sampling]]），给出了[[statistics/confidence-intervals]]中的误差范围和[[statistics/hypothesis-testing]]中的z检验，并为最大似然估计量的大样本正态性提供了依据（[[statistics/estimation]]）。大数定律对相依序列也成立：对马尔可夫链，长期停留在某个状态的时间比例收敛于该状态的平稳概率（[[probability/markov-chains]]）。各种收敛方式（依概率收敛、几乎必然收敛、均方收敛）将在[[measure-theory/lp-spaces]]中系统地加以比较。

::: summary
- 马尔可夫不等式：对$X\ge0$，$\Prob(X\ge a)\le\E X/a$。切比雪夫不等式：$\Prob(\lvert X-\mu\rvert\ge\eps)\le\sigma^2/\eps^2$；它对每个分布都成立，因此对任何特定的分布都很粗糙。
- $n$个独立同分布观测值的样本均值的均值为$\mu$，标准差为$\sigma/\sqrt n$。
- 弱大数定律：$\bar X_n\to\mu$（依概率收敛），可由切比雪夫不等式证明；强大数定律：$\bar X_n\to\mu$（以概率$1$）。相对频率收敛于概率。
- 大数定律是通过淹没偏差而不是纠正偏差起作用的；赌徒谬误仍然是谬误。
- 中心极限定理：对任何方差有限的独立同分布序列，$(S_n - n\mu)/(\sigma\sqrt n)\to\Normal(0,1)$（依分布收敛）；所以当$n$很大时，$\bar X_n\approx\Normal(\mu,\sigma^2/n)$。
- 矩母函数证明：$M(t/\sqrt n)^n = (1 + t^2/(2n) + o(1/n))^n\to e^{t^2/2}$——只有均值和方差保留了下来。
- 计算二项概率时，用$\Normal(np, np(1-p))$并作连续性修正；方差有限是必不可少的（柯西分布就是一个反例）。
:::

## 习题

::: exercise 马尔可夫界 {level=1 check="1/4"}
某非负随机变量的均值为$5$。马尔可夫不等式给出的$\Prob(X\ge20)$的最佳上界是多少？
::: solution
$\Prob(X\ge20)\le5/20 = \tfrac14$。
:::
:::

::: exercise 切比雪夫界 {level=1 check="3/4"}
$X$的均值为$50$，标准差为$5$。给出切比雪夫不等式所提供的$\Prob(40<X<60)$的最佳下界。
::: solution
这个区间是$\mu\pm2\sigma$，所以$\Prob(\lvert X-50\rvert\ge10)\le\tfrac{25}{100} = \tfrac14$，$\Prob(40<X<60)\ge\tfrac34$。
:::
:::

::: exercise 测量值取平均 {level=1 check="2"}
某测量的标准差为$10$。求$25$次独立测量的平均值的标准差。
::: solution
由[[#eq-var-mean]]，$\sigma/\sqrt n = 10/5 = 2$。
:::
:::

::: exercise 六点 {level=2}
把一颗均匀的骰子掷$300$次。用带连续性修正的正态近似，估计至少出现$60$次六点的概率。
::: solution
六点出现的次数服从$\Bin(300,\tfrac16)$，均值为$50$，标准差为$\sqrt{300\cdot\tfrac16\cdot\tfrac56} = \sqrt{41.67}\approx6.455$。于是

$$
\Prob(X\ge60)\approx1-\Phi\Bigl(\frac{59.5-50}{6.455}\Bigr) = 1-\Phi(1.47)\approx0.071 .
$$

（精确值为$0.073$；这一小小的差异来自$p = \tfrac16$时二项分布的偏斜。）
:::
:::

::: exercise 精确到两位小数所需的抛掷次数 {level=2 check="9604"}
利用中心极限定理，求需要抛掷一枚均匀的硬币多少次，才能使正面比例以概率$0.95$落在$\tfrac12$的$0.01$范围之内。（正态分布的$97.5\%$分位点取$1.96$。）
::: solution
正面比例的标准差为$\frac{1}{2\sqrt n}$，我们需要$1.96\cdot\frac{1}{2\sqrt n} = 0.01$，所以$\sqrt n = 98$，$n = 9604$——大约是[[#ex-how-many]]中切比雪夫不等式所要求的$50\,000$次的五分之一。
:::
:::

::: exercise 依次使用的灯泡 {level=2}
一座灯塔依次使用灯泡，每个灯泡失效后立即更换。各灯泡的寿命相互独立，服从均值为$1000$小时的指数分布。求$100$个灯泡总共能用超过$110\,000$小时的概率的近似值。
::: solution
每个寿命的均值为$1000$，标准差为$1000$（指数分布的均值与标准差相等），所以总寿命的均值为$100\,000$，标准差为$1000\sqrt{100} = 10\,000$。由中心极限定理，$\Prob(S>110\,000)\approx1-\Phi(1)\approx0.159$。（$S$的精确分布是[[probability/joint-distributions]]中的伽马分布，由它算得$0.158$：这个近似非常好。）
:::
:::

::: exercise 用中心极限定理求极限 {level=3 check="1/2"}
用中心极限定理求$\displaystyle\lim_{n\to\infty}e^{-n}\sum_{k=0}^n\frac{n^k}{k!}$。
::: hint
对于适当的一个独立泊松随机变量之和$S_n$，这个和式就是$\Prob(S_n\le n)$。
:::
::: solution
令$S_n = X_1+\dots+X_n$，其中各$X_i$独立同分布于$\operatorname{Poisson}(1)$。由[[probability/joint-distributions#ex-poisson-sum]]，$S_n\sim\operatorname{Poisson}(n)$，所以该表达式等于$\Prob(S_n\le n)$。每个$X_i$的均值和方差都是$1$，所以由中心极限定理，

$$
\Prob(S_n\le n) = \Prob\Bigl(\frac{S_n - n}{\sqrt n}\le0\Bigr)\to\Phi(0) = \frac12 .
$$

（收敛很慢：$n = 10, 100, 1000$时的值分别为$0.583$、$0.527$、$0.508$。）
:::
:::

::: exercise 切尔诺夫界 {level=3}
(a) 证明：对任意具有矩母函数$M$的随机变量$X$、任意$a$以及任意满足$M(t)<\infty$的$t>0$，都有$\Prob(X\ge a)\le e^{-ta}M(t)$。(b) 对$S_n\sim\Bin(n,\tfrac12)$，取$t = \ln3$，证明$\Prob\bigl(S_n\ge\tfrac34n\bigr)\le\bigl(2\cdot3^{-3/4}\bigr)^n\approx0.877^n$，并在$n = 100$时与切比雪夫界作比较。
::: solution
(a) 对$t>0$，$X\ge a$当且仅当$e^{tX}\ge e^{ta}$。对$e^{tX}\ge0$应用马尔可夫不等式，得$\Prob(X\ge a)\le\E e^{tX}/e^{ta} = e^{-ta}M(t)$。

(b) $S_n$的矩母函数为$\bigl(\tfrac{1+e^t}{2}\bigr)^n$。取$a = \tfrac34n$，$e^t = 3$，得

$$
\Prob\bigl(S_n\ge\tfrac34n\bigr)\le3^{-3n/4}\Bigl(\frac{1+3}{2}\Bigr)^n = \bigl(2\cdot3^{-3/4}\bigr)^n\approx0.8774^n.
$$

当$n = 100$时，这约为$2\times10^{-6}$。切比雪夫不等式只能给出$\Prob(\lvert S_n - 50\rvert\ge25)\le\frac{25}{625} = 0.04$。（精确概率约为$2.8\times10^{-7}$。）切尔诺夫界随$n$指数衰减，这使它成为估计随机化算法出错概率上界的标准工具。
:::
:::

::: exercise 收敛到常数 {level=3}
证明：若$Y_n\xrightarrow{\;d\;}c$，其中$c$是常数（即以概率$1$等于$c$的随机变量），则$Y_n\xrightarrow{\;\Prob\;}c$。
::: solution
常数$c$的分布函数为：当$x<c$时$F(x) = 0$，当$x\ge c$时$F(x) = 1$；它除$c$外处处连续。设$\eps>0$。由于$c-\eps$和$c+\tfrac\eps2$都是连续点，$F_{Y_n}(c-\eps)\to0$，$F_{Y_n}(c+\tfrac\eps2)\to1$。因此

$$
\Prob(\lvert Y_n-c\rvert\ge\eps)\le\Prob(Y_n\le c-\eps) + \Prob\bigl(Y_n>c+\tfrac\eps2\bigr) = F_{Y_n}(c-\eps) + 1 - F_{Y_n}\bigl(c+\tfrac\eps2\bigr)\to0 .
$$

（我们用$c + \tfrac\eps2$而不是$c+\eps$，是为了使$\{Y_n\ge c+\eps\}\subseteq\{Y_n>c+\tfrac\eps2\}$。）一般来说，依分布收敛弱于依概率收敛，但当极限是常数时，两者是一致的。
:::
:::
