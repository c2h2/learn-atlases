预训练语言模型追根究底是一个统计估计问题。文本上存在一个未知分布；我们有一个从它抽出的、非常庞大的样本；我们为模型$p_\theta$选取参数$\theta$，让模型尽可能好地解释这个样本。“尽可能好”有一个精确的含义——最大化模型赋予数据的概率——而这个原则，即**极大似然**，最后被证明与每个语言模型训练时所最小化的交叉熵损失是同一件事。给参数加上一个先验信念，它就变成**最大后验**估计，而最常见的先验，结果正是权重衰减。

本章从能用手算到底的小例子——一枚硬币、一个二元语法模型、一个高斯分布——出发展开这些想法，然后转向估计的另一面：一个估计值有多可信。偏差与方差刻画一个估计量的误差；标准误差与置信区间刻画一个测出来的数（比如模型在某基准上的准确率）的不确定程度。数学图谱中关于[估计](/learn/maths/lesson.php?c=statistics&l=estimation)、[贝叶斯推断](/learn/maths/lesson.php?c=statistics&l=bayesian)与[置信区间](/learn/maths/lesson.php?c=statistics&l=confidence-intervals)的课对统计部分讲得更完备。

## 似然 {#sec-likelihood}

::: definition 似然与极大似然估计 {#def-mle}
**统计模型**是一族由参数$\theta\in\Theta$标记的分布$p_\theta$。给定假设独立同分布（**i.i.d.**）的数据$x_1, \dots, x_N$，$\theta$的**似然**为

$$
L(\theta) = \prod_{n=1}^Np_\theta(x_n),
$$

**对数似然**为$\ell(\theta) = \sum_{n=1}^N\log p_\theta(x_n)$。使$L$最大（等价于使$\ell$最大，等价于最小化**平均负对数似然**）的参数$\hat\theta$称为**极大似然估计**（MLE），其中

$$
\mathcal{L}(\theta) = -\frac1N\sum_{n=1}^N\log p_\theta(x_n).
$$ {#eq-nll}
:::

似然是已观测数据的概率，只不过把数据固定住、看作参数的函数。它*不是*$\theta$上的概率分布：它在$\Theta$上未必积分为$1$。取对数把乘积变成求和，既好求导，又不会下溢；除以$N$使目标成为一个平均值，在不同规模的数据集之间可以比较。式[[#eq-nll]]正是语言模型的训练损失：每个“数据点”是一个词元，它的概率由模型在上下文中的下一个词元分布给出。

::: proposition 伯努利参数的 MLE {#prop-bernoulli-mle}
若$x_1, \dots, x_N\in\{0, 1\}$独立同分布于伯努利$(p)$，$k = \sum_nx_n$是$1$的个数且$0 < k < N$，则 MLE 为$\hat p = k/N$。
:::

::: proof
$\ell(p) = k\log p + (N - k)\log(1 - p)$。其导数$k/p - (N - k)/(1 - p)$在$k(1 - p) = (N - k)p$，即$p = k/N$处为零。二阶导数$-k/p^2 - (N - k)/(1 - p)^2$为负，故$\ell$在$(0, 1)$上是凹的，这个驻点就是最大值。
:::

::: example 一枚硬币，以及模型的准确率 {#ex-coin}
一个模型在$10$道题里答对$7$道。把每道题当作一次成功概率$p$未知的独立伯努利试验，求 MLE 与最大化的对数似然，并与$p = 0.5$处的对数似然比较。
::: solution
$\hat p = 7/10 = 0.7$。对数似然为$\ell(0.7) = 7\ln0.7 + 3\ln0.3 = -2.497 - 3.612 = -6.109$。在$p = 0.5$处它是$10\ln0.5 = -6.931$。这组数据在$p = 0.7$下的概率是$p = 0.5$下的$e^{6.931 - 6.109} = e^{0.822} = 2.3$倍——倍数并不大，这是“十道题说明不了模型多少问题”的第一个暗示。
:::
:::

### 计数就是极大似然 {#sec-counting}

一个有$K$种结果的类别分布有$K$个概率，受和为$1$的约束；它的 MLE 是显然的那个。

::: proposition 类别分布的 MLE {#prop-categorical-mle}
若$x_1, \dots, x_N$独立同分布于$\operatorname{Cat}(\mathbf{p})$，结果$k$出现$c_k$次，则 MLE 为$\hat p_k = c_k/N$。
:::

::: proof
在约束$\sum_kp_k = 1$下最大化$\ell(\mathbf{p}) = \sum_kc_k\log p_k$。引入拉格朗日乘数$\lambda$，令$\sum_kc_k\log p_k - \lambda(\sum_kp_k - 1)$的导数为零：$c_k/p_k = \lambda$，所以$p_k = c_k/\lambda$，代入约束得$\lambda = \sum_kc_k = N$。目标是凹的（凹函数之和），故驻点就是最大值。（$c_k = 0$的结果得到$\hat p_k = 0$，这也正是公式的极限。）不用乘数的证明可由[[math-for-ml/information-theory]]中的吉布斯（Gibbs）不等式得到。
:::

把同一结果对每个上下文分别使用，就得到$n$元语法语言模型的估计：二元语法模型中$p(w\mid u)$的 MLE，是“$w$跟在$u$后面”的次数除以“$u$后面跟着任何词”的次数，即$\hat p(w\mid u) = c(u, w)/c(u)$。

::: example 一个二元语法模型，以及计数为什么会失败 {#ex-bigram}
从训练文本“the cat sat . the dog sat . the cat ran .”估计一个二元语法模型，并用它给新句子“the dog ran .”打分。
::: solution
词“the”后面出现了两次“cat”、一次“dog”，所以$\hat p(\textit{cat}\mid\textit{the}) = 2/3$，$\hat p(\textit{dog}\mid\textit{the}) = 1/3$。“dog”后面只跟过“sat”，所以$\hat p(\textit{ran}\mid\textit{dog}) = 0$；“ran”后面只跟过“.”，所以$\hat p(.\mid\textit{ran}) = 1$。新句子得到的概率是$\frac13\cdot0\cdot1 = 0$，负对数似然是无穷大：一个完全合理的句子被判为不可能，只因为某一对词在训练里从未同时出现过。下面的代码用**加一平滑**重复这一计算——每个计数都加$1$，$\hat p(w\mid u) = (c(u, w) + 1)/(c(u) + \lvert\mathcal{V}\rvert)$，这里词表大小$\lvert\mathcal{V}\rvert = 6$。
:::
:::

```python
import math
from collections import Counter

train = "the cat sat . the dog sat . the cat ran .".split()
vocab = sorted(set(train))                       # 6 个词类型
pairs = Counter(zip(train, train[1:]))           # 二元组计数 c(u, w)
first = Counter(train[:-1])                      # c(u) = 以 u 开头的二元组个数

def p_mle(w, u):
    return pairs[(u, w)] / first[u]

def p_add_one(w, u):
    return (pairs[(u, w)] + 1) / (first[u] + len(vocab))

test = "the dog ran .".split()
for name, p in [("MLE", p_mle), ("add-one", p_add_one)]:
    probs = [p(w, u) for u, w in zip(test, test[1:])]
    nll = sum(-math.log(q) if q > 0 else math.inf for q in probs)
    print(name, [round(q, 3) for q in probs], "NLL", round(nll, 3))
```

```text
MLE [0.333, 0.0, 1.0] NLL inf
add-one [0.222, 0.143, 0.286] NLL 4.703
```

平滑给每个没见过的词对一个小小的概率（这里$\hat p(\textit{ran}\mid\textit{dog}) = 1/7$），代价是压低见过的那些。它不是什么权宜之计：[[#sec-map]]将说明，它正是在“认为任何后续都可能”的先验之下的一个贝叶斯估计。

::: warning 极大似然会过拟合小数据
MLE 会贴着模型允许的上限去贴合数据，连同数据的偶然之处一起贴。当每个参数分到的观测很少时，它把所有没见过的东西的概率判为零；在小数据集上把似然训练到最大的模型，在旧数据上表现好，在新数据上表现差。神经网络语言模型躲开了零计数问题，因为 softmax 从不输出恰好为零的概率，相似的上下文也共享参数；但同一条原则照样适用于它们：光看训练损失对泛化能力一无所知，必须拿留出数据上的损失来对比。
:::

## 高斯分布与最小二乘 {#sec-gaussian-mle}

::: proposition 高斯分布的 MLE 与最小二乘 {#prop-gaussian-mle}
(a) 若$x_1, \dots, x_N$独立同分布于$\Normal(\mu, \sigma^2)$，则 MLE 是样本均值与未修正的样本方差，

$$
\hat\mu = \frac1N\sum_nx_n,\qquad\hat\sigma^2 = \frac1N\sum_n(x_n - \hat\mu)^2.
$$

(b) 若$y_n = f_\theta(\mathbf{x}_n) + \varepsilon_n$，噪声$\varepsilon_n\sim\Normal(0, \sigma^2)$独立同分布且$\sigma$固定，则在$\theta$上最大化$y_n$的似然等价于最小化平方误差和$\sum_n(y_n - f_\theta(\mathbf{x}_n))^2$。
:::

::: proof
(a) $\ell(\mu, \sigma^2) = -\frac N2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_n(x_n - \mu)^2$。令$\partial\ell/\partial\mu = \frac1{\sigma^2}\sum_n(x_n - \mu) = 0$得$\hat\mu$。令$\partial\ell/\partial\sigma^2 = -\frac N{2\sigma^2} + \frac1{2\sigma^4}\sum_n(x_n - \hat\mu)^2 = 0$得$\hat\sigma^2$。

(b) 对数似然是$-\frac N2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_n(y_n - f_\theta(\mathbf{x}_n))^2$；第一项与$\theta$无关，第二项是平方和的负常数倍。
:::

(b) 部分解释了为什么均方误差是回归的默认损失，也解释了高斯（Gauss）为什么能靠“误差服从正态分布”为最小二乘辩护（见历史注记）。一般性的教训是：**选择损失就是选择噪声模型。**平方误差假定高斯噪声；绝对误差假定拉普拉斯（Laplace）噪声；softmax 上的交叉熵则假定目标服从类别分布。

::: example 方差的 MLE 是有偏的 {#ex-variance}
对数据$2, 4, 4, 4, 5, 5, 7, 9$，计算$\hat\mu$、MLE $\hat\sigma^2$，以及修正估计$s^2 = \frac{1}{N-1}\sum_n(x_n - \hat\mu)^2$。
::: solution
$\hat\mu = 40/8 = 5$。偏差平方为$9, 1, 1, 1, 0, 0, 4, 16$，和为$32$，所以$\hat\sigma^2 = 32/8 = 4$，$s^2 = 32/7 = 4.571$。MLE 偏小，是因为偏差是从$\hat\mu$量起的，而$\hat\mu$正是照着这批点拟合出来的，比真均值更贴近它们；平均而言，这使$\hat\sigma^2$按因子$(N-1)/N$整体偏小（习题 9）。$8$个点时差$12\%$；到一百万个点就微不足道了。
:::
:::

## 偏差、方差与误差 {#sec-bias-variance}

估计量是随机数据的函数，所以它自己也是随机的：换一个样本就换一个估计值。有两个数刻画它怎么犯错。

::: definition 偏差、方差与均方误差 {#def-bias}
设$\hat\theta$是由随机数据算出的、用于估计参数$\theta$的估计量。它的**偏差**是$\E[\hat\theta] - \theta$，**方差**是$\Var(\hat\theta)$，**均方误差**是$\operatorname{MSE}(\hat\theta) = \E\big[(\hat\theta - \theta)^2\big]$。若偏差为零则称它**无偏**；若样本量增大时$\hat\theta\to\theta$（依概率），则称它**相合**。
:::

::: proposition 偏差-方差分解 {#prop-bias-variance}
$$
\operatorname{MSE}(\hat\theta) = \big(\E[\hat\theta] - \theta\big)^2 + \Var(\hat\theta).
$$
:::

::: proof
记$m = \E\hat\theta$。则$\hat\theta - \theta = (\hat\theta - m) + (m - \theta)$，于是

$$
\E\big[(\hat\theta - \theta)^2\big] = \E\big[(\hat\theta - m)^2\big] + 2(m - \theta)\,\E[\hat\theta - m] + (m - \theta)^2 = \Var(\hat\theta) + 0 + (m - \theta)^2.
$$
:::

无偏不是目标，误差小才是。一个稍微有偏但方差低得多的估计量可能更好，这正是正则化与平滑的逻辑：它们把估计拉向某个默认值（零权重、均匀概率），引入偏差，换来数据稀缺时方差的大幅下降。在标准正则性条件下，MLE 是相合的，且对大样本近似无偏，并在这类估计量中拥有尽可能小的方差——但这些都是大样本保证，对一个参数比数据点还多的模型什么也没说。

同一分解用在“对随机训练集平均的学习模型预测”上，就得到模型复杂度的经典**偏差-方差权衡**：简单模型有偏差，灵活模型方差大，最佳测试误差介于两者之间（Geman、Bienenstock 与 Doursat，1992）。大型神经网络让这幅图景变得复杂。Belkin 等人（2019）与 Nakkiran 等人（2020）记录了**双重下降**：当模型规模超过能恰好拟合训练数据的临界点之后，测试误差可能再次下降。这是关于训练好的神经网络的一个经验发现，属于[[ml-fundamentals]]的主题，而不是估计理论的定理。

## 最大后验估计 {#sec-map}

::: definition MAP 估计 {#def-map}
设参数上有**先验**密度$p(\theta)$，贝叶斯公式（[[math-for-ml/probability#thm-bayes]]）给出**后验**$p(\theta\mid\mathcal{D})\propto p(\mathcal{D}\mid\theta)\,p(\theta)$。**最大后验**（MAP）估计为

$$
\hat\theta_{\text{MAP}} = \arg\max_\theta\Big[\sum_n\log p_\theta(x_n) + \log p(\theta)\Big].
$$

归一化常数$p(\mathcal{D})$与$\theta$无关，直接消去。
:::

MAP 目标是对数似然加上惩罚项$\log p(\theta)$，后者不随$N$增长：数据少时先验作用很大，数据多时似然占上风，MAP 趋于 MLE。

::: proposition 高斯先验就是权重衰减 {#prop-weight-decay}
若先验令各参数独立服从$\Normal(0, \tau^2)$，则

$$
\hat\theta_{\text{MAP}} = \arg\min_\theta\Big[-\sum_n\log p_\theta(x_n) + \frac{1}{2\tau^2}\lVert\theta\rVert^2\Big],
$$

即负对数似然加上强度$\lambda = 1/(2\tau^2)$的**$\ell_2$ 惩罚**。拉普拉斯先验$p(\theta_i)\propto e^{-\lvert\theta_i\rvert/b}$给出的则是$\ell_1$惩罚$\frac1b\lVert\theta\rVert_1$。
:::

::: proof
$\log p(\theta) = \sum_i\log\big(e^{-\theta_i^2/2\tau^2}/\sqrt{2\pi\tau^2}\big) = -\frac{1}{2\tau^2}\lVert\theta\rVert^2 + \text{常数}$。最大化对数似然加它就是最小化其相反数。拉普拉斯情形同理，$\log p(\theta_i) = -\lvert\theta_i\rvert/b + \text{常数}$。
:::

先验越窄（$\tau$越小），意味着越坚信权重应该很小，惩罚也越大。在朴素梯度下降下，$\ell_2$ 惩罚给梯度添上$\theta/\tau^2$，于是每一步都按固定比例缩小每个权重——“**权重衰减**”这个名字由此而来。（对 Adam 这类自适应优化器，直接衰减权重与把惩罚加进损失已经不再等价；Loshchilov 与 Hutter 的 AdamW 把两者解耦，见[[math-for-ml/optimisation]]。）

对伯努利或类别参数，自然的先验是**贝塔**（Beta）（或**狄利克雷**（Dirichlet））分布，即$[0, 1]$上的$p(q)\propto q^{\alpha-1}(1 - q)^{\beta-1}$。它是**共轭**的：$N$次试验中成功$k$次之后，后验是$\operatorname{Beta}(\alpha + k, \beta + N - k)$，所以先验相当于$\alpha - 1$次虚拟成功和$\beta - 1$次虚拟失败。后验众数（MAP）为$(k + \alpha - 1)/(N + \alpha + \beta - 2)$，后验均值为$(k + \alpha)/(N + \alpha + \beta)$。

::: example 平滑就是贝叶斯估计 {#ex-beta}
对[[#ex-coin]]中$10$题答对$7$题，分别在均匀先验$\operatorname{Beta}(1, 1)$与先验$\operatorname{Beta}(2, 2)$下计算 MAP 估计与后验均值。哪个先验让 MAP 估计恰好变成加一平滑？
::: solution
在$\operatorname{Beta}(1, 1)$下后验为$\operatorname{Beta}(8, 4)$：MAP 为$7/10 = 0.7$（均匀先验什么都不改），后验均值$8/12 = 0.667$。在$\operatorname{Beta}(2, 2)$下后验为$\operatorname{Beta}(9, 5)$：MAP 为$8/12 = 0.667$，后验均值$9/14 = 0.643$。$\operatorname{Beta}(2, 2)$的 MAP 相当于加上一次虚拟成功和一次虚拟失败：$(k + 1)/(N + 2)$，这正是两种结果时的加一平滑（也等于拉普拉斯的继承律（rule of succession），即均匀先验下的后验均值）。有$K$种结果、先验取各参数都是$2$的对称狄利克雷分布时，MAP 为$(c_k + 1)/(N + K)$——恰好是[[#ex-bigram]]里平滑后的二元语法估计。
:::
:::

::: widget bayes
mode: beta
a: 2
b: 2
successes: 7
trials: 10
caption: 先验$\operatorname{Beta}(2, 2)$与$10$次试验成功$7$次之后的后验，如[[#ex-beta]]。保持相同成功率增大试验次数，后验会收窄到$0.7$附近、先验的影响淡去；把先验加强（$a$、$b$都调大），就需要更多数据才能撼动它。
:::

::: quiz
训练一个模型，最小化其训练词元上的平均交叉熵加上$\lambda\lVert\theta\rVert^2$。哪种说法正确？
- [ ] 均匀先验下的极大似然估计
- [x] 参数上取零均值高斯先验的 MAP 估计
- [ ] 参数上取拉普拉斯先验的 MAP 估计
- [ ] 贝叶斯推断：结果是完整的后验分布
::: solution
由[[#prop-weight-decay]]，$\ell_2$ 惩罚是零均值高斯先验的负对数，所以“损失加惩罚”的最小化就是 MAP 估计。拉普拉斯先验给出的是$\ell_1$惩罚。MAP 只给出一个点——后验的众数——而不是整个分布；完整的贝叶斯推断会对后验平均来做预测。
:::
:::

## 语言模型的极大似然 {#sec-lm-mle}

神经语言模型的训练正是照着[[#eq-nll]]来的。把训练语料看成一条长词元序列$x_1, \dots, x_N$。由概率的链式法则（[[math-for-ml/probability#prop-chain-rule]]），模型给整个语料的对数似然是$\sum_t\log p_\theta(x_t\mid x_{<t})$（实践中语料会被切成窗口，上下文就是窗口内已出现的部分），平均负对数似然为

$$
\mathcal{L}(\theta) = -\frac1N\sum_{t=1}^N\log p_\theta(x_t\mid x_{<t}),
$$

这就是熟悉的逐词元交叉熵损失。每一项都是$-\log\operatorname{softmax}(\mathbf{z}_t)_{x_t}$，它对 logits 的梯度为$\mathbf{p}_t - \mathbf{e}_{x_t}$（[[math-for-ml/gradients#prop-softmax-ce]]）。以下三条评论把这一切与本章其余部分连起来。

- 一篇文本的词元并不独立，但这一因式分解让似然成为一串条件概率的乘积，极大似然理论适用于这个条件模型。
- 预训练语料相对于在其上遍历的轮数实在太庞大，语言模型常常每个词元只看一次或几次。于是新批次上的训练损失本身就是未见数据上损失的一个估计，经典意义的过拟合并不多见；当数据被重复很多遍、或在很小的数据集上微调模型时，经典形态又回来了。
- 语言模型训练中的权重衰减通常被描述成一种正则化，与[[#prop-weight-decay]]的说法一致；只是实践中，它对优化动力学的影响可能与它的先验解释同样重要。

[[math-for-ml/information-theory]]将说明，最小化这一损失等价于最小化从数据分布到模型的KL散度。

## 评测中的统计学 {#sec-evaluation}

估计的另一半是不确定性。基准得分是用有限道题的样本，对模型在同类题目整体上表现的一个估计，它自带一个标准误差。

::: definition 标准误差与置信区间 {#def-ci}
估计量的**标准误差**就是它的标准差。在$n$道独立的题上测得准确率$\hat p$时，标准误差为$\operatorname{SE} = \sqrt{p(1 - p)/n}\approx\sqrt{\hat p(1 - \hat p)/n}$。近似的**95% 置信区间**是$\hat p\pm1.96\,\operatorname{SE}$：这是一个关于程序的说法——反复抽样时，它产生的区间约有$95\%$的时间包含真值。
:::

因子$1.96$来自中心极限定理：$n$大时估计近似正态，而正态变量落在均值$1.96$个标准差以内的概率是$0.95$。当准确率接近$0$或$1$，或$n$很小时，有更好的区间（常选 Wilson 区间）；自助法（bootstrap）——把题目有放回地重抽、重新计算得分——能为任何指标给出区间。

::: widget confidence
dist: bernoulli
n: 100
level: 0.95
intervals: 50
method: z
caption: 五十次模拟基准，每次$100$道题，并各算出一个$95\%$区间。大约$95\%$的区间包含真实准确率，大约$5\%$没包住——但任何一个单独的区间，要么包住了，要么没有。调大$n$，区间按$1/\sqrt n$收缩。
:::

::: example 模型 A 比模型 B 强吗？ {#ex-compare}
在同样的$1000$道题上，模型 A 得$72\%$，模型 B 得$70\%$。先给 A 的准确率一个$95\%$区间。然后判断两者之差：(a) 把两个得分当作独立；(b) 利用“只有 A 答对的有$60$题、只有 B 答对的有$40$题”这一事实。
::: solution
$\operatorname{SE}_A = \sqrt{0.72\cdot0.28/1000} = 0.0142$，所以区间是$0.72\pm0.028$，约$[0.692, 0.748]$。

(a) 若两个得分独立，差$0.02$的$\operatorname{SE} = \sqrt{0.0142^2 + 0.0145^2} = 0.0203$，得$z = 0.02/0.0203 = 0.99$：看不出有差别。

(b) 得分并不独立——两个模型是在同样的题上测的，而且多数题对两个模型要么都容易要么都难。对每道题，令$d = +1$（只有 A 对），$-1$（只有 B 对），否则$0$。则$\bar d = (60 - 40)/1000 = 0.02$，$\E d^2 = 100/1000 = 0.1$，$\Var d = 0.1 - 0.0004 = 0.0996$，$\operatorname{SE} = \sqrt{0.0996/1000} = 0.0100$，于是$z = 2.0$。这种利用两模型答案不同之题的**配对**分析，灵敏度高一倍，得出的结论是：差别在$5\%$水平上恰好处显著的边缘。
:::
:::

::: warning 多重比较与嘈杂的排行榜
$95\%$区间平均$5\%$的次数会漏掉真值。在同一基准上比较二十个模型变体，即使没有一个真的更好，通常也会有一个纯粹出于偶然地“显著更好”；在测试集上从多次运行、多个提示或许多检查点中挑最好，也会同样地虚高得分。要报告一共试过多少种配置，为最终数字保留一个留出的测试集，并对小基准上的小差距保持警惕。本图谱的评测课程（[[evaluation]]）还会回到这些问题。
:::

::: history
高斯（Gauss）在《天体运动论》（Theoria motus，1809）中用误差服从正态分布的假设为最小二乘辩护——实际上是有史以来第一个极大似然论证；拉普拉斯（Laplace）的继承律（1814）估算明天太阳升起的概率，用的正是如今均匀先验下的后验均值——加一平滑由此发端。Ronald Fisher 在 1912 年把极大似然引入为一般方法，并在《论理论统计学的数学基础》（On the mathematical foundations of theoretical statistics，1922）中发展了它的理论，包括相合性与有效性。Jerzy Neyman 在 1937 年定义了置信区间。在语言方面，I. J. Good 在战时与 Alan Turing 合作的基础上，于 1953 年发表了估计未见事件概率的 Good–Turing 估计；$n$元语法模型的平滑方法在整个 1990 年代不断打磨，以 Chen 与 Goodman（1998）的综述比较为集大成。Andrey Tikhonov 的正则化（1943、1963）与 Hoerl、Kennard 的岭回归（1970）引入了$\ell_2$ 惩罚，Tibshirani 的 lasso（1996）引入了$\ell_1$惩罚。Bradley Efron 在 1979 年提出了自助法。
:::

::: summary
- 似然是数据的概率看作参数的函数；极大似然最小化平均负对数似然，对语言模型来说这就是逐词元交叉熵损失。
- 对伯努利模型与类别模型，MLE 就是观测频率；对高斯分布，是样本均值与未修正的方差；噪声为高斯时，就是最小二乘。选择损失就是选择噪声模型。
- MSE = 偏差² + 方差。MLE 会过拟合小数据（零计数）；平滑与正则化用一点偏差换更小的方差。
- MAP 是在对数似然上加上对数先验：高斯先验就是$\ell_2$ 权重衰减，拉普拉斯先验是$\ell_1$，贝塔或狄利克雷先验就是加性平滑。
- 基准得分的标准误差为$\sqrt{p(1-p)/n}$；比较模型要用同样的题、做配对分析，并提防多重比较。
:::

## 习题

::: exercise 一个伯努利 MLE {level=1 check="0.3"}
一个过滤器在$40$个请求中标记了$12$个。在伯努利模型下，标记率的 MLE 是多少？
::: solution
由[[#prop-bernoulli-mle]]，$\hat p = 12/40 = 0.3$。
:::
:::

::: exercise 平滑后的二元语法 {level=1 check="1/3"}
在[[#ex-bigram]]的训练文本上，用加一平滑估计$p(\textit{cat}\mid\textit{the})$。
::: solution
$c(\textit{the}, \textit{cat}) = 2$，$c(\textit{the}) = 3$，$\lvert\mathcal{V}\rvert = 6$，所以估计为$(2 + 1)/(3 + 6) = 1/3$，比 MLE 的$2/3$低：让出来的概率摊到了“the”后面从未见过的五种后续上。
:::
:::

::: exercise 方差的估计 {level=1 check="5"}
对数据$1, 3, 5, 7$，计算方差的 MLE 与修正估计$s^2$。MLE 是多少？
::: solution
$\hat\mu = 4$，偏差平方为$9, 1, 1, 9$，和为$20$，所以$\hat\sigma^2 = 20/4 = 5$，$s^2 = 20/3\approx6.67$。
:::
:::

::: exercise 一个贝塔后验 {level=2 check="5/7"}
成功概率的先验为$\operatorname{Beta}(3, 3)$，一个模型在$10$项任务中成功$8$项。后验是什么？MAP 估计与后验均值各是多少？给出 MAP 估计。
::: solution
后验为$\operatorname{Beta}(3 + 8, 3 + 2) = \operatorname{Beta}(11, 5)$。MAP 为$(11 - 1)/(11 + 5 - 2) = 10/14 = 5/7\approx0.714$，后验均值为$11/16 = 0.6875$，两者都从 MLE 的$0.8$被拉向先验的中心$0.5$。
:::
:::

::: exercise 一个收缩估计量 {level=2 check="0.8"}
设$\bar X$是$n$个独立同分布观测的均值，总体均值为$\mu$、方差为$\sigma^2$，考虑$\hat\mu_c = c\bar X$，$c$为常数。求它的偏差、方差与 MSE，并求$\mu = 1$、$\sigma^2/n = 0.25$时使 MSE 最小的$c$。那个$c$是多少？
::: solution
偏差$(c - 1)\mu$，方差$c^2\sigma^2/n$，故由[[#prop-bias-variance]]，$\operatorname{MSE}(c) = (1 - c)^2\mu^2 + c^2\sigma^2/n$。令导数$-2(1 - c)\mu^2 + 2c\sigma^2/n$为零，得$c = \mu^2/(\mu^2 + \sigma^2/n) = 1/1.25 = 0.8$。此时$\operatorname{MSE} = 0.04 + 0.16 = 0.20$，而无偏的$\bar X$是$0.25$。（最优的$c$依赖于未知的$\mu$，所以这只是一个演示，不是可用的估计量；实用的收缩估计量会从数据中估计它。）
:::
:::

::: exercise 先验导出的权重衰减 {level=2 check="5*10^(-5)"}
一个模型在$N = 10^6$个样本上训练，最小化*平均*负对数似然加$\lambda\lVert\theta\rVert^2$。哪个$\lambda$对应“每个参数取先验$\Normal(0, \tau^2)$、$\tau = 0.1$”的 MAP 估计？
::: solution
由[[#prop-weight-decay]]，MAP 最小化$-\sum_n\log p_\theta(x_n) + \lVert\theta\rVert^2/(2\tau^2)$。除以$N$不改变最小值点，得到平均损失加$\lVert\theta\rVert^2/(2N\tau^2)$，所以$\lambda = 1/(2\cdot10^6\cdot0.01) = 5\times10^{-5}$。同一个先验在更大的数据集上对应更小的惩罚：随着数据增多，先验的影响淡去。
:::
:::

::: exercise 准确率的区间 {level=2 check="1.96*sqrt(0.75*0.25/400)"}
一个模型在$400$道题里答对$300$道。给出其准确率的近似$95\%$置信区间。半宽是多少？
::: solution
$\hat p = 0.75$，$\operatorname{SE} = \sqrt{0.75\cdot0.25/400} = 0.0217$，半宽为$1.96\cdot0.0217 = 0.0424$：区间约为$[0.708, 0.792]$，宽度超过八个百分点。
:::
:::

::: exercise 噪声未知的最小二乘 {level=3}
在[[#prop-gaussian-mle]]的(b)中，设$\sigma^2$也未知。证明$\theta$的 MLE 仍是最小二乘拟合$\hat\theta$，且$\hat\sigma^2 = \frac1N\sum_n\big(y_n - f_{\hat\theta}(\mathbf{x}_n)\big)^2$，即残差的均方误差。用$\hat\sigma^2$表示最大化后的对数似然。
::: solution
对任意固定的$\sigma^2$，对数似然在$\theta$上最大化等价于最小化平方和$S(\theta)$，而最小值点$\hat\theta$不依赖$\sigma^2$。再对$\sigma^2$最大化$-\frac N2\log(2\pi\sigma^2) - S(\hat\theta)/(2\sigma^2)$：导数$-\frac N{2\sigma^2} + \frac{S(\hat\theta)}{2\sigma^4}$在$\sigma^2 = S(\hat\theta)/N$处为零。代回去，最大值为$-\frac N2\big(\log(2\pi\hat\sigma^2) + 1\big)$：残差方差越小的模型似然越高，高出的量恰是$\frac N2$乘以方差之比的对数。
:::
:::

::: exercise 修正方差是无偏的 {level=3}
设$x_1, \dots, x_N$独立同分布，均值$\mu$、方差$\sigma^2$。证明$\E\big[\sum_n(x_n - \bar x)^2\big] = (N - 1)\sigma^2$，从而$s^2$无偏，且 MLE $\hat\sigma^2$的偏差为$-\sigma^2/N$。
::: solution
把$(x_n - \mu) - (\bar x - \mu)$展开，并用$\sum_n(x_n - \mu) = N(\bar x - \mu)$，得$\sum_n(x_n - \bar x)^2 = \sum_n(x_n - \mu)^2 - N(\bar x - \mu)^2$。第一个和的期望是$N\sigma^2$，而$\E[(\bar x - \mu)^2] = \Var\bar x = \sigma^2/N$。故期望为$N\sigma^2 - \sigma^2 = (N - 1)\sigma^2$。除以$N - 1$得无偏估计；除以$N$得$\E\hat\sigma^2 = \frac{N-1}N\sigma^2$，偏差为$-\sigma^2/N$。
:::
:::

::: exercise 极大似然匹配矩 {level=3}
一个 softmax 分类器的 logits 为$\mathbf{z} = W\mathbf{x}$，用极大似然在样本对$(\mathbf{x}_n, y_n)$，$n = 1, \dots, N$上拟合。证明总负对数似然对$W$的梯度为$\sum_n(\mathbf{p}_n - \mathbf{e}_{y_n})\mathbf{x}_n^\top$，并由此推出：在似然最大处，对每个类别$k$都有$\sum_n p_{n,k}\mathbf{x}_n = \sum_{n: y_n = k}\mathbf{x}_n$。解释这一“矩匹配”条件。
::: solution
单个样本的损失为$-\log\operatorname{softmax}(W\mathbf{x}_n)_{y_n}$，它对 logits 的梯度是$\mathbf{p}_n - \mathbf{e}_{y_n}$（[[math-for-ml/gradients#prop-softmax-ce]]），再由线性层法则（[[math-for-ml/gradients#prop-linear-grad]]），对$W$的梯度为$(\mathbf{p}_n - \mathbf{e}_{y_n})\mathbf{x}_n^\top$。对样本求和并令梯度为零，第$k$行为$\sum_n(p_{n,k} - [y_n = k])\mathbf{x}_n^\top = \mathbf{0}$，即所求恒等式。它说的是：在 MLE 处，模型按概率加权*预期*属于第$k$类的样本，其每个特征之和，恰好等于*实际*属于第$k$类的样本的特征之和。若某个特征恒为$1$（偏置项），其中就包含$\sum_np_{n,k} = \#\{n: y_n = k\}$：模型预测的类别频率与训练数据上的观测频率一致。
:::
:::
