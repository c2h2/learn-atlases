pH计是世界上使用最广的分析仪器，而多数使用它的人都把它当作一台"读出pH"的装置。其实它是一台输入电阻极高的电压表，测的是浸入样品的两个电极之间的电势差——至多几百毫伏，随氢离子活度每变化十倍改变约$59\ \mathrm{mV}$。同样的原理，换一种膜，就能测饮用水中的氟化物、血液中的钾和钠、土壤浸提液中的硝酸盐。而如果不再仅仅*测量*一个电位，改为*施加*一个电位并测量流过的电流，电极就变成了信号正比于浓度的传感器，能够在富集几分钟之后检出十亿分之一水平的铅。最后，数一数电子，法拉第（Faraday）定律就给出一种根本不需要校准的绝对方法。

本章涵盖**电分析化学**的三个分支：**电位分析法**（零电流下的电位，测的是活度）、**伏安法与安培法**（外加电位下的电流，通过传质速率测浓度）和**库仑法**（总电荷，测的是量）。电池的热力学——电池符号、标准电位与能斯特（Nernst）方程——见[[general-chemistry-2/electrochemistry-intro]]；校准所用的统计见[[analytical-chemistry/statistics-calibration]]。电极动力学与双电层更完整的理论属于[[electrochemistry/electrode-kinetics]]和[[electrochemistry/voltammetry]]。

## 分析用的电极与电池

一个电位分析电池由两个半电池组成。**指示电极**响应对分析物的响应；**参比电极**的电位恒定且与样品无关。我们测量的是
$$
E_\mathrm{cell} = E_\mathrm{ind} - E_\mathrm{ref} + E_\mathrm{j},
$$
其中$E_\mathrm{j}$是参比电极填充液与样品边界处的**液接电位**。

