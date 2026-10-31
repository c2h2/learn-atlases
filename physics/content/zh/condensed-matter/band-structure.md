为什么铜是金属而金刚石是绝缘体？两者的原子都把电子束缚在几电子伏的能量上，两者都是晶体，两者的原子都近到外层轨道互相重叠。然而金刚石的电阻率比铜大至少二十个数量级。[[condensed-matter/free-electrons]] 的自由电子气甚至提不出这个问题：在那个模型里，一切有传导电子的材料都导电。

答案是能带论，而它建立在一个定理之上。在完全周期的势中，电子的能量本征态是平面波乘上一个以格子周期变化的函数。这就是布洛赫定理（Bloch's theorem），它有自由电子气所没有的两个直接推论。其一，完美晶体中的电子根本不散射于离子，这解释了纯金属的长平均自由程。其二，允许的能级形成彼此由**能隙**隔开的**能带**，而固体导电与否，取决于它最高的一条能带是满的还是部分填充的。

我们先证明布洛赫定理，然后在两个相反的极限下计算能带。**近自由电子模型**从平面波出发，把格子势当作小微扰；它表明能隙恰好在电子波满足 [[condensed-matter/crystals]] 的布拉格条件的地方打开。**紧束缚模型**从原子轨道出发，让电子在近邻之间跳跃；它表明一个原子能级如何展宽成一条能带。随后，有效质量、空穴与态的计数决定金属与绝缘体的分野。我们使用 [[quantum-1/piecewise-potentials]] 的定态薛定谔方程与有限高势垒的方法、[[quantum-2/stationary-perturbation]] 的简并微扰论，以及 [[quantum-1/formalism]] 的平移算符语言。

## 布洛赫定理 {#bloch}

考虑一个电子处在具有布拉维格子周期性的势中：

