两个自由度的系统有两个固有频率和两个振型，而振型就是全部主题。单自由度模型回答"共振在哪里？"；多自由度模型回答"共振被激励时什么东西在动、激振器看到的又是什么？"——而这正是决定一个支承、一套振动台设置或一个传感器位置究竟管不管用的问题。

三个结果撑起整个主题。无阻尼保守系统的振型关于质量矩阵和刚度矩阵**都正交**，这意味着方程可以旋转到互不说话的**模态坐标**，于是一般的受迫问题化为一组独立的单自由度问题。每个模态对频率响应贡献一项，所以响应是**共振之和**。而在任意两个共振之间，响应穿过一个**零点**，即反共振，在那里被驱动点无论被推得多狠都不动。

::: warning 振型不是你能直接观测到的挠度
某一频率上实测的工作挠度振型是各模态的**混合物**，把它当作振型来读是试验模态工作中最常见的错误。只有在共振处、且只有当各模态分隔良好时，工作振型才接近模态振型。反过来，模态振型只定义到一个乘常数——它的**归一化**是一种约定，不是物理事实——所以把计算振型和实测振型作比较，比较的是**形状**，通常用一个相关系数，而绝不比较幅值。
:::

::: quiz
一个三自由度比例阻尼系统的驱动点机械导纳在40、90和150 Hz处有共振。在40到90 Hz之间有：
- [ ] 另一个共振，因为模态成对出现
- [x] 恰好一个反共振，在那里被驱动点不动
- [ ] 一个响应与静挠度同相的频带，此外别无变化
- [ ] 没有什么特别的，因为只有共振要紧
::: solution
三自由度驱动点机械导纳中有$n - 1 = 2$个反共振，每对共振之间一个。在反共振处被驱动坐标**静止**而结构其余部分在动，因为其余质量传来的反力恰好平衡了该处的外加力。这就是为什么从单点驱动的模态试验可能完全漏掉一个模态——在该模态的反共振处驱动，它的留数就是零——也是为什么标准做法是从至少两个相距很远的点驱动，或者用带顶杆的振动台驱动一个由加速度计初步整体布置选定的点。
:::
:::

## 二自由度系统

::: definition 运动方程与特征值问题 {#def-eigenproblem}
对质量向量$\mathbf{x}$、质量矩阵$\mathbf{M}$和刚度矩阵$\mathbf{K}$，
$$
\mathbf{M} \ddot{\mathbf{x}} + \mathbf{K} \mathbf{x} = \mathbf{F} (t) .
$$
自由简谐运动$\mathbf{x} = \boldsymbol{\phi} \cos \omega t$给出广义特征值问题
$$
\left( \mathbf{K} - \omega^{2} \mathbf{M} \right) \boldsymbol{\phi} = \mathbf{0},
$$
只对使$\det \left( \mathbf{K} - \omega^{2} \mathbf{M} \right)$为零的$n$个$\omega^{2}$值有解。$n = 2$时特征方程是关于$\omega^{2}$的二次方程，其两个根就是固有频率；每个根给出一个一维零空间，即**振型**$\boldsymbol{\phi}_r$，只定义到一个常数。
:::

::: definition 模态参数 {#def-modal-parameters}
旋转到模态坐标后，每个模态$r$由三个数向工程师概括自己：
$$
m_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r, \qquad
k_r = \omega_r^{2} m_r, \qquad
Q_r (t ) = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} (t ) ,
$$
即**模态质量**、**模态刚度**和**模态力**，外加两个与振型缩放方式无关的导出量：
$$
\Gamma_r = \frac{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota}}{m_r}
\qquad \text{与} \qquad
M_r^{*} = \frac{\left( \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota} \right)^{2}}{m_r} .
$$
这里$\boldsymbol{\iota}$是单位向量，$\Gamma_r$、$M_r^{*}$是基础激励下的**参与因子**和**有效模态质量**。有效模态质量之和等于总质量，所以它们直接说出每个模态带动了结构的多大份额；有效质量只有总质量百分之一的模态，对位移通常可以丢弃，对加速度却不行——加速度按$\omega_r^{2}$给它加权。
:::

