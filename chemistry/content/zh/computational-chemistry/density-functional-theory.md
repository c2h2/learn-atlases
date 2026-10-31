含$N$个电子的分子，其波函数依赖于$3N$个空间坐标（外加自旋）：对苯就是$126$个。然而哈密顿量只含一体与二体算符，而每一个有化学意义的量——能量、几何、偶极矩——都可以由远少于完整波函数的信息得到。**密度泛函理论**（density functional theory, DFT）把这一点推到逻辑极端。它证明基态能量是*电子密度*$\rho(\mathbf{r})$的*泛函*——无论电子数多少，这只是三个变量的函数。证明是精确的；问题在于该泛函未知，必须近似。自1990年代以来，近似泛函已足够好，其费用——基本上就是一次哈特里-福克计算的费用——也足够低，于是DFT如今成为计算化学与材料科学中使用最广的方法，从催化剂设计到半导体的带隙。本课将证明霍恩伯格-科恩（Hohenberg–Kohn）定理，导出使DFT变得实用的科恩-沙姆（Kohn–Sham）方程，搭建交换关联近似的层级，并解释这些近似在哪些地方、因何而失败。

全课采用原子单位（[[computational-chemistry/hartree-fock]]）。

## 密度作为基本变量

::: definition 电子密度 {#def-density}
对$N$电子波函数$\Psi(\mathbf{x}_1, \dots, \mathbf{x}_N)$，**电子密度**为
$$
\rho(\mathbf{r}) = N\int\lvert\Psi(\mathbf{r}\omega_1, \mathbf{x}_2, \dots, \mathbf{x}_N)\rvert^{2}\,\mathrm{d}\omega_1\,\mathrm{d}\mathbf{x}_2\cdots\mathrm{d}\mathbf{x}_N ,
$$
即在$\mathbf{r}$处找到*任一*电子的概率密度，归一化使$\int\rho\,\mathrm{d}\mathbf{r} = N$。它是可观测量（由X射线衍射测定），非负；在大距离处按$e^{-2\sqrt{2I}\,r}$指数衰减，其中$I$为第一电离能；并在核处有满足$\partial\bar\rho/\partial r = -2Z_A\bar\rho$的尖点（$\bar\rho$为对核$A$的球平均）。
:::

密度已经包含了确定哈密顿量所需的信息，至少对分子如此：尖点定出核的位置，其斜率给出核电荷，而积分给出$N$。既然$\hat H$由核的位置、电荷与$N$决定，密度就决定$\hat H$，继而决定其他一切。霍恩伯格与科恩把这一观察变成了对任意外势都成立的定理。

把电子哈密顿量写成$\hat H = \hat T + \hat V_\mathrm{ee} + \sum_i v(\mathbf{r}_i)$，其中$\hat T$与$\hat V_\mathrm{ee}$对一切$N$电子体系都相同，而**外势**$v(\mathbf{r})$（对分子即$-\sum_A Z_A/\lvert\mathbf{r} - \mathbf{R}_A\rvert$）承载了全部特殊性。$v$贡献的能量为$\int v\rho\,\mathrm{d}\mathbf{r}$，是密度的简单泛函。

## 霍恩伯格-科恩定理

::: theorem 霍恩伯格-科恩第一定理 {#thm-hk1}
对具有非简并基态的相互作用电子体系，外势$v(\mathbf{r})$由基态密度$\rho_0(\mathbf{r})$确定（至多差一个附加常数）。于是哈密顿量、基态波函数以及一切基态性质都是$\rho_0$的泛函。
:::

::: proof
设有两个势$v$与$v'$，其相差非常数，却给出同一个基态密度$\rho_0$。它们的哈密顿量$\hat H$与$\hat H'$的基态$\Psi$与$\Psi'$必不相同（若$\Psi = \Psi'$，两个薛定谔方程相减将给出$\sum_i[v(\mathbf{r}_i) - v'(\mathbf{r}_i)]\Psi = (E - E')\Psi$，从而强迫$v - v'$为常数）。由变分原理，以$\Psi'$作为$\hat H$的试探函数，
$$
E_0 < \langle\Psi'|\hat H|\Psi'\rangle = \langle\Psi'|\hat H'|\Psi'\rangle + \langle\Psi'|\hat H - \hat H'|\Psi'\rangle = E_0' + \int\left[v(\mathbf{r}) - v'(\mathbf{r})\right]\rho_0(\mathbf{r})\,\mathrm{d}\mathbf{r},
$$
其中严格不等号成立，因为$\Psi'$不是$\hat H$的非简并基态。交换带撇与不带撇体系的角色，得
$$
E_0' < E_0 + \int\left[v'(\mathbf{r}) - v(\mathbf{r})\right]\rho_0(\mathbf{r})\,\mathrm{d}\mathbf{r}.
$$
两不等式相加得$E_0 + E_0' < E_0' + E_0$，矛盾。所以相差非常数的两个势不可能共享同一个基态密度。
:::

