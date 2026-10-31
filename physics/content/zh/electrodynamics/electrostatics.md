一个点电荷坐在半径五厘米的接地金属球的球外，距球心十厘米。它被拉向球的力有多大？单凭库仑定律答不出来，因为球上的感应电荷并没有给出：它自行排布，使球面保持零电势。真正的问题是求球外的电势——它满足一条微分方程，又在球面上取给定的值。这就是**边值问题**，第一门电磁学课程之后的静电学大半属于这一类。

本章把 [[electrostatics/gauss-law]] 与 [[electrostatics/potential]] 的积分定律化为一条偏微分方程，证明它的解被边界数据固定下来，然后发展求这个解的三种标准方法：镜像法、分离变量法与多极展开。本章以电介质收尾。对 $1\,\mathrm{nC}$ 的电荷，开篇问题的答案是 $0.80\,\mu\mathrm{N}$，而它只消三行就能算出。

向量微积分沿用 [[math-methods/vector-calculus]] 与 [[math-methods/integral-theorems]]。[[math-methods/fourier]] 的傅里叶级数与 [[math-methods/odes]] 的勒让德多项式直接引用、不再重新推导；自由空间格林函数 $1/(4\pi\lvert\mathbf r-\mathbf r'\rvert)$ 就是 [[math-methods/green-functions]] 中构造的那个。全程 SI 单位，$\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$，$1/(4\pi\varepsilon_0) = 8.98755\times10^{9}\,\mathrm{N\,m^2/C^2}$。

## 泊松方程与拉普拉斯方程 {#poisson}

静电学建立在关于静止电荷的场 $\mathbf E$ 的两条微分陈述之上。高斯定律的微分形式是 $\nabla\cdot\mathbf E = \rho/\varepsilon_0$。静止电荷分布的场还是无旋的，$\nabla\times\mathbf E = \mathbf 0$，因为它是库仑场的叠加，而每一个库仑场都是一个梯度。于是对某个标量势 $V$（差一个常数即被确定）有 $\mathbf E = -\nabla V$，高斯定律就成为关于一个未知数的一条二阶方程。

::: definition 泊松方程与拉普拉斯方程 {#def-poisson}
电荷密度 $\rho$ 的静电势 $V$ 满足**泊松方程**

$$
\nabla^2 V = -\frac{\rho}{\varepsilon_0}, \qquad \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}.
$$ {#eq-poisson}

在无电荷的区域它化为**拉普拉斯方程**

$$
\nabla^2 V = 0.
$$ {#eq-laplace}

二次可导、在区域上满足 [[#eq-laplace]] 的函数称为在该区域上**调和**。
:::

在全空间、并取 $V \to 0$（无穷远处）的条件下，[[#eq-poisson]] 的解是库仑积分

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\int \frac{\rho(\mathbf r')}{\lvert\mathbf r - \mathbf r'\rvert}\,\dd\tau',
$$ {#eq-coulomb-int}

因为 $\nabla^2(1/\lvert\mathbf r-\mathbf r'\rvert) = -4\pi\,\delta^3(\mathbf r - \mathbf r')$。这正是 [[math-methods/green-functions]] 中的格林函数解。只有当每一个电荷都事先已知时，它才是正确答案。只要有导体在场，$\rho$ 中就有一部分是未知的感应电荷，[[#eq-coulomb-int]] 就成了一个关于它自身的方程。带边界条件的泊松方程避开了这一循环：我们在导体之间的空间里解出 $V$，事后再从它读出感应电荷。

### 边界条件 {#bc}

对一块带面电荷密度 $\sigma$的表面，把高斯定律用于一张跨过该面的扁圆柱形高斯面，把环量定律用于一条细长方形回路。让厚度趋于零，以 $\hat{\mathbf n}$ 为从侧 1 指向侧 2 的单位法向，得

$$
E_2^{\perp} - E_1^{\perp} = \frac{\sigma}{\varepsilon_0}, \qquad \mathbf E_2^{\parallel} = \mathbf E_1^{\parallel}, \qquad V_2 = V_1.
$$ {#eq-jump}

用势写出，第一条条件是 $\partial V_2/\partial n - \partial V_1/\partial n = -\sigma/\varepsilon_0$。平衡导体的内部 $\mathbf E = \mathbf 0$，所以它的整个体积是一个等势体，紧邻外侧的场垂直于其表面，而感应面电荷为

$$
\sigma = -\varepsilon_0 \frac{\partial V}{\partial n},
$$ {#eq-sigma-cond}

其中 $\hat{\mathbf n}$ 是导体的外法向。本章的每一个问题都以这条公式收尾。

::: example 接地板之间均匀带电的板 {#ex-slab}
两块位于 $x = 0$ 与 $x = d$ 的大平行金属板都接地。两板之间的空间充满均匀电荷密度 $\rho$。求 $V(x)$、最大电势，以及每块板上单位面积感应的电荷。对 $d = 1.00\,\mathrm{cm}$、$\rho = 1.00\times10^{-5}\,\mathrm{C/m^3}$ 求值。
::: solution
极板很大，所以 $V$ 只依赖 $x$，[[#eq-poisson]] 成为常微分方程 $V'' = -\rho/\varepsilon_0$。积分两次，

$$
V(x) = -\frac{\rho}{2\varepsilon_0}x^2 + C_1 x + C_2 .
$$

条件 $V(0) = 0$ 与 $V(d) = 0$ 给出 $C_2 = 0$、$C_1 = \rho d/(2\varepsilon_0)$，所以

$$
V(x) = \frac{\rho}{2\varepsilon_0}\,x(d - x).
$$

最大值在中位面处，$V(d/2) = \rho d^2/(8\varepsilon_0)$。代入数字，

$$
V_{\max} = \frac{(1.00\times10^{-5})(1.00\times10^{-2})^2}{8\,(8.854\times10^{-12})} = 14.1\,\mathrm{V}.
$$

在 $x = 0$ 的板上，导体的外法向指向 $+x$，所以 [[#eq-sigma-cond]] 给出 $\sigma = -\varepsilon_0 V'(0) = -\rho d/2$。在 $x = d$ 处外法向指向 $-x$，而 $\sigma = +\varepsilon_0 V'(d) = -\rho d/2$。两板合计抵消了板状体单位面积电荷 $\rho d$，所以外部电场为零。数值上，每块板上 $\sigma = -5.00\times10^{-8}\,\mathrm{C/m^2}$。
:::
:::

### 平均值性质 {#mean-value}

调和函数有一种惊人的刚性，它是下文一切内容的根源。

::: theorem 平均值性质 {#thm-mean}
设 $V$ 在包含以 $\mathbf r_0$ 为心、半径 $R$ 的闭球的区域上调和。则 $V(\mathbf r_0)$ 等于 $V$ 在以 $\mathbf r_0$ 为心、半径 $R$ 的球面上的平均值：

$$
V(\mathbf r_0) = \frac{1}{4\pi R^2}\oint_{\lvert\mathbf r-\mathbf r_0\rvert = R} V\,\dd a .
$$ {#eq-mean}
:::

::: proof
把半径 $s$ 球面上的平均值写作 $\bar V(s) = \frac{1}{4\pi}\oint V(\mathbf r_0 + s\hat{\mathbf u})\,\dd\Omega$，它是对方向 $\hat{\mathbf u}$ 的积分，积分域不再通过定义域依赖 $s$。在积分号下求导，

$$
\deriv{\bar V}{s} = \frac{1}{4\pi}\oint \hat{\mathbf u}\cdot\nabla V\,\dd\Omega = \frac{1}{4\pi s^2}\oint_{\text{球面 } s} \nabla V\cdot\dd\mathbf a = \frac{1}{4\pi s^2}\int_{\text{球体 } s} \nabla^2 V\,\dd\tau = 0,
$$

最后用的是散度定理与 [[#eq-laplace]]。于是 $\bar V(s)$ 在 $0 < s \le R$ 上是常量。当 $s \to 0$，由 $V$ 的连续性，$\bar V(s) \to V(\mathbf r_0)$。故 $\bar V(R) = V(\mathbf r_0)$。
:::

::: corollary 恩肖定理 {#cor-earnshaw}
调和函数在区域内部没有严格的局部极大值或局部极小值。因此，若某点的静电场只由其他固定的电荷产生，点电荷就不可能在该点处于稳定平衡。
:::

::: proof
若 $V$ 在 $\mathbf r_0$ 有严格的局部极大值，则在 $\mathbf r_0$ 的小球面上每一个值都小于 $V(\mathbf r_0)$，它们的平均值也不例外，与 [[#thm-mean]] 矛盾。同样的论证排除了局部极小值。放在 $\mathbf r_0$ 的试探电荷 $q$ 的电势能是 $qV$，而其他电荷都在 $\mathbf r_0$ 的小球之外，所以那里 $V$ 是调和的。稳定平衡要求 $qV$ 有严格的局部极小值，而 [[#thm-mean]] 对 $q$ 的任一符号都不允许。
:::

恩肖定理（1842）解释了为什么离子只能靠振荡场（保尔阱）或外加磁场（彭宁阱）被俘获，而绝不可能单靠静电场。

## 唯一性定理 {#uniqueness}

求解泊松方程的方法，只有当它给出的答案正是*那个*答案时才有用。下面的定理说：合适类型的边界数据把解完全固定下来，于是任何满足方程与边界条件的函数——无论是怎么找到的——都是正确的。

::: theorem 泊松方程的唯一性 {#thm-unique}
设 $\Omega$ 是以闭曲面 $S = S_1\cup\dots\cup S_N$ 为边界的连通区域。设 $V_1$ 与 $V_2$ 在 $\Omega$ 内二次连续可导，一阶导数到 $S$ 连续，并且都满足同一 $\rho$ 的 $\nabla^2 V = -\rho/\varepsilon_0$。设在每个 $S_i$ 上，或者 $V_1 = V_2$（狄利克雷数据），或者 $\partial V_1/\partial n = \partial V_2/\partial n$（诺伊曼数据）。则在 $\Omega$ 内处处 $V_1 = V_2$；唯一的例外是：若每个 $S_i$ 上给的都是诺伊曼数据，则 $V_1 - V_2$ 是一个常量，而场 $\mathbf E$ 仍然唯一。若 $\Omega$ 延伸到无穷远，只要两个电势在无穷远至少按 $1/r$ 的速度为零、梯度至少按 $1/r^2$ 的速度衰减，结论同样成立。
:::

::: proof
令 $W = V_1 - V_2$。两条泊松方程相减，在 $\Omega$ 内 $\nabla^2 W = 0$。乘积法则给出

$$
\nabla\cdot(W\nabla W) = \nabla W\cdot\nabla W + W\,\nabla^2 W = \lvert\nabla W\rvert^2 .
$$

在 $\Omega$ 上积分并用散度定理，$\hat{\mathbf n}$ 为 $\Omega$ 的外法向：

$$
\int_\Omega \lvert\nabla W\rvert^2\,\dd\tau = \oint_S W\,\frac{\partial W}{\partial n}\,\dd a = \sum_{i=1}^{N} \oint_{S_i} W\,\frac{\partial W}{\partial n}\,\dd a .
$$

在每个 $S_i$ 上或者 $W = 0$，或者 $\partial W/\partial n = 0$，所以每个面积分都消失。对无界区域，把一切围进半径 $L$ 的大球面；在其上 $W = O(1/L)$、$\partial W/\partial n = O(1/L^2)$，而面积是 $4\pi L^2$，所以它的贡献是 $O(1/L) \to 0$。于是 $\int_\Omega\lvert\nabla W\rvert^2\,\dd\tau = 0$。被积函数连续且非负，故 $\Omega$ 内处处 $\nabla W = \mathbf 0$；又因 $\Omega$ 连通，$W$ 是常量。若某个 $S_i$ 上给的是狄利克雷数据，或者区域无界且 $W\to0$，这个常量就是零。否则它没有定下来，但无论如何 $\mathbf E_1 - \mathbf E_2 = -\nabla W = \mathbf 0$。
:::

第一个推论：导体内部的一个空腔里没有电荷时，$V$ 在腔内调和，且在腔壁上等于导体的恒定电势，所以由 [[#thm-unique]]，它在整个腔内就是这个常量而 $\mathbf E = \mathbf 0$——外部有什么电荷都一样。这就是法拉第笼；这一论证是静场的论证，变化很快的场是另一回事（[[electrodynamics/waves-in-media]]）。

定理涵盖了由电池维持在给定电压上的导体：它们的表面带狄利克雷数据。孤立导体则不同：给出的不是它们的电势，而是它们的总电荷。定理的第二个形式处理这种情形。

::: corollary 给定导体电荷时的唯一性 {#cor-unique-charge}
设导体 $C_1,\dots,C_N$ 之外的区域 $\Omega$ 内含给定的电荷密度 $\rho$，每个导体带给定的总电荷 $Q_i$，并且像 [[#thm-unique]] 那样在无穷远 $V \to 0$。则 $\Omega$ 中的电场是唯一的。
:::

::: proof
设 $\mathbf E_1, \mathbf E_2$ 是具有电势 $V_1, V_2$ 的两个解，令 $W = V_1 - V_2$。每个导体在两个解中都是等势体，所以 $W$ 在 $C_i$ 的表面 $S_i$ 上取常量值 $W_i$。把 $\Omega$ 的法向取向为指向导体内部，[[#thm-unique]] 的计算给出

$$
\int_\Omega \lvert\nabla W\rvert^2\,\dd\tau = \sum_i W_i \oint_{S_i}\frac{\partial W}{\partial n}\,\dd a .
$$

对紧贴 $C_i$ 的曲面用高斯定律，任一解都有 $\oint_{S_i}\mathbf E\cdot\hat{\mathbf n}_{\mathrm{out}}\,\dd a = Q_i/\varepsilon_0$，其中 $\hat{\mathbf n}_{\mathrm{out}}$ 指向导体外，与 $\Omega$ 的法向相反。由于 $-\nabla W = \mathbf E_1 - \mathbf E_2$，沿 $\Omega$ 法向的导数是 $\partial W/\partial n = (\mathbf E_1 - \mathbf E_2)\cdot\hat{\mathbf n}_{\mathrm{out}}$，它在 $S_i$ 上的积分是 $(Q_i - Q_i)/\varepsilon_0 = 0$。无穷远处的曲面一如前述没有贡献。每一项都消失，所以 $\nabla W = \mathbf 0$，$\mathbf E_1 = \mathbf E_2$。
:::

::: quiz
一个无电荷的区域由两张闭曲面围成。外侧那张上给定了 $V$；内侧那张上什么也没给。区域内的电势被确定了吗？
- [ ] 确定了，因为二阶方程有一个边界条件就够。
- [x] 没有：边界的每一部分都需要数据，内表面上取不同的值就给出不同的解。
- [ ] 确定了，但差一个相加的常量。
- [ ] 没有，因为拉普拉斯方程没有取狄利克雷数据的解。
::: solution
对半径 $a<b$ 的同心球面之间、$V(b) = 0$ 的区域，对任何 $C$，函数 $V = C(1/r - 1/b)$ 都调和且满足外部条件。固定内球面上的 $V$、$\partial V/\partial n$，或者（若是导体）内球的总电荷，就从 $C$ 中选中了一个值。
:::
:::

## 镜像法 {#images}

唯一性为猜测发放了许可证。任何在区域内满足泊松方程、在其边缘上满足边界条件的函数就是解。**镜像法**这样猜：把虚构的电荷放在区域*之外*——那里它们不打扰区域内的泊松方程——电荷的大小与位置选得让导体表面成为等势面。

### 无限大接地平面 {#image-plane}

点电荷 $q$ 坐在接地导体平面 $z = 0$ 上方高度 $d$ 处。区域是 $z > 0$，平面上与无穷远处 $V = 0$。在 $(0,0,-d)$ 放一个镜像电荷 $-q$。对 $z>0$，

$$
V(x,y,z) = \frac{q}{4\pi\varepsilon_0}\left[\frac{1}{\sqrt{x^2+y^2+(z-d)^2}} - \frac{1}{\sqrt{x^2+y^2+(z+d)^2}}\right].
$$ {#eq-image-plane}

镜像在区域之外，所以区域内 $\nabla^2 V = -\rho/\varepsilon_0$ 成立，源只有真实电荷。在 $z = 0$ 上两个距离相等且 $V = 0$，无穷远处 $V \to 0$。由 [[#thm-unique]]，这就是电势。感应面电荷由 [[#eq-sigma-cond]] 配合外法向 $+\hat{\mathbf z}$ 得到：

$$
\sigma(s) = -\varepsilon_0\frac{\partial V}{\partial z}\bigg|_{z=0} = -\frac{q\,d}{2\pi\,(s^2+d^2)^{3/2}}, \qquad s^2 = x^2+y^2 .
$$

由于 $\int_0^\infty s\,\dd s/(s^2+d^2)^{3/2} = 1/d$，感应电荷总量为 $\int_0^\infty\sigma\,2\pi s\,\dd s = -q$，与镜像电荷相等。$q$ 受到的力就是镜像施加的 $q^2/(4\pi\varepsilon_0(2d)^2)$，方向指向平面，因为 $z>0$ 中的场就是这两个点电荷的场。

::: warning 镜像不是真的，它的能量也不是
镜像电荷只在物理区域内复原场。平面以下，真实的场是零，而不是 $-q$ 的场。有一个推论让许多学生失手：把 $q$ 从无穷远搬到高度 $d$ 所需的功是 $-q^2/(4\pi\varepsilon_0\cdot 4d)$，是相距 $2d$ 的两个真实电荷 $q$ 与 $-q$ 的相互作用能 $-q^2/(4\pi\varepsilon_0\cdot 2d)$ 的*一半*。把力 $q^2/(16\pi\varepsilon_0 z^2)$ 从 $\infty$ 积到 $d$ 就能看到这一点；那个因子的由来是：$q$ 动时镜像也动，而场能只存在于平面的一侧。
:::

### 接地球 {#image-sphere}

球正是回答开篇问题的场合，而单个镜像居然管用并不显然。

::: theorem 接地球的镜像 {#thm-sphere-image}
点电荷 $q$ 距半径 $R < a$ 的接地导体球的球心为 $a$。球外的电势就是 $q$ 与一个镜像电荷

$$
q' = -\frac{R}{a}\,q \quad\text{位于距球心}\quad b = \frac{R^2}{a}
$$ {#eq-sphere-image}

处二者共同产生的电势，镜像在球心与 $q$ 的连线上。球上感应的总电荷是 $q'$。
:::

::: proof
把球心放在原点，$q$ 放在 $a\hat{\mathbf z}$，镜像放在 $b\hat{\mathbf z}$，$b = R^2/a < R$。对球面上极角为 $\theta$ 的一点 $\mathbf r = R\hat{\mathbf r}$，

$$
\lvert\mathbf r - b\hat{\mathbf z}\rvert^2 = R^2 - 2Rb\cos\theta + b^2 = R^2 - \frac{2R^3}{a}\cos\theta + \frac{R^4}{a^2} = \frac{R^2}{a^2}\left(a^2 - 2aR\cos\theta + R^2\right) = \frac{R^2}{a^2}\lvert\mathbf r - a\hat{\mathbf z}\rvert^2 .
$$

因此球面上每一点到镜像点的距离都是它到 $q$ 的距离的 $R/a$ 倍。取 $q' = -qR/a$，

$$
\frac{q}{\lvert\mathbf r-a\hat{\mathbf z}\rvert} + \frac{q'}{\lvert\mathbf r-b\hat{\mathbf z}\rvert} = \frac{q}{\lvert\mathbf r-a\hat{\mathbf z}\rvert} - \frac{qR}{a}\cdot\frac{a}{R\,\lvert\mathbf r-a\hat{\mathbf z}\rvert} = 0
$$

在球面上成立。镜像在球内部、区域 $r > R$ 之外，电势在无穷远趋于零。由 [[#thm-unique]]，$q$ 与 $q'$ 的电势就是 $r > R$ 的解。至于感应电荷，对半径略大于 $R$ 的球面用高斯定律：在物理问题里它只包围感应电荷；在镜像问题里，同样的场给出通量 $q'/\varepsilon_0$。两个场在那张面上一致，所以感应电荷就是 $q'$。
:::

到两个定点的距离成固定比值的点集是一个球面，*阿波罗尼奥斯球面*。

::: example 电荷在接地球旁的受力 {#ex-sphere-force}
电荷 $q = 1.00\,\mathrm{nC}$ 距半径 $R = 5.00\,\mathrm{cm}$ 的接地球球心 $a = 10.0\,\mathrm{cm}$。求它受到的力。再求若球改为孤立且不带电时的力。
::: solution
由 [[#eq-sphere-image]]，$q' = -(5.00/10.0)(1.00\,\mathrm{nC}) = -0.500\,\mathrm{nC}$，位于距球心 $b = R^2/a = 2.50\,\mathrm{cm}$ 处。$q$ 与 $q'$ 相距 $a - b = 7.50\,\mathrm{cm}$，所以力为

$$
F = \frac{1}{4\pi\varepsilon_0}\frac{q\,q'}{(a-b)^2} = (8.988\times10^{9})\frac{(1.00\times10^{-9})(-0.500\times10^{-9})}{(0.0750)^2} = -7.99\times10^{-7}\,\mathrm{N},
$$

即 $0.799\,\mu\mathrm{N}$ 的吸引力。这就是开篇的问题。

若球是孤立且中性的，它的总电荷必须为零，而且必须是等势体，尽管电势未必为零。在球心加第二个镜像 $q'' = -q' = +0.500\,\mathrm{nC}$。球心的点电荷在球面上只添一个常量，所以球仍是等势体，而包围的总电荷现在为零。由 [[#cor-unique-charge]]，这就是解。力为

$$
F = \frac{q}{4\pi\varepsilon_0}\left[\frac{q'}{(a-b)^2} + \frac{-q'}{a^2}\right] = (8.988)\left[\frac{-0.500}{0.0750^2} + \frac{0.500}{0.100^2}\right]\times10^{-9}\,\mathrm{N} = -3.50\times10^{-7}\,\mathrm{N}.
$$

中性球仍然吸引该电荷，因为感应负电荷坐在比补偿正电荷更靠近 $q$ 的地方，只是强度不到一半。$a$ 很大时吸引力按 $1/a^5$ 下降，这是感应偶极子的印记。
:::
:::

::: widget charges
charges: 1, 2, 0; -0.5, 0.5, 0
caption: 真实电荷 $q = 1$ 位于距球心 $a = 2$ 处，它的镜像 $q' = -\tfrac12$ 位于 $b = \tfrac12$ 处，这使以原点为心、半径 $R = 1$ 的圆成为等势线。沿着那个圆看（它经过 $x = \pm1$ 与 $y = \pm1$）：每根箭头都垂直穿过它，正如导体表面处的场必须的那样。圆外的箭头是真实的场。圆内的箭头是虚构那一对电荷的场，毫无意义；金属内部的真实场是零。
:::

## 分离变量法 {#separation}

镜像法对平面、球以及少数其他形状管用。对边界是坐标面的问题，一套系统的方法是分离变量法：寻找拉普拉斯方程的那些解，它们的形式是每个只含一个坐标的函数的乘积，再把解做成这种乘积的级数，系数与边界数据相配。

### 笛卡儿坐标 {#cartesian}

考虑一条无限长的槽：接地板 $y = 0$ 与 $y = a$，从 $x = 0$ 延伸到 $x = \infty$，在 $x = 0$ 处由一块维持在电势 $V_0$、与两板绝缘的窄条封口。一切不依赖 $z$。我们要求槽内的 $V(x,y)$，并且 $x \to \infty$ 时 $V \to 0$。

试 $V = X(x)Y(y)$。拉普拉斯方程除以 $XY$ 得

$$
\frac{X''}{X} + \frac{Y''}{Y} = 0 .
$$

第一项只依赖 $x$，第二项只依赖 $y$，所以各自是一个常量：$X''/X = k^2$，$Y''/Y = -k^2$。条件 $Y(0) = Y(a) = 0$ 迫使 $Y = \sin(n\pi y/a)$，$k = n\pi/a$，$n = 1,2,\dots$；而 $x\to\infty$ 时的衰减选出 $X = e^{-n\pi x/a}$。线性允许任意叠加，

$$
V(x,y) = \sum_{n=1}^\infty C_n\, e^{-n\pi x/a}\sin\frac{n\pi y}{a}.
$$

最后一个条件——对 $0<y<a$ 有 $V(0,y) = V_0$——就是常量 $V_0$ 的傅里叶正弦级数。乘以 $\sin(m\pi y/a)$ 并对 $0<y<a$ 积分，利用 $\int_0^a \sin(n\pi y/a)\sin(m\pi y/a)\,\dd y = \tfrac a2\delta_{nm}$，

$$
C_n = \frac{2}{a}\int_0^a V_0\sin\frac{n\pi y}{a}\,\dd y = \frac{2V_0}{n\pi}\bigl(1 - \cos n\pi\bigr) = \begin{cases} 4V_0/(n\pi), & n \text{ 为奇数},\\ 0, & n \text{ 为偶数}.\end{cases}
$$

于是

$$
V(x,y) = \frac{4V_0}{\pi}\sum_{n\ \mathrm{odd}}\frac{1}{n}\,e^{-n\pi x/a}\sin\frac{n\pi y}{a} .
$$ {#eq-slot}

每一项都调和，级数在 $x > 0$ 收敛（指数因子使它收敛得极快），并且满足每一条边界条件。由 [[#thm-unique]]，这就是答案。这个和甚至能闭式算出，$V = (2V_0/\pi)\arctan\bigl[\sin(\pi y/a)/\sinh(\pi x/a)\bigr]$，但级数才是能够推广的那个方法。

::: widget plot
f: sum(4/((2*k-1)*pi)*exp(-(2*k-1)*pi*s)*sin((2*k-1)*pi*x), k, 1, N)
x: 0, 1
y: -0.1, 1.3
sliders: N=1:1:30:1; s=0:0:1:0.02
labels: V/V₀ 沿槽横向
caption: [[#eq-slot]] 取 $N$ 个奇数项的部分和，以 $y/a$ 为横轴画出槽内深度 $s = x/a$ 处的分布。从 $s = 0$、即末端窄条开始：项数少时曲线在 $1$ 附近起伏，加大 $N$ 它变平，但在角落附近保留约 $18\%$ 的过冲（吉布斯现象），因为正弦级数正在设法重现极板处向零的跳跃。现在把 $s$ 调到 $0.1$：起伏消失了；到 $s = 0.5$，单独一项与整个和已经无法分辨。高次谐波按 $e^{-n\pi x/a}$ 衰减，所以场在约一个槽宽之内就忘记了边界的细节。
:::

::: example 槽多快忘记它的边界 {#ex-slot}
用 [[#eq-slot]] 求中线 $y = a/2$ 上 $x = a/2$ 与 $x = a$ 处的 $V/V_0$，并与只取第一项比较。
::: solution
中线上 $n = 1, 3, 5, \dots$ 时 $\sin(n\pi/2) = +1, -1, +1,\dots$。在 $x = a/2$ 处，

$$
\frac{V}{V_0} = \frac{4}{\pi}\left[e^{-\pi/2} - \frac{1}{3}e^{-3\pi/2} + \frac{1}{5}e^{-5\pi/2} - \cdots\right] = \frac{4}{\pi}\bigl[0.20788 - 0.00299 + 0.00008 - \cdots\bigr] = 0.2610 .
$$

第一项单独给出 $0.2647$，高了 $1.4\%$。在 $x = a$ 处，

$$
\frac{V}{V_0} = \frac{4}{\pi}\left[e^{-\pi} - \frac13 e^{-3\pi} + \cdots\right] = 0.05499,
$$

第一项给出 $0.05502$，误差 $0.06\%$。闭式给出同样的值。向内一个槽宽，就只剩下最低的模了。
:::
:::

### 球坐标与勒让德多项式 {#spherical}

当边界是球面、问题关于 $z$ 轴对称时，$V$ 只依赖 $r$ 与极角 $\theta$。此时球坐标下的拉普拉斯方程是

$$
\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial V}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\,\frac{\partial V}{\partial\theta}\right) = 0 .
$$

令 $V = R(r)\Theta(\theta)$，乘以 $r^2/(R\Theta)$ 并分离变量：$\frac{1}{R}(r^2R')' = l(l+1)$，$\frac{1}{\Theta\sin\theta}(\sin\theta\,\Theta')' = -l(l+1)$，把常量写成 $l(l+1)$ 只是一个便利。径向方程由幂求解：$r^2R'' + 2rR' = l(l+1)R$ 的解是 $r^l$ 与 $r^{-(l+1)}$。角向方程在变量 $x = \cos\theta$ 下是勒让德方程 $\bigl((1-x^2)\Theta'\bigr)' + l(l+1)\Theta = 0$，它的解只在 $l$ 为非负整数时才在两极 $x = \pm1$ 处都有限，此时解就是**勒让德多项式** $P_l(\cos\theta)$，由罗德里格斯公式 $P_l(x) = \frac{1}{2^l l!}\frac{\dd^l}{\dd x^l}(x^2-1)^l$ 给出：

$$
P_0 = 1,\quad P_1 = x,\quad P_2 = \tfrac12(3x^2-1),\quad P_3 = \tfrac12(5x^3-3x).
$$

背后的级数方法见 [[math-methods/odes]]。它们正交，$\int_{-1}^{1}P_l(x)P_{l'}(x)\,\dd x = \frac{2}{2l+1}\delta_{ll'}$，且在 $[-1,1]$ 上完备。因此拉普拉斯方程的一般轴对称解是

$$
V(r,\theta) = \sum_{l=0}^\infty\left(A_l\,r^l + \frac{B_l}{r^{l+1}}\right)P_l(\cos\theta).
$$ {#eq-legendre-general}

在球内部，原点处的正则性消掉 $B_l$；在球外部，无穷远处的衰减消掉 $A_l$（外场强加的那些项除外）。

::: example 匀强场中的导体球 {#ex-sphere-field}
半径 $R$ 的不带电导体球放入匀强场 $\mathbf E_0 = E_0\hat{\mathbf z}$。求外部电势、感应面电荷与感应电偶极矩。
::: solution
把电势零点取在未受扰场的赤道面上，于是远离球时 $V \to -E_0 z = -E_0 r\cos\theta$。由对称性，球的电势就是其赤道面的电势，$V = 0$。于是边界数据是 $V(R,\theta) = 0$，以及 $r \to\infty$ 时 $V \to -E_0r\cos\theta$。

[[#eq-legendre-general]] 中，无穷远处的条件在诸 $A_l$ 里只允许 $A_1 = -E_0$。在 $r = R$ 上，

$$
\sum_l\left(A_lR^l + \frac{B_l}{R^{l+1}}\right)P_l(\cos\theta) = 0 \quad\text{对一切 }\theta,
$$

由正交性每个系数都为零：$B_l = -A_lR^{2l+1}$。只有 $l = 1$ 存活，$B_1 = E_0R^3$：

$$
V(r,\theta) = -E_0\left(r - \frac{R^3}{r^2}\right)\cos\theta, \qquad r \ge R .
$$

感应电荷由 [[#eq-sigma-cond]] 配合外法向 $\hat{\mathbf r}$ 得

$$
\sigma(\theta) = -\varepsilon_0\frac{\partial V}{\partial r}\bigg|_{r=R} = \varepsilon_0E_0\left(1 + \frac{2R^3}{R^3}\right)\cos\theta = 3\varepsilon_0E_0\cos\theta .
$$

它在球面上的积分为零，本应如此。添上的那一项 $E_0R^3\cos\theta/r^2$ 是一个点偶极子的势 [[#eq-dipole]]，其中 $p/(4\pi\varepsilon_0) = E_0R^3$，所以

$$
\mathbf p = 4\pi\varepsilon_0R^3\,\mathbf E_0 .
$$

导体球的极化率是 $4\pi\varepsilon_0R^3$，正比于它的体积。对 $R = 1.00\,\mathrm{cm}$、$E_0 = 1.00\times10^5\,\mathrm{V/m}$，$p = 1.11\times10^{-11}\,\mathrm{C\,m}$。两极处的场是 $3E_0$，为外场的三倍。
:::
:::

## 多极展开 {#multipole}

远离一个局域的电荷分布时，分布的细节越来越无关紧要。多极展开把这一点说清楚：它把外部电势写成 $1/r$ 的级数，系数是电荷的各阶矩。

设 $\rho$ 在原点附近半径 $r_{\max}$ 的球外为零，并设 $r > r_{\max}$。对与 $\mathbf r$ 成角 $\alpha$ 的源点 $\mathbf r'$，勒让德多项式的生成函数 $(1 - 2xt + t^2)^{-1/2} = \sum_l P_l(x)t^l$（$\lvert t\rvert<1$）取 $t = r'/r$、$x = \cos\alpha$ 给出

$$
\frac{1}{\lvert\mathbf r-\mathbf r'\rvert} = \frac{1}{r}\left(1 - 2\frac{r'}{r}\cos\alpha + \frac{r'^2}{r^2}\right)^{-1/2} = \sum_{l=0}^\infty\frac{r'^l}{r^{l+1}}P_l(\cos\alpha).
$$

代入 [[#eq-coulomb-int]] 并把求和与积分交换——$r'\le r_{\max}<r$ 时的一致收敛允许这样做——

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\sum_{l=0}^\infty\frac{1}{r^{l+1}}\int (r')^l P_l(\cos\alpha)\,\rho(\mathbf r')\,\dd\tau' .
$$ {#eq-multipole}

$l = 0$ 项是**单极**势 $Q/(4\pi\varepsilon_0 r)$，其中 $Q = \int\rho\,\dd\tau'$ 是总电荷。对 $l = 1$，$r'\cos\alpha = \hat{\mathbf r}\cdot\mathbf r'$，积分就是 $\hat{\mathbf r}\cdot\mathbf p$。

::: definition 电偶极矩与偶极势 {#def-dipole}
电荷分布关于原点的**电偶极矩**是 $\mathbf p = \int\mathbf r'\rho(\mathbf r')\,\dd\tau'$，点电荷情形为 $\mathbf p = \sum_i q_i\mathbf r_i$。**偶极势**为

$$
V_{\mathrm{dip}}(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\frac{\mathbf p\cdot\hat{\mathbf r}}{r^2} .
$$ {#eq-dipole}
:::

偶极场由求导得到。取 $\mathbf p = p\hat{\mathbf z}$，$V = p\cos\theta/(4\pi\varepsilon_0r^2)$，于是 $E_r = -\partial_r V = 2p\cos\theta/(4\pi\varepsilon_0r^3)$，$E_\theta = -r^{-1}\partial_\theta V = p\sin\theta/(4\pi\varepsilon_0r^3)$。由于 $\mathbf p = p(\cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta})$，两个分量合成为不带坐标的形式

$$
\mathbf E_{\mathrm{dip}}(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\frac{3(\mathbf p\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf p}{r^3} .
$$ {#eq-dipole-field}

轴线上场沿 $\mathbf p$、大小 $2p/(4\pi\varepsilon_0r^3)$；赤道面上场与 $\mathbf p$ 反向、大小 $p/(4\pi\varepsilon_0r^3)$。四极项 $l = 2$ 可写成 $\frac{1}{4\pi\varepsilon_0}\frac{1}{2r^3}\sum_{ij}Q_{ij}\hat r_i\hat r_j$，其中无迹张量 $Q_{ij} = \int(3x_i'x_j' - r'^2\delta_{ij})\rho\,\dd\tau'$；每往上一阶就多掉一个 $r$ 的幂。

::: proposition 偶极矩何时依赖原点 {#prop-origin}
把原点平移 $\mathbf d$，电偶极矩变为 $\mathbf p - Q\mathbf d$。因此它与原点无关当且仅当总电荷 $Q$ 为零。
:::

::: proof
新原点在 $\mathbf d$ 时，源位置变为 $\mathbf r' - \mathbf d$，而 $\int(\mathbf r'-\mathbf d)\rho\,\dd\tau' = \mathbf p - \mathbf d\int\rho\,\dd\tau' = \mathbf p - Q\mathbf d$。当 $Q = 0$ 时它对每个 $\mathbf d$ 都等于 $\mathbf p$，此外不可能。
:::

一般说来，最低的非零矩与原点无关，更高的矩则不然。

::: example 线性四极子 {#ex-quadrupole}
$z = \pm d$ 处各放 $+q$，原点放 $-2q$。求 $r\gg d$ 时电势的主导项。
::: solution
总电荷与电偶极矩 $\sum q_iz_i = qd - qd = 0$ 都为零，所以 [[#eq-multipole]] 的前两项为零。点电荷情形第 $l$ 项是 $\frac{1}{4\pi\varepsilon_0r^{l+1}}\sum_iq_ir_i^lP_l(\cos\alpha_i)$。原点的电荷 $r_i = 0$，对 $l\ge1$ 毫无贡献。外面两个电荷的 $\cos\alpha$ 分别是 $\cos\theta$ 与 $-\cos\theta$，而 $P_2$ 是偶函数，所以

$$
V \approx \frac{1}{4\pi\varepsilon_0}\frac{2qd^2P_2(\cos\theta)}{r^3} = \frac{1}{4\pi\varepsilon_0}\frac{qd^2(3\cos^2\theta - 1)}{r^3}.
$$

它按 $1/r^3$ 下降，在锥面 $\cos^2\theta = 1/3$（$\theta = 54.7^\circ$ 与 $125.3^\circ$）上为零，沿轴线为正——同种电荷 $+q$ 在轴线一侧更近。
:::
:::

::: quiz
一个分布总电荷 $Q = 0$，关于原点的电偶极矩 $\mathbf p\ne\mathbf 0$。把原点平移 $\mathbf d$。哪些说法是对的？
- [x] 电偶极矩不变。
- [ ] 电偶极矩变为 $\mathbf p - Q\mathbf d$，与 $\mathbf p$ 不同。
- [x] 四极矩可能改变。
- [ ] 远处电势现在按 $1/r$ 下降。
::: solution
由 [[#prop-origin]]，平移使 $\mathbf p$ 改变 $-Q\mathbf d = \mathbf 0$，所以最低的非零矩是内禀的。下一个矩，四极矩，会添上与 $\mathbf p$ 和 $\mathbf d$ 成正比的项，所以它确实依赖原点。单极为零，所以无论原点在哪里都没有 $1/r$ 项。
:::
:::

## 电介质 {#dielectrics}

绝缘体中电子束缚在各自的分子上，但外加场会把它们稍稍挪开一点，或者让本来就有偶极矩的分子转向。场中的物质成为一片微小偶极子构成的连续体。

::: definition 电极化强度 {#def-polarisation}
材料的**电极化强度** $\mathbf P(\mathbf r)$ 是它的单位体积电偶极矩，平均范围相对分子要大、相对场变化的尺度要小。SI 单位是 $\mathrm{C/m^2}$。
:::

### 束缚电荷 {#bound}

极化体的电势是偶极势 [[#eq-dipole]] 的叠加，其中 $\mathbf p$ 换成 $\mathbf P\,\dd\tau'$：

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\int\frac{\mathbf P(\mathbf r')\cdot(\mathbf r-\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' = \frac{1}{4\pi\varepsilon_0}\int\mathbf P\cdot\nabla'\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' ,
$$

用了 $\nabla'(1/\lvert\mathbf r-\mathbf r'\rvert) = (\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3$。用 $\nabla'\cdot(f\mathbf P) = f\nabla'\cdot\mathbf P + \mathbf P\cdot\nabla' f$ 与对整个物体用的散度定理作分部积分：

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\oint_S\frac{\mathbf P\cdot\hat{\mathbf n}'}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd a' + \frac{1}{4\pi\varepsilon_0}\int\frac{-\nabla'\cdot\mathbf P}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' .
$$

这正是一个面电荷与一个体电荷的电势，

$$
\sigma_b = \mathbf P\cdot\hat{\mathbf n}, \qquad \rho_b = -\nabla\cdot\mathbf P ,
$$ {#eq-bound}

即**束缚电荷**。它们是真实的电荷：均匀极化的板在两个面上留着未抵消的异号层；在 $\mathbf P$ 不均匀处，进入小体积的偶极端比离开它的多。

### 电位移场 {#displacement}

高斯定律数的是全部电荷，$\varepsilon_0\nabla\cdot\mathbf E = \rho_f + \rho_b = \rho_f - \nabla\cdot\mathbf P$，其中 $\rho_f$ 是我们控制的**自由电荷**。把 $\mathbf P$ 移到左边，就定义了一个散度只等于自由电荷的场。

::: definition 电位移矢量与线性电介质 {#def-D}
**电位移矢量** $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$。它满足

$$
\nabla\cdot\mathbf D = \rho_f, \qquad \oint\mathbf D\cdot\dd\mathbf a = Q_{f,\mathrm{enc}} .
$$ {#eq-gauss-D}

若 $\mathbf P = \varepsilon_0\chi_e\mathbf E$，材料是**线性电介质**，$\chi_e$ 称为**电极化率**。此时 $\mathbf D = \varepsilon\mathbf E$，**介电常数** $\varepsilon = \varepsilon_0(1+\chi_e) = \varepsilon_0\varepsilon_r$，其中 $\varepsilon_r$ 是**相对介电常数**（dielectric constant）。
:::

对一张带自由面电荷 $\sigma_f$ 的界面，扁圆柱与环路的论证现在给出

$$
D_2^\perp - D_1^\perp = \sigma_f, \qquad \mathbf E_2^{\parallel} = \mathbf E_1^{\parallel} .
$$ {#eq-bc-D}

无自由电荷的均匀线性电介质内部，$\nabla\cdot\mathbf E = 0$，所以 $V$ 又是调和的，本章的全部内容逐区域成立，用 [[#eq-bc-D]] 把各区域缝合起来。

::: warning $\mathbf D$ 不是“自由电荷的场”
方程 [[#eq-gauss-D]] 看上去像去掉了 $\varepsilon_0$ 与束缚电荷的高斯定律，诱人写下 $\mathbf D = \frac{1}{4\pi}\int\rho_f(\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3\,\dd\tau'$。这在一般情况下是假的，因为一个向量场由它的散度*和*旋度共同确定，而 $\nabla\times\mathbf D = \nabla\times\mathbf P$ 未必为零。一根均匀极化的驻极体棒没有自由电荷，其端部附近却 $\mathbf D \neq \mathbf 0$。$\mathbf D$ 的高斯定律只有在对称性、或被同一种线性电介质均匀充满的区域把旋度打发掉时才有用。
:::

::: example 匀强场中的电介质球 {#ex-dielectric-sphere}
半径 $R$、相对介电常数 $\varepsilon_r$、不带自由电荷的球放入匀强场 $E_0\hat{\mathbf z}$。求球内部的场。对 $\varepsilon_r = 5$ 求比值 $E_{\mathrm{in}}/E_0$。
::: solution
内外两侧 $V$ 都调和。由 [[#eq-legendre-general]]，保留中心处正则性与无穷远处行为允许的项。外势是纯 $l = 1$ 的，于是试

$$
V_{\mathrm{in}} = A\,r\cos\theta, \qquad V_{\mathrm{out}} = -E_0r\cos\theta + \frac{B}{r^2}\cos\theta .
$$

若这个猜测满足每一条边界条件，[[#thm-unique]] 保证它就是解。$V$ 在 $r = R$ 处连续给出 $AR = -E_0R + B/R^2$。没有自由电荷时 $D^\perp$ 连续：在 $R$ 处 $\varepsilon_r\varepsilon_0\,\partial_rV_{\mathrm{in}} = \varepsilon_0\,\partial_rV_{\mathrm{out}}$，即

$$
\varepsilon_rA = -E_0 - \frac{2B}{R^3}.
$$

第一条条件给出 $B = R^3(A + E_0)$。代入得 $\varepsilon_rA = -E_0 - 2A - 2E_0$，所以 $A = -3E_0/(\varepsilon_r+2)$。内部 $V = Az$，于是

$$
\mathbf E_{\mathrm{in}} = -\nabla(Az) = \frac{3}{\varepsilon_r+2}\,E_0\hat{\mathbf z},
$$

一个匀强场，比 $E_0$ 弱。$\varepsilon_r = 5$ 时 $E_{\mathrm{in}}/E_0 = 3/7 = 0.429$。$\varepsilon_r\to\infty$ 时内部场消失，[[#ex-sphere-field]] 的导体球被重新得到。场的削弱来自束缚面电荷 $\sigma_b = \varepsilon_0(\varepsilon_r - 1)E_{\mathrm{in}}\cos\theta$，它在内部的场与 $E_0$ 方向相反。
:::
:::

### 从分子到介电常数 {#clausius-mossotti}

单个分子在场 $\mathbf E_{\mathrm{loc}}$ 中获得偶极矩 $\mathbf p = \alpha\mathbf E_{\mathrm{loc}}$，$\alpha$ 是它的**极化率**。稀薄气体中 $\mathbf E_{\mathrm{loc}}$ 就是宏观场，$\varepsilon_r - 1 = N\alpha/\varepsilon_0$，$N$ 为数密度。稠密介质中每个分子还受到近邻的作用。洛伦兹（Lorentz）的估计是：对立方或各向同性的排列，局域场为 $\mathbf E + \mathbf P/(3\varepsilon_0)$：宏观场加上在均匀极化材料中挖出的球形空腔中心处的场。结合 $\mathbf P = N\alpha\mathbf E_{\mathrm{loc}}$ 就得到下面的关系（推导见 Jackson §4.5 或 Griffiths §4.4）。

::: proposition 克劳修斯–莫索蒂关系 {#prop-cm}
对单位体积含 $N$ 个分子、每个分子极化率为 $\alpha$、局域场为 $\mathbf E + \mathbf P/(3\varepsilon_0)$ 的线性各向同性电介质，

$$
\frac{\varepsilon_r - 1}{\varepsilon_r + 2} = \frac{N\alpha}{3\varepsilon_0} .
$$ {#eq-cm}
:::

极化率常以一个体积 $\alpha/(4\pi\varepsilon_0)$ 的形式列出：小原子约为几立方埃——原子的响应就像跟自身大小差不多的导体球（对比 [[#ex-sphere-field]] 中的 $4\pi\varepsilon_0R^3$）。对液氩，$\alpha/(4\pi\varepsilon_0) = 1.64\times10^{-30}\,\mathrm{m^3}$、$N = 2.11\times10^{28}\,\mathrm{m^{-3}}$，[[#eq-cm]] 右端是 $0.145$，得 $\varepsilon_r = 1.51$，与实测的 $1.50$ 相差无几；稀薄气体公式会给 $1.44$。

::: history 从库仑到开尔文
查尔斯·奥古斯丁·德·库仑（Charles-Augustin de Coulomb）于 1785 年用他的扭秤确立了平方反比律。拉普拉斯（Laplace）方程出现在皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）1780 年代关于椭球引力的工作中，阿德里安-马里·勒让德（Adrien-Marie Legendre）正是从那里引入他的多项式（1785 年发表）。西莫恩·德尼·泊松（Siméon Denis Poisson）1813 年加上了源项，并于 1812 年把势论用于导体上的电荷。诺丁汉的磨坊主乔治·格林（George Green）1828 年自行发表了《数学分析在电与磁理论中的应用》（*An Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism*），引入了“势函数”与格林恒等式；威廉·汤姆孙（William Thomson，后来的开尔文勋爵）在 1840 年代让它重见天日，并于 1845 至 1848 年间发展了镜像法。塞缪尔·恩肖（Samuel Earnshaw）1842 年证明了他的稳定性定理。迈克尔·法拉第（Michael Faraday）1837 年创造了“电介质”一词并测量了比感电容；奥塔维亚诺·莫索蒂（Ottaviano Mossotti，1850）与鲁道夫·克劳修斯（Rudolf Clausius，1879）把介电常数与分子极化率联系起来。
:::

## 后续内容 {#leads}

[[electrodynamics/magnetostatics]] 中的矢量势对每个笛卡儿分量满足一条泊松方程，并继承 [[#thm-unique]] 与多极展开，只是没有单极项。在 [[electrodynamics/maxwell-equations]] 中泊松方程变为波动方程，它的格林函数解——[[electrodynamics/radiation]] 的推迟势——是 [[#eq-coulomb-int]] 的含时版本；多极在那里以偶极辐射与四极辐射的身份重现。分子极化率在这里是常量，在 [[electrodynamics/waves-in-media]] 中成为频率的函数，这正是色散的源头。

::: summary
- 静电学是泊松方程 $\nabla^2V = -\rho/\varepsilon_0$，在 $\rho = 0$ 处即拉普拉斯方程，外加边界条件；导体是等势体，感应电荷为 $\sigma = -\varepsilon_0\,\partial V/\partial n$。
- 调和函数等于它在球面上的平均值；因此它们内部没有极值，静电场不能稳定地囚禁电荷（恩肖）。
- 每一块边界上的狄利克雷或诺伊曼数据（或者每个导体的总电荷）唯一确定场，所以任何配得上的解——无论怎么猜出来的——就是那个解。
- 镜像：电荷 $q$ 距半径 $R$ 的接地球球心 $a$ 时，镜像为 $-qR/a$、位于 $R^2/a$ 处；对平面，镜像是镜面对称点上的 $-q$。
- 分离变量法把拉普拉斯方程化为常方程；边界数据确定傅里叶级数或勒让德级数的系数，高次模在约一个特征长度之内衰减掉。
- 远离局域源时 $V$ 是多极之和；偶极项为 $\mathbf p\cdot\hat{\mathbf r}/(4\pi\varepsilon_0r^2)$，最低的非零矩与原点无关。
- 极化产生束缚电荷 $\sigma_b = \mathbf P\cdot\hat{\mathbf n}$、$\rho_b = -\nabla\cdot\mathbf P$；电位移 $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$ 的散度为 $\rho_f$，$D^\perp$ 跃变 $\sigma_f$，$\mathbf E^\parallel$ 连续。
:::

## 习题 {#exercises}

::: exercise 接地平面的拉力 {level=1 check="9.99"}
一个 $2.00\,\mathrm{nC}$ 的电荷被固定在一块大接地金属板上方 $3.00\,\mathrm{cm}$ 处。求它受力的大小，以 $\mu\mathrm{N}$ 计。
::: solution
镜像是 $-2.00\,\mathrm{nC}$，位于板下 $3.00\,\mathrm{cm}$ 处，两者相距 $2d = 6.00\,\mathrm{cm}$。力就是镜像施加的：

$$
F = \frac{1}{4\pi\varepsilon_0}\frac{q^2}{(2d)^2} = (8.988\times10^9)\frac{(2.00\times10^{-9})^2}{(0.0600)^2} = 9.99\times10^{-6}\,\mathrm{N},
$$

即 $9.99\,\mu\mathrm{N}$，方向指向板。
:::
:::

::: exercise 确定镜像 {level=1 check="-2.4"}
一个接地球的半径为 $20.0\,\mathrm{cm}$。电荷 $+6.00\,\mathrm{nC}$ 距球心 $50.0\,\mathrm{cm}$。求镜像电荷（以 $\mathrm{nC}$ 计）及其位置。球上的总电荷是多少？
::: solution
由 [[#eq-sphere-image]]，$q' = -(R/a)q = -(0.200/0.500)(6.00\,\mathrm{nC}) = -2.40\,\mathrm{nC}$，位于 $b = R^2/a = 0.0400/0.500 = 0.0800\,\mathrm{m}$，即距球心 $8.00\,\mathrm{cm}$、朝向电荷一侧。由 [[#thm-sphere-image]]，球上的感应电荷等于镜像电荷，$-2.40\,\mathrm{nC}$：它是由大地经接地线供应的。
:::
:::

::: exercise 电介质球内部的场 {level=1 check="0.5"}
相对介电常数 $\varepsilon_r = 4.00$ 的球放入匀强场 $E_0$。求 $E_{\mathrm{in}}/E_0$，并把内部的电极化强度用 $\varepsilon_0E_0$ 表示。
::: solution
由 [[#ex-dielectric-sphere]]，$E_{\mathrm{in}}/E_0 = 3/(\varepsilon_r+2) = 3/6 = 0.500$。电极化强度为 $P = \varepsilon_0\chi_eE_{\mathrm{in}} = \varepsilon_0(\varepsilon_r-1)E_{\mathrm{in}} = \varepsilon_0(3.00)(0.500E_0) = 1.50\,\varepsilon_0E_0$，均匀且平行于 $E_0$。
:::
:::

::: exercise 从电势读出电荷 {level=2}
某区域内电势为 $V(r) = V_0\,a\,e^{-r/\lambda}/r$，即电荷在等离子体或电解液中的屏蔽势。用 [[#eq-poisson]] 求 $r>0$ 的电荷密度，并证明：把原点处的点电荷算在内，总电荷为零。
::: hint
对只依赖 $r$ 的函数，$r > 0$ 时 $\nabla^2f = \frac{1}{r}\frac{\dd^2}{\dd r^2}(rf)$。原点附近 $V\approx V_0a/r$，那正是一个点电荷。
:::
::: solution
$r>0$ 时 $rV = V_0ae^{-r/\lambda}$，所以 $\nabla^2V = \frac1r\frac{\dd^2}{\dd r^2}(V_0ae^{-r/\lambda}) = \frac{V_0a}{\lambda^2}\frac{e^{-r/\lambda}}{r}$。泊松方程给出

$$
\rho(r) = -\varepsilon_0\nabla^2V = -\frac{\varepsilon_0V_0a}{\lambda^2}\frac{e^{-r/\lambda}}{r}, \qquad r>0,
$$

一片异号的云。$r\to0$ 时电势像 $V_0a/r$，即点电荷 $q_0 = 4\pi\varepsilon_0V_0a$ 的电势，因为 $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$。云的总电荷为

$$
\int_0^\infty\rho\,4\pi r^2\,\dd r = -\frac{4\pi\varepsilon_0V_0a}{\lambda^2}\int_0^\infty re^{-r/\lambda}\,\dd r = -\frac{4\pi\varepsilon_0V_0a}{\lambda^2}\lambda^2 = -q_0 .
$$

总和为 $q_0 - q_0 = 0$。云把点电荷完全屏蔽了，这正是电势比 $r$ 的任何幂衰减都快的原因：由 [[#eq-multipole]]，分布只要有任何非零矩，就会留下幂律尾巴。
:::
:::

::: exercise 远离末端的槽 {level=2 check="0.0550"}
对 [[#eq-slot]] 的槽，求中线上 $x = a$ 处的 $V/V_0$（三位有效数字），再估计中线上的电势降到 $10^{-3}V_0$ 以下处离末端有多远。
::: solution
由 [[#ex-slot]]，$V(a,a/2)/V_0 = 0.0550$。在这样的距离上第一项占主导，$V/V_0\approx(4/\pi)e^{-\pi x/a}$。令其等于 $10^{-3}$：$e^{-\pi x/a} = \pi\times10^{-3}/4 = 7.85\times10^{-4}$，于是 $\pi x/a = 7.15$，$x = 2.28a$。向内略多于两个槽宽，末端窄条在千分之一的量级上就看不见了。
:::
:::

::: exercise 给定表面电势的球 {level=3 check="1/3"}
半径 $R$ 的空心球的表面维持在 $V(R,\theta) = V_0\cos^2\theta$。内外都无电荷，$V\to0$（无穷远处）。求内、外的 $V$、面电荷密度，以及中心处的 $V/V_0$。
::: hint
写 $\cos^2\theta = \frac13 + \frac23P_2(\cos\theta)$。
:::
::: solution
由 $P_2 = \frac12(3\cos^2\theta - 1)$，$\cos^2\theta = \frac13P_0 + \frac23P_2$。内部只允许 $r^l$ 项，在 $r = R$ 逐项匹配（正交性），

$$
V_{\mathrm{in}} = \frac{V_0}{3} + \frac{2V_0}{3}\frac{r^2}{R^2}P_2(\cos\theta).
$$

外部只允许 $r^{-(l+1)}$ 项：

$$
V_{\mathrm{out}} = \frac{V_0}{3}\frac{R}{r} + \frac{2V_0}{3}\frac{R^3}{r^3}P_2(\cos\theta).
$$

由 [[#thm-unique]]（球面上狄利克雷数据，无穷远处衰减）这就是解。面电荷为 $r = R$ 处的 $\sigma = -\varepsilon_0(\partial_rV_{\mathrm{out}} - \partial_rV_{\mathrm{in}})$：

$$
\sigma = \frac{\varepsilon_0V_0}{R}\left[\frac13 + 2P_2 + \frac43P_2\right] = \frac{\varepsilon_0V_0}{3R}\bigl[1 + 10P_2(\cos\theta)\bigr].
$$

中心处 $V = V_0/3$，这也正是 $V_0\cos^2\theta$ 在球面上的平均值，[[#thm-mean]] 的要求如此：$\frac{1}{4\pi}\oint\cos^2\theta\,\dd\Omega = \frac13$。
:::
:::

::: exercise 格林互易定理 {level=3}
设 $V_1$ 是电荷分布 $\rho_1$ 产生的电势，$V_2$ 是 $\rho_2$ 产生的电势，二者都局域，充满全空间。证明 $\int\rho_1V_2\,\dd\tau = \int\rho_2V_1\,\dd\tau$。然后用它证明：距半径 $R$ 的接地球球心 $a$ 的点电荷 $q$ 在球上感应的总电荷为 $-qR/a$，不必用镜像。
::: hint
应用部分，把真实构型与第二个构型比较：后者没有点电荷，球维持在电势 $V_s$。接地导体与孤立点电荷在这条恒等式里都是允许的，只要你对每个构型的全部电荷积分。
:::
::: solution
对 $V_2$ 用 [[#eq-coulomb-int]]，

$$
\int\rho_1V_2\,\dd\tau = \frac{1}{4\pi\varepsilon_0}\iint\frac{\rho_1(\mathbf r)\rho_2(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau\,\dd\tau'.
$$

核在 $\mathbf r\leftrightarrow\mathbf r'$ 下对称，所以同一个二重积分等于 $\int\rho_2V_1\,\dd\tau$。（交换积分次序是合法的，因为电荷局域，而奇点 $1/\lvert\mathbf r-\mathbf r'\rvert$ 在三维中可积。）

应用部分，构型 1 是真实的那个：点电荷 $q$ 在 $\mathbf a$，球上感应电荷 $Q_i$，球电势为 $0$。构型 2：没有点电荷，球升到电势 $V_s$，带电 $4\pi\varepsilon_0RV_s$，外部电势 $V_sR/r$。构型 1 的电荷坐在点 $\mathbf a$ 与球面上；构型 2 的电荷只坐在球面上。定理给出

$$
q\,V_2(\mathbf a) + Q_i\,V_s = (\text{构型 2 在球上的电荷})\times V_1(\text{球}) = 0,
$$

因为构型 1 中球是接地的。由 $V_2(\mathbf a) = V_sR/a$，$qV_sR/a + Q_iV_s = 0$，所以 $Q_i = -qR/a$，与 [[#thm-sphere-image]] 一致。
:::
:::

::: exercise 反用克劳修斯–莫索蒂 {level=3 check="2.02"}
一种非极性液体的 $\varepsilon_r = 1.90$。设分子极化率固定、[[#eq-cm]] 成立，求液体被压缩、数密度上升 $10.0\%$ 后的 $\varepsilon_r$。把相对变化与稀薄气体公式 $\varepsilon_r - 1 = N\alpha/\varepsilon_0$ 的预言比较。
::: solution
记 $x = N\alpha/(3\varepsilon_0)$。压缩前 $x = (1.90 - 1)/(1.90 + 2) = 0.90/3.90 = 0.2308$。压缩后 $x$ 随 $N$ 正比上升，到 $1.100\times0.2308 = 0.2538$。反解 [[#eq-cm]]，

$$
\varepsilon_r = \frac{1 + 2x}{1 - x} = \frac{1.5077}{0.7462} = 2.02 .
$$

增幅为 $6.3\%$。稀薄气体公式使 $\varepsilon_r - 1$ 正比于 $N$，于是 $0.90$ 变成 $0.99$、$\varepsilon_r = 1.99$，只增 $4.7\%$。局域场修正放大了对密度的响应：压缩液体既增加偶极子的数目，也增加每个分子从近邻感受到的场。简单液体在压强下测得的 $\varepsilon_r$ 紧密跟随克劳修斯–莫索蒂趋势，这是洛伦兹局域场是非极性物质正确修正的早期证据之一。
:::
:::
