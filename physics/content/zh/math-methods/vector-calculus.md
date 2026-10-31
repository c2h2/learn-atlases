温度、压强、静电势，都是附在空间各点上的数。风速、力、磁场，则是附在同样这些点上的向量。两类对象都必须重新建立求导，因为场的增量取决于你朝哪个方向迈步。由此得出的三个算子——梯度、散度与旋度——就是流体力学与电磁学的语言。

本章在普通的三维空间里工作，并假定 [[mechanics/units-vectors]] 中的直角向量已经就绪。偏导数就是其余坐标固定不动时的普通导数。只要一个恒等式把某个偏导数挪到另一个偏导数之前，就默认二阶偏导数连续，从而混合偏导数相等。把这些局部算子变成整体陈述的积分定理在 [[math-methods/integral-theorems]]。

## 标量场与向量场 {#fields}

场是位置的函数。取值可以是一个数，也可以是向量，而且它也可以依赖时间。下面大部分微积分里时间是冻结的，场就只是一个点的函数。

::: definition 标量场与向量场 {#def-field}
区域 $U \subset \R^3$ 上的**标量场**是一个函数 $f \colon U \to \R$。$U$ 上的**向量场**是一个函数 $\mathbf{F} \colon U \to \R^3$。在直角坐标系中，

$$
\mathbf{F}(x, y, z) = F_x(x, y, z)\,\mathbf{i} + F_y(x, y, z)\,\mathbf{j} + F_z(x, y, z)\,\mathbf{k},
$$

$F_x$、$F_y$、$F_z$ 称为**分量场**。我们写 $\mathbf{F} = (F_x, F_y, F_z)$。
:::

山坡的高度是水平面上的标量场。河流的速度是向量场。电荷分布的电场是向量场，地球附近的引力加速度也是——在取 $z$ 轴向上的坐标系中它几乎是常向量 $(0, 0, -g)$，其中 $g = 9.80\,\mathrm{m/s^2}$。常向量场是合法的场：我们即将定义的导数恰好全都为零。

在求任何导数之前，先记下两条关于记号的警告。符号 $\mathbf{r} = (x, y, z)$ 是位置向量，$r = \abs{\mathbf{r}} = \sqrt{x^2 + y^2 + z^2}$ 是它的长度。径向单位向量是 $\mathbf{e}_r = \mathbf{r}/r$（$r \neq 0$）。分量函数是标量。向量是各分量乘以相应单位向量之和，而向量的导数等于导数构成的向量，这只发生在单位向量本身不随点改变的直角坐标系中。最后这句话就是本章后面球坐标里的公式不是直角公式换几个字母的原因。

场可以在它包围的某一点上没有定义。点电荷的势表现为 $1/r$，在原点没有定义，在那里也无界。下面每一个导数公式说的都只是场可微的那些点。对那个势而言，原点不是这样的点。缺失的那一点怎么办，是散度定理的问题。

## 梯度 {#gradient}

标量场的变化率取决于迈步的方向。梯度把所有这些变化率装进一个向量。

::: definition 梯度与方向导数 {#def-gradient}
设 $f$ 是一个标量场，它的一阶偏导数在某点存在。$f$ 在该点的**梯度**是向量

$$
\nabla f = \pdv{f}{x}\,\mathbf{i} + \pdv{f}{y}\,\mathbf{j} + \pdv{f}{z}\,\mathbf{k} = \left(\pdv{f}{x},\, \pdv{f}{y},\, \pdv{f}{z}\right).
$$ {#eq-gradient}

若 $\mathbf{u}$ 是单位向量，则 $f$ 沿方向 $\mathbf{u}$ 的**方向导数**是

$$
D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}.
$$ {#eq-directional}
:::

这个公式其实是链式法则换了个写法。沿直线 $\mathbf{r}(t) = \mathbf{p} + t\mathbf{u}$，

$$
\deriv{}{t} f(\mathbf{r}(t)) = \pdv{f}{x} u_x + \pdv{f}{y} u_y + \pdv{f}{z} u_z = \nabla f \cdot \mathbf{u},
$$

在 $t = 0$ 处取值。沿任意可微曲线的同一条链式法则写作

$$
\deriv{}{t} f(\mathbf{r}(t)) = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t).
$$ {#eq-chain}

所以 $D_{\mathbf{u}} f$ 是 $f$ 随单位距离的变化率，不是随单位时间的变化率。若迈步是一个不是单位向量的向量 $\mathbf{v}$，单位距离的变化率就是 $\nabla f \cdot \mathbf{v}/\abs{\mathbf{v}}$。忘记除以长度，是方向导数算错的常见来源。

由 $\nabla f \cdot \mathbf{u} = \abs{\nabla f}\cos\theta$，当 $\mathbf{u}$ 沿 $\nabla f$ 方向时方向导数最大，最大值就是 $\abs{\nabla f}$。在相反方向它最小，等于 $-\abs{\nabla f}$。当 $\mathbf{u}$ 与 $\nabla f$ 垂直时它为零。

::: theorem 梯度与等值面 {#thm-level}
设 $f$ 在点 $\mathbf{p}$ 附近有一阶连续偏导数，且 $\nabla f(\mathbf{p}) \neq \mathbf{0}$。则 $\nabla f(\mathbf{p})$ 垂直于位于等值集 $f = f(\mathbf{p})$ 内且过 $\mathbf{p}$ 的每一条曲线。$\nabla f(\mathbf{p})$ 的方向就是 $f$ 增加最快的方向，该方向的斜率是 $\abs{\nabla f(\mathbf{p})}$。
:::

::: proof
设 $\mathbf{r}(t)$ 是一条可微曲线，$\mathbf{r}(0) = \mathbf{p}$，且对 $0$ 附近的一切 $t$ 有 $f(\mathbf{r}(t)) = f(\mathbf{p})$。由 [[#eq-chain]] 对常数求导得 $\nabla f(\mathbf{p}) \cdot \mathbf{r}'(0) = 0$。等值集的每个切向量因此都垂直于 $\nabla f(\mathbf{p})$。在梯度不为零处，这些切向量铺满一个平面，即等值面的切平面，而 $\nabla f(\mathbf{p})$ 是该平面的一个法向量。

至于最陡增加：设 $\mathbf{u}$ 是单位向量，$\theta$ 是 $\mathbf{u}$ 与 $\nabla f$ 的夹角。由 [[#eq-directional]]，$D_{\mathbf{u}} f = \abs{\nabla f}\cos\theta$。余弦至多为 $1$，且只有当 $\mathbf{u}$ 是沿 $\nabla f$ 方向的单位向量时它才等于 $1$。此时取得的值就是 $\abs{\nabla f}$。
:::

假设 $\nabla f \neq \mathbf{0}$ 是要紧的。在极大值、极小值或鞍点处梯度消失，过该点的等值集未必看起来像一张光滑曲面。山顶是高度函数的等值点，那里的切平面是水平的，因为梯度是零向量，而零向量不是有用的法向。证明并没有声称在这样的点存在法向。

::: intuition
在地图上，高度的等值线就是等高线。梯度垂直于你脚下那条等高线，指向坡上。它的长度就是山坡在那个上坡方向的斜率：升高除以水平距离。沿等高线走时方向导数为零，你不升也不降。水沿相反方向流动，即沿高度梯度的反方向。
:::

::: example 温度及其最陡上升 {#ex-temperature}
温度场（以度和米计）为 $f(x, y, z) = 2xy + z^2$。求在 $P = (1, 3, -1)$ 处的梯度、该处沿 $\mathbf{v} = (2, -1, 2)$ 方向的方向导数，以及最陡上升的速率。
::: solution
对每个坐标求导，其余固定：

$$
\nabla f = (2y,\, 2x,\, 2z).
$$

在 $P$ 处，

$$
\nabla f(P) = (2\cdot 3,\, 2\cdot 1,\, 2\cdot(-1)) = (6, 2, -2).
$$

向量 $\mathbf{v}$ 的长度是 $\abs{\mathbf{v}} = \sqrt{4 + 1 + 4} = 3$，所以其方向的单位向量是 $\mathbf{u} = (2/3,\, -1/3,\, 2/3)$。于是

$$
D_{\mathbf{u}} f = 6\cdot\frac{2}{3} + 2\cdot\left(-\frac{1}{3}\right) + (-2)\cdot\frac{2}{3} = 4 - \frac{2}{3} - \frac{4}{3} = 2.
$$

从 $P$ 沿 $\mathbf{v}$ 方向走，温度每米升高 $2$ 度。最陡上升是这个大小

$$
\abs{\nabla f(P)} = \sqrt{36 + 4 + 4} = \sqrt{44} = 2\sqrt{11},
$$

即约每米 $6.63$ 度，方向沿 $(6, 2, -2)$。方向导数 $2$ 更小，而且必须如此，因为 $\mathbf{u}$ 不平行于梯度。
:::
:::

::: quiz
标量场在梯度不为零的一点处，下面哪句话刻画得最好？
- [ ] 它切于等值面，其长度是场的值。
- [x] 它垂直于等值面，指向场值增大的方向。
- [ ] 它垂直于等值面，指向场值减小的方向。
- [ ] 它等于场的旋度。
::: solution
由 [[#thm-level]]，梯度是等值面的法向，不是切向。沿自身方向的方向导数等于正数 $\abs{\nabla f}$，所以场朝那个方向增加。相反方向是最陡下降方向。旋度是作用在向量场上的算子，与这里的比较无关。
:::
:::

## 散度 {#divergence}

向量场可以把某种东西——质量、电荷、热量——从这里搬到那里。散度度量的，是这种东西在某点处单位体积内出现的净速率。

::: definition 散度 {#def-divergence}
向量场 $\mathbf{F} = (F_x, F_y, F_z)$ 在分量的一阶偏导数存在之点处的**散度**是标量

$$
\divg \mathbf{F} = \pdv{F_x}{x} + \pdv{F_y}{y} + \pdv{F_z}{z}.
$$ {#eq-divergence}
:::

坐标公式就是计算用的公式。它的含义是通量。对边界取向为外的一个小区域 $\Delta V$，

$$
\divg \mathbf{F} = \lim_{\Delta V \to 0} \frac{1}{\Delta V} \oint_{\partial(\Delta V)} \mathbf{F}\cdot\dd\mathbf{A},
$$ {#eq-div-geom}

其中极限沿以受控方式缩到该点的区域来取，例如沿立方体或球来取。散度为正就是源：离开小区域的场比进入的多。散度为负就是汇。若在某区域内处处 $\divg \mathbf{F} = 0$，则在该区域内称其为**无散场**（管量场）。不可压缩流动用无散的速度场来建模，因为正的散度意味着体积在局部被创造出来。

::: proposition 小盒子的通量 {#prop-flux}
设 $\mathbf{F}$ 的分量具有一阶连续偏导数。则 [[#eq-div-geom]] 中以该点为中心的盒子取的极限存在，且等于 [[#eq-divergence]]。
:::

::: proof
取盒子 $[x, x+\Delta x] \times [y, y+\Delta y] \times [z, z+\Delta z]$，每条边长都是正的小量。在 $x+\Delta x$ 那个面上外法向是 $\mathbf{i}$，在 $x$ 那个面上外法向是 $-\mathbf{i}$。这一对面给通量的联合贡献是

$$
\int\!\!\int \big(F_x(x+\Delta x, y', z') - F_x(x, y', z')\big)\,\dd y'\,\dd z'.
$$

由中值定理，$F_x$ 的差等于 $\partial F_x/\partial x$ 在某个中间 $x$ 处的值乘以 $\Delta x$。除以体积 $\Delta x\,\Delta y\,\Delta z$ 并让边长趋于零，偏导数的连续性把中间点拉回 $(x, y, z)$，留下 $\partial F_x/\partial x$。垂直于 $\mathbf{j}$ 与 $\mathbf{k}$ 的两对面贡献 $\partial F_y/\partial y$ 与 $\partial F_z/\partial z$。总和就是 [[#eq-divergence]]。
:::

这个论证是局部的。它对一个大曲面的通量什么也没说。从局部极限过渡到有限区域是散度定理的工作，它需要自己的假设。

对标量与向量的乘积，算子像导数应有那样作用在两个因子上。

::: proposition 散度的乘积法则 {#prop-product}
若 $\phi$ 与 $\mathbf{F}$ 的分量具有一阶连续偏导数，则

$$
\divg(\phi\mathbf{F}) = \nabla\phi \cdot \mathbf{F} + \phi\,\divg\mathbf{F}.
$$ {#eq-product}
:::

::: proof
$\phi\mathbf{F}$ 的 $x$-分量是 $\phi F_x$，而

$$
\pdv{}{x}(\phi F_x) = \pdv{\phi}{x} F_x + \phi\pdv{F_x}{x}.
$$

把三个分量相加。含 $\phi$ 被求导的那些项装配成点积 $\nabla\phi \cdot \mathbf{F}$。含 $\mathbf{F}$ 的分量被求导的那些项装配成 $\phi\,\divg\mathbf{F}$。
:::

还有一条配套法则 $\curl(\phi\mathbf{F}) = \nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}$。证明是同样的展开，一个分量一个分量地做，留作习题，好让这个模式被核对而不是被记住。

## 旋度 {#curl}

散度问场铺开多少。旋度问场环流多少。

::: definition 旋度 {#def-curl}
$\mathbf{F} = (F_x, F_y, F_z)$ 的**旋度**是向量场

$$
\begin{aligned}
\curl\mathbf{F} = \bigg(
&\pdv{F_z}{y} - \pdv{F_y}{z},\;
\pdv{F_x}{z} - \pdv{F_z}{x},\;
\pdv{F_y}{x} - \pdv{F_x}{y}
\bigg).
\end{aligned}
$$ {#eq-curl}
:::

对不含 $z$ 依赖的平面场 $\mathbf{F} = (F_x, F_y, 0)$，活下来的只有第三个分量：$(\curl\mathbf{F})_z = \partial F_y/\partial x - \partial F_x/\partial y$。前两个分量记录的是垂直于 $\mathbf{i}$ 与 $\mathbf{j}$ 的平面内的环流。那个第一行为 $\mathbf{i}, \mathbf{j}, \mathbf{k}$、第二行为 $\partial/\partial x, \partial/\partial y, \partial/\partial z$、第三行为 $F_x, F_y, F_z$ 的形式行列式，展开后正是这三个式子，包括中间分量从代数余子式继承来的那个负号。它是记忆工具，不是另一个定义。把它展开时丢掉那个负号，是把中间分量弄反的常见做法。

几何内容与散度的盒子论证相匹配。对一块面积为 $\Delta A$、单位法向为 $\mathbf{n}$、按右手定则定向的小平面片，

$$
(\curl\mathbf{F})\cdot\mathbf{n} = \lim_{\Delta A \to 0} \frac{1}{\Delta A} \oint_{\partial(\Delta A)} \mathbf{F}\cdot\dd\mathbf{r}.
$$ {#eq-curl-geom}

沿边缘的曲线积分就是**环量**。沿 $\mathbf{n}$ 方向旋度为正，意味着沿 $\mathbf{n}$ 看过去场按逆时针方向打转。

::: proposition 小矩形上的环量 {#prop-circulation}
设 $\mathbf{F}$ 的分量具有一阶连续偏导数。则 $\mathbf{F}$ 绕固定 $z$ 平面内一个小矩形边界的环量，除以矩形面积再取极限，等于 $(\curl\mathbf{F})_z$。边界按从 $z$ 轴正向一侧看过去的逆时针方向读取。
:::

::: proof
把矩形放在固定 $z$ 处，四个角为 $(x, y)$、$(x+\Delta x, y)$、$(x+\Delta x, y+\Delta y)$ 与 $(x, y+\Delta y)$。沿底边，$\dd\mathbf{r} = \mathbf{i}\,\dd x$，$F_x$ 的积分是 $F_x$ 在底边某个中间点处的值乘以 $\Delta x$。沿顶边，逆时针方向从右往左走，所以那一项贡献是负的 $F_x$ 在顶边某个中间点处的值乘以 $\Delta x$。这两个 $F_x$ 值的差除以 $\Delta y$ 趋于 $-\partial F_x/\partial y$。沿两条竖直边，同样的推理产生 $\partial F_y/\partial x$。把整个环量除以面积 $\Delta x\,\Delta y$ 并取极限，留下

$$
\pdv{F_y}{x} - \pdv{F_x}{y},
$$

即 [[#eq-curl]] 中的第三个分量。右手定则给出的法向是 $+\mathbf{k}$。
:::

在另外两个坐标平面里做同样的计算就得到另外两个分量。若在某区域内处处 $\curl\mathbf{F} = \mathbf{0}$，则在该区域内称其为**无旋的**。对流体速度来说这个名字名副其实：一个桨轮——它的转动度量的正是沿边缘的环流——在旋度消失的地方不会转。

::: example 刚体转动 {#ex-rotation}
设 $\mathbf{F} = (-y,\, x,\, 0)$。计算散度与旋度。证明 $\mathbf{F}$ 是角速度向量 $\boldsymbol{\omega} = \mathbf{k}$ 的刚体转动的速度场，并证明一般的常角速度满足 $\curl(\boldsymbol{\omega}\times\mathbf{r}) = 2\boldsymbol{\omega}$。
::: solution
分量是 $F_x = -y$、$F_y = x$、$F_z = 0$。它们没有哪一个依赖散度中对它求导的那个变量，所以

$$
\divg\mathbf{F} = \pdv{(-y)}{x} + \pdv{x}{y} + \pdv{0}{z} = 0.
$$

旋度只剩一对导数存活：

$$
\begin{aligned}
(\curl\mathbf{F})_x &= \pdv{0}{y} - \pdv{x}{z} = 0,\\
(\curl\mathbf{F})_y &= \pdv{(-y)}{z} - \pdv{0}{x} = 0,\\
(\curl\mathbf{F})_z &= \pdv{x}{x} - \pdv{(-y)}{y} = 1 - (-1) = 2.
\end{aligned}
$$

于是 $\curl\mathbf{F} = (0, 0, 2)$。

角速度为 $\boldsymbol{\omega}$ 的刚体转动，其速度是 $\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}$。取 $\boldsymbol{\omega} = \omega\mathbf{k}$、$\mathbf{r} = (x, y, z)$，

$$
\boldsymbol{\omega}\times\mathbf{r} = \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
0 & 0 & \omega \\
x & y & z
\end{vmatrix}
= (-\omega y,\, \omega x,\, 0).
$$

$\omega = 1$ 的情形恰好就是 $\mathbf{F}$。在离轴垂直距离 $\rho = \sqrt{x^2 + y^2}$ 处的速率为 $\omega\rho$，正是以角速度 $\omega$ 转动的物体的速率。散度为零：刚体转动不创造体积。

对常向量 $\boldsymbol{\omega} = (\omega_x, \omega_y, \omega_z)$，叉积为

$$
\boldsymbol{\omega}\times\mathbf{r} = (\omega_y z - \omega_z y,\; \omega_z x - \omega_x z,\; \omega_x y - \omega_y x).
$$

求导。旋度的 $x$-分量是

$$
\pdv{}{y}(\omega_x y - \omega_y x) - \pdv{}{z}(\omega_z x - \omega_x z) = \omega_x - (-\omega_x) = 2\omega_x,
$$

而 $y$-分量与 $z$-分量同理各贡献因子 $2$。因此 $\curl(\boldsymbol{\omega}\times\mathbf{r}) = 2\boldsymbol{\omega}$。对本例的场，$\boldsymbol{\omega} = \mathbf{k}$，旋度为 $2\mathbf{k}$，与直接计算一致。旋度是常数，不会因为离轴更远就更大：每个小桨轮，无论放在哪里，都以同样的速率转。
:::
:::

这个场的平面图像是一个斜率场。向量 $(-y, x)$ 在 $y \neq 0$ 处的斜率是 $\dd y/\dd x = x/(-y) = -x/y$。

::: widget slopefield
f: -x/y
x: -3, 3
y: -3, 3
caption: 箭头画的是 y' = -x/y 的斜率场，即平面场 (-y, x) 的方向。点击横轴以外的一个点：解是一段圆弧，匀速转动的轨道；因为画的是 y 作为 x 的函数，求解器会在切线变成竖直处停下。在轴本身上，公式除以 y，箭头画成竖直。(-y, x, 0) 的旋度是常向量 (0, 0, 2)，处处相同。
:::

把图中的公式改成 $-x/y$ 以外的东西，画出来就是另一族曲线。圆属于这个特定的右端项，也属于那个旋度为常数的刚体转动。

## 两个恒等式与拉普拉斯算子 {#identities}

标量的梯度没有旋度，向量的旋度没有散度。两条都是混合偏导数相等，而每逢引入势或矢势都会用到它们。

::: theorem 梯度的旋度 {#thm-curl-grad}
设 $f$ 是二阶偏导数存在且连续的标量场。则

$$
\curl(\nabla f) = \mathbf{0}.
$$ {#eq-curl-grad}
:::

::: proof
梯度是 $(\partial f/\partial x,\, \partial f/\partial y,\, \partial f/\partial z)$。由 [[#eq-curl]]，它的旋度的分量是

$$
\begin{aligned}
\pdv{}{y}\pdv{f}{z} - \pdv{}{z}\pdv{f}{y}, \qquad
\pdv{}{z}\pdv{f}{x} - \pdv{}{x}\pdv{f}{z}, \qquad
\pdv{}{x}\pdv{f}{y} - \pdv{}{y}\pdv{f}{x}.
\end{aligned}
$$

二阶偏导数的连续使每对相等：$\partial^2 f/\partial y\,\partial z = \partial^2 f/\partial z\,\partial y$，另外两对同理。每个分量都是零。
:::

::: theorem 旋度的散度 {#thm-div-curl}
设 $\mathbf{F}$ 的分量具有二阶连续偏导数。则

$$
\divg(\curl\mathbf{F}) = 0.
$$ {#eq-div-curl}
:::

::: proof
对 [[#eq-curl]] 这个向量写出 [[#eq-divergence]]：

$$
\begin{aligned}
\divg(\curl\mathbf{F})
&= \pdv{}{x}\!\left(\pdv{F_z}{y} - \pdv{F_y}{z}\right)
+ \pdv{}{y}\!\left(\pdv{F_x}{z} - \pdv{F_z}{x}\right)
+ \pdv{}{z}\!\left(\pdv{F_y}{x} - \pdv{F_x}{y}\right).
\end{aligned}
$$

出现六个二阶偏导数。连续性允许我们调换求导次序，它们三对两两相消：$\partial^2 F_z/\partial x\,\partial y$ 对 $\partial^2 F_z/\partial y\,\partial x$，$\partial^2 F_x/\partial y\,\partial z$ 对 $\partial^2 F_x/\partial z\,\partial y$，以及 $\partial^2 F_y/\partial z\,\partial x$ 对 $\partial^2 F_y/\partial x\,\partial z$。
:::

逆命题需要关于区域形状的假设，没有它就不成立。在球上，光滑的无旋场是一个梯度，光滑的无散场是一个旋度。在去心平面上，角向场 $(-y, x)/(x^2 + y^2)$ 在其有定义的处处无旋，但它在整个去心平面上不是梯度。这一区分在 [[math-methods/integral-theorems]] 中划出。

把散度作用在梯度上，得到的正是坐在拉普拉斯方程、泊松方程与波动方程内部的算子。

::: definition 拉普拉斯算子 {#def-laplacian}
标量场 $f$ 的**拉普拉斯算子**是其梯度的散度，

$$
\nabla^2 f = \divg(\nabla f) = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2},
$$

只要二阶偏导数存在。若在某区域上有 $\nabla^2 f = 0$，则称其在该区域内是**调和的**。
:::

电磁学中用到的向量场的拉普拉斯算子，是以各分量的拉普拉斯算子为直角分量的向量。这个简写只在直角分量下安全。在球分量下，向量的拉普拉斯算子会多出一些来自旋转的单位向量的项，简写就是错的。

::: example 一个调和多项式 {#ex-harmonic}
设 $f(x, y, z) = x^2 + y^2 - 2z^2$。计算 $\nabla f$ 与 $\nabla^2 f$。
::: solution
梯度为 $\nabla f = (2x,\, 2y,\, -4z)$。再求导：

$$
\frac{\partial^2 f}{\partial x^2} = 2, \qquad \frac{\partial^2 f}{\partial y^2} = 2, \qquad \frac{\partial^2 f}{\partial z^2} = -4.
$$

拉普拉斯算子在每一点都是 $2 + 2 - 4 = 0$，所以 $f$ 在全空间调和。等值面 $f = 0$ 是锥面 $x^2 + y^2 = 2z^2$。梯度 $(2x, 2y, -4z)$ 在它不是零向量的处处都是该锥的法向，而零向量只在原点出现。调和函数是无源区的标量势：若 $\mathbf{F} = -\nabla f$ 且 $\nabla^2 f = 0$，则 $\mathbf{F}$ 既无旋又无散。
:::
:::

## 正交曲线坐标 {#curvilinear}

当分量以 $x$、$y$、$z$ 给出时，直角的偏导数是合适的工具。点电荷、直导线、转动的圆柱体都不是盒子的形状，同样的算子用球坐标或柱坐标写出来更短。代价是坐标单位向量随点而变，所以那些公式不是直角公式换几个字母。

**正交曲线坐标**系 $(u, v, w)$ 用三个数标记每个点，三个坐标方向两两垂直。一个小位移拆成三个互相垂直的部分，

$$
\dd\mathbf{r} = h_u\,\dd u\,\mathbf{e}_u + h_v\,\dd v\,\mathbf{e}_v + h_w\,\dd w\,\mathbf{e}_w.
$$

正的函数 $h_u$、$h_v$、$h_w$ 称为**标度因子**。它们把坐标的改变换算成长度。直角坐标中每个标度因子都是 $1$。梯度由 $\dd f = \nabla f \cdot \dd\mathbf{r}$ 直接读出：每个单位向量的系数是对应偏导数除以标度因子，

$$
\nabla f = \frac{1}{h_u}\pdv{f}{u}\,\mathbf{e}_u + \frac{1}{h_v}\pdv{f}{v}\,\mathbf{e}_v + \frac{1}{h_w}\pdv{f}{w}\,\mathbf{e}_w.
$$ {#eq-grad-orth}

散度是把 [[#eq-div-geom]] 的通量除体积的极限用于一个边长为 $h_u\,\dd u$、$h_v\,\dd v$、$h_w\,\dd w$ 的小坐标盒子。那个盒子的体积是 $h_u h_v h_w\,\dd u\,\dd v\,\dd w$，而通过一对面的通量会带下来一个分量的导数乘以两个横向标度因子。结果是

$$
\divg\mathbf{F} = \frac{1}{h_u h_v h_w}\left[
\pdv{}{u}(F_u h_v h_w) + \pdv{}{v}(F_v h_w h_u) + \pdv{}{w}(F_w h_u h_v)
\right].
$$ {#eq-div-orth}

拉普拉斯算子就是这个公式作用在 $\mathbf{F} = \nabla f$ 上。旋度也有类似的标度因子表达式；柱坐标与球坐标的情形写在下面，应当照用，不要算到一半再现场重推。

### 柱坐标

柱坐标 $(\rho, \varphi, z)$ 用到 $z$ 轴的垂直距离、方位角和原来的高度：

$$
x = \rho\cos\varphi, \qquad y = \rho\sin\varphi, \qquad z = z,
$$

其中 $\rho \ge 0$，$\varphi$ 从 $x$ 轴正向逆时针度量。对位置向量按每个坐标求导就得到标度因子。$\mathbf{r}$ 对 $\rho$ 的导数是单位向量 $\mathbf{e}_\rho = (\cos\varphi, \sin\varphi, 0)$，所以 $h_\rho = 1$。对 $\varphi$ 的导数是 $\rho(-\sin\varphi, \cos\varphi, 0)$，一个长度为 $\rho$ 的向量，所以 $h_\varphi = \rho$，且 $\mathbf{e}_\varphi = (-\sin\varphi, \cos\varphi, 0)$。对 $z$ 的导数是 $\mathbf{k}$，所以 $h_z = 1$。

于是 [[#eq-grad-orth]] 与 [[#eq-div-orth]] 化为

$$
\nabla f = \pdv{f}{\rho}\,\mathbf{e}_\rho + \frac{1}{\rho}\pdv{f}{\varphi}\,\mathbf{e}_\varphi + \pdv{f}{z}\,\mathbf{e}_z,
$$ {#eq-grad-cyl}

$$
\divg\mathbf{F} = \frac{1}{\rho}\pdv{}{\rho}(\rho F_\rho) + \frac{1}{\rho}\pdv{F_\varphi}{\varphi} + \pdv{F_z}{z}.
$$ {#eq-div-cyl}

旋度是

$$
\begin{aligned}
\curl\mathbf{F}
&= \left(\frac{1}{\rho}\pdv{F_z}{\varphi} - \pdv{F_\varphi}{z}\right)\mathbf{e}_\rho
+ \left(\pdv{F_\rho}{z} - \pdv{F_z}{\rho}\right)\mathbf{e}_\varphi \\
&\quad + \frac{1}{\rho}\left(\pdv{}{\rho}(\rho F_\varphi) - \pdv{F_\rho}{\varphi}\right)\mathbf{e}_z.
\end{aligned}
$$ {#eq-curl-cyl}

标量的拉普拉斯算子是

$$
\nabla^2 f = \frac{1}{\rho}\pdv{}{\rho}\!\left(\rho\pdv{f}{\rho}\right) + \frac{1}{\rho^2}\frac{\partial^2 f}{\partial \varphi^2} + \frac{\partial^2 f}{\partial z^2}.
$$ {#eq-lap-cyl}

这些表达式在轴 $\rho = 0$ 上全都出问题：那里坐标 $\varphi$ 没有定义，标度因子 $h_\varphi$ 消失。一个在直角坐标下光滑的场，在这些公式里的轴上可能显得奇异，实际却完全正则。检验办法是先用 $x$、$y$ 把它重写，再断定出了问题。

### 球坐标

球坐标 $(r, \theta, \varphi)$ 用到原点的距离、从 $z$ 轴正向度量的极角，以及与柱坐标相同的方位角：

$$
x = r\sin\theta\cos\varphi, \qquad y = r\sin\theta\sin\varphi, \qquad z = r\cos\theta,
$$

其中 $r \ge 0$，$0 \le \theta \le \pi$，$\varphi$ 绕 $z$ 轴逆时针。这是物理学的约定。数学教材常把 $\theta$ 与 $\varphi$ 的名字互换。标度因子按 $\mathbf{r}$ 的偏导数之长计算，为

$$
h_r = 1, \qquad h_\theta = r, \qquad h_\varphi = r\sin\theta.
$$

梯度与散度是

$$
\nabla f = \pdv{f}{r}\,\mathbf{e}_r + \frac{1}{r}\pdv{f}{\theta}\,\mathbf{e}_\theta + \frac{1}{r\sin\theta}\pdv{f}{\varphi}\,\mathbf{e}_\varphi,
$$ {#eq-grad-sph}

$$
\divg\mathbf{F} = \frac{1}{r^2}\pdv{}{r}(r^2 F_r) + \frac{1}{r\sin\theta}\pdv{}{\theta}(\sin\theta\, F_\theta) + \frac{1}{r\sin\theta}\pdv{F_\varphi}{\varphi}.
$$ {#eq-div-sph}

旋度是

$$
\begin{aligned}
(\curl\mathbf{F})_r &= \frac{1}{r\sin\theta}\left(\pdv{}{\theta}(F_\varphi\sin\theta) - \pdv{F_\theta}{\varphi}\right),\\
(\curl\mathbf{F})_\theta &= \frac{1}{r\sin\theta}\pdv{F_r}{\varphi} - \frac{1}{r}\pdv{}{r}(r F_\varphi),\\
(\curl\mathbf{F})_\varphi &= \frac{1}{r}\pdv{}{r}(r F_\theta) - \frac{1}{r}\pdv{F_r}{\theta}.
\end{aligned}
$$ {#eq-curl-sph}

拉普拉斯算子是

$$
\begin{aligned}
\nabla^2 f &= \frac{1}{r^2}\pdv{}{r}\!\left(r^2\pdv{f}{r}\right) + \frac{1}{r^2\sin\theta}\pdv{}{\theta}\!\left(\sin\theta\pdv{f}{\theta}\right) \\
&\quad + \frac{1}{r^2\sin^2\theta}\frac{\partial^2 f}{\partial \varphi^2}.
\end{aligned}
$$ {#eq-lap-sph}

坐标奇点位于 $r = 0$ 以及 $z$ 轴上 $\sin\theta = 0$ 处。与柱坐标一样，分量公式在那个集合上的奇异并不自动就是场的奇异。

只依赖 $r$ 的函数，角向导数全部消掉，拉普拉斯算子塌缩成一个常微分。这是球对称势使用的形式。

::: proposition 球坐标拉普拉斯算子的径向部分 {#prop-radial}
设 $f$ 只依赖球半径 $r$，并设 $f$ 在 $r > 0$ 二阶可导。则

$$
\nabla^2 f = \frac{1}{r^2}\deriv{}{r}\!\left(r^2\deriv{f}{r}\right).
$$ {#eq-lap-radial}

特别地，对 $r > 0$，

$$
\nabla^2(r^n) = n(n+1)\,r^{n-2}, \qquad \nabla^2\!\left(\frac{1}{r}\right) = 0.
$$
:::

::: proof
沿 $\mathbf{e}_r$ 走一段 $\dd r$，$f$ 改变 $f'(r)\,\dd r$。沿半径为 $r$ 的球面的切向迈步固定 $r$，不改变 $f$。所以 $\nabla f = f'(r)\,\mathbf{e}_r$，与 [[#eq-grad-sph]] 一致。

现在用通过薄球壳 $r \le s \le r + \Delta r$（$r > 0$）的通量来计算 $\mathbf{G} = f'(r)\,\mathbf{e}_r$ 的散度。在半径为 $s$ 的球面上，$\mathbf{G}$ 的外向通量是 $f'(s)$ 乘以面积 $4\pi s^2$。流出球壳的通量因此是

$$
4\pi(r+\Delta r)^2 f'(r+\Delta r) - 4\pi r^2 f'(r).
$$

球壳的体积是 $4\pi r^2\,\Delta r$ 加上一个 $(\Delta r)^2$ 量级的项。通量除以体积，令 $\Delta r \to 0$。由 [[#eq-div-geom]] 得

$$
\divg\mathbf{G} = \frac{1}{r^2}\deriv{}{r}\!\left(r^2 f'(r)\right),
$$

即 [[#eq-lap-radial]]。同一恒等式也是 [[#eq-lap-sph]] 的径向部分，去掉了角向导数。

对 $f = r^n$，有 $f' = n r^{n-1}$，$r^2 f' = n r^{n+1}$，其导数为 $n(n+1) r^n$。除以 $r^2$ 得 $n(n+1) r^{n-2}$。对 $f = r^{-1}$，有 $f' = -r^{-2}$，$r^2 f' = -1$，其导数为零。所以 $1/r$ 在挖去原点的 $\R^3$ 上调和。
:::

挖去原点是本质的。通量计算用的是不含原点的球壳，而 $1/r$ 在原点不可微。这个拉普拉斯算子在一个包含原点的区域上的积分不是零。那个计算就是下一章里散度定理的第一个应用，它给出的不是 $0$ 而是 $-4\pi$。

::: example 平方反比场 {#ex-inverse-square}
设 $\mathbf{F} = \mathbf{e}_r / r^2$（$r \neq 0$），点源的径向场。证明除原点外处处 $\divg\mathbf{F} = 0$、$\curl\mathbf{F} = \mathbf{0}$，并说明 $\mathbf{F}$ 与 $\nabla(1/r)$ 的关系。
::: solution
在球分量下，$F_r = r^{-2}$，$F_\theta = F_\varphi = 0$。散度 [[#eq-div-sph]] 化为

$$
\divg\mathbf{F} = \frac{1}{r^2}\deriv{}{r}\!\left(r^2 \cdot r^{-2}\right) = \frac{1}{r^2}\deriv{}{r}(1) = 0, \qquad r \neq 0.
$$

[[#eq-curl-sph]] 的每一项要么含角向分量——它为零——要么含 $F_r$ 的角向导数。$F_r$ 只依赖 $r$，那些导数为零，故对 $r \neq 0$ 有 $\curl\mathbf{F} = \mathbf{0}$。

[[#prop-radial]] 中的径向计算给出 $\nabla(1/r) = -r^{-2}\,\mathbf{e}_r$。因此

$$
\mathbf{F} = -\nabla\!\left(\frac{1}{r}\right), \qquad r \neq 0,
$$

这正是旋度不得不消失的原因：[[#thm-curl-grad]] 适用于任何不碰原点的区域。$\mathbf{F}$ 的散度在同一区域上是 $-\nabla^2(1/r) = 0$。这个例子没有说 $\mathbf{F}$ 通过绕原点闭曲面的通量是零。场在那张曲面的整个内部不是可微的，所以小盒子恒等式无法被一个要求场在整个体内光滑的定理加起来。

同样的相消可以在直角分量里看到，这是核对球坐标公式没有记错的有用检验。由 $r = \sqrt{x^2 + y^2 + z^2}$，

$$
\mathbf{F} = \left(\frac{x}{r^3},\, \frac{y}{r^3},\, \frac{z}{r^3}\right).
$$

第一个分量对 $x$ 求导得 $r^{-3} - 3x^2 r^{-5}$。三个分量合起来给出

$$
\divg\mathbf{F} = \frac{3}{r^3} - \frac{3(x^2 + y^2 + z^2)}{r^5} = \frac{3}{r^3} - \frac{3}{r^3} = 0
$$

对 $r \neq 0$。三个裸导数贡献的 $3/r^3$ 被三个对分母求导的项相消。在原点分量没有定义，这段代数不适用。
:::
:::

::: warning
柱坐标或球坐标下的散度与旋度，不是把 $(r, \theta, \varphi)$ 代进 $(x, y, z)$ 得到的直角公式。标度因子必须在场。特别是 $\partial F_r/\partial r + \partial F_\theta/\partial\theta + \partial F_\varphi/\partial\varphi$ 不是散度。请用 [[#eq-div-cyl]]、[[#eq-div-sph]]、[[#eq-curl-cyl]] 与 [[#eq-curl-sph]]。径向的平方反比场在除原点外的每一点旋度和散度都是零。在原点，散度是一个 $\delta$ 函数，确切意义由 [[math-methods/integral-theorems]] 中的散度定理给出：$1/r$ 的拉普拉斯算子在一个体积上的积分，原点在内部时是 $-4\pi$，在外部时是 $0$。
:::

::: history
梯度、散度与旋度的代数在十九世纪八十年代由吉布斯（Gibbs）与赫维赛德（Heaviside）各自独立地整理成型。吉布斯把他写的东西发给耶鲁的学生，即 1881 年与 1884 年私下印制流传的《向量分析》（*Elements of Vector Analysis*）。赫维赛德在电磁学论文以及后来的《电磁理论》（*Electromagnetic Theory*）中使用了同样的算子。他们两人都把哈密顿（Hamilton）四元数乘积的标量部分与向量部分拆成了现代的点积与叉积。梯度、散度、旋度这些名称是在那个时期定为通用叫法的。赫维赛德常常在后来写作旋度（curl）的地方写旋转（rotation）。
:::

## 后续内容 {#leads}

这里的算子都是局部的。每一个都是某个差商、通量或环量的极限，其中的区域缩成一个点。[[math-methods/integral-theorems]] 把这些极限提升到有限区域：散度定理把散度的积分等通过闭曲面的通量，斯托克斯定理把旋度的积分等绕边缘的环量。恒等式 $\curl(\nabla f) = \mathbf{0}$ 会变成保守场有势的陈述，外加一条本章还没有挣到的关于区域形状的假设。

在静电学里电场是势的负梯度 [[electrostatics/potential]]，它通过闭曲面的通量由内部电荷决定 [[electrostatics/gauss-law]]。[[#ex-inverse-square]] 的平方反比计算就是那条定律在真空里的那一半。稳恒电流的磁场被构造成旋度等于电流密度 [[magnetism/biot-savart]]，而法拉第定律把电场的环量等磁通量的变化率 [[magnetism/faraday]]。拉普拉斯算子稍后作为静电势的泊松方程回来，再后来作为 [[math-methods/green-functions]] 中被格林函数反演的算子回来。

要保持清醒的建模假设是 [[#ex-rotation]] 里那条。刚体转动的旋度等于 [[mechanics/rotation]] 中角速度向量的两倍，不是角速度本身。这个因子 2 在流体的涡量与局部转动之间的关系里活了下来。

::: summary
- 标量场给每个点配一个数，向量场给每个点配一个向量。直角单位向量是常向量；柱坐标与球坐标的单位向量不是。
- 梯度 $\nabla f$ 指向增加最快的方向，长度就是那个斜率，且垂直于 $f$ 的等值面。
- 沿单位向量 $\mathbf{u}$ 方向的方向导数是 $\nabla f \cdot \mathbf{u}$。若给定的方向向量不是单位向量，要除以 $\abs{\mathbf{v}}$。
- 散度是单位体积的通量。在直角分量下它是 $\partial F_x/\partial x$、$\partial F_y/\partial y$ 与 $\partial F_z/\partial z$ 之和。
- 旋度是单位面积的环量。它的直角分量是 $(\partial F_z/\partial y - \partial F_y/\partial z,\; \partial F_x/\partial z - \partial F_z/\partial x,\; \partial F_y/\partial x - \partial F_x/\partial y)$。
- 若二阶偏导数连续，则 $\curl(\nabla f) = \mathbf{0}$ 且 $\divg(\curl\mathbf{F}) = 0$。拉普拉斯算子是 $\nabla^2 f = \divg(\nabla f)$。
- 球坐标中径向函数有 $\nabla^2 f = (1/r^2)\,\mathrm{d}(r^2 f')/\mathrm{d}r$。因此 $1/r$ 在 $r \neq 0$ 调和，平方反比场 $\mathbf{e}_r/r^2$ 在原点以外散度与旋度都为零。
- 柱坐标与球坐标必须用标度因子公式。把 $(r, \theta, \varphi)$ 塞进直角公式得到的是错误的算子。
:::

## 习题 {#exercises}

::: exercise 梯度的大小 {#exr-grad-mag level=1 check="sqrt(17)"}
标量场 $f(x, y, z) = x^2 y$ 不依赖 $z$。求 $\nabla f$ 在点 $(1, 2, 0)$ 处的大小。
::: solution
偏导数是 $\partial f/\partial x = 2xy$、$\partial f/\partial y = x^2$、$\partial f/\partial z = 0$。在 $(1, 2, 0)$ 处，

$$
\nabla f = (2\cdot 1\cdot 2,\, 1^2,\, 0) = (4, 1, 0).
$$

大小为 $\sqrt{16 + 1 + 0} = \sqrt{17}$。$z$-分量为零并不给根号下添项，也不说明这个点有什么特别：$z$ 改变时 $f$ 不变，所以等值面是竖直的柱面。
:::
:::

::: exercise 一点处的散度 {#exr-div-point level=1 check="6"}
设 $\mathbf{F} = (xy,\, yz,\, zx)$。求 $\divg\mathbf{F}$ 在 $(1, 2, 3)$ 处的值。
::: solution
对匹配的两两配对求导：

$$
\divg\mathbf{F} = \pdv{(xy)}{x} + \pdv{(yz)}{y} + \pdv{(zx)}{z} = y + z + x.
$$

在 $(1, 2, 3)$ 处的值是 $1 + 2 + 3 = 6$。这里的散度不是常场。它等于坐标之和，所以原点是这个特定场的无源点，而点 $(1, 2, 3)$ 不是。
:::
:::

::: exercise 旋度分量之和 {#exr-curl-sum level=1 check="3"}
设 $\mathbf{F} = (z,\, x,\, y)$。求 $\curl\mathbf{F}$ 的三个直角分量之和。
::: solution
用 [[#eq-curl]]：

$$
\begin{aligned}
(\curl\mathbf{F})_x &= \pdv{y}{y} - \pdv{x}{z} = 1 - 0 = 1,\\
(\curl\mathbf{F})_y &= \pdv{z}{z} - \pdv{y}{x} = 1 - 0 = 1,\\
(\curl\mathbf{F})_z &= \pdv{x}{x} - \pdv{z}{y} = 1 - 0 = 1.
\end{aligned}
$$

旋度是常向量 $(1, 1, 1)$，分量之和为 $3$。$\mathbf{F}$ 的每个分量都是循环 $(x, y, z)$ 中的下一个坐标，旋度中的每次求导恰好取到其中一个因子。
:::
:::

::: exercise 球面上的方向导数 {#exr-directional level=2 check="8/3"}
设 $f(x, y, z) = x^2 + y^2 + z^2$。计算 $f$ 在 $(1, 2, 2)$ 处沿向量 $(2, -1, 2)$ 方向的方向导数。
::: solution
梯度为 $\nabla f = (2x, 2y, 2z)$，所以在给定点 $\nabla f = (2, 4, 4)$。方向向量的长度为 $\sqrt{4 + 1 + 4} = 3$，单位向量是 $(2/3,\, -1/3,\, 2/3)$。方向导数是

$$
2\cdot\frac{2}{3} + 4\cdot\left(-\frac{1}{3}\right) + 4\cdot\frac{2}{3} = \frac{4}{3} - \frac{4}{3} + \frac{8}{3} = \frac{8}{3}.
$$

若直接把 $(2, -1, 2)$ 本身拿去做点积、不除以 $3$，会得到 $8$，那是对一个跑得快三倍的参数求的导。过该点的等值面是半径 $3$ 的球面，因为 $1 + 4 + 4 = 9$，而 $\nabla f = 2\mathbf{r}$ 确实沿径向朝外。
:::
:::

::: exercise 柱向单位向量的散度 {#exr-erho level=2 check="1/2"}
柱坐标中单位向量场 $\mathbf{e}_\rho$ 的分量为 $F_\rho = 1$、$F_\varphi = 0$、$F_z = 0$。求它在柱半径 $\rho = 2$ 之点处的散度。
::: solution
柱坐标的散度 [[#eq-div-cyl]] 给出

$$
\divg\mathbf{e}_\rho = \frac{1}{\rho}\pdv{}{\rho}(\rho \cdot 1) + 0 + 0 = \frac{1}{\rho}.
$$

$\rho = 2$ 处的值是 $1/2$。这个场不是无散的。半径 $\rho$ 处的小坐标盒子，外侧面略大于内侧面，所以单位径向场在外侧面的外向通量大于在内侧面的内向通量。直角形式 $\mathbf{e}_\rho = (x/\rho,\, y/\rho,\, 0)$ 对 $\rho \neq 0$ 给出同样的散度 $1/\rho$，这是 [[#eq-div-cyl]] 中标度因子的一个检验。
:::
:::

::: exercise 柱坐标半径平方的拉普拉斯算子 {#exr-lap-rho level=2 check="4"}
柱坐标中设 $f = \rho^2$，不依赖 $\varphi$ 与 $z$。计算 $\nabla^2 f$。
::: solution
用 [[#eq-lap-cyl]]。角向与竖向导数为零，且 $\partial f/\partial\rho = 2\rho$，所以

$$
\nabla^2 f = \frac{1}{\rho}\pdv{}{\rho}(\rho \cdot 2\rho) = \frac{1}{\rho}\pdv{}{\rho}(2\rho^2) = \frac{1}{\rho}\cdot 4\rho = 4.
$$

直角坐标中 $\rho^2 = x^2 + y^2$，它的两个二阶导数是 $2$ 和 $2$，对 $z$ 的导数为零，拉普拉斯算子还是 $4$。值是常数，与 $\nabla^2(\ln\rho)$ 不同：后者在 $\rho > 0$ 为零，是调和函数 $1/r$ 的二维类比。
:::
:::

::: exercise 标量乘向量的旋度 {#exr-curl-product level=3}
::: hint
用乘积法则展开 $\curl(\phi\mathbf{F})$ 的一个直角分量，并与 $\nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}$ 的对应分量比较。另外两个分量是同样的计算，只需轮换指标。
:::
证明：若 $\phi$ 与 $\mathbf{F}$ 的分量具有一阶连续偏导数，则

$$
\curl(\phi\mathbf{F}) = \nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}.
$$
::: solution
$\curl(\phi\mathbf{F})$ 的 $x$-分量是

$$
\pdv{(\phi F_z)}{y} - \pdv{(\phi F_y)}{z}
= \pdv{\phi}{y} F_z + \phi\pdv{F_z}{y} - \pdv{\phi}{z} F_y - \phi\pdv{F_y}{z}.
$$

仍含 $\phi$ 的导数的那些项是 $(\nabla\phi \times \mathbf{F})_x = \partial\phi/\partial y\, F_z - \partial\phi/\partial z\, F_y$。含 $\phi$ 的项是 $\phi$ 乘以 $(\curl\mathbf{F})_x$。这就是所求恒等式的 $x$-分量。$y$-分量从 $\partial(\phi F_x)/\partial z - \partial(\phi F_z)/\partial x$ 出发，与 $(\nabla\phi \times \mathbf{F})_y + \phi(\curl\mathbf{F})_y$ 相符，$z$-分量同理相符。一阶偏导数连续就够了：与 [[#thm-curl-grad]] 不同，这个恒等式没有交换两次求导的次序。
:::
:::

::: exercise 三维中对数函数的拉普拉斯算子 {#exr-log level=3}
::: hint
用 [[#eq-lap-radial]]，不是二维公式。$r^2 \cdot (1/r)$ 的导数不是零。
:::
对 $r > 0$ 在球坐标中计算 $\nabla^2(\ln r)$，其中 $r$ 是到原点的距离。然后用同一个公式计算 $\nabla^2(r^n)$，记下剩下的 $r$ 的幂。
::: solution
对 $f = \ln r$，导数是 $f' = 1/r$，所以 $r^2 f' = r$。于是

$$
\nabla^2(\ln r) = \frac{1}{r^2}\deriv{}{r}(r) = \frac{1}{r^2}, \qquad r > 0.
$$

球半径的对数不调和。与柱半径的对照值得记住：[[#eq-lap-cyl]] 作用于 $\ln\rho$ 给出 $(1/\rho)\,\partial(1)/\partial\rho = 0$（$\rho > 0$），所以二维里对数是调和的，三维里不是。

对 $f = r^n$，[[#prop-radial]] 证明中的计算给出 $r^2 f' = n r^{n+1}$，于是

$$
\nabla^2(r^n) = \frac{1}{r^2}\cdot n(n+1) r^n = n(n+1)\, r^{n-2}, \qquad r > 0.
$$

幂次降低了 2，单项式的普通二阶导数也是如此。系数 $n(n+1)$ 在 $n = 0$ 与 $n = -1$ 消失：常数是调和的，$1/r$ 在原点以外也是。$n = 2$ 时公式返回常数 $6$，即 $x^2 + y^2 + z^2$ 的直角拉普拉斯算子。
:::
:::
