向碳碳双键加氢是有机化学中放能最多的简单反应之一——对乙烯而言，$\Delta_\mathrm{r}G^\circ \approx -100\ \mathrm{kJ\,mol^{-1}}$——然而乙烯与氢气的混合物却可以放置数年而不反应。这两个分子彼此无话可说：$\mathrm{H_2}$ 既没有孤对电子，也没有能量较低的空轨道，而它直接对烯烃进行协同加成在轨道对称性上是禁阻的。过渡金属改变了这场对话。它能通过氧化加成把 $\mathrm{H_2}$ 拆开，把烯烃一并拉到近旁，再经插入与还原消除把碎片缝合起来，然后放手、重新开始。这一序列——一个**催化循环**——就是本章的主题。

我们使用化学中被研究得最充分的两个循环。 Wilkinson 催化剂 $\mathrm{[RhCl(PPh_3)_3]}$ 的**加氢**教会了化学家如何从动力学读取循环，其手性衍生物以吨级规模生产单一对映体药物，并赢得了 2001 年诺贝尔化学奖。**氢甲酰化**把 $\mathrm{H_2}$ 与 CO 加到烯烃两端生成醛，是工业上规模最大的均相催化过程之一。二者都由 [[organometallics-catalysis/elementary-reactions]]的基元步骤组装而成，也都用 [[kinetics/homogeneous-catalysis]]的速率方程机制来分析。

## 什么是催化循环

