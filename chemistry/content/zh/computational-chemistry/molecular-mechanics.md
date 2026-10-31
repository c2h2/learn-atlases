一个小蛋白连同周围的水约含$50\,000$个原子。即使用最便宜的密度泛函，从薛定谔方程计算它的能量，单个几何也要花上几个小时；而一次分子动力学模拟需要几百万个几何。然而人们对这类体系提出的问题——蛋白采取哪种构象、药物分子如何坐在它的口袋里、水扩散得多快——很少涉及断键。**分子力学**（molecular mechanics）正是利用这一点。它把电子彻底抛开，把[[computational-chemistry/potential-energy-surfaces]]的势能面写成简单经典项之和：键与角的弹簧、扭转的周期函数、原子之间成对的范德华与库仑相互作用。由此得到的**力场**每次能量求值只花微秒而不是小时。代价是：每一项都必须参数化，参数只对拟合时所用的那类分子有效，而化学——键的形成与断裂——在其适用范围之外。本课逐项搭建一个力场，说明参数从何而来，并解释柔性分子的众多极小如何搜索。

## 力场能量

指导性的思想是**可迁移性**：己烷中的一个C–C单键与蛋白侧链中的一个表现得非常相像，因此一套参数就应同时描述两者。于是原子被分为**原子类型**——不只按元素，还按杂化与化学环境（一个$sp^{3}$碳、一个芳香碳、一个羰基氧、一个酰胺氮）——每个参数都绑定到类型的一种组合上。