这一定理说的是势到密度的映射可逆。它是一个存在性结论：并没有说*如何*从$\rho$得到$v$或$\Psi$。其实际后果是能量可以写成
$$
E_v[\rho] = F[\rho] + \int v(\mathbf{r})\rho(\mathbf{r})\,\mathrm{d}\mathbf{r}, \qquad F[\rho] = \langle\Psi[\rho]|\hat T + \hat V_\mathrm{ee}|\Psi[\rho]\rangle ,
$$ {#eq-hk-functional}
其中**普适泛函**$F[\rho]$对一切体系——原子、分子、固体——都相同，因为$\hat T$与$\hat V_\mathrm{ee}$相同。

::: theorem 霍恩伯格-科恩第二定理（密度的变分原理） {#thm-hk2}
对任何非负、积分为$N$、且是某个外势的基态密度的试探密度$\tilde\rho$，
$$
E_v[\tilde\rho] \geq E_v[\rho_0] = E_0 ,
$$
等号仅对$v$的真实基态密度$\rho_0$成立。
:::

::: proof
由第一定理，$\tilde\rho$决定一个势$\tilde v$与一个基态波函数$\tilde\Psi$。以$\tilde\Psi$作为势为$v$的哈密顿量的试探函数，
$$
\langle\tilde\Psi|\hat H|\tilde\Psi\rangle = F[\tilde\rho] + \int v\tilde\rho\,\mathrm{d}\mathbf{r} = E_v[\tilde\rho] \geq E_0
$$
由通常的变分原理成立，等号仅当$\tilde\Psi$是$\hat H$的基态，即$\tilde\rho = \rho_0$。
:::

要求$\tilde\rho$来自某个势（"$v$-可表示性"）很别扭，因为人们并不清楚哪些密度合格。勒维（Levy）的**约束搜索**（1979）去掉了这一要求：定义$F[\rho] = \min_{\Psi\to\rho}\langle\Psi|\hat T + \hat V_\mathrm{ee}|\Psi\rangle$，即对所有给出$\rho$的反对称波函数取最小。这对任何合理密度都有定义，能处理简并基态，并使极小化$E_0 = \min_\rho\{F[\rho] + \int v\rho\}$成为通常变分原理的两步版本。

### 无轨道泛函以及它们为何失败

若能显式知道$F[\rho]$，任何分子的基态只需对这一个三维函数的一个泛函做极小化即可得到。最老的尝试是**托马斯-费米**（Thomas–Fermi）模型（1927），它局域地取均匀电子气的动能，
$$
T_\mathrm{TF}[\rho] = C_\mathrm{F}\int\rho^{5/3}\,\mathrm{d}\mathbf{r}, \qquad C_\mathrm{F} = \tfrac{3}{10}(3\pi^{2})^{2/3} = 2.8712,
$$
排斥则用经典库仑（哈特里）能$J[\rho] = \tfrac{1}{2}\iint\rho(\mathbf{r})\rho(\mathbf{r}')/\lvert\mathbf{r} - \mathbf{r}'\rvert\,\mathrm{d}\mathbf{r}\,\mathrm{d}\mathbf{r}'$。

::: example 氢原子的托马斯-费米动能 {#ex-tf-hydrogen}
对精确的氢密度$\rho = e^{-2r}/\pi$计算$T_\mathrm{TF}$，并与精确动能$0.5\ \mathrm{E_h}$比较。
::: solution
$\int\rho^{5/3}\,\mathrm{d}\mathbf{r} = \pi^{-5/3}\,4\pi\int_0^{\infty}r^{2}e^{-10r/3}\,\mathrm{d}r = 4\pi^{-2/3}\cdot\frac{2}{(10/3)^{3}} = 0.2160\,\pi^{-2/3} = 0.10070$，所以$T_\mathrm{TF} = 2.8712 \times 0.10070 = 0.289\ \mathrm{E_h}$，仅为精确值的$58\ \%$。（适合单电子的自旋极化形式大$2^{2/3}$倍：$0.459\ \mathrm{E_h}$，仍低$8\ \%$。）对单电子体系，精确动能由冯·魏茨泽克（von Weizsäcker）泛函$T_\mathrm{W} = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho\,\mathrm{d}\mathbf{r}$给出（[[#exr-vw]]）。动能依赖于轨道的*形状*，尤其是梯度与壳层结构，而$\rho$的局域函数无法捕捉这些；泰勒（Teller）1962年证明了托马斯-费米理论完全不束缚任何分子。
:::
:::

## 科恩-沙姆方程

科恩与沙姆的洞见（1965）是：不再试图把动能写成密度的显式泛函，而是改用轨道精确地算出其中的大部分。

设想一个由$N$个**无相互作用**电子组成的虚构体系，在有效势$v_\mathrm{s}(\mathbf{r})$中运动，该势的选取使其基态密度等于真实密度$\rho$。它的基态是由轨道$\phi_i$构成的单个斯莱特行列式，且
$$
\rho(\mathbf{r}) = \sum_{i}^{N}\lvert\phi_i(\mathbf{r})\rvert^{2}, \qquad T_\mathrm{s}[\rho] = \sum_i\left\langle\phi_i\left|-\tfrac{1}{2}\nabla^{2}\right|\phi_i\right\rangle .
$$
$T_\mathrm{s}$不是真实动能，但很接近（它包含托马斯-费米所缺的全部壳层结构），而且能被精确计算。

::: definition 交换关联能 {#def-exc}
把普适泛函写成
$$
F[\rho] = T_\mathrm{s}[\rho] + J[\rho] + E_\mathrm{xc}[\rho],
$$
这就*定义*了**交换关联能**$E_\mathrm{xc}[\rho] = (T - T_\mathrm{s}) + (V_\mathrm{ee} - J)$：动能关联能加上全部非经典的电子-电子相互作用（交换、库仑关联，以及对$J$中所含自相互作用的修正）。它的泛函导数$v_\mathrm{xc}(\mathbf{r}) = \delta E_\mathrm{xc}/\delta\rho(\mathbf{r})$称为**交换关联势**。通常把$E_\mathrm{xc}$分成$E_\mathrm{x} + E_\mathrm{c}$，其中$E_\mathrm{x}$定义为科恩-沙姆行列式的类哈特里-福克交换能。
:::

未知的物理现在全在$E_\mathrm{xc}$之中，它比$T$或$V_\mathrm{ee}$小得多，也更适合近似。

::: proposition 科恩-沙姆方程 {#prop-ks}
在正交归一轨道上极小化$E[\rho] = T_\mathrm{s}[\rho] + J[\rho] + E_\mathrm{xc}[\rho] + \int v\rho\,\mathrm{d}\mathbf{r}$，得
$$
\left[-\tfrac{1}{2}\nabla^{2} + v_\mathrm{s}(\mathbf{r})\right]\phi_i = \varepsilon_i\phi_i, \qquad
v_\mathrm{s}(\mathbf{r}) = v(\mathbf{r}) + \int\frac{\rho(\mathbf{r}')}{\lvert\mathbf{r} - \mathbf{r}'\rvert}\,\mathrm{d}\mathbf{r}' + v_\mathrm{xc}(\mathbf{r}),
$$
其中$\rho = \sum_i\lvert\phi_i\rvert^{2}$对最低的$N$个轨道求和。总能量为
$$
E = \sum_i\varepsilon_i - J[\rho] + E_\mathrm{xc}[\rho] - \int v_\mathrm{xc}\rho\,\mathrm{d}\mathbf{r}.
$$
若$E_\mathrm{xc}$精确，科恩-沙姆密度与能量也将精确。
:::

::: proof
像[[computational-chemistry/hartree-fock#prop-hf-equations]]那样，对$\phi_k^{*}$作变分并配以正交归一的拉格朗日乘数。动能项给出$-\tfrac{1}{2}\nabla^{2}\phi_k$。其余各项只通过$\rho$依赖轨道，而$\delta\rho(\mathbf{r})/\delta\phi_k^{*}(\mathbf{r}') = \phi_k(\mathbf{r})\delta(\mathbf{r} - \mathbf{r}')$，所以由链式法则，每项的贡献是其泛函导数乘以$\phi_k$：$\delta J/\delta\rho$是哈特里势，$\delta E_\mathrm{xc}/\delta\rho = v_\mathrm{xc}$，$\delta(\int v\rho)/\delta\rho = v$。将对角化乘数即得正则方程。对能量，$\sum_i\varepsilon_i = T_\mathrm{s} + \int v_\mathrm{s}\rho = T_\mathrm{s} + \int v\rho + 2J + \int v_\mathrm{xc}\rho$；解出$T_\mathrm{s}$代入，即得所述公式。
:::

科恩-沙姆方程与哈特里-福克方程的结构完全相同，只是非局域交换算符换成了局域势$v_\mathrm{xc}$。在基组中它们化为$\mathbf{F}^\mathrm{KS}\mathbf{C} = \mathbf{SC}\boldsymbol\varepsilon$，用[[computational-chemistry/hartree-fock#alg-scf]]的自洽场程序求解；交换关联矩阵元在原子心格点上数值求积。形式费用与哈特里-福克相同（$K^{3}$–$K^{4}$），但结果中包含关联。这一组合正是DFT成功的全部原因。

科恩-沙姆轨道与本征值有何含义？它们是那个虚构的无相互作用体系的轨道，不是物理客体；但它们通常与哈特里-福克轨道相似，可按同样的方式用于定性的成键分析。有一个本征值有精确含义：对精确泛函，最高占据本征值等于第一电离能的负值，$\varepsilon_\mathrm{HOMO} = -I$（HOMO：最高占据分子轨道），因为它支配密度的渐近衰减。其余本征值没有严格解释，近似泛函甚至连HOMO条件也严重违背，下面的例子将说明这一点。

## 局域密度近似

对$E_\mathrm{xc}$的第一个也是最简单的近似，取自唯一精确已知的体系：**均匀电子气**，密度$\rho$恒定并由均匀正背景中和。其每个电子的交换能精确已知（狄拉克，1930），每个电子的关联能由量子蒙特卡洛算出（Ceperley 与 Alder，1980），并被拟合为解析形式（Vosko、Wilk 与 Nusair，1980；Perdew 与 Wang，1992）。

::: definition 局域密度近似 {#def-lda}
在**局域密度近似**（local density approximation, LDA）中，每个体积元贡献局域密度下均匀气体的交换关联能：
$$
E_\mathrm{xc}^\mathrm{LDA}[\rho] = \int\rho(\mathbf{r})\,\epsilon_\mathrm{xc}^\mathrm{unif}\!\left(\rho(\mathbf{r})\right)\mathrm{d}\mathbf{r}, \qquad
E_\mathrm{x}^\mathrm{LDA} = -C_\mathrm{x}\int\rho^{4/3}\,\mathrm{d}\mathbf{r}, \quad C_\mathrm{x} = \tfrac{3}{4}\left(\tfrac{3}{\pi}\right)^{1/3} = 0.7386 .
$$
对自旋极化体系（**局域自旋密度近似**，LSDA），交换对不同自旋分别求值：$E_\mathrm{x}^\mathrm{LSDA} = -2^{1/3}C_\mathrm{x}\int(\rho_\alpha^{4/3} + \rho_\beta^{4/3})\,\mathrm{d}\mathbf{r}$。
:::

交换项中的$4/3$次幂并非随意；它是精确交换能服从的一条标度律所强制的。

::: proposition 交换能的均匀标度 {#prop-scaling}
对称度$\lambda$压缩体系（保持$N$不变）的标度密度$\rho_\lambda(\mathbf{r}) = \lambda^{3}\rho(\lambda\mathbf{r})$，精确交换能满足$E_\mathrm{x}[\rho_\lambda] = \lambda E_\mathrm{x}[\rho]$。具有这一性质、形如$\int f(\rho)\,\mathrm{d}\mathbf{r}$的局域泛函只有$f(\rho) \propto \rho^{4/3}$。
:::

::: proof
把斯莱特行列式的一切坐标按$\lambda$标度，使轨道乘以$\lambda^{3/2}$（保持归一化）、$1/r_{12}$乘以$\lambda$；因此交换积分$K_{ij}$按$\lambda$标度，$E_\mathrm{x}$亦然。对局域泛函，$\int f(\lambda^{3}\rho(\lambda\mathbf{r}))\,\mathrm{d}\mathbf{r} = \lambda^{-3}\int f(\lambda^{3}\rho(\mathbf{u}))\,\mathrm{d}\mathbf{u}$。要求它对一切密度都等于$\lambda\int f(\rho)\,\mathrm{d}\mathbf{u}$，就需要$f(\lambda^{3}\rho) = \lambda^{4}f(\rho)$，即$f$是$\rho$的$4/3$次齐次函数：$f = c\rho^{4/3}$。常数$c = -C_\mathrm{x}$来自均匀气体。同样的论证对动能给出$\rho^{5/3}$，因为动能按$\lambda^{2}$标度。
:::

::: example 氢原子的LDA交换 {#ex-lda-h}
对精确的氢密度$\rho = e^{-2r}/\pi$，计算LSDA交换能，并与精确交换能比较；对单电子体系，后者必须抵消哈特里自排斥$J = 5/16\ \mathrm{E_h}$。
::: solution
$\int\rho^{4/3}\,\mathrm{d}\mathbf{r} = \pi^{-4/3}\,4\pi\int_0^{\infty}r^{2}e^{-8r/3}\,\mathrm{d}r = 4\pi^{-1/3}\cdot\frac{2}{(8/3)^{3}} = 0.42188\,\pi^{-1/3} = 0.28805$。电子完全自旋极化（$\rho_\alpha = \rho$，$\rho_\beta = 0$），
$$
E_\mathrm{x}^\mathrm{LSDA} = -2^{1/3} \times 0.73856 \times 0.28805 = -0.2680\ \mathrm{E_h}.
$$
精确交换为$-J = -0.3125\ \mathrm{E_h}$，LSDA把它的大小低估了$14\ \%$。更糟的是，这一密度的LSDA关联能不是零而是$-0.0222\ \mathrm{E_h}$（Perdew-Wang参数化），而单个电子没有关联。净的**自相互作用误差**为$J + E_\mathrm{x} + E_\mathrm{c} = 0.3125 - 0.2680 - 0.0222 = +0.0223\ \mathrm{E_h}$：电子部分地排斥它自己。自洽LSDA给出$E(\mathrm{H}) = -0.4787\ \mathrm{E_h}$，而非$-0.5$。
:::
:::

::: example 氦的科恩-沙姆LDA {#ex-lda-he}
在数值径向格点上做的自洽科恩-沙姆计算（自旋非极化，斯莱特交换加Perdew-Wang关联）给出氦：$E = -2.8345\ \mathrm{E_h}$、$T_\mathrm{s} = 2.7674$、$J = 1.9959$、$E_\mathrm{x} = -0.8617$、$E_\mathrm{c} = -0.1111\ \mathrm{E_h}$，且$\varepsilon_{1s} = -0.5703\ \mathrm{E_h}$。只含交换时$E = -2.7236\ \mathrm{E_h}$。与哈特里-福克（$-2.8617$）、精确能量（$-2.9037$）、HF密度的精确交换能（$-1.0257\ \mathrm{E_h}$）以及电离能（$24.59\ \mathrm{eV}$）作比较。
::: solution
- LDA的总能量比精确值高$0.069\ \mathrm{E_h}$，但那是大误差相互抵消的结果：LDA交换的大小差了$0.164\ \mathrm{E_h}$（拿$-0.862$与$-1.026$对比），而LDA关联$-0.111\ \mathrm{E_h}$却是氦真实关联能（$-0.042\ \mathrm{E_h}$）的*两倍*以上。交换与关联的误差部分抵消——这是LDA的系统性特征；LDA之所以能用，是因为它所模拟的*交换关联空穴*满足精确求和规则，尽管其各部分单独都不满足。
- 只含交换的LDA（$-2.724$）远差于拥有精确交换的哈特里-福克（$-2.862$）。
- HOMO本征值给出$-\varepsilon_{1s} = 0.5703\ \mathrm{E_h} = 15.5\ \mathrm{eV}$，而精确值$I = 24.59\ \mathrm{eV}$：误差$37\ \%$。LDA势按指数衰减而非按$-1/r$衰减（又是自相互作用），所以最外层电子束缚得太松。LDA的*总能量差*（$\Delta$SCF：$E(\mathrm{He^{+}}) - E(\mathrm{He})$）给出的电离能比本征值好得多。
:::
:::

LDA对固体出奇地好，也能给出合理的几何，但它使分子**结合过强**，原子化能通常偏高$100$–$150\ \mathrm{kJ\,mol^{-1}}$，对化学来说过多得多。真实分子的密度远非均匀，补救之道是让泛函依赖密度变化的快慢。

## 雅各布天梯：GGA、meta-GGA与杂化泛函

珀德夫（Perdew）关于**雅各布天梯**（Jacob's ladder）的比喻把泛函按所用原料排成梯级，每一级都增添信息、也（但愿如此）增添精度：

| 梯级 | 原料 | 代表 |
|---|---|---|
| 1. LDA | $\rho$ | SVWN、PW92 |
| 2. GGA | $\rho$、$\nabla\rho$ | BLYP、PBE、BP86 |
| 3. meta-GGA | $\rho$、$\nabla\rho$、$\tau = \tfrac{1}{2}\sum_i\lvert\nabla\phi_i\rvert^{2}$ | TPSS、SCAN、r²SCAN、M06-L |
| 4. 杂化 | + 精确（类HF）交换 | B3LYP、PBE0、M06-2X、ωB97X |
| 5. 双重杂化 | + 虚轨道（类MP2关联） | B2PLYP、DSD-PBEP86 |

**广义梯度近似**（generalised gradient approximation, GGA）把交换能写成LDA交换乘以一个**增强因子**，后者依赖无量纲的约化梯度$s = \lvert\nabla\rho\rvert/[2(3\pi^{2})^{1/3}\rho^{4/3}]$：
$$
E_\mathrm{x}^\mathrm{GGA} = -C_\mathrm{x}\int\rho^{4/3}F_\mathrm{x}(s)\,\mathrm{d}\mathbf{r}.
$$
在PBE（Perdew、Burke 与 Ernzerhof，1996）中，$F_\mathrm{x}(s) = 1 + \kappa - \kappa/(1 + \mu s^{2}/\kappa)$，其中$\mu = 0.2195$由关联能的梯度展开固定，$\kappa = 0.804$由交换能的Lieb-Oxford界固定。贝克（Becke）的B88交换则只含一个对稀有气体原子交换能拟合的参数。GGA把LDA的过结合降低一个数量级，原子化能的误差约$20$–$40\ \mathrm{kJ\,mol^{-1}}$。

::: widget plot
f: 1 + k - k/(1 + 0.2195*x^2/k); 1
x: 0, 4
y: 0.9, 2.0
sliders: k=0.804:0.2:1.5:0.004
labels: F_x^{\mathrm{PBE}}(s); \text{LDA}
hlines: 1.804
caption: PBE交换增强因子$F_\mathrm{x}(s)$对约化梯度$s$作图。$s = 0$（均匀气体）时它等于$1$，PBE退化为LDA；在密度变化快的区域——原子的外层与成键区，典型地$s \approx 1$–$3$——交换被增强（$s = 1$时增强$17\ \%$），这使原子的能量比分子降得更多，从而治好了LDA大部分的过结合。上界$1 + \kappa$强制满足Lieb-Oxford界；增大$\kappa$（revPBE用$1.245$）会改变大$s$处的行为。
:::

**杂化泛函**掺入一定比例的精确交换，它像哈特里-福克那样由科恩-沙姆轨道算出。贝克（1993）的论证来自绝热连接：电子-电子相互作用为零时，精确的交换关联能*就是*精确交换，所以泛函里理应有若干精确交换。化学中使用最广的泛函是B3LYP，
$$
E_\mathrm{xc}^\mathrm{B3LYP} = (1 - a_0)E_\mathrm{x}^\mathrm{LSDA} + a_0E_\mathrm{x}^\mathrm{HF} + a_\mathrm{x}\Delta E_\mathrm{x}^\mathrm{B88} + (1 - a_\mathrm{c})E_\mathrm{c}^\mathrm{VWN} + a_\mathrm{c}E_\mathrm{c}^\mathrm{LYP},
$$
其中$a_0 = 0.20$、$a_\mathrm{x} = 0.72$、$a_\mathrm{c} = 0.81$，是三个对热化学数据拟合的经验参数。PBE0则改用PBE加$25\ \%$精确交换，不含拟合参数。**范围分离杂化泛函**（CAM-B3LYP、ωB97X）主要在远程使用精确交换，这修正了渐近势，大幅改善电荷转移激发与HOMO能量。杂化泛函的原子化能通常可达$10$–$20\ \mathrm{kJ\,mol^{-1}}$，是分子热化学的默认选择；精确交换项使其比GGA更昂贵，用平面波基组时尤甚。

::: quiz
沿雅各布天梯向上攀登时，泛函的哪项性质保证得到改善？
- [ ] 总能量成为精确能量的上界。
- [ ] 每一项化学性质都变得更准。
- [x] 什么都不保证：梯级越高原料越多，平均表现通常越好，但向精确泛函并没有有系统的收敛。
- [ ] 费用下降。
::: solution
与[[computational-chemistry/electron-correlation]]的波函数层级不同，DFT近似对精确能量不是变分的（近似泛函能给出低于精确值的能量），也不构成收敛序列。梯级越高，满足的精确约束越多、拟合的数据越多，但个别性质可能变差。对照可靠的参考数据做基准测试必不可少。
:::
:::

## 自相互作用误差与离域误差

[[#ex-lda-h]]的自相互作用误差不只是原子物理的奇谈。考虑一个具有*分数*电子数$N_0 + \delta$（$0 < \delta < 1$）的体系，把它理解为系综。珀德夫、帕尔（Parr）、勒维与巴尔杜（Balduz）1982年证明，精确能量在整数之间是一条直线，
$$
E(N_0 + \delta) = (1 - \delta)E(N_0) + \delta E(N_0 + 1),
$$
并在每个整数处有导数不连续。近似半局域泛函给出的却是位于直线下方的*凸*曲线：它们偏爱分数电荷，把电子摊得太薄。这一**离域误差**造成一系列特征性失败：$\mathrm{H_2^{+}}$以过低的能量解离成两个各带$\tfrac{1}{2}$个电子的"半质子"；势垒过低（过渡态的键被拉长、离域，被过度稳定）；电荷转移复合物转移了过多的电荷；半导体的带隙小得离谱。

::: widget plot
f: -2 - 0.9037*(x - 1); -2 - 0.9037*(x - 1) - c*(x - 1)*(2 - x)/2
x: 1, 2
y: -3.0, -1.8
sliders: c=0.6:0:1.2:0.01
labels: \text{精确（线性）}; \text{近似泛函（下凸）}
caption: 在$\mathrm{He^{+}}$（$N = 1$，$-2.0\ \mathrm{E_h}$）与$\mathrm{He}$（$N = 2$，$-2.9037\ \mathrm{E_h}$）之间，能量对电子数作图。精确曲线是斜率为$-I$的直线。半局域泛函（示意性地，曲率`c`）给出一条下凸曲线，其端点斜率$\mathrm{d}E/\mathrm{d}N = \varepsilon_\mathrm{HOMO}$在$N = 2$处浅了$c/2$——这就是[[#ex-lda-he]]中氦的LDA HOMO低估电离能的原因。哈特里-福克朝相反方向出错（上凸），所以兼混两者的杂化泛函可以几乎笔直。
:::

::: warning 科恩-沙姆本征值不是激发能 {#warn-gap}
半局域科恩-沙姆计算的HOMO–LUMO能隙（LUMO：最低未占分子轨道）*不是*基本带隙$I - A$的估计，也不是光学带隙的估计。即便用精确泛函，科恩-沙姆带隙也与$I - A$相差$E_\mathrm{xc}$的导数不连续量，而半局域泛函没有导数不连续。对硅，LDA给出的科恩-沙姆带隙约$0.5\ \mathrm{eV}$，而实测为$1.17\ \mathrm{eV}$；对许多氧化物误差更大。求激发能请用$\Delta$SCF能量差、范围分离或其他杂化泛函、多体（$GW$）方法或含时DFT，轨道能量差只可作定性指标。
:::

## 色散

伦敦色散来自相距遥远的片段上电子的关联涨落；它按$-C_6/R^{6}$下降，是一种非局域关联效应。半局域泛函只看每一点及其紧邻处的密度，产生不了它：在两氩原子密度不重叠的距离上，LDA与GGA的相互作用能干脆为零，许多GGA在范德华距离上甚至表现为排斥。既然色散支配着分子晶体的结构、生物大分子的折叠、药物的结合以及分子在表面的吸附，这一遗漏就很严重。权宜的补救办法（Grimme的D2、D3、D4校正）加上一项原子-原子的成对项，
$$
E_\mathrm{disp} = -\sum_{A<B}\sum_{n=6,8}s_n\frac{C_n^{AB}}{R_{AB}^{n}}f_\mathrm{damp}(R_{AB}),
$$
其中系数$C_6^{AB}$由含时DFT的极化率算出（在D3中它们依赖每个原子的配位环境），阻尼函数$f_\mathrm{damp}$在近程关闭校正——在近程，泛函本身已能描述该相互作用，而$R^{-6}$展开已经发散。标度参数$s_n$与阻尼参数对每个泛函分别拟合。非局域关联泛函（vdW-DF、VV10）把色散直接内置于泛函之中。

::: example 氩二聚体中的色散 {#ex-disp-ar}
氩二聚体的$C_6$系数为$64.3\ \mathrm{E_h}\,a_0^{6}$。在平衡距离$R_e = 3.76\ \mathrm{\AA}$处计算无阻尼的$-C_6/R^{6}$能量，并与势阱深度$1.18\ \mathrm{kJ\,mol^{-1}}$比较。没有校正的GGA会预言什么？
::: solution
$R_e = 3.76/0.529177 = 7.105\ a_0$，且$R_e^{6} = 1.287\times10^{5}\ a_0^{6}$，于是
$$
-\frac{C_6}{R^{6}} = -\frac{64.3}{1.287\times10^{5}}\ \mathrm{E_h} = -5.00\times10^{-4}\ \mathrm{E_h} = -1.31\ \mathrm{kJ\,mol^{-1}}.
$$
单是$C_6$项就略大于整个结合能；在$R_e$处，更高阶的色散项（$C_8$、$C_{10}$）再添吸引，而泡利排斥抵消掉多余的部分。像PBE这样的GGA对氩二聚体的结合只有真实值的一小部分，且距离偏长，revPBE或BLYP则几乎根本没有极小值。加上D3校正后，结合能与距离都接近实验值。
:::
:::

::: widget plot
f: -c6*0.529177^6*2625.5/x^6; -c6*0.529177^6*2625.5/x^6/(1 + exp(-d*(x/r0 - 1)))
x: 2.5, 7
y: -6, 0.5
sliders: c6=64.3:20:150:0.1; d=20:5:40:1; r0=3.2:2.5:4.2:0.01
labels: -C_6/R^6\ (\mathrm{kJ\,mol^{-1}}); \text{阻尼后}
vlines: 3.76
caption: 两氩原子的色散能对距离（单位埃）作图：裸的$-C_6/R^{6}$（$C_6 = 64.3\ \mathrm{E_h}\,a_0^{6}$），以及同一项乘以Grimme D2校正所用那类费米型阻尼函数$1/[1 + e^{-d(R/R_0 - 1)}]$。裸项在近程发散；阻尼项在$R_0$以内被关闭，那里泛函已经考虑了重叠的密度。移动$R_0$与$d$，看看平衡位置（竖线）附近校正量对阻尼的依赖有多强——这就是阻尼参数要对每个泛函分别拟合的原因。
:::

## DFT实践

以下几点区分DFT实践的好与坏。

- **按问题选择泛函**，以Goerigk与Grimme的GMTKN55数据库一类的基准为指导：对一般的主族热化学与动力学，用带色散校正的杂化或双重杂化泛函（例如ωB97X-V、PBE0-D3，至少也要B3LYP-D3，或DSD-PBEP86-D3）；对过渡金属化学，同时比较若干泛函，因为自旋态能量对精确交换的比例高度敏感；对固体，用PBE、PBEsol或SCAN，带隙再用杂化泛函校正。
- **除非泛函自身包含色散，一律加上色散校正**。
- **收敛积分格点**：交换关联积分按数值计算，粗格点会造成能量噪声与虚假虚频，在meta-GGA中尤其会造成误差。
- **基组**的收敛比关联方法快；三ζ质量（def2-TZVP）通常足够，阴离子需加弥散函数（[[computational-chemistry/basis-sets]]）。
- **警惕强关联**：用标准泛函的DFT继承了科恩-沙姆理论的单行列式形式，对双自由基与拉长的键可能失效；对称性破缺计算是权宜而不完美的补救。

好的杂化泛函的典型精度是：反应能与势垒$10$–$20\ \mathrm{kJ\,mol^{-1}}$，键长$0.01\ \AA$，振动频率几个百分点——比CCSD(T)差，但费用允许处理几百个原子，而且有力可算，使几何优化与从头算分子动力学成为常规。

## 后续内容

科恩-沙姆DFT是多数应用工作的电子结构引擎：几何优化与过渡态（[[computational-chemistry/potential-energy-surfaces]]）、从头算分子动力学（[[computational-chemistry/molecular-dynamics]]）、QM/MM模型的量子区与溶剂化计算（[[computational-chemistry/solvation-qmmm]]），以及固体与催化表面的能带结构（[[materials-chemistry]]、[[organometallics-catalysis]]）。含时密度泛函理论把该理论扩展到激发能与紫外-可见光谱（[[spectroscopy]]）。

::: history
托马斯（Llewellyn Thomas，1927）与费米（Fermi，1928）提出了原子的第一个密度泛函模型，狄拉克1930年加上了局域交换项。斯莱特1951年对哈特里-福克交换的"$X\alpha$"近似在密度上是局域的，开了LDA的先声。霍恩伯格（Pierre Hohenberg）与科恩（Walter Kohn）1964年证明了他们的定理，科恩与沙姆（Lu Jeu Sham）1965年发表了科恩-沙姆方程。勒维的约束搜索表述随后于1979年出现，塞珀利（Ceperley）与奥尔德（Alder）对电子气的量子蒙特卡洛研究（1980）给出了各种LDA所用的关联能。贝克1988年的交换泛函与李（Lee）、杨（Yang）、帕尔1988年的关联泛函（LYP）使梯度修正的DFT对化学足够精确，贝克1993年的杂化方案导致了B3LYP。珀德夫、伯克（Burke）与恩策霍夫（Ernzerhof）的PBE发表于1996年。科恩与波普分享1998年诺贝尔化学奖，理由是"发展了密度泛函理论"。格里梅（Grimme）的经验色散校正（2004、2006，D3在2010年）使带色散校正的DFT成为标准实践。
:::

::: summary
- 霍恩伯格-科恩第一定理：基态密度决定外势，从而决定一切；第二定理：真实密度使能量泛函取极小。
- 普适泛函$F[\rho]$未知；托马斯-费米一类的无轨道近似之所以失败，是因为动能依赖于轨道形状。
- 科恩-沙姆理论由轨道精确计算无相互作用动能$T_\mathrm{s}$，把未知物理收进$E_\mathrm{xc}$；方程具有哈特里-福克式的结构与费用。
- LDA从均匀电子气取$E_\mathrm{xc}$，其中交换$-C_\mathrm{x}\int\rho^{4/3}$由标度律强制；它使分子结合过强，交换与关联的误差部分抵消。
- GGA加入密度梯度，meta-GGA加入动能密度，杂化泛函加入一定比例的精确交换（B3LYP $20\ \%$，PBE0 $25\ \%$）；沿雅各布天梯向上并无收敛保证。
- 自相互作用与离域误差使HOMO能量偏高（LDA下氦为$15.5$而非$24.6\ \mathrm{eV}$）、势垒偏低、带隙偏小。
- 半局域泛函缺失色散，必须补上（D3、D4、VV10）。
:::

## 习题

::: exercise 交换常数 {level=1 check="0.7386"}
计算$C_\mathrm{x} = \tfrac{3}{4}(3/\pi)^{1/3}$。（保留四位有效数字输入。）
::: solution
$3/\pi = 0.95493$，其立方根为$0.98475$；$C_\mathrm{x} = 0.75 \times 0.98475 = 0.7386$。
:::
:::

::: exercise 氢原子的LSDA交换 {level=1 check="-0.268"}
已知氢密度的$\int\rho^{4/3}\,\mathrm{d}\mathbf{r} = 0.28805$，计算完全自旋极化的LSDA交换能$-2^{1/3}C_\mathrm{x}\int\rho^{4/3}$。（以$\mathrm{E_h}$为单位、保留三位有效数字输入。）
::: solution
$-1.25992 \times 0.73856 \times 0.28805 = -0.268\ \mathrm{E_h}$，而精确值为$-0.3125\ \mathrm{E_h}$。
:::
:::

::: exercise B3LYP的精确交换 {level=1 check="-1.8"}
某分子的B3LYP计算给出其科恩-沙姆行列式的精确交换能$E_\mathrm{x}^\mathrm{HF} = -9.0\ \mathrm{E_h}$。精确交换项对B3LYP交换关联能的贡献是多少？（以$\mathrm{E_h}$为单位输入。）
::: solution
$a_0E_\mathrm{x}^\mathrm{HF} = 0.20 \times (-9.0) = -1.8\ \mathrm{E_h}$；其余$80\ \%$的"LSDA"交换与B88梯度修正提供剩下的部分。
:::
:::

::: exercise 标度到$\mathrm{He^{+}}$ {level=2 check="-0.536"}
电荷为$Z$的类氢离子的密度，是按$\lambda = Z$标度的氢密度。用[[#prop-scaling]]给出$\mathrm{He^{+}}$的LSDA交换能，并与精确交换比较。（以$\mathrm{E_h}$为单位输入$E_\mathrm{x}^\mathrm{LSDA}$。）
::: solution
LDA交换线性标度：$E_\mathrm{x}^\mathrm{LSDA}(\mathrm{He^{+}}) = 2 \times (-0.2680) = -0.536\ \mathrm{E_h}$。精确交换$-J = -5Z/16 = -0.625\ \mathrm{E_h}$按同样方式标度，所以相对误差（$14\ \%$）对一切单电子离子都相同——这是两者服从同一条标度律的结果。
:::
:::

::: exercise 近程的色散 {level=2 check="-5.09"}
对$C_6 = 64.3\ \mathrm{E_h}\,a_0^{6}$的两个氩原子，计算$R = 3.00\ \mathrm{\AA}$处无阻尼的$-C_6/R^{6}$。（以$\mathrm{kJ\,mol^{-1}}$为单位、保留三位有效数字输入。）
::: solution
$R = 5.669\ a_0$，$R^{6} = 3.32\times10^{4}\ a_0^{6}$，所以$-C_6/R^{6} = -1.937\times10^{-3}\ \mathrm{E_h} = -5.09\ \mathrm{kJ\,mol^{-1}}$——是真实势阱深度的四倍，而在这个距离上两原子实际上是强排斥的。这就是需要阻尼的原因。
:::
:::

::: exercise 科恩-沙姆能量表达式 {level=2 check="-2.8344"}
对[[#ex-lda-he]]的LDA氦计算，各分量为$T_\mathrm{s} = 2.7674$、$E_\mathrm{ne} = \int v\rho = -6.6249$、$J = 1.9959$、$E_\mathrm{x} = -0.8617$、$E_\mathrm{c} = -0.1111\ \mathrm{E_h}$。计算总能量，并检查结果偏离维里关系$E = -T$有多远。（以$\mathrm{E_h}$为单位、保留四位小数输入$E$。）
::: solution
$E = T_\mathrm{s} + E_\mathrm{ne} + J + E_\mathrm{x} + E_\mathrm{c} = 2.7674 - 6.6249 + 1.9959 - 0.8617 - 0.1111 = -2.8344\ \mathrm{E_h}$（用未舍入的分量得$-2.83445\ \mathrm{E_h}$）。$-T_\mathrm{s} = -2.7674$与$E$相差$0.067\ \mathrm{E_h}$；在精确的科恩-沙姆理论中，维里定理对*真实*动能$T = T_\mathrm{s} + T_\mathrm{c}$成立，而动能关联能$T_\mathrm{c}$藏在$E_\mathrm{xc}$之内，所以$E \neq -T_\mathrm{s}$是意料之中的。
:::
:::

::: exercise 冯·魏茨泽克泛函 {level=3 check="0.5" #exr-vw}
证明对任一具有实轨道$\phi = \sqrt{\rho}$的单电子体系，动能等于$T_\mathrm{W} = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho\,\mathrm{d}\mathbf{r}$，并对氢基态求值。（以$\mathrm{E_h}$为单位输入$T_\mathrm{W}$。）
::: solution
$T = \tfrac{1}{2}\int\lvert\nabla\phi\rvert^{2}$（分部积分），而$\nabla\sqrt\rho = \nabla\rho/2\sqrt\rho$，所以$T = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho$。对$\rho = e^{-2r}/\pi$，$\lvert\nabla\rho\rvert = 2\rho$，故$T_\mathrm{W} = \tfrac{1}{8}\int 4\rho\,\mathrm{d}\mathbf{r} = \tfrac{1}{2}\int\rho = 0.5\ \mathrm{E_h}$，精确。对多电子体系，$T_\mathrm{W}$只是$T_\mathrm{s}$的下界。
:::
:::

::: exercise 曲率与HOMO {level=3 check="0.668"}
设某近似泛函对$\mathrm{He^{+}}$与$\mathrm{He}$给出精确能量，但在两者之间给出下凸曲线$E(1 + t) = E_\mathrm{line}(t) - \tfrac{c}{2}t(1 - t)$。证明$N = 2$处从左取的$\mathrm{d}E/\mathrm{d}N$为$-I + c/2$，并求当$I = 0.9037\ \mathrm{E_h}$时使$-\varepsilon_\mathrm{HOMO} = 0.5703\ \mathrm{E_h}$所需的曲率$c$（以$\mathrm{E_h}$计）。（输入$c$。）
::: solution
$E_\mathrm{line}$的斜率为$-I$。对$-\tfrac{c}{2}(t - t^{2})$求导得$-\tfrac{c}{2}(1 - 2t)$，在$t = 1$处为$+c/2$。由贾纳克（Janak）定理，HOMO本征值就是这一斜率，所以$\varepsilon_\mathrm{HOMO} = -I + c/2$，即$c = 2(I + \varepsilon_\mathrm{HOMO}) = 2(0.9037 - 0.5703) = 0.668\ \mathrm{E_h}$。（真实LDA中端点能量并不精确，所以这只是一个模型；它表明不大的曲率就能造成很大的HOMO误差。）
:::
:::
