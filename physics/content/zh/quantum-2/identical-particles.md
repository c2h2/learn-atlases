两个台球可以涂成不同的颜色，即使不涂，也可以沿着各自的轨迹一路追踪，所以碰撞之后我们知道哪个是哪个。两个电子则根本无法标记。它们的质量、电荷和自旋完全相同，而量子力学又不给它们可供追踪的轨道：波包重叠之后，任何实验，哪怕在原理上，都无法说出哪一个去了哪里。经典物理把这当作无害的记账问题。在量子力学里，这是一条有着巨大后果的物理原理。原子之所以有壳层、元素周期表之所以有那样的形状，物质之所以不坍缩，白矮星之所以被撑住，金属之所以导电，铁之所以有磁性，氦-4 之所以成为超流体，原因都在这里。

本章陈述这条原理，并为两个粒子详细算出其推论。**交换算符**交换两个粒子；对全同粒子它与哈密顿量对易，而自然只允许在它之下对称或反对称的态。反对称性给出**泡利不相容原理**。它还在粒子之间产生一种表观的力——**交换力**——它不来自哈密顿量中的任何一项。对两个电子，它把自旋态与空间态拴在一起，结果在氦的光谱中清晰可见：氦的单态与三重态能量相差好几个电子伏，而哈密顿量里根本没有自旋。

我们使用 [[quantum-1/spin]] 的自旋、[[quantum-1/angular-momentum]] 中两个自旋 $\frac12$ 合成为单态与三重态，以及 [[quantum-2/stationary-perturbation]] 的一阶简并微扰论。全同粒子多体系统的统计力学在 [[statistical-mechanics/quantum-statistics]] 中展开。

## 交换算符 {#exchange}

考虑两个粒子，每个都有自己的态希尔伯特空间（位置与自旋）。一对粒子的态是一个波函数 $\psi(\xi_1, \xi_2)$，其中 $\xi_k = (\mathbf r_k, m_{s,k})$ 汇总粒子 $k$ 的位置与自旋分量。给两个粒子加标签就是选择变元的次序。若粒子全同，交换标签不可能改变任何预报。

