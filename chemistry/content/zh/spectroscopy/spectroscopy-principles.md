把NADH溶液装入比色皿，让波长为$340\ \mathrm{nm}$的紫外光穿过它，检测器便记录下一部分不翼而飞的光。生物化学家从这一个数字就能读出精确到三位有效数字的浓度。把射电望远镜对准一片冷的分子云，它会在$115.271\ \mathrm{GHz}$处记录下一条锐线，天文学家由此推断那里有一氧化碳、它的温度以及云团运动的速度。仪器不同，光谱区不同，底下却是同样三个问题：一条谱线落在*何处*？它有多*强*？又有多*宽*？谱线的位置由分子的能级与玻尔（Bohr）条件$\Delta E = h\nu$决定；强弱取决于一个量子力学积分——跃迁偶极矩，选律也由它给出——还取决于下能级上有多少分子、光穿过多厚的样品；宽窄则取决于能级寿命的长短、分子运动的快慢和碰撞的频繁程度。

本章把这套通用的机器一次性建立起来，使后面关于转动、振动与电子光谱以及磁共振的各章可以直接引用而无需重新推导。我们先讲光谱学家使用的单位，从含时微扰理论导出跃迁速率并看出选律如何从中产生，然后加上能级布居，把跃迁速率化为朗伯-比尔定律与振子强度，最后以决定线宽的三种机制收尾。本章假定的量子力学——波函数、算符、期望值以及时-频傅里叶关系——见[[quantum-chemistry/quantum-foundations]]。常数取CODATA 2018的定义值或推荐值；$hc/k_\mathrm{B} = 1.438\,777\ \mathrm{cm\,K}$是"第二辐射常数"，凡以波数写出的玻尔兹曼因子里都有它的身影。

## 辐射、能量与光谱区

描述电磁辐射既可用频率$\nu$、真空中的波长$\lambda$，也可用波数$\tilde\nu$或单个光子的能量$E$，几种描述完全等价。光谱学的每个分支都有自己的偏好：射电与微波光谱学家报以MHz或GHz为单位的频率，红外光谱学家报以$\mathrm{cm^{-1}}$为单位的波数，紫外-可见光谱学家报以nm为单位的波长，光电子能谱学家报以eV为单位的能量。在各种单位之间熟练换算，是这门学问的第一项基本功。

