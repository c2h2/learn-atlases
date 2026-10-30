在$1000\ \mathrm{K}$、$1\ \mathrm{bar}$下，大约每一百个碘分子就有一个解离成原子；在$1500\ \mathrm{K}$下，超过一半都是原子。经典热力学能把这些事实彼此联系起来——给定$\Delta_\mathrm{r}H^\circ$与$\Delta_\mathrm{r}S^\circ$，它就能预言任意温度下的平衡常数（[[thermodynamics/reaction-equilibrium]]）——却从头算不出其中任何一个数：热力学数据必须来自量热或测得的平衡。统计热力学可以。只要给出碘原子的质量、$\mathrm{I_2}$的键长与振动波数、原子的基态简并度、分子的解离能——全部可由光谱获得——它就直接算出平衡常数。对小分子气体，这个结果可靠到JANAF表一类列表热力学函数是**计算**出来的而非测出来的。

本课由分子配分函数导出平衡常数的表达式，并把它用于三类平衡——它们合起来展现了全部物理：同一分子两种构型之间的平衡（构象异构体），结果约化为布居的玻尔兹曼比；双原子分子的解离，高温下平动压倒键能；同位素交换，反应能几乎为零，平衡常数由对称数与零点能支配。沿途我们将逐个分子地看清，一个反应的"焓"与"熵"究竟是什么意思。

## 用配分函数表示平衡常数

理想气体间反应$0 = \sum_J\nu_J\mathrm{J}$的热力学平衡常数为$K = \prod_J(p_J/p^\circ)^{\nu_J}$，与标准反应吉布斯自由能的关系是$\Delta_\mathrm{r}G^\circ = -RT\ln K$（[[thermodynamics/reaction-equilibrium]]）。我们在[[statistical-thermodynamics/canonical-ensemble]]中求得了理想气体的标准摩尔吉布斯自由能$G^\circ_\mathrm{m} = G^\circ_\mathrm{m}(0) - RT\ln(q^\circ_\mathrm{m}/N_\mathrm{A})$。把两者结合起来就几乎做完了一切——只是不同分子的能量零点如今必须放到共同的标尺上。

