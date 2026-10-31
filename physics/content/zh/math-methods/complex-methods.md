弹簧上的质点与串联电路里的交变电流，一旦允许未知数是复数，就变成了同一套代数。你测到的量是实部。本来会藏在另一项正弦里的相位，此时就坐在一个指数的辐角里。于是两个振动相加，就是平面上两个箭头相加。

本章的积分是实的，路径却不是。闭合一条围道，算一个留数，就能读出一个数，比如 $\pi$ 或 $\pi/(2e)$。这套方法成也估计、败也估计：无穷远处那段弧没有贡献，靠的就是那个估计。那个估计才是工作的主体。

指数函数的资格是在 [[math-methods/odes]] 的线性方程里挣来的。这里证明的柯西（Cauchy）定理会调用 [[math-methods/integral-theorems]] 的积分定理。课程的其余部分见 [[math-methods]]。我们把闭曲线的正向取为逆时针：沿曲线走，内部保持在左手边。有些书对同一方向用 counterclockwise 一词。留数定理只对这一方向带正号。

## 复指数函数 {#exponential}

复数 $z = x + iy$ 是平面上的点 $(x, y)$，$x$ 与 $y$ 为实数，$i$ 是 $-1$ 的形式平方根。**模**是 $\abs{z} = \sqrt{x^2 + y^2}$，即到原点的距离。非零的 $z$ 有一个**辐角** $\theta$，即从正实轴到穿过 $z$ 的射线的角，于是 $x = \abs{z}\cos\theta$，$y = \abs{z}\sin\theta$。相差 $2\pi$ 的整数倍的辐角指同一条射线。需要单值时，我们会说明用的是哪个范围。

