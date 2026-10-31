[[quantum-1/angular-momentum]] 的代数允许量子数为半整数的角动量，$j = \frac12, \frac32, \ldots$，轨道角动量却把它们丢掉了，因为波函数绕转 $2\pi$ 之后必须回到自身。自然可没有把它们丢掉。电子、质子、中子与每一种夸克都带着 $s = \frac12$ 的内部角动量，称为**自旋**，它不是任何东西在空间中的运动。它没有通常意义上的波函数：电子自旋的态生活在二维复向量空间中，可观测量是 $2\times2$ 矩阵。

自旋是 [[quantum-1/formalism]] 形式结构最干净的示例。一切都能精确算出，只需几行矩阵代数，而每一个公设都能在一个实验里看到它在起作用，那就是奥托·施特恩（Otto Stern）与瓦尔特·格拉赫（Walther Gerlach）1922 年做的那个实验。自旋还有直接的实用后果：它给电子一个磁矩，这是材料中的磁性与磁共振的基础；它把氢原子每个能级的态数加倍；并通过泡利不相容原理塑造元素周期表。

本章从实验出发，用泡利矩阵建立二维形式体系，计算沿任意方向测量的结果，跟踪自旋在磁场中的进动，最后把两个自旋相加，得到三重态与单态。

## 施特恩–格拉赫实验 {#stern-gerlach}

一个电流环，或任何同时带有角动量与电荷的东西，都有磁偶极矩 $\boldsymbol\mu$。在磁场中它的能量为 $U = -\boldsymbol\mu\cdot\mathbf B$（[[magnetism/magnetic-force]]）。均匀磁场只扭转偶极子；非均匀磁场还要推它，当磁场及其梯度主要沿 $z$ 时，力为

$$
F_z = -\pdv{U}{z} = \mu_z\pdv{B_z}{z}
$$

因此，一束原子穿过一块梯度很强的磁铁时，会按照每个原子磁矩的 $z$ 分量向上或向下偏转。

1922 年，施特恩与格拉赫在法兰克福把一束从炉子射出的银原子经过这样一块磁铁投到一块玻璃板上。经典地，离开炉子的原子的磁矩指向随机方向，$\mu_z$ 取 $-\abs{\boldsymbol\mu}$ 到 $+\abs{\boldsymbol\mu}$ 之间的一切值，束应当展成连续的一片。然而它分成了**两**个清晰的斑点。磁矩的 $z$ 分量只取两个值。

两个值是古怪的。轨道角动量 $l$ 有 $2l + 1$ 个 $m$ 值，永远是奇数。银原子有 $47$ 个电子；其中 $46$ 个两两配对、总角动量为零，最后一个在 $5s$ 态，$l = 0$，所以它的轨道角动量为零，本该只有一个斑点，而不是两个。这两个斑点就是外层电子自旋的两个值 $m_s = \pm\frac12$，$s = \frac12$ 时 $2s + 1 = 2$。（施特恩与格拉赫当时用玻尔–索末菲轨道解释他们的结果；正确的解释要到 1925 年自旋被提出之后才到来。菲普斯（Phipps）与泰勒（Taylor）1927 年用基态氢原子重做了实验，也看到两个斑点，此事遂定。）

