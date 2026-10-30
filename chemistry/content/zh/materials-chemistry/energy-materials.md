摆脱化石燃料的过渡在很大程度上是一个材料化学的问题。锂离子电池是两种晶体主体，通过电解质交换锂离子；它的能量由锂在两种主体之间的化学势之差决定，容量由每克主体能容纳多少离子决定，寿命则由这些结构经受反复嵌入的能力决定。太阳能电池是一种半导体，其带隙与缺陷化学决定多大部分的太阳光变成电功。热电发电机必须像金属那样导电、像玻璃那样传热。医院扫描仪中的超导磁体依赖一种电阻严格为零的材料。每项技术都受少数几种材料性质的限制，而这些性质化学家能够理解，并且日益能够设计。

本章汇合本课程前面各章的内容。[[materials-chemistry/crystal-structures]]中的结构、[[materials-chemistry/defects]]中的缺陷平衡与离子导电、[[materials-chemistry/electronic-structure-solids]]中的能带、掺杂与p-n结，将应用于四类能源材料：**电池电极与电解质**、**光伏吸收材料**、**热电材料**与**超导体**。电池与燃料电池的电池热力学与工程技术在[[electrochemistry/batteries]]与[[electrochemistry/fuel-cells-electrolysis]]中讨论；这里着重的是固体。

## 锂离子电池的嵌入电极

锂离子电池通过把锂在两种**嵌入**（插入）主体之间移动来储存能量。放电时，锂以$\mathrm{Li^+}$加一个电子的形式离开负极（通常是石墨，充满时为$\mathrm{LiC_6}$）；离子穿过电解质，电子经外电路，二者一起进入正极，例如$\mathrm{Li_{1-x}CoO_2}$，电子在那里还原一个过渡金属离子：
$$
\mathrm{Li_{1-x}CoO_2} + \mathrm{Li}_x\mathrm{C_6} \rightarrow \mathrm{LiCoO_2} + \mathrm{C_6}.
$$
两种主体的骨架都不被破坏；反应是**拓扑化学的**（topotactic），电极是混合离子-电子导体。三种结构类型主导正极材料。**层状**氧化物$\mathrm{LiMO_2}$（$\mathrm{M} = \mathrm{Co}$，或Ni/Mn/Co混合的“NMC”，或Ni/Co/Al的“NCA”）具有[[materials-chemistry/crystal-structures]]中那种有序化的岩盐结构，锂位于$\mathrm{MO_2}$层之间的八面体位，具有二维扩散通道。**尖晶石**$\mathrm{LiMn_2O_4}$的锂位于四面体位，有三维通道。**橄榄石**$\mathrm{LiFePO_4}$有一维通道，且P–O键很强、把氧牢牢束缚，因而热安全性好却导电性差，所以用作碳包覆的纳米颗粒（[[materials-chemistry/nanomaterials]]）。

