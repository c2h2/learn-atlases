一台安放在安静地下室里的地震仪，把一次地震记录成两次分明的抖动。第一阵到达，地面恢复平静，几秒之后第二阵通常更剧烈的摇晃开始。延迟随到震中的距离每百公里增加约八秒；凭三个台站，地震学家能在几分钟内定位震中。这两阵抖动，就是固体能够承载的两类弹性波：一列压缩波和一列剪切波，波速不同。恰有两类、速度各是多少，都由 [[continuum/stress-strain]] 的应力张量与应变张量之间的一条线性定律决定。

本章对均匀各向同性固体写出这一定律，导出工程师测得的四个模量——杨氏模量、泊松比、剪切模量与体积模量——之间的关系，并从能量出发说明泊松比为什么介于 $-1$ 与 $\frac12$ 之间。把胡克（Hooke）定律代入柯西（Cauchy）运动方程得到纳维-柯西（Navier–Cauchy）方程，它的平面波解就是 P 波与 S 波。最后以两个经典的结构问题——梁的弯曲与轴的扭转——作为应用简要收尾。

沿用 [[continuum/stress-strain]] 的记号：应力 $\sigma_{ij}$，小应变 $\varepsilon_{ij} = \frac12(\partial_iu_j + \partial_ju_i)$，重复指标求和，以及柯西方程 $\rho\,\ddot u_i = \partial_j\sigma_{ij} + f_i$。应变都是小的，金属和岩石在屈服点以下正是如此。

## 各向同性固体的胡克定律 {#hooke}

只要变形足够小，且无应变状态不受应力，应力与应变之间任何光滑关系都是线性的：$\sigma_{ij} = C_{ijkl}\varepsilon_{kl}$。**弹性张量** $C_{ijkl}$ 有 $81$ 个分量；$\boldsymbol\sigma$ 与 $\boldsymbol\varepsilon$ 的对称性以及能量的存在，把对称性最差的晶体也砍到 $21$ 个。多数工程材料——多晶金属、玻璃、岩石、橡胶——在远大于晶粒的尺度上是**各向同性**的：没有哪个方向特殊，所以转动应变只是把应力转动一下。于是只留下两个常数。

