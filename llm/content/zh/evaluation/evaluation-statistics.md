到目前为止，本课程里的每一个数字都是一个估计。基准是从更大的总体中抽出的一批题目，模型的回答是出自其输出分布的样本，而提示与随机种子则是同样合理的选择空间里的抽样。得分相差一分的两个模型可能根本没有差别；一次改动后"涨了两分"的模型可能只是走运。课程概述给出过评测中最有用的习惯：**报告不确定度**。本章提供把这件事做好的工具。

基础部分——准确率的标准误差、Wilson 区间、McNemar 检验与自助法——已在 [[ml-fundamentals/evaluation-metrics]] 与 [[math-for-ml/estimation]] 引入；预训练期间基准的噪声见 [[pretraining/in-training-evaluation]]。这里把它们针对语言模型评测展开，沿 Miller（2024）给出的框架。本章推导 **Wilson 区间**，并与朴素区间的覆盖率对照；把一个分数的方差分解为题目抽样与回答抽样两部分；用 McNemar 检验与配对自助法处理**配对**比较；计算检测出一个差距所需的**样本量**；为共享一篇文章的题目推导**簇稳健标准误**；处理**多重比较**；把**随机种子与提示**之间的方差分离出来；简短回顾**校准**；最后以一条报告规范收尾。所有清单都是纯 Python，输出是真实运行结果。

## 把题目当作样本 {#sec-sample}

