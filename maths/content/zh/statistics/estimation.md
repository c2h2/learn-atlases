第二次世界大战期间，盟军的统计学家被要求估计德国在生产多少辆坦克。缴获的坦克上带有序列号；如果产品依次编号为$1, 2, \ldots, N$，那么在缴获的坦克上看到的序列号就相当于来自$\{1,\ldots,N\}$的一个随机样本。假设缴获的四辆坦克的序列号为$19$、$40$、$42$和$60$。对$N$的最佳猜测是什么？观察到的最大编号$60$肯定太小了，因为样本中的最大序列号只可能低估实际存在的最大序列号。平均值的两倍$80.5$在平均意义上表现正确，但它甚至可能小于观测到的最大编号。统计学家们实际使用的是基于样本最大值构造的估计，战后证明，这些估计比情报报告准确得多——情报报告的数字高出了好几倍。

本章讨论**点估计**：利用数据对一个未知参数给出单一的最佳猜测。可能的估计量有很多，所以我们首先需要比较它们的准则：**偏差**、**方差**、**均方误差**和**相合性**。然后介绍构造估计量的两种一般方法——**矩估计法**和**最大似然法**；最后介绍**克拉默-拉奥（Cramér–Rao）下界**，它指出无偏估计量最多能精确到什么程度，并表明在大样本下最大似然估计已经好到了极致。

## 估计量及其性质 {#properties}

本章中，$X_1,\ldots,X_n$始终是来自某个分布的随机样本，该分布依赖于一个未知参数$\theta$（一个数，或者一个由数组成的向量），$\theta$属于一个已知的可能取值集合$\Theta$。我们用$\Prob_\theta$和$\E_\theta$表示当$\theta$为真值时计算的概率和数学期望。