::: definition 复指数 {#def-exp}
对实数 $x$ 与 $y$，
$$
e^{x+iy} = e^{x}\bigl(\cos y + i\sin y\bigr).
$$ {#eq-euler}
特别地，$x = 0$ 的情形就是欧拉（Euler）公式：
$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$
:::

这个公式是唯一能让加法规则 $e^{z_1+z_2} = e^{z_1}e^{z_2}$ 保留、且导数仍是 $e^{z}$ 的实指数推广方式。一种检验是幂级数。对任意复数 $z$，
$$
e^{z} = \sum_{n=0}^{\infty} \frac{z^{n}}{n!}.
$$
取 $z = i\theta$，$\theta$ 为实数。$i$ 的幂按 $1, i, -1, -i$ 循环。偶数项是实的，重现 $\cos\theta$ 的级数。奇数项是虚的，重现 $\sin\theta$ 的级数。这正是又一次的 [[#eq-euler]]，并且说明三角函数本来就坐在指数级数里面。

三条性质立刻得到，也正是下文要用到的。第一，$e^{i\theta}$ 在单位圆上：$\abs{e^{i\theta}}^{2} = \cos^{2}\theta + \sin^{2}\theta = 1$。第二，指数的加法规则正是正弦与余弦的和角公式，打包成一行。第三，
$$
\deriv{}{\theta} e^{i\theta} = i e^{i\theta},
$$
所以求导就是乘以 $i$，而乘以 $i$ 把点 $e^{i\theta}$ 转过一个直角。沿单位圆运动的粒子，其速度沿圆的切向。这就是乘以 $i$ 的样子。

实余弦是复指数的实部。若 $A$ 与 $\alpha$ 为实数，
$$
A\cos(\omega t - \alpha) = \operatorname{Re}\bigl(A e^{-i\alpha} e^{i\omega t}\bigr).
$$
复数 $A e^{-i\alpha}$ 是一个固定的箭头，因子 $e^{i\omega t}$ 使它以角频率 $\omega$ 旋转。同频率振动的叠加就是这些箭头的相加，最后再取实部。在测量逼你展开之前，不要把正弦展开。

::: example 两个振动，一个箭头 {#ex-phasor}
把 $3\cos\theta + 4\sin\theta$ 写成单个余弦，并在 $\theta = 0.300$ 处数值验证这个恒等式。
::: solution
配出形状 $R\cos(\theta - \phi) = R\cos\phi\,\cos\theta + R\sin\phi\,\sin\theta$。系数给出
$$
R\cos\phi = 3, \qquad R\sin\phi = 4.
$$
平方相加：$R^{2} = 9 + 16 = 25$，所以 $R = 5$，因为模不为负。于是 $\cos\phi = 3/5$，$\sin\phi = 4/5$，且 $\phi = \arctan(4/3) = 0.927295$ 弧度，换成角度制保留两位小数是 $53.13^{\circ}$。

同一个箭头就是复数 $3 - 4i$。事实上
$$
\operatorname{Re}\bigl((3-4i)e^{i\theta}\bigr) = \operatorname{Re}\bigl((3-4i)(\cos\theta + i\sin\theta)\bigr) = 3\cos\theta + 4\sin\theta,
$$
且 $\abs{3-4i} = 5$。在 $\theta = 0.300$，
$$
3\cos 0.300 + 4\sin 0.300 = 4.04809,
$$
而 $5\cos(0.300 - 0.927295) = 4.04809$ 也一样。两个表达式相符，是因为它们是同一个函数，不是因为 $0.300$ 是什么特殊角。
:::
:::

::: intuition 是箭头，不是玄学
乘以 $e^{i\alpha}$ 把每个箭头转过角 $\alpha$。乘以一个正实数改变长度而不动方向。任何非零复数的乘法都是两者各占其一。这套算术并不要求你去想象一个神秘的平方根负一坐在数轴上：$i$ 就是转一个直角，做两次就是转半圈，也就是乘以 $-1$。
:::

同样的记账法解释了为什么 [[math-methods/odes]] 中特征多项式的复根会产生实的振荡解。若 $r = -\gamma + i\omega$ 是根，$e^{rt} = e^{-\gamma t}e^{i\omega t}$ 的半径在衰减而辐角在旋转。实部与虚部是 $e^{-\gamma t}\cos\omega t$ 与 $e^{-\gamma t}\sin\omega t$。

## 解析函数 {#analytic}

两个分量函数实可微，与复可微不是一回事。复导数必须作为平面上的极限存在，而且极限沿每条路径都要相同。

::: definition 解析函数 {#def-analytic}
设 $f$ 定义在复平面的一个开集上。若
$$
f'(z_0) = \lim_{h \to 0} \frac{f(z_0+h) - f(z_0)}{h}
$$
存在且有限，其中 $h$ 沿复数值趋于 $0$，则称 $f$ 在 $z_0$ **解析**（或全纯，holomorphic）。若 $f$ 在某开集的每一点都解析，则称它在该开集上解析。
:::

写 $f = u + iv$，$u$ 与 $v$ 为实。沿实方向趋近，$h = \Delta x$，得 $f' = \pdv{u}{x} + i\pdv{v}{x}$。沿虚方向趋近，$h = i\Delta y$，得 $f' = \pdv{v}{y} - i\pdv{u}{y}$。两者恰好一致，当且仅当柯西–黎曼方程成立。

::: theorem 柯西–黎曼方程 {#thm-cr}
设 $f = u + iv$ 定义在一个开集上。若 $f$ 在某点解析，则在该点
$$
\pdv{u}{x} = \pdv{v}{y}, \qquad \pdv{u}{y} = -\pdv{v}{x},
$$ {#eq-cr}
且 $f' = \pdv{u}{x} + i\pdv{v}{x}$。反之，若 $u$ 与 $v$ 的一阶偏导数在该点的邻域内存在、连续并在该处满足 [[#eq-cr]]，则 $f$ 在该点解析。
:::

::: proof
上面一段里的两个差商是必要性的一半：解析函数的导数与方向无关，所以 $f'$ 的两个实表达式必须相等，而实部与虚部分别相等正是 [[#eq-cr]]。

反过来，一阶偏导连续意味着 $u$ 与 $v$ 作为二元实函数可微。记 $\Delta z = h + ik$，
$$
\begin{aligned}
u(x+h, y+k) - u(x, y) &= u_x h + u_y k + \rho_1, \\
v(x+h, y+k) - v(x, y) &= v_x h + v_y k + \rho_2,
\end{aligned}
$$
其中 $\rho_j / \abs{\Delta z} \to 0$（当 $\Delta z \to 0$）。代入 [[#eq-cr]]，取其 $u_y = -v_x$ 与 $v_y = u_x$ 的形式。$f$ 的增量成为
$$
\bigl(u_x + i v_x\bigr)(h + ik) + \rho_1 + i\rho_2.
$$
除以 $\Delta z = h + ik$。第一项是 $u_x + i v_x$，余项趋于 $0$。于是 $f'$ 存在且等于 $u_x + i v_x$。
:::

这些方程是不回到极限就能使用的检验。它们不是可选的记账：通不过它们的函数没有复导数，本章后面每条定理都会把它拒之门外。

::: example 一个平方，一个共轭 {#ex-cr}
证明 $f(z) = z^{2}$ 处处解析，而 $g(z) = \overline{z}$ 处处不解析。
::: solution
对 $f(z) = (x+iy)^{2} = (x^{2}-y^{2}) + i(2xy)$，有 $u = x^{2}-y^{2}$，$v = 2xy$。于是 $u_x = 2x = v_y$，且 $u_y = -2y = -v_x$。偏导连续，故 [[#thm-cr]] 表明 $f$ 解析，且 $f' = 2x + i(2y) = 2z$，就是通常的求导法则。

对 $g(z) = x - iy$，有 $u = x$，$v = -y$。于是 $u_x = 1$ 而 $v_y = -1$，第一个柯西–黎曼方程在每一点都不成立。在一个完整邻域上都通不过该方程的函数，根本不可能是下文任何积分定理的候选。共轭作为平面映射是光滑的，但它仍然不解析。
:::
:::

$z$ 的多项式、由 $e^{iz}$ 定义的正弦与余弦、以及极点以外的有理函数，在其有定义处解析。解析函数的商在分母不为零处解析。共轭、模与辐角不解析。

## 柯西定理 {#cauchy}

设 $\gamma$ 为分段光滑道路，$z(t) = x(t) + iy(t)$，$a \le t \le b$。连续函数 $f$ 的围道积分就是普通积分
$$
\int_{\gamma} f(z)\,\dd z = \int_{a}^{b} f\bigl(z(t)\bigr)\, z'(t)\,\dd t.
$$
反向走一遍路径，积分变号。把路径分拆，积分相加。在圆 $z = a + \rho e^{i\theta}$（$\theta$ 从 $0$ 到 $2\pi$）上，有 $\dd z = i\rho e^{i\theta}\,\dd\theta$，直接计算就得到我们频繁使用的那个积分：
$$
\int_{\abs{z-a}=\rho} \frac{1}{z-a}\,\dd z = \int_{0}^{2\pi} i\,\dd\theta = 2\pi i.
$$ {#eq-circle}
对一切其他整数幂，该圆上有 $\int (z-a)^{n}\,\dd z = 0$。$n = -1$ 的情形就是整个留数演算的缩影。

::: theorem 柯西定理 {#thm-cauchy}
设 $C$ 是一条简单闭道路，取逆时针方向，围出区域 $D$，且 $f'$ 在包含 $D$ 与 $C$ 的某个开集上连续。若 $f$ 在整个该开集内解析，则
$$
\int_{C} f(z)\,\dd z = 0.
$$
:::

::: proof
写 $f = u + iv$，$\dd z = \dd x + i\,\dd y$。积分拆成两个实的曲线积分，
$$
\int_{C} (u\,\dd x - v\,\dd y) + i\int_{C} (v\,\dd x + u\,\dd y).
$$
格林定理，取 [[math-methods/integral-theorems]] 中记录的形式，把曲线积分 $\int P\,\dd x + Q\,\dd y$ 化为 $Q_x - P_y$ 在 $D$ 上的二重积分。实部部分，$P = u$，$Q = -v$，被积式是 $-v_x - u_y$，由 [[#eq-cr]] 为零。虚部部分，$P = v$，$Q = u$，被积式是 $u_x - v_y$，同样为零。两个二重积分都是零。$f'$ 连续的假设补上了格林定理所要求的一阶连续偏导。
:::

古尔萨（Goursat）的改进去掉了 $f'$ 连续的假设，代价是更硬的论证。我们下文要积的每个函数，在其解析处都有连续导数，所以刚才证明的版本就够用了。应用中真正要紧的假设是另一回事：被积函数必须在路径**内部**解析，而不只是在路径上。路径内哪怕只有一个极点，积分就不为零——这正是下一条定理的内容。

::: theorem 柯西积分公式 {#thm-cif}
设 $C$ 与 $f$ 如 [[#thm-cauchy]]，设 $a$ 是 $C$ 内部的一点。则
$$
f(a) = \frac{1}{2\pi i}\int_{C} \frac{f(z)}{z-a}\,\dd z.
$$ {#eq-cif}
:::

::: proof
商 $f(z)/(z-a)$ 在 $C$ 与一条位于 $C$ 内部的小圆 $\abs{z-a} = \rho$ 之间的区域上解析。若想把 [[#thm-cauchy]] 套用在单一简单闭路上，可以沿一条走廊把该区域切开；沿走廊的两次积分相消，剩下
$$
\int_{C} \frac{f(z)}{z-a}\,\dd z = \int_{\abs{z-a}=\rho} \frac{f(z)}{z-a}\,\dd z.
$$
写 $f(z) = f(a) + \bigl(f(z)-f(a)\bigr)$。第一部分由 [[#eq-circle]] 积出 $f(a)$ 乘以 $2\pi i$。第二部分被长度 $2\pi\rho$ 乘以圆上 $\abs{f(z)-f(a)}/\rho$ 的最大值所控制，即 $2\pi$ 乘以 $\abs{f-f(a)}$ 的那个最大值。解析蕴含连续，所以该最大值随 $\rho \to 0$ 趋于 $0$。积分与 $\rho$ 无关，而唯一幸存的数就是 $2\pi i\, f(a)$。
:::

对 $a$ 在积分号下求导——这是合法的，因为当 $z$ 在 $C$ 上、$a$ 在内部时，被积函数关于 $(z, a)$ 连续——就得到导数公式。

::: corollary 导数作为围道积分 {#cor-deriv}
在同样的假设下，
$$
f'(a) = \frac{1}{2\pi i}\int_{C} \frac{f(z)}{(z-a)^{2}}\,\dd z.
$$
:::

::: proof
对参数 $a$ 取 [[#eq-cif]] 的差商，可以把差商移进积分号内。在 $C$ 上，$1/(z-a)$ 的差商一致收敛到 $1/(z-a)^{2}$。得到的积分就是上面显示的那个公式。
:::

::: example 单位圆上的指数函数 {#ex-exp-circle}
计算 $\displaystyle\int_{\abs{z}=1} \frac{e^{z}}{z^{2}}\,\dd z$。
::: solution
被积函数形如 $f(z)/(z-a)^{2}$，其中 $f(z) = e^{z}$，$a = 0$。指数函数处处解析，单位圆位于该区域内。[[#cor-deriv]] 给出
$$
\int_{\abs{z}=1} \frac{e^{z}}{z^{2}}\,\dd z = 2\pi i\, f'(0) = 2\pi i,
$$
因为 $f'(z) = e^{z}$ 且 $e^{0} = 1$。同样的结论就是下一节的留数表述：$e^{z}/z^{2} = z^{-2} + z^{-1} + 1/2 + \cdots$，$z^{-1}$ 的系数是 $1$，所以积分是 $2\pi i$ 乘以 $1$。
:::
:::

## 留数定理 {#residues}

若 $f$ 在去心邻域 $0 < \abs{z-a} < \rho$ 内解析、但在 $a$ 本身不解析，则称 $a$ 是 $f$ 的**孤立奇点**。若 $(z-a)f(z)$ 可延拓为在 $a$ 解析且非零的函数，则称其为**一阶极点**，或单极点。

::: lemma 单极点处的留数 {#lem-simple}
若 $f$ 在 $a$ 有单极点且 $L = \lim_{z \to a}(z-a)f(z)$，则绕 $a$ 的小逆时针圆上有
$$
\int \frac{f(z)}{1}\,\dd z = 2\pi i\, L.
$$
数 $L$ 称为 $f$ 在 $a$ 的**留数**，记作 $\Res(f, a)$。若 $f = g/h$，$g$ 与 $h$ 解析，$h(a) = 0$，$h'(a) \ne 0$ 且 $g(a) \ne 0$，则
$$
\Res(f, a) = \frac{g(a)}{h'(a)}.
$$ {#eq-res-quot}
:::

::: proof
由单极点的定义，$g_1(z) = (z-a)f(z)$ 在 $a$ 解析且 $g_1(a) = L$，于是 $f(z) = L/(z-a) + \bigl(g_1(z) - L\bigr)/(z-a)$。第二项在 $z = a$ 处赋值为 $g_1'(a)$ 后就是解析的，它沿小圆的积分由 [[#thm-cauchy]] 为零。第一项由 [[#eq-circle]] 积出 $2\pi i\, L$。

对商：$h(z) = (z-a)h_1(z)$，其中 $h_1(a) = h'(a) \ne 0$，于是 $(z-a)f(z) = g(z)/h_1(z)$，极限是 $g(a)/h'(a)$。
:::

引理中积分的写法就是 $f$ 的通常围道积分；分母上的 $1$ 只是为了让那句话保持成一个公式。计算中我们直接写 $\int f\,\dd z = 2\pi i\, L$。

::: theorem 留数定理 {#thm-residue}
设 $C$ 是一条简单闭道路，取逆时针方向。设 $f$ 在 $C$ 的内部及 $C$ 上除有限多个位于 $C$ 内部的孤立奇点 $a_1, \ldots, a_n$ 外解析，并假设 $f'$ 在其余区域上连续。则
$$
\int_{C} f(z)\,\dd z = 2\pi i \sum_{j=1}^{n} \Res(f, a_j).
$$ {#eq-residue}
:::

::: proof
绕每个 $a_j$ 画一条小逆时针圆 $\gamma_j$，小到诸圆都在 $C$ 内部且互不相交。在 $C$ 与这些圆之间的区域上，$f$ 满足 [[#thm-cauchy]]。该区域的边界沿 $C$ 逆时针、沿每个 $\gamma_j$ 顺时针行进，所以
$$
\int_{C} f\,\dd z - \sum_{j} \int_{\gamma_j} f\,\dd z = 0.
$$
每个内积分等于 $2\pi i$ 乘以留数：极点为单极点时，这是通过 [[#lem-simple]] 按留数定义得到的；一般情形同样是这个小圆定义——留数**就是**那个积分除以 $2\pi i$。求和即得 [[#eq-residue]]。
:::

对二阶极点，若 $(z-a)^{2} f(z)$ 可解析延拓，则留数是该延拓在 $a$ 的导数。证明就是同样的拆分：$(z-a)^{2} f(z) = c_0 + c_1(z-a) + (z-a)^{2} h(z)$，$h$ 解析，于是 $f(z) = c_0(z-a)^{-2} + c_1(z-a)^{-1} + h(z)$，沿小圆只有中间那项幸存。我们对 $e^{z}/z^{2}$ 已经用过这个事实，只是没有给它命名。

::: widget plot
f: 1/(x*x+1)
x: -6, 6
caption: 洛伦兹型函数 $1/(x^{2}+1)$。整条曲线下的面积是 $\pi$，即本节用留数算出的值。曲线是偶函数，所以从 $0$ 到 $\infty$ 的面积是它的一半。在 $|x| = 6$ 处高度为 $1/37$，尾部很细。
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 2pi
caption: 单位圆，$t$ 从 $0$ 到 $2\pi$ 时逆时针走完一圈。当 $z = e^{i\theta}$ 把一个整周期上的实积分化为留数时，用的就是这条围道。动点的速度沿圆的切向，这就是平面上的乘以 $i$。
:::

## 用留数算实积分 {#real}

从闭围道回到实轴需要一个估计。在长度为 $\ell$ 的曲线上，若 $\abs{f} \le M$，则 $\abs{\int f\,\dd z} \le M\ell$。这就是 ML 估计。它很粗糙，但在 $M\ell \to 0$ 时足够用。

::: theorem 洛伦兹型积分 {#thm-lorentz}
$$
\int_{-\infty}^{\infty} \frac{1}{x^{2}+1}\,\dd x = \pi.
$$ {#eq-lorentz}
:::

::: proof
考虑 $f(z) = 1/(z^{2}+1) = 1/\bigl((z-i)(z+i)\bigr)$。奇点是 $z = i$ 与 $z = -i$ 处的单极点。由 [[#eq-res-quot]]，或约去因子 $z-i$，
$$
\Res(f, i) = \frac{1}{2i}.
$$
设 $R > 1$，令 $C_R$ 为沿实轴从 $-R$ 到 $R$、再沿上半平面内半径 $R$ 的半圆 $\Gamma_R$ 返回的闭围道。取这个半圆正是为了让 $C_R$ 成逆时针：实轴从左到右行进，内部在其上方，位于行进方向的左侧。极点 $i$ 在 $C_R$ 内，极点 $-i$ 在外。[[#thm-residue]] 给出
$$
\int_{-R}^{R} \frac{\dd x}{x^{2}+1} + \int_{\Gamma_R} \frac{\dd z}{z^{2}+1} = 2\pi i \cdot \frac{1}{2i} = \pi.
$$
在 $\Gamma_R$ 上 $\abs{z} = R$，所以 $\abs{z^{2}+1} \ge R^{2}-1$，$\abs{f(z)} \le 1/(R^{2}-1)$。$\Gamma_R$ 的长度是 $\pi R$，ML 估计给出
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi R}{R^{2}-1}.
$$
当 $R \to \infty$ 时该界趋于 $0$，所以沿弧的积分趋于 $0$。于是从 $-R$ 到 $R$ 的实积分趋于 $\pi$。被积函数为正，广义积分收敛到该极限。
:::

我们在上半平面闭合，因为那是唯一一个半平面，能让逆时针的围道（实轴从左到右）把内部放在正确一侧。这个弧的估计在下半平面其实也照样成功：$\abs{f}$ 只依赖 $\abs{z}$。若在下方闭合而实轴仍从左到右跑，得到的是绕极点 $-i$ 的*顺时针*围道，积分将等于 $-2\pi i$ 乘以 $-i$ 处的留数。该留数是 $1/(-2i)$，而 $-2\pi i \cdot 1/(-2i) = \pi$，还是它。数值相同，符号的账却不是。对本节的有理函数，只要方向盯得住，两种闭合都行得通。对下一条定理的指数因子，只有一种闭合法可行。

被积函数是偶函数，所以从 $0$ 到 $\infty$ 的积分是 $\pi/2$。对整个实轴做一次双精度数值求积，能重现 $\pi$ 的十二位数字 $3.141592653589793$。

::: quiz
因子 $e^{iz}$ 要在一个大半圆上积分。它在哪里衰减？
- [ ] 在下半平面，因为那里 $y$ 为负而指数里含有 $e^{-y}$。
- [x] 在上半平面，因为 $e^{i(x+iy)} = e^{ix}e^{-y}$，而 $y > 0$ 时 $e^{-y}$ 很小。
- [ ] 两个半圆上一模一样，因为 $\abs{e^{ix}} = 1$。
- [ ] 平面内哪里都不衰减，因为复指数的模总是 $1$。
::: solution
写 $z = x+iy$。则 $e^{iz} = e^{i(x+iy)} = e^{ix}e^{-y}$，所以模是 $e^{-y}$，不是 $1$。当 $y$ 大而正时模很小，那就是上半平面。在下半平面 $y < 0$，于是 $e^{-y}$ 很大，被积函数增长。恒等式 $\abs{e^{ix}} = 1$ 只对实数 $x$ 成立。它正是实积分自身不衰减的原因，而对弧没有说任何话。
:::
:::

::: theorem 一个余弦变换 {#thm-cosine}
$$
\int_{0}^{\infty} \frac{\cos x}{x^{2}+1}\,\dd x = \frac{\pi}{2e}.
$$ {#eq-cosine}
:::

::: proof
余弦是 $e^{ix}$ 的实部。考虑
$$
f(z) = \frac{e^{iz}}{z^{2}+1}
$$
在 [[#thm-lorentz]] 用过的同一条围道 $C_R$ 上：实轴从 $-R$ 到 $R$，上半平面的半圆 $\Gamma_R$，$R > 1$。内部唯一的奇点是 $z = i$ 处的单极点。由 [[#eq-res-quot]]，
$$
\Res(f, i) = \frac{e^{i\cdot i}}{2i} = \frac{e^{-1}}{2i}.
$$
留数定理给出
$$
\int_{-R}^{R} \frac{e^{ix}}{x^{2}+1}\,\dd x + \int_{\Gamma_R} f(z)\,\dd z = 2\pi i \cdot \frac{e^{-1}}{2i} = \frac{\pi}{e}.
$$
剩下的事是证明当 $R \to \infty$ 时弧消失。参数化 $z = Re^{i\theta}$，$\theta$ 从 $0$ 到 $\pi$。则 $\abs{e^{iz}} = \abs{e^{iR(\cos\theta + i\sin\theta)}} = e^{-R\sin\theta}$，且 $\abs{z^{2}+1} \ge R^{2}-1$，所以
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{R}{R^{2}-1}\int_{0}^{\pi} e^{-R\sin\theta}\,\dd\theta.
$$
在 $[0, \pi/2]$ 上正弦位于其弦之上：$\sin\theta$ 在那里是凹的，因为它的二阶导数是 $-\sin\theta \le 0$，而凹函数位于连接其端点的弦之上。从 $(0, 0)$ 到 $(\pi/2, 1)$ 的弦是 $2\theta/\pi$，所以 $\sin\theta \ge 2\theta/\pi$。因此
$$
\int_{0}^{\pi/2} e^{-R\sin\theta}\,\dd\theta \le \int_{0}^{\pi/2} e^{-2R\theta/\pi}\,\dd\theta = \frac{\pi}{2R}\bigl(1-e^{-R}\bigr).
$$
由 $\sin\theta$ 关于 $\pi/2$ 的对称性，从 $0$ 到 $\pi$ 的积分是从 $0$ 到 $\pi/2$ 的积分的两倍。合并两个界，
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi\bigl(1-e^{-R}\bigr)}{R^{2}-1},
$$
当 $R \to \infty$ 时趋于 $0$。于是
$$
\int_{-\infty}^{\infty} \frac{e^{ix}}{x^{2}+1}\,\dd x = \frac{\pi}{e}.
$$
虚部是 $\sin x/(x^{2}+1)$，一个奇函数，它在对称区间上的积分为零。实部是偶函数，所以
$$
\int_{0}^{\infty} \frac{\cos x}{x^{2}+1}\,\dd x = \frac{1}{2}\cdot\frac{\pi}{e} = \frac{\pi}{2e}.
$$
:::

数值是 $\pi/(2e) = 0.577863674895$。对同一个积分做傅里叶加权求积，得到 $0.577863674892$，第十一位以前都吻合。$e^{-y}$ 的衰减正是上半平面非用不可的全部理由。因子 $e^{-iz}$ 的模是 $e^{y}$，当 $y$ 为负时很小，那个积分就得在下方闭合。

::: example 平移过的分母 {#ex-shift}
计算 $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}-2x+2}$。
::: solution
配方：$x^{2}-2x+2 = (x-1)^{2}+1$。复变函数 $1/(z^{2}-2z+2)$ 在 $z = 1 \pm i$ 处有极点。位于上半平面的只有 $1+i$。分母的导数是 $2z-2$，所以 [[#eq-res-quot]] 给出
$$
\Res = \frac{1}{2(1+i)-2} = \frac{1}{2i}.
$$
分母的次数比分子高 $2$，所以半圆弧按 [[#thm-lorentz]] 里同样的 ML 估计消失：长度是 $\pi R$，当 $R$ 大时被积函数的模至多 $1/(R^{2}-2R-2)$（分母的常数调整一下即可），乘积仍趋于 $0$。因此积分等于 $2\pi i \cdot 1/(2i) = \pi$。

作为检验，原函数是 $\arctan(x-1)$，而 $\arctan(\infty) - \arctan(-\infty) = \pi/2 - (-\pi/2) = \pi$。留数与初等原函数一致。留数计算并不需要原函数——对没有原函数的被积函数使用它，意义正在于此。
:::
:::

::: example 余弦的一整圈 {#ex-circle}
计算 $\displaystyle\int_{0}^{2\pi} \frac{\dd\theta}{2+\cos\theta}$。
::: solution
令 $z = e^{i\theta}$，于是 $\dd\theta = \dd z/(iz)$，$\cos\theta = (z+1/z)/2$，围道为单位圆，逆时针。则
$$
2+\cos\theta = 2 + \frac{z+1/z}{2} = \frac{z^{2}+4z+1}{2z},
$$
积分成为
$$
\int_{\abs{z}=1} \frac{1}{iz}\cdot\frac{2z}{z^{2}+4z+1}\,\dd z = \int_{\abs{z}=1} \frac{2}{i(z^{2}+4z+1)}\,\dd z.
$$
极点是 $z^{2}+4z+1 = 0$ 的根，即 $z = -2 \pm \sqrt{3}$。单位圆内的根是 $z_{\mathrm{in}} = -2+\sqrt{3}$，因为 $\sqrt{3} < 2$ 且 $\abs{-2+\sqrt{3}} = 2-\sqrt{3} < 1$。另一个根的模是 $2+\sqrt{3} > 1$。二次式的导数是 $2z+4$，在 $z_{\mathrm{in}}$ 处等于 $2(-2+\sqrt{3})+4 = 2\sqrt{3}$。被积函数的留数是
$$
\frac{2}{i\cdot 2\sqrt{3}} = \frac{1}{i\sqrt{3}}.
$$
[[#thm-residue]] 乘以 $2\pi i$，给出 $2\pi/\sqrt{3}$。对 $a > b > 0$ 的一般模式是 $\int_{0}^{2\pi} \dd\theta/(a+b\cos\theta) = 2\pi/\sqrt{a^{2}-b^{2}}$。这里 $a = 2$，$b = 1$，而 $2\pi/\sqrt{3} = 3.62759872847$。
:::
:::

::: warning 哪个半平面，哪些极点
闭合围道只有在弧上的积分趋于零时才是合法的，而且只有确实位于闭路径内部的极点才被计数。对 $\int e^{iz}/(z^{2}+1)\,\dd z$，有 $e^{iz} = e^{i(x+iy)} = e^{ix}e^{-y}$，该因子在 $y > 0$ 时衰减，上半平面才是行得通的那一个。反向的指数 $e^{-iz}$ 的模是 $e^{y}$，在下半平面衰减。不含指数的有理函数也许两个半平面都可以，但只要实轴保持从左到右，方向就会改变，而顺时针的围道会在 $2\pi i$ 前面带来一个负号。漏掉一个极点、或把另一个半平面里的极点算了进来，都会得出错误的数值，而留数自身的代数不会发出任何警告。
:::

## 后续内容 {#leads}

傅里叶积分就是带着连续频率的本章。[[math-methods/fourier]] 使用的变换对把函数写成 $e^{ikx}$ 的叠加，而当函数是有理函数时，反演积分就是围道积分。受迫线性电路也是同一个指数：阻抗是一个复数，而指数乘积的实部才是物理电流。

对数是 $1/z$ 的积分。在沿负实轴剪开的平面上，可以令 $\log z = \ln\abs{z} + i\operatorname{Arg} z$，辐角取在 $(-\pi, \pi]$。在剪开平面上导数是 $1/z$。越过剪线，辐角跳 $2\pi$，函数就跳 $2\pi i$。那个跳跃正是从另一面看到的 [[#eq-circle]]：绕原点的一整圈无法收缩，而 $1/z$ 的留数是 $1$。

::: history 柯西与 1825 年
奥古斯丁-路易·柯西（Augustin-Louis Cauchy）关于复积分的论文，引文年份写作 1825 年。这项工作属于 1824 与 1825 年的论文；1825 是这里采用的年份。在那篇论文里，解析函数沿闭围道的积分为零——假设条件柯西后来还在不断收紧。留数演算，包括系统地用留数计算实积分，是柯西在其后十年里发展的。洛朗（Laurent）在孤立奇点附近的展开来得更晚，提供了主部的语言。我们只用过单极点情形与二阶导数公式——本章的积分只需要那套展开的这么一部分。
:::

::: summary
- $e^{i\theta} = \cos\theta + i\sin\theta$，且 $e^{x+iy} = e^{x}(\cos y + i\sin y)$。一个实振动是复指数的实部。
- 解析意味着复导数存在。柯西–黎曼方程 $\partial u/\partial x = \partial v/\partial y$ 与 $\partial u/\partial y = -\partial v/\partial x$ 是必要的；偏导连续时它们也是充分的。
- 若 $f'$ 连续，且 $f$ 在一条简单逆时针围道的内部及围道上解析，则 $f$ 的积分为零。柯西积分公式由围道上的取值恢复出 $f(a)$。
- 单极点处的留数是 $\lim_{z \to a}(z-a)f(z)$，对 $f = g/h$ 也是 $g(a)/h'(a)$。沿逆时针围道的积分是内部各留数之和的 $2\pi i$ 倍。
- 在上半平面闭合、实轴从左到右，是逆时针的选法。对 $1/(z^{2}+1)$，弧由 ML 估计消失，$i$ 处的留数是 $1/(2i)$，而 $\int_{-\infty}^{\infty} \dd x/(x^{2}+1) = \pi$。
- 对 $e^{iz}/(z^{2}+1)$，在 $z = x+iy$ 上的模是 $e^{-y}/|z^{2}+1|$，所以弧必须放在上半平面。积分 $\int_{0}^{\infty} \cos x/(x^{2}+1)\,\dd x$ 等于 $\pi/(2e)$。
- 整周期上的三角积分经 $z = e^{i\theta}$ 变成单位圆上的留数。圆外的极点不计入。
- 共轭不解析。柯西定理对它不适用，而 $\overline{z}$ 沿单位圆的积分是 $2\pi i$，不是零。
:::

## 习题 {#exercises}

::: exercise 单位根的实部 {level=1 check="1/2"}
求 $e^{i\pi/3}$ 的实部。
::: solution
由 [[#eq-euler]]，
$$
e^{i\pi/3} = \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} = \frac{1}{2} + i\frac{\sqrt{3}}{2}.
$$
实部是 $1/2$。模是 $1$，一切纯虚指数都是如此；虚部是 $\sqrt{3}/2$，而问的不是它。
:::
:::

::: exercise 复指数函数的模 {level=1 check="e^2"}
求 $e^{2+i\pi/2}$ 的模。
::: solution
用加法规则拆开指数：
$$
e^{2+i\pi/2} = e^{2}\, e^{i\pi/2} = e^{2}\bigl(\cos\tfrac{\pi}{2} + i\sin\tfrac{\pi}{2}\bigr) = i e^{2}.
$$
$i$ 的模是 $1$，$e^{2}$ 为实且为正，所以模是 $e^{2}$。等价地说，若 $z = x+iy$ 则 $\abs{e^{z}} = e^{x}$，这里 $x = 2$。辐角 $\pi/2$ 影响方向，不影响长度。
:::
:::

::: exercise 留数的虚部 {level=1 check="-1/2"}
函数 $1/(z^{2}+1)$ 在 $z = i$ 有单极点。求该极点处留数的虚部。
::: solution
约去分母 $(z-i)(z+i)$ 中的因子 $z-i$：
$$
\Res = \frac{1}{2i}.
$$
分子分母同乘 $-i$：$1/(2i) = -i/(2i\cdot i) = -i/2$。实部为 $0$，虚部为 $-1/2$。该函数沿大的逆时针半圆的积分是此留数的 $2\pi i$ 倍，即 $\pi$，一个实数：因子 $2\pi i$ 乘以 $-i/2$ 把留数旋转回了实轴上。留数本身不是实积分的值。
:::
:::

::: exercise 更宽的洛伦兹型 {level=2 check="pi/2"}
计算 $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}+4}$。
::: solution
被积函数是 $f(z) = 1/(z^{2}+4) = 1/\bigl((z-2i)(z+2i)\bigr)$ 在实轴上的痕迹。极点在 $2i$ 与 $-2i$。用 [[#thm-lorentz]] 的半圆围道在上半平面闭合，这次半径取 $R > 2$。内部的极点是 $2i$，
$$
\Res(f, 2i) = \frac{1}{4i}.
$$
弧的估计结构不变：$\abs{z^{2}+4} \ge R^{2}-4$，长度是 $\pi R$，且 $\pi R/(R^{2}-4) \to 0$。[[#thm-residue]] 给出
$$
\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}+4} = 2\pi i \cdot \frac{1}{4i} = \frac{\pi}{2}.
$$
原函数 $(1/2)\arctan(x/2)$ 从 $-\pi/4$ 到 $\pi/4$，证实了这个值。缩放 $x = 2u$ 把积分变成 $(1/2)\int \dd u/(u^{2}+1) = (1/2)\pi$，这正是从 [[#eq-lorentz]] 读出的同一结果。
:::
:::

::: exercise 更快的振荡 {level=2 check="pi/(2*e^2)"}
计算 $\displaystyle\int_{0}^{\infty} \frac{\cos(2x)}{x^{2}+1}\,\dd x$。
::: solution
把 $\cos(2x)$ 换成 $e^{i 2 z}$ 的实部，用 [[#thm-cosine]] 的上半平面围道。$e^{i 2 z}$ 在 $z = x+iy$ 上的模是 $e^{-2y}$，$y > 0$ 时衰减，所以同一个半平面仍是正确的选择，弧的估计把 $e^{-R\sin\theta}$ 换成 $e^{-2R\sin\theta}$ 便照常成立。$z = i$ 处的留数是
$$
\frac{e^{i\cdot 2 \cdot i}}{2i} = \frac{e^{-2}}{2i}.
$$
$e^{i 2 x}/(x^{2}+1)$ 从 $-\infty$ 到 $\infty$ 的积分等于 $2\pi i \cdot e^{-2}/(2i) = \pi e^{-2}$。被积函数 $\cos(2x)/(x^{2}+1)$ 是偶函数而正弦搭档是奇函数，所以从 $0$ 到 $\infty$ 的积分是它的一半：
$$
\frac{\pi}{2e^{2}}.
$$
一般公式：$a > 0$ 时 $\int_{0}^{\infty} \cos(ax)/(x^{2}+1)\,\dd x = \pi e^{-a}/2$。$a = 1$ 的 [[#eq-cosine]] 与 $a = 2$ 的本题，都被它包含。
:::
:::

::: exercise 三加二倍余弦 {level=2 check="2*pi/sqrt(5)"}
计算 $\displaystyle\int_{0}^{2\pi} \frac{\dd\theta}{3+2\cos\theta}$。
::: solution
在单位圆上代入 $z = e^{i\theta}$，如 [[#ex-circle]]。则 $\dd\theta = \dd z/(iz)$，$\cos\theta = (z+1/z)/2$，于是
$$
3+2\cos\theta = 3 + \frac{z+1/z}{1} = \frac{2z^{2}+6z+2}{2z} = \frac{z^{2}+3z+1}{z}.
$$
更仔细地说，$2\cos\theta = z+1/z$，所以 $3+2\cos\theta = (3z + z^{2} + 1)/z = (z^{2}+3z+1)/z$。积分是
$$
\int_{\abs{z}=1} \frac{1}{iz}\cdot\frac{z}{z^{2}+3z+1}\,\dd z = \int_{\abs{z}=1} \frac{1}{i(z^{2}+3z+1)}\,\dd z.
$$
$z^{2}+3z+1 = 0$ 的根是 $(-3\pm\sqrt{5})/2$。单位圆内的根是 $(-3+\sqrt{5})/2$，其模小于 $1$，因为两根之积为 $1$ 而另一根 $(-3-\sqrt{5})/2$ 的模大于 $1$。导数 $2z+3$ 在内根处等于 $\sqrt{5}$。留数是 $1/(i\sqrt{5})$，乘以 $2\pi i$ 得到 $2\pi/\sqrt{5}$。

公式 $2\pi/\sqrt{a^{2}-b^{2}}$ 取 $a = 3$、$b = 2$ 给出同一个值，因为 $a^{2}-b^{2} = 5$。
:::
:::

::: exercise 四次方 {level=3 check="pi/sqrt(2)"}
用留数计算 $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{4}+1}$。要附上说明弧消失的那个估计。
::: hint
上半平面内的极点是 $e^{i\pi/4}$ 与 $e^{i 3\pi/4}$。在 $z^{4}+1 = 0$ 的单根处，$1/(z^{4}+1)$ 的留数是 $1/(4z^{3}) = -z/4$。
:::
::: solution
被积函数 $f(z) = 1/(z^{4}+1)$ 在 $z^{4} = -1 = e^{i\pi + i 2\pi k}$ 处有单极点。四个根是 $e^{i(\pi/4 + k\pi/2)}$，$k = 0, 1, 2, 3$。位于上半平面的是
$$
z_1 = e^{i\pi/4} = \frac{1+i}{\sqrt{2}}, \qquad z_2 = e^{i 3\pi/4} = \frac{-1+i}{\sqrt{2}}.
$$
用 [[#thm-lorentz]] 的逆时针半圆围道闭合，半径 $R > 1$。在弧上，$\abs{z^{4}+1} \ge R^{4}-1$，长度是 $\pi R$，且
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi R}{R^{4}-1} \to 0
$$
当 $R \to \infty$。分母 $h(z) = z^{4}+1$ 的单零点处的留数是 $1/h'(z) = 1/(4z^{3})$。由 $z^{4} = -1$ 有 $1/z^{3} = -z$，所以 $1/(4z^{3}) = -z/4$。$z_1$ 与 $z_2$ 处的留数之和是
$$
-\frac{1}{4}\left(e^{i\pi/4}+e^{i 3\pi/4}\right) = -\frac{1}{4}\cdot\frac{(1+i)+(-1+i)}{\sqrt{2}} = -\frac{1}{4}\cdot\frac{2i}{\sqrt{2}} = -\frac{i\sqrt{2}}{4}.
$$
乘以 $2\pi i$：
$$
2\pi i\left(-\frac{i\sqrt{2}}{4}\right) = \frac{2\pi\sqrt{2}}{4} = \frac{\pi}{\sqrt{2}}.
$$
下半平面的极点在围道之外，没有被加进来。对实积分做数值求积，与 $\pi/\sqrt{2} = 2.22144146908$ 相符，相符到双精度对这个光滑、快速衰减的被积函数所能返回的位数。
:::
:::

::: exercise 单位圆上的共轭 {level=3}
计算 $\displaystyle\int_{\abs{z}=1} \overline{z}\,\dd z$，圆取逆时针方向。解释为什么这个结果与 [[#thm-cauchy]] 不矛盾。
::: hint
在单位圆上，$\overline{z} = 1/z$。若不想用这个恒等式，也可以参数化 $z = e^{i\theta}$。
:::
::: solution
参数化 $z = e^{i\theta}$，$\theta$ 从 $0$ 到 $2\pi$。则 $\overline{z} = e^{-i\theta}$，$\dd z = i e^{i\theta}\,\dd\theta$，于是
$$
\overline{z}\,\dd z = e^{-i\theta}\cdot i e^{i\theta}\,\dd\theta = i\,\dd\theta.
$$
积分是 $\int_{0}^{2\pi} i\,\dd\theta = 2\pi i$。同一个计算也就是那个观察：在 $\abs{z} = 1$ 上 $\overline{z} = 1/z$，而 $a = 0$ 的 [[#eq-circle]] 给出 $\int \dd z/z = 2\pi i$。

[[#thm-cauchy]] 用不上，因为它的假设不满足。函数 $\overline{z}$ 在任何一点都不解析：[[#ex-cr]] 已经表明柯西–黎曼方程处处不成立。非解析函数沿闭路径的积分未必为零，而这个就不是零。这个计算是一个提醒：作为平面到平面的映射，光滑并不是那条定理所使用的假设。
:::
:::