::: definition 参比电极 {#def-reference-electrode}
**参比电极**是电位固定、可重现的半电池。基准参比是**标准氢电极**（SHE：镀铂黑（platinised）的铂、$1\ \mathrm{bar}$的$\mathrm{H_2}$、$a_\mathrm{H^+} = 1$），它定义电位零点，却不好用。实际使用：

- **银-氯化银电极**，$\mathrm{Ag}\,|\,\mathrm{AgCl(s)}\,|\,\mathrm{KCl(aq)}$，半反应为$\mathrm{AgCl(s)} + \mathrm{e^-} \rightleftharpoons \mathrm{Ag(s)} + \mathrm{Cl^-(aq)}$，电位$E = E^\circ - 0.05916\log a_\mathrm{Cl^-}$；用饱和KCl时，$25\ ^\circ\mathrm{C}$下对SHE为$E = +0.197\ \mathrm{V}$；
- **饱和甘汞电极**（SCE），$\mathrm{Hg}\,|\,\mathrm{Hg_2Cl_2(s)}\,|\,\mathrm{KCl(sat)}$，$25\ ^\circ\mathrm{C}$下对SHE为$E = +0.241\ \mathrm{V}$，如今因汞的毒性而大体上被取代。

电位之所以固定，是因为填充液的氯离子活度固定。填充液经多孔隔板或素瓷塞与样品接触，构成液接。
:::

液接电位的产生，是因为离子以不同速率跨过液接扩散：如果$\mathrm{H^+}$比$\mathrm{Cl^-}$更快地从酸性样品扩散进KCl，就会形成电荷分离和电位。液接用浓KCl制作，因为$\mathrm{K^+}$和$\mathrm{Cl^-}$的迁移率几乎相等，能把$E_\mathrm{j}$对多数样品压到几毫伏。但几毫伏并不可忽略：$1\ \mathrm{mV}$相当于$0.017$个pH单位，或单价离子活度的$4\ \%$误差。

## 离子选择性电极

**离子选择性电极**（ISE）有一层膜，允许某一种离子比其他离子远为容易地穿过其表面。膜把样品与组成固定的内部填充液隔开。选定离子在溶液与膜之间分配时，每个表面上产生的电荷分离给出一个**膜电位**，它取决于该离子两侧活度之比。

::: proposition 离子选择性电极的响应 {#prop-ise}
对选择性响应电荷为$z_i$的离子$i$、而样品中同时还含有电荷为$z_j$的干扰离子$j$的电极，温度$T$下的电池电位由**尼科尔斯基-艾森曼（Nikolsky–Eisenman）方程**描述
$$
E = \text{常数} + \frac{RT\ln 10}{z_iF}\log_{10}\Big(a_i + \sum_j k_{ij}\,a_j^{\,z_i/z_j}\Big),
$$ {#eq-nikolsky}
其中$k_{ij}$是**电位选择性系数**（性能好的电极该值很小），常数项包括参比电位与内部溶液。没有干扰时，响应是**能斯特（Nernst）式**的：$25\ ^\circ\mathrm{C}$下$a_i$每变十倍$59.16/z_i\ \mathrm{mV}$。干扰项是半经验性的。
:::

::: proof
先考虑只对离子$i$透过的膜。样品（相s）与膜表面（相m）之间达到平衡时，$i$的电化学势在两相中相同：$\mu_i^\circ(\mathrm{s}) + RT\ln a_i(\mathrm{s}) + z_iF\phi(\mathrm{s}) = \mu_i^\circ(\mathrm{m}) + RT\ln a_i(\mathrm{m}) + z_iF\phi(\mathrm{m})$。解出界面电势差，
$$
\phi(\mathrm{m}) - \phi(\mathrm{s}) = \frac{\mu_i^\circ(\mathrm{s}) - \mu_i^\circ(\mathrm{m})}{z_iF} + \frac{RT}{z_iF}\ln\frac{a_i(\mathrm{s})}{a_i(\mathrm{m})} .
$$
内表面与内部溶液之间同理。若膜自身对$i$的活度固定（膜是固体或饱和相），两个界面电位合并为$E_\mathrm{mem} = (RT/z_iF)\ln[a_i(\mathrm{s})/a_i(\mathrm{int})]$，而$a_i(\mathrm{int})$固定时这就是一个常数加$(RT\ln10/z_iF)\log_{10}a_i(\mathrm{s})$。$298.15\ \mathrm{K}$时，$RT\ln10/F = 8.3145\times298.15\times2.3026/96\,485 = 0.05916\ \mathrm{V}$。若离子$j$也能在表面交换，表面位点就按离子交换平衡在$i$与$j$之间分配，膜电位便取决于它们活度的加权和。对等电荷离子，结果恰为$a_i + k_{ij}a_j$，其中$k_{ij}$是交换常数与膜中迁移率之比的乘积（玻璃的艾森曼处理）；不等电荷时指数$z_i/z_j$是经验性的推广。
:::

膜的种类很多。测$\mathrm{H^+}$的**玻璃电极**（下一节），以及选钠玻璃。**晶体膜**：掺$\mathrm{EuF_2}$的$\mathrm{LaF_3}$单晶（掺入以产生氟空位，$\mathrm{F^-}$借此迁移）测氟；压制的$\mathrm{Ag_2S}$测银和硫化物，或与$\mathrm{AgCl}$、$\mathrm{AgBr}$、$\mathrm{CuS}$混合测其他卤素离子或铜。**液态与聚合物膜**：增塑PVC中含离子载体（**离子载体（ionophore）**），例如抗生素缬氨霉素（valinomycin），它的空腔对$\mathrm{K^+}$的匹配比$\mathrm{Na^+}$好约一万倍；每家医院检验科都用这类电极测血液中的钾。

::: widget plot
f: 59.16*log10(10^x + 10^lk*aj/1000)
x: -7, -1
y: -400, 0
sliders: lk=-4:-6:0:0.1; aj=140:1:1000:1
labels: E \ (\mathrm{mV}) - \text{常数}
caption: 对单价离子$i$有选择性的电极的响应[[#eq-nikolsky]]对$\log_{10}a_i$（$x$）的曲线，存在与$i$等电荷、活度为$a_j$（滑块，以$\mathrm{mmol\,dm^{-3}}$计；默认值$140$是血浆的钠水平）的干扰离子$j$，选择性系数$k_{ij} = 10^{\mathrm{lk}}$。$a_i$高时，直线具有每十倍$59.16\ \mathrm{mV}$的能斯特斜率；$a_i$低时，电极转而去测干扰离子，直线变平。拐点落在$a_i \approx k_{ij}a_j$处：$\log k_{ij} = -4$、$a_j = 0.14\ \mathrm{mol\,dm^{-3}}$时，拐点在$a_i = 1.4\times10^{-5}$附近。把$\log k_{ij}$滑到$-2$，电极在$10^{-3}$以下就不可用了：决定检测下限的往往是选择性，而不是电学噪声。
:::

::: example 钾电极上的钠干扰 {#ex-selectivity}
一支缬氨霉素钾电极的$k_{\mathrm{K,Na}} = 1.0\times10^{-4}$（代表性数值）。一份血浆样品中$a_{\mathrm{K^+}} = 3.0\times10^{-3}$、$a_{\mathrm{Na^+}} = 0.105$（活度，即约$4$和$140\ \mathrm{mmol\,dm^{-3}}$的浓度乘以$\gamma \approx 0.75$）。若电极用纯钾溶液校准，钠引起多大的相对误差？若$k_{\mathrm{K,Na}}$为$1.0\times10^{-2}$呢？
::: solution
电极响应的是$a_\mathrm{K} + k\,a_\mathrm{Na} = 3.0\times10^{-3} + 1.0\times10^{-4}\times0.105 = 3.0\times10^{-3} + 1.05\times10^{-5}$。表观钾活度偏高$1.05\times10^{-5}/3.0\times10^{-3} = 0.35\ \%$——可以接受。$k = 1.0\times10^{-2}$时该项为$1.05\times10^{-3}$，误差$35\ \%$——临床上将是灾难，因为血浆钾的正常范围只有约$3.5$到$5\ \mathrm{mmol\,dm^{-3}}$。这正是使临床钾电极成为可能的，是高选择性离子载体的发现而不是更好的电压表。临床分析仪还在钠处于血浆水平的溶液中校准，从而除去所剩偏差的大部分。
:::
:::

## 玻璃电极与pH的测定

玻璃pH电极是一只特殊硅酸盐玻璃的薄球泡，内装内部缓冲溶液和一根内部$\mathrm{Ag/AgCl}$丝。玻璃外层几纳米水化成凝胶层，其中$\mathrm{H^+}$与玻璃中的钠或锂离子交换；电荷经干燥的内层由碱金属离子传导。表面交换平衡使膜电位取决于外部的$a_\mathrm{H^+}$——即[[#prop-ise]]中$i = \mathrm{H^+}$的情形。现代的**复合电极**把参比电极做在同轴的外套里，液接是球泡附近的一小圈或一片隔板。

偏离理想行为的两种情形限定了它的有效使用范围。pH约$11$–$12$以上，$a_\mathrm{H^+}$极小而$\mathrm{Na^+}$常常很多，钠离子竞争表面位点，电极读数偏*低*（**碱误差**或钠误差，即[[#eq-nikolsky]]的干扰项）。在极强酸中（约pH $0.5$以下），电极读数偏*高*（**酸误差**），部分原因是凝胶层中水的活度下降。

因为单离子活度在热力学上不可测，pH是通过与各国计量院指定pH值的标准缓冲溶液比较而操作化定义的。

::: definition pH的操作定义 {#def-ph-operational}
若玻璃电极与参比电极组成的电池在指定值为$\mathrm{pH(S)}$的标准缓冲溶液中给出电位$E_\mathrm{S}$，在样品中给出$E_\mathrm{X}$，则
$$
\mathrm{pH(X)} = \mathrm{pH(S)} - \frac{(E_\mathrm{X} - E_\mathrm{S})F}{RT\ln10},
$$ {#eq-ph-operational}
符号约定为$E$随$a_\mathrm{H^+}$增大而增大。实际中斜率用夹住样品的两种缓冲溶液测出，并表示为理论值$RT\ln10/F$（$25\ ^\circ\mathrm{C}$下$59.16\ \mathrm{mV}$）的百分数。$25\ ^\circ\mathrm{C}$常用的一级缓冲溶液有邻苯二甲酸氢钾（$0.05\ \mathrm{mol\,kg^{-1}}$，pH $4.005$）、等摩尔磷酸盐缓冲溶液（$\mathrm{KH_2PO_4}$和$\mathrm{Na_2HPO_4}$各$0.025\ \mathrm{mol\,kg^{-1}}$，pH $6.865$）和硼砂（$0.01\ \mathrm{mol\,kg^{-1}}$，pH $9.180$）。
:::

::: example 两点校准 {#ex-ph-calibration}
$25\ ^\circ\mathrm{C}$下，某pH电池在邻苯二甲酸氢钾缓冲溶液（pH $4.005$）中读$+170.2\ \mathrm{mV}$，在磷酸盐缓冲溶液（pH $6.865$）中读$+3.0\ \mathrm{mV}$。某样品给出$+81.5\ \mathrm{mV}$。求斜率（以每pH单位毫伏计，以及作为能斯特值的百分数）和样品的pH。
::: solution
斜率：$(170.2 - 3.0)/(6.865 - 4.005) = 167.2/2.860 = 58.46\ \mathrm{mV}$每pH单位，即$58.46/59.16 = 98.8\ \%$，是健康电极的典型值（多数制造商建议斜率低于约$95\ \%$时更换电极）。以磷酸盐缓冲溶液为基准，由[[#eq-ph-operational]]：
$$
\mathrm{pH(X)} = 6.865 - \frac{81.5 - 3.0}{58.46} = 6.865 - 1.343 = 5.52 .
$$
两位小数是诚实的：液接电位有一两毫伏、缓冲溶液的认证不确定度为$\pm0.005$–$0.01$，常规pH测量很少优于$\pm0.02$。
:::
:::

::: warning pH计做不到的三件事 {#warn-ph}
三种习惯会在电极完全正常的情况下给出错误的pH值。第一，在一个温度下校准、在另一个温度下测量：斜率会变（$37\ ^\circ\mathrm{C}$下$61.5\ \mathrm{mV}$），缓冲溶液乃至样品自身的pH也会变；自动温度补偿只校正斜率。第二，在校准范围之外或差别很大的基体中测量：离子强度$0.1$的缓冲溶液与海水（$I \approx 0.7$）或$80\ \%$乙醇样品的液接电位不同，而误差不会在仪器上显示出来。第三，相信第三位小数：仪器显示$5.523$，但[[#eq-ph-operational]]所定义的量的不确定度在常规工作中约为$\pm0.02$。还要记住电极测的是（近似地）活度：$0.1\ \mathrm{mol\,dm^{-3}}$ HCl的pH约为$1.1$，而不是$1.00$。
:::

## 离子选择性电极的校准

ISE像任何相对方法一样校准，只是响应对$\log a$是线性的。用与样品离子强度相同的标准溶液做$E$对$\log c$的校准直线，把活度系数折算进常数：测氟时，向标准溶液和样品中都加**总离子强度调节缓冲溶液**（TISAB）；它把$I$固定在较高值、把pH缓冲在$5$附近（在那里$\mathrm{HF}$和$\mathrm{OH^-}$的干扰都不碍事），并含有一种螯合剂，把氟从铝和铁的配合物中释放出来。

基体无法匹配时，用**已知加入法**（标准加入法的电位版本）。若体积$V_x$的样品电位在加入小体积$V_\mathrm{s}$、浓度$c_\mathrm{s}$的标准溶液后改变$\Delta E$，电极斜率为$S$，则活度系数恒定时，对能斯特响应有
$$
\lvert\Delta E\rvert = S\log_{10}\frac{c_xV_x + c_\mathrm{s}V_\mathrm{s}}{c_x(V_x + V_\mathrm{s})},
$$ {#eq-known-addition}
由此解出$c_x$（[[#exr-known-addition]]）。

## 电位滴定与Gran图

指示电极或离子选择性电极可以代替有色指示剂来跟踪滴定。终点是曲线上斜率$\dd E/\dd V$最大的点，由数据的一阶或二阶导数找出。更精确的做法是利用终点*之前*的数据，那里测量最稳定。

::: proposition 弱酸的Gran方法 {#prop-gran}
用强碱滴定弱酸HA时，在$[\mathrm{H^+}]$和$[\mathrm{OH^-}]$与$[\mathrm{HA}]$和$[\mathrm{A^-}]$相比可忽略的缓冲区域内，
$$
V_\mathrm{b}\,10^{-\mathrm{pH}} = \frac{\gamma_{\mathrm{HA}}}{\gamma_{\mathrm{A^-}}}K_\mathrm{a}\,(V_\mathrm{e} - V_\mathrm{b}) .
$$ {#eq-gran}
$V_\mathrm{b}\,10^{-\mathrm{pH}}$对$V_\mathrm{b}$的图（**Gran图**）是一条直线，与$V_\mathrm{b}$轴相交于化学计量点体积$V_\mathrm{e}$；其斜率为$-K_\mathrm{a}\gamma_{\mathrm{HA}}/\gamma_{\mathrm{A^-}}$。
:::

::: proof
加入$V_\mathrm{b}$、浓度为$C_\mathrm{b}$的碱后，生成的$\mathrm{A^-}$的量为$C_\mathrm{b}V_\mathrm{b}$，剩余的HA为$C_\mathrm{b}(V_\mathrm{e} - V_\mathrm{b})$，因为$C_\mathrm{b}V_\mathrm{e}$就是酸原来的量。两者处于同一体积中，所以浓度之比就是$V_\mathrm{b}/(V_\mathrm{e} - V_\mathrm{b})$。热力学酸常数为
$$
K_\mathrm{a} = \frac{a_\mathrm{H^+}\gamma_{\mathrm{A^-}}[\mathrm{A^-}]}{\gamma_{\mathrm{HA}}[\mathrm{HA}]} = 10^{-\mathrm{pH}}\frac{\gamma_{\mathrm{A^-}}}{\gamma_{\mathrm{HA}}}\cdot\frac{V_\mathrm{b}}{V_\mathrm{e} - V_\mathrm{b}},
$$
其中$\mathrm{pH} = -\log a_\mathrm{H^+}$。重排即得[[#eq-gran]]。若滴定过程中离子强度大致恒定，活度系数之比就是常数，图线即为直线。
:::

::: widget regression
points: 4.0,3.733; 5.0,3.083; 6.0,2.501; 7.0,1.884; 8.0,1.268
degree: 1
x: 0, 11
y: 0, 7
caption: 用$0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH滴定$50.00\ \mathrm{cm^3}$某弱酸的Gran图（[[#ex-gran]]）：$10^4\,V_\mathrm{b}10^{-\mathrm{pH}}$（纵轴，以$\mathrm{cm^3}$计）对以$\mathrm{cm^3}$计的$V_\mathrm{b}$。过缓冲区域五个点的最小二乘直线向右延长，在约$10.07\ \mathrm{cm^3}$处与轴相交，即化学计量点体积。拖动其中一个点，看看截距对单个读数的依赖有多小——远小于导数终点依赖于突跃附近那几个点的情形。
:::

::: example 由Gran图求化学计量点体积与$K_\mathrm{a}$ {#ex-gran}
用$0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH滴定$50.00\ \mathrm{cm^3}$某弱酸，记录到以下pH值：$V_\mathrm{b} = 4.00$、$5.00$、$6.00$、$7.00$、$8.00\ \mathrm{cm^3}$；pH $= 4.03$、$4.21$、$4.38$、$4.57$、$4.80$。求$V_\mathrm{e}$和$\mathrm{p}K_\mathrm{a}$（取$\gamma_{\mathrm{HA}}/\gamma_{\mathrm{A^-}} = 1$）。
::: solution
Gran函数$V_\mathrm{b}10^{-\mathrm{pH}}$为$3.733$、$3.083$、$2.501$、$1.884$、$1.268$（均$\times10^{-4}\ \mathrm{cm^3}$）。最小二乘直线为
$$
V_\mathrm{b}10^{-\mathrm{pH}} = 6.171\times10^{-4} - 6.129\times10^{-5}\,V_\mathrm{b} .
$$
与$V_\mathrm{b}$轴的截距为$6.171\times10^{-4}/6.129\times10^{-5} = 10.07\ \mathrm{cm^3}$，所以酸的浓度为$10.07\times0.1000/50.00 = 0.0201\ \mathrm{mol\,dm^{-3}}$。由斜率得$K_\mathrm{a} = 6.13\times10^{-5}$，$\mathrm{p}K_\mathrm{a} = 4.21$。

这些数据是按$V_\mathrm{e} = 10.00\ \mathrm{cm^3}$、$\mathrm{p}K_\mathrm{a} = 4.20$的酸生成的，再把pH舍入到两位小数。$V_\mathrm{e}$的$0.7\ \%$误差主要来自[[#prop-gran]]中的近似：pH 4附近，$[\mathrm{H^+}] \approx 10^{-4}$对$[\mathrm{HA}] \approx 10^{-2}$并不可忽略，这就是弱酸的Gran图在缓冲区后半段、或用修正的Gran函数效果最好的原因。
:::
:::

## 伏安法与安培法

伏安法中，我们控制**工作电极**的电位并通过它的电流。使用三电极池：工作电极的电位对参比电极控制——几乎无电流通过参比电极——而电流在工作电极与惰性**对电极（辅助电极）**之间流动。这由恒电位仪在电子学上实现。

当工作电极电位负到足以还原分析物O（$\mathrm{O} + n\mathrm{e^-} \rightarrow \mathrm{R}$）时，O在表面被消耗，电流受限于新的O到达电极的快慢。在不搅拌、含过量**支持电解质**（它承担通过溶液的电流，使O不因电场迁移）的溶液中，O只靠**扩散**到达电极，贫化层自电极向外生长。

::: proposition 科特雷尔（Cottrell）方程 {#prop-cottrell}
设$t = 0$时把面积为$A$的平面电极电位阶跃到使表面O浓度降为零的值，溶液不搅拌、本体浓度为$c$、扩散系数为$D$，则扩散极限电流为
$$
i(t) = nFAc\sqrt{\frac{D}{\pi t}} .
$$ {#eq-cottrell}
电流正比于浓度，并随贫化层增厚按$t^{-1/2}$衰减。
:::

::: proof
一维菲克（Fick）第二定律$\partial c/\partial t = D\,\partial^2c/\partial x^2$描述距电极$x$处的$c(x,t)$。条件是$c(x,0) = c$（初始均匀），$t > 0$时$c(0,t) = 0$（到达表面的每个分子都反应），以及$c(\infty,t) = c$。这一经典问题的解为
$$
c(x,t) = c\,\erf\!\left(\frac{x}{2\sqrt{Dt}}\right),
$$
代入即可检验，只需用到$\frac{\dd}{\dd u}\erf u = \frac{2}{\sqrt{\pi}}e^{-u^2}$。O到达表面的通量为$J = D\,(\partial c/\partial x)_{x=0} = Dc\cdot\frac{2}{\sqrt{\pi}}\cdot\frac{1}{2\sqrt{Dt}} = c\sqrt{D/(\pi t)}$。每摩尔到达携带电荷$nF$，所以$i = nFAJ$，即[[#eq-cottrell]]。长度$\sqrt{\pi Dt}$是贫化层的有效厚度：对$D = 1\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$的典型小分子，一秒后约$56\ \mu\mathrm{m}$。
:::

::: widget plot
f: 96485*0.0707*c*1e-6*sqrt(D*1e-5/(pi*x))*1e6
x: 0.02, 2
y: 0, 100
sliders: c=1:0.1:5:0.1; D=1:0.3:3:0.1
labels: i \ (\mu\mathrm{A})
caption: 电位阶跃后的科特雷尔电流[[#eq-cottrell]]，以微安计，对以秒计的时间$t$（$x$），$n = 1$，直径$3\ \mathrm{mm}$的圆盘电极（$A = 0.0707\ \mathrm{cm^2}$）。滑块设定浓度$c$（以$\mathrm{mmol\,dm^{-3}}$计）和$D$（以$10^{-5}\ \mathrm{cm^2\,s^{-1}}$为单位）。$c$加倍则每个时刻的电流都加倍——这是定量伏安法的基础。$D$加倍只使电流增大$\sqrt{2}$倍。前段陡峭处，双电层的充电（图中未画出）也有贡献，这就是测量要在若干毫秒之后进行的原因。
:::

::: example 计时电流法测量 {#ex-cottrell}
在直径$3.0\ \mathrm{mm}$的圆盘电极（$A = 0.0707\ \mathrm{cm^2}$）上作电位阶跃，还原一种$n = 1$、$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$、浓度为$1.0\ \mathrm{mmol\,dm^{-3}}$的物质。求阶跃后$0.10\ \mathrm{s}$和$1.0\ \mathrm{s}$的电流。
::: solution
统一单位：$c = 1.0\ \mathrm{mmol\,dm^{-3}} = 1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$。$t = 1.0\ \mathrm{s}$时，
$$
i = 1\times96\,485\times0.0707\times1.0\times10^{-6}\times\sqrt{\frac{1.0\times10^{-5}}{\pi\times1.0}} = 6.82\times10^{-3}\times1.784\times10^{-3} = 1.22\times10^{-5}\ \mathrm{A},
$$
即$12\ \mu\mathrm{A}$。$0.10\ \mathrm{s}$时电流大$\sqrt{10}$倍，为$38\ \mu\mathrm{A}$。最常见的失误是把$\mathrm{mol\,dm^{-3}}$与$\mathrm{cm^2}$混用：那样电流会大$1000$倍。
:::
:::

在**线性扫描伏安法**和**循环伏安法**中，电位以速率$v$扫描，电流随表面浓度降为零、贫化层随之生长而形成一个峰。$25\ ^\circ\mathrm{C}$下快（可逆）电子转移的峰电流由**朗德尔-谢夫奇克（Randles–Ševčík）方程**给出，
$$
i_\mathrm{p} = 0.4463\,nFAc\sqrt{\frac{nFvD}{RT}} = (2.69\times10^{5})\,n^{3/2}AD^{1/2}v^{1/2}c
$$
（$A$以$\mathrm{cm^2}$、$D$以$\mathrm{cm^2\,s^{-1}}$、$v$以$\mathrm{V\,s^{-1}}$、$c$以$\mathrm{mol\,cm^{-3}}$计）。与$c$的正比关系使峰高可作校准信号；与$\sqrt{v}$的正比关系是电流受扩散控制的判据。循环伏安法归根结底是研究机理的工具，在[[electrochemistry/voltammetry]]中讨论。

痕量分析方面，两项改进至关重要。**脉冲技术**（差分脉冲与方波伏安法）在每个小电位脉冲的末端之前和之末各采一次电流并记录其差，从而把比法拉第电流衰减快得多的电容充电电流甄别出去；检出限降到约$10^{-7}$–$10^{-8}\ \mathrm{mol\,dm^{-3}}$。**溶出伏安法**再加富集步骤。**阳极溶出伏安法**中，$\mathrm{Pb^{2+}}$、$\mathrm{Cd^{2+}}$、$\mathrm{Cu^{2+}}$、$\mathrm{Zn^{2+}}$等金属离子在搅拌的电极上于负电位下被还原数分钟，沉积成薄膜（传统上用汞，如今常用铋或金）；然后电位向正方向扫描，每种金属在其特征电位被氧化回溶液，给出尖峰。因为几分钟的沉积被压缩进持续数秒的溶出峰，检出限达到$10^{-10}\ \mathrm{mol\,dm^{-3}}$——对这些元素可与等离子体质谱法相比，而仪器装得进一只手提箱。

**安培传感器**保持电位恒定，读取正比于浓度的电流。克拉克（Clark）氧电极还原透过透气膜扩散进来的$\mathrm{O_2}$；糖尿病患者使用的血糖仪在印刷电极上用酶（葡萄糖氧化酶或脱氢酶）和媒介体把葡萄糖变成电流。安培检测器也接在液相色谱柱的流出液之后（[[analytical-chemistry/chromatography]]）。

## 库仑法

库仑方法测量把分析物完全转化所需的总电荷，并用法拉第定律$n = Q/(zF)$把它换算成物质的量。由于法拉第常数是基本常数、电荷可以高精度测量，库仑法像重量分析一样是绝对方法。

::: proposition 库仑分析中的法拉第定律 {#prop-coulometry}
若电极反应对每式量单位分析物转移$z$个电子，且电流效率为$100\ \%$，则电荷$Q$转化的分析物的量为
$$
n = \frac{Q}{zF}, \qquad Q = \int_0^t i\,\dd t \quad (= it \text{ 恒定电流下}).
$$ {#eq-coulometry}
:::

::: proof
每式量单位分析物与电极交换$z$个电子，所以$n$摩尔转移的电荷为$zeN = zF\,n$（$F = eN_\mathrm{A}$）。电流效率$100\ \%$的条件意味着没有电荷被其他反应（例如水或氧的还原）消耗，测得的$Q$全部对应于分析物。总电荷就是电流对时间的积分。
:::

库仑法有两种模式。**恒电位库仑法**中，工作电极电位保持为只有分析物反应的数值，电流随分析物耗尽而指数衰减；电荷一直积分到电流回到基线。**恒电流库仑滴定**中，试剂由大量过量的前体在恒电流下于电极上电生，测量到达终点的时间。电生滴定剂包括$\mathrm{OH^-}$和$\mathrm{H^+}$（来自水）、$\mathrm{Ag^+}$（来自银阳极，用于卤化物）、$\mathrm{Br_2}$和$\mathrm{I_2}$（来自溴化物和碘化物）。最重要的应用是**卡尔·费休（Karl Fischer）**法测水：阳极产生的碘在碱性醇介质中与水与二氧化硫反应（每个$\mathrm{H_2O}$对应一个$\mathrm{I_2}$），游离碘出现时用安培法指示终点。

::: example 库仑法卡尔·费休滴定测水 {#ex-karl-fischer}
把$2.000\ \mathrm{g}$药物粉末样品加入卡尔·费休滴定池。碘在恒定的$10.0\ \mathrm{mA}$下生成（$2\,\mathrm{I^-} \rightarrow \mathrm{I_2} + 2\,\mathrm{e^-}$），$120.0\ \mathrm{s}$后到达终点（已校正漂移）。求水的质量及其质量分数，以$\mathrm{mg\,kg^{-1}}$表示。
::: solution
$Q = 0.0100\ \mathrm{A}\times120.0\ \mathrm{s} = 1.200\ \mathrm{C}$。每个$\mathrm{I_2}$对应两个电子，每个$\mathrm{H_2O}$对应一个$\mathrm{I_2}$，所以每个水分子$z = 2$，
$$
n(\mathrm{H_2O}) = \frac{1.200}{2\times96\,485} = 6.219\times10^{-6}\ \mathrm{mol}, \qquad m = 6.219\times10^{-6}\times18.015 = 1.120\times10^{-4}\ \mathrm{g} = 112.0\ \mu\mathrm{g}.
$$
质量分数为$112.0\ \mu\mathrm{g}/2.000\ \mathrm{g} = 56.0\ \mathrm{mg\,kg^{-1}}$（$0.0056\ \%$）。每微克水约需$10.7\ \mu\mathrm{C}$，这一电量恒流源能以高精度给出，这就是库仑法卡尔·费休成为ppm水平水分首选方法的原因；量较大时用容量法卡尔·费休，用滴定管加入标定的碘试剂。
:::
:::

::: quiz
某化学家以$0.10\ \mathrm{V\,s^{-1}}$测量循环伏安图，得到峰电流$20\ \mu\mathrm{A}$。同一溶液、扩散控制的可逆过程，在$0.40\ \mathrm{V\,s^{-1}}$下峰电流应约为：
- [ ] $20\ \mu\mathrm{A}$，因为浓度没有变。
- [x] $40\ \mu\mathrm{A}$。
- [ ] $80\ \mu\mathrm{A}$。
- [ ] $10\ \mu\mathrm{A}$，因为贫化层没有足够时间形成。
::: solution
朗德尔-谢夫奇克方程给出$i_\mathrm{p} \propto v^{1/2}$；$v$增大四倍，峰电流加倍。扫描越快，贫化层形成所花的*时间越少*，因而越薄，浓度梯度越陡，电流越*大*——与最后一个选项正相反。电流若正比于$v$（而不是$\sqrt{v}$），说明物种是吸附的而非扩散的。
:::
:::

## 后续内容

电位传感器和安培检测器在[[analytical-chemistry/chromatography]]中作为色谱检测器重新出现。伏安峰形背后的电极动力学理论——巴特勒-福尔默（Butler–Volmer）方程、不可逆与准可逆波、双电层——在[[electrochemistry/electrode-kinetics]]、[[electrochemistry/double-layer]]和[[electrochemistry/voltammetry]]中展开。生物传感器和用溶出方法对环境金属的监测见[[environmental-chemistry/environmental-monitoring]]。钾电极背后的离子载体是[[coordination-chemistry/complex-stability]]主客体化学的一个例子。

::: history
能斯特（Nernst）于1889年发表了联系电极电位与浓度的方程。马克斯·克雷默（Cremer）于1906年观察到薄玻璃膜对酸度的响应，弗里茨·哈伯（Haber）与齐格蒙特·克莱门谢维奇（Klemensiewicz）于1909年把它变成可用的玻璃电极；同年索伦森（Sørensen）在嘉士伯实验室引入了pH标度。阿诺德·贝克曼（Beckman）的公司在20世纪30年代中期售出了第一台带电子管放大器的商品pH计。耶罗斯拉夫·海罗夫斯基（Heyrovský）于1922年发明了滴汞电极极谱法，并因此获1959年诺贝尔化学奖。弗雷德里克·科特雷尔（Cottrell）于1903年导出了电位阶跃电流；贡纳尔·格兰（Gran）于1950年和1952年提出了他对滴定曲线的线性化。卡尔·费休（Karl Fischer）于1935年发表了他的测水试剂。马丁·弗兰特（Frant）与詹姆斯·罗斯（Ross）于1966年在*Science*上描述了氟化镧电极；莱兰·克拉克（Clark）的覆膜氧电极（1956年）以及他与钱普·莱昂斯（Lyons）的葡萄糖酶电极（1962年）开创了生物传感器领域。
:::

::: summary
- 电位分析法用指示电极与参比电极在零电流下测活度（$\mathrm{Ag/AgCl}$ $+0.197\ \mathrm{V}$，SCE $+0.241\ \mathrm{V}$，25 °C下对SHE）；几毫伏的液接电位限制了准确度。
- ISE按$E = \text{const} + (59.16/z_i)\log(a_i + \sum k_{ij}a_j^{z_i/z_j})\ \mathrm{mV}$响应；选择性系数决定真实样品中的检测下限。
- pH相对标准缓冲溶液操作定义；双缓冲溶液校准给出斜率（理想值25 °C下$59.16\ \mathrm{mV}$）；常规pH可靠到约$\pm0.02$。
- ISE在匹配的离子强度（TISAB）下或用已知加入法校准；电位终点由最大斜率定，更好的办法是Gran图。
- 电位阶跃下扩散极限电流$i = nFAc\sqrt{D/(\pi t)}$；循环伏安峰正比于$\sqrt{v}$和$c$；脉冲与溶出技术达到痕量水平。
- 库仑法是绝对的：电流效率$100\ \%$时$n = Q/(zF)$；库仑法卡尔·费休可测ppm水平的水。
:::

## 习题

::: exercise 更换参比电极 {level=1 check="-0.406"}
某电位对饱和甘汞电极测得为$-0.450\ \mathrm{V}$。在$25\ ^\circ\mathrm{C}$下把它换算成对SHE和对$\mathrm{Ag/AgCl}$（饱和KCl）的值。（对$\mathrm{Ag/AgCl}$的值以V输入。）
::: solution
对SHE：$-0.450 + 0.241 = -0.209\ \mathrm{V}$。对$\mathrm{Ag/AgCl}$：$-0.209 - 0.197 = -0.406\ \mathrm{V}$。画一条数轴，SHE在$0$、$\mathrm{Ag/AgCl}$在$+0.197$、SCE在$+0.241$，这样的换算就不容易错。
:::
:::

::: exercise 体温下的能斯特斜率 {level=1 check="61.54"}
计算pH电极在$37.0\ ^\circ\mathrm{C}$下的理论斜率$RT\ln10/F$。（以每pH单位毫伏输入。）
::: solution
$T = 310.15\ \mathrm{K}$；$8.3145\times310.15\times2.30259/96\,485 = 0.06154\ \mathrm{V} = 61.54\ \mathrm{mV}$每pH单位，而$25\ ^\circ\mathrm{C}$下为$59.16$。血气分析仪恒温在$37\ ^\circ\mathrm{C}$，既为此，也出于生理原因。
:::
:::

::: exercise 酸的库仑滴定 {level=1 check="8.08"}
在阴极以恒定的$25.0\ \mathrm{mA}$发生氢氧根（$2\,\mathrm{H_2O} + 2\,\mathrm{e^-} \rightarrow \mathrm{H_2} + 2\,\mathrm{OH^-}$），滴定$10.00\ \mathrm{cm^3}$稀HCl溶液。$312\ \mathrm{s}$后到达终点。求HCl的浓度。（以$\mathrm{mmol\,dm^{-3}}$输入。）
::: solution
$Q = 0.0250\times312 = 7.80\ \mathrm{C}$；每个电子一个$\mathrm{OH^-}$，所以$n = 7.80/96\,485 = 8.08\times10^{-5}\ \mathrm{mol}$，在$10.00\ \mathrm{cm^3}$中：$8.08\ \mathrm{mmol\,dm^{-3}}$。阳极必须与溶液隔开（或使用牺牲银阳极），否则在阳极生成的酸会抵消碱。
:::
:::

::: exercise 由校准求pH {level=2 check="9.73"}
用[[#ex-ph-calibration]]的校准（斜率$58.46\ \mathrm{mV}$；pH $6.865$时$+3.0\ \mathrm{mV}$），某样品读数$-164.5\ \mathrm{mV}$，其pH是多少？在采信这一结果之前，为什么应先用硼砂缓冲溶液重新校准电极？（输入pH。）
::: solution
$\mathrm{pH} = 6.865 - (-164.5 - 3.0)/58.46 = 6.865 + 2.865 = 9.73$。样品在校准缓冲溶液夹住的区间（4.0–6.9）之外。电极斜率在整个范围内并不总是严格恒定，外推越远误差越大；应当用硼砂（pH 9.18）或碳酸盐（10.01）缓冲溶液把它夹住。
:::
:::

::: exercise 电极够好吗 {level=2 check="0.50"}
一支钠ISE要测$a_{\mathrm{Na^+}} = 2.0\times10^{-3}$、$a_{\mathrm{K^+}} = 4.0\times10^{-3}$的样品中的钠。要使钾引起的偏差低于$1\ \%$，选择性系数$k_{\mathrm{Na,K}}$最大允许多少？活度的$1\ \%$偏差相当于多大的电位差（以mV计）？（最大的$k$乘以$100$后输入。）
::: solution
偏差为$k\,a_\mathrm{K}/a_\mathrm{Na} \le 0.01$，所以$k \le 0.01\times(2.0\times10^{-3})/(4.0\times10^{-3}) = 5.0\times10^{-3}$，即$100k = 0.50$。活度变化$1\ \%$相当于$59.16\log_{10}1.01 = 0.26\ \mathrm{mV}$——与样品之间液接电位的波动相当，所以$1\ \%$的偏差本来就在直接电位法所能分辨的极限附近。
:::
:::

::: exercise 已知加入法测氟 {#exr-known-addition level=2 check="0.679"}
向TISAB中稀释的漱口水$50.00\ \mathrm{cm^3}$加入$0.500\ \mathrm{cm^3}$、$0.100\ \mathrm{mol\,dm^{-3}}$的NaF，氟ISE的电位改变$23.0\ \mathrm{mV}$。电极斜率为每十倍$59.16\ \mathrm{mV}$。求稀释样品中氟化物的浓度。（以$\mathrm{mmol\,dm^{-3}}$输入。）
::: hint
数值求解[[#eq-known-addition]]，或重排：$10^{\Delta E/S}(V_x + V_\mathrm{s})c_x = c_xV_x + c_\mathrm{s}V_\mathrm{s}$。
:::
::: solution
$10^{23.0/59.16} = 10^{0.3888} = 2.448$。于是$c_x[2.448\times50.50 - 50.00] = 0.100\times0.500$，即$c_x\times73.62 = 0.0500$，$c_x = 6.79\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 0.679\ \mathrm{mmol\,dm^{-3}}$（氟化物$12.9\ \mathrm{mg\,dm^{-3}}$）。加入量使浓度约增大到原来的两点五倍——足够大，$\Delta E$测得准；又足够小，离子强度改变不大。
:::
:::

::: exercise 由计时电流法求扩散系数 {level=3 check="1.23"}
在面积为$0.0314\ \mathrm{cm^2}$的电极上作电位阶跃，溶液为$2.00\ \mathrm{mmol\,dm^{-3}}$、$n = 1$的某可还原物质，$i$对$t^{-1/2}$的图是直线，$i\,t^{1/2} = 1.20\times10^{-5}\ \mathrm{A\,s^{1/2}}$。求$D$。（$D$以$10^{-5}\ \mathrm{cm^2\,s^{-1}}$为单位输入。）
::: hint
把科特雷尔方程平方：$D = \pi\,(it^{1/2})^2/(nFAc)^2$，$c$以$\mathrm{mol\,cm^{-3}}$计。
:::
::: solution
$nFAc = 96\,485\times0.0314\times2.00\times10^{-6} = 6.059\times10^{-3}\ \mathrm{C\,cm^{-1}}$。于是$it^{1/2}/(nFAc) = 1.20\times10^{-5}/6.059\times10^{-3} = 1.981\times10^{-3}\ \mathrm{cm\,s^{-1/2}}$，$D = \pi\times(1.981\times10^{-3})^2 = 1.23\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$——水中一个小离子的典型值。对$i$与$t^{-1/2}$作拟合而不是读单点，能平均掉噪声，并显示出短时间（双电层充电）和长时间（对流）的偏离。
:::
:::

::: exercise 分析一次电位滴定 {level=3 check="10.06"}
证明滴定弱酸时，忽略活度系数后Gran函数化为$V_\mathrm{b}10^{-\mathrm{pH}} = K_\mathrm{a}(V_\mathrm{e} - V_\mathrm{b})$，并解释为什么最靠近滴定开始的点要被剔除。用[[#ex-gran]]的数据，只用第一个和最后一个点算出截距以作验证。（由两点直线得到的$V_\mathrm{e}$以$\mathrm{cm^3}$输入。）
::: solution
推导即[[#prop-gran]]的推导，取$\gamma_{\mathrm{HA}} = \gamma_{\mathrm{A^-}} = 1$。靠近开始的点要剔除，是因为那里$[\mathrm{A^-}]$很小，而酸自身的解离（$[\mathrm{A^-}] \propto V_\mathrm{b}$这一设定中被忽略的$[\mathrm{H^+}]$项）占它的很大比例，图线因此弯曲。用第一个和最后一个点，斜率$= (1.268 - 3.733)\times10^{-4}/(8.00 - 4.00) = -6.163\times10^{-5}$，与$V_\mathrm{b}$轴的截距为$4.00 + 3.733\times10^{-4}/6.163\times10^{-5} = 4.00 + 6.06 = 10.06\ \mathrm{cm^3}$，在pH读数的舍入误差范围内与最小二乘值$10.07$一致。
:::
:::
