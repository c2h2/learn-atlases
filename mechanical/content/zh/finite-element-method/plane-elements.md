杆与梁是一维的理想化：它们的应力状态由一两个内力描述。支架板、深梁的腹板、齿轮的轮齿或厚壁管的管壁无法这样描述——应力在一个二维区域上变化，而孔与圆角处的应力集中正是设计者需要知道的。本章构造第一批**连续体单元**：三节点**常应变三角形单元**与四节点**双线性四边形单元**，用于处于平面应力或平面应变状态的物体。处方就是[[finite-element-method/weak-forms]]中推导的那一个——虚功、形函数、伽辽金——现在用于二维，并由[[solid-mechanics/linear-elasticity]]中的弹性理论提供应力-应变关系。代数运算更繁重，所以围绕三个矩阵来组织：形函数矩阵$\mathbf{N}$、应变-位移矩阵$\mathbf{B}$与本构矩阵$\mathbf{D}$。一旦有了它们，每个单元刚度矩阵都具有同样的形式$\int\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,dV$。我们还将遇到有限单元的第一个严重失效：弯曲时过刚得多的四边形单元。

## 平面应力与平面应变

许多物体在一个方向上足够薄或足够长，使得应力与应变只依赖于$x$与$y$。

::: definition 平面应力与平面应变 {#def-plane}
若物体处处满足$\sigma_z = \tau_{xz} = \tau_{yz} = 0$，则它处于**平面应力**状态：在自身平面内受载、表面$z = \pm t/2$自由的薄板（支架、节点板、梁的腹板）。若$\varepsilon_z = \gamma_{xz} = \gamma_{yz} = 0$，则它处于**平面应变**状态：沿长度均匀受载、在$z$方向不能伸长的长柱体（大坝、挡土墙、长管道或隧道衬砌）。两种情况下，面内状态都由
$$
\boldsymbol{\varepsilon} = \begin{bmatrix} \varepsilon_x \\ \varepsilon_y \\ \gamma_{xy} \end{bmatrix} = \begin{bmatrix} \partial u/\partial x \\ \partial v/\partial y \\ \partial u/\partial y + \partial v/\partial x \end{bmatrix}, \qquad \boldsymbol{\sigma} = \begin{bmatrix} \sigma_x \\ \sigma_y \\ \tau_{xy} \end{bmatrix} = \mathbf{D}\,\boldsymbol{\varepsilon},
$$ {#eq-strain}
描述，其中$\gamma_{xy}$是工程切应变，$\mathbf{D}$是**本构矩阵**。
:::

::: proposition 本构矩阵 {#prop-D}
对弹性模量为$E$、泊松比为$\nu$的各向同性线弹性材料，
$$
\mathbf{D}_{\text{平面应力}} = \frac{E}{1 - \nu^2}\begin{bmatrix} 1 & \nu & 0 \\ \nu & 1 & 0 \\ 0 & 0 & \tfrac{1 - \nu}{2} \end{bmatrix}, \qquad \mathbf{D}_{\text{平面应变}} = \frac{E}{(1 + \nu)(1 - 2\nu)}\begin{bmatrix} 1 - \nu & \nu & 0 \\ \nu & 1 - \nu & 0 \\ 0 & 0 & \tfrac{1 - 2\nu}{2} \end{bmatrix}.
$$
在平面应力中，面外应变为$\varepsilon_z = -\nu(\sigma_x + \sigma_y)/E$；在平面应变中，面外应力为$\sigma_z = \nu(\sigma_x + \sigma_y)$。
:::

::: proof
三维胡克（Hooke）定律给出$\varepsilon_x = [\sigma_x - \nu(\sigma_y + \sigma_z)]/E$，$\varepsilon_y = [\sigma_y - \nu(\sigma_x + \sigma_z)]/E$，$\varepsilon_z = [\sigma_z - \nu(\sigma_x + \sigma_y)]/E$，以及$\gamma_{xy} = \tau_{xy}/G$，其中$G = E/[2(1 + \nu)]$。**平面应力：**令$\sigma_z = 0$，由前两个方程解出$\sigma_x, \sigma_y$：$\sigma_x = E(\varepsilon_x + \nu\varepsilon_y)/(1 - \nu^2)$，另一个对称；$\tau_{xy} = G\gamma_{xy} = \tfrac{E}{1 - \nu^2}\cdot\tfrac{1 - \nu}{2}\gamma_{xy}$。**平面应变：**令$\varepsilon_z = 0$，得$\sigma_z = \nu(\sigma_x + \sigma_y)$；代入前两个方程并求解，即得第二个矩阵。当$-1 < \nu < \tfrac12$时两个矩阵都是对称正定的；当$\nu \to \tfrac12$（不可压缩极限）时平面应变矩阵趋于无穷，这一事实将在[[finite-element-method/convergence-meshing]]中以体积闭锁的形式再次出现。
:::

## 二维中的虚功

对于占据区域$A$、厚度为$t$、承受体力$\mathbf{b}$（单位体积）并在部分边界$\Gamma_q$上承受面力$\mathbf{q}$（单位边界面积）的板，虚功原理为
$$
\int_A \delta\boldsymbol{\varepsilon}^{\mathsf T}\boldsymbol{\sigma}\,t\,dA = \int_A \delta\mathbf{u}^{\mathsf T}\mathbf{b}\,t\,dA + \int_{\Gamma_q}\delta\mathbf{u}^{\mathsf T}\mathbf{q}\,t\,ds
$$ {#eq-vw2d}
对每一个在受支承边界上为零的虚位移$\delta\mathbf{u} = [\delta u, \delta v]^{\mathsf T}$成立。这就是二维弱形式；它可以从平衡方程$\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y + b_x = 0$（及其$y$方向的对应方程）出发，乘以$\delta u$、$\delta v$并利用散度定理推导出来，正如在一维中利用分部积分那样。

在单元内部，由节点值插值位移，$\mathbf{u} = \mathbf{N}\mathbf{d}^{(e)}$。求导得到应变$\boldsymbol{\varepsilon} = \mathbf{B}\mathbf{d}^{(e)}$与应力$\boldsymbol{\sigma} = \mathbf{D}\mathbf{B}\mathbf{d}^{(e)}$。对$\delta\mathbf{u}$采用同样的插值（伽辽金），[[#eq-vw2d]]逐个单元地变为$\delta\mathbf{d}^{\mathsf T}(\mathbf{k}^{(e)}\mathbf{d} - \mathbf{f}^{(e)}) = 0$，其中
$$
\mathbf{k}^{(e)} = \int_{A_e}\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,dA, \qquad \mathbf{f}^{(e)} = \int_{A_e}\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA + \int_{\Gamma_e}\mathbf{N}^{\mathsf T}\mathbf{q}\,t\,ds.
$$ {#eq-kgeneral}
这两个公式就是线性静力有限元分析的全部；其余的只是$\mathbf{N}$的选择与积分的计算。

## 常应变三角形单元

二维中最简单的选择是具有三个角节点和线性位移场$u = \alpha_1 + \alpha_2x + \alpha_3y$（$v$相同）的三角形。三个系数，三个节点值：位移场由节点确定，沿每条边它是线性的，且只依赖于该边的两个节点，所以相邻三角形保持连接——网格是**协调的**。

::: proposition 常应变三角形单元（CST） {#prop-cst}
设三角形的节点1、2、3按逆时针编号，位于$(x_i, y_i)$，面积为
$$
A = \tfrac12\left[(x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1)\right],
$$
并以$(i, j, k)$表示$(1, 2, 3)$的轮换，定义
$$
b_i = y_j - y_k, \qquad c_i = x_k - x_j.
$$
线性形函数为$N_i = (a_i + b_ix + c_iy)/(2A)$，其中$a_i = x_jy_k - x_ky_j$，并且取$\mathbf{d}^{(e)} = [u_1, v_1, u_2, v_2, u_3, v_3]^{\mathsf T}$，
$$
\mathbf{B} = \frac{1}{2A}\begin{bmatrix} b_1 & 0 & b_2 & 0 & b_3 & 0 \\ 0 & c_1 & 0 & c_2 & 0 & c_3 \\ c_1 & b_1 & c_2 & b_2 & c_3 & b_3 \end{bmatrix}, \qquad \mathbf{k}^{(e)} = t\,A\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}.
$$ {#eq-cst}
:::

::: proof
$N_i$必须是线性的，在节点$i$处等于1，在节点$j$与$k$处等于0。函数$(a_i + b_ix + c_iy)$在节点$j$处为零：$x_jy_k - x_ky_j + (y_j - y_k)x_j + (x_k - x_j)y_j = 0$，在节点$k$处同样为零；在节点$i$处它等于三角形有向面积的两倍（展开以$[1, x, y]$为行的$3\times3$行列式），所以除以$2A$得1。于是$\partial N_i/\partial x = b_i/(2A)$与$\partial N_i/\partial y = c_i/(2A)$为常数，把$u = \sum N_iu_i$、$v = \sum N_iv_i$代入[[#eq-strain]]即得$\mathbf{B}$。由于$\mathbf{B}$与$\mathbf{D}$在单元上为常数，[[#eq-kgeneral]]中的积分为$tA\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$。若节点按顺时针编号，$A$为负——这是荒谬结果的常见来源，程序会对此进行检查。
:::

三角形的形函数$N_i$就是其**面积坐标**：点$P$处的$N_1$等于子三角形$P23$的面积除以$A$。它们处处相加为一（$N_1 + N_2 + N_3 = 1$），这使单元能作刚体平移；并且$\sum N_ix_i = x$，$\sum N_iy_i = y$，这使它能重现任何线性场——特别是任何常应变状态。代价是应变**只能**是常数：CST无法表示应变梯度，所以在应力变化的区域（弯曲、应力集中）需要细网格。

::: example 直角三角形的刚度 {#ex-cst-k}
一个CST的节点为1 $(0, 0)$、2 $(40, 0)$、3 $(0, 30)\,\mathrm{mm}$，厚度$t = 10\,\mathrm{mm}$，材料为钢，处于平面应力状态，$E = 200\,\mathrm{GPa}$，$\nu = 0.3$。计算$\mathbf{B}$与$\mathbf{k}^{(e)}$，并验证微小的刚体转动不产生节点力。
::: solution
$A = \tfrac12(40 \times 30 - 0) = 600\,\mathrm{mm^2}$。系数：$b_1 = y_2 - y_3 = -30$，$b_2 = y_3 - y_1 = 30$，$b_3 = y_1 - y_2 = 0$；$c_1 = x_3 - x_2 = -40$，$c_2 = x_1 - x_3 = 0$，$c_3 = x_2 - x_1 = 40$（mm）。所以
$$
\mathbf{B} = \frac{1}{1200}\begin{bmatrix} -30 & 0 & 30 & 0 & 0 & 0 \\ 0 & -40 & 0 & 0 & 0 & 40 \\ -40 & -30 & 0 & 30 & 40 & 0 \end{bmatrix}\ \mathrm{mm^{-1}}.
$$
$\mathbf{D} = \frac{200\,000}{0.91}[1, 0.3, 0; 0.3, 1, 0; 0, 0, 0.35] = [219\,780, 65\,934, 0;\ 65\,934, 219\,780, 0;\ 0, 0, 76\,923]\,\mathrm{MPa}$。乘出$tA\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$（单位kN/mm）：
$$
\mathbf{k}^{(e)} = \begin{bmatrix} 1337.0 & 714.3 & -824.2 & -384.6 & -512.8 & -329.7 \\ 714.3 & 1753.7 & -329.7 & -288.5 & -384.6 & -1465.2 \\ -824.2 & -329.7 & 824.2 & 0 & 0 & 329.7 \\ -384.6 & -288.5 & 0 & 288.5 & 384.6 & 0 \\ -512.8 & -384.6 & 0 & 384.6 & 512.8 & 0 \\ -329.7 & -1465.2 & 329.7 & 0 & 0 & 1465.2 \end{bmatrix}.
$$
例如$k_{33} = tA\,(b_2/2A)^2D_{11} + tA(c_2/2A)^2D_{33} = 6000 \times (1/40)^2 \times 219\,780 = 824.2\,\mathrm{kN/mm}$。

**校核。**矩阵是对称的。每一行的$x$元素（$k_{r1} + k_{r3} + k_{r5}$）之和为零，$y$元素之和也为零：刚体平移不产生力。绕原点的微小转动$\omega$使节点$i$移动$(-\omega y_i, \omega x_i)$，即$\mathbf{d} = \omega[0, 0, 0, 40, -30, 0]^{\mathsf T}$；于是$\mathbf{B}\mathbf{d} = \tfrac{\omega}{1200}[0, 0, 30 \cdot 40 - 40 \cdot 30] = \mathbf{0}$，所以没有应变，也没有力。三个零能模式（两个平移、一个转动）恰好是平面物体的刚体运动；出现第四个则意味着有错误。
:::
:::

::: example 由节点位移求应力 {#ex-cst-stress}
在某个模型中，[[#ex-cst-k]]的三角形有节点位移$u_1 = v_1 = 0$，$u_2 = 0.012\,\mathrm{mm}$，$v_2 = 0$，$u_3 = 0$，$v_3 = -0.003\,\mathrm{mm}$。求平面应力与平面应变下的应变与应力，以及平面应力下的米泽斯（von Mises）应力。
::: solution
$\boldsymbol{\varepsilon} = \mathbf{B}\mathbf{d}$：
$$
\varepsilon_x = \frac{30 \times 0.012}{1200} = 3.0\times10^{-4}, \quad \varepsilon_y = \frac{40 \times (-0.003)}{1200} = -1.0\times10^{-4}, \quad \gamma_{xy} = \frac{30 \times 0 + 40 \times 0}{1200} = 0.
$$
平面应力：$\sigma_x = 219\,780(3\times10^{-4}) + 65\,934(-1\times10^{-4}) = 59.3\,\mathrm{MPa}$，$\sigma_y = 65\,934(3\times10^{-4}) + 219\,780(-1\times10^{-4}) = -2.2\,\mathrm{MPa}$，$\tau_{xy} = 0$。米泽斯应力：$\sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} = 60.5\,\mathrm{MPa}$。

平面应变，$E/[(1 + \nu)(1 - 2\nu)] = 384\,615\,\mathrm{MPa}$：$\sigma_x = 384\,615(0.7 \times 3 - 0.3 \times 1)\times10^{-4} = 69.2\,\mathrm{MPa}$，$\sigma_y = 384\,615(0.3 \times 3 - 0.7 \times 1)\times10^{-4} = 7.7\,\mathrm{MPa}$，以及$\sigma_z = 0.3(69.2 + 7.7) = 23.1\,\mathrm{MPa}$。

**校核。**在平面应变中，同样的应变需要更大的应力，因为材料在$z$方向的收缩受到阻止；面外应力相当可观，在屈服校核中必须计入。应变在单元内每一点都相同，计算出的应力是该单元的唯一值——通常在形心处报告。
:::
:::

## 双线性四边形单元

三角形能适应任何形状，但刚硬而表现平平。四节点四边形单元是平面分析的主力。我们先把它取为宽$2a$、高$2b$的矩形，其**局部坐标**$\xi = (x - x_c)/a$与$\eta = (y - y_c)/b$从$-1$变到$1$；一般的四边形需要[[finite-element-method/isoparametric-elements]]中的映射。

::: definition 双线性四边形单元（Q4） {#def-q4}
节点1到4位于$(\xi, \eta) = (-1, -1), (1, -1), (1, 1), (-1, 1)$，**双线性形函数**为
$$
N_i(\xi, \eta) = \tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta), \qquad i = 1, \dots, 4,
$$
于是$u = \sum N_iu_i = \alpha_1 + \alpha_2\xi + \alpha_3\eta + \alpha_4\xi\eta$，$v$同样。应变矩阵$\mathbf{B}$按[[#eq-cst]]的模式由$\partial N_i/\partial x = a^{-1}\partial N_i/\partial\xi$与$\partial N_i/\partial y = b^{-1}\partial N_i/\partial\eta$构成，且$\mathbf{k}^{(e)} = \int_{-1}^{1}\int_{-1}^{1}\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,ab\,d\xi\,d\eta$（$8\times8$）。
:::

沿任一条边，$\xi, \eta$中有一个是固定的，所以位移场沿边是线性的，单元与其相邻单元以及CST都是协调的。在内部，附加项$\xi\eta$使$\varepsilon_x = \partial u/\partial x$随$y$线性变化——这正是弯曲所需要的。$\mathbf{k}^{(e)}$的被积函数对$\xi$与$\eta$各自是至多二次的多项式，所以对矩形单元，$2\times2$高斯积分能精确地积分它。

::: widget surface
f: (1+x)*(1+y)/4
x: -1, 1
y: -1, 1
contours: true
caption: Q4单元在其正方形$-1 \le \xi, \eta \le 1$上的双线性形函数$N_3 = \tfrac14(1 + \xi)(1 + \eta)$（图中取$x = \xi$，$y = \eta$）。旋转视图：该曲面是一个扭曲的平面（双曲抛物面）——沿每条$\xi$或$\eta$为常数的直线都是直的，所以位移场沿每条边是线性的并与相邻单元匹配，但沿对角线是弯曲的。等值线是双曲线而不是直线，这正是$\xi\eta$项的作用。
:::

## 边上的一致载荷

面力通过[[#eq-kgeneral]]中的边界积分转换为节点力。在线性单元长为$\ell$的一条边上，只有两个端节点的形函数非零，且它们沿边是线性的，所以这些积分就是[[finite-element-method/weak-forms]]中的一维积分：均匀面力$q$（应力单位）在每个端节点上给出$q\,t\,\ell/2$，从$q_i$线性变化到$q_j$的面力给出$\tfrac{t\ell}{6}(2q_i + q_j)$与$\tfrac{t\ell}{6}(q_i + 2q_j)$。对二次边（三个节点，如八节点单元），均匀面力按$\tfrac16 : \tfrac23 : \tfrac16$分配——并不均分，这一事实令凭直觉分配载荷的人感到意外。自重等体力按$\int\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA$分配；对CST，每个$N_i$在三角形上的积分为$A/3$，所以每个节点分得单元重量的三分之一。

::: example 四边形单元边上的压力 {#ex-edge}
在厚$10\,\mathrm{mm}$的板中，Q4单元一条长$60\,\mathrm{mm}$的边承受：(a) $5\,\mathrm{MPa}$的均匀法向压力；(b) 从节点$i$处的0线性变化到节点$j$处$6\,\mathrm{MPa}$的法向面力。求一致节点力。
::: solution
(a) 合力$5 \times 60 \times 10 = 3000\,\mathrm{N}$；每个节点分得$1500\,\mathrm{N}$，沿内法线方向。

(b) $\tfrac{t\ell}{6} = 100\,\mathrm{mm^2}$，所以$f_i = 100(2 \times 0 + 6) = 600\,\mathrm{N}$，$f_j = 100(0 + 2 \times 6) = 1200\,\mathrm{N}$。合力$1800\,\mathrm{N} = \tfrac12 \times 6 \times 60 \times 10$。

**校核。**各力之和等于合力，而在(b)中它们对节点$i$的矩为$1200 \times 60 = 72\,000\,\mathrm{N\,mm}$，等于合力乘以其力臂$1800 \times 40$：一致载荷同时保持了面力的力与力矩。
:::
:::

## 弯曲：寄生剪切

使单个Q4矩形单元处于纯弯曲：在一端的顶部与底部施加大小相等、方向相反的水平力。精确解中$u$正比于$xy$，且没有切应变。Q4能表示$u = \alpha\,\xi\eta$，而该模式给出了$\varepsilon_x$的正确线性变化。但它同时还给出$\gamma_{xy} = \partial u/\partial y = \alpha\xi/b$——这个切应变只在单元的中线上为零，并向单元两端增大。实际的梁在这里没有剪切；是单元制造了它。

::: proposition 矩形Q4单元的纯弯曲 {#prop-parasitic}
长$2a$、高$2b$、泊松比为$\nu$、处于平面应力状态的矩形Q4单元，在端部力偶作用下纯弯曲时，若其$\mathbf{k}^{(e)}$被精确积分（或用$2\times2$高斯积分），其转角为精确（梁理论）转角的
$$
\frac{\theta_{Q4}}{\theta_{\text{精确}}} = \frac{1 - \nu^2}{1 + \tfrac{1 - \nu}{2}\left(\tfrac{a}{b}\right)^2}
$$
倍。
:::

::: proof
在力偶作用下，单元按模式$u = \alpha\,\xi\eta = \alpha\,xy/(ab)$、$v = 0$变形（由对称性，不激发其他模式），$\varepsilon_x = \alpha y/(ab)$，$\varepsilon_y = 0$，$\gamma_{xy} = \alpha x/(ab)$。利用$\mathbf{D}_{\text{平面应力}}$以及$\int\!\!\int y^2\,dA = \tfrac43ab^3$、$\int\!\!\int x^2\,dA = \tfrac43a^3b$，其应变能为
$$
U_{Q4} = \frac{t\alpha^2}{2a^2b^2}\left[\frac{E}{1 - \nu^2}\cdot\frac43ab^3 + G\cdot\frac43a^3b\right] = \frac{2t\alpha^2}{3ab}\left[\frac{Eb^2}{1 - \nu^2} + Ga^2\right].
$$
在精确解中，同样的端部位移产生$\varepsilon_x = \alpha y/(ab)$，且$\sigma_y = 0$（所以$\varepsilon_y = -\nu\varepsilon_x$可以自由发生），没有剪切：$U_{\text{精确}} = \tfrac12\int E\varepsilon_x^2\,t\,dA = \frac{2t\alpha^2}{3ab}Eb^2$。对同样的力偶，转角与模式刚度成反比，即$\theta_{Q4}/\theta_{\text{精确}} = U_{\text{精确}}/U_{Q4}$；利用$G/E = 1/[2(1 + \nu)]$即得所述比值。有两个效应使单元过刚：因子$1 - \nu^2$，因为单元不能横向收缩（$\varepsilon_y = 0$）；以及寄生剪切能，它随长宽比$a/b$的平方增大。
:::

对$\nu = 0.3$的正方形单元，该比值为$0.674$；长度为高度两倍的单元为$0.379$；四倍时为$0.138$。这就是**剪切闭锁**：在弯曲主导区域中细长的Q4单元刚得惊人，而根本无法表示应变梯度的CST更差。补救措施——减缩积分、非协调模式、假设应变表述与二次单元——将在[[finite-element-method/isoparametric-elements]]和[[finite-element-method/convergence-meshing]]中讨论。

::: widget plot
f: (1-nu^2)/(1+(1-nu)/2*x^2)
x: 0.25, 6
y: 0, 1
sliders: nu=0.3:0:0.49:0.01
labels: \theta_{Q4}/\theta_\text{精确}
points: 1,0.6741; 2,0.3792; 4,0.1379
caption: 单个Q4矩形单元在纯弯曲下的转角占精确值的比例，随长宽比$a/b$（长度与高度之比）的变化。标出的点对应$\nu = 0.3$。即使是正方形单元也刚了三分之一，而刚度误差随长宽比的平方增大。改变$\nu$：曲线几乎不动——问题在于寄生剪切，而不在于材料。
:::

::: example 用三角形单元与四边形单元计算悬臂板 {#ex-cantilever}
一块钢悬臂板（$E = 200\,\mathrm{GPa}$，$\nu = 0.3$，平面应力）长$1000\,\mathrm{mm}$、高$100\,\mathrm{mm}$、厚$10\,\mathrm{mm}$，沿左边完全固定，右边承受按抛物线分布（如梁理论的切应力）的$10\,\mathrm{kN}$向下端部载荷。用正方形单元划分网格：$n_x \times n_y$个Q4单元，或把同样的正方形各分成两个CST。把端部挠度与梁理论比较。
::: solution
**参考值。**$I = th^3/12 = 8.333\times10^{5}\,\mathrm{mm^4}$；欧拉-伯努利理论$PL^3/(3EI) = 20.00\,\mathrm{mm}$；加上铁木辛柯剪切修正$PL/(\kappa GA)$，$\kappa = 5/6$，$G = 76.9\,\mathrm{GPa}$，总计$20.16\,\mathrm{mm}$。

**有限元结果**（受载边的平均竖向位移，用一个小程序计算）：

| 网格 $n_x \times n_y$ | 自由度（总数） | CST (mm) | 比值 | Q4 (mm) | 比值 |
|---|---|---|---|---|---|
| $10 \times 1$ | 44 | 4.62 | 0.229 | 13.58 | 0.674 |
| $20 \times 2$ | 126 | 10.83 | 0.537 | 17.91 | 0.888 |
| $40 \times 4$ | 410 | 16.54 | 0.820 | 19.50 | 0.968 |
| $80 \times 8$ | 1458 | 19.08 | 0.947 | 19.96 | 0.990 |

**解释。**用一层正方形Q4单元时比值为$0.674$——恰好是[[#prop-parasitic]]对单个单元的预测，因为每个单元都处于近似纯弯曲。单元尺寸每减半一次，Q4误差大约缩小为1/3到1/4；CST误差起初下降缓慢（77 %到46 %），只有在细网格上才达到类似的速率。沿弯曲构件高度只有一两个单元的模型不是粗糙的模型，而是错误的模型。CST网格需要1458个自由度才能接近5 %的精度，而[[finite-element-method/trusses-frames]]中的梁单元用2个自由度就能精确得到这一结果。
:::
:::

::: warning 平面应力还是平面应变，厚度取多少？
有两种输入错误很常见，而且在输出中看不出来。**错误的理想化**：按平面应力分析又厚又长的构件会过柔，并会漏掉其面外应力$\sigma_z = \nu(\sigma_x + \sigma_y)$，而它对屈服或断裂可能很重要；按平面应变分析薄板则会过刚。**厚度**：在平面应力中$t$乘在每个刚度和载荷上；在平面应变中要求输入“厚度”的程序通常只用它来缩放单位长度上的载荷，而$t = 1$的模型报告的是单位厚度上的力。在读取任何应力之前，先用手算静力学——计入厚度——确认约束力的总和。
:::

## 二维结果的组装与解读

组装就是[[finite-element-method/direct-stiffness]]中的程序，只是现在每个节点有两个自由度：单元元素$(2a - 1, 2b)$进入整体元素$(2I - 1, 2J)$，依此类推。支承至少要消除平面物体的三种刚体运动——例如约束一个节点的两个自由度，以及另一个不与之共线的节点的一个自由度。结果以节点位移和采样点处的单元应力的形式给出。由于CST与Q4的应变在单元之间不连续，绘制的云图通常在节点处进行**平均**，这使它们变得光滑，却掩盖了跳跃的大小；平均与未平均应力之间的差异是离散误差的一个廉价而有用的指标，将在[[finite-element-method/convergence-meshing]]中展开。

::: quiz
一个薄支架沿承受弯曲载荷的悬臂用一层细长的Q4单元划分网格。模型预测的挠度比梁的计算值低40 %。最可能的解释是什么？
- [ ] 梁的计算忽略了剪切变形，使其过刚。
- [x] 单元发生剪切闭锁：一层粗糙的细长Q4单元在弯曲中产生寄生切应变，刚得多。
- [ ] 支架应当按平面应变建模。
- [ ] Q4单元在弯曲时过柔，所以梁的计算一定是错的。
::: solution
忽略剪切变形会使梁的计算略微低估挠度——与观察到的相反——而且对细长悬臂影响很小。平面应变会使模型更刚。弯曲中的单层细长Q4单元是寄生剪切的典型情形（[[#prop-parasitic]]）：应沿高度使用若干个单元、采用接近正方形的形状，或使用为避免闭锁而构造的单元。
:::
:::

::: history
常应变三角形单元有两个独立的来源。特纳、克拉夫、马丁与托普1956年的论文通过假设每个三角形内的位移场为线性，为三角翼的蒙皮板推导了它以及矩形单元。1960年，克拉夫（Ray Clough）在匹兹堡举行的第二届美国土木工程师学会电子计算会议上发表的“The finite element method in plane stress analysis”中，又用虚功为一般平面应力问题推导了它——正是这篇论文为该方法命名。随后克拉夫及其伯克利团队把它应用于混凝土坝，这是最早的大型连续体分析之一。低阶单元在弯曲中的弱点几乎立即被认识到，此后几十年的单元研究——非协调模式、减缩积分、假设应变——大多旨在消除它。
:::

::: summary
- 平面应力（$\sigma_z = 0$，薄板）与平面应变（$\varepsilon_z = 0$，长物体）共用应变向量$[\varepsilon_x, \varepsilon_y, \gamma_{xy}]$，但$\mathbf{D}$不同；在平面应变中$\sigma_z = \nu(\sigma_x + \sigma_y)$。
- 每个单元都由虚功得出：$\mathbf{k}^{(e)} = \int\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,dA$，$\mathbf{f}^{(e)} = \int\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA + \int\mathbf{N}^{\mathsf T}\mathbf{q}\,t\,ds$。
- CST具有线性位移与常应变；$\mathbf{B}$由$b_i = y_j - y_k$、$c_i = x_k - x_j$构成，$\mathbf{k} = tA\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$。它的三个零能模式就是刚体运动。
- Q4具有双线性形函数$\tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta)$，沿边是线性的，其应变在单元内变化。
- 边上的一致载荷：对线性边，均匀面力每个节点分得$\tfrac12 qt\ell$；对二次边按$\tfrac16 : \tfrac23 : \tfrac16$分配。
- 在弯曲中，Q4单元产生寄生剪切而闭锁：矩形单元的转角只有精确值的$(1 - \nu^2)/[1 + \tfrac{1 - \nu}{2}(a/b)^2]$；CST更差。应沿高度使用若干个单元。
:::

## 习题

::: exercise 三角形的面积 {level=1 check="1200"}
一个CST的节点位于$(0, 0)$、$(60, 0)$与$(20, 40)\,\mathrm{mm}$。计算$b_i$、$c_i$与面积。（以mm²为单位输入$A$。）
::: solution
$b_1 = 0 - 40 = -40$，$b_2 = 40 - 0 = 40$，$b_3 = 0 - 0 = 0$；$c_1 = 20 - 60 = -40$，$c_2 = 0 - 20 = -20$，$c_3 = 60 - 0 = 60$。$A = \tfrac12(60 \times 40 - 20 \times 0) = 1200\,\mathrm{mm^2}$。校核：$\sum b_i = \sum c_i = 0$，且$2A = b_2c_3 - b_3c_2 = 40 \times 60 = 2400$。
:::
:::

::: exercise 平面应变中的面外应力 {level=1 check="42"}
对长钢制隧道衬砌（$\nu = 0.3$）的平面应变分析在某点给出$\sigma_x = 100\,\mathrm{MPa}$与$\sigma_y = 40\,\mathrm{MPa}$。$\sigma_z$是多少？（以MPa为单位输入。）
::: solution
$\sigma_z = \nu(\sigma_x + \sigma_y) = 0.3 \times 140 = 42\,\mathrm{MPa}$。
:::
:::

::: exercise 均匀面力的节点力 {level=1 check="400"}
在厚$8\,\mathrm{mm}$的板中，$2\,\mathrm{MPa}$的均匀切向面力沿Q4单元一条长$50\,\mathrm{mm}$的边作用。两个边节点各分得多大的切向力？（以N为单位输入。）
::: solution
合力$2 \times 50 \times 8 = 800\,\mathrm{N}$；每个节点沿边分得$400\,\mathrm{N}$。
:::
:::

::: exercise 三角形中的切应力 {level=2 check="76.92"}
[[#ex-cst-k]]的三角形有节点位移$u_1 = v_1 = 0$，$u_2 = 0$，$v_2 = 0.020\,\mathrm{mm}$，$u_3 = 0.015\,\mathrm{mm}$，$v_3 = 0$。求$\varepsilon_x$、$\varepsilon_y$、$\gamma_{xy}$与切应力。（以MPa为单位输入$\tau_{xy}$。）
::: solution
由$\mathbf{B}$：$\varepsilon_x = (30u_2)/1200 = 0$；$\varepsilon_y = (-40v_1 + 40v_3)/1200 = 0$；$\gamma_{xy} = (-40u_1 - 30v_1 + 30v_2 + 40u_3)/1200 = (0.60 + 0.60)/1200 = 1.0\times10^{-3}$。$\tau_{xy} = G\gamma_{xy} = 76\,923 \times 10^{-3} = 76.92\,\mathrm{MPa}$。位移场$u = 0.015y/30$、$v = 0.020x/40$是纯剪切（每条边以相反方向转过$5\times10^{-4}$）。
:::
:::

::: exercise 弯曲中的细长单元 {level=2 check="0.37917"}
利用[[#prop-parasitic]]，长度为高度两倍（$a/b = 2$）的单个Q4矩形单元在纯弯曲中给出精确转角的多大比例？取$\nu = 0.3$。（输入该比值。）
::: solution
$(1 - 0.09)/(1 + 0.35 \times 4) = 0.91/2.4 = 0.3792$。该单元刚了2.6倍。
:::
:::

::: exercise 静水压力载荷 {level=2 check="1200"}
一个小型受压板模型（平面应力，厚度$10\,\mathrm{mm}$）壁中Q4单元的竖直边长$60\,\mathrm{mm}$，承受从上方节点$i$处的0线性增大到下方节点$j$处$6\,\mathrm{MPa}$的流体压力。求节点$j$处的一致节点力。（以N为单位输入。）
::: solution
$t\ell/6 = 10 \times 60/6 = 100\,\mathrm{mm^2}$：$f_j = 100(q_i + 2q_j) = 100 \times 12 = 1200\,\mathrm{N}$，$f_i = 100(2q_i + q_j) = 600\,\mathrm{N}$。若把合力$1800\,\mathrm{N}$平均分配，每个节点分得$900\,\mathrm{N}$，其作用线会偏离$10\,\mathrm{mm}$。
:::
:::

::: exercise 平面应力矩阵 {level=3}
由三维胡克定律推导$\mathbf{D}_{\text{平面应力}}$，并证明它正定当且仅当$-1 < \nu < 1$。然后推导$\mathbf{D}_{\text{平面应变}}$，并从物理上解释为什么当$\nu \to \tfrac12$时它的元素无界增大，而$\mathbf{D}_{\text{平面应力}}$的元素不会。
::: solution
按[[#prop-D]]的证明：取$\sigma_z = 0$，$\begin{bmatrix}\varepsilon_x \\ \varepsilon_y\end{bmatrix} = \frac1E\begin{bmatrix} 1 & -\nu \\ -\nu & 1\end{bmatrix}\begin{bmatrix}\sigma_x \\ \sigma_y\end{bmatrix}$，求$2\times2$矩阵的逆得$\frac{E}{1 - \nu^2}[1, \nu; \nu, 1]$。其特征值为$E/(1 - \nu)$与$E/(1 + \nu)$，当$-1 < \nu < 1$时为正，而剪切元素$G = E/[2(1 + \nu)] > 0$要求$\nu > -1$。在平面应变中，$\varepsilon_z = 0$迫使$\sigma_z = \nu(\sigma_x + \sigma_y)$，面内矩阵（对等双轴应变）的特征值为$E/[(1 + \nu)(1 - 2\nu)]$，它是平面应变体积模量$K + G/3$的两倍，并在$\nu = \tfrac12$时变为无穷大。从物理上看，一个既不能改变体积、又不能在$z$方向膨胀的平面应变物体，根本无法容纳面内面积的变化；而平面应力板总可以变厚或变薄，所以其面内刚度保持有限。
:::
:::

::: exercise 刚体模式与支承 {level=3}
(a) 证明单个CST恰好有三个独立的零能位移模式。(b) 一个支架的平面模型通过固定一个节点的两个自由度以及其正上方第二个节点的$x$自由度来支承。它的支承是否恰当？(c) 对承受自平衡力（例如两个大小相等、方向相反的拉力）的板，提出一种既能消除刚体运动、又不引入人为应力的支承布置，并解释原因。
::: solution
(a) $\mathbf{B}$是秩为3的$3 \times 6$矩阵（当$A \neq 0$时其各行线性无关），所以其零空间的维数为3，而由于$\mathbf{D}$正定，$\mathbf{k} = tA\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$具有相同的零空间。两个平移与刚体转动都属于该零空间且线性无关，所以它们张成了这个零空间。(b) 固定一个节点消除了两个平移，第二个约束必须阻止绕该固定节点的转动。绕固定节点的转动使其正上方的节点沿水平方向移动，所以约束该节点的$x$自由度确实阻止了转动——模型**是**支承恰当的。如果第二个约束是正上方节点的$y$自由度，就不行了（精确到一阶，转动只使该节点沿$x$移动）。(c) 对自平衡载荷，在二维中使用最少的“3-2-1”约束组：在一个节点处固定$u$与$v$，在第二个节点处固定一个能阻止转动的自由度（如(b)所述）。这三个约束是静定的，所以当载荷平衡时它们的约束力为零；任何附加约束都是多余的，会引起约束力和虚假应力。检查计算出的约束力（几乎）为零，即可确认载荷确实是平衡的。
:::
:::

::: exercise 为支架选择网格 {level=3}
一个厚$8\,\mathrm{mm}$的钢制L形支架，两臂长$120\,\mathrm{mm}$、宽$30\,\mathrm{mm}$，内角有半径$5\,\mathrm{mm}$的圆角；它在一臂上用螺栓固定，在另一臂的端部受载。你必须估计圆角处的峰值应力和受载端的挠度。确定理想化方式、单元类型与网格策略，并说明你将如何检验答案是否充分。用[[#ex-cantilever]]中的悬臂表来论证沿臂宽所需的单元数。
::: solution
在自身平面内受载的8 mm厚板处于平面应力状态。两臂处于弯曲，所以由该表可知，沿30 mm宽度至少需要四个（最好八个）接近正方形的Q4单元，才能使挠度误差在百分之几以内；或用较少的二次单元。圆角是半径5 mm的应力集中，所以那里的单元尺寸应为1 mm量级或更小（沿四分之一圆弧有若干个单元），并平滑地过渡到较粗的臂部网格；三角形单元便于过渡，但应避免用在弯曲主导的臂部。螺栓区域需要审慎的理想化（在螺栓孔表面上采用接触或分布约束，而不是单个固定节点，后者会造成人为的奇异性）。校核：约束力等于外加载荷；把挠度与将每臂视为悬臂的手算估计比较；把峰值应力与手册中圆角转角的应力集中系数比较；以及进行加密研究——把圆角附近的单元尺寸减半，确认峰值应力的变化只有百分之几。所得结果是分析估计，而不是设计批准；支架仍须按相关设计标准进行校核。
:::
:::
