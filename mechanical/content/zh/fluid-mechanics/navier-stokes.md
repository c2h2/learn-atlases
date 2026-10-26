纳维-斯托克斯方程就是把牛顿第二定律应用于一个流体微元，只是假设其表面力正比于**变形速率**而非位移。就这一条本构假设——牛顿在 **1687** 年的《原理》（*Principia*）中提出，**斯托克斯（Stokes）** 在 **1845** 年给出了它的张量形式——既是全部困难所在，也是全部学问所在，因为它把一个运动学陈述变成了一个微分方程：这个方程没人证明在三维可解，而大自然却到处都在解它，解得又糟又湍。

这些方程值得作为研究对象本身来学，而不是当作 [[fluid-mechanics/control-volume-analysis|控制体]] 与 [[computational-fluid-dynamics]] 之间的一个形式步骤，理由有三：**你将用到的每一个精确解都是它们的解**；当你动用伯努利方程、边界层理论或蠕流理论时，它们**确切地告诉你你略去了哪些项**；而从它们掉出来的涡量方程，是本学科最有用的定性工具。

::: warning 纳维-斯托克斯建模中直到代码发散都看不见的七个错误
**在曲线坐标下把黏性项写成"分量的拉普拉斯"。** 在笛卡尔坐标下 $\left( \nabla^2 \mathbf{V} \right)_x = \nabla^2 u$，但在柱坐标下
$$
\left( \nabla^2 \mathbf{V} \right)_r = \nabla^2 v_r - \frac{v_r}{r^2} - \frac{2}{r^2} \frac{\partial v_{\theta}}{\partial \theta}
$$
**那两个附加项不是可有可无的。** 推导管流时把轴向黏性项写成 $\mu \nabla^2 v_z$ 还能蒙混过关，因为 $v_z$ 是沿对称轴方向的分量；同样的捷径用在涡的 $v_{\theta}$ 上就会丢掉 $v_\theta / r^2$ 项，把结果错成 $v_\theta = A \ln r + B$，而正确的组合是 $A r + B / r$。**对可压缩流体假设黏性项就是 $\mu \nabla^2 \mathbf{V}$。** 对牛顿流体它是
$$
\nabla \cdot \boldsymbol{\tau} = \mu \nabla^2 \mathbf{V} + \left( \mu + \tfrac{1}{3} \mu_v \right) \nabla \left( \nabla \cdot \mathbf{V} \right)
$$
而第二项**只对常黏度不可压缩流体为零**。在壁面强冷却的边界层里、在激波里、在声波里，这一项都很重要，而且**体积黏度** $\mu_v$ 不为零——$20\ {}^{\circ}\mathrm{C}$ 的空气它约为 $1.1 \times 10^{- 5}\ \mathrm{Pa\, s}$，约为 **$0.6\ \mu$**；二氧化碳的体积黏度则比 $\mu$ 大几个数量级。**斯托克斯关于 $\mu_v = 0$ 的假设是一种便利，不是定律。** **在气液界面施加无滑移条件。** 界面上正确的条件是**切向速度与切向应力连续**，而干净的水-空气界面上切向应力很小，所以水面接近**无剪切**而非无滑移。**干净的水面表现得像自由表面，而表面活性剂膜可以把水面"冻结"，使它更像一面固壁**——这就是气泡上升速度和水面波的衰减取决于水有多干净的原因。**忘记方程是写在特定参考系里的。** 在旋转参考系中必须加上科里奥利项和离心项，而科里奥利项 $2 \rho \boldsymbol{\Omega} \times \mathbf{V}$ **不是**梯度，不能被吸收进压强里。天气预报程序略去它，大尺度风就会直接顺着压强梯度吹，而不是大致沿等压线吹——与观测方向相差约 $90^{\circ}$；叶轮机械程序在**旋转**参考系中略去它，则叶片载荷和二次流都会算错。 **因为边界条件是定常的就丢掉非定常项、把流动当作定常。** 来流定常的圆柱绕流在 $\mathrm{Re} = 200$ 时有**周期性**尾流；集管内的流动进口定常却有不稳定的全局模态；阀门以 $1\ \mathrm{Hz}$ 抖动的热水管壁面处有一个厚度 $\sqrt{2 \nu / \omega} \approx 0.4\ \mathrm{mm}$ 的振荡斯托克斯层。**定常边界条件不意味着定常解**，判断要看特征值问题，不是看边界条件。**对本不是牛顿流体的流体使用牛顿本构律。** 血液、聚合物溶液、黏土、涂料、泥浆、水泥浆、钻井液、打发奶油和熔融塑料都不是牛顿流体。**几十 ppm 的长链聚合物就能把管道湍流摩擦降低多达约 $70\ \%$**（汤姆斯效应），而牛顿流体的纳维-斯托克斯程序算不出来，因为黏度是变形历史的泛函，不是一个数。**警告不是说非牛顿流动多么稀奇，而是说方程名字里的"流体"是一个声明，而且它经常不成立。** **因为算收敛了就直接相信解。** 二维不可压缩纳维-斯托克斯方程在 $\mathrm{Re} = 10^{7}$ 下绕钝体的解，是一个**不稳定**问题的**定常**解，而且收敛得非常漂亮。方程没错；答案不是一种流动。**每一个 CFD 结果都必须对照流动本身的稳定性来检查，而不能只看残差。**
:::

## 方程

::: definition 应力张量与本构律 {#def-stress}
**柯西应力关系。** 法向为 $\mathbf{n}$ 的截面上单位面积的表面力为
$$
\mathbf{t}^{(n)} = \boldsymbol{\tau} \cdot \mathbf{n}, \qquad
\boldsymbol{\tau} = - p \mathbf{I} + \boldsymbol{\tau}'
$$
其中 $p$ 是**热力学**压强，$\boldsymbol{\tau}'$ 是**偏（黏性）应力**。$\boldsymbol{\tau}$ 的对称性由角动量平衡得出，它把九个分量约剩六个。
**牛顿本构律。** $\boldsymbol{\tau}'$ 与变形速率张量 $\mathbf{S}$ 之间最一般的线性、各向同性关系：
$$
\boxed{ \boldsymbol{\tau}' = 2 \mu \mathbf{S} + \lambda \left( \nabla \cdot \mathbf{V} \right) \mathbf{I}, \qquad
S_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right), \qquad
\lambda = \mu_v - \tfrac{2}{3} \mu }
$$
**指标形式**
$$
\tau_{ij} = - p \delta_{ij} + 2 \mu S_{ij} + \lambda S_{kk} \delta_{ij}
$$
**对常黏度不可压缩流体**，$\nabla \cdot \mathbf{V} = 0$，于是
$$
\tau_{ij} = - p \delta_{ij} + \mu \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right)
$$
**让体积黏度值得一记的数字。** 气体的**声衰减**含有因子 $\tfrac{4}{3} \mu + \mu_v$，而常压、室温下 $\mathrm{CO_2}$ 的实测衰减是取 $\mu_v = 0$ 的经典斯托克斯-基尔霍夫值的**许多倍**。**差值就是体积黏度，它是一种分子弛豫效应**：三原子线性分子的振动模跟不上压缩，滞后中产生的熵就是那部分额外衰减。单原子气体的 $\mu_v$ 严格为零，因为它们没有内部模态。
:::

