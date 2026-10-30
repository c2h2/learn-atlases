氢电极的标准电势在任何金属上都是一样的——按定义为零——而热力学说，在$1\ \mathrm{mol\,dm^{-3}}$酸中任何维持在$0\ \mathrm{V}$以下的电极都应该放出氢。在铂上确实如此：超过平衡几十毫伏就有一串急促的气泡。在铅或汞上，直到电极约负一伏才几乎什么也不发生。铅酸电池的负极板比氢电势低$0.36\ \mathrm{V}$，没有这种迟缓它就不可能存在；锌的电积与汞上的极谱法同样不可能存在。金属之间的差别不是热力学的，而是动力学的：在给定对平衡的偏离下，穿过界面的电子转移*速率*在不同金属之间相差十个数量级。

本章建立电极反应的动力学。核心思想——它使电化学动力学异常干净——是电极电势直接作用于活化吉布斯能：电势改变$0.1\ \mathrm{V}$，电子的能量就改变$9.6\ \mathrm{kJ\,mol^{-1}}$，而这一改变的一部分进入能垒。由此我们将导出巴特勒-福尔默（Butler–Volmer）方程、交换电流密度、电荷转移电阻与塔菲尔定律，再加入传质得到完整的电流-电势曲线，并简略讨论马库斯（Marcus）理论以及析氢这样的多步反应。背景是过渡态理论（[[kinetics/transition-state-theory]]）与界面结构（[[electrochemistry/double-layer]]）。

## 电流就是反应速率

对电极反应$\mathrm{O} + n\mathrm{e^-} \rightleftharpoons \mathrm{R}$，每还原一摩尔O就载着$nF$的电荷穿过界面，所以电流无非是以安培量度的反应速率。

