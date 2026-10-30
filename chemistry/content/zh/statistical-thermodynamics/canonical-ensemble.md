分子彼此独立时，分子配分函数$q$很好用：每个分子有自己的能级，不受其他分子影响，整个体系的能量就是分子能量之和。但分子之间确实存在相互作用。液体的能量不是一个个孤立分子能量的和；即便在气体中，一次碰撞的能量也同时属于两个分子。统计热力学需要一种新的表述，其中求和能级的对象是*整个体系*——一只烧瓶里$10^{23}$个相互作用的分子。吉布斯（J. Willard Gibbs）在1902年给出了它，其想法简单得近乎诱骗：设想的不是一个烧瓶，而是全同烧瓶的巨大集合——一个**系综**——把玻尔兹曼的计数施加于这些烧瓶而不是分子。

本课建立正则系综及其配分函数$Q$，并由它导出一切热力学函数——热力学能、熵、亥姆霍兹自由能与吉布斯自由能、压力——其形式对任何体系都成立，无论有无相互作用。我们将说明为什么温度固定的宏观体系的能量没有可测的涨落，而纳米粒子的能量却有。最后解决[[statistical-thermodynamics/thermodynamic-functions]]遗留的问题：气体中分子的不可分辨性如何改变计数。这将把我们引向单原子气体绝对熵的萨库尔–特特罗德方程（Sackur–Tetrode equation）——该理论被验证得最精确的预言之一——并引向混合的吉布斯佯谬的解决。

## 系综

