把氢在氧里烧掉，得到的是水和热：每摩尔$285.8\ \mathrm{kJ}$，热机只能以卡诺效率把它变成功。让同样两种气体在一张质子传导膜的两侧反应，得到的却是水和电——没有火焰，也没有卡诺限制——电子在从氢走向氧的途中被迫做功。把过程倒过来运转，让电流通过水，就能用电来制取氢和氧。燃料电池与电解槽，这两个装置互为镜像；再加上工业电解——全世界所有的铝、氯气和大部分氢氧化钠都出自它——它们共同代表着电化学与能源、工业在最大规模上的交汇。

决定它们性能好坏的，几乎全都是[[electrochemistry/electrode-kinetics]]的主题：涉氧反应很慢，而加速它们的催化剂正是昂贵所在。本章先从热力学出发——可逆电压、热中性电压与效率极限——然后分析燃料电池的极化曲线、电解制氢与氯的电耗，以及电催化的原理，从萨巴捷耶（Sabatier）原理和火山图到限制氧催化剂的标度关系。危险随文提示：氢气极易燃，与空气在很宽的浓度范围内形成爆炸性混合物；氯气吸入时急性中毒；浓碱有腐蚀性。工业电解槽在严格的工艺安全规程下运行，实验室电解则需要通风、有人监管并作风险评估。

## 热力学极限