::: definition 标准摩尔配分函数与$T = 0$时的反应能 {#def-e0}
物种J的**标准摩尔配分函数**$q^\circ_{J,\mathrm{m}}$，是其分子配分函数在体积$V^\circ_\mathrm{m} = RT/p^\circ$下取值再除以一摩尔，且所有能量都从分子的最低状态量起；于是$q^\circ_{J,\mathrm{m}}/N_\mathrm{A}$就是在标准压力下每个分子占有体积$k_\mathrm{B}T/p^\circ$中的分子配分函数。**$T = 0$时的反应能**
$$
\Delta_\mathrm{r}E_0 = \sum_J\nu_JE_{0,J} ,
$$
是产物与反应物最低状态的摩尔能量之差，从共同零点量起。它包含零点振动能。对解离$\mathrm{AB} \rightarrow \mathrm{A} + \mathrm{B}$，$\Delta_\mathrm{r}E_0 = N_\mathrm{A}D_0$，其中$D_0$是从振动基态量起的光谱解离能，不是势阱深度$D_\mathrm{e}$。
:::

::: proposition 由配分函数求平衡常数 {#prop-k}
对理想气体间的反应$0 = \sum_J\nu_J\mathrm{J}$，
$$
K = \prod_J\left(\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}}\right)^{\nu_J}e^{-\Delta_\mathrm{r}E_0/RT} .
$$ {#eq-k}
例如，对$\mathrm{a\,A} + \mathrm{b\,B} \rightleftharpoons \mathrm{c\,C} + \mathrm{d\,D}$，
$$
K = \frac{(q^\circ_{\mathrm{C,m}}/N_\mathrm{A})^{c}(q^\circ_{\mathrm{D,m}}/N_\mathrm{A})^{d}}{(q^\circ_{\mathrm{A,m}}/N_\mathrm{A})^{a}(q^\circ_{\mathrm{B,m}}/N_\mathrm{A})^{b}}\,e^{-\Delta_\mathrm{r}E_0/RT} .
$$
:::

::: proof
对每个物种，能量从它自己的最低状态量起时，[[statistical-thermodynamics/canonical-ensemble#eq-g-standard]]给出$G^\circ_{J,\mathrm{m}} = G^\circ_{J,\mathrm{m}}(0) - RT\ln(q^\circ_{J,\mathrm{m}}/N_\mathrm{A})$。$T = 0$时吉布斯自由能等于热力学能，所以在共同标尺上$G^\circ_{J,\mathrm{m}}(0) = E_{0,J}$，即J的最低状态的摩尔能量。于是
$$
\Delta_\mathrm{r}G^\circ = \sum_J\nu_JG^\circ_{J,\mathrm{m}} = \sum_J\nu_JE_{0,J} - RT\sum_J\nu_J\ln\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}} = \Delta_\mathrm{r}E_0 - RT\ln\prod_J\left(\frac{q^\circ_{J,\mathrm{m}}}{N_\mathrm{A}}\right)^{\nu_J} .
$$
令其等于$-RT\ln K$并取指数，即得式[[#eq-k]]。
:::

式[[#eq-k]]结构透明。指数项是能量因子：位置高于反应物的产物（$\Delta_\mathrm{r}E_0 > 0$）被玻尔兹曼因子压低。配分函数之比是一个**状态计数因子**：反应某一边每个分子可及的状态越多，就越受青睐，无论其能量如何。这两个因子就是反应焓与反应熵的分子形式；高温下状态计数因子通常获胜，这就是为什么吸热的解离反应在气体足够热时会进行到底。

::: warning 共同零点、标准态与对称数 {#warn-k}
三处疏漏会毁掉用式[[#eq-k]]做的计算。(i) *能量零点。*每个$q$都用自己的最低状态（振动能从零点能级量起）计算；共同零点只通过$\Delta_\mathrm{r}E_0$进入，而它必须是$D_0$而不是$D_\mathrm{e}$。对以零点为基准的配分函数使用$D_\mathrm{e}$（比零点能大），等于把零点能重复计算了一遍。(ii) *标准态。*$q^\circ_\mathrm{m}/N_\mathrm{A}$含有$V = k_\mathrm{B}T/p^\circ$，其中$p^\circ = 1\ \mathrm{bar} = 10^{5}\ \mathrm{Pa}$；对$\sum_J\nu_J \ne 0$的反应，改用$1\ \mathrm{atm}$或浓度标准态都会改变$K$。(iii) *对称数与简并度。*$\mathrm{I_2}$与$\mathrm{H_2}$的$\sigma = 2$、碘原子的$g = 4$，会分别把$K$改变$2$倍与$16$倍；它们不是可有可无的精修。
:::

## 同一分子两种构型之间的平衡

最简单的应用是两种质量相同的异构体或构象异构体之间的平衡$\mathrm{A} \rightleftharpoons \mathrm{B}$。此时平动配分函数完全相同而相消，体积与$N_\mathrm{A}$也一样相消：
$$
K = \frac{q_\mathrm{B}^\text{int}}{q_\mathrm{A}^\text{int}}\,e^{-\Delta_\mathrm{r}E_0/RT} .
$$ {#eq-k-isomer}
若每种构型只有一个相关状态（或几个简并态，$g_\mathrm{A}$与$g_\mathrm{B}$），则$K = (g_\mathrm{B}/g_\mathrm{A})e^{-\Delta E/RT}$：平衡常数就是两组状态布居之比——[[statistical-thermodynamics/boltzmann-distribution]]中的玻尔兹曼分布应用于一个化学变化。

::: proposition 平衡作为布居比 {#prop-population}
设一个分子具有能量为$\varepsilon_i$（共同标尺）的状态$i$，分成两组：属于构型A的与属于构型B的。则$\mathrm{A} \rightleftharpoons \mathrm{B}$的平衡常数是两组的部分配分函数之比，
$$
K = \frac{\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i}}{\sum_{i\in\mathrm{A}}e^{-\beta\varepsilon_i}} = \frac{N_\mathrm{B}}{N_\mathrm{A}} ,
$$
把每个和式写成$e^{-\beta\varepsilon_{0}}$（其最低能量）乘以从该能量量起的配分函数之后，上式与式[[#eq-k-isomer]]完全相同。
:::

::: proof
分子的全体是单一物种，在*所有*状态——A型的与B型的——上服从同一个玻尔兹曼分布。B组中的分子数为$N\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i}/q$，A组中为$N\sum_{i\in\mathrm{A}}e^{-\beta\varepsilon_i}/q$；二者之比即所述的$K$（对异构化，$K = p_\mathrm{B}/p_\mathrm{A} = N_\mathrm{B}/N_\mathrm{A}$）。把$\sum_{i\in\mathrm{B}}e^{-\beta\varepsilon_i} = e^{-\beta\varepsilon_{0,\mathrm{B}}}q_\mathrm{B}$写出，对A同理，即得$K = (q_\mathrm{B}/q_\mathrm{A})e^{-\beta(\varepsilon_{0,\mathrm{B}} - \varepsilon_{0,\mathrm{A}})}$，正是按分子计的式[[#eq-k-isomer]]。
:::

这个观点使化学平衡变得直观：处于平衡的分子只是在遍历自己的全部状态，而$K$报告它把多少时间花在我们选定称为"B"的那些状态中。一种构型获胜，要么因为能量更低，要么因为状态更多——更多的低频振动、更多简并的取向、更多的构象自由度。

::: example 丁烷的构象异构体 {#ex-butane}
丁烷中，绕中心C–C键旋转给出一个*反式*（anti）构象和两个互为镜像的*旁式*（gauche）构象；旁式构象比反式高约$3.8\ \mathrm{kJ\,mol^{-1}}$。把两种构象的振动与转动配分函数视为相等，求$298\ \mathrm{K}$与$500\ \mathrm{K}$下旁式构象的平衡分数。
::: solution
对反式 ⇌ 旁式，取$g_\text{gauche} = 2$，$g_\text{anti} = 1$，
$$
K = 2\,e^{-\Delta E/RT} = 2\exp\!\left(-\frac{3800}{8.3145\times298.15}\right) = 2\times0.2160 = 0.432 ,
$$
故旁式分数为$K/(1 + K) = 0.302$。$500\ \mathrm{K}$时$K = 2e^{-0.914} = 0.802$，分数为$0.445$，趋近高温极限$2/3$，即两个旁式"状态"对总共三个状态的纯统计之比。因子2是一份反应熵，$\Delta_\mathrm{r}S^\circ = R\ln 2 = 5.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$，完全来自计数。（实际上旁式构型还有略微不同的低频振动；这类修正正是计算构象搜索所评估的内容，[[computational-chemistry/molecular-mechanics]]。）
:::
:::

::: widget plot
f: g*exp(-e*1000/(8.314*x))/(1 + g*exp(-e*1000/(8.314*x))); g/(1 + g)
x: 50, 1500
y: 0, 1
sliders: e=3.8:-10:20:0.1; g=2:1:6:1
labels: \text{B 所占分数}; \text{高温极限 } g/(1+g)
caption: 平衡$\mathrm{A} \rightleftharpoons \mathrm{B}$中较高能量构型B的平衡分数对$T$（单位K）的曲线，其中B比A高`e`千焦每摩尔、状态数是A的`g`倍。取起始值（丁烷的旁式/反式）时，分数从零升至$2/3$。把`e`设为负值：B在能量*与*状态两方面都占优，分数从上方趋近$g/(1+g)$。把`e`设为零，则平衡在任何温度下都是纯熵的。
:::

## 解离：平动获胜之时

对$\mathrm{X_2(g)} \rightleftharpoons 2\,\mathrm{X(g)}$，式[[#eq-k]]化为
$$
K = \frac{(q^\circ_{\mathrm{X,m}}/N_\mathrm{A})^{2}}{q^\circ_{\mathrm{X_2,m}}/N_\mathrm{A}}\,e^{-D_0/k_\mathrm{B}T} .
$$ {#eq-k-diss}
能量因子微乎其微——键能是$k_\mathrm{B}T$的许多倍——但状态计数因子大得惊人，因为高温下两个原子拥有*两套*量级为$10^{9}$的平动状态，而分子只有一套（再加转动与振动）。由于$q^\mathrm{T}$按$T^{5/2}$增长（$\Lambda^{-3}$贡献$T^{3/2}$，标准体积$k_\mathrm{B}T/p^\circ$贡献$T$），解离在足够高的温度下总是获胜。

::: example 碘在1000 K时的解离 {#ex-iodine}
计算$1000\ \mathrm{K}$下$\mathrm{I_2(g)} \rightleftharpoons 2\,\mathrm{I(g)}$的$K$。数据：$M(\mathrm{I}) = 126.904\ \mathrm{g\,mol^{-1}}$；$\mathrm{I_2}$：$\tilde\nu = 214.5\ \mathrm{cm^{-1}}$，$B = 0.0374\ \mathrm{cm^{-1}}$，$D_0 = 12\,440\ \mathrm{cm^{-1}}$（$148.8\ \mathrm{kJ\,mol^{-1}}$），基态$^{1}\Sigma_\mathrm{g}^{+}$；碘原子的基谱项为$^{2}\mathrm{P}_{3/2}$（$g = 4$），其$^{2}\mathrm{P}_{1/2}$能级高$7603\ \mathrm{cm^{-1}}$。
::: solution
在体积$V = k_\mathrm{B}T/p^\circ = 1.3807\times10^{-25}\ \mathrm{m^{3}}$中计算分子配分函数。

**碘原子。**$\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2} = 4.901\times10^{-12}\ \mathrm{m}$，故$q^\mathrm{T} = V/\Lambda^{3} = 1.173\times10^{9}$。电子：$g = 4$（激发能级贡献$2e^{-c_2\times7603/1000} = 3.6\times10^{-5}$，可忽略）。于是$q^\circ_{\mathrm{I,m}}/N_\mathrm{A} = 4.692\times10^{9}$。

**碘分子。**质量加倍：$q^\mathrm{T} = 1.173\times10^{9}\times2^{3/2} = 3.318\times10^{9}$。转动（$\sigma = 2$）：$q^\mathrm{R} = T/(2\theta_\mathrm{R}) = 1000/(2\times1.438\,78\times0.0374) = 9.29\times10^{3}$。振动：$\theta_\mathrm{V} = 308.6\ \mathrm{K}$，$q^\mathrm{V} = 1/(1 - e^{-0.3086}) = 3.77$。电子：1。于是$q^\circ_{\mathrm{I_2,m}}/N_\mathrm{A} = 3.318\times10^{9}\times9.29\times10^{3}\times3.77 = 1.162\times10^{14}$。

**能量因子。**$D_0/k_\mathrm{B}T = c_2\tilde D_0/T = 1.438\,78\times12\,440/1000 = 17.90$，故$e^{-17.90} = 1.69\times10^{-8}$。

代入式[[#eq-k-diss]]：
$$
K = \frac{(4.692\times10^{9})^{2}}{1.162\times10^{14}}\times1.69\times10^{-8} = 1.895\times10^{5}\times1.69\times10^{-8} = 3.2\times10^{-3} .
$$
状态计数因子$1.9\times10^{5}$抵消了$6\times10^{7}$能量惩罚的大部分。由$p(\mathrm{I})^{2}/p(\mathrm{I_2})p^\circ = K$及总压$1\ \mathrm{bar}$，解离度$\alpha$满足$4\alpha^{2}/(1 - \alpha^{2}) = K$，解得$\alpha = 0.028$：约$3\,\%$的分子已解离。仅原子简并度一项就给出有利于原子的因子$4^{2} = 16$。
:::
:::

::: widget plot
f: log10(22.564*x^1.5*(1 - exp(-308.6/x))*exp(-17898/x))
x: 500, 2000
y: -12, 2
hlines: 0
labels: \log_{10}K
caption: $\mathrm{I_2(g)} \rightleftharpoons 2\,\mathrm{I(g)}$的$\log_{10}K$对$T$（单位K）的曲线，由式[[#eq-k-diss]]与[[#ex-iodine]]的数据算出。温度依赖为$K \propto T^{3/2}(1 - e^{-\theta_\mathrm{V}/T})e^{-D_0/k_\mathrm{B}T}$：平动与转动配分函数贡献$T^{5/2}\times T^{5/2}/(T^{5/2}\times T) = T^{3/2}$。$K$在$1450\ \mathrm{K}$附近经过1，高于该温度时标准压力下原子占优；陡峭的上升来自玻尔兹曼因子，低温端的弯曲来自缓慢的幂律。
:::

### 温度依赖与范特霍夫方程

式[[#eq-k]]本身包含它自己的范特霍夫方程。对$\ln K$关于$T$求导，并对理想气体用$RT^{2}\,\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})/\mathrm{d}T = H^\circ_\mathrm{m} - H^\circ_\mathrm{m}(0)$（$V^\circ_\mathrm{m} = RT/p^\circ$对$T$的依赖提供了把$U$化成$H$所需的额外$RT$），得
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{r}E_0 + \sum_J\nu_J\left[H^\circ_{J,\mathrm{m}}(T) - H^\circ_{J,\mathrm{m}}(0)\right]}{RT^{2}} = \frac{\Delta_\mathrm{r}H^\circ(T)}{RT^{2}},
$$
即[[thermodynamics/reaction-equilibrium]]的范特霍夫方程，只是反应焓如今由其分子成分搭建而成。对$1000\ \mathrm{K}$下碘的解离，两个原子的$2\times\tfrac{5}{2}RT$减去分子的$(\tfrac{7}{2}RT - \text{很小的振动欠缺})$，在$D_0$之上再加$5.4\ \mathrm{kJ\,mol^{-1}}$，得$\Delta_\mathrm{r}H^\circ(1000\ \mathrm{K}) = 154\ \mathrm{kJ\,mol^{-1}}$，与对图中曲线作数值微分所得相同。

::: example 反应熵的分子解剖 {#ex-iodine-entropy}
对$1000\ \mathrm{K}$下的$\mathrm{I_2(g)} \rightarrow 2\,\mathrm{I(g)}$，用$K = 3.19\times10^{-3}$与$\Delta_\mathrm{r}H^\circ = 154.2\ \mathrm{kJ\,mol^{-1}}$求$\Delta_\mathrm{r}G^\circ$与$\Delta_\mathrm{r}S^\circ$。然后把$\Delta_\mathrm{r}S^\circ$分解为平动、转动、振动与电子贡献，平动用$S_\mathrm{m} = U_\mathrm{m}/T + R\ln(q/N)+R$，每个内部运动模式用$S_\mathrm{m} = U_\mathrm{m}/T + R\ln q$。
::: solution
$\Delta_\mathrm{r}G^\circ = -RT\ln K = -8.3145\times1000\times\ln(3.19\times10^{-3}) = +47.8\ \mathrm{kJ\,mol^{-1}}$，且
$$
\Delta_\mathrm{r}S^\circ = \frac{\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ}{T} = \frac{154.2 - 47.8}{1000}\ \mathrm{kJ\,K^{-1}\,mol^{-1}} = +106\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
按模式逐个计算，配分函数取[[#ex-iodine]]中的值：

- *平动。*$S^\mathrm{T}_\mathrm{m} = R[\ln(q^\circ_\mathrm{m}/N_\mathrm{A}) + \tfrac{5}{2}]$对I给出$194.4$，对$\mathrm{I_2}$给出$203.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$；反应净得$2\times194.4 - 203.1 = +185.8$。
- $\mathrm{I_2}$的*转动*被毁掉：$S^\mathrm{R}_\mathrm{m} = R(1 + \ln 9293) = 84.3$，贡献$-84.3$。
- $\mathrm{I_2}$的*振动*被毁掉：$x = 0.3086$时$S^\mathrm{V}_\mathrm{m} = R[x/(e^{x}-1) - \ln(1 - e^{-x})]$给出$18.1$，贡献$-18.1$。
- *电子*：两个$g = 4$的原子净得$2R\ln 4 = +23.1$。

总和$185.8 - 84.3 - 18.1 + 23.1 = 106.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$，再现了热力学值。解离熵是一个*平动*效应：一个自由粒子变成两个，每个新粒子带来约$10^{9}$个平动状态。被毁掉的分子转动与振动拿回的增益不到其一半。
:::
:::

## 同位素交换：对称性与零点能

当反应物与产物在化学上几乎全同时，能量因子几乎消失，平衡常数由配分函数之间的细微差异支配。同位素交换平衡是经典范例。

::: example 平衡 H₂ + D₂ ⇌ 2HD {#ex-hd}
计算$298.15\ \mathrm{K}$下$\mathrm{H_2(g)} + \mathrm{D_2(g)} \rightleftharpoons 2\,\mathrm{HD(g)}$的$K$。数据（Huber与Herzberg）：质量$2.0157$、$3.0219$、$4.0282\ \mathrm{g\,mol^{-1}}$；转动常数$60.853$、$45.655$、$30.444\ \mathrm{cm^{-1}}$；$\mathrm{H_2}$、$\mathrm{HD}$、$\mathrm{D_2}$的零点能$2170.3$、$1883.7$、$1542.3\ \mathrm{cm^{-1}}$（由$\omega_\mathrm{e}/2 - \omega_\mathrm{e}x_\mathrm{e}/4$得出）。三个分子具有相同的势能曲线（玻恩–奥本海默近似）与非简并的电子基态。
::: solution
分子数不变，故$V$与$N_\mathrm{A}$相消，
$$
K = \frac{(q^\mathrm{T}_\mathrm{HD})^{2}}{q^\mathrm{T}_\mathrm{H_2}q^\mathrm{T}_\mathrm{D_2}}\cdot\frac{(q^\mathrm{R}_\mathrm{HD})^{2}}{q^\mathrm{R}_\mathrm{H_2}q^\mathrm{R}_\mathrm{D_2}}\cdot\frac{(q^\mathrm{V}_\mathrm{HD})^{2}}{q^\mathrm{V}_\mathrm{H_2}q^\mathrm{V}_\mathrm{D_2}}\cdot e^{-\Delta_\mathrm{r}E_0/RT} .
$$
**平动。**$q^\mathrm{T} \propto m^{3/2}$：$\left(3.0219^{2}/(2.0157\times4.0282)\right)^{3/2} = 1.193$。

**转动。**$q^\mathrm{R} = T/\sigma\theta_\mathrm{R} \propto 1/\sigma B$，$\mathrm{H_2}$与$\mathrm{D_2}$的$\sigma = 2$，HD的$\sigma = 1$：$\dfrac{(1/45.655)^{2}}{(1/2\times60.853)(1/2\times30.444)} = \dfrac{4\times60.853\times30.444}{45.655^{2}} = 3.555$。（$298\ \mathrm{K}$下高温式对$\mathrm{H_2}$只是近似，但在比值中误差大部分相消。）

**振动。**$298\ \mathrm{K}$下三个$q^\mathrm{V}$都在$10^{-6}$以内等于1：比值为1。

**能量。**$\Delta_\mathrm{r}E_0 = 2\times1883.7 - 2170.3 - 1542.3 = 54.8\ \mathrm{cm^{-1}}$（电子能量相消），故$e^{-\Delta_\mathrm{r}E_0/RT} = e^{-1.438\,78\times54.8/298.15} = e^{-0.264} = 0.768$。

因此
$$
K = 1.193\times3.555\times1\times0.768 = 3.26 ,
$$
与约$3.3$的实测值相符。对称数给出因子$4$；质量与转动惯量再添上一点；而零点能——它有利于"分居"的$\mathrm{H_2}$与$\mathrm{D_2}$（零点能对约化质量不是线性的）——又拿回一些。
:::
:::

这一平衡的高温极限很有教益。当$T\to\infty$时，能量因子趋于1，振动配分函数变为经典的$q^\mathrm{V}\to T/\theta_\mathrm{V} \propto \mu^{1/2}$。在经典极限下，质量在平动、转动、振动各因子的乘积中精确相消（特勒–雷德利奇乘积规则的推论），只剩对称数：$K\to\sigma_{\mathrm{H_2}}\sigma_{\mathrm{D_2}}/\sigma_{\mathrm{HD}}^{2} = 4$。这不过是随机配对H与D原子的统计结果：H与D数目相等的随机混合物中$\mathrm{H_2} : \mathrm{HD} : \mathrm{D_2} = 1 : 2 : 1$，而$2^{2}/(1\times1) = 4$。全部的化学——低温下$K$对4的偏离——都是量子力学的，源自零点能与量子化的转动。

::: widget plot
f: 1.19279*3.55522*(1 - exp(-1.43878*4158.5/x))*(1 - exp(-1.43878*2991.9/x))/(1 - exp(-1.43878*3629.9/x))^2*exp(-78.79/x); 4
x: 50, 3000
y: 0, 4.5
labels: K; \text{经典极限 } 4
caption: $\mathrm{H_2} + \mathrm{D_2} \rightleftharpoons 2\,\mathrm{HD}$的平衡常数对$T$（单位K）的曲线，由[[#ex-hd]]的配分函数算出（振动基频$4158.5$、$3629.9$、$2991.9\ \mathrm{cm^{-1}}$，$\Delta_\mathrm{r}E_0 = 54.8\ \mathrm{cm^{-1}} = 78.8\ \mathrm{K}\times k_\mathrm{B}$）。随着零点能惩罚$e^{-78.8\ \mathrm{K}/T}$淡去，$K$升向统计值4。约$100\ \mathrm{K}$以下，此处所用的高温转动公式对$\mathrm{H_2}$不再准确，曲线只是定性的。
:::

::: application 自然界中的同位素分馏
同样的物理——原子更重、效应更小——构成了氧、碳、氢同位素地球化学的基础。像$\mathrm{H_2^{18}O(l)} + \mathrm{C^{16}O_2(g)} \rightleftharpoons \mathrm{H_2^{16}O(l)} + \mathrm{C^{16}O^{18}O(g)}$这类交换反应的平衡常数，与其经典（对称数）值相差百分之几；其温度依赖由比格莱森–迈耶与尤里的表述（1947年）从振动频率算出，把化石碳酸盐壳的$^{18}\mathrm{O}/^{16}\mathrm{O}$比变成了古温度计。较重的同位素总是富集在它结合最强的相或物种中，因为那正是它的零点能优势最大之处。
:::

## 电离：电子作为一种化学物种

式[[#prop-k]]并不要求物种是分子。原子的热电离$\mathrm{A} \rightleftharpoons \mathrm{A^{+}} + \mathrm{e^{-}}$是一种解离，其中一个碎片是电子：自旋简并度2、无内部结构、质量为质子的$1/1836$。由于$\mathrm{A}$与$\mathrm{A^{+}}$的平动配分函数在极好近似下相等，式[[#eq-k]]化为
$$
K = \frac{p(\mathrm{A^{+}})\,p(\mathrm{e^{-}})}{p(\mathrm{A})\,p^\circ} = \frac{g(\mathrm{A^{+}})\cdot2}{g(\mathrm{A})}\cdot\frac{k_\mathrm{B}T}{p^\circ\Lambda_\mathrm{e}^{3}}\,e^{-I/k_\mathrm{B}T},
\qquad \Lambda_\mathrm{e} = \frac{h}{(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}},
$$ {#eq-saha}
其中$I$是电离能，$g$是基谱项的简并度。这就是**萨哈方程**。它的结构就是任何解离的结构：电离能的玻尔兹曼因子，对抗熵因子$k_\mathrm{B}T/p^\circ\Lambda_\mathrm{e}^{3}$——每个粒子的体积内自由电子可及的平动状态数——$2500\ \mathrm{K}$下约为$200$，并按$T^{5/2}$增长。

这个方程解释了为什么电离不同于多数化学平衡，对*压力*与温度同样敏感：降低压力给电子更大体积，有利于电离。在大气压低的恒星内部，$10\,000\ \mathrm{K}$下尽管$I/k_\mathrm{B}T = 15.8$，氢已大量电离；每种元素的谱线随光谱型出现与消失的温度——萨哈当初正要解释的这个观测——正由式[[#eq-saha]]给出。在实验室里，同一方程支配着火焰或电感耦合等离子体中碱金属原子未经电离而存活的比例，从而决定原子发射与吸收测量的灵敏度（[[analytical-chemistry/atomic-spectrometry]]）；下文一道习题演算火焰中的铯。

::: quiz
对气相解离$\mathrm{N_2O_4} \rightleftharpoons 2\,\mathrm{NO_2}$，式[[#eq-k]]中哪个因子随温度增长最快，是$T$升高时推动平衡右移的主因？
- [ ] 振动配分函数之比，因为$\mathrm{N_2O_4}$的振动更多。
- [x] 能量因子$e^{-\Delta_\mathrm{r}E_0/RT}$，它从极小的值陡峭上升；配分函数之比只按$T$的一个不大的幂增长。
- [ ] 电子配分函数之比，因为$\mathrm{NO_2}$是自由基。
- [ ] 都不是：该反应是解离，$K$与温度无关。
::: solution
对任何$\Delta_\mathrm{r}E_0 \gg RT$的反应，指数项支配温度依赖：这里$\Delta_\mathrm{r}E_0 \approx 54\ \mathrm{kJ\,mol^{-1}}$，$e^{-\Delta_\mathrm{r}E_0/RT}$在$300$与$400\ \mathrm{K}$之间增大约$200$倍，而配分函数之比——平动贡献$T^{5/2}$、转动$T^{3/2}$、振动缓变——只增长几倍。配分函数决定$K$的*大小*（有利于两个分子的大状态计数因子），但其陡峭的*变化*来自玻尔兹曼因子：这正是$\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^{2}$的分子起源。自由基的电子简并度（$\mathrm{NO_2}$的$g = 2$）只贡献常数因子4，不贡献温度依赖。
:::
:::

::: history
由分子数据计算平衡常数，脱胎于萨库尔与特特罗德（1912年）的"化学常数"——蒸气压与平衡方程中的常数项，他们证明它可由原子质量与普朗克常量算出——二十年代随着带光谱提供转动能级与振动能级，这一工作推广到分子。印度天体物理学家萨哈（Meghnad Saha）1920年推导出恒星大气中的电离平衡$\mathrm{A} \rightleftharpoons \mathrm{A^{+}} + \mathrm{e^{-}}$，即**萨哈方程**，是式[[#eq-k]]的直接应用，解释了恒星光谱序列。发现氘的尤里（Harold Urey，1934年诺贝尔奖）1931年起与里滕贝格（David Rittenberg）一起计算了氢同位素交换的平衡常数，并于1947年发表《同位素物质的热力学性质》（*The thermodynamic properties of isotopic substances*），奠定稳定同位素地球化学的基础；同年比格莱森（Jacob Bigeleisen）与迈耶（Maria Goeppert Mayer）给出普遍表述。JANAF热化学表1960年代为火箭计划首次发行，现由NIST维护，其中气体的热力学函数全部由配分函数算出。
:::

## 后续内容

每当把一个测得的平衡常数用分子语言解读，就是在反向使用式[[#eq-k]]；每当由计算产生热化学数据，就是在正向使用它（[[computational-chemistry/potential-energy-surfaces]]：频率计算的存在很大程度上就是为了提供$q^\mathrm{V}$与零点能）。它最重要的后继是过渡态理论：把活化配合物当作与反应物平衡的物种，应用式[[#eq-k]]，速率常数随之而来（[[statistical-thermodynamics/statistical-rate-theory]]，[[kinetics/transition-state-theory]]）；动力学同位素效应是[[#ex-hd]]同位素交换平衡的动力学表亲。对溶液中的反应，气相配分函数必须补上溶剂化自由能（[[computational-chemistry/solvation-qmmm]]）；对相互作用的气体，则补上[[statistical-thermodynamics/real-gases-liquids]]的逸度修正。

::: summary
- 对理想气体，$K = \prod_J(q^\circ_{J,\mathrm{m}}/N_\mathrm{A})^{\nu_J}e^{-\Delta_\mathrm{r}E_0/RT}$，其中$q^\circ_{J,\mathrm{m}}/N_\mathrm{A}$是体积$k_\mathrm{B}T/p^\circ$中、能量从各分子最低状态量起的分子配分函数。
- $\Delta_\mathrm{r}E_0$是最低状态之间的反应能，包含零点能；对解离它是$N_\mathrm{A}D_0$而非$N_\mathrm{A}D_\mathrm{e}$。
- 配分函数之比是状态计数（类熵）因子；指数项是能量（类焓）因子。
- 对异构体，$K = (q_\mathrm{B}/q_\mathrm{A})e^{-\Delta E_0/RT}$：平衡是两组状态之间的玻尔兹曼布居比（丁烷的旁式/反式，$298\ \mathrm{K}$下旁式占$30\,\%$）。
- 解离平衡在高温由碎片多出的平动配分函数驱动：$K(\mathrm{I_2} \rightleftharpoons 2\mathrm{I}, 1000\ \mathrm{K}) = 3.2\times10^{-3}$。
- 同位素交换平衡由对称数（$\mathrm{H_2 + D_2}$的经典极限$K = 4$）与零点能（$298\ \mathrm{K}$下$K = 3.26$）支配。
- 对$\ln K$求导，即得$\Delta_\mathrm{r}H^\circ$由$\Delta_\mathrm{r}E_0$与分子焓搭成的范特霍夫方程。
:::

## 习题

::: exercise 两态平衡 {level=1 check="0.0463"}
一个分子以两种非简并构型存在，振动与转动配分函数相同；构型B比构型A高$7.50\ \mathrm{kJ\,mol^{-1}}$。$298.15\ \mathrm{K}$下处于构型B的分子分数是多少？（输入分数。）
::: solution
$K = e^{-7500/(8.3145\times298.15)} = e^{-3.0255} = 0.0485$，分数为$K/(1 + K) = 0.0485/1.0485 = 0.0463$。三倍$RT$的能量差，使二十个分子中处于高能构型的不足一个。
:::
:::

::: exercise 解离中的简并度因子 {level=1 check="16"}
对$\mathrm{Cl_2} \rightleftharpoons 2\,\mathrm{Cl}$，在只有基谱项（$\mathrm{Cl_2}$为$^{1}\Sigma_\mathrm{g}^{+}$，Cl为$^{2}\mathrm{P}_{3/2}$）被占据的温度下，仅电子简并度就把$K$改变多少倍？（输入倍数。）
::: solution
$q^\mathrm{E}(\mathrm{Cl}) = 2J + 1 = 4$，$q^\mathrm{E}(\mathrm{Cl_2}) = 1$，故电子因子为$4^{2}/1 = 16$。它对$\Delta_\mathrm{r}S^\circ$的贡献是$R\ln 16 = 23.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$。高温下$^{2}\mathrm{P}_{1/2}$能级（高$882\ \mathrm{cm^{-1}}$）也有贡献，因子超过16。
:::
:::

::: exercise 同位素交换的经典极限 {level=1 check="4"}
只用对称数，预言$\mathrm{H^{35}Cl} + \mathrm{D^{37}Cl} \rightleftharpoons \mathrm{H^{37}Cl} + \mathrm{D^{35}Cl}$以及$^{35}\mathrm{Cl_2} + {}^{37}\mathrm{Cl_2} \rightleftharpoons 2\,{}^{35}\mathrm{Cl}{}^{37}\mathrm{Cl}$的高温极限$K$。（输入后一个。）
::: solution
经典极限下质量相消，$K\to\prod_J\sigma_J^{-\nu_J}$。HCl交换中所有对称数都是1，故$K\to1$。氯交换中同核分子$\sigma = 2$、$^{35}\mathrm{Cl}^{37}\mathrm{Cl}$为1，故$K\to(2\times2)/1^{2} = 4$——与$\mathrm{H_2 + D_2}$相同的统计值，原因也相同：两种原子的随机配对。
:::
:::

::: exercise 碘的解离度 {level=2 check="0.53"}
利用图中所画的函数$K = 22.56\,T^{3/2}(1 - e^{-308.6/T})e^{-17\,898/T}$（$T$以K计），计算$1500\ \mathrm{K}$下的$K$以及总压$1.00\ \mathrm{bar}$下碘的解离度。（输入$\alpha$。）
::: solution
$T^{3/2} = 5.809\times10^{4}$；$1 - e^{-0.2057} = 0.1859$；$e^{-11.932} = 6.58\times10^{-6}$。故$K = 22.56\times5.809\times10^{4}\times0.1859\times6.58\times10^{-6} = 1.60$。对从$n$摩尔$\mathrm{I_2}$出发的$\mathrm{I_2} \rightleftharpoons 2\mathrm{I}$，摩尔分数为$(1-\alpha)/(1+\alpha)$与$2\alpha/(1+\alpha)$，故$K = 4\alpha^{2}p/[(1-\alpha^{2})p^\circ]$。取$p = p^\circ$：$4\alpha^{2}/(1 - \alpha^{2}) = 1.60$，$\alpha^{2} = 1.60/5.60 = 0.286$，$\alpha = 0.53$。$1500\ \mathrm{K}$下一半以上的碘是原子态。
:::
:::

::: exercise 由对称性来的反应熵 {level=2 check="11.5"}
转动对称数对$\mathrm{H_2} + \mathrm{D_2} \rightarrow 2\,\mathrm{HD}$的$\Delta_\mathrm{r}S^\circ$贡献多少？（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入。）
::: solution
对称数给$K$贡献因子$\sigma_{\mathrm{H_2}}\sigma_{\mathrm{D_2}}/\sigma_\mathrm{HD}^{2} = 4$，与温度无关，故纯属熵：$\Delta_\mathrm{r}S^\circ_\sigma = R\ln 4 = 11.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$。对称分子的可分辨取向更少，因而转动状态更少、熵更小；破坏对称每个分子赚回$R\ln 2$。
:::
:::

::: exercise 铯的热电离 {level=2 check="0.68"}
$2500\ \mathrm{K}$的火焰中铯原子电离：$\mathrm{Cs(g)} \rightleftharpoons \mathrm{Cs^{+}(g)} + \mathrm{e^{-}(g)}$，电离能$3.894\ \mathrm{eV}$。简并度$g(\mathrm{Cs}, {}^{2}\mathrm{S}_{1/2}) = 2$，$g(\mathrm{Cs^{+}}, {}^{1}\mathrm{S}_0) = 1$，$g(\mathrm{e^{-}}) = 2$（自旋）。$\mathrm{Cs}$与$\mathrm{Cs^{+}}$的平动配分函数相消。计算$K$，以及铯的总分压（原子加离子）为$1.0\times10^{-6}\ \mathrm{bar}$、电子全部来自铯时的电离分数。（输入电离分数。）
::: hint
电子的$q^\circ_\mathrm{m}/N_\mathrm{A}$为$2k_\mathrm{B}T/(p^\circ\Lambda_\mathrm{e}^{3})$，其中$\Lambda_\mathrm{e} = h/(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}$。
:::
::: solution
$\Lambda_\mathrm{e} = 6.626\times10^{-34}/(2\pi\times9.109\times10^{-31}\times1.3807\times10^{-23}\times2500)^{1/2} = 1.491\times10^{-9}\ \mathrm{m}$；$k_\mathrm{B}T/p^\circ = 3.452\times10^{-25}\ \mathrm{m^{3}}$；故$q^\circ_\mathrm{m}(\mathrm{e^{-}})/N_\mathrm{A} = 2\times3.452\times10^{-25}/3.313\times10^{-27} = 208$。能量因子为$e^{-3.894\ \mathrm{eV}/k_\mathrm{B}T} = e^{-18.07} = 1.42\times10^{-8}$。$\mathrm{Cs^{+}/Cs}$的简并度比为$1/2$，
$$
K = \frac{1}{2}\times208\times1.42\times10^{-8} = 1.47\times10^{-6}.
$$
设铯的总压为$P$、电离分数为$\alpha$：$p(\mathrm{Cs^{+}}) = p(\mathrm{e^{-}}) = \alpha P$，$p(\mathrm{Cs}) = (1-\alpha)P$，故$K = \alpha^{2}P/[(1-\alpha)p^\circ]$，即$\alpha^{2}/(1 - \alpha) = 1.47$。解$\alpha^{2} + 1.47\alpha - 1.47 = 0$得$\alpha = 0.68$。这就是萨哈方程在起作用：易电离的碱金属在火焰中即便分压很低也会大量电离，这就是铯与钾的火焰发射测量要使用"电离抑制剂"（大量另一种易电离元素）把平衡压回去的原因（[[analytical-chemistry/atomic-spectrometry]]）。
:::
:::

::: exercise 由配分函数导出范特霍夫方程 {level=3}
证明理想气体满足$RT^{2}\,\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})/\mathrm{d}T = H^\circ_\mathrm{m}(T) - H^\circ_\mathrm{m}(0)$，并由式[[#eq-k]]导出$\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^{2}$。
::: solution
$q^\circ_\mathrm{m}/N_\mathrm{A} = (k_\mathrm{B}T/p^\circ\Lambda^{3})q^\text{int}(T)$。每摩尔热力学能为$U_\mathrm{m} - U_\mathrm{m}(0) = RT^{2}(\partial\ln q/\partial T)_V$，导数在恒定体积下取。但$q^\circ_\mathrm{m}$在体积$RT/p^\circ$下取值，该体积本身就随$T$增长：$\ln(q^\circ_\mathrm{m}/N_\mathrm{A}) = \ln T + \ln(1/p^\circ\Lambda^{3}) + \ln q^\text{int} + \text{const}$，故
$$
RT^{2}\frac{\mathrm{d}\ln(q^\circ_\mathrm{m}/N_\mathrm{A})}{\mathrm{d}T} = RT + RT^{2}\left(\frac{\partial\ln q}{\partial T}\right)_V = RT + U_\mathrm{m} - U_\mathrm{m}(0) = H^\circ_\mathrm{m} - H^\circ_\mathrm{m}(0),
$$
因为理想气体$pV_\mathrm{m} = RT$且$H(0) = U(0)$。于是由式[[#eq-k]]，
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \sum_J\nu_J\frac{H^\circ_{J,\mathrm{m}} - H^\circ_{J,\mathrm{m}}(0)}{RT^{2}} + \frac{\Delta_\mathrm{r}E_0}{RT^{2}} = \frac{\Delta_\mathrm{r}H^\circ(T)}{RT^{2}},
$$
因为在共同能量标尺上$\sum_J\nu_JH^\circ_{J,\mathrm{m}}(0) = \Delta_\mathrm{r}E_0$，故$\Delta_\mathrm{r}H^\circ(T) = \Delta_\mathrm{r}E_0 + \sum_J\nu_J[H^\circ_{J,\mathrm{m}}(T) - H^\circ_{J,\mathrm{m}}(0)]$。
:::
:::

::: exercise 为什么是$D_0$而不是$D_\mathrm{e}$？ {level=3 check="0.00274"}
一名学生像[[#ex-iodine]]那样计算$1000\ \mathrm{K}$下$\mathrm{I_2} \rightleftharpoons 2\mathrm{I}$的$K$，但在指数中使用势阱深度$D_\mathrm{e} = D_0 + \tfrac{1}{2}hc\tilde\nu = 12\,547\ \mathrm{cm^{-1}}$，同时仍取$q^\mathrm{V} = (1 - e^{-\theta_\mathrm{V}/T})^{-1}$。他算得的$K$是多少？为什么错？用$D_\mathrm{e}$的*自洽*计算应该是什么样？（输入该学生的$K$。）
::: solution
多出的$107\ \mathrm{cm^{-1}}$使$K$乘以$e^{-1.438\,78\times107.25/1000} = e^{-0.1543} = 0.857$，故该学生得到$K = 3.19\times10^{-3}\times0.857 = 2.74\times10^{-3}$。错误是重复计算：$q^\mathrm{V}$的能量从零点能级量起，因此分子最低状态的能量*就是*零点能级，它与分离原子的能量差是$D_0$。用$D_\mathrm{e}$的自洽计算必须把分子的振动能从阱底量起，$q^\mathrm{V}_\text{阱底} = e^{-\theta_\mathrm{V}/2T}/(1 - e^{-\theta_\mathrm{V}/T})$；$K$分母中多出的因子$e^{-\theta_\mathrm{V}/2T}$与指数中多出的$e^{-hc\tilde\nu/2k_\mathrm{B}T}$相互抵消，恢复$K = 3.19\times10^{-3}$。
:::
::: answer
$2.74\times10^{-3}$
:::
:::
