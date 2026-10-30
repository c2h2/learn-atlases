把锌棒插入硫酸锌溶液，把铜棒插入硫酸铜溶液，用一条浸过硝酸钾溶液的滤纸连接两种溶液，再在两根金属之间接上一台高输入电阻的电压表。读数是$1.10\ \mathrm{V}$。肉眼看不到任何动静——电压表几乎不取电流，所以几乎没有锌溶解、几乎没有铜析出——但这个数是一次精确的热力学测量。它不用量热计、也不用等待平衡，就给出了反应$\mathrm{Zn(s)} + \mathrm{Cu^{2+}(aq)} \rightarrow \mathrm{Zn^{2+}(aq)} + \mathrm{Cu(s)}$的吉布斯自由能，精确到四位有效数字。把电池升高十度，读数漂移约一毫伏；这个漂移就是反应熵。改变浓度，读数服从一条对数定律；这条定律联系着离子的活度。

[[general-chemistry-2/electrochemistry-intro]]的入门处理给出了工作规则：标准电势、$\Delta_\mathrm{r}G = -nFE$、用浓度写的能斯特方程。本章在[[thermodynamics/free-energy]]与[[thermodynamics/ions-in-solution]]的热力学上把它们重建起来，使每条规则都带着自己的适用条件。我们会看到：电池电动势为什么定义在零电流；金属中的电子究竟"感受到"什么（电化学势）；温度系数如何给出熵和焓；哈内德电池如何把电压表变成测活度系数最精确的仪器；以及半电池电势可以怎样——以及不能怎样——合并。一切都在恒定温度和压力下进行，$p^\circ = 1\ \mathrm{bar}$，溶质取质量摩尔浓度标准态$b^\circ = 1\ \mathrm{mol\,kg^{-1}}$，标准电势取自CRC《化学与物理手册》（*Handbook of Chemistry and Physics*）的电化学序列（其数值遵循Bard、Parsons与Jordan编著的《水溶液标准电势》（*Standard Potentials in Aqueous Solution*））。

## 电池、电极与符号约定

**原电池**通过迫使电子从还原剂经外电路走向氧化剂，把氧化还原反应的吉布斯自由能转化为电功。每个**电极**是一个与离子导体（电解质）接触的电子导体（金属或石墨）；氧化发生在**阳极**，还原发生在**阴极**。**电解池**靠外加电压使反应反向进行；同一只电极可以在一种模式下是阳极、另一种模式下是阴极，正因如此，名称随着*过程*（氧化或还原）而定，绝不随着端子的正负而定。

