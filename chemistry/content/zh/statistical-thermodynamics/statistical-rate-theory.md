前面的课程由反应物与产物的配分函数算出反应最终停在何处——平衡常数。速率常数问的却是更难的问题：体系多快到达那里？令人惊叹的是，同样的机器大部分照样可用。过渡态理论在动力学中以艾林方程（Eyring equation）的形式引入（[[kinetics/transition-state-theory]]），它把垒顶的构型当作与反应物平衡的一种物种，于是速率常数成为一个平衡常数乘一个普适频率；用配分函数写出后，它能由过渡态的结构与振动频率预言速率常数，解释了碰撞理论只能拟合的“位阻因子”，并对最简单的反应直接约化为碰撞理论本身。对单分子反应——分子必须先被碰撞激发、再等能量自己走到正确的那根键上——统计理论走得更远：林德曼（Lindemann）机理解释了它们的速率常数为何依赖压强，RRK与RRKM理论则通过数富能量分子的量子态来算它瓦解的速率。

本课发展这些反应速率的统计理论。它以[[statistical-thermodynamics/partition-function]]的配分函数与[[statistical-thermodynamics/equilibrium-from-molecules]]的平衡常数为前提；TST的热力学形式（含$\Delta^\ddagger H$与$\Delta^\ddagger S$）以及隧穿与同位素效应的处理见[[kinetics/transition-state-theory]]，并假定[[kinetics/collision-theory]]的碰撞理论已知。

## 用配分函数表述的过渡态理论

考察气相双分子反应$\mathrm{A} + \mathrm{B} \rightarrow$产物，它经过势能面（[[computational-chemistry/potential-energy-surfaces]]）鞍点处的活化络合物$\mathrm{C}^\ddagger$。TST作两条假设：络合物与反应物处于**准平衡**（其布居由玻尔兹曼分布给出，仿佛它们是一种稳定物种）；凡沿正方向越过鞍点处分割面的络合物一律变成产物（**不再穿越**）。非线性络合物的$3N^\ddagger - 6$个振动中，有一个被沿反应坐标$s$的运动取代——那是越过垒顶的平动。