::: definition 估计量 {#def-estimator}
$\theta$的**估计量**是用来猜测$\theta$的统计量$\hat\theta = T(X_1,\ldots,X_n)$；对观测数据，它的值$T(x_1,\ldots,x_n)$称为**估计值**。$\hat\theta$的**偏差**为$\operatorname{bias}_\theta(\hat\theta) = \E_\theta\hat\theta - \theta$；如果对每个$\theta\in\Theta$，$\hat\theta$的偏差都为$0$，则称$\hat\theta$是**无偏的**。它的**均方误差**为

$$
\operatorname{MSE}_\theta(\hat\theta) = \E_\theta\bigl(\hat\theta-\theta\bigr)^2 .
$$
:::

估计量是一种**程序**；偏差和均方误差描述的是这一程序在重复抽样中的表现，而不是某个特定的估计值与真值有多接近。我们已经见过两个无偏估计量：总体均值$\mu$的估计量——样本均值$\bar X$，以及$\sigma^2$的估计量——样本方差$S^2$（[[statistics/sampling#thm-sample-moments]]）。

::: theorem 偏差-方差分解 {#thm-mse}
若$\hat\theta$的方差有限，则

$$
\operatorname{MSE}_\theta(\hat\theta) = \Var_\theta(\hat\theta) + \bigl(\operatorname{bias}_\theta(\hat\theta)\bigr)^2 .
$$
:::

::: proof
记$m = \E_\theta\hat\theta$，于是$\hat\theta - \theta = (\hat\theta - m) + (m - \theta)$，其中$m-\theta$就是偏差，它是一个常数。把平方展开，

$$
\E_\theta(\hat\theta-\theta)^2 = \E_\theta(\hat\theta-m)^2 + 2(m-\theta)\,\E_\theta(\hat\theta - m) + (m-\theta)^2 = \Var_\theta(\hat\theta) + (m-\theta)^2,
$$

这是因为$\E_\theta(\hat\theta-m) = 0$。
:::

这一分解揭示了一种权衡：估计量要使均方误差小，可以是无偏的且方差适中，也可以接受少许偏差来换取方差的大幅减小。无偏性很有吸引力，但并非神圣不可侵犯。

::: example 除以 n − 1、n 还是 n + 1 {#ex-variance-divisors}
对于正态样本，比较$\sigma^2$的估计量$\frac1d\sum_i(X_i-\bar X)^2$在除数$d = n-1$（即样本方差$S^2$）、$d = n$和$d = n+1$时的表现。
::: solution
令$Q = \sum_i(X_i - \bar X)^2$。由[[statistics/sampling#thm-normal-sample]]，$Q/\sigma^2\sim\chi^2_{n-1}$，所以$\E Q = (n-1)\sigma^2$，$\Var Q = 2(n-1)\sigma^4$。估计量$Q/d$的偏差为$\bigl(\frac{n-1}{d}-1\bigr)\sigma^2$，方差为$\frac{2(n-1)}{d^2}\sigma^4$，所以由[[#thm-mse]]，

$$
\frac{\operatorname{MSE}}{\sigma^4} = \frac{2(n-1)}{d^2} + \Bigl(\frac{n-1}{d}-1\Bigr)^2 .
$$

当$d = n-1$时，它等于$\frac{2}{n-1}$；当$d = n$时，它等于$\frac{2(n-1)}{n^2}+\frac{1}{n^2} = \frac{2n-1}{n^2}$，由于$(2n-1)(n-1)<2n^2$，这个值更小；而对$d$求最小值（令关于$1/d$的导数为零），得到最优的$d = n+1$，此时均方误差为$\frac{2}{n+1}\sigma^4$。所以在这三个估计量中，无偏的$S^2$的均方误差反而**最大**。当$n = 10$时，三者分别为$0.222\sigma^4$、$0.190\sigma^4$和$0.182\sigma^4$。
:::
:::

::: widget plot
f: 2*(n - 1)/x^2 + ((n - 1)/x - 1)^2
x: 2, 30
y: 0, 1
sliders: n=10:3:25:1
labels: \text{MSE}/\sigma^4 \text{ 关于除数 } d
caption: 对正态数据，以$\frac1d\sum(X_i-\bar X)^2$作为$\sigma^2$的估计量时，其均方误差作为除数$d$的函数。最小值在$d = n+1$处，位于无偏选择$d = n - 1$的稍右侧。曲线在最小值附近很平坦，所以当$n$适中时，如何选择关系不大；较小的除数（收缩不足）比较大的除数差得多。
:::

对任何合理的估计量，一个最起码的要求是：随着样本量增大，它应当逼近真值。

::: definition 相合性 {#def-consistent}
如果对每个$\theta\in\Theta$都有$\hat\theta_n\xrightarrow{\;\Prob\;}\theta$，即对每个$\eps>0$，当$n\to\infty$时$\Prob_\theta(\lvert\hat\theta_n-\theta\rvert\ge\eps)\to0$，则称估计量序列$\hat\theta_n$（每个样本量$n$对应一个估计量）是$\theta$的**相合**估计。
:::

::: theorem 均方收敛蕴涵相合性 {#thm-consistency}
若对每个$\theta$都有$\operatorname{MSE}_\theta(\hat\theta_n)\to0$——等价地，偏差和方差都趋于$0$——则$\hat\theta_n$是相合的。
:::

::: proof
对非负随机变量$(\hat\theta_n-\theta)^2$应用马尔可夫（Markov）不等式（[[probability/limit-theorems#thm-markov]]），得

$$
\Prob_\theta\bigl(\lvert\hat\theta_n-\theta\rvert\ge\eps\bigr) = \Prob_\theta\bigl((\hat\theta_n-\theta)^2\ge\eps^2\bigr)\le\frac{\operatorname{MSE}_\theta(\hat\theta_n)}{\eps^2}\to0 .
$$

与“偏差和方差都趋于$0$”的等价性由[[#thm-mse]]给出。
:::

例如，$\bar X$是$\mu$的相合估计（这就是弱大数定律）；当四阶矩有限时，$S^2$和除数为$n$的估计量都是$\sigma^2$的相合估计。

::: quiz
估计量$\hat\theta$的偏差为$0.3$，标准差为$0.4$。它的均方误差是多少？
- [ ] $0.07$
- [x] $0.25$
- [ ] $0.5$
- [ ] $0.7$
::: solution
由[[#thm-mse]]，$\operatorname{MSE} = 0.4^2 + 0.3^2 = 0.16 + 0.09 = 0.25$；均方根误差为$0.5$。偏差和标准差像直角三角形的两条直角边那样合成，而不是简单相加。
:::
:::

## 矩估计法 {#moments}

构造估计量的最古老的一般方法，是令总体矩等于样本矩。如果总体均值是$\theta$的已知函数$\E_\theta X = m_1(\theta)$，就令它等于样本均值，再解出$\theta$。如果有$k$个参数，就用前$k$阶矩：对$j = 1,\ldots,k$，令$m_j(\theta) = \E_\theta X^j$与$\frac1n\sum_iX_i^j$相等。由此得到的估计量称为**矩估计量**，它们通常易于计算，并且是相合的（由大数定律，样本矩收敛于总体矩），但并不总是有效的，甚至不一定合理。

::: example 伽马模型的矩估计 {#ex-gamma-moments}
对于形状参数为$\alpha$、速率参数为$\lambda$的伽马分布（即[[probability/joint-distributions#eq-gamma]]中的分布，但允许$\alpha$为任意正数），$\E X = \alpha/\lambda$，$\Var X = \alpha/\lambda^2$。求矩估计量，并对$\bar x = 4$、$\frac1n\sum(x_i-\bar x)^2 = 8$的数据求出它们的值。
::: solution
令前两阶矩相等，等价于令均值和方差相等：$\alpha/\lambda = \bar x$，$\alpha/\lambda^2 = \hat\sigma^2$，其中$\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2$。两式相除得$\lambda = \bar x/\hat\sigma^2$，进而$\alpha = \bar x\lambda = \bar x^2/\hat\sigma^2$：

$$
\hat\lambda = \frac{\bar x}{\hat\sigma^2},\qquad\hat\alpha = \frac{\bar x^2}{\hat\sigma^2}.
$$

对给定的数据，$\hat\lambda = 4/8 = 0.5$，$\hat\alpha = 16/8 = 2$。伽马模型的最大似然估计没有闭合形式，必须用数值方法计算，因此矩估计值常被用作数值计算的初始值。
:::
:::

对于坦克问题，把序列号建模为$\{1,\ldots,N\}$上的均匀分布，其均值为$\frac{N+1}{2}$。矩估计法给出$\hat N = 2\bar X - 1$，对数据$19, 40, 42, 60$，它等于$2\times40.25 - 1 = 79.5$。如果这四个数是$5, 6, 7, 60$，同一公式将给出$38$，比实际观测到的一个序列号还小——在给定数据下，这是一个不可能的估计值。最大似然法可以避免这种情况。

## 最大似然估计 {#mle}

最大似然法的思想是：选取使观测数据出现的概率最大的参数值。

::: definition 似然函数与最大似然估计量 {#def-likelihood}
设$f(x;\theta)$是总体的概率质量函数或密度。对观测数据$x_1,\ldots,x_n$，**似然函数**为

$$
L(\theta) = \prod_{i=1}^nf(x_i;\theta),\qquad\theta\in\Theta,
$$

**对数似然函数**为$\ell(\theta) = \ln L(\theta) = \sum_i\ln f(x_i;\theta)$。在$\Theta$上使$L$（等价地，使$\ell$）达到最大的$\theta$值$\hat\theta$称为**最大似然估计值**；相应的统计量称为**最大似然估计量**（MLE）。
:::

似然函数就是样本的联合概率质量函数或联合密度，只不过把数据固定，看作参数的函数。对离散数据，$L(\theta)$恰好就是观测到的样本出现的概率。取对数把乘积变成和，求导更方便；当$\ell$可微且最大值点位于$\Theta$的内部时，最大似然估计是**似然方程**$\ell'(\theta) = 0$的解。

::: example 估计比例 {#ex-mle-bernoulli}
在成功概率为$p$的$n$次独立试验中，观测到$k$次成功。求$p$的最大似然估计。
::: solution
含$k$次成功的某个特定序列的似然为$L(p) = p^k(1-p)^{n-k}$（若改用二项分布的概率质量函数，只是多乘一个因子$\binom nk$，不改变最大值点）。当$0<k<n$时，

$$
\ell(p) = k\ln p + (n-k)\ln(1-p),\qquad\ell'(p) = \frac kp - \frac{n-k}{1-p} = 0\iff k(1-p) = (n-k)p\iff p = \frac kn .
$$

由于$\ell''(p) = -k/p^2 - (n-k)/(1-p)^2<0$，这是最大值点。若$k = 0$或$k = n$，则$L$单调，最大值在端点$p = 0$或$p = 1$处取到，也还是$k/n$。所以$\hat p = k/n$，即样本比例。
:::
:::

::: widget plot
f: (x/h)^(n*h)*((1 - x)/(1 - h))^(n*(1 - h))
x: 0, 1
y: 0, 1.1
sliders: n=20:5:500:5; h=0.35:0.05:0.95:0.01
labels: L(p)/L(\hat p)
caption: $n$次试验、观测比例为$\hat p = h$时的相对似然$L(p)/L(\hat p)$。曲线总是在$p = \hat p$处达到峰值，高度为$1$。固定$h$而增大$n$：曲线按$1/\sqrt n$的比例变窄，于是数据排除了越来越多的$p$值。相对似然极小的那些参数值与数据严重矛盾。
:::

::: example 指数分布的等待时间 {#ex-mle-exponential}
某服务台接到的连续九次来电之间的八段等待时间（单位：分钟）为$2.3, 0.8, 4.1, 1.6, 0.4, 3.2, 1.1, 2.5$。假设它们独立同分布于$\operatorname{Exp}(\lambda)$，求来电率$\lambda$的最大似然估计。
::: solution
似然函数为$L(\lambda) = \prod_i\lambda e^{-\lambda x_i} = \lambda^ne^{-\lambda\sum x_i}$，所以

$$
\ell(\lambda) = n\ln\lambda - \lambda\sum_ix_i,\qquad\ell'(\lambda) = \frac n\lambda - \sum_ix_i = 0\iff\lambda = \frac{n}{\sum_ix_i} = \frac{1}{\bar x}.
$$

由于$\ell''(\lambda) = -n/\lambda^2<0$，这就是最大值点。这里$\sum x_i = 16.0$，$n = 8$，所以$\bar x = 2$分钟，$\hat\lambda = 0.5$次/分钟。（估计量$1/\bar X$略微偏高——由詹森（Jensen）不等式，$\E(1/\bar X)>1/\E\bar X$——不过当$n\to\infty$时偏差趋于零。）
:::
:::

当有多个参数时，令所有偏导数为零即可求似然函数的最大值（[[multivariable/extrema]]）。

::: example 正态模型 {#ex-mle-normal}
由来自$\Normal(\mu,\sigma^2)$的样本$x_1,\ldots,x_n$求$\mu$和$\sigma^2$的最大似然估计。
::: solution
记$v = \sigma^2$，则

$$
\ell(\mu, v) = -\frac n2\ln(2\pi) - \frac n2\ln v - \frac{1}{2v}\sum_i(x_i-\mu)^2 .
$$

对每个固定的$v$，使$\ell$最大等价于关于$\mu$使$\sum(x_i-\mu)^2$最小，这在$\mu = \bar x$处取到（[[statistics/sampling]]一章中的一道习题）。代入$\mu = \bar x$，再对$v$求导：

$$
\frac{\partial\ell}{\partial v} = -\frac{n}{2v} + \frac{1}{2v^2}\sum_i(x_i-\bar x)^2 = 0\iff v = \frac1n\sum_i(x_i-\bar x)^2 .
$$

所以$\hat\mu = \bar x$，$\hat\sigma^2 = \frac1n\sum_i(x_i-\bar x)^2$，这正是[[#ex-variance-divisors]]中除数为$n$的估计量：最大似然估计量不一定是无偏的。
:::
:::

并非每个最大似然估计都来自令导数为零。

::: example 用最大似然法解坦克问题 {#ex-tanks}
把序列号$x_1,\ldots,x_n$建模为来自$[0,\theta]$上连续均匀分布的随机样本。求$\theta$的最大似然估计，并将它的均方误差与矩估计量$2\bar X$的均方误差相比较。
::: solution
密度在$[0,\theta]$上为$1/\theta$，所以当$\theta\ge\max_ix_i$时$L(\theta) = \theta^{-n}$，否则$L(\theta) = 0$（若$\theta$小于某个观测值，该观测值就不可能出现）。$L$在$[\max x_i,\infty)$上递减，所以最大值在边界点$\hat\theta = M = \max_iX_i$处取到；似然方程在这里不起作用。

关于$M$的分布：当$0\le t\le\theta$时，$\Prob(M\le t) = (t/\theta)^n$，由此得$\E M = \frac{n}{n+1}\theta$，$\Var M = \frac{n\theta^2}{(n+1)^2(n+2)}$。所以$M$偏低，而$\hat\theta_U = \frac{n+1}{n}M$是无偏的，其方差为$\frac{\theta^2}{n(n+2)}$。相比之下，$2\bar X$是无偏的，方差为$4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n}$。当$n = 5$时：

$$
\operatorname{MSE}(2\bar X) = \frac{\theta^2}{15}\approx0.067\theta^2,\qquad\operatorname{MSE}\Bigl(\tfrac65M\Bigr) = \frac{\theta^2}{35}\approx0.029\theta^2 .
$$

基于最大值的估计量的方差是$1/n^2$阶的，远小于矩估计量的$1/n$阶。对于离散的坦克问题，类似的无偏估计量是$M + M/n - 1$，对序列号$19, 40, 42, 60$，它给出$60 + 15 - 1 = 74$。
:::
:::

::: widget plot
f: 1/(3x); 2/((x + 1)*(x + 2)); 1/(x*(x + 2))
x: 1, 20
y: 0, 0.35
labels: 2\bar X; M; \tfrac{n+1}{n}M
caption: 均匀分布端点$\theta$的三个估计量的均方误差（以$\theta^2$为单位），作为样本量$n$的函数。矩估计量$2\bar X$按$1/n$的速度改进，最大值$M$及其无偏的重新缩放则按$1/n^2$的速度改进。当$n\ge2$时，重新缩放后的最大值最好，尽管最大似然估计是未经缩放的最大值本身。
:::

最大似然估计在重新参数化下表现良好。

::: theorem 最大似然估计的不变性 {#thm-invariance}
若$\hat\theta$是$\theta$的最大似然估计，$g$是单射，则$g(\hat\theta)$是$\eta = g(\theta)$的最大似然估计。
:::

::: proof
用$\eta$来表示，似然函数为$L^*(\eta) = L(g^{-1}(\eta))$。对$g$的值域中的每个$\eta$，$L^*(\eta) = L(g^{-1}(\eta))\le L(\hat\theta) = L^*(g(\hat\theta))$，所以$g(\hat\theta)$使$L^*$达到最大。
:::

（对于不是单射的函数，只要适当地定义$\eta$的似然，即轮廓似然，同样的结论仍然成立。）例如，若把计数建模为$\operatorname{Poisson}(\lambda)$，则$\hat\lambda = \bar x$（见习题），所以计数为零的概率$e^{-\lambda}$的最大似然估计是$e^{-\bar x}$；正态总体标准差的最大似然估计是$\hat\sigma = \sqrt{\hat\sigma^2}$。

::: warning 似然函数不是 θ 的概率分布
$L(\theta)$是在$\theta$的每个取值下**数据**出现的概率（或密度）；它不是$\theta$为真值的概率，它关于$\theta$的积分也不等于$1$。说“$p = 0.35$是$p$最可能的取值”，只是“$p = 0.35$使数据出现的可能性最大”的一种不严谨的说法。要把似然转化为关于参数的概率，需要先验分布和贝叶斯定理——这正是[[statistics/bayesian]]一章的方法。
:::

## 有效性与克拉默-拉奥下界 {#cramer-rao}

无偏估计量的方差能小到什么程度？直观上看，这取决于似然函数的峰有多尖，也就是每个观测值携带了多少关于$\theta$的信息。

::: definition 得分与费希尔信息 {#def-fisher}
对单参数分布族$f(x;\theta)$，一个观测值的**得分**为$\dfrac{\partial}{\partial\theta}\ln f(X;\theta)$，一个观测值中的**费希尔（Fisher）信息**为

$$
I(\theta) = \E_\theta\Bigl[\Bigl(\frac{\partial}{\partial\theta}\ln f(X;\theta)\Bigr)^2\Bigr].
$$ {#eq-fisher}
:::

本节始终假定通常的**正则条件**成立：使$f(x;\theta)>0$的集合不依赖于$\theta$，$f$关于$\theta$可微，并且关于$\theta$的求导可以移到关于$x$的积分（或求和）号内进行。在这些条件下，得分的均值为零：对$\int f(x;\theta)\,dx = 1$求导，得

$$
0 = \int\frac{\partial f}{\partial\theta}\,dx = \int\Bigl(\frac{\partial}{\partial\theta}\ln f\Bigr)f\,dx = \E_\theta\Bigl[\frac{\partial}{\partial\theta}\ln f(X;\theta)\Bigr],
$$

所以$I(\theta)$就是得分的**方差**。再求一次导数可以证明，若二阶导数存在，则$I(\theta) = -\E_\theta\bigl[\frac{\partial^2}{\partial\theta^2}\ln f(X;\theta)\bigr]$——即对数似然函数的平均曲率。

::: theorem 克拉默-拉奥下界 {#thm-cramer-rao}
在正则条件下，设$T = T(X_1,\ldots,X_n)$是基于容量为$n$的随机样本的$\theta$的无偏估计量，其方差有限，并且对$\frac{d}{d\theta}\E_\theta T$允许在积分号下求导。则对每个$\theta$，

$$
\Var_\theta(T)\ge\frac{1}{nI(\theta)}.
$$ {#eq-crlb}
:::

::: proof
设$U = \sum_{i=1}^n\frac{\partial}{\partial\theta}\ln f(X_i;\theta)$为整个样本的得分。它是$n$个相互独立、均值为$0$、方差为$I(\theta)$的项之和，所以$\E_\theta U = 0$，$\Var_\theta U = nI(\theta)$。记联合密度为$L(\theta;\mathbf x) = \prod_if(x_i;\theta)$，于是$U = \frac{\partial}{\partial\theta}\ln L$。由于$T$是无偏的，对所有$\theta$有$\int T(\mathbf x)L(\theta;\mathbf x)\,d\mathbf x = \theta$；在积分号下求导，得

$$
1 = \int T(\mathbf x)\frac{\partial L}{\partial\theta}\,d\mathbf x = \int T(\mathbf x)\Bigl(\frac{\partial}{\partial\theta}\ln L\Bigr)L\,d\mathbf x = \E_\theta(TU) = \Cov_\theta(T,U),
$$

最后一步是因为$\E_\theta U = 0$。由相关系数不等式（[[probability/joint-distributions#thm-correlation-bound]]），$\Cov(T,U)^2\le\Var(T)\Var(U)$，即$1\le\Var_\theta(T)\cdot nI(\theta)$。
:::

方差等于这一下界的无偏估计量称为**有效的**；此时它就是可能的最好的无偏估计量。

::: example 泊松计数 {#ex-poisson-efficient}
对于来自$\operatorname{Poisson}(\lambda)$的随机样本，求$I(\lambda)$，并证明$\bar X$是有效的。
::: solution
$\ln f(x;\lambda) = -\lambda + x\ln\lambda - \ln x!$，所以得分为$-1 + x/\lambda$，并且

$$
I(\lambda) = \Var_\lambda\Bigl(\frac{X}{\lambda}\Bigr) = \frac{\lambda}{\lambda^2} = \frac1\lambda .
$$

下界为$\lambda/n$。由于$\Var\bar X = \Var X/n = \lambda/n$且$\bar X$无偏，它达到了这一下界：在泊松均值的无偏估计量中，没有一个比样本均值更好。（对于正态均值（此时$I = 1/\sigma^2$）和伯努利比例，$\bar X$同样如此；见习题。）
:::
:::

[[#ex-tanks]]中的均匀模型不满足正则条件，因为其支撑集$[0,\theta]$依赖于$\theta$；正因如此，它的估计量才能达到$1/n^2$阶的方差，胜过这一下界在正则问题中所规定的$1/n$速率。

最大似然估计最重要的性质是：在正则问题中，它渐近地达到克拉默-拉奥下界。

::: theorem 最大似然估计的渐近正态性 {#thm-mle-asymptotic}
在正则条件（比上面的条件更强，涉及三阶导数）下，最大似然估计量$\hat\theta_n$是相合的，并且

$$
\sqrt n\,(\hat\theta_n-\theta)\xrightarrow{\;d\;}\Normal\Bigl(0,\frac{1}{I(\theta)}\Bigr).
$$
:::

**证明概要。**在真值附近展开似然方程：$0 = \ell'(\hat\theta_n)\approx\ell'(\theta) + (\hat\theta_n - \theta)\ell''(\theta)$，所以$\sqrt n(\hat\theta_n-\theta)\approx\dfrac{\ell'(\theta)/\sqrt n}{-\ell''(\theta)/n}$。分子是独立同分布的得分之和经标准化后的结果，由中心极限定理，它近似服从$\Normal(0, I(\theta))$；由大数定律，分母收敛于$I(\theta)$。因此这个比值近似服从$\Normal(0, I(\theta)/I(\theta)^2) = \Normal(0, 1/I(\theta))$。要使这一近似严格化，需要控制余项；见卡塞拉（Casella）与伯杰（Berger）的《统计推断》（*Statistical Inference*）第10.1节。

在实践中，这个定理为任何最大似然估计给出了一个近似的**标准误**：$\operatorname{se}(\hat\theta)\approx1/\sqrt{nI(\hat\theta)}$。对于[[#ex-mle-exponential]]中的指数等待时间，$\ln f = \ln\lambda - \lambda x$的二阶导数为$-1/\lambda^2$，所以$I(\lambda) = 1/\lambda^2$，$\operatorname{se}(\hat\lambda)\approx\hat\lambda/\sqrt n = 0.5/\sqrt8\approx0.18$次/分钟。这类标准误是[[statistics/confidence-intervals]]一章中大样本置信区间的基础。

::: quiz
在正则的单参数模型中，下列哪一项是最大似然估计量一定具有的性质？
- [ ] 对每个样本量，它都是无偏的。
- [ ] 在所有估计量中，它的方差最小。
- [x] 它是相合的，并且当$n$很大时近似服从方差为$1/(nI(\theta))$的正态分布。
- [ ] 它总可以通过解$\ell'(\theta) = 0$求得。
::: solution
最大似然估计在有限样本下常常是有偏的（正态方差的最大似然估计除以$n$），有偏估计量的方差可能更小，而且最大值点可能位于边界上（均匀分布的例子）。在正则条件下，最大似然法所保证的是良好的**大样本**性质：相合性和渐近有效性。
:::
:::

::: history
1809年，卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在误差服从正态分布的假定下求未知量的“最可能”值，以此论证最小二乘法的合理性，这相当于平坦先验下的最大似然估计。1894年，卡尔·皮尔逊（Karl Pearson）用两个正态分布的混合去拟合螃蟹的测量数据，由此引入了矩估计法。罗纳德·费希尔（Ronald Fisher）在1912年还是本科生时就提出了最大似然法，并在《论理论统计学的数学基础》（“On the mathematical foundations of theoretical statistics”，1922年）中引入了这门学科的基本词汇：相合性、有效性、充分性以及似然本身；信息量的概念则在1925年随之提出。无偏估计量方差的下界是由几位作者在20世纪40年代各自独立发现的，其中包括莫里斯·弗雷歇（Maurice Fréchet，1943年）、C. R. 拉奥（C. R. Rao，1945年）和哈拉尔德·克拉默（Harald Cramér，1946年）。德国坦克问题是由盟军的经济学家和统计学家解决的，其中包括理查德·拉格尔斯（Richard Ruggles）和亨利·布罗迪（Henry Brodie），他们在1947年发表了自己所用的方法。
:::

## 后续内容 {#where-next}

点估计若不附带对其不确定性的说明，就是不完整的：[[statistics/confidence-intervals]]一章把抽样分布和标准误转化为区间估计。似然比给出最大功效检验（[[statistics/hypothesis-testing]]）。最小二乘法是[[statistics/regression]]一章的主题，它就是误差服从正态分布时的最大似然估计；由高斯-马尔可夫（Gauss–Markov）定理，它给出的估计量在线性无偏估计量中是最优的。在[[statistics/bayesian]]一章中，似然函数与先验分布相结合，后验均值自然地成为一个估计量，它以少许偏差换取更小的均方误差。下一步是充分统计量和最小方差无偏估计量的理论（拉奥-布莱克韦尔（Rao–Blackwell）定理和莱曼-谢费（Lehmann–Scheffé）定理）；见卡塞拉与伯杰的书。

::: summary
- 估计量要在重复抽样中评判：$\operatorname{MSE} = \text{方差} + \text{偏差}^2$；无偏性是一种理想的性质，但不是唯一的。
- 如果估计量依概率收敛于$\theta$，则它是相合的；均方误差趋于$0$是相合的充分条件。
- 矩估计法：令样本矩与总体矩相等。它简单且相合，但有时不够有效，甚至可能给出在已知数据下不可能的值。
- 最大似然法：使$L(\theta) = \prod f(x_i;\theta)$最大，通常通过解$\ell'(\theta) = 0$求得，但要检查边界和不可导的情形。
- 最大似然估计在重新参数化下具有不变性，在小样本下常常有偏；在正则模型中它是相合的，并且渐近服从$\Normal(\theta, 1/(nI(\theta)))$。
- 克拉默-拉奥下界：在正则模型中，无偏估计量满足$\Var\ge1/(nI(\theta))$；对于泊松均值、伯努利均值和正态均值，$\bar X$达到这一下界。
- 似然函数描述的是在每个参数值下数据出现的可能性有多大；它不是参数的概率分布。
:::

## 习题

::: exercise 样本比例 {level=1 check="37/120"}
在一项对随机选取的$120$户家庭的调查中，有$37$户拥有电动汽车。给出拥有电动汽车的家庭所占比例的最大似然估计值。
::: solution
由[[#ex-mle-bernoulli]]，$\hat p = 37/120\approx0.308$。
:::
:::

::: exercise 计算偏差 {level=1 check="-0.4"}
对于来自方差为$\sigma^2 = 4$的总体、容量为$n = 10$的样本，求$\hat\sigma^2 = \frac1n\sum(X_i - \bar X)^2$的偏差。
::: solution
$\hat\sigma^2 = \frac{n-1}{n}S^2$的数学期望为$\frac{n-1}{n}\sigma^2$，所以它的偏差为$-\sigma^2/n = -4/10 = -0.4$。
:::
:::

::: exercise 指数分布的速率 {level=1 check="2/3"}
六个部件的寿命（单位：年）为$2.1, 0.4, 1.3, 3.0, 0.7, 1.5$。假设服从$\operatorname{Exp}(\lambda)$模型，求$\lambda$的最大似然估计值。
::: solution
由[[#ex-mle-exponential]]，$\hat\lambda = 1/\bar x = 6/9.0 = 2/3$（每年）。
:::
:::

::: exercise 泊松概率 {level=2 check="exp(-2)"}
八场足球比赛的进球数分别为$2, 0, 3, 1, 1, 4, 2, 3$。假设服从$\operatorname{Poisson}(\lambda)$模型，证明$\lambda$的最大似然估计是$\bar x$，并求一场比赛没有进球的概率的最大似然估计。
::: solution
$\ell(\lambda) = -n\lambda + \bigl(\sum x_i\bigr)\ln\lambda - \sum\ln x_i!$，所以由$\ell'(\lambda) = -n + \sum x_i/\lambda = 0$得$\hat\lambda = \bar x$（且$\ell''<0$）。这里$\bar x = 16/8 = 2$。由不变性（[[#thm-invariance]]），$\Prob(X = 0) = e^{-\lambda}$的最大似然估计为$e^{-2}\approx0.135$。
:::
:::

::: exercise 比较均匀分布的估计量 {level=2 check="2"}
对于来自$\operatorname{U}(0,\theta)$的容量为$n = 4$的样本，求比值$\operatorname{MSE}(2\bar X)/\operatorname{MSE}\bigl(\tfrac54M\bigr)$，其中$M$是样本最大值。
::: solution
由[[#ex-tanks]]，$\operatorname{MSE}(2\bar X) = \theta^2/(3n) = \theta^2/12$，$\operatorname{MSE}\bigl(\frac{n+1}{n}M\bigr) = \theta^2/(n(n+2)) = \theta^2/24$。比值为$2$：即使只有四个观测值，基于最大值的估计量的效率也高出一倍。
:::
:::

::: exercise 幂函数型密度 {level=2 check="-4/ln(0.216)"}
样本$x_1,\ldots,x_n$来自$(0,1)$上的密度$f(x;\theta) = \theta x^{\theta-1}$，其中$\theta>0$。求$\theta$的最大似然估计，并对数据$0.5, 0.8, 0.9, 0.6$求出它的值。
::: solution
$\ell(\theta) = n\ln\theta + (\theta-1)\sum\ln x_i$，所以由$\ell'(\theta) = n/\theta + \sum\ln x_i = 0$得$\hat\theta = -n/\sum_i\ln x_i$（它是正的，因为每个$\ln x_i<0$），并且$\ell''(\theta) = -n/\theta^2<0$。这里$\sum\ln x_i = \ln(0.5\times0.8\times0.9\times0.6) = \ln0.216\approx-1.532$，所以$\hat\theta = -4/\ln0.216\approx2.61$。
:::
:::

::: exercise 几何分布的参数 {level=2 check="1/3"}
一名学生通过五项相互独立的驾驶考试（每次成功的概率都是$p$）所需的尝试次数分别为$3, 1, 4, 2, 5$。在几何分布模型下求$p$的最大似然估计。
::: solution
对于$\operatorname{Geom}(p)$，$L(p) = \prod p(1-p)^{x_i-1} = p^n(1-p)^{\sum x_i - n}$，所以由$\ell'(p) = n/p - (\sum x_i - n)/(1-p) = 0$得$\hat p = n/\sum x_i = 1/\bar x$。这里$\bar x = 15/5 = 3$，所以$\hat p = \tfrac13$。
:::
:::

::: exercise 样本最大值是相合的 {level=3}
对于来自$\operatorname{U}(0,\theta)$的随机样本，直接由定义证明$M = \max_iX_i$是$\theta$的相合估计。
::: solution
由于总有$M\le\theta$，当$0<\eps<\theta$时，

$$
\Prob(\lvert M-\theta\rvert\ge\eps) = \Prob(M\le\theta-\eps) = \Prob(\text{所有 } X_i\le\theta-\eps) = \Bigl(1 - \frac\eps\theta\Bigr)^n\to0,
$$

而当$\eps\ge\theta$时，该概率为$0$。（另一种方法：$\operatorname{MSE}(M) = \frac{2\theta^2}{(n+1)(n+2)}\to0$，再应用[[#thm-consistency]]即可。）
:::
:::

::: exercise 比例估计的有效性 {level=3}
设$X\sim\operatorname{Bernoulli}(p)$，$0<p<1$。证明$I(p) = \dfrac{1}{p(1-p)}$，并由此推出样本比例是$p$的有效估计量。
::: solution
对$x\in\{0,1\}$，$\ln f(x;p) = x\ln p + (1-x)\ln(1-p)$，所以得分为$\frac xp - \frac{1-x}{1-p} = \frac{x - p}{p(1-p)}$。它的方差为$\dfrac{\Var X}{p^2(1-p)^2} = \dfrac{p(1-p)}{p^2(1-p)^2} = \dfrac{1}{p(1-p)}$。因此，基于$n$个观测值的无偏估计量的克拉默-拉奥下界为$p(1-p)/n$，这恰好等于$\Var\bar X$；由于$\bar X$是无偏的，它是有效的。
:::
:::

::: exercise 胜过无偏估计量的有偏估计量 {level=3}
设$X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$，其中$\sigma^2$已知；考虑$\mu$的收缩估计量$c\bar X$，其中$c$为常数，$0\le c\le1$。证明$\operatorname{MSE}(c\bar X) = c^2\sigma^2/n + (1-c)^2\mu^2$，并证明当$\mu^2<\sigma^2/n$时，估计量$\tfrac12\bar X$的均方误差比$\bar X$的小。为什么在实践中不能用这一点来改进$\bar X$？
::: solution
$c\bar X$的均值为$c\mu$（偏差为$(c-1)\mu$），方差为$c^2\sigma^2/n$，所以由[[#thm-mse]]即得该公式。当$c = \tfrac12$时，均方误差为$\frac{\sigma^2}{4n} + \frac{\mu^2}{4}$，它小于$\operatorname{MSE}(\bar X) = \sigma^2/n$当且仅当$\mu^2<3\sigma^2/n$，特别地，当$\mu^2<\sigma^2/n$时成立。但这个条件是否成立取决于未知的$\mu$；当$\lvert\mu\rvert$很大时，收缩后的估计量要差得多。没有一个估计量能对每个$\theta$同时具有最小的均方误差，这就是为什么我们需要无偏性这样的准则，或者像[[statistics/bayesian]]一章那样引入先验分布——在那里，向先验均值收缩是自然而然的。
:::
:::
