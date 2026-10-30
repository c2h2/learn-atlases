直径两纳米的硒化镉晶体悬浮液呈绿色；同一种化合物直径五纳米的晶体呈红色；块体硒化镉则是黑色的。直径二十纳米的金颗粒在水中呈红宝石色，迈克尔·法拉第（Michael Faraday）1857年就发现了这一点，而玻璃工匠们在几个世纪里一直在不知不觉中使用这一效应。一层原子厚的碳片导电时，电子仿佛没有静止质量。直径十纳米的磁铁矿颗粒在室温下没有永久磁化，尽管块体磁铁矿是强磁体。每一种情形中，都是材料的**尺寸**——而不仅是组成与结构——成了决定其性质的变量。

本章解释其中的道理。尺寸效应由两类机制支配。**表面效应**源于小颗粒中很大一部分原子位于表面，近邻较少、能量较高；它们使熔点下降、溶解度升高，并驱动催化。**量子与电磁限域效应**则在颗粒小于块体材料的某个特征长度时出现，例如激子半径、电子平均自由程或磁畴壁厚。我们先建立这两类效应，然后叙述如何经由受控的成核与生长制备纳米颗粒，并概览碳纳米材料与二维固体。能带、带隙与有效质量见[[materials-chemistry/electronic-structure-solids]]。