::: definition 交换算符 {#def-exchange}
**交换算符** $\hat P_{12}$ 在两粒子波函数上的作用是交换变元：

$$
(\hat P_{12}\psi)(\xi_1, \xi_2) = \psi(\xi_2, \xi_1).
$$

若 $\hat P_{12}\psi = \psi$ 则态**对称**，若 $\hat P_{12}\psi = -\psi$ 则态**反对称**。
:::

::: proposition 交换算符的性质 {#prop-exchange}
(a) $\hat P_{12}^2 = \mathbb 1$，$\hat P_{12}$ 是厄米且幺正的，其本征值为 $+1$ 与 $-1$。(b) 对任何单粒子可观测量 $\hat A$，$\hat P_{12}\hat A_1\hat P_{12} = \hat A_2$，其中 $\hat A_k$ 作用在粒子 $k$ 上。(c) 若两粒子全同，则哈密顿量对称，$\hat H(\xi_1, \xi_2) = \hat H(\xi_2, \xi_1)$，且 $[\hat P_{12}, \hat H] = 0$。
:::

::: proof
(a) 交换两次恢复原序，故 $\hat P_{12}^2 = \mathbb 1$。它保持内积，因为 $\int\phi^*(\xi_2, \xi_1)\psi(\xi_2, \xi_1)\,\dd\xi_1\,\dd\xi_2$ 与 $\int\phi^*(\xi_1, \xi_2)\psi(\xi_1, \xi_2)\,\dd\xi_1\,\dd\xi_2$ 只是改了哑变量的同一个积分。所以 $\hat P_{12}$ 幺正，$\hat P_{12}^\dagger = \hat P_{12}^{-1} = \hat P_{12}$，从而也是厄米的。若 $\hat P_{12}\psi = p\psi$，则 $\psi = \hat P_{12}^2\psi = p^2\psi$，故 $p = \pm1$。

(b) 把两边都作用在乘积 $\phi(\xi_1)\chi(\xi_2)$ 上：$\hat P_{12}\hat A_1\hat P_{12}$ 先给出 $\phi(\xi_2)\chi(\xi_1)$，再给出 $(\hat A\phi)(\xi_2)\chi(\xi_1)$，最后给出 $\phi(\xi_1)(\hat A\chi)(\xi_2)$，这正是 $\hat A_2$ 作用在乘积上。乘积张成两粒子空间，所以两个算符相同。

(c) 全同粒子的哈密顿量在两个动能项中质量相同、两粒子感受到的外势相同、相互作用满足 $V(\xi_1, \xi_2) = V(\xi_2, \xi_1)$；由 (b)，用 $\hat P_{12}$ 作共轭把它映到自身。于是 $\hat P_{12}\hat H\hat P_{12} = \hat H$，右乘 $\hat P_{12}$ 得 $\hat P_{12}\hat H = \hat H\hat P_{12}$。
:::

由 (c)，能量本征态可以选成对称或反对称的；又因为 $\hat P_{12}$ 与 $\hat H$ 对易，时间演化保持对称性不变（[[#exr-conserved]]）。这是关于*可以*怎样选的说法。自然走得更远。

::: axiom 对称化公设 {#ax-symmetrisation}
全同粒子系统的态，随粒子种类的不同，对其任意两个的交换或者永远对称，或者永远反对称。态对称的粒子称为**玻色子**；态反对称的粒子称为**费米子**。对多于两个粒子，态在每一对交换下都对称（玻色子）或都反对称（费米子）。
:::

哪些粒子属于哪一类？**自旋–统计定理**回答：自旋为整数（$0, 1, 2, \dots$）的粒子是玻色子，自旋为半整数（$\frac12, \frac32, \dots$）的是费米子。电子、质子、中子与夸克是费米子；光子、胶子、希格斯玻色子与 π 介子是玻色子。该定理是量子场论中相对论与因果性的推论（泡利（Pauli），1940；参见温伯格（Weinberg）《量子场论》（*The Quantum Theory of Fields*）第 1 卷第 5 章）。在非相对论量子力学里，它只能作为一条额外的公设。

复合粒子按其总自旋从规则，而总自旋由它所含费米子的数目决定。$^4\mathrm{He}$ 原子有两个质子、两个中子和两个电子，共六个费米子，所以是玻色子。$^3\mathrm{He}$ 原子有五个费米子，是费米子。两种同位素在低温下行为完全不同：$^4\mathrm{He}$ 在 $2.17\,\mathrm K$ 变为超流体，$^3\mathrm{He}$ 要到约 $3\,\mathrm{mK}$ 以下才会（机制也不同：原子配对，如同超导体中的电子配对）。

::: remark 为什么只能是正负一？
也许会想，交换凭什么不能给态乘上任意相位 $e^{i\theta}$。在三维中，交换两次等价于什么都不做（一个粒子绕另一个一圈的路径可以收缩成一点），所以 $e^{2i\theta} = 1$，$\theta = 0$ 或 $\pi$。在二维中这个论证失效，于是存在带其他相位的准粒子**任意子**（anyons），出现在分数量子霍尔系统中。在三维中只有玻色子与费米子。
:::

## 构造对称态与反对称态 {#building}

设粒子间无相互作用，$\hat H = \hat h_1 + \hat h_2$，两个粒子共享同一个单粒子哈密顿量 $\hat h$。若 $\phi_a$ 与 $\phi_b$ 是 $\hat h$ 的本征态，能量为 $\varepsilon_a$、$\varepsilon_b$，则 $\phi_a(\xi_1)\phi_b(\xi_2)$ 与 $\phi_b(\xi_1)\phi_a(\xi_2)$ 都是 $\hat H$ 的属于能量 $\varepsilon_a + \varepsilon_b$ 的本征态。这就是**交换简并**。对称化公设只允许它们的一个组合：

$$
\psi_\pm(\xi_1, \xi_2) = \frac{1}{\sqrt2}\bigl[\phi_a(\xi_1)\phi_b(\xi_2) \pm \phi_b(\xi_1)\phi_a(\xi_2)\bigr], \qquad a \ne b,
$$ {#eq-two-state}

玻色子取 $+$，费米子取 $-$。当 $\phi_a \perp \phi_b$ 时因子 $1/\sqrt2$ 使其归一化。若 $a = b$，玻色子的态就是 $\phi_a(\xi_1)\phi_a(\xi_2)$，而费米子的组合恒等于零。

::: theorem 泡利不相容原理 {#thm-pauli}
两个全同费米子不能占据同一个单粒子态。更一般地，若 $\psi$ 反对称，则 $\psi(\xi, \xi) = 0$：两个全同费米子在同一位置具有同一自旋分量被测得的概率振幅为零。
:::

::: proof
[[#eq-two-state]] 中取 $a = b$ 的反对称组合是 $\frac{1}{\sqrt2}[\phi_a(\xi_1)\phi_a(\xi_2) - \phi_a(\xi_1)\phi_a(\xi_2)] = 0$，那不是态。至于一般陈述，反对称性对每个 $\xi$ 给出 $\psi(\xi, \xi) = -\psi(\xi, \xi)$，故 $\psi(\xi, \xi) = 0$。
:::

对 $N$ 个粒子，$N$ 个不同单粒子态的反对称组合是一个行列式，因为行列式在交换两行时变号。

::: definition 斯莱特行列式 {#def-slater}
对标准正交单粒子态 $\phi_1, \dots, \phi_N$，**斯莱特（Slater）行列式**是 $N$ 费米子态

$$
\Psi(\xi_1, \dots, \xi_N) = \frac{1}{\sqrt{N!}}\begin{vmatrix}\phi_1(\xi_1) & \phi_2(\xi_1) & \cdots & \phi_N(\xi_1)\\ \phi_1(\xi_2) & \phi_2(\xi_2) & \cdots & \phi_N(\xi_2)\\ \vdots & \vdots & & \vdots\\ \phi_1(\xi_N) & \phi_2(\xi_N) & \cdots & \phi_N(\xi_N)\end{vmatrix}.
$$

它在每一对交换下反对称，已归一化，且当诸 $\phi_k$ 中任何两个相同时为零。
:::

玻色子的对应物是**积和式**（permanent），即不带交错符号的同一求和，且在态重复时归一化方式不同。对无相互作用粒子，一个态于是由**占据数**完全指定：每个单粒子态上占据着多少个粒子。费米子的每个占据数是 $0$ 或 $1$；玻色子则可为任何非负整数。哪个粒子在哪个态里，是没有意义的问题。

::: example 盒中的两个粒子 {#ex-box}
质量 $m$ 的两个无相互作用粒子处于宽度 $L$ 的无限深方势阱，单粒子能量 $\varepsilon_n = n^2\varepsilon_1$，$\varepsilon_1 = \pi^2\hbar^2/2mL^2$。忽略自旋。若粒子 (a) 可区分、(b) 全同玻色子、(c) 全同费米子，求基态与第一激发态及其能量和简并度。
::: solution
(a) 可区分：任何乘积 $\phi_n(x_1)\phi_{n'}(x_2)$ 都允许。基态是 $\phi_1\phi_1$，能量 $2\varepsilon_1$，非简并。第一激发能级能量 $\varepsilon_1 + 4\varepsilon_1 = 5\varepsilon_1$，二重简并：$\phi_1(x_1)\phi_2(x_2)$ 与 $\phi_2(x_1)\phi_1(x_2)$。

(b) 玻色子：基态是 $\phi_1(x_1)\phi_1(x_2)$，能量 $2\varepsilon_1$。第一激发能级 $5\varepsilon_1$ 非简并：只允许 [[#eq-two-state]] 中 $a = 1$、$b = 2$ 的对称组合 $\psi_+$。

(c) 费米子：$\phi_1\phi_1$ 被 [[#thm-pauli]] 禁止。基态是 $\psi_-$，$a = 1$、$b = 2$，能量 $5\varepsilon_1$，非简并。第一激发能级是 $\psi_-$，$a = 1$、$b = 3$，能量 $10\varepsilon_1$。

真实的电子有自旋，使单粒子态数目加倍；这样只要自旋态反对称，两个电子便都可以处于 $\phi_1$。那正是 [[#spin-exchange]] 的主题。
:::
:::

::: quiz
三个全同自旋-0 玻色子置于只有两个单粒子态的系统中。三粒子态有多少个？
- [ ] $8$ 个，与可区分粒子一样
- [x] $4$ 个
- [ ] $3$ 个
- [ ] $0$ 个，因为三个粒子无法共享两个态
::: solution
对玻色子，一个态由占据数 $(n_1, n_2)$ 决定，$n_1 + n_2 = 3$：$(3,0), (2,1), (1,2), (0,3)$，共四个态。可区分粒子有 $2^3 = 8$ 个态。若是费米子，答案将是 $0$，因为每个态至多容纳一个。
:::
:::

## 交换力 {#exchange-force}

即使粒子之间没有任何相互作用，全同粒子也不独立运动。对称性把它们的位置关联起来：玻色子倾向于待在一起，费米子则相互远离。最干净的度量是均方间距。

::: theorem 对称化态中的间距 {#thm-separation}
对一维粒子，取由实的标准正交 $\phi_a, \phi_b$ 构造的 [[#eq-two-state]] 之态 $\psi_\pm$（忽略自旋），以及可区分的乘积态 $\psi_d = \phi_a(x_1)\phi_b(x_2)$，则

$$
\left\langle(x_1 - x_2)^2\right\rangle_\pm = \left\langle(x_1 - x_2)^2\right\rangle_d \mp 2\lvert\langle x\rangle_{ab}\rvert^2, \qquad \langle x\rangle_{ab} = \int\phi_a(x)\,x\,\phi_b(x)\,\dd x.
$$ {#eq-separation}

玻色子（$+$）的平均间距比可区分粒子更小，费米子（$-$）更大。
:::

::: proof
展开 $(x_1 - x_2)^2 = x_1^2 + x_2^2 - 2x_1x_2$。对可区分态，

$$
\langle x_1^2\rangle_d = \langle x^2\rangle_a, \qquad \langle x_2^2\rangle_d = \langle x^2\rangle_b, \qquad \langle x_1x_2\rangle_d = \langle x\rangle_a\langle x\rangle_b.
$$

在 $\psi_\pm$ 中概率密度为 $\frac12[\phi_a(x_1)^2\phi_b(x_2)^2 + \phi_b(x_1)^2\phi_a(x_2)^2 \pm 2\phi_a(x_1)\phi_b(x_1)\phi_a(x_2)\phi_b(x_2)]$。对 $x_1^2$，前两项给出 $\frac12(\langle x^2\rangle_a + \langle x^2\rangle_b)$，交叉项给出 $\pm\langle x^2\rangle_{ab}\langle1\rangle_{ab} = 0$（正交性）。于是 $\langle x_1^2\rangle_\pm + \langle x_2^2\rangle_\pm = \langle x^2\rangle_a + \langle x^2\rangle_b$，与可区分粒子相同。对 $x_1x_2$，前两项给出 $\langle x\rangle_a\langle x\rangle_b$，交叉项给出 $\pm\langle x\rangle_{ab}^2$。代入得 $\langle(x_1 - x_2)^2\rangle_\pm = \langle(x_1 - x_2)^2\rangle_d \mp 2\langle x\rangle_{ab}^2$。对复的 $\phi$，同样的计算给出 $\lvert\langle x\rangle_{ab}\rvert^2$。
:::

这一修正取决于 $\phi_a$ 与 $\phi_b$ 的**重叠**：若两个波函数不重叠，$\phi_a(x)\phi_b(x)$ 处处为零，则 $\langle x\rangle_{ab} = 0$，对称化不起任何作用。这就是为什么此处电子与月球上的电子之间的反对称化可以忽略。哈密顿量里没有力；这一效应是运动学的。不过它的表现就像玻色子间的吸引与费米子间的排斥，称为**交换力**。

::: example 盒中的交换力 {#ex-exchange-box}
宽度 $L$ 的无限深阱中两个粒子处于 $\phi_1$ 与 $\phi_2$，求可区分粒子、玻色子与费米子的均方根间距。
::: solution
每个态都关于 $L/2$ 对称，故 $\langle x\rangle_1 = \langle x\rangle_2 = L/2$，标准积分给出 $\langle x^2\rangle_n = L^2\bigl(\frac13 - \frac{1}{2n^2\pi^2}\bigr)$。对可区分粒子

$$
\langle(x_1 - x_2)^2\rangle_d = \langle x^2\rangle_1 + \langle x^2\rangle_2 - 2\left(\frac L2\right)^2 = L^2\left(\frac23 - \frac{1}{2\pi^2} - \frac{1}{8\pi^2} - \frac12\right) = L^2\left(\frac16 - \frac{5}{8\pi^2}\right) = 0.1033\,L^2.
$$

重叠积分，利用 $\sin u\sin2u = \frac12(\cos u - \cos3u)$ 并分部积分，得

$$
\langle x\rangle_{12} = \frac2L\int_0^Lx\sin\frac{\pi x}{L}\sin\frac{2\pi x}{L}\,\dd x = -\frac{16L}{9\pi^2} = -0.1801\,L.
$$

于是 $2\langle x\rangle_{12}^2 = 512L^2/81\pi^4 = 0.0649\,L^2$，由 [[#eq-separation]] 得

$$
\langle(x_1 - x_2)^2\rangle_+ = 0.0384\,L^2, \qquad \langle(x_1 - x_2)^2\rangle_- = 0.1682\,L^2.
$$

均方根间距：玻色子 $0.196L$，可区分粒子 $0.321L$，费米子 $0.410L$。因为 $\phi_1$ 与 $\phi_2$ 在整个阱内都重叠，效应很大。
:::
:::

::: widget plot
f: 2*(sin(pi*x)*sin(2*pi*y) + sin(2*pi*x)*sin(pi*y))^2; 2*(sin(pi*x)*sin(2*pi*y) - sin(2*pi*x)*sin(pi*y))^2; 2*(sin(pi*x)^2*sin(2*pi*y)^2 + sin(2*pi*x)^2*sin(pi*y)^2)
x: 0, 1
sliders: y=0.3:0:1:0.01
labels: 玻色子; 费米子; 可区分（对标记取平均）
caption: 宽度 $1$ 的阱中处于 $\phi_1$ 与 $\phi_2$ 的两个粒子的联合概率密度，横轴为一个粒子的位置 $x$，另一粒子固定在 $x_2 = y$（滑块）。无论把滑块放在哪里，费米子曲线总在 $x = y$ 处为零：这就是 [[#thm-pauli]]，每个费米子周围有一个"洞"。玻色子曲线在 $x = y$ 附近被增强。可区分粒子的曲线是另外两条的平均，所以对称化只是把概率向对角线移近或移开。
:::

## 自旋与交换相互作用 {#spin-exchange}

电子有自旋 $\frac12$，完整的双电子态包括自旋。若哈密顿量不含自旋——原子就属于这种情况——其本征态可以选成空间部分与自旋部分的乘积 $\psi(\mathbf r_1, \mathbf r_2)\chi(1, 2)$。整体必须反对称。由 [[quantum-1/angular-momentum]]，两个自旋-$\frac12$ 的四个自旋态合成一个总自旋 $S = 1$ 的对称**三重态**

$$
\chi_{1,1} = \uparrow\uparrow, \qquad \chi_{1,0} = \frac{1}{\sqrt2}(\uparrow\downarrow + \downarrow\uparrow), \qquad \chi_{1,-1} = \downarrow\downarrow,
$$

和一个 $S = 0$ 的反对称**单态** $\chi_{0,0} = \frac{1}{\sqrt2}(\uparrow\downarrow - \downarrow\uparrow)$。于是：

- **对称**的空间态必须与**单态**配对；
- **反对称**的空间态必须与**三重态**配对。

这样就是自旋态决定空间对称性，而空间对称性经 [[#thm-separation]] 决定电子相距多近。处于三重态的电子彼此避开；处于单态的电子则可以靠近。由于电子相斥，三重态的排斥能更小。这就是自旋无关的哈密顿量中自旋态之间出现能量差的根源。

### 氦的激发态

氦的最低激发组态是一个电子在 $1s$、一个在 $2s$。忽略排斥 $e^2/4\pi\varepsilon_0r_{12}$，$Z = 2$ 时能量为 $-Z^2(1 + \frac14)\times13.6\,\mathrm{eV} = -68.0\,\mathrm{eV}$，能级四重简并：对称空间态与单态配对，反对称空间态与三个三重态各配对。把排斥当微扰处理，用 [[quantum-2/stationary-perturbation#thm-degenerate]]。

::: theorem 库仑积分与交换积分 {#thm-exchange}
两个电子占据正交归一的空间轨道 $\phi_a$ 与 $\phi_b$，$\hat V = e^2/4\pi\varepsilon_0\lvert\mathbf r_1 - \mathbf r_2\rvert$。在空间态 $\psi_\pm = \frac1{\sqrt2}[\phi_a(\mathbf r_1)\phi_b(\mathbf r_2) \pm \phi_b(\mathbf r_1)\phi_a(\mathbf r_2)]$（分别与单态 $(+)$ 和三重态 $(-)$ 配对）中，一阶能量移动为

$$
E^{1}_\pm = J \pm K,
$$

其中**库仑积分** $J$ 与**交换积分** $K$ 为

$$
J = \int\!\!\int\lvert\phi_a(\mathbf r_1)\rvert^2\,\frac{e^2}{4\pi\varepsilon_0r_{12}}\,\lvert\phi_b(\mathbf r_2)\rvert^2\,\dd^3r_1\,\dd^3r_2, \qquad K = \int\!\!\int\phi_a^*(\mathbf r_1)\phi_b^*(\mathbf r_2)\,\frac{e^2}{4\pi\varepsilon_0r_{12}}\,\phi_b(\mathbf r_1)\phi_a(\mathbf r_2)\,\dd^3r_1\,\dd^3r_2.
$$ {#eq-JK}

二者皆正。三重态比单态低 $2K$。
:::

::: proof
微扰不作用于自旋，所以它在不同自旋态之间的矩阵元为零，而每个自旋对称类内的空间态是确定的。于是四个态都是好态，移动就是对角元。展开：

$$
\langle\psi_\pm\vert\hat V\vert\psi_\pm\rangle = \frac12\bigl[\langle ab\vert\hat V\vert ab\rangle + \langle ba\vert\hat V\vert ba\rangle \pm \langle ab\vert\hat V\vert ba\rangle \pm \langle ba\vert\hat V\vert ab\rangle\bigr],
$$

其中 $\lvert ab\rangle$ 表示 $\phi_a(\mathbf r_1)\phi_b(\mathbf r_2)$。因为 $\hat V$ 对称，重命名积分变量可见前两项都是 $J$，后两项是 $K$ 与 $K^*$。$K$ 是实的，因为 $\hat V$ 是实函数而交换变量把 $K$ 映为 $K^*$，所以移动为 $J\pm K$。$J$ 是两份正电荷分布的静电能，故 $J > 0$。$K$ 是复的"重叠电荷" $\rho(\mathbf r) = \phi_a^*(\mathbf r)\phi_b(\mathbf r)$ 的自能，即 $\int\!\!\int\rho^*(\mathbf r_1)\rho(\mathbf r_2)/r_{12}$；在傅里叶空间中写成 $\int\lvert\tilde\rho(\mathbf k)\rvert^2/k^2\,\dd^3k$ 的正倍数，可见只要 $\rho \ne 0$ 就有 $K > 0$。
:::

对氦的 $1s2s$ 组态取电荷 $Z$ 的类氢轨道，这些积分可闭式算出（Bransden & Joachain 第 7 章）：$J = \frac{17}{81}ZE_{\mathrm h}$，$K = \frac{16}{729}ZE_{\mathrm h}$，其中 $E_{\mathrm h} = 27.211\,\mathrm{eV}$。

::: example 氦 1s2s 的单态与三重态 {#ex-helium-1s2s}
估算氦 $1s2s$ 单态与三重态的能量，并与实验比较：基态在 $-79.005\,\mathrm{eV}$，三重态 $2^3S$ 在其上 $19.820\,\mathrm{eV}$，单态 $2^1S$ 在其上 $20.616\,\mathrm{eV}$。
::: solution
取 $Z = 2$，

$$
J = \frac{34}{81}\times27.211\,\mathrm{eV} = 11.42\,\mathrm{eV}, \qquad K = \frac{32}{729}\times27.211\,\mathrm{eV} = 1.194\,\mathrm{eV}.
$$

未微扰能量为 $-2.5E_{\mathrm h} = -68.03\,\mathrm{eV}$，于是

$$
E_{\mathrm{singlet}} = -68.03 + 11.42 + 1.19 = -55.41\,\mathrm{eV}, \qquad E_{\mathrm{triplet}} = -68.03 + 11.42 - 1.19 = -57.80\,\mathrm{eV}.
$$

实验给出 $-79.005 + 20.616 = -58.39\,\mathrm{eV}$ 与 $-79.005 + 19.820 = -59.19\,\mathrm{eV}$。一阶把次序（三重态低于单态）搞对了，能量也大约在 $3\,\mathrm{eV}$ 以内，但预言的分裂为 $2K = 2.39\,\mathrm{eV}$，实测只有 $0.80\,\mathrm{eV}$。误差与基态情形同源：轨道没有因屏蔽而调整。内层 $1s$ 电子几乎把核对外层 $2s$ 电子完全屏蔽，于是 $2s$ 电子运动在更大的轨道上，与 $1s$ 的重叠更小，从而 $K$ 变小。
:::
:::

氦的光谱分成两套几乎不相干的系统：单态的**仲氦**（parhelium）与三重态的**正氦**（orthohelium）。电偶极辐射不作用于自旋，不把两套连起来，于是 1900 年前后有一段时间把它们归之于两种不同的气体。最低的三重态 $2^3S$ 根本无法经偶极跃迁衰变到 $1^1S$ 基态，寿命长达约 $7900\,\mathrm s$。

::: warning 交换能不是磁相互作用
氦中 $0.8\,\mathrm{eV}$ 的单态–三重态分裂与电子的磁矩毫无关系：磁矩在原子距离上的偶极–偶极能量量级为 $\mu_0\mu_B^2/4\pi a_0^3 \approx 4\times10^{-4}\,\mathrm{eV}$，要小几千倍。它是静电能，只是被反对称性变得依赖自旋。常见的错误是用"自旋喜欢排平行"来解释原子或磁体中的平行自旋：它们并不喜欢；是库仑排斥偏爱反对称的空间态，而反对称的空间态恰好配上对称的自旋。
:::

交换对自旋的作用可以写成自旋之间的有效相互作用。对两个自旋 $\frac12$，$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12(\hat S^2 - \hat S_1^2 - \hat S_2^2)$ 在三重态中取值 $\frac14\hbar^2$，在单态中取值 $-\frac34\hbar^2$。于是两个能量 $J\mp K$（三重态、单态）可重现为

$$
\hat H_{\mathrm{eff}} = J - \frac K2 - \frac{2K}{\hbar^2}\,\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2,
$$ {#eq-heisenberg}

把两个本征值代入即可验证。自旋似乎被耦合起来了，尽管哈密顿量里根本没有自旋。

::: application 铁磁性与共价键
海森堡（Heisenberg，1928）提出，相邻原子电子之间形如 [[#eq-heisenberg]] 的相互作用对整个晶体求和，$\hat H = -\sum_{\langle ij\rangle}J_{ij}\hat{\mathbf S}_i\cdot\hat{\mathbf S}_j$，可以解释铁磁性：当有效耦合使平行自旋有利时，铁、钴、镍的自旋在居里（Curie）温度（铁为 $1043\,\mathrm K$）以下自发排齐。磁偶极相互作用远太弱，做不到这一点。在氢分子中符号反过来：成键态是空间对称的自旋单态，电子密度堆积在两个质子之间，而三重态是排斥的。共价键是一种交换效应，化学图谱[化学结合](/learn/chemistry/lesson.php?c=quantum-chemistry&l=chemical-bond-qm)一课从化学家的角度作了说明。
:::

::: quiz
两个电子处于同一空间轨道 $\phi$（例如氦基态的两个 $1s$ 电子）。它们的自旋态是什么？
- [ ] 四个自旋态中的任意一个
- [ ] 三重态之一
- [x] 单态
- [ ] 态 $\uparrow\downarrow$
::: solution
空间态 $\phi(\mathbf r_1)\phi(\mathbf r_2)$ 对称，所以自旋态必须反对称：单态 $\frac{1}{\sqrt2}(\uparrow\downarrow - \downarrow\uparrow)$。直积 $\uparrow\downarrow$ 并不反对称；它是半个单态加半个 $m = 0$ 三重态。所以氦的基态总自旋为零，不存在三重态 $1s^2$。
:::
:::

## 多费米子体系 {#many}

势场中 $N$ 个无相互作用费米子的基态，把最低的 $N$ 个单粒子态各填入一个粒子（自旋态分开计数）：一个斯莱特行列式。最高已填能级的能量称为**费米能**。往系统里添一个费米子，不论相互作用多弱，至少要花掉费米能；正是这笔"花费"使费米子气即使在零温也抵抗压缩。

::: example 长分子中的电子 {#ex-polyene}
把共轭链分子的 $\pi$ 电子模型化为长度 $L$ 的一维阱中 $N$ 个无相互作用电子。求 $N = 6$ 的基态总能量与最低激发能，并对 $L = 0.70\,\mathrm{nm}$（约为己三烯）估算吸收波长。
::: solution
每个能级 $\varepsilon_n = n^2\varepsilon_1$ 可容纳自旋向上、向下各一个共两个电子。六个电子填满 $n = 1, 2, 3$，总能量为 $2(1 + 4 + 9)\varepsilon_1 = 28\varepsilon_1$。最低激发把一个电子从 $n = 3$ 提升到 $n = 4$，花费 $(16 - 9)\varepsilon_1 = 7\varepsilon_1$。由

$$
\varepsilon_1 = \frac{\pi^2\hbar^2}{2mL^2} = \frac{h^2}{8mL^2} = \frac{(6.626\times10^{-34})^2}{8(9.109\times10^{-31})(0.70\times10^{-9})^2}\,\mathrm J = 1.229\times10^{-19}\,\mathrm J = 0.767\,\mathrm{eV},
$$

激发能为 $7\varepsilon_1 = 5.37\,\mathrm{eV}$，$\lambda = hc/\Delta E = 1240\,\mathrm{eV\,nm}/5.37\,\mathrm{eV} = 231\,\mathrm{nm}$。己三烯在 $258\,\mathrm{nm}$ 附近有吸收，对如此粗糙的模型已经不错。若没有泡利原理，六个电子都待在 $n = 1$，最低激发只有 $3\varepsilon_1$，波长会长出一倍多。
:::
:::

::: application 白矮星与中子星
白矮星是一颗约一个太阳质量被压缩到地球大小、核燃料已耗尽的星。把它撑住的是其电子的压强，电子一直填到数百 keV 的费米能。福勒（Fowler）在费米–狄拉克统计建立后几个月内，于 1926 年对此作了解释。钱德拉塞卡（Chandrasekhar）1931 年证明，当电子成为相对论性的，压强便再也撑不住超过约 $1.4$ 个太阳质量。中子星以同样的方式由中子撑住。定量理论见 [[statistical-mechanics/bose-fermi]] 与 [[gravitation/stars]]。
:::

玻色子的情况相反：任意数目的粒子可共享一个态，而温度足够低时，玻色子气有宏观比例的粒子占据最低的单粒子态。这就是**玻色–爱因斯坦凝聚**，由爱因斯坦 1925 年预言，1995 年在稀薄原子气体中实现。激光是与光子相关的类似效应：向某个模式的受激辐射速率正比于其中已有的光子数——这就是 [[quantum-2/time-dependent]] 的 $B$ 系数所描述的**玻色增强**。

::: history 玻色、费米、狄拉克与泡利
沃尔夫冈·泡利（Wolfgang Pauli）1925 年 1 月陈述不相容原理，以解释原子的壳层结构与反常塞曼效应，给每个电子指定四个量子数，其中一个是"二值性"，乌伦贝克（Uhlenbeck）与古兹米特（Goudsmit）在当年晚些时候把它认作自旋。萨蒂延德拉·纳特·玻色（Satyendra Nath Bose）1924 年用一种新的光子态计数法导出了普朗克公式；爱因斯坦在 1924–25 年把这一计数推广到原子。恩里科·费米（Enrico Fermi）在 1926 年初求出了服从泡利原理的粒子的统计，同年晚些时候保罗·狄拉克（Paul Dirac）独立地把两种统计与对称和反对称波函数联系起来。维尔纳·海森堡（Werner Heisenberg）1926 年用交换对称性解释了仲氦与正氦两套分立的光谱，1928 年提出了铁磁性的交换机制。约翰·斯莱特（John Slater）1929 年引入了行列式形式，泡利于 1940 年在相对论场论中证明了自旋–统计定理。
:::

## 后续内容 {#leads}

[[quantum-2/atomic-structure]] 用泡利原理与交换能构造多电子原子：壳层结构、洪特（Hund）定则（未满壳层中的电子使总自旋取极大）、谱项符号与元素周期表。[[statistical-mechanics/quantum-statistics]] 把这里的计数规则变成费米–狄拉克分布与玻色–爱因斯坦分布。[[condensed-matter/free-electrons]] 在金属中填满一个费米海，[[condensed-matter/magnetism-superconductivity]] 发展磁体的交换模型。在 [[quantum-2/entanglement]] 中我们将再次遇到单态，作为纠缠态的标准例子。

::: summary
- 全同粒子无法标记。交换算符 $\hat P_{12}$ 与它们的哈密顿量对易，本征值为 $\pm1$。
- 对称化公设：玻色子（整数自旋）的态对称，费米子（半整数自旋）反对称。自旋–统计联系来自相对论场论。
- 处于不同态 $a$、$b$ 的两个粒子：$\psi_\pm = [\phi_a\phi_b \pm \phi_b\phi_a]/\sqrt2$。$N$ 个费米子：一个斯莱特行列式。泡利：没有两个全同费米子处于同一态。
- 即使没有力，对称化也关联位置：$\langle(x_1 - x_2)^2\rangle_\pm = \langle(x_1 - x_2)^2\rangle_d \mp 2\lvert\langle x\rangle_{ab}\rvert^2$。效应要求波函数重叠。
- 两个电子：对称空间态配自旋单态，反对称空间态配三重态。库仑排斥于是给出 $E = J\pm K$：三重态低 $2K$。
- 氦 $1s2s$：一阶给出分裂 $2.39\,\mathrm{eV}$，实验为 $0.80\,\mathrm{eV}$。交换能是静电的而非磁的，可写成 $-(2K/\hbar^2)\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$。
- 费米子填能级直到费米能，由此产生简并压；玻色子可以凝聚到单个态。
:::

## 习题 {#exercises}

::: exercise 两粒子态的计数 {level=1 check="15"}
一个粒子有五个可用态。一对全同玻色子有多少个态？全同费米子呢？可区分粒子呢？
::: solution
玻色子：或者两粒子在同一态（$5$ 种方式），或者在两个不同态，每个无序对一个对称组合（$\binom52 = 10$），共 $15$ 个。费米子：只有 $10$ 个反对称组合。可区分粒子：$5^2 = 25$。注意 $15 + 10 = 25$：两粒子空间分解为对称部分与反对称部分，维数分别为 $n(n+1)/2$ 与 $n(n-1)/2$。
:::
:::

::: exercise 盒中的三个电子 {level=1 check="6"}
三个无相互作用电子（自旋 $\frac12$）处于一维无限深阱。以 $\varepsilon_1 = \pi^2\hbar^2/2mL^2$ 为单位求基态能量。
::: solution
每个空间能级容纳自旋相反的两个电子。两个进 $n = 1$，一个进 $n = 2$，于是以 $\varepsilon_1$ 计 $E = 1 + 1 + 4 = 6$。基态二重简并：第三个电子自旋可上可下。
:::
:::

::: exercise 单态的 S1·S2 值 {level=1 check="-3/4"}
求两个自旋-$\frac12$ 粒子处于单态时 $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ 的本征值（以 $\hbar^2$ 为单位）。
::: solution
$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12(\hat S^2 - \hat S_1^2 - \hat S_2^2)$。单态中 $S = 0$，$\hat S_k^2 = \frac34\hbar^2$，所以值为 $\frac12(0 - \frac34 - \frac34)\hbar^2 = -\frac34\hbar^2$。三重态中为 $\frac12(2 - \frac32)\hbar^2 = \frac14\hbar^2$。
:::
:::

::: exercise 谐振子中的费米子 {level=2 check="13/2"}
五个无相互作用自旋-$\frac12$ 费米子处于角频率 $\omega$ 的一维谐振子中。以 $\hbar\omega$ 为单位求基态能量。若是五个无自旋玻色子呢？
::: solution
能级为 $(n + \frac12)\hbar\omega$，每级两个费米子。填法：$n = 0$（两个）、$n = 1$（两个）、$n = 2$（一个）：$E = 2(\frac12) + 2(\frac32) + \frac52 = 1 + 3 + 2.5 = 6.5$，即 $\frac{13}{2}\hbar\omega$。五个玻色子全占 $n = 0$：$\frac52\hbar\omega$。
:::
:::

::: exercise 两个费米子的间距 {level=2 check="1/6 - 5/(8*pi^2) + 512/(81*pi^4)"}
利用 [[#ex-exchange-box]]，给出无限深阱中处于 $\phi_1$ 与 $\phi_2$ 的两个无自旋费米子的 $\langle(x_1 - x_2)^2\rangle/L^2$ 的精确表达式，并导出其中所用的 $\langle x\rangle_{12}$ 的值。
::: solution
取 $u = \pi x/L$，$\langle x\rangle_{12} = \frac{2L}{\pi^2}\int_0^\pi u\sin u\sin2u\,\dd u$，而 $\sin u\sin2u = \frac12(\cos u - \cos3u)$。分部积分，$\int_0^\pi u\cos ku\,\dd u = [(\cos ku)/k^2]_0^\pi = ((-1)^k - 1)/k^2$，在 $k = 1$ 为 $-2$，$k = 3$ 为 $-\frac29$。所以积分为 $\frac12(-2 + \frac29) = -\frac89$，$\langle x\rangle_{12} = -\frac{16L}{9\pi^2}$。于是

$$
\frac{\langle(x_1 - x_2)^2\rangle_-}{L^2} = \frac16 - \frac{5}{8\pi^2} + 2\left(\frac{16}{9\pi^2}\right)^2 = \frac16 - \frac{5}{8\pi^2} + \frac{512}{81\pi^4} = 0.1682.
$$
:::
:::

::: exercise Li+ 中的交换分裂 {level=2 check="3.58"}
利用 [[#ex-helium-1s2s]] 之前引用的类氢积分，估算 $\mathrm{Li}^+$（$Z = 3$）$1s2s$ 组态的单态–三重态一阶分裂（以 eV 计）。
::: solution
$2K = 2\times\frac{16}{729}\times3\times27.211\,\mathrm{eV} = \frac{96}{729}\times27.211\,\mathrm{eV} = 3.58\,\mathrm{eV}$。类氢估算随 $Z$ 线性缩放。$\mathrm{Li}^+$ 的实测分裂约 $1.9\,\mathrm{eV}$；与氦一样，一阶值偏大，原因也相同。
:::
:::

::: exercise 对称性守恒 {#exr-conserved level=3}
证明：若 $\hat H$ 在交换下对称，则 $t = 0$ 时对称（或反对称）的态永远保持对称（或反对称）。说明为什么这意味着对称化公设与动力学相容。
::: solution
由 [[#prop-exchange]] (c)，$[\hat P_{12}, \hat H] = 0$。若 $\hat H$ 不含时，演化算符 $\hat U(t) = e^{-i\hat Ht/\hbar}$ 是 $\hat H$ 的幂级数，所以也与 $\hat P_{12}$ 对易。若 $\hat P_{12}\psi(0) = p\,\psi(0)$，则

$$
\hat P_{12}\psi(t) = \hat P_{12}\hat U(t)\psi(0) = \hat U(t)\hat P_{12}\psi(0) = p\,\hat U(t)\psi(0) = p\,\psi(t).
$$

若 $\hat H$ 含时但在每一时刻都对称，令 $\phi(t) = \hat P_{12}\psi(t) - p\psi(t)$。则 $i\hbar\dot\phi = \hat P_{12}\hat H\psi - p\hat H\psi = \hat H\phi$，所以 $\phi$ 满足初值 $\phi(0) = 0$ 的薛定谔方程，由解的唯一性 $\phi(t) = 0$。无论哪种情形，任何物理的（对称的）哈密顿量都无法把一种对称性的态变成另一种，所以对每类粒子指定一种对称性，永不与演化冲突。
:::
:::

::: exercise 斯莱特行列式的性质 {level=3}
证明 [[#def-slater]] 的斯莱特行列式在每一对交换下反对称，归一化为 $1$，且当诸 $\phi_k$ 线性相关时恒等于零。
::: solution
交换 $\xi_i$ 与 $\xi_j$ 就是交换矩阵的第 $i$ 行与第 $j$ 行，行列式变号：此即反对称性。若诸 $\phi_k$ 线性相关，则对 $\xi$ 的任何取值矩阵的各列都线性相关，行列式恒等于零；两个轨道相同的情形包含在内。

归一化：把行列式按置换 $\sigma$ 展开为 $\sum_\sigma\sgn(\sigma)\prod_k\phi_{\sigma(k)}(\xi_k)$。于是

$$
\langle\Psi\vert\Psi\rangle = \frac{1}{N!}\sum_{\sigma, \tau}\sgn(\sigma)\sgn(\tau)\prod_{k=1}^N\langle\phi_{\sigma(k)}\vert\phi_{\tau(k)}\rangle.
$$

由标准正交性每个因子都是 $\delta_{\sigma(k)\tau(k)}$，所以只有 $\sigma = \tau$ 存活，此时 $\sgn(\sigma)^2 = 1$。这样的项有 $N!$ 个，故 $\langle\Psi\vert\Psi\rangle = N!/N! = 1$。
:::
:::

::: exercise 狄拉克交换恒等式 {level=3}
对两个自旋-$\frac12$ 粒子，设 $\hat P^{\mathrm{spin}}_{12}$ 交换其自旋态。证明 $\hat P^{\mathrm{spin}}_{12} = \frac12\bigl(1 + \boldsymbol\sigma_1\cdot\boldsymbol\sigma_2\bigr) = \frac12 + \frac{2}{\hbar^2}\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$，并用它解释 [[#eq-heisenberg]]。
::: solution
两边都是四维自旋空间上的算符，只需在一组基上比较。三重态对称，$\hat P^{\mathrm{spin}}_{12}$ 在其上为 $+1$；单态反对称，在其上为 $-1$。等式另一边，$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ 在三重态为 $\frac14\hbar^2$、单态为 $-\frac34\hbar^2$，所以 $\frac12 + 2\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2/\hbar^2$ 相应为 $\frac12 + \frac12 = 1$ 与 $\frac12 - \frac32 = -1$。两个算符在一组基上相同，故处处相同。由 $\boldsymbol\sigma = 2\hat{\mathbf S}/\hbar$，两个形式相同。

对电子，整体态反对称，$\hat P^{\mathrm{space}}_{12}\hat P^{\mathrm{spin}}_{12} = -1$，故 $\hat P^{\mathrm{space}}_{12} = -\hat P^{\mathrm{spin}}_{12}$（二者平方均为 $1$）。一阶能量 $J + K\,\hat P^{\mathrm{space}}_{12}$（在空间对称与反对称态上给出 $J\pm K$）于是等于 $J - K\hat P^{\mathrm{spin}}_{12} = J - \frac K2 - \frac{2K}{\hbar^2}\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$，正是 [[#eq-heisenberg]]。所谓自旋耦合，不过是换了装束的交换算符。
:::
:::
