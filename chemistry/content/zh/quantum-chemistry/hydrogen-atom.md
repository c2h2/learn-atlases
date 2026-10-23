有一个原子可以被精确求解，而它恰好是所有原子里最简单的一个：氢原子本身，一个质子和一个电子被库仑引力 $ V(r) = -e^{2}/4\pi\varepsilon_{0}r $ 束缚在一起。化学中其余的一切——每一幅轨道图、每一条选择定则、每一句关于屏蔽的陈述——都是建立在这一个解之上的近似，这就是为什么本课是整个课程的重心。氢原子也是量子力学第一次向光谱学还债的地方：巴尔末（Balmer）1885 年的经验公式、里德伯（Rydberg）的波数算术、玻尔（Bohr）的半经典模型，都指向同一个光谱；1926 年求解的薛定谔（Schrödinger）方程逐条复现了它——连同整套没有人要求、如今人人需要的量子数。

我们按数学所强制的顺序求解：因为势能只依赖到核的距离 $ r $，薛定谔方程在球坐标下分离为一个角向部分——对一切中心势都相同，是轨道形状的来源——和一个携带库仑势与能级的径向部分。角向解交给我们量子数 $ l $ 与 $ m $ 以及球谐函数——其平方画出人们熟悉的 $ s $、$ p $、$ d $ 瓣；径向解交给我们 $ n $、能级 $ E_{n} = -13.6\ \mathrm{eV}/n^{2} $，以及告诉你电子究竟在哪里的径向分布函数。然后我们收下实验的回报：氢原子光谱、它的线系限、揭示氘的约化质量同位素位移，以及宣告量子电动力学登场的微小精细结构与兰姆位移修正。

自始至终记住三点警告，因为它们是学生最常出错的地方。轨道（orbital）是一电子波函数，不是路径。径向波函数 $ R(r) $ 与径向分布 $ r^{2}R^{2} $ 是极大值不同的两个函数。而氢原子对 $ l $ 的简并是 $ 1/r $ 势的偶然——在每一个多电子原子里它都被解除，而这个解除正是元素周期表的结构基础（[[general-chemistry-1/periodicity]]）。

## 库仑问题可分离

系统是两个粒子：质量 $ m_\mathrm{N} $、电荷 $ +Ze $ 的核，与质量 $ m_\mathrm{e} $、电荷 $ -e $ 的电子。与刚性转子（[[quantum-chemistry/vibration-rotation]]）一样，质心运动与相对运动分离，相对坐标 $ \mathbf{r} $ 的薛定谔方程为