[[evaluation/evaluation-principles#def-evaluation]] 把一次评测的被估计对象定义为题目总体 $\mathcal{D}$ 上的期望。$n$ 道题的基准就是从中抽出的一次样本，而对任何分数该问的问题是：换一批同样大小的样本，它会变多少？

::: definition 超总体视角 {#def-superpop}
设题目 $x_1, \dots, x_n$ 独立地来自 $\mathcal{D}$。对每道题记 $\mu_x = \E[s(x, y)\mid x]$ 为模型在 $x$ 上的期望得分（计分为二元时，就是它答对的概率），$\sigma_x^2 = \Var(s(x, y)\mid x)$ 为对它的回答作抽样产生的方差。若每题抽 $K$ 个回答取平均，分数为 $\hat\mu = \frac1n\sum_i\frac1K\sum_{j=1}^Ks(x_i, y_{ij})$，它是 $\mu = \E_{x\sim\mathcal{D}}[\mu_x]$ 的一个估计。
:::

::: proposition 两个方差来源 {#prop-two-sources}
在[[#def-superpop]]之下，

$$
\Var(\hat\mu) = \frac1n\left(\Var_x(\mu_x) + \frac{\E_x[\sigma_x^2]}{K}\right).
$$ {#eq-two-sources}

对每题只抽一个样本（$K = 1$）的二元计分，它等于熟悉的二项方差 $\mu(1 - \mu)/n$，且可分解为 $\mu(1 - \mu) = \Var_x(\mu_x) + \E_x[\mu_x(1 - \mu_x)]$。每题多抽几个回答只压小第二项；多加题目则两项都压。
:::

::: proof
逐题的平均分 $\bar s_i = \frac1K\sum_js(x_i, y_{ij})$ 独立同分布，故 $\Var(\hat\mu) = \Var(\bar s_1)/n$。由全方差公式，$\Var(\bar s_1) = \Var(\E[\bar s_1\mid x]) + \E[\Var(\bar s_1\mid x)] = \Var(\mu_x) + \E[\sigma_x^2/K]$，因为给定 $x$ 时 $K$ 个回答相互独立。对 $K = 1$ 的二元计分，$\bar s_1$ 是均值为 $\mu$ 的伯努利变量，方差为 $\mu(1 - \mu)$，且 $\sigma_x^2 = \mu_x(1 - \mu_x)$。
:::

Miller（2024）从这个分解得出两条实用建议。回答以零以上温度采样时，每题多抽几个再取平均——或者干脆直接用模型给正确答案的概率，那会把第二项整个消掉。还要明白：把回答重采多少遍都压不小第一项，它反映的正是当初恰好抽中的那批题目。

::: example 重采回答有多管用？ {#ex-resample}
一个模型在 $500$ 题的基准上总体准确率为 $0.6$，其逐题答对概率的方差为 $\Var_x(\mu_x) = 0.15$。每题抽 $1$ 个样本与抽 $10$ 个样本时，它的分数的标准误差各是多少？
::: solution
$K = 1$ 时：$\sqrt{0.24/500} = 0.0219$。题内那一项是 $0.24 - 0.15 = 0.09$。$K = 10$ 时：$\sqrt{(0.15 + 0.009)/500} = 0.0178$。生成代价翻十倍，标准误差只小 $19\%$；要把它减半，得把*题目*加到四倍。
:::
:::

## 准确率的置信区间 {#sec-wilson}

对二元计分，$n\hat\mu$（近似）服从二项分布。常用的 **Wald** 区间 $\hat\mu\pm z\sqrt{\hat\mu(1 - \hat\mu)/n}$ 把估计量代入方差，而它偏偏在评测常待的地方失灵：接近 $0$ 或 $1$，或者题目太少。**Wilson** 区间不这么代入。

::: proposition Wilson 得分区间 {#prop-wilson}
水平 $\alpha$ 的双边得分检验 $\{p : \lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}\}$（$z = z_{1-\alpha/2}$）不拒绝的 $p\in[0, 1]$ 的集合，就是区间

$$
\frac{\hat p + \frac{z^2}{2n}\ \pm\ z\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}.
$$ {#eq-wilson}

它永远落在 $[0, 1]$ 之内，其中心是 $\hat p$ 按权重 $\frac{z^2/n}{1 + z^2/n}$ 向 $\frac12$ 收缩后的位置。
:::

::: proof
条件是 $(\hat p - p)^2\le z^2p(1 - p)/n$。展开并按 $p$ 的幂次整理，

$$
\Big(1 + \frac{z^2}{n}\Big)p^2 - \Big(2\hat p + \frac{z^2}{n}\Big)p + \hat p^2\le0,
$$

这是关于 $p$、首项系数为正的二次式，故解集是两根之间的区间。判别式为 $(2\hat p + z^2/n)^2 - 4(1 + z^2/n)\hat p^2 = 4\hat pz^2/n + z^4/n^2 - 4\hat p^2z^2/n = \frac{4z^2}{n}\big(\hat p(1 - \hat p) + \frac{z^2}{4n}\big)$，两根为 $\big(2\hat p + z^2/n\pm\sqrt{\text{判别式}}\big)/\big(2(1 + z^2/n)\big)$，化简即得[[#eq-wilson]]。在 $p = 0$ 处二次式左边为 $\hat p^2\ge0$，在 $p = 1$ 处为 $(1 - \hat p)^2\ge0$，且顶点在 $[0, 1]$ 内，所以两根都落在 $[0, 1]$ 中。中心为 $(\hat p + z^2/(2n))/(1 + z^2/n) = w\cdot\frac12 + (1 - w)\hat p$，其中 $w = \frac{z^2/n}{1 + z^2/n}$。
:::

Wald 区间反演的是同一个检验，只是把方差中假设的 $p$ 换成了在 $\hat p$ 处的取值；正是这个替换让它在边界附近崩掉。下面的清单对照两者，包括它们的**覆盖率**——名义 $95\%$ 的区间实际包住真实准确率的频率——通过模拟来比较。

```python
import math, random

def wald(k, n, z=1.96):
    p = k / n
    h = z * math.sqrt(p * (1 - p) / n)
    return p - h, p + h

def wilson(k, n, z=1.96):
    p = k / n
    centre = (p + z * z / (2 * n)) / (1 + z * z / n)
    half = z / (1 + z * z / n) * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return centre - half, centre + half

print("47/50 correct: Wald   [%.3f, %.3f]" % wald(47, 50))
print("47/50 correct: Wilson [%.3f, %.3f]" % wilson(47, 50))

# 覆盖率：每个 95% 区间多大频率包含真实准确率？
rng = random.Random(8)
for n, p in [(50, 0.95), (50, 0.7), (500, 0.95)]:
    cover = {"Wald": 0, "Wilson": 0}
    reps = 20000
    for _ in range(reps):
        k = sum(rng.random() < p for _ in range(n))
        for name, f in (("Wald", wald), ("Wilson", wilson)):
            lo, hi = f(k, n)
            cover[name] += lo <= p <= hi
    print(f"n = {n:3d}, p = {p:.2f}: coverage Wald {cover['Wald'] / reps:.3f}, "
          f"Wilson {cover['Wilson'] / reps:.3f}")
```

```text
47/50 correct: Wald   [0.874, 1.006]
47/50 correct: Wilson [0.838, 0.979]
n =  50, p = 0.95: coverage Wald 0.919, Wilson 0.962
n =  50, p = 0.70: coverage Wald 0.933, Wilson 0.956
n = 500, p = 0.95: coverage Wald 0.932, Wilson 0.949
```

$50$ 题对 $47$ 时，Wald 区间伸出 $100\%$ 之外，而 Wilson 区间不对称、留在里面。在 $n = 50$、真实准确率 $95\%$ 的重复抽样里，Wald 区间只有 $92\%$ 的时间盖住真值；Wilson 约 $96\%$。有 $500$ 道题时两者都接近名义水平。对小型评测——几十道智能体任务、失败样本寥寥的安全测试——默认应当用 Wilson（或精确的 Clopper–Pearson 区间）。

::: widget confidence
dist: bernoulli
n: 50
level: 0.95
intervals: 80
method: z
caption: 对每次由 $50$ 道题估出的准确率模拟出的 $80$ 个 $95\%$ Wald 区间。盖不住真值的区间被高亮。把真实概率推向 $0$ 或 $1$，或减小 $n$，失手率就会升破 $5\%$——这正是[[#prop-wilson]]的 Wilson 区间所纠正的失灵。
:::

## 比较两个模型 {#sec-paired}

评测中最常见的统计问题是：模型 A 是否优于模型 B。当两者跑在**同一批题目**上时，比较应当是**配对的**：题目难度为两者共享，差值中大部分题目抽样方差会相互抵消。

::: proposition 配对差的方差 {#prop-paired}
设 $a_i, b_i$ 为两个模型在题目 $i$ 上的得分，$d_i = a_i - b_i$。则

$$
\Var(\bar a - \bar b) = \frac{\Var(a) + \Var(b) - 2\Cov(a, b)}{n} = \frac{\Var(d)}{n},
$$

只要得分在题目之间正相关，它就小于独立样本的方差 $(\Var(a) + \Var(b))/n$。对不一致率为 $\pi_{10} = \Prob(a = 1, b = 0)$ 与 $\pi_{01}$ 的二元计分，$\Var(d) = (\pi_{10} + \pi_{01}) - (\pi_{10} - \pi_{01})^2$。
:::

::: proof
第一个等号是 $n$ 对独立同分布配对数据的两组均值之差的方差；第二个是把同一表达式写成对 $d_i$ 的形式。二元计分下 $d_i\in\{-1, 0, 1\}$，且 $\Prob(d = 1) = \pi_{10}$、$\Prob(d = -1) = \pi_{01}$，故 $\E[d^2] = \pi_{10} + \pi_{01}$，$\E[d] = \pi_{10} - \pi_{01}$。
:::

在同一基准上评测的语言模型通常在多数题目上是一致的，因为容易的题对两者都容易，所以配对帮助很大。三种用法：

- 对 $\bar d$ 的**配对 $z$ 检验**，标准误差为 $\operatorname{sd}(d)/\sqrt n$；
- **McNemar 检验**（[[ml-fundamentals/evaluation-metrics]]）：以 $b + c$ 道不一致的题目为条件，检验是否 $b\sim\Bin(b + c, \frac12)$，可用 $\chi^2 = (b - c)^2/(b + c)$，也可用精确分布；
- **配对自助法**：把题目有放回地重抽，每道题的两个结果保持在一起，重算 $\bar d$ 并取分位数。它适用于任何指标（F1、pass@$k$、评审的胜率）；对簇，按簇重抽即可。

```python
import math, random

rng = random.Random(9)
sig = lambda z: 1 / (1 + math.exp(-z))
n = 1000
A, B = [], []
for _ in range(n):
    d = rng.gauss(0, 4.0)                        # 题目难度，两个模型共享
    A.append(int(rng.random() < sig(2.1 - d)))  # 模型 A 略强
    B.append(int(rng.random() < sig(1.6 - d)))
pa, pb = sum(A) / n, sum(B) / n
diff = [a - b for a, b in zip(A, B)]
mean_d = sum(diff) / n
se_unpaired = math.sqrt(pa * (1 - pa) / n + pb * (1 - pb) / n)
se_paired = math.sqrt(sum((x - mean_d) ** 2 for x in diff) / (n - 1) / n)
print(f"accuracy A {pa:.3f}, B {pb:.3f}, difference {mean_d:.3f}")
print(f"unpaired SE {se_unpaired:.4f} (z = {mean_d / se_unpaired:.2f}); "
      f"paired SE {se_paired:.4f} (z = {mean_d / se_paired:.2f})")

# McNemar：只有不一致的题目要紧
b = sum(a == 1 and c == 0 for a, c in zip(A, B))   # A 对、B 错
c = sum(a == 0 and c == 1 for a, c in zip(A, B))   # B 对、A 错
chi2 = (b - c) ** 2 / (b + c)
m = b + c
p_exact = min(1.0, 2 * sum(math.comb(m, j) for j in range(max(b, c), m + 1)) / 2 ** m)
print(f"discordant: b = {b}, c = {c}; McNemar chi2 = {chi2:.2f}, exact two-sided p = {p_exact:.4f}")

# 配对自助法：重抽题目，每道题的两个结果保持在一起
boot = []
for _ in range(5000):
    idx = [rng.randrange(n) for _ in range(n)]
    boot.append(sum(diff[i] for i in idx) / n)
boot.sort()
print(f"paired bootstrap 95% CI for the difference: [{boot[124]:.3f}, {boot[4874]:.3f}]")
print(f"agreement between the models: {sum(a == b for a, b in zip(A, B)) / n:.3f}")
```

```text
accuracy A 0.709, B 0.674, difference 0.035
unpaired SE 0.0206 (z = 1.70); paired SE 0.0125 (z = 2.80)
discordant: b = 96, c = 61; McNemar chi2 = 7.80, exact two-sided p = 0.0065
paired bootstrap 95% CI for the difference: [0.011, 0.060]
agreement between the models: 0.843
```

两个模型在 $84\%$ 的题目上一致。当作独立样本，它们 $3.5$ 个百分点的差距是 $1.70$ 个标准误——在 $5\%$ 水平下不显著。配对之后是 $2.80$ 个标准误，McNemar 精确 $p$ 值为 $0.0065$，配对自助区间不含零。数据一模一样，只是分析不同。反过来，拿两个模型各自的置信区间来比、因为重叠就宣称差异不显著，是个常见错误：边缘区间重叠与高度显著的配对差异完全可以并存。

## 需要多少道题？ {#sec-power}

在跑一次评测之前，值得先问它能不能检测出你在乎的那个差距。检验的**功效**是检测出给定大小的真实差距的概率。

::: proposition 比较准确率的样本量 {#prop-power}
显著性水平 $\alpha$、功效 $1 - \beta$ 的双边检验，要检测准确率上大小为 $\delta$ 的差距，近似需要

$$
n_{\text{unpaired}} = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2\,\big(p_1(1 - p_1) + p_2(1 - p_2)\big)}{\delta^2}
$$

道题（每个模型，题目集相互独立），题目集共享时需要

$$
n_{\text{paired}} = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2\,\big(\pi_{\text{disc}} - \delta^2\big)}{\delta^2}
$$ {#eq-n-paired}

道题，其中 $\pi_{\text{disc}} = \pi_{10} + \pi_{01}$ 是恰好只有一个模型答对的题目比例。
:::

::: proof
设 $\hat\delta$ 近似正态，均值 $\delta > 0$，标准差 $\sigma/\sqrt n$。当 $\hat\delta > z_{1-\alpha/2}\sigma/\sqrt n$ 时检验拒绝（忽略另一边可忽略的尾部）。拒绝概率为 $\Prob\big(Z > z_{1-\alpha/2} - \delta\sqrt n/\sigma\big)$，当 $z_{1-\alpha/2} - \delta\sqrt n/\sigma = -z_{1-\beta}$ 时它等于 $1 - \beta$，即 $n = (z_{1-\alpha/2} + z_{1-\beta})^2\sigma^2/\delta^2$。独立样本时 $\sigma^2 = p_1(1 - p_1) + p_2(1 - p_2)$；配对样本时由[[#prop-paired]]，$\sigma^2 = \Var(d) = \pi_{\text{disc}} - \delta^2$。（两项都用备择之下的方差是常用近似。）
:::

```python
import math, random
from statistics import NormalDist

Z = NormalDist().inv_cdf

def n_unpaired(p1, p2, alpha=0.05, power=0.8):
    """Questions per model to detect p1 - p2 with independent samples (two-sided z-test)."""
    return math.ceil((Z(1 - alpha / 2) + Z(power)) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))
                     / (p1 - p2) ** 2)

def n_paired(delta, discordant, alpha=0.05, power=0.8):
    """Questions to detect a difference delta when a fraction `discordant` of questions
    are answered correctly by exactly one of the two models (same questions for both)."""
    var_d = discordant - delta ** 2                    # d_i 在 {-1, 0, 1} 上的方差
    return math.ceil((Z(1 - alpha / 2) + Z(power)) ** 2 * var_d / delta ** 2)

print("unpaired, 70% vs 72%:", n_unpaired(0.72, 0.70))
for disc in (0.30, 0.15, 0.08):
    print(f"paired, delta = 0.02, discordant fraction {disc:.2f}:", n_paired(0.02, disc))

# 模拟验证：在算出的 n（不一致率 0.15）上配对 z 检验的功效
rng = random.Random(10)
n = n_paired(0.02, 0.15)
p_plus, p_minus = (0.15 + 0.02) / 2, (0.15 - 0.02) / 2   # P(d = +1)、P(d = -1)
hits, reps = 0, 2000
for _ in range(reps):
    d = [1 if u < p_plus else -1 if u < p_plus + p_minus else 0
         for u in (rng.random() for _ in range(n))]
    mean = sum(d) / n
    se = math.sqrt(sum((x - mean) ** 2 for x in d) / (n - 1) / n)
    hits += abs(mean / se) > 1.96
print(f"simulated power at n = {n}: {hits / reps:.3f}")
```

```text
unpaired, 70% vs 72%: 8077
paired, delta = 0.02, discordant fraction 0.30: 5879
paired, delta = 0.02, discordant fraction 0.15: 2936
paired, delta = 0.02, discordant fraction 0.08: 1562
simulated power at n = 2936: 0.808
```

要在 $70\%$ 附近检测出两个百分点的差距、功效 $80\%$，独立题目集大约需要 $8{,}000$ 道题——比多数基准的题目还多。配对削减这一数字的倍数，取决于两个模型多久不一致一次：在相关模型之间常见的 $15\%$ 不一致率下，约 $2{,}900$ 道题就够，模拟证实了这个功效。几百道题的多数基准只能检测五分以上的差距；在其上报告的一分提升，几乎从不曾被基准本身确立。

::: widget plot
f: 0.5*(1 + erf((d*sqrt(x)/s - 1.96)/sqrt(2)))
x: 0, 10000
y: 0, 1
sliders: d=0.02:0.005:0.1:0.005; s=0.39:0.1:0.7:0.01
hlines: 0.8
labels: 功效随题目数 $n$
caption: 显著性 $5\%$ 的双边检验检测准确率差距 $d$ 的近似功效（[[#prop-power]]），其中 $s$ 是逐题差值的标准差：$70\%$ 附近独立比较约为 $0.65$，$15\%$ 不一致率下配对比较为 $\sqrt{0.15}\approx0.39$。曲线在所需样本量处穿过 $80\%$。
:::

## 成簇的题目 {#sec-clusters}

到目前为止的公式都假设题目相互独立。许多基准并不如此：阅读理解集一篇文档配几道题；多轮基准给同一场对话的多轮计分；智能体套件包含同一任务的若干变体；有的基准由同一模板批量实例化生成。同一个**簇**里的题目共享难度，携带的独立信息比题目数所暗示的少。

::: proposition 簇标准误 {#prop-cluster}
设题目分成簇 $c = 1, \dots, C$，得分在簇之间独立、簇之内可以相关，并设 $\hat\mu = \frac1n\sum_is_i$。$\Var(\hat\mu)$ 的一个一致估计是**簇稳健**估计

$$
\widehat{\operatorname{SE}}_{\text{cl}}^2 = \frac{1}{n^2}\sum_{c=1}^C\Big(\sum_{i\in c}(s_i - \hat\mu)\Big)^2.
$$ {#eq-cluster-se}

若所有簇的大小都是 $m$，簇内得分有公共方差 $\sigma^2$ 与成对相关 $\rho$，则

$$
\Var(\hat\mu) = \frac{\sigma^2}{n}\big(1 + (m - 1)\rho\big),
$$ {#eq-design-effect}

于是朴素标准误偏小 $\sqrt{1 + (m - 1)\rho}$ 倍，即**设计效应**的平方根。
:::

::: proof
$n(\hat\mu - \mu) = \sum_cS_c$，其中 $S_c = \sum_{i\in c}(s_i - \mu)$ 在簇之间独立、均值为零，故 $\Var(\hat\mu) = \frac{1}{n^2}\sum_c\Var(S_c) = \frac{1}{n^2}\sum_c\E[S_c^2]$；[[#eq-cluster-se]] 以 $\mu$ 取估计值时的观测值代替每个 $\E[S_c^2]$，当 $C\to\infty$ 时是一致的。等大小簇下，$\Var(S_c) = m\sigma^2 + m(m - 1)\rho\sigma^2$（$m$ 个方差加上 $m(m - 1)$ 个有序对的协方差），$C = n/m$ 个簇时 $\Var(\hat\mu) = \frac{1}{n^2}\cdot\frac nm\cdot m\sigma^2(1 + (m - 1)\rho) = \frac{\sigma^2}{n}(1 + (m - 1)\rho)$。
:::

设计效应常常很大。每篇文档 $10$ 道题、文档内相关只有 $0.25$ 时，它是 $3.25$：一个 $1{,}000$ 题的基准，精度只相当于约 $300$ 道独立题目。

```python
import math, random

rng = random.Random(11)
sig = lambda z: 1 / (1 + math.exp(-z))

def benchmark(passages=100, per=10, mu=0.5, tau=1.5):
    """Reading-comprehension benchmark: questions share passages; a passage effect u
    makes all questions about the same passage easier or harder together."""
    data = []
    for c in range(passages):
        u = rng.gauss(0, tau)
        data += [(c, int(rng.random() < sig(mu + u))) for _ in range(per)]
    return data

def standard_errors(data):
    n = len(data)
    mean = sum(s for _, s in data) / n
    naive = math.sqrt(mean * (1 - mean) / n)
    by_cluster = {}
    for c, s in data:
        by_cluster[c] = by_cluster.get(c, 0.0) + (s - mean)
    clustered = math.sqrt(sum(v * v for v in by_cluster.values())) / n
    return mean, naive, clustered

mean, naive, clustered = standard_errors(benchmark())
print(f"one benchmark: accuracy {mean:.3f}, naive SE {naive:.4f}, clustered SE {clustered:.4f}, "
      f"ratio {clustered / naive:.2f}")

# 超总体的真实准确率：对文档效应作蒙特卡洛
truth = sum(sig(0.5 + rng.gauss(0, 1.5)) for _ in range(400000)) / 400000
cover_naive = cover_cl = 0
reps = 2000
for _ in range(reps):
    m, se_n, se_c = standard_errors(benchmark())
    cover_naive += abs(m - truth) <= 1.96 * se_n
    cover_cl += abs(m - truth) <= 1.96 * se_c
print(f"true accuracy {truth:.3f}; coverage of 95% intervals: naive {cover_naive / reps:.3f}, "
      f"clustered {cover_cl / reps:.3f}")
```

```text
one benchmark: accuracy 0.574, naive SE 0.0156, clustered SE 0.0281, ratio 1.79
true accuracy 0.588; coverage of 95% intervals: naive 0.703, clustered 0.954
```

簇标准误差是朴素值的 $1.8$ 倍，而覆盖率模拟说明了它为什么要紧：朴素 $95\%$ 区间只有 $70\%$ 的时间包含真实准确率，簇区间则是 $95\%$。Miller（2024）建议，只要题目共享语境就用簇标准误；对配对自助法同样如此——它必须按簇重抽，而不是按题目重抽。

::: example 设计效应 {#ex-design}
一个基准有 $2{,}000$ 道题、$400$ 篇文档（每篇 $5$ 题），某模型作答正确率在文档之间的相关为 $0.4$。朴素标准误差偏小多少倍？独立题目的有效数量是多少？
::: solution
设计效应 $1 + 4\cdot0.4 = 2.6$；朴素标准误差偏小 $\sqrt{2.6} = 1.61$ 倍；有效样本量为 $2000/2.6 = 769$ 道题。朴素的 $95\%$ 区间实际上只约当于一个 $78\%$ 区间，因为它只跨越 $1.96/1.61 = 1.22$ 个真实标准误。
:::
:::

## 多重比较 {#sec-multiple}

一份技术报告拿一个模型与另外五个在二十个基准上比较，就做了上百个比较。在 $5\%$ 水平下，即使模型之间毫无差异，其中也会有大约五个"显著"。对提示、检查点或子集的任何搜索都是如此（[[evaluation/evaluation-principles#prop-winners-curse]]）。

::: definition 多重检验的错误率 {#def-fwer}
做 $m$ 个假设检验时，**族错误率**（family-wise error rate，FWER）是至少出现一个错误拒绝的概率；**错误发现率**（false discovery rate，FDR）是拒绝中错误者所占的期望比例（没有拒绝时为零）。把 $p$ 值排序为 $p_{(1)}\le\dots\le p_{(m)}$：

- **Bonferroni** 拒绝满足 $p_i\le\alpha/m$ 的假设；
- **Holm**（1979）沿 $p_{(1)}, p_{(2)}, \dots$ 依次拒绝，只要 $p_{(k)}\le\alpha/(m - k + 1)$，遇到第一个不满足的就停；
- **Benjamini–Hochberg**（1995）找到满足 $p_{(k)}\le k\alpha/m$ 的最大 $k$，拒绝 $p_{(1)}, \dots, p_{(k)}$。
:::

::: proposition Bonferroni 控制族错误率 {#prop-bonferroni}
无论各检验之间如何相关，Bonferroni 程序的族错误率都不超过 $\alpha$。
:::

::: proof
记 $I_0$ 为全体真原假设的集合。若存在 $i\in I_0$ 使 $p_i\le\alpha/m$，就发生错误拒绝。由联合界以及每个 $p$ 值的有效性，$\Prob\big(\bigcup_{i\in I_0}\{p_i\le\alpha/m\}\big)\le\sum_{i\in I_0}\alpha/m\le\alpha$。
:::

Holm 程序在任意相关之下也控制族错误率，且拒绝得至少和 Bonferroni 一样多；Benjamini–Hochberg 控制的是较弱的错误发现率（在独立或正相关之下），当许多效应为真时功效要高得多。用哪个取决于要主张什么："模型 A 在这组基准上每一个都胜过 B"是族系式论断；"这里是 A 看起来更好的那些基准"是发现式论断。最省事的保护是一开始就定下哪些比较是要紧的，其余作为探索性结果报告。

::: example 三种校正 {#ex-multiple}
五个比较给出 $p$ 值 $0.001, 0.008, 0.012, 0.04, 0.2$。在不做校正、Bonferroni、Holm 与 Benjamini–Hochberg 之下，$\alpha = 0.05$ 时哪些显著？
::: solution
不做校正：前四个。Bonferroni（阈值 $0.01$）：前两个。Holm：$0.001\le0.05/5$，$0.008\le0.05/4 = 0.0125$，$0.012\le0.05/3 = 0.0167$，但 $0.04 > 0.05/2$：前三个。Benjamini–Hochberg（阈值 $0.01, 0.02, 0.03, 0.04, 0.05$）：满足 $p_{(k)}\le k\cdot0.01$ 的最大 $k$ 是 $k = 4$（$0.04\le0.04$）：前四个。各方法在强结果上一致、在边缘结果上分岔——论断的种类正是在这里要紧。
:::
:::

## 随机种子、提示与其他方差 {#sec-variance}

题目抽样并不是唯一的变异来源。分数还依赖于评测者视作任意的选择，而换一个同样任意的选择就换一个分数。

- **回答采样**：温度高于零时，重跑一遍回答就不同（[[#prop-two-sources]]）。
- **提示模板**：同样合理的模板、少样本集与顺序会改变分数，有时幅度很大（[[evaluation/evaluation-principles#sec-pipeline]]）。
- **训练随机种子**：只差随机种子的两次训练，得到的模型分数不同；Madaan 等（2024）在语言模型上度量过这一点，发现种子方差与许多已发表的改进不相上下；更早对微调模型的研究就发现了巨大的种子效应（Dodge 等，2020）。
- **评测基础设施**：硬件、数值精度与批处理会让贪心输出有微小变化；智能体评测还添上工具、超时与环境带来的变异。

若论断是关于某个**方法**（训练配方、架构）的，相关总体就包括种子，方法的方差必须由若干次训练来估计；每个方法只跑一次，题目再多也分不出是方法还是种子。若论断是关于某个**模型**在**一系列提示**之下的，提示也构成一个样本。

::: proposition 提示模板带来的方差 {#prop-prompts}
设模板 $j$ 之下模型 A 与 B 的分数之差为 $\Delta + \gamma_j + \varepsilon_j$，其中 $\Delta$ 是模板总体上的平均差，$\gamma_j$ 是模板特有的交互项、方差为 $\tau^2$，$\varepsilon_j$ 是配对比较的题目抽样误差、方差为 $v$，三者相互独立。对 $P$ 个模板取平均，$\Delta$ 的估计方差为 $(\tau^2 + v)/P$；而 $P$ 个模板级差值的经验方差除以 $P$，就是它的无偏估计。
:::

::: proof
模板级差值 $D_j = \Delta + \gamma_j + \varepsilon_j$ 独立同分布，均值为 $\Delta$、方差为 $\tau^2 + v$，故其均值的方差为 $(\tau^2 + v)/P$；独立同分布变量的样本方差是其方差的无偏估计。
:::

实际结论是：单个模板会把 $\tau^2$ 完全藏起来：在一个模板上、对上千道题作配对检验而显著的差距，可能落在跨模板的散布之内。Sclar 等（2023）正是因此建议报告性能在一批格式上的范围或分布。若论断是关于模型固定在某个提示之下部署的，$\tau^2$ 无关紧要；若论断是一般性的，它就不是。

### 校准 {#sec-calibration}

评测的统计量还包括模型自己陈述的不确定度。若模型以置信度 $c$ 给出的回答中有比例 $c$ 是正确的，就称该模型**校准**良好（[[ml-fundamentals/evaluation-metrics]]）。**期望校准误差**（expected calibration error，ECE）把回答按置信度分箱，对箱大小加权平均"平均置信度与准确率之差的绝对值"。对语言模型，置信度可以从词元概率读出（选择题）或用文字询问。Kadavati 等（2022）发现，大型预训练模型在合适格式的选择题上校准良好；GPT-4 技术报告（OpenAI，2023）显示预训练模型的校准被后训练破坏了；人类的最后考试这类基准报告了陈述置信度中的大校准误差（[[evaluation/benchmarks#sec-hle]]）。ECE 本身也是一个带分箱选择与抽样噪声的估计，应当像任何指标一样连同分箱和区间一起报告。

::: example 一个期望校准误差 {#ex-ece}
某模型的回答落入三个置信度箱：$200$ 个回答，平均置信度 $0.55$，准确率 $0.50$；$500$ 个，置信度 $0.75$，准确率 $0.70$；$300$ 个，置信度 $0.95$，准确率 $0.80$。计算 ECE。
::: solution
$\text{ECE} = (200\cdot0.05 + 500\cdot0.05 + 300\cdot0.15)/1000 = (10 + 25 + 45)/1000 = 0.08$。模型在每个箱中都过度自信，以自称近乎确定时最甚——而那正是对决策最要紧的箱。
:::
:::

::: quiz
一篇论文报告其方法把一个 $1{,}200$ 题的阅读理解基准上的准确率从 $81.0\%$ 提高到 $82.5\%$：每个方法各训练一次，用一个提示，配对检验 $p = 0.03$。哪些担忧是成立的？
- [x] 题目共享文章，配对检验的标准误差很可能偏小
- [x] 每个方法只训练一次，无法把方法与种子分开
- [x] 换一个提示模板，差距可能改变甚至反转
- [ ] 两种方法用同样的题目时，配对检验并不合适
::: solution
聚类抬高了真实方差（[[#prop-cluster]]），每个方法训练一次便测不到种子方差，单个模板把模板方差藏了起来（[[#prop-prompts]]）。用同样的题目配对恰恰是正确的；问题在于它没有覆盖的那些方差来源。
:::
:::

## 报告结果 {#sec-reporting}

本章的工具合起来构成一条报告规范。Miller（2024）与其他人提出过类似的清单；要领如下。

::: algorithm 报告一次评测 {#alg-reporting}
1. **描述被估计对象**：题目集（版本、子集、$n$）、协议（模板、示例数、解码、每题样本数、工具）与计分（[[evaluation/evaluation-principles#def-evaluation]]）。
2. **每个分数都配上不确定度**：标准误差或 $95\%$ 区间——小数据集上的准确率用 Wilson，题目共享语境时用簇的，其他指标用自助法。
3. **用配对方法比较**共享题目上的结果，报告**差值**的区间，而不是两个各自独立的区间。
4. **写明覆盖了哪些方差来源**：只有题目，还是也包括回答采样、提示模板与训练种子；论断需要时，后几种各跑若干个。
5. **为要紧的差距规划样本量**，并说明基准何时分辨不出它们。
6. **计入多重性**：说明考察了多少种配置、基准与比较，区分预先设定与探索性的比较，族系式论断要作校正。
7. **避免在测试集上做选择**；在开发数据上选择，在留出数据上只报告一次。
:::

::: warning "不显著"不等于"没差别"
比较不显著，意思是数据在所选水平下分不出这两个模型——常常是因为基准太小（[[#prop-power]]）——而不是它们相等。要报告差值的置信区间："$+0.8$ 分，$95\%$ 区间 $[-1.5, 3.1]$"说的是数据与"小亏"到"大赚"之间的任何情形都相容。要宣称两个模型**等价**，就事先定出边界，并证明整个区间落在其中。反过来，$50{,}000$ 道题上 "$0.3$ 分"的"显著"差异，可能真实，却无足轻重。
:::

::: history
二项比例的置信区间始于 Wilson（1927）与 Clopper 和 Pearson（1934）；配对比例的 McNemar 检验始于 1947 年；自助法始于 Efron（1979）。簇稳健方差估计发展于计量经济学与抽样统计（Kish 的设计效应，1965；Liang 与 Zeger，1986）。多重比较校正从 Bonferroni 不等式经 Holm（1979）走到 Benjamini 与 Hochberg 的错误发现率（1995）。在 NLP 中，Dror 等（2018）综述了显著性检验并发现其经常缺席或被误用，Card 等（2020）表明许多 NLP 实验功效不足，Dodge 等（2020）度量了微调种子带来的方差。就语言模型评测而言，Miller（2024）把这些线索汇到一处——超总体视角、簇标准误、配对分析、靠重抽削减方差、功效分析——而 Madaan 等（2024）在常见基准上量化了跨种子与检查点的方差。
:::

::: summary
- 基准是一批题目的样本；一个分数的方差是 $\frac1n\big(\Var_x(\mu_x) + \E_x[\sigma_x^2]/K\big)$（[[#prop-two-sources]]）。每题多抽回答只压小第二项。
- **Wilson** 区间反演得分检验（[[#prop-wilson]]）；它留在 $[0, 1]$ 内，并在 Wald 区间失灵之处（$n$ 小、准确率接近 $0$ 或 $1$）保得住覆盖率。
- 共享题目上的**配对**比较方差为 $\Var(d)/n$（[[#prop-paired]]），常远小于独立比较；用配对 $z$ 检验、McNemar 检验或配对自助法，并报告差值的区间。
- **样本量**：$n = (z_{1-\alpha/2} + z_{1-\beta})^2\sigma^2/\delta^2$（[[#prop-power]]）；检测两分之差即使配对也要几千道题。
- **成簇**的题目按设计效应 $1 + (m - 1)\rho$ 抬高方差；用簇稳健标准误（[[#prop-cluster]]），并按簇重抽。
- 校正**多重比较**（Bonferroni、Holm、Benjamini–Hochberg，[[#def-fwer]]）；论断是一般性时报告**种子**与**提示**方差（[[#prop-prompts]]）；校准连同分箱一起报告。
- 报告被估计对象、不确定度、配对差、方差来源与比较次数（[[#alg-reporting]]）。
:::

## 习题

::: exercise 一个 Wilson 区间 {level=1 check="0.699"}
一个模型答对 $20$ 题中的 $18$ 题。由[[#eq-wilson]]计算 $95\%$ Wilson 区间的下端（三位小数），并与 Wald 区间比较。
::: solution
$\hat p = 0.9$，$z^2/n = 3.8416/20 = 0.1921$。中心 $(0.9 + 0.0960)/1.1921 = 0.8356$；半宽 $\frac{1.96}{1.1921}\sqrt{0.0045 + 0.0024} = 1.6442\cdot0.0831 = 0.1366$。区间为 $[0.699, 0.972]$。Wald 区间是 $0.9\pm1.96\cdot0.0671 = [0.769, 1.031]$，超过了 $1$，且中心偏高。
:::
:::

::: exercise 回答重采样 {level=1 check="0.0180"}
一个模型在 $400$ 道题上总体准确率 $0.5$，$\Var_x(\mu_x) = 0.10$。用[[#eq-two-sources]]计算每题 $K = 5$ 个样本时其分数的标准误差（四位小数）。
::: solution
$\E_x[\mu_x(1 - \mu_x)] = 0.25 - 0.10 = 0.15$，故 $\Var(\hat\mu) = (0.10 + 0.15/5)/400 = 0.13/400$，标准误差为 $\sqrt{0.000325} = 0.0180$。
:::
:::

::: exercise 设计效应 {level=1 check="2.2"}
题目以 $5$ 道为一簇，簇内相关 $0.3$。[[#eq-design-effect]]的设计效应是多少？$1{,}000$ 题的基准相当于多少道独立题目？
::: solution
$1 + 4\cdot0.3 = 2.2$；有效规模 $1000/2.2\approx455$。
:::
:::

::: exercise 独立比较的样本量 {level=2 check="1091"}
以相互独立的题目集检测 $75\%$ 与 $80\%$ 之间的准确率差距，$\alpha = 0.05$ 双边、功效 $80\%$，每个模型需要多少道题？取 $z_{0.975} + z_{0.8} = 2.8016$ 并向上取整。
::: solution
$2.8016^2(0.75\cdot0.25 + 0.8\cdot0.2)/0.05^2 = 7.849\cdot0.3475/0.0025 = 1091.0$；向上取整，每个模型 $1{,}091$ 道题。
:::
:::

::: exercise 配对样本量 {level=2 check="1039"}
两个模型将在共享题目上比较。预期差距 $\delta = 0.03$，不一致题目比例为 $0.12$。由[[#eq-n-paired]]，$\alpha = 0.05$、功效 $80\%$ 需要多少道题？
::: solution
$7.849\cdot(0.12 - 0.0009)/0.0009 = 7.849\cdot132.33 = 1038.7$，故 $1{,}039$ 道题。
:::
:::

::: exercise 精确 McNemar 检验 {level=2 check="0.0352"}
在共享题目集上，只有模型 A 答对的有 $12$ 题，只有模型 B 答对的有 $3$ 题。计算精确双边 McNemar $p$ 值，保留四位小数。
::: solution
原假设之下 $b\sim\Bin(15, \frac12)$。$\Prob(b\ge12) = (\binom{15}{12} + \binom{15}{13} + \binom{15}{14} + \binom{15}{15})/2^{15} = (455 + 105 + 15 + 1)/32768 = 0.01758$，双边 $p$ 值取其两倍，$0.0352$。$\chi^2$ 近似给出 $(12 - 3)^2/15 = 5.4$、$p = 0.020$——不一致题目这么少时它偏乐观。
:::
:::

::: exercise 模板级方差 {level=2 check="0.609"}
两个模型在 $5$ 个提示模板下比较，准确率差（百分点）为 $2.1, -0.5, 1.4, 3.0, 0.5$。由[[#prop-prompts]]估计平均差及其标准误差（三位小数），并说明数据是否支持一个正的差距。
::: solution
均值为 $1.3$ 分。样本标准差为 $1.362$，故标准误差为 $1.362/\sqrt5 = 0.609$ 分。自由度为 $4$ 时 $t_{0.975} = 2.776$，$95\%$ 区间为 $1.3\pm1.69 = [-0.39, 2.99]$：与"跨模板没有差距"相容——即使每个模板对大量题目的配对检验都显著。
:::
:::

::: exercise 簇自助法 {level=3}
为[[#sec-clusters]]的基准实现一个**簇自助法**：把文档有放回地重抽（每篇文档的题目全部保留），重算准确率，取 $1{,}000$ 次重抽的标准差。与按题目重抽的朴素自助法、以及清单中的两个标准误差比较。
::: solution
```python
import math, random

rng = random.Random(12)
sig = lambda z: 1 / (1 + math.exp(-z))
data = {}
for c in range(100):                                  # 100 篇文档，每篇 10 道题
    u = rng.gauss(0, 1.5)
    data[c] = [int(rng.random() < sig(0.5 + u)) for _ in range(10)]
flat = [s for qs in data.values() for s in qs]
n = len(flat)

def sd(xs):
    m = sum(xs) / len(xs)
    return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1))

naive = [sum(flat[rng.randrange(n)] for _ in range(n)) / n for _ in range(1000)]
keys = list(data)
cluster = []
for _ in range(1000):
    picked = [data[keys[rng.randrange(len(keys))]] for _ in keys]
    cluster.append(sum(map(sum, picked)) / sum(map(len, picked)))
mean = sum(flat) / n
se_cl = math.sqrt(sum(sum(s - mean for s in qs) ** 2 for qs in data.values())) / n
print(f"accuracy {mean:.3f}")
print(f"question bootstrap SE {sd(naive):.4f}, binomial SE {math.sqrt(mean * (1 - mean) / n):.4f}")
print(f"cluster bootstrap SE  {sd(cluster):.4f}, cluster-robust SE {se_cl:.4f}")
```

```text
accuracy 0.586
question bootstrap SE 0.0155, binomial SE 0.0156
cluster bootstrap SE  0.0305, cluster-robust SE 0.0310
```

按题目重抽复现了朴素的二项标准误差，也就继承了它的错误；按文档重抽复现了[[#eq-cluster-se]]的簇稳健标准误差。自助法的好坏，不超过它关于什么相互独立的假设。
:::
:::

::: exercise 聚类下的功效 {level=3}
把[[#prop-power]]与[[#prop-cluster]]合起来：在簇大小为 $m$、逐题差值的簇内相关为 $\rho_d$ 的基准上做配对比较，需要多少道题？对[[#sec-power]]清单中的配对例子（$\delta = 0.02$，不一致率 $0.15$）取 $m = 5$、$\rho_d = 0.2$ 计算，并讨论这对建设基准意味着什么。
::: solution
聚类把 $\bar d$ 的方差乘以 $1 + (m - 1)\rho_d$，于是所需题目数也乘以同样的设计效应：$n = (z_{1-\alpha/2} + z_{1-\beta})^2(\pi_{\text{disc}} - \delta^2)(1 + (m - 1)\rho_d)/\delta^2$。按所给数字，设计效应为 $1 + 4\cdot0.2 = 1.8$，$2936\cdot1.8\approx5{,}285$ 道题（约 $1{,}057$ 篇文档）。对基准建设者，这意味着每篇文档、每个模板或每个任务出很多道题，远不如同样数量的独立题目值钱：预算固定时，文档多、每题文档里题目少，精度更高；而且基准应当记录自己的簇结构，好让使用者算得出正确的标准误差。
:::
:::
