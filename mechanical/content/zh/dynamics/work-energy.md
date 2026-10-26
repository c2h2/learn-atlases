动能定理是牛顿第二定律沿路径的积分，它把微分方程变成了代数方程。$\sum \mathbf{F} = m \mathbf{a}$给出加速度之后还需要两次积分才能得到位置，而能量方程一行就能给出速度关于位置的函数——前提是各力所做的功能算得出来，而且你不需要知道时间和加速度的方向。

这个附加条件正是该方法全部的分寸所在。能量法不会告诉你杆中的张力、轨道上的法向力、轨迹的形状，也不会告诉你某件事花了多长时间；它会告诉你坡底的速度、弹簧的变形量以及抛体能达到的高度。弄清题目问的是哪类问题，从而知道该写下哪条原理，几乎就是解动力学问题的全部功夫。

::: warning 能量是标量，这既是它的威力所在，也是它的局限所在
动能方程
$$
T_1 + \sum U_{1 \rightarrow 2} = T_2
$$
是**一条**标量方程。它不能替代$\sum \mathbf{F} = m \mathbf{a}$的两个或三个分量；一个要求力的问题就需要力的方程，即使能量法已经给出了速度也不行。两个具体的陷阱：一个**垂直**于运动的力，无论多大，其功都为零，所以法向力、不可伸长索中的张力以及销钉约束力都不做功，也从不出现；而摩擦力的功**并非**与路径无关，所以不能作为势能移到方程左边。
:::

## 功、能量与功率

