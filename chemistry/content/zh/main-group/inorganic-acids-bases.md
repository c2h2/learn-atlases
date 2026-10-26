本课程中的每一个反应，归根结底不是酸碱反应就是氧化还原反应，而这句话的前半句所承担的分量比多数学生预想的要大。本章分三层构建无机化学家的酸碱工具：布朗斯特理论，从[[general-chemistry-2/acids-bases]]中的水溶液酸推广到整个周期表的含氧酸与氧化物；路易斯理论，它把电子对给予变成描述加合物、桥与催化的通用语言；以及皮尔逊的软硬原理，这条选择性规则告诉你一个酸会选择**哪一个**碱。一路上我们将离开水——液氨、无水氟化氢和超酸表明，“酸”与“碱”是溶剂体系的性质，而不是物质的性质。统一的思想是两个尺度上的静电作用：电荷密度（硬）对极化率（软），以及挂在OH上的吸电子基团的数目。

## 含氧酸：鲍林规则

::: definition 含氧酸的结构与记法 {#def-oxoacid}
元素$E$的**含氧酸**记作$\mathrm{O_pE(OH)_q}$：$p$个端基（类似双键的）氧和$q$个羟基，例如$\mathrm{HOCl}$（$p = 0$，$q = 1$），亚氯酸$\mathrm{HOClO}$（$p = 1$，$q = 1$），氯酸$\mathrm{HOClO_2}$（$p = 2$，$q = 1$），高氯酸$\mathrm{HOClO_3}$（$p = 3$，$q = 1$），硫酸$\mathrm{(HO)_2SO_2}$（$p = 2$，$q = 2$）。只有$\mathrm{O{-}H}$上的质子是酸性的：直接与中心原子相连的质子（$\mathrm{H_3PO_3}$即$\mathrm{HP(O)(OH)_2}$中$\mathrm{P{-}H}$上的氢）在水中不电离，因为C–H和P–H键极性弱，其共轭碱得不到稳定化。
:::

::: proposition 含氧酸强度的鲍林规则 {#prop-pauling-rules}
对于含氧酸$\mathrm{O_pE(OH)_q}$，逐级酸解离常数在有用的精度内满足
$$
\mathrm{p}K_\mathrm{a1} \approx 8 - 5p, \qquad \mathrm{p}K_\mathrm{a(n+1)} \approx \mathrm{p}K_\mathrm{an} + 5 .
$$
每个端基$\mathrm{E{=}O}$基团通过诱导效应吸引电子密度，使$\mathrm{O{-}H}$键极化，并且——决定性地——把共轭碱的负电荷分散到更多的氧上；每多一级电离都必须生成多带一个单位电荷的阴离子，这要付出约五个$\mathrm{p}K_\mathrm{a}$单位的代价。这些规则是经验性的，而且行之有效：$\mathrm{HNO_2}$（$p = 1$；预测3，观测3.3），$\mathrm{H_3PO_4}$（$p = 1$；3，观测2.15），$\mathrm{H_2SO_4}$（$p = 2$；$-2$，观测约$-3$），$\mathrm{HClO_4}$（$p = 3$；$-7$，完全解离）。
:::

::: widget plot
f: 8 - 5*x
x: -0.5, 3.5
y: -12, 10
points: 0,7.5; 1,2.0; 2,-1; 3,-10
labels: \text{鲍林：} pK_{a1} = 8 - 5p
caption: 氯的含氧酸的第一$\mathrm{p}K_\mathrm{a}$随端基氧数$p$的变化：直线为鲍林规则$8 - 5p$（因此$p = 2$时为$-2$，$p = 3$时为$-7$），各点为观测值或估计值（$\mathrm{HOCl}\ 7.5$，$\mathrm{HClO_2}\ 2.0$，$\mathrm{HClO_3}$约$-1$，$\mathrm{HClO_4}$约$-10$）。该规则在$p = 0$和$1$处极好。氯酸位于直线**上方**约一个单位（比预测略弱），高氯酸位于直线下方约三个单位（更强）。两种强酸的数值是估计值，因为两者在水中都完全解离，无法在水中直接测量；这条规则在测量最容易的地方——弱酸和中强酸——最有用。
:::

::: example 氯的阶梯 {#ex-chlorine-oxoacids}
把$\mathrm{HOCl}$、$\mathrm{HClO_2}$、$\mathrm{HClO_3}$、$\mathrm{HClO_4}$按酸性强弱排序，并利用结构各用一句话解释这一顺序。
::: solution
$\mathrm{HOCl} < \mathrm{HClO_2} < \mathrm{HClO_3} < \mathrm{HClO_4}$，$\mathrm{p}K_\mathrm{a}$分别为$7.5,\ 2.0$，其余两种酸完全解离。$\mathrm{HOCl}$即$\mathrm{HO{-}Cl}$：其共轭碱$\mathrm{OCl^-}$把电荷定域在一个氧上。加到氯上的每个端基$\mathrm{E{=}O}$基团都是一个吸电子基团，也是一个藏匿电荷的地方：$\mathrm{ClO_2^-}$把电荷分散到两个氧上，$\mathrm{ClO_3^-}$分散到三个，$\mathrm{ClO_4^-}$分散到四个——电荷均摊在四个等价氧上的四面体阴离子几乎没有碱性。这里的酸性就是共轭碱的稳定化，而氧代基团是无机化学最喜爱的稳定剂。
:::
:::

::: widget newton
f: x^2 + 3.0e-8*x - 3.0e-10
method: newton
x0: 0.0001
caption: 用牛顿法求解精确的弱酸方程$x^2 + K_\mathrm{a}x - K_\mathrm{a}c = 0$，求$0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HOCl}$（$K_\mathrm{a} = 3.0\times10^{-8}$）中的$x = [\mathrm{H_3O^+}]$，初值$x_0 = 10^{-4}$。根为$x = 1.7\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pH} = 4.76$：由于$c/K_\mathrm{a} \approx 3\times10^{5}$，平方根估计$\sqrt{K_\mathrm{a}c}$准确到三位有效数字——鲍林规则中最弱的氯含氧酸是一种教科书般完美的弱酸。
:::

::: example 磷的陷阱：哪些质子算数？ {#ex-phosphorus-oxoacids}
酸$\mathrm{H_3PO_4}$、$\mathrm{H_3PO_3}$和$\mathrm{H_3PO_2}$“按化学式都有三个酸性氢”。它们各自实际给出几个质子？近似的$\mathrm{p}K_\mathrm{a1}$值是多少？
::: solution
由结构决定：$\mathrm{(HO)_3PO}$（$p = 1$）是三元酸，$\mathrm{p}K_\mathrm{a}$为$2.15,\ 7.20,\ 12.35$——间隔$5.05$和$5.15$几乎恰好符合鲍林第二规则。$\mathrm{H_3PO_3}$实际上是$\mathrm{HP(O)(OH)_2}$：**二元酸**（$\mathrm{p}K_\mathrm{a}$ $1.3,\ 6.7$），P–H上的氢从不离去。$\mathrm{H_3PO_2}$是$\mathrm{H_2P(O)OH}$：**一元酸**（$\mathrm{p}K_\mathrm{a} \approx 1$）。写成$\mathrm{H}_n\mathrm{EO}_m$的化学式掩盖了连接方式；$\mathrm{O_pE(OH)_q}$则把它显示出来——这就是严谨的无机化学家宁愿写$\mathrm{HP(O)(OH)_2}$而不写$\mathrm{H_3PO_3}$的原因。
:::
:::

::: widget plot
f: 1/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(x - 2.15)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(2*x - 9.35)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(3*x - 21.70)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70))
x: 0, 14
y: 0, 1.05
labels: \mathrm{H_3PO_4}; \mathrm{H_2PO_4^-}; \mathrm{HPO_4^{2-}}; \mathrm{PO_4^{3-}}
caption: 四种磷酸物种的分数随pH（$x$）的变化，由$\mathrm{p}K_\mathrm{a} = 2.15$、$7.20$、$12.35$算得。相邻曲线在分数$0.5$处的每个交点都是一个$\mathrm{p}K_\mathrm{a}$，交点间隔约五个单位——鲍林第二规则一目了然。由于间隔如此之宽，任一pH下至多只有两种物种是重要的，这就是pH 7附近的磷酸盐缓冲溶液可以当作简单的$\mathrm{H_2PO_4^-}/\mathrm{HPO_4^{2-}}$对来处理的原因。像$\mathrm{HP(O)(OH)_2}$这样的二元酸只会显示三条曲线：$\mathrm{P{-}H}$上的氢从不脱去。
:::