::: definition 法拉第电流密度与超电势 {#def-overpotential}
通过电极的**法拉第电流**$I$是由穿过其界面的电子转移引起的电流；**电流密度**为$j = I/A$。按IUPAC符号约定，阳极（氧化）电流为正，阴极（还原）电流为负。若单位面积的净氧化速率为$v_\mathrm{net} = v_\mathrm{ox} - v_\mathrm{red}$（单位$\mathrm{mol\,m^{-2}\,s^{-1}}$），则
$$
j = nFv_\mathrm{net} = nF(v_\mathrm{ox} - v_\mathrm{red}) .
$$
**超电势**是电极电势对其平衡（零电流）值的偏离，
$$
\eta = E - E_\mathrm{eq} ,
$$ {#eq-eta}
其中$E_\mathrm{eq}$由能斯特方程对体相溶液组成给出。阳极电流要求$\eta > 0$，阴极电流$\eta < 0$。
:::

法拉第电解定律（1833–1834年）就是"$I\,\mathrm{d}t = nF\,\mathrm{d}n_\mathrm{reacted}$"这一陈述。它在动力学中的威力在于：一微安的电流容易测量，而它只对应$10^{-11}\ \mathrm{mol\,s^{-1}}$的反应：电化学以极好的灵敏度测量速率，并用一个旋钮控制它们。

正反两个电子转移的速率对O与R的表面浓度是一级的：
$$
v_\mathrm{red} = k_\mathrm{red}\,c_\mathrm{O}(0,t), \qquad v_\mathrm{ox} = k_\mathrm{ox}\,c_\mathrm{R}(0,t),
$$
其中$c(0,t)$是电极表面（严格说是外亥姆霍兹平面处）的浓度，异相速率常数$k_\mathrm{red}$与$k_\mathrm{ox}$具有$\mathrm{m\,s^{-1}}$的单位（常用$\mathrm{cm\,s^{-1}}$标值），因为它们把体相浓度变成单位面积的通量。整个学科讲的就是这些速率常数对电势的依赖。

## 电势如何改变能垒

沿$\mathrm{O} + \mathrm{e^-}(\text{金属}) \rightarrow \mathrm{R}$的反应坐标想象体系的吉布斯能。左端，电子在金属中，O坐在界面处；右端，电子在R上。若电极电势升高$\Delta E$，金属中电子的电化学势下降$F\Delta E$（[[electrochemistry/cell-thermodynamics#def-echem-potential]]），于是左端（反应物）曲线相对右端下降$F\Delta E$。在交叉点附近，还原的能垒按其中一部分升高，氧化的能垒按其余部分下降。

::: definition 传递系数 {#def-alpha}
对单电子步骤，**传递系数**$\alpha$（对单一基元步骤亦称对称因子$\beta$）是电能改变$F(E - E^{\circ\prime})$中出现在还原活化吉布斯能里的份额：
$$
\Delta^\ddagger G_\mathrm{red} = \Delta^\ddagger G_0 + \alpha F(E - E^{\circ\prime}), \qquad
\Delta^\ddagger G_\mathrm{ox} = \Delta^\ddagger G_0 - (1-\alpha)F(E - E^{\circ\prime}),
$$
其中$\Delta^\ddagger G_0$是形式电势$E^{\circ\prime}$处共同的能垒。对斜率相近的相交曲线，$\alpha \approx 0.5$；实验值通常介于$0.3$与$0.7$之间。
:::

::: proposition 速率常数的电势依赖 {#prop-rate-constants}
对单电子外层反应，记$f \equiv F/RT$（$25\,^\circ\mathrm{C}$下$38.92\ \mathrm{V^{-1}}$），
$$
k_\mathrm{red} = k^\circ\exp\!\left[-\alpha f(E - E^{\circ\prime})\right], \qquad
k_\mathrm{ox} = k^\circ\exp\!\left[(1-\alpha)f(E - E^{\circ\prime})\right],
$$ {#eq-k}
其中$k^\circ$——**标准异相速率常数**——是$E = E^{\circ\prime}$处两个速率常数的共同值。平衡时这些速率方程复现能斯特方程。
:::

::: proof
过渡态理论（[[kinetics/transition-state-theory]]）把每个速率常数写成指前因子乘$\exp(-\Delta^\ddagger G/RT)$。代入[[#def-alpha]]的能垒，两个方向用同一指前因子$Z$，
$$
k_\mathrm{red} = Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}\mathrm{e}^{-\alpha f(E - E^{\circ\prime})}, \qquad
k_\mathrm{ox} = Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}\mathrm{e}^{(1-\alpha)f(E - E^{\circ\prime})},
$$
公共因子$Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}$就是$k^\circ$。为求自洽，平衡且无净电流时$k_\mathrm{red}c_\mathrm{O} = k_\mathrm{ox}c_\mathrm{R}$，故
$$
\frac{c_\mathrm{O}}{c_\mathrm{R}} = \frac{k_\mathrm{ox}}{k_\mathrm{red}} = \mathrm{e}^{f(E - E^{\circ\prime})}, \qquad E = E^{\circ\prime} + \frac{RT}{F}\ln\frac{c_\mathrm{O}}{c_\mathrm{R}},
$$
这就是以形式电势表示的能斯特方程。[[#eq-k]]的两个指数必须恰好差$f(E - E^{\circ\prime})$才能做到这一点，这就是$\alpha$与$1 - \alpha$成对出现的原因。
:::

效应的大小正是电化学威力的精髓。$25\,^\circ\mathrm{C}$、$\alpha = 0.5$时$\alpha f = 19.5\ \mathrm{V^{-1}}$，电势移动$118\ \mathrm{mV}$就使速率常数变十倍，一伏就变八个数量级。要用温度达到同样的效果，需要把一个能垒$50\ \mathrm{kJ\,mol^{-1}}$的反应从室温加热到远远超过$1000\ \mathrm{K}$。

## 巴特勒-福尔默方程

::: proposition 巴特勒-福尔默方程 {#prop-bv}
当表面浓度等于体相浓度$c_\mathrm{O}^*$与$c_\mathrm{R}^*$（快速传质，或小电流）时，超电势$\eta$下单电子反应的电流密度为
$$
j = j_0\left[\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}\right],
$$ {#eq-bv}
其中**交换电流密度**为
$$
j_0 = Fk^\circ\left(c_\mathrm{O}^*\right)^{1-\alpha}\left(c_\mathrm{R}^*\right)^{\alpha} .
$$ {#eq-j0}
:::

::: proof
净电流为$j = F(k_\mathrm{ox}c_\mathrm{R}^* - k_\mathrm{red}c_\mathrm{O}^*)$。平衡时两项相等；每一项都是交换电流密度，$j_0 = Fk_\mathrm{red}(E_\mathrm{eq})c_\mathrm{O}^* = Fk_\mathrm{ox}(E_\mathrm{eq})c_\mathrm{R}^*$。代入[[#eq-k]]，用$E_\mathrm{eq} - E^{\circ\prime} = (1/f)\ln(c_\mathrm{O}^*/c_\mathrm{R}^*)$：
$$
j_0 = Fk^\circ c_\mathrm{O}^*\left(\frac{c_\mathrm{O}^*}{c_\mathrm{R}^*}\right)^{-\alpha} = Fk^\circ\left(c_\mathrm{O}^*\right)^{1-\alpha}\left(c_\mathrm{R}^*\right)^{\alpha} .
$$
现在把每个速率常数中的$E - E^{\circ\prime} = \eta + (E_\mathrm{eq} - E^{\circ\prime})$代入。则$Fk_\mathrm{red}c_\mathrm{O}^* = Fk_\mathrm{red}(E_\mathrm{eq})c_\mathrm{O}^*\,\mathrm{e}^{-\alpha f\eta} = j_0\mathrm{e}^{-\alpha f\eta}$，同理$Fk_\mathrm{ox}c_\mathrm{R}^* = j_0\mathrm{e}^{(1-\alpha)f\eta}$。二者之差即[[#eq-bv]]。
:::

交换电流密度是电极的核心动力学参数。平衡时净电流为零，但氧化与还原都在进行，各以$j_0/F$的速率进行；$j_0$量度界面在两个方向上传递电荷的难易程度，它依赖浓度、电极材料及其表面状态。

::: example 交换电流与快速电对 {#ex-j0}
一个单电子氧化还原媒介体在金电极上$k^\circ = 1.0\times10^{-3}\ \mathrm{cm\,s^{-1}}$、$\alpha = 0.50$，两种型体各为$1.0\ \mathrm{mmol\,dm^{-3}}$。求$j_0$，以及$25\,^\circ\mathrm{C}$下$\eta = +50\ \mathrm{mV}$与$\eta = +200\ \mathrm{mV}$时的电流密度（忽略传质）。
::: solution
以$c = 1.0\ \mathrm{mmol\,dm^{-3}} = 1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$，
$$
j_0 = Fk^\circ c = 96\,485\ \mathrm{C\,mol^{-1}}\times1.0\times10^{-3}\ \mathrm{cm\,s^{-1}}\times1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}} = 9.6\times10^{-5}\ \mathrm{A\,cm^{-2}} = 96\ \mu\mathrm{A\,cm^{-2}} .
$$
$\eta = 0.050\ \mathrm{V}$时：$\alpha f\eta = (1-\alpha)f\eta = 0.973$，故$j = j_0(\mathrm{e}^{0.973} - \mathrm{e}^{-0.973}) = j_0(2.646 - 0.378) = 2.27j_0 = 0.22\ \mathrm{mA\,cm^{-2}}$。$\eta = 0.200\ \mathrm{V}$时：$(1-\alpha)f\eta = 3.89$，且$j = j_0(49.0 - 0.020) = 49j_0 = 4.7\ \mathrm{mA\,cm^{-2}}$。实际上，毫摩尔溶液产生这么大的电流会被传质限制（它超过了静止溶液的扩散限制电流），这就是我们需要[[#prop-full]]的原因。注意浓度单位的陷阱：$k^\circ$以$\mathrm{cm\,s^{-1}}$计时要给出$\mathrm{A\,cm^{-2}}$，$c$必须以$\mathrm{mol\,cm^{-3}}$计。
:::
:::

### 两个极限：线性与塔菲尔

::: proposition 低、高超电势极限 {#prop-limits}
(1) 对$|\eta| \ll RT/F$（实际$|\eta| \lesssim 10\ \mathrm{mV}$），巴特勒-福尔默方程是线性的：
$$
j = j_0f\eta, \qquad R_\mathrm{ct} \equiv \frac{\eta}{j} = \frac{RT}{Fj_0},
$$ {#eq-rct}
其中$R_\mathrm{ct}$是**电荷转移电阻**（单位$\Omega\,\mathrm{m^2}$或$\Omega\,\mathrm{cm^2}$）。
(2) 对$|\eta| \gg RT/F$（$\alpha \approx 0.5$时实际$|\eta| \gtrsim 100\ \mathrm{mV}$），一个指数占优，超电势对电流取对数——**塔菲尔定律**：
$$
\eta = \frac{RT}{(1-\alpha)F}\ln\frac{j}{j_0} \quad (\text{阳极}), \qquad
\eta = -\frac{RT}{\alpha F}\ln\frac{|j|}{j_0} \quad (\text{阴极}) .
$$ {#eq-tafel}
写成$\eta = a + b\log_{10}|j|$，**塔菲尔斜率**为$b = 2.303RT/(1-\alpha)F$（阳极）或$-2.303RT/\alpha F$（阴极），即$25\,^\circ\mathrm{C}$下$\alpha = 0.5$时每十倍$118\ \mathrm{mV}$；$\log_{10}|j|$对$\eta$作图在$\eta = 0$处的截距为$\log_{10}j_0$。
:::

::: proof
(1) 两个指数都展开到一阶：$\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta} \approx [1 + (1-\alpha)f\eta] - [1 - \alpha f\eta] = f\eta$，与$\alpha$无关。误差量级$(f\eta)^2(1-2\alpha)/2$，$\alpha$接近$0.5$时即使略超$10\ \mathrm{mV}$也很小。(2) $\eta \gg 1/f$时，$\mathrm{e}^{-\alpha f\eta}$与$\mathrm{e}^{(1-\alpha)f\eta}$相比可以忽略——$\eta = 118\ \mathrm{mV}$、$\alpha = 0.5$时被弃项是保留项的$1\,\%$——于是$j = j_0\mathrm{e}^{(1-\alpha)f\eta}$；取对数得阳极形式。$\eta \ll -1/f$时同理得阴极形式。换以10为底引入因子$\ln10 = 2.303$，$25\,^\circ\mathrm{C}$下$2.303RT/F = 59.16\ \mathrm{mV}$。
:::

线性区是阻抗与线性极化测量的基础，包括[[electrochemistry/corrosion]]中的腐蚀速率测量仪：$10\ \mathrm{mV}$的扰动太小，伤不了电极，却足以测出$R_\mathrm{ct}$，从而测出$j_0$。塔菲尔区是电解槽、燃料电池与多数电合成工作的区域，塔菲尔图是提取$\alpha$与$j_0$的标准方法。

::: example 电荷转移电阻 {#ex-rct}
对[[#ex-j0]]的电对（$j_0 = 96\ \mu\mathrm{A\,cm^{-2}}$），求单位面积的$R_\mathrm{ct}$、面积$0.0707\ \mathrm{cm^2}$的圆盘电极的$R_\mathrm{ct}$，以及$\eta = 5.0\ \mathrm{mV}$时的电流。
::: solution
$$
R_\mathrm{ct} = \frac{RT}{Fj_0} = \frac{0.025693\ \mathrm{V}}{9.65\times10^{-5}\ \mathrm{A\,cm^{-2}}} = 266\ \Omega\,\mathrm{cm^2} .
$$
对$A = 0.0707\ \mathrm{cm^2}$，$R = 266/0.0707 = 3.77\ \mathrm{k\Omega}$——面积比电阻要*除以*面积。$\eta = 5.0\ \mathrm{mV}$时，$I = \eta/R = 5.0\times10^{-3}/3770\ \mathrm{A} = 1.33\ \mu\mathrm{A}$。在阻抗谱中，$R_\mathrm{ct}$与双电层电容（[[electrochemistry/double-layer]]）并联，表现为复平面上一个直径为$R_\mathrm{ct}$的半圆；取$C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$，其峰位于$\omega = 1/R_\mathrm{ct}C_\mathrm{d} = 1/(266\times20\times10^{-6}) = 188\ \mathrm{rad\,s^{-1}}$，约$30\ \mathrm{Hz}$。
:::
:::

::: widget plot
f: j0*(exp((1-al)*38.92*x) - exp(-al*38.92*x)); j0*exp((1-al)*38.92*x); -j0*exp(-al*38.92*x)
x: -0.25, 0.25
y: -10, 10
sliders: j0=1:0.01:5:0.01; al=0.5:0.2:0.8:0.01
labels: \text{Butler–Volmer } j; \text{阳极支}; \text{阴极支}
hlines: 0
caption: 巴特勒-福尔默方程[[#eq-bv]]：电流密度（以$j_0$的单位计，如$\mathrm{mA\,cm^{-2}}$）对超电势$\eta$（以V计）在$25\,^\circ\mathrm{C}$下的曲线。净电流是两个指数偏电流之差。$\eta = 0$附近曲线是斜率为$fj_0$（$R_\mathrm{ct}$的倒数）的直线；超过约$\pm0.1\ \mathrm{V}$它就只沿一支走（塔菲尔）。把$j_0$降到$0.01$看看不可逆体系：加很大的超电势之前几乎没有电流。把$\alpha$移离$0.5$使曲线不对称——$\alpha$减小时阳极支变陡。
:::

::: warning 交换电流不是速率常数 {#warn-j0}
学生们常把不同实验的$j_0$当作电对本身的性质来比较。其实不然：由[[#eq-j0]]，$j_0$正比于$(c_\mathrm{O}^*)^{1-\alpha}(c_\mathrm{R}^*)^\alpha$，所以溶液稀释十倍$j_0$就降十倍。与浓度无关的动力学参数是$k^\circ$。析氢的$j_0$表值都是按指定条件（$1\ \mathrm{mol\,dm^{-3}}$酸、$1\ \mathrm{bar}$ $\mathrm{H_2}$）标出的。两个相关的错误：在几十毫伏的超电势下用塔菲尔方程——此时逆反应不可忽略（$\alpha = 0.5$时$50\ \mathrm{mV}$处误差为$17\,\%$）；以及把每十倍$59\ \mathrm{mV}$的塔菲尔斜率对单电子转移读成"$\alpha = 1$"，而它通常预示的是首次电子转移之后跟着一个化学步骤的多步机理。
:::

## 塔菲尔分析

::: example 析氢的塔菲尔图 {#ex-tafel}
某金属上$1\ \mathrm{mol\,dm^{-3}}$酸中$25\,^\circ\mathrm{C}$的析氢，超电势（已作欧姆降校正）在$|j| = 0.10\ \mathrm{mA\,cm^{-2}}$时为$-0.240\ \mathrm{V}$，$1.0\ \mathrm{mA\,cm^{-2}}$时为$-0.360\ \mathrm{V}$，$10\ \mathrm{mA\,cm^{-2}}$时为$-0.480\ \mathrm{V}$。求塔菲尔斜率、$\alpha$与$j_0$。
::: solution
电流每十倍代价$120\ \mathrm{mV}$，故$b = -0.120\ \mathrm{V\,dec^{-1}}$。由$b = -2.303RT/\alpha F$，
$$
\alpha = \frac{0.05916\ \mathrm{V}}{0.120\ \mathrm{V}} = 0.49 .
$$
外推到$\eta = 0$：从中间那点，$\log_{10}(|j|/\mathrm{A\,cm^{-2}}) = \log_{10}(1.0\times10^{-3}) - 0.360/0.120 = -3 - 3 = -6$，故$j_0 = 1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}$。这个$j_0$与斜率是铁或镍的典型值。两点实用告诫：外推跨越了数据以下三个数量级，斜率的小误差在$j_0$上会造成大误差；而这些电流下必须控制气泡与欧姆降，否则图在大电流处向上弯曲。
:::
:::

::: widget regression
points: -4,-0.240; -3,-0.360; -2,-0.480
degree: 1
x: -7, -1
y: -0.6, 0.1
caption: [[#ex-tafel]]的塔菲尔数据：超电势$\eta$（以V计）对$\log_{10}(|j|/\mathrm{A\,cm^{-2}})$。拟合直线的斜率是塔菲尔斜率$b$，它在$\eta = 0$处对应的$x$值是$\log_{10}j_0$（这里是$-6$）。在$x = -5.5$附近、$\eta = -0.05$处加一个点——真实电极在平衡附近、逆反应重要处会呈现的样子——看看混入非塔菲尔数据会怎样同时扭曲斜率与外推的$j_0$。
:::

析氢把材料依赖表现得淋漓尽致。$1\ \mathrm{mol\,dm^{-3}}$酸中$25\,^\circ\mathrm{C}$的代表性交换电流密度（Trasatti，1972年的汇编）从铂上约$10^{-3}\ \mathrm{A\,cm^{-2}}$，经过镍与铁上的$10^{-5}$–$10^{-6}$，直到铅与汞上的$10^{-12}$–$10^{-13}$。要通过$10\ \mathrm{mA\,cm^{-2}}$，铂只需几十毫伏；铅按$b \approx 120\ \mathrm{mV}$每十倍需要$0.120\times\log_{10}(10^{-2}/10^{-12}) = 1.2\ \mathrm{V}$。正是这种**氢超电势**使铅酸电池能给负极板充电，使锌能从酸性硫酸盐溶液中电积出来，使汞与铅电极能在水"应该"先被还原的电势下还原有机化合物。

::: quiz
某电极反应$j_0 = 1.0\ \mathrm{mA\,cm^{-2}}$、$\alpha = 0.5$。$25\,^\circ\mathrm{C}$下要得到$10\ \mathrm{mA\,cm^{-2}}$的阳极电流密度需要多大超电势（传质很快）？
- [ ] 约$59\ \mathrm{mV}$
- [x] 约$118\ \mathrm{mV}$
- [ ] 约$257\ \mathrm{mV}$，由$\eta = jR_\mathrm{ct}$
- [ ] 约$1.2\ \mathrm{V}$
::: solution
塔菲尔区中$j_0$以上一个十倍代价一个塔菲尔斜率，$2.303RT/(1-\alpha)F = 118\ \mathrm{mV}$。（巴特勒-福尔默的精确值——由$2\sinh(f\eta/2) = 10$——是$119\ \mathrm{mV}$；逆反应此时已只占$1\,\%$。）线性公式$\eta = jR_\mathrm{ct} = j/(fj_0) = 0.26\ \mathrm{V}$只在$|\eta| \lesssim 10\ \mathrm{mV}$时成立，这里完全失效；$1.2\ \mathrm{V}$相当于十个塔菲尔斜率，即十个数量级的电流。
:::
:::

## 加入传质

大超电势下反应物的表面浓度降到体相值以下，因为反应消耗它的速度快于扩散与对流补充它的速度。速率方程就需要表面浓度。

::: proposition 含传质的电流-超电势方程 {#prop-full}
若电极与溶液之间的传质由极限电流密度$j_{\mathrm{l,a}}$（对R，阳极）与$j_{\mathrm{l,c}}$（对O，阴极，取正值）描述，使得$c_\mathrm{R}(0)/c_\mathrm{R}^* = 1 - j/j_\mathrm{l,a}$、$c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c}$，则
$$
j = j_0\left[\frac{c_\mathrm{R}(0)}{c_\mathrm{R}^*}\mathrm{e}^{(1-\alpha)f\eta} - \frac{c_\mathrm{O}(0)}{c_\mathrm{O}^*}\mathrm{e}^{-\alpha f\eta}\right]
= \frac{\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}}{\dfrac{1}{j_0} + \dfrac{\mathrm{e}^{(1-\alpha)f\eta}}{j_\mathrm{l,a}} + \dfrac{\mathrm{e}^{-\alpha f\eta}}{j_\mathrm{l,c}}} .
$$ {#eq-full}
:::

::: proof
在速率方程中使用表面浓度，重做[[#prop-bv]]的推导：$j = F[k_\mathrm{ox}c_\mathrm{R}(0) - k_\mathrm{red}c_\mathrm{O}(0)]$，每一项各除以再乘以其体相浓度，即得第一形式。至于第二形式，表面浓度与电流之间的线性关系来自厚度$\delta$固定的稳态扩散层（[[electrochemistry/voltammetry]]的能斯特扩散层模型）：O到达表面的通量为$D_\mathrm{O}(c_\mathrm{O}^* - c_\mathrm{O}(0))/\delta = -j/F$（阴极$j < 0$），其最大值在$c_\mathrm{O}(0) = 0$处，为$j_\mathrm{l,c}/F = D_\mathrm{O}c_\mathrm{O}^*/\delta$；两式相除得$c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c}$，对R同理。代入得
$$
j = j_0\left[\left(1 - \frac{j}{j_\mathrm{l,a}}\right)\mathrm{e}^{(1-\alpha)f\eta} - \left(1 + \frac{j}{j_\mathrm{l,c}}\right)\mathrm{e}^{-\alpha f\eta}\right],
$$
把含$j$的项归到左边即得第二形式。
:::

分母是速率意义上的"串联电阻"之和：小$\eta$时动力学项$1/j_0$占主导；大$|\eta|$时一个指数增长，相应的传质项接管，电流饱和于$j_\mathrm{l,a}$或$-j_\mathrm{l,c}$。当$j_0 \gg j_\mathrm{l}$时称电极为**可逆**（电化学上的），使界面在任何电流下都与表面浓度保持能斯特平衡，曲线完全由传质支配；$j_0 \ll j_\mathrm{l}$时为**不可逆**，需要很大的超电势才有电流流过。同一个电对可以呈现两种行为之一，取决于物质输运有多快——这一区分对[[electrochemistry/voltammetry]]至关重要。

::: widget plot
f: (exp((1-al)*38.92*x) - exp(-al*38.92*x))/(1/j0 + exp((1-al)*38.92*x)/jl + exp(-al*38.92*x)/jl); j0*(exp((1-al)*38.92*x) - exp(-al*38.92*x))
x: -0.5, 0.5
y: -8, 8
sliders: j0=1:0.0001:20:0.0001; al=0.5:0.2:0.8:0.01; jl=5:1:10:0.1
labels: \text{含传质}; \text{仅巴特勒-福尔默}
hlines: 5; -5
caption: 完整电流-超电势曲线[[#eq-full]]（电流密度以$\mathrm{mA\,cm^{-2}}$计，$\eta$以V计，$25\,^\circ\mathrm{C}$），阳极与阴极极限电流$j_\mathrm{l}$相等，并与不受传质限制的巴特勒-福尔默曲线对比。$j_0 = 20$（可逆）时曲线是一条陡直的S形，约在$\pm0.1\ \mathrm{V}$内到达平台，其形状不再依赖$j_0$或$\alpha$。把$j_0$降到$0.001$（不可逆），曲线分裂成相隔几百毫伏的独立阳极波与阴极波，其上升部分就是塔菲尔线。
:::

## 不扰动电极测动力学：阻抗

塔菲尔分析把电极驱动到远离平衡处，这可能改变其表面。[[#prop-limits]]的线性区提供更温和的途径。在平衡电势附近施加$5$–$10\ \mathrm{mV}$的小正弦电势$\Delta E\sin\omega t$，在一系列角频率$\omega$上测量电流的幅值与相位。二者之比——复**阻抗**$Z(\omega)$——是电路阻抗的电化学类比。对传质快的简单电子转移，界面表现为电荷转移电阻$R_\mathrm{ct}$与双电层电容$C_\mathrm{d}$（[[electrochemistry/double-layer]]）并联，再与未补偿溶液电阻$R_\mathrm{u}$串联——即**兰德尔（Randles）电路**（不含其扩散的瓦堡元件）：
$$
Z(\omega) = R_\mathrm{u} + \frac{R_\mathrm{ct}}{1 + \mathrm{i}\omega R_\mathrm{ct}C_\mathrm{d}} = R_\mathrm{u} + \frac{R_\mathrm{ct}}{1 + (\omega R_\mathrm{ct}C_\mathrm{d})^2} - \mathrm{i}\,\frac{\omega R_\mathrm{ct}^2C_\mathrm{d}}{1 + (\omega R_\mathrm{ct}C_\mathrm{d})^2} .
$$
把$-\mathrm{Im}\,Z$对$\mathrm{Re}\,Z$作图（**奈奎斯特图**），描出一个半圆：高频时电容使界面短路，$Z \rightarrow R_\mathrm{u}$；低频时电容断开，$Z \rightarrow R_\mathrm{u} + R_\mathrm{ct}$；半圆顶点$-\mathrm{Im}\,Z = R_\mathrm{ct}/2$位于$\omega = 1/R_\mathrm{ct}C_\mathrm{d}$。于是一次测量就分别给出$R_\mathrm{u}$、$R_\mathrm{ct}$（从而$j_0$）与$C_\mathrm{d}$——单条电流-电势曲线混在一起的三个量。频率再低，扩散加上$45^\circ$的直线（瓦堡阻抗）；在电池与燃料电池中出现多个半圆，每个界面或过程各按其自身时间常数占一个。

::: widget parametric
fx: Ru + Rct/(1 + (10^t*Rct*C*1e-6)^2)
fy: 10^t*Rct^2*C*1e-6/(1 + (10^t*Rct*C*1e-6)^2)
t: -1, 6
x: 0, 160
y: 0, 80
sliders: Ru=20:0:50:1; Rct=100:10:140:1; C=20:5:50:1
equal: true
caption: 兰德尔电路的奈奎斯特图：$-\mathrm{Im}\,Z$对$\mathrm{Re}\,Z$（都以$\Omega$计），角频率$\omega = 10^{t}\ \mathrm{rad\,s^{-1}}$从$0.1$扫到$10^{6}\ \mathrm{rad\,s^{-1}}$；动点跟随频率。滑块：溶液电阻$R_\mathrm{u}$、电荷转移电阻$R_\mathrm{ct}$与以$\mu\mathrm{F}$计的双电层电容$C$。半圆始于$R_\mathrm{u}$（高频，左），终于$R_\mathrm{u} + R_\mathrm{ct}$（低频，右）。改变$C$不改变形状——只改变哪个频率位于顶点（$\omega = 1/R_\mathrm{ct}C$，默认$500\ \mathrm{rad\,s^{-1}}$）——这就是阻抗谱总要标明频率的原因。
:::

## 超越巴特勒-福尔默：马库斯理论

巴特勒-福尔默方程把$\alpha$当作常数，使塔菲尔图完全笔直。鲁道夫·马库斯（Rudolph Marcus）的电子转移理论（1956年用于均相反应；1965年推广到电极）预言它们应当弯曲。电子转移远快于核运动，所以只能发生在反应物态与产物态能量相等的核构型上（弗兰克-康登原理）。若每个态的吉布斯能是一个集体溶剂坐标的抛物线、曲率相同，则取**重组能**$\lambda$——不转移电子而把反应物及其溶剂壳畸变到产物的平衡构型所需的能量——电极上还原的活化吉布斯能为
$$
\Delta^\ddagger G_\mathrm{red} = \frac{\left[\lambda + F(E - E^{\circ\prime})\right]^2}{4\lambda}
$$
（每摩尔；对外亥姆霍兹平面处的反应，忽略功项）。$E = E^{\circ\prime}$时能垒为$\lambda/4$。对$F(E - E^{\circ\prime})$求导得传递系数
$$
\alpha = \frac{\partial\Delta^\ddagger G_\mathrm{red}}{\partial[F(E - E^{\circ\prime})]} = \frac{1}{2} + \frac{F(E - E^{\circ\prime})}{2\lambda},
$$
在形式电势处等于$\tfrac{1}{2}$，并随电势线性变化。典型重组能$0.5$–$1.5\ \mathrm{eV}$（$50$–$150\ \mathrm{kJ\,mol^{-1}}$）时，$\alpha$每$100\ \mathrm{mV}$只变约$0.05$，这就是塔菲尔图在一二十个十倍范围内看起来是直的原因；在宽超电势范围内的精细测量（奇德西（Chidsey），1991年，用经链烷硫醇单分子层拴在金上的氧化还原基团）证实了弯曲。在金属电极上达不到均相马库斯理论的"反转区"，因为金属在连续的能量范围内提供电子；速率在大超电势下转为持平。这一切源自溶液中外层电子转移的理论，该理论见[[coordination-chemistry/inorganic-mechanisms]]。

::: example 依赖电势的传递系数 {#ex-marcus}
某电对$\lambda = 1.00\ \mathrm{eV}$（$96.5\ \mathrm{kJ\,mol^{-1}}$）。求$E - E^{\circ\prime} = 0$与$-0.30\ \mathrm{V}$处的还原活化吉布斯能与$\alpha$。
::: solution
以电子伏特按每个电子计算（于是$F(E - E^{\circ\prime})$变为$e(E - E^{\circ\prime})$）：$E = E^{\circ\prime}$时$\Delta^\ddagger G = \lambda/4 = 0.250\ \mathrm{eV}$（$24.1\ \mathrm{kJ\,mol^{-1}}$），$\alpha = 0.50$。$-0.30\ \mathrm{V}$时：
$$
\Delta^\ddagger G = \frac{(1.00 - 0.30)^2}{4\times1.00}\ \mathrm{eV} = 0.1225\ \mathrm{eV}\ (11.8\ \mathrm{kJ\,mol^{-1}}), \qquad
\alpha = \frac{1}{2} - \frac{0.30}{2\times1.00} = 0.35 .
$$
巴特勒-福尔默取恒定$\alpha = 0.5$的预言是$0.250 - 0.5\times0.30 = 0.100\ \mathrm{eV}$：能垒下降得比线性*更慢*，于是$-0.30\ \mathrm{V}$处的速率常数比直塔菲尔线的预言小，小$\mathrm{e}^{(0.1225 - 0.100)/0.025693} = 2.4$倍。跨$300\ \mathrm{mV}$，实测塔菲尔斜率将从$118$变陡向每十倍$170\ \mathrm{mV}$。
:::
:::

## 多步反应：氢电极

多数有实际重要性的反应转移不止一个电子，并涉及吸附中间体。金属M上酸中的析氢经过吸附的氢原子$\mathrm{H_{ad}}$：
$$
\begin{aligned}
&\text{福尔默（放电）：} && \mathrm{H^+ + e^- + M \rightarrow M\text{–}H_{ad}}\\
&\text{海洛夫斯基（电化学脱附）：} && \mathrm{M\text{–}H_{ad} + H^+ + e^- \rightarrow M + H_2}\\
&\text{塔菲尔（复合）：} && \mathrm{2\,M\text{–}H_{ad} \rightarrow 2M + H_2}
\end{aligned}
$$
存在两条路径——福尔默-海洛夫斯基与福尔默-塔菲尔——而决速步在塔菲尔斜率上留下指纹。若第一个电子转移（福尔默步）是决速步，斜率为$2.303RT/\alpha F \approx 118\ \mathrm{mV}$每十倍。若福尔默步快且处于平衡、第二个电子转移（海洛夫斯基步）是决速步，$\mathrm{H_{ad}}$的表面覆盖度本身随$-\eta$指数增加（低覆盖度下），给指数加上完整的因子$f$：斜率变为$2.303RT/(1+\alpha)F \approx 40\ \mathrm{mV}$每十倍。若快的福尔默平衡之后化学复合（塔菲尔步）是决速步，速率按覆盖度的平方变化，斜率为$2.303RT/2F \approx 30\ \mathrm{mV}$每十倍，如酸中铂上的情形。

::: algorithm 由塔菲尔斜率诊断机理 {#alg-tafel}
1. 在塔菲尔区测量至少两个十倍以上的稳态$|j|$，对$\eta$作欧姆降（$\eta_\mathrm{true} = \eta_\mathrm{meas} - jR_\mathrm{u}$）与传质校正，把$\eta$对$\log_{10}|j|$作图。
2. 读出斜率$b$，换算成*表观*传递系数$\alpha_\mathrm{app} = 2.303RT/(F|b|)$；上述三种经典情形它的值分别为$\alpha$、$1 + \alpha$或$2$（更一般地，是决速步之前和之中转移的电子数）。
3. 测量对每个反应物（如$\mathrm{H^+}$）的反应级数$(\partial\log|j|/\partial\log c_i)_\eta$。
4. 提出与斜率和级数都相容的机理，并在其他温度、pH或表面覆盖度下检验其预言。塔菲尔斜率本身很少能证明一个机理：不同的机理可以共享同一个斜率，而覆盖度效应会使斜率随电势改变。
:::

福尔默步的速率取决于M–H键的强度。太弱，金属留不住氢原子以形成$\mathrm{H_2}$；太强，吸附的原子使表面中毒。$\log j_0$对M–H键能作图形成一座**火山**，铂族金属居其顶，这是催化中萨巴捷耶（Sabatier）原理的直接表达（[[kinetics/surface-kinetics]]）。在火山顶端附近设计更廉价的催化剂是[[electrochemistry/fuel-cells-electrolysis]]的课题之一。

::: history 从塔菲尔定律到马库斯 {#hist-kinetics}
尤利乌斯·塔菲尔（Julius Tafel）在维尔茨堡研究有机化合物的电还原，1905年报告析氢的超电势随电流密度的对数线性增加。约翰·阿尔弗雷德·瓦伦丁·巴特勒（John Alfred Valentine Butler，1924年）与蒂博尔·埃尔代-格鲁茨（Tibor Erdey-Grúz）和马克斯·福尔默（Max Volmer，1930年）让电极电势降低一个活化能垒、抬高另一个，给出了理论解释；亚历山大·弗鲁姆金（Alexander Frumkin，1933年）加上了扩散层电势降的校正。掘越鲁郎（Juro Horiuti）与迈克尔·波兰尼（Michael Polanyi，1935年）用相交的势能曲线解释传递系数，罗纳德·格尼（Ronald Gurney，1931年）此前已给出电极上电子转移的量子力学处理。鲁道夫·马库斯的球外电子转移理论（1956年）于1965年推广到电极，并获1992年诺贝尔化学奖的认可，引入了重组能并预言了$\alpha$的电势依赖；海因茨·格里舍（Heinz Gerischer，1960年代）发展了用电极与溶液中电子态分布的描述。
:::

## 后续内容

巴特勒-福尔默方程及其传质推广是本课程其余部分的工作方程。[[electrochemistry/voltammetry]]把它们与扩散结合，给出循环伏安图的形状，其峰间距测量$k^\circ$。在[[electrochemistry/batteries]]与[[electrochemistry/fuel-cells-electrolysis]]中，两个电极的活化超电势连同欧姆与传质损失，解释了为什么真实电池的输出低于其热力学电压、电解槽为何需要更高的电压；氧电极即使铂上$j_0$也只有约$10^{-9}\ \mathrm{A\,cm^{-2}}$，是主要元凶。在[[electrochemistry/corrosion]]中，同一金属上两个不同反应的塔菲尔线相交于腐蚀电势，这是埃文斯图以及由极化电阻测量腐蚀速率的基础。电极动力学的分析应用见[[analytical-chemistry/electroanalytical]]。

::: summary
- 电流是反应速率：$j = nF(v_\mathrm{ox} - v_\mathrm{red})$；超电势$\eta = E - E_\mathrm{eq}$是驱动它所需的对能斯特电势的偏离。
- 电极电势把活化吉布斯能移动$F(E - E^{\circ\prime})$的份额$\alpha$，得$k_\mathrm{red} = k^\circ\mathrm{e}^{-\alpha f(E - E^{\circ\prime})}$与$k_\mathrm{ox} = k^\circ\mathrm{e}^{(1-\alpha)f(E - E^{\circ\prime})}$，平衡时与能斯特方程相容。
- 巴特勒-福尔默方程$j = j_0[\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}]$包含交换电流密度$j_0 = Fk^\circ(c_\mathrm{O}^*)^{1-\alpha}(c_\mathrm{R}^*)^\alpha$，它依赖浓度与电极材料。
- 近平衡时界面是一个电阻，$R_\mathrm{ct} = RT/Fj_0$；远离平衡时塔菲尔定律$\eta = a + b\log|j|$成立，$b = 2.303RT/\alpha F$（$\alpha = 0.5$时$118\ \mathrm{mV\,dec^{-1}}$），其截距给出$j_0$。
- 传质把电流限制在$j_\mathrm{l}$；"可逆"（$j_0 \gg j_\mathrm{l}$）与"不可逆"（$j_0 \ll j_\mathrm{l}$）描述动力学与输运的竞争。
- 马库斯理论给出$\Delta^\ddagger G = (\lambda + F(E - E^{\circ\prime}))^2/4\lambda$与随电势变化的$\alpha$；析氢等多步反应按决速步不同呈现约$120$、$40$或$30\ \mathrm{mV\,dec^{-1}}$的塔菲尔斜率。
:::

## 习题

::: exercise 由速率常数求交换电流 {level=1 check="0.482"}
某电对$k^\circ = 0.010\ \mathrm{cm\,s^{-1}}$、$\alpha = 0.5$，两型体各$0.50\ \mathrm{mmol\,dm^{-3}}$。求$j_0$。（$j_0$以$\mathrm{mA\,cm^{-2}}$填写。）
::: solution
$j_0 = Fk^\circ c = 96\,485\times0.010\times0.50\times10^{-6}\ \mathrm{A\,cm^{-2}} = 4.82\times10^{-4}\ \mathrm{A\,cm^{-2}} = 0.482\ \mathrm{mA\,cm^{-2}}$，$c$已换算为$\mathrm{mol\,cm^{-3}}$。$c_\mathrm{O}^* = c_\mathrm{R}^*$时，$\alpha$取什么值无关紧要。
:::
:::

::: exercise 非对称能垒的塔菲尔斜率 {level=1 check="148"}
求$25\,^\circ\mathrm{C}$、$\alpha = 0.40$的单电子步骤阴极塔菲尔斜率的大小。（$|b|$以每十倍mV填写。）
::: solution
$|b| = 2.303RT/(\alpha F) = 59.16\ \mathrm{mV}/0.40 = $每十倍$148\ \mathrm{mV}$。阳极斜率将是$59.16/0.60 = $每十倍$98.6\ \mathrm{mV}$：非对称能垒使电流上升较陡的那一支，正是电势能改变中较大份额所偏向的那个方向。
:::
:::

::: exercise 电荷转移电阻 {level=1 check="12.8"}
求$25\,^\circ\mathrm{C}$下$j_0 = 2.0\ \mathrm{mA\,cm^{-2}}$的电极的电荷转移电阻。（$R_\mathrm{ct}$以$\Omega\,\mathrm{cm^2}$填写。）
::: solution
$R_\mathrm{ct} = RT/(Fj_0) = 0.025693/2.0\times10^{-3}\ \Omega\,\mathrm{cm^2} = 12.8\ \Omega\,\mathrm{cm^2}$。
:::
:::

::: exercise 阳极电流所需的超电势 {level=2 check="0.319"}
某氧化反应$j_0 = 0.10\ \mathrm{mA\,cm^{-2}}$、$\alpha = 0.50$。$25\,^\circ\mathrm{C}$下若传质很快，什么超电势能驱动$50\ \mathrm{mA\,cm^{-2}}$？校核塔菲尔近似是否合理。（$\eta$以V填写。）
::: solution
塔菲尔区中$\eta = \dfrac{RT}{(1-\alpha)F}\ln\dfrac{j}{j_0} = 0.051386\ \mathrm{V}\times\ln500 = 0.051386\times6.215 = 0.319\ \mathrm{V}$。被忽略的阴极项为$\mathrm{e}^{-\alpha f\eta}/\mathrm{e}^{(1-\alpha)f\eta} = \mathrm{e}^{-f\eta} = \mathrm{e}^{-12.4} \approx 4\times10^{-6}$（相对阳极项）：塔菲尔近似极好。
:::
:::

::: exercise 塔菲尔失效处 {level=2 check="2.27"}
$j_0 = 1.00\ \mathrm{mA\,cm^{-2}}$、$\alpha = 0.50$，由巴特勒-福尔默方程求$\eta = +50\ \mathrm{mV}$时的电流密度，并与塔菲尔和线性近似比较。（$j$以$\mathrm{mA\,cm^{-2}}$填写。）
::: solution
$(1-\alpha)f\eta = \alpha f\eta = 0.5\times38.92\times0.050 = 0.973$。巴特勒-福尔默：$j = 1.00(\mathrm{e}^{0.973} - \mathrm{e}^{-0.973}) = 2.646 - 0.378 = 2.27\ \mathrm{mA\,cm^{-2}}$。塔菲尔：$2.65$（高$17\,\%$）。线性：$j_0f\eta = 1.95$（低$14\,\%$）。$50\ \mathrm{mV}$处两个极限都不够好；这个范围内的数据要用完整方程拟合。
:::
:::

::: exercise 由两点求交换电流 {level=2 check="3.16"}
某电极上的析氢在$j = -1.0\ \mathrm{mA\,cm^{-2}}$时$\eta = -0.30\ \mathrm{V}$，$j = -10\ \mathrm{mA\,cm^{-2}}$时$\eta = -0.42\ \mathrm{V}$（塔菲尔区，$25\,^\circ\mathrm{C}$）。求塔菲尔斜率、$\alpha$与$j_0$。（$j_0$以$\mu\mathrm{A\,cm^{-2}}$填写。）
::: solution
$b = (-0.42 + 0.30)/(\log10 - \log1) = -0.120\ \mathrm{V\,dec^{-1}}$，故$\alpha = 0.05916/0.120 = 0.49$。$\eta = 0$处：$\log_{10}(|j|/\mathrm{A\,cm^{-2}}) = \log_{10}(1.0\times10^{-3}) - 0.30/0.120 = -5.5$，得$j_0 = 3.16\times10^{-6}\ \mathrm{A\,cm^{-2}} = 3.16\ \mu\mathrm{A\,cm^{-2}}$。
:::
:::

::: exercise 受传质限制的还原 {level=3 check="-4.53"}
某电对$j_0 = 1.0\ \mathrm{mA\,cm^{-2}}$、$\alpha = 0.50$、极限电流密度相等$j_\mathrm{l,a} = j_\mathrm{l,c} = 5.0\ \mathrm{mA\,cm^{-2}}$，求$\eta = -0.20\ \mathrm{V}$（$25\,^\circ\mathrm{C}$）时的电流密度，并与无传质限制的巴特勒-福尔默值比较。$c_\mathrm{O}(0)/c_\mathrm{O}^*$是多少？（$j$以$\mathrm{mA\,cm^{-2}}$填写，带符号。）
::: hint
先算两个指数，再用[[#eq-full]]的第二个形式。
:::
::: solution
$(1-\alpha)f\eta = -3.892$，$-\alpha f\eta = +3.892$，所以指数为$\mathrm{e}^{-3.892} = 0.0204$与$\mathrm{e}^{3.892} = 49.0$。于是
$$
j = \frac{0.0204 - 49.0}{1/1.0 + 0.0204/5.0 + 49.0/5.0}\ \mathrm{mA\,cm^{-2}} = \frac{-48.98}{10.81}\ \mathrm{mA\,cm^{-2}} = -4.53\ \mathrm{mA\,cm^{-2}} .
$$
无传质限制时将是$-49.0\ \mathrm{mA\,cm^{-2}}$，大十倍。表面浓度比为$c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c} = 1 - 4.53/5.0 = 0.093$：反应物在表面贫化$91\,\%$，电流已达其极限值的$91\,\%$。再增大$\eta$收获不大；搅拌更快（提高$j_\mathrm{l}$）收获很大。
:::
:::

::: exercise 马库斯传递系数 {level=3 check="0.375"}
由$\Delta^\ddagger G_\mathrm{red} = [\lambda + F(E - E^{\circ\prime})]^2/4\lambda$导出传递系数作为电势的函数，并对$\lambda = 0.80\ \mathrm{eV}$在$E - E^{\circ\prime} = -0.20\ \mathrm{V}$处求值。$25\,^\circ\mathrm{C}$下该处局部测得的塔菲尔斜率是多少？（填写$\alpha$。）
::: solution
$\alpha = \partial\Delta^\ddagger G/\partial[F(E - E^{\circ\prime})] = 2[\lambda + F(E - E^{\circ\prime})]/4\lambda = \tfrac{1}{2} + F(E - E^{\circ\prime})/2\lambda$。能量按每个电子以eV计：$\alpha = 0.5 + (-0.20)/(2\times0.80) = 0.5 - 0.125 = 0.375$。局部塔菲尔斜率为$59.16/0.375 = $每十倍$158\ \mathrm{mV}$，而形式电势处为$118$。严格地说，经由能垒定义的$\alpha$与$\ln k$的斜率因金属中电子态分布而略有不同，但趋势——阴极塔菲尔线随$|\eta|$增大而弯曲——正是马库斯动力学的标志。
:::
:::

::: exercise 交换电流的活化能 {level=3 check="32.7"}
某反应在其平衡电势下的交换电流密度$25\,^\circ\mathrm{C}$为$1.0\ \mathrm{mA\,cm^{-2}}$、$60\,^\circ\mathrm{C}$为$4.0\ \mathrm{mA\,cm^{-2}}$，溶液组成相同。求表观活化能，并解释为什么电极反应的"那个"活化能必须在规定电势下测量。（$E_\mathrm{a}$以$\mathrm{kJ\,mol^{-1}}$填写。）
::: solution
把$j_0$当作阿伦尼乌斯速率处理，$E_\mathrm{a} = R\ln(j_2/j_1)/(1/T_1 - 1/T_2) = 8.314\times\ln4.0/(1/298.15 - 1/333.15)\ \mathrm{J\,mol^{-1}} = 8.314\times1.386/3.524\times10^{-4} = 32.7\ \mathrm{kJ\,mol^{-1}}$。在任何固定超电势下能垒为$\Delta^\ddagger G_0 \pm \alpha F\eta$（取适当的符号），所以恒定$\eta \neq 0$下测得的活化能与此相差约$\alpha F\eta$——$\alpha = 0.5$、$\eta = 0.2\ \mathrm{V}$时为$10\ \mathrm{kJ\,mol^{-1}}$。而平衡电势本身随温度移动（$(\partial E/\partial T)_p = \Delta_\mathrm{r}S/\nu F$，[[electrochemistry/cell-thermodynamics#prop-temp]]），所以在不同温度下对参比"恒电势"并不等于"恒超电势"。最干净的量是平衡电势处的活化能，如此处所示。
:::
:::

::: exercise 由阻抗谱求动力学 {level=2 check="103"}
某电极浸入含某电对两种等浓度型体的溶液，其奈奎斯特图给出直径$250\ \Omega\,\mathrm{cm^2}$、顶点在$32\ \mathrm{Hz}$的半圆。求$25\,^\circ\mathrm{C}$下的$j_0$与$C_\mathrm{d}$。（$j_0$以$\mu\mathrm{A\,cm^{-2}}$填写。）
::: solution
直径即$R_\mathrm{ct}$，故$j_0 = RT/(FR_\mathrm{ct}) = 0.025693/250\ \mathrm{A\,cm^{-2}} = 1.03\times10^{-4}\ \mathrm{A\,cm^{-2}} = 103\ \mu\mathrm{A\,cm^{-2}}$。顶点在$\omega = 2\pi\times32 = 201\ \mathrm{rad\,s^{-1}} = 1/R_\mathrm{ct}C_\mathrm{d}$，故$C_\mathrm{d} = 1/(201\times250)\ \mathrm{F\,cm^{-2}} = 19.9\ \mu\mathrm{F\,cm^{-2}}$，是典型的双电层数值——这是半圆确实代表界面、而非（比如）表面膜的有用检验。注意以赫兹计的频率与角频率之间$2\pi$的因子。
:::
:::