::: definition 系综 {#def-ensemble}
**系综**是一个体系的$\tilde N$份复制品构成的巨大想象集合：每一份具有相同的宏观约束，但都可以处于与这些约束相容的整个体系的任一量子态。常用的三种系综是：

- **微正则系综**：每个成员有相同的分子数$N$、体积$V$和能量$E$（孤立体系）；
- **正则系综**：每个成员有相同的$N$、$V$和温度$T$，温度靠与其余所有成员的热接触维持，其余成员充当恒温浴（恒温下的封闭体系）；
- **巨正则系综**：每个成员有相同的$V$、$T$和化学势$\mu$，与其余成员既交换能量又交换分子（开放体系）。

某一性质的热力学值，是该性质对系综各成员的平均。
:::

用系综平均（某一时刻观测许多体系）取代时间平均（长时间跟踪一个体系），就是**各态历经假说**。与等先验概率原理一样，它是一条公设，凭成功获得辩护。正则系综在化学中最有用，因为实验室里的体系通常固定在恒定温度而非恒定能量上；巨正则系综则是吸附、开放体系和量子统计（[[statistical-thermodynamics/quantum-statistics]]）的天然框架。

在正则系综中，每个成员都是由$N$个分子——可能相互作用——组成的完整体系，有自己的一套量子态$i$和总能量$E_i(N, V)$。成员之间交换能量，所以系综的总能量$\tilde E$固定，而任何一个成员的能量不固定。问题是：系统处于状态$i$的成员占多大比例？

## 正则分布

::: proposition 正则分布 {#prop-canonical}
在温度为$T$的正则系综中，一个成员处于能量为$E_i$的体系状态$i$的概率是
$$
P_i = \frac{e^{-\beta E_i}}{Q}, \qquad Q = \sum_i e^{-\beta E_i}, \qquad \beta = \frac{1}{k_\mathrm{B}T},
$$ {#eq-canonical}
其中求和遍历体积$V$中$N$个分子组成的整个体系的所有量子态。$Q(N, V, T)$是**正则配分函数**。
:::

::: proof
论证就是[[statistical-thermodynamics/boltzmann-distribution#prop-boltzmann]]推导玻尔兹曼分布的那个，只不过用系综的成员代替分子。设$\tilde n_i$个成员处于状态$i$。每个成员都是原则上可以编号的宏观客体，所以实现分布方式$\{\tilde n_i\}$的方式数为$\tilde W = \tilde N!/\prod_i\tilde n_i!$。整个系综是孤立的，故一切与$\sum_i\tilde n_i = \tilde N$和$\sum_i\tilde n_iE_i = \tilde E$相容的指派都等概率。在这些约束下用拉格朗日乘数极大化$\ln\tilde W$，和先前一模一样地得到$\tilde n_i/\tilde N = e^{-\beta E_i}/\sum_je^{-\beta E_j}$。由于$\tilde N$可以任意大，系综的最概然分布方式具有压倒性的主导性，$\tilde n_i/\tilde N$就是概率$P_i$。乘数$\beta$为一切处于热接触的成员所共有，并用与先前相同的论证认定为$1/k_\mathrm{B}T$（或要求与理想气体的分子结果一致）。
:::

这个分布与玻尔兹曼分布形式上完全一样，说的却是强得多的东西。$E_i$是*整个体系*的能量，包含所有分子间相互作用；完全没有假定分子独立。一旦知道$Q$——对相互作用的分子计算$Q$正是困难所在，[[statistical-thermodynamics/real-gases-liquids]]再论——热力学性质便随之而来。

## 由$Q$求热力学函数

::: proposition 正则系综中的热力学函数 {#prop-thermo-q}
对正则配分函数为$Q(N, V, T)$的体系，
$$
\begin{aligned}
U - U(0) &= -\left(\frac{\partial\ln Q}{\partial\beta}\right)_{V} , &
S &= \frac{U - U(0)}{T} + k_\mathrm{B}\ln Q , \\
A - A(0) &= -k_\mathrm{B}T\ln Q , &
p &= k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_{T} , \\
H - H(0) &= -\left(\frac{\partial\ln Q}{\partial\beta}\right)_{V} + k_\mathrm{B}TV\left(\frac{\partial\ln Q}{\partial V}\right)_{T} , &
G - G(0) &= -k_\mathrm{B}T\ln Q + k_\mathrm{B}TV\left(\frac{\partial\ln Q}{\partial V}\right)_{T} ,
\end{aligned}
$$ {#eq-thermo-q}
式中$T = 0$时的量指处于最低状态的体系，一切$E_i$都从该状态量起。
:::

::: proof
**能量。**系综平均为$U - U(0) = \sum_iP_iE_i = Q^{-1}\sum_iE_ie^{-\beta E_i} = -Q^{-1}(\partial Q/\partial\beta)_V$，与分子情形相同。

**熵。**整个系综的熵为$k_\mathrm{B}\ln\tilde W$，用斯特林近似得$\ln\tilde W = -\tilde N\sum_iP_i\ln P_i$。于是单个成员的熵为
$$
S = -k_\mathrm{B}\sum_iP_i\ln P_i ,
$$
即**吉布斯熵**。代入$\ln P_i = -\beta E_i - \ln Q$得$S = k_\mathrm{B}\beta\sum_iP_iE_i + k_\mathrm{B}\ln Q = (U - U(0))/T + k_\mathrm{B}\ln Q$。

**亥姆霍兹自由能。**$A = U - TS$，故$A - A(0) = U - U(0) - TS = -k_\mathrm{B}T\ln Q$（$T = 0$时$A(0) = U(0)$）。

**压力。**由热力学（[[thermodynamics/free-energy]]），$p = -(\partial A/\partial V)_T$，于是$p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$。（直接推导：处于状态$i$的成员施加压力$-\partial E_i/\partial V$；对此按$P_i$平均即得同一表达式。）

**焓与吉布斯自由能。**$H = U + pV$与$G = A + pV$，代入$p$的表达式。
:::

亥姆霍兹自由能是正则系综的特性函数：$A = -k_\mathrm{B}T\ln Q$紧凑到不能再紧凑，其余一切量都是它的导数，正如在热力学中一切性质都可由$A(T, V, N)$求导得到。这就是桥梁：统计力学算出一个函数$Q$，经典热力学从此接手。

::: warning 分子配分函数与正则配分函数之别 {#warn-q-Q}
$q$与$Q$是两个不同的对象。分子配分函数$q$是对*一个分子*的状态的求和；对处于一摩尔量级体积中的一个分子，它的量级是$10^{30}$。正则配分函数$Q$是对*整个体系*的状态的求和；对$N$个独立分子它是$q^{N}$或$q^{N}/N!$，是一个约有$10^{24}$位的数。形如$U - U(0) = -N\,\partial\ln q/\partial\beta$的公式只是$U - U(0) = -\partial\ln Q/\partial\beta$对独立分子的特例——绝不要把二者混在同一个式子里，也绝不要把多分子体系写成$A = -k_\mathrm{B}T\ln q$。
:::

## 涨落

在正则系综中，成员的能量不固定；能量随体系与恒温库之间的能量往来而涨落。涨落有多大？

::: proposition 能量涨落 {#prop-fluct}
在正则系综中，能量的方差为
$$
\sigma_E^{2} = \langle E^{2}\rangle - \langle E\rangle^{2} = k_\mathrm{B}T^{2}C_V .
$$ {#eq-fluct}
因为$C_V$与$\langle E\rangle$都正比于$N$，相对涨落$\sigma_E/\langle E\rangle$正比于$N^{-1/2}$。对单原子理想气体，$\sigma_E/\langle E\rangle = (2/3N)^{1/2}$。
:::

::: proof
对$\langle E\rangle = \sum_iE_ie^{-\beta E_i}/Q$关于$\beta$求导：
$$
\frac{\partial\langle E\rangle}{\partial\beta} = -\frac{\sum_iE_i^{2}e^{-\beta E_i}}{Q} + \frac{\left(\sum_iE_ie^{-\beta E_i}\right)^{2}}{Q^{2}} = -\langle E^{2}\rangle + \langle E\rangle^{2} = -\sigma_E^{2} .
$$
由$\partial/\partial\beta = -k_\mathrm{B}T^{2}\,\partial/\partial T$且$\partial\langle E\rangle/\partial T = C_V$，得$\sigma_E^{2} = k_\mathrm{B}T^{2}C_V$。对单原子气体，$\langle E\rangle = \tfrac{3}{2}Nk_\mathrm{B}T$，$C_V = \tfrac{3}{2}Nk_\mathrm{B}$，故$\sigma_E/\langle E\rangle = (\tfrac{3}{2}Nk_\mathrm{B}^{2}T^{2})^{1/2}/\tfrac{3}{2}Nk_\mathrm{B}T = (2/3N)^{1/2}$。
:::

式[[#eq-fluct]]有两点教益。第一，热容是涨落的量度：容易吸收能量的体系（$C_V$大），其能量也游走得远。在相变附近，$C_V$变得非常大，涨落成为宏观的——这正是临界乳光的物理起源。第二，既然$C_V \ge 0$可由$\sigma_E^{2} \ge 0$得出，热力学的稳定性条件就是统计学的推论。

::: widget distribution
dist: gamma
params: alpha=1.5, beta=1
caption: 正则系综中单原子理想气体$N$个原子的总动能$E$的分布，以$k_\mathrm{B}T$为单位。$3N$个二次项的状态密度按$E^{3N/2 - 1}$增长，玻尔兹曼因子按$e^{-E/k_\mathrm{B}T}$衰减，故$E/k_\mathrm{B}T$服从形状$\alpha = 3N/2$、率为1的伽马分布。起始值$\alpha = 1.5$对应单个原子：一个宽而偏斜、均值为$1.5\,k_\mathrm{B}T$的分布。把$\alpha$增到15（$N = 10$），分布变成窄而近乎正态的峰；均值按$\alpha$增长，宽度却只按$\sqrt{\alpha}$增长，正像[[#prop-fluct]]所预言。
:::

::: example 一摩尔氩气的能量涨落有多大？ {#ex-fluct}
一摩尔氩在$298.15\ \mathrm{K}$，置于与恒温浴接触的刚性导热容器中，计算热力学能的均方根涨落，给出绝对值以及相对$U - U(0)$的值。对100个氩原子组成的团簇重算一遍。
::: solution
一摩尔的$C_V = \tfrac{3}{2}R = 12.47\ \mathrm{J\,K^{-1}}$，
$$
\sigma_E = (k_\mathrm{B}T^{2}C_V)^{1/2} = (1.380\,65\times10^{-23}\times298.15^{2}\times12.47)^{1/2}\ \mathrm{J} = 3.9\times10^{-9}\ \mathrm{J}.
$$
平均能量为$U - U(0) = \tfrac{3}{2}RT = 3718\ \mathrm{J}$，故$\sigma_E/U = 1.05\times10^{-12}$，与$(2/3N_\mathrm{A})^{1/2}$一致。百亿分之一量级的涨落，任何量热计都永远测不到：对宏观体系，正则系综与微正则系综给出完全相同的热力学。

对$N = 100$，$\sigma_E/U = (2/300)^{1/2} = 0.082$：与恒温浴接触的纳米团簇，其能量游走达$8\,\%$。在这个尺度上，"团簇的温度"与"团簇的能量"不再是可互换的描述，系综的选择变得要紧——这对小体系的模拟有实际的重要性（[[computational-chemistry/molecular-dynamics]]）。
:::
:::

## 独立分子：可分辨与不可分辨

若分子间无相互作用，体系一个状态的能量是分子能量之和，$E = \varepsilon^{(1)}_{i_1} + \varepsilon^{(2)}_{i_2} + \cdots + \varepsilon^{(N)}_{i_N}$，其中$i_k$标记分子$k$的状态。$Q$是否为分子配分函数的简单乘积，取决于分子能否被区分。

::: proposition 独立分子的$Q$ {#prop-Q-indep}
对分子配分函数为$q$的$N$个独立分子：
$$
Q = q^{N}\quad\text{（可分辨分子）}, \qquad
Q = \frac{q^{N}}{N!}\quad\text{（不可分辨分子，} q \gg N\text{）} .
$$ {#eq-Q-indep}
分子占据固定的、可辨认的位置时是可分辨的（晶格中的原子、表面位点上的吸附分子）；全同而可自由游历同一体积的分子（气体、液体）是不可分辨的。第二个公式要求可及分子状态数远大于分子数。
:::

::: proof
**可分辨。**体系的状态是全体组合$(i_1, i_2, \ldots, i_N)$，其中每个分子独立地取其任一状态，故
$$
Q = \sum_{i_1}\sum_{i_2}\cdots\sum_{i_N}e^{-\beta(\varepsilon_{i_1} + \varepsilon_{i_2} + \cdots + \varepsilon_{i_N})} = \left(\sum_{i_1}e^{-\beta\varepsilon_{i_1}}\right)\cdots\left(\sum_{i_N}e^{-\beta\varepsilon_{i_N}}\right) = q^{N},
$$
即[[statistical-thermodynamics/partition-function#prop-factor]]中的因子化论证。

**不可分辨。**若分子全同且不局限一处，则"分子1在状态$a$、分子2在状态$b$"与"分子1在状态$b$、分子2在状态$a$"是体系的*同一个*量子态：量子力学用一个（对称化或反对称化的）波函数描述它，只由被占据的分子状态集合指定。乘积$q^{N}$把每个这样的体系状态数了$N!$次——$N$个被占据状态上分子 permutation 的每一排列数一次——*前提是这$N$个被占据状态互不相同*。当$q \gg N$时，绝大多数项里每个分子都在不同状态（$N$个分子中恰有两个选中$q$个状态中同一个的概率为$N^{2}/q$量级），除以$N!$即修正了重复计数。条件不满足时，多重占据的项变得重要，必须正确计数——那是[[statistical-thermodynamics/quantum-statistics]]的主题。
:::

对气体，条件$q \gg N$是对平动配分函数的条件：$V/\Lambda^{3} \gg N$，即
$$
\frac{N\Lambda^{3}}{V} \ll 1 .
$$ {#eq-classical}
它说每个分子分得的体积必须远大于热波长的立方——分子波包不得重叠。室温、$1\ \mathrm{bar}$下的氩，$N\Lambda^{3}/V = 1\times10^{-7}$，条件以巨大裕度满足。金属中的电子（高密度下的轻粒子，钠在室温下$N\Lambda^{3}/V \approx 2\times10^{3}$）和液氦（$4.2\ \mathrm{K}$时$N\Lambda^{3}/V \approx 1.5$）则不满足——它们是两种典型的量子流体。

::: widget plot
f: (p*1e5/(1.380649e-23*x))*(6.62607015e-34/sqrt(2*pi*m*1.66053907e-27*1.380649e-23*x))^3; 0.01
x: 1, 40
y: 0, 0.5
sliders: m=4.0026:1:40:0.0001; p=1:0.1:10:0.1
labels: N\Lambda^{3}/V; 0.01
caption: 理想气体的简并度参数$N\Lambda^{3}/V$对温度$T$（单位K）作图，摩尔质量取`m`（单位$\mathrm{g\,mol^{-1}}$）、压力取`p`（单位bar）。它按$T^{-5/2}$下降。对$1\ \mathrm{bar}$的氦-4（起始值），它降到$0.01$以下——在该处[[#prop-Q-indep]]的$1/N!$计数精确到约百分之一——已近$12\ \mathrm{K}$；对$\mathrm{H_2}$（$m = 2.016$）交点温度更高，而对氩（$m = 39.95$）交点在$3\ \mathrm{K}$以下，远低于沸点。压力升高，曲线成比例上移。
:::

::: example 沸点下的氦气是经典的吗？ {#ex-he}
把蒸气当作理想气体，计算氦-4气体（$M = 4.0026\ \mathrm{g\,mol^{-1}}$）在其正常沸点$4.2\ \mathrm{K}$、$101.325\ \mathrm{kPa}$下的$N\Lambda^{3}/V$。
::: solution
数密度为$N/V = p/k_\mathrm{B}T = 101\,325/(1.380\,65\times10^{-23}\times4.2) = 1.747\times10^{27}\ \mathrm{m^{-3}}$。热波长为
$$
\Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} = \frac{6.626\times10^{-34}}{(2\pi\times6.6465\times10^{-27}\times1.380\,65\times10^{-23}\times4.2)^{1/2}} = 4.26\times10^{-10}\ \mathrm{m} ,
$$
故$N\Lambda^{3}/V = 1.747\times10^{27}\times(4.26\times10^{-10})^{3} = 0.13$。这并不$\ll 1$：即便氦的饱和蒸气也显示出对经典行为可测的量子统计偏差；液氦（$N\Lambda^{3}/V \approx 1.5$）则是完全的量子体系——这正是氦-4在$2.17\ \mathrm{K}$以下呈现超流性的前提。其他一切气体在各自沸点下该参数都小得多。
:::
:::

## 由$Q$求理想气体

对$N$个不可分辨分子的理想气体，$Q = q^{N}/N!$，其中$q = (V/\Lambda^{3})q^\mathrm{int}$，$q^\mathrm{int} = q^\mathrm{R}q^\mathrm{V}q^\mathrm{E}$与$V$无关。理想气体的一切性质如今都可由求导得到。

**状态方程。**$\ln Q = N\ln V + (\text{与 } V\text{ 无关的项})$，故由[[#eq-thermo-q]]
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_T = \frac{Nk_\mathrm{B}T}{V} = \frac{nRT}{V} .
$$
理想气体状态方程单从平动配分函数的体积依赖就浮现出来；分子的内部结构不影响压力。（历史上论证是反着走的：我们用$pV = nRT$认定了$\beta$。圆环能够闭合，正是一致性检验。）

**熵。**用斯特林近似，$\ln Q = N\ln q - \ln N! = N\ln q - N\ln N + N$，由[[#eq-thermo-q]]得
$$
S = \frac{U - U(0)}{T} + Nk_\mathrm{B}\ln\frac{q}{N} + Nk_\mathrm{B} .
$$ {#eq-s-gas}
这就是[[statistical-thermodynamics/thermodynamic-functions]]中许诺的修正形式。对单原子气体，它成为物理化学的经典结果之一。

::: proposition 萨库尔–特特罗德方程 {#prop-sackur-tetrode}
单原子理想气体（电子基态非简并）的摩尔熵为
$$
S_\mathrm{m} = R\ln\!\left(\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}}\,e^{5/2}\right) = R\ln\!\left(\frac{k_\mathrm{B}T}{p\Lambda^{3}}\,e^{5/2}\right) ,
\qquad \Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} .
$$ {#eq-sackur-tetrode}
:::

::: proof
对单原子气体$q = V/\Lambda^{3}$，$U - U(0) = \tfrac{3}{2}Nk_\mathrm{B}T$. 代入[[#eq-s-gas]]，取一摩尔（$N = N_\mathrm{A}$，$Nk_\mathrm{B} = R$）：
$$
S_\mathrm{m} = \tfrac{3}{2}R + R\ln\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}} + R = R\left[\ln\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}} + \frac{5}{2}\right] = R\ln\!\left(\frac{V_\mathrm{m}}{N_\mathrm{A}\Lambda^{3}}e^{5/2}\right).
$$
对理想气体$V_\mathrm{m}/N_\mathrm{A} = k_\mathrm{B}T/p$，得第二种形式。若电子基能级简并，再加上$R\ln g_0$。
:::

::: example 氩的标准摩尔熵 {#ex-sackur-tetrode}
计算氩在$298.15\ \mathrm{K}$、$p^\circ = 1\ \mathrm{bar}$下的$S^\circ_\mathrm{m}$，并与量热值$154.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$（热力学CODATA关键值）比较。
::: solution
由[[statistical-thermodynamics/partition-function]]，$298.15\ \mathrm{K}$下Ar的$\Lambda = 1.600\times10^{-11}\ \mathrm{m}$。于是
$$
\frac{k_\mathrm{B}T}{p^\circ\Lambda^{3}} = \frac{1.380\,65\times10^{-23}\times298.15}{10^{5}\times(1.600\times10^{-11})^{3}} = \frac{4.116\times10^{-26}}{4.094\times10^{-33}} = 1.006\times10^{7},
$$
从而
$$
S^\circ_\mathrm{m} = 8.3145\times\left[\ln(1.006\times10^{7}) + 2.5\right] = 8.3145\times(16.124 + 2.500) = 154.8\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
与量热结果——从几开尔文起沿固体、经$83.8\ \mathrm{K}$的熔化与$87.3\ \mathrm{K}$的沸腾积分$C_p/T$——在所引精度内完全吻合。通向熵的两条全然不同的路，一条经过普朗克常量与原子质量，另一条经过量热计与温度计，给出同一个数。$\ln N!$一项必不可少：没有它，算出的熵将大$R(\ln N_\mathrm{A} - 1) = 447\ \mathrm{J\,K^{-1}\,mol^{-1}}$，而且连广度量都不是。
:::
:::

萨库尔–特特罗德方程包含着熟悉的热力学。恒温下，$S_\mathrm{m}$按$R\ln V_\mathrm{m}$依赖体积，故从$V_1$到$V_2$的等温膨胀使熵改变$nR\ln(V_2/V_1)$。恒压下，$\Lambda^{-3} \propto T^{3/2}$而$k_\mathrm{B}T/p \propto T$，故$S_\mathrm{m}$按$\tfrac{5}{2}R\ln T$增长，与$C_{p,\mathrm{m}} = \tfrac{5}{2}R$一致。较重的原子熵较大，多$\tfrac{3}{2}R\ln M$：它们的热波长更短，同一体积内容纳的平动状态更多——氙（$169.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$）超出氦（$126.2$）达$\tfrac{3}{2}R\ln(131.29/4.0026) = 43.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$。

### 吉布斯佯谬

::: example 相同气体与不同气体的混合 {#ex-gibbs-paradox}
一容器被隔板分为相等的两半，各有体积$V$，分别盛同温同压下的$n$摩尔理想气体。抽去隔板。用[[#eq-s-gas]]求下列两种情形的$\Delta S$：(a) 两种气体不同（He与Ar）；(b) 两种气体相同（Ar与Ar）。
::: solution
把体积$V'$中$N$个某一种气体分子的熵的平动部分写成$S = Nk_\mathrm{B}[\ln(V'/N\Lambda^{3}) + \tfrac{5}{2}]$，再加上混合时不变的内部分。

(a) 不同气体：混合后，每种$N$个分子的气体占据$2V$。每个熵增加$Nk_\mathrm{B}\ln[(2V/N)/(V/N)] = Nk_\mathrm{B}\ln 2$，故$\Delta S = 2nR\ln 2$，即[[thermodynamics/second-law]]的混合熵。

(b) 相同气体：混合后，$2N$个不可分辨分子占据$2V$，故$S_\text{末态} = 2Nk_\mathrm{B}[\ln(2V/2N\Lambda^{3}) + \tfrac{5}{2}]$，恰好等于$S_\text{初态} = 2\times Nk_\mathrm{B}[\ln(V/N\Lambda^{3}) + \tfrac{5}{2}]$：$\Delta S = 0$，本应如此，因为在相同气体之间抽去隔板不改变任何可观测的东西。

若没有$1/N!$——即若$S = Nk_\mathrm{B}\ln q + \ldots$——情形(b)也会给出$2nR\ln 2$：隔板一插一抽就凭空造出熵。这就是**吉布斯佯谬**，而它的解决恰恰在于全同分子的不可分辨性：它使对数的自变量成为每个分子的体积$V/N$而非$V$，从而让熵成为广度量。
:::
:::

### 理想气体的吉布斯自由能

平衡常数需要$G$。对理想气体$pV = Nk_\mathrm{B}T$，故$G = A + pV = A + Nk_\mathrm{B}T$，又$A - A(0) = -k_\mathrm{B}T\ln Q = -Nk_\mathrm{B}T\ln q + k_\mathrm{B}T\ln N!$，于是
$$
G - G(0) = -Nk_\mathrm{B}T\ln q + Nk_\mathrm{B}T\ln N - Nk_\mathrm{B}T + Nk_\mathrm{B}T = -nRT\ln\frac{q}{N} .
$$ {#eq-g-gas}
吉布斯自由能由*每个分子*的可及状态数决定。把摩尔配分函数记作$q_\mathrm{m} = q/n$，则$G_\mathrm{m} - G_\mathrm{m}(0) = -RT\ln(q_\mathrm{m}/N_\mathrm{A})$。**标准摩尔配分函数**$q^\circ_\mathrm{m}$是取标准摩尔体积$V^\circ_\mathrm{m} = RT/p^\circ$时的$q_\mathrm{m}$；由此得标准摩尔吉布斯自由能
$$
G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -RT\ln\frac{q^\circ_\mathrm{m}}{N_\mathrm{A}} .
$$ {#eq-g-standard}
对$298.15\ \mathrm{K}$的氩，$q^\circ_\mathrm{m}/N_\mathrm{A} = 1.006\times10^{7}$（与[[#ex-sackur-tetrode]]中的数相同），而$G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -8.3145\times298.15\times\ln(1.006\times10^{7}) = -39.97\ \mathrm{kJ\,mol^{-1}}$。式[[#eq-g-standard]]是[[statistical-thermodynamics/equilibrium-from-molecules]]的出发点。

## 开放体系：巨正则系综与吸附

当体系能同环境交换分子而不只是能量——与气体接触的表面、从溶液中结合配体的蛋白质、被蒸气充填的孔道——自然的系综就是[[#def-ensemble]]中的巨正则系综。把[[#prop-canonical]]的推导连同第二个约束（系综内分子总数）重做一遍，会引入第二个拉格朗日乘数，它等于$-\beta\mu$：具有$N$个分子、能量为$E_{N,i}$的体系状态的概率是
$$
P_{N,i} = \frac{e^{-\beta(E_{N,i} - \mu N)}}{\Xi}, \qquad \Xi = \sum_{N}\sum_ie^{-\beta(E_{N,i} - \mu N)} = \sum_Ne^{\beta\mu N}Q(N, V, T),
$$
其中$\Xi$是**巨配分函数**，$\mu$是库的化学势。它的对数又是一个热力学势：$pV = k_\mathrm{B}T\ln\Xi$；平均分子数为$\langle N\rangle = k_\mathrm{B}T(\partial\ln\Xi/\partial\mu)_{T,V}$。巨系综是量子统计（[[statistical-thermodynamics/quantum-statistics]]）的出发点；它最简单的化学应用是吸附等温式。

::: proposition 统计力学给出的朗缪尔吸附等温式 {#prop-langmuir}
设表面有$M$个独立而等价的位点，每个位点或空着、或容纳一个分子，吸附分子的配分函数为$q_\mathrm{s}$（能量从静止的气相分子量起，故$q_\mathrm{s}$包含结合能$\varepsilon_\mathrm{ads}$对应的因子$e^{\varepsilon_\mathrm{ads}/k_\mathrm{B}T}$）。与压力$p$的理想气体达成平衡时，覆盖度为
$$
\theta = \frac{Kp}{1 + Kp}, \qquad K = \frac{q_\mathrm{s}\Lambda^{3}}{k_\mathrm{B}T\,q^\mathrm{int}} ,
$$ {#eq-langmuir}
其中$\Lambda$与$q^\mathrm{int}$是气体分子的热波长与内部配分函数。
:::

::: proof
各位置独立，故$\Xi$是$M$个相同的单位位点因子$\xi = 1 + q_\mathrm{s}e^{\beta\mu}$的乘积（空着，或以权$q_\mathrm{s}e^{\beta\mu}$被占据）。一个位点的平均占据数为$\theta = q_\mathrm{s}e^{\beta\mu}/(1 + q_\mathrm{s}e^{\beta\mu})$。平衡要求吸附分子的化学势等于气体的化学势，由[[#eq-g-gas]]，$\mu = -k_\mathrm{B}T\ln(q/N)$，其中$q/N = q^\mathrm{int}V/(N\Lambda^{3}) = q^\mathrm{int}k_\mathrm{B}T/(p\Lambda^{3})$。于是$e^{\beta\mu} = p\Lambda^{3}/(k_\mathrm{B}Tq^\mathrm{int})$，代入即得[[#eq-langmuir]]。
:::

这一论证把朗缪尔（Langmuir）1918年的动力学论证（[[kinetics/surface-kinetics]]）改写成了关于配分函数的陈述，并赋予常数$K$以分子含义：单位压力下，分子在一个位点上可用的状态数与其在气相中可用的状态数之比。

::: example 氩的物理吸附 {#ex-langmuir}
氩在$90\ \mathrm{K}$下物理吸附于某表面，结合能$\varepsilon_\mathrm{ads} = 8.0\ \mathrm{kJ\,mol^{-1}}$；在位点上，它的三个平动自由度变成约$50\ \mathrm{cm^{-1}}$的振动。估算$K$、达到半覆盖所需的压力、以及$1.0\ \mathrm{bar}$下的$\theta$。
::: solution
位点振动的$c_2\tilde\nu/T = 1.438\,78\times50/90 = 0.799$，每个振动贡献$1/(1 - e^{-0.799}) = 1.817$，三者合计$1.817^{3} = 6.00$。结合因子为$e^{8000/(8.3145\times90)} = e^{10.69} = 4.40\times10^{4}$，故$q_\mathrm{s} = 2.64\times10^{5}$。对$90\ \mathrm{K}$的气态氩，$\Lambda = 29.1\ \mathrm{pm}$，$\Lambda^{3}/k_\mathrm{B}T = (2.912\times10^{-11})^{3}/(1.243\times10^{-21})\ \mathrm{Pa^{-1}} = 1.99\times10^{-11}\ \mathrm{Pa^{-1}}$；$q^\mathrm{int} = 1$。于是
$$
K = 2.64\times10^{5}\times1.99\times10^{-11}\ \mathrm{Pa^{-1}} = 5.2\times10^{-6}\ \mathrm{Pa^{-1}}, \qquad p_{1/2} = 1/K = 1.9\times10^{5}\ \mathrm{Pa} = 1.9\ \mathrm{bar},
$$
在$1.0\ \mathrm{bar}$下，$\theta = 0.52/1.52 = 0.34$。结合能虽只有约$11RT$，却足以在大气压下稳住三分之一个单分子层，因为它只需与气体的平动自由竞争，而不必压倒它。在这样的覆盖度下，真实的物理吸附因横向吸引与多分子层生成——BET吸附等温式——而复杂化，独立位点模型对这些都置之不理。
:::
:::

::: quiz
$N$个原子组成的晶体被建模为定域于格点上的$3N$个独立谐振子。哪个正则配分函数是正确的？
- [x] $Q = (q^\mathrm{V})^{3N}$，因为格点上的原子按位置可分辨。
- [ ] $Q = (q^\mathrm{V})^{3N}/(3N)!$，因为原子是全同的。
- [ ] $Q = (q^\mathrm{V})^{3N}/N!$，因为有$N$个全同原子。
- [ ] $Q = 3N\,q^\mathrm{V}$，因为振子是独立的。
::: solution
固定在有编号位置上的全同粒子按其*位置*可分辨：交换1号与2号位点上原子的振动态产生晶体的一个不同状态（1号位点现在处于另一个状态），所以不存在排列造成的重复计数，$Q = q^{N_\text{osc}}$。这就是[[statistical-thermodynamics/quantum-statistics]]中的爱因斯坦模型。$1/N!$属于能游历同一体积并互换位置的粒子；在此除以$N!$会得到广延性朝反方向出错的熵。而*和*式$3Nq$是一个拥有$3N$份振子状态的单粒子的配分函数——不是$3N$个粒子的。
:::
:::

::: history
耶鲁大学数学物理学教授吉布斯（J. Willard Gibbs）在《统计力学的基本原理》（*Elementary Principles in Statistical Mechanics*，1902）中引入了微正则、正则与巨正则系综；这本书给了这门学科它的名字和现代表述。他的"正则分布"之所以中选，是因为它使热力学类比成为严格的那几个里最简单的一个。以他名字命名的混合熵佯谬出现在他的宏篇论文《论多相物质的平衡》（*On the Equilibrium of Heterogeneous Substances*，1875–1878）中。爱因斯坦（Einstein）不知有吉布斯之书，在1902–1904年独立导出了正则系综，并在1904年的论文中得到了能量涨落公式[[#eq-fluct]]，用它估计了黑体辐射中涨落的大小。萨库尔（Otto Sackur，1911–1912）与特特罗德（Hugo Tetrode，1912）各自独立导出了单原子气体的绝对熵——普朗克常量头一次出现在气体的热力学性质里；特特罗德明确地把状态数除以$N!$，其结果与实测的水银蒸气压对照检验。
:::

## 后续内容

正则系综是本课程其余部分的框架。有了$Q = q^{N}/N!$和吉布斯自由能[[#eq-g-standard]]，我们在[[statistical-thermodynamics/equilibrium-from-molecules]]中由分子数据计算平衡常数。分子相互作用时，$Q$中出现位形积分，计算它就得到位力系数与液体的结构（[[statistical-thermodynamics/real-gases-liquids]]）。当条件$N\Lambda^{3}/V \ll 1$不满足时，$1/N!$修正不再够用，巨正则系综通向玻色-爱因斯坦统计与费米-狄拉克统计（[[statistical-thermodynamics/quantum-statistics]]）。在计算化学中，分子动力学与蒙特卡洛模拟采样的正是这些系综，自由能方法估计的正是正则配分函数之比（[[computational-chemistry/free-energy-sampling]]）。

::: summary
- 系综是体系复制品的集合；正则系综固定$N$、$V$与$T$，其成员以概率$P_i = e^{-\beta E_i}/Q$处于状态$i$，$Q = \sum_ie^{-\beta E_i}$对整个体系的状态求和。
- 一切热力学都由$Q$导出：$A - A(0) = -k_\mathrm{B}T\ln Q$，$U - U(0) = -(\partial\ln Q/\partial\beta)_V$，$S = (U - U(0))/T + k_\mathrm{B}\ln Q$，$p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$；吉布斯熵为$S = -k_\mathrm{B}\sum_iP_i\ln P_i$。
- 能量涨落服从$\sigma_E^{2} = k_\mathrm{B}T^{2}C_V$；相对涨落按$N^{-1/2}$缩放（一摩尔为$10^{-12}$，100个原子为$8\,\%$）。
- 独立分子：可分辨（定域）时$Q = q^{N}$，不可分辨时$Q = q^{N}/N!$，后者在$N\Lambda^{3}/V \ll 1$时成立。
- 理想气体状态方程源于$q^\mathrm{T} \propto V$；萨库尔–特特罗德方程$S_\mathrm{m} = R\ln(k_\mathrm{B}Te^{5/2}/p\Lambda^{3})$对氩给出$154.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$，与量热一致。
- $1/N!$使熵成为广度量，并解决吉布斯佯谬。
- 对理想气体$G - G(0) = -nRT\ln(q/N)$，且$G^\circ_\mathrm{m} - G^\circ_\mathrm{m}(0) = -RT\ln(q^\circ_\mathrm{m}/N_\mathrm{A})$。
:::

## 习题

::: exercise 小体系中的涨落 {level=1 check="0.000816"}
计算正则系综中$10^{6}$个原子组成的单原子理想气体的相对均方根能量涨落$\sigma_E/\langle E\rangle$。（输入比值。）
::: solution
$\sigma_E/\langle E\rangle = (2/3N)^{1/2} = (2/3\times10^{6})^{1/2} = 8.16\times10^{-4}$。一百万个原子——$1\ \mathrm{bar}$气体中约$30\ \mathrm{nm}$见方的一块——能量涨落仍低于$0.1\,\%$。
:::
:::

::: exercise 等温膨胀的熵 {level=1 check="5.76"}
用萨库尔–特特罗德方程计算单原子理想气体等温膨胀至体积加倍时摩尔熵的改变。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入$\Delta S_\mathrm{m}$。）
::: solution
恒温下$\Lambda$不变，$S_\mathrm{m} = R\ln V_\mathrm{m} + \text{const}$，故$\Delta S_\mathrm{m} = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}}$——热力学结果$nR\ln(V_2/V_1)$，这里由平动状态计数重新得到：体积加倍，每个分子的可及状态数也加倍。
:::
:::

::: exercise 氖的标准熵 {level=1 check="146.3"}
计算氖（$M = 20.180\ \mathrm{g\,mol^{-1}}$）在$298.15\ \mathrm{K}$、$1\ \mathrm{bar}$下的$S^\circ_\mathrm{m}$。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入。）
::: solution
从氩换算最快：$S_\mathrm{m}$对质量的依赖是$\tfrac{3}{2}R\ln M$，故$S^\circ_\mathrm{m}(\mathrm{Ne}) = 154.85 + \tfrac{3}{2}\times8.3145\times\ln(20.180/39.948) = 154.85 - 8.52 = 146.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$。直接计算得$\Lambda = 22.5\ \mathrm{pm}$，$k_\mathrm{B}T/p^\circ\Lambda^{3} = 3.61\times10^{6}$，$S^\circ_\mathrm{m} = R(15.10 + 2.5) = 146.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$；表列值为$146.3$。
:::
:::

::: exercise 较高温度下的熵 {level=2 check="165.6"}
氩在$500\ \mathrm{K}$的标准摩尔熵是多少？（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入。）
::: solution
恒压下$k_\mathrm{B}T/p\Lambda^{3} \propto T^{5/2}$，故$S^\circ_\mathrm{m}(500\ \mathrm{K}) = S^\circ_\mathrm{m}(298.15\ \mathrm{K}) + \tfrac{5}{2}R\ln(500/298.15) = 154.85 + 10.75 = 165.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$。同样的答案可由热力学得到：$\Delta S = C_p\ln(T_2/T_1)$，$C_{p,\mathrm{m}} = \tfrac{5}{2}R$。
:::
:::

::: exercise 气体何时是经典的？ {level=2 check="12"}
求$1\ \mathrm{bar}$的氦-4气体使$N\Lambda^{3}/V = 0.01$的温度。（以$\mathrm{K}$为单位输入$T$，保留两位有效数字。）
::: hint
$N/V = p/k_\mathrm{B}T$而$\Lambda^{3} \propto T^{-3/2}$，故$N\Lambda^{3}/V \propto T^{-5/2}$。
:::
::: solution
$N\Lambda^{3}/V = (p/k_\mathrm{B}T)\,h^{3}/(2\pi mk_\mathrm{B}T)^{3/2} \propto T^{-5/2}$。由[[#ex-he]]，$4.2\ \mathrm{K}$、$101.325\ \mathrm{kPa}$下该值为$0.135$；$1\ \mathrm{bar}$下为$0.135\times(100/101.325) = 0.133$。令$0.133\times(4.2/T)^{5/2} = 0.01$得$(4.2/T)^{5/2} = 0.0751$，故$4.2/T = 0.0751^{0.4} = 0.355$，$T = 11.8\ \mathrm{K}$，即约$12\ \mathrm{K}$。在此温度以上，$1\ \mathrm{bar}$的氦经典性达到约$1\,\%$以内；其他一切气体都在远高于其沸点的温度就满足同样条件。
:::
::: answer
$12\ \mathrm{K}$
:::
:::

::: exercise 正则系综中的二能级体系 {level=2 check="0.693"}
一晶体含$N$个独立的、定域的二能级体系（状态$0$与$\varepsilon$）。写出$Q$，用[[#eq-thermo-q]]求$A$与$S$。$T\to\infty$极限下$S/Nk_\mathrm{B}$是多少？（输入$S/Nk_\mathrm{B}$。）
::: solution
各体系可分辨，故$Q = q^{N} = (1 + e^{-\beta\varepsilon})^{N}$，$A - A(0) = -Nk_\mathrm{B}T\ln(1 + e^{-\beta\varepsilon})$。于是$U - U(0) = -\partial\ln Q/\partial\beta = N\varepsilon e^{-\beta\varepsilon}/(1 + e^{-\beta\varepsilon})$，且
$$
S = \frac{U - U(0)}{T} + k_\mathrm{B}\ln Q = Nk_\mathrm{B}\left[\frac{\beta\varepsilon\,e^{-\beta\varepsilon}}{1 + e^{-\beta\varepsilon}} + \ln(1 + e^{-\beta\varepsilon})\right] .
$$
$T\to\infty$时$\beta\varepsilon\to0$，第一项消失，第二项趋于$\ln 2$：$S/Nk_\mathrm{B} \to \ln 2 = 0.693$，即$2^{N}$个等概率排布的熵——与[[statistical-thermodynamics/thermodynamic-functions]]中相同的结果，如今由普遍形式得出。
:::
:::

::: exercise 由配分函数导出范德瓦尔斯方程 {level=3}
稠密气体的一个粗略模型，是把每个分子可用的体积换为$V - Nb$（排除体积），把吸引换为每个分子的平均势能$-aN/V$（$a$、$b$为每个分子的常数），于是
$$
Q = \frac{1}{N!}\left(\frac{V - Nb}{\Lambda^{3}}\right)^{N}e^{\beta aN^{2}/V} .
$$
导出状态方程，并写成摩尔形式。
::: solution
$\ln Q = N\ln(V - Nb) + \beta aN^{2}/V + (\text{与 } V\text{ 无关的项})$。于是
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Q}{\partial V}\right)_T = \frac{Nk_\mathrm{B}T}{V - Nb} - \frac{aN^{2}}{V^{2}} .
$$
对每摩尔，令$N = nN_\mathrm{A}$、摩尔常数$a_\mathrm{m} = N_\mathrm{A}^{2}a$、$b_\mathrm{m} = N_\mathrm{A}b$，这就是$p = nRT/(V - nb_\mathrm{m}) - a_\mathrm{m}n^{2}/V^{2}$，范德瓦尔斯方程。推导揭示了两个常数的含义：$b$是分子排斥芯排除的体积，$a$量度平均吸引能，二者我们都将在[[statistical-thermodynamics/real-gases-liquids]]中由分子间势算出。
:::
:::

::: exercise 涨落与热容 {level=3}
(a) 证明正则系综中$\langle(E - \langle E\rangle)^{3}\rangle = k_\mathrm{B}^{2}\left[T^{4}(\partial C_V/\partial T)_V + 2T^{3}C_V\right]$。(b) 对单原子理想气体，证明偏度$\langle(E - \langle E\rangle)^{3}\rangle/\sigma_E^{3}$等于$2/\sqrt{3N/2}$，并评论一个原子与一摩尔气体能量分布的形状。
::: hint
对$\sigma_E^{2} = -\partial\langle E\rangle/\partial\beta$再关于$\beta$求导一次；三阶中心矩为$-\partial\sigma_E^{2}/\partial\beta$。
:::
::: solution
(a) 与[[#prop-fluct]]证明中同样的演算表明，$\partial^{n}\ln Q/\partial\beta^{n}$是第$n$个累积量乘以$(-1)^{n}$，故三阶中心矩为$\kappa_3 = -\partial\sigma_E^{2}/\partial\beta = k_\mathrm{B}T^{2}\,\partial(k_\mathrm{B}T^{2}C_V)/\partial T = k_\mathrm{B}^{2}T^{2}(2TC_V + T^{2}\,\partial C_V/\partial T)$，即所证结果。

(b) 单原子气体的$C_V = \tfrac{3}{2}Nk_\mathrm{B}$是常数，故$\kappa_3 = 2k_\mathrm{B}^{2}T^{3}\cdot\tfrac{3}{2}Nk_\mathrm{B} = 3Nk_\mathrm{B}^{3}T^{3}$，而$\sigma_E^{3} = (\tfrac{3}{2}N)^{3/2}k_\mathrm{B}^{3}T^{3}$。偏度为$3N/(\tfrac{3}{2}N)^{3/2} = 2/(\tfrac{3}{2}N)^{1/2}$——恰是图中$\alpha = 3N/2$的伽马分布的偏度$2/\sqrt{\alpha}$。对一个原子它是$1.63$，分布强烈偏斜、带一条很长的高能尾（麦克斯韦-玻尔兹曼能量分布）；对一摩尔它是$2\times10^{-12}$，分布是完全对称、窄到可以忽略的高斯曲线。
:::
:::
