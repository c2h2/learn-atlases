把一滴未知液体放到红外光谱仪的金刚石窗片上，三十秒后，你就得到一条在$4000$到$400\ \mathrm{cm^{-1}}$之间也许有二十条谱带的曲线。$1742\ \mathrm{cm^{-1}}$处一条强而锐的谱带说的是*酯羰基*；$3200\ \mathrm{cm^{-1}}$以上没有任何宽带说的是*没有O–H*；$1240\ \mathrm{cm^{-1}}$附近一条强带证实了酯的$\mathrm{C{-}O}$。没有其他技术能如此快、如此便宜、用如此少的样品给出官能团信息。然而同一张谱也是一份精确的物理学：每条谱带都是一个拥有$3N - 6$个耦合谐振子的分子在振动能级之间的一次跃迁，其位置由力常数与质量固定，其强度由偶极矩的变化决定，其形状由转动与碰撞决定。还有第二个实验——让绿色激光透过同一液体，观察以略异颜色散射出来的微弱的光——用另一条选律测量*同样的*振动。

本课把这两种眼光接起来。我们从简正振动出发、用对称性计数，然后加上非谐性（倍频、热谱带、费米共振）、气相谱带的转动结构、拉曼散射及其选律、傅里叶变换仪器，最后是不可缺少的**特征基团频率**表。谐振子、它的$\Delta v = \pm1$选律与Morse势在[[quantum-chemistry/vibration-rotation]]中已经推导，不可约表示的约化在[[quantum-chemistry/molecular-symmetry]]中已讲；这里直接使用。跃迁矩、布居与线宽的通用机器见[[spectroscopy/spectroscopy-principles]]。

单位：振动光谱学家以波数$\tilde\nu = 1/\lambda$（$\mathrm{cm^{-1}}$）报告位置。下面用到的换算因子取自CODATA 2018（$hc/k_\mathrm{B} = 1.438\,777\ \mathrm{cm\,K}$，$1\ \mathrm{cm^{-1}} = 1.239\,842\times10^{-4}\ \mathrm{eV}$）；同位素质量取自2020年原子质量评估；双原子分子常数取自胡贝尔与赫茨伯格《双原子分子常数》（*Constants of Diatomic Molecules*，1979），以NIST化学WebBook转载的数值为准，多原子分子的基频取自岛内（Shimanouchi）的NIST表。

## 简正振动 {#sec-normal-modes}

$N$个原子的分子有$3N$个核坐标。三个描述质心平动，三个（线性分子两个）描述转动；其余是内部的。在平衡几何附近，势能是位移的二次型，而振动光谱学的中心事实是：这个多维问题会碎裂成彼此独立的一维谐振子。