::: definition 力场 {#def-force-field}
一个（I类）**力场**把分子体系的势能写成
$$
\begin{aligned}
E_\mathrm{FF} ={}& \sum_\mathrm{bonds} k_b (r - r_0)^{2} + \sum_\mathrm{angles} k_\theta (\theta - \theta_0)^{2} + \sum_\mathrm{torsions} \sum_n \frac{V_n}{2}\left[1 + \cos(n\phi - \delta_n)\right] \\
&+ \sum_{i<j}^{\text{非键}} \left\{ 4\varepsilon_{ij}\left[\left(\frac{\sigma_{ij}}{r_{ij}}\right)^{12} - \left(\frac{\sigma_{ij}}{r_{ij}}\right)^{6}\right] + \frac{q_i q_j}{4\pi\varepsilon_0 r_{ij}} \right\},
\end{aligned}
$$
其中参数$k_b, r_0, k_\theta, \theta_0, V_n, \delta_n, \varepsilon_{ij}, \sigma_{ij}$与固定的**部分电荷**$q_i$依赖原子类型。非键求和跑遍相隔三个或更多根键的原子对；恰好相隔三根键的原子对（“1–4对”）通常要打折扣。键连接的各项称为**键合**项，其余为**非键**项。
:::

这个表达式有三个特征，值得在逐项拆解之前交代。第一，它是玻恩-奥本海默曲面的一个*模型*，而不是任何系统意义上的对该曲面的近似：没有小参数，除了重新拟合之外没有改进它的途径。第二，能量的零点没有物理意义。力场的“能量”是相对于一个假想的无张力分子的**位阻能**，所以你可以比较同一分子两个构象体的能量，却不能比较两个不同分子的能量——除非该力场专门为生成焓做过参数化（MM3就做过）。第三，总费用由非键求和主导，它有$N(N - 1)/2$项；其余部分都随$N$线性增长。

| 力场 | 首次发表 | 典型用途 |
|---|---|---|
| MM2、MM3、MM4（Allinger） | 1977、1989、1996 | 小有机分子、构象、生成焓 |
| AMBER（Kollman、Case与合作者） | 1984年起 | 蛋白质与核酸 |
| CHARMM（Karplus与合作者） | 1983年起 | 蛋白质、脂类、核酸 |
| OPLS（Jorgensen） | 1984年起 | 液体、有机分子、类药配体 |
| GAFF（通用AMBER力场） | 2004 | 与AMBER生物分子联用的类药有机分子 |
| UFF（Rappé与合作者） | 1992 | 整个周期表、粗略几何 |

## 键合项

### 键与角

谐振子弹簧就是真实键势在极小附近的二阶泰勒展开。对室温下键的小幅偏离（$\pm 0.05\ \mathrm{\AA}$）它已经够用，但它永不解离、也无限制增长——所以原理上就描述不了断键。MM3加入三次与四次项以模拟非谐性；若键要拉伸得很远，莫尔斯（Morse）函数是自然的选择，但它很少被使用，因为它更贵，而且非反应力场里没有任何东西需要它。

::: warning 二分之一因子 {#warn-half}
键项写法因力场而异：有的写$k_b(r - r_0)^{2}$（AMBER、CHARMM、OPLS），有的写$\tfrac{1}{2}k(r - r_0)^{2}$（GROMOS、许多教科书）。因此AMBER的力常数是光谱力常数$k = \mathrm{d}^{2}E/\mathrm{d}r^{2}$的*一半*。不检查这一约定就从不同来源混用参数，会把每个振动频率的平方加倍或减半。角度也有同样的陷阱；扭转以另一种形式存在（有的力场用势垒$V_n$，有的用$V_n/2$）；Lennard-Jones参数也如此，它们或以$(\varepsilon, \sigma)$、或以$(\varepsilon, r_\mathrm{min}/2)$（CHARMM）、或以$A/r^{12} - B/r^{6}$的系数$(A, B)$给出。读数字之前，先读函数形式。
:::

::: example AMBER中的一个C–C键 {#ex-amber-bond}
两个$sp^{3}$碳（类型CT–CT）之间键的AMBER参数为$k_b = 310.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$、$r_0 = 1.526\ \mathrm{\AA}$，能量为$E = k_b(r - r_0)^{2}$。求把键拉长$0.050\ \mathrm{\AA}$的能量代价、以$\mathrm{N\,m^{-1}}$表示的光谱力常数，以及孤立C–C谐振子（$\mu = 6.00\ \mathrm{u}$）的简谐波数。
::: solution
拉伸能为$310.0 \times (0.050)^{2} = 0.775\ \mathrm{kcal\,mol^{-1}} = 3.24\ \mathrm{kJ\,mol^{-1}}$，比$298\ \mathrm{K}$的$RT$（$2.48\ \mathrm{kJ\,mol^{-1}}$）稍大：这样的拉伸会热涨落发生。光谱常数为$k = \mathrm{d}^{2}E/\mathrm{d}r^{2} = 2k_b = 620.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$；换算到每个分子、用SI单位，
$$
k = \frac{620.0 \times 4184\ \mathrm{J\,mol^{-1}}}{6.02214\times10^{23}\ \mathrm{mol^{-1}} \times 10^{-20}\ \mathrm{m^{2}}} = 431\ \mathrm{N\,m^{-1}} .
$$
取$\mu = 6.00 \times 1.66054\times10^{-27}\ \mathrm{kg} = 9.963\times10^{-27}\ \mathrm{kg}$，$\tilde\nu = \sqrt{k/\mu}/2\pi c = 1.10\times10^{3}\ \mathrm{cm^{-1}}$，正落在烷烃C–C伸缩出现的区域（约$800$–$1200\ \mathrm{cm^{-1}}$；它们与其他模式强烈混合，因此没有任何一条单独的谱带就是C–C伸缩）。
:::
:::

角弯曲的处理方式相同，力常数（以每平方弧度计）通常只有键的十分之一：角比键软得多。一些力场加上**尤里-布拉德利（Urey–Bradley）**项（1,3原子之间的一根弹簧）或**交叉项**——例如把键伸缩与相邻角弯曲耦合（MM3与CFF这类II类力场）；这些项能显著改善振动频率。

### 扭转

单键旋转是构象化学之所在。扭转势必须对二面角$\phi$具有周期形式，因此写成短傅里叶级数$\sum_n \tfrac{1}{2}V_n[1 + \cos(n\phi - \delta_n)]$。三重项$n = 3$描述$sp^{3}$–$sp^{3}$键周围交错式与重叠式的交替；$n = 2$描述部分双键（如酰胺C–N）对平面性的偏好；$n = 1$区分反式（anti）与同式（syn）排布，承载偶极取向的效应。

::: definition 丁烷的扭转势（雷卡尔特-贝勒曼斯形式） {#def-rb}
在$n$-丁烷的联合原子模型中，每个$\mathrm{CH_2}$或$\mathrm{CH_3}$基团作为一个点位，中心键周围的整个扭转能量可写成$\cos\psi$的多项式，其中$\psi = \phi - 180^\circ$从反式构象起量：
$$
V(\psi) = \sum_{n=0}^{5} C_n \cos^{n}\psi ,
$$
其中$C_0 = 9.28$、$C_1 = 12.16$、$C_2 = -13.12$、$C_3 = -3.06$、$C_4 = 26.24$、$C_5 = -31.5\ \mathrm{kJ\,mol^{-1}}$（雷卡尔特与贝勒曼斯，1975）。$\phi$的、直到$\cos 5\phi$为止的任何傅里叶级数都可改写成这种形式，反之亦然。
:::

::: example 丁烷的构象体 {#ex-butane}
用雷卡尔特-贝勒曼斯势求反式（$\phi = 180^\circ$）与旁式（gauche，$\phi = \pm 60^\circ$）极小的能量、$\phi = 120^\circ$处的反式-旁式势垒，以及完全重叠（$\phi = 0^\circ$）的势垒。估计$298\ \mathrm{K}$下反式构象体的分数。
::: solution
反式处$\psi = 0$、$\cos\psi = 1$：$V = \sum C_n = 9.28 + 12.16 - 13.12 - 3.06 + 26.24 - 31.50 = 0.00\ \mathrm{kJ\,mol^{-1}}$（这些常数正是为了把零点选在这里而定的）。旁式处$\phi = 60^\circ$、$\psi = -120^\circ$、$\cos\psi = -\tfrac{1}{2}$：
$$
V = 9.28 - 6.08 - 3.28 + 0.3825 + 1.64 + 0.984 = 2.93\ \mathrm{kJ\,mol^{-1}} .
$$
$\phi = 120^\circ$处$\cos\psi = \tfrac{1}{2}$，得$V = 9.28 + 6.08 - 3.28 - 0.3825 + 1.64 - 0.984 = 12.35\ \mathrm{kJ\,mol^{-1}}$；$\phi = 0^\circ$处$\cos\psi = -1$，得$V = 9.28 - 12.16 - 13.12 + 3.06 + 26.24 + 31.50 = 44.8\ \mathrm{kJ\,mol^{-1}}$。把每个势阱当作单一状态，旁式阱有两个，
$$
x_\mathrm{anti} = \frac{1}{1 + 2e^{-2930/(8.314 \times 298.15)}} = \frac{1}{1 + 2 \times 0.307} = 0.620 .
$$
改为在整个扭转范围上对玻尔兹曼因子积分则得$0.65$，因为反式阱略宽。实验把气相旁式-反式焓差定在约$2.8$–$3.8\ \mathrm{kJ\,mol^{-1}}$，于是室温下大约三分之二为反式。
:::
:::

::: widget plot
f: 9.28 + 12.16*cos(pi*(x-180)/180) - 13.12*cos(pi*(x-180)/180)^2 - 3.06*cos(pi*(x-180)/180)^3 + 26.24*cos(pi*(x-180)/180)^4 - 31.5*cos(pi*(x-180)/180)^5
x: 0, 360
y: -2, 48
vlines: 60; 180; 300
labels: V(\phi)/\mathrm{kJ\,mol^{-1}}
caption: 丁烷的雷卡尔特-贝勒曼斯扭转势对C–C–C–C二面角$\phi$（单位度）的图像。$180^\circ$的反式极小是全局极小；$60^\circ$与$300^\circ$的两个旁式极小高$2.93\ \mathrm{kJ\,mol^{-1}}$；它们之间的势垒为$12.35\ \mathrm{kJ\,mol^{-1}}$（$120^\circ$与$240^\circ$处）与$44.8\ \mathrm{kJ\,mol^{-1}}$（完全重叠，$0^\circ$）。用切线沿曲线拖动可以看到，每个极大与极小的斜率都为零，正如[[computational-chemistry/potential-energy-surfaces#prop-stationary]]所要求。
:::

在全原子力场中，C–C键周围的势垒由围绕它的*一切*扭转分摊——丁烷中有九个H–C–C–H、C–C–C–H与C–C–C–C项——端原子之间的1–4非键相互作用也有贡献。因此扭转参数是*最后*拟合的：先固定非键项，再让它们复现能量对$\phi$的量子化学扭转扫描。扭转参数是任何力场中最不可迁移的部分，也是为新分子增设新参数的最常见原因。

**虚扭转**（或面外项）通过惩罚锥体化使平面中心保持平面——芳香碳、羰基碳、酰胺氮。没有它们，只靠角项约束的$sp^{2}$碳几乎不费代价就能翻出平面。

## 非键项

### 范德华：Lennard-Jones势

两个中性闭壳层原子在远程弱弱吸引——按$r^{-6}$衰减的伦敦色散相互作用——而在电子云重叠时强烈排斥。交换排斥确实按指数衰减，但计算上方便的$r^{-12}$（$r^{-6}$的平方）几乎被普遍采用。

::: proposition Lennard-Jones 12–6势 {#prop-lj}
势$
V_\mathrm{LJ}(r) = 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]
$在$r = \sigma$处为零，在$r_\mathrm{min} = 2^{1/6}\sigma \approx 1.122\,\sigma$处有唯一极小、深度$V(r_\mathrm{min}) = -\varepsilon$，该处曲率为$V''(r_\mathrm{min}) = 72\varepsilon/(2^{1/3}\sigma^{2})$。等价地$V_\mathrm{LJ} = \varepsilon\left[(r_\mathrm{min}/r)^{12} - 2(r_\mathrm{min}/r)^{6}\right]$。
:::

::: proof
$V(\sigma) = 4\varepsilon(1 - 1) = 0$。求导，
$$
V'(r) = 4\varepsilon\left[-\frac{12\sigma^{12}}{r^{13}} + \frac{6\sigma^{6}}{r^{7}}\right] = \frac{24\varepsilon}{r}\left[\left(\frac{\sigma}{r}\right)^{6} - 2\left(\frac{\sigma}{r}\right)^{12}\right],
$$
在$(\sigma/r)^{6} = \tfrac{1}{2}$即$r_\mathrm{min} = 2^{1/6}\sigma$处为零。代入$(\sigma/r_\mathrm{min})^{6} = \tfrac{1}{2}$得$V = 4\varepsilon\left(\tfrac{1}{4} - \tfrac{1}{2}\right) = -\varepsilon$。二阶导数为$V'' = 4\varepsilon\left[156\sigma^{12}/r^{14} - 42\sigma^{6}/r^{8}\right]$；在$r_\mathrm{min}$处$\sigma^{12}/r^{12} = \tfrac{1}{4}$、$\sigma^{6}/r^{6} = \tfrac{1}{2}$，故$V'' = (4\varepsilon/r_\mathrm{min}^{2})(39 - 21) = 72\varepsilon/r_\mathrm{min}^{2} = 72\varepsilon/(2^{1/3}\sigma^{2})$。由于$V'' > 0$且$r \to \infty$时$V$从下方趋于$0$，该极小是唯一的驻点。把$\sigma^{6} = r_\mathrm{min}^{6}/2$代入即得另一形式。
:::

::: example 氩 {#ex-argon}
拟合液氩性质得到的Lennard-Jones参数为$\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$、$\sigma = 3.405\ \mathrm{\AA}$。把势阱深度以$\mathrm{kJ\,mol^{-1}}$表示，求极小位置，并与正常沸点$87.3\ \mathrm{K}$下的$RT$比较。
::: solution
每摩尔$\varepsilon = R \times 119.8\ \mathrm{K} = 8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 119.8\ \mathrm{K} = 0.996\ \mathrm{kJ\,mol^{-1}}$。极小位于$r_\mathrm{min} = 2^{1/6} \times 3.405\ \mathrm{\AA} = 3.822\ \mathrm{\AA}$，接近固体氩的近邻间距（低温下$3.76\ \mathrm{\AA}$）。沸点处$RT = 0.726\ \mathrm{kJ\,mol^{-1}}$，故$\varepsilon/RT = 1.37$：相对热运动能，每一对原子几乎束缚不住，但液体中每个原子约有十二个近邻，众多的弱吸引合起来把液体维持在一起。注意这些参数是*有效*的：由凝聚相数据拟合，它们包含了平均化的三体效应，其深度与真实的气相对势（约$1.18\ \mathrm{kJ\,mol^{-1}}$，位于$3.76\ \mathrm{\AA}$）不同。
:::
:::

::: widget plot
f: 4*e*((s/x)^12 - (s/x)^6); -4*e*(s/x)^6
x: 2.8, 9
y: -1.5, 1.5
sliders: e=0.996:0.1:2:0.01; s=3.405:2.5:4.5:0.005
labels: V_\mathrm{LJ}(r); \text{色散项 } -4\varepsilon(\sigma/r)^6
hlines: 0
caption: 伦纳德-琼斯势（能量单位$\mathrm{kJ\,mol^{-1}}$，$r$以埃计），初始取[[#ex-argon]]的氩参数，以及只有吸引的$r^{-6}$部分。移动$\sigma$整条曲线左右滑移；移动$\varepsilon$它变深。排斥壁陡到势能在$r = \sigma$处过零、再向内$0.1\,\sigma$就已升到$+\varepsilon$——这就是力场中的原子行为几乎像直径$\sigma$的硬球的原因。
:::

对不同原子类型的一对原子，参数不是逐对拟合的——原子对会多得多。它们由单一类型的参数通过**混合规则**生成。

::: definition 洛伦兹-贝特洛（Lorentz–Berthelot）混合规则 {#def-lorentz-berthelot}
对类型$i$与$j$的原子，
$$
\sigma_{ij} = \tfrac{1}{2}(\sigma_{ii} + \sigma_{jj}), \qquad \varepsilon_{ij} = \sqrt{\varepsilon_{ii}\,\varepsilon_{jj}} .
$$
$\sigma$取算术平均是把原子当作接触的硬球（洛伦兹）；$\varepsilon$取几何平均的动机是异类原子间色散的伦敦公式（贝特洛）。两条都是**经验**规则；OPLS对$\sigma$也用几何平均，而稀有气体混合物的精确研究表明$\varepsilon_{ij}$有百分之几的偏离。
:::

### 静电学：部分电荷

部分电荷之间的库仑项承载着氢键、离子对与溶剂化。用方便的分子单位，
$$
E_\mathrm{C} = \frac{q_i q_j e^{2} N_\mathrm{A}}{4\pi\varepsilon_0 r_{ij}} = 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA}\times\frac{q_i q_j}{r_{ij}/\mathrm{\AA}},
$$
其中$q$以基本电荷为单位。$\pm 0.40\,e$的两个电荷相距$3.0\ \mathrm{\AA}$时吸引$-74\ \mathrm{kJ\,mol^{-1}}$——远超任何范德华接触——而且该相互作用只按$1/r$衰减，所以在$10$–$20\ \mathrm{\AA}$处仍然显著。远程静电是模拟的主要技术难题，用埃瓦尔德求和处理，见[[computational-chemistry/molecular-dynamics]]。

部分电荷不是可观测量；没有唯一的方法把分子的电子密度分给它的各个原子。现代力场通过把点电荷拟合到分子周围点位网格上量子化学计算的**静电势**来获得它们。AMBER的RESP程序（受约束静电势拟合）加了一个把埋藏原子的电荷拉向零的约束，使电荷从一个构象到另一个构象更加稳定；OPLS的电荷则是另行调整以复现液体的密度与汽化焓。

::: example TIP3P水二聚体 {#ex-tip3p}
TIP3P水模型是刚性的，$r_\mathrm{OH} = 0.9572\ \mathrm{\AA}$、$\angle\mathrm{HOH} = 104.52^\circ$、电荷$q_\mathrm{O} = -0.834\,e$与$q_\mathrm{H} = +0.417\,e$，并在氧上只有一个Lennard-Jones点位（$\sigma = 3.1506\ \mathrm{\AA}$、$\varepsilon = 0.6364\ \mathrm{kJ\,mol^{-1}}$）。把二聚体能量对六个分子间坐标极小化，得$R_\mathrm{OO} = 2.75\ \mathrm{\AA}$处$E = -27.4\ \mathrm{kJ\,mol^{-1}}$，氢键$\mathrm{H\cdots O} = 1.79\ \mathrm{\AA}$。分解能量，并与最佳量子化学值——$R_\mathrm{OO} = 2.91\ \mathrm{\AA}$处$D_e = 21.0\ \mathrm{kJ\,mol^{-1}}$——比较。
::: solution
在最优几何处把九个电荷-电荷项求和得$-34.8\ \mathrm{kJ\,mol^{-1}}$；单个O–O的Lennard-Jones项为$+7.4\ \mathrm{kJ\,mol^{-1}}$（在$2.75\ \mathrm{\AA}$处两个氧已进入$\sigma$之内、位于排斥壁上）。该模型中的氢键因此是被排斥顶住的静电。TIP3P把孤立二聚体多束缚约$30\ \%$，而且做得太短。这是故意的：模型是对*液体*拟合的，液体中每个分子被近邻极化，偶极矩约$2.6$–$3\ \mathrm{D}$，而不是气相的$1.85\ \mathrm{D}$。TIP3P的固定电荷给出$2.35\ \mathrm{D}$的偶极矩，内置了平均极化，因此不可能在气相与液相中同时都正确。这就是**有效对势**的定义性局限。
:::
:::

**可极化力场**（AMOEBA、CHARMM Drude模型）给原子装上可感应的偶极子或弹簧上的电荷，使电荷分布响应所处环境。它们在相之间更加可迁移，费用约为三到十倍。

### 排除与缩放

由一根或两根键相连的原子（1–2与1–3对）被排除在非键求和之外，因为它们的相互作用已包含在键项与角项中。1–4对（扭转的两端原子）计入但要缩放——AMBER中静电乘$1/1.2$、Lennard-Jones乘$1/2$，OPLS中两者都乘$1/2$。这些选择与随后拟合的扭转参数互相咬合，这又是参数不能从一个力场搬到另一个力场的原因之一。

::: quiz
一个学生从GAFF取某类药分子的扭转参数、从一篇OPLS论文取部分电荷、从CHARMM取Lennard-Jones参数，发现算出的构象能与量子化学扫描严重不符。最可能的原因是什么？
- [ ] 三个来源之一含有排印错误。
- [x] 力场的各项是一起拟合的：扭转是在电荷、Lennard-Jones参数与1–4缩放固定之后才拟合的，因此不同力场的项互不兼容。
- [ ] 分子力学根本不能描述构象能。
- [ ] 类药分子需要可极化力场。
::: solution
扭转项吸收沿扭转扫描时非键项留下的任何亏空，而每个力场都有自己的电荷方案、混合规则、函数形式与1–4缩放因子。力场是一个自洽的整体，其参数不能零敲碎打地混搭。
:::
:::

## 参数化

成千上万的参数从何而来？典型的现代方案是分层的：

1. **平衡值**$r_0, \theta_0$取自实验结构（微波谱、晶体结构）或量子化学优化。
2. **力常数**$k_b, k_\theta$取自振动频率或量子化学Hessian（[[computational-chemistry/potential-energy-surfaces#prop-normal-modes]]）。
3. **电荷**取自对量子化学静电势的拟合（RESP）或对液体性质的拟合。
4. **Lennard-Jones参数**通过在模拟中拟合液体的密度与汽化焓、以及水合自由能（[[computational-chemistry/free-energy-sampling]]）得到。它们拟合起来最贵，因为每次检验都需要一次模拟。
5. **扭转**最后拟合，对象是量子化学扭转扫描与包含其余一切项的力场能量之差。

拟合是一个最小二乘问题——最小化力场与参考性质之间带权偏差的平方和——但这是一个病态问题：许多参数相互关联（对某些性质，较大的$\sigma$可用较小的$\varepsilon$补偿，对另一些则不行），而且参考数据本身不确定。近年的力场（例如OpenFF）把这一过程自动化，并对大型量子化学数据集拟合。**机器学习势**更进一步：把一个关于原子环境的可调节函数拟合到量子能量与受力；它们能描述断键，但只和训练数据一样好。

## 构象搜索

几何优化找到的是出发盆地里的极小（[[computational-chemistry/potential-energy-surfaces#alg-newton]]）。柔性分子有许多盆地：若$n$个可旋转键每个有三个交错式极小，就有多达$3^{n}$个构象体——$n = 5$时$243$个，$n = 10$时$59\,049$个。找出最低者、或室温下有布居的那组低能构象体，是一个全局优化问题。

::: algorithm 构象搜索 {#alg-conformer-search}
1. **产生**候选结构，办法有：对所有可旋转扭转做*系统*网格（大约可行到六至八个扭转）；*随机*搜索——对已知构象体的扭转或笛卡儿坐标做随机扰动（蒙特卡洛多极小）；或*高温分子动力学*加周期性淬火（模拟退火）。
2. 用力场**极小化**每个候选。
3. **去除重复**：在最优叠合后比较结构（均方根偏差低于阈值，通常$0.1$–$0.5\ \mathrm{\AA}$），注意对称等价的原子。
4. **重复**，直到不再出现新的低能构象体（对随机方法，直到所选窗口——比如$10\ \mathrm{kJ\,mol^{-1}}$——内的每个构象体都已被找到若干次）。
5. 用更好的方法**重新排序**低能集合（带色散校正的DFT，必要时在溶剂中），因为力场几$\mathrm{kJ\,mol^{-1}}$的能量差在力场误差范围之内。
:::

系统路线的费用随$n$指数增长，但问题比$3^{n}$暗示的小，因为许多组合会位阻相碰。例如戊烷中，旁式⁺-旁式⁻组合把两个末端甲基拉到一起（“syn-戊烷”相互作用），该构象体因此远高于两个独立旁式惩罚之和。下图是这种耦合的示意。

::: widget contour
f: 9.28 + 12.16*cos(pi*(x-180)/180) - 13.12*cos(pi*(x-180)/180)^2 - 3.06*cos(pi*(x-180)/180)^3 + 26.24*cos(pi*(x-180)/180)^4 - 31.5*cos(pi*(x-180)/180)^5 + 9.28 + 12.16*cos(pi*(y-180)/180) - 13.12*cos(pi*(y-180)/180)^2 - 3.06*cos(pi*(y-180)/180)^3 + 26.24*cos(pi*(y-180)/180)^4 - 31.5*cos(pi*(y-180)/180)^5 + 13*exp(-((x-60)^2 + (y-300)^2)/800) + 13*exp(-((x-300)^2 + (y-60)^2)/800)
x: 0, 360
y: 0, 360
levels: 20
point: 180, 180
caption: 戊烷构象图的示意：对两个内部扭转（$\phi_1$沿$x$，$\phi_2$沿$y$，单位度）各取雷卡尔特-贝勒曼斯势，再加宽为$13\ \mathrm{kJ\,mol^{-1}}$的高斯惩罚项，代表$(60^\circ, 300^\circ)$与$(300^\circ, 60^\circ)$处的syn-戊烷相碰。若无惩罚项，图上会有$3 \times 3 = 9$个极小，能量等于单扭转能量之和；有了它，$g^{+}g^{-}$极小失稳并移动。拖动点，寻找$(180^\circ, 180^\circ)$的反式-反式全局极小与各盆地之间的鞍点。
:::

## 力场能与不能

对与训练集相似的分子的构象与堆积，对液体与生物分子的结构和动力学，对结合与溶剂化这类相对自由能，力场表现出色。固定的连接性使它们描述不了反应；固定的电荷使它们对电荷转移与强极化（金属离子、$\pi$-阳离子相互作用）描述不佳。配位数与自旋态多变的过渡金属中心尤其困难。反应力场（ReaxFF）让键级随距离变化，能以多得多参数为代价追踪断键；QM/MM方法（[[computational-chemistry/solvation-qmmm]]）则对反应区用量子力学、其余部分用力场。

## 后续内容

力场能量及其解析梯度（每一项都容易求导）是分子动力学（[[computational-chemistry/molecular-dynamics]]）与蒙特卡洛（[[computational-chemistry/free-energy-sampling]]）的引擎，在那里它们被求值几百万次。用于参数化力场的量子化学参考数据来自[[computational-chemistry/hartree-fock]]至[[computational-chemistry/density-functional-theory]]的方法；Lennard-Jones势则在[[statistical-thermodynamics/real-gases-liquids]]的真实气体理论与液体的径向分布函数中重现。

::: history
分子力学起源于对有机分子张力的理解。韦斯泰海默（Frank Westheimer）与迈耶（Joseph Mayer）1946年用经典的键与范德华项计算了张力联苯的能量；亨德里克森（James Hendrickson）1961年首次用计算机计算环烷烃构象。阿林杰（Norman Allinger）的MM2力场（1977）使该方法成为有机化学的常规工具。利夫森（Shneior Lifson）1968年的一致力场，以及瓦尔谢尔（Arieh Warshel）与莱维特（Michael Levitt）的工作，奠定了处理蛋白质的基础；AMBER与CHARMM程序（都在1980年代初）以及约根森（William Jorgensen）的OPLS参数（1984年起）把生物分子模拟带入常规使用。雷卡尔特（Jean-Paul Ryckaert）与贝勒曼斯（André Bellemans）1975年发表了他们的烷烃扭转势；约根森的水模型TIP3P发表于1983年。2013年诺贝尔化学奖授予卡普拉斯（Martin Karplus）、莱维特与瓦尔谢尔，表彰建立在这些力场之上的多尺度模型的发展。
:::

::: summary
- 力场把势能写成谐振的键与角、周期扭转以及成对的Lennard-Jones与库仑项，参数绑定原子类型、为可迁移性而拟合。
- 力场能量是位阻能：比较同一分子的构象时有意义，比较不同分子时没有意义。
- Lennard-Jones势在$r = 2^{1/6}\sigma$处取极小$-\varepsilon$；异类原子对使用洛伦兹-贝特洛一类的经验混合规则。
- 部分电荷是模型量，拟合于静电势或液体性质；固定电荷的水模型内置了液体的平均极化，会过束缚气相二聚体。
- 扭转最后拟合，对象是量子化学扫描，是最不可迁移的参数；力场不能逐项混搭，二分之一因子一类的约定必须检查。
- 构象搜索是多达$3^{n}$个极小上的全局优化，之后用更好的方法重新排序。
- 力场不能断键；反应力场、机器学习势与QM/MM拓展了它的边界。
:::

## 习题

::: exercise 极小在哪里？ {level=1 check="3.82"}
氩的$\sigma = 3.405\ \mathrm{\AA}$。Lennard-Jones势的极小在哪里？（以埃输入$r_\mathrm{min}$。）
::: solution
$r_\mathrm{min} = 2^{1/6}\sigma = 1.12246 \times 3.405\ \mathrm{\AA} = 3.82\ \mathrm{\AA}$（[[#prop-lj]]）。
:::
:::

::: exercise 电荷-电荷相互作用 {level=1 check="-74.1"}
计算真空中部分电荷$+0.40\,e$与$-0.40\,e$相距$3.00\ \mathrm{\AA}$时的库仑能。（以$\mathrm{kJ\,mol^{-1}}$输入。）
::: solution
$E = 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA} \times (0.40)(-0.40)/3.00\ \mathrm{\AA} = -74.1\ \mathrm{kJ\,mol^{-1}}$。在水中（$\varepsilon_\mathrm{r} \approx 78$）屏蔽后的相互作用只有约$-0.95\ \mathrm{kJ\,mol^{-1}}$，不到$RT$；但在力场内部使用介电常数，只是显式溶剂或连续介质模型（[[computational-chemistry/solvation-qmmm]]）的粗糙替代品。
:::
:::

::: exercise 拉伸一根键 {level=1 check="3.24"}
用AMBER的CT–CT参数、$E = k_b(r - r_0)^{2}$、$k_b = 310.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$，一根C–C键从$1.526$拉伸到$1.576\ \mathrm{\AA}$的能量是多少？（以$\mathrm{kJ\,mol^{-1}}$输入。）
::: solution
$E = 310.0 \times (0.050)^{2} = 0.775\ \mathrm{kcal\,mol^{-1}} \times 4.184 = 3.24\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 混合对 {level=2 check="163"}
氙的$\varepsilon/k_\mathrm{B} = 221\ \mathrm{K}$、$\sigma = 4.10\ \mathrm{\AA}$；氩为$119.8\ \mathrm{K}$与$3.405\ \mathrm{\AA}$。用洛伦兹-贝特洛规则估计Ar–Xe参数。（$\varepsilon_{\mathrm{ArXe}}/k_\mathrm{B}$以开尔文为单位、保留三位有效数字。）
::: solution
$\varepsilon_{ij}/k_\mathrm{B} = \sqrt{119.8 \times 221}\ \mathrm{K} = 163\ \mathrm{K}$，$\sigma_{ij} = \tfrac{1}{2}(3.405 + 4.10)\ \mathrm{\AA} = 3.75\ \mathrm{\AA}$。对Ar–Xe混合物数据的拟合给出的势阱深度略小——几何平均倾向于高估大小悬殊原子的$\varepsilon$，这正是现代工作对这些原子对偏好其他规则（如沃尔德曼-哈格勒（Waldman–Hagler））的原因之一。
:::
:::

::: exercise 丁烷的布居 {level=2 check="0.620"}
把丁烷的每个扭转势阱当作单一状态，旁式构象体高于反式$2.93\ \mathrm{kJ\,mol^{-1}}$，计算$298.15\ \mathrm{K}$下反式丁烷的摩尔分数。（保留三位有效数字。）
::: solution
$e^{-2930/(8.31446 \times 298.15)} = e^{-1.182} = 0.3067$，旁式阱有两个，故$x_\mathrm{anti} = 1/(1 + 2 \times 0.3067) = 0.620$。简并因子$2$与能量同样重要：高温下该分数趋于$1/3$，而不是$1/2$。
:::
:::

::: exercise 分摊乙烷的势垒 {level=2 check="1.33"}
乙烷内部旋转的实验势垒约$12.0\ \mathrm{kJ\,mol^{-1}}$。全原子力场中，九个H–C–C–H扭转各带一项$\tfrac{1}{2}V_3(1 + \cos 3\phi)$。忽略1–4非键贡献，$V_3$取何值可复现势垒？（以$\mathrm{kJ\,mol^{-1}}$输入$V_3$。）
::: solution
重叠式中九个二面角全为$0^\circ$、$\pm120^\circ$——每项都在最大值$V_3$；交错式中它们为$60^\circ$、$180^\circ$、$300^\circ$——每项都是零。因此势垒为$9V_3$，故$V_3 = 12.0/9 = 1.33\ \mathrm{kJ\,mol^{-1}}$。实际上H$\cdots$H的1–4 Lennard-Jones与库仑项也随$\phi$变化，扭转参数拟合的是势垒的*余量*，这就是它因力场而异的原因。
:::
:::

::: exercise 截断能省多少？ {level=3 check="11.9"}
一个溶剂化的蛋白质有$5000$个原子，原子数密度为$0.100\ \mathrm{\AA^{-3}}$。把完整非键求和中的原子对数与$10.0\ \mathrm{\AA}$截断半径内的对数作比较（忽略边界效应）。截断把工作量减小到多少分之一？（输入该倍数。）
::: hint
每个原子在截断半径内约有$\tfrac{4}{3}\pi r_\mathrm{c}^{3}\rho$个近邻，而乘以$N$会把每一对数两次。
:::
::: solution
全部原子对：$N(N - 1)/2 = 5000 \times 4999/2 = 1.25\times10^{7}$。每个原子的近邻数：$\tfrac{4}{3}\pi(10.0)^{3}(0.100) = 419$，故截断内的原子对数为$5000 \times 419/2 = 1.05\times10^{6}$。比值为$1.250\times10^{7}/1.047\times10^{6} = 11.9$。节省随$N$线性增长：对一百万原子的体系约为$2400$倍。这就是邻居列表与截断（远程库仑部分配合埃瓦尔德方法）使大规模模拟成为可能的原因。
:::
:::

::: exercise 推导Lennard-Jones势阱的曲率 {level=3 check="26.3"}
证明Lennard-Jones势阱底部的曲率为$V'' = 72\varepsilon/r_\mathrm{min}^{2}$，并由此求氩二聚体（$\varepsilon = 0.996\ \mathrm{kJ\,mol^{-1}}$、$r_\mathrm{min} = 3.822\ \mathrm{\AA}$、$\mu = 19.97\ \mathrm{u}$）在该模型中的简谐振动波数。（以$\mathrm{cm^{-1}}$输入$\tilde\nu$。）
::: solution
推导即[[#prop-lj]]的证明。每分子$\varepsilon = 996/6.02214\times10^{23}\ \mathrm{J} = 1.654\times10^{-21}\ \mathrm{J}$，故$k = 72 \times 1.654\times10^{-21}\ \mathrm{J}/(3.822\times10^{-10}\ \mathrm{m})^{2} = 0.8152\ \mathrm{N\,m^{-1}}$——比HCl的键弱约六百倍。由$\mu = 19.97 \times 1.66054\times10^{-27}\ \mathrm{kg} = 3.316\times10^{-26}\ \mathrm{kg}$，
$$
\tilde\nu = \frac{1}{2\pi c}\sqrt{\frac{k}{\mu}} = \frac{4.958\times10^{12}\ \mathrm{s^{-1}}}{2\pi \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}}} = 26.3\ \mathrm{cm^{-1}} .
$$
零点能$13\ \mathrm{cm^{-1}}$是势阱深度（$83\ \mathrm{cm^{-1}}$）的六分之一，而真实的氩二聚体只有寥寥几条束缚振动能级：对如此弱束缚的体系，简谐图像很差。
:::
:::

::: exercise 拟合扭转项 {level=3 check="10.1"}
某C–C键的量子化学扫描给出相对能量$0.0$（$\phi = 180^\circ$）、$11.5$（$\phi = 120^\circ$）与$2.6\ \mathrm{kJ\,mol^{-1}}$（$\phi = 60^\circ$）。在力场其余各项全部包含的情况下，*不含*扭转项的力场在相同角度给出$0.0$、$1.0$与$1.5\ \mathrm{kJ\,mol^{-1}}$。先把$180^\circ$处的残差平移为参考，再把扭转$\tfrac{1}{2}V_1(1 + \cos\phi) + \tfrac{1}{2}V_3(1 + \cos 3\phi)$拟合到残差上。（以$\mathrm{kJ\,mol^{-1}}$输入$V_3$。）
::: solution
要复现的残差为$\Delta(180^\circ) = 0$、$\Delta(120^\circ) = 10.5$、$\Delta(60^\circ) = 1.1\ \mathrm{kJ\,mol^{-1}}$。扭转函数$T(\phi)$满足$T(180^\circ) = \tfrac{1}{2}V_1(0) + \tfrac{1}{2}V_3(1 - 1) = 0$；$T(120^\circ) = \tfrac{1}{2}V_1(1 - \tfrac{1}{2}) + \tfrac{1}{2}V_3(1 + 1) = \tfrac{1}{4}V_1 + V_3$；$T(60^\circ) = \tfrac{1}{2}V_1(1 + \tfrac{1}{2}) + \tfrac{1}{2}V_3(1 - 1) = \tfrac{3}{4}V_1$。于是$V_1 = \tfrac{4}{3} \times 1.1 = 1.47\ \mathrm{kJ\,mol^{-1}}$，$V_3 = 10.5 - \tfrac{1}{4} \times 1.47 = 10.1\ \mathrm{kJ\,mol^{-1}}$。
:::
:::