$$
-\frac{\hbar^{2}}{2\mu}\nabla^{2}\psi(\mathbf{r}) - \frac{Ze^{2}}{4\pi\varepsilon_{0} r}\,\psi(\mathbf{r}) = E\,\psi(\mathbf{r}),
\qquad
\frac{1}{\mu} = \frac{1}{m_\mathrm{e}} + \frac{1}{m_\mathrm{N}},
$$ {#eq-hatom}

其中 $ \mu $ 是约化质量——对氢 $ \mu = 0.999\,455\,m_\mathrm{e} $，这个修正在下面的同位素位移一节保留，其余时候丢掉。

::: definition 中心势 {#def-central}
若势能只依赖到固定点的距离 $ r $：$ V = V(r) $，则称其为**中心的**。核与电子之间的库仑引力是原型。对中心势，哈密顿量在坐标绕中心的一切转动下不变，正是这个对称性——而非电子的任何属性——使氢原子可解。
:::

::: proposition 中心哈密顿量与角动量算符对易 {#prop-commute}
若 $ V = V(r) $，则 $ [\hat{H}, \hat{L}^{2}] = 0 $ 且 $ [\hat{H}, \hat{L}_{z}] = 0 $。因此能量本征函数可以选为 $ \hat{H} $、$ \hat{L}^{2} $ 与 $ \hat{L}_{z} $ 的共同本征函数，波函数分离为 $ \psi(r,\theta,\phi) = R(r)\,Y(\theta,\phi) $。
:::

::: proof
角动量算符只涉及角度 $ \theta,\phi $（例如 $ \hat{L}_{z} = -i\hbar\,\partial/\partial\phi $），所以它们与任何单 $ r $ 函数的乘法对易，特别地与 $ V(r) $ 对易。它们也与 $ \nabla^{2} $ 的径向部分对易，因为 $ \nabla^{2} = r^{-2}\,\partial_{r}(r^{2}\partial_{r}) - \hat{L}^{2}/\hbar^{2}r^{2} $：第一项只含 $ r $ 的导数，第二项由 $ \hat{L}^{2} $ 本身构成。因此 $ \hat{H} = -\hbar^{2}\partial_{r}(r^{2}\partial_{r})/2\mu r^{2} + \hat{L}^{2}/2\mu r^{2} + V(r) $ 与 $ \hat{L}^{2} $、$ \hat{L}_{z} $ 都对易，而对易的厄米算符拥有共同本征基（[[quantum-chemistry/quantum-foundations]]）。把 $ \psi = RY $ 代入、$ Y $ 取 $ \hat{L}^{2} $ 的本征函数，方程就化为 $ R(r) $ 的常微分方程：
$$
-\frac{\hbar^{2}}{2\mu r^{2}}\frac{\mathrm{d}}{\mathrm{d}r}\!\left(r^{2}\frac{\mathrm{d}R}{\mathrm{d}r}\right) + \left[-\frac{Ze^{2}}{4\pi\varepsilon_{0}r} + \frac{l(l+1)\hbar^{2}}{2\mu r^{2}}\right]R = ER .
$$ {#eq-radial}
:::

角向函数是**球谐函数** $ Y_{l}^{m}(\theta,\phi) $，对一切中心势都相同——它们是每一个原子轨道（以及局域意义上的分子轨道）"形状"的那一半。径向方程携带具体 $ V(r) $ 的物理，它的解只对离散的能量集存在。

## 角动量与轨道的形状

::: definition 量子数 l 与 m {#def-lm}
角向方程只有当 $ l = 0, 1, 2, \dots $ 且 $ m = -l, -l+1, \dots, +l $ 时才有可归一化解。对应的本征值为
$$
\hat{L}^{2}Y_{l}^{m} = l(l+1)\,\hbar^{2}\,Y_{l}^{m},
\qquad
\hat{L}_{z}Y_{l}^{m} = m\hbar\,Y_{l}^{m}.
$$
轨道角动量的大小是 $ \sqrt{l(l+1)}\,\hbar $——绝不是 $ l\hbar $——其 $ z $ 分量以 $ \hbar $ 为单位量子化。光谱学记号为 $ l=0,1,2,3 \leftrightarrow s,p,d,f $。
:::

头几个球谐函数（略去康登-肖特利相位（Condon–Shortley phase））为

| $ l $ | $ m $ | $ Y_{l}^{m}(\theta,\phi) $ | 实组合与形状 |
|---|---|---|---|
| 0 | 0 | $ \dfrac{1}{\sqrt{4\pi}} $ | $ s $：球对称 |
| 1 | 0 | $ \sqrt{\dfrac{3}{4\pi}}\cos\theta $ | $ p_{z} \propto z/r $：沿 $ z $ 的两个瓣 |
| 1 | $ \pm1 $ | $ \mp\sqrt{\dfrac{3}{8\pi}}\sin\theta\, e^{\pm i\phi} $ | $ p_{x} \propto x/r $，$ p_{y} \propto y/r $ |
| 2 | 0 | $ \sqrt{\dfrac{5}{16\pi}}\,(3\cos^{2}\theta - 1) $ | $ d_{z^{2}} \propto (3z^{2}-r^{2})/r^{2} $：沿 $ z $ 的两瓣 + 赤道环面 |
| 2 | $ \pm1 $ | $ \mp\sqrt{\dfrac{15}{8\pi}}\,\sin\theta\cos\theta\, e^{\pm i\phi} $ | $ d_{xz} \propto xz/r^{2} $，$ d_{yz} $：平面内四瓣 |
| 2 | $ \pm2 $ | $ \sqrt{\dfrac{15}{32\pi}}\,\sin^{2}\theta\, e^{\pm 2i\phi} $ | $ d_{x^{2}-y^{2}} $，$ d_{xy} $：成 $ 45° $ 的四瓣 |

复的 $ Y_{l}^{m} $（$ m \ne 0 $）是 $ \hat{L}_{z} $ 的本征函数；化学家几乎总是使用 $ \pm m $ 对的实线性组合，它们仍是 $ \hat{L}^{2} $ 的本征函数但不再是 $ \hat{L}_{z} $ 的——代价是 $ \hat{L}_{z} $ 与 $ \hat{L}_{x} $ 不能同时确定（它们的对易子是 $ i\hbar\hat{L}_{y} $）。表中每个实函数在其波节面两侧变号：$ p $ 与 $ d $ 轨道有**角波节**——过核、函数为零的平面或圆锥面——角波节数恰为 $ l $。

::: example 空间量子化：L 的角度 {#ex-space-quant}
对 $ l = 1 $，求每个 $ m $ 值下角动量矢量与 $ z $ 轴的夹角。
::: solution
大小为 $ |\mathbf{L}| = \sqrt{l(l+1)}\,\hbar = \sqrt{2}\,\hbar $，投影为 $ L_{z} = m\hbar $，故 $ \cos\theta = L_{z}/|\mathbf{L}| = m/\sqrt{2} $：
$$
m = +1:\ \cos\theta = \tfrac{1}{\sqrt{2}},\ \theta = 45.0°;
\qquad
m = 0:\ \theta = 90.0°;
\qquad
m = -1:\ \theta = 135.0° 。
$$
矢量从不与轴平行：$ \theta = 0 $ 要求 $ L_{z} = |\mathbf{L}| $，即 $ m^{2} = l(l+1) $，对整数 $ m \le l $ 不可能。$ \mathbf{L} $ 的一个分量可以锐利，但整个矢量不行——横向分量保持模糊，正是不确定性原理所要求的。
:::
:::

::: warning 轨道函数不是轨道 {#warn-orbit}
"轨道函数"（orbital）一词正是马利肯（Mulliken）1932 年的生造，为的是避开它所取代的玻尔轨道（orbit）。氢的 $ 1s $ 电子没有轨迹、没有角动量（$ l=0 $ 意味着 $ |\mathbf{L}| = 0 $，不是静止的行星），也没有确定半径：$ |\psi|^{2} $ 是铺在半径 $ \sim a_{0} $ 的云上的概率密度。玻尔的圆轨道只在 $ n \to \infty $ 极限（对应原理）和几飞秒内就弥散的特殊波包态中重现。当你画出包住 $ 90\,\% $ 的 $ |\psi|^{2} $ 的边界曲面时，你画的是统计包络，不是容器。
:::

## 径向方程与能级

径向方程 [[#eq-radial]] 的形式是 $ r $ 中的一维问题，带**有效势**

$$
V_\text{eff}(r) = -\frac{Ze^{2}}{4\pi\varepsilon_{0} r} + \frac{l(l+1)\hbar^{2}}{2\mu r^{2}} ,
$$

库仑阱加离心势垒。势垒把 $ l > 0 $ 的电子挡在核外（它在 $ r \to 0 $ 时发散），而 $ s $ 电子不受势垒，在核*处*有非零概率密度——一个有可测后果的事实（NMR 的费米接触相互作用，以及下面的兰姆位移）。

::: widget plot
f: -1/x + l*(l+1)/(x*x); -1/x
x: 0.2, 20
y: -1.2, 0.6
sliders: l=0:0:2:1
labels: \text{有效势 } V_\text{eff}; \text{库仑势 } V
caption: 以滑块设定 $ l $ 时，哈特里原子单位（$ x = r/a_{0} $）下的有效势 $ V_\text{eff}(x) = -1/x + l(l+1)/x^{2} $，与裸库仑势 $ -1/x $ 对照。离心项在小 $ x $ 处占优，把 $ l=2 $ 的曲线在核附近推成正值——$ d $ 电子被排除在核外——而 $ l=0 $ 的曲线无下界地下坠：$ s $ 电子可以到达核。极小值在 $ x = 2l(l+1) $，深度 $ -1/4l(l+1) $ 哈特里，即对应原理的圆轨道。
:::

::: proposition 氢原子的能级 {#prop-h-energies}
对 $ V = -Ze^{2}/4\pi\varepsilon_{0}r $，径向方程只有当
$$
E_{n} = -\frac{\mu}{m_\mathrm{e}}\,\frac{Z^{2}R_{\infty} hc}{n^{2}} = -\frac{Z^{2}}{n^{2}}\times 13.6\ \mathrm{eV},
\qquad n = 1, 2, 3, \dots
$$
时才有可归一化解，其中 $ l = 0, 1, \dots, n-1 $、$ m = -l, \dots, +l $ 自由。给定 $ n $，有 $ \sum_{l=0}^{n-1}(2l+1) = n^{2} $ 个空间状态（计入电子自旋则 $ 2n^{2} $），能量全部相同：氢对 $ l $ **偶然简并**，这是 $ 1/r $ 势的特性，在每个多电子原子里都被解除。
:::

::: proof 玻尔–德布罗意途径的能量公式 {#proof-bohr-debroglie}
对圆轨道施加德布罗意（de Broglie）关系 $ p = h/\lambda $，并要求物质波同相闭合：$ 2\pi r = n\lambda $：驻波条件量子化角动量，$ m_\mathrm{e}vr = n\hbar $。库仑引力与向心力平衡，$ m_\mathrm{e}v^{2}/r = Ze^{2}/4\pi\varepsilon_{0}r^{2} $，消去 $ v $ 得
$$
r_{n} = \frac{4\pi\varepsilon_{0}\hbar^{2}}{m_\mathrm{e}Ze^{2}}\,n^{2} = \frac{n^{2}a_{0}}{Z},
\qquad
E_{n} = \frac{p^{2}}{2m_\mathrm{e}} + V = -\frac{m_\mathrm{e}Z^{2}e^{4}}{8\varepsilon_{0}^{2}h^{2}}\,\frac{1}{n^{2}} = -\frac{Z^{2}\times 13.6\ \mathrm{eV}}{n^{2}} 。
$$
数值上 $ a_{0} = 52.92\ \mathrm{pm} $，系数为 $ 13.60\ \mathrm{eV} = 2.179\times10^{-18}\ \mathrm{J} $。这是玻尔 1913 年的结果，而 [[#eq-radial]] 的完整波动力学解恰好复现这个 $ E_{n} $——驻波论证不是量子力学的推导，但它定位到同一张光谱，因为径向方程的多项式截断条件（$ n - l - 1 $ 个径向波节，$ n $ 为正整数）编码了同一个量子化。波动力学理论加上的是 $ l $、$ m $、波函数与选择定则；减去的是轨道。
:::

量子数及其取值范围值得单独一张表：

| 量子数 | 取值 | 决定 |
|---|---|---|
| $ n $（主） | $ 1, 2, 3, \dots $ | 能量 $ E_n $，尺度 $ \langle r\rangle \propto n^{2} $ |
| $ l $（角） | $ 0, \dots, n-1 $ | $ |\mathbf{L}| = \sqrt{l(l+1)}\hbar $，角波节 $ = l $ |
| $ m $（磁） | $ -l, \dots, +l $ | $ L_{z} = m\hbar $，取向 |

**径向波节**——$ R = 0 $ 的球面而非平面——的数目是 $ n - l - 1 $，所以波节总数是 $ (n-l-1) + l = n-1 $：能量标记总波节复杂度，$ l $ 决定它在径向与角向之间如何分配。

::: definition 径向分布函数 {#def-radial-dist}
在**任意方向**上于 $ r $ 与 $ r + \mathrm{d}r $ 之间找到电子的概率是 $ P(r)\,\mathrm{d}r $，其中
$$
P(r) = r^{2}R(r)^{2}
$$
（对 $ s $ 轨道，$ P = 4\pi r^{2}\psi^{2} $，因为那里 $ \psi $ 与角度无关）。$ P $ 用球壳体积 $ 4\pi r^{2}\mathrm{d}r $ 加权密度，而化学所说的"半径"是 $ P $（不是 $ R $ 也不是 $ \psi $）的极大值。
:::

::: widget plot
f: 4*x^2*exp(-2*x); x^2*(2-x)^2*exp(-x)/8; x^4*exp(-x)/24; x^2*(27-18*x+2*x^2)^2*exp(-2*x/3)/4920.75
x: 0, 20
y: 0, 0.6
labels: \text{1s}; \text{2s}; \text{2p}; \text{3s}
caption: 氢 $ 1s $、$ 2s $、$ 2p $、$ 3s $ 轨道的归一化径向分布函数 $ P(x) $，$ x = r/a_{0} $。$ 1s $ 峰在 $ x = 1 $；$ 2p $ 在 $ x = 4 $；$ 2s $ 有内极大 $ x = 0.76 $、径向波节 $ x = 2 $、占优的外极大 $ x = 5.24 $；$ 3s $ 有两个径向波节，最外极大在 $ x = 13 $ 附近。注意外极大大致按 $ n^{2} $ 前进，而内层结构——多电子原子里重要的穿透——留在核附近。
:::

::: example 最概然半径 {#ex-most-probable}
求氢 $ 1s $、$ 2p $、$ 2s $ 电子的最概然半径。
::: solution
令 $ \mathrm{d}P/\mathrm{d}r = 0 $。对 $ 1s $：$ P \propto r^{2}e^{-2r/a_{0}} $ 给出 $ 2/r - 2/a_{0} = 0 $，故 $ r^{*} = a_{0} = 52.9\ \mathrm{pm} $——玻尔半径以最概然半径的身份重现，而非轨道。对 $ 2p $：$ P \propto r^{4}e^{-r/a_{0}} $ 给出 $ 4/r - 1/a_{0} = 0 $，故 $ r^{*} = 4a_{0} = 212\ \mathrm{pm} $。对 $ 2s $：$ P \propto r^{2}(2 - r/a_{0})^{2}e^{-r/a_{0}} $；令 $ x = r/a_{0} $，$ \ln P = 2\ln x + 2\ln|2-x| - x $，故 $ \mathrm{d}\ln P/\mathrm{d}x = 2/x - 2/(2-x) - 1 = 0 $，即 $ x^{2} - 6x + 4 = 0 $，$ x = 3 \pm \sqrt{5} $。极大在 $ x = 0.764 $ 与 $ x = 5.236 $：$ 2s $ 电子的最概然半径是 $ (3+\sqrt{5})a_{0} = 2.77\ \text{Å} $，但它也有可观概率花在 $ 1s $ 壳层之内——外极大容纳主体，内极大换来穿透。
:::
:::

::: example 数波节 {#ex-nodes}
$ 3p $、$ 4f $、$ 5g $ 轨道各有多少径向与角波节？
::: solution
径向波节 $ = n - l - 1 $，角波节 $ = l $：
$ 3p $：$ 3 - 1 - 1 = 1 $ 个径向、$ 1 $ 个角向（一个球面一个平面）；
$ 4f $：$ 4 - 3 - 1 = 0 $ 个径向、$ 3 $ 个角向；
$ 5g $：$ 5 - 4 - 1 = 0 $ 个径向、$ 4 $ 个角向。
每种情形总数都是 $ n - 1 $：$ 3p \to 2 $，$ 4f \to 3 $，$ 5g \to 4 $。$ g $ 轨道（$ l = 4 $）首次出现在 $ n = 5 $——氢的 $ 5g $ 能级存在，且在每个原子里都是空的，而 $ g $ 函数在重元素基组里各得其所（[[quantum-chemistry/many-electron-atoms]]）。
:::
:::

::: warning R 与 P，以及核处的概率 {#warn-R-vs-P}
三个函数被不断混淆。$ \psi $ 或 $ R $ 是振幅：它有符号，而 $ R_{2p}(0) = 0 $ 只是因为 $ R_{2p} \propto r $ 在原点附近。$ |\psi|^{2} $ 是*单位体积*的密度：对每个 $ s $ 轨道它在核处最大（$ |\psi_{1s}(0)|^{2} = 1/\pi a_{0}^{3} $）。$ P(r) = r^{2}R^{2} $ 是*单位半径*的密度，对每个 $ l $ 都在 $ r = 0 $ 处为零，因为壳层体积 $ 4\pi r^{2}\mathrm{d}r $ 的收缩快于任何密度的增长。所以"$ 2p $ 电子从不到访核"（对 $ P $ 成立）与"$ 2s $ 电子在核处有密度"（对 $ |\psi|^{2} $ 成立）是关于不同函数的两个正确陈述。$ ns $ 穿透——有限的 $ |\psi(0)|^{2} $ 与内层径向极大——正是 $ 2s $ 在锂及一切多电子原子里低于 $ 2p $ 的原因，也是只有 $ s $ 轨道感受核体积与核自旋的原因（费米接触、同位素位移）。
:::

## 原子为什么不坍缩

按经典物理，轨道上的电子连续辐射并损失能量；更糟的是，没有任何东西阻止它旋进核内，那里势能 $ -e^{2}/4\pi\varepsilon_{0}r $ 无下界地下坠。量子力学通过不确定性原理禁止坍缩，这个论证是一行估算，值得完整做一遍。

::: example 用不确定性原理估算基态 {#ex-collapse}
把电子局域在尺度 $ r $ 的区域。动量便不确定约 $ p \sim \hbar/r $，能量上界为
$$
E(r) \approx \frac{\hbar^{2}}{2m_\mathrm{e}r^{2}} - \frac{e^{2}}{4\pi\varepsilon_{0}r}.
$$
最小化 $ E(r) $，并与精确的 $ 1s $ 能量比较。
::: solution
由 $ \hbar^{2}/2m_\mathrm{e} = 3.81\ \mathrm{eV\,Å^{2}} $ 与 $ e^{2}/4\pi\varepsilon_{0} = 14.40\ \mathrm{eV\,Å} $（$ r $ 以 Å 计、$ E $ 以 eV 计），
$$
\frac{\mathrm{d}E}{\mathrm{d}r} = -\frac{2\times 3.81}{r^{3}} + \frac{14.40}{r^{2}} = 0
\quad\Longrightarrow\quad
r^{*} = \frac{2\times 3.81}{14.40}\ \text{Å} = 0.529\ \text{Å} = a_{0},
$$
$$
E(r^{*}) = \frac{3.81}{0.529^{2}} - \frac{14.40}{0.529} = 13.6 - 27.2 = -13.6\ \mathrm{eV}.
$$
估算恰好落在 $ a_{0} $ 与 $ -13.6\ \mathrm{eV} $（维里定理（virial theorem）$ \langle T\rangle = -E $ 使 $ 1/r $ 形式下系数的巧合成为精确）。物理：把电子压到 $ a_{0} $ 以下所费的动能 $ \propto 1/r^{2} $ 快于库仑项所得的 $ \propto 1/r $，所以原子有一个有限半径的最低态。物质之所以稳定，是因为 $ \hbar \ne 0 $。
:::
:::

## 氢原子光谱

::: proposition 里德伯–里兹公式 {#prop-rydberg}
原子氢的每一条谱线都由组合原理
$$
\tilde{\nu} = \frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{n_{1}^{2}} - \frac{1}{n_{2}^{2}}\right),
\qquad n_{2} > n_{1} \ge 1,
\qquad R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}},
$$
描述，并由能级得出，因为 $ \tilde{\nu} = (E_{n_{2}} - E_{n_{1}})/hc $，其中 $ R_\mathrm{H} = \mu e^{4}/8\varepsilon_{0}^{2}h^{3}c $。各线系为 $ n_{1} = 1 $（莱曼系，紫外，线系限 $ 91.18\ \mathrm{nm} $）、$ n_{1} = 2 $（巴尔末系，可见，线系限 $ 364.7\ \mathrm{nm} $）、$ n_{1} = 3 $（帕邢系，红外，线系限 $ 820.6\ \mathrm{nm} $）。
:::

| 线系 | $ n_{1} $ | 首线条 $ \tilde{\nu}/\mathrm{cm^{-1}} $ | $ \lambda $ | 波段 |
|---|---|---|---|---|
| 莱曼 | 1 | $ 82\,258 $（$ \mathrm{Ly}\alpha $，$ 2\leftarrow1 $） | $ 121.6\ \mathrm{nm} $ | 真空紫外 |
| 巴尔末 | 2 | $ 15\,233 $（$ \mathrm{H}\alpha $，$ 3\leftarrow2 $） | $ 656.5\ \mathrm{nm} $ | 可见红光 |
| 帕邢 | 3 | $ 5331 $（$ \mathrm{Pa}\alpha $，$ 4\leftarrow3 $） | $ 1875\ \mathrm{nm} $ | 红外 |

::: example 计算 Hα 与 Lyα {#ex-halpha}
由 $ R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}} $ 计算 $ \mathrm{H}\alpha $（$ 3 \to 2 $）与 $ \mathrm{Ly}\alpha $（$ 2 \to 1 $）的波长。
::: solution
$$
\tilde{\nu}(\mathrm{H}\alpha) = 109\,678\left(\frac{1}{4} - \frac{1}{9}\right) = 109\,678 \times \frac{5}{36} = 15\,233\ \mathrm{cm^{-1}}
\quad\Rightarrow\quad
\lambda = \frac{10^{7}}{15\,233}\ \mathrm{nm} = 656.5\ \mathrm{nm};
$$
$$
\tilde{\nu}(\mathrm{Ly}\alpha) = 109\,678\left(1 - \frac{1}{4}\right) = 82\,258\ \mathrm{cm^{-1}}
\quad\Rightarrow\quad
\lambda = 121.6\ \mathrm{nm}.
$$
注意光谱的不对称：$ \mathrm{Ly}\alpha $ 花费 $ 10.2\ \mathrm{eV} $，因为 $ n_{1} = 1 $ 把电子放在最深的一级，而 $ \mathrm{H}\alpha $ 的 $ 1.89\ \mathrm{eV} $ 是上层密集台阶之间的跃迁，$ E_{n} \propto -1/n^{2} $ 随 $ n $ 增大而压缩。电离能由线系限得出：$ hcR_\mathrm{H} = 13.60\ \mathrm{eV} $。
:::
:::

约化质量登场是因为 $ R \propto \mu $：对核质量 $ M $ 的原子，

$$
R_{M} = \frac{R_{\infty}}{1 + m_\mathrm{e}/M},
\qquad
R_{\infty} = 109\,737\ \mathrm{cm^{-1}}\ (\mu \to m_\mathrm{e}).
$$ {#eq-reduced-mass}

::: example 同位素位移：氘现形 {#ex-deuterium}
氘（$ M = 2.014\,u $）中 $ \mathrm{H}\alpha $ 移动多少？尤里（Urey）、墨菲（Murphy）与布里克韦德（Brickwedde）1932 年测量的正是这个，并因此发现了氘。
::: solution
由 $ m_\mathrm{e}/M(\mathrm{H}) = 1/1836.2 $ 与 $ m_\mathrm{e}/M(\mathrm{D}) = 1/3670.5 $，
$$
R_\mathrm{H} = \frac{109\,737}{1.000\,545} = 109\,678\ \mathrm{cm^{-1}},
\qquad
R_\mathrm{D} = \frac{109\,737}{1.000\,272} = 109\,707\ \mathrm{cm^{-1}} 。
$$
$ \mathrm{D}\alpha $ 线在 $ \lambda = 36/(5R_\mathrm{D}) = 656.29\ \mathrm{nm} $，对比 $ \mathrm{H}\alpha $ 的 $ 656.47\ \mathrm{nm} $：移动 $ 0.18\ \mathrm{nm} $——微小，但光谱仪轻松分辨，这就是尤里 1932 年在一升液态氢蒸干的残液里找到该同位素的原因。相对移动 $ \Delta\lambda/\lambda = \Delta\tilde{\nu}/\tilde{\nu} \approx m_\mathrm{e}(1/M_\mathrm{H} - 1/M_\mathrm{D}) \approx 2.7\times10^{-4} $ 是用光对核质量的直接测量。
:::
:::

类氢离子按 $ Z^{2} $ 缩放：$ \mathrm{He}^{+} $ 有 $ E_{n} = -54.4\ \mathrm{eV}/n^{2} $，电离能 $ 54.4\ \mathrm{eV} $；它的**皮克林系（Pickering series）** $ n \to 4 $ 的波数为 $ 4R_\mathrm{He}(1/16 - 1/n^{2}) $，在偶数 $ n $ 与氢的巴尔末系逐线重合——这个历史谜题被玻尔的 $ Z^{2} $ 缩放在 1913 年解开："皮克林线"（如 $ 454.3\ \mathrm{nm} $，$ n = 9 \to 4 $）原来属于恒星大气中的电离氦，而非氢。

最后两个修正为氢的光谱清单收尾。**精细结构**——自旋-轨道耦合与相对论质量修正——把 $ E_{n} $ 分裂约 $ \sim \alpha^{2}R_\infty hc/n^{3} $（$ \mathrm{2p}_{3/2} - \mathrm{2p}_{1/2} = 0.37\ \mathrm{cm^{-1}} $），所以 $ \mathrm{H}\alpha $ 是间隔约 $ 0.02\ \mathrm{nm} $ 的若干分量的混合。1947 年兰姆（Lamb）与雷瑟福（Retherford）发现 $ \mathrm{2s}_{1/2} $ 比 $ \mathrm{2p}_{1/2} $ 高 $ 1057.8\ \mathrm{MHz} = 0.035\ \mathrm{cm^{-1}} $，而狄拉克（Dirac）理论说它们应相等：**兰姆位移**源于电子与真空涨落场的相互作用，是量子电动力学的奠基测量。在另一个极端，对应原理被射电天文的**复合线**壮丽地证实：在巨大 $ n $ 之间的跃迁以 $ \nu \approx 2cR/n^{3} $ 辐射，所以 H109$ \alpha $（$ 110 \to 109 $）出现在 $ 5.01\ \mathrm{GHz} $——正是那个半径的经典轨道会辐射的频率。

::: quiz
氢样品被激发到 $ n = 3 $。忽略自旋，该能量上有多少个不同状态？级联能产生多少条不同的发射谱线？
- [x] $ 9 $ 个状态（$ n^{2} $）；$ 3 $ 条线（$ 3\to2 $、$ 2\to1 $、$ 3\to1 $）。
- [ ] $ 3 $ 个状态；$ 3 $ 条线。
- [ ] $ 9 $ 个状态；$ 6 $ 条线。
- [ ] $ 18 $ 个状态；$ 3 $ 条线。
::: solution
简并度是 $ n^{2} = 1 + 3 + 5 = 9 $ 个空间状态（计自旋为 $ 18 $，但题目要求忽略）。*线*数是*能级*之间向下跃迁的数目，不是状态的数目：$ 3 \to 2 $、$ 3 \to 1 $、$ 2 \to 1 $——三条，因为同一 $ n $ 的所有状态简并、发出相同光子能量。混淆"状态"与"线"是标准错误；$ \binom{n}{2} $ 数的是能级之间的跃迁，不是 $ n^{2} $ 个状态之间的。
:::
:::

::: history
巴尔末（Balmer）1885 年发现氢的四条已知可见谱线拟合 $ \lambda = 3645.6\,n^{2}/(n^{2}-4)\ \text{Å} $，$ n = 3,4,5,6 $——带分母的数秘术。里德伯（Rydberg，1888）与里兹（Ritz，1908）把它推广为组合原理，到 1913 年光谱学界已编目数千条谱线，却没有一个能解释它们的原子。玻尔（Bohr）1913 年以量子化轨道命中目标，从 $ e $、$ m_\mathrm{e} $ 与 $ h $ 导出 $ R $；索末菲（Sommerfeld）1916 年加上椭圆轨道与相对论修正，却修不好强度。薛定谔（Schrödinger）1926 年解出了真正的问题——他的第二篇论文写的是氢，正是它说服了全世界——海森堡（Heisenberg）的矩阵力学经泡利（Pauli）对氢的对角化也与之一致。狄拉克方程（1928）给出精细结构与电子的 $ g $ 因子；兰姆（Lamb）与雷瑟福（Retherford）1947 年测出 $ 2s $–$ 2p $ 移动，贝特（Bethe）同年对它的计算奠定了重正化 QED。范德胡斯特（van de Hulst）1944 年预言、1951 年发现的 21 厘米超精细线，随后把氢的光谱变成了银河系的地图。
:::

## 后续内容

氢的解是后续一切的原材料。把尖锐的核电荷换成其余电子的平均场，你就得到轨道近似与元素周期表（[[quantum-chemistry/many-electron-atoms]]）；把电子-电子排斥当作微扰或变分能量，你就得到近似方法（[[quantum-chemistry/approximation-methods]]）；把一个核换成两个核，你就得到化学键（[[quantum-chemistry/chemical-bond-qm]]）。角向函数 $ Y_{l}^{m} $ 原封不动地重现为转动群的对称类型，这就是为什么对称性一章（[[quantum-chemistry/molecular-symmetry]]）不计算任何东西就能分类 $ p $ 与 $ d $ 轨道。光谱本身在 [[spectroscopy/electronic-spectroscopy]] 中被认真接手，而能级的布居——为什么巴尔末吸收需要热星——是作用在 $ E_{n} $ 上的玻尔兹曼定律（[[statistical-thermodynamics/boltzmann-distribution]]）。你在 [[general-chemistry-1/quantum-atom]] 里遇到的初级叙述，如今在它故意出错之处被逐点取代。

::: summary
- 中心势与 $ \hat{L}^{2} $、$ \hat{L}_{z} $ 对易，所以 $ \psi = R_{nl}(r)\,Y_{l}^{m}(\theta,\phi) $ 可分离：角向部分普适（球谐函数），径向部分携带 $ V(r) $。
- $ l = 0, \dots, n-1 $，$ m = -l, \dots, l $；$ |\mathbf{L}| = \sqrt{l(l+1)}\hbar $，$ L_{z} = m\hbar $；$ l $ 个角波节（平面/圆锥面），$ n - l - 1 $ 个径向波节（球面），共 $ n - 1 $ 个。
- $ E_{n} = -Z^{2} \times 13.6\ \mathrm{eV}/n^{2} $，简并度 $ n^{2} $（空间）；对 $ l $ 的简并是 $ 1/r $ 的偶然，在多电子原子里被解除。
- 最概然半径来自 $ P(r) = r^{2}R^{2} $：$ 1s \to a_{0} $，$ 2p \to 4a_{0} $，$ 2s \to (3+\sqrt{5})a_{0} $；切勿混淆 $ R $、$ |\psi|^{2} $ 与 $ P $。
- 不确定性原理决定原子尺度：最小化 $ \hbar^{2}/2mr^{2} - e^{2}/4\pi\varepsilon_{0}r $ 得 $ r^{*} = a_{0} $、$ E = -13.6\ \mathrm{eV} $——坍缩被禁止。
- 里德伯-里兹公式 $ \tilde{\nu} = R_\mathrm{H}(n_{1}^{-2} - n_{2}^{-2}) $，$ R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}} $，给出每一条线；$ R \propto \mu $ 产生 $ \mathrm{H}\alpha $ 的 $ 0.18\ \mathrm{nm} $ 氘移动。
- 类氢离子按 $ Z^{2} $ 缩放（$ \mathrm{He}^{+} $：$ 54.4\ \mathrm{eV} $）；精细结构（$ 2p $ 中 $ 0.37\ \mathrm{cm^{-1}} $）与兰姆位移（$ 0.035\ \mathrm{cm^{-1}} $）是狄拉克图像上的第一道裂缝。
:::

## 练习

::: exercise 电离氦的一条谱线 {level=1 check="164.1"}
计算 $ \mathrm{He}^{+} $ 的 $ 3 \to 2 $ 跃迁的波长（$ R_{\mathrm{He}^{+}} = 109\,722\ \mathrm{cm^{-1}} $）。（波长以 nm 作答。）
::: solution
$ \tilde{\nu} = 4R(1/4 - 1/9) = 4 \times 109\,722 \times 5/36 = 60\,957\ \mathrm{cm^{-1}} $，故 $ \lambda = 10^{7}/60\,957 = 164.1\ \mathrm{nm} $——极紫外，能量是 $ \mathrm{H}\alpha $ 的四倍，因为 $ Z^{2} = 4 $ 缩放。
:::
:::

::: exercise 4f 的波节 {level=1 check="0"}
氢的 $ 4f $ 轨道有多少个径向波节？（以数目作答。）
::: solution
径向波节 $ = n - l - 1 = 4 - 3 - 1 = 0 $。$ 4f $ 有三个角波节（它是 $ f $）而没有径向波节：它的波节结构全是角向的。
:::
:::

::: exercise He+ 的玻尔半径 {level=1 check="26.5"}
$ \mathrm{He}^{+} $ 的 $ 1s $ 电子的最概然半径是多少？（以 pm 作答。）
::: solution
$ P_{1s} \propto r^{2}e^{-2Zr/a_{0}} $ 在 $ r = a_{0}/Z = 52.92/2 = 26.5\ \mathrm{pm} $ 处取峰：类氢缩放 $ r_{n} = n^{2}a_{0}/Z $ 把离子压到一半半径，其结合能增到 $ 54.4\ \mathrm{eV} $。
:::
:::

::: exercise 莱曼 β 线 {level=2 check="102.6"}
计算原子氢 $ \mathrm{Ly}\beta $（$ 3 \to 1 $）的波长（$ R_\mathrm{H} = 109\,678\ \mathrm{cm^{-1}} $）。（波长以 nm 作答。）
::: solution
$ \tilde{\nu} = R_\mathrm{H}(1 - 1/9) = 109\,678 \times 8/9 = 97\,492\ \mathrm{cm^{-1}} $，$ \lambda = 102.6\ \mathrm{nm} $。它位于 $ \mathrm{Ly}\alpha $（$ 121.6\ \mathrm{nm} $）与线系限（$ 91.18\ \mathrm{nm} $）之间，且与所有莱曼线一样被星际介质吸收——这就是为什么承载宇宙学信息的主要是莱曼-$ \alpha $ 森林而非 $ \mathrm{Ly}\beta $。
:::
:::

::: exercise d 轨道的空间量子化 {level=2 check="65.9"}
对 $ l = 2 $、$ m = 1 $，角动量矢量与 $ z $ 轴成什么角？（角度以度作答。）
::: solution
$ \cos\theta = m/\sqrt{l(l+1)} = 1/\sqrt{6} = 0.4082 $，故 $ \theta = 65.9° $。$ l = 2 $ 的五个允许取向是 $ m = +2, +1, 0, -1, -2 $ 对应的 $ \theta = 35.3°, 65.9°, 90°, 114.1°, 144.7° $——从不是 $ 0° $ 或 $ 180° $，如不确定性原理所要求。
:::
:::

::: exercise 电子偶素 {level=2 check="6.80"}
电子偶素（positronium）是一个 $ \mathrm{e^{+}e^{-}} $ 原子：电子与正电子的束缚对，没有核。计算它的电离能。（以 eV 作答。）
::: solution
约化质量 $ \mu = m_\mathrm{e}/2 $（等质量），故 $ R_\mathrm{Ps} = R_{\infty}/(1 + m_\mathrm{e}/m_\mathrm{e}) = 54\,869\ \mathrm{cm^{-1}} $，一切能量减半：$ E_{1} = -13.6/2 = -6.80\ \mathrm{eV} $。电子偶素的光谱是波数减半的氢光谱——而它在 $ 125\ \mathrm{ps} $（仲）或 $ 142\ \mathrm{ns} $（正）内湮灭，这就是它是实验室奇观与天体物理诊断、却不是化学的原因。
:::
:::

::: exercise 推导 2s 的外层极大 {level=3}
由 $ P_{2s}(r) \propto r^{2}(2 - r/a_{0})^{2}e^{-r/a_{0}} $ 证明极大在 $ r = (3 \pm \sqrt{5})a_{0} $，并判断哪个是全局极大。
::: solution
令 $ x = r/a_{0} $：$ \ln P = 2\ln x + 2\ln|2 - x| - x + \text{const} $，故
$$
\frac{\mathrm{d}\ln P}{\mathrm{d}x} = \frac{2}{x} - \frac{2}{2-x} - 1 = 0
\quad\Longrightarrow\quad 2(2-x) - 2x - x(2-x) = 0
\quad\Longrightarrow\quad x^{2} - 6x + 4 = 0,
$$
根为 $ x = 3 \pm \sqrt{5} = 0.764,\ 5.236 $（$ x = 2 $ 处的波节把它们分开）。求值：$ P(0.764) \propto 0.584 \times 1.526 \times 0.466 = 0.415 $，$ P(5.236) \propto 27.4 \times 10.5 \times 0.00532 = 1.53 $（同一单位）——外极大高 $ 3.7 $ 倍，且积分进更多概率（壳层体积 $ x^{2} $ 偏爱大 $ r $）。所以 $ 2s $ 电子的"半径"是 $ 2.77\ \text{Å} $，附带一个化学上不成比例地重要的紧实内瓣：正是那个瓣在锂及之后的原子里穿透到核。
:::
:::

::: exercise 期望值与最概然半径 {level=3}
对氢的 $ 1s $ 轨道计算 $ \langle r \rangle = \int_{0}^{\infty} r\,P(r)\,\mathrm{d}r $，并与最概然半径 $ a_{0} $ 比较。为什么 $ \langle r \rangle $ 更大？对一般类 $ ns $ 分布 $ P \propto r^{2}e^{-2r/na_{0}} $，大多少倍？
::: solution
由 $ P = 4r^{2}a_{0}^{-3}e^{-2r/a_{0}} $ 与 $ \int_{0}^{\infty} r^{k}e^{-\alpha r}\mathrm{d}r = k!/\alpha^{k+1} $：
$$
\langle r \rangle = \frac{4}{a_{0}^{3}}\int_{0}^{\infty} r^{3}e^{-2r/a_{0}}\mathrm{d}r = \frac{4}{a_{0}^{3}}\cdot\frac{3!}{(2/a_{0})^{4}} = \frac{4 \times 6\, a_{0}}{16} = \frac{3}{2}a_{0} = 79.4\ \mathrm{pm}.
$$
$ \langle r \rangle > r^{*} $，因为 $ P $ 强烈右偏：指数尾巴伸到大 $ r $，均值被众数忽略的尾巴拉走。对任何形如 $ P \propto r^{2}e^{-r/c} $ 的分布，同一积分给出 $ \langle r \rangle = 3c $、众数在 $ 2c $：比值仍是 $ 3/2 $。精确的类氢均值是 $ \langle r\rangle_{nl} = \tfrac{1}{2}[3n^{2} - l(l+1)]a_{0} $——$ 1s $ 为 $ 1.5a_{0} $，$ 2p $ 为 $ 5a_{0} $——所以报出轨道"半径"必须说明是哪种半径：众数、均值，还是边界曲面。
:::
:::

::: exercise 皮克林重合 {level=3}
$ \mathrm{He}^{+} $ 的皮克林系波数为 $ \tilde{\nu} = 4R_{\mathrm{He}^{+}}(1/16 - 1/n^{2}) $。证明其偶数 $ n $ 成员与氢的巴尔末系重合，并计算奇数 $ n $ 线 $ n = 9 \to 4 $（$ R_{\mathrm{He}^{+}} = 109\,722\ \mathrm{cm^{-1}} $）。这个图案为什么骗过了十九世纪的谱学家？
::: solution
令 $ n = 2m $（偶）：$ 4(1/16 - 1/4m^{2}) = 1/4 - 1/m^{2} $，恰是巴尔末公式 $ R_\mathrm{H}(1/4 - 1/m^{2}) $，只差 $ R_{\mathrm{He}^{+}} $ 与 $ R_\mathrm{H} $ 之间 $ 0.04\,\% $ 的差别——所以每条偶数皮克林线都藏在一条巴尔末线里。奇数成员，如
$$
\tilde{\nu} = 4 \times 109\,722\left(\frac{1}{16} - \frac{1}{81}\right) = 4 \times 109\,722 \times 0.050\,154 = 22\,011\ \mathrm{cm^{-1}},
\quad \lambda = 454.3\ \mathrm{nm},
$$
没有对应的氢线，并像第二把梳子一样与巴尔末线交替。皮克林（Pickering，1896）把它们归给一种"恒星元素"；玻尔（1913）证明它们不过是氢的公式配上 $ Z^{2} = 4 $ 与半整数的有效量子数——新理论最早的胜利之一，也是先读组合图案再作解释的一课。
:::
:::