::: definition 频率、波数与光子能量 {#def-units}
对于真空中波长为$\lambda$的辐射，**频率**为$\nu = c/\lambda$，**波数**为$\tilde\nu = 1/\lambda = \nu/c$（惯用单位$\mathrm{cm^{-1}}$），**光子能量**为
$$
E = h\nu = hc\tilde\nu = \frac{hc}{\lambda} .
$$ {#eq-photon}
能量为$E_\mathrm{i}$与$E_\mathrm{f}$的两个分子态之间的**光谱跃迁**吸收或发射满足**玻尔频率条件**$\lvert E_\mathrm{f} - E_\mathrm{i}\rvert = h\nu$的辐射。能级常表示为**项值**$T = E/hc$，以$\mathrm{cm^{-1}}$计，这样一条谱线的波数就只是两个项值之差。
:::

由[[#eq-photon]]可直接导出下列常用换算：

| $1\ \mathrm{cm^{-1}}$相当于 | 数值 |
|---|---|
| 每个光子的能量 | $1.986\,45\times10^{-23}\ \mathrm{J} = 1.239\,84\times10^{-4}\ \mathrm{eV}$ |
| 每摩尔光子的能量 | $11.9627\ \mathrm{J\,mol^{-1}}$ |
| 频率 | $29.9792458\ \mathrm{GHz}$ |
| 温度（$E/k_\mathrm{B}$） | $1.438\,78\ \mathrm{K}$ |

且在$298.15\ \mathrm{K}$下$k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$。最后这个数是判断布居的标尺：能级间隔远小于$200\ \mathrm{cm^{-1}}$者在室温下已被热混合，远大于它者则否。

光谱的各个区域对应着不同类型的分子运动，因为各类运动的能隙相差若干个数量级：

| 光谱区 | 典型$\tilde\nu$ / $\mathrm{cm^{-1}}$ | 典型$\lambda$ | 改变的是什么 |
|---|---|---|---|
| 射频 | $10^{-3}$–$10^{-2}$ | 米 | 核自旋取向（NMR） |
| 微波 | $0.1$–$10$ | 厘米–毫米 | 电子自旋（EPR）；分子转动 |
| 远红外 | $10$–$400$ | $1\ \mathrm{mm}$–$25\ \mu\mathrm{m}$ | 轻分子的转动；低频振动 |
| 中红外 | $400$–$4000$ | $25$–$2.5\ \mu\mathrm{m}$ | 振动 |
| 可见光与紫外 | $1.4\times10^4$–$10^5$ | $700$–$100\ \mathrm{nm}$ | 价电子 |
| X射线 | $> 10^6$ | $< 10\ \mathrm{nm}$ | 内层电子 |

::: example 光谱单位之间的换算 {#ex-units}
(a) 某酮的羰基伸缩振动在$1715\ \mathrm{cm^{-1}}$处吸收。给出它的波长、频率以及每摩尔光子的能量。(b) 一台$600\ \mathrm{MHz}$的核磁共振谱仪所激发的质子，其光子每摩尔的能量是多少？(c) 把两者与一个$500\ \mathrm{nm}$光子的能量作比较。
::: solution
(a) $\lambda = 1/\tilde\nu = 1/(1715\ \mathrm{cm^{-1}}) = 5.831\times10^{-4}\ \mathrm{cm} = 5.831\ \mu\mathrm{m}$；$\nu = c\tilde\nu = (2.9979\times10^{10}\ \mathrm{cm\,s^{-1}})(1715\ \mathrm{cm^{-1}}) = 5.141\times10^{13}\ \mathrm{Hz} = 51.41\ \mathrm{THz}$；以每摩尔计，$E_\mathrm{m} = N_\mathrm{A}hc\tilde\nu = 1715 \times 11.9627\ \mathrm{J\,mol^{-1}} = 20.52\ \mathrm{kJ\,mol^{-1}}$。

(b) $E_\mathrm{m} = N_\mathrm{A}h\nu = (6.0221\times10^{23}\ \mathrm{mol^{-1}})(6.6261\times10^{-34}\ \mathrm{J\,s})(6.00\times10^{8}\ \mathrm{s^{-1}}) = 0.239\ \mathrm{J\,mol^{-1}}$，即$\tilde\nu = 0.0200\ \mathrm{cm^{-1}}$。

(c) 一个$500\ \mathrm{nm}$的光子有$\tilde\nu = 2.000\times10^4\ \mathrm{cm^{-1}}$、$E = 2.480\ \mathrm{eV}$和$239.3\ \mathrm{kJ\,mol^{-1}}$——与化学键能相当，这就是紫外光能断键、而红外光与无线电波不能的原因。三种光子的能量横跨六个数量级，而这正是一个分子的转动、振动、电子与自旋光谱彼此分立的根本原因。
:::
:::

## 跃迁偶极矩与选律

为什么分子只在某些频率吸收？为什么有些跃迁很强、有些虽然满足玻尔条件却观察不到？回答的办法，是把光的振荡电场看作对分子的一个小的含时微扰。

::: definition 跃迁偶极矩 {#def-tdm}
分子的电偶极矩算符为$\hat{\boldsymbol\mu} = \sum_j q_j\hat{\boldsymbol r}_j$，对全部电子与核求和。定态$\psi_\mathrm{i}$与$\psi_\mathrm{f}$之间的**跃迁偶极矩**是矢量
$$
\boldsymbol\mu_\mathrm{fi} = \langle \mathrm{f} \vert \hat{\boldsymbol\mu} \vert \mathrm{i}\rangle = \int \psi_\mathrm{f}^*\,\hat{\boldsymbol\mu}\,\psi_\mathrm{i}\,\mathrm{d}\tau .
$$ {#eq-tdm}
若$\boldsymbol\mu_\mathrm{fi} \neq \mathbf 0$，则跃迁是**电偶极允许的**；若其为零，则是**禁戒的**。**总选律**（gross selection rule）指出要使某类光谱能够存在，分子必须具备什么性质（纯转动光谱需要永久偶极，红外光谱需要在振动过程中发生改变的偶极）；**细则选律**（specific selection rule）指出哪些量子数的改变是允许的（$\Delta J = \pm1$，$\Delta v = \pm1$，$\Delta S = 0$）。
:::

跃迁矩不是任一态的偶极矩。它度量的是分子处于两态叠加时出现的*振荡*偶极：叠加态$a\psi_\mathrm{i}\mathrm{e}^{-\mathrm{i}E_\mathrm{i}t/\hbar} + b\psi_\mathrm{f}\mathrm{e}^{-\mathrm{i}E_\mathrm{f}t/\hbar}$的$\hat{\boldsymbol\mu}$期望值含有项$2\,\mathrm{Re}(a^*b\,\boldsymbol\mu_\mathrm{if}\,\mathrm{e}^{-\mathrm{i}\omega_\mathrm{fi}t})$，即一个恰以玻尔频率$\omega_\mathrm{fi} = (E_\mathrm{f} - E_\mathrm{i})/\hbar$振荡的电荷分布。振荡偶极就是一根天线：它与同频率的光波耦合，从中吸收能量或向其辐射。若两个态之间没有跃迁矩，叠加态就不振荡，光也就无法驱动它。

::: proposition 偶极近似下的吸收速率 {#prop-rate}
设某分子有态$\mathrm i$与$\mathrm f$（$E_\mathrm{f} > E_\mathrm{i}$），处于各向同性的非偏振辐射之中，$\nu_\mathrm{fi}$附近单位频率间隔内的辐射能量密度为$\rho(\nu)$，且在线宽范围上缓变。则在场的一阶微扰下，分子由$\mathrm i$被提升到$\mathrm f$的单位时间概率为
$$
w_{\mathrm{f}\leftarrow\mathrm{i}} = B_\mathrm{fi}\,\rho(\nu_\mathrm{fi}), \qquad B_\mathrm{fi} = \frac{\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2}{6\varepsilon_0\hbar^2} ,
$$ {#eq-rate}
其中$B_\mathrm{fi}$是**吸收爱因斯坦系数**。对非简并态，由$\mathrm f$到$\mathrm i$的受激发射具有相同的系数。这一结果假定：波长远大于分子（场在分子范围内是均匀的）；微扰很弱（相互作用期间布居改变很小）；辐射带宽远大于谱线宽度。
:::

::: proof 一阶含时微扰理论
取沿$z$偏振、场强为$\mathcal E_0\cos\omega t$的光；由于波长（数百纳米以上）远大于分子，场在其范围内均匀，微扰为$\hat H'(t) = -\hat\mu_z\mathcal E_0\cos\omega t$。把态写为$\Psi = c_\mathrm{i}(t)\psi_\mathrm{i}\mathrm{e}^{-\mathrm{i}E_\mathrm{i}t/\hbar} + c_\mathrm{f}(t)\psi_\mathrm{f}\mathrm{e}^{-\mathrm{i}E_\mathrm{f}t/\hbar}$且$c_\mathrm{i}(0) = 1$。代入含时薛定谔方程并保留一阶项，得$\mathrm{i}\hbar\,\dot c_\mathrm{f} = \langle\mathrm f\vert\hat H'\vert\mathrm i\rangle\mathrm{e}^{\mathrm{i}\omega_\mathrm{fi}t}$。把余弦写成两个指数并积分，
$$
c_\mathrm{f}(t) = \frac{\mu_{z,\mathrm{fi}}\mathcal E_0}{2\hbar}\left[\frac{\mathrm{e}^{\mathrm{i}(\omega_\mathrm{fi} - \omega)t} - 1}{\omega_\mathrm{fi} - \omega} + \frac{\mathrm{e}^{\mathrm{i}(\omega_\mathrm{fi} + \omega)t} - 1}{\omega_\mathrm{fi} + \omega}\right].
$$
近共振时第一项远大于第二项，略去后者。令$\Delta = \omega_\mathrm{fi} - \omega$，由$\lvert\mathrm{e}^{\mathrm{i}\Delta t} - 1\rvert^2 = 4\sin^2(\Delta t/2)$得
$$
\lvert c_\mathrm{f}(t)\rvert^2 = \frac{\mu_{z,\mathrm{fi}}^2\mathcal E_0^2}{\hbar^2}\,\frac{\sin^2(\Delta t/2)}{\Delta^2} .
$$
对宽带光，每个频率间隔$\mathrm{d}\nu$独立地作出贡献；振幅为$\mathcal E_0$的波，其时间平均能量密度为$\tfrac12\varepsilon_0\mathcal E_0^2$，故把$\mathcal E_0^2$换成$2\rho(\nu)\,\mathrm{d}\nu/\varepsilon_0$再积分。利用$\mathrm{d}\nu = \mathrm{d}\omega/2\pi$与$\int_{-\infty}^{\infty}\sin^2(\Delta t/2)\,\Delta^{-2}\,\mathrm{d}\Delta = \pi t/2$，并把缓变的$\rho$提到积分号外，
$$
\lvert c_\mathrm{f}(t)\rvert^2 = \frac{\mu_{z,\mathrm{fi}}^2}{\hbar^2}\cdot\frac{2\rho(\nu_\mathrm{fi})}{\varepsilon_0}\cdot\frac{1}{2\pi}\cdot\frac{\pi t}{2} = \frac{\mu_{z,\mathrm{fi}}^2\,\rho(\nu_\mathrm{fi})}{2\varepsilon_0\hbar^2}\,t .
$$
概率随时间线性增长，故速率恒定。最后，对随机取向的分子与各向同性的光，$\mu_{z,\mathrm{fi}}^2$平均为$\tfrac13\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$，即得[[#eq-rate]]。受激发射是把$\mathrm i$与$\mathrm f$互换后的同一计算；因$\hat\mu$是厄米算符，$\lvert\mu_\mathrm{if}\rvert = \lvert\mu_\mathrm{fi}\rvert$。
:::

这段证明给出的教益不止公式本身。第一，速率正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$：*强度是矩阵元的平方*，一条谱线为什么强，一切都从那里开始。第二，因子$\sin^2(\Delta t/2)/\Delta^2$是角频率宽度约为$2\pi/t$的一个峰：受光照射时间为$t$的分子分辨不了间隔小于约$1/t$的两个频率。这就是[[quantum-chemistry/quantum-foundations#prop-wavepacket]]中时间-能量傅里叶关系在光谱学中的体现，讨论线宽时还要回到它。$B$与自发射系数$A$——后者决定受激态辐射的快慢——之间的关系由与黑体辐射的平衡得出，在[[spectroscopy/electronic-spectroscopy#prop-einstein]]中推导。

### 由对称性导出的选律

选律是关于某个积分为零的断言，而积分为零是出于对称性的原因。[[#eq-tdm]]的被积函数是三个函数的乘积；一个函数若在分子的某个对称操作下变号，它在全空间的积分就为零。用群论的语言（[[quantum-chemistry/molecular-symmetry]]）：

- $\boldsymbol\mu_\mathrm{fi}$能非零，仅当直积$\Gamma_\mathrm{f}\times\Gamma_\mu\times\Gamma_\mathrm{i}$包含全对称表示，其中$\Gamma_\mu$是$x$、$y$或$z$的表示。$z$偏振的跃迁要求$\Gamma_\mathrm{f}\times\Gamma_\mathrm{i}$包含$\Gamma_z$，其余类推。
- 在中心对称体系中$\hat{\boldsymbol\mu}$关于反演是奇的，所以只有$g \leftrightarrow u$跃迁是允许的（**拉波特（Laporte）规则**）。
- $\hat{\boldsymbol\mu}$不对自旋起作用，所以要使积分非零，两个波函数的自旋部分必须完全相同：$\Delta S = 0$。
- 光子携带一份角动量，因此吸收或发射一个光子时，分子的总角动量至多改变一个单位：$\Delta J = 0, \pm1$，宇称还带来进一步的限制。

这些规则只在电偶极近似下成立。较弱的机制——磁偶极与电四极跃迁、把单重态与三重态混合的自旋-轨道耦合、破坏对称中心的振动——会让"禁戒"跃迁通过，其强度通常只有允许跃迁的$10^{-3}$到$10^{-8}$。磷光、多数八面体过渡金属配合物的颜色以及水的蓝色，都是靠这些机制变得可见的禁戒跃迁。

::: example 势箱中粒子的选律 {#ex-pib}
长度为$L$的一维势箱中的电子，其波函数为$\psi_n = \sqrt{2/L}\sin(n\pi x/L)$。(a) 证明跃迁$n \to n'$只有当$n + n'$为奇数时才是允许的。(b) 计算$\mu_{21}$，并借此讨论把丁二烯-1,3建模为四个$\pi$电子置于长度$L = 560\ \mathrm{pm}$（四个$140\ \mathrm{pm}$的C–C键长）的势箱中时的HOMO → LUMO跃迁。
::: solution
(a) 以箱中心为原点度量$x$，$x = L/2 + s$。在反映$s \to -s$下，$\psi_n$对奇数$n$为偶函数、对偶数$n$为奇函数，而偶极算符$-es$是奇的。因此被积函数$\psi_{n'}(-es)\psi_n$为偶函数——积分才可能非零——仅当$\psi_n$与$\psi_{n'}$宇称相反，即$n + n'$为奇数。（$x$中常数$L/2$的部分给出$-\tfrac{eL}{2}\langle n'\vert n\rangle = 0$，由正交性为零。）所以$1\to2$与$2\to3$允许，$1 \to 3$禁戒。

(b) 计算积分，
$$
\langle 2 \vert x\vert 1\rangle = \frac{2}{L}\int_0^L x\sin\frac{\pi x}{L}\sin\frac{2\pi x}{L}\,\mathrm{d}x = -\frac{16L}{9\pi^2} = -0.180\,L ,
$$
类似地$\langle 3\vert x\vert 2\rangle = -0.195\,L$。对丁二烯-1,3，四个$\pi$电子填满$n = 1$与$2$，故最低跃迁是$2 \to 3$，其$\Delta E = 5h^2/8m_\mathrm{e}L^2$；取$L = 560\ \mathrm{pm}$得$\tilde\nu = 4.84\times10^{4}\ \mathrm{cm^{-1}}$（$\lambda = 207\ \mathrm{nm}$）——接近实测的谱带$217\ \mathrm{nm}$。单电子跃迁矩为$e \times 0.195 \times 560\ \mathrm{pm} = 1.75\times10^{-29}\ \mathrm{C\,m} = 5.2\ \mathrm{D}$，数值非常大，而这条谱带也确实是有机化学中最强的谱带之一（$\varepsilon_\mathrm{max} \approx 2\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$）。宇称选律是拉波特规则的一维版本。
:::
:::

## 布居与净吸收

单个分子的跃迁速率只是强度的一半；另一半是有多少分子处于下态，又有多少分子在上态、随时可能被受激发射打下来。热平衡样品中的答案由玻尔兹曼给出。

::: definition 玻尔兹曼布居 {#def-boltzmann}
在温度$T$下热平衡时，能量为$E_j$、简并度为$g_j$的能级$j$上的分子数$N_j$为
$$
\frac{N_j}{N} = \frac{g_j\,\mathrm{e}^{-E_j/k_\mathrm{B}T}}{q}, \qquad q = \sum_j g_j\,\mathrm{e}^{-E_j/k_\mathrm{B}T},
$$ {#eq-boltzmann}
其中$q$是配分函数（[[statistical-thermodynamics/partition-function]]）。两个能级布居之比为$N_\mathrm{u}/N_\mathrm{l} = (g_\mathrm{u}/g_\mathrm{l})\,\mathrm{e}^{-\Delta E/k_\mathrm{B}T}$；用波数表示时$\Delta E/k_\mathrm{B}T = 1.4388\,\tilde\nu/(T/\mathrm{K})$，其中$\tilde\nu$以$\mathrm{cm^{-1}}$计。
:::

::: proposition 净吸收与布居差 {#prop-net}
热平衡样品中，下能级$\mathrm l$与上能级$\mathrm u$之间跃迁的净吸收速率（吸收减去受激发射）为
$$
W_\mathrm{net} = B_\mathrm{ul}\,\rho\left(N_\mathrm{l} - \frac{g_\mathrm{l}}{g_\mathrm{u}}N_\mathrm{u}\right) = B_\mathrm{ul}\,\rho\,N_\mathrm{l}\left(1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}\right),
$$ {#eq-net}
因此一条吸收谱线的强度正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$、下能级的布居以及因子$1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$。$h\nu \gg k_\mathrm{B}T$时该因子为$1$；$h\nu \ll k_\mathrm{B}T$时它约为$h\nu/k_\mathrm{B}T$，吸收变得非常弱。
:::

::: proof
受激发射是吸收的时间反演；与黑体辐射的细致平衡给出$g_\mathrm{l}B_\mathrm{ul} = g_\mathrm{u}B_\mathrm{lu}$（[[spectroscopy/electronic-spectroscopy#prop-einstein]]），其中$B_\mathrm{ul}$是$\mathrm{u}\leftarrow\mathrm{l}$的系数、$B_\mathrm{lu}$是$\mathrm{l}\leftarrow\mathrm{u}$的系数。向上速率为$B_\mathrm{ul}\rho N_\mathrm{l}$，受激向下速率为$B_\mathrm{lu}\rho N_\mathrm{u} = (g_\mathrm{l}/g_\mathrm{u})B_\mathrm{ul}\rho N_\mathrm{u}$。两者之差即第一个表达式。代入玻尔兹曼比$N_\mathrm{u}/N_\mathrm{l} = (g_\mathrm{u}/g_\mathrm{l})\mathrm{e}^{-h\nu/k_\mathrm{B}T}$就化为第二个。$x = h\nu/k_\mathrm{B}T$很小时，$1 - \mathrm{e}^{-x} = x - x^2/2 + \cdots$。自发射不受探测光束的驱动、向各个方向发出，故不进入测得的吸收。
:::

因子$1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$在很大程度上解释了哪些技术灵敏。下能级非简并时，$298\ \mathrm{K}$下每一分子中吸收体超出受激发射体的份额为：

| 跃迁 | $\tilde\nu$ / $\mathrm{cm^{-1}}$ | $h\nu/k_\mathrm{B}T$ | $1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$ |
|---|---|---|---|
| 质子的核磁共振，$600\ \mathrm{MHz}$ | $0.0200$ | $9.7\times10^{-5}$ | $9.7\times10^{-5}$ |
| HCl的转动，$J = 1 \leftarrow 0$ | $20.9$ | $0.101$ | $0.096$ |
| HCl的振动 | $2886$ | $13.9$ | $1.000$ |
| 电子跃迁，$500\ \mathrm{nm}$ | $20\,000$ | $96.5$ | $1.000$ |

核磁共振的净吸收只来自大约每万个自旋中的一个，因而在常用光谱技术中天生灵敏度最低，这就是核磁共振磁体越做越大的原因（[[spectroscopy/nmr-principles]]）。转动跃迁的反差约为理想值的十分之一；室温下振动与电子跃迁几乎完全从基态出发。

::: widget plot
f: tanh(1.4388*10^x/(2*t))
x: -3, 5
y: 0, 1.05
sliders: t=298:4:1500:1
vlines: -1.699; 1.32; 3.46; 4.30
labels: (N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u})
caption: 非简并二能级体系的分数布居差$(N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u}) = \tanh(hc\tilde\nu/2k_\mathrm{B}T)$，对$x = \log_{10}(\tilde\nu/\mathrm{cm^{-1}})$作图，温度（单位$\mathrm K$）由滑块`t`设定。竖线标出$0.02\ \mathrm{cm^{-1}}$（$600\ \mathrm{MHz}$下的质子核磁共振）、$20.9\ \mathrm{cm^{-1}}$（HCl的一条转动谱线）、$2886\ \mathrm{cm^{-1}}$（HCl的振动）与$20\,000\ \mathrm{cm^{-1}}$（可见光）。把温度降到$4\ \mathrm{K}$，连转动跃迁也接近满反差；把温度调高，振动曲线便开始从$1$往下滑——热谱带开始出现的征兆。
:::

::: example 受激能级上有多少分子？ {#ex-pop}
在$298\ \mathrm{K}$下求：(a) HCl分子处于$v = 1$（$\tilde\nu = 2886\ \mathrm{cm^{-1}}$）的分数；(b) $\mathrm{CO_2}$分子中二重简并的弯曲振动（$667\ \mathrm{cm^{-1}}$）上有一个量子的分子与基态分子的数目之比；(c) $600\ \mathrm{MHz}$谱仪中质子处于低自旋态的分数超额。
::: solution
(a) 由于$v = 2$及以上可忽略，该分数基本上就是$\mathrm{e}^{-1.4388\times2886/298.15} = \mathrm{e}^{-13.93} = 8.9\times10^{-7}$。每一百万个分子中只有一个被振动激发，所以红外吸收从$v = 0$出发，热谱带看不见。

(b) $v_2 = 1$的简并度为$g = 2$，故$N_1/N_0 = 2\,\mathrm{e}^{-1.4388\times667/298.15} = 2 \times 0.0400 = 0.080$。约$7\,\%$的全部分子（计入更高能级后）带有一个弯曲振动量子，基于它的热谱带在$\mathrm{CO_2}$的红外光谱中清晰可见（[[spectroscopy/vibrational-spectroscopy]]）。

(c) 对相隔$h\nu$的两个能级，$(N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u}) = \tanh(h\nu/2k_\mathrm{B}T) \approx h\nu/2k_\mathrm{B}T = (6.626\times10^{-34})(6.00\times10^{8})/(2 \times 1.381\times10^{-23} \times 298.15) = 4.8\times10^{-5}$。一百万个质子中只有约48个是"多余"的吸收体。信号之所以仍可测量，是因为几毫克样品就含有$10^{19}$个质子。
:::
:::

## 吸收强度：朗伯-比尔定律

现在从单个分子转到一个样品。一准直光束穿过一层吸光溶液；每一薄层都按固定比例扣除到达它的光，故光强按指数衰减。

::: proposition 朗伯-比尔定律 {#prop-beer}
强度为$I_0$的单色光穿过光程$l$、含吸光物种$\mathrm J$（摩尔浓度为$[\mathrm{J}]$）的溶液后，出射光强为$I$，其中
$$
A \equiv \log_{10}\frac{I_0}{I} = \varepsilon\,[\mathrm{J}]\,l, \qquad T \equiv \frac{I}{I_0} = 10^{-\varepsilon[\mathrm{J}]l}.
$$ {#eq-beer}
$A$是**吸光度**，$T$是**透射比**，$\varepsilon$是**摩尔（常用对数）吸收系数**，为物种与波长共有的性质，通常以$\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$计。对若干独立的吸光物种，吸光度可加：$A = l\sum_\mathrm{J}\varepsilon_\mathrm{J}[\mathrm{J}]$。以每个分子的**吸收截面**$\sigma$表示，$\varepsilon = \sigma N_\mathrm{A}/(1000\ln 10)$，其中$\sigma$以$\mathrm{cm^2}$计。该定律假定：光是单色且准直的；吸光粒子彼此独立（无缔合，平衡不随浓度改变）；到达检测器的散射光与荧光可以忽略；光束很弱，不会明显消耗下能级。
:::

::: proof
设光沿$x$行进，吸光粒子的数密度为$\mathcal N = N_\mathrm{A}[\mathrm{J}]$。厚度$\mathrm{d}x$、面积$S$的一层薄片含有$\mathcal N S\,\mathrm{d}x$个分子，每个分子遮住$\sigma$的有效面积。被光束扣除的份额就是被遮住的面积份额$\sigma\mathcal N\,\mathrm{d}x$，其前提是分子之间互不遮蔽（稀溶液、薄层）。于是$\mathrm{d}I = -\sigma\mathcal N I\,\mathrm{d}x$。从$x = 0$处的$I_0$积分到$x = l$处的$I$，
$$
\ln\frac{I_0}{I} = \sigma\mathcal N l = \sigma N_\mathrm{A}[\mathrm{J}]\,l ,
$$
换成常用对数得$\log_{10}(I_0/I) = (\sigma N_\mathrm{A}/\ln 10)[\mathrm{J}]l$。当$[\mathrm{J}]$以$\mathrm{mol\,dm^{-3}} = 10^{-3}\ \mathrm{mol\,cm^{-3}}$、$\sigma$以$\mathrm{cm^2}$为单位时，$\varepsilon = \sigma N_\mathrm{A}/(1000\ln 10)$的单位为$\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$。对多个物种，$\mathrm{d}I = -\left(\sum\sigma_\mathrm{J}\mathcal N_\mathrm{J}\right)I\,\mathrm{d}x$，吸光度相加。吸收截面本身由[[#eq-rate]]的微观速率扣除受激发射（如[[#eq-net]]）后决定。
:::

$\varepsilon = 10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$——一条强电子谱带的典型值——对应$\sigma = 3.8\times10^{-17}\ \mathrm{cm^2}$，约为一个小分子几何截面的三分之一。一次完全允许的跃迁会使分子对颜色合适的光几乎不透明。

::: example 由吸光度求NADH的浓度 {#ex-nadh}
还原型辅酶NADH在$340\ \mathrm{nm}$处吸收，$\varepsilon = 6.22\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$，而$\mathrm{NAD^+}$在此处不吸收。某反应混合液在$1.000\ \mathrm{cm}$比色皿中扣除空白后测得$A_{340} = 0.415$。求$[\mathrm{NADH}]$与透射光的百分比。
::: solution
由[[#eq-beer]]，
$$
[\mathrm{NADH}] = \frac{A}{\varepsilon l} = \frac{0.415}{(6.22\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}})(1.000\ \mathrm{cm})} = 6.67\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 66.7\ \mu\mathrm{mol\,dm^{-3}} .
$$
透射比为$T = 10^{-0.415} = 0.385$，即$38.5\,\%$。这一测量是庞大的酶活性测定方法族的基础——这类方法跟踪$340\ \mathrm{nm}$处NADH的出现或消失（[[biochemistry/enzymes]]）：由于$\mathrm{NAD^+}$在此透明，吸光度的变化率直接就是反应速率。
:::
:::

### 积分吸收与振子强度

吸收系数在一条谱带上是变化的，其峰值取决于谱带恰好有多宽。只反映分子本身的量是谱带下的面积，即**积分吸收系数**$\mathcal A = \int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu$，以及它的无量纲形式——振子强度。

::: definition 振子强度 {#def-oscillator}
跃迁的**振子强度**为
$$
f = \frac{4\varepsilon_0 m_\mathrm{e}c^2\ln 10}{N_\mathrm{A}e^2}\int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu = 4.319\times10^{-9}\int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu ,
$$ {#eq-osc}
数值式中$\varepsilon$以$\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$、$\tilde\nu$以$\mathrm{cm^{-1}}$为单位。它与跃迁偶极矩的关系为
$$
f = \frac{8\pi^2 m_\mathrm{e}c\,\tilde\nu_\mathrm{fi}}{3he^2}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2 = 4.702\times10^{-7}\,\left(\frac{\tilde\nu_\mathrm{fi}}{\mathrm{cm^{-1}}}\right)\left(\frac{\lvert\boldsymbol\mu_\mathrm{fi}\rvert}{\mathrm{D}}\right)^2 .
$$ {#eq-osc-mu}
以回复力束缚的电子——吸收体的经典模型——其$f = 1$；完全允许的电子跃迁$f$在$0.1$–$1$量级，自旋禁戒者$10^{-5}$或更小。对峰高为$\varepsilon_\mathrm{max}$、半高全宽为$\Delta\tilde\nu_{1/2}$的高斯谱带，$\int\varepsilon\,\mathrm{d}\tilde\nu = 1.0645\,\varepsilon_\mathrm{max}\Delta\tilde\nu_{1/2}$。
:::

托马斯-赖歇-库恩（Thomas–Reiche–Kuhn）求和规则指出，从给定态出发的所有跃迁的振子强度之和等于电子数。这就是$f$可以被理解为跃迁中"参与的电子数"、以及单电子体系的任何单一跃迁的$f$不会超过$1$的原因。

::: example 由实测谱带求跃迁矩 {#ex-osc}
某芳香化合物有一条近似高斯形的吸收谱带，中心在$250\ \mathrm{nm}$，$\varepsilon_\mathrm{max} = 2.0\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$，半高全宽$4000\ \mathrm{cm^{-1}}$。求振子强度与跃迁偶极矩的大小。
::: solution
积分吸收：$\int\varepsilon\,\mathrm{d}\tilde\nu = 1.0645 \times (2.0\times10^4)(4000) = 8.5\times10^{7}\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$。由[[#eq-osc]]，$f = 4.319\times10^{-9} \times 8.52\times10^{7} = 0.37$。谱带中心在$\tilde\nu = 1/(250\times10^{-7}\ \mathrm{cm}) = 4.00\times10^4\ \mathrm{cm^{-1}}$，故[[#eq-osc-mu]]给出
$$
\lvert\boldsymbol\mu_\mathrm{fi}\rvert = \sqrt{\frac{0.37}{4.702\times10^{-7}\times4.00\times10^4}}\ \mathrm{D} = 4.4\ \mathrm{D} ,
$$
相当于一个电子被移动了$92\ \mathrm{pm}$——占键长的相当一部分，正与一条强允许的$\pi\to\pi^*$跃迁相称。取两位有效数字是合适的，因为谱带形状本身就是近似。
:::
:::

::: warning 吸光度、透射比与"禁戒"
定量吸收测量中的多数错误来自三个习惯。第一，吸光度是对数的：$A = 1$意味着透过$10\,\%$，$A = 2$意味着透过$1\,\%$，所以$A = 3$的读数只依靠千分之一的光，而一点杂散光——其他波长的光到达检测器——就会使测得的吸光度低于朗伯-比尔值（见下图）。读数最好大致保持在$0.1$到$1.5$之间。第二，$\varepsilon$不是化合物的普适常数：它随波长、溶剂、pH与温度而变；所谓"偏离比尔定律"通常意味着发生了化学变化——染料的缔合、酸碱平衡的移动——而不是定律失效。第三，"禁戒"指的是*在电偶极近似下禁戒*，而不是*不存在*：禁戒谱带是弱，而不是看不见；选律告诉你哪些谱带应当弱，而不是哪些看不见。
:::

::: widget plot
f: -log10((10^(-x) + s)/(1 + s)); x
x: 0, 3.5
y: 0, 3.5
sliders: s=0.005:0:0.05:0.001
labels: A_\mathrm{measured}; A_\mathrm{true}
caption: 杂散光对测得吸光度的影响。若到达检测器的光中有一部分$s$（以$I_0$计）是不被样品吸收的杂散光，则仪器报出的不再是真实的$A$（横轴），而是$A_\mathrm{meas} = -\log_{10}[(10^{-A} + s)/(1 + s)]$。取$s = 0.005$（$0.5\,\%$）时，$A = 1$以下误差可以忽略，但测量曲线在$A = -\log_{10}(s) \approx 2.3$附近饱和。把`s`滑到零即可恢复朗伯-比尔直线。
:::

::: quiz 哪些因素决定强度？
对固定的样品与光程，下列哪些因素会提高一条吸收谱线的积分强度？（凡适用者均选。）
- [x] 跃迁偶极矩的模更大。
- [x] 下能级的布居更大。
- [ ] 上能级的寿命更短。
- [ ] 对一条从基态出发、$h\nu \gg k_\mathrm{B}T$的谱线，升高温度。
::: solution
积分强度正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$与布居差（[[#prop-net]]）。寿命变短会把谱线加宽（见下文[[#prop-lifetime]]），但不改变其面积：同样的吸收被摊到更多的频率上。对从基态出发、$h\nu \gg k_\mathrm{B}T$的谱线，升温什么也改变不了，甚至使强度略微*降低*，因为一部分分子离开了基能级。（对转动谱线，多个能级都有布居，温度会把强度在各条线之间重新分配。）
:::
:::

## 线宽与线型

谱线从来不是无限锐的。宽度携带着信息——关于寿命、温度与压强——并且限制着两条谱线靠多近仍能分辨。起决定作用的机制有三个：能级寿命有限、分子的热运动以及碰撞。

### 寿命加宽

::: proposition 寿命加宽与洛伦兹线型 {#prop-lifetime}
若跃迁的上能级以一级寿命$\tau$衰减（无论经由什么过程），其布居按$\mathrm{e}^{-t/\tau}$衰减，则谱线呈**洛伦兹**线型
$$
g_\mathrm{L}(\nu) = \frac{1}{\pi}\,\frac{\gamma}{(\nu - \nu_0)^2 + \gamma^2}, \qquad \gamma = \frac{1}{4\pi\tau},
$$ {#eq-lorentz}
半高全宽为
$$
\Delta\nu_{1/2} = \frac{1}{2\pi\tau}, \qquad \Delta\tilde\nu_{1/2} = \frac{1}{2\pi c\tau} = \frac{5.31\ \mathrm{cm^{-1}}}{\tau/\mathrm{ps}} .
$$ {#eq-lifetime}
若两个能级都衰减，其速率相加：$\Delta\nu_{1/2} = (1/2\pi)(1/\tau_\mathrm{u} + 1/\tau_\mathrm{l})$。当仅由辐射衰减决定寿命时，该宽度称为**自然线宽**。更一般地，任何在时间$T_2$内摧毁振荡偶极相位相干的过程都给出$\Delta\nu_{1/2} = 1/\pi T_2$；仅靠布居流失衰减时$T_2 = 2\tau$。
:::

::: proof 衰减振荡的傅里叶变换
布居按$\mathrm{e}^{-t/\tau}$衰减的态，其振幅按$\mathrm{e}^{-t/2\tau}$衰减，故（$t \ge 0$时）叠加态的振荡偶极（以及辐射场）的行为如同$\mathrm{e}^{-t/2\tau}\mathrm{e}^{-2\pi\mathrm{i}\nu_0 t}$。它的频率成分即傅里叶变换
$$
\int_0^\infty \mathrm{e}^{-t/2\tau}\,\mathrm{e}^{2\pi\mathrm{i}(\nu - \nu_0)t}\,\mathrm{d}t = \frac{1}{1/2\tau - 2\pi\mathrm{i}(\nu - \nu_0)} ,
$$
功率谱是其模的平方，$\left[(1/2\tau)^2 + 4\pi^2(\nu - \nu_0)^2\right]^{-1} = (4\pi^2)^{-1}\left[(\nu - \nu_0)^2 + \gamma^2\right]^{-1}$，其中$\gamma = 1/4\pi\tau$。归一化到单位面积即得[[#eq-lorentz]]。函数在$\nu - \nu_0 = \pm\gamma$处降到峰高的一半，故全宽为$2\gamma = 1/2\pi\tau$。除以$c$即换算为波数，且$1/(2\pi \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 10^{-12}\ \mathrm{s}) = 5.31\ \mathrm{cm^{-1}}$。若两个能级都衰减，二者之间的相干以两个振幅衰减速率之和衰减，宽度相加。把振幅衰减速率$1/2\tau$换成一般的失相位速率$1/T_2$，就得到$\Delta\nu_{1/2} = 1/\pi T_2$。
:::

这一结果常被粗略地写成$\Delta E\,\tau \approx \hbar$，即一条"能量-时间不确定关系"；其确切内容就是上面的傅里叶关系。它有一个实用的孪生结论，质谱与核磁共振两章都会用到：记录总时长为$T$的信号分辨不了间隔小于约$1/T$的频率，因此长的采集时间给出窄的谱线（[[spectroscopy/nmr-principles]]，[[spectroscopy/mass-spectrometry]]）。对转动与振动跃迁，自然宽度极小——自发射按$\nu^3$标度，被激发的转动能级可以存活数年——但对寿命以纳秒计的电子跃迁它很重要；而当受激态快速瓦解时它更起主导作用：一个在$1\ \mathrm{ps}$内预解离的分子，其谱线宽$5\ \mathrm{cm^{-1}}$，电子谱带的转动结构被完全抹平（[[spectroscopy/electronic-spectroscopy]]）。

### 多普勒加宽

在气体中，以速度分量$v_x$朝光源运动的分子看到辐射被蓝移，在实验室频率$\nu = \nu_0(1 - v_x/c)$处吸收；反向远离的分子在更高的实验室频率处吸收。由于$v_x$服从麦克斯韦-玻尔兹曼分布，吸收频率也服从相应的分布。

::: proposition 多普勒加宽与高斯线型 {#prop-doppler}
对温度为$T$、质量为$m$的气体分子（且$v_x \ll c$），多普勒加宽给出**高斯**线型
$$
g_\mathrm{G}(\nu) = \frac{c}{\nu_0}\sqrt{\frac{m}{2\pi k_\mathrm{B}T}}\exp\!\left[-\frac{mc^2(\nu - \nu_0)^2}{2k_\mathrm{B}T\,\nu_0^2}\right]
$$ {#eq-gauss}
半高全宽为
$$
\Delta\nu_{1/2} = \frac{2\nu_0}{c}\sqrt{\frac{2k_\mathrm{B}T\ln 2}{m}} .
$$ {#eq-doppler}
分数宽度$\Delta\nu_{1/2}/\nu_0$与跃迁的种类无关：只取决于$T/m$，等于$7.16\times10^{-7}\sqrt{(T/\mathrm{K})/(M/\mathrm{g\,mol^{-1}})}$。
:::

::: proof
一维情形中，沿光束方向速度分量的麦克斯韦-玻尔兹曼分布为$p(v_x) = \sqrt{m/2\pi k_\mathrm{B}T}\,\exp(-mv_x^2/2k_\mathrm{B}T)$。速度分量为$v_x$的分子在$\nu - \nu_0 = \pm\nu_0 v_x/c$处吸收（符号取决于光束方向，无关紧要，因为$p$是偶函数），于是$v_x = c(\nu - \nu_0)/\nu_0$且$\mathrm{d}v_x = (c/\nu_0)\,\mathrm{d}\nu$。换元得$g_\mathrm{G}(\nu) = p(v_x)\,\mathrm{d}v_x/\mathrm{d}\nu$，即[[#eq-gauss]]。高斯函数在指数等于$\ln 2$时降到峰高的一半：$(\nu - \nu_0)^2 = 2k_\mathrm{B}T\nu_0^2\ln 2/mc^2$，故半宽为$(\nu_0/c)\sqrt{2k_\mathrm{B}T\ln2/m}$，全宽为此的两倍。以$m = M/N_\mathrm{A}$代入得$\Delta\nu_{1/2}/\nu_0 = (2/c)\sqrt{2RT\ln 2/M}$，$M$以$\mathrm{kg\,mol^{-1}}$计时代入数值因子得$(2/c)\sqrt{2 \times 8.314 \times \ln 2 \times 10^{3}} = 7.16\times10^{-7}$（每$\sqrt{\mathrm{K\,mol\,g^{-1}}}$）。
:::

::: example 钠D线的多普勒宽度与自然宽度 {#ex-doppler}
钠$\mathrm{D_2}$线位于$589.0\ \mathrm{nm}$，上能级$3\mathrm{p}$的辐射寿命为$16.2\ \mathrm{ns}$。对$500\ \mathrm{K}$的钠蒸气，计算多普勒宽度与自然宽度，并指出观测线型由谁决定。
::: solution
$\nu_0 = c/\lambda = 5.090\times10^{14}\ \mathrm{Hz}$，$m = 22.990\ \mathrm{u} = 3.818\times10^{-26}\ \mathrm{kg}$。由[[#eq-doppler]]，
$$
\Delta\nu_\mathrm{D} = \frac{2 \times 5.090\times10^{14}}{2.998\times10^{8}}\sqrt{\frac{2(1.381\times10^{-23})(500)\ln 2}{3.818\times10^{-26}}}\ \mathrm{Hz} = 1.70\times10^{9}\ \mathrm{Hz},
$$
即$1.70\ \mathrm{GHz}$、$0.057\ \mathrm{cm^{-1}}$或$0.0020\ \mathrm{nm}$。自然宽度为$\Delta\nu_\mathrm{N} = 1/(2\pi\times16.2\times10^{-9}\ \mathrm{s}) = 9.8\ \mathrm{MHz}$，小约170倍。因此观测到的谱线基本上是Gauss型的，只是在远离中心、高斯已衰减殆尽的地方带有微弱的洛伦兹翼。无多普勒技术（饱和光谱、冷原子束与分子束）正是为了去掉占主导的高斯宽度、露出自然宽度而发展的。
:::
:::

由于多普勒宽度按$\nu_0$标度，可见区一条原子谱线约为$0.06\ \mathrm{cm^{-1}}$，而$300\ \mathrm{K}$下HCl的一条红外谱线只有$6\times10^{-3}\ \mathrm{cm^{-1}}$，微波转动谱线只有几百千赫。因此微波光谱是分子光谱中最精密的，谱线位置的测量例行地达到$10^{-7}$甚至更好，[[spectroscopy/rotational-spectroscopy]]中的键长之所以如此准确正源于此。

### 压强加宽与福格特轮廓

碰撞会打断振荡偶极的相位。若平均碰撞间隔为$\tau_\mathrm{col}$，相干寿命就大致与之相当，谱线获得洛伦兹宽度$\Delta\nu_{1/2} \approx 1/\pi\tau_\mathrm{col}$（即[[#prop-lifetime]]中取$T_2 = \tau_\mathrm{col}$）。由于$\tau_\mathrm{col} = 1/z$，而碰撞频率$z$正比于压强（[[kinetics/collision-theory]]），宽度随压强线性增长。对$1\ \mathrm{bar}$、$298\ \mathrm{K}$的氮气，取$\sigma = 0.43\ \mathrm{nm^2}$的气体动理论给出$z \approx 7\times10^{9}\ \mathrm{s^{-1}}$，宽度约为$2\ \mathrm{GHz}$，即$0.07\ \mathrm{cm^{-1}}$——比一条红外谱线的多普勒宽度还大。因此，要分辨最细微的结构，气相光谱须在低压下记录；而在液体中，分子每隔约一个皮秒就碰撞一次，转动结构完全消失。

当多普勒加宽与压强加宽相当时，观测轮廓是两者的卷积，即**福格特（Voigt）轮廓**：中心附近是高斯型，两翼是洛伦兹型。这一差别有实际后果：洛伦兹线的翼比同宽的高斯线宽得多，所以重叠的洛伦兹线彼此污染更严重，基线也更难定义。

::: widget plot
f: exp(-4*ln(2)*x^2/w^2); 1/(1 + 4*x^2/w^2)
x: -5, 5
y: 0, 1.05
sliders: w=1:0.2:4:0.05
hlines: 0.5
labels: \text{高斯（多普勒）}; \text{洛伦兹（寿命、碰撞）}
caption: 半高全宽同为$w$（滑块）的高斯线与洛伦兹线，均按单位高度归一化，横轴为偏离线心的距离$x$（与$w$同单位）。$0.5$处的水平线表明二者在该处宽度相同；但在$x = 2w$处，高斯已降到峰高的$10^{-7}$，洛伦兹仍有$6\,\%$。洛伦兹线的长翼正是碰撞加宽的谱线在高压下重叠如此严重的原因。
:::

### 分辨率

最后，仪器本身也有自己的宽度。光栅光谱仪无法分开比其**分辨本领**$\nu/\Delta\nu$所允许的更近的两条线；一台把干涉图记录到最大光程差$\delta_\mathrm{max}$的傅里叶变换仪器，分辨率约为$\Delta\tilde\nu \approx 1/\delta_\mathrm{max}$：扫描$0.5\ \mathrm{cm}$对应$2\ \mathrm{cm^{-1}}$，扫描$5\ \mathrm{m}$的研究型仪器对应$0.002\ \mathrm{cm^{-1}}$。这还是同一个傅里叶关系，只是以光程差代替了时间，它在[[spectroscopy/vibrational-spectroscopy]]中详述。谱线的观测宽度不会小于仪器宽度、多普勒宽度、碰撞宽度与自然宽度中最大的那一个。

## 发射、散射与总体图景

吸收并非测量光谱的唯一途径。**发射**光谱中，分子先被激发——靠热、气体放电或激光——再把发出的光色散；发射强度正比于*上*能级的布居与爱因斯坦$A$系数，后者按$\nu^3\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$标度。发射法非常灵敏，因为背景是暗的：荧光检测能看见单个分子，而吸收法必须在强光束中测量一个微小的减小。**散射**光谱中，入射光子不被吸收；其中一小部分以偏移了一个分子能隙的频率重新发出。瑞利散射不移频，拉曼散射移频，且其选律取决于极化率而不是偶极矩（[[spectroscopy/vibrational-spectroscopy#def-raman]]）。而**磁共振**利用外磁场分裂出的自旋态之间的磁偶极跃迁，其跃迁矩涉及的是磁矩而不是电偶极。

无论哪种情形，分析都由本章确立的三部分组成：能级给出位置；跃迁矩、布居与样品量给出强度；寿命、运动、碰撞与仪器给出宽度。

## 后续内容

本课程后面的每一章都是这套机器的具体化。[[spectroscopy/rotational-spectroscopy]]把跃迁矩用于旋转的永久偶极，得到$\Delta J = \pm1$，并用[[#def-boltzmann]]中的玻尔兹曼因子及其$(2J+1)$简并度解释微波光谱的强度图样。[[spectroscopy/vibrational-spectroscopy]]把偶极矩按简正坐标展开，并在拉曼光谱中以极化率取而代之。[[spectroscopy/electronic-spectroscopy]]把跃迁矩因子化为电子部分与振动重叠（弗兰克-康登因子），并把爱因斯坦系数化为荧光寿命与激光。[[spectroscopy/nmr-principles]]与[[spectroscopy/epr]]处理二能级自旋体系，由[[#prop-net]]给出的微小布居差支配着实验设计。朗伯-比尔定律是[[analytical-chemistry]]中定量分析的基础，建立在它之上的校准曲线统计也在该课程中讲述。

::: history
光的指数衰减早在人们知道是什么在吸收光之前很久就已被描述。布盖（Pierre Bouguer）在《光度学试论》（*Essai d'optique sur la gradation de la lumière*，1729）中证明：介质的每一等厚薄层扣除等份额的光；朗伯（Johann Heinrich Lambert）在《光度学》（*Photometria*，1760）中给出了定律的数学形式。比尔（August Beer）1852年把它推广到溶液，证明吸收取决于浓度与光程之积——这就是合并后的定律兼载两人之名的原因。多普勒（Christian Doppler）1842年提出，观测到的频率取决于波源与观测者的相对运动，这正是气体高斯线型的起源。谱线强度的量子理论始于爱因斯坦1917年的论文《关于辐射的量子理论》（"Zur Quantentheorie der Strahlung"）：该文引入了吸收、受激发射与自发射系数，并从普朗克定律推出它们之间的关系；狄拉克（Paul Dirac）1927年关于辐射发射与吸收的量子理论进而从第一性原理导出跃迁速率，即[[#prop-rate]]使用的形式。费米（Enrico Fermi）后来在其核物理讲义中把一般的跃迁速率公式称为"第二黄金规则"（Golden Rule No. 2），"费米黄金规则"一名由此流传开来。
:::

::: summary
- 光谱跃迁满足$\Delta E = h\nu = hc\tilde\nu$；$1\ \mathrm{cm^{-1}} \equiv 11.96\ \mathrm{J\,mol^{-1}} \equiv 29.98\ \mathrm{GHz} \equiv 1.439\ \mathrm{K}$，且$298\ \mathrm{K}$下$k_\mathrm{B}T/hc = 207\ \mathrm{cm^{-1}}$。
- 电偶极跃迁的速率正比于$\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$，即跃迁偶极矩$\langle\mathrm f\vert\hat{\boldsymbol\mu}\vert\mathrm i\rangle$的平方；$B = \lvert\boldsymbol\mu_\mathrm{fi}\rvert^2/6\varepsilon_0\hbar^2$。
- 选律是关于$\boldsymbol\mu_\mathrm{fi} = 0$的对称性论断：直积必须包含$\Gamma_{x,y,z}$，中心对称体系中$g \leftrightarrow u$，$\Delta S = 0$；"禁戒"跃迁是弱，不是不存在。
- 净吸收正比于布居差$N_\mathrm{l}(1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T})$——对振动与电子跃迁近乎完全，转动约$10^{-1}$，核磁共振约$10^{-4}$。
- 朗伯-比尔定律$A = \varepsilon[\mathrm J]l$源于每一薄层吸收固定份额的光；独立物种的吸光度可加，偏离定律通常意味着化学变化或杂散光。
- 振子强度$f = 4.32\times10^{-9}\int\varepsilon\,\mathrm{d}\tilde\nu$度量谱带面积并给出$\lvert\boldsymbol\mu_\mathrm{fi}\rvert$；允许的电子谱带$f \approx 0.1$–$1$。
- 寿命与碰撞给出洛伦兹线，$\Delta\tilde\nu_{1/2} = 1/2\pi c\tau$（$1\ \mathrm{ps}$对应$5.3\ \mathrm{cm^{-1}}$）；热运动给出高斯型多普勒线，$\Delta\nu_{1/2}/\nu_0 = 7.16\times10^{-7}\sqrt{T/M}$。
:::

## 习题

::: exercise 红外光子的能量 {level=1 check="29.9"}
某红外带位于波长$4.00\ \mu\mathrm{m}$处。求它的波数以及这种波长的每摩尔光子的能量。（能量以$\mathrm{kJ\,mol^{-1}}$为单位输入，取三位有效数字。）
::: solution
$\tilde\nu = 1/\lambda = 1/(4.00\times10^{-4}\ \mathrm{cm}) = 2500\ \mathrm{cm^{-1}}$。于是$E_\mathrm{m} = N_\mathrm{A}hc\tilde\nu = 2500 \times 11.9627\ \mathrm{J\,mol^{-1}} = 2.99\times10^{4}\ \mathrm{J\,mol^{-1}} = 29.9\ \mathrm{kJ\,mol^{-1}}$——约为室温下$RT$的$12$倍，所以被激发的振动能级几乎是空的。
:::
:::

::: exercise 染料的浓度 {level=1 check="51.2"}
某染料在吸收极大处$\varepsilon = 1.25\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$。某溶液在$1.00\ \mathrm{cm}$吸收池中于该处的吸光度为$0.640$。求浓度与透射百分比。（浓度以$\mu\mathrm{mol\,dm^{-3}}$为单位输入，取三位有效数字。）
::: solution
$[\mathrm{dye}] = A/\varepsilon l = 0.640/(1.25\times10^4 \times 1.00) = 5.12\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 51.2\ \mu\mathrm{mol\,dm^{-3}}$。透射比为$10^{-0.640} = 0.229$，即$22.9\,\%$。
:::
:::

::: exercise 两个转动能级的布居 {level=1 check="2.95"}
一氧化碳的转动常数$\tilde B = 1.9225\ \mathrm{cm^{-1}}$；其能级能量为$hc\tilde BJ(J+1)$，简并度为$2J + 1$。计算$300\ \mathrm{K}$下的$N_{J=1}/N_{J=0}$。（比值取三位有效数字输入。）
::: solution
间隔为$2\tilde B = 3.845\ \mathrm{cm^{-1}}$，简并度之比为$3/1$，故$N_1/N_0 = 3\,\mathrm{e}^{-1.4388\times3.845/300} = 3 \times 0.9817 = 2.95$。由于简并度，上能级的布居反而*比*下能级*更多*，但$J = 1 \leftarrow 0$谱线依然吸收：按每个量子态计，下能级的布居更多，而[[#prop-net]]数的正是按态计的布居。
:::
:::

::: exercise 微波谱线的多普勒宽度 {level=2 check="270"}
计算$300\ \mathrm{K}$下$^{12}\mathrm{C}^{16}\mathrm{O}$位于$115.271\ \mathrm{GHz}$的$J = 1 \leftarrow 0$谱线的多普勒半高全宽（$m = 27.995\ \mathrm{u}$）。（宽度以kHz为单位输入，取三位有效数字。）
::: solution
由[[#eq-doppler]]，$\Delta\nu_{1/2} = (2\nu_0/c)\sqrt{2k_\mathrm{B}T\ln 2/m}$。此处$\sqrt{2(1.3806\times10^{-23})(300)(0.6931)/(27.995 \times 1.6605\times10^{-27})} = 351.6\ \mathrm{m\,s^{-1}}$，故$\Delta\nu_{1/2} = 2(1.15271\times10^{11})(351.6)/(2.9979\times10^{8}) = 2.70\times10^{5}\ \mathrm{Hz} = 270\ \mathrm{kHz}$。等价地，分数宽度为$7.16\times10^{-7}\sqrt{300/28.0} = 2.34\times10^{-6}$。一条宽$270\ \mathrm{kHz}$的谱线，其中心可以定到几kHz，即$10^{-8}$的精度。
:::
:::

::: exercise 由线宽求寿命 {level=2 check="53.1"}
某预解离分子光谱中的一条振动-电子谱线，在扣除多普勒贡献后洛伦兹全宽为$0.10\ \mathrm{cm^{-1}}$。设基态寿命很长，估算上能级的寿命。（寿命以ps为单位输入，取三位有效数字。）
::: solution
由[[#eq-lifetime]]，$\tau = 1/(2\pi c\Delta\tilde\nu_{1/2}) = 1/(2\pi \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 0.10\ \mathrm{cm^{-1}}) = 5.31\times10^{-11}\ \mathrm{s} = 53.1\ \mathrm{ps}$。（宽度只有两位有效数字，所以寿命实际上是$53\ \mathrm{ps}$。）分子在瓦解之前只存活几个转动周期；测量单条转动谱线的线宽，是求预解离速率的主要方法之一。
:::
:::

::: exercise 由振子强度求跃迁矩 {level=2 check="2.66"}
某电子跃迁位于$30\,000\ \mathrm{cm^{-1}}$，振子强度$f = 0.10$。求其跃迁偶极矩的大小；设谱带为高斯形、宽度$3000\ \mathrm{cm^{-1}}$，估算$\varepsilon_\mathrm{max}$。（$\lvert\boldsymbol\mu_\mathrm{fi}\rvert$以德拜（debye）为单位输入，取三位有效数字。）
::: solution
由[[#eq-osc-mu]]，$\lvert\boldsymbol\mu_\mathrm{fi}\rvert = \sqrt{0.10/(4.702\times10^{-7}\times3.00\times10^{4})}\ \mathrm{D} = \sqrt{7.09}\ \mathrm{D} = 2.66\ \mathrm{D}$。积分吸收为$f/4.319\times10^{-9} = 2.32\times10^{7}$，故$\varepsilon_\mathrm{max} = 2.32\times10^{7}/(1.0645\times3000) = 7.3\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$。
:::
:::

::: exercise 从头推导多普勒公式 {level=3 check="6.01"}
(a) 从一维麦克斯韦-玻尔兹曼速率分布出发，导出多普勒线型及其半高全宽。(b) 证明分数宽度为$7.16\times10^{-7}\sqrt{T/M}$，其中$T$以K、$M$以$\mathrm{g\,mol^{-1}}$计。(c) 计算$300\ \mathrm{K}$下$\mathrm{H^{35}Cl}$位于$2906.24\ \mathrm{cm^{-1}}$的R(0)线的多普勒宽度（$M = 35.977\ \mathrm{g\,mol^{-1}}$）。（宽度以$10^{-3}\ \mathrm{cm^{-1}}$为单位输入，取三位有效数字。）
::: hint
用$\nu - \nu_0 = \nu_0v_x/c$把变量从$v_x$换到$\nu$，再找指数等于$\ln 2$的位置。
:::
::: solution
(a)与(b)即[[#prop-doppler]]的证明：$p(v_x) \propto \exp(-mv_x^2/2k_\mathrm{B}T)$配以$v_x = c(\nu - \nu_0)/\nu_0$给出关于$\nu$的高斯函数；它在$\lvert\nu - \nu_0\rvert = (\nu_0/c)\sqrt{2k_\mathrm{B}T\ln2/m}$处降到半高，故$\Delta\nu_{1/2}/\nu_0 = (2/c)\sqrt{2RT\ln 2/M}$。把以$\mathrm{kg\,mol^{-1}}$计的$M$写成$10^{-3}M'$（$M'$以$\mathrm{g\,mol^{-1}}$计），$(2/2.9979\times10^{8})\sqrt{2 \times 8.3145 \times 0.69315 \times 10^{3}} = 7.16\times10^{-7}$，再乘以$\sqrt{T/M'}$。

(c) $\Delta\tilde\nu_{1/2} = 2906.24 \times 7.16\times10^{-7}\sqrt{300/35.977} = 2906.24 \times 2.068\times10^{-6} = 6.01\times10^{-3}\ \mathrm{cm^{-1}}$。一台分辨率$0.5$–$2\ \mathrm{cm^{-1}}$的普通傅里叶变换红外光谱仪远看不到这么窄的宽度；它记录的谱线呈现的是仪器自身的线型。
:::
:::

::: exercise 两个波长上的两个吸光体 {level=3 check="47.1"}
某溶液含两种互不作用的物种X与Y。在$1.00\ \mathrm{cm}$吸收池中：在$\lambda_1$处，$\varepsilon_\mathrm{X} = 1.20\times10^4$、$\varepsilon_\mathrm{Y} = 2.0\times10^3$；在$\lambda_2$处，$\varepsilon_\mathrm{X} = 3.0\times10^3$、$\varepsilon_\mathrm{Y} = 9.0\times10^3\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$。测得吸光度$A_1 = 0.660$、$A_2 = 0.570$。求两个浓度。（$[\mathrm{X}]$以$\mu\mathrm{mol\,dm^{-3}}$为单位输入，取三位有效数字。）
::: hint
吸光度可加（[[#prop-beer]]）：对每个波长写一个线性方程，联立求解这一对方程。
:::
::: solution
方程为$1.20\times10^4[\mathrm X] + 2.0\times10^3[\mathrm Y] = 0.660$与$3.0\times10^3[\mathrm X] + 9.0\times10^3[\mathrm Y] = 0.570$。行列式为$(1.20\times10^4)(9.0\times10^3) - (2.0\times10^3)(3.0\times10^3) = 1.02\times10^8$。按克拉默（Cramer）法则，
$$
[\mathrm X] = \frac{0.660 \times 9.0\times10^3 - 2.0\times10^3\times0.570}{1.02\times10^8} = 4.71\times10^{-5}, \qquad
[\mathrm Y] = \frac{1.20\times10^4\times0.570 - 3.0\times10^3\times0.660}{1.02\times10^8} = 4.76\times10^{-5}\ \mathrm{mol\,dm^{-3}} ,
$$
即$47.1$与$47.6\ \mu\mathrm{mol\,dm^{-3}}$。当两个波长选在两个物种差别最大处时此法效果最好；若$\varepsilon$矩阵的两行近乎成比例，行列式很小，$A$中的误差就会被放大。多波长最小二乘拟合同一思路的一般形式（[[analytical-chemistry]]）。
:::
:::

::: exercise 杂散光 {level=3 check="1.83"}
某分光光度计的杂散光等于$I_0$的$0.50\,\%$，到达检测器时不被吸收。(a) 证明测得的吸光度为$A_\mathrm{meas} = -\log_{10}[(10^{-A} + s)/(1 + s)]$，其中$A$为真实吸光度，$s = 0.0050$。(b) 对真实吸光度为$2.00$的样品计算$A_\mathrm{meas}$，并求由此算出的浓度的相对误差。（$A_\mathrm{meas}$取三位有效数字输入。）
::: solution
(a) 放入样品时检测器收到$I_0 10^{-A} + sI_0$；放空白时收到$I_0 + sI_0$。仪器报出的是空白与样品信号之比的$\log_{10}$，即$\log_{10}[(1 + s)/(10^{-A} + s)]$，也就是所给的式子。

(b) $A_\mathrm{meas} = -\log_{10}[(0.0100 + 0.0050)/1.0050] = -\log_{10}(0.014925) = 1.826$，即$1.83$。由此算出的浓度偏低$(2.00 - 1.826)/2.00 = 8.7\,\%$。真实吸光度为$1.00$时，同样的杂散光给出$0.981$，误差只有$1.9\,\%$——这就是要把样品稀释到$A < 1.5$范围的原因。
:::
:::
