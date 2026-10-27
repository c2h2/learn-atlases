离散把一个微分方程变成一组代数方程，每个单元一个：$a_P\phi_P = \sum a_{nb}\phi_{nb} + S_u$（[[computational-fluid-dynamics/finite-volume-diffusion]]）。一个规模适中的工业网格有一千万个单元；每个单元有若干个变量，因此一次定常计算意味着求解具有数千万未知数的方程组，而且不止一次，而是随着非线性外迭代的进行要求解数百次；非定常计算则在每个时间步上重复这一过程。在典型的不可压缩 CFD 计算中，大部分计算时间都花在一个地方：压强方程的线性求解器。因此，选择和监控这个求解器绝非细枝末节。

本课研究 CFD 产生的方程组以及求解它们的方法：直接消元（及其廉价的三对角形式——托马斯算法），经典迭代法（雅可比迭代、高斯-赛德尔迭代、逐次超松弛），这些方法在细网格上变慢的原因，以及解决这一问题的两种思想——**多重网格**和共轭梯度法等**克雷洛夫子空间**方法。最后讨论如何判断迭代已经收敛，这并不像听起来那么显而易见。线性代数背景知识见数学图谱（[直接法](/learn/maths/lesson.php?c=numerical-analysis&l=direct-methods)和[迭代法](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods)）。

## CFD 矩阵的结构

把离散方程汇集为$\mathbf{A}\boldsymbol{\phi} = \mathbf{b}$，第$P$行的对角元为$a_P$，邻点所在列的元素为$-a_{nb}$。这个矩阵有三个重要性质。

- **稀疏性。** 每行的非零元个数只等于该单元的邻点数加一：在结构网格上，一维为$3$，二维为$5$，三维为$7$；在非结构网格上通常为$5$–$15$。一个有$N = 10^7$行的矩阵约有$10^8$个非零元，而不是$10^{14}$个元素。只存储非零元。
- **对角占优。** 帕坦卡法则（正系数，$a_P = \sum a_{nb} - S_P$且$S_P \le 0$）使每一行都满足$\lvert a_P\rvert \ge \sum\lvert a_{nb}\rvert$，在与第一类边界相邻或具有负斜率源项的行中严格不等式成立。
- **对称性。** 采用两点通量的纯扩散问题给出对称矩阵（单元$P$的$a_E$等于单元$E$的$a_W$，二者是同一个面热导）；此时它还是正定的。对流使矩阵不对称（[[computational-fluid-dynamics/convection-diffusion]]）；不可压缩流动的压强方程是对称的（[[computational-fluid-dynamics/pressure-velocity]]）。

