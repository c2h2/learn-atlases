轨道是化学家的工作语言——我们往轨道里填电子、画轨道的形状、谈论HOMO与LUMO——但多电子分子的精确波函数里根本没有任何轨道：它是全部电子坐标的一个整体函数。**哈特里-福克方法**给出轨道图像的确切含义，以及它能做到的极限。它问的是：如果波函数必须是单电子函数的单个反对称化乘积（一个斯莱特行列式），那么哪些轨道给出最低的能量？答案是一组耦合方程，其中每个电子在其他所有电子的平均场中运动；而这个场又依赖于正在求解的轨道，所以方程必须*自洽地*求解。哈特里-福克通常收回分子总能量的$99\ \%$以上；缺失的那零点几个百分点——**相关能**——与化学键的能量相当，这就是哈特里-福克既不可或缺又不够用的原因。本课推导哈特里-福克方程，把它们化为程序求解的矩阵方程，并完整演算两个计算——极小基组下的$\mathrm{H_2}$与$\mathrm{HeH^{+}}$——其中每个数字你都可以自己复现。

全课采用**原子单位**：$\hbar = m_e = e = 4\pi\varepsilon_0 = 1$，于是能量以哈特里（$1\ \mathrm{E_h} = 27.2114\ \mathrm{eV} = 2625.50\ \mathrm{kJ\,mol^{-1}}$）、长度以玻尔（$1\ a_0 = 0.529177\ \mathrm{\AA}$）为单位。固定核下$N$个电子的电子哈密顿量（[[quantum-chemistry/chemical-bond-qm]]）为
$$
\hat H = \sum_{i=1}^{N} \hat h(i) + \sum_{i<j} \frac{1}{r_{ij}}, \qquad \hat h(i) = -\tfrac{1}{2}\nabla_i^{2} - \sum_A \frac{Z_A}{r_{iA}} .
$$ {#eq-hamiltonian}
一体算符$\hat h$是动能加上对所有核的吸引；电子排斥$1/r_{ij}$是使问题无法分离的那一项。

## 斯莱特行列式

电子是费米子，所以交换任意两个电子的坐标（空间与自旋）时波函数必须变号。轨道的简单乘积做不到这一点；反对称化乘积可以，而行列式是它的紧凑写法（[[quantum-chemistry/many-electron-atoms]]在原子情形引入了它）。

::: definition 自旋轨道与斯莱特行列式 {#def-slater}
**自旋轨道**$\chi(\mathbf{x}) = \psi(\mathbf{r})\,\sigma(\omega)$是空间轨道$\psi$乘以自旋函数$\sigma = \alpha$或$\beta$，其中$\mathbf{x} = (\mathbf{r}, \omega)$。给定$N$个正交归一的自旋轨道，**斯莱特行列式**
$$
\Phi(\mathbf{x}_1, \dots, \mathbf{x}_N) = \frac{1}{\sqrt{N!}}
\begin{vmatrix}
\chi_1(\mathbf{x}_1) & \chi_2(\mathbf{x}_1) & \cdots & \chi_N(\mathbf{x}_1) \\
\chi_1(\mathbf{x}_2) & \chi_2(\mathbf{x}_2) & \cdots & \chi_N(\mathbf{x}_2) \\
\vdots & \vdots & & \vdots \\
\chi_1(\mathbf{x}_N) & \chi_2(\mathbf{x}_N) & \cdots & \chi_N(\mathbf{x}_N)
\end{vmatrix}
$$
是归一化的、反对称的：交换两个电子就是交换两行并改变符号。若两个自旋轨道相同，则两列相同而$\Phi = 0$——这就是泡利原理。我们把它简记为$\lvert\chi_1\chi_2\cdots\chi_N\rangle$。
:::

反对称性带来超越泡利不相容的一个推论。在行列式中，*自旋相同*的两个电子同时出现在同一点的概率密度为零，在其附近也被压低：每个电子周围都有一个**费米空穴**，其他同自旋电子被排除在外。相反，*自旋相反*的电子在单个行列式中毫不相关——找到其中一个的概率与另一个在哪里无关。这一不对称正是哈特里-福克一切失误的根源。

::: widget contour
f: (sin(pi*x)*sin(2*pi*y) - s*sin(2*pi*x)*sin(pi*y))^2
x: 0, 1
y: 0, 1
levels: 16
gradient: false
point: 0.3, 0.7
sliders: s=1:-1:1:0.05
caption: 两个电子在一维箱中的对密度（位置$x_1 = x$、$x_2 = y$，箱长$1$），它们占据最低的两个轨道$\sin\pi x$与$\sin 2\pi x$。$s = 1$时是同号自旋的行列式$\lvert\phi_1(x_1)\phi_2(x_2) - \phi_2(x_1)\phi_1(x_2)\rvert^{2}$：它沿整条对角线$x_1 = x_2$消失——这就是费米空穴。$s = 0$时是简单的哈特里乘积，没有空穴：电子彼此无视。（$s = -1$是玻色子适用的对称组合，它们会在对角线上*成堆聚拢*。）
:::

单个行列式的能量可以用轨道上的一体与二体积分写出。空间轨道的双电子积分采用**化学家记号**
$$
(ij|kl) = \iint \psi_i^{*}(\mathbf{r}_1)\psi_j(\mathbf{r}_1)\,\frac{1}{r_{12}}\,\psi_k^{*}(\mathbf{r}_2)\psi_l(\mathbf{r}_2)\,\mathrm{d}\mathbf{r}_1\,\mathrm{d}\mathbf{r}_2 ,
$$
其中前一对指标属于电子1，后一对属于电子2。

::: proposition 斯莱特行列式的能量 {#prop-det-energy}
对于正交归一自旋轨道$\chi_1, \dots, \chi_N$构成的行列式，
$$
E = \langle\Phi|\hat H|\Phi\rangle = \sum_{i} h_{ii} + \frac{1}{2}\sum_{i}\sum_{j}\left(J_{ij} - K_{ij}\right),
$$
其中$h_{ii} = \langle\chi_i|\hat h|\chi_i\rangle$，**库仑积分**$J_{ij} = (ii|jj)$是电荷云$\lvert\chi_i\rvert^{2}$与$\lvert\chi_j\rvert^{2}$之间的经典排斥，**交换积分**$K_{ij} = (ij|ji)$仅当$\chi_i$与$\chi_j$自旋相同时非零。对于有$N/2$个双占据空间轨道$\psi_a$的闭壳层分子，
$$
E = 2\sum_{a}^{N/2} h_{aa} + \sum_{a}^{N/2}\sum_{b}^{N/2}\left(2J_{ab} - K_{ab}\right).
$$ {#eq-closed-shell-energy}
:::

::: proof
写$\Phi = \sqrt{N!}\,\hat{\mathcal A}\,\Pi$，其中$\Pi = \chi_1(\mathbf{x}_1)\cdots\chi_N(\mathbf{x}_N)$是简单乘积，$\hat{\mathcal A} = (N!)^{-1}\sum_P (-1)^{p}\hat P$是反对称化算符，对一切置换求和、$p$为该置换的宇称。哈密顿量对置换对称，所以与$\hat{\mathcal A}$对易，且$\hat{\mathcal A}^{2} = \hat{\mathcal A}$。于是$\langle\Phi|\hat H|\Phi\rangle = N!\,\langle\Pi|\hat H\hat{\mathcal A}|\Pi\rangle = \sum_P (-1)^{p}\langle\Pi|\hat H|\hat P\Pi\rangle$。对一体项$\hat h(1)$，只有恒等置换存活，因为任何置换都会把某个电子$k \neq 1$换进另一个正交轨道，该电子坐标的重叠为零；对电子求和给出$\sum_i h_{ii}$。对二体项$1/r_{12}$，恒等置换与电子1、2的一次对换存活，对占据这两个电子的那对轨道$\chi_i, \chi_j$分别给出$(ii|jj)$与$-(ij|ji)$。对$i < j$的对求和给出$\sum_{i<j}(J_{ij} - K_{ij}) = \tfrac{1}{2}\sum_{ij}(J_{ij} - K_{ij})$，其中可以补上$i = j$的项，因为$J_{ii} = K_{ii}$。对闭壳层，每个空间轨道带一个$\alpha$与一个$\beta$电子：每对空间轨道贡献四个库仑项，却只有两个交换项（自旋相同），这就给出因子$2J_{ab} - K_{ab}$。
:::

这一公式的两大特征各承载一份物理。项$J_{ii} - K_{ii} = 0$意味着**电子不排斥自身**——库仑求和中的自相互作用被交换项精确抵消，这是近似密度泛函会失去的性质（[[computational-chemistry/density-functional-theory]]）。而交换项是恒正的积分却带负号进入，会*降低*同自旋电子对的能量：它们是费米空穴的能量面孔，也是洪特第一规则的起源。

::: example 作为单个行列式的氦原子 {#ex-he-det}
氦基态$\lvert 1s\alpha\ 1s\beta\rvert$，取电荷为$\zeta$的类氢$1s$轨道，有$h_{11} = \zeta^{2}/2 - 2\zeta$与$J_{11} = 5\zeta/8$（以$\mathrm{E_h}$计）。用[[#eq-closed-shell-energy]]写出$E(\zeta)$，并与[[quantum-chemistry/approximation-methods]]的变分结果比较。
::: solution
只有一个双占据轨道，$E = 2h_{11} + 2J_{11} - K_{11} = 2h_{11} + J_{11}$（因为$K_{11} = J_{11}$），所以
$$
E(\zeta) = \zeta^{2} - 4\zeta + \tfrac{5}{8}\zeta ,
$$
与缩放核电荷的变分能量完全相同。其在$\zeta = 27/16$处的极小值为$-2.8477\ \mathrm{E_h}$。氦的*哈特里-福克极限*——让$1s$轨道的径向形状自由变化——为$-2.86168\ \mathrm{E_h}$；精确的非相对论能量为$-2.90372\ \mathrm{E_h}$。剩下的$0.0420\ \mathrm{E_h} = 1.14\ \mathrm{eV}$就是氦的相关能，任何轨道形状的选择都无法把它收回。
:::
:::

## 哈特里-福克方程

现在我们要求*最好*的行列式：使[[#prop-det-energy]]中的$E$最小的正交归一轨道。由变分原理（[[quantum-chemistry/approximation-methods]]），结果是真实基态能量的一个上界。

::: proposition 哈特里-福克方程 {#prop-hf-equations}
使单个行列式的能量取驻值的轨道，在正交归一约束下可以选为满足一体算符本征值方程
$$
\hat f\,\chi_i = \varepsilon_i\,\chi_i , \qquad \hat f = \hat h + \sum_{j}^{N}\left(\hat J_j - \hat K_j\right),
$$
其中**福克算符**$\hat f$包含库仑算符$\hat J_j\chi(\mathbf{x}_1) = \left[\int \lvert\chi_j(\mathbf{x}_2)\rvert^{2} r_{12}^{-1}\,\mathrm{d}\mathbf{x}_2\right]\chi(\mathbf{x}_1)$——电子$j$的电荷云的静电势——以及非局域交换算符$\hat K_j\chi(\mathbf{x}_1) = \left[\int \chi_j^{*}(\mathbf{x}_2)\chi(\mathbf{x}_2) r_{12}^{-1}\,\mathrm{d}\mathbf{x}_2\right]\chi_j(\mathbf{x}_1)$。**轨道能量**为$\varepsilon_i = h_{ii} + \sum_j(J_{ij} - K_{ij})$，而总能量为
$$
E_\mathrm{HF} = \sum_i \varepsilon_i - \frac{1}{2}\sum_{ij}\left(J_{ij} - K_{ij}\right) \;\neq\; \sum_i \varepsilon_i .
$$
:::

::: proof
在正交归一约束下极小化$\mathcal L = E - \sum_{ij}\lambda_{ji}\left(\langle\chi_i|\chi_j\rangle - \delta_{ij}\right)$，配以拉格朗日乘数$\lambda_{ji}$。变分一个轨道，$\chi_k \to \chi_k + \delta\chi_k$。$E$中的一体项改变$\langle\delta\chi_k|\hat h|\chi_k\rangle + \text{c.c.}$，含$k$的二体项改变$\sum_j\left(\langle\delta\chi_k|\hat J_j - \hat K_j|\chi_k\rangle + \text{c.c.}\right)$——因子$\tfrac{1}{2}$消失，因为$k$出现在双重求和的两个指标中。对任意$\delta\chi_k$令$\delta\mathcal L = 0$，得$\hat f\chi_k = \sum_j\lambda_{jk}\chi_j$。矩阵$\lambda$是厄米的，而占据轨道之间的幺正变换除一个相位外不改变行列式（因而也不改变$E$与$\hat f$）；选取使$\lambda$对角化的变换，即得**正则**形式$\hat f\chi_i = \varepsilon_i\chi_i$。向$\chi_i$投影即得$\varepsilon_i$。把$\varepsilon_i$相加时每个电子-电子排斥被计了两次（在成对的两个轨道能量中各一次），所以必须减去二体求和的一半才能收回$E$。
:::

福克算符依赖于占据轨道，而占据轨道又是它自己的本征函数。方程因此是非线性的，须用迭代求解：猜测轨道，构造$\hat f$，解出新轨道，重新构造$\hat f$，反复进行，直到产生该场的轨道正是该场所给出的轨道。这就是**自洽场**（self-consistent field, SCF）。

轨道能量有直接的物理解释。

::: theorem 库普曼斯（Koopmans）定理 {#thm-koopmans}
设$\Phi$为$N$电子体系的哈特里-福克行列式，$\Phi_i^{N-1}$为删去自旋轨道$\chi_i$而*不改变其余轨道*所得的$(N - 1)$电子行列式。则
$$
E(\Phi_i^{N-1}) - E(\Phi) = -\varepsilon_i .
$$
于是$-\varepsilon_i$近似轨道$i$的电离能；而对虚轨道$a$，$-\varepsilon_a$近似向它添加一个电子的电子亲和能。
:::

::: proof
由[[#prop-det-energy]]，$\Phi$与$\Phi_i^{N-1}$的能量之差由一切含指标$i$的项组成：$h_{ii}$，以及二体项$\tfrac{1}{2}\sum_j (J_{ij} - K_{ij}) + \tfrac{1}{2}\sum_j (J_{ji} - K_{ji}) = \sum_j(J_{ij} - K_{ij})$。由[[#prop-hf-equations]]，其和恰为$\varepsilon_i$，所以$E(\Phi) - E(\Phi_i^{N-1}) = \varepsilon_i$。加上一个虚自旋轨道的同样论证给出亲和能的结论。
:::

库普曼斯电离能忽略了两个作用方向相反的效应。**轨道弛豫**——其余电子向空穴收缩——降低离子的能量，使库普曼斯值偏大；移走一个电子时**关联能的损失**则使离子的能量相对中性分子升高，使库普曼斯值偏小。对闭壳层分子的价层电离，两种误差部分抵消，库普曼斯定理常有约$1\ \mathrm{eV}$的精度；对内层电离，弛豫占主导，误差达$10$–$20\ \mathrm{eV}$；而库普曼斯电子亲和能很差，因为此时两个误差同向叠加。

## 鲁坦（Roothaan）-霍尔（Hall）方程

哈特里-福克方程是积分-微分方程。对原子可以在径向格点上数值求解，但对分子，实际的途径是鲁坦（Roothaan）与霍尔（Hall）在1951年提出的：把每个空间轨道在一组固定的$K$个基函数$\phi_\mu$中展开（通常以原子为中心，见[[computational-chemistry/basis-sets]]）：
$$
\psi_i = \sum_{\mu=1}^{K} C_{\mu i}\,\phi_\mu .
$$
这把算符方程化为矩阵方程，恰如线性变分法把薛定谔方程化为久期问题。

::: proposition 鲁坦-霍尔方程 {#prop-roothaan}
在基组$\{\phi_\mu\}$中展开轨道的闭壳层分子，其哈特里-福克方程化为广义矩阵本征值问题
$$
\mathbf{F}\mathbf{C} = \mathbf{S}\mathbf{C}\boldsymbol{\varepsilon},
$$
其中$S_{\mu\nu} = \langle\phi_\mu|\phi_\nu\rangle$是重叠矩阵，$\boldsymbol\varepsilon$是以轨道能量为对角元的对角矩阵，而**福克矩阵**为
$$
F_{\mu\nu} = H^\mathrm{core}_{\mu\nu} + \sum_{\lambda\sigma} P_{\lambda\sigma}\left[(\mu\nu|\sigma\lambda) - \tfrac{1}{2}(\mu\lambda|\sigma\nu)\right], \qquad P_{\lambda\sigma} = 2\sum_{a}^{N/2} C_{\lambda a} C^{*}_{\sigma a},
$$
其中$H^\mathrm{core}_{\mu\nu} = \langle\phi_\mu|\hat h|\phi_\nu\rangle$，$\mathbf{P}$是**密度矩阵**。电子能量为$E_\mathrm{el} = \tfrac{1}{2}\sum_{\mu\nu}P_{\nu\mu}\left(H^\mathrm{core}_{\mu\nu} + F_{\mu\nu}\right)$，总能量再加上核排斥$V_\mathrm{NN}$。
:::

::: proof
对闭壳层，把福克算符对每个空间轨道的两个自旋求和，得作用在空间轨道上的$\hat f = \hat h + \sum_a^{N/2}(2\hat J_a - \hat K_a)$。把$\psi_i$的展开代入$\hat f\psi_i = \varepsilon_i\psi_i$并向$\phi_\mu$投影：$\sum_\nu\langle\phi_\mu|\hat f|\phi_\nu\rangle C_{\nu i} = \varepsilon_i\sum_\nu S_{\mu\nu}C_{\nu i}$，这就是$\mathbf{F}\mathbf{C} = \mathbf{S}\mathbf{C}\boldsymbol\varepsilon$，其中$F_{\mu\nu} = \langle\phi_\mu|\hat f|\phi_\nu\rangle$。在$\hat J_a$与$\hat K_a$内部展开占据轨道得
$\langle\phi_\mu|2\hat J_a - \hat K_a|\phi_\nu\rangle = \sum_{\lambda\sigma} C_{\lambda a}C_{\sigma a}^{*}\left[2(\mu\nu|\sigma\lambda) - (\mu\lambda|\sigma\nu)\right]$，再对$a$求和并用$\mathbf{P}$的定义即得所述的$F_{\mu\nu}$。能量公式是[[#eq-closed-shell-energy]]在基组中的重写：$2\sum_a h_{aa} = \sum_{\mu\nu}P_{\nu\mu}H^\mathrm{core}_{\mu\nu}$，且$\sum_{ab}(2J_{ab} - K_{ab}) = \tfrac{1}{2}\sum_{\mu\nu}P_{\nu\mu}(F_{\mu\nu} - H^\mathrm{core}_{\mu\nu})$。
:::

基组使方法*可计算*，但也以新的方式使它*近似*：在有限基组中，轨道的灵活程度至多与基组所允许者相同，只有当基组趋于完备时能量才趋于**哈特里-福克极限**。支配费用的量是双电子积分集$(\mu\nu|\lambda\sigma)$，其中不同的积分约有$K^{4}/8$个。因此常规哈特里-福克的形式标度为$K^{4}$；积分筛选（相距遥远的基函数之间的积分大多可以忽略）使大分子的有效标度降到$K^{2}$附近，密度拟合与线性标度方法则降得更多。

::: algorithm 自洽场流程 {#alg-scf}
1. 指定分子（核坐标、核电荷、电子数）与基组。计算$\mathbf{S}$、$\mathbf{H}^\mathrm{core}$、双电子积分$(\mu\nu|\lambda\sigma)$与$V_\mathrm{NN}$。
2. 构造正交化矩阵，例如$\mathbf{X} = \mathbf{S}^{-1/2}$，使得$\mathbf{X}^{\dagger}\mathbf{S}\mathbf{X} = \mathbf{I}$。
3. 猜测密度矩阵$\mathbf{P}$（最简单的猜测是$\mathbf{P} = \mathbf{0}$，它使第一个福克矩阵等于$\mathbf{H}^\mathrm{core}$；更好的猜测叠加原子密度）。
4. 由$\mathbf{P}$与积分构造$\mathbf{F}$。
5. 变换$\mathbf{F}' = \mathbf{X}^{\dagger}\mathbf{F}\mathbf{X}$，对角化$\mathbf{F}'\mathbf{C}' = \mathbf{C}'\boldsymbol\varepsilon$，再反变换$\mathbf{C} = \mathbf{X}\mathbf{C}'$。
6. 占据最低的$N/2$个轨道（*构造原理*的选择），形成新的$\mathbf{P}$。
7. 若能量与密度矩阵的变化小于阈值（比如$10^{-8}\ \mathrm{E_h}$与$10^{-6}$），停止；否则回到第4步。由历次迭代外推福克矩阵可加速收敛（Pulay的DIIS方法）。
:::

## 一个完整的计算：极小基组中的$\mathrm{H_2}$

最小的非平凡情形是$R = 1.4\ a_0$（接近其平衡键长）处的$\mathrm{H_2}$，每个原子上放一个$1s$型函数。我们采用[[computational-chemistry/basis-sets]]的STO-3G基组，其中每个函数是拟合指数$\zeta = 1.24$的斯莱特$1s$轨道的三个高斯函数的固定组合。对称性代劳了大部分工作：两个轨道必然一个是成键组合、一个是反键组合，所以无需迭代——但哈特里-福克的每一种成分都会出现。

::: example $\mathrm{H_2}$的哈特里-福克计算 {#ex-h2-hf}
对$R = 1.4\ a_0$处的STO-3G $\mathrm{H_2}$，基函数$\phi_1$（在A原子上）与$\phi_2$（在B上）的积分为（原子单位）：$S_{12} = 0.6593$；$H^\mathrm{core}_{11} = -1.1204$、$H^\mathrm{core}_{12} = -0.9584$；$(11|11) = 0.7746$、$(11|22) = 0.5697$、$(21|11) = 0.4441$、$(21|21) = 0.2970$。求占据轨道、它的轨道能量与总能量。
::: solution
由对称性，占据轨道为$\sigma_g = (\phi_1 + \phi_2)/\sqrt{2(1 + S_{12})}$，虚轨道为$\sigma_u = (\phi_1 - \phi_2)/\sqrt{2(1 - S_{12})}$；由$2(1 + S_{12}) = 3.3186$得系数$C_{1g} = C_{2g} = 0.5489$。$\sigma_g$的一体能量为
$$
h_{gg} = \frac{H_{11} + H_{12}}{1 + S_{12}} = \frac{-1.1204 - 0.9584}{1.6593} = -1.2528\ \mathrm{E_h}.
$$
$\sigma_g$的库仑自排斥可由把$(\sigma_g\sigma_g|\sigma_g\sigma_g)$展开成十六个基函数积分得到，由对称性化简为
$$
J_{gg} = \frac{(11|11) + (11|22) + 2(21|21) + 4(21|11)}{2(1 + S_{12})^{2}} = \frac{0.7746 + 0.5697 + 0.5941 + 1.7764}{5.5067} = 0.6746\ \mathrm{E_h}.
$$
轨道能量为$\varepsilon_g = h_{gg} + 2J_{gg} - K_{gg} = h_{gg} + J_{gg} = -0.5782\ \mathrm{E_h}$，电子能量为$E_\mathrm{el} = 2h_{gg} + J_{gg} = -1.8310\ \mathrm{E_h}$。加上$V_\mathrm{NN} = 1/1.4 = 0.7143\ \mathrm{E_h}$，
$$
E_\mathrm{HF} = -1.1167\ \mathrm{E_h}.
$$
作为对照，此几何下的哈特里-福克极限为$-1.1336\ \mathrm{E_h}$，精确能量为$-1.1745\ \mathrm{E_h}$：极小基组花费$0.017\ \mathrm{E_h}$，相关再花费$0.041\ \mathrm{E_h}$。用$\sigma_u$做同样的代数得虚轨道能量$\varepsilon_u = +0.6703\ \mathrm{E_h}$。
:::
:::

::: example $\mathrm{H_2}$的库普曼斯电离能 {#ex-koopmans-h2}
利用[[#ex-h2-hf]]的结果估计$\mathrm{H_2}$的电离能，并与实验测得的绝热值$15.43\ \mathrm{eV}$比较。
::: solution
由[[#thm-koopmans]]，$I \approx -\varepsilon_g = 0.5782\ \mathrm{E_h} \times 27.2114\ \mathrm{eV\,E_h^{-1}} = 15.73\ \mathrm{eV}$。这是一个*垂直*电离能（核固定在$R = 1.4\ a_0$处），它略高于绝热值，因为$\mathrm{H_2^{+}}$的键更长；$\mathrm{H_2}$的光电子谱带峰位在$16.0\ \mathrm{eV}$附近。符合得好部分出于运气：单电子离子没有弛豫，但基组误差与$\mathrm{H_2}$中关联的缺失都掺在里面。另注意$-\varepsilon_u = -0.67\ \mathrm{E_h}$预言一个*负*电子亲和能$-18\ \mathrm{eV}$：$\mathrm{H_2^{-}}$确实不束缚，但这个数值的量级正说明虚轨道能量多么不可靠。
:::
:::

## 对称性定不住轨道时：$\mathrm{HeH^{+}}$

在异核分子中，两个基函数的混合不由对称性决定，自洽场迭代是实实在在的。与$\mathrm{H_2}$等电子的$\mathrm{HeH^{+}}$是经典案例（沙博（Szabo）与奥斯特伦德（Ostlund）逐位数出了全过程）。

::: example $\mathrm{HeH^{+}}$的自洽场迭代 {#ex-heh-scf}
取$R = 1.4632\ a_0$处的$\mathrm{HeH^{+}}$，每个原子上一个STO-3G函数（$\zeta_\mathrm{He} = 2.0925$、$\zeta_\mathrm{H} = 1.24$）。积分为$S_{12} = 0.4508$；$H^\mathrm{core}_{11} = -2.6527$、$H^\mathrm{core}_{22} = -1.7318$、$H^\mathrm{core}_{12} = -1.3472$；$(11|11) = 1.3072$、$(22|22) = 0.7746$、$(11|22) = 0.6057$、$(21|11) = 0.4373$、$(21|22) = 0.3118$、$(21|21) = 0.1773$（函数1在He上）。从$\mathbf{P} = \mathbf{0}$出发执行[[#alg-scf]]的自洽场流程。
::: solution
$\mathbf{P} = \mathbf{0}$时第一个福克矩阵就是$\mathbf{H}^\mathrm{core}$；在正交化基中将其对角化，得到一个能量为$-2.674\ \mathrm{E_h}$、主要集中在氦上的"芯"轨道。由它构造$\mathbf{P}$并迭代，得

| 迭代 | $E_\mathrm{el}/\mathrm{E_h}$ | $\varepsilon_1/\mathrm{E_h}$ |
|---|---|---|
| 1 | $-4.141860$ | $-1.50463$ |
| 2 | $-4.226488$ | $-1.58810$ |
| 3 | $-4.227519$ | $-1.59673$ |
| 4 | $-4.227526$ | $-1.59740$ |
| 收敛 | $-4.227526$ | $-1.59745$ |

能量比轨道能量收敛得快得多：到第4次迭代已精确到$10^{-6}\ \mathrm{E_h}$，正如变分原理所料（$E$的误差是轨道误差的二阶小量）。收敛的占据轨道为$\psi_1 = 0.8019\,\phi_\mathrm{He} + 0.3368\,\phi_\mathrm{H}$，总能量为$E_\mathrm{el} + V_\mathrm{NN} = -4.227526 + 2/1.4632 = -2.860662\ \mathrm{E_h}$。马利肯分析（[[#exr-mulliken]]）把$1.53$个电子分给氦、$0.47$个给氢：正电荷几乎均分，氢上略多，这与He更高的电离能（$24.6$对$13.6\ \mathrm{eV}$）相符。
:::
:::

::: widget plot
f: 2*(cos(x)^2*(-2.65274) + sin(x)^2*(-1.73183) + 2*cos(x)*sin(x)*(-1.34721))/(1 + 0.45077*sin(2*x)) + (cos(x)^4*1.30715 + sin(x)^4*0.77461 + 2*cos(x)^2*sin(x)^2*0.60570 + 4*cos(x)^2*sin(x)^2*0.17727 + 4*cos(x)^3*sin(x)*0.43728 + 4*cos(x)*sin(x)^3*0.31179)/(1 + 0.45077*sin(2*x))^2 + 1.36687
x: -0.6, 1.8
y: -3, -1
points: 0.3976, -2.8607
labels: E(\theta)/\mathrm{E_h}
tangent: 0.9
caption: 当占据轨道取$\psi \propto \cos\theta\,\phi_\mathrm{He} + \sin\theta\,\phi_\mathrm{H}$时$\mathrm{HeH^{+}}$行列式的能量，积分取自[[#ex-heh-scf]]。$\theta = 0$时两个电子都在氦上（$-2.631\ \mathrm{E_h}$）；$\theta = \pi/2$时都在质子上（$-1.322\ \mathrm{E_h}$）。标出的极小点在$\theta = 0.398$处，$E = -2.8607\ \mathrm{E_h}$——正是收敛的自洽场结果。自洽场流程是寻找这个极小的一条途径；拖动切线即可看到，哈特里-福克解正出现在斜率（占据轨道与虚轨道之间的福克矩阵非对角元）为零之处。
:::

这张图的教训可以推广。哈特里-福克解是能量关于混合占据与虚轨道之*旋转*的驻点，取驻值的条件是福克矩阵的占据-虚块为零。从波函数一侧看，它有一个著名的推论。

::: theorem 布里渊定理 {#thm-brillouin}
设$\Phi_0$为收敛的哈特里-福克行列式，$\Phi_i^{a}$为把占据自旋轨道$\chi_i$换成虚轨道$\chi_a$所得的单激发行列式。则
$$
\langle\Phi_i^{a}|\hat H|\Phi_0\rangle = \langle\chi_a|\hat f|\chi_i\rangle = 0 .
$$
单激发行列式不与哈特里-福克参考直接混合。
:::

::: proof
由斯莱特-康登规则（与[[#prop-det-energy]]中相同的置换论证，用于只在一个自旋轨道上不同的两个行列式），$\langle\Phi_i^{a}|\hat H|\Phi_0\rangle = h_{ai} + \sum_j\left[(ai|jj) - (aj|ji)\right] = \langle\chi_a|\hat f|\chi_i\rangle$。由于$\chi_i$是$\hat f$的本征函数，$\hat f\chi_i = \varepsilon_i\chi_i$，且$\langle\chi_a|\chi_i\rangle = 0$，该矩阵元为零。等价地说，把行列式旋转到$\Phi_0 + \eta\,\Phi_i^{a}$时能量的一阶变化为$2\eta\langle\Phi_i^{a}|\hat H|\Phi_0\rangle$，在驻点处必须为零。
:::

布里渊定理解释了为什么组态相互作用与微扰理论中哈特里-福克的首要修正来自*双*激发（[[computational-chemistry/electron-correlation]]）。

## 受限、非限制与解离问题

对近平衡的闭壳层分子，**受限哈特里-福克**（restricted Hartree–Fock, RHF）——每对电子的$\alpha$与$\beta$电子取同一空间轨道——是自然的。对开壳层体系有两种选择。**非限制哈特里-福克**（unrestricted HF, UHF）让$\alpha$与$\beta$电子取不同的空间轨道；这降低能量并允许自旋极化，但行列式不再是$\hat S^{2}$的本征函数，被更高自旋态"污染"。**限制开壳层哈特里-福克**（restricted open-shell HF, ROHF）保持双占据轨道公共、自旋态纯净，代价是能量略高。

限制最要紧的地方是断键时。$\mathrm{H_2}$的RHF行列式中，$\sigma_g^{2}$按原子函数展开为
$$
\lvert\sigma_g\alpha\,\sigma_g\beta\rvert \propto \underbrace{\left[\phi_\mathrm{A}(1)\phi_\mathrm{B}(2) + \phi_\mathrm{B}(1)\phi_\mathrm{A}(2)\right]}_{\text{共价, H + H}} + \underbrace{\left[\phi_\mathrm{A}(1)\phi_\mathrm{A}(2) + \phi_\mathrm{B}(1)\phi_\mathrm{B}(2)\right]}_{\text{离子, H}^{+}\text{H}^{-}} ,
$$
再乘以单重态自旋函数——无论键长如何，总是$50\ \%$离子性。大$R$时这是错的：分子应当解离成两个中性原子，而离子项把能量抬到远高于$2E(\mathrm{H})$。

| $R/a_0$ | RHF $/\mathrm{E_h}$ | UHF $/\mathrm{E_h}$ | 基组内精确值（完全CI）$/\mathrm{E_h}$ |
|---|---|---|---|
| $1.4$ | $-1.1167$ | $-1.1167$ | $-1.1373$ |
| $2.0$ | $-1.0492$ | $-1.0492$ | $-1.0885$ |
| $3.0$ | $-0.8853$ | $-0.9510$ | $-0.9852$ |
| $4.0$ | $-0.7611$ | $-0.9358$ | $-0.9438$ |
| $6.0$ | $-0.6451$ | $-0.9332$ | $-0.9334$ |
| $\infty$ | $-0.5459$ | $-0.9332$ | $-0.9332$ |

（STO-3G，在各$R$处用[[#ex-h2-hf]]的积分计算；此基组中$2E(\mathrm{H}) = -0.9332\ \mathrm{E_h}$。）近平衡时UHF坍缩回RHF。越过一个临界距离（库尔森-费希尔点，此处介于$2.0$与$2.5\ a_0$之间）出现一个更低的UHF解：$\alpha$电子定域在一个原子上、$\beta$电子在另一个上；它解离正确，但大$R$时是单重态与三重态的等量混合（$\langle\hat S^{2}\rangle \to 1$）。在中间区域，两个单行列式都不对；正确的描述需要不止一个行列式，这就是*静态相关*（[[computational-chemistry/electron-correlation]]）。

::: warning 能量更低并不总是波函数更好 {#warn-uhf}
人们很容易相信能量更低的UHF解总是更可取。对拉长的键与双自由基，它给出更好的能量，但波函数自旋受污染——要用$\langle\hat S^{2}\rangle$与$S(S + 1)$对照检查（单重态为零，双重态为$0.75$）。对自旋敏感的性质（超精细耦合、单重-三重能隙）可能错得离谱。反过来，一个RHF解可能*不稳定*：可能存在对称性更低或破坏自旋纯度的更低解，而自洽场收敛到驻点并不保证它是轨道空间中的极小。程序提供"稳定性分析"——驻点处检查黑塞矩阵的轨道旋转类比（[[computational-chemistry/potential-energy-surfaces#prop-stationary]]）。
:::

::: quiz
关于哈特里-福克理论，下列哪种说法正确？
- [ ] 哈特里-福克能量等于占据轨道能量之和。
- [ ] 哈特里-福克忽略电子排斥，把电子当作彼此独立的粒子处理。
- [x] 哈特里-福克（在单个行列式内）精确计入了同自旋电子间的交换关联，但把自旋相反的电子当作在彼此的平均场中独立运动。
- [ ] 在完备基组极限下，哈特里-福克给出精确能量。
::: solution
轨道能量之和把排斥重复计数了（[[#prop-hf-equations]]）。排斥是计入的，但只是作为平均（库仑算符）加上交换。行列式为同自旋电子对内置了费米空穴；自旋相反的电子没有相关空穴。即便基组完备，哈特里-福克也只能到达哈特里-福克极限，比精确能量高出相关能。
:::
:::

## 哈特里-福克的得与失

配上好基组时，哈特里-福克通常给出

- 有机分子的**平衡几何**在约$0.01$–$0.02\ \mathrm{\AA}$以内（键一般略短，因为缺失的关联会混入反键成分）；
- **振动频率**因同样原因偏高约$10\ \%$；
- **偶极矩**常常偏大$10$–$20\ \%$；
- **反应能**：同电子对反应（isogyric反应，即保持电子对数目的反应）给出尚可的结果，但**键解离能**非常差：哈特里-福克极限对$\mathrm{N_2}$的结合只有其实验$D_e$的一半左右，而$\mathrm{F_2}$根本不束缚；
- **势垒高度**偏高，常达$40$–$80\ \mathrm{kJ\,mol^{-1}}$；
- **没有色散**：闭壳层分子间的伦敦吸引是纯粹的关联效应，所以哈特里-福克根本不束缚稀有气体二聚体与π堆积芳烃。

共同的线索是：相关能随电子数目或配对方式的变化而变化，而哈特里-福克一点也不含它。总相关能作为占比很小（$\mathrm{H_2}$的$1.17$中对$0.04\ \mathrm{E_h}$；水的$76.4$中约$0.37\ \mathrm{E_h}$），但它与化学能量差同量级，而化学正是由它的变化构成的。

## 后续内容

鲁坦-霍尔方程需要一个基组，其选择是[[computational-chemistry/basis-sets]]的主题。哈特里-福克行列式是组态相互作用、米-普微扰理论与耦合簇理论在其上搭建的参考（[[computational-chemistry/electron-correlation]]）。密度泛函理论的科恩-沙姆方程（[[computational-chemistry/density-functional-theory]]）有完全相同的自洽场结构——类福克矩阵、密度矩阵、自洽迭代——只是交换算符被交换关联势全部或部分地取代。而[[quantum-chemistry/huckel-theory]]的休克尔方法如今也可以看清它的真面目：一次采用经验的、非自洽福克矩阵的鲁坦-霍尔计算。

::: history
哈特里1928年为原子引入了自洽场，数值求解每个电子在其他电子平均场中的运动，只是他的乘积波函数没有反对称化。1930年福克与斯莱特各自证明，把波函数反对称化为行列式即补上交换项；斯莱特本人1929年提出了行列式。库普曼斯1934年发表了关于轨道能量与电离能的定理。鲁坦与霍尔在1951年各自独立导出闭壳层方程的矩阵形式，使分子计算在刚刚问世的计算机上成为可能；鲁坦的开壳层理论随后于1960年发表，波普与内斯贝特（Nesbet）1954年建立了非限制方程。布里渊定理出自1934年。随着1970年代高斯基组程序的出现——其中波普的Gaussian 70是第一个广泛传播的——对化学上有意义的分子进行哈特里-福克计算成为常规。
:::

::: summary
- 哈特里-福克寻找能量最低的单个斯莱特行列式；反对称性内置了泡利原理与同自旋电子的费米空穴。
- 行列式的能量为$\sum_i h_{ii} + \tfrac{1}{2}\sum_{ij}(J_{ij} - K_{ij})$；因为$J_{ii} = K_{ii}$，自相互作用抵消。
- 极小化它得$\hat f\chi_i = \varepsilon_i\chi_i$，其中$\hat f = \hat h + \sum_j(\hat J_j - \hat K_j)$；方程非线性、须自洽求解，且$E_\mathrm{HF} \neq \sum_i\varepsilon_i$。
- 库普曼斯定理：$-\varepsilon_i$近似垂直电离能（弛豫与关联误差部分抵消）；虚轨道能量作电子亲和能很差。
- 在基组中方程化为$\mathbf{FC} = \mathbf{SC}\boldsymbol\varepsilon$，其中$\mathbf{F}$由密度矩阵与约$K^{4}/8$个双电子积分构造。
- 极小基组的$\mathrm{H_2}$在$1.4\ a_0$：$\varepsilon_g = -0.5782\ \mathrm{E_h}$、$E_\mathrm{HF} = -1.1167\ \mathrm{E_h}$；$\mathrm{HeH^{+}}$：几轮自洽场后为$-2.8607\ \mathrm{E_h}$。
- 布里渊定理：单激发不与哈特里-福克参考混合。RHF在键解离处失效；UHF解离正确但自旋受污染。缺失的相关能总量虽小，化学上却起决定作用。
:::

## 习题

::: exercise 氦的行列式 {level=1 check="-2.75"}
对氦上未缩放的类氢$1s$轨道（$\zeta = Z = 2$），$h_{11} = -2.00\ \mathrm{E_h}$、$J_{11} = 1.25\ \mathrm{E_h}$。给出行列式$\lvert 1s\alpha\ 1s\beta\rvert$的能量。（以$\mathrm{E_h}$为单位输入。）
::: solution
$E = 2h_{11} + 2J_{11} - K_{11} = 2h_{11} + J_{11} = -4.00 + 1.25 = -2.75\ \mathrm{E_h}$。允许轨道不那么收缩（$\zeta = 1.6875$）把它降到$-2.8477\ \mathrm{E_h}$，完全的径向自由给出哈特里-福克极限$-2.8617\ \mathrm{E_h}$。
:::
:::

::: exercise $\mathrm{H_2}$的库普曼斯电离能 {level=1 check="15.73"}
STO-3G $\mathrm{H_2}$在$1.4\ a_0$处的占据轨道能量为$-0.57820\ \mathrm{E_h}$。估计垂直电离能。（以$\mathrm{eV}$为单位、保留四位有效数字输入。）
::: solution
$I \approx 0.57820 \times 27.2114\ \mathrm{eV} = 15.73\ \mathrm{eV}$（[[#thm-koopmans]]）。
:::
:::

::: exercise 数积分 {level=1 check="12753775"}
实的二电子积分具有八重置换对称性$(\mu\nu|\lambda\sigma) = (\nu\mu|\lambda\sigma) = (\mu\nu|\sigma\lambda) = (\lambda\sigma|\mu\nu) = \cdots$。$K = 100$个基函数时有多少个不同的积分？（输入精确数值。）
::: hint
不同的指标对$\mu\nu$有$M = K(K + 1)/2$个，而积分对两个指标对对称。
:::
::: solution
不同的对$M = 100 \times 101/2 = 5050$个，不同的积分$M(M + 1)/2 = 5050 \times 5051/2 = 12\,753\,775$个，接近$K^{4}/8 = 1.25\times10^{7}$。以8字节数存储约占$100\ \mathrm{MB}$；$K = 1000$时是$10^{11}$个积分、接近$1\ \mathrm{TB}$，这就是大计算不存积分而是随用随算（"直接自洽场"）的原因。
:::
:::

::: exercise 总能量不是轨道能量之和 {level=2 check="-1.831"}
对$1.4\ a_0$处的STO-3G $\mathrm{H_2}$，$\varepsilon_g = -0.5782\ \mathrm{E_h}$、$h_{gg} = -1.2528\ \mathrm{E_h}$。用$E_\mathrm{el} = \sum_a(h_{aa} + \varepsilon_a)$（对双占据空间轨道求和）计算电子能量，并与$2\varepsilon_g$比较。（以$\mathrm{E_h}$为单位输入$E_\mathrm{el}$。）
::: solution
对闭壳层，$E_\mathrm{el} = \sum_a^{N/2}(h_{aa} + \varepsilon_a)$，这可由[[#eq-closed-shell-energy]]与$\varepsilon_a = h_{aa} + \sum_b(2J_{ab} - K_{ab})$推出。这里$E_\mathrm{el} = -1.2528 - 0.5782 = -1.831\ \mathrm{E_h}$，而$2\varepsilon_g = -1.1564\ \mathrm{E_h}$偏高了$J_{gg} = 0.6746\ \mathrm{E_h}$——正是被重复计数的排斥。
:::
:::

::: exercise 由积分计算$\mathrm{H_2}$的哈特里-福克能量 {level=2 check="-1.1167"}
用[[#ex-h2-hf]]的积分，计算$h_{gg}$与$J_{gg}$，进而求出$R = 1.4\ a_0$处$\mathrm{H_2}$的哈特里-福克总能量，包括核排斥。（以$\mathrm{E_h}$为单位、保留四位小数输入$E_\mathrm{HF}$。）
::: solution
$h_{gg} = (-1.1204 - 0.9584)/1.6593 = -1.2528$；$J_{gg} = 3.7148/5.5067 = 0.6746$；$E_\mathrm{el} = 2(-1.2528) + 0.6746 = -1.8310$；$E_\mathrm{HF} = -1.8310 + 0.7143 = -1.1167\ \mathrm{E_h}$。
:::
:::

::: exercise $\mathrm{HeH^{+}}$的马利肯布居 {level=2 check="1.53" #exr-mulliken}
STO-3G $\mathrm{HeH^{+}}$收敛的占据轨道为$\psi_1 = 0.8019\,\phi_\mathrm{He} + 0.3368\,\phi_\mathrm{H}$，其中$S_{12} = 0.4508$。氦上的马利肯总布居为$q_\mathrm{He} = 2\left(c_\mathrm{He}^{2} + c_\mathrm{He}c_\mathrm{H}S_{12}\right)$，即把重叠布居在两个原子间均分。计算$q_\mathrm{He}$并检查布居之和为$2$。（输入$q_\mathrm{He}$。）
::: solution
$q_\mathrm{He} = 2(0.6431 + 0.8019 \times 0.3368 \times 0.4508) = 2(0.6431 + 0.1217) = 1.53$，且$q_\mathrm{H} = 2(0.1134 + 0.1217) = 0.47$；因为$\psi_1$归一（$c_1^{2} + c_2^{2} + 2c_1c_2S = 1$），两者之和为$2.00$。氦因此带净电荷$+0.47$，氢带$+0.53$。马利肯电荷强烈依赖基组，只能用于同一基组内比较趋势。
:::
:::

::: exercise RHF的解离极限 {level=3 check="-0.546"}
证明$R \to \infty$时，极小基组中$\mathrm{H_2}$的RHF能量趋于$2E(\mathrm{H}) + \tfrac{1}{2}(11|11)$，其中$(11|11)$是单中心排斥积分，并对STO-3G求值（$\zeta = 1.24$时$E(\mathrm{H}) = -0.46658\ \mathrm{E_h}$，$(11|11) = 0.7746\ \mathrm{E_h}$）。（以$\mathrm{E_h}$为单位输入极限值。）
::: solution
$R \to \infty$时，$S_{12} \to 0$、$H_{12} \to 0$，双心积分$(21|11)$与$(21|21)$消失，而$(11|22) \to 1/R \to 0$；同时$H_{11} \to E(\mathrm{H})$加上对远处质子的吸引，后者与$V_\mathrm{NN}$及$(11|22)$相抵消。于是$h_{gg} \to E(\mathrm{H})$、$J_{gg} \to \tfrac{1}{2}(11|11)$，故$E \to 2E(\mathrm{H}) + \tfrac{1}{2}(11|11) = -0.93316 + 0.38730 = -0.546\ \mathrm{E_h}$。多出的$\tfrac{1}{2}(11|11) = 0.387\ \mathrm{E_h} = 10.5\ \mathrm{eV}$就是$50\ \%$离子性的代价：一半的时间里两个电子都在同一个原子上，付出单中心排斥$(11|11)$。
:::
:::

::: exercise 推导$\mathrm{H_2}$的闭壳层福克矩阵 {level=3 check="-0.578"}
在极小基组中取$\mathbf{P} = \frac{1}{1 + S_{12}}\begin{pmatrix}1 & 1 \\ 1 & 1\end{pmatrix}$，证明$F_{11} = H_{11} + \frac{1}{1 + S_{12}}\left[\tfrac{1}{2}(11|11) + (11|22) + (21|11) - \tfrac{1}{2}(21|21)\right]$，计算$F_{11}$与$F_{12}$，并求出$\varepsilon_g = (F_{11} + F_{12})/(1 + S_{12})$。（以$\mathrm{E_h}$为单位、保留三位小数输入$\varepsilon_g$。）
::: solution
所有$P_{\lambda\sigma} = 1/(1 + S_{12}) = 0.60266$，$F_{11} = H_{11} + P\sum_{\lambda\sigma}\left[(11|\sigma\lambda) - \tfrac{1}{2}(1\lambda|\sigma 1)\right]$。四个库仑项为$(11|11) + (11|22) + 2(11|12)$，四个交换项$\tfrac{1}{2}\left[(11|11) + (12|21) + 2(11|21)\right]$（利用实轨道对称性）；两者之差为$\tfrac{1}{2}(11|11) + (11|22) + (21|11) - \tfrac{1}{2}(21|21) = 0.3873 + 0.5697 + 0.4441 - 0.1485 = 1.2526$，所以$F_{11} = -1.1204 + 0.60266 \times 1.2526 = -0.3655$。对$F_{12}$，库仑项为$(12|11) + (12|22) + (12|12) + (12|21) = 2(21|11) + 2(21|21)$，交换项为$\tfrac{1}{2}\left[(11|12) + (11|22) + (12|12) + (12|22)\right] = (21|11) + \tfrac{1}{2}(11|22) + \tfrac{1}{2}(21|21)$，所以$F_{12} = H_{12} + P\left[(21|11) + \tfrac{3}{2}(21|21) - \tfrac{1}{2}(11|22)\right] = -0.9584 + 0.60266 \times (0.4441 + 0.4455 - 0.2848) = -0.5939$。于是$\varepsilon_g = (-0.3655 - 0.5939)/1.6593 = -0.578\ \mathrm{E_h}$，与[[#ex-h2-hf]]一致。
:::
:::

::: exercise 解离处的自旋污染 {level=3 check="1"}
大$R$时$\mathrm{H_2}$的UHF行列式为$\lvert\phi_\mathrm{A}\alpha\ \phi_\mathrm{B}\beta\rvert$。把它写成单重态与$M_S = 0$三重态的组合，求以$\hbar^{2}$为单位的$\langle\hat S^{2}\rangle$。（输入数值。）
::: solution
$\lvert\phi_\mathrm{A}\alpha\,\phi_\mathrm{B}\beta\rvert = \tfrac{1}{\sqrt 2}\left({}^{1}\Psi + {}^{3}\Psi_0\right)$，其中${}^{1}\Psi \propto [\phi_\mathrm{A}\phi_\mathrm{B} + \phi_\mathrm{B}\phi_\mathrm{A}](\alpha\beta - \beta\alpha)$、${}^{3}\Psi_0 \propto [\phi_\mathrm{A}\phi_\mathrm{B} - \phi_\mathrm{B}\phi_\mathrm{A}](\alpha\beta + \beta\alpha)$（对互不重叠的$\phi_\mathrm{A}, \phi_\mathrm{B}$）。于是$\langle\hat S^{2}\rangle = \tfrac{1}{2}(0) + \tfrac{1}{2}(1 \times 2) = 1$。精确单重态为$0$；UHF的值$1$标志着最大污染，正是拉长的键的UHF计算中要盯着看的诊断量。
:::
:::
