普通化学告诉你，大多数速率常数服从$k = A\,e^{-E_\mathrm{a}/RT}$，并暗示了两个常数的可能含义：在常压的气体或液体中，分子每秒碰撞约$10^{10}$次，只有玻尔兹曼意义上极小比例的碰撞携带足够能量，剩下的事归一个"取向因子"管（[[general-chemistry-2/rates-intro]]）。本章把这幅图景讲精确，用真实数字检验它，并观察它在何处失效——因为失效之处才最有趣。我们要从气体的密度和分子大小算出碰撞频率，说明碰撞速率对应一个量级为$10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$的二级速率常数，然后发现实测速率常数可以从这个上限一直低下去二十个数量级以上。我们要从碰撞能量的统计（而不是速率的统计）导出指数$e^{-E_0/RT}$，认识空间因子$P$及其种种尴尬（$P \sim 10^{-6}$的反应，还有一类著名的$P > 1$），最后以机理思想的经典胜利收尾：林德曼（Lindemann）对一个*单分子*反应为何在高压下是一级、而随气体稀薄逐渐滑向二级的解释。自始至终，分子都被当作硬球——这是使一切可算的刻意简化，也是一切日后必须修正的原因。

## 碰撞的计数：频率与密度

::: definition 碰撞频率与碰撞密度 {#def-collision-frequency}
考虑物种$\mathrm{A}$与$\mathrm{B}$的气体，数密度为$n_\mathrm{A}$、$n_\mathrm{B}$（单位体积内的分子数；理想气体$n = p/k_\mathrm{B}T$）。一个$\mathrm{A}$分子的**碰撞频率**$z_\mathrm{A}$是它单位时间内平均遭遇的碰撞次数，单位$\mathrm{s^{-1}}$。**碰撞密度**$Z_\mathrm{AB}$是单位体积单位时间内发生的$\mathrm{A}$–$\mathrm{B}$碰撞的平均次数，单位$\mathrm{m^{-3}\,s^{-1}}$（或$\mathrm{dm^{-3}\,s^{-1}}$）；显然$Z_\mathrm{AB} = \tfrac{1}{2} n_\mathrm{A} z_\mathrm{A}$使每次碰撞只计一次，而对单一物种，类似关系是$Z_\mathrm{AA} = \tfrac{1}{2} n z_\mathrm{A}$，其中因子$\tfrac{1}{2}$防止把对$(i,j)$计两次。碰撞被模型化为直径$d_\mathrm{A}$、$d_\mathrm{B}$的**硬球**：两分子碰撞当且仅当它们的球心接近到$d_\mathrm{AB} = \tfrac{1}{2}(d_\mathrm{A} + d_\mathrm{B})$以内，于是**碰撞截面**为
$$
\sigma = \pi d_\mathrm{AB}^{2},
$$
这是一个具有面积单位的有效靶面积（典型值$10^{-19}$–$10^{-18}\ \mathrm{m^{2}}$，即几十$\mathrm{\AA^{2}}$）。
:::

整个计算系于一个运动学事实：以速度$\mathbf{v}_\mathrm{A}$运动的分子，相对于一个速度为$\mathbf{v}_\mathrm{B}$的$\mathrm{B}$分子，单位时间扫出体积$\sigma\,|\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|$，所以碰撞速率依赖*相对*速率$v_\mathrm{r} = |\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|$，而非各自的速率。由于两个速度是相互独立的麦克斯韦-玻尔兹曼抽样（你在[[general-chemistry-1/gases]]见过速率分布），它们的差本身也服从麦克斯韦-玻尔兹曼分布——只是质量换成**约化质量**
$$
\mu = \frac{m_\mathrm{A} m_\mathrm{B}}{m_\mathrm{A} + m_\mathrm{B}}
$$
而不是任何一个分子的质量。于是平均相对速率为
$$
\langle v_\mathrm{r} \rangle = \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
对同类分子（$\mu = m/2$）它等于平均速率$\langle v \rangle = \sqrt{8 k_\mathrm{B} T / \pi m}$的$\sqrt{2}$倍：一个分子追上同类，比追上静止靶子频繁$\sqrt{2}$倍。

::: proposition 硬球碰撞速率 {#prop-collision-rate}
对温度$T$下处于平衡的硬球气体，
$$
Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B}\, \sigma \left\langle v_\mathrm{r} \right\rangle
= n_\mathrm{A} n_\mathrm{B}\, \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
\qquad
z_\mathrm{A} = n_\mathrm{B}\, \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
而对单一物种$Z_\mathrm{AA} = \tfrac{1}{2} n^{2} \sigma \sqrt{16 k_\mathrm{B} T / \pi m}$（把相对速率显式写出后，$\sqrt{2}$已被吸收）。若*每次*$\mathrm{A}$–$\mathrm{B}$碰撞都生成产物，速率将是$v = Z_\mathrm{AB}$，即二级，其**碰撞速率常数**为
$$
k_\text{coll} = \sigma \left\langle v_\mathrm{r} \right\rangle N_\mathrm{A} \times 10^{-3}\ \text{，单位 } \mathrm{dm^{3}\,mol^{-1}\,s^{-1}},
$$
其中$10^{-3}$把$\mathrm{m^{3}}$化为$\mathrm{dm^{3}}$。室温附近的小分子$k_\text{coll} \sim 10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$：这是任何双分子气相速率常数的天花板，也是衡量每一个实测$A$因子的基准。
:::

::: proof 由相对速度分布求碰撞频率 {#proof-collision-frequency}
让一个以速度$\mathbf{v}_\mathrm{A}$运动的$\mathrm{A}$分子穿过气体；在时间$\mathrm{d}t$内，相对于速度为$\mathbf{v}_\mathrm{B}$的$\mathrm{B}$分子，它扫出体积$\sigma\,|\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|\,\mathrm{d}t$，落在此体积内的$\mathrm{B}$球心即被撞上。对密度为$n_\mathrm{B}$的$\mathrm{B}$分子场取平均，
$$
z_\mathrm{A} = n_\mathrm{B}\,\sigma \int |\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|\, f(\mathbf{v}_\mathrm{B})\,\mathrm{d}^{3}\mathbf{v}_\mathrm{B},
$$
再对$\mathbf{v}_\mathrm{A}$取平均即得$z_\mathrm{A} = n_\mathrm{B}\sigma\langle v_\mathrm{r}\rangle$。剩下的是证明$\langle v_\mathrm{r} \rangle$是按$\mu$的麦克斯韦分布。把联合分布写成两个麦克斯韦-玻尔兹曼因子的乘积，并把变量从$(\mathbf{v}_\mathrm{A}, \mathbf{v}_\mathrm{B})$换为质心速度$\mathbf{V}$与相对速度$\mathbf{v}_\mathrm{r}$；动能分离，
$$
\tfrac{1}{2} m_\mathrm{A} v_\mathrm{A}^{2} + \tfrac{1}{2} m_\mathrm{B} v_\mathrm{B}^{2}
= \tfrac{1}{2} (m_\mathrm{A} + m_\mathrm{B}) V^{2} + \tfrac{1}{2} \mu v_\mathrm{r}^{2},
$$
所以$\mathbf{v}_\mathrm{r}$的分布按质量$\mu$的麦克斯韦-玻尔兹曼分布因子化。该分布下速率的平均值就是把标准结果取质量$\mu$：
$$
\left\langle v_\mathrm{r} \right\rangle
= \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{3/2} \int v_\mathrm{r}\, e^{-\mu v_\mathrm{r}^{2}/2 k_\mathrm{B} T}\, \mathrm{d}^{3}\mathbf{v}_\mathrm{r}
= 4\pi \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{3/2} \int_0^\infty v_\mathrm{r}^{3} e^{-\mu v_\mathrm{r}^{2}/2 k_\mathrm{B} T}\, \mathrm{d}v_\mathrm{r}
= \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
用到$\int_0^\infty x^{3} e^{-a x^{2}}\,\mathrm{d}x = 1/2a^{2}$。把$z_\mathrm{A}$乘以$n_\mathrm{A}$再除以2（$\mathrm{A} = \mathrm{B}$时每次碰撞有两个参与者）得$Z_\mathrm{AA} = \tfrac{1}{2} n^{2} \sigma \langle v_\mathrm{r} \rangle$，其中$\langle v_\mathrm{r} \rangle = \sqrt{16 k_\mathrm{B} T / \pi m}$；而$Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B} \sigma \langle v_\mathrm{r} \rangle$没有因子$\tfrac{1}{2}$，因为$\mathrm{A}$–$\mathrm{B}$对可区分，从$\mathrm{A}$一侧计数恰好产生一次。
:::

::: example $\mathrm{298\ K}$下NO的碰撞频率与碰撞上限 {#ex-z-no}
一氧化氮是$M = 30.0\ \mathrm{g\,mol^{-1}}$的小型稳定自由基。取硬球直径$d = 0.35\ \mathrm{nm}$（轻双原子分子由黏度数据得到的代表值），计算$\mathrm{25.0\,^\circ C}$、$p = 1.00\ \mathrm{bar}$下纯$\mathrm{NO}$的：(a) 数密度；(b) 一对$\mathrm{NO}$分子的平均相对速率；(c) 单个分子的碰撞频率$z$；(d) 碰撞密度$Z$；(e) 若每次碰撞都反应将观测到的速率常数$k_\text{coll}$，以及纯气体对应的反应速率。
::: solution
(a) 理想气体，$T = 298.15\ \mathrm{K}$：
$$
n = \frac{p}{k_\mathrm{B} T} = \frac{1.00\times10^{5}\ \mathrm{Pa}}{1.381\times10^{-23}\ \mathrm{J\,K^{-1}} \times 298.15\ \mathrm{K}} = 2.43\times10^{25}\ \mathrm{m^{-3}}.
$$
(b) 单个分子质量$m = 0.0300\ \mathrm{kg\,mol^{-1}} / 6.022\times10^{23}\ \mathrm{mol^{-1}} = 4.98\times10^{-26}\ \mathrm{kg}$，故$\mu = m/2 = 2.49\times10^{-26}\ \mathrm{kg}$，
$$
\left\langle v_\mathrm{r} \right\rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 298.15}{\pi \times 2.49\times10^{-26}}} = 649\ \mathrm{m\,s^{-1}},
$$
即$\sqrt{2} \times 459\ \mathrm{m\,s^{-1}}$，其中$\sqrt{2}$就是同类分子因子。
(c) 由$\sigma = \pi d^{2} = \pi (3.5\times10^{-10}\ \mathrm{m})^{2} = 3.85\times10^{-19}\ \mathrm{m^{2}}$，
$$
z = n \sigma \langle v_\mathrm{r} \rangle = 2.43\times10^{25} \times 3.85\times10^{-19} \times 649 = 6.1\times10^{9}\ \mathrm{s^{-1}}.
$$
一个分子每秒碰撞约六十亿次——平均碰撞间隔$1.6\times10^{-10}\ \mathrm{s}$，即自由程只有几个分子直径。
(d)
$$
Z = \tfrac{1}{2} n^{2} \sigma \langle v_\mathrm{r} \rangle = \tfrac{1}{2} \times \left(2.43\times10^{25}\right)^{2} \times 3.85\times10^{-19} \times 649 = 7.4\times10^{34}\ \mathrm{m^{-3}\,s^{-1}},
$$
即$7.4\times10^{31}\ \mathrm{dm^{-3}\,s^{-1}}$。
(e) 换算成摩尔单位，$k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3} = 3.85\times10^{-19} \times 649 \times 6.022\times10^{23} \times 10^{-3} = 1.5\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。纯气体的$[\mathrm{NO}] = n / N_\mathrm{A} \times 10^{-3} = 0.0403\ \mathrm{mol\,dm^{-3}}$，所以"每次碰撞都反应"意味着$v = k_\text{coll} [\mathrm{NO}]^{2} = 1.5\times10^{11} \times (0.0403)^{2} = 2.4\times10^{8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$——烧瓶里的东西将在纳秒内反应殆尽。
:::
:::

保留三位有效数字，是因为$d$只给到两位而其余计算是精确的；单是$d$本身的不确定度就有$\pm 10$–$20\ \%$，这正是碰撞理论只能当作数量级上限、而非预言来读的原因。实测气相速率常数的跨度，从与$k_\text{coll}$相差不到十倍（自由基复合、$\mathrm{NO + O_3}$）一直到稳定分子的$10^{-10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$以下——这二十个数量级的散布，$Z$或任何计数论证都给不出来。能给出它的是两条分子性质：一条能量的阈值，一条几何的。

## 能量阈值：指数从何而来

碰撞是两分子沿球心连线的一次短暂压缩。只有*沿这条中心连线方向*的动能才可能被花掉、把双方推过重排；横向"擦边"方向的能量原封不动地被带走。碰撞理论因此假设一个阈值：反应发生当且仅当沿中心连线的能量$\varepsilon_1$超过临界值$\varepsilon_0$（摩尔阈值$E_0 = N_\mathrm{A} \varepsilon_0$）。

::: proposition 玻尔兹曼阈值分数 {#prop-energy-threshold}
温度为$T$的气体中，沿中心连线能量超过$\varepsilon_0$的*碰撞*分数为
$$
f = e^{-\varepsilon_0 / k_\mathrm{B} T} = e^{-E_0 / RT},
$$
对$\varepsilon_1$的碰撞加权分布而言这是精确的。于是反应性碰撞密度为$Z_\mathrm{AB}^{\,*} = Z_\mathrm{AB}\, e^{-E_0/RT}$，硬球碰撞理论预言的速率常数为
$$
k = \sigma \left\langle v_\mathrm{r} \right\rangle N_\mathrm{A} \times 10^{-3}\, e^{-E_0 / RT} \;\propto\; T^{1/2}\, e^{-E_0 / RT}.
$$
阿伦尼乌斯指数不是关于分子行为的假设——它是把平衡统计用于*碰撞坐标上*可用的能量所得的定理。
:::

::: proof 由碰撞能量分布求阈值分数 {#proof-threshold-fraction}
陷阱在于必须对*碰撞*取平均，而不是对分子取平均，而碰撞并不是分子的随机样本：快分子每秒制造的碰撞比慢分子多，正比于$v_\mathrm{r}$。设$\varepsilon_1 = \tfrac{1}{2}\mu v_1^{2}$为沿中心连线的能量，即$\mathbf{v}_\mathrm{r}$在中心连线上的投影分量。关于麦克斯韦-玻尔兹曼相对速度有两个事实（前一个证明块已证）：它的三个直角分量是相互独立的高斯分布，所以$v_1$服从1维麦克斯韦分布，
$$
g(v_1)\,\mathrm{d}v_1 = \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{1/2} e^{-\mu v_1^{2} / 2 k_\mathrm{B} T}\, \mathrm{d}v_1,
$$
而$v_1 \in (v_1, v_1 + \mathrm{d}v_1)$的分子对碰撞速率的贡献正比于$v_1\, g(v_1)\,\mathrm{d}v_1$——多出的因子$v_1$就是扫掠速率加权。换元到$\varepsilon_1$：由$v_1 = \sqrt{2\varepsilon_1/\mu}$及$\mathrm{d}v_1 = \mathrm{d}\varepsilon_1 / \sqrt{2\mu\varepsilon_1}$，密度化为$g \propto e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1 / \sqrt{\varepsilon_1}$，再乘上扫掠权重$v_1 \propto \sqrt{\varepsilon_1}$，$\varepsilon_1^{-1/2}$恰好被抵消：
$$
v_1\, g(v_1)\, \mathrm{d}v_1 \;\propto\; e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1
\qquad\Longrightarrow\qquad
\text{碰撞加权密度 } \frac{1}{k_\mathrm{B} T}\, e^{-\varepsilon_1 / k_\mathrm{B} T},
$$
它在$[0, \infty)$上已归一化。因此超过阈值的碰撞分数为
$$
f = \int_{\varepsilon_0}^{\infty} \frac{1}{k_\mathrm{B} T} e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1 = e^{-\varepsilon_0 / k_\mathrm{B} T},
$$
没有任何近似。（若问的是$\varepsilon_1 > \varepsilon_0$的*分子*分数而非碰撞分数，缺了$v_1$权重就只剩$\operatorname{erfc}\!\sqrt{\varepsilon_0 / k_\mathrm{B} T}$——接近，但不是干净的指数。指数属于碰撞。）把$Z_\mathrm{AB}$乘以$f$得反应性碰撞密度，再用$\langle v_\mathrm{r} \rangle \propto T^{1/2}$即得$k \propto T^{1/2} e^{-E_0 / RT}$。
:::

::: example 两个温度下的反应性碰撞分数 {#ex-threshold-fraction}
对阈值$E_0 = 75\ \mathrm{kJ\,mol^{-1}}$的反应，计算$\mathrm{26.85\,^\circ C}$（$300.0\ \mathrm{K}$）与$310.0\ \mathrm{K}$下反应性碰撞的分数，以及它增大的倍数。再算$800\ \mathrm{K}$下的分数以作对比。
::: solution
$300.0\ \mathrm{K}$时，$E_0 / RT = 75\,000 / (8.314 \times 300.0) = 30.07$，故
$$
f(300) = e^{-30.07} = 8.7\times10^{-14}.
$$
$310.0\ \mathrm{K}$时，$E_0 / RT = 29.10$，$f(310) = e^{-29.10} = 2.3\times10^{-13}$。两者之比为
$$
\frac{f(310)}{f(300)} = \exp\!\left[-\frac{E_0}{R}\left(\frac{1}{310.0} - \frac{1}{300.0}\right)\right] = e^{0.966} = 2.6,
$$
所以升温$10\ \mathrm{K}$使反应性碰撞分数——从而也使$k$（$Z$只动$1.7\ \%$）——增大$2.6$倍："每$10\ \mathrm{K}$翻倍"的口诀是阈值分数在说话，不是碰撞频率。$800\ \mathrm{K}$时，$E_0 / RT = 11.28$，$f = 1.3\times10^{-5}$：仍是$76\,000$次碰撞才有一次，这就是即便相当宽松的阈值也使绝大多数碰撞不反应的原因。
:::
:::

取两位有效数字是合理的，因为$E_0$只给到两位；注意指数对阈值的惩罚何等严厉：$E_0 = 75\ \mathrm{kJ\,mol^{-1}}$只是中等势垒（约四分之一个C–C键），却使$10^{14}$次碰撞中有$10^{13}$次失去资格。

::: widget plot
f: exp(-E0*1000/(8.314*x))
x: 250, 1200
y: 0, 1
sliders: E0=75:20:150:5
labels: \text{超过 } E_0 \text{ 的碰撞分数}
caption: 玻尔兹曼阈值分数$f = e^{-E_0/RT}$随温度的变化，阈值$E_0$以$\mathrm{kJ\,mol^{-1}}$计、由滑块设定。曲线是关于$T$轴的指数：低温下几乎平坦、与零难分彼此，一旦$RT$成为$E_0$的可观分数便陡升。把$E_0$从$20$滑到$150\ \mathrm{kJ\,mol^{-1}}$，看整条曲线如何沿温度轴平移——阈值改变$20\ \mathrm{kJ\,mol^{-1}}$，就把$f \approx 10^{-8}$对应的温度移动约$100\ \mathrm{K}$。势垒高于$\sim 80\ \mathrm{kJ\,mol^{-1}}$的反应"在室温下不反应"、燃烧需要火花，道理全在这条曲线里。
:::
## 空间因子：$A$ 不是 $Z$

即便越过能量阈值这一关，多原子分子的多数碰撞仍因几何原因失败：分子必须以正确的原子、正确的相对取向相触。理论的经验补救是写成

::: definition 空间（取向）因子 {#def-steric-factor}
**空间因子**或**取向因子**$P$，是实测阿伦尼乌斯指前因子（在同一温度下换算到碰撞频率标度）与硬球碰撞值之比：
$$
P = \frac{A_\text{obs}}{k_\text{coll}} \times \text{（小的 } T\text{ 修正）},
\qquad
k = P\, Z_\mathrm{AB}\, e^{-E_0 / RT} \text{（单位浓度下）}.
$$
若各取向同等易反应，$P \to 1$；若反应要求狭窄的接近方向锥，$P \ll 1$。实测值跨度极大：原子–原子复合及$\mathrm{H + H_2}$的$P \approx 1$；许多自由基与小自由基反应的$P \sim 0.1$–$0.5$（教科书经典案例是$\mathrm{NOCl}$的分解与$\mathrm{NO_2}$的反应，其反应位点占分子表面的很大一块）；$\mathrm{H_2 + C_2H_4 \rightarrow C_2H_6}$的$P \sim 10^{-6}$，因为$\pi$键加氢要求硬球无法表达的近碰撞对几何；以及——丑闻——鱼叉反应$\mathrm{K + CH_3I \rightarrow KI + CH_3}$的$P > 1$，其电子在约$1\ \mathrm{nm}$间距处就完成跳跃，远在接触距离之外，故*真实*截面是硬球值的数倍。
:::

::: example 由实测$A$因子求空间因子 {#ex-steric-factor}
考虑双原子分子（$M = 28\ \mathrm{g\,mol^{-1}}$）与三原子分子（$M = 44\ \mathrm{g\,mol^{-1}}$）之间的气相双分子反应，实测阿伦尼乌斯参数为$E_\mathrm{a} = 55\ \mathrm{kJ\,mol^{-1}}$、$A = 1.2\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（一张好的阿伦尼乌斯图常给出这类示例值）。用硬球参数$d_\mathrm{AB} = 0.40\ \mathrm{nm}$估算$\mathrm{400\ K}$下的$P$。
::: solution
约化质量：$\mu = (28 \times 44)/(28 + 44)\ \mathrm{g\,mol^{-1}} = 17.1\ \mathrm{g\,mol^{-1}} = 2.84\times10^{-26}\ \mathrm{kg}$（每分子对）。$400\ \mathrm{K}$下的平均相对速率：
$$
\left\langle v_\mathrm{r} \right\rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 400}{\pi \times 2.84\times10^{-26}}} = 704\ \mathrm{m\,s^{-1}}.
$$
截面$\sigma = \pi (4.0\times10^{-10}\ \mathrm{m})^{2} = 5.03\times10^{-19}\ \mathrm{m^{2}}$，故
$$
k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3}
= 5.03\times10^{-19} \times 704 \times 6.022\times10^{23} \times 10^{-3}
= 2.1\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
于是
$$
P = \frac{A}{k_\text{coll}} = \frac{1.2\times10^{9}}{2.1\times10^{11}} = 5.6\times10^{-3}.
$$
在能量足够的碰撞中，约$180$次才有一次几何正确。几个$10^{-3}$的$P$是中等分子需要某种特定端向接近时的典型值；正确的解读不是"理论失败了"，而是"硬球太圆了"。
:::
:::

::: warning 阿伦尼乌斯$A$不是碰撞频率 {#warn-A-not-Z}
人们很容易把"$A = PZ$"挂在嘴边，仿佛$A$是实测的碰撞速率、$P$是一个整齐的概率。要抵制。第一，$A$是*外推值*：$\ln k$对$1/T$拟合的截距，而由于$k \propto T^{1/2} e^{-E_0/RT}$而非$e^{-E_\mathrm{a}/RT}$，拟合出的$A$吸收了$T^{1/2}$依赖和一个因子$e^{1/2}$——把$A$与$Z$相比较只在几倍的意义上有意义。第二，$P$不受1约束：长程吸引（鱼叉机理、具有朗之万俘获截面的离子–分子反应）给出$P > 1$；而$P \ll 1$也可能不指向几何而指向*隐藏的机理*——携带大有效$A$的链反应，或必须先耗散能量才能反应的稳定碰撞络合物。第三，溶液中的反应，碰撞图景被扩散控制取代，其上限约为$10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。碰撞理论是"上限加两个修正"的框架；把每一个引用的$P$当作诊断书，而不是自然常数。
:::

::: proposition 温度依赖：$k \propto T^{1/2} e^{-E_0/RT}$与$E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$ {#prop-temperature-dependence}
硬球碰撞理论预言
$$
k(T) = \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}}\, N_\mathrm{A} \times 10^{-3}\, P\, e^{-E_0 / RT} \;\propto\; T^{1/2}\, e^{-E_0 / RT}.
$$
按$E_\mathrm{a} = -\mathrm{d}\ln k / \mathrm{d}(1/T)$定义的阿伦尼乌斯活化能于是为
$$
E_\mathrm{a} = E_0 + \tfrac{1}{2} R T,
$$
所以在$300\ \mathrm{K}$，实测$E_\mathrm{a}$只比碰撞阈值$E_0$大$1.2\ \mathrm{kJ\,mol^{-1}}$——远小于大多数反应的化学不确定度，这就是$T^{1/2}$指前因子在阿伦尼乌斯图上不可见、碰撞理论虽有此因子却从未被活化能*证伪*、只被$A$因子难倒的原因。（过渡态理论对双分子反应给出类似关系$E_\mathrm{a} = \Delta^\ddagger H + 2RT$；见[[kinetics/transition-state-theory]]。）
:::

::: widget plot
f: sqrt(x/300)*exp(-E*1000/8.314*(1/x - 1/300)); exp(-(E + 1.25)*1000/8.314*(1/x - 1/300))
x: 250, 600
sliders: E=75:40:120:5
labels: \text{碰撞理论 } T^{1/2} e^{-E_0/RT}; \text{阿伦尼乌斯 } e^{-E_a/RT}
caption: 两条归一化到$300\ \mathrm{K}$同一值的温度依赖曲线：碰撞理论形式$T^{1/2} e^{-E_0 / RT}$，以及取$E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$的纯阿伦尼乌斯形式$e^{-E_\mathrm{a} / RT}$，$E_0$以$\mathrm{kJ\,mol^{-1}}$计、由滑块设定。在任何实验温度区间内两条曲线视觉上无法区分——$T^{1/2}$被指数淹没——这正是$T^{1/2}$指前因子非要等到过渡态理论与分子束实验才谈得上被观测的原因。这张图的教训是否定而重要的：阿伦尼乌斯图无法在这些机理之间做出判别，所以$\ln k$对$1/T$成直线只是*存在*势垒的证据，绝不是碰撞理论特有的证据。
:::

## 单分子反应：林德曼–欣谢尔伍德机理

一级反应——$\mathrm{N_2O_5}$分解、环丁烷开环、顺反异构化——速率常数以$\mathrm{s^{-1}}$计、服从指数律，因而被称为*单分子*的。但一个孤立的分子无法通过与自身反应而分解：必须先有什么*把跨越势垒所需的能量交给它*，那个"什么"就是碰撞。1921–1922年，林德曼（Lindemann）看出了后果：若活化是双分子的而反应是单分子的，那么把气体抽稀必然改变观测级数。机理是

$$
\mathrm{A + M} \xrightarrow{\;k_1\;} \mathrm{A^{*} + M}
\qquad
\mathrm{A^{*} + M} \xrightarrow{\;k_{-1}\;} \mathrm{A + M}
\qquad
\mathrm{A^{*}} \xrightarrow{\;k_2\;} \mathrm{products},
$$

其中$\mathrm{A^{*}}$是被激发到反应阈值之上的分子（经由与任第三体$\mathrm{M}$——可以是另一个$\mathrm{A}$——的碰撞），$k_1$与$k_{-1}$是二级的活化与去活化速率常数，$k_2$是一级的反应步。

::: proposition 林德曼–欣谢尔伍德速率方程 {#prop-lindemann}
对$\mathrm{A^{*}}$施加稳态近似得
$$
\frac{\mathrm{d}[\mathrm{A^{*}}]}{\mathrm{d}t} = k_1 [\mathrm{A}][\mathrm{M}] - k_{-1}[\mathrm{A^{*}}][\mathrm{M}] - k_2 [\mathrm{A^{*}}] = 0
\qquad\Longrightarrow\qquad
v = k_2[\mathrm{A^{*}}] = \frac{k_1 k_2\,[\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2},
$$
故观测的一级速率常数为
$$
k_\text{obs} = \frac{v}{[\mathrm{A}]} = \frac{k_1 k_2 [\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2}
= \frac{k_\infty\,[\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}},
\qquad k_\infty = \frac{k_1}{k_{-1}}\, k_2 .
$$
两个极限：**高压**（$[\mathrm{M}]$大）下去活化在分母中压过$k_2$，活化–去活化构成快速前置平衡，$k_\text{obs} \rightarrow k_\infty$：真正的一级，$k_\infty = K^{\ddagger}_{\text{act}} k_2$即高压极限。**低压**下每次活化事件都活到反应发生（$k_2 \gg k_{-1}[\mathrm{M}]$），$k_\text{obs} \rightarrow k_1[\mathrm{M}] \equiv k_0[\mathrm{M}]$：反应变为**二级**，其速率受限于碰撞向激发群输送能量的快慢。两极限之间，$k_\text{obs}$随压强下降——**降压区（fall-off）**——而$k_\text{obs} = \tfrac{1}{2}k_\infty$处的浓度为$[\mathrm{M}] = k_2 / k_{-1} = k_\infty / k_0$。
:::

::: proof 激发分子的稳态浓度 {#proof-lindemann}
对$[\mathrm{A^{*}}]$的平衡式令其生成速率$k_1[\mathrm{A}][\mathrm{M}]$等于两条消失途径之和：碰撞去活化$k_{-1}[\mathrm{A^{*}}][\mathrm{M}]$与反应$k_2[\mathrm{A^{*}}]$。令总和为零（稳态近似，其成立条件是$[\mathrm{A^{*}}] \ll [\mathrm{A}]$，即只玻尔兹曼意义上极小的分数被激发），解出
$$
[\mathrm{A^{*}}] = \frac{k_1 [\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2},
\qquad
v = k_2 [\mathrm{A^{*}}] = \frac{k_1 k_2 [\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2}.
$$
分子分母同除以$k_{-1}$：
$$
v = \frac{(k_1 / k_{-1})\, k_2\,[\mathrm{A}][\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}},
$$
直接显出$k_\infty = (k_1 / k_{-1}) k_2$：活化的平衡常数$k_1/k_{-1}$（由于活化在微观上可逆，它是真正的平衡常数）乘以激发分子反应的速率。两极限之比为
$$
\frac{k_\infty}{k_0} = \frac{k_1 k_2 / k_{-1}}{k_1} = \frac{k_2}{k_{-1}},
$$
一个一级除以二级之比，具有浓度单位——即上面引用的半压浓度$[\mathrm{M}]_{1/2}$。把$[\mathrm{M}] = k_2/k_{-1}$代入$k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$即得$k_\infty / 2$，如所声称。
:::
::: example 林德曼降压区：$k_\infty$、$k_0$与半压 {#ex-lindemann}
$600\ \mathrm{K}$下一个示例性单分子气相反应，高压极限$k_\infty = 3.0\times10^{4}\ \mathrm{s^{-1}}$，低压极限$k_0 = 2.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（碰撞控制的活化，符合预期）。取$k_2 = 6.0\times10^{13}\ \mathrm{s^{-1}}$。求(a) 活化平衡常数$k_1 / k_{-1}$；(b) 使$k_\text{obs} = \tfrac{1}{2}k_\infty$的浓度与压强；(c) $[\mathrm{M}] = 1.0\times10^{-5}$与$1.0\times10^{-7}\ \mathrm{mol\,dm^{-3}}$处的$k_\text{obs}$。
::: solution
(a) 由$k_\infty = (k_1 / k_{-1}) k_2$，
$$
\frac{k_1}{k_{-1}} = \frac{k_\infty}{k_2} = \frac{3.0\times10^{4}}{6.0\times10^{13}} = 5.0\times10^{-10}.
$$
活化在压倒性程度上是不利的——约$2\times10^{9}$对碰撞对中只有一对处于阈值之上——而这个微小的平衡常数正是改头换面的玻尔兹曼因子$e^{-E_0 / RT}$。
(b) $[\mathrm{M}]_{1/2} = k_\infty / k_0 = 3.0\times10^{4} / 2.0\times10^{10} = 1.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$。换算成$600\ \mathrm{K}$下的压强，
$$
p = [\mathrm{M}]_{1/2} RT = 1.5\times10^{-3}\ \mathrm{mol\,m^{-3}} \times 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 600\ \mathrm{K} = 7.5\ \mathrm{Pa},
$$
相当高的真空：同一种气体在大气压下深处一级区，降压区要在压强再降十万倍之后才出现。
(c) 由$k_\text{obs} = k_\infty [\mathrm{M}]/([\mathrm{M}] + 1.5\times10^{-6})$：
$$
k_\text{obs}(1.0\times10^{-5}) = \frac{3.0\times10^{4} \times 1.0\times10^{-5}}{1.15\times10^{-5}} = 2.6\times10^{4}\ \mathrm{s^{-1}},
\qquad
k_\text{obs}(1.0\times10^{-7}) = \frac{3.0\times10^{4} \times 1.0\times10^{-7}}{1.6\times10^{-6}} = 1.9\times10^{3}\ \mathrm{s^{-1}}.
$$
第一点接近平台（$k_\infty$的87 %）；第二点接近低压极限，那里$k_0[\mathrm{M}] = 2.0\times10^{10} \times 1.0\times10^{-7} = 2.0\times10^{3}\ \mathrm{s^{-1}}$——去活化项正变得可以忽略，$k_\text{obs}$几乎正比于$[\mathrm{M}]$。
:::
:::

::: widget plot
f: x/(1 + x); 1/(1 + x)
x: 0, 10
y: 0, 1.1
labels: k_\text{obs} / k_\infty; k_\text{obs} / k_0[\mathrm{M}]
caption: 林德曼降压区$k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$，对约化压强$x = [\mathrm{M}]\, k_{-1} / k_2$作图（故$x = 1$即半压）。上方曲线$x/(1+x)$是$k_\text{obs}$占高压极限的分数：低压下对$x$线性（二级区，每次活化都反应），$x \approx 10$以上趋平于1（真正的一级）。下方曲线$1/(1+x)$是低压直线$k_0[\mathrm{M}]$的存活分数——它显示去活化多么早就开始偷走激发分子。两条曲线在$x = 1$相交：每两次活化有一次以反应告终。$\log k_\text{obs}$对$\log p$呈此形状、在两平台之间斜率整整弯出一个数量级的图，就是该机理的实验指纹。
:::

::: warning 一级反应未必单分子——单分子反应也未必一级 {#warn-unimolecular}
级数与分子数回答的是不同问题：级数是测出来的，分子数是关于基元步的陈述。林德曼机理把这种分离定量化了——*同一个*反应高压下一级、低压下二级——所以"服从一级动力学"永远证明不了单分子步。相反方向的失效更微妙：林德曼机理照字面直推，预言$k_\text{obs}$随压强单调升至$k_\infty$，但真实数据在中等压强下把$k_\text{obs}$落在林德曼曲线*下方*，因为活化不是简单的开/关电闸：分子需要把能量放进*正确的键*，并且需要足够密集的相继碰撞在反应发生之前把能量定域在那里。这一修正就是卡塞尔-赖斯-拉姆斯佩格-卡塞尔（KRRK）理论与马库斯（Marcus）的RRKM理论：它们用一个阈值*加上*振动态密度$k_2(\varepsilon)$取代单一阈值$\varepsilon_0$——这是[[kinetics/reaction-dynamics]]与统计速率理论的主题。降压区还携带浴气效率的压强依赖：重的多原子$\mathrm{M}$的能量转移远优于氦，半压随之移动。
:::

::: quiz
按林德曼理论，单分子反应的$k_\text{obs}$为什么在低压下变得正比于压强？
- [x] 因为在低压下$\mathrm{A^{*}}$的碰撞去活化比反应更罕见，每次活化事件都走向产物，速率由活化速率$k_1[\mathrm{A}][\mathrm{M}]$控制。
- [ ] 因为$k_2$本身随气体稀薄而减小。
- [ ] 因为阈值能$E_0$随气体稀薄而增大。
- [ ] 因为稳态近似在低压下失效，无法做任何预言。
::: solution
在$k_\text{obs} = k_1 k_2[\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$中，竞争发生在$\mathrm{A^{*}}$的去活化（$k_{-1}[\mathrm{M}]$）与反应（$k_2$）之间。当$[\mathrm{M}] \rightarrow 0$，$k_{-1}[\mathrm{M}]$项消失，$k_\text{obs} \rightarrow k_1[\mathrm{M}]$，观测速率$k_1[\mathrm{A}][\mathrm{M}]$为二级：被激发的分子*必定*反应，但激发事件稀少且控制速率。$k_2$与$E_0$是分子性质，不在乎压强（选项2与3）；稳态近似在低压下其实成立得*更好*（选项4）。
:::
:::

::: history
特拉茨（Trautz）在1916至1918年间对碱金属蒸气反应（尤其是$\mathrm{2\,Ag + 2\,HI \rightarrow 2\,AgI + H_2}$）的一系列实验中，第一个*测量*碰撞速率并与反应速率相比较，发现原子–原子反应在几倍之内相符，从而确立了碰撞理论的纲领；博登斯坦（Bodenstein）课题组提供了供比较之用的反应速率数据。刘易斯（Lewis）在其1918年的著作《A System of Physical Chemistry》中把气体动理论机器教科书化，为真实气体计算$Z$，并提出分子必须"以正确的方式相撞"。林德曼（Lindemann）于1921年提出、并在1922年的《Philosophical Magazine》论文及其著作《The Theory of Speeds of Chemical Reactions》中发展了以他命名的机理；欣谢尔伍德（Hinshelwood）——他与卡塞尔（Kassel）在1926–1928年间将其精炼为激发分子的KRRK理论——从同一思想出发建立了赢得1956年诺贝尔化学奖的链反应与爆炸极限理论。单分子速率理论的定量化拯救来自马库斯（Marcus）1951–1952年的工作，他对振动态的过渡态计数（RRKM）先于并独立地重现了艾林（Eyring）以及埃文斯（Evans）与波兰尼（Polanyi）的过渡态理论。
:::

## 后续内容

碰撞理论是第一个*定量化*的速率常数分子理论，而它的两处失败正是其后一切事物的种子。阈值图景存活了下来，但锋利的中心连线判据被[[kinetics/transition-state-theory]]的活化络合物取代：后者由配分函数之比计算$k$，预言$E_\mathrm{a} = \Delta^\ddagger H + 2RT$与活化熵（$P$的热力学表亲）。林德曼机理是一切"中间体被稳态维持"的机理的原型——你在$\mathrm{A^{*}}$上用过的同一套代数，会出现在[[kinetics/chain-reactions]]的自由基链和酶络合物上——而它的降压区是通往[[kinetics/reaction-dynamics]]中统计与量子理论的门户：在那里，$k_2(\varepsilon)$、能量转移、直至态-态截面都在分子束上直接测量。$Z$、$P$与$E_0$的记账法也会改头换面地重现于[[kinetics/surface-kinetics]]（撞向表面的碰撞通量）与[[kinetics/homogeneous-catalysis]]。

::: summary
- 硬球碰撞理论给出碰撞频率$z_\mathrm{A} = n_\mathrm{B}\sigma\sqrt{8 k_\mathrm{B} T / \pi \mu}$与碰撞密度$Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B} \sigma \langle v_\mathrm{r} \rangle$，其中$\sigma = \pi d_{\mathrm{AB}}^{2}$、$\mu$为约化质量；同类分子带来因子$\sqrt{2}$，$Z_\mathrm{AA}$带来因子$\tfrac{1}{2}$。
- 碰撞速率常数在室温约为$k_\text{coll} \sim 10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$：双分子气相反应的天花板，一切实测$A$因子都拿它来衡量。
- 沿中心连线能量超过$E_0$的碰撞分数恰为$e^{-E_0 / RT}$——阿伦尼乌斯指数是碰撞统计的定理，由碰撞扫掠速率对1维麦克斯韦分布加权而得。
- 碰撞理论预言$k \propto T^{1/2} e^{-E_0 / RT}$、$E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$；$T^{1/2}$实际上不可见，故阿伦尼乌斯图无法检验该理论。
- 空间因子$P = A_\text{obs} / k_\text{coll}$从$\sim 1$（原子）经$10^{-6}$（$\mathrm{H_2 + C_2H_4}$）一直到$>1$（鱼叉、离子–分子俘获）：$A$不是$Z$，而$P$诊断的是几何、机理，或两者兼有。
- 林德曼的碰撞活化加稳态近似给出$k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$：高压一级，低压二级（$k_0[\mathrm{M}]$），在$[\mathrm{M}] = k_\infty / k_0$处为$k_\infty$之半。
- 从一级到二级的降压是"写机理而非写级数"的经典胜利，其定量失败（KRRK/RRKM）指向[[kinetics/reaction-dynamics]]。
:::

## 练习

::: exercise 氢的碰撞频率 {level=1 check="1.4"}
计算$\mathrm{25.0\,^\circ C}$、$1.00\ \mathrm{bar}$纯氢中单个$\mathrm{H_2}$分子的碰撞频率$z$，把分子当作直径$d = 0.27\ \mathrm{nm}$的硬球（$M = 2.016\ \mathrm{g\,mol^{-1}}$）。（以$10^{8}\ \mathrm{s^{-1}}$为单位输入$z$。）
::: solution
$n = p / k_\mathrm{B} T = 1.00\times10^{5} / (1.381\times10^{-23} \times 298.15) = 2.43\times10^{25}\ \mathrm{m^{-3}}$。每个分子$m = 0.002016 / 6.022\times10^{23} = 3.35\times10^{-28}\ \mathrm{kg}$，$\mu = m/2 = 1.67\times10^{-28}\ \mathrm{kg}$，故
$$
\langle v_\mathrm{r} \rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 298.15}{\pi \times 1.67\times10^{-28}}} = 2.50\times10^{3}\ \mathrm{m\,s^{-1}}.
$$
由$\sigma = \pi (2.7\times10^{-11}\ \mathrm{m})^{2} = 2.29\times10^{-21}\ \mathrm{m^{2}}$，
$$
z = n \sigma \langle v_\mathrm{r} \rangle = 2.43\times10^{25} \times 2.29\times10^{-21} \times 2.50\times10^{3} = 1.4\times10^{8}\ \mathrm{s^{-1}}.
$$
尽管热运动速度快，轻分子在同一$T$、$p$下反而比重分子碰撞得更少，因为它们的硬球靶更小：$1.4\times10^{8}$对$\mathrm{NO}$的$6.1\times10^{9}\ \mathrm{s^{-1}}$。
:::
:::

::: exercise $400\ \mathrm{K}$下的反应性碰撞分数 {level=1 check="1.8"}
对阈值$E_0 = 90\ \mathrm{kJ\,mol^{-1}}$的反应，$400\ \mathrm{K}$下有多大比例的碰撞超过中心连线方向的阈值？（输入$10^{12} f$。）
::: solution
$E_0 / RT = 90\,000 / (8.314 \times 400) = 27.06$，故$f = e^{-27.06} = 1.8\times10^{-12}$：输入$1.8$。$10^{12}$次碰撞中只有两次——在$90\ \mathrm{kJ\,mol^{-1}}$下，除非隧穿或催化路径打开，反应在$400\ \mathrm{K}$是"关闭"的。升温到$800\ \mathrm{K}$得$e^{-13.53} = 1.3\times10^{-6}$，反应性碰撞多$7\times10^{5}$倍。
:::
:::

::: exercise 原子–原子相遇的碰撞速率常数 {level=1 check="8.8"}
两个原子，约化质量$\mu = 40\ \mathrm{u}$，碰撞直径$d_\mathrm{AB} = 0.30\ \mathrm{nm}$，在$500\ \mathrm{K}$相遇。计算碰撞速率常数$k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3}$。（以$10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$为单位输入$k_\text{coll}$。）
::: solution
$\mu = 40 \times 1.661\times10^{-27}\ \mathrm{kg} = 6.64\times10^{-26}\ \mathrm{kg}$；
$\langle v_\mathrm{r} \rangle = \sqrt{8 \times 1.381\times10^{-23} \times 500 / (\pi \times 6.64\times10^{-26})} = 515\ \mathrm{m\,s^{-1}}$；
$\sigma = \pi (3.0\times10^{-10}\ \mathrm{m})^{2} = 2.83\times10^{-19}\ \mathrm{m^{2}}$。于是
$$
k_\text{coll} = 2.83\times10^{-19} \times 515 \times 6.022\times10^{23} \times 10^{-3} = 8.8\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
原子–原子复合的实测值与此相差几倍以内（由第三体带走键能），这就是其$P$被说成"约等于1"的原因。
:::
:::

::: exercise 阈值与活化能 {level=2 check="61.5"}
对阈值$E_0 = 60\ \mathrm{kJ\,mol^{-1}}$的硬球反应，$350\ \mathrm{K}$下的阿伦尼乌斯活化能$E_\mathrm{a}$是多少？（以$\mathrm{kJ\,mol^{-1}}$输入$E_\mathrm{a}$。）
::: solution
$E_\mathrm{a} = E_0 + \tfrac{1}{2} R T = 60 + \tfrac{1}{2} \times 8.314 \times 350 / 1000 = 60 + 1.46 = 61.5\ \mathrm{kJ\,mol^{-1}}$。修正只占$E_0$的$2.4\ \%$——比几乎任何测量的不确定度都小，这正是碰撞理论的$T^{1/2}$指前因子隐藏一个世纪的定量原因。
:::
:::

::: exercise 慢双分子反应的空间因子 {level=2 check="0.015"}
某双分子气相反应$\mu = 20\ \mathrm{u}$、$d_\mathrm{AB} = 0.45\ \mathrm{nm}$，$A = 4.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。估算$450\ \mathrm{K}$下的$P$。（输入$P$。）
::: solution
$\mu = 20 \times 1.661\times10^{-27} = 3.32\times10^{-26}\ \mathrm{kg}$；$\langle v_\mathrm{r} \rangle = \sqrt{8 \times 1.381\times10^{-23} \times 450 / (\pi \times 3.32\times10^{-26})} = 690\ \mathrm{m\,s^{-1}}$；$\sigma = \pi (4.5\times10^{-10})^{2} = 6.36\times10^{-19}\ \mathrm{m^{2}}$。
$$
k_\text{coll} = 6.36\times10^{-19} \times 690 \times 6.022\times10^{23} \times 10^{-3} = 2.6\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}},
\qquad
P = \frac{4.0\times10^{9}}{2.6\times10^{11}} = 0.015.
$$
约$65$次能量足够的碰撞才有一次反应：苛刻的取向要求，或者一个通常会重新解离的络合物——仅凭碰撞理论无法告诉你是哪一种。
:::
:::

::: exercise 降压区中的观测速率常数 {level=2 check="60000"}
某单分子反应$k_\infty = 8.0\times10^{4}\ \mathrm{s^{-1}}$，$k_2 / k_{-1} = 2.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$。问$[\mathrm{M}] = 6.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$时的$k_\text{obs}$是多少？（以$\mathrm{s^{-1}}$输入$k_\text{obs}$。）
::: solution
$$
k_\text{obs} = \frac{k_\infty [\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}}
= \frac{8.0\times10^{4} \times 6.0\times10^{-6}}{6.0\times10^{-6} + 2.0\times10^{-6}}
= \frac{8.0\times10^{4} \times 6.0}{8.0} = 6.0\times10^{4}\ \mathrm{s^{-1}}.
$$
高压极限的四分之三：体系位于降压区的上肩，去活化在此每三次活化事件夺走一次。
:::
:::

::: exercise 分子对碰撞：erfc修正 {level=3}
沿中心连线能量超过$\varepsilon_0$的*碰撞*分数为$e^{-\varepsilon_0 / k_\mathrm{B} T}$。证明：$\varepsilon_1$超过$\varepsilon_0$的*分子*分数为$\operatorname{erfc}\sqrt{\varepsilon_0 / k_\mathrm{B} T}$，且当$\varepsilon_0 \gg k_\mathrm{B} T$时两者相差因子$\sqrt{\pi \varepsilon_0 / k_\mathrm{B} T}$。对$E_0 = 75\ \mathrm{kJ\,mol^{-1}}$、$300\ \mathrm{K}$计算两个分数及其比值。
::: solution
$v_1$的1维麦克斯韦密度为$g(v_1) = (\mu / 2\pi k_\mathrm{B} T)^{1/2} e^{-\mu v_1^{2} / 2 k_\mathrm{B} T}$。由$\varepsilon_1 = \tfrac{1}{2}\mu v_1^{2}$，对$\varepsilon_1$的密度为$g(\varepsilon_1) = (\pi k_\mathrm{B} T)^{-1/2} \varepsilon_1^{-1/2} e^{-\varepsilon_1 / k_\mathrm{B} T}$，于是
$$
P(\varepsilon_1 > \varepsilon_0) = \frac{1}{\sqrt{\pi k_\mathrm{B} T}} \int_{\varepsilon_0}^{\infty} \varepsilon_1^{-1/2} e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1
= \frac{2}{\sqrt{\pi}} \int_{\sqrt{\varepsilon_0 / k_\mathrm{B} T}}^{\infty} e^{-u^{2}}\, \mathrm{d}u
= \operatorname{erfc}\sqrt{\frac{\varepsilon_0}{k_\mathrm{B} T}},
$$
其中换元$u = \sqrt{\varepsilon_1 / k_\mathrm{B} T}$。互补误差函数在大$x$下有渐近形式$\operatorname{erfc} x \sim e^{-x^{2}} / (x \sqrt{\pi})$，所以分子分数比碰撞分数$e^{-x^{2}}$小因子$1 / (x\sqrt{\pi})$，即碰撞分数超出它$x\sqrt{\pi} = \sqrt{\pi \varepsilon_0 / k_\mathrm{B} T}$：快分子不成比例地频繁碰撞，扫掠权重$v_1$把$\varepsilon_1^{-1/2}$密度变成了干净的指数。数值上，$E_0 / RT = 30.07$，$x = 5.484$：碰撞分数$e^{-30.07} = 8.7\times10^{-14}$，分子分数$\operatorname{erfc}(5.484) = 8.8\times10^{-15}$，比值$9.9$，渐近估计$\sqrt{31.4} = 9.7$——即便指数本身横跨$10^{13}$，加权仍带来一个数量级的差别。
:::
:::

::: exercise 完整的降压区分析 {level=3 check="4000"}
$500\ \mathrm{K}$下一个示例性单分子气相反应，$k_\infty = 4.0\times10^{4}\ \mathrm{s^{-1}}$，$k_0 = 1.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。求(a) 半压浓度$[\mathrm{M}]_{1/2}$及对应压强；(b) 压强为该值九分之一时的$k_\text{obs}$；(c) 该压强下的比值$k_\text{obs} / k_0[\mathrm{M}]$及其解释。（对(b)，以$\mathrm{s^{-1}}$输入$k_\text{obs}$。）
::: solution
(a) $[\mathrm{M}]_{1/2} = k_2 / k_{-1} = k_\infty / k_0 = 4.0\times10^{4} / 1.0\times10^{10} = 4.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$，即$4.0\times10^{-3}\ \mathrm{mol\,m^{-3}}$，
$$
p_{1/2} = (4.0\times10^{-3}) \times 8.314 \times 500 = 17\ \mathrm{Pa}.
$$
(b) 在$[\mathrm{M}] = \tfrac{1}{9}[\mathrm{M}]_{1/2}$处，
$$
k_\text{obs} = \frac{k_\infty \times \tfrac{1}{9}}{\tfrac{1}{9} + 1} = \frac{k_\infty}{10} = 4.0\times10^{3}\ \mathrm{s^{-1}}.
$$
(c) 此处$k_0[\mathrm{M}] = 1.0\times10^{10} \times 4.4\times10^{-7} = 4.4\times10^{3}\ \mathrm{s^{-1}}$，故$k_\text{obs} / k_0[\mathrm{M}] = 4.0 / 4.4 = 0.90$：即便在半压的九分之一处，低压极限也只乐观了$10\ \%$。原因是结构性的——写$x = [\mathrm{M}] / [\mathrm{M}]_{1/2}$，精确律即$k_\text{obs} = k_0[\mathrm{M}] /(1 + x)$，$x = 1/9$时该因子为$0.90$。横跨数量级的降压区在$p_{1/2}$附近最陡，只是渐近地逼近两条平台；在$p_{1/2}$附近测得的单个$k_\text{obs}$既定不出$k_\infty$也定不出$k_0$，这就是降压实验必须做压强序列的原因。
:::
:::


