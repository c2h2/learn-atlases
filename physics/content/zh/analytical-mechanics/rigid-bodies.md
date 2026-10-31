把一本书抛向空中，让它绕最长的轴旋转，它会平稳地转下去。让它绕最短的轴——垂直于封面的那条——旋转，它照样平稳地转。可一旦绕剩下的那条轴旋转，也就是位于封面平面内、平行于书脊短边的轴，书就会翻跟头：无论你抛得多小心，它每隔一两转就要翻一次面。网球拍也是如此。1985 年，宇航员弗拉基米尔·贾尼别科夫（Vladimir Dzhanibekov）在礼炮 7 号（Salyut 7）空间站的失重环境里观察一枚蝶形螺母（wing nut）旋转，看到的正是这种翻转。这些情形里都没有力矩作用。这种行为是刚体自由运动本身的性质，而对它的解释正是本章的高潮。

刚体有六个自由度（[[analytical-mechanics/constraints#ex-dof]]）：三个描述质心位置，三个描述取向。平动部分就是一个质量等于总质量的质点的运动。转动部分是新的，因为角动量与角速度之间的关系不再是一个数。[[mechanics/rotation]] 与 [[mechanics/angular-momentum]] 处理过绕固定轴的转动，那里 $L = I\omega$，$I$ 是标量。对绕任意轴的转动，角动量与角速度甚至可以互不平行，标量要变成一个对称的 $3\times 3$ 矩阵，即**惯量张量**。

本章的路线是：用角速度向量描述转动；计算角动量与动能，由此引出惯量张量及其主轴；在与本体固结的参考系里写出转动定律，得到欧拉方程；再解这些方程，求自由对称陀螺，并回答开头的书所引出的稳定性问题。

## 角速度与转动参考系 {#angular-velocity}

在刚体上固定一点 $O$，它可以是固定铰链，也可以是质心。除 $O$ 以外的每一点都相对 $O$ 在以 $O$ 为球心的球面上运动。由欧拉旋转定理，一个点固定的刚体的任何位移，都是绕某条过该点的轴的转动。时间 $\dd t$ 内的无穷小位移，是绕轴 $\hat{\mathbf{n}}$ 转过 $\omega\,\dd t$ 角的转动，**角速度**就是向量 $\boldsymbol{\omega} = \omega\hat{\mathbf{n}}$。位于 $\mathbf{r}$（相对 $O$）处的点，速度为

$$
\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}.
$$ {#eq-v-omega}

转轴与快慢可以从一瞬变到另一瞬；$\boldsymbol{\omega}(t)$ 给出的是瞬时转轴。

同一个公式支配任何固连于本体的向量的变化率。更一般地，设 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ 是固结在刚体上的一组标准正交轴，则 $\dot{\mathbf{e}}_a = \boldsymbol{\omega}\times\mathbf{e}_a$。

::: theorem 转动参考系中的变化率 {#thm-rotating}
设 $\mathbf{A}(t) = \sum_a A_a(t)\,\mathbf{e}_a(t)$ 是任一向量，其分量写在以角速度 $\boldsymbol{\omega}$ 转动的轴上。则

$$
\left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{space}} = \left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{A},
$$ {#eq-rotating}

其中 $(\dd\mathbf{A}/\dd t)_{\mathrm{body}} = \sum_a\dot A_a\,\mathbf{e}_a$ 是与轴一起转动的观察者所看到的变化率。
:::

::: proof
用乘积法则，

$$
\deriv{\mathbf{A}}{t} = \sum_a\dot A_a\,\mathbf{e}_a + \sum_a A_a\,\dot{\mathbf{e}}_a = \left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{body}} + \sum_a A_a\,\boldsymbol{\omega}\times\mathbf{e}_a,
$$

最后一个和由叉积的线性即等于 $\boldsymbol{\omega}\times\mathbf{A}$。
:::

把 [[#eq-rotating]] 对质点的位置用两次，就得到转动参考系中的科里奥利（Coriolis）加速度与离心加速度。这里只用一次，用在角动量上。

## 惯量张量 {#inertia}

把刚体看成许多质点的集合，各质点质量为 $m_\alpha$、位置 $\mathbf{r}_\alpha$ 都相对 $O$；对连续体，求和变成对质量密度的积分。关于 $O$ 的角动量是

$$
\mathbf{L} = \sum_\alpha m_\alpha\,\mathbf{r}_\alpha\times(\boldsymbol{\omega}\times\mathbf{r}_\alpha) = \sum_\alpha m_\alpha\bigl[r_\alpha^2\boldsymbol{\omega} - (\mathbf{r}_\alpha\cdot\boldsymbol{\omega})\mathbf{r}_\alpha\bigr],
$$

最后一步用了向量三重积。它对 $\boldsymbol{\omega}$ 是线性的，所以它就是一个矩阵乘 $\boldsymbol{\omega}$。

::: definition 惯量张量 {#def-inertia-tensor}
刚体关于点 $O$ 的**惯量张量**是一个 $3\times 3$ 矩阵，其分量为

$$
I_{ij} = \sum_\alpha m_\alpha\bigl(r_\alpha^2\delta_{ij} - x_{\alpha i}x_{\alpha j}\bigr),
$$ {#eq-inertia}

其中 $x_{\alpha i}$ 是 $\mathbf{r}_\alpha$ 的直角坐标分量。对角元素，例如 $I_{xx} = \sum m(y^2 + z^2)$，是关于坐标轴的**转动惯量**；非对角元素，例如 $I_{xy} = -\sum mxy$，是**惯性积**。
:::

按这个定义，

$$
\mathbf{L} = I\boldsymbol{\omega}, \qquad T = \tfrac12\sum_\alpha m_\alpha(\boldsymbol{\omega}\times\mathbf{r}_\alpha)^2 = \tfrac12\boldsymbol{\omega}\cdot I\boldsymbol{\omega} = \tfrac12\boldsymbol{\omega}\cdot\mathbf{L}.
$$ {#eq-L-T}

第二个公式来自 $(\boldsymbol{\omega}\times\mathbf{r})\cdot(\boldsymbol{\omega}\times\mathbf{r}) = \boldsymbol{\omega}\cdot[\mathbf{r}\times(\boldsymbol{\omega}\times\mathbf{r})]$，它是三重积的一次轮换。对绕固定轴 $\hat{\mathbf{n}}$ 的转动，$T = \frac12 I_n\omega^2$，其中 $I_n = \hat{\mathbf{n}}\cdot I\hat{\mathbf{n}} = \sum m\rho^2$ 就是关于该轴的熟悉的转动惯量，$\rho$ 是到轴的距离。

矩阵 $I$ 是实对称的。它还是半正定的，因为 $\boldsymbol{\omega}\cdot I\boldsymbol{\omega} = 2T \ge 0$；并且除非全部质量都落在过 $O$ 的一条直线上，它还是正定的。

::: theorem 平行轴定理 {#thm-parallel-axis}
设 $I^{\mathrm{cm}}$ 是关于质心的惯量张量，$\mathbf{d}$ 是质心相对点 $O$ 的位置。对总质量为 $M$ 的刚体，关于 $O$ 的惯量张量为

$$
I_{ij}^{O} = I_{ij}^{\mathrm{cm}} + M\bigl(d^2\delta_{ij} - d_id_j\bigr).
$$ {#eq-parallel}
:::

::: proof
写 $\mathbf{r}_\alpha = \mathbf{d} + \mathbf{s}_\alpha$，其中 $\mathbf{s}_\alpha$ 从质心量起，于是 $\sum_\alpha m_\alpha\mathbf{s}_\alpha = 0$。代入 [[#eq-inertia]]：

$$
I^O_{ij} = \sum_\alpha m_\alpha\bigl[(d^2 + 2\mathbf{d}\cdot\mathbf{s}_\alpha + s_\alpha^2)\delta_{ij} - (d_i + s_{\alpha i})(d_j + s_{\alpha j})\bigr].
$$

一切关于 $\mathbf{s}_\alpha$ 线性的项求和都为零。$\mathbf{s}$ 的二次项给出 $I^{\mathrm{cm}}_{ij}$，不含 $\mathbf{s}$ 的项给出 $M(d^2\delta_{ij} - d_id_j)$。
:::

多出来的一项，是把全部质量 $M$ 集中在质心处的质点的惯量张量。对轴 $\hat{\mathbf{n}}$，它给出熟悉的形式 $I_n = I_n^{\mathrm{cm}} + Md_\perp^2$，其中 $d_\perp$ 是两条平行轴之间的距离。

### 主轴

因为 $I$ 实对称，谱定理（[见数学图谱](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)）保证三个实特征值和一组标准正交的特征向量。

::: definition 主轴与主转动惯量 {#def-principal}
关于 $O$ 的惯量张量的特征向量 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$，取成标准正交，就是刚体在 $O$ 处的**主轴**；特征值 $I_1, I_2, I_3$ 是**主转动惯量**。在主轴系中，

$$
I = \begin{pmatrix} I_1 & 0 & 0\\ 0 & I_2 & 0\\ 0 & 0 & I_3\end{pmatrix}, \qquad \mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3), \qquad T = \tfrac12\bigl(I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2\bigr).
$$
:::

$\mathbf{L}$ 与 $\boldsymbol{\omega}$ 平行，恰好当 $\boldsymbol{\omega}$ 沿一条主轴（或落在简并特征值对应的平面内）。满足 $I_1 = I_2 \neq I_3$ 的刚体是**对称陀螺**；满足 $I_1 = I_2 = I_3$ 的是**球对称陀螺**，它的每条轴都是主轴。对称性常常不用任何计算就能找到主轴：旋转对称轴，或反射对称面的法线，都是主轴。

::: example 立方体关于顶点的惯量张量 {#ex-cube}
质量 $M$、边长 $a$ 的均匀实心立方体，一个顶点在原点，三条棱沿坐标轴正向。求它关于该顶点的惯量张量与那里的主转动惯量。
::: solution
密度为 $M/a^3$。关于 $x$ 轴的转动惯量是

$$
I_{xx} = \frac{M}{a^3}\int_0^a\!\!\int_0^a\!\!\int_0^a (y^2 + z^2)\,\dd x\,\dd y\,\dd z = \frac{M}{a^3}\left(a\cdot\frac{a^3}{3}\cdot a + a\cdot a\cdot\frac{a^3}{3}\right) = \frac23 Ma^2,
$$

由对称性 $I_{yy} = I_{zz} = \frac23 Ma^2$。惯性积是

$$
I_{xy} = -\frac{M}{a^3}\int_0^a\!\!\int_0^a\!\!\int_0^a xy\,\dd x\,\dd y\,\dd z = -\frac{M}{a^3}\cdot\frac{a^2}{2}\cdot\frac{a^2}{2}\cdot a = -\frac14 Ma^2,
$$

$I_{yz}$ 与 $I_{xz}$ 同理。于是

$$
I = Ma^2\begin{pmatrix} 2/3 & -1/4 & -1/4\\ -1/4 & 2/3 & -1/4\\ -1/4 & -1/4 & 2/3\end{pmatrix} = Ma^2\left(\frac{11}{12}\,\mathbb{1} - \frac14 J\right),
$$

其中 $J$ 是元素全为 $1$ 的矩阵。$J$ 在 $(1, 1, 1)$ 方向有特征值 $3$，在与它垂直的平面内有特征值 $0$。因此主转动惯量为

$$
I_1 = Ma^2\left(\frac{11}{12} - \frac34\right) = \frac16 Ma^2 \quad\text{沿体对角线}, \qquad I_2 = I_3 = \frac{11}{12}Ma^2
$$

对一切与体对角线垂直的轴都成立。立方体绕顶点是对称陀螺。用 [[#thm-parallel-axis]] 核对：关于中心，立方体是球对称陀螺，$I^{\mathrm{cm}} = \frac16 Ma^2$；过顶点的对角线穿过中心，故 $d_\perp = 0$，关于对角线的转动惯量就是 $\frac16 Ma^2$，与所得一致。与它垂直的方向上 $d_\perp = \frac{\sqrt3}{2}a$，且 $\frac16 Ma^2 + \frac34 Ma^2 = \frac{11}{12}Ma^2$。
:::
:::

::: warning 角动量并不平行于角速度
固定轴转动留下的标量公式 $L = I\omega$ 诱使人以为 $\mathbf{L}\parallel\boldsymbol{\omega}$。对绕顶点的立方体，绕 $x$ 方向的棱以 $\boldsymbol{\omega} = \omega\hat{\mathbf{x}}$ 转动时，角动量是 $Ma^2\omega(2/3, -1/4, -1/4)$，与转轴的夹角为 $\arccos\bigl((2/3)/\sqrt{4/9 + 1/8}\bigr) = 28^\circ$。只有绕主轴转动，或球对称陀螺的情形，标量公式作为向量陈述才正确。
:::

## 欧拉方程 {#euler}

牛顿第二定律的转动形式，对固定点或对质心，是 $(\dd\mathbf{L}/\dd t)_{\mathrm{space}} = \boldsymbol{\tau}$。在空间系里，惯量张量随刚体的转动而变，使得 $\mathbf{L} = I\boldsymbol{\omega}$ 难以求导。在本体固结的轴里惯量张量是常量，所以我们对刚体自己的主轴用 [[#thm-rotating]]。

::: theorem 欧拉方程 {#thm-euler-eqs}
在刚体的主轴系中，以 $\omega_a$ 与 $\tau_a$ 表示角速度与所施加力矩沿各轴的分量，

$$
\begin{aligned}
I_1\dot\omega_1 - (I_2 - I_3)\,\omega_2\omega_3 &= \tau_1,\\
I_2\dot\omega_2 - (I_3 - I_1)\,\omega_3\omega_1 &= \tau_2,\\
I_3\dot\omega_3 - (I_1 - I_2)\,\omega_1\omega_2 &= \tau_3.
\end{aligned}
$$ {#eq-euler}
:::

::: proof
在体系里，$\mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3)$ 且各 $I_a$ 为常量，故 $(\dd\mathbf{L}/\dd t)_{\mathrm{body}} = (I_1\dot\omega_1, I_2\dot\omega_2, I_3\dot\omega_3)$。由 [[#eq-rotating]]，

$$
\boldsymbol{\tau} = \left(\deriv{\mathbf{L}}{t}\right)_{\mathrm{space}} = \left(\deriv{\mathbf{L}}{t}\right)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{L}.
$$

$\boldsymbol{\omega}\times\mathbf{L}$ 的第一个分量是 $\omega_2L_3 - \omega_3L_2 = (I_3 - I_2)\omega_2\omega_3$，即得第一个方程。其余由 $(1, 2, 3)$ 的循环置换得到。
:::

欧拉方程是 $\boldsymbol{\omega}$ 的体系分量的三个非线性一阶方程。它们本身并不说明刚体在空间中的取向；为此还要同时积分 $\dot{\mathbf{e}}_a = \boldsymbol{\omega}\times\mathbf{e}_a$，或使用欧拉角。但当力矩只依赖 $\boldsymbol{\omega}$——特别当它为零——这些方程就构成封闭系统。

::: example 绕倾斜轴旋转的杆 {#ex-unbalanced}
质量 $M = 2.00\,\mathrm{kg}$、长度 $\ell = 1.00\,\mathrm{m}$ 的均匀细杆，中点焊在一根转轴上，与轴成角 $\alpha = 30.0^\circ$；轴在固定轴承中以恒定的 $\omega = 10.0\,\mathrm{rad/s}$ 转动。求轴承必须提供的力矩。
::: solution
在中点取主轴：$\mathbf{e}_3$ 沿杆，细杆的 $I_3 = 0$；$\mathbf{e}_1$ 在杆与轴所张的平面内、垂直于杆，且 $I_1 = I_2 = M\ell^2/12$。角速度在空间中固定，$\boldsymbol{\omega} = \omega\hat{\mathbf{z}}$；由于杆绕它刚性转动，其体系分量是常量：$\omega_1 = \omega\sin\alpha$，$\omega_2 = 0$，$\omega_3 = \omega\cos\alpha$，符号取决于 $\mathbf{e}_1$ 的取向。一切 $\dot\omega_a = 0$，欧拉方程 [[#eq-euler]] 给出

$$
\tau_1 = 0, \qquad \tau_2 = -(I_3 - I_1)\,\omega_3\omega_1 = \frac{M\ell^2}{12}\,\omega^2\sin\alpha\cos\alpha, \qquad \tau_3 = 0.
$$

力矩沿 $\mathbf{e}_2$，同时垂直于杆与轴，并随杆一起转动。其大小为

$$
\tau = \frac{(2.00)(1.00)^2}{12}(10.0)^2\sin 30.0^\circ\cos 30.0^\circ = (16.67)(0.4330) = 7.22\,\mathrm{N\,m}.
$$

从物理上看，$\mathbf{L} = I_1\omega_1\mathbf{e}_1$ 不沿轴向；它以速率 $\omega$ 绕出一个圆锥面，需要力矩 $\boldsymbol{\omega}\times\mathbf{L}$ 来使它转向。轴承感到一个旋转的力偶，这就是汽车车轮不平衡时的抖动。给车轮做平衡，就是加上小配重使轴成为主轴，于是力矩消失。
:::
:::

## 自由对称陀螺 {#symmetric-top}

无力矩时，欧拉方程守恒动能与角动量的大小，这可以通过直接求导验证（[[#exr-invariants]]）：

$$
2T = I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2, \qquad L^2 = I_1^2\omega_1^2 + I_2^2\omega_2^2 + I_3^2\omega_3^2.
$$ {#eq-invariants}

在空间中，整个向量 $\mathbf{L}$ 当然是常量。对对称陀螺，$I_1 = I_2$，方程可用初等函数求解。

::: theorem 自由进动 {#thm-precession}
设对称陀螺 $I_1 = I_2$、对称轴为 $\mathbf{e}_3$，作自由运动。则 $\omega_3$ 是常量；在体系参考系中，$\boldsymbol{\omega}$ 垂直于 $\mathbf{e}_3$ 的分量绕 $\mathbf{e}_3$ 旋转，角速度为

$$
\Omega_b = \frac{I_3 - I_1}{I_1}\,\omega_3.
$$ {#eq-body-precession}

在空间参考系中，对称轴 $\mathbf{e}_3$ 以角速度 $\Omega_s = L/I_1$ 绕固定向量 $\mathbf{L}$ 进动，并且 $\mathbf{e}_3$、$\boldsymbol{\omega}$ 与 $\mathbf{L}$ 永远共面。
:::

::: proof
由 $\boldsymbol{\tau} = 0$ 且 $I_1 = I_2$，第三个欧拉方程是 $I_3\dot\omega_3 = 0$，故 $\omega_3$ 守恒。前两个方程变为

$$
\dot\omega_1 = -\Omega_b\,\omega_2, \qquad \dot\omega_2 = \Omega_b\,\omega_1,
$$

其中 $\Omega_b$ 如 [[#eq-body-precession]]。其解为 $\omega_1 + i\omega_2 = \omega_\perp e^{i(\Omega_bt + \delta)}$：$(\omega_1, \omega_2)$ 以速率 $\Omega_b$ 匀速旋转，长度 $\omega_\perp$ 保持不变。

至于空间系中的运动，写 $\mathbf{L} = I_1(\omega_1\mathbf{e}_1 + \omega_2\mathbf{e}_2) + I_3\omega_3\mathbf{e}_3 = I_1\boldsymbol{\omega} + (I_3 - I_1)\omega_3\mathbf{e}_3$。这说明 $\mathbf{L}$、$\boldsymbol{\omega}$ 与 $\mathbf{e}_3$ 共面，并给出

$$
\boldsymbol{\omega} = \frac{\mathbf{L}}{I_1} - \frac{I_3 - I_1}{I_1}\,\omega_3\,\mathbf{e}_3.
$$

对称轴固结于本体，故 $\dot{\mathbf{e}}_3 = \boldsymbol{\omega}\times\mathbf{e}_3 = (\mathbf{L}/I_1)\times\mathbf{e}_3$，因为 $\boldsymbol{\omega}$ 的第二项平行于 $\mathbf{e}_3$。由于 $\mathbf{L}$ 固定，这就是 $\mathbf{e}_3$ 绕 $\mathbf{L}$ 以角速度 $L/I_1$ 的匀速旋转。
:::

**长球形**陀螺，如橄榄球或铅笔，满足 $I_3 < I_1$，故 $\Omega_b$ 与 $\omega_3$ 反向。**扁球形**陀螺，如薄板或地球，满足 $I_3 > I_1$。

::: example 摇摆的薄板 {#ex-plate}
一块均匀薄圆盘被抛出，角速度几乎沿对称轴，带一点轻微的摇摆。证明：当摇摆角很小时，摇摆——即对称轴绕 $\mathbf{L}$ 的进动——比自转快一倍。
::: solution
对质量 $M$、半径 $R$ 的薄圆盘，$I_3 = \frac12 MR^2$，由垂直轴定理 $I_1 = I_2 = \frac14 MR^2$。故 $I_3 = 2I_1$。

当 $\mathbf{e}_3$ 与 $\mathbf{L}$ 的夹角 $\vartheta$ 很小时，$L = I_3\omega_3/\cos\vartheta \approx I_3\omega_3$，于是空间系的进动速率为

$$
\Omega_s = \frac{L}{I_1} \approx \frac{I_3}{I_1}\,\omega_3 = 2\omega_3.
$$

圆盘绕自身对称轴的转动，对于跟着摇摆走的观察者而言，速率为 $\omega_3 - \Omega_s\cos\vartheta \approx -\omega_3$，大小为 $\omega_3$。因此摇摆比自转快一倍。在《别闹了，费曼先生！》（*Surely You're Joking, Mr. Feynman!*）中，理查德·费曼（Richard Feynman）讲到他在康奈尔大学食堂里算一块被抛出的薄板的这个比值，由此恢复了研究物理的乐趣；他把比值记反了，但方程给出的是每自转一圈摇摆两次。体系参考系中的速率 [[#eq-body-precession]] 为 $\Omega_b = (2 - 1)\omega_3 = \omega_3$，而三个速率由 $\Omega_s\cos\vartheta - \Omega_b = (I_3/I_1 - (I_3 - I_1)/I_1)\,\omega_3 = \omega_3$ 精确联系在一起，对任意摇摆角都成立。
:::
:::

::: example 地球的自由摇摆 {#ex-chandler}
地球是一个扁球形对称陀螺，$(C - A)/A = 0.00327$，其中 $C$ 为极方向转动惯量，$A$ 为赤道方向转动惯量。若转轴稍微偏离形体轴，按刚体理论，转轴绕形体轴转一圈需要多长时间？
::: solution
相关的速率是体系参考系中的进动 [[#eq-body-precession]]，因为站在地球上的观察者看到的是转轴相对形体轴（地理极）的移动：

$$
\Omega_b = \frac{C - A}{A}\,\omega_3, \qquad T_b = \frac{2\pi}{\Omega_b} = \frac{A}{C - A}\cdot\frac{2\pi}{\omega_3} = \frac{1}{0.00327}\ \text{恒星日} = 306\ \text{天}.
$$

这就是欧拉预言的约十个月。1891 年塞思·钱德勒（Seth Chandler）查阅旧的纬度观测记录时，发现了一种周期约 $433$ 天的摇摆。这个差异是真实的物理：地球并非刚体。它的地幔发生弹性形变，海洋与地核也对摇摆作出响应，从而使周期变长。**钱德勒摇摆**的幅度在极点处为几米，若没有持续不断的重新激发——很可能来自洋底压力与大气质量的涨落——它会在几十年内衰减掉。
:::
:::

## 转动的稳定性：网球拍定理 {#stability}

回到书的问题。把主轴标记为 $I_1 < I_2 < I_3$，三者互不相同。每条轴都允许定常转动：$\boldsymbol{\omega} = \omega\mathbf{e}_a$ 使 [[#eq-euler]] 中一切乘积项消失。问题是受到小的扰动之后会发生什么。

::: theorem 中间轴定理 {#thm-tennis}
对 $I_1 < I_2 < I_3$ 的自由刚体，绕最小或最大转动惯量轴的定常转动是线性稳定的：小扰动作振动。绕中间轴 $\mathbf{e}_2$ 的定常转动是不稳定的：小扰动按速率

$$
\lambda = \omega\sqrt{\frac{(I_2 - I_1)(I_3 - I_2)}{I_1I_3}}
$$ {#eq-tennis-rate}

指数增长。
:::

::: proof
考察绕 $\mathbf{e}_2$ 的转动，$\omega_2 \approx \omega$ 而 $\omega_1$、$\omega_3$ 很小。第二个欧拉方程给出 $I_2\dot\omega_2 = (I_3 - I_1)\omega_3\omega_1$，这是小量的二阶项，所以到一阶近似下 $\omega_2 = \omega$ 是常量。另外两个方程线性化后为

$$
I_1\dot\omega_1 = (I_2 - I_3)\,\omega\,\omega_3, \qquad I_3\dot\omega_3 = (I_1 - I_2)\,\omega\,\omega_1.
$$

对第一个求导并代入第二个：

$$
\ddot\omega_1 = \frac{(I_2 - I_3)(I_1 - I_2)}{I_1I_3}\,\omega^2\,\omega_1 = \lambda^2\omega_1,
$$

其中 $\lambda^2 = \omega^2(I_2 - I_1)(I_3 - I_2)/(I_1I_3) > 0$。解是 $e^{\lambda t}$ 与 $e^{-\lambda t}$ 的组合，而一般的扰动包含增长的那一支。

对绕 $\mathbf{e}_1$ 的转动，同样的计算（指标置换）给出 $\ddot\omega_2 = \omega^2\frac{(I_3 - I_1)(I_1 - I_2)}{I_2I_3}\omega_2$。系数为负，因为 $I_1 - I_2 < 0 < I_3 - I_1$，所以 $\omega_2$ 以角频率 $\omega\sqrt{(I_3 - I_1)(I_2 - I_1)/(I_2I_3)}$ 振动。对绕 $\mathbf{e}_3$ 的转动，系数为 $\omega^2(I_1 - I_3)(I_3 - I_2)/(I_1I_2) < 0$，同样稳定。
:::

线性稳定只说明小扰动在一阶近似下保持很小。对转动惯量最极端的两条轴，守恒律给出了精确的确认，下面的直观框子作了解释。对中间轴，当扰动不再小的时候增长就停止，刚体翻一个面：$\omega_2$ 反号，接着又反回来，周期性地如此。

::: widget plot
f: (x-b)*(a-x)/(a*b)
x: 0, 4
y: -1.5, 0.5
sliders: a=1:0.5:2:0.05; b=3:2.2:4:0.05
caption: 绕转动惯量为 $x$ 的轴转动，另两个主转动惯量为 $a$ 与 $b$。曲线是 [[#eq-tennis-rate]] 给出的 $\lambda^2/\omega^2$：在它为正的地方，即 $a$ 与 $b$ 之间，转动不稳定，扰动按 $e^{\lambda t}$ 增长；在它为负的地方，小扰动以角频率 $\omega\sqrt{-(\text{函数值})}$ 振动。只有中间的转动惯量落进不稳定带。把 $a$ 与 $b$ 拖到一起，看不稳定带收窄：近于对称的刚体翻转得很慢。
:::

非线性运动很容易计算。下面的清单用经典四阶龙格-库塔方法（[见数学图谱](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)）积分欧拉方程，取 $I = (1, 2, 3)$ 的刚体，从每条主轴附近出发，$\abs{\boldsymbol{\omega}} \approx 1$，并报告大分量变号的时刻。

```python
import math
I1, I2, I3 = 1.0, 2.0, 3.0

def f(w):
    w1, w2, w3 = w
    return [(I2 - I3) * w2 * w3 / I1,
            (I3 - I1) * w3 * w1 / I2,
            (I1 - I2) * w1 * w2 / I3]

def rk4(w, h):
    k1 = f(w)
    k2 = f([w[i] + h/2 * k1[i] for i in range(3)])
    k3 = f([w[i] + h/2 * k2[i] for i in range(3)])
    k4 = f([w[i] + h * k3[i] for i in range(3)])
    return [w[i] + h/6 * (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]

def invariants(w):
    E = 0.5 * (I1*w[0]**2 + I2*w[1]**2 + I3*w[2]**2)
    L2 = (I1*w[0])**2 + (I2*w[1])**2 + (I3*w[2])**2
    return E, L2

for start in ([0.01, 1.0, 0.01], [1.0, 0.01, 0.01], [0.01, 0.01, 1.0]):
    w, h, t = start[:], 0.001, 0.0
    E0, L0 = invariants(w)
    flips, sign = [], 1
    axis = start.index(max(start))
    big = 0.0
    for step in range(60000):        # 60 个时间单位
        w = rk4(w, h); t += h
        big = max(big, max(abs(w[i]) for i in range(3) if i != axis))
        if w[axis] * sign < 0:
            sign = -sign; flips.append(round(t, 2))
    E, L2 = invariants(w)
    print("start", start, "reversals at t =", flips[:3], " max |other components| = %.3f" % big)
    print("   relative drift in E: %.1e, in L^2: %.1e" % (abs(E-E0)/E0, abs(L2-L0)/L0))
print("linear growth rate about axis 2:", math.sqrt((I2-I1)*(I3-I2)/(I1*I3)))
```

输出：

```
start [0.01, 1.0, 0.01] reversals at t = [10.92, 30.47, 50.02]  max |other components| = 1.000
   relative drift in E: 2.5e-14, in L^2: 2.2e-14
start [1.0, 0.01, 0.01] reversals at t = []  max |other components| = 0.020
   relative drift in E: 2.4e-15, in L^2: 2.7e-15
start [0.01, 0.01, 1.0] reversals at t = []  max |other components| = 0.014
   relative drift in E: 1.1e-14, in L^2: 1.1e-14
linear growth rate about axis 2: 0.5773502691896257
```

从中间轴附近出发，自转分量 $\omega_2$ 在 $t \approx 10.9$ 变号，此后每隔 $19.55$ 个时间单位变一次号：刚体周期性地翻面再翻回来。其他分量最初是 $0.01$，增长到一级大小。靠近另外两条轴时什么都不变号，扰动保持出发时的大小。两个不变量 [[#eq-invariants]] 守恒到舍入误差以内，这是积分准确的检验。第一次翻转之前的时间由增长率 $0.577$ 决定：大小为 $0.01$ 的扰动要增长到一级大小，约需 $\ln(100)/0.577 \approx 8$ 个时间单位。

::: intuition 泊安索的图像
在体系参考系中，$\mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3)$ 必须位于球面 $L_1^2 + L_2^2 + L_3^2 = L^2$ 上，又因为能量是 $2T = L_1^2/I_1 + L_2^2/I_2 + L_3^2/I_3$，还必须位于一个椭球面上。运动沿着球面与椭球面相交的曲线进行。在椭球最长轴与最短轴的端点附近，这些曲线是绕轴的小闭环：稳定的运动。经过中间轴端点的有两条大曲线，在端点处相交，它们是**分离线**；邻近的曲线被一路带到轴的另一端，这就是翻转。
:::

::: quiz
一个长方盒子关于中心的三个主转动惯量之比为 $1 : 4 : 5$。绕哪条轴转动是不稳定的？
- [ ] 转动惯量为 $1$ 的轴，因为它最容易转动。
- [x] 转动惯量为 $4$ 的轴。
- [ ] 转动惯量为 $5$ 的轴，因为给定角动量时它的动能最大。
- [ ] 都不是，因为无力矩时角动量守恒。
::: solution
由 [[#thm-tennis]]，绕中间转动惯量的转动不稳定。$\mathbf{L}$ 守恒并不能阻止翻转：刚体翻面时 $\mathbf{L}$ 在空间中保持固定，而在体系参考系中 $\mathbf{L}$ 从接近 $+\mathbf{e}_2$ 处移到接近 $-\mathbf{e}_2$ 处。给定 $L$ 时，最大的转动惯量对应*最小*的能量 $L^2/(2I)$；如果有耗散，刚体最终会绕那条轴转动。这正是 1958 年发射的探险者 1 号（Explorer 1）卫星在升空后不久便开始翻滚的原因：它是绕细长的、转动惯量最小的轴自转的。
:::
:::

::: remark 欧拉角与重陀螺
要追踪取向本身，需要在转动空间上取坐标。标准选法是三个**欧拉角** $(\phi, \theta, \psi)$：绕空间 $z$ 轴的进动、绕新 $x$ 轴的章动（倾角）、绕本体对称轴的自转。用它们表示，对对称陀螺有 $T = \frac12 I_1(\dot\theta^2 + \dot\phi^2\sin^2\theta) + \frac12 I_3(\dot\psi + \dot\phi\cos\theta)^2$。若重力作用在轴上距离 $h$ 处，$V = Mgh\cos\theta$，而角 $\phi$ 与 $\psi$ 是循环坐标。它们的守恒动量把重陀螺化为关于 $\theta$ 的一维问题，与 [[analytical-mechanics/central-forces]] 的有效势能完全类似。由此产生的章动与进动，可参见戈德斯坦（Goldstein）、普尔（Poole）与萨夫科（Safko）著作的第 5 章，以及朗道（Landau）与栗弗席兹（Lifshitz）著作的 §35。
:::

::: history 欧拉、泊安索与摇摆的地球
欧拉（Euler）在 18 世纪 50 年代为柏林科学院撰写的论文中导出了方程 [[#eq-euler]]，并在《刚体运动理论》（*Theoria motus corporum solidorum seu rigidorum*，1765）中给出了整个理论，包括主轴。他还预言地球转轴应绕形体轴游荡，周期约十个月。路易·泊安索（Louis Poinsot）在《物体转动的新理论》（*Théorie nouvelle de la rotation des corps*，1834）中给出了自由转动的几何描述。塞思·卡洛·钱德勒（Seth Carlo Chandler）1891 年在纬度记录中发现了地球的摇摆，周期接近 14 个月；西蒙·纽康（Simon Newcomb）很快用地球的弹性解释了周期的加长。中间轴的不稳定性在 19 世纪只是欧拉方程的一道习题；1985 年弗拉基米尔·贾尼别科夫拍摄了蝶形螺母在礼炮 7 号上翻转并不断翻面的影片之后，它才声名大噪。
:::

## 后续内容 {#leads}

[[analytical-mechanics/small-oscillations]] 用同一套数学——一个对称矩阵及其特征向量——处理另一个物理问题：那里的矩阵是小振动的动能与势能。[[analytical-mechanics/hamiltonian]] 将说明欧拉方程正是角动量分量的哈密顿方程，泊松括号为 $\{L_1, L_2\} = L_3$。刚性转子在 [[quantum-1/angular-momentum]] 中重现：对称陀螺分子的能量级为 $\hbar^2\ell(\ell + 1)/(2I_1) + \hbar^2 m^2(1/(2I_3) - 1/(2I_1))$，正是 [[#eq-invariants]] 的量子版本。

::: summary
- 刚体上各点的速度为 $\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}$，任何固连于本体的向量都满足 $(\dd\mathbf{A}/\dd t)_{\mathrm{space}} = (\dd\mathbf{A}/\dd t)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{A}$。
- 惯量张量 $I_{ij} = \sum m(r^2\delta_{ij} - x_ix_j)$ 给出 $\mathbf{L} = I\boldsymbol{\omega}$ 与 $T = \frac12\boldsymbol{\omega}\cdot I\boldsymbol{\omega}$；$\mathbf{L}$ 只沿主轴时才与 $\boldsymbol{\omega}$ 平行。
- 平行轴定理向质心张量加上 $M(d^2\delta_{ij} - d_id_j)$。
- $I$ 实对称，故有三条相互垂直的主轴与实的转动惯量主值；对称轴与对称面的法线都是主轴。
- 主轴系中的欧拉方程：$I_1\dot\omega_1 - (I_2 - I_3)\omega_2\omega_3 = \tau_1$ 及其循环置换。自由运动守恒 $T$ 与 $L^2$。
- 自由对称陀螺会进动：在体系中速率为 $(I_3 - I_1)\omega_3/I_1$，在空间中速率为 $L/I_1$。地球的刚体摇摆周期应为 $A/(C - A) \approx 306$ 天；弹性使它成为 433 天。
- 绕最大与最小转动惯量轴的转动稳定；绕中间轴不稳定，增长率 $\omega\sqrt{(I_2 - I_1)(I_3 - I_2)/(I_1I_3)}$，刚体周期性翻面。
:::

## 习题 {#exercises}

::: exercise 绕端点的杆 {level=1 check="4"}
质量 $3.00\,\mathrm{kg}$、长度 $2.00\,\mathrm{m}$ 的均匀细杆沿 $z$ 轴放置，中心在原点。写出它关于中心的惯量张量，然后用 [[#thm-parallel-axis]] 求关于过一端且与杆垂直的轴的转动惯量，以 $\mathrm{kg\,m^2}$ 计。
::: solution
沿 $z$ 的细杆上质量处有 $x = y = 0$，故 $I_{zz} = 0$，一切惯性积为零，且 $I_{xx} = I_{yy} = \int z^2\,\dd m = M\ell^2/12$。代入 $M = 3.00$、$\ell = 2.00$，得 $I^{\mathrm{cm}} = \mathrm{diag}(1, 1, 0)\,\mathrm{kg\,m^2}$。

移到端点，$\mathbf{d} = (0, 0, \ell/2) = (0, 0, 1.00)$。由 [[#eq-parallel]]，$I^O_{xx} = 1 + M(d^2 - 0) = 1 + 3.00 = 4.00\,\mathrm{kg\,m^2}$，即 $M\ell^2/3$。$zz$ 分量不变：$0 + M(d^2 - d^2) = 0$——沿轴移动不改变关于该轴的转动惯量。
:::
:::

::: exercise 矩形板 {level=1 check="0.025"}
质量 $1.20\,\mathrm{kg}$ 的均匀矩形薄板，边长为 $0.300\,\mathrm{m}$ 与 $0.400\,\mathrm{m}$。求它关于中心的主转动惯量，并给出其中以 $\mathrm{kg\,m^2}$ 计的最大值。
::: solution
把板放在 $xy$ 平面内，边 $a = 0.300\,\mathrm{m}$ 沿 $x$，边 $b = 0.400\,\mathrm{m}$ 沿 $y$。平面 $x = 0$、$y = 0$ 以及板自身所在平面都是反射对称面，所以坐标轴是主轴。积分得

$$
I_x = \int y^2\,\dd m = \frac{Mb^2}{12} = 0.0160, \qquad I_y = \int x^2\,\dd m = \frac{Ma^2}{12} = 0.0090,
$$

又因为处处 $z = 0$，$I_z = \int(x^2 + y^2)\,\dd m = I_x + I_y = 0.0250\,\mathrm{kg\,m^2}$，即垂直轴定理。绕法线的最大转动惯量为 $0.025\,\mathrm{kg\,m^2}$，中间值关于平行于长边的轴。板翻转时正是绕那条轴翻的。
:::
:::

::: exercise 摇摆与自转 {level=1 check="2"}
对 $I_3 = 2I_1$ 的自由对称陀螺，求极小摇摆角下空间进动速率与自转分量之比 $\Omega_s/\omega_3$。
::: solution
由 [[#thm-precession]]，$\Omega_s = L/I_1$，而小摇摆角下 $L \approx I_3\omega_3$。故 $\Omega_s/\omega_3 \approx I_3/I_1 = 2$。这就是 [[#ex-plate]] 的摇摆薄板。对球体，$I_3 = I_1$，比值为 $1$；由垂直轴不等式，对称陀螺总有 $I_3 \le 2I_1$，所以薄板是极端情形。
:::
:::

::: exercise 欧拉周期 {level=2 check="1/0.00327"}
由 [[#eq-body-precession]] 证明：近于刚体的扁行星在体系参考系中的摇摆周期为 $A/(C - A)$ 个自转周期，并对 $(C - A)/A = 0.00327$ 的地球以天为单位求值。火星的 $(C - A)/A \approx 0.0054$，自转周期 $1.026$ 天；它的欧拉周期是多少？
::: solution
$T_b = 2\pi/\Omega_b = (A/(C - A))(2\pi/\omega_3)$，而 $2\pi/\omega_3$ 是自转周期，对地球是一个恒星日。故 $T_b = 1/0.00327 = 306$ 恒星日，约 $305$ 个太阳日。对火星，$T_b \approx 1.026/0.0054 = 190$ 天。观测到的火星摇摆周期约 $207$ 天，再次因为火星也非完全刚体而更长。
:::
:::

::: exercise 轴承载矩 {level=2 check="6"}
质量 $1.00\,\mathrm{kg}$、长度 $0.600\,\mathrm{m}$ 的均匀细杆，中点固定在转轴上，与轴成 $45.0^\circ$，以 $20.0\,\mathrm{rad/s}$ 转动。求轴承必须提供的力矩大小，以 $\mathrm{N\,m}$ 计。
::: solution
由 [[#ex-unbalanced]]，$\tau = (M\ell^2/12)\,\omega^2\sin\alpha\cos\alpha$。这里 $M\ell^2/12 = (1.00)(0.360)/12 = 0.0300\,\mathrm{kg\,m^2}$，$\omega^2 = 400\,\mathrm{s^{-2}}$，$\sin 45^\circ\cos 45^\circ = 0.500$，故 $\tau = (0.0300)(400)(0.500) = 6.00\,\mathrm{N\,m}$。在 $45^\circ$ 处，给定 $\omega$ 时力矩最大；在 $0^\circ$ 与 $90^\circ$ 处为零，那时轴就是主轴。
:::
:::

::: exercise 球拍多久才翻转？ {level=2 check="ln(100)/sqrt(1/3)"}
主转动惯量之比为 $1 : 2 : 3$ 的刚体以 $\omega = 1.00\,\mathrm{rad/s}$ 绕中间轴自转，其他分量带有 $1\%$ 的扰动。用线性增长率估计扰动增长到与 $\omega$ 同量级所需的时间，并与数值输出中的第一次变号比较。
::: solution
由 [[#eq-tennis-rate]]，$\lambda = (1.00)\sqrt{(2 - 1)(3 - 2)/(1\cdot 3)} = \sqrt{1/3} = 0.577\,\mathrm{s^{-1}}$。扰动按 $e^{\lambda t}$ 增长，从 $0.01$ 长到 $1$ 需 $t = \ln(100)/\lambda = 4.605/0.577 = 7.98\,\mathrm{s}$。清单中第一次变号出现在 $t = 10.9\,\mathrm{s}$：估计给出了正确的量级，剩下的时间花在非线性阶段——那时翻转真正发生，线性公式不再适用。初始扰动减半，只增加 $\ln 2/\lambda = 1.2\,\mathrm{s}$，这就是为什么即使精心抛出的球拍也照样翻转。
:::
:::

::: exercise 由欧拉方程得守恒律 {level=3 #exr-invariants}
由无力矩的欧拉方程直接证明 $2T = \sum_a I_a\omega_a^2$ 与 $L^2 = \sum_a I_a^2\omega_a^2$ 为常量。然后用这两个守恒律证明：绕 $\mathbf{e}_1$（最小转动惯量轴）的转动在如下意义下是稳定的：若 $\omega_2$ 与 $\omega_3$ 初始很小，则它们永远保持很小。
::: hint
证明稳定性时，构造 $L^2 - 2TI_1$，并证明它是关于 $\omega_2^2$ 与 $\omega_3^2$ 的非负项之和。
:::
::: solution
把三个方程 $I_a\dot\omega_a = (I_b - I_c)\omega_b\omega_c$（$(a, b, c)$ 取循环）分别乘以 $\omega_a$ 再相加：

$$
\deriv{}{t}\left(\tfrac12\sum_a I_a\omega_a^2\right) = \omega_1\omega_2\omega_3\bigl[(I_2 - I_3) + (I_3 - I_1) + (I_1 - I_2)\bigr] = 0.
$$

改为乘以 $I_a\omega_a$ 再相加：

$$
\deriv{}{t}\left(\tfrac12\sum_a I_a^2\omega_a^2\right) = \omega_1\omega_2\omega_3\bigl[I_1(I_2 - I_3) + I_2(I_3 - I_1) + I_3(I_1 - I_2)\bigr] = 0,
$$

因为方括号展开为零。

对绕 $\mathbf{e}_1$ 的稳定性，考察守恒组合

$$
L^2 - 2TI_1 = I_2(I_2 - I_1)\,\omega_2^2 + I_3(I_3 - I_1)\,\omega_3^2.
$$

当 $I_1$ 是最小转动惯量时两个系数都为正。这个组合由初始值固定，所以若 $\omega_2$ 与 $\omega_3$ 出发时很小，为 $\eps$ 量级，则该组合永远是 $\eps^2$ 量级，而 $\omega_2^2$ 与 $\omega_3^2$ 中的每一个都被它除以一个正系数所控制。它们保持 $\eps$ 量级。对 $2TI_3 - L^2 = I_1(I_3 - I_1)\omega_1^2 + I_2(I_3 - I_2)\omega_2^2$ 用同样论证即得绕 $\mathbf{e}_3$ 的稳定性。对 $\mathbf{e}_2$，相应的组合 $L^2 - 2TI_2 = I_1(I_1 - I_2)\omega_1^2 + I_3(I_3 - I_2)\omega_3^2$ 的系数符号相反，所以它可以保持很小而 $\omega_1$ 与 $\omega_3$ 却都变大：得不到任何界，与不稳定性一致。
:::
:::

::: exercise 对称性造出对称陀螺 {level=3}
某刚体在绕 $O$ 处的轴 $\mathbf{e}_3$ 转 $2\pi/n$ 下保持不变，其中 $n \ge 3$ 为整数。证明 $\mathbf{e}_3$ 是 $O$ 处的主轴，且与它垂直的两个主转动惯量相等。由此推出：立方体、正四面体与均匀等边三角形薄片关于合适的点都是对称陀螺，且关于中心的立方体是球对称陀螺。
::: hint
若 $R$ 是旋转矩阵，质量分布的对称性意味着 $RIR\T = I$。考察 $R$ 作用在 $I$ 垂直于 $\mathbf{e}_3$ 的 $2\times 2$ 块上、以及作用在非对角列向量上的方式。
:::
::: solution
在刚体的旋转 $R$ 下，惯量张量变为 $RIR\T$，因为 $I_{ij}$ 由 $\delta_{ij}$ 与乘积 $x_ix_j$ 构成。若 $R$ 把刚体变为自己，则 $RIR\T = I$，故 $I$ 与 $R$ 交换。

取 $\mathbf{e}_3$ 沿对称轴的坐标轴。则 $R$ 固定 $\mathbf{e}_3$，并把垂直平面转 $\alpha = 2\pi/n$。由 $RI = IR$，把两边作用于 $\mathbf{e}_3$：$R(I\mathbf{e}_3) = I\mathbf{e}_3$，所以 $I\mathbf{e}_3$ 被 $R$ 固定。转角 $\alpha \neq 0, 2\pi$ 的旋转只固定 $\mathbf{e}_3$ 的倍数，故 $I\mathbf{e}_3 = I_3\mathbf{e}_3$：$\mathbf{e}_3$ 是主轴。

于是，由 $I$ 的对称性，$I$ 把垂直平面映到自身，在该平面上它是一个与旋转 $R_\alpha$ 交换的对称 $2\times 2$ 矩阵 $B$。写 $B = \begin{pmatrix} p & q\\ q & s\end{pmatrix}$。因为 $R_\alpha$ 与 $B$ 交换，它把 $B$ 的每个特征向量变成具有同一特征值的特征向量。若 $B$ 有两个不同特征值，它的特征向量是两条垂直直线，而 $R_\alpha$ 必须把每条直线映到自身，这要求 $\alpha$ 是 $\pi$ 的倍数。当 $n \ge 3$，$\alpha = 2\pi/n$ 不是，故 $B$ 有二重特征值，$B = I_1\mathbb{1}$，且 $I_1 = I_2$。

关于中心的立方体有沿体对角线的三重轴和过面心的四重轴，所以 $\mathbf{e}_3$ 取好几个不同方向时都有 $I_1 = I_2$，这迫使三个转动惯量全相等：球对称陀螺。关于一个顶点，只剩过该顶点的对角线还是三重轴，得到 [[#ex-cube]] 的对称陀螺。正四面体有过多面顶点的三重轴，关于中心是球对称陀螺；等边三角形薄片有过中心且垂直于板的三重轴，所以它是对称陀螺，且 $I_1 = I_2 = \frac12 I_3$。
:::
:::
