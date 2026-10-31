穿在圆形钢丝上的珠子、固定在刚性杆上的摆球、必须留在楔形块表面上的物块：每种情形里，物体都不能自由地奔向牛顿第二定律单独要它去的地方。总有什么东西把它束缚在一条曲线或一张曲面上。那个东西施加一个力，而这个力正是问题中别扭的部分。它的大小不是事先给定的。它逐时调整自己，取任何能让物体留在钢丝上的值，而你只有在解出运动之后才会知道那个值。

在直角坐标下套用牛顿的方法，就得把这些未知的**约束力**一路背到计算的结尾：对每个质点写出 $m\mathbf{a} = \mathbf{F} + \mathbf{N}$，加上约束方程，再消元。对单个珠子还受得了。对双摆、旋转的陀螺或五根杆的连杆机构，这就是一团糟，而乱子大多涉及你根本不想知道的力。

本章要构造另一条路。我们先数清楚要说系统在哪里到底需要几个数，把这些数选作坐标，然后找到一条原理——归功于达朗贝尔（d'Alembert）——在这条原理里，约束力会自动消失，因为它们在约束允许的任何位移上都不做功。从这条原理出发，我们导出拉格朗日方程，即本课程后续部分的工作工具。最后我们说明，当你确实想知道约束力时，如何用拉格朗日乘数把它们找回来。

先修内容是 [[mechanics/newton-laws]]、功与势能 [[mechanics/work-energy]]，以及多变量微积分中的偏导数与链式法则 [[math-methods/vector-calculus]]。全文取 $g = 9.80\,\mathrm{m/s^2}$。

## 位形、约束与自由度 {#configuration}

考虑由 $N$ 个质点组成的系统，质量分别为 $m_1, \dots, m_N$，位置向量为 $\mathbf{r}_1, \dots, \mathbf{r}_N$。要说清某一瞬时系统在哪里，你需要 $3N$ 个数，即所有位置的直角坐标分量。这份清单就是系统的**位形**，而时刻 $t$ 允许出现的一切位形组成的集合是**位形空间**。

约束是限制位形的条件。最有用的那种约束是一个方程。

