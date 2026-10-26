能量与动量把刚体动力学从微分方程变成了算术。[[dynamics/rigid-body-kinetics]]给出的是某一瞬时的加速度，而功能方程（动能定理）不需要任何积分就能给出**经过一段距离后的速度**，冲量-动量方程则不需要知道接触期间那些巨大而无法测量的力，就能给出**一次撞击后的速度**。对刚体而言，每个方程各多出一项——转动项——同时有一个极大的简化：滚动接触处的摩擦力**不做功**，因而根本不出现在能量方程中。

这三种工具的适用范围截然不同，选错工具是本章最常见的错误。功能方程给出速度与位置的关系，对时间一无所知。对某点的动量矩在对该点的力矩为零时守恒，它是唯一在碰撞中仍然可用的工具。冲量-动量方程给出速度与时间的关系。问距离的题目要用能量；问时间的题目要用动量；问碰撞的题目要对碰撞点取动量矩，因为此时冲击力对该点没有力矩。

::: warning 滚动接触处的摩擦力不做功——但这并不等于说它为零
对纯滚动的物体，摩擦力的作用点瞬时静止，所以其功率$\mathbf{F} \cdot \mathbf{v}$为零。摩擦力可以很大，可以是运动所必需的，甚至可以指向“错误的方向”，却仍然不做功。不要由此断定摩擦力在力的方程中可以忽略：它不能忽略，而仅用能量求解的题目会悄悄假定不打滑条件成立，却从不检查$F \le \mu N$。标准做法是先用能量求出运动，再**回到**力的方程中验证所需的摩擦力是否能够提供。
:::

## 刚体的功与动能