::: definition 简正振动与简正坐标 {#def-normal-mode}
设$q_i = \sqrt{m_i}\,\Delta x_i$（$i = 1,\ldots,3N$）为**质量加权笛卡尔位移**，$V = \tfrac12\sum_{ij} F_{ij}\,q_iq_j$为谐振势，其中$F_{ij} = \partial^2 V/\partial q_i\partial q_j$是质量加权黑塞矩阵。**简正坐标**$Q_k = \sum_i L_{ik}\,q_i$是由$\mathbf F$的正交归一本征矢$\mathbf{F}\mathbf{L}_k = \lambda_k \mathbf{L}_k$确定的组合。每个$\lambda_k > 0$的$Q_k$是一个**简正振动**：一种集体运动，其中每个原子都以同一频率$\omega_k = \sqrt{\lambda_k}$振荡并在同一瞬间经过平衡位置。非线性分子有$3N - 6$个简正振动，线性分子有$3N - 5$个；其余本征值为零（平动与转动）。
:::

::: proposition 分解为简正振动 {#prop-normal-modes}
在简正坐标中，谐振近似下的振动哈密顿量是独立谐振子之和，
$$
\hat H_\mathrm{vib} = \sum_{k=1}^{3N-6}\left(-\frac{\hbar^2}{2}\frac{\partial^2}{\partial Q_k^2} + \frac12\omega_k^2 Q_k^2\right),
\qquad
E = \sum_k \left(v_k + \tfrac12\right)\hbar\omega_k ,
$$ {#eq-normal-energy}
波函数为$\prod_k \psi_{v_k}(Q_k)$。**基频**是指某一个$v_k$从$0$变到$1$的跃迁；**倍频**使某一个$v_k$改变2或更多；**组合频带**同时改变两个或更多个$v_k$。
:::

::: proof
动能为$T = \tfrac12\sum_i m_i\dot{x}_i^2 = \tfrac12\sum_i \dot q_i^2 = \tfrac12\dot{\mathbf q}^{\mathsf T}\dot{\mathbf q}$，$V = \tfrac12\mathbf q^{\mathsf T}\mathbf F\mathbf q$。由于$\mathbf F$实对称，它有正交的本征矢矩阵$\mathbf L$使$\mathbf L^{\mathsf T}\mathbf F\mathbf L = \mathrm{diag}(\lambda_k)$。令$\mathbf Q = \mathbf L^{\mathsf T}\mathbf q$。正交性保持动能不变，$\dot{\mathbf q}^{\mathsf T}\dot{\mathbf q} = \dot{\mathbf Q}^{\mathsf T}\dot{\mathbf Q}$，而把势能对角化，$V = \tfrac12\sum_k\lambda_k Q_k^2$。交叉项既已全部消去，经典拉格朗日量——以及以$\hat P_k = -\mathrm{i}\hbar\,\partial/\partial Q_k$量子化之后的哈密顿量——就是每一项只依赖一个$Q_k$的项之和。可分的哈密顿量有乘积本征函数与可加的能量，而每个一维项就是[[quantum-chemistry/vibration-rotation]]中频率为$\omega_k = \sqrt{\lambda_k}$的谐振子。刚性平动与无穷小转动不改变$V$，所以它们是$\lambda = 0$的本征矢：非线性分子六个，线性分子五个（绕轴的转动不移动任何核）。
:::

振动模式的数目值得烂熟于心：水$3$个，二氧化碳$4$个（其中两个是一对二重简并的弯曲），甲烷$9$个，苯$30$个。这些模式*不是*键伸缩；它们离域于整个分子，尽管——这正是基团频率的基础——涉及轻原子或刚性键的模式常常由单个内坐标主导。

::: example 二氧化碳的价力场 {#ex-co2-vff}
把$\mathrm{O{=}C{=}O}$建模为一条直线上由两根劲度系数为$k$的弹簧连接的两个氧与一个碳。求对称伸缩与反对称伸缩的频率，并用观测到的反对称伸缩$\tilde\nu_3 = 2349.1\ \mathrm{cm^{-1}}$预测$\tilde\nu_1$。
::: solution
在**对称伸缩**中碳保持不动，每个氧各自压着一根弹簧运动：$\omega_1^2 = k/m_\mathrm{O}$。在**反对称伸缩**中两个氧朝一个方向运动、碳朝另一个方向运动，保持质心不动；解$3\times3$问题得$\omega_3^2 = (k/m_\mathrm{O})(1 + 2m_\mathrm{O}/m_\mathrm{C})$。比值只依赖质量：
$$
\frac{\tilde\nu_3}{\tilde\nu_1} = \sqrt{1 + \frac{2m_\mathrm{O}}{m_\mathrm{C}}} = \sqrt{1 + \frac{2\times15.995}{12.000}} = 1.915 .
$$
由$\tilde\nu_3$：$k = (2\pi c\tilde\nu_3)^2 \big/ \left[(1/m_\mathrm{O} + 2/m_\mathrm{C})/u\right] = 1419\ \mathrm{N\,m^{-1}}$，且$\tilde\nu_1 = 2349.1/1.915 = 1227\ \mathrm{cm^{-1}}$。对称伸缩实际上在$1337\ \mathrm{cm^{-1}}$附近（下文讨论的费米双线的中心）。模型过于简单：拉伸一个$\mathrm{C{=}O}$键会使另一个变硬。加入相互作用常数$k_{12}$，$\omega_1^2 = (k + k_{12})/m_\mathrm{O}$且$\omega_3^2 = (k - k_{12})(1/m_\mathrm{O} + 2/m_\mathrm{C})$，用两个频率同时拟合得$k = 1551\ \mathrm{N\,m^{-1}}$与$k_{12} = 133\ \mathrm{N\,m^{-1}}$——微小却必不可少的耦合。这类力场拟合——借助许多同位素异构体来定出非对角项——正是量子化学黑塞矩阵出现之前获得力常数的办法。
:::
:::

### 用对称性计数活性模式

每个简正振动按分子点群的一个不可约表示变换，而这个标签决定它的光谱活性。做法是机械的。

::: algorithm 对分子的基频进行分类 {#alg-gamma-vib}
1. 找出点群并建立坐标系（[[quantum-chemistry/molecular-symmetry]]）。
2. 对每类操作$R$，数出位置不动的原子数$N_\mathrm{u}(R)$，乘以每个不动原子的贡献（$E$为$3$，$C_n$为$1 + 2\cos\theta$，$\sigma$为$1$，$i$为$-3$，$S_n$为$-1 + 2\cos\theta$）。这就给出$\chi_{3N}(R)$。
3. 用$n_j = \frac1h\sum_R g_R\,\chi_{3N}(R)\,\chi_j(R)$约化$\Gamma_{3N}$。
4. 减去$x, y, z$（平动）与$R_x, R_y, R_z$（转动）所属的不可约表示，得到$\Gamma_\mathrm{vib}$。
5. 若某基频所属的不可约表示与$x$、$y$或$z$相同，它是**红外活性**的；若与特征标表中某个二次函数（$x^2$、$xy$、$\ldots$）相同，它是**拉曼活性**的。
:::

::: example 甲醛的六个基频 {#ex-h2co}
对$\mathrm{H_2CO}$（$\mathrm{C_{2v}}$，分子置于$yz$平面，$z$沿$\mathrm{C{=}O}$）的振动分类，并说明每种技术应显示几条谱带。
::: solution
$\Gamma_{3N}$按$(E, C_2, \sigma_v(xz), \sigma_v'(yz))$顺序的特征标：$E$固定全部四个原子，$12$；$C_2$固定C与O，$2\times(-1) = -2$；$\sigma_v(xz)$垂直于分子平面，固定C与O，$2\times1 = 2$；$\sigma_v'(yz)$是分子平面，固定全部四个原子，$4$。约化：
$$
n(\mathrm{A_1}) = \tfrac14(12 - 2 + 2 + 4) = 4,\quad
n(\mathrm{A_2}) = \tfrac14(12 - 2 - 2 - 4) = 1,\quad
n(\mathrm{B_1}) = \tfrac14(12 + 2 + 2 - 4) = 3,\quad
n(\mathrm{B_2}) = \tfrac14(12 + 2 - 2 + 4) = 4 .
$$
平动为$\mathrm{A_1}(z) + \mathrm{B_1}(x) + \mathrm{B_2}(y)$，转动为$\mathrm{A_2}(R_z) + \mathrm{B_1}(R_y) + \mathrm{B_2}(R_x)$，故$\Gamma_\mathrm{vib} = 3\mathrm{A_1} + \mathrm{B_1} + 2\mathrm{B_2}$——六个模式，与$3N - 6$相符。在$\mathrm{C_{2v}}$中，$\mathrm{A_1}$、$\mathrm{B_1}$与$\mathrm{B_2}$各含一个平动*以及*一个二次函数，所以六个基频在红外与拉曼中都活性。气相数值（岛内）为：$\mathrm{A_1}$：C–H对称伸缩$2782$，C=O伸缩$1746$，$\mathrm{CH_2}$剪式$1500$；$\mathrm{B_1}$：面外摇摆$1167$；$\mathrm{B_2}$：C–H反对称伸缩$2843$，$\mathrm{CH_2}$面内摇摆$1249\ \mathrm{cm^{-1}}$。只有含$\mathrm{A_2}$振动（或者，如我们将看到的，带对称中心）的分子才会产生非活性或只被一种技术看到的模式。
:::
:::

## 非谐性：倍频、热谱带与费米共振

谐振理论对每个活性基频只预言一条谱带。真实光谱显示的更多，而每条多出的谱带都是关于非谐性的信息。对单个模式，项值到二阶为
$$
G(v) = \omega_\mathrm{e}\left(v + \tfrac12\right) - \omega_\mathrm{e}x_\mathrm{e}\left(v + \tfrac12\right)^2 ,
$$ {#eq-anh}
即[[quantum-chemistry/vibration-rotation]]中的Morse形式。两个推论：$\Delta v = \pm2, \pm3$的跃迁获得强度（势不是抛物线，偶极矩也不是$Q$的线性函数——**电非谐性**），而能级不再等距，于是从不同起始能级出发的跃迁不再重合。

::: proposition 非谐跃迁波数与伯奇-斯波纳和 {#prop-anh}
用式[[#eq-anh]]的项值，自$v = 0$的跃迁与相邻能级之间的跃迁位于
$$
\tilde\nu(v \leftarrow 0) = v\,\omega_\mathrm{e} - v(v+1)\,\omega_\mathrm{e}x_\mathrm{e},
\qquad
\Delta G_{v+\frac12} \equiv G(v+1) - G(v) = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v+1) .
$$ {#eq-overtone}
基频在$\omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}$，第一倍频在$2\omega_\mathrm{e} - 6\omega_\mathrm{e}x_\mathrm{e}$（比基频的两倍*略小*），**热谱带**$v = 2 \leftarrow 1$在$\omega_\mathrm{e} - 4\omega_\mathrm{e}x_\mathrm{e}$，比基频低$2\omega_\mathrm{e}x_\mathrm{e}$。自$v = 0$的解离能是全部间隔之和$D_0 = \sum_v \Delta G_{v+\frac12}$，即$\Delta G_{v+\frac12}$对$v + \tfrac12$图线下的面积（**伯奇-斯波纳图**）；对上面的线性形式，它等于$\omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e} - G(0)$。
:::

::: proof
把项值相减。$G(v) - G(0) = \omega_\mathrm{e}v - \omega_\mathrm{e}x_\mathrm{e}\left[(v+\tfrac12)^2 - \tfrac14\right] = v\omega_\mathrm{e} - v(v+1)\omega_\mathrm{e}x_\mathrm{e}$，因为$(v + \tfrac12)^2 - \tfrac14 = v^2 + v$。相邻间隔为$G(v+1) - G(v) = \omega_\mathrm{e} - \omega_\mathrm{e}x_\mathrm{e}\left[(v + \tfrac32)^2 - (v+\tfrac12)^2\right] = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v + 1)$。只要此间隔为正，束缚能级就存在；对它从$v = 0$求和到最后一个束缚能级，中间逐项相消，得$G(v_\mathrm{last}+1) - G(0)$，即从基能级到解离限的能量，按定义就是$D_0$。对二次的$G(v)$，$G$的最大值在$v + \tfrac12 = \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e}$处，那里$G = \omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e} = D_\mathrm{e}$，故$D_0 = D_\mathrm{e} - G(0)$。
:::

::: example 由倍频求HCl的非谐性 {#ex-hcl-overtone}
$\mathrm{H^{35}Cl}$的基频在$2885.98\ \mathrm{cm^{-1}}$，第一倍频在$5667.98\ \mathrm{cm^{-1}}$。求$\omega_\mathrm{e}$与$\omega_\mathrm{e}x_\mathrm{e}$，预测热谱带$v = 2 \leftarrow 1$，并估计其在$300\ \mathrm{K}$下相对基频的强度。
::: solution
由式[[#eq-overtone]]，$\omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e} = 2885.98$且$2\omega_\mathrm{e} - 6\omega_\mathrm{e}x_\mathrm{e} = 5667.98$。第一式的两倍减第二式得$2\omega_\mathrm{e}x_\mathrm{e} = 5771.96 - 5667.98 = 103.98$，故
$$
\omega_\mathrm{e}x_\mathrm{e} = 52.0\ \mathrm{cm^{-1}}, \qquad \omega_\mathrm{e} = 2885.98 + 103.98 = 2990.0\ \mathrm{cm^{-1}} ,
$$
与胡贝尔-赫茨伯格常数一致（$2990.9$与$52.8\ \mathrm{cm^{-1}}$；小差异来自我们忽略的三次项）。热谱带位于$\omega_\mathrm{e} - 4\omega_\mathrm{e}x_\mathrm{e} = 2782.0\ \mathrm{cm^{-1}}$，比基频低$104\ \mathrm{cm^{-1}}$。其强度取决于$v = 1$的布居：$\mathrm{e}^{-hc\tilde\nu/k_\mathrm{B}T} = \exp(-1.4388 \times 2885.98/300) = 9.7\times10^{-7}$——不可见。热谱带只在低频模式中显眼：$\mathrm{CO_2}$$667\ \mathrm{cm^{-1}}$的二重简并弯曲，室温下约$7\,\%$的分子处于$v_2 = 1$，其热谱带清晰可见。
:::
:::

如果倍频与组合带总是保持微弱，它们不过是些无关紧要的奇观。它们并不如此，因为有共振。

::: proposition 费米共振 {#prop-fermi}
设两个**同对称性**的振动态——一个基频$|a\rangle$与一个倍频或组合带$|b\rangle$——的未微扰能量$E_a^0$与$E_b^0$相差$\delta = E_a^0 - E_b^0$，势的三次非谐项以矩阵元$W = \langle a|\hat V_\mathrm{anh}|b\rangle$把它们耦合。观测能级为
$$
E_\pm = \tfrac12\left(E_a^0 + E_b^0\right) \pm \sqrt{\tfrac14\delta^2 + W^2},
$$ {#eq-fermi}
两者相互排斥，本征态是混合$\cos\theta\,|a\rangle \pm \sin\theta\,|b\rangle$，其中$\tan 2\theta = 2W/\delta$。因为只有基频携带强度，两条谱带按$\cos^2\theta : \sin^2\theta$**瓜分**强度；恰在共振处（$\delta = 0$）两者等强、相隔$2|W|$。
:::

::: proof
在两态空间中哈密顿矩阵为$\begin{pmatrix} E_a^0 & W \\ W & E_b^0\end{pmatrix}$；除非$\Gamma_a \times \Gamma_b$包含全对称不可约表示，即除非两态对称性相同，$W$为零，因为$\hat V_\mathrm{anh}$是全对称的。久期方程$(E_a^0 - E)(E_b^0 - E) - W^2 = 0$的根即式[[#eq-fermi]]。写成$E_a^0 = \bar E + \delta/2$、$E_b^0 = \bar E - \delta/2$，上分支本征矢为$(\cos\theta, \sin\theta)$，$\tan 2\theta = 2W/\delta$。从基态的跃迁矩：上态为$\cos\theta\,\mu_a + \sin\theta\,\mu_b \approx \cos\theta\,\mu_a$，下态为$-\sin\theta\,\mu_a$，故强度为$\mu_a^2\cos^2\theta$与$\mu_a^2\sin^2\theta$：总强度守恒，只是被重新分配。
:::

::: widget plot
f: sqrt(x^2/4 + w^2); -sqrt(x^2/4 + w^2); x/2; -x/2
x: -200, 200
y: -160, 160
sliders: w=51:0:120:1
labels: E_+ - \bar E; E_- - \bar E; \text{未微扰 } E_a^0; \text{未微扰 } E_b^0
caption: 把费米共振画成二能级问题（式[[#eq-fermi]]）：观测能级以其平均值$\bar E$为原点、以$\mathrm{cm^{-1}}$计，对未微扰间隔$\delta$（横轴，$\mathrm{cm^{-1}}$）作图，耦合$W$由滑块`w`设定。远离共振时能级沿未微扰态的直线走；在$\delta = 0$附近它们彼此回避、永不相交，最近距离为$2W$。把`w`设为$51$即重现$\mathrm{CO_2}$的$1285.4$与$1388.2\ \mathrm{cm^{-1}}$这一对；设为$0$，则当对称性禁阻耦合时能看到能级自由相交。
:::

::: example 二氧化碳的费米双线 {#ex-co2-fermi}
$\mathrm{CO_2}$的拉曼谱在预期有一条对称伸缩的地方显示$1285.4$与$1388.2\ \mathrm{cm^{-1}}$两条强带。解释它们，并估计耦合$W$。
::: solution
弯曲频率的两倍，$2\times667.4 = 1334.8\ \mathrm{cm^{-1}}$，几乎恰好落在对称伸缩基频处。$v_2 = 2$能级含有对称性为$\Sigma_\mathrm{g}^+$的分量——与$\nu_1$相同——故两态经三次非谐项耦合而混合。观测双线之中心$\tfrac12(1285.4 + 1388.2) = 1336.8\ \mathrm{cm^{-1}}$是未微扰能级的平均值，两者间隔为$2\sqrt{\delta^2/4 + W^2} = 102.8\ \mathrm{cm^{-1}}$。若未微扰能级彼此相差只有几个$\mathrm{cm^{-1}}$，则$\delta^2/4 \ll W^2$，$W \approx 102.8/2 = 51.4\ \mathrm{cm^{-1}}$；即使$\delta = 10\ \mathrm{cm^{-1}}$，估计也只变到$51.2\ \mathrm{cm^{-1}}$。于是混合接近$50{:}50$（$\delta = 10$时$\cos^2\theta = 0.55$），这就是两条谱带都强、以及问哪一条"才是"$\nu_1$毫无意义的原因。费米（Enrico Fermi）在1931年给出了这一解释；同样的效应产生醛的C–H双线（$2820$与$2720\ \mathrm{cm^{-1}}$附近：C–H伸缩与$1390\ \mathrm{cm^{-1}}$附近C–H弯曲的倍频）。
:::
:::

## 振动谱带的转动结构

在气相中，每个振动跃迁都带有转动精细结构，因为分子在吸收的同时可以改变转动状态。对平行带中的双原子或线性分子，选律$\Delta J = \pm1$在带原$\tilde\nu_0$之上给出R支、之下给出P支，中间隔着一段$\tilde\nu_0$处没有谱线的空隙——这个图样在[[quantum-chemistry/vibration-rotation]]中引入过。只要跃迁矩有垂直于分子轴的分量，多原子分子还会添上**Q支**（$\Delta J = 0$）：$\mathrm{CO_2}$在$667\ \mathrm{cm^{-1}}$的弯曲（垂直带，$\Pi_\mathrm{u}$）显示一条锐利的Q支，而$2349\ \mathrm{cm^{-1}}$的反对称伸缩（平行带，$\Sigma_\mathrm{u}^+$）没有。因此谱带的形状告诉你跃迁矩的方向——这是对称性指认的气相版本。

由于上、下振动能级的转动常数略有不同，各支并不等距，而干净地提取两个常数的办法是把共享同一能级的谱线配成对。

::: proposition 组合差 {#prop-comb-diff}
对下态常数为$\tilde B''$、上态常数为$\tilde B'$的谱带（两态中均用刚性转子项值$\tilde BJ(J+1)$），
$$
\tilde\nu_\mathrm{R}(J-1) - \tilde\nu_\mathrm{P}(J+1) = 4\tilde B''\left(J + \tfrac12\right),
\qquad
\tilde\nu_\mathrm{R}(J) - \tilde\nu_\mathrm{P}(J) = 4\tilde B'\left(J + \tfrac12\right).
$$ {#eq-comb-diff}
第一个差只依赖下态，第二个差只依赖上态。
:::

::: proof
R$(J-1)$从下能级$J-1$到上能级$J$，P$(J+1)$从下能级$J+1$到*同一个*上能级$J$。因此两者之差是两个下能级的间隔$\tilde B''\left[(J+1)(J+2) - (J-1)J\right] = \tilde B''(4J + 2)$。类似地，R$(J)$与P$(J)$从同一个下能级$J$出发、终止于上能级$J+1$与$J-1$，故两者之差为$\tilde B'\left[(J+1)(J+2) - (J-1)J\right] = 4\tilde B'(J + \tfrac12)$。带原与任何振动非谐性完全相消；离心畸变添上$(J + \tfrac12)^3$的小项。
:::

::: example 两个振动能级中HCl的转动常数 {#ex-hcl-comb}
$\mathrm{H^{35}Cl}$基频的谱线（由胡贝尔-赫茨伯格常数算出，与实测位置符合到约$0.02\ \mathrm{cm^{-1}}$）为R(0) $2906.24$、R(1) $2925.88$、P(1) $2865.10$、P(2) $2843.62\ \mathrm{cm^{-1}}$。求$\tilde B_0$、$\tilde B_1$与平均键长的变化。
::: solution
在式[[#eq-comb-diff]]中取$J = 1$，下态差为R(0) − P(2) $= 2906.24 - 2843.62 = 62.62\ \mathrm{cm^{-1}} = 6\tilde B_0$，故$\tilde B_0 = 10.437\ \mathrm{cm^{-1}}$。上态差为R(1) − P(1) $= 2925.88 - 2865.10 = 60.78\ \mathrm{cm^{-1}} = 6\tilde B_1$，故$\tilde B_1 = 10.130\ \mathrm{cm^{-1}}$。由于$\tilde B \propto 1/\langle r^{-2}\rangle$，大致如$1/r^2$，有效键长按因子$\sqrt{10.437/10.130} = 1.015$增大：在$v = 1$中分子平均长$1.5\,\%$，因为非谐势阱在外侧更宽。差$\tilde B_0 - \tilde B_1 = 0.307\ \mathrm{cm^{-1}}$就是振动-转动常数$\alpha_\mathrm{e}$（表中值$0.3072$），同一个常数也解释了为什么随$J$升高R支谱线挤拢、P支谱线散开。
:::
:::

::: widget plot
f: (300/t)*(sum((j+1)*exp(-15.02*j*(j+1)/t)/(1 + (x - 2885.98 - 10.133*(j+1)*(j+2) + 10.440*j*(j+1))^2/g^2), j, 0, 20) + sum(j*exp(-15.02*j*(j+1)/t)/(1 + (x - 2885.98 - 10.133*j*(j-1) + 10.440*j*(j+1))^2/g^2), j, 1, 20))
x: 2650, 3120
y: 0, 5
sliders: t=300:100:1000:10; g=1:0.8:15:0.1
labels: \text{吸收（相对）}
caption: 由$\tilde\nu_0 = 2885.98$、$\tilde B_0 = 10.440$与$\tilde B_1 = 10.133\ \mathrm{cm^{-1}}$模拟的$\mathrm{H^{35}Cl}$基频带，每条谱线以其玻尔兹曼布居与转动线强（R$(J)$为$J+1$，P$(J)$为$J$）加权。滑块`t`设定以开尔文计的温度，`g`设定每条谱线以$\mathrm{cm^{-1}}$计的半宽（仪器分辨率或压强加宽）。注意带原处的空隙、R支的收敛与P支的发散。把`g`升到约$10\ \mathrm{cm^{-1}}$以上，谱线便并成两个鼓包，即低分辨谱仪记录的P支与R支包络；把`t`升高，两个包络彼此分离，因为更高的$J$能级有了布居。（真实谱中每条线下方约$2\ \mathrm{cm^{-1}}$处还有一条较弱的$\mathrm{H^{37}Cl}$线。）
:::

在液体与溶液中，转动在皮秒之内被碰撞淬灭：精细结构消失，每条谱带都变成宽约$5$–$20\ \mathrm{cm^{-1}}$的单一轮廓。这就是凝聚相红外光谱只谈谱带位置与形状的原因，也是哪怕小分子的气相谱与同一化合物溶液的谱如此不同的原因。

## 拉曼散射

波长为$\tilde\nu_0$的光透过透明样品时，一小部分光被弹性散射（瑞利散射），而小得多的部分——通常不到瑞利强度的千分之一——以不同的波数$\tilde\nu_0 \mp \tilde\nu_\mathrm{vib}$射出。这个非弹性过程就是**拉曼散射**。它不是先吸收后发射：光子能量特意选在远离任何电子跃迁处，分子并不经过任何真实的中间态。

::: definition 拉曼散射与极化率 {#def-raman}
电场$\boldsymbol{\mathcal E}$感生偶极$\boldsymbol\mu_\mathrm{ind} = \boldsymbol\alpha\,\boldsymbol{\mathcal E}$，其中$\boldsymbol\alpha$是**极化率**张量（一个$3\times3$对称张量，其分量像$x^2$、$xy$、$\ldots$一样变换）。以较低波数$\tilde\nu_0 - \tilde\nu_\mathrm{vib}$散射的光构成**斯托克斯**线（分子终态在较高的振动能级）；$\tilde\nu_0 + \tilde\nu_\mathrm{vib}$处的光构成**反斯托克斯**线（分子从受激振动能级出发、终于较低能级）。**拉曼位移**$\tilde\nu_0 - \tilde\nu_\mathrm{scattered}$以$\mathrm{cm^{-1}}$报告，与激光波长无关。
:::

::: proposition 振动拉曼选律 {#prop-raman-rule}
只有当振动改变极化率时它才是拉曼活性的：$\left(\partial\boldsymbol\alpha/\partial Q\right)_0$的至少一个分量必须非零。谐振近似下选律为$\Delta v = \pm1$。等价地，由对称性表述：该振动必须按特征标表中的某个二次函数变换。
:::

::: proof
经典地，让场按$\mathcal E_0\cos(2\pi\nu_0 t)$振荡、简正坐标按$Q = Q_0\cos(2\pi\nu_\mathrm{vib}t)$振荡。把$\alpha(Q) = \alpha_0 + (\partial\alpha/\partial Q)_0\,Q + \cdots$展开，于是
$$
\mu_\mathrm{ind} = \alpha_0\mathcal E_0\cos(2\pi\nu_0t) + \tfrac12\left(\frac{\partial\alpha}{\partial Q}\right)_0 Q_0\mathcal E_0\left[\cos 2\pi(\nu_0 - \nu_\mathrm{vib})t + \cos 2\pi(\nu_0 + \nu_\mathrm{vib})t\right],
$$
其中用了$\cos a\cos b = \tfrac12[\cos(a-b) + \cos(a+b)]$。振荡偶极以其所含的各个频率辐射：$\nu_0$（瑞利）与$\nu_0 \mp \nu_\mathrm{vib}$（斯托克斯与反斯托克斯），后者仅当$(\partial\alpha/\partial Q)_0 \ne 0$时出现。量子力学中跃迁矩为$\langle v'|\boldsymbol\alpha|v\rangle\boldsymbol{\mathcal E}$，线性项给出$\langle v'|Q|v\rangle$，仅当$v' = v\pm1$时非零——与红外吸收中相同的升降算符矩阵元。由于$\boldsymbol\alpha$的分量像坐标的二重积一样变换，选律的对称性形式即由[[quantum-chemistry/molecular-symmetry]]的跃迁矩判据得出。
:::

两条选律是互补的，而不是重复的。不对称地移动电荷的振动（极性键伸缩，O–H或C=O）给出强红外谱带；改变一大片易极化电子云的尺寸或形状的振动（C=C、C–S或S–S键、芳环呼吸振动、金属-金属键）给出强拉曼谱带。对有**对称中心**的分子，这种互补变成绝对的：$x, y, z$是奇（u）而所有二次函数是偶（g），所以任何基频都不可能既红外活性又拉曼活性（**互斥律**，[[quantum-chemistry/molecular-symmetry]]中已对$\mathrm{CO_2}$演算过）。

还有两个可观测量使拉曼谱富有信息。其一是用平面偏振激发测定的**退偏比**$\rho = I_\perp/I_\parallel$：全对称振动给出偏振谱带，$0 \le \rho < \tfrac34$，其余所有振动给出$\rho = \tfrac34$，一片偏振片就能挑出全对称振动。其二是**反斯托克斯/斯托克斯强度比**，它测量受激能级的布居，从而无需接触地测量样品温度。

::: example 四氯化碳的斯托克斯与反斯托克斯线 {#ex-ccl4}
四氯化碳在$459\ \mathrm{cm^{-1}}$有一条强的全对称C–Cl伸缩。用$532.0\ \mathrm{nm}$激光，求斯托克斯与反斯托克斯线的波长以及它们在$298\ \mathrm{K}$下的强度比。
::: solution
激光波数为$\tilde\nu_0 = 1/(532.0\times10^{-7}\ \mathrm{cm}) = 18\,797\ \mathrm{cm^{-1}}$。斯托克斯：$18\,797 - 459 = 18\,338\ \mathrm{cm^{-1}}$，即$\lambda = 545.3\ \mathrm{nm}$；反斯托克斯：$18\,797 + 459 = 19\,256\ \mathrm{cm^{-1}}$，即$\lambda = 519.3\ \mathrm{nm}$。强度比是布居比乘以散射功率对频率的$\tilde\nu^4$依赖：
$$
\frac{I_\mathrm{aS}}{I_\mathrm{S}} = \left(\frac{\tilde\nu_0 + \tilde\nu_\mathrm{vib}}{\tilde\nu_0 - \tilde\nu_\mathrm{vib}}\right)^4 \mathrm{e}^{-hc\tilde\nu_\mathrm{vib}/k_\mathrm{B}T}
= \left(\frac{19\,256}{18\,338}\right)^4 \times \mathrm{e}^{-1.4388\times459/298} = 1.216 \times 0.109 = 0.133 .
$$
反斯托克斯线约为斯托克斯线的八分之一。对$992\ \mathrm{cm^{-1}}$的模式（苯的环呼吸振动）该比降到$0.013$，所以拉曼谱通常在斯托克斯一侧记录，反斯托克斯一侧则充当当低频模式的温度计。
:::
:::

::: quiz 选择哪种技术
一位化学家想在水溶液中跟踪一个对称取代烯烃$\mathrm{R_2C{=}CR_2}$（有对称中心）的C=C伸缩。哪种技术是更好的选择？
- [ ] 红外吸收，因为C=C伸缩在红外中总是强的。
- [x] 拉曼散射，因为该伸缩是偶（g）的、改变极化率，而且水是弱拉曼散射体。
- [ ] 两者皆可：对有对称中心的分子，红外与拉曼的选律相同。
- [ ] 都不行：对称的C=C伸缩在两种技术中都不活性。
::: solution
有对称中心时，对称的C=C伸缩是全对称的（$\mathrm{A_g}$）：它不改变偶极，红外非活性；但它强烈改变$\pi$电子云的极化率，给出一条强而偏振的拉曼谱带。水在红外的很大范围强吸收，在拉曼中却散射很弱，所以水溶液样品毫无困难。互斥律意味着两种技术的选律*互补*而不相同——而全对称伸缩从不会在两种技术中都不活性。
:::
:::

## 测量光谱：傅里叶变换仪器

老式红外光谱仪用光栅色散、一次让一个波长透过窄缝扫描。几乎所有现代仪器改而使用**迈克耳孙干涉仪**：分束器把一半光送往固定镜、一半送往动镜，两束光重新合并，检测器记录强度随**光程差**$\delta$（动镜位移的两倍）的变化。对波数为$\tilde\nu$的单色光，检测到的强度按$1 + \cos(2\pi\tilde\nu\delta)$振荡；对宽谱光源，每个波数贡献自己的余弦，记录下来的**干涉图**为
$$
I(\delta) = \int_0^\infty B(\tilde\nu)\left[1 + \cos(2\pi\tilde\nu\delta)\right]\mathrm{d}\tilde\nu ,
$$ {#eq-interferogram}
其振荡部分是光谱$B(\tilde\nu)$的余弦傅里叶变换。计算机把它反演（用快速傅里叶变换）即得光谱；样品谱除以背景谱即得透射比。

::: widget plot
f: cos(2*pi*1000*x/10000) + cos(2*pi*(1000 + d)*x/10000); 2*cos(pi*d*x/10000); -2*cos(pi*d*x/10000)
x: 0, 500
y: -2.4, 2.4
sliders: d=40:10:200:5
labels: \text{干涉图}; \text{包络}; \text{包络}
caption: 两条等强度的线$1000$与$1000 + d\ \mathrm{cm^{-1}}$的干涉图，横轴为以微米计的光程差。快振荡的周期是$10\ \mathrm{\mu m}$；拍频包络的周期是$1/d$（以厘米计），即$10^4/d\ \mathrm{\mu m}$。要分辨这两条线，动镜必须走得足够远以显出拍频：把`d`滑到$20$，第一个节点移到$250\ \mathrm{\mu m}$，于是只记录前$100\ \mathrm{\mu m}$就会让两条线无法区分。这就是分辨率法则$\Delta\tilde\nu \approx 1/\delta_\mathrm{max}$的由来。
:::

三个优势解释了为什么傅里叶变换红外（FTIR）取代了色散仪器。**多路传输（Fellgett）优势**：整个扫描期间每个波数都在被测量，所以对检测器噪声限制的仪器，信噪比提高约等于分辨率单元数的平方根。**通量（Jacquinot）优势**：圆形光阑比窄缝通过的光多得多。**波数精度（Connes）优势**：动镜位置由氦-氖参考激光的条纹跟踪，波数标尺在内部校准到优于$0.01\ \mathrm{cm^{-1}}$。取样方式也变了：多数常规光谱现在用**衰减全反射**（ATR）采集，把样品压在金刚石或锗晶体上，红外光束在晶体内全反射，因而只探测样品约头一微米，无需任何制样。

拉曼光谱仪使用激光（常用$532$、$633$、$785$或$1064\ \mathrm{nm}$）、抑制瑞利线的滤光片、光栅与CCD检测器。实际上的主要敌人是样品或杂质的**荧光**，它可能比拉曼散射强好几个数量级；改用近红外激发（$785$或$1064\ \mathrm{nm}$）通常能以牺牲$\tilde\nu^4$因子为代价避开它。拉曼仪器使用的激光通常为3B类或4类：光束及其镜面反射可造成永久性眼损伤，因此需要封闭的样品室、联锁装置与按波长额定的激光防护眼镜，调校工作只由受过训练的使用者按当地激光安全规程进行。

::: example 一次FTIR扫描的分辨率 {#ex-ftir-res}
某光谱仪的动镜从零光程差行进$0.25\ \mathrm{cm}$。标称分辨率是多少？它能分辨HCl的R(0)与R(1)线（相距$19.6\ \mathrm{cm^{-1}}$）以及$\mathrm{H^{35}Cl}$/$\mathrm{H^{37}Cl}$双线（相距约$2\ \mathrm{cm^{-1}}$）吗？
::: solution
光程差是动镜行程的两倍，$\delta_\mathrm{max} = 0.50\ \mathrm{cm}$，故$\Delta\tilde\nu \approx 1/\delta_\mathrm{max} = 2.0\ \mathrm{cm^{-1}}$。相距约$20\ \mathrm{cm^{-1}}$的相邻转动线轻松分辨；氯同位素双线恰好压在极限上，只会显示为肩峰。常规液体与固体样品以$4\ \mathrm{cm^{-1}}$测量（动镜只走$1.25\ \mathrm{mm}$），因为凝聚相谱带本来就比这更宽；$0.1\ \mathrm{cm^{-1}}$甚至更好的气相工作需要$10\ \mathrm{cm}$以上的光程差。
:::
:::

## 特征基团频率

前面各节把振动当作整个分子的简正振动。红外光谱的实用奇迹在于，某些振动仍然保持*定域*——连氢的键的伸缩几乎只带动那个轻原子，一条刚性重键的伸缩其频率远离其邻居们的频率，因而与它们弱耦合。这类模式在含有该基团的每个分子中几乎出现在同一波数。双原子推理$\tilde\nu = (1/2\pi c)\sqrt{k/\mu}$解释了主要分区：

- **轻原子高**：X–H伸缩（$\mu \approx 1\ \mathrm{u}$）落在$2500$到$3700\ \mathrm{cm^{-1}}$之间。
- **刚性键高**：三键（$k \approx 1600$–$1900\ \mathrm{N\,m^{-1}}$）在$2100$–$2260$，双键（$k \approx 950$–$1200$）在$1600$–$1850$，重原子之间的单键（$k \approx 400$–$500$）在$1300\ \mathrm{cm^{-1}}$以下。
- **约$1500\ \mathrm{cm^{-1}}$以下**是**指纹区**，频率相近的单键伸缩与弯曲强烈混合；单条谱带难以归属，但整体图样与参比谱比对就能识别化合物。

表中汇集最有用的谱带（凝聚相谱的区间，取自Socrates《红外与拉曼特征基团频率》以及Pretsch、Bühlmann与Badertscher《有机化合物的结构鉴定》；s = 强，m = 中，w = 弱）。

| 基团与振动 | $\tilde\nu/\mathrm{cm^{-1}}$ | 注记 |
|---|---|---|
| O–H伸缩，游离（稀溶液、气相） | $3650$–$3590$ | 锐，m |
| O–H伸缩，氢键醇 | $3550$–$3200$ | 宽，s |
| O–H伸缩，羧酸二聚体 | $3300$–$2500$ | 很宽，s，压在C–H带下 |
| N–H伸缩，胺或酰胺 | $3500$–$3300$ | m；NH$_2$给两条带，NH一条 |
| $\equiv$C–H伸缩 | $\approx 3300$ | 锐，s |
| =C–H伸缩（烯、芳烃） | $3100$–$3000$ | m |
| C–H伸缩，$\mathrm{sp^3}$ | $2960$–$2850$ | s |
| 醛C–H伸缩 | $\approx 2820$与$2720$ | m，费米双线 |
| C$\equiv$N伸缩 | $2260$–$2220$ | m，锐 |
| C$\equiv$C伸缩 | $2260$–$2100$ | w；对称则无 |
| C=O，酰氯 | $1815$–$1785$ | s |
| C=O，酸酐 | $\approx 1820$与$1760$ | s，两条带（耦合） |
| C=O，酯 | $1750$–$1735$ | s |
| C=O，醛 | $1740$–$1720$ | s |
| C=O，酮（无环、环己酮） | $\approx 1715$ | s |
| C=O，羧酸二聚体 | $1725$–$1700$ | s |
| C=O，共轭或芳基酮 | $1690$–$1665$ | s |
| C=O，酰胺（酰胺I带） | $1690$–$1630$ | s |
| C=C伸缩，烯 | $1680$–$1620$ | 强弱不定，对称则w |
| 芳环伸缩 | $\approx 1600$与$1500$ | m |
| $\mathrm{NO_2}$伸缩 | $\approx 1550$与$1350$ | s |
| C–O伸缩（醇、醚、酯） | $1300$–$1000$ | s |

羰基谱带值得专门研究，因为它的确切位置报告着$\mathrm{C{=}O}$基团周围的电子结构。

::: proposition 羰基伸缩的经验趋势 {#prop-carbonyl}
以下是经验规律（用所给的键级论证加以合理化，而非推导），对无强分子内相互作用的化合物的凝聚相谱有效：
1. 与C=C或芳环**共轭**使$\tilde\nu(\mathrm{C{=}O})$降低$20$–$40\ \mathrm{cm^{-1}}$（共振离域降低了C=O键级）。
2. 羰基碳上的**电负性取代基**（Cl、OR、O–C=O）使它升高（诱导效应压制极性共振式$\mathrm{C^+{-}O^-}$、缩短键）；**强共轭的孤对给予体**（酰胺的N）使它降低。酯（$\approx 1740$）与酰氯（$\approx 1800$）在酮之上；酰胺（$\approx 1660$）在酮之下。
3. **环张力**使它升高：环己酮$\approx 1715$、环戊酮$\approx 1745$、环丁酮$\approx 1780\ \mathrm{cm^{-1}}$，因为压缩羰基碳处的环角会把C=O伸缩与相邻C–C键的伸缩耦合起来，并使环外的C=O键获得更多的s成分。
4. 羰基氧上的**氢键**使它降低$10$–$50\ \mathrm{cm^{-1}}$。
:::

::: example 由基团频率求力常数 {#ex-force-co}
酮的C=O伸缩位于$1715\ \mathrm{cm^{-1}}$，醚的C–O伸缩在$1100\ \mathrm{cm^{-1}}$附近。把每个当作孤立的C–O振子，求力常数。该模型对$^{13}\mathrm{C{=}O}$羰基预言什么？
::: solution
折合质量$\mu = (12.000\times15.995)/(27.995) = 6.856\ \mathrm{u} = 1.1385\times10^{-26}\ \mathrm{kg}$。于是$k = \mu(2\pi c\tilde\nu)^2$：
$$
k(\mathrm{C{=}O}) = 1.1385\times10^{-26} \times \left(2\pi \times 2.9979\times10^{10} \times 1715\right)^2 = 1188\ \mathrm{N\,m^{-1}},
\qquad
k(\mathrm{C{-}O}) = 489\ \mathrm{N\,m^{-1}} .
$$
比值$2.4$接近双键对单键的预期。对$^{13}\mathrm{C}$，力常数不变（玻恩-奥本海默近似）而$\mu$变为$13.003\times15.995/28.998 = 7.172\ \mathrm{u}$，故$\tilde\nu = 1715\sqrt{6.856/7.172} = 1677\ \mathrm{cm^{-1}}$，位移$38\ \mathrm{cm^{-1}}$。用$^{13}\mathrm{C}$或$^{18}\mathrm{O}$（预测$1674\ \mathrm{cm^{-1}}$）做同位素标记，是断定一条谱带属于某个特定键的标准实验证明——在酶、催化剂与表面物种中皆然。实际位移比双原子预言略小，因为简正振动也会带动邻近原子。
:::
:::

::: example 区分四种C₄H₈O₂异构体 {#ex-isomers}
分子式同为$\mathrm{C_4H_8O_2}$的四种液体——乙酸乙酯、丁酸、3-羟基丁-2-酮与1,4-二氧六环——给出下列强谱带（此外还有$2900\ \mathrm{cm^{-1}}$附近的C–H伸缩）：**A** 宽$3450$、锐$1715$；**B** $1742$与$1240$，$3100$以上什么都没有；**C** 很宽的$3300$–$2500$，$1712$；**D** $1650$到$1850$之间以及$3100$以上什么都没有，$1120\ \mathrm{cm^{-1}}$强。归属它们。
::: solution
**D**既无C=O也无O–H，只有一条强C–O伸缩：它是环状二醚1,4-二氧六环。**C**显示羧酸的确凿图样——一条宽到（氢键二聚体）吞掉C–H伸缩的O–H带，加上$1710\ \mathrm{cm^{-1}}$附近的C=O：丁酸。**B**的C=O在酯位（$1742\ \mathrm{cm^{-1}}$），加上乙酸酯特征的$1240\ \mathrm{cm^{-1}}$附近强C–O–C伸缩，且无O–H：乙酸乙酯。**A**兼有氢键醇O–H（$3450$）与酮C=O（$1715$）：3-羟基丁-2-酮。注意其中的逻辑：缺席（无O–H、无C=O）与存在同样具有决定性，而O–H带的*形状*区分醇与酸。在[[spectroscopy/structure-problems]]中，同样的推理与核磁共振及质谱数据联合使用。
:::
:::

::: warning 基团频率是证据而非证明 {#warn-group-freq}
三种错误反复出现。第一，把一条谱带读成一个结构：$1715\ \mathrm{cm^{-1}}$的谱带与酮相容，但也与氢键酯或羧酸相容；要找支持谱带（C–O、O–H）与缺席。第二，忽视介质：O–H与N–H的位置和宽度通过氢键依赖浓度与溶剂，稀$\mathrm{CCl_4}$中$3620\ \mathrm{cm^{-1}}$的"游离"O–H在纯液体中变成$3350$附近的宽带。第三，过度解读指纹区——那里的谱带是许多内坐标的混合：用它与参比谱比对，而不是用来归属化学键。还要记住强度反映$(\partial\mu/\partial Q)^2$，而不只是基团的多少——一条弱的C≡C带不等于炔烃含量少。
:::

### 应用

红外与拉曼光谱的用途远在结构测定之外。$\mathrm{CO_2}$、$\mathrm{H_2O}$、$\mathrm{CH_4}$与$\mathrm{N_2O}$在热红外的振动谱带——以及$\mathrm{N_2}$与$\mathrm{O_2}$的透明（它们唯一的振动不改变偶极）——是温室效应的分子基础（[[environmental-chemistry/greenhouse-gases]]）。蛋白质的酰胺I带（$1690$–$1620\ \mathrm{cm^{-1}}$）随二级结构位移（$\alpha$-螺旋在$1655$附近，$\beta$-折叠在$1630$附近）。原位ATR与拉曼探头能在反应过程中实时跟踪反应物羰基的消失或产物谱带的增长。定量红外分析遵循[[analytical-chemistry/molecular-spectrometry]]讲述的朗伯-比尔定律。而具有微米级分辨的拉曼显微镜，不接触样品就能鉴定颜料、矿物与药物活性成分的多晶型。

## 后续内容

振动光谱学位于本课程两个相邻章节之间：纯转动（包括带$\Delta J = \pm 2$选律的转动拉曼效应）在[[spectroscopy/rotational-spectroscopy]]，而由弗兰克-康登因子支配、装饰在电子谱带上的振动序列在[[spectroscopy/electronic-spectroscopy]]。基团频率表与核磁共振（[[spectroscopy/nmr-structure]]）、质谱（[[spectroscopy/mass-spectrometry]]）一起，构成[[spectroscopy/structure-problems]]的三大支柱之一。简正振动频率可由电子结构计算的黑塞矩阵例行算出（[[computational-chemistry/potential-energy-surfaces]]），由它们构成的振动配分函数则输入[[statistical-thermodynamics]]的热力学。

::: history
赫歇尔（William Herschel）1800年把温度计放到太阳光谱的红端之外，发现了红外辐射。阿布尼（William Abney）与费斯廷（Edward Festing）1881年拍摄了许多有机液体的近红外吸收照片，注意到谱带跟原子基团走；而科布伦茨（William Coblentz）的《红外光谱研究》（*Investigations of Infra-red Spectra*，1905）逐点测量，使基团频率有了系统的基础。斯梅卡尔（Adolf Smekal）1923年预言了非弹性光散射；1928年拉曼（C. V. Raman）与克里希南（K. S. Krishnan）在加尔各答于液体中观测到它，兰茨贝格（Grigory Landsberg）与曼德尔施塔姆（Leonid Mandelstam）在莫斯科于石英晶体中独立观测到它；拉曼获1930年诺贝尔物理学奖。费米（Enrico Fermi）1931年解释了$\mathrm{CO_2}$那反常的拉曼双线。赫茨伯格的《多原子分子的红外与拉曼光谱》（*Infrared and Raman Spectra of Polyatomic Molecules*，1945）成为简正振动的标准参考书。迈克耳孙（Albert Michelson）1881年建造的那台干涉仪，在快速傅里叶变换（James Cooley与John Tukey，1965）和小型实验室计算机使干涉图的反演成为常规之后，成了现代光谱仪的心脏；1974年弗莱施曼（Martin Fleischmann）、亨德拉（Patrick Hendra）与麦奎兰（James McQuillan）观测到吡啶在粗化银电极上被极大增强的拉曼光谱，开表面增强拉曼光谱之先。
:::

::: summary
- $N$个原子的分子有$3N - 6$（线性分子$3N - 5$）个简正振动，即质量加权黑塞矩阵的本征矢；谐振近似下它们是独立谐振子，$E = \sum_k(v_k + \tfrac12)\hbar\omega_k$。
- 对称性决定活性：约化$\Gamma_{3N}$，减去平动与转动，像$x, y, z$一样变换的模式红外活性、像二次函数一样变换的拉曼活性；有对称中心时没有基频两者兼得。
- 非谐性把倍频放在$v\omega_\mathrm{e} - v(v+1)\omega_\mathrm{e}x_\mathrm{e}$，热谱带在基频以下$2\omega_\mathrm{e}x_\mathrm{e}$处，并以伯奇-斯波纳面积给出$D_0$；费米共振混合近简并的同对称能级并在其间瓜分强度（$\mathrm{CO_2}$：$1285.4$、$1388.2\ \mathrm{cm^{-1}}$）。
- 气相谱带显示P、（Q、）R支；组合差独立给出$4\tilde B''(J+\tfrac12)$与$4\tilde B'(J+\tfrac12)$（$\mathrm{HCl}$：$\tilde B_0 = 10.44$、$\tilde B_1 = 10.13\ \mathrm{cm^{-1}}$）。
- 拉曼散射要求$\partial\alpha/\partial Q \ne 0$；斯托克斯线占主导，反斯托克斯/斯托克斯比测量温度，退偏比认出全对称模式。
- FTIR记录干涉图，其傅里叶变换即光谱，分辨率$\approx 1/\delta_\mathrm{max}$，并具多路传输、通量与波数精度优势。
- 定域模式的基团频率源于$\tilde\nu \propto \sqrt{k/\mu}$：X–H伸缩在$2500$以上，三键在$2200$附近，C=O在$1650$–$1820\ \mathrm{cm^{-1}}$并有共轭、取代基与环张力的经验位移；同位素取代证实归属。
:::

## 习题

::: exercise 有多少个振动？ {level=1 check="30"}
苯$\mathrm{C_6H_6}$有多少个简正振动模式？（输入数目。）
::: solution
$N = 12$个原子，非线性：$3N - 6 = 36 - 6 = 30$。由于很高的$\mathrm{D_{6h}}$对称性，其中十个是二重简并对，不同的基频只剩$20$个；而互斥律意味着只有四个不同的基频红外活性、七个拉曼活性。
:::
:::

::: exercise 波数与波长 {level=1 check="5.83"}
某酮的羰基在$1715\ \mathrm{cm^{-1}}$吸收。所吸收辐射的波长是多少？（以微米输入。）
::: solution
$\lambda = 1/\tilde\nu = 1/(1715\ \mathrm{cm^{-1}}) = 5.831\times10^{-4}\ \mathrm{cm} = 5.83\ \mathrm{\mu m}$。中红外区$4000$–$400\ \mathrm{cm^{-1}}$对应$2.5$–$25\ \mathrm{\mu m}$；早期文献以微米报告位置，而换算是取倒数，不是成比例。
:::
:::

::: exercise 一条斯托克斯线 {level=1 check="561.6"}
苯的环呼吸振动的拉曼位移为$992\ \mathrm{cm^{-1}}$。用$532.0\ \mathrm{nm}$激光时它的斯托克斯线出现在什么波长？（以nm输入。）
::: solution
$\tilde\nu_0 = 10^7/532.0 = 18\,797.0\ \mathrm{cm^{-1}}$；斯托克斯线在$18\,797.0 - 992 = 17\,805.0\ \mathrm{cm^{-1}}$，即$\lambda = 10^7/17\,805.0 = 561.6\ \mathrm{nm}$。换用$785\ \mathrm{nm}$激光，同一位移把谱线放到$852\ \mathrm{nm}$：位移是固定的，绝对波长不是。
:::
:::

::: exercise 三氟化硼 {level=2 check="3"}
$\mathrm{BF_3}$是平面三角形（$\mathrm{D_{3h}}$）。证明$\Gamma_\mathrm{vib} = \mathrm{A_1'} + \mathrm{A_2''} + 2\mathrm{E'}$，并判断其红外谱中出现几条基频谱带。（输入红外谱带数。）
::: hint
类别$E, 2C_3, 3C_2, \sigma_h, 2S_3, 3\sigma_v$。数不动原子，对$S_3$用$-1 + 2\cos\theta$（$\theta = 120^\circ$）。在$\mathrm{D_{3h}}$中，$(x, y)$属$\mathrm{E'}$，$z$属$\mathrm{A_2''}$；$x^2 + y^2$、$z^2$属$\mathrm{A_1'}$，$(x^2 - y^2, xy)$属$\mathrm{E'}$。
:::
::: solution
不动原子数：$E$ 4，$C_3$ 1，$C_2$ 2，$\sigma_h$ 4，$S_3$ 1，$\sigma_v$ 2。每个原子的贡献：$3, 0, -1, 1, -2, 1$。故$\chi_{3N} = (12, 0, -2, 4, -2, 2)$。约化（$h = 12$）：$n(\mathrm{A_1'}) = \tfrac1{12}(12 + 0 - 6 + 4 - 4 + 6) = 1$，$n(\mathrm{A_2'}) = \tfrac1{12}(12 + 0 + 6 + 4 - 4 - 6) = 1$，$n(\mathrm{E'}) = \tfrac1{12}(24 + 0 + 0 + 8 + 4 + 0) = 3$，$n(\mathrm{A_1''}) = \tfrac1{12}(12 - 6 - 4 + 4 - 6) = 0$，$n(\mathrm{A_2''}) = \tfrac1{12}(12 + 6 - 4 + 4 + 6) = 2$，$n(\mathrm{E''}) = \tfrac1{12}(24 - 8 - 4) = 1$。平动$\mathrm{E'} + \mathrm{A_2''}$，转动$\mathrm{A_2'} + \mathrm{E''}$；故$\Gamma_\mathrm{vib} = \mathrm{A_1'} + \mathrm{A_2''} + 2\mathrm{E'}$（六个模式，与$3N - 6$相符）。红外活性的：$\mathrm{A_2''}$（面外弯曲）与两个$\mathrm{E'}$（反对称伸缩与面内弯曲）——**三**条谱带。拉曼活性的：$\mathrm{A_1'}$与两个$\mathrm{E'}$，也是三条；对称伸缩只出现在拉曼谱，面外弯曲只出现在红外，尽管分子并没有对称中心。
:::
:::

::: exercise 一氧化碳的非谐性 {level=2 check="13.24"}
$^{12}\mathrm{C}^{16}\mathrm{O}$的基频在$2143.27\ \mathrm{cm^{-1}}$，第一倍频在$4260.06\ \mathrm{cm^{-1}}$。求$\omega_\mathrm{e}x_\mathrm{e}$。（以$\mathrm{cm^{-1}}$输入。）也求出$\omega_\mathrm{e}$。
::: solution
由[[#eq-overtone]]：$2\omega_\mathrm{e}x_\mathrm{e} = 2(2143.27) - 4260.06 = 26.48$，故$\omega_\mathrm{e}x_\mathrm{e} = 13.24\ \mathrm{cm^{-1}}$，$\omega_\mathrm{e} = 2143.27 + 26.48 = 2169.75\ \mathrm{cm^{-1}}$（胡贝尔-赫茨伯格：$2169.81$与$13.29\ \mathrm{cm^{-1}}$）。比值$\omega_\mathrm{e}x_\mathrm{e}/\omega_\mathrm{e} = 0.0061$，是HCl的$0.0174$的三分之一：CO的三键又深，在光谱所采样的能级范围内几乎谐振。
:::
:::

::: exercise 一个氘位移 {level=2 check="2166"}
一个$\mathrm{sp^3}$ C–H伸缩位于$2950\ \mathrm{cm^{-1}}$。把它当作孤立的C–H振子，预测C–D伸缩。（以$\mathrm{cm^{-1}}$输入。）
::: solution
$\mu(\mathrm{CH}) = 12.000\times1.00783/13.00783 = 0.9297\ \mathrm{u}$，$\mu(\mathrm{CD}) = 12.000\times2.01410/14.01410 = 1.7246\ \mathrm{u}$。$k$不变，故$\tilde\nu(\mathrm{CD}) = 2950\sqrt{0.9297/1.7246} = 2950\times0.7342 = 2166\ \mathrm{cm^{-1}}$。实测C–D伸缩在$2100$–$2200\ \mathrm{cm^{-1}}$附近，那里其余地方几乎空着——这使氘标记一目了然，也使C–D键成为大分子中位点特异的探针。该因子接近但不恰好是$1/\sqrt2 = 0.707$，因为碳并非无限重。
:::
:::

::: exercise FTIR分辨率 {level=2 check="2"}
一台FTIR光谱仪要达到$0.5\ \mathrm{cm^{-1}}$的标称分辨率，最大光程差必须到达多少？（以cm输入。）动镜要移动多远？
::: solution
$\delta_\mathrm{max} \approx 1/\Delta\tilde\nu = 1/0.5 = 2\ \mathrm{cm}$；由于光程差是动镜位移的两倍，动镜移动$1\ \mathrm{cm}$。干涉图还必须至少以所含最高波数周期的两倍采样（奈奎斯特条件）：在$4000\ \mathrm{cm^{-1}}$处即每$1.25\ \mathrm{\mu m}$光程差一次，氦-氖参考条纹（$0.633\ \mathrm{\mu m}$）轻松满足。
:::
:::

::: exercise CO的伯奇-斯波纳解离能 {level=3 check="10.85"}
用$\omega_\mathrm{e} = 2169.81\ \mathrm{cm^{-1}}$与$\omega_\mathrm{e}x_\mathrm{e} = 13.288\ \mathrm{cm^{-1}}$，以线性伯奇-斯波纳外推估计CO的$D_0$。（以eV输入。）与热化学值$11.09\ \mathrm{eV}$比较并评论。
::: hint
线性外推等价于Morse关系$D_\mathrm{e} = \omega_\mathrm{e}^2/4\omega_\mathrm{e}x_\mathrm{e}$；减去$G(0)$。
:::
::: solution
$D_\mathrm{e} = 2169.81^2/(4\times13.288) = 88\,578\ \mathrm{cm^{-1}}$。$G(0) = \tfrac12(2169.81) - \tfrac14(13.288) = 1081.6\ \mathrm{cm^{-1}}$。故$D_0 = 87\,496\ \mathrm{cm^{-1}}$；以$1\ \mathrm{cm^{-1}} = 1.2398\times10^{-4}\ \mathrm{eV}$换算，$D_0 = 10.85\ \mathrm{eV}$。这比真值*低*$2\,\%$，而同样的步骤对$\mathrm{H_2}$的$D_0$高估约$5\,\%$（[[quantum-chemistry/vibration-rotation]]）。误差的方向取决于真实$\Delta G$曲线的弯曲：对CO，三次常数$\omega_\mathrm{e}y_\mathrm{e}$为正，高$v$处的间隔比线性规律预言的收缩得更慢，真实面积更大。由最低能级做线性外推——CO的Morse阶梯约有$80$个束缚能级——无论朝哪个方向都只是粗略估计。
:::
:::

::: exercise 已知失谐的费米共振 {level=3 check="0.55"}
观测到两个同对称的相互作用能级位于$1285.4$与$1388.2\ \mathrm{cm^{-1}}$。一个独立的力场计算把未微扰基频放在未微扰倍频以上$10\ \mathrm{cm^{-1}}$处。求$W$以及上能级中基频成分的比例$\cos^2\theta$。（输入$\cos^2\theta$。）
::: solution
观测间隔为$2\sqrt{\delta^2/4 + W^2} = 102.8$，故$\sqrt{25 + W^2} = 51.4$，$W = \sqrt{51.4^2 - 25} = 51.16\ \mathrm{cm^{-1}}$。由$\tan 2\theta = 2W/\delta$，$\cos 2\theta = (\delta/2)/\sqrt{\delta^2/4 + W^2} = 5/51.4 = 0.0973$，故$\cos^2\theta = \tfrac12(1 + \cos 2\theta) = 0.549 \approx 0.55$。上能级有$55\,\%$的基频成分、携带$55\,\%$的强度；下能级携带$45\,\%$。两条谱带强度之比$0.55/0.45 = 1.2$是$\delta$的直接实验测量——实践中未微扰位置就是这样得到的。
:::
:::

::: exercise 组合差 {level=3 check="10.43"}
$\mathrm{H^{35}Cl}$基频的另外两条线为R(1) $2925.88$与P(3) $2821.56\ \mathrm{cm^{-1}}$。导出合适的组合差并求$\tilde B_0$。（以$\mathrm{cm^{-1}}$输入$\tilde B_0$。）它为什么与[[#ex-hcl-comb]]中的值略有不同？
::: solution
R(1)与P(3)共享上能级$J = 2$，故由[[#eq-comb-diff]]取$J = 2$，R(1) − P(3) $= 4\tilde B_0(2 + \tfrac12) = 10\tilde B_0$。于是$\tilde B_0 = (2925.88 - 2821.56)/10 = 10.432\ \mathrm{cm^{-1}}$，对比$J = 1$一对得到的$10.437$。随$J$减小是离心畸变：把它计入，下态差为$(4\tilde B_0 - 6\tilde D_0)(J + \tfrac12) - 8\tilde D_0(J + \tfrac12)^3$，故表观$\tilde B_0$对$J = 1$的一对偏低$6\tilde D_0$、对$J = 2$的一对偏低$14\tilde D_0$；以$\tilde D_0 = 5.3\times10^{-4}\ \mathrm{cm^{-1}}$计算，两者为$0.003$与$0.007\ \mathrm{cm^{-1}}$，恰是观测到的漂移。把差除以$(J + \tfrac12)$再对$(J + \tfrac12)^2$作图是一条直线，截距$4\tilde B_0 - 6\tilde D_0$、斜率$-8\tilde D_0$——由一条带提取这两个常数的标准办法。
:::
:::