::: warning 规则的两个著名例外 {#warn-oxoacid-exceptions}
第一，碳酸：$\mathrm{H_2CO_3}$即$\mathrm{O_1C(OH)_2}$，$p = 1$，预测$\mathrm{p}K_\mathrm{a} \approx 3$——而表列值为6.35。症结在于，溶解的“$\mathrm{CO_2(aq)}$”约99.8 %是真正的$\mathrm{CO_2}$，只有约0.2 %是$\mathrm{H_2CO_3}$：水合比$[\mathrm{H_2CO_3}]/[\mathrm{CO_2}] \approx 1.7\times10^{-3}$，表观常数等于真实常数乘以这个小分数，所以该分子**真实的**$\mathrm{p}K_\mathrm{a}$约为3.6（[[#exr-carbonic]]；鲍林得到证实），而混合物的**表观**常数为6.35。第二，硼酸：$\mathrm{B(OH)_3}$，$p = 0$，预测为8——实测9.24，相当接近，但原因不同：它根本不是布朗斯特酸，而是**路易斯酸**，$\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$，因为硼的八隅不完整而接受氢氧根。规则是指引；结构才是法则。
:::

## 二元氢化物、氢卤酸与水的离去

同族向下，二元酸的强度大体随键强的下降而增大：$\mathrm{HF} < \mathrm{HCl} < \mathrm{HBr} < \mathrm{HI}$（$\mathrm{p}K_\mathrm{a}$ $3.2,\ -6,\ -9,\ -10$），因为$\mathrm{H{-}E}$键变弱（$567, 431, 366, 299\ \mathrm{kJ\,mol^{-1}}$），阴离子变大并分散电荷。同周期中则由极性支配：$\mathrm{CH_4} \ll \mathrm{NH_3} < \mathrm{H_2O} < \mathrm{HF}$。需要能够解释的反常是HF在强氢卤酸中的弱。

::: example 氢氟酸为什么是弱酸 {#ex-hf-weak}
$\mathrm{H{-}F}$是卤化氢中极性最强的——那么为什么HF是唯一在水中呈弱酸性的？利用$298\ \mathrm{K}$下的标准热力学数据（$\Delta_\mathrm{f}H^\circ$、$\Delta_\mathrm{f}G^\circ$，单位$\mathrm{kJ\,mol^{-1}}$；按约定$\mathrm{H^+(aq)}$为零）：$\mathrm{HF(aq)}$ $-320.1$，$-296.8$；$\mathrm{F^-(aq)}$ $-332.6$，$-278.8$；$\mathrm{HF(g)}$ $-271.1$，$-273.2$；$\mathrm{HCl(g)}$ $-92.3$，$-95.3$；$\mathrm{Cl^-(aq)}$ $-167.2$，$-131.2$。
::: solution
**解离本身。** 对$\mathrm{HF(aq)} \rightarrow \mathrm{H^+(aq)} + \mathrm{F^-(aq)}$：
$$
\Delta_\mathrm{r}H^\circ = -332.6 - (-320.1) = -12.6\ \mathrm{kJ\,mol^{-1}},\qquad
\Delta_\mathrm{r}G^\circ = -278.8 - (-296.8) = +18.0\ \mathrm{kJ\,mol^{-1}},
$$
所以$T\Delta_\mathrm{r}S^\circ = \Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ = -30.6\ \mathrm{kJ\,mol^{-1}}$（$\Delta_\mathrm{r}S^\circ = -103\ \mathrm{J\,K^{-1}\,mol^{-1}}$），$\mathrm{p}K_\mathrm{a} = \Delta_\mathrm{r}G^\circ/(RT\ln 10) = 18.0/5.708 = 3.16$，即测量值。引人注目的是$\Delta_\mathrm{r}H^\circ$的符号：水溶液中HF的解离是**放热的**。因此，任何只用键焓的解释——“H–F键太强，断不开”——都是不完整的。HF之所以弱，是因为**熵**项。解离产生两个离子，小而高电荷密度的$\mathrm{F^-}$（与$\mathrm{H_3O^+}$一样）使周围的水有序化的程度远远超过中性的、以氢键结合的HF分子；这种有序化在室温下要付出$30.6\ \mathrm{kJ\,mol^{-1}}$的代价，超过了焓的收益。

**与HCl比较。** 未解离的$\mathrm{HCl(aq)}$无法研究（它完全解离），所以从气相出发比较两种酸，$\mathrm{HX(g)} \rightarrow \mathrm{H^+(aq)} + \mathrm{X^-(aq)}$：

| | $\Delta_\mathrm{r}H^\circ$ | $\Delta_\mathrm{r}G^\circ$ | $T\Delta_\mathrm{r}S^\circ$ |
|---|---|---|---|
| HF | $-61.5$ | $-5.6$ | $-55.9$ |
| HCl | $-74.9$ | $-35.9$ | $-38.9$ |

（单位均为$\mathrm{kJ\,mol^{-1}}$）。HCl在自由能上领先的$30.3\ \mathrm{kJ\,mol^{-1}}$中，$13.4$来自焓，$17.0$来自熵。焓项几乎相互抵消——更强的$\mathrm{H{-}F}$键在很大程度上被小的$\mathrm{F^-}$放热多得多的水合所偿还——而同样紧密的水合所付出的熵代价使天平倾斜。浓HF还会生成$\mathrm{HF_2^-}$（[[main-group/main-group-bonding]]中的三中心键），$\mathrm{HF + F^- \rightleftharpoons HF_2^-}$，它移走氟离子，使浓氢氟酸表现得比稀氢氟酸更强。酸的强度是一个自由能循环，而不是单一的键焓——其中的熵项也绝不是无关紧要的小字。
:::
:::

## 氧化物与氢氧化物：一种元素酸性的一生

::: definition 酸性、两性与碱性氧化物 {#def-oxides}
一种氧化物若消耗酸（$\mathrm{MgO + 2\,H^+ \to Mg^{2+} + H_2O}$）则为**碱性**的，若消耗碱（$\mathrm{SO_3 + 2\,OH^- \to SO_4^{2-} + H_2O}$）则为**酸性**的，两者兼有（$\mathrm{ZnO}$、$\mathrm{Al_2O_3}$、$\mathrm{SnO_2}$）则为**两性**的。这一模式是周期性的：氧化物沿周期从左到右酸性增强（碱性$\mathrm{Na_2O}$ → 两性$\mathrm{Al_2O_3}$ → 酸性$\mathrm{SO_3}$、$\mathrm{Cl_2O_7}$），同族**向上**以及**氧化态升高**时酸性也增强（$\mathrm{MnO}$碱性，$\mathrm{MnO_2}$两性，$\mathrm{Mn_2O_7}$酸性——高锰酸的酸酐）。用路易斯的语言，这两种行为是相反的角色。**碱性**氧化物是电子对**给予体**：它的氧离子由低电荷的大阳离子束缚，可以自由地把一对孤对电子给予质子（$\mathrm{O^{2-} + H^+ \to OH^-}$）。**酸性**氧化物是电子对**接受体**：它小而高电荷、电负性大的中心原子把电子密度从氧上拉走，自身还能接受来自碱的一对电子——在$\mathrm{SO_3 + OH^- \to HSO_4^-}$中，氢氧根的氧与硫成键。中心原子的电负性越大、电荷越高，氧化物的酸性越强。
:::

氢氧化物遵循同一规则，可读作$\mathrm{E{-}OH}$对$\mathrm{E \leftarrow OH}$：若$\mathrm{E}$是正电性的，化合物失去$\mathrm{OH^-}$（碱，如$\mathrm{NaOH}$）；若$\mathrm{E}$是电负性的，它失去$\mathrm{H^+}$（酸，如$\mathrm{HOCl}$）；介于两者之间则两者兼有，而这个中间带——Be、Al、Zn、Sn、Pb、Cr(III)——就是你将在定性分析和[[main-group/groups-13-14]]中再次遇到的两性带。

## 路易斯酸与路易斯碱

::: definition 路易斯酸与路易斯碱 {#def-lewis}
**路易斯碱**给出一对电子形成化学键；**路易斯酸**接受一对电子。每个布朗斯特酸碱反应都是伪装的路易斯反应（被转移的质子就是电子对接受体），但路易斯定义的适用范围远远超出质子：$\mathrm{BF_3}$、$\mathrm{AlCl_3}$、$\mathrm{SiF_4}$、$\mathrm{SO_3}$、$\mathrm{Ag^+}$，以及任何具有未填满轨道或低能$\sigma^*$轨道的主族中心。加合物$\mathrm{F_3B{-}NH_3}$是原型：配位的、极性的，而且——正如你从[[main-group/main-group-bonding]]中已经知道的——只是补救电子短缺的最小例子。
:::

::: example 三卤化硼颠倒的路易斯酸性 {#ex-bx3}
按诱导效应的逻辑，取代基电负性最大的$\mathrm{BF_3}$对$\mathrm{NH_3}$应当是最强的路易斯酸。实验给出的却恰恰相反：$\mathrm{BF_3 < BCl_3 < BBr_3 < BI_3}$。请解释。
::: solution
$\mathrm{BX_3}$是缺电子的，**而且**它的空$2p$轨道被卤素孤对电子的$\pi$给予部分填充——而小而紧凑的氟是对硼$2p$最好的$\pi$给予体。$\mathrm{BF_3}$在参与反应之前就已经被π给予部分满足了——用价键语言来说，存在共振式$\mathrm{F_2B^-{=}F^+}$，硼上带形式负电荷，双键连接的氟上带形式正电荷——为了结合氨，它必须**放弃**这些（使硼角锥化并失去π重叠）。$\mathrm{BI_3}$的$5p$–$2p$ π重叠很差，可失去的较少。第二个贡献是把平面$\mathrm{BX_3}$弯成角锥形加合物构型所需的能量，它也是氟化物最大。寓意：路易斯酸性是σ吸电子与π给电子的**净**结果，在第二周期中π项大到足以颠倒诱导效应的顺序。
:::
:::

::: example 为什么硅能结合六个氟而碳只能结合四个 {#ex-sif6}
$\mathrm{SiF_4 + 2\,F^- \to SiF_6^{2-}}$在溶液中定量进行（这是玻璃刻蚀和氟离子分析的基础）；不存在$\mathrm{CF_6^{2-}}$。为什么？
::: solution
不是因为硅“有$d$轨道”——[[main-group/main-group-bonding]]中的论证同样适用：两对额外的电子占据三中心成键方案中以配体为中心的非键组合，与$\mathrm{SF_6}$完全一样，而真正起作用的是**尺寸**（六个氟可以舒适地排列在较大的硅周围：$\mathrm{Si{-}F}\ 168\ \mathrm{pm}$，而$\mathrm{C{-}F}\ 135\ \mathrm{pm}$）和**静电作用**（$\mathrm{SiF_6^{2-}}$弥散的负电荷是稳定的；而在微小的碳周围，六配位笼中氟离子之间的排斥是致命的）。主族化学中的配位数由半径比和电子数决定，而不是由$d$轨道的可用性决定——这句话值得牢记，正因为旧教科书让人记住的是错误的那一句。
:::
:::

## 软硬酸碱

::: definition 硬与软 {#def-hsab}
**硬**酸或硬碱小、难极化，把电荷抓得很紧（$\mathrm{H^+}$、$\mathrm{Li^+}$、$\mathrm{Al^{3+}}$、$\mathrm{Fe^{3+}}$、$\mathrm{BF_3}$；碱$\mathrm{F^-}$、$\mathrm{OH^-}$、$\mathrm{H_2O}$、$\mathrm{CO_3^{2-}}$、$\mathrm{PO_4^{3-}}$、$\mathrm{NH_3}$）。**软**的则大、易极化，常常电荷低并有可及的$d$电子（$\mathrm{Ag^+}$、$\mathrm{Hg^{2+}}$、$\mathrm{Cu^+}$、$\mathrm{Tl^+}$、$\mathrm{I_2}$；碱$\mathrm{I^-}$、$\mathrm{HS^-}$、$\mathrm{RS^-}$、$\mathrm{CN^-}$、$\mathrm{CO}$、烯烃）。交界情形（$\mathrm{Fe^{2+}}$、$\mathrm{Cu^{2+}}$、$\mathrm{SO_3^{2-}}$、吡啶）介于两者之间。
:::

::: proposition 软硬酸碱原理 {#prop-hsab}
硬酸偏爱硬碱，软酸偏爱软碱，而且这种偏爱是热力学的：硬–硬组合主要由静电作用稳定（电荷–电荷吸引，有利于不能被极化的小而硬的伙伴），软–软组合由共价性稳定（前线轨道相互作用，有利于电子云能够相互变形的大而易极化的伙伴）。不匹配的组合——硬酸配软碱——是不稳定的、活泼的、易于转移的。
:::

::: example 卤化银：同一列，四种溶解度 {#ex-agx}
$\mathrm{AgF}$易溶；$\mathrm{AgCl}$、$\mathrm{AgBr}$、$\mathrm{AgI}$的溶度积分别为$1.8\times10^{-10}$、$5\times10^{-13}$、$8\times10^{-17}$。解释这一顺序，以及碱金属卤化物为何完全没有类似表现。
::: solution
$\mathrm{Ag^+}$是软酸（$4d^{10}$，易极化）；沿卤离子一列向下，碱变软（$\mathrm{F^-}$硬，$\mathrm{I^-}$很软）。软–软匹配使$\mathrm{AgI}$具有很强的共价性——法扬斯规则与软硬酸碱原理是描述这种额外晶格稳定性的两种语言——所以它最难溶；不匹配的$\mathrm{AgF}$则是离子型的、易溶的。钠是硬酸，没有表现出这种区分：从$\mathrm{NaF}$到$\mathrm{NaI}$都可溶，它们之间的差别由普通的晶格能对水合能的算术决定。照相定影液用软的**硫**给予体来争夺银：硫代硫酸根生成$\mathrm{[Ag(S_2O_3)_2]^{3-}}$（$\beta_2 \approx 2.9\times10^{13}$），溶解反应$\mathrm{AgX(s) + 2\,S_2O_3^{2-} \rightleftharpoons [Ag(S_2O_3)_2]^{3-} + X^-}$的$K = K_\mathrm{sp}\beta_2$。对AgCl约为$5\times10^{3}$，对AgBr为$15$，因此两者都容易溶解，但对AgI仅约$2\times10^{-3}$：即使在$1\ \mathrm{mol\,dm^{-3}}$硫代硫酸盐中，AgI的溶解量也只有AgBr的约十分之一（[[#exr-agi-fixer]]）。硫代硫酸根是软的，但碘离子也是一个软的竞争者。
:::
:::

::: example 两可碱：亚硫酸根的选择 {#ex-sulfite}
亚硫酸根$\mathrm{SO_3^{2-}}$可以通过硫或通过氧成键。预测(a) $\mathrm{SO_3^{2-} + H^+}$；(b) $\mathrm{SO_3^{2-} + CH_3I}$的产物。
::: solution
(a) $\mathrm{H^+}$是典型的硬酸：它结合硬的氧，生成$\mathrm{HSO_3^-}$——而且由于O-质子化不触动硫的孤对电子，亚硫酸氢根随后能**通过硫**与羰基化合物加成。(b) 碘甲烷是软亲电试剂（易极化的$\mathrm{C{-}I}$键通过其$\sigma^*$轨道在碳上反应）：硫进攻，产物是甲磺酸根$\mathrm{CH_3SO_3^-}$，含一个$\mathrm{C{-}S}$键——这就是施特雷克磺酸盐合成（Strecker sulfonate synthesis），普遍适用于卤代烷。（甲磺酸本身在工业上通过另一条路线生产，即甲硫醇或二甲基二硫醚的氧化。）一种阴离子，两种试剂，成键于两个不同的原子：软硬酸碱原理是一条**可预测**的规则，这是一个经典的演示。
:::
:::

::: warning 软硬酸碱是排序原理，而不是能量 {#warn-hsab}
“硬亲硬，软亲软”并不附带数字。它对**一个系列内的趋势**排序（AgF对AgI，O-进攻对S-进攻），而当其他项占主导时它会悄无声息地失效。银的例子说明了这一点。软硬酸碱原理说，硫代硫酸根（软的S给予体）应当把$\mathrm{Ag^+}$从硬的氟离子和交界的氯离子那里拉走——确实如此——但它无法判断它能否胜过碘离子，因为两个竞争者都是软的。只有数字$K = K_\mathrm{sp}\beta_2$才能决定：AgBr在普通定影液中完全溶解，AgI只部分溶解。还有两点需要注意：溶解度还包含与软硬无关的晶格项和水合项；而且软硬酸碱是关于平衡的表述，它所偏爱的产物仍可能生成得很慢，或者被更快的途径抢先。用软硬酸碱原理来**选择该作哪个比较**，然后用数据检验这个比较；绝不要用它来宣布某个反应被禁止。
:::

## 非水溶剂：没有水的酸与碱

::: definition 自偶电离、拉平与溶剂体系 {#def-autoionization}
每种极性溶剂都会自偶电离（$\mathrm{2\,H_2O \rightleftharpoons H_3O^+ + OH^-}$；$\mathrm{2\,NH_3 \rightleftharpoons NH_4^+ + NH_2^-}$；$\mathrm{2\,HF \rightleftharpoons H_2F^+ + F^-}$），并各自规定自己的中性点和上限：**溶剂中能存在的最强酸是溶剂化的质子**（$\mathrm{H_3O^+}$、$\mathrm{NH_4^+}$、$\mathrm{H_2F^+}$），**最强碱是溶剂化的阴离子**（$\mathrm{OH^-}$、$\mathrm{NH_2^-}$、$\mathrm{F^-}$）——任何更强的物种都会被溶剂本身破坏（**拉平效应**）。比溶剂自身离子更强的酸和碱是**超酸**与**超碱**，只能在碱性较弱的介质中观察到。
:::

::: example 三种溶剂中的碱阶梯 {#ex-levelling}
$\mathrm{NaOH}$、$\mathrm{NaNH_2}$和$\mathrm{NaH}$在(a) 水，(b) 液氨，(c) DMSO中各处于什么位置？
::: solution
(a) 在水中三者都被拉平为$\mathrm{OH^-}$：$\mathrm{NH_2^- + H_2O \to NH_3 + OH^-}$完全进行（$K$为$10^{20}$量级或更大，因为$\mathrm{p}K_\mathrm{a}(\mathrm{NH_3})$通常给出的值接近38，远高于水的），$\mathrm{H^- + H_2O \to H_2 + OH^-}$（不可逆）。水无法区分它们。(b) 在干燥的液氨中，平衡$\mathrm{OH^- + NH_3 \rightleftharpoons H_2O + NH_2^-}$偏向左边，所以$\mathrm{OH^-}$是弱碱，不会被向上拉平为$\mathrm{NH_2^-}$。$\mathrm{NH_2^-}$是上限；如果有水存在，被拉平到$\mathrm{OH^-}$的是$\mathrm{NH_2^-}$。因此$\mathrm{NaNH_2}$是氨化学中的强碱，而不溶的、非均相的$\mathrm{NaH}$在需要表面碱时使用。(c) 在非质子性的DMSO中，$\mathrm{OH^-}$和$\mathrm{NH_2^-}$都不会被溶剂的质子拉平，固有碱性重新显现：氢氧根成为极好的亲核试剂（“DMSO溶剂化阳离子而不溶剂化阴离子，从而增强碱性”），标度拉伸了许多个$\mathrm{p}K_\mathrm{a}$单位。同一种碱在三个烧杯里是三种不同的试剂。
:::
:::

::: example 重水的算术 {#ex-pd}
$25\ \mathrm{^\circ C}$下$\mathrm{D_2O}$的$\mathrm{p}K_\mathrm{w} = 14.87$。中性重水的pD是多少？为什么$\mathrm{p}K_\mathrm{w}$比轻水的大？
::: solution
中性意味着$[\mathrm{D_3O^+}] = [\mathrm{OD^-}]$，所以$\mathrm{pD} = 14.87/2 = 7.43$——按标度的构造，中性重水比7.00“酸性更弱”。从物理上说，$\mathrm{O{-}D}$键的零点能低于$\mathrm{O{-}H}$（氘的质量加倍使伸缩频率降低约$\sqrt{2}$倍），因此更难断裂，$\mathrm{D_3O^+}$也把多出的质子抓得更紧——两步自偶电离都代价更高，$\mathrm{p}K_\mathrm{w}$升高0.87个单位。同样的零点能逻辑使每个涉及D的酸碱平衡都略为不利，使每个断裂$\mathrm{O{-}H}$键的反应对D而言都可测地变慢——这就是在[[main-group/hydrogen-s-block]]中定量讨论的动力学同位素效应。
:::
:::

酸标度的顶端是**超酸**：$100\ \%$ $\mathrm{H_2SO_4}$已经能拉平一切更弱的酸，而$\mathrm{HSO_3F \cdot SbF_5}$（魔酸，$H_0$约$-20$至$-23$）和$\mathrm{HF \cdot SbF_5}$（氟锑酸，在HF中稀释时$H_0$接近$-21$，$1{:}1$混合物估计接近$-28$）之类的混合物能直接使烃质子化——这在水中是不可能的化学，因为在水中，任何比$\mathrm{H_3O^+}$更强的酸都会在一个分子寿命之内被溶剂破坏。碱标度的顶端，液氨中的氨基盐和氢化物盐以及碱金属有机化合物占据着拉平效应在水中所禁止的领地。选择溶剂就是设计酸碱。

::: quiz
为什么高氯酸是强酸而次氯酸是弱酸？
- [x] $\mathrm{ClO_4^-}$把电荷分散到四个等价的氧上；$\mathrm{OCl^-}$把电荷定域在一个氧上——这是共轭碱的稳定化。
- [ ] 高氯酸的H–O键较弱——键焓控制含氧酸的强度。
- [ ] 高氯酸的氧原子更多，所以给出更多质子——强度取决于质子数。
- [ ] $+7$价的氯比$+1$价的氯电负性更大。
::: solution
强度是失去一个质子的自由能，由阴离子的稳定程度决定：四个氧代基团使$\mathrm{ClO_4^-}$的电荷离域，远远胜过没有氧代基团的$\mathrm{OCl^-}$。质子数无关紧要（磷酸有三个，却是弱酸）；键焓对二元酸重要，对含氧酸则不然；而氧化态只是氧代基团真实诱导效应的一个记账替代指标。
:::
:::

## 后续内容

含氧酸与氧化物的模式组织起元素概览各章：[[main-group/groups-15-16]]和[[main-group/halogens-noble-gases]]中氮、磷、硫与卤素的酸酐和含氧酸阶梯；[[main-group/groups-13-14]]和[[main-group/hydrogen-s-block]]中的两性带（Be、Al、Zn）。路易斯酸性是有机课程中傅-克化学与硼烷化学（[[organic-1/nucleophilic-substitution]]）、沸石催化（[[materials-chemistry/porous-materials]]）以及[[coordination-chemistry/complex-stability]]中配合物稳定性的语言。溶剂体系的思想将随液氨在[[main-group/hydrogen-s-block]]中回归，而你应当不断磨练的定量酸碱工具见[[general-chemistry-2/acids-bases]]和[[general-chemistry-2/buffers-titrations]]。

::: history
阿伦尼乌斯（Arrhenius）把酸定义为在水中给出$\mathrm{H^+}$的含羟基化合物（1884）——这个定义解释了水溶液中的中和，却立即在氨和无水化学上失效。1923年，布朗斯特（Brønsted）与劳里（Lowry）在两篇独立的论文中使质子成为载体、共轭酸碱对成为语法；同年，路易斯（Gilbert Lewis）在其专著《原子与分子的价与结构》（*Valence and the Structure of Atoms and Molecules*）中提出了电子对定义，并在1938年发表于《富兰克林研究所学报》（*Journal of the Franklin Institute*）的论文中将其充分发展。鲍林（Pauling）的经验性含氧酸规则（不要与他1929年关于离子晶体结构的规则混淆）把酸的强度变成了结构算术。溶剂体系的思想源于富兰克林（Edward Curtis Franklin）始于19世纪90年代的对液氨的长期研究，并由卡迪（Cady）与埃尔西（Elsey）于1928年作了一般性表述；1963年，皮尔逊（Ralph Pearson）在*JACS*上关于软硬酸碱的论文给了化学家自电负性标度以来第一条带有定量色彩的选择性规则。欧拉（George Olah）在20世纪60–70年代的超酸化学——使烷烃质子化、直接观察碳正离子——获得了1994年诺贝尔奖，并证明拉平效应是关于溶剂的表述，而不是关于酸的。
:::

::: summary
- 含氧酸的强度就是共轭碱的稳定化：鲍林规则（$\mathrm{p}K_\mathrm{a1} \approx 8 - 5p$，间隔为5）从结构$\mathrm{O_pE(OH)_q}$读出它，且只有OH上的质子算数。
- 二元酸的强度同族向下、同周期向右增大。HF之所以弱，不是因为焓的代价大——它在水中的解离是放热的——而是因为紧密水合小的$\mathrm{F^-}$离子所付出的熵代价。
- 碱性氧化物给出电子对（氧离子）；酸性氧化物在电负性大、电荷高的中心原子上接受电子对。酸性随电负性和氧化态增大，两性带位于两者之间。
- 路易斯酸性是电子对的接受；相互竞争的π给予可以颠倒诱导效应的预期（$\mathrm{BX_3}$的顺序），配位数由尺寸和静电作用决定，而不是由$d$轨道决定。
- 硬–硬吸引是静电的，软–软吸引是共价的；软硬酸碱原理预测溶解度趋势（AgI）、反应位点（亚硫酸根的S对O）以及不匹配组合的可转移性。
- 溶剂会拉平：任何介质中最强的酸和碱就是它自身的自偶电离离子，所以同一试剂的强度随溶剂而变——超酸只存在于上限更高的地方。
:::

## 习题

::: exercise 鲍林预测 {level=1 check="3"}
预测砷酸$\mathrm{H_3AsO_4}$（$\mathrm{OAs(OH)_3}$）和高溴酸$\mathrm{HBrO_4}$（$\mathrm{HOBrO_3}$）的$\mathrm{p}K_\mathrm{a1}$，并说明每个预测在实验上意味着什么。（输入砷酸的预测$\mathrm{p}K_\mathrm{a1}$。）
::: solution
$\mathrm{H_3AsO_4}$：$p = 1$，预测$\mathrm{p}K_\mathrm{a1} = 8 - 5 = 3$——中等偏弱的酸；观测值2.2，为三元酸，间隔接近5（观测2.2、6.9、11.5；预测3、8、13）。$\mathrm{HBrO_4}$：$p = 3$，预测$-7$——强酸，在水中完全解离。（高溴酸盐本身就很难制备——直到1968年才首次制得——这是关于达到溴(VII)的动力学的事实，与制得之后酸的强度无关。）
:::
:::

::: exercise 从自由能到$\mathrm{p}K_\mathrm{a}$ {level=1 check="7.52"}
对于$298.15\ \mathrm{K}$下的$\mathrm{HOCl(aq)} \rightleftharpoons \mathrm{H^+(aq)} + \mathrm{OCl^-(aq)}$，$\Delta_\mathrm{r}G^\circ = +42.9\ \mathrm{kJ\,mol^{-1}}$。求$\mathrm{p}K_\mathrm{a}$。（输入结果，保留两位小数。）
::: solution
$\mathrm{p}K_\mathrm{a} = \Delta_\mathrm{r}G^\circ/(RT\ln 10)$，而$RT\ln 10 = 8.314 \times 298.15 \times 2.3026 = 5708\ \mathrm{J\,mol^{-1}}$。所以$\mathrm{p}K_\mathrm{a} = 42\,900/5708 = 7.52$，即$K_\mathrm{a} = 3.0\times10^{-8}$。在室温下，每$5.71\ \mathrm{kJ\,mol^{-1}}$的自由能对应一个$\mathrm{p}K$单位——这个换算值得熟记。
:::
:::

::: exercise 数一数酸性氢 {level=1}
下列各酸在水中各给出几个质子：$\mathrm{H_3PO_4}$，$\mathrm{H_3PO_2}$，$\mathrm{H_4P_2O_7}$（焦磷酸，$\mathrm{(HO)_2(O)P{-}O{-}P(O)(OH)_2}$），$\mathrm{H_4P_2O_6}$（连二磷酸，$\mathrm{(HO)_2(O)P{-}P(O)(OH)_2}$）？
::: solution
三、一、四、四：只数$\mathrm{O{-}H}$基团。$\mathrm{H_3PO_2}$是$\mathrm{H_2P(O)OH}$，有一个OH和两个$\mathrm{P{-}H}$；焦磷酸和连二磷酸各有四个OH基团，没有$\mathrm{P{-}H}$（两者的区别在于有$\mathrm{P{-}O{-}P}$桥还是直接的$\mathrm{P{-}P}$键）。要养成的习惯：永远不要根据化学式作答，而总要根据连接方式。
:::
:::

::: exercise 硬还是软？ {level=1}
把下列各酸分为硬或软：$\mathrm{Al^{3+}}$，$\mathrm{Ag^+}$，$\mathrm{Fe^{3+}}$，$\mathrm{Hg^{2+}}$，$\mathrm{BF_3}$，$\mathrm{Tl^+}$；并对下列各碱分类：$\mathrm{F^-}$，$\mathrm{I^-}$，$\mathrm{S^{2-}}$，$\mathrm{PO_4^{3-}}$，$\mathrm{CO}$。
::: solution
硬酸：$\mathrm{Al^{3+}}$、$\mathrm{Fe^{3+}}$（小、高电荷）、$\mathrm{BF_3}$。软酸：$\mathrm{Ag^+}$、$\mathrm{Hg^{2+}}$、$\mathrm{Tl^+}$（大、易极化、$d$层全满）。硬碱：$\mathrm{F^-}$、$\mathrm{PO_4^{3-}}$（电荷位于小的F或O原子上）。软碱：$\mathrm{I^-}$、$\mathrm{S^{2-}}$、$\mathrm{CO}$（易极化；CO通过碳与软的低氧化态金属结合——Ni和Fe的羰基化合物，从来没有Mg或Al的）。
:::
:::

::: exercise 教科书般的弱酸 {level=2 check="4.76"}
通过求解精确的二次方程，求$0.010\ \mathrm{mol\,dm^{-3}}$次氯酸（$K_\mathrm{a} = 3.0\times10^{-8}$）的pH，并检验近似$[\mathrm{H^+}] \approx \sqrt{K_\mathrm{a}c}$是否合理。（输入pH，保留两位小数。）
::: solution
令$x = [\mathrm{H^+}]$，$x^2/(c - x) = K_\mathrm{a}$给出$x^2 + K_\mathrm{a}x - K_\mathrm{a}c = 0$，所以
$$
x = \frac{-K_\mathrm{a} + \sqrt{K_\mathrm{a}^2 + 4K_\mathrm{a}c}}{2} = 1.73\times10^{-5}\ \mathrm{mol\,dm^{-3}},\qquad \mathrm{pH} = 4.76.
$$
近似给出$\sqrt{3.0\times10^{-10}} = 1.73\times10^{-5}$——三位有效数字完全相同，因为只有$0.17\ \%$的酸发生了电离。（水自身的贡献$\sim10^{-7}$也可以忽略。）正文中的牛顿法图用迭代方式求解了同一个方程。
:::
:::

::: exercise 碳酸的真实强度 {#exr-carbonic level=2 check="3.58"}
“碳酸”的表观第一酸解离常数为$\mathrm{p}K_\mathrm{a1,app} = 6.35$，其定义以溶解的$\mathrm{CO_2(aq)} + \mathrm{H_2CO_3}$总量为分母。水合平衡$\mathrm{CO_2(aq) + H_2O \rightleftharpoons H_2CO_3}$的$K_\mathrm{h} = 1.7\times10^{-3}$。求$\mathrm{H_2CO_3}$分子本身的$\mathrm{p}K_\mathrm{a}$。（输入结果，保留两位小数。）
::: solution
$K_\mathrm{a,app} = [\mathrm{H^+}][\mathrm{HCO_3^-}]/([\mathrm{CO_2}] + [\mathrm{H_2CO_3}])$，$K_\mathrm{a,true} = [\mathrm{H^+}][\mathrm{HCO_3^-}]/[\mathrm{H_2CO_3}]$。由于$[\mathrm{H_2CO_3}] = K_\mathrm{h}[\mathrm{CO_2}]$，溶解碳中以$\mathrm{H_2CO_3}$形式存在的分数为$K_\mathrm{h}/(1 + K_\mathrm{h})$，且$K_\mathrm{a,app} = K_\mathrm{a,true}\,K_\mathrm{h}/(1 + K_\mathrm{h})$。因此
$$
\mathrm{p}K_\mathrm{a,true} = 6.35 + \log_{10}\frac{1.7\times10^{-3}}{1.0017} = 6.35 - 2.77 = 3.58.
$$
鲍林规则（$p = 1$）预测为3；真实的分子是一种普通的中等偏弱含氧酸，只是被一个事实掩盖了：溶解的$\mathrm{CO_2}$几乎全部从未水合。
:::
:::

::: exercise 硼酸的窍门 {level=2}
硼酸$\mathrm{B(OH)_3}$的$\mathrm{p}K_\mathrm{a} = 9.24$，但它并不以通常的方式失去自身的任何质子。写出平衡式，并解释为什么加入甘露醇后它就强到可以用氢氧化钠滴定。
::: solution
$\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$：硼原子从水中接受氢氧根（路易斯酸性），并从那个水分子放出一个质子。该平衡太不利，得不到敏锐的终点。甘露醇具有相邻的OH基团，能与四面体硼酸根形成稳定的环状酯，把$\mathrm{B(OH)_4^-}$从平衡中移走；按勒夏特列原理，反应被拉向右边，表观$\mathrm{p}K_\mathrm{a}$下降几个单位，降到约5。这就是滴定硼酸之前要加入甘露醇（或甘油）的原因。路易斯酸性、配合物形成和分析实践，尽在一个平衡之中。
:::
:::

::: exercise 预测反应位点 {level=2}
说明理由，预测下列反应的位点和主要产物：(a) $\mathrm{SCN^- + H^+}$；(b) $\mathrm{SCN^- + CH_3I}$；(c) $\mathrm{NO_2^-}$与伯碘代烷，以及与叔卤代烷。
::: solution
(a) $\mathrm{H^+}$是硬酸，硫氰酸根较硬的一端是氮：游离酸主要以异硫氰酸$\mathrm{HNCS}$的形式存在。(b) 碘甲烷是软亲电试剂，通过$\mathrm{C{-}I}$ $\sigma^*$轨道在碳上反应；较软的硫进攻，生成硫氰酸甲酯$\mathrm{CH_3SCN}$。(c) 亚硝酸根有两个硬的氧端和一个较软的氮。与伯碘代烷——一种碳中心较软的$\mathrm{S_N2}$底物——反应时，N-进攻占优势，主要产物是硝基烷$\mathrm{RNO_2}$，亚硝酸酯$\mathrm{RONO}$是显著的副产物（对亚硝酸钠和亚硝酸银都是如此）。与叔卤代物反应时，反应具有$\mathrm{S_N1}$特征：亲电试剂是碳正离子，一种硬的、受电荷控制的酸，于是生成亚硝酸酯的O-进攻占了上风。软硬酸碱原理在这里合理地给出了位点偏好的排序，但亲电试剂实际有多硬是由机理决定的。
:::
:::

::: exercise 两性的锌 {level=2}
写出$\mathrm{ZnO}$溶于(a) 酸和(b) 碱的方程式，并解释为什么$\mathrm{ZnO}$是两性的，而$\mathrm{Na_2O}$只有碱性、$\mathrm{SO_3}$只有酸性。
::: solution
(a) $\mathrm{ZnO + 2\,H^+ \to Zn^{2+} + H_2O}$；(b) $\mathrm{ZnO + 2\,OH^- + H_2O \to [Zn(OH)_4]^{2-}}$。在(a)中氧离子把一对电子给予$\mathrm{H^+}$；在(b)中锌中心接受来自氢氧根的电子对。锌(II)小且带两个电荷，电负性为$1.65$——中等——所以它可以扮演任一角色。钠是正电性的，其大的一价阳离子使氧离子只能自由地充当给予体。硫(VI)电负性如此之大、电荷如此之高，以致$\mathrm{SO_3}$只能充当接受体：$\mathrm{SO_3 + H_2O \to H_2SO_4}$，在碱中$\mathrm{SO_3 + 2\,OH^- \to SO_4^{2-} + H_2O}$。氧化物的酸性是中心原子电负性和电荷的一个连续函数；两性处于中间。
:::
:::

::: exercise 定影液中的碘化银 {#exr-agi-fixer level=2 check="0.045"}
利用$K_\mathrm{sp}(\mathrm{AgI}) = 8.3\times10^{-17}$和$\mathrm{[Ag(S_2O_3)_2]^{3-}}$的$\beta_2 = 2.9\times10^{13}$，估算AgI在$1.00\ \mathrm{mol\,dm^{-3}}$硫代硫酸钠中的溶解度，并与AgBr（$K_\mathrm{sp} = 5.0\times10^{-13}$）比较。忽略单配合物和活度效应。（以$\mathrm{mol\,dm^{-3}}$为单位输入AgI的溶解度，保留两位有效数字。）
::: solution
对于$\mathrm{AgI(s) + 2\,S_2O_3^{2-} \rightleftharpoons [Ag(S_2O_3)_2]^{3-} + I^-}$，$K = K_\mathrm{sp}\beta_2 = 8.3\times10^{-17} \times 2.9\times10^{13} = 2.4\times10^{-3}$。若每$\mathrm{dm^3}$溶解$s$ mol AgI，则配合物和碘离子各为$s$，硫代硫酸根为$1.00 - 2s$：
$$
\frac{s^2}{(1.00 - 2s)^2} = K \quad\Longrightarrow\quad \frac{s}{1.00 - 2s} = \sqrt{K} = 0.0491 \quad\Longrightarrow\quad s = \frac{0.0491}{1 + 2(0.0491)} = 0.045\ \mathrm{mol\,dm^{-3}}.
$$
对AgBr，$K = 14.5$，$\sqrt{K} = 3.81$，$s = 3.81/8.62 = 0.44\ \mathrm{mol\,dm^{-3}}$——几乎所有的硫代硫酸根都被用掉了。所以AgBr基本上完全溶解，而AgI即使在这种浓定影液中溶解得也只有约十分之一（在稀定影液中则少得多，因为$s \approx \sqrt{K}\,[\mathrm{S_2O_3^{2-}}]$）。软–软的$\mathrm{Ag{-}I}$相互作用与软的硫给予体展开了实实在在的竞争。
:::
:::

::: exercise 推导鲍林第二规则 {level=3 check="16"}
二元含氧酸的第二级电离比第一级难约五个$\mathrm{p}K_\mathrm{a}$单位。把额外的代价模拟为第一个负电荷与离去质子所在位点之间的库仑排斥，两者相距$r \approx 300\ \mathrm{pm}$，处于有效相对介电常数为$\varepsilon_\mathrm{eff}$的介质中，估算$298\ \mathrm{K}$下的$\varepsilon_\mathrm{eff}$。（输入$\varepsilon_\mathrm{eff}$，保留两位有效数字。）
::: hint
用$\Delta G = 2.303RT\,\Delta\mathrm{p}K$把五个$\mathrm{p}K$单位换算成自由能，并利用$N_\mathrm{A}e^2/(4\pi\varepsilon_0) = 1.389\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$。
:::
::: solution
$298\ \mathrm{K}$下五个$\mathrm{p}K_\mathrm{a}$单位相当于$\Delta\Delta G = 5 \times 5.708 = 28.5\ \mathrm{kJ\,mol^{-1}}$。每摩尔的点电荷相互作用为$N_\mathrm{A}e^2/(4\pi\varepsilon_0\varepsilon_\mathrm{eff}r) = (1.389\times10^{5}/300)/\varepsilon_\mathrm{eff} = 463/\varepsilon_\mathrm{eff}\ \mathrm{kJ\,mol^{-1}}$。令$463/\varepsilon_\mathrm{eff} = 28.5$，得$\varepsilon_\mathrm{eff} = 16$。这远低于水的体相值78，这是合理的：两个位点只相距几百皮米，其间主要是阴离子本身而不是溶剂，因此屏蔽很弱。该模型还预测了规则如何失效：当两个酸性基团相距更远时（如长链二元羧酸），$\mathrm{p}K_\mathrm{a}$的间隔会缩小到远小于5。
:::
:::

::: exercise 设计溶剂体系 {level=3}
你需要把(i) 一种很弱的碱，如吡啶（其共轭酸在水中的$\mathrm{p}K_\mathrm{a}$为5.2），以及(ii) 一种很弱的酸，如苯酚（在水中$\mathrm{p}K_\mathrm{a}$为10.0），滴定到敏锐的终点。从水、冰醋酸、液氨和DMSO中为每一种选择溶剂，并用拉平概念加以论证。
::: hint
弱碱在一种**碱性比水弱**（因而滴定剂酸不会被拉平到$\mathrm{H_3O^+}$）且是更好的质子给予体的溶剂中更容易滴定；弱酸则在不会把强碱拉平到$\mathrm{OH^-}$的溶剂中更容易滴定。
:::
::: solution
(i) 用**冰醋酸**，以高氯酸为滴定剂。醋酸是比水弱得多的碱，所以$\mathrm{HClO_4}$不会被拉平为弱的溶剂化质子：其溶液中含有很强的酸$\mathrm{CH_3COOH_2^+}$（$\mathrm{HClO_4}$主要以离子对形式存在），吡啶基本上被完全质子化。滴定曲线有一个大而陡的突跃——这是生物碱之类弱有机碱的标准非水滴定。(ii) 用不拉平强碱的溶剂：**DMSO**（非质子性，对阳离子溶剂化良好，对阴离子溶剂化很差）使四烷基氢氧化铵或醇盐之类的强碱能发挥全部强度，而苯酚（在其中仍是弱酸，在DMSO中$\mathrm{p}K_\mathrm{a}$约为18）被敏锐地去质子化，因为这里的碱比在水中强得多。液氨也是一种碱性的、向上拉平的溶剂，苯酚在其中表现为强酸，但它操作起来远不方便。水在两个极端都失败，因为它自身的离子$\mathrm{H_3O^+}$和$\mathrm{OH^-}$为每一种酸碱滴定剂的强度设定了上限——拉平效应从麻烦变成了设计原理。
:::
:::