::: definition 电池符号与电池电动势 {#def-cell}
电池按**电池符号**从左到右书写：单竖线$|$表示相界面，虚线竖线$\vdots$表示可互溶液体之间的液接，双竖线$\Vert$表示其电势已被假定消除的液接（盐桥）。例如，
$$
\mathrm{Zn(s)\,|\,ZnSO_4(aq)\,\Vert\,CuSO_4(aq)\,|\,Cu(s)} .
$$
**电池反应**定义为*还原在右电极上发生*、氧化在左电极上发生时的反应。**电池电动势**（IUPAC的正式名称是*电池的电势差*，旧称电动势EMF）是在两个端子为同种金属、且在*零电流*极限下测得的右端子电势减左端子电势：
$$
E_\mathrm{cell} = \phi_\mathrm{R} - \phi_\mathrm{L} = E_\mathrm{R} - E_\mathrm{L},
$$
其中$E_\mathrm{R}$与$E_\mathrm{L}$是两电极的**电极电势**（还原电势），各自对标准氢电极$\mathrm{Pt\,|\,H_2(g, 1\ bar)\,|\,H^+(aq, a = 1)}$测量；按约定，标准氢电极的电势在任何温度下都为零。
:::

这个定义里有三点分量很重。第一，电池反应是与电池符号绑定的一条*约定*：若$E_\mathrm{cell} > 0$，则按所写的反应自发；把电池符号反着写，反应和符号一起反号，而没有任何物理事实改变。第二，零电流条件必不可少。输出电流的电池要把电势损耗在电解质的电阻和电极的动力学上（[[electrochemistry/electrode-kinetics]]）；只有在零电流下电池才处于*约束平衡*状态——每个界面都处于平衡，只有总反应被断开的电路拦住了。现代仪表用$10^{12}\ \Omega$以上的输入阻抗来逼近这一点；历史上波根多夫（Poggendorff）的对消法让电池与一个已知电势相对消，使电流恰好为零。第三，两端引线必须是同种金属，因为两个*不同*金属之间的电势差包含它们的接触电势；把两个电极都接上铜引线就把这一项去掉了。

单个电极的电势无法孤立测量——任何电压表都需要与溶液的第二次接触，而这本身就是一只电极。因此电势表都是相对氢电极的。IUPAC曾推荐（Trasatti，1986年）标准氢电极在真空标度上的"绝对"电势估值$4.44\ \mathrm{V}$；它涉及非热力学的假设，电池计算中从来不需要它。

## 电化学势

反应的吉布斯自由能凭什么会表现为电压？因为带电粒子既响应化学、又响应电，而在电池里这两者相互制衡。

::: definition 电化学势 {#def-echem-potential}
对处于内（伽伐尼）电势$\phi^\alpha$的相$\alpha$中、电荷数为$z_i$的物种$i$，其**电化学势**为
$$
\tilde\mu_i^\alpha = \mu_i^\alpha + z_i F\phi^\alpha ,
$$ {#eq-echem}
其中$\mu_i^\alpha = \mu_i^{\circ} + RT\ln a_i^\alpha$是化学势，$F = N_\mathrm{A}e = 96\,485\ \mathrm{C\,mol^{-1}}$是法拉第常数。它是把物种$i$加入该相时的摩尔吉布斯自由能，包括把它的电荷送到该相电势上所需的电功$z_iF\phi$。对电中性物种，$\tilde\mu_i = \mu_i$。在都含有$i$的相$\alpha$与$\beta$之间达到平衡时，$\tilde\mu_i^\alpha = \tilde\mu_i^\beta$；对涉及带电物种的反应，$\sum_i \nu_i\tilde\mu_i = 0$。
:::

平衡条件就是[[thermodynamics/reaction-equilibrium]]里熟悉的$\sum\nu_i\mu_i = 0$，推广到带电物种。它立刻解释了金属与溶液的界面为什么会获得电势差：如果锌原子以$\mathrm{Zn^{2+}}$离子的形式离开金属、把电子留下，金属变负而溶液变正，直到电学一项阻止进一步溶解为止。只需要极微量的电荷——少到无法用化学方法分析——就能在几纳米厚的界面上建立起一伏的电势差；[[electrochemistry/double-layer]]详细研究那个界面。

::: proposition 电池电动势与反应吉布斯自由能 {#prop-dg}
在恒温恒压下、按所写电池反应每摩尔反应转移$\nu$摩尔电子的电池中（$\nu$是电池反应的电荷数，一个纯数），零电流电池电动势与反应吉布斯自由能的关系是
$$
\Delta_\mathrm{r}G = -\nu F E_\mathrm{cell}, \qquad \Delta_\mathrm{r}G^\circ = -\nu FE^\circ_\mathrm{cell} .
$$ {#eq-dg}
只要电池的每个界面都处于平衡、液接电势不存在或可忽略，这一关系就成立。
:::

::: proof
**路线一：可逆功。**恒$T$、恒$p$下，系统所能做的最大非膨胀功等于其吉布斯自由能的减少，$w_\mathrm{e,max} = \Delta G$，$w$为*对*系统做的功（[[thermodynamics/free-energy]]）。让电池反应前进$\mathrm{d}\xi$。电荷$\nu F\,\mathrm{d}\xi$经外电路从左端子流到右端子——即电子（电荷$-\nu F\,\mathrm{d}\xi$）从左到右流动。在电池外部把电荷$Q$从电势$\phi_\mathrm{L}$移到$\phi_\mathrm{R}$对电池做的功是$-Q(\phi_\mathrm{R} - \phi_\mathrm{L})$，故$\mathrm{d}w_\mathrm{e} = -\nu FE_\mathrm{cell}\,\mathrm{d}\xi$。功只有在电流为无穷小时——即在零电流电势下——才取最大（可逆）值。于是$\mathrm{d}G = -\nu FE_\mathrm{cell}\,\mathrm{d}\xi$，且$\Delta_\mathrm{r}G = (\partial G/\partial\xi)_{T,p} = -\nu FE_\mathrm{cell}$。

**路线二：电化学势。**把电池反应写成两个电极反应之和：$\nu$个电子在左电极出现、在右电极被消耗。每只电极都处于平衡，故右电极$\sum_\mathrm{R}\nu_i\mu_i - \nu\tilde\mu_\mathrm{e}^\mathrm{R} = 0$（对其电中性和离子物种连同电化学势求和），左电极同理。两式相加，离子的电学项相消，因为两个电极共享同一种电解质（无液接），剩下$\Delta_\mathrm{r}G = \nu(\tilde\mu_\mathrm{e}^\mathrm{R} - \tilde\mu_\mathrm{e}^\mathrm{L})$。端子金属相同，电子的化学势相等，由[[#eq-echem]]且$z = -1$得$\tilde\mu_\mathrm{e}^\mathrm{R} - \tilde\mu_\mathrm{e}^\mathrm{L} = -F(\phi_\mathrm{R} - \phi_\mathrm{L}) = -FE_\mathrm{cell}$。因此$\Delta_\mathrm{r}G = -\nu FE_\mathrm{cell}$。所有物种都处于标准态，即得标准形式。
:::

两点值得强调。电池电动势是**强度量**：所有化学计量系数加倍，$\Delta_\mathrm{r}G$与$\nu$同时加倍，而$E$不变。而且测得的电势直接给出平衡常数，因为$\Delta_\mathrm{r}G^\circ = -RT\ln K$：
$$
\ln K = \frac{\nu FE^\circ_\mathrm{cell}}{RT}, \qquad \log K = \frac{\nu E^\circ_\mathrm{cell}}{0.05916\ \mathrm{V}}\quad (298.15\ \mathrm{K}) .
$$ {#eq-lnK}
$25\,^\circ\mathrm{C}$下，$RT/F = 25.693\ \mathrm{mV}$，$(\ln 10)RT/F = 59.16\ \mathrm{mV}$——每一电子$59\ \mathrm{mV}$的标准电势对应$K$中十的一次方。

::: example 丹尼尔电池 {#ex-daniell}
对$\mathrm{Zn(s)\,|\,Zn^{2+}(aq)\,\Vert\,Cu^{2+}(aq)\,|\,Cu(s)}$，已知$E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.340\ \mathrm{V}$、$E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.762\ \mathrm{V}$（CRC），求$25\,^\circ\mathrm{C}$下的电池反应、$E^\circ_\mathrm{cell}$、$\Delta_\mathrm{r}G^\circ$与$K$。
::: solution
右侧还原：$\mathrm{Cu^{2+} + 2e^- \rightarrow Cu}$；左侧氧化：$\mathrm{Zn \rightarrow Zn^{2+} + 2e^-}$。电池反应为$\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$，$\nu = 2$。
$$
E^\circ_\mathrm{cell} = E^\circ_\mathrm{R} - E^\circ_\mathrm{L} = 0.340 - (-0.762) = 1.102\ \mathrm{V}.
$$
$$
\Delta_\mathrm{r}G^\circ = -\nu FE^\circ = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.102\ \mathrm{V} = -2.127\times10^{5}\ \mathrm{J\,mol^{-1}} = -212.7\ \mathrm{kJ\,mol^{-1}}
$$
（用到$1\ \mathrm{C\,V} = 1\ \mathrm{J}$）。由[[#eq-lnK]]，$\log K = 2 \times 1.102/0.05916 = 37.26$，故$K = 1.8\times10^{37}$。这一反应在任何实际意义上都进行到底：平衡时比值$a(\mathrm{Zn^{2+}})/a(\mathrm{Cu^{2+}})$为$10^{37}$。注意$K$大得永远不可能通过分析平衡混合物来测得——那里已检测不到任何$\mathrm{Cu^{2+}}$。电池在远离平衡的零电流下把它测了出来，这正是该方法了不起的威力。
:::
:::

## 能斯特方程

::: proposition 能斯特方程 {#prop-nernst}
对电荷数为$\nu$的电池反应$\sum_i\nu_i\mathrm{X}_i = 0$，在恒$T$、恒$p$且无液接电势时，
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{\nu F}\ln Q, \qquad Q = \prod_i a_i^{\nu_i},
$$ {#eq-nernst}
其中$a_i$是活度（对溶质$a_i = \gamma_i b_i/b^\circ$，对气体$a_i = f_i/p^\circ \approx p_i/p^\circ$，纯固体和纯液体$a = 1$）。对还原半反应为$\mathrm{Ox} + \nu\mathrm{e^-} \rightarrow \mathrm{Red}$（包括任何$\mathrm{H^+}$或$\mathrm{H_2O}$）的单个电极，同样的方程以半反应的活度商为$Q$（电子不计入）给出电极电势。
:::

::: proof
由[[thermodynamics/reaction-equilibrium]]，$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$，它来自$\Delta_\mathrm{r}G = \sum\nu_i\mu_i$与$\mu_i = \mu_i^\circ + RT\ln a_i$。两边除以$-\nu F$，对$\Delta_\mathrm{r}G$和$\Delta_\mathrm{r}G^\circ$都用[[#eq-dg]]：
$$
E_\mathrm{cell} = -\frac{\Delta_\mathrm{r}G}{\nu F} = -\frac{\Delta_\mathrm{r}G^\circ}{\nu F} - \frac{RT}{\nu F}\ln Q = E^\circ_\mathrm{cell} - \frac{RT}{\nu F}\ln Q .
$$
对单个电极，考察左边为标准氢电极的电池。它的电池反应是半反应与$\tfrac{\nu}{2}\mathrm{H_2} \rightarrow \nu\mathrm{H^+}$之和，后者的物种活度全为1，对$Q$毫无贡献，而由[[#def-cell]]，$E_\mathrm{cell}$就是电极电势。
:::

平衡时$E_\mathrm{cell} = 0$且$Q = K$，回到[[#eq-lnK]]。没电的电池就是达到平衡的电池：它的反应的$K$仍然很大，只是活度已经跑到了$Q = K$的地方。

::: widget plot
f: E0 - 0.0591563*(T/298.15)/n*x
x: -6, 6
y: -0.4, 1.6
sliders: E0=1.102:0:1.5:0.001; n=2:1:4:1; T=298.15:273:373:1
labels: E_\mathrm{cell}\ (\mathrm{V})
hlines: 0
caption: 能斯特方程[[#eq-nernst]]：电池电动势对$\log_{10}Q$（$x$）的曲线。默认是丹尼尔电池（$E^\circ = 1.102\ \mathrm{V}$，$\nu = 2$）：$25\,^\circ\mathrm{C}$下$Q$每十倍直线下降$59.16/\nu\ \mathrm{mV}$，所以六个数量级的浓度变化只让电压变$0.18\ \mathrm{V}$。直线在$\log Q = \log K = 37$处过零，远在图的右缘之外。增大$\nu$看斜率变小；升高$T$看斜率按$T$成正比变陡（$E^\circ$自身的温度依赖不在其中——那是下一节的主题）。
:::

对数解释了电池的"皮实"：反应物消耗大半时电压几乎不动，只有接近耗尽时才陡降。它也解释了电位分析法的*灵敏度*。单价离子活度每十倍使电极电势移动$59\ \mathrm{mV}$，而电势可以读到$0.1\ \mathrm{mV}$，所以离子选择性电极能在好几个数量级上测量$\log a$（[[analytical-chemistry/electroanalytical]]）。

::: example 一个含气体和酸的电池 {#ex-harned-cell}
求$25\,^\circ\mathrm{C}$下
$$
\mathrm{Pt\,|\,H_2(g, 1.00\ bar)\,|\,HCl(aq, 0.0100\ mol\,kg^{-1})\,|\,AgCl(s)\,|\,Ag(s)}
$$
的电动势，已知$E^\circ(\mathrm{AgCl/Ag,Cl^-}) = +0.22233\ \mathrm{V}$，此浓度下实测平均活度系数$\gamma_\pm(\mathrm{HCl}) = 0.904$（哈内德（Harned）与欧文（Owen））。
::: solution
右：$\mathrm{AgCl(s) + e^- \rightarrow Ag(s) + Cl^-(aq)}$。左（氧化）：$\tfrac{1}{2}\mathrm{H_2(g) \rightarrow H^+(aq) + e^-}$。电池反应（$\nu = 1$）为
$$
\tfrac{1}{2}\mathrm{H_2(g)} + \mathrm{AgCl(s)} \rightarrow \mathrm{Ag(s)} + \mathrm{H^+(aq)} + \mathrm{Cl^-(aq)} .
$$
$E^\circ_\mathrm{cell} = 0.22233 - 0 = 0.22233\ \mathrm{V}$。活度商为$Q = a_{\mathrm{H^+}}a_{\mathrm{Cl^-}}/(p_{\mathrm{H_2}}/p^\circ)^{1/2} = a_\pm^2 = (\gamma_\pm b/b^\circ)^2$，因为固体的活度为1、氢气在$1\ \mathrm{bar}$。于是
$$
E = E^\circ - \frac{RT}{F}\ln(\gamma_\pm b/b^\circ)^2 = 0.22233\ \mathrm{V} - 2(0.025693\ \mathrm{V})\ln(0.904\times0.0100) = 0.22233 + 0.24181 = 0.4641\ \mathrm{V}.
$$
注意单个离子的活度从未出现——只出现它们的乘积，即可测的$a_\pm^2$（[[thermodynamics/ions-in-solution]]）。若忽略活度系数（$\gamma_\pm = 1$），会得到$0.4590\ \mathrm{V}$，低了$5\ \mathrm{mV}$；现代电压表能读到$0.01\ \mathrm{mV}$，所以这个电池是探测$\gamma_\pm$的灵敏探针。
:::
:::

### 测量标准电势与活度系数

上面的例子倒过来做就是方法。在若干质量摩尔浓度下测量$E$，把能斯特方程重排，得
$$
E + \frac{2RT}{F}\ln\frac{b}{b^\circ} = E^\circ - \frac{2RT}{F}\ln\gamma_\pm .
$$
左边由实验已知；右边含两个未知量。德拜-休克尔极限公式（[[thermodynamics/ions-in-solution]]）给出$1{:}1$型电解质在低浓度下$\ln\gamma_\pm = -(\ln 10)A\sqrt{b/b^\circ}$，所以把左边对$\sqrt{b}$作图，应趋于一条斜率为$2(\ln 10)ART/F = 0.0602\ \mathrm{V}$的直线，其在$b = 0$处的截距就是$E^\circ$。一旦$E^\circ$确定，每个测得的$E$就给出对应浓度下的$\gamma_\pm$。哈内德与Ehlers就是这样在1932–1933年确定了$E^\circ(\mathrm{AgCl/Ag})$，而哈内德与欧文、罗宾逊（Robinson）与斯托克斯（Stokes）的表中大部分活度系数数据就是这样得到的。

::: example 外推求$E^\circ$ {#ex-extrapolation}
$25\,^\circ\mathrm{C}$下测得[[#ex-harned-cell]]的电池在以下$E' = E + (2RT/F)\ln(b/b^\circ)$值：

| $b/(\mathrm{mol\,kg^{-1}})$ | $0.001$ | $0.005$ | $0.010$ | $0.020$ |
|---|---|---|---|---|
| $\sqrt{b/b^\circ}$ | $0.0316$ | $0.0707$ | $0.1000$ | $0.1414$ |
| $E'/\mathrm{mV}$ | $224.16$ | $226.17$ | $227.52$ | $229.19$ |

求$E^\circ$与$b = 0.020\ \mathrm{mol\,kg^{-1}}$时的$\gamma_\pm$。
::: solution
过四点的最小二乘直线（下面的图作了这一拟合）斜率为$45.8\ \mathrm{mV}$每单位$\sqrt{b}$，截距$222.8\ \mathrm{mV}$。斜率低于极限公式的$60.2\ \mathrm{mV}$，因为$b \approx 0.005$以上$\gamma_\pm$的下降已经比极限公式慢；只用极限公式最适用的两个最低点，得斜率$51.4\ \mathrm{mV}$、截距$222.5\ \mathrm{mV}$。公认值——用扩展形式的德拜-休克尔方程仔细外推——是$E^\circ = 222.33\ \mathrm{mV}$，而这里的数据就是照它构造的：对$\sqrt{b}$的直线外推会高出零点几毫伏，这就是仔细的工作要用扩展式的原因。

$E^\circ = 0.22233\ \mathrm{V}$时，在$b = 0.020\ \mathrm{mol\,kg^{-1}}$：
$$
\ln\gamma_\pm = \frac{E^\circ - E'}{2RT/F} = \frac{(0.22233 - 0.22919)\ \mathrm{V}}{0.051386\ \mathrm{V}} = -0.1335, \qquad \gamma_\pm = 0.875 .
$$
只用极限公式会给$\log\gamma_\pm = -0.509\sqrt{0.020} = -0.0720$、$\gamma_\pm = 0.847$；在此浓度下实验比理论更准。
:::
:::

::: widget regression
points: 0.0316,224.16; 0.0707,226.17; 0.1,227.52; 0.1414,229.19
degree: 1
x: 0, 0.16
y: 221, 231
caption: [[#ex-extrapolation]]的外推：对电池$\mathrm{Pt\,|\,H_2\,|\,HCl(aq)\,|\,AgCl\,|\,Ag}$，把$E' = E + (2RT/F)\ln b$（毫伏）对$\sqrt{b}$作图。最小二乘直线的截距估计$E^\circ(\mathrm{AgCl/Ag})$。把浓度最高的那个点拖开，看截距向$222.3\ \mathrm{mV}$移动：信息在极限公式成立的低浓度点上，但那些点也最难测得准——这是每一次向无限稀释外推的经典两难。
:::

## 温度系数：用电压表测熵和焓

由于$\Delta_\mathrm{r}G$作为温度的函数已知，它的导数也已知。

::: proposition 由电池电动势求热力学函数 {#prop-temp}
恒压下，对电荷数为$\nu$的电池反应，
$$
\Delta_\mathrm{r}S = \nu F\left(\frac{\partial E_\mathrm{cell}}{\partial T}\right)_p, \qquad
\Delta_\mathrm{r}H = -\nu F\left[E_\mathrm{cell} - T\left(\frac{\partial E_\mathrm{cell}}{\partial T}\right)_p\right], \qquad
\Delta_\mathrm{r}C_p = \nu FT\left(\frac{\partial^2 E_\mathrm{cell}}{\partial T^2}\right)_p .
$$ {#eq-temp}
同样的关系对标准量（以$E^\circ$代$E_\mathrm{cell}$）成立。
:::

::: proof
对反应，$(\partial\Delta_\mathrm{r}G/\partial T)_p = -\Delta_\mathrm{r}S$，即$(\partial G/\partial T)_p = -S$（[[thermodynamics/free-energy]]）的反应形式。代入$\Delta_\mathrm{r}G = -\nu FE$，$\nu$与$F$不依赖温度，得$-\nu F(\partial E/\partial T)_p = -\Delta_\mathrm{r}S$，即第一个结果。于是$\Delta_\mathrm{r}H = \Delta_\mathrm{r}G + T\Delta_\mathrm{r}S = -\nu FE + \nu FT(\partial E/\partial T)_p$，即第二个；它是吉布斯-亥姆霍兹方程的电化学形式。最后$\Delta_\mathrm{r}C_p = (\partial\Delta_\mathrm{r}H/\partial T)_p$；对第二个结果求导，$-\nu F\,\partial E/\partial T$与$+\nu F\,\partial E/\partial T$相消，剩下$\nu FT\,\partial^2E/\partial T^2$。（等价地，$\Delta_\mathrm{r}C_p = T(\partial\Delta_\mathrm{r}S/\partial T)_p$。）
:::

第一个方程令人惊叹：熵——通常要从接近绝对零度的热容积分求得——竟能从电压对温度的斜率上读出来。可逆工作的电池每摩尔反应与环境交换的热是$q_\mathrm{rev} = T\Delta_\mathrm{r}S$；电势*随*温度*升高*的电池在可逆工作时吸热，从而把多于反应焓的能量变成电功，差额来自环境。亥姆霍兹（Helmholtz）在1882年正是强调了这一点，纠正了汤姆孙（Thomson）等人"电池的电功等于反应热"的旧信念。

::: example 银-氯化银电池的热力学 {#ex-temp}
对[[#ex-harned-cell]]的电池，$298.15\ \mathrm{K}$下$E^\circ = 0.22233\ \mathrm{V}$、$(\partial E^\circ/\partial T)_p = -6.45\times10^{-4}\ \mathrm{V\,K^{-1}}$（Bates与Bower 1954年的测量）。求$\tfrac{1}{2}\mathrm{H_2(g) + AgCl(s) \rightarrow Ag(s) + H^+(aq) + Cl^-(aq)}$的$\Delta_\mathrm{r}G^\circ$、$\Delta_\mathrm{r}S^\circ$与$\Delta_\mathrm{r}H^\circ$，并与量热表列值比较。
::: solution
$\nu = 1$：
$$
\begin{aligned}
\Delta_\mathrm{r}G^\circ &= -FE^\circ = -96\,485 \times 0.22233\ \mathrm{J\,mol^{-1}} = -21.45\ \mathrm{kJ\,mol^{-1}},\\
\Delta_\mathrm{r}S^\circ &= F\,\frac{\partial E^\circ}{\partial T} = 96\,485 \times (-6.45\times10^{-4})\ \mathrm{J\,K^{-1}\,mol^{-1}} = -62.2\ \mathrm{J\,K^{-1}\,mol^{-1}},\\
\Delta_\mathrm{r}H^\circ &= \Delta_\mathrm{r}G^\circ + T\Delta_\mathrm{r}S^\circ = -21.45 + 298.15\times(-0.0622)\ \mathrm{kJ\,mol^{-1}} = -40.0\ \mathrm{kJ\,mol^{-1}}.
\end{aligned}
$$
由NBS标准熵表（$S^\circ/\mathrm{J\,K^{-1}\,mol^{-1}}$：$\mathrm{Ag}$ 42.55、$\mathrm{Cl^-(aq)}$ 56.5、$\mathrm{AgCl}$ 96.2、$\mathrm{H_2}$ 130.68、$\mathrm{H^+(aq)}$按约定为0），$\Delta_\mathrm{r}S^\circ = 42.55 + 56.5 - 96.2 - \tfrac{1}{2}(130.68) = -62.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$。由生成焓（$\mathrm{Cl^-(aq)}$ $-167.16$、$\mathrm{AgCl}$ $-127.07\ \mathrm{kJ\,mol^{-1}}$），$\Delta_\mathrm{r}H^\circ = -40.09\ \mathrm{kJ\,mol^{-1}}$。电学方法与量热方法在各自的不确定度内一致。负的熵反映消耗半摩尔气体、并生成两个把周围水分子有序化了的离子。由于$T\Delta_\mathrm{r}S^\circ < 0$，可逆电池每摩尔虽做$21.45\ \mathrm{kJ}$的电功，却同时向环境放出$18.5\ \mathrm{kJ}$的热。
:::
:::

::: quiz
某电池$E_\mathrm{cell} = 1.20\ \mathrm{V}$，$(\partial E/\partial T)_p = +0.20\ \mathrm{mV\,K^{-1}}$。它在$25\,^\circ\mathrm{C}$下可逆工作时
- [ ] 放热，因为一切自发反应都放热
- [x] 从环境吸热，其电功大于$-\Delta_\mathrm{r}H$
- [ ] 不交换热，因为可逆过程是绝热的
- [ ] $\Delta_\mathrm{r}S < 0$，因为$E > 0$
::: solution
$q_\mathrm{rev} = T\Delta_\mathrm{r}S = \nu FT(\partial E/\partial T)_p > 0$，热*流入*电池。电池做的电功是$-\Delta_\mathrm{r}G = -\Delta_\mathrm{r}H + T\Delta_\mathrm{r}S$，比$-\Delta_\mathrm{r}H$多出所吸的热。$E$的符号决定的是$\Delta_\mathrm{r}G$的符号，不是$\Delta_\mathrm{r}S$的。
:::
:::

::: warning 电池电动势不是焓的量度 {#warn-enthalpy}
人们容易把$\nu FE$读成"反应放出的能量"。它是*吉布斯*自由能，与$-\Delta_\mathrm{r}H$差一个$T\Delta_\mathrm{r}S$，而这一项可以很大：对生成液态水的氢-氧燃料电池，$-\Delta_\mathrm{r}G^\circ = 237.1\ \mathrm{kJ\,mol^{-1}}$而$-\Delta_\mathrm{r}H^\circ = 285.8\ \mathrm{kJ\,mol^{-1}}$，任何燃料电池无论多么完美，$25\,^\circ\mathrm{C}$下把焓变为功的转化比例都不超过$83\,\%$（[[electrochemistry/fuel-cells-electrolysis]]）。相关的失误是用$\Delta_\mathrm{r}H/T$计算$\Delta_\mathrm{r}S$；求熵需要的是$E$对温度的*系数*，而不是$E$本身。只有当电池电动势与温度无关时，反应熵才为零。
:::

## 合并电极电势

半反应的电势有表可查，但你常常需要表上没有的电势——对应另一种氧化态、另一种参比，或一种难溶盐。

::: proposition 合并半反应电势 {#prop-combine}
若转移$\nu_3$个电子的半反应(3)是转移$\nu_1$、$\nu_2$个电子的半反应(1)与(2)之和，则$\nu_3 = \nu_1 + \nu_2$且
$$
E^\circ_3 = \frac{\nu_1E^\circ_1 + \nu_2E^\circ_2}{\nu_1 + \nu_2} .
$$ {#eq-combine}
若电子相消，即(1)减(2)是一个转移$\nu$个电子的完整反应，其标准电势为$E^\circ_1 - E^\circ_2$，此时电势可以直接相减。
:::

::: proof
吉布斯能是广延态函数，随反应相加：$\Delta_\mathrm{r}G^\circ_3 = \Delta_\mathrm{r}G^\circ_1 + \Delta_\mathrm{r}G^\circ_2$。每个半反应电势都通过它与氢电极组成的电池来定义，故$\Delta_\mathrm{r}G^\circ_k = -\nu_kFE^\circ_k$（氢的半反应同样相加）。于是$-\nu_3FE^\circ_3 = -\nu_1FE^\circ_1 - \nu_2FE^\circ_2$，即[[#eq-combine]]。电子相消时两个半反应的$\nu$相同，$\Delta_\mathrm{r}G^\circ = -\nu F(E^\circ_1 - E^\circ_2)$。
:::

::: example 由铁(III)到铁 {#ex-combine}
已知$E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.771\ \mathrm{V}$、$E^\circ(\mathrm{Fe^{2+}/Fe}) = -0.447\ \mathrm{V}$（CRC），求$E^\circ(\mathrm{Fe^{3+}/Fe})$。
::: solution
$\mathrm{Fe^{3+} + e^- \rightarrow Fe^{2+}}$（$\nu_1 = 1$）加$\mathrm{Fe^{2+} + 2e^- \rightarrow Fe}$（$\nu_2 = 2$）得$\mathrm{Fe^{3+} + 3e^- \rightarrow Fe}$（$\nu_3 = 3$）：
$$
E^\circ_3 = \frac{1(0.771) + 2(-0.447)}{3}\ \mathrm{V} = \frac{-0.123}{3}\ \mathrm{V} = -0.041\ \mathrm{V} .
$$
（CRC表列$-0.037\ \mathrm{V}$；差异反映铁数据的不确定度。）把两个电势直接相加，$0.771 - 0.447 = 0.324\ \mathrm{V}$，是错的：电势是强度量，吉布斯能不是，相加的是$\nu E^\circ$之积。把$\nu E^\circ$对氧化态作图的图（弗罗斯特图）利用的正是这种可加性：连接两个态的直线斜率就是该电对的电势。
:::
:::

同样的推理可以把电势转化为溶度积。电对$\mathrm{AgCl/Ag}$就是$\mathrm{Ag^+/Ag}$把银离子固定在$K_\mathrm{sp}$决定的极小活度上：用$\mathrm{Ag^+ + e^- \rightarrow Ag}$（$0.7996\ \mathrm{V}$）减去$\mathrm{AgCl + e^- \rightarrow Ag + Cl^-}$（$E^\circ = 0.2223\ \mathrm{V}$），剩下$\mathrm{AgCl \rightarrow Ag^+ + Cl^-}$，一个净电子转移为零、而$\Delta_\mathrm{r}G^\circ = -F(0.2223 - 0.7996)$为正的反应。于是$\ln K_\mathrm{sp} = (0.2223 - 0.7996)\ \mathrm{V}/(RT/F) = -22.47$，$K_\mathrm{sp} = 1.7\times10^{-10}$，与溶解度测量结果（$1.8\times10^{-10}$）一致。$\mathrm{Ag|AgCl|Cl^-}$这类第二类电极与甘汞电极$\mathrm{Hg|Hg_2Cl_2|Cl^-}$之所以是稳定的参比电极，正是因为难溶盐固定了金属离子的活度。

::: definition 形式电势 {#def-formal}
电对的**形式电势**$E^{\circ\prime}$是在指定介质中（例如$1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HClO_4}$，或给定pH的缓冲溶液），当氧化型与还原型的*分析*（总）浓度相等时测得的电极电势。它把活度系数、配位与酸碱副平衡收进一个数，于是该介质中
$$
E = E^{\circ\prime} - \frac{RT}{\nu F}\ln\frac{c_\mathrm{Red}}{c_\mathrm{Ox}} .
$$
对$\mathrm{Fe^{3+}/Fe^{2+}}$，在$1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HClO_4}$中$E^{\circ\prime} \approx 0.73\ \mathrm{V}$，低于$E^\circ = 0.771\ \mathrm{V}$；在氯化物、硫酸盐与磷酸盐介质中更低，因为铁(III)比铁(II)配位更强。生物化学中pH 7下的形式电势写作$E^{\circ\prime}$或$E_\mathrm{m,7}$。
:::

伏安法测到的就是形式电势（[[electrochemistry/voltammetry]]）；只要你在固定的背景电解质中工作，就该用这个数。标准电势则是热力学表中需要的那个数。

## 电势与pH：水的稳定窗口

许多半反应涉及$\mathrm{H^+}$或$\mathrm{OH^-}$，其电势依赖pH。对$\mathrm{Ox} + m\mathrm{H^+} + \nu\mathrm{e^-} \rightarrow \mathrm{Red}$，$25\,^\circ\mathrm{C}$下能斯特方程给出
$$
E = E^\circ - \frac{0.05916\ \mathrm{V}}{\nu}\log\frac{a_\mathrm{Red}}{a_\mathrm{Ox}} - \frac{m}{\nu}(0.05916\ \mathrm{V})\,\mathrm{pH} ,
$$
这是一条斜率为每pH单位$-59.16\,m/\nu\ \mathrm{mV}$的直线。水本身就有这样两个电对：
$$
\mathrm{O_2(g)} + 4\mathrm{H^+} + 4\mathrm{e^-} \rightarrow 2\mathrm{H_2O(l)}, \quad E^\circ = 1.229\ \mathrm{V}; \qquad 2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{H_2(g)}, \quad E^\circ = 0 .
$$
两气体均处于$1\ \mathrm{bar}$时，两条线的斜率都是每pH单位$-59.16\ \mathrm{mV}$，在任何pH下都相距$1.229\ \mathrm{V}$。在上那条线之上，水被热力学地氧化为氧气；在下那条线之下，水被还原为氢气。两者之间就是水的**稳定窗口**——不分解溶剂便可行的一切水溶液化学所在的区域。

::: widget plot
f: 1.229 - 0.0591563*x; -0.0591563*x; E1 + 0*x
x: 0, 14
y: -1, 1.5
sliders: E1=0.771:-1:1.5:0.001
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \text{与pH无关的电对}
caption: $25\,^\circ\mathrm{C}$、$p(\mathrm{O_2}) = p(\mathrm{H_2}) = 1\ \mathrm{bar}$下水的稳定窗口：电极电势（对SHE）对pH。不涉及质子的电对是一条水平线；把滑块调到它的标准电势。$\mathrm{Fe^{3+}/Fe^{2+}}$（$0.771\ \mathrm{V}$）在低pH下位于窗口之内，所以铁(III)溶液在酸中稳定。$\mathrm{Co^{3+}/Co^{2+}}$（$1.92\ \mathrm{V}$）在窗口之上：水溶液中的钴(III)会氧化水。$\mathrm{Zn^{2+}/Zn}$（$-0.762\ \mathrm{V}$）在窗口之下：锌在任何pH下都应当从水中放出氢气——它放得很慢是动力学，不是热力学。对整族元素画出的这类图就是普拜图（Pourbaix图），用于[[electrochemistry/corrosion]]。
:::

$1.23\ \mathrm{V}$的宽度只是一个热力学陈述。实际上，氢和氧的析出需要额外的驱动电势（超电势），且强烈依赖电极材料——这就是水溶液的铅酸电池能维持$2.0\ \mathrm{V}$、而"水包盐"（water-in-salt）电解液能达到约$3\ \mathrm{V}$的原因；动力学理由见[[electrochemistry/electrode-kinetics]]，其后果见[[electrochemistry/batteries]]。

## 浓差电池与液接

电池可以在完全没有净化学反应的情况下产生电压。在**浓差电池**
$$
\mathrm{Ag(s)\,|\,AgNO_3(aq, b_\mathrm{L})\,\Vert\,AgNO_3(aq, b_\mathrm{R})\,|\,Ag(s)}
$$
中，电池反应是转移$\mathrm{Ag^+(R) \rightarrow Ag^+(L)}$，$E^\circ_\mathrm{cell} = 0$，$E = (RT/F)\ln(a_\mathrm{R}/a_\mathrm{L})$：稀释的吉布斯能以电压的形式出现。生物体就靠这类电池运转——神经细胞的静息电位是膜两侧对$\mathrm{K^+}$的浓差电池，对膜透过的离子大致是$(RT/F)\ln(c_\mathrm{out}/c_\mathrm{in})$。

两种不同电解质溶液相接之处，离子以不同速度越过界面扩散，快的离子跑到前面，建立起**液接电位**。盐酸与更稀的盐酸接触时，因为$\mathrm{H^+}$的迁移率约为$\mathrm{Cl^-}$的5倍，会产生几十毫伏的液接电位。充满浓氯化钾（或硝酸钾）溶液的**盐桥**把液接电位降到几毫伏，因为跨两个界面的传输由桥中离子主导，而$\mathrm{K^+}$与$\mathrm{Cl^-}$的迁移率几乎相等。带迁移数的理论见[[electrochemistry/conductivity]]。*没有*液接的电池——如哈内德（Harned）的电池——使用单一电解质和分别可逆于其两种离子的两个电极；只有这类电池的电势才是严格热力学意义的。

::: history 从伏特电堆到哈内德电池 {#hist-cells}
亚历山德罗·伏特（Alessandro Volta）在1800年写给英国皇家学会的信中描述了他用浸盐水的布隔开锌片与银（或铜）片叠成的电堆；它是第一个连续电流源，几周之内尼科尔森（Nicholson）与卡莱尔（Carlisle）就用它分解了水。约翰·弗雷德里克·丹尼尔（John Frederic Daniell）1836年的电池把铜放在硫酸铜中、锌放在稀酸中，中间隔以素烧瓷筒，为电报提供了稳定的电压，因为它避免了使伏特电堆极化的氢气泡。热力学解释花了半个世纪才出现：吉布斯的《关于多相物质平衡》（*On the Equilibrium of Heterogeneous Substances*，1876–1878）与亥姆霍兹1882年关于化学过程热力学的论文表明，电池电势量度的是反应的自由能而非热量，这正是[[#prop-temp]]的内容。能斯特1889年关于离子电动活度的论文，借助范特霍夫（van 't Hoff）的渗透压类比，给出了对浓度的对数依赖。路易斯（Lewis）1907年引入活度，使能斯特方程严格成立。哈内德与Ehlers对氢-氯化银电池的测量（*J. Am. Chem. Soc.*，1932–1933）把$E^\circ(\mathrm{AgCl/Ag})$定到了$0$–$60\,^\circ\mathrm{C}$，并使无液接电池成为测定活度系数、后来又成为pH标度的基准方法。
:::

## 后续内容

本课程后面的每一章都是对本章零电流平衡的偏离。下一章[[electrochemistry/conductivity]]追踪离子如何带着电流穿过电解质，并解释液接电位。[[electrochemistry/double-layer]]深入界面内部，看电化学势在那里如何平衡；[[electrochemistry/electrode-kinetics]]追问一旦流出电流，这种平衡以多快的速度恢复，使工作电池电压低于$E_\mathrm{cell}$；[[electrochemistry/voltammetry]]把电极表面的能斯特方程用作边界条件。电池电压与能量的热力学上限（[[electrochemistry/batteries]]）、电解的最低电压与燃料电池的效率极限（[[electrochemistry/fuel-cells-electrolysis]]）、以及腐蚀中的普拜图（[[electrochemistry/corrosion]]），都从[[#eq-dg]]与[[#eq-nernst]]出发。在分析化学中，同一个方程变成电位分析与pH测量（[[analytical-chemistry/electroanalytical]]）；在生物化学中，它给出为电子传递链排序的氧化还原电势（[[biochemistry/oxidative-phosphorylation]]）。

::: summary
- 电池电势是右端端子电势减左端，在零电流下测量，使每个界面都处于平衡；电池反应定义为右端还原，氢标度上$E_\mathrm{cell} = E_\mathrm{R} - E_\mathrm{L}$。
- 带电粒子按电化学势$\tilde\mu_i = \mu_i + z_iF\phi$达到平衡；由此、或由最大非膨胀功，$\Delta_\mathrm{r}G = -\nu FE_\mathrm{cell}$，且$\ln K = \nu FE^\circ/RT$（$25\,^\circ\mathrm{C}$下每电子每数量级59.16 mV）。
- 能斯特方程$E = E^\circ - (RT/\nu F)\ln Q$以活度成立；像$\mathrm{Pt|H_2|HCl|AgCl|Ag}$这样的无液接电池测$a_\pm$，并借外推到无限稀释得$E^\circ$。
- 温度系数给出$\Delta_\mathrm{r}S = \nu F(\partial E/\partial T)_p$、$\Delta_\mathrm{r}H = -\nu F[E - T(\partial E/\partial T)_p]$与$\Delta_\mathrm{r}C_p = \nu FT(\partial^2E/\partial T^2)_p$；电池的电功是$-\Delta_\mathrm{r}G$，不是$-\Delta_\mathrm{r}H$。
- 合并半反应电势要加$\nu E^\circ$而不是$E^\circ$；同一条规则把电势变成溶度积与歧化常数。
- 形式电势包含介质的活度系数与副平衡；质子耦合电对的电势每pH单位下降$59.16\,m/\nu$ mV，水只在$1.23\ \mathrm{V}$的窗口内热力学稳定。
- 液接会附加一个非热力学电位；浓KCl盐桥把它降到几毫伏。
:::

## 习题

::: exercise 锌-银电池 {level=1 check="-301.4"}
对$\mathrm{Zn(s)\,|\,Zn^{2+}(aq)\,\Vert\,Ag^+(aq)\,|\,Ag(s)}$，取$E^\circ(\mathrm{Ag^+/Ag}) = +0.800\ \mathrm{V}$、$E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.762\ \mathrm{V}$。写出电池反应，并求$25\,^\circ\mathrm{C}$下的$\Delta_\mathrm{r}G^\circ$。（$\Delta_\mathrm{r}G^\circ$以$\mathrm{kJ\,mol^{-1}}$为单位填写。）
::: solution
右端还原：$2\mathrm{Ag^+ + 2e^- \rightarrow 2Ag}$；左端氧化：$\mathrm{Zn \rightarrow Zn^{2+} + 2e^-}$。电池反应$\mathrm{Zn(s) + 2Ag^+(aq) \rightarrow Zn^{2+}(aq) + 2Ag(s)}$，$\nu = 2$。$E^\circ_\mathrm{cell} = 0.800 - (-0.762) = 1.562\ \mathrm{V}$——尽管有两个银离子反应，银的电势并*不*加倍。$\Delta_\mathrm{r}G^\circ = -2\times96\,485\times1.562\ \mathrm{J\,mol^{-1}} = -301.4\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 非标准状态的丹尼尔电池 {level=1 check="1.043"}
求$25\,^\circ\mathrm{C}$下$a(\mathrm{Zn^{2+}}) = 0.10$、$a(\mathrm{Cu^{2+}}) = 0.0010$时丹尼尔电池（$E^\circ = 1.102\ \mathrm{V}$）的电势。（$E_\mathrm{cell}$以V为单位填写。）
::: solution
$Q = a(\mathrm{Zn^{2+}})/a(\mathrm{Cu^{2+}}) = 0.10/0.0010 = 100$，$\nu = 2$，故
$$
E = 1.102\ \mathrm{V} - \frac{0.025693\ \mathrm{V}}{2}\ln 100 = 1.102 - 0.0592 = 1.043\ \mathrm{V}.
$$
两个电子、$Q$两个数量级，代价是一个"59 mV"。
:::
:::

::: exercise 由电势求平衡常数 {level=1 check="20.96"}
对$\mathrm{Sn^{2+}(aq) + 2Fe^{3+}(aq) \rightarrow Sn^{4+}(aq) + 2Fe^{2+}(aq)}$，已知$E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.771\ \mathrm{V}$、$E^\circ(\mathrm{Sn^{4+}/Sn^{2+}}) = 0.151\ \mathrm{V}$，求$25\,^\circ\mathrm{C}$下的$\log K$。（填写$\log_{10}K$。）
::: solution
电子相消，$\nu = 2$：$E^\circ = 0.771 - 0.151 = 0.620\ \mathrm{V}$。于是$\log K = \nu E^\circ/0.05916\ \mathrm{V} = 2\times0.620/0.05916 = 20.96$，$K = 9\times10^{20}$。锡(II)能量子地还原铁(III)，这就是重铬酸钾滴定预还原铁时用它的原因。
:::
:::

::: exercise 韦斯顿标准电池 {level=2 check="-198.9"}
韦斯顿电池$\mathrm{Cd(Hg)\,|\,CdSO_4(sat)\,|\,Hg_2SO_4(s)\,|\,Hg(l)}$的电池反应为$\mathrm{Cd(Hg) + Hg_2SO_4(s) + \tfrac{8}{3}H_2O(l) \rightarrow CdSO_4\cdot\tfrac{8}{3}H_2O(s) + 2Hg(l)}$，$\nu = 2$。$20\,^\circ\mathrm{C}$下其电势为$1.01864\ \mathrm{V}$，温度系数为$-4.06\times10^{-5}\ \mathrm{V\,K^{-1}}$。求$\Delta_\mathrm{r}S$与$\Delta_\mathrm{r}H$。（$\Delta_\mathrm{r}H$以$\mathrm{kJ\,mol^{-1}}$为单位填写。）
::: solution
$\Delta_\mathrm{r}S = \nu F(\partial E/\partial T)_p = 2\times96\,485\times(-4.06\times10^{-5}) = -7.83\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
$$
\Delta_\mathrm{r}H = -\nu F\left[E - T\frac{\partial E}{\partial T}\right] = -2\times96\,485\times\left[1.01864 + 293.15\times4.06\times10^{-5}\right]\ \mathrm{J\,mol^{-1}} = -198.9\ \mathrm{kJ\,mol^{-1}} .
$$
极小的温度系数——每开尔文$41\ \mu\mathrm{V}$——使韦斯顿电池从1911年直到被约瑟夫森效应取代之前一直是国际电压基准；$\Delta_\mathrm{r}S$小正是优良标准电池的热力学要求。
:::
:::

::: exercise 一个浓差电池 {level=2 check="53.8"}
忽略液接电位，求$25\,^\circ\mathrm{C}$下$\mathrm{Ag\,|\,AgNO_3(0.010\ mol\,kg^{-1})\,\Vert\,AgNO_3(0.100\ mol\,kg^{-1})\,|\,Ag}$的电势，两溶液中$\gamma_\pm$分别取$0.90$与$0.73$，并取$\gamma_{\mathrm{Ag^+}} = \gamma_\pm$。（$E$以mV为单位填写。）
::: solution
电池反应：$\mathrm{Ag^+(R) \rightarrow Ag^+(L)}$，$\nu = 1$，$E^\circ = 0$。$a_\mathrm{R} = 0.73\times0.100 = 0.073$，$a_\mathrm{L} = 0.90\times0.010 = 0.0090$。
$$
E = \frac{RT}{F}\ln\frac{a_\mathrm{R}}{a_\mathrm{L}} = 25.693\ \mathrm{mV}\times\ln\frac{0.073}{0.0090} = 25.693\times2.093\ \mathrm{mV} = 53.8\ \mathrm{mV}.
$$
若只用浓度，答案将是$59.2\ \mathrm{mV}$。假设$\gamma_{\mathrm{Ag^+}} = \gamma_\pm$是一个非热力学的约定；严格说来，忽略液接也是如此——这就是带迁移的浓差电池要与迁移数放在一起分析的原因。
:::
:::

::: exercise 铜(I)的歧化 {level=2 check="0.527"}
已知$E^\circ(\mathrm{Cu^{2+}/Cu}) = 0.340\ \mathrm{V}$、$E^\circ(\mathrm{Cu^{2+}/Cu^+}) = 0.153\ \mathrm{V}$，求$E^\circ(\mathrm{Cu^+/Cu})$以及$25\,^\circ\mathrm{C}$下$2\mathrm{Cu^+(aq) \rightleftharpoons Cu^{2+}(aq) + Cu(s)}$的平衡常数。（$E^\circ(\mathrm{Cu^+/Cu})$以V为单位填写。）
::: solution
$\mathrm{Cu^{2+} + 2e^- \rightarrow Cu}$是$\mathrm{Cu^{2+} + e^- \rightarrow Cu^+}$与$\mathrm{Cu^+ + e^- \rightarrow Cu}$之和，故由[[#eq-combine]]，$2(0.340) = 1(0.153) + 1\cdot E^\circ(\mathrm{Cu^+/Cu})$，$E^\circ(\mathrm{Cu^+/Cu}) = 0.680 - 0.153 = 0.527\ \mathrm{V}$。歧化反应是$\mathrm{Cu^+/Cu}$减$\mathrm{Cu^{2+}/Cu^+}$，$\nu = 1$：$E^\circ = 0.527 - 0.153 = 0.374\ \mathrm{V}$，$K = \exp(0.374/0.025693) = 2.1\times10^{6}$。简单铜(I)盐在水中都会歧化，除非铜(I)被配位或沉淀（如$\mathrm{CuCl}$、$\mathrm{CuI}$）稳定住。
:::
:::

::: exercise 中性水中的氧 {level=3 check="0.805"}
求$25\,^\circ\mathrm{C}$、空气饱和的水（$p(\mathrm{O_2}) = 0.21\ \mathrm{bar}$）、pH 7.00下氧电极$\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$（$E^\circ = 1.229\ \mathrm{V}$）的平衡电势。然后解释为什么这个数就是中性水中铁腐蚀的热力学驱动力。（$E$以"对SHE的V"为单位填写。）
::: hint
把$Q = 1/[(p_{\mathrm{O_2}}/p^\circ)\,a_{\mathrm{H^+}}^4]$写出来，把pH项分离出来。
:::
::: solution
$$
E = E^\circ - \frac{0.05916\ \mathrm{V}}{4}\log\frac{1}{(p_{\mathrm{O_2}}/p^\circ)\,a_{\mathrm{H^+}}^{4}} = 1.229 + \frac{0.05916}{4}\log 0.21 - 0.05916\,\mathrm{pH} = 1.229 - 0.0100 - 0.4141 = 0.805\ \mathrm{V}.
$$
氧气分压影响不大（五分之一巴只值$10\ \mathrm{mV}$）；pH影响极大。电对$\mathrm{Fe^{2+}/Fe}$在$-0.45\ \mathrm{V}$附近（在天然水那种微摩尔铁浓度下更低），所以"铁 | 水 | 氧"电池的电势超过$1.2\ \mathrm{V}$，$2\mathrm{Fe} + \mathrm{O_2} + 4\mathrm{H^+} \rightarrow 2\mathrm{Fe^{2+}} + 2\mathrm{H_2O}$的$\Delta_\mathrm{r}G$强烈为负。因此腐蚀总是热力学有利的；腐蚀快不快则是[[electrochemistry/corrosion]]的问题。
:::
:::

::: exercise 由三次拟合求反应热容 {level=3 check="-171.5"}
Bates与Bower（1954）在0到$95\,^\circ\mathrm{C}$之间用下式表示$E^\circ(\mathrm{AgCl/Ag})$：
$$
E^\circ/\mathrm{V} = 0.23659 - 4.8564\times10^{-4}\,t - 3.4205\times10^{-6}\,t^2 + 5.869\times10^{-9}\,t^3 ,
$$
$t$为摄氏温度。由[[#eq-temp]]推导$\tfrac{1}{2}\mathrm{H_2 + AgCl \rightarrow Ag + H^+ + Cl^-}$的$\Delta_\mathrm{r}C_p^\circ$，在$25\,^\circ\mathrm{C}$求值，并评论其大小。（$\Delta_\mathrm{r}C_p^\circ$以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位填写。）
::: hint
$\mathrm{d}t = \mathrm{d}T$，所以对$t$与对$T$的导数相等；但$\Delta_\mathrm{r}C_p = \nu FT\,\partial^2E/\partial T^2$中的因子$T$是热力学温度。
:::
::: solution
求二阶导数：$\mathrm{d}^2E^\circ/\mathrm{d}t^2 = -2(3.4205\times10^{-6}) + 6(5.869\times10^{-9})t\ \mathrm{V\,K^{-2}}$。$t = 25$时：$-6.841\times10^{-6} + 8.80\times10^{-7} = -5.961\times10^{-6}\ \mathrm{V\,K^{-2}}$。（顺便校核一阶导数：$-4.8564\times10^{-4} - 1.710\times10^{-4} + 1.10\times10^{-5} = -6.457\times10^{-4}\ \mathrm{V\,K^{-1}}$，即[[#ex-temp]]中使用的值。）取$\nu = 1$、$T = 298.15\ \mathrm{K}$：
$$
\Delta_\mathrm{r}C_p^\circ = FT\frac{\partial^2E^\circ}{\partial T^2} = 96\,485\times298.15\times(-5.961\times10^{-6})\ \mathrm{J\,K^{-1}\,mol^{-1}} = -171.5\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
量热表列值约为$-176\ \mathrm{J\,K^{-1}\,mol^{-1}}$，主要来自$\mathrm{Cl^-(aq)}$很大的负偏摩尔热容（$-136\ \mathrm{J\,K^{-1}\,mol^{-1}}$）：生成离子会*降低*热容，因为离子有序化的水化层随温度升高不再那么容易"熔化"。电压的一个二阶导数竟能把热容复现到百分之几，既说明电池测量何等精密——也说明二阶导数对拟合函数形式的形式何等敏感。
:::
:::

::: exercise 由电压表测活度系数 {level=3 check="0.796"}
电池$\mathrm{Pt\,|\,H_2(1\ bar)\,|\,HCl(0.100\ mol\,kg^{-1})\,|\,AgCl\,|\,Ag}$在$25\,^\circ\mathrm{C}$下$E = 0.35237\ \mathrm{V}$。已知$E^\circ = 0.22233\ \mathrm{V}$，求$\gamma_\pm(\mathrm{HCl})$，并与戴维斯方程$\log\gamma_\pm = -0.509\left(\sqrt{I}/(1 + \sqrt{I}) - 0.30I\right)$比较。（填写由电池得到的$\gamma_\pm$。）
::: solution
由[[#ex-harned-cell]]，$E = E^\circ - (2RT/F)\ln(\gamma_\pm b/b^\circ)$，故
$$
\ln(\gamma_\pm b/b^\circ) = \frac{E^\circ - E}{2RT/F} = \frac{0.22233 - 0.35237}{0.051386} = -2.5307,
$$
$\gamma_\pm b/b^\circ = 0.07962$，$\gamma_\pm = 0.796$。戴维斯方程取$I = 0.100$：$\sqrt{I} = 0.3162$，$\log\gamma_\pm = -0.509(0.2403 - 0.0300) = -0.1070$，$\gamma_\pm = 0.782$。戴维斯方程低估不到$2\,\%$——对$I = 0.1$处一个不含自由参数的公式已经不错——而精确到$0.01\ \mathrm{mV}$的电池可把$\gamma_\pm$定到约$0.02\,\%$。$E$上$1\ \mathrm{mV}$的误差就会使$\gamma_\pm$改变$2\,\%$，所以恒温槽与纯氢至关重要。
:::
:::