::: definition 功与动能 {#def-work}
力的作用点从$1$移到$2$时该力所做的功为
$$
U_{1 \rightarrow 2} = \int_1^2 \mathbf{F} \cdot \mathrm{d} \mathbf{r} .
$$
对于几种常见的力：
$$
U_{\text{weight}} = - mg \left( z_2 - z_1 \right), \quad
U_{\text{spring}} = - \tfrac{1}{2} k \left( s_2^{2} - s_1^{2} \right), \quad
U_{\text{const. force}} = F d \cos \alpha ,
$$
动能为$T = \tfrac{1}{2} m v^{2}$。**动能定理**为
$$
T_1 + \sum U_{1 \rightarrow 2} = T_2 .
$$
**功率**是做功的速率，
$$
P = \mathbf{F} \cdot \mathbf{v} = \mathbf{M} \cdot \boldsymbol{\omega} = \frac{\mathrm{d} U}{\mathrm{d} t} ,
$$
因此$1\ \mathrm{kN}$的力推动其作用点以$1\ \mathrm{m / s}$运动就是$1\ \mathrm{kW}$，与质量或加速度无关。
:::

::: proof 动能定理 {#proof-work-energy}
取切向运动方程$\sum F_t = m \, \mathrm{d} v / \mathrm{d} t$，乘以位移$\mathrm{d} s = v \, \mathrm{d} t$：
$$
\sum F_t \, \mathrm{d} s = m v \, \mathrm{d} v = \mathrm{d} \left( \tfrac{1}{2} m v^{2} \right) .
$$
从状态1积分到状态2，
$$
\int_1^2 \sum F_t \, \mathrm{d} s = \tfrac{1}{2} m v_2^{2} - \tfrac{1}{2} m v_1^{2} .
$$
左边就是总功，因为$\mathbf{F} \cdot \mathrm{d} \mathbf{r} = F_t \, \mathrm{d} s$；没有切向分量的力毫无贡献，这就是法向力、销钉约束力以及绕过定滑轮的不可伸长索的张力会自动消去的原因。

**注意该证明的前提假设。**只假设了质量恒定，以及运动方程在惯性系中成立。它对力的性质没有任何限制，所以对摩擦力、阻力、随时间变化的力以及依赖于速度的力都成立。它做不到的，是找回在点乘中丢失的**矢量**信息：两套截然不同的力系若产生相同的净功，就产生相同的末速度，却产生完全不同的加速度。
:::

::: example 冲击下的弹簧变形 {#ex-spring-impact}
一个$20\ \mathrm{kg}$的套筒从$100\ \mathrm{mm}$高处落下，落到刚度为$4\ \mathrm{kN / m}$的弹簧上。求最大变形量。若将套筒缓缓放到弹簧上，或者在恰好接触弹簧处由静止释放，结果会有什么变化？
::: solution
取套筒的初始位置为基准，设$\delta$为最大变形量。套筒下落$h + \delta$，弹簧储存$\tfrac{1}{2} k \delta^{2}$，两端动能均为零：
$$
m g \left( h + \delta \right) = \tfrac{1}{2} k \delta^{2}
\quad\Longrightarrow\quad
k \delta^{2} - 2 m g \delta - 2 m g h = 0 ,
$$
$$
\delta = \frac{m g + \sqrt{ \left( m g \right)^{2} + 2 k m g h}}{k}
= \frac{196.2 + \sqrt{38\,490 + 156\,960}}{4000} = 0.1596\ \mathrm{m} = 160\ \mathrm{mm}.
$$
**缓缓放下：**变形量即静变形$\delta_{\text{st}} = m g / k = 49.1\ \mathrm{mm}$。
**恰好接触处释放**（$h = 0$）：$\delta = 2 m g / k = 98.1\ \mathrm{mm} = 2 \delta_{\text{st}}$。

**校核。**最大变形处弹簧力为$4000 \times 0.1596 = 638\ \mathrm{N}$，而重力为$196\ \mathrm{N}$，比值为$3.25$。此时套筒以$\left( 638 - 196 \right) / 20 = 22.1\ \mathrm{m / s^{2}}$向上加速，超过$g$的两倍——这正是必然如此，因为它必须被重新刹停。$\checkmark$

**合理性检验。**“缓缓放下”与“恰好接触处释放”之间的二倍关系，解释了为什么按扭矩拧紧的螺栓的预紧力与被下落重物加载的情形截然不同，也解释了如果载荷有可能落到弹簧上，承载弹簧就必须按**两倍**静变形来设计。落体情形的$160\ \mathrm{mm}$是静变形的$3.25$倍；若下落高度不是$0.1\ \mathrm{m}$而是$1\ \mathrm{m}$，这个倍数就是$7.5$倍。因此冲击载荷设计不是在静力计算上加大安全裕度，而是要认识到放大倍数按$\sqrt{h}$无限制地增长——这就是为什么吊梁绝不允许承受松弛吊索突然绷紧带来的载荷，也是为什么规范规定载荷必须平稳起吊。
:::
:::

::: widget plot
f: (196.2+sqrt(38494+1569.6*x))/4
x: 0, 400
y: 50, 300
labels: \text{弹簧最大变形 } \left( \mathrm{mm} \right)
caption: $4\ \mathrm{kN / m}$弹簧在$20\ \mathrm{kg}$套筒从$x\ \mathrm{mm}$高度落下时的最大变形随下落高度的变化。曲线从$98\ \mathrm{mm}$起步——零下落高度时的变形，为静变形的两倍——并按$\sqrt{h}$上升，在下落$400\ \mathrm{mm}$时达到$253\ \mathrm{mm}$。**平方根**形状解释了为什么吊装作业对下落高度的微小增加如此紧张，而静力设计却对此不以为意：高度从$100$增至$200\ \mathrm{mm}$，变形就从$160$增至$198\ \mathrm{mm}$，弹簧峰值力随之上升。
:::

## 保守力、势能与稳定性

::: definition 保守力与势能 {#def-potential}
若一个力的功与路径无关，即沿任何闭合路径的功为零，则称该力为**保守力**。此时存在势能$V$，满足
$$
F_x = - \frac{\partial V}{\partial x}, \qquad
U_{1 \rightarrow 2} = - \left( V_2 - V_1 \right),
$$
并且**机械能守恒**成立：
$$
T_1 + V_1 = T_2 + V_2 .
$$
重力和弹簧力是保守力；恒力$F$有$V = - F x$；摩擦力、阻力以及不是位置函数的外加力矩则不是。
:::

::: proposition 由势能判断平衡与稳定性 {#prop-stability}
单自由度系统在
$$
\frac{\mathrm{d} V}{\mathrm{d} q} = 0 ,
$$
处平衡；若$\mathrm{d}^{2} V / \mathrm{d} q^{2} > 0$则平衡**稳定**，若$< 0$则**不稳定**；若二阶导数为零而由更高阶偶次项定夺，则为**中性**。关于稳定平衡的小振动，其固有频率为
$$
\omega_n = \sqrt{\frac{1}{m_{\text{eff}}} \frac{\mathrm{d}^{2} V}{\mathrm{d} q^{2}} } .
$$
:::

::: example 势场中的粒子 {#ex-potential}
一质点被约束在$x$轴上，受势能为$V \left( x \right) = x^{3} - 3 x$焦耳的保守力作用，$x$以米计。求平衡位置及其稳定性，并描述总能量为$- 1.5$、$+ 2.0$和$+ 2.5\ \mathrm{J}$时的运动。
::: solution
$$
\frac{\mathrm{d} V}{\mathrm{d} x} = 3 x^{2} - 3 = 0 \quad\Longrightarrow\quad x = \pm 1 ,
$$
$$
\frac{\mathrm{d}^{2} V}{\mathrm{d} x^{2}} = 6 x
\quad\Longrightarrow\quad
\begin{cases} x = + 1: & V = - 2\ \mathrm{J}, \; V'' = + 6 > 0 \;\text{稳定} \ x = - 1: & V = + 2\ \mathrm{J}, \; V'' = - 6 < 0 \;\text{不稳定} \end{cases}
$$
**$E = - 1.5\ \mathrm{J}$：**质点被囚禁在$x = + 1$处的势阱中，在$x^{3} - 3 x = - 1.5$的两个根$x = 0.597$与$x = 1.302$之间振动。它无法到达$x < 0.597$，因为那里的$V$超过$E$。
**$E = + 2.0\ \mathrm{J}$：**质点可渐近地到达$x = - 1$处的势垒顶部；这就是**分界线**，当$E$趋近它时周期趋于无穷。
**$E = + 2.5\ \mathrm{J}$：**质点越过势垒并逃逸至$x \rightarrow - \infty$，因为$V \rightarrow - \infty$；若它从$- \infty$而来，则会减速、爬上势垒，而当$E < 2$时被反射回去。

**合理性检验。**这幅图像——势阱、势垒、分界线、逃逸——是一切单自由度保守系统共同的图像：伦纳德-琼斯（Lennard-Jones）势阱中的分子、水平线上下摆动的单摆、发生屈曲跳跃的质点、逃逸速度上下运行的火箭。读懂$V \left( q \right)$曲线这门手艺，比得出它的代数运算更有价值，因为曲线不用一次积分就能回答那些定性问题——稳不稳、能不能逃逸、临界能量是多少。
:::
:::

::: proof 由势能求力，以及稳定性判据 {#proof-from-potential}
若功与路径无关，定义
$$
V \left( \mathbf{r} \right) = - \int_{\mathbf{r}_0}^{\mathbf{r}} \mathbf{F} \cdot \mathrm{d} \mathbf{r} ,
$$
积分沿任意路径进行。则对于位移$\mathrm{d} \mathbf{r}$，
$$
\mathrm{d} V = - \mathbf{F} \cdot \mathrm{d} \mathbf{r}
= - \left( F_x \, \mathrm{d} x + F_y \, \mathrm{d} y + F_z \, \mathrm{d} z \right) ,
$$
又因为$\mathrm{d} V = \left( \partial V / \partial x \right) \mathrm{d} x + \cdots$，比较得
$$
\mathbf{F} = - \nabla V .
$$
路径无关要求混合偏导相等，即$\partial F_x / \partial y = \partial F_y / \partial x$及其轮换式，亦即$\nabla \times \mathbf{F} = \mathbf{0}$——这就是保守力的判据。

**稳定性。**对单自由度情形，在满足$V' \left( q_0 \right) = 0$的平衡位置$q_0$附近展开：
$$
V \left( q \right) = V \left( q_0 \right) + \tfrac{1}{2} V'' \left( q_0 \right) \left( q - q_0 \right)^{2} + \cdots ,
$$
于是能量积分$T + V = E$化为
$$
\tfrac{1}{2} m_{\text{eff}} \dot{q}^{2} + \tfrac{1}{2} V'' \left( q_0 \right) \left( q - q_0 \right)^{2} = \text{常数} .
$$
若$V'' > 0$，这就是$\omega_n^{2} = V'' / m_{\text{eff}}$的简谐振子的能量积分，运动有界：平衡**稳定**。若$V'' < 0$，则“弹簧”为负，解呈指数增长，平衡**不稳定**。若$V'' = 0$，二次项不提供信息，由第一个不为零的偶数阶导数的符号定夺——这就是为什么平坦的势能曲线只有当各阶导数都为零时才称为**中性**平衡，例如水平面上的质点。
:::

::: example 弹簧发射推料器 {#ex-plunger}
一个$3\ \mathrm{kg}$的工件由刚度$1.2\ \mathrm{kN / m}$的弹簧从压缩$\delta$处释放，沿$25^{\circ}$斜槽向上推出。动摩擦因数为$0.22$，工件沿斜槽滑行$600\ \mathrm{mm}$后必须停下。求$\delta$，以及工件离开弹簧时的速度。
::: solution
取弹簧压缩最大时和工件停止时两个状态。弹簧做功$\tfrac{1}{2} k \delta^{2}$，重力做功$- m g \sin\theta \left( s + \delta \right)$，摩擦力做功$- \mu m g \cos\theta \left( s + \delta \right)$，其中$s = 0.6\ \mathrm{m}$是**离开弹簧后**的行程。两个端态动能均为零：
$$
\tfrac{1}{2} k \delta^{2} = \left( m g \sin\theta + \mu m g \cos\theta \right) \left( s + \delta \right) ,
$$
$$
600 \delta^{2} = \left( 29.43 \times 0.4226 + 0.22 \times 29.43 \times 0.9063 \right) \left( 0.6 + \delta \right)
= 18.31 \left( 0.6 + \delta \right) ,
$$
$$
600 \delta^{2} - 18.31 \delta - 10.99 = 0
\quad\Longrightarrow\quad
\delta = \frac{18.31 + \sqrt{335 + 26\,366}}{1200} = 0.151\ \mathrm{m}.
$$
**离开弹簧时的速度。**在最大压缩处与自然长度处之间列能量方程，行程为$\delta$：
$$
\tfrac{1}{2} m v^{2} = \tfrac{1}{2} k \delta^{2} - 18.31 \delta
= 0.5 \times 1200 \times 0.02293 - 18.31 \times 0.1514 = 13.76 - 2.77 = 10.99\ \mathrm{J},
$$
$$
v = \sqrt{2 \times 10.99 / 3} = 2.71\ \mathrm{m / s}.
$$
**校核。**余下的$18.31 \times 0.6 = 10.99\ \mathrm{J}$恰好在$600\ \mathrm{mm}$行程中被耗散掉，使工件按要求停下。$\checkmark$

**合理性检验。**注意弹簧必须提供$13.8\ \mathrm{J}$，其中只有$11.0\ \mathrm{J}$，即$80$%，用于滑行段——其余在弹簧仍在作用时就把工件沿斜面推高消耗掉了。因此设定这类弹射机构的实用做法是规定终点条件再反解压缩量（如本题），而不是先猜一个压缩量再校核。滑行距离对压缩量也比对刚度更敏感：由$s = k \delta^{2} / \left( 2 F \right) - \delta$，$\delta$改变$1\%$使滑行距离改变约$2.3\%$，$k$改变$1\%$只使其改变约$1.3\%$——这就是实际的送料机构用可调机械限位来设定压缩量的原因。
:::
:::

::: example 带式输送机的起动载荷 {#ex-belt-energy}
一条长$120\ \mathrm{m}$的带式输送机承载$40\ \mathrm{kg / m}$的物料，任何速度下空载阻力均为每米带长$180\ \mathrm{N}$。它以$2.5\ \mathrm{m / s}$运行，提升高度$12\ \mathrm{m}$。求匀速运行时的驱动功率，以及使$6000\ \mathrm{kg}$的输送带-载荷系统（物料$4800\ \mathrm{kg}$，输送带$1200\ \mathrm{kg}$）在$8\ \mathrm{s}$内匀加速到运行速度所需增加的功率。
::: solution
**稳态功率。**阻力为
$$
F = 180 \times 120 + 40 \times 9.81 \times 120 \times \sin\theta, \qquad
\sin\theta = \frac{12}{120} = 0.1 ,
$$
$$
F = 21\,600 + 4709 = 26\,309\ \mathrm{N}, \qquad
P = F v = 26\,309 \times 2.5 = 65.8\ \mathrm{kW}.
$$
**加速阶段。**需要输入的动能为
$$
\Delta T = \tfrac{1}{2} \times 6000 \times 2.5^{2} = 18\,750\ \mathrm{J},
$$
在$8\ \mathrm{s}$内输入，平均速率为$2.34\ \mathrm{kW}$，但加速力恒定时，加速结束时的**峰值**为
$$
P_{\text{acc}} = \frac{2 \Delta T}{t} = 4688\ \mathrm{W} = 4.7\ \mathrm{kW}.
$$
**合计**皮带端为$65.8 + 4.7 = 70.5\ \mathrm{kW}$；若驱动效率为$90$%，则电机轴端为$70.5 / 0.9 = 78.3\ \mathrm{kW}$。

**合理性检验。**加速项只占稳态载荷的$7$%，起动放慢还会更小——这是长输送机的普遍规律：数百米距离上的运行阻力远大于整条生产线的动能。**短**高速线则恰恰相反：一条$2\ \mathrm{m}$长、载有$20\ \mathrm{kg}$产品、以$3\ \mathrm{m / s}$运行的包装输送机，其动能只有$90\ \mathrm{J}$，而摩擦载荷不过几牛顿，所以加速项占主导，电机按起动而非运行工况选型。把这个比例关系搞反是常见而代价高昂的错误，这就是为什么输送机电机按稳态载荷加服务系数定额定值，而包装机的电机却按最不利加速工况定额定值。
:::
:::

## 功率及其损耗

::: example 汽车功率 {#ex-vehicle-power}
一辆质量为$1400\ \mathrm{kg}$的汽车，$C_D = 0.32$，迎风面积$2.1\ \mathrm{m^{2}}$，滚动阻力系数$0.012$。求在$5$%坡道上以$50$和$130\ \mathrm{km / h}$行驶时驱动轮所需的功率，取$\rho = 1.2\ \mathrm{kg / m^{3}}$。
::: solution
三个阻力为
$$
F_r = \mu_r m g \cos \theta = 0.012 \times 1400 \times 9.81 \times 0.9988 = 165\ \mathrm{N},
$$
$$
F_g = m g \sin \theta = 1400 \times 9.81 \times 0.05 = 687\ \mathrm{N},
$$
$$
F_a = \tfrac{1}{2} \rho C_D A v^{2} = 0.403 \, v^{2} .
$$
**$50\ \mathrm{km / h}$时**（$13.9\ \mathrm{m / s}$）：$F_a = 78\ \mathrm{N}$，合计$929\ \mathrm{N}$，
$$
P = 929 \times 13.9 = 12.9\ \mathrm{kW}.
$$
**$130\ \mathrm{km / h}$时**（$36.1\ \mathrm{m / s}$）：$F_a = 526\ \mathrm{N}$，合计$1377\ \mathrm{N}$，
$$
P = 1377 \times 36.1 = 49.7\ \mathrm{kW}.
$$
**合理性检验。**速度比为$2.6$，功率比为$3.85$。滚动阻力与坡度阻力在$50\ \mathrm{km / h}$时共耗$11.8\ \mathrm{kW}$，在$130$时为$30.7\ \mathrm{kW}$，只按$v$增长；而气动阻力功率从$1.1\ \mathrm{kW}$增至$19.0\ \mathrm{kW}$，按$v^{3}$增长；在平路上，高速公路车速下气动阻力会是较大的部分。这就是油耗数字背后的算术：$90\ \mathrm{km / h}$油耗为$6\ \mathrm{l / 100\ km}$的车，$130$时约为$8.5$，原因不在发动机而在阻力：它按每公里$v^{2}$、从而按每小时$v^{3}$增长。这也是为什么电动车在高速公路上续航骤降、在市区却几乎不变，以及为什么船舶的推进功率同样按$v^{3}$增长——更残酷的是，兴波阻力分量增长得还更快。
:::
:::

::: example 卷扬机选电机 {#ex-hoist-power}
一台卷扬机以$1.2\ \mathrm{m / s}$的匀速提升$2500\ \mathrm{kg}$的罐笼，起动加速度为$1.0\ \mathrm{m / s^{2}}$。钢丝绳与卷筒的效率为$92$%，电机效率为$90$%。试选择电机。
::: solution
**起动工况**起控制作用：
$$
F = m \left( g + a \right) = 2500 \times 10.81 = 27.0\ \mathrm{kN},
$$
$$
P_{\text{rope}} = F v = 27\,025 \times 1.2 = 32.4\ \mathrm{kW},
$$
$$
P_{\text{motor output}} = \frac{32.4}{0.92} = 35.3\ \mathrm{kW}, \qquad
P_{\text{electrical input}} = \frac{35.3}{0.90} = 39.2\ \mathrm{kW}.
$$
**匀速工况：**$F = 24.5\ \mathrm{kN}$，$P_{\text{rope}} = 29.4\ \mathrm{kW}$，电机输出$32.0\ \mathrm{kW}$。

**合理性检验。**选一台$37\ \mathrm{kW}$电机是自然的：其连续定额覆盖$32.0\ \mathrm{kW}$的运行输出，而$35.3\ \mathrm{kW}$的起动峰值只持续$1.2\ \mathrm{s}$，完全在电机可承受的短时过载范围内。本例起动载荷只比运行载荷高$10$%，因为加速度不大；对行程短、起动频繁的快速提升机，起动峰值及其重复频率可能主导电机的发热，这就是为什么卷扬机、起重机和压力机电机要按规定的工作制类别（给定暂载率的断续工作制）选型，而连续运行的水泵电机不需要。
:::
:::

::: warning 能量法隐含地假定了参考系
动能不是伽利略不变的：$\tfrac{1}{2} m v^{2}$依赖于参考系，所做的功也是。尽管如此，动能方程在任何**惯性系**中都成立，只是不同参考系中数值不同；常见的错误是混用参考系——速度按运动皮带测量，位移却按地面测量。功的积分$\int \mathbf{F} \cdot \mathrm{d} \mathbf{r}$所用的作用点位移，必须**与$T$中的速度在同一参考系中测量**。这对摩擦力最为关键：滑动接触处产生的热量是$\mu N$乘以**相对**滑移，与参考系无关；而摩擦力对单个物体做的功是$\mu N$乘以该物体在你所选参考系中的位移，与参考系有关。拿不准时，就在地面系中计算，再用一个心算可得的特例校核结果。
:::

::: history
机械运动中必有某量守恒的思想，从莱布尼茨（Leibniz）1686年的*活力*（vis viva）$m v^{2}$开始——他与主张$m v$才是真正运动量的笛卡尔学派论战——经过达朗贝尔（d'Alembert）1743年的原理，以及莫佩尔蒂（Maupertuis）与欧拉（Euler）的最小作用量原理，直到科里奥利（Coriolis）1829年的《论机器效应的计算》（*Du calcul de l'effet des machines*）——它证明对工程目的而言正确的度量是$\tfrac{1}{2} m v^{2}$而非$m v^{2}$，并确立了以*travail*称功的用法，庞斯莱（Poncelet）在其应用力学教学中采用并推广了这一用法。**能量**（energy）一词的现代含义出自托马斯·杨（Thomas Young），1807年；守恒律的明确表述则出现于1840年代迈耶（Mayer）、焦耳（Joule）与亥姆霍兹（Helmholtz）的工作，亥姆霍兹1847年的论文*Über die Erhaltung der Kraft*把机械、热、化学和电各种形式统一起来。**势能**这一术语是兰金（Rankine）1853年提出的；稳定性判据$\mathrm{d}^{2} V / \mathrm{d} q^{2} > 0$可追溯到拉格朗日（Lagrange）1788年的《分析力学》（*Mécanique analytique*），临界情形的严格处理归功于狄利克雷（Dirichlet），连续系统的情形则归功于瑞利（Rayleigh）1877年《声学理论》（*Theory of Sound*）中的能量方法。机器的**功率**由瓦特（Watt）量化，他在1780年代初把马力定为$33\,000\ \mathrm{ft\,lbf / min}$；瓦特这一单位，即每秒一焦耳，由威廉·西门子（William Siemens）提出，1882年为英国科学促进会采用。
:::

## 后续内容

同一方程对时间的积分给出[[dynamics/impulse-momentum]]，两者合用即可处理碰撞。刚体的能量法（其中出现转动动能）见[[dynamics/rigid-body-energy-momentum]]，小振动结果在[[vibrations/free-vibration]]中进一步发展，而连续系统的势能方法是[[solid-mechanics/energy-methods]]的基础。

::: summary
- $T_1 + \sum U_{1 \rightarrow 2} = T_2$是一条标量方程：它只给出速度随位置的变化，别无其他。
- 垂直于运动的力不做功；摩擦力与阻力的功不能写成势能。
- 保守系统中$T + V$为常量，且$F = - \partial V / \partial q$。
- 平衡位置满足$\mathrm{d} V / \mathrm{d} q = 0$；稳定性由$\mathrm{d}^{2} V / \mathrm{d} q^{2}$的符号判定，曲率还同时给出固有频率。
- 功率是$\mathbf{F} \cdot \mathbf{v}$；电机要按最不利**瞬时**载荷而非平均载荷选型，并核对工作制类别。
- 载荷落到弹簧上，弹簧变形至少是静变形的两倍；下落高度$h$还会带来按$\sqrt{h}$增长的附加变形。
:::

::: quiz
一物块从静止开始，沿两条竖直高度相同但长度和倾角不同的光滑斜坡下滑。到达底部时哪个说法正确？
- [ ] 较陡的斜坡到底速度较大
- [x] 两者速度相同，但较陡的斜坡用时较短
- [ ] 两者速度相同，用时也相同
- [ ] 较长的斜坡到底速度较大，因为力作用时间较长
::: solution
两者速度相同，$v = \sqrt{2 g h}$，但较陡的斜坡用时较短。能量只决定**速度**，不决定别的：无论路径如何，重力做功都是$m g h$，所以末动能从而末速度相同。**时间**不由能量决定，而取决于加速度的全部历史——这就是为什么沿光滑槽道下滑所需的时间不能只用能量求出，而需要把$\sum F_t = m \dot{v}$沿弧线积分。最速降线是极端情形：两点之间所有光滑路径中，摆线用时最短，而每一条路径给出的速度都相同。
:::
:::

## 习题

::: exercise 力的功 {level=1 check="24"}
力$\mathbf{F} = \left( 3 x, 2 y^{2} \right)\ \mathrm{N}$作用于一质点，质点沿直线从$\left( 0, 0 \right)$移到$\left( 2, 3 \right)\ \mathrm{m}$。求功。
::: solution
沿直线$y = 1.5 x$，$\mathrm{d} y = 1.5 \, \mathrm{d} x$：
$$
U = \int_0^2 \left[ 3 x + 2 \left( 1.5 x \right)^{2} \times 1.5 \right] \mathrm{d} x
= \int_0^2 \left( 3 x + 6.75 x^{2} \right) \mathrm{d} x
= \left[ 1.5 x^{2} + 2.25 x^{3} \right]_0^2 = 6 + 18 = 24\ \mathrm{J}.
$$
**注。**该力**是**保守力，因为$F_x = 3x$只依赖于$x$，$F_y = 2y^{2}$只依赖于$y$，所以存在势能$V = -1.5 x^{2} - \tfrac{2}{3} y^{3}$，功与路径无关。可沿两段折线路径$\left(0,0\right) \rightarrow \left(2,0\right) \rightarrow \left(2,3\right)$验证：第一段贡献$\int_0^2 3x \, \mathrm{d}x = 6\ \mathrm{J}$，第二段贡献$\int_0^3 2y^{2} \, \mathrm{d}y = 18\ \mathrm{J}$，合计$24\ \mathrm{J}$，与要求一致。
:::
:::

::: exercise 机械能守恒 {level=1 check="20.4"}
一个$2\ \mathrm{kg}$的球以$20\ \mathrm{m / s}$竖直上抛。忽略阻力，它能上升多高？
::: solution
$h = v^{2} / \left( 2 g \right) = 400 / 19.62 = 20.4\ \mathrm{m}$。

:::
:::

::: exercise 弹簧 {level=1 check="3.16"}
刚度$500\ \mathrm{N / m}$的弹簧被压缩$200\ \mathrm{mm}$后释放，推动光滑水平面上$2\ \mathrm{kg}$的质量块。求发射速度。
::: solution
$$
v = \sqrt{\frac{k \delta^{2}}{m}} = \sqrt{\frac{500 \times 0.04}{2}} = 3.16\ \mathrm{m / s}.
$$

:::
:::

::: exercise 功率 {level=2}
一台水泵以$20\ \mathrm{l / s}$的流量把水送到$35\ \mathrm{m}$高处，管路摩擦损失为$8\ \mathrm{m}$。若水泵效率为$72$%，电机效率为$93$%，求输入电功率。
::: solution
总扬程为$43\ \mathrm{m}$，质量流量为$20\ \mathrm{kg / s}$：
$$
P_{\text{water}} = 20 \times 9.81 \times 43 = 8437\ \mathrm{W},
$$
$$
P_{\text{electrical}} = \frac{8437}{0.72 \times 0.93} = 12\,600\ \mathrm{W} = 12.6\ \mathrm{kW}.
$$
**合理性检验。**注意摩擦损失占总扬程的$8 / 43 = 19$%，所以将其减半——由于沿程水头损失大致按$D^{-5}$下降，适度增大管径即可做到——可连续节省$1.2\ \mathrm{kW}$，每年约$10\ \mathrm{MWh}$，这就是为什么水泵管路的尺寸是优化问题，而不能只图初投资最省。
:::
:::

::: exercise 稳定性 {level=2}
质量为$m$的小环套在半径为$R$的光滑圆环上，圆环绕竖直直径以恒定$\omega$转动。求平衡位置及其稳定性，以及临界转速。
::: solution
以$\theta$表示与向下竖直方向的夹角，转动系中的有效势能——重力势能与离心势能之和——为
$$
V \left( \theta \right) = m g R \left( 1 - \cos \theta \right) - \tfrac{1}{2} m \omega^{2} R^{2} \sin^{2} \theta ,
$$
$$
\frac{\mathrm{d} V}{\mathrm{d} \theta} = m g R \sin \theta - m \omega^{2} R^{2} \sin \theta \cos \theta
= m g R \sin \theta \left( 1 - \frac{\omega^{2} R}{g} \cos \theta \right) = 0 ,
$$
于是或者$\sin \theta = 0$，得$\theta = 0$和$\pi$；或者
$$
\cos \theta = \frac{g}{\omega^{2} R} .
$$
第二个解仅当$\omega^{2} > g / R$时存在，且
$$
\left. \frac{\mathrm{d}^{2} V}{\mathrm{d} \theta^{2}} \right|_{\theta = 0} = m g R \left( 1 - \frac{\omega^{2} R}{g} \right) ,
$$
于是最低点在临界转速处变为**不稳定**，
$$
\omega_{\text{cr}} = \sqrt{\frac{g}{R}} .
$$
**合理性检验。**这就是**转环小环**分岔，是超临界叉式分岔的教科书例子：低于$\sqrt{g / R}$时小环停在最低点，高于它时小环爬到$\cos \theta = g / \omega^{2} R$的角度，且两个新平衡都是稳定的。$R = 0.2\ \mathrm{m}$时临界转速为$7.0\ \mathrm{rad / s}$，即$67\ \mathrm{rpm}$。同样的结构也出现在飞球调速器和理想压杆的屈曲中；其定性行为——一个稳定状态失去稳定性、两个新的稳定状态光滑地出现——正是它成为**超临界**分岔而非跳跃屈曲的原因。
:::
:::

::: exercise 竖直圆周 {level=2}
小环在竖直平面内半径$0.6\ \mathrm{m}$的光滑圆形钢丝上滑动。求小环恰能完成整圆时在底部的最小速度，以及顶部的速度。
::: solution
对**穿在钢丝上的小环**（钢丝既能推也能拉），最小条件只是能到达顶部，故$v_{\text{top}} \rightarrow 0$：
$$
v_{\text{bottom}} = \sqrt{2 g \times 2 R} = \sqrt{4 \times 9.81 \times 0.6} = 4.85\ \mathrm{m / s}.
$$
对**绳系单摆**，张力在顶部不能为零，要求$v_{\text{top}} = \sqrt{g R} = 2.43\ \mathrm{m / s}$，于是
$$
v_{\text{bottom}} = \sqrt{v_{\text{top}}^{2} + 4 g R} = \sqrt{5 g R} = 5.42\ \mathrm{m / s}.
$$
**合理性检验。**$\sqrt{5}$与$\sqrt{4}$之别，正是刚杆与柔绳之别，也是过山车回环不是圆形的原因：圆形回环底部入口速度为$\sqrt{5 g R}$，该处法向力达$6 m g$，令人无法忍受；而回旋曲线回环把曲率摊开，全程把载荷保持在$3 m g$附近。柔绳的条件也解释了为什么头顶甩水桶时顶部速度至少要是$\sqrt{g R}$而不仅仅是非零——桶能推水，却不能拉水。
:::
:::

::: exercise 设计 {level=3}
一节质量$15\ \mathrm{t}$的铁路货车以$3\ \mathrm{km / h}$自由滑行，由弹簧缓冲器使其停下。设计该缓冲器使最大减速度不超过$0.4\ g$，求所需刚度和最大压缩量。然后校核同一缓冲器在货车以$6\ \mathrm{km / h}$冲入时的情形。
::: solution
**由减速度限值定刚度。**最大压缩处$k \delta_{\max} = m a_{\max}$，能量给出$\tfrac{1}{2} k \delta_{\max}^{2} = \tfrac{1}{2} m v^{2}$。联立得，
$$
\delta_{\max} = \frac{v}{\omega_n}, \qquad
\omega_n = \frac{v}{\delta_{\max}}, \qquad
a_{\max} = \omega_n^{2} \delta_{\max} = \frac{v^{2}}{\delta_{\max}} ,
$$
$$
\delta_{\max} = \frac{v^{2}}{a_{\max}} = \frac{0.833^{2}}{0.4 \times 9.81} = 0.177\ \mathrm{m},
$$
$$
k = \frac{m a_{\max}}{\delta_{\max}} = \frac{15\,000 \times 3.924}{0.177} = 333\ \mathrm{kN / m}.
$$
**$6\ \mathrm{km / h}$时**固有频率不变，仍为$\omega_n = \sqrt{k / m} = 4.71\ \mathrm{rad / s}$，故
$$
\delta_{\max} = \frac{v}{\omega_n} = \frac{1.667}{4.71} = 0.354\ \mathrm{m}, \qquad
a_{\max} = \omega_n v = 7.85\ \mathrm{m / s^{2}} = 0.80\ g .
$$
**注。**对**线性**弹簧，压缩量和力都与$v$成正比，所以冲击速度加倍，货车车架上的载荷也加倍，而要吸收的**能量**却变为四倍——这意味着行程也必须加倍。对缓冲器而言这是错误的比例关系，因为设计工况是重车低速，意外工况是轻车高速，线性弹簧要么行程不够要么载荷超限，取决于你按哪个工况设计。

**对策。**实际的缓冲器**不是**线性的。碟形弹簧（Belleville）组、摩擦环或液压气动装置能在整个行程内提供近似**恒定**的力，此时
$$
\delta = \frac{m v^{2}}{2 F_{\max}},
$$
于是行程按$v^{2}$增长，而力恰好保持在平台值上，并可用安全阀封顶。铁路缓冲装置按**缓冲特性曲线**——力对压缩量、带平台段——设计，货车车架按平台力设计，而不是按弹簧刚度设计。这也是为什么许多货车装用液压缓冲装置而不是简单弹簧：长行程、近似恒力的装置吸收同样能量时的峰值力远低于同样行程的线性弹簧，后者的峰值力是平均力的两倍。
:::
:::

::: exercise 推导 {level=3}
用能量法推导质量为$M$、半径为$R$的行星的逃逸速度，然后求以$8\ \mathrm{km / s}$从行星表面竖直发射的抛体能达到的最大高度，取$G M = 3.986 \times 10^{14}\ \mathrm{m^{3} / s^{2}}$，$R = 6371\ \mathrm{km}$。为什么常$g$近似的答案会失效？
::: solution
**逃逸速度。**取$V \left( r \right) = - G M m / r$，
$$
\tfrac{1}{2} m v_e^{2} - \frac{G M m}{R} = 0
\quad\Longrightarrow\quad
v_e = \sqrt{\frac{2 G M}{R}} = \sqrt{2 g R} = 11.19\ \mathrm{km / s},
$$
第二个等号用了$g = G M / R^{2}$。

**$8\ \mathrm{km / s}$时的最大高度。**令$r_{\max}$处速度为零，
$$
\frac{v_0^{2}}{2} - \frac{G M}{R} = - \frac{G M}{r_{\max}}
\quad\Longrightarrow\quad
\frac{1}{r_{\max}} = \frac{1}{R} - \frac{v_0^{2}}{2 G M} ,
$$
$$
\frac{1}{r_{\max}} = 1.5696 \times 10^{- 7} - 8.028 \times 10^{- 8}
= 7.668 \times 10^{- 8} \ \mathrm{m^{- 1}},
$$
$$
r_{\max} = 1.3041 \times 10^{7}\ \mathrm{m}, \qquad
h = r_{\max} - R = 6670\ \mathrm{km}.
$$
**常$g$近似为何失效。**常$g$估计给出$h = v_0^{2} / \left( 2 g \right) = 3260\ \mathrm{km}$，不到正确值的一半，因为它假定抛体上升与行星半径相当的距离时重力仍保持表面值。在$r = 2 R$处重力只有$g$的四分之一，在这段距离上克服重力所做的功相应地小于$m g R$。$8\ \mathrm{km / s}$时误差为$51$%，且随$v_0$趋近$v_e$而无限制增大——此时正确答案趋于无穷，而常$g$答案只是有限的$6370\ \mathrm{km}$。

**评注。**经验法则是：只要$h \lesssim 0.02 R$，即$v_0 \lesssim 1.6\ \mathrm{km / s}$，常$g$近似可以接受；超过它就必须用$1 / r$形式，而能量方程是到达它的最短路径——这是能量法为何存在的最清楚例证之一：同一个答案，这里只需一行，$\mathbf{F} = m \mathbf{a}$却需要数值积分。
:::
:::