::: proof 振型的正交性 {#proof-orthogonality}
设$\left( \omega_r, \boldsymbol{\phi}_r \right)$和$\left( \omega_s, \boldsymbol{\phi}_s \right)$是$\mathbf{K} \boldsymbol{\phi} = \omega^{2} \mathbf{M} \boldsymbol{\phi}$的两个不同解。则
$$
\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_r = \omega_r^{2} \, \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r,
\qquad
\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_s = \omega_s^{2} \, \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_s .
$$
$\mathbf{K}$和$\mathbf{M}$都对称，所以左端相等，而第二个右端等于$\omega_s^{2} \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r$。相减，
$$
\left( \omega_r^{2} - \omega_s^{2} \right) \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0
\quad\Longrightarrow\quad
\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0 \quad \text{对 } r \ne s .
$$
回代得$\boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{K} \boldsymbol{\phi}_r = \omega_r^{2} \boldsymbol{\phi}_s^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r = 0$，所以模态关于**两个**矩阵都正交，且
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi} = \operatorname{diag} \left( m_r \right),
\qquad
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi} = \operatorname{diag} \left( \omega_r^{2} m_r \right) = \operatorname{diag} \left( k_r \right) ,
$$
由此定义每个模态的**模态质量**$m_r$和**模态刚度**$k_r$。$\checkmark$

**注。**模态质量$m_r$取决于振型的缩放方式，单独看并不是物理量；上面定义的有效模态质量$M_r^{*}$才是，并且它们之和等于总质量。对计算最有用的归一化是取$m_r = 1$（质量归一化），对解读模型最有用的归一化是把每个模态的最大分量取为一。比较两个模型之前，值得先弄清所用软件采用的是哪种约定。
:::

::: theorem 模态展开与机械导纳 {#thm-modal-expansion}
写$\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$并利用正交性，运动方程分离为$n$个独立的标量方程
$$
m_r \ddot{q}_r + c_r \dot{q}_r + k_r q_r = Q_r (t) = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} (t) ,
$$
前提是阻尼也被对角化，而**比例阻尼**$\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$保证这一点。于是坐标$i$与$j$之间的频率响应——**机械导纳**——是模态上的求和，
$$
\alpha_{ij} (\omega) = \frac{X_i}{F_j} = \sum_r \frac{\phi_r (i ) \phi_r (j )}{k_r - \omega^{2} m_r} .
$$
:::

::: proof 模态之和与反共振的存在 {#proof-receptance}
取$\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$，把$\mathbf{M} \ddot{\mathbf{x}} + \mathbf{K} \mathbf{x} = \mathbf{F}$左乘$\boldsymbol{\Phi}^{\mathrm{T}}$并利用正交性，得$m_r \ddot{q}_r + k_r q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F}$，其简谐解为$q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F} / \left( k_r - \omega^{2} m_r \right)$。还原$\mathbf{x} = \sum_r \boldsymbol{\phi}_r q_r$，读出$j$处单位力下第$i$个分量，
$$
\alpha_{ij} (\omega ) = \sum_r \frac{\phi_r (i ) \phi_r (j )}{k_r - \omega^{2} m_r} .
$$
这是$n$项之和，每项在一个固有频率处有极点，所以响应有$n$个共振。对**驱动点**机械导纳（$i = j$），每个留数$\phi_r (i )^{2} / m_r$都为正，所以刚越过一个极点时求和是很大的负值，到下一个极点之前又是很大的正值；它在其间连续，必然穿过零。**因此驱动点机械导纳的每对共振之间必有一个反共振**，共$n - 1$个。对传递机械导纳（$i \ne j$），留数可正可负，两个共振之间可能没有反共振。$\checkmark$

**注。**反共振是吸振器能工作的原因，是振动台有时无法在结构明明在动的频率上激励起结构的原因，也是模态试验必须从多个点驱动的原因：在反共振处驱动，模态就隐形，仪器再灵敏也没用。
:::

