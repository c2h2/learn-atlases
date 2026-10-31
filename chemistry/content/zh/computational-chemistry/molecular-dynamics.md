几何优化把分子滑到势能阱的底端然后停下。真实分子从不停下。室温下每个原子都有$k_\mathrm{B}T$量级的动能，键在振动，侧链在旋转，溶剂分子互相推挤、交换伙伴，而液体或蛋白质被测得的性质——密度、热容、扩散系数、平均结构——是这场无休无止运动的*平均*。**分子动力学**（molecular dynamics, MD）直接计算这些平均：在力场（[[computational-chemistry/molecular-mechanics]]）或电子结构理论提供的势能面上，它为每个原子一步步积分牛顿运动方程，再用统计力学的工具分析所得的轨迹（[[statistical-thermodynamics/canonical-ensemble]]）。本课建立使长而稳定的轨迹成为可能的积分器、让几千个原子代表宏观液体的技巧、控制温度与压强的恒温器和恒压器，以及把轨迹变成能与实验比较的数字的分析方法。

## 运动方程与各态历经思想

对位置为$\mathbf{r}_i$、质量为$m_i$、势能为$U(\mathbf{r}_1, \dots, \mathbf{r}_N)$的$N$个原子，牛顿第二定律写作
$$
m_i\ddot{\mathbf{r}}_i = \mathbf{F}_i = -\nabla_iU .
$$ {#eq-newton}
总能量$E = K + U$（其中$K = \sum_i\tfrac{1}{2}m_i\lvert\dot{\mathbf{r}}_i\rvert^{2}$）守恒，所以孤立的模拟采样**微正则**（NVE）系综。统计力学要的是系综平均$\langle A\rangle = \int A(\mathbf{r}, \mathbf{p})\,P(\mathbf{r}, \mathbf{p})\,\mathrm{d}\mathbf{r}\,\mathrm{d}\mathbf{p}$；分子动力学给出的则是时间平均
$$
\bar A = \lim_{\tau\to\infty}\frac{1}{\tau}\int_0^{\tau}A\left(\mathbf{r}(t), \mathbf{p}(t)\right)\mathrm{d}t .
$$
**各态历经假说**断言二者相等：只要时间足够长，轨迹就按权重访问常数能量面上的每个区域。对真实体系它无法证明，而且只要轨迹被陷住，它在实践中就会失效——被一道高的扭转势垒挡住、困在模拟时间尺度上永不展开的折叠蛋白里、困在玻璃里。"足够长的时间"是模拟的核心实际问题，也正是[[computational-chemistry/free-energy-sampling]]中增强采样方法存在的原因。

## 积分运动方程

方程[[#eq-newton]]对两个以上的粒子就无法解析求解，只能用时间步长$h$（常写作$\Delta t$）数值积分。其要求很不寻常。单步的精度远不如**长期稳定性**重要：一次模拟要跑$10^{6}$–$10^{9}$步，而能量不能漂移。求力是迄今最贵的操作，所以积分器每步应当只需要一次求力。而且轨迹是混沌的，无论怎么做，几千步后它就会偏离精确轨迹；我们要的是一条采样正确系综的轨迹。

::: proposition 韦尔莱（Verlet）算法 {#prop-verlet}
相继步的位置满足
$$
\mathbf{r}(t + h) = 2\mathbf{r}(t) - \mathbf{r}(t - h) + \frac{h^{2}}{m}\mathbf{F}(t) + O(h^{4}),
$$
其等价的**速度韦尔莱**形式显式携带速度：
$$
\mathbf{r}(t + h) = \mathbf{r}(t) + h\mathbf{v}(t) + \frac{h^{2}}{2m}\mathbf{F}(t), \qquad
\mathbf{v}(t + h) = \mathbf{v}(t) + \frac{h}{2m}\left[\mathbf{F}(t) + \mathbf{F}(t + h)\right].
$$
位置的局部误差为$O(h^{4})$，固定时间后的整体误差为$O(h^{2})$，格式是**时间可逆**的，且每步只需一次新的求力。
:::

::: proof
把$\mathbf{r}(t \pm h)$作泰勒级数展开：
$$
\mathbf{r}(t \pm h) = \mathbf{r}(t) \pm h\dot{\mathbf{r}}(t) + \tfrac{1}{2}h^{2}\ddot{\mathbf{r}}(t) \pm \tfrac{1}{6}h^{3}\dddot{\mathbf{r}}(t) + O(h^{4}).
$$
两式相加消去$h$的一切奇次幂：$\mathbf{r}(t + h) + \mathbf{r}(t - h) = 2\mathbf{r}(t) + h^{2}\ddot{\mathbf{r}}(t) + O(h^{4})$，再由$\ddot{\mathbf{r}} = \mathbf{F}/m$即得位置形式。把$h$换成$-h$方程不变（$t + h$与$t - h$互换角色），所以倒着跑算法会原路返回轨迹——时间可逆性。对速度形式，利用速度作为中心差分的定义消去$\mathbf{r}(t - h)$；把相继两步的速度韦尔莱方程代入即可再现位置形式，所以两者生成完全相同的轨迹。每步$O(h^{4})$的误差在$\tau/h$步上积累，而稳定振动系统中的误差只线性增长，故整体误差为$O(h^{2})$。
:::

韦尔莱不是每步最精确的积分器——四阶龙格-库塔法的局部误差小得多——但它有一个更深的性质：它是**辛**（symplectic）的，即像哈密顿动力学一样精确保持相空间体积（刘维尔定理）。辛积分器精确守恒一个与真实哈密顿量相差$O(h^{2})$的"影子"哈密顿量，所以它的能量在窄带内*涨落*，却不在几百万步中系统性漂移。非辛方法——包括龙格-库塔法——会积累缓慢的能量漂移，毁掉长时模拟。

::: example 韦尔莱积分谐振子 {#ex-verlet-ho}
对$\ddot x = -x$（质量$1$，角频率$\omega = 1$）从$x = 1$、$v = 0$出发以$h = 0.1$积分，与精确解$x = \cos t$比较。$10\,000$步内能量表现如何？
::: solution
$F = -x$：第1步给出$x_1 = 1 + 0 + \tfrac{1}{2}(0.01)(-1) = 0.99500$，新的力为$-0.99500$，$v_1 = 0 + 0.05(-1 - 0.995) = -0.09975$。继续算下去：

| $t$ | $x$ | $v$ | $E = \tfrac{1}{2}(v^{2} + x^{2})$ | 精确$\cos t$ |
|---|---|---|---|---|
| $0.0$ | $1.00000$ | $0.00000$ | $0.500000$ | $1.00000$ |
| $0.1$ | $0.99500$ | $-0.09975$ | $0.499988$ | $0.99500$ |
| $0.2$ | $0.98005$ | $-0.19850$ | $0.499951$ | $0.98007$ |
| $0.3$ | $0.95530$ | $-0.29527$ | $0.499891$ | $0.95534$ |

在$10\,000$步（$160$个周期）内能量保持在$0.49875$与$0.50000$之间：它周期性地下降至多$h^{2}/8 = 0.00125$（$E$的$0.25\ \%$）而无漂移。对比显式欧拉法$x_{n+1} = x_n + hv_n$、$v_{n+1} = v_n - hx_n$：它*每一步*都把能量乘以$(1 + h^{2}) = 1.01$，十个周期（$628$步）后$E$从$0.5$涨到约$260$。
:::
:::

::: proposition 韦尔莱算法的稳定性 {#prop-verlet-stability}
对角频率为$\omega$的谐振子，韦尔莱算法产生有界振动当且仅当$\omega h < 2$。此时数值轨迹以频率$\tilde\omega$振动，满足
$$
\cos(\tilde\omega h) = 1 - \tfrac{1}{2}(\omega h)^{2}, \qquad \frac{\tilde\omega}{\omega} = 1 + \frac{(\omega h)^{2}}{24} + \cdots .
$$
:::

::: proof
对$\ddot x = -\omega^{2}x$，位置形式给出线性递推$x_{n+1} = (2 - \omega^{2}h^{2})x_n - x_{n-1}$。试$x_n = \lambda^{n}$：$\lambda^{2} - (2 - \omega^{2}h^{2})\lambda + 1 = 0$。两根之积为$1$。若判别式$(2 - \omega^{2}h^{2})^{2} - 4$为负，即$\lvert 2 - \omega^{2}h^{2}\rvert < 2$，对$h > 0$也就是$\omega h < 2$，则两根是模为$1$的共轭复数$\lambda = e^{\pm i\tilde\omega h}$，且$2\cos(\tilde\omega h) = 2 - \omega^{2}h^{2}$：有界振动。若$\omega h > 2$，两根为实数且其中一个的模大于$1$，解指数增长。把$\arccos(1 - \tfrac{1}{2}u^{2}) = u + u^{3}/24 + \cdots$展开即得频率偏移。
:::

::: widget plot
f: acos(1 - x^2/2)/x; 1
x: 0.02, 1.99
y: 0.95, 1.6
labels: \tilde\omega/\omega\ (\text{韦尔莱}); \text{精确}
vlines: 2
caption: 韦尔莱算法积分出的谐振子频率与真实频率之比随$\omega h$（时间步长乘以角频率）的变化。$\omega h = 0.1$时数值振子快了$0.04\ \%$；$\omega h = 1$时快了$4.7\ \%$；$\omega h = 2$（虚线）处格式失稳。设最快振动的周期为$\tau_\mathrm{vib}$，则$\omega h = 2\pi h/\tau_\mathrm{vib}$，所以常用的经验法则$h \approx \tau_\mathrm{vib}/10$对应$\omega h \approx 0.63$，仅该模式的频率误差为$1.7\ \%$。
:::

### 时间步长的选取

时间步长受体系中最快运动的限制。对含显式氢的分子体系，最快的是X–H伸缩振动。

::: example 有机分子的时间步长 {#ex-timestep}
C–H伸缩振动的波数约$3000\ \mathrm{cm^{-1}}$。求其周期、韦尔莱稳定性极限与合理的时间步长。若把与氢相连的一切键都约束固定，情况有何变化？
::: solution
周期为$\tau = 1/(c\tilde\nu) = 1/(2.998\times10^{10}\ \mathrm{cm\,s^{-1}} \times 3000\ \mathrm{cm^{-1}}) = 1.11\times10^{-14}\ \mathrm{s} = 11.1\ \mathrm{fs}$。角频率$\omega = 2\pi/\tau = 5.65\times10^{14}\ \mathrm{s^{-1}}$，所以稳定性要求$h < 2/\omega = 3.5\ \mathrm{fs}$；精度与良好的能量守恒则要求周期约十分之一，$h \approx 1\ \mathrm{fs}$。若用约束算法（SHAKE、RATTLE、LINCS）固定X–H键长，剩下的最快运动是周期近$20\ \mathrm{fs}$的弯曲振动与重原子伸缩振动，$h = 2\ \mathrm{fs}$成为标准做法。把质量从重原子重新分配给其氢（"氢质量重分配"）可用到$4\ \mathrm{fs}$。生物分子的一微秒模拟因此需要$5\times10^{8}$步。
:::
:::

## 周期性边界条件

一个含$1000$个水分子的立方体约$3\ \mathrm{nm}$见方，其表面会占据大约三分之一的分子——那是液滴，不是体相液体。标准的补救是让模拟盒子成为无限周期点阵的晶胞。

::: definition 周期性边界条件与最小镜像约定 {#def-pbc}
在**周期性边界条件**下，模拟盒子（立方体边长$L$）被自身在各方向的相同周期镜像包围。从一个面穿出的粒子从对面重新进入。按**最小镜像约定**，每个粒子只与其他每个粒子的最近镜像相互作用：间距矢量逐分量约化，$\Delta x \to \Delta x - L\,\mathrm{round}(\Delta x/L)$。短程相互作用在截断半径$r_\mathrm{c} \leq L/2$处截断，以保证没有粒子会与同一伙伴的两个图像同时作用。
:::

::: example 一箱水 {#ex-water-box}
在$25\ ^\circ\mathrm{C}$水的密度（$997\ \mathrm{kg\,m^{-3}}$）下，边长$3.00\ \mathrm{nm}$的立方盒子装多少个水分子？盒中两个氧原子位于$(0.20, 0.30, 2.90)$与$(2.80, 0.10, 0.10)\ \mathrm{nm}$：它们的最小镜像距离是多少？
::: solution
$n = \rho VN_\mathrm{A}/M = 997\ \mathrm{kg\,m^{-3}} \times (3.00\times10^{-9}\ \mathrm{m})^{3} \times 6.022\times10^{23}\ \mathrm{mol^{-1}}/0.018015\ \mathrm{kg\,mol^{-1}} = 900$个分子（精确到个位为$899.9$）。原始间距为$(2.60, -0.20, -2.80)\ \mathrm{nm}$，长度$3.83\ \mathrm{nm}$。施加最小镜像规则：$2.60 \to 2.60 - 3.00 = -0.40$，$-2.80 \to -2.80 + 3.00 = 0.20$，得$(-0.40, -0.20, 0.20)\ \mathrm{nm}$，距离$0.490\ \mathrm{nm}$：这两个分子是隔着盒子边界的近邻。
:::
:::

周期性也有代价。它在波长$L$量级强加人工关联，压制长波涨落，对带电或强极性体系还要求格外小心。在周期盒中计算的扩散系数系统性地偏低，须加上正比于$k_\mathrm{B}T/(6\pi\eta L)$的流体力学修正（耶（Yeh）与赫默（Hummer），2004）。

**长程静电。**把库仑相互作用在截断半径处截断会造成严重伪影，因为$1/r$衰减太慢，对周期镜像的求和只是条件收敛的。**埃瓦尔德求和**把每个点电荷拆成被屏蔽的短程部分（在真实空间直接求和）与平滑的长程部分（在倒空间按傅里叶级数求和）。**粒子网格埃瓦尔德**（particle-mesh Ewald, PME）方法用快速傅里叶变换在网格上计算倒空间部分，费用按$N\log N$标度；它是生物分子模拟的默认选择。

## 温度与压强控制

实验在恒定温度与压强下进行，而不是恒定能量。因此模拟要把体系与**恒温器**（常常还有**恒压器**）耦合。

::: definition 瞬时温度 {#def-temperature}
由能量均分（[[statistical-thermodynamics/thermodynamic-functions]]），每个二次自由度平均携带$\tfrac{1}{2}k_\mathrm{B}T$的动能。**瞬时温度**定义为
$$
T_\mathrm{inst} = \frac{2K}{N_\mathrm{f}k_\mathrm{B}}, \qquad N_\mathrm{f} = 3N - N_\mathrm{c} - 3,
$$
其中$N_\mathrm{c}$是完整约束的数目，减去的$3$去掉守恒的总动量。$T_\mathrm{inst}$是涨落的；只有它的平均才是热力学温度。在正则系综中其相对涨落为$\sqrt{2/N_\mathrm{f}}$。
:::

::: example 水模拟的温度 {#ex-temperature}
$899$个刚性水分子的一次模拟在某时刻的总动能为$1.116\times10^{-17}\ \mathrm{J}$。瞬时温度是多少？它的典型涨落有多大？
::: solution
每个刚性水分子有$3$个平动与$3$个转动自由度；$3 \times 899 = 2697$个原子携带$8091$个笛卡儿坐标，其中$3 \times 899 = 2697$个被每分子三个距离约束消去，又$3$个被动量守恒消去：$N_\mathrm{f} = 6 \times 899 - 3 = 5391$。于是
$$
T_\mathrm{inst} = \frac{2 \times 1.116\times10^{-17}\ \mathrm{J}}{5391 \times 1.380649\times10^{-23}\ \mathrm{J\,K^{-1}}} = 299.9\ \mathrm{K}.
$$
相对涨落为$\sqrt{2/5391} = 0.0193$，即在$300\ \mathrm{K}$附近约$\pm 5.8\ \mathrm{K}$。某一快照温度与目标差几开尔文，并不是恒温器出了毛病的证据。
:::
:::

主要的恒温器按严格程度排列：

- **速度缩放与贝伦森（Berendsen）恒温器**（1984）每步缩放所有速度，使温度按$\mathrm{d}T/\mathrm{d}t = (T_0 - T)/\tau_T$向目标$T_0$弛豫。它稳健，极适合平衡化，但抑制动能涨落，*不*生成正则系综。布西（Bussi）、多纳迪奥（Donadio）与帕里内洛（Parrinello）（2007）的随机速度缩放恒温器补上了选取正确的随机项，能够生成正则系综。
- **诺塞-胡佛（Nosé–Hoover）**（1984–85）给体系扩充一个充当摩擦系数的虚拟自由度，与热浴交换能量；其扩展动力学是确定性的、时间可逆的，只要各态历经就采样正则系综（对刚性体系使用恒温器链以保证各态历经性）。
- **朗之万（Langevin）动力学**加上摩擦力$-\gamma m\mathbf{v}$与随机力，随机力的方差由涨落-耗散定理固定为单位时间每分量$2\gamma mk_\mathrm{B}T$。它严格采样正则系综且稳健，但会扰动动力学，所以输运系数依赖$\gamma$。

恒压器（Berendsen、Parrinello-Rahman、Monte Carlo）让盒子体积响应瞬时压强而涨落，瞬时压强由位力$P = (Nk_\mathrm{B}T + \tfrac{1}{3}\sum_i\mathbf{r}_i\cdot\mathbf{F}_i)/V$算出，使模拟采样等温等压（NPT）系综并给出密度。

::: widget odesolver
f: (300 - y)/0.1
y0: 250
t: 0, 0.5
exact: 300 - 50*exp(-t/0.1)
h: 0.05
caption: 温度的贝伦森型弛豫$\mathrm{d}T/\mathrm{d}t = (T_0 - T)/\tau_T$，从$250\ \mathrm{K}$趋向$T_0 = 300\ \mathrm{K}$，耦合时间$\tau_T = 0.1\ \mathrm{ps}$（$t$以皮秒计）。精确解按指数趋近$T_0$。把步长加大到$0.2\ \mathrm{ps}$附近（$h > 2\tau_T$），欧拉解便会过冲并以增大的振幅振荡——与限制MD时间步长的同一条稳定性边界（$h\lambda < 2$），只不过这里是一个弛豫过程而非振动。
:::

::: warning 贝伦森恒温器给出错误的系综 {#warn-berendsen}
因为它把动能确定性地压向目标，贝伦森恒温器抑制$K$的自然涨落。平均能量一类的平均值几乎正确，但依赖涨落的量——热容$C_V = \langle\delta E^{2}\rangle/k_\mathrm{B}T^{2}$、由体积涨落求压缩率——是错的，长时模拟中还可能出现"飞行冰块"伪影：动能从高频模式倾泻进整体的平动与转动。贝伦森耦合只可用于平衡化；生产运行要用正则恒温器（诺塞-胡佛链、随机速度缩放、朗之万）。
:::

## 从头到尾做一次模拟

::: algorithm 分子动力学模拟流程 {#alg-md}
1. **搭建**：构建初始结构（晶体结构、溶剂化分子、无规液体构型），选择力场与水模型，加反离子中和电荷，并选取盒子尺寸使溶质与每个面至少相距$1$–$1.2\ \mathrm{nm}$。
2. **极小化**能量以消除不良接触（[[computational-chemistry/potential-energy-surfaces#alg-newton]]或最速下降法）。
3. 按目标温度下的麦克斯韦-玻尔兹曼分布**赋予速度**，并去掉质心运动。
4. **平衡**：先恒容后恒压运行，常对溶质施加逐步释放的束缚，直到能量、温度、密度与结构不再漂移。
5. **生产**：用正则恒温器（及恒压器）运行生产轨迹，以远超时间步长的间隔（每$1$–$10\ \mathrm{ps}$）保存坐标。
6. **分析**：用**分块平均**计算平均值及其统计误差（相继样本是相关的，所以朴素的标准误差不够）；通过比较独立运行或同一次运行的前后两半来检查收敛。
:::

## 分析轨迹

**结构。** **径向分布函数**$g(r)$——在给定粒子周围距离$r$处找到另一个粒子的概率，相对于同密度理想气体（[[statistical-thermodynamics/real-gases-liquids]]）——由对分子对距离做直方图得到。对水，$g_\mathrm{OO}(r)$在$0.28\ \mathrm{nm}$附近的第一峰及其积分（约$4.5$个近邻）可以与X射线和中子散射直接比较。

**动力学。** 分子动力学与蒙特卡洛不同，给出真实的时间相关函数，由此可得输运系数。

::: proposition 扩散的爱因斯坦关系 {#prop-einstein}
三维空间中扩散的粒子，其均方位移在长时间线性增长：
$$
\left\langle\lvert\mathbf{r}(t) - \mathbf{r}(0)\rvert^{2}\right\rangle \to 6Dt \quad (t \to \infty),
$$
其中$D$为自扩散系数。等价地（格林-久保形式），$D = \tfrac{1}{3}\int_0^{\infty}\langle\mathbf{v}(0)\cdot\mathbf{v}(t)\rangle\,\mathrm{d}t$。
:::

::: proof
从原点出发的标记粒子的浓度服从菲克第二定律$\partial c/\partial t = D\nabla^{2}c$，其解为高斯函数$c(\mathbf{r}, t) = (4\pi Dt)^{-3/2}e^{-r^{2}/4Dt}$。它的二阶矩为$\langle r^{2}\rangle = \int r^{2}c\,\mathrm{d}\mathbf{r} = 3 \times 2Dt = 6Dt$（每个笛卡儿分量贡献$2Dt$）。对格林-久保形式，写$\mathbf{r}(t) - \mathbf{r}(0) = \int_0^{t}\mathbf{v}(t')\,\mathrm{d}t'$，于是$\langle\lvert\Delta\mathbf{r}\rvert^{2}\rangle = \int_0^{t}\!\int_0^{t}\langle\mathbf{v}(t')\cdot\mathbf{v}(t'')\rangle\,\mathrm{d}t'\,\mathrm{d}t''$。平衡时相关只依赖$t'' - t'$，二重积分化为$2\int_0^{t}(t - s)\langle\mathbf{v}(0)\cdot\mathbf{v}(s)\rangle\,\mathrm{d}s$；当$t$远长于相关时间时，它趋于$2t\int_0^{\infty}\langle\mathbf{v}(0)\cdot\mathbf{v}(s)\rangle\,\mathrm{d}s$，与$6Dt$比较即得结果。
:::

::: example 水的扩散系数 {#ex-diffusion}
$298\ \mathrm{K}$液态水的一次模拟中，氧的均方位移在最初约一皮秒的非线性区之后线性增长，在$t = 100\ \mathrm{ps}$达到$1.38\ \mathrm{nm^{2}}$（线性拟合过原点）。估计$D$。
::: solution
$D = \mathrm{MSD}/6t = 1.38\times10^{-18}\ \mathrm{m^{2}}/(6 \times 100\times10^{-12}\ \mathrm{s}) = 2.3\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$，恰好与$25\ ^\circ\mathrm{C}$水的实验值（$2.30\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$）一致。真实的水模型差别相当大：TIP3P的扩散比真实水快一倍以上，而TIP4P/2005接近真实值。作这类比较之前，应加上耶-赫默的有限尺寸修正——对$3\ \mathrm{nm}$的盒子约为零点几$\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$。
:::
:::

::: widget plot
f: 6*D*(x - tau*(1 - exp(-x/tau))); 6*D*x
x: 0, 3
y: 0, 0.05
sliders: D=0.0023:0.0005:0.005:0.0001; tau=0.2:0.02:1:0.01
labels: \text{MSD（朗之万模型）}; 6Dt
caption: 扩散系数为$D$（单位$\mathrm{nm^{2}\,ps^{-1}}$；$0.0023$是水）、速度弛豫时间为$\tau$的朗之万运动粒子的均方位移（单位$\mathrm{nm^{2}}$）对时间（单位ps）作图。短时运动是*弹道*的，$\mathrm{MSD} \propto t^{2}$；几个$\tau$之后变为扩散，与$6Dt$平行、偏移$6D\tau$。务必只在线性区拟合斜率：从$t = 0$起拟合会低估$D$。
:::

::: quiz
同一液体的两次模拟用速度韦尔莱格式分别取时间步长$1\ \mathrm{fs}$与$2\ \mathrm{fs}$。第一次总能量无漂移地涨落$\pm 0.01\ \%$；第二次也无漂移，涨落$\pm 0.04\ \%$。最合理的结论是什么？
- [ ] 第二次模拟不稳定，必须丢弃。
- [x] 两次都符合辛积分器的预期：涨落按$h^{2}$增长，而无漂移说明两者都稳定。
- [ ] 第一次模拟必有错误，因为能量应当严格守恒。
- [ ] 时间步长加倍应当使涨落也加倍。
::: solution
韦尔莱精确守恒一个与$H$相差$O(h^{2})$的影子哈密顿量，所以能量的涨落幅度正比于$h^{2}$：$h$加倍，涨落变为四倍。漂移——而非涨落——才预示出了问题（时间步长过大、截断处的间断，或程序漏洞）。
:::
:::

## 超出经典力场

**从头算分子动力学**（ab initio MD, AIMD）每步由电子结构理论——通常是DFT（[[computational-chemistry/density-functional-theory]]）——计算受力。玻恩-奥本海默MD中每步都收敛自洽场；Car-Parrinello MD（1985）把轨道当作与核并行的虚拟经典变量来传播，从而避免完全自洽收敛。AIMD能追踪断键与质子转移，但限于几百个原子、几十到几百皮秒。**机器学习势**在DFT数据上训练，如今把接近DFT的精度扩展到百万原子与纳秒。**粗粒化**模型（如MARTINI）把原子组并成珠子，光滑化能量面，使膜与聚合物可以用长得多的时间步长与时间尺度模拟，代价是化学细节。经典MD把原子核当经典粒子；对低温下的轻原子，核量子效应（零点能、隧穿）可用路径积分MD纳入。

## 后续内容

分子动力学从玻尔兹曼分布采样构型，因而直连自由能：[[computational-chemistry/free-energy-sampling]]说明MD与蒙特卡洛轨迹如何给出自由能差、平均力势与结合亲和力，以及增强采样如何克服上文讨论的时间尺度限制。显式溶剂MD是评判[[computational-chemistry/solvation-qmmm]]中连续介质溶剂化模型的基准，而QM/MM分子动力学追踪酶中的反应。这一切背后的统计力学见[[statistical-thermodynamics/canonical-ensemble]]与[[statistical-thermodynamics/real-gases-liquids]]。

::: history
奥尔德（Berni Alder）与沃恩赖特（Thomas Wainwright）1957年完成了首次分子动力学模拟——硬球体系，演示了流体-固体相变。拉赫曼（Aneesur Rahman）1964年用伦纳德-琼斯势模拟液氩，1971年与斯蒂林杰（Frank Stillinger）一起模拟液态水。韦尔莱1967年在对伦纳德-琼斯流体的研究中提出了他的积分算法与邻居列表；速度形式出自斯沃普（William Swope）与合作者（1982）。1977年麦卡蒙（Andrew McCammon）、杰林（Bruce Gelin）与卡普拉斯（Martin Karplus）报告了首次蛋白质模拟——牛胰胰蛋白酶抑制因子，$9.2\ \mathrm{ps}$。诺塞（Shuichi Nosé，1984）与胡佛（William Hoover，1985）建立了确定性正则动力学，贝伦森与合作者1984年发表了弱耦合方案，帕里内洛与拉赫曼1981年提出了他们的恒压方法。卡尔（Roberto Car）与帕里内洛1985年引入从头算MD，达登（Tom Darden）、约克（Darrin York）与佩德森（Lee Pedersen）1993年引入粒子网格埃瓦尔德方法。埃瓦尔德的点阵求和则可上溯到1921年。
:::

::: summary
- MD在势能面上积分牛顿方程；只有当轨迹在模拟时间尺度上各态履历时，时间平均才等于系综平均。
- 韦尔莱（速度韦尔莱）算法时间可逆且辛，每步只需一次求力，并守恒一个影子哈密顿量，因此能量按$h^{2}$涨落而无漂移。
- 它只在$\omega h < 2$时稳定；最快的运动（X–H伸缩，周期约$11\ \mathrm{fs}$）把$h$限制在约$1\ \mathrm{fs}$，加约束后为$2\ \mathrm{fs}$。
- 带最小镜像约定的周期性边界条件模拟体相物质；长程静电需要埃瓦尔德/PME。
- 温度由能量均分定义，$T = 2K/N_\mathrm{f}k_\mathrm{B}$，涨落为$\sqrt{2/N_\mathrm{f}}$；贝伦森耦合适合平衡化，但正则采样需要诺塞-胡佛、随机缩放或朗之万恒温器。
- 爱因斯坦关系$\mathrm{MSD} \to 6Dt$与格林-久保积分给出输运系数；统计误差需要分块平均。
- AIMD、机器学习势与粗粒化势在精度与体系大小、时间尺度之间取舍。
:::

## 习题

::: exercise O–H伸缩的周期 {level=1 check="9.02"}
波数$3700\ \mathrm{cm^{-1}}$的O–H伸缩振动的振动周期是多少？（以飞秒为单位、保留三位有效数字输入。）
::: solution
$\tau = 1/(c\tilde\nu) = 1/(2.99792\times10^{10} \times 3700)\ \mathrm{s} = 9.02\times10^{-15}\ \mathrm{s} = 9.02\ \mathrm{fs}$。
:::
:::

::: exercise 一个扩散系数 {level=1 check="2.3"}
某溶质的均方位移线性增长，斜率为$1.38\times10^{-2}\ \mathrm{nm^{2}\,ps^{-1}}$。计算$D$。（以$10^{-9}\ \mathrm{m^{2}\,s^{-1}}$为单位输入。）
::: solution
$D = \text{slope}/6 = 2.30\times10^{-3}\ \mathrm{nm^{2}\,ps^{-1}} = 2.30\times10^{-3} \times 10^{-18}/10^{-12}\ \mathrm{m^{2}\,s^{-1}} = 2.3\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$。
:::
:::

::: exercise 最小镜像 {level=1 check="0.490"}
边长$3.00\ \mathrm{nm}$的立方盒子中，求位于$(0.20, 0.30, 2.90)$与$(2.80, 0.10, 0.10)\ \mathrm{nm}$的两粒子之间的最小镜像距离。（以nm为单位输入。）
::: solution
间距$(2.60, -0.20, -2.80)$约化为$(-0.40, -0.20, 0.20)\ \mathrm{nm}$，长度$\sqrt{0.16 + 0.04 + 0.04} = \sqrt{0.24} = 0.490\ \mathrm{nm}$。
:::
:::

::: exercise 韦尔莱稳定性极限 {level=2 check="3.54"}
求韦尔莱积分$3000\ \mathrm{cm^{-1}}$的C–H伸缩振动仍保持稳定的最大时间步长。（以飞秒为单位、保留三位有效数字输入。）
::: solution
$\omega = 2\pi c\tilde\nu = 2\pi \times 2.99792\times10^{10} \times 3000\ \mathrm{s^{-1}} = 5.651\times10^{14}\ \mathrm{s^{-1}}$，$h_\mathrm{max} = 2/\omega = 3.54\times10^{-15}\ \mathrm{s} = 3.54\ \mathrm{fs}$（[[#prop-verlet-stability]]）。贴着这个极限跑会把该模式的频率畸变百分之几十；实际使用$1\ \mathrm{fs}$。
:::
:::

::: exercise 温度的涨落 {level=2 check="5.78"}
一次正则模拟在$T = 300\ \mathrm{K}$下有$N_\mathrm{f} = 5391$个自由度。瞬时温度的标准差是多少？（以开尔文为单位输入。）
::: solution
$\sigma_T = T\sqrt{2/N_\mathrm{f}} = 300 \times \sqrt{2/5391}\ \mathrm{K} = 300 \times 0.01926\ \mathrm{K} = 5.78\ \mathrm{K}$。对$50\,000$个原子的蛋白质体系，涨落约为$1\ \mathrm{K}$；对真空中的单个小分子，它本身与$T$同量级。
:::
:::

::: exercise 欧拉法的能量爆炸 {level=2 check="517"}
证明对$\ddot x = -x$使用的显式欧拉法每步恰把$E = \tfrac{1}{2}(x^{2} + v^{2})$乘以$(1 + h^{2})$，并求$h = 0.1$的$628$步中$E$增大的倍数。（保留三位有效数字输入该倍数。）
::: solution
$x_{n+1}^{2} + v_{n+1}^{2} = (x_n + hv_n)^{2} + (v_n - hx_n)^{2} = (1 + h^{2})(x_n^{2} + v_n^{2})$，交叉项相消。$628$步后的倍数为$1.01^{628} = e^{628\ln 1.01} = e^{6.249} = 517$。欧拉法不是辛的：它每步都把相空间的面积映射为更大的面积。
:::
:::

::: exercise 数值频率偏移 {level=3 check="1.011"}
用[[#prop-verlet-stability]]计算$\omega h = 0.5$时的$\tilde\omega/\omega$，并与级数$1 + (\omega h)^{2}/24$比较。这对由MD轨迹计算的振动谱意味着什么？（$\tilde\omega/\omega$保留四位有效数字输入。）
::: solution
$\cos(\tilde\omega h) = 1 - 0.125 = 0.875$，故$\tilde\omega h = \arccos(0.875) = 0.50536$，$\tilde\omega/\omega = 1.0107 \approx 1.011$。级数给出$1 + 0.25/24 = 1.0104$。因此由速度自相关函数的傅里叶变换得到的频率，对$\omega h = 0.5$的模式约有$1\ \%$蓝移——对$3000\ \mathrm{cm^{-1}}$的伸缩振动，$h = 0.5/\omega = 0.88\ \mathrm{fs}$就造成$30\ \mathrm{cm^{-1}}$的移动，与红外光谱比较时这很要紧。
:::
:::

::: exercise 推导速度自相关形式 {level=3 check="2.4"}
液体中分子速度自相关函数的一个简单模型是$\langle\mathbf{v}(0)\cdot\mathbf{v}(t)\rangle = (3k_\mathrm{B}T/m)e^{-t/\tau}$。用格林-久保关系导出$D = k_\mathrm{B}T\tau/m$，并对$298\ \mathrm{K}$下$\tau = 0.0174\ \mathrm{ps}$的水分子（$m = 18.0\ \mathrm{u}$）求值。（以$10^{-9}\ \mathrm{m^{2}\,s^{-1}}$为单位输入$D$。）
::: solution
$D = \tfrac{1}{3}\int_0^{\infty}(3k_\mathrm{B}T/m)e^{-t/\tau}\,\mathrm{d}t = k_\mathrm{B}T\tau/m$。由$m = 18.0 \times 1.66054\times10^{-27}\ \mathrm{kg} = 2.989\times10^{-26}\ \mathrm{kg}$，$k_\mathrm{B}T/m = 4.114\times10^{-21}/2.989\times10^{-26} = 1.376\times10^{5}\ \mathrm{m^{2}\,s^{-2}}$，得$D = 1.376\times10^{5} \times 1.74\times10^{-14}\ \mathrm{m^{2}\,s^{-1}} = 2.4\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$。弛豫时间极短——几十飞秒——因为每个分子都被氢键相连的近邻关在笼中；实际上水的关联函数甚至会变负（分子从笼壁弹回），这是指数模型忽略的。
:::
:::
