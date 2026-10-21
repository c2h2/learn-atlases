一个由硫酸铜烧杯、硫酸锌烧杯、两种金属各一条以及一张浸透溶液的滤纸组成的电池，就能点亮一只发光二极管，而且能点亮好几个小时。烧杯里没有任何东西看起来像电池——没有酸雾，没有运动部件——然而电子从锌出发，穿过一根导线，经过二极管，到达铜，驱动它们的不过是两种金属对自己电子的束缚力之差。同一套电子记账法，解释了为什么铁钉在潮湿的角落生锈，为什么船体上要铆上几块锌，为什么你的手机靠锂的化合物而不是锂金属运转，以及为什么黏土是地壳中第五丰富的物质、铝却等到 1886 年才被分离出来。电化学就是在两处同时发生的电子转移的化学，而它的核心量——电极电势——无非是一个物种多么渴望电子的度量，以氢为基准定标，从一张表上读出来。

## 氧化态：电子的记账

::: definition 氧化态 {#def-oxidation-state}
某物质中原子的**氧化态**（氧化数），是假设把每个键都离子性地断开、把成键电子全部分配给电负性较大的对方时，该原子所带的电荷。规则按优先级排列：游离态单质的氧化态为 $0$；单原子离子的氧化态等于其电荷；氟在其所有化合物中为 $-1$；氢与非金属结合时为 $+1$，在金属氢化物（如 $\mathrm{NaH}$）中为 $-1$；氧通常为 $-2$，过氧化物（$-1$，如 $\mathrm{H_2O_2}$）、超氧化物（$-\tfrac{1}{2}$）和氟化物（为正）除外；电中性化学式中各氧化态之和为 $0$，离子中则等于离子电荷。**氧化**是氧化态升高（失去电子），**还原**是氧化态降低（得到电子）；**氧化剂**自身被还原，**还原剂**自身被氧化。
:::

::: example 指定氧化态 {#ex-ox-assign}
给出下列物质中标记元素的氧化态：$\mathrm{Cr_2O_7^{2-}}$（Cr）、$\mathrm{MnO_4^-}$（Mn）、$\mathrm{H_2O_2}$（O）、$\mathrm{Na_2S_2O_3}$（S 的平均值）、$\mathrm{NH_4^+}$（N）。
::: solution
氧为 $-2$，离子中各氧化态之和等于离子电荷，所以对重铬酸根，$2x + 7(-2) = -2$，得 $x = +6$：六价铬，而酸化重铬酸盐的氧化能力，正是它退回 $\mathrm{Cr^{3+}}$ 的倾向。高锰酸根中 $x + 4(-2) = -1$，得 $x = +7$——锰的最高价。过氧化物中 O–O 键连接同种原子，每个氧各保留一对共用电子：$2x + 2(+1) = 0$ 给出 $x = -1$，而不是 $-2$。硫代硫酸根中 $2x + 3(-2) = -2$ 给出*平均*值 $x = +2$；实际上两个硫并不相同（约 $-2$ 与 $+6$——中心硫取代了硫酸根中的一个氧），这是一个警告：平均值会掩盖化学。铵离子中 $x + 4(+1) = +1$，得 $x = -3$：氮的最低价。
:::
:::

氧化态从不会单独改变：一个物种被氧化，必有另一个被还原，失去的电子数必等于得到的电子数。这一句话就是氧化还原化学计量的全部；其余的都是记账。

::: algorithm 配平氧化还原方程式（半反应法） {#alg-balance-redox}
在酸性溶液中：**(1)** 写出被氧化元素和被还原元素的两个半反应，其余一律不管；**(2)** 配平每个半反应中除 O 和 H 以外的原子；**(3)** 加 $\mathrm{H_2O}$ 配平氧；**(4)** 加 $\mathrm{H^+}$ 配平氢；**(5)** 在较正的一边加电子配平电荷；**(6)** 把两个半反应乘以适当倍数使电子相消，然后相加。在碱性溶液中，先完全按酸性配平，然后在两边各加上与现有 $\mathrm{H^+}$ 等量的 $\mathrm{OH^-}$，把每一对 $\mathrm{H^+ + OH^-}$ 化成 $\mathrm{H_2O}$ 并消去水。最后检查原子*和电荷*是否都配平。
:::

::: example 酸性溶液中的配平：高锰酸根与铁(II) {#ex-balance-acid}
配平酸性溶液中的 $\mathrm{MnO_4^- + Fe^{2+} \rightarrow Mn^{2+} + Fe^{3+}}$。
::: solution
还原半反应：Mn 由 $+7 \rightarrow +2$。加水配平氧，$\mathrm{MnO_4^- \rightarrow Mn^{2+} + 4\,H_2O}$；加质子配平氢，$\mathrm{MnO_4^- + 8\,H^+ \rightarrow Mn^{2+} + 4\,H_2O}$；配平电荷（左边 $+7$，右边 $+2$），加五个电子，$\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \rightarrow Mn^{2+} + 4\,H_2O}$。氧化半反应：$\mathrm{Fe^{2+} \rightarrow Fe^{3+} + e^-}$。乘以五后相加：
$$
\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \rightarrow Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}.
$$
检验：左边电荷 $-1 + 10 + 8 = +17$，右边 $+2 + 15 = +17$；所有原子配平。五比一的比值正是高锰酸钾能作铁的自身指示剂滴定液的原因：越过化学计量点的一滴，留下的就是未反应 $\mathrm{MnO_4^-}$ 的粉红色。
:::
:::

::: example 碱性溶液中的配平：高锰酸根还原为二氧化锰 {#ex-balance-base}
配平碱性溶液中的 $\mathrm{MnO_4^- + SO_3^{2-} \rightarrow MnO_2 + SO_4^{2-}}$。
::: solution
先当作酸性溶液配平。还原：$\mathrm{MnO_4^-}$ 到 $\mathrm{MnO_2}$（Mn $+7 \rightarrow +4$）：$\mathrm{MnO_4^- + 4\,H^+ + 3\,e^- \rightarrow MnO_2 + 2\,H_2O}$。氧化：$\mathrm{SO_3^{2-} + H_2O \rightarrow SO_4^{2-} + 2\,H^+ + 2\,e^-}$。电子数：第一个乘 2，第二个乘 3，相加，并把 $6\,\mathrm{H^+}$ 与 $6\,\mathrm{H^+}$ 相消：$\mathrm{2\,MnO_4^- + 3\,SO_3^{2-} + 2\,H^+ \rightarrow 2\,MnO_2 + 3\,SO_4^{2-} + H_2O}$。现在化为碱性：两边各加 $2\,\mathrm{OH^-}$，把 $2\,\mathrm{H^+}$ 吸收成水：
$$
\mathrm{2\,MnO_4^- + 3\,SO_3^{2-} + H_2O \rightarrow 2\,MnO_2 + 3\,SO_4^{2-} + 2\,OH^-}.
$$
检验电荷：左边 $-2 - 6 = -8$，右边 $-6 - 2 = -8$；氧：左边 $8 + 9 + 1 = 18$，右边 $4 + 12 + 2 = 18$。出现棕色的 $\mathrm{MnO_2}$ 沉淀而不是无色的 $\mathrm{Mn^{2+}}$，是一个可见的标志：高锰酸根对电子的食欲取决于质子的供应量——这一点能斯特方程会把它定量化。
:::
:::

::: quiz
在反应 $\mathrm{Cr_2O_7^{2-} + 3\,SO_2 + 2\,H^+ \rightarrow 2\,Cr^{3+} + 3\,SO_4^{2-} + H_2O}$ 中，哪个物种是氧化剂？
- [x] $\mathrm{Cr_2O_7^{2-}}$：铬从 $+6$ 降到 $+3$，重铬酸根得到电子。
- [ ] $\mathrm{SO_2}$：硫被氧化，而被氧化的物质会氧化对方。
- [ ] $\mathrm{H^+}$：它提供反应所需的质子。
- [ ] $\mathrm{Cr^{3+}}$：它是电荷较低的产物。
::: solution
氧化剂是*被还原*的那个物种：铬的氧化态从 $+6$ 降到 $+3$，所以重铬酸根是氧化剂，而 $\mathrm{SO_2}$（S：$+4 \rightarrow +6$）是还原剂。质子两者都不是——它的氧化态从未改变。一个产物不可能是生成它的那个反应的试剂。
:::
:::

## 原电池：把半反应分开

::: definition 原电池、电极与盐桥 {#def-galvanic-cell}
**原电池（伏特电池）**是把一个自发的氧化还原反应拆成在两个彼此分开的**电极**上发生的两个**半反应**的装置，于是电子被迫经过外电路，从而能够做电功。氧化发生在**阳极**（对原电池而言是负极），还原发生在**阴极**（正极）——这个定义对一切电化学电池都成立，无论原电池还是电解池，因为*阳极*的意思就是"发生氧化的电极"。**盐桥**（或多孔隔膜）让离子在两个半池之间迁移而接通电路——阴离子向阳极迁移，阳离子向阴极迁移——同时不让两种溶液混合，因为直接混合会让反应物碰面，把电池短路。
:::

丹尼尔电池用**电池符号**写作

$$
\mathrm{Zn(s)\;|\;Zn^{2+}(aq)\;\|\;Cu^{2+}(aq)\;|\;Cu(s)},
$$

从左到右读：先阳极，后阴极；单竖线是相界面，双竖线是盐桥。按此约定，电池反应总是从左到右写的那个，而测得正电压意味着它按所写的方向自发。

::: definition 标准电极电势 {#def-standard-potential}
每个电极电势都是金属–溶液界面两侧的电势差，而任何伏特计都无法单独读出单个界面——你测到的永远是*一对*。因此**标准氢电极**（SHE）$\mathrm{Pt(s)\;|\;H_2(g,\ 1\ bar)\;|\;H^+(aq,\ 1\ mol\,dm^{-3})}$ 被*规定*为在任何温度下 $E^\circ = 0.00\ \mathrm{V}$，其余一切标准电极电势 $E^\circ$ 都是用所讨论的电极（所有溶质 $1\ \mathrm{mol\,dm^{-3}}$，气体 $1\ \mathrm{bar}$，通常取 $298.15\ \mathrm{K}$）与标准氢电极组成的电池的电压。表列值一律写成**还原**形式：$\mathrm{Cu^{2+} + 2\,e^- \rightarrow Cu}$，$E^\circ = +0.34\ \mathrm{V}$；$\mathrm{Zn^{2+} + 2\,e^- \rightarrow Zn}$，$E^\circ = -0.76\ \mathrm{V}$（标准表列数据）。$E^\circ$ 越正，半反应式左边的氧化剂越强；越负，右边的还原剂越强。
:::

::: proposition 电池电动势 {#prop-cell-potential}
对任何电池，右电极与左电极都按还原书写，则
$$
E^\circ_\mathrm{cell} = E^\circ_\text{阴极} - E^\circ_\text{阳极},
$$
其中表列的*还原*电势原样使用——绝不乘以为配平电子所用的化学计量系数。按所写方向（阴极还原、阳极氧化）的反应，恰在 $E^\circ_\mathrm{cell} > 0$ 时自发。
:::

::: warning 电势是强度量，而"自发"说的是标准态 {#warn-potentials}
一个块里三个陷阱。**第一**，$E^\circ$ 是*强度*量：半反应乘二，电压不乘二，因为电压是*每库仑*的能量，能量和库仑数同时加倍。所以在 $\mathrm{2\,Fe^{3+} + Cu \rightarrow 2\,Fe^{2+} + Cu^{2+}}$ 中，你仍然用 $E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.77\ \mathrm{V}$，而不是 $1.54\ \mathrm{V}$；随系数加倍的是 $\Delta_\mathrm{r}G^\circ$，不是 $E^\circ$。**第二**，$E^\circ_\mathrm{cell} > 0$ 只保证在*标准*态（$1\ \mathrm{mol\,dm^{-3}}$、$1\ \mathrm{bar}$）下自发；一个 $E^\circ_\mathrm{cell} = +0.05\ \mathrm{V}$ 的电池，浓度远离标准态时可能倒转——由能斯特方程裁决。**第三**，"阳极是负的"只对原电池成立：电解池的阳极接电源正极，是正的。不变的规则是定义——阳极是氧化发生之处——而不是符号。
:::

::: example 丹尼尔电池：电压、自由能、平衡常数 {#ex-daniell}
对 $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$，求 $298.15\ \mathrm{K}$ 下的 $E^\circ_\mathrm{cell}$、$\Delta_\mathrm{r}G^\circ$ 与 $K$。（$E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.34\ \mathrm{V}$，$E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.76\ \mathrm{V}$。）
::: solution
阴极减阳极，表列还原电势原样不动：
$$
E^\circ_\mathrm{cell} = (+0.34) - (-0.76) = +1.10\ \mathrm{V}.
$$
每摩尔反应转移两个电子，$n = 2$，于是（下一节证明这个关系）
$$
\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell} = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.10\ \mathrm{V} = -212\ \mathrm{kJ\,mol^{-1}}.
$$
由 $\Delta_\mathrm{r}G^\circ = -RT\ln K$ 及 $25\ ^\circ\mathrm{C}$ 时 $2.303\,RT/F = 0.05916\ \mathrm{V}$，
$$
\log_{10} K = \frac{nE^\circ_\mathrm{cell}}{0.05916\ \mathrm{V}} = \frac{2 \times 1.10}{0.05916} = 37.2,
\qquad K = 1.5\times10^{37}.
$$
仅仅一点一伏，对应的平衡常数却*大得惊人*——这就是为什么这样的置换反应基本进行到底，也是为什么对二电子反应而言，$100\ \mathrm{mV}$ 的电池电压大约值 $K$ 中的十个数量级。
:::
:::

::: history
伏特（Volta）1800 年的电堆——锌片与银片夹着浸盐水的纸板层层堆叠——是第一个持续电流的来源；它的制造者据此主张，这了结了与伽伐尼（Galvani）蛙腿之间的"接触电"之争。法拉第（Faraday）1834 年的电解定律使电子的账目定量化，并给出了电极、离子、阴离子与阳离子这些词汇。丹尼尔（Daniell）1836 年的电池用从溶液中镀出的铜阴极取代了伏特电堆中会极化的氢，成为驱动电报线路的标准电池；电学单位制中的标准电池长期由它的变体定义。能斯特（Nernst）1889 年的方程诞生于他对溶液平衡的研究，把电压与浓度联系起来，使电池成为一种化学分析。氢电极约定固定了任何实验都测不出的零点，而电动序——你据以读出自发性的那张表——正是这一切的实践遗存。
:::

## 自由能、电势与平衡

::: proposition 电功与电池电动势 {#prop-dg-nfe}
对每摩尔反应转移 $n$ 摩尔电子、电池电动势为 $E_\mathrm{cell}$ 的电池反应，
$$
\Delta_\mathrm{r}G = -\,nF E_\mathrm{cell},
$$
其标准态形式为 $\Delta_\mathrm{r}G^\circ = -nF E^\circ_\mathrm{cell}$。正的电池电动势意味着负的吉布斯自由能变：反应自发，电池能够对外做功。
:::

::: proof 为什么 $\Delta_\mathrm{r}G = -nFE$ {#proof-dg-nfe}
在恒温恒压下，吉布斯自由能变等于过程所能提供的最大非膨胀功，$\Delta_\mathrm{r}G = w_\text{最大非体积}$。电功是电荷乘以电势差。一摩尔反应移动 $n$ 摩尔电子，即 $nN_\mathrm{A}e = nF$ 库仑的电荷，经过电势差 $E_\mathrm{cell}$；于是对环境做的功为 $nFE_\mathrm{cell}$，而系统*对外*做功是其吉布斯自由能的减少：$\Delta_\mathrm{r}G = -nFE_\mathrm{cell}$。符号读起来是对的：电池把电子"顺坡"推过导线（$E_\mathrm{cell} > 0$），自身自由能下降。它也解释了为什么 $E$ 是强度量：电池缩小一半，移动的电荷与自由能变同时减半，比值 $E = -\Delta_\mathrm{r}G/nF$ 保持不变。
:::

::: proposition 能斯特方程 {#prop-nernst}
对反应商为 $Q$ 的电池反应，在 $298.15\ \mathrm{K}$ 时，
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{nF}\ln Q
= E^\circ_\mathrm{cell} - \frac{0.05916\ \mathrm{V}}{n}\log_{10} Q.
$$
同一关系用于单个半反应，就给出它在非标准浓度下的电极电势。产物积累，电势下降；平衡时 $Q = K$ 且 $E_\mathrm{cell} = 0$——没电的电池，就是一个处于平衡的反应混合物。
:::

::: proof 能斯特方程 {#proof-nernst}
从前一章热力学的等温式出发，$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$，代入上一条命题的 $\Delta_\mathrm{r}G = -nFE_\mathrm{cell}$ 与 $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$：
$$
-nFE_\mathrm{cell} = -nFE^\circ_\mathrm{cell} + RT\ln Q.
$$
两边除以 $-nF$：
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{nF}\ln Q.
$$
在 $298.15\ \mathrm{K}$，$2.303\,RT/F = 2.303 \times 8.314 \times 298.15 / 96\,485 = 0.05916\ \mathrm{V}$，即得实用形式。在平衡时令 $E_\mathrm{cell} = 0$，得 $E^\circ_\mathrm{cell} = (0.05916/n)\log_{10} K$，这是电势表与平衡常数表之间的桥。
:::

::: widget plot
f: 0.77 + 0.05916*x/n
sliders: n=1:1:4:1
x: -4, 4
y: 0.5, 1.1
labels: \text{电极电势 } E
caption: $\mathrm{Fe^{3+}/Fe^{2+}}$ 电极的能斯特直线，$E = E^\circ + (0.05916/n)\log_{10}\left([\mathrm{Ox}]/[\mathrm{Red}]\right)$，对 $x = \log_{10}\left([\mathrm{Ox}]/[\mathrm{Red}]\right)$ 作图，电子数 $n$ 由滑块设定（从 $n = 1$ 的铁电对开始）。氧化态与还原态等量时电势为 $E^\circ = 0.77\ \mathrm{V}$；$n = 1$ 时氧化型每过量一个数量级，电势上升 $59\ \mathrm{mV}$，其他 $n$ 值则为 $59/n\ \mathrm{mV}$：直线越陡，每个电子要干的活越少。这条直线就是电位滴定曲线在化学计量点处跳变的原因——一滴之间，比值 $[\mathrm{Ox}]/[\mathrm{Red}]$ 扫过好几个数量级。
:::

::: example 偏离标准态的丹尼尔电池 {#ex-nernst-daniell}
一个丹尼尔电池在 $25\ ^\circ\mathrm{C}$ 时 $[\mathrm{Zn^{2+}}] = 0.10\ \mathrm{mol\,dm^{-3}}$、$[\mathrm{Cu^{2+}}] = 1.0\ \mathrm{mol\,dm^{-3}}$。求 $E_\mathrm{cell}$。
::: solution
反应商不含固体：$Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}] = 0.10$。取 $n = 2$，
$$
E_\mathrm{cell} = 1.10\ \mathrm{V} - \frac{0.05916\ \mathrm{V}}{2}\log_{10}(0.10)
= 1.10 + 0.0296 = +1.13\ \mathrm{V}.
$$
产物离子稀释十倍，电压抬高 $30\ \mathrm{mV}$：这是以伏特表达的勒夏特列原理。让电池放电，$[\mathrm{Zn^{2+}}]$ 升高而 $[\mathrm{Cu^{2+}}]$ 下降，$Q$ 向 $K = 1.5\times10^{37}$ 生长，电压一路滑向零——这就是为什么没电的电池在负载下只有一伏上下，也是为什么电池的"容量"取决于里面存了多少材料，而不是电压有多强。
:::
:::

::: example 酸如何让高锰酸根变强 {#ex-nernst-mno4}
对 $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \rightarrow Mn^{2+} + 4\,H_2O}$，$E^\circ = +1.51\ \mathrm{V}$。求 $\mathrm{pH}\ 7$、$[\mathrm{MnO_4^-}] = [\mathrm{Mn^{2+}}] = 10^{-3}\ \mathrm{mol\,dm^{-3}}$ 时的电极电势，并解释其中的化学。
::: solution
$Q = [\mathrm{Mn^{2+}}]/\left([\mathrm{MnO_4^-}][\mathrm{H^+}]^{8}\right)$；金属离子之比为 $1$，故 $\log_{10} Q = -\log_{10}[\mathrm{H^+}]^{8} = 8 \times 7 = 56$，于是
$$
E = 1.51\ \mathrm{V} - \frac{0.05916\ \mathrm{V}}{5} \times 56 = 1.51 - 0.66 = +0.85\ \mathrm{V}.
$$
每个锰带八个质子，使电势每升高一个 pH 单位就下降 $8 \times 59/5 \approx 95\ \mathrm{mV}$：高锰酸根在酸中是凶猛的氧化剂，在碱中则是温和的氧化剂，后者止步于 $\mathrm{MnO_2}$ 而不是 $\mathrm{Mn^{2+}}$——正是前面两个配平例题用到的差别。同样的质子杠杆，也是酸雨能把铁和锰从土壤中活化出来的原因：低 pH 下它们的氧化态形式在热力学上变得可以到达。
:::
:::

::: example 浓差电池：仅凭稀释产生的电压 {#ex-conc-cell}
两根铜电极分别插入 $1.0$ 与 $0.010\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{CuSO_4}$ 溶液，以盐桥相连。求电压，并指出哪个电极是阴极。电池放电时会发生什么？
::: solution
电极相同，故 $E^\circ_\mathrm{cell} = 0$；整个电压都是熵性的。电池沿使两种溶液混合的方向运行——铜溶入稀的一侧，使其成为阳极；从浓的一侧析出，使其成为阴极：
$$
E_\mathrm{cell} = 0 - \frac{0.05916\ \mathrm{V}}{2}\log_{10}\frac{[\mathrm{Cu^{2+}}]_\text{稀侧产物}}{[\mathrm{Cu^{2+}}]_\text{阴极}}
= -\frac{0.05916}{2}\log_{10}\frac{0.010}{1.0} = +0.059\ \mathrm{V}.
$$
电池运行时，铜溶入稀侧、从浓侧析出，直到两侧浓度相同、$E = 0$：电池把稀释的自由能转化为功，$n = 2$ 时一百倍的浓度比值五十九毫伏。pH 计正是这个装置换成质子：两个氢电极看到不同 $[\mathrm{H^+}]$ 的电池给出 $E = 0.05916 \times \Delta\mathrm{pH}$，这就是为什么 pH 计用标准缓冲溶液校准、而不是从第一性原理计算。
:::
:::

::: widget plot
f: (0.05916/2)*log10(x)
x: 0.001, 1000
y: -0.1, 0.1
labels: \text{浓差电池电压}
caption: 铜浓差电池的电压 $E = (0.05916/2)\log_{10}\left([\mathrm{Cu^{2+}}]_\text{浓}/[\mathrm{Cu^{2+}}]_\text{稀}\right)$，对两个半池浓度之比作图。曲线在浓度相等处过零——没有浓度比，就没有电压——且是对数的，所以每十倍的不平衡都值同样的 $29.6\ \mathrm{mV}$。同一个对数使电池成为*浓度计*：测出 $E$，读出浓度比。活细胞靠膜两侧 $\mathrm{K^+}$ 与 $\mathrm{Na^+}$ 的浓差运行，而神经冲动正是这种电势的一次快速的、受调控的改变。
:::

## 电解：把反应推上坡

::: definition 电解池 {#def-electrolysis}
**电解池**靠外加一个大于电池自身（反向）电动势的电压，迫使一个非自发的氧化还原反应进行：$E_\text{外加} > E_\mathrm{cell}$。电子被*泵入*接电源负极的电极，使它成为还原发生之处——按普适定义即阴极——并从另一极抽出电子，该极即阳极，氧化在此发生。分解电压从不到达热力学下限：真实的电池还需要额外的**超电势**——尤其在 $\mathrm{H_2}$、$\mathrm{O_2}$ 等气体在金属电极上析出时——才能以有用的速率驱动界面各步。
:::

::: example 氯化钠电解到底给出什么 {#ex-electrolysis-products}
预测 (a) *熔融* $\mathrm{NaCl}$ 与 (b) *浓的* $\mathrm{NaCl}$ 水溶液在惰性电极间电解的产物。（$E^\circ(\mathrm{Na^+/Na}) = -2.71\ \mathrm{V}$，$E^\circ(\mathrm{Cl_2/Cl^-}) = +1.36\ \mathrm{V}$，$E^\circ(\mathrm{O_2/H_2O}) = +1.23\ \mathrm{V}$；$\mathrm{pH}\ 7$ 时 $\mathrm{O_2}$ 电对约在 $+0.82\ \mathrm{V}$，氢电对约在 $-0.41\ \mathrm{V}$。）
::: solution
(a) 熔融盐只提供 $\mathrm{Na^+}$ 与 $\mathrm{Cl^-}$：阴极得钠金属，阳极得氯气；热力学下限为 $2.71 + 1.36 = 4.07\ \mathrm{V}$（工业槽温度更高、且因熵项电压更低——教科书层面）。(b) 在水溶液中，四种物种竞争。阴极上，$\mathrm{Na^+}$（$-2.71\ \mathrm{V}$）竞争不过水的还原生成 $\mathrm{H_2}$（$\mathrm{pH}\ 7$ 时约 $-0.41\ \mathrm{V}$）：析出的是氢气，不是钠。阳极上，按表列值竞争很接近——水生成 $\mathrm{O_2}$（$+1.23\ \mathrm{V}$）对氯离子生成 $\mathrm{Cl_2}$（$+1.36\ \mathrm{V}$）——单凭热力学会预测氧气；但氧的析出在许多电极上带有很大的超电势，而氯在浓盐水中相对容易生成，所以工业**氯碱**槽在阳极收集 $\mathrm{Cl_2}$、阴极收集 $\mathrm{H_2}$，溶液里留下 $\mathrm{NaOH}$。这条教训可以推广：电解产物由电势*和*超电势共同决定，超电势那一栏与表列值一样真实。
:::
:::

::: proposition 法拉第电解定律 {#prop-faraday}
在电极上转化的物质量与通过电池的电荷成正比，并按每摩尔该物质所带电子的摩尔数计量：
$$
n(\text{元素}) = \frac{It}{zF},
\qquad
m = \frac{ItM}{zF},
$$
其中 $I$ 为电流，$t$ 为时间，$z$ 为每个原子对应的电子数（电荷数：$\mathrm{Ag^+}$ 为 $1$，$\mathrm{Cu^{2+}}$ 为 $2$，$\mathrm{Al^{3+}}$ 为 $3$），$M$ 为摩尔质量。
:::

::: proof 法拉第定律 {#proof-faraday}
电流是单位时间的电荷，所以电流 $I$ 流过 $t$ 时间输送电荷 $Q = It$ 库仑。一库仑是 $1/F$ 摩尔电子，故送入的电子为 $It/F$ 摩尔。每个被沉积的原子消耗 $z$ 个电子，所以沉积量为 $It/(zF)$ 摩尔，乘以 $M$ 即得质量。整个论证没有提到电压、温度或浓度：法拉第定律是精确的账目，实践中的限制只来自副反应和**电流效率**——即做了目标化学的那部分电流。这里的 $F$ 与 $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$ 中的是同一个 $F$：电子的电荷，是这门学科中化学账本与电学账本之间的换算率。
:::

::: example 由测得的电流算镀铜 {#ex-faraday-cu}
以 $0.500\ \mathrm{A}$ 的电流通过硫酸铜电解池 $30.0\ \mathrm{min}$。假设效率 $100\ \%$，析出多少克铜？
::: solution
$Q = It = 0.500\ \mathrm{A} \times 1800\ \mathrm{s} = 900\ \mathrm{C}$。取 $z = 2$：
$$
n(\mathrm{Cu}) = \frac{900\ \mathrm{C}}{2 \times 96\,485\ \mathrm{C\,mol^{-1}}} = 4.66\times10^{-3}\ \mathrm{mol},
\qquad
m = 4.66\times10^{-3} \times 63.55 = 0.296\ \mathrm{g}.
$$
一法拉第，$96\,485\ \mathrm{C}$，是一笔很大的电荷——相当于一只手电筒灯泡点亮一天半——所以安培级电流电镀几小时只搬运几克：这是体会"摩尔是个大数、电子电荷是个小数"的又一种方式。
:::
:::

::: warning 电解由动力学与热力学共同裁决 {#warn-discharge}
只凭表列 $E^\circ$ 预测放电顺序，只在候选者电势相差悬殊且不涉及气体时才成立。超电势会重排接近的竞争（盐水中氯先于氧；在汞和铅电极上，氢先于许多金属析出）。浓度按能斯特方程移动表列值——$n = 1$ 时每十倍 $59\ \mathrm{mV}$——所以"哪种金属先镀出"取决于每种还剩多少：$\mathrm{Cu^{2+}}$ 与 $\mathrm{Zn^{2+}}$ 的混合液先镀铜，而锌开始析出时，剩余的铜不足原有的 $10^{-37}$，这就是电解精炼能把铜提纯到 $99.99\ \%$ 以上的原因。而水溶液化学又悄悄地把水本身加进两个电极的候选名单。请把表当作预测的第一稿，永远不是终稿。
:::

## 腐蚀、电池与电子的去向

腐蚀是一个导线被藏起来的原电池。一滴水落在铁上，溶进氧气和二氧化碳，铁表面就成了无数微电极的拼贴：在阳极区铁被氧化，$\mathrm{Fe \rightarrow Fe^{2+} + 2\,e^-}$（$E^\circ = -0.44\ \mathrm{V}$），电子沿金属流到阴极区，在那里溶解氧被还原，$\mathrm{O_2 + 2\,H_2O + 4\,e^- \rightarrow 4\,OH^-}$——这个电池的开路电压接近 $1.7\ \mathrm{V}$。$\mathrm{Fe^{2+}}$ 与 $\mathrm{OH^-}$ 相遇、进一步氧化，以水合 $\mathrm{Fe_2O_3}$ 的形式回来：铁锈。铁锈多孔，什么也保护不了，任由电池运转直到铁钉消失。盐靠让电解质导电加速腐蚀；酸靠向阴极反应供应质子。防护顺着电池图来：**牺牲阳极保护**把电势更负的金属——锌 $-0.76\ \mathrm{V}$，或镁 $-2.37\ \mathrm{V}$——铆在结构上，让铆块成为阳极、替铁腐蚀；**阴极保护**用电源做同样的事，迫使整个结构成为阴极。船体、码头和埋地管道都靠这种方法保护，而你每隔几年更换的"牺牲阳极块"，干的正是它的名字所说的那份电化学工作。

电池是被工程化以维持电压的同一类电池。**一次电池**把一个反应进行到底（碱性电池：锌与 $\mathrm{MnO_2}$）；**二次电池**可以靠充电倒推——铅酸电池，$\mathrm{Pb + PbO_2 + 2\,H_2SO_4 \rightarrow 2\,PbSO_4 + 2\,H_2O}$，每格 $E^\circ_\mathrm{cell} \approx 2.05\ \mathrm{V}$，汽车引擎盖下是六格串联；**燃料电池**永不"耗尽"，因为反应物从外部输入，氢氧电池原理上 $E^\circ = 1.23\ \mathrm{V}$，实际约 $0.7\ \mathrm{V}$，差额作为超电势和热付出。锂统治便携能源，因为 $E^\circ(\mathrm{Li^+/Li}) \approx -3.04\ \mathrm{V}$ 是一切实用电对中最负的电势，而锂又是最轻的金属——决定手机电池的是每克的伏特数，不是每摩尔的伏特数；锂离子电池中锂从不是金属，而是在石墨与金属氧化物之间穿梭的离子，这就是它能安全地放进口袋的原因。铝迟到 1886 年才问世，是同一笔算术：$E^\circ(\mathrm{Al^{3+}/Al}) = -1.66\ \mathrm{V}$ 意味着没有便宜的化学还原剂能胜任，铝只能等待充足的电力——霍尔-埃鲁法是工业规模的电化学，至今仍消耗世界发电量的百分之几。

## 后续内容

本章使用的电池电势与平衡之间的联系，就是 [[general-chemistry-2/entropy-free-energy]] 的吉布斯自由能换成伏特来读，其中包含的反应商则是在 [[general-chemistry-2/chemical-equilibrium]] 中建立的那个；电子赖以游动的溶液的离子强度与电导，见 [[general-chemistry-1/solutions-reactions]]。图谱在 [[electrochemistry/cell-thermodynamics]]（电极的完整热力学）、[[electrochemistry/batteries]] 与 [[electrochemistry/fuel-cells-electrolysis]]（上面勾勒的电池的工程学）、[[electrochemistry/corrosion]]（锈蚀问题的深入讨论）以及 [[electrochemistry/conductivity]]（电解质如何导电）中继续这门学科。

::: summary
- 氧化态是电子的记账；氧化与还原总是同时发生，半反应配平让电子相消——酸性溶液用 $\mathrm{H^+}$ 和 $\mathrm{H_2O}$，碱性溶液先按酸性配平再中和。
- 原电池把两个半反应分开，让电子走导线；阳极是氧化发生之处（原电池中为负，电解池中为正），盐桥搬运的是离子而不是电子。
- 电极电势是以标准氢电极（$E^\circ \equiv 0$）为基准的还原电势；$E^\circ_\mathrm{cell} = E^\circ_\text{阴极} - E^\circ_\text{阳极}$，表列值绝不乘以系数——$E$ 是强度量。
- $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$：每摩尔电子 $100\ \mathrm{mV}$ 的标准电池电压约值 $19\ \mathrm{kJ\,mol^{-1}}$，对 $n = 2$ 约值 $K$ 中的十个数量级。
- 能斯特方程 $E = E^\circ - (0.05916/n)\log_{10} Q$ 给出偏离标准态的电压：每 pH 单位乘（质子数/电子数）$59\ \mathrm{mV}$、浓差电池，以及"没电的电池是平衡混合物"的原因。
- 电解把反应推上坡：产物由电势*和*超电势决定，而法拉第定律 $m = ItM/zF$ 是精确的电荷账目。
- 腐蚀是短路的原电池；牺牲阳极保护与阴极保护靠做更易被氧化的那一方取胜。
:::

## 练习

::: exercise 氧化态 {level=1}
给出下列各物质中划线元素的氧化态：$\mathrm{\underline{N}O_2}$、$\mathrm{K\underline{Mn}O_4}$、$\mathrm{\underline{Cl}_2O}$、$\mathrm{Fe(\underline{CN})_6^{3-}}$（Fe）、$\mathrm{\underline{H}NO_3}$。
::: solution
$\mathrm{NO_2}$：$x + 2(-2) = 0$，N 为 $+4$。$\mathrm{KMnO_4}$：K 为 $+1$、O 为 $-2$，故 Mn 为 $+7$。$\mathrm{Cl_2O}$：O 为 $-2$（氧只在氟面前认输），故每个 Cl 为 $+1$。$\mathrm{Fe(CN)_6^{3-}}$：每个 $\mathrm{CN^-}$ 为 $-1$，故 Fe 为 $+3$。$\mathrm{HNO_3}$：H 为 $+1$、O 为 $-2$，故 N 为 $+5$。
:::
:::

::: exercise 电池电压 {level=1 check="0.46"}
以银电极插入 $\mathrm{Ag^+}$ 溶液、铜电极插入 $\mathrm{Cu^{2+}}$ 溶液组成电池。求自发反应的标准电池电压。（$E^\circ(\mathrm{Ag^+/Ag}) = +0.80\ \mathrm{V}$，$E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.34\ \mathrm{V}$。）以 V 输入 $E^\circ_\mathrm{cell}$。
::: solution
银的电势更正，故银被还原（阴极），铜被氧化：$E^\circ_\mathrm{cell} = 0.80 - 0.34 = 0.46\ \mathrm{V}$。反应为 $\mathrm{Cu + 2\,Ag^+ \rightarrow Cu^{2+} + 2\,Ag}$；注意银的半反应乘了二，其电势却没有乘。
:::
:::

::: exercise 酸性溶液配平 {level=1}
配平酸性溶液中的 $\mathrm{Cr_2O_7^{2-} + I^- \rightarrow Cr^{3+} + I_2}$。
::: solution
还原：$\mathrm{Cr_2O_7^{2-} + 14\,H^+ + 6\,e^- \rightarrow 2\,Cr^{3+} + 7\,H_2O}$（Cr $+6 \rightarrow +3$，两个铬，六个电子）。氧化：$\mathrm{2\,I^- \rightarrow I_2 + 2\,e^-}$，乘三。相加：
$$
\mathrm{Cr_2O_7^{2-} + 6\,I^- + 14\,H^+ \rightarrow 2\,Cr^{3+} + 3\,I_2 + 7\,H_2O}.
$$
电荷检验：左边 $-2 - 6 + 14 = +6$，右边 $+6$。
:::
:::

::: exercise 丹尼尔电池的能斯特方程 {level=2 check="1.13"}
一个丹尼尔电池在 $25\ ^\circ\mathrm{C}$ 时 $[\mathrm{Zn^{2+}}] = 0.010\ \mathrm{mol\,dm^{-3}}$、$[\mathrm{Cu^{2+}}] = 1.0\ \mathrm{mol\,dm^{-3}}$。求 $E_\mathrm{cell}$。（$E^\circ_\mathrm{cell} = 1.10\ \mathrm{V}$。）以 V 输入 $E_\mathrm{cell}$。
::: solution
$Q = 0.010$，$n = 2$：$E = 1.10 - (0.05916/2)\log_{10}(0.010) = 1.10 + 0.0592 = 1.13\ \mathrm{V}$。产物离子每稀释十倍加 $29.6\ \mathrm{mV}$；电池对浓度的感受是对数的。
:::
:::

::: exercise 由电压到平衡 {level=2 check="7.8"}
对 $\mathrm{2\,Fe^{3+} + 2\,I^- \rightarrow 2\,Fe^{2+} + I_2}$，求 $25\ ^\circ\mathrm{C}$ 下的 $\Delta_\mathrm{r}G^\circ$ 与 $\log_{10} K$。（$E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.77\ \mathrm{V}$，$E^\circ(\mathrm{I_2/I^-}) = +0.54\ \mathrm{V}$。）输入 $\log_{10} K$。
::: solution
$E^\circ_\mathrm{cell} = 0.77 - 0.54 = 0.23\ \mathrm{V}$，$n = 2$：
$$
\Delta_\mathrm{r}G^\circ = -2 \times 96\,485 \times 0.23 = -44\ \mathrm{kJ\,mol^{-1}},
\qquad
\log_{10} K = \frac{2 \times 0.23}{0.05916} = 7.8.
$$
$K \approx 6\times10^{7}$：碘离子与铁(III)的反应基本进行到底，这就是为什么铁(III)溶液不能与碘化物共存——在碘量法滴定中是个麻烦，在每一条输送加碘水的锈蚀管道上是个事实。
:::
:::

::: exercise 电荷与质量 {level=2 check="0.296"}
以 $0.500\ \mathrm{A}$ 通过 $\mathrm{CuSO_4}$ 电解池 $30.0\ \mathrm{min}$，电流效率 $100\ \%$，析出多少克铜？（$M(\mathrm{Cu}) = 63.55\ \mathrm{g\,mol^{-1}}$。）以 g 输入质量。
::: solution
$m = ItM/(zF) = (0.500 \times 1800 \times 63.55)/(2 \times 96\,485) = 0.296\ \mathrm{g}$。电流或时间减半，质量减半——法拉第定律是线性的，而这种线性正是库仑法能成为绝对分析方法的根据。
:::
:::

::: exercise 置换有多完全？ {level=3}
向 $1.0\ \mathrm{dm^3}$、$1.0\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{Cu^{2+}}$ 中加入过量锌粒。对 $\mathrm{Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu}$ 取 $E^\circ_\mathrm{cell} = 1.10\ \mathrm{V}$，求平衡时剩余的 $\mathrm{Cu^{2+}}$ 浓度，并评论这个反应是否"完全"。
::: solution
$\log_{10} K = 2 \times 1.10/0.05916 = 37.2$，故 $K = 1.5\times10^{37} = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$。反应几乎恰好把 $1.0\ \mathrm{mol}$ 的 $\mathrm{Cu^{2+}}$ 转入溶液成为 $\mathrm{Zn^{2+}}$，所以 $[\mathrm{Zn^{2+}}] \approx 1.0\ \mathrm{mol\,dm^{-3}}$，而
$$
[\mathrm{Cu^{2+}}] = \frac{1.0}{1.5\times10^{37}} = 6.6\times10^{-38}\ \mathrm{mol\,dm^{-3}}.
$$
这比世界大洋总体积的水里还不足一个离子——"完全"二字不是夸张而是轻描淡写。注意这个数的操作含义：任何分析方法都测不出剩余的铜，然而热力学上它不是零。平衡常数不禁止反应；它们给反应定价，而 $10^{37}$ 是任何实际浓度都付不起的价格。
:::
:::

::: exercise 测量 pH 的电池 {level=3 check="2.00"}
以两个 $1\ \mathrm{bar}$ 下的氢电极组成电池：一个在 $\mathrm{pH}\ 0$ 的溶液中，另一个在未知溶液中。$25\ ^\circ\mathrm{C}$ 时测得电压 $0.118\ \mathrm{V}$，未知液一侧为阳极。求其 pH。
::: solution
对电池 $\mathrm{Pt,H_2}\,|\,\mathrm{H^+}(\text{未知液})\,\|\,\mathrm{H^+}(1.0)\,|\,\mathrm{H_2},\mathrm{Pt}$，总反应为 $\mathrm{H^+}(1.0\ \mathrm{M}) \rightarrow \mathrm{H^+}(\text{未知液})$，$n = 1$、$E^\circ = 0$：
$$
E = -\frac{0.05916}{1}\log_{10}\frac{[\mathrm{H^+}]_\text{未知液}}{1.0} = 0.05916 \times \mathrm{pH}.
$$
故 $\mathrm{pH} = 0.118/0.05916 = 2.00$。未知液是阳极，因为*稀*酸一侧被氧化——氢气在那里溶入以提高其质子浓度，这是浓差电池放之四海而皆准的方向。这就是每一台电位法 pH 计的工作原理，也是为什么仪器读的是电压、经校准才报出 pH。
:::
:::

::: exercise 有损耗的镀银 {level=3 check="2.0"}
一个镀银槽以 $0.75\ \mathrm{A}$ 运行 $45.0\ \mathrm{min}$。银沉积的电流效率为 $89\ \%$（其余电流析出氢）。沉积多少克银？（$M(\mathrm{Ag}) = 107.87\ \mathrm{g\,mol^{-1}}$，$z = 1$。）以 g 输入质量。
::: solution
$Q = 0.75 \times 2700 = 2025\ \mathrm{C}$；电子总量 $= 2025/96\,485 = 0.0210\ \mathrm{mol}$。按 $89\ \%$ 效率，$0.0187\ \mathrm{mol}$ 用于镀银：
$$
m = 0.89 \times \frac{2025 \times 107.87}{96\,485} = 2.0\ \mathrm{g}.
$$
理论上限是 $2.26\ \mathrm{g}$；$0.25\ \mathrm{g}$ 的差额是氢，是浪费的电流——如果镀液是酸性的，还是一句安全提示：阴极在生成可燃气体，所以电镀车间要通风并严禁明火。电流效率是把法拉第的精确账目与你真正称到的质量分开的那道实际修正。
:::
:::