::: proposition 可逆电压与热中性电压 {#prop-voltages}
对氢-氧电池$\mathrm{H_2(g) + \tfrac{1}{2}O_2(g) \rightarrow H_2O}$，$\nu = 2$，**可逆电压**与**热中性电压**为
$$
E_\mathrm{rev} = -\frac{\Delta_\mathrm{r}G}{2F}, \qquad E_\mathrm{tn} = -\frac{\Delta_\mathrm{r}H}{2F} .
$$ {#eq-voltages}
在$298.15\ \mathrm{K}$、标准压力下、以液态水为产物时，$E^\circ_\mathrm{rev} = 1.229\ \mathrm{V}$，$E^\circ_\mathrm{tn} = 1.481\ \mathrm{V}$。燃料电池的最大（热力学）效率为$\varepsilon_\mathrm{max} = \Delta_\mathrm{r}G/\Delta_\mathrm{r}H = 83.0\,\%$；在$E_\mathrm{tn}$下运行的电解槽既不吸热也不放热。计入压强时，$E_\mathrm{rev} = E^\circ_\mathrm{rev} + (RT/2F)\ln[(p_{\mathrm{H_2}}/p^\circ)(p_{\mathrm{O_2}}/p^\circ)^{1/2}]$，且$(\partial E_\mathrm{rev}/\partial T)_p = \Delta_\mathrm{r}S/2F = -0.846\ \mathrm{mV\,K^{-1}}$。
:::

::: proof
$E_\mathrm{rev}$就是[[electrochemistry/cell-thermodynamics#prop-dg]]；压强依赖是气体取$a = p/p^\circ$、液态水取$a = 1$的能斯特方程；温度系数见[[electrochemistry/cell-thermodynamics#prop-temp]]。由NBS数据（$\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,l}) = -285.83\ \mathrm{kJ\,mol^{-1}}$；$\mathrm{H_2O(l)}$、$\mathrm{H_2}$与$\mathrm{O_2}$的$S^\circ$：$69.91$、$130.68$、$205.14\ \mathrm{J\,K^{-1}\,mol^{-1}}$），$\Delta_\mathrm{r}S^\circ = 69.91 - 130.68 - 102.57 = -163.34\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$\Delta_\mathrm{r}G^\circ = -285.83 + 298.15\times0.16334 = -237.13\ \mathrm{kJ\,mol^{-1}}$，于是得$1.229\ \mathrm{V}$、$1.481\ \mathrm{V}$以及$237.13/285.83 = 0.830$。

关于热中性的论断：在电压$V$下运行的电解槽，每分解一摩尔水得到电功$2FV$，而反应（逆反应）需要的焓为$-\Delta_\mathrm{r}H = 2FE_\mathrm{tn}$。由热力学第一定律，从环境吸收的热为$q = -\Delta_\mathrm{r}H - 2FV = 2F(E_\mathrm{tn} - V)$：在$E_\mathrm{rev}$与$E_\mathrm{tn}$之间为正（电池变冷），在$E_\mathrm{tn}$处为零，高于它则为负（放热）。可逆运行的燃料电池输出电功$-\Delta_\mathrm{r}G$、放出热$-T\Delta_\mathrm{r}S$，故焓变中转变为功的份额为$\Delta_\mathrm{r}G/\Delta_\mathrm{r}H$。
:::

与卡诺的对照颇有启发。工作于$1000\ \mathrm{K}$与$300\ \mathrm{K}$之间的热机，其上限为$70\,\%$，低于室温下燃料电池的$83\,\%$；但燃料电池的$\varepsilon_\mathrm{max}$随温度*下降*（因为$\Delta_\mathrm{r}S < 0$），而卡诺上限升高，超过约$1000\,^\circ\mathrm{C}$（按LHV基准、冷源为$300\ \mathrm{K}$）后卡诺上限反超。燃料电池真正的优势不是天花板更高，而是其损失是动力学的而非固有的，且在部分负荷下减小。

::: definition 电化学能量转换的效率 {#def-efficiency}
对工作在电压$V$下的燃料电池：**电压效率**为$V/E_\mathrm{rev}$；**法拉第（电流）效率**$\varepsilon_\mathrm{F}$是所消耗燃料中真正产生电流的份额（其余穿过膜或被排放掉）；而**相对于热值的效率**为
$$
\varepsilon = \varepsilon_\mathrm{F}\,\frac{2FV}{-\Delta_\mathrm{r}H} = \varepsilon_\mathrm{F}\,\frac{V}{E_\mathrm{tn}} ,
$$
以高热值（HHV，液态水，$E_\mathrm{tn} = 1.481\ \mathrm{V}$）或低热值（LHV，水蒸气，$\Delta_\mathrm{r}H = -241.82\ \mathrm{kJ\,mol^{-1}}$，$1.253\ \mathrm{V}$）作基准。电解槽则把比值倒过来：按HHV基准$\varepsilon = \varepsilon_\mathrm{F}E_\mathrm{tn}/V$。
:::

::: example 一台工作中的燃料电池 {#ex-fuel-cell}
一台质子交换膜燃料电池在$80\,^\circ\mathrm{C}$下运行，反应物为$1\ \mathrm{bar}$的纯$\mathrm{H_2}$与$\mathrm{O_2}$，产物为液态水。(a) 估算$80\,^\circ\mathrm{C}$下的$E_\mathrm{rev}$。(b) 单池电压为$0.70\ \mathrm{V}$时，求电压效率与HHV效率（法拉第效率为$1$）。(c) 一个输出$1.0\ \mathrm{kW}$的电堆每小时消耗多少氢？
::: solution
(a) 视$\Delta_\mathrm{r}S$为常数，$E_\mathrm{rev}(353\ \mathrm{K}) = 1.229 - 0.846\times10^{-3}\times55\ \mathrm{V} = 1.182\ \mathrm{V}$。(b) $0.70/1.182 = 59\,\%$，即可逆电压的$59\,\%$；$0.70/1.481 = 47\,\%$，即HHV的$47\,\%$。(c) 每片单池通过相同的电流，$N$片电堆的功率为$P = NVI$；氢的消耗速率为每秒$NI/2F$摩尔，即$P/(2FV)$，与$N$无关：
$$
\dot n_{\mathrm{H_2}} = \frac{1000\ \mathrm{W}}{2\times96\,485\ \mathrm{C\,mol^{-1}}\times0.70\ \mathrm{V}} = 7.40\times10^{-3}\ \mathrm{mol\,s^{-1}} = 53.7\ \mathrm{g\,h^{-1}} .
$$
氢热值中其余的$53\,\%$——约$1.1\ \mathrm{kW}$——以热的形式出现，必须由冷却回路带走。这就是以实用电流密度而非靠近$E_\mathrm{rev}$处运行的代价。
:::
:::

## 燃料电池的种类

一切燃料电池都由燃料电极（阳极）、氧化剂电极（阴极）和只传离子不传电子的电解质构成。它们的差别主要在于电解质，后者决定了工作温度、穿过它的离子和所需的催化剂。

| 类型 | 电解质（所传离子） | 温度 | 催化剂 / 备注 |
|---|---|---|---|
| 质子交换膜（PEMFC） | 全氟磺酸膜（$\mathrm{H^+}$） | $60$–$90\,^\circ\mathrm{C}$ | 碳载Pt；车辆、备用电源 |
| 碱性（AFC） | KOH溶液或阴离子交换膜（$\mathrm{OH^-}$） | $60$–$200\,^\circ\mathrm{C}$ | Ni、Ag、Pt；阿波罗飞船与航天飞机；$\mathrm{CO_2}$会生成碳酸盐 |
| 磷酸型（PAFC） | 基质中的$\mathrm{H_3PO_4}$（$\mathrm{H^+}$） | 约$200\,^\circ\mathrm{C}$ | Pt；固定式热电联供 |
| 熔融碳酸盐（MCFC） | 熔融$\mathrm{Li_2CO_3/K_2CO_3}$（$\mathrm{CO_3^{2-}}$） | 约$650\,^\circ\mathrm{C}$ | Ni；天然气内部重整 |
| 固体氧化物（SOFC） | 氧化钇稳定氧化锆（$\mathrm{O^{2-}}$） | $600$–$1000\,^\circ\mathrm{C}$ | Ni–YSZ阳极、钙钛矿阴极；燃料灵活 |

高温有两重效果：它降低$E_\mathrm{rev}$和$\varepsilon_\mathrm{max}$（热力学），却极大地加快电极反应并免除对贵金属的需要（动力学），而且排出的热温度高到可以利用。低温电池启动快、适合车辆，但需要铂和纯氢，因为几个ppm量级的一氧化碳会强烈吸附在铂上使其中毒。

在PEMFC中，氢在阳极被氧化：$\mathrm{H_2 \rightarrow 2H^+ + 2e^-}$，在铂上这是快反应（按真实表面计$j_0$约$10^{-3}\ \mathrm{A\,cm^{-2}}$）；质子以格罗特斯（Grotthuss）机制与载体机制穿过水合膜（[[electrochemistry/conductivity]]）；氧在阴极被还原：$\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$，即使在铂上也是慢反应（$j_0$为$10^{-9}\ \mathrm{A\,cm^{-2}}$量级）。阴极要发生四次质子耦合电子转移、还要断开一个O=O键，绝大部分电压损失都出在它身上。

## 极化曲线

::: proposition 燃料电池的极化曲线 {#prop-polarisation}
电流密度$j$下燃料电池的电压，在很好的近似下为
$$
V(j) = E_\mathrm{rev} - b\log_{10}\frac{j}{j_0} - jR_\mathrm{A} + c\ln\left(1 - \frac{j}{j_\mathrm{l}}\right) ,
$$ {#eq-polarisation}
即可逆电压减去一项塔菲尔活化损失（由阴极主导，塔菲尔斜率$b$、交换电流密度$j_0$）、一项欧姆损失（膜与接触界面的面积电阻$R_\mathrm{A}$），以及一项传质损失——$j$趋于极限电流密度$j_\mathrm{l}$时它发散（经验系数$c$为$RT/nF$量级，再乘一个计入气体扩散层几何形状的因子）。功率密度为$P = jV$。
:::

::: proof
把[[electrochemistry/batteries#prop-power]]的损失记账用于每个过程。活化项就是氧电极的阴极塔菲尔方程（[[electrochemistry/electrode-kinetics#prop-limits]]），在所有实用电流下$j \gg j_0$，故成立；阳极的损失很小，因为它的$j_0$大了六个数量级。欧姆项就是膜的欧姆定律。至于传质项，若阴极关于$\mathrm{O_2}$的表面浓度服从能斯特方程，且该浓度随电流线性下降，$c(0)/c^* = 1 - j/j_\mathrm{l}$（[[electrochemistry/voltammetry]]），则能斯特方程给出电势变化$(RT/nF)\ln(1 - j/j_\mathrm{l})$；对$\mathrm{O_2}$为一级的塔菲尔动力学再加上一个类似项，系数为$RT/\alpha nF$。两者都归并进系数$c$。这个模型的细节是经验性的——真实多孔电极有分散的反应区和积水——但它抓住了这三个区间。
:::

::: widget plot
f: E - b*log10(x/10^lj) - RA*x + 0.05*ln(1 - x/jl); x*(E - b*log10(x/10^lj) - RA*x + 0.05*ln(1 - x/jl))
x: 0.001, 1.99
y: 0, 1.25
sliders: E=1.18:1:1.23:0.001; b=0.06:0.03:0.12:0.005; lj=-6:-9:-3:0.1; RA=0.1:0:0.4:0.01; jl=1.6:0.8:2:0.05
labels: V\ (\mathrm{V}); P\ (\mathrm{W\,cm^{-2}})
caption: 氢燃料电池的极化曲线[[#eq-polarisation]]与功率密度对电流密度$j$（单位$\mathrm{A\,cm^{-2}}$，即$x$）。滑块：可逆电压$E$、塔菲尔斜率$b$（每十倍伏）、有效交换电流密度$j_0$的$\log_{10}$（单位$\mathrm{A\,cm^{-2}}$）、面积电阻$R_\mathrm{A}$（$\Omega\,\mathrm{cm^2}$）与极限电流密度$j_\mathrm{l}$。可以看到三个区域：起始的陡降（活化，即使电流很小也要损失几百毫伏）、中间一段长直线（欧姆）、末尾的骤降（传质）。把$j_0$提高一个十倍——相当于换更好的催化剂——整条曲线就抬升一个塔菲尔斜率；把$R_\mathrm{A}$减半，峰值功率明显上升。出于效率的考虑，工作点选在功率最大处的左侧。
:::

::: warning 开路电压不是可逆电压 {#warn-ocv}
真实的PEM燃料电池开路电压通常只有$0.95$–$1.0\ \mathrm{V}$，而不是热力学在$80\,^\circ\mathrm{C}$下预言的$1.18\ \mathrm{V}$。即使没有外电流，电池也不处于平衡：少量氢穿过膜扩散，在阴极上直接被氧化；氧化铂的生成与杂质造成混合电势（[[electrochemistry/corrosion]]用到同一思想）。因为氧电极的交换电流太小，哪怕几个$\mathrm{mA\,cm^{-2}}$的穿透电流，在塔菲尔线上就要付出$0.2\ \mathrm{V}$以上的代价。所以，开路电压低并不能说明热力学计算有错；电压效率永远应当对$E_\mathrm{rev}$计算，而不是对实测的开路值。
:::

## 水的电解

电解槽把燃料电池反过来：$\mathrm{H_2O \rightarrow H_2 + \tfrac{1}{2}O_2}$。实用技术有三种。**碱性**电解槽用$25$–$30\,\%$的KOH溶液、镍基电极和多孔隔膜，是最成熟、最低成本的方案。**PEM**电解槽用质子交换膜、氧化铱阳极和铂阴极；电流密度高，对波动的可再生电力响应快，但要消耗稀缺的铱。**固体氧化物**电解槽在$700$–$850\,^\circ\mathrm{C}$下运行，部分能量可以以热的形式供给（$E_\mathrm{rev}$随温度下降，而水蒸气的$E_\mathrm{tn}$始终接近$1.29\ \mathrm{V}$），电效率最高。三者主要的动力学损失都在析氧阳极上。

::: example 氢的电费 {#ex-electrolyser}
一台电解槽单池电压$1.80\ \mathrm{V}$、法拉第效率$100\,\%$。求每千克氢的耗电量、HHV效率，以及热中性电压下的最低能量。
::: solution
一千克$\mathrm{H_2}$是$1000/2.016 = 496.0\ \mathrm{mol}$，每摩尔需要电荷$2F$。在$1.80\ \mathrm{V}$下：
$$
W = 496.0\times2\times96\,485\times1.80\ \mathrm{J} = 1.723\times10^{8}\ \mathrm{J} = 47.9\ \mathrm{kWh\ per\ kg} .
$$
HHV效率为$1.481/1.80 = 82\,\%$。在$E_\mathrm{tn} = 1.481\ \mathrm{V}$下耗电$39.4\ \mathrm{kWh\,kg^{-1}}$（即氢的高热值）；原则上在$1.229\ \mathrm{V}$下电解每千克只需$32.7\ \mathrm{kWh}$电，其余由环境以热供给——只是速率趋近于零。包括压缩与辅助设备在内，商用系统耗电约$50$–$55\ \mathrm{kWh\,kg^{-1}}$（2026年）。作为对照，全球氢年产量接近$1$亿吨，几乎全部来自天然气和煤，来自可再生能源或核电电解等低排放路线的不到$1\,\%$（IEA《全球氢能综述》（*Global Hydrogen Review*），2026年）。
:::
:::

## 氯与烧碱

**氯碱工业**电解食盐水：
$$
2\mathrm{NaCl(aq)} + 2\mathrm{H_2O(l)} \rightarrow \mathrm{Cl_2(g)} + \mathrm{H_2(g)} + 2\mathrm{NaOH(aq)} .
$$
阳极析出氯、阴极析出氢，阴极室生成的氢氧化钠必须与氯隔开，否则两者反应生成次氯酸盐。三代电解槽对此各有办法：汞阴极槽（卡斯特纳（Castner）与克尔纳（Kellner），1890年代），钠汞齐在流动的汞阴极上生成、再另行分解；隔膜槽，用石棉（后改为聚合物）隔膜；以及**离子膜槽**（1970年代起），阳离子交换膜让$\mathrm{Na^+}$通过而挡住$\mathrm{OH^-}$与$\mathrm{Cl^-}$，得到纯净的浓NaOH。由于汞的排放，汞法已在欧洲被淘汰，并正依《关于汞的水俣公约》逐步取消。

::: example 氯碱槽的电压与能耗 {#ex-chlor-alkali}
设阳极反应为$\mathrm{Cl_2 + 2e^- \rightleftharpoons 2Cl^-}$（$E^\circ = 1.358\ \mathrm{V}$）、阴极反应为$2\mathrm{H_2O + 2e^- \rightleftharpoons H_2 + 2OH^-}$（$E^\circ = -0.828\ \mathrm{V}$），活度均取1，求离子膜槽的可逆电压。某槽在$3.0\ \mathrm{V}$、电流效率$100\,\%$下运行；求每吨氯的耗电量。
::: solution
$E_\mathrm{rev} = 1.358 - (-0.828) = 2.186\ \mathrm{V}$（实际盐水与烧碱的浓度会使它变动几十毫伏）。每吨$\mathrm{Cl_2}$为$10^{6}/70.90 = 1.410\times10^{4}\ \mathrm{mol}$，每摩尔需要$2F$：
$$
W = 1.410\times10^{4}\times2\times96\,485\times3.0\ \mathrm{J} = 8.17\times10^{9}\ \mathrm{J} = 2.27\times10^{3}\ \mathrm{kWh} .
$$
工作电压中约$0.8\ \mathrm{V}$是超电势以及电解质与膜中的欧姆损失。按年产数千万吨计，氯碱工业是化学工业中最大的耗电行业之一，靠更好的电极或膜每省$0.1\ \mathrm{V}$都值得业界全力以赴。
:::
:::

阳极里藏着一个谜题。从水析氧$E^\circ = 1.229\ \mathrm{V}$，在热力学上比析氯的$1.358\ \mathrm{V}$更容易；为什么阳极得到的却是氯？因为在所用阳极——钛基体上负载钌与钛的氧化物，即亨利·比尔（Henri Beer）在1960年代发明的**尺寸稳定阳极**——上，需要四个电子、要生成一个O=O键的析氧反应，其交换电流密度远小于二电子的析氯反应。在工作电流密度下，析氯需要的总电势反而更低。这一选择性是动力学的，也是设计目标：氯气中混有几个百分点的氧，既损失效率，又是安全问题。

## 铝：熔盐电解

按能耗计最大的单一电化学工业是**霍尔-埃鲁（Hall–Héroult）法**，一次铝全部由它生产。氧化铝以约$5\,\%$（质量）溶在约$960\,^\circ\mathrm{C}$的熔融冰晶石（$\mathrm{Na_3AlF_6}$）中，在碳阳极与构成阴极的液态铝液之间电解。阳极要被消耗：氧离子在碳上放电，主要生成二氧化碳，
$$
2\mathrm{Al_2O_3} + 3\mathrm{C} \rightarrow 4\mathrm{Al(l)} + 3\mathrm{CO_2(g)} ,
$$
因此碳起了化学还原剂的作用，把可逆分解电压在操作温度下从约$2.2\ \mathrm{V}$（对应$\mathrm{Al_2O_3} \rightarrow 2\mathrm{Al} + \tfrac{3}{2}\mathrm{O_2}$）降到约$1.2\ \mathrm{V}$。实际电解槽运行在约$4.0$–$4.5\ \mathrm{V}$、电流效率$90$–$95\,\%$。超出部分的最大一块是电极间几厘米厚熔融电解质的欧姆降，而这部分电阻热并不浪费：它让电解液保持熔融。其余是阳极超电势和导体的电压降。

以每千克铝计：每$26.98\ \mathrm{g}$需电荷$3F$，在$4.2\ \mathrm{V}$、电流效率$95\,\%$下，
$$
\frac{1000}{26.98}\times\frac{3\times96\,485\times4.2}{0.95}\ \mathrm{J} = 4.74\times10^{7}\ \mathrm{J} \approx 13\ \mathrm{kWh} ,
$$
与现代铝厂相符（约$13$–$15\ \mathrm{kWh\,kg^{-1}}$，2026年）。这就是铝厂建在廉价水电或其他大型电源旁的原因，也是回收铝——只需约$5\,\%$的能耗——如此有价值的原因。氟化物排放与阳极产生的二氧化碳（按阳极反应计量每千克铝$1.22\ \mathrm{kg}$，实际略多）是该工艺的主要环境负担；能改为析氧的惰性阳极正在研发中。钠、锂、镁的制取同样基于熔盐原理——这些金属太活泼，无法从水中沉积出来。

## 电催化

**电催化剂**是在给定电势下加快电极反应速率而不被消耗的电极材料——等价地说，是降低给定电流所需超电势的材料。最重要的那些反应——氢的析出与氧化、氧的还原与析出、氯的析出、$\mathrm{CO_2}$与$\mathrm{N_2}$的还原——全都经由吸附中间体进行，所以催化剂的本事在于把中间体结合得既不太强也不太弱：萨巴捷耶原理（[[kinetics/surface-kinetics]]）。

### 火山图与计算氢电极

对析氢反应，中间体只有吸附H一种，方便的描述符是它相对$\tfrac{1}{2}\mathrm{H_2}$的吸附吉布斯能$\Delta G_{\mathrm{H}^*}$。特拉萨蒂（Trasatti，1972年）把实测$\log j_0$对金属-氢键能作图，发现一座火山；诺斯科夫（Nørskov）及其同事（2005年）用密度泛函计算得到的$\Delta G_{\mathrm{H}^*}$重现了它。一个简单的动力学模型认为速率与既未空置也未堵塞的活性位的比例成正比，给出$j_0 \propto 1/[1 + \exp(|\Delta G_{\mathrm{H}^*}|/k_\mathrm{B}T)]$，在$\Delta G_{\mathrm{H}^*} = 0$处最大。

::: widget plot
f: lk - log10(1 + exp(abs(x)/0.0257))
x: -0.8, 0.8
y: -16, 0
sliders: lk=-2:-4:0:0.1
labels: \log_{10}j_0\ (\text{模型})
vlines: 0
caption: 析氢的一个模型火山图：交换电流密度的$\log_{10}$对氢的吸附吉布斯能$\Delta G_{\mathrm{H}^*}$（单位eV，即$x$），$\mathrm{lk}$为速率指前因子的$\log_{10}$。左半边结合强（Ni、Co、W、Mo），表面覆盖着难以除去的H原子；右半边结合弱（Au、Ag、Cu，更远处是Pb、Hg），H本来就难以吸附。铂位于峰顶附近，$\Delta G_{\mathrm{H}^*}$离零不到约$0.1\ \mathrm{eV}$。室温下位置每偏$0.06\ \mathrm{eV}$，$j_0$就损失一个十倍；偏$0.7\ \mathrm{eV}$（铅）要损失约十二个十倍——与[[electrochemistry/electrode-kinetics]]中实测的散布一致。
:::

::: proposition 多步电极反应的极限电势 {#prop-limiting-potential}
设某电极反应经过$N$步连续的质子-电子转移，第$i$步在可逆氢电极（RHE）标度、电极电势$U = 0$处的吉布斯能变为$\Delta G_i$。若每一步都*从*电极取得一个电子（氧化），则在电势$U$下其吉布斯能变为$\Delta G_i(U) = \Delta G_i - eU$，一旦
$$
U \geq U_\mathrm{L} = \frac{\max_i\Delta G_i}{e} ;
$$
各步便都放能；对还原，$\Delta G_i(U) = \Delta G_i + eU$，当$U \leq U_\mathrm{L} = -\max_i\Delta G_i/e$时各步都放能。**热力学超电势**是$U_\mathrm{L}$与总反应平衡电势之差。理想催化剂的各步$\Delta G_i$相同，氧化时都等于$eE_\mathrm{eq}$。
:::

::: proof
每一步放出一个质子和一个电子：$\mathrm{A^* \rightarrow B^* + H^+ + e^-}$。在RHE标度上，电势$U$下的$\mathrm{H^+ + e^-}$与$\tfrac{1}{2}\mathrm{H_2}$的吉布斯能只差电子的电能$eU$——这正是氢电极的定义，再平移电子的电能（诺斯科夫等人的"计算氢电极"）。故对氧化步有$\Delta G_i(U) = \Delta G_i(0) - eU$。反应要不出现任何上坡步，必须每个$\Delta G_i(U) \leq 0$，即要求$eU \geq \max_i\Delta G_i$。还原时电子被消耗，$eU$变号，每一步都要满足$\Delta G_i + eU \leq 0$。诸$\Delta G_i$之和由总反应固定（对$\mathrm{2H_2O \rightarrow O_2 + 4H^+ + 4e^-}$是$4\times1.23 = 4.92\ \mathrm{eV}$），所以最大的一步不会小于平均值；只有各步相等时，$U_\mathrm{L}$的最小值才等于$E_\mathrm{eq}$。这是热力学判据；活化势垒还要另加。
:::

::: example 析氧为什么需要超电势 {#ex-oer}
氧化物表面的析氧用经由吸附$\mathrm{OH^*}$、$\mathrm{O^*}$与$\mathrm{OOH^*}$的四步来建模。对许多氧化物，密度泛函计算发现：$\mathrm{OH^*}$与$\mathrm{OOH^*}$都通过一个氧原子结合，两者的吸附能被一条**标度关系**联系起来：无论材料为何，$\Delta G_{\mathrm{OOH}^*} - \Delta G_{\mathrm{OH}^*} \approx 3.2\ \mathrm{eV}$。证明这意味着热力学超电势至少约$0.37\ \mathrm{V}$。
::: solution
中间两步$\mathrm{OH^* \rightarrow O^* + H^+ + e^-}$与$\mathrm{O^* + H_2O \rightarrow OOH^* + H^+ + e^-}$合起来把表面从$\mathrm{OH^*}$带到$\mathrm{OOH^*}$，故它们的吉布斯能之和为$\Delta G_{\mathrm{OOH}^*} - \Delta G_{\mathrm{OH}^*} = 3.2\ \mathrm{eV}$。材料能做到的极限是把这段平分，每步$1.6\ \mathrm{eV}$，于是$\max\Delta G_i \geq 1.6\ \mathrm{eV}$，由[[#prop-limiting-potential]]得$U_\mathrm{L} \geq 1.6\ \mathrm{V}$。理想催化剂各步都应为$1.23\ \mathrm{eV}$（但$2\times1.23 = 2.46 < 3.2$，标度关系不允许），故最小热力学超电势为$1.6 - 1.23 = 0.37\ \mathrm{V}$。最好的真实催化剂——酸中的氧化铱与氧化钌、碱中的镍铁羟基氧化物——在$10\ \mathrm{mA\,cm^{-2}}$下的工作超电势约$0.3$–$0.4\ \mathrm{V}$，已接近这一极限。打破标度关系——选择性稳定$\mathrm{OOH^*}$，或走不经过它的机理（晶格氧参与、双位点）——是当前活跃的研究目标。
:::
:::

::: quiz
一种新的析氢催化剂$\Delta G_{\mathrm{H}^*} = -0.30\ \mathrm{eV}$。哪种改动最可能提高其活性？
- [ ] 进一步强化金属-氢键，吸附更多H
- [x] 通过合金化或应变把金属-氢键削弱到$\Delta G_{\mathrm{H}^*} \approx 0$
- [ ] 提高超电势，把催化剂推向火山上方
- [ ] 都不行：活性只取决于表面积
::: solution
在火山的强结合一侧，表面被H饱和，速率受限于H的脱除；削弱键合使催化剂移向峰顶。超电势能增大任何催化剂的电流，却不改变其本征活性（$j_0$，或固定$\eta$下单位真实面积的电流）。表面积能放大电流，但补不回本征活性上数量级的差距；催化剂之间的比较应当对面积归一化。
:::
:::

铂的稀缺驱动着大部分实际工作：燃料电池阴极把铂（或铂-镍、铂-钴合金——其被压缩的表面点阵略微削弱氧的结合，使它们更接近氧还原火山的顶部）做成几纳米大的纳米颗粒负载在碳载体上，载量为每平方厘米零点几毫克；研究方向则指向无铂催化剂，如铁-氮掺杂碳。活性必须严谨地报告：**质量活性**（在指定电势下每毫克贵金属的电流，氧还原通常取RHE标度$0.9\ \mathrm{V}$）与**比活性**（单位真实表面积），由可消除传质效应的旋转圆盘电极法测定（[[electrochemistry/voltammetry#prop-levich]]）。另一半是**稳定性**：车辆工况的电势循环会使铂溶解、粗化，而在启停过程中电势超过约$1\ \mathrm{V}$时碳载体也会腐蚀。

::: history 从格罗夫的气体电池到计算催化剂 {#hist-fuel-cells}
威廉·尼科尔森（William Nicholson）与安东尼·卡莱尔（Anthony Carlisle）在伏特1800年公布其电堆后数周内，就用伏打电堆电解了水。克里斯蒂安·弗里德里希·舍恩拜因（Christian Friedrich Schönbein，1838年）观察到氢和氧在铂上产生的电流，威廉·格罗夫（William Grove）据此于1839–1842年造出了他的"气体伏打电池"。路德维希·蒙德（Ludwig Mond）与卡尔·兰格（Carl Langer）在1889年创造了*燃料电池*一词。哈密尔顿·卡斯特纳（Hamilton Castner）与卡尔·克尔纳（Karl Kellner）在1890年代开发出汞法氯碱槽；查尔斯·马丁·霍尔（Charles Martin Hall）与保罗·埃鲁（Paul Héroult）在1886年各自独立发明了氧化铝熔盐电解。弗朗西斯·托马斯·培根（Francis Thomas Bacon）在1959年演示了$5\ \mathrm{kW}$的碱性燃料电池，该设计被阿波罗飞船采用；通用电气的威拉德·格拉布（Willard Grubb）与伦纳德·尼德雷奇（Leonard Niedrach）研制出质子交换膜燃料电池，1960年代用于"双子星座"飞船。亨利·比尔的尺寸稳定阳极（1960年代）与离子膜氯碱槽（1970年代商业化）彻底改变了工业电解。塞尔焦·特拉萨蒂（Sergio Trasatti）的火山图（1972年）与延斯·诺斯科夫（Jens Nørskov）及其同事的密度泛函描述符（2004–2005年）赋予了电催化现代的设计原则。
:::

## 后续内容

燃料电池与电解槽补全了由[[electrochemistry/batteries]]开始的能量转换图景：电池把能量存在电极里，燃料电池转换外部输入的燃料，电解槽则把电能储存为燃料。它们的材料——膜、氧化物电解质、纳米结构催化剂——属于[[materials-chemistry]]。对同一电极上混合反应的动力学分析（它解释了PEM燃料电池为何开路电压偏低）是[[electrochemistry/corrosion]]的核心，那里的"燃料"就是金属本身。催化原理与[[kinetics/surface-kinetics]]中的多相催化以及工业化学相通——哈伯-博施法、接触法与氯碱工艺在那里比肩而立。

::: summary
- 对$\mathrm{H_2 + \tfrac{1}{2}O_2 \rightarrow H_2O(l)}$，$E^\circ_\mathrm{rev} = 1.229\ \mathrm{V}$，热中性电压为$1.481\ \mathrm{V}$；燃料电池的最大效率$\Delta_\mathrm{r}G/\Delta_\mathrm{r}H$在$25\,^\circ\mathrm{C}$为$83\,\%$，且随温度下降。
- 实用效率等于电压效率乘法拉第效率，可相对$E_\mathrm{rev}$或热值（HHV或LHV）报告；$0.7\ \mathrm{V}$下工作的燃料电池变为功的部分不足HHV的一半。
- 燃料电池按电解质分类（PEM、碱性、磷酸、熔融碳酸盐、固体氧化物）；温度以热力学电压换取动力学与催化剂成本。
- 极化曲线显示活化损失（塔菲尔，氧还原主导）、欧姆损失与传质损失；功率在传质极限之前达到峰值。
- 电解槽热中性运行需要$\ge 1.48\ \mathrm{V}$；$1.8\ \mathrm{V}$下氢的电耗为$48\ \mathrm{kWh\,kg^{-1}}$。氯碱槽工作电压接近$3\ \mathrm{V}$，可逆电压为$2.19\ \mathrm{V}$；对氧的氯选择性靠动力学实现。
- 电催化遵循萨巴捷耶原理：对吸附能作火山图；由最大能步定极限电势；标度关系给析氧强加了约$0.37\ \mathrm{V}$的最小超电势。
:::

## 习题

::: exercise 一安培时的氢 {level=1 check="37.6"}
一台燃料电池以$1.00\ \mathrm{A}$供电$1.00\ \mathrm{h}$、法拉第效率$100\,\%$，消耗氢的质量是多少？（质量以mg填写。）
::: solution
$Q = 3600\ \mathrm{C}$；$n(\mathrm{H_2}) = Q/2F = 3600/192\,970 = 0.01866\ \mathrm{mol}$；质量$= 0.01866\times2.016\ \mathrm{g} = 37.6\ \mathrm{mg}$。答案与电池电压无关：电量数的是分子，电压数的是能量。
:::
:::

::: exercise 热中性电压 {level=1 check="1.481"}
由$\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,l}) = -285.83\ \mathrm{kJ\,mol^{-1}}$计算$25\,^\circ\mathrm{C}$下电解水的热中性电压。（以V填写。）
::: solution
$E_\mathrm{tn} = -\Delta_\mathrm{r}H/2F = 285\,830/(2\times96\,485)\ \mathrm{V} = 1.481\ \mathrm{V}$。在此电压之下（但高于$1.229\ \mathrm{V}$）电解槽吸热；在其之上则放热。
:::
:::

::: exercise 电压效率 {level=1 check="52.9"}
某燃料电池在$25\,^\circ\mathrm{C}$下以$0.65\ \mathrm{V}$运行。相对$E^\circ_\mathrm{rev}$的电压效率是多少？（以百分数填写。）
::: solution
$0.65/1.229 = 0.529$，即$52.9\,\%$。相对HHV则是$0.65/1.481 = 43.9\,\%$。
:::
:::

::: exercise 加压空气 {level=2 check="1.240"}
求$25\,^\circ\mathrm{C}$下氢-空气电池的可逆电压：$\mathrm{H_2}$为$3.0\ \mathrm{bar}$，空气为$3.0\ \mathrm{bar}$（氧的摩尔分数$0.21$），产物为液态水。（$E_\mathrm{rev}$以V填写。）
::: solution
$p_{\mathrm{O_2}} = 0.63\ \mathrm{bar}$。$E = 1.229 + \dfrac{0.025693}{2}\ln\left(3.0\times0.63^{1/2}\right) = 1.229 + 0.012847\times\ln2.381 = 1.229 + 0.0111 = 1.240\ \mathrm{V}$。加压在热力学上只值$11\ \mathrm{mV}$；其主要好处与动力学和传质有关（催化剂处氧浓度更高），但要与驱动压缩机所需的能量相抵。
:::
:::

::: exercise 电解槽电堆的产量 {level=2 check="7.37"}
一台PEM电解槽电堆有$100$片单池，活性面积各$1000\ \mathrm{cm^2}$，在$2.0\ \mathrm{A\,cm^{-2}}$下运行，法拉第效率$98\,\%$。求氢的产量。（以$\mathrm{kg\,h^{-1}}$填写。）
::: solution
每片单池电流$I = 2.0\times1000 = 2000\ \mathrm{A}$；单池串联，每片以$\varepsilon_\mathrm{F}I/2F$产氢。总量：$100\times0.98\times2000/(2\times96\,485) = 1.016\ \mathrm{mol\,s^{-1}}$，即$1.016\times2.016\times3600/1000 = 7.37\ \mathrm{kg\,h^{-1}}$。单池电压$1.9\ \mathrm{V}$时电堆耗电$380\ \mathrm{kW}$。
:::
:::

::: exercise 氯的能耗 {level=2 check="2467"}
一台离子膜氯碱槽在$3.10\ \mathrm{V}$下运行，氯的电流效率$95\,\%$。求每吨$\mathrm{Cl_2}$的耗电量。（以kWh填写。）
::: solution
$100\,\%$电流效率下每吨所需电荷：$(10^{6}/70.90)\times2F = 2.722\times10^{9}\ \mathrm{C}$；电流效率$95\,\%$时为$2.865\times10^{9}\ \mathrm{C}$。能量$= 2.865\times10^{9}\times3.10\ \mathrm{J} = 8.88\times10^{9}\ \mathrm{J} = 2467\ \mathrm{kWh}$。损失的$5\,\%$电荷主要用于析氧和氢氧根透过膜的反迁移。
:::
:::

::: exercise 更好的催化剂 {level=2 check="0.12"}
某燃料电池阴极服从$b = 0.060\ \mathrm{V}$每十倍的塔菲尔直线。一种新催化剂在相同载量下把有效交换电流密度提高$100$倍。其他条件不变时，固定电流密度下电池电压升高多少？（增益以V填写。）
::: solution
活化损失为$b\log_{10}(j/j_0)$；$j_0$乘$100$使塔菲尔区内每个电流密度下的损失都减小$b\log_{10}100 = 0.060\times2 = 0.12\ \mathrm{V}$。对$0.70\ \mathrm{V}$的电池，这是$17\,\%$的效率增益——活性提高一百倍正是催化剂研究的头号目标。
:::
:::

::: exercise 氧还原的极限电势 {level=3 check="0.38"}
一项计算研究给出了金属表面氧还原四步在RHE标度$U = 0$处的吉布斯能变：$\mathrm{O_2 + H^+ + e^- \rightarrow OOH^*}$，$-0.85\ \mathrm{eV}$；$\mathrm{OOH^* + H^+ + e^- \rightarrow O^* + H_2O}$，$-1.75\ \mathrm{eV}$；$\mathrm{O^* + H^+ + e^- \rightarrow OH^*}$，$-1.30\ \mathrm{eV}$；$\mathrm{OH^* + H^+ + e^- \rightarrow H_2O}$，$-1.02\ \mathrm{eV}$。校核其总和是否正确，并求极限电势与热力学超电势。（超电势以V填写。）
::: hint
对还原，电势$U$下每一步的吉布斯能为$\Delta G_i + eU$。
:::
::: solution
总和：$-0.85 - 1.75 - 1.30 - 1.02 = -4.92\ \mathrm{eV} = -4\times1.23\ \mathrm{eV}$，正是$\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$所要求的。在电势$U$下每步都要满足$\Delta G_i + eU \le 0$；放能最少的第一步（$-0.85\ \mathrm{eV}$）决定了$U_\mathrm{L} = 0.85\ \mathrm{V}$。超电势为$1.23 - 0.85 = 0.38\ \mathrm{V}$。要改进这种表面，应增强$\mathrm{OOH^*}$的结合（使第一步放能更多）——但由标度关系，这也会增强$\mathrm{OH^*}$的结合，使最后一步放能更少。铂处在最优折中附近，计算极限电势约$0.8\ \mathrm{V}$。
:::
:::

::: exercise 固体氧化物电池 {level=3 check="1.006"}
估算$800\,^\circ\mathrm{C}$下由$1\ \mathrm{bar}$的$\mathrm{H_2}$与$\mathrm{O_2}$生成水蒸气的固体氧化物燃料电池的可逆电压，取$\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,g}) = -241.82\ \mathrm{kJ\,mol^{-1}}$、$S^\circ(\mathrm{H_2O,g}) = 188.83\ \mathrm{J\,K^{-1}\,mol^{-1}}$（其余数据见[[#prop-voltages]]），并设$\Delta_\mathrm{r}H$与$\Delta_\mathrm{r}S$不随温度变化。把$\varepsilon_\mathrm{max}$（LHV基准）与$25\,^\circ\mathrm{C}$的值比较。（$E_\mathrm{rev}$以V填写。）
::: solution
$\Delta_\mathrm{r}S^\circ = 188.83 - 130.68 - \tfrac{1}{2}(205.14) = -44.42\ \mathrm{J\,K^{-1}\,mol^{-1}}$。在$T = 1073.15\ \mathrm{K}$，$\Delta_\mathrm{r}G \approx -241.82 + 1073.15\times0.04442 = -194.15\ \mathrm{kJ\,mol^{-1}}$，故$E_\mathrm{rev} = 194\,150/(2\times96\,485) = 1.006\ \mathrm{V}$（表列$1073\ \mathrm{K}$的$\Delta_\mathrm{r}G$计入了热容效应，约为$0.98\ \mathrm{V}$）。$\varepsilon_\mathrm{max} = 194.15/241.82 = 80\,\%$（LHV），而$25\,^\circ\mathrm{C}$下产物为气相时是$228.6/241.82 = 95\,\%$。热力学天花板降低了，但$800\,^\circ\mathrm{C}$下电极动力学极快，固体氧化物电池无需贵金属就能在距$E_\mathrm{rev}$仅$0.2$–$0.3\ \mathrm{V}$的范围内运行，且高温尾气可驱动涡轮——联合系统的电效率超过$60\,\%$。
:::
:::
