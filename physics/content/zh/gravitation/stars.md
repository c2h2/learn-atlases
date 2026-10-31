太阳以近乎今天的亮度已经照耀了四十多亿年。它是一团热气体的球，靠自身引力聚拢，靠气体压强支撑。如果把压强关掉，它会在大约半小时内坍缩。如果把引力关掉，它也会在差不多同样的时间里飞散。几十亿年来两件事都没有发生，这是恒星结构的第一条事实：恒星处于**流体静力平衡**，在每一个半径上压强都平衡着引力。

仅仅是平衡就能说出惊人的许多东西。把它与理想气体状态方程结合，不用任何核物理知识，就能把太阳中心的温度定到两倍以内。由它导出的位力定理解释了为什么一颗损失能量的恒星会升温、为什么引力收缩只能供太阳燃烧几千万年、为什么一定有别的机制——核聚变——在起作用。当燃料耗尽，残骸必须由热压强以外的东西支撑：白矮星里电子的简并压，中子星里中子的简并压。二者各有一个最大质量，超过第二个就再没有任何东西能阻止坍缩成黑洞。

本章建立牛顿理论，并给出中子星的广义相对论修正。你需要 [[mechanics/gravitation]] 的牛顿引力与壳层定理、[[thermodynamics/kinetic-theory]] 的理想气体、[[particles/reactions]] 的聚变与质子–质子链，以及 [[statistical-mechanics/bose-fermi]] 的简并费米气体——我们直接引用而不重新推导。太阳的数值取 IAU 名义值：$M_\odot = 1.988\times 10^{30}\,\mathrm{kg}$，$R_\odot = 6.957\times 10^{8}\,\mathrm{m}$，$L_\odot = 3.828\times 10^{26}\,\mathrm{W}$。

## 流体静力平衡 {#hydrostatic}

把恒星建模为球对称而静态的。设 $\rho(r)$ 为密度，$P(r)$ 为压强，$m(r)$ 为半径 $r$ 内的质量。

