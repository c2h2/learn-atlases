弱平稳序列有均值和自协方差函数，但$\gamma_k$是无穷一列数。为了预测，以及为了对样本外说任何话，我们需要一个记忆很短的**参数化**模型：用少数几个系数生成整个ACF。自回归（AR）、移动平均（MA）以及混合ARMA过程就是这一族。它们是由白噪声驱动的[[mathematical-economics/difference-and-differential-equations]]中的线性差分方程，并且是[[time-series/stationarity]]中沃尔德（Wold）表示的参数化形式。

本章推导平稳性与可逆性条件，把理论ACF与PACF匹配到用于识别的样本图像，并用OLS、尤尔-沃克（Yule–Walker）以及（高斯）极大似然估计参数。博克斯（Box）与詹金斯（Jenkins）把同样的步骤组织成一个循环——识别、估计、检验——它仍是单条平稳序列的实用默认。下面的模拟路径从已知ARMA过程、用固定NumPy种子抽出，因而正文中的数字可以复现。它们不是任何市场的数据，本章中也没有任何内容是对真实序列的预测或投资建议。

## 自回归

[[time-series/stationarity#prop-ar1-acf]]中的AR(1)立即推广。

::: definition AR($p$) {#def-ar}
过程$\{Y_t\}$是**$p$阶自回归**，记作AR($p$)，如果

$$
Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t, \qquad \varepsilon_t \sim \mathrm{WN}(0,\sigma^2).
$$ {#eq-ar}

用滞后算子形式，$\phi(L)(Y_t - \mu) = \varepsilon_t$，其中$\phi(z) = 1 - \phi_1 z - \cdots - \phi_p z^p$，并且当$\phi(1) \neq 0$时$\mu = c/\phi(1)$。过程是**因果**的（只是当前与过去$\varepsilon$的函数），如果$\phi(z) = 0$的每一个根都满足$|z| > 1$。
:::

因果性是对向前生成的序列的自然条件。对$p = 1$，它恰好是$|\phi_1| < 1$。对$p = 2$，它等价于不等式三角形

$$
|\phi_2| < 1, \qquad \phi_1 + \phi_2 < 1, \qquad \phi_2 - \phi_1 < 1.
$$ {#eq-ar2-tri}

单位圆上的根是单位根，在[[time-series/unit-roots]]中处理；单位圆内的根使过程随$t$增大而爆炸。

::: proposition 平稳AR($p$)：矩 {#prop-ar-moments}
若对所有$|z| \le 1$有$\phi(z) \neq 0$，则[[#eq-ar]]有唯一弱平稳解$Y_t - \mu = \sum_{j=0}^{\infty}\psi_j \varepsilon_{t-j}$，其中对$|z|\le 1$有$\psi(z) = 1/\phi(z)$，$\mu = c/\phi(1)$，并且自协方差服从**尤尔-沃克方程**

$$
\gamma_k = \phi_1 \gamma_{k-1} + \cdots + \phi_p \gamma_{k-p}, \qquad k \ge 1,
$$ {#eq-yw}

在$k = 0$处有一个不同的（非齐次）方程，其中含有$\sigma^2$。特别地，因果AR($p$)的ACF是几何项$\phi^k$的混合（若有些根是复数，则为阻尼正弦），因此$\rho_k$指数衰减，而PACF在滞后$p$之后截尾：对$k > p$有$\phi_{kk} = 0$。
:::

::: proof
洛朗展开$1/\phi(z) = \sum_{j=0}^{\infty}\psi_j z^j$在包含单位圆的圆盘上收敛，因为$\phi$的零点在其外。把$Y_t - \mu = \psi(L)\varepsilon_t$代入[[#eq-ar]]确认它是解；在有限方差平稳过程类中的唯一性由沃尔德定理得出。对$k \ge 1$，用$Y_{t-k}$乘以（去均值的）[[#eq-ar]]并取期望：由因果性$\E[\varepsilon_t Y_{t-k}] = 0$，这就是[[#eq-yw]]。PACF的断言是滞后$k > p$处的尤尔-沃克系统：最后一个系数的唯一解是零，因为前$p$个系数已经满足递推。
:::

::: example 一个AR(2)三角形 {#ex-ar2}
$Y_t = 0.6 Y_{t-1} + 0.2 Y_{t-2} + \varepsilon_t$是因果的吗？$Y_t = 1.1 Y_{t-1} - 0.3 Y_{t-2} + \varepsilon_t$呢？计算第二种情形中$\phi(z)$的根。
::: solution
对$(\phi_1,\phi_2) = (0.6, 0.2)$：$|\phi_2| = 0.2 < 1$，$\phi_1+\phi_2 = 0.8 < 1$，$\phi_2-\phi_1 = -0.4 < 1$。[[#eq-ar2-tri]]中的三个不等式都成立，所以过程是因果的（并且弱平稳）。对$(1.1, -0.3)$：$|-0.3|<1$，$1.1-0.3 = 0.8 < 1$，$-0.3-1.1 = -1.4 < 1$。三角形满足。多项式是$\phi(z) = 1 - 1.1z + 0.3z^2$。$0.3z^2 - 1.1z + 1 = 0$的根是$z = 2$和$z = 5/3 \approx 1.667$，都在单位圆外，确认因果性。（根的乘积是$1/0.3$——实际上$\phi(z) = 0.3(z-2)(z-5/3)$的常数项会是$0.3\cdot 2\cdot 5/3 = 1$，与写成$0.3z^2 - 1.1z + 1$的$\phi$的常数项相符。）
:::
:::

尤尔-沃克方程给出实用的识别线索：若样本PACF在滞后$1,\ldots,p$大而其后小，则AR($p$)是候选。对[[time-series/stationarity#ex-ar1-sim]]中模拟的AR(1)（种子$7$，$T = 200$），对样本ACF做Durbin-Levinson产生

$$
\hat\phi_{11} = 0.675,\qquad \hat\phi_{22} = 0.030,\qquad \hat\phi_{33} = 0.054,
$$

这是教科书式的AR(1)签名——一个大的偏自相关，然后是零附近的噪声。同一条序列的样本ACF几何衰减，这是AR(1)的ACF签名。

## 移动平均

MA过程是有限的沃尔德表示：$Y_t$是当前与过去冲击的短线性组合。

::: definition MA($q$) {#def-ma}
过程$\{Y_t\}$是**$q$阶移动平均**，如果

$$
Y_t = \mu + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}, \qquad \varepsilon_t \sim \mathrm{WN}(0,\sigma^2).
$$ {#eq-ma}

用算子形式，$Y_t - \mu = \theta(L)\varepsilon_t$，其中$\theta(z) = 1 + \theta_1 z + \cdots + \theta_q z^q$。过程是**可逆**的，如果$\theta(z) = 0$的每一个根都满足$|z| > 1$，此时$\varepsilon_t$可以作为$Y$的无限AR被恢复。
:::

每一个MA($q$)都是弱平稳的，对$\theta_j$没有限制：它是白噪声的有限和。可逆性是另一项要求，施加它是为了使两个具有相同ACF的MA过程可以被区分，并且使一步冲击$\varepsilon_t$是当前与过去$Y$的函数。

::: proposition MA($q$)的ACF {#prop-ma-acf}
对[[#eq-ma]]，$\gamma_0 = \sigma^2\sum_{j=0}^{q}\theta_j^2$（$\theta_0 = 1$），对$1 \le k \le q$有$\gamma_k = \sigma^2\sum_{j=0}^{q-k}\theta_j\theta_{j+k}$，对$k > q$有$\gamma_k = 0$。因此ACF在滞后$q$之后**截尾**：对$|k| > q$有$\rho_k = 0$。对MA(1)$Y_t = \mu + \varepsilon_t + \theta\varepsilon_{t-1}$，

$$
\rho_1 = \frac{\theta}{1+\theta^2}, \qquad \rho_k = 0 \ (k > 1),
$$

且$|\rho_1| \le 1/2$，在$|\theta| = 1$时取等。
:::

::: proof
利用不同日期$\varepsilon$的正交性展开$\E[(Y_t-\mu)(Y_{t-k}-\mu)]$。只有$j = k+\ell$的乘积$\varepsilon_{t-j}\varepsilon_{t-k-\ell}$存活，并且$j$从$0$到$q$而$k+\ell \le q$。对$k > q$没有重叠。对MA(1)，$\gamma_0 = \sigma^2(1+\theta^2)$，$\gamma_1 = \sigma^2\theta$，且$|\theta|/(1+\theta^2)$在$|\theta|=1$取到最大值$1/2$。
:::

ACF在滞后$q$截尾是MA($q$)的识别签名，对偶于AR($p$)的PACF截尾。

::: example MA(1)，种子13 {#ex-ma1}
从$Y_t = \varepsilon_t + 0.5\varepsilon_{t-1}$、$\varepsilon_t \iid \Normal(0,1)$、NumPy种子$13$抽取长度为$300$的MA(1)。样本均值是$-0.070$，样本方差是$1.062$（理论$\gamma_0 = 1.25$）。滞后$1$到$5$的样本ACF是

$$
0.304,\ -0.125,\ 0.025,\ 0.015,\ -0.042.
$$

把这些与[[#prop-ma-acf]]比较。为什么单凭ACF不能把$\theta = 2$与$\theta = 0.5$区分开，哪一个值可逆？
::: solution
理论$\rho_1 = 0.5/(1+0.25) = 0.4$，对$k > 1$有$\rho_k = 0$。样本$\hat\rho_1 = 0.304$低于$0.4$（有效观测$T = 299$时的抽样变异），但是唯一规模可比的滞后；滞后$2$–$5$与巴特利特带$\pm 1.96/\sqrt{299} \approx \pm 0.113$一致，只是$\hat\rho_2 = -0.125$是擦边未中。映射$\theta \mapsto \theta/(1+\theta^2)$在$\theta$与$1/\theta$取同一值：$\rho_1(\theta=2) = 2/(1+4) = 0.4$也成立。可逆根是$|\theta|<1$，所以$\theta = 0.5$是可逆选择，$\theta = 2$不是。在可逆MA过程上极大化高斯似然的估计会挑接近$0.5$的值，而不是接近$2$。
:::
:::

::: warning 可逆性不是平稳性
MA过程总是平稳的。可逆性是关于从现在与过去的$Y$恢复$\varepsilon_t$，而不是关于二阶矩是否存在。反过来，带单位根的AR过程不平稳，即使它可以写成系数不衰减的MA($\infty$)。把这两个词混用，是应用文稿中常见的口误。
:::

::: widget plot
f: theta/(1+theta^2)
x: -3, 3
y: -0.6, 0.6
hlines: 0.5; -0.5
vlines: -1; 1
labels: \rho_1(\theta)
caption: MA(1)滞后1自相关$\rho_1 = \theta/(1+\theta^2)$作为$\theta$的函数。它的绝对值从不超过$1/2$，并且每一个内点值（$0$除外）被取到两次，在$\theta$与$1/\theta$。可逆性保持$|\theta|<1$，即两条竖线之间的区域，从而选出一对孪生中的一个。
:::

## ARMA过程

把有限AR与有限MA混合，得到一个模型，它可以匹配缓慢衰减的ACF（AR部分）以及前几个滞后上短的额外摆动（MA部分），而不需要很大的$p$或$q$。

::: definition ARMA($p,q$) {#def-arma}
过程$\{Y_t\}$是**ARMA($p,q$)**，如果

$$
Y_t - \mu = \phi_1 (Y_{t-1}-\mu) + \cdots + \phi_p (Y_{t-p}-\mu) + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q},
$$ {#eq-arma}

其中$\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$。等价地$\phi(L)(Y_t-\mu) = \theta(L)\varepsilon_t$。若$\phi$的根在单位圆外则过程因果，若$\theta$的根在单位圆外则可逆。我们总是假定$\phi$与$\theta$没有公根（没有**冗余**）：否则可以约去一个因子，阶被说高了。
:::

::: proposition 因果ARMA($p,q$)的ACF {#prop-arma-acf}
对因果ARMA($p,q$)，自协方差对所有$k > q$满足AR递推$\gamma_k = \phi_1\gamma_{k-1}+\cdots+\phi_p\gamma_{k-p}$，而前$q$个滞后还涉及MA系数。因此ACF在滞后$q$之后几何衰减，并且ACF与PACF都不截尾（纯AR与纯MA特例除外）。对ARMA(1,1)

$$
Y_t - \mu = \phi (Y_{t-1}-\mu) + \varepsilon_t + \theta \varepsilon_{t-1}, \qquad |\phi|<1,
$$

有

$$
\gamma_0 = \sigma^2\frac{1+2\phi\theta+\theta^2}{1-\phi^2}, \qquad \rho_1 = \frac{(1+\phi\theta)(\phi+\theta)}{1+2\phi\theta+\theta^2}, \qquad \rho_k = \phi\,\rho_{k-1}\ (k\ge 2).
$$
:::

::: proof
写$Y_t - \mu = \psi(L)\varepsilon_t$，其中$\psi(z) = \theta(z)/\phi(z) = \sum_{j=0}^{\infty}\psi_j z^j$。然后[[time-series/stationarity#eq-wold-gamma]]给出每一个$\gamma_k$。对$k > q$，用$Y_{t-k}$乘以去均值的[[#eq-arma]]并取期望：对$j = 0,\ldots,q$有$\E[\varepsilon_{t-j} Y_{t-k}] = 0$，因为$k > q$且因果。那就是AR递推。ARMA(1,1)公式是同一展开在$k = 0,1$的情形，随后对$k\ge 2$有$\rho_k = \phi\rho_{k-1}$。
:::

::: example ARMA(1,1)，种子17 {#ex-arma11}
从$Y_t = 0.6 Y_{t-1} + \varepsilon_t + 0.4\varepsilon_{t-1}$、$\varepsilon_t \iid \Normal(0,1)$、种子$17$抽取长度为$400$的序列，丢掉前$50$个观测，留下$T = 350$。理论值是$\gamma_0 = 2.5625$以及

$$
\rho_k = 0.756 \times 0.6^{k-1} \quad (k \ge 1),
$$

所以$\rho_1 = 0.756$，$\rho_2 = 0.454$，$\rho_3 = 0.272$，$\rho_4 = 0.163$。样本均值是$-0.027$，样本方差是$2.252$，样本ACF是

$$
0.734,\ 0.451,\ 0.335,\ 0.274,\ 0.178,\ 0.080,\ 0.057,\ 0.061.
$$

这更接近AR(1)还是MA(1)？
::: solution
MA(1)立刻被排除：$\hat\rho_k$在滞后$3$仍是$0.33$，远在宽度$1.96/\sqrt{350} \approx 0.105$的白噪声带之外，而MA(1)对$k>1$有$\rho_k = 0$。$\phi \approx 0.73$的AR(1)会有$\rho_2 \approx 0.73^2 = 0.53$，但样本$\hat\rho_2 = 0.451$更接近ARMA(1,1)的值$0.454$而不是$0.53$。$\hat\rho_k$的整条路径在前四个滞后合理地跟踪$0.756 \times 0.6^{k-1}$。从这个样本量的ACF/PACF对做识别总是嘈杂的；下一节的信息准则给出补充的一票。
:::
:::

::: widget plot
f: ((1+phi*theta)*(phi+theta))/(1+2*phi*theta+theta*theta) * phi^(x-1)
sliders: phi=0.6:0.05:0.9:0.05; theta=0.4:-0.8:0.8:0.05
x: 1, 12
y: -0.4, 1
labels: \rho_x
caption: 因果ARMA(1,1)在$x \ge 1$时的理论ACF。衰减率是$\phi$；$\theta$主要倾斜$\rho_1$。令$\theta = 0$即恢复AR(1)的几何$\phi^{x}$。令$\phi$接近$0$且$\theta$接近$0.8$，会看到大的$\rho_1$以及其后近乎截尾，即MA(1)的图像。
:::

::: quiz
一位未识别的应用工作者报告：“我拟合了ARMA(2,2)；AR多项式与MA多项式在$z = 1.4$共享一个根”。什么地方出错了？
- [ ] 过程不平稳，因为$1.4 > 1$
- [x] 公根可以约去：同样的ACF由ARMA(1,1)生成。模型不可识别
- [ ] 过程不可逆
- [ ] 当根超过$1$时不能计算极大似然
::: solution
$\phi$与$\theta$的公根在$\psi(z) = \theta(z)/\phi(z)$中约去，因此沃尔德系数——从而每一个二阶矩性质——与一个更低阶的ARMA匹配。额外参数不能从ACF识别。根在单位圆**之外**，恰好是因果性与可逆性**所要**的；$1.4$这个数本身不是问题。似然可以计算；它们会沿冗余方向平坦。
:::
:::

## 识别、估计、检验

博克斯与詹金斯（1970）把实际工作组织成三步。这个循环不是定理；它是把[[#def-arma]]匹配到样本的一种有纪律的方式。

**识别。**看样本ACF与PACF，是在任何使平稳性变得可信的变换（对数、差分、季节差分）之后。AR($p$)候选的PACF在$p$后截尾、ACF衰减；MA($q$)候选相反；ARMA($p,q$)两者都不截尾。滞后$s$处的季节尖峰（月度数据为12）暗示季节AR或MA项。过拟合高阶AR总是可能的；简约是识别的一部分，因为冗余的ARMA因子不可识别。

**估计。**对纯AR，OLS（或在[[#eq-yw]]中用$\hat\gamma_k$代替$\gamma_k$的尤尔-沃克估计量）一致、渐近正态，并且与高斯MLE相差$O_p(T^{-1})$。对带MA部分的模型，似然是$\theta$的非线性函数；它被数值极大化，通常在用卡尔曼滤波或条件最小二乘写出高斯似然之后。在因果、可逆、无公根、以及具有有限四阶矩的独立同分布新息下，MLE一致并且以通常的信息矩阵方差$\sqrt{T}$-渐近正态，即使新息不是高斯的（拟极大似然）。

**检验。**残差$\hat\varepsilon_t$应当看起来像白噪声：样本ACF在巴特利特带内，Ljung-Box $Q(h)$以$h-p-q$个自由度不拒绝，没有剩下的季节尖峰。残差ACF在滞后1处剩下的尖峰，是$q$太小的迹象；剩下的PACF尖峰是$p$太小的迹象。过拟合表现为置信区间覆盖零的系数，以及几乎不动的似然。

::: definition AIC与BIC {#def-aic}
对有$k$个被估参数（包括方差）的模型以及高斯对数似然$\ell$，或等价地用$n$个有效观测计算的残差方差$\hat\sigma^2$，

$$
\mathrm{AIC} = n\log\hat\sigma^2 + 2k, \qquad \mathrm{BIC} = n\log\hat\sigma^2 + k\log n.
$$

（不改变排序的加性常数$n\log(2\pi)+n$被省略。）越小越好。一旦$n > e^2 \approx 7.4$，BIC对$k$惩罚更重，并且若真实过程是有限ARMA则对真实阶一致；AIC不一致，但当真实不是有限阶时，它对一步预测均方误差渐近有效。
:::

这一区分——一致的阶选择对有效的预测——归于柴田（Shibata，1980）以及BIC方面的施瓦茨（Schwarz，1978）。在几百个观测的样本里，两个准则常常在低阶模型上一致，而一旦额外滞后只买到$\hat\sigma^2$的小小下降就分歧。

::: example 种子7的AR(1)上的OLS、AIC与BIC {#ex-select}
在[[time-series/stationarity#ex-ar1-sim]]的模拟AR(1)上（预热后$T = 200$），$y_t$对常数与$p$个滞后的OLS回归，$p = 1,2,3,4$，产生

| $p$ | $\hat\phi_1$ | 额外滞后 | $\hat\sigma^2$ | AIC | BIC |
|---|---|---|---|---|---|
| $1$ | $0.679$ | — | $0.8485$ | $-30.70$ | $-24.11$ |
| $2$ | $0.658$ | $\hat\phi_2 = 0.028$ | $0.8561$ | $-27.80$ | $-17.93$ |
| $3$ | $0.656$ | $\hat\phi_3 = 0.056$ | $0.8621$ | $-25.27$ | $-12.13$ |
| $4$ | $0.656$ | $\hat\phi_4 = -0.007$ | $0.8708$ | $-22.18$ | $-5.79$ |

（有效样本每多一个滞后缩短一个观测，所以即使样本内拟合看起来相似，$\hat\sigma^2$也可以上升。）AIC与BIC挑选哪一阶，AR(1)的OLS $\hat\phi_1$与真实$0.7$相容吗？
::: solution
AIC与BIC都在$p = 1$最小。额外滞后的$t$统计量远低于$2$（$\hat\phi_2 = 0.028$，标准误$0.072$）。AR(1)截距是$-0.026$（标准误$0.065$），$\hat\phi = 0.679$（标准误$0.052$），因此$\phi$的95%区间是$0.679 \pm 1.96\times 0.052 = (0.577, 0.781)$，其中含有$0.7$。残差Ljung-Box $Q(10) = 5.53$不拒绝（相对$\chi^2_9$的$p = 0.79$）。这个循环——从PACF识别AR(1)，用OLS估计，检查残差与信息准则——在这个样本中恢复了数据生成过程。
:::
:::

对MA或ARMA，对滞后$Y$的OLS对$\theta$不一致（滞后$\varepsilon$不是我们观测到的回归元）。条件最小二乘从$t \le 0$的$\hat\varepsilon_t = 0$出发，递归构造$\hat\varepsilon_t = y_t - \hat\mu - \sum_i\hat\phi_i y_{t-i} - \sum_j\hat\theta_j \hat\varepsilon_{t-j}$，然后极小化$\sum \hat\varepsilon_t^2$。高斯MLE做同样的事，但对前$p$个观测有正确处理（卡尔曼滤波）。大样本中两者一致；小样本且$|\theta|$接近$1$时，精确似然值得额外工作。

::: intuition 为什么高斯MLE在数据非高斯时仍有效
ARMA的高斯对数似然只通过隐含的一步预测误差及其方差成为数据的函数。极大化它是拟极大似然：在正确的均值与ACF设定下，得分为鞅，因此[中心极限定理](/a/maths/lesson.php?c=probability&l=limit-theorems&lang=zh)仍然给出$\sqrt{T}$-正态性。若新息有厚尾，失去的是效率——并且通常的信息矩阵标准误可能过小，这就是为什么夹心（HAC）标准误出现在仔细的应用工作中。拟MLE不是忽略异常值的许可证；它是在残差的Jarque-Bera检验拒绝时不必惊慌的理由。
:::

::: remark 季节ARMA
月度序列常常需要季节因子。乘性模型$\phi(L)\Phi(L^{12})(Y_t-\mu) = \theta(L)\Theta(L^{12})\varepsilon_t$，写成ARMA$(p,q)\times(P,Q)_{12}$，把滞后$12$的AR与MA多项式叠在短期多项式之上。识别看滞后$1,2,\ldots$**并且**看滞后$12,24,36$。航空乘客、零售额与电力负荷是教科书应用；同样的模式出现在季节未调整的工业生产中（印度IIP，MOSPI；若干拉丁美洲制造业指数）。若统计机构已经对序列做过季节调整，再叠一个季节ARMA通常是错误。
:::

## 一个完整演算的OLS AR(1)

用OLS估计AR(1)的代数，就是[[econometrics/simple-regression]]的简单回归代数，回归元是滞后因变量。曲折在于相依性：高斯-马尔可夫不适用，但在$|\phi|<1$下大样本推断仍然适用。

::: example 六个观测上的手算OLS {#ex-ols-hand}
取种子$7$的AR(1)预热后的前六个观测：

$$
2.035,\ 1.662,\ 1.265,\ 1.138,\ 0.664,\ 0.156.
$$

用后五个作为$y_t$、前五个作为$y_{t-1}$，计算OLS截距与斜率。（这是教学计算：五个观测不是要报告的估计。）
::: solution
令$x_t$为滞后。则

$$
\begin{align*}
x &= (2.035, 1.662, 1.265, 1.138, 0.664),\\
y &= (1.662, 1.265, 1.138, 0.664, 0.156).
\end{align*}
$$

求和：$\sum x = 6.764$，$\sum y = 4.885$，$\sum x^2 = 10.355$，$\sum xy = 7.698$，$n = 5$。斜率是

$$
\hat\phi = \frac{n\sum xy - (\sum x)(\sum y)}{n\sum x^2 - (\sum x)^2} = \frac{5\cdot 7.698 - 6.764\cdot 4.885}{5\cdot 10.355 - 6.764^2} = \frac{38.490 - 33.042}{51.775 - 45.752} = \frac{5.448}{6.023} = 0.905.
$$

截距是$\bar y - \hat\phi \bar x = 0.977 - 0.905\cdot 1.353 = -0.247$。五个观测时斜率嘈杂地高于$T = 199$的估计$0.679$以及真实$0.7$；这个计算的存在是为了表明“AR(1)上的OLS”就是普通OLS，不是一个新估计量。
:::
:::

::: widget regression
points: 2.04,1.66; 1.66,1.27; 1.27,1.14; 1.14,0.66; 0.66,0.16; 0.16,-0.40
degree: 1
residuals: true
x: -0.5, 2.5
y: -0.8, 2.2
caption: [[#ex-ols-hand]]中六点教学样本的滞后散点，外加左下方一个额外虚构点。OLS线就是AR(1)拟合。竖直拖动一个点，看$\hat\phi$移动：观测这么少，斜率任由单个残差摆布。$T = 199$的估计$\hat\phi = 0.679$是同一张图再加194个点。
:::

在$|\phi|<1$下，当$c$已知时$\sqrt{T}(\hat\phi_{\mathrm{OLS}} - \phi) \to_d \Normal\bigl(0, 1-\phi^2\bigr)$（$c$被估计时有类似的、夹心式的方差）。方差$1-\phi^2$随$\phi \to 1$缩小：接近单位根的AR**更容易**与远离的$\phi$区分，但**更难**与$1$区分，这就是为什么[[time-series/unit-roots]]的迪基-富勒分布是一个不同的极限实验。

::: quiz
你在一条平稳月度序列上用OLS估计$y_t = c + \phi y_{t-1} + \varepsilon_t$，得到$\hat\phi = 0.97$，HAC标准误$0.02$。哪一种解释最谨慎？
- [ ] 序列平稳，因为$|\hat\phi| < 1$
- [ ] 序列有单位根，因为$0.97$接近$1$
- [x] 点估计与非常持续的平稳AR(1)**以及**单位根都相容；把它们分开的正确工具是单位根检验，而不是对$0.97$的$t$检验
- [ ] 自回归中HAC标准误无效
::: solution
95%区间$(0.93, 1.01)$覆盖$1$两侧的值。平稳性是过程的性质，不是样本中点估计小于$1$。对$\phi = 1$的检验，普通$t$临界值也是错的。HAC标准误对远在单位区间内部的$\phi$仍然有效；它们不解决单位根问题。谨慎的陈述是第三条。
:::
:::

## 由此通向何处

拟合好的ARMA模型是一台**预测**机器：$Y_{t+h}$给定过去的线性预测器，以及该预测器的均方误差，是$(\hat\phi,\hat\theta,\hat\sigma^2)$的函数，是[[time-series/forecasting]]的主题。若识别步骤找不到平稳ARMA——因为$\hat\phi_1$靠近$1$，或因为**水平**的样本ACF衰减过慢——序列可能是单整的，于是[[time-series/unit-roots]]适用。若干序列被联合建模为一组AR模型，就是[[time-series/var-models]]中的VAR。用递归方差$\sigma_t^2$代替常数$\sigma^2$，就是GARCH（[[time-series/volatility]]）。

博克斯-詹金斯循环不是估计线性过程的唯一方式。用OLS估计、用BIC选择滞后长度的高阶AR（筛法）是标准的非参数替代；它常常是格兰杰因果检验的第一步。贝叶斯ARMA、状态空间模型与不可观测成分分解，都从同一个沃尔德表示和同一个因果性条件出发。

::: history
**1927年，尤尔（Udny Yule）。**尤尔对太阳黑子数拟合AR(2)，把自回归想法引入统计学。

**1931年，斯卢茨基（Eugen Slutsky）与1938年，沃尔德（Herman Wold）。**平稳过程的MA表示，以及沃尔德的唯一性定理，使时间序列的线性模型**是什么**变得精确。

**1954年，沃尔德（Herman Wold）与1949年，沃克（Maurice Walker）。**把AR系数与自协方差联系起来的尤尔-沃克方程，成为AR的第一个系统估计量。

**1970年，博克斯（George Box）与詹金斯（Gwilym Jenkins）。**《时间序列分析：预测与控制》（*Time Series Analysis: Forecasting and Control*）把ARMA建模变成可重复的识别、估计与残差检验循环，并以季节ARMA为演算案例。

**1982年，富勒（Wayne Fuller）与1991年，汉密尔顿（James Hamilton）的讲义（1994年成书）。**因果可逆ARMA的拟MLE大样本理论，包括信息矩阵与卡尔曼滤波似然，成为教材材料。
:::

::: summary
- 因果AR($p$)有几何衰减的ACF，以及在滞后$p$之后截尾的PACF。因果性是“$\phi(z)$的所有根在单位圆外”（[[#def-ar]]，[[#prop-ar-moments]]）。
- MA($q$)总是平稳的；其ACF在滞后$q$之后截尾。可逆性（$\theta$的根在单位圆外）选出观测上等价的MA表示中的一个（[[#def-ma]]，[[#prop-ma-acf]]）。
- 无公根的因果可逆ARMA($p,q$)从二阶矩可识别。其ACF在滞后$q$之后服从AR递推（[[#def-arma]]，[[#prop-arma-acf]]）。
- 识别使用样本ACF/PACF；估计对纯AR是OLS或尤尔-沃克，对MA与ARMA是高斯（拟）MLE；检验使用残差ACF与Ljung-Box。AIC与BIC用残差方差与$k$做权衡（[[#def-aic]]）。
- 样本中$|\hat\phi|<1$并不证明平稳。接近单位根需要单位根那一章的工具，而不是对$0.97$的$t$检验。
:::

## 习题

::: exercise AR(1)均值 {level=1 check="5"}
对$Y_t = 1 + 0.8 Y_{t-1} + \varepsilon_t$，计算无条件均值。（输入均值。）
::: solution
$\mu = 1/(1-0.8) = 5$。
:::
:::

::: exercise MA(1)自相关 {level=1 check="0.4"}
对$Y_t = \varepsilon_t + 0.5\varepsilon_{t-1}$，计算$\rho_1$。（把$\rho_1$作为小数输入。）
::: solution
$\rho_1 = 0.5/(1+0.25) = 0.4$。
:::
:::

::: exercise MA(1)界 {level=1 check="0.5"}
对**任何**MA(1)，可能的最大$|\rho_1|$是多少？（输入这个界。）
::: solution
$|\theta|/(1+\theta^2) \le 1/2$，在$|\theta|=1$取到。
:::
:::

::: exercise AR(2)三角形 {level=2}
$\phi_1 = 0.4$，$\phi_2 = 0.7$满足因果AR(2)条件[[#eq-ar2-tri]]吗？若否，哪个不等式失败？
::: solution
$|\phi_2| = 0.7 < 1$成立；$\phi_2 - \phi_1 = 0.3 < 1$成立；$\phi_1 + \phi_2 = 1.1 \not< 1$失败。多项式$\phi(z) = 1 - 0.4z - 0.7z^2$有一个在单位圆内或上的根（事实上$\phi(1) = -0.1 < 0$而$\phi(0) = 1$，故$(0,1)$内有一个实根）。过程不是因果的。
:::
:::

::: exercise AR(1)的尤尔-沃克 {level=2 check="0.6"}
一个样本有$\hat\rho_1 = 0.6$和$\hat\gamma_0 = 4$。AR(1)中$\phi$的尤尔-沃克估计是多少？（输入$\hat\phi$。）
::: solution
滞后1的尤尔-沃克方程是$\gamma_1 = \phi\gamma_0$，所以$\hat\phi = \hat\rho_1 = 0.6$。
:::
:::

::: exercise ARMA(1,1)的$\rho_1$ {level=2 check="0.756"}
对$\phi = 0.6$，$\theta = 0.4$，把因果ARMA(1,1)的$\rho_1$算到三位小数。（输入$\rho_1$。）
::: solution
$\rho_1 = \dfrac{(1+0.6\cdot 0.4)(0.6+0.4)}{1+2\cdot 0.6\cdot 0.4 + 0.16} = \dfrac{(1.24)(1.0)}{1+0.48+0.16} = 1.24/1.64 = 0.756$。
:::
:::

::: exercise 公根冗余 {level=3}
设$\phi(z) = (1-0.5z)(1-0.3z)$且$\theta(z) = (1-0.5z)(1+0.4z)$。写出一个具有相同沃尔德系数、更低阶的ARMA模型。
::: hint
约去公因子$1-0.5z$。
:::
::: solution
$\psi(z) = \theta(z)/\phi(z) = (1+0.4z)/(1-0.3z)$，这是$\phi_1 = 0.3$、$\theta_1 = 0.4$的ARMA(1,1)。原来的ARMA(2,2)不可识别：一族一维的冗余参数化共享同样的二阶矩。
:::
:::

::: exercise 可逆孪生 {level=2}
一个MA(1)有$\rho_1 = 0.4$。求产生这一$\rho_1$的两个$\theta$值，并说明哪一个可逆。
::: hint
解$\theta/(1+\theta^2) = 0.4$。
:::
::: solution
$\theta = 0.4(1+\theta^2)$给出$0.4\theta^2 - \theta + 0.4 = 0$。乘以$5/2$：$\theta^2 - 2.5\theta + 1 = 0$，或更干净地$2\theta^2 - 5\theta + 2 = 0$，$(2\theta-1)(\theta-2) = 0$。根是$\theta = 1/2$和$\theta = 2$。只有$|\theta| < 1$可逆，所以$\theta = 1/2$。
:::
:::

::: exercise 残差自由度 {level=2}
你用MLE拟合ARMA(1,1)并在残差上计算Ljung-Box $Q(12)$。在独立同分布新息的原假设下，渐近$\chi^2$自由度是多少？若$Q(12) = 22.0$，你在5%拒绝吗？（$\chi^2_{10}$的5%临界值是$18.31$；$\chi^2_{12}$的是$21.03$。）
::: solution
两个ARMA参数已被估计（也许还有均值；通常的残差$Q$减去$p+q = 2$），所以参照分布是$\chi^2_{10}$。于是$22.0 > 18.31$，检验在5%拒绝。使用$\chi^2_{12}$（不减去$p+q$）在有限样本中会反保守，但这里也会拒绝，只是刚好。诚实的报告是相对$\chi^2_{10}$的拒绝。
:::
:::

::: exercise 接近单位根时的OLS方差 {level=3}
对零均值因果AR(1)，当$|\phi|<1$时$\sqrt{T}(\hat\phi-\phi)\to_d\Normal(0,1-\phi^2)$。在$\phi = 0$、$\phi = 0.9$和$\phi = 0.99$处计算渐近方差。为什么对$H_0{:}\ \phi = 1$的$t$检验**不能**通过把$\phi = 1$代入这个公式得到？
::: solution
渐近方差是$1$、$0.19$和$0.0199$。$\phi$的估计看起来随$\phi$接近$1$而更精确——但实验“$\phi$恰好是$1$”是一个不同的概率模型（随机游走），其中$\hat\phi$比$T^{-1/2}$收敛更快，极限分布是迪基-富勒分布，不是$\Normal(0,0)$。你不能通过从平稳中心极限定理取连续性来得到单位根检验。那种不连续性就是[[time-series/unit-roots]]存在的原因。
:::
:::
