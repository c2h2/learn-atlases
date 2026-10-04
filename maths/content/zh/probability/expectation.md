在一次聚会上，$n$位客人把帽子寄存在门口，晚会结束时，帽子被随机地还给他们。平均有多少位客人拿回了自己的帽子？在[[probability/probability-spaces]]一章中，我们用容斥原理求出了**没有一个人**拿回自己帽子的概率；要求出配对个数的完整分布，还需要更多的工作。然而，配对个数的**平均值**只用一行就能求出，答案是$1$——无论有$3$位客人还是$3$百万位客人。使这一点成为可能的工具是**期望的线性性**，它的成立不需要任何独立性假设。

本章汇集了用数学期望进行计算的最有力的技巧。我们从线性性和**示性变量**方法讲起。然后定义**条件期望**，即给定一个随机变量的值时另一个随机变量的期望值，并证明全期望公式和全方差公式，它们使我们能够分阶段地分析一个随机量。最后介绍**生成函数**：概率生成函数$\E s^X$和矩母函数$\E e^{tX}$把整个分布编码在一个函数中，把独立随机变量之和变成乘积，并且为求矩、求种群的灭绝概率以及证明中心极限定理提供了最有效的途径。

## 期望的线性性 {#linearity}

在[[probability/joint-distributions]]一章中我们看到，对离散型或联合连续的随机变量，$\E(X+Y) = \E X + \E Y$，这是$\E g(X,Y)$的公式的推论。用归纳法可以把它推广到任意有限多项。