$$
H = \frac{\mathbf p^2}{2m} + U(\mathbf r), \qquad U(\mathbf r + \mathbf R) = U(\mathbf r) \quad \text{对一切格矢 } \mathbf R.
$$ {#eq-periodic-h}

势 $U$ 是一个平均值：它包含离子的吸引与其他电子的平均排斥。在这样的势中逐个地处理电子，就是**单电子近似**。它对简单金属和半导体的效果好得出奇，而它的失效之处——例如莫特（Mott）绝缘体——正是现代研究的一部分。

::: theorem 布洛赫定理 {#thm-bloch}
[[#eq-periodic-h]] 的本征态都可以取成如下形式

$$
\psi_{n\mathbf k}(\mathbf r) = e^{i\mathbf k\cdot\mathbf r}\,u_{n\mathbf k}(\mathbf r), \qquad u_{n\mathbf k}(\mathbf r + \mathbf R) = u_{n\mathbf k}(\mathbf r),
$$ {#eq-bloch}

其中 $\mathbf k$ 是波矢，$n$ 是能带索引。等价地，对每个格矢 $\mathbf R$ 有 $\psi_{n\mathbf k}(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\,\psi_{n\mathbf k}(\mathbf r)$。
:::

::: proof
对每个格矢定义**平移算符** $T_{\mathbf R}$：$(T_{\mathbf R}\psi)(\mathbf r) = \psi(\mathbf r + \mathbf R)$。因为 $U$ 是周期的，而动能不因原点平移而改变，对每个 $\psi$ 都有 $T_{\mathbf R}H\psi = HT_{\mathbf R}\psi$：每个平移算符与 $H$ 对易。平移算符彼此也对易，$T_{\mathbf R}T_{\mathbf R'} = T_{\mathbf R + \mathbf R'} = T_{\mathbf R'}T_{\mathbf R}$。一族彼此对易、又与 $H$ 对易的算符可以与 $H$ 同时对角化，所以我们可以选取 $H$ 的本征态 $\psi$，使它对一切 $\mathbf R$ 满足 $T_{\mathbf R}\psi = c(\mathbf R)\psi$。

本征值满足 $c(\mathbf R + \mathbf R') = c(\mathbf R)c(\mathbf R')$，因为依次施加两个平移会同时乘上两个因子。施加玻恩–冯·卡门边界条件：晶体沿 $\mathbf a_i$ 方向有 $N_i$ 个胞，且 $\psi(\mathbf r + N_i\mathbf a_i) = \psi(\mathbf r)$。于是 $c(\mathbf a_i)^{N_i} = 1$，故对某个整数 $m_i$ 有 $c(\mathbf a_i) = e^{2\pi i m_i/N_i}$。利用 [[condensed-matter/crystals]] 中满足 $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$ 的倒格矢 $\mathbf b_j$，定义

$$
\mathbf k = \sum_j\frac{m_j}{N_j}\,\mathbf b_j,
$$

使得 $c(\mathbf a_i) = e^{i\mathbf k\cdot\mathbf a_i}$。由乘法性，对 $\mathbf R = \sum n_i\mathbf a_i$，

$$
c(\mathbf R) = \prod_i c(\mathbf a_i)^{n_i} = e^{i\mathbf k\cdot\mathbf R}.
$$

于是 $\psi(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r)$。最后令 $u(\mathbf r) = e^{-i\mathbf k\cdot\mathbf r}\psi(\mathbf r)$；则 $u(\mathbf r + \mathbf R) = e^{-i\mathbf k\cdot\mathbf r}e^{-i\mathbf k\cdot\mathbf R}e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r) = u(\mathbf r)$，即 [[#eq-bloch]]。对每个 $\mathbf k$，周期函数 $u$ 在单个原胞上满足一个薛定谔方程，其解由 $n$ 标记，构成离散集合。
:::

这个证明与 [[condensed-matter/lattice-vibrations]] 中把声子模写成 $e^{ikna}$ 形式的是同一个论证：平移对称性迫使本征态在平移下获得一个相位。波矢 $\mathbf k$ 在倒格子的一个原胞内取 $N = N_1N_2N_3$ 个不同的值，晶体每个原胞对应一个。

### 晶体动量与简约区

布洛赫态不是动量本征态，因为 $u_{n\mathbf k}$ 包含许多傅里叶分量。向量 $\hbar\mathbf k$ 称为**晶体动量**。它在完美晶体中守恒，但只在模一个倒格矢的意义下守恒，因为 $\mathbf k$ 与 $\mathbf k + \mathbf G$ 给出相同的相位 $e^{i\mathbf k\cdot\mathbf R}$，从而描述同一组态。

::: corollary $\mathbf k$ 的周期性 {#cor-periodic-k}
这些标签可以选取为使得对每个倒格矢 $\mathbf G$ 都有 $\psi_{n,\mathbf k + \mathbf G} = \psi_{n\mathbf k}$ 且 $E_n(\mathbf k + \mathbf G) = E_n(\mathbf k)$。全部不同的态都可由第一布里渊区内的 $\mathbf k$ 得到。
:::

::: proof
若 $\psi$ 满足 $\psi(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r)$，则由于 $e^{i\mathbf G\cdot\mathbf R} = 1$，它也满足把 $\mathbf k$ 换成 $\mathbf k + \mathbf G$ 的条件。因此布洛赫波矢为 $\mathbf k$ 的本征态集合与 $\mathbf k + \mathbf G$ 的完全相同；把每组中的态按能量递增编号为 $n = 1, 2, \dots$，即得所述的周期性。每个 $\mathbf k$ 都与第一布里渊区中某点相差某个 $\mathbf G$。
:::

于是电子的谱是一族连续函数 $E_n(\mathbf k)$，每个能带一条，定义在布里渊区上并以此周期地延展开去。**能带结构**图沿区内高对称点之间的连线画出这些函数。布洛赫态还能无衰减地载流。态 $n\mathbf k$ 中电子的平均速度为

$$
\mathbf v_n(\mathbf k) = \frac1\hbar\,\nabla_{\mathbf k}E_n(\mathbf k),
$$ {#eq-band-velocity}

即由该能带的波构成的波包的群速度。尽管电子在离子格子中穿行，一般的 $\mathbf k$ 处它都不为零。完全周期的势无论多强都不散射电子：这就是电阻率来自破坏周期性的杂质与声子、而不是来自离子本身的原因。

## 近自由电子 {#nfe}

设势很弱。那么本征态应当接近平面波 $e^{i\mathbf k\cdot\mathbf r}$，能量为 $\varepsilon_{\mathbf k} = \hbar^2k^2/2m$。把周期势按倒格子作傅里叶级数展开：

$$
U(\mathbf r) = \sum_{\mathbf G}U_{\mathbf G}\,e^{i\mathbf G\cdot\mathbf r}, \qquad U_{-\mathbf G} = U_{\mathbf G}^*,
$$

并取能量零点使 $U_0 = 0$。势只把平面波 $\mathbf k$ 与平面波 $\mathbf k - \mathbf G$ 联系起来，矩阵元为 $\langle\mathbf k - \mathbf G\rvert U\lvert\mathbf k\rangle = U_{-\mathbf G}$（体积 $V$ 的箱中归一化的平面波）。这就是布洛赫定理的动量空间版本：波矢为 $\mathbf k$ 的布洛赫态是一切 $\mathbf G$ 对应的平面波 $\mathbf k - \mathbf G$ 的叠加。

$U$ 的一阶修正完全为零，因为 $U_0 = 0$。二阶非简并微扰论给出

$$
E(\mathbf k) = \varepsilon_{\mathbf k} + \sum_{\mathbf G\neq0}\frac{\abs{U_{\mathbf G}}^2}{\varepsilon_{\mathbf k} - \varepsilon_{\mathbf k - \mathbf G}} + \dots,
$$

除非某个分母很小，这只是一个小的修正。分母在 $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$ 时消失，即 $\abs{\mathbf k} = \abs{\mathbf k - \mathbf G}$：$\mathbf k$ 位于垂直平分 $\mathbf G$ 的平面上。这个平面是布里渊区的一个面，而条件 $k^2 = (\mathbf k - \mathbf G)^2$ 正是 [[condensed-matter/crystals]] 中从 $\mathbf k$ 到 $\mathbf k - \mathbf G$ 弹性散射的劳厄条件。电子波被格子布拉格反射。在那里，微扰论必须在简并态之间做。

::: theorem 区边界的能隙 {#thm-nfe-gap}
在只有平面波 $\mathbf k$ 与 $\mathbf k - \mathbf G$ 近于简并的点 $\mathbf k$ 附近，两条能带的能量为

$$
E_\pm(\mathbf k) = \frac{\varepsilon_{\mathbf k} + \varepsilon_{\mathbf k - \mathbf G}}{2} \pm\sqrt{\Bigl(\frac{\varepsilon_{\mathbf k} - \varepsilon_{\mathbf k - \mathbf G}}{2}\Bigr)^2 + \abs{U_{\mathbf G}}^2}.
$$ {#eq-nfe}

在区面上，即 $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$ 处，两条能带被劈开，能隙为 $E_+ - E_- = 2\abs{U_{\mathbf G}}$。
:::

::: proof
把哈密顿量限制在 $\lvert\mathbf k\rangle$ 与 $\lvert\mathbf k - \mathbf G\rangle$ 张成的二维空间中，这是简并微扰论的主导近似。把试探态写成 $c_1\lvert\mathbf k\rangle + c_2\lvert\mathbf k - \mathbf G\rangle$。$H$ 的对角元是 $\varepsilon_{\mathbf k}$ 与 $\varepsilon_{\mathbf k - \mathbf G}$，非对角元是 $\langle\mathbf k\rvert U\lvert\mathbf k - \mathbf G\rangle = U_{\mathbf G}$ 及其共轭。本征值条件是

$$
\det\begin{pmatrix}\varepsilon_{\mathbf k} - E & U_{\mathbf G} \\ U_{\mathbf G}^* & \varepsilon_{\mathbf k - \mathbf G} - E\end{pmatrix} = (\varepsilon_{\mathbf k} - E)(\varepsilon_{\mathbf k - \mathbf G} - E) - \abs{U_{\mathbf G}}^2 = 0.
$$

这是关于 $E$ 的二次方程，配方即得根 [[#eq-nfe]]。当 $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$ 时根号化为 $\abs{U_{\mathbf G}}$，两根相差 $2\abs{U_{\mathbf G}}$。被略去的平面波离简并很远，只按 $U$ 的二阶移动能量。
:::

一维情形，晶格常数为 $a$，$G = 2\pi/a$，边界在 $k = \pi/a$。那里，若 $U_G < 0$ 为实数（集中在离子上的吸引势），两个本征态是驻波 $\cos(\pi x/a)$（能量 $\varepsilon - \abs{U_G}$）与 $\sin(\pi x/a)$（能量 $\varepsilon + \abs{U_G}$）。余弦波把电荷堆在势低的离子上；正弦波把电荷堆在离子之间。能隙就是行波被布拉格反射后被迫变成的两个驻波之间的势能差。

::: widget plot
f: x^2; (abs(x) - 2)^2; (x^2 + (abs(x) - 2)^2)/2 - sqrt(((x^2 - (abs(x) - 2)^2)/2)^2 + U^2); (x^2 + (abs(x) - 2)^2)/2 + sqrt(((x^2 - (abs(x) - 2)^2)/2)^2 + U^2)
x: -1, 1
y: 0, 2.5
labels: 自由电子 k²; 自由电子 (k − G)²; 第一能带; 第二能带
sliders: U=0.15:0:0.5:0.01
caption: 一维晶体简约区表示中最低的两条近自由电子能带，由 [[#eq-nfe]] 算出：$x = ka/\pi$，能量以区边界处的自由电子能量为单位，$U = \abs{U_G}$ 用同样的单位。远离边界时能带紧贴自由抛物线。在 $x = \pm1$ 处它们互相排斥，能隙恰为 $2U$。令 $U = 0$ 可看到自由抛物线折回区内；然后增大 $U$，观察能带在边界处变平，那里群速度为零。
:::

::: example 一维能隙 {#ex-nfe-gap}
一维晶体 $a = 3.00\,\text{Å}$，格子势在 $G = 2\pi/a$ 处的傅里叶系数 $\abs{U_G} = 0.50\,\mathrm{eV}$。求区边界处的自由电子能量、能隙底与能隙顶的能量，以及能隙占区边界能量的比例。
::: solution
在 $k = \pi/a$ 处，

$$
\varepsilon_{\pi/a} = \frac{\hbar^2}{2m}\Bigl(\frac{\pi}{a}\Bigr)^2 = 3.810\,\mathrm{eV\,\text{Å}^2}\times\Bigl(\frac{\pi}{3.00\,\text{Å}}\Bigr)^2 = 4.18\,\mathrm{eV},
$$

其中 $\hbar^2/2m = 3.810\,\mathrm{eV\,\text{Å}^2}$ 是一个值得记住的数。由 [[#thm-nfe-gap]]，带边为 $4.18 - 0.50 = 3.68\,\mathrm{eV}$ 与 $4.18 + 0.50 = 4.68\,\mathrm{eV}$，能隙为 $1.00\,\mathrm{eV}$，约为区边界能量的四分之一。半电子伏的势相对动能来说很小，双波近似是合理的；可它产生的能隙却已有硅的能隙那么大。这样大小的能隙，只要在合适的位置，就足以把导体变成绝缘体。
:::
:::

### 精确模型：克罗尼希–潘尼势梳

微扰论假定了弱势。一个对任意强度都可精确求解的模型可以不要这一假设而说明同一件事。设势为排斥 δ 函数构成的梳：$U(x) = \alpha\sum_n\delta(x - na)$，$\alpha > 0$：这是把离子画成锐利散射中心的漫画，1931 年由克罗尼希（Kronig）与潘尼（Penney）以方势垒形式引入。

::: proposition 克罗尼希–潘尼条件 {#prop-kp}
对 $E = \hbar^2q^2/2m > 0$，δ 势梳具有波矢为 $k$ 的布洛赫本征态，当且仅当

$$
\cos ka = \cos qa + P\,\frac{\sin qa}{qa}, \qquad P = \frac{m\alpha a}{\hbar^2}.
$$ {#eq-kp}

使右端落在 $[-1, 1]$ 之外的能量是禁戒的：它们构成能隙。
:::

::: proof
δ 函数之间势为零，所以在 $0 < x < a$ 上解为 $\psi = Ae^{iqx} + Be^{-iqx}$。由 [[#thm-bloch]]，在 $-a < x < 0$ 上 $\psi(x) = e^{-ika}\psi(x + a) = e^{-ika}\bigl(Ae^{iq(x+a)} + Be^{-iq(x+a)}\bigr)$。在 $x = 0$ 的 δ 函数处，$\psi$ 连续而 $\psi'$ 按 $(2m\alpha/\hbar^2)\psi(0)$ 跃变，如 [[quantum-1/piecewise-potentials]] 中的情形。连续性给出

$$
A + B = e^{-ika}\bigl(Ae^{iqa} + Be^{-iqa}\bigr),
$$

跃变条件给出

$$
iq(A - B) - iqe^{-ika}\bigl(Ae^{iqa} - Be^{-iqa}\bigr) = \frac{2m\alpha}{\hbar^2}(A + B).
$$

这是关于 $A$、$B$ 的两个齐次线性方程。令行列式为零，用 $e^{ika} + e^{-ika} = 2\cos ka$ 化简，经过一页代数（[[#exr-kp]] 要求补出）即得 $\cos ka = \cos qa + (m\alpha/\hbar^2q)\sin qa$，即 [[#eq-kp]]。对实 $k$ 有 $\abs{\cos ka}\le1$，所以只有当右端介于 $-1$ 与 $1$ 之间时能量才被允许。
:::

::: widget plot
f: cos(x) + P*sin(x)/x; 1; -1
x: 0.01, 13
y: -2, 4
labels: cos qa + P sin(qa)/qa; +1; −1
sliders: P=3:0:15:0.1
caption: 克罗尼希–潘尼条件 [[#eq-kp]] 的右端对 $qa = a\sqrt{2mE}/\hbar$ 的图像。允许的能带是曲线落在直线 $\pm1$ 之间的 $qa$ 区间；能隙是曲线脱出之处。$P = 0$ 时曲线是 $\cos qa$，没有能隙。增大 $P$，注意能隙在 $qa = \pi, 2\pi, 3\pi$——区边界——处打开、变宽，而能带向孤立势阱的能级 $qa = n\pi$ 收拢。强势垒给出窄能带：这正是通往下一节的桥。
:::

::: quiz
近自由电子模型中，能量能隙在 $\mathbf k$ 空间的什么位置打开？
- [ ] 在 $\mathbf k = 0$ 处，那里电子最慢。
- [x] 在布里渊区面上，那里 $\abs{\mathbf k} = \abs{\mathbf k - \mathbf G}$，电子波满足布拉格条件。
- [ ] 在费米面上，无论它位于何处。
- [ ] 在整个区内均匀地，相当于每个能量都移动 $U_0$。
::: solution
势把 $\mathbf k$ 与 $\mathbf k - \mathbf G$ 耦合起来，而只有两个自由粒子能量相等处——垂直平分 $\mathbf G$ 的平面，即一个区面——耦合才起作用。那也正是电子波被布拉格反射之处。平均势 $U_0$ 平等地移动所有能量，不打开能隙。能隙由格子决定，不由费米面决定；尽管两者重合时后果十分重大。
:::
:::

## 紧束缚模型 {#tight-binding}

相反的极限从孤立原子出发。每个原子有一个束缚轨道 $\phi(\mathbf r)$，能量为 $\varepsilon_0$。把 $N$ 个原子放到格子上，轨道开始交叠；一个原子上的电子可以隧穿到近邻。在一维中，把原子轨道 $\phi_n(x) = \phi(x - na)$ 各赋予一个相位，拼成布洛赫态：

$$
\psi_k(x) = \frac{1}{\sqrt N}\sum_n e^{ikna}\,\phi_n(x).
$$ {#eq-lcao}

它满足 $\psi_k(x + a) = e^{ika}\psi_k(x)$，具有布洛赫形式。这是**原子轨道线性组合**，与化学中构造分子轨道的是同一思想，这里平移对称性定出了系数。

::: proposition 紧束缚能带 {#prop-tb}
设不同格点上的轨道彼此正交，且 $H$ 在它们之间的非零矩阵元只有 $\langle\phi_n\rvert H\lvert\phi_n\rangle = \varepsilon_0$ 与 $\langle\phi_{n\pm1}\rvert H\lvert\phi_n\rangle = -t$（$t > 0$）。则 [[#eq-lcao]] 是精确本征态，能量为

$$
E(k) = \varepsilon_0 - 2t\cos ka.
$$ {#eq-tb}

能带宽度为 $4t$，从 $k = 0$ 处的 $\varepsilon_0 - 2t$ 到 $k = \pm\pi/a$ 处的 $\varepsilon_0 + 2t$。
:::

::: proof
把 $H$ 作用于 $\phi_n$ 并用上述假设——它说的是在轨道基下 $H$ 的对角元为 $\varepsilon_0$，连接近邻的非对角元为 $-t$：$H\phi_n = \varepsilon_0\phi_n - t(\phi_{n+1} + \phi_{n-1})$。于是

$$
H\psi_k = \frac{1}{\sqrt N}\sum_n e^{ikna}\bigl[\varepsilon_0\phi_n - t\phi_{n+1} - t\phi_{n-1}\bigr].
$$

把第二、三项的求和指标平移（$n+1\to n$，$n-1\to n$）：$\phi_n$ 的系数成为 $\varepsilon_0e^{ikna} - te^{ik(n-1)a} - te^{ik(n+1)a} = e^{ikna}(\varepsilon_0 - 2t\cos ka)$。所以 $H\psi_k = (\varepsilon_0 - 2t\cos ka)\psi_k$。$N$ 个原子成环的周期性边界条件使指标平移严格成立。
:::

跳跃参数 $t$ 是一个交叠积分。它随原子间距指数衰减——轨道的尾部正是如此——能带宽度也随之衰减。深层核心能级的轨道很小，形成的能带窄到实际上仍是原子能级；外层价轨道则形成几电子伏宽的能带。每个原子轨道给出一条含 $N$ 个态的能带（计自旋再乘二）。三维简单立方格子、只计近邻跳跃时，同样的计算给出

$$
E(\mathbf k) = \varepsilon_0 - 2t\bigl(\cos k_xa + \cos k_ya + \cos k_za\bigr),
$$ {#eq-tb3d}

一条宽 $12t$ 的能带。

::: intuition 两幅图像，一条能带
近自由电子模型说：从一条连续的抛物线出发，在区边界处切出能隙。紧束缚模型说：从分立的原子能级出发，把每条展宽成一条能带。克罗尼希–潘尼的图像随 $P$ 增大在两者之间过渡。真实固体处于两者之间的某处，而两幅图像在关键的定性事实上是一致的：每条能带含 $2N$ 个态，带之间有隙，区边界附近能带平坦，带的极值附近呈抛物线。化学家的版本——轨道以及成键与反键组合——见化学图谱（[固体电子结构](/learn/chemistry/lesson.php?c=materials-chemistry&l=electronic-structure-solids)）。
:::

## 有效质量与空穴 {#effective-mass}

紧束缚能带底部附近，$\cos ka \approx 1 - \frac12(ka)^2$，故

$$
E(k) \approx \varepsilon_0 - 2t + ta^2k^2.
$$

这是自由粒子的抛物线 $\hbar^2k^2/2m^*$，只是质量不同。任何能带极小值附近都是如此：$E(k)$ 的泰勒展开以二次项开头。

::: definition 有效质量 {#def-effective-mass}
一维情形在能带的极值点 $\mathbf k_0$ 处，三维情形沿曲率的主轴方向，**有效质量**为

$$
\frac{1}{m^*} = \frac{1}{\hbar^2}\,\frac{\dd^2E}{\dd k^2}\bigg\rvert_{k_0}.
$$ {#eq-mstar}

在 $k_0$ 附近，$E(k)\approx E(k_0) + \hbar^2(k - k_0)^2/2m^*$。
:::

有效质量之所以重要，在于布洛赫电子对力的响应方式。在弱外力 $\mathbf F$（如 $-e\mathbf E$）作用下，晶体动量按

$$
\hbar\deriv{\mathbf k}{t} = \mathbf F,
$$ {#eq-semiclassical}

变化，这就是半经典运动方程，其推导（追踪一个波包）见 Ashcroft 与 Mermin 第 12 章。在一维把它与 [[#eq-band-velocity]] 结合：$\dd v/\dd t = (1/\hbar)(\dd^2E/\dd k^2)(\dd k/\dd t) = F/m^*$。电子的加速度如同质量为 $m^*$ 的自由粒子。格子施加的巨大内力全部被吸收进能带的形状之中；显式出现的只有外力。这就是为什么把 $m$ 换成 $m^*$ 之后，自由电子模型对能带近于抛物线的金属就能工作。

::: example 紧束缚能带中的有效质量 {#ex-tb-mass}
紧束缚能带 $t = 1.00\,\mathrm{eV}$，$a = 3.00\,\text{Å}$。以自由电子质量为单位求带底的有效质量，并求带内的最大速度。
::: solution
对 [[#eq-tb]] 求两次导数：$\dd^2E/\dd k^2 = 2ta^2\cos ka$，在 $k = 0$ 处等于 $2ta^2$。由 [[#eq-mstar]]，$m^* = \hbar^2/(2ta^2)$。除以 $m$，

$$
\frac{m^*}{m} = \frac{\hbar^2/2m}{ta^2} = \frac{3.810\,\mathrm{eV\,\text{Å}^2}}{(1.00\,\mathrm{eV})(9.00\,\text{Å}^2)} = 0.423.
$$

电子比自由的还轻：宽能带意味着容易跳跃。带速度为 $v = (1/\hbar)\,\dd E/\dd k = (2ta/\hbar)\sin ka$，在 $ka = \pi/2$ 处最大：

$$
v_\mathrm{max} = \frac{2ta}{\hbar} = \frac{2(1.602\times10^{-19})(3.00\times10^{-10})}{1.05457\times10^{-34}}\,\mathrm{m/s} = 9.1\times10^5\,\mathrm{m/s}.
$$

量级与 [[condensed-matter/free-electrons]] 中的费米速度相符。在带顶 $k = \pi/a$ 处，二阶导数为 $-2ta^2$，有效质量为 $-0.423\,m$：负的。
:::
:::

::: widget plot
f: -2*cos(x); -2 + x^2; 2 - (abs(x) - pi)^2
x: -pi, pi
y: -2.5, 2.5
piticks: true
labels: 能带 E(k); 底部抛物线; 顶部倒抛物线
caption: 紧束缚能带 $E = -2t\cos ka$，取单位 $t = a = 1$，并画出在带底定义有效质量 $m^* = \hbar^2/2ta^2$ 的抛物线 $-2 + k^2$，以及在带顶定义负质量的倒抛物线。沿能带从 $k = 0$ 走到 $k = \pi$：斜率——即速度——先升后降，到区边界回到零。被电场持续推动的电子沿这条曲线运动，先加速、后减速、再折返：这就是布洛赫振荡。
:::

带顶附近有效质量为负，意味着那里的电子沿外力*反方向*加速。被恒定电场持续推动的电子由 [[#eq-semiclassical]] 以恒定速率穿过布里渊区，到达边界，从另一侧重新出现（由 [[#cor-periodic-k]]，那是同一个态），如此反复，于是它的速度振荡起来。这就是**布洛赫振荡**。能否看到它，是个时间尺度的问题。

::: example 为什么导线不振荡 {#ex-bloch-osc}
晶格常数 $a = 3.00\,\text{Å}$ 的一维能带中的电子感受电场 $E = 1.00\times10^7\,\mathrm{V/m}$，远非金属导线所能承受。求布洛赫周期，并与铜常温下的弛豫时间 $\tau = 2.5\times10^{-14}\,\mathrm s$ 比较。
::: solution
由 [[#eq-semiclassical]]，$\abs{\dd k/\dd t} = eE/\hbar$。一次完整振荡让电子走过整个布里渊区，$k$ 上的距离为 $2\pi/a$，故

$$
T_B = \frac{2\pi/a}{eE/\hbar} = \frac{h}{eEa} = \frac{6.62607\times10^{-34}}{(1.60218\times10^{-19})(1.00\times10^{7})(3.00\times10^{-10})}\,\mathrm s = 1.38\times10^{-12}\,\mathrm s.
$$

这是 $\tau$ 的 $55$ 倍。电子远未到达区边界就已被散射，所以它一生只探索出发点附近能带的一小块区域，费米球只是被平移，于是得到欧姆定律。普通导线中场只有每米几伏，这个比值要糟一百万倍。布洛赫振荡只在刻意把不等式反转的系统里被观察到：周期为 $10\,\mathrm{nm}$ 的半导体超晶格，以及光晶格中的冷原子——后者根本没有杂质和声子。
:::
:::

### 空穴

考虑一条除一个空态 $\mathbf k_e$ 外完全填满的能带。满带不载流：每个 $\mathbf k$ 都有一个 $-\mathbf k$ 与之配对，速度相反，因为时间反演对称性给出 $E(-\mathbf k) = E(\mathbf k)$。所以近满带的电流就是缺失的那个电子所会携带的电流的负值：

$$
\mathbf j = -e\sum_{\text{占据}}\mathbf v(\mathbf k) = -e\Bigl[\sum_\text{全部}\mathbf v - \mathbf v(\mathbf k_e)\Bigr] = +e\,\mathbf v(\mathbf k_e).
$$

能带的表现如同一个电荷为 $+e$、以空态速度运动的粒子：一个**空穴**。空态聚集在带顶附近，那里 $m^*$ 为负，而空穴对力的响应是电荷除以质量，其效果就是一个带正质量 $\abs{m^*}$ 的正电荷。能带论就是这样解释了德鲁德模型解释不了的铍、镁、铝的正霍尔系数，这也正是 [[condensed-matter/semiconductors]] 的语言。

::: warning 有效质量是能带中一个点的性质
有效质量不是电子的属性，也不是一种材料对应一个数。它由带极值处的曲率定义，可以为负，可以依赖方向（硅导带底极小值的 $m^*_\parallel = 0.92\,m$、$m^*_\perp = 0.19\,m$），而在极值之外 [[#eq-mstar]] 还随 $\mathbf k$ 变化。另一种常见错误是把晶体动量当作动量：在区边界被布拉格反射的电子把 $\hbar\mathbf k$ 改变 $\hbar\mathbf G$，而反冲动量由晶体接收。
:::

::: quiz
一条能带完全填满，只在靠近带顶处有几个空态。哪些说法正确？
- [x] 能带的电流就是少数几个正载流子的电流，它们以空态的速度运动。
- [ ] 能带几乎填满，所以不载流。
- [x] 这些载流子对场的响应如同带正质量的正电荷。
- [ ] 这些载流子是正电子。
::: solution
满带不载流，所以近满带携带的是 $+e$ 乘缺失电子的速度，这就是空穴图像。带顶附近电子的有效质量为负；电荷 $+e$ 配质量 $+\abs{m^*}$ 与电荷 $-e$ 配质量 $-\abs{m^*}$ 给出同样的加速度，所以空穴表现得像普通的正粒子。它们不是正电子：它们是对剩余电子的集体描述。
:::
:::

## 金属、绝缘体与半导体 {#metals-insulators}

现在一切都归结为计数。

::: theorem 能带中的态数 {#thm-band-count}
玻恩–冯·卡门边界条件下含 $N$ 个原胞的晶体，每条能带恰含 $N$ 个布洛赫波矢，计入自旋可容纳 $2N$ 个电子。
:::

::: proof
由 [[#thm-bloch]] 的证明，允许的波矢为 $\mathbf k = \sum_j(m_j/N_j)\mathbf b_j$，$m_j$ 为整数。由 [[#cor-periodic-k]]，相差一个倒格矢的波矢标记同一组态，所以可把每个 $m_j$ 限制在 $0\le m_j < N_j$。这给出 $N_1N_2N_3 = N$ 个不同波矢。每个 $\mathbf k$、每个能带索引 $n$ 对应一个空间态，每个空间态容纳两个自旋相反的电子。
:::

现在把价电子按能量填入能带。若电子恰好填满若干条能带而其余全空，带间有隙，就完全无法对态作微小的改变：任何改变都要把一个电子抬过能隙。加上电场无法产生电流，固体是**绝缘体**。若某条能带部分填充，占据态之上有紧邻的空态，费米面位于带内，电场可以移动分布，固体就是**金属**。

每条能带容纳 $2N$ 个电子，所以每个原胞有*奇数*个价电子的晶体必有部分填充的能带，必是金属：每个原子一个电子、排在 bcc 格子上的碱金属，以及铜、银、金等贵金属。每个原胞*偶数*个价电子可能是绝缘体，但不必然：三维中能带可以在能量上重叠，一条带顶在布里渊区某处高于下一条带底，于是两条都部分填充。二价金属铍、镁、钙、锌就因此才是金属，带有电子和空穴的小口袋。金刚石每个原胞两个碳原子、八个价电子、四条完全填满的能带，与空带之间隔着 $5.5\,\mathrm{eV}$ 的能隙：绝缘体。硅情形相同，能隙为 $1.12\,\mathrm{eV}$。能隙小到常温下就有若干电子被热激发越过它，这个能隙使硅成为**半导体**。

::: example 钠的费米球在区内吗 {#ex-na-sphere}
钠是 bcc，$a = 4.29\,\text{Å}$，每个原子一个电子。把自由电子的 $k_F$ 与布里渊区中心到最近区面的距离作比较。
::: solution
惯用立方含两个原子，故 $n = 2/a^3$，$k_F = (3\pi^2\cdot2/a^3)^{1/3} = (6\pi^2)^{1/3}/a = 3.898/a$。bcc 的倒格子是 fcc（[[condensed-matter/crystals]] 习题 4），其最短向量是 $\frac{2\pi}{a}(1,1,0)$，长度 $2\sqrt2\pi/a$。最近的区面垂直平分它，距离为 $\sqrt2\pi/a = 4.443/a$。比值为

$$
\frac{k_F}{\sqrt2\pi/a} = \frac{(6\pi^2)^{1/3}}{\sqrt2\,\pi} = 0.877,
$$

与 $a$ 无关。一价 bcc 金属的费米球避开了打开能隙的区面，所以费米面几乎保持球形。这就是 [[condensed-matter/free-electrons]] 的自由电子模型对钠和钾工作得那么好的原因。取 $a = 4.29\,\text{Å}$，得 $k_F = 9.09\times10^9\,\mathrm{m^{-1}}$，$E_F = 3.14\,\mathrm{eV}$。一价 fcc 金属对应的比值——到六角面——为 $0.903$；铜的费米面被拉出去碰到那些面，形成"颈"，1957 年由皮帕德（Pippard）在德哈斯–范阿尔芬实验中看到。
:::
:::

::: application 能带结构在实际中
真实的能带结构通过自洽求解周期势中的薛定谔方程算出，最常用的工具是密度泛函理论；也可以由角分辨光电子能谱直接测量——用光把电子打出来并记录其能量与动量。算出的能带结构能回答：一种新化合物是不是金属、能隙多大、能隙是直接（高效吸收光，如砷化镓）还是间接（如硅）、它的载流子有效质量是多少。单电子图像在 $d$ 带或 $f$ 带很窄、排斥很强的材料中失效：氧化镍每个原胞有奇数个电子，按 [[#thm-band-count]] 应是金属，却是透明的绝缘体，一个**莫特绝缘体**。
:::

::: history 能带与能隙
费利克斯·布洛赫（Felix Bloch）1928 年在莱比锡师从维尔纳·海森堡（Werner Heisenberg）的博士论文中证明了他的定理，其目的正是解释金属中电子为何有如此长的平均自由程。鲁道夫·佩尔斯（Rudolf Peierls）1929 年指出近满带的行为如同含有正电荷载流子，解释了反常霍尔效应；莱昂·布里渊（Léon Brillouin）1930 年引入了以他名字命名的布里渊区。拉尔夫·克罗尼希（Ralph Kronig）与威廉·潘尼（William Penney）1931 年发表了他们的可精确求解模型。同年，艾伦·威尔逊（Alan Wilson）运用海森堡与布洛赫的思想，给出了金属与绝缘体的能带论区分，其中包括半导体是能隙很小的绝缘体这一思想。1937 年，扬·亨德里克·德博尔（Jan Hendrik de Boer）与埃弗特·费韦（Evert Verwey）指出氧化镍不符合这一图景，内维尔·莫特（Nevill Mott）与鲁道夫·佩尔斯（Rudolf Peierls）提出电子之间的排斥是其原因，由此开辟了强关联电子这一课题。
:::

## 后续内容 {#leads}

能带论是此后固体物理全部内容的语言。[[condensed-matter/semiconductors]] 取一条满的价带、一条空的导带和大约一个电子伏的能隙，加入带有效质量的电子与空穴，建立起 p–n 结。在 [[condensed-matter/magnetism-superconductivity]] 中，金属的能带图像是交换相互作用与电子配对赖以活动的背景。[[#thm-nfe-gap]] 背后的两能级排斥就是 [[quantum-2/stationary-perturbation]] 的简并微扰论，而 $\mathbf k$ 的周期性对光子晶体中的光子、对光晶格中的原子会再次出现。

::: summary
- 布洛赫定理：周期势中的本征态为 $e^{i\mathbf k\cdot\mathbf r}u_{n\mathbf k}(\mathbf r)$，$u$ 是周期函数；$\mathbf k$ 定义在模 $\mathbf G$ 的意义下，所以能带 $E_n(\mathbf k)$ 住在第一布里渊区里。
- 完全周期的势不散射布洛赫电子；电阻来自杂质与声子。
- 近自由电子：弱势恰在区面上打开 $2\abs{U_\mathbf G}$ 的能隙，那里电子波被布拉格反射。
- 紧束缚：一个原子能级展宽成宽 $4t$ 的能带 $\varepsilon_0 - 2t\cos ka$，宽度由近邻之间的交叠决定。
- 有效质量 $\hbar^2/(\dd^2E/\dd k^2)$ 通过 $\hbar\dot{\mathbf k} = \mathbf F$ 决定对外力的响应；带顶附近它为负，几乎全满的能带表现得像正的空穴。
- 每条能带容纳 $2N$ 个电子：满带加能隙构成绝缘体，部分填充的能带构成金属；单电子图像下，每原胞奇数个电子保证是金属。
:::

## 习题 {#exercises}

::: exercise 三维能带宽度 {level=1 check="12"}
对简单立方的紧束缚能带 [[#eq-tb3d]]，以 $t$ 为单位求能带宽度。
::: solution
极小值在 $\mathbf k = 0$，每个余弦都是 $1$：$E = \varepsilon_0 - 6t$。极大值在区角点 $\frac{\pi}{a}(1,1,1)$，每个余弦都是 $-1$：$E = \varepsilon_0 + 6t$。宽度为 $12t$，是一维值的三倍，因为每个原子有六个近邻而不是两个。一般地，只计近邻的能带宽度为 $2zt$，$z$ 为近邻数。
:::
:::

::: exercise 区边界处的能量 {level=1 check="4.18"}
一维晶体 $a = 3.00\,\text{Å}$，求区边界 $k = \pi/a$ 处的自由电子能量，以电子伏为单位。
::: solution
$\varepsilon = (\hbar^2/2m)(\pi/a)^2 = 3.810\times(3.1416/3.00)^2\,\mathrm{eV} = 3.810\times1.0966\,\mathrm{eV} = 4.18\,\mathrm{eV}$，如 [[#ex-nfe-gap]]。有了 $\hbar^2/2m = 3.810\,\mathrm{eV\,\text{Å}^2}$，波长为几埃的电子，其能量就是几电子伏，这正是固体的天然能量尺度。
:::
:::

::: exercise 超晶格中的布洛赫振荡 {level=1 check="0.414"}
半导体超晶格周期 $d = 10.0\,\mathrm{nm}$，沿其方向加 $1.00\times10^6\,\mathrm{V/m}$ 的电场。以皮秒为单位求布洛赫振荡周期 $h/(eEd)$。
::: solution
$$
T_B = \frac{h}{eEd} = \frac{6.62607\times10^{-34}}{(1.60218\times10^{-19})(1.00\times10^6)(1.00\times10^{-8})}\,\mathrm s = 4.14\times10^{-13}\,\mathrm s = 0.414\,\mathrm{ps}.
$$

超晶格周期是晶格常数的三十倍，与同场下的块材相比，$T_B$ 缩短了同样的倍数。再加上高质量材料中电子两次碰撞之间可以飞行皮秒量级，振荡由此变得可观测：1992 年费尔德曼（Feldmann）等首次通过振荡发射的太赫兹辐射看到了它。
:::
:::

::: exercise 更重的紧束缚质量 {level=2 check="0.476"}
一维紧束缚能带 $t = 0.50\,\mathrm{eV}$，$a = 4.00\,\text{Å}$，求带底的 $m^*/m$。
::: solution
由 [[#ex-tb-mass]]，$m^*/m = (\hbar^2/2m)/(ta^2) = 3.810/(0.50\times16.0) = 0.476$。仅把 $t$ 减半就使质量翻倍；间距变大同理。交叠差的轨道给出窄能带、重的载流子；在 $f$ 电子"重费米子"化合物这一极端，实测有效质量达到几百个 $m$。
:::
:::

::: exercise 钠的费米球 {level=2 check="0.877"}
证明任何一价 bcc 金属的 $k_F$ 除以到最近布里渊区面的距离是一个纯数，并求其值。
::: solution
如 [[#ex-na-sphere]]，$k_F = (6\pi^2)^{1/3}/a$，最近的区面在 $\sqrt2\pi/a$。比值 $(6\pi^2)^{1/3}/(\sqrt2\pi) = 3.8978/4.4429 = 0.877$ 不依赖 $a$，因为两个长度都按 $1/a$ 伸缩，而每个原胞的电子数是固定的。自由电子球约占区体积的 $50\%$：每条能带容纳两个电子时，每原子一个电子理当如此。
:::
:::

::: exercise 金属还是绝缘体 {level=2}
用 [[#thm-band-count]] 判断单电子能带图像对下列物质给出什么预言，并与实验比较：(a) 钾（bcc，每个原胞一个原子，一个价电子）；(b) 锗（金刚石结构，每个原胞两个原子，各四个价电子）；(c) 钙（fcc，每个原胞一个原子，两个价电子）。
::: solution
(a) 每个原胞一个电子，一条能带半满，所以钾必是金属，事实如此。(b) 每个原胞八个电子可以填满四条带；能带计算表明第四条带之上有一个能隙，常温下为 $0.66\,\mathrm{eV}$，所以锗是半导体。(c) 每个原胞两个电子本可填满一条带，但三维中钙的第一、二条能带在能量上重叠，于是两条都部分填充，钙是金属。计数对偶数个电子允许绝缘体，却从不保证绝缘体。
:::
:::

::: exercise E(k) = E(−k) 与边界处的平坦能带 {level=3}
设一维能带满足 $E(k) = E(-k)$（时间反演对称的推论），证明在 $E$ 于 $k = \pi/a$ 处可导的一切情形下 $\dd E/\dd k = 0$。
::: solution
由 [[#cor-periodic-k]]，$E(k) = E(k - 2\pi/a)$。结合 $E(k) = E(-k)$，得 $E(\pi/a + q) = E(-\pi/a - q) = E(-\pi/a - q + 2\pi/a) = E(\pi/a - q)$。所以 $E$ 关于区边界是 $q$ 的偶函数。在 $q = 0$ 处求导，$E'(\pi/a) = -E'(\pi/a)$，故 $E'(\pi/a) = 0$。群速度（[[#eq-band-velocity]]）在那里为零：区边界处的布洛赫态是驻波，正如近自由图像所示。同样的论证适用于 $k = 0$。
:::
:::

::: exercise 补齐克罗尼希–潘尼推导 {#exr-kp level=3}
从 [[#prop-kp]] 证明中的两个方程出发，导出 [[#eq-kp]]。
::: hint
把方程写成 $A(1 - e^{i(q-k)a}) + B(1 - e^{-i(q+k)a}) = 0$ 以及一个类似的方程，然后展开行列式并合并 $\cos$ 项。
:::
::: solution
令 $\beta = 2m\alpha/\hbar^2$。连续性给出 $A(1 - e^{i(q-k)a}) + B(1 - e^{-i(q+k)a}) = 0$。跃变条件给出 $A\bigl[iq(1 - e^{i(q-k)a}) - \beta\bigr] + B\bigl[-iq(1 - e^{-i(q+k)a}) - \beta\bigr] = 0$。记 $X = 1 - e^{i(q-k)a}$、$Y = 1 - e^{-i(q+k)a}$。行列式条件是 $X(-iqY - \beta) - Y(iqX - \beta) = 0$，即 $-2iqXY = \beta(X - Y)$。现在

$$
XY = 1 - e^{i(q-k)a} - e^{-i(q+k)a} + e^{-2ika} = e^{-ika}\bigl(2\cos ka - 2\cos qa\bigr),
$$

且 $X - Y = e^{-i(q+k)a} - e^{i(q-k)a} = -2ie^{-ika}\sin qa$。代入得 $-2iq\cdot2e^{-ika}(\cos ka - \cos qa) = -2i\beta e^{-ika}\sin qa$，所以 $\cos ka - \cos qa = (\beta/2q)\sin qa = (m\alpha/\hbar^2q)\sin qa$。以 $P = m\alpha a/\hbar^2$，右端即 $P\sin(qa)/(qa)$，正是 [[#eq-kp]]。
:::
:::

::: exercise 能隙附近两条能带的速度 {level=3}
在一维 $k = \pi/a$ 附近用 [[#eq-nfe]]，写 $k = \pi/a + q$，$\abs q\ll\pi/a$，证明 $E_\pm \approx \varepsilon_{\pi/a} \pm\abs{U_G} + \hbar^2q^2/2m^*_\pm$，其中 $m/m^*_\pm = 1 \pm 2\varepsilon_{\pi/a}/\abs{U_G}$。
::: solution
取 $G = 2\pi/a$，$\varepsilon_k = (\hbar^2/2m)(\pi/a + q)^2$，$\varepsilon_{k-G} = (\hbar^2/2m)(\pi/a - q)^2$。两者平均为 $\varepsilon_{\pi/a} + \hbar^2q^2/2m$，半差为 $(\hbar^2/2m)(2\pi q/a) = 2\sqrt{\varepsilon_{\pi/a}\,\hbar^2q^2/2m}$；记 $\delta = \hbar^2q^2/2m$，则半差的平方为 $4\varepsilon_{\pi/a}\delta$。于是

$$
E_\pm = \varepsilon_{\pi/a} + \delta \pm\sqrt{\abs{U_G}^2 + 4\varepsilon_{\pi/a}\delta} \approx \varepsilon_{\pi/a} \pm\abs{U_G} + \delta\Bigl(1 \pm\frac{2\varepsilon_{\pi/a}}{\abs{U_G}}\Bigr),
$$

其中用了 $\sqrt{U^2 + x}\approx U + x/2U$。因为 $\delta = \hbar^2q^2/2m$，系数给出 $m/m^*_\pm = 1 \pm 2\varepsilon_{\pi/a}/\abs{U_G}$。能隙小时质量也小：上带有很轻的正质量，下带有很轻的负质量。这就是窄带隙半导体如锑化铟的载流子极轻的原因。
:::
:::
