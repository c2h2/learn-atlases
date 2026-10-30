室温下的一瓶碘蒸气约含$10^{22}$个分子，每个分子只能以量子力学允许的能量振动：在零点能级之上依次为$0$、$h c\tilde\nu$、$2hc\tilde\nu, \ldots$，其中$\tilde\nu = 214.5\ \mathrm{cm^{-1}}$（[[quantum-chemistry/vibration-rotation]]）。分子每秒碰撞约$10^{9}$次，每次碰撞都交换能量，因此没有哪个分子会在任何一个能级上长期停留。然而处于各能级的分子**比例**却完全稳定，从这瓶到那瓶都可复现，并可由光谱中热带（hot bands）的强度测得：约$64\,\%$在$v = 0$，$23\,\%$在$v = 1$，$8\,\%$在$v = 2$。这些数字从何而来？为何每次都相同？

答案是统计热力学的奠基性成果。当海量分子分享一份固定的总能量时，几乎每一次分享出来的样子都一样：分子在能级上的一种特定分布——**玻尔兹曼分布（Boltzmann distribution）**——的概率如此压倒性地高于任何有明显差别的分布，以致在实际意义上，它是唯一曾被观测到的分布。本课将从纯粹的计数出发推导这一分布，说明为什么对$10^{23}$这样的客体计数会产生确定性，并把控制分布的单一参数$\beta$认定为温度的倒数。本课程其余的一切——配分函数、熵、平衡常数、速率常数——都建立在本页的结果之上。

## 分布方式与其权

我们考虑由$N$个分子组成的体系，分子之间除交换能量外互不相互作用（理想气体是标准例子；推广到相互作用的分子见[[statistical-thermodynamics/real-gases-liquids]]）。每个分子有一组容许能量$\varepsilon_0 \le \varepsilon_1 \le \varepsilon_2 \le \cdots$，取自量子力学，并从最低状态量起，于是$\varepsilon_0 = 0$。暂且把每个*状态*分开列出，于是简并度为$g$的一个简并能级在表中出现$g$次。