::: definition 残差、误差与收敛速率 {#def-residual}
对于$\mathbf{A}\boldsymbol{\phi} = \mathbf{b}$的解$\boldsymbol{\phi}$的近似$\boldsymbol{\phi}^{(k)}$：
- **误差**为$\mathbf{e}^{(k)} = \boldsymbol{\phi} - \boldsymbol{\phi}^{(k)}$（实际中未知）；
- **残差**为$\mathbf{r}^{(k)} = \mathbf{b} - \mathbf{A}\boldsymbol{\phi}^{(k)}$（可以计算），且$\mathbf{A}\mathbf{e}^{(k)} = \mathbf{r}^{(k)}$；
- 若误差最终每次迭代约缩小为原来的$\rho$倍，则称该迭代的**渐近收敛因子**为$\rho$；此时把误差缩小为原来的$\epsilon$倍约需$\ln\epsilon/\ln\rho$次迭代。
:::

## 直接求解：消元与托马斯算法

高斯消元法能在有限次运算内求解任何非奇异方程组——对稠密矩阵约需$\tfrac23N^3$次运算，$N = 10^4$时已达$7\times10^{11}$，$N = 10^7$时则不可想象。对于半带宽为$b$的**带状**矩阵（与对角线距离超过$b$处没有非零元），消元不会在带外产生新元素，计算量降至约$2Nb^2$。按行编号的$n \times n$个单元的二维结构网格有$b = n$，计算量为$O(n^4) = O(N^2)$；在三维中带内填充严重。现代稀疏直接求解器（通过重排序限制填充）对二维问题和中等规模的三维问题非常出色，被用于耦合求解器内部和多重网格的粗网格层，但对于 CFD 中的大型三维方程组，迭代法更胜一筹。

例外而且是主力的情形是一维问题。**三对角**方程组的$b = 1$，消元的计算量为$O(N)$。

::: algorithm 托马斯算法（TDMA） {#alg-tdma}
对于$N$个方程$a_i\phi_i = b_i\phi_{i+1} + c_i\phi_{i-1} + d_i$，$i = 1, \dots, N$，其中$c_1 = 0$，$b_N = 0$：
1. **向前扫描。** 令$P_1 = b_1/a_1$，$Q_1 = d_1/a_1$，对$i = 2, \dots, N$：
$$
P_i = \frac{b_i}{a_i - c_iP_{i-1}},\qquad Q_i = \frac{d_i + c_iQ_{i-1}}{a_i - c_iP_{i-1}} .
$$
2. **回代。** 令$\phi_N = Q_N$，对$i = N-1, \dots, 1$：$\phi_i = P_i\phi_{i+1} + Q_i$。

计算量：约$8N$次运算，存储$2N$个数。当$\lvert a_i\rvert \ge \lvert b_i\rvert + \lvert c_i\rvert$且至少有一行严格不等式成立时，递推是稳定的（舍入误差不增长）——这正是帕坦卡法则所保证的。
:::

向前扫描把每个未知量用下一个未知量表示，$\phi_i = P_i\phi_{i+1} + Q_i$：把$\phi_{i-1} = P_{i-1}\phi_i + Q_{i-1}$代入第$i$个方程并解出$\phi_i$，即得上述公式。

::: example 用托马斯算法求解导热杆问题 {#ex-tdma}
用托马斯算法求解[[computational-fluid-dynamics/finite-volume-diffusion#ex-rod]]中的五个方程——$a_P = (300, 200, 200, 200, 300)$，所有邻点系数均为$100$，$S_u = (20\,000, 0, 0, 0, 100\,000)$。
::: solution
按算法中的记号，$a_i = a_P$，$b_i = a_E$，$c_i = a_W$，$d_i = S_u$。

| $i$ | $a_i - c_iP_{i-1}$ | $P_i$ | $Q_i$ |
|---|---|---|---|
| 1 | $300$ | $100/300 = 0.3333$ | $20\,000/300 = 66.667$ |
| 2 | $200 - 100(0.3333) = 166.67$ | $0.6000$ | $(0 + 100 \times 66.667)/166.67 = 40.000$ |
| 3 | $200 - 60 = 140$ | $0.7143$ | $4000/140 = 28.571$ |
| 4 | $200 - 71.43 = 128.57$ | $0.7778$ | $2857.1/128.57 = 22.222$ |
| 5 | $300 - 77.78 = 222.22$ | $0$ | $(100\,000 + 2222.2)/222.22 = 460.00$ |

回代：$\phi_5 = 460$，$\phi_4 = 0.7778 \times 460 + 22.222 = 380$，$\phi_3 = 0.7143 \times 380 + 28.571 = 300$，$\phi_2 = 0.6 \times 300 + 40 = 220$，$\phi_1 = 0.3333 \times 220 + 66.667 = 140\,^\circ\mathrm{C}$——与之前求得的解相同。合理性检查：每个主元$a_i - c_iP_{i-1}$都为正，每个$P_i$都在$0$和$1$之间，这是对角占优方程组的递推稳定的标志。
:::
:::

在二维和三维中，托马斯算法仍可作为基本构件使用：**逐线 TDMA**把相邻网格线上的值视为已知，一次求解沿一条网格线的所有未知量，然后逐线扫过整个计算域，并交替扫描方向。它在一次扫描中就把边界信息沿整条线传递，因此对于在某一方向上强耦合的问题，它比逐点迭代快得多。

## 经典迭代法

迭代法从一个猜测值出发并不断改进它。所有经典方法都来自矩阵的分裂$\mathbf{A} = \mathbf{M} - \mathbf{N}$，其中$\mathbf{M}$易于求逆，并进行迭代
$$
\mathbf{M}\boldsymbol{\phi}^{(k+1)} = \mathbf{N}\boldsymbol{\phi}^{(k)} + \mathbf{b} .
$$ {#eq-splitting}
记$\mathbf{A} = \mathbf{D} - \mathbf{L} - \mathbf{U}$，其中$\mathbf{D}$为对角部分，$-\mathbf{L}$、$-\mathbf{U}$分别为严格下三角和严格上三角部分。

- **雅可比迭代**，$\mathbf{M} = \mathbf{D}$：每个节点都用其邻点的**旧**值更新，$\phi_P^{(k+1)} = \left(\sum a_{nb}\phi_{nb}^{(k)} + S_u\right)/a_P$。
- **高斯-赛德尔迭代**，$\mathbf{M} = \mathbf{D} - \mathbf{L}$：按顺序更新节点，每个节点都使用可用的**最新**邻点值。它只需要一份解向量的副本，通常收敛速度约为雅可比迭代的两倍。
- **逐次超松弛（SOR）**：先算出高斯-赛德尔值$\tilde\phi_P$，再越过它前进一段，$\phi_P^{(k+1)} = \phi_P^{(k)} + \omega(\tilde\phi_P - \phi_P^{(k)})$，其中$1 < \omega < 2$。

::: theorem 定常迭代的收敛性 {#thm-spectral-radius}
迭代[[#eq-splitting]]对每个初始向量和每个$\mathbf{b}$都收敛，当且仅当**迭代矩阵**$\mathbf{G} = \mathbf{M}^{-1}\mathbf{N}$的谱半径满足$\rho(\mathbf{G}) < 1$。误差满足$\mathbf{e}^{(k)} = \mathbf{G}^k\mathbf{e}^{(0)}$，并渐近地每次迭代缩小为原来的$\rho(\mathbf{G})$倍。
:::

::: proof
精确解满足$\mathbf{M}\boldsymbol{\phi} = \mathbf{N}\boldsymbol{\phi} + \mathbf{b}$。减去[[#eq-splitting]]得$\mathbf{M}\mathbf{e}^{(k+1)} = \mathbf{N}\mathbf{e}^{(k)}$，故$\mathbf{e}^{(k+1)} = \mathbf{G}\mathbf{e}^{(k)}$，$\mathbf{e}^{(k)} = \mathbf{G}^k\mathbf{e}^{(0)}$。若$\mathbf{G}$有完备的特征向量组$\mathbf{v}_j$，对应特征值$\lambda_j$，把$\mathbf{e}^{(0)} = \sum c_j\mathbf{v}_j$展开；则$\mathbf{e}^{(k)} = \sum c_j\lambda_j^k\mathbf{v}_j$，它对任意$c_j$都趋于零，当且仅当所有$\lvert\lambda_j\rvert < 1$，且衰减最慢的项像$\rho^k$一样缩小。（若$\mathbf{G}$是亏损矩阵，若尔当标准形给出同样的结论，只是带有不改变极限的多项式因子$k^m\rho^k$。）若某个$\lvert\lambda_j\rvert \ge 1$，则初始误差$\mathbf{e}^{(0)} = \mathbf{v}_j$不衰减。
:::

::: proposition 对角占优是雅可比迭代收敛的充分条件 {#prop-dd-jacobi}
若$\mathbf{A}$按行严格对角占优，即对每个$i$都有$\lvert a_{ii}\rvert > \sum_{j\ne i}\lvert a_{ij}\rvert$，则雅可比迭代收敛。
:::

::: proof
雅可比迭代矩阵$\mathbf{G}_J = \mathbf{D}^{-1}(\mathbf{L} + \mathbf{U})$的非对角元为$-a_{ij}/a_{ii}$，对角元为零。其最大绝对行和为$\lVert\mathbf{G}_J\rVert_\infty = \max_i\sum_{j\ne i}\lvert a_{ij}\rvert/\lvert a_{ii}\rvert < 1$。对任何诱导范数，每个特征值都满足$\lvert\lambda\rvert \le \lVert\mathbf{G}_J\rVert$（若$\mathbf{G}\mathbf{v} = \lambda\mathbf{v}$，则$\lvert\lambda\rvert\lVert\mathbf{v}\rVert = \lVert\mathbf{G}\mathbf{v}\rVert \le \lVert\mathbf{G}\rVert\lVert\mathbf{v}\rVert$），因此$\rho(\mathbf{G}_J) < 1$，[[#thm-spectral-radius]]适用。若为弱对角占优（某些行取等号），再加上不可约性且至少有一行严格不等式成立——这是 CFD 的典型情形，第一类边界提供了严格不等式的行——则经过稍长一些的论证可得同样的结论。
:::

::: example 手算雅可比迭代与高斯-赛德尔迭代 {#ex-jacobi-gs}
从零出发，对[[computational-fluid-dynamics/finite-differences#ex-btcs]]中的隐式导热方程组
$$
3T_1 - T_2 = 100,\qquad -T_1 + 3T_2 - T_3 = 100,\qquad -T_2 + 3T_3 = 100,
$$
分别进行三次雅可比迭代和高斯-赛德尔迭代，其解为$(57.14, 71.43, 57.14)$。比较最大残差。
::: solution
雅可比迭代只使用旧值：$T_1 = (100 + T_2)/3$，$T_2 = (100 + T_1 + T_3)/3$，$T_3 = (100 + T_2)/3$。

| 迭代次数 | $T_1$ | $T_2$ | $T_3$ | 最大残差 |
|---|---|---|---|---|
| 1 | 33.33 | 33.33 | 33.33 | 66.67 |
| 2 | 44.44 | 55.56 | 44.44 | 22.22 |
| 3 | 51.85 | 62.96 | 51.85 | 14.81 |

高斯-赛德尔迭代立即使用每个新值（按$T_1, T_2, T_3$的顺序）：

| 迭代次数 | $T_1$ | $T_2$ | $T_3$ | 最大残差 |
|---|---|---|---|---|
| 1 | 33.33 | 44.44 | 48.15 | 48.15 |
| 2 | 48.15 | 65.43 | 55.14 | 20.99 |
| 3 | 55.14 | 70.10 | 56.70 | 4.66 |

谱半径为$\rho_J = \sqrt2/3 = 0.471$和$\rho_{GS} = \rho_J^2 = 0.222$（对于这类矩阵，高斯-赛德尔迭代的速率是雅可比迭代速率的平方）：高斯-赛德尔迭代一次的收获相当于雅可比迭代两次。合理性检查：两个序列都从下方逼近解且没有过冲，这符合对角占优 M 矩阵从零出发的预期。
:::
:::

::: widget iterative
matrix: 3,-1; -1,3
b: 2,2
method: jacobi
start: 0,0
caption: 两节点导热方程组$3x - y = 2$，$-x + 3y = 2$（解为$x = y = 1$）的雅可比迭代过程，画在以解为交点的两条直线上。每一步雅可比迭代都用旧值同时移动两个未知量；把方法切换为高斯-赛德尔迭代，路径就变成阶梯形，以更少的步数到达解。试试$\omega$在$1$和$1.2$之间的 SOR：适度的超松弛在这里有帮助；$\omega$接近$2$时会过冲并振荡。收敛之所以快，是因为矩阵强对角占优（$3$对$1$）；把对角元改为$1.1$，看看它如何慢如蜗行。
:::

## 经典迭代为何在细网格上停滞

对于模型问题——具有$N$个内部节点的一维泊松方程（$-\phi_{i-1} + 2\phi_i - \phi_{i+1} = h^2 f_i$）——雅可比矩阵的特征向量是正弦模态$\sin(j\pi x_i)$，特征值为$\cos\theta_j$，$\theta_j = j\pi/(N+1)$。谱半径为
$$
\rho_J = \cos\frac{\pi}{N+1} \approx 1 - \frac{\pi^2}{2(N+1)^2},\qquad \rho_{GS} = \rho_J^2 \approx 1 - \frac{\pi^2}{(N+1)^2} .
$$ {#eq-rho-poisson}
对于$N \times N$网格上的二维泊松方程，这些值同样成立。网格加密时$\rho \to 1$，把误差缩小固定倍数所需的迭代次数按$N^2$增长——而每次迭代的工作量按未知量个数增长。在细网格上，经典方法变得毫无希望。

::: example 加密网格上的迭代次数 {#ex-iteration-count}
对于每个方向有$N = 99$个内部点的泊松问题，雅可比迭代、高斯-赛德尔迭代和最优 SOR 把误差缩小为原来的$10^{-6}$各需多少次迭代？
::: solution
$\rho_J = \cos(\pi/100) = 0.999507$，因此雅可比迭代需要$\ln 10^{-6}/\ln 0.999507 = 27\,991$次迭代；高斯-赛德尔迭代的$\rho_{GS} = 0.999013$，需要其一半：$13\,996$次。对于 SOR，最优因子（Young 理论，适用于这类矩阵）为
$$
\omega_{\text{opt}} = \frac{2}{1 + \sqrt{1 - \rho_J^2}} = \frac{2}{1 + \sin(\pi/100)} = 1.9391,\qquad \rho_{\text{SOR}} = \omega_{\text{opt}} - 1 = 0.9391,
$$
需要$\ln 10^{-6}/\ln 0.9391 = 220$次迭代。合理性检查：SOR 的迭代次数按$N$而不是$N^2$增长——这是很大的收益——但必须准确知道$\omega_{\text{opt}}$，而在 CFD 中，矩阵在每次外迭代之间都会变化，因此很少能准确知道它。
:::
:::

变慢的深层原因可以从特征值中看出。波数为$\theta_j$的误差分量在每次雅可比迭代中被乘以$\cos\theta_j$。对于**光滑**模态（$\theta$接近$0$），这一因子接近$1$：这些模态几乎不受影响。对于振荡模态（$\theta$接近$\pi$），$\cos\theta \approx -1$，阻尼也很差——但这很容易通过亚松弛解决。**加权雅可比迭代**$\boldsymbol{\phi}^{(k+1)} = \boldsymbol{\phi}^{(k)} + \omega\mathbf{D}^{-1}\mathbf{r}^{(k)}$的放大因子为
$$
G(\theta) = 1 - \omega + \omega\cos\theta = 1 - 2\omega\sin^2(\theta/2),
$$ {#eq-weighted-jacobi}
取$\omega = \tfrac23$时，每个满足$\pi/2 \le \theta \le \pi$的模态每次迭代至少缩小为原来的$1/3$。经典迭代是出色的**光滑器**：它们在几次扫描中就能消除误差的粗糙部分。它们做不到的是消除光滑部分，因为局部更新无法把信息快速地传过很大的计算域——一次雅可比扫描中信息只移动一个单元。

::: widget plot
f: 1 - 2*w*sin(x/2)^2; abs(1 - 2*w*sin(x/2)^2)
x: 0, pi
y: -1, 1
sliders: w=0.667:0.1:1:0.01
labels: G(\theta)\ \text{加权雅可比}; |G(\theta)|
vlines: 1.5708
hlines: 0.3333; -0.3333
caption: 泊松方程加权雅可比迭代的放大因子随误差波数$\theta = k\Delta x$的变化，权重$\omega$由滑块设定。虚线左侧是光滑模态（波长大于四个单元）；右侧是粗糙模态。在$\omega = 2/3$时，每个粗糙模态每次扫描至少被阻尼三倍——这就是光滑性质——而$\theta = 0$附近的光滑模态无论$\omega$取何值，$|G|$都接近$1$。在$\omega = 1$（普通雅可比迭代）时，最粗糙的模态$\theta = \pi$完全没有被阻尼。
:::

## 多重网格

多重网格思想把这一弱点变成了一种策略。在细网格上光滑的模态，在较粗的网格上看起来是粗糙的，在那里可以被高效地光滑——而且粗网格的未知量要少得多。因此：在细网格上光滑，把剩余的（光滑的）误差问题转移到粗网格上，在那里求解，再把修正量带回来。

::: algorithm 双网格修正格式 {#alg-multigrid}
要在细网格$h$上借助粗网格$2h$求解$\mathbf{A}_h\boldsymbol{\phi}_h = \mathbf{b}_h$：
1. **前光滑：** 对$\boldsymbol{\phi}_h$进行$\nu_1$次（通常为$1$–$3$次）光滑器（加权雅可比、高斯-赛德尔、ILU）扫描。
2. **残差：** $\mathbf{r}_h = \mathbf{b}_h - \mathbf{A}_h\boldsymbol{\phi}_h$；误差满足$\mathbf{A}_h\mathbf{e}_h = \mathbf{r}_h$，此时已是光滑的。
3. **限制：** $\mathbf{r}_{2h} = \mathbf{R}\,\mathbf{r}_h$（例如，对构成每个粗单元的细单元残差求和或取平均）。
4. **粗网格求解：** 求解$\mathbf{A}_{2h}\mathbf{e}_{2h} = \mathbf{r}_{2h}$，其中$\mathbf{A}_{2h}$是在粗网格上离散的同一方程（几何多重网格），或以代数方式构造为$\mathbf{R}\mathbf{A}_h\mathbf{P}$（代数多重网格）。
5. **延拓与修正：** $\boldsymbol{\phi}_h \leftarrow \boldsymbol{\phi}_h + \mathbf{P}\,\mathbf{e}_{2h}$（由粗网格向细网格插值）。
6. **后光滑：** 再进行$\nu_2$次扫描，消除插值引入的粗糙性。

对粗网格求解递归地应用这一格式，直到网格小到可以直接求解，就得到 **V 循环**。
:::

由于每一层网格的未知量是上一层的固定比例（三维中为$\tfrac18$），一个 V 循环的总工作量是一次细网格扫描的有界倍数，而对于椭圆型问题，一个 V 循环把误差缩小的倍数（常约为$0.1$）**不**依赖于网格尺寸。因此，求解到固定精度的代价为$O(N)$——这是最优的，因为仅仅写下答案就要花费$O(N)$。实际上每个基于压力的 CFD 程序都对其压强方程使用**代数多重网格**（AMG），因为 AMG 由矩阵本身构造粗网格层，因而无需几何网格层次就能用于非结构网格。

## 克雷洛夫子空间方法与预条件

另一类现代方法在**克雷洛夫子空间**$\operatorname{span}\{\mathbf{r}^{(0)}, \mathbf{A}\mathbf{r}^{(0)}, \mathbf{A}^2\mathbf{r}^{(0)}, \dots\}$中构造近似解，在每一步选择最佳组合，而不是施加固定的更新。

::: algorithm 共轭梯度法 {#alg-cg}
对于对称正定的$\mathbf{A}$，从$\boldsymbol{\phi}^{(0)}$出发，令$\mathbf{r}^{(0)} = \mathbf{b} - \mathbf{A}\boldsymbol{\phi}^{(0)}$，$\mathbf{p}^{(0)} = \mathbf{r}^{(0)}$，对$k = 0, 1, \dots$：
$$
\alpha_k = \frac{\mathbf{r}^{(k)\mathsf{T}}\mathbf{r}^{(k)}}{\mathbf{p}^{(k)\mathsf{T}}\mathbf{A}\mathbf{p}^{(k)}},\quad
\boldsymbol{\phi}^{(k+1)} = \boldsymbol{\phi}^{(k)} + \alpha_k\mathbf{p}^{(k)},\quad
\mathbf{r}^{(k+1)} = \mathbf{r}^{(k)} - \alpha_k\mathbf{A}\mathbf{p}^{(k)},
$$
$$
\beta_k = \frac{\mathbf{r}^{(k+1)\mathsf{T}}\mathbf{r}^{(k+1)}}{\mathbf{r}^{(k)\mathsf{T}}\mathbf{r}^{(k)}},\quad
\mathbf{p}^{(k+1)} = \mathbf{r}^{(k+1)} + \beta_k\mathbf{p}^{(k)} .
$$
当$\lVert\mathbf{r}^{(k+1)}\rVert$足够小时停止。每次迭代的代价是一次矩阵-向量乘积和几次向量运算。
:::

共轭梯度法在克雷洛夫子空间上使误差的能量范数最小，因此在精确算术下它至多$N$步就终止；更有用的是，它在$k$步后的误差有界：
$$
\lVert\mathbf{e}^{(k)}\rVert_{\mathbf{A}} \le 2\left(\frac{\sqrt\kappa - 1}{\sqrt\kappa + 1}\right)^k\lVert\mathbf{e}^{(0)}\rVert_{\mathbf{A}},
$$ {#eq-cg-bound}
其中$\kappa = \lambda_{\max}/\lambda_{\min}$为条件数。对于泊松问题，$\kappa \sim N^2$（每个方向），因此迭代次数按$N$增长，与最优 SOR 相同，但不需要调整任何参数。**预条件**——用一个近似$\mathbf{A}$且易于求逆的$\mathbf{M}$（例如不完全楚列斯基分解或不完全 LU 分解（ILU），或一个多重网格 V 循环）求解$\mathbf{M}^{-1}\mathbf{A}\boldsymbol{\phi} = \mathbf{M}^{-1}\mathbf{b}$——能大幅降低有效条件数和迭代次数。对于对流-扩散问题的非对称矩阵，相应的方法是 **BiCGSTAB** 和 **GMRES**，同样采用 ILU 或多重网格预条件。

::: example 需要多少次共轭梯度迭代？ {#ex-cg}
对于$N = 99$的一维泊松矩阵（特征值为$4\sin^2\!\big(j\pi/(2(N+1))\big)$），估计$\kappa$，以及界[[#eq-cg-bound]]所要求的把误差缩小为$10^{-6}$的 CG 迭代次数。
::: solution
$\lambda_{\min} = 4\sin^2(\pi/200) = 9.87\times10^{-4}$，$\lambda_{\max} = 4\sin^2(99\pi/200) = 3.999$，故$\kappa = 4052$，$\sqrt\kappa = 63.66$。因子为$(63.66 - 1)/(63.66 + 1) = 0.9691$，$2(0.9691)^k \le 10^{-6}$要求$k \ge \ln(5\times10^{-7})/\ln 0.9691 = 462$。但在精确算术下 CG 至多$N = 99$步就终止，实际上达到$10^{-6}$所需的步数还要更少：这个界是悲观的。合理性检查：$\kappa \approx 4(N+1)^2/\pi^2 = 4053$，与精确值吻合；由这个界得到的迭代次数约为最优 SOR 的两倍——同样是$O(N)$的标度，但无需$\omega$。
:::
:::

## 监控收敛

CFD 求解器在两个层次上迭代：线性求解器对每个线性化方程组进行的**内**迭代，以及更新系数（非线性对流、湍流物性、[[computational-fluid-dynamics/pressure-velocity]]中的压力-速度耦合）的**外**迭代。内迭代求解器不必严格收敛——通常每次外迭代中残差下降$0.1$到$0.01$倍就足够了——因为系数反正还会变化。在使用任何结果之前，外迭代必须充分收敛。

程序报告的是**标度残差**，例如$R_\phi = \sum_P\lvert a_P\phi_P - \sum a_{nb}\phi_{nb} - S_u\rvert / \sum_P\lvert a_P\phi_P\rvert$，或者以最初几次迭代后的值归一化的残差。人们常把下降四到五个数量级称为“已收敛”。这是一种约定，而不是保证：残差不是误差，$\mathbf{e} = \mathbf{A}^{-1}\mathbf{r}$，当$\mathbf{A}$病态时，即使$\lVert\mathbf{r}\rVert$很小，$\lVert\mathbf{e}\rVert$也可能很大。

::: proposition 由收敛速率估计误差 {#prop-error-estimate}
对于每次迭代以因子$\rho < 1$收敛的线性定常迭代，剩余误差近似为
$$
\lVert\mathbf{e}^{(k)}\rVert \approx \frac{\rho}{1 - \rho}\,\lVert\boldsymbol{\phi}^{(k)} - \boldsymbol{\phi}^{(k-1)}\rVert .
$$ {#eq-error-estimate}
:::

::: proof
在渐近阶段，误差由最慢的模态主导，$\mathbf{e}^{(k)} \approx \rho\,\mathbf{e}^{(k-1)}$。两次迭代之间的变化为$\boldsymbol{\phi}^{(k)} - \boldsymbol{\phi}^{(k-1)} = \mathbf{e}^{(k-1)} - \mathbf{e}^{(k)} \approx (1/\rho - 1)\mathbf{e}^{(k)}$。解出$\mathbf{e}^{(k)}$即得[[#eq-error-estimate]]。速率$\rho$本身可由相继变化量之比$\lVert\Delta^{(k)}\rVert/\lVert\Delta^{(k-1)}\rVert$估计。
:::

::: example 具有误导性的微小变化 {#ex-small-change}
某个被监控的温度每次迭代变化$2.0\times10^{-5}\ \mathrm{K}$，相继变化量之比为$0.995$。估计当前值与收敛值相差多少。
::: solution
$\rho = 0.995$，故$\lVert\mathbf{e}\rVert \approx \tfrac{0.995}{0.005} \times 2.0\times10^{-5} = 4.0\times10^{-3}\ \mathrm{K}$——是每次迭代变化量的两百倍。这里它无关紧要，但同样的推理用于每次迭代变化$10^{-5}$、$\rho = 0.9995$的阻力系数，得到的剩余误差为$0.02$——可能比所研究的效应还大。合理性检查：当$\rho \to 1$时因子$\rho/(1 - \rho)$无界增长；收敛缓慢的迭代恰恰是每次迭代的微小变化最不能说明问题的情形。
:::
:::

::: warning “残差已下降四个数量级”不是收敛判据
残差曲线是必要的检查，而不是充分的检查。归一化残差取决于初始猜测（好的初始猜测使归一化值很小，下降幅度显得不那么可观；差的初始猜测则使任何下降都显得很好）、程序所选的归一化方式以及方程组的条件数。应监控你将要报告的量——作用力、压降、热流量、关键点的温度——并持续计算，直到它们在你所需的精度内不再变化；检查全局平衡（流入质量$=$流出质量、能量）是否闭合；对于非定常计算，检查每个时间步内的收敛情况。
:::

::: quiz
在每个方向加密$2$倍的三维网格上，用 (a) 高斯-赛德尔迭代和 (b) 代数多重网格把压强方程求解到固定容差，其代价大约如何变化？
- [ ] 都增加为$8$倍
- [x] (a) 约$32$倍（未知量为八倍，迭代次数为四倍）；(b) 约$8$倍
- [ ] (a) 约$16$倍；(b) 约$16$倍
- [ ] (a) 约$8$倍；(b) 约$1$倍
::: solution
高斯-赛德尔迭代的迭代次数按每个方向的$N^2$增长：$N$加倍使迭代次数变为四倍，而每次迭代的代价变为八倍——总共$32$倍。多重网格的迭代次数与网格尺寸无关，因此代价随未知量个数缩放：$8$倍。
:::
:::

::: history
线性方程组的迭代求解可以追溯到高斯（Gauss），他在 19 世纪 20 年代的信件中描述了一种迭代方法；以及菲利普·路德维希·冯·赛德尔（Philipp Ludwig von Seidel）1874 年关于这一方法的论文，该方法如今以二人的名字命名。戴维·M·扬（David M. Young）1950 年的哈佛博士论文创立了逐次超松弛理论，包括最优松弛因子，恰逢电子计算机使大型方程组的求解成为常规之时。马格努斯·赫斯特内斯（Magnus Hestenes）和爱德华·施蒂费尔（Eduard Stiefel）于 1952 年发表了共轭梯度法（《美国国家标准局研究杂志》（*Journal of Research of the National Bureau of Standards*））；直到 20 世纪 70 年代有了预条件技术，它才在大型稀疏问题中变得实用。R. P. 费多连科（R. P. Fedorenko）于 1961 年在苏联描述了一种双网格松弛方法，而阿奇·布兰特（Achi Brandt）1977 年的论文《边值问题的多层自适应解法》（“Multi-level adaptive solutions to boundary-value problems”，《计算数学》（*Mathematics of Computation*））表明多重网格能以$O(N)$的工作量求解椭圆型问题，并使其成为一种通用技术。
:::

::: summary
- CFD 矩阵是稀疏的、对角占优的（满足帕坦卡法则时），对于扩散和压强问题还是对称正定的。
- 稠密消元的代价为$\tfrac23N^3$；托马斯算法以$O(N)$求解三对角方程组，并以逐线方式加速二维和三维迭代。
- 雅可比迭代、高斯-赛德尔迭代和 SOR 来自分裂$\mathbf{A} = \mathbf{M} - \mathbf{N}$；它们收敛当且仅当$\rho(\mathbf{M}^{-1}\mathbf{N}) < 1$，对角占优可保证这一点。
- 对于泊松问题，$\rho_J = \cos(\pi/(N+1))$：迭代次数按$N^2$（雅可比、高斯-赛德尔）或$N$（最优 SOR、CG）增长。
- 经典迭代能快速光滑粗糙误差，但留下光滑误差；多重网格在粗网格上消除光滑误差，代价为$O(N)$；AMG 是标准的压强求解器。
- CG（对称）以及 BiCGSTAB/GMRES（非对称）配合 ILU 或多重网格预条件，在$O(\sqrt\kappa)$次迭代内收敛。
- 残差不是误差：把剩余误差估计为每次迭代变化量的$\rho/(1-\rho)$倍，并直接监控工程量本身。
:::

## 习题

::: exercise 小型雅可比迭代的谱半径 {level=1 check="0.408"}
对于$\mathbf{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$，构造雅可比迭代矩阵并求其谱半径。（输入$\rho_J$，保留三位小数。）
::: solution
$\mathbf{G}_J = -\mathbf{D}^{-1}(\mathbf{A} - \mathbf{D}) = \begin{pmatrix} 0 & -1/4 \\ -2/3 & 0 \end{pmatrix}$，特征值满足$\lambda^2 = (1/4)(2/3) = 1/6$，故$\rho_J = 1/\sqrt6 = 0.408$。对于高斯-赛德尔迭代，$\rho_{GS} = \rho_J^2 = 0.167$。
:::
:::

::: exercise 所需迭代次数 {level=1 check="88"}
某迭代以因子$\rho = 0.90$收敛。把误差缩小为原来的$10^{-4}$需要多少次迭代？（输入最小的整数。）
::: solution
$k \ge \ln(10^{-4})/\ln(0.90) = 87.4$，故需要$88$次迭代。
:::
:::

::: exercise 最优超松弛 {level=1 check="1.753"}
对于某泊松型问题，雅可比迭代的$\rho_J = 0.99$。求最优 SOR 因子。（输入$\omega_{\text{opt}}$，保留三位小数。）
::: solution
$\omega_{\text{opt}} = 2/(1 + \sqrt{1 - 0.99^2}) = 2/(1 + 0.1411) = 1.753$，$\rho_{\text{SOR}} = 0.753$，而$\rho_{GS} = 0.980$：$\ln 0.980/\ln 0.753 \approx 0.07$，因此 SOR 所需迭代次数约为高斯-赛德尔迭代的十四分之一。
:::
:::

::: exercise 手算托马斯算法 {level=2 check="2.5"}
用托马斯算法求解$2\phi_1 - \phi_2 = 1$，$-\phi_1 + 2\phi_2 - \phi_3 = 0$，$-\phi_2 + 2\phi_3 = 3$，写出$P_i$和$Q_i$。（输入$\phi_3$。）
::: solution
$a_i = 2$，$b_i = c_i = 1$：$P_1 = 1/2$，$Q_1 = 1/2$；$P_2 = 1/(2 - 0.5) = 2/3$，$Q_2 = (0 + 0.5)/1.5 = 1/3$；$P_3 = 0$，$Q_3 = (3 + 1/3)/(2 - 2/3) = (10/3)/(4/3) = 2.5$。回代：$\phi_3 = 2.5$，$\phi_2 = \tfrac23(2.5) + \tfrac13 = 2$，$\phi_1 = \tfrac12(2) + \tfrac12 = 1.5$。检验第 2 行：$-1.5 + 4 - 2.5 = 0$。
:::
:::

::: exercise 剩余迭代误差 {level=2 check="0.00398"}
某被监控的出口温度在两次迭代之间变化$2.0\times10^{-5}\ \mathrm{K}$，相继的变化量按因子$0.995$缩小。估计剩余的迭代误差。（以 K 为单位输入，保留三位有效数字。）
::: solution
由[[#eq-error-estimate]]，$e \approx \rho\Delta/(1 - \rho) = 0.995 \times 2.0\times10^{-5}/0.005 = 3.98\times10^{-3}\ \mathrm{K}$。
:::
:::

::: exercise 直接求解的代价 {level=2 check="2e8"}
某二维结构网格有$100 \times 100$个单元，按行编号。估计带状高斯消元的运算次数$2Nb^2$，并与稠密消元的$\tfrac23N^3$比较。（输入带状消元的运算次数。）
::: solution
$N = 10^4$，半带宽为$b = 100$（在编号中，一个单元的北侧邻点相隔$100$个位置），因此$2Nb^2 = 2 \times 10^4 \times 10^4 = 2\times10^{8}$次运算，而稠密消元为$\tfrac23 \times 10^{12} = 6.7\times10^{11}$——多出$3000$多倍。代价是填充：整个带必须全部存储，即$2Nb = 2\times10^{6}$个数，而不是约$5\times10^{4}$个非零元。
:::
:::

::: exercise 对角占优下的高斯-赛德尔迭代 {level=3}
证明对于按行严格对角占优的矩阵，高斯-赛德尔迭代收敛。（提示：设$\mathbf{G}_{GS}\mathbf{v} = \lambda\mathbf{v}$且$\lvert\lambda\rvert \ge 1$，把$(\mathbf{D} - \mathbf{L})^{-1}\mathbf{U}\mathbf{v} = \lambda\mathbf{v}$写成$\lambda(\mathbf{D} - \mathbf{L})\mathbf{v} = \mathbf{U}\mathbf{v}$，并考察$\lvert v_i\rvert$最大的那一行。）
::: solution
由$\lambda(\mathbf{D} - \mathbf{L})\mathbf{v} = \mathbf{U}\mathbf{v}$，第$i$行为$\lambda a_{ii}v_i = -\lambda\sum_{j<i}a_{ij}v_j - \sum_{j>i}a_{ij}v_j$。取$i$使$\lvert v_i\rvert = \max_j\lvert v_j\rvert > 0$，并除以$\lvert v_i\rvert$：
$$
\lvert\lambda\rvert\lvert a_{ii}\rvert \le \lvert\lambda\rvert\sum_{j<i}\lvert a_{ij}\rvert + \sum_{j>i}\lvert a_{ij}\rvert \le \lvert\lambda\rvert\sum_{j\ne i}\lvert a_{ij}\rvert ,
$$
最后一步用到了$\lvert\lambda\rvert \ge 1$。除以$\lvert\lambda\rvert$得$\lvert a_{ii}\rvert \le \sum_{j\ne i}\lvert a_{ij}\rvert$，与严格对角占优矛盾。因此每个特征值都满足$\lvert\lambda\rvert < 1$，由[[#thm-spectral-radius]]，迭代收敛。
:::
:::

::: exercise 选择压强求解器 {level=3}
你正在一个有$2\times10^{7}$个单元的非结构网格上设置一个非定常不可压缩模拟，在$256$个处理器核上运行。为压强方程和动量方程选择线性求解器，说明选择的理由，并说明每个时间步中各自收敛到什么程度，以及你会监控什么。
::: solution
好的答案：压强方程是对称正定的椭圆型方程，也是代价最高的部分；应使用代数多重网格（作为求解器，或作为 CG 的预条件子），其单位精度的代价与网格规模无关，且适用于非结构网格；并行 AMG 需要谨慎处理粗网格层（聚合到较少的核上）。动量（以及湍流）方程不对称，但在小时间步下强对角占优（$a_P^0$项），因此几次高斯-赛德尔扫描或带 ILU 的 BiCGSTAB 就足够了。每个时间步中：压强残差大约下降两个数量级（或降到与所要求的连续性误差相一致的绝对容差），动量残差下降一到两个数量级，并进行足够的外迭代（PISO 修正步或 SIMPLE 类迭代，[[computational-fluid-dynamics/pressure-velocity]]），使被监控的量在时间步内不再变化。监控连续性误差、作用力或压降，以及内迭代次数（突然增加预示着问题：网格质量差、时间步长过大）。
:::
:::
