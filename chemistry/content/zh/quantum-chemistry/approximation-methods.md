氢原子是量子化学能够精确求解的最后一个体系。加上第二个电子——氦，第二个最简单的原子——薛定谔方程就不再可分离：排斥项 $1/r_{12}$ 把两个电子的坐标拴在一起，任何变量替换都解不开它们。氢以外的每个原子、每个分子、每种材料因此都是*近似*问题，而整个实用量子化学都建立在两大近似策略之上。**变分法**请你猜一个带可调参数的波函数，再调参数使能量最小；答案保证落在真实值之上，所以改进是单调而诚实的。**微扰理论**则从一个你能解的问题出发，把一个小扰动作为幂级数加进去，逐阶修正能量与波函数。它们不是课堂戏法：哈特里-福克理论就是带轨道形式假设的变分法，米-普（Møller–Plesset）微扰与组态相互作用方法是微扰论及其重求和，密度泛函理论带着同样的变分逻辑、只是以密度取代波函数。在氦和氢上学好这两种方法，就是在缩微模型下学习为现代化学做计算的软件。

## 为什么需要近似

把任何多于一个电子的体系的精确电子哈密顿量写出来，障碍总是一样的：电子排斥项 $\sum_{i<j} e^{2}/4\pi\varepsilon_{0} r_{ij}$ 把不同电子的坐标耦合起来，于是波函数不是单电子函数的乘积，微分方程也不分离。回应的方式有三种，量子化学三种都用。其一，**平均场**：把复杂的关联运动替换为每个电子在其他电子的平均场中运动——这就是轨道图像，而把它做到自洽就是哈特里-福克理论（[[computational-chemistry/hartree-fock]]）。其二，**变分**：什么都不解，而是*优化*一个试探波函数去逼近能量，因为能量可以用积分算出来。其三，**微扰**：把哈密顿量拆成可解部分加一个小余项，再按小余项展开。变分法与微扰论是本课的主题；平均场图像在[[quantum-chemistry/many-electron-atoms]]中重现，并在计算课程里以完全自洽的形式再现。

有一个事实把下面的一切都组织起来。精确的基态能量 $E_0$ 是一个*最小值*——任何物理上容许的波函数都 undercut 不了的下界——而微扰论给出的是一个*级数*，它可能收敛得快、收敛得慢、或者根本不收敛。两种方法朝相反的方向失效，这正是实践者把它们一起使用、彼此对照的原因。

## 变分原理

