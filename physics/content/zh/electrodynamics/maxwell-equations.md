前两章处理的是静止的电荷和永不改变的电流。各自产生一对微分方程：静电学的 $\nabla\cdot\mathbf E = \rho/\varepsilon_0$ 与 $\nabla\times\mathbf E = \mathbf 0$，静磁学的 $\nabla\cdot\mathbf B = 0$ 与 $\nabla\times\mathbf B = \mu_0\mathbf J$。当场随时间变化时，四条方程中有两条要变。法拉第感应定律把 $\mathbf E$ 的旋度与 $\mathbf B$ 的变化率联系起来。而安培环路定律照原来的写法与电荷守恒矛盾；麦克斯韦的补救添上一项，把 $\mathbf B$ 的旋度与 $\mathbf E$ 的变化率联系起来。有了这一项，四条方程构成一个闭合的动力学理论，其解中包括光。

导论章 [[magnetism/maxwell]] 陈述了方程组并导出了波动方程。这里我们把方程组当作出发点，从中提取守恒律。能量以密度 $\frac12\varepsilon_0E^2 + B^2/2\mu_0$ 存储于场中，并随**坡印廷矢量** $\mathbf S = \mathbf E\times\mathbf B/\mu_0$ 流动。动量以密度 $\mathbf S/c^2$ 存储，随**麦克斯韦应力张量**流动。我们将看到，送到电阻上的能量是沿着导线周围的空无所有的空间到达的，而不是沿着导线；还要在始终不看电荷的情况下算出两个电荷之间的力。最后，势 $V$ 与 $\mathbf A$ 被推广到含时场，[[electrodynamics/magnetostatics]] 中遇到的规范自由度被用来把麦克斯韦方程组变成带源的波动方程，即 [[electrodynamics/radiation]] 中求解的形式。

法拉第定律与电感沿用 [[magnetism/faraday]] 与 [[magnetism/inductance]]；向量恒等式沿用 [[math-methods/vector-calculus]]。我们使用 $c = 2.99792458\times10^{8}\,\mathrm{m/s}$、$\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$ 与 $\mu_0 = 1.25663706212\times10^{-6}\,\mathrm{N/A^2}$，满足 $\mu_0\varepsilon_0 = 1/c^2$。

## 电荷守恒与位移电流 {#displacement}

电荷是局域守恒的：如果体积 $\mathcal V$ 中的电荷减少，那是因为电流穿出了边界。积分形式与微分形式为