::: theorem 各向同性固体的胡克定律 {#thm-hooke}
设应力是应变的线性函数，$\boldsymbol\sigma = \mathcal C(\boldsymbol\varepsilon)$，且材料各向同性：对每个正交矩阵 $R$ 有 $\mathcal C(R\boldsymbol\varepsilon R\T) = R\,\mathcal C(\boldsymbol\varepsilon)R\T$。则存在常数 $\lambda$ 与 $\mu$，称为**拉梅（Lamé）系数**，使得

$$
\sigma_{ij} = \lambda\,\varepsilon_{kk}\,\delta_{ij} + 2\mu\,\varepsilon_{ij}.
$$ {#eq-hooke}
:::

::: proof
在给定的应变的主轴坐标系中计算，此时 $\boldsymbol\varepsilon = \diag(\varepsilon_1, \varepsilon_2, \varepsilon_3)$。取 $R = \diag(-1, 1, 1)$，即对平面 $x_1 = 0$ 的反射。则 $R\boldsymbol\varepsilon R\T = \boldsymbol\varepsilon$，所以各向同性给出 $\boldsymbol\sigma = R\boldsymbol\sigma R\T$。但 $(R\boldsymbol\sigma R\T)_{12} = -\sigma_{12}$、$(R\boldsymbol\sigma R\T)_{13} = -\sigma_{13}$，故 $\sigma_{12} = \sigma_{13} = 0$。对 $x_2 = 0$ 的反射给出 $\sigma_{23} = 0$。于是应变的主方向也是应力的主方向。

由线性，在此坐标系中每个主应力都是主应变的线性组合：$\sigma_1 = a\varepsilon_1 + b\varepsilon_2 + b'\varepsilon_3$，$\sigma_2, \sigma_3$ 类似。绕 $x_1$ 转 $90^\circ$ 交换轴 $2$ 与 $3$ 而不动轴 $1$；各向同性于是迫使 $b = b'$。置换三个轴的转动说明同一对 $a$ 与 $b$ 适用于一切主应力。所以

$$
\sigma_k = a\,\varepsilon_k + b(\varepsilon_1 + \varepsilon_2 + \varepsilon_3 - \varepsilon_k) = (a - b)\varepsilon_k + b\,\varepsilon_{ll}.
$$

令 $2\mu = a - b$、$\lambda = b$。于是在主轴系中 $\boldsymbol\sigma = \lambda\,(\tr\boldsymbol\varepsilon)I + 2\mu\boldsymbol\varepsilon$。这个矩阵等式两端在转动下按同样方式变换，所以它在每个坐标系中都成立，这就是 [[#eq-hooke]]。
:::

这一定律干净地分成体积部分与形状部分。写 $\varepsilon_{ij} = \frac13\varepsilon_{kk}\delta_{ij} + e_{ij}$，其中 $e_{ij}$ 迹为零。则 [[#eq-hooke]] 化为

$$
\sigma_{ij} = K\,\varepsilon_{kk}\,\delta_{ij} + 2\mu\,e_{ij}, \qquad K = \lambda + \tfrac23\mu .
$$ {#eq-hooke-split}

平均压强 $p = -\frac13\sigma_{kk} = -K\varepsilon_{kk}$ 只响应体积的改变，经由**体积模量** $K$。偏应力只响应形状的改变，经由**剪切模量** $\mu$，工程师把它记作 $G$。

## 四个模量 {#moduli}

没有人直接测量 $\lambda$。实验室里的试验是拉伸、扭转和带围压的压缩，每种试验各定义一个模量。

::: definition 工程模量 {#def-moduli}
在**单轴拉伸**中，$\sigma_{xx} = \sigma$、其余应力全为零，**杨氏模量** $E$ 与**泊松比** $\nu$ 由 $\varepsilon_{xx} = \sigma/E$ 和 $\varepsilon_{yy} = \varepsilon_{zz} = -\nu\,\varepsilon_{xx}$ 定义。在**简单剪切**中，$\sigma_{xy} = \tau$，**剪切模量**为 $G = \tau/(2\varepsilon_{xy})$。在**静水压强**下，$\sigma_{ij} = -p\,\delta_{ij}$，**体积模量**为 $K = -p/(\Delta V/V)$。
:::

::: theorem 模量之间的关系 {#thm-moduli}
对服从 [[#eq-hooke]] 的各向同性固体，

$$
G = \mu, \qquad K = \lambda + \tfrac23\mu, \qquad E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}, \qquad \nu = \frac{\lambda}{2(\lambda + \mu)},
$$

反过来说

$$
G = \frac{E}{2(1 + \nu)}, \qquad K = \frac{E}{3(1 - 2\nu)}, \qquad \lambda = \frac{E\nu}{(1 + \nu)(1 - 2\nu)} .
$$ {#eq-moduli}

胡克定律的反演是

$$
\varepsilon_{ij} = \frac{1 + \nu}{E}\,\sigma_{ij} - \frac{\nu}{E}\,\sigma_{kk}\,\delta_{ij}.
$$ {#eq-hooke-inverse}
:::

::: proof
**剪切。** 只有 $\sigma_{xy} = \tau$ 非零时，[[#eq-hooke]] 给出 $\varepsilon_{kk} = 0$（$\boldsymbol\sigma$ 的迹是 $(3\lambda + 2\mu)\varepsilon_{kk}$，而它为零），于是 $\tau = 2\mu\varepsilon_{xy}$、$G = \mu$。

**体积。** 对 [[#eq-hooke]] 取迹得 $\sigma_{kk} = (3\lambda + 2\mu)\varepsilon_{kk}$。压强下 $\sigma_{kk} = -3p$ 而 $\varepsilon_{kk} = \Delta V/V$，所以 $K = \lambda + \frac23\mu$。

**反演。** 由迹得 $\varepsilon_{kk} = \sigma_{kk}/(3\lambda + 2\mu)$。回代：

$$
\varepsilon_{ij} = \frac{1}{2\mu}\Bigl(\sigma_{ij} - \frac{\lambda}{3\lambda + 2\mu}\sigma_{kk}\delta_{ij}\Bigr).
$$

**拉伸。** 只有 $\sigma_{xx} = \sigma$：$\varepsilon_{xx} = \frac{\sigma}{2\mu}\bigl(1 - \frac{\lambda}{3\lambda + 2\mu}\bigr) = \frac{\sigma(\lambda + \mu)}{\mu(3\lambda + 2\mu)}$，由此得 $E$；而 $\varepsilon_{yy} = -\frac{\lambda\sigma}{2\mu(3\lambda + 2\mu)}$，所以 $\nu = -\varepsilon_{yy}/\varepsilon_{xx} = \frac{\lambda}{2(\lambda + \mu)}$。

**反推。** 由 $E$ 与 $\nu$ 的公式，$1 + \nu = \frac{3\lambda + 2\mu}{2(\lambda + \mu)}$，故 $\frac{E}{2(1 + \nu)} = \mu$。又 $1 - 2\nu = \frac{\mu}{\lambda + \mu}$，故 $\frac{E}{3(1 - 2\nu)} = \frac{3\lambda + 2\mu}{3} = K$，而 $\lambda = K - \frac23 G$ 化简后即为上面所写的形式。最后 $\frac{1}{2\mu} = \frac{1 + \nu}{E}$ 且 $\frac{\lambda}{2\mu(3\lambda + 2\mu)} = \frac{\nu}{E}$，把反演式化为 [[#eq-hooke-inverse]]。
:::

于是两个数决定其余一切。常温下的典型数值取自标准手册表（Kaye 与 Laby；ASM），列在下面；密度一并列出，供后文使用。

| 材料 | $E$ (GPa) | $\nu$ | $G$ (GPa) | $K$ (GPa) | $\rho$ (kg/m³) |
|---|---|---|---|---|---|
| 结构钢 | $210$ | $0.29$ | $81$ | $167$ | $7850$ |
| 铝 | $70$ | $0.34$ | $26$ | $73$ | $2700$ |
| 软橡胶 | $0.002$ | $0.4998$ | $0.0007$ | $\approx 2$ | $1100$ |

橡胶这一行值得再看一眼。橡胶拉伸比压缩容易一千倍：它的长链分子容易舒卷，这只改变形状；而把它们排得更紧意味着把原子推近，那像在液体里一样难。由 $K \gg G$，[[#eq-moduli]] 给出 $\nu \to \frac12$、$E \to 3G$。$\nu = \frac12$ 的材料是**不可压缩**的：由 [[#eq-hooke-inverse]]，对任何应力 $\varepsilon_{kk} = \frac{1 - 2\nu}{E}\sigma_{kk} = 0$。

::: intuition 为什么模量是几十吉帕
模量是一种应力，也就是单位体积的能量。在原子间距为 $a$、结合能为 $U_0$ 的固体中，唯一可用的能量密度量级为 $U_0/a^3$。取 $U_0 \approx 1\,\mathrm{eV}$、$a \approx 0.25\,\mathrm{nm}$，得 $1.6\times10^{-19}/(2.5\times10^{-10})^3 \approx 10\,\mathrm{GPa}$；每个原子几电子伏的内聚能把它推向 $100\,\mathrm{GPa}$：正是金属与陶瓷应有的量级。橡胶落在估计之外，因为它的抗剪刚度根本不是能量性的，而是熵性的，量级为 $nk_BT$，其中 $n$ 是交联点密度——这就是橡胶与钢不同、受热反而*变硬*的原因。同一估计还说明完美晶体应在量级 $G/10$ 的剪应力下屈服。真实金属在 $G/1000$ 附近就屈服，因为位错让原子面能够一行一行地滑移；本章的弹性理论到它们开始运动为止。
:::

::: example 受载的铝丝 {#ex-wire}
一根长 $2.00\,\mathrm m$、直径 $1.00\,\mathrm{mm}$ 的铝丝竖直悬挂，下挂 $50.0\,\mathrm N$ 的载荷。用 $E = 70\,\mathrm{GPa}$、$\nu = 0.34$，求应力、伸长量和直径的减小量。忽略铝丝自重。
::: solution
横截面为 $A = \frac{\pi}{4}(1.00\times10^{-3})^2 = 7.854\times10^{-7}\,\mathrm{m^2}$，所以应力为

$$
\sigma = \frac{50.0}{7.854\times10^{-7}} = 6.37\times10^{7}\,\mathrm{Pa} = 63.7\,\mathrm{MPa},
$$

低于常见铝合金的屈服应力。轴向应变为 $\varepsilon_{xx} = \sigma/E = 6.366\times10^{7}/7.0\times10^{10} = 9.09\times10^{-4}$，伸长量为

$$
\Delta L = \varepsilon_{xx}L = 9.09\times10^{-4}\times2.00\,\mathrm m = 1.82\,\mathrm{mm}.
$$

横向应变为 $-\nu\varepsilon_{xx} = -3.09\times10^{-4}$，所以直径缩小 $3.09\times10^{-4}\times1.00\,\mathrm{mm} = 0.31\,\mu\mathrm m$。体积改变 $\varepsilon_{kk} = (1 - 2\nu)\varepsilon_{xx} = 0.32\times9.09\times10^{-4} = 2.9\times10^{-4}$：因为 $\nu < \frac12$，拉伸金属丝会使其体积略微增大。
:::
:::

::: warning 杨氏模量不是每种试验的刚度
$E$ *只有*在侧向自由收缩时才是应力与应变之比。若横向应变被禁止——粘在两块钢板之间的薄橡胶层、地壳深处的岩石、压缩波前方的固体——给定轴向应变对应的轴向应力由 $\lambda + 2\mu$ 决定，即 **P 波模量**（又称约束模量）。钢的 $\lambda + 2\mu = 275\,\mathrm{GPa}$，比 $E$ 大 $31\,\%$。橡胶约 $2\,\mathrm{GPa}$，是 $E$ 的一千倍：这就是桥梁下的橡胶支座抗剪很软、承受桥面重量时却几乎不压缩的原因。
:::

::: theorem 泊松比的界限 {#thm-bounds}
各向同性固体的应变能密度为

$$
W = \tfrac12\sigma_{ij}\varepsilon_{ij} = \mu\,e_{ij}e_{ij} + \tfrac12K(\varepsilon_{kk})^2 .
$$ {#eq-energy}

无应变状态稳定——对每个非零应变都有 $W > 0$——当且仅当 $\mu > 0$ 且 $K > 0$。等价地说，$E > 0$ 且 $-1 < \nu < \frac12$。
:::

::: proof
应变从 $0$ 缓慢加到 $\varepsilon_{ij}$ 时对单位体积做的功是 $\int\sigma_{ij}\,\dd\varepsilon_{ij}$。由于 $\sigma_{ij}$ 对 $\varepsilon$ 是线性的，其系数张量在指标对 $(ij)$ 与 $(kl)$ 互换下对称——[[#eq-hooke]] 正是如此——该积分等于 $\frac12\sigma_{ij}\varepsilon_{ij}$。由 [[#eq-hooke-split]] 及 $e_{ii} = 0$，

$$
\sigma_{ij}\varepsilon_{ij} = \bigl(K\varepsilon_{kk}\delta_{ij} + 2\mu e_{ij}\bigr)\bigl(\tfrac13\varepsilon_{ll}\delta_{ij} + e_{ij}\bigr) = K(\varepsilon_{kk})^2 + 2\mu e_{ij}e_{ij},
$$

即 $2W$。偏应力部分与迹可以独立选取。纯膨胀（$e = 0$，$\varepsilon_{kk} \neq 0$）的 $W > 0$ 当且仅当 $K > 0$；纯形状改变（$\varepsilon_{kk} = 0$，$e \neq 0$，且 $e_{ij}e_{ij} > 0$）的 $W > 0$ 当且仅当 $\mu > 0$。反过来，若两者皆正，则两项都非负，且对非零应变不可能同时为零。

由 [[#eq-moduli]]，$3K(1 - 2\nu) = E = 2G(1 + \nu)$，所以 $\nu = \frac{3K - 2G}{2(3K + G)}$。当 $K/G$ 取遍 $(0, \infty)$ 时，它从 $-1$（$K/G \to 0$）单调增到 $\frac12$（$K/G \to\infty$），且是 $K/G$ 的严格增函数。此时 $E = 2G(1 + \nu) > 0$。反过来，由 $E > 0$ 和 $-1 < \nu < \frac12$ 得 $G = E/2(1 + \nu) > 0$、$K = E/3(1 - 2\nu) > 0$。
:::

几乎所有天然材料都有 $0.2 < \nu < 0.5$。负值称为**拉胀**（auxetic），出现在一些内凹胞元的泡沫和少数晶体中：拉伸时它们反而变粗。

::: quiz
软木的泊松比接近零。这对塞进瓶口的软木塞意味着什么？
- [ ] 它完全无法被压缩。
- [x] 沿轴向压缩它时它几乎不膨胀，所以往里推时不会卡死在瓶口。
- [ ] 它的杨氏模量必须为零。
- [ ] 它的体积模量是无穷大。
::: solution
$\nu = 0$ 意味着单轴加载时横向应变为零。橡胶塞 $\nu \approx \frac12$，被推挤时向侧面鼓胀、卡住玻璃壁；软木不会。由 [[#eq-moduli]]，取 $\nu = 0$ 得 $K = E/3$、$G = E/2$，都是有限值。软木的这一特性归功于它的闭孔结构：孔壁发生屈曲，而不是向外挤。
:::
:::

## 纳维-柯西方程 {#navier}

把胡克定律代入柯西运动方程，得到关于位移的封闭方程。设 $\lambda$ 与 $\mu$ 均匀，

$$
\partial_j\sigma_{ij} = \lambda\,\partial_i(\partial_ku_k) + \mu\,\partial_j(\partial_iu_j + \partial_ju_i) = (\lambda + \mu)\,\partial_i(\nabla\cdot\mathbf u) + \mu\,\nabla^2u_i .
$$

::: theorem 纳维-柯西方程 {#thm-navier}
对小位移的均匀各向同性弹性固体，

$$
\rho\,\pdv{^2\mathbf u}{t^2} = (\lambda + \mu)\,\nabla(\nabla\cdot\mathbf u) + \mu\,\nabla^2\mathbf u + \mathbf f .
$$ {#eq-navier}
:::

向量恒等式 $\nabla^2\mathbf u = \nabla(\nabla\cdot\mathbf u) - \nabla\times(\nabla\times\mathbf u)$ 给出等价形式 $\rho\ddot{\mathbf u} = (\lambda + 2\mu)\nabla(\nabla\cdot\mathbf u) - \mu\nabla\times(\nabla\times\mathbf u) + \mathbf f$，其中已经暗示了两个波速。边界条件在固定面上规定 $\mathbf u$，在受力面或自由面上规定面力 $\sigma_{ij}n_j$；配上边界条件，静力学中的 [[#eq-navier]] 有唯一解（基尔霍夫（Kirchhoff）唯一性定理，由 $W > 0$ 即可推出）。

### 一个静力解：充压球腔

先不谈波。一个静力学问题示范 [[#eq-navier]] 怎么用。大块固体内部有一个半径 $a$ 的球腔，充以压强 $p$ 的气体；远处固体不受应力。求位移与应力。

由对称性位移是径向的，$\mathbf u = u(r)\,\hat{\mathbf r}$。这样的场是一个梯度，故 $\nabla\times\mathbf u = 0$；在 [[#eq-navier]] 的旋度-旋度形式中取 $\ddot{\mathbf u} = 0$、$\mathbf f = 0$，化为 $(\lambda + 2\mu)\nabla(\nabla\cdot\mathbf u) = 0$。于是体膨胀是常数，

$$
\nabla\cdot\mathbf u = \frac{1}{r^2}\deriv{}{r}\bigl(r^2u\bigr) = 3A, \qquad u(r) = Ar + \frac{B}{r^2}.
$$

位移在无穷远处必须为零，所以 $A = 0$。对径向场，球坐标下的应变为 $\varepsilon_{rr} = u'$、$\varepsilon_{\theta\theta} = \varepsilon_{\phi\phi} = u/r$；代入 $u = B/r^2$，它们是 $-2B/r^3$ 与 $B/r^3$，其和为零。于是胡克定律 [[#eq-hooke]] 给出

$$
\sigma_{rr} = 2\mu\varepsilon_{rr} = -\frac{4\mu B}{r^3}, \qquad \sigma_{\theta\theta} = \sigma_{\phi\phi} = \frac{2\mu B}{r^3}.
$$

腔壁的边界条件是固体受到的面力等于气体对它的推压：$\sigma_{rr}(a) = -p$。所以 $B = pa^3/4\mu$，于是

$$
u(r) = \frac{pa^3}{4\mu r^2}, \qquad \sigma_{rr} = -p\frac{a^3}{r^3}, \qquad \sigma_{\theta\theta} = \frac{p}{2}\frac{a^3}{r^3}.
$$ {#eq-cavity}

有三点值得注意。出现的只有剪切模量：腔周的固体只改形状不改体积，因为场 $B\hat{\mathbf r}/r^2$ 的散度为零。环向应力 $\sigma_{\theta\theta}$ 是*拉*应力——充压的孔洞把周围的介质拉开——在腔壁上它等于压强的一半。应力按 $r^{-3}$ 衰减，所以相距几个半径的另一个空腔几乎感觉不到它。钢中一个 $1.00\,\mathrm{cm}$ 的空腔在 $p = 100\,\mathrm{MPa}$ 下，腔壁外移 $pa/4\mu = 10^{8}\times0.0100/(4\times8.14\times10^{10}) = 3.1\,\mu\mathrm m$。火山学家使用同一解（对地面自由面作修正后，即 1958 年的茂木（Mogi）模型），从实测的地表抬升反推岩浆房内的压强变化。

### 弹性波

::: theorem P 波与 S 波 {#thm-waves}
在无体力、无界的均匀各向同性固体中，平面波 $\mathbf u = \mathbf a\,F(\mathbf n\cdot\mathbf x - ct)$——单位传播方向 $\mathbf n$、偏振 $\mathbf a \neq 0$、二阶可微且非线性的 $F$——解 [[#eq-navier]] 当且仅当以下二者之一成立：

1. $\mathbf a \parallel \mathbf n$（纵波）且 $c = c_P = \sqrt{(\lambda + 2\mu)/\rho}$，或
2. $\mathbf a \perp \mathbf n$（横波）且 $c = c_S = \sqrt{\mu/\rho}$。

此外，任何解的体膨胀 $\theta = \nabla\cdot\mathbf u$ 满足波速为 $c_P$ 的波动方程，转动 $\nabla\times\mathbf u$ 满足波速为 $c_S$ 的波动方程。
:::

::: proof
对平面波，$\partial_j u_i = a_in_jF'$，故 $\nabla\cdot\mathbf u = (\mathbf a\cdot\mathbf n)F'$、$\nabla(\nabla\cdot\mathbf u) = (\mathbf a\cdot\mathbf n)\mathbf n F''$、$\nabla^2\mathbf u = \mathbf aF''$、$\ddot{\mathbf u} = c^2\mathbf aF''$。方程 [[#eq-navier]] 化为

$$
\bigl[(\rho c^2 - \mu)\,\mathbf a - (\lambda + \mu)(\mathbf a\cdot\mathbf n)\,\mathbf n\bigr]F'' = 0 .
$$

由于 $F''$ 不恒为零，方括号为零。用 $\mathbf n$ 与其作点积：$(\rho c^2 - \lambda - 2\mu)(\mathbf a\cdot\mathbf n) = 0$。若 $\mathbf a\cdot\mathbf n \neq 0$，则 $\rho c^2 = \lambda + 2\mu$，方括号化为 $(\lambda + \mu)[\mathbf a - (\mathbf a\cdot\mathbf n)\mathbf n] = 0$；只要 $\lambda + \mu \neq 0$（只要 $\nu > -1$ 便成立，因为 $\lambda + \mu = \mu/(1 - 2\nu)$），这就意味着 $\mathbf a \parallel \mathbf n$。若 $\mathbf a\cdot\mathbf n = 0$，方括号是 $(\rho c^2 - \mu)\mathbf a = 0$，故 $\rho c^2 = \mu$。反过来，两种情形都使方括号为零。

再证一般命题：取 [[#eq-navier]]（$\mathbf f = 0$）的散度。由于 $\nabla\cdot\nabla^2\mathbf u = \nabla^2(\nabla\cdot\mathbf u)$，

$$
\rho\ddot\theta = (\lambda + \mu)\nabla^2\theta + \mu\nabla^2\theta = (\lambda + 2\mu)\nabla^2\theta .
$$

再取旋度则梯度项被消去，得 $\rho\,\partial_t^2(\nabla\times\mathbf u) = \mu\nabla^2(\nabla\times\mathbf u)$。
:::

P 波（primary，初至波）压缩并稀疏介质，像空气中的声波，使地面沿射线方向来回运动。S 波（secondary，初至波之后的第二阵）剪切介质，使地面横向于射线运动，在流体中没有对应物：$\mu = 0$ 时没有抵抗剪切的恢复力，$c_S = 0$，而 P 波速退化为 [[continuum/waves-in-fluids]] 中的声速 $\sqrt{K/\rho}$。用泊松比表示，

$$
\frac{c_P}{c_S} = \sqrt{\frac{\lambda + 2\mu}{\mu}} = \sqrt{\frac{2(1 - \nu)}{1 - 2\nu}} ,
$$ {#eq-ratio}

对 $0$ 与 $\frac12$ 之间的一切 $\nu$，它都超过 $\sqrt2$，且当 $\nu \to \frac12$ 时发散。

::: widget plot
f: sqrt(2*(1-x)/(1-2*x)); 2*(1+x)
x: -0.95, 0.49
y: 0, 8
labels: c_P/c_S; E/G
caption: [[#eq-ratio]] 的波速比 $c_P/c_S$ 与模量比 $E/G = 2(1 + \nu)$，随泊松比 $\nu$ 跑遍其允许范围。读出 $\nu = 0.25$——地壳岩石的良好平均值——处：$c_P/c_S = \sqrt3 = 1.73$。钢（$\nu = 0.29$）给出 $1.84$。向 $\nu = 0.5$ 移动，看比值陡然上冲：在橡胶或饱水软泥中，剪切波远比压缩波慢。在拉胀端，$\nu \to -1$ 时比值降向 $\sqrt{4/3} = 1.15$，但永不低于它：P 波总是快过 S 波。
:::

::: example 钢中的弹性波 {#ex-steel-waves}
对结构钢（$E = 210\,\mathrm{GPa}$、$\nu = 0.29$、$\rho = 7850\,\mathrm{kg/m^3}$）计算 $c_P$ 与 $c_S$，并与实测的超声波速约 $5.9\,\mathrm{km/s}$ 与 $3.2\,\mathrm{km/s}$ 比较。
::: solution
由 [[#eq-moduli]]，

$$
\mu = \frac{210}{2\times1.29} = 81.4\,\mathrm{GPa}, \qquad \lambda = \frac{210\times0.29}{1.29\times0.42} = 112.4\,\mathrm{GPa},
$$

所以 $\lambda + 2\mu = 275.2\,\mathrm{GPa}$。于是

$$
c_P = \sqrt{\frac{2.752\times10^{11}}{7850}} = 5.92\,\mathrm{km/s}, \qquad c_S = \sqrt{\frac{8.14\times10^{10}}{7850}} = 3.22\,\mathrm{km/s},
$$

与实测值相差约百分之一——考虑到“钢”的 $E$ 与 $\nu$ 本来就只有这样的已知精度，这也够好了。超声探伤仪倒过来用这套计算：在已知厚度的工件上测脉冲的往返时间，利用裂纹的回波。压缩脉冲沿*细*杆传播的速度又是另一回事：$\sqrt{E/\rho} = 5.17\,\mathrm{km/s}$，因为细杆的侧向自由、可以鼓胀（[[#exr-rod]] 对铝作了这一对比）。
:::
:::

::: example 由波速求花岗岩的弹性模量 {#ex-granite}
对一块密度 $2650\,\mathrm{kg/m^3}$ 的花岗岩试样做实验室测量，得 $c_P = 5.80\,\mathrm{km/s}$、$c_S = 3.30\,\mathrm{km/s}$。求它的剪切模量、泊松比、杨氏模量和体积模量。
::: solution
两个波速直接给出两个拉梅组合，依据 [[#thm-waves]]：

$$
\mu = \rho c_S^2 = 2650\times(3300)^2 = 28.9\,\mathrm{GPa}, \qquad \lambda + 2\mu = \rho c_P^2 = 2650\times(5800)^2 = 89.1\,\mathrm{GPa},
$$

所以 $\lambda = 89.1 - 57.7 = 31.4\,\mathrm{GPa}$。泊松比可由 [[#thm-moduli]] 得出，也可反解 [[#eq-ratio]]：记 $r = (c_P/c_S)^2 = 3.089$，

$$
\nu = \frac{r - 2}{2(r - 1)} = \frac{1.089}{4.178} = 0.261 .
$$

于是 $E = 2\mu(1 + \nu) = 2\times28.9\times1.261 = 72.8\,\mathrm{GPa}$，$K = \lambda + \frac23\mu = 31.4 + 19.2 = 50.7\,\mathrm{GPa}$。花岗岩抗拉的刚度与铝相仿，约为钢的三分之一。这样得到的模量称为**动态**模量。它们通常高于对同一岩石做缓慢加载试验得到的**静态**模量，因为慢速试验还会闭合那些微弱而快速的波几乎扰不动的微裂纹；两者之差本身就被用来估计裂纹密度。
:::
:::

::: quiz
地球另一面的大地震被相距 $150^\circ$ 弧的一个台站记录到。直达 S 波本应穿过外核。台站观测到什么？
- [ ] 直达 S 波，只因外核致密而延迟。
- [x] 没有穿过外核的直达 S 波；穿核到达的都是压缩波，因为液体的 $\mu = 0$。
- [ ] 只有 S 波，因为 P 波被液体吸收。
- [ ] 什么都没有，因为没有弹性波能穿过液体。
::: solution
由 [[#thm-waves]]，剪切模量为零的介质只承载纵波，$c = \sqrt{K/\rho}$。P 波能穿过液态外核（比在其上方的地幔中慢，因而发生弯折，形成 P 波影区），S 波却不能。以 S 波形式到达核边界的能量有一部分转换为 P 波、穿过核，并可能在固态内核或地幔中再转回 S 波；但穿过外核的直达剪切波是不存在的。
:::
:::

::: remark 面波与晶体
自由面支持第三类波，由瑞利（Rayleigh）于 1885 年发现，被局限在约一个波长的深度内，速度比 $c_S$ 略小——$\nu = \frac14$ 时为 $0.919\,c_S$。瑞利波（Rayleigh waves）在 S 波之后到达，因为沿面传播而非向体内扩散，随距离衰减得比体波慢，制造了地震中的大部分破坏。相反，在各向异性晶体中，每个方向有三个平面波，波速依赖于方向；仅立方晶系就需要三个弹性常数而不是两个，其波速是声学声子支在长波端的斜率。
:::

### 地震学

地球是我们可以做实验的最大弹性体。上陆壳的典型波速是 $c_P \approx 6.0\,\mathrm{km/s}$、$c_S \approx 3.5\,\mathrm{km/s}$，比值 $1.71$，与 $\nu = \frac14$ 的固体的 $\sqrt3$ 很接近。岩石被压缩，波速随深度上升：在下地幔底部，P 波约 $13.7\,\mathrm{km/s}$，S 波约 $7.3\,\mathrm{km/s}$。

::: example 确定震中 {#ex-quake}
一台地震仪记录到一次地方震：S 波在 P 波之后 $20.0\,\mathrm s$ 到达。设沿射线 $c_P = 6.00\,\mathrm{km/s}$、$c_S = 3.50\,\mathrm{km/s}$，震源有多远？
::: solution
设距离为 $d$，两个到达时刻是 $d/c_P$ 与 $d/c_S$，所以

$$
\Delta t = d\left(\frac{1}{c_S} - \frac{1}{c_P}\right), \qquad d = \frac{c_Pc_S}{c_P - c_S}\,\Delta t = \frac{6.00\times3.50}{2.50}\,\Delta t = (8.40\,\mathrm{km/s})\,\Delta t .
$$

取 $\Delta t = 20.0\,\mathrm s$，得 $d = 168\,\mathrm{km}$。这就是台站里通用的经验法则“每 S–P 时差一秒对应八公里”。一个台站给出一条可能的震中圆；三个台站定出一个点。远震的射线在更深更快的岩石中弯折，改用表列的走时曲线。
:::
:::

::: widget plot
f: x/a; x/b
x: 0, 600
y: 0, 200
sliders: a=6:4:9:0.1; b=3.5:2:5:0.1
labels: P 波到时 (s); S 波到时 (s)
caption: P 波（波速 $a$ km/s）与 S 波（波速 $b$ km/s）的到达时刻（秒）随距离（公里）的变化。两条线之间的竖直间隔就是 S–P 时差，它正比于距离增长。在初始取值下，读出 $168\,\mathrm{km}$ 处的间隔：是 $20\,\mathrm s$，正与 [[#ex-quake]] 相同。把 S 波调慢（湿沉积层中 $\nu$ 接近 $\frac12$ 便是如此），同样的时差现在对应近得多的震源——这就是震中定位离不开局部速度模型的原因。
:::

::: application 液态核
大地震的 S 波在离震中超过约 $103^\circ$ 弧长的台站收不到；P 波在约 $103^\circ$ 到 $142^\circ$ 之间微弱或缺失。奥尔德姆（Oldham, Richard）在 1906 年把这一反常解释为存在地核；古登堡（Gutenberg, Beno）在 1913 年把它的面定在约 $2900\,\mathrm{km}$ 深处；杰弗里斯（Jeffreys, Harold）在 1926 年论证它是液体，因为 [[#thm-waves]] 说 $\mu = 0$ 的介质不承载 S 波。莱曼（Lehmann, Inge）在 1936 年发现，到达影区的那些 P 波曾被一个固态内核反射。如今地震层析成像正在绘制地幔内百分之几的三维波速变化，那正是驱动板块构造的温度差异的印记。
:::

## 弯曲与扭转简述 {#beams}

两种变形支配着结构工程，两者都由胡克定律加一条几何假设得出。

**弯曲。** 一根沿 $x$ 的细长梁在 $xz$ 平面内弯曲，挠度 $w(x)$ 很小。欧拉-伯努利（Euler–Bernoulli）假设是：横截面保持平面且垂直于弯曲线。于是**中性轴**上方高度 $z$ 处的纤维的应变为 $\varepsilon_{xx} = -z\,w''(x)$，而侧向自由，故 $\sigma_{xx} = E\varepsilon_{xx} = -Ezw''$。当 $z$ 从形心量起时，截面上的合力为零，而弯矩为

$$
M = -\int_A z\,\sigma_{xx}\,\dd A = EI\,w''(x), \qquad I = \int_A z^2\,\dd A .
$$ {#eq-beam}

**截面惯性矩**（面积二次矩）$I$ 对宽 $b$、高 $h$ 的矩形是 $bh^3/12$。对高度的三次依赖，正是楼板龙骨竖着放、工字梁把材料放在离中性轴远处等原因。在 $x = 0$ 处固定、自由端 $x = L$ 受集中力 $F$ 的悬臂梁，弯矩大小为 $M(x) = F(L - x)$；对 $EIw'' = F(L - x)$ 积分两次并用 $w(0) = w'(0) = 0$，得

$$
w(x) = \frac{F x^2(3L - x)}{6EI}, \qquad w(L) = \frac{FL^3}{3EI}.
$$ {#eq-cantilever}

**扭转。** 半径 $R$、长 $L$ 的圆轴被扭矩 $T$ 转过角 $\phi$：每个横截面刚性转动，半径 $r$ 处的介质被剪切 $\gamma = r\phi/L$（工程应变，$2\varepsilon_{x\theta}$）。剪应力 $\tau = G\gamma$，扭矩为

$$
T = \int_A r\tau\,\dd A = \frac{GJ\phi}{L}, \qquad J = \int_A r^2\,\dd A = \frac{\pi R^4}{2}.
$$ {#eq-torsion}

表面处剪应力最大，$\tau_{\max} = TR/J$。库仑（Coulomb）1784 年在他的扭秤中用了这一定律，卡文迪许（Cavendish）对 $G$ 的测量依靠的正是同一个小得可怜的抗扭刚度。

::: example 钢尺作悬臂梁 {#ex-ruler}
一把宽 $25.0\,\mathrm{mm}$、厚 $1.00\,\mathrm{mm}$ 的钢尺被夹在台面上，悬出 $L = 300\,\mathrm{mm}$。在端部施加 $0.500\,\mathrm N$ 的力。求端部挠度与最大弯曲应力（$E = 210\,\mathrm{GPa}$）。
::: solution
截面惯性矩为

$$
I = \frac{bh^3}{12} = \frac{0.0250\times(1.00\times10^{-3})^3}{12} = 2.083\times10^{-12}\,\mathrm{m^4}.
$$

由 [[#eq-cantilever]]，

$$
w(L) = \frac{0.500\times(0.300)^3}{3\times2.10\times10^{11}\times2.083\times10^{-12}} = \frac{0.0135}{1.3125} = 1.03\times10^{-2}\,\mathrm m = 10.3\,\mathrm{mm}.
$$

最大弯矩在夹持处，$M = FL = 0.150\,\mathrm{N\,m}$；最大应力在表面，$z = \pm h/2$：

$$
\sigma_{\max} = \frac{M h/2}{I} = \frac{0.150\times5.00\times10^{-4}}{2.083\times10^{-12}} = 36.0\,\mathrm{MPa}.
$$

挠度是长度的 $3\,\%$，所以小斜率理论够用，应力也远低于屈服。注意像这样平放的钢尺，刚度只有竖起来放的那把尺的 $h^2/b^2 = 1/625$——不妨一试。
:::
:::

真实的梁、轴、板和压力容器，连同它们的失效判据，是机械工程图谱的[梁的挠度](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=beam-deflection)、[扭转](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=torsion)与[线弹性](/learn/mechanical/lesson.php?c=solid-mechanics&l=linear-elasticity)三课的主题，从设计者的立场展开。

::: history 从胡克到纳维
罗伯特·胡克（Robert Hooke）于 1678 年在《论恢复力》（*De Potentia Restitutiva*）中发表了他的定律，作为两年前登出的一个字谜的谜底：*ut tensio, sic vis*——有多少伸长，就有多大拉力。那说的是弹簧和金属丝，不是材料常数。托马斯·杨（Thomas Young）在 1807 年的《自然哲学讲义》（*Lectures on Natural Philosophy*）中引入了以他命名的模量，尽管那时的形式依赖于试件本身。弹性固体的一般方程由纳维在 1821 年宣读、1827 年发表的一篇纪念文章中导出，用的是只给出一个弹性常数的分子模型。柯西 1822–28 年的连续介质处理给出各向同性体的两个常数；格林（Green, George）在 1839 年从能量函数导出弹性张量，在常数数目上裁决了柯西正确。泊松在 1829 年证明弹性固体承载两种波速不同的波——比奥尔德姆在地震图上认出它们早了近八十年。
:::

## 后续内容 {#leads}

这里的一切都只到应变的线性阶；塑性、断裂以及橡胶的大应变都在其外，由机械工程图谱处理。连续介质的 P 波与 S 波是晶体点阵声学声子的长波极限，点阵的离散性与各向异性出现在 [[condensed-matter]] 中。以能量 [[#eq-energy]] 为拉格朗日密度的弹性力学变分形式，通往 [[analytical-mechanics]]；在网格上数值求解 [[#eq-navier]] 是 [[computation]] 的问题之一。下一章起，同一条柯西方程要用于流体：静止时 $\mu = 0$，应力依赖于应变的变化率——[[continuum/fluid-kinematics]]。

::: summary
- 各向同性线性弹性固体服从 $\sigma_{ij} = \lambda\varepsilon_{kk}\delta_{ij} + 2\mu\varepsilon_{ij}$；等价地，$\boldsymbol\sigma = K(\tr\boldsymbol\varepsilon)I + 2G\,\mathbf e$ 把体积改变与形状改变分开。
- $E, \nu, G, K$ 中任意两个决定其余：$G = E/2(1 + \nu)$，$K = E/3(1 - 2\nu)$。
- 应变能为正要求 $G > 0$ 且 $K > 0$，从而 $-1 < \nu < \frac12$；$\nu \to \frac12$ 是不可压缩，此时 $E \to 3G$。
- 纳维-柯西方程 $\rho\ddot{\mathbf u} = (\lambda + \mu)\nabla(\nabla\cdot\mathbf u) + \mu\nabla^2\mathbf u + \mathbf f$ 支配小弹性运动。
- 它的平面波是纵波 $c_P = \sqrt{(\lambda + 2\mu)/\rho}$ 与横波 $c_S = \sqrt{\mu/\rho}$；钢中约 $5.9$ 与 $3.2\,\mathrm{km/s}$，地壳中约 $6.0$ 与 $3.5\,\mathrm{km/s}$。
- 流体不承载 S 波；外核中 S 波的缺失说明它是液体。
- 梁弯曲满足 $M = EIw''$，轴扭转满足 $T = GJ\phi/L$。
:::

## 习题

::: exercise 拉伸钢丝 {level=1 check="1"}
一根长 $3.00\,\mathrm m$、截面 $0.500\,\mathrm{mm^2}$ 的钢丝（$E = 210\,\mathrm{GPa}$）下挂 $35.0\,\mathrm N$ 的载荷。求伸长量，单位毫米。
::: solution
应力 $\sigma = 35.0/(0.500\times10^{-6}) = 7.00\times10^{7}\,\mathrm{Pa}$，应变 $\sigma/E = 7.00\times10^7/2.10\times10^{11} = 3.33\times10^{-4}$，于是伸长量

$$
\Delta L = 3.33\times10^{-4}\times3.00\,\mathrm m = 1.00\times10^{-3}\,\mathrm m = 1.00\,\mathrm{mm}.
$$
:::
:::

::: exercise 铝的剪切模量 {level=1 check="70/2.68"}
用 $E = 70\,\mathrm{GPa}$、$\nu = 0.34$，求铝的剪切模量，单位 GPa。
::: solution
由 [[#eq-moduli]]，$G = E/2(1 + \nu) = 70/2.68 = 26.1\,\mathrm{GPa}$。对铝棒做扭转试验直接测得的正是这个数；把它与拉伸试验的 $E$ 对比，是测定 $\nu$ 的标准方法。
:::
:::

::: exercise 海底的钢块 {level=1 check="-6e-4"}
把一块钢（$E = 210\,\mathrm{GPa}$、$\nu = 0.29$）放进压强为 $100\,\mathrm{MPa}$ 的海沟。求它的相对体积改变 $\Delta V/V$。
::: solution
体积模量 $K = E/3(1 - 2\nu) = 210/(3\times0.42) = 166.7\,\mathrm{GPa}$。于是

$$
\frac{\Delta V}{V} = -\frac{p}{K} = -\frac{1.00\times10^{8}}{1.667\times10^{11}} = -6.0\times10^{-4}.
$$

每个线度缩小其三分之一，即 $2.0\times10^{-4}$。水（$K = 2.2\,\mathrm{GPa}$）在同强下被压缩 $4.5\,\%$，所以钢块相对于周围的水实际上是变得更“轻”了，即浮力增大。
:::
:::

::: exercise S–P 时差 {level=2 check="7.3*12/(sqrt(3)-1)" #exr-sp}
一台地震仪记录到某次地震的 S–P 时差为 $12.0\,\mathrm s$，波在 $c_P = 7.30\,\mathrm{km/s}$、泊松比 $\nu = 0.25$ 的岩石中传播。求距离，单位公里。
::: solution
$\nu = 0.25$ 时，[[#eq-ratio]] 给出 $c_P/c_S = \sqrt{1.5/0.5} = \sqrt3$，所以 $c_S = 7.30/\sqrt3 = 4.215\,\mathrm{km/s}$。像 [[#ex-quake]] 那样，

$$
d = \frac{c_Pc_S}{c_P - c_S}\,\Delta t = \frac{c_P}{\sqrt3 - 1}\,\Delta t = \frac{7.30\times12.0}{0.7321} = 119.7\,\mathrm{km},
$$

约 $120\,\mathrm{km}$。这些更深、更快的岩石给出每秒约 $10\,\mathrm{km}$ 而非上地壳的 $8.4$。
:::
:::

::: exercise 棒速与 P 波速 {level=2 check="sqrt(70e9/2700)" #exr-rod}
对铝（$E = 70\,\mathrm{GPa}$、$\nu = 0.34$、$\rho = 2700\,\mathrm{kg/m^3}$），计算长波压缩脉冲沿细杆的速度 $\sqrt{E/\rho}$（单位 m/s），并与 $c_P$ 比较。解释其差别。
::: solution
$\sqrt{E/\rho} = \sqrt{7.0\times10^{10}/2700} = 5092\,\mathrm{m/s}$，约 $5.09\,\mathrm{km/s}$。体 P 波方面，$\lambda + 2\mu = E(1 - \nu)/(1 + \nu)(1 - 2\nu) = 70\times0.66/(1.34\times0.32) = 107.7\,\mathrm{GPa}$，所以 $c_P = \sqrt{1.077\times10^{11}/2700} = 6317\,\mathrm{m/s}$。细杆中波长远大于直径、侧向自由，介质处于单轴*应力*状态，刚度是 $E$。体波中介质处于单轴*应变*状态，刚度是 $\lambda + 2\mu$。铝的实测值约 $5.0$ 与 $6.3\,\mathrm{km/s}$，证实了这一区别。
:::
:::

::: exercise 扭转轴 {level=2 check="4.48"}
半径 $10.0\,\mathrm{mm}$、长 $1.00\,\mathrm m$ 的实心钢轴承受扭矩 $100\,\mathrm{N\,m}$。取 $E = 210\,\mathrm{GPa}$、$\nu = 0.29$，求扭转角（度数）与最大剪应力。
::: solution
剪切模量 $G = 210/2.58 = 81.4\,\mathrm{GPa}$，$J = \pi R^4/2 = \pi(0.0100)^4/2 = 1.571\times10^{-8}\,\mathrm{m^4}$。由 [[#eq-torsion]]，

$$
\phi = \frac{TL}{GJ} = \frac{100\times1.00}{8.14\times10^{10}\times1.571\times10^{-8}} = 0.0782\,\mathrm{rad} = 4.48^\circ .
$$

最大剪应力 $TR/J = 100\times0.0100/1.571\times10^{-8} = 63.7\,\mathrm{MPa}$，在表面处。表面剪应变 $\gamma = R\phi/L = 7.8\times10^{-4}$，虽然扭转角肉眼可见，剪应变仍如理论要求的那样小。
:::
:::

::: exercise 炎日下被锁定的钢轨 {level=1 check="-75.6"}
一根钢轨（$E = 210\,\mathrm{GPa}$，线胀系数 $\alpha = 12\times10^{-6}\,\mathrm{K^{-1}}$）连续焊接并被锚定，无法改变长度。铺设时无应力，随后升温 $30\,\mathrm K$。把它当作单轴应力状态的杆，求轴向应力，单位 MPa（受压为负）。
::: solution
自由膨胀给出应变 $\alpha\Delta T = 3.6\times10^{-4}$。锚固件把总应变保持为零，所以弹性应变必为 $-\alpha\Delta T$；侧向自由，于是

$$
\sigma = -E\alpha\Delta T = -2.10\times10^{11}\times12\times10^{-6}\times30 = -7.56\times10^{7}\,\mathrm{Pa} = -75.6\,\mathrm{MPa}.
$$

答案与钢轨长度无关。这样大的压应力在炎日能让轨道横向鼓曲，所以无缝线路铺设时要按接近夏季均温选定的“无应力温度”预先张拉。
:::
:::

::: exercise 钢中的气泡 {level=2 check="0.768"}
钢铸件（$E = 210\,\mathrm{GPa}$、$\nu = 0.29$）深处一个半径 $5.00\,\mathrm{mm}$ 的球形气孔内气压为 $50.0\,\mathrm{MPa}$。用 [[#eq-cavity]] 求气孔壁的径向位移（单位微米），以及壁面和距球心 $10.0\,\mathrm{mm}$ 处的环向应力。
::: solution
剪切模量 $\mu = E/2(1 + \nu) = 81.4\,\mathrm{GPa}$。在壁面处，[[#eq-cavity]] 给出

$$
u(a) = \frac{pa}{4\mu} = \frac{5.00\times10^{7}\times5.00\times10^{-3}}{4\times8.14\times10^{10}} = 7.68\times10^{-7}\,\mathrm m = 0.768\,\mu\mathrm m.
$$

环向应力 $\sigma_{\theta\theta} = \frac{p}{2}(a/r)^3$：壁面处拉应力 $25.0\,\mathrm{MPa}$，两倍半径处 $25.0/8 = 3.1\,\mathrm{MPa}$。壁面处最大剪应力为 $\frac12(\sigma_{\theta\theta} - \sigma_{rr}) = \frac12(25 + 50) = 37.5\,\mathrm{MPa} = \frac34p$，这才是应当与金属屈服判据比较的量。除通过 $\mu$ 之外，结果不依赖泊松比。
:::
:::

::: exercise 橡胶的剪切 {level=2 check="2/3"}
某软橡胶 $E = 2.00\,\mathrm{MPa}$、体积模量 $K = 2.0\,\mathrm{GPa}$。求其剪切模量（单位 MPa）和四位小数的泊松比。
::: solution
由 $E = 3K(1 - 2\nu)$，$1 - 2\nu = E/3K = 2.00\times10^{6}/6.0\times10^{9} = 3.33\times10^{-4}$，故 $\nu = 0.4998$。于是 $G = E/2(1 + \nu) = 2.00/2.9997 = 0.667\,\mathrm{MPa}$，四位数字内即 $E/3$。对一切近乎不可压缩的材料，$E \approx 3G$，而泊松比太接近 $\frac12$、不宜用作输入；正确的做法是直接给出 $G$ 与 $K$。
:::
:::

::: exercise 受限压缩 {level=3}
厚 $h$ 的薄橡胶垫粘在两块刚性钢板之间，横向应变被禁止，板对橡胶施加压强 $\sigma$ 压缩它。(a) 证明竖直应变为 $\varepsilon_{zz} = -\sigma/(\lambda + 2\mu)$，并求横向应力。(b) 证明 $(\lambda + 2\mu)/E = (1 - \nu)/(1 + \nu)(1 - 2\nu)$，并对钢（$\nu = 0.29$）和上一题的橡胶求值。
::: solution
(a) 由 $\varepsilon_{xx} = \varepsilon_{yy} = 0$，[[#eq-hooke]] 给出 $\sigma_{zz} = (\lambda + 2\mu)\varepsilon_{zz}$、$\sigma_{xx} = \sigma_{yy} = \lambda\varepsilon_{zz}$。由 $\sigma_{zz} = -\sigma$ 得 $\varepsilon_{zz} = -\sigma/(\lambda + 2\mu)$，而钢板为阻止鼓胀所加的横向应力为 $\sigma_{xx} = \sigma_{yy} = -\lambda\sigma/(\lambda + 2\mu) = -\frac{\nu}{1 - \nu}\sigma$。

(b) 由 [[#eq-moduli]]，$\lambda + 2\mu = \frac{E\nu}{(1 + \nu)(1 - 2\nu)} + \frac{E}{1 + \nu} = \frac{E[\nu + 1 - 2\nu]}{(1 + \nu)(1 - 2\nu)} = \frac{E(1 - \nu)}{(1 + \nu)(1 - 2\nu)}$。钢：$0.71/(1.29\times0.42) = 1.31$。题中橡胶 $\nu = 0.49983$：$0.50017/(1.49983\times3.33\times10^{-4}) \approx 1.0\times10^{3}$。粘结的橡胶垫在压缩方向上比自由橡胶块硬一千倍，抗剪却依旧同样软——叠层橡胶支座桥梁的原理正在于此。
:::
:::

::: exercise 剪切波的能量 {level=3}
对横平面波 $\mathbf u = a\cos(kx - \omega t)\,\mathbf e_y$，$\omega = c_Sk$，计算动能密度 $\frac12\rho\abs{\dot{\mathbf u}}^2$ 与 [[#eq-energy]] 的应变能密度 $W$，并证明两者在一个周期上的平均相等。对纵波 $\mathbf u = a\cos(kx - \omega t)\,\mathbf e_x$、$\omega = c_Pk$ 再作一遍。
::: hint
S 波只有 $\varepsilon_{xy}$ 非零且 $\varepsilon_{kk} = 0$。P 波只有 $\varepsilon_{xx}$ 非零；由 [[#eq-hooke]] 直接计算 $\frac12\sigma_{ij}\varepsilon_{ij}$。
:::
::: solution
**S 波。** $\dot u_y = a\omega\sin(kx - \omega t)$，所以动能密度为 $\frac12\rho a^2\omega^2\sin^2(kx - \omega t)$。唯一的应变是 $\varepsilon_{xy} = \varepsilon_{yx} = \frac12\partial_xu_y = -\frac12ak\sin(kx - \omega t)$，迹为零，故 $e_{ij} = \varepsilon_{ij}$、$W = \mu(\varepsilon_{xy}^2 + \varepsilon_{yx}^2) = \frac12\mu a^2k^2\sin^2(kx - \omega t)$。由 $\rho\omega^2 = \rho c_S^2k^2 = \mu k^2$，两个密度在每一点每一时刻都相等，其平均值 $\frac14\mu a^2k^2$ 也相等。

**P 波。** $\dot u_x = a\omega\sin(kx - \omega t)$，动能密度 $\frac12\rho a^2\omega^2\sin^2$。唯一的应变是 $\varepsilon_{xx} = -ak\sin(kx - \omega t)$；由 [[#eq-hooke]]，$\sigma_{xx} = (\lambda + 2\mu)\varepsilon_{xx}$，其余应力乘的是零应变。所以 $W = \frac12\sigma_{xx}\varepsilon_{xx} = \frac12(\lambda + 2\mu)a^2k^2\sin^2$，而 $\rho\omega^2 = (\lambda + 2\mu)k^2$ 使之等于动能密度。行波中动能与势能的均分，正是 [[oscillations/travelling-waves]] 中张紧弦那个结果的连续介质版本。
:::
:::