::: definition 纳米材料 {#def-nano}
**纳米材料**至少有一个外部尺寸（或其内部结构）处于约$1$–$100\ \mathrm{nm}$的尺寸范围。**纳米颗粒**在三个维度上都小（零维，0D：量子点、金属团簇）；**纳米线**与**纳米管**在两个维度上小（一维，1D）；**纳米片**在一个维度上小（二维，2D：石墨烯、$\mathrm{MoS_2}$单层）。出于监管目的，欧盟自2026年起将纳米材料定义为按颗粒数目计至少50 %的颗粒有一个或多个外部尺寸介于$1$与$100\ \mathrm{nm}$之间的材料（2022年委员会建议，修订2011年的建议）。这一定义是一种约定：性质开始改变的尺寸取决于具体的性质与材料。
:::

## 表面效应

::: proposition 纳米颗粒的表面分数 {#prop-surface}
半径为$R$、由直径为$d$的原子构成的球形颗粒，最外一层（厚度为$d$）中的原子分数为
$$
f_\mathrm{s} = 1 - \left(1 - \frac{d}{R}\right)^3 \approx \frac{3d}{R} \quad (R \gg d).
$$ {#eq-surface}
这一估计把颗粒当作密度均匀的连续介质；具有"幻数"尺寸（闭壳的立方八面体或二十面体，含13、55、147、309……个原子）的真实团簇，其表面分数可以逐原子精确计数。
:::

::: proof
不在表面的原子填满一个半径为$R - d$的球。密度均匀时原子数与体积成正比，所以内部原子分数为$(R - d)^3/R^3 = (1 - d/R)^3$，表面分数即其一减。当$d \ll R$时，二项展开$(1 - d/R)^3 \approx 1 - 3d/R$给出$f_\mathrm{s} \approx 3d/R$；这也等于比表面$4\pi R^2/(\tfrac43\pi R^3) = 3/R$乘上壳层厚度$d$。
:::

::: example 金纳米颗粒有多大部分是表面？ {#ex-surface}
金原子的直径约$0.288\ \mathrm{nm}$。计算直径$2$、$5$与$20\ \mathrm{nm}$的金颗粒的表面分数，并比较[[#eq-surface]]的精确形式与近似形式。
::: solution
$R$依次为$1.0$、$2.5$与$10\ \mathrm{nm}$：$d/R = 0.288$、$0.1152$与$0.0288$。精确值：$1 - (0.712)^3 = 0.639$；$1 - (0.8848)^3 = 0.307$；$1 - (0.9712)^3 = 0.084$。近似值（$3d/R$）：$0.86$、$0.35$、$0.086$。所以直径$2\ \mathrm{nm}$的金颗粒约有64 %的原子在表面上，$5\ \mathrm{nm}$时约31 %，$20\ \mathrm{nm}$时约8 %。近似只在$d/R$很小时才可靠；直径低于约$3\ \mathrm{nm}$时要用精确形式，或在团簇模型中逐原子计数。催化发生在表面原子上，而贵金属催化剂的成本由总质量决定，所以小颗粒具有经济上的决定性意义；但直径低于约$2\ \mathrm{nm}$时电子结构本身发生改变，块体上惰性的金会变成活泼的氧化催化剂（春田正毅（Masatake Haruta），1987年）。
:::
:::

表面原子使颗粒的吉布斯自由能升高$\gamma A$，其中$\gamma$是表面能，$A$是面积。对球体，这相当于给摩尔吉布斯自由能加上$2\gamma V_\mathrm{m}/R$，正是开尔文方程中出现过的同一拉普拉斯压项（[[materials-chemistry/porous-materials#prop-kelvin]]）。由此可推出三条后果。小颗粒**更易溶解**（奥斯特瓦尔德-弗罗因德利希方程，$\ln(s_R/s_\infty) = 2\gamma V_\mathrm{m}/RTR$），所以悬浮液中小颗粒溶解、大颗粒长大（**奥斯特瓦尔德熟化**）：若不用配体阻止生长，任何纳米颗粒分散系都会粗化。小颗粒**在更低的温度下熔化**（吉布斯-汤姆孙效应，粗略地$\Delta T_\mathrm{m}/T_\mathrm{m} \approx 2\sigma_\mathrm{sl}/\Delta_\mathrm{fus}H_V R$，其中$\sigma_\mathrm{sl}$是固-液界面能，$\Delta_\mathrm{fus}H_V$是单位体积的熔化焓）：菲利普·比法（Philippe Buffat）与让-皮埃尔·博雷尔（Jean-Pierre Borel）1976年证明，直径$2\ \mathrm{nm}$的金颗粒比块体金低几百开尔文熔化。而且**结构**可能改变：小颗粒可以采取二十面体或十面体形状——这在周期性晶体中不可能存在，表面能却更低。

## 纳米颗粒的制备：成核与生长

大多数纳米颗粒在溶液中制备：先生成"单体"（产物的原子或分子单元）的过饱和溶液，颗粒从中成核并长大。对尺寸及其分布的控制，取决于把这两个阶段分开。

::: proposition 经典成核理论 {#prop-nucleation}
从过饱和度为$S$（实际浓度与平衡浓度之比）的溶液中生成半径为$r$的球形晶核，其生成吉布斯自由能为
$$
\Delta G(r) = -\frac{4\pi r^3}{3}\,\Delta g_V + 4\pi r^2\gamma, \qquad \Delta g_V = \frac{k_\mathrm{B}T\ln S}{\Omega},
$$ {#eq-nucleation}
其中$\gamma$是界面能，$\Omega$是固体中每个单体所占的体积。$\Delta G$在**临界半径**$r^*$处取极大，**成核势垒**为$\Delta G^*$：
$$
r^* = \frac{2\gamma}{\Delta g_V} = \frac{2\gamma\Omega}{k_\mathrm{B}T\ln S}, \qquad \Delta G^* = \frac{16\pi\gamma^3}{3\Delta g_V^2} = \frac{16\pi\gamma^3\Omega^2}{3(k_\mathrm{B}T\ln S)^2}.
$$ {#eq-critical}
成核速率正比于$\exp(-\Delta G^*/k_\mathrm{B}T)$。该理论把微小团簇当作具有块体$\gamma$的宏观球体处理：定性正确，定量上却常常差几个数量级。
:::

::: proof
把一个单体从过饱和度为$S$的溶液转移到块体固体中，其化学势降低$k_\mathrm{B}T\ln S$（对理想溶液，这是$\mu = \mu^\circ + k_\mathrm{B}T\ln c$在浓度$c$处与在平衡浓度处的差值）。体积为$\tfrac43\pi r^3$的晶核含$\tfrac43\pi r^3/\Omega$个单体，这就给出体积项；创建其表面需付出$4\pi r^2\gamma$。令$d\Delta G/dr = -4\pi r^2\Delta g_V + 8\pi r\gamma = 0$得$r^* = 2\gamma/\Delta g_V$，回代得$\Delta G^* = -\tfrac43\pi(2\gamma/\Delta g_V)^3\Delta g_V + 4\pi(2\gamma/\Delta g_V)^2\gamma = (-\tfrac{32}{3} + 16)\pi\gamma^3/\Delta g_V^2 = 16\pi\gamma^3/3\Delta g_V^2$。小于$r^*$的晶核倾向于重新溶解；大于它的倾向于长大。注意$r^*$恰是按奥斯特瓦尔德-弗罗因德利希方程与过饱和度为$S$的溶液处于（不稳定）平衡时颗粒的半径。
:::

::: widget plot
f: -4.19*x^3*s*1.895 + 12.57*x^2*1.0
x: 0, 2.5
y: -10, 12
sliders: s=1:0.3:3:0.01
labels: \Delta G(r)\ /\ 10^{-19}\ \mathrm{J}
caption: 成核自由能[[#eq-nucleation]]对晶核半径$x$（以nm计）的曲线，取示例数值$\gamma = 0.10\ \mathrm{J\,m^{-2}}$、$\Omega = 5\times10^{-29}\ \mathrm{m^3}$、$T = 298\ \mathrm{K}$；$s = \log_{10}S$（滑条）设定过饱和度，$s = 1$（$S = 10$）给出$\Delta g_V = 1.895\times10^8\ \mathrm{J\,m^{-3}}$。小晶核以表面项（$4\pi r^2\gamma$）为主，大晶核以体积项为主。提高过饱和度会使极大值降低并把峰移到更小的半径：$S = 10$时临界半径为$1.06\ \mathrm{nm}$、势垒约$110\,k_\mathrm{B}T$；$S = 100$时为$0.53\ \mathrm{nm}$与$28\,k_\mathrm{B}T$。由于速率对势垒呈指数依赖，成核在临界过饱和度之上骤然开启。
:::

势垒对$S$的强依赖正是制备均匀尺寸颗粒的关键。在维克托·拉默（Victor LaMer）与罗伯特·迪内加（Robert Dinegar）1950年提出的模型中，单体浓度不断升高，直到越过临界过饱和度，随之发生一次短促的**成核爆发**，浓度随即跌回临界水平以下，于是不再有新的晶核生成。已有的晶核再从剩余的单体中共同长大。由于扩散控制的生长随颗粒变大而变慢，小颗粒会追上大颗粒，尺寸分布变窄（"聚焦"），直到单体耗尽、熟化开始。克里斯托弗·默里（Christopher Murray）、戴维·诺里斯（David Norris）与蒙吉·巴文迪（Moungi Bawendi）的**热注入**法（1993年）靠把冷的金属有机前驱体注入热的配位溶剂来制造这一次爆发；成核随即发生且极为短暂，在较低温度下生长、到预定时间终止，得到尺寸分布只有百分之几的CdSe量子点。**配体**（三辛基氧膦、油酸、硫醇、柠檬酸盐）结合到表面上，控制不同晶面的生长速率从而控制形状，阻止团聚，并使颗粒可分散。金溶胶的制备：在沸水中用柠檬酸盐还原四氯合金(III)酸根（约翰·图克维奇（John Turkevich），1951年），或在两相体系中用硼氢化物还原、并以硫醇稳定（马蒂亚斯·布鲁斯特（Mathias Brust）与戴维·希夫林（David Schiffrin），1994年）。

::: example 临界晶核 {#ex-nucleus}
对图中的示例数值（$\gamma = 0.10\ \mathrm{J\,m^{-2}}$、$\Omega = 5.0\times10^{-29}\ \mathrm{m^3}$、$T = 298\ \mathrm{K}$），计算$S = 10$与$S = 100$时的$r^*$、临界晶核中的单体数以及$\Delta G^*/k_\mathrm{B}T$。若指前因子不变，成核速率在两者之间相差多少倍？
::: solution
$S = 10$时：$\Delta g_V = 1.381\times10^{-23} \times 298 \times \ln10/5.0\times10^{-29} = 1.895\times10^8\ \mathrm{J\,m^{-3}}$，$r^* = 2 \times 0.10/1.895\times10^8 = 1.06\times10^{-9}\ \mathrm{m}$，晶核含$\tfrac43\pi(1.06\times10^{-9})^3/5.0\times10^{-29} = 99$个单体。$\Delta G^* = 16\pi(0.10)^3/[3(1.895\times10^8)^2] = 4.67\times10^{-19}\ \mathrm{J} = 113\,k_\mathrm{B}T$。$S = 100$时$\ln S$加倍，所以$r^*$减半至$0.53\ \mathrm{nm}$（12个单体），$\Delta G^*$降为四分之一，即$28\,k_\mathrm{B}T$。速率之比为$\exp(113 - 28) = e^{85} \approx 10^{37}$：$S = 10$时成核实际上从不发生，$S = 100$时则轻易发生。这些数字只具指示性，因为十几个单元构成的团簇的$\gamma$并不是块体值；但对$S$的极端敏感性是真实的。
:::
:::

## 量子点

当半导体晶体小于电子-空穴对的自然尺度（一对**激子**）时，电子与空穴被挤压，动能升高，光学带隙增大。相关的长度是激子玻尔半径$a_\mathrm{B} = \varepsilon_\mathrm{r}(m_e/\mu)a_0$，其中$\mu$是约化有效质量，其标度与[[materials-chemistry/electronic-structure-solids#prop-hydrogenic]]的类氢施主相同；CdSe的约为$5.6\ \mathrm{nm}$。

::: proposition 布鲁斯方程 {#prop-brus}
强限域区（$R \lesssim a_\mathrm{B}$）内半径为$R$的球形半导体微晶，其最低激发能近似为
$$
E(R) = E_\mathrm{g} + \frac{\hbar^2\pi^2}{2R^2}\left(\frac{1}{m_\mathrm{e}^*} + \frac{1}{m_\mathrm{h}^*}\right) - \frac{1.786\,e^2}{4\pi\varepsilon_0\varepsilon_\mathrm{r}R},
$$ {#eq-brus}
其中$E_\mathrm{g}$是块体带隙，$m_\mathrm{e}^*$与$m_\mathrm{h}^*$是有效质量，$\varepsilon_\mathrm{r}$是相对介电常数。模型假定抛物线能带、表面处无限高的势垒与连续介质介电；对带隙非抛物、势垒有限的极小量子点，它会高估带隙。
:::

::: proof
在有效质量近似下，电子与空穴各像一个质量为$m^*$的自由粒子被约束在不可穿透的球壁内。球中粒子的最低态波函数为$\sin(\pi r/R)/r$，能量为$\hbar^2\pi^2/2m^*R^2$（[[quantum-chemistry/model-systems]]），是势箱中粒子的三维对应。把电子与空穴的限域能加到块体带隙上，即得前两项。电子与空穴通过屏蔽库仑相互作用$-e^2/4\pi\varepsilon_0\varepsilon_\mathrm{r}r_\mathrm{eh}$相互吸引；对两个基态密度之积取平均得$\langle1/r_\mathrm{eh}\rangle = 1.786/R$，此即第三项。由于限域项按$1/R^2$增长而库仑项只按$1/R$增长，$R$小时限域占上风，量子点缩小则带隙张开。
:::

::: widget plot
f: g + 0.376*(1/m + 1/h)/x^2 - 1.786*1.44/(10.6*x)
x: 1, 6
y: 1.5, 3.5
sliders: g=1.74:0.5:3.5:0.01; m=0.13:0.05:0.5:0.01; h=0.45:0.1:1.0:0.01
hlines: 1.77; 3.1
labels: E(R)\ /\ \mathrm{eV}
caption: 布鲁斯方程[[#eq-brus]]给出的最低激发能随量子点半径$x$（以nm计）变化的曲线。常数：$\hbar^2\pi^2/2m_e = 0.376\ \mathrm{eV\,nm^2}$，$e^2/4\pi\varepsilon_0 = 1.44\ \mathrm{eV\,nm}$，$\varepsilon_\mathrm{r} = 10.6$；滑条设定块体带隙$g$（以eV计）与有效质量$m$、$h$（以$m_e$为单位），默认对应CdSe。水平线标出可见光范围$1.77$–$3.1\ \mathrm{eV}$（$700$–$400\ \mathrm{nm}$）。半径从$5$降到$1.5\ \mathrm{nm}$时，带隙扫过整个可见光谱——这就是单一材料能够提供量子点显示器全部颜色的原因。有效质量小（InP、InAs）则限域效应更强。
:::

::: example CdSe量子点的颜色 {#ex-brus}
CdSe取$E_\mathrm{g} = 1.74\ \mathrm{eV}$、$m_\mathrm{e}^* = 0.13\,m_e$、$m_\mathrm{h}^* = 0.45\,m_e$、$\varepsilon_\mathrm{r} = 10.6$。计算半径$2.0\ \mathrm{nm}$与$3.0\ \mathrm{nm}$的量子点的最低激发能与波长。
::: solution
限域项：$(\hbar^2\pi^2/2m_e)(1/0.13 + 1/0.45)/R^2 = 0.376 \times 9.915/R^2 = 3.728/R^2\ \mathrm{eV}$，$R$以nm计。库仑项：$1.786 \times 1.440/(10.6R) = 0.2426/R\ \mathrm{eV}$。$R = 2.0\ \mathrm{nm}$时：$E = 1.74 + 0.932 - 0.121 = 2.55\ \mathrm{eV}$，$\lambda = 1240/2.55 = 486\ \mathrm{nm}$。$R = 3.0\ \mathrm{nm}$时：$E = 1.74 + 0.414 - 0.081 = 2.07\ \mathrm{eV}$，$598\ \mathrm{nm}$。较小的量子点吸收（并且，因斯托克斯位移很小，也发射）蓝绿色的光，较大的发橙色。这两个尺寸实测的CdSe吸收峰在稍长一些的波长（约$520$与$600\ \mathrm{nm}$），因为模型对小量子点的限域有所高估。由于量子点小于$a_\mathrm{B} = 5.6\ \mathrm{nm}$，强限域是个合理的近似。
:::
:::

量子点的用途：显示器背光源中的色转换层（其窄发射线给出饱和的颜色）；生物学中的荧光标记（配以保护壳与包覆层）；以及实验性的太阳能电池与光电探测器。商业量子点越来越多地改用InP或钙钛矿组分而不是镉化合物，因为镉有毒，其在电子器件中的使用受到限制。性能最好的发光体带有宽带隙半导体的壳（CdSe/ZnS核-壳量子点），除去表面态——否则表面态会俘获载流子并猝灭发光。阿列克谢·埃基莫夫（Alexei Ekimov，1981年，在玻璃中）、路易斯·布鲁斯（Louis Brus，1983–84年，在胶体中）与蒙吉·巴文迪（Moungi Bawendi，1993年，热注入法）因量子点的发现与合成共享2023年诺贝尔化学奖。

::: warning 小并不只是"多一点表面" {#warn-nano}
两种相反的常见错误。一种把纳米颗粒当作表面稍多的块体材料，于是它的一切性质都随表面积光滑变化；这就错过了当颗粒小于某个物理长度（激子半径、电子平均自由程、磁畴尺寸）时出现的定性变化，例如量子点的蓝移或超顺磁性。另一种把一切不寻常的性质都归因于"量子效应"；然而金纳米颗粒的颜色是经典的电磁共振，小颗粒的催化活性也常常来自配位数低的表面原子，而不是量子化的能级。要判断正在跨越的是哪个长度尺度。
:::

## 金属纳米颗粒与等离激元

金或银溶胶的颜色来自**局域表面等离激元共振**：在光的电场驱动下，导带电子对正离子实的集体振荡。因为颗粒远小于波长，其上的场几乎是均匀的，作准静态计算即可。

::: proposition 小球的等离激元共振 {#prop-plasmon}
半径$R \ll \lambda$、介电函数为$\varepsilon(\omega)$的球，处于介电常数为$\varepsilon_\mathrm{m}$的介质中，其极化率为
$$
\alpha = 4\pi\varepsilon_0R^3\,\frac{\varepsilon - \varepsilon_\mathrm{m}}{\varepsilon + 2\varepsilon_\mathrm{m}},
$$ {#eq-polarisability}
当$\mathrm{Re}\,\varepsilon(\omega) = -2\varepsilon_\mathrm{m}$（**弗勒利希条件**）时，它因共振而变得极大。对服从德鲁德（Drude）形式$\varepsilon(\omega) = \varepsilon_\infty - \omega_\mathrm{p}^2/\omega^2$的金属，共振发生在$\omega_\mathrm{sp} = \omega_\mathrm{p}/\sqrt{\varepsilon_\infty + 2\varepsilon_\mathrm{m}}$，在这一近似下与尺寸无关。它适用于约$5$–$50\ \mathrm{nm}$的$R$；更大的颗粒出现迟滞（retardation）效应（红移与展宽），更小的颗粒则因表面散射而有额外的阻尼。
:::

::: proof
在均匀外加场$E_0$中求解球内外的拉普拉斯方程，边界条件为电势连续、以及$\varepsilon\mathbf{E}$的法向分量在表面连续。解与任何静电学教科书相同：球内为均匀场，$E_\mathrm{in} = 3\varepsilon_\mathrm{m}E_0/(\varepsilon + 2\varepsilon_\mathrm{m})$；球外为外加场加上一个点偶极子$p = 4\pi\varepsilon_0\varepsilon_\mathrm{m}R^3[(\varepsilon - \varepsilon_\mathrm{m})/(\varepsilon + 2\varepsilon_\mathrm{m})]E_0$的场，由此得到[[#eq-polarisability]]（介质因子已吸收进$\alpha$的定义）。内场与偶极矩都在分母为零处发散；$\varepsilon$为复数时，虚部限制峰值，吸收在$\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$处出现峰。代入德鲁德形式，$\varepsilon_\infty - \omega_\mathrm{p}^2/\omega^2 = -2\varepsilon_\mathrm{m}$给出$\omega^2 = \omega_\mathrm{p}^2/(\varepsilon_\infty + 2\varepsilon_\mathrm{m})$。
:::

对金，大致取$\hbar\omega_\mathrm{p} \approx 9.0\ \mathrm{eV}$、$\varepsilon_\infty \approx 9.5$（代表$d$带电子），在水中（$\varepsilon_\mathrm{m} = n^2 = 1.78$）共振位于$\hbar\omega = 9.0/\sqrt{13.06} = 2.49\ \mathrm{eV}$附近，约$500\ \mathrm{nm}$（实测：$520\ \mathrm{nm}$）。吸收绿光后，溶胶看起来呈红色。银的$\varepsilon_\infty$较小，在$400\ \mathrm{nm}$附近共振，看起来呈黄色。由于共振依赖$\varepsilon_\mathrm{m}$，分子结合到颗粒表面时它会发生移动——这正是比色检测的基础，如早孕与抗原检测所用的金纳米颗粒侧流层析试纸条，以及等离激元传感器。纳米棒、纳米壳与颗粒对把共振移到红光与近红外；等离激元颗粒表面极强的局域场把吸附分子的拉曼散射增强$10^6$倍以上（表面增强拉曼光谱）。公元四世纪罗马的莱克格斯杯，反射光下呈绿色、透射光下呈红色，其中就含有银-金纳米颗粒。

::: quiz
哪些改变会使水中球形金纳米颗粒的等离激元吸收移向更长波长？
- [x] 把颗粒转入折射率更高的溶剂
- [ ] 在准静态模型下把颗粒从 20 nm 缩小到 10 nm
- [x] 让颗粒聚集成间距很小的团簇
- [x] 给颗粒包覆一层致密的吸附蛋白壳
::: solution
共振条件$\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$随$\varepsilon_\mathrm{m}$增大移向更低频率（更长波长），所以折射率更高的溶剂或致密的吸附层都会使其红移。聚集会耦合相邻颗粒的等离激元，产生一条新的红移谱带（溶胶由红变紫蓝，这是许多金纳米颗粒检测的判读信号）。准静态模型中共振与尺寸无关，所以把球从$20$缩到$10\ \mathrm{nm}$几乎不动它（只是稍微变宽）。
:::
:::

### 磁性纳米颗粒

小于约$20$–$100\ \mathrm{nm}$的铁磁或亚铁磁颗粒容不下磁畴壁，是单畴的。它的总磁矩沿易磁化轴取向，翻转必须越过各向异性势垒$KV$，其中$K$是各向异性能密度，$V$是体积。奈尔（Néel）弛豫时间为$\tau = \tau_0\exp(KV/k_\mathrm{B}T)$，$\tau_0 \approx 10^{-9}\ \mathrm{s}$。当$\tau$短于测量时间时，磁矩自由翻转，颗粒表现得像具有巨大磁矩的顺磁体——**超顺磁性**：没有剩磁，没有矫顽力，磁化率却极大。**阻塞温度**$T_\mathrm{B} = KV/[k_\mathrm{B}\ln(\tau_\mathrm{m}/\tau_0)]$区分两个区域。超顺磁性氧化铁颗粒用作磁共振成像造影剂、细胞与蛋白质的磁分离，以及实验性的磁热疗；在数据存储中，同样的物理决定了稳定磁位的最小尺寸（"超顺磁极限"）。

## 碳纳米材料与二维固体

碳由$sp^2$网络形成了一族非凡的纳米结构。**富勒烯**是封闭的笼，如$\mathrm{C_{60}}$（十二个五边形与二十个六边形，足球的形状），由哈罗德·克罗托（Harold Kroto）、罗伯特·柯尔（Robert Curl）、理查德·斯莫利（Richard Smalley）与合作者1985年在激光汽化石墨中发现（1996年诺贝尔化学奖），1990年由沃尔夫冈·克拉奇默（Wolfgang Krätschmer）与唐纳德·赫夫曼（Donald Huffman）实现宏量制备。**碳纳米管**由饭岛澄男（Sumio Iijima）1991年报道，是把石墨烯片卷成的无缝圆柱。**石墨烯**——单层石墨——由机械剥离法分离，其电子性质由安德烈·海姆（Andre Geim）、康斯坦丁·诺沃肖洛夫（Konstantin Novoselov）与合作者在2004年测得（2010年诺贝尔物理学奖）。

石墨烯的能带结构独一无二。由两个原子六角晶胞的$p_z$轨道构成的$\pi$与$\pi^*$能带（其构造与[[materials-chemistry/electronic-structure-solids#prop-tight-binding]]完全类似）在六角布里渊区的角上相切，费米能级就在那里。在这些**狄拉克点**附近，能量随波矢线性变化，$E = \pm\hbar v_\mathrm{F}\lvert\mathbf{k}\rvert$，$v_\mathrm{F} \approx 1\times10^6\ \mathrm{m\,s^{-1}}$，如同无静止质量的相对论性粒子，而不是普通电子的二次方。所以石墨烯是零带隙的半金属，载流子迁移率极高；它也是已测得最强的材料，气体不可穿透，且是优异的导热体。

::: definition 碳纳米管的手性矢量 {#def-chirality}
单壁纳米管由石墨烯晶格的**手性矢量**$\mathbf{C}_h = n\mathbf{a}_1 + m\mathbf{a}_2$（晶格常数$a = \lvert\mathbf{a}_1\rvert = 0.246\ \mathrm{nm}$）完全确定，片层卷起后它就是管身的周长。管的直径为
$$
d = \frac{a\sqrt{n^2 + nm + m^2}}{\pi}.
$$ {#eq-cnt}
$(n, n)$管是**扶手椅型**，$(n, 0)$是**锯齿型**，其余为**手性**的。在简单的区域折叠图像中，$n - m$能被3整除的管是金属性的，否则是半导体性的，其带隙与直径成反比（约$0.8\ \mathrm{eV}/d$，$d$以nm计）；曲率会在非扶手椅的"金属"管上开出一个很小的带隙。
:::

::: example 哪些纳米管导电？ {#ex-cnt}
求$(10, 10)$、$(10, 0)$、$(12, 0)$与$(6, 5)$纳米管的直径与电子性质。
::: solution
由[[#eq-cnt]]：$(10, 10)$：$\sqrt{300} = 17.32$，$d = 0.246 \times 17.32/\pi = 1.36\ \mathrm{nm}$，$n - m = 0$：金属性（扶手椅型，真正的金属）。$(10, 0)$：$d = 0.246 \times 10/\pi = 0.783\ \mathrm{nm}$，$n - m = 10$，不能被3整除：半导体性，带隙约$0.8/0.78 \approx 1.0\ \mathrm{eV}$。$(12, 0)$：$d = 0.940\ \mathrm{nm}$，$n - m = 12$：按区域折叠为金属性（实际上有几十meV的小曲率带隙）。$(6, 5)$：$\sqrt{91} = 9.54$，$d = 0.747\ \mathrm{nm}$，$n - m = 1$：半导体性，约$1.1\ \mathrm{eV}$。统计上约三分之一的管是金属性的。$(6, 5)$管在近$980\ \mathrm{nm}$处发光，在某些合成方法中含量最高。按手性分离纳米管（密度梯度超速离心、色谱或选择性聚合物包覆）仍是纳米管电子学的核心难题。
:::
:::

石墨烯开启了**二维材料**的领域。六方氮化硼是它的绝缘对应物（$E_\mathrm{g} \approx 6\ \mathrm{eV}$），用作原子级平整的衬底与封装层。过渡金属硫族化合物（$\mathrm{MoS_2}$、$\mathrm{WS_2}$与$\mathrm{WSe_2}$等）具有[[materials-chemistry/crystal-structures]]中的层状结构；块体$\mathrm{MoS_2}$的带隙是约$1.2\ \mathrm{eV}$的间接带隙，单层却在$1.9\ \mathrm{eV}$附近变为直接带隙并强烈发光——这是2010年报道的引人注目的维度效应。黑磷（磷烯）的带隙随厚度可调；**MXene**是过渡金属碳化物与氮化物（如$\mathrm{Ti_3C_2T}_x$），靠把MAX相中的A层刻蚀掉而得（米哈伊尔·纳吉布（Michael Naguib）、尤里·戈戈齐（Yury Gogotsi）、米歇尔·巴尔苏姆（Michel Barsoum）与合作者2011年首报），具有金属性、亲水，被用于储能研究。不同二维层靠范德华力堆叠成的异质结构可以设计性质，包括转角约$1.1^\circ$的双层石墨烯的超导性（2018年）。

纳米材料带来其块体材料所没有的安全与环境归趋问题。高比表面使其更活泼，对某些材料而言也更易中毒；形状细长的刚性纳米管一旦被吸入，在肺中的行为可以类似石棉；消费产品释放的银、氧化锌与二氧化钛纳米颗粒会进入废水。风险评估要考虑组成、尺寸、形状、表面包覆、溶解度与暴露途径；包括上述定义在内的纳米材料在化学品与化妆品法规下的监管，截至2026年仍在不断发展之中。

## 后续内容

纳米材料与本课程几乎每一章都有联系。它们的合成用到[[materials-chemistry/solid-synthesis]]的溶液与气相方法；尺寸由谢乐宽化（[[materials-chemistry/diffraction]]）与显微术测定；限域效应来自[[materials-chemistry/electronic-structure-solids]]；磁性来自[[materials-chemistry/magnetic-optical]]。纳米结构的电极、催化剂与吸收材料是[[materials-chemistry/energy-materials]]的核心；负载型金属纳米颗粒是[[organometallics-catalysis/heterogeneous-catalysis]]中多数催化剂的活性相；工程纳米颗粒的危害与归趋见[[environmental-chemistry/pollutants-fate]]。

::: history
迈克尔·法拉第1857年的贝克尔讲座把金的"细微颗粒"认作金溶胶颜色的原因；古斯塔夫·米（Gustav Mie）1908年给出了光被球体散射的电磁理论；里夏德·西格蒙迪（Richard Zsigmondy）的超显微镜（1903年）使胶体颗粒可见（1925年诺贝尔化学奖）。理查德·费曼（Richard Feynman）1959年的讲座《底部大有空间》预告了原子尺度的工程。阿列克谢·埃基莫夫1981年在玻璃中的CuCl纳米晶中观察到尺寸依赖的吸收，路易斯·布鲁斯1983–84年描述了胶体半导体微晶的尺寸依赖，默里、诺里斯与巴文迪的热注入合成发表于1993年（2023年诺贝尔化学奖）。富勒烯（1985年）、碳纳米管（1991年）与石墨烯（2004年）相继问世，碳的每一种新形态接连被发现。拉默与迪内加的成核模型（1950年）、图克维奇的柠檬酸盐法（1951年）与布鲁斯特-希夫林合成（1994年）至今仍是胶体纳米颗粒化学的基石。
:::

::: summary
- 纳米材料的尺寸约为$1$–$100\ \mathrm{nm}$；当尺寸与块体材料的某个物理长度尺度相当时，性质就会改变。
- 球体的表面分数为$1 - (1 - d/R)^3 \approx 3d/R$；表面能抬高溶解度（奥斯特瓦尔德熟化）、降低熔点（吉布斯-汤姆孙），小颗粒可以在催化上与众不同。
- 经典成核理论给出$r^* = 2\gamma\Omega/k_\mathrm{B}T\ln S$与$\Delta G^* \propto \gamma^3/(\ln S)^2$；均匀的颗粒需要一次短促的成核爆发，随后生长（拉默法、热注入法），并需要表面配体。
- 小于激子玻尔半径的量子点，其带隙为$E_\mathrm{g} + (\hbar^2\pi^2/2R^2)(1/m_\mathrm{e}^* + 1/m_\mathrm{h}^*) - 1.786e^2/4\pi\varepsilon_0\varepsilon_\mathrm{r}R$（布鲁斯方程），颜色由此可调遍整个可见区。
- 金属纳米颗粒在$\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$处显示局域表面等离激元共振（金约$520\ \mathrm{nm}$），对环境与聚集状态敏感。
- 单畴磁性颗粒在阻塞温度$T_\mathrm{B} \approx KV/k_\mathrm{B}\ln(\tau_\mathrm{m}/\tau_0)$之上变为超顺磁性。
- 石墨烯具有线性（狄拉克）能带且无带隙；$(n, m)$纳米管当$n - m$可被3整除时为金属性；单层$\mathrm{MoS_2}$是直接带隙半导体，与块体不同。
:::

## 练习

::: exercise 表面分数 {level=1 check="0.472"}
用[[#eq-surface]]并取$d = 0.288\ \mathrm{nm}$，计算直径$3.0\ \mathrm{nm}$金颗粒的精确表面分数。（以三位有效数字输入分数。）
::: solution
$R = 1.5\ \mathrm{nm}$，$d/R = 0.192$，$f_\mathrm{s} = 1 - 0.808^3 = 1 - 0.5275 = 0.472$。近似值$3d/R$给出$0.58$。
:::
:::

::: exercise 一个纳米管的直径 {level=1 check="0.747"}
计算$(6, 5)$碳纳米管的直径，并说明它是金属性还是半导体性。（以nm输入$d$，三位有效数字。）
::: solution
$d = 0.246\sqrt{36 + 30 + 25}/\pi = 0.246 \times 9.539/3.1416 = 0.747\ \mathrm{nm}$。$n - m = 1$不能被3整除：半导体性。
:::
:::

::: exercise 石墨烯的比表面积 {level=1 check="2630"}
石墨烯每个六角晶胞含两个碳原子，晶胞面积$\tfrac{\sqrt3}{2}a^2$，$a = 0.246\ \mathrm{nm}$。计算它的理论比表面积，两个面都计入。（以$\mathrm{m^2\,g^{-1}}$输入面积，三位有效数字。）
::: solution
每个原子的面积$= \tfrac{\sqrt3}{2}(0.246\times10^{-9})^2/2 = 2.620\times10^{-20}\ \mathrm{m^2}$。每克原子数$= 6.022\times10^{23}/12.011 = 5.014\times10^{22}$。两个面：$2 \times 5.014\times10^{22} \times 2.620\times10^{-20} = 2630\ \mathrm{m^2\,g^{-1}}$。这是比较多孔碳与MOF（[[materials-chemistry/porous-materials]]）的基准；真实石墨烯粉末的堆叠与皱褶会使可利用的面积减少。
:::
:::

::: exercise 量子点的颜色 {level=2 check="554"}
用布鲁斯方程与[[#ex-brus]]的CdSe参数，求半径$2.5\ \mathrm{nm}$的量子点的最低激发波长。（以nm输入$\lambda$，三位有效数字。）
::: solution
限域项：$3.728/2.5^2 = 0.597\ \mathrm{eV}$；库仑项：$0.2426/2.5 = 0.097\ \mathrm{eV}$。$E = 1.74 + 0.597 - 0.097 = 2.239\ \mathrm{eV}$，$\lambda = 1239.8/2.239 = 554\ \mathrm{nm}$（黄绿色）。
:::
:::

::: exercise 超顺磁阻塞 {level=2 check="16"}
直径$10\ \mathrm{nm}$的磁铁矿颗粒的各向异性常数$K = 1.1\times10^4\ \mathrm{J\,m^{-3}}$。取$\tau_0 = 1\times10^{-9}\ \mathrm{s}$、测量时间$100\ \mathrm{s}$，估计阻塞温度。若直径加倍，情况如何？（以K输入$10\ \mathrm{nm}$颗粒的$T_\mathrm{B}$，两位有效数字。）
::: solution
$V = \tfrac{\pi}{6}(10^{-8})^3 = 5.24\times10^{-25}\ \mathrm{m^3}$，$KV/k_\mathrm{B} = 1.1\times10^4 \times 5.24\times10^{-25}/1.381\times10^{-23} = 417\ \mathrm{K}$，$\ln(100/10^{-9}) = 25.3$，所以$T_\mathrm{B} = 417/25.3 = 16\ \mathrm{K}$。室温下这些颗粒是超顺磁的。直径加倍使$V$增大8倍：$T_\mathrm{B} \approx 130\ \mathrm{K}$，在室温下仍为超顺磁。（实测阻塞温度通常更高，因为表面各向异性与形状各向异性会抬高有效$K$，而且颗粒间存在相互作用。）
:::
:::

::: exercise 水中银的等离激元 {level=2 check="371"}
银取$\hbar\omega_\mathrm{p} = 9.0\ \mathrm{eV}$、$\varepsilon_\infty = 3.7$，代入德鲁德形式。求水中小银球的准静态等离激元波长（$\varepsilon_\mathrm{m} = 1.78$）。（以nm输入波长，三位有效数字。）
::: solution
$\hbar\omega_\mathrm{sp} = 9.0/\sqrt{3.7 + 3.56} = 9.0/2.694 = 3.34\ \mathrm{eV}$；$\lambda = 1239.8/3.340 = 371\ \mathrm{nm}$。实测的银溶胶在$400\ \mathrm{nm}$附近吸收；简单的德鲁德参数低估了带间跃迁的影响，但模型正确地把银置于金的蓝侧。
:::
:::

::: exercise 势垒与过饱和度 {level=3 check="0.25"}
(a) 推导[[#eq-critical]]中的$r^*$与$\Delta G^*$。(b) 过饱和度从$S = 10$升到$S = 100$时，$\Delta G^*$变为原来的多少？(c) 证明$\Delta G^* = \tfrac13 \times$（临界晶核的表面能）。（输入(b)的因子。）
::: solution
(a) 如[[#prop-nucleation]]的证明。(b) $\Delta G^* \propto 1/(\ln S)^2$；$\ln100 = 2\ln10$，所以势垒降为四分之一：因子是$0.25$。(c) 临界晶核的表面能为$4\pi r^{*2}\gamma = 4\pi(2\gamma/\Delta g_V)^2\gamma = 16\pi\gamma^3/\Delta g_V^2$，恰为$\Delta G^*$的三倍。在临界尺寸处，体积项补偿了表面代价的三分之二。
:::
:::

::: exercise 金纳米颗粒的熔化 {level=3 check="218"}
(a) 对与自身熔体平衡的半径为$R$的固体球，把多出的化学势$2\sigma_\mathrm{sl}V_\mathrm{m}/R$与$\Delta_\mathrm{fus}H\,\Delta T/T_\mathrm{m}$相平衡，证明$\Delta T = 2\sigma_\mathrm{sl}T_\mathrm{m}/(\Delta_\mathrm{fus}H_VR)$，其中$\Delta_\mathrm{fus}H_V$是单位体积的熔化焓。(b) 金：$T_\mathrm{m} = 1337\ \mathrm{K}$，$\Delta_\mathrm{fus}H = 12.55\ \mathrm{kJ\,mol^{-1}}$，$M = 196.97\ \mathrm{g\,mol^{-1}}$，$\rho = 19.3\ \mathrm{g\,cm^{-3}}$；取$\sigma_\mathrm{sl} = 0.20\ \mathrm{J\,m^{-2}}$（在报道范围内的示例数值）。估计$R = 2.0\ \mathrm{nm}$的熔点降低。（以K输入$\Delta T$，三位有效数字。）
::: hint
$T_\mathrm{m}$附近每摩尔熔化吉布斯自由能为$\Delta_\mathrm{fus}G \approx \Delta_\mathrm{fus}H(1 - T/T_\mathrm{m})$。
:::
::: solution
(a) 小固体的摩尔吉布斯自由能升高，$G_\mathrm{s}(R) = G_\mathrm{s}(\infty) + 2\sigma_\mathrm{sl}V_\mathrm{m}/R$。当$G_\mathrm{l} = G_\mathrm{s}(R)$时它熔化，即$\Delta_\mathrm{fus}G = G_\mathrm{l} - G_\mathrm{s}(\infty) = 2\sigma_\mathrm{sl}V_\mathrm{m}/R$。由$\Delta_\mathrm{fus}G \approx \Delta_\mathrm{fus}H(T_\mathrm{m} - T)/T_\mathrm{m}$，得$\Delta T = 2\sigma_\mathrm{sl}V_\mathrm{m}T_\mathrm{m}/(\Delta_\mathrm{fus}HR) = 2\sigma_\mathrm{sl}T_\mathrm{m}/(\Delta_\mathrm{fus}H_VR)$，因为$\Delta_\mathrm{fus}H/V_\mathrm{m} = \Delta_\mathrm{fus}H_V$。(b) $\Delta_\mathrm{fus}H_V = 12\,550 \times 19.3\times10^6/196.97 = 1.230\times10^9\ \mathrm{J\,m^{-3}}$。$\Delta T = 2 \times 0.20 \times 1337/(1.230\times10^9 \times 2.0\times10^{-9}) = 534.8/2.460 = 217.5\ \mathrm{K} \approx 218\ \mathrm{K}$。该颗粒将在$1120\ \mathrm{K}$附近熔化。比法与博雷尔的实验发现了同量级的降低；在最小的尺寸下$\sigma_\mathrm{sl}$本身也依赖尺寸，简单模型在那里不再可靠。
:::
:::

::: exercise 临界晶核的尺寸 {level=2 check="1.06"}
对$\gamma = 0.10\ \mathrm{J\,m^{-2}}$、$\Omega = 5.0\times10^{-29}\ \mathrm{m^3}$、$T = 298\ \mathrm{K}$、$S = 10$，计算临界半径。（以nm输入$r^*$，三位有效数字。）
::: solution
$r^* = 2\gamma\Omega/(k_\mathrm{B}T\ln S) = 2 \times 0.10 \times 5.0\times10^{-29}/(1.381\times10^{-23} \times 298 \times 2.303) = 1.0\times10^{-29}/9.475\times10^{-21} = 1.06\times10^{-9}\ \mathrm{m} = 1.06\ \mathrm{nm}$。
:::
:::
