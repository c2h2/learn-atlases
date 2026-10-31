场的散度是单位体积的通量，旋度是单位面积的环量。这些说法来自 [[math-methods/vector-calculus]]，是区域缩成一个点时的极限。积分定理去掉了极限。它们把一个有限体积上散度的积分，等通过其边界的通量；把一个有限曲面上旋度的积分，等绕其边缘的环量。每一个写成散度的整体守恒定律，每一个写成旋度的感应定律，都是这些定理之一外加一个物理名字。

本章的场定义在 $\R^3$ 或平面的开子集上，并且在需要对它们求导并积分的地方连续可微。边界是定向的。对于体，定向是外法向。对于曲面，边缘的定向服从右手定则：拇指沿所选法向，四指就弯向边界的正向。翻转法向就翻转边缘。忘掉定向的定理，就是符号做错了的定理。

## 曲线积分 {#line}

向量场会沿一条路径做功，或者环流。曲线积分就是这种累积。

::: definition 曲线积分 {#def-line}
设 $\mathbf{F}$ 是向量场，$C$ 是由 $\mathbf{r}(t)$（$a \le t \le b$）给出的分段连续可微曲线。$\mathbf{F}$ 沿 $C$ 的**曲线积分**是

$$
\int_C \mathbf{F}\cdot\dd\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,\dd t,
$$ {#eq-line}

只要被积函数在 $C$ 上有定义。若干这样的段拼成的路径上的积分，就是各段积分之和。
:::

单调的重新参数化不改变数值：链式法则给 $\mathbf{r}'$ 乘上参数的导数，又给 $\dd t$ 除回同一个因子。反向走一遍 $C$ 把 $\mathbf{r}'$ 换成它的相反数，积分变号。回到出发点的闭曲线写作 $\oint_C$；它的曲线积分是 $\mathbf{F}$ 绕 $C$ 的**环量**。

标量积分 $\int_C f\,\dd s$，其中 $\dd s = \abs{\mathbf{r}'(t)}\,\dd t$，是另一个东西。曲线反向时它不变号，因为弧长不会。两者都叫"曲线积分"时很容易混淆。本章不加定语的向量场曲线积分，一律指 [[#eq-line]]。

若向量场是一个梯度，积分就塌缩到端点上。这就是沿曲线的微积分基本定理。

::: theorem 梯度定理 {#thm-gradient}
设 $V$ 在包含一条从 $A$ 到 $B$ 的分段连续可微曲线 $C$ 的开集上具有一阶连续偏导数。则

$$
\int_C \nabla V\cdot\dd\mathbf{r} = V(B) - V(A).
$$ {#eq-gradient-ftc}
:::

::: proof
在一段光滑部分上，$\mathbf{r}(a) = A$、$\mathbf{r}(b) = B$，由 [[math-methods/vector-calculus]] 的链式法则得

$$
\deriv{}{t} V(\mathbf{r}(t)) = \nabla V(\mathbf{r}(t))\cdot\mathbf{r}'(t).
$$

从 $a$ 积到 $b$。左端由普通的微积分基本定理是 $V(B) - V(A)$，右端就是曲线积分。分段路径上同一恒等式在每一段都成立，中间的端点相互抵消，剩下终点处的 $V$ 减起点处的 $V$。
:::

物理学对势用的符号与这个公式相反。若力或电场写作 $\mathbf{F} = -\nabla V$，则场沿 $C$ 对物体**做**的功是

$$
\int_C \mathbf{F}\cdot\dd\mathbf{r} = V(A) - V(B).
$$ {#eq-work-potential}

势下降时场做正功。这与 [[mechanics/work-energy]] 中势能的约定相同：保守力做的功等于势能增量的负值。它不是功能原理 $W_{\mathrm{net}} = \Delta K$，后者数的是合力做的功，等于动能的改变。把两个符号混起来，是让粒子在计算里爬上山坡的可靠办法。

::: example 两条路径，同一个值 {#ex-paths}
设 $\mathbf{F} = (2xy,\, x^2,\, 0)$。计算 $\int_C \mathbf{F}\cdot\dd\mathbf{r}$，从 $(0, 0, 0)$ 到 $(1, 1, 0)$：先沿直线，再沿先到 $(1, 0, 0)$、然后到 $(1, 1, 0)$ 的路径。
::: solution
沿直线，$\mathbf{r}(t) = (t, t, 0)$，$0 \le t \le 1$，所以 $\mathbf{r}'(t) = (1, 1, 0)$，$\mathbf{F}(\mathbf{r}(t)) = (2t^2,\, t^2,\, 0)$。被积函数是 $2t^2 + t^2 = 3t^2$，于是

$$
\int_0^1 3t^2\,\dd t = 1.
$$

第一段，$\mathbf{r}(t) = (t, 0, 0)$，$\mathbf{F} = (0,\, t^2,\, 0)$，$\mathbf{r}' = (1, 0, 0)$，被积函数是 $0$。第二段，$\mathbf{r}(s) = (1, s, 0)$，$\mathbf{F} = (2s,\, 1,\, 0)$，$\mathbf{r}' = (0, 1, 0)$，被积函数是 $1$。$1$ 从 $s = 0$ 到 $s = 1$ 的积分是 $1$。两条路径一致。

它们一致，是因为 $\mathbf{F}$ 是负的梯度。试取 $V = -x^2 y$。则

$$
-\nabla V = -(-2xy,\, -x^2,\, 0) = (2xy,\, x^2,\, 0) = \mathbf{F}.
$$

由 [[#eq-work-potential]] 得 $V(0, 0, 0) - V(1, 1, 0) = 0 - (-1) = 1$，一次性给出两个曲线积分。任何同端点的其他路径，包括平面 $z = 0$ 内的抛物线 $y = x^2$，都给同一个数。下面的旋度检验解释了为什么势是现成的。
:::
:::

## 保守场 {#conservative}

路径无关是场的性质，不是两条恰好选得好的曲线的巧合。

::: definition 保守场 {#def-conservative}
开集 $U$ 上的向量场 $\mathbf{F}$ 称为**保守场**，若对留在 $U$ 内的每条分段连续可微曲线 $C$，$\int_C \mathbf{F}\cdot\dd\mathbf{r}$ 都只依赖 $C$ 的端点。等价地，$\mathbf{F}$ 绕 $U$ 内每条闭曲线的环量为零。
:::

这两句话的等价，用的是 [[mechanics/work-energy]] 中对保守力用过的同一种拆分。把闭曲线拆成从 $A$ 到 $B$ 的去程与回程；回程是另一条从 $A$ 到 $B$ 的去程的相反数。路径无关使两次行程相等，于是环量为零。反过来，两条从 $A$ 到 $B$ 的行程加上一次反向，合成一条环量为零的闭曲线，所以两次行程相等。

::: definition 单连通区域 {#def-simply}
开集 $U$ 称为**单连通**的，若 $U$ 内每条闭曲线都是一张完全位于 $U$ 内的曲面的有向边界。
:::

球、盒子、整个 $\R^3$ 都是单连通的。挖去一个点的 $\R^3$ 也是：那里的闭曲线仍然张得出一张绕开缺失点的曲面。挖去原点的平面不是单连通的，挖去一整条直线的 $\R^3$ 也不是。绕缺失直线一圈的环，不是任何避开该直线的曲面的边界。这个定义恰恰是把斯托克斯定理拿来检验场时定理所需要的假设。它不同于"每条闭曲面在 $U$ 内张出一个体"——那是另一种拓扑要求，是散度定理使用的那一条。

::: theorem 路径无关与势 {#thm-potential}
设 $\mathbf{F}$ 在开集 $U$ 上连续可微。
若对 $U$ 上某个标量场 $V$ 有 $\mathbf{F} = -\nabla V$，则 $\mathbf{F}$ 保守，且 $\curl\mathbf{F} = \mathbf{0}$。
反过来，若 $\mathbf{F}$ 保守，在 $U$ 中取定基点 $\mathbf{r}_0$ 并令

$$
V(\mathbf{r}) = -\int_{\mathbf{r}_0}^{\mathbf{r}} \mathbf{F}\cdot\dd\mathbf{r},
$$ {#eq-potential-def}

积分沿 $U$ 内从 $\mathbf{r}_0$ 到 $\mathbf{r}$ 的任意路径。则在 $\mathbf{r}_0$ 所在的连通分支上 $\mathbf{F} = -\nabla V$。
:::

::: proof
若 $\mathbf{F} = -\nabla V$，[[#eq-work-potential]] 表明曲线积分等于 $V(A) - V(B)$，因此只依赖端点。梯度的旋度由 [[math-methods/vector-calculus#thm-curl-grad]] 为零，只要 $V$ 的二阶偏导数连续；而若 $\mathbf{F}$ 连续可微且 $\mathbf{F} = -\nabla V$，这一点是满足的。于是 $\curl\mathbf{F} = \mathbf{0}$。

现在设积分路径无关，于是 [[#eq-potential-def]] 与路线无关。为恢复偏导数，从 $\mathbf{p}$ 沿直线段迈步到 $\mathbf{p} + h\mathbf{i}$，$h$ 小到使线段留在 $U$ 内。以 $\mathbf{r}(t) = \mathbf{p} + th\mathbf{i}$（$0 \le t \le 1$）参数化。则

$$
\frac{V(\mathbf{p}+h\mathbf{i}) - V(\mathbf{p})}{h} = -\int_0^1 F_x(\mathbf{p} + th\mathbf{i})\,\dd t.
$$

$h \to 0$ 时，由连续性，被积函数在线段上一致地趋于 $F_x(\mathbf{p})$，右端趋于 $-F_x(\mathbf{p})$。$y$、$z$ 方向同样的论证给出 $\nabla V = -\mathbf{F}$。
:::

这个定理里没有的，是旋度那条陈述的逆。旋度为零本身不能使场保守。缺的假设是单连通，缺的工具是斯托克斯定理。两样都在下面补上，而习题里的角向场就是假设不成立的区域上的标准反例。在那个证明到位之前，能安全使用的方向是已经证过的方向：梯度没有旋度，负的梯度是保守场。

::: quiz
单连通区域上连续可微的场旋度为零。能推出哪个结论？
- [ ] 场通过每条闭曲面的通量为零。
- [ ] 场本身是零场。
- [x] 绕每条闭曲线的环量为零，且场是某个标量势的负梯度。
- [ ] 散度在原点等于 $-4\pi$。
::: solution
旋度为零，在单连通区域上，正是下面 [[#thm-stokes-potential]] 的假设：环量为零，且存在势使 $\mathbf{F} = -\nabla V$。通量为零是关于散度的陈述，不是关于旋度的。非零常场旋度为零，却不是零场。$-4\pi$ 这个数属于 $1/r$ 的拉普拉斯算子，不属于任意的无旋场。
:::
:::

这个测验引用了一个在斯托克斯定理之后才证明的定理。逻辑并不循环：被检验的陈述就是那个定理本身，解答指向的是证明，而不是凭空假定一个事实。读完 [[#thm-stokes-potential]] 之后再回看这个测验。

## 平面上的格林定理 {#green}

在平面里，环量的陈述就是格林定理。它是平直区域的斯托克斯定理，先证它，因为斯托克斯定理的证明把弯曲情形化归到它。

::: theorem 格林定理 {#thm-green}
设 $D$ 是平面内的有界区域，其边界 $\partial D$ 由一条或多条分段连续可微闭曲线组成，定向使得沿边界行走时 $D$ 在左方——单条外边界即逆时针方向。设 $P$ 与 $Q$ 在包含 $D$ 及其边界的开集上具有一阶连续偏导数。则

$$
\oint_{\partial D} P\,\dd x + Q\,\dd y = \iint_D \left(\pdv{Q}{x} - \pdv{P}{y}\right)\dd x\,\dd y.
$$ {#eq-green}
:::

::: proof
只需对 $D$ 同时是竖向简单与横向简单的情形证明这个恒等式，再把更复杂的区域切成这样的块。内部割线被走两次、方向相反，它们的曲线积分相消。边界的定向在切割下保持不变。

设 $a \le x \le b$、$g_1(x) \le y \le g_2(x)$。则

$$
\iint_D -\pdv{P}{y}\,\dd x\,\dd y = -\int_a^b \big(P(x, g_2(x)) - P(x, g_1(x))\big)\dd x.
$$

在边界上，$\int P\,\dd x$ 收到沿下曲线从 $a$ 到 $b$ 走的 $P(x, g_1(x))$，以及沿上曲线从 $b$ 到 $a$ 走的 $P(x, g_2(x))$。竖直边（如果有）满足 $\dd x = 0$。于是 $P\,\dd x$ 的边界积分恰好就是 $-\partial P/\partial y$ 的二重积分。

再设 $c \le y \le d$、$h_1(y) \le x \le h_2(y)$。则

$$
\iint_D \pdv{Q}{x}\,\dd x\,\dd y = \int_c^d \big(Q(h_2(y), y) - Q(h_1(y), y)\big)\dd y,
$$

这正是 $Q\,\dd y$ 的逆时针边界积分：右曲线向上走，左曲线向下走。两个恒等式相加得 [[#eq-green]]。
:::

用旋度语言，被积函数是 $\curl(P, Q, 0)$ 的 $z$-分量，二重积分是这一旋度沿法向 $\mathbf{k}$ 通过 $D$ 的通量。格林定理就是去掉了极限、允许面片变大的环量公式 [[math-methods/vector-calculus#eq-curl-geom]]。还有一个等价的第二形式，说的是通量而不是环量。若 $\mathbf{F} = (F_x, F_y)$，通过 $\partial D$ 的外向通量等于 $\iint_D \divg\mathbf{F}\,\dd x\,\dd y$。它是格林定理用于 $P = -F_y$、$Q = F_x$ 的结果，也就是平面上的散度定理。

::: example 单位圆盘上的格林定理 {#ex-green-disk}
设 $D$ 是单位圆盘 $x^2 + y^2 \le 1$，$P = -y$，$Q = x$。计算 [[#eq-green]] 的两端。
::: solution
被积函数是 $\partial Q/\partial x - \partial P/\partial y = 1 - (-1) = 2$。二重积分是单位圆盘面积的 $2$ 倍，于是

$$
\iint_D 2\,\dd x\,\dd y = 2\pi.
$$

在边界上，$\mathbf{r}(\theta) = (\cos\theta,\, \sin\theta)$，$0 \le \theta \le 2\pi$，逆时针行走。则 $\dd x = -\sin\theta\,\dd\theta$，$\dd y = \cos\theta\,\dd\theta$，且

$$
P\,\dd x + Q\,\dd y = (-\sin\theta)(-\sin\theta\,\dd\theta) + (\cos\theta)(\cos\theta\,\dd\theta) = \dd\theta.
$$

曲线积分是 $\int_0^{2\pi} \dd\theta = 2\pi$。两端一致。同一个场在三维里就是 [[math-methods/vector-calculus#ex-rotation]] 的刚体转动，其旋度为 $(0, 0, 2)$。这一旋度通过圆盘面的通量是面积的 $2$ 倍，还是 $2\pi$。格林定理不需要三维语言，但这些数正是斯托克斯定理的平面情形。
:::
:::

## 散度定理 {#divergence}

通量形式从平面推广到体。结果就是散度定理，也称高斯定理。

::: theorem 散度定理 {#thm-divergence}
设 $V$ 是有界体区域，其边界 $\partial V$ 是分段光滑闭曲面，取外单位法向定向。设 $\mathbf{F}$ 在包含 $V$ 及其边界的开集上具有一阶连续偏导数。则

$$
\int_V \divg\mathbf{F}\,\dd V = \oint_{\partial V} \mathbf{F}\cdot\dd\mathbf{A}.
$$ {#eq-div-thm}
:::

::: proof
先考虑一个沿 $z$ 方向是图的区域：在 $xy$ 平面的区域 $D$ 之上，$g_1(x, y) \le z \le g_2(x, y)$，$g_1$ 与 $g_2$ 连续可微，且竖直墙只出现在它们对 $z$-通量没有贡献的地方。这一步取 $\mathbf{F} = (0, 0, F_z)$。则

$$
\int_V \pdv{F_z}{z}\,\dd V = \iint_D \big(F_z(x, y, g_2) - F_z(x, y, g_1)\big)\dd x\,\dd y.
$$

在上面的曲面 $z = g_2$ 上，朝上的向量面积元是 $(-\partial g_2/\partial x,\, -\partial g_2/\partial y,\, 1)\,\dd x\,\dd y$，当 $g_2 \ge g_1$ 时它指外。它与 $(0, 0, F_z)$ 的点积是 $F_z(x, y, g_2)\,\dd x\,\dd y$。在下面的曲面上外法向朝下，向量面积元是 $(\partial g_1/\partial x,\, \partial g_1/\partial y,\, -1)\,\dd x\,\dd y$，点积贡献 $-F_z(x, y, g_1)\,\dd x\,\dd y$。这些通量相加就重现了体积分。竖直墙的外法向是水平的，所以 $(0, 0, F_z)$ 对它的贡献为零。

轮换坐标轴，同样的论证处理 $(F_x, 0, 0)$ 与 $(0, F_y, 0)$。把三个场相加。本课程遇到的那类一般区域可以切成有限多个图区域。通过公共割线的通量相互抵消，因为两块的外法向指向相反方向。
:::

这些假设是全部用到了。偏导数必须存在并连续到边界，所以场不能在内部一点发散然后还被塞进 [[#eq-div-thm]]。定向必须是外向。内向法向给出通量的相反数，等式就断了。

::: example 单位球 {#ex-sphere}
在单位球 $x^2 + y^2 + z^2 \le 1$ 上对 $\mathbf{F} = (x, y, z)$ 验证散度定理。
::: solution
散度是 $\partial x/\partial x + \partial y/\partial y + \partial z/\partial z = 3$，是常数。体积分是单位球体积的 $3$ 倍。球坐标中体积元是 $r^2\sin\theta\,\dd r\,\dd\theta\,\dd\varphi$，其中 $r$ 从 $0$ 到 $1$，$\theta$ 从 $0$ 到 $\pi$，$\varphi$ 从 $0$ 到 $2\pi$。三个积分分离：

$$
\int_0^1 r^2\,\dd r = \frac{1}{3}, \qquad \int_0^{\pi}\sin\theta\,\dd\theta = 2, \qquad \int_0^{2\pi}\dd\varphi = 2\pi.
$$

体积是 $(1/3)\cdot 2\cdot 2\pi = 4\pi/3$。因此

$$
\int_V \divg\mathbf{F}\,\dd V = 3\cdot\frac{4\pi}{3} = 4\pi.
$$

在边界上，$r = 1$，外单位法向是 $\mathbf{e}_r$。场就是位置向量，所以在这张曲面上 $\mathbf{F} = \mathbf{e}_r$，$\mathbf{F}\cdot\mathbf{n} = 1$。面积元是 $\sin\theta\,\dd\theta\,\dd\varphi$，通量是

$$
\int_0^{2\pi}\int_0^{\pi} 1\cdot\sin\theta\,\dd\theta\,\dd\varphi = 2\pi\cdot 2 = 4\pi.
$$

两端相等。两个计算都是从积分算出来的，而不是把面积 $4\pi$ 与体积 $4\pi/3$ 当作背下来的常数引用，尽管积分返回的正是这些值。

同样的算术对任何半径 $R$ 的球都成立。散度还是 $3$，体积是 $4\pi R^3/3$，体积分是 $4\pi R^3$。在球面上，$\mathbf{F}\cdot\mathbf{n} = R$，面积是 $4\pi R^2$，所以通量也是 $4\pi R^3$。单位球就是 $R = 1$ 的情形。相消里没有任何东西依赖数字 $1$ 的特殊性质。
:::
:::

## 点源 {#source}

[[math-methods/vector-calculus#ex-inverse-square]] 的平方反比场在其有定义的每一点散度为零，而通过绕原点的任一球面的通量非零。散度定理在包含原点的区域上用不了，因为场在那里不可微。使用该定理的办法是把原点挖掉。

::: theorem 倒数半径的拉普拉斯算子 {#thm-delta}
设 $V$ 是一个有界体区域，散度定理可以对光滑场在它上面使用，边界取外向定向。则

$$
\int_V \nabla^2\!\left(\frac{1}{r}\right)\dd V =
\begin{cases}
-4\pi & \text{若原点是 } V \text{ 的内点},\\
0 & \text{若原点在 } V \text{ 外}.
\end{cases}
$$ {#eq-delta-int}

在这个积分恒等式的意义下，

$$
\nabla^2\!\left(\frac{1}{r}\right) = -4\pi\,\delta^3(\mathbf{r}),
$$ {#eq-delta}

其中三维 $\delta$ 函数由 $\int \delta^3(\mathbf{r})\,\phi(\mathbf{r})\,\dd V = \phi(\mathbf{0})$ 对每个连续检验函数 $\phi$ 定义。
:::

::: proof
对 $r \neq 0$ 写 $\mathbf{G} = \nabla(1/r) = -\mathbf{e}_r/r^2$。在任何与原点保持正距离的区域上，$1/r$ 光滑，而 [[math-methods/vector-calculus#prop-radial]] 给出 $\nabla^2(1/r) = 0$。若原点在 $V$ 外，[[#eq-delta-int]] 中的积分就是零函数的积分。

若原点在内部，取 $\varepsilon > 0$ 小到使闭球 $B_\varepsilon$（半径 $\varepsilon$）位于 $V$ 内。在挖掉一块的区域 $V_\varepsilon = V \setminus B_\varepsilon$ 上，场 $\mathbf{G}$ 光滑且散度为零，所以 [[#thm-divergence]] 给出

$$
0 = \oint_{\partial V} \mathbf{G}\cdot\dd\mathbf{A} + \oint_{S_\varepsilon} \mathbf{G}\cdot\mathbf{n}_\varepsilon\,\dd A.
$$

法向 $\mathbf{n}_\varepsilon$ 是 $V_\varepsilon$ 的外向，所以它指向洞内：$\mathbf{n}_\varepsilon = -\mathbf{e}_r$。在 $S_\varepsilon$ 上，

$$
\mathbf{G}\cdot\mathbf{n}_\varepsilon = \left(-\frac{\mathbf{e}_r}{\varepsilon^2}\right)\cdot(-\mathbf{e}_r) = \frac{1}{\varepsilon^2},
$$

且 $\dd A = \varepsilon^2\,\dd\Omega$。小球面上的积分是 $\int \dd\Omega = 4\pi$，与 $\varepsilon$ 无关。因此 $\mathbf{G}$ 通过 $\partial V$ 的外向通量是 $-4\pi$。

$\nabla^2(1/r)$ 在 $V$ 上的积分无法通过代入逐点值来计算，因为逐点值在原点没有定义。它由散度定理对光滑场本应给出的那个恒等式来定义，即 $\mathbf{G}$ 通过 $\partial V$ 的通量。该通量是 $-4\pi$。这就是 [[#eq-delta-int]]。

$\delta$ 函数形式是同一个陈述对连续函数 $\phi$ 的检验。对向量场 $\phi\mathbf{G}$ 重复挖洞手续。先在 $V_\varepsilon$ 上用散度定理，再令 $\varepsilon \to 0$，会产生一个小球面贡献。$\phi\,\mathbf{G}\cdot\mathbf{n}_\varepsilon$ 那部分趋于 $\phi(\mathbf{0})$ 乘以 $4\pi$，因为 $\phi$ 连续且 $\mathbf{G}\cdot\mathbf{n}_\varepsilon\,\dd A = \dd\Omega$。$(1/r)$ 乘以 $\phi$ 的导数的那部分为 $\varepsilon$ 量级，在极限中消失。结果是 $\int_V \phi\,\nabla^2(1/r)\,\dd V = -4\pi\,\phi(\mathbf{0})$，即 [[#eq-delta]]。
:::

由于 $\mathbf{e}_r/r^2 = -\nabla(1/r)$，平方反比场本身通过 $\partial V$ 的通量，当原点在内部时是 $4\pi$，在外部时是 $0$。这就是单位点源的高斯定律，[[electrostatics/gauss-law]] 中再把常数 $\varepsilon_0$ 与电荷补回去。通量不依赖 $\partial V$ 的形状，也不依赖 $V$ 有多大。把同一个源摊到更大的球面上不会削弱总通量：场按 $1/r^2$ 变弱，面积按 $r^2$ 增大。

::: widget plot
f: -1/x
x: 0.2, 3
caption: 曲线是 -1/x 在 0.2 到 3 区间上的图像。最左端的值是 -5，x = 3 处的值是 -1/3。没有滑块；读出图像下降得有多快。这条曲线不是平方反比的形状。三维中点源的径向场按 1/r² 衰减，它通过任何球面的通量都相同。
:::

图中是一张一维图像，奇点位于窗口左缘之外。它在那里是作为一种量的图像：这种量在原点附近变得很大，越往外越平缓。三维的事实——通量与半径无关——是把 [[#thm-delta]] 用于球的结果，不是能从这张图的纵轴刻度上读出的性质。

## 斯托克斯定理 {#stokes}

格林定理从平直区域升级到弯曲曲面。绕边缘的环量，等于旋度通过该边缘所张任一曲面的通量。

::: theorem 斯托克斯定理 {#thm-stokes}
设 $S$ 是定向的分段光滑曲面，其边界曲线 $\partial S$ 按相对于 $S$ 的单位法向的右手定则定向。设 $\mathbf{F}$ 在包含 $S$ 与 $\partial S$ 的开集上具有一阶连续偏导数。则

$$
\int_S (\curl\mathbf{F})\cdot\dd\mathbf{A} = \oint_{\partial S} \mathbf{F}\cdot\dd\mathbf{r}.
$$ {#eq-stokes}
:::

::: proof
取 $S$ 为 $xy$ 平面内一个 [[#thm-green]] 适用的区域 $D$ 上的图 $z = g(x, y)$，$g$ 二阶连续可微，并取法向使其 $z$-分量为正。向量面积元是

$$
\dd\mathbf{A} = \left(-\pdv{g}{x},\, -\pdv{g}{y},\, 1\right)\dd x\,\dd y.
$$

$\partial D$ 的参数化 $(x(t), y(t))$ 提升到 $\partial S$ 上的空间曲线 $(x, y, g(x, y))$，且

$$
\mathbf{F}\cdot\dd\mathbf{r} = \big(F_x + F_z \pdv{g}{x}\big)\dd x + \big(F_y + F_z \pdv{g}{y}\big)\dd y,
$$

其中 $\mathbf{F}$ 的各分量在曲面上取值。把这两个系数称为 $\tilde P$ 与 $\tilde Q$。它们是只依赖 $x$ 与 $y$ 的函数。格林定理说边界积分等于 $\iint_D (\partial\tilde Q/\partial x - \partial\tilde P/\partial y)\,\dd x\,\dd y$。

用链式法则求导。$g$ 的二阶偏导数因其连续而相消，涉及 $\mathbf{F}$ 同一分量自身的 $\partial^2$ 项也相消。幸存下来的是

$$
\pdv{\tilde Q}{x} - \pdv{\tilde P}{y}
= (\curl\mathbf{F})_z - (\curl\mathbf{F})_x\pdv{g}{x} - (\curl\mathbf{F})_y\pdv{g}{y},
$$

在曲面上取值。这个表达式就是 $(\curl\mathbf{F})\cdot(-\partial g/\partial x,\, -\partial g/\partial y,\, 1)$，正是通量的被积式。这就是向上取图的曲面的 [[#eq-stokes]]。

在别的某个坐标平面内是图的曲面，是同样的论证换个坐标轴名字。本课程中一般分段光滑的曲面可以分成有限多个这样的图。沿公共边的积分成对相消。
:::

这个证明既给出存在性论证，也给出一个实用方法。对只朝 $z$ 方向的旋度，通过一个图的曲面的通量等于该分量在曲面于 $xy$ 平面上投影的面积分，而不是在弯曲面积上。把 $(\curl\mathbf{F})\cdot\mathbf{k}$ 乘以弯曲面积，正是半球例题要抓的那个错误。

保守场缺的那条蕴含现在可以补上了。

::: theorem 旋度与单连通 {#thm-stokes-potential}
设 $\mathbf{F}$ 在单连通开集 $U$ 上具有一阶连续偏导数，并设 $\curl\mathbf{F} = \mathbf{0}$ 在 $U$ 内处处成立。则 $\mathbf{F}$ 在 $U$ 上保守，且对 [[#eq-potential-def]] 的势有 $\mathbf{F} = -\nabla V$。
:::

::: proof
设 $C_1$ 与 $C_2$ 是 $U$ 内从 $A$ 到 $B$ 的两条分段光滑路径。沿 $C_1$ 行走再沿 $C_2$ 的反向返回，是 $U$ 内一条闭曲线。由 [[#def-simply]]，它是一张位于 $U$ 内的曲面 $S$ 的有向边界。斯托克斯定理把环量化成 $\curl\mathbf{F}$ 通过 $S$ 的通量，而后者为零。于是沿 $C_1$ 与沿 $C_2$ 的曲线积分相等。路径无关正是 [[#thm-potential]] 的假设，所以所述符号的势存在。
:::

合起来，[[#thm-potential]] 与 [[#thm-stokes-potential]] 就是大纲里的那个等价。在单连通区域上，对连续可微的场，下面几条等价：旋度为零；曲线积分路径无关；场是某个标量势的负梯度。去掉单连通假设，旋度检验就只在一个方向上成立。在任何区域上，梯度仍然旋度为零。在有洞的区域上无旋的场却未必是梯度，因为斯托克斯定理所要求的曲面可能不存在于区域内部。

::: example 半球面上的斯托克斯定理 {#ex-hemisphere}
设 $S$ 是半球面 $x^2 + y^2 + z^2 = 1$，$z \ge 0$，取上方法向，$\mathbf{F} = (-y,\, x,\, z)$。计算 [[#eq-stokes]] 的两端。
::: solution
旋度是

$$
\curl\mathbf{F} = \left(\pdv{z}{y} - \pdv{x}{z},\; \pdv{(-y)}{z} - \pdv{z}{x},\; \pdv{x}{x} - \pdv{(-y)}{y}\right) = (0, 0, 2).
$$

半球面是单位圆盘上方的图 $z = \sqrt{1 - x^2 - y^2}$。向量面积元的第三个分量是 $\dd x\,\dd y$，所以

$$
(\curl\mathbf{F})\cdot\dd\mathbf{A} = 2\,\dd x\,\dd y.
$$

通量等于单位圆盘面积的 $2$ 倍，即 $2\pi$。它不是半球面弯曲面积 $2\pi$ 的 $2$ 倍。那个乘积是 $4\pi$，回答的是另一个问题：常场 $(0, 0, 2)$ 通过一张法向竖直的曲面的通量。

边界是平面 $z = 0$ 内的单位圆，从上方看为逆时针，这正是上方法向的右手方向。取参数化 $\mathbf{r}(\theta) = (\cos\theta,\, \sin\theta,\, 0)$。则 $\mathbf{F}(\mathbf{r}(\theta)) = (-\sin\theta,\, \cos\theta,\, 0)$，$\mathbf{r}'(\theta) = (-\sin\theta,\, \cos\theta,\, 0)$，于是

$$
\mathbf{F}\cdot\mathbf{r}' = \sin^2\theta + \cos^2\theta = 1.
$$

环量是 $\int_0^{2\pi} \dd\theta = 2\pi$。$\mathbf{F}$ 的 $z$-分量从头到尾没有进场，因为在这条边上 $\dd z = 0$。两端相符。
:::
:::

::: warning
斯托克斯定理与散度定理都需要一张定向曲面或一条定向边界，并且需要场在包含整个积分区域（含边界）的开集上连续可微。在原点发散的场，在任何包含原点的区域上都不是这一类。像 [[#thm-delta]] 证明里那样把原点挖掉是合法的；假装定理可以穿过奇点使用则不合法。这就是为什么点电荷通过其周围曲面的通量非零，而它在 $\R^3 \setminus \{\mathbf{0}\}$ 的每一点散度为零。去心空间是单连通的，平方反比场在其中是负的梯度，所以与 [[#thm-stokes-potential]] 没有冲突。与朴素的散度定理的冲突是光滑性的失效，不是单连通的失效。
:::

::: history
格林（Green）1828 年的论文在诺丁汉自费印出，其中已含把散度的体积分与通过边界的通量联系起来的积分恒等式。高斯（Gauss）在引力研究中早已使用平方反比场的通量，散度定理因此常被称为高斯定理。奥斯特罗格拉茨基（Ostrogradsky）在 1826 年呈交巴黎科学院的论文中给出了一般形式。斯托克斯（Stokes）定理有一个更为确定的日期。汤姆孙（Thomson，即后来的开尔文勋爵）在 1850 年 7 月 2 日致斯托克斯的信中写下了它。斯托克斯把这一定理作为 1854 年史密斯奖学金试题的一道题。它经由麦克斯韦（Maxwell）之手成为电磁学的日常工具。
:::

## 后续内容 {#leads}

这两个定理是从 [[math-methods/vector-calculus]] 的局部算子通向后续课程整体定律的桥梁。[[electrostatics/gauss-law]] 中的高斯定律是把 [[#thm-divergence]] 用于电场，点电荷由 $\delta$ 函数恒等式 [[#eq-delta]] 提供。[[electrostatics/potential]] 中静电势的存在，是把 [[#thm-stokes-potential]] 用于真空中旋度为零的电场。[[magnetism/faraday]] 中的法拉第定律是把斯托克斯定理用于绕变化磁通量运行的电场，而安培定律是把同一 定理用于绕电流运行的磁场，正如 [[magnetism/biot-savart]] 中所预备的。

$1/r$ 的拉普拉斯算子也是泊松方程格林函数的起点。在 [[math-methods/green-functions]] 中，单位源的响应被构造成其拉普拉斯算子是一个 $\delta$ 函数，而 [[#eq-delta]] 就是自由空间的例子，只差因子 $-4\pi$。[[#eq-work-potential]] 中的符号在那里依然有效：势的定义仍使场指向下坡方向。

::: summary
- 曲线积分 $\int_C \mathbf{F}\cdot\dd\mathbf{r}$ 在路径反向时变号。弧长的标量积分不变号。
- 若 $\mathbf{F} = -\nabla V$，从 $A$ 到 $B$ 的曲线积分等于 $V(A) - V(B)$。那个负号是力学的势能约定。
- 在单连通区域上，旋度为零、路径无关、上述势存在，三者等价。没有该假设，旋度为零是不够的。
- 格林定理把平面环量等 $\partial Q/\partial x - \partial P/\partial y$ 的二重积分。它是平直曲面的斯托克斯定理。
- 散度定理把 $\int_V \divg\mathbf{F}\,\dd V$ 等 $\mathbf{F}$ 的外向通量。场必须在整个 $V$ 上光滑。
- 挖掉一个小球表明：原点在内部时 $\int_V \nabla^2(1/r)\,\dd V$ 是 $-4\pi$，否则是 $0$，所以 $\nabla^2(1/r) = -4\pi\delta^3(\mathbf{r})$。
- 斯托克斯定理把旋度通过定向曲面的通量等绕边缘的环量。边缘与法向由右手定则绑定。
- 直线上的奇点——例如 $z$ 轴上的 $(-y, x)/(x^2 + y^2)$——可以旋度为零而环量非零，因为以该环为边界的曲面没有一张能留在区域内部。
:::

## 习题 {#exercises}

::: exercise 直线段的积分 {#exr-line level=1 check="2"}
设 $\mathbf{F} = (y,\, x,\, 0)$。计算 $\mathbf{F}$ 从 $(0, 0, 0)$ 到 $(1, 2, 0)$ 的曲线积分。
::: solution
场是一个梯度：$\nabla(xy) = (y, x, 0)$。由 [[#thm-gradient]]，$\nabla(xy)$ 从原点到 $(1, 2, 0)$ 的积分是 $1\cdot 2 - 0 = 2$。

作为核对，把直线参数化为 $\mathbf{r}(t) = (t,\, 2t,\, 0)$，$0 \le t \le 1$。则 $\mathbf{F}(\mathbf{r}(t)) = (2t,\, t,\, 0)$，$\mathbf{r}' = (1, 2, 0)$，被积函数是 $2t + 2t = 4t$。$4t$ 从 $0$ 到 $1$ 的积分是 $2$。两种方法一致。按物理符号的势是 $V = -xy$，[[#eq-work-potential]] 也返回 $0 - (-2) = 2$。
:::
:::

::: exercise 更大球面的通量 {#exr-sphere-2 level=1 check="32*pi"}
设 $\mathbf{F} = (x, y, z)$。求 $\mathbf{F}$ 通过以原点为中心、半径为 $2$ 的球面的外向通量。
::: solution
散度是 $3$。半径为 $2$ 的球的体积是

$$
\frac{4}{3}\pi R^3 = \frac{4}{3}\pi\cdot 8 = \frac{32\pi}{3}.
$$

散度定理适用，因为 $\mathbf{F}$ 处处光滑，它给出通量

$$
3\cdot\frac{32\pi}{3} = 32\pi.
$$

在曲面本身上，$\mathbf{F}\cdot\mathbf{n} = R = 2$，面积是 $4\pi R^2 = 16\pi$，所以通量是 $2\cdot 16\pi = 32\pi$，又是它。这就是 [[#ex-sphere]] 末尾核对过的伸缩规律：两端都按 $R^3$ 增长，而 $4\pi R^3$ 在 $R = 2$ 时是 $32\pi$。
:::
:::

::: exercise 更大圆的环量 {#exr-circle-3 level=1 check="18*pi"}
设 $\mathbf{F} = (-y,\, x,\, 0)$。求 $\mathbf{F}$ 绕平面 $z = 0$ 内以原点为中心、半径为 $3$ 的圆逆时针一周的环量。
::: solution
取参数化 $\mathbf{r}(\theta) = (3\cos\theta,\, 3\sin\theta,\, 0)$。则 $\mathbf{F}(\mathbf{r}) = (-3\sin\theta,\, 3\cos\theta,\, 0)$，$\mathbf{r}' = (-3\sin\theta,\, 3\cos\theta,\, 0)$，所以

$$
\mathbf{F}\cdot\mathbf{r}' = 9\sin^2\theta + 9\cos^2\theta = 9.
$$

环量是 $\int_0^{2\pi} 9\,\dd\theta = 18\pi$。

斯托克斯定理用更少的三角函数给出同一个数。旋度是 $(0, 0, 2)$，如 [[math-methods/vector-calculus#ex-rotation]]。旋度通过半径 $3$ 圆盘面的通量是面积 $9\pi$ 的 $2$ 倍，即 $18\pi$。上方法向的右手定则选出逆时针方向，正是题目中的方向。
:::
:::

::: exercise 单位立方体 {#exr-cube level=2 check="3"}
设 $\mathbf{F} = (x, y, z)$，$V$ 是单位立方体 $0 \le x \le 1$、$0 \le y \le 1$、$0 \le z \le 1$。计算 $\mathbf{F}$ 通过立方体表面的外向通量，并与散度的体积分比较。
::: solution
散度是 $3$，体积是 $1$，所以体积分是 $3$。

六个面的贡献如下。在 $x = 1$ 上外法向是 $\mathbf{i}$，$F_x = 1$，所以通量是 $1$ 乘以单位面积。在 $x = 0$ 上外法向是 $-\mathbf{i}$，$F_x = 0$，所以通量是 $0$。面 $y = 1$ 与 $y = 0$ 同样贡献 $1$ 与 $0$，$z = 1$ 与 $z = 0$ 亦然。外向通量总和是 $3$。

[[#thm-divergence]] 的两端一致。过原点的三个面毫无贡献，是因为 $\mathbf{F}$ 的相应分量在那里消失，不是因为把面积元忘了。
:::
:::

::: exercise 单位正方形上的格林定理 {#exr-green-square level=2 check="1/2"}
设 $D$ 是正方形 $0 \le x \le 1$、$0 \le y \le 1$，$P = x^2$，$Q = xy$。计算格林定理的两端。
::: solution
被积函数是 $\partial Q/\partial x - \partial P/\partial y = y - 0 = y$。于是

$$
\int_0^1\int_0^1 y\,\dd x\,\dd y = \int_0^1 y\,\dd y = \frac{1}{2}.
$$

逆时针的边界有四条边。沿底边，$y = 0$，$x$ 从 $0$ 到 $1$：$P\,\dd x = x^2\,\dd x$ 积分得 $1/3$，而 $\dd y = 0$。沿右边，$x = 1$，$y$ 从 $0$ 到 $1$：$\dd x = 0$，$Q\,\dd y = y\,\dd y$ 积分得 $1/2$。沿顶边，$y = 1$，$x$ 从 $1$ 到 $0$：$\int_1^0 x^2\,\dd x = -1/3$。沿左边，$x = 0$ 且 $Q = 0$，积分为 $0$。总和是 $1/3 + 1/2 - 1/3 + 0 = 1/2$。

二重积分是较短的计算。边界积分才是能抓住反向边缘的那一种：若顶边改从左往右走而不是从右往左，就会得到 $+1/3$，总和 $7/6$，那不是二重积分。
:::
:::

::: exercise 三个变量的势 {#exr-potential level=2 check="6"}
设 $\mathbf{F} = (2xy,\, x^2 + 2yz,\, y^2)$。证明旋度为零，求一个满足 $\mathbf{F} = -\nabla V$ 的势，并计算从 $(0, 0, 0)$ 到 $(1, 2, 1)$ 的曲线积分。
::: solution
旋度分量是

$$
\begin{aligned}
\pdv{(y^2)}{y} - \pdv{(x^2 + 2yz)}{z} &= 2y - 2y = 0,\\
\pdv{(2xy)}{z} - \pdv{(y^2)}{x} &= 0,\\
\pdv{(x^2 + 2yz)}{x} - \pdv{(2xy)}{y} &= 2x - 2x = 0.
\end{aligned}
$$

区域 $\R^3$ 单连通，所以 [[#thm-stokes-potential]] 提供势。积分 $-\partial V/\partial x = 2xy$ 得 $V = -x^2 y + g(y, z)$。于是 $-\partial V/\partial y = x^2 - \partial g/\partial y$ 必须等于 $x^2 + 2yz$，所以 $\partial g/\partial y = -2yz$，$g = -y^2 z + h(z)$。进而 $-\partial V/\partial z = y^2 - h'(z)$ 必须等于 $y^2$，所以 $h$ 是常数。于是相差那个常数，$V = -x^2 y - y^2 z$。

曲线积分是 $V(0, 0, 0) - V(1, 2, 1)$。终点处的值是 $-1^2\cdot 2 - 2^2\cdot 1 = -6$，所以积分是 $0 - (-6) = 6$。

在直线 $\mathbf{r}(t) = (t,\, 2t,\, t)$ 上，被积函数是在 $(x, y, z) = (t, 2t, t)$ 取值的 $F_x + 2 F_y + F_z$，即 $4t^2 + 2(t^2 + 4t^2) + 4t^2 = 18t^2$。$18t^2$ 从 $0$ 到 $1$ 的积分是 $6$。
:::
:::

::: exercise 有环量的无旋场 {#exr-hole level=3}
::: hint
在单位圆上分母 $x^2 + y^2$ 等于 $1$，被积函数随之塌缩。至于旋度，对商 $(x^2 + y^2)^{-1}$ 求导，留意 $z$-分量中两项相消。斯托克斯定理所要求的曲面必须躲开 $z$ 轴。
:::
在挖去 $z$ 轴的 $\R^3$ 上设 $\mathbf{F} = (-y/(x^2 + y^2),\, x/(x^2 + y^2),\, 0)$。证明在区域的每一点 $\curl\mathbf{F} = \mathbf{0}$，并证明绕平面 $z = 0$ 内单位圆逆时针一周的环量是 $2\pi$。解释为什么这与斯托克斯定理不矛盾。
::: solution
写 $F_x = -y(x^2 + y^2)^{-1}$、$F_y = x(x^2 + y^2)^{-1}$，$F_z = 0$。对 $z$ 的导数为零，所以旋度的 $x$-与 $y$-分量为零。对 $z$-分量，

$$
\pdv{F_y}{x} = (x^2 + y^2)^{-1} - 2x^2(x^2 + y^2)^{-2} = \frac{y^2 - x^2}{(x^2 + y^2)^2},
$$

而

$$
\pdv{F_x}{y} = -(x^2 + y^2)^{-1} + 2y^2(x^2 + y^2)^{-2} = \frac{y^2 - x^2}{(x^2 + y^2)^2}.
$$

只要分母不为零——也就是在 $z$ 轴之外——差就是零。所以旋度在整个区域上消失。

在单位圆上，$x = \cos\theta$，$y = \sin\theta$，$x^2 + y^2 = 1$，所以 $\mathbf{F} = (-\sin\theta,\, \cos\theta,\, 0)$，$\mathbf{r}' = (-\sin\theta,\, \cos\theta,\, 0)$。被积函数是 $1$，环量是 $2\pi$。

斯托克斯定理并不保证这个环量等于旋度的某个通量，因为它要求的是一张以该圆为边界、位于区域内部、$\mathbf{F}$ 在其上连续可微的曲面。平直圆盘碰到原点，而原点不在区域内。从平面鼓出去的曲面仍然必须碰到 $z$ 轴：单位圆绕该轴一周，没有以它为边界且躲开该轴的曲面。每个候选曲面都撞上 $\mathbf{F}$ 没有定义的那条直线。旋度在它存在的地方为零，环量是 $2\pi$，而 [[#thm-stokes]] 的假设并不满足。区域不是单连通的，所以 [[#thm-stokes-potential]] 也不适用。这个场在挖去 $z$ 轴的 $\R^3$ 上不保守，尽管它的旋度为零。
:::
:::

::: exercise 盒子上的散度定理 {#exr-box level=3}
::: hint
先把 $\partial F_x/\partial x$ 对 $x$ 积分。微积分基本定理给出 $x = a$ 与 $x = 0$ 两个面，而 $x = 0$ 上的外法向提供那个负号。
:::
设 $\mathbf{F}$ 在包含盒子 $V$（由 $0 \le x \le a$、$0 \le y \le b$、$0 \le z \le c$ 给出，$a$、$b$、$c$ 为正）的开集上具有一阶连续偏导数。把散度的每一项与通过相应一对面的通量作比较，证明这个盒子的散度定理。
::: solution
积分散度的第一项：

$$
\int_V \pdv{F_x}{x}\,\dd V = \int_0^c\int_0^b \big(F_x(a, y, z) - F_x(0, y, z)\big)\dd y\,\dd z.
$$

在面 $x = a$ 上外法向是 $\mathbf{i}$，向量面积元是 $\mathbf{i}\,\dd y\,\dd z$，所以 $\mathbf{F}$ 通过该面的通量是 $F_x(a, y, z)$ 的积分。在面 $x = 0$ 上外法向是 $-\mathbf{i}$，所以通量是 $-F_x(0, y, z)$ 的积分。这两个通量之和就是 $\partial F_x/\partial x$ 的体积分。

对 $y$ 做同样的计算，介于面 $y = b$ 与 $y = 0$ 之间，就把 $\partial F_y/\partial y$ 的体积分认作 $y$-分量的外向通量。面 $z = c$ 与 $z = 0$ 对 $\partial F_z/\partial z$ 做同样的事。三对相加得

$$
\int_V \divg\mathbf{F}\,\dd V = \oint_{\partial V} \mathbf{F}\cdot\dd\mathbf{A},
$$

取外向定向。除了"一阶偏导数连续"之外没有用到 $\mathbf{F}$ 的任何性质，有了它，对 $x$ 的内层积分才真正是端点值之差。在盒子内部奇异的场被该假设排除在外，正如 [[#thm-delta]] 中排除原点一样。
:::
:::