::: proposition 由锂的化学势求电池电压 {#prop-cell-voltage}
在负极（放电时为阳极）与正极（阴极）之间转移锂的电池，其开路电压为
$$
E = -\frac{\mu_\mathrm{Li}^\mathrm{cathode} - \mu_\mathrm{Li}^\mathrm{anode}}{F},
$$ {#eq-voltage}
其中$\mu_\mathrm{Li}$是锂（以$\mathrm{Li^+} + e^-$形式）在每个电极中的化学势。若电极以**两相**机理反应（两个固定组成的相共存，如$\mathrm{FePO_4}$与$\mathrm{LiFePO_4}$），则$\mu_\mathrm{Li}$恒定，电压平坦；若形成**固溶体**（$0.5 < x < 1$区间的$\mathrm{Li}_x\mathrm{CoO_2}$），$\mu_\mathrm{Li}$随$x$变化，电压倾斜。这一结果假定平衡（无电流、无超电势）。
:::

::: proof
电池放电时把$dn$摩尔的锂从负极转移到正极，吉布斯自由能改变$dG = (\mu_\mathrm{Li}^\mathrm{cathode} - \mu_\mathrm{Li}^\mathrm{anode})\,dn$。恒温恒压下的最大电功为$-dG$，通过的电荷为$F\,dn$，所以$E\,F\,dn = -dG$，即得[[#eq-voltage]]（[[electrochemistry/cell-thermodynamics]]）。对恒温恒压下的两相电极，含两个组分（Li与主体）、两个相的吉布斯相律在固定$T$、$p$下给出$F' = C - P + 2 - 2 = 0$个自由度：各相的组成，从而$\mu_\mathrm{Li}$，都是固定的，变化的只是各相的比例。单相固溶体有一个自由度，即组成$x$，$\mu_\mathrm{Li}(x)$随之变化；若Li与空位在格位上理想混合，$\mu_\mathrm{Li} = \mu^\circ + RT\ln[x/(1 - x)]$，给出S形的电压曲线。
:::

电压反映主体中氧化还原电对相对于锂金属的能量。在氧化物中，$\mathrm{Co^{4+}/Co^{3+}}$位于Li以下约$4\ \mathrm{V}$；在磷酸盐中，$\mathrm{PO_4^{3-}}$基团的**电感效应**（强P–O共价削弱Fe–O共价，使$\mathrm{Fe^{3+}/Fe^{2+}}$能级降低）把$\mathrm{Fe^{3+}/Fe^{2+}}$的电压从铁氧化物中的约$2.5\ \mathrm{V}$提高到$\mathrm{LiFePO_4}$中的$3.45\ \mathrm{V}$。石墨的工作电位在锂金属以上$0.1$–$0.2\ \mathrm{V}$，近到足以给出高的电池电压，又远到足以降低锂沉积成枝的风险。

::: definition 理论比容量 {#def-capacity}
每摩尔化学式单位可逆交换$n$摩尔电子（以及锂离子）、摩尔质量为$M$的电极材料，其**理论比容量**为
$$
Q = \frac{nF}{3.6\,M}\ \mathrm{mA\,h\,g^{-1}} \qquad (M\ \text{以}\ \mathrm{g\,mol^{-1}}\ \text{计}),
$$ {#eq-capacity}
因为$1\ \mathrm{mA\,h} = 3.6\ \mathrm{C}$。电池的**比能量**是电压对电荷的积分，近似为$\bar E\,Q_\mathrm{cell}$；对容量分别为$Q_+$与$Q_-$（按各自每克计）的两个电极，两者合计每克的容量为$Q_\mathrm{cell} = (1/Q_+ + 1/Q_-)^{-1}$。当只有部分锂能在不破坏结构的前提下脱出时，实际容量会更低。
:::

::: example 常用电极的容量与能量 {#ex-capacity}
(a) 计算$\mathrm{LiCoO_2}$、$\mathrm{LiFePO_4}$与石墨（$\mathrm{C_6} \rightarrow \mathrm{LiC_6}$）的理论容量。(b) $\mathrm{LiCoO_2}$中通常只循环大约一半的锂，其实际容量是多少？(c) 以平均电压$3.3\ \mathrm{V}$估算$\mathrm{LiFePO_4}$/石墨电池按电极活性材料质量计的理论比能量。
::: solution
(a) $n = 1$时$nF/3.6 = 26\,801\ \mathrm{mA\,h\,mol^{-1}}$。$\mathrm{LiCoO_2}$：$M = 6.941 + 58.933 + 2(15.999) = 97.87$，$Q = 26\,801/97.87 = 274\ \mathrm{mA\,h\,g^{-1}}$。$\mathrm{LiFePO_4}$：$M = 157.76$，$Q = 170\ \mathrm{mA\,h\,g^{-1}}$。石墨：按$\mathrm{C_6}$计，$M = 72.07$，$Q = 372\ \mathrm{mA\,h\,g^{-1}}$。(b) $137\ \mathrm{mA\,h\,g^{-1}}$。从$\mathrm{Li_{1-x}CoO_2}$中脱出超过约一半的锂会使层状结构失稳、氧化氧离子并释放氧气；现代掺杂与包覆的正极可达到理论值的约$0.6$–$0.7$。(c) $Q_\mathrm{cell} = (1/170 + 1/372)^{-1} = 117\ \mathrm{mA\,h\,g^{-1}}$，$3.3\ \mathrm{V} \times 117\ \mathrm{mA\,h\,g^{-1}} = 385\ \mathrm{mW\,h\,g^{-1}} = 385\ \mathrm{W\,h\,kg^{-1}}$。这一体系的成品电池连同电解质、隔膜、集流体与外壳，大约达到$160$–$200\ \mathrm{W\,h\,kg^{-1}}$，约为活性材料值的一半。
:::
:::

### 负极、电解质与安全

锂金属的容量高居各材料之首（$3861\ \mathrm{mA\,h\,g^{-1}}$），但充电时它往往以枝晶形式沉积，可能刺穿隔膜使电池短路；能把锂夹在层间的石墨，才是使可充电锂离子电池得以实用的解决方案。硅可以合金化锂直到$\mathrm{Li_{15}Si_4}$（按Si计$3579\ \mathrm{mA\,h\,g^{-1}}$），但体积膨胀近300 %，使自己粉化；现在它以小比例掺入石墨，常用能耐受应变的纳米颗粒。钛酸锂尖晶石$\mathrm{Li_4Ti_5O_{12}}$容量较低，但几乎没有任何体积变化（“零应变”），动力学快而安全。

液体电解质通常是$\mathrm{LiPF_6}$的$1\ \mathrm{mol\,dm^{-3}}$碳酸乙烯酯与链状碳酸酯混合溶液，在石墨的电位下热力学上不稳定。它能够工作，是因为首次充电时它被还原，形成一层薄的、导离子却绝缘电子的膜，即**固体电解质界面**（SEI），此后它使负极钝化。SEI不可逆地消耗一部分锂，它的缓慢增长是容量衰减的主要原因之一。碳酸酯溶剂的可燃性，加上充电态氧化物正极释放氧气，使得电池在过热、过充或被刺穿时可能发生**热失控**：锂离子电池在运输中列为危险品，损坏的电池必须按火灾隐患处置。固体电解质，如石榴石型$\mathrm{Li_7La_3Zr_2O_{12}}$或$\mathrm{Li_{10}GeP_2S_{12}}$一类硫化物以及硫银锗矿型$\mathrm{Li_6PS_5Cl}$，就是[[materials-chemistry/defects]]中描述过的那类快离子导体，人们正在为“固态”电池开发它们：那样的电池应不可燃，并可能使用锂金属负极。**钠离子**电池使用硬碳负极与层状氧化物或普鲁士蓝类似物正极，避开了锂与钴，正在为固定式储能与低成本车辆商业化。

::: warning 容量不是能量，材料不是电池 {#warn-capacity}
比容量更高的正极材料未必带来更好的电池。能量取决于容量*乘以*电压，所以$\mathrm{LiFePO_4}$（$170\ \mathrm{mA\,h\,g^{-1}}$，$3.45\ \mathrm{V}$）每克储存的能量少于高镍层状氧化物（$200\ \mathrm{mA\,h\,g^{-1}}$，约$3.8\ \mathrm{V}$），却多过一种假想的$250\ \mathrm{mA\,h\,g^{-1}}$、$2\ \mathrm{V}$的材料。电池的容量受总容量较少的那个电极限制，而非活性组分通常使质量加倍。此外，循环寿命、倍率性能、安全性、成本与元素的供应（钴、镍、锂）往往比最后百分之十的能量密度更要紧。读那些仅凭单一材料容量就宣称“电池好十倍”的说法时，应当把这些都放在心上。
:::

## 光伏材料

太阳能电池吸收一个光子，产生一个电子-空穴对（[[materials-chemistry/electronic-structure-solids]]），并在其复合之前把这一对分开，通常靠p-n结的内建电场。能量低于带隙$E_\mathrm{g}$的光子不被吸收；高于带隙的光子虽被吸收，多余的能量却在载流子弛豫到带边时以热的形式损失。带隙太小会浪费蓝光光子的能量；带隙太大则吸收不了红光。

::: definition 太阳能电池参数 {#def-pv}
受光照电池的电流密度-电压曲线由**短路电流密度**$J_\mathrm{sc}$（$V = 0$处）、**开路电压**$V_\mathrm{oc}$（$J = 0$处）与**填充因子**$\mathrm{FF} = J_\mathrm{mp}V_\mathrm{mp}/(J_\mathrm{sc}V_\mathrm{oc})$表征，其中$(V_\mathrm{mp}, J_\mathrm{mp})$为最大功率点。**光电转换效率**为
$$
\eta = \frac{J_\mathrm{sc}V_\mathrm{oc}\mathrm{FF}}{P_\mathrm{in}},
$$
$25\,^\circ\mathrm{C}$标准AM1.5G光谱下$P_\mathrm{in} = 100\ \mathrm{mW\,cm^{-2}}$。
:::

::: proposition 理想二极管与开路电压 {#prop-diode}
受光照的理想p-n结电池满足
$$
J(V) = J_\mathrm{sc} - J_0\left[\exp\!\left(\frac{qV}{k_\mathrm{B}T}\right) - 1\right], \qquad V_\mathrm{oc} = \frac{k_\mathrm{B}T}{q}\ln\!\left(\frac{J_\mathrm{sc}}{J_0} + 1\right),
$$ {#eq-diode}
其中**暗饱和电流**$J_0$量度复合，并按$J_0 \propto n_\mathrm{i}^2 \propto \exp(-E_\mathrm{g}/k_\mathrm{B}T)$变化。该模型假定光电流与暗态二极管电流可叠加、无串联与并联电阻、复合只发生在中性区（理想因子1）。
:::

::: proof
暗态下，正偏压$V$使结垒降低$qV$，因而能越过结、并在另一侧以少数载流子身份复合的多子数目按玻尔兹曼因子$e^{qV/k_\mathrm{B}T}$增长。热生少子的反向流动与$V$无关，所以净电流为$J_0(e^{qV/k_\mathrm{B}T} - 1)$；平衡时两种流动都正比于少子浓度，按[[materials-chemistry/electronic-structure-solids#eq-np]]为$n_\mathrm{i}^2/N_\mathrm{A}$与$n_\mathrm{i}^2/N_\mathrm{D}$，于是$J_0 \propto n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}e^{-E_\mathrm{g}/k_\mathrm{B}T}$。光照附加一个光电流$J_\mathrm{sc}$，其载流子被结扫向反方向。叠加得$J(V)$；令$J = 0$并求解即得$V_\mathrm{oc}$。由于$J_0$随$E_\mathrm{g}$指数下降，$V_\mathrm{oc}$随带隙近似线性上升，而$J_\mathrm{sc}$因吸收的光子变少而下降。
:::

$V_\mathrm{oc}$与$J_\mathrm{sc}$之间的竞争在最优带隙处给出效率极大。肖克利（William Shockley）与奎伊瑟（Hans-Joachim Queisser）1961年计算，假定唯一不可避免的损耗是辐射复合（电池作为一定温度的物体必须发光），得出标准太阳光谱下单结电池的极限效率约33 %，在$E_\mathrm{g} \approx 1.3$–$1.4\ \mathrm{eV}$处达到。计入俄歇复合后，硅（$1.12\ \mathrm{eV}$，间接带隙）的极限约为29–30 %；GaAs（$1.42\ \mathrm{eV}$，直接带隙）与铅卤化物钙钛矿（$1.5$–$1.6\ \mathrm{eV}$）接近最优值。**叠层**电池把宽带隙电池置于窄带隙电池之上，让每个光子落在带隙与它最匹配的电池中，从而超过单结极限。

::: widget plot
f: j - 10^(-p)*(exp(x/0.025852) - 1); x*(j - 10^(-p)*(exp(x/0.025852) - 1))
x: 0, 0.8
y: 0, 45
sliders: j=40:10:45:0.5; p=10:7:13:0.1
labels: J\ /\ \mathrm{mA\,cm^{-2}}; P = JV\ /\ \mathrm{mW\,cm^{-2}}
caption: $300\ \mathrm{K}$电池的理想二极管方程[[#eq-diode]]：电流密度$J$与功率密度$P$对电压$x$（V）的曲线，光电流$j$（mA cm⁻²）与暗饱和电流$J_0 = 10^{-p}\ \mathrm{mA\,cm^{-2}}$由滑条设定。默认的$J_0 = 10^{-10}\ \mathrm{mA\,cm^{-2}}$（$10^{-13}\ \mathrm{A\,cm^{-2}}$）给出$V_\mathrm{oc} = 0.69\ \mathrm{V}$、最大功率$23\ \mathrm{mW\,cm^{-2}}$（一个太阳光下效率23 %）与填充因子$0.84$。缺陷处复合减少或带隙增大引起的每十倍$J_0$下降，使$V_\mathrm{oc}$升高$k_\mathrm{B}T\ln10/q = 60\ \mathrm{mV}$。实际电池因串联与并联电阻而填充因子较低。
:::

::: example 硅电池的效率 {#ex-pv}
一块晶硅电池在AM1.5G光照下$J_\mathrm{sc} = 40.0\ \mathrm{mA\,cm^{-2}}$、$V_\mathrm{oc} = 0.700\ \mathrm{V}$、$\mathrm{FF} = 0.820$。(a) 计算其效率。(b) 若其暗饱和电流密度为$1.0\times10^{-13}\ \mathrm{A\,cm^{-2}}$，理想二极管方程在$300\ \mathrm{K}$预言的$V_\mathrm{oc}$是多少？(c) 若更好的表面钝化使$J_0$减小十倍，$V_\mathrm{oc}$会升高多少？
::: solution
(a) $\eta = 40.0 \times 0.700 \times 0.820/100 = 0.230$，即23.0 %。(b) $V_\mathrm{oc} = 0.025\,85 \times \ln(0.0400/1.0\times10^{-13}) = 0.025\,85 \times 26.71 = 0.691\ \mathrm{V}$，与(a)一致。(c) $k_\mathrm{B}T\ln10/q = 0.0595\ \mathrm{V}$，约$60\ \mathrm{mV}$；在相同的电流与填充因子下使效率相对提高8–9 %。2010年以来硅光伏的许多进展（钝化发射极电池、非晶硅异质结、隧穿氧化物接触）都来自降低表面与接触处的$J_0$，亦即来自缺陷化学。
:::
:::

**吸收材料。** 晶硅主导市场：截至2024年底全球已安装超过2太瓦的光伏容量（国际能源署光伏发电系统计划），其中绝大部分是硅。由于硅的带隙是间接的，硅片必须厚约$100$–$180\ \mathrm{\mu m}$，并采用陷光织构。直接带隙的薄膜吸收材料只需一两微米：碲化镉（CdTe，$1.45\ \mathrm{eV}$）、铜铟镓硒（CIGS，随Ga含量为$1.0$–$1.7\ \mathrm{eV}$）。**金属卤化物钙钛矿**，如$\mathrm{CH_3NH_3PbI_3}$（MAPbI₃）与甲脒-铯混合物，具有[[materials-chemistry/crystal-structures#prop-tolerance]]的$\mathrm{ABX_3}$结构，B位为$\mathrm{Pb^{2+}}$、X为碘离子；它们兼有强吸收、长的载流子扩散长度以及对缺陷不同寻常的耐受性，因为其带边由反键的Pb $6s$–I $5p$（价带）与Pb $6p$（导带）态构成，常见的空位只产生浅能级而非深能级。2009年Akihiro Kojima、Tsutomu Miyasaka与合作者首次将其用于太阳能电池，效率3.8 %；到2025年，经认证的钙钛矿单结电池达到约27 %，与最好的硅电池相当，钙钛矿-硅叠层约34–35 %（NREL最佳研究电池效率表；小面积实验室电池）。其弱点是对水汽、热与光的不稳定性以及铅的毒性，而截至2026年稳定性是主要的研究课题。

## 热电材料

导体两端的温差驱动载流子从热端流向冷端，产生电压（**塞贝克效应**）；反过来，电流会携带热量（**帕尔帖效应**）。由交替排列的n型与p型腿组成的热电组件可以从废热发电而没有运动部件，或者泵热实现固态制冷；放射性同位素热电发电机自1970年代起为“旅行者”号一类航天器供电。

::: definition 热电优值 {#def-zt}
塞贝克系数为$S$（V K⁻¹）、电导率为$\sigma$、热导率为$\kappa = \kappa_\mathrm{e} + \kappa_\mathrm{L}$（电子加晶格）的热电材料，其无量纲**优值**为
$$
ZT = \frac{S^2\sigma T}{\kappa}.
$$
**功率因子**$S^2\sigma$量度电输出；$\kappa$量度漏过的热。在$T_\mathrm{h}$与$T_\mathrm{c}$之间工作、$ZT$取平均温度的发电机，其最大效率为
$$
\eta_\mathrm{max} = \frac{T_\mathrm{h} - T_\mathrm{c}}{T_\mathrm{h}}\cdot\frac{\sqrt{1 + ZT} - 1}{\sqrt{1 + ZT} + T_\mathrm{c}/T_\mathrm{h}},
$$ {#eq-te-eff}
只有当$ZT \to \infty$时才趋于卡诺效率。
:::

困难在于这三个性质通过载流子浓度彼此关联。金属的$\sigma$高但$S$极小（几个$\mathrm{\mu V\,K^{-1}}$），绝缘体的$S$高但$\sigma$可忽略；最优的是载流子约每立方厘米$10^{19}$–$10^{20}$个的重掺杂半导体。而热导率的电子部分随$\sigma$上升，服从**维德曼-弗兰兹定律**$\kappa_\mathrm{e} = L\sigma T$，洛伦兹数$L \approx 2.44\times10^{-8}\ \mathrm{W\,\Omega\,K^{-2}}$（简并电子气的近似普适值）。所以化学家的主要杠杆是晶格热导率$\kappa_\mathrm{L}$：重原子（低声速）、复杂的晶胞、弱而非简谐的键、笼中“振动”的客体原子（方钴矿、笼形化合物）、合金无序，以及比电子更强地散射声子的纳米结构——这就是斯拉科（Glen Slack）提出的“声子玻璃-电子晶体”理想。碲化铋合金$\mathrm{(Bi,Sb)_2(Te,Se)_3}$在室温附近$ZT \approx 1$，主导制冷；PbTe与方钴矿用于更高温度；SnSe单晶2014年在$923\ \mathrm{K}$达到$ZT \approx 2.6$。

::: example 碲化铋的优值 {#ex-zt}
$300\ \mathrm{K}$下一块p型$\mathrm{Bi_{0.5}Sb_{1.5}Te_3}$样品有$S = 200\ \mathrm{\mu V\,K^{-1}}$、$\sigma = 1.0\times10^5\ \mathrm{S\,m^{-1}}$、$\kappa = 1.5\ \mathrm{W\,m^{-1}\,K^{-1}}$。(a) 计算$ZT$。(b) 用维德曼-弗兰兹定律把$\kappa$分成电子与晶格两部分。(c) 若纳米化使$\kappa_\mathrm{L}$减半而电学性质不变，$ZT$是多少？
::: solution
(a) $S^2\sigma = (2.00\times10^{-4})^2 \times 1.0\times10^5 = 4.0\times10^{-3}\ \mathrm{W\,m^{-1}\,K^{-2}}$，所以$ZT = 4.0\times10^{-3} \times 300/1.5 = 0.80$。(b) $\kappa_\mathrm{e} = 2.44\times10^{-8} \times 1.0\times10^5 \times 300 = 0.73\ \mathrm{W\,m^{-1}\,K^{-1}}$，所以$\kappa_\mathrm{L} = 1.5 - 0.73 = 0.77\ \mathrm{W\,m^{-1}\,K^{-1}}$。(c) $\kappa = 0.73 + 0.385 = 1.12$，$ZT = 1.20/1.12 = 1.07$。晶格部分减半使$ZT$提高约三分之一；但一旦$\kappa_\mathrm{L}$很小，$\kappa_\mathrm{e}$就设置了上限，进一步的进展要求提高功率因子，例如通过能带收敛（数个价带顶处于同一能量，如PbTe基合金中所设计的）。
:::
:::

::: widget plot
f: (1 - c/h)*(sqrt(1 + x) - 1)/(sqrt(1 + x) + c/h); 1 - c/h
x: 0, 6
y: 0, 0.5
sliders: h=500:350:900:5; c=300:250:400:5
labels: \eta_\mathrm{max}; \text{卡诺}
caption: 最大热电效率[[#eq-te-eff]]对$ZT$（$x$）的曲线，冷热端温度$h$与$c$以K计（滑条），并与卡诺极限$1 - T_\mathrm{c}/T_\mathrm{h}$比较。在$500$与$300\ \mathrm{K}$之间，$ZT = 1$给出$8.2\ \%$，约为卡诺值$40\ \%$的五分之一；即使$ZT = 3$也只有约$15\ \%$。所以热电材料的用武之地在可靠性、安静或小型比效率更要紧的场合：航天器、远程传感器、汽车座椅冷却，以及回收尾气中百分之几的热量。
:::

## 超导体

1911年卡末林·昂内斯（Heike Kamerlingh Onnes）发现汞的电阻在$4.2\ \mathrm{K}$以下突然消失。超导体在临界温度$T_\mathrm{c}$以下具有严格为零的直流电阻，并把磁通从其内部排出（**迈斯纳效应**，1933年），这使它不同于仅仅是理想导体，并允许磁悬浮。磁场超过临界场会破坏超导；**第二类**超导体在上下临界场之间以量子化涡旋的形式容纳磁通，若涡旋被缺陷钉扎，就能在许多特斯拉的场中载负大电流。这就是为什么MRI磁体的导线（Nb-Ti，$T_\mathrm{c} \approx 9.5\ \mathrm{K}$）以及粒子加速器与聚变磁体的导线（$\mathrm{Nb_3Sn}$，$18\ \mathrm{K}$；并且日益采用$\mathrm{REBa_2Cu_3O_7}$带材）是有意做成富含缺陷的。

巴丁（John Bardeen）、库珀（Leon Cooper）与施里弗（Robert Schrieffer）的理论（BCS，1957年）解释了常规超导体：晶格振动介导的电子间吸引把它们束缚成动量与自旋相反的**库珀对**，凝聚为一个由能隙与激发态隔开的相干量子态。BCS理论预言零温能隙在弱耦合极限下为$2\Delta(0) \approx 3.53\,k_\mathrm{B}T_\mathrm{c}$，且$T_\mathrm{c}$正比于某个声子频率，因而对同一元素的不同同位素正比于$M^{-1/2}$（**同位素效应**，1950年在理论完成之前已在汞中观察到）。轻原子与刚硬的键有利于高$T_\mathrm{c}$：$\mathrm{MgB_2}$（2001年）在$39\ \mathrm{K}$超导；金刚石对顶砧中压缩的富氢化合物，约$200\ \mathrm{K}$、$150\ \mathrm{GPa}$下的$\mathrm{H_3S}$（2015年）与约$250\ \mathrm{K}$、$170\ \mathrm{GPa}$下的$\mathrm{LaH_{10}}$（2019年），被认为是把声子频率用到极端的常规BCS超导体。

**铜氧化物超导体**由贝德诺尔茨（Georg Bednorz）与缪勒（Alex Müller）在$\mathrm{La_{2-x}Ba_xCuO_4}$中发现（1986年，$T_\mathrm{c} \approx 35\ \mathrm{K}$），无法用常规BCS理论解释。它们的结构含有$\mathrm{CuO_2}$面；未掺杂的母体化合物是反铁磁的莫特（电荷迁移）绝缘体（[[materials-chemistry/electronic-structure-solids]]），当这些面被掺入空穴或电子时超导便出现：在$\mathrm{La_{2-x}Ba_xCuO_4}$中是用$\mathrm{Ba^{2+}}$取代$\mathrm{La^{3+}}$，在$\mathrm{YBa_2Cu_3O_{7-\delta}}$中则取决于链上的氧含量（其$T_\mathrm{c}$为$92\ \mathrm{K}$，1987年由吴茂昆、朱经武与合作者发现，是第一个高于氮气沸点$77\ \mathrm{K}$的）。于是用[[materials-chemistry/defects]]的语言说，缺陷化学与掺杂控制着这些固体最要紧的电子性质。常压下最高的$T_\mathrm{c}$约$133$–$135\ \mathrm{K}$，属于$\mathrm{HgBa_2Ca_2Cu_3O_{8+\delta}}$（1993年）。铁基砷化物与硫族化物（细野秀雄课题组，2008年；最高约$55\ \mathrm{K}$）以及镍酸盐（2019年）是另外的非常规家族。

::: quiz
关于超导体的下列说法哪些正确？
- [x] 超导体在$T_\mathrm{c}$以下排出磁通，这是假想的理想导体不会做的。
- [ ] 铜氧化物超导体是金属，其$T_\mathrm{c}$可由BCS同位素效应解释。
- [x] 在BCS理论中，$2\Delta(0) \approx 3.5\,k_\mathrm{B}T_\mathrm{c}$，且较重的同位素使$T_\mathrm{c}$降低。
- [x] 缺陷对磁通涡旋的钉扎对超导磁体导线是必不可少的。
- [ ] 零电阻意味着超导体可以在任何磁场中载负任意电流。
::: solution
迈斯纳效应是区别于理想导体的定义性特征：理想导体只会冻结它变为理想时存在的磁通。铜氧化物是掺杂的莫特绝缘体，配对非常规；它们的同位素效应弱，也不是BCS的那种。BCS预言能隙比与同位素效应。涡旋必须被钉扎，否则它们将在洛伦兹力下移动并耗散能量。超过临界电流密度或临界场，超导即被破坏。
:::
:::

关于超导的非常主张需要非常严格的证据：零电阻与迈斯纳信号都要有，并且要被独立重复。几个广为报道的工作经不起检验，其中包括2020年与2023年发表、后来又撤稿的氢化物室温超导主张，以及2023年关于掺铜铅磷灰石“LK-99”的主张——其他课题组发现其电阻下降源于$\mathrm{Cu_2S}$杂质相。往往正是靠衍射做的精细物相鉴定（[[materials-chemistry/diffraction]]）来裁断这类案件。

::: example BCS能隙与同位素效应 {#ex-bcs}
(a) 铌的$T_\mathrm{c} = 9.25\ \mathrm{K}$。以meV估算BCS能隙$2\Delta(0)$，并求能拆散库珀对的辐射的波长。(b) 平均同位素质量$199.5$的汞$T_\mathrm{c} = 4.185\ \mathrm{K}$。预测富集到平均质量$203.4$的样品的$T_\mathrm{c}$。
::: solution
(a) $2\Delta = 3.53 \times 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}} \times 9.25\ \mathrm{K} = 2.81\times10^{-3}\ \mathrm{eV} = 2.81\ \mathrm{meV}$（实测约$3.0\ \mathrm{meV}$；铌是中强耦合超导体）。此能量光子的波长$\lambda = 1240\ \mathrm{nm\,eV}/0.00281\ \mathrm{eV} = 4.4\times10^5\ \mathrm{nm} = 0.44\ \mathrm{mm}$，在远红外（约$680\ \mathrm{GHz}$）：超导探测器利用的正是这一点。(b) $T_\mathrm{c} \propto M^{-1/2}$：$T_\mathrm{c} = 4.185 \times \sqrt{199.5/203.4} = 4.145\ \mathrm{K}$，与1950年麦克斯韦（Emanuel Maxwell）及独立地由雷诺兹（Reynolds）等人测得的$4.146\ \mathrm{K}$接近——正是这个实验指出了晶格的作用。
:::
:::

## 后续内容

能源材料是本课程各条线索与工程交汇之处。完整电池与燃料电池的电化学在[[electrochemistry/batteries]]与[[electrochemistry/fuel-cells-electrolysis]]中继续；制氢与储氢的热力学，以及本章所用关键元素的生命周期问题，见[[green-chemistry/carbon-hydrogen]]与[[green-chemistry/circular-economy]]；聚合物电解质、隔膜与有机光伏见[[polymer-chemistry/functional-polymers]]；新型电极与吸收材料成分的计算筛选——截至2026年它正日益指导合成——见[[computational-chemistry/density-functional-theory]]。

::: history
伏特（Alessandro Volta）1800年描述了第一种电池，即伏打电堆。塞贝克（Thomas Seebeck）1821年发现热电效应，帕尔帖（Jean Peltier）1834年发现其逆效应；贝克勒尔（Edmond Becquerel）1839年观察到光伏效应，查平（Daryl Chapin）、富勒（Calvin Fuller）与皮尔逊（Gerald Pearson）1954年在贝尔实验室制成了第一块实用的硅太阳能电池。卡末林·昂内斯1911年发现超导，迈斯纳（Walther Meissner）与奥克森费尔特（Robert Ochsenfeld）1933年发现磁通排出，巴丁、库珀与施里弗1957年发表他们的理论（1972年诺贝尔物理学奖）；贝德诺尔茨与缪勒的铜氧化物（1986年）获得1987年奖。惠廷厄姆（M. Stanley Whittingham）在1970年代演示了以$\mathrm{TiS_2}$为正极的可充电锂电池；古迪纳夫课题组1980年引入$\mathrm{Li}_x\mathrm{CoO_2}$，萨克里（Michael Thackeray）与古迪纳夫1983年引入尖晶石$\mathrm{LiMn_2O_4}$，帕迪（Akshaya Padhi）、古迪纳夫与合作者1997年引入$\mathrm{LiFePO_4}$；吉野彰1985年制成了第一块石墨基（最初是石油焦）锂离子电池，索尼公司1991年将其商品化，古迪纳夫、惠廷厄姆与吉野彰共获2019年诺贝尔化学奖。小岛（Kojima）与宫坂（Miyasaka）的钙钛矿太阳能电池出现于2009年。
:::

::: summary
- 锂离子电池电极是嵌入主体（层状$\mathrm{LiMO_2}$、尖晶石$\mathrm{LiMn_2O_4}$、橄榄石$\mathrm{LiFePO_4}$、石墨）；电池电压为$-\Delta\mu_\mathrm{Li}/F$，两相电极平坦、固溶体电极倾斜。
- 理论容量$Q = nF/3.6M\ \mathrm{mA\,h\,g^{-1}}$（$\mathrm{LiCoO_2}$为274，$\mathrm{LiFePO_4}$为170，石墨为372）；能量是容量乘以电压，成品电池约为活性材料值的一半。
- SEI使碳酸酯电解质能在石墨上使用；可燃的电解质与释氧使热失控成为可能；固体电解质与钠离子电池是发展中的替代方案。
- 太阳能电池服从$J = J_\mathrm{sc} - J_0(e^{qV/k_\mathrm{B}T} - 1)$；随复合减少$V_\mathrm{oc} = (k_\mathrm{B}T/q)\ln(J_\mathrm{sc}/J_0)$升高；单结极限约33 %，对应$E_\mathrm{g} \approx 1.3$–$1.4\ \mathrm{eV}$；硅主导，钙钛矿与叠层在上升。
- 热电材料需要高$ZT = S^2\sigma T/\kappa$；维德曼-弗兰兹定律把$\kappa_\mathrm{e}$与$\sigma$绑定，所以低晶格热导率（重原子、无序、振动原子、纳米结构）是关键；$ZT \approx 1$约为卡诺效率的五分之一。
- 超导体具有零电阻与迈斯纳效应；BCS理论（声子介导的配对，$2\Delta \approx 3.53k_\mathrm{B}T_\mathrm{c}$，$T_\mathrm{c} \propto M^{-1/2}$）解释了常规超导体，包括$\mathrm{MgB_2}$与压缩氢化物；铜氧化物是掺杂的莫特绝缘体，$T_\mathrm{c}$最高约$135\ \mathrm{K}$。
:::

## 练习

::: exercise 尖晶石正极的容量 {level=1 check="148"}
计算$\mathrm{LiMn_2O_4}$对反应$\mathrm{LiMn_2O_4} \rightleftharpoons \mathrm{Mn_2O_4} + \mathrm{Li^+} + e^-$的理论容量。（以$\mathrm{mA\,h\,g^{-1}}$输入$Q$，三位有效数字。）
::: solution
$M = 6.941 + 2(54.938) + 4(15.999) = 180.81\ \mathrm{g\,mol^{-1}}$；$Q = 26\,801/180.81 = 148\ \mathrm{mA\,h\,g^{-1}}$。实际在约$4.0\ \mathrm{V}$下可得约$120\ \mathrm{mA\,h\,g^{-1}}$。
:::
:::

::: exercise 锂金属 {level=1 check="3861"}
计算锂金属的理论比容量。（以$\mathrm{mA\,h\,g^{-1}}$输入$Q$，四位有效数字。）
::: solution
$Q = 26\,801/6.941 = 3861\ \mathrm{mA\,h\,g^{-1}}$，是石墨$372$的十倍以上。难点不在容量，而在枝晶生长及其与电解质的反应。
:::
:::

::: exercise 锂化反应的吉布斯自由能 {level=1 check="-333"}
$\mathrm{LiFePO_4}$相对锂金属在$3.45\ \mathrm{V}$下工作。计算$\mathrm{Li(s)} + \mathrm{FePO_4(s)} \rightarrow \mathrm{LiFePO_4(s)}$的$\Delta_\mathrm{r}G$。（以$\mathrm{kJ\,mol^{-1}}$输入$\Delta_\mathrm{r}G$，三位有效数字。）
::: solution
$\Delta_\mathrm{r}G = -nFE = -1 \times 96\,485 \times 3.45 = -3.33\times10^5\ \mathrm{J\,mol^{-1}} = -333\ \mathrm{kJ\,mol^{-1}}$。由于反应是两相的，这一个数值适用于整个电压平台。
:::
:::

::: exercise 太阳能电池的效率 {level=2 check="21.6"}
一块钙钛矿电池在一个太阳光（$100\ \mathrm{mW\,cm^{-2}}$）下$J_\mathrm{sc} = 24.5\ \mathrm{mA\,cm^{-2}}$、$V_\mathrm{oc} = 1.12\ \mathrm{V}$、$\mathrm{FF} = 0.787$。计算其效率，并解释为什么它的电流比[[#ex-pv]]中的硅电池低、电压比它高。（以百分数输入$\eta$，三位有效数字。）
::: solution
$\eta = 24.5 \times 1.12 \times 0.787/100 = 0.216$，即21.6 %。它的带隙（$\approx 1.55\ \mathrm{eV}$）比硅的（$1.12\ \mathrm{eV}$）大：能量高到足以被吸收的太阳光子更少（$J_\mathrm{sc}$更低），但带隙更大使$J_0$指数下降、$V_\mathrm{oc}$升高。
:::
:::

::: exercise 开路电压 {level=2 check="0.631"}
一块电池在$300\ \mathrm{K}$有$J_\mathrm{sc} = 40.0\ \mathrm{mA\,cm^{-2}}$、$J_0 = 1.0\times10^{-12}\ \mathrm{A\,cm^{-2}}$。用理想二极管方程计算$V_\mathrm{oc}$。（以V输入$V_\mathrm{oc}$，三位有效数字。）
::: solution
$V_\mathrm{oc} = 0.025\,85 \times \ln(0.0400/1.0\times10^{-12} + 1) = 0.025\,85 \times 24.41 = 0.631\ \mathrm{V}$，比$J_0 = 10^{-13}\ \mathrm{A\,cm^{-2}}$时低$60\ \mathrm{mV}$，与预期一致。
:::
:::

::: exercise 电子热导率 {level=2 check="0.73"}
用维德曼-弗兰兹定律计算一热电材料在$\sigma = 1.0\times10^5\ \mathrm{S\,m^{-1}}$、$300\ \mathrm{K}$下的电子热导率。若其总热导率为$1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$、$S = 220\ \mathrm{\mu V\,K^{-1}}$，求$ZT$。（以$\mathrm{W\,m^{-1}\,K^{-1}}$输入$\kappa_\mathrm{e}$，两位有效数字。）
::: solution
$\kappa_\mathrm{e} = 2.44\times10^{-8} \times 1.0\times10^5 \times 300 = 0.73\ \mathrm{W\,m^{-1}\,K^{-1}}$，所以$\kappa_\mathrm{L} = 0.27$。$ZT = (2.2\times10^{-4})^2 \times 1.0\times10^5 \times 300/1.0 = 1.45$。晶格热导率如此之低的材料将跻身最好的室温热电材料之列。
:::
:::

::: exercise 硅负极 {level=3 check="3579"}
(a) 按完全锂化成$\mathrm{Li_{15}Si_4}$计算硅每克Si的容量。(b) 硅的摩尔体积为$12.1\ \mathrm{cm^3\,mol^{-1}}$，$\mathrm{Li_{15}Si_4}$约为每摩尔化学式单位$180\ \mathrm{cm^3}$。估算体积膨胀。(c) 解释为什么使用纳米结构或复合硅。（以$\mathrm{mA\,h\,g^{-1}}$输入容量，四位有效数字。）
::: solution
(a) 每Si对应$3.75$个Li：$Q = 3.75 \times 26\,801/28.085 = 3579\ \mathrm{mA\,h\,g^{-1}}$。(b) 四摩尔Si（$48.4\ \mathrm{cm^3}$）变成一摩尔$\mathrm{Li_{15}Si_4}$（约$180\ \mathrm{cm^3}$）：因子$3.7$，膨胀约$270\ \%$。(c) 如此大的应变会使微米级颗粒开裂、失去电接触，并不断暴露出新的表面让SEI重新生成，从而消耗锂。小于约$150\ \mathrm{nm}$的颗粒、多孔或中空结构，以及把百分之几的硅分散在石墨中的复合材料，能够耐受这种膨胀；其纳米尺度的论证就是把[[materials-chemistry/nanomaterials]]的推理用于断裂。
:::
:::

::: exercise 同位素效应 {level=3 check="4.14"}
(a) 解释为什么在BCS理论中，同一元素的各同位素$T_\mathrm{c} \propto M^{-1/2}$。(b) 平均质量$199.5$的汞样品$T_\mathrm{c} = 4.185\ \mathrm{K}$。预测平均质量$203.4$的$T_\mathrm{c}$。(c) $\mathrm{YBa_2Cu_3O_7}$的同位素指数（$^{16}$O对$^{18}$O）接近零。这说明什么？（输入(b)的$T_\mathrm{c}$，以K计，三位有效数字。）
::: solution
(a) BCS理论中$k_\mathrm{B}T_\mathrm{c} \approx 1.13\,\hbar\omega_\mathrm{D}\exp[-1/N(E_\mathrm{F})V]$，$\omega_\mathrm{D}$为典型声子频率。对简谐晶格$\omega \propto (k/M)^{1/2}$，同位素取代改变$M$而不改变力常数与电子参数，所以$T_\mathrm{c} \propto M^{-1/2}$。(b) $4.185 \times (199.5/203.4)^{1/2} = 4.14\ \mathrm{K}$（更精确为$4.145\ \mathrm{K}$）。(c) 小的同位素效应说明声子不是主要的配对机制，这是铜氧化物为非常规超导体的最早证据之一（尽管该指数随掺杂变化）。
:::
:::

::: exercise 热电发电机的效率 {level=2 check="8.2"}
用[[#eq-te-eff]]计算$ZT = 1.0$的发电机在$500\ \mathrm{K}$与$300\ \mathrm{K}$之间运行的最大效率，并用卡诺效率的分数表示。（以百分数输入效率，两位有效数字。）
::: solution
卡诺：$1 - 300/500 = 0.40$。$\sqrt{2} = 1.4142$；$\eta = 0.40 \times 0.4142/(1.4142 + 0.6) = 0.40 \times 0.2057 = 0.0823$，即8.2 %，约为卡诺值的21 %。若$ZT = 2$则为$0.40 \times 0.732/2.332 = 12.6\ \%$。
:::
:::
