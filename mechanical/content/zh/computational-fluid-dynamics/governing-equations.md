计算流体力学（computational fluid dynamics，CFD）程序从根本上说是一台记账的机器。它把一块空间区域划分为许多小单元，并对每个单元平衡质量、动量和能量的收支：流入了多少、流出了多少、内部产生了多少、储存了多少。本课程其余的一切（差分公式、稳定性限制、压力修正算法、湍流模型）都是为了准确而高效地完成这份账目的技术。因此我们从账目本身讲起：流体力学的守恒定律，先针对有限区域写出（这是有限体积程序实际使用的形式），再针对一个点写出（这是有限差分程序和数学家使用的形式）。然后我们提出一个决定这些方程能否以及如何被数值求解的问题：**信息在解中如何传播**？答案——椭圆型、抛物型或双曲型行为——告诉我们需要哪些边界条件，能否在时间或空间上推进求解，以及为什么有些流动容易计算、而另一些则暗藏凶险。

你已在[[fluid-mechanics/navier-stokes]]中见过纳维-斯托克斯方程，在[[heat-transfer/steady-conduction]]中见过导热方程。这里我们把它们改写成 CFD 程序赖以构建的统一的“输运方程”形式，并研究其数学性质。偏微分方程的背景知识见数学图谱（[偏微分方程课程](/learn/maths/lesson.php?c=pde&l=heat-equation)）。

## 控制体平衡

设想空间中一个固定区域$V$——管道中的一个方盒，或涡轮叶片周围的一个单元——其封闭表面为$S$，外法向单位矢量为$\mathbf{n}$。流体以速度$\mathbf{u}(\mathbf{x}, t)$流经该区域。流体携带的任何广延量（质量、动量、能量、溶解的组分）在$V$内的变化只可能有三个原因：被流动携带穿过$S$（**对流**），在没有净质量运动的情况下通过分子作用穿过$S$（**扩散**：黏性应力、热传导、分子扩散），或在$V$内部产生或消失（**源项**：体积力、放热、化学反应）。