::: definition 完整约束 {#def-holonomic}
$N$ 个质点系统的一个约束称为**完整**的，如果它能写成位置之间、可能还含时间的一个方程

$$
f(\mathbf{r}_1, \dots, \mathbf{r}_N, t) = 0
$$ {#eq-holonomic}

若 $f$ 不显含 $t$，该约束是**定常**的；若显含 $t$，则是**非定常**的。不能写成 [[#eq-holonomic]] 形式的约束——例如一个不等式，或一个不能积分成位置之间关系、只涉及速度的关系——是**非完整**的。
:::

悬挂点在原点、在 $xy$ 平面内摆动的长度 $\ell$ 的单摆，满足定常约束 $z = 0$ 与 $x^2 + y^2 - \ell^2 = 0$。一个正在被拖着绕竖直直径以角速度 $\omega$ 旋转的圆环，环上的珠子满足一个非定常约束，因为环所在的平面、从而钢丝的方程，随时间改变。盒子里的气体分子服从"待在盒子内部"这条不等式，它是非完整的；沿球面外侧下滑的质点也是一样，它被 $\abs{\mathbf{r}} \ge R$ 限制着，而且可以离开。

如果存在 $k$ 个独立的完整约束，位形就被钉在 $\R^{3N}$ 的一个子集上，由 $3N - k$ 个自由参数描述。

::: definition 自由度与广义坐标 {#def-gen-coords}
受 $k$ 个独立完整约束的 $N$ 质点系统有 $n = 3N - k$ 个**自由度**。一组**广义坐标**是一个由 $n$ 个实数组成的清单 $q_1, \dots, q_n$，使得每个位置都能写成光滑函数

$$
\mathbf{r}_i = \mathbf{r}_i(q_1, \dots, q_n, t), \qquad i = 1, \dots, N,
$$ {#eq-transformation}

并且 $q_j$ 的每个选择（在某开集内）都自动满足全部约束，而给定位形附近每个允许的位形都恰好来自 $q_j$ 的一个选择。
:::

"自动满足全部约束"这句话正是要害。对平面单摆，偏离竖直向下的角度 $\phi$ 是一个广义坐标：$x = \ell\sin\phi$，$y = -\ell\cos\phi$，$z = 0$，而 $\phi$ 的每个值都给出圆上一点。约束不再是需要强加的方程，它已经被写进了描述本身。

广义坐标不必是长度。它们可以是角度，像单摆那样；也可以是某个振动模的振幅，像 [[analytical-mechanics/small-oscillations]] 里那样。它们不必相互正交。它们必须做到的是给位形一一编号，至少在局部如此：球面上的极角在极点处失效，那是坐标图的毛病，不是物理的毛病。

::: example 数自由度 {#ex-dof}
求下列系统的自由度数目，并各给一组广义坐标：(a) 在竖直平面内运动的双摆；(b) 在空间中自由运动的刚体；(c) 半径 $R$ 的圆环被拖着绕其竖直直径以恒定角速度 $\omega$ 转动，环上有一颗珠子。
::: solution
(a) 两个摆球给出 $3N = 6$ 个坐标。约束是 $z_1 = 0$ 与 $z_2 = 0$（平面内运动）、$x_1^2 + y_1^2 = \ell_1^2$（上杆）以及 $(x_2 - x_1)^2 + (y_2 - y_1)^2 = \ell_2^2$（下杆）。这四个是独立的，所以 $n = 6 - 4 = 2$。两杆与竖直向下方向的夹角 $\phi_1$ 与 $\phi_2$ 就是广义坐标：

$$
x_1 = \ell_1\sin\phi_1,\quad y_1 = -\ell_1\cos\phi_1,\quad x_2 = x_1 + \ell_2\sin\phi_2,\quad y_2 = y_1 - \ell_2\cos\phi_2.
$$

(b) 刚体有极多个质点，但一旦知道其中三个点在哪里——只要它们不共线——位形就确定了。三个点给出 $9$ 个坐标，而刚性固定了三个相互距离，所以 $n = 9 - 3 = 6$。此后每多一个质点，就多 $3$ 个坐标和对前三个点的 $3$ 个距离约束，所以数目不再变。质心的三个坐标，加上描述取向的三个角（例如 [[analytical-mechanics/rigid-bodies]] 中的欧拉角），是一个标准选择。

(c) 一个质点给出 $3$ 个坐标。珠子必须落在以环心为球心、半径 $R$ 的球面上，也必须落在环所在的平面内；该平面在时刻 $t$ 包含竖直轴，并与 $xz$ 平面成角 $\omega t$。两个约束，其中一个是非定常的，留下 $n = 1$。从环底量起的珠子角 $\theta$ 是一个广义坐标，满足

$$
\mathbf{r} = \bigl(R\sin\theta\cos\omega t,\; R\sin\theta\sin\omega t,\; -R\cos\theta\bigr).
$$

这个公式里显含的时间，是非定常约束的记号。圆环由电动机驱动，电动机对珠子做功，这一事实在我们问珠子的能量是否守恒时会起作用。
:::
:::

### 广义坐标下的速度

对 [[#eq-transformation]] 关于时间求导，用链式法则：

$$
\mathbf{v}_i = \deriv{\mathbf{r}_i}{t} = \sum_{j=1}^{n} \pdv{\mathbf{r}_i}{q_j}\,\dot q_j + \pdv{\mathbf{r}_i}{t}.
$$ {#eq-velocity}

这些数 $\dot q_j$ 称为**广义速度**。每个质点的速度关于它们是线性的，系数依赖于各 $q$ 与 $t$，再加上任何显含时间带来的项。由此立刻得到两个恒等式，拉格朗日方程的整个推导都压在它们身上。

::: lemma 关于广义速度的两个恒等式 {#lem-dots}
把 [[#eq-velocity]] 中的 $\mathbf{v}_i$ 看作关于独立变量 $q_1, \dots, q_n, \dot q_1, \dots, \dot q_n, t$ 的函数。则对每个 $j$，

$$
\pdv{\mathbf{v}_i}{\dot q_j} = \pdv{\mathbf{r}_i}{q_j}
\qquad\text{且}\qquad
\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right) = \pdv{\mathbf{v}_i}{q_j}.
$$ {#eq-dots}
:::

::: proof
在 [[#eq-velocity]] 中，系数 $\partial\mathbf{r}_i/\partial q_k$ 与项 $\partial\mathbf{r}_i/\partial t$ 只依赖 $q$ 和 $t$。因此对 $\dot q_j$ 求导只会挑出 $\dot q_j$ 的系数，这就是第一个恒等式。它有时被叫作"消点"。

第二个：$\partial\mathbf{r}_i/\partial q_j$ 本身是 $q_1, \dots, q_n, t$ 的函数，所以沿运动对它的总时间导数，由链式法则是

$$
\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right) = \sum_{k} \frac{\partial^2 \mathbf{r}_i}{\partial q_k\,\partial q_j}\,\dot q_k + \frac{\partial^2\mathbf{r}_i}{\partial t\,\partial q_j}.
$$

另一方面，对 [[#eq-velocity]] 关于 $q_j$ 求导得

$$
\pdv{\mathbf{v}_i}{q_j} = \sum_k \frac{\partial^2\mathbf{r}_i}{\partial q_j\,\partial q_k}\,\dot q_k + \frac{\partial^2\mathbf{r}_i}{\partial q_j\,\partial t}.
$$

两个表达式一致，因为二阶连续可微函数的混合二阶偏导相等。
:::

动能 $T = \sum_i \frac12 m_i \mathbf{v}_i\cdot\mathbf{v}_i$ 经由 [[#eq-velocity]] 成为一个函数 $T(q, \dot q, t)$，它是关于广义速度的二次多项式。当变换不依赖 $t$ 时，一次项与常数项消失，$T = \frac12\sum_{j,k} M_{jk}(q)\,\dot q_j\dot q_k$ 是关于 $\dot q$ 的二次型，矩阵 $M(q)$ 对称正定。对单摆，$T = \frac12 m\ell^2\dot\phi^2$；对转动圆环上的珠子，$T = \frac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta)$，其中不含 $\dot\theta$ 的项是被环带着转的那部分动能。

::: quiz
一个质点在球面上运动，球的半径随时间按 $R(t) = R_0 + ut$ 长大。它有几个自由度？束缚它的是什么约束？
- [ ] 三个自由度；半径在变，所以约束是非完整的。
- [x] 两个自由度；约束是完整且非定常的。
- [ ] 两个自由度；约束是完整且定常的。
- [ ] 一个自由度，因为径向运动是被规定的，而两个角度不独立。
::: solution
约束是单个方程 $x^2 + y^2 + z^2 - (R_0 + ut)^2 = 0$，是位置与时间之间的关系，所以是完整的；$t$ 显含其中，所以是非定常的。三个坐标上只有一个约束，留下 $3 - 1 = 2$ 个自由度，例如极角和方位角 $\theta$ 与 $\phi$。半径是被规定的，不是自由的，而两个角仍可独立选择。
:::
:::

## 虚位移与理想约束 {#virtual}

约束力自我调整，使系统留在允许的位形上。要让它们从方程中消失，我们只需要看尊重约束的位移，还需要一条关于约束力如何作用的物理假设。

::: definition 虚位移 {#def-virtual}
具有广义坐标 $q_j$ 的系统的一次**虚位移**，是在固定时刻 $t$ 作出、且与该时刻的约束相一致的无穷小位形改变：

$$
\delta\mathbf{r}_i = \sum_{j=1}^n \pdv{\mathbf{r}_i}{q_j}\,\delta q_j,
$$ {#eq-virtual}

其中各 $\delta q_j$ 是任意而独立的无穷小量。这里没有 $\partial\mathbf{r}_i/\partial t$ 项，因为时间被固定。
:::

"虚"这个字提示你：这个位移未必是系统实际做出的那个。对转动圆环上的珠子，时间 $\dd t$ 内的实际位移包含环转动时横向的运动 $R\sin\theta\,\omega\,\dd t$。虚位移则把环冻住，让珠子沿钢丝移动。正是这个区别，使下一条假设即便对运动着的约束也成立。

把作用在质点 $i$ 上的总力写成 $\mathbf{F}_i + \mathbf{N}_i$，其中 $\mathbf{F}_i$ 是**主动力**（重力、弹簧、任何由力定律给出的力），$\mathbf{N}_i$ 是**约束力**（曲面的法向支持力、刚性杆的张力、钢丝对珠子的力）。

::: definition 理想约束 {#def-ideal}
若约束力在一切虚位移上的总功为零，则这些约束是**理想的**（或**不作功的**）：

$$
\sum_{i=1}^N \mathbf{N}_i\cdot\delta\mathbf{r}_i = 0 \qquad\text{对一切虚位移 } \delta\mathbf{r}_i.
$$ {#eq-ideal}
:::

这是一条物理假设，不是定理。对本课程赖以定义的那批情形，它是真的。光滑曲面沿法向推，而虚位移与曲面相切。连接两个质点的刚性杆沿杆施加等值反向的力，而一个刚性位移改变两端位置时，沿杆方向的位移分量在两端相同，于是两笔功相消。纯滚动的轮子接触点瞬时静止，所以那里的摩擦力不做虚功。滑动摩擦不理想：在粗糙面上滑动的物块感到一个切向力，而切向虚位移会对它做功。这样的力必须归入主动力之中，作为下文意义下的广义力。

对运动着的约束，"理想"并不意味着约束力不做*实际*的功。转动圆环的钢丝从侧面推珠子，对它做真实的功，能量由电动机供给。它沿冻结的钢丝的虚位移仍然不做功，而 [[#eq-ideal]] 只要这一点。

### 静力学：虚功原理

动力学之前，先看平衡。如果每个质点都静止并且保持静止，则对一切 $i$ 有 $\mathbf{F}_i + \mathbf{N}_i = 0$，于是 $\sum_i (\mathbf{F}_i + \mathbf{N}_i)\cdot\delta\mathbf{r}_i = 0$。若约束是理想的，约束力消掉，得

$$
\sum_{i=1}^N \mathbf{F}_i\cdot\delta\mathbf{r}_i = 0 \qquad\text{对一切虚位移}.
$$ {#eq-virtual-work}

这就是**虚功原理**：平衡时，主动力在任何虚位移上都不做功。工程师就这样分析一个机构，而不必计算每个铰接处的力。对理想约束，从静止出发，逆命题也成立：若 [[#eq-virtual-work]] 成立，则该位形是平衡位形。

::: example 斜面上的物块与悬挂质量相平衡 {#ex-incline}
质量 $m_1 = 4.00\,\mathrm{kg}$ 的物块放在光滑斜面上，斜面与水平面成 $30.0^\circ$。一条轻而不可伸长的绳从物块出发，沿平行于斜面的方向，绕过顶端光滑而轻的滑轮，挂住一个悬挂质量 $m_2$。用虚功原理求使系统平衡的 $m_2$ 之值。
::: solution
系统有一个自由度。设 $s$ 是物块从某个参考位置沿斜面向上移动的距离；由于绳不可伸长，悬挂质量下降了同样的 $s$。一次虚位移就是一个改变 $\delta s$。

主动力是两个重力。在虚位移中物块升高 $\delta s\sin 30.0^\circ$，所以它的重力做功 $-m_1 g\sin 30.0^\circ\,\delta s$。悬挂质量下降 $\delta s$，所以它的重力做功 $+m_2 g\,\delta s$。斜面的法向支持力、张力以及滑轮处的力都是约束力，总虚功为零：法向支持力垂直于位移，张力对物块做 $+T\,\delta s$、对悬挂质量做 $-T\,\delta s$。

由虚功原理 [[#eq-virtual-work]] 得

$$
\bigl(m_2 g - m_1 g\sin 30.0^\circ\bigr)\,\delta s = 0 \quad\text{对每个}\ \delta s,
\qquad\text{故}\qquad m_2 = m_1\sin 30.0^\circ = (4.00)(0.500) = 2.00\,\mathrm{kg}.
$$

张力自始至终没有出场。用牛顿的方法，我们得写出两个方程 $T = m_1 g\sin 30.0^\circ$ 与 $T = m_2 g$，再消去 $T$；这条原理把消元提前做掉了。
:::
:::

## 达朗贝尔原理与拉格朗日方程 {#dalembert}

虚功原理说的是平衡。达朗贝尔的想法是把动力学化成静力学：把 $-m_i\mathbf{a}_i$ 当作又一个力，所谓"反有效力"。对质点 $i$ 的牛顿第二定律写作 $\mathbf{F}_i + \mathbf{N}_i - m_i\mathbf{a}_i = 0$，看上去像三个力的平衡。

::: theorem 达朗贝尔原理 {#thm-dalembert}
若约束是理想的，则系统的运动满足

$$
\sum_{i=1}^N \bigl(\mathbf{F}_i - m_i\mathbf{a}_i\bigr)\cdot\delta\mathbf{r}_i = 0
$$ {#eq-dalembert}

对每一时刻的每个虚位移 $\delta\mathbf{r}_i$ 成立。
:::

::: proof
对每个质点，牛顿第二定律给出 $\mathbf{F}_i + \mathbf{N}_i - m_i\mathbf{a}_i = 0$。与 $\delta\mathbf{r}_i$ 作点积并对 $i$ 求和：

$$
\sum_i \bigl(\mathbf{F}_i - m_i\mathbf{a}_i\bigr)\cdot\delta\mathbf{r}_i + \sum_i \mathbf{N}_i\cdot\delta\mathbf{r}_i = 0.
$$

第二个和因 [[#eq-ideal]]（理想约束的定义）而消失。
:::

达朗贝尔原理不含约束力。它的缺陷是各 $\delta\mathbf{r}_i$ 并不独立，因为它们被约束捆在一起。补救的办法是用广义坐标来表达一切，那时各 $\delta q_j$ 是独立的。

::: definition 广义力 {#def-gen-force}
与坐标 $q_j$ 共轭的**广义力**是

$$
Q_j = \sum_{i=1}^N \mathbf{F}_i\cdot\pdv{\mathbf{r}_i}{q_j},
$$ {#eq-gen-force}

于是主动力的虚功为 $\sum_i \mathbf{F}_i\cdot\delta\mathbf{r}_i = \sum_j Q_j\,\delta q_j$。
:::

如果 $q_j$ 是一条力沿之推的长度，$Q_j$ 就是那个力。如果 $q_j$ 是绕轴的角，$Q_j$ 就是绕该轴的力矩，因为转动 $\delta\phi$ 会把距轴 $\rho$ 的点移动 $\rho\,\delta\phi$。乘积 $Q_j q_j$ 总是功的量纲。

当主动力来自势能，$\mathbf{F}_i = -\nabla_i V(\mathbf{r}_1, \dots, \mathbf{r}_N, t)$，链式法则把 [[#eq-gen-force]] 变成

$$
Q_j = -\sum_i \nabla_i V\cdot\pdv{\mathbf{r}_i}{q_j} = -\pdv{V}{q_j},
$$ {#eq-gen-force-pot}

其中右端的 $V$ 已经通过 [[#eq-transformation]] 写成了各 $q$ 与 $t$ 的函数。

::: theorem 拉格朗日方程 {#thm-lagrange}
设质点系的约束是理想而完整的，广义坐标为 $q_1, \dots, q_n$，$T(q, \dot q, t)$ 是它的动能。则运动对每个 $j = 1, \dots, n$ 满足

$$
\deriv{}{t}\left(\pdv{T}{\dot q_j}\right) - \pdv{T}{q_j} = Q_j.
$$ {#eq-lagrange-T}

若此外主动力来自势 $V(q, t)$，则取**拉格朗日量** $L = T - V$，

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = 0.
$$ {#eq-lagrange}
:::

::: proof
把 [[#eq-virtual]] 代入达朗贝尔原理 [[#eq-dalembert]]。按 [[#def-gen-force]]，主动力部分是 $\sum_j Q_j\,\delta q_j$。惯性部分是

$$
\sum_i m_i\mathbf{a}_i\cdot\delta\mathbf{r}_i = \sum_j\left(\sum_i m_i\mathbf{a}_i\cdot\pdv{\mathbf{r}_i}{q_j}\right)\delta q_j.
$$

用乘积法则改写括号里的量，把 $\mathbf{a}_i = \dd\mathbf{v}_i/\dd t$ 写出：

$$
\sum_i m_i\deriv{\mathbf{v}_i}{t}\cdot\pdv{\mathbf{r}_i}{q_j} = \deriv{}{t}\left(\sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{r}_i}{q_j}\right) - \sum_i m_i\mathbf{v}_i\cdot\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right).
$$

现在使用 [[#lem-dots]] 的两个恒等式，在第一个和里把 $\partial\mathbf{r}_i/\partial q_j$ 换成 $\partial\mathbf{v}_i/\partial\dot q_j$，在第二个和里把 $\dd(\partial\mathbf{r}_i/\partial q_j)/\dd t$ 换成 $\partial\mathbf{v}_i/\partial q_j$：

$$
\deriv{}{t}\left(\sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{v}_i}{\dot q_j}\right) - \sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{v}_i}{q_j}
= \deriv{}{t}\left(\pdv{T}{\dot q_j}\right) - \pdv{T}{q_j},
$$

因为对任何变量 $x$ 都有 $\partial(\frac12 m_i\mathbf{v}_i\cdot\mathbf{v}_i)/\partial x = m_i\mathbf{v}_i\cdot\partial\mathbf{v}_i/\partial x$。达朗贝尔原理于是化为

$$
\sum_{j=1}^n\left[Q_j - \deriv{}{t}\left(\pdv{T}{\dot q_j}\right) + \pdv{T}{q_j}\right]\delta q_j = 0.
$$

约束是完整的，各 $q_j$ 是广义坐标，所以各 $\delta q_j$ 可以独立选取。把它们全部取零、只留一个非零，就表明每个括号都为零，这就是 [[#eq-lagrange-T]]。

若 $Q_j = -\partial V/\partial q_j$ 且 $V$ 不依赖速度，则 $\partial V/\partial\dot q_j = 0$，所以 $\partial T/\partial\dot q_j = \partial L/\partial\dot q_j$，把 $-\partial V/\partial q_j$ 移到左边即得 [[#eq-lagrange]]。
:::

看看用到了什么：牛顿第二定律、约束理想的假设、链式法则、各 $\delta q_j$ 的独立性。仅此而已。拉格朗日方程就是牛顿定律在约束允许的方向上的投影，写在投影自动完成的坐标里。方程恰好有 $n$ 个，每个自由度一个，没有一个提到约束力。

实践中这个方法有四个步骤。选广义坐标。用它们写出 $T$ 与 $V$。组成 $L = T - V$。对每个坐标各用一次 [[#eq-lagrange]]。唯一需要物理洞察力的地方是头两步，而最常见的错误，压倒性地，是把动能写错。

::: warning 动能必须在惯性系中计算
[[#thm-lagrange]] 中的 $T$ 是 $\sum\frac12 m_i v_i^2$，其中 $\mathbf{v}_i$ 是相对惯性系的速度。对转动圆环上的珠子，若写 $T = \frac12 mR^2\dot\theta^2$，也就是相对环的动能，就会丢掉 $\frac12 mR^2\omega^2\sin^2\theta$ 项，随之丢掉转动的全部效应。如果你更愿意在转动系或加速系里工作，就必须手工把惯性力当作广义力加进去。更干净的路是用广义坐标写出惯性系的速度，正如 [[#eq-velocity]] 所做的那样，让形式体系自己产生离心项与科里奥利（Coriolis）项。
:::

::: example 由达朗贝尔原理求阿特伍德机 {#ex-atwood}
质量 $m_1 = 3.00\,\mathrm{kg}$ 与 $m_2 = 2.00\,\mathrm{kg}$ 挂在轻而不可伸长的绳的两端，绳绕过光滑而轻的滑轮。用拉格朗日方程求 $m_1$ 的加速度。
::: solution
从滑轮向下量 $x$ 到 $m_1$。不可伸长把 $m_2$ 放在深度 $\ell - x$ 处，其中 $\ell$ 是绳的固定长度。一个自由度，坐标 $x$。

动能是 $T = \frac12 m_1\dot x^2 + \frac12 m_2\dot x^2$，因为 $m_2$ 的速率也是 $\abs{\dot x}$。势能从滑轮量起、$x$ 向下，得 $V = -m_1 g x - m_2 g(\ell - x)$。于是

$$
L = \tfrac12(m_1 + m_2)\dot x^2 + m_1 g x + m_2 g(\ell - x).
$$

于是 $\partial L/\partial\dot x = (m_1 + m_2)\dot x$，而 $\partial L/\partial x = (m_1 - m_2)g$，代入 [[#eq-lagrange]] 得

$$
(m_1 + m_2)\ddot x = (m_1 - m_2)g, \qquad \ddot x = \frac{m_1 - m_2}{m_1 + m_2}\,g = \frac{1.00}{5.00}(9.80) = 1.96\,\mathrm{m/s^2}.
$$

较重的质量以 $1.96\,\mathrm{m/s^2}$ 向下加速。张力作为约束力，自始至终没有出场。如果想要它，可以从单个质量的牛顿定律把它解出来，或更系统地用 [[#multipliers]] 一节的办法。
:::
:::

### 一个非定常约束的例子：转动圆环上的珠子

[[#ex-dof]](c) 的珠子是一个标准例子，在这里拉格朗日方法显出了它的价值。转动是被规定的，钢丝以谁都不想算的方式从侧面推珠子，而运动方程三行就出来了。

::: example 转动圆环上的珠子 {#ex-hoop}
质量 $m$ 的珠子在无摩擦地套在半径 $R$ 的圆环上，环被拖着绕其竖直直径以恒定角速度 $\omega$ 转动。设 $\theta$ 是从环底量起的珠子角。求运动方程与平衡位形，并对 $R = 0.200\,\mathrm{m}$、$\omega = 10.0\,\mathrm{rad/s}$ 求值。
::: solution
对 [[#ex-dof]] 中的位置 $\mathbf{r} = (R\sin\theta\cos\omega t, R\sin\theta\sin\omega t, -R\cos\theta)$ 求导：

$$
\mathbf{v} = \bigl(R\dot\theta\cos\theta\cos\omega t - R\omega\sin\theta\sin\omega t,\; R\dot\theta\cos\theta\sin\omega t + R\omega\sin\theta\cos\omega t,\; R\dot\theta\sin\theta\bigr).
$$

平方相加，交叉项消掉，得

$$
T = \tfrac12 mR^2\bigl(\dot\theta^2 + \omega^2\sin^2\theta\bigr), \qquad V = -mgR\cos\theta.
$$

第一项是沿钢丝的运动；第二项是钢丝自身的运动。由 $L = T - V$，

$$
\pdv{L}{\dot\theta} = mR^2\dot\theta, \qquad \pdv{L}{\theta} = mR^2\omega^2\sin\theta\cos\theta - mgR\sin\theta,
$$

而拉格朗日方程是

$$
\ddot\theta = \sin\theta\left(\omega^2\cos\theta - \frac{g}{R}\right).
$$ {#eq-hoop}

平衡位形是常值解，即右端为零之处：$\sin\theta = 0$，给出底部 $\theta = 0$ 与顶部 $\theta = \pi$；或者 $\cos\theta = g/(R\omega^2)$。最后这一对只在 $g/(R\omega^2) \le 1$ 时存在，也就是说只在 $\omega$ 超过临界值 $\omega_c = \sqrt{g/R}$ 时存在。

对 $R = 0.200\,\mathrm{m}$，$\omega_c = \sqrt{9.80/0.200} = \sqrt{49.0} = 7.00\,\mathrm{rad/s}$。在 $\omega = 10.0\,\mathrm{rad/s}$ 时环转得比这快，于是

$$
\cos\theta_0 = \frac{9.80}{(0.200)(10.0)^2} = 0.490, \qquad \theta_0 = \pm 60.7^\circ.
$$

哪些平衡是稳定的？在 $\theta = 0$ 附近，[[#eq-hoop]] 化为 $\ddot\theta \approx (\omega^2 - g/R)\theta$。低于临界转速时系数为负，底部稳定，小振动的角频率为 $\sqrt{g/R - \omega^2}$。超过它时系数为正，底部不稳定：小位移会增长，珠子爬到 $\theta_0$，并绕它振动。这些振动的频率在 [[analytical-mechanics/small-oscillations]] 中计算。
:::
:::

运动方程 [[#eq-hoop]] 可以写成 $\ddot\theta = -\dd U/\dd\theta$，其中的**有效势能**

$$
U(\theta) = -\frac{g}{R}\cos\theta - \frac12\omega^2\sin^2\theta,
$$

以 $mR^2$ 为单位。第一项是重力；第二项是转动系的离心势。$U$ 的极小值是稳定平衡位形。

::: widget plot
f: -(9.8/0.2)*cos(x) - 0.5*w^2*sin(x)^2
x: -pi, pi
y: -110, 60
sliders: w=5:0:14:0.1
piticks: true
caption: 算例中珠子的有效势能 $U(\theta)$，以 $mR^2$ 为单位，$R = 0.2\,\mathrm{m}$，$w$ 是以 $\mathrm{rad/s}$ 计的转速。$w = 5$ 时只有一个位于底部 $\theta = 0$ 的势阱。把 $w$ 缓慢向上拖，看势阱底部在 $w = 7$、即临界转速 $\sqrt{g/R}$ 处变平；超过它，底部变成隆起，两个新的势阱向 $\pm\pi/2$ 外侧移动。$w = 10$ 时它们位于 $\pm 1.06\,\mathrm{rad}$，即算例中的 $60.7^\circ$。
:::

这是**分岔**最简单的例子：一个参数越过临界值时，一个稳定平衡变得不稳定，并生下两个新的稳定平衡。对称的那个状态——珠子在底部——作为解依然存在，但不再是你看到的那个。同样的数学我们会在 [[analytical-mechanics/chaos]] 中再遇到。

::: remark 这里的能量不守恒
转动圆环的拉格朗日量不显含时间——尽管约束显含——所以存在一个守恒量。它不是 $T + V$。每当珠子向外移动，电动机就对它做功，因为那时钢丝必须从侧面推它，好让它跟上转动。守恒的那个量 $\frac12 mR^2\dot\theta^2 - \frac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta$，其中离心项的符号与 $T$ 里的相反。[[analytical-mechanics/lagrangian]] 会解释哪个函数守恒、为什么。
:::

## 约束力与拉格朗日乘数 {#multipliers}

有时约束力正是你想要的东西。过山车设计师需要法向支持力，而不只是运动；在球面上滑动的质点恰好在法向支持力降到零时离开表面。拉格朗日方法也能给出这些力。诀窍是保留一个比自由度数多出来的坐标，使约束没有被内置进去，然后用一个乘数把约束加上。

设坐标 $q_1, \dots, q_n$ 并非全部独立，而是满足一个完整约束 $G(q_1, \dots, q_n, t) = 0$。[[#thm-lagrange]] 直到最后一步的推导依然成立：达朗贝尔原理仍然说

$$
\sum_{j=1}^n \Bigl(\mathcal{E}_j - Q_j\Bigr)\,\delta q_j = 0, \qquad \mathcal{E}_j = \deriv{}{t}\pdv{T}{\dot q_j} - \pdv{T}{q_j},
$$

但现在只对那些尊重约束的 $\delta q$ 成立，即 $\sum_j (\partial G/\partial q_j)\,\delta q_j = 0$。我们不能再断定每个括号都为零了。

::: theorem 带乘数的拉格朗日方程 {#thm-multiplier}
设坐标 $q_1, \dots, q_n$ 受一个完整约束 $G(q, t) = 0$ 的限制且 $\nabla_q G \ne 0$，而所有其他约束都已内置在坐标中并且是理想的。则存在函数 $\lambda(t)$ 使得

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = \lambda\,\pdv{G}{q_j}, \qquad j = 1, \dots, n,
$$ {#eq-multiplier}

而 $\lambda\,\partial G/\partial q_j$ 就是约束 $G = 0$ 沿 $q_j$ 方向的广义力。
:::

::: proof
在固定时刻写出 $\mathbf{c} = (\mathcal{E}_j - Q_j)_j$ 与 $\mathbf{g} = (\partial G/\partial q_j)_j$，它们是 $\R^n$ 中的向量。达朗贝尔原理说，对一切满足 $\mathbf{g}\cdot\boldsymbol{\delta} = 0$ 的 $\boldsymbol{\delta}$ 都有 $\mathbf{c}\cdot\boldsymbol{\delta} = 0$。把 $\mathbf{c}$ 分解为 $\mathbf{c} = \lambda\mathbf{g} + \mathbf{c}_\perp$，其中 $\lambda = (\mathbf{c}\cdot\mathbf{g})/(\mathbf{g}\cdot\mathbf{g})$ 且 $\mathbf{c}_\perp\cdot\mathbf{g} = 0$。那么 $\boldsymbol{\delta} = \mathbf{c}_\perp$ 是一个允许的位移，所以 $0 = \mathbf{c}\cdot\mathbf{c}_\perp = \abs{\mathbf{c}_\perp}^2$，于是 $\mathbf{c}_\perp = 0$。故 $\mathbf{c} = \lambda\mathbf{g}$，把 $Q_j = -\partial V/\partial q_j$ 吸收进 $L$ 之后这就是 [[#eq-multiplier]]。

至于解释，注意：如果丢掉约束 $G = 0$，改用一个额外的主动力来代替它，那么要再现同样的运动，这个力就必须在每个坐标上恰好补上广义力 $\mathcal{E}_j - Q_j$。那正是 $\lambda\,\partial G/\partial q_j$。
:::

这套论证与多元微积分里的约束优化是同一个线性代数：与每个允许方向都正交的梯度，必须是约束梯度的倍数；见[数学图谱中的条件极值](/learn/maths/lesson.php?c=multivariable&l=extrema)。有多个约束 $G_1 = 0, \dots, G_k = 0$ 时，每个约束各有一个乘数，[[#eq-multiplier]] 的右端变成 $\sum_a \lambda_a\,\partial G_a/\partial q_j$。$n$ 个方程 [[#eq-multiplier]] 连同约束方程一起，确定 $n$ 个坐标和各乘数。

如果 $G$ 取作"到表面的距离减去零"，使 $\partial G/\partial q$ 是该坐标方向的单位法向量，那么 $\lambda$ 就是法向支持力本身。对 $G$ 另选归一化只会缩放 $\lambda$，而力 $\lambda\nabla G$ 不变。

::: example 脱离球面 {#ex-sphere}
质量 $m$ 的小质点从半径 $R$ 的光滑固定球面的顶端由静止开始，被轻轻一推，向下滑。在运动的竖直平面内用极坐标 $(r, \theta)$，$\theta$ 从竖直向上量起，求法向支持力作为 $\theta$ 的函数，以及质点脱离球面时的角度。
::: solution
保留 $r$ 与 $\theta$ 两个坐标，用一个乘数加上约束 $G = r - R = 0$。动能与势能为

$$
T = \tfrac12 m\bigl(\dot r^2 + r^2\dot\theta^2\bigr), \qquad V = mgr\cos\theta.
$$

由 $\partial G/\partial r = 1$ 与 $\partial G/\partial\theta = 0$，[[#eq-multiplier]] 给出

$$
m\ddot r - mr\dot\theta^2 + mg\cos\theta = \lambda, \qquad \deriv{}{t}\bigl(mr^2\dot\theta\bigr) - mgr\sin\theta = 0.
$$

因为 $\partial G/\partial r = 1$，$\lambda$ 是约束的径向（向外）的力：法向支持力 $N$。在球面上 $r = R$ 且 $\dot r = \ddot r = 0$，所以

$$
N = \lambda = mg\cos\theta - mR\dot\theta^2.
$$

第二个方程可以用能量守恒来积分——守恒成立，是因为约束固定而理想：$\frac12 mR^2\dot\theta^2 + mgR\cos\theta = mgR$，于是 $mR\dot\theta^2 = 2mg(1 - \cos\theta)$。代入得

$$
N = mg\cos\theta - 2mg(1 - \cos\theta) = mg(3\cos\theta - 2).
$$

在顶端 $N = mg$，静止的质点理当如此。质点加速后法向支持力减小，并在

$$
\cos\theta = \frac23, \qquad \theta = 48.2^\circ
$$

处降到零。表面只能推、不能拉，所以约束实质上是不等式 $r \ge R$。一旦 $N$ 将要变负，质点就离开球面，像抛体一样飞出去，此时它已从顶端下降了高度 $R(1 - \cos\theta) = R/3$。乘数精确地告诉了我们完整的约束描述何时停止成立。
:::
:::

::: intuition 为什么乘数是一个力
在 [[#eq-multiplier]] 中，左端是坐标若自由时运动方程会要求的东西。若系统以 $\lambda = 0$ 服从这些方程，它一般会漂离约束面 $G = 0$。项 $\lambda\nabla G$ 垂直于那个曲面，所以它改变不了沿曲面的运动；它只能把系统推回到曲面上去。正是一个不作功的约束力所做的事，而乘数度量的是它必须推得多用力。
:::

## 非完整约束 {#nonholonomic}

并非每个约束都会减少坐标的数目。经典的反例是一枚硬币，或半径 $R$ 的薄竖直圆盘，在水平面上作无滑滚动。它的位形由接触点的位置 $(x, y)$、盘面所在平面的朝向角 $\phi$、以及绕轴转过的滚转角 $\psi$ 给出。无滑滚动说的是接触点瞬时静止，这意味着

$$
\dot x = R\dot\psi\cos\phi, \qquad \dot y = R\dot\psi\sin\phi.
$$ {#eq-rolling}

这些是关于速度的关系。它们不能积分成坐标之间的关系：靠滚动和转向，你可以把圆盘送到任何位置、任何朝向、任何滚转角。向前滚距离 $d$，转 $\alpha$，再滚回 $d$，再转回 $-\alpha$；朝向角和滚转角都恢复了，接触点却横移了。侧方位停车的汽车做的正是这件事。四个坐标全部保持自由，但自由的速度只有两个，所以圆盘的速度自由度是两个，位形自由度是四个。这样的系统称为**非完整的**，而 [[#thm-lagrange]] 不能照搬使用，因为 [[#eq-rolling]] 允许的 $\delta q_j$ 并不独立。

形如 $\sum_j a_{j}(q, t)\,\dot q_j + a_0(q, t) = 0$ 的约束仍然可以用乘数处理：虚位移满足 $\sum_j a_j\,\delta q_j = 0$，而 [[#thm-multiplier]] 的论证给出 $\mathcal{E}_j - Q_j = \lambda\,a_j$。完整约束是 $a_j = \partial G/\partial q_j$ 的特例。不等式约束，比如球面上的质点，则按等式求解并检查乘数的符号来处理。

::: history 从达朗贝尔到拉格朗日
让·勒朗·达朗贝尔（Jean le Rond d'Alembert）在 1743 年的《动力学论》（*Traité de dynamique*）中陈述了他的原理，其形式是：所谓"损失的力"——主动力与那些将要产生实际运动的力之间的差——必须在约束之下构成平衡。约翰·伯努利（Johann Bernoulli）在 1717 年致皮埃尔·瓦里尼翁（Pierre Varignon）的一封信中，为静力学表述了虚速度原理。约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在《分析力学》（*Mécanique analytique*，巴黎，1788）中把两者合为一体：动力学从我们写成 [[#eq-dalembert]] 的那一个方程导出，用任意坐标表达，对约束配上乘数。序言里夸口说书中没有一幅图，只有代数运算。"完整"与"非完整"这些词要晚得多，它们是海因里希·赫兹（Heinrich Hertz）在《力学原理》（*Die Prinzipien der Mechanik*，1894）中引入的。
:::

## 后续内容 {#leads}

[[analytical-mechanics/lagrangian]] 从一个变分原理——哈密顿（Hamilton）的驻作用量原理——导出同一批方程 [[#eq-lagrange]]；那个原理根本不提虚位移，并且能推广到场和量子力学。在那里我们还会把 $L$ 的对称性与守恒律联系起来。[[analytical-mechanics/central-forces]]、[[analytical-mechanics/rigid-bodies]] 与 [[analytical-mechanics/small-oscillations]] 是应用，其中正确的广义坐标选择能让难题变得可解。[[analytical-mechanics/hamiltonian]] 把 $n$ 个二阶方程换成 $2n$ 个一阶方程。

这一章要带走的技能，是其后每一道题的第一步：数自由度数，选把约束内置进去的坐标，并在惯性系里写动能。

::: summary
- 完整约束是一个方程 $f(\mathbf{r}_1, \dots, \mathbf{r}_N, t) = 0$；$k$ 个独立的完整约束留下 $n = 3N - k$ 个自由度。非定常约束显含时间。
- 广义坐标 $q_1, \dots, q_n$ 给允许的位形一一编号，并自动满足约束。
- 虚位移在固定时刻作出，并尊重约束。理想约束在任何虚位移上不做功；滑动摩擦不理想。
- 达朗贝尔原理 $\sum(\mathbf{F}_i - m_i\mathbf{a}_i)\cdot\delta\mathbf{r}_i = 0$ 不含约束力。
- 配上广义力 $Q_j = \sum_i\mathbf{F}_i\cdot\partial\mathbf{r}_i/\partial q_j$，它化为拉格朗日方程 $\frac{\dd}{\dd t}\frac{\partial T}{\partial\dot q_j} - \frac{\partial T}{\partial q_j} = Q_j$；对保守力则是 $\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_j} - \frac{\partial L}{\partial q_j} = 0$，其中 $L = T - V$。
- $T$ 必须是相对惯性系的动能，写在广义坐标之下。
- 约束力可以通过保留一个多余坐标、加上 $\lambda\,\partial G/\partial q_j$ 来恢复；乘数就是约束的力，它的符号告诉你不等式约束何时松脱。
- 关于速度的约束，如无滑滚动，可能是非完整的：它们限制速度而不减少坐标数。
:::

## 习题 {#exercises}

::: exercise 刚性哑铃 {level=1 check="5"}
两个质点由一根轻刚性杆连接，在三维空间中自由运动。这个系统有几个自由度？
::: solution
两个质点给出 $3 \times 2 = 6$ 个直角坐标。杆施加一个完整、定常的约束 $\abs{\mathbf{r}_1 - \mathbf{r}_2} = \ell$。所以 $n = 6 - 1 = 5$。一组方便的广义坐标是质心位置的三个分量，以及给出杆方向的两个极角 $(\theta, \phi)$。哑铃绕自身轴的转动不是自由度，因为轴上的质点在转动时不动。
:::
:::

::: exercise 平面内的刚性三角形 {level=1 check="3"}
三个质点由三根轻刚性杆连成一个三角形，在水平桌面上滑动。这个系统有几个自由度？
::: solution
平面内的三个质点有 $2 \times 3 = 6$ 个坐标。三根杆固定了三条边长，给出三个独立的约束。所以 $n = 6 - 3 = 3$：一个顶点（或质心）位置的两个坐标，加上取向的一个角。这就是 [[#ex-dof]](b) 中计数的平面版本。
:::
:::

::: exercise 极坐标下的广义力 {level=1 check="8"}
平面内 $(x, y) = (2.00\,\mathrm{m}, 0)$ 处的质点受力 $\mathbf{F} = (3.00, 4.00)\,\mathrm{N}$。把极坐标 $(r, \theta)$ 用作广义坐标，求以牛顿计的 $Q_r$ 和以牛顿·米计的 $Q_\theta$。答案交 $Q_\theta$。
::: solution
由 $\mathbf{r} = (r\cos\theta, r\sin\theta)$，

$$
\pdv{\mathbf{r}}{r} = (\cos\theta, \sin\theta) = \hat{\mathbf{r}}, \qquad \pdv{\mathbf{r}}{\theta} = (-r\sin\theta, r\cos\theta) = r\hat{\boldsymbol{\theta}}.
$$

由 [[#eq-gen-force]]，$Q_r = \mathbf{F}\cdot\hat{\mathbf{r}}$ 是力的径向分量，而 $Q_\theta = r\,\mathbf{F}\cdot\hat{\boldsymbol{\theta}} = xF_y - yF_x$ 是对原点的力矩。在点 $(2.00, 0)$ 处 $r = 2.00\,\mathrm{m}$、$\theta = 0$，所以

$$
Q_r = 3.00\,\mathrm{N}, \qquad Q_\theta = (2.00)(4.00) - (0)(3.00) = 8.00\,\mathrm{N\,m}.
$$

与角共轭的广义力是一个力矩，而 $Q_\theta\,\delta\theta$ 具有功的单位。
:::
:::

::: exercise 阿特伍德机中的张力 {level=2 check="23.52"}
对 [[#ex-atwood]] 的阿特伍德机，$m_1 = 3.00\,\mathrm{kg}$、$m_2 = 2.00\,\mathrm{kg}$，用两质量在滑轮下方的深度 $x_1$ 与 $x_2$ 作坐标，用一个拉格朗日乘数加上约束 $G = x_1 + x_2 - \ell = 0$，求以牛顿计的张力。
::: hint
每个质量给出一个 [[#eq-multiplier]] 形状的方程。相减求出加速度，再代回求 $\lambda$。由符号判断 $\lambda$ 代表哪个力。
:::
::: solution
拉格朗日量是 $L = \frac12 m_1\dot x_1^2 + \frac12 m_2\dot x_2^2 + m_1 g x_1 + m_2 g x_2$，而 $\partial G/\partial x_1 = \partial G/\partial x_2 = 1$。方程 [[#eq-multiplier]] 化为

$$
m_1\ddot x_1 - m_1 g = \lambda, \qquad m_2\ddot x_2 - m_2 g = \lambda.
$$

约束给出 $\ddot x_2 = -\ddot x_1$。每个方程除以各自的质量：$\ddot x_1 = g + \lambda/m_1$，而 $-\ddot x_1 = g + \lambda/m_2$。两式相加消去加速度，

$$
\lambda\left(\frac{1}{m_1} + \frac{1}{m_2}\right) = -2g, \qquad \lambda = -\frac{2m_1m_2 g}{m_1 + m_2} = -\frac{2(3.00)(2.00)(9.80)}{5.00} = -23.52\,\mathrm{N}.
$$

对 $m_1$ 沿 $x_1$ 增大方向（向下）的广义约束力是 $\lambda\,\partial G/\partial x_1 = \lambda$，它为负：绳以大小 $\abs{\lambda}$ 的力把每个质量向上拉。张力为 $T = 23.52\,\mathrm{N}$，它落在两个重量 $19.6\,\mathrm{N}$ 与 $29.4\,\mathrm{N}$ 之间，理当如此。加速度是 $\ddot x_1 = g + \lambda/m_1 = 9.80 - 7.84 = 1.96\,\mathrm{m/s^2}$，与 [[#ex-atwood]] 一致。
:::
:::

::: exercise 圆环的临界转速 {level=2 check="sqrt(39.2)"}
珠子在无摩擦的圆环上滑动，环半径 $0.250\,\mathrm{m}$，绕其竖直直径转动。求以 $\mathrm{rad/s}$ 计的转速，超过它之后环底不再是稳定平衡。对转速 $5.00\,\mathrm{rad/s}$，求绕环底小振动的周期。
::: solution
由 [[#eq-hoop]]，在 $\theta = 0$ 附近有 $\ddot\theta \approx -(g/R - \omega^2)\theta$：当 $g/R > \omega^2$ 时这是简谐振动，当 $g/R < \omega^2$ 时是指数增长。临界转速为

$$
\omega_c = \sqrt{\frac{g}{R}} = \sqrt{\frac{9.80}{0.250}} = \sqrt{39.2} = 6.26\,\mathrm{rad/s}.
$$

在 $\omega = 5.00\,\mathrm{rad/s}$ 时，小振动的角频率为 $\sqrt{39.2 - 25.0} = \sqrt{14.2} = 3.77\,\mathrm{rad/s}$，所以周期是 $2\pi/3.77 = 1.67\,\mathrm{s}$。若不转动，周期将是 $2\pi/6.26 = 1.00\,\mathrm{s}$。转动使回复变软，而在 $\omega_c$ 处周期变为无穷大。
:::
:::

::: exercise 被推一把后离开球面 {level=2 check="5/6"}
在 [[#ex-sphere]] 中，设质点在顶端被赋予初速率 $v_0$，满足 $v_0^2 = gR/2$。求它离开球面之处的 $\cos\theta$。
::: solution
由乘数方程，法向支持力仍是 $N = mg\cos\theta - mR\dot\theta^2$。能量守恒现在写成

$$
\tfrac12 mR^2\dot\theta^2 + mgR\cos\theta = \tfrac12 mv_0^2 + mgR,
\qquad\text{于是}\qquad mR\dot\theta^2 = \frac{mv_0^2}{R} + 2mg(1 - \cos\theta).
$$

于是 $N = mg(3\cos\theta - 2) - mv_0^2/R$，它在

$$
\cos\theta = \frac23 + \frac{v_0^2}{3gR} = \frac23 + \frac16 = \frac56
$$

处为零。质点更早离开，大约在 $33.6^\circ$ 处，因为它出发时就带着一些曲率留不住的速度。若 $v_0^2 \ge gR$，它立刻离开：那时在顶端就有 $N \le 0$。
:::
:::

::: exercise 支点运动的摆 {level=2}
长度 $\ell$、质量 $m$ 的单摆，其支点被规定作水平运动 $x_s(t) = a\cos\Omega t$。用偏离竖直向下的角 $\phi$，求拉格朗日量与运动方程。解释多出来的那一项。
::: hint
把摆球的位置写成支点位置加上 $(\ell\sin\phi, -\ell\cos\phi)$，求导，并把每一项都保留下来。
:::
::: solution
摆球在 $x = a\cos\Omega t + \ell\sin\phi$、$y = -\ell\cos\phi$ 处，于是

$$
\dot x = -a\Omega\sin\Omega t + \ell\dot\phi\cos\phi, \qquad \dot y = \ell\dot\phi\sin\phi,
$$

$$
T = \tfrac12 m\bigl(\ell^2\dot\phi^2 - 2a\Omega\ell\dot\phi\cos\phi\sin\Omega t + a^2\Omega^2\sin^2\Omega t\bigr), \qquad V = -mg\ell\cos\phi.
$$

于是 $\partial L/\partial\dot\phi = m\ell^2\dot\phi - ma\Omega\ell\cos\phi\sin\Omega t$，其对时间的导数是

$$
m\ell^2\ddot\phi + ma\Omega\ell\dot\phi\sin\phi\sin\Omega t - ma\Omega^2\ell\cos\phi\cos\Omega t,
$$

而 $\partial L/\partial\phi = ma\Omega\ell\dot\phi\sin\phi\sin\Omega t - mg\ell\sin\phi$。含 $\dot\phi\sin\phi\sin\Omega t$ 的项在拉格朗日方程中相消，剩下

$$
\ddot\phi + \frac{g}{\ell}\sin\phi = \frac{a\Omega^2}{\ell}\cos\Omega t\,\cos\phi.
$$

右端是加速的支点系中的惯性力 $-m\ddot x_s = ma\Omega^2\cos\Omega t$ 在摆球运动方向上的投影，它带来因子 $\cos\phi$。拉格朗日方法没有任何关于非惯性系的讨论就把这一项生产了出来，因为 $T$ 是在惯性系里写的。项 $\frac12 ma^2\Omega^2\sin^2\Omega t$ 只依赖时间，不起任何作用。
:::
:::

::: exercise 保守力的拉格朗日方程 {level=3}
从 [[#lem-dots]] 的恒等式出发，设主动力为 $\mathbf{F}_i = -\nabla_i V$，$V$ 只依赖位置与时间，证明 $Q_j = -\partial V/\partial q_j$，并由此说明 [[#eq-lagrange-T]] 蕴含 [[#eq-lagrange]]。然后举一个例子说明：对形如 $\mathbf{F} = -b\mathbf{v}$ 的力，这个结论失效，并说明什么取代它。
::: hint
第一部分，$V(q, t) = V(\mathbf{r}_1(q, t), \dots, \mathbf{r}_N(q, t), t)$；用链式法则求导。第二部分，对直线上受力 $\mathbf{F} = -b\dot x\,\hat{\mathbf{x}}$ 的质点计算 $Q$。
:::
::: solution
定义 $\tilde V(q, t) = V(\mathbf{r}_1(q, t), \dots, \mathbf{r}_N(q, t), t)$。由链式法则，

$$
\pdv{\tilde V}{q_j} = \sum_i \nabla_i V\cdot\pdv{\mathbf{r}_i}{q_j} = -\sum_i\mathbf{F}_i\cdot\pdv{\mathbf{r}_i}{q_j} = -Q_j.
$$

因为 $\tilde V$ 不依赖各 $\dot q_j$，$\partial(T - \tilde V)/\partial\dot q_j = \partial T/\partial\dot q_j$。于是

$$
\deriv{}{t}\pdv{(T - \tilde V)}{\dot q_j} - \pdv{(T - \tilde V)}{q_j} = \deriv{}{t}\pdv{T}{\dot q_j} - \pdv{T}{q_j} + \pdv{\tilde V}{q_j} = Q_j - Q_j = 0,
$$

最后一步用了 [[#eq-lagrange-T]]。这就是 [[#eq-lagrange]]。

对 $x$ 轴上受阻力 $F = -b\dot x$ 的质点，广义力是 $Q_x = -b\dot x$。它对任何函数 $V(x, t)$ 都不是 $-\partial V/\partial x$，因为它依赖速度，而任何与速度无关的势都产生不了"速度反向、力就反向"的力。拉格朗日方程必须用 [[#eq-lagrange-T]] 的形式，或者写成 $\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q} - \frac{\partial L}{\partial q} = Q$，其中 $L$ 由保守力构成，$Q$ 是非保守的余项：这里是 $m\ddot x = -b\dot x$。线性阻力也可以通过瑞利（Rayleigh）耗散函数 $\mathcal{F} = \frac12 b\dot x^2$ 纳入，取 $Q = -\partial\mathcal{F}/\partial\dot x$。磁场力是例外：它依赖速度，却来自一个依赖速度的势，见 [[analytical-mechanics/lagrangian]]。
:::
:::

::: exercise 滚动的圆盘是非完整的 {level=3}
对 [[#nonholonomic]] 的竖直圆盘，证明不存在满足 $\nabla f \ne 0$ 的函数 $f(x, y, \phi, \psi)$，使它在服从 [[#eq-rolling]]、$\dot\phi$ 与 $\dot\psi$ 任意的每一条运动上保持常数。由此断定滚动约束不能被替换成完整约束。
::: hint
若 $f$ 在每条允许的运动上都是常数，则 $\dot f = f_x\dot x + f_y\dot y + f_\phi\dot\phi + f_\psi\dot\psi = 0$ 对一切允许的速度成立。利用 $\dot\phi$ 与 $\dot\psi$ 的自由度，再比较混合偏导数。
:::
::: solution
设 $f$ 在每条满足 [[#eq-rolling]] 的运动上都是常数。沿这样的运动，

$$
0 = \dot f = f_x R\dot\psi\cos\phi + f_y R\dot\psi\sin\phi + f_\phi\dot\phi + f_\psi\dot\psi.
$$

由于 $\dot\phi$ 与 $\dot\psi$ 在任何位形下都可以独立选取，各自的系数必须处处为零：

$$
f_\phi = 0, \qquad f_\psi + R\bigl(f_x\cos\phi + f_y\sin\phi\bigr) = 0.
$$

第一式说 $f$ 不依赖 $\phi$，于是 $f_x$、$f_y$ 与 $f_\psi$ 也不依赖 $\phi$。固定 $(x, y, \psi)$。第二式便说 $A + B\cos\phi + C\sin\phi = 0$ 对一切 $\phi$ 成立，其中 $A = f_\psi$、$B = Rf_x$、$C = Rf_y$ 是常数。代入 $\phi = 0$、$\pi/2$ 与 $\pi$ 得 $A + B = 0$、$A + C = 0$ 与 $A - B = 0$，所以 $A = B = C = 0$。于是 $f_x = f_y = f_\psi = 0$，加上 $f_\phi = 0$，处处有 $\nabla f = 0$，与假设矛盾。

所以没有任何关于位形的非平凡函数被滚动运动守恒。若约束是完整的，运动就会留在每个约束函数的等值集上，而那些函数就正是这样的 $f$。因此这些约束是非完整的，而且给定位形附近的每一个位形都能靠滚动和转向到达——侧方位停车的论证已经提示了这一点。
:::
:::
