向浅绿色的硫酸镍(II)溶液中逐滴加入氨水。随着氨分子一个一个地取代水，颜色由蓝绿加深到浓郁的金蓝色，溶液最终成为以 $\mathrm{[Ni(NH_3)_5(H_2O)]^{2+}}$ 与 $\mathrm{[Ni(NH_3)_6]^{2+}}$ 为主的混合物。现在用乙二胺（en）重复这个实验。只需三个分子就能取代全部六个水，而在氮给体总浓度相同的情况下，镍的结合紧上一万亿倍。两个胺氮就是两个胺氮，无论是否有 $\mathrm{CH_2CH_2}$ 桥把它们连在一起；这座桥多带来了什么？

本章把配合物的稳定性定量化。它定义逐级与累积生成常数，并展示如何计算溶液中各物种的分布；它解释逐级常数为何依次减小；它分析支配分析化学、医学与湿法冶金中配体设计的三种效应：**螯合效应**、**大环效应**以及金属与配体的**硬-软**匹配。它还解释**欧文-威廉姆斯序列**——一个对第一行二价阳离子与几乎任何配体都成立的稳定性顺序——并说明配位如何移动氧化还原电势。从头到尾，"稳定性"指热力学稳定性，即平衡常数。配合物形成或交换配体有多快，是另一个问题，在[[coordination-chemistry/inorganic-mechanisms]]中回答。

## 生成常数

在水中，金属离子本身已是配合物 $\mathrm{[M(H_2O)_6]^{n+}}$，配位成另一个配体的过程就是水被逐步取代。水是溶剂，其活度取为 1，从平衡表达式中略去。