::: theorem 流体静力平衡方程 {#thm-hydrostatic}
在静态、球对称、自引力的流体中，

$$
\deriv{m}{r} = 4\pi r^2\rho(r), \qquad \deriv{P}{r} = -\frac{G\,m(r)\,\rho(r)}{r^2}.
$$ {#eq-hydrostatic}
:::

::: proof
第一个方程说的是：半径 $r$、厚度 $\dd r$ 的球壳体积为 $4\pi r^2\dd r$，质量 $\dd m = 4\pi r^2\rho\,\dd r$。

对于第二个，考察球壳的一小块：夹在 $r$ 与 $r + \dd r$ 之间、横截面积为 $A$ 的薄板，质量 $\rho A\,\dd r$。由 [[mechanics/gravitation]] 的壳层定理，只有半径 $r$ 内的质量 $m(r)$ 对它有引力，且像集中在球心一样地吸引，向内的力为 $G\,m(r)\,\rho A\,\dd r/r^2$。周围流体以 $P(r)A$ 的力向外推薄板的内表面，以 $P(r + \dd r)A$ 的力向内推外表面。平衡时合力为零：

$$
P(r)A - P(r + \dd r)A - \frac{G\,m(r)\,\rho A\,\dd r}{r^2} = 0.
$$

除以 $A\,\dd r$ 并令 $\dd r \to 0$ 得第二个方程。薄板侧面的压力由对称性相消。对静止流体，这与 [[mechanics/fluids]] 中的平衡是同一种平衡，只是把 $g$ 换成了局域的 $Gm(r)/r^2$。
:::

压强必须向外递减，并且在表面 $r = R$（那里 $m = M$）处必须落到（几乎）零。三个未知函数 $\rho$、$P$ 与 $m$ 只有两个方程是不够的。第三个关系——把 $P$ 与 $\rho$、温度联系起来的**物态方程**——连同能量流动的方程把方程组封闭。但即便没有它们，[[#eq-hydrostatic]] 也能给出估计。

::: example 太阳中心压强有多高？ {#ex-pressure}
把 $\dd P/\dd r$ 换成 $-P_c/R$、把 $m$ 与 $\rho$ 换成典型值 $M/2$ 与平均密度 $\bar\rho$，估计太阳的中心压强。然后用理想气体状态方程、平均粒子质量 $\mu m_H$（$\mu = 0.6$）估计中心温度。
::: solution
平均密度为

$$
\bar\rho = \frac{M_\odot}{\tfrac43\pi R_\odot^3} = \frac{1.988\times 10^{30}}{1.410\times 10^{27}}\,\mathrm{kg/m^3} = 1.41\times 10^{3}\,\mathrm{kg/m^3},
$$

比水略大。用这些粗略替换，

$$
\frac{P_c}{R_\odot} \approx \frac{G(M_\odot/2)\bar\rho}{(R_\odot/2)^2}, \qquad P_c \approx \frac{2GM_\odot\bar\rho}{R_\odot} = \frac{2\times 1.327\times 10^{20}\times 1.41\times 10^{3}}{6.957\times 10^{8}}\,\mathrm{Pa} = 5.4\times 10^{14}\,\mathrm{Pa}.
$$

细致的标准太阳模型给出 $2.5\times 10^{16}\,\mathrm{Pa}$：我们的估计偏低，因为太阳强烈地向中心集中，中心密度约 $1.5\times 10^{5}\,\mathrm{kg/m^3}$，是平均值的百倍。一个不依赖这类细节的估计，是习题中证明的严格下限 $P_c > GM^2/(8\pi R^4) = 4.5\times 10^{13}\,\mathrm{Pa}$。

至于温度，理想气体有 $P = \rho k_BT/(\mu m_H)$，其中 $\mu$ 是以氢质量为单位、每个粒子的平均质量；对全电离的太阳成分气体 $\mu \approx 0.6$。用同样的粗略估计，$P_c \sim GM\bar\rho/R$、$\rho \sim \bar\rho$，

$$
k_BT_c \sim \frac{GM_\odot\,\mu m_H}{R_\odot}, \qquad T_c \sim \frac{1.327\times 10^{20}\times 0.6\times 1.674\times 10^{-27}}{1.381\times 10^{-23}\times 6.957\times 10^{8}}\,\mathrm{K} = 1.4\times 10^{7}\,\mathrm{K}.
$$

标准太阳模型给出 $1.57\times 10^{7}\,\mathrm{K}$。这份一致有一部分是运气，因为 $P_c$ 与 $\rho_c$ 的误差相消，但标度 $k_BT_c \sim GM\mu m_H/R$ 是稳健的：中心每个粒子的热运动能与每个粒子的引力束缚能相当。在 $1.4\times 10^{7}\,\mathrm{K}$，$k_BT = 1.2\,\mathrm{keV}$，足以靠量子隧穿维持质子–质子链，[[particles/reactions]] 对此有解释。
:::
:::

## 位力定理 {#virial}

流体静力平衡有一个整体推论，把恒星的总热运动能与引力能联系起来。

::: definition 引力势能与热运动能 {#def-energies}
球对称恒星的**引力势能**为

$$
U = -\int_0^M\frac{G\,m}{r}\,\dd m,
$$

即一层一层把它从无穷远搭建起来所需做的功。对于由理想单原子气体构成的恒星，**热运动（动能）**为 $K = \int\tfrac32 P\,\dd V$，因为这种气体的动能密度是 $\tfrac32 P$。
:::

对均匀球，$m = M r^3/R^3$、$\dd m = 3Mr^2\,\dd r/R^3$，所以

$$
U = -\int_0^R\frac{G M r^3/R^3}{r}\,\frac{3Mr^2}{R^3}\,\dd r = -\frac{3GM^2}{R^6}\int_0^R r^4\,\dd r = -\frac{3}{5}\,\frac{GM^2}{R}.
$$ {#eq-uniform-u}

真实的恒星向中心集中，所以它们的 $U$ 更负；对太阳约为 $-1.5\,GM^2/R$（对多方指数为 $n$ 的多方球是 $-\tfrac{3}{5-n}GM^2/R$）。

::: theorem 恒星的位力定理 {#thm-virial}
对表面压强为零、处于流体静力平衡的恒星，

$$
3\int P\,\dd V + U = 0.
$$

若恒星是理想单原子气体，则 $2K + U = 0$，其总能量为

$$
E = K + U = \tfrac12 U = -K.
$$ {#eq-virial}
:::

::: proof
把 [[#eq-hydrostatic]] 的第二式乘以 $4\pi r^3$，从球心积分到表面：

$$
\int_0^R 4\pi r^3\,\deriv{P}{r}\,\dd r = -\int_0^R\frac{G\,m}{r}\,4\pi r^2\rho\,\dd r = -\int_0^M\frac{G\,m}{r}\,\dd m = U,
$$

其中用到 $\dd m = 4\pi r^2\rho\,\dd r$。对左端分部积分：

$$
\int_0^R 4\pi r^3\,\deriv{P}{r}\,\dd r = \Bigl[4\pi r^3P\Bigr]_0^R - \int_0^R 12\pi r^2P\,\dd r = 0 - 3\int P\,\dd V,
$$

因为边界项在 $r = 0$ 处由于 $r^3$ 而消失、在 $r = R$ 处由于 $P(R) = 0$ 而消失，且 $\dd V = 4\pi r^2\dd r$。于是 $-3\int P\,\dd V = U$，此即第一条结论。对理想单原子气体，由 [[#def-energies]]，$\int P\,\dd V = \tfrac23 K$，故 $2K + U = 0$。于是 $E = K + U = -\tfrac12U + U = \tfrac12U$，同时 $E = -K$。
:::

这个结果令人吃惊。恒星的总能量是负的，且等于其热运动能的相反数。若恒星辐射能量，$E$ 减小，于是 $K = -E$ *增大*：恒星随能量损失而升温。收缩释放的引力能一半用来加热气体，另一半辐射出去。自引力气体具有负热容。正是这一点让收缩中的原恒星把自己加热到点燃聚变；也正是这一点让带有核能源的恒星保持稳定：若它产生过多能量，它就膨胀、冷却，反应率随之下降。

::: example 太阳的平均温度 {#ex-mean-temperature}
把太阳当作 $\mu = 0.6$ 的电离均匀气体球。用位力定理求它的平均温度。
::: solution
粒子数为 $N = M/(\mu m_H)$，热运动能为 $K = \tfrac32 Nk_B\bar T$。位力定理与 [[#eq-uniform-u]] 一起给出

$$
2\times\frac32\,\frac{M}{\mu m_H}\,k_B\bar T = \frac35\,\frac{GM^2}{R}, \qquad \bar T = \frac{GM\mu m_H}{5k_BR}.
$$

数值上，

$$
\bar T = \frac{1.327\times 10^{20}\times 0.6\times 1.674\times 10^{-27}}{5\times 1.381\times 10^{-23}\times 6.957\times 10^{8}}\,\mathrm{K} = 2.8\times 10^{6}\,\mathrm{K}.
$$

这是按质量加权的平均；表面是 $5772\,\mathrm{K}$，中心是 $1.6\times 10^{7}\,\mathrm{K}$。任何靠自身引力聚拢的气体都有 $k_B\bar T$ 处于 $GM\mu m_H/R$ 的量级。同样的估计给出星系团中热气体的温度，$10^{7}$–$10^{8}\,\mathrm{K}$，这就是星系团发 X 射线的原因。
:::
:::

### 两个时标

::: definition 开尔文–赫姆霍兹时标与核时标 {#def-timescales}
**开尔文–赫姆霍兹时标**是一颗光度为 $L$ 的恒星单靠引力收缩释放的能量所能燃烧的时间，

$$
t_{\mathrm{KH}} = \frac{\lvert E\rvert}{L} \approx \frac{GM^2}{2RL}.
$$

**核时标**是它靠聚变自身质量份额 $f$ 的燃料、释放燃料静止能量份额 $\epsilon$ 所能燃烧的时间，

$$
t_{\mathrm{nuc}} = \frac{\epsilon f Mc^2}{L}.
$$

氢烧到氦，$\epsilon = 0.007$；主序上 $f \approx 0.1$——被烧掉的是核心里的那部分氢。
:::

对太阳，

$$
t_{\mathrm{KH}} = \frac{1.327\times 10^{20}\times 1.988\times 10^{30}}{2\times 6.957\times 10^{8}\times 3.828\times 10^{26}}\,\mathrm{s} = 4.95\times 10^{14}\,\mathrm{s} = 1.6\times 10^{7}\ \text{年},
$$

其中用到 $\lvert E\rvert = \tfrac12\lvert U\rvert$、$\lvert U\rvert \approx GM^2/R$。1850 与 1860 年代，赫尔曼·冯·亥姆霍兹（Hermann von Helmholtz）与威廉·汤姆孙（William Thomson，即后来的开尔文勋爵）提出收缩是太阳的能量来源，并断定太阳至多几千万岁。地质学家与达尔文需要的是几亿年。地质学家是对的：放射性定年给太阳系的年龄是 $4.57\times 10^{9}$ 年，收缩不可能是答案。核时标为

$$
t_{\mathrm{nuc}} = \frac{0.007\times 0.1\times 1.988\times 10^{30}\times(2.998\times 10^{8})^2}{3.828\times 10^{26}}\,\mathrm{s} = 3.27\times 10^{17}\,\mathrm{s} = 1.0\times 10^{10}\ \text{年},
$$

绰绰有余。太阳正走到主序生命的中点附近。

::: warning 位力定理并不说恒星处于热平衡
位力定理把处于*力学*平衡的恒星的总热运动能与引力能联系起来。它并不说恒星温度均匀，也不说恒星与外界处于热动平衡：恒星里面热、外面冷，并且源源不断地向空间倾泻能量。定理在快速坍缩期间也不成立，那时 [[#eq-hydrostatic]] 中略去的加速项不可忽略。力学平衡在动力学时标上重新建立——对太阳约半小时——远短于 $t_{\mathrm{KH}}$ 与 $t_{\mathrm{nuc}}$ 中的任何一个，这就是位力定理适用面如此之广的原因。
:::

::: example 太阳的动力学时标 {#ex-free-fall}
假如太阳的压强突然消失，它要花多长时间坍缩？把这建模为以太阳平均密度作自由下落的无压均匀球，其坍缩时间为 $t_{\mathrm{ff}} = \sqrt{3\pi/(32G\bar\rho)}$。
::: solution
这个公式来自把最外层球壳当作从 $R$ 处由静止开始、径向落向点质量 $M$ 的物体：那是半长轴 $R/2$ 的退化开普勒椭圆，下落耗时为其周期之半，$\tfrac12\cdot 2\pi\sqrt{(R/2)^3/(GM)} = \pi\sqrt{R^3/(8GM)}$。把 $M = \tfrac43\pi R^3\bar\rho$ 代入即得 $\sqrt{3\pi/(32G\bar\rho)}$。内层每一层球壳花的时间都相同，因为每一层包围的平均密度相同。取 $\bar\rho = 1.41\times 10^{3}\,\mathrm{kg/m^3}$，

$$
t_{\mathrm{ff}} = \sqrt{\frac{3\pi}{32\times 6.674\times 10^{-11}\times 1.41\times 10^{3}}}\,\mathrm{s} = \sqrt{3.13\times 10^{6}}\,\mathrm{s} = 1.77\times 10^{3}\,\mathrm{s},
$$

约 $30$ 分钟。声波穿过太阳也要差不多这么长时间，这并非巧合：在平衡态，声速 $\sim\sqrt{P/\rho}$ 与逃逸速度相当。太阳能在一个小时之内对任何力学失衡作出响应，而它的热时标与核时标分别是 $10^{7}$ 年和 $10^{10}$ 年。正是这种悬殊的分离，使流体静力平衡成为如此之好的近似。
:::
:::

::: quiz
一颗恒星在缓慢收缩的同时辐射能量，始终接近流体静力平衡，且尚未点燃聚变。哪个说法正确？
- [ ] 它的内部变冷，因为它在损失能量。
- [x] 它的内部升温；释放的引力能一半被辐射掉，一半加热了气体。
- [ ] 释放的引力能全部被辐射掉，所以温度不变。
- [ ] 它的总能量增加，因为引力能被释放了出来。
::: solution
由 [[#thm-virial]]，$E = \tfrac12U$ 且 $K = -\tfrac12U$。收缩使 $U$ 更负某个量 $\Delta U < 0$。于是 $\Delta K = -\tfrac12\Delta U > 0$，气体被加热；而 $\Delta E = \tfrac12\Delta U < 0$，正是辐射掉的能量。对自引力气体，损失能量与升温结伴而行。原恒星的核心正是靠这个达到氢聚变所需的一千万开尔文。
:::
:::

## 能量传输与质光关系 {#luminosity}

核心产生的能量必须走出来。在太阳内部按半径算的前 $70\%$，能量以辐射的形式、靠光子被吸收再发射无数次构成的随机行走向外扩散；在外层则由对流携带。对辐射扩散，能量流正比于辐射能量密度 $aT^4$ 的梯度——其中 $a = 4\sigma/c$ 是辐射常数——且反比于不透明度 $\kappa$，即单位质量的截面：

$$
L(r) = -\frac{16\pi acr^2T^3}{3\kappa\rho}\,\deriv{T}{r}.
$$ {#eq-radiative}

这个方程我们直接引用；它是 [[thermodynamics/kinetic-theory]] 的扩散方程用于平均自由程为 $1/(\kappa\rho)$ 的光子气体。把流体静力方程、物态方程、产能率与 [[#eq-radiative]] 放在一起，恒星结构就是一个用数值求解的边值问题。但标度关系可以直接读出来。

::: proposition 质光关系的标度 {#prop-mass-luminosity}
对结构相似、由理想气体压强支撑、能量靠辐射扩散传输且不透明度为常数的恒星，光度按

$$
L \propto \frac{\mu^4M^3}{\kappa}
$$

标度，与半径以及能量如何产生无关。
:::

::: proof
对结构相似的恒星，对应点上的每个量都按其标志值标度：$\rho \propto M/R^3$，而由 [[#ex-pressure]]，$T \propto \mu M/R$。在 [[#eq-radiative]] 中把 $\dd T/\dd r$ 换成 $T/R$、$r$ 换成 $R$、$\rho$ 换成 $M/R^3$：

$$
L \propto \frac{R^2T^3}{\kappa M/R^3}\cdot\frac{T}{R} = \frac{R^4T^4}{\kappa M} \propto \frac{R^4}{\kappa M}\Bigl(\frac{\mu M}{R}\Bigr)^4 = \frac{\mu^4M^3}{\kappa}.
$$

半径消掉了。能量来源根本没有出场：它决定半径（恒星调整自己的大小，直到核心热到恰好产生 $L$），但不决定 $L$ 本身。
:::

观测到的主序星在约 $1$ 到 $20\,M_\odot$ 之间大致服从 $L \propto M^{3.5}$；更陡的指数主要来自不透明度随温度而降低。主序寿命于是为

$$
t_{\mathrm{MS}} \propto \frac{M}{L} \propto M^{-2.5}, \qquad t_{\mathrm{MS}} \approx 10^{10}\ \text{年}\times\Bigl(\frac{M}{M_\odot}\Bigr)^{-2.5}.
$$ {#eq-lifetime}

大质量恒星燃料更多，但烧快了太多，因而英年早逝。

::: widget plot
f: 10*x^(-2.5)
x: 0.5, 10
y: 0, 60
labels: 主序寿命（十亿年）
caption: 主序寿命（十亿年）对以太阳质量计的恒星质量，按 $t \approx 10\,\mathrm{Gyr}\times(M/M_\odot)^{-2.5}$。$x = 1$ 处是太阳的一百亿年。移到 $x = 0.8$：$17.5\,\mathrm{Gyr}$，比宇宙年龄还长，所以还没有任何 $0.8\,M_\odot$ 或更小的恒星离开主序。移到 $x = 10$：约 $3$ 千万年，短到星系里最亮的恒星恰好标记出最近恒星诞生的地方。
:::

::: example 星团的年龄 {#ex-cluster}
在一个星团里，所有恒星几乎在同一时刻形成。某个星团中，$2.0\,M_\odot$ 的恒星正开始离开主序。估算这个星团的年龄。
::: solution
仍在主序上的最大质量恒星，其寿命等于星团的年龄。由 [[#eq-lifetime]]，

$$
t \approx 10^{10}\times 2.0^{-2.5}\ \text{年} = 10^{10}\times 0.177\ \text{年} = 1.8\times 10^{9}\ \text{年}.
$$

这个"拐点"方法给星团定年。最老的球状星团拐点质量在 $0.8\,M_\odot$ 附近，年龄在 $120$ 到 $130$ 亿年之间，[[gravitation/cosmology]] 将把它与宇宙年龄比较。
:::
:::

::: application 爱丁顿极限
辐射不仅携带能量，也携带动量。涌出恒星的光子通过汤姆孙散射（截面 $\sigma_T = 6.652\times 10^{-29}\,\mathrm{m^2}$）推挤电子，电子又靠静电力拖着质子一起走。在距离 $r$ 处，每个质子–电子对受到的向外力为 $L\sigma_T/(4\pi r^2c)$；向内的引力为 $GMm_p/r^2$。两者都按 $1/r^2$ 衰减，所以只要 $L$ 超过**爱丁顿光度**

$$
L_{\mathrm{Edd}} = \frac{4\pi GMm_pc}{\sigma_T} = 1.26\times 10^{31}\,\mathrm{W}\times\frac{M}{M_\odot} = 3.3\times 10^{4}\,L_\odot\times\frac{M}{M_\odot},
$$

辐射就处处取胜。由于主序光度按 $M^{3.5}$ 增长而 $L_{\mathrm{Edd}}$ 只按 $M$ 增长，足够大质量的恒星会逼近这个极限，并在强烈的星风中甩掉外层。同一个极限也给黑洞稳定吸积的速率封顶；最亮的类星体以 $10^{9}\,M_\odot$ 黑洞的爱丁顿光度附近的亮度发光。
:::

## 白矮星与钱德拉塞卡极限 {#white-dwarfs}

当一颗像太阳的恒星把核心氢烧成氦、又把氦烧成碳和氧之后，它会抛掉外层，留下一个约 $0.6\,M_\odot$、不再产生能量的热核。随着冷却，它的热压强会下降，若没有别的东西支撑，它将在没有下限的情况下收缩（由位力定理）。支撑它的是量子力学。电子被挤得如此紧密，泡利不相容原理迫使它们大多数进入高动量态，哪怕在零温。这个**简并压**已在 [[statistical-mechanics/bose-fermi]] 中导出，那里还把它用在了天狼星 B 上。我们需要那里的两个结果。

- 对数密度为 $n_e$ 的非相对论电子，简并压为 $P = K_1 n_e^{5/3}$，其中 $K_1 = (3\pi^2)^{2/3}\hbar^2/(5m_e)$。
- 当费米动量 $\hbar(3\pi^2n_e)^{1/3}$ 超过 $m_ec$，电子变成相对论性的；在极限情形 $P = K_2 n_e^{4/3}$，其中 $K_2 = (3\pi^2)^{1/3}\hbar c/4$。

压强不依赖温度。白矮星可以冷却到绝对零度而保持大小。质量由核子承担，每个电子对应 $\mu_e$ 个核子质量；氦、碳或氧的 $\mu_e = 2$。

::: proposition 朗道关于极限质量的论证 {#prop-landau}
考虑一颗由 $N = M/(\mu_em_H)$ 个电子的简并压支撑、质量 $M$、半径 $R$ 的恒星。若电子是超相对论的，则每个电子的费米能与每个电子的引力能都按 $1/R$ 标度，而恒星只有当 $M$ 低于量级如下的临界质量时才有稳定平衡：

$$
M_{\mathrm{crit}} \sim \frac{1}{(\mu_em_H)^2}\Bigl(\frac{\hbar c}{G}\Bigr)^{3/2} = \frac{1.85\,M_\odot}{\mu_e^2}.
$$
:::

::: proof
电子数密度 $n_e \sim N/R^3$，所以费米动量 $p_F \sim \hbar n_e^{1/3} \sim \hbar N^{1/3}/R$。对超相对论电子，每个电子的能量 $E_F \sim p_Fc \sim \hbar cN^{1/3}/R$。每个电子的引力能量级为 $-GM\mu_em_H/R$，因为每个电子拴着 $\mu_em_H$ 的核子质量。每个电子的能量为

$$
\varepsilon(R) \sim \frac{\hbar cN^{1/3} - GM\mu_em_H}{R} = \frac{\hbar cN^{1/3} - GN(\mu_em_H)^2}{R}.
$$

若分子为正，$\varepsilon$ 随 $R$ 增大而减小：恒星膨胀，直到电子不再是超相对论的——此时 $E_F \sim p_F^2/(2m_e)$ 在小 $R$ 处只按 $1/R^2$ 增长，$\varepsilon$ 出现稳定的极小。这就是普通的白矮星。若分子为负，$\varepsilon$ 在 $R \to 0$ 时无界下降：没有任何东西能阻止坍缩。分界线是 $\hbar cN^{1/3} = GN(\mu_em_H)^2$，即 $N^{2/3} = \hbar c/(G\mu_e^2m_H^2)$，亦即

$$
N_{\mathrm{crit}} = \Bigl(\frac{\hbar c}{G}\Bigr)^{3/2}\frac{1}{(\mu_em_H)^3}, \qquad M_{\mathrm{crit}} = N_{\mathrm{crit}}\,\mu_em_H = \Bigl(\frac{\hbar c}{G}\Bigr)^{3/2}\frac{1}{(\mu_em_H)^2}.
$$

由 $\hbar c/G = 4.737\times 10^{-16}\,\mathrm{kg^2}$、$(\hbar c/G)^{3/2} = 1.031\times 10^{-23}\,\mathrm{kg^3}$，除以 $m_H^2 = 2.801\times 10^{-54}\,\mathrm{kg^2}$ 得 $3.68\times 10^{30}\,\mathrm{kg} = 1.85\,M_\odot$。量级估算中丢掉的数值因子都是一量级的。
:::

精确计算由苏布拉马尼扬·钱德拉塞卡（Subrahmanyan Chandrasekhar）在 1931 年完成：用能在 $n^{5/3}$ 与 $n^{4/3}$ 之间过渡的完整简并物态方程求解流体静力方程。它给出**钱德拉塞卡极限**

$$
M_{\mathrm{Ch}} = \frac{5.83}{\mu_e^2}\,M_\odot,
$$ {#eq-chandrasekhar}

对 $\mu_e = 2$ 为 $1.46\,M_\odot$。静电修正与逆 $\beta$ 衰变的开始——极高密度下电子被核俘获——把它略微压低，到约 $1.4\,M_\odot$。凡测过质量的白矮星都在它之下。

::: widget plot
f: 0.0112*(x/1.456)^(-1/3)*sqrt(1 - (x/1.456)^(4/3))*695700
x: 0.1, 1.456
y: 0, 25000
labels: 白矮星半径（km）
caption: 冷碳–氧白矮星的半径（公里）对以太阳质量计的质量，取自 Nauenberg（1972）对钱德拉塞卡解的拟合。与寻常恒星不同，白矮星越重反而*越小*：低质量端 $R \propto M^{-1/3}$，即非相对论简并的结果。移到 $x = 0.6$——典型的白矮星——约 $8700\,\mathrm{km}$，比地球还大。移到 $x = 1.0$：约 $5600\,\mathrm{km}$，接近天狼星 B。$x$ 逼近 $1.456$ 时半径降为零：电子变成相对论性的，其压强再也追不上引力。
:::

::: quiz
一颗 $0.6\,M_\odot$ 的白矮星从伴星吸积物质，增长到 $1.0\,M_\odot$，同时保持寒冷。它的半径会发生什么？
- [ ] 变大，约按 $M^{1/3}$，像一团密度固定的普通物质球。
- [x] 缩小，先约按 $M^{-1/3}$，随着质量逼近钱德拉塞卡极限而缩得更快。
- [ ] 不变，因为简并压与质量无关。
- [ ] 立即缩到零，因为 $1.0\,M_\odot$ 超过了极限。
::: solution
质量更大的白矮星引力更强，必须由更高的简并压平衡，而更高的简并压要求更高的电子密度，所以星更小。对非相对论简并，把 $P \propto n^{5/3} \propto M^{5/3}/R^5$ 与 $GM^2/R^4$ 平衡，得 $R \propto M^{-1/3}$；图中给出半径从约 $8700$ 降到约 $5600\,\mathrm{km}$。$1.0\,M_\odot$ 低于约 $1.4\,M_\odot$ 的极限，所以星得以存活。
:::
:::

一颗从伴星吸积物质、逼近钱德拉塞卡极限的白矮星，会在失控的爆炸中点燃碳聚变，这就是 Ia 型超新星，白矮星本身被炸毁。因为它们几乎在相同的质量处爆发，Ia 型超新星有几乎相同的峰值光度，正是它们作为标准烛光，在 [[gravitation/cosmology]] 中揭示了加速膨胀。

## 中子星 {#neutron-stars}

大质量恒星（$8\,M_\odot$ 以上）一路烧出一个铁核。如 [[particles/nuclear-structure]] 所示，铁按每个核子算的结合能最高，所以再没有任何聚变能释放能量。当铁核超过钱德拉塞卡质量——对 $\mu_e \approx 2.15$ 约 $1.2$–$1.4\,M_\odot$——它在一秒之内坍缩。电子被质子俘获，$p + e^- \to n + \nu_e$，核心变成一个径约 $12\,\mathrm{km}$ 的中子球，密度与一个原子核相当。内落的外层反弹并被抛射出去，成为一场核坍缩超新星，其动力主要来自中微子——它们带走引力束缚能，约几倍 $10^{46}\,\mathrm{J}$。残骸是一颗**中子星**。

::: example 一茶匙中子星 {#ex-neutron-density}
一颗中子星质量 $1.40\,M_\odot$、半径 $12.0\,\mathrm{km}$。求它的平均密度、牛顿表面重力，以及逃逸速度与 $c$ 之比。
::: solution
平均密度为

$$
\bar\rho = \frac{1.40\times 1.988\times 10^{30}}{\tfrac43\pi(1.20\times 10^{4})^3}\,\mathrm{kg/m^3} = \frac{2.783\times 10^{30}}{7.238\times 10^{12}}\,\mathrm{kg/m^3} = 3.8\times 10^{17}\,\mathrm{kg/m^3},
$$

约为核物质密度 $2.7\times 10^{17}\,\mathrm{kg/m^3}$ 的一点五倍。$5\,\mathrm{cm^3}$ 的一茶匙物质将有 $2\times 10^{12}\,\mathrm{kg}$ 的质量，比一座山还重。表面重力为

$$
g = \frac{GM}{R^2} = \frac{1.40\times 1.327\times 10^{20}}{(1.20\times 10^{4})^2}\,\mathrm{m/s^2} = 1.3\times 10^{12}\,\mathrm{m/s^2},
$$

逃逸速度为 $\sqrt{2GM/R} = c\sqrt{r_s/R} = c\sqrt{0.345} = 0.59\,c$。牛顿引力已经不再够用：$r_s/R = 0.345$，正是 [[gravitation/schwarzschild]] 中给出表面红移 $0.235$ 的那个数。
:::
:::

$r_s/R$ 为三分之一量级，中子星的结构就必须用广义相对论计算。对静态球对称理想流体，爱因斯坦方程把 [[#eq-hydrostatic]] 的第二式换成**托尔曼–奥本海默–沃尔科夫（TOV）方程**，

$$
\deriv{P}{r} = -\frac{G\bigl(\rho + P/c^2\bigr)\bigl(m + 4\pi r^3P/c^2\bigr)}{r^2\bigl(1 - 2Gm/(c^2r)\bigr)},
$$ {#eq-tov}

其中 $\rho c^2$ 现在是总能量密度，$m(r)$ 把这一切全部计入。方程我们直接引用；推导见 Hartle 第 24 章与 Schutz 第 10 章。三个修正因子每一个都大于一：压强也产生引力，压强项增大了有效质量，几何因子 $1/(1 - r_s/r)$ 在 $r_s$ 附近加强了引力。压强支撑着恒星，同时也增添了必须被支撑的引力。超过某个质量，提高中心压强只会雪上加霜，稳定的构型不复存在。

J·罗伯特·奥本海默（J. Robert Oppenheimer）与乔治·沃尔科夫（George Volkoff）在 1939 年发现，自由中子气构成的恒星最大质量只有 $0.7\,M_\odot$。核力在极高密度下硬化物态方程、抬高极限；其真实值取决于数倍核密度之下不甚为人知的核物理。观测定出下限：脉冲星 PSR J0740+6620 的质量为 $2.08 \pm 0.07\,M_\odot$，由它的脉冲掠过其白矮星伴星时的夏皮罗延迟测得。理论则为任何与因果律相容的物态方程定出约 $3\,M_\odot$ 的上限。目前的估计——综合脉冲星质量、NASA 的 NICER 仪器对中子星半径的 X 射线测量（约 $12$–$13\,\mathrm{km}$）、以及在 GW170817 中测得的潮汐形变——把不旋转中子星的最大质量定在 $2.2$–$2.3\,M_\odot$ 附近。比这更重的坍缩核心将成为黑洞，如 [[gravitation/black-holes]] 所述。

::: remark 脉冲星
坍缩守恒角动量与磁通量，所以一个从几千公里缩到 $12\,\mathrm{km}$ 的核心会加速到毫秒至秒量级的自转周期，磁场被压缩到 $10^{8}$ 特斯拉。转动的磁场把无线电波沿其轴向集中成束，若波束扫过地球，我们就看到一颗**脉冲星**。乔塞琳·贝尔·伯内尔（Jocelyn Bell Burnell）当时是安东尼·休伊什（Antony Hewish）组里的研究生，1967 年发现了第一颗。脉冲星是已知最稳定的钟之一，[[gravitation/gravitational-waves]] 中的检验与脉冲星计时阵列都因此成为可能。
:::

::: history 爱丁顿、钱德拉塞卡与恒星的尽头
赫尔曼·冯·亥姆霍兹 1854 年与威廉·汤姆孙 1862 年从引力收缩估算了太阳的年龄。阿瑟·爱丁顿（Arthur Eddington）的《恒星的内部结构》（*The Internal Constitution of the Stars*，1926）建立了辐射平衡理论，并论证亚原子能驱动着太阳；汉斯·贝特（Hans Bethe）1939 年指认出具体的聚变反应，并因此获 1967 年诺贝尔物理学奖。拉尔夫·福勒（Ralph Fowler）1926 年用新问世的费米–狄拉克统计表明白矮星由电子简并压支撑。1930 年，在从印度驶往英国的轮船上，苏布拉马尼扬·钱德拉塞卡意识到相对论性电子给出一个极限质量，并于 1931 年发表。爱丁顿 1935 年对这个结果极尽嘲讽；钱德拉塞卡极限站住了，他本人分享了 1983 年诺贝尔奖。列夫·朗道在 1932 年给出了能量论证。

沃尔特·巴德（Walter Baade）与弗里茨·兹威基（Fritz Zwicky）1934 年提出超新星形成中子星，那在詹姆斯·查德威克发现中子两年之后。J·罗伯特·奥本海默与乔治·沃尔科夫用理查德·托尔曼也推导过的同一个物态方程，在 1939 年算出了最早的中子星模型。乔塞琳·贝尔·伯内尔与安东尼·休伊什 1967 年发现脉冲星，休伊什分享了 1974 年诺贝尔奖。
:::

## 后续内容 {#leads}

本章的方程配上详细的不透明度、核反应率与对流处理，在恒星演化程序中数值求解，跟踪一颗恒星从诞生到终结的一生。决定 $t_{\mathrm{nuc}}$ 的质子–质子链与 CNO 循环见 [[particles/reactions]]。来自太阳核心的中微子直接证实了核心正按预言的温度燃烧氢。核心超过中子星极限时形成的黑洞见 [[gravitation/black-holes]]，而 [[gravitation/gravitational-waves]] 中看到的中子星并合测量的是中子星的物态方程。Ia 型超新星在钱德拉塞卡质量附近爆发，是 [[gravitation/cosmology]] 的标准烛光。

::: summary
- 静态恒星服从 $\dd m/\dd r = 4\pi r^2\rho$ 与 $\dd P/\dd r = -Gm\rho/r^2$；物态方程与能量传输把方程组补足。
- 量级平衡给出 $k_BT_c \sim GM\mu m_H/R \approx 10^{7}\,\mathrm{K}$（对太阳），热到足以点燃聚变。
- 位力定理——对单原子理想气体 $2K + U = 0$——给出 $E = U/2 = -K$：自引力恒星随能量损失而升温。
- 收缩只能供太阳燃烧 $t_{\mathrm{KH}} \approx 1.6\times 10^{7}$ 年；氢聚变供它燃烧 $t_{\mathrm{nuc}} \approx 10^{10}$ 年。
- 辐射扩散给出 $L \propto \mu^4M^3/\kappa$；观测的主序星 $L \propto M^{3.5}$，寿命 $\propto M^{-2.5}$。
- 白矮星靠电子简并压支撑，质量越大半径越小，不能超过钱德拉塞卡极限 $5.83\,M_\odot/\mu_e^2 \approx 1.4\,M_\odot$。
- 中子星约 $1.4\,M_\odot$、$12\,\mathrm{km}$，需要广义相对论（TOV 方程）；其最大质量介于实测的 $2.08\,M_\odot$ 与约 $2.3\,M_\odot$ 之间。更重的核坍缩成黑洞。
:::

## 习题 {#exercises}

::: exercise 太阳的核聚变寿命 {level=1 check="10.4"}
用 $\epsilon = 0.007$、$f = 0.10$ 计算太阳的 $t_{\mathrm{nuc}}$，以十亿年为单位（$1\ \text{年} = 3.156\times 10^{7}\,\mathrm{s}$）。
::: solution
$$
t_{\mathrm{nuc}} = \frac{0.007\times 0.10\times 1.988\times 10^{30}\times 8.988\times 10^{16}}{3.828\times 10^{26}}\,\mathrm{s} = \frac{1.2508\times 10^{44}}{3.828\times 10^{26}}\,\mathrm{s} = 3.268\times 10^{17}\,\mathrm{s}.
$$

除以 $3.156\times 10^{7}\,\mathrm{s}$ 得 $1.04\times 10^{10}$ 年，即 $104$ 亿年。
:::
:::

::: exercise 一颗五倍太阳质量的恒星 {level=1 check="179"}
利用 [[#eq-lifetime]]，估算一颗 $5.0\,M_\odot$ 恒星的主序寿命，以百万年为单位。
::: solution
$$
t \approx 10^{10}\times 5.0^{-2.5}\ \text{年} = 10^{10}\times 0.01789\ \text{年} = 1.79\times 10^{8}\ \text{年} = 179\ \text{百万年}.
$$

这颗恒星的亮度约为太阳的 $5^{3.5} = 280$ 倍。
:::
:::

::: exercise 铁核 {level=1 check="1.26"}
一个铁核的 $\mu_e = 56/26$。代入 [[#eq-chandrasekhar]] 计算它（以太阳质量为单位）。
::: solution
$\mu_e = 2.154$，故 $\mu_e^2 = 4.639$，于是

$$
M_{\mathrm{Ch}} = \frac{5.83}{4.639}\,M_\odot = 1.26\,M_\odot.
$$

铁每个核子摊到的电子数比碳略少，所以它的极限略低。热压强与其它修正使铁核实际的坍缩质量略大一些，约 $1.3$–$1.5\,M_\odot$，与中子星的质量相符。
:::
:::

::: exercise 红矮星的平均温度 {level=2 check="2.08e6"}
一颗红矮星 $M = 0.30\,M_\odot$、$R = 0.40\,R_\odot$。用 [[#ex-mean-temperature]] 的均匀球位力估计、取 $\mu = 0.6$，求它的平均温度（以开尔文计）。
::: solution
估计式 $\bar T = GM\mu m_H/(5k_BR)$ 正比于 $M/R$。对太阳它在舍入前给出 $2.77\times 10^{6}\,\mathrm{K}$。标度得

$$
\bar T = 2.77\times 10^{6}\,\mathrm{K}\times\frac{0.30}{0.40} = 2.08\times 10^{6}\,\mathrm{K}.
$$

中心温度也相应地低于太阳，这就是红矮星烧氢如此之慢、能活上万亿年的原因。（小质量恒星对流充分，所以辐射标度 $L \propto M^3$ 对它们并不适用；它们的观测光度随质量下降得更快。）
:::
:::

::: exercise 太阳的核心压强：一个下限 {level=2 check="4.48e13"}
对太阳计算下限 $P_c > GM^2/(8\pi R^4)$，以帕斯卡为单位。
::: solution
$$
\frac{GM_\odot^2}{8\pi R_\odot^4} = \frac{1.327\times 10^{20}\times 1.988\times 10^{30}}{8\pi\times(6.957\times 10^{8})^4}\,\mathrm{Pa} = \frac{2.638\times 10^{50}}{25.13\times 2.342\times 10^{35}}\,\mathrm{Pa} = 4.48\times 10^{13}\,\mathrm{Pa}.
$$

这约为 $4\times 10^{8}$ 个大气压。真正的中心压强比它大约 $500$ 倍，因为太阳比这个下限所假定的更向中心集中。
:::
:::

::: exercise 白矮星前身星的收缩 {level=2 check="2.04e-6"}
一个 $0.60\,M_\odot$ 的红巨星核心，从地球的大小 $6.4\times 10^{6}\,\mathrm{m}$ 收缩到 $6.1\times 10^{6}\,\mathrm{m}$。把它当作服从位力定理的均匀球。收缩期间辐射掉它静止能量 $Mc^2$ 的几分之几？
::: solution
由 [[#eq-virial]]，辐射的能量为 $-\Delta E = -\tfrac12\Delta U$，其中 $U = -\tfrac35GM^2/R$：

$$
-\Delta E = \frac{3}{10}\,GM^2\Bigl(\frac{1}{R_2} - \frac{1}{R_1}\Bigr).
$$

除以 $Mc^2$：

$$
\frac{-\Delta E}{Mc^2} = \frac{3}{10}\,\frac{GM}{c^2}\Bigl(\frac{1}{R_2} - \frac{1}{R_1}\Bigr) = 0.3\times 0.60\times 1476.6\,\mathrm{m}\times\Bigl(\frac{1}{6.1\times 10^{6}} - \frac{1}{6.4\times 10^{6}}\Bigr)\mathrm{m^{-1}}.
$$

括号为 $(1.6393 - 1.5625)\times 10^{-7} = 7.68\times 10^{-9}$，前面的因子是 $265.8\,\mathrm{m}$，所以比例为 $2.04\times 10^{-6}$。等量的能量用于加热核心。与氢聚变每单位静止质量释放的 $0.007$ 相比，白矮星尺度的收缩是一个温和的能量来源，但正是它把核心加热到点燃氦所需的一亿开尔文。
:::
:::

::: exercise 大质量恒星的爱丁顿极限 {level=2 check="6.6e5"}
求 $20\,M_\odot$ 恒星的爱丁顿光度（以 $L_\odot$ 为单位），并与质光关系给出的光度 $L \approx 20^{3.5}L_\odot$ 比较。
::: solution
$L_{\mathrm{Edd}} = 3.28\times 10^{4}\,L_\odot\times 20 = 6.6\times 10^{5}\,L_\odot$。质光关系给出 $20^{3.5} = 3.6\times 10^{4}\,L_\odot$，约为极限的 $5\%$。真实的 $20\,M_\odot$ 恒星光度约 $5\times 10^{4}\,L_\odot$。当 $M$ 达到数百倍太阳质量时，$M^{3.5}$ 将超过 $L_{\mathrm{Edd}}$，外推的标度关系失效：质量最大的恒星在爱丁顿极限附近发光，$L \propto M$。
:::
:::

::: exercise 核心压强的严格下限 {level=3}
证明：对 $\rho \ge 0$、$P(R) = 0$ 的流体静力平衡恒星，$P_c > GM^2/(8\pi R^4)$。
::: hint
证明函数 $\Psi(r) = P(r) + Gm(r)^2/(8\pi r^4)$ 不增。
:::
::: solution
用 [[#eq-hydrostatic]] 对 $\Psi$ 求导：

$$
\Psi'(r) = -\frac{Gm\rho}{r^2} + \frac{G}{8\pi}\Bigl(\frac{2m\,m'}{r^4} - \frac{4m^2}{r^5}\Bigr) = -\frac{Gm\rho}{r^2} + \frac{G}{8\pi}\cdot\frac{2m\cdot 4\pi r^2\rho}{r^4} - \frac{Gm^2}{2\pi r^5}.
$$

前两项相消，留下

$$
\Psi'(r) = -\frac{Gm^2}{2\pi r^5} \le 0,
$$

只要在 $m > 0$ 处取严格不等号。因此 $\Psi$ 从中心到表面递减。在中心附近，$m \approx \tfrac43\pi\rho_cr^3$，所以 $m^2/r^4 \approx \tfrac{16}{9}\pi^2\rho_c^2r^2 \to 0$，$\Psi(0) = P_c$。在表面，$\Psi(R) = 0 + GM^2/(8\pi R^4)$。由于 $\Psi$ 在任何 $m > 0$ 的区间上严格递减，

$$
P_c = \Psi(0) > \Psi(R) = \frac{GM^2}{8\pi R^4}.
$$

这个下限只用到流体静力平衡与密度非负，对每颗恒星都成立，不论其物态方程或能量来源。
:::
:::

::: exercise 为什么 $\gamma = 4/3$ 是致命的 {level=3}
设恒星气体的压强与内能密度满足 $u = P/(\gamma - 1)$，$\gamma$ 为常数，于是内能为 $K = \int u\,\dd V$。证明流体静力平衡恒星的总能量为

$$
E = K + U = \frac{3\gamma - 4}{3(\gamma - 1)}\,U.
$$

由此推出：$\gamma = 4/3$ 时总能量为零，与半径无关；并解释这与钱德拉塞卡极限的联系。
::: solution
[[#thm-virial]] 的第一部分只用到流体静力平衡：$3\int P\,\dd V = -U$。由 $P = (\gamma - 1)u$，

$$
3(\gamma - 1)K = -U, \qquad K = -\frac{U}{3(\gamma - 1)}.
$$

于是

$$
E = K + U = U\Bigl(1 - \frac{1}{3(\gamma - 1)}\Bigr) = \frac{3\gamma - 3 - 1}{3(\gamma - 1)}\,U = \frac{3\gamma - 4}{3(\gamma - 1)}\,U.
$$

$\gamma = 5/3$、单原子理想气体时，这就是前面的 $E = U/2$。$\gamma > 4/3$ 时因子为正，故 $E < 0$，恒星是束缚的，收缩它使 $E$ 进一步降低；平衡是稳定的。$\gamma = 4/3$ 时因子消失：每个半径都有 $E = 0$。恒星处于束缚的边缘，膨胀或收缩都不花能量，所以最小的扰动就能使它坍缩或膨胀。

光子气体或相对论性简并电子气这类超相对论气体满足 $u = 3P$，故 $\gamma = 4/3$。接近钱德拉塞卡质量的白矮星正是由这样的气体支撑，这就是 [[#prop-landau]] 得出费米能与引力能按 $R$ 完全相同地标度的原因。主要由辐射压支撑的恒星——质量极大的恒星正是如此——同样只是勉强束缚，这也是超过约 $100\,M_\odot$ 的恒星稀少而不稳定、以剧烈喷发丢失质量的原因之一。在广义相对论中，TOV 修正把临界 $\gamma$ 值推到 $4/3$ 以上，不稳定性来得更早。
:::
:::
