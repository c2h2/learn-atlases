把两个相同的单摆并排悬挂，用一根弱弹簧把它们的摆锤连起来。把一个拨到一旁然后放手。起初它独自摆动，另一个几乎不动。接着第二个开始摆，第一个逐渐衰减，过一段时间第二个以全部振幅摆动，而第一个瞬时静止。能量来回流动，若没有摩擦就无穷无尽。运动看起来很复杂。事实上它是两个完全简单的运动之和，每个都精确地重复自身：两个摆同向摆动，以及两个摆反向摆动。这就是系统的**简正模**。

每个力学系统在稳定平衡附近都像这样。振动的分子、摇晃的桥梁、传递声波的晶格：只要振幅足够小，每种情形里的运动都是彼此独立的简正模的叠加，每个模以它自己的频率振荡。求它们是一个线性代数问题——**广义特征值问题** $K\mathbf{a} = \omega^2 M\mathbf{a}$——而本章的目的，是从拉格朗日量把它建立起来，证明它总有物理需要的解，并在对称性允许处用手、在不允许处用数值把它解出来。

你应当知道简谐振动（[[oscillations/simple-harmonic]]）、两个耦合的滑块（[[oscillations/superposition]]）、拉格朗日方程（[[analytical-mechanics/lagrangian]]），以及对称矩阵的特征值与特征向量（数学图谱中的[特征值](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)与[谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)）。

## 平衡与二次近似 {#quadratic}

考虑一个有 $n$ 个自由度的系统，广义坐标 $q_1, \dots, q_n$，定常约束且力是保守的，于是

$$
L = \tfrac12\sum_{j,k}M_{jk}(q)\,\dot q_j\dot q_k - V(q),
$$

其中 $M(q)$ 对称且正定，如 [[analytical-mechanics/constraints]] 所示。