::: example 分裂的大小 {#ex-sg}
质量 $107.87\,\mathrm u$ 的银原子以 $550\,\mathrm{m/s}$ 离开炉子，穿过一块长 $3.50\,\mathrm{cm}$、场梯度 $\partial B_z/\partial z = 1.00\times10^3\,\mathrm{T/m}$ 的磁铁。取 $\abs{\mu_z} = \mu_B = 9.274\times10^{-24}\,\mathrm{J/T}$，求每束原子在磁铁出口处的横向偏转。
::: solution
力为 $F = \mu_B\,\partial B_z/\partial z = (9.274\times10^{-24})(1.00\times10^3) = 9.27\times10^{-21}\,\mathrm N$，质量为 $107.87\times1.6605\times10^{-27} = 1.791\times10^{-25}\,\mathrm{kg}$，所以加速度为 $a = 5.18\times10^4\,\mathrm{m/s^2}$，约为 $g$ 的五千倍。在磁铁中停留的时间为 $t = 0.0350/550 = 6.36\times10^{-5}\,\mathrm s$。匀加速（[[mechanics/motion-1d]]）之下，偏转为

$$
z = \frac12at^2 = \frac12(5.18\times10^4)(6.36\times10^{-5})^2 = 1.05\times10^{-4}\,\mathrm m = 0.105\,\mathrm{mm},
$$

一束向上、一束向下，所以两束离开磁铁时相距约 $0.2\,\mathrm{mm}$，并在磁场之外的无场区继续分离。这就是施特恩与格拉赫看到的尺度。偏转如此微小，由小小的玻尔磁子与原子的巨大质量所决定，这就是为什么实验需要巨大的梯度与准直良好的原子束。
:::
:::

这个实验可以按顺序串联地做，而这些序列正是量子形式体系所要求的。让束经过沿 $z$ 取向的磁铁，挡住下束，把上束（$S_z = +\hbar/2$）送进第二块 $z$ 磁铁：全部向上出射。现在改把它送进沿 $x$ 的磁铁：它分裂成两束等强的，$S_x = \pm\hbar/2$。挡住 $S_x = -\hbar/2$ 那束，把剩下那束送进第三块沿 $z$ 的磁铁：它*再次*分裂，等分成 $S_z = \pm\hbar/2$ 的两半。对 $S_x$ 的测量抹去了 $S_z$ 曾为 $+\hbar/2$ 的信息。这就是坍缩公设在起作用，它表明 $S_x$ 与 $S_z$ 不能同时确定，正如非零对易子 $[\hat S_z, \hat S_x] = i\hbar\hat S_y$ 所要求的那样。

## 自旋二分之一与泡利矩阵 {#pauli}

电子的自旋是 [[quantum-1/angular-momentum#thm-spectrum]] 意义下的角动量，$s = \frac12$。希尔伯特空间是二维的，由 $\hat S_z$ 的两个本征态张成。

::: definition 自旋二分之一 {#def-spin}
**自旋 ½** 粒子的自旋算符 $\hat{\mathbf S} = (\hat S_x, \hat S_y, \hat S_z)$ 在二维空间上满足 $[\hat S_i, \hat S_j] = i\hbar\varepsilon_{ijk}\hat S_k$，该空间具有标准正交基 $|{\uparrow}\rangle = |\tfrac12\,\tfrac12\rangle$ 与 $|{\downarrow}\rangle = |\tfrac12\,{-\tfrac12}\rangle$，于是

$$
\hat S^2 = \frac34\hbar^2\,\hat 1, \qquad \hat S_z|{\uparrow}\rangle = \frac\hbar2|{\uparrow}\rangle, \qquad \hat S_z|{\downarrow}\rangle = -\frac\hbar2|{\downarrow}\rangle.
$$

一般自旋态是一个**旋量** $|\chi\rangle = a|{\uparrow}\rangle + b|{\downarrow}\rangle$，写作列 $\chi = \begin{pmatrix}a\\ b\end{pmatrix}$，满足 $\abs a^2 + \abs b^2 = 1$。
:::

矩阵由 $s = \frac12$ 的升降关系 [[quantum-1/angular-momentum#eq-ladder-coeff]] 得到：$\hat S_+|{\downarrow}\rangle = \hbar\sqrt{\frac34 + \frac14}\,|{\uparrow}\rangle = \hbar|{\uparrow}\rangle$，而 $\hat S_+|{\uparrow}\rangle = 0$，所以 $\hat S_+ = \hbar\begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$，$\hat S_- = \hat S_+^\dagger$。于是 $\hat S_x = \frac12(\hat S_+ + \hat S_-)$，$\hat S_y = \frac{1}{2i}(\hat S_+ - \hat S_-)$。结果是 $\hat{\mathbf S} = \frac\hbar2\boldsymbol\sigma$，其中**泡利矩阵**为

$$
\sigma_x = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}, \qquad \sigma_y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}, \qquad \sigma_z = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}.
$$ {#eq-pauli}

::: theorem 泡利矩阵的代数 {#thm-pauli}
泡利矩阵是厄米的、无迹的，平方为单位算符，并满足

$$
\sigma_i\sigma_j = \delta_{ij}\hat 1 + i\varepsilon_{ijk}\sigma_k.
$$ {#eq-pauli-product}

于是 $[\sigma_i, \sigma_j] = 2i\varepsilon_{ijk}\sigma_k$，$\{\sigma_i, \sigma_j\} = \sigma_i\sigma_j + \sigma_j\sigma_i = 2\delta_{ij}\hat 1$，且对任意实向量 $\mathbf a$、$\mathbf b$，

$$
(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = (\mathbf a\cdot\mathbf b)\,\hat 1 + i\,\boldsymbol\sigma\cdot(\mathbf a\times\mathbf b).
$$ {#eq-sigma-ab}
:::

::: proof
厄米性与无迹性在 [[#eq-pauli]] 中一目了然。直接相乘得 $\sigma_x^2 = \sigma_y^2 = \sigma_z^2 = \hat 1$ 以及

$$
\sigma_x\sigma_y = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}\begin{pmatrix}0 & -i\\ i & 0\end{pmatrix} = \begin{pmatrix}i & 0\\ 0 & -i\end{pmatrix} = i\sigma_z,
$$

类似地 $\sigma_y\sigma_z = i\sigma_x$，$\sigma_z\sigma_x = i\sigma_y$。交换次序改变符号：$\sigma_y\sigma_x = (\sigma_x\sigma_y)^\dagger = -i\sigma_z$，因为泡利矩阵是厄米的。这九个乘积恰好就是 [[#eq-pauli-product]]。对易子与反对易子由两个次序相加、相减即得。最后，

$$
(\boldsymbol\sigma\cdot\mathbf a)(\boldsymbol\sigma\cdot\mathbf b) = \sum_{i,j}a_ib_j\sigma_i\sigma_j = \sum_{i,j}a_ib_j\bigl(\delta_{ij} + i\varepsilon_{ijk}\sigma_k\bigr) = \mathbf a\cdot\mathbf b + i\sum_k\sigma_k(\mathbf a\times\mathbf b)_k.
$$
:::

对易关系乘以 $(\hbar/2)^2$ 就是 $[\hat S_i, \hat S_j] = i\hbar\varepsilon_{ijk}\hat S_k$，所以这些矩阵是名正言顺的角动量。恒等式 [[#eq-sigma-ab]] 取 $\mathbf a = \mathbf b = \hat{\mathbf n}$（单位向量）得 $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat 1$：沿任一方向的自旋分量 $\hat S_n = \frac\hbar2\boldsymbol\sigma\cdot\hat{\mathbf n}$ 的本征值为 $\pm\hbar/2$。每个方向都是等价的，理应如此：沿任何轴的施特恩–格拉赫磁铁都给两个斑点。

### 沿任意方向的测量

设 $\hat{\mathbf n} = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta)$。则

$$
\boldsymbol\sigma\cdot\hat{\mathbf n} = \begin{pmatrix}\cos\theta & \sin\theta\,e^{-i\varphi}\\ \sin\theta\,e^{i\varphi} & -\cos\theta\end{pmatrix},
$$

可直接验证属于本征值 $+1$ 与 $-1$ 的本征向量为

$$
|{\uparrow_n}\rangle = \begin{pmatrix}\cos\frac\theta2\\ e^{i\varphi}\sin\frac\theta2\end{pmatrix}, \qquad |{\downarrow_n}\rangle = \begin{pmatrix}-e^{-i\varphi}\sin\frac\theta2\\ \cos\frac\theta2\end{pmatrix}.
$$ {#eq-spin-n}

（对第一个：$(\boldsymbol\sigma\cdot\hat{\mathbf n})|{\uparrow_n}\rangle$ 的第一行是 $\cos\theta\cos\frac\theta2 + \sin\theta\sin\frac\theta2 = \cos\frac\theta2$，用了 $\cos(\theta - \frac\theta2)$。）反过来，*每一个*旋量都是某个方向上的 $|{\uparrow_n}\rangle$，至多差一个整体相位：写 $a = \abs ae^{i\alpha}$、$b = \abs be^{i\beta}$，把 $e^{i\alpha}$ 提出来，取 $\cos\frac\theta2 = \abs a$、$\varphi = \beta - \alpha$。所以每个纯自旋 ½ 态都是"沿某轴自旋向上"，态与球面上的点一一对应，这个球就是**布洛赫（Bloch）球**。态 $|{\uparrow_n}\rangle$ 中的期望值 $\langle\boldsymbol\sigma\rangle$ 恰为单位向量 $\hat{\mathbf n}$。

::: theorem 沿倾斜轴测量自旋 {#thm-tilted}
自旋 ½ 粒子处于态 $|{\uparrow_n}\rangle$，即沿 $\hat{\mathbf n}$ 自旋向上，沿与 $\hat{\mathbf n}$ 成角 $\gamma$ 的单位向量 $\hat{\mathbf n}'$ 测量 $S$，概率为

$$
P(+\tfrac\hbar2) = \cos^2\frac\gamma2, \qquad P(-\tfrac\hbar2) = \sin^2\frac\gamma2,
$$

且 $\langle S_{n'}\rangle = \frac\hbar2\cos\gamma$。
:::

::: proof
物理是转动不变的，所以可取 $\hat{\mathbf n} = \hat{\mathbf z}$，$\hat{\mathbf n}'$ 在极角 $\gamma$、方位 $0$ 处。则 $|{\uparrow_n}\rangle = |{\uparrow}\rangle = (1, 0)$，由 [[#eq-spin-n]] $|{\uparrow_{n'}}\rangle = (\cos\frac\gamma2, \sin\frac\gamma2)$，于是 $P(+) = \abs{\langle{\uparrow_{n'}}|{\uparrow}\rangle}^2 = \cos^2\frac\gamma2$，$P(-) = 1 - P(+) = \sin^2\frac\gamma2$。平均值为 $\frac\hbar2(\cos^2\frac\gamma2 - \sin^2\frac\gamma2) = \frac\hbar2\cos\gamma$。
:::

$\gamma = 90^\circ$ 时两种结果等可能，正如用 $x$ 磁铁的串联实验。$\gamma = 180^\circ$ 时结果必定是 $-\hbar/2$。注意半角：测量轴转动 $\gamma$，振幅只变化 $\cos\frac\gamma2$。把态本身绕任何轴转动 $2\pi$，旋量乘以 $-1$，在 [[#eq-spin-n]] 中把 $\theta$ 换成 $\theta + 2\pi$ 即可看出。对单个自旋而言整体符号没有可观测效应，所以这与实验相容；1975 年用中子干涉仪直接观察到了这一效应：把中子束的一半在磁场中转动 $2\pi$，与另一半发生相消干涉。

::: widget plot
f: cos(x/2)^2; sin(x/2)^2; (1 + cos(x))/2
x: 0, 2pi
y: 0, 1.05
piticks: true
labels: P(沿 n′ 向上); P(沿 n′ 向下); (⟨σ·n′⟩ + 1)/2
caption: 一个沿 $\hat{\mathbf n}$ 制备为上态的自旋，沿与之成角 $\gamma$（横轴）的轴测量时两种结果的概率。$\gamma = 0$ 时结果确定；$\gamma = \pi/2$ 时如同掷硬币；$\gamma = \pi$ 时必定向下。第三条曲线与第一条重合，这就是 $\langle S_{n'}\rangle = \frac\hbar2\cos\gamma$ 改写为概率的陈述。注意周期：概率在 $2\pi$ 之后重复，而旋量本身恰在那里变号。
:::

::: example 旋量的期望值 {#ex-spinor}
电子处于自旋态 $\chi = \frac15\begin{pmatrix}3\\ 4i\end{pmatrix}$。求 $S_z = \pm\hbar/2$ 与 $S_x = \pm\hbar/2$ 的概率，以及向量 $\langle\hat{\mathbf S}\rangle$。沿哪个方向自旋必定向上？
::: solution
态已归一化，因为 $(9 + 16)/25 = 1$。对 $S_z$，$P(+) = \abs{3/5}^2 = 9/25$，$P(-) = \abs{4i/5}^2 = 16/25$。$\sigma_x$ 的本征向量为 $\frac{1}{\sqrt2}(1, \pm1)$，所以

$$
P(S_x = \pm\tfrac\hbar2) = \frac12\abs{\frac35 \pm \frac{4i}{5}}^2 = \frac12\cdot\frac{9 + 16}{25} = \frac12.
$$

求期望值，记 $\chi = (a, b)$，有 $\langle\sigma_z\rangle = \abs a^2 - \abs b^2$，$\langle\sigma_x\rangle = 2\operatorname{Re}(a^*b)$，$\langle\sigma_y\rangle = 2\operatorname{Im}(a^*b)$。这里 $a^*b = (3/5)(4i/5) = 12i/25$，所以

$$
\langle\boldsymbol\sigma\rangle = \left(0,\ \frac{24}{25},\ -\frac{7}{25}\right), \qquad \langle\hat{\mathbf S}\rangle = \frac\hbar2\langle\boldsymbol\sigma\rangle = \hbar\left(0,\ \frac{12}{25},\ -\frac{7}{50}\right).
$$

向量 $\langle\boldsymbol\sigma\rangle$ 的长度为 $\sqrt{576 + 49}/25 = 1$：纯自旋 ½ 态总是指向布洛赫球上的某处。沿 $\hat{\mathbf n} = (0, 0.96, -0.28)$ 自旋必定向上，该方向在 $yz$ 平面内，极角 $\theta = \arccos(-0.28) = 106.3^\circ$。用 [[#eq-spin-n]] 检验：$\cos\frac\theta2 = \cos53.1^\circ = 0.600 = \frac35$，且 $e^{i\varphi}\sin\frac\theta2 = i(0.800)$，其中 $\varphi = 90^\circ$。
:::
:::

::: quiz
一束沿 $z$ 自旋向上的电子通过一台沿 $x$ 的施特恩–格拉赫磁铁；只保留 $S_x = +\hbar/2$ 那束，再把它送进一台沿 $z$ 的磁铁。原始束中有几分之几以 $S_z = -\hbar/2$ 出射？
- [ ] $0$，因为束是按 $S_z = +\hbar/2$ 制备的。
- [x] $1/4$。
- [ ] $1/2$。
- [ ] $1/8$。
::: solution
束的一半在 $x$ 筛选后幸存（$\gamma = 90^\circ$ 给出 $\cos^2 45^\circ = \frac12$），幸存者是 $|{\uparrow_x}\rangle$ 态，对先前的 $S_z$ 已毫无记忆。在最后的 $z$ 磁铁中，它们的一半向下。比例为 $\frac12\times\frac12 = \frac14$。第一个选项把 $S_z$ 当作某种在 $S_x$ 测量中幸存下来的属性，而 [[quantum-1/formalism#ax-postulates]]（坍缩）告诉我们它不是。
:::
:::

## 磁场中的自旋 {#precession}

电子的自旋带有磁矩

$$
\hat{\boldsymbol\mu} = -g\,\frac{\mu_B}{\hbar}\,\hat{\mathbf S}, \qquad \mu_B = \frac{e\hbar}{2m_e} = 9.2740\times10^{-24}\,\mathrm{J/T},
$$ {#eq-moment}

其中 $\mu_B$ 是**玻尔磁子**，$g$ 是 **g 因子**。对轨道运动，同一公式取 $g = 1$（做轨道运动的电荷，其磁矩与角动量之比按经典计算为 $q/2m$）。对自旋，狄拉克 1928 年的相对论方程预言 $g = 2$，而实测值为 $g = 2.00231930436$。这一微小的超出，$0.00116$，由波利卡普·库施（Polykarp Kusch）与亨利·福利（Henry Foley）于 1947 年测得，1948 年由朱利安·施温格（Julian Schwinger）算作 $\alpha/2\pi$，是量子电动力学的首次胜利。负号意味着磁矩与自旋反向，因为电子带负电。

在均匀场 $\mathbf B = B\hat{\mathbf z}$ 中，自旋的哈密顿量为

$$
\hat H = -\hat{\boldsymbol\mu}\cdot\mathbf B = \frac{g\mu_BB}{\hbar}\hat S_z = \frac{\hbar\omega_L}{2}\sigma_z, \qquad \omega_L = \frac{g\mu_BB}{\hbar}.
$$

它的本征态是 $|{\uparrow}\rangle$ 与 $|{\downarrow}\rangle$，能量为 $\pm\hbar\omega_L/2$，间隔 $\hbar\omega_L = g\mu_BB$。对 $B = 1\,\mathrm T$，这是 $1.16\times10^{-4}\,\mathrm{eV}$，约为室温下 $k_BT$ 的 $1/200$。

::: theorem 拉莫尔进动 {#thm-larmor}
自旋 ½ 处于场 $B\hat{\mathbf z}$ 中，$\hat H = \frac12\hbar\omega_L\sigma_z$，自旋的期望值以角频率 $\omega_L$ 绕 $\hat{\mathbf z}$ 进动：

$$
\langle S_z\rangle(t) = \langle S_z\rangle(0), \qquad \langle S_x\rangle(t) + i\langle S_y\rangle(t) = e^{i\omega_Lt}\bigl(\langle S_x\rangle(0) + i\langle S_y\rangle(0)\bigr).
$$

$t = 0$ 时在极角 $\theta$、方位 $\varphi_0$ 方向上自旋向上的自旋，极角保持 $\theta$ 不变，方位变为 $\varphi_0 + \omega_Lt$。
:::

::: proof
把初态写作 $\chi(0) = (a, b)$。能量本征态是 $|{\uparrow}\rangle$ 与 $|{\downarrow}\rangle$，能量为 $\pm\frac12\hbar\omega_L$，所以由 [[quantum-1/schrodinger-equation#thm-stationary]]，$\chi(t) = (ae^{-i\omega_Lt/2}, be^{i\omega_Lt/2})$。于是 $\abs{a(t)}^2 - \abs{b(t)}^2$ 是常量，此即 $\langle S_z\rangle$；且

$$
a(t)^*b(t) = a^*b\,e^{i\omega_Lt}.
$$

由于 $\langle\sigma_x\rangle + i\langle\sigma_y\rangle = 2\operatorname{Re}(a^*b) + 2i\operatorname{Im}(a^*b) = 2a^*b$，横向分量以因子 $e^{i\omega_Lt}$ 转动。对态 [[#eq-spin-n]]，$a^*b = \cos\frac\theta2\sin\frac\theta2\,e^{i\varphi_0}$，所以方位按 $\varphi_0 + \omega_Lt$ 推进。
:::

这与经典磁陀螺在场中的进动是同一个进动，速率也相同，因为 $\langle\hat{\mathbf S}\rangle$ 服从经典方程 $\dd\langle\mathbf S\rangle/\dd t = \langle\boldsymbol\mu\rangle\times\mathbf B$（又是埃伦费斯特定理，因为哈密顿量对 $\hat{\mathbf S}$ 是线性的）。频率 $\omega_L/2\pi = g\mu_BB/h$ 对电子为每特斯拉 $28.0\,\mathrm{GHz}$。

::: example 被横向磁场翻转的自旋 {#ex-flip}
电子自旋在 $t = 0$ 时被制备为沿 $z$ 向上，然后接通磁场 $\mathbf B = B\hat{\mathbf x}$。求时刻 $t$ 测量 $S_z$ 得到 $-\hbar/2$ 的概率，以及对 $B = 1.00\,\mathrm{mT}$，自旋确定翻转的最短时间。
::: solution
现在 $\hat H = \frac12\hbar\omega_L\sigma_x$。由本章下面转动算符那道习题（或直接解两个耦合方程），时间演化算符为

$$
e^{-i\omega_Lt\sigma_x/2} = \cos\frac{\omega_Lt}{2}\,\hat 1 - i\sin\frac{\omega_Lt}{2}\,\sigma_x,
$$

所以态为 $\chi(t) = \bigl(\cos\frac{\omega_Lt}{2},\ -i\sin\frac{\omega_Lt}{2}\bigr)$，且

$$
P(S_z = -\tfrac\hbar2) = \sin^2\frac{\omega_Lt}{2}.
$$

在布洛赫图像中，自旋绕 $x$ 进动，穿过 $yz$ 平面，从北极到南极再返回。第一次确定翻转发生在 $\omega_Lt = \pi$，即 $t = \pi\hbar/g\mu_BB$。对 $B = 1.00\times10^{-3}\,\mathrm T$，$\omega_L = g\mu_BB/\hbar = (2.0023)(9.2740\times10^{-24})(10^{-3})/(1.05457\times10^{-34}) = 1.761\times10^8\,\mathrm{s^{-1}}$，所以 $t = \pi/\omega_L = 17.8\,\mathrm{ns}$。恰好这么长的一次脉冲称为"$\pi$ 脉冲"；它的一半，"$\pi/2$ 脉冲"，把 $|{\uparrow}\rangle$ 变为等权叠加。这些就是磁共振与自旋量子比子的基本操作。
:::
:::

::: widget plot
f: sin(q)*cos(w*x); sin(q)*sin(w*x); cos(q)
x: 0, 10
y: -1.1, 1.1
labels: ⟨σx⟩; ⟨σy⟩; ⟨σz⟩
sliders: w=1:0.2:3:0.1; q=1.2:0:3.14:0.02
caption: 拉莫尔进动：场沿 $z$ 时，从极角 $q$（滑块，以弧度计）出发的自旋，其 $\langle\boldsymbol\sigma\rangle$ 的各分量随时间的变化，拉莫尔频率为 $w$。$z$ 分量保持不变；横向分量以 $w$ 转动，彼此相位差四分之一周期。令 $q = 0$，一切不动：能量本征态是定态。令 $q = \pi/2$，自旋沿布洛赫球的赤道扫过一圈又一圈。
:::

::: application 磁共振
若沿垂直于 $\mathbf B$ 的方向加一个以拉莫尔频率振荡的弱场，它就驱动 $|{\uparrow}\rangle$ 与 $|{\downarrow}\rangle$ 之间的跃迁，这一共振在 [[quantum-2/time-dependent]] 中研究。对电子，这就是**电子自旋共振**：X 波段的谱仪在 $0.35\,\mathrm T$ 下使用约 $9.8\,\mathrm{GHz}$，正好对应 $g\mu_BB/h = 28.0\,\mathrm{GHz/T}\times0.350\,\mathrm T$。对质子，其磁矩为 $2.793$ 个核磁子，频率为每特斯拉 $42.58\,\mathrm{MHz}$；**核磁共振**及其医学形式磁共振成像用的正是氢核在水与脂肪中的这一进动。一台 $3\,\mathrm T$ 的医用扫描仪工作在约 $128\,\mathrm{MHz}$。
:::

## 自旋与电子的完整状态 {#full-state}

对原子中的电子，完整的状态要同时指明它在哪里以及它的自旋指向何方。希尔伯特空间是 $L^2(\R^3)$ 与二维自旋空间的张量积，一般态是一个二分量波函数

$$
\Psi(\mathbf r) = \psi_\uparrow(\mathbf r)\,|{\uparrow}\rangle + \psi_\downarrow(\mathbf r)\,|{\downarrow}\rangle, \qquad \int\bigl(\abs{\psi_\uparrow}^2 + \abs{\psi_\downarrow}^2\bigr)\,\dd^3r = 1.
$$

$\abs{\psi_\uparrow(\mathbf r)}^2\,\dd^3r$ 是在 $\mathbf r$ 附近找到自旋向上的电子的概率。自旋算符作用于自旋部分，与 $\hat{\mathbf r}$、$\hat{\mathbf p}$、$\hat{\mathbf L}$ 都对易。若哈密顿量不含自旋，如 [[quantum-1/hydrogen]] 中的氢原子，定态就是乘积 $\psi_{nlm}(\mathbf r)\chi$，其中 $\chi = |{\uparrow}\rangle$ 或 $|{\downarrow}\rangle$，每个能级的简并度是那里算出的两倍：$2n^2$。计入自旋–轨道耦合后，好量子数变为 $n$、$l$、$j$ 与 $m_j$，按 [[quantum-1/angular-momentum#thm-addition]] 有 $j = l \pm \frac12$。

### 原子的磁矩

电子的轨道与自旋磁矩同角动量的比值不同，$g_L = 1$、$g_S \approx 2$，所以总磁矩 $-\mu_B(\hat{\mathbf L} + 2\hat{\mathbf S})/\hbar$ 不平行于 $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$。在弱场中，只有它沿 $\hat{\mathbf J}$ 的分量能在绕 $\hat{\mathbf J}$ 的快速进动中存活，能量移动为 $g_J\mu_BBm_j$，其中**朗德（Landé）因子**

$$
g_J = 1 + \frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}.
$$

对 $2p_{3/2}$ 它是 $\frac43$，对 $2p_{1/2}$ 它是 $\frac23$，对 $j = \frac12$ 的 $s$ 态它是 $2$。因此不同能级按不同幅度分裂，它们之间的谱线也比轨道论的 $2l + 1$ 个成分分裂得更多：这就是从 1897 年起让光谱学家大惑不解、直到自旋被提出才见分晓的**反常塞曼效应**，也是把泡利引向他的"二值性"的第一条线索。施特恩–格拉赫实验中的银原子处于 $g_J = 2$ 的 $5s_{1/2}$ 态，所以它沿场的磁矩为 $\pm\mu_B$，正是 [[#ex-sg]] 中使用的数值。

::: warning 自旋不是旋转的小球
乌伦贝克（Uhlenbeck）与古兹米特（Goudsmit）把自旋想象成电子的自转，这个名字就留了下来。这幅图像在数量上说不通。一个以角动量 $\hbar/2$ 自转、半径又小到与散射实验相容（小到 $10^{-18}\,\mathrm m$ 也看不到任何结构）的电子，其表面速率将远超 $c$。而且任何经典转动都给不出 $s = \frac12$，因为轨道角动量永远是 $\hbar$ 的整数倍。自旋像电荷一样是一种内部属性，只是它在转动下像角动量那样变换。$2\pi$ 转动带来的负号根本没有经典对应。
:::

## 两个自旋相加 {#two-spins}

两个自旋 ½ 粒子，比如氢中的电子与质子，或氦中的两个电子，其自旋空间是四维的，未耦合基为 $|{\uparrow\uparrow}\rangle$、$|{\uparrow\downarrow}\rangle$、$|{\downarrow\uparrow}\rangle$、$|{\downarrow\downarrow}\rangle$（第一个箭头属于粒子 1）。由 [[quantum-1/angular-momentum#thm-addition]] 取 $j_1 = j_2 = \frac12$，总自旋 $\hat{\mathbf S} = \hat{\mathbf S}_1 + \hat{\mathbf S}_2$ 有 $s = 1$（三个态）与 $s = 0$（一个态）。

::: proposition 三重态与单态 {#prop-triplet-singlet}
两个自旋 ½ 粒子的 $\hat S^2$ 与 $\hat S_z$ 的本征态是**三重态**（$s = 1$）

$$
|1\,1\rangle = |{\uparrow\uparrow}\rangle, \qquad |1\,0\rangle = \frac{1}{\sqrt2}\bigl(|{\uparrow\downarrow}\rangle + |{\downarrow\uparrow}\rangle\bigr), \qquad |1\,{-1}\rangle = |{\downarrow\downarrow}\rangle,
$$

与**单态**（$s = 0$）

$$
|0\,0\rangle = \frac{1}{\sqrt2}\bigl(|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle\bigr).
$$

三重态在交换两个粒子时对称，单态反对称。在这些态中，$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ 取值 $+\frac14\hbar^2$（三重态）与 $-\frac34\hbar^2$（单态）。
:::

::: proof
$|{\uparrow\uparrow}\rangle$ 的 $m = 1$，是可能的最大值，所以它就是 $|1\,1\rangle$。用 $\hat S_- = \hat S_{1-} + \hat S_{2-}$ 把它下降。左边，$\hat S_-|1\,1\rangle = \hbar\sqrt{2}\,|1\,0\rangle$。右边，每个 $\hat S_{i-}$ 把自己的 $\uparrow$ 变成 $\downarrow$、系数为 $\hbar$，给出 $\hbar(|{\downarrow\uparrow}\rangle + |{\uparrow\downarrow}\rangle)$。两边相等即得 $|1\,0\rangle$；再下降一次得 $|{\downarrow\downarrow}\rangle$。单态是剩下的那个 $m = 0$ 的态，与 $|1\,0\rangle$ 正交，相位另有约定。要确认 $s = 0$，验证 $\hat S_\pm$ 把它湮灭：$\hat S_+|0\,0\rangle = \frac{\hbar}{\sqrt2}(|{\uparrow\uparrow}\rangle - |{\uparrow\uparrow}\rangle) = 0$，对 $\hat S_-$ 同理，于是连同 $\hat S_z|0\,0\rangle = 0$，每个分量都把它湮灭，故 $\hat S^2|0\,0\rangle = 0$。

关于点乘，$\hat S^2 = \hat S_1^2 + \hat S_2^2 + 2\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$，所以 $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac12\bigl(\hbar^2s(s+1) - \frac34\hbar^2 - \frac34\hbar^2\bigr)$，对 $s = 1$ 是 $\frac12(2 - \frac32)\hbar^2 = \frac14\hbar^2$，对 $s = 0$ 是 $\frac12(0 - \frac32)\hbar^2 = -\frac34\hbar^2$。
:::

::: example p 电子的自旋–轨道态 {#ex-spin-orbit}
氢中处于 $2p$ 态的电子有 $l = 1$、$s = \frac12$。对 $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$，求 $j$ 的可能值、各自的态数、$\hat{\mathbf L}\cdot\hat{\mathbf S}$ 的本征值，并把态 $|j = \frac32,\ m_j = \frac12\rangle$ 用未耦合基写出。
::: solution
由 [[quantum-1/angular-momentum#thm-addition]]，$j = \frac12$ 或 $\frac32$，分别有 $2$ 个与 $4$ 个态，恰好数完带自旋的 $p$ 电子的 $3\times2 = 6$ 个态。由 $\hat{\mathbf L}\cdot\hat{\mathbf S} = \frac12(\hat J^2 - \hat L^2 - \hat S^2)$，

$$
\hat{\mathbf L}\cdot\hat{\mathbf S} = \frac{\hbar^2}{2}\left(j(j+1) - 2 - \frac34\right) = \begin{cases}\frac12\hbar^2, & j = \frac32,\\ -\hbar^2, & j = \frac12.\end{cases}
$$

自旋–轨道相互作用正比于 $\hat{\mathbf L}\cdot\hat{\mathbf S}$，所以它把 $2p$ 劈成 $2p_{3/2}$（四个态）与 $2p_{1/2}$（两个态），重心保持不变：$4\cdot\frac12 + 2\cdot(-1) = 0$。至于那个态，从顶上出发，$|\frac32\,\frac32\rangle = |1\,1\rangle|{\uparrow}\rangle$，用 $\hat J_- = \hat L_- + \hat S_-$ 下降。左边，$\hat J_-|\frac32\,\frac32\rangle = \hbar\sqrt{\frac{15}{4} - \frac34}\,|\frac32\,\frac12\rangle = \sqrt3\hbar\,|\frac32\,\frac12\rangle$。右边，$\hat L_-|1\,1\rangle = \sqrt2\hbar|1\,0\rangle$，$\hat S_-|{\uparrow}\rangle = \hbar|{\downarrow}\rangle$。于是

$$
\left|\tfrac32\,\tfrac12\right\rangle = \sqrt{\tfrac23}\,|1\,0\rangle|{\uparrow}\rangle + \sqrt{\tfrac13}\,|1\,1\rangle|{\downarrow}\rangle.
$$

在此态中测量 $S_z$，尽管 $m_j = \frac12$ 是确定的，仍有概率 $\frac23$ 给出 $+\hbar/2$。正交组合 $\sqrt{\frac13}|1\,0\rangle|{\uparrow}\rangle - \sqrt{\frac23}|1\,1\rangle|{\downarrow}\rangle$ 就是 $|\frac12\,\frac12\rangle$。
:::
:::

单态是最简单的**纠缠**态：每个粒子各自都没有自己的自旋态，然而沿任何轴对其中一个测 $S_z$，都必定在另一个上给出相反的结果。在氢中，电子与质子自旋之间的磁相互作用正比于 $\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p$，所以它把基态劈分为三重态与单态，相隔 $5.87\,\mu\mathrm{eV}$；两者之间的跃迁就是 [[quantum-1/hydrogen]] 中的 $21\,\mathrm{cm}$ 线。在氦中，自旋态的对称性与泡利原理结合，决定哪些空间态是允许的，自旋就是这样塑造原子结构的（[[quantum-2/identical-particles]]）。

::: example 氢的超精细能级 {#ex-hyperfine}
设氢基态中的自旋–自旋相互作用为 $\hat H_{\mathrm{hf}} = (A/\hbar^2)\,\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p$，$A > 0$。求四个自旋态的能量、简并度，以及能重现 $1420.406\,\mathrm{MHz}$ 的 $21\,\mathrm{cm}$ 线所需的 $A$ 值（以电子伏特计）。
::: solution
由 [[#prop-triplet-singlet]]，三重态的 $\hat{\mathbf S}_e\cdot\hat{\mathbf S}_p = \frac14\hbar^2$，能量为 $+A/4$，三重简并；单态为 $-\frac34\hbar^2$，能量为 $-3A/4$。单态是基态，劈裂为 $A/4 + 3A/4 = A$。光子满足 $h\nu = A$，所以

$$
A = (6.62607\times10^{-34})(1.420406\times10^9)\,\mathrm J = 9.4117\times10^{-25}\,\mathrm J = 5.874\,\mu\mathrm{eV}.
$$

等价地说，温度 $A/k_B = 0.068\,\mathrm K$。在星际空间中，碰撞使三重态按简并度决定的 $3:1$ 比例保持占据，而极其缓慢的自发衰变（每个原子寿命约 $10^7$ 年）则由视线上数目庞大的原子来补偿。
:::
:::

::: history 自旋的发现
奥托·施特恩（Otto Stern）与瓦尔特·格拉赫（Walther Gerlach）1922 年 2 月在法兰克福完成了他们的实验。1924 年，沃尔夫冈·泡利（Wolfgang Pauli）为解释反常塞曼效应与元素周期表的结构，提出电子具有一种"经典无法描述的二值性"，并于 1925 年初提出了不相容原理。拉尔夫·克罗尼格（Ralph Kronig）当年想到了一个自转的电子，却被人劝止未发。乔治·乌伦贝克（George Uhlenbeck）与塞缪尔·古兹米特（Samuel Goudsmit）——莱顿的埃伦费斯特（Paul Ehrenfest）的学生——1925 年 11 月在《自然科学》（*Naturwissenschaften*）上提出了自转电子；莱韦林·托马斯（Llewellyn Thomas）1926 年证明，一个 $\frac12$ 的相对论进动因子消除了精细结构中的一个偏差。泡利 1927 年给出了以他名字命名的矩阵表述的二分量非相对论理论，同年菲普斯与泰勒的氢束实验证实施特恩–格拉赫分裂确实来自电子自旋。保罗·狄拉克（Paul Dirac）1928 年的相对论方程不请自来地产出了自旋与 $g = 2$。
:::

## 后续内容 {#leads}

按 $j$ 与 $m_j$ 劈分原子能级的自旋–轨道耦合与塞曼效应，将在 [[quantum-2/stationary-perturbation]] 与 [[quantum-2/atomic-structure]] 中用微扰论处理。三重态与单态是全同粒子对称性（[[quantum-2/identical-particles]]）与纠缠态（[[quantum-2/entanglement]]）的第一批例子，后者用单态来检验贝尔不等式。哈密顿量为 $\frac12\hbar\boldsymbol\omega\cdot\boldsymbol\sigma$ 的二能级体系也是量子计算中的量子比特：每个纯态是布洛赫球上的一点，每个操作都是这个球的一次转动。在粒子物理中，自旋 ½ 粒子是费米子，它们在转动下的行为是 [[particles]] 的一部分。

::: summary
- 施特恩–格拉赫实验把银（或氢）原子束分成两束：电子带有 $s = \frac12$、$m_s = \pm\frac12$ 的内部角动量。
- 自旋 ½ 的态是二分量旋量；$\hat{\mathbf S} = \frac\hbar2\boldsymbol\sigma$，泡利矩阵满足 $\sigma_i\sigma_j = \delta_{ij} + i\varepsilon_{ijk}\sigma_k$；$\hat S^2 = \frac34\hbar^2$。
- 沿任何轴的自旋分量本征值为 $\pm\hbar/2$；每个纯态都是沿某个方向自旋向上（布洛赫球上的一点）。
- 沿 $\hat{\mathbf n}$ 自旋向上的自旋沿成角 $\gamma$ 的轴测量，以概率 $\cos^2(\gamma/2)$ 给出向上。
- 磁矩为 $\hat{\boldsymbol\mu} = -g\mu_B\hat{\mathbf S}/\hbar$，$g = 2.0023$；在场中自旋以 $\omega_L = g\mu_BB/\hbar$ 进动，每特斯拉 $28.0\,\mathrm{GHz}$。
- $2\pi$ 转动使旋量乘以 $-1$；自旋没有"旋转的小球"这样的经典模型。
- 两个自旋合成对称的三重态（$s = 1$，$\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2 = \frac14\hbar^2$）与反对称的单态（$s = 0$，$-\frac34\hbar^2$）。
:::

## 习题 {#exercises}

::: exercise 自旋的长度 {level=1 check="3/4"}
给出电子的 $\hat S^2$ 的本征值（以 $\hbar^2$ 为单位），并给出 $\sigma_y$ 的本征值。
::: solution
$\hat S^2 = s(s+1)\hbar^2 = \frac12\cdot\frac32\hbar^2 = \frac34\hbar^2$。另外 $\hat S^2 = \frac{\hbar^2}{4}(\sigma_x^2 + \sigma_y^2 + \sigma_z^2) = \frac{3\hbar^2}{4}\hat 1$。$\sigma_y$ 的本征值为 $\pm1$：其特征多项式为 $\lambda^2 - (-i)(i) = \lambda^2 - 1$。
:::
:::

::: exercise 一台 ESR 谱仪 {level=1 check="9.81"}
用 $g = 2.0023$ 与 $\mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$，求 $B = 0.350\,\mathrm T$ 下的电子自旋共振频率（GHz）。
::: solution
$\nu = g\mu_BB/h = (2.0023)(9.2740\times10^{-24})(0.350)/(6.62607\times10^{-34}) = 9.81\times10^9\,\mathrm{Hz} = 9.81\,\mathrm{GHz}$，一个微波频率。
:::
:::

::: exercise 倾斜的测量 {level=1 check="3/4"}
一个自旋被制备为沿 $z$ 向上。求沿与 $z$ 成 $60^\circ$ 的轴测量得到 $+\hbar/2$ 的概率。
::: solution
由 [[#thm-tilted]]，$P = \cos^2 30^\circ = \frac34$。
:::
:::

::: exercise y 分量 {level=2 check="12/25"}
对 [[#ex-spinor]] 中的态 $\chi = \frac15(3, 4i)$，由矩阵 $\sigma_y$ 直接计算 $\langle S_y\rangle$，以 $\hbar$ 为单位。
::: solution
$\sigma_y\chi = \frac15\begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}\begin{pmatrix}3\\ 4i\end{pmatrix} = \frac15\begin{pmatrix}4\\ 3i\end{pmatrix}$。于是 $\chi^\dagger\sigma_y\chi = \frac{1}{25}\bigl(3\cdot4 + (-4i)(3i)\bigr) = \frac{12 + 12}{25} = \frac{24}{25}$，所以 $\langle S_y\rangle = \frac\hbar2\cdot\frac{24}{25} = \frac{12}{25}\hbar$。
:::
:::

::: exercise 三台磁铁 {level=2 check="1/4"}
未极化的银原子（沿任何轴一半向上、一半向下）通过一台 $z$ 磁铁；只保留上束。接着通过一台轴线与 $z$ 成 $90^\circ$ 的磁铁，只保留上束；最后通过一台 $z$ 磁铁，收集下束。最初离开第一台磁铁上束的原子中，有几分之几到达收集器？
::: solution
第一台磁铁之后，原子处于 $|{\uparrow}\rangle$。第二台磁铁保留比例 $\cos^245^\circ = \frac12$，此刻态沿新轴向上。第三台磁铁把它们中的 $\sin^245^\circ = \frac12$ 送入下束。比例为 $\frac14$。若没有中间的磁铁，这个比例本该是 $0$：插入一次测量，能让一个原先不可能的结果变得可能。
:::
:::

::: exercise 进动周期 {level=2 check="35.7"}
求电子自旋在 $1.00\,\mathrm T$ 场中拉莫尔进动的周期（皮秒）。
::: solution
$\nu_L = g\mu_BB/h = 28.02\,\mathrm{GHz}$，所以周期为 $1/\nu_L = 3.57\times10^{-11}\,\mathrm s = 35.7\,\mathrm{ps}$。
:::
:::

::: exercise 转动算符 {level=3}
用 [[#eq-sigma-ab]] 证明对单位向量 $\hat{\mathbf n}$ 有 $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat 1$，并推出

$$
e^{-i\alpha\,\boldsymbol\sigma\cdot\hat{\mathbf n}/2} = \cos\frac\alpha2\,\hat 1 - i\sin\frac\alpha2\,\boldsymbol\sigma\cdot\hat{\mathbf n}.
$$

证明这一算符在 $\alpha = 2\pi$ 时为 $-\hat 1$，并证明当 $\hat{\mathbf n} = \hat{\mathbf z}$、$\alpha = \omega_Lt$ 时它正是 [[#thm-larmor]] 中自旋的时间演化算符 $e^{-i\hat Ht/\hbar}$。
::: solution
取 $\mathbf a = \mathbf b = \hat{\mathbf n}$，[[#eq-sigma-ab]] 给出 $(\boldsymbol\sigma\cdot\hat{\mathbf n})^2 = \hat{\mathbf n}\cdot\hat{\mathbf n} + i\boldsymbol\sigma\cdot(\hat{\mathbf n}\times\hat{\mathbf n}) = \hat 1$。于是在指数的幂级数中，记 $N = \boldsymbol\sigma\cdot\hat{\mathbf n}$，$N$ 的偶数次幂为 $\hat 1$，奇数次幂为 $N$：

$$
e^{-i\alpha N/2} = \sum_k\frac{(-i\alpha/2)^k}{k!}N^k = \left(\sum_{k\ \mathrm{even}}\frac{(-i\alpha/2)^k}{k!}\right)\hat 1 + \left(\sum_{k\ \mathrm{odd}}\frac{(-i\alpha/2)^k}{k!}\right)N = \cos\frac\alpha2\,\hat 1 - i\sin\frac\alpha2\,N.
$$

$\alpha = 2\pi$ 时，$\cos\pi = -1$ 而 $\sin\pi = 0$，所以算符为 $-\hat 1$。对 $\hat H = \frac12\hbar\omega_L\sigma_z$，$e^{-i\hat Ht/\hbar} = e^{-i\omega_Lt\sigma_z/2}$，正是公式取 $\hat{\mathbf n} = \hat{\mathbf z}$、$\alpha = \omega_Lt$；作用于 $(a, b)$ 给出 $(ae^{-i\omega_Lt/2}, be^{i\omega_Lt/2})$，如拉莫尔进动的证明中所述。磁场中的时间演化就是自旋绕场的转动。
:::
:::

::: exercise 单态沿每个轴看起来都一样 {level=3 check="-3/4"}
证明单态 $|0\,0\rangle$ 改用沿 $x$ 而非沿 $z$ 的自旋上下基写出时，形式不变，至多差一个整体相位。然后给出单态中的 $\langle\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2\rangle$，以 $\hbar^2$ 为单位。
::: hint
$|{\uparrow}\rangle = \frac{1}{\sqrt2}(|{\uparrow_x}\rangle + |{\downarrow_x}\rangle)$ 且 $|{\downarrow}\rangle = \frac{1}{\sqrt2}(|{\uparrow_x}\rangle - |{\downarrow_x}\rangle)$。
:::
::: solution
把提示代入 $|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle$，用 $+$ 与 $-$ 代表 $\uparrow_x$ 与 $\downarrow_x$：

$$
\frac12\Bigl[(|+\rangle + |-\rangle)(|+\rangle - |-\rangle) - (|+\rangle - |-\rangle)(|+\rangle + |-\rangle)\Bigr] = \frac12\Bigl[-2|{+-}\rangle + 2|{-+}\rangle\Bigr] = -\bigl(|{+-}\rangle - |{-+}\rangle\bigr).
$$

所以 $|0\,0\rangle = -\frac{1}{\sqrt2}(|{+-}\rangle - |{-+}\rangle)$：同样的反对称形式，只差一个整体符号。对任何轴都成立，因为 $s = 0$ 意味着态在转动下不变。因此，沿任何共同轴测量两个自旋，总是给出相反的结果。由 [[#prop-triplet-singlet]]，$\langle\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2\rangle = -\frac34\hbar^2$，所以答案是 $-\frac34$。三个乘积 $\hat S_{1i}\hat S_{2i}$ 各贡献 $-\frac14\hbar^2$，即沿每根轴的完全反关联。
:::
:::