::: definition 纳维-斯托克斯方程 {#def-ns}
**矢量形式的动量方程**，对常黏度不可压缩流体：
$$
\boxed{ \rho \left[ \frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V} \right]
= - \nabla p + \mu \nabla^2 \mathbf{V} + \rho \mathbf{g} }
\qquad \text{with} \qquad
\nabla \cdot \mathbf{V} = 0
$$
**四个方程，四个未知量** $\left( u, v, w, p \right)$。**方程组是封闭的**，没有别的东西需要再假设——这就是"方程解出来了"与"流动搞懂了"是两回事的意义所在。
**指标形式**（每个 CFD 程序实现的正是这个形式）：
$$
\frac{\partial u_i}{\partial t} + u_j \frac{\partial u_i}{\partial x_j}
= - \frac{1}{\rho} \frac{\partial p}{\partial x_i} + \nu \frac{\partial^2 u_i}{\partial x_j \partial x_j} + g_i,
\qquad
\frac{\partial u_j}{\partial x_j} = 0
$$
**旋转形式**，利用恒等式 $\left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = \boldsymbol{\omega} \times \mathbf{V} + \nabla \left( V^2 / 2 \right)$：
$$
\frac{\partial \mathbf{V}}{\partial t} + \boldsymbol{\omega} \times \mathbf{V} + \nabla \left( \frac{V^2}{2} \right)
= - \frac{1}{\rho} \nabla p + \nu \nabla^2 \mathbf{V} \quad \text{（不可压缩，}\mu\text{ 为常数）}
$$
**兰姆矢量** $\mathbf{L} = \boldsymbol{\omega} \times \mathbf{V}$ 是无旋部分被吸收进**总**水头 $H = p / \rho + V^2 / 2 + g z$ 之后剩下的东西：
$$
\frac{\partial \mathbf{V}}{\partial t} = - \nabla H + \boldsymbol{\omega} \times \mathbf{V} + \nu \nabla^2 \mathbf{V}
$$
**怎么读这个式子。** **压强梯度与质量力驱动流动；涡量使流动转弯；黏性使涡扩散。** 一个处处无涡的流动有 $\mathbf{V} = - \nabla \phi$，满足 $\partial \mathbf{V} / \partial t = - \nabla \left( H \right)$，这就是非定常伯努利方程——而整个势流理论说的就是：若初始无旋、边界又不产生涡，则 $\boldsymbol{\omega} = 0$ 被方程保持。
**边界条件，它们是问题的一部分。**
$$
\begin{array}{l l l}
\text{固壁，黏性} & \mathbf{V} = \mathbf{V}_{\mathrm{wall}} & \text{无滑移、无穿透} \\
\text{固壁，无黏} & \mathbf{V} \cdot \mathbf{n} = 0 & \text{仅无穿透} \\
\text{自由表面} & p = p_a,\ \mathbf{V} \cdot \mathbf{n} = 0,\ \boldsymbol{\tau} \cdot \mathbf{n} \parallel \mathbf{n} & \text{运动学与动力学条件} \\
\text{对称面} & \partial / \partial n = 0\ \text{（切向速度）},\ V_n = 0 & \\
\text{进口} & \mathbf{V} \text{ 给定} & \\
\text{出口} & p \text{ 给定},\ \partial \mathbf{V} / \partial n = 0 & \text{或 } \mathbf{V} \text{ 给定} \\
\text{远场} & \mathbf{V} \to \mathbf{V}_{\infty} &
\end{array}
$$
**让边界条件成为难点的数字。** 黏性方程对空间是二阶的，每个速度分量需要**两个**条件；无黏方程只需要**一个**。**无滑移条件无法施加到欧拉求解器上**，而这个差别不是数值上的麻烦，而是达朗贝尔佯谬得以成立的原因：带滑移壁的无黏问题有一个零阻力的解，带无滑移壁的黏性问题则有一个有限阻力的解，而**极限 $\mu \to 0$ 不是一致的**。
:::

::: definition 涡量、环量与黏性做了什么 {#def-vort}
**涡量方程。** 对动量方程取旋度，利用正压流体 $\nabla \times \nabla p \equiv 0$ 以及 $\nabla \times \nabla \left( V^2 / 2 \right) \equiv 0$：
$$
\boxed{ \frac{D \boldsymbol{\omega}}{D t} = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} + \nu \nabla^2 \boldsymbol{\omega} }
\qquad \text{（不可压缩，}\mu\text{ 为常数，质量力无旋）}
$$
**只有三种机制，别无其他：** 涡量被流动**输运**，被速度梯度**拉伸和倾斜**，被黏性**扩散**。**方程里没有源项**——涡量只在无滑移起作用的边界上产生，或在流体非正压时由斜压生成 $\nabla \rho \times \nabla p \ne 0$ 产生。
**斜压项。** 对非正压流体，$- \nabla p / \rho$ 的旋度不为零：
$$
\left[ \nabla \times \left( - \frac{1}{\rho} \nabla p \right) \right] = \frac{\nabla \rho \times \nabla p}{\rho^2}
$$
**而这是一切分层或受热流体中环量的来源**——海陆风、热成风，以及火焰锋面穿过压强梯度处产生的涡量。**一个正压、无黏、初始无旋的流动永远无旋；流体力学里其余的一切都是对这三个词之一的违背。**
**开尔文环量定理。** 对无黏、正压、质量力有势的流体，
$$
\frac{D \Gamma}{D t} = 0
$$
**其推论是一个拓扑陈述：一条物质线回路永远带着它的环量**——这就是机翼的起动涡被脱落下来而不是湮灭的原因，也是飞机尾涡能维持很久、以致空中交通规则要求重型飞机与其后飞机之间保持最小间隔的原因。
**涡量的扩散。** 对流可忽略时方程化为 $\partial \boldsymbol{\omega} / \partial t = \nu \nabla^2 \boldsymbol{\omega}$——**就是热传导方程**，$\nu$ 是旋转的"热扩散率"。**经过时间 $t$ 的穿透深度为 $\delta \sim \sqrt{\nu t}$**，而机翼翼尖脱落的涡能飞一公里而不散，是因为十秒飞行时间里 $\sqrt{\nu t} = \sqrt{1.5 \times 10^{- 5} \times 10} = 12\ \mathrm{mm}$——**涡核只比诞生时宽了一厘米**；它之所以在几分钟尺度上仍会衰减，靠的是它在自己内部感生的二次流，而不是扩散。
**从方程里来的雷诺数。** 用 $U, L$ 无量纲化：
$$
\underbrace{\frac{\partial \mathbf{V}^{*}}{\partial t^{*}} + \left( \mathbf{V}^{*} \cdot \nabla^{*} \right) \mathbf{V}^{*}}_{\text{惯性}}
= - \nabla^{*} p^{*} + \frac{1}{\mathrm{Re}} \nabla^{*2} \mathbf{V}^{*} + \frac{1}{\mathrm{Fr}^2} \hat{\mathbf{g}},
\qquad
\mathrm{Re} = \frac{U L}{\nu}, \quad \mathrm{Fr} = \frac{U}{\sqrt{g L}}
$$
**让极限成为奇异的数字。** 当 $\mathrm{Re} \to \infty$ 时，方程**失去最高阶导数**，于是一个厚度 $\delta \sim L / \sqrt{\mathrm{Re}}$ 的边界层形成，其中被略去的项并不可以忽略。**这就是无黏极限不是一个近似而是另一个问题的原因**，也是普朗特 1904 年的边界层理论成为两者之间唯一通道的原因。
:::

::: widget plot
f: exp(-x)*cos(6.2832*0.25 - x); exp(-x)
x: 0, 4
y: -0.6, 1.05
labels: u/U = exp(-y/delta) cos(omega t - y/delta) at omega t = pi/2; envelope exp(-y/delta)
caption: 斯托克斯第二问题——一块平板在自身平面内以频率 $\omega$ 在其上流体中做正弦振荡，流体其余部分静止。扰动穿透到深度 $\delta = \sqrt{2 \nu / \omega}$，按 $e^{- y / \delta}$ 衰减，同时**相位滞后 $y / \delta$ 弧度**，所以 $y = \pi \delta$ 处的流体比平板落后半个周期、正朝**反方向**运动——这就是快照中 $\pi \delta$ 与 $2 \pi \delta$ 之间的那个负瓣。**不存在定常状态**：一两个周期之后每一深度处的流动都是周期的，时均整流流对振幅是二阶小量。曲线是精确解 $u / U = e^{- \eta} \cos \left( \omega t - \eta \right)$，$\eta = y / \delta$，取 $\omega t = \pi / 2$。**让这成为设计问题而非习题的数字：** 心跳 $1.2\ \mathrm{Hz}$、血液 $\nu = 3.3 \times 10^{- 6}\ \mathrm{m^2 / s}$ 时，$\delta = 0.94\ \mathrm{mm}$，而主动脉半径为 $10\ \mathrm{mm}$，于是**沃姆斯利数** $\alpha = R \sqrt{\omega / \nu} = 15.1$，速度剖面是**边界层型的平坦剖面**而非抛物线——这就是大动脉中的脉动血流不能按泊肃叶定律计算的原因。
:::

## 精确解