::: example 两质量三弹簧 {#ex-two-mass}
两个$2\ \mathrm{kg}$的质量由一根$800\ \mathrm{N / m}$的弹簧相连，各自又用相同的弹簧连到墙上。求固有频率和振型。
::: solution
$$
\mathbf{M} = 2 \mathbf{I}, \qquad
\mathbf{K} = 800 \begin{pmatrix} 2 & - 1 \\ - 1 & 2 \end{pmatrix} ,
\qquad
\det \left( \mathbf{K} - \omega^{2} \mathbf{M} \right) = 0 .
$$
展开，$\left( 1600 - 2 \omega^{2} \right)^{2} - \left( 800 \right)^{2} \times 1 = 0$化为
$$
\omega^{4} - 1600 \omega^{2} + 480\,000 = 0
\quad\Longrightarrow\quad
\omega^{2} = 400 , 1200 ,
$$
$$
\omega_1 = 20\ \mathrm{rad / s} \left( 3.18\ \mathrm{Hz} \right), \quad
\omega_2 = 34.64\ \mathrm{rad / s} \left( 5.51\ \mathrm{Hz} \right),
\qquad
\boldsymbol{\phi}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \quad
\boldsymbol{\phi}_2 = \begin{pmatrix} 1 \\ - 1 \end{pmatrix} .
$$
**校核。**对这个对称系统$\omega_1^{2} = k / m$、$\omega_2^{2} = 3 k / m$，而$3 \times 800 / 2 = 1200$ $\checkmark$

**合理性检验。**两个模态是**同相**和**反相**运动，反相那个的刚度是三倍（频率是$\sqrt{3}$倍），因为中间弹簧和外侧两根弹簧一起被拉伸。这就是"两个相同系统耦合"故事的全部：耦合把一个频率劈成一个**双峰**，其间距度量耦合强度；实测双峰正是模态工程师发现松动螺栓、裂纹法兰或意外接触的手段——本应一起运动的结构两半被发现以略不同的频率运动，劈裂量告诉你连接已经弱到什么地步。
:::
:::

::: example 拍频与能量转移 {#ex-beats}
对例 1 的系统，把质量1位移$10\ \mathrm{mm}$，质量2留在原地，然后同时释放。求质量1第一次静止的时刻，并描述能量的去向。
::: solution
叠加两个模态，满足$x_1 (0 ) = d$、$x_2 (0 ) = 0$，
$$
x_1 = \frac{d}{2} \left( \cos \omega_1 t + \cos \omega_2 t \right)
     = d \cos \bar{\omega} t \cos \frac{\Delta \omega}{2} t,
\qquad
x_2 = \frac{d}{2} \left( \cos \omega_1 t - \cos \omega_2 t \right)
     = d \sin \bar{\omega} t \sin \frac{\Delta \omega}{2} t,
$$
其中$\bar{\omega} = 27.32$、$\Delta \omega = 14.64\ \mathrm{rad / s}$。质量1的包络在$\left( \Delta \omega / 2 \right) t = \pi / 2$时消失，
$$
t = \frac{\pi}{\Delta \omega} = \frac{\pi}{14.64} = 0.215\ \mathrm{s}.
$$
那一瞬间质量2承担全部运动，质量1恰好静止。

**校核。**$t = 0.215\ \mathrm{s}$时$\cos \left( 7.32 t \right) = 0$、$\sin \left( 7.32 t \right) = 1$，所以$x_2$的包络为$d$，而$x_1 = 0$精确成立。$\checkmark$

**合理性检验。**能量从一个质量迁移到另一个再返回，周期$0.43\ \mathrm{s}$，这就是振动频谱中一切**拍频**特征背后的机理：技术员报告"轴承坏了"的两个靠得很近的峰，常常是一个弱耦合结构的两个模态在交换能量。它也是**振动吸能器**的工作原理——一个调谐在宿主频率附近的轻附件，它不隔离宿主，而是在几分之一秒内把能量从宿主**抽走**，并且无论宿主是否在该频率被激励都工作，这一点不同于经典吸振器。
:::
:::

::: example 反共振 {#ex-antiresonance}
一台$100\ \mathrm{kg}$的机器装在$10\ \mathrm{MN / m}$的支承上，另有一个$10\ \mathrm{kg}$的支架经$1\ \mathrm{MN / m}$的螺栓接头连在机器上。求机器共振的频率，以及对机器施加力时它完全不动的频率。
::: solution
$$
\mathbf{K} = \begin{pmatrix} 11 \times 10^{6} & - 10^{6} \\ - 10^{6} & 10^{6} \end{pmatrix},
\qquad
\mathbf{M} = \begin{pmatrix} 100 & 0 \\ 0 & 10 \end{pmatrix} .
$$
**共振。**求解得$43.0\ \mathrm{Hz}$和$58.9\ \mathrm{Hz}$。
**反共振。**机器单独有$\sqrt{k_1 / m_1} / 2 \pi = 50.3\ \mathrm{Hz}$，支架单独也有$\sqrt{k_2 / m_2} / 2 \pi = 50.3\ \mathrm{Hz}$；驱动点的反共振恰在该频率。
**对$1\ \mathrm{kN}$的响应：**

- $43.0$和$58.9\ \mathrm{Hz}$：无阻尼时无界，振型中支架与机器的振幅比分别为$+ 3.70$和$- 2.70$
- $50.3\ \mathrm{Hz}$：机器$0.000\ \mathrm{mm}$，支架$1.00\ \mathrm{mm}$，与力反相
- 静态：两者均为$0.100\ \mathrm{mm}$

**合理性检验。**机器在$50.3\ \mathrm{Hz}$被支架按住了，支架在该频率的振荡幅值恰好使它经接头传回的力抵消外加力。这就是一个**调谐动力吸振器**，纯属偶然得之：任何轻附件，只要其固有频率与机器转速重合，就会保护机器；而同一个事实对试验工程师是个陷阱，因为结构在其自身某个反共振上被驱动时显得刚性十足，加速度计记录里明摆着的那个模态在锤击输入里始终不出现。
:::
:::

::: example 三层框架 {#ex-shear-frame}
一个三层建筑模型各层质量相同（$m$）、各层刚度相同（$k$）。求三个固有频率、振型，以及每个模态带动总质量的多少。
::: solution
$$
\frac{\omega_p}{\omega_0} = 2 \sin \frac{\left( 2 p - 1 \right) \pi}{14}, \qquad
\phi_p (j ) = \sin \frac{\left( 2 p - 1 \right) j \pi}{7}, \qquad \omega_0 = \sqrt{k / m},
$$
归一化为顶层位移为一，得

- 模态1：$0.445 \omega_0$，振型$\left( 0.445 , 0.802 , 1.000 \right)$
- 模态2：$1.247 \omega_0$，振型$\left( - 1.247 , - 0.555 , 1.000 \right)$
- 模态3：$1.802 \omega_0$，振型$\left( 1.802 , - 2.247 , 1.000 \right)$

**有效模态质量**$\left( \boldsymbol{\phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\iota} \right)^{2} / \left( \boldsymbol{\phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi} \right)$，与归一化无关：$2.742\ m$、$0.225\ m$和$0.033\ m$，即总质量的$91.4$、$7.5$和$1.1$个百分点。

**校核。**有效模态质量之和为$3.0\ m$，即系统总质量，本应如此。$\checkmark$

**合理性检验。**第一模态带动百分之九十一的质量，另外两个加起来不到九——这就是工程师把建筑当单自由度振子处理这一习惯的定量表述。它也是**基底剪力**法能用的原因，也是它对细长烟囱、长桥或高柔塔楼失效的原因：第二模态那百分之七点五可能支配响应，因为地面运动在第二模态频率处的能量远多于第一模态处。
:::
:::

::: example 模态阻尼 {#ex-modal-damping}
某支架的振动台试验给出第一模态（$60\ \mathrm{Hz}$）阻尼比$1.2\%$、第三模态（$240\ \mathrm{Hz}$）$3.8\%$。$200\ \mathrm{Hz}$的使用激励落在模态之间。估算响应，并说明模态阻尼假设在做什么。
::: solution
真实的阻尼矩阵未知，一般也不是比例的，所以模态不能使它精确解耦。通常的工程做法是假设比例阻尼，写$\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$并拟合两个实测值，
$$
\zeta_r = \frac{\alpha}{2 \omega_r} + \frac{\beta \omega_r}{2}, \qquad
\begin{cases} 0.012 = \alpha / \left( 2 \omega_1 \right) + \beta \omega_1 / 2 \\ 0.038 = \alpha / \left( 2 \omega_3 \right) + \beta \omega_3 / 2 \end{cases}
$$
取$\omega_1 = 2 \pi \times 60$、$\omega_3 = 2 \pi \times 240$，得
$$
\alpha = 2.01\ \mathrm{s^{- 1}}, \qquad \beta = 4.95 \times 10^{- 5}\ \mathrm{s},
\qquad
\zeta (200\ \mathrm{Hz} ) = 0.032 .
$$
**合理性检验。**在两个拟合模态之间，关于$\omega$的抛物线无害地插值，其极小点位于$\sqrt{\alpha / \beta} / 2 \pi = 32\ \mathrm{Hz}$，在关注范围之下。范围**之外**就是另一回事：同一拟合预测$600\ \mathrm{Hz}$处$\zeta = 0.094$，几乎是最大实测值的三倍；$20\ \mathrm{Hz}$处$\zeta = 0.011$。所以瑞利拟合是一条插值公式而不是材料属性，需要在试验范围之外的频率上得到保守答案的分析员必须扩大试验，而不能相信曲线——这条规则作废过的飞行试验振动分析不止一套。更深层的要点是：实测阻尼是**模态**的属性，不是材料的属性；一个阻尼在一三模态之间相差三倍的结构并非行为不端——它恰恰像任何真实装配结构一样行为端正，因为阻尼在接头里。
:::
:::

::: example 设计 {#ex-design-panel}
一块质量$6\ \mathrm{kg}$的仪表板螺栓连接到飞机蒙皮上。蒙皮在$180\ \mathrm{Hz}$有一个共振，有效模态质量$40\ \mathrm{kg}$，而仪表板不得放大$300\ \mathrm{Hz}$以下的任何东西。求所需的仪表板安装刚度，并校核仪表板是否破坏蒙皮的共振。
::: solution
**仪表板频率。**对仪表板自身的模态把蒙皮视为接地，
$$
f_{\text{panel}} = \frac{1}{2 \pi} \sqrt{\frac{k}{6}} > 300
\quad\Longrightarrow\quad
k > 6 \times \left( 2 \pi \times 300 \right)^{2} = 2.13 \times 10^{7}\ \mathrm{N / m}.
$$
**与蒙皮的耦合。**取$\mu = m_p / m_s = 0.15$、$\rho = f_p / f_s = 1.667$，两个耦合频率满足
$$
x^{2} - \left[ 1 + \rho^{2} \left( 1 + \mu \right) \right] x + \rho^{2} = 0,
\qquad x = \left( f / f_s \right)^{2},
$$
得$x = 3.370$和$0.824$，所以
$$
f = 1.836 f_s \text{ 和 } 0.908 f_s = 330\ \mathrm{Hz} \text{ 和 } 163\ \mathrm{Hz} .
$$
蒙皮的共振从$180$降到$163\ \mathrm{Hz}$，并在$330\ \mathrm{Hz}$出现第二个峰。

**设计点评。**一块刚、轻、支承良好的仪表板对蒙皮动力学几乎透明，百分之九的偏移在装配结构的散布范围之内。**不可**接受的是把重板装到轻蒙皮上再分别分析这一惯用捷径：若仪表板是$40\ \mathrm{kg}$而不是$6\ \mathrm{kg}$，质量比就是1，两个耦合频率将是原值的$0.675$和$2.47$倍，于是蒙皮共振从$180$降到$122\ \mathrm{Hz}$，正好落在本来避开的激励上。经验法则是：附属结构的质量不得超过主结构在连接点处**模态**质量的约十分之一——这就是航电箱装到框架上而不是装到面板上的原因。
:::
:::

::: widget plot
f: 1/(1+abs((0.1 - 0.1*x*x)/((1.1 - x*x)*(0.1 - 0.1*x*x) - 0.01)))
x: 0.05, 2.5
y: 0, 1
labels: 1/(1+|X1|/static)
caption: "二自由度系统的驱动点响应：一个主振子带一个质量比0.10、调谐到它的轻附件。图中画1/(1+|X1|)，使两个共振显示为极小值、反共振显示为1处的极大值。主系统的单个共振劈成双峰，在两峰之间，主质量在其固有频率上被附件的反作用精确按住不动。"
:::

::: history
耦合系统的**固有模态**可追溯到丹尼尔·伯努利（Daniel Bernoulli）1753年对振动弦的谐波叠加，并由**拉格朗日（Lagrange）**在1788年的《分析力学》（*Mécanique analytique*）中给出一般基础——他的小振动运动方程直接导出这里所用的两个对称矩阵的特征值问题。**瑞利（Rayleigh）**的《声学理论》（1877–1878）给出了每门振动课程仍在复述的能量法、正交性论证和摄动公式，**里茨（Ritz）**1909年的方法把假设形状变成系统的近似方法。**动力吸振器**由**弗拉姆（Frahm）**取得专利（1909年申请），其有阻尼理论由**奥蒙德罗伊德（Ormondroyd）**与**邓·哈托（Den Hartog）**于1928年发表，邓·哈托的《机械振动》（1934）给出了至今仍在使用的最优调谐法则。试验模态分析从**肯尼迪（Kennedy）**与**潘库（Pancu）**1947年引入的实测频率响应矢量图，发展到20世纪70年代基于FFT的方法。
:::

## 后续内容

这些模态所推广的单自由度系统见[[vibrations/free-vibration]]和[[vibrations/harmonic-excitation]]，例 3 的反共振所解释的吸振器在[[vibrations/vibration-absorbers]]中展开，从有限元模型数值提取模态见[[vibrations/continuous-systems]]，试验提取则是[[vibrations/modal-analysis]]的主题。连续系统是$n$趋于无穷的极限，在[[vibrations/continuous-systems]]中处理。

::: summary
- $n$自由度系统有$n$个固有频率和$n$个振型，由广义特征值问题求出。
- 振型关于$\mathbf{M}$和$\mathbf{K}$都正交，所以阻尼比例时方程解耦为$n$个独立的模态振子。
- 频率响应是模态上的求和，每个模态贡献一个极点；每对极点之间躺着一个**零点**，即反共振。
- 耦合把频率劈成双峰，其间距度量耦合强度，并随能量在各部分之间迁移产生拍频。
- 模态质量告诉你每个模态带动总质量的多少；当第一模态带动九成时，单自由度模型就是合理的。
- 附属到主结构上的次级结构会改变两个频率，安全限度是相对主结构在连接点处的**模态**质量足够小。
:::

## 习题

::: exercise 自由度数 {level=1 check="2"}
两个自由度的系统有几个固有频率？
::: solution
两个。
:::
:::

::: exercise 正交性 {level=1 check="0"}
对例 1 的系统，用$\boldsymbol{\phi}_1 = \left( 1 , 1 \right)$和$\boldsymbol{\phi}_2 = \left( 1 , - 1 \right)$计算$\boldsymbol{\phi}_1^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_2$。
::: solution
$2 \times 1 \times 1 + 2 \times 1 \times \left( - 1 \right) = 0$，正交性所要求的那样。
:::
:::

::: exercise 模态质量 {level=1 check="1"}
用例 1 的同一归一化，两个模态质量之比$m_1 / m_2$是多少？
::: solution
都是$4\ \mathrm{kg}$，所以比值为$1$。
:::
:::

::: exercise 反共振 {level=1 check="1"}
二自由度系统的驱动点机械导纳含几个反共振？
::: solution
一个——$n$自由度系统为$n - 1$个。
:::
:::

::: exercise 频率 {level=2}
两个$5\ \mathrm{kg}$的质量经三根各$2\ \mathrm{kN / m}$的弹簧串联在刚性墙之间。求固有频率和振型。
::: solution
$$
\mathbf{K} = 2000 \begin{pmatrix} 2 & - 1 \\ - 1 & 2 \end{pmatrix}, \quad
\mathbf{M} = 5 \mathbf{I}, \qquad
\omega^{2} = \frac{2000}{5} \times \left\{ 1 , 3 \right\},
$$
$$
\omega_1 = 20\ \mathrm{rad / s} \left( 3.18\ \mathrm{Hz} \right), \quad
\omega_2 = 34.6\ \mathrm{rad / s} \left( 5.51\ \mathrm{Hz} \right),
\qquad
\boldsymbol{\phi}_1 = \left( 1 , 1 \right), \ \boldsymbol{\phi}_2 = \left( 1 , - 1 \right) .
$$
**合理性检验。**答案与例 1 完全相同，因为重要的只是比值$k / m$；这个系统就是例 1 缩放后的同一个系统。更一般地，几何相似结构的频率按$\left( 1 / L \right) \sqrt{E / \rho}$缩放，所以十分之一缩尺的钢模型频率是原型的十倍；缩尺模型的结果因此要通过相似律来解读，而不能直接读取。
:::
:::

::: exercise 模态展开 {level=2}
对例 1 的系统，把初始条件$x_1 (0 ) = d$、$x_2 (0 ) = 0$、$\dot{\mathbf{x}} = 0$表示为模态之和，并求模态幅值。
::: solution
展开$\mathbf{x}_0 = c_1 \boldsymbol{\phi}_1 + c_2 \boldsymbol{\phi}_2$并利用正交性，
$$
c_r = \frac{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \mathbf{x}_0}{\boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r} ,
\qquad
c_1 = \frac{2 d}{2 \times 2} = \frac{d}{2},
\qquad
c_2 = \frac{2 \times 1 \times d + 2 \times \left( - 1 \right) \times 0}{4} = \frac{d}{2} ,
$$
所以
$$
\mathbf{x} (t ) = \frac{d}{2} \left( 1 , 1 \right) \cos \omega_1 t + \frac{d}{2} \left( 1 , - 1 \right) \cos \omega_2 t ,
$$
$t = 0$时给出所需的$\left( d , 0 \right)$。
**合理性检验。**两个模态被同等激励，这就是释放**一个**质量产生完整拍频的原因；按某个振型的比例**一起**释放两个质量则只激励那个模态，产生纯单频运动。第二种情形就是**纯模态**的定义，而要产生它的实际困难——激振器必须施加正确的力分布，而不只是正确的频率——正是模态试验靠扫频比相位而不是靠干净地激起单一模态来识别模态的原因。
:::
:::

::: exercise 耦合频率 {level=2}
两台相同的机器各自的隔振固有频率都是$25\ \mathrm{Hz}$。试验发现共振在$24$和$26\ \mathrm{Hz}$。把耦合刚度估计为每台机器自身刚度的分数。
::: solution
对经$k_c$耦合的两个相同振子，
$$
\omega_{1,2}^{2} = \omega_0^{2}, \ \omega_0^{2} + 2 k_c / m
\quad\Longrightarrow\quad
\frac{k_c}{k} = \frac{\omega_2^{2} - \omega_1^{2}}{2 \omega_0^{2}}
= \frac{26^{2} - 24^{2}}{2 \times 25^{2}} = \frac{100}{1250} = 0.08 .
$$
**合理性检验。**百分之四的频率偏移对应百分之八的耦合刚度，所以两台机器是弱耦合——经共享的管架或共同的基础垫块，而不是螺栓框架。平方律关系正是测量如此灵敏的原因：现代分析仪轻易分辨的百分之一劈裂，对应仅百分之二的耦合刚度——静力检查看不见它，却完全足以把振动从一台机器传到另一台。
:::
:::

::: exercise 剪切框架 {level=2}
对例 4 的框架，求框架承受基底加速度$a$时各模态的层剪力，并由此求模态参与因子。
::: solution
基底加速度$a$的载荷向量为$\mathbf{F} = a m \left( 1 , 1 , 1 \right)$，所以模态力为$Q_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{F}$，用例 4 的归一化，
$$
Q_1 = 2.247 \, a m, \qquad Q_2 = - 0.802 \, a m, \qquad Q_3 = 0.555 \, a m,
$$
广义质量$m_r = \boldsymbol{\phi}_r^{\mathrm{T}} \mathbf{M} \boldsymbol{\phi}_r$为$1.841\ m$、$2.863\ m$和$9.296\ m$。于是参与因子$\Gamma_r = Q_r / \left( a m_r \right)$为
$$
\Gamma_1 = 1.221, \qquad \Gamma_2 = - 0.280, \qquad \Gamma_3 = 0.060,
$$
而有效模态质量$Q_r^{2} / \left( a m_r \right)$还原为$2.742\ m$、$0.225\ m$和$0.033\ m$，求和得总质量$3\ m$。
**合理性检验。**对**位移**，各模态按有效质量之比$91 : 7.5 : 1.1$贡献，单模态答案非常好。对**加速度**，它们按$M_r^{*} \omega_r^{2}$之比贡献，即$0.543 : 0.350 : 0.107$，所以第三模态——只带动百分之一质量的那个——提供了楼面加速度的百分之十一。这就是规范要求各模态贡献按平方和开根号组合、而不是只保留第一模态背后的算术，也是**加速度敏感**内容物的反应谱分析需要比基底剪力多得多的模态的原因。
:::
:::

::: exercise 吸振器 {level=3}
对例 3 的系统，把支架刚度减半并重新计算两个共振和反共振。这一变化对机器在$50.3\ \mathrm{Hz}$的响应有什么影响？
::: solution
$k_2 = 0.5\ \mathrm{MN / m}$时支架自身频率降到$35.6\ \mathrm{Hz}$，共振移到$34.1$和$52.6\ \mathrm{Hz}$，反共振随支架移到$35.6\ \mathrm{Hz}$。$50.3\ \mathrm{Hz}$处机器的响应不再是零而是$1.00\ \mathrm{mm}$——静变形的十倍——而且机器此时已接近位于$52.6\ \mathrm{Hz}$的新的上共振。
**合理性检验。**反共振**不是**组合系统的属性，而是附件的属性，它恰好坐在附件自身的固有频率上。所以支架刚度减半在转速处毁掉了保护，同时在$35.6\ \mathrm{Hz}$制造出一个没人要的抵消。这就是吸振器**失谐**的全部——一个松动的螺栓接头、一个开裂的支架、或一个随老化变软的橡胶支承，都会把反共振从它保护着的转速移开，机器的振动便原样归来。这也是吸振器必须按频率而不是按外观检查的原因，也是橡胶安装的吸振器在橡胶会老化的场合是糟糕设计的原因。
:::
:::

::: exercise 推导 {level=3}
证明比例阻尼$\mathbf{C} = \alpha \mathbf{M} + \beta \mathbf{K}$可被振型对角化，且模态阻尼比为$\zeta_r = \alpha / \left( 2 \omega_r \right) + \beta \omega_r / 2$。
::: solution
左乘$\boldsymbol{\Phi}^{\mathrm{T}}$并代入$\mathbf{x} = \boldsymbol{\Phi} \mathbf{q}$，
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi} \ddot{\mathbf{q}}
+ \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{C} \boldsymbol{\Phi} \dot{\mathbf{q}}
+ \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi} \mathbf{q}
= \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{F} ,
$$
阻尼块成为
$$
\boldsymbol{\Phi}^{\mathrm{T}} \mathbf{C} \boldsymbol{\Phi}
= \alpha \, \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{M} \boldsymbol{\Phi}
+ \beta \, \boldsymbol{\Phi}^{\mathrm{T}} \mathbf{K} \boldsymbol{\Phi}
= \operatorname{diag} \left( \alpha m_r + \beta \omega_r^{2} m_r \right),
$$
它是对角的，因为$\mathbf{M}$和$\mathbf{K}$在模态坐标下都是对角的。于是第$r$个模态方程为
$$
m_r \ddot{q}_r + m_r \left( \alpha + \beta \omega_r^{2} \right) \dot{q}_r + \omega_r^{2} m_r q_r = Q_r ,
$$
除以$m_r$并与$\ddot{q}_r + 2 \zeta_r \omega_r \dot{q}_r + \omega_r^{2} q_r = Q_r / m_r$比较，得
$$
2 \zeta_r \omega_r = \alpha + \beta \omega_r^{2}
\quad\Longrightarrow\quad
\zeta_r = \frac{\alpha}{2 \omega_r} + \frac{\beta \omega_r}{2} . \quad \checkmark
$$
**注。**这种双参数形式称为**瑞利阻尼**，其关于$\omega$的抛物线在$\omega = \sqrt{\alpha / \beta}$处有极小值——这就是拟合两个模态会高估其间阻尼、低估其外阻尼的原因。该构造可推广到更多参数，但拟合两个以上模态的阻尼矩阵通常物理上不可实现——它无法由任何真实阻尼器的分布装配出来——而需要它的模型正在告诉你阻尼**不**比例、模态不是合适的坐标。
:::
:::
