[[materials-chemistry/crystal-structures]]中的结构都是理想化的。任何高于绝对零度的真实晶体都含有空着的格位、放错了位置的原子和杂质，而这些**缺陷**绝不只是瑕疵。它们正是以下这些事实的原因：盐在受热时会导电；掺氧化钇的氧化锆是固体氧化物燃料电池的电解质和汽车排气管中氧传感器的元件；硅可以被做成n型或p型；红宝石是红色的；而"氧化亚铁"绝不是$\mathrm{FeO}$，而总是$\mathrm{Fe}_{1-x}\mathrm{O}$，$x$约在$0.05$与$0.15$之间。固体中的扩散、陶瓷的烧结、腐蚀、氧化物的催化以及每一块电池电极的工作都依赖于它们。

本章定量处理**点缺陷**。我们将证明热力学第二定律要求一定的空位浓度，并导出这一浓度；引入把缺陷的形成变成配平的化学方程的克罗格-维克（Kröger–Vink）记法；对它们应用质量作用定律，以预言缺陷浓度与电导率如何依赖于温度、掺杂与氧压。随后我们讨论非化学计量化合物与离子导电，并简论扩展缺陷与色心。

## 点缺陷的种类

::: definition 点缺陷 {#def-point-defects}
**点缺陷**是局限于一个或几个点阵格位的晶体扰动：
- **空位**：一个通常被占据的格位空着；
- **间隙原子**：一个原子坐在通常空着的格位上；
- 占据基质格位的**取代**（杂质）原子，或**反位**原子——基质原子坐到了另一套子晶格的格位上（GaAs中As位上的Ga）。

在离子晶体中，缺陷必须保持整体的电荷中性。化学计量晶体中有两种本征组合：**肖特基缺陷**（Schottky），一套符合化学计量的阳离子与阴离子空位（NaCl中一个$\mathrm{Na^+}$空位加一个$\mathrm{Cl^-}$空位，$\mathrm{CaF_2}$中一个$\mathrm{Ca^{2+}}$空位加两个$\mathrm{F^-}$空位）；以及**弗伦克尔缺陷**（Frenkel），一个离子从自己的格位被移到间隙位置，留下一个空位（空位-间隙对）。**本征**缺陷在纯净晶体处于平衡态时就存在；**非本征**缺陷则由杂质或偏离化学计量产生。
:::

哪种本征缺陷占主导取决于结构。在间隙位置很小、离子大小相近的密堆积结构中，肖特基缺陷更有利：岩盐结构的碱金属卤化物、MgO。弗伦克尔缺陷则要求有间隙空间，或要求有能忍受反常环境的高可极化离子：AgCl与AgBr中的阳离子弗伦克尔缺陷（小而可极化的$\mathrm{Ag^+}$进入四面体空隙，这正是照相过程的基础），以及萤石型$\mathrm{CaF_2}$、$\mathrm{UO_2}$与$\mathrm{ZrO_2}$中的阴离子弗伦克尔（"反弗伦克尔"）缺陷——萤石结构中位于$(\tfrac12, \tfrac12, \tfrac12)$的大型空立方体容纳着间隙阴离子。

## 缺陷形成的热力学

产生一个空位要付出能量：键被拆断，而且在离子晶体中，空位周围的晶格还会弛豫和极化。那么，平衡时为什么毕竟还是有空位存在呢？因为它们增大熵：选择哪些格位为空的方式有很多种。

::: proposition 肖特基缺陷的平衡浓度 {#prop-schottky}
在有$N$个阳离子格位与$N$个阴离子格位的晶体MX中，肖特基缺陷（空位对）的平衡数目$n_\mathrm{S}$满足
$$
\frac{n_\mathrm{S}}{N} \approx \exp\!\left(-\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}\right),
$$ {#eq-schottky}
其中$\Delta H_\mathrm{S}$是生成一对肖特基缺陷的焓，前提是$n_\mathrm{S} \ll N$、缺陷间无相互作用且略去振动熵的变化（计入它会使右端乘以$\exp(\Delta S_\mathrm{vib}/2k_\mathrm{B})$，一个1–100量级的因子）。对有$N$个正常格位和$N_\mathrm{i}$个间隙格位的弗伦克尔缺陷，$n_\mathrm{F} \approx \sqrt{NN_\mathrm{i}}\,\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$。
:::

::: proof
设$n$个阳离子空位与$n$个阴离子空位各自分布在$N$个格位上。每套子晶格上可区分的排布数为$N!/[n!(N - n)!]$，所以组态熵为
$$
S_\mathrm{conf} = k_\mathrm{B}\ln\left(\frac{N!}{n!(N - n)!}\right)^2 = 2k_\mathrm{B}\left[N\ln N - n\ln n - (N - n)\ln(N - n)\right],
$$
其中用了斯特林近似$\ln x! \approx x\ln x - x$。在恒温恒压下，晶体使其吉布斯自由能取极小（[[thermodynamics/free-energy]]），
$$
G(n) = G_0 + n\Delta H_\mathrm{S} - TS_\mathrm{conf}.
$$
令$\partial G/\partial n = 0$：$\Delta H_\mathrm{S} - 2k_\mathrm{B}T\left[-\ln n - 1 + \ln(N - n) + 1\right] = 0$，于是
$$
\ln\frac{n}{N - n} = -\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}, \qquad \frac{n}{N - n} = \exp\!\left(-\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}\right),
$$
当$n \ll N$时$N - n \approx N$，即得[[#eq-schottky]]。指数上的因子2源于：每一对肖特基缺陷产生两个独立放置的空位，每个都贡献组态熵。对一个弗伦克尔对，$N$个正常格位中的一个空位与$N_\mathrm{i}$个间隙格位中的一个间隙原子给出$n^2/[(N - n)(N_\mathrm{i} - n)] = \exp(-\Delta H_\mathrm{F}/k_\mathrm{B}T)$，故$n_\mathrm{F} \approx \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$。
:::

这个结果其实是质量作用定律的变形。把一对肖特基缺陷的生成写成一个反应："完美晶体 ⇌ 阳离子空位 + 阴离子空位"，以格位分数作为活度，平衡常数便是$x_\mathrm{V_M}x_\mathrm{V_X} = \exp(-\Delta G_\mathrm{S}/k_\mathrm{B}T)$；取$x_\mathrm{V_M} = x_\mathrm{V_X}$，开平方即得[[#eq-schottky]]。这种化学的思路在下一节展开，它适用于一切缺陷平衡。

::: example 氯化钠中的空位 {#ex-nacl-vacancies}
NaCl中一对肖特基缺陷的生成焓约为$2.3\ \mathrm{eV}$。计算$298\ \mathrm{K}$、$800\ \mathrm{K}$以及略低于熔点的$1073\ \mathrm{K}$下空位的分数。$1073\ \mathrm{K}$时$1\ \mathrm{mol}$ NaCl中有多少对空位？
::: solution
取$k_\mathrm{B} = 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}}$：
$$
\frac{n}{N}(298\ \mathrm{K}) = \exp\!\left(-\frac{2.3}{2 \times 8.617\times10^{-5} \times 298}\right) = \exp(-44.8) = 3.6\times10^{-20},
$$
$800\ \mathrm{K}$时为$\exp(-16.68) = 5.7\times10^{-8}$，$1073\ \mathrm{K}$时为$\exp(-12.44) = 4.0\times10^{-6}$。一摩尔有$N = 6.022\times10^{23}$个阳离子格位，所以$1073\ \mathrm{K}$时有$2.4\times10^{18}$对空位。室温下平衡值只有每摩尔约$20\ 000$对，但真实晶体中的空位远多于此：ppm量级的二价杂质每一个都带来一个阳离子空位（见下文），而且冷却时冻结下来的空位已来不及离开。$\Delta H_\mathrm{S}$的不确定度为$\pm0.1\ \mathrm{eV}$，据此最多只值得报两位有效数字；在$298\ \mathrm{K}$，这一不确定度会使答案改变7倍。
:::
:::

::: widget plot
f: log(exp(-h/(2*8.617e-5*x)))/log(10)
x: 300, 1400
y: -22, 0
sliders: h=2.3:0.5:5:0.05
hlines: -6
labels: \log_{10}(n_\mathrm{S}/N)
caption: [[#eq-schottky]]的平衡肖特基缺陷分数（以$\log_{10}$计）随温度$x$（以K计）的变化曲线，对不同的对生成焓$h$（以eV计，滑条；NaCl约$2.3\ \mathrm{eV}$，MgO约$7$–$8\ \mathrm{eV}$，超出滑条范围）。$10^{-6}$处的水平线标出1 ppm的典型杂质水平。曲线只要位于该线下方，空位浓度就由杂质而不是热平衡决定：晶体处于**非本征**区。对MgO来说，直到熔点的任何温度都是如此。
:::

## 克罗格-维克记法与缺陷平衡

要写缺陷反应，我们需要一种记法，记录什么占据格位、是什么格位、以及电荷*相对于完美晶体*的差值。对电中性起作用的正是这个相对电荷，而不是该物种的绝对电荷。

::: definition 克罗格-维克记法 {#def-kroger-vink}
一个缺陷写作$\mathrm{M}_\mathrm{S}^{c}$，其中
- $\mathrm{M}$是格位上的物种：原子或离子的符号，空位用$\mathrm{V}$，电子用$e$，空穴用$h$；
- 下标$\mathrm{S}$是格位：该处通常应坐的原子符号，间隙格位用$\mathrm{i}$；
- 上标$c$是**有效电荷**，即该格位相对于完美晶格的电荷：每单位正电荷记$^\bullet$，每单位负电荷记$'$，零记$^\times$。

NaCl中的例子：$\mathrm{V_{Na}'}$（缺少一个$\mathrm{Na^+}$使该格位比正常时负一个单位）、$\mathrm{V_{Cl}^\bullet}$、$\mathrm{Ca_{Na}^\bullet}$（$\mathrm{Na^+}$格位上的$\mathrm{Ca^{2+}}$）、$\mathrm{Na_{Na}^\times}$。氧化物中：$\mathrm{V_O^{\bullet\bullet}}$、$\mathrm{O_i''}$、$\mathrm{Y_{Zr}'}$、$\mathrm{Fe_{Fe}^\bullet}$（$\mathrm{Fe^{2+}}$格位上的$\mathrm{Fe^{3+}}$，相当于一个定域在铁上的空穴）。缺陷反应必须对**质量**、**格位**（按结构的格位比）与**有效电荷**三者守恒。
:::

用这一记法，NaCl与AgCl中的肖特基和弗伦克尔平衡，以及$\mathrm{CaF_2}$中的阴离子弗伦克尔平衡写作
$$
\mathrm{nil} \rightleftharpoons \mathrm{V_{Na}'} + \mathrm{V_{Cl}^\bullet}, \qquad \mathrm{Ag_{Ag}^\times} \rightleftharpoons \mathrm{Ag_i^\bullet} + \mathrm{V_{Ag}'}, \qquad \mathrm{F_F^\times} \rightleftharpoons \mathrm{F_i'} + \mathrm{V_F^\bullet},
$$
平衡常数为$K_\mathrm{S} = [\mathrm{V_{Na}'}][\mathrm{V_{Cl}^\bullet}]$，如此等等，方括号表示格位分数（或浓度）。这一记法真正的威力出现在**掺杂**上。把$\mathrm{CaCl_2}$溶入NaCl时，每个$\mathrm{Ca^{2+}}$落在钠的格位上，需要一个补偿缺陷：
$$
\mathrm{CaCl_2} \xrightarrow{\ \mathrm{NaCl}\ } \mathrm{Ca_{Na}^\bullet} + \mathrm{V_{Na}'} + 2\,\mathrm{Cl_{Cl}^\times}.
$$
用去两个Na格位与两个Cl格位，格位守恒；有效电荷$+1 - 1 = 0$。每个钙离子产生一个阳离子空位。由于$K_\mathrm{S}$仍然成立，额外的阳离子空位会*抑制*阴离子空位：$[\mathrm{V_{Cl}^\bullet}] = K_\mathrm{S}/[\mathrm{V_{Na}'}]$，这是固态中对同离子效应的类比。

::: example 氧化钇稳定氧化锆中的氧离子空位 {#ex-ysz}
纯$\mathrm{ZrO_2}$在室温下是单斜的，但溶入$\mathrm{Y_2O_3}$会使立方萤石结构稳定下来。(a) 写出缺陷反应。(b) 对8 mol %的$\mathrm{Y_2O_3}$（"8YSZ"），求组成$\mathrm{Zr}_{1-x}\mathrm{Y}_x\mathrm{O}_{2-x/2}$中各项及空置氧格位的分数。
::: solution
(a) 两个坐在锆格位上的$\mathrm{Y^{3+}}$各带$-1$有效电荷，由一个氧空位补偿：
$$
\mathrm{Y_2O_3} \xrightarrow{\ \mathrm{ZrO_2}\ } 2\,\mathrm{Y_{Zr}'} + 3\,\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}.
$$
格位：用去2个Zr格位与4个O格位（$\mathrm{ZrO_2}$的1 : 2比），其中三个被氧占据，一个空着。电荷：$2(-1) + 2 = 0$。

(b) 取$0.92\ \mathrm{mol}\ \mathrm{ZrO_2} + 0.08\ \mathrm{mol}\ \mathrm{Y_2O_3}$：Zr为$0.92$，Y为$0.16$，O为$1.84 + 0.24 = 2.08$。以阳离子总数$1.08$计：$x = 0.16/1.08 = 0.148$，氧含量为$2.08/1.08 = 1.926 = 2 - x/2$。每个化学式单位的空位数为$x/2 = 0.074$，氧格位共有2个：$3.7\ \%$的氧格位是空的。正是这巨大的、与温度无关的空位浓度——约为本征值的$10^4$倍——使YSZ成为氧离子导体（$1000\,^\circ\mathrm{C}$时约$0.1\ \mathrm{S\,cm^{-1}}$）。
:::
:::

::: warning 有效电荷不是离子电荷 {#warn-effective}
一种常见错误是把氧空位写成$\mathrm{V_O''}$（"氧离子是$2-$价"），或把氧化锆中的钇离子写成$\mathrm{Y_{Zr}^{\bullet\bullet\bullet}}$（"钇是$3+$价"）。有效电荷是格位上实际有什么与应该有什么之差。移走一个$\mathrm{O^{2-}}$就是移走两个负电荷，所以空位是*正*的，$\mathrm{V_O^{\bullet\bullet}}$；用$\mathrm{Y^{3+}}$取代$\mathrm{Zr^{4+}}$使该格位*负*一个单位，$\mathrm{Y_{Zr}'}$。第二种错误是忘记格位守恒：写成$\mathrm{Y_2O_3} \rightarrow 2\mathrm{Y_{Zr}'} + 3\mathrm{O_O^\times}$，质量虽然配平，却用去了两个阳离子格位而只有三个阴离子格位，不符合宿主1 : 2的比例。缺失的那个格位*就是*空位。
:::

## 非化学计量与气相

许多过渡金属氧化物会与周围气体交换氧，因为金属能够改变自身的氧化态。其组成于是取决于氧分压$p_{\mathrm{O_2}}$与温度，而释放或消耗的电子或空穴使该氧化物成为半导体。**方铁矿**（wüstite）$\mathrm{Fe}_{1-x}\mathrm{O}$具有岩盐结构，铁空位由$\mathrm{Fe^{3+}}$补偿；**氧化镍**略微缺金属，是p型半导体；被还原的**二氧化钛**、**氧化锌**与**二氧化铈**失去氧而变为n型。

::: proposition 缺陷浓度的氧压依赖关系 {#prop-brouwer}
考虑一种氧化物MO，其主导缺陷是带双有效电荷的氧空位与自由电子，由下式生成
$$
\mathrm{O_O^\times} \rightleftharpoons \mathrm{V_O^{\bullet\bullet}} + 2e' + \tfrac12\mathrm{O_2(g)}, \qquad K_\mathrm{red} = [\mathrm{V_O^{\bullet\bullet}}]\,n^2\,p_{\mathrm{O_2}}^{1/2},
$$
其中$n$为电子浓度。若这些缺陷相互补偿（$n = 2[\mathrm{V_O^{\bullet\bullet}}]$），则
$$
n = (2K_\mathrm{red})^{1/3}\,p_{\mathrm{O_2}}^{-1/6} \quad \text{且} \quad \sigma_\mathrm{e} \propto p_{\mathrm{O_2}}^{-1/6}.
$$ {#eq-brouwer}
若空位浓度改由受主掺杂固定，$[\mathrm{V_O^{\bullet\bullet}}] = \tfrac12[\mathrm{A'}]$，则$n \propto p_{\mathrm{O_2}}^{-1/4}$。对由空穴补偿的二价金属空位构成的缺金属氧化物，$\tfrac12\mathrm{O_2(g)} \rightleftharpoons \mathrm{O_O^\times} + \mathrm{V_M''} + 2h^\bullet$，空穴浓度按$p_{\mathrm{O_2}}^{+1/6}$上升。这些幂律假定缺陷稀薄且无相互作用（活度等于浓度），且每个压力区间内只有一对主导缺陷。
:::

::: proof
对还原平衡，把$[\mathrm{V_O^{\bullet\bullet}}] = n/2$代入$K_\mathrm{red}$：$K_\mathrm{red} = \tfrac12 n^3p_{\mathrm{O_2}}^{1/2}$，所以$n^3 = 2K_\mathrm{red}p_{\mathrm{O_2}}^{-1/2}$，$n = (2K_\mathrm{red})^{1/3}p_{\mathrm{O_2}}^{-1/6}$。电子电导率$\sigma_\mathrm{e} = ne\mu_\mathrm{e}$，迁移率$\mu_\mathrm{e}$与$p_{\mathrm{O_2}}$无关，故$\sigma_\mathrm{e} \propto p_{\mathrm{O_2}}^{-1/6}$。若受主固定了$[\mathrm{V_O^{\bullet\bullet}}]$，则$K_\mathrm{red} = [\mathrm{V_O^{\bullet\bullet}}]n^2p_{\mathrm{O_2}}^{1/2}$中$[\mathrm{V_O^{\bullet\bullet}}]$为常数，得$n^2 \propto p_{\mathrm{O_2}}^{-1/2}$，$n \propto p_{\mathrm{O_2}}^{-1/4}$。对氧化反应，$K_\mathrm{ox} = [\mathrm{V_M''}]p^2/p_{\mathrm{O_2}}^{1/2}$，以$p = 2[\mathrm{V_M''}]$代入得$p^3 = 2K_\mathrm{ox}p_{\mathrm{O_2}}^{1/2}$，$p \propto p_{\mathrm{O_2}}^{1/6}$。温度的影响通过每个平衡的$K = \exp(-\Delta G^\circ/RT)$进入。
:::

把$\log$（浓度）对$\log p_{\mathrm{O_2}}$作图，得到一串斜率为这些简单分数的直线段，这样的图称为**布劳威尔图**。测量$\log\sigma$对$\log p_{\mathrm{O_2}}$的斜率，是识别主导缺陷的标准实验手段：未掺杂二氧化铈在高温下斜率为$-\tfrac16$，指示带双电荷的空位与自由电子；掺杂二氧化铈中斜率$-\tfrac14$，指示空位被固定；NiO的斜率$+\tfrac16$，则指示由空穴补偿的带双电荷镍空位。实际的推论是重大的：汽车尾气中二氧化铈基催化剂储存与释放氧靠的正是这个平衡，而控制发动机的氧传感器用的正是这类氧化物的电导率或能斯特电势。

::: example 方铁矿：空位还是间隙原子？ {#ex-wustite}
组成为$\mathrm{Fe_{0.95}O}$的方铁矿具有岩盐结构，$a = 4.300\ \text{Å}$（示例数值，接近实测值）。铁的亏缺可能有两种起因：铁子晶格上的空位（每胞4个O、3.80个Fe），或者铁子晶格是满的而氧以间隙形式存在（每胞4个Fe、$4/0.95 = 4.21$个O）。(a) 计算两种模型各自预言的密度。(b) 写出空位模型的缺陷反应，并求以$\mathrm{Fe^{3+}}$形式存在的铁的分数。
::: solution
(a) $V = (4.300\times10^{-8})^3\ \mathrm{cm^3} = 7.951\times10^{-23}\ \mathrm{cm^3}$。空位模型：晶胞质量$= [3.80(55.845) + 4(15.999)]/N_\mathrm{A} = 276.21/6.022\times10^{23}\ \mathrm{g}$，$\rho = 276.21/(6.022\times10^{23} \times 7.951\times10^{-23}) = 5.77\ \mathrm{g\,cm^{-3}}$。间隙模型：$[4(55.845) + 4.2105(15.999)] = 290.75$，$\rho = 6.07\ \mathrm{g\,cm^{-3}}$。两者相差5 %，用比重瓶很容易分辨。埃里克·耶特（Eric Jette）与弗兰克·富特（Frank Foote）1933年的这类测量表明方铁矿含有铁空位，这是非化学计量化合物的空位模型的第一个证明。

(b) 化学计量氧化物被氧化时产生铁空位，每个空位由两个$\mathrm{Fe^{3+}}$补偿：
$$
\tfrac12\mathrm{O_2(g)} + \mathrm{Fe_{Fe}^\times} \rightleftharpoons \tfrac12\mathrm{O_O^\times} + \mathrm{V_{Fe}''} + 2\,\mathrm{Fe_{Fe}^\bullet}.
$$
在$\mathrm{Fe_{1-x}O}$中，每个氧的电荷守恒要求$2(1 - x) + (\text{每个氧的}\ \mathrm{Fe^{3+}}\ \text{数目}) = 2$，所以每个化学式单位的$\mathrm{Fe^{3+}}$数目为$2x = 0.10$，而铁共有$0.95$个：铁的$10.5\ \%$是$\mathrm{Fe^{3+}}$。（在真实的方铁矿中，许多$\mathrm{Fe^{3+}}$坐在空位团簇旁的四面体间隙位置上，即科赫-科恩（Koch–Cohen）团簇：点缺陷模型只是第一级近似。）
:::
:::

当缺陷浓度超过约百分之一时，缺陷会相互作用并发生有序化。方铁矿的团簇、还原态$\mathrm{WO_{3-x}}$与$\mathrm{MoO_{3-x}}$的**晶体学剪切面**（其中共棱八面体的面消除了氧空位，产生一系列分立相$\mathrm{W}_n\mathrm{O}_{3n-1}$）、以及马涅利（Magnéli）相$\mathrm{Ti}_n\mathrm{O}_{2n-1}$都是例子。于是"非化学计量"区间经更仔细研究后，可能原来是一系列密切相关的化学计量相。

::: quiz
下列哪些缺陷反应对质量、格位与有效电荷配平正确？
- [x] $\mathrm{MgO} \xrightarrow{\ \mathrm{Al_2O_3}\ } \mathrm{Mg_{Al}'} + \mathrm{O_O^\times} + \tfrac12\mathrm{V_O^{\bullet\bullet}}$
- [ ] $\mathrm{Li_2O} \xrightarrow{\ \mathrm{NiO}\ } 2\,\mathrm{Li_{Ni}^\bullet} + \mathrm{O_O^\times} + \mathrm{V_O''}$
- [x] $\mathrm{Gd_2O_3} \xrightarrow{\ \mathrm{CeO_2}\ } 2\,\mathrm{Gd_{Ce}'} + 3\,\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$
- [ ] $\mathrm{CaO} \xrightarrow{\ \mathrm{ZrO_2}\ } \mathrm{Ca_{Zr}''} + \mathrm{O_O^\times}$
::: solution
(1) Al₂O₃的阳离子格位与阴离子格位之比为2 : 3。一个Mg用去1个阳离子格位，所以需要$\tfrac32$个阴离子格位：一个被填满，半个为空。电荷$-1 + \tfrac12(2) = 0$。正确（分数系数可以接受；愿意的话可整体加倍）。(2) $\mathrm{Ni^{2+}}$格位上的$\mathrm{Li^+}$是$\mathrm{Li_{Ni}'}$而不是$^\bullet$，而氧空位是$^{\bullet\bullet}$；正确的反应是$\mathrm{Li_2O} \rightarrow 2\mathrm{Li_{Ni}'} + \mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$。(3) 正确：2个阳离子格位，4个阴离子格位，电荷$-2 + 2 = 0$。(4) 电荷$-2$未被补偿，而且一个阳离子格位只配了一个阴离子格位；正确的写法是$\mathrm{CaO} \rightarrow \mathrm{Ca_{Zr}''} + \mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$。
:::
:::

## 离子导电

离子在晶体中运动，或者靠跳入邻近的空位（**空位机理**），或者靠在各间隙位置之间跳跃（**间隙机理**），或者靠把一个格点离子挤进间隙位置并取而代之（**填隙置换机理**）。每一跳都要越过一个能垒，即迁移焓$\Delta H_\mathrm{m}$，对良导体典型值为$0.5$–$1\ \mathrm{eV}$。电场使无规跳跃偏向一方，从而产生电流。

::: proposition 能斯特-爱因斯坦关系 {#prop-nernst-einstein}
对电荷为$q = ze$、数密度为$c$（单位体积内的个数）、扩散系数为$D$的可动离子，离子电导率为
$$
\sigma = \frac{cq^2D}{k_\mathrm{B}T}.
$$ {#eq-nernst-einstein}
在热激活跳跃下，$D = D_0\exp(-\Delta H_\mathrm{m}/k_\mathrm{B}T)$，于是$\sigma T = A\exp(-E_\mathrm{a}/k_\mathrm{B}T)$：载流子浓度固定时（非本征区）$E_\mathrm{a} = \Delta H_\mathrm{m}$，载流子由热产生时（本征区）$E_\mathrm{a} = \Delta H_\mathrm{m} + \tfrac12\Delta H_\mathrm{S}$（或$\tfrac12\Delta H_\mathrm{F}$）。这一关系假定各次跳跃互不相关；当用示踪同位素测定$D$时，需要用一个关联因子（哈弗恩比（Haven ratio），典型值$0.3$–$1$）把两者联系起来。
:::

::: proof
考察沿$x$方向的电场$E$中的离子，处于带有浓度梯度的平衡态，净电流为零。漂移通量为$c\,u\,E$，其中迁移率$u$是单位场强下的漂移速度；扩散通量为$-D\,dc/dx$（菲克第一定律）。在静电势$\phi$下达到平衡，$E = -d\phi/dx$，浓度服从玻尔兹曼分布$c \propto \exp(-q\phi/k_\mathrm{B}T)$，故$dc/dx = (qE/k_\mathrm{B}T)c$。净通量为零要求$cuE = D(qE/k_\mathrm{B}T)c$，即$u = qD/k_\mathrm{B}T$（爱因斯坦关系）。均匀晶体中的电流密度为$j = cqu\,E$，所以$\sigma = cqu = cq^2D/k_\mathrm{B}T$。若$D$以$\Delta H_\mathrm{m}$被激活而$c$固定，则$\sigma T \propto \exp(-\Delta H_\mathrm{m}/k_\mathrm{B}T)$；若由[[#prop-schottky]]有$c \propto \exp(-\Delta H_\mathrm{S}/2k_\mathrm{B}T)$，则活化能相加。
:::

这两种机制在轻掺杂晶体的$\ln(\sigma T)$对$1/T$图上造成特征性的"拐点"：高温一侧是陡峭的本征直线，低温一侧是较平缓的非本征直线，其高度正比于掺杂剂浓度。由两条直线的斜率可同时提取$\Delta H_\mathrm{m}$与$\Delta H_\mathrm{S}$，[[#ex-nacl-vacancies]]中用到的数值就是这样测得的。

### 由跳跃到扩散系数

扩散系数本身也可以由跳跃图像建立。一个每秒作$\Gamma$次跳跃、每次沿随机方向跳$\lambda$长的离子，经时间$t$后的均方位移为$\langle r^2\rangle = \Gamma t\lambda^2$（相继各次随机跳跃的位移互不相关，所以它们的平方相加）。与三维扩散结果$\langle r^2\rangle = 6Dt$比较，得
$$
D = \tfrac16\Gamma\lambda^2.
$$ {#eq-random-walk}

对空位机理，离子只有在它的$z$个近邻格位中有一个为空时才能跳，其概率等于空位的格位分数$x_\mathrm{V}$，并以速率$\nu\exp(-\Delta G_\mathrm{m}/k_\mathrm{B}T)$成功跳过去，其中尝试频率$\nu$约为晶格振动频率的量级，$10^{12}$–$10^{13}\ \mathrm{s^{-1}}$。于是$\Gamma = z\nu x_\mathrm{V}\exp(-\Delta G_\mathrm{m}/k_\mathrm{B}T)$：离子的扩散系数正比于承载它们运动的缺陷浓度。这就是本节一切内容的微观基础，也是掺杂（它固定$x_\mathrm{V}$）之所以能控制离子电导率的原因。

::: example 由跳跃模型看掺杂氯化钠的电导率 {#ex-hopping}
NaCl（$a = 5.640\ \text{Å}$）含有二价杂质，把阳离子空位分数固定在$x_\mathrm{V} = 1.0\times10^{-5}$。取$\nu = 5\times10^{12}\ \mathrm{s^{-1}}$，$\Delta H_\mathrm{m} = 0.70\ \mathrm{eV}$（略去迁移熵），$z = 12$个阳离子近邻，$\lambda = a/\sqrt2$。估计$800\ \mathrm{K}$时的$D(\mathrm{Na^+})$与$\sigma$。
::: solution
$\exp(-0.70/(8.617\times10^{-5} \times 800)) = \exp(-10.15) = 3.89\times10^{-5}$，所以$\Gamma = 12 \times 5\times10^{12} \times 1.0\times10^{-5} \times 3.89\times10^{-5} = 2.3\times10^{4}\ \mathrm{s^{-1}}$：每个钠离子每秒跳跃约两万次。取$\lambda = 3.988\ \text{Å}$，[[#eq-random-walk]]给出$D = \tfrac16 \times 2.34\times10^4 \times (3.988\times10^{-10})^2 = 6.2\times10^{-16}\ \mathrm{m^2\,s^{-1}}$。$\mathrm{Na^+}$的数密度为$4/a^3 = 2.23\times10^{28}\ \mathrm{m^{-3}}$，所以由[[#eq-nernst-einstein]]得
$$
\sigma = \frac{2.23\times10^{28} \times (1.602\times10^{-19})^2 \times 6.2\times10^{-16}}{1.381\times10^{-23} \times 800} = 2.0\times10^{-3}\ \mathrm{S\,m^{-1}} = 2.0\times10^{-5}\ \mathrm{S\,cm^{-1}}.
$$
这对非本征碱金属卤化物是典型的量级；YSZ在相近温度下的电导约好$10^4$倍，这主要是因为其空位分数是$3.7\times10^{-2}$而不是$10^{-5}$。由于$\nu$与被略去的迁移熵都不确定，这个估计大概只有3倍以内的准确度。
:::
:::

::: widget plot
f: log(exp(26.7 - 1.85*x/0.08617) + c*exp(8 - 0.7*x/0.08617))/log(10)
x: 0.8, 3.2
y: -8, 4
sliders: c=1:0.01:100:0.01
labels: \log_{10}(\sigma T)\ (\text{任意单位})
caption: 掺杂类NaCl晶体离子电导率的模型阿伦尼乌斯图，横轴为$x = 1000\ \mathrm{K}/T$（指前因子为示例数值）。每个指数都具有$-E_\mathrm{a}/k_\mathrm{B}T = -E_\mathrm{a}x/0.08617$的形式，$E_\mathrm{a}$以eV计。本征项的$E_\mathrm{a} = 1.85\ \mathrm{eV}$（$\Delta H_\mathrm{m} + \tfrac12\Delta H_\mathrm{S}$，其中$\Delta H_\mathrm{m} = 0.7$、$\Delta H_\mathrm{S} = 2.3\ \mathrm{eV}$），在高温（$x$小）下占主导；非本征项的$E_\mathrm{a} = \Delta H_\mathrm{m} = 0.7\ \mathrm{eV}$，由掺杂水平$c$（滑条）定标度。增大$c$会抬低温分支并把拐点移向更高温度。真实晶体的低温端常常进一步向下弯曲，因为空位与掺杂离子缔合成电中性的对。
:::

### 快离子导体

大多数离子固体在室温下导电很差（NaCl的$\sigma < 10^{-10}\ \mathrm{S\,cm^{-1}}$）。少数称为**快离子导体**或**固体电解质**的材料导电与液体电解质相当，因为在它们的可动离子子晶格中，可容纳离子的位置远多于离子本身，于是载流子无需靠热产生，迁移势垒也低。经典的例子是**α-AgI**：$147\,^\circ\mathrm{C}$以上碘离子构成体心立方阵列，而每胞两个$\mathrm{Ag^+}$分布在42个可容纳的位置上，$\sigma \approx 1\ \mathrm{S\,cm^{-1}}$，基本上就是熔盐的电导率。其余的还有**钠β-氧化铝**（$\mathrm{Na^+}$在尖晶石块之间疏松堆积的面内运动；钠硫电池的电解质）、**YSZ**与**钆掺杂二氧化铈**（氧离子，用于燃料电池与传感器，见[[#ex-ysz]]），以及正在为固态电池开发的锂导体（石榴石型$\mathrm{Li_7La_3Zr_2O_{12}}$、$\mathrm{Li_{10}GeP_2S_{12}}$一类的硫化物；[[materials-chemistry/energy-materials]]）。

::: example 氧离子导体的活化能 {#ex-activation}
一份掺杂氧化锆样品在$800\,^\circ\mathrm{C}$时的电导率为$0.020\ \mathrm{S\,cm^{-1}}$，在$1000\,^\circ\mathrm{C}$时为$0.090\ \mathrm{S\,cm^{-1}}$（量级正确的示例数值）。用$\sigma T = A\exp(-E_\mathrm{a}/k_\mathrm{B}T)$的形式求活化能，并与对$\sigma$的直接阿伦尼乌斯拟合比较。
::: solution
$T_1 = 1073\ \mathrm{K}$，$T_2 = 1273\ \mathrm{K}$；$1/T_1 - 1/T_2 = 9.320\times10^{-4} - 7.855\times10^{-4} = 1.464\times10^{-4}\ \mathrm{K^{-1}}$。于是
$$
E_\mathrm{a} = \frac{k_\mathrm{B}\ln(\sigma_2T_2/\sigma_1T_1)}{1/T_1 - 1/T_2} = \frac{8.617\times10^{-5} \times \ln(114.6/21.46)}{1.464\times10^{-4}} = \frac{8.617\times10^{-5} \times 1.675}{1.464\times10^{-4}} = 0.99\ \mathrm{eV}.
$$
对$\ln\sigma$的直接拟合给出$8.617\times10^{-5}\ln4.5/1.464\times10^{-4} = 0.89\ \mathrm{eV}$。两者的差$k_\mathrm{B}\bar T \approx 0.1\ \mathrm{eV}$来自[[#eq-nernst-einstein]]的$1/T$指前因子；比较活化能时必须说明用的是哪种形式。由于掺杂氧化锆中的空位浓度由掺杂剂固定，这里的$E_\mathrm{a}$是一个迁移焓（在较低温度下还加上空位-掺杂剂缔合能）。
:::
:::

## 电子缺陷与颜色

缺陷还能俘获电子。把碱金属卤化物在其金属蒸气中加热，或者用辐照处理它，都会产生每个束缚着一个被俘获电子的阴离子空位，按克罗格-维克记法为$\mathrm{V_X^\times}$（一个$\mathrm{V_X^\bullet}$空位加上一个电子）。这些**F心**（来自德语*Farbe*，颜色）吸收可见光，因为被俘获的电子就像处在势箱中的粒子，而箱子的大小由晶格决定：NaCl变黄橙色，KCl变紫色，而吸收能量随晶格参数增大而下降，大致按$a^{-2}$（经验上的莫尔沃-艾维（Mollwo–Ivey）关系，实际更接近$a^{-1.8}$）。取代进基质的杂质离子是宝石与荧光粉颜色的基础：刚玉中$\mathrm{Al^{3+}}$位置上的$\mathrm{Cr^{3+}}$就是红宝石，$\mathrm{Ti^{3+}}$与$\mathrm{Fe^{2+}}$/$\mathrm{Ti^{4+}}$对使蓝宝石呈蓝色，而$\mathrm{Eu^{2+}}$或$\mathrm{Ce^{3+}}$掺杂剂制成[[materials-chemistry/magnetic-optical]]中的那些荧光粉。半导体中的施主与受主掺杂是经济意义最大的缺陷，将在[[materials-chemistry/electronic-structure-solids]]中处理。

点缺陷之外还有**扩展缺陷**：位错（其运动使金属能在远低于切过完美晶体所需的应力下发生塑性形变的线缺陷）、堆垛层错、孪晶界与晶界。它们对力学性质最为要紧，但也提供快速扩散通道，并在陶瓷的晶界处形成可能阻断离子导电的空间电荷层。

## 后续内容

只要组成发生变化，缺陷化学就是本课程其余部分的语言。[[materials-chemistry/electronic-structure-solids]]把掺杂半导体当作电子缺陷平衡来处理；[[materials-chemistry/solid-synthesis]]解释固相反应为什么慢（它们需要经由缺陷的扩散）以及烧结是怎样进行的；[[materials-chemistry/energy-materials]]则在电池与燃料电池中使用锂离子嵌入、氧空位导体与混合导体。电化学的一面——包括氧传感器与燃料电池的能斯特电势——在[[electrochemistry/fuel-cells-electrolysis]]，组态熵背后的统计力学在[[statistical-thermodynamics/boltzmann-distribution]]。

::: history
雅科夫·弗伦克尔（Yakov Frenkel）1926年提出晶体中的离子可以离开自己的格位进入间隙位置，以解释离子导电；从1930年起，瓦尔特·肖特基（Walter Schottky）与卡尔·瓦格纳（Carl Wagner）发展了离子晶体与非化学计量化合物中缺陷的统计热力学。埃里克·耶特与弗兰克·富特1933年的密度与X射线测量表明方铁矿经由空位而缺铁。罗伯特·波尔（Robert Pohl）在哥廷根的小组在整个1920与1930年代研究了碱金属卤化物中的色心。费迪南德·克罗格（Ferdinand Kröger）与亨德里克·维克（Hendrik Vink）于1956年提出了他们的记法；赫里特·布劳威尔（Gerrit Brouwer）于1954年提出了布劳威尔图。快离子导体α-AgI由卡尔·图班特（Carl Tubandt）与埃里希·洛伦茨（Erich Lorenz）在1914年确认；钠β-氧化铝则由福特汽车公司的姚（Yung-Fang Yao）与约瑟夫·库默（Joseph Kummer）在1967年认出是快速的$\mathrm{Na^+}$导体；阿尔内·马涅利（Arne Magnéli）对氧化物剪切结构的工作始于1940年代末至1950年代。
:::

::: summary
- 任何高于$0\ \mathrm{K}$的晶体都含有空位，因为空位的组态熵降低$G$；肖特基对$n_\mathrm{S}/N = \exp(-\Delta H_\mathrm{S}/2k_\mathrm{B}T)$，弗伦克尔对$n_\mathrm{F} = \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$。
- 肖特基缺陷在岩盐型卤化物与MgO中占主导，阳离子弗伦克尔缺陷在AgCl中占主导，阴离子弗伦克尔缺陷在萤石型结构中占主导。
- 克罗格-维克记法$\mathrm{M_S^c}$记录物种、格位与*有效*电荷（$^\bullet$、$'$、$^\times$）；缺陷反应对质量、格位与电荷三者守恒，并服从质量作用定律。
- 变价掺杂剂产生补偿缺陷：$\mathrm{ZrO_2}$中的$\mathrm{Y_2O_3}$每两个Y给出一个$\mathrm{V_O^{\bullet\bullet}}$，形成巨大的固定空位浓度（非本征区）。
- 与气相交换氧的氧化物中，载流子浓度服从$p_{\mathrm{O_2}}$的幂律（斜率$\pm\tfrac16$、$\pm\tfrac14$），由此可识别主导缺陷（布劳威尔图）；$\mathrm{Fe_{1-x}O}$经由空位而缺铁。
- 离子电导率遵循$\sigma = cq^2D/k_\mathrm{B}T$并配以激活跳跃；非本征区的$E_\mathrm{a}$是迁移焓，本征区的还包含一半生成焓。
- 快离子导体（α-AgI、β-氧化铝、YSZ、二氧化铈、锂石榴石与锂硫化物）的可容纳位置远多于可动离子，且迁移势垒低。
:::

## 练习

::: exercise 克罗格-维克记法练习 {level=1}
写出下列缺陷的克罗格-维克符号：(a) KCl中的一个氯空位；(b) $\mathrm{Al_2O_3}$中$\mathrm{Al^{3+}}$格位上的一个$\mathrm{Mg^{2+}}$；(c) AgBr中的一个间隙$\mathrm{Ag^+}$；(d) NiO中的一个$\mathrm{Ni^{3+}}$；(e) $\mathrm{TiO_2}$中$\mathrm{Ti^{4+}}$格位上的一个$\mathrm{Nb^{5+}}$。
::: solution
(a) $\mathrm{V_{Cl}^\bullet}$。(b) $\mathrm{Mg_{Al}'}$。(c) $\mathrm{Ag_i^\bullet}$（间隙位置通常什么都不占据，所以整个$+1$电荷都是有效的）。(d) $\mathrm{Ni_{Ni}^\bullet}$（等价地，一个定域在镍上的空穴）。(e) $\mathrm{Nb_{Ti}^\bullet}$，施主。
:::
:::

::: exercise 氯化钾中的肖特基缺陷 {level=1 check="1.0e-7"}
KCl的肖特基生成焓约为$2.5\ \mathrm{eV}$。估计$900\ \mathrm{K}$下阳离子格位空置的平衡分数。（以数值输入$n/N$，两位有效数字。）
::: solution
$n/N = \exp[-2.5/(2 \times 8.617\times10^{-5} \times 900)] = \exp(-16.12) = 1.0\times10^{-7}$，即每摩尔约$6\times10^{16}$对空位。
:::
:::

::: exercise 钆掺杂二氧化铈中的空位 {level=1 check="5.0"}
掺钆的二氧化铈组成为$\mathrm{Ce_{0.80}Gd_{0.20}O_{2-\delta}}$。写出缺陷反应，求$\delta$以及氧格位空置的百分数。（输入氧格位空置的百分数。）
::: solution
$\mathrm{Gd_2O_3} \rightarrow 2\mathrm{Gd_{Ce}'} + 3\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$。每两个Gd一个空位，所以$\delta = 0.20/2 = 0.10$，组成为$\mathrm{Ce_{0.8}Gd_{0.2}O_{1.90}}$。每个化学式单位的$2$个氧格位中有$0.10$个空位，所以$0.10/2.00 = 5.0\ \%$的氧格位是空的，比8YSZ还多——这是掺杂二氧化铈在中温区导电更好的原因之一。
:::
:::

::: exercise 一个压力依赖关系 {level=2 check="10"}
一种未掺杂氧化物在$1000\ \mathrm{K}$的电子电导率遵循$\sigma \propto p_{\mathrm{O_2}}^{-1/6}$。当$p_{\mathrm{O_2}}$从$1\ \mathrm{bar}$降到$10^{-6}\ \mathrm{bar}$时，$\sigma$增大多少倍？是哪些缺陷在起作用？（输入倍数。）
::: solution
$(10^{-6})^{-1/6} = 10^{1} = 10$。斜率$-\tfrac16$指示由自由电子补偿的带双电离的氧空位（[[#prop-brouwer]]），没有掺杂剂固定空位浓度：像$\mathrm{CeO_{2-x}}$或$\mathrm{TiO_{2-x}}$那样的n型缺氧氧化物。
:::
:::

::: exercise 氯化钠中的钙 {level=2 check="4.8e-15"}
含有格位分数为$1.0\times10^{-5}$的$\mathrm{Ca^{2+}}$的NaCl保持在$600\ \mathrm{K}$，该温度下肖特基积为$K_\mathrm{S} = [\mathrm{V_{Na}'}][\mathrm{V_{Cl}^\bullet}] = \exp(-\Delta H_\mathrm{S}/k_\mathrm{B}T)$，其中$\Delta H_\mathrm{S} = 2.3\ \mathrm{eV}$。(a) 求本征空位分数。(b) 设每个Ca都由一个阳离子空位补偿，求$[\mathrm{V_{Cl}^\bullet}]$。（以格位分数输入$[\mathrm{V_{Cl}^\bullet}]$，两位有效数字。）
::: solution
(a) $K_\mathrm{S} = \exp[-2.3/(8.617\times10^{-5} \times 600)] = \exp(-44.49) = 4.8\times10^{-20}$，本征分数为$\sqrt{K_\mathrm{S}} = 2.2\times10^{-10}$。(b) $[\mathrm{V_{Na}'}] \approx [\mathrm{Ca_{Na}^\bullet}] = 1.0\times10^{-5}$，远高于本征水平，所以$[\mathrm{V_{Cl}^\bullet}] = K_\mathrm{S}/[\mathrm{V_{Na}'}] = 4.8\times10^{-20}/1.0\times10^{-5} = 4.8\times10^{-15}$。掺杂剂把阳离子空位提高了$4.5\times10^4$倍，又把阴离子空位压低了同样的倍数。
:::
:::

::: exercise 由电导率求扩散 {level=2 check="3.0"}
8YSZ在$1273\ \mathrm{K}$时的$\sigma = 0.10\ \mathrm{S\,cm^{-1}}$。它的氧离子数密度为$5.67\times10^{28}\ \mathrm{m^{-3}}$。用能斯特-爱因斯坦关系估计氧离子的扩散系数。（以$10^{-11}\ \mathrm{m^2\,s^{-1}}$为单位输入$D$，两位有效数字。）
::: solution
$\sigma = 10\ \mathrm{S\,m^{-1}}$，$q = 2e = 3.204\times10^{-19}\ \mathrm{C}$。$D = \sigma k_\mathrm{B}T/(cq^2) = 10 \times 1.381\times10^{-23} \times 1273/(5.67\times10^{28} \times (3.204\times10^{-19})^2) = 1.758\times10^{-19}/(5.82\times10^{-9}) = 3.0\times10^{-11}\ \mathrm{m^2\,s^{-1}}$。示踪测量给出的值稍小，因为同一离子的相继各次跳跃是相关联的（哈弗恩比小于1）。
:::
:::

::: exercise 推导弗伦克尔缺陷浓度 {level=3}
(a) 对具有$N$个阳离子格位与$N_\mathrm{i}$个间隙格位的晶体，写出$n$对阳离子弗伦克尔缺陷的组态熵，使$G$取极小，并证明$n^2/[(N - n)(N_\mathrm{i} - n)] = \exp(-\Delta H_\mathrm{F}/k_\mathrm{B}T)$。(b) 对AgBr（$\Delta H_\mathrm{F} \approx 1.1\ \mathrm{eV}$，岩盐结构的四面体位置取$N_\mathrm{i} = 2N$），估计$500\ \mathrm{K}$时的$n/N$。
::: solution
(a) $S = k_\mathrm{B}\ln\{[N!/n!(N - n)!][N_\mathrm{i}!/n!(N_\mathrm{i} - n)!]\}$。由斯特林公式，$\partial S/\partial n = k_\mathrm{B}[\ln(N - n) - \ln n + \ln(N_\mathrm{i} - n) - \ln n]$。令$\partial G/\partial n = \Delta H_\mathrm{F} - T\,\partial S/\partial n = 0$得$\ln\{(N - n)(N_\mathrm{i} - n)/n^2\} = \Delta H_\mathrm{F}/k_\mathrm{B}T$，即所要的结果。当$n \ll N, N_\mathrm{i}$时：$n = \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$。(b) $n/N = \sqrt{2}\exp[-1.1/(2 \times 8.617\times10^{-5} \times 500)] = 1.414 \times \exp(-12.77) = 1.414 \times 2.85\times10^{-6} = 4.0\times10^{-6}$。在中等温度下这一浓度已足够高，使间隙银离子能够负载AgBr中的电流，并能迁移到照相乳胶中的潜影位点。
:::
:::

::: exercise 由密度定方铁矿的组成 {level=3 check="0.065"}
一份方铁矿样品的$a = 4.300\ \text{Å}$，密度$5.70\ \mathrm{g\,cm^{-3}}$。假定铁空位模型（每胞4个氧离子），求$\mathrm{Fe_{1-x}O}$中的$x$以及以$\mathrm{Fe^{3+}}$形式存在的铁的分数。（以两位有效数字输入$x$。）
::: hint
晶胞质量为$\rho a^3$；减去四个氧离子的质量后除以一个铁原子的质量。
:::
::: solution
晶胞质量$\times N_\mathrm{A} = \rho N_\mathrm{A}a^3 = 5.70 \times 6.022\times10^{23} \times 7.951\times10^{-23} = 272.9\ \mathrm{g\,mol^{-1}}$（每胞）。减去$4 \times 15.999 = 64.00$：铁为$208.9\ \mathrm{g\,mol^{-1}}$，即$208.9/55.845 = 3.741$个Fe对4个O，所以$1 - x = 0.935$，$x = 0.065$。于是每个化学式单位的$\mathrm{Fe^{3+}}$为$2x = 0.129$，占$0.935$个铁的$13.8\ \%$。答案对密度很敏感：$0.01\ \mathrm{g\,cm^{-3}}$的误差会使$x$移动约$0.003$。
:::
:::