::: definition 单向流动 {#def-exact}
**这一类流动。** 速度为 $\mathbf{V} = \left( u \left( y, t \right), 0, 0 \right)$、且 $\partial p / \partial x$ 只是 $t$ 的函数的流动。连续方程自动满足，对流项因 $\partial u / \partial x = 0$ 而消失，$x$ 方向动量方程退化为
$$
\rho \frac{\partial u}{\partial t} = - \frac{\partial p}{\partial x} + \mu \frac{\partial^2 u}{\partial y^2}
$$
——一个**带源项的一维扩散方程**——**这一类中的每一个成员都是它的一个积分。**
**定常平面库埃特流。** $\partial p / \partial x = 0$，两平板位于 $y = 0$ 与 $y = h$，上板以 $U$ 运动：
$$
u = U \frac{y}{h}, \qquad \tau_w = \mu \frac{U}{h}, \qquad
P = \tau_w U = \frac{\mu U^2}{h} \quad \left[ \mathrm{W / m^2} \right]
$$
**算例。** 两板相距 $2\ \mathrm{mm}$，$U = 3\ \mathrm{m / s}$，油的 $\mu = 0.1\ \mathrm{Pa\, s}$，面积 $0.5\ \mathrm{m^2}$：
$$
\tau_w = 0.1 \times \frac{3}{0.002} = 150\ \mathrm{Pa}, \qquad
F = 75\ \mathrm{N}, \qquad P = 225\ \mathrm{W}
$$
**让它成为黏度计的数字。** 库埃特几何通过测量已知 $U$ 下的 $F$ 来测 $\mu$；之所以用**旋转**库埃特而不用滑动式，是因为滑动式有端部效应且平板有限长，而环隙两者都没有。**间隙必须远小于半径**——间隙与半径之比为 $0.1$ 时，$\tau_w$ 的曲率修正为 $10\ \%$；精密流变仪取 $0.02$，是因为此时修正只有 $2\ \%$ 且可以计算。
**定常平面泊肃叶流。** $U = 0$，$\partial p / \partial x = - G$：
$$
u = \frac{G}{2 \mu} y \left( h - y \right), \qquad
\bar{u} = \frac{G h^2}{12 \mu}, \qquad
u_{\max} = \tfrac{3}{2} \bar{u}, \qquad
\tau_w = \frac{G h}{2}
$$
**定常圆管泊肃叶（哈根-泊肃叶）流。**
$$
u = \frac{1}{4 \mu} \left( - \frac{d p}{d x} \right) \left( R^2 - r^2 \right), \qquad
\boxed{ Q = - \frac{\pi R^4}{8 \mu} \frac{d p}{d x} = \frac{\pi D^4 \Delta p}{128 \mu L} }
$$
$$
\bar{u} = \frac{1}{2} u_{\max}, \qquad
\tau_w = \frac{\Delta p\, R}{2 L}, \qquad
\mathrm{Re} = \frac{\rho \bar{u} D}{\mu}, \qquad
f = \frac{64}{\mathrm{Re}}
$$
**算例。** $\mu = 0.3\ \mathrm{Pa\, s}$、$\rho = 890\ \mathrm{kg / m^3}$ 的油，在 $\Delta p = 1\ \mathrm{MPa}$ 下流过 $30\ \mathrm{m}$ 长、内径 $25\ \mathrm{mm}$ 的管道：
$$
Q = \frac{\pi \times 0.025^4 \times 10^6}{128 \times 0.3 \times 30} = \frac{1.227 \times 10^{- 6} \times 10^6}{1{,}152} = 1.065 \times 10^{- 3}\ \mathrm{m^3 / s} = 3.83\ \mathrm{m^3 / h}
$$
$$
\bar{u} = 2.17\ \mathrm{m / s}, \qquad
\mathrm{Re} = \frac{890 \times 2.17 \times 0.025}{0.3} = 161 \ll 2{,}300 \quad \checkmark\ \text{层流}
$$
**让四次方成为全部设计的数字。** **管径加倍，同样压差下流量变为十六倍；或者同样流量下压降降为十六分之一。** 一个流量短缺 $20\ \%$ 的液压系统，只需把内径加大 $5\ \%$ 即可补足——液压设计师的第一个问题之所以是"管路里最小的孔口在哪里"，是因为 $Q \propto D^4$ 使最细的那一段几乎构成了全部阻力。
**库埃特-泊肃叶组合流。** 有压强梯度时的运动平板：
$$
u = \frac{G h^2}{2 \mu} \frac{y}{h} \left( 1 - \frac{y}{h} \right) + U \left( 1 - \frac{y}{h} \right)
$$
（$y = 0$ 处的平板以 $U$ 运动，$y = h$ 处的平板固定。）**当压强梯度为逆压梯度**（$G < 0$）**且** $\left| G \right| h^2 / \left( 2 \mu U \right) > 1$ **时，静止壁附近的流动发生倒流**，因为该处的壁面剪应力 $\mu \left( \partial u / \partial y \right)_{y = h} = - G h / 2 - \mu U / h$ 此时改变符号。**这是润滑油膜或扩压器中分离的最简单模型：逆压梯度强到足以压倒壁面附近由剪切驱动的流动。**
**沿斜壁下流的液膜。** 倾角为 $\beta$、厚度为 $h$、自由表面无剪切的重力驱动液膜：
$$
u = \frac{\rho g \sin \beta}{\mu} \left( h y - \frac{y^2}{2} \right), \qquad
\Gamma = \frac{\rho^2 g \sin \beta\, h^3}{3 \mu}, \qquad
h = \left( \frac{3 \mu \Gamma}{\rho^2 g \sin \beta} \right)^{1 / 3}
$$
**算例。** 降膜蒸发器中竖直下流的 $100\ {}^{\circ}\mathrm{C}$ 水，$\Gamma = 0.05\ \mathrm{kg / m\, s}$（$\mu = 2.82 \times 10^{- 4}$，$\rho = 958$）：
$$
h = \left( \frac{3 \times 2.82 \times 10^{- 4} \times 0.05}{958^2 \times 9.81} \right)^{1 / 3}
= \left( 4.70 \times 10^{- 12} \right)^{1 / 3} = 1.68 \times 10^{- 4}\ \mathrm{m} = 0.168\ \mathrm{mm}
$$
**让降膜蒸发器得以工作的数字。** **层流液膜的热阻约为 $h / k$，所以液膜厚度决定了传热系数**；装置之所以在仍能覆盖管面的最低润湿率下运行，是因为该系数按 $k / h \propto \Gamma^{-1/3}$ 变化——流量加倍，液膜增厚 $26\ \%$，液膜传热系数反而**降低**约 $21\ \%$。
:::

::: definition 蠕流 {#def-creep}
**$\mathrm{Re} \ll 1$ 时的方程。** 略去惯性项，动量方程变为**线性**：
$$
\mu \nabla^2 \mathbf{V} = \nabla p, \qquad \nabla \cdot \mathbf{V} = 0
$$
**斯托克斯子（Stokeslet）**，即基本解——一个点力 $\mathbf{F}$ 的速度场：
$$
u_i = \frac{F_j}{8 \pi \mu} \left( \frac{\delta_{ij}}{r} + \frac{x_i x_j}{r^3} \right), \qquad
p = \frac{F_j x_j}{4 \pi r^3}
$$
**速度按 $1 / r$ 衰减，压强按 $1 / r^2$ 衰减**——远比三维势流的 $1 / r^2$ 慢——其后果是**斯托克斯佯谬**：绕圆柱的二维蠕流问题**无解**，因为 $1 / r$ 的远场使被略去的惯性项无论 $\mathrm{Re}$ 多小都会无界增长。**补救办法是奥森（Oseen）方程**，它把对流项在来流附近线性化，给出**奥森修正**
$$
F_D = 3 \pi \mu U D \left( 1 + \frac{3}{8} \mathrm{Re} \right)
$$
**它适用到 $\mathrm{Re} \approx 1$，也说明了在 $\mathrm{Re} = 1$ 时用斯托克斯定律做沉降计算会错 $38\ \%$。**
**圆球。**
$$
\boxed{ F_D = 3 \pi \mu U D }
\qquad
C_D = \frac{24}{\mathrm{Re}}, \qquad
u_r = \frac{2}{9} \frac{\left( \rho_s - \rho \right) g R^2}{\mu}
$$
**算例：一颗沉降的颗粒。** 一颗 $0.05\ \mathrm{mm}$ 的极细砂粒（$\rho_s = 2{,}650$）在 $20\ {}^{\circ}\mathrm{C}$ 的水中；用 $D = 2 R$ 表示，沉降公式为 $u_r = \left( \rho_s - \rho \right) g D^2 / \left( 18 \mu \right)$：
$$
u_r = \frac{\left( 2{,}650 - 998 \right) \times 9.81 \times \left( 5 \times 10^{- 5} \right)^2}{18 \times 1.002 \times 10^{- 3}}
= \frac{4.052 \times 10^{- 5}}{1.804 \times 10^{- 2}} = 2.25 \times 10^{- 3}\ \mathrm{m / s}
$$
$$
\mathrm{Re} = \frac{998 \times 2.25 \times 10^{- 3} \times 5 \times 10^{- 5}}{1.002 \times 10^{- 3}} = 0.112 < 1 \quad \checkmark
$$
**让这项校核必不可少的数字。** 在 $\mathrm{Re} = 0.112$ 时奥森修正为 $1 + 3 \mathrm{Re} / 8 = 1.042$，所以斯托克斯定律把阻力低估约 $4\ \%$，把沉降速度高估约同样的比例。**$0.1\ \mathrm{mm}$ 的颗粒按斯托克斯定律沉速为 $9.0\ \mathrm{mm / s}$，$\mathrm{Re} \approx 0.9$，此时奥森因子已达 $1.34$**；泥沙输运计算之所以采用 **弗格森与丘奇（Ferguson and Church）** 那样的经验沉速公式而不用斯托克斯定律，是因为天然砂大多处在过渡区。
**让比重计法和离心机得以工作的数字。** 一颗 $10\ \mu\mathrm{m}$ 的粉砂颗粒沉速为 $90\ \mu\mathrm{m / s}$——**每天约 $8\ \mathrm{m}$**——而更细的黏土颗粒还要再慢上百倍。这就是水处理澄清池的停留时间以小时计的原因，是颗粒在沉降前要先絮凝的原因，也是**斜管沉淀器**（一叠直径几厘米的倾斜管）之所以有效的原因：它把颗粒落到某个表面之前必须下落的距离从几米缩短到几厘米。
**悬浮液的流动性。** 爱因斯坦关于刚性球稀悬浮液黏度的结果（**1906** 年，系数于 **1911** 年修正），
$$
\frac{\mu_{\mathrm{eff}}}{\mu} = 1 + 2.5 \phi
$$
**在 $\phi \to 0$ 的极限下是精确的**，在 $\phi = 0.3$ 时给出 $1.75$；在这个浓度下，它所忽略的颗粒间相互作用已经不可忽视，而取随机密堆积 $\phi_m = 0.64$ 的克里格-道尔蒂（Krieger–Dougherty）律 $\mu_{\mathrm{eff}} / \mu = \left( 1 - \phi / \phi_m \right)^{- 2.5 \phi_m}$ 给出 $\left( 1 - 0.3 / 0.64 \right)^{- 1.6} = 2.75$——并在 $\phi \to \phi_m$ 时发散，这就是高浓度陶瓷泥浆成了膏体的原因。
:::

## 算例

::: example 从方程推导一个流动 {#ex-derive}
对内半径为 $\kappa R$、外半径为 $R$、由压强梯度 $G$ 驱动的**环形管道**中的定常层流，推导速度剖面、流量与壁面应力，求速度最大处的半径，并对 $\kappa = 0.5$ 计算两壁的应力和流量（表示为满管流量的分数）。
::: solution
**$z$ 方向动量方程。** 取 $\mathbf{V} = \left( 0, 0, u \left( r \right) \right)$，连续方程自动满足，对流项消失；由于对称轴沿 $z$ 方向，**轴向**分量在柱坐标下的拉普拉斯算子就是标量拉普拉斯算子：
$$
\frac{1}{r} \frac{d}{d r} \left( r \frac{d u}{d r} \right) = \frac{1}{\mu} \frac{d p}{d z} = - \frac{G}{\mu}
$$
**积分。**
$$
r \frac{d u}{d r} = - \frac{G r^2}{2 \mu} + C_1
\quad \Rightarrow \quad
u = - \frac{G r^2}{4 \mu} + C_1 \ln r + C_2
$$
**边界条件** $u \left( \kappa R \right) = u \left( R \right) = 0$：
$$
C_1 = \frac{G R^2 \left( 1 - \kappa^2 \right)}{4 \mu \ln \left( 1 / \kappa \right)}, \qquad
C_2 = \frac{G R^2}{4 \mu} - C_1 \ln R
$$
**整理为**
$$
\boxed{ u \left( r \right) = \frac{G R^2}{4 \mu} \left[ 1 - \left( \frac{r}{R} \right)^2 + \frac{1 - \kappa^2}{\ln \left( 1 / \kappa \right)} \ln \left( \frac{r}{R} \right) \right] }
$$
**流量。**
$$
Q = \frac{\pi G R^4}{8 \mu} \left[ \left( 1 - \kappa^4 \right) - \frac{\left( 1 - \kappa^2 \right)^2}{\ln \left( 1 / \kappa \right)} \right]
$$
**校核。** 当 $\kappa \to 0$ 时方括号趋于 $1$，$Q$ 变为圆管结果 ✓。当 $\kappa \to 1$、间隙 $b = \left( 1 - \kappa \right) R$ 时，按 $\varepsilon = 1 - \kappa$ 展开，方括号 $\to \tfrac{4}{3} \varepsilon^3$，于是 $Q \to \pi G R^4 \varepsilon^3 / \left( 6 \mu \right) = G \left( 2 \pi R \right) b^3 / \left( 12 \mu \right)$，即宽度为 $2 \pi R$ 的平面缝隙结果 ✓。
**壁面应力与速度最大处的半径。** 由 $u(r)$，
$$
\tau_{r z} = - \mu \frac{d u}{d r} = \frac{G}{2} \left[ r - \frac{\lambda^2 R^2}{r} \right], \qquad
\lambda^2 = \frac{1 - \kappa^2}{2 \ln \left( 1 / \kappa \right)}
$$
剪应力在 $r = \lambda R$ 处为零，速度在该处取最大值。两壁上
$$
\left| \tau_{\mathrm{outer}} \right| = \frac{G R}{2} \left( 1 - \lambda^2 \right), \qquad
\left| \tau_{\mathrm{inner}} \right| = \frac{G R}{2 \kappa} \left( \lambda^2 - \kappa^2 \right)
$$
**取** $\kappa = 0.5$ **的数值**：$\ln 2 = 0.693$，$\lambda^2 = 0.75 / 1.386 = 0.541$，$\lambda = 0.736$：
$$
\left| \tau_{\mathrm{outer}} \right| = 0.459\, \frac{G R}{2}, \qquad
\left| \tau_{\mathrm{inner}} \right| = \frac{0.541 - 0.25}{0.5}\, \frac{G R}{2} = 0.582\, \frac{G R}{2}
$$
**内壁应力是外壁的 $1.27$ 倍**，速度最大处位于 $r = 0.736 R$，在间隙中点（$0.75 R$）以内——剖面偏向内壁，因为内壁周长较小，要以更高的应力承担它那一份载荷。**力的校核：** 单位长度上两壁的剪切力之和必须与环形面积上的压力相平衡，$2 \pi R \left| \tau_{\mathrm{outer}} \right| + 2 \pi \kappa R \left| \tau_{\mathrm{inner}} \right| = G \pi R^2 \left( 1 - \kappa^2 \right)$；以 $\pi G R^2$ 为单位即 $0.459 + 0.5 \times 0.582 = 0.750 = 1 - 0.25$ ✓。
**流量。**
$$
\frac{Q}{Q_{\mathrm{pipe}}} = \left( 1 - \kappa^4 \right) - \frac{\left( 1 - \kappa^2 \right)^2}{\ln \left( 1 / \kappa \right)} = 0.9375 - \frac{0.5625}{0.6931} = 0.126
$$
**挖去中心四分之一的面积，流量降到八分之一。** 中心区正是圆管里流速最高的地方，而内壁又增加了一个无滑移表面；这就是套管换热器的环隙每单位流量所需的压降远大于其通流面积所暗示的原因。
*合理性检查。* 对数项是齐次方程的 $C_1 \ln r$ 解，即**二维源**解；它之所以出现，是因为环隙有一个内壁。**在满管中，为使速度在 $r = 0$ 处有限，常数 $C_1$ 必须为零，而这一个要求就是两个问题的全部差别。**
:::
:::

::: example 斯托克斯第一问题与淬火 {#ex-stokes1}
一条 $900\ {}^{\circ}\mathrm{C}$ 的钢带浸入 $60\ {}^{\circ}\mathrm{C}$ 的油槽。把油当作无限介质、把界面当作等温阶跃，求 $10\ \mathrm{s}$ 后的热边界层厚度、瞬时热流密度以及单位面积提取的总能量。然后对**速度**场做同样的计算，取钢带的运行速度为 $0.8\ \mathrm{m / s}$。
::: solution
**热问题。** 取 $T - T_{\infty} = \left( T_w - T_{\infty} \right) \operatorname{erfc} \left( y / 2 \sqrt{\alpha t} \right)$：
$$
\delta_T \approx 4 \sqrt{\alpha t}
$$
对 $k = 0.13\ \mathrm{W / m\, K}$、$\rho = 880$、$c_p = 2{,}000$、$\alpha = 7.39 \times 10^{- 8}\ \mathrm{m^2 / s}$ 的油：
$$
\delta_T = 4 \sqrt{7.39 \times 10^{- 8} \times 10} = 4 \times 8.60 \times 10^{- 4} = 3.44\ \mathrm{mm}
$$
$$
q_w = \frac{k \left( T_w - T_{\infty} \right)}{\sqrt{\pi \alpha t}}
= \frac{0.13 \times 840}{\sqrt{\pi \times 7.39 \times 10^{- 7}}} = \frac{109.2}{1.524 \times 10^{- 3}} = 71.7\ \mathrm{kW / m^2}
$$
$$
\frac{Q}{A} = 2 \left( T_w - T_{\infty} \right) \sqrt{\frac{k \rho c_p t}{\pi}}
= 2 \times 840 \times \sqrt{\frac{0.13 \times 880 \times 2000 \times 10}{\pi}} = 1{,}680 \times 853 = 1.43\ \mathrm{MJ / m^2}
$$
**让淬火槽的大小成为一个传热问题的数字。** 每平方米钢带 $1.43\ \mathrm{MJ}$，两面都有，钢带以 $0.8\ \mathrm{m / s}$ 进入（每米钢带在槽中停留十秒），即
$$
\dot{Q} = 2 \times 1.43 \times 10^6 \times 0.8 = 2.29\ \mathrm{MW\ per\ metre\ of\ strip\ width}
$$
**油淬火线配备以兆瓦计的冷却回路，原因就是这个数字。** 作为对比，$2\ \mathrm{mm}$ 厚的钢带从 $900\ {}^{\circ}\mathrm{C}$ 冷却到 $60\ {}^{\circ}\mathrm{C}$ 要放出每平方米钢带 $490 \times 7{,}850 \times 0.002 \times 840 = 6.5\ \mathrm{MJ / m^2}$ 的热量，所以在头十秒内，半无限油模型提取了其中约 $2 \times 1.43 / 6.5 = 44\ \%$；超过这个时间模型就失效了，因为钢带本身的温度已远低于 $900\ {}^{\circ}\mathrm{C}$。
**速度问题。** 斯托克斯第一问题给出 $u / U = \operatorname{erfc} \left( y / 2 \sqrt{\nu t} \right)$，动量层厚度为
$$
\delta = 4 \sqrt{\nu t}
$$
对 $\nu = 6.0 \times 10^{- 5}\ \mathrm{m^2 / s}$ 的油：
$$
\delta = 4 \sqrt{6.0 \times 10^{- 5} \times 10} = 4 \times 0.0245 = 98\ \mathrm{mm}
$$
**普朗特数为 $\mathrm{Pr} = \nu / \alpha = 812$，所以 $\delta / \delta_T = \sqrt{\mathrm{Pr}} = 28.5$**——**速度场穿透的深度是温度场的二十八倍**；热层深埋在钢带拖带着的一层厚得多的油中，所以控制贴近钢带的热油如何更新的，是钢带的运动，而不是适用于静止表面的自然对流。
**钢带上的剪应力。**
$$
\tau_w = \mu \frac{U}{\sqrt{\pi \nu t}} = \frac{\rho \nu U}{\sqrt{\pi \nu t}}
= \frac{880 \times 6.0 \times 10^{- 5} \times 0.8}{\sqrt{\pi \times 6.0 \times 10^{- 4}}} = \frac{0.04224}{0.04342} = 0.97\ \mathrm{Pa}
$$
**不到一帕**——作用在 $1\ \mathrm{m}$ 宽、$2\ \mathrm{mm}$ 厚钢带的两面上，每米浸没长度只增加约 $1.9\ \mathrm{N}$ 的张力，即每米约 $1\ \mathrm{kPa}$ 的应力，与量级为 $100\ \mathrm{MPa}$ 的流动应力相比可以忽略——这就是钢带张力由驱动辊而不是由淬火阻力决定的原因。
*合理性检查。* 两个穿透深度分别是 $\sqrt{\nu t}$ 和 $\sqrt{\alpha t}$ 而不都是 $\sqrt{\nu t}$，是因为**动量和热量以不同的速率扩散**，而比值 $\sqrt{\mathrm{Pr}}$ 相当于定常流动中流动边界层与热边界层厚度之比。**液态金属 $\mathrm{Pr} \ll 1$，热量穿透得比运动深得多；油 $\mathrm{Pr} \gg 1$，情况相反。**
:::
:::

::: example 旋转流动的稳定性 {#ex-taylor}
两个半径分别为 $0.10$ 和 $0.20\ \mathrm{m}$ 的圆柱之间充有一种类似甘油的流体（$\nu = 1.2 \times 10^{- 3}\ \mathrm{m^2 / s}$）。用**瑞利离心稳定性判据**检验：(a) 内圆柱以 $10\ \mathrm{rad / s}$ 转动、外圆柱静止；(b) 内圆柱 $10$、外圆柱 $5\ \mathrm{rad / s}$；并求情形 (a) 的临界转速。
::: solution
**判据。** 对无黏旋转流动，单位质量的角动量为 $r V_{\theta}$，瑞利 **1917** 年的结果是：流动对轴对称扰动稳定，当且仅当
$$
\frac{d}{d r} \left( r^4 \Omega^2 \right) \ge 0 \quad \text{处处成立}
$$
**库埃特解。** $\Omega = A + B / r^2$，所以 $r^4 \Omega^2 = \left( A r^2 + B \right)^2$，且
$$
\frac{d}{d r} \left( r^4 \Omega^2 \right) = 4 A r \left( A r^2 + B \right)
$$
**情形 (a)。** $\Omega \left( 0.1 \right) = 10$，$\Omega \left( 0.2 \right) = 0$：
$$
A + \frac{B}{0.01} = 10, \qquad A + \frac{B}{0.04} = 0
\quad \Rightarrow \quad B \left( 100 - 25 \right) = 10
\quad \Rightarrow \quad B = 0.1333, \quad A = - 3.333
$$
$$
\left. \frac{d}{d r} \left( r^4 \Omega^2 \right) \right|_{r = 0.15} = 4 \times \left( - 3.333 \right) \times 0.15 \times \left[ - 3.333 \times 0.0225 + 0.1333 \right]
= - 2.0 \times 0.0583 = - 0.117 < 0
$$
**不稳定。** 角动量分布在间隙内部有一个极大值，流动分裂为**泰勒涡**——沿轴向层叠的反向旋转的涡环，轴向波长约等于间隙宽度。
**情形 (b)。** $\Omega \left( 0.1 \right) = 10$，$\Omega \left( 0.2 \right) = 5$：
$$
B \left( 100 - 25 \right) = 10 - 5 = 5 \quad \Rightarrow \quad B = 0.0667, \quad A = 3.333
$$
$$
A r^2 + B = 3.333 r^2 + 0.0667 > 0 \quad \text{对所有 } r, \qquad A > 0
$$
**处处稳定。** 判据得到满足，因为外圆柱单位质量携带的角动量（$\Omega_o r_o^2 = 0.2$）大于内圆柱（$\Omega_i r_i^2 = 0.1$）；在无黏理论中，以这个比例无论转多快都不会失稳——这就是转动**外**圆柱的库埃特黏度计比转动内圆柱的能在高得多的转速下保持层流的原因。
**情形 (a) 的临界转速。** 黏性**提高**了阈值：无黏判据说情形 (a) 在任何转速下都不稳定，但扰动还必须克服黏性阻尼。对外圆柱静止的**窄**间隙，经典结果是一个临界**泰勒数**
$$
T a = \frac{\Omega_i^2 r_i d^3}{\nu^2} \approx 1{,}708
\quad \text{（窄间隙，外圆柱静止）}
$$
取 $r_i = 0.10$、$d = 0.10$、$\nu = 1.2 \times 10^{- 3}$，它会给出
$$
\Omega_{i, c} = \sqrt{\frac{1{,}708 \times \left( 1.2 \times 10^{- 3} \right)^2}{0.10 \times 0.10^3}}
= \sqrt{\frac{2.460 \times 10^{- 3}}{1.0 \times 10^{- 4}}} = \sqrt{24.6} = 5.0\ \mathrm{rad / s}
$$
**但这里的间隙并不窄**（$d / r_i = 1.0$），宽间隙的稳定边界必须数值计算。对半径比 $\eta = r_i / r_o = 0.5$，计算得到的内圆柱临界雷诺数为 $\mathrm{Re}_{i, c} \approx 68$，其中 $\mathrm{Re}_i = \Omega_i r_i d / \nu$：
$$
\Omega_{i, c} = \frac{68 \times 1.2 \times 10^{- 3}}{0.10 \times 0.10} = 8.2\ \mathrm{rad / s}, \qquad
\mathrm{Re}_i \left( 10\ \mathrm{rad / s} \right) = \frac{10 \times 0.10 \times 0.10}{1.2 \times 10^{- 3}} = 83.3 > 68 \quad \Rightarrow \quad \text{不稳定}
$$
**临界转速约为 $8.2\ \mathrm{rad / s}$，所以情形 (a) 的 $10\ \mathrm{rad / s}$ 刚刚越过失稳起点**，会出现泰勒涡；而窄间隙公式若超出其适用范围使用，会把阈值算成 $5\ \mathrm{rad / s}$。**让流变仪的量程成为一个稳定性极限的数字：** 超过 $\mathrm{Re}_{i, c}$ 后，由于二次环流，测得的扭矩会高于层流值，所以转动内圆柱的黏度计必须使其间隙雷诺数低于该几何的临界值。
*合理性检查。* 无黏判据说"不稳定"，而黏性判据说"只在 $8.2\ \mathrm{rad / s}$ 以上不稳定"，是因为黏性**阻尼了**离心不稳定性本会产生的环流。**瑞利的无黏判据是这种不稳定性的必要条件，而不是充分条件**；它之所以仍然要教，是因为它指出了**哪些**流动根本可能失稳——情形 (b) 永远不会（对轴对称扰动而言），情形 (a) 在超过某个阈值后会。
:::
:::

::: example 一点处的应力张量 {#ex-stress}
某流动在国际单位制下（长度以米计）为 $\mathbf{V} = \left( x^2 y,\ - x y^2,\ 0 \right)$，流体 $\mu = 0.05\ \mathrm{Pa\, s}$，当地压强为 $200\ \mathrm{kPa}$。求 $\left( 1, 2, 0 \right)$ 处的应力张量、主应力和最大剪应力。
::: solution
**先做校核。**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 2 x y - 2 x y = 0 \quad \checkmark\ \text{不可压缩}
$$
**变形速率张量。**
$$
S_{xx} = \frac{\partial u}{\partial x} = 2 x y = 4, \qquad
S_{yy} = \frac{\partial v}{\partial y} = - 2 x y = - 4, \qquad
S_{zz} = 0
$$
$$
S_{xy} = \tfrac{1}{2} \left( \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x} \right)
= \tfrac{1}{2} \left( x^2 - y^2 \right) = \tfrac{1}{2} \left( 1 - 4 \right) = - 1.5
$$
**应力张量**（$\nabla \cdot \mathbf{V} = 0$，所以 $\lambda$ 不出现）：
$$
\boldsymbol{\tau} = - p \mathbf{I} + 2 \mu \mathbf{S}
= \begin{pmatrix} - 200{,}000 + 0.1 \times 4 & 0.1 \times \left( - 1.5 \right) & 0 \\ 0.1 \times \left( - 1.5 \right) & - 200{,}000 - 0.4 & 0 \\ 0 & 0 & - 200{,}000 \end{pmatrix}
= \begin{pmatrix} - 199{,}999.6 & - 0.15 & 0 \\ - 0.15 & - 200{,}000.4 & 0 \\ 0 & 0 & - 200{,}000 \end{pmatrix}
$$
**主应力。** $z$ 方向本身已是主方向，$\sigma_3 = - 200{,}000\ \mathrm{Pa}$。在 $x$–$y$ 平面内：
$$
\sigma_{1,2} = \frac{\tau_{xx} + \tau_{yy}}{2} \pm \sqrt{\left( \frac{\tau_{xx} - \tau_{yy}}{2} \right)^2 + \tau_{xy}^2}
= - 200{,}000 \pm \sqrt{0.16 + 0.0225} = - 200{,}000 \pm 0.427
$$
$$
\sigma_1 = - 199{,}999.57, \qquad \sigma_2 = - 200{,}000.43, \qquad \sigma_3 = - 200{,}000.00\ \mathrm{Pa}
$$
**最大剪应力。**
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_2}{2} = 0.427\ \mathrm{Pa}
$$
**解读。** **压强是 $200\ \mathrm{kPa}$，而黏性应力是 $0.4\ \mathrm{Pa}$**——比值为 $5 \times 10^5$。**主应力在五位有效数字内全都等于 $- p$，全部黏性效应都在小数点后第一位。** 这就是齐平的壁面测压孔读出当地压强时基本没有黏性误差的原因，也是边缘带**毛刺**的测压孔会有误差的原因：这个误差不是黏性造成的，而是几何形状扭曲了压强场。
**牛顿流体中的法向应力。** 这里 $\tau_{xx} - \tau_{yy} = 2 \mu \left( S_{xx} - S_{yy} \right) = 0.8\ \mathrm{Pa}$ 不为零，是因为该流动在局部是**拉伸型**的：流体沿一个方向被拉长、沿另一个方向被压缩。相反，在**简单剪切**流动中，牛顿流体的 $S_{xx} = S_{yy} = 0$，因而法向应力差 $N_1 = \tau_{xx} - \tau_{yy}$ 为零——这就是为什么在流变仪的剪切流动中测到可观的 $N_1$ 是非牛顿（黏弹性）流体的标志。**同一个符号在两种场合含义不同，唯一的防范是写明它是在什么流动中测得的。**
:::
:::

::: history
**牛顿（Newton）** 在《原理》（**1687**，第二卷第九节）中提出，由流体"缺乏润滑性"引起的阻力正比于其各部分彼此分离的速度——这就是线性的应力-变形速率思想，用文字表述。**欧拉（Euler）** 在 **1755** 年写出了无黏运动方程（1757 年发表）。**纳维（Navier）** 在 **1822** 年宣读的一篇论文中，从分子力模型出发加入了黏性项；此后二十年间，**柯西（Cauchy）**、**泊松（Poisson）** 和 **圣维南（Saint-Venant）** 各自以不同途径得到了等价的形式；**斯托克斯（Stokes）** 在 **1845** 年仅从连续介质假设出发推导了这组方程，并采用了平均法向应力等于压强的假设——即以他命名的 $\mu_v = 0$ 假设，它对多原子气体并不成立。**精确解随之而来**：**哈根（Hagen）** 于 **1839** 年发表了他的管流测量结果；对血液流动感兴趣的医生 **泊肃叶（Poiseuille）** 于 **1840–41** 年发表了他的毛细管实验；**斯托克斯** 在他 **1851** 年关于流体内摩擦与摆的运动的论文中，得到了缓慢运动圆球所受的阻力以及振荡平面附近的流动；**希门茨（Hiemenz）** 在 **1911** 年于哥廷根、在 **普朗特（Prandtl）** 指导下完成的博士论文中找到了驻点流解。**库埃特（Couette）** 于 **1890** 年制成了他的旋转圆筒黏度计，**瑞利（Rayleigh）** 于 **1917** 年给出了无黏离心稳定性判据，而 **G. I. 泰勒（Taylor）** **1923** 年的论文把理论与实验结合起来，预测并观察到了以他命名的涡。**三维方程解的存在性与光滑性问题，是克雷数学研究所（Clay Mathematics Institute）2000 年公布的七个千禧年大奖难题之一，奖金一百万美元，至今仍未解决。**
:::

::: quiz
一块固定的下板与一块以 $U$ 运动的上板之间的库埃特流，受到一个**逆**压梯度 $\mathrm{d}p / \mathrm{d}x > 0$ 的阻挡；逐渐增大压强梯度，直到*下*板上的壁面剪应力恰好为零。此时：

- [ ] 通道中某处的流动发生倒流
- [x] 下壁处的速度梯度为零；再强一点的逆压梯度就会使该处的 $\partial u / \partial y$ 变为负值，这就是分离的开始
- [ ] 壁面处的黏度为零
- [ ] 剖面关于中心线对称

::: solution
**剖面以零斜率与下壁相接。** $\tau_w = \mu ( \partial u / \partial y )_{y = 0 } = 0$ 意味着运动平板本会施加的剪切恰好被逆压梯度对斜率的贡献所抵消，所以紧贴壁面的流体既不被向前拖动，也不被向后拉住；此时流动在任何地方都尚未倒流。再把压强梯度加大一点，壁面处的 $\partial u / \partial y$ 就变为负值：贴壁的流体向后流动，流线离开表面，**这就是普朗特的分离判据：逆压梯度下的壁面剪应力为零。** 扩压器、压气机静叶、机翼失速以及船尾的形状，全都是对这一个条件的工程管理——这就是锥形扩压器的全扩张角通常只限于约 $7$–$10^{\circ}$ 的原因。
:::
:::

## 由此通向何处

这些方程的无量纲化见 [[fluid-mechanics/dimensional-analysis]]；只在薄壁面层中保留 $\mathrm{Re}^{-1}$ 项的简化见 [[fluid-mechanics/boundary-layers-drag]]；略去惯性项的简化就是 [[machine-design]] 中轴承和 [[manufacturing]] 中金属成形背后的润滑理论；同样四个方程的离散化见 [[computational-fluid-dynamics]]；而加上组分方程和反应速率源项的方程，就是 [[propulsion]] 的燃烧室和 [[aerodynamics]] 的高温气体。

::: summary
- 本构律——应力正比于变形速率——就是"牛顿流体"的全部内容，而 $\mu_v = 0$ 是斯托克斯的假设，不是事实。
- 四个方程、四个未知量、每个速度分量两个边界条件：无黏极限是另一个问题，而不是一种近似。
- 在曲线坐标下，黏性项是**矢量**拉普拉斯算子，而不是各分量的标量拉普拉斯算子。
- 涡量被输运、拉伸和扩散，只在壁面上或通过 $\nabla \rho \times \nabla p$ 产生。
- 单向流动类化为一维扩散方程，包括库埃特流、泊肃叶流、液膜流和振荡平板。
- $Q \propto D^4$ 是工程流体力学中最强的标度律。
- 蠕流是线性的，具有 $1/r$ 远场，在二维中失效，并给出 $F = 3\pi\mu U D$。
- 在许多流动中，黏性法向应力只是压强的极小一部分（在应力算例中约为 $2 \times 10^{-6}$），这就是壁面测压孔可用、而黏度测量需要精密仪器的原因。
:::

## 习题

::: exercise 库埃特应力 {level=1 check="150"}
两平板相距 $2\ \mathrm{mm}$，上板以 $3\ \mathrm{m/s}$ 运动，流体 $\mu = 0.1\ \mathrm{Pa \cdot s}$。求壁面剪应力，以帕为单位。
::: solution
$\tau_w = \mu U / h = 0.1 \times 3 / 0.002 = 150\ \mathrm{Pa}$。
:::
:::

::: exercise 管流 {level=1 check="1.065"}
$\mu = 0.3\ \mathrm{Pa \cdot s}$ 的油在 $\Delta p = 1\ \mathrm{MPa}$ 下流过 $30\ \mathrm{m}$ 长、内径 $25\ \mathrm{mm}$ 的管道。求流量，以升每秒为单位。
::: solution
$Q = \pi D^4 \Delta p / (128 \mu L) = 1.065 \times 10^{-3}\ \mathrm{m^3 / s} = 1.065\ \mathrm{L / s}$。
:::
:::

::: exercise 斯托克斯阻力 {level=1 check="9.42"}
直径 $1\ \mathrm{mm}$ 的圆球在 $\mu = 0.1\ \mathrm{Pa \cdot s}$ 的油中以 $10\ \mathrm{mm/s}$ 运动。求阻力，以微牛为单位。
::: solution
$F = 3 \pi \mu U D = 3 \pi \times 0.1 \times 0.01 \times 0.001 = 9.42 \times 10^{-6}\ \mathrm{N} = 9.42\ \mu\mathrm{N}$。
:::
:::

::: exercise 斯托克斯层 {level=1 check="1.43"}
平板在 $\nu = 6.4 \times 10^{-6}\ \mathrm{m^2/s}$ 的流体中以 $1\ \mathrm{Hz}$ 振荡。求穿透深度，以毫米为单位。
::: solution
$\delta = \sqrt{2 \nu / \omega} = \sqrt{2 \times 6.4 \times 10^{-6} / 6.283} = \sqrt{2.037 \times 10^{-6}} = 1.427\ \mathrm{mm}$。
:::
:::

::: exercise 雷诺数 {level=1 check="161"}
内径 $25\ \mathrm{mm}$ 的油管流动，平均流速 $2.17\ \mathrm{m/s}$，$\rho = 890\ \mathrm{kg/m^3}$，$\mu = 0.3\ \mathrm{Pa \cdot s}$。求雷诺数。
::: solution
$\mathrm{Re} = 890 \times 2.17 \times 0.025 / 0.3 = 161$。
:::
:::

::: exercise 环形管道 {level=1 check="0.736"}
对内外半径比 $\kappa = 0.5$ 的环形管道中的层流，求速度最大处的半径，以外半径 $R$ 的分数表示。
::: solution
剪应力在 $r = \lambda R$ 处为零，其中 $\lambda^2 = (1 - \kappa^2) / (2 \ln (1/\kappa)) = 0.75 / (2 \times 0.6931) = 0.541$，所以 $r / R = \lambda = 0.736$——略在间隙中点（$0.75$）以内，偏向内壁。
:::
:::

::: exercise 液膜 {level=1 check="0.168"}
$100\ {}^{\circ}\mathrm{C}$ 的水沿竖直壁面形成降膜，$\Gamma = 0.05\ \mathrm{kg / m\, s}$（$\mu = 2.82 \times 10^{-4}\ \mathrm{Pa \cdot s}$，$\rho = 958\ \mathrm{kg/m^3}$）。求液膜厚度，以毫米为单位。
::: solution
$h = \left( 3 \mu \Gamma / \left( \rho^2 g \right) \right)^{1/3} = \left( 4.23 \times 10^{-5} / 9.003 \times 10^{6} \right)^{1/3} = \left( 4.70 \times 10^{-12} \right)^{1/3} = 1.68 \times 10^{-4}\ \mathrm{m} = 0.168\ \mathrm{mm}$。
:::
:::

::: exercise 涡量 {level=2 check="-5"}
对速度场 $\mathbf{V} = (x^2 y, -x y^2, 0)$，求 $(1, 2, 0)$ 处涡量的 $z$ 分量，并判断该流动是否有旋。（涡量以 $\mathrm{s^{-1}}$ 为单位输入。）
::: solution
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - y^2 - x^2 = - 4 - 1 = - 5\ \mathrm{s^{- 1}}
$$
**有旋**：$\zeta_z = -(x^2 + y^2)$ 除原点外处处不为零。**解读。** 一个流动可以严格满足连续方程而仍然有旋；这是两个相互独立的性质。这个场是一个合法的不可压缩流动，其涡量场必须按方程被输运和扩散。
:::
:::

::: exercise 奥森修正 {level=2}
一颗 $0.6\ \mathrm{mm}$、密度 $2{,}650\ \mathrm{kg/m^3}$ 的砂粒在 $20\ {}^{\circ}\mathrm{C}$ 的水中沉降。求斯托克斯沉降速度与雷诺数，并判断斯托克斯定律是否适用。
::: solution
$$
u_r = \frac{\left( \rho_s - \rho \right) g D^2}{18 \mu} = \frac{\left( 2{,}650 - 998 \right) \times 9.81 \times \left( 6 \times 10^{- 4} \right)^2}{18 \times 1.002 \times 10^{- 3}}
= \frac{5.83 \times 10^{- 3}}{1.804 \times 10^{- 2}} = 0.323\ \mathrm{m / s}
$$
$$
\mathrm{Re} = \frac{998 \times 0.323 \times 6 \times 10^{- 4}}{1.002 \times 10^{- 3}} = 193
$$
**斯托克斯定律不适用**——要使误差只有百分之几，需要 $\mathrm{Re} \lesssim 0.1$（奥森因子为 $1 + 3 \mathrm{Re} / 8$），而这里 $\mathrm{Re}$ 约为两百。用适用于过渡区的阻力律迭代，例如 **席勒-瑙曼（Schiller–Naumann）** 公式 $C_D = \left( 24 / \mathrm{Re} \right) \left( 1 + 0.15\, \mathrm{Re}^{0.687} \right)$，配合 $u_r = \sqrt{4 \left( \rho_s - \rho \right) g D / \left( 3 C_D \rho \right)}$，收敛到 $u_r \approx 0.095\ \mathrm{m / s}$，$\mathrm{Re} \approx 57$（$C_D \approx 1.44$）：**斯托克斯定律把沉降速度高估了约 $3.4$ 倍。**
:::
:::

::: exercise 推导 {level=3}
对具有保守体积力的不可压缩常黏度流体推导涡量方程，并证明在二维流动中涡拉伸项为零。
::: solution
**从动量方程出发**，两边除以 $\rho$：
$$
\frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = - \frac{1}{\rho} \nabla p + \nu \nabla^2 \mathbf{V} + \mathbf{g}, \qquad \mathbf{g} = - \nabla \chi
$$
**利用恒等式** $\left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = \nabla \left( V^2 / 2 \right) - \mathbf{V} \times \boldsymbol{\omega}$：
$$
\frac{\partial \mathbf{V}}{\partial t} + \nabla \left( \frac{V^2}{2} \right) - \mathbf{V} \times \boldsymbol{\omega} = - \nabla \left( \frac{p}{\rho} + \chi \right) + \nu \nabla^2 \mathbf{V}
$$
**取旋度。** 任何梯度的旋度都为零，且 $\nabla \times \mathbf{V} = \boldsymbol{\omega}$：
$$
\frac{\partial \boldsymbol{\omega}}{\partial t} - \nabla \times \left( \mathbf{V} \times \boldsymbol{\omega} \right) = \nu \nabla^2 \boldsymbol{\omega}
$$
**展开双重叉积的旋度项**，利用 $\nabla \times \left( \mathbf{A} \times \mathbf{B} \right) = \left( \mathbf{B} \cdot \nabla \right) \mathbf{A} - \left( \mathbf{A} \cdot \nabla \right) \mathbf{B} + \mathbf{A} \left( \nabla \cdot \mathbf{B} \right) - \mathbf{B} \left( \nabla \cdot \mathbf{A} \right)$，取 $\mathbf{A} = \mathbf{V}$、$\mathbf{B} = \boldsymbol{\omega}$，并利用 $\nabla \cdot \boldsymbol{\omega} = \nabla \cdot \left( \nabla \times \mathbf{V} \right) \equiv 0$ 和 $\nabla \cdot \mathbf{V} = 0$：
$$
\nabla \times \left( \mathbf{V} \times \boldsymbol{\omega} \right) = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} - \left( \mathbf{V} \cdot \nabla \right) \boldsymbol{\omega}
$$
$$
\boxed{ \frac{\partial \boldsymbol{\omega}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \boldsymbol{\omega} = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} + \nu \nabla^2 \boldsymbol{\omega} }
$$
**二维情形。** 取 $\mathbf{V} = \left( u \left( x, y, t \right), v \left( x, y, t \right), 0 \right)$，涡量只有 $z$ 分量，$\boldsymbol{\omega} = \left( 0, 0, \zeta \right)$，且
$$
\left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} = \zeta \frac{\partial}{\partial z} \left( u, v, 0 \right) = \mathbf{0}
$$
因为没有任何量随 $z$ 变化。**拉伸项恒为零**，$\zeta$ 的方程变为纯粹的**标量输运-扩散**方程：
$$
\frac{\partial \zeta}{\partial t} + u \frac{\partial \zeta}{\partial x} + v \frac{\partial \zeta}{\partial y} = \nu \nabla^2 \zeta
$$
**其后果是二维与三维湍流之间最深刻的结构差别。** 在二维中，$\int \zeta^2 dA$——**拟涡能（enstrophy）**——只能减少，而在三维中拉伸项可以无限制地产生它。**因此二维湍流同时具有向小尺度的拟涡能正向级串和向大尺度的能量逆级串，而三维湍流则通过涡拉伸把能量正向级串到小尺度**；地球的天气组织成少数几个巨大涡旋、而实验室格栅后的湍流却不会，原因之一是大气层很薄、层结很强且在旋转，所以在大尺度上表现得近乎二维。
*合理性检查。* $\nabla \cdot \boldsymbol{\omega} \equiv 0$ 之所以重要，是因为它表明**涡线不能中断**，这与磁静力学中使 $\nabla \cdot \mathbf{B} = 0$ 的是同一个恒等式。**涡量方程与导电流体中磁场的感应方程形式相同**，这就是为什么 **阿尔文（Alfvén）** 的磁通冻结定理是 **亥姆霍兹（Helmholtz）** 和 **开尔文（Kelvin）** 关于涡线随无黏流体运动的定理在磁学中的类比。
:::
:::

::: exercise 设计 {level=3}
为测量一种钻井泥浆（黏度 $1$ 至 $200\ \mathrm{Pa \cdot s}$，剪切速率 $0.1$ 至 $1{,}000\ \mathrm{s^{-1}}$）的**测黏型**（库埃特）流变仪给出完整的流体力学设计，并说明验收试验。
::: solution
**几何。** 选用同轴圆筒（库埃特）几何而不用锥板，是因为泥浆中的固体颗粒会卡在锥板顶点附近仅几十微米的间隙中，而杯-转子之间数毫米的间隙有许多个颗粒直径宽；同时测量杯能容纳大而有代表性的样品，并且比开放的平板更能防止蒸发和沉降。
$$
\begin{array}{l c l}
\text{测量杯外半径} & R_o = 22.5\ \mathrm{mm} & \\
\text{转子内半径} & R_i = 18.5\ \mathrm{mm} & \\
\text{间隙} & d = 4.0\ \mathrm{mm}, \quad \eta = R_i / R_o = 0.822 \\
\text{间隙比} & d / R_i = 0.216 & \text{宽间隙：需做曲率修正} \\
\text{转子浸没长度} & L = 60\ \mathrm{mm} & \\
\text{受剪体积} & 2 \pi R_i L d = 27.9\ \mathrm{cm^3} & \\
\text{转子转动惯量} & \approx 3 \times 10^{- 6}\ \mathrm{kg\, m^2} & \text{薄壁铝制转子}
\end{array}
$$
**剪切速率范围。** 用窄间隙估计 $\dot{\gamma} \approx \Omega_i R_i / d$：
$$
\Omega_{i, \max} = \frac{1{,}000 \times 0.004}{0.0185} = 216\ \mathrm{rad / s} = 2{,}065\ \mathrm{rpm}, \qquad
\Omega_{i, \min} = 0.0216\ \mathrm{rad / s} = 0.21\ \mathrm{rpm}
$$
**转速的动态范围为 $10^4$**，这就是流变仪的电机和编码器按其**低速**线性度而不是最高转速来标定的原因。在 $\eta = 0.822$ 时间隙并不窄：对牛顿流体，转子表面的精确剪切速率为 $2 \Omega_i R_o^2 / \left( R_o^2 - R_i^2 \right) = 6.17\, \Omega_i$，比 $\Omega_i R_i / d = 4.63\, \Omega_i$ 高出三分之一，所以软件必须做曲率修正（对非牛顿泥浆，还要对流动曲线的形状再做修正）。
**扭矩范围。** 在 $\dot{\gamma} = 1{,}000\ \mathrm{s^{-1}}$、$\mu = 1\ \mathrm{Pa\, s}$ 时：
$$
\tau_w = 1{,}000\ \mathrm{Pa}, \qquad
T = \tau_w \times 2 \pi R_i L \times R_i = 1{,}000 \times 6.974 \times 10^{- 3} \times 0.0185 = 0.129\ \mathrm{N\, m}
$$
在 $\dot{\gamma} = 0.1\ \mathrm{s^{-1}}$、$\mu = 200\ \mathrm{Pa\, s}$ 时：
$$
\tau_w = 20\ \mathrm{Pa}, \qquad T = 2.58 \times 10^{- 3}\ \mathrm{N\, m}
$$
在最高黏度与最高剪切速率下（$200\ \mathrm{Pa\, s}$、$1{,}000\ \mathrm{s^{-1}}$），应力将达 $200\ \mathrm{kPa}$，扭矩 $25.8\ \mathrm{N\, m}$——远超实验室流变仪的能力，所以量程的这个角必须舍弃，或改用较小的转子测量。**决定仪器下限的数字。** **最小**扭矩出现在 $\mu = 1\ \mathrm{Pa\, s}$、$\dot{\gamma} = 0.1\ \mathrm{s^{-1}}$：$\tau_w = 0.1\ \mathrm{Pa}$，$T = 0.1 \times 6.974 \times 10^{- 3} \times 0.0185 = 1.3 \times 10^{- 5}\ \mathrm{N\, m} = 13\ \mu\mathrm{N\, m}$，所以要在该处达到 $1\ \%$ 的精度，扭矩分辨率需达 $0.1\ \mu\mathrm{N\, m}$ 或更好；而泥浆的**屈服应力**是把流动曲线向下外推得到的，对低端的任何扭矩偏差都很敏感。
**稳定性校核。** 在最高转速、量程内**最低**黏度 $\mu = 1\ \mathrm{Pa\, s}$、$\rho = 1{,}050$ 时：
$$
\mathrm{Re}_i = \frac{\rho \Omega_i R_i d}{\mu} = \frac{1{,}050 \times 216 \times 0.0185 \times 0.004}{1} = 16.8
$$
**而由窄间隙泰勒数估计的临界值约为** $\mathrm{Re}_{i, c} \approx \sqrt{1{,}708 / \left( d / R_i \right)} = \sqrt{1{,}708 / 0.216} \approx 90$——稳定。**但对 $0.01\ \mathrm{Pa\, s}$ 的稀水基样品**，同样转速下 $\mathrm{Re}_i = 1{,}680$，远超极限；流变仪软件之所以应当**拒绝**在超过计算出的 $\mathrm{Re}_i$ 时运行，是因为由此引起的扭矩上升是平滑的，看起来就像剪切增稠。
**二次流与端部效应。**
$$
\begin{array}{l l}
\text{二次（泰勒）涡} & \text{当 } \mathrm{Re}_i > \mathrm{Re}_{i, c} \text{ 时扭矩高于层流值} \\
\text{端部效应（转子有限长）} & \text{用三种长度做 } 1 / L \text{ 外推修正} \\
\text{自由表面弯月面} & \text{恒定扭矩偏差，用空白运行扣除} \\
\text{杯底引起的二次环流} & \text{用保护环消除} \\
\text{屈服应力流体的壁面滑移} & \text{主要误差；用叶片几何解决}
\end{array}
$$
**为什么用叶片转子。** 对具有显著屈服应力的泥浆，**壁面滑移会使光滑转子不可靠**——转子表面形成一层滑移层，测得的扭矩反映的是这层滑移层，而不是本体。**叶片-杯**几何（四到六片薄叶片）测量的是本体，因为材料在叶片尖端扫过的圆柱面（半径 $R_v$）上发生**内部**破坏；假设该圆柱的侧面和两个端面上应力均为 $\tau_y$，
$$
T_y = 2 \pi R_v^2 L \tau_y + 2 \times \tfrac{2}{3} \pi R_v^3 \tau_y = 2 \pi R_v^2 L \tau_y \left( 1 + \frac{2 R_v}{3 L} \right)
$$
**验收试验。**
$$
\begin{array}{l l}
\text{校准} & \text{用约 } 1 \text{ 和 } 100\ \mathrm{Pa\, s} \text{ 的认证牛顿标准液，全量程 } \pm 1\ \% \\
\text{惯性修正} & \text{用阶跃试验验证；} 100\ \mathrm{s^{-1}} \text{ 时 } < 0.5\ \% \\
\text{间隙敏感性} & \text{三种间隙，扭矩一致到 } \pm 1\ \% \\
\text{重复性} & \pm 2\ \% \text{（剪切后静置的泥浆，六次重复）} \\
\text{触变性} & \text{规定静置时间，并采用斜坡而非阶跃的剪切程序}
\end{array}
$$
**保护买方的四条条款。** **"仪器应在预定测量的扭矩和转速下、用经认证的牛顿标准液进行校准，而不是在某一个方便的点上校准。"** **"测量过程中应显示间隙雷诺数，并在其超过该几何的临界值时对数据加以标记。"** **"对任何表现出壁面滑移的流体，应使用叶片几何测量屈服应力。"** **"每个数据点都应报告间隙、浸没长度、温度和预剪切历史。"**
*设计评注。* 一般规律是：**流变仪并不测量黏度；它测量的是扭矩和转速，再通过几何修正推算出黏度，而误差就在修正之中**——这就是两个实验室测量同一种泥浆、两台仪器都在校准有效期内，结果却可能相差很大的原因。
:::
:::