::: theorem 变分原理 {#thm-variation}
对任何归一化的试探波函数 $\psi$（满足问题的边界条件与对称性），哈密顿量的期望值满足
$$
\langle H \rangle = \int \psi^{*} \hat{H} \psi \, \mathrm{d}\tau \;\ge\; E_0 ,
$$
其中 $E_0$ 是精确的基态能量。等号成立当且仅当 $\psi$ 就是精确的基态波函数。
:::

::: proof
设 $\hat H$ 的精确本征函数为 $\phi_n$，能量为 $E_0 \le E_1 \le E_2 \le \cdots$，并把试探函数展开为 $\psi = \sum_n c_n \phi_n$，$\sum_n |c_n|^2 = 1$。因为 $\phi_n$ 都是本征函数，
$$
\langle H \rangle = \sum_n |c_n|^2 E_n \;\ge\; E_0 \sum_n |c_n|^2 = E_0 ,
$$
因为每个 $E_n \ge E_0$。差 $\langle H \rangle - E_0 = \sum_n |c_n|^2 (E_n - E_0)$ 是若干非负项之和，只有当所有使 $E_n > E_0$ 的 $c_n$ 都为零时才消失——也就是说，只有当 $\psi$ 就是基态本身时才消失。
:::

[[#thm-variation]]的实用内涵在于它把量子力学变成了*优化*：选一个带参数 $\alpha$ 的试探函数 $\psi(\alpha)$，算出 $E(\alpha) = \langle \psi | \hat H | \psi \rangle$（归一化积分一并算入），再求最小，你得到的能量只可能偏高。改进试探函数永远不会让答案变坏——误差按波函数误差的*平方*下降，所以粗糙的波函数也能给出过得去的能量。

::: example 自上方逼近势箱：$\psi = x(L-x)$ {#ex-box-variational}
不必用精确解：用最简单的、在两端都为零的函数 $\psi = x(L-x)$ 来近似长度为 $L$ 的一维势箱的基态，并与 $E_1 = \pi^{2}\hbar^{2}/2mL^{2}$ 比较。
::: solution
由 $\psi' = L - 2x$，
$$
E = \frac{\int_0^L \tfrac{1}{2}\hbar^{2} (\psi')^{2}\,\mathrm{d}x}{\int_0^L \psi^{2}\,\mathrm{d}x}
= \frac{\tfrac{1}{2}\hbar^{2} \cdot L^{3}/3}{L^{5}/30} = \frac{5\hbar^{2}}{mL^{2}} .
$$
与精确值 $E_1 = (\pi^{2}/2)\,\hbar^{2}/mL^{2} = 4.935\,\hbar^{2}/mL^{2}$ 相比，这个值偏高 $5/4.935 = 1.013$ 倍——百分之一点三，而所用的函数只是零点位置正确。对 $1.00\ \mathrm{nm}$ 势箱中的电子，精确的 $E_1$ 为 $0.376\ \mathrm{eV}$，估计值为 $0.381\ \mathrm{eV}$。这一课是反复出现的那一课：能量对波函数误差十分宽容。
:::
:::

::: example 用高斯函数处理谐振子 {#ex-ho-gaussian}
对 $\hat H = -\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}}{\mathrm{d}x^{2}} + \tfrac{1}{2} m \omega^{2} x^{2}$ 试用高斯函数 $\psi = e^{-\alpha x^{2}/2}$（任意 $\alpha > 0$），并对 $\alpha$ 求最小。
::: solution
归一化高斯满足 $|\psi|^{2} \propto e^{-\alpha x^{2}}$，故 $\langle x^{2} \rangle = 1/2\alpha$，而动能项分部积分（$\int \psi(-\psi'')\,\mathrm{d}x = \int (\psi')^{2}\,\mathrm{d}x = \tfrac{\alpha}{2}\int\psi^{2}\,\mathrm{d}x$）给出
$$
E(\alpha) = \frac{\hbar^{2}\alpha}{4m} + \frac{m\omega^{2}}{4\alpha}, \qquad
\frac{\mathrm{d}E}{\mathrm{d}\alpha} = \frac{\hbar^{2}}{4m} - \frac{m\omega^{2}}{4\alpha^{2}} = 0 \;\Longrightarrow\; \alpha^{*} = \frac{m\omega}{\hbar}.
$$
在最优点 $E = \hbar\omega/4 + \hbar\omega/4 = \tfrac{1}{2}\hbar\omega$——精确的零点能。试探空间*包含*了精确解，于是变分法找到了它；动能与势能两半相互平衡，正是维里定理在自我宣告。
:::
:::

::: warning 变分原理承诺什么、不承诺什么 {#warn-variation}
三条限定把这条保证变成一件工具。第一，$\langle H \rangle \ge E_0$ 只在对*正确边界条件*成立的试探函数上成立：对势箱试用高斯函数不满足箱壁处为零，其朴素能量可能低于 $E_0$——失效的是定理的前提，不是定理本身。第二，如果你的试探函数具有*激发*态的对称性，你找到的最小值界定的是*该对称性*下的最低能级，而不是 $E_0$：变分法永远找不到它无法表示的那种对称性的态。第三，能量对波函数误差是二阶精确，而波函数本身只是一阶精确——变分计算给出的能量看起来比产生它的波函数更好，当你要算 $E$ 以外的性质时，这一点就要命。
:::

## 氦：经典的变分计算

氦的基态是基准题。以原子单位（$\hbar = m_e = e = 4\pi\varepsilon_0 = 1$；$1\ \mathrm{E_h} = 27.2114\ \mathrm{eV}$）写核电荷 $Z = 2$ 的哈密顿量：
$$
\hat{H} = -\tfrac{1}{2}\nabla_1^{2} - \frac{Z}{r_1} -\tfrac{1}{2}\nabla_2^{2} - \frac{Z}{r_2} + \frac{1}{r_{12}} .
$$
丢掉 $1/r_{12}$，你得到两个独立的类氢离子，$E^{(0)} = 2 \times \left(-Z^{2}/2\right) = -4\ \mathrm{E_h} = -108.85\ \mathrm{eV}$。两个未缩放的 $1s$ 轨道之间的排斥期望值恰为 $5Z/8 = 1.25\ \mathrm{E_h} = 34.01\ \mathrm{eV}$，于是朴素能量为 $-2.75\ \mathrm{E_h} = -74.83\ \mathrm{eV}$——高得离谱（精确的非相对论值是 $-2.9037\ \mathrm{E_h} = -79.01\ \mathrm{eV}$）。物理诊断一目了然：每个电子都在*屏蔽*核与另一个电子之间的吸引，所以两个电子都该占据比未缩放 $1s$ *更弥散*的轨道。

::: example 用缩放核电荷处理氦 {#ex-helium-variation}
取两个类氢 $1s$ 轨道的乘积试探函数 $\psi = \left(\zeta^{3}/\pi\right) \exp\!\left[-\zeta\left(r_1 + r_2\right)\right]$，以有效电荷 $\zeta$ 为变分参数，求最优值。
::: solution
电荷为 $\zeta$ 的类氢轨道的三个期望值为：每个电子 $\langle -\tfrac{1}{2}\nabla^{2} \rangle = \zeta^{2}/2$，每个电子 $\langle -Z/r \rangle = -Z\zeta$，以及 $\langle 1/r_{12} \rangle = 5\zeta/8$。于是
$$
E(\zeta) = \zeta^{2} - 2Z\zeta + \tfrac{5}{8}\zeta \quad (\text{以 } \mathrm{E_h} \text{ 计}), \qquad
\frac{\mathrm{d}E}{\mathrm{d}\zeta} = 2\zeta - 2Z + \tfrac{5}{8} = 0 \;\Longrightarrow\; \zeta^{*} = Z - \tfrac{5}{16} = 1.6875 .
$$
每个电子为另一个电子屏蔽 $5/16$ 个质子——这是*屏蔽*的第一个定量数字，它将在[[quantum-chemistry/many-electron-atoms]]中以斯莱特（Slater）规则的面目重现。能量为 $E(\zeta^{*}) = -\zeta^{*2} = -2.8477\ \mathrm{E_h} = -77.49\ \mathrm{eV}$：好于朴素的 $-74.83\ \mathrm{eV}$，但仍比精确值 $-79.01\ \mathrm{eV}$ 高 $1.5\ \mathrm{eV}$。第一电离能随之而来：$E(\mathrm{He}) - E(\mathrm{He}^{+}) = -2.8477 + 2 = -0.8477\ \mathrm{E_h} = 23.07\ \mathrm{eV}$，实验值为 $24.58\ \mathrm{eV}$——偏低，因为变分的氦能量偏高，而 $\mathrm{He}^{+}$ 的能量是精确的。
:::
:::

:::widget plot
f: x^2 - 2*Z*x + 5*x/8
x: 0.5, 2.5
y: -3.2, 0.5
sliders: Z=2:1:10:1
labels: \text{E(}\zeta\text{)/E_h}
caption: 氦的变分能量 $E(\zeta) = \zeta^{2} - 2Z\zeta + \tfrac{5}{8}\zeta$ 对有效电荷 $\zeta$ 的曲线（原子单位）。抛物线的最小值位于 $\zeta^{*} = Z - 5/16$，这里 $Z = 2$ 时为 $1.6875$：每个电子为另一个电子屏蔽 $5/16$ 个单位的核电荷。滑动 `Z`，看最小值如何跟踪 $Z - 5/16$，为其他类氢两电子离子（$\mathrm{Li^{+}}$、$\mathrm{Be^{2+}}$）亦然；随 $Z$ 增大，关联误差占总能量的比例随之缩小。
:::

::: quiz
一位学生对试探函数最小化 $\langle H \rangle$，对氦得到 $-2.86\ \mathrm{E_h}$，低于缩放电荷的变分值 $-2.8477\ \mathrm{E_h}$ 但高于精确值 $-2.9037\ \mathrm{E_h}$。这位学生做了什么？
- [x] 什么也没做错：任何试探函数给出的能量都在精确值之上，而*更好*的试探函数给出*更低*的上界——$-2.86\ \mathrm{E_h}$ 只是比缩放电荷结果更紧的界。
- [ ] 算错了，因为 $-2.8477\ \mathrm{E_h}$ 才是真正的基态能量。
- [ ] 违反了变分原理，该原理禁止能量低于此前最好的界。
- [ ] 用了激发态对称性的试探函数，它能跌破基态的界。
::: solution
变分原理用精确的 $E_0$ 从*上方*界定能量，而不是用任何此前的估计值从上方界定：更好的试探函数必须给出更低的能量，一路向 $-2.9037\ \mathrm{E_h}$ 逼近而永不越过它。休勒拉斯（Hylleraas）在 1929 年正是沿着这条进军路线推进到小数点后六位——办法是在试探函数中加入电子间距离 $r_{12}$——并首次证明缺失的 $1.5\ \mathrm{eV}$ 是*电子关联*，是任何轨道乘积都捕捉不到的物理（[[computational-chemistry/electron-correlation]]）。
:::
:::

## 线性变分法与久期方程

单参数猜测无法推广到分子。*线性*变分法固定一组有限的基函数 $\{\phi_i\}$——比如原子轨道——而变分的是
$$
\psi = \sum_{i=1}^{n} c_i \phi_i , \qquad
E = \frac{\sum_{ij} c_i^{*} c_j H_{ij}}{\sum_{ij} c_i^{*} c_j S_{ij}}, \qquad
H_{ij} = \int \phi_i^{*} \hat{H} \phi_j\,\mathrm{d}\tau, \quad S_{ij} = \int \phi_i^{*} \phi_j\,\mathrm{d}\tau
$$
中的*系数*。

::: proposition 久期方程 {#prop-secular}
对系数最小化 $E$ 得到广义本征值问题
$$
\mathbf{H}\mathbf{c} = E \mathbf{S}\mathbf{c} ,
$$
它仅在**久期行列式** $\det\left(\mathbf{H} - E\mathbf{S}\right) = 0$ 处有非平凡解。对正交归一基（$\mathbf{S} = \mathbf{I}$），能量就是哈密顿量矩阵的本征值，而 $n$ 个根与相应对称性的 $n$ 个最低精确能级相互交错：$E_1 \ge \tilde{E}_1 \ge \tilde{E}_2 \ge E_2 \cdots$（交错定理）。
:::

::: proof
用商法则令 $\partial E / \partial c_i^{*} = 0$。分子贡献 $\sum_j H_{ij} c_j$，分母贡献 $E \sum_j S_{ij} c_j$，整理即得对每个 $i$ 的 $\sum_j \left(H_{ij} - E S_{ij}\right) c_j = 0$——一个齐次线性方程组，当且仅当 $\det(\mathbf{H} - E\mathbf{S}) = 0$ 时有非零解 $\mathbf c$。交错性质源于试探空间是整个希尔伯特空间的一个 $n$ 维子空间：把极小极大（柯朗-费希尔）本征值刻画分别用于子空间内外，就迫使每个精确能级被其近似对应物夹住。
:::

对二维基，久期行列式是二次的，它的两个根值得背下来，因为它们就是化学中每一幅"两个组态相互作用"图像背后的数学。

::: example 两个相互作用的能级：避免交叉 {#ex-two-level}
一组正交归一的基态函数具有 $H_{11} = -2.00\ \mathrm{E_h}$、$H_{22} = -1.00\ \mathrm{E_h}$、耦合 $H_{12} = -0.50\ \mathrm{E_h}$。求两个变分能量以及较低者的成分。
::: solution
$\mathbf{S} = \mathbf{I}$ 时两根为
$$
E_{\pm} = \frac{H_{11} + H_{22}}{2} \pm \sqrt{\left(\frac{H_{11} - H_{22}}{2}\right)^{2} + H_{12}^{2}}
= -1.50 \pm \sqrt{0.25 + 0.25} = -1.50 \pm 0.707 ,
$$
故 $E_- = -2.207\ \mathrm{E_h}$、$E_+ = -0.793\ \mathrm{E_h}$。两个能级都在动：较低者比 $H_{11}$ 低 $0.207\ \mathrm{E_h}$，较高者比 $H_{22}$ 高 $0.207\ \mathrm{E_h}$——**能级排斥**，避免交叉之所以"避免"的原因。较低态的系数满足 $(H_{11} - E_-)c_1 + H_{12} c_2 = 0$，得 $c_2/c_1 = 0.50/0.793 = 0.63$：以 $\phi_1$ 为主，混入了 $29\ \%$ 的 $\phi_2$ 概率。当 $H_{11} = H_{22}$（基态简并）时，无论耦合多小，混合都变成 $50/50$——简并是组态相互作用的放大器，杂化以及苯的 $e_{1g}$ 简并对的全部化学都活在这个事实上。
:::
:::

:::widget plot
f: sqrt((x/2)^2 + c^2); -sqrt((x/2)^2 + c^2)
x: -4, 4
y: -3, 3
sliders: c=0.5:0:2:0.1
labels: \text{上根}; \text{下根}
caption: 二能级久期问题的两个根 $E_{\pm} = \pm\sqrt{(\Delta/2)^{2} + H_{12}^{2}}$ 对未微扰间距 $\Delta = H_{11} - H_{22}$ 的曲线，耦合 `c` $= H_{12}$ 由滑块设定（能量以 $\Delta = 0$ 处的 $|H_{12}|$ 为单位）。在 $\Delta = 0$ 处两能级被 $2|H_{12}|$ 分开，两个态都是 $50/50$ 的混合；远离共振时曲线松弛到未微扰的直线上，混合按 $H_{12}/\Delta$ 消失。微扰论正是这一精确结果在远离共振处的极限——这也正是它在 $\Delta = 0$ 附近失效的原因。
:::

## 微扰理论

微扰理论假设哈密顿量可拆为 $\hat{H} = \hat{H}^{0} + \lambda \hat{H}'$，其中 $\hat{H}^{0}$ 可解而 $\hat{H}'$ 很小，并把精确能量与波函数按记账参数 $\lambda$ 的幂展开（最后令 $\lambda = 1$）。

::: proposition 微扰展开 {#prop-perturbation}
设 $\hat{H}^{0}\phi_n^{0} = E_n^{0}\phi_n^{0}$，$\phi_n^{0}$ 非简并且已归一，且 $\langle \phi_0^{0} | \phi_0 \rangle = 1$，则 $\hat{H}^{0} + \lambda\hat{H}'$ 的基态能量为
$$
E_0 = E_0^{0} + \lambda \underbrace{\langle \phi_0^{0} | \hat{H}' | \phi_0^{0} \rangle}_{E^{(1)}}
+ \lambda^{2} \underbrace{\sum_{k \ne 0} \frac{\left| \langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle \right|^{2}}{E_0^{0} - E_k^{0}}}_{E^{(2)}} + \cdots
$$
一级修正是微扰在*未微扰*波函数下的期望值；二级修正是对所有其他态的求和，每一项是耦合的平方除以能量*分母*——而对基态，每个分母都是负的，故恒有 $E^{(2)} \le 0$。
:::

::: proof
把 $E_0 = E^{(0)} + \lambda E^{(1)} + \lambda^{2} E^{(2)} + \cdots$ 与 $\phi_0 = \phi_0^{0} + \lambda \phi^{(1)} + \cdots$ 代入 $(\hat{H}^{0} + \lambda \hat{H}')\phi_0 = E_0 \phi_0$，按 $\lambda$ 的幂收集。$\lambda^{0}$ 阶就是未微扰方程。$\lambda^{1}$ 阶：
$$
\left(\hat{H}^{0} - E^{(0)}\right) \phi^{(1)} = \left(E^{(1)} - \hat{H}'\right) \phi_0^{0} .
$$
用 $\langle \phi_0^{0} |$ 投影：左边为零（厄米性），剩下 $E^{(1)} = \langle \phi_0^{0} | \hat{H}' | \phi_0^{0} \rangle$。改用 $\langle \phi_k^{0} |$ 投影同一方程，得到一级*波函数* $\phi^{(1)} = \sum_{k\ne0} \frac{\langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle}{E_0^{0} - E_k^{0}} \phi_k^{0}$。再把 $\lambda^{2}$ 阶用 $\langle \phi_0^{0} |$ 投影，即得 $E^{(2)} = \langle \phi_0^{0} | \hat{H}' | \phi^{(1)} \rangle$，也就是上面的求和公式。
:::

::: example 四次振子 {#ex-quartic}
给谐振子加上非谐项 $\hat{H}' = \lambda x^{4}$，把基态能量修正到 $\lambda$ 的二阶。
::: solution
在单位 $\hbar = m = \omega = 1$ 下计算，于是 $x = (a + a^{\dagger})/\sqrt{2}$、$E_v^{0} = v + \tfrac{1}{2}$。因为 $x^{4}$ 使 $v$ 改变 $0, \pm 2, \pm 4$，只有 $v = 2$ 与 $v = 4$ 与基态耦合：$\langle 0 | x^{4} | 0 \rangle = \tfrac{3}{4}$、$\langle 2 | x^{4} | 0 \rangle = 3/\sqrt{2}$、$\langle 4 | x^{4} | 0 \rangle = \sqrt{3/2}$。故
$$
E_0 = \tfrac{1}{2} + \tfrac{3}{4}\lambda - \left[\frac{(3/\sqrt{2})^{2}}{2} + \frac{(\sqrt{3/2})^{2}}{4}\right]\lambda^{2} + \cdots
= \tfrac{1}{2} + \tfrac{3}{4}\lambda - \tfrac{21}{8}\lambda^{2} + \cdots
$$
恢复单位：$E_0 = \tfrac{1}{2}\hbar\omega + \tfrac{3}{4}\lambda\left(\frac{\hbar}{m\omega}\right)^{2} - \tfrac{21}{8}\frac{\lambda^{2}}{\hbar\omega}\left(\frac{\hbar}{m\omega}\right)^{3}$。数值检验 $\lambda = 0.01$：级数给出 $0.507237$，而在大基组中直接对角化哈密顿量给出 $0.507256$——二阶项已值 $2.6 \times 10^{-4}$，达一阶移动的六分之一。注意这个你将一生常看的结构：一级能量是平均值，二级*负*、由耦合除以能隙决定。
:::
:::

::: example 氢原子基态的斯塔克效应 {#ex-stark-1s}
处于 $1s$ 态的氢原子位于强度为 $\mathcal{E}$ 的均匀电场中；微扰为 $\hat{H}' = e\mathcal{E} z$。求领头阶能量修正，并在 $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$ 下求值。
::: solution
一级修正按宇称消失：$|\psi_{1s}|^{2}$ 为偶而 $z$ 为奇，故 $\langle 1s | z | 1s \rangle = 0$——没有永久偶极的基态没有线性斯塔克效应。二阶求和 $\sum_{k\ne 1s} \frac{|\langle k | e\mathcal{E} z | 1s \rangle|^{2}}{E_{1s} - E_k}$ 收敛很快；其闭合形式为
$$
E^{(2)} = -\frac{9}{4} a_0^{3} \mathcal{E}_{\mathrm{au}}^{2}\ \mathrm{E_h} = -\tfrac{1}{2}\alpha \mathcal{E}^{2}, \qquad \alpha = \frac{9}{2} a_0^{3} = 7.42 \times 10^{-41}\ \mathrm{C^{2}\,m^{2}\,J^{-1}} \ \ (\alpha / 4\pi\varepsilon_0 = 0.667 \times 10^{-30}\ \mathrm{m^{3}}),
$$
即教科书上氢原子的静态极化率。最大单项来自 $2p$ 态：由 $\langle 2p_0 | z | 1s \rangle = 128\sqrt{2}\,a_0/243 = 0.745\,a_0$、$E_2 - E_1 = \tfrac{3}{8}\ \mathrm{E_h}$，它贡献 $-1.48\,\mathcal{E}_{\mathrm{au}}^{2}$，占总数百分之六十六——一个低激发、强耦合的态占尽风光，恰如[[#prop-perturbation]]的分母所提示。在 $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$（强实验室电场；$1$ 原子单位 $= 5.14 \times 10^{11}\ \mathrm{V\,m^{-1}}$）下移动为 $-2.3 \times 10^{-6}\ \mathrm{eV}$——如所预料地小，因为场强只有 $2 \times 10^{-4}$ 原子单位，而修正是它的二次函数。
:::
:::

::: warning 一级能量、一级波函数与简并陷阱 {#warn-perturbation}
两个错误反复出现。第一，$E^{(1)} = \langle \phi^{0} | \hat{H}' | \phi^{0} \rangle$ 是用*未微扰*波函数算的；波函数本身在一阶就被修正，因此依赖修正后波函数的性质（偶极矩、极化率）是*二阶*性质——所以上面的斯塔克移动是二次的。第二，也更危险：$\phi^{(1)}$ 与 $E^{(2)}$ 中的每个分母都是能量*间隔*，所以简并或近简并的态 $\phi_k^{0}$ 会让展开发散。补救不是给公式打补丁，而是换方法：先在简并子空间内对角化 $\hat{H}'$（简并微扰论），那不过是一个小的久期问题[[#prop-secular]]。近简并是同一陷阱的伪装——上面二能级的图显示，微扰论只在远离共振处才松弛到真相。
:::

## 微扰论何时失效：$n = 2$ 氢的线性斯塔克效应

氢的 $n = 2$ 流形是四重简并的（$2s, 2p_0, 2p_{\pm 1}$），电场以矩阵元 $\langle 2s | e\mathcal{E} z | 2p_0 \rangle = 3 e a_0 \mathcal{E}$ 耦合 $2s$ 与 $2p_0$，而 $m = \pm 1$ 的态不被耦合。对角化 $2 \times 2$ 块 $\begin{pmatrix} 0 & -3ea_0\mathcal{E} \\ -3ea_0\mathcal{E} & 0 \end{pmatrix}$（$2s$–$2p$ 简并使对角元为零）给出移动 $0, 0, \pm 3 e a_0 \mathcal{E}$：对场的*线性*斯塔克效应，一阶就有一切，而朴素的非简并理论只预言一个二次移动。在 $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$ 下，分裂的两支相距 $15.9\ \mathrm{meV}$——是 $1s$ 二次移动的一千倍，因为 $n = 2$ 的各能级简并，而原子在*正确的基*（$2s \pm 2p_0$）中有永久偶极。氢著名的线性斯塔克效应——其谱线在弱场中抹开的原因——就是一页纸的简并微扰论。

## 后续内容

以原子轨道为基的线性变分法是通往化学键的门：把它用于 $\mathrm{H_2^+}$、取两个 $1s$ 函数，你就推导出了成键与反键分子轨道，连同重叠矩阵 $\mathbf{S} \ne \mathbf{I}$，见[[quantum-chemistry/chemical-bond-qm]]。缩放电荷的结果 $\zeta^{*} = Z - 5/16$ 推广为[[quantum-chemistry/many-electron-atoms]]中的经验屏蔽规则。让基组长到上千个函数、让优化变成自洽的，你就站在[[computational-chemistry/hartree-fock]]门口；把轨道漏掉的电子排斥部分当作微扰处理，你就站在[[computational-chemistry/electron-correlation]]门口；保留变分逻辑但改变密度而不是波函数，你就站在[[computational-chemistry/density-functional-theory]]门口。本课的两种方法不是计算课程的序曲——以人的尺度看，它们*就是*计算化学本身。

::: history
两种方法都比量子力学年长。瑞利（Rayleigh）勋爵在 1877 年证明，振动系统的固有频率被插入能量比的试探形状从下方界定；里兹（Ritz）在 1909 年把同一观察变成弹性力学的计算方法——薛定谔（Schrödinger）1926 年把波动力学改写为本征值问题时，明确使用了这套瑞利-里兹变分形式，而最早的氦缩放电荷计算也发表于同年。二阶微扰论"耦合平方除以能隙"的求和结构，源自克拉默斯（Kramers）1924 年的色散理论，其项的结构原封不动地保留下来。对*方法*本身具有决定意义的实验，是休勒拉斯（Hylleraas）1929 年的氦变分处理：他把电子间距离 $r_{12}$ 直接写进试探函数，击败了所有轨道乘积，并把剩余误差定位为电子关联——组态相互作用与耦合簇理论至今仍在追赶的目标。狄拉克（Dirac）1929 年关于多电子体系量子力学的论文，则把变分法与自洽场置于其现代的反对称形式之中。
:::

::: summary
- 只有类氢体系是精确的；其余一切都是近似，而两大主导策略是变分（优化，保证上界）与微扰（对小扰动展开）。
- 变分原理 $\langle H \rangle \ge E_0$ 由把试探函数按精确本征态展开即得；能量误差是波函数误差的二阶量，所以粗糙的函数给出好的能量。
- 氦取 $\psi \propto e^{-\zeta(r_1 + r_2)}$ 得 $\zeta^{*} = Z - 5/16 = 1.6875$、$E = -2.8477\ \mathrm{E_h} = -77.49\ \mathrm{eV}$，精确值为 $-79.01\ \mathrm{eV}$：每个电子屏蔽 $5/16$ 个质子，外加 $1.5\ \mathrm{eV}$ 的关联误差。
- 线性变分法把薛定谔方程化为 $\mathbf{H}\mathbf{c} = E\mathbf{S}\mathbf{c}$；其根与精确能级交错，二能级根 $E_{\pm} = \bar{H} \pm \sqrt{(\Delta/2)^{2} + H_{12}^{2}}$ 解释了能级排斥与简并处的 $50/50$ 混合。
- 微扰论：$E^{(1)} = \langle \phi^{0} | \hat{H}' | \phi^{0} \rangle$；$E^{(2)}$ 是平方耦合除以负能隙的求和，故对基态恒为负。
- 氢 $1s$ 的斯塔克效应是二次的，$E^{(2)} = -\tfrac{9}{4} a_0^{3}\mathcal{E}_{\mathrm{au}}^{2}$，定义了极化率 $\alpha = \tfrac{9}{2} a_0^{3}$；$n = 2$ 的斯塔克效应是*线性*的，因为简并必须先对角化。
- 简并（或近简并）破坏非简并微扰论——能量分母发散——而补救永远是同一招：在简并子空间里做一个小的久期问题。
:::

## 练习

::: exercise 势箱估计 {level=1 check="5"}
对长度为 $L$ 的势箱用试探函数 $\psi = x(L - x)$，把 $\langle H \rangle$ 以 $\hbar^{2} m^{-1} L^{-2}$ 为单位算出。（输入该数字。）
::: solution
$\langle H \rangle = \frac{\frac{1}{2}\hbar^{2}\int_0^L (L-2x)^{2}\,\mathrm{d}x}{\int_0^L x^{2}(L-x)^{2}\,\mathrm{d}x} = \frac{\frac{1}{2}\hbar^{2} \cdot L^{3}/3}{L^{5}/30} = 5\,\hbar^{2}/mL^{2}$，故输入 $5$。这是精确值 $\pi^{2}/2 = 4.935$（同一单位）的 $1.013$ 倍。
:::
:::

::: exercise 高斯最优值 {level=1 check="0.5"}
对谐振子用试探函数 $\psi = e^{-\alpha x^{2}/2}$，变分能量为 $E(\alpha) = \hbar^{2}\alpha/4m + m\omega^{2}/4\alpha$。把最小值以 $\hbar\omega$ 为单位给出。（输入该数字。）
::: solution
$\alpha^{*} = m\omega/\hbar$ 给出 $E_{\min} = \hbar\omega/4 + \hbar\omega/4 = 0.5\,\hbar\omega$——精确的零点能，因为精确基态本来就是高斯函数。
:::
:::

::: exercise 氦的一阶排斥修正 {level=1 check="34.0"}
核电荷 $Z = 2$ 的两个未缩放类氢 $1s$ 电子有 $\langle 1/r_{12} \rangle = 5Z/8$（原子单位）。把这一下一阶修正换算成电子伏。（以 $\mathrm{eV}$ 输入。）
::: solution
$5Z/8 = 1.25\ \mathrm{E_h} \times 27.2114\ \mathrm{eV\,E_h^{-1}} = 34.0\ \mathrm{eV}$。加到 $E^{(0)} = -108.85\ \mathrm{eV}$ 上得 $-74.8\ \mathrm{eV}$，仍比精确值 $-79.0\ \mathrm{eV}$ 高 $4.2\ \mathrm{eV}$——轨道必须先弛豫（屏蔽），能量才有竞争力。
:::
:::

::: exercise 一个粗糙的有效电荷 {level=2 check="-77.5"}
计算氦的变分能量 $E(\zeta) = \zeta^{2} - 4\zeta + \tfrac{5}{8}\zeta\ \mathrm{E_h}$ 在 $\zeta = 1.70$ 处的值。（以 $\mathrm{eV}$ 输入。）
::: solution
$E(1.70) = 2.89 - 6.80 + 1.0625 = -2.8475\ \mathrm{E_h} = -77.48\ \mathrm{eV} \approx -77.5\ \mathrm{eV}$——与 $\zeta^{*} = 1.6875$ 处的最优值相差不到 $0.01\ \mathrm{eV}$，因为抛物线在最小值附近是平的：能量对参数误差是一阶不敏感的，这是变分法宽容的一面。
:::
:::

::: exercise 解一个久期行列式 {level=2 check="-2.21"}
两个正交归一的组态有 $H_{11} = -2.00\ \mathrm{E_h}$、$H_{22} = -1.00\ \mathrm{E_h}$、$H_{12} = -0.50\ \mathrm{E_h}$。给出较低的变分根。（以 $\mathrm{E_h}$ 输入。）
::: solution
$\det\begin{pmatrix} -2 - E & -0.5 \\ -0.5 & -1 - E \end{pmatrix} = 0$：$E_{\pm} = -1.50 \pm \sqrt{0.25 + 0.25} = -1.50 \pm 0.707$，故 $E_- = -2.21\ \mathrm{E_h}$。较低根落在两个对角元之下——混合态的变分能量永远低于最好的未混合组态。
:::
:::

::: exercise 四次项的一阶移动 {level=2 check="0.75"}
对谐振子取 $\hat{H}' = \lambda x^{4}$，把 $E_0^{(1)}$ 以 $\lambda \left(\hbar / m\omega\right)^{2}$ 为单位给出。（输入该数字。）
::: solution
$E_0^{(1)} = \lambda \langle 0 | x^{4} | 0 \rangle = \lambda \cdot \tfrac{3}{4}\left(\hbar/m\omega\right)^{2}$，故输入 $0.75$。（在 $\hbar = m = \omega = 1$ 的单位下，$\langle 0 | x^{4} | 0 \rangle = 3\langle x^{2}\rangle^{2} = 3/4$，可由维格（Wick）定理或对 $(a + a^{\dagger})^{4}$ 直接作用得到。）
:::
:::

::: exercise 推导二阶公式 {level=3}
从 $(\hat{H}^{0} + \lambda \hat{H}')(\phi^{0} + \lambda\phi^{(1)} + \cdots) = (E^{(0)} + \lambda E^{(1)} + \cdots)(\phi^{0} + \lambda\phi^{(1)} + \cdots)$ 出发，推导 $E^{(2)} = \sum_{k\ne0} |\langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle|^{2} / (E_0^{0} - E_k^{0})$，并证明对基态 $E^{(2)} \le 0$。非简并性究竟在哪里被用到了？
::: solution
$\lambda^{1}$ 阶：$(\hat{H}^{0} - E^{(0)})\phi^{(1)} = (E^{(1)} - \hat{H}')\phi^{0}$。用 $\langle\phi_k^{0}|$（$k \ne 0$）投影：$(E_k^{0} - E_0^{0})\langle\phi_k^{0}|\phi^{(1)}\rangle = -\langle\phi_k^{0}|\hat{H}'|\phi_0^{0}\rangle$，于是 $\phi^{(1)}$ 的展开系数为 $\langle\phi_k^{0}|\hat{H}'|\phi_0^{0}\rangle/(E_0^{0} - E_k^{0})$。$\lambda^{2}$ 阶用 $\langle\phi_0^{0}|$ 投影：$E^{(2)} = \langle\phi_0^{0}|\hat{H}'|\phi^{(1)}\rangle$，即所求的求和式。对基态，每个 $k$ 都有 $E_0^{0} - E_k^{0} < 0$，而分子是平方模，故 $E^{(2)} \le 0$。非简并性用在除以 $E_k^{0} - E_0^{0}$ 上：若存在 $E_k^{0} = E_0^{0}$，系数 $\langle\phi_k^{0}|\phi^{(1)}\rangle$ 就不确定，展开崩溃——这正是信号：改为在简并子空间内对角化。
:::
:::

::: exercise 线性斯塔克分裂 {level=3 check="31.7"}
氢的 $n = 2$ 流形中，电场以 $\langle 2s | e\mathcal{E} z | 2p_0 \rangle = 3 e a_0 \mathcal{E}$ 耦合 $2s$ 与 $2p_0$。对角化这个 $2 \times 2$ 块，并计算 $\mathcal{E} = 1.00 \times 10^{8}\ \mathrm{V\,m^{-1}}$ 下两条移动支线的间距。（以 $\mathrm{meV}$ 输入。）
::: solution
块 $\begin{pmatrix} 0 & -3ea_0\mathcal{E} \\ -3ea_0\mathcal{E} & 0 \end{pmatrix}$ 的本征值为 $\pm 3 e a_0 \mathcal{E}$（本征矢 $(2s \pm 2p_0)/\sqrt{2}$，永久偶极 $\mp 3 e a_0$），而 $2p_{\pm1}$ 保持为零。间距 $= 6 e a_0 \mathcal{E} = 6 \times 5.292 \times 10^{-11}\ \mathrm{m} \times 1.00 \times 10^{8}\ \mathrm{V\,m^{-1}} = 3.17 \times 10^{-2}\ \mathrm{eV} = 31.7\ \mathrm{meV}$。对场是线性的——同一场强下是 $1s$ 二次移动的一千倍——因为简并的 $2s$ 与 $2p$ 态在一阶就混合。
:::
:::

::: exercise 一级波函数与零级正交 {level=3}
证明中间归一化 $\langle \phi_0^{0} | \phi_0 \rangle = 1$ 迫使 $\langle \phi_0^{0} | \phi^{(1)} \rangle = 0$，并解释为何*性质*算符 $\hat{A}$ 的一阶修正（当其零级期望值为零时）是 $\langle \phi^{0} | \hat{A} | \phi^{(1)} \rangle + \text{c.c.}$——一个含一级波函数、看起来却是二阶的量。这对"把偶极矩算到场的一阶"意味着什么？
::: solution
把 $\langle \phi_0 | \phi_0 \rangle = 1$ 按 $\langle \phi^{0} + \lambda\phi^{(1)} + \cdots | \phi^{0} + \lambda\phi^{(1)} + \cdots \rangle$ 展开；$\lambda^{0}$ 阶给出 $\langle\phi^{0}|\phi^{0}\rangle = 1$，$\lambda^{1}$ 阶给出 $\langle\phi^{0}|\phi^{(1)}\rangle + \langle\phi^{(1)}|\phi^{0}\rangle = 2\,\mathrm{Re}\,\langle\phi^{0}|\phi^{(1)}\rangle = 0$，而相位约定使它恰好为零。于是 $\langle \hat{A} \rangle = \langle\phi^{0}|\hat{A}|\phi^{0}\rangle + \lambda\left(\langle\phi^{(1)}|\hat{A}|\phi^{0}\rangle + \langle\phi^{0}|\hat{A}|\phi^{(1)}\rangle\right) + \cdots$：若未微扰期望值为零，领头性质就*线性依赖于* $\phi^{(1)}$，即线性依赖于微扰。对场中的偶极子，$\phi^{(1)} \propto \mathcal{E}$，所以感生偶极正比于 $\mathcal{E}$，而能量作为 $\tfrac{1}{2}\alpha\mathcal{E}^{2}$ 是二次的——感生矩与能量之间那个 $\tfrac{1}{2}$，与 $E^{(2)}$ 和 $\phi^{(1)}$ 之间是同一笔账。
:::
:::