::: definition 催化循环、静息态、转化数与转化频率 {#def-cycle}
一个**催化循环**是一系列基元步骤构成的闭合序列：催化剂（或由**预催化剂**衍生的活性物种）在其中某一步被消耗，又在后面某一步再生，同时底物进入、产物离开。**静息态**是周转期间浓度最高的含催化剂物种——通常是循环最高能垒*之前*的物种。**转化数**（TON）是催化剂失活之前（或在某一指定实验中）每摩尔催化剂生成产物的摩尔数；**转化频率**（TOF）是单位时间的周转次数，$\mathrm{TOF} = v/[\mathrm{Cat}]_0$，通常在指定的条件与转化率下以 $\mathrm{s^{-1}}$ 或 $\mathrm{h^{-1}}$ 标出。*预催化剂*是加入反应瓶中的化合物；在进入循环之前，它可能需要失去一个配体、被还原或被活化。
:::

三条规则使一个被提出的循环可信。每个中间体都应有一个合理的电子数——按 Tolman 规则，后过渡金属为 16 或 18（[[organometallics-catalysis/organometallic-bonding#prop-16-18]]）。每一步都应是已知的基元步骤之一，且电子数的变化符合 [[organometallics-catalysis/elementary-reactions#prop-step-counts]]的要求。而且循环应能解释观察到的速率方程、选择性与同位素标记。循环是一个假说，要由动力学与光谱来检验；图画不是证据。

::: example 转化数与转化频率 {#ex-ton}
某烯烃（$0.250\ \mathrm{mol}$）的加氢使用 $25.0\ \mu\mathrm{mol}$ 铑催化剂（$0.0100\ \mathrm{mol\,\%}$），在 $2.00\ \mathrm{h}$ 内达到完全转化。求 TON 以及以 $\mathrm{h^{-1}}$ 与 $\mathrm{s^{-1}}$ 表示的平均 TOF。
::: solution
$\mathrm{TON} = 0.250\ \mathrm{mol}/25.0\times10^{-6}\ \mathrm{mol} = 1.00\times10^{4}$。平均 TOF 为
$$
\mathrm{TOF} = \frac{1.00\times10^{4}}{2.00\ \mathrm{h}} = 5.00\times10^{3}\ \mathrm{h^{-1}} = \frac{5.00\times10^{3}}{3600\ \mathrm{s\,h^{-1}}} = 1.39\ \mathrm{s^{-1}}.
$$
有两个要注意的地方。这里的 TON 是催化剂寿命的*下界*：催化剂是被底物耗尽的，而不是失去了活性。而且整个反应的 TOF 平均值，把早期快速的周转与底物耗竭后变慢的周转混在了一起；报告的 TOF 应当是初始速率，或者应说明测量时的转化率。
:::
:::

## Wilkinson 催化剂

三氯化三(三苯基膦)合铑(I) $\mathrm{[RhCl(PPh_3)_3]}$ 由 Geoffrey Wilkinson 课题组于 1965–66 年报道，能在室温与 $1\ \mathrm{bar}$ $\mathrm{H_2}$ 下氢化无位阻的烯烃，而对酮、酯、腈与硝基不起作用。它是 16 电子的平面正方形 Rh(I)、$d^8$ 配合物（$9 + 6 + 1 = 16$）。Jack Halpern 在 1970 年代的动力学与光谱研究表明，大部分加氢通量根本不经过这一配合物，而是经过失去一分子膦形成的、活泼得多的三配位碎片。

主循环用文字叙述如下。每一步都标出其类型与电子数的变化。

1. **配体解离。** $\mathrm{[RhCl(PPh_3)_3]}$ 失去一分子 $\mathrm{PPh_3}$，给出 14 电子的 $\mathrm{[RhCl(PPh_3)_2]}$（在溶液中可能微弱溶剂化）。这一步位于主循环之外，却决定有多大比例的铑是活泼的。
2. **$\mathrm{H_2}$ 的氧化加成。** $\mathrm{H_2}$ 的协同三中心加成给出*顺*式二氢化物 $\mathrm{[RhH_2Cl(PPh_3)_2]}$：Rh(III)、$d^6$、16 电子。（对 14 电子物种的氧化加成比对其母体 16 电子配合物快约 $10^4$ 倍。）
3. **烯烃配位。** 烯烃在与某个氢化物处于顺式的空位上结合：$\mathrm{[RhH_2Cl(PPh_3)_2(alkene)]}$，18 电子。
4. **迁移插入（决速步）。** 烯烃以顺式方式插入 Rh–H 键，生成烷基氢化物 $\mathrm{[RhH(alkyl)Cl(PPh_3)_2]}$，16 电子。
5. **还原消除。** 烷基与剩下的那个顺式氢化物偶联，释放出烷烃并再生 $\mathrm{[RhCl(PPh_3)_2]}$（14 电子），后者从第 2 步重新进入循环。

由于两个氢都从金属加到烯烃的同一面，总加成是**顺式**的：$\mathrm{D_2}$ 与（*Z*）-丁-2-烯加成给出*内消旋*-2,3-二氘代丁烷，与（*E*）-丁-2-烯加成给出外消旋的 *dl* 对。催化剂对位阻较小的烯烃有选择性（端烯 > 顺式二取代 > 三取代），因为烯烃必须挤进被两个三苯基膦夹着的位点。

::: widget graph
nodes: RhClL3@0,2; RhClL2@2,3; H2RhClL2@4,2; H2RhClL2(alkene)@4,0; HRh(alkyl)ClL2@2,-1
edges: RhClL3>RhClL2; RhClL2>RhClL3; RhClL2>H2RhClL2:2; H2RhClL2>H2RhClL2(alkene):3; H2RhClL2(alkene)>HRh(alkyl)ClL2:4; HRh(alkyl)ClL2>RhClL2:5
algorithm: none
caption: Wilkinson 催化剂（$\mathrm{L = PPh_3}$）的主加氢循环，画成有向反应网络。边权即正文中的步骤编号：2 为 $\mathrm{H_2}$ 的氧化加成，3 为烯烃配位，4 为迁移插入（决速步），5 为烷烃的还原消除。与 $\mathrm{RhClL_3}$ 之间的双向连线，是位于循环之外、决定有多少铑处于循环之内的膦解离平衡；游离膦把铑拉出循环，使反应变慢。绕循环一周的电子数：14、16、18、16、14——除烯烃-二氢化物外每个中间体都不饱和，而慢步骤正是从这个 18 电子物种开始的。
:::

### 带有惰性储库的循环的速率方程

::: proposition 由配体解离供料的循环的速率方程 {#prop-wilkinson-rate}
设预催化剂 $\mathrm{CatL}$ 是静息态，经失去配体与活性物种 $\mathrm{Cat}$ 快速平衡：$\mathrm{CatL \rightleftharpoons Cat + L}$（$K_\mathrm{d} = [\mathrm{Cat}][\mathrm{L}]/[\mathrm{CatL}]$）；$\mathrm{Cat}$ 再经平衡常数为 $K_\mathrm{H}$ 与 $K_\mathrm{S}$ 的快速前置平衡结合 $\mathrm{H_2}$ 与烯烃 S，生成 $\mathrm{CatH_2S}$；而 $\mathrm{CatH_2S}$ 以速率常数 $k$ 在决速步中反应，随后的快步骤再生 $\mathrm{Cat}$。若几乎所有催化剂都以 $\mathrm{CatL}$ 形式存在，则速率为
$$
v = \frac{k\,K_\mathrm{d}K_\mathrm{H}K_\mathrm{S}\,[\mathrm{Cat}]_0\,[\mathrm{H_2}][\mathrm{S}]}{[\mathrm{L}]}.
$$ {#eq-wilkinson-rate}
反应对催化剂、对 $\mathrm{H_2}$、对烯烃均为一级，对自由配体为**负一级**。
:::

::: proof
前置平衡给出 $[\mathrm{Cat}] = K_\mathrm{d}[\mathrm{CatL}]/[\mathrm{L}]$ 与 $[\mathrm{CatH_2S}] = K_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}][\mathrm{H_2}][\mathrm{S}]$。当 $\mathrm{CatL}$ 是静息态时，催化剂守恒式为 $[\mathrm{Cat}]_0 = [\mathrm{CatL}] + [\mathrm{Cat}] + [\mathrm{CatH_2}] + [\mathrm{CatH_2S}] + \dots \approx [\mathrm{CatL}]$。于是
$$
v = k[\mathrm{CatH_2S}] = kK_\mathrm{H}K_\mathrm{S}\frac{K_\mathrm{d}[\mathrm{Cat}]_0}{[\mathrm{L}]}[\mathrm{H_2}][\mathrm{S}],
$$
即[[#eq-wilkinson-rate]]。若其他任何物种的浓度变得与 $\mathrm{CatL}$ 可比（例如在高 $[\mathrm{H_2}]$ 下二氢化物积累时），守恒求和就多出一项项附加的项，速率随之饱和；其一般形式为 $v = k[\mathrm{Cat}]_0 \times$（处于反应形态 $\mathrm{CatH_2S}$ 的催化剂分数），与 [[kinetics/homogeneous-catalysis]]中的米氏方程算法完全一样。该推导假设决速步之前的每一步都是快速且可逆的。$\blacksquare$
:::

::: warning 你加入的配合物并不是催化剂 {#warn-precatalyst}
从瓶子里的化合物出发画催化循环是自然的。但对 Wilkinson 催化剂以及大多数以膦为基础的催化剂来说，那个化合物是**预催化剂**，也是**储库**：它把大部分金属以无活性的形式存住，只释放出微量的真正催化剂。反应期间 NMR 看到的物种通常是静息态，而不是周转最快的那个物种——Halpern 证明，Wilkinson 加氢主循环上真正的中间体，其浓度低到无法观测。反过来说，一个*能*分离出来、而且*确实*能催化加氢的物种，对观测速率的贡献可能微乎其微。要确定循环，需要动力学（对配体与底物的级数）以及对每一步速率的独立测量；光谱本身只能识别出积累下来的物种。
:::

热力学上，加氢是高度有利的。由 NIST 标准生成焓（$\Delta_\mathrm{f}H^\circ$：乙烯 $+52.4$、乙烷 $-84.0\ \mathrm{kJ\,mol^{-1}}$）与标准熵（$S^\circ$：乙烯 $219.3$、乙烷 $229.1$、$\mathrm{H_2}$ $130.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$）可得，对 $\mathrm{C_2H_4(g) + H_2(g) \rightarrow C_2H_6(g)}$，$\Delta_\mathrm{r}H^\circ = -136.4\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = -120.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故 $298\ \mathrm{K}$ 时 $\Delta_\mathrm{r}G^\circ = -100.4\ \mathrm{kJ\,mol^{-1}}$。平衡一直强烈地偏向右边，直到约 $\Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ \approx 1130\ \mathrm{K}$，温度再高脱氢就占主导——这是蒸汽裂解的基础（[[green-chemistry/petrochemicals]]）。催化剂只改变速率。

## 不对称加氢

如果铑周围的膦是手性的，前手性烯烃的两个面便不再等价，加氢就能有选择性地生成一个对映体。孟山都公司（Monsanto）的 William Knowles 与 Leopold Horner 于 1968 年报道了首批这类铑催化剂，选择性尚属平平；Henri Kagan 的螯合双膦 DIOP（1971）与 Knowles 的 $P$ 手性 DIPAMP（1970 年代）把脱氢氨基酸的选择性提高到约 $95\,\%$ ee，孟山都则用 DIPAMP-铑生产治疗帕金森病的药物 L-DOPA。野依（Ryoji Noyori）的 BINAP-钌催化剂（1980 年代）把不对称加氢推广到很宽范围的烯烃与酮。

::: proposition 对映体过量与活化能之差 {#prop-ee}
若两个对映体产物 R 与 S 由一个快速互变的共同中间体库经竞争路径不可逆地生成（Curtin–Hammett 情形），且两个决速过渡态的吉布斯自由能相差 $\Delta\Delta G^\ddagger = G^\ddagger_\mathrm{S} - G^\ddagger_\mathrm{R}$，则对映体比与对映体过量为
$$
\mathrm{er} = \frac{[\mathrm{R}]}{[\mathrm{S}]} = e^{\Delta\Delta G^\ddagger/RT}, \qquad
\mathrm{ee} = \frac{[\mathrm{R}] - [\mathrm{S}]}{[\mathrm{R}] + [\mathrm{S}]} = \tanh\!\left(\frac{\Delta\Delta G^\ddagger}{2RT}\right).
$$ {#eq-ee}
该比值只取决于过渡态的能量差，而不取决于中间体的相对布居。
:::

::: proof
设两个中间体 $\mathrm{I_R}$ 与 $\mathrm{I_S}$ 快速互变，平衡常数 $K = [\mathrm{I_S}]/[\mathrm{I_R}] = e^{-(G_\mathrm{S} - G_\mathrm{R})/RT}$，并以速率常数 $k_\mathrm{R} \propto e^{-(G^\ddagger_\mathrm{R} - G_\mathrm{R})/RT}$ 与 $k_\mathrm{S} \propto e^{-(G^\ddagger_\mathrm{S} - G_\mathrm{S})/RT}$ 反应（Eyring 方程，指前因子相同）。产物比即速率比，
$$
\frac{[\mathrm{R}]}{[\mathrm{S}]} = \frac{k_\mathrm{R}[\mathrm{I_R}]}{k_\mathrm{S}[\mathrm{I_S}]} = \frac{k_\mathrm{R}}{k_\mathrm{S}K} = \exp\!\left[\frac{-(G^\ddagger_\mathrm{R} - G_\mathrm{R}) + (G^\ddagger_\mathrm{S} - G_\mathrm{S}) - (G_\mathrm{R} - G_\mathrm{S})}{RT}\right] = e^{(G^\ddagger_\mathrm{S} - G^\ddagger_\mathrm{R})/RT}.
$$
基态能量相互抵消。对于过量，令 $\mathrm{er} = e^{2u}$，其中 $u = \Delta\Delta G^\ddagger/2RT$：$\mathrm{ee} = (\mathrm{er} - 1)/(\mathrm{er} + 1) = (e^{u} - e^{-u})/(e^{u} + e^{-u}) = \tanh u$。$\blacksquare$
:::

::: widget plot
f: 100*tanh(1000*x/(2*8.314*T))
x: 0, 20
y: 0, 100
sliders: T=298:200:400:1
labels: \text{ee}\,/\,\%
caption: 对映体过量（百分数）对 $\Delta\Delta G^\ddagger$（以 $\mathrm{kJ\,mol^{-1}}$ 计）的曲线，见[[#eq-ee]]，温度由滑标给出。$298\ \mathrm{K}$ 时，$95\,\%$ ee 需要 $9.1\ \mathrm{kJ\,mol^{-1}}$，$99\,\%$ ee 需要 $13.1\ \mathrm{kJ\,mol^{-1}}$——一个弱氢键的能量，就把平庸的催化剂与出色的催化剂区分开来。升高温度，曲线变平：同样的 $\Delta\Delta G^\ddagger$ 给出更低的选择性，这就是不对称反应常常在低温下进行、并为此牺牲速率的原因。
:::

::: example 95 % ee 的代价是什么？ {#ex-ee}
某不对称加氢在 $25\,^\circ\mathrm{C}$ 给出 $95.0\,\%$ ee。求对映体比与 $\Delta\Delta G^\ddagger$，并预言若 $\Delta\Delta G^\ddagger$ 不变，$100\,^\circ\mathrm{C}$ 下的 ee。
::: solution
$\mathrm{er} = (1 + 0.950)/(1 - 0.950) = 39.0$，即 $97.5 : 2.5$。于是
$$
\Delta\Delta G^\ddagger = RT\ln \mathrm{er} = (8.314)(298.15)\ln 39.0\ \mathrm{J\,mol^{-1}} = 9.08\ \mathrm{kJ\,mol^{-1}}.
$$
在 $373.15\ \mathrm{K}$：$\mathrm{ee} = \tanh\big(9080/(2 \times 8.314 \times 373.15)\big) = \tanh(1.463) = 0.898$，即约 $90\,\%$ ee（er $\approx 18.7$）。（实际上 $\Delta\Delta G^\ddagger$ 有焓与熵两部分，未必与温度无关；这里的估算只指示效应的方向与大小。）
:::
:::

Knowles 选择性背后的机理藏着一个意外。使用螯合双膦时，前手性烯酰胺底物——如（*Z*）-2-乙酰氨基肉桂酸甲酯——通过其 C=C 键与酰胺氧同时结合到阳离子铑上，而且可以用烯烃的任一面结合，从而给出两个非对映体的催化剂-底物加合物。Halpern 与 Clark Landis 证明（1980 年代）：**主要**加合物——NMR 与晶体结构所看到的那个——与 $\mathrm{H_2}$ 的反应比**次要**加合物慢几百倍，而产物几乎全部来自次要加合物。这种"反锁钥"行为正是[[#prop-ee]]所允许的：选择性决定于过渡态，而不是你看得见的中间体。

::: example 次要的非对映体胜出 {#ex-anti-lock-key}
在某不对称加氢中，两个非对映体的催化剂-烯酰胺加合物快速互变；主要者的丰度是次要者的 $10$ 倍，但次要的那个与 $\mathrm{H_2}$ 的反应快 $600$ 倍（数值大小取自 Landis 与 Halpern 实测的量级，仅作示意）。哪个加合物给出主产物？ee 是多少？
::: solution
每个加合物生成产物的速率等于其速率常数乘以其浓度。取次要加合物的浓度为 $1$、主要者为 $10$；主要加合物的速率常数为 $1$、次要者为 $600$：来自次要者的速率 $= 600 \times 1 = 600$，来自主要者的速率 $= 1 \times 10 = 10$。产物比为 $600 : 10 = 60 : 1$，偏向来自**次要**加合物的那个对映体，于是
$$
\mathrm{ee} = \frac{60 - 1}{60 + 1} = 0.967 = 96.7\,\%.
$$
你会由占主导、可观测的那个配合物所预言的对映体，恰恰是次要产物。任何仅凭静息态结构来解释选择性的尝试，都会把答案弄反。
:::
:::

## 氢甲酰化反应

氢甲酰化（**羰基合成**，oxo 工艺）把 $\mathrm{H}$ 与 $\mathrm{CHO}$ 加到烯烃两端：
$$
\mathrm{RCH{=}CH_2 + CO + H_2 \rightarrow RCH_2CH_2CHO\ (\text{直链}, n) \ \ \text{或}\ \ RCH(CHO)CH_3\ (\text{支链}, iso)}.
$$
Otto Roelen 于 1938 年在鲁尔化学公司（Ruhrchemie）用钴催化剂发现了这一反应；其产物——最重要的是由丙烯生成的丁醛，它被加氢成丁醇或缩合成用于增塑剂的 2-乙基己醇——年产量超过一千万吨。反应物的每一个原子都进入产物：原子经济性为 $100\,\%$（[[green-chemistry/green-metrics]]）。工业上的难题是**区域选择性**：人们通常要的是直链醛。

钴循环由 Richard Heck 与 David Breslow 于 1961 年提出，使用由 $\mathrm{[Co_2(CO)_8]}$ 与 $\mathrm{H_2}$ 生成的 $\mathrm{[HCo(CO)_4]}$（18 电子）。用文字叙述：

1. $\mathrm{[HCo(CO)_4]}$ 的 **CO 解离**给出 16 电子的 $\mathrm{[HCo(CO)_3]}$。
2. **烯烃配位**给出 $\mathrm{[HCo(CO)_3(alkene)]}$（18）。
3. 烯烃对 Co–H 的 **1,2-插入**给出烷基 $\mathrm{[Co(CH_2CH_2R)(CO)_3]}$（16）；钴接在末端碳上得到直链产物，钴接在内侧碳上得到支链产物。
4. **CO 配位**（18），随后 CO 对 Co-烷基键的 **1,1-插入**（烷基迁移）给出酰基 $\mathrm{[Co\{C(O)CH_2CH_2R\}(CO)_3]}$（16）。
5. **$\mathrm{H_2}$ 的氧化加成**（Co(I) → Co(III)，18）——或在高压下与第二个 $\mathrm{[HCo(CO)_4]}$ 反应——以及醛的**还原消除**，再生 $\mathrm{[HCo(CO)_3]}$。

钴需要高压（约 $200$–$300\ \mathrm{bar}$）与高温（$110$–$180\,^\circ\mathrm{C}$）来阻止 $\mathrm{[HCo(CO)_4]}$ 分解，且直链 : 支链之比只有约 $3$–$4 : 1$。Wilkinson 课题组在 1960 年代末证明，$\mathrm{[RhH(CO)(PPh_3)_3]}$ 活泼得多，能在几个 bar 与约 $100\,^\circ\mathrm{C}$ 下工作；在 $\mathrm{PPh_3}$ 大量过量时，它给出超过 $10 : 1$ 的直链 : 支链比。这一"低压羰基合成"工艺于 1976 年由 Union Carbide、Davy 与 Johnson Matthey 实现商业化。1984 年，鲁尔化学与罗纳-普朗克（Rhône-Poulenc）推出了使用水溶性磺化膦 TPPTS $\mathrm{P(C_6H_4SO_3Na\text{-}3)_3}$ 的版本：催化剂留在水相，丁醛另成一有机层，只需分相即可回收铑。

::: example 选择性即能量差 {#ex-lb}
某铑-双膦催化剂在 $120\,^\circ\mathrm{C}$ 给出 $19 : 1$ 的直链 : 支链醛之比（$95\,\%$ 直链）。若区域化学由同一个烯烃配合物在烯烃插入步不可逆地固定，求两个插入过渡态之间的 $\Delta\Delta G^\ddagger$。
::: solution
与[[#prop-ee]]相同的 Curtin–Hammett 推理适用于区域异构体：$\Delta\Delta G^\ddagger = RT\ln(19)$，其中 $T = 393.15\ \mathrm{K}$：
$$
\Delta\Delta G^\ddagger = (8.314)(393.15)(2.944)\ \mathrm{J\,mol^{-1}} = 9.62\ \mathrm{kJ\,mol^{-1}}.
$$
直链插入占优约 $10\ \mathrm{kJ\,mol^{-1}}$，这是空间效应：在支链烷基的过渡态中，烯烃取代基被挤向庞大的膦。（这一假定并非总是可靠：若 β-氢消除把支链烷基送回烯烃的速率快于 CO 插入，区域化学就在循环更靠后处确定，选择性也就依赖于 CO 压力。）
:::
:::

配体同时控制速率与选择性，其方式都能用基元步骤来解释。**过量膦**把平衡 $\mathrm{[RhH(CO)(PPh_3)_3] \rightleftharpoons [RhH(CO)(PPh_3)_2] + PPh_3}$ 推向左边，使反应变慢（[[#prop-wilkinson-rate]]），但保证发生烯烃插入的物种带着两个庞大的膦，而这有利于直链烷基。**宽齿合角双膦**——BISBI、Xantphos，P–Rh–P 角接近 $110$–$120^\circ$——占据三角双锥氢化物配合物的两个赤道位，挤压烯烃，把直链 : 支链比提高到 $30 : 1$ 甚至更高（Casey、van Leeuwen 与 Kamer 在 1990 年代的工作）。**提高 CO 压力**加快酰基生成，但与烯烃结合相竞争；**低 CO 压力**则允许 β-氢消除与烯烃异构化，于是内部烯烃可经"异构化氢甲酰化"转化为直链醛。

::: quiz
丙烯的铑/$\mathrm{PPh_3}$ 氢甲酰化中，随自由 $\mathrm{PPh_3}$ 浓度增大，速率被观察到*下降*，而直链 : 支链比*升高*。哪一条说法能同时解释这两个观察？
- [x] 膦解离先于决定转化数的各步骤，因此游离膦降低活性物种的浓度；留下来的活性物种带着更多膦，在空间上有利于直链烷基。
- [ ] 膦是催化剂毒物，不可逆地破坏铑。
- [ ] 游离膦与丙烯直接反应生成直链产物。
- [ ] 速率下降是因为膦增大了 CO 压力。
::: solution
这正是[[#prop-wilkinson-rate]]在起作用：对自由配体的负依赖，预示决速步之前存在解离型前置平衡。选择性与活性经由同一平衡耦合在一起——工业工艺靠选择膦铑之比来权衡这一矛盾，而宽齿合角螯合物能把决定选择性的配体固定到位、无需大量过量，从而绕开这一权衡。
:::
:::

## 一个羰基化循环：由甲醇制乙酸

氢甲酰化是把 CO 插入一根由烯烃生成的金属-烷基键。这套化学中规模最大的"亲戚"，则改由甲醇来提供烷基。在**孟山都工艺**（James Roth 与 Frank Paulik 于 1960 年代末发现，1970 年投产）中，甲醇与一氧化碳在铑催化剂上化合为乙酸 $\mathrm{CH_3OH + CO \rightarrow CH_3COOH}$，碘离子是不可缺少的促进剂。碘化物把甲醇转化为碘甲烷，金属真正进攻的正是碘甲烷。循环用文字叙述如下：

1. **甲醇的活化（金属循环之外）。** $\mathrm{CH_3OH + HI \rightarrow CH_3I + H_2O}$。
2. **氧化加成（决速步）。** 平面正方形的 16 电子阴离子 $\mathrm{[RhI_2(CO)_2]^-}$，Rh(I)、$d^8$，按 [[organometallics-catalysis/elementary-reactions]]中的 $\mathrm{S_N2}$ 途径进攻碘甲烷：铑的 $d_{z^2}$ 电子对从碳上置换碘离子，随后碘离子结合到铑上，给出八面体的 18 电子 $\mathrm{[CH_3RhI_3(CO)_2]^-}$，Rh(III)。
3. **迁移插入。** 甲基迁移到相邻的羰基上，给出 16 电子的乙酰基配合物 $\mathrm{[CH_3C(O)RhI_3(CO)]^-}$。
4. **CO 配位**恢复 18 电子。
5. 乙酰碘 $\mathrm{CH_3C(O)I}$ 的**还原消除**，再生 $\mathrm{[RhI_2(CO)_2]^-}$。
6. **水解（金属循环之外）。** $\mathrm{CH_3C(O)I + H_2O \rightarrow CH_3COOH + HI}$，把 HI 送回第 1 步。

两个相互咬合的循环——有机碘循环与铑循环——共享碘甲烷与乙酰碘。因为第 2 步是决速步，且它之前的每个物种要么大量过量、要么被迅速再生，速率方程出奇地简单：$v = k[\mathrm{Rh}][\mathrm{CH_3I}]$，在工作范围内对铑、对碘甲烷为一级，**对 CO 与对甲醇为零级**。**Cativa 工艺**（BP，1996）以铱取代铑：碘甲烷对 $\mathrm{[IrI_2(CO)_2]^-}$ 的氧化加成快得多（按 Peter Maitlis 的动力学研究约为百倍量级），这正是 $5d$ 金属所预期的（[[organometallics-catalysis/organometallic-bonding]]）；但随后的甲基迁移变慢，于是决速步发生移动，需要能把碘离子从铱上移去的促进剂（钌的羰基碘化物）来加速迁移。同一个循环、步骤重新排序，说明了这个一般道理：改善循环中的某一步，只在另一步成为瓶颈之前有帮助。

::: example 甲醇羰基化的速率与转化 {#ex-monsanto}
某孟山都型反应器含铑 $1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$、碘甲烷 $1.0\ \mathrm{mol\,dm^{-3}}$，在工作温度下速率方程 $v = k[\mathrm{Rh}][\mathrm{CH_3I}]$ 成立，$k = 2.0\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$（示意值）。求速率、TOF，以及每立方分米每小时生成乙酸（$M = 60.05\ \mathrm{g\,mol^{-1}}$）的质量。若 CO 压力加倍，速率会如何变化？
::: solution
$v = (2.0)(1.0\times10^{-3})(1.0) = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$。转化频率为
$$
\mathrm{TOF} = \frac{v}{[\mathrm{Rh}]} = k[\mathrm{CH_3I}] = 2.0\ \mathrm{s^{-1}}.
$$
按小时计：$2.0\times10^{-3} \times 3600 = 7.2\ \mathrm{mol\,dm^{-3}\,h^{-1}}$，即每小时每立方分米反应混合物生成 $7.2 \times 60.05 = 4.3\times10^{2}\ \mathrm{g}$ 乙酸。CO 压力加倍，速率**不变**：CO 在决速的氧化加成之后才进入循环，所以不出现在速率方程中（只要有足够的 CO 让第 4 步保持快速、并使铑稳定而不沉淀）。对 CO 为零级，正是 CO 进入循环之位置的直接结果。
:::
:::

## 其他加氢催化剂简况

Wilkinson 催化剂对三取代与四取代烯烃力不从心。**阳离子**催化剂带弱结合的配体，做得更好：Robert Crabtree 的 $\mathrm{[Ir(cod)(PCy_3)(py)]^+}$（1977，cod = 环辛-1,5-二烯，py = 吡啶）甚至能氢化四取代烯烃；它能结合底物的羟基或羰基，因此是**定向**的：氢被加到与配位基团处于同面的烯烃那一面。野依的钌催化剂同时带有二胺与双膦，经**外球**机理氢化酮：Ru–H 氢化物与 N–H 质子一起转移给 C=O 基团，而酮并不结合到金属上——这是**金属-配体协同作用**的一个例子。每种情形的循环都由同一小组步骤组装而成，但选用哪些步骤（内球还是外球、氧化加成还是 $\mathrm{H_2}$ 的异裂）由配体决定。

## 后续内容

这里用到的步骤——解离、氧化加成、插入、还原消除——在钯上于 [[organometallics-catalysis/cross-coupling]]中再次出现，只是那里的插入伙伴是芳基，且转金属化取代了 $\mathrm{H_2}$ 加成。没有氢气时的反复烯烃插入，给出 [[organometallics-catalysis/metathesis-polymerisation]]中的聚合物。金属表面上的加氢——Sabatier 的油脂加氢、Horiuti–Polanyi 机理——的多相对照在 [[organometallics-catalysis/heterogeneous-catalysis]]，而从羰基合成醇到工艺指标的工业背景在 [[green-chemistry/chemical-industry]]与 [[green-chemistry/green-metrics]]。顺式加成的立体化学与 [[organic-synthesis/stereoselective-synthesis]]相衔接。

::: history
Roelen（Otto Roelen）在研究 Fischer–Tropsch 化学期间，于 1938 年在鲁尔化学发现了氢甲酰化。Heck（Richard Heck）与 Breslow（David Breslow）于 1961 年提出了钴机理。Osborn（John Osborn）、Jardine（Fred Jardine）、Young（John Young）与 Wilkinson（Geoffrey Wilkinson）于 1965–66 年将 $\mathrm{[RhCl(PPh_3)_3]}$ 描述为均相加氢催化剂，Wilkinson 课题组又于 1968 年引入了铑-膦氢甲酰化。Knowles（William Knowles）与 Horner（Leopold Horner）于 1968 年各自独立报道了手性铑-膦加氢；Henri Kagan 的 DIOP 于 1971 年随后而至，孟山都以 DIPAMP 生产 L-DOPA 的工艺则在 1970 年代。同样是在孟山都，Roth（James Roth）与 Paulik（Frank Paulik）发展了铑-碘化物甲醇羰基化，1970 年投产；BP 的铱基 Cativa 工艺于 1996 年接踵而来。低压铑羰基合成工艺始于 1976 年，水相两相的鲁尔化学-罗纳普朗克工艺始于 1984 年，野依的 BINAP-钌加氢始于 1986–87 年。Halpern（Jack Halpern）在 1970 年代的动力学研究，以及他与 Clark Landis 关于"主要-次要"问题的工作（1980 年代），确立了如何推断催化循环。Knowles 与野依因不对称催化与 K. Barry Sharpless 共同分享 2001 年诺贝尔化学奖。
:::

::: summary
- 催化循环是电子数合理（16/18）的基元步骤构成的闭合序列；TON 数的是每个催化剂的周转次数，TOF 是 $v/[\mathrm{Cat}]_0$；静息态是最丰富的含催化剂物种，而加入的配合物往往只是预催化剂。
- Wilkinson 加氢主要经 $\mathrm{RhCl(PPh_3)_2}$ 进行：$\mathrm{H_2}$ 的氧化加成、烯烃结合、决速插入、还原消除。它是顺式加成，选择无位阻烯烃，对自由 $\mathrm{PPh_3}$ 为负一级。
- 循环的速率方程来自前置平衡与催化剂守恒，$v = k[\mathrm{Cat}]_0 \times$（处于反应形态的分数）；配体饱和的惰性储库给出对配体的负级数。
- 对映选择性与区域选择性只取决于过渡态之差（Curtin–Hammett）：$\mathrm{er} = e^{\Delta\Delta G^\ddagger/RT}$，$\mathrm{ee} = \tanh(\Delta\Delta G^\ddagger/2RT)$；$298\ \mathrm{K}$ 下 $95\,\%$ ee 对应 $9.1\ \mathrm{kJ\,mol^{-1}}$。
- 在不对称加氢中，次要的、无法观测的催化剂-底物非对映体可以给出主产物（反锁钥）。
- 氢甲酰化（Co：Heck–Breslow 循环；Rh/膦：低压）以 100 % 的原子经济性加入 $\mathrm{H}$ 与 $\mathrm{CHO}$；过量膦、宽齿合角与合适的 CO 压力都能提高直链选择性。
- 甲醇羰基化（孟山都 Rh，Cativa Ir）把碘循环与金属循环对接；$\mathrm{CH_3I}$ 的决速氧化加成使它对所有 CO 与甲醇为零级，而更换金属会使决速步移动。
:::

## 习题

::: exercise 转化频率 {level=1 check="1.39"}
某催化剂（$25.0\ \mu\mathrm{mol}$）在 $2.00\ \mathrm{h}$ 内完全转化 $0.250\ \mathrm{mol}$ 底物。平均 TOF 是多少？（以 $\mathrm{s^{-1}}$ 输入 TOF。）
::: solution
$\mathrm{TON} = 0.250/25.0\times10^{-6} = 1.00\times10^{4}$；$\mathrm{TOF} = 1.00\times10^{4}/7200\ \mathrm{s} = 1.39\ \mathrm{s^{-1}}$，同[[#ex-ton]]。
:::
:::

::: exercise 由对映体比求 ee {level=1 check="96.7"}
某不对称加氢以 $60 : 1$ 的比例给出两个对映体。ee 是多少？（以百分数输入 ee，保留三位有效数字。）
::: solution
$\mathrm{ee} = (60 - 1)/(60 + 1) = 59/61 = 0.967 = 96.7\,\%$。
:::
:::

::: exercise 达到 99 % ee 所需的能量 {level=1 check="13.1"}
在 $298.15\ \mathrm{K}$ 下要达到 $99.0\,\%$ ee，需要多大的 $\Delta\Delta G^\ddagger$？（以 $\mathrm{kJ\,mol^{-1}}$ 输入 $\Delta\Delta G^\ddagger$。）
::: solution
$\mathrm{er} = 1.99/0.01 = 199$，且 $\Delta\Delta G^\ddagger = RT\ln 199 = 8.314 \times 298.15 \times 5.293\ \mathrm{J\,mol^{-1}} = 13.1\ \mathrm{kJ\,mol^{-1}}$。把 ee 从 $95\,\%$ 提高到 $99\,\%$，只多花 $4\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 加氢的热力学 {level=2 check="-100.4"}
已知 $\Delta_\mathrm{f}H^\circ$（乙烯）$= +52.4$、$\Delta_\mathrm{f}H^\circ$（乙烷）$= -84.0\ \mathrm{kJ\,mol^{-1}}$，以及 $S^\circ$ = $219.32$（乙烯）、$229.12$（乙烷）、$130.68$（$\mathrm{H_2}$）$\mathrm{J\,K^{-1}\,mol^{-1}}$，计算 $298.15\ \mathrm{K}$ 下乙烯气相加氢的 $\Delta_\mathrm{r}G^\circ$。（以 $\mathrm{kJ\,mol^{-1}}$ 输入 $\Delta_\mathrm{r}G^\circ$，保留一位小数。）
::: solution
$\Delta_\mathrm{r}H^\circ = -84.0 - 52.4 = -136.4\ \mathrm{kJ\,mol^{-1}}$；$\Delta_\mathrm{r}S^\circ = 229.12 - 219.32 - 130.68 = -120.88\ \mathrm{J\,K^{-1}\,mol^{-1}}$；$\Delta_\mathrm{r}G^\circ = -136.4 - 298.15 \times (-0.12088) = -136.4 + 36.0 = -100.4\ \mathrm{kJ\,mol^{-1}}$。强烈有利；催化剂只是速率所需。
:::
:::

::: exercise 用能量表述的区域选择性 {level=2 check="9.62"}
某氢甲酰化在 $393.15\ \mathrm{K}$ 以 $19 : 1$ 的比例给出直链与支链醛。两个决定选择性的过渡态之间的 $\Delta\Delta G^\ddagger$ 是多少？（以 $\mathrm{kJ\,mol^{-1}}$ 输入 $\Delta\Delta G^\ddagger$。）
::: solution
$\Delta\Delta G^\ddagger = RT\ln 19 = 8.314 \times 393.15 \times 2.944\ \mathrm{J\,mol^{-1}} = 9.62\ \mathrm{kJ\,mol^{-1}}$（[[#ex-lb]]）。
:::
:::

::: exercise 对膦的负一级 {level=2 check="0.5"}
某加氢反应服从[[#eq-wilkinson-rate]]。其他条件固定，把自由 $\mathrm{PPh_3}$ 的浓度加倍，速率变为原来的多少倍？（输入倍数。）
::: solution
速率正比于 $1/[\mathrm{L}]$：$[\mathrm{L}]$ 加倍，速率减半，倍数为 $0.5$。实践中，对加入的膦呈负一级依赖，正是膦必须在决定转化数之步前先解离的实验特征。
:::
:::

::: exercise 氢的饱和 {level=3}
把[[#prop-wilkinson-rate]]推广到如下情形：二氢化物 $\mathrm{CatH_2}$（由 Cat 与 $\mathrm{H_2}$ 以常数 $K_\mathrm{H}$ 生成）可以积累，而 $\mathrm{CatH_2S}$ 始终居少数。证明
$$
v = \frac{kK_\mathrm{d}K_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}]_0[\mathrm{H_2}][\mathrm{S}]}{[\mathrm{L}] + K_\mathrm{d} + K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}]},
$$
并描述随压力升高对 $\mathrm{H_2}$ 的级数如何变化。在每种情形下，NMR 会看到什么？
::: hint
把所有催化剂物种都用 $[\mathrm{Cat}]$ 表示出来并求和。
:::
::: solution
用游离活性物种表示：$[\mathrm{CatL}] = [\mathrm{Cat}][\mathrm{L}]/K_\mathrm{d}$，$[\mathrm{CatH_2}] = K_\mathrm{H}[\mathrm{Cat}][\mathrm{H_2}]$，且 $[\mathrm{CatH_2S}]$ 可忽略。守恒式：
$$
[\mathrm{Cat}]_0 = [\mathrm{Cat}]\left(\frac{[\mathrm{L}]}{K_\mathrm{d}} + 1 + K_\mathrm{H}[\mathrm{H_2}]\right) \Longrightarrow [\mathrm{Cat}] = \frac{K_\mathrm{d}[\mathrm{Cat}]_0}{[\mathrm{L}] + K_\mathrm{d} + K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}]}.
$$
于是 $v = kK_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}][\mathrm{H_2}][\mathrm{S}]$，即得所给表达式。低 $\mathrm{H_2}$ 压（$K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}] \ll [\mathrm{L}]$）时，速率对 $\mathrm{H_2}$ 为一级，静息态是 $\mathrm{CatL}$——NMR 谱主要显示膦饱和的预催化剂。高压（$K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}] \gg [\mathrm{L}] + K_\mathrm{d}$）时分母正比于 $[\mathrm{H_2}]$，恰好相消：$v \rightarrow kK_\mathrm{S}[\mathrm{Cat}]_0[\mathrm{S}]$，**对 $\mathrm{H_2}$ 零级**，对烯烃一级，且与 $[\mathrm{L}]$ 无关。此时静息态是二氢化物，其标志性的高场氢化物信号出现在 $^{1}\mathrm{H}$ NMR 谱中。级数随压力的改变，是静息态已从 $\mathrm{H_2}$ 加成步骤之前移到其后的动力学证据。
:::
:::

::: exercise 氘甲酰化与机理 {level=3}
在 CO 与 $\mathrm{D_2}$ 存在下、低 CO 压力时，用 $\mathrm{[HCo(CO)_4]}$ 对己-1-烯进行氢甲酰化。(a) 用 Heck–Breslow 循环预言：若插入之后的每一步都快速且不可逆，氘出现在直链醛的哪些位置。(b) 低 CO 压下，回收的己-1-烯的 C2 与 C3 以及内部己烯中也发现了氘，并生成部分 2-甲基己醛与 2-乙基戊醛。请解释，并用文字描述相关步骤。(c) 为什么提高 CO 压力能抑制这些副反应？
::: solution
(a) 第一次周转后催化剂变为 $\mathrm{[DCo(CO)_4]}$（氢化物经 $\mathrm{D_2}$ 的氧化加成与醛的还原消除被氘化物取代）。烯烃对 Co–D 插入，钴在 C1、D 在 C2，给出 $\mathrm{Co{-}CH_2CHD{-}C_4H_9}$；CO 插入（烷基迁移）成酰基 $\mathrm{Co{-}C(O)CH_2CHDC_4H_9}$；$\mathrm{D_2}$ 的氧化加成与还原消除把一个 D 送到酰基碳上。直链醛为 $\mathrm{C_4H_9CHD{-}CH_2{-}CDO}$，即庚醛-1,3-$d_2$（从 CHO 碳开始编号）：一个 D 在甲酰基碳上，另一个在原烯烃的 C2 上。

(b) 低 CO 压下，16 电子烷基 $\mathrm{[Co(alkyl)(CO)_3]}$ 在等待 CO，其间它可以发生 **β-氢消除**。从 $\mathrm{Co{-}CH_2CHD{-}C_4H_9}$ 出发，金属可以从 C2 移去 H 而非 D，生成 $\mathrm{CH_2{=}CD{-}C_4H_9}$（氘位于回收烯烃的 C2）与 Co–H。按马尔科夫尼科夫方向插入则得仲烷基，后者可消除 C3 上的氢生成己-2-烯；反复的插入-消除使金属沿碳链"行走"（链行走，[[organometallics-catalysis/elementary-reactions]]），把氘散布到 C1–C3 乃至更远处。当 CO 最终插入 C2 或 C3 上的仲烷基时，就得到支链醛 2-甲基己醛与 2-乙基戊醛。

(c) CO 的配位与插入，对同一个 16 电子烷基与 β-氢消除相互竞争。提高 $p(\mathrm{CO})$ 会加快把烷基捕获为酰基（酰基不能再 β-消除）的速率，于是异构化与氘的混排减少，区域化学在第一次插入处就被固定。代价是总速率变慢，因为高 CO 也会在第 2 步与烯烃争夺空位。
:::
:::
