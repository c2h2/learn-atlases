一名学生参加一场有$20$道题的选择题考试，每题有四个选项，而他每道题都随机猜答案。他预期能答对多少道题？分数的波动有多大？他答对$10$道或更多、勉强及格的机会有多大？我们可以列出所有$4^{20}$种可能的答卷来回答这些问题，但这些问题实际上关心的是附着在每个结果上的一个数——分数，以及这个数取各个值的可能性有多大。

由随机试验的结果所决定的数称为**随机变量**。随机变量使我们从事件转向数量：我们不再问某件事是否发生，而是问有多少、有几个或有多长时间。本章讨论取值于有限集或可数集的随机变量。我们将定义它们的分布、**数学期望**（长期平均值）和**方差**（围绕期望值的波动的典型大小），并认识四种反复出现的分布：伯努利分布、二项分布、几何分布和泊松分布。（猜题学生的答案在[[#ex-guessing]]中求出：平均答对$5$道，标准差约为$1.9$，而答对$10$道及以上的机会只有$1.4\%$。）

## 随机变量及其分布 {#random-variables}

::: definition 随机变量 {#def-random-variable}
设$(\Omega, \mathcal{F}, \Prob)$是概率空间。**随机变量**是一个函数$X\colon \Omega \to \R$，它使得对每个$x\in\R$都有$\{\omega \in \Omega : X(\omega) \le x\} \in \mathcal{F}$。如果存在有限或可数集$S \subset \R$使$\Prob(X \in S) = 1$，就称$X$是**离散型**的。
:::

这个技术性条件保证了诸如“$X \le 3$”这样的陈述是事件，从而具有概率；当$\Omega$可数且$\mathcal{F}$包含所有子集时，它自动成立，在本章中你可以放心地忽略它（它就是[[measure-theory/measurable-functions]]一章中**可测函数**的概念）。我们用$\{X = x\}$表示事件$\{\omega : X(\omega) = x\}$，用$\{X \in A\}$表示$\{\omega : X(\omega)\in A\}$，等等，并把$\Prob(\{X = x\})$简写为$\Prob(X = x)$。

随机变量通常用大写字母表示，它的可能取值用小写字母表示。例如，掷两颗骰子时，$X(i, j) = i + j$（点数和）和$M(i,j) = \max(i,j)$都是$\Omega = \{1,\ldots,6\}^2$上的随机变量。另一个不可或缺的例子是：对任意事件$A$，**示性函数**$\mathbf{1}_A$是这样的随机变量：当$A$发生时它等于$1$，否则等于$0$。

::: definition 概率质量函数与分布函数 {#def-pmf}
离散型随机变量$X$的**概率质量函数**（pmf，也称分布列）为

$$
p_X(x) = \Prob(X = x) \qquad (x \in \R),
$$

它的（累积）**分布函数**（cdf）为$F_X(x) = \Prob(X\le x)$。
:::

概率质量函数是非负的，只在可数个点上不为零，并且满足$\sum_x p_X(x) = 1$，因为事件$\{X = x\}$（$x \in S$）互不相交，且它们的并的概率为$1$。由可数可加性，所有涉及$X$的事件的概率都可以由概率质量函数求出：

$$
\Prob(X \in A) = \sum_{x\in A} p_X(x).
$$ {#eq-pmf-sum}

特别地，$F_X(x) = \sum_{t\le x} p_X(t)$是一个阶梯函数，在每个可能取值$x$处跳跃$p_X(x)$。概率$\Prob(X\in A)$的全体称为$X$的**分布**（或**分布律**）；两个具有相同概率质量函数的随机变量具有相同的分布，即使它们定义在不同的样本空间上。

::: example 两颗骰子中较大的点数 {#ex-max-dice}
掷两颗均匀骰子，$M$为两个点数中较大的一个。求$M$的概率质量函数。
::: solution
最简单的做法是借助分布函数。$M \le k$意味着**两颗**骰子的点数都不超过$k$，这在$36$个结果中有$k^2$个。所以对$k = 1, \ldots, 6$，$\Prob(M\le k) = k^2/36$，并且

$$
\Prob(M = k) = \Prob(M\le k) - \Prob(M \le k-1) = \frac{k^2 - (k-1)^2}{36} = \frac{2k-1}{36}.
$$

这些值$\tfrac{1}{36}, \tfrac{3}{36}, \tfrac{5}{36}, \tfrac{7}{36}, \tfrac{9}{36}, \tfrac{11}{36}$之和为$1$，理应如此。较大的最大值比较小的最大值可能得多：只要两颗骰子不都避开六点，就有$M = 6$。
:::
:::

若$g$是一个函数，$X$是随机变量，则$Y = g(X)$也是随机变量，它的概率质量函数可以通过把$g$映到同一个$y$的那些$x$值归并在一起得到：

$$
p_Y(y) = \Prob(g(X) = y) = \sum_{x : g(x) = y} p_X(x).
$$ {#eq-function-pmf}

## 数学期望 {#expectation}

如果你把一个游戏玩很多次，每次以概率$p_X(x)$赢得$x$，那么你平均每局的赢利应当接近$\sum_x x\,p_X(x)$：值$x$大约出现在比例为$p_X(x)$的那部分局中。这个加权平均就是数学期望。（平均值确实会稳定到它，这就是大数定律，我们将在[[probability/limit-theorems]]一章中证明。）

::: definition 数学期望 {#def-expectation}
离散型随机变量$X$的**数学期望**（期望值、均值）为

$$
\E X = \sum_x x\,p_X(x),
$$ {#eq-expectation}

这里要求该级数绝对收敛，即$\sum_x \lvert x\rvert\, p_X(x) < \infty$。否则$X$没有（有限的）数学期望。
:::

绝对收敛保证了这个值与可能取值的排列顺序无关（[[calculus-2/convergence-tests]]）。对一颗均匀骰子，$\E X = \tfrac16(1+2+\dots+6) = \tfrac72$，这是骰子永远不会掷出的值：数学期望是一个平均值，而不是一个典型值。对示性函数，$\E\mathbf{1}_A = 1\cdot\Prob(A) + 0 \cdot \Prob(A^c) = \Prob(A)$，这个小小的恒等式在[[probability/expectation]]一章中有重大的推论。

::: remark 圣彼得堡悖论
数学期望可能不存在。抛掷一枚均匀硬币直到出现正面为止；如果用了$k$次，你就赢得$2^k$英镑。赢得$2^k$的概率为$2^{-k}$，所以$\sum_k 2^k\cdot 2^{-k} = 1 + 1 + 1 + \cdots$发散，这个游戏的期望值为无穷大。然而很少有人愿意付哪怕50英镑来玩这个游戏。这个难题是尼古拉·伯努利（Nicolaus Bernoulli）在1713年提出的；丹尼尔·伯努利（Daniel Bernoulli）在1738年给出的解答由圣彼得堡科学院发表，其中引入了这样的思想：金钱的**效用**比金钱数额增长得慢。
:::

要求$g(X)$的数学期望，并不需要先求出$g(X)$的概率质量函数。

::: theorem 随机变量函数的数学期望 {#thm-lotus}
设$X$是离散型随机变量，$g\colon\R\to\R$。则

$$
\E\,g(X) = \sum_x g(x)\,p_X(x),
$$ {#eq-lotus}

只要该级数绝对收敛。
:::

::: proof
令$Y = g(X)$。先利用[[#eq-function-pmf]]，再利用内层和中$g(x) = y$这一事实，得

$$
\E Y = \sum_y y\,p_Y(y) = \sum_y \sum_{x:\, g(x) = y} y\,p_X(x) = \sum_y \sum_{x:\, g(x) = y} g(x)\,p_X(x) = \sum_x g(x)\,p_X(x).
$$

最后一步是对各项重新分组：每个$x$恰好属于一个内层和，即$y = g(x)$的那一个。用$\lvert g\rvert$代替$g$作同样的计算（所有项都非负），可得$\sum_y \lvert y\rvert p_Y(y) = \sum_x \lvert g(x)\rvert p_X(x) < \infty$，所以$\E Y$存在，并且重排是合理的。
:::

这个结果有时被称为**无意识统计学家法则**，因为它是如此自然，人们使用它时都没有注意到它是需要证明的。取$g(x) = ax + b$，得

$$
\E(aX + b) = \sum_x (ax + b)\,p_X(x) = a\sum_x x\,p_X(x) + b\sum_x p_X(x) = a\,\E X + b.
$$ {#eq-linear-one}

更一般地，对**任意**两个具有数学期望的随机变量，不论是否独立，都有$\E(X + Y) = \E X + \E Y$；这一**期望的线性性**将在[[probability/joint-distributions]]一章中证明，并在[[probability/expectation#thm-linearity]]中加以利用。

::: quiz
$X$等可能地取$1$、$2$或$3$。下列哪个说法正确？
- [ ] $\E(1/X) = 1/\E X = \tfrac12$
- [x] $\E(1/X) = \tfrac{11}{18}$，它大于$1/\E X$
- [ ] $\E(1/X) = \tfrac{11}{18}$，它小于$1/\E X$
- [ ] $\E(1/X)$没有定义
::: solution
由[[#thm-lotus]]，$\E(1/X) = \tfrac13\bigl(1 + \tfrac12 + \tfrac13\bigr) = \tfrac{11}{18} \approx 0.611$，而$1/\E X = 1/2$。一般来说$\E g(X) \ne g(\E X)$；只有对线性的$g$，两者才总是相等。（对凸函数$g$，例如$x > 0$上的$1/x$，詹森（Jensen）不等式给出$\E g(X) \ge g(\E X)$。）
:::
:::

## 方差 {#variance}

两个随机变量可以有相同的均值，而分散程度却大不相同：以相等的概率赢得0英镑或2英镑，与分别以概率$0.9995$和$0.0005$赢得0英镑或2000英镑，两者的均值都是1英镑。方差用到均值的距离的平方的平均值来衡量分散程度。

::: definition 方差与标准差 {#def-variance}
设$X$的均值为$\mu = \E X$，且$\E X^2 < \infty$。$X$的**方差**为

$$
\Var X = \E\bigl[(X - \mu)^2\bigr] = \sum_x (x-\mu)^2\,p_X(x),
$$

它的**标准差**为$\sigma_X = \sqrt{\Var X}$。
:::

标准差与$X$的单位相同，因而是更便于解释的度量；方差则有更好的代数性质。（当$\E X^2 < \infty$时均值存在，因为$\lvert x\rvert \le 1 + x^2$。）由于$(X-\mu)^2 \ge 0$，方差是非负的，并且方差为零当且仅当以概率$1$有$X = \mu$。

::: theorem 方差的性质 {#thm-variance}
若$\E X^2 < \infty$，$a, b$是常数，则

1. $\Var X = \E(X^2) - (\E X)^2$；
2. $\Var(aX + b) = a^2\,\Var X$。
:::

::: proof
(1) 对$g(x) = (x-\mu)^2 = x^2 - 2\mu x + \mu^2$应用[[#thm-lotus]]，得

$$
\Var X = \sum_x x^2 p_X(x) - 2\mu\sum_x x\,p_X(x) + \mu^2\sum_x p_X(x) = \E X^2 - 2\mu^2 + \mu^2 = \E X^2 - \mu^2 .
$$

(2) 由[[#eq-linear-one]]，$aX + b$的均值为$a\mu + b$，所以$(aX + b) - (a\mu + b) = a(X - \mu)$，再次由[[#thm-lotus]]得$\Var(aX+b) = \E\bigl[a^2(X-\mu)^2\bigr] = a^2\Var X$。
:::

第(2)条说明，平移随机变量不改变它的分散程度，而把它乘以$a$会使标准差乘以$\lvert a\rvert$。

::: example 均匀骰子 {#ex-die}
求均匀骰子点数$X$的均值、方差和标准差。
::: solution
我们已经知道$\E X = \tfrac72$。其次，$\E X^2 = \tfrac16(1 + 4 + 9 + 16 + 25 + 36) = \tfrac{91}{6}$。由[[#thm-variance]]，

$$
\Var X = \frac{91}{6} - \Bigl(\frac72\Bigr)^2 = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.917, \qquad \sigma_X = \sqrt{35/12} \approx 1.708 .
$$

在均方根的意义下，点数平均偏离$3.5$约$1.7$；实际的距离$\tfrac12, \tfrac32, \tfrac52$（各自的概率为$\tfrac13$）的均方根为$\sqrt{(1/4 + 9/4 + 25/4)/3} = \sqrt{35/12}$。
:::
:::

::: warning 方差不是线性的
$\Var(2X) = 4\Var X$，而不是$2\Var X$；并且$\Var(X + X) = \Var(2X) = 4 \Var X$，这与$X$的**两个独立**副本之和的方差$2\Var X$不同（[[probability/joint-distributions]]）。把一次赌注加倍，你的风险（标准差）也加倍；而下两次同样大小的独立赌注，风险只乘以$\sqrt2$。还要记住$\Var(-X) = \Var X$，$\Var(X + b) = \Var X$：方差永远不会变成负数。
:::

::: quiz
若$\Var X = 4$，则$\Var(3 - 2X)$是多少？
- [ ] $-5$
- [ ] $-8$
- [ ] $8$
- [x] $16$
::: solution
由[[#thm-variance]]，$\Var(3 - 2X) = (-2)^2\Var X = 16$。常数$3$只是平移分布，不影响分散程度；而乘数的符号在平方后消失了。
:::
:::

## 伯努利试验与二项分布 {#binomial}

最简单的随机变量只取$0$和$1$两个值。**伯努利试验**是只有“成功”和“失败”两种结果的试验，$X \sim \operatorname{Bernoulli}(p)$表示$\Prob(X = 1) = p$，$\Prob(X = 0) = 1 - p$。于是$\E X = p$，$\E X^2 = p$，$\Var X = p - p^2 = p(1-p)$。

现在进行$n$次独立的伯努利试验，每次成功的概率都是$p$（这里独立性的含义见[[probability/conditional-probability]]一章），并数出成功的次数。

::: theorem 二项分布 {#thm-binomial}
设$X$是$n$次独立试验中成功的次数，每次试验成功的概率都是$p$，记$q = 1 - p$。则

$$
\Prob(X = k) = \binom{n}{k}p^k q^{\,n-k}, \qquad k = 0, 1, \ldots, n.
$$ {#eq-binomial}

记作$X\sim\Bin(n, p)$。
:::

::: proof
一个结果是由$n$次试验结果组成的序列，例如$SFFSF\ldots$（$S$表示成功，$F$表示失败）。由独立性，一个含有$k$次成功和$n-k$次失败的特定序列的概率为$p^k q^{n-k}$，与成功出现的位置无关。事件$\{X = k\}$是$\binom nk$个这样的序列的不交并，每个序列对应于$k$次成功所在位置的一种选法（[[discrete/counting]]），所以它的概率为$\binom nk p^kq^{n-k}$。由二项式定理，这些概率之和为$(p + q)^n = 1$。
:::

::: proposition 二项分布的均值与方差 {#prop-binomial-moments}
若$X\sim\Bin(n,p)$，则$\E X = np$，$\Var X = np(1-p)$。
:::

::: proof
我们要用到恒等式$k\binom nk = n\binom{n-1}{k-1}$和$k(k-1)\binom nk = n(n-1)\binom{n-2}{k-2}$，把阶乘写出来即可得到它们。对于均值，$k=0$的项为零，令$j = k - 1$，得

$$
\E X = \sum_{k=1}^n n\binom{n-1}{k-1}p^kq^{n-k} = np\sum_{j=0}^{n-1}\binom{n-1}{j}p^jq^{n-1-j} = np\,(p+q)^{n-1} = np.
$$

对于方差，先计算**阶乘矩**$\E[X(X-1)]$会更容易。用同样的代换技巧，令$j = k-2$，得

$$
\E[X(X-1)] = \sum_{k=2}^n n(n-1)\binom{n-2}{k-2}p^kq^{n-k} = n(n-1)p^2 .
$$

因此$\E X^2 = \E[X(X-1)] + \E X = n(n-1)p^2 + np$（利用[[#thm-lotus]]把和拆开），从而

$$
\Var X = n(n-1)p^2 + np - n^2p^2 = np - np^2 = np(1-p).
$$
:::

这两个结果都与直觉相符：成功率为$p$的$n$次试验大约产生$np$次成功；并且（我们将在[[probability/joint-distributions#thm-covariance]]中看到）独立项之和的方差等于各项方差之和，即$n\cdot p(1-p)$。

::: example 选择题考试中的猜题 {#ex-guessing}
对于本章开头的那名学生，$X\sim\Bin(20, \tfrac14)$。求$\E X$、$X$的标准差以及$\Prob(X \ge 10)$。
::: solution
由[[#prop-binomial-moments]]，$\E X = 20\cdot\tfrac14 = 5$，$\Var X = 20\cdot\tfrac14\cdot\tfrac34 = 3.75$，所以$\sigma_X = \sqrt{3.75}\approx 1.94$。对于尾部，

$$
\Prob(X\ge 10) = \sum_{k=10}^{20}\binom{20}{k}\Bigl(\frac14\Bigr)^k\Bigl(\frac34\Bigr)^{20-k} \approx 0.0139 .
$$

其中最大的一项是$\Prob(X=10) = \binom{20}{10}4^{-10}(3/4)^{10} \approx 0.0099$，之后各项迅速减小。$10$分比均值高出约$2.6$个标准差，靠猜题大约每$72$次尝试才会得到一次。
:::
:::

::: widget distribution
dist: binomial
params: n=20, p=0.25
a: 10
b: 20
caption: $\Bin(20, 0.25)$的概率质量函数，阴影部分为$\Prob(10 \le X \le 20) \approx 0.014$。把$p$向$\tfrac12$移动，分布变得关于$np$对称；把$p$推向$0$或$1$，分布就变得偏斜，并挤向一端。增大$n$，注意分散程度像$\sqrt{n}$而不是像$n$那样增长。
:::

**高尔顿板**以机械方式产生二项随机变量：一个小球落下时穿过$n$排钉子，在每颗钉子处各自独立地以概率$\tfrac12$向左或向右弹跳。它的最终位置由向右弹跳的次数决定，而这个次数服从$\Bin(n, \tfrac12)$。

::: widget galton
rows: 12
balls: 300
p: 0.5
caption: 每个小球都要做$12$次独立的左右选择，所以它落入的槽位就是向右弹跳的次数，这是一个$\Bin(12, \tfrac12)$随机变量。随着落下的小球越来越多，球堆逐渐接近概率质量函数的形状；当$p \neq \tfrac12$时，球堆会偏移并变得不对称。排数很多时出现的钟形，正是[[probability/limit-theorems]]一章中中心极限定理的主题。
:::

### 不放回抽样 {#hypergeometric}

二项模型假定各次试验相互独立，例如**有放回**抽样的情形。当从含有$N$个个体（其中$K$个是“成功”）的总体中**不放回**地抽取$n$个个体作为样本时，各次抽取是相依的，样本中成功的个数$X$服从**超几何分布**

$$
\Prob(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}, \qquad \max(0, n - N + K)\le k\le\min(n, K).
$$ {#eq-hypergeometric}

事实上，全部$\binom Nn$个样本都是等可能的，而恰含$k$个成功的样本，是从$K$个成功中选出$k$个、从$N-K$个失败中选出$n-k$个构成的。它的均值为$nK/N$，与$\Bin(n, K/N)$的均值相同；但它的方差$n\frac KN\bigl(1-\frac KN\bigr)\frac{N-n}{N-1}$等于二项分布的方差乘以**有限总体校正**因子$\frac{N-n}{N-1}$，因而较小；这两个事实都将在[[probability/expectation#ex-hypergeometric]]中用示性变量证明。当$N$远大于$n$时，取走少数几个个体几乎不改变比例，超几何分布就接近于$\Bin(n, K/N)$。这就是为什么从数百万人中不放回地抽取$1000$人进行的民意调查，可以用二项分布来分析计算。

::: example 验收抽样 {#ex-quality-control}
一批$50$件产品中有$5$件次品。检验员不放回地随机抽取$10$件进行检验，若其中没有次品就接收这批产品。求这批产品被接收的概率，并与二项近似作比较。
::: solution
这里$N = 50$，$K = 5$，$n = 10$，接收意味着$X = 0$：

$$
\Prob(X = 0) = \frac{\binom50\binom{45}{10}}{\binom{50}{10}} = \frac{45}{50}\cdot\frac{44}{49}\cdots\frac{36}{41}\approx 0.311 .
$$

（乘积形式来自乘法公式：检验的第一件是正品的概率为$\tfrac{45}{50}$；在第一件是正品的条件下，第二件是正品的概率为$\tfrac{44}{49}$；依此类推。）二项近似$\Bin(10, 0.1)$给出$0.9^{10}\approx 0.349$。这个近似比较粗糙，因为样本占了整批的五分之一：每抽出一件正品，下一件是次品的可能性就略微增大。一批次品率为$10\%$的产品，有将近三分之一的机会通过这种检验——在依赖这种检验之前，了解这一点是值得的。
:::
:::

## 几何分布 {#geometric}

不固定试验次数，而是一直进行独立试验直到第一次成功，并数出试验的次数。

::: definition 几何分布 {#def-geometric}
称随机变量$X$服从参数为$p\in(0,1]$的**几何分布**，记作$X\sim\operatorname{Geom}(p)$，是指

$$
\Prob(X = k) = (1-p)^{k-1}p, \qquad k = 1, 2, 3, \ldots
$$
:::

这是第一次成功出现在第几次试验的分布：$X = k$意味着先有$k - 1$次失败，接着一次成功，由独立性，其概率为$q^{k-1}p$，其中$q = 1-p$。这些概率构成一个几何级数，其和为$p/(1-q) = 1$。尾概率尤其简单：$X > k$意味着前$k$次试验全部失败，所以

$$
\Prob(X > k) = q^k \qquad (k = 0, 1, 2, \ldots).
$$ {#eq-geometric-tail}

有些书改为计算第一次成功之前的失败次数$Y = X - 1$，其取值为$0, 1, 2, \ldots$；务必弄清所用的是哪一种约定。

::: proposition 几何分布的均值与方差 {#prop-geometric-moments}
若$X\sim\operatorname{Geom}(p)$，则$\E X = \dfrac1p$，$\Var X = \dfrac{1-p}{p^2}$。
:::

::: proof
当$\lvert q\rvert < 1$时，几何级数$\sum_{k\ge0} q^k = (1-q)^{-1}$可以逐项求导（[[calculus-2/power-series]]）：

$$
\sum_{k=1}^\infty kq^{k-1} = \frac{1}{(1-q)^2}, \qquad \sum_{k=2}^\infty k(k-1)q^{k-2} = \frac{2}{(1-q)^3}.
$$

因此$\E X = p\sum_{k\ge1}kq^{k-1} = p/p^2 = 1/p$，并且

$$
\E[X(X-1)] = pq\sum_{k\ge2}k(k-1)q^{k-2} = \frac{2pq}{p^3} = \frac{2q}{p^2}.
$$

所以$\Var X = \E[X(X-1)] + \E X - (\E X)^2 = \dfrac{2q}{p^2} + \dfrac1p - \dfrac{1}{p^2} = \dfrac{2q + p - 1}{p^2} = \dfrac{q}{p^2}$，这里用到了$p - 1 = -q$。
:::

::: example 等待六点 {#ex-waiting-six}
掷一颗均匀骰子，直到掷出六点为止。求所需投掷次数的期望，以及需要投掷超过$10$次的概率。
::: solution
投掷次数$X\sim\operatorname{Geom}(\tfrac16)$，所以$\E X = 6$，$\Var X = \frac{5/6}{1/36} = 30$，标准差约为$5.5$——几乎与均值一样大。由[[#eq-geometric-tail]]，

$$
\Prob(X > 10) = \Bigl(\frac56\Bigr)^{10} \approx 0.1615 .
$$

所以大约每六局中就有一局，你在掷了十次之后仍在等待，尽管“平均”只需掷六次。几何分布的等待时间以变化大而著称。
:::
:::

几何分布有一个引人注目的性质：到目前为止已经等待了很久，并不会使成功变得更加临近。

::: theorem 几何分布的无记忆性 {#thm-memoryless}
若$X\sim\operatorname{Geom}(p)$，则对所有整数$m, n\ge 0$，

$$
\Prob(X > m + n \mid X > m) = \Prob(X > n).
$$
:::

::: proof
由于$\{X > m+n\}\subseteq\{X > m\}$，这两个事件的交就是$\{X > m+n\}$，再由[[#eq-geometric-tail]]，

$$
\Prob(X > m+n\mid X>m) = \frac{\Prob(X > m+n)}{\Prob(X > m)} = \frac{q^{m+n}}{q^m} = q^n = \Prob(X>n).
$$
:::

在前$m$次试验都已失败的条件下，还需要的试验次数与原来的等待时间同分布：过程“重新开始”。反之，几何分布是$\{1, 2, \ldots\}$上具有这一性质的**唯一**分布（见习题）。

::: warning 赌徒谬误
轮盘连续八次出现红色之后，许多玩家觉得“该”出黑色了。对于相互独立的各次旋转，这种想法是错误的：下一次出现黑色的概率与以往完全一样，在欧式轮盘上是$18/37$。无记忆性正是对此的精确表述：无论之前发生了什么，直到出现黑色还需旋转的次数都服从同样的几何分布。独立试验没有记忆，也不会对过去的连续结果进行补偿。
:::

## 泊松分布 {#poisson}

许多计数来自大量独立的机会，每个机会发生的可能性都很小：一页纸上的打字错误数，一秒钟内的放射性衰变数，一分钟内打进求助热线的电话数，一天之内的保险理赔数。这类计数用泊松分布来建模。

::: definition 泊松分布 {#def-poisson}
称随机变量$X$服从参数为$\lambda > 0$的**泊松分布**，记作$X\sim\operatorname{Poisson}(\lambda)$，是指

$$
\Prob(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$
:::

由指数级数，这些概率之和为$e^{-\lambda}\sum_k \lambda^k/k! = e^{-\lambda}e^\lambda = 1$。参数既是均值，也是方差：用与前面相同的指标平移技巧，

$$
\E X = \sum_{k=1}^\infty k e^{-\lambda}\frac{\lambda^k}{k!} = \lambda\sum_{k=1}^\infty e^{-\lambda}\frac{\lambda^{k-1}}{(k-1)!} = \lambda, \qquad \E[X(X-1)] = \lambda^2\sum_{k=2}^\infty e^{-\lambda}\frac{\lambda^{k-2}}{(k-2)!} = \lambda^2,
$$

所以$\Var X = \lambda^2 + \lambda - \lambda^2 = \lambda$。均值与方差相等，可以用来快速判断计数数据是否可能服从泊松分布。

泊松分布之所以如此常见，原因在于下面的定理：当试验次数很多、而每次成功的概率很小时，它是二项分布的极限。

::: theorem 二项分布的泊松近似 {#thm-poisson-limit}
设$p_n\in(0,1)$满足：当$n\to\infty$时$np_n\to\lambda > 0$。则对每个固定的$k\ge0$，

$$
\binom{n}{k}p_n^k(1-p_n)^{n-k} \longrightarrow e^{-\lambda}\frac{\lambda^k}{k!} \qquad (n\to\infty).
$$
:::

::: proof
把二项概率写成四个因子的乘积：

$$
\binom nk p_n^k(1-p_n)^{n-k} = \frac{(np_n)^k}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n^k}\cdot(1-p_n)^{n}\cdot(1-p_n)^{-k}.
$$

当$k$固定而$n\to\infty$时：第一个因子趋于$\lambda^k/k!$；第二个因子为$\prod_{j=0}^{k-1}(1 - j/n)\to1$；又由于$p_n\to0$（因为$np_n$收敛），第四个因子趋于$1$。对于第三个因子，当$t\to0$时$\ln(1 - t)/(-t)\to1$（这是$\ln$在$1$处的导数），所以

$$
n\ln(1-p_n) = -np_n\cdot\frac{\ln(1-p_n)}{-p_n}\longrightarrow -\lambda\cdot 1,
$$

再由指数函数的连续性，$(1-p_n)^n = e^{n\ln(1-p_n)}\to e^{-\lambda}$。把四个极限相乘即得结论。
:::

例如，如果$1000$个独立元件中每一个失效的概率都是$0.002$，那么失效的元件数服从$\Bin(1000, 0.002)$，它与$\operatorname{Poisson}(2)$非常接近：

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $\Bin(1000, 0.002)$ | $0.13506$ | $0.27067$ | $0.27094$ | $0.18063$ | $0.09022$ | $0.03602$ |
| $\operatorname{Poisson}(2)$ | $0.13534$ | $0.27067$ | $0.27067$ | $0.18045$ | $0.09022$ | $0.03609$ |

泊松模型只需要均值$\lambda$，而不需要分别知道（往往未知的）$n$和$p$。

::: example 被马踢死 {#ex-horse-kicks}
1898年，拉迪斯劳斯·博尔特基维奇（Ladislaus Bortkiewicz）发表了普鲁士骑兵中士兵被马踢死的记录。对于十个军团在1875—1894年这二十年间的数据，$200$个军团-年中共有$122$人死亡，分布如下：

| 一个军团-年中的死亡人数 | $0$ | $1$ | $2$ | $3$ | $\ge 4$ |
|---|---|---|---|---|---|
| 军团-年数 | $109$ | $65$ | $22$ | $3$ | $1$ |

用泊松分布进行拟合并加以比较。
::: solution
每个军团-年的平均死亡人数为$\lambda = 122/200 = 0.61$，我们以此作为泊松参数。于是死亡$k$人的军团-年的期望个数为$200\,e^{-0.61}(0.61)^k/k!$：

| 死亡人数 | $0$ | $1$ | $2$ | $3$ | $\ge4$ |
|---|---|---|---|---|---|
| 观测值 | $109$ | $65$ | $22$ | $3$ | $1$ |
| 泊松期望值 | $108.7$ | $66.3$ | $20.2$ | $4.1$ | $0.7$ |

两者吻合得非常好。每个士兵在某一年中被马踢死的机会都极小，且与其他士兵相互独立，这恰好是[[#thm-poisson-limit]]所描述的情形。博尔特基维奇称之为“小数定律”。（在[[statistics/hypothesis-testing]]一章中，我们将学习如何正式检验这样的吻合是否足够好。）
:::
:::

::: widget distribution
dist: poisson
params: lambda=2
caption: $\operatorname{Poisson}(\lambda)$的概率质量函数。$\lambda$较小时，它集中在$0$和$1$上，并且严重偏斜；随着$\lambda$增大，分布向右移动，像$\sqrt\lambda$那样展开，并变得更加对称。注意当$\lambda$为整数时，有两根等高的最高柱（位于$\lambda - 1$和$\lambda$处）：后面的一道习题解释了其中的原因。
:::

::: quiz
下列哪个计数最适合用泊松分布来建模？
- [ ] 抛$10$次硬币出现正面的次数
- [ ] 掷骰子直到第一次出现六点所需的次数
- [ ] 一手扑克牌中A的张数
- [x] 一本$300$页的书中印刷错误的个数
::: solution
印刷错误来自数量极多的机会（每一个字符），每个机会出错的概率都极小，且大致相互独立：这正是[[#thm-poisson-limit]]的情形。其他三个计数分别恰好服从二项分布$\Bin(10, \tfrac12)$、几何分布$\operatorname{Geom}(\tfrac16)$和超几何分布（$N = 52$，$K = 4$，$n = 5$）。
:::
:::

::: history
赌局的期望是克里斯蒂安·惠更斯（Christiaan Huygens）《论赌博中的计算》（*De ratiociniis in ludo aleae*，1657）的核心概念，该书讨论了一场赌博的公平价格。雅各布·伯努利（Jacob Bernoulli）在他的《猜度术》（*Ars Conjectandi*，1713）中研究了重复独立试验，伯努利试验和伯努利分布都以他的名字命名。西莫恩-德尼·泊松（Siméon-Denis Poisson）在《关于刑事和民事判决的概率研究》（*Recherches sur la probabilité des jugements en matière criminelle et en matière civile*，1837）中把泊松分布作为二项分布的极限得到；这是一部讨论陪审团裁决可靠性的著作。泊松分布起初很少受到关注，直到拉迪斯劳斯·博尔特基维奇（Ladislaus Bortkiewicz）的《小数定律》（*Das Gesetz der kleinen Zahlen*，1898）表明它能多么好地描述稀有事件，其中最著名的例子就是马踢致死的数据。
:::

## 后续内容 {#where-next}

可能取值构成一个连续统的随机变量（例如寿命和测量误差）需要用密度函数而不是质量函数来描述；它们是[[probability/continuous-random-variables]]一章的主题，在那里，指数分布作为几何分布的连续类比出现，正态分布则作为二项分布的极限出现。放在一起考虑的多个随机变量具有联合分布（[[probability/joint-distributions]]）。[[probability/expectation]]一章中的期望的线性性、示性变量和生成函数，会使本章的许多计算大为简化。二项模型和泊松模型是[[statistics/estimation]]和[[statistics/hypothesis-testing]]两章中关于比例和计数的估计与检验的基础。

::: summary
- 随机变量是结果的数值函数；离散型随机变量由其概率质量函数$p_X(x) = \Prob(X=x)$描述，且$\Prob(X\in A) = \sum_{x\in A}p_X(x)$。
- $\E X = \sum_x x\,p_X(x)$（当级数绝对收敛时），$\E g(X) = \sum_x g(x)\,p_X(x)$（[[#thm-lotus]]）；一般来说$\E g(X) \ne g(\E X)$。
- $\Var X = \E(X-\mu)^2 = \E X^2 - \mu^2$，且$\Var(aX+b) = a^2\Var X$。
- $\Bin(n,p)$计数$n$次独立试验中的成功次数：概率质量函数为$\binom nk p^kq^{n-k}$，均值为$np$，方差为$npq$。
- $\operatorname{Geom}(p)$是等待第一次成功的时间：$\Prob(X>k) = q^k$，均值为$1/p$，方差为$q/p^2$；它具有无记忆性。
- $\operatorname{Poisson}(\lambda)$的概率质量函数为$e^{-\lambda}\lambda^k/k!$，均值和方差都是$\lambda$；它是$n\to\infty$且$np\to\lambda$时$\Bin(n,p)$的极限，用于为稀有事件的计数建模。
- 阶乘矩$\E[X(X-1)]$往往是求方差最简便的途径。
:::

## 习题

::: exercise 抛十次硬币 {level=1 check="15/128"}
把一枚均匀硬币抛$10$次。求恰好出现$3$次正面的概率。
::: solution
正面次数服从$\Bin(10,\tfrac12)$，所以所求概率为$\binom{10}{3}2^{-10} = \dfrac{120}{1024} = \dfrac{15}{128}\approx 0.117$。
:::
:::

::: exercise 数六点 {level=1 check="25/6"}
把一颗均匀骰子掷$30$次，$X$为六点出现的次数。求$\E X$和$\Var X$；请填写方差。
::: solution
$X\sim\Bin(30,\tfrac16)$，所以$\E X = 5$，$\Var X = 30\cdot\tfrac16\cdot\tfrac56 = \tfrac{25}{6}\approx 4.17$。
:::
:::

::: exercise 清闲的一分钟 {level=1 check="8.5*exp(-3)"}
打进某服务台的电话平均每分钟$3$个，某一分钟内的电话数用$\operatorname{Poisson}(3)$来建模。求一分钟内至多有$2$个电话的概率。
::: solution
$\Prob(X\le2) = e^{-3}\bigl(1 + 3 + \tfrac{9}{2}\bigr) = 8.5\,e^{-3}\approx 0.423$。
:::
:::

::: exercise 彩票 {level=1 check="binom(6,3)*binom(43,3)/binom(49,6)"}
在一种彩票中，从$1, \ldots, 49$中不放回地抽出$6$个号码，而你持有一张印有$6$个不同号码的彩票。求你的号码中恰有$3$个被抽中的概率。
::: solution
你的$6$个号码相当于$N = 49$个号码中的$K = 6$个“成功”，而开奖是一个容量为$n = 6$的样本。由[[#eq-hypergeometric]]，

$$
\Prob(X = 3) = \frac{\binom63\binom{43}{3}}{\binom{49}{6}} = \frac{20\cdot 12\,341}{13\,983\,816} = \frac{246\,820}{13\,983\,816}\approx 0.0177,
$$

大约每$57$张彩票中有一张。
:::
:::

::: exercise 两颗骰子中较小的点数 {level=2 check="91/36"}
掷两颗均匀骰子，$N$为较小的点数。求$N$的概率质量函数和$\E N$。
::: hint
仿照[[#ex-max-dice]]，先计算$\Prob(N\ge k)$。
:::
::: solution
$N\ge k$意味着两颗骰子的点数都至少为$k$，这在$36$个结果中有$(7-k)^2$个。所以对$k = 1, \ldots, 6$，$\Prob(N = k) = \Prob(N\ge k) - \Prob(N\ge k+1) = \dfrac{(7-k)^2 - (6-k)^2}{36} = \dfrac{13 - 2k}{36}$，即$\tfrac{11}{36}, \tfrac{9}{36}, \ldots, \tfrac{1}{36}$。于是

$$
\E N = \frac{1\cdot11 + 2\cdot9 + 3\cdot7 + 4\cdot5 + 5\cdot 3 + 6\cdot1}{36} = \frac{91}{36}\approx 2.53.
$$

作为验算，对最大值有$\E M = \sum_k k(2k-1)/36 = \tfrac{161}{36}$，而$\E N + \E M = \tfrac{252}{36} = 7$，正是点数和的期望：事实上，$N + M$总是等于两颗骰子的点数和。
:::
:::

::: exercise 罚球 {level=2 check="0.7^3*0.3"}
一名篮球运动员每次罚球命中的概率都是$0.7$，各次相互独立。求第一次罚失发生在第四次罚球的概率，以及直到第一次罚失为止（包括这一次）的罚球次数的期望；请填写该概率。
::: solution
现在“成功”是罚失，其概率为$0.3$，所以第一次罚失发生在第几次罚球服从$\operatorname{Geom}(0.3)$：$\Prob(X=4) = 0.7^3\times0.3 = 0.1029$，$\E X = 1/0.3 = \tfrac{10}{3}$。
:::
:::

::: exercise 稀有血型 {level=2 check="1-5*exp(-2)"}
每$2000$人中有一人具有某种稀有血型。用泊松近似求$4000$名无亲缘关系的献血者中至少有$3$人具有这种血型的概率。
::: solution
具有这种血型的人数服从$\Bin(4000, \tfrac1{2000})$，由[[#thm-poisson-limit]]，它近似服从$\operatorname{Poisson}(2)$。于是

$$
\Prob(X\ge3) \approx 1 - e^{-2}\Bigl(1 + 2 + \frac{2^2}{2}\Bigr) = 1 - 5e^{-2}\approx 0.3233,
$$

这与精确的二项概率值在小数点后七位上一致。
:::
:::

::: exercise 尾概率之和 {level=3}
设$X$取值于$\{0, 1, 2, \ldots\}$。证明$\E X = \sum_{k=0}^\infty\Prob(X > k)$（两边都可以是无穷大）。利用这一结果，用两行给出$\operatorname{Geom}(p)$随机变量的均值为$1/p$的证明。
::: hint
写出$j = \sum_{k=0}^{j-1}1$，然后交换求和次序。
:::
::: solution
由于所有项都非负，可以随意交换求和次序：

$$
\E X = \sum_{j=1}^\infty j\,\Prob(X = j) = \sum_{j=1}^\infty\sum_{k=0}^{j-1}\Prob(X=j) = \sum_{k=0}^\infty\sum_{j=k+1}^\infty\Prob(X = j) = \sum_{k=0}^\infty\Prob(X>k).
$$

对$X\sim\operatorname{Geom}(p)$，$\Prob(X>k) = q^k$，所以$\E X = \sum_{k\ge0}q^k = \dfrac{1}{1-q} = \dfrac1p$。
:::
:::

::: exercise 泊松分布最可能的取值 {level=3}
设$X\sim\operatorname{Poisson}(\lambda)$，$p_k = \Prob(X=k)$。证明对$k\ge1$有$p_k/p_{k-1} = \lambda/k$。由此推出：当$k < \lambda$时$p_k$递增，当$k > \lambda$时$p_k$递减，因而最可能的取值是$\lfloor\lambda\rfloor$；并且若$\lambda$是整数，则取值$\lambda - 1$与$\lambda$的可能性相同。
::: solution
$\dfrac{p_k}{p_{k-1}} = \dfrac{e^{-\lambda}\lambda^k/k!}{e^{-\lambda}\lambda^{k-1}/(k-1)!} = \dfrac{\lambda}{k}$。当$k < \lambda$时这个比值大于$1$，当$k = \lambda$时等于$1$，当$k > \lambda$时小于$1$。所以只要指标仍小于$\lambda$，就有$p_0 < p_1 < \dots$，此后数列递减。若$\lambda$不是整数，最大项为$p_{\lfloor\lambda\rfloor}$（满足$k < \lambda$的最后一个指标）。若$\lambda$是整数，则$p_\lambda/p_{\lambda-1} = 1$，所以两个最大项$p_{\lambda-1}$与$p_\lambda$相等。
:::
:::

::: exercise 无记忆性刻画了几何分布 {level=3}
设$X$取值于$\{1, 2, 3, \ldots\}$，$\Prob(X > 1) > 0$，并且对所有满足$\Prob(X > m) > 0$的整数$m, n\ge0$都有$\Prob(X > m+n\mid X > m) = \Prob(X>n)$。证明存在某个$p\in(0,1]$使$X\sim\operatorname{Geom}(p)$。
::: solution
令$G(k) = \Prob(X > k)$，于是$G(0) = 1$；再令$q = G(1) \in (0, 1)$（由假设$q > 0$，而$q < 1$将在下面证明）。题设条件就是：只要$G(m) > 0$，就有$G(m+n) = G(m)G(n)$。我们用归纳法证明$G(k) = q^k$。$k = 0, 1$时这成立。若$G(k) = q^k > 0$，则$G(k+1) = G(k)G(1) = q^{k+1}$。因此对所有$k$都有$G(k) = q^k$，并且

$$
\Prob(X = k) = G(k-1) - G(k) = q^{k-1}(1 - q) \qquad (k\ge1),
$$

这正是$p = 1 - q$的$\operatorname{Geom}(p)$的概率质量函数。最后证明$q < 1$：若$q = 1$，则对每个$k$都有$\Prob(X > k) = 1$。但由于$X$取有限值，事件$\{X > k\}$递减到空集，所以由概率的连续性（[[probability/probability-spaces#thm-continuity]]），它们的概率趋于$0$，矛盾。
:::
:::