::: proposition 用配分函数表示的TST速率常数 {#prop-tst}
对$\mathrm{A} + \mathrm{B} \rightarrow \mathrm{C}^\ddagger \rightarrow$产物，能量从各物种的最低状态量起，$\Delta E_0$为络合物与反应物零点能级之差（**阈值能**），
$$
k_2 = \kappa\,\frac{k_\mathrm{B}T}{h}\,\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}\,e^{-\Delta E_0/k_\mathrm{B}T}
$$ {#eq-tst}
以分子单位计（$\mathrm{m^{3}\,s^{-1}}$；乘以$N_\mathrm{A}$即得$\mathrm{m^{3}\,mol^{-1}\,s^{-1}}$）。这里$\bar q^{\,\ddagger}$是去掉了反应坐标模式的络合物配分函数，$\kappa$是透射系数。对单分子步$\mathrm{A} \rightarrow \mathrm{C}^\ddagger \rightarrow$产物，$k_1 = \kappa(k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q_\mathrm{A})e^{-\Delta E_0/k_\mathrm{B}T}$，以$\mathrm{s^{-1}}$计。
:::

::: proof
准平衡意味着络合物的数密度由用数密度写出的[[statistical-thermodynamics/equilibrium-from-molecules#eq-k]]给出：
$$
\frac{[\mathrm{C}^\ddagger]}{[\mathrm{A}][\mathrm{B}]} = \frac{q^{\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}\,e^{-\Delta E_0/k_\mathrm{B}T},
$$
其中$q^{\ddagger}$是络合物的完整配分函数。把络合物定义为沿$s$距分割面短长$\delta$以内的任何构型。垒顶附近沿$s$的运动是有效质量为$m^\ddagger$的自由平动，所以$q^{\ddagger}$的这个因子就是长度$\delta$上的一维平动配分函数：$q_s = \delta(2\pi m^\ddagger k_\mathrm{B}T)^{1/2}/h$，且$q^{\ddagger} = q_s\bar q^{\,\ddagger}$。层内的络合物有一半向前运动，其向前平均速率为$\langle v_s\rangle_+ = (k_\mathrm{B}T/2\pi m^\ddagger)^{1/2}$（$|v|$对一维麦克斯韦（Maxwell）分布的平均是$(2k_\mathrm{B}T/\pi m)^{1/2}$，而只有一半络合物向前）；单位时间、单位体积穿过的数目是$[\mathrm{C}^\ddagger]\langle v_s\rangle_+/\delta$。于是速率为
$$
v = [\mathrm{A}][\mathrm{B}]\,\frac{\delta(2\pi m^\ddagger k_\mathrm{B}T)^{1/2}}{h}\cdot\frac{1}{\delta}\left(\frac{k_\mathrm{B}T}{2\pi m^\ddagger}\right)^{1/2}\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}e^{-\Delta E_0/k_\mathrm{B}T} = \frac{k_\mathrm{B}T}{h}\,\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}e^{-\Delta E_0/k_\mathrm{B}T}[\mathrm{A}][\mathrm{B}].
$$
任意的长度$\delta$与未知的有效质量都消掉了，留下普适因子$k_\mathrm{B}T/h$。透射系数$\kappa$对再穿越与隧穿作修正。单分子情形只有一个反应物，推导完全相同。
:::

式[[#eq-tst]]是一份操作指南。算出过渡态的几何构型与振动频率（如今用量子化学），用[[statistical-thermodynamics/partition-function]]的公式求它的平动、转动与振动配分函数，对反应物同样处理，再取包含零点能的垒高。艾林方程的热力学形式$k = (k_\mathrm{B}T/h)e^{\Delta^\ddagger S^\circ/R}e^{-\Delta^\ddagger H^\circ/RT}(c^\circ)^{-1}$说的是同一件事，只是改用标准活化吉布斯自由能$\Delta^\ddagger G^\circ = -RT\ln K^{\ddagger}$来表达，其中$K^\ddagger$由$\bar q^{\,\ddagger}$构成。

::: warning 用哪个配分函数，用哪个零点？ {#warn-tst}
用[[#eq-tst]]时，多数错误出自三点。(i)$\bar q^{\,\ddagger}$略去*一个*振动模式——具有虚频率的那一个——而包含其余全部，其中包括可能贡献大因子的低频弯曲模；不要把络合物的真实模式也一并丢掉。(ii)垒高$\Delta E_0$是零点能级之间而不是经典势能垒$V^\ddagger$的差；两者相差零点能的变化，涉及氢的成键时可达每摩尔几千焦——动力学同位素效应即源于此。(iii)每个转动配分函数都要带对称数，或者说必须计入反应途径简并度：对$\mathrm{H + CH_4 \rightarrow H_2 + CH_3}$，可夺取的氢有四个全同的，对称数之比$\sigma(\mathrm{CH_4})/\sigma^\ddagger = 12/3 = 4$恰好提供这个因子。
:::

## 碰撞理论是特例

对[[#eq-tst]]最干净的检验是两个原子之间的反应，其活化络合物是一个不剩任何振动的双原子“分子”——它唯一的振动*就是*反应坐标。

::: proposition 原子+原子的TST重现碰撞理论 {#prop-atoms}
对$\mathrm{A} + \mathrm{B} \rightarrow \mathrm{AB}^\ddagger$，络合物键长为$d$（约化质量$\mu$，转动惯量$I = \mu d^{2}$），$\kappa = 1$，则[[#eq-tst]]给出
$$
k_2 = \pi d^{2}\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2}e^{-\Delta E_0/k_\mathrm{B}T},
$$ {#eq-collision}
正是碰撞理论的速率常数，碰撞截面为$\pi d^{2}$、位阻因子为1。
:::

::: proof
对原子，$q/V = 1/\Lambda^{3} = (2\pi mk_\mathrm{B}T)^{3/2}/h^{3}$（忽略电子简并度；若络合物继承了它们，它会同等地乘到等式两边）。对络合物，$\bar q^{\,\ddagger}/V = [2\pi(m_\mathrm{A} + m_\mathrm{B})k_\mathrm{B}T]^{3/2}/h^{3}\times q^\mathrm{R}$，其中$q^\mathrm{R} = 8\pi^{2}Ik_\mathrm{B}T/h^{2}$（线性转子的结果$k_\mathrm{B}T/hcB$，$B = h/8\pi^{2}cI$；异核原子$\sigma = 1$）。质量因子合并为$(m_\mathrm{A} + m_\mathrm{B})^{3/2}/(m_\mathrm{A}m_\mathrm{B})^{3/2} = \mu^{-3/2}$，于是
$$
k_2 = \frac{k_\mathrm{B}T}{h}\cdot\frac{h^{3}}{(2\pi\mu k_\mathrm{B}T)^{3/2}}\cdot\frac{8\pi^{2}\mu d^{2}k_\mathrm{B}T}{h^{2}}\,e^{-\Delta E_0/k_\mathrm{B}T} = \frac{8\pi^{2}d^{2}(k_\mathrm{B}T)^{1/2}}{(2\pi)^{3/2}\mu^{1/2}}\,e^{-\Delta E_0/k_\mathrm{B}T}.
$$
所有的$h$都消掉了。由于$8\pi^{2}/(2\pi)^{3/2} = 2(2\pi)^{1/2} = \pi(8/\pi)^{1/2}$，指前因子即为$\pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}$，与前述一致。
:::

普朗克常量的消去是一个有力的一致性检验：碰撞理论是经典的，无结构粒子的TST必须与它一致。碰撞理论称之为截面的东西，TST称之为络合物的转动惯量——络合物的转动就是碰撞双星的相对轨道运动。

::: example TST给出的碰撞极限速率常数 {#ex-atoms}
对氧原子（$16.00\ \mathrm{g\,mol^{-1}}$）与氯原子（$35.45\ \mathrm{g\,mol^{-1}}$）在$300\ \mathrm{K}$下计算[[#eq-collision]]，取$d = 300\ \mathrm{pm}$、阈值能为零，结果以$\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$为单位。
::: solution
$\mu = (16.00\times35.45/51.45)\ \mathrm{u} = 11.02\ \mathrm{u} = 1.831\times10^{-26}\ \mathrm{kg}$。平均相对速率为
$$
\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} = \left(\frac{8\times1.3807\times10^{-23}\times300}{\pi\times1.831\times10^{-26}}\right)^{1/2}\ \mathrm{m\,s^{-1}} = 759\ \mathrm{m\,s^{-1}},
$$
且$\pi d^{2} = \pi\times(3.00\times10^{-10})^{2} = 2.827\times10^{-19}\ \mathrm{m^{2}}$。于是每对分子$k_2 = 2.146\times10^{-16}\ \mathrm{m^{3}\,s^{-1}}$；乘以$N_\mathrm{A}$与$10^{3}\ \mathrm{dm^{3}\,m^{-3}}$，
$$
k_2 = 2.146\times10^{-16}\times6.022\times10^{23}\times10^{3} = 1.29\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
这就是无垒、无取向要求反应的典型气体动力学上限，$10^{10}$–$10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。（原子–原子的*复合*还需要第三体来带走能量；此处算出的数值是生成络合物的速率。）
:::
:::

### 位阻因子的起源

对多原子反应物，[[#eq-tst]]中的配分函数之比做到了碰撞理论做不到的事：它计及反应物在络合物中锁合时*失去*的转动自由度。艾林的数量级分析把这一点挑明：给每个模式赋予典型的配分函数——每个平动自由度$q_\mathrm{t}$（单位长度上），每个转动自由度$q_\mathrm{r}$（$\approx 10$–$100$），每个振动$q_\mathrm{v}$（常温下$\approx 1$–$3$）。

::: example 估算位阻因子 {#ex-steric}
用每个模式的配分函数比较（a）原子+原子与（b）非线性分子+非线性分子（原子数为$N_\mathrm{A}$与$N_\mathrm{B}$，络合物非线性）的TST速率常数，进而估计碰撞理论的位阻因子$P$。对$q_\mathrm{r} = 30$、$q_\mathrm{v} = 1.5$求$P$。
::: solution
（a）每个原子有三个平动模式；络合物有三个平动与两个转动（其振动就是反应坐标）。于是$k^{(a)} \propto q_\mathrm{t}^{3}q_\mathrm{r}^{2}/q_\mathrm{t}^{6} = q_\mathrm{r}^{2}/q_\mathrm{t}^{3}$，这正是$P = 1$的碰撞理论结果（[[#prop-atoms]]）。

（b）每个反应物有$3$个平动、$3$个转动与$3N - 6$个振动。$N_\mathrm{A} + N_\mathrm{B}$个原子的络合物有$3$个平动、$3$个转动与$3(N_\mathrm{A} + N_\mathrm{B}) - 6 - 1$个振动（其中一个是反应坐标）。比值为
$$
k^{(b)} \propto \frac{q_\mathrm{t}^{3}q_\mathrm{r}^{3}q_\mathrm{v}^{3(N_\mathrm{A}+N_\mathrm{B})-7}}{q_\mathrm{t}^{6}q_\mathrm{r}^{6}q_\mathrm{v}^{3N_\mathrm{A}-6+3N_\mathrm{B}-6}} = \frac{q_\mathrm{v}^{5}}{q_\mathrm{t}^{3}q_\mathrm{r}^{3}} .
$$
除以碰撞理论形式（a）——它使用同样的截面与阈值——得
$$
P \approx \frac{k^{(b)}}{k^{(a)}} = \left(\frac{q_\mathrm{v}}{q_\mathrm{r}}\right)^{5} .
$$
$q_\mathrm{r} = 30$、$q_\mathrm{v} = 1.5$时，$P \approx (0.05)^{5} = 3\times10^{-7}$。反应物变成络合物（硬）振动的五个转动自由度，每个损失一个因子$q_\mathrm{v}/q_\mathrm{r}$：位阻因子是取向的代价，相当于活化熵$5R\ln(q_\mathrm{v}/q_\mathrm{r}) \approx -125\ \mathrm{J\,K^{-1}\,mol^{-1}}$。多原子分子间反应实测的$P$值在$10^{-4}$到$10^{-9}$之间，正是这个量级；而保留若干自由转动的“松散”过渡态给出较大的$P$。
:::
:::

### 紧密与松散的过渡态

对单分子反应，反应物与络合物的平动配分函数相同而相消，转动的也几乎相消；于是指前因子$(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q$由*振动*支配。若过渡态只是一根键被拉长、其余模式几乎不变，则$\bar q^{\,\ddagger} \approx q$除以反应物中变成反应坐标的那个模式的配分函数——对硬的伸缩振动，这个配分函数接近1——所以其指前因子接近$k_\mathrm{B}T/h \approx 10^{13}\ \mathrm{s^{-1}}$。经由环状结构的协同重排就有这样**紧密**的过渡态。反之，在简单键断裂中，正在分离的两块碎片的弯曲运动在络合物中变软、振幅变大——**松散**的过渡态——每一个被软化的模式都使指前因子增大。

::: example 紧密与松散过渡态的指前因子 {#ex-loose}
一个分子在$1000\ \mathrm{K}$下断裂一根键而分解。紧密过渡态中其余模式保持反应物的频率；松散过渡态中两个弯曲模从$400\ \mathrm{cm^{-1}}$降到$100\ \mathrm{cm^{-1}}$。把振动当作谐振处理，比较TST指前因子$(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q$，取反应物中被断伸缩振动的配分函数为1。
::: solution
$1000\ \mathrm{K}$下$k_\mathrm{B}T/h = 2.08\times10^{13}\ \mathrm{s^{-1}}$。紧密过渡态下$\bar q^{\,\ddagger}/q = 1$，指前因子为$2.1\times10^{13}\ \mathrm{s^{-1}}$。松散过渡态下，两个弯曲模的$q^\mathrm{V}$从$1/(1 - e^{-1.438\,78\times400/1000}) = 2.285$变为$1/(1 - e^{-0.1439}) = 7.462$，每个贡献因子$3.27$，于是
$$
\frac{\bar q^{\,\ddagger}}{q} = 3.27^{2} = 10.7, \qquad \frac{k_\mathrm{B}T}{h}\frac{\bar q^{\,\ddagger}}{q} = 2.2\times10^{14}\ \mathrm{s^{-1}} .
$$
仅仅软化两个模式就把指前因子提高十倍，即活化熵$R\ln 10.7 \approx +20\ \mathrm{J\,K^{-1}\,mol^{-1}}$。真实的键断裂中若干弯曲模变成碎片近乎自由的转动，指前因子可达$10^{15}$–$10^{17}\ \mathrm{s^{-1}}$；协同的四中心与六中心消除反应，其内旋转在环状过渡态中被*冻结*，指前因子为$10^{11}$–$10^{13}\ \mathrm{s^{-1}}$。因此实测的阿伦尼乌斯（Arrhenius）$A$因子可用来诊断过渡态的松紧。
:::
:::

## 单分子反应：林德曼机理

单分子反应，如环丙烷异构化为丙烯$\mathrm{C_3H_6} \rightarrow \mathrm{CH_3CH{=}CH_2}$，有一个谜。高压下它是一级反应，但单个分子从哪里得到反应所需的能量？林德曼（Frederick Lindemann）的回答（1922年）是：从碰撞中来——而反应之所以呈一级，只是因为活化比反应快得多。

::: proposition 林德曼–欣谢尔伍德机理 {#prop-lindemann}
对机理
$$
\mathrm{A} + \mathrm{M} \xrightleftharpoons[k_{-1}]{k_1} \mathrm{A}^{*} + \mathrm{M}, \qquad \mathrm{A}^{*} \xrightarrow{k_2} \mathrm{P},
$$
其中M是任一碰撞伙伴，$\mathrm{A}^{*}$是富能量分子，对$\mathrm{A}^{*}$用稳态近似得$v = k_\mathrm{uni}[\mathrm{A}]$，其中
$$
k_\mathrm{uni} = \frac{k_1k_2[\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2} = \frac{k_\infty}{1 + [\mathrm{M}]_{1/2}/[\mathrm{M}]}, \qquad k_\infty = \frac{k_1k_2}{k_{-1}}, \quad [\mathrm{M}]_{1/2} = \frac{k_2}{k_{-1}} = \frac{k_\infty}{k_1} .
$$ {#eq-lindemann}
高压下$k_\mathrm{uni}\to k_\infty$（一级）；低压下$k_\mathrm{uni}\to k_1[\mathrm{M}]$（二级，活化是速率控制步骤）。**降压区**出现在$[\mathrm{M}]_{1/2}$附近。
:::

::: proof
令$\mathrm{d}[\mathrm{A}^{*}]/\mathrm{d}t = k_1[\mathrm{A}][\mathrm{M}] - k_{-1}[\mathrm{A}^{*}][\mathrm{M}] - k_2[\mathrm{A}^{*}] = 0$（[[kinetics/reaction-mechanisms]]）得$[\mathrm{A}^{*}] = k_1[\mathrm{A}][\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$，且$v = k_2[\mathrm{A}^{*}]$。分子分母同除以$k_{-1}[\mathrm{M}]$得第二种形式。当$[\mathrm{M}] = [\mathrm{M}]_{1/2}$时，$k_\mathrm{uni} = k_\infty/2$。
:::

::: widget plot
f: log10(1/(1 + 10^(h - x))); log10(1/(1 + 10^(h - x)*10^(-w)))
x: -4, 4
y: -5, 0.5
sliders: h=0:-3:3:0.1; w=2:0:6:0.1
labels: \text{林德曼}; \text{其中 } [\mathrm{M}]_{1/2}\text{ 降低 }10^{w}\text{ 倍}
caption: 降压曲线：由[[#eq-lindemann]]得到的$\log_{10}(k_\mathrm{uni}/k_\infty)$对$\log_{10}[\mathrm{M}]$（任意单位）作图，半压位置$\log_{10}[\mathrm{M}]_{1/2} = h$由滑块设定。高压下曲线平坦（一级）；低压下以单位斜率下降（二级）。第二条曲线把$[\mathrm{M}]_{1/2}$降低$10^{w}$倍，正如欣谢尔伍德对众多内部振子的修正所做的那样：降压区移向更低的压强。真实的降压曲线也比林德曼式*更宽*，因为$k_2$依赖于$\mathrm{A}^{*}$的能量——这正是RRKM理论的要点。
:::

林德曼机理解释了定性行为，但其最简单的定量形式错得离谱。若活化是一次强碰撞——以碰撞理论的概率$e^{-E_0/RT}$向分子输送至少$E_0$的能量——那么$k_1 = Z\,e^{-E_0/RT}$，于是$[\mathrm{M}]_{1/2} = k_\infty/k_1$高得荒唐。

::: example 环丙烷的降压区：林德曼对欣谢尔伍德 {#ex-cyclopropane}
环丙烷异构化的高压速率常数为$k_\infty = 1.5\times10^{15}\ \mathrm{s^{-1}}\exp(-272\ \mathrm{kJ\,mol^{-1}}/RT)$（Chambers与Kistiakowsky，1934）。在$765\ \mathrm{K}$下，用$k_1 = Ze^{-E_0/RT}$估算$[\mathrm{M}]_{1/2}$及对应的压强，取$E_0 = 266\ \mathrm{kJ\,mol^{-1}}$、碰撞速率常数$Z = 6.9\times10^{-16}\ \mathrm{m^{3}\,s^{-1}}$（直径$500\ \mathrm{pm}$）。然后用欣谢尔伍德的活化速率重做一遍：能量可分布于$s$个经典振子之上，故$k_1 = Z\,(E_0/RT)^{s-1}e^{-E_0/RT}/(s-1)!$，取$s = 10$。
::: solution
$k_\infty = 1.5\times10^{15}\exp(-272\,000/(8.3145\times765)) = 1.5\times10^{15}\times2.68\times10^{-19} = 4.0\times10^{-4}\ \mathrm{s^{-1}}$。由$E_0/RT = 266\,000/6360 = 41.8$，$e^{-41.8} = 7.3\times10^{-19}$，强碰撞的林德曼估算给出$k_1 = 6.9\times10^{-16}\times7.3\times10^{-19} = 5.0\times10^{-34}\ \mathrm{m^{3}\,s^{-1}}$，于是
$$
[\mathrm{M}]_{1/2} = \frac{k_\infty}{k_1} = \frac{4.0\times10^{-4}}{5.0\times10^{-34}} = 8.0\times10^{29}\ \mathrm{m^{-3}}, \qquad p_{1/2} = [\mathrm{M}]_{1/2}k_\mathrm{B}T = 8.5\times10^{9}\ \mathrm{Pa}.
$$
将近$10^{5}\ \mathrm{bar}$：这一形式的林德曼理论预言，在任何可及的压强下环丙烷都应处于二级区。实际上，降压区在千帕量级乃至更低的压强下就被观测到了。$s = 10$时欣谢尔伍德的因子为$41.8^{9}/9! = 1.07\times10^{9}$；它把$k_1$提高这么多，使估算值降到$p_{1/2} \approx 8\ \mathrm{Pa}$。分子在多个振子中的总能量*至少*为$E_0$的概率，远大于某一个振子单独持有$E_0$的概率；如今结果对$s$极其敏感（且$s = 10$时已过头），这说明需要的是关于$k_2$随能量变化的理论，而不是凑数的修正。
:::
:::

## RRK与RRKM理论

剩下的问题是：能量为$E$的富能量分子以怎样的速率常数$k_2(E)$分解。统计力学的回答假定能量在所有振动之间快速而随机地流动（**分子内振动能量再分配**，IVR），于是分子只在碰巧有至少$E_0$集中到临界坐标上时才反应。

::: proposition RRK速率常数 {#prop-rrk}
若把分子建模为$s$个频率为$\nu$、共享总能量$E$的全同经典振子，则某一个指定振子至少持有$E_0$的概率为$(1 - E_0/E)^{s-1}$，反应速率常数为
$$
k_2(E) = \nu\left(1 - \frac{E_0}{E}\right)^{s-1}\qquad(E \ge E_0) .
$$ {#eq-rrk}
:::

::: proof
对总能量为$E$的$s$个经典振子，能量$(\varepsilon_1, \ldots, \varepsilon_s)$（按等先验概率）均匀分布于单纯形$\sum_i\varepsilon_i = E$、$\varepsilon_i \ge 0$之上，该单纯形的$(s-1)$维体积正比于$E^{s-1}$。满足$\varepsilon_1 \ge E_0$的组态可由$\varepsilon_1 = E_0 + \varepsilon_1'$得到；它们构成一个形状相同、总能量为$E - E_0$的单纯形，体积正比于$(E - E_0)^{s-1}$。两者之比$(1 - E_0/E)^{s-1}$，就是临界振子至少持有$E_0$的概率。若每逢这种情况反应便每一振动周期发生一次，则$k_2 = \nu(1 - E_0/E)^{s-1}$。
:::

::: widget plot
f: (1 - 1/x)^(s - 1)
x: 1, 6
y: 0, 1
sliders: s=10:1:30:1
labels: k_2(E)/\nu
caption: RRK速率常数[[#eq-rrk]]：$k_2/\nu$对$E/E_0$的图，振子数$s$由滑块设定。刚刚越过阈值时速率极其微小，因为能量必须从$s$根键中恰好走到一根里；曲线陡升，只有当$E$达到$E_0$的许多倍时才接近振动频率。分子越大（$s$越大），给定超额能量下富能量分子活的时间就越长——这就是大分子更容易被碰撞稳定、并在更低压强下出现降压区的原因。
:::

RRK理论（Rice与Ramsperger，Kassel，1927–1928）抓住了能量依赖关系，但经典振子和单一频率$\nu$太粗糙了。马库斯（Rudolph Marcus）的改写（RRKM，1952）把它与过渡态理论结合起来，而且不再用于热系综，而用于能量固定的分子——一种*微正则*TST。

::: proposition RRKM速率常数 {#prop-rrkm}
对总能量为$E$（从其零点能级量起）、振动态密度为$\rho(E)$的富能量分子，若过渡态的振动模式（不含反应坐标）的态和为$N^\ddagger(E - E_0)$——即能量处于过渡态零点能级之上$0$到$E - E_0$之间的状态数——
$$
k_2(E) = \frac{N^\ddagger(E - E_0)}{h\,\rho(E)} .
$$ {#eq-rrkm}
在经典极限下，反应物有$s$个频率为$\nu_i$的振子、过渡态有$s - 1$个频率为$\nu_j^\ddagger$的振子，此式化为RRK形式，其中$\nu = \prod_{i=1}^{s}\nu_i/\prod_{j=1}^{s-1}\nu_j^\ddagger$。
:::

::: proof
在能量为$E$的微正则系综中，富能量分子的每个状态等概率；分子的状态落在宽度为$\mathrm{d}E$的能量壳层内，共$\rho(E)\,\mathrm{d}E$个。其中考察靠近分割面、反应坐标能量为$\varepsilon_s$、络合物其余模式能量为$E - E_0 - \varepsilon_s$的那些状态。沿$s$在长度$\delta$上的平动，每个能量间隔有$\delta(2m^\ddagger)^{1/2}\varepsilon_s^{-1/2}\,\mathrm{d}\varepsilon_s/h$个正向运动的状态（来自经典相空间计数$\delta\,\mathrm{d}p/h$）；具有该能量的络合物以$v_s/\delta = (2\varepsilon_s/m^\ddagger)^{1/2}/\delta$的速率穿过这层。二者之积为$\mathrm{d}\varepsilon_s/h$，与$\varepsilon_s$、$m^\ddagger$和$\delta$都无关——这就是$k_\mathrm{B}T/h$的微正则对应物。对络合物其余模式的状态求和，单位时间内穿越的总数按$\rho^\ddagger$加权：$\int_0^{E-E_0}\rho^\ddagger(E - E_0 - \varepsilon_s)\,\mathrm{d}\varepsilon_s\,\mathrm{d}E/h = N^\ddagger(E - E_0)\,\mathrm{d}E/h$。除以富能量分子的状态数$\rho(E)\,\mathrm{d}E$，即得[[#eq-rrkm]]。

经典极限下，$s$个谐振子有$N(E) = E^{s}/(s!\prod_ih\nu_i)$，故$\rho(E) = \mathrm{d}N/\mathrm{d}E = E^{s-1}/((s-1)!\prod_ih\nu_i)$；络合物的$s - 1$个振子有$N^\ddagger(E - E_0) = (E - E_0)^{s-1}/((s-1)!\prod_jh\nu_j^\ddagger)$。二者之比再除以$h$即$(\prod_i\nu_i/\prod_j\nu_j^\ddagger)(1 - E_0/E)^{s-1}$。
:::

[[#eq-rrkm]]的威力在于*量子*计数。真实分子有零点能，频率又相差悬殊，它们的态和与态密度可以靠精确计数严格算出（Beyer-Swinehart算法，1973），也可以用好的近似（Whitten与Rabinovitch，1963）。把$k_2(E)$对碰撞产生的富能量分子分布作平均，得到的降压曲线在横跨许多数量级的压强范围内与实验一致。

::: example RRKM的态计数 {#ex-rrkm}
一个模型分子有三个$1000\ \mathrm{cm^{-1}}$的谐振子；到过渡态，其中一个变成反应坐标，其余两个仍为$1000\ \mathrm{cm^{-1}}$。阈值为$E_0 = 5000\ \mathrm{cm^{-1}}$。对激发到$E = 8000\ \mathrm{cm^{-1}}$的分子（两者都从零点能级量起），用直接计数计算$k_2(E)$，并与经典RRK结果比较。
::: solution
*络合物的态和。*$E - E_0 = 3000\ \mathrm{cm^{-1}}$，即至多三个量子分配给两个振子。满足$v_1 + v_2 \le 3$的$(v_1, v_2)$有$1 + 2 + 3 + 4 = 10$种，故$N^\ddagger = 10$。

*分子的态密度。*$E = 8000\ \mathrm{cm^{-1}}$时，反应物在三个振子中恰有八个量子：$\binom{8+2}{2} = 45$个状态；能级每隔$1000\ \mathrm{cm^{-1}}$出现一次，故在该间隔内平均的态密度为$\rho = 45/(1000\ \mathrm{cm^{-1}})$，即每焦耳$45/(1000\,hc)$。

*速率常数。*由[[#eq-rrkm]]，
$$
k_2 = \frac{N^\ddagger}{h\rho} = \frac{10}{45}\times(1000\ \mathrm{cm^{-1}})\times c = 0.222\times(1000\ \mathrm{cm^{-1}}\times2.998\times10^{10}\ \mathrm{cm\,s^{-1}}) = 6.7\times10^{12}\ \mathrm{s^{-1}} .
$$
*经典RRK*：取$\nu = c\times1000\ \mathrm{cm^{-1}} = 3.0\times10^{13}\ \mathrm{s^{-1}}$、$s = 3$，$k_2 = 3.0\times10^{13}\times(1 - 5/8)^{2} = 4.2\times10^{12}\ \mathrm{s^{-1}}$。量子计数的结果大$60\,\%$，因为在如此低的能量（八个量子）下，经典公式曲解了反应物与络合物两者的离散计数。对于有二三十个模式的真实分子，单是$\rho(E)$的经典误差在阈值附近就可能超过$10^{3}$倍，这正是RRKM采用精确计数的原因。
:::
:::

::: widget plot
f: log10(binom(floor(x) + s, s)); log10(x^s/fact(s)); log10((x + s/2)^s/fact(s))
x: 0, 12
y: -2, 5
sliders: s=3:1:6:1
labels: \text{精确计数}; \text{经典式 } E^{s}/s!; \text{含零点能的经典式}
caption: $s$个全同谐振子（滑块）的振动态和$N(E)$的对数$\log_{10}N(E)$对$E$（以$h\nu$为单位、从零点能级量起）作图：精确的阶梯$\binom{n+s}{s}$（$n$ = 可用量子数）、RRK理论使用的经典公式$E^{s}/s!$，以及把零点能$\tfrac{1}{2}sh\nu$加到$E$上的经典公式（Marcus-Rice近似）。经典计数在低能下小得太多；计入零点能的计数又偏高。二者之间Whitten与Rabinovitch的插值精确到几个百分点，在精确计数成为常规做法之前一直是RRKM计算的标准方法。
:::

::: quiz
按照RRKM理论，在总能量$E$固定的情况下，下列哪种改变会*增大*富能量分子的速率常数$k_2(E)$？
- [x] 使过渡态变松（降低其若干振动频率），从而增大$N^\ddagger(E - E_0)$。
- [ ] 为反应物增加更多低频模式，从而增大$\rho(E)$。
- [ ] 提高阈值能$E_0$。
- [ ] 增大浴气的压强。
::: solution
$k_2(E) = N^\ddagger(E - E_0)/h\rho(E)$。较松的过渡态在任何能量以下都有更多状态，使分子增大：这就是带松散过渡态的简单键断裂有很高的指前因子（$10^{15}$–$10^{17}\ \mathrm{s^{-1}}$）、而紧密的环状过渡态只有小值的原因。反应物模式增多会增大$\rho(E)$从而*降低*$k_2$（能量被稀释了）；阈值越高，留给络合物的能量越少。压强根本不改变$k_2(E)$——它通过改变富能量分子的布居来改变$k_\mathrm{uni}$，那是另一个量。
:::
:::

::: history
马塞兰（René Marcelin）在1915年的博士论文中导出了活化络合物速率表达式的一种形式；艾林（Henry Eyring）以及独立地埃文斯（Meredith Evans）与波兰尼（Michael Polanyi）在1935年用配分函数表述了过渡态理论（[[kinetics/transition-state-theory]]）。林德曼（Frederick Lindemann）在1921年法拉第学会的一次讨论会上提出了碰撞活化机理（1922年发表），欣谢尔伍德（Cyril Hinshelwood）在1926–1927年引入了多振子活化速率，这项工作为他1956年与人分享诺贝尔化学奖贡献了一份力量。赖斯（Oscar Rice）与拉姆斯珀格（Herman Ramsperger）（1927年）以及卡塞尔（Louis Kassel）（1928年）发展了RRK理论；马库斯（Rudolph Marcus）在1952年把它与过渡态理论结合起来（早期曾有赖斯的合作），得到RRKM理论。马库斯因电子转移反应理论——另一种统计速率理论——获得1992年诺贝尔化学奖。对统计假设的直接检验来自化学活化实验，以及后来观测IVR实际发生的飞秒实验。
:::

## 后续内容

统计速率理论是气相动力学、燃烧化学与大气化学的工作工具：每一个单分子步与复合步都需要随压强变化的速率常数（在IUPAC与NASA/JPL一类动力学数据库中用Troe降压参数表达）（[[environmental-chemistry/tropospheric-chemistry]]、[[kinetics/chain-reactions]]）。变分TST把分割面放在所算通量最小处，用于无势垒反应的微正则变分方法，都是这里思想的精化；它们的失效之处——非统计动力学、IVR不完全、再穿越——正是反应动力学的课题（[[kinetics/reaction-dynamics]]）。在溶液中，同一幅自由能图像支撑着马库斯（Marcus）的电子转移理论（[[electrochemistry/electrode-kinetics]]）与酶催化的分析（[[biochemistry/enzymes]]）；计算溶剂或蛋白质中沿反应坐标的自由能，是[[computational-chemistry/free-energy-sampling]]的核心任务。

::: summary
- TST的配分函数形式：$k_2 = \kappa(k_\mathrm{B}T/h)\,(\bar q^{\,\ddagger}/V)/[(q_\mathrm{A}/V)(q_\mathrm{B}/V)]\,e^{-\Delta E_0/k_\mathrm{B}T}$，其中$\bar q^{\,\ddagger}$已去掉反应坐标模式，$\Delta E_0$在零点能级之间量度。
- 对原子+原子，TST精确地约化为碰撞理论，$k = \pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-\Delta E_0/k_\mathrm{B}T}$；普朗克常量消掉了。
- 位阻因子是配分函数之比：两个非线性反应物时$P \approx (q_\mathrm{v}/q_\mathrm{r})^{5}$，为$10^{-5}$–$10^{-9}$，是取向的熵代价。
- 林德曼：$k_\mathrm{uni} = k_1k_2[\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$，高压一级、低压二级；强碰撞对降压压强的估算高出好几个数量级。
- 欣谢尔伍德与RRK：能量分给$s$个振子共享；$k_2(E) = \nu(1 - E_0/E)^{s-1}$在阈值之上陡升。
- RRKM：$k_2(E) = N^\ddagger(E - E_0)/h\rho(E)$，用精确态计数的微正则TST；松散过渡态给出大速率常数，反应物模式多则给出小的。
:::

## 习题

::: exercise 500 K下的普适频率 {level=1 check="1.042e13"}
计算$500\ \mathrm{K}$下的$k_\mathrm{B}T/h$。（以$\mathrm{s^{-1}}$为单位输入。）
::: solution
$k_\mathrm{B}T/h = 1.380\,649\times10^{-23}\times500/6.626\,070\times10^{-34} = 1.042\times10^{13}\ \mathrm{s^{-1}}$。它就是每单位$K^\ddagger$所对应的络合物穿过分割面的速率，与络合物的质量无关。
:::
:::

::: exercise RRK速率常数 {level=1 check="1.95e10"}
一个富能量分子被建模为$s = 10$个频率为$\nu = 1.0\times10^{13}\ \mathrm{s^{-1}}$的振子。计算$E = 2E_0$时的$k_2$。（以$\mathrm{s^{-1}}$为单位输入$k_2$。）
::: solution
$k_2 = \nu(1 - E_0/E)^{s-1} = 1.0\times10^{13}\times(0.5)^{9} = 1.0\times10^{13}\times1.953\times10^{-3} = 1.95\times10^{10}\ \mathrm{s^{-1}}$。即使能量达到阈值的两倍，分子平均也要存活约2000个振动周期，能量才会聚拢到临界键上。
:::
:::

::: exercise 欣谢尔伍德因子 {level=1 check="7.22e8"}
当$E_0/RT = 40$、$s = 10$时，计算欣谢尔伍德的活化速率超出单振子值的因子$(E_0/RT)^{s-1}/(s-1)!$。（输入该因子。）
::: solution
$40^{9}/9! = 2.621\times10^{14}/362\,880 = 7.22\times10^{8}$。将近十亿倍：能量由十个振子共享时，“总能量至少$E_0$”比“某一个模式至少$E_0$”的概率大得太多。
:::
:::

::: exercise 降压区的半压 {level=2 check="2.0e-4"}
对某单分子反应，$k_\infty = 2.0\times10^{-3}\ \mathrm{s^{-1}}$，低压（二级）速率常数为$k_1 = 1.0\times10^{1}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。求$[\mathrm{M}]_{1/2}$以及$[\mathrm{M}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$时$k_\mathrm{uni}$的值。（以$\mathrm{mol\,dm^{-3}}$为单位输入$[\mathrm{M}]_{1/2}$。）
::: solution
$[\mathrm{M}]_{1/2} = k_\infty/k_1 = 2.0\times10^{-3}/10 = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$（$700\ \mathrm{K}$下约$1.2\ \mathrm{kPa}$）。当$[\mathrm{M}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$时，$k_\mathrm{uni} = k_\infty/(1 + 2.0) = 6.7\times10^{-4}\ \mathrm{s^{-1}}$，是高压机值的三分之一：反应处于降压区。
:::
:::

::: exercise 原子+原子反应的TST指前因子 {level=2 check="0.5"}
由[[#eq-collision]]，原子+原子反应的指前因子如何依赖温度？相应的差$E_\mathrm{a} - \Delta E_0$以$RT$为单位是多少？（输入$(E_\mathrm{a} - \Delta E_0)/RT$。）
::: solution
指前因子$\pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}$按$T^{1/2}$变化。由$E_\mathrm{a} = RT^{2}\,\mathrm{d}\ln k/\mathrm{d}T = RT^{2}(\tfrac{1}{2}T^{-1} + \Delta E_0/RT^{2}) = \Delta E_0 + \tfrac{1}{2}RT$，得$(E_\mathrm{a} - \Delta E_0)/RT = 0.5$——即[[kinetics/collision-theory]]中的碰撞理论关系。一般而言，TST给出$E_\mathrm{a} - \Delta E_0 = RT^{2}\,\mathrm{d}\ln[(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q_\mathrm{A}q_\mathrm{B}]/\mathrm{d}T$，配分函数之比中的每一个温度幂各贡献一个$\tfrac{1}{2}RT$项。
:::
:::

::: exercise 过渡态的状态计数 {level=2 check="35"}
某过渡态有四个$500\ \mathrm{cm^{-1}}$的简谐模式。它有多少个振动状态的能量（高于其零点能级）不超过$1500\ \mathrm{cm^{-1}}$？（输入$N^\ddagger$。）
::: solution
该能量允许至多$n = 3$个量子分给$s = 4$个振子。把*至多*$n$个全同量子分给$s$个振子的方式数，等于把恰好$n$个分给$s + 1$个振子的方式数（外加一个“宽松”振子）：$\binom{n+s}{s} = \binom{7}{4} = 35$。直接数：$1$（无量子）$+ 4$（一个）$+ 10$（两个）$+ 20$（三个）$= 35$。经典公式$E^{s}/s! = 3^{4}/24 = 3.4$低估了十倍。
:::
:::

::: exercise 经典RRKM退化为RRK {level=3}
利用$s$个经典谐振子的$N(E) = E^{s}/(s!\prod_ih\nu_i)$，导出[[#prop-rrkm]]中陈述的[[#eq-rrkm]]的经典极限，并证明：若反应坐标取代频率为$\nu_1$的那个模式而过渡态其余模式不变，则$k_2(E) = \nu_1(1 - E_0/E)^{s-1}$。解释这一结果。
::: solution
$\rho(E) = \mathrm{d}N/\mathrm{d}E = E^{s-1}/((s-1)!\prod_{i=1}^{s}h\nu_i)$。络合物有$s - 1$个振子，故$N^\ddagger(E - E_0) = (E - E_0)^{s-1}/((s-1)!\prod_{j=1}^{s-1}h\nu_j^\ddagger)$。于是
$$
k_2(E) = \frac{N^\ddagger}{h\rho} = \frac{(E - E_0)^{s-1}}{(s-1)!\prod_jh\nu_j^\ddagger}\cdot\frac{(s-1)!\prod_ih\nu_i}{hE^{s-1}} = \frac{\prod_{i=1}^{s}\nu_i}{\prod_{j=1}^{s-1}\nu_j^\ddagger}\left(1 - \frac{E_0}{E}\right)^{s-1},
$$
$h$因子相消（分子$s$个，分母$s - 1 + 1$个）。若对$j = 1, \ldots, s-1$有$\nu_j^\ddagger = \nu_{j+1}$，则乘积之比就是$\nu_1$，于是$k_2 = \nu_1(1 - E_0/E)^{s-1}$：临界振子每个周期尝试断裂一次，按RRK概率成功。因此RRK理论的“频率因子”不是自由参数，而是反应物与过渡态频率之比；过渡态越松（$\nu_j^\ddagger$越低），有效$\nu$就越大，可超过任何真实振动频率——$10^{14}\ \mathrm{s^{-1}}$以上的指前因子正由此而来。
:::
:::

::: exercise RRKM的高压极限就是TST {level=3}
高压下富能量分子处于热平衡，能量服从玻尔兹曼分布$P(E) = \rho(E)e^{-\beta E}/q$，其中$q = \int_0^\infty\rho(E)e^{-\beta E}\,\mathrm{d}E$是反应物的振动配分函数。证明：$k_2$取[[#eq-rrkm]]时，$k_\infty = \int_{E_0}^\infty k_2(E)P(E)\,\mathrm{d}E$等于单分子TST表达式$(k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q)e^{-\beta E_0}$。
::: hint
分部积分；或注意：若态和$N$的导数是态密度$\rho$、其配分函数为$q$，则对任何这样的$N$都有$\int_0^\infty N(x)e^{-\beta x}\,\mathrm{d}x = q/\beta$。
:::
::: solution
代入得$k_\infty = \int_{E_0}^\infty\frac{N^\ddagger(E - E_0)}{h\rho(E)}\cdot\frac{\rho(E)e^{-\beta E}}{q}\,\mathrm{d}E = \frac{e^{-\beta E_0}}{hq}\int_0^\infty N^\ddagger(x)e^{-\beta x}\,\mathrm{d}x$，其中$x = E - E_0$：反应物的态密度消掉了。分部积分，利用$\mathrm{d}N^\ddagger/\mathrm{d}x = \rho^\ddagger$以及$x\to\infty$时$N^\ddagger(x)e^{-\beta x}\to0$（连续处理中$N^\ddagger(0) = 0$；对分立能级，由于$N^\ddagger$是阶梯函数，改用求和得同样结果），
$$
\int_0^\infty N^\ddagger(x)e^{-\beta x}\,\mathrm{d}x = \left[-\frac{N^\ddagger e^{-\beta x}}{\beta}\right]_0^\infty + \frac{1}{\beta}\int_0^\infty\rho^\ddagger(x)e^{-\beta x}\,\mathrm{d}x = \frac{\bar q^{\,\ddagger}}{\beta} .
$$
于是$k_\infty = (k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q)e^{-\beta E_0}$，正是[[#prop-tst]]中单分子步的TST结果（在这一模型中反应物与络合物的转动、平动因子相同，已经相消）。因此RRKM是TST的能量分辨形式，而TST是它的热平均：两个理论作同样的统计假设，只是施于不同的系综。
:::
:::
