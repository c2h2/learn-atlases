拉格朗日方程是 $n$ 个坐标的 $n$ 个二阶微分方程。要启动一个运动，你必须给出 $2n$ 个数——坐标与它们的速度——而系统在任一时刻的状态就是这份 $2n$ 个数的清单。哈密顿的重述对此当真了。它用广义动量 $p_j = \partial L/\partial\dot q_j$ 取代速度，把 $q$ 与 $p$ 当作 $2n$ 维**相空间**上的独立坐标，并把动力学写成 $2n$ 个一阶方程，形式对称得惊人：

$$
\dot q_j = \pdv{H}{p_j}, \qquad \dot p_j = -\pdv{H}{q_j}.
$$

对任何单条轨道它都不会预言出新的东西：哈密顿方程与拉格朗日方程等价。赢得的是结构。运动成为相空间上的流，而这个流保持体积不变——这就是刘维尔定理，统计力学的根基。守恒量与对称性由泊松括号统一起来，它几乎原封不动地活进了量子力学，成为对易子。而坐标的换法可以比拉格朗日图像灵活得多：正则变换能把 $q$ 与 $p$ 混在一起。

本章从 [[analytical-mechanics/lagrangian]] 的拉格朗日量出发建立这套结构。在那里定义的能量函数 $h$ 成为哈密顿量，诺特守恒量成为对称性的生成元。

## 勒让德变换 {#legendre}

从 $L(q, \dot q, t)$ 转到 $H(q, p, t)$，是用速度的共轭斜率换掉速度本身。做这件事的运算比哈密顿更古老，与力学毫无关系。

