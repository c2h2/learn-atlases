氢原子是唯一能精确求解薛定谔方程的真实原子，而这一解就是原子物理与化学的基础。[[quantum-1/origins]] 中玻尔的模型用错误的图像给出了正确的能量：圆轨道、角动量为 $\hbar$ 的基态，以及除了一个方向之外说不出原子在任何方向上有多大的办法。薛定谔方程用正确的图像给出同样的能量：三维中的驻波定态，由三个量子数 $n$、$l$、$m$ 标记，基态球对称且角动量为零。

策略把此前建立的一切都用上了。中心势与角动量对易（[[quantum-1/angular-momentum]]），所以每个定态的角向依赖关系都是一个球谐函数 $Y_l^m(\theta, \varphi)$，剩下的只是径向运动的一维问题，与 [[quantum-1/piecewise-potentials]] 的问题很像，只是定义在半直线 $r > 0$ 上。对库仑势，这个径向方程可用幂级数求解，而且与谐振子完全一样，可归一化性迫使级数终止。终止就把能量量子化了。

凡不费事的地方我们都让核带电荷 $Ze$，使结果适用于 $\mathrm{He}^+$、$\mathrm{Li}^{2+}$ 这类类氢离子，算数值时令 $Z = 1$。全程使用约化质量 $\mu = m_em_p/(m_e + m_p)$；电子与质子的二体问题分解为质心的自由运动和单个质量为 $\mu$ 的粒子在势 $V(r)$ 中的运动，与经典力学一模一样。

## 从二体到单体 {#two-body}

氢原子是两个粒子，第一步是把它化为一个。这与经典开普勒问题中的化简完全相同，它在量子力学中奏效的原因也一样：相互作用只依赖间距。

