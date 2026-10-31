空气和水的黏性都很小。以高速公路速度行驶的汽车，绕它的流动中黏性应力比运动造成的压强差小约一万倍。人们禁不住想把黏性完全丢掉，去研究**理想流体**——应力就是纯压强的流体。这一由欧拉（Euler）在 1750 年代建成的理论是数学物理的伟大成就之一。它解释了皮托管为什么能测出空速、旋转的球为什么会拐弯、机翼为什么有升力以及有多大、涡旋收缩时为什么转得更快，以及烟环为什么经久不散。

它也预言——达朗贝尔（d'Alembert）1752 年沮丧地发现——在理想流体中匀速运动的物体不受任何阻力。潜水艇一旦动起来就不再需要发动机了。这个佯谬不是代数中的错误，而是一个正确的定理，只不过这个模型在物面附近漏掉了本质的东西。看清楚理想理论究竟对在哪里、又究竟错在哪里，正是本章的主旨。补救之道——普朗特（Prandtl）的边界层——属于 [[continuum/viscous-flow]]。

我们使用 [[continuum/fluid-kinematics]] 的运动学——物质导数、连续性方程、涡量 $\boldsymbol\omega = \nabla\times\mathbf v$、环量 $\Gamma$——以及 [[continuum/stress-strain]] 的柯西（Cauchy）运动方程 $\rho\,D\mathbf v/Dt = \nabla\cdot\boldsymbol\sigma + \mathbf f$。势流一节要用到的复变函数在 [[math-methods/complex-methods]] 中复习。

## 欧拉方程 {#euler}