::: definition 功、功率与动能 {#def-rbe-work}
对作平面运动的刚体，
$$
T = \frac{1}{2} m v_G^{2} + \frac{1}{2} I_G \omega^{2} = \frac{1}{2} I_C \omega^{2} \ \text{（滚动）},
$$
其中$C$为接触点；外力在有限位移上所做的功为
$$
U_{1 \to 2} = \int_1^2 \sum \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G
+ \int_1^2 \sum M_G \, \mathrm{d} \theta .
$$
**功能方程**为$T_2 - T_1 = U_{1 \to 2}$，其功率形式为
$$
\frac{\mathrm{d} T}{\mathrm{d} t} = \sum \mathbf{F} \cdot \mathbf{v}_G + \sum M_G \, \omega .
$$
若力的作用点不动、力与运动方向垂直，或者力是滚动或不打滑接触处的摩擦力，则该力不做功。恒定的**力偶**所做的功为$M \Delta\theta$，与它作用在物体上的什么位置无关。
:::

::: proof 柯尼希定理：动能可以分解 {#proof-koenig}
把物体上一个质点的速度写成$\mathbf{v}_i = \mathbf{v}_G + \boldsymbol{\omega} \times \boldsymbol{\rho}_i$，其中$\boldsymbol{\rho}_i$从$G$量起。于是
$$
T = \tfrac{1}{2} \sum m_i \mathbf{v}_i \cdot \mathbf{v}_i
= \tfrac{1}{2} \sum m_i \left[ v_G^{2}
+ 2 \mathbf{v}_G \cdot \left( \boldsymbol{\omega} \times \boldsymbol{\rho}_i \right)
+ \left| \boldsymbol{\omega} \times \boldsymbol{\rho}_i \right|^{2} \right] .
$$
中间项为$\mathbf{v}_G \cdot \boldsymbol{\omega} \times \sum m_i \boldsymbol{\rho}_i$，由质心的定义$\sum m_i \boldsymbol{\rho}_i = \mathbf{0}$，它为零。第一项求和得$\tfrac{1}{2} m v_G^{2}$，第三项在平面运动中求和得$\tfrac{1}{2} I_G \omega^{2}$。因此
$$
T = \tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2} .
$$
对滚动，$v_G = \omega R$且$I_C = I_G + m R^{2}$，所以
$$
T = \tfrac{1}{2} \left( I_G + m R^{2} \right) \omega^{2} = \tfrac{1}{2} I_C \omega^{2} ,
$$
这正是把能量当作绕速度瞬心的纯转动算出的结果。$\checkmark$

**注。**交叉项为零就是该定理的全部内容；值得知道的是，在三维情形下，除非$\boldsymbol{\omega}$沿某一主轴，这一点并不成立：那时能量为$\tfrac{1}{2} \boldsymbol{\omega} \cdot \mathbf{I} \boldsymbol{\omega}$，惯性积不会消去。
:::

::: example 绳拉线轴 {#ex-spool-energy}
质量$60\ \mathrm{kg}$、外半径$250\ \mathrm{mm}$、芯轴半径$100\ \mathrm{mm}$、回转半径$180\ \mathrm{mm}$的线轴放在粗糙地面上。绕在芯轴上的绳在$350\ \mathrm{mm}$高处以$200\ \mathrm{N}$的力水平拉动，线轴作纯滚动。用能量法求线轴从静止开始中心移动$3\ \mathrm{m}$后的中心速度。
::: solution
**动能。**由$\omega = v / R$，
$$
T = \tfrac{1}{2} m v^{2} + \tfrac{1}{2} m k^{2} \frac{v^{2}}{R^{2}}
= \tfrac{1}{2} \times 60 \, v^{2} \left( 1 + \frac{0.0324}{0.0625} \right)
= 45.55 \, v^{2} .
$$
**功。**摩擦力不做功。绳的作用点比中心移动得更远，比值等于两者对接触点的力臂之比：
$$
s_{\text{绳}} = s_{\text{中心}} \times \frac{R + r}{R}
= 3 \times \frac{0.35}{0.25} = 4.20\ \mathrm{m},
\qquad U = 200 \times 4.20 = 840\ \mathrm{J} .
$$
**速度。**
$$
v = \sqrt{\frac{840}{45.55}} = 4.29\ \mathrm{m / s} .
$$
**校核。**匀加速给出$a = v^{2} / \left( 2 s \right) = 18.44 / 6 = 3.07\ \mathrm{m / s^{2}}$，而[[dynamics/rigid-body-kinetics]]中的力法给出$a = P R \left( R + r \right) / m \left( k^{2} + R^{2} \right) = 3.07\ \mathrm{m / s^{2}}$ $\checkmark$

**合理性。**绳端移动$4.2\ \mathrm{m}$而线轴移动$3\ \mathrm{m}$，所以拉力做的功比简单地按$P s_{\text{中心}}$估算多出百分之$40$——这与滑轮组中绳子比负载走得更远的倍数是同一个道理，记账方法也相同。把这个比值弄错是此题的典型失误，可靠的看法是绕**速度瞬心**考虑：拉力的力臂为$R + r$，中心运动的力臂为$R$，所以两者的位移必定成此比例。
:::
:::

::: widget plot
f: sqrt(24.525*sin(x*pi/180))
x: 0, 90
y: 0, 5.2
labels: \text{角速度 } \omega \ \left( \mathrm{rad/s} \right)
caption: 一端铰支、从水平位置释放的长$1.2\ \mathrm{m}$均质杆的角速度随其低于水平线的角度$x$的变化，由$\omega = \sqrt{3 g \sin \theta / L}$给出。曲线是正弦的平方根：开始时很陡，此时一个小角度释放出成比例的能量，但惯性要以很低的速度承载它；接近底部时趋于平缓。**斜率**$\mathrm{d}\omega / \mathrm{d}\theta$在$\theta = 0$处为无穷大——这与有限的初始角加速度除以零角速度是同一回事——而$\omega$的增长正是从水平位置释放的摆臂其**轴承**载荷在整个摆动过程中稳步上升、到底部达到最大值的原因，那里向心项$m \bar{r} \omega^{2}$最大。
:::

::: definition 刚体的冲量与动量 {#def-rbe-impulse}
把运动方程在短时间间隔$\Delta t$上积分，得到**冲量-动量**方程
$$
\int \sum \mathbf{F} \, \mathrm{d} t = m \left( \mathbf{v}_{G2} - \mathbf{v}_{G1} \right),
\qquad
\int \sum M_O \, \mathrm{d} t = \mathbf{H}_{O2} - \mathbf{H}_{O1} .
$$
在**碰撞**过程中，力极大、作用时间只有几毫秒且无法测量；但冲量仍然可以求出，标准结论如下：

- 对碰撞点（或冲击力作用线上任一点）的动量矩**守恒**。
- 只有在没有外部冲击力作用时动量才守恒——尤其是在铰链或销支座处动量**不**守恒，因为它们会提供自身的冲量。
- 动能**不**守恒。对两个相互碰撞的质量，动能损失为
$$
\Delta T = \tfrac{1}{2} \mu \left( 1 - e^{2} \right) \left( v_1 - v_2 \right)^{2},
\qquad \mu = \frac{m_1 m_2}{m_1 + m_2},
$$
仅在完全弹性碰撞$e = 1$时为零。
:::

::: example 圆柱在圆柱面内滚动 {#ex-inside-cylinder}
半径$100\ \mathrm{mm}$的实心圆柱在半径$500\ \mathrm{mm}$的固定圆柱面内侧作纯滚动。求它在底部附近微小摆动的周期。
::: solution
设$\theta$为两中心连线与铅垂线的夹角。质心在半径为$R - r = 0.4\ \mathrm{m}$的圆上运动，所以
$$
T = \tfrac{1}{2} m \left( R - r \right)^{2} \dot{\theta}^{2}
+ \tfrac{1}{2} \left( \tfrac{1}{2} m r^{2} \right) \omega^{2},
\qquad \omega = \frac{v}{r} = \frac{\left( R - r \right) \dot{\theta}}{r} ,
$$
$$
T = \tfrac{1}{2} m \left( R - r \right)^{2} \dot{\theta}^{2} \left( 1 + \tfrac{1}{2} \right)
= \tfrac{3}{4} m \left( R - r \right)^{2} \dot{\theta}^{2},
\qquad
V = - m g \left( R - r \right) \cos \theta .
$$
对$T + V = \text{常数}$求导，并除以$\tfrac{3}{2} m \left( R - r \right)^{2} \dot{\theta}$，
$$
\ddot{\theta} + \frac{2 g}{3 \left( R - r \right)} \sin \theta = 0
\quad\Longrightarrow\quad
\tau = 2 \pi \sqrt{\frac{1.5 \left( R - r \right)}{g}}
= 2 \pi \sqrt{\frac{1.5 \times 0.4}{9.81}} = 1.55\ \mathrm{s} .
$$
**校核。**长$0.4\ \mathrm{m}$的单摆周期为$\tau = 1.27\ \mathrm{s}$；滚动圆柱恰好慢$\sqrt{1.5}$倍，这正是它的惯性超出一个质点的倍数。$\checkmark$

**合理性。**除了路径半径$R - r$之外，滚动圆柱的大小从周期中消失了，因为路径速度和自转都通过同一个$\left( R - r \right) \dot{\theta}$进入——但它的**形状**并不消失，因为对球体$\tfrac{1}{2}$变成$\tfrac{2}{5}$，对圆环变成$1$。这与决定斜面上加速度的$k^{2} / R^{2}$是同一个量，在这里以惯性上的一个因子出现；也正因如此，滚动体的周期是测量零件回转半径的一种简洁方法，根本不需要精确称重：质量相消，只有质量分布留了下来。
:::
:::

## 动量矩与碰撞

::: theorem 平面运动刚体的动量矩 {#thm-rbe-h}
对作平面运动的刚体，
$$
\mathbf{H}_G = I_G \omega \mathbf{k}, \qquad
\mathbf{H}_P = I_G \omega \mathbf{k} + \mathbf{r}_{G / P} \times m \mathbf{v}_G ,
$$
而对**固定**点$O$或对速度瞬心$C$，
$$
\mathbf{H}_O = I_O \omega \mathbf{k}, \qquad
\mathbf{H}_C = I_C \omega \mathbf{k} .
$$
对固定点$O$，力矩方程为$\sum M_O = \dot{\mathbf{H}}_O$；而$\sum M_G = \dot{\mathbf{H}}_G$总是成立。若在某段时间内$\sum M_O = 0$，则$\mathbf{H}_O$守恒——这就是处理**碰撞**的工具，因为作用线通过$O$的冲击力无论多大，对$O$都没有力矩。
:::

::: proof 对速度瞬心的动量矩 {#proof-h-ic}
对质心，$\mathbf{H}_G = I_G \omega \mathbf{k}$；对两点$P$与$Q$，
$$
\mathbf{H}_Q = \mathbf{H}_P + \mathbf{r}_{P / Q} \times m \mathbf{v}_G \quad \text{（须注意用的是哪个速度）} .
$$
取$Q$为固定点并利用输运定理，
$$
\mathbf{H}_O = I_G \omega \mathbf{k} + \mathbf{r}_{G / O} \times m \mathbf{v}_G .
$$
现在令$O$为速度瞬心$C$，于是$\mathbf{v}_G = \boldsymbol{\omega} \times \mathbf{r}_{G / C}$。则
$$
\mathbf{r}_{G / C} \times m \left( \boldsymbol{\omega} \times \mathbf{r}_{G / C} \right)
= m \left[ r_{G / C}^{2} \boldsymbol{\omega}
- \left( \boldsymbol{\omega} \cdot \mathbf{r}_{G / C} \right) \mathbf{r}_{G / C} \right] ,
$$
在平面运动中$\boldsymbol{\omega}$垂直于$\mathbf{r}_{G / C}$，上式化为$m r_{G / C}^{2} \boldsymbol{\omega}$。因此
$$
\mathbf{H}_C = \left( I_G + m r_{G / C}^{2} \right) \omega \mathbf{k} = I_C \omega \mathbf{k} . \quad \checkmark
$$
**注。**这一化简用到了$\boldsymbol{\omega} \perp \mathbf{r}_{G / C}$，这是**平面**运动的性质。在三维情形下，对速度瞬心的动量矩**不是**$I_C \omega$，把这个恒等式用于空间问题是一个真实而常见的错误。
:::

::: example 冲击摆 {#ex-ballistic}
质量$4\ \mathrm{kg}$、长$1.2\ \mathrm{m}$的均质杆由顶端铰链悬挂。一颗$10\ \mathrm{g}$的子弹以$400\ \mathrm{m / s}$水平飞行，在铰链下方$600\ \mathrm{mm}$处击中杆并嵌入其中。求碰撞刚结束时的角速度和最大摆角。
::: solution
**碰撞：对铰链的动量矩守恒。**铰链的冲击约束力对铰链没有力矩，所以
$$
m v d = \left( I_O + m d^{2} \right) \omega, \qquad
I_O = \frac{M L^{2}}{3} = \frac{4 \times 1.44}{3} = 1.92\ \mathrm{kg\,m^{2}} ,
$$
$$
\omega = \frac{0.01 \times 400 \times 0.6}{1.92 + 0.01 \times 0.36}
= \frac{2.40}{1.9236} = 1.248\ \mathrm{rad / s} .
$$
**摆动：能量守恒。**碰撞刚结束时的能量为
$$
T = \tfrac{1}{2} \times 1.9236 \times 1.248^{2} = 1.497\ \mathrm{J},
$$
组合体的质心距铰链$0.6\ \mathrm{m}$，升高$0.6 \left( 1 - \cos \theta \right)$，所以
$$
1.497 = 4.01 \times 9.81 \times 0.6 \left( 1 - \cos \theta \right)
\quad\Longrightarrow\quad
\theta = 20.5^{\circ} .
$$
**校核。**子弹的初始动能为$\tfrac{1}{2} \times 0.01 \times 400^{2} = 800\ \mathrm{J}$，碰撞后只剩下$1.5\ \mathrm{J}$——百分之$0.19$。$\checkmark$

**合理性。**这百分之$99.8$的损失并非偶然，也无法挽回：完全非弹性碰撞在约束允许的范围内损失尽可能多的动能，而损失量由动量守恒决定，与变形的细节无关。这就是**冲击摆**测量的是动量而不是能量的原因；同样的算术也说明了为什么速度加倍的**车祸**需要吸收四倍的能量，而动量变化只增加一倍。
:::
:::

::: example 下落的杆 {#ex-falling-rod}
[[dynamics/rigid-body-kinetics]]中质量$8\ \mathrm{kg}$、长$1.2\ \mathrm{m}$的铰支均质杆从水平位置释放，在低于水平线$\theta$角时角速度为$\omega = \sqrt{3 g \sin \theta / L}$。求摆到最低点时的轴承约束力。
::: solution
对$\tfrac{1}{2} I_O \omega^{2} = m g \tfrac{L}{2} \sin \theta$求导得$\alpha = 3 g \cos \theta / \left( 2 L \right)$，在最低点$\theta = 90^{\circ}$处它为**零**，而
$$
\omega^{2} = \frac{3 g}{L} = 24.53\ \mathrm{s^{- 2}} .
$$
质心以$\bar{a} = \omega^{2} L / 2 = 14.72\ \mathrm{m / s^{2}}$的加速度**向上**加速，所以
$$
R - m g = m \bar{a}
\quad\Longrightarrow\quad
R = m \left( g + \omega^{2} L / 2 \right) = 8 \times 24.53 = 196\ \mathrm{N} = 2.5\, m g .
$$
**校核。**一般情况下，约束力沿杆的分量为$2.5\, m g \sin \theta$，垂直于杆的分量为$0.25\, m g \cos \theta$。释放时$\omega = 0$，所以质心的加速度$\alpha L / 2 = 7.36\ \mathrm{m / s^{2}}$完全是铅垂的，约束力只有$m g / 4 = 19.6\ \mathrm{N}$，垂直于杆；在最低点它为$2.5\, m g = 196\ \mathrm{N}$，沿杆竖直向上。$\checkmark$

**合理性。**因此在摆动过程中，轴承力**相对于杆转过了九十度**，同时增大到十倍；承受方向旋转、大小变化的载荷的轴承，其疲劳寿命必须按载荷矢量的轨迹而不是按峰值来计算。这正是连杆大头轴承的情形：载荷每转摆动一次，其大小是气体压力与往复惯性力之和；这也是滑动轴承按整个循环中的最小油膜厚度而不是按峰值压强来定额的原因。

下面这个一般结果值得掌握：铰支点到质心距离为$\bar{r}$的物体从水平位置释放，到达最低点时
$$
R = m g \left[ 1 + \frac{2}{1 + k^{2} / \bar{r}^{2}} \right] ,
$$
对无质量臂上的质点它为$3\, m g$，对均质杆为$2.5\, m g$，当质心趋近铰支点时趋于$m g$。以重力的倍数表示的峰值约束力只通过$k / \bar{r}$依赖于质量分布的**形状**，与尺寸完全无关，所以几何相似的模型能够准确再现它。
:::
:::

::: example 用能量法分析齿轮传动 {#ex-geared-drive}
质量$30\ \mathrm{kg}$、回转半径$200\ \mathrm{mm}$的大齿轮以$3 : 1$的传动比驱动质量$10\ \mathrm{kg}$、回转半径$100\ \mathrm{mm}$的小齿轮。在大齿轮上施加$50\ \mathrm{N\,m}$的恒定转矩。忽略摩擦，求它从静止转过五圈后的转速。
::: solution
**折算到大齿轮轴上的等效转动惯量。**取$n = \omega_p / \omega_g = 3$，
$$
I_{\text{eff}} = I_g + I_p n^{2}
= 30 \times 0.2^{2} + 10 \times 0.1^{2} \times 9
= 1.20 + 0.90 = 2.10\ \mathrm{kg\,m^{2}} .
$$
**动能定理。**
$$
M \times 2 \pi N = \tfrac{1}{2} I_{\text{eff}} \omega_g^{2}
\quad\Longrightarrow\quad
\omega_g = \sqrt{\frac{2 \times 50 \times 10 \pi}{2.10}} = 38.7\ \mathrm{rad / s} = 369\ \mathrm{rpm} .
$$
**校核。**按力的问题求解，$\alpha_g = M / I_{\text{eff}} = 23.81\ \mathrm{rad / s^{2}}$，由$\omega^{2} = 2 \alpha \times 10 \pi$得到同样的$38.7\ \mathrm{rad / s}$。$\checkmark$

**合理性。**小齿轮的质量是大齿轮的三分之一，对自身轴的$I$是大齿轮的十二分之一，却在$2.10\ \mathrm{kg\,m^{2}}$中贡献了$0.90$——占总量的百分之$43$——完全是因为传动比以**平方**进入。这一事实支配着每一种齿轮传动的布局：把高速级放在惯量小的地方；如果必须让传动系统剧烈加速，就减小传动比，而不是减轻高速轴，因为传动比减半会使折算惯量变为四分之一。
:::
:::

::: example 提升机的紧急制动 {#ex-hoist-stop}
矿井提升机以$3\ \mathrm{m / s}$的速度下放$500\ \mathrm{kg}$的罐笼。卷筒质量$200\ \mathrm{kg}$，回转半径$300\ \mathrm{mm}$，绳索缠绕半径$400\ \mathrm{mm}$。制动器使罐笼在$2\ \mathrm{m}$内停止。求绳索张力和制动力矩。
::: solution
**减速度。**
$$
a = \frac{v^{2}}{2 s} = \frac{9}{2 \times 2} = 2.25\ \mathrm{m / s^{2}} \quad \text{（向上，因为罐笼在下降）} .
$$
**罐笼。**以$T$表示绳索张力，
$$
T - m g = m a
\quad\Longrightarrow\quad
T = 500 \left( 9.81 + 2.25 \right) = 6030\ \mathrm{N},
$$
比静重$4905\ \mathrm{N}$高出百分之$23$。
**卷筒。**其角减速度为$\alpha = a / R = 5.625\ \mathrm{rad / s^{2}}$，制动力矩既要克服绳索的驱动力矩，又要克服卷筒自身的惯性：
$$
M_b = T R + I \alpha = 6030 \times 0.4 + 18 \times 5.625
= 2412 + 101 = 2513\ \mathrm{N\,m} .
$$
**校核。**能量：罐笼损失动能$\tfrac{1}{2} \times 500 \times 9 = 2250\ \mathrm{J}$和势能$500 \times 9.81 \times 2 = 9810\ \mathrm{J}$，共$12\,060\ \mathrm{J}$需要耗散；制动器转过$2 / 0.4 = 5\ \mathrm{rad}$，所以$M_b = 12\,060 / 5 = 2412\ \mathrm{N\,m}$——这只是绳索的力矩，多出的$101\ \mathrm{N\,m}$来自卷筒自身的动能$\tfrac{1}{2} \times 18 \times 7.5^{2} = 506\ \mathrm{J}$，能量平衡也必须吸收它。加上$506 / 5 = 101$得$2513\ \mathrm{N\,m}$ $\checkmark$

**合理性。**绳索张力百分之$23$的动态超调就是提升钢丝绳设计的全部要点：按静重并取名义安全因数$9$选定的绳索，在紧急制动时实际安全因数只有$7$，矿山规程正是因此对制动减速度作出了严格规定。另一个值得注意的数字是，卷筒自身惯性只占制动力矩的百分之$4$——但对**轻**罐笼或大型多绳卷筒，它可达百分之$20$；而电动机转子通过传动比的**平方**折算到卷筒上，携带的动能可以与卷筒本身一样多——这也是矿井提升机的紧急制动器直接作用在卷筒上的原因之一。
:::
:::

::: history
质点系的**功能原理**源于“活力”（*vis viva*）守恒，惠更斯（Huygens）曾将其用于复摆，约翰·伯努利（Johann Bernoulli）和丹尼尔·伯努利（Daniel Bernoulli）在1720年代和1730年代对其作了发展；用 *energy*（能量）一词称呼它始于托马斯·杨（Thomas Young）1807年，*kinetic energy*（动能）这一名称出自威廉·汤姆森（William Thomson），*potential energy*（势能）出自朗肯（Rankine）1853年。**柯尼希定理**——能量分解为质心的平动与绕质心的转动两部分——由萨穆埃尔·柯尼希（Samuel König）于1751年提出。**冲击摆**是罗宾斯（Robins）1742年在《射击学新原理》（*New Principles of Gunnery*）中发明的，在大约一个世纪里一直是测量弹丸速度的标准方法——恰恰因为它把无法测量的冲击力转化为可以测量的摆动，代价是[[#ex-ballistic]]中算出的巨大能量损失。**恢复因数**可以追溯到牛顿（Newton）的碰撞实验；现代刚体碰撞理论必须解决同时接触与摩擦接触中的不确定性，其发展从泊松（Poisson）1833年的恢复假设，到1980年代起莫罗（Moreau）等人的非光滑动力学，再到斯特朗格（Stronge）1990年提出的能量恢复因数。
:::

## 后续内容

包含完整动量矩矢量和陀螺项的三维推广见[[dynamics/three-dimensional-dynamics]]。应用于变形体的能量方法——应变能、卡氏定理和单位载荷法——见[[solid-mechanics/energy-methods]]，本课所研究系统的振动见[[vibrations/free-vibration]]，最后一节提到的碰撞与接触建模在[[mechanisms/cams]]中展开。

::: summary
- 刚体的动能为$\tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2}$，对滚动而言为绕接触点的$\tfrac{1}{2} I_C \omega^{2}$。
- 滚动接触处的摩擦力不做功，所以能量方法无法告诉你不打滑假设是否成立——事后要用$\mu N$检验。
- 功为$\int \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G + \int M_G \, \mathrm{d}\theta$；力偶无论作用在何处都贡献$M \Delta \theta$，绳端的位移与中心位移之比等于两者对速度瞬心的力臂之比。
- 对固定点或速度瞬心的动量矩为$I \omega$；对碰撞点应用动量矩守恒，就能在不知道冲击力的情况下求解碰撞。
- 非弹性碰撞会损失大部分动能——子弹射入摆中损失百分之$99.8$——而损失量由动量决定，与材料无关。
- 转动惯量经齿轮传动折算时乘以传动比的**平方**，这支配着任何齿轮传动的加速特性。
:::

::: quiz
线轴在粗糙水平地面上作纯滚动，同时绕在芯轴上的绳被拉动。在给定的位移上，地面摩擦力对线轴所做的功：
- [ ] 为正，因为摩擦力沿运动方向
- [ ] 为负，因为摩擦力阻碍运动
- [x] 为零，因为摩擦力的作用点瞬时静止
- [ ] 为零，因为摩擦力本身为零
::: solution
摩擦力一般**不**为零——正是它保证了不打滑条件，而且它可以指向任一方向——但它的功率是$\mathbf{F} \cdot \mathbf{v}_C$，而滚动体的接触点$C$速度为零，所以它不做功。由此引出一个陷阱：滚动问题的能量解永远不会显示所需的摩擦力是否超过$\mu N$，所以事后必须通过力的方程检验不打滑假设。这也是汽车在水平路面上匀速行驶时并不从路面获得能量的原因：静摩擦力提供了外力，使发动机的化学能得以转化为动能，而它自身不消耗一焦耳。能量是在接触印迹处以变形轮胎的**滞后**损失消耗掉的，这是完全不同的机理，也正因如此，滚动阻力与载荷和橡胶的损耗角正切成正比，而与任何摩擦因数无关。
:::
:::

## 习题

::: exercise 动能 {level=1 check="0.333"}
质量为$m$、半径为$R$的实心圆柱以速度$v$滚动。其动能中转动部分占多大比例？
::: solution
$T_{\text{rot}} / T = \tfrac{1}{2} I_G \omega^{2} / \tfrac{1}{2} m v^{2} \left( 1 + k^{2} / R^{2} \right) = \tfrac{1}{2} / \tfrac{3}{2} = 1 / 3$，所以转动部分占$1 / 3 = 0.333$，平动部分占$2 / 3$。
:::
:::

::: exercise 滚动 {level=1 check="5.72"}
$10\ \mathrm{kg}$、半径$0.2\ \mathrm{m}$的实心圆柱从静止开始沿$30^{\circ}$斜面滚下$5\ \mathrm{m}$。用能量法求其速度。
::: solution
$m g s \sin \theta = \tfrac{1}{2} m v^{2} \times 1.5$，所以
$$
v = \sqrt{\frac{2 \times 9.81 \times 5 \times 0.5}{1.5}} = \sqrt{32.7} = 5.72\ \mathrm{m / s}.
$$
:::
:::

::: exercise 折算惯量 {level=1 check="2.1"}
对[[#ex-geared-drive]]中的传动系统，折算到大齿轮轴上的等效转动惯量是多少？
::: solution
$I_{\text{eff}} = 1.20 + 0.90 = 2.10\ \mathrm{kg\,m^{2}}$。
:::
:::

::: exercise 下落的悠悠球 {level=2}
质量$0.5\ \mathrm{kg}$、外半径$30\ \mathrm{mm}$、轴半径$5\ \mathrm{mm}$、$k = 20\ \mathrm{mm}$的悠悠球从静止开始随绳展开下落$1.5\ \mathrm{m}$。用能量法求其速度和转速。
::: solution
$$
m g h = \tfrac{1}{2} m v^{2} \left( 1 + \frac{k^{2}}{r^{2}} \right)
= \tfrac{1}{2} m v^{2} \times 17
\quad\Longrightarrow\quad
v = \sqrt{\frac{2 \times 9.81 \times 1.5}{17}} = 1.32\ \mathrm{m / s} ,
$$
$$
\omega = \frac{v}{r} = \frac{1.316}{0.005} = 263\ \mathrm{rad / s} = 2510\ \mathrm{rpm} .
$$
**合理性。**仅仅下落一米半就达到每分钟两千五百转，而势能中只有$1 / 17$，即百分之$6$，最终成为平动——其余百分之$94$都是自转。这就是悠悠球的全部奥妙。
:::
:::

::: exercise 动量矩 {level=2}
质量为$M$、长为$L$的均质杆放在光滑水平桌面上，在距中心$L / 4$处受到一个急促的水平打击。证明它同时获得平动和转动，并求转动动能与平动动能之比。
::: solution
冲量$J$给出$m v = J$以及$J \times L / 4 = I_G \omega = \left( M L^{2} / 12 \right) \omega$，所以
$$
v = \frac{J}{M}, \qquad \omega = \frac{3 J}{M L} ,
$$
$$
\frac{T_{\text{rot}}}{T_{\text{trans}}}
= \frac{\tfrac{1}{2} I_G \omega^{2}}{\tfrac{1}{2} M v^{2}}
= \frac{\left( M L^{2} / 24 \right) \times 9 J^{2} / M^{2} L^{2}}{J^{2} / 2 M}
= \frac{9}{12} = 0.75 .
$$
**合理性。**这一分配只取决于打击的位置：一般地$T_{\text{rot}} / T_{\text{trans}} = M d^{2} / I_G = 12 d^{2} / L^{2}$，在中心为$0$，在$L / 4$处为$0.75$，在端点为$3$。偏心击打的母球获得的自转正好符合这一比例——对球体$I_G = 2 m R^{2} / 5$，比值为$5 d^{2} / \left( 2 R^{2} \right)$——这就是为什么球手加给球的“塞”用半径的分数而不是用力来描述：自转与速度之比只由偏心距决定，击球的力度只是把两者同比例放大。在中心以上$d = 0.4 R$处水平击球，恰好得到纯滚动的自转$\omega = v / R$，于是球从一开始就在台呢上无滑动地滚动。
:::
:::

::: exercise 力偶的功 {level=2}
$I = 18\ \mathrm{kg\,m^{2}}$、绳索缠绕半径$0.4\ \mathrm{m}$的卷筒在$2500\ \mathrm{N\,m}$的驱动转矩下，把$500\ \mathrm{kg}$的罐笼从静止提升$5\ \mathrm{m}$。用能量法求末速度，并与[[dynamics/rigid-body-kinetics]]的结果比较。
::: solution
$$
\left( M - m g R \right) \theta = \tfrac{1}{2} \left( m + \frac{I}{R^{2}} \right) v^{2},
\qquad \theta = \frac{5}{0.4} = 12.5\ \mathrm{rad} ,
$$
$$
538 \times 12.5 = \tfrac{1}{2} \times 612.5 \, v^{2}
\quad\Longrightarrow\quad
v = \sqrt{21.96} = 4.69\ \mathrm{m / s} .
$$
**合理性。**由$v = \sqrt{2 a s}$、$a = 2.20\ \mathrm{m / s^{2}}$得到同样的答案，理应如此。只要转矩是**变化**的——例如具有转矩-转速特性曲线的实际电动机——能量方法就更可取，因为此时功为$\int M \, \mathrm{d}\theta$，变化的转矩只需要对转矩图积分，而不需要对运动方程积分。
:::
:::

::: exercise 设计 {level=3}
一台模锻锤使$200\ \mathrm{kg}$的锤头从$1.2\ \mathrm{m}$高处落到$1500\ \mathrm{kg}$的砧座组件上。估算传给锻件的能量、回弹，以及打击能量被$8\ \mathrm{mm}$的变形吸收时的平均锻造力。说明你会作何改动以把更多的能量传给锻件。
::: solution
**撞击速度。**$v = \sqrt{2 g h} = \sqrt{2 \times 9.81 \times 1.2} = 4.85\ \mathrm{m / s}$。
**可用能量。**
$$
T_1 = \tfrac{1}{2} \times 200 \times 4.85^{2} = 2354\ \mathrm{J}.
$$
**碰撞后的共同速度**（锻件发生塑性流动，所以碰撞是完全非弹性的）：
$$
v_c = \frac{200 \times 4.85}{1700} = 0.571\ \mathrm{m / s}, \qquad
T_2 = \tfrac{1}{2} \times 1700 \times 0.571^{2} = 277\ \mathrm{J}.
$$
**传给锻件的能量。**对完全塑性碰撞，
$$
\Delta T = 2354 - 277 = 2077\ \mathrm{J} \quad \left( 88\ \text{\%} \right) .
$$
**回弹。**若锻件不是完全塑性的，而是$e = 0.2$，则恢复条件$v_2 - v_1 = e v$（速度以向下为正，锤头为$1$，砧座为$2$）与动量守恒一起给出
$$
v_2 = \frac{m_1 v \left( 1 + e \right)}{m_1 + m_2} = \frac{200 \times 4.85 \times 1.2}{1700} = 0.685\ \mathrm{m / s},
\qquad
v_1 = v_2 - e v = - 0.285\ \mathrm{m / s} ,
$$
所以锤头以$0.285\ \mathrm{m / s}$向上回弹，高度为$v_1^{2} / 2 g = 4.2\ \mathrm{mm}$，两物体中剩余的动能为$8 + 352 = 360\ \mathrm{J}$而不是$277\ \mathrm{J}$。传给锻件的能量降至$1994\ \mathrm{J}$，即百分之$85$。

**平均锻造力。**
$$
\bar{F} = \frac{2077}{0.008} = 260\ \mathrm{kN}.
$$
**设计评述。**落锤的效率为$\eta = m_{\text{anvil}} / \left( m_{\text{anvil}} + m_{\text{ram}} \right)$，此处为$0.88$，这就是砧座做得很重的原因：砧座每增加一千克，打击能量中进入锻件的比例就提高一些。有两种改动可以传递更多能量。第一，**增大砧座质量**——从$1500$增至$3000\ \mathrm{kg}$使效率提高到$0.94$，增益百分之$7$，但基础必须承受额外的静重。第二，**增大落下高度**，能量随之线性增加，但循环时间按平方根增加，因此会降低生产率。更重的锤头也能提高传递的能量$m_1 g h \, m_2 / \left( m_1 + m_2 \right)$，但随着$\eta$下降收益递减，所以砧座与锤头的质量比总是保持很大。$260\ \mathrm{kN}$的平均力也是一个警示：峰值是它的数倍，机架要按峰值设计；而打击能量被吸收的变形量越小，力就越大——这就是打击薄的或冷的锻件可能损坏模具的原因。
:::
:::

::: exercise 推导 {level=3}
由运动方程推导平面运动刚体的功能方程，并用它说明：滚动接触处的摩擦力不做功，而接触点的加速度却不为零。
::: solution
**由运动方程出发。**由$\sum \mathbf{F} = m \mathbf{a}_G$和$\sum M_G = I_G \alpha$，把第一式与$\mathrm{d} \mathbf{r}_G$作数量积，第二式乘以$\mathrm{d} \theta$：
$$
\sum \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G = m \mathbf{a}_G \cdot \mathrm{d} \mathbf{r}_G
= m \frac{\mathrm{d} \mathbf{v}_G}{\mathrm{d} t} \cdot \mathbf{v}_G \, \mathrm{d} t
= \mathrm{d} \left( \tfrac{1}{2} m v_G^{2} \right) ,
$$
$$
\sum M_G \, \mathrm{d} \theta = I_G \alpha \, \mathrm{d} \theta
= I_G \frac{\mathrm{d} \omega}{\mathrm{d} t} \omega \, \mathrm{d} t
= \mathrm{d} \left( \tfrac{1}{2} I_G \omega^{2} \right) .
$$
相加并积分，
$$
U_{1 \to 2} = \left[ \tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2} \right]_1^2 = T_2 - T_1 .
$$
**摩擦力的功率。**作用在刚体上的力系的总功率为
$$
\mathcal{P} = \sum_i \mathbf{F}_i \cdot \mathbf{v}_i .
$$
对作用在接触点$C$的单个摩擦力$\mathbf{F}$，$\mathcal{P} = \mathbf{F} \cdot \mathbf{v}_C$，而纯滚动意味着$\mathbf{v}_C = \mathbf{0}$，所以
$$
\mathcal{P}_{\text{friction}} = 0 .
$$
**但加速度不为零。**接触点的**速度**在该瞬时为零，而其**加速度**为指向中心的$\omega^{2} R$，见[[dynamics/rigid-body-kinematics]]。功是力对**其自身作用点的速度**的积分，而该速度恒为零；加速度只通过运动方程进入功，而不通过功的定义进入。等价地说，接触点在每一瞬时都是一个不同的物质点——依次接触地面的一系列质点——而每一个质点在被接触的那一刻都是静止的。

**评述。**这就是汽车可以加速而轮胎并不对它做功的原因。发动机的化学能通过接触印迹处的**静**摩擦转化为动能，而这个摩擦力不做功；它只是提供外力，让内力在“汽车加地球”系统内部重新分配能量。同样的论证解释了为什么人行走时地面摩擦力不做功，为什么滑冰者蹬离场边挡板获得的动能来自她自己的肌肉而不是挡板，以及为什么教科书中“摩擦总是耗散能量”的说法只对**动**摩擦成立。静摩擦是工业上最有用的力，而它不消耗一焦耳。
:::
:::
