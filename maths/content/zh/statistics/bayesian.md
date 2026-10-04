一种新药治愈了最先服用它的$10$名患者中的$7$名。它的治愈率高于$50\%$的概率是多少？这听起来是世界上最自然不过的问题，然而前面几章的方法都无法回答它。在频率学派看来，治愈率$p$是一个固定的未知数，而不是随机变量，所以“$p>0.5$的概率”要么是$0$，要么是$1$，只是我们不知道是哪一个。置信区间和 p 值描述的是统计程序在重复抽样下的表现，而不是关于$p$的命题成立的概率。

**贝叶斯推断**直接回答这个问题：它把未知参数看作一个随机变量，用其分布来表达我们对参数的不确定性。在看到数据之前，不确定性由**先验分布**来描述；贝叶斯定理（[[probability/conditional-probability#thm-bayes]]）把先验分布与数据的似然结合起来，得到**后验分布**；而一切结论——估计、区间、预测、假设的概率——都从后验分布中读出。对于这种新药，在均匀先验下，答案是$\Prob(p>0.5\mid\text{数据}) = 227/256\approx0.89$。本章建立这套方法，详细讨论主要的**共轭**模型，并如实地比较贝叶斯方法与频率学派方法。

## 从贝叶斯定理到后验分布 {#posterior}

在[[probability/conditional-probability]]一章中，贝叶斯定理更新的是构成一个划分的各事件的概率。当“事件”是参数的各个可能取值时，同样的计算依然适用。

::: example 是哪一枚硬币？ {#ex-three-coins}
袋中有三枚硬币，出现正面的概率分别为$0.25$、$0.5$和$0.75$。随机取出一枚，抛掷$10$次，得到$7$次正面。求每枚硬币的后验概率。
::: solution
先验赋予每枚硬币的概率都是$\tfrac13$。对参数为$p$的硬币，$10$次抛掷中出现$7$次正面的似然为$\binom{10}{7}p^7(1-p)^3$；二项式系数对三枚硬币都相同，可以约去。$p^7(1-p)^3$的值分别为$2.57\times10^{-5}$、$9.77\times10^{-4}$和$2.09\times10^{-3}$。乘以先验概率并归一化，得

$$
\Prob(p = 0.25\mid\text{数据}) = 0.008,\qquad\Prob(p = 0.5\mid\text{数据}) = 0.316,\qquad\Prob(p = 0.75\mid\text{数据}) = 0.675 .
$$

数据使偏向正面的那枚硬币的概率约为均匀硬币的两倍，并且实际上排除了偏向反面的那一枚。
:::
:::

当参数是连续的时，概率就换成密度。记$\pi(\theta)$为$\theta$的先验密度，$f(x\mid\theta)$为给定$\theta$时数据$x = (x_1,\ldots,x_n)$的密度（或概率质量函数）——对随机样本而言，它就是乘积$\prod_if(x_i\mid\theta)$，即[[statistics/estimation#def-likelihood]]中的似然$L(\theta)$。

::: theorem 密度形式的贝叶斯定理 {#thm-bayes-density}
给定数据$x$时，$\theta$的后验密度为

$$
\pi(\theta\mid x) = \frac{f(x\mid\theta)\,\pi(\theta)}{\int f(x\mid\vartheta)\,\pi(\vartheta)\,d\vartheta}\ \propto\ L(\theta)\,\pi(\theta),
$$ {#eq-posterior}

这里要求分母——**边缘似然**$m(x)$——为正且有限。
:::

::: proof
把$(\theta, X)$看作一对具有联合分布的随机变量，其联合密度为$f(x\mid\theta)\pi(\theta)$——即$\theta$的先验密度乘以给定$\theta$时数据的条件密度。数据的边缘密度为$m(x) = \int f(x\mid\vartheta)\pi(\vartheta)\,d\vartheta$（[[probability/joint-distributions#prop-marginal-density]]），而由[[probability/joint-distributions#eq-conditional-density]]，给定$X = x$时$\theta$的条件密度等于联合密度除以这个边缘密度。
:::

用一句口诀来说就是：**后验$\propto$似然$\times$先验**。比例常数不依赖于$\theta$，通常可以在最后通过辨认出某个已知密度的形式来确定。后验还可以逐步更新：一批数据之后的后验充当下一批数据的先验，最终结果与一次性处理全部数据相同（两者都正比于先验乘以所有似然的乘积）。

## 贝塔-二项模型 {#beta-binomial}

对于比例$p$，自然的先验族是贝塔分布族。

::: definition 贝塔分布 {#def-beta}
对$\alpha,\beta>0$，**贝塔分布**$\operatorname{Beta}(\alpha,\beta)$的密度为

$$
\pi(p) = \frac{p^{\alpha-1}(1-p)^{\beta-1}}{B(\alpha,\beta)},\qquad0<p<1,
$$

其中$B(\alpha,\beta) = \int_0^1t^{\alpha-1}(1-t)^{\beta-1}\,dt = \dfrac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}$。它的均值（数学期望）为$\dfrac{\alpha}{\alpha+\beta}$，方差为$\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$。
:::

这个分布族很灵活：$\operatorname{Beta}(1,1)$是均匀分布，$\alpha = \beta$时$\operatorname{Beta}(\alpha,\beta)$关于$\tfrac12$对称，而$\alpha+\beta$越大，分布越集中。此外，二项似然恰好会把贝塔先验变成贝塔后验。

::: theorem 贝塔先验，二项数据 {#thm-beta-binomial}
若$p\sim\operatorname{Beta}(\alpha,\beta)$，且在给定$p$时，$X\sim\Bin(n,p)$的观测值为$s$，则后验分布为

$$
p\mid X = s\ \sim\ \operatorname{Beta}(\alpha + s,\ \beta + n - s).
$$
:::

::: proof
由[[#thm-bayes-density]]，对$0<p<1$，

$$
\pi(p\mid s)\propto\binom nsp^s(1-p)^{n-s}\cdot p^{\alpha-1}(1-p)^{\beta-1}\propto p^{\alpha+s-1}(1-p)^{\beta+n-s-1}.
$$

除相差一个常数外，这就是$\operatorname{Beta}(\alpha+s,\beta+n-s)$的密度；由于两者都是密度（积分都为$1$），常数必然相同。
:::

如果一个先验族产生的后验仍属于同一族，就称该先验族与这个似然是**共轭**的。这种更新有一个非常简洁的解释：先验相当于$\alpha$次先验成功和$\beta$次先验失败，而数据又加上了$s$次真实的成功和$n-s$次真实的失败。后验均值是先验均值与样本比例的加权平均：

$$
\E(p\mid s) = \frac{\alpha+s}{\alpha+\beta+n} = \frac{\alpha+\beta}{\alpha+\beta+n}\cdot\frac{\alpha}{\alpha+\beta} + \frac{n}{\alpha+\beta+n}\cdot\frac{s}{n}.
$$ {#eq-shrinkage}

随着$n$增大，数据的权重趋于$1$，先验的影响越来越小。

::: example 新药 {#ex-drug}
对治愈率$p$取均匀先验$\operatorname{Beta}(1,1)$，在$10$名患者中观察到$7$例治愈。求后验分布、后验均值、一个$95\%$可信区间，以及$\Prob(p>0.5\mid\text{数据})$。
::: solution
由[[#thm-beta-binomial]]，后验为$\operatorname{Beta}(8, 4)$，其均值为$8/12 = 2/3$，标准差为$0.13$。（后验**众数**$7/10$等于最大似然估计，在均匀先验下总是如此。）$\operatorname{Beta}(8,4)$分布中间的$95\%$从它的$2.5\%$分位点延伸到$97.5\%$分位点：

$$
p\in[0.390,\ 0.891]\quad\text{的后验概率为 }0.95 .
$$

最后，把后验密度$\frac{p^7(1-p)^3}{B(8,4)}$从$0.5$积分到$1$（这是一个多项式的积分），得到$\Prob(p>0.5\mid\text{数据}) = \frac{227}{256}\approx0.887$。所以，给定数据和先验，这种药能治愈一半以上患者的概率约为$89\%$——这直接回答了引言中的问题。
:::
:::

::: widget bayes
mode: beta
a: 1
b: 1
successes: 7
trials: 10
caption: 贝塔先验（这里是均匀分布）以及$10$次试验中$7$次成功之后的后验$\operatorname{Beta}(8,4)$。保持比例为$70\%$，增加试验次数：后验在$0.7$附近变窄。再试一个怀疑性的先验，例如以$\tfrac12$为中心的$\operatorname{Beta}(10,10)$：在$10$次试验时，它会把后验明显地拉向$0.5$；在$200$次试验时则几乎没有影响。
:::

后验还能预测未来的观测。给定数据时，下一位患者被治愈的概率是治愈概率$p$关于后验分布的平均：由全概率公式（其连续形式见[[probability/expectation#thm-tower]]），$\Prob(\text{下一位被治愈}\mid s) = \E(p\mid s)$。

::: corollary 拉普拉斯（Laplace）接续法则 {#cor-succession}
对$p$取均匀先验，在$n$次独立试验中出现$s$次成功之后，下一次试验成功的概率为$\dfrac{s+1}{n+2}$。
:::

::: proof
后验为$\operatorname{Beta}(s+1, n-s+1)$，其均值为$\dfrac{s+1}{n+2}$；由上面的说明，这就是成功的预测概率。
:::

拉普拉斯半开玩笑地把这一法则用于明天太阳是否会升起的问题：他认为有记载的历史涵盖$5000$年，即大约$1\,826\,213$天的日出，从而得到太阳会升起的几率为$1\,826\,214$比$1$。这一法则永远不会给出概率$0$或$1$：在$n$次试验中$0$次成功之后，它给出的是$\frac{1}{n+2}$而不是零，这是对“尚未见过的事情就是不可能的”这一结论的一种明智防范。

## 方差已知的正态数据 {#normal-normal}

对于正态均值，共轭先验是正态分布。使用**精度**（即方差的倒数）来计算会很方便。

::: theorem 正态先验，正态数据 {#thm-normal-normal}
设$\theta\sim\Normal(\mu_0,\tau_0^2)$，并且在给定$\theta$时，$X_1,\ldots,X_n\iid\Normal(\theta,\sigma^2)$，其中$\sigma^2$已知。则$\theta\mid x\sim\Normal(\mu_n,\tau_n^2)$，其中

$$
\frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2},\qquad\mu_n = \tau_n^2\Bigl(\frac{\mu_0}{\tau_0^2} + \frac{n\bar x}{\sigma^2}\Bigr).
$$ {#eq-normal-posterior}
:::

::: proof
作为$\theta$的函数，似然为

$$
L(\theta)\propto\exp\Bigl(-\frac{1}{2\sigma^2}\sum_i(x_i-\theta)^2\Bigr)\propto\exp\Bigl(-\frac{n}{2\sigma^2}(\theta-\bar x)^2\Bigr),
$$

这里用到了$\sum_i(x_i-\theta)^2 = \sum_i(x_i-\bar x)^2 + n(\bar x-\theta)^2$，其第一项不含$\theta$。乘以先验密度，并把指数中含$\theta$的项归并在一起，

$$
-\frac12\Bigl[\frac{(\theta-\mu_0)^2}{\tau_0^2} + \frac{n(\theta - \bar x)^2}{\sigma^2}\Bigr] = -\frac12\Bigl[\Bigl(\frac1{\tau_0^2}+\frac n{\sigma^2}\Bigr)\theta^2 - 2\Bigl(\frac{\mu_0}{\tau_0^2} + \frac{n\bar x}{\sigma^2}\Bigr)\theta\Bigr] + \text{常数} = -\frac{(\theta-\mu_n)^2}{2\tau_n^2} + \text{常数},
$$

这一步用到了配方，其中$\tau_n$和$\mu_n$如[[#eq-normal-posterior]]所示。所以后验密度正比于$\Normal(\mu_n,\tau_n^2)$的密度，因而与之相等。
:::

用文字来说：**精度相加**，后验均值是先验均值与样本均值以精度为权的加权平均。数据只通过$\bar x$起作用，它的精度为$n/\sigma^2$。

::: example 带噪声的测验分数 {#ex-iq}
某总体的智商分数服从$\Normal(100, 15^2)$。某人在一次测量误差标准差为$5$的测验中得了$130$分。把此人的真实智商$\theta$看作从该总体中抽取的，求它的后验分布。
::: solution
先验精度为$1/225$，数据精度为$1/25$，是前者的九倍。由[[#thm-normal-normal]]（取$n = 1$），后验精度为$\frac{1}{225}+\frac1{25} = \frac{10}{225}$，所以$\tau_1^2 = 22.5$，$\tau_1 = 4.74$，并且

$$
\mu_1 = \frac{1}{10}\times100 + \frac{9}{10}\times130 = 127 .
$$

所以$\theta\mid\text{得分}\sim\Normal(127, 4.74^2)$，一个$95\%$可信区间为$127\pm1.96\times4.74 = [117.7, 136.3]$。估计值从观测到的$130$向总体均值**收缩**：高分部分是由有利的测量误差造成的，这正是从贝叶斯的视角看到的向均值回归（[[statistics/regression]]）。测验次数越多，数据精度越高，收缩也就逐渐消失。
:::
:::

::: widget plot
f: exp(-(x - m)^2/(2*t^2))/(t*sqrt(2*pi)); exp(-(x - 130)^2/(2*25/k))/sqrt(2*pi*25/k); exp(-(x - (m/t^2 + 130*k/25)/(1/t^2 + k/25))^2*(1/t^2 + k/25)/2)*sqrt((1/t^2 + k/25)/(2*pi))
x: 60, 160
y: 0, 0.4
sliders: m=100:70:130:1; t=15:2:30:1; k=1:1:20:1
labels: \text{先验}; \text{似然}; \text{后验}
caption: 真实分数的先验$\Normal(m, t^2)$、由平均分为$130$的$k$次测验（每次的误差标准差为$5$）得到的似然，以及由此得到的后验。后验总是位于先验与似然之间，并且比两者都窄。增大$k$，后验就移向数据；缩小先验标准差$t$，后验就被拉向先验均值。平坦的先验（$t$很大）使后验与似然一致。
:::

::: quiz
在正态-正态模型中，当观测次数$n\to\infty$（先验固定）时，后验会怎样？
- [ ] 它收敛于先验。
- [ ] 它的方差收敛于$\tau_0^2$。
- [x] 它的均值趋近$\bar x$，方差的表现类似于$\sigma^2/n$。
- [ ] 它变成均匀分布。
::: solution
后验精度为$1/\tau_0^2 + n/\sigma^2$，当$n$很大时由$n/\sigma^2$主导，所以方差约为$\sigma^2/n$，而$\bar x$的权重趋于$1$。先验被数据压倒，后验看起来就像是以数据为中心重新定位的、$\bar x$在频率学派意义下的抽样分布——这是下面的伯恩斯坦-冯·米塞斯（Bernstein–von Mises）定理的一个简单情形。
:::
:::

## 后验概括量与可信区间 {#credible}

后验分布是完整的答案；在实践中我们对它加以概括。

::: definition 可信区间 {#def-credible}
$\theta$的一个**$1-\alpha$可信区间**是满足$\Prob(a\le\theta\le b\mid x) = 1-\alpha$的区间$[a,b]$。**等尾**区间在两侧尾部各留下$\alpha/2$的后验概率；**最高后验密度**（HPD）区间是其中最短的一个，由后验密度最高的那些值组成。
:::

点概括量包括后验均值、后验中位数和后验众数。它们各自在不同的误差概念下是最优的：后验均值使后验期望平方误差最小（见习题），后验中位数使期望绝对误差最小。对于新药，等尾$95\%$区间为$[0.390, 0.891]$，HPD 区间为$[0.412, 0.907]$；两者不同，是因为后验分布是偏斜的。

可信区间的解释，正是人们本能地赋予置信区间的那种解释：**给定数据和先验**，参数以$0.95$的概率落在该区间内。代价是先验——这一陈述依赖于先验。

::: example 事故次数 {#ex-gamma-poisson}
某路口每月发生的事故次数服从$\operatorname{Poisson}(\lambda)$。以往在类似路口的经验提示取先验$\lambda\sim\operatorname{Gamma}(2, 1)$（形状参数为$2$，速率参数为$1$，因此先验均值为$2$）。在三个月中，分别发生了$3$、$5$和$4$起事故。求$\lambda$的后验分布，以及下个月不发生事故的概率。
::: solution
似然为$\prod_ie^{-\lambda}\lambda^{x_i}/x_i!\propto\lambda^{12}e^{-3\lambda}$，伽马先验密度正比于$\lambda^{2-1}e^{-\lambda}$。两者的乘积正比于$\lambda^{14-1}e^{-4\lambda}$，所以后验为$\operatorname{Gamma}(14, 4)$——伽马分布族与泊松分布共轭：形状参数加上总计数，速率参数加上时段数。后验均值为$14/4 = 3.5$，介于先验均值$2$与样本均值$4$之间，等尾$95\%$可信区间为$[1.91, 5.56]$。

为了进行预测，把泊松分布取零的概率关于后验分布求平均：

$$
\Prob(\text{无事故}\mid\text{数据}) = \int_0^\infty e^{-\lambda}\frac{4^{14}\lambda^{13}e^{-4\lambda}}{\Gamma(14)}\,d\lambda = \Bigl(\frac45\Bigr)^{14}\approx0.044,
$$

这里用到了$\int_0^\infty\lambda^{13}e^{-5\lambda}\,d\lambda = \Gamma(14)/5^{14}$。如果改为直接代入点估计$\lambda = 3.5$，得到的是$e^{-3.5}\approx0.030$，这低估了这一机会，因为它忽略了$\lambda$的不确定性。
:::
:::

::: widget distribution
dist: beta
params: alpha=8, beta=4
a: 0.5
b: 1
caption: 新药治愈率的后验$\operatorname{Beta}(8,4)$，阴影部分为$\Prob(p>0.5\mid\text{数据}) = 227/256\approx0.887$。把阴影区域的左端移到$0.390$：从$0.390$到$0.891$的区间包含了$95\%$的后验概率，它就是$95\%$等尾可信区间。
:::

## 用贝叶斯因子比较假设 {#bayes-factors}

为了比较两个假设$H_0$和$H_1$，贝叶斯推断计算它们的后验概率。写成几率形式（[[probability/conditional-probability#prop-odds]]），

$$
\frac{\Prob(H_0\mid x)}{\Prob(H_1\mid x)} = \underbrace{\frac{m_0(x)}{m_1(x)}}_{\text{贝叶斯因子 }B_{01}}\times\frac{\Prob(H_0)}{\Prob(H_1)},
$$

其中$m_j(x) = \int f(x\mid\theta)\pi_j(\theta)\,d\theta$是数据在$H_j$下的边缘似然，即似然关于$H_j$赋予参数的先验的平均。**贝叶斯因子**度量数据使几率改变了多少；哈罗德·杰弗里斯（Harold Jeffreys）建议，大于$10$左右的因子可以算作强证据。

::: example 硬币均匀吗？贝叶斯的回答 {#ex-bayes-factor}
一枚硬币在$100$次抛掷中出现$60$次正面。比较$H_0$：$p = \tfrac12$与$H_1$：$p\sim\operatorname{U}(0,1)$，并赋予两个假设相等的先验概率。
::: solution
在$H_0$下，数据的概率为$\binom{100}{60}2^{-100} = 0.0108$。在$H_1$下，它为$\int_0^1\binom{100}{60}p^{60}(1-p)^{40}\,dp = \frac{1}{101}\approx0.0099$（当$p$服从均匀分布时，从$0$到$100$的每一个正面次数都是等可能的，见[[probability/expectation#ex-unknown-bias]]）。所以$B_{01} = 0.0108/0.0099\approx1.10$，$\Prob(H_0\mid\text{数据})\approx0.52$。

关于硬币是否均匀，这些数据基本上没有提供信息，甚至略微支持均匀。与此对照，[[statistics/hypothesis-testing#ex-coin-test]]中的双侧 p 值为$0.057$，它常被解读为“接近显著的有偏证据”。两个答案针对的是不同的问题——而且贝叶斯因子依赖于$H_1$下的先验——但这一比较表明，接近$0.05$的 p 值作为证据可能是多么薄弱。这种矛盾在大样本下的极端形式被称为**林德利（Lindley）悖论**。
:::
:::

## 贝叶斯推断与频率学派推断的比较 {#comparison}

两个学派的分歧在于把什么看作随机的。频率学派方法把参数看作固定的、把数据看作随机的，并按长期表现（偏差、覆盖率、错误率）来评价**统计程序**。贝叶斯方法则以观测到的数据为条件，把参数看作随机的，并把一切不确定性都表示为概率。

- **回答的是什么。**可信区间给出$\Prob(\theta\in I\mid x)$，假设的后验概率给出$\Prob(H\mid x)$——这些正是人们通常想要的量。置信区间和 p 值给出的是关于数据的概率，很容易被误读。
- **先验。**贝叶斯结论依赖于先验，先验可以是有信息的（基于以往的研究），也可以有意选得较弱。批评者认为这带有主观性；辩护者则回应说，频率学派方法同样涉及选择（模型、检验和停止规则的选择），而先验至少是明确写出的，并且可以在**敏感性分析**中加以改变。**非正常先验**，例如整个实数轴上的“平坦”密度，常被用作参照，并且可以给出正常的后验，但必须谨慎对待。
- **大样本。**在正则模型中，两者通常是一致的，因为似然会压倒任何固定的先验。

::: theorem 伯恩斯坦-冯·米塞斯定理 {#thm-bvm}
在正则参数模型中，若先验密度在真值$\theta_0$处连续且为正，则当$n$很大时，后验分布近似为$\Normal\bigl(\hat\theta_n, 1/(nI(\theta_0))\bigr)$，其中$\hat\theta_n$是最大似然估计量；确切地说，后验分布与这个正态分布之间的全变差距离依概率趋于$0$。
:::

（这里只陈述定理而不加证明；参见范德法特（van der Vaart）的《渐近统计》（Asymptotic Statistics）第10章。）因此，在大样本下，$95\%$可信区间与$95\%$置信区间几乎重合；并且由[[statistics/estimation#thm-mle-asymptotic]]，后验均值是渐近有效的。两种方法差别最大的是在小样本中、在参数很多的问题中（此时跨组**汇集**信息的先验能给出好得多的估计），以及在假设检验中。

::: warning 可信区间与置信区间不可互换
$95\%$可信区间说的是“给定这些数据和这个先验，$\theta$以$0.95$的概率落在该区间内”；$95\%$置信区间说的是“这种方法在$95\%$的样本中能捕获$\theta$”。两者在数值上可能一致——对正态均值取平坦先验时，两者完全相同——但也可能相差很大，例如在新药的例子中：沃尔德（Wald）置信区间为$0.7\pm1.96\sqrt{0.21/10} = [0.42, 0.98]$，而可信区间为$[0.39, 0.89]$。不要用其中一种区间的解释来报告另一种区间。此外，如果先验是错误的，那么采用强信息先验得到的后验可能会自信地出错：要检查先验改变时结论会如何变化。
:::

::: application 用模拟计算后验
共轭先验能给出闭式的后验，但贴近实际的模型——参数众多、具有分层结构或似然不标准——很少能做到这一点：[[#eq-posterior]]中的归一化常数$m(x)$是一个无法计算的高维积分。**马尔可夫链蒙特卡罗**方法绕开了它。只用未归一化的乘积$L(\theta)\pi(\theta)$，构造一条以后验分布为平稳分布的马尔可夫链，并让它运行很长时间；由[[probability/markov-chains]]中的收敛定理和遍历定理，链所访问的值表现得就像来自后验分布的样本，均值、区间和预测概率都可以通过对这些值求平均来估计。梅特罗波利斯-黑斯廷斯（Metropolis–Hastings）算法和吉布斯（Gibbs）抽样从1990年前后起使贝叶斯统计变得切实可行，它们是现代概率编程软件的引擎。
:::

::: quiz
对于新药的例子，一位频率学派统计学家和一位（采用均匀先验的）贝叶斯学派统计学家都分析了数据$7/10$。下列哪个说法**只有**贝叶斯学派统计学家才能作出？
- [ ] $p$的最大似然估计为$0.7$。
- [ ] 产生该区间的程序在约$95\%$的样本中会覆盖$p$。
- [x] 给定数据，$p$超过$0.5$的概率约为$0.89$。
- [ ] 数据与$0.6$的治愈率相容。
::: solution
关于给定数据时$p$的概率陈述，需要$p$的一个概率分布，而只有贝叶斯学派统计学家才有。最大似然估计和覆盖率的陈述属于频率学派，而“与$0.6$相容”则两者都可以说（这个值落在两个区间之内）。
:::
:::

::: history
托马斯·贝叶斯（Thomas Bayes）在身后于1763年发表的论文，解决了在均匀先验下推断二项概率的问题，这基本上就是本章的贝塔-二项模型。皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）从1774年起独立地发展了“逆概率”，推导出接续法则，并把贝叶斯推理应用于从天文学到男女出生比例的各种问题。20世纪初，费希尔（Fisher）对任意选取先验的批评使逆概率失宠，但哈罗德·杰弗里斯（Harold Jeffreys）使它延续了下来——他的《概率论》（Theory of Probability，1939年）引入了参考先验和贝叶斯因子；弗兰克·拉姆齐（Frank Ramsey）、布鲁诺·德菲内蒂（Bruno de Finetti）和伦纳德·萨维奇（Leonard Savage）则为它奠定了主观主义的基础，萨维奇的著作是《统计学基础》（The Foundations of Statistics，1954年）。第二次世界大战期间，艾伦·图灵（Alan Turing）和他在布莱切利园（Bletchley Park）的同事们使用序贯贝叶斯因子——以图灵称为“班”（ban）的单位来度量——来帮助破译恩尼格玛（Enigma）密码。实际应用上的革命随着计算机的出现而到来：梅特罗波利斯（Metropolis）算法（1953年）经黑斯廷斯（Hastings）推广（1970年）后，于1990年由艾伦·盖尔芬德（Alan Gelfand）和阿德里安·史密斯（Adrian Smith）引入统计学。
:::

## 后续内容 {#where-next}

贝叶斯推断可以推广到本课程中的每一个模型：贝叶斯回归给[[statistics/regression]]中的系数赋予先验（采用正态先验时，就重现了岭回归）；分层模型给各组（例如各家医院或各所学校）的参数赋予一个共同的先验，这个先验本身又含有未知参数，从而在各组之间共享信息；贝叶斯决策理论则把后验与错误的代价结合起来。计算依赖于[[probability/markov-chains]]中的马尔可夫链理论。格尔曼（Gelman）等人的《贝叶斯数据分析》（Bayesian Data Analysis）是应用贝叶斯建模的标准指南。

::: summary
- 贝叶斯推断把参数看作随机的：后验$\propto$似然$\times$先验，一切结论都来自后验。
- 贝塔-二项模型：$\operatorname{Beta}(\alpha,\beta)$先验加上$n$次试验中的$s$次成功，得到$\operatorname{Beta}(\alpha+s,\beta+n-s)$；后验均值把$s/n$向先验均值收缩。
- 正态-正态模型（方差已知）：精度相加，后验均值是先验均值与$\bar x$以精度为权的加权平均。伽马-泊松是用于计数数据的共轭对。
- 预测概率是关于后验的平均；在均匀先验下，$\Prob(\text{下一次成功}) = (s+1)/(n+2)$。
- 可信区间以后验概率$1-\alpha$包含$\theta$——这正是人们常常错误地赋予置信区间的解释；它依赖于先验。
- 贝叶斯因子通过边缘似然来比较假设；接近$0.05$的 p 值可能几乎不对应任何证据。
- 在大样本下，先验被数据压倒，贝叶斯学派与频率学派的答案趋于一致（伯恩斯坦-冯·米塞斯定理）；MCMC 使复杂的后验变得可以计算。
:::

## 习题

::: exercise 贝塔更新 {level=1 check="6/11"}
某比例的先验为$\operatorname{Beta}(2,3)$。在$6$次试验中有$4$次成功。求后验分布和后验均值。
::: solution
由[[#thm-beta-binomial]]，后验为$\operatorname{Beta}(2+4, 3+2) = \operatorname{Beta}(6,5)$，其均值为$6/11\approx0.545$。
:::
:::

::: exercise 接续法则 {level=1 check="10/11"}
某事件在$9$次独立试验中每次都发生了。对其概率取均匀先验，它在下一次试验中发生的概率是多少？
::: solution
由[[#cor-succession]]，$(9+1)/(9+2) = 10/11\approx0.909$。
:::
:::

::: exercise 单个正态观测值 {level=1 check="1"}
$\theta$的先验为$\Normal(0,1)$，从$\Normal(\theta, 1)$中得到一个观测值$x = 2$。求后验均值和后验方差；请输入均值。
::: solution
先验精度和数据精度都是$1$，所以后验精度为$2$（方差为$\tfrac12$），后验均值为$\tfrac12\times0 + \tfrac12\times2 = 1$。
:::
:::

::: exercise 再治愈两人 {level=2 check="6/13"}
利用[[#ex-drug]]中的后验$\operatorname{Beta}(8,4)$，求接下来的两名患者都被治愈的概率。
::: hint
给定$p$时，这一概率为$p^2$；把它关于后验求平均。
:::
::: solution
$\E(p^2\mid\text{数据}) = \Var + (\E)^2$；或者直接利用$\operatorname{Beta}(a,b)$的$\E p^2 = \frac{a(a+1)}{(a+b)(a+b+1)} = \frac{8\times9}{12\times13} = \frac{72}{156} = \frac{6}{13}\approx0.46$。这比$(2/3)^2 = 0.444$大：关于$p$的不确定性使各次结果正相关。
:::
:::

::: exercise 伽马-泊松更新 {level=2 check="13/5"}
速率$\lambda$的先验为$\operatorname{Gamma}(3,1)$。在四个时段中观测到泊松计数$2, 4, 1, 3$。求后验分布和后验均值。
::: solution
与[[#ex-gamma-poisson]]一样，形状参数加上总计数$10$，速率参数加上时段数$4$：后验为$\operatorname{Gamma}(13, 5)$，其均值为$13/5 = 2.6$（介于先验均值$3$与样本均值$2.5$之间）。
:::
:::

::: exercise 双头硬币？ {level=2 check="0.01/(0.01+0.99/32)"}
一枚硬币要么是均匀的，要么是两面都是正面的双头硬币；你认为它是双头硬币的概率为$0.01$。将它抛掷$5$次，出现了$5$次正面。求它是双头硬币的后验概率。
::: solution
出现$5$次正面的似然分别为$1$（双头）和$1/32$（均匀）。由贝叶斯定理，

$$
\Prob(\text{双头}\mid5\text{ 次正面}) = \frac{0.01\times1}{0.01\times1 + 0.99\times\frac1{32}}\approx0.244 .
$$

支持双头硬币的贝叶斯因子为$32$，但较低的先验使后验仍低于$\tfrac14$；再出现五次正面就会把它提高到约$0.91$。
:::
:::

::: exercise 后验均值使平方误差最小 {level=3}
设$\theta$的后验分布具有有限方差。证明$g(a) = \E\bigl[(\theta-a)^2\mid x\bigr]$在$a = \E(\theta\mid x)$处取得最小值，且最小值为后验方差。
::: solution
记$m = \E(\theta\mid x)$。则$(\theta-a)^2 = (\theta-m)^2 + 2(\theta-m)(m-a) + (m-a)^2$，取后验期望，由于$\E(\theta - m\mid x) = 0$，中间项为零：

$$
g(a) = \Var(\theta\mid x) + (m-a)^2,
$$

它恰好在$a = m$处取得最小值，最小值为$\Var(\theta\mid x)$。（这是[[statistics/estimation#thm-mse]]中偏差-方差分解的后验版本。）
:::
:::

::: exercise 只有样本均值起作用 {level=3}
在[[#thm-normal-normal]]的正态-正态模型中，证明：给定全部$x_1,\ldots,x_n$时的后验，与只给定$\bar x$（把它看作来自$\Normal(\theta,\sigma^2/n)$的单个观测值）时的后验相同。
::: solution
给定$\theta$时，$\bar X\sim\Normal(\theta,\sigma^2/n)$，所以方差为$\sigma^2/n$的单个观测值$\bar x$的似然正比于$\exp\bigl(-\frac{n}{2\sigma^2}(\theta-\bar x)^2\bigr)$。[[#thm-normal-normal]]的证明表明，整个样本的似然（作为$\theta$的函数）正比于完全相同的表达式。由于后验$\propto$似然$\times$先验，两个后验相同。用[[statistics/estimation]]一章的语言来说，$\bar X$是一个**充分统计量**：它携带了样本中关于$\theta$的全部信息。
:::
:::

::: exercise 比例的杰弗里斯先验 {level=3}
哈罗德·杰弗里斯（Harold Jeffreys）提出了先验$\pi(\theta)\propto\sqrt{I(\theta)}$，其中$I$是费希尔信息。证明对伯努利比例，这个先验就是$\operatorname{Beta}(\tfrac12,\tfrac12)$分布，并求$n$次试验中$s$次成功之后的后验。在$10$次试验中$0$次成功之后，后验均值是多少？
::: solution
由[[statistics/estimation]]，$I(p) = \frac{1}{p(1-p)}$，所以$\sqrt{I(p)} = p^{-1/2}(1-p)^{-1/2}$，它正比于$\operatorname{Beta}(\tfrac12,\tfrac12)$的密度（它是可积的，因为指数大于$-1$）。由[[#thm-beta-binomial]]，后验为$\operatorname{Beta}\bigl(s+\tfrac12, n-s+\tfrac12\bigr)$，其均值为$\frac{s+1/2}{n+1}$。在$10$次试验中$0$次成功之后，后验均值为$\frac{0.5}{11} = \frac{1}{22}\approx0.045$，而在均匀先验下为$\frac{1}{12}$。杰弗里斯先验有一个很好的性质：无论模型采用哪种参数化，它都给出相同的答案。
:::
:::