::: definition 勒让德变换 {#def-legendre}
设 $f(x)$ 二阶可导且 $f''(x) > 0$，于是 $f'$ 严格增加。$f$ 的**勒让德变换**是斜率 $p = f'(x)$ 的函数，定义为

$$
g(p) = px - f(x), \qquad\text{其中 } x = x(p) \text{ 满足 } f'(x) = p.
$$

对多元的 $f(x_1, \dots, x_n)$（黑塞矩阵正定），$g(p_1, \dots, p_n) = \sum_jp_jx_j - f$，其中 $p_j = \partial f/\partial x_j$。
:::

关键性质是这个变换自身之逆，并且它交换变量与斜率的角色：

$$
\deriv{g}{p} = x + p\deriv{x}{p} - f'(x)\deriv{x}{p} = x.
$$

于是 $g$ 的斜率就是原来的变量，再对 $g$ 变换一次便回到 $f$。对 $f = \frac12mx^2$，$p = mx$ 且 $g = p\cdot p/m - \frac12m(p/m)^2 = p^2/(2m)$。动能作为速度的函数与作为动量的函数互为勒让德变换。在 [[thermodynamics]] 中，同样的运算把内能变成焓和各种自由能。

### 哈密顿量

::: definition 哈密顿量 {#def-hamiltonian}
设 $L(q, \dot q, t)$ 是一个拉格朗日量，方程 $p_j = \partial L/\partial\dot q_j(q, \dot q, t)$ 可以反解出速度，$\dot q_j = \dot q_j(q, p, t)$。**哈密顿量**是 $L$ 对速度的勒让德变换，

$$
H(q, p, t) = \sum_{j=1}^np_j\dot q_j - L(q, \dot q, t),
$$ {#eq-hamiltonian}

其中右端每个 $\dot q_j$ 都换成它用 $q$、$p$ 与 $t$ 表示的表达式。
:::

哈密顿量就是 [[analytical-mechanics/lagrangian#def-energy-function]] 的能量函数 $h$ 换了一组变量来写。特别地，当 $T$ 对速度是二次的且 $V$ 与速度无关时，$H = T + V$ 以动量表示。

::: theorem 哈密顿方程 {#thm-hamilton-eqs}
若 $q(t)$ 满足拉格朗日方程且 $p_j(t) = \partial L/\partial\dot q_j$，则

$$
\dot q_j = \pdv{H}{p_j}, \qquad \dot p_j = -\pdv{H}{q_j}, \qquad j = 1, \dots, n,
$$ {#eq-hamilton}

并且还有 $\partial H/\partial t = -\partial L/\partial t$，以及沿运动 $\dd H/\dd t = \partial H/\partial t$。反过来，[[#eq-hamilton]] 的每个解都给出拉格朗日方程的解。
:::

::: proof
用两种方式计算 $H$ 的微分。由 [[#eq-hamiltonian]] 的定义，暂把 $q$、$\dot q$、$p$ 与 $t$ 当作独立变量，

$$
\dd H = \sum_j\bigl(\dot q_j\,\dd p_j + p_j\,\dd\dot q_j\bigr) - \sum_j\left(\pdv{L}{q_j}\dd q_j + \pdv{L}{\dot q_j}\dd\dot q_j\right) - \pdv{L}{t}\dd t.
$$

含 $\dd\dot q_j$ 的项相消，因为 $p_j = \partial L/\partial\dot q_j$。这个相消正是勒让德变换的全部要点：$H$ 对 $\dot q$ 的依赖只经由 $q$、$p$ 与 $t$ 发生。于是

$$
\dd H = \sum_j\left(\dot q_j\,\dd p_j - \pdv{L}{q_j}\dd q_j\right) - \pdv{L}{t}\dd t.
$$

另一方面，作为 $(q, p, t)$ 的函数，$\dd H = \sum_j(\partial H/\partial q_j\,\dd q_j + \partial H/\partial p_j\,\dd p_j) + \partial H/\partial t\,\dd t$。比较系数，

$$
\pdv{H}{p_j} = \dot q_j, \qquad \pdv{H}{q_j} = -\pdv{L}{q_j}, \qquad \pdv{H}{t} = -\pdv{L}{t}.
$$

第一式就是第一条哈密顿方程；它恒成立，因为它是 $p = \partial L/\partial\dot q$ 的反演。拉格朗日方程说 $\dot p_j = \partial L/\partial q_j$，由第二关系即 $\dot p_j = -\partial H/\partial q_j$。反过来，若 [[#eq-hamilton]] 成立，则第一式说 $p_j$ 正是速度 $\dot q_j$ 对应的动量，第二式连同第二关系说 $\dot p_j = \partial L/\partial q_j$，正是拉格朗日方程。最后，沿解，

$$
\deriv{H}{t} = \sum_j\left(\pdv{H}{q_j}\dot q_j + \pdv{H}{p_j}\dot p_j\right) + \pdv{H}{t} = \sum_j\left(\pdv{H}{q_j}\pdv{H}{p_j} - \pdv{H}{p_j}\pdv{H}{q_j}\right) + \pdv{H}{t} = \pdv{H}{t}.
$$
:::

计算流程是：求 $L$；算 $p_j = \partial L/\partial\dot q_j$；反解 $\dot q_j$；构成 $H = \sum p_j\dot q_j - L$ 并用 $q, p$ 表示；写出 $2n$ 个方程。

::: example 相空间中的有心力运动 {#ex-central-H}
用极坐标写出平面上质量为 $\mu$、势为 $U(r)$ 的粒子的哈密顿量与哈密顿方程。
::: solution
由 $L = \frac12\mu(\dot r^2 + r^2\dot\theta^2) - U(r)$，动量为

$$
p_r = \mu\dot r, \qquad p_\theta = \mu r^2\dot\theta,
$$

于是 $\dot r = p_r/\mu$，$\dot\theta = p_\theta/(\mu r^2)$。因此

$$
H = p_r\frac{p_r}{\mu} + p_\theta\frac{p_\theta}{\mu r^2} - \frac12\mu\left(\frac{p_r^2}{\mu^2} + r^2\frac{p_\theta^2}{\mu^2r^4}\right) + U(r) = \frac{p_r^2}{2\mu} + \frac{p_\theta^2}{2\mu r^2} + U(r).
$$

哈密顿方程 [[#eq-hamilton]] 是

$$
\dot r = \frac{p_r}{\mu}, \qquad \dot\theta = \frac{p_\theta}{\mu r^2}, \qquad \dot p_r = \frac{p_\theta^2}{\mu r^3} - U'(r), \qquad \dot p_\theta = 0.
$$

$H$ 中不出现角坐标，所以其动量守恒，$p_\theta = \ell$。固定 $p_\theta$ 后，第一与第三个方程构成一个自由度为一的哈密顿系统，$H = p_r^2/(2\mu) + U_{\mathrm{eff}}(r)$，一行之内就得到了 [[analytical-mechanics/central-forces#def-effective]] 的有效势能化简。在哈密顿力学中，一个循环坐标消去相空间的*两*个维度：其动量是一个常数，而坐标本身事后再由积分 $\dot\theta$ 求出。
:::
:::

::: example 带电粒子的哈密顿量 {#ex-charged-H}
从 [[analytical-mechanics/lagrangian#prop-charged]] 的拉格朗日量 $L = \frac12m\dot{\mathbf{r}}^2 - q\varphi + q\dot{\mathbf{r}}\cdot\mathbf{A}$ 出发求哈密顿量，并证明：尽管它含有 $\mathbf{A}$，其值却等于动能加静电势能。
::: solution
正则动量是 $\mathbf{p} = \partial L/\partial\dot{\mathbf{r}} = m\dot{\mathbf{r}} + q\mathbf{A}$，故 $\dot{\mathbf{r}} = (\mathbf{p} - q\mathbf{A})/m$。于是

$$
H = \mathbf{p}\cdot\dot{\mathbf{r}} - L = \mathbf{p}\cdot\frac{\mathbf{p} - q\mathbf{A}}{m} - \frac{(\mathbf{p} - q\mathbf{A})^2}{2m} + q\varphi - q\mathbf{A}\cdot\frac{\mathbf{p} - q\mathbf{A}}{m}.
$$

第一项与最后一项合并成 $(\mathbf{p} - q\mathbf{A})^2/m$，所以

$$
H = \frac{(\mathbf{p} - q\mathbf{A})^2}{2m} + q\varphi.
$$

因为 $\mathbf{p} - q\mathbf{A} = m\dot{\mathbf{r}}$，$H$ 的值是 $\frac12m\dot{\mathbf{r}}^2 + q\varphi$：磁场不做功，不出现在能量之中。但作为 $(\mathbf{r}, \mathbf{p})$ 的*函数*，$H$ 依赖于 $\mathbf{A}$，而这个依赖通过 $\dot{\mathbf{p}} = -\nabla H$ 产生磁力。这条"把 $\mathbf{p}$ 换成 $\mathbf{p} - q\mathbf{A}$"的规则称为**最小耦合**，[[quantum-1]] 中电磁学就是这样进入薛定谔方程的。
:::
:::

::: warning 不要把守恒动量代回拉格朗日量
在刚才的例子里，人们很想把 $\dot\theta = \ell/(\mu r^2)$ 代入 $L$，得到一个一维拉格朗日量 $\frac12\mu\dot r^2 + \ell^2/(2\mu r^2) - U$。它的拉格朗日方程里离心力的符号不对。消去循环坐标要在哈密顿量里做，那里 $p_\theta$ 是独立变量，可以合法地取为常数。用拉格朗日语言，正确的化简函数是**劳斯函数** $R = L - p_\theta\dot\theta$，它给出 $\frac12\mu\dot r^2 - \ell^2/(2\mu r^2) - U$，符号正确。
:::

## 相空间 {#phase-space}

系统的状态是 $2n$ 维相空间中的一点 $(q, p)$，哈密顿方程给每一点配上一个速度。由一阶方程的存在唯一性定理，过每一点恰好有一条解，所以相空间轨道永不相交。对不含时的 $H$，每条轨道都位于等值集 $H(q, p) = E$ 上。

对一个自由度的情形，这已足以在不解任何方程的情况下画出全部轨道：相图就是 $H$ 的等值线族。

::: example 单摆的相图 {#ex-pendulum-phase}
一个质量 $m$、长 $\ell$ 的单摆，角 $\theta$ 从竖直向下量起。求它的哈密顿量并描述其相图，包括把摆动与转圈两种运动分开的临界能量。
::: solution
由 $L = \frac12m\ell^2\dot\theta^2 + mg\ell\cos\theta$，动量是 $p = m\ell^2\dot\theta$，即关于悬挂点的角动量，且

$$
H = \frac{p^2}{2m\ell^2} - mg\ell\cos\theta.
$$

哈密顿方程是 $\dot\theta = p/(m\ell^2)$ 与 $\dot p = -mg\ell\sin\theta$。平衡点在两者皆为零处：$p = 0$ 且 $\theta = 0$ 或 $\pi$。

轨道是曲线 $p = \pm\sqrt{2m\ell^2(E + mg\ell\cos\theta)}$。当 $-mg\ell < E < mg\ell$ 时，平方根只在 $0$ 附近一段 $\theta$ 范围内为实，曲线是闭合圈：单摆来回摆动（**振动**，libration）。当 $E > mg\ell$ 时它对一切实 $\theta$ 为实，两条分支是分开的波浪线，一条 $p > 0$，一条 $p < 0$：单摆越过顶点转圈（**转动**，rotation）。分界 $E = mg\ell$ 是**分离线**，即在那对曲线 $p = \pm 2m\ell\sqrt{g\ell}\cos(\theta/2)$ 上，它们在不稳定平衡 $\theta = \pm\pi$ 处相交。分离线上的运动在 $t \to \infty$ 时趋近倒立位置而永不到达。

在 $\theta = 0$ 与 $p = 0$ 附近，$H \approx p^2/(2m\ell^2) + \frac12mg\ell\theta^2 - mg\ell$，等值线是椭圆：稳定平衡是相图的**中心**。在 $\theta = \pi$ 附近，写 $\theta = \pi + \phi$：$H \approx p^2/(2m\ell^2) - \frac12mg\ell\phi^2 + mg\ell$，是在原点相交的双曲线对，一个**鞍点**。哪些平衡稳定，从图上就能读出来。
:::
:::

::: widget plot
f: sqrt(2*(E + cos(x))); -sqrt(2*(E + cos(x)))
x: -2pi, 2pi
y: -3.5, 3.5
sliders: E=0.5:-0.95:2.5:0.01
piticks: true
caption: 单摆哈密顿量 $H = \frac12p^2 - \cos\theta$ 的等值线，采用 $m = \ell = g = 1$ 的单位制；横轴是 $\theta$，纵轴是 $p$。当 $E$ 介于 $-1$ 与 $1$ 之间，看到的是绕 $\theta = 0$ 及其在 $\pm 2\pi$ 处副本的闭合圈：摆动。把 $E$ 推到 $1$，圈在 $\theta = \pm\pi$ 处相切，形成分离线；超过 $1$，曲线散开成开放的波，越过顶点的转动。在 $E = -1$ 附近，圈缩成小椭圆，即谐振子极限。
:::

### 刘维尔定理

下面不再跟踪单个初始状态，而是跟踪相空间的整块区域：一团初始条件，正如统计力学里的做法，或一次初始测量的不确定度。每个点沿自己的轨道运动，区域被流携带并变形。哈密顿方程有一个控制其体积如何变化的特殊性质。

::: theorem 刘维尔定理 {#thm-liouville}
设 $D_0$ 是相空间中体积有限的区域，$D_t$ 是它在哈密顿方程 [[#eq-hamilton]] 的流下经过时间 $t$ 的像，哈密顿量 $H(q, p, t)$ 任意。则 $D_t$ 的 $2n$ 维体积与 $D_0$ 相同。
:::

::: proof
写 $\mathbf{x} = (q_1, \dots, q_n, p_1, \dots, p_n)$，把哈密顿方程写成 $\dot{\mathbf{x}} = \mathbf{v}(\mathbf{x}, t)$。这个速度场的散度是

$$
\nabla\cdot\mathbf{v} = \sum_j\left[\pdv{}{q_j}\left(\pdv{H}{p_j}\right) + \pdv{}{p_j}\left(-\pdv{H}{q_j}\right)\right] = 0,
$$

因为 $H$ 的混合偏导可交换。

设 $\boldsymbol\Phi_t$ 是把每个初始点 $\mathbf{x}_0$ 映到时刻 $t$ 位置的映射，$J(t) = \det\bigl(\partial\boldsymbol\Phi_t/\partial\mathbf{x}_0\bigr)$ 是其雅可比行列式，于是 $\mathrm{vol}(D_t) = \int_{D_0}\abs{J}\,\dd^{2n}x_0$。把 $\dot{\mathbf{x}} = \mathbf{v}$ 对初始条件求导可知，雅可比矩阵 $A(t) = \partial\boldsymbol\Phi_t/\partial\mathbf{x}_0$ 满足

$$
\dot A = DA, \qquad A(0) = \mathbb 1, \qquad D_{ab} = \pdv{v_a}{x_b}\Big|_{\mathbf{x}(t)}.
$$

对任何可微可逆矩阵，$\dd(\det A)/\dd t = \det A\,\tr(A^{-1}\dot A)$（雅可比公式，它来自展开 $\det(A + \dot A\,\dd t) = \det A\det(\mathbb 1 + A^{-1}\dot A\,\dd t) = \det A\,(1 + \tr(A^{-1}\dot A)\,\dd t + O(\dd t^2))$）。此处 $A^{-1}\dot A = A^{-1}DA$，其迹为 $\tr D = \nabla\cdot\mathbf{v} = 0$。于是 $\dot J = 0$，$J(t) = J(0) = 1$，体积不变。
:::

相空间的那团云可以在一个方向被拉长、在另一个方向被挤扁，被折叠，被抻成长长的细丝；它的体积保持不变。两个推论在整个物理学里都重要。第一，哈密顿系统没有**吸引子**：不存在这样一个相空间区域，有一群正测度的轨道向它收敛——那样的收敛会缩小体积。阻尼单摆螺旋地卷进平衡点，但它不是哈密顿的；正是摩擦允许了收缩。第二，能量面上的均匀密度被流保持，这正是 [[statistical-mechanics/microcanonical]] 微正则系综的出发点。

::: example 谐振子的相空间面积 {#ex-sho-area}
对 $H = p^2/(2m) + \frac12m\omega^2q^2$，求能量 $E$ 的轨道所围面积，并证明流把正方形 $[0, \eps]\times[0, \eps]$ 映为等面积的区域。
::: solution
轨道 $p^2/(2mE) + q^2/(2E/(m\omega^2)) = 1$ 是半轴为 $\sqrt{2mE}$（$p$ 方向）与 $\sqrt{2E/(m\omega^2)}$（$q$ 方向）的椭圆，所以面积为

$$
\pi\sqrt{2mE}\sqrt{\frac{2E}{m\omega^2}} = \frac{2\pi E}{\omega}.
$$

除以 $2\pi$ 得到**作用变量** $J = E/\omega$，它下文还会再出现。

哈密顿方程 $\dot q = p/m$、$\dot p = -m\omega^2q$ 的解是

$$
\begin{pmatrix}q\\p\end{pmatrix} = \begin{pmatrix}\cos\omega t & \sin\omega t/(m\omega)\\ -m\omega\sin\omega t & \cos\omega t\end{pmatrix}\begin{pmatrix}q_0\\p_0\end{pmatrix}.
$$

流是线性的，所以把正方形映成平行四边形，其面积是正方形面积乘矩阵行列式的绝对值：$\cos^2\omega t + \sin^2\omega t = 1$。任何时刻面积都是 $\eps^2$，正如 [[#thm-liouville]] 所要求。平行四边形旋转并错切，在 $p$ 方向伸长时就在 $q$ 方向压缩。
:::
:::

::: quiz
一个无摩擦单摆的初始条件云起初是相空间中分离线附近的小圆盘。很久之后，哪个描述是对的？
- [ ] 它已收缩成稳定平衡处的一个点。
- [ ] 它保持了圆形的形状和面积，因为运动是周期的。
- [x] 它被抻成绕中心盘旋的又长又细的细丝，面积与最初相同。
- [ ] 它的面积增大了，因为分离线附近的相邻轨道彼此分离。
::: solution
在分离线附近，周期对能量强烈依赖，所以圆盘里能量略有不同的点以不同快慢绕行，圆盘被错切成一条长长的螺旋细丝。刘维尔定理锁定了它的面积。它不能收缩成点，因为没有摩擦；也不能增大：一个方向上轨道的分离总被另一个方向上的压缩补偿。
:::
:::

## 泊松括号 {#poisson}

任一量 $f(q, p, t)$ 沿轨道的变化率为

$$
\deriv{f}{t} = \sum_j\left(\pdv{f}{q_j}\dot q_j + \pdv{f}{p_j}\dot p_j\right) + \pdv{f}{t} = \sum_j\left(\pdv{f}{q_j}\pdv{H}{p_j} - \pdv{f}{p_j}\pdv{H}{q_j}\right) + \pdv{f}{t}.
$$

求和号里出现的这个组合太过常见，值得给它一个名字。

::: definition 泊松括号 {#def-poisson}
相空间上两个函数 $f(q, p, t)$ 与 $g(q, p, t)$ 的**泊松括号**是

$$
\{f, g\} = \sum_{j=1}^n\left(\pdv{f}{q_j}\pdv{g}{p_j} - \pdv{f}{p_j}\pdv{g}{q_j}\right).
$$ {#eq-poisson}
:::

用这个记号，任何量的运动方程是

$$
\deriv{f}{t} = \{f, H\} + \pdv{f}{t},
$$ {#eq-poisson-eom}

而哈密顿方程本身就是 $\dot q_j = \{q_j, H\}$ 与 $\dot p_j = \{p_j, H\}$。一个不显含时间的量守恒，当且仅当它与 $H$ 的括号为零。

::: proposition 泊松括号的性质 {#prop-poisson}
对相空间上一切函数 $f$、$g$、$k$ 与常数 $a$、$b$：

1. 反对称性：$\{f, g\} = -\{g, f\}$，故 $\{f, f\} = 0$。
2. 线性：$\{af + bg, k\} = a\{f, k\} + b\{g, k\}$。
3. 莱布尼茨法则：$\{fg, k\} = f\{g, k\} + \{f, k\}g$。
4. 雅可比恒等式：$\{f, \{g, k\}\} + \{g, \{k, f\}\} + \{k, \{f, g\}\} = 0$。
5. 正则括号：$\{q_j, q_k\} = 0$，$\{p_j, p_k\} = 0$，$\{q_j, p_k\} = \delta_{jk}$。
:::

::: proof
性质 1 到 3 与 5 由 [[#eq-poisson]] 和求导的乘积法则直接得到；例如 $\{q_j, p_k\} = \sum_i(\delta_{ij}\delta_{ik} - 0) = \delta_{jk}$。至于雅可比恒等式，写 $\mathbf{x} = (q, p)$，$\{f, g\} = \sum_{a,b}\Omega_{ab}\,\partial_af\,\partial_bg$，其中 $\Omega$ 是常数反对称 $2n\times 2n$ 矩阵，$\Omega_{q_jp_j} = 1$、$\Omega_{p_jq_j} = -1$。循环和的每一项恰好含一个二阶导数。含 $k$ 的二阶导数的项只来自前两个括号：

$$
\{f, \{g, k\}\} \ni \sum\Omega_{ab}\Omega_{cd}\,\partial_af\,\partial_cg\,\partial_b\partial_dk, \qquad \{g, \{k, f\}\} \ni \sum\Omega_{ab}\Omega_{cd}\,\partial_ag\,\partial_df\,\partial_b\partial_ck.
$$

把第二个和的求和下标作 $(a, b, c, d) \to (c, d, b, a)$ 改名。它变成 $\sum\Omega_{cd}\Omega_{ba}\,\partial_cg\,\partial_af\,\partial_d\partial_bk = -\sum\Omega_{ab}\Omega_{cd}\,\partial_af\,\partial_cg\,\partial_b\partial_dk$，用到 $\Omega_{ba} = -\Omega_{ab}$ 与二阶导数的对称性。两项相消。由恒等式的循环对称性，含 $f$ 与 $g$ 的二阶导数的项同样相消。
:::

::: theorem 泊松定理 {#thm-poisson}
若 $f$ 与 $g$ 是不显含时间的守恒量，则 $\{f, g\}$ 也守恒。
:::

::: proof
由 [[#eq-poisson-eom]]，$\{f, H\} = 0$ 且 $\{g, H\} = 0$。在雅可比恒等式中取 $k = H$，得

$$
\{H, \{f, g\}\} = -\{f, \{g, H\}\} - \{g, \{H, f\}\} = -\{f, 0\} - \{g, 0\} = 0,
$$

于是 $\dd\{f, g\}/\dd t = \{\{f, g\}, H\} = 0$。
:::

::: example 角动量的括号 {#ex-angular-brackets}
对三维直角坐标与动量描述的粒子，证明 $\{L_x, L_y\} = L_z$，其中 $\mathbf{L} = \mathbf{r}\times\mathbf{p}$。由此推出：角动量有两个分量守恒的粒子，第三个分量也守恒。
::: solution
$L_x = yp_z - zp_y$，$L_y = zp_x - xp_z$。由线性、莱布尼茨法则与正则括号，只有同时含有一个坐标和它自己的动量的配对有贡献：

$$
\{L_x, L_y\} = \{yp_z, zp_x\} - \{yp_z, xp_z\} - \{zp_y, zp_x\} + \{zp_y, xp_z\}.
$$

第一项中 $\{yp_z, zp_x\} = yp_x\{p_z, z\} = -yp_x$。第二、三项为零，因为它们都不含与自身共轭动量配对的坐标：$\{yp_z, xp_z\}$ 涉及 $y, x, p_z$，$\{zp_y, zp_x\}$ 涉及 $z, p_y, p_x$。第四项中 $\{zp_y, xp_z\} = p_yx\{z, p_z\} = xp_y$。所以

$$
\{L_x, L_y\} = xp_y - yp_x = L_z.
$$

由循环对称性，$\{L_y, L_z\} = L_x$、$\{L_z, L_x\} = L_y$。若 $L_x$ 与 $L_y$ 都守恒，泊松定理说 $\{L_x, L_y\} = L_z$ 守恒。在量子力学中同样的代数变成 $[\hat L_x, \hat L_y] = i\hbar\hat L_z$，即 [[quantum-1/angular-momentum]] 的出发点。
:::
:::

::: quiz
一维自由粒子，$H = p^2/(2m)$。下列哪些量守恒？
- [x] $p$
- [ ] $q$
- [x] $q - pt/m$
- [ ] $qp$
::: solution
$\{p, H\} = 0$，所以 $p$ 守恒。$\{q, H\} = p/m \neq 0$，所以 $q$ 不守恒。对显含时间的 $f = q - pt/m$，[[#eq-poisson-eom]] 给出 $\dd f/\dd t = \{q, H\} - (t/m)\{p, H\} + \partial f/\partial t = p/m - 0 - p/m = 0$：它就是初始位置，因为粒子匀速运动而守恒。最后 $\{qp, H\} = p\{q, H\} = p^2/m \neq 0$。
:::
:::

## 正则变换 {#canonical}

在拉格朗日力学里我们可以用任何坐标 $q$。在哈密顿力学里，允许的变量变换范围更大：新坐标 $Q$ 与新动量 $P$ 都可以同时依赖旧的 $q$ 和 $p$。要求是哈密顿方程保持其形式。

::: definition 正则变换 {#def-canonical}
可逆变换 $Q_j = Q_j(q, p)$、$P_j = P_j(q, p)$ 称为**正则**的，如果它保持正则括号：

$$
\{Q_j, Q_k\} = 0, \qquad \{P_j, P_k\} = 0, \qquad \{Q_j, P_k\} = \delta_{jk},
$$ {#eq-canonical}

其中括号用旧变量 $(q, p)$ 计算。
:::

这个定义的要点在于它保持哈密顿方程的形式：在新变量下，取新哈密顿量 $K(Q, P) = H(q(Q, P), p(Q, P))$，运动服从 $\dot Q_j = \partial K/\partial P_j$、$\dot P_j = -\partial K/\partial Q_j$（[[#exr-canonical-form]]）。对一个自由度，$\{Q, P\} = 1$ 说的是映射 $(q, p) \mapsto (Q, P)$ 的雅可比行列式为 $1$：平面的正则变换恰好就是保面积变换。一般地它们保持相空间体积，于是刘维尔定理有了第二种读法：哈密顿系统经过时间 $t$ 的流本身就是正则变换。

造正则变换的一个方便途径是**生成函数**。若 $F_2(q, P, t)$ 是满足 $\det(\partial^2F_2/\partial q\,\partial P) \neq 0$ 的任意函数，则关系

$$
p_j = \pdv{F_2}{q_j}, \qquad Q_j = \pdv{F_2}{P_j}, \qquad K = H + \pdv{F_2}{t}
$$ {#eq-generating}

隐式地定义一个正则变换。理由（[[#exr-generating]] 中给出大意）是：相空间形式的哈密顿原理 $\delta\int(\sum p\dot q - H)\,\dd t = 0$ 在被积函数改变一个对时间的全导数时不变，正如 [[analytical-mechanics/lagrangian#prop-gauge]] 中那样。恒等式 $F_2 = \sum_jq_jP_j$ 生成恒等变换；$F_2 = \sum_jf_j(q)P_j$ 生成坐标变换 $Q = f(q)$ 并把动量作相应变换，这说明拉格朗日的任何坐标变换都是正则变换的特例。

::: example 谐振子的作用–角变量 {#ex-action-angle}
对 $H = p^2/(2m) + \frac12m\omega^2q^2$，证明

$$
q = \sqrt{\frac{2J}{m\omega}}\sin\varphi, \qquad p = \sqrt{2Jm\omega}\cos\varphi
$$

定义从 $(q, p)$ 到 $(\varphi, J)$ 的正则变换，并在新变量下求解运动。
::: solution
验证反方向的括号最容易：$\{q, p\}_{\varphi, J} = 1$，以 $\varphi$ 为坐标、$J$ 为动量计算；一个变换与它的逆同时正则。我们需要

$$
\pdv{q}{\varphi} = \sqrt{\frac{2J}{m\omega}}\cos\varphi, \quad \pdv{q}{J} = \frac{\sin\varphi}{\sqrt{2Jm\omega}}, \quad \pdv{p}{\varphi} = -\sqrt{2Jm\omega}\sin\varphi, \quad \pdv{p}{J} = \sqrt{\frac{m\omega}{2J}}\cos\varphi.
$$

于是

$$
\{q, p\}_{\varphi, J} = \pdv{q}{\varphi}\pdv{p}{J} - \pdv{q}{J}\pdv{p}{\varphi} = \cos^2\varphi + \sin^2\varphi = 1.
$$

所以变换是正则的。代入 $H$，

$$
K = \frac{2Jm\omega\cos^2\varphi}{2m} + \frac12m\omega^2\frac{2J}{m\omega}\sin^2\varphi = \omega J.
$$

新哈密顿量不依赖 $\varphi$，所以 $\varphi$ 是循环坐标：$\dot J = -\partial K/\partial\varphi = 0$，$\dot\varphi = \partial K/\partial J = \omega$。于是 $J$ 守恒，等于 $E/\omega$，而 $\varphi = \omega t + \varphi_0$，代回即得 $q = \sqrt{2E/(m\omega^2)}\sin(\omega t + \varphi_0)$。新动量 $J$ 是 [[#ex-sho-area]] 的相空间面积除以 $2\pi$：即**作用量**。新坐标是**角**，均匀地增加。每个有界运动的可积系统都能化成这种形式 $K = K(J_1, \dots, J_n)$——在它的每个不变环面上。
:::
:::

::: remark 哈密顿–雅可比方程
把 [[#ex-action-angle]] 的想法推到极限，可以寻找一个新哈密顿量为零的正则变换，于是所有新坐标与新动量都是常数。它的生成函数 $S(q, P, t)$ 必须满足**哈密顿–雅可比方程** $H(q, \partial S/\partial q, t) + \partial S/\partial t = 0$，一个一阶偏微分方程（只有一个）。它的解 $S$ 是哈密顿主函数：沿实际路径的作用量看作端点的函数。薛定谔正是受这个方程的引导得到他的波动方程，二者是波动力学的对应物：对 $\psi = e^{iS/\hbar}$，薛定谔方程在 $\hbar \to 0$ 时化为哈密顿–雅可比方程。
:::

## 尊重结构的数值积分 {#symplectic}

刘维尔定理有实用的一面。哈密顿方程的数值方法，是用一个把状态推进一个时间步的映射来取代精确的流。若这个映射不保持相空间面积，误差就会系统地累积，对行星轨道或分子动力学的长时间计算会以一种特有的方式出错。单步映射本身就是正则变换的方法称为**辛**的。

对 $H = \frac12(p^2 + q^2)$，**显式欧拉**方法 $q_{n+1} = q_n + hp_n$、$p_{n+1} = p_n - hq_n$ 的雅可比行列式为 $1 + h^2$，所以每步把一切面积放大 $1 + h^2$，能量每步恰好增大这个因子。**辛欧拉**方法先更新 $p$，再用新的 $p$ 更新 $q$，其雅可比行列式恰好是 $1$。**蛙跳法**（leapfrog，即 Störmer–Verlet 方法）把动量更新劈成两个半步，分置于位置更新两侧，它是辛的并且二阶精度。下面的清单从 $q = 1$、$p = 0$ 出发（精确能量为 $0.5$），对 $h = 0.1$ 的 $1000$ 步比较这三种方法。

```python
# 谐振子 H = (p^2 + q^2)/2，精确能量 0.5，步长 h = 0.1
h, steps = 0.1, 1000                 # 积分到 t = 100

def euler(q, p):                     # 显式欧拉
    return q + h*p, p - h*q

def symplectic_euler(q, p):          # 先更新 p，再用新的 p 更新 q
    p = p - h*q
    return q + h*p, p

def leapfrog(q, p):                  # Stormer-Verlet：半步踢、漂移、半步踢
    p = p - 0.5*h*q
    q = q + h*p
    p = p - 0.5*h*q
    return q, p

for name, step in [("explicit Euler", euler), ("symplectic Euler", symplectic_euler), ("leapfrog", leapfrog)]:
    q, p = 1.0, 0.0
    Emin = Emax = 0.5
    for n in range(steps):
        q, p = step(q, p)
        E = 0.5*(p*p + q*q)
        Emin, Emax = min(Emin, E), max(Emax, E)
    print("%-17s E(100) = %10.4f   min E = %.4f   max E = %.4f" % (name, E, Emin, Emax))

# 一步之后相空间中一个小三角形的面积：该步雅可比矩阵的行列式
for name, J in [("explicit Euler", [[1, h], [-h, 1]]), ("symplectic Euler", [[1 - h*h, h], [-h, 1]])]:
    print("%-17s det J = %.4f" % (name, J[0][0]*J[1][1] - J[0][1]*J[1][0]))
```

输出：

```
explicit Euler    E(100) = 10479.5778   min E = 0.5000   max E = 10479.5778
symplectic Euler  E(100) =     0.5213   min E = 0.4762   max E = 0.5263
leapfrog          E(100) =     0.4997   min E = 0.4988   max E = 0.5000
explicit Euler    det J = 1.0100
symplectic Euler  det J = 1.0000
```

显式欧拉在 $1000$ 步后的能量是 $0.5\times 1.01^{1000} = 10\,480$，与预言一致：轨道的振幅已向外螺旋放大了 $145$ 倍。两种辛方法的能量误差都很小，各为 $h$ 与 $h^2$ 量级，来回振荡而从不增长。理由是深刻的：辛方法是另一个略微不同的哈密顿量的精确流，所以它精确地守恒一个邻近的能量。正因如此，太阳系的长期数值积分与多数分子动力学程序都使用辛方法；另见 [[computation/integrating-motion]]。

::: history 勒让德、哈密顿、雅可比与刘维尔
阿德里安-马里·勒让德（Adrien-Marie Legendre）在 1787 年一篇关于最小曲面的论文中引入了他的变换。西莫恩·德尼·泊松（Siméon Denis Poisson）在 1809 年一篇关于行星摄动理论中常数变易的论文里定义了括号，拉格朗日也在同一时期使用过类似的表达式。威廉·罗恩·哈密顿（William Rowan Hamilton）以他 1820 年代的光学研究为根基，1834 年在《哲学会刊》（*Philosophical Transactions*）上发表《动力学中的一般方法》，1835 年又发表第二篇论文，正则方程与主函数都在其中出现。卡尔·古斯塔夫·雅各布·雅可比（Carl Gustav Jacob Jacobi）1837 年展示了如何用哈密顿–雅可比方程求解问题，引入了正则变换，并证明了以他名字命名的恒等式；他 1842–43 年的柯尼斯堡讲义以《动力学讲义》（*Vorlesungen über Dynamik*）之名于 1866 年出版，成了标准著述。约瑟夫·刘维尔（Joseph Liouville）1838 年发表了体积守恒定理，形式是一条关于线性微分方程解的结论；它对统计力学的意义则由玻尔兹曼（Boltzmann）与吉布斯（Gibbs）阐发出来。
:::

## 后续内容 {#leads}

[[analytical-mechanics/chaos]] 研究的正是：当具有两个以上自由度的哈密顿系统的守恒量少到不足以化归为作用–角形式时，会发生什么。统计力学以刘维尔定理为地基，从 [[statistical-mechanics/microcanonical]] 讲起。在 [[quantum-1/formalism]] 中，泊松括号被对易子除以 $i\hbar$ 取代，$\{f, g\} \to [\hat f, \hat g]/(i\hbar)$，而 $\langle q\rangle$ 与 $\langle p\rangle$ 的哈密顿方程成为埃伦费斯特（Ehrenfest）定理。你已经学会的这套结构——带有括号的相空间，以及一个生成流的哈密顿量——是经典动力学与量子动力学的共同语言。

::: summary
- 哈密顿量是拉格朗日量对速度的勒让德变换：$H = \sum_jp_j\dot q_j - L$，其中 $p_j = \partial L/\partial\dot q_j$。它就是相空间变量下的能量函数 $h$，当 $T$ 为二次且 $V$ 与速度无关时等于 $T + V$。
- 哈密顿方程 $\dot q_j = \partial H/\partial p_j$、$\dot p_j = -\partial H/\partial q_j$ 是与拉格朗日方程等价的 $2n$ 个一阶方程；$\dd H/\dd t = \partial H/\partial t$。
- 对一个自由度，相图就是 $H$ 的等值线族；单摆显示出中心、鞍点与 $E = mg\ell$ 处的分离线。
- 刘维尔定理：哈密顿流无散、保持相空间体积，所以哈密顿系统没有吸引子。
- 泊松括号给出 $\dd f/\dd t = \{f, H\} + \partial f/\partial t$，其中 $\{q_j, p_k\} = \delta_{jk}$；两个守恒量的括号守恒，且 $\{L_x, L_y\} = L_z$。
- 正则变换保持括号与哈密顿方程的形式；它们可由 $F_2(q, P)$ 一类函数生成。作用–角变量把谐振子化成 $K = \omega J$。
- 辛积分器保持相空间面积、让能量误差保持有界；显式欧拉这类非辛方法会漂移。
:::

## 习题 {#exercises}

::: exercise 计算一个哈密顿量 {level=1 check="0.25"}
质量 $m = 2.00\,\mathrm{kg}$ 的粒子系在刚度 $k = 8.00\,\mathrm{N/m}$ 的弹簧上，$L = \frac12m\dot q^2 - \frac12kq^2$。求 $H(q, p)$ 与哈密顿方程，并在 $q = 0.200\,\mathrm{m}$、$p = 0.600\,\mathrm{kg\,m/s}$ 处求 $H$ 的值，以焦耳计。
::: solution
$p = m\dot q$，故 $\dot q = p/m$，$H = p^2/m - (\frac12p^2/m - \frac12kq^2) = p^2/(2m) + \frac12kq^2$。哈密顿方程是 $\dot q = p/m$ 与 $\dot p = -kq$，合起来给出 $m\ddot q = -kq$。在给定之点，$H = (0.600)^2/(4.00) + \frac12(8.00)(0.200)^2 = 0.0900 + 0.160 = 0.250\,\mathrm{J}$。
:::
:::

::: exercise 一个括号的计算 {level=1 check="8"}
用 [[#prop-poisson]] 中的性质计算一个自由度的 $\{q^2, p^2\}$，并在 $q = 1$、$p = 2$ 处求值。
::: solution
两次使用莱布尼茨法则：$\{q^2, p^2\} = 2q\{q, p^2\} = 2q\cdot 2p\{q, p\} = 4qp$。在 $q = 1$、$p = 2$ 处为 $8$。直接由 [[#eq-poisson]]：$\partial_q(q^2)\,\partial_p(p^2) - \partial_p(q^2)\,\partial_q(p^2) = 2q\cdot 2p - 0 = 4qp$。
:::
:::

::: exercise 相空间面积 {level=1 check="3*pi"}
一个 $m = 1.00\,\mathrm{kg}$、$\omega = 2.00\,\mathrm{rad/s}$ 的谐振子具有能量 $E = 3.00\,\mathrm{J}$。求它相空间轨道围成的面积，以 $\mathrm{J\,s}$ 计，以及作用变量 $J$。
::: solution
由 [[#ex-sho-area]]，面积为 $2\pi E/\omega = 2\pi(3.00)/(2.00) = 3\pi = 9.42\,\mathrm{J\,s}$，且 $J = E/\omega = 1.50\,\mathrm{J\,s}$。在旧量子论中，玻尔（Bohr）与索末菲（Sommerfeld）要求这个面积是普朗克常数的整数倍，$2\pi J = nh$，由此得 $E = n\hbar\omega$：间隔对了，但少了零点能 $\frac12\hbar\omega$。
:::
:::

::: exercise 越过顶点 {level=2 check="2*sqrt(9.8)"}
一个长 $1.00\,\mathrm{m}$ 的单摆在最低点静止悬挂。用 [[#ex-pendulum-phase]] 的相图求：要使摆锤能越过顶点，至少应给它多大的速度，以 $\mathrm{m/s}$ 计？设摆锤固定在一根刚性轻杆上。
::: solution
越过顶点的转动需要 $E > mg\ell$，即分离线的能量。在最低点 $E = \frac12mv^2 - mg\ell$，所以需要 $\frac12mv^2 > 2mg\ell$，即 $v > 2\sqrt{g\ell} = 2\sqrt{9.80} = 6.26\,\mathrm{m/s}$。恰好以此速度出发，摆锤趋近倒立位置而永远到不了那里，正如分离线上的运动。若用绳代替杆，除非 $v^2 \ge 5g\ell$，绳会在到达顶点之前先松垂，因为绳不会推。
:::
:::

::: exercise 阻尼振子相空间云团的面积 {level=2 check="exp(-2)"}
一个阻尼振子服从 $\dot q = p/m$、$\dot p = -kq - \gamma p$，$\gamma = 0.500\,\mathrm{s^{-1}}$。计算相空间速度场的散度，并求 $4.00\,\mathrm{s}$ 后初始条件云团的面积缩小为原来的几分之几。这与刘维尔定理为什么不矛盾？
::: solution
速度场是 $(p/m, -kq - \gamma p)$，散度为 $\partial_q(p/m) + \partial_p(-kq - \gamma p) = -\gamma$。由 [[#thm-liouville]] 证明中的论证，$\dot J = (\nabla\cdot\mathbf{v})J = -\gamma J$，所以面积按 $e^{-\gamma t}$ 缩小。$4.00\,\mathrm{s}$ 后的因子是 $e^{-2} = 0.135$。这里没有矛盾：这些方程对任何 $H$ 都不是哈密顿方程，因为哈密顿场的散度为零。摩擦项使原点成为一个吸引子，而任何哈密顿系统都没有吸引子。
:::
:::

::: exercise 判别正则变换 {level=2}
对一个自由度，判断下列变换哪些是正则的：(a) $Q = p$，$P = -q$；(b) $q > 0$ 时 $Q = q^2$，$P = p/(2q)$；(c) $Q = 2q$，$P = 2p$。对不是正则的，找一个简单的修改变成正则的。
::: solution
计算 $\{Q, P\} = \partial_qQ\,\partial_pP - \partial_pQ\,\partial_qP$。

(a) $\{p, -q\} = 0\cdot 0 - 1\cdot(-1) = 1$。正则：坐标与动量互换、带个符号，是允许的。在哈密顿力学中"位置"与"动量"的区分并非内禀。

(b) $\{q^2, p/(2q)\} = 2q\cdot\frac{1}{2q} - 0 = 1$。正则。它是点变换 $Q = q^2$ 配上使 $P\,\dd Q = p\,\dd q$ 的动量变换，由 $F_2 = q^2P$ 生成。

(c) $\{2q, 2p\} = 4$。不正则：它把面积放大四倍。缩放后的 $Q = 2q$、$P = p/2$ 括号为 $1$，任何 $Q = \lambda q$、$P = p/\lambda$（$\lambda \neq 0$）也一样。括号为不等于 1 的常数 $c$ 的变换，像 (c) 那样，在把哈密顿量按 $c$ 重新缩放的意义上是正则的：它把 $H$ 的哈密顿方程映为 $cH$ 的哈密顿方程。
:::
:::

::: exercise 正则变换保持哈密顿方程 {level=3 #exr-canonical-form}
设 $(Q, P)$ 是一个自由度不含时的正则变换，$K(Q, P) = H(q, p)$。证明 $\dot Q = \partial K/\partial P$、$\dot P = -\partial K/\partial Q$。
::: hint
对 $f = Q$ 用 [[#eq-poisson-eom]]，并用链式法则把 $\{Q, H\}$ 表示出来，其中把 $H$ 写成 $K(Q(q, p), P(q, p))$。
:::
::: solution
由 [[#eq-poisson-eom]]，$\dot Q = \{Q, H\}$，在 $(q, p)$ 中计算。由于 $H(q, p) = K(Q(q, p), P(q, p))$，链式法则给出 $\partial H/\partial q = K_Q\,\partial Q/\partial q + K_P\,\partial P/\partial q$，对 $\partial H/\partial p$ 类似。代入括号——它对第二个参数的导数是线性的——

$$
\{Q, H\} = K_Q\{Q, Q\} + K_P\{Q, P\} = 0 + K_P\cdot 1 = \pdv{K}{P}.
$$

同样 $\dot P = \{P, H\} = K_Q\{P, Q\} + K_P\{P, P\} = -K_Q$。这就是新变量下的哈密顿方程。证明逐项推广到 $n$ 个自由度，用到 [[#eq-canonical]] 的全部三条。
:::
:::

::: exercise 生成函数为何有效 {level=3 #exr-generating}
证明哈密顿原理的相空间形式 $\delta\int_{t_1}^{t_2}\bigl(p\dot q - H(q, p, t)\bigr)\,\dd t = 0$——端点处 $q$ 固定，$q$ 与 $p$ 独立变分——给出哈密顿方程。再证明：若新旧变量的被积函数相差一个 $\dd F/\dd t$，其中 $F = F_2(q, P, t) - QP$，则 [[#eq-generating]] 成立。
::: solution
对 $p$ 施加变分 $\delta p$，一阶变分是 $\int(\dot q - \partial H/\partial p)\delta p\,\dd t$，所以对任意 $\delta p$ 驻定给出 $\dot q = \partial H/\partial p$。对 $q$ 施加在端点为零的变分 $\delta q$，变分是 $\int(p\,\delta\dot q - \partial H/\partial q\,\delta q)\,\dd t$；第一项分部积分得 $\int(-\dot p - \partial H/\partial q)\delta q\,\dd t$，于是 $\dot p = -\partial H/\partial q$。

设新变量对 $K$ 满足哈密顿原理，且

$$
p\dot q - H = P\dot Q - K + \deriv{F}{t}.
$$

则两个变分问题有相同的驻定路径，论证见 [[analytical-mechanics/lagrangian#prop-gauge]]。取 $F = F_2(q, P, t) - QP$。它对时间的导数是 $\partial_qF_2\,\dot q + \partial_PF_2\,\dot P + \partial_tF_2 - \dot QP - Q\dot P$。代入并把 $P\dot Q$ 项相消，

$$
p\dot q - H = \pdv{F_2}{q}\dot q + \left(\pdv{F_2}{P} - Q\right)\dot P - K + \pdv{F_2}{t}.
$$

把 $q$ 与 $P$ 当作独立变量，两边 $\dot q$ 与 $\dot P$ 的系数必须相等，于是 $p = \partial F_2/\partial q$、$Q = \partial F_2/\partial P$，剩下的项给出 $K = H + \partial F_2/\partial t$。这正是 [[#eq-generating]]。
:::
:::