::: theorem 期望的线性性 {#thm-linearity}
若$X_1,\ldots,X_n$的数学期望都存在，$a_1,\ldots,a_n,b$为常数，则

$$
\E\Bigl(\sum_{i=1}^na_iX_i + b\Bigr) = \sum_{i=1}^na_i\,\E X_i + b .
$$

这里不需要任何独立性假设。
:::

::: proof
当$n = 1$时，这就是$\E(aX+b) = a\E X + b$（[[probability/discrete-random-variables]]，[[probability/continuous-random-variables]]）。假设结论对$n-1$项成立，记$S = \sum_{i<n}a_iX_i$。则$\sum_{i\le n}a_iX_i + b = S + (a_nX_n + b)$，由两个变量的情形，$\E(S + a_nX_n + b) = \E S + \E(a_nX_n + b) = \sum_{i<n}a_i\E X_i + a_n\E X_n + b$，其中对$\E S$用了归纳假设。（两个变量的情形是对离散型和联合连续的随机变量对证明的；在完全一般的情形下，它是勒贝格积分的一个基本性质，见[[measure-theory/lebesgue-integral]]。）
:::

线性性的威力来自它与**示性变量**的结合。要求事件$A_1,\ldots,A_n$中发生的个数的期望，可以把这个个数写成$N = \mathbf{1}_{A_1}+\dots+\mathbf{1}_{A_n}$；由于$\E\mathbf{1}_{A_i} = \Prob(A_i)$，

$$
\E N = \sum_{i=1}^n\Prob(A_i).
$$ {#eq-indicator-method}

这些事件之间可以有复杂的依赖关系，但这并不要紧。

::: example 帽子配对 {#ex-hats}
把$n\ge2$顶帽子按均匀随机的顺序还给它们的$n$位主人。设$N$为拿到自己帽子的人数。求$\E N$和$\Var N$。
::: solution
设$A_i$为客人$i$拿到自己帽子这一事件。在均匀随机置换下，帽子$i$等可能地分给$n$位客人中的每一位，所以$\Prob(A_i) = 1/n$，由[[#eq-indicator-method]]，

$$
\E N = n\cdot\frac1n = 1 .
$$

求方差时需要这些示性变量的协方差。对$i\ne j$，$\Prob(A_i\cap A_j) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}$，所以

$$
\Cov(\mathbf{1}_{A_i},\mathbf{1}_{A_j}) = \frac{1}{n(n-1)} - \frac{1}{n^2} = \frac{1}{n^2(n-1)} .
$$

这些示性变量是正相关的：如果客人$i$拿对了帽子，其余的帽子配对的可能性就会稍大一些。由[[probability/joint-distributions#thm-covariance]]，把$n$个方差$\frac1n(1-\frac1n)$与$n(n-1)$个有序对的协方差相加，得

$$
\Var N = n\cdot\frac1n\Bigl(1 - \frac1n\Bigr) + n(n-1)\cdot\frac{1}{n^2(n-1)} = 1 - \frac1n + \frac1n = 1 .
$$

对每个$n\ge2$，均值和方差都等于$1$——与$\operatorname{Poisson}(1)$随机变量相同；事实上，$N$的分布收敛于$\operatorname{Poisson}(1)$，我们在[[probability/probability-spaces]]一章中已经看到$\Prob(N = 0)\to e^{-1}$。
:::
:::

::: widget distribution
dist: poisson
params: lambda=1
caption: $\operatorname{Poisson}(1)$分布，即随机置换的不动点个数的极限分布。$\Prob(N = 0) = \Prob(N = 1) = e^{-1}\approx0.368$，而出现三个或更多配对的概率只有约$8\%$。对于有$10$位客人的聚会，精确概率与这些值大约在小数点后六位以内一致。
:::

示性变量还可以证实[[probability/discrete-random-variables]]一章中关于不放回抽样的论断。

::: example 超几何分布的均值与方差 {#ex-hypergeometric}
从$N$个物品中不放回地抽取$n$个组成样本，这$N$个物品中有$K$个是“成功”。设$X$为样本中的成功个数，$p = K/N$。证明$\E X = np$，$\Var X = np(1-p)\dfrac{N-n}{N-1}$。
::: solution
设$A_i$为第$i$次抽到的物品是成功这一事件。由对称性，每次抽到$N$个物品中任何一个的可能性都相同，所以$\Prob(A_i) = p$，$\E X = np$。对$i\ne j$，第$i$次和第$j$次抽到的物品组成的有序对，等可能地是由不同物品组成的任何一个有序对，所以$\Prob(A_i\cap A_j) = \frac{K(K-1)}{N(N-1)}$，并且

$$
\Cov(\mathbf{1}_{A_i},\mathbf{1}_{A_j}) = \frac{K(K-1)}{N(N-1)} - \frac{K^2}{N^2} = \frac{K\bigl((K-1)N - K(N-1)\bigr)}{N^2(N-1)} = -\frac{p(1-p)}{N-1}.
$$

因此

$$
\Var X = np(1-p) - n(n-1)\frac{p(1-p)}{N-1} = np(1-p)\Bigl(1 - \frac{n-1}{N-1}\Bigr) = np(1-p)\frac{N-n}{N-1}.
$$

负的协方差（抽出一个成功后，留给后面的成功就少了）使方差小于二项分布的方差$np(1-p)$；如果抽取的是整个总体，即$n = N$，方差就是$0$，这理应如此。
:::
:::

::: example 赠券收集问题 {#ex-coupon}
每盒麦片中装有$n$种不同玩具中的一种，每种的可能性相同，且与其他盒子相互独立。平均要买多少盒，才能集齐全部$n$种玩具？
::: solution
设$T$为所买的盒数，把它写成$T = T_1 + T_2 + \dots + T_n$，其中$T_k$是在第$(k-1)$种新玩具出现之后、直到（并包括）装有第$k$种新玩具的那一盒为止所买的盒数。当你已有$k-1$种不同的玩具时，每一盒独立地以概率$\frac{n-k+1}{n}$装有一种新玩具，所以$T_k\sim\operatorname{Geom}\bigl(\frac{n-k+1}{n}\bigr)$，其均值为$\frac{n}{n-k+1}$。由线性性，

$$
\E T = \sum_{k=1}^n\frac{n}{n-k+1} = n\Bigl(1 + \frac12 + \frac13 + \dots + \frac1n\Bigr) = nH_n,
$$

其中$H_n$是第$n$个调和数。当$n = 6$（掷出一颗骰子的全部六个面）时，结果是$14.7$次；当$n = 50$时，约为$225$盒。由于$H_n\approx\ln n + 0.577$，期望值按$n\ln n$的量级增长：最后几种玩具占去了大部分时间，仅最后一种平均就需要$n$盒。
:::
:::

::: warning 线性性适用于和，而不适用于乘积或其他函数
$\E(X+Y) = \E X+\E Y$总是成立，但$\E(XY) = \E X\,\E Y$需要额外的信息，例如独立性（而且一般不成立：取$Y = X$，则除非$X$是常数，否则$\E X^2\ne(\E X)^2$）。同样，一般来说$\E\max(X,Y)\ne\max(\E X,\E Y)$，$\E(1/X)\ne1/\E X$。在赠券收集问题中，一个常见的错误是这样论证：“每一盒中出现某种玩具的概率为$1/n$，所以平均买$n$盒就够了”。这混淆了直到**某一种特定**玩具出现所需的期望盒数（$n$）与直到**所有**玩具都出现所需的时间（$nH_n$）。
:::

::: quiz
一个房间里有十个人，他们的生日相互独立，且在$365$天中均匀分布。生日相同的人对的期望个数是多少？
- [ ] $10/365$
- [x] $45/365$
- [ ] $1 - \prod_{k=0}^{9}(1 - k/365)$
- [ ] $90/365$
::: solution
共有$\binom{10}{2} = 45$对，每一对生日相同的概率为$\frac{1}{365}$。由线性性，生日相同的对数的期望为$45/365\approx0.123$，尽管不同的对所对应的事件并不独立。第三个选项是**至少有一对**生日相同的概率（$\approx0.117$）——数值接近，但却是另一个量。
:::
:::

## 条件期望 {#conditional-expectation}

给定$Y = y$时$X$的条件分布（[[probability/joint-distributions]]）是一个概率分布，因此它有均值。

::: definition 条件期望 {#def-conditional-expectation}
**给定$Y = y$时$X$的条件期望**是条件分布的均值：

$$
\E(X\mid Y=y) = \sum_xx\,p_{X\mid Y}(x\mid y)\qquad\text{或}\qquad\E(X\mid Y=y) = \int_{-\infty}^\infty x\,f_{X\mid Y}(x\mid y)\,dx,
$$

两式分别用于离散情形和联合连续情形。若$g(y) = \E(X\mid Y = y)$，则随机变量$g(Y)$记作$\E(X\mid Y)$。
:::

重要的是，$\E(X\mid Y)$是一个**随机变量**：它是$Y$的函数，其值是在已知$Y$之后对$X$的最佳预测。对于圆盘内的均匀随机点（[[probability/joint-distributions#ex-disc]]），由对称性，$\E(Y\mid X) = 0$；对于标准二维正态分布（[[probability/joint-distributions#prop-bivariate-normal]]），$\E(Y\mid X) = \rho X$。最重要的性质是：把条件期望对$Y$取平均，就回到无条件期望。

::: theorem 全期望公式 {#thm-tower}
若$X$的数学期望存在，则

$$
\E\bigl[\E(X\mid Y)\bigr] = \E X .
$$ {#eq-tower}

在离散情形，它就是$\E X = \sum_y\E(X\mid Y = y)\,\Prob(Y = y)$。
:::

::: proof
在离散情形，记$g(y) = \E(X\mid Y=y)$，则

$$
\E g(Y) = \sum_yg(y)p_Y(y) = \sum_y\sum_xx\frac{p_{X,Y}(x,y)}{p_Y(y)}p_Y(y) = \sum_xx\sum_yp_{X,Y}(x,y) = \sum_xx\,p_X(x) = \E X .
$$

交换求和次序是合理的，因为用$\lvert x\rvert$代替$x$做同样的计算，得到的是有限值$\E\lvert X\rvert$。连续情形完全相同，只需改用积分和密度，并利用$f_{X\mid Y}(x\mid y)f_Y(y) = f_{X,Y}(x,y)$。
:::

全期望公式是全概率公式的期望版本，用法也相同：要计算$\E X$，就对能使问题变简单的任何量取条件。另外两条法则也很直观，并且同样可由定义推出：若$X$与$Y$独立，则$\E(X\mid Y) = \E X$（知道$Y$无助于预测$X$）；对任意函数$h$，$\E\bigl(h(Y)X\mid Y\bigr) = h(Y)\,\E(X\mid Y)$（一旦知道了$Y$，$h(Y)$就像常数一样）。

::: example 等待连续两次正面 {#ex-hh}
反复抛掷一枚均匀的硬币，直到连续出现两次正面为止。求抛掷次数的期望。
::: solution
设$\mu$为从开始算起的期望抛掷次数，$\mu_H$为最后一次抛出正面（但游戏尚未结束）时**还**需要的期望抛掷次数。对下一次抛掷取条件（**首步分析**）。从开始状态抛掷一次：以概率$\tfrac12$得到反面，回到开始状态；以概率$\tfrac12$得到正面：

$$
\mu = 1 + \tfrac12\mu + \tfrac12\mu_H .
$$

在一次正面之后，再抛一次，要么结束游戏（正面），要么把我们送回开始状态（反面）：

$$
\mu_H = 1 + \tfrac12\cdot0 + \tfrac12\mu .
$$

这里用到了全期望公式以及各次抛掷的独立性：独立性意味着在出现一次反面之后，未来的情形与开始时完全一样。把第二个方程代入第一个，得$\mu = 1 + \tfrac12\mu + \tfrac12 + \tfrac14\mu$，所以$\tfrac14\mu = \tfrac32$，$\mu = 6$。（令人惊讶的是，等待“先正面后反面”平均只需$4$次抛掷：见习题。）
:::
:::

取条件还可以分解方差。

::: theorem 全方差公式 {#thm-total-variance}
定义条件方差$\Var(X\mid Y) = \E\bigl(X^2\mid Y\bigr) - \bigl(\E(X\mid Y)\bigr)^2$。若$\E X^2<\infty$，则

$$
\Var X = \E\bigl[\Var(X\mid Y)\bigr] + \Var\bigl(\E(X\mid Y)\bigr).
$$ {#eq-total-variance}
:::

::: proof
记$g(Y) = \E(X\mid Y)$。对$X^2$应用全期望公式，得

$$
\E\bigl[\Var(X\mid Y)\bigr] = \E\bigl[\E(X^2\mid Y)\bigr] - \E\bigl[g(Y)^2\bigr] = \E X^2 - \E\bigl[g(Y)^2\bigr],
$$

又由于$\E g(Y) = \E X$，

$$
\Var g(Y) = \E\bigl[g(Y)^2\bigr] - (\E X)^2 .
$$

两式相加即得$\E X^2 - (\E X)^2 = \Var X$。
:::

这两项有明确的含义：$X$的总变异性等于各组（固定$Y$）**组内**变异性的平均值，加上各组均值**之间**的变异性。这一分解是统计学中方差分析的基础。

::: example 随机和与保险 {#ex-random-sum}
一家保险公司一年内收到$N$笔索赔，$N\sim\operatorname{Poisson}(100)$。索赔金额$X_1,X_2,\ldots$相互独立，且与$N$独立，均值为2000英镑，标准差为1500英镑。求总额$S = X_1+\dots+X_N$的均值和标准差。
::: solution
记$m = \E X_i$，$s^2 = \Var X_i$。给定$N = n$时，总额是$n$笔独立索赔之和（由独立性，它们的分布不受$N$的取值影响），所以$\E(S\mid N) = Nm$，$\Var(S\mid N) = Ns^2$。由全期望公式和全方差公式，

$$
\E S = \E(Nm) = m\,\E N,\qquad\Var S = \E(Ns^2) + \Var(Nm) = s^2\,\E N + m^2\Var N .
$$

由$\E N = \Var N = 100$得：$\E S = \pounds200\,000$，$\Var S = 100\,(1500^2 + 2000^2) = 6.25\times10^8$，所以标准差为25000英镑。注意，索赔**笔数**的随机性对方差的贡献（$m^2\Var N = 4\times10^8$）比索赔金额的随机性（$s^2\E N = 2.25\times10^8$）更大。公式$\E S = \E N\,\E X$称为**瓦尔德（Wald）恒等式**。
:::
:::

::: example 正面概率未知的硬币 {#ex-unknown-bias}
一枚硬币出现正面的概率$P$本身是随机的，在$[0,1]$上均匀分布。给定$P = p$时，把这枚硬币独立地抛掷$n$次。求正面次数$X$的均值和方差。
::: solution
给定$P$时，$X\sim\Bin(n,P)$，所以$\E(X\mid P) = nP$，$\Var(X\mid P) = nP(1-P)$。利用$\E P = \tfrac12$，$\E P^2 = \tfrac13$，$\Var P = \tfrac1{12}$，得

$$
\E X = n\,\E P = \frac n2,\qquad\Var X = n\,\E\bigl[P(1-P)\bigr] + n^2\Var P = n\Bigl(\frac12 - \frac13\Bigr) + \frac{n^2}{12} = \frac{n(n+2)}{12}.
$$

对于一枚均匀的硬币，方差将是$n/4$；对硬币正面概率的不确定性把方差放大到了$n^2$的量级。事实上，$X$恰好在$\{0,1,\ldots,n\}$上服从**均匀**分布（其方差恰为$n(n+2)/12$），这一结果本质上应归功于托马斯·贝叶斯（Thomas Bayes），在[[statistics/bayesian]]中还会再次讨论。
:::
:::

## 概率生成函数 {#pgf}

对于取值于$\{0,1,2,\ldots\}$的随机变量，整个概率序列可以打包成一个幂级数。

::: definition 概率生成函数 {#def-pgf}
设$X$取值于$\{0,1,2,\ldots\}$，$p_k = \Prob(X = k)$。$X$的**概率生成函数**（pgf）为

$$
G_X(s) = \E\,s^X = \sum_{k=0}^\infty p_ks^k,
$$

它至少对$\lvert s\rvert\le1$有定义，因为$\sum p_k = 1$，级数在那里绝对收敛。
:::

下面是一些例子，每一个都可以由定义经简短计算得到（记$q = 1-p$）：

| 分布 | $\operatorname{Bernoulli}(p)$ | $\Bin(n,p)$ | $\operatorname{Geom}(p)$ | $\operatorname{Poisson}(\lambda)$ |
|---|---|---|---|---|
| 概率生成函数$G(s)$ | $q + ps$ | $(q+ps)^n$ | $\dfrac{ps}{1-qs}$ | $e^{\lambda(s-1)}$ |

例如，对泊松分布，$\E s^X = \sum_ke^{-\lambda}\lambda^ks^k/k! = e^{-\lambda}e^{\lambda s}$。数列的生成函数已在[[discrete/generating-functions]]中出现过；这里的数列是一个概率分布。

::: theorem 概率生成函数的性质 {#thm-pgf}
设$X$、$Y$取值于$\{0,1,2,\ldots\}$。

1. （唯一性）$G_X$决定分布：$p_k = G_X^{(k)}(0)/k!$。
2. （矩）$\E X = G_X'(1)$，$\E[X(X-1)] = G_X''(1)$，其中在$1$处的导数指左导数，可以是无穷大。
3. （和）若$X$与$Y$独立，则$G_{X+Y}(s) = G_X(s)\,G_Y(s)$。
4. （随机和）若$N, X_1, X_2,\ldots$相互独立，各$X_i$的概率生成函数都是$G_X$，且$S = X_1+\dots+X_N$（当$N = 0$时$S = 0$），则$G_S(s) = G_N\bigl(G_X(s)\bigr)$。
:::

::: proof
(1) $G_X$是收敛半径至少为$1$的幂级数，所以在$\lvert s\rvert<1$内可以逐项求导，其系数可由$G_X^{(k)}(0)/k!$还原（[[calculus-2/power-series]]）。

(2) 对$0\le s<1$，$G_X'(s) = \sum_{k\ge1}kp_ks^{k-1}$。当$s$递增趋于$1$时，每一项递增趋于$kp_k$，所以和递增趋于$\sum_kkp_k = \E X$（对于非负项级数，极限可以逐项取；这就是阿贝尔（Abel）定理）。二阶导数用同样的方法处理，其各项为$k(k-1)p_ks^{k-2}$。

(3) $s^{X+Y} = s^Xs^Y$，而$s^X$与$s^Y$独立（它们是独立随机变量的函数），所以由[[probability/joint-distributions#thm-product]]，$\E s^{X+Y} = \E s^X\,\E s^Y$。

(4) 对$N$取条件。给定$N = n$时，$S$是$n$个概率生成函数为$G_X$的独立随机变量之和，所以由(3)，$\E(s^S\mid N = n) = G_X(s)^n$。由全期望公式，$G_S(s) = \E\bigl[G_X(s)^N\bigr] = G_N\bigl(G_X(s)\bigr)$。
:::

第(3)条把[[probability/joint-distributions#thm-convolution]]中的卷积变成了乘积。例如，$\Bin(n,p)$的概率生成函数是伯努利分布的概率生成函数的$n$次幂，因为二项随机变量是$n$个独立的伯努利随机变量之和；又如，两个独立的泊松随机变量满足$G_{X+Y}(s) = e^{\lambda(s-1)}e^{\mu(s-1)} = e^{(\lambda+\mu)(s-1)}$，这就用一行证明了它们的和服从$\operatorname{Poisson}(\lambda+\mu)$。

::: example 泊松计数的稀疏化 {#ex-thinning}
一只母鸡产下$N\sim\operatorname{Poisson}(\lambda)$个蛋，每个蛋以概率$p$孵化，且与其他一切相互独立。求孵出的小鸡只数的分布。
::: solution
小鸡只数为$S = X_1+\dots+X_N$，其中$X_i\sim\operatorname{Bernoulli}(p)$表示第$i$个蛋是否孵化。由[[#thm-pgf]]的第(4)条，取$G_X(s) = q + ps$，$G_N(s) = e^{\lambda(s-1)}$，得

$$
G_S(s) = e^{\lambda(q + ps - 1)} = e^{\lambda p(s-1)},
$$

这是$\operatorname{Poisson}(\lambda p)$的概率生成函数。由唯一性，$S\sim\operatorname{Poisson}(\lambda p)$。个数服从泊松分布的一批事件，若每个事件都独立地以概率$p$被保留，则保留下来的个数仍服从泊松分布。
:::
:::

### 分支过程

对于弗朗西斯·高尔顿（Francis Galton）提出的一个经典问题——一个姓氏会不会消亡？——生成函数是自然的工具。在**高尔顿-沃森（Galton–Watson）分支过程**中，每个个体独立于其他所有个体，生育随机个孩子，孩子个数的概率生成函数为$G$；$Z_n$为第$n$代的规模，初始值$Z_0 = 1$。由于$Z_{n+1}$是$Z_n$个独立的后代个数的随机和，[[#thm-pgf]]的第(4)条给出$G_{Z_{n+1}} = G_{Z_n}\circ G$，由归纳法，$Z_n$的概率生成函数是$n$重复合$G_n = G\circ G\circ\dots\circ G$。

::: theorem 灭绝概率 {#thm-extinction}
种群最终灭绝的概率$\eta$是$G(s) = s$的最小非负解。若平均孩子数$m = G'(1)$满足$m\le1$（且$\Prob(\text{恰有一个孩子})<1$），则$\eta = 1$；若$m>1$，则$\eta<1$。
:::

::: proof
令$e_n = \Prob(Z_n = 0) = G_n(0)$。到第$n$代已灭绝蕴含到第$n+1$代已灭绝，所以$e_n$递增，由概率的连续性，$e_n\to\eta = \Prob(\text{灭绝})$。由于$e_{n+1} = G(e_n)$且$G$在$[0,1]$上连续，令$n\to\infty$得$\eta = G(\eta)$。若$\psi\ge0$是$G(\psi) = \psi$的任意一个解，则$e_0 = 0\le\psi$；又若$e_n\le\psi$，则由于$G$递增，$e_{n+1} = G(e_n)\le G(\psi) = \psi$；所以对所有$n$都有$e_n\le\psi$，从而$\eta\le\psi$。因此$\eta$是这样的解中最小的一个。

关于判别准则（证明概要）：$G$在$[0,1]$上是凸函数，且$G(1) = 1$。若$m = G'(1)>1$，则当$s$略小于$1$时$G(s)<s$，而$G(0)\ge0$，所以由介值定理，$G(s) = s$在$[0,1)$中有一个根，从而$\eta<1$。若$m\le1$，由凸性得$G(s)\ge1 - m(1-s)\ge s$，并且除非$G(s) = s$恒成立（即每个个体都恰有一个孩子），否则对$s<1$不等式严格成立；所以$[0,1]$中唯一的根是$1$。
:::

::: widget plot
f: exp(m*(x - 1)); x
x: 0, 1
y: 0, 1
sliders: m=1.5:0.2:3:0.05
labels: G(s) = e^{m(s-1)}; s
caption: 后代个数服从$\operatorname{Poisson}(m)$的分支过程。灭绝概率就是曲线$G(s)$与对角线第一次相交的位置。当$m\le1$时，两者只在$s = 1$处相交：灭绝是必然的。当$m$增大超过$1$时，出现第二个交点，并且它向左移动；当$m = 1.5$时，交点位于$s\approx0.417$，所以由一个个体开始的种群以约$0.58$的概率永远延续下去。
:::

## 矩母函数 {#mgf}

对于不取整数值的随机变量，我们用$e^{tX}$代替$s^X$（形式上令$s = e^t$）。

::: definition 矩母函数 {#def-mgf}
随机变量$X$的**矩母函数**（mgf）为

$$
M_X(t) = \E\,e^{tX},
$$

它对使该期望有限的那些$t$有定义。若存在某个区间$(-h,h)$（$h>0$），使得对其中所有$t$都有$M_X(t)<\infty$，则称$X$**有矩母函数**。
:::

::: theorem 矩母函数的性质 {#thm-mgf}
设$X$与$Y$都有矩母函数。

1. （矩）当$\lvert t\rvert<h$时，$M_X(t) = \sum_{k=0}^\infty\dfrac{\E X^k}{k!}t^k$；特别地，各阶矩都有限，且$\E X^k = M_X^{(k)}(0)$。
2. （和）若$X$与$Y$独立，则$M_{X+Y}(t) = M_X(t)M_Y(t)$；此外，$M_{aX+b}(t) = e^{bt}M_X(at)$。
3. （唯一性）若对某个区间$(-h,h)$中的所有$t$都有$M_X(t) = M_Y(t)$，则$X$与$Y$同分布。
:::

::: proof
(1) *证明概要。*展开$e^{tX} = \sum_k(tX)^k/k!$。当$\lvert t\rvert<h$时，$\sum_k\lvert tX\rvert^k/k! = e^{\lvert tX\rvert}\le e^{tX} + e^{-tX}$，而后者的期望$M_X(t) + M_X(-t)$有限。这一控制使我们可以逐项取期望（由控制收敛定理，[[measure-theory/lebesgue-integral]]），从而得到该幂级数；幂级数的系数等于它在$0$处的各阶导数除以$k!$。

(2) $e^{t(X+Y)} = e^{tX}e^{tY}$是独立随机变量之积，所以由[[probability/joint-distributions#thm-product]]，它的期望为$M_X(t)M_Y(t)$。第二个公式就是$\E e^{t(aX+b)} = e^{bt}\E e^{(at)X}$。

(3) 这是拉普拉斯变换的一个反演定理，其证明超出了本课程的范围。例如，可以在比林斯利（Billingsley）的《概率与测度》（Probability and Measure）第30节中找到它的证明，或者在格里米特（Grimmett）和斯特扎克（Stirzaker）的《概率与随机过程》（Probability and Random Processes）第5章中找到借助特征函数的证明。
:::

对$Z\sim\Normal(0,1)$，像[[probability/continuous-random-variables]]一章关于对数正态分布的习题中那样配方，可得$M_Z(t) = e^{t^2/2}$，于是对$X = \mu+\sigma Z$，由第(2)条，

$$
M_X(t) = e^{\mu t + \sigma^2t^2/2}.
$$ {#eq-normal-mgf}

展开$e^{t^2/2} = 1 + \frac{t^2}{2} + \frac{t^4}{8} + \dots$并与第(1)条比较，得$\E Z = 0$，$\E Z^2 = 1$，$\E Z^3 = 0$，$\E Z^4 = 3$。其他矩母函数：$\operatorname{Exp}(\lambda)$的矩母函数为$M(t) = \dfrac{\lambda}{\lambda-t}$，$t<\lambda$（所以$\E X^k = k!/\lambda^k$）；$\operatorname{Poisson}(\lambda)$的矩母函数为$M(t) = e^{\lambda(e^t-1)}$。

::: widget plot
f: 1/(1 - x); exp(x^2/2)
x: -2, 0.8
y: 0, 5
tangent: 0
labels: M(t) \text{ 对应 } \operatorname{Exp}(1); M(t) \text{ 对应 } \Normal(0,1)
caption: 两个矩母函数；由于$M(0) = \E e^0 = 1$，它们都经过点$(0,1)$。$\operatorname{Exp}(1)$的矩母函数在$t = 0$处的切线斜率为$M'(0) = 1 = \E X$；可以沿曲线拖动这条切线。正态分布的矩母函数在$t=0$处的斜率为$0 = \E Z$，在该处的曲率为$M''(0) = 1 = \E Z^2$。指数分布的矩母函数在$t = 1$处趋于无穷：它只对$t<\lambda$存在。
:::

::: corollary 独立正态随机变量之和 {#cor-normal-sum}
若$X\sim\Normal(\mu_1,\sigma_1^2)$与$Y\sim\Normal(\mu_2,\sigma_2^2)$独立，则$X+Y\sim\Normal(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$。更一般地，独立正态随机变量的任意线性组合$a_1X_1+\dots+a_nX_n + b$都服从正态分布。
:::

::: proof
由[[#thm-mgf]]的第(2)条和[[#eq-normal-mgf]]，

$$
M_{X+Y}(t) = e^{\mu_1t+\sigma_1^2t^2/2}e^{\mu_2t+\sigma_2^2t^2/2} = e^{(\mu_1+\mu_2)t + (\sigma_1^2+\sigma_2^2)t^2/2},
$$

这是$\Normal(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$的矩母函数；由唯一性，这就是$X+Y$的分布。一般的结论可用归纳法得到，其中要用到$M_{aX+b}(t) = e^{bt}M_X(at)$，它表明只要$X$服从正态分布，$aX + b$也服从正态分布。
:::

::: example 谁更高？ {#ex-taller}
在某个人群中，男性身高服从$\Normal(170, 8^2)$，女性身高服从$\Normal(160, 7^2)$，单位为厘米。独立地随机选出一名男性和一名女性。求女性比男性高的概率。
::: solution
设$X$和$Y$分别为男性和女性的身高。由[[#cor-normal-sum]]（取$a_1 = -1$），$D = Y - X\sim\Normal(160 - 170,\ 7^2 + 8^2) = \Normal(-10, 113)$。因此

$$
\Prob(Y>X) = \Prob(D>0) = 1 - \Phi\Bigl(\frac{0-(-10)}{\sqrt{113}}\Bigr) = 1 - \Phi(0.941)\approx0.173 .
$$

注意，尽管我们是把身高相减，方差却是相加的。（对于现实中的夫妇，独立性假设值得怀疑，因为伴侣的身高是正相关的；在正相关的情况下，$\Var D$更小，这个概率也更低。）
:::
:::

::: remark 矩母函数不存在的情形
并非每个分布都有矩母函数：对于柯西分布，对每个$t\ne0$都有$\E e^{tX} = \infty$；对数正态分布有各阶矩，但对每个$t>0$都有$\E e^{tX} = \infty$。使用复指数的**特征函数**$\varphi_X(t) = \E e^{itX}$总是存在的，因为$\lvert e^{itX}\rvert = 1$；它具有同样的乘积性质和唯一性；中心极限定理的一般证明使用的正是这一工具。
:::

::: quiz
某随机变量的矩母函数为$M(t) = e^{3(e^t - 1)}$。它服从什么分布？方差是多少？
- [ ] $\Normal(3, 1)$，方差为$1$
- [x] $\operatorname{Poisson}(3)$，方差为$3$
- [ ] $\operatorname{Exp}(3)$，方差为$\tfrac19$
- [ ] $\Bin(3, e^{-1})$
::: solution
$e^{\lambda(e^t-1)}$是$\operatorname{Poisson}(\lambda)$的矩母函数，这里$\lambda = 3$，由唯一性即可确定分布。也可以直接计算：$M'(t) = 3e^tM(t)$，所以$\E X = M'(0) = 3$；$M''(t) = (3e^t + 9e^{2t})M(t)$，所以$\E X^2 = 12$，$\Var X = 12 - 9 = 3$。
:::
:::

::: history
赌局的期望是克里斯蒂安·惠更斯（Christiaan Huygens）1657年那部论著的核心概念。生成函数由亚伯拉罕·棣莫弗（Abraham de Moivre）在18世纪初引入，例如用来计算用几颗骰子掷出某个给定总点数的方式数；皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）在《概率的分析理论》（Théorie analytique des probabilités，1812年）中把它发展成一套系统的方法，该书的第一部分专门讨论“生成函数的演算”。灭绝问题由弗朗西斯·高尔顿（Francis Galton）于1873年在《教育时报》（Educational Times）上提出，亨利·威廉·沃森（Henry William Watson）用迭代生成函数给出的解答发表在他与高尔顿1875年合写的一篇论文中；而正确的判别准则早在1845年就已由伊雷内-朱尔·比奈梅（Irénée-Jules Bienaymé）陈述过，这一事实直到20世纪70年代才被重新发现。关于一般随机变量的条件期望，是由安德烈·柯尔莫哥洛夫（Andrey Kolmogorov）于1933年利用拉东-尼科迪姆（Radon–Nikodym）定理严格定义的。
:::

## 后续内容 {#where-next}

矩母函数给出了[[probability/limit-theorems]]一章中中心极限定理的证明：标准化和的矩母函数收敛于$e^{t^2/2}$。在连续两次正面问题中用到的首步分析，是[[probability/markov-chains]]一章中求吸收概率和期望击中时间的基本方法。条件期望是预测与回归（[[statistics/regression]]）的基础，而全方差公式是方差分析中平方和分解的依据。在测度论框架下的概率论中，$\E(X\mid Y)$被定义为一个正交投影，这把它与[[linear-algebra/least-squares]]联系了起来。

::: summary
- 线性性：对任意数学期望存在的随机变量，$\E\sum a_iX_i = \sum a_i\E X_i$——不需要独立性。
- 示性变量方法：发生的事件个数的期望为$\sum\Prob(A_i)$；这类计数的方差需要用到示性变量的协方差。
- $\E(X\mid Y)$是一个随机变量，是$Y$的函数；$\E[\E(X\mid Y)] = \E X$，且$\Var X = \E[\Var(X\mid Y)] + \Var(\E(X\mid Y))$。
- 对第一步取条件，可以把期望等待时间的问题化为线性方程组。
- 对取整数值的$X$，概率生成函数$G_X(s) = \E s^X$决定分布，给出$\E X = G'(1)$；对独立和，概率生成函数相乘，对随机和，概率生成函数相复合。
- 分支过程灭绝的概率等于$G(s) = s$的最小根；它等于$1$当且仅当平均后代数至多为$1$（排除恰有一个孩子的平凡情形）。
- 矩母函数$M_X(t) = \E e^{tX}$生成各阶矩，对独立和相乘，并且决定分布；正态分布的矩母函数$e^{\mu t+\sigma^2t^2/2}$表明独立正态随机变量之和仍服从正态分布。
:::

## 习题

::: exercise 一百颗骰子 {level=1 check="875/3"}
掷一百颗均匀的骰子。求总点数的期望和方差。
::: solution
由线性性，期望为$100\times\tfrac72 = 350$。各颗骰子相互独立，所以方差相加：$100\times\tfrac{35}{12} = \tfrac{875}{3}\approx291.7$（标准差约为$17.1$）。
:::
:::

::: exercise 识别概率生成函数 {level=1 check="4"}
某随机变量的概率生成函数为$G(s) = (0.2 + 0.8s)^5$。指出它的分布，并求其均值。
::: solution
这是$(q+ps)^n$，其中$n = 5$，$p = 0.8$；由唯一性，它是$\Bin(5, 0.8)$分布。其均值为$G'(1) = 5\times0.8\times(0.2+0.8)^4 = 4$。
:::
:::

::: exercise 识别矩母函数 {level=1 check="16"}
随机变量$X$的矩母函数为$M(t) = e^{2t + 8t^2}$。指出它的分布，并求$\Var X$。
::: solution
与$e^{\mu t + \sigma^2t^2/2}$比较：$\mu = 2$，$\sigma^2/2 = 8$，所以$X\sim\Normal(2, 16)$，$\Var X = 16$。
:::
:::

::: exercise 不同的点数 {level=2 check="6*(1-(5/6)^6)"}
把一颗均匀的骰子掷$6$次。求出现的不同点数的个数的期望。
::: hint
对每个点数使用一个示性变量。
:::
::: solution
设$A_j$为点数$j$至少出现一次这一事件；$\Prob(A_j) = 1 - (5/6)^6$。由线性性，不同点数个数的期望为$6\bigl(1 - (5/6)^6\bigr)\approx3.99$。所以掷六次时，六个点数中平均只有约四个会出现。
:::
:::

::: exercise 先正面后反面 {level=2 check="4"}
反复抛掷一枚均匀的硬币，直到“正面之后紧跟反面”这一模式首次出现为止。求抛掷次数的期望。
::: solution
设$\mu$为从开始算起的期望次数，$\mu_H$为最后一次抛出正面后还需要的期望次数。从开始状态出发：$\mu = 1 + \tfrac12\mu + \tfrac12\mu_H$。在一次正面之后，抛出反面就结束，再抛出正面则仍处于同一状态：$\mu_H = 1 + \tfrac12\cdot0 + \tfrac12\mu_H$，所以$\mu_H = 2$。于是$\tfrac12\mu = 2$，$\mu = 4$。它与等待两次正面所需的$6$次（见[[#ex-hh]]）的区别在于：对“HT”的一次失败尝试（又一个正面）仍使你离成功只差一步，而对“HH”的一次失败尝试（一个反面）会把你送回开始状态。
:::
:::

::: exercise 商店的营业额 {level=2 check="4250"}
一家商店一小时内的顾客数服从$\operatorname{Poisson}(10)$，各顾客的消费金额相互独立，均值为20英镑，标准差为5英镑，且与顾客数独立。求一小时营业额的均值和方差；请填写方差。
::: solution
由[[#ex-random-sum]]，均值为$10\times20 = \pounds200$，方差为$s^2\E N + m^2\Var N = 25\times10 + 400\times10 = 4250$，标准差约为65英镑。
:::
:::

::: exercise 四种玩具 {level=2 check="25/3"}
每包薯片中装有$4$种收藏卡片中的一种，各种卡片的可能性相同，且各包之间相互独立。求集齐全部四种卡片所需包数的期望。
::: solution
由[[#ex-coupon]]，所需包数的期望为$4\bigl(1+\tfrac12+\tfrac13+\tfrac14\bigr) = 4\cdot\tfrac{25}{12} = \tfrac{25}{3}\approx8.33$。
:::
:::

::: exercise 一个灭绝概率 {level=3 check="0.4"}
在一个分支过程中，每个个体分别以概率$0.2$、$0.3$和$0.5$生育$0$个、$1$个或$2$个孩子。求平均孩子数，以及由一个个体繁衍出的家系最终灭绝的概率。
::: solution
$G(s) = 0.2 + 0.3s + 0.5s^2$，$m = G'(1) = 0.3 + 1 = 1.3>1$，所以灭绝不是必然的。解$G(s) = s$：$0.5s^2 - 0.7s + 0.2 = 0$，即$5s^2 - 7s + 2 = 0 = (5s - 2)(s - 1)$。两个根为$s = 0.4$和$s = 1$；由[[#thm-extinction]]，灭绝概率是较小的根$0.4$。
:::
:::

::: exercise 拆分泊松和 {level=3}
设$X\sim\operatorname{Poisson}(\lambda)$与$Y\sim\operatorname{Poisson}(\mu)$独立。证明：给定$X + Y = n$时，$X$的条件分布为$\Bin\bigl(n,\frac{\lambda}{\lambda+\mu}\bigr)$。由此推出$\E(X\mid X+Y)$。
::: solution
由独立性以及$X+Y\sim\operatorname{Poisson}(\lambda+\mu)$这一事实，对$0\le k\le n$，

$$
\Prob(X = k\mid X+Y = n) = \frac{\Prob(X = k)\Prob(Y = n-k)}{\Prob(X+Y = n)} = \frac{e^{-\lambda}\frac{\lambda^k}{k!}e^{-\mu}\frac{\mu^{n-k}}{(n-k)!}}{e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^n}{n!}} = \binom nk\Bigl(\frac{\lambda}{\lambda+\mu}\Bigr)^k\Bigl(\frac{\mu}{\lambda+\mu}\Bigr)^{n-k}.
$$

这是$\Bin\bigl(n,\frac{\lambda}{\lambda+\mu}\bigr)$的概率质量函数。其均值为$\frac{n\lambda}{\lambda+\mu}$，所以$\E(X\mid X+Y) = \dfrac{\lambda}{\lambda+\mu}(X+Y)$。如果把两个独立的泊松事件流合并，合并后的事件流中的每个事件都以概率$\lambda/(\lambda+\mu)$来自第一个事件流，且与其他事件相互独立。
:::
:::

::: exercise 由矩母函数求正态分布的矩 {level=3 check="3"}
利用矩母函数$e^{t^2/2}$证明：标准正态随机变量满足$\E Z^{2k} = \dfrac{(2k)!}{2^kk!} = 1\cdot3\cdot5\cdots(2k-1)$，$\E Z^{2k+1} = 0$。请填写$\E Z^4$。
::: solution
$e^{t^2/2} = \sum_{k\ge0}\dfrac{(t^2/2)^k}{k!} = \sum_{k\ge0}\dfrac{t^{2k}}{2^kk!}$。由[[#thm-mgf]]的第(1)条，$t^j$的系数为$\E Z^j/j!$。展开式中没有奇次幂，所以奇数阶矩都为零；比较$t^{2k}$的系数，得$\E Z^{2k}/(2k)! = 1/(2^kk!)$，即$\E Z^{2k} = \frac{(2k)!}{2^kk!}$。由于$(2k)! = \bigl(2\cdot4\cdots2k\bigr)\bigl(1\cdot3\cdots(2k-1)\bigr) = 2^kk!\,\bigl(1\cdot3\cdots(2k-1)\bigr)$，它等于$1\cdot3\cdots(2k-1)$。特别地，$\E Z^4 = 3$，$\E Z^6 = 15$。
:::
:::