::: proposition 质心的分离 {#prop-two-body}
设质量 $m_1$、$m_2$ 的两粒子位于 $\mathbf r_1$、$\mathbf r_2$，通过势 $V(\abs{\mathbf r_1 - \mathbf r_2})$ 相互作用。用质心 $\mathbf R = (m_1\mathbf r_1 + m_2\mathbf r_2)/M$（其中 $M = m_1 + m_2$）与相对位置 $\mathbf r = \mathbf r_1 - \mathbf r_2$ 表述，哈密顿量为

$$
\hat H = -\frac{\hbar^2}{2M}\nabla_{\mathbf R}^2 - \frac{\hbar^2}{2\mu}\nabla_{\mathbf r}^2 + V(r), \qquad \mu = \frac{m_1m_2}{m_1 + m_2},
$$

于是定态具有形式 $\Psi = e^{i\mathbf K\cdot\mathbf R}\psi(\mathbf r)$，能量为 $\hbar^2K^2/2M + E$，其中 $\psi$ 满足质量为 $\mu$ 的粒子在势 $V(r)$ 中的一体薛定谔方程。
:::

::: proof
由链式法则，$\partial/\partial x_1 = (m_1/M)\,\partial/\partial X + \partial/\partial x$ 且 $\partial/\partial x_2 = (m_2/M)\,\partial/\partial X - \partial/\partial x$，对 $y$ 与 $z$ 同样成立。平方得

$$
\frac{1}{m_1}\frac{\partial^2}{\partial x_1^2} + \frac{1}{m_2}\frac{\partial^2}{\partial x_2^2} = \frac{m_1 + m_2}{M^2}\frac{\partial^2}{\partial X^2} + \left(\frac{1}{m_1} + \frac{1}{m_2}\right)\frac{\partial^2}{\partial x^2} + \left(\frac{2}{M} - \frac{2}{M}\right)\frac{\partial^2}{\partial X\,\partial x}.
$$

交叉项相消，$(m_1 + m_2)/M^2 = 1/M$ 且 $1/m_1 + 1/m_2 = 1/\mu$，即得所述的哈密顿量。它是一项只作用于 $\mathbf R$（一个质量为 $M$ 的自由粒子，本征函数为平面波 $e^{i\mathbf K\cdot\mathbf R}$）与一项只作用于 $\mathbf r$ 之和，所以分离变量给出乘积形式的本征函数与相加的能量。
:::

对氢，$\mu = m_e/(1 + m_e/m_p) = 0.999456\,m_e$：修正约为千分之半，虽小，却远大于光谱测量的精度——氘正是这样被找到的。对电子偶素，两个质量相等，$\mu = m_e/2$，于是每个结合能都减半。以下我们都用相对坐标，并把质量记作 $\mu$。

## 分离变量 {#separation}

三维中的不含时薛定谔方程为

$$
-\frac{\hbar^2}{2\mu}\nabla^2\psi + V(r)\psi = E\psi.
$$

利用 [[quantum-1/angular-momentum#eq-laplacian]] 中拉普拉斯算符的分解，

$$
-\frac{\hbar^2}{2\mu}\frac{1}{r^2}\pdv{}{r}\left(r^2\pdv{\psi}{r}\right) + \frac{\hat L^2}{2\mu r^2}\psi + V(r)\psi = E\psi.
$$

算符 $\hat L^2$ 只作用于角度，所以我们尝试 $\psi(r, \theta, \varphi) = R(r)\,Y_l^m(\theta, \varphi)$。由于 $\hat L^2Y_l^m = \hbar^2l(l+1)Y_l^m$，球谐函数从每一项中都提了出来，剩下 $R$ 的一个常微分方程。用 $u(r) = rR(r)$ 表述形式最简单，因为 $\frac{1}{r^2}(r^2R')' = u''/r$。

::: definition 径向方程与有效势 {#def-radial}
对中心势中的定态 $\psi = R(r)Y_l^m(\theta,\varphi)$，函数 $u = rR$ 满足**径向方程**

$$
-\frac{\hbar^2}{2\mu}\deriv{^2u}{r^2} + V_{\mathrm{eff}}(r)\,u = Eu, \qquad V_{\mathrm{eff}}(r) = V(r) + \frac{\hbar^2l(l+1)}{2\mu r^2},
$$ {#eq-radial}

定义在 $0 < r < \infty$ 上，归一化为 $\int_0^\infty\abs u^2\,\dd r = 1$（当 $Y_l^m$ 归一化时 $\int\abs\psi^2\,\dd^3r = \int_0^\infty\abs R^2r^2\,\dd r$），并带边界条件 $u(0) = 0$。
:::

径向方程是在**有效势** $V_{\mathrm{eff}}$ 中的一维薛定谔方程。多出的项 $\hbar^2l(l+1)/2\mu r^2$ 是**离心势垒**。经典地，角动量为 $L$ 的粒子的径向动能为 $E - V - L^2/2\mu r^2$，最后一项把它推离原点；这里 $L^2$ 换成了它的本征值。要求 $u(0) = 0$，是因为 $R = u/r$ 必须在原点保持有限（对 $l = 0$，若 $u(0) \ne 0$ 则 $R \sim 1/r$，而 $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$ 会向方程中塞进一个本来不存在的 δ 函数）。所以这个半直线上的问题就像一口在 $r = 0$ 处立着无限高壁的阱。

注意 $m$ 不出现在 [[#eq-radial]] 中。径向函数依赖 $l$ 而不依赖 $m$，能量也是如此。这就是 [[quantum-1/angular-momentum]] 中预告的 $(2l+1)$ 重转动简并，它在任何中心势中都成立。

## 求解库仑问题 {#coulomb}

现在取 $V(r) = -Ze^2/4\pi\varepsilon_0r$，寻找束缚态，$E < 0$。引入

$$
\kappa = \frac{\sqrt{-2\mu E}}{\hbar}, \qquad \rho = \kappa r, \qquad \rho_0 = \frac{2\mu Ze^2}{4\pi\varepsilon_0\hbar^2\kappa}.
$$

把 [[#eq-radial]] 除以 $E = -\hbar^2\kappa^2/2\mu$，就化为无量纲形式

$$
\deriv{^2u}{\rho^2} = \left[1 - \frac{\rho_0}{\rho} + \frac{l(l+1)}{\rho^2}\right]u.
$$ {#eq-radial-dimless}

先看两端。$\rho$ 大时方括号趋于 $1$，$u \sim e^{-\rho}$（增长的解 $e^\rho$ 不可归一化）。$\rho$ 小时离心项主导，$u'' \approx l(l+1)u/\rho^2$ 的解是 $\rho^{l+1}$ 与 $\rho^{-l}$；条件 $u(0) = 0$ 选出 $\rho^{l+1}$。于是写

$$
u(\rho) = \rho^{l+1}e^{-\rho}\,v(\rho),
$$

并期望 $v$ 是一个性态良好的函数，最好是一个多项式。

::: theorem 氢原子的能级 {#thm-hydrogen}
质量为 $\mu$ 的粒子在势 $-Ze^2/4\pi\varepsilon_0r$ 中的束缚态能量为

$$
E_n = -\frac{\mu}{2\hbar^2}\left(\frac{Ze^2}{4\pi\varepsilon_0}\right)^2\frac{1}{n^2} = -\frac{Z^2\hbar^2}{2\mu a_\mu^2}\,\frac{1}{n^2}, \qquad n = 1, 2, 3, \ldots,
$$ {#eq-hydrogen-energy}

其中 $a_\mu = 4\pi\varepsilon_0\hbar^2/\mu e^2$。对每个 $n$，允许的角动量为 $l = 0, 1, \ldots, n-1$，径向函数为 $R_{nl} = u/r$，其中 $u = \rho^{l+1}e^{-\rho}v(\rho)$，$\rho = Zr/na_\mu$，而 $v$ 是一个 $n - l - 1$ 次多项式。
:::

::: proof
把 $u = \rho^{l+1}e^{-\rho}v$ 代入 [[#eq-radial-dimless]] 并除以 $\rho^{l}e^{-\rho}$，一番简短计算后（把乘积求导两次；含 $l(l+1)/\rho^2$ 的项与 $1$ 相消），得

$$
\rho\,v'' + 2(l + 1 - \rho)\,v' + \bigl(\rho_0 - 2(l+1)\bigr)\,v = 0.
$$

试 $v = \sum_{j\ge0}c_j\rho^j$。$\rho^j$ 的系数给出

$$
(j + 1)j\,c_{j+1} + 2(l+1)(j+1)\,c_{j+1} - 2j\,c_j + \bigl(\rho_0 - 2(l+1)\bigr)c_j = 0,
$$

即

$$
c_{j+1} = \frac{2(j + l + 1) - \rho_0}{(j + 1)(j + 2l + 2)}\,c_j.
$$ {#eq-hydrogen-recursion}

$j$ 大时 $c_{j+1}/c_j \approx 2/j$，这正是 $e^{2\rho} = \sum(2\rho)^j/j!$ 的比值。若级数不停止，$v$ 就会像 $e^{2\rho}$ 一样增长，$u$ 像 $\rho^{l+1}e^{\rho}$，不可归一化。所以级数必须终止：对某个 $j = N$（最后一个非零系数），分子为零，

$$
2(N + l + 1) = \rho_0, \qquad N = 0, 1, 2, \ldots
$$

定义**主量子数** $n = N + l + 1$，它是满足 $n \ge l + 1$ 的正整数。于是 $\rho_0 = 2n$。由 $\rho_0$ 的定义，$\kappa = \mu Ze^2/(4\pi\varepsilon_0\hbar^2n) = Z/(na_\mu)$，且

$$
E = -\frac{\hbar^2\kappa^2}{2\mu} = -\frac{\hbar^2Z^2}{2\mu a_\mu^2n^2},
$$

代入 $a_\mu$ 即等于 [[#eq-hydrogen-energy]] 的第一种形式。多项式 $v$ 的次数为 $N = n - l - 1$，给定 $n$ 时 $l$ 遍历 $0, 1, \ldots, n - 1$。
:::

能量就是玻尔的能量，如今是被推导出来的。它们只依赖 $n$，不依赖 $l$，这是 $1/r$ 势的特殊性质：在任何其他中心势中，$n$ 相同而 $l$ 不同的态能量不同，碱原子中就是这样，内层电子屏蔽了核。多项式 $v$ 是连带拉盖尔（Laguerre）多项式，$L^{2l+1}_{n-l-1}(2\rho)$。

::: corollary 简并度 {#cor-degeneracy}
氢的能级 $E_n$ 是 $n^2$ 重简并的（忽略自旋）。
:::

::: proof
对每个 $l = 0, \ldots, n - 1$ 有 $2l + 1$ 个 $m$ 值，所以态数为 $\sum_{l=0}^{n-1}(2l + 1) = 2\cdot\frac{(n-1)n}{2} + n = n^2$。
:::

$2l+1$ 那部分来自转动对称性。不同 $l$ 之间额外的简并被称为**偶然简并**，但它并非偶然：库仑问题还有一个守恒向量，即经典上使开普勒椭圆不进动的拉普拉斯–龙格–伦茨（Laplace–Runge–Lenz）向量的量子版本。沃尔夫冈·泡利（Wolfgang Pauli）在 1926 年就用它纯代数地求出了氢谱，早于薛定谔论文的发表。计入电子自旋后，每个能级容纳 $2n^2$ 个态，这正是元素周期表各周期的长度（$2, 8, 18, 32$）。

## 数值 {#numbers}

用无限核质量值 $m_e$ 代替 $\mu$，长度尺度就是**玻尔半径**，能量尺度就是**里德伯能量**：

$$
a_0 = \frac{4\pi\varepsilon_0\hbar^2}{m_ee^2} = 5.29177\times10^{-11}\,\mathrm m, \qquad E_R = \frac{\hbar^2}{2m_ea_0^2} = \frac{m_e}{2\hbar^2}\left(\frac{e^2}{4\pi\varepsilon_0}\right)^2 = 13.6057\,\mathrm{eV}.
$$ {#eq-a0}

两者都可由 [[quantum-1/origins]] 所列的 CODATA 2018 常量得出；例如 $a_0 = 4\pi(8.8541878\times10^{-12})(1.0545718\times10^{-34})^2/\bigl((9.1093837\times10^{-31})(1.6021766\times10^{-19})^2\bigr) = 5.29177\times10^{-11}\,\mathrm m$。用精细结构常数表示，$E_R = \frac12\alpha^2m_ec^2 = \frac12(1/137.036)^2(510{,}999\,\mathrm{eV})$，这表明原子的结合能比起电子的静能小因子 $\alpha^2/2 \approx 2.7\times10^{-5}$。这就是为什么非相对论量子力学对原子如此成功。

::: example 为什么原子有那样的大小 {#ex-size}
只用不确定性原理估算氢基态的大小与能量：被限制在距质子 $r$ 之内的电子，动量量级为 $\hbar/r$。
::: solution
把能量取为

$$
E(r) \approx \frac{\hbar^2}{2\mu r^2} - \frac{e^2}{4\pi\varepsilon_0r}.
$$

第一项是被限制所迫的动能，倾向于大原子；第二项是库仑吸引，倾向于小原子。令 $\dd E/\dd r = 0$ 得 $-\hbar^2/\mu r^3 + e^2/(4\pi\varepsilon_0r^2) = 0$，即

$$
r = \frac{4\pi\varepsilon_0\hbar^2}{\mu e^2} = a, \qquad E(a) = \frac{\hbar^2}{2\mu a^2} - \frac{\hbar^2}{\mu a^2} = -\frac{\hbar^2}{2\mu a^2}.
$$

两者都分毫不差，这是运气：若用 $\Delta p = \hbar/2r$ 或别的因子，数字会差上量级为一的因子。不是运气的是结构。经典原子会坍缩，因为没有任何东西抵抗库仑吸引；量子原子之所以稳定，是因为把电子挤紧要付出按 $1/r^2$ 增长的动能，快于势能按 $1/r$ 的降低。同样的竞争决定了每个原子的大小，并且加上费米统计，决定了普通物质的密度。
:::
:::

对真实的氢，把 $m_e$ 换成 $\mu = m_e/(1 + m_e/m_p) = 0.999456\,m_e$。于是 $E_n = -13.5983\,\mathrm{eV}/n^2$，而实测的氢的电离能 $13.598\,\mathrm{eV}$，在这一模型可信的每一位数字上都相符。剩下的差异约为 $10^5$ 分之几，是精细结构（相对论与自旋–轨道耦合），以及小得多的兰姆位移。

::: example 光谱线系 {#ex-series}
用 $R_H = R_\infty\,\mu/m_e = 1.096776\times10^7\,\mathrm{m^{-1}}$，求莱曼-$\alpha$（$2\to1$）、H$\alpha$（$3\to2$）与 H$\beta$（$4\to2$）的真空波长，以及莱曼系与巴耳末系的系限。
::: solution
由 $hc/\lambda = E_{n_2} - E_{n_1}$ 与 [[#eq-hydrogen-energy]]，光子的波数为 $1/\lambda = R_H(1/n_1^2 - 1/n_2^2)$。

- 莱曼-$\alpha$：$1/\lambda = \frac34R_H$，所以 $\lambda = 4/(3R_H) = 121.57\,\mathrm{nm}$，在真空紫外。
- H$\alpha$：$1/\lambda = \frac{5}{36}R_H$，$\lambda = 656.47\,\mathrm{nm}$（红），如 [[quantum-1/origins#ex-balmer]]。
- H$\beta$：$1/\lambda = \frac{3}{16}R_H$，$\lambda = 486.27\,\mathrm{nm}$（蓝绿）。
- 莱曼系限（$n_2 \to \infty$，$n_1 = 1$）：$\lambda = 1/R_H = 91.18\,\mathrm{nm}$。比这波长更短的光子会把基态的氢电离。
- 巴耳末系限（$n_1 = 2$）：$\lambda = 4/R_H = 364.71\,\mathrm{nm}$，在近紫外。

莱曼系完全落在紫外，巴耳末系则横跨可见光，这就是为什么巴耳末用十九世纪的分光镜就能找到他的公式，而莱曼（Lyman）的谱线要等到 1906 年的真空摄谱仪。
:::
:::

::: example 证实玻尔的那条谱线 {#ex-pickering}
1896 年，爱德华·皮克林（Edward Pickering）在恒星船帆座ζ的光谱中发现一系列谱线，与巴耳末系近乎交错却不严格交错；后来氦氢混合物的实验室光谱显示出一条 $468.6\,\mathrm{nm}$ 的强线，任何氢的公式都拟合不了。证明两者都属于 $\mathrm{He}^+$：计算 $\mathrm{He}^+$ 的 $4\to3$ 与 $6\to4$ 跃迁，包括约化质量（α 粒子质量 $m_\alpha = 7294.30\,m_e$），并把 $6\to4$ 与 H$\alpha$ 比较。
::: solution
对电荷 $Ze$、质量 $M$ 的核，[[#eq-hydrogen-energy]] 给出 $1/\lambda = Z^2R_M(1/n_1^2 - 1/n_2^2)$，其中 $R_M = R_\infty/(1 + m_e/M)$。对氦，$Z^2 = 4$，$R_{\mathrm{He}} = 1.0973732\times10^7/(1 + 1/7294.30) = 1.0972227\times10^7\,\mathrm{m^{-1}}$。

对 $4\to3$：$1/\lambda = 4R_{\mathrm{He}}(\frac19 - \frac1{16}) = 4R_{\mathrm{He}}\cdot\frac{7}{144}$，所以真空中 $\lambda = 36/(7R_{\mathrm{He}}) = 468.72\,\mathrm{nm}$，空气中为 $468.59\,\mathrm{nm}$。那就是观测到的谱线。

对 $6\to4$：$1/\lambda = 4R_{\mathrm{He}}(\frac1{16} - \frac1{36}) = 4R_{\mathrm{He}}\cdot\frac{5}{144} = R_{\mathrm{He}}\cdot\frac{5}{36}$。这正是把 $R_{\mathrm{He}}$ 代 $R_H$ 的 H$\alpha$ 公式，所以波长为 $656.20\,\mathrm{nm}$，而氢是 $656.47\,\mathrm{nm}$。凡 $n_1$ 与 $n_2$ 均为偶数的 $\mathrm{He}^+$ 谱线都几乎与某条氢谱线重合，奇数的则落在它们之间，这就是皮克林看到的交错。小小的偏移 $0.27\,\mathrm{nm}$ 完全来自约化质量效应。1913 年，阿尔弗雷德·福勒（Alfred Fowler）反驳说，按测得的精度，玻尔的理论拟合不了这些谱线；玻尔回答说加上约化质量就能拟合，五位有效数字的相符使物理学家相信模型里包含了某种真实的东西，功劳不小。
:::
:::

::: widget plot
f: -2/x + l*(l + 1)/x^2; -1; -0.25; -0.1111; -0.0625
x: 0.2, 30
y: -1.6, 0.6
labels: 有效势; n = 1; n = 2; n = 3; n = 4
sliders: l=0:0:4:1
caption: 里德伯单位下的有效势 $V_{\mathrm{eff}}$（能量以 $E_R$ 计，$r$ 以 $a_0$ 计）：$-2/r + l(l+1)/r^2$，水平线为能级 $-1/n^2$。$l = 0$ 时库仑势阱一直降到 $-\infty$。调大 $l$：离心势垒把极小值推到 $r = l(l+1)$、抬升到 $-1/l(l+1)$，于是 $n = l$ 的能级再也放不下。这就是为什么 $l \le n - 1$。对 $l = 1$，极小值 $-\frac12$ 低于 $n = 2$ 而高于 $n = 1$。
:::

::: quiz
忽略自旋，氢有多少个态满足 $E = E_3$？出现哪些 $l$ 值？
- [ ] 3 个态，$l = 0, 1, 2$。
- [ ] 6 个态，$l = 1, 2, 3$。
- [x] 9 个态，$l = 0, 1, 2$。
- [ ] 9 个态，$l = 0, 1, 2, 3$。
::: solution
$n = 3$ 时 $l = 0, 1, 2$（$l \le n - 1$），共 $1 + 3 + 5 = 9 = n^2$ 个态。$n = 3$ 没有 $l = 3$ 的态：径向多项式的次数将是 $n - l - 1 = -1$。
:::
:::

## 波函数 {#wavefunctions}

定态是 $\psi_{nlm} = R_{nl}(r)Y_l^m(\theta, \varphi)$。由递推关系并取 $\rho = r/na$（把 $a_\mu$ 记作 $a$，忽略核运动时即 $a_0$），最几个归一化径向函数是

$$
\begin{aligned}
R_{10} &= 2a^{-3/2}e^{-r/a}, \\
R_{20} &= \frac{1}{\sqrt2}a^{-3/2}\left(1 - \frac{r}{2a}\right)e^{-r/2a}, \qquad R_{21} = \frac{1}{\sqrt{24}}a^{-3/2}\,\frac ra\,e^{-r/2a}, \\
R_{30} &= \frac{2}{3\sqrt3}a^{-3/2}\left(1 - \frac{2r}{3a} + \frac{2r^2}{27a^2}\right)e^{-r/3a}.
\end{aligned}
$$

基态是

$$
\psi_{100}(\mathbf r) = \frac{1}{\sqrt{\pi a^3}}\,e^{-r/a}.
$$ {#eq-ground-state}

它球对称，$l = 0$ 因而角动量为零，并且在核处最大。每个 $R_{nl}$ 有 $n - l - 1$ 个径向节点，$Y_l^m$ 又贡献 $l$ 个角向节点，所以 $\psi_{nlm}$ 共有 $n - 1$ 个节面，推广了一维势阱的节点计数。化学记号中 $l = 0, 1, 2, 3$ 记作 $s, p, d, f$，所以 $\psi_{100}$ 是 $1s$ 轨道，$\psi_{200}$ 是 $2s$ 轨道，$\psi_{21m}$ 是 $2p$ 轨道。

在任何方向上于 $r$ 与 $r + \dd r$ 之间找到电子的概率是**径向概率密度**

$$
P(r)\,\dd r = \abs{R_{nl}(r)}^2r^2\,\dd r = \abs{u(r)}^2\,\dd r,
$$

其中 $\abs{Y_l^m}^2$ 的角向积分为 $1$。因子 $r^2$ 来自球壳的面积 $4\pi r^2$，这就是为什么即使 $\abs\psi^2$ 在原点最大，$P(r)$ 也在原点为零。

::: example 基态的电子在哪里？ {#ex-ground}
对 $\psi_{100}$，求最可几的核距离、平均距离 $\langle r\rangle$、电子位于距核 $a$ 之内的概率，以及 $\langle V\rangle$ 与 $\langle T\rangle$。
::: solution
$P(r) = 4a^{-3}r^2e^{-2r/a}$。它的导数在 $2r - 2r^2/a = 0$ 处为零，所以最可几距离是 $r = a$，即玻尔半径。平均值为

$$
\langle r\rangle = \frac{4}{a^3}\int_0^\infty r^3e^{-2r/a}\,\dd r = \frac{4}{a^3}\cdot\frac{3!}{(2/a)^4} = \frac32a,
$$

用了 $\int_0^\infty r^ke^{-\beta r}\,\dd r = k!/\beta^{k+1}$。平均值大于最可几值，是因为 $P(r)$ 有一条长尾。$a$ 之内的概率，取 $x = 2r/a$：

$$
\int_0^a\frac{4r^2}{a^3}e^{-2r/a}\,\dd r = \frac12\int_0^2x^2e^{-x}\,\dd x = \frac12\Bigl[-e^{-x}(x^2 + 2x + 2)\Bigr]_0^2 = 1 - 5e^{-2} = 0.323.
$$

所以三分之二的时间里，电子离质子比一个玻尔半径还远。能量方面，$\langle 1/r\rangle = (4/a^3)\int_0^\infty re^{-2r/a}\,\dd r = (4/a^3)(a^2/4) = 1/a$，所以 $\langle V\rangle = -e^2/(4\pi\varepsilon_0a) = -2E_R = -27.2\,\mathrm{eV}$。于是 $\langle T\rangle = E_1 - \langle V\rangle = -13.6 + 27.2 = +13.6\,\mathrm{eV}$。这就是 $1/r$ 势的位力定理 $2\langle T\rangle = -\langle V\rangle$，在 [[quantum-1/formalism]] 的习题中证明过。
:::
:::

::: example 用递推构造 R₂₀ {#ex-r20}
用递推关系 [[#eq-hydrogen-recursion]] 构造 $R_{20}$，并加归一化。
::: solution
$n = 2$、$l = 0$ 时 $\rho_0 = 2n = 4$，且 $\rho = r/2a$。从 $c_0$ 出发，递推给出

$$
c_1 = \frac{2(0 + 0 + 1) - 4}{(1)(2)}\,c_0 = -c_0, \qquad c_2 = \frac{2(1 + 0 + 1) - 4}{(2)(3)}\,c_1 = 0,
$$

所以级数一步之后停止，$v(\rho) = c_0(1 - \rho)$。于是 $u = \rho\,e^{-\rho}(1 - \rho)$，且

$$
R_{20} = \frac ur \propto \left(1 - \frac{r}{2a}\right)e^{-r/2a}.
$$

归一化方面，写 $R_{20} = A(1 - r/2a)e^{-r/2a}$，并要求 $\int_0^\infty R_{20}^2r^2\,\dd r = 1$。取 $x = r/a$，

$$
A^2a^3\int_0^\infty\left(1 - x + \frac{x^2}{4}\right)x^2e^{-x}\,\dd x = A^2a^3\left(2 - 6 + \frac{24}{4}\right) = 2A^2a^3,
$$

所以 $A = 1/\sqrt{2a^3}$，即上面列出的系数。径向节点在 $1 - r/2a = 0$ 处，即 $r = 2a$，且 $n - l - 1 = 1$，与所承诺的一致。同样地，$n = 2$、$l = 1$ 时立即有 $c_1 = (2(0 + 2) - 4)c_0/(\ldots) = 0$，所以 $v$ 是常数，$R_{21} \propto re^{-r/2a}$，没有径向节点。
:::
:::

::: widget plot
f: 4*x^2*exp(-2*x); x^2*(2 - x)^2*exp(-x)/8; x^4*exp(-x)/24; (4/27)*x^2*(1 - 2*x/3 + 2*x^2/27)^2*exp(-2*x/3)
x: 0, 25
y: 0, 0.6
labels: 1s; 2s; 2p; 3s
caption: 径向概率密度 $P(r) = r^2\abs{R_{nl}}^2$，$r$ 以 $a_0$ 为单位。$1s$ 曲线在 $r = a_0$ 处取峰。$2p$ 曲线没有节点，在 $4a_0 = n^2a_0$ 处取峰，即 $n = 2$ 的玻尔半径；$2s$ 曲线有一个位于 $2a_0$ 的径向节点，$3s$ 有两个。注意 $2s$ 在核附近有一个小的内峰：$s$ 电子比同样 $n$ 的 $p$ 电子更能钻入内层区域，这就是为什么在多电子原子中 $2s$ 低于 $2p$。
:::

### 实轨道及其形状

化学偏爱实波函数。由于 $\psi_{nl,m}$ 与 $\psi_{nl,-m}$ 能量相同，它们的任何组合也是定态，而给出 $\cos\varphi$ 与 $\sin\varphi$ 的 $e^{\pm i\varphi}$ 的组合是实的。$l = 1$ 时，三个实轨道正比于 $x$、$y$、$z$ 乘一个径向函数，即 $p_x$、$p_y$、$p_z$ 轨道，各有一个过核的节面。$l = 2$ 时，五个实组合正比于 $xy$、$yz$、$zx$、$x^2 - y^2$ 与 $3z^2 - r^2$，即 $d$ 轨道，各有两个节面。实轨道是 $\hat H$ 与 $\hat L^2$ 的本征函数，但不是 $\hat L_z$ 的本征函数：要 $m$ 确定，还是要波函数是实的，二者不可得兼，$m = 0$ 除外。自由原子中没有任何东西在一组基与另一组基之间做选择；在分子或晶体中，环境打破转动对称性，挑出那些指向邻近原子或介于原子之间的实轨道。

节点计数换一种方式说明了为什么 $l \le n - 1$。给定 $n$ 的态共有 $n - 1$ 个节面。它们可以是球面（径向节点），也可以是过核的锥面与平面（角向节点，共 $l$ 个）。最大的 $l$ 就是每个节点都是角向的那一个，$l = n - 1$，一个径向节点也没有。

一般结果（可由径向函数得出，或更优雅地由费曼–赫尔曼（Feynman–Hellmann）定理与位力定理得出）是

$$
\langle r\rangle_{nl} = \frac a2\bigl(3n^2 - l(l+1)\bigr), \qquad \left\langle\frac1r\right\rangle_{nl} = \frac{1}{n^2a}.
$$

原子的大小按 $n^2$ 增长，与玻尔模型中一样；而 $\langle 1/r\rangle$ 对一切态都给出 $\langle V\rangle = 2E_n$。对 $n = l + 1$（$l$ 取最大值的"圆轨道"态），$P(r) \propto r^{2n}e^{-2r/na}$ 恰在玻尔半径 $n^2a$ 处取峰，而 $n$ 大时分布很窄：这些态最像玻尔的轨道。实验室里已造出高度激发的**里德伯原子**，$n \sim 100$，直径接近一微米。

::: remark 连续谱
束缚态只是谱的一部分。$E > 0$ 时径向方程对每个能量都有解，大 $r$ 处表现为入射与出射球面波，并带有反映库仑力长程性的对数相位畸变。这些**连续谱态**描述电子被质子的散射，完备性需要它们：相对坐标的任意波函数都是束缚态与连续谱态的组合。光电离——能量高于 $13.6\,\mathrm{eV}$ 的光子把电子从 $\psi_{100}$ 提升到连续谱——正是使莱曼系限成为氢云吸收光谱上一道陡峭边缘的过程。
:::

::: warning 玻尔轨道不是基态
常见的错误是把 $\psi_{100}$ 读作"电子在半径 $a_0$ 上旋转"。真正的基态中 $l = 0$：角动量为零而不是 $\hbar$，分布球对称而不是一个环。电子到核的距离有一个展布，$\langle r\rangle = 1.5\,a_0$，且有 $32\%$ 的概率在 $a_0$ 之内；处于 $1s$ 态的电子在核处甚至有非零的概率密度，这由质子磁矩引起的超精细相互作用测得。玻尔模型在能量以及把 $a_0$ 作为尺度这两点上与量子力学一致。它在原子长什么样这一点上不一致。
:::

::: example 类氢离子与奇异原子 {#ex-exotic}
(a) 求 $\mathrm{He}^+$ 的基态能量与半径（$Z = 2$，忽略约化质量修正）。(b) 在**μ子氢**中，带负电的 μ 子（质量 $m_\mu = 206.768\,m_e$）取代电子。求它的约化质量、基态能量与玻尔半径。
::: solution
(a) 由 [[#eq-hydrogen-energy]]，能量按 $Z^2$ 伸缩；由 $\kappa = Z/na$，长度尺度按 $1/Z$ 伸缩。所以 $E_1(\mathrm{He}^+) = -4\times13.6057 = -54.42\,\mathrm{eV}$，半径尺度为 $a_0/2 = 26.5\,\mathrm{pm}$。实测氦的第二电离能为 $54.42\,\mathrm{eV}$。

(b) $\mu = m_\mu m_p/(m_\mu + m_p)$，其中 $m_p = 1836.15\,m_e$：$\mu = (206.768)(1836.15)/(2042.92)\,m_e = 185.84\,m_e$。每个公式都按 $\mu$ 伸缩：$E_1 = -185.84\times13.6057\,\mathrm{eV} = -2.528\,\mathrm{keV}$，玻尔半径为 $a_0/185.84 = 2.85\times10^{-13}\,\mathrm m = 285\,\mathrm{fm}$，只有质子自身半径的约 $300$ 倍。μ 子的波函数与质子的重叠远大于电子的波函数，所以能级对质子的有限大小敏感。2010 年，兰道夫·波尔（Randolf Pohl）与合作者测量了 μ 子氢的兰姆位移，得出质子电荷半径 $0.84\,\mathrm{fm}$，比普通氢得到的值小百分之四，揭开了"质子半径疑难"的序幕；后来的电子测量结果已大体移向 μ 子的值。
:::
:::

::: application 天文中的氢
宇宙中绝大多数普通物质是氢，天文学家正是靠它的光谱找到它。热星周围的电离气体在 $656\,\mathrm{nm}$ 的 H$\alpha$ 上发光，赋予发射星云红色；巴耳末吸收线是 A 型恒星光谱的主要特征；介于其间的对莱曼-$\alpha$ 的吸收，会在遥远类星体的光谱上留下一片谱线"森林"。处于基态的中性氢通过 $1420.4\,\mathrm{MHz}$ 的 $21\,\mathrm{cm}$ 线被测绘，这条线产生于电子自旋相对质子自旋的翻转。该光子能量 $5.9\,\mu\mathrm{eV}$ 就是 $\psi_{100}$ 的超精细分裂，正比于核处的密度 $\abs{\psi_{100}(0)}^2 = 1/\pi a^3$。
:::

::: history 求解氢原子
约汉·巴耳末（Johann Balmer）1885 年拟合了可见谱线，约翰内斯·里德伯（Johannes Rydberg）1888 年找到一般公式并于 1890 年发表。玻尔的模型 1913 年接踵而至，索末菲（Sommerfeld）的相对论修正则在 1916 年。在 1926 年 1 月 17 日送审的《物理学杂志》（*Zeitschrift für Physik*）论文中，沃尔夫冈·泡利（Wolfgang Pauli）用守恒的龙格–伦茨向量从海森堡的矩阵力学导出了巴耳末公式。埃尔温·薛定谔（Erwin Schrödinger）关于波动力学的第一篇论文于十天后——1926 年 1 月 27 日——送审《物理学年鉴》（*Annalen der Physik*），用本文采用的方法解出径向方程，得到同一批能级，本征函数为球谐函数与拉盖尔多项式。哈罗德·尤里（Harold Urey）、费迪南德·布里克维德（Ferdinand Brickwedde）与乔治·墨菲（George Murphy）1932 年借助同位素位移的巴耳末谱线发现了氘。1947 年，威利斯·兰姆（Willis Lamb）与罗伯特·雷瑟福德（Robert Retherford）发现，即使在狄拉克的相对论理论中仍然简并的 $2s_{1/2}$ 与 $2p_{1/2}$ 也分裂了约 $1\,\mathrm{GHz}$，这是导致量子电动力学诞生的测量之一。
:::

## 后续内容 {#leads}

电子自旋（[[quantum-1/spin]]）使每个能级加倍。相对论修正、自旋–轨道耦合与兰姆位移把 $n^2$ 简并劈分为精细结构与超精细结构，将在 [[quantum-2/stationary-perturbation]] 与 [[quantum-2/atomic-structure]] 中用微扰论处理。多电子原子无法精确求解；氢原子轨道加上屏蔽，是元素周期表的出发点。化学图谱在[氢原子](/learn/chemistry/lesson.php?c=quantum-chemistry&l=hydrogen-atom)与[多电子原子](/learn/chemistry/lesson.php?c=quantum-chemistry&l=many-electron-atoms)两文中，从化学家的角度展开同一解的图像。

::: summary
- 在中心势中 $\psi = R(r)Y_l^m(\theta, \varphi)$，而 $u = rR$ 服从一个一维方程，其中 $V_{\mathrm{eff}} = V + \hbar^2l(l+1)/2\mu r^2$，且 $u(0) = 0$。
- 对库仑势，代换 $u = \rho^{l+1}e^{-\rho}v$ 给出一个必须终止的级数，从而量子化出 $E_n = -Z^2E_R(\mu/m_e)/n^2$，$n = 1, 2, \ldots$ 且 $l \le n - 1$。
- $a_0 = 4\pi\varepsilon_0\hbar^2/m_ee^2 = 52.9177\,\mathrm{pm}$，$E_R = \frac12\alpha^2m_ec^2 = 13.6057\,\mathrm{eV}$；计入约化质量后，氢的基态在 $-13.598\,\mathrm{eV}$。
- 能级 $E_n$ 不计自旋时是 $n^2$ 重简并的；对 $l$ 的简并为 $1/r$ 所独有。
- $\psi_{100} = e^{-r/a}/\sqrt{\pi a^3}$ 有 $l = 0$，最可几半径 $a$，$\langle r\rangle = \frac32a$，$\langle V\rangle = 2E_1$。
- $\psi_{nlm}$ 有 $n - l - 1$ 个径向节点与 $l$ 个角向节点；$\langle r\rangle$ 按 $n^2$ 增长。
- 光谱线满足 $1/\lambda = R_H(1/n_1^2 - 1/n_2^2)$，其中 $R_H = 1.096776\times10^7\,\mathrm{m^{-1}}$。
:::

## 习题 {#exercises}

::: exercise 从 n = 2 电离 {level=1 check="3.40"}
使处于 $n = 2$ 定态的氢原子电离需要多少能量（以 eV 计）？用约化质量值 $E_1 = -13.598\,\mathrm{eV}$。
::: solution
$E_2 = -13.598/4 = -3.3996\,\mathrm{eV}$，所以需要 $3.40\,\mathrm{eV}$。波长低于 $1239.84/3.40 = 365\,\mathrm{nm}$ 的光子就能做到，这正是巴耳末系限。
:::
:::

::: exercise 数态 {level=1 check="16"}
$n = 4$ 有多少个轨道态（忽略自旋）？列出各 $l$ 值及每个 $l$ 的态数。
::: solution
$l = 0, 1, 2, 3$ 分别有 $1, 3, 5, 7$ 个态：共 $16 = 4^2$ 个，计入自旋则 $32$ 个。
:::
:::

::: exercise 巴耳末系限 {level=1 check="364.7"}
用 $R_H = 1.096776\times10^7\,\mathrm{m^{-1}}$ 求巴耳末系的短波极限（纳米）。
::: solution
$1/\lambda = R_H/4$，所以 $\lambda = 4/R_H = 3.6471\times10^{-7}\,\mathrm m = 364.7\,\mathrm{nm}$。
:::
:::

::: exercise 一个玻尔半径之内 {level=2 check="1 - 5*exp(-2)"}
证明基态电子处于 $r < a$ 之内的概率为 $1 - 5e^{-2}$。
::: solution
这已在 [[#ex-ground]] 中算出：$\int_0^a4a^{-3}r^2e^{-2r/a}\,\dd r = \frac12\int_0^2x^2e^{-x}\,\dd x = 1 - 5e^{-2} = 0.323$。
:::
:::

::: exercise 2p 的平均半径 {level=2 check="5"}
用 $R_{21} = (24)^{-1/2}a^{-3/2}(r/a)e^{-r/2a}$，以 $a$ 为单位计算 $\langle r\rangle$，并求最可几半径。
::: solution
$P(r) = r^2R_{21}^2 = \frac{1}{24a^5}r^4e^{-r/a}$。于是

$$
\langle r\rangle = \frac{1}{24a^5}\int_0^\infty r^5e^{-r/a}\,\dd r = \frac{5!\,a^6}{24a^5} = 5a,
$$

与 $\frac a2(3n^2 - l(l+1)) = \frac a2(12 - 2) = 5a$ 一致。$r^4e^{-r/a}$ 的最大值在 $4r^3 = r^4/a$ 处，即 $r = 4a$，就是 $n = 2$ 的玻尔半径 $n^2a$。
:::
:::

::: exercise μ子氢 {level=2 check="2.528"}
用 $m_\mu = 206.768\,m_e$、$m_p = 1836.153\,m_e$ 与 $E_R = 13.6057\,\mathrm{eV}$，求 μ 子氢的基态结合能（keV）。
::: solution
$\mu/m_e = (206.768)(1836.153)/(206.768 + 1836.153) = 185.841$。结合能为 $185.841\times13.6057\,\mathrm{eV} = 2528.5\,\mathrm{eV} = 2.528\,\mathrm{keV}$。μ 子氢的莱曼-$\alpha$ 光子为其 $\frac34$，是一个 $1.90\,\mathrm{keV}$ 的 X 射线。
:::
:::

::: exercise 氘的位移 {level=3 check="0.179"}
氘的核质量为 $m_d = 3670.48\,m_e$。用 $R_\infty = 1.0973732\times10^7\,\mathrm{m^{-1}}$ 与 $m_p = 1836.153\,m_e$，求氢与氘中 H$\alpha$ 真空波长之差（纳米）。
::: hint
$\lambda \propto 1/R_M$，其中 $R_M = R_\infty/(1 + m_e/M)$，所以 $\lambda_{\mathrm H} - \lambda_{\mathrm D} = \lambda_\infty(m_e/m_p - m_e/m_d)$。
:::
::: solution
$\lambda_M = \frac{36}{5R_\infty}(1 + m_e/M)$。由 $36/(5R_\infty) = 656.112\,\mathrm{nm}$，

$$
\lambda_{\mathrm H} - \lambda_{\mathrm D} = 656.112\left(\frac{1}{1836.153} - \frac{1}{3670.48}\right)\mathrm{nm} = 656.112\times(5.4462 - 2.7244)\times10^{-4}\,\mathrm{nm} = 0.179\,\mathrm{nm}.
$$

所以 $\lambda_{\mathrm H} = 656.470\,\mathrm{nm}$，$\lambda_{\mathrm D} = 656.291\,\mathrm{nm}$。尤里的小组在 1932 年就是在 H$\alpha$ 的短波一侧发现了那条暗弱的氘线，间隔几乎恰好是这一数值。
:::
:::

::: exercise 检验基态 {level=3}
直接验证 $\psi_{100} = (\pi a^3)^{-1/2}e^{-r/a}$ 满足 $V = -e^2/4\pi\varepsilon_0r$、能量 $E_1 = -\hbar^2/2\mu a^2$ 的薛定谔方程，其中 $a = 4\pi\varepsilon_0\hbar^2/\mu e^2$。再证明 $\psi_{200}$ 与它正交。
::: solution
对只依赖 $r$ 的函数，$\nabla^2\psi = \frac1r\deriv{^2}{r^2}(r\psi)$。由 $r\psi \propto re^{-r/a}$：$(re^{-r/a})'' = \bigl(-\frac2a + \frac{r}{a^2}\bigr)e^{-r/a}$，所以

$$
\nabla^2\psi = \left(\frac{1}{a^2} - \frac{2}{ar}\right)\psi.
$$

于是

$$
-\frac{\hbar^2}{2\mu}\nabla^2\psi - \frac{e^2}{4\pi\varepsilon_0r}\psi = \left(-\frac{\hbar^2}{2\mu a^2} + \frac{\hbar^2}{\mu ar} - \frac{e^2}{4\pi\varepsilon_0r}\right)\psi.
$$

由 $a$ 的定义，$\hbar^2/\mu a = e^2/4\pi\varepsilon_0$，所以两个 $1/r$ 项相消，方程以 $E = -\hbar^2/2\mu a^2$ 成立。这一相消正是决定 $a$ 的条件：任何别的衰减长度都会留下一个未消去的 $1/r$ 项。

关于正交性，两个函数都球对称，所以

$$
\langle\psi_{100}|\psi_{200}\rangle = 4\pi\int_0^\infty\frac{1}{\sqrt{\pi a^3}}e^{-r/a}\cdot\frac{1}{\sqrt{32\pi a^3}}\left(2 - \frac ra\right)e^{-r/2a}r^2\,\dd r \propto \int_0^\infty\left(2 - x\right)x^2e^{-3x/2}\,\dd x,
$$

其中用了 $\psi_{200} = R_{20}Y_0^0 = (32\pi a^3)^{-1/2}(2 - r/a)e^{-r/2a}$ 与 $x = r/a$。由 $\int_0^\infty x^ke^{-3x/2}\,\dd x = k!(2/3)^{k+1}$，积分为 $2\cdot2(2/3)^3 - 6(2/3)^4 = \frac{32}{27} - \frac{32}{27} = 0$，厄米算符的属于不同本征值的本征函数理应如此。
:::
:::