$$
\deriv{}{t}\int_{\mathcal V}\rho\,\dd\tau = -\oint_{\partial\mathcal V}\mathbf J\cdot\dd\mathbf a, \qquad \frac{\partial\rho}{\partial t} + \nabla\cdot\mathbf J = 0 .
$$ {#eq-continuity}

微分形式由散度定理从积分形式得出，因为体积是任意的。这条**连续性方程**并不是实验已知之外的额外假设：从未观察到任何过程创生或消灭净电荷。

现在对静磁学的安培环路定律 $\nabla\times\mathbf B = \mu_0\mathbf J$ 取散度。左边是旋度的散度，恒为零。右边由 [[#eq-continuity]] 是 $-\mu_0\,\partial\rho/\partial t$，在电容器充电时不为零。安培环路定律对变化中的场不可能正确。麦克斯韦的处理是往 $\mathbf J$ 上添上那个能使一致性恢复的量。高斯定律 $\rho = \varepsilon_0\nabla\cdot\mathbf E$ 每一时刻都成立，所以

$$
\nabla\cdot\left(\mathbf J + \varepsilon_0\frac{\partial\mathbf E}{\partial t}\right) = \nabla\cdot\mathbf J + \frac{\partial\rho}{\partial t} = 0 .
$$

::: definition 位移电流 {#def-displacement}
**位移电流（密度）**是 $\mathbf J_d = \varepsilon_0\,\partial\mathbf E/\partial t$。**安培–麦克斯韦定律**为

$$
\nabla\times\mathbf B = \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t} .
$$ {#eq-ampere-maxwell}
:::

添上的这一项并非仅由一致性逼迫出来的：任何散度为零的添加项也能做到这一点。它是最简单的一条，而它的推论——首要的是以 $1/\sqrt{\mu_0\varepsilon_0}$ 传播的电磁波的存在——被赫兹证实了。在大多数电路里它的量级极小。在 $1\,\mathrm{GHz}$ 的铜中，位移电流与传导电流之比是 $\omega\varepsilon_0/\sigma\approx10^{-9}$，所以在金属内部总可以把它丢掉。在真空中它是唯一存在的电流，要紧的地方正在于此。

::: example 充电电容器内部的磁场 {#ex-capacitor}
极板为圆形、半径 $R = 5.00\,\mathrm{cm}$ 的平行板电容器由稳恒电流 $I = 1.00\,\mathrm{A}$ 充电。忽略边缘效应，求极板之间 $B$ 随到轴线距离 $s$ 的变化，以及在边缘处的值。
::: solution
极板之间场是匀强的，$E = \sigma/\varepsilon_0 = Q/(\varepsilon_0\pi R^2)$，所以

$$
\varepsilon_0\frac{\partial E}{\partial t} = \frac{1}{\pi R^2}\deriv{Q}{t} = \frac{I}{\pi R^2}.
$$

穿过间隙的总位移电流 $I_d = \varepsilon_0\,\dot E\,\pi R^2 = I$，等于导线中的传导电流：把位移电流算进去，电流通过电容器是连续的。由对称性 $\mathbf B$ 沿方位角方向。把 [[#eq-ampere-maxwell]] 对一张与极板平行、半径 $s$ 的圆盘积分并用斯托克斯定理，盘中没有传导电流，

$$
B\cdot2\pi s = \mu_0\varepsilon_0\frac{\partial E}{\partial t}\pi s^2 = \mu_0I\frac{s^2}{R^2} \quad(s\le R), \qquad B\cdot2\pi s = \mu_0I \quad(s\ge R).
$$

所以内部 $B = \mu_0Is/(2\pi R^2)$，外部 $B = \mu_0I/(2\pi s)$：正是一根半径 $R$、均匀载流 $I$ 的直导线的场。在边缘处，

$$
B = \frac{\mu_0I}{2\pi R} = \frac{(4\pi\times10^{-7})(1.00)}{2\pi(0.0500)} = 4.00\times10^{-6}\,\mathrm{T}.
$$

产生它所需的电场变化率为 $\dot E = I/(\varepsilon_0\pi R^2) = 1.44\times10^{13}\,\mathrm{V\,m^{-1}\,s^{-1}}$，这就是这一效应不可能被偶然发现的原因。它到二十世纪才被直接测到；间接证据——电磁波——先到了。
:::
:::

::: widget plot
f: min(x, 1/x); 1/x
x: 0, 4
y: 0, 2
labels: 电容器间隙中的 B; 细导线的 B
caption: 场 $B$ 对到轴线距离 $s$ 的曲线，单位取法使极板半径 $R$ 为 $1$、$\mu_0I/2\pi R$ 为 $1$。间隙内 $B$ 随 $s$ 线性增长，因为更大的回路圈住更多位移电流；外面按 $1/s$ 下降，在 $s > R$ 处与给电容器供电的导线的场（第二条曲线）吻合。注意间隙外部区域与导线外部区域毫无区别：一台磁力计在 $s > R$ 处无法分辨穿过回路的电流是由电子还是由变化中的电场承载的。
:::

## 麦克斯韦方程组 {#equations}

有了位移电流，电磁学的定律就完整了。

::: definition 麦克斯韦方程组 {#def-maxwell}
真空中以电荷密度 $\rho$ 与电流密度 $\mathbf J$ 为源，

$$
\begin{aligned}
\nabla\cdot\mathbf E &= \frac{\rho}{\varepsilon_0}, &\qquad \nabla\times\mathbf E &= -\frac{\partial\mathbf B}{\partial t},\\
\nabla\cdot\mathbf B &= 0, &\qquad \nabla\times\mathbf B &= \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t}.
\end{aligned}
$$ {#eq-maxwell}

连同**洛伦兹力** $\mathbf F = q(\mathbf E + \mathbf v\times\mathbf B)$，它们构成经典电动力学。在介质中，以自由电荷 $\rho_f$ 与自由电流 $\mathbf J_f$ 为源，并取 $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$、$\mathbf H = \mathbf B/\mu_0 - \mathbf M$，

$$
\nabla\cdot\mathbf D = \rho_f, \qquad \nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t}, \qquad \nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf H = \mathbf J_f + \frac{\partial\mathbf D}{\partial t}.
$$ {#eq-maxwell-matter}
:::

在介质中，变化的极化就是电流：$\mathbf J_p = \partial\mathbf P/\partial t$ 是束缚电荷的运动，它包含在 $\partial\mathbf D/\partial t$ 之中。两条齐次方程（不含源的那两条）在真空中与在介质中是一样的。

::: proposition 麦克斯韦方程组蕴含电荷守恒 {#prop-continuity}
若 $\mathbf E$ 与 $\mathbf B$ 满足 [[#eq-maxwell]]，则 $\rho$ 与 $\mathbf J$ 满足连续性方程 [[#eq-continuity]]。同理，只要 $\nabla\cdot\mathbf B = 0$ 在某一时刻成立，它就始终成立。
:::

::: proof
对安培–麦克斯韦定律取散度。左边消失，所以 $0 = \mu_0\nabla\cdot\mathbf J + \mu_0\varepsilon_0\,\partial_t(\nabla\cdot\mathbf E) = \mu_0(\nabla\cdot\mathbf J + \partial_t\rho)$，最后一步用了高斯定律。第二个结论：对法拉第定律取散度，$\partial_t(\nabla\cdot\mathbf B) = -\nabla\cdot(\nabla\times\mathbf E) = 0$，所以 $\nabla\cdot\mathbf B$ 不随时间变化。
:::

于是两条散度方程在某种意义上是初始条件：旋度方程演化场，并且在高斯定律与 $\nabla\cdot\mathbf B = 0$ 一旦成立之后就保持它们。数一数可以确认系统是适定的：六个场分量，六条演化方程。

界面两侧的边界条件由积分形式得出，与静场完全一样，因为含时导数项在趋于零的扁圆柱或回路上积分后会消失。取 $\hat{\mathbf n}$ 从介质 1 指向介质 2，

| 场 | 条件 |
|---|---|
| 法向 $\mathbf D$ | $D_2^\perp - D_1^\perp = \sigma_f$ |
| 法向 $\mathbf B$ | $B_2^\perp = B_1^\perp$ |
| 切向 $\mathbf E$ | $\mathbf E_2^{\parallel} = \mathbf E_1^{\parallel}$ |
| 切向 $\mathbf H$ | $\mathbf H_2^{\parallel} - \mathbf H_1^{\parallel} = \mathbf K_f\times\hat{\mathbf n}$ |

这四条条件正是 [[electrodynamics/waves-in-media]] 中确定反射与折射的东西。

在真空中，对法拉第定律取旋度并代入安培–麦克斯韦定律，得 $\nabla^2\mathbf E = \mu_0\varepsilon_0\,\partial_t^2\mathbf E$，对 $\mathbf B$ 同样：波速为 $1/\sqrt{\mu_0\varepsilon_0}$ 的波。代入上面的 CODATA 值即得 $2.99792458\times10^{8}\,\mathrm{m/s}$；今天这一吻合已内建于 SI 单位制——$c$ 自 1983 年起是精确值，$\mu_0$ 自 2019 年起是被测量——但在 1862 年，光是电磁波是麦克斯韦的发现。推导见 [[magnetism/maxwell]]。

::: quiz
如果发现磁单极，麦克斯韦方程组中哪几条必须改变？
- [x] $\nabla\cdot\mathbf B = 0$ 要添上磁荷密度。
- [x] 法拉第定律要添上磁流密度。
- [ ] $\mathbf E$ 的高斯定律。
- [ ] 都不必：单极已经被允许。
::: solution
磁荷密度 $\rho_m$ 会是 $\nabla\cdot\mathbf B$ 的源。由导出位移电流时的同一论证，它的守恒接着就要求在 $\nabla\times\mathbf E$ 中添一项磁流：对法拉第定律取散度，并与 $\partial_t\nabla\cdot\mathbf B$ 比较即可看出。$\mathbf E$ 的散度方程与 $\mathbf B$ 的旋度方程则毫发无损。寻找单极的实验一无所获；狄拉克 1931 年证明，只要存在哪怕一个磁单极，电荷就必须量子化。
:::
:::

## 能量：坡印廷定理 {#poynting}

对以速度 $\mathbf v$ 运动的电荷 $q$，力做功的功率为 $\mathbf F\cdot\mathbf v = q\mathbf E\cdot\mathbf v$，因为磁力垂直于 $\mathbf v$。对连续分布，单位体积做功的功率是 $\mathbf J\cdot\mathbf E$。麦克斯韦方程组让我们把这一项完全用场来书写。

::: theorem 坡印廷定理 {#thm-poynting}
定义**能量密度**与**坡印廷矢量**

$$
u = \frac{\varepsilon_0}{2}E^2 + \frac{1}{2\mu_0}B^2, \qquad \mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B .
$$ {#eq-u-S}

则在每一点

$$
\frac{\partial u}{\partial t} + \nabla\cdot\mathbf S = -\mathbf J\cdot\mathbf E ,
$$ {#eq-poynting}

而对以 $\partial\mathcal V$ 为边界的任一固定体积 $\mathcal V$，

$$
\deriv{W_{\mathrm{mech}}}{t} = -\deriv{}{t}\int_{\mathcal V}u\,\dd\tau - \oint_{\partial\mathcal V}\mathbf S\cdot\dd\mathbf a ,
$$

其中 $\dd W_{\mathrm{mech}}/\dd t = \int_{\mathcal V}\mathbf J\cdot\mathbf E\,\dd\tau$ 是场对 $\mathcal V$ 中电荷做功的功率。
:::

::: proof
从安培–麦克斯韦定律解出电流，$\mathbf J = \mu_0^{-1}\nabla\times\mathbf B - \varepsilon_0\,\partial_t\mathbf E$，与 $\mathbf E$ 作标量积：

$$
\mathbf J\cdot\mathbf E = \frac{1}{\mu_0}\mathbf E\cdot(\nabla\times\mathbf B) - \varepsilon_0\mathbf E\cdot\frac{\partial\mathbf E}{\partial t}.
$$

叉积散度的乘积法则是 $\nabla\cdot(\mathbf E\times\mathbf B) = \mathbf B\cdot(\nabla\times\mathbf E) - \mathbf E\cdot(\nabla\times\mathbf B)$。由法拉第定律 $\mathbf B\cdot(\nabla\times\mathbf E) = -\mathbf B\cdot\partial_t\mathbf B$，所以

$$
\mathbf E\cdot(\nabla\times\mathbf B) = -\mathbf B\cdot\frac{\partial\mathbf B}{\partial t} - \nabla\cdot(\mathbf E\times\mathbf B).
$$

代入，并用 $\mathbf E\cdot\partial_t\mathbf E = \frac12\partial_t(E^2)$ 与 $\mathbf B\cdot\partial_t\mathbf B = \frac12\partial_t(B^2)$：

$$
\mathbf J\cdot\mathbf E = -\frac{\partial}{\partial t}\left(\frac{\varepsilon_0}{2}E^2 + \frac{1}{2\mu_0}B^2\right) - \frac{1}{\mu_0}\nabla\cdot(\mathbf E\times\mathbf B),
$$

即 [[#eq-poynting]]。对 $\mathcal V$ 积分，把时间导数移到积分号外（体积固定），再对最后一项用散度定理，得积分形式。
:::

这定律是一条与 [[#eq-continuity]] 同型而带汇的局域守恒律：场中的能量减少，或是因为流出边界，或是因为交给了电荷。线性介质中同样的推导，用 [[#eq-maxwell-matter]] 并把 $\mathbf J$ 换成 $\mathbf J_f$，给出 $\mathbf S = \mathbf E\times\mathbf H$ 与 $u = \frac12(\mathbf E\cdot\mathbf D + \mathbf B\cdot\mathbf H)$。

::: example 电阻的能量从哪里来 {#ex-wire}
半径 $a$、单位长度电阻 $r$ 的长直导线通稳恒电流 $I$。求其表面的坡印廷矢量，以及流入长度 $L$ 的总功率。
::: solution
电流稳恒，场是静的，$\partial u/\partial t = 0$。导线内 $\mathbf E = (Ir)\hat{\mathbf z}$，沿导线均匀，而切向 $\mathbf E$ 连续，所以紧贴表面外侧 $\mathbf E$ 有相同的轴向分量。表面处的磁场为 $\mathbf B = \frac{\mu_0I}{2\pi a}\hat{\boldsymbol\phi}$。于是

$$
\mathbf S = \frac{1}{\mu_0}(Ir)\hat{\mathbf z}\times\frac{\mu_0I}{2\pi a}\hat{\boldsymbol\phi} = \frac{I^2r}{2\pi a}(\hat{\mathbf z}\times\hat{\boldsymbol\phi}) = -\frac{I^2r}{2\pi a}\hat{\mathbf s},
$$

沿径向*指向*导线内部。在长度 $L$、面积 $2\pi aL$ 的圆柱面上，向内的通量为

$$
P = \frac{I^2r}{2\pi a}\cdot2\pi aL = I^2(rL) = I^2R ,
$$

恰是焦耳热。由 [[#thm-poynting]] 且 $\partial_t u = 0$，送给导线中电荷的功率等于 $\mathbf S$ 的向内通量。能量不是随电子在导线内部传输的。它穿过电路周围的空间流动，从电池出发——那里 $\mathbf S$ 指向外——流向电阻——这里它指向内。对半径 $0.500\,\mathrm{mm}$、长 $1\,\mathrm{m}$ 通 $2.00\,\mathrm{A}$、两端电压 $10.0\,\mathrm{V}$ 的一段导线，表面处 $S = 6.37\,\mathrm{kW/m^2}$，而 $S\times2\pi aL = 20.0\,\mathrm{W} = VI$。
:::
:::

::: example 沿同轴电缆输送功率 {#ex-coax}
同轴电缆内导体半径 $a$，外导体半径 $b$。内导体相对外导体处于电势 $V$，沿 $+\hat{\mathbf z}$ 通电流 $I$，电流沿外导体返回。把导体当作理想的，场当作静态的。求导体之间的 $\mathbf S$ 与传输的总功率。
::: solution
导体之间，高斯定律给出径向场 $E = \lambda/(2\pi\varepsilon_0s)$，而 $V = \int_a^bE\,\dd s = (\lambda/2\pi\varepsilon_0)\ln(b/a)$，所以 $\mathbf E = \frac{V}{s\ln(b/a)}\hat{\mathbf s}$。安培环路定律给出 $\mathbf B = \frac{\mu_0I}{2\pi s}\hat{\boldsymbol\phi}$。由于 $\hat{\mathbf s}\times\hat{\boldsymbol\phi} = \hat{\mathbf z}$，

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{VI}{2\pi s^2\ln(b/a)}\hat{\mathbf z},
$$

沿电缆方向，处在导体之间的绝缘空间里。穿过环形截面的功率为

$$
P = \int_a^b\frac{VI}{2\pi s^2\ln(b/a)}2\pi s\,\dd s = \frac{VI}{\ln(b/a)}\int_a^b\frac{\dd s}{s} = VI .
$$

电路公式 $P = VI$ 就是坡印廷矢量的通量。理想导体内部什么都不流动，那里 $\mathbf E = \mathbf 0$；若电导率有限，金属中出现小轴向 $\mathbf E$，$\mathbf S$ 获得径向分量，流入器壁的能量就是 [[#ex-wire]] 的电阻损耗。
:::
:::

::: example 给电容器充进能量 {#ex-cap-energy}
对 [[#ex-capacitor]] 的电容器，极板间距为 $d$，证明间隙边缘处的坡印廷矢量正好解释储能的增长率。
::: solution
在边缘 $s = R$ 处，$\mathbf E = E\hat{\mathbf z}$，$\mathbf B = \frac{\mu_0I}{2\pi R}\hat{\boldsymbol\phi}$。于是 $\mathbf S = \frac{EI}{2\pi R}(\hat{\mathbf z}\times\hat{\boldsymbol\phi}) = -\frac{EI}{2\pi R}\hat{\mathbf s}$：能量经间隙敞开的侧壁流入。通过面积 $2\pi Rd$ 的圆柱侧面，向内功率为 $EId = VI$，其中 $V = Ed$ 是极板电压。储能为 $U = \frac12CV^2$，$C\,\dd V/\dd t = I$，故 $\dd U/\dd t = CV\,\dd V/\dd t = VI$。间隙内的场能为 $u\,\pi R^2d$，$u = \frac12\varepsilon_0E^2$（磁能正比于 $I^2$，对恒定 $I$ 是常量），其变化率为 $\varepsilon_0E\dot E\,\pi R^2d = EId$，二者相同。能量是从侧面进来的，不是通过导线和极板。
:::
:::

对平面波 $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$、$\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$，两份能量密度相等，$\frac12\varepsilon_0E^2 = B^2/2\mu_0$，且 $\mathbf S = cu\,\hat{\mathbf z}$：能量以 $c$ 运动。时间平均能流，即**强度**，为 $I = \langle S\rangle = \frac12c\varepsilon_0E_0^2$。

::: widget wave
A: 1
B: 1
k: 2
w: 3
caption: 两列等幅、反向传播的波，这里是 $\mathbf E$ 的一个分量。它们的和是驻波，像镜子前的场：按下播放，注意节点不动。每列行波携带强度 $\frac12c\varepsilon_0E_0^2$，方向相反，所以驻波的平均坡印廷矢量为零。能量仍在动：它在 $\mathbf E$ 的波腹与 $\mathbf B$ 的波腹之间来回涌动——两者相距四分之一波长、步调差四分之一周期——$\mathbf S$ 绕零振荡。把第二列波的幅度设为 $0$，就回到一列稳定向右携能的单波。
:::

::: example 太阳光 {#ex-sunlight}
地球轨道处大气顶端的太阳强度为 $1361\,\mathrm{W/m^2}$。把阳光当作单列平面波，求 $\mathbf E$ 与 $\mathbf B$ 的振幅。
::: solution
由 $I = \frac12c\varepsilon_0E_0^2$，

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2(1361)}{(2.998\times10^8)(8.854\times10^{-12})}} = 1.01\times10^{3}\,\mathrm{V/m},
$$

$B_0 = E_0/c = 3.38\times10^{-6}\,\mathrm{T}$，约为地静磁场的十五分之一。阳光并非单列平面波（它非相干且未偏振），所以这些是均方根有效振幅乘 $\sqrt2$，但能量账是对的。
:::
:::

## 动量与麦克斯韦应力张量 {#stress}

场既携能也携动量。要求出动量，先算体积中电荷受到的总电磁力，再用麦克斯韦方程组把它完全改写成场的形式。

::: theorem 动量守恒与应力张量 {#thm-stress}
定义**麦克斯韦应力张量**

$$
T_{ij} = \varepsilon_0\left(E_iE_j - \tfrac12\delta_{ij}E^2\right) + \frac{1}{\mu_0}\left(B_iB_j - \tfrac12\delta_{ij}B^2\right).
$$ {#eq-stress}

洛伦兹力密度 $\mathbf f = \rho\mathbf E + \mathbf J\times\mathbf B$ 满足

$$
f_i = \sum_j\partial_jT_{ij} - \mu_0\varepsilon_0\frac{\partial S_i}{\partial t},
$$

所以固定体积 $\mathcal V$ 中电荷受到的总力为

$$
\mathbf F = \oint_{\partial\mathcal V}\overleftrightarrow{\mathbf T}\cdot\dd\mathbf a - \deriv{}{t}\int_{\mathcal V}\mathbf g\,\dd\tau, \qquad \mathbf g = \mu_0\varepsilon_0\mathbf S = \frac{\mathbf S}{c^2}.
$$ {#eq-momentum}

向量 $\mathbf g$ 是场的**动量密度**，$-\overleftrightarrow{\mathbf T}$ 是它的动量流。
:::

::: proof
用高斯定律与安培–麦克斯韦定律消去源，$\rho = \varepsilon_0\nabla\cdot\mathbf E$ 与 $\mathbf J = \mu_0^{-1}\nabla\times\mathbf B - \varepsilon_0\partial_t\mathbf E$：

$$
\mathbf f = \varepsilon_0(\nabla\cdot\mathbf E)\mathbf E + \frac{1}{\mu_0}(\nabla\times\mathbf B)\times\mathbf B - \varepsilon_0\frac{\partial\mathbf E}{\partial t}\times\mathbf B .
$$

由乘积法则与法拉第定律，$\partial_t(\mathbf E\times\mathbf B) = \partial_t\mathbf E\times\mathbf B - \mathbf E\times(\nabla\times\mathbf E)$，所以最后一项是 $-\varepsilon_0\partial_t(\mathbf E\times\mathbf B) - \varepsilon_0\mathbf E\times(\nabla\times\mathbf E)$。添上为零的项 $\mu_0^{-1}(\nabla\cdot\mathbf B)\mathbf B$，让表达式在 $\mathbf E$ 与 $\mathbf B$ 之间对称：

$$
\mathbf f = \varepsilon_0\bigl[(\nabla\cdot\mathbf E)\mathbf E - \mathbf E\times(\nabla\times\mathbf E)\bigr] + \frac{1}{\mu_0}\bigl[(\nabla\cdot\mathbf B)\mathbf B - \mathbf B\times(\nabla\times\mathbf B)\bigr] - \varepsilon_0\frac{\partial}{\partial t}(\mathbf E\times\mathbf B).
$$

由恒等式 $\mathbf E\times(\nabla\times\mathbf E) = \frac12\nabla(E^2) - (\mathbf E\cdot\nabla)\mathbf E$，按分量得

$$
\bigl[(\nabla\cdot\mathbf E)\mathbf E + (\mathbf E\cdot\nabla)\mathbf E - \tfrac12\nabla(E^2)\bigr]_i = \sum_j\partial_j\bigl(E_iE_j - \tfrac12\delta_{ij}E^2\bigr),
$$

对 $\mathbf B$ 同样。由于 $\varepsilon_0\mathbf E\times\mathbf B = \mu_0\varepsilon_0\mathbf S$，此即所述的局域定律。对 $\mathcal V$ 积分，对 $\partial_jT_{ij}$ 用散度定理，得 [[#eq-momentum]]。
:::

$T_{ij}$ 的对角元是压强与张力。对沿 $\hat{\mathbf z}$ 的场，$T_{zz} = +\frac12\varepsilon_0E^2$，$T_{xx} = T_{yy} = -\frac12\varepsilon_0E^2$：磁感线仿佛沿自身长度处于张力之下、又在侧向互相推挤——这正是法拉第的直觉。静平衡的导体表面受到向外的压强 $\frac12\varepsilon_0E^2 = \sigma^2/2\varepsilon_0$，即 [[electrostatics/capacitance]] 中的静电压。

::: example 两个半球之间的斥力 {#ex-hemisphere}
半径 $R$ 的薄球壳均匀带总电荷 $Q$。用应力张量求北半球被南半球推开的力。对 $Q = 1.00\,\mu\mathrm{C}$、$R = 10.0\,\mathrm{cm}$ 求值。
::: solution
场是静态的，$\mathbf g$ 恒定，闭合面内电荷受的力为 $\oint\overleftrightarrow{\mathbf T}\cdot\dd\mathbf a$。选一张面包围北半球而不围其他任何东西的曲面：赤道面 $z = 0$，加一张无穷远半球面封住。在无穷远半球面上 $T\sim1/r^4$ 而面积 $\sim r^2$，无贡献。

在赤道面上，所围区域的外法向是 $-\hat{\mathbf z}$。$s<R$ 处在球壳内，$\mathbf E = \mathbf 0$。$s>R$ 处 $\mathbf E = \frac{Q}{4\pi\varepsilon_0s^2}\hat{\mathbf s}$ 位于面内，故 $E_z = 0$ 而 $T_{zz} = -\frac12\varepsilon_0E^2$。力的 $z$ 分量为

$$
F_z = \int T_{zz}\,(-1)\,\dd a = \frac{\varepsilon_0}{2}\int_R^\infty\left(\frac{Q}{4\pi\varepsilon_0s^2}\right)^2 2\pi s\,\dd s = \frac{Q^2}{16\pi\varepsilon_0}\int_R^\infty\frac{\dd s}{s^3} = \frac{Q^2}{32\pi\varepsilon_0R^2}.
$$

力为正，向上：半球互相排斥。数值上，

$$
F = \frac{(1.00\times10^{-6})^2}{32\pi(8.854\times10^{-12})(0.100)^2} = 0.112\,\mathrm{N}.
$$

校核：球壳受到的向外压强为 $\sigma^2/2\varepsilon_0$，$\sigma = Q/4\pi R^2$；其在半球面上的 $z$ 分量积分等于压强乘投影面积 $\pi R^2$，给出同一个 $Q^2/(32\pi\varepsilon_0R^2)$。应力张量从一张根本不接触电荷的平面上的场就算出了力。
:::
:::

对平面波，动量密度为 $g = u/c$，动量沿 $\hat{\mathbf k}$ 以 $c$ 流动。正对波的吸收面单位时间单位面积接收的动量为 $\langle S\rangle/c$，即**辐射压**；完美反射面接收其两倍。对地球处的阳光，$1361/c = 4.54\,\mu\mathrm{Pa}$。数值虽小，却塑造了彗尾，并被用来驱动航天器。

::: example 作为洛伦兹力的辐射压 {#ex-mirror}
$z<0$ 中的平面波 $E_0\cos(kz - \omega t)\hat{\mathbf x}$ 垂直入射到充满 $z>0$ 的完美导体上。求导体表面的电流，并证明作用在其上的磁力给出压强 $2\langle S\rangle/c$。
::: solution
切向 $\mathbf E$ 必须在 $z = 0$ 处消失，所以存在反射波 $-E_0\cos(kz + \omega t)\hat{\mathbf x}$，它沿 $-\hat{\mathbf z}$ 传播，其磁场为 $(E_0/c)\cos(kz + \omega t)\hat{\mathbf y}$。表面处真空一侧的总磁场为 $\mathbf B = (2E_0/c)\cos\omega t\,\hat{\mathbf y}$，内部为零。由切向 $\mathbf H$ 的条件，法向从金属指向真空取 $-\hat{\mathbf z}$，面电流为

$$
\mathbf K = \frac{2E_0}{\mu_0c}\cos\omega t\,\hat{\mathbf x}.
$$

面电流层感受两侧场的平均值 $\frac12(2E_0/c)\cos\omega t\,\hat{\mathbf y}$，所以单位面积受力为

$$
\mathbf K\times\mathbf B_{\mathrm{avg}} = \frac{2E_0^2}{\mu_0c^2}\cos^2\omega t\,(\hat{\mathbf x}\times\hat{\mathbf y}) = 2\varepsilon_0E_0^2\cos^2\omega t\,\hat{\mathbf z},
$$

指向导体内部。其时间平均为 $\varepsilon_0E_0^2 = 2\cdot\frac12c\varepsilon_0E_0^2/c = 2\langle S\rangle/c$。光对镜子的压强就是光感应的电流受到的磁力，这是应力张量的答案从电荷一侧看过去的样子。
:::
:::

::: remark 静场中的角动量
场还存储角动量，密度为 $\mathbf r\times\mathbf g$。即便一切静止，它也可以非零：磁偶极子旁的电荷周围有 $\mathbf E\times\mathbf B\ne\mathbf 0$。若切断磁铁的电流，感应电场对电荷施加力矩，机械角动量出现，取自于场。这就是"费曼圆盘佯谬"（《费曼物理学讲义》第二卷 §17-4）；没有场的角动量，系统将违反角动量守恒。
:::

## 势与规范 {#potentials}

对含时场，$\nabla\cdot\mathbf B = 0$ 仍然允许 $\mathbf B = \nabla\times\mathbf A$。但 $\mathbf E$ 不再是无旋的。代入法拉第定律，

$$
\nabla\times\left(\mathbf E + \frac{\partial\mathbf A}{\partial t}\right) = \mathbf 0 ,
$$

所以括号里是一个梯度，记作 $-\nabla V$。

::: definition 含时场的势 {#def-potentials}
场由**标量势** $V$ 与**矢量势** $\mathbf A$ 给出：

$$
\mathbf B = \nabla\times\mathbf A, \qquad \mathbf E = -\nabla V - \frac{\partial\mathbf A}{\partial t} .
$$ {#eq-potentials}

**规范变换**

$$
\mathbf A\to\mathbf A + \nabla\lambda, \qquad V\to V - \frac{\partial\lambda}{\partial t},
$$ {#eq-gauge}

其中 $\lambda(\mathbf r, t)$ 为任意可微函数，保持 $\mathbf E$ 与 $\mathbf B$ 不变。
:::

不变性是直接的：$\nabla\times\nabla\lambda = \mathbf 0$，且 $-\nabla(-\partial_t\lambda) - \partial_t(\nabla\lambda) = \mathbf 0$。有了 [[#eq-potentials]]，两条齐次麦克斯韦方程自动成立。另两条成为关于势的方程。高斯定律给出

$$
\nabla^2V + \frac{\partial}{\partial t}(\nabla\cdot\mathbf A) = -\frac{\rho}{\varepsilon_0},
$$ {#eq-gauss-pot}

安培–麦克斯韦定律配合 $\nabla\times(\nabla\times\mathbf A) = \nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A$ 给出

$$
\left(\nabla^2\mathbf A - \frac{1}{c^2}\frac{\partial^2\mathbf A}{\partial t^2}\right) - \nabla\left(\nabla\cdot\mathbf A + \frac{1}{c^2}\frac{\partial V}{\partial t}\right) = -\mu_0\mathbf J .
$$ {#eq-ampere-pot}

这两式是耦合的，而规范自由度的存在正是为了把它们解耦。

### 库仑规范 {#coulomb-gauge}

像静磁学那样选 $\nabla\cdot\mathbf A = 0$，[[#eq-gauss-pot]] 就化为泊松方程 $\nabla^2V = -\rho/\varepsilon_0$，其解是瞬时的库仑积分。矢量势则满足一条波动方程，源是 $\mu_0\mathbf J$ 减去一个含 $V$ 的梯度项。当所关心的区域内没有源（此时 $V = 0$，仅由 $\mathbf A$ 描述辐射）以及非相对论量子力学中，这一规范很方便。

::: warning 库仑规范中的势是瞬时的，但没有哪个物理量是
在库仑规范下，$\rho$ 在宇宙任何地方的改变都会让 $V(\mathbf r, t)$ 立即响应。这不违反因果律，因为 $V$ 不可观测。场 $\mathbf E = -\nabla V - \partial_t\mathbf A$ 中还含有 $\partial_t\mathbf A$，而 $\partial_t\mathbf A$ 的瞬时部分恰好抵消 $\nabla V$ 的瞬时部分，留下的 $\mathbf E$ 以 $c$ 传播。不要从某规范下某一点的势的值推出物理结论。
:::

### 洛伦兹规范 {#lorenz-gauge}

[[#eq-ampere-pot]] 中的第二个括号提示了更好的选择。

::: definition 洛伦兹规范 {#def-lorenz}
满足

$$
\nabla\cdot\mathbf A + \frac{1}{c^2}\frac{\partial V}{\partial t} = 0
$$ {#eq-lorenz}

的势处于**洛伦兹规范**。在此规范下 [[#eq-gauss-pot]] 与 [[#eq-ampere-pot]] 成为非齐次波动方程

$$
\Box V = -\frac{\rho}{\varepsilon_0}, \qquad \Box\mathbf A = -\mu_0\mathbf J, \qquad \Box = \nabla^2 - \frac{1}{c^2}\frac{\partial^2}{\partial t^2}.
$$ {#eq-wave-pot}
:::

对 $\mathbf A$ 的代入是立即的。对 $V$，在 [[#eq-gauss-pot]] 中用 [[#eq-lorenz]] 把 $\nabla\cdot\mathbf A$ 换成 $-c^{-2}\partial_tV$。现在四个分量各按自己的源服从同一条方程，势被解耦，而且结构在每个惯性系中显然相同——[[electrodynamics/relativistic-fields]] 会把这一点明确写出。

::: proposition 总可以到达洛伦兹规范 {#prop-lorenz}
给定场 $(\mathbf E, \mathbf B)$ 的任意势 $(V, \mathbf A)$，存在规范函数 $\lambda$ 使变换后的势满足 [[#eq-lorenz]]。剩余的自由度是满足 $\Box\lambda = 0$ 的规范函数。
:::

::: proof
对给定的势令 $L = \nabla\cdot\mathbf A + c^{-2}\partial_tV$。经 [[#eq-gauge]] 变换后，

$$
L' = \nabla\cdot(\mathbf A + \nabla\lambda) + \frac{1}{c^2}\frac{\partial}{\partial t}\left(V - \frac{\partial\lambda}{\partial t}\right) = L + \nabla^2\lambda - \frac{1}{c^2}\frac{\partial^2\lambda}{\partial t^2} = L + \Box\lambda .
$$

我们需要 $\Box\lambda = -L$，这是关于 $\lambda$ 的一条源已知的非齐次波动方程。它总有解；[[electrodynamics/radiation]] 的推迟积分对任何合理的 $L$ 都给出一个。两个解相差 $\Box\lambda = 0$ 的一个解，而任何这样的 $\lambda$ 都保持条件 $L' = 0$。
:::

::: example 同一个场，两种规范 {#ex-gauge}
证明 $V = -E_0x$、$\mathbf A = \mathbf 0$ 与 $V' = 0$、$\mathbf A' = -E_0t\,\hat{\mathbf x}$ 描述同一个场，求规范函数，并说明每组势各自满足哪些规范。
::: solution
第一组：$\mathbf E = -\nabla(-E_0x) = E_0\hat{\mathbf x}$，$\mathbf B = \mathbf 0$。第二组：$\mathbf E = -\partial_t(-E_0t\,\hat{\mathbf x}) = E_0\hat{\mathbf x}$，$\mathbf B = \nabla\times\mathbf A' = \mathbf 0$，因为 $\mathbf A'$ 不依赖位置。同一个静态匀强场。我们需要 $\nabla\lambda = -E_0t\,\hat{\mathbf x}$ 且 $-\partial_t\lambda = 0 - (-E_0x) = E_0x$。函数 $\lambda = -E_0xt$ 同时满足二者。两组都有 $\nabla\cdot\mathbf A = 0$ 与 $\partial_tV = 0$，所以既在库仑规范也在洛伦兹规范；$\Box\lambda = \nabla^2(-E_0xt) - c^{-2}\partial_t^2(-E_0xt) = 0$，正如 [[#prop-lorenz]] 对两个洛伦兹规范势之间的变换所要求的。静场可以用含时势来描述，这又是不该只从势读物理的一条理由。
:::
:::

::: quiz
在洛伦兹规范下，哪些说法是对的？
- [x] $\mathbf A$ 的每个笛卡儿分量以及 $V$ 都满足一条非齐次波动方程。
- [ ] 势是唯一的。
- [x] 洛伦兹规范中的静势同时满足库仑规范。
- [ ] $V$ 对 $\rho$ 的改变瞬时响应。
::: solution
由 [[#eq-wave-pot]]，四个势服从 $\Box\phi = -(\text{源})$。它们不唯一：由 [[#prop-lorenz]]，可以加上任何满足 $\Box\lambda = 0$ 的 $\lambda$。静势 $\partial_tV = 0$，所以 [[#eq-lorenz]] 化为 $\nabla\cdot\mathbf A = 0$。波动方程以 $c$ 传播变化；瞬时响应属于库仑规范。
:::
:::

::: history 麦克斯韦的综合
迈克尔·法拉第（Michael Faraday）1831 年发现电磁感应，并把磁体与电流周围的空间想象为布满处于张力之下的力线。詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）当时在伦敦国王学院，在《论物理学的力线》（*On Physical Lines of Force*，1861–62）中引入位移电流——他用了一个以太的机械模型——并注意到他的模型中横波的速度与光速的测量值一致。《电磁场的动力学理论》（*A Dynamical Theory of the Electromagnetic Field*，1865）去掉机械模型重建了理论，《电与磁通论》（*A Treatise on Electricity and Magnetism*，1873）则以势、用四元数与分量记号把它详尽写出。1867 年，丹麦物理学家路德维格·洛伦兹（Ludvig Lorenz）独立地以推迟势建立了电动力学，其势满足今天以他命名的条件（这一条件常被误归于亨德里克·洛伦兹（Hendrik Lorentz））。约翰·亨利·坡印廷（John Henry Poynting）1884 年发表了他的能量流这一定律；奥利弗·赫维赛德（Oliver Heaviside）几乎同时独立发现，并在 1884–85 年的论文中把麦克斯韦方程组化简为今天使用的四条向量方程。海因里希·赫兹（Heinrich Hertz）1887–88 年产生并探测到电磁波，证实了麦克斯韦的预言。彼得·列别捷夫（Pyotr Lebedev，1900）以及欧内斯特·福克斯·尼科尔斯（Ernest Fox Nichols）与戈登·赫尔（Gordon Hull，1901）测量了光的压强。
:::

## 后续内容 {#leads}

[[electrodynamics/waves-in-media]] 对平面波在介质中求解麦克斯韦方程组，应用本章的边界条件导出反射与折射，并沿着坡印廷矢量进入导体——在那里它在趋肤深度之内衰减。[[electrodynamics/radiation]] 用推迟格林函数求解波动方程 [[#eq-wave-pot]]，并把坡印廷定理用于大球面来计算加速电荷辐射的功率。在 [[electrodynamics/relativistic-fields]] 中，$(V/c, \mathbf A)$ 成为一个四矢量，洛伦兹条件成为四维散度为零 $\partial_\mu A^\mu = 0$，能量密度、坡印廷矢量与应力张量合并为电磁能量–动量张量。在这里只是一种方便的规范不变性，在 [[particles]] 中将成为标准模型的组织原则。

::: summary
- 电荷守恒 $\partial_t\rho + \nabla\cdot\mathbf J = 0$ 与 $\nabla\times\mathbf B = \mu_0\mathbf J$ 不相容；位移电流 $\varepsilon_0\,\partial_t\mathbf E$ 恢复了自洽，并使电流通过电容器时连续。
- 麦克斯韦方程组加洛伦兹力就是经典电动力学的全部；在介质中 $\mathbf D$ 与 $\mathbf H$ 吸收束缚电荷与电流，边界条件就是静场的那几条。
- 坡印廷定理 $\partial_tu + \nabla\cdot\mathbf S = -\mathbf J\cdot\mathbf E$，其中 $u = \frac12\varepsilon_0E^2 + B^2/2\mu_0$、$\mathbf S = \mathbf E\times\mathbf B/\mu_0$，是局域能量守恒；能量经周围空间到达电阻。
- 场携带动量密度 $\mathbf g = \mathbf S/c^2$，麦克斯韦应力张量把电荷受的力写成场的面积分；平面波对吸收面的压强为 $\langle S\rangle/c$。
- 含时场有势 $\mathbf B = \nabla\times\mathbf A$、$\mathbf E = -\nabla V - \partial_t\mathbf A$，只确定到规范变换 $\mathbf A\to\mathbf A + \nabla\lambda$、$V\to V - \partial_t\lambda$。
- 库仑规范 $\nabla\cdot\mathbf A = 0$ 使 $V$ 瞬时；洛伦兹规范 $\nabla\cdot\mathbf A + c^{-2}\partial_tV = 0$ 把麦克斯韦方程组化为四条波动方程 $\Box V = -\rho/\varepsilon_0$、$\Box\mathbf A = -\mu_0\mathbf J$。
:::

## 习题 {#exercises}

::: exercise 激光笔 {level=1 check="2190"}
一束 $5.00\,\mathrm{mW}$ 的激光束具有均匀圆形截面，直径 $1.00\,\mathrm{mm}$。求其电场振幅，以 $\mathrm{V/m}$ 计，以及它作用在吸收屏上的力。
::: solution
强度为 $I = P/A = (5.00\times10^{-3})/(\pi(0.500\times10^{-3})^2) = 6.37\times10^{3}\,\mathrm{W/m^2}$。于是

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2(6366)}{(2.998\times10^{8})(8.854\times10^{-12})}} = 2.19\times10^{3}\,\mathrm{V/m}.
$$

吸收面受力 $P/c = (5.00\times10^{-3})/(2.998\times10^{8}) = 1.67\times10^{-11}\,\mathrm{N}$。
:::
:::

::: exercise 金属中的位移电流 {level=1 check="9.33"}
铜（$\sigma = 5.96\times10^{7}\,\mathrm{S/m}$）中通频率 $1.00\,\mathrm{GHz}$ 的电流，求位移电流密度与传导电流密度振幅之比，以 $10^{-10}$ 为单位。金属束缚电荷的介电常数取 $\varepsilon_0$。
::: solution
$\mathbf J = \sigma\mathbf E$ 且 $\mathbf E\propto\cos\omega t$，位移电流密度 $\varepsilon_0\partial_t\mathbf E$ 的振幅为 $\omega\varepsilon_0E$，所以比值是

$$
\frac{\omega\varepsilon_0}{\sigma} = \frac{2\pi(1.00\times10^{9})(8.854\times10^{-12})}{5.96\times10^{7}} = 9.33\times10^{-10}.
$$

良好导体内部的位移电流即使在微波波段也可忽略。导体之外，它才是一切。
:::
:::

::: exercise 把电容器极板吸在一起 {level=1 check="0.443"}
平行板电容器极板间的场为 $1.00\times10^{6}\,\mathrm{V/m}$，每块极板面积 $0.100\,\mathrm{m^2}$。用应力张量以牛顿计求极板间的力。
::: solution
把一块极板围进一个盒子，其在间隙中的面与极板平行。电容器外场为零；间隙中 $\mathbf E$ 垂直于该面，所以该面上 $T_{nn} = \frac12\varepsilon_0E^2$，是一个把极板拉向场区的张力。力为

$$
F = \tfrac12\varepsilon_0E^2A = \tfrac12(8.854\times10^{-12})(1.00\times10^{6})^2(0.100) = 0.443\,\mathrm{N},
$$

是吸引力。等价地 $F = Q^2/(2\varepsilon_0A)$，能量方法得出的熟悉结果。
:::
:::

::: exercise 海水何时算导体？ {level=2 check="888"}
海水 $\sigma\approx4.0\,\mathrm{S/m}$、$\varepsilon_r\approx81$。求传导电流密度与位移电流密度振幅相等时的频率，以 MHz 计。
::: solution
介电常数 $\varepsilon = \varepsilon_r\varepsilon_0$ 的介质中，位移电流密度为 $\varepsilon\,\partial_t\mathbf E$，振幅 $\omega\varepsilon E$。令其等于 $\sigma E$，

$$
f = \frac{\sigma}{2\pi\varepsilon_r\varepsilon_0} = \frac{4.0}{2\pi(81)(8.854\times10^{-12})} = 8.88\times10^{8}\,\mathrm{Hz} = 888\,\mathrm{MHz}.
$$

低于此频率，海水表现为导体，这就是潜艇用极低频通信、雷达无法穿透海水的原因。对衰减的影响在 [[electrodynamics/waves-in-media]] 中算出。
:::
:::

::: exercise 太阳帆 {level=2 check="9.08"}
面积 $1.00\,\mathrm{km^2}$ 的完美反射帆在地球轨道距离上正对太阳，该处强度 $1361\,\mathrm{W/m^2}$。帆及其载荷质量 $1000\,\mathrm{kg}$。求加速度，以 $\mathrm{mm/s^2}$ 计。
::: solution
垂直入射的完美反射面反转光的动量，所以压强为 $2I/c = 2(1361)/(2.998\times10^{8}) = 9.08\times10^{-6}\,\mathrm{Pa}$。力为 $9.08\times10^{-6}\times1.00\times10^{6} = 9.08\,\mathrm{N}$，加速度 $9.08\times10^{-3}\,\mathrm{m/s^2} = 9.08\,\mathrm{mm/s^2}$。若能维持一年，速度改变约 $290\,\mathrm{km/s}$，这就是无法携带推进剂的任务认真考虑太阳帆的原因。
:::
:::

::: exercise 平面波的坡印廷定理 {level=2}
对真空中的 $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$ 与 $\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$，$\omega = ck$，直接验证 [[#eq-poynting]]，并证明动量密度为 $u/c$。
::: solution
记 $\phi = kz - \omega t$。则 $u = \frac12\varepsilon_0E_0^2\cos^2\phi + \frac{1}{2\mu_0}\frac{E_0^2}{c^2}\cos^2\phi = \varepsilon_0E_0^2\cos^2\phi$，用了 $1/(\mu_0c^2) = \varepsilon_0$。坡印廷矢量为 $\mathbf S = \frac{1}{\mu_0}\frac{E_0^2}{c}\cos^2\phi\,\hat{\mathbf z} = c\varepsilon_0E_0^2\cos^2\phi\,\hat{\mathbf z} = cu\,\hat{\mathbf z}$。于是

$$
\frac{\partial u}{\partial t} = \varepsilon_0E_0^2\cdot2\cos\phi\sin\phi\cdot\omega, \qquad \nabla\cdot\mathbf S = c\varepsilon_0E_0^2\cdot(-2\cos\phi\sin\phi)\cdot k ,
$$

其和为零，因为 $\omega = ck$，这正是 $\mathbf J = \mathbf 0$ 时 [[#eq-poynting]] 所要求的。动量密度 $\mathbf g = \mathbf S/c^2 = (u/c)\hat{\mathbf z}$。关系 $g = u/c$ 正是无质量粒子的 $p = E/c$，而光子就是这样的东西。
:::
:::

::: exercise 流入螺线管的能量 {level=2}
半径 $R$、单位长度 $n$ 匝的长螺线管通缓慢增长的电流 $I(t)$。用法拉第定律求绕组内表面处的感应电场，并证明穿过长度 $\ell$ 的向内坡印廷通量等于内部磁能的增速。
::: solution
内部 $B = \mu_0nI$，沿轴线。对半径 $R$ 的圆用法拉第定律，$E\cdot2\pi R = -\pi R^2\dot B$，所以 $\mathbf E = -\frac{R}{2}\mu_0n\dot I\,\hat{\boldsymbol\phi}$（由楞次定律与电流反向）。于是

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{1}{\mu_0}\left(-\frac{R\mu_0n\dot I}{2}\right)(\mu_0nI)\,(\hat{\boldsymbol\phi}\times\hat{\mathbf z}) = -\frac{\mu_0n^2RI\dot I}{2}\hat{\mathbf s},
$$

沿径向向内。通过面积 $2\pi R\ell$，向内功率为 $\pi R^2\ell\,\mu_0n^2I\dot I$。内部的磁能为 $\frac{B^2}{2\mu_0}\pi R^2\ell = \frac12\mu_0n^2I^2\pi R^2\ell$，其增速相同。用电路语言这就是 $LI\dot I = \frac{\dd}{\dd t}(\frac12LI^2)$，$L = \mu_0n^2\pi R^2\ell$：反抗反电动势所做的功以场能的形式从侧面进入螺线管。
:::
:::

::: exercise 平面波的势 {level=2}
证明 $V = 0$、$\mathbf A = \frac{E_0}{\omega}\sin(kz - \omega t)\hat{\mathbf x}$（$\omega = ck$）产生平面波 $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$、$\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$，并且同时满足库仑条件与洛伦兹条件。然后对 $\lambda = \frac{E_0}{\omega k}\cos(kz - \omega t)$ 作规范变换，说明哪个条件得以保留。
::: solution
记 $\phi = kz - \omega t$。则 $\mathbf E = -\partial_t\mathbf A = -\frac{E_0}{\omega}\cos\phi\,(-\omega)\hat{\mathbf x} = E_0\cos\phi\,\hat{\mathbf x}$，而 $A_x(z,t)\hat{\mathbf x}$ 的旋度是 $\partial_zA_x\,\hat{\mathbf y} = \frac{E_0k}{\omega}\cos\phi\,\hat{\mathbf y} = \frac{E_0}{c}\cos\phi\,\hat{\mathbf y}$。$A_x$ 不依赖 $x$，故 $\nabla\cdot\mathbf A = 0$，且 $V = 0$，两个条件都成立。

变换后，$\nabla\lambda = -\frac{E_0}{\omega}\sin\phi\,\hat{\mathbf z}$，$\partial_t\lambda = \frac{E_0}{k}\sin\phi$，所以

$$
\mathbf A' = \frac{E_0}{\omega}\sin\phi\,(\hat{\mathbf x} - \hat{\mathbf z}), \qquad V' = -\frac{E_0}{k}\sin\phi .
$$

场不变：$-\nabla V' - \partial_t\mathbf A' = E_0\cos\phi\,\hat{\mathbf z} + E_0\cos\phi\,(\hat{\mathbf x} - \hat{\mathbf z}) = E_0\cos\phi\,\hat{\mathbf x}$。现在 $\nabla\cdot\mathbf A' = -\frac{E_0k}{\omega}\cos\phi\neq0$，库仑条件被破坏，但

$$
\nabla\cdot\mathbf A' + \frac{1}{c^2}\frac{\partial V'}{\partial t} = -\frac{E_0k}{\omega}\cos\phi + \frac{E_0\omega}{c^2k}\cos\phi = 0
$$

因为 $\omega = ck$。洛伦兹条件保留下来，正如 [[#prop-lorenz]] 所预言：$\lambda$ 满足 $\Box\lambda = -(k^2 - \omega^2/c^2)\lambda = 0$。新的势有一个纵向部分和一个标量部分，它们在 $\mathbf E$ 中相互抵消；它们就是量子电动力学必须小心不数成光子的规范模。
:::
:::

::: exercise 由应力张量得库仑定律 {level=3 check="22.5"}
两个电荷 $q$ 位于 $z = \pm d$。对平面 $z = 0$ 使用应力张量，求上方电荷受的力并证明它与库仑定律一致。对 $q = 1.00\,\mathrm{nC}$、$d = 1.00\,\mathrm{cm}$ 以 $\mu\mathrm{N}$ 计求值。
::: hint
在中面上两个场的 $z$ 分量相消。你需要 $\int_0^\infty u\,\dd u/(u + d^2)^3 = 1/(2d^2)$。
:::
::: solution
平面 $z = 0$ 上距轴线 $s$ 的一点，每个电荷产生大小为 $q/(4\pi\varepsilon_0(s^2+d^2))$ 的场。$z$ 分量相消，面内分量相加，得 $\mathbf E = \frac{2qs}{4\pi\varepsilon_0(s^2+d^2)^{3/2}}\hat{\mathbf s}$。于是 $E_z = 0$，$T_{zz} = -\frac12\varepsilon_0E^2$。围住上半空间；其在平面上的外法向为 $-\hat{\mathbf z}$，无穷远半球面无贡献。所以

$$
F_z = \frac{\varepsilon_0}{2}\int_0^\infty\frac{4q^2s^2}{(4\pi\varepsilon_0)^2(s^2+d^2)^3}2\pi s\,\dd s = \frac{q^2}{4\pi\varepsilon_0}\int_0^\infty\frac{s^3\,\dd s}{(s^2+d^2)^3}.
$$

令 $u = s^2$，$\int_0^\infty s^3\,\dd s/(s^2+d^2)^3 = \frac12\int_0^\infty u\,\dd u/(u+d^2)^3 = 1/(4d^2)$。故 $F_z = q^2/(4\pi\varepsilon_0(2d)^2)$，向上，正是间距 $2d$ 时的库仑斥力。数值上 $F = (8.988\times10^9)(1.00\times10^{-18})/(0.0200)^2 = 2.25\times10^{-5}\,\mathrm{N} = 22.5\,\mu\mathrm{N}$。
:::
:::

::: exercise 麦克斯韦方程组的唯一性 {level=3}
真空中的固定区域 $\mathcal V$ 内，源 $\rho$ 与 $\mathbf J$ 在 $t\ge0$ 给定。证明 $\mathcal V$ 中 $t > 0$ 的场由它们在 $t = 0$ 的值连同边界 $\partial\mathcal V$ 上 $t\ge0$ 的 $\mathbf E$ 切向分量唯一确定。
::: hint
对两个解之差应用坡印廷定理。
:::
::: solution
设 $(\mathbf E_1, \mathbf B_1)$ 与 $(\mathbf E_2, \mathbf B_2)$ 是源相同、初值相同、边界上切向 $\mathbf E$ 相同的两个解。由线性性，差 $\mathbf E = \mathbf E_1 - \mathbf E_2$、$\mathbf B = \mathbf B_1 - \mathbf B_2$ 满足 $\rho = 0$、$\mathbf J = \mathbf 0$ 的麦克斯韦方程组，$t = 0$ 时为零，且在 $\partial\mathcal V$ 上 $\hat{\mathbf n}\times\mathbf E = \mathbf 0$。对差场用无电流情形的坡印廷定理，

$$
\deriv{}{t}\int_{\mathcal V}u\,\dd\tau = -\oint_{\partial\mathcal V}\frac{1}{\mu_0}(\mathbf E\times\mathbf B)\cdot\hat{\mathbf n}\,\dd a = -\oint_{\partial\mathcal V}\frac{1}{\mu_0}(\hat{\mathbf n}\times\mathbf E)\cdot\mathbf B\,\dd a = 0,
$$

最后一步用了三重积的轮换性质。于是差场的能量守恒，而它在 $t = 0$ 时为零。由于 $u = \frac12\varepsilon_0E^2 + B^2/2\mu_0$ 是非负连续项之和，$\int u\,\dd\tau = 0$ 迫使一切 $t\ge0$ 的 $\mathcal V$ 中处处 $\mathbf E = \mathbf 0$、$\mathbf B = \mathbf 0$。（在边界上改给切向 $\mathbf B$ 同样可行。）这就是 [[electrodynamics/electrostatics#thm-unique]] 的动力学对应，$\int\lvert\nabla W\rvert^2$ 的角色由能量承担。
:::
:::