::: definition 平衡 {#def-equilibrium}
位形 $q^{(0)}$ 称为**平衡**，如果对一切 $t$，$q(t) = q^{(0)}$ 都是拉格朗日方程的解。对上面的拉格朗日量，这恰好当

$$
\pdv{V}{q_j}\Big|_{q^{(0)}} = 0, \qquad j = 1, \dots, n.
$$

时成立。若每个从足够接近 $q^{(0)}$、速度足够小的初态出发的运动都对所有时间留在它附近，则称该平衡**稳定**。
:::

这个条件把 $\dot q = \ddot q = 0$ 代入拉格朗日方程即可得到：每个含 $M$ 的项至少带一个速度或加速度，只剩下 $\partial V/\partial q_j$。

现在写 $q_j = q^{(0)}_j + \eta_j$，只保留小位移 $\eta$ 及其速度的最低非平凡阶。把势能展开成泰勒级数：

$$
V(q^{(0)} + \eta) = V(q^{(0)}) + \sum_j\pdv{V}{q_j}\Big|_0\eta_j + \frac12\sum_{j,k}\frac{\partial^2V}{\partial q_j\,\partial q_k}\Big|_0\eta_j\eta_k + O(\eta^3).
$$

常数项无关紧要，线性项在平衡处为零。动能对速度本来就是二次的，所以在同一精度下可以把它的系数冻结在平衡值。

::: definition 质量矩阵与刚度矩阵 {#def-MK}
在平衡 $q^{(0)}$ 处，**质量矩阵**与**刚度矩阵**是常数对称矩阵

$$
M_{jk} = M_{jk}(q^{(0)}), \qquad K_{jk} = \frac{\partial^2V}{\partial q_j\,\partial q_k}\Big|_{q^{(0)}}.
$$

**二次拉格朗日量**是

$$
L_2 = \tfrac12\dot{\boldsymbol\eta}\T M\dot{\boldsymbol\eta} - \tfrac12\boldsymbol\eta\T K\boldsymbol\eta,
$$ {#eq-L2}

它的拉格朗日方程是线性方程组

$$
M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = 0.
$$ {#eq-linear}
:::

为导出 [[#eq-linear]]，注意 $\partial L_2/\partial\dot\eta_j = \sum_k M_{jk}\dot\eta_k$ 且 $\partial L_2/\partial\eta_j = -\sum_k K_{jk}\eta_k$，这里用到两个矩阵的对称性。矩阵 $M$ 正定，因为对任何非零速度动能为正。矩阵 $K$ 对称，因为混合偏导可交换，但它未必正。

::: warning 没有正确的拉格朗日量之前，不要把方程线性化
人们很想把 $T$ 也按 $\eta$ 的幂展开，为了"精确"而保留 $\eta\dot\eta^2$ 之类的项。它们是三阶的，必须与 $V$ 的三次项一起丢掉；只留一个不留另一个，得到的就是自相矛盾的方程。反过来，也不要因为看起来小就丢掉 $V$ 中对 $\eta$ 是二次的项，比如单摆的 $\frac12 mg\ell\phi^2$：它与 [[#eq-L2]] 里的一切其他项同阶。规则很简单。把 $T$ 和 $V$ 都对 $\eta$ 与 $\dot\eta$ 的整体小量恰好展开到二阶。
:::

## 简正模 {#modes}

在 [[#eq-linear]] 中寻找所有坐标以同一频率、固定相对振幅振荡的解，$\boldsymbol\eta(t) = \mathbf{a}\cos(\omega t - \delta)$。代入得

$$
\bigl(K - \omega^2M\bigr)\mathbf{a} = 0.
$$ {#eq-gen-eig}

只有当矩阵奇异时才存在非零的 $\mathbf{a}$，也就是说 $\omega^2$ 是**特征方程**

$$
\det\bigl(K - \omega^2M\bigr) = 0,
$$ {#eq-char}

的根，这是关于 $\omega^2$ 的 $n$ 次多项式方程。

::: definition 简正模 {#def-normal-mode}
[[#eq-linear]] 的一个**简正模**是满足 [[#eq-gen-eig]] 且 $\mathbf{a} \neq 0$ 的解 $\boldsymbol\eta = \mathbf{a}\cos(\omega t - \delta)$。数 $\omega$ 称为它的**简正频率**，$\mathbf{a}$ 称为它的**振型**。方程 [[#eq-gen-eig]] 是矩阵对 $(K, M)$ 的**广义特征值问题**，特征值为 $\lambda = \omega^2$。
:::

物理需要这个特征值问题给出三样东西：$\omega^2$ 取实值、$n$ 个独立振型齐全、以及平衡是 $V$ 的极小点时 $\omega^2$ 为正。下面的定理把三样全部提供。

::: theorem 广义对称特征值问题 {#thm-gen-eig}
设 $M$ 与 $K$ 是实对称 $n\times n$ 矩阵，且 $M$ 正定。则：

1. $\det(K - \lambda M) = 0$ 的每个根 $\lambda$ 都是实数。
2. 属于不同特征值的特征向量**$M$-正交**：$\mathbf{a}_r\T M\mathbf{a}_s = 0$。
3. 存在由特征向量构成的 $\R^n$ 的一组基 $\mathbf{a}_1, \dots, \mathbf{a}_n$，可归一化为 $\mathbf{a}_r\T M\mathbf{a}_s = \delta_{rs}$，并且此时 $\mathbf{a}_r\T K\mathbf{a}_s = \lambda_r\delta_{rs}$。
4. 若 $K$ 正定，则每个 $\lambda_r > 0$；若 $K$ 只是半正定，则每个 $\lambda_r \ge 0$。
:::

::: proof
(1) 设 $K\mathbf{a} = \lambda M\mathbf{a}$，$\mathbf{a}$ 是可能为复的非零向量。左乘共轭转置 $\bar{\mathbf{a}}\T$：

$$
\bar{\mathbf{a}}\T K\mathbf{a} = \lambda\,\bar{\mathbf{a}}\T M\mathbf{a}.
$$

对实对称矩阵 $S$，数 $\bar{\mathbf{a}}\T S\mathbf{a}$ 等于它自己的复共轭 $\mathbf{a}\T S\bar{\mathbf{a}} = \bar{\mathbf{a}}\T S\T\mathbf{a}$，所以是实数。写 $\mathbf{a} = \mathbf{x} + i\mathbf{y}$，则 $\bar{\mathbf{a}}\T M\mathbf{a} = \mathbf{x}\T M\mathbf{x} + \mathbf{y}\T M\mathbf{y} > 0$。于是 $\lambda$ 是两个实数之比且分母非零，故为实数；特征向量随后可取实。

(2) 若 $K\mathbf{a}_r = \lambda_rM\mathbf{a}_r$ 且 $K\mathbf{a}_s = \lambda_sM\mathbf{a}_s$，则 $\mathbf{a}_s\T K\mathbf{a}_r = \lambda_r\mathbf{a}_s\T M\mathbf{a}_r$；把第二个关系转置并利用 $K$ 与 $M$ 的对称性，得 $\mathbf{a}_s\T K\mathbf{a}_r = \lambda_s\mathbf{a}_s\T M\mathbf{a}_r$。两式相减，$(\lambda_r - \lambda_s)\,\mathbf{a}_s\T M\mathbf{a}_r = 0$，所以 $\lambda_r \neq \lambda_s$ 时 $\mathbf{a}_s\T M\mathbf{a}_r = 0$。

(3) 因为 $M$ 对称正定，它有对称正定平方根 $M^{1/2}$（把 $M$ 对角化并对特征值开平方）。令 $\mathbf{b} = M^{1/2}\mathbf{a}$，$S = M^{-1/2}KM^{-1/2}$。则 $K\mathbf{a} = \lambda M\mathbf{a}$ 等价于 $S\mathbf{b} = \lambda\mathbf{b}$，这是实对称矩阵 $S$ 的普通特征值问题。由谱定理，$S$ 有一组标准正交的特征基 $\mathbf{b}_1, \dots, \mathbf{b}_n$，简并特征值也包括在内。于是 $\mathbf{a}_r = M^{-1/2}\mathbf{b}_r$ 是原问题的特征向量，满足 $\mathbf{a}_r\T M\mathbf{a}_s = \mathbf{b}_r\T\mathbf{b}_s = \delta_{rs}$，且 $\mathbf{a}_r\T K\mathbf{a}_s = \lambda_s\mathbf{a}_r\T M\mathbf{a}_s = \lambda_s\delta_{rs}$。

(4) 由 (3)，$\lambda_r = \mathbf{a}_r\T K\mathbf{a}_r$ 且 $\mathbf{a}_r \neq 0$；$K$ 正定时它为正，半正定时它非负。
:::

量 $\mathbf{a}\T M\mathbf{b}$ 扮演着内积的角色。振型在这个"动能"内积下正交，而不是在通常的内积下——除非 $M$ 是单位矩阵的倍数。

::: theorem 简正坐标 {#thm-normal-coords}
利用 [[#thm-gen-eig]] 的 $M$-正交归一特征向量，由 $\boldsymbol\eta = \sum_r Q_r\mathbf{a}_r$ 定义**简正坐标** $Q_r$，等价地 $Q_r = \mathbf{a}_r\T M\boldsymbol\eta$。则二次拉格朗日量变成一批彼此独立的振子之和，

$$
L_2 = \sum_{r=1}^n\tfrac12\bigl(\dot Q_r^2 - \omega_r^2Q_r^2\bigr), \qquad \omega_r^2 = \lambda_r,
$$ {#eq-normal-L}

并且当一切 $\lambda_r > 0$ 时，[[#eq-linear]] 的通解是

$$
\boldsymbol\eta(t) = \sum_{r=1}^n C_r\,\mathbf{a}_r\cos(\omega_rt - \delta_r),
$$ {#eq-general}

其中 $2n$ 个常数 $C_r$、$\delta_r$ 由初始位移与初始速度确定。
:::

::: proof
把 $\boldsymbol\eta = \sum_rQ_r\mathbf{a}_r$ 代入，由 [[#thm-gen-eig]] 的第 (3) 部分，动能项为 $\frac12\sum_{r,s}\dot Q_r\dot Q_s\,\mathbf{a}_r\T M\mathbf{a}_s = \frac12\sum_r\dot Q_r^2$，势能项为 $\frac12\sum_{r,s}Q_rQ_s\,\mathbf{a}_r\T K\mathbf{a}_s = \frac12\sum_r\lambda_rQ_r^2$。每个 $Q_r$ 的拉格朗日方程是 $\ddot Q_r + \lambda_rQ_r = 0$，解为 $Q_r = C_r\cos(\omega_rt - \delta_r)$。反演公式由 $\mathbf{a}_s\T M\boldsymbol\eta = \sum_rQ_r\mathbf{a}_s\T M\mathbf{a}_r = Q_s$ 得到。
:::

在简正坐标下，系统就是 $n$ 个不耦合的谐振子。能量 $E = \sum_r\frac12(\dot Q_r^2 + \omega_r^2Q_r^2)$ 是分别守恒的各模能量之和，所以注入某个模的能量一直留在其中。耦合单摆之间的能量交换并不是能量在模之间流动；那是两个能量各自恒定的模的**拍**，只是在把它们混合起来的坐标里看来如此。

负特征值 $\lambda_r < 0$ 给出 $\ddot Q_r = \abs{\lambda_r}Q_r$ 与指数增长：平衡不稳定，就像倒置单摆的顶端。零特征值给出 $\ddot Q_r = 0$ 与匀速漂移，即**零模**，它标志着一族连续统的平衡，通常来自平移一类的对称性。

### 计算流程

1. 由 $\partial V/\partial q = 0$ 求平衡。
2. 由平衡处的 $T$ 算出 $M$，由 $V$ 的二阶导数算出 $K$。
3. 解 $\det(K - \omega^2M) = 0$，得 $\omega^2$ 的 $n$ 个值。
4. 对每个值，解 $(K - \omega^2M)\mathbf{a} = 0$ 求振型。
5. 用 [[#eq-general]] 拟合初始条件，其中 $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0)$。

::: example 两个滑块与三根弹簧 {#ex-two-masses}
两个质量为 $m$ 的滑块在光滑桌面上于两堵墙之间滑动，墙–块–块–墙由三根弹簧连接。两端弹簧刚度为 $k$，中间一根为 $k'$。求简正模。然后设滑块 1 离开平衡位置 $A$、滑块 2 停在其平衡处，两者都由静止释放，求其后的运动。
::: solution
设 $x_1$ 与 $x_2$ 为离开平衡的位移。于是

$$
T = \tfrac12m\bigl(\dot x_1^2 + \dot x_2^2\bigr), \qquad V = \tfrac12kx_1^2 + \tfrac12k'(x_2 - x_1)^2 + \tfrac12kx_2^2,
$$

所以

$$
M = m\begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}, \qquad K = \begin{pmatrix}k + k' & -k'\\ -k' & k + k'\end{pmatrix}.
$$

特征方程为 $(k + k' - m\omega^2)^2 - k'^2 = 0$，即 $k + k' - m\omega^2 = \pm k'$，于是

$$
\omega_1^2 = \frac{k}{m}, \quad \mathbf{a}_1 \propto (1, 1); \qquad \omega_2^2 = \frac{k + 2k'}{m}, \quad \mathbf{a}_2 \propto (1, -1).
$$

在慢模中两滑块同向运动，中间弹簧从不伸长，只有两端弹簧起作用。在快模中它们反向运动，中间弹簧被拉伸的量为每个位移的两倍。

归一化后 $\mathbf{a}_{1,2} = (1, \pm1)/\sqrt{2m}$。初始数据为 $\boldsymbol\eta(0) = (A, 0)$ 且速度为零，所以 $\delta_r = 0$，且两个模都有 $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0) = mA/\sqrt{2m}$。于是

$$
x_1 = \frac{A}{2}\bigl(\cos\omega_1t + \cos\omega_2t\bigr), \qquad x_2 = \frac{A}{2}\bigl(\cos\omega_1t - \cos\omega_2t\bigr).
$$

用和差化积公式，$x_1 = A\cos(\bar\omega t)\cos(\Delta t)$，$x_2 = A\sin(\bar\omega t)\sin(\Delta t)$，其中 $\bar\omega = (\omega_1 + \omega_2)/2$，$\Delta = (\omega_2 - \omega_1)/2$。弱耦合 $k' \ll k$ 时两个频率靠得很近，$\Delta$ 很小，每个滑块都以近似 $\bar\omega$ 的频率振荡，振幅由缓慢变化的包络调制。经过时间 $\pi/(2\Delta) = \pi/(\omega_2 - \omega_1)$，全部运动都转移到了滑块 2，再经过同样长的时间又返回。
:::
:::

::: widget plot
f: 0.5*(cos(x) + cos(sqrt(1+2*c)*x)); 0.5*(cos(x) - cos(sqrt(1+2*c)*x))
x: 0, 100
y: -1.1, 1.1
sliders: c=0.2:0.02:1:0.01
labels: x1; x2
caption: 采用 $k/m = 1$、$A = 1$ 单位制的那个例子中的两个滑块，此时 $\omega_1 = 1$，$\omega_2 = \sqrt{1 + 2c}$，$c = k'/k$。当 $c = 0.2$ 时，能量在时间 $\pi/(\sqrt{1.4} - 1) \approx 17$ 内从滑块 1 完全转移到滑块 2，然后再返回。把 $c$ 降到 $0.02$ 附近，转移过程慢到约 $160$，而包络内的快振荡几乎不变。把 $c$ 调大，拍就模糊成双频的晃动。
:::

::: example 双摆 {#ex-double-pendulum}
双摆有两个质量相同的摆锤（质量 $m$），挂在两根等长（$\ell$）的轻杆上。求它绕下垂平衡位置小振动的简正频率与振型，并对 $\ell = 1.00\,\mathrm{m}$ 算出频率的数值。
::: solution
以 [[analytical-mechanics/constraints#ex-dof]] 中的角 $\phi_1$ 与 $\phi_2$ 为坐标，精确的能量是

$$
T = \tfrac12m\ell^2\bigl[2\dot\phi_1^2 + \dot\phi_2^2 + 2\dot\phi_1\dot\phi_2\cos(\phi_1 - \phi_2)\bigr], \qquad V = -mg\ell\bigl(2\cos\phi_1 + \cos\phi_2\bigr).
$$

保留到二阶：在 $T$ 中令 $\cos(\phi_1 - \phi_2) \to 1$，在 $V$ 中 $\cos\phi \approx 1 - \frac12\phi^2$，于是

$$
M = m\ell^2\begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}, \qquad K = mg\ell\begin{pmatrix}2 & 0\\ 0 & 1\end{pmatrix}.
$$

写 $\lambda = \omega^2\ell/g$。除以 $mg\ell$，特征方程为

$$
\det\begin{pmatrix}2 - 2\lambda & -\lambda\\ -\lambda & 1 - \lambda\end{pmatrix} = 2(1 - \lambda)^2 - \lambda^2 = \lambda^2 - 4\lambda + 2 = 0,
$$

根为 $\lambda = 2 \mp \sqrt2$。所以

$$
\omega_{1,2}^2 = \bigl(2 \mp \sqrt2\bigr)\frac{g}{\ell}.
$$

求振型：第二行给出 $-\lambda a_1 + (1 - \lambda)a_2 = 0$，即 $a_2/a_1 = \lambda/(1 - \lambda)$。对 $\lambda = 2 - \sqrt2$，此比为 $(2 - \sqrt2)/(\sqrt2 - 1) = \sqrt2$：慢模中两杆同向摆动，下杆的角是上杆的 $\sqrt2$ 倍。对 $\lambda = 2 + \sqrt2$，$a_2/a_1 = -\sqrt2$：快模中两杆反向摆动。

取 $\ell = 1.00\,\mathrm{m}$，$\omega_1 = \sqrt{(2 - \sqrt2)(9.80)} = 2.40\,\mathrm{rad/s}$，$\omega_2 = \sqrt{(2 + \sqrt2)(9.80)} = 5.78\,\mathrm{rad/s}$，与之对照的是长 $1.00\,\mathrm{m}$ 的单摆的 $3.13\,\mathrm{rad/s}$。验证 $M$-正交性：取 $\mathbf{a}_1 = (1, \sqrt2)$、$\mathbf{a}_2 = (1, -\sqrt2)$，$\mathbf{a}_1\T\begin{pmatrix}2&1\\1&1\end{pmatrix}\mathbf{a}_2 = 2 - \sqrt2 + \sqrt2 - 2 = 0$。而通常的点积 $1 - 2 = -1$ 不为零：模只在动能内积下正交。
:::
:::

::: quiz
对一个 $M = \mathrm{diag}(1, 4)$、$K = \mathrm{diag}(9, 4)$（SI 单位）的系统，简正频率是什么？
- [ ] $3$ 和 $2\,\mathrm{rad/s}$，即 $K$ 的对角元的平方根。
- [x] $3$ 和 $1\,\mathrm{rad/s}$。
- [ ] $9$ 和 $1\,\mathrm{rad/s}$。
- [ ] 因为 $M \ne \mathbb{1}$，不解一元二次方程就求不出来。
::: solution
两个矩阵都是对角的，所以坐标本来就是简正坐标，$\det(K - \omega^2M) = (9 - \omega^2)(4 - 4\omega^2)$。根为 $\omega^2 = 9$ 与 $\omega^2 = 1$，得 $3$ 和 $1\,\mathrm{rad/s}$。每个频率都是 $\sqrt{K_{jj}/M_{jj}}$：必须先除以质量再开平方。只取 $K$ 的平方根等于忽略了惯性。
:::
:::

## 稳定性与受驱模 {#stability}

线性分析说，$K$ 正定时*线性化*方程的解是有界振荡。它对真实的非线性运动说了什么？对势能的严格极小点，答案是有的，而且论证只用能量守恒。

::: theorem 拉格朗日–狄利克雷稳定性定理 {#thm-dirichlet}
设拉格朗日量为 $L = \frac12\dot q\T M(q)\dot q - V(q)$，$M(q)$ 正定，且 $q^{(0)}$ 是 $V$ 的严格局部极小点。则 $q^{(0)}$ 是完全非线性运动方程的稳定平衡。
:::

::: proof
取 $V(q^{(0)}) = 0$。给定足够小的 $\eps > 0$，使 $V$ 在挖心球 $0 < \abs{q - q^{(0)}} \le \eps$ 上为正；设 $m_\eps > 0$ 为 $V$ 在球面 $\abs{q - q^{(0)}} = \eps$ 上的最小值，它之所以为正，是因为球面是紧集而 $V$ 在其上连续且为正。能量 $E = T + V$ 守恒，见 [[analytical-mechanics/lagrangian#thm-energy]]，且 $T \ge 0$。由连续性，存在 $\delta > 0$，使得凡满足 $\abs{q - q^{(0)}} < \delta$ 且 $\abs{\dot q} < \delta$ 的初始状态都有 $E < m_\eps$。沿这条运动，一切时间内 $V(q(t)) \le E < m_\eps$，所以轨道永远到不了 $V \ge m_\eps$ 的那个球面；它连续且从球内出发，便一直留在半径 $\eps$ 的球内。同样的估计 $T \le E$ 使速度保持很小。
:::

$K$ 正定时，由泰勒定理平衡是严格极小点，定理适用。$K$ 有负特征值时平衡不稳定。$K$ 只是半正定时，二次近似无法裁决，要由 $V$ 的高阶项定夺。

### 受驱简正模

加上一个小外加力 $\mathbf{F}\cos\Omega t$，即广义力 $F_j\cos\Omega t$，方程成为 $M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = \mathbf{F}\cos\Omega t$。在简正坐标下，作用在第 $r$ 个模上的力是 $\mathbf{a}_r\T\mathbf{F}$，每个模都是一个受驱振子：$\ddot Q_r + \omega_r^2Q_r = (\mathbf{a}_r\T\mathbf{F})\cos\Omega t$。稳定响应为

$$
\boldsymbol\eta(t) = \sum_r\frac{\mathbf{a}_r\,(\mathbf{a}_r\T\mathbf{F})}{\omega_r^2 - \Omega^2}\cos\Omega t.
$$ {#eq-driven}

$\Omega$ 逼近任一简正频率时振幅无界增长，除非 $\mathbf{a}_r\T\mathbf{F} = 0$。与某个振型正交的力无法激起那个模。把 [[#ex-two-masses]] 的两个滑块同向推动，$\mathbf{F} = (F, F)$，则只有慢模响应：无论驱动频率为何，$\omega_2$ 处都没有共振。只推滑块 1，$\mathbf{F} = (F, 0)$，则两个模都共振。加上阻尼后，无穷大的峰变成 [[oscillations/resonance]] 中有限的共振曲线，每个模一条。

::: quiz
两堵墙之间的两个相同滑块，如同 [[#ex-two-masses]]，被一对大小相等、方向相反的力 $\pm F\cos\Omega t$ 分别驱动。无阻尼响应在哪些驱动频率下发散？
- [ ] $\omega_1$ 与 $\omega_2$ 都发散，因为每个模在被以自己的频率驱动时都会共振。
- [ ] 只有 $\omega_1$，最低的那个频率。
- [x] 只有 $\omega_2$。
- [ ] 都不发散，因为方向相反的力相互抵消。
::: solution
力向量为 $\mathbf{F} = (F, -F)$，与快模振型 $(1, -1)$ 成正比，与慢模振型 $(1, 1)$ 正交。所以 $\mathbf{a}_1\T\mathbf{F} = 0$，只有快模被驱动。由 [[#eq-driven]]，响应只在 $\Omega = \omega_2$ 处发散。这两个力在质心上的效应相互抵消，在两滑块间距上的却不是。
:::
:::

## 对称性、零模与分子 {#symmetry}

系统有对称性时，振型通常可以猜出来，因为与 $M$ 和 $K$ 都交换的对称变换把每个特征子空间映到自身。对单个非简并的模，这意味着振型在对称变换下要么不变，要么反向。

::: example 直线型二氧化碳分子 {#ex-co2}
把 CO₂ 建模为一条线上的三个质量：碳原子（质量 $M_C$）两侧各一个氧原子（质量 $m$），由两根刚度同为 $k$ 的相同弹簧连接。求沿这条线运动的简正模，并用原子质量单位下的 $m = 16$、$M_C = 12$ 算出两个非零频率之比。
::: solution
设 $x_1, x_2, x_3$ 为 O、C、O 的位移。于是

$$
T = \tfrac12m\dot x_1^2 + \tfrac12M_C\dot x_2^2 + \tfrac12m\dot x_3^2, \qquad V = \tfrac12k(x_2 - x_1)^2 + \tfrac12k(x_3 - x_2)^2,
$$

$$
M = \begin{pmatrix}m&0&0\\0&M_C&0\\0&0&m\end{pmatrix}, \qquad K = k\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

绕碳原子的反射 $x_1 \leftrightarrow -x_3$、$x_2 \to -x_2$ 保持 $T$ 与 $V$ 不变，所以每个模在其中要么对称要么反对称。逐类尝试。

**平动。** $\mathbf{a} = (1, 1, 1)$ 给出 $K\mathbf{a} = 0$，故 $\omega = 0$。这个零模是整个分子的刚性平移：每个原子移动相同距离时，$V$ 不变。

**对称伸缩振动。** $\mathbf{a} = (1, 0, -1)$：碳原子不动，两个氧反向运动。此时 $K\mathbf{a} = k(1, 0, -1)$，$M\mathbf{a} = m(1, 0, -1)$，所以 $\omega^2 = k/m$。

**非对称伸缩振动。** 第三个特征向量必须与上面两个都 $M$-正交，于是试 $\mathbf{a} = (1, \beta, 1)$。与 $(1, 1, 1)$ 的 $M$-正交性给出 $m + \beta M_C + m = 0$，即 $\beta = -2m/M_C$：碳原子与两个氧反向运动，质心保持不动。$(K - \omega^2M)\mathbf{a} = 0$ 的第一行给出 $k(1 - \beta) = m\omega^2$，所以

$$
\omega^2 = \frac{k}{m}\left(1 + \frac{2m}{M_C}\right).
$$

频率之比的预测值为

$$
\frac{\omega_{\mathrm{anti}}}{\omega_{\mathrm{sym}}} = \sqrt{1 + \frac{2m}{M_C}} = \sqrt{1 + \frac{32}{12}} = 1.915.
$$

实测的 CO₂ 非对称伸缩振动在 $2349\,\mathrm{cm^{-1}}$。对称伸缩振动没有红外活性（没有振荡的电偶极矩），而在拉曼谱中它因与弯曲模倍频的共振而分裂为约 $1285$ 与 $1388\,\mathrm{cm^{-1}}$ 的两条线，中心约在 $1337$。实测比值约为 $1.76$。弹簧模型把次序和效应的量级都弄对了；剩下的偏差来自两根键之间的相互作用，更完备的模型会在 $V$ 中加入一项交叉项 $k_{12}(x_2 - x_1)(x_3 - x_2)$ 来包含它。
:::
:::

::: remark 简并模
若两个简正频率重合，其振型的任何组合仍是模，而定理只保证特征子空间中*存在某一组* $M$-正交归一基。CO₂ 有两个弯曲模，沿垂直于分子轴的两个方向，由旋转对称性频率相同；任何方向的弯曲，甚至旋涡式的圆周组合，都同样是简正模。简并几乎总是对称性的标志，而一点点不对称就会把它劈开，就像两个稍有差异的单摆会劈开两个全同单摆共有的频率。
:::

## 没有捷径可走的系统 {#numerical}

对称性是恩赐，而真实系统常常没有它。考虑两堵墙之间排成一条线的三个滑块，质量分别为 $1$、$2$、$3\,\mathrm{kg}$，由四根刚度同为 $k = 100\,\mathrm{N/m}$ 的相同弹簧连接。以位移 $x_1, x_2, x_3$ 表示，

$$
M = \begin{pmatrix}1&0&0\\0&2&0\\0&0&3\end{pmatrix}\mathrm{kg}, \qquad K = \begin{pmatrix}200&-100&0\\-100&200&-100\\0&-100&200\end{pmatrix}\mathrm{N/m}.
$$

特征方程 [[#eq-char]] 是关于 $\omega^2$ 的三次方程。下面的清单用二分法求它的根，把每个振型算作 $K - \omega^2M$ 某两行的叉积（与两行都正交的向量位于秩为二的 $3\times 3$ 矩阵的零空间中），对 $M$ 归一化，并验证 [[#thm-gen-eig]] 的第 (2) 部分。

```python
import math
# 两堵墙之间的三个质量，四根相同的弹簧 k
m = [1.0, 2.0, 3.0]          # kg
k = 100.0                    # N/m
K = [[2*k, -k, 0], [-k, 2*k, -k], [0, -k, 2*k]]
M = [[m[0], 0, 0], [0, m[1], 0], [0, 0, m[2]]]

def det3(A):
    return (A[0][0]*(A[1][1]*A[2][2] - A[1][2]*A[2][1])
          - A[0][1]*(A[1][0]*A[2][2] - A[1][2]*A[2][0])
          + A[0][2]*(A[1][0]*A[2][1] - A[1][1]*A[2][0]))

def p(lam):                  # 特征函数 det(K - lam M)
    return det3([[K[i][j] - lam*M[i][j] for j in range(3)] for i in range(3)])

def bisect(a, b):
    for _ in range(200):
        c = 0.5*(a + b)
        if p(a)*p(c) <= 0: b = c
        else: a = c
    return 0.5*(a + b)

# 扫描网格，为三个根定出区间
grid = [0.3 + 0.7*i for i in range(0, 1001)]
roots = [bisect(grid[i], grid[i+1]) for i in range(1000) if p(grid[i])*p(grid[i+1]) < 0]

modes = []
for lam in roots:
    A = [[K[i][j] - lam*M[i][j] for j in range(3)] for i in range(3)]
    r0, r1 = A[0], A[1]      # 特征向量与各正交：取叉积
    v = [r0[1]*r1[2] - r0[2]*r1[1], r0[2]*r1[0] - r0[0]*r1[2], r0[0]*r1[1] - r0[1]*r1[0]]
    norm = math.sqrt(sum(m[i]*v[i]**2 for i in range(3)))     # 对 M 归一化
    v = [x/norm for x in v]
    if v[0] < 0: v = [-x for x in v]
    modes.append(v)
    print("omega^2 = %8.3f  omega = %6.3f rad/s  f = %5.3f Hz  a = (%6.3f, %6.3f, %6.3f)"
          % (lam, math.sqrt(lam), math.sqrt(lam)/(2*math.pi), *v))

print("M-inner products a_r^T M a_s:")
for r in range(3):
    print("  ", ["%7.1e" % sum(m[i]*modes[r][i]*modes[s][i] for i in range(3)) for s in range(3)])
```

输出：

```
omega^2 =   27.924  omega =  5.284 rad/s  f = 0.841 Hz  a = ( 0.272,  0.468,  0.403)
omega^2 =  100.000  omega = 10.000 rad/s  f = 1.592 Hz  a = ( 0.408,  0.408, -0.408)
omega^2 =  238.743  omega = 15.451 rad/s  f = 2.459 Hz  a = ( 0.871, -0.338,  0.065)
M-inner products a_r^T M a_s:
   ['1.0e+00', '-5.6e-17', '8.3e-16']
   ['0.0e+00', '1.0e+00', '-1.3e-15']
   ['8.3e-16', '-1.3e-15', '1.0e+00']
```

::: example 解读并检验数值求出的模 {#ex-numerical}
解释清单求出的三个模，并手算验证特征值。
::: solution
中间那个特征值圆得可疑。它的振型与 $(1, 1, -1)$ 成正比，而且

$$
K\begin{pmatrix}1\\1\\-1\end{pmatrix} = \begin{pmatrix}200 - 100\\ -100 + 200 + 100\\ -100 - 200\end{pmatrix} = \begin{pmatrix}100\\200\\-300\end{pmatrix} = 100\,M\begin{pmatrix}1\\1\\-1\end{pmatrix},
$$

所以 $\omega^2 = 100\,\mathrm{s^{-2}}$ 精确成立。在这个模中前两个滑块同向运动，它们之间的弹簧从不伸长，两者一起与第三个滑块对抗。把三次多项式除以 $(\omega^2 - 100)$ 剩下一个二次式，其系数可由 $M^{-1}K$ 的迹与行列式得出：三个根之和为 $\operatorname{tr}(M^{-1}K) = 200 + 100 + 66.67 = 366.67$，乘积为 $\det K/\det M = (4\times 10^6)/6 = 666\,667$。于是另外两个根之和为 $266.67$、乘积为 $6666.7$：

$$
\omega^2 = \frac{266.67 \pm \sqrt{266.67^2 - 4(6666.7)}}{2} = \frac{266.67 \pm 210.82}{2} = 27.92 \text{ 或 } 238.74\,\mathrm{s^{-2}},
$$

与清单一致。

最低的模在 $0.841\,\mathrm{Hz}$，三个滑块同向运动，中间那个重滑块动得最多：这是整条链对两堵墙的"呼吸"。最高的模在 $2.459\,\mathrm{Hz}$，以最轻的滑块为主，它在两个邻居之间噼啪作响，而重滑块几乎不动（$0.065$）。这一图案具有一般性：高频模集中在轻的质量与硬的弹簧上。非对角的 $M$-内积在 $10^{-15}$ 量级，是舍入误差，正如同定理所要求；而前两个振型的通常点积 $0.272(0.408) + 0.468(0.408) - 0.403(0.408) = 0.138$ 不为零。
:::
:::

对更大的系统，绝不去构造特征多项式再来求根，因为它的根的条件数很差。库函数按证明的第 (3) 部分把问题化归为对称的，然后用 QR 或雅可比算法；见数学图谱中的[数值线性代数](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods)与 [[computation/linear-algebra]]。

::: application 分子、固体与建筑
在红外与拉曼光谱学中，分子振动谱的每一条吸收线都是这样一列简正模，其中 $M$ 是原子质量，$K$ 是电子能量的曲率。$N$ 个原子的非线性分子有 $3N - 6$ 个振动模，六个零模是平动与转动。在晶体中，对 $10^{23}$ 个原子做同样的分析得到声子，它的频率决定 [[statistical-mechanics]] 中的热容。结构工程师计算高楼与桥梁最低的几个简正模，因为风或地震一旦以接近某个简正频率驱动结构就是共振驱动，如同 [[oscillations/resonance]]。
:::

::: history 简正模：从拉格朗日到瑞利
丹尼尔·伯努利在 1750 年代主张振动弦的运动是简单模的叠加，遭到欧拉与达朗贝尔的激烈反驳。拉格朗日在《分析力学》（*Mécanique analytique*，1788）中处理了一般系统的小振动，把它化为行列式方程 [[#eq-char]]；他错误地认为重根必定产生长期增长，这一错误由卡尔·魏尔斯特拉斯在 1858 年纠正，他证明根都是实的，且只要 $T$ 正定，重根并无妨害。瑞利勋爵的《声学理论》（*The Theory of Sound*，1877）把这套方法变成声学标准工具，并提出了 [[#exr-rayleigh]] 中探讨的频率变分估计。
:::

## 后续内容 {#leads}

同一个特征值问题支配着 [[analytical-mechanics/rigid-bodies]] 的主轴；它的连续极限——$M$ 与 $K$ 变成微分算子——给出 [[oscillations/travelling-waves]] 的驻波与 [[math-methods/odes]] 的施图姆–刘维尔理论。在 [[quantum-1/harmonic-oscillator]] 中，每个简正坐标变成一个量子振子，能级为 $\hbar\omega_r(n_r + \frac12)$。小振动也是通往 [[analytical-mechanics/chaos]] 的大门：线性化告诉你平衡附近发生什么，而真正的问题是振幅不再小的时候发生什么。

::: summary
- 平衡满足 $\partial V/\partial q_j = 0$。在其附近把 $T$ 与 $V$ 展开到二阶，得 $L_2 = \frac12\dot{\boldsymbol\eta}\T M\dot{\boldsymbol\eta} - \frac12\boldsymbol\eta\T K\boldsymbol\eta$ 与 $M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = 0$。
- 简正模 $\boldsymbol\eta = \mathbf{a}\cos(\omega t - \delta)$ 求解广义特征值问题 $K\mathbf{a} = \omega^2M\mathbf{a}$，频率由 $\det(K - \omega^2M) = 0$ 给出。
- $K$ 对称、$M$ 正定时，一切 $\omega^2$ 为实，存在 $n$ 个独立振型，且可选成 $M$-正交归一。$K$ 正定给出实频率与稳定平衡。
- 在简正坐标下系统是 $n$ 个独立振子；一般运动是它们的叠加，振幅由 $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0)$ 得出。
- $V$ 的严格极小对完全非线性运动稳定（拉格朗日–狄利克雷）。零模来自连续对称性；$\omega^2$ 为负意味着不稳定。
- 周期力以 $\mathbf{a}_r\T\mathbf{F}$ 为权重驱动第 $r$ 个模；除非力与该振型正交，它在 $\omega_r$ 处共振。
- 对称性预言振型；没有对称性就数值求解，并用迹与行列式检验。
- 弱耦合的全同振子会拍，在时间 $\pi/(\omega_2 - \omega_1)$ 内交换能量。
:::

## 习题 {#exercises}

::: exercise 两个滑块，三根相同的弹簧 {level=1 check="sqrt(300)"}
在 [[#ex-two-masses]] 中取 $m = 0.500\,\mathrm{kg}$、$k = k' = 50.0\,\mathrm{N/m}$。求两个简正频率，并给出较高的那个，以 $\mathrm{rad/s}$ 计。
::: solution
$\omega_1 = \sqrt{k/m} = \sqrt{100} = 10.0\,\mathrm{rad/s}$，$\omega_2 = \sqrt{(k + 2k')/m} = \sqrt{150/0.500} = \sqrt{300} = 17.3\,\mathrm{rad/s}$。只要三根弹簧全同，比值就是 $\sqrt3$，与 $m$、$k$ 无关。
:::
:::

::: exercise 旋转圆环上的珠子 {level=1 check="10*sqrt(1-0.49^2)"}
对 [[analytical-mechanics/constraints#ex-hoop]] 中的珠子，取 $R = 0.200\,\mathrm{m}$、$\omega = 10.0\,\mathrm{rad/s}$。证明绕离轴平衡 $\theta_0$ 的小振动角频率为 $\omega\sin\theta_0$，并求其值。
::: solution
运动方程为 $\ddot\theta = G(\theta) = \sin\theta(\omega^2\cos\theta - g/R)$。在 $\theta_0$ 处 $\omega^2\cos\theta_0 = g/R$。线性化，$\theta = \theta_0 + \eta$：$\ddot\eta = G'(\theta_0)\eta$，其中

$$
G'(\theta) = \cos\theta\left(\omega^2\cos\theta - \frac gR\right) - \omega^2\sin^2\theta, \qquad G'(\theta_0) = -\omega^2\sin^2\theta_0.
$$

所以振动频率为 $\Omega = \omega\sin\theta_0$。由 $\cos\theta_0 = 0.490$，$\Omega = 10.0\sqrt{1 - 0.490^2} = 8.72\,\mathrm{rad/s}$。当 $\omega$ 从上方趋于临界值 $7.00\,\mathrm{rad/s}$ 时，$\theta_0 \to 0$、$\Omega \to 0$：势阱在分岔处变平。
:::
:::

::: exercise 双摆的频率比 {level=1 check="1+sqrt(2)"}
证明 [[#ex-double-pendulum]] 中等臂等长双摆的两个简正频率之比为 $1 + \sqrt2$。
::: solution
$\omega_2^2/\omega_1^2 = (2 + \sqrt2)/(2 - \sqrt2)$。分子分母同乘 $2 + \sqrt2$：$(2 + \sqrt2)^2/(4 - 2) = (6 + 4\sqrt2)/2 = 3 + 2\sqrt2 = (1 + \sqrt2)^2$。故 $\omega_2/\omega_1 = 1 + \sqrt2 = 2.414$。该比值是无理数，所以双摆的一般小振动永不精确重复，尽管它完全规则。
:::
:::

::: exercise 耦合单摆 {level=2 check="pi/(sqrt(10)-sqrt(9.8))"}
两个相同的单摆，$g/\ell = 9.80\,\mathrm{s^{-2}}$，在摆锤处由一根 $k/m = 0.100\,\mathrm{s^{-2}}$ 的弱弹簧连接。求小振动的两个简正频率，以及能量从一个摆完全转移到另一个摆所需的时间，以秒计。
::: solution
以摆锤位移 $x_1 = \ell\phi_1$、$x_2 = \ell\phi_2$ 表示，势能做到二阶为 $\frac12(mg/\ell)(x_1^2 + x_2^2) + \frac12k(x_2 - x_1)^2$，这正是把 $k$ 换成 $mg/\ell$、$k'$ 换成 $k$ 的 [[#ex-two-masses]]。于是 $\omega_1^2 = g/\ell = 9.80$、$\omega_2^2 = g/\ell + 2k/m = 10.0\,\mathrm{s^{-2}}$，得 $\omega_1 = 3.130$、$\omega_2 = 3.162\,\mathrm{rad/s}$。完全转移的时间为

$$
t = \frac{\pi}{\omega_2 - \omega_1} = \frac{\pi}{\sqrt{10.0} - \sqrt{9.80}} = 98.8\,\mathrm{s},
$$

约 $49$ 个摆动周期。弹簧的刚度只有重力恢复力的 $1\%$，只要时间够长，它照样能把全部能量搬走。
:::
:::

::: exercise CO₂ 的频率比 {level=2 check="sqrt(1+2*16/12)"}
再推导一遍 [[#ex-co2]] 的 CO₂ 频率比：这次在质心固定的条件下用能量处理非对称伸缩振动——证明该模对每根键的伸长而言的有效质量是 $m\,M_C/(2m + M_C)$。求出比值。
::: solution
非对称模中 $x_1 = x_3 = a$、$x_2 = -2ma/M_C$。每根键的伸长为 $x_2 - x_1 = -a(1 + 2m/M_C)$ 或 $x_3 - x_2 = a(1 + 2m/M_C)$；记 $s = a(1 + 2m/M_C)$。势能为 $V = ks^2$。动能为

$$
T = \tfrac12\left(2m + M_C\frac{4m^2}{M_C^2}\right)\dot a^2 = m\left(1 + \frac{2m}{M_C}\right)\dot a^2 = \frac{m}{1 + 2m/M_C}\dot s^2.
$$

结合 $T = \frac12\mu_{\mathrm{eff}}\cdot 2\dot s^2$ 与 $V = \frac12k\cdot 2s^2$，$\omega^2 = k/\mu_{\mathrm{eff}}$，其中 $\mu_{\mathrm{eff}} = m/(1 + 2m/M_C) = mM_C/(2m + M_C)$。对称伸缩振动的 $\mu_{\mathrm{eff}} = m$，所以比值为 $\sqrt{(2m + M_C)/M_C} = \sqrt{1 + 2m/M_C} = \sqrt{1 + 32/12} = 1.915$。
:::
:::

::: exercise 弦上的珠子 {level=2 check="2*sin(pi/8)"}
三个相同的质量 $m$ 等距分布在一根轻弦上，相邻质量之间以及两端质量与固定墙之间由刚度同为 $k$ 的相同弹簧连接（共四根弹簧）。证明简正频率为 $\omega_n = 2\sqrt{k/m}\sin(n\pi/8)$，$n = 1, 2, 3$，并给出 $k/m = 1\,\mathrm{s^{-2}}$ 时最低的那个。
::: hint
试振型 $a_j = \sin(jn\pi/4)$，$j = 1, 2, 3$，并使用 $\sin(\alpha + \beta) + \sin(\alpha - \beta) = 2\sin\alpha\cos\beta$。
:::
::: solution
此处 $M = m\mathbb 1$，$K = k\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$。$K\mathbf{a}$ 的第 $j$ 行是 $k(2a_j - a_{j-1} - a_{j+1})$，其中 $a_0 = a_4 = 0$ 代表墙。取 $a_j = \sin(jn\pi/4)$，边界值 $a_0 = \sin 0 = 0$ 与 $a_4 = \sin(n\pi) = 0$ 自动成立，且

$$
a_{j-1} + a_{j+1} = 2\sin\frac{jn\pi}{4}\cos\frac{n\pi}{4} = 2a_j\cos\frac{n\pi}{4}.
$$

于是 $(K\mathbf{a})_j = 2k(1 - \cos(n\pi/4))a_j = 4k\sin^2(n\pi/8)a_j$，且 $\omega_n^2 = (4k/m)\sin^2(n\pi/8)$。$k/m = 1$ 时频率为 $2\sin(\pi/8) = 0.765$、$2\sin(\pi/4) = 1.414$、$2\sin(3\pi/8) = 1.848\,\mathrm{rad/s}$。振型是连续弦驻波 $\sin(n\pi x/L)$ 的取样，当珠子数目增多时，频率趋于弦的频率。
:::
:::

::: exercise 瑞利原理 {level=3 #exr-rayleigh}
设 $M$ 正定、$K$ 对称，对 $\mathbf{v} \neq 0$ 定义**瑞利商** $R(\mathbf{v}) = \mathbf{v}\T K\mathbf{v}/\mathbf{v}\T M\mathbf{v}$。证明最小特征值满足 $\omega_1^2 = \min_{\mathbf{v}}R(\mathbf{v})$。然后用试验向量 $(1, 1, 1)$ 估计 [[#numerical]] 中三滑块系统的最低频率，并与清单的输出比较。
::: solution
在 [[#thm-gen-eig]] 的 $M$-正交归一特征基下展开 $\mathbf{v} = \sum_rc_r\mathbf{a}_r$。则 $\mathbf{v}\T M\mathbf{v} = \sum_rc_r^2$、$\mathbf{v}\T K\mathbf{v} = \sum_r\lambda_rc_r^2$，于是

$$
R(\mathbf{v}) = \frac{\sum_r\lambda_rc_r^2}{\sum_rc_r^2} \ge \frac{\sum_r\lambda_1c_r^2}{\sum_rc_r^2} = \lambda_1,
$$

$\mathbf{v} = \mathbf{a}_1$ 时取等号。故 $\lambda_1 = \min R$。因为 $R$ 在特征向量处取驻值，试验向量上 $\eps$ 量级的误差只导致 $R$ 上 $\eps^2$ 量级的误差，这就是粗略的猜测也能给出很好的频率的原因。

取 $\mathbf{v} = (1, 1, 1)$，$\mathbf{v}\T K\mathbf{v}$ 是 $K$ 的一切元素之和，即 $3\times 200 - 4\times 100 = 200\,\mathrm{N/m}$，而 $\mathbf{v}\T M\mathbf{v} = 6\,\mathrm{kg}$。于是 $R = 33.3\,\mathrm{s^{-2}}$，估计值为 $\omega_1 \le \sqrt{33.3} = 5.77\,\mathrm{rad/s}$，对照清单给出的精确值 $5.284\,\mathrm{rad/s}$，这个上界高出 $9\%$。换一个更接近真实形状 $(0.272, 0.468, 0.403)$ 的试验向量，比如 $(0.7, 1, 0.85)$，得 $R = 28.4\,\mathrm{s^{-2}}$、$\omega \le 5.33\,\mathrm{rad/s}$，误差在 $1\%$ 以内。
:::
:::

::: exercise 零模与动量守恒 {level=3}
设一条线上粒子系统的势能 $V(x_1, \dots, x_n)$ 在每个 $x_j$ 都平移相同量时不变。证明对 $\mathbf{u} = (1, \dots, 1)$ 有 $K\mathbf{u} = 0$，从而存在零模。再证明其余每个简正模的总动量都为零，且零模的简正坐标与质心位移成正比。
::: solution
平移不变性指对一切实数 $s$ 有 $V(\mathbf{x} + s\mathbf{u}) = V(\mathbf{x})$。在 $s = 0$ 处对 $s$ 求导：$\sum_j\partial V/\partial x_j = 0$ 对每个 $\mathbf{x}$ 成立。再把这个恒等式对 $x_k$ 求导并在平衡处取值：每个 $k$ 都有 $\sum_jK_{kj} = 0$，这正是 $K\mathbf{u} = 0$。于是 $\mathbf{u}$ 是 $\omega^2 = 0$ 的特征向量。

由 [[#thm-gen-eig]] 的第 (2) 部分，每个 $\omega_r \neq 0$ 的模 $\mathbf{a}_r$ 都与 $\mathbf{u}$ $M$-正交。此处 $M = \mathrm{diag}(m_1, \dots, m_n)$，故 $\mathbf{u}\T M\mathbf{a}_r = \sum_jm_ja_{rj} = 0$：在那个模里质量加权的位移之和为零，质心不动，总动量 $\sum_jm_j\dot\eta_j = \dot Q_r\sum_jm_ja_{rj}$ 为零。归一化的零模是 $\mathbf{a}_0 = \mathbf{u}/\sqrt{M_{\mathrm{tot}}}$，其简正坐标为 $Q_0 = \mathbf{a}_0\T M\boldsymbol\eta = \sum_jm_j\eta_j/\sqrt{M_{\mathrm{tot}}} = \sqrt{M_{\mathrm{tot}}}\,X_{\mathrm{cm}}$，与质心位移成正比。它的方程 $\ddot Q_0 = 0$ 就是总动量守恒，即 [[analytical-mechanics/lagrangian#thm-noether]] 中平移对应的诺特荷。这就是 CO₂ 平动模的一般版本。
:::
:::