::: definition 逐级与累积生成常数 {#def-formation}
对逐步反应 $\mathrm{ML_{n-1} + L \rightleftharpoons ML_n}$（电荷与配位水略去），**逐级生成常数**为
$$
K_n = \frac{[\mathrm{ML}_n]}{[\mathrm{ML}_{n-1}][\mathrm{L}]}, \qquad n = 1, 2, \dots, N,
$$
而 $\mathrm{M} + n\mathrm{L} \rightleftharpoons \mathrm{ML}_n$ 的**累积生成常数**为
$$
\beta_n = \frac{[\mathrm{ML}_n]}{[\mathrm{M}][\mathrm{L}]^n} = K_1K_2\cdots K_n, \qquad \log\beta_n = \sum_{i=1}^{n}\log K_i.
$$ {#eq-beta}
浓度以相对于 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{mol\,dm^{-3}}$ 计，所以常数是依赖于这一标准态选择的无量纲数。表列数值（如马特尔与史密斯为 IUPAC 与 NIST 编纂的关键数据选编）对应注明的温度与离子强度，因为活度系数不等于 1；它们是该离子强度下的浓度商。$\mathrm{ML}_n$ 的标准生成吉布斯自由能为 $\Delta G^\circ = -RT\ln\beta_n$。
:::

对于镍(II)与氨，比耶鲁姆（Jannik Bjerrum）的经典测量给出 $\log K_1$ 到 $\log K_6 \approx 2.80, 2.24, 1.73, 1.19, 0.75, 0.03$，故 $\log\beta_n = 2.80$、$5.04$、$6.77$、$7.96$、$8.71$ 与 $8.74$。每一级常数都比前一级小。这一减小有一部分纯属计数。

::: proposition 相邻常数的统计比 {#prop-statistical}
若一个金属有 $N$ 个等价位点，且每个位点对 L 的本征亲和力不依赖于已占据的数目，则
$$
\frac{K_n}{K_{n+1}} = \frac{(N - n + 1)(n + 1)}{n(N - n)}.
$$ {#eq-statistical}
对 $N = 6$，比值 $K_1/K_2, \dots, K_5/K_6$ 为 $2.40$、$1.88$、$1.78$、$1.88$、$2.40$，每步 $\log K$ 的下降仅 $0.25$–$0.38$。
:::

::: proof
设 $k_\mathrm{f}$ 与 $k_\mathrm{b}$ 分别为 L 结合到某个特定空位与从某个特定已占位点解离的速率常数（任取每位置的常数皆可；重要的只是二者之比）。在 $\mathrm{ML}_{n-1}$ 中有 $N - n + 1$ 个可供 L 进入的空位（即原来持水的位点），而在 $\mathrm{ML}_n$ 中有 $n$ 个配体 L，其中任何一个都可以离开。平衡时正逆速率相等：
$$
(N - n + 1)k_\mathrm{f}[\mathrm{ML}_{n-1}][\mathrm{L}] = n\,k_\mathrm{b}[\mathrm{ML}_n]
\quad\Longrightarrow\quad
K_n = \frac{N - n + 1}{n}\cdot\frac{k_\mathrm{f}}{k_\mathrm{b}}.
$$
于是 $K_n/K_{n+1} = \dfrac{(N - n + 1)/n}{(N - n)/(n + 1)} = \dfrac{(N - n + 1)(n + 1)}{n(N - n)}$。代入 $N = 6$、$n = 1$：$6 \times 2/(1 \times 5) = 2.40$；$n = 2$：$5 \times 3/(2 \times 4) = 1.875$；$n = 3$：$4 \times 4/(3 \times 3) = 1.78$；由对称性，其余值反序相同。这个论证与动力学无关：它等价于清点每种物种可以生成的可区分方式数目，即相邻配合物之间的构型熵之差。
:::

::: example 镍氨配合物：统计之外 {#ex-ni-ammines}
把 $\mathrm{Ni^{2+}}$ 与 $\mathrm{NH_3}$ 实测的差值 $\log K_n - \log K_{n+1}$ 与统计预言比较，并解释超出统计的部分。
::: solution
实测：$2.80 - 2.24 = 0.56$，$2.24 - 1.73 = 0.51$，$1.73 - 1.19 = 0.54$，$1.19 - 0.75 = 0.44$，$0.75 - 0.03 = 0.72$。统计（[[#prop-statistical]]）：$\log 2.40 = 0.38$，$\log 1.875 = 0.27$，$\log 1.78 = 0.25$，$0.27$，$0.38$。实测下降每步大约多出 $0.2$–$0.3$，最后一步多得多。超额部分有几个来源：每一个配位的氨都使金属正电荷减少，从而对下一个是更弱的路易斯酸；随配位球填满，配体-配体排斥增大；随水被移走，配合物的水合也发生变化。第六步的骤降反映六个氨（每个带三条与第二配位球水相互作用的 N–H 键）挤在一个小的 $3d$ 离子周围。远大于统计的级间下降常预示几何或自旋的改变；铜(II)与 en 的第三步（[[coordination-chemistry/crystal-field-theory#ex-jahn-teller]]）是经典例子；汞(II)偏好直线二配位，对多数配体 $K_2$ 与 $K_3$ 之间出现大降。
:::
:::

### 型体分布

给定常数与自由配体浓度 $[\mathrm{L}]$，金属以各物种存在的分数由[[#eq-beta]]直接得出：
$$
\alpha_n = \frac{[\mathrm{ML}_n]}{c_\mathrm{M}} = \frac{\beta_n[\mathrm{L}]^n}{\sum_{i=0}^{N}\beta_i[\mathrm{L}]^i}, \qquad \beta_0 = 1,
$$ {#eq-alpha}
而平均配位数，即比耶鲁姆的**生成函数**，为 $\bar n = \sum_n n\alpha_n$。比耶鲁姆通过测量 $\bar n$ 随 $[\mathrm{L}]$（由 pH 得出，因为游离氨与铵平衡）的变化并拟合曲线来测定逐级常数。
::: widget plot
f: 1/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(2.8+1*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(5.04+2*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(6.77+3*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(7.96+4*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(8.71+5*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(8.74+6*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x)))
x: -5, 1
y: 0, 1
labels: \mathrm{Ni^{2+}}; \mathrm{[Ni(NH_3)]^{2+}}; \mathrm{[Ni(NH_3)_2]^{2+}}; \mathrm{[Ni(NH_3)_3]^{2+}}; \mathrm{[Ni(NH_3)_4]^{2+}}; \mathrm{[Ni(NH_3)_5]^{2+}}; \mathrm{[Ni(NH_3)_6]^{2+}}
caption: 由[[#eq-alpha]]以比耶鲁姆的 $\log\beta_n$（$2.80$、$5.04$、$6.77$、$7.96$、$8.71$、$8.74$）绘出的镍(II)在其七个氨配物种间的分布对 $x = \log_{10}([\mathrm{NH_3}]/\mathrm{mol\,dm^{-3}})$（游离氨浓度）。每个中间物种在 $[\mathrm{L}] = (K_nK_{n+1})^{-1/2}$ 处达到自己的最大值；由于相邻常数彼此接近，任何一个中间物种从不超过镍的一半左右（一氨与四氨物种的峰值为 47 % 与 42 %）：镍氨溶液永远是混合物。即便在 $1\ \mathrm{mol\,dm^{-3}}$ 游离氨（$x = 0$）中，六氨也只占总镍的 47 %，另有 44 % 五氨。对比螯合配体：它们的常数更大、间隔更宽，型体分布干净得多。
:::

::: example 有多少镍是游离的？ {#ex-speciation}
在游离氨浓度为 $0.100\ \mathrm{mol\,dm^{-3}}$（由氨/铵缓冲液维持）的溶液中，求镍以 $\mathrm{[Ni(H_2O)_6]^{2+}}$ 存在的分数、以 $\mathrm{[Ni(NH_3)_4]^{2+}}$ 存在的分数，以及平均配位的氨数。
::: solution
以 $[\mathrm{L}] = 0.100$ 计算 $\beta_n[\mathrm{L}]^n$：$n = 0$：1；$n = 1$：$10^{2.80-1} = 63.1$；$n = 2$：$10^{5.04-2} = 1096$；$n = 3$：$10^{3.77} = 5888$；$n = 4$：$10^{3.96} = 9120$；$n = 5$：$10^{3.71} = 5129$；$n = 6$：$10^{2.74} = 550$。总和为 $21\,847$。于是 $\alpha_0 = 1/21\,847 = 4.6\times10^{-5}$，即只有 0.005 % 的镍是水合离子；$\alpha_4 = 9120/21\,847 = 0.417$。其余分数为 $\alpha_1 = 0.003$、$\alpha_2 = 0.050$、$\alpha_3 = 0.270$、$\alpha_5 = 0.235$ 与 $\alpha_6 = 0.025$，且 $\bar n = \sum n\alpha_n = 3.91$。对"这个溶液里镍氨配合物的化学式是什么？"这一问题的回答是：没有唯一的一个。
:::
:::

## 螯合效应

::: definition 螯合效应 {#def-chelate-effect}
**螯合效应**指含螯合环的配合物比具有相同给体原子的单齿配体类似配合物有更高的热力学稳定性：例如 $\mathrm{[Ni(en)_3]^{2+}}$ 的 $\log\beta_3 = 18.3$，而 $\mathrm{[Ni(NH_3)_6]^{2+}}$ 的 $\log\beta_6 = 8.74$。它以交换反应的平衡来度量，此处为
$$
\mathrm{[Ni(NH_3)_6]^{2+} + 3\,en \rightleftharpoons [Ni(en)_3]^{2+} + 6\,NH_3}, \qquad \log K = 18.3 - 8.74 = 9.6.
$$
:::

当给体原子在化学上尽可能相似、从而 M–N 键的焓相同时，比较最公平。甲胺与 en 的两端一样是伯胺，比氨更宜作比较。经典数据集是镉(II)的：

| complex | $\log\beta$ | $\Delta H^\circ$ / $\mathrm{kJ\,mol^{-1}}$ | $\Delta S^\circ$ / $\mathrm{J\,K^{-1}\,mol^{-1}}$ | $\Delta G^\circ$ / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|---|---|
| $\mathrm{[Cd(NH_2CH_3)_4]^{2+}}$ | 6.55 | $-57.3$ | $-67.3$ | $-37.4$ |
| $\mathrm{[Cd(en)_2]^{2+}}$ | 10.62 | $-56.5$ | $+14.1$ | $-60.6$ |

焓几乎完全相同：四条与伯胺成键的 Cd–N 键就是四条 Cd–N 键。$\beta$ 上四个数量级的差别完全来自熵。

::: proposition 螯合效应的起源 {#prop-chelate}
对 $2m$ 个单齿配体被 $m$ 个给体原子相近的双齿配体取代的反应，$\Delta H^\circ \approx 0$，螯合效应来自熵项。两种等价的描述：

1. **平动熵**：总反应释放的独立分子多于消耗，$\mathrm{[ML_{2m}] + m\,\mathrm{LL} \rightarrow [M(LL)_m] + 2m\,\mathrm{L}}$，净增 $m$ 个粒子，每个在标准浓度下约值 $R\ln(c_\mathrm{eff}/c^\circ)$ 的熵。
2. **有效浓度**：螯合配体一旦有一端结合，第二个给体原子就被限制在金属附近的小体积内，其有效浓度约为
$$
c_\mathrm{eff} \approx \frac{1}{N_\mathrm{A}V}, \qquad V \approx \tfrac43\pi r^3,
$$ {#eq-ceff}
其中 $r$ 是自由端可以移动的距离。对 $r \approx 300\ \mathrm{pm}$，$c_\mathrm{eff} \approx 15\ \mathrm{mol\,dm^{-3}}$，远高于典型溶液中单齿配体的浓度。
:::

::: proof
把螯合物的生成写成两步：第一个给体原子结合（类似单齿配体，常数 $K_\mathrm{mono}$）与成环（分子内、一级过程，无量纲常数 $K_\mathrm{ring}$）。总常数为 $K_\mathrm{chel} = K_\mathrm{mono}K_\mathrm{ring}$。相应的第二个单齿配体的常数为 $K_\mathrm{mono}'$（除以 $c^\circ$ 之前以 $\mathrm{dm^3\,mol^{-1}}$ 计），在平衡中乘以它的自由浓度 $[\mathrm{L}]$ 出现。成环就像在固定的局部浓度 $c_\mathrm{eff}$ 下的一次结合：若所成的键相同，$K_\mathrm{ring} \approx K_\mathrm{mono}'c_\mathrm{eff}$。所以只要 $c_\mathrm{eff} > [\mathrm{L}]$，螯合体就胜过第二个单齿配体。对 $c_\mathrm{eff}$ 的估计：一个分子在半径 $r = 3.0\times10^{-10}\ \mathrm{m}$ 的球内占 $V = \tfrac43\pi(3.0\times10^{-10})^3 = 1.13\times10^{-28}\ \mathrm{m^3}$，而 $1/(N_\mathrm{A}V) = 1/(6.022\times10^{23} \times 1.13\times10^{-28}) = 1.47\times10^{4}\ \mathrm{mol\,m^{-3}} = 14.7\ \mathrm{mol\,dm^{-3}}$。用第一种表述的热力学语言：成环比从溶液中引进第二个分子损失的熵少得多，因为已配位配体的自由端已经交出了它的平动自由度。每成一环的节省约为 $R\ln(c_\mathrm{eff}/c^\circ) = R\ln 15 \approx 22\ \mathrm{J\,K^{-1}\,mol^{-1}}$，再扣除成环时配体骨架失去的内转动熵。
:::

::: example 从熵看镉的数据 {#ex-chelate-cd}
(a) 校核镉数据表中的 $\Delta G^\circ$ 值与 $298\ \mathrm{K}$ 下的 $\log\beta$ 值是否相符。(b) 求 $\mathrm{[Cd(NH_2CH_3)_4]^{2+} + 2\,en \rightleftharpoons [Cd(en)_2]^{2+} + 4\,NH_2CH_3}$ 的 $\log K$、$\Delta H^\circ$ 与 $\Delta S^\circ$。(c) 把 $\Delta S^\circ$ 与[[#prop-chelate]]的估计比较。
::: solution
(a) $\Delta G^\circ = -RT\ln\beta = -(8.314)(298.15)(2.3026)\log\beta\ \mathrm{J\,mol^{-1}} = -5.708\log\beta\ \mathrm{kJ\,mol^{-1}}$：$-5.708 \times 6.55 = -37.4$ 与 $-5.708 \times 10.62 = -60.6\ \mathrm{kJ\,mol^{-1}}$。又 $\Delta H^\circ - T\Delta S^\circ = -57.3 - 298.15(-0.0673) = -37.2$ 与 $-56.5 - 298.15(0.0141) = -60.7$，在舍入误差内一致。(b) 相减：$\log K = 10.62 - 6.55 = 4.07$；$\Delta H^\circ = -56.5 - (-57.3) = +0.8\ \mathrm{kJ\,mol^{-1}}$；$\Delta S^\circ = 14.1 - (-67.3) = +81.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$。(c) 生成两个环，反应额外释放两个分子，所以仅平动熵的估计为 $2 \times 22 \approx 45\ \mathrm{J\,K^{-1}\,mol^{-1}}$。实测值更大，部分因为释放进水中的甲胺分子带来水合变化，部分因为 $c_\mathrm{eff}$ 的简单球模型粗糙。要点依然成立：在焓相等时，$81\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 298\ \mathrm{K} = 24\ \mathrm{kJ\,mol^{-1}}$ 的熵驱动了四个数量级的额外稳定性。
:::
:::

::: warning 螯合效应的大小取决于标准态 {#warn-standard-state}
亚当森（Arthur Adamson）1954 年指出，螯合效应有一部分是选择 $1\ \mathrm{mol\,dm^{-3}}$ 为标准浓度的产物。[[#def-chelate-effect]]中的交换常数右边分子多于左边，所以浓度的表达方式一变，其数值就变。若改用摩尔分数（纯水为 $55.5\ \mathrm{mol\,dm^{-3}}$），每多释放一个粒子，常数就乘以 $55.5$，$\log K$ 每个粒子改变 $1.74$。对释放三个额外粒子的镍交换，"螯合效应"将从 $9.6$ 缩到 $9.6 - 3 \times 1.74 = 4.4$ 个对数单位，仍然不小，但远不那么惊人。而*物理上的*效应——螯合配体在它们被使用的稀浓度下取胜——是真实的，恰即[[#prop-chelate]]的 $c_\mathrm{eff} \gg [\mathrm{L}]$ 条件。但把含不同配体数目的配合物的 $\log\beta$ 值当作键强度的度量来比较，是一个错误。
:::

环的大小要紧。五元螯合环（en、草酸根、甘氨酸根、EDTA）对普通尺寸的金属最稳定，其接近 $85^\circ$ 的齿合角与八面体的 $90^\circ$ 相合。六元环（1,3-丙二胺、acac）更适合小的金属离子，四元与七元环或有张力、或损失太多构象熵。每多一个螯合环就多一分稳定性，这正是 **EDTA**$^{4-}$——一个六齿、生成五个五元环的配体——对几乎所有金属离子的结合都落在 $\log K$ 8 到 25 之间的原因。汉考克（Robert Hancock）表明，相对于金属的尺寸，五元环偏好大金属离子而六元环偏好小的，这就可以按尺寸选择性来设计配体。

### 大环效应

**大环配体**是环状多齿配体，如四胺 cyclam（1,4,8,11-四氮杂环十四烷）、冠醚或卟啉。大环配合物比具有相同给体的开链螯合物还要稳定：铜(II)与 cyclam 的 $\log K \approx 27$，而具有相同环大小序列的开链四胺约 24。卡比尼斯（Dale Cabbiness）与马杰鲁姆（Dale Margerum）在 1969 年认定了这一**大环效应**。它的起源一部分是熵性的（大环已经大致处于所需的构象，结合时损失的构象自由度较少，这一思想称为**预组织**），一部分是焓性的（自由大环的给体溶剂化较弱，因为它们指向环内）。大环配合物在*动力学*上也是惰性的：要移走金属，必须同时断掉若干条键，而配体不能一端一端地展开。血红素的卟啉与维生素 $\mathrm{B_{12}}$ 的钴啉就是自然的大环（[[coordination-chemistry/bioinorganic]]）；佩德森（Pedersen）、莱恩（Lehn）与克拉姆（Cram）的冠醚与穴醚把这思想扩展到碱金属离子，开创了超分子化学。

## 哪种金属，哪种配体？

### 欧文-威廉姆斯序列

欧文（Harry Irving）与威廉姆斯（Robert Williams）在 1953 年指出，对几乎任何配体，高自旋第一行二价阳离子配合物的稳定性按下列顺序下降
$$
\mathrm{Mn^{2+}} < \mathrm{Fe^{2+}} < \mathrm{Co^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Cu^{2+}} > \mathrm{Zn^{2+}}.
$$
例如对乙二胺，$\log K_1$ 约为 $2.7$（Mn）、$4.3$（Fe）、$5.9$（Co）、$7.5$（Ni）、$10.5$（Cu）与 $5.7$（Zn）。

::: widget plot
f: 2.73 + 1.96*(x - 5) - 3.3*((x-8)+abs(x-8))/2
x: 4.5, 10.5
y: 0, 12
points: 5,2.73; 6,4.34; 7,5.89; 8,7.52; 9,10.55; 10,5.71
labels: \text{趋势线：} d^5\to d^8\text{，随后下降}
caption: 第一行二价阳离子从 $\mathrm{Mn^{2+}}$（$d^5$，$x = 5$）到 $\mathrm{Zn^{2+}}$（$d^{10}$，$x = 10$）与乙二胺配合的 $\log K_1$ 的欧文-威廉姆斯序列（圆点，数值取自 NIST 关键数据选编，$25\ ^\circ\mathrm{C}$，已修约）。从锰到镍的上升跟随离子半径缩小与八面体晶体场稳定化能增大（从 $d^5$ 到 $d^8$ 为 $0$、$0.4$、$0.8$、$1.2\Delta_\mathrm{o}$，见[[coordination-chemistry/crystal-field-theory]]）；直线只是引导。铜(II)高居直线之上，额外的稳定性来自它的姜-泰勒畸变，使四个最强的面内给体结合得极紧。锌(II)没有晶体场稳定化能，回落到下。草酸根、甘氨酸根、EDTA 乃至蛋白质的金属结合位点都呈现同样的形状——这就是铜与锌往往在与蛋白位点的竞争中胜过其他金属、细胞必须控制金属可得性的原因。
:::

这个序列是两种效应共同作用的结果：整个周期中离子半径稳定减小（$\mathrm{Mn^{2+}}$ 83 pm 到 $\mathrm{Ni^{2+}}$ 69 pm，申农高自旋六配位半径），使每一种静电与共价相互作用都增强；以及配体相对于水获得的额外晶体场稳定化能，它随 $d$ 电子数增大直到 $d^8$，在 $d^5$ 与 $d^{10}$ 处为零。配体通常位于光谱化学序列中比水更高的位置，所以配位增大 $\Delta_\mathrm{o}$，而稳定化能的增益与稳定化能本身成正比。铜的领先由它的姜-泰勒畸变决定。

### 软硬酸碱

欧文-威廉姆斯序列只涉及一行金属。纵观周期表，有一个更普遍的规律支配金属偏好哪些给体原子。阿兰（Sten Ahrland）、查特（Joseph Chatt）与戴维斯（Nigel Davies）（1958）把金属离子分为 **a 类**——与每个族中最轻的给体原子结合最强（$\mathrm{F > Cl > Br > I}$，$\mathrm{O \gg S}$，$\mathrm{N \gg P}$）——与 **b 类**——呈现相反顺序（$\mathrm{I > Br > Cl > F}$，$\mathrm{S > O}$，$\mathrm{P > N}$）。皮尔逊（Ralph Pearson）（1963）把它概括为**硬**酸与**软**酸碱（[[main-group/inorganic-acids-bases]]）。

::: proposition 硬-软匹配（经验规则） {#prop-hsab}
硬酸（小、高电荷、难极化的金属离子：$\mathrm{H^+}$、碱金属与碱土金属、$\mathrm{Al^{3+}}$、$\mathrm{Ln^{3+}}$、$\mathrm{Ti^{4+}}$、$\mathrm{Cr^{3+}}$、$\mathrm{Fe^{3+}}$、$\mathrm{Co^{3+}}$）与硬碱（$\mathrm{F^-}$、$\mathrm{OH^-}$、$\mathrm{H_2O}$、羧酸根、磷酸根、$\mathrm{NH_3}$）形成最稳定的配合物。软酸（大、低电荷、易极化、$d$ 壳层满或近满的离子：$\mathrm{Cu^+}$、$\mathrm{Ag^+}$、$\mathrm{Au^+}$、$\mathrm{Hg^{2+}}$、$\mathrm{Cd^{2+}}$、$\mathrm{Pd^{2+}}$、$\mathrm{Pt^{2+}}$）偏好软碱（$\mathrm{I^-}$、$\mathrm{SCN^-}$（S）、$\mathrm{RS^-}$、$\mathrm{R_2S}$、$\mathrm{PR_3}$、$\mathrm{CN^-}$、CO）。交界离子包括 $\mathrm{Fe^{2+}}$、$\mathrm{Co^{2+}}$、$\mathrm{Ni^{2+}}$、$\mathrm{Cu^{2+}}$、$\mathrm{Zn^{2+}}$ 与 $\mathrm{Pb^{2+}}$。这是对观测稳定性的分类，不是定理；它比较的是偏好，不是绝对强度。
:::

卤素配合物干净地显示两类行为。$\mathrm{Fe^{3+}}$（硬）的 $\log K_1$ 从氟离子的约 5 降到氯离子的约 1.5、溴离子则低于 1；$\mathrm{Hg^{2+}}$（软）的 $\log K_1$ 从氟离子的约 1.0 经 6.7（氯）与 8.9（溴）升到碘离子的 12.9。软硬与成键类型相关：硬-硬相互作用以静电为主（在水中常由释放有序水合水的熵驱动），软-软相互作用以共价为主（由焓驱动）。

::: example 为选择性而设计 {#ex-hsab}
解释 (a) 汞与镉的毒性为何部分来自它们与蛋白质中半胱氨酸硫醇盐基团的结合；(b) 二巯丙醇（2,3-二巯基丙-1-醇，英国抗路易士气剂）为何被开发为砷与汞中毒的解毒剂；(c) 为何 EDTA 不能从富含钙镁的溶液中有选择地萃取软金属，而硫醇盐螯合剂可以。
::: solution
(a) $\mathrm{Hg^{2+}}$ 与 $\mathrm{Cd^{2+}}$ 是软酸，半胱氨酸硫醇盐（$\mathrm{RS^-}$）是软碱。它们与酶与结构蛋白的半胱氨酸残基极强结合，取代原本的锌（交界）或堵塞活性部位。(b) 二巯丙醇有两个相邻的巯基，与软金属或砷(III)生成五元螯合环，把硬-软匹配与螯合效应结合起来，足以胜过蛋白质巯基；配合物随后被排出。（解毒剂只能在医疗监护下给予；这里讲的是机理描述，不是治疗方案。）(c) EDTA 的给体是四个羧酸根与两个胺，属硬碱与交界碱。它强结合钙（$\log K = 10.65$）与镁（$8.79$），所以在硬水基质中很大一部分被这两个离子消耗。带硫给体的软螯合剂几乎不结合 $\mathrm{Ca^{2+}}$ 与 $\mathrm{Mg^{2+}}$，因而能有选择地把软金属挑出来。同样的道理支撑着湿法冶金中含硫封闭剂的设计，以及[[analytical-chemistry/classical-analysis]]中选择性试剂的设计。
:::
:::

::: quiz
每一对配合物中，哪个应有更大的生成常数？选出正确的选项。
- [x] $\mathrm{[AlF_6]^{3-}}$ 而不是 $\mathrm{[AlI_6]^{3-}}$
- [ ] $\mathrm{[HgF_4]^{2-}}$ 而不是 $\mathrm{[HgI_4]^{2-}}$
- [x] $\mathrm{[Cu(en)_2]^{2+}}$ 而不是 $\mathrm{[Cu(NH_3)_4]^{2+}}$
- [x] $\mathrm{[Ni(en)]^{2+}}$ 而不是 $\mathrm{[Mn(en)]^{2+}}$
::: solution
$\mathrm{Al^{3+}}$ 是硬的，偏好氟离子；$\mathrm{Hg^{2+}}$ 是软的，偏好碘离子（所以第二条说反了）。双(en)配合物有两个螯合环，在相同给体原子下靠螯合效应取胜。镍在欧文-威廉姆斯序列中高于锰。
:::
:::

## 条件常数与竞争平衡

在真实溶液中，自由配体与自由金属还参与其他平衡，首先是配体的质子化。EDTA 是四元（严格上六元）酸 $\mathrm{H_4Y}$，$\mathrm{p}K_\mathrm{a}$ 约为 0.0、1.5、2.0、2.69、6.13 与 10.37（Harris），只有完全去质子化的 $\mathrm{Y^{4-}}$ 才强结合金属。若 $\alpha_{\mathrm{Y^{4-}}}$ 是给定 pH 下以 $\mathrm{Y^{4-}}$ 存在的游离 EDTA 分数，则**条件生成常数**为
$$
K_\mathrm{f}' = \frac{[\mathrm{MY^{n-4}}]}{[\mathrm{M^{n+}}]\,c_\mathrm{EDTA}} = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f},
$$ {#eq-conditional}
其中 $c_\mathrm{EDTA}$ 是未结合金属的 EDTA 总浓度。EDTA 滴定因此需要缓冲（[[analytical-chemistry/classical-analysis]]）。

::: example pH 10 下的钙与 EDTA {#ex-edta}
求 pH 10.00 时的 $\alpha_{\mathrm{Y^{4-}}}$ 与 $\mathrm{CaY^{2-}}$（$\log K_\mathrm{f} = 10.65$）的条件生成常数，并解释为什么同一滴年在 pH 6 会失败。
::: solution
在 pH 10 只有最后两个 $\mathrm{p}K_\mathrm{a}$ 要紧。以 $[\mathrm{H^+}] = 1.0\times10^{-10}$、$K_6 = 10^{-10.37}$ 与 $K_5 = 10^{-6.13}$，
$$
\alpha_{\mathrm{Y^{4-}}} = \frac{1}{1 + [\mathrm{H^+}]/K_6 + [\mathrm{H^+}]^2/(K_5K_6)} = \frac{1}{1 + 10^{0.37} + 10^{-3.50}} = \frac{1}{1 + 2.344 + 0.0003} = 0.299.
$$
于是 $K_\mathrm{f}' = 0.299 \times 10^{10.65} = 1.34\times10^{10}$（$\log K_\mathrm{f}' = 10.13$），仍然很大，滴定终点敏锐。在 pH 6，$[\mathrm{H^+}]/K_6 = 10^{4.37}$，$[\mathrm{H^+}]^2/(K_5K_6) = 10^{4.50}$，$\alpha_{\mathrm{Y^{4-}}} \approx 10^{-4.8}$（更早的质子化贡献很小），故 $\log K_\mathrm{f}' \approx 5.9$：对敏锐的终点来说太小。$K_\mathrm{f}$ 大得多的金属（铜(II)，$\log K_\mathrm{f} = 18.8$）在低 pH 仍可滴定，这就是靠 pH 控制做选择性滴定的基础。
:::
:::

## 配位与氧化还原电势

若一个配体结合金属的某个氧化态强于另一个，它就把该电对的还原电势移动。氰化物使金在充气的水中溶解、氨使钴(II)在空气中易于氧化，都是这个道理。

::: proposition 配位对还原电势的移动 {#prop-redox-shift}
对电对 $\mathrm{M^{(n+1)+}/M^{n+}}$，标准电势 $E^\circ_\mathrm{aq}$；配合物 $\mathrm{ML_N^{(n+1)+}}$ 与 $\mathrm{ML_N^{n+}}$ 的累积生成常数为 $\beta^\mathrm{ox}$ 与 $\beta^\mathrm{red}$，则 $298\ \mathrm{K}$ 下配位电对的标准电势为
$$
E^\circ_\mathrm{complex} = E^\circ_\mathrm{aq} - \frac{RT}{F}\ln\frac{\beta^\mathrm{ox}}{\beta^\mathrm{red}} = E^\circ_\mathrm{aq} - 0.05916\ \mathrm{V}\,\log\frac{\beta^\mathrm{ox}}{\beta^\mathrm{red}}.
$$ {#eq-redox-shift}
该结果适用于两个氧化态配体数相同、且始终采用标准态（1 mol dm⁻³）约定的单电子电对。
:::

::: proof
写出一个热力学循环：$\mathrm{ML_N^{(n+1)+} \rightarrow M^{(n+1)+} + N\,L}$（$\Delta G_1 = +RT\ln\beta^\mathrm{ox}$），然后 $\mathrm{M^{(n+1)+}} + e^- \rightarrow \mathrm{M^{n+}}$（$\Delta G_2 = -FE^\circ_\mathrm{aq}$），然后 $\mathrm{M^{n+}} + N\,\mathrm{L} \rightarrow \mathrm{ML_N^{n+}}$（$\Delta G_3 = -RT\ln\beta^\mathrm{red}$）。三者之和就是配合物的还原，$\Delta G = -FE^\circ_\mathrm{complex}$，所以
$$
-FE^\circ_\mathrm{complex} = RT\ln\beta^\mathrm{ox} - FE^\circ_\mathrm{aq} - RT\ln\beta^\mathrm{red},
$$
除以 $-F$ 即得[[#eq-redox-shift]]。因子 $RT\ln10/F = 0.05916\ \mathrm{V}$ 在 $298.15\ \mathrm{K}$（[[electrochemistry/cell-thermodynamics]]）。结合氧化型更强的配体（$\beta^\mathrm{ox} > \beta^\mathrm{red}$）降低电势，稳定更高的氧化态。
:::

::: example 为什么钴(II)氨配合物在空气中被氧化 {#ex-co-redox}
$E^\circ(\mathrm{Co^{3+}/Co^{2+}}) = +1.92\ \mathrm{V}$，但 $E^\circ(\mathrm{[Co(NH_3)_6]^{3+}/[Co(NH_3)_6]^{2+}}) = +0.11\ \mathrm{V}$。(a) 求六氨配合物的 $\beta^\mathrm{III}/\beta^\mathrm{II}$。(b) 用晶体场理论解释这一结果。(c) 解释为什么 $\mathrm{[Co(NH_3)_6]^{2+}}$ 能被空气氧化（$E^\circ(\mathrm{O_2/H_2O})$ 在 pH 0 为 $+1.23\ \mathrm{V}$，pH 14 为 $+0.40\ \mathrm{V}$），而 $\mathrm{[Co(H_2O)_6]^{2+}}$ 不能。
::: solution
(a) $\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (1.92 - 0.11)/0.05916 = 30.6$：氨结合钴(III)比钴(II)强约 $10^{30.6}$ 倍。（由 $\log\beta_6(\mathrm{Co^{II}}) \approx 5$ 得 $\log\beta_6(\mathrm{Co^{III}}) \approx 35$。）(b) 钴(III)是低自旋 $d^6$，晶体场稳定化能 $-2.4\Delta_\mathrm{o}$ 且 $\Delta_\mathrm{o}$ 很大（$22\,900\ \mathrm{cm^{-1}}$）；钴(II)是高自旋 $d^7$，稳定化能只有 $-0.8\Delta_\mathrm{o}$ 且 $\Delta_\mathrm{o}$ 小得多。钴(III)也更小、电荷更高。两个因素都使配合物偏向更高的氧化态。(c) 在氨性溶液（碱性）中，$E^\circ(\mathrm{O_2}) = 0.40\ \mathrm{V}$ 远高于 $0.11\ \mathrm{V}$，所以氧能氧化 $\mathrm{[Co(NH_3)_6]^{2+}}$，事实也确实如此——维尔纳型钴(III)氨配合物正是这样制备的（用活性炭作催化剂）。而对水合离子，即使在 pH 0，氧的电势（1.23 V）也远低于 1.92 V：水合钴(III)反而是强到足以氧化水的氧化剂。
:::
:::

## 后续内容

生成常数是[[analytical-chemistry/equilibria-in-analysis]]中配位滴定、掩蔽剂与金属指示剂背后的数据；欧文-威廉姆斯序列与硬-软匹配所描述的金属间对配体的竞争，决定哪个金属坐在哪个蛋白质里（[[coordination-chemistry/bioinorganic]]）。热力学稳定性不是动力学惰性：$\mathrm{[Ni(CN)_4]^{2-}}$ 的 $\log\beta_4 \approx 30$，但与溶液交换氰离子只需几秒；而热力学上在酸中不稳定的 $\mathrm{[Co(NH_3)_6]^{3+}}$ 能存活数天。两者的联系在[[coordination-chemistry/inorganic-mechanisms]]中建立。配位的电化学后果——从金在氰化物中的溶解到金属蛋白的电势——都使用[[#eq-redox-shift]]。

::: history
比耶鲁姆 1941 年的博士论文《水溶液中的金属氨合物生成》（*Metal Ammine Formation in Aqueous Solution*）引入了逐级生成常数、生成函数 $\bar n$ 与测量它们的电位法，并确立了相邻常数近乎统计的间隔。施瓦岑巴赫（Gerold Schwarzenbach）自 20 世纪 40 年代起在苏黎世把 EDTA 与氨多羧酸引入为分析试剂，并（1952 年）为它们的额外稳定性创造了"螯合效应"一词。欧文与威廉姆斯 1948 年在《自然》（*Nature*）发表了他们的序列，并于 1953 年在《化学会志》（*Journal of the Chemical Society*）作了完整分析。阿兰、查特与戴维斯 1958 年关于 a 类与 b 类受体的分类，被皮尔逊于 1963 年概括为软硬酸碱。卡比尼斯与马杰鲁姆 1969 年描述了大环效应，佩德森 1967 年的冠醚，继以莱恩的穴醚与克莱姆的球状穴醚（spherands），导向 1987 年诺贝尔化学奖。马特尔与史密斯的《临界稳定常数》（*Critical Stability Constants*，自 1974 年起）及其后继的 NIST 数据库，至今仍是稳定常数的标准来源。
:::

::: summary
- 逐级常数 $K_n$ 与累积常数 $\beta_n = K_1\cdots K_n$ 描述水中的配位成键；$\Delta G^\circ = -RT\ln\beta_n$，型体分布由 $\alpha_n = \beta_n[\mathrm{L}]^n/\sum\beta_i[\mathrm{L}]^i$ 得出。
- 相邻常数依次减小；对 $N$ 个等价位点，仅统计就给出 $K_n/K_{n+1} = (N - n + 1)(n + 1)/n(N - n)$，更大的下降预示电荷、空间位阻或几何的改变。
- 螯合效应主要是熵：成环发生在量级 $10\ \mathrm{mol\,dm^{-3}}$ 的有效浓度上，而单齿配体被螯合配体取代会释放分子。其数值大小取决于标准态。
- 五元螯合环通常最稳定；大环带来预组织与动力学惰性（大环效应）。
- 第一行二价阳离子的稳定性顺序为 $\mathrm{Mn < Fe < Co < Ni < Cu > Zn}$（欧文-威廉姆斯），源于半径递减、晶体场稳定化能与铜的姜-泰勒畸变。
- 硬酸偏好硬（F、O、N）给体，软酸偏好软（I、S、P、C）给体；这条经验规则指导分析、毒理学与湿法冶金中的选择性。
- 配体质子化给出条件常数 $K_\mathrm{f}' = \alpha K_\mathrm{f}$；配位以 $-0.05916\log(\beta^\mathrm{ox}/\beta^\mathrm{red})$ V 移动氧化还原电势。
:::

## 习题

::: exercise 累积常数 {level=1 check="6.77"}
用镍(II)与氨的比耶鲁姆逐级常数（$\log K_1 = 2.80$、$\log K_2 = 2.24$、$\log K_3 = 1.73$），求 $\log\beta_3$。（输入 $\log\beta_3$。）
::: solution
$\log\beta_3 = 2.80 + 2.24 + 1.73 = 6.77$，故 $\beta_3 = 5.9\times10^6$。
:::
:::

::: exercise 由生成常数求自由能 {level=1 check="-60.6"}
计算 $298.15\ \mathrm{K}$ 下生成 $\mathrm{[Cd(en)_2]^{2+}}$ 的 $\Delta G^\circ$，$\log\beta_2 = 10.62$。（$\Delta G^\circ$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
$\Delta G^\circ = -RT\ln10\,\log\beta_2 = -(8.314)(298.15)(2.3026)(10.62) = -6.06\times10^4\ \mathrm{J\,mol^{-1}} = -60.6\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 硬还是软？ {level=1}
预测下列各情形中哪个配体结合更强：(a) $\mathrm{Ag^+}$ 与 $\mathrm{NH_3}$ 或 $\mathrm{PPh_3}$；(b) $\mathrm{Fe^{3+}}$ 与 $\mathrm{F^-}$ 或 $\mathrm{Cl^-}$；(c) $\mathrm{Pt^{2+}}$ 与 $\mathrm{(CH_3)_2S}$ 或 $\mathrm{(CH_3)_2O}$；(d) $\mathrm{Mg^{2+}}$ 与磷酸根或硫醇盐。
::: solution
(a) $\mathrm{PPh_3}$：$\mathrm{Ag^+}$ 是软的，磷是软给体。(b) $\mathrm{F^-}$：$\mathrm{Fe^{3+}}$ 是硬的（分析中就是用氟离子掩蔽铁(III)）。(c) 硫醚：铂(II)是软的，硫给体（来自甲硫氨酸）是它在体内的主要靶点之一。(d) 磷酸根：$\mathrm{Mg^{2+}}$ 是硬的，在细胞中主要结合在 ATP 与核酸的磷酸根上。
:::
:::

::: exercise 统计因子 {level=2 check="12/5"}
对六配位金属结合单齿配体导出统计比 $K_1/K_2$，并与直线二配位金属如 $\mathrm{Ag^+}$（$N = 2$）的比值比较。（把 $N = 6$ 的 $K_1/K_2$ 以分数或小数输入。）
::: solution
由[[#eq-statistical]]，取 $n = 1$：$K_1/K_2 = N \times 2/(1 \times (N - 1))$。$N = 6$ 时：$12/5 = 2.4$。$N = 2$ 时：$2 \times 2/(1 \times 1) = 4$。银(I)氨合物有 $\log K_1 = 3.3$、$\log K_2 = 3.9$（大约），故 $K_2 > K_1$，与统计预期相反：第二个氨完成了强烈受利的直线形 $\mathrm{[H_3N{-}Ag{-}NH_3]^+}$，而第一步伴随着水合离子配位方式的变化。这种反转是结构变化的征兆。
:::
:::

::: exercise 镍的型体分布 {level=2 check="0.417"}
用镍(II)氨配合物的 $\log\beta_n$，求游离氨浓度为 $0.100\ \mathrm{mol\,dm^{-3}}$ 时镍以 $\mathrm{[Ni(NH_3)_4]^{2+}}$ 存在的分数，以及 $\mathrm{[Ni(NH_3)_3]^{2+}}$ 与 $\mathrm{[Ni(NH_3)_4]^{2+}}$ 等量共存时的游离氨浓度。（以 $\mathrm{[Ni(NH_3)_4]^{2+}}$ 的分数输入。）
::: solution
由[[#ex-speciation]]，$\alpha_4 = 9120/21\,847 = 0.417$。两物种相等当 $K_4[\mathrm{NH_3}] = 1$，即 $[\mathrm{NH_3}] = 1/K_4 = 10^{-1.19} = 0.065\ \mathrm{mol\,dm^{-3}}$。
:::
:::

::: exercise EDTA 与镁 {level=2 check="7.4e-6"}
在 pH 10.00 下有一 $0.0100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{MgY^{2-}}$ 溶液（无过量 EDTA）。用 $\log K_\mathrm{f}(\mathrm{MgY^{2-}}) = 8.79$ 与 $\alpha_{\mathrm{Y^{4-}}} = 0.299$，求游离 $\mathrm{Mg^{2+}}$ 浓度。（$[\mathrm{Mg^{2+}}]$ 以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: hint
解离给出等浓度的游离 $\mathrm{Mg^{2+}}$ 与未结合 EDTA（各为 $x$）。
:::
::: solution
$K_\mathrm{f}' = 0.299 \times 10^{8.79} = 1.84\times10^8$。以 $x = [\mathrm{Mg^{2+}}] = c_\mathrm{EDTA}$ 且 $[\mathrm{MgY^{2-}}] \approx 0.0100$：$0.0100/x^2 = 1.84\times10^8$，故 $x = \sqrt{0.0100/1.84\times10^8} = 7.4\times10^{-6}\ \mathrm{mol\,dm^{-3}}$。只有 0.07 % 的镁是游离的——这正是配位滴定终点所需要的。
:::
:::

::: exercise 欧文-威廉姆斯序列的反常 {level=2}
用晶体场稳定化能解释：为什么 $\mathrm{Zn^{2+}}$（$5.7$）与 en 的 $\log K_1$ 低于 $\mathrm{Ni^{2+}}$（$7.5$），尽管 $\mathrm{Zn^{2+}}$（74 pm）与 $\mathrm{Ni^{2+}}$（69 pm）半径相近；以及为什么 $\mathrm{Cu^{2+}}$（$10.5$）超过两者。
::: solution
锌(II)为 $d^{10}$，在任何几何下晶体场稳定化能为零，所以水被场更强的胺取代时毫无增益。镍(II)为 $d^8$，稳定化能 $-1.2\Delta_\mathrm{o}$；用水（$\Delta_\mathrm{o} \approx 8500\ \mathrm{cm^{-1}}$）换成 en（$\mathrm{[Ni(en)_3]^{2+}}$ 约 $11\,500\ \mathrm{cm^{-1}}$）使稳定化能增大约 $1.2 \times 3000/3 = 1200\ \mathrm{cm^{-1}}$（约 $14\ \mathrm{kJ\,mol^{-1}}$），第一个 en 即如此——在 $298\ \mathrm{K}$ 下约值 2.5 个对数单位，恰足以解释这一差别。铜(II)还从它的姜-泰勒伸长得利：它加强了前两个 en 结合所在的四个赤道键；这使它具有序列中最高的 $K_1$ 与 $K_2$，不过正如[[coordination-chemistry/crystal-field-theory#ex-jahn-teller]]所示，$K_3$ 极小。
:::
:::

::: exercise 试亚铁灵的电势 {level=3 check="-4.89"}
试亚铁灵电对 $\mathrm{[Fe(phen)_3]^{3+}/[Fe(phen)_3]^{2+}}$ 在 $1\ \mathrm{mol\,dm^{-3}}$ 硫酸中的式量电势为 $+1.06\ \mathrm{V}$，而 $\mathrm{Fe^{3+}/Fe^{2+}}$ 为 $+0.771\ \mathrm{V}$。(a) 求 $\log(\beta^\mathrm{III}/\beta^\mathrm{II})$。(b) 用两个配合物的电子结构解释为何 phen 偏好铁(II)，而氰离子（$E^\circ(\mathrm{[Fe(CN)_6]^{3-/4-}}) = +0.36\ \mathrm{V}$）偏好铁(III)。（输入 phen 的 $\log(\beta^\mathrm{III}/\beta^\mathrm{II})$，保留三位有效数字。）
::: hint
用[[#eq-redox-shift]]：更高的电势意味着还原型更受偏好。
:::
::: solution
(a) $\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (0.771 - 1.06)/0.05916 = -4.89$：phen 结合铁(II)比铁(III)强约 $10^{4.9}$ 倍。(b) 两个配合物都是低自旋。$\mathrm{[Fe(phen)_3]^{2+}}$ 为 $t_{2g}^6$，晶体场稳定化能最大，而 phen 是 π 接受体，已充满的 $t_{2g}$ 组又因向 phen $\pi^*$ 轨道的反馈进一步稳定（[[coordination-chemistry/ligand-field-mo]]）；铁(III)为 $t_{2g}^5$，少一个可反馈的电子，而且是较硬的酸，从中性的软芳胺得利更少。氰也是 π 接受体，但它是阴离子且是强 σ 给体；六个负电荷偏好电荷更高的铁(III)，静电增益压过反馈的差别：$\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (0.771 - 0.36)/0.05916 = +6.9$。所以位移的方向取决于静电（偏好高电荷）与 π 反馈（偏好低氧化态）之间的平衡。电势大、由红到淡蓝的变色敏锐，使试亚铁灵成为经典的氧化还原指示剂。
:::
:::

::: exercise “有效”浓度有多有效？ {level=3 check="6.2"}
(a) 用[[#eq-ceff]]，估计螯合配体自由端可在半径 $r = 400\ \mathrm{pm}$ 的球内移动时的 $c_\mathrm{eff}$。(b) 一溶液含 $0.010\ \mathrm{mol\,dm^{-1}}$ 游离单齿配体。设成键能相同，以数量级估计成环比结合第二个单齿配体有多有利。(c) 为什么链更长时螯合效应会衰减？（对 (a) 输入 $c_\mathrm{eff}$，单位 $\mathrm{mol\,dm^{-3}}$，保留两位有效数字。）
::: solution
(a) $V = \tfrac43\pi(4.0\times10^{-10}\ \mathrm{m})^3 = 2.68\times10^{-28}\ \mathrm{m^3}$，且 $c_\mathrm{eff} = 1/(6.022\times10^{23} \times 2.68\times10^{-28}) = 6.2\times10^3\ \mathrm{mol\,m^{-3}} = 6.2\ \mathrm{mol\,dm^{-3}}$。(b) 有效浓度与实际浓度之比为 $6.2/0.010 = 620$，$\log 620 = 2.8$：在这一配体浓度下，成环受利近三个数量级（取 $r = 300\ \mathrm{pm}$，$14.7/0.010$ 得 $3.2$）。(c) 可达体积随 $r^3$ 增大，所以 $c_\mathrm{eff}$ 随链长迅速下降；此外，链越长，成环时损失的内转动熵越多，大环还在其他方面受张力（跨环相互作用）。故最佳环长为五或六。
:::
:::