::: definition 理想流体 {#def-ideal}
若流体在每一点——即使运动时也一样——应力张量都是各向同性的，即 $\sigma_{ij} = -p\,\delta_{ij}$，则称它是**理想**的（无黏的）。标量 $p(\mathbf x, t)$ 是**压强**。在以速度 $\mathbf U$ 运动的固体边界上，流体不能穿过壁面，$\mathbf v\cdot\mathbf n = \mathbf U\cdot\mathbf n$，但可以沿壁面滑过。
:::

这个边界条件比真实流体的弱，真实流体是黏在壁面上的。少掉这一个条件，正是达朗贝尔佯谬的数学根源。

::: theorem 欧拉方程 {#thm-euler}
单位体积体力为 $\rho\mathbf g$ 的理想流体中，

$$
\rho\Bigl(\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v\Bigr) = -\nabla p + \rho\mathbf g .
$$ {#eq-euler}

它与连续性方程 $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$ 以及 $p$ 与 $\rho$ 之间的一个关系——比如 $\rho = \text{常数}$——一起决定流动。
:::

::: proof
由 $\sigma_{ij} = -p\,\delta_{ij}$ 得 $\partial_j\sigma_{ij} = -\partial_ip$。代入柯西运动方程，并把加速度写成 [[continuum/fluid-kinematics]] 中的物质导数。
:::

每一项都是单位体积的力。压强梯度把流体从高压推向低压，重力把它往下拉，二者的合力就是使它加速的原因。取 $\mathbf v = 0$，[[#eq-euler]] 就是 [[mechanics/fluids]] 的静力学规律 $\nabla p = \rho\mathbf g$。对不可压缩流体，未知量有四个（$p$ 和三个速度分量），方程也有四个（[[#eq-euler]] 的三个分量加上 $\nabla\cdot\mathbf v = 0$）。压强此时不由任何物态方程给出；它取维持流动无散所必需的那个值。

::: example 喷嘴中的压强梯度 {#ex-nozzle-p}
在上一章的喷嘴中，水在出口处沿轴线以 $80.0\,\mathrm{m/s^2}$ 加速。产生它的压强梯度是多少？忽略水平轴线方向的重力。
::: solution
[[#eq-euler]] 的轴向分量是 $\rho a_x = -\partial p/\partial x$。于是

$$
\pdv{p}{x} = -\rho a_x = -1000\times80.0 = -8.00\times10^{4}\,\mathrm{Pa/m},
$$

即沿流动方向每米下降 $0.8\,\mathrm{bar}$，或最后十厘米上 $8\,\mathrm{kPa}$。流体朝低压加速。定常流动只在压强沿它下降的地方加速。
:::
:::

::: example 旋转的水桶 {#ex-bucket}
一只圆柱形水桶绕竖直轴以角速度 $\Omega$ 旋转，直到水与它一起作刚体转动。求水中的压强与自由表面的形状。$\Omega = 10.0\,\mathrm{rad/s}$ 时，$r = 10.0\,\mathrm{cm}$ 处的表面比轴心处高多少？
::: solution
刚体转动时 $\mathbf v = \Omega r\,\hat{\boldsymbol\theta}$，定常，每个质点都走圆，所以加速度指向中心：$\mathbf a = -\Omega^2r\,\hat{\mathbf r}$。取 $\mathbf g = -g\hat{\mathbf z}$，[[#eq-euler]] 的分量为

$$
-\rho\Omega^2r = -\pdv{p}{r}, \qquad 0 = -\pdv{p}{z} - \rho g .
$$

积分得 $p = p_0 + \frac12\rho\Omega^2r^2 - \rho gz$，其中 $p_0$ 是 $z = 0$ 处轴上的压强。自由表面是 $p$ 等于大气压之处；把 $z = 0$ 取在它的最低点，于是 $p_0 = p_{\mathrm{atm}}$，表面是旋转抛物面

$$
z = \frac{\Omega^2r^2}{2g}.
$$

$r = 0.100\,\mathrm m$、$\Omega = 10.0\,\mathrm{rad/s}$ 时，$z = 100\times0.0100/19.6 = 5.10\,\mathrm{cm}$。牛顿（Newton）曾用旋转水桶的凹面论证转动是绝对的；对我们来说，它检验的是 [[#eq-euler]] 必须用完整的加速度，而不是此处为零的 $\partial\mathbf v/\partial t$。
:::
:::

### 兰姆形式

输运加速度可以用恒等式 $\mathbf v\times(\nabla\times\mathbf v) = \nabla(\frac12\abs{\mathbf v}^2) - (\mathbf v\cdot\nabla)\mathbf v$ 改写，于是

$$
(\mathbf v\cdot\nabla)\mathbf v = \nabla\bigl(\tfrac12v^2\bigr) - \mathbf v\times\boldsymbol\omega .
$$

设体力有势，$\mathbf g = -\nabla\Phi$（均匀重力下 $\Phi = gz$），且流体是**正压**的：密度仅是压强的函数。则 $\nabla p/\rho = \nabla h$，其中 $h(p) = \int\dd p/\rho(p)$，对不可压缩流体它是 $p/\rho$，对等熵气体它是比焓。欧拉方程化为

$$
\pdv{\mathbf v}{t} - \mathbf v\times\boldsymbol\omega = -\nabla\Bigl(\tfrac12v^2 + h + \Phi\Bigr).
$$ {#eq-lamb}

这个形式使理想流动的两条大定理几乎立刻可得。

## 伯努利定理 {#bernoulli}

::: theorem 伯努利定理 {#thm-bernoulli}
在有势体力的理想正压流体中：

1. 若流动**定常**，**伯努利函数** $H = \frac12v^2 + h + \Phi$ 沿每条流线（以及每条涡线）不变。均匀重力场中的不可压缩流体，

$$
\tfrac12\rho v^2 + p + \rho gz = \text{沿流线为常数}.
$$ {#eq-bernoulli}

2. 若流动**无旋**，$\mathbf v = \nabla\phi$，则无论定常与否，

$$
\pdv{\phi}{t} + \tfrac12v^2 + h + \Phi = C(t)
$$ {#eq-bernoulli-unsteady}

在整个流体中成立，$C$ 只依赖于时间。定常无旋流动中，$H$ 在处处是同一个常数。
:::

::: proof
(1) 由 $\partial_t\mathbf v = 0$，[[#eq-lamb]] 给出 $\nabla H = \mathbf v\times\boldsymbol\omega$。右端既垂直于 $\mathbf v$ 也垂直于 $\boldsymbol\omega$。于是 $\mathbf v\cdot\nabla H = 0$，所以 $H$ 沿流线不变；同样 $\boldsymbol\omega\cdot\nabla H = 0$，沿涡线亦然。

(2) 若 $\boldsymbol\omega = 0$ 且 $\mathbf v = \nabla\phi$，则 $\partial_t\mathbf v = \nabla(\partial_t\phi)$，[[#eq-lamb]] 化为 $\nabla\bigl(\partial_t\phi + \frac12v^2 + h + \Phi\bigr) = 0$。在连通区域内梯度为零的函数只依赖于时间。
:::

每个假设都不可少。伯努利方程是一条能量表述——动能加上压强做的功加上势能，随一个流体质点守恒——凡能量被耗散之处它就失效：边界层里、突扩之后、水跃之中。旋转水桶里，流动定常、理想但是有旋，$\omega = 2\Omega$，$H$ 在不同流线之间不同：自由表面上 $H = \frac12\Omega^2r^2 + gz + p_{\mathrm{atm}}/\rho = \Omega^2r^2 + p_{\mathrm{atm}}/\rho$，随 $r$ 增大。

::: warning 伯努利方程跨流线使用
[[#eq-bernoulli]] 联系的是*同一条*流线上的两点。把它用在不同流线上的两点之间，只有流动无旋，或所有流线都来自 $H$ 均匀的区域——例如上游远处的均匀来流——才成立。第二种常见错误是穿过水泵、水轮机或风机使用它——它们会加入或移除能量——或把它穿过一片分离的湍流区域。第三种是对高速气体仍取 $\rho$ 为常数；$\mathrm{Ma} > 0.3$ 时需要用可压缩形式，其中 $h$ 是焓。
:::

::: example 皮托-静压管 {#ex-pitot}
轻型飞机上的皮托-静压管有一个朝前的小孔，空气在此被减速到静止，另有几个侧面小孔，空气以飞行速度掠过。压强差为 $2.00\,\mathrm{kPa}$，高空空气密度为 $1.00\,\mathrm{kg/m^3}$。求空速，并估计把空气当作不可压缩造成的误差。
::: solution
终止于前孔的那条流线来自前方远处，那里速度为 $v$、压强为 $p_\infty$；在前孔处速度为零，压强为**驻点压强** $p_0$。高度差可以忽略。由 [[#eq-bernoulli]]，$p_0 = p_\infty + \frac12\rho v^2$；侧孔读得 $p_\infty$，因为掠过它们的流动几乎未受扰动。于是

$$
v = \sqrt{\frac{2(p_0 - p_\infty)}{\rho}} = \sqrt{\frac{2\times2000}{1.00}} = 63.2\,\mathrm{m/s},
$$

约 $123$ 节。可压缩性方面：空气减速使它的密度按一阶增加 $\Delta\rho = \Delta p/c^2$，其中 $c^2 = \dd p/\dd\rho$ 是声速的平方（见 [[continuum/waves-in-fluids]]）。于是

$$
\frac{\Delta\rho}{\rho} = \frac{\frac12\rho v^2}{\rho c^2} = \frac12\mathrm{Ma}^2 .
$$

高空 $c \approx 330\,\mathrm{m/s}$，$\mathrm{Ma} = 0.19$，$\Delta\rho/\rho \approx 0.018$。对速率的可压缩修正量级为 $\frac18\mathrm{Ma}^2 \approx 0.5\,\%$，此处可以忽略，对客机则不然。这就是 [[continuum/fluid-kinematics]] 中承诺过的那个估计 $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$。
:::
:::

::: quiz
空气流过机翼弯曲的上表面比流过平直的下表面快。一种流行的解释说是因为在前缘分开的两团空气必须在后缘重新相遇，所以上面那团必须沿更长的路程走得更快。这种说法错在哪里？
- [ ] 没错；这就是升力的标准解释。
- [x] 没有任何定律要求两团空气相遇；事实上上面那团空气远早于下面那团到达后缘。
- [ ] 伯努利方程在机翼上方不适用。
- [ ] 机翼下方的空气比上方的快。
::: solution
不存在“等时传输”原理。风洞中的烟脉冲照片显示，流过升力机翼上方的空气以明显优势最先到达后缘。速度差是绕翼环量的结果，环量由下面将要说明的库塔（Kutta）条件确定。伯努利方程随后正确地把速度差变成产生升力的压强差。这个错误解释还预言出的升力小得离谱，而且对小迎角的对称翼或平整的帆根本不预言升力。
:::
:::

## 开尔文环量定理 {#kelvin}

[[#eq-lamb]] 的第二个推论涉及涡量，而且比第一个更深刻。

::: theorem 开尔文环量定理 {#thm-kelvin}
在有势体力的理想正压流体中，随流体运动的任一闭合物质量线 $C(t)$ 上的环量不随时间改变：

$$
\frac{D\Gamma}{Dt} = \frac{D}{Dt}\oint_{C(t)}\mathbf v\cdot\dd\mathbf l = 0 .
$$
:::

::: proof
用随流体运动的参数 $s \in [0, 1]$ 标记线上各点，于是时刻 $t$ 的曲线是 $\mathbf x(s, t)$，满足 $\mathbf x(0, t) = \mathbf x(1, t)$、$\partial_t\mathbf x(s, t) = \mathbf v$。则 $\Gamma = \int_0^1\mathbf v\cdot\partial_s\mathbf x\,\dd s$，固定 $s$ 求导，

$$
\frac{D\Gamma}{Dt} = \int_0^1\frac{D\mathbf v}{Dt}\cdot\pdv{\mathbf x}{s}\,\dd s + \int_0^1\mathbf v\cdot\pdv{\mathbf v}{s}\,\dd s .
$$

第二个积分是 $\int_0^1\partial_s(\frac12v^2)\,\dd s = 0$，因为曲线闭合。由正压形式的欧拉方程，$D\mathbf v/Dt = -\nabla(h + \Phi)$，所以第一个积分因同样理由也是 $-\int_0^1\partial_s(h + \Phi)\,\dd s = 0$。故 $D\Gamma/Dt = 0$。
:::

每个假设都有物理含义。黏性扩散涡量、破坏定理；非正压流体——密度既依赖于压强也依赖于温度——在等压面与等密度面相交之处产生涡量——海风就是这样开始的——而非保守力，例如非惯性系中的科里奥利（Coriolis）力，也会改变环量。

::: corollary 无旋流动的保持 {#cor-irrotational}
在 [[#thm-kelvin]] 的假设下，某时刻无旋的流动永远无旋。特别地，理想流体从静止启动、或来自均匀来流的任何流动，永远无旋。
:::

::: proof
若 $t = 0$ 时处处 $\boldsymbol\omega = 0$，由斯托克斯（Stokes）定理，每条闭合物质量线上的环量当时都为零，再由 [[#thm-kelvin]] 保持为零。若稍后某点 $\boldsymbol\omega \neq 0$，就在该点取一个垂直于 $\boldsymbol\omega$ 的小物质圆：它的环量约为 $\abs{\boldsymbol\omega}$ 乘面积，不为零。这一矛盾说明 $\boldsymbol\omega$ 保持为零。
:::

亥姆霍兹（Helmholtz）在 1858 年发现了开尔文（Kelvin）这一结果所概括的涡定理。涡线随流体运动。绕涡管的环量——涡管的**强度**——在每个截面上都相同，且不随时间改变。于是涡管被拉长时，它的截面收缩、涡量按比例增大：花样滑冰运动员收拢手臂。这种**涡拉伸**把浴缸泄水时水体的涡量浓缩成狭窄的旋涡，并在三维湍流中驱动 [[continuum/viscous-flow]] 中描述的能量向小尺度的级串。

::: example 龙卷风的加强 {#ex-tornado}
雷暴中的一团空气柱边缘的旋转速率为 $10.0\,\mathrm{m/s}$，半径 $1.00\,\mathrm{km}$。上升气流把它竖直拉伸，它收缩——保持环量不变——到半径 $100\,\mathrm m$。把气柱当作兰金（Rankine）涡核处理（边缘以内是刚体转动），忽略摩擦，求最终的边缘速率；若空气不可压缩，再求涡量与气柱长度各自的变化倍数。
::: solution
取绕气柱边缘的一个物质圆。由 [[#thm-kelvin]]，它的环量 $\Gamma = 2\pi rv$ 是常数：

$$
2\pi(1000)(10.0) = 2\pi(100)\,v_{\mathrm{f}}, \qquad v_{\mathrm{f}} = 100\,\mathrm{m/s}.
$$

涡核的涡量是 $\omega = \Gamma/\pi r^2$（环量除以面积），所以它增大 $(1000/100)^2 = 100$ 倍，从 $2\times10/1000 = 0.0200\,\mathrm{s^{-1}}$ 增到 $2.00\,\mathrm{s^{-1}}$。若空气不可压缩，气柱的体积 $\pi r^2\ell$ 不变，于是它的长度也增大同样的 $100$ 倍：涡量正比于拉伸，正是亥姆霍兹定理要求的。真实的龙卷风能到达这样的速率，尽管地面附近的摩擦和雷暴中非正压的热力学使过程更加复杂；本质机制——靠拉伸浓缩既有的涡量——就是这一个。
:::
:::

::: quiz
烟环在静止的房间中飘过几米远而几乎不散开。按理想理论，它为什么能持续？
- [ ] 它的涡量不断由压强梯度重新产生。
- [x] 它的涡线随空气运动、环量守恒，所以烟环不能就这样消散；只有黏性缓慢地把它扩散掉。
- [ ] 烟比空气重，把烟环维系在一起。
- [ ] 伯努利方程使烟环内部的压强保持常数。
::: solution
由 [[#thm-kelvin]] 和亥姆霍兹定理，构成烟环的涡线是物质线，绕核的环量固定。在理想流体中烟环将永存；在空气中，黏性在 $a^2/\nu$ 量级的时间内扩散涡核，对半径 $1\,\mathrm{cm}$ 的核约为 $7\,\mathrm s$，湍流混合还会使它更短。开尔文惊叹于涡环的持久，1867 年他曾提出原子是以太中打结的涡环——一个错误的理论，却开启了纽结的数学研究。
:::
:::

## 势流 {#potential}

由 [[#cor-irrotational]]，理想不可压缩流体绕过物体的流动——从静止或均匀来流开始——是无旋的。于是 $\mathbf v = \nabla\phi$，$\phi$ 是**速度势**，不可压缩性给出拉普拉斯（Laplace）方程：

$$
\nabla^2\phi = 0, \qquad \pdv{\phi}{n} = \mathbf U\cdot\mathbf n \text{ 在物面上}, \qquad \nabla\phi \to \mathbf v_\infty \text{ 在远处}.
$$ {#eq-laplace}

问题变成线性的。非线性并没有消失——它在压强里，$p = p_\infty + \frac12\rho(v_\infty^2 - v^2)$，由伯努利定理事后算出——但速度场可以由叠加构造。

二维不可压缩无旋流动同时有速度势和流函数，二者满足柯西-黎曼（Cauchy–Riemann）方程 $\partial_x\phi = \partial_y\psi = u$、$\partial_y\phi = -\partial_x\psi = v$。于是 $w = \phi + i\psi$ 是 $z = x + iy$ 的解析函数，称为**复势**，且

$$
\deriv{w}{z} = u - iv .
$$

每个解析函数都是一个流动。最基本的几个是：

| $w(z)$ | 流动 |
|---|---|
| $Uz$ | 沿 $x$ 方向、速度为 $U$ 的均匀流 |
| $\dfrac{m}{2\pi}\ln z$ | 位于原点、单位深度体积流量为 $m$ 的源 |
| $-\dfrac{i\kappa}{2\pi}\ln z$ | 直线涡，逆时针环量 $\kappa$ |
| $\dfrac{\mu}{z}$ | 偶极子：源与汇合并而成，强度 $\mu$ |

### 圆柱绕流

在均匀流上叠加一个偶极子：

$$
w(z) = U\Bigl(z + \frac{a^2}{z}\Bigr), \qquad \phi = U\Bigl(r + \frac{a^2}{r}\Bigr)\cos\theta, \qquad \psi = U\Bigl(r - \frac{a^2}{r}\Bigr)\sin\theta .
$$ {#eq-cylinder}

流函数在 $r = a$ 上为零，所以圆是一条流线，可以换成一个实心圆柱：没有流体穿过它。远处 $w \approx Uz$，即均匀来流。带这些边界条件的拉普拉斯方程在相差一个环量的意义下解唯一，所以 [[#eq-cylinder]] 就是*那个*无环量绕圆柱的无旋流动。速度分量为

$$
v_r = \pdv{\phi}{r} = U\Bigl(1 - \frac{a^2}{r^2}\Bigr)\cos\theta, \qquad v_\theta = \frac1r\pdv{\phi}{\theta} = -U\Bigl(1 + \frac{a^2}{r^2}\Bigr)\sin\theta .
$$

物面上，$v_r = 0$，$v_\theta = -2U\sin\theta$。流体在前、后驻点 $\theta = \pi$ 和 $\theta = 0$ 处静止，在顶部和底部以两倍于自由流的速度运动。由伯努利定理——流动无旋，处处可用——物面压强为

$$
p(\theta) = p_\infty + \tfrac12\rho U^2\bigl(1 - 4\sin^2\theta\bigr), \qquad C_p \equiv \frac{p - p_\infty}{\frac12\rho U^2} = 1 - 4\sin^2\theta .
$$ {#eq-cp}

::: widget slopefield
f: (-2*x*y/(x^2+y^2)^2)/(1-(x^2-y^2)/(x^2+y^2)^2)
x: -3, 3
y: -2, 2
points: -3, 0.15; -3, 0.5; -3, 1; -3, 1.6; -3, -0.15; -3, -0.5; -3, -1; -3, -1.6
caption: 势流 [[#eq-cylinder]] 绕过半径 $a = 1$ 圆柱的流线，来流自左方，$U = 1$；单位圆内部的箭头属于虚构的内部流动，请忽略。播下的流线一分为二又对称地合拢。注意图形在前部与后部完全相同：这一前后对称就是达朗贝尔佯谬的全部内容。再看流线如何在顶部和底部挤在一起，那里的速度达到 $2U$。点击前驻点 $(-1, 0)$ 附近，看看那里的方向变化有多慢。
:::

## 达朗贝尔佯谬 {#dalembert}

::: theorem 圆柱的达朗贝尔佯谬 {#thm-dalembert}
在定常势流 [[#eq-cylinder]] 中，圆柱单位长度受到的合力为零：既无阻力，也无升力。
:::

::: proof
外法向是 $\hat{\mathbf r} = (\cos\theta, \sin\theta)$，圆柱单位长度受到的力是 $-\oint p\,\hat{\mathbf r}\,a\,\dd\theta$。常数 $p_\infty + \frac12\rho U^2$ 对 $\cos\theta$ 和 $\sin\theta$ 的积分为零。剩下的是

$$
D = 2\rho U^2a\int_0^{2\pi}\sin^2\theta\cos\theta\,\dd\theta = 0, \qquad L = 2\rho U^2a\int_0^{2\pi}\sin^3\theta\,\dd\theta = 0 ,
$$

第一个为零因为 $\sin^2\theta\cos\theta = \frac13\,\dd(\sin^3\theta)/\dd\theta$ 在一个周期上积分为零；第二个为零因为 $\sin^3\theta$ 关于 $\theta = \pi$ 反对称。$\theta$ 与 $\pi - \theta$ 处压强相同（前后对称），阻力由此被消灭；$\theta$ 与 $-\theta$ 处压强相同（上下对称），升力由此被消灭。
:::

这个结论是一般性的。*任何*物体在无限大理想不可压缩流体中匀速运动、无穷远处流体静止，定常无旋流动中阻力为零。证明概要：扰动的势像偶极子那样衰减，三维中 $\phi \sim r^{-2}$，于是速度扰动按 $r^{-3}$ 衰减。对物体与大球面之间的流体写出动量守恒。穿过球面的动量通量和压力量级为 $r^{-3}\times r^2 \to 0$，所以物体上的力必定消失。从能量看：物体克服阻力做的功总要变成什么，但定常势流不把能量带到无穷远，也没有任何地方可供耗散。（完整证明见巴奇勒（Batchelor）《流体动力学导论》（*Introduction to Fluid Dynamics*）第 6 章，以及朗道（Landau）与栗弗席兹（Lifshitz）《流体力学》（*Fluid Mechanics*）§11。）

真实的流动在物体后方同 [[#eq-cylinder]] 毫无相似之处。真实流体中，紧贴壁面、流体黏附其上的那薄层因黏性而失去能量；在圆柱后半段，[[#eq-cp]] 显示压强向后驻点升高，这层慢速流体爬不上这道压强坡，流动发生分离，物体后方形成一片宽阔的低压尾流。后部的压强始终恢复不到前部的数值，这一差值就是阻力。理想理论在物体前部出色地正确，在尾流中却全错。

::: widget plot
f: 1 - (2*sin(x) + G)^2
x: 0, 2pi
y: -9, 1.5
sliders: G=0:-3:3:0.1
piticks: true
caption: 圆柱表面压强系数 $C_p = (p - p_\infty)/\frac12\rho U^2$ 随极角 $\theta$ 的变化（$\theta = 0$ 在尾部，$\theta = \pi$ 在前部，$\theta = \pi/2$ 在顶部），环量参数 $G = \Gamma/2\pi aU$。$G = 0$ 时曲线关于 $\pi/2$（前后）和关于 $\pi$（上下）对称，合力为零。增大 $G$：顶部（$\theta$ 靠近 $\pi/2$）的吸力加深，底部（$\theta$ 靠近 $3\pi/2$）失去吸力，于是圆柱被向上推——库塔-茹科夫斯基升力。曲线仍关于 $\pi/2$ 对称，所以阻力依然为零。$C_p = 1$ 的驻点沿下表面彼此滑拢，在 $G = 2$ 处合并。
:::

## 升力：库塔-茹科夫斯基定理 {#lift}

理想流体中的圆柱可以带有环量。在 [[#eq-cylinder]] 上叠加一个直线涡：

$$
w(z) = U\Bigl(z + \frac{a^2}{z}\Bigr) + \frac{i\Gamma}{2\pi}\ln z ,
$$ {#eq-cylinder-circ}

由上面的表，它给圆柱加上*顺时针*环量 $\Gamma$。圆 $r = a$ 仍是一条流线，因为 $\operatorname{Im}(i\ln z) = \ln r$ 在其上为常数；圆柱外的流动仍无旋。物面速度成为

$$
v_\theta(a, \theta) = -2U\sin\theta - \frac{\Gamma}{2\pi a} .
$$

顶部（$\theta = \pi/2$）两项相加、流体更快；底部部分抵消。驻点位于 $\sin\theta = -\Gamma/4\pi Ua$，两个都在下半圆面上；$\Gamma = 4\pi Ua$ 时在底部合并。

::: theorem 圆柱的库塔-茹科夫斯基定理 {#thm-kj}
在流动 [[#eq-cylinder-circ]] 中，圆柱单位长度受到的力沿来流方向的分量为零，垂直于来流的分量为

$$
L = \rho U\Gamma
$$ {#eq-kj}

对沿 $+x$ 方向的来流与顺时针环量而言，方向向上。
:::

::: proof
由伯努利定理，物面上 $p = p_\infty + \frac12\rho(U^2 - v_\theta^2)$，其中

$$
v_\theta^2 = 4U^2\sin^2\theta + \frac{2U\Gamma}{\pi a}\sin\theta + \Bigl(\frac{\Gamma}{2\pi a}\Bigr)^2 .
$$

竖直方向单位长度的力是 $L = -\oint p\sin\theta\,a\,\dd\theta = \frac12\rho a\oint v_\theta^2\sin\theta\,\dd\theta$，常数项对 $\sin\theta$ 的积分为零。$v_\theta^2$ 的三项中，第一项给出 $\oint\sin^3\theta\,\dd\theta = 0$，第三项给出 $\oint\sin\theta\,\dd\theta = 0$。中间一项给出

$$
L = \frac12\rho a\cdot\frac{2U\Gamma}{\pi a}\int_0^{2\pi}\sin^2\theta\,\dd\theta = \frac{\rho U\Gamma}{\pi}\cdot\pi = \rho U\Gamma .
$$

阻力是 $\frac12\rho a\oint v_\theta^2\cos\theta\,\dd\theta$，每一项都是 $\cos\theta$ 乘以 $\sin\theta$ 的幂或常数，每一项在一个周期上的积分都为零。
:::

库塔（Kutta）1902 年与茹科夫斯基（Joukowski）1906 年证明，[[#eq-kj]] 对均匀来流中*任意*形状的二维物体都成立：单位翼展升力是 $\rho U\Gamma$，与翼型形状无关，$\Gamma$ 是绕任一包围物体周线的环量。一般证明使用布拉休斯（Blasius）关于力的围道积分公式与留数定理；见阿奇森（Acheson）《初等流体力学》（*Elementary Fluid Dynamics*）第 4 章。

### 环量从哪里来

势论允许 $\Gamma$ 取任意值。对带锐利后缘的机翼，除一个值外，其余所有值都使流体以无限大的速度绕过尖缘。**库塔条件**选出使流动平滑离开后缘的那一个环量。对弦长 $c$、小迎角 $\alpha$ 的薄翼，它给出 $\Gamma = \pi Uc\,\alpha$，于是升力系数为

$$
C_L = \frac{L}{\frac12\rho U^2c} = 2\pi\alpha ,
$$ {#eq-thin-airfoil}

其中 $\alpha$ 以弧度计——直到失速前都与实验相符到约百分之十以内。物理上，环量是由黏性创造的：机翼开始运动时，黏性作用在后缘的薄层里。由开尔文定理，包围机翼及其尾流的大物质曲线的总环量保持为零，所以一个等值反向的**起始涡**从后缘放出，留在跑道附近。普朗特在哥廷根（Göttingen）的实验室于 1920 年代把它拍摄下来。有限翼展机翼的细节——尾涡与诱导阻力——在机械工程图谱的[势流](/learn/mechanical/lesson.php?c=aerodynamics&l=potential-flow)与[薄翼理论](/learn/mechanical/lesson.php?c=aerodynamics&l=thin-airfoil-theory)两课中展开。

::: example 轻型飞机的升力 {#ex-aircraft}
一架质量 $1000\,\mathrm{kg}$ 的轻型飞机有矩形机翼，翼展 $10.0\,\mathrm m$，弦长 $1.50\,\mathrm m$。它在密度 $1.20\,\mathrm{kg/m^3}$ 的空气中以 $50.0\,\mathrm{m/s}$ 平飞。求绕翼环量、升力系数，以及薄翼理论预言的迎角。忽略翼端效应。
::: solution
平飞时升力平衡重量，$L = mg = 1000\times9.80 = 9800\,\mathrm N$，即单位翼展 $980\,\mathrm{N/m}$。由 [[#eq-kj]]，

$$
\Gamma = \frac{L/b}{\rho U} = \frac{980}{1.20\times50.0} = 16.3\,\mathrm{m^2/s}.
$$

升力系数为

$$
C_L = \frac{L}{\frac12\rho U^2S} = \frac{9800}{0.5\times1.20\times2500\times15.0} = 0.436 ,
$$

[[#eq-thin-airfoil]] 给出 $\alpha = C_L/2\pi = 0.0693\,\mathrm{rad} = 3.97^\circ$。这个环量对应上下表面约 $\Gamma/c \approx 11\,\mathrm{m/s}$ 的速度差，即在飞行速度上下各约 $\pm5\,\mathrm{m/s}$。展弦比为 $6.7$ 的真实机翼还要多几度，因为它的尾涡诱导出下洗，减小了有效迎角。
:::
:::

::: application 马格努斯效应
旋转的圆柱或球靠黏性带着流体绕它转，产生环量；库塔-茹科夫斯基定理于是给出横向的力。马格努斯（Magnus, Heinrich Gustav）1852 年用旋转圆柱演示了它；上旋使网球下坠、侧旋使足球拐弯，都是这个缘故。弗莱特纳（Flettner）的旋筒帆船“布考号”（*Buckau*）1926 年靠两根高大的旋转圆筒横渡大西洋，现代旋筒帆已装在一些货船上用于节油。单位长度的力约为 $\rho U\Gamma$，其中 $\Gamma$ 是 $2\pi a\times$（表面速率）的一个分数，这个分数取决于雷诺数与转速。
:::

::: history 从伯努利到库塔
丹尼尔·伯努利（Daniel Bernoulli）的《流体动力学》（*Hydrodynamica*，1738）用“活的力”（能量）守恒把容器出流中的压强同速率联系起来；其中并没有今天形式的方程。达朗贝尔（d'Alembert, Jean le Rond）为 1749 年柏林科学院评奖而作、1752 年发表的论文写出了流体运动的早期偏微分方程，并发现理想流体中对称物体的阻力消失。欧拉在 1755 年写成、1757 年发表的论文中给出了理想流动的一般方程，并由它们得到伯努利积分。亥姆霍兹（Helmholtz, Hermann von）1858 年发表了涡定理；汤姆孙（Thomson, William，即后来的开尔文勋爵）1869 年在一篇关于涡原子的论文中给出了环量定理。环量与升力的关系由英国的兰彻斯特（Lanchester, Frederick）、德国的库塔（Kutta, Martin，1902）和俄国的茹科夫斯基（Joukowski, Nikolai，1906）各自独立发现。
:::

## 后续内容 {#leads}

理想理论在远离壁面和尾流之处是正确的，壁面附近必须由黏性补全。[[continuum/viscous-flow]] 加上黏性应力，导出纳维-斯托克斯（Navier–Stokes）方程，并用普朗特的边界层说明欧拉理论为何在其适用处有效、在其失效处失效。欧拉方程对静止状态线性化给出声波；带上自由表面给出水波——两者都在 [[continuum/waves-in-fluids]] 中，那里会再次使用本章的势流方法。[[mechanics/fluids]] 中那条定常流动的初等伯努利方程就是 [[#eq-bernoulli]] 这个特例；它的工程应用——文丘里流量计、水箱出流、虹吸——在机械工程图谱的[伯努利方程](/learn/mechanical/lesson.php?c=fluid-mechanics&l=bernoulli)一课中展开。

::: summary
- 理想流体有 $\sigma_{ij} = -p\,\delta_{ij}$，柯西运动方程化为欧拉方程 $\rho\,D\mathbf v/Dt = -\nabla p + \rho\mathbf g$，壁面允许滑移。
- 保守力场中的正压流体，定常流动里 $H = \frac12v^2 + h + \Phi$ 沿流线不变；无旋流动中处处相同（再加上 $\partial_t\phi$）；有旋流动的不同流线之间，$H$ 不同。
- 开尔文定理：绕物质回路的环量守恒；因此从静止开始的流动保持无旋，涡线随流体移动。
- 不可压缩无旋流动有 $\nabla^2\phi = 0$；二维下 $w = \phi + i\psi$ 解析，且 $w'(z) = u - iv$。
- 圆柱绕流：物面速率 $2U\abs{\sin\theta}$，$C_p = 1 - 4\sin^2\theta$，合力为零——达朗贝尔佯谬，由黏性分离解决。
- 有环量时，任意二维物体的单位翼展升力是 $\rho U\Gamma$；库塔条件为机翼确定 $\Gamma$，给出 $C_L \approx 2\pi\alpha$。
:::

## 习题

::: exercise 水中的皮托管 {level=1 check="sqrt(2*5000/1000)"}
河水中的皮托管记录到驻点压强比静压高 $5.00\,\mathrm{kPa}$。求水流速度，单位 m/s。
::: solution
沿驻点流线用 [[#eq-bernoulli]]，$\frac12\rho v^2 = 5000\,\mathrm{Pa}$，所以 $v = \sqrt{2\times5000/1000} = \sqrt{10} = 3.16\,\mathrm{m/s}$。水的密度约是空气的 $830$ 倍，同样的压强差对应的速度比 [[#ex-pitot]] 中的小得多。
:::
:::

::: exercise 圆柱顶部的吸力 {level=1 check="-180"}
密度 $1.20\,\mathrm{kg/m^3}$ 的空气以 $10.0\,\mathrm{m/s}$ 掠过长圆柱。按势流理论，圆柱顶部的 $p - p_\infty$ 是多少（单位 Pa）？
::: solution
$\theta = \pi/2$ 时，[[#eq-cp]] 给出 $C_p = 1 - 4 = -3$，所以 $p - p_\infty = -3\times\frac12\times1.20\times(10.0)^2 = -180\,\mathrm{Pa}$。真实圆柱在此风速下的实测最小 $C_p$ 约为 $-1.2$，出现在离前缘约 $\theta = 70^\circ$ 处，因为流动在到达顶部之前已经分离：理想理论高估了吸力。
:::
:::

::: exercise 旋转的汤碗 {level=1 check="(4*pi)^2*0.15^2/(2*9.8)"}
半径 $15.0\,\mathrm{cm}$ 的一碗汤以每秒 $2.00$ 转被旋转到刚体转动。碗边处的表面比轴心处高多少（单位 m）？
::: solution
$\Omega = 2\pi\times2.00 = 4\pi = 12.57\,\mathrm{rad/s}$。由 [[#ex-bucket]]，$\Delta z = \Omega^2r^2/2g = 157.9\times0.0225/19.6 = 0.181\,\mathrm m$。盛汤的碗至少要 $18\,\mathrm{cm}$ 深才装得下——这就是没人把汤以每秒两转的速度旋转的原因。
:::
:::

::: exercise 合并的驻点 {level=2 check="4*pi"}
对带环量的圆柱 [[#eq-cylinder-circ]]，求两个驻点在物面上合并时的 $\Gamma/(Ua)$ 值。$\Gamma = 2\pi Ua$ 时驻点在哪里？
::: solution
物面驻点满足 $v_\theta = 0$，即 $\sin\theta = -\Gamma/4\pi Ua$。$\Gamma/4\pi Ua < 1$ 时有两个解；$\Gamma/(Ua) = 4\pi$ 时它们在 $\theta = -\pi/2$（底部）合并。$\Gamma$ 更大时驻点离开物面，位于圆柱下方的流体中，那里有闭合流线绕着它转。$\Gamma = 2\pi Ua$ 时 $\sin\theta = -\frac12$，故 $\theta = -30^\circ$ 与 $\theta = -150^\circ$（即 $210^\circ$）：都在水平线以下 $30^\circ$，一个在后方、一个在前方。
:::
:::

::: exercise 翼载荷 {level=2 check="2*700*9.8/(1.2*60^2*16*2*pi)"}
一架滑翔机质量 $700\,\mathrm{kg}$，机翼面积 $16.0\,\mathrm{m^2}$。用 $C_L = 2\pi\alpha$，求在密度 $1.20\,\mathrm{kg/m^3}$ 的空气中以 $60.0\,\mathrm{m/s}$ 平飞所需的迎角，单位弧度。
::: solution
$C_L = 2mg/\rho U^2S = 2\times6860/(1.20\times3600\times16.0) = 13720/69120 = 0.1985$，所以 $\alpha = C_L/2\pi = 0.0316\,\mathrm{rad} = 1.81^\circ$。速度减半时升力系数要大四倍，即 $0.79$，迎角 $7.2^\circ$：慢飞需要大迎角，而典型翼型约 $15^\circ$ 的失速决定了最低速度。
:::
:::

::: exercise 空气何时不可压缩？ {level=2 check="343*sqrt(0.1)"}
用估计 $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$，声速取 $343\,\mathrm{m/s}$，求驻点处空气密度升高 $5\,\%$ 所需的速度，单位 m/s。
::: solution
$\frac12\mathrm{Ma}^2 = 0.05$ 给出 $\mathrm{Ma} = \sqrt{0.1} = 0.316$，所以 $v = 343\times0.316 = 108\,\mathrm{m/s}$，约 $390\,\mathrm{km/h}$。经验法则“$\mathrm{Ma} \approx 0.3$ 以下的流动可作不可压缩处理”正出于此：那时密度变化不超过约 $5\,\%$，压强与速率的关系精确到约 $2\,\%$。
:::
:::

::: exercise 兰金半体 {level=2}
强度为 $m$（单位深度体积流量）的源放在原点，叠加沿 $x$ 的均匀流 $U$，于是 $w = Uz + (m/2\pi)\ln z$。求驻点，并证明过它的分界流线——把源的流体与来流分开的那条——在下游远处趋于半宽 $m/2U$。
::: solution
$w'(z) = U + m/2\pi z$ 在 $z = -m/2\pi U$ 处消失：驻点在负 $x$ 轴上、源上游 $m/2\pi U$ 处。流函数为 $\psi = Ur\sin\theta + m\theta/2\pi$。驻点处 $\theta = \pi$、$r\sin\theta = 0$，故 $\psi = m/2$。分界流线是 $Uy + m\theta/2\pi = m/2$。下游远处 $\theta \to 0$，上支 $y \to m/2U$（下支 $-m/2U$）。总宽度 $m/U$ 正是速度为 $U$ 的来流带走源的流量 $m$ 所需要的宽度，质量守恒必然如此。分界流线可以换成一个实体：这就是绕过细长钝头物体前端的流动，如桥墩或皮托管的前端。
:::
:::

::: exercise 开尔文定理与从静止启动 {level=3}
由 [[#eq-bernoulli-unsteady]] 证明：静止的理想不可压缩流体被物体的突然运动带动时，稍后的速度势为 $\phi = -\Pi/\rho$，其中 $\Pi$ 是**脉冲压强**（冲击期间压强对时间的积分）。解释为什么这一结果连同 [[#cor-irrotational]] 意味着突然启动之后紧随其后的流动就是势流——即使绕带尖锐棱边的物体。
::: hint
在短时段 $\delta t$ 上积分非定常伯努利方程，其间 $p$ 很大而 $v$ 保持有限。
:::
::: solution
冲击期间，$\frac12v^2$ 与 $\Phi$ 保持有界，而 $p$ 的量级为 $\Pi/\delta t$。把 [[#eq-bernoulli-unsteady]]（取 $h = p/\rho$）从 $t = 0$（此时 $\phi = 0$）积分到 $t = \delta t$：

$$
\phi(\delta t) + \int_0^{\delta t}\Bigl(\tfrac12v^2 + \Phi\Bigr)\dd t + \frac1\rho\int_0^{\delta t}p\,\dd t = \int_0^{\delta t}C\,\dd t .
$$

$\delta t \to 0$ 时第二项消失，第三项趋于 $\Pi/\rho$，右端是一个空间均匀的常数，可以并入 $\phi$。所以 $\phi = -\Pi/\rho$。流体原本静止，因而无旋；由 [[#cor-irrotational]] 其后也无旋，于是 $\mathbf v = \nabla\phi$，$\nabla^2\phi = 0$，并满足物面边界条件：就是势流，包括尖棱在内。尖锐棱边处的无限大速度随后被黏性在短时内抹平，放出起始涡并建立起库塔环量；在严格理想的流体中这永远不会发生，所以库塔条件必须作为额外的物理原理另行施加。
:::
:::

::: exercise 流体内部没有压强极小值 {level=3}
证明：无体力的理想不可压缩流体作定常无旋流动时，压强不可能在流体内部的一点取严格的局部极小值。由此推出：最低压强——在水中就是空化开始之处——总出现在边界上。
::: hint
证明 $\nabla^2(\abs{\nabla\phi}^2) = 2\sum_{i,j}(\partial_i\partial_j\phi)^2 \ge 0$，并用次调和函数的极大值原理。
:::
::: solution
由伯努利定理的无旋情形 [[#thm-bernoulli]]，$p = C - \frac12\rho q$，其中 $q = \abs{\nabla\phi}^2 = \partial_k\phi\,\partial_k\phi$。计算

$$
\nabla^2q = \partial_i\partial_i(\partial_k\phi\,\partial_k\phi) = 2\,\partial_i\partial_k\phi\,\partial_i\partial_k\phi + 2\,\partial_k\phi\,\partial_k(\partial_i\partial_i\phi) = 2\sum_{i,k}(\partial_i\partial_k\phi)^2 ,
$$

因为 $\nabla^2\phi = 0$。于是 $\nabla^2q \ge 0$：$q$ 是次调和的。次调和函数满足平均值不等式：$q(\mathbf x_0)$ 不大于 $q$ 在任何以 $\mathbf x_0$ 为中心、完全位于流体中的球面上的平均值（对球面平均关于半径求导并使用散度定理；导数就是 $\nabla^2q \ge 0$ 在球体上的积分）。若 $\mathbf x_0$ 是严格的局部极大值，$q$ 在绕它的小球面上处处小于 $q(\mathbf x_0)$，平均值亦然——矛盾。所以 $q$ 没有严格的内部极大值。因此 $p$ 没有严格的内部极小值。在流动的任一有界部分上，最低压强在边界上取得——物面或自由流线——那正是船用螺旋桨和泵叶轮上首先出现空化气泡之处。
:::
:::
