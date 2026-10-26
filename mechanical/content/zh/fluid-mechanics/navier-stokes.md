纳维-斯托克斯方程就是把牛顿第二定律应用于一个流体微元，只是假设其表面力正比于**变形速率**而非位移。就这一条本构假设——牛顿在 **1704** 年提出，**斯托克斯（Stokes）** 在 **1845** 年给出了它的张量形式——既是全部困难所在，也是全部学问所在，因为它把一个运动学陈述变成了一个微分方程：这个方程没人证明在三维可解，而大自然却到处都在解它，解得又糟又湍。

这些方程值得作为研究对象本身来学，而不是当作 [[fluid-mechanics/control-volume-analysis|控制体]] 与 [[computational-fluid-dynamics]] 之间的一个形式步骤，理由有三：**你将用到的每一个精确解都是它们的解**；当你动用伯努利方程、边界层理论或蠕流理论时，它们**确切地告诉你你略去了哪些项**；而从它们掉出来的涡量方程，是本学科最有用的定性工具。

::: warning 纳维-斯托克斯建模中直到代码发散都看不见的七个错误
**在曲线坐标下把黏性项写成"分量的拉普拉斯"。** 在笛卡尔坐标下 $\left( \nabla^2 \mathbf{V} \right)_x = \nabla^2 u$，但在柱坐标下
$$
\left( \nabla^2 \mathbf{V} \right)_r = \nabla^2 v_r - \frac{v_r}{r^2} - \frac{2}{r^2} \frac{\partial v_{\theta}}{\partial \theta}
$$
**那两个附加项不是可有可无的。** 推导管流时把轴向黏性项写成 $\mu \nabla^2 v_z$ 还能蒙混过关，因为 $v_z$ 是沿对称轴方向的分量；同样的捷径用在涡的 $v_{\theta}$ 上就会丢掉 $v_\theta / r^2$ 项，把结果错成 $v_\theta \propto r$，而正确的组合是 $A r + B / r$。**每一个看起来很短的泰勒-库埃特流教科书推导都犯了这个错。** **对可压缩流体假设黏性项就是 $\mu \nabla^2 \mathbf{V}$。** 对牛顿流体它是
$$
\nabla \cdot \boldsymbol{\tau} = \mu \nabla^2 \mathbf{V} + \left( \mu + \tfrac{1}{3} \mu_v \right) \nabla \left( \nabla \cdot \mathbf{V} \right)
$$
而第二项**只对常黏度不可压缩流体为零**。在壁面强冷却的边界层里、在激波里、在声波里，这一项都很重要，而且**体积黏度** $\mu_v$ 不为零——$20\ {}^{\circ}\mathrm{C}$ 的空气它是 $1.08 \times 10^{- 5}\ \mathrm{Pa\, s}$，约为 **$0.6\ \mu$**；二氧化碳则是 $100\ \mu$。**斯托克斯关于 $\mu_v = 0$ 的假设是一种便利，不是定律。** **在气液界面施加无滑移条件。** 界面上正确的条件是**切向速度与切向应力连续**，而干净的水-空气界面上切向应力很小，所以水面接近**无剪切**而非无滑移。**干净的水面表现得像自由表面，被表面活性剂污染的水面则表现得像固壁**，两者的差别使明渠速度剖面从 $u \propto \left( 1 - y / h \right)^{1 / 7}$ 变成 $u \propto \left( 1 - y / h \right)^{1 / 6}$，摩擦系数相差 $20\ \%$。**这就是"干净"的实验水槽结果在天然河道里复现不出来的原因。** **忘记方程是写在特定参考系里的。** 在旋转参考系中必须加上科里奥利项和离心项，而科里奥利项 $2 \rho \boldsymbol{\Omega} \times \mathbf{V}$ **不是**梯度，不能被吸收进压强里。天气预报程序略去它，算出的风向与观测差 $180^{\circ}$；叶轮机械程序在**旋转**参考系中略去它，则算出的功为零。 **因为边界条件是定常的就丢掉非定常项、把流动当作定常。** 来流定常的圆柱绕流在 $\mathrm{Re} = 200$ 时有**周期性**尾流；集管内的流动进口定常却有不稳定的全局模态；阀门以 $1\ \mathrm{Hz}$ 抖动的热水管里有一个厚度 $\sqrt{2 / \omega} = 2.8\ \mathrm{mm}$ 的斯托克斯层，与管径相当。**定常边界条件不意味着定常解**，判断要看特征值问题，不是看边界条件。**对本不是牛顿流体的流体使用牛顿本构律。** 血液、聚合物溶液、黏土、涂料、泥浆、水泥浆、钻井液、打发奶油和熔融塑料都不是牛顿流体。**$1\ \%$ 的聚合物添加剂能把管道湍流摩擦降低 $70\ \%$**，而纳维-斯托克斯程序算不出来，因为黏度是变形历史的泛函，不是一个数。**警告不是说非牛顿流动多么稀奇，而是说方程名字里的"流体"是一个声明，而且它经常不成立。** **因为算收敛了就直接相信解。** 二维不可压缩纳维-斯托克斯方程在 $\mathrm{Re} = 10^{7}$ 下绕钝体的解，是一个**不稳定**问题的**定常**解，而且收敛得非常漂亮。方程没错；答案不是一种流动。**每一个 CFD 结果都必须对照流动本身的稳定性来检查，而不能只看残差。**
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
**让体积黏度值得一记的数字。** 气体的**声衰减**含有因子 $\tfrac{4}{3} \mu + \mu_v$，而常压 $20\ {}^{\circ}\mathrm{C}$ 的 $\mathrm{CO_2}$ 实测衰减是取 $\mu_v = 0$ 的经典斯托克斯-基尔霍夫值的**六十倍**。**差值就是体积黏度，它是一种分子弛豫效应**：三原子线性分子的振动模跟不上压缩，滞后中产生的熵就是那部分额外衰减。单原子气体的 $\mu_v$ 严格为零，因为它们没有内部模态。
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
**而这是一切分层或受热流体中环量的来源**——海陆风、热成风、燃烧室里的涡量，以及蜡烛火焰烟柱会旋转的原因。**一个正压、无黏、初始无旋的流动永远无旋；流体力学里其余的一切都是对这三个词之一的违背。**
**开尔文环量定理。** 对无黏、正压、质量力有势的流体，
$$
\frac{D \Gamma}{D t} = 0
$$
**其推论是一个拓扑陈述：一条物质线回路永远带着它的环量**——这就是机翼的起动涡被 shed 下来而不是湮灭的原因，是龙卷风核心能维持数小时的原因，也是空中交通管制中尾流间隔规定用**时间**而不是用距离来写的原因。
**涡量的扩散。** 对流可忽略时方程化为 $\partial \boldsymbol{\omega} / \partial t = \nu \nabla^2 \boldsymbol{\omega}$——**就是热传导方程**，$\nu$ 是旋转的"热扩散率"。**经过时间 $t$ 的穿透深度为 $\delta \sim \sqrt{\nu t}$**，而机翼翼尖脱落的涡能飞一公里而不散，是因为十分钟飞行时间里 $\sqrt{\nu t} = \sqrt{1.5 \times 10^{- 5} \times 10} = 12\ \mathrm{mm}$——**涡核只比诞生时宽了一厘米**；它之所以在几分钟尺度上仍会衰减，靠的是它在自己内部感生的二次流，而不是扩散。
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
caption: 斯托克斯第二问题——一块平板在自身平面内以频率 $\omega$ 在其上流体中做正弦振荡，流体其余部分静止。扰动穿透到深度 $\delta = \sqrt{2 \nu / \omega}$，按 $e^{- y / \delta}$ 衰减，同时**相位滞后 $y / \delta$ 弧度**，所以 $y = \delta$ 处的流体比平板落后半个周期，$y = 2 \delta$ 处的流体落后整整一个周期、正朝**反方向**运动——这就是那个负瓣。**不存在定常状态**：一两个周期之后每一深度处的流动都是周期的，时均整流流对振幅是二阶小量。曲线是精确解 $u / U = e^{- \eta} \cos \left( \omega t - \eta \right)$，$\eta = y / \delta$，取 $\omega t = \pi / 2$。**让这成为设计问题而非习题的数字：** 心跳 $1.2\ \mathrm{Hz}$、血液 $\nu = 3.3 \times 10^{- 6}\ \mathrm{m^2 / s}$ 时，$\delta = 0.94\ \mathrm{mm}$，而主动脉半径为 $10\ \mathrm{mm}$，于是**沃姆斯利数** $\alpha = R \sqrt{\omega / \nu} = 12$，速度剖面是**边界层型的平坦剖面**而非抛物线——这就是脉动血流血液透析泵不能按泊肃叶定律定尺寸的原因。
:::