::: definition 分布方式与权 {#def-weight}
$N$分子体系的一个**分布方式**是对每个分子态上占据多少分子的指定$\{n_0, n_1, n_2, \ldots\}$，满足$\sum_i n_i = N$。一个分布方式的**权**$W$，是实现它而把各个分子指派到状态的不同方式数。对可分辨的分子，
$$
W = \frac{N!}{n_0!\,n_1!\,n_2!\cdots} = \frac{N!}{\prod_i n_i!} .
$$ {#eq-weight}
该分布方式的**总能量**为$E = \sum_i n_i \varepsilon_i$。
:::

这个公式就是组合学中的多项式系数（初等[计数](/learn/maths/lesson.php?c=probability&l=probability-spaces)是唯一必需的数学）。把分子排成一列再依次发放状态——先$n_0$份状态0，再$n_1$份状态1，依此类推——有$N!$种排法；但落到同一状态的那$n_i$个分子彼此对调并不产生新的指派，所以每个状态都除以$n_i!$。两个极端情形使含义一目了然：所有分子都在基态，$W = N!/N! = 1$（只有一种方式）；每个分子各在不同状态，$W = N!$，即可能的最大值。

为什么是"可分辨的"？在晶体中，每个分子位于自己的格点上，可用格点给它编号；在气体中，分子全同，无法编号。不过[[#eq-weight]]的计数对气体同样是正确的出发点，因为两个分布方式的权之比——求最概然分布所需要的只是它——并不因把每个权同除以同一个$N!$而改变。对不可分辨性的正确处理会改变熵与自由能，那是[[statistical-thermodynamics/canonical-ensemble]]的任务。

把计数变成热力学的物理假设如下。

::: definition 等先验概率原理 {#def-equal}
对$N$、体积$V$与总能量$E$都固定的孤立体系，每一个与$N$、$V$、$E$相容的分子到状态的个别指派（每一个**微观状态**）都是等概率的。因此，一个分布方式的概率正比于它的权$W$。
:::

这是一条公设，不是定理。它是与我们对详细动力学的无知相容的最简单假设；对许多模型体系，可以用其运动方程的遍历行为为它辩护；而决定性的检验是——由它导出的每一个预言都与实验一致。接受它，问题就成了：在$N$与$E$固定之下，哪个分布方式的权最大？

::: example 四个分子分享三个能量量子 {#ex-four}
四个可分辨分子具有等间距能级$0, \varepsilon, 2\varepsilon, 3\varepsilon, \ldots$，分享总能量$E = 3\varepsilon$。列出容许的分布方式、它们的权以及各自的概率，并求基态上的平均分子数。
::: solution
一个分布方式必须满足$n_0 + n_1 + n_2 + n_3 = 4$和$n_1 + 2n_2 + 3n_3 = 3$。共有三个解：

| 分布方式 | $\{n_0, n_1, n_2, n_3\}$ | $W = 4!/\prod n_i!$ |
|---|---|---|
| 一个分子独占全部能量 | $\{3, 0, 0, 1\}$ | $24/(6\cdot 1) = 4$ |
| 一个有$2\varepsilon$，一个有$\varepsilon$ | $\{2, 1, 1, 0\}$ | $24/(2\cdot1\cdot1) = 12$ |
| 三个各有一个$\varepsilon$ | $\{1, 3, 0, 0\}$ | $24/(1\cdot 6) = 4$ |

微观状态总数为$4 + 12 + 4 = 20$。（检验：把3个全同能量量子分给4个分子的方式数为$\binom{3+4-1}{3} = 20$。）由等先验概率原理，三种分布方式的概率分别为$4/20 = 0.20$、$12/20 = 0.60$和$0.20$。

基态平均布居为
$$
\langle n_0\rangle = 0.20\times3 + 0.60\times2 + 0.20\times1 = 2.0 ,
$$
类似地$\langle n_1\rangle = 0 + 0.60 + 0.60 = 1.2$，$\langle n_2\rangle = 0.60$，$\langle n_3\rangle = 0.20$——布居随能量衰减，大致每上一层就乘以同一个因子。即便只有四个分子，玻尔兹曼分布的形状也已隐约可见；不过主导的那个分布方式只携带$60\,\%$的概率。这种主导性随$N$增大而无限增长。
:::
:::

## 斯特林近似与最概然分布方式的主导性

对实际的$N$，[[#eq-weight]]中的阶乘大到天文数字，我们改用$\ln W$工作。工具是斯特林（Stirling）近似。

::: proposition 斯特林近似 {#prop-stirling}
对大的$N$，
$$
\ln N! \approx N\ln N - N ,
$$ {#eq-stirling}
其相对误差在$N \to \infty$时消失。更精确的形式是$\ln N! \approx N\ln N - N + \tfrac{1}{2}\ln(2\pi N)$。
:::

::: proof
记$\ln N! = \sum_{x=1}^{N}\ln x$。此和式是缓变递增曲线$\ln x$下方$N$个宽度为一的矩形面积之和，它介于积分$\int_{1}^{N}\ln x\,\mathrm{d}x$与$\int_{1}^{N+1}\ln x\,\mathrm{d}x$之间。由$\int \ln x\,\mathrm{d}x = x\ln x - x$，
$$
N\ln N - N + 1 \;\le\; \ln N! \;\le\; (N+1)\ln(N+1) - N .
$$
两个界都等于$N\ln N - N$加上$\ln N$量级的项，$N$大时这些项与$N\ln N$相比可以忽略（$N = 10^{23}$时，$N\ln N \approx 5\times10^{24}$而$\ln N \approx 53$）。故$\ln N! = N\ln N - N + O(\ln N)$。带$\tfrac{1}{2}\ln(2\pi N)$的改进形式，可由对伽马函数积分$N! = \int_0^\infty x^{N}e^{-x}\,\mathrm{d}x$用拉普拉斯方法求值得到（见数学图谱中的[反常积分](/learn/maths/lesson.php?c=calculus-1&l=improper-integrals)）。
:::

即使对不大的数，这个近似也好得惊人：$\ln 10! = 15.104$，简单形式给出$13.026$，改进形式给出$15.096$；对$100!$，三个值分别为$363.739$、$360.517$和$363.739$。对$N \approx 10^{23}$，简单形式的误差完全微不足道。

为什么某一个分布方式会占主导？取最简单的情形：$N$个分子各有两个能量相同的状态（或$N$枚硬币），于是每个分布方式的能量都相同，只有权不同。第一个状态上有$n$个分子的分布方式的权为$W(n) = N!/n!(N-n)!$，即二项式系数，在$n = N/2$处最大。

::: proposition 权分布的宽度 {#prop-width}
对$N$个能量相同的双态分子，在极大值附近，权是偏差$\delta = n - N/2$的高斯函数：
$$
\frac{W(N/2 + \delta)}{W(N/2)} \approx \exp\!\left(-\frac{2\delta^{2}}{N}\right) .
$$
$n$的标准差为$\tfrac{1}{2}\sqrt{N}$，因此*相对*展宽$\sigma_n/\langle n\rangle = 1/\sqrt{N}$随$N$增大而趋于零。
:::

::: proof
用斯特林近似，
$$
\ln W(n) = N\ln N - n\ln n - (N-n)\ln(N-n) .
$$
它的一阶导数为$\mathrm{d}\ln W/\mathrm{d}n = -\ln n + \ln(N-n)$，在$n = N/2$处为零；二阶导数为$-1/n - 1/(N-n)$，在$n = N/2$处等于$-4/N$。因此在极大值附近作泰勒展开得$\ln W(N/2+\delta) = \ln W(N/2) - \tfrac{1}{2}(4/N)\delta^{2} + \cdots$，就是前述高斯函数。与$\exp(-\delta^{2}/2\sigma^{2})$比较得$\sigma^{2} = N/4$，故$\sigma_n = \tfrac{1}{2}\sqrt{N}$；又因$\langle n\rangle = N/2$，所以$\sigma_n/\langle n\rangle = 1/\sqrt{N}$。
:::

代入一个化学上的数目。取$N = N_\mathrm{A} = 6.022\times10^{23}$，考虑一个只与最概然分布方式差$10^{-10}$分之一的分布方式，$\delta = 10^{-10}N = 6.0\times10^{13}$。它相对于极大的权为$\exp(-2\delta^{2}/N) = \exp(-1.2\times10^{4})$——一个在小数点后跟着一万两千个零的数。任何仪器所能察觉的偏差都不只是罕见，而是在宇宙存在的整个时间内绝不会发生。这正是统计热力学产生*决定论的*热力学的含义：大数定律把最概然分布方式变成了被观测到的那一个。

::: widget distribution
dist: binomial
params: n=10, p=0.5
normal: true
caption: 共有$N$个分子时，处于两个等能量状态之一中的分子数$n$的分布（这里的滑块$n$是总数$N$）。每根柱为$W(n)/2^{N}$，即第一个状态上有$n$个分子的分布方式的概率。把$N$从10增到50，看分布**相对于自身范围**收窄：宽度只按$\tfrac{1}{2}\sqrt{N}$增长，范围却按$N$增长，正如[[#prop-width]]所述。把这趋势外推到$N = 10^{23}$，分布就成了相对宽度$10^{-11.5}$的一根尖峰。
:::

::: quiz
对$N$个能量相同的双态分子组成的体系，恰好找到最概然分布方式（$n = N/2$）的概率随$N$增大如何变化？
- [ ] 它趋于1，因为最概然分布方式占主导。
- [x] 它减小（大致按$1/\sqrt{N}$），尽管落在与最概然分布方式相差极小*比例*以内的概率趋于1。
- [ ] 它保持为1/2。
- [ ] 它永远恰好是$1/N$。
::: solution
由[[#prop-width]]，分布是标准差为$\tfrac{1}{2}\sqrt{N}$的高斯分布，故其峰高为$1/(\sigma\sqrt{2\pi}) = \sqrt{2/\pi N}$，随$N$增大而*下降*：单一个分布方式$n = N/2$在绝对意义上越来越不可能出现。趋于确定的是$n/N$落在$1/2$的任何固定小容差之内，因为宽度相对$N$按$1/\sqrt{N}$收缩。所谓"最概然分布方式占主导"，指的是在宏观观测的层次上*与之无从区分*的那些分布方式占主导，它们在$10^{-11}$之内布居数全都相同。
:::
:::

## 最概然分布

现在对具有一组任意能级的分子，在封闭孤立体系的两个约束下求权最大的分布方式：
$$
\sum_i n_i = N, \qquad \sum_i n_i\varepsilon_i = E .
$$ {#eq-constraints}
由于$\ln W$随$W$单调增大，我们可以极大化$\ln W$，这要容易得多。约束由拉格朗日乘数法处理（数学图谱中的[拉格朗日乘数](/learn/maths/lesson.php?c=multivariable&l=extrema)）。

::: proposition 玻尔兹曼分布 {#prop-boltzmann}
对总能量为$E$的$N$个独立分子，权最大的分布方式的布居为
$$
\frac{n_i}{N} = \frac{e^{-\beta\varepsilon_i}}{q}, \qquad q = \sum_i e^{-\beta\varepsilon_i},
$$ {#eq-boltzmann}
其中$q$中的求和遍历一个分子的所有*状态*，$\beta$是由总能量$E$决定的参数。$q$称为**分子配分函数**，而$\beta = 1/k_\mathrm{B}T$（证明见下）。
:::

::: proof
把$n_i$当作连续变量（每个都极其巨大）。用斯特林近似，
$$
\ln W = \ln N! - \sum_i \ln n_i! \approx N\ln N - N - \sum_i (n_i\ln n_i - n_i) = N\ln N - \sum_i n_i\ln n_i ,
$$
其中用了$\sum_i n_i = N$。在极大处，任何同时尊重两个约束的微小变动$\{\mathrm{d}n_i\}$都必须使$\ln W$保持不变。引入乘数$\alpha$与$-\beta$，并要求对*任意*的$\mathrm{d}n_i$都有
$$
\mathrm{d}\ln W + \alpha\sum_i \mathrm{d}n_i - \beta\sum_i\varepsilon_i\,\mathrm{d}n_i = 0
$$
（选取乘数正是为了能把约束忘掉）。现在$\partial\ln W/\partial n_i = -\ln n_i - 1 + \partial(N\ln N)/\partial n_i$，而由于$N = \sum_j n_j$，$\partial(N\ln N)/\partial n_i = \ln N + 1$。故$\partial \ln W/\partial n_i = -\ln(n_i/N)$，于是对每个$i$的条件成为
$$
-\ln\frac{n_i}{N} + \alpha - \beta\varepsilon_i = 0
\qquad\Longrightarrow\qquad
\frac{n_i}{N} = e^{\alpha}e^{-\beta\varepsilon_i} .
$$
乘数$\alpha$由归一化确定：$\sum_i n_i/N = 1$给出$e^{\alpha}\sum_i e^{-\beta\varepsilon_i} = 1$，即$e^{\alpha} = 1/q$。这就是[[#eq-boltzmann]]。二阶导数$\partial^{2}\ln W/\partial n_i^{2} = -1/n_i < 0$证实驻点是极大。剩下的乘数$\beta$由能量约束$E = N\sum_i \varepsilon_i e^{-\beta\varepsilon_i}/q$确定：$E$越大，$\beta$越小。
:::

在认定$\beta$之前，先注意结果的结构。布居只通过**玻尔兹曼因子**$e^{-\beta\varepsilon_i}$依赖能量：每个状态都有布居，基态最多，而每一份能量增量$\Delta\varepsilon$都把一个状态的布居乘以同一因子$e^{-\beta\Delta\varepsilon}$，不论它发生在能阶的哪一处。配分函数$q$不过是归一化之和，但事实证明它包含关于体系的全部热力学信息——那正是[[statistical-thermodynamics/partition-function]]的主题。

### 认定$\beta = 1/k_\mathrm{B}T$

两个论证共同确定$\beta$。第一，对两个处于热接触的体系，$\beta$*相同*。若体系A与B交换能量，则复合权$W_\mathrm{A}W_\mathrm{B}$在各自的粒子数约束但*单一*的能量约束$E_\mathrm{A} + E_\mathrm{B} = E$之下取极大；把一个能量乘数代入重做一遍证明，就得到A与B中带有共同$\beta$的玻尔兹曼分布。一个在热接触的物体之间趋于相等的参数，由热第零定律，必是温度的函数。第二，这个函数由一个我们已知其温度依赖的体系确定。

::: proposition $\beta = 1/k_\mathrm{B}T$ {#prop-beta}
玻尔兹曼分布中的拉格朗日乘数为
$$
\beta = \frac{1}{k_\mathrm{B}T},
$$
其中$T$是热力学温度，$k_\mathrm{B} = 1.380\,649\times10^{-23}\ \mathrm{J\,K^{-1}}$是玻尔兹曼常数，$k_\mathrm{B} = R/N_\mathrm{A}$。
:::

::: proof
把玻尔兹曼分布用于理想气体分子沿$x$的平动。宏观容器中平动能级之密集（[[quantum-chemistry/model-systems]]）使对状态的求和可以换为对动量$p$的积分，状态数正比于$\mathrm{d}p$。于是平均动能为
$$
\langle\varepsilon_x\rangle
= \frac{\int_{-\infty}^{\infty}\frac{p^{2}}{2m}\,e^{-\beta p^{2}/2m}\,\mathrm{d}p}{\int_{-\infty}^{\infty}e^{-\beta p^{2}/2m}\,\mathrm{d}p}
= \frac{1}{2\beta},
$$
其中用了高斯积分$\int e^{-ap^{2}}\mathrm{d}p = (\pi/a)^{1/2}$与$\int p^{2}e^{-ap^{2}}\mathrm{d}p = \tfrac{1}{2a}(\pi/a)^{1/2}$，$a = \beta/2m$。三维情形$\langle\varepsilon\rangle = 3/2\beta$，$N$个分子的总能量为$E = 3N/2\beta$。气体动理论结合理想气体状态方程$pV = NkT$（经验气体温标测定的正是热力学温度）给出$pV = \tfrac{2}{3}E$，即$E = \tfrac{3}{2}Nk_\mathrm{B}T$。比较两个表达式得$\beta = 1/k_\mathrm{B}T$。由于$\beta$是$T$的普适函数，同一认定对一切体系成立。
:::

因此，玻尔兹曼分布的实用形式是
$$
\frac{n_i}{N} = \frac{e^{-\varepsilon_i/k_\mathrm{B}T}}{q}, \qquad
\frac{n_j}{n_i} = e^{-(\varepsilon_j - \varepsilon_i)/k_\mathrm{B}T} .
$$ {#eq-ratio}
两个状态的布居*比*根本不需要配分函数。能量以每摩尔给出时，$\varepsilon/k_\mathrm{B}T = E_\mathrm{m}/RT$；能量以波数给出（光谱学惯用）时，$\varepsilon/k_\mathrm{B}T = hc\tilde\nu/k_\mathrm{B}T = c_2\tilde\nu/T$，其中$c_2 = hc/k_\mathrm{B} = 1.438\,78\ \mathrm{cm\,K}$为第二辐射常数。在$298.15\ \mathrm{K}$，$k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$，$RT = 2.479\ \mathrm{kJ\,mol^{-1}}$：这两个数字值得牢记，因为一眼就能看出室温下哪些运动已被热激发。

### 能级与简并度

实验与光谱通常按能量*能级*而非状态组织。若能级$j$的简并度为$g_j$（它由$g_j$个能量同为$\varepsilon_j$的状态构成），其布居是$g_j$个相等的状态布居之和：
$$
\frac{N_j}{N} = \frac{g_j\,e^{-\beta\varepsilon_j}}{q}, \qquad
q = \sum_{\text{能级 } j} g_j\,e^{-\beta\varepsilon_j}, \qquad
\frac{N_j}{N_i} = \frac{g_j}{g_i}\,e^{-\beta(\varepsilon_j - \varepsilon_i)} .
$$ {#eq-levels}

::: warning 忘记简并度 {#warn-degeneracy}
玻尔兹曼因子$e^{-\beta\varepsilon}$给出的是*每个状态*的布居；一个*能级*的布居还要多乘因子$g$。漏掉它是这门学科中最常见的单一错误。这不是小修正：对线性分子的转动能级，$g_J = 2J+1$，正是这个随$J$增长的简并度因子，使HCl在室温下布居最多的能级是$J = 3$而不是$J = 0$。一个相关的错误是从"基态永远是布居最多的*状态*"推出最低的*能级*必然布居最多；它未必如此。最后要记住：一个高度简并的激发能级可以容纳比基能级更多的分子，尽管它的每一个状态布居都更小：$N_j/N_0 = (g_j/g_0)e^{-\beta\Delta\varepsilon}$可以超过1。
:::

::: example 碘的振动布居 {#ex-iodine}
$\mathrm{I_2}$的振动波数为$\tilde\nu = 214.5\ \mathrm{cm^{-1}}$。把振动当作谐振子处理（从$v = 0$量起、等间距、非简并的能级），求$298.15\ \mathrm{K}$下处于$v = 0$、$1$、$2$的分子分数。
::: solution
能级为$\varepsilon_v = vhc\tilde\nu$，故每上一层的玻尔兹曼因子为
$$
x = e^{-hc\tilde\nu/k_\mathrm{B}T} = \exp\!\left(-\frac{1.438\,78\ \mathrm{cm\,K}\times214.5\ \mathrm{cm^{-1}}}{298.15\ \mathrm{K}}\right) = e^{-1.0351} = 0.3552 .
$$
配分函数是几何级数，$q = 1 + x + x^{2} + \cdots = 1/(1 - x) = 1.551$。于是
$$
\frac{N_0}{N} = \frac{1}{q} = 1 - x = 0.645, \qquad
\frac{N_1}{N} = (1-x)x = 0.229, \qquad
\frac{N_2}{N} = (1-x)x^{2} = 0.081 .
$$
室温下约三分之一的碘分子处于振动激发态——这就是碘蒸气吸收光谱富含热带的原因，也是其对热容的振动贡献可观的原因。对$\mathrm{N_2}$（$\tilde\nu = 2358.6\ \mathrm{cm^{-1}}$）同样的计算给出$x = 1.2\times10^{-5}$：几乎所有氮分子都在$v = 0$。
:::
:::

## 温度是分布的参数

认定[[#prop-beta]]赋予温度一个崭新而更透明的含义。一个分子体系的温度，是告诉你*分子如何散布在各状态上*的参数：$T$低（$\beta$大）时只有基态被占据；$T$升高，分子沿能阶向上爬，较高的状态按玻尔兹曼因子填充；$T \to \infty$（$\beta \to 0$）时每个状态*均匀*布居。热能$k_\mathrm{B}T$是标尺：高出基态几个$k_\mathrm{B}T$的状态布居可观，高出$20k_\mathrm{B}T$的状态在实际意义上是空的（$e^{-20} = 2\times10^{-9}$）。

最干净的例子是**二能级体系**——一个分子有一个基态和一个能量为$\varepsilon$的激发态，简并度分别为$g_0$与$g_1$。磁场中的自旋$\tfrac{1}{2}$核、NO的两个最低电子能级、以及许多固体中的缺陷位点，行为都是这样。

::: widget plot
f: g/(g + exp(1/x)); exp(1/x)/(g + exp(1/x))
x: 0.02, 5
y: 0, 1
sliders: g=1:1:5:1
labels: \text{上能级}; \text{下能级}
hlines: 0.5
caption: 二能级体系处于上、下能级的分子分数对约化温度$x = k_\mathrm{B}T/\varepsilon$作图，取自[[#eq-levels]]，取$g_0 = 1$、上能级简并度$g$（滑块）。$g = 1$时两布居趋于$\tfrac{1}{2}$但永不超过：无限温度意味着布居*相等*，而非反转。把$g$设为3，上*能级*就在有限温度$x = 1/\ln 3 = 0.91$处反超下能级，尽管每一个上*状态*的布居仍低于基态。还要注意$x \approx 0.2$以下几乎什么都不发生：激发能级被"冻结"了。
:::

::: example 二能级系统与粒子数反转 {#ex-two-level}
(a) 两个非简并状态相差$\varepsilon = 2.00\ \mathrm{kJ\,mol^{-1}}$。什么温度下上状态容纳$10.0\,\%$的分子？(b) 若上状态布居为$60\,\%$，意味着什么？
::: solution
(a) 上态分数为$e^{-\beta\varepsilon}/(1 + e^{-\beta\varepsilon}) = 0.100$，故$e^{-\beta\varepsilon} = 0.100/0.900 = 1/9$，$\beta\varepsilon = \ln 9 = 2.197$。$\varepsilon$以每摩尔给出，$\varepsilon/RT = 2.197$：
$$
T = \frac{\varepsilon}{R\ln 9} = \frac{2000\ \mathrm{J\,mol^{-1}}}{8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}}\times2.197} = 109\ \mathrm{K} .
$$
(b) 上态布居$60\,\%$意味着$n_1/n_0 = 1.5 > 1$，即$e^{-\beta\varepsilon} > 1$，这要求$\beta < 0$。任何正温度，无论多高，都产生不了它：$T\to\infty$时比值只趋于1。这样的**粒子数反转**不是热平衡态；它必须靠泵浦产生（如激光器中的泵浦，或核磁共振中的$\pi$脉冲），并会弛豫回玻尔兹曼分布。形式上可以用*负*温度描述它，而负温度比任何正温度都更"热"——能量会从它流向任何处于正温度的体系。
:::
:::

### 转动的布居

对线性转子（[[quantum-chemistry/vibration-rotation]]），能级为$\varepsilon_J = hcBJ(J+1)$，简并度$2J+1$，故由[[#eq-levels]]
$$
\frac{N_J}{N_0} = (2J+1)\,e^{-hcBJ(J+1)/k_\mathrm{B}T} .
$$
简并度线性上升，玻尔兹曼因子下降；二者之积经过一个极大。把$J$当作连续变量并令导数为零，得**布居最多的能级**
$$
J_\text{max} \approx \left(\frac{k_\mathrm{B}T}{2hcB}\right)^{1/2} - \frac{1}{2} .
$$ {#eq-jmax}
这就是红外谱带的转动精细结构（[[spectroscopy/vibrational-spectroscopy]]）呈此形状的原因：谱线强度描摹出各初态能级的布居。

::: widget plot
f: (2*x + 1)*exp(-1.43878*b*x*(x + 1)/T)
x: 0, 40
y: 0, 12
sliders: T=298:20:1500:1; b=10.59:0.2:60:0.01
labels: N_J/N_0
caption: 线性分子转动能级的相对布居$N_J/N_0$（把$J$当作连续变量），对转动常数$B$（滑块`b`，单位$\mathrm{cm^{-1}}$）与温度$T$（单位K）绘制。起始值是$298\ \mathrm{K}$下的$\mathrm{HCl}$（$B = 10.59\ \mathrm{cm^{-1}}$）：极大位于$J = 2.6$附近，故$J = 3$是布居最多的能级，正如[[#eq-jmax]]所预言。把$B$降到$1.93\ \mathrm{cm^{-1}}$（CO），分布便铺展到几十个能级；升高$T$，它按$\sqrt{T}$移向更高的$J$。
:::

::: example 火焰中受激的钠原子 {#ex-sodium}
钠在火焰中的黄色发射来自$3\mathrm{p}\;{}^{2}\mathrm{P}$能级，它高出$3\mathrm{s}\;{}^{2}\mathrm{S}$基能级$589.0\ \mathrm{nm}$（这里可忽略$0.6\ \mathrm{nm}$的双重线分裂）。简并度按$g = 2J+1$对各组分求和：$g(^{2}\mathrm{S}_{1/2}) = 2$，$g(^{2}\mathrm{P}) = 2 + 4 = 6$。求$2500\ \mathrm{K}$与$3000\ \mathrm{K}$火焰中的比值$N(3\mathrm{p})/N(3\mathrm{s})$。
::: solution
把激发能表示成温度，得
$$
\frac{\Delta\varepsilon}{k_\mathrm{B}} = \frac{hc}{\lambda k_\mathrm{B}} = \frac{1.438\,78\times10^{-2}\ \mathrm{m\,K}}{589.0\times10^{-9}\ \mathrm{m}} = 2.443\times10^{4}\ \mathrm{K} .
$$
再由[[#eq-levels]]
$$
\frac{N(3\mathrm{p})}{N(3\mathrm{s})} = \frac{6}{2}\,e^{-24\,428/2500} = 3\times5.71\times10^{-5} = 1.7\times10^{-4},
$$
$3000\ \mathrm{K}$下为$3\,e^{-24\,428/3000} = 8.7\times10^{-4}$。由此得出分析化学的两点教益（[[analytical-chemistry/atomic-spectrometry]]）。$2500\ \mathrm{K}$时约每$6000$个钠原子只有一个被激发，故几乎所有原子仍可用于*吸收*——这是原子吸收光谱法的基础。而火焰温度改变$500\ \mathrm{K}$，受激布居、从而*发射*信号就变化五倍，这就是火焰发射光谱必须严格控温的原因。
:::
:::

### 势场中的玻尔兹曼分布：气压公式

推导中没有任何一步要求能量必须是内能。在地球引力场中高度$h$处的分子具有额外势能$mgh$，由[[#eq-ratio]]，数密度按$\mathcal{N}(h) = \mathcal{N}(0)\,e^{-mgh/k_\mathrm{B}T}$衰减——这就是**气压公式**，其标高为$H = k_\mathrm{B}T/mg = RT/Mg$。对$298\ \mathrm{K}$的$\mathrm{N_2}$，$H = (8.3145\times298.15)/(0.028\,01\times9.807) = 9.0\ \mathrm{km}$。同样的推理，把$mgh$换成电势能$ze\phi$，就给出电双层（[[electrochemistry/double-layer]]）与德拜-休克尔理论（[[thermodynamics/ions-in-solution]]）中的离子分布；换成离心势能，它便是超速离心机中沉降平衡的基础。

::: remark 玻尔兹曼的熵
主导分布方式的权$W$也是通向熵的钥匙。玻尔兹曼的认定
$$
S = k_\mathrm{B}\ln W
$$
把微观状态数与[[thermodynamics/second-law]]的热力学熵联系起来：第二定律中孤立体系趋向熵最大的趋势，就是我们刚刚利用过的、趋向权最大的分布方式的趋势。我们将在[[statistical-thermodynamics/thermodynamic-functions]]中发展这一关系，并由配分函数导出熵。
:::

::: history
麦克斯韦（James Clerk Maxwell）在1860年的《气体动理论释义》（*Illustrations of the dynamical theory of gases*）中，凭对速度的对称性论证得到了气体分子速率分布。玻尔兹曼（Boltzmann）在1868年把它推广到外场中的分子，并在1877年的论文《论力学热理论第二定律与概率论之间的关系》（*Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung*）中引入了本课的计数论证：他把能量分成分立的份，数出每种分布的"复杂态"（complexions）数目，并把平衡态认定为概率最大的分布，而熵正比于复杂态数的对数。现代形式的公式$S = k\log W$（常数$k$具名）由普朗克（Max Planck）在1900–1901年研究黑体辐射时写下；它镌刻在玻尔兹曼位于维也纳中央公墓（Zentralfriedhof）的墓碑上。玻尔兹曼的思想遭到怀疑原子存在的唯能论者的激烈抵制，他1906年去世后不久，佩兰（Jean Perrin）关于布朗运动的实验（1908–1909）便为其正名——佩兰对胶体粒子应用气压公式测定了阿伏加德罗常数。
:::

## 后续内容

玻尔兹曼分布是这门课程的门枢。它的归一化和——配分函数$q$——在[[statistical-thermodynamics/partition-function]]中对平动、转动、振动与电子运动逐一算出，而一切热力学性质都在[[statistical-thermodynamics/thermodynamic-functions]]中由它导出。这里对总能量固定的独立分子给出的推导，将在[[statistical-thermodynamics/canonical-ensemble]]中推广到与恒温浴接触的相互作用分子体系，并在[[statistical-thermodynamics/quantum-statistics]]中对"一个粒子占据某状态会影响另一个粒子的占据"的情形加以修正。在动力学中，玻尔兹曼因子是阿伦尼乌斯方程（[[kinetics/collision-theory]]）中指数因子的来源；在光谱学中，它决定热带与转动谱线的强度，以及核磁共振必须检测的微弱极化（[[spectroscopy/nmr-principles]]）。

::: summary
- $N$个可分辨分子的一个分布方式$\{n_i\}$的权为$W = N!/\prod_i n_i!$；由等先验概率原理，其概率正比于$W$。
- 斯特林近似$\ln N! \approx N\ln N - N$使$\ln W$可算；$N$大时权分布是相对宽度为$1/\sqrt{N}$的高斯分布，故最概然分布方式（以及与之无从区分的分布方式）就是总能观测到的那一个。
- 在固定$N$与$E$下用拉格朗日乘数极大化$\ln W$，得玻尔兹曼分布$n_i/N = e^{-\beta\varepsilon_i}/q$，配分函数$q = \sum_i e^{-\beta\varepsilon_i}$。
- $\beta = 1/k_\mathrm{B}T$：它对处于热接触的体系取共同值，并由理想气体定出；$298.15\ \mathrm{K}$时$k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$，$RT = 2.479\ \mathrm{kJ\,mol^{-1}}$。
- 布居比：$N_j/N_i = (g_j/g_i)e^{-(\varepsilon_j - \varepsilon_i)/k_\mathrm{B}T}$——绝不要忘记能级的简并度。
- 温度是分布的参数：$T\to0$使每个分子都处于基态，$T\to\infty$使所有状态均匀布居；反转布居是非平衡的（形式上负温度的）态。
- 同一分布也支配外势中的布居：气压公式、离子气氛与沉降平衡。
:::

## 习题

::: exercise 分布方式的权 {level=1 check="60"}
六个可分辨分子分布为三个在状态0、两个在状态1、一个在状态2。此分布方式的权是多少？（输入$W$。）
::: solution
$W = 6!/(3!\,2!\,1!) = 720/(6\times2\times1) = 60$。选定哪三个分子在状态0、哪两个在状态1、哪一个在状态2，共有60种不同的方式：$\binom{6}{3}\times\binom{3}{2} = 20\times3 = 60$，直接计数可证。
:::
:::

::: exercise 布居比 {level=1 check="0.670"}
两个非简并状态相差$1.00\ \mathrm{kJ\,mol^{-1}}$。$300\ \mathrm{K}$时上状态与下状态的布居之比是多少？（输入比值。）
::: solution
$N_1/N_0 = e^{-\Delta E/RT} = \exp(-1000/(8.3145\times300)) = e^{-0.4009} = 0.670$。$1\ \mathrm{kJ\,mol^{-1}}$的能隙不到室温$RT$的一半，故两个状态几乎均等布居。
:::
:::

::: exercise CO 的最概然转动能级 {level=1 check="7"}
$^{12}\mathrm{C}^{16}\mathrm{O}$的转动常数为$B = 1.931\ \mathrm{cm^{-1}}$。$298\ \mathrm{K}$时哪个转动能级布居最多？（输入$J$。）
::: solution
由[[#eq-jmax]]，$J_\text{max} = (k_\mathrm{B}T/2hcB)^{1/2} - \tfrac{1}{2} = (207.1/3.862)^{1/2} - 0.5 = (53.63)^{1/2} - 0.5 = 6.82$，其中$k_\mathrm{B}T/hc = T/c_2 = 298/1.438\,78 = 207.1\ \mathrm{cm^{-1}}$。最接近的整数是$J = 7$；直接比较$N_J/N_0 = (2J+1)e^{-hcBJ(J+1)/k_\mathrm{B}T}$得$J = 6$为$8.79$、$J = 7$为$8.90$、$J = 8$为$8.69$，确认$J = 7$。
:::
:::

::: exercise 由布居比求温度 {level=2 check="415"}
两个非简并状态相差$200\ \mathrm{cm^{-1}}$。什么温度下上状态的布居是下状态的一半？（以$\mathrm{K}$为单位输入$T$。）
::: solution
$N_1/N_0 = e^{-c_2\tilde\nu/T} = \tfrac{1}{2}$给出$T = c_2\tilde\nu/\ln 2 = 1.438\,78\times200/0.6931 = 415\ \mathrm{K}$。注意此温度下$k_\mathrm{B}T/hc$为$289\ \mathrm{cm^{-1}}$：布居比要减半，$k_\mathrm{B}T$需约为能隙的$1.44$倍。
:::
:::

::: exercise 振动受激的氯 {level=2 check="0.067"}
$\mathrm{Cl_2}$的振动波数为$559.7\ \mathrm{cm^{-1}}$。把振动当作谐振子处理，$298.15\ \mathrm{K}$下处于*任何*激发振动状态的氯分子分数是多少？（输入该分数。）
::: solution
处于$v = 0$的分数为$1/q = 1 - x$，其中$x = e^{-c_2\tilde\nu/T} = \exp(-1.438\,78\times559.7/298.15) = e^{-2.701} = 0.0671$。故处于所有激发态的分数为$1 - (1-x) = x = 0.067$。对谐振能阶，激发分数恰等于第一级台阶的玻尔兹曼因子，因为$(1-x)(x + x^{2} + x^{3} + \cdots) = (1-x)\,x/(1-x) = x$。
:::
:::

::: exercise 简并的激发能级 {level=2 check="0.535"}
某原子有一个非简并基能级和一个高出它$400\ \mathrm{cm^{-1}}$的三重简并激发能级；其他能级均不可及。$600\ \mathrm{K}$下处于激发能级的原子分数是多少？（输入该分数。）
::: solution
由$c_2\tilde\nu/T = 1.438\,78\times400/600 = 0.9592$，玻尔兹曼因子为$e^{-0.9592} = 0.3832$，配分函数为$q = 1 + 3\times0.3832 = 2.1496$。由[[#eq-levels]]，激发能级分数为
$$
\frac{N_1}{N} = \frac{3\times0.3832}{2.1496} = 0.535 .
$$
超过一半的原子被激发，尽管三个激发*状态*中每一个只占$0.3832/2.1496 = 0.178$，低于基态的$1/2.1496 = 0.465$：左右天平的是简并度，而不是能量。
:::
:::

::: exercise 大气组成随高度的变化 {level=2 check="1.21"}
设$250\ \mathrm{K}$的等温大气中，$\mathrm{O_2}$（$M = 32.00\ \mathrm{g\,mol^{-1}}$）与$\mathrm{N_2}$（$M = 28.01\ \mathrm{g\,mol^{-1}}$）各自按气压公式分布，且无风吹混合作用。$10.0\ \mathrm{km}$处的比值$\mathcal{N}(\mathrm{N_2})/\mathcal{N}(\mathrm{O_2})$是海平面处的多少倍？取$g = 9.81\ \mathrm{m\,s^{-2}}$。（输入该倍数。）
::: solution
每个数密度按$e^{-Mgh/RT}$衰减，故比值改变
$$
\exp\!\left(\frac{(M_{\mathrm{O_2}} - M_{\mathrm{N_2}})gh}{RT}\right)
= \exp\!\left(\frac{0.003\,99\ \mathrm{kg\,mol^{-1}}\times9.81\ \mathrm{m\,s^{-2}}\times10\,000\ \mathrm{m}}{8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}}\times250\ \mathrm{K}}\right) = e^{0.1883} = 1.21 .
$$
较轻的气体将在高海拔富集$21\,\%$。真实低层大气中，湍流混合把组成保持均匀直到约$100\ \mathrm{km}$（均气层顶homopause）；只有在其上才发生这种引力分异。
:::
:::

::: exercise 按能级的玻尔兹曼分布 {level=3}
对能级$\varepsilon_j$具有简并度$g_j$的分子，直接对能级布居$N_j$重复[[#prop-boltzmann]]的推导。先证明：把$N$个可分辨分子摆放成能级$j$上有$N_j$个的方式数为$W = N!\prod_j g_j^{N_j}/N_j!$；再证明在固定$N$与$E$下极大化$\ln W$给出$N_j/N = g_je^{-\beta\varepsilon_j}/q$。
::: hint
在选定*哪些*$N_j$个分子处于能级$j$之后，它们中的每一个仍可各自独立地置于该能级的$g_j$个状态之任一。
:::
::: solution
选定哪些分子进哪个能级给出多项式系数$N!/\prod_j N_j!$。能级$j$上的$N_j$个分子随后可各自独立地占据其$g_j$个状态中的任一个，使计数乘以$g_j^{N_j}$。故$W = N!\prod_j g_j^{N_j}/N_j!$。

用斯特林近似，
$$
\ln W = N\ln N - N + \sum_j\left(N_j\ln g_j - N_j\ln N_j + N_j\right) = N\ln N - \sum_j N_j\ln\frac{N_j}{g_j} ,
$$
其中用了$\sum_j N_j = N$。于是$\partial\ln W/\partial N_j = \ln N + 1 - \ln(N_j/g_j) - 1 = -\ln(N_j/Ng_j)$。令$\partial\ln W/\partial N_j + \alpha - \beta\varepsilon_j = 0$得$N_j = Ng_je^{\alpha}e^{-\beta\varepsilon_j}$，归一化定出$e^{\alpha} = 1/q$，其中$q = \sum_j g_je^{-\beta\varepsilon_j}$。结果就是$N_j/N = g_je^{-\beta\varepsilon_j}/q$，它必然与把[[#eq-boltzmann]]的状态布居对每个能级的$g_j$个状态求和所得完全相同。
:::
:::

::: exercise 极大值附近的权 {level=3 check="0.129"}
对$N = 1000$个能量相同的双态分子，用[[#prop-width]]估计比值$W(n = 532)/W(n = 500)$。然后用$W(n) = N!/n!(N-n)!$精确算出同一比值，并解释这小小的出入。（输入高斯估计值。）
::: hint
精确值用$\ln n! = \ln\Gamma(n+1)$，任何科学计算库都能提供。至于差异，看接下来的几项：泰勒展开的四次项，以及斯特林公式中$\tfrac{1}{2}\ln(2\pi N)$那一部分。
:::
::: solution
取$\delta = 32$，高斯估计为$\exp(-2\times32^{2}/1000) = e^{-2.048} = 0.129$。精确地，
$$
\ln\frac{W(532)}{W(500)} = 2\ln 500! - \ln 532! - \ln 468! = -2.0473,
$$
故比值为$e^{-2.0473} = 0.1291$，三位数字相同。两个符号相反而数值很小的修正，解释了指数中残留的$0.0007$。$N\ln N - n\ln n - (N-n)\ln(N-n)$展开的四次项为$-\tfrac{4}{3}\delta^{4}/N^{3} = -0.0014$；改进的斯特林公式添上$\tfrac{1}{2}\ln[(N/2)^{2}/n(N-n)] = \tfrac{1}{2}\ln[250\,000/(532\times468)] = +0.0020$。二者之和$+0.0007$，恰是$-2.048$与$-2.0473$之间的差。
:::
:::

::: exercise 热接触与共同的$\beta$ {level=3}
体系A（$N_\mathrm{A}$个分子，状态$\varepsilon_i$）与体系B（$N_\mathrm{B}$个分子，状态$\varepsilon'_k$）与外界隔绝，但彼此可以交换能量，因而只有$E_\mathrm{A} + E_\mathrm{B}$固定。证明：极大化总权$W_\mathrm{A}W_\mathrm{B}$在两个体系中都给出*同一个*$\beta$的玻尔兹曼分布。这为什么足称$\beta$为温度的函数？
::: solution
以三个约束$\sum_i n_i = N_\mathrm{A}$、$\sum_k n'_k = N_\mathrm{B}$和$\sum_i n_i\varepsilon_i + \sum_k n'_k\varepsilon'_k = E$极大化$\ln W_\mathrm{A} + \ln W_\mathrm{B}$，使用乘数$\alpha_\mathrm{A}$、$\alpha_\mathrm{B}$与$-\beta$。对$n_i$求导得$-\ln(n_i/N_\mathrm{A}) + \alpha_\mathrm{A} - \beta\varepsilon_i = 0$，对$n'_k$求导得$-\ln(n'_k/N_\mathrm{B}) + \alpha_\mathrm{B} - \beta\varepsilon'_k = 0$。于是$n_i/N_\mathrm{A} = e^{-\beta\varepsilon_i}/q_\mathrm{A}$，$n'_k/N_\mathrm{B} = e^{-\beta\varepsilon'_k}/q_\mathrm{B}$：两个带单一$\beta$的玻尔兹曼分布，因为只有一个能量约束。（若两体系彼此绝热，就会有两个能量约束和两个独立乘数。）一个无论组成如何、在任何两个处于热平衡的体系中都取同一值的量，由热力学第零定律，必是经验温度的函数；再由[[#prop-beta]]，该函数就是$1/k_\mathrm{B}T$。
:::
:::