::: definition 通用输运方程 {#def-transport}
设$\phi$为单位质量的某个物理量（例如质量取$\phi = 1$，$x$方向动量取$\phi = u$，热能取$\phi = c_p T$），$\rho$为密度，$\Gamma$为扩散系数，单位为$\mathrm{kg\,m^{-1}\,s^{-1}}$，$S_\phi$为单位体积的源项。对表面为$S$的固定控制体$V$，**积分形式输运方程**为
$$
\frac{\mathrm{d}}{\mathrm{d}t}\int_V \rho\phi\,\mathrm{d}V \;+\; \oint_S \rho\phi\,\mathbf{u}\cdot\mathbf{n}\,\mathrm{d}S \;=\; \oint_S \Gamma\,\nabla\phi\cdot\mathbf{n}\,\mathrm{d}S \;+\; \int_V S_\phi\,\mathrm{d}V,
$$ {#eq-integral}
其含义是：内部的增长率$+$净对流流出量$=$净扩散流入量$+$产生量。在各场光滑之处，**微分（守恒）形式**为
$$
\frac{\partial (\rho\phi)}{\partial t} + \nabla\cdot(\rho\mathbf{u}\phi) = \nabla\cdot(\Gamma\nabla\phi) + S_\phi .
$$ {#eq-transport}
这四项分别称为**非定常项**、**对流项**、**扩散项**和**源项**。
:::

扩散项在右端取正号，是因为傅里叶定律和菲克（Fick）定律使通量沿梯度**下降**方向流动：扩散通量为$-\Gamma\nabla\phi$，因此通过$S$的净扩散流入量为$-\oint(-\Gamma\nabla\phi)\cdot\mathbf{n}\,\mathrm{d}S$。

::: proposition 由积分形式到微分形式 {#prop-integral-to-differential}
若$\rho$、$\phi$、$\mathbf{u}$、$\Gamma$和$S_\phi$连续可微，且[[#eq-integral]]对流场中**每一个**固定控制体都成立，则[[#eq-transport]]在每一点成立。
:::

::: proof
由于$V$固定，时间导数可以移入体积分内。散度（高斯）定理把每个面积分化为体积分：$\oint_S \rho\phi\,\mathbf{u}\cdot\mathbf{n}\,\mathrm{d}S = \int_V \nabla\cdot(\rho\mathbf{u}\phi)\,\mathrm{d}V$，$\oint_S \Gamma\nabla\phi\cdot\mathbf{n}\,\mathrm{d}S = \int_V\nabla\cdot(\Gamma\nabla\phi)\,\mathrm{d}V$。把所有项移到一边，得
$$
\int_V \left[\frac{\partial(\rho\phi)}{\partial t} + \nabla\cdot(\rho\mathbf{u}\phi) - \nabla\cdot(\Gamma\nabla\phi) - S_\phi\right]\mathrm{d}V = 0 \quad\text{对每个 } V.
$$
记方括号内为$R(\mathbf{x}, t)$，它是连续的。若在某点$R(\mathbf{x}_0, t) > 0$，由连续性，在$\mathbf{x}_0$附近的一个小球内$R > 0$，在该球上积分得到一个正数，矛盾；$R < 0$的情形同理。故$R \equiv 0$。所用的假设是可微性（用于高斯定理）和$V$的任意性。
:::

证明很短，但要注意它**需要**什么：光滑性。跨越激波或接触面时各场发生跳跃，这种形式的散度定理不再成立，只有积分表述[[#eq-integral]]仍然有效。这是 CFD 如此看重积分形式的第一个原因：**有限体积法**（[[computational-fluid-dynamics/finite-volume-diffusion]]）把[[#eq-integral]]直接应用于每个单元，因而无论解是否光滑，都能在离散层面上精确地守恒质量、动量和能量。

## 作为输运方程的流体流动方程

$\phi$的三种取法给出了 CFD 程序对单相牛顿流体所求解的方程。

::: proposition 输运形式的质量、动量和能量方程 {#prop-ns}
对于动力黏度为$\mu$、导热系数为$k$、单位质量体积力为$\mathbf{g}$的牛顿流体：

**连续性方程**（$\phi = 1$，$\Gamma = 0$，$S = 0$）：
$$
\frac{\partial\rho}{\partial t} + \nabla\cdot(\rho\mathbf{u}) = 0 .
$$ {#eq-continuity}
**动量方程**（$\phi = u_i$）：黏性应力为$\tau_{ij} = \mu\left(\partial u_i/\partial x_j + \partial u_j/\partial x_i\right) - \tfrac{2}{3}\mu\,(\nabla\cdot\mathbf{u})\,\delta_{ij}$，
$$
\frac{\partial(\rho u_i)}{\partial t} + \nabla\cdot(\rho\mathbf{u}u_i) = -\frac{\partial p}{\partial x_i} + \frac{\partial \tau_{ij}}{\partial x_j} + \rho g_i .
$$ {#eq-momentum}
当$\rho$和$\mu$为常数时，它化为
$$
\nabla\cdot\mathbf{u} = 0,\qquad
\rho\left(\frac{\partial\mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u}\right) = -\nabla p + \mu\nabla^2\mathbf{u} + \rho\mathbf{g}.
$$ {#eq-incompressible}
**热能方程**：对于$c_p$和$k$为常数、黏性耗散可忽略、具有体积热源$\dot q$的不可压缩流体，
$$
\rho c_p\left(\frac{\partial T}{\partial t} + \mathbf{u}\cdot\nabla T\right) = k\nabla^2 T + \dot q .
$$ {#eq-energy}
:::

::: proof
连续性方程即[[#eq-transport]]取$\phi = 1$：相对于质量平均速度，质量没有扩散通量，也没有源项。对于动量，$V$中物质的牛顿第二定律表明：内部动量的变化率加上动量的净流出量等于合力。表面力为$\oint_S \boldsymbol{\sigma}\cdot\mathbf{n}\,\mathrm{d}S$，应力张量为$\sigma_{ij} = -p\delta_{ij} + \tau_{ij}$（采用体积黏度为零的斯托克斯假设的牛顿本构关系，推导见[[fluid-mechanics/navier-stokes]]）；体积力为$\int_V \rho\mathbf{g}\,\mathrm{d}V$。散度定理把表面力化为$\int_V \partial\sigma_{ij}/\partial x_j\,\mathrm{d}V$，再用[[#prop-integral-to-differential]]的论证即得[[#eq-momentum]]。当$\rho$为常数时，[[#eq-continuity]]化为$\nabla\cdot\mathbf{u} = 0$；于是$\tau_{ij}$中的膨胀项消失，且当$\mu$为常数时，
$$
\frac{\partial\tau_{ij}}{\partial x_j} = \mu\frac{\partial^2 u_i}{\partial x_j\partial x_j} + \mu\frac{\partial}{\partial x_i}\left(\frac{\partial u_j}{\partial x_j}\right) = \mu\nabla^2 u_i .
$$
最后$\nabla\cdot(\rho\mathbf{u}u_i) = \rho u_i\nabla\cdot\mathbf{u} + \rho\,\mathbf{u}\cdot\nabla u_i = \rho\,\mathbf{u}\cdot\nabla u_i$，由此得到[[#eq-incompressible]]。对于能量，取$\phi = c_pT$并用傅里叶定律$\mathbf{q} = -k\nabla T$，故$\Gamma = k/c_p$；同样利用连续性方程消去$\rho c_p T\,\nabla\cdot\mathbf{u}$，再忽略黏性加热和压力功（在低马赫数下成立），即得[[#eq-energy]]。
:::

看看“牛顿”这个词背后隐藏了多少东西。动量方程是$u_i$的输运方程，其中$\Gamma = \mu$——但它的“源项”中含有压强梯度，而在不可压缩流动中压强并没有自己的输运方程。仅这一事实就衍生出本课程的整整一课：[[computational-fluid-dynamics/pressure-velocity]]。对流项$\nabla\cdot(\rho\mathbf{u}u_i)$关于未知速度是**二次**的——这种非线性是湍流的根源，也是即使在定常层流中也需要迭代的原因。

::: example 未知量与方程的计数 {#ex-counting}
要计算空气（完全气体）的三维非定常可压缩流动。列出未知场和方程，并检验方程组是否封闭。再对无传热的水的不可压缩流动重复这一过程。
::: solution
**可压缩空气。** 未知场：$\rho$、$u$、$v$、$w$、$p$、$T$——六个$(x, y, z, t)$的函数。方程：连续性方程（1个）、三个动量分量方程（3个）、能量方程（1个）以及状态方程$p = \rho R T$，其中$R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$（1个）：共六个。输运系数$\mu(T)$和$k(T)$由物性规律（例如萨瑟兰（Sutherland）公式）给出，因此不增加未知量。

**不可压缩的水。** 未知量$u$、$v$、$w$、$p$——四个。方程：$\nabla\cdot\mathbf{u} = 0$（1个）和三个动量分量方程（3个）：共四个。方程组封闭，但请注意其奇特的结构：三个速度分量有三个演化方程，另有**一个约束**不含时间导数，而$p$没有出现在任何属于它自己的方程中。压强就是使速度场保持无散所必需的那个值。

合理性检查：两种情形下标量方程的个数都等于标量未知量的个数；而且当物性为常数时，能量方程与不可压缩动量方程解耦——温度可以事后作为被动标量计算。
:::
:::

### 守恒形式与非守恒形式

方程[[#eq-transport]]的对流项位于散度内，即$\nabla\cdot(\rho\mathbf{u}\phi)$；这是**守恒**（或散度）形式。将其展开并减去$\phi$乘以连续性方程，得到**非守恒**（或对流）形式
$$
\rho\left(\frac{\partial\phi}{\partial t} + \mathbf{u}\cdot\nabla\phi\right) = \nabla\cdot(\Gamma\nabla\phi) + S_\phi ,
$$ {#eq-nonconservative}
这是因为$\partial(\rho\phi)/\partial t + \nabla\cdot(\rho\mathbf{u}\phi) = \phi\left[\partial\rho/\partial t + \nabla\cdot(\rho\mathbf{u})\right] + \rho\left(\partial\phi/\partial t + \mathbf{u}\cdot\nabla\phi\right)$，而第一个方括号为零。对于光滑的精确解，两种形式完全相同。但对于**离散**方程则不然：基于守恒形式构造的格式，每个面通量只计算一次，并由共享该面的两个单元以相反符号使用，因而可以逐项相消——对所有单元求和时，内部通量相互抵消，$\phi$的总量只因穿过外边界的部分而改变。基于非守恒形式构造的格式没有这一性质，它可能收敛到一个激波位置错误的解。

::: warning 非守恒格式可能相容却仍然错误
人们容易认为，[[#eq-nonconservative]]的任何相容离散都可以用，因为它是“同一个方程”。对于光滑流动，在截断误差范围内确实如此。但跨越激波时，拉克斯（Lax）和温德罗夫（Wendroff）（1960）证明：收敛的守恒格式会收敛到满足正确跳跃条件（兰金-于戈尼奥（Rankine–Hugoniot）关系）的**弱解**；而非守恒格式可能收敛到一个速度和强度都错误的间断。只要间断、强梯度或守恒量的长时间积分值得关注——在 CFD 中这几乎总是如此——就应使用守恒形式。
:::

## 无量纲数与各项的平衡

在离散一个方程之前，先弄清哪些项重要是值得的。用长度$L$、速度$U$、时间$L/U$和压强$\rho U^2$对不可压缩动量方程进行尺度化：以带星号的无量纲变量表示，
$$
\frac{\partial\mathbf{u}^*}{\partial t^*} + (\mathbf{u}^*\cdot\nabla^*)\mathbf{u}^* = -\nabla^* p^* + \frac{1}{\mathrm{Re}}\nabla^{*2}\mathbf{u}^*,
\qquad \mathrm{Re} = \frac{\rho U L}{\mu} = \frac{UL}{\nu}.
$$ {#eq-nondim}
对[[#eq-energy]]作同样的尺度化，得到**佩克莱数**$\mathrm{Pe} = UL/\alpha = \mathrm{Re}\,\mathrm{Pr}$，其中$\alpha = k/(\rho c_p)$为热扩散率，$\mathrm{Pr} = \nu/\alpha$为普朗特数。这两个数都是对流输运与扩散输运之比。当它们很大时——在工程中几乎总是如此——对流在大部分区域占主导，扩散只在壁面附近的薄层和剪切层中起作用。正是这种组合使 CFD 变得困难：方程在主体区域中表现得近乎双曲型，在薄层中表现为抛物型，而这些薄层相对于整个计算域又很薄。

::: example 哪些项重要？ {#ex-reynolds}
水（$\nu = 1.0\times10^{-6}\ \mathrm{m^2/s}$，$\mathrm{Pr} = 7.0$）以平均速度$U = 2.0\ \mathrm{m/s}$流过直径$D = 50\ \mathrm{mm}$的管道。计算$\mathrm{Re}_D$和$\mathrm{Pe}_D$，并估计动量扩散穿过管道所需时间与流体流过一个直径所需时间之比。
::: solution
$$
\mathrm{Re}_D = \frac{UD}{\nu} = \frac{2.0 \times 0.050}{1.0\times10^{-6}} = 1.0\times10^{5},\qquad
\mathrm{Pe}_D = \mathrm{Re}_D\,\mathrm{Pr} = 7.0\times10^{5}.
$$
对流时间为$t_c = D/U = 0.025\ \mathrm{s}$；黏性扩散时间为$t_\nu = D^2/\nu = 2500\ \mathrm{s}$。二者之比为$t_\nu/t_c = UD/\nu = \mathrm{Re}_D = 10^5$——雷诺数**就是**这个时间之比。仅靠层流扩散，动量要花大约$40$分钟才能扩散到整个管道截面，而流体流过一个直径只需$25\ \mathrm{ms}$；实际上流动是湍流（$\mathrm{Re}_D \gg 2300$），由湍流混合完成扩散，这是[[computational-fluid-dynamics/turbulence-modelling]]讨论的问题。

合理性检查：两个比值中的单位都相互抵消；而极大的佩克莱数意味着，在水中扩散速度比动量慢七倍的热量，受对流支配的程度更甚。
:::
:::

## 信息如何传播：方程的分类

这是本课的核心思想。数值方法是一条由相邻点的解计算某点的解的规则。这条规则必须尊重**精确**解对其周围的依赖方式。在定常导热中，边界上任何地方的温度变化都会立即在内部各处感受到。在非稳态导热中，现在的变化影响未来，但绝不影响过去。在超声速气流中，扰动只在下游的马赫锥内被感受到。这三种行为分别称为**椭圆型**、**抛物型**和**双曲型**，其名称来自一个简单的代数判别。

::: definition 两个自变量的二阶线性偏微分方程 {#def-classification}
方程
$$
A\,\phi_{xx} + B\,\phi_{xy} + C\,\phi_{yy} + (\text{低阶项}) = 0,
$$ {#eq-second-order}
其系数$A, B, C$可以依赖于$x$和$y$（但不依赖于$\phi$的二阶导数），在给定点处称为
- **椭圆型**，若$B^2 - 4AC < 0$；
- **抛物型**，若$B^2 - 4AC = 0$；
- **双曲型**，若$B^2 - 4AC > 0$。

**特征方向**是满足
$$
A\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2 - B\,\frac{\mathrm{d}y}{\mathrm{d}x} + C = 0
$$ {#eq-characteristics}
的方向$\mathrm{d}y/\mathrm{d}x$；双曲型方程有两个实特征方向，抛物型方程有一个，椭圆型方程没有。
:::

这些名称呼应二次曲线$Ax^2 + Bxy + Cy^2 = 1$，按同样的符号判别，它是椭圆、抛物线或双曲线。特征为何重要？沿特征曲线，偏微分方程不能由曲线上的数据确定$\phi$的二阶导数——导数可以跨越特征曲线发生跳跃。因此，特征是间断和扰动传播的路径。

::: proposition 特征是不定性曲线 {#prop-characteristics}
设沿曲线$y = y(x)$已知$\phi$、$\phi_x$和$\phi_y$，且[[#eq-second-order]]成立。则曲线上的二阶导数$\phi_{xx}$、$\phi_{xy}$、$\phi_{yy}$被唯一确定，除非斜率$m = \mathrm{d}y/\mathrm{d}x$满足[[#eq-characteristics]]。
:::

::: proof
沿该曲线，由链式法则得到已知一阶导数的变化量：
$$
\mathrm{d}(\phi_x) = \phi_{xx}\,\mathrm{d}x + \phi_{xy}\,\mathrm{d}y, \qquad
\mathrm{d}(\phi_y) = \phi_{xy}\,\mathrm{d}x + \phi_{yy}\,\mathrm{d}y .
$$
连同偏微分方程，这是关于三个二阶导数的三个线性方程：
$$
\begin{pmatrix} A & B & C \\ \mathrm{d}x & \mathrm{d}y & 0 \\ 0 & \mathrm{d}x & \mathrm{d}y \end{pmatrix}
\begin{pmatrix} \phi_{xx} \\ \phi_{xy} \\ \phi_{yy} \end{pmatrix}
=
\begin{pmatrix} -(\text{低阶项}) \\ \mathrm{d}(\phi_x) \\ \mathrm{d}(\phi_y) \end{pmatrix}.
$$
解唯一当且仅当行列式不为零。按第一行展开，行列式为$A\,\mathrm{d}y^2 - B\,\mathrm{d}x\,\mathrm{d}y + C\,\mathrm{d}x^2$；除以$\mathrm{d}x^2$后，它恰在$A m^2 - Bm + C = 0$时为零。这个关于$m$的二次方程按$B^2 - 4AC$为正、零或负，有两个、一个或没有实根。
:::

CFD 的三个模型方程是这三类方程的原型。

- **拉普拉斯方程与泊松方程**，$\phi_{xx} + \phi_{yy} = f$：$A = C = 1$，$B = 0$，判别式为$-4$，**椭圆型**。定常导热、势流、二维流动的流函数，以及——至关重要的——不可压缩流动的压强方程都属此类。每个内点的解都依赖于**整个**边界；需要在封闭边界上给定边界条件，且问题不能推进求解：所有未知量必须同时求解（[[computational-fluid-dynamics/linear-solvers]]）。
- **热方程**，$\phi_t = \alpha\phi_{xx}$：令$y = t$，$A = \alpha$，$B = C = 0$，判别式为$0$，**抛物型**。唯一的特征是$t = \text{常数}$：扰动立即在各处被感受到，但只**向前**影响时间。需要一个初始条件和两侧的边界条件；解在时间上**推进**求得。
- **波动方程**，$\phi_{tt} = c^2\phi_{xx}$：$A = -c^2$（对应$x$），$C = 1$（对应$t$），判别式为$4c^2 > 0$，**双曲型**，特征为$x \pm ct = \text{常数}$。信息以有限速度$c$传播；$(x, t)$处的解只依赖于区间$[x - ct, x + ct]$上的初始数据，即其**依赖域**。

::: widget heat
equation: heat
f: if(x < 1, 0, if(x < 2, 1, 0))
L: pi
k: 0.5
boundary: dirichlet
caption: 抛物型行为。一根两端保持为零的杆，中部有一块热量，它不断扩展并衰减。点击播放并观察剖面的**边缘**：最微小的扰动立即到达杆的两端——热方程的信号传播速度为无穷大——但没有任何东西会在时间上倒流。尖角立刻被抹平，这正是抛物型问题易于离散的原因。
:::

::: widget heat
equation: wave
f: if(x < 1, 0, if(x < 2, 1, 0))
L: pi
k: 0.5
boundary: dirichlet
caption: 双曲型行为。弦上同样的初始方块，现在服从波速为$c = 0.5$的波动方程。它分裂为两个半高的脉冲，分别以恰好为$c$的速度向左、向右运动，并一直保持其陡峭的边缘，直到在固定端反射。信息沿特征$x \pm ct = \text{常数}$以有限速度传播，间断被**携带**而不是被抹平——正是这一性质使对流占优的流动难以准确计算。
:::

::: example 分类并画出特征 {#ex-classify}
对$\phi_{xx} + 4\phi_{xy} + 3\phi_{yy} = 0$进行分类，并求其特征方向。
::: solution
$A = 1$，$B = 4$，$C = 3$，故$B^2 - 4AC = 16 - 12 = 4 > 0$：处处为**双曲型**。特征斜率满足$m^2 - 4m + 3 = 0$，即$(m-1)(m-3) = 0$，故$m = 1$和$m = 3$。特征是两族直线$y - x = \text{常数}$和$y - 3x = \text{常数}$。

用变换检验：令$\xi = y - x$，$\eta = y - 3x$，由链式法则得$\phi_x = -\phi_\xi - 3\phi_\eta$，$\phi_y = \phi_\xi + \phi_\eta$，代入偏微分方程后，所有纯二阶导数项都相互抵消，只剩$-4\phi_{\xi\eta} = 0$。其通解$\phi = F(\xi) + G(\eta)$是沿两族特征传播的两个任意波——正是双曲型的图景。
:::
:::

### 一阶方程组

欧拉方程和纳维-斯托克斯方程不是单个二阶方程，而是一阶方程**组**。推广如下：把一维方程组写成$\partial\mathbf{U}/\partial t + \mathbf{A}\,\partial\mathbf{U}/\partial x = \mathbf{0}$；若矩阵$\mathbf{A}$具有实特征值和完备的特征向量组，则该方程组为**双曲型**。特征值就是特征波的传播速度。

::: proposition 一维欧拉方程的特征速度 {#prop-euler-speeds}
对于速度为$u$、声速为$c = \sqrt{\gamma R T}$的完全气体一维无黏流动，欧拉方程是双曲型的，其特征速度为
$$
\lambda_1 = u - c,\qquad \lambda_2 = u,\qquad \lambda_3 = u + c .
$$ {#eq-euler-eigen}
:::

::: proof
采用原始变量$\mathbf{U} = (\rho, u, p)^{\mathsf{T}}$。连续性方程为$\rho_t + u\rho_x + \rho u_x = 0$；动量方程为$u_t + u u_x + p_x/\rho = 0$；对于流体微团的等熵变化（无黏、不导热），利用$c^2 = (\partial p/\partial\rho)_s$，能量方程化为$p_t + u p_x + \rho c^2 u_x = 0$。因此
$$
\mathbf{A} = \begin{pmatrix} u & \rho & 0 \\ 0 & u & 1/\rho \\ 0 & \rho c^2 & u \end{pmatrix},\qquad
\det(\mathbf{A} - \lambda\mathbf{I}) = (u - \lambda)\left[(u-\lambda)^2 - c^2\right].
$$
其根为$\lambda = u$和$\lambda = u \pm c$，当$c > 0$时全为互异实根，故有三个线性无关的特征向量，方程组为双曲型。
:::

其物理意义很直接：熵（以及任何被动标记物）以速度$u$随流动携带，两个声波相对于地面以$u \pm c$传播。当流动为亚声速（$u < c$）时，有一个波向上游传播，因此亚声速入口边界必须留出一个量由内部决定，而亚声速出口边界必须给定一个量；当流动为超声速时，三个波都向下游传播，所有的量都在入口给定，出口不给定任何量。这条规则是普遍的：**在某边界上需施加的边界条件个数，等于在该处进入计算域的特征个数。** 施加得多了，问题就成为超定的，并引起虚假反射；施加得少了，问题就成为欠定的。

::: example 亚声速管道的边界条件 {#ex-euler-bc}
温度为$T = 300\ \mathrm{K}$的空气（$\gamma = 1.4$，$R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$）以$u = 100\ \mathrm{m/s}$沿管道流动。求三个特征速度，以及无黏一维计算在入口和出口所需的边界条件个数。当$u = 500\ \mathrm{m/s}$时答案如何变化？
::: solution
$c = \sqrt{\gamma R T} = \sqrt{1.4 \times 287 \times 300} = 347.2\ \mathrm{m/s}$，故
$$
\lambda_1 = 100 - 347.2 = -247.2\ \mathrm{m/s},\quad \lambda_2 = 100\ \mathrm{m/s},\quad \lambda_3 = 447.2\ \mathrm{m/s}.
$$
在**入口**（左端），$\lambda > 0$的特征进入：有两个，因此在那里施加两个条件（通常是总压和总温）。在**出口**（右端），$\lambda < 0$的特征进入：有一个，因此施加一个条件（通常是静压）。总共$2 + 1 = 3$个，每个方程一个，这正是适定问题所必需的。

当$u = 500\ \mathrm{m/s}$（$\mathrm{Ma} = 1.44$）时，三个速度都为正（$152.8$、$500$、$847.2\ \mathrm{m/s}$）：入口施加三个条件，出口不施加，那里的一切都由内部外推。合理性检查：超声速气流“听不到”它的出口，这就是超声速风洞试验段不受背压微小变化影响的原因。
:::
:::

### 混合型与变型

实际的流动方程很少处处属于同一类型。经典的例子是定常小扰动可压缩势流，对马赫数为$M_\infty$的来流中的扰动势$\varphi$，其方程为
$$
(1 - M_\infty^2)\,\varphi_{xx} + \varphi_{yy} = 0 .
$$ {#eq-small-disturbance}
这里$A = 1 - M_\infty^2$，$B = 0$，$C = 1$，$B^2 - 4AC = -4(1 - M_\infty^2)$：亚声速流动为**椭圆型**，超声速流动为**双曲型**，特征斜率为$\mathrm{d}y/\mathrm{d}x = \pm 1/\sqrt{M_\infty^2 - 1}$——即马赫线。跨声速翼型在同一流场中兼有两种类型：亚声速的椭圆型区域中嵌着一个由激波封闭的超声速双曲型区域；最早计算此类流动的数值格式（Murman 和 Cole，1971）根据当地类型在中心差分和迎风差分之间切换。

::: example 马赫线 {#ex-mach}
对[[#eq-small-disturbance]]，分别在$M_\infty = 0.6$和$M_\infty = 2.0$时对方程进行分类，并在超声速情形求马赫线与来流之间的夹角。
::: solution
在$M_\infty = 0.6$时：$1 - M_\infty^2 = 0.64 > 0$，故$B^2 - 4AC = -2.56 < 0$，**椭圆型**。翼型处的扰动在各处都能被感受到，包括上游（这就是流线在亚声速物体**前方**就已弯曲的原因）。

在$M_\infty = 2.0$时：$1 - M_\infty^2 = -3$，故$B^2 - 4AC = 12 > 0$，**双曲型**。特征斜率为$\pm 1/\sqrt{3} = \pm 0.577$，与来流的夹角为$\mu = \arctan(1/\sqrt{3}) = 30.0^\circ$。这正是马赫角$\mu = \arcsin(1/M_\infty) = \arcsin 0.5 = 30.0^\circ$，理应如此。扰动只在以这些直线为界的下游楔形区内被感受到。
:::
:::

### 不可压缩纳维-斯托克斯方程

非定常不可压缩方程[[#eq-incompressible]]具有混合性质。动量方程在时间上是抛物型的（扩散），并带有双曲型的特点（对流）。约束$\nabla\cdot\mathbf{u} = 0$根本不含时间导数；对动量方程取散度，它就变成一个关于压强的方程。

::: proposition 压强泊松方程 {#prop-ppe}
对于$\rho$和$\mu$为常数、体积力有势（或为零）的不可压缩流动，压强满足
$$
\nabla^2 p = -\rho\,\frac{\partial u_i}{\partial x_j}\frac{\partial u_j}{\partial x_i}
$$ {#eq-ppe}
（对$i$和$j$求和），这是一个椭圆型方程。
:::

::: proof
对动量方程$\rho(\partial_t u_i + u_j\partial_j u_i) = -\partial_i p + \mu\nabla^2 u_i + \rho g_i$的第$i$个分量取$\partial/\partial x_i$，并对$i$求和。非定常项给出$\rho\,\partial_t(\partial_i u_i) = 0$，黏性项给出$\mu\nabla^2(\partial_i u_i) = 0$，对均匀重力场$\partial_i g_i = 0$。对流项给出$\rho\,\partial_i(u_j\partial_j u_i) = \rho(\partial_i u_j)(\partial_j u_i) + \rho u_j\partial_j(\partial_i u_i) = \rho(\partial_i u_j)(\partial_j u_i)$。剩下的是$\rho(\partial_i u_j)(\partial_j u_i) = -\nabla^2 p$。算子是拉普拉斯算子，它是椭圆型的。
:::

这一命题解释了为什么即便是“推进型”的非定常不可压缩求解器，也必须在每个时间步上对整个计算域求解一个椭圆型问题。从物理上说，声音在不可压缩流体中以无穷大速度传播：任何地方的压强变化都会立即在各处被感受到。相反，定常边界层方程失去了流向扩散项，成为**流向抛物型**的——它们可以从前缘推进到后缘，这就是边界层程序比完整的纳维-斯托克斯求解器早几十年就已实用的原因。

::: example 驻点流动中的压强 {#ex-stagnation}
平面驻点流动$u = ax$，$v = -ay$，其中$a = 2.0\ \mathrm{s^{-1}}$，流体为密度$\rho = 1.2\ \mathrm{kg/m^3}$的空气。验证连续性方程，计算[[#eq-ppe]]的右端，并用伯努利方程给出的压强场进行核对。
::: solution
$\partial u/\partial x + \partial v/\partial y = a - a = 0$：连续性方程成立。速度梯度张量的$\partial u/\partial x = a$，$\partial v/\partial y = -a$，非对角元素为零，故
$$
\frac{\partial u_i}{\partial x_j}\frac{\partial u_j}{\partial x_i} = a^2 + a^2 = 2a^2,\qquad
\nabla^2 p = -2\rho a^2 = -2 \times 1.2 \times 2.0^2 = -9.6\ \mathrm{Pa/m^2}.
$$
该流动无旋，因此伯努利方程处处成立：$p = p_0 - \tfrac{1}{2}\rho(u^2 + v^2) = p_0 - \tfrac{1}{2}\rho a^2(x^2 + y^2)$，其拉普拉斯为$-\tfrac{1}{2}\rho a^2(2 + 2) = -2\rho a^2$。二者一致。合理性检查：压强在驻点处最大，并随流体加速离开而下降——拉普拉斯为负意味着压强取极大值。
:::
:::

## 适定问题与边界条件

在阿达马（Hadamard）的意义下，一个数学问题若解存在、唯一且连续依赖于数据，则称它是**适定的**。对一个不适定问题进行 CFD 计算，无论网格多细，都不可能收敛到任何有意义的结果：数据中的微小误差会被无限放大。使边界条件与方程类型相匹配，是保证适定性的实用方法：

| 类型 | 原型 | 所需数据 | 数值策略 |
|---|---|---|---|
| 椭圆型 | $\nabla^2\phi = f$ | 在整个封闭边界上给定一个条件（$\phi$、$\partial\phi/\partial n$或其组合） | 同时求解所有未知量（迭代或直接求解器） |
| 抛物型 | $\phi_t = \alpha\nabla^2\phi$ | 初始条件，加上所有$t$时刻空间边界上的条件 | 在时间上推进；每一步可以是显式的，也可能需要一次椭圆型求解 |
| 双曲型 | $\phi_{tt} = c^2\phi_{xx}$或$\mathbf{U}_t + \mathbf{A}\mathbf{U}_x = 0$ | 初始数据，加上每条**进入**特征一个条件 | 沿特征方向推进；采用迎风信息 |

经典的不适定问题是“反向热方程”——计算**导致**某一测得温度分布的那个温度分布。高波数误差按$e^{\alpha k^2 t}$增长，当$k\to\infty$时无界，因此网格加密毫无帮助。正向问题则按$e^{-\alpha k^2 t}$阻尼它们，这就是抛物型问题显得如此温和的原因。

::: remark 为什么一个 CFD 程序能求解所有类型
通用有限体积程序并不检验其方程的类型。它把每个问题都当作非定常（或伪非定常）问题并进行迭代。使它免于出错的是：其离散方式被构造成模仿信息传递的物理方向——迎风偏置的对流格式尊重双曲部分（[[computational-fluid-dynamics/convection-diffusion]]）；隐式的扩散方程和压强方程尊重椭圆部分（[[computational-fluid-dynamics/pressure-velocity]]）；而用户选择的边界条件——速度入口、压强出口、壁面——的选择方式，保证了在每个边界上给定正确个数的物理量。
:::

::: widget vectorfield
P: a*x
Q: -y
x: -2, 2
y: -2, 2
sliders: a=0.5:0:2:0.1
streamlines: true
shade: divergence
caption: 速度场$u = ax$，$v = -y$，$a$由滑块设定；着色表示$\nabla\cdot\mathbf{u} = a - 1$。只有当$a = 1$时，该场才是无散的，因而才是可能的不可压缩流动（即上面例题中的驻点流动）。当$a > 1$时，每个小方盒流失的流体多于流入的，密度必然下降；当$a < 1$时，流体在其中积聚。不可压缩求解器的全部任务，就是找到使每个单元中这一着色保持为零的压强。
:::

::: quiz
一股定常二维超声速射流经喷管排入静止空气中；用无黏定常欧拉方程计算其解。关于该数值问题，下列哪种说法是正确的？
- [ ] 它是椭圆型的，因此需要在计算域四周（包括下游边界）给定边界条件。
- [x] 在超声速区域，它在流向上是双曲型的，因此可以从喷管出口向下游推进求解，在超声速出流边界上不施加任何条件。
- [ ] 它是抛物型的，因为它是定常的。
- [ ] 它的类型取决于雷诺数。
::: solution
定常超声速无黏流动的行为类似于$M > 1$时的[[#eq-small-disturbance]]：双曲型，以马赫线为特征，且都向下游倾斜。信息不能向上游传播，因此解可以沿流向推进，出流边界不需要任何条件。“定常”并不会使方程成为抛物型，而且欧拉方程中不含雷诺数。
:::
:::

::: quiz
为什么即使在显式非定常程序中，不可压缩压强场也需要在每个时间步进行一次椭圆型求解？
- [ ] 因为动量方程是椭圆型的。
- [ ] 因为时间步长太大。
- [x] 因为无散约束不含时间导数；对动量方程取散度得到压强的泊松方程，其在每一点的解都依赖于整个计算域。
- [ ] 因为压强是守恒量。
::: solution
不可压缩流动中的连续性方程是一个约束，而不是演化方程。施加这一约束的压强满足[[#eq-ppe]]，一个椭圆型方程。从物理上说，声速为无穷大，因此压强扰动立即在各处被感受到。
:::
:::

::: history
黏性流动的微分方程由克劳德-路易·纳维（Claude-Louis Navier）在 1822 年提交法国科学院的一篇论文（1827 年发表）中得到，后来乔治·加布里埃尔·斯托克斯（George Gabriel Stokes）于 1845 年用接近现代的连续介质论证也得到了它们。用差分代替导数来求解这些方程——或任何场方程——的想法，最早由刘易斯·弗赖伊·理查森（Lewis Fry Richardson）系统地加以实践：他用有限差分计算了砌石坝中的应力（《英国皇家学会哲学汇刊 A 辑》（*Philosophical Transactions of the Royal Society A*），1911），随后又尝试手算数值天气预报，成果发表为《用数值方法进行天气预报》（*Weather Prediction by Numerical Process*，1922）。雅克·阿达马（Jacques Hadamard）的适定问题概念（1902）以及二阶方程的椭圆型、抛物型和双曲型分类，成为此后分析一切数值方法的框架。物体绕流纳维-斯托克斯方程的第一个数值解通常归功于亚历山大·汤姆（Alexander Thom），他用手算求得了低雷诺数下圆柱的定常绕流（《英国皇家学会会刊 A 辑》（*Proceedings of the Royal Society A*），1933）。
:::

::: summary
- CFD 程序求解的每个方程都是一个平衡：非定常项$+$对流项$=$扩散项$+$源项，即[[#eq-transport]]；积分形式[[#eq-integral]]即使跨越间断也成立，微分形式只在各场光滑之处成立。
- 连续性、动量和能量方程分别是$\phi = 1$、$u_i$和$c_pT$的输运方程；不可压缩动量方程以压强梯度作为“源项”，而压强没有自己的方程。
- 守恒型离散可以逐项相消，精确守恒；非守恒型离散可能把激波放在错误的位置。
- $\mathrm{Re} = UL/\nu$和$\mathrm{Pe} = UL/\alpha$度量对流与扩散的相对强弱；数值大意味着在对流占主导的主体区域中存在薄的扩散层。
- 二阶方程按$B^2 - 4AC$为负、零或正，分别为椭圆型、抛物型或双曲型；特征是扰动传播所沿的曲线。
- 椭圆型问题需要整个边界上的数据并同时求解；抛物型和双曲型问题可推进求解；双曲型问题的边界上，每条进入特征施加一个条件。
- 一维欧拉方程的特征速度为$u$、$u \pm c$；不可压缩流动的压强服从椭圆型泊松方程[[#eq-ppe]]。
:::

## 习题

::: exercise 常系数方程的分类 {level=1 check="-8"}
对$3\phi_{xx} + 2\phi_{xy} + \phi_{yy} = 0$进行分类。（输入判别式$B^2 - 4AC$的值。）
::: solution
$A = 3$，$B = 2$，$C = 1$：$B^2 - 4AC = 4 - 12 = -8 < 0$，因此该方程处处为椭圆型，没有实特征。需要在封闭边界上给定数据。
:::
:::

::: exercise 马赫角 {level=1 check="41.81"}
求$M_\infty = 1.5$时[[#eq-small-disturbance]]的马赫线与来流之间的夹角。（以度为单位输入角度，保留两位小数。）
::: solution
$\mu = \arcsin(1/M_\infty) = \arcsin(0.6667) = 41.81^\circ$。等价地，特征斜率为$1/\sqrt{M_\infty^2 - 1} = 1/\sqrt{1.25} = 0.8944$，而$\arctan 0.8944 = 41.81^\circ$。
:::
:::

::: exercise 汽车的雷诺数 {level=1 check="9e6"}
一辆长$L = 4.5\ \mathrm{m}$的汽车在$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$的空气中以$U = 30\ \mathrm{m/s}$行驶。计算以长度为特征尺度的雷诺数，并说明它对车身表面附近的流动意味着什么。（输入$\mathrm{Re}_L$。）
::: solution
$\mathrm{Re}_L = UL/\nu = 30 \times 4.5/1.5\times10^{-5} = 9.0\times10^{6}$。黏性效应局限于薄的边界层内（对于湍流边界层，车尾处的厚度量级为$0.37\,L\,\mathrm{Re}_L^{-1/5} \approx 7\ \mathrm{cm}$），需要在表面附近布置精细的网格层，而主体流动近似无黏。
:::
:::

::: exercise 高速气流的特征速度 {level=2 check="-16.94"}
温度为$T = 250\ \mathrm{K}$的空气（$\gamma = 1.4$，$R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$）以$u = 300\ \mathrm{m/s}$流动。求一维欧拉方程的三个特征速度，以及入口和出口的边界条件个数。（以 m/s 为单位输入最小的特征速度，保留两位小数。）
::: solution
$c = \sqrt{1.4 \times 287 \times 250} = 316.94\ \mathrm{m/s}$，故三个速度为$u - c = -16.94\ \mathrm{m/s}$，$u = 300\ \mathrm{m/s}$，$u + c = 616.94\ \mathrm{m/s}$。流动恰为亚声速（$\mathrm{Ma} = 0.947$）：入口施加两个条件，出口施加一个。注意向上游传播的声波移动得多么缓慢；在$\mathrm{Ma} = 1$附近，信息需要很长时间才能传到上游，时间推进求解器在那里收敛很慢。
:::
:::

::: exercise 刚体旋转中的压强 {level=2 check="200000"}
水（$\rho = 1000\ \mathrm{kg/m^3}$）作刚体旋转，$u = -\Omega y$，$v = \Omega x$，$\Omega = 10\ \mathrm{rad/s}$。由[[#eq-ppe]]计算$\nabla^2 p$，并用已知的压强场$p = p_0 + \tfrac{1}{2}\rho\Omega^2(x^2 + y^2)$加以验证。（以$\mathrm{Pa/m^2}$为单位输入$\nabla^2 p$。）
::: solution
$\partial u/\partial x = 0$，$\partial u/\partial y = -\Omega$，$\partial v/\partial x = \Omega$，$\partial v/\partial y = 0$。双重求和为$(\partial_x u)^2 + 2(\partial_y u)(\partial_x v) + (\partial_y v)^2 = 0 + 2(-\Omega)(\Omega) + 0 = -2\Omega^2$，故$\nabla^2 p = 2\rho\Omega^2 = 2 \times 1000 \times 100 = 2.0\times10^{5}\ \mathrm{Pa/m^2}$。给定的压强场有$\nabla^2 p = \tfrac{1}{2}\rho\Omega^2 \times 4 = 2\rho\Omega^2$，二者一致。拉普拉斯为正意味着压强在轴线上取极小值——即涡核。
:::
:::

::: exercise 双曲型方程的特征 {level=2 check="-0.5"}
证明$2\phi_{xx} - 5\phi_{xy} + 2\phi_{yy} = 0$是双曲型的，并求其特征斜率$\mathrm{d}y/\mathrm{d}x$。（输入绝对值较小的斜率。）
::: solution
$B^2 - 4AC = 25 - 16 = 9 > 0$：双曲型。[[#eq-characteristics]]给出$2m^2 + 5m + 2 = 0$，故$m = (-5 \pm 3)/4$，即$m = -0.5$和$m = -2$。特征是直线$y + x/2 = \text{常数}$和$y + 2x = \text{常数}$。
:::
:::

::: exercise 伯格斯方程的守恒形式 {level=2}
无黏伯格斯（Burgers）方程为$u_t + u u_x = 0$。(a) 把它写成守恒形式$u_t + f(u)_x = 0$。(b) 一个间断将左侧的$u_L = 2$与右侧的$u_R = 0$分开。利用跨越该跳跃的控制体上的积分形式，证明它以速度$s = [f]/[u]$运动，并计算$s$。(c) 证明非守恒形式乘以$u$所得的$(u^2/2)_t + (u^3/3)_x = 0$预测出不同的速度，并说明哪一个是正确的。
::: solution
(a) $u u_x = (u^2/2)_x$，故$f(u) = u^2/2$。

(b) 取包含位于$x = X(t)$处跳跃的控制体$[a, b]$。积分形式给出$\frac{\mathrm{d}}{\mathrm{d}t}\int_a^b u\,\mathrm{d}x = f(u(a)) - f(u(b))$。由于$x < X$时$u = u_L$，$x > X$时$u = u_R$，左端为$\dot X(u_L - u_R)$，故$s = \dot X = (f_L - f_R)/(u_L - u_R) = (2 - 0)/(2 - 0) = 1$。

(c) 以$u^2/2$为“守恒变量”、$u^3/3$为通量作同样的论证，得$s = (8/3 - 0)/(2 - 0) = 4/3$。两种形式对光滑解是等价的，但它们跨越跳跃时守恒的是不同的量。哪一个正确由物理决定——即实际守恒的是什么。若$u$是守恒量，则$s = 1$；离散了错误守恒形式（或没有采用守恒形式）的格式会收敛到错误的激波速度。这正是本课中那条警告的内容。
:::
:::

::: exercise 含重力与变黏度的压强方程 {level=3}
对$\mu$随空间变化（例如由于温度变化）且重力均匀的不可压缩流动，重做[[#eq-ppe]]的推导。会出现哪一个附加项？压强方程是否仍为椭圆型？
::: solution
当$\mu$可变时，黏性项为$\partial_j\left[\mu(\partial_j u_i + \partial_i u_j)\right]$。取$\partial_i$并求和，得$\partial_i\partial_j\left[\mu(\partial_j u_i + \partial_i u_j)\right] = 2\,\partial_i\partial_j(\mu\,S_{ij})$，其中$S_{ij}$为应变率张量；当$\nabla\mu \ne 0$时，该项不再为零。结果为
$$
\nabla^2 p = -\rho\,(\partial_i u_j)(\partial_j u_i) + 2\,\partial_i\partial_j(\mu S_{ij}),
$$
而均匀重力仍然没有贡献（$\partial_i g_i = 0$）；它被吸收进静水压强之中。作用在$p$上的算子仍是拉普拉斯算子，因此方程仍为椭圆型；只有右端发生了变化。（若$\rho$也变化，算子变为$\nabla\cdot(\rho^{-1}\nabla p)$，仍为椭圆型。）
:::
:::

::: exercise 选择求解策略 {level=3}
对以下每一种情形，说明控制方程的数学类型、每个边界上所需的数据，以及计算能否（在时间或空间上）推进，还是必须同时求解：(a) 方形顶盖驱动方腔中的定常层流；(b) 平板上的定常层流边界层；(c) 涡轮盘导热的启动瞬态过程；(d) 楔形体附着斜激波下游的定常超声速流动。然后，作为一个开放的设计问题，为(a)和(d)提出合理的计算域和边界条件，并说明每个边界位置的理由。
::: solution
(a) 定常不可压缩纳维-斯托克斯方程：总体上为椭圆型（回流把信息带向各个方向，压强是椭圆型的）。四个壁面上给定速度（无滑移；顶盖移动）。通过迭代同时求解。计算域就是方腔本身；不需要人工边界，但压强只确定到相差一个常数，因此必须设定一个参考值。

(b) 边界层方程：在$x$方向为抛物型。在前缘给定入流剖面，壁面无滑移，边界层外缘给定来流速度，下游端不给定任何条件。沿$x$推进。

(c) 非稳态导热：在时间上为抛物型。各处的初始温度，加上所有$t$时刻每个表面上的热边界条件（温度、热流或对流）。在时间上推进，若为隐式，则每一步是一次椭圆型求解。

(d) 定常超声速欧拉方程：在$x$方向为双曲型。在超声速入流上给定一切；楔面上满足相切条件；出流上不给定任何条件。向下游推进。对(d)，入流边界必须位于激波上游，出流边界可以放在下游任何位置，因为没有信息返回；对(a)，这些问题都不存在。好的答案还会指出：对于椭圆型外流（亚声速翼型），人工远场边界必须放在许多倍弦长之外——通常为几十倍弦长——因为那里的扰动会在物体处被感受到。
:::
:::
