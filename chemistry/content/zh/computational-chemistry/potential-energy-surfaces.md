化学家向计算机提出的几乎所有问题，最终都归结为一个对象。这个分子是什么形状？哪个构象体能量最低？这个反应的势垒有多高，过渡态是什么样子？红外谱带在哪里？这些问题问的都是**势能面**——电子能量随核位置而变的函数。从这个观点看，电子结构方法（哈特里-福克、关联波函数、密度泛函理论）与力场不过是同一件事的不同机器：在某一个几何$\mathbf{R}$处求出一个数$E(\mathbf{R})$及其导数。本课讲的是有了这台机器之后我们用它做什么：驻点如何寻找并分类，Hessian矩阵如何变成振动频率，过渡态与反应路径如何定位。这里的一切都*与能量如何计算无关*，这正是本课程从它讲起的原因。

## 曲面及其驻点

玻恩-奥本海默近似（[[quantum-chemistry/chemical-bond-qm]]）把慢的核与快的电子分开。对每一个冻结的核排列求解一个电子问题；其最低本征值加上核排斥，就是核随后在其上运动的势。

::: definition 势能面 {#def-pes}
对$N$个原子、核坐标为$\mathbf{R} = (X_1, Y_1, Z_1, \dots, Z_N)$的分子，**势能面**（PES）是函数
$$
E(\mathbf{R}) = E_\mathrm{el}(\mathbf{R}) + V_\mathrm{NN}(\mathbf{R}),
$$
其中$E_\mathrm{el}(\mathbf{R})$是固定核下的电子能量，$V_\mathrm{NN} = \sum_{A<B} Z_A Z_B e^{2}/4\pi\varepsilon_0 R_{AB}$是核排斥。由于$E$不受整体平动与转动的影响，它只依赖于$3N - 6$个内部坐标（线性分子为$3N - 5$）。**梯度**$\mathbf{g} = \nabla E$的分量为$g_i = \partial E/\partial R_i$，核所受的力为$-\mathbf{g}$；**Hessian矩阵**是二阶导数构成的$3N \times 3N$实对称矩阵$H_{ij} = \partial^{2} E/\partial R_i\,\partial R_j$。
:::

双原子分子有$3 \times 2 - 5 = 1$个内部坐标，所以它的“曲面”是一条曲线$E(r)$；水有$3$个（两个键长与一个键角）；苯有$30$个。超过两维便无法直观可视化，这就是本课的语言是微积分的语言——梯度、Hessian矩阵、特征值——而不是图像的原因。像下面这样的二维模型曲面，是训练直觉的场地，而这种直觉必须在$30$维或$3000$维中盲用。

在任一几何$\mathbf{R}_0$附近，能量可展开为泰勒级数（多变量情形见[Maths Atlas](/learn/maths/)）：
$$
E(\mathbf{R}_0 + \Delta\mathbf{R}) = E(\mathbf{R}_0) + \mathbf{g}\T\Delta\mathbf{R} + \tfrac{1}{2}\,\Delta\mathbf{R}\T\mathbf{H}\,\Delta\mathbf{R} + \cdots
$$ {#eq-taylor-pes}
本课的一切都建立在[[#eq-taylor-pes]]之上。梯度告诉你哪个方向是下坡；Hessian矩阵告诉你曲面如何弯曲。

::: proposition 驻点的分类 {#prop-stationary}
**驻点**是$\mathbf{g} = \mathbf{0}$的几何。去掉Hessian对应于整体平动与转动的六个（五个）零特征值，设$\lambda_1, \dots, \lambda_{3N-6}$为其余特征值。则
- 若一切$\lambda_k > 0$，该点是**局部极小值**——稳定结构（构象体、中间体、产物）；
- 若恰有一个$\lambda_k < 0$，它是**一阶鞍点**——**过渡态**；
- 若有$n > 1$个负特征值，它是$n$阶鞍点，它不是任何基元反应的过渡态。

负特征值的数目称为驻点的**指数**。
:::

::: proof
在驻点处[[#eq-taylor-pes]]的线性项消失，故到二阶为止$\Delta E = \tfrac{1}{2}\Delta\mathbf{R}\T\mathbf{H}\Delta\mathbf{R}$。由于$\mathbf{H}$是实对称的，它有一组正交归一的实特征值$\lambda_k$对应的特征向量$\mathbf{q}_k$。把$\Delta\mathbf{R} = \sum_k Q_k\mathbf{q}_k$展开便把二次型对角化：
$$
\Delta E = \tfrac{1}{2}\sum_k \lambda_k Q_k^{2}.
$$
若一切$\lambda_k > 0$，任何位移都抬高能量，该点是极小。若恰有一个$\lambda_k < 0$，则除一个特征方向外能量沿一切方向上升，而沿该方向在两侧都下降：该点沿一个方向是极大、在与它正交的$3N - 7$个方向上是极小——一座山口。有$n$个负特征值时，能量沿一个$n$维方向集合下降。排除六个零特征值，是因为平移或转动整个分子不改变任何东西。
:::

初等反应的**过渡态**是两个极小之间*最低*路径上的最高处，而这样的路径上最高处是一阶鞍点：沿路径它是极大，在每个垂直方向上它是极小，否则就会有一条从旁边绕过去的更低路径。这就是过渡态理论（[[kinetics/transition-state-theory]]，[[statistical-thermodynamics/statistical-rate-theory]]）建立在一阶鞍点而不是更高阶鞍点上的原因。

::: example 模型曲面上驻点的分类 {#ex-classify-mb}
穆勒-布朗（Müller–Brown）面是优化算法的标准二维测试：四个高斯型项之和，有三个极小与两个鞍点。在五个驻点处数值微分得到下面的能量与Hessian特征值（能量为任意单位）。对每一点进行分类，并给出从最深极小$\mathrm{M_1}$到最浅极小$\mathrm{M_3}$的势垒。

| 点 | $(x, y)$ | $E$ | $\lambda_1$ | $\lambda_2$ |
|---|---|---|---|---|
| $\mathrm{A}$ | $(-0.558, 1.442)$ | $-146.70$ | $410.5$ | $4068$ |
| $\mathrm{B}$ | $(0.623, 0.028)$ | $-108.17$ | $543.8$ | $3005$ |
| $\mathrm{C}$ | $(-0.050, 0.467)$ | $-80.77$ | $221.0$ | $1479$ |
| $\mathrm{D}$ | $(-0.822, 0.624)$ | $-40.66$ | $-750.9$ | $490.2$ |
| $\mathrm{E}$ | $(0.212, 0.293)$ | $-72.25$ | $-735.2$ | $510.9$ |
::: solution
A、B、C各有两个正特征值，它们是极小：$\mathrm{M_1} = \mathrm{A}$（最深，$-146.70$）、$\mathrm{M_2} = \mathrm{B}$（$-108.17$）与$\mathrm{M_3} = \mathrm{C}$（$-80.77$）。D与E各恰有一个负特征值：它们是一阶鞍点，即过渡态。几何上D位于A与C之间，E位于C与B之间。从A到C体系必须经过D，所以正向势垒为$E_\mathrm{D} - E_\mathrm{A} = -40.66 - (-146.70) = 106.04$，反向势垒（C回到A）为$E_\mathrm{D} - E_\mathrm{C} = 40.11$。注意C朝B方向有多浅：经过E的势垒只有$-72.25 - (-80.77) = 8.52$。一侧出口势垒很低的浅中间体，正是难以观测的反应性中间体的二维图像。
:::
:::

::: widget contour
f: min(-2*exp(-(x-1)^2 - 10*y^2) - exp(-x^2 - 10*(y-0.5)^2) - 1.7*exp(-6.5*(x+0.5)^2 + 11*(x+0.5)*(y-1.5) - 6.5*(y-1.5)^2) + 0.15*exp(0.7*(x+1)^2 + 0.6*(x+1)*(y-1) + 0.7*(y-1)^2), 0.5)
x: -1.5, 1.1
y: -0.4, 2.0
levels: 24
point: -0.6, 0.9
caption: 穆勒-布朗面，按$1/100$缩放并以$0.5$封顶，使等高线显示出化学上有意义的区域。拖动点：箭头是$\nabla E$，所以$-\nabla E$（力）横跨等高线指向低能方向。找出[[#ex-classify-mb]]的三个极小（闭合等高线）与两个鞍点（等高线成X形交叉处，梯度箭头在那里消失，尽管该点并非极小）。
:::

## 力：赫尔曼-费曼（Hellmann–Feynman）定理

要下坡就需要梯度。用有限差分计算梯度，每个几何需要$2 \times 3N$次能量求值，对五十个原子的分子来说是毁灭性的。幸运的是，本征值的导数有形式极其简洁的表达式。

::: theorem 赫尔曼-费曼定理 {#thm-hellmann-feynman}
设$\hat H(\lambda)$依赖参数$\lambda$（例如某个核坐标），$\psi(\lambda)$是归一化的*精确*本征函数$\hat H\psi = E\psi$。则
$$
\frac{\mathrm{d}E}{\mathrm{d}\lambda} = \left\langle \psi \left| \frac{\partial \hat H}{\partial\lambda} \right| \psi \right\rangle .
$$
对一切变分参数都已完全优化的变分近似波函数，同一结论也成立，*前提是这些参数本身不通过基组依赖于*$\lambda$。
:::

::: proof
对$E = \langle\psi|\hat H|\psi\rangle$求导：
$$
\frac{\mathrm{d}E}{\mathrm{d}\lambda} = \left\langle \frac{\partial\psi}{\partial\lambda}\right|\hat H\left|\psi\right\rangle + \left\langle\psi\left|\frac{\partial\hat H}{\partial\lambda}\right|\psi\right\rangle + \left\langle\psi\right|\hat H\left|\frac{\partial\psi}{\partial\lambda}\right\rangle .
$$
由于$\hat H$是厄米的且$\hat H\psi = E\psi$，第一项与第三项等于$E\left(\langle\partial_\lambda\psi|\psi\rangle + \langle\psi|\partial_\lambda\psi\rangle\right) = E\,\frac{\mathrm{d}}{\mathrm{d}\lambda}\langle\psi|\psi\rangle = 0$，因为归一化恒定。对变分波函数，同样的抵消之所以发生，是因为对每个变分参数$c$都有$\partial E/\partial c = 0$，于是$E$通过参数对$\lambda$的隐含依赖消失。
:::

对核坐标$X_A$，$\hat H$中依赖$X_A$的只有电子-核吸引与$V_\mathrm{NN}$，所以核$A$所受的力，就是电子密度与其余核施加的经典静电力——费曼1939年的“电力定理”。然而实际上，[[computational-chemistry/basis-sets]]中的原子心基函数随核一起移动，波函数参数*确实*依赖于$X_A$，于是多出**Pulay力**。程序会解析地算出它们；对我们关键的事实是：解析梯度的费用与一次能量计算相当，与$N$无关。Pulay在1969年为哈特里-福克引入的解析梯度，使常规的几何优化成为可能。

## 几何优化

**几何优化**就是搜索驻点，通常是极小。最简单的策略**最速下降法**沿力的方向走一步，$\Delta\mathbf{R} = -\alpha\mathbf{g}$，$\alpha$是某一步长。$\alpha$足够小时它总是下坡，但在长而窄的谷中很慢：梯度指向横穿谷的方向而不是沿谷方向，迭代点来回折线式摆动。补救办法是借助曲率。

令二次模型[[#eq-taylor-pes]]的梯度为零，$\mathbf{g} + \mathbf{H}\Delta\mathbf{R} = \mathbf{0}$，就得到假如曲面是二次时恰好落在驻点上的那一步。

::: algorithm 牛顿-拉夫逊（Newton–Raphson）（拟牛顿）优化 {#alg-newton}
1. 选择初始几何$\mathbf{R}_0$（来自化学直觉、晶体结构或力场优化）与初始Hessian$\mathbf{H}_0$（计算得到，或用键伸缩与弯曲搭成的廉价模型Hessian）。
2. 在$\mathbf{R}_k$处计算能量与解析梯度$\mathbf{g}_k$。
3. 解$\mathbf{H}_k\,\Delta\mathbf{R} = -\mathbf{g}_k$得牛顿步；若它长于信任半径，就将其缩小。
4. 置$\mathbf{R}_{k+1} = \mathbf{R}_k + \Delta\mathbf{R}$，并用梯度的改变更新Hessian（BFGS公式只用梯度即可完成）。
5. 当最大梯度分量、梯度均方根、最大步长与能量改变全部降到阈值（梯度通常为$\sim 10^{-4}\ \mathrm{E_h\,bohr^{-1}}$）以下时停止。
6. 计算完整Hessian并数负特征值，确认该点的性质（[[#prop-stationary]]）。
:::

在极小附近牛顿-拉夫逊*二次*收敛：每步正确位数大约翻倍。远离极小时Hessian的曲率可能不对，它可能走到任何地方——包括上坡走到鞍点或极大，因为牛顿步瞄准的是最近的*驻点*，而不是最近的极小。

::: example HCl莫尔斯（Morse）曲线上的牛顿-拉夫逊法 {#ex-newton-morse}
用莫尔斯势$V(r) = D_e\left[1 - e^{-a(r - r_e)}\right]^{2}$模拟HCl，$D_e = 4.618\ \mathrm{eV}$、$a = 1.868\ \mathrm{\AA^{-1}}$、$r_e = 1.2746\ \mathrm{\AA}$（这些参数在[[#ex-hcl-morse]]中导出）。从$r_0 = 1.400\ \mathrm{\AA}$出发取牛顿步$r_{k+1} = r_k - V'(r_k)/V''(r_k)$，并与步长$\alpha = 0.05\ \mathrm{\AA^{2}\,eV^{-1}}$的最速下降法比较。
::: solution
记$u = e^{-a(r - r_e)}$，则$V' = 2D_e a\,u(1 - u)$、$V'' = 2D_e a^{2}u(2u - 1)$。在$r_0 = 1.400\ \mathrm{\AA}$处$u = 0.791$，故$V' = 2.851\ \mathrm{eV\,\AA^{-1}}$、$V'' = 14.84\ \mathrm{eV\,\AA^{-2}}$。迭代序列为

| $k$ | 牛顿$r_k/\mathrm{\AA}$ | $V/\mathrm{eV}$ | 最速下降$r_k/\mathrm{\AA}$ | $V/\mathrm{eV}$ |
|---|---|---|---|---|
| 0 | $1.4000$ | $0.2015$ | $1.4000$ | $0.2015$ |
| 1 | $1.2079$ | $0.0811$ | $1.2574$ | $0.0049$ |
| 2 | $1.2640$ | $0.0018$ | $1.2864$ | $0.0022$ |
| 3 | $1.27425$ | $1.5\times10^{-6}$ | $1.2679$ | $7.1\times10^{-4}$ |
| 4 | $1.274550$ | $1\times10^{-12}$ | $1.2788$ | $2.9\times10^{-4}$ |

牛顿法的第一步过冲，因为在$1.400\ \mathrm{\AA}$处真实曲率（$14.8\ \mathrm{eV\,\AA^{-2}}$）不到极小处（$32.2\ \mathrm{eV\,\AA^{-2}}$）的一半；但从第2步起误差每步平方一次（$10^{-2}$、$3\times10^{-4}$、$3\times10^{-7}\ \mathrm{\AA}$）。最速下降法碰巧第一步走得好，但随后就绕$r_e$振荡，误差每步只缩小约$1.6$倍。在曲率相差悬殊的许多维中，这一对比要悬殊得多。
:::
:::

::: warning 牛顿法找的是驻点，不是极小 {#warn-newton}
在莫尔斯曲线的拐点之下，$r > r_e + (\ln 2)/a$（对HCl为$1.65\ \mathrm{\AA}$），曲率$V''$为负，牛顿步$-V'/V''$指向*外侧*：“优化”便朝着解离一路走过去。在许多维中，只要Hessian有负特征值就会发生同样的事：牛顿法奔向鞍点。因此实际程序在寻找极小时会把Hessian的特征值整体平移使之为正（有理函数法或信任域法），而在寻找过渡态时故意反其道而行之。而且优化收敛只证明$\mathbf{g} = \mathbf{0}$——务必检查Hessian。在对称性约束下找到的对称分子的“极小”，常常正是解除约束就会畸变的鞍点。
:::

::: widget gradientdescent
f: min(-2*exp(-(x-1)^2 - 10*y^2) - exp(-x^2 - 10*(y-0.5)^2) - 1.7*exp(-6.5*(x+0.5)^2 + 11*(x+0.5)*(y-1.5) - 6.5*(y-1.5)^2) + 0.15*exp(0.7*(x+1)^2 + 0.6*(x+1)*(y-1) + 0.7*(y-1)^2), 0.5)
start: -0.2, 1.0
rate: 0.01
steps: 60
x: -1.5, 1.1
y: -0.4, 2.0
caption: 缩放穆勒-布朗面上的最速下降法。从$(-0.2, 1.0)$出发它滑进$(-0.05, 0.47)$附近的浅极小$\mathrm{M_3}$——不是全局极小：局部优化器找到的只是出发盆地里的极小。把起点拖到其他盆地；把速率调到约$0.05$以上，迭代点就会沿陡峭的$y$方向两侧振荡（此处最大Hessian特征值约为$40$，只有速率$< 2/\lambda_\mathrm{max}$时下降才稳定）。改用牛顿法并从鞍点附近出发，就能看到它收敛到鞍点。
:::

## 简正模与振动频率

极小处的Hessian包含简谐振动谱。对单个坐标，曲率$k = V''(r_e)$与约化质量$\mu$给出$\omega = \sqrt{k/\mu}$，这一联系在[[quantum-chemistry/vibration-rotation]]中已经熟悉。在多维情形，质量因原子而异，必须先并入Hessian再对角化。

::: proposition 简谐简正模 {#prop-normal-modes}
在极小处定义质量加权坐标$q_i = \sqrt{m_i}\,\Delta R_i$与质量加权Hessian$F_{ij} = H_{ij}/\sqrt{m_i m_j}$。$\mathbf{F}$的特征值$\lambda_k$是简谐角频率的平方，$\omega_k = \sqrt{\lambda_k}$，即波数$\tilde\nu_k = \sqrt{\lambda_k}/2\pi c$；特征向量是**简正模**——每个原子以同一频率、同一相位振荡的集体位移。六个（五个）特征值为零（平动与转动）。在过渡态处，唯一的负特征值给出**虚频**$\omega = i\sqrt{|\lambda|}$，其特征向量就是沿反应坐标的运动。
:::

::: proof
到二阶为止，极小处核运动的经典拉格朗日量为
$$
L = \tfrac{1}{2}\sum_i m_i \Delta\dot R_i^{2} - \tfrac{1}{2}\sum_{ij} H_{ij}\,\Delta R_i\,\Delta R_j = \tfrac{1}{2}\sum_i \dot q_i^{2} - \tfrac{1}{2}\sum_{ij} F_{ij}\,q_i q_j ,
$$
所以运动方程为$\ddot{\mathbf{q}} = -\mathbf{F}\mathbf{q}$。试$\mathbf{q}(t) = \mathbf{v}\cos(\omega t + \phi)$：得$\mathbf{F}\mathbf{v} = \omega^{2}\mathbf{v}$，一个普通的对称本征值问题。它的正交归一特征向量把运动解耦为彼此独立的一维谐振子，每一个都与谐振子一样精确量子化。若不作质量加权，动能就不是等权平方项之和，问题便成为广义本征值问题$\mathbf{H}\mathbf{v} = \omega^{2}\mathbf{M}\mathbf{v}$，与上等价。
:::

::: example 从莫尔斯曲线到力常数：HCl {#ex-hcl-morse}
对$\mathrm{H^{35}Cl}$，简谐波数$\tilde\omega_e = 2990.95\ \mathrm{cm^{-1}}$，$D_e = 4.618\ \mathrm{eV}$（胡贝尔（Huber）与赫尔茨贝格（Herzberg）的汇编，取自NIST Chemistry WebBook所列数值）。求力常数、莫尔斯范围参数$a$与零点能。
::: solution
约化质量为$\mu = (1.007825 \times 34.968853)/(35.976678)\ \mathrm{u} = 0.979593\ \mathrm{u} = 1.62666\times10^{-27}\ \mathrm{kg}$。角频率$\omega = 2\pi c\tilde\omega_e = 2\pi \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2990.95\ \mathrm{cm^{-1}} = 5.6339\times10^{14}\ \mathrm{s^{-1}}$，于是
$$
k = \mu\omega^{2} = 1.62666\times10^{-27}\ \mathrm{kg} \times (5.6339\times10^{14}\ \mathrm{s^{-1}})^{2} = 516\ \mathrm{N\,m^{-1}} .
$$
莫尔斯势的$V''(r_e) = 2D_e a^{2}$，故$a = \omega\sqrt{\mu/2D_e}$；代入$D_e = 4.618 \times 1.60218\times10^{-19}\ \mathrm{J} = 7.3989\times10^{-19}\ \mathrm{J}$，
$$
a = 5.6339\times10^{14}\ \mathrm{s^{-1}} \times \sqrt{\frac{1.62666\times10^{-27}\ \mathrm{kg}}{2 \times 7.3989\times10^{-19}\ \mathrm{J}}} = 1.868\times10^{10}\ \mathrm{m^{-1}} = 1.868\ \mathrm{\AA^{-1}} .
$$
零点能为$\tfrac{1}{2}hc\tilde\omega_e = 1495.5\ \mathrm{cm^{-1}} = 0.1854\ \mathrm{eV}$，于是简谐估计的光谱解离能$D_0 = D_e - \tfrac{1}{2}hc\tilde\omega_e = 4.433\ \mathrm{eV}$（实测$D_0$为$4.434\ \mathrm{eV}$；非谐性把真实零点能级只移动约$13\ \mathrm{cm^{-1}}$）。与实验比较计算的$D_e$值时，务必先做这一零点能校正。
:::
:::

::: widget plot
f: D*(1 - exp(-a*(x - 1.2746)))^2; D*a^2*(x - 1.2746)^2
x: 0.8, 4
y: -0.5, 7
sliders: D=4.618:1:8:0.01; a=1.868:0.8:3:0.01
labels: \text{莫尔斯 } V(r)/\mathrm{eV}; \text{简谐 } \tfrac{1}{2}k(r-r_e)^2
hlines: 4.618
caption: HCl的莫尔斯曲线（$r$以埃为单位）与其相同底部曲率$k = 2D_e a^{2}$的简谐近似。对最低的几条振动能级，简谐模型好在百分之几以内，但它永不解离。改变$D_e$与$a$：曲线底部的曲率、从而简谐频率只依赖$D_e a^{2}$，而势阱宽度与解离极限分别依赖二者。这就是单靠频率计算给不出键能的原因。
:::

多原子分子在简谐近似下的**零点能**为$E_\mathrm{ZPE} = \tfrac{1}{2}\sum_k hc\tilde\nu_k$，对$3N - 6$个真实模式求和。这是一项可观的校正：小分子是每摩尔几十千焦，大分子是几百。它在反应物与过渡态之间不同（在过渡态处，反应坐标模式不是振动），于是把势垒改变每摩尔几至十几千焦；它还是大多数动力学同位素效应的根源。

::: example 水的零点能 {#ex-zpe-water}
$\mathrm{H_2O}$的简谐波数（对实测谱拟合）为$3832.2$、$1648.5$与$3942.5\ \mathrm{cm^{-1}}$。以$\mathrm{kJ\,mol^{-1}}$计算简谐零点能。
::: solution
$E_\mathrm{ZPE} = \tfrac{1}{2}(3832.2 + 1648.5 + 3942.5)\ \mathrm{cm^{-1}} = 4711.6\ \mathrm{cm^{-1}}$。摩尔换算因子为$hcN_\mathrm{A} = 6.62607\times10^{-34}\ \mathrm{J\,s} \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}} \times 6.02214\times10^{23}\ \mathrm{mol^{-1}} = 11.9627\ \mathrm{J\,mol^{-1}}$（每$\mathrm{cm^{-1}}$），故$E_\mathrm{ZPE} = 4711.6 \times 0.0119627\ \mathrm{kJ\,mol^{-1}} = 56.4\ \mathrm{kJ\,mol^{-1}}$。这约是把水原子化所需能量的$6\ \%$——远大于优秀方法力争的“化学精度”$4\ \mathrm{kJ\,mol^{-1}}$——是一项永远不可省略的校正。
:::
:::

计算的简谐频率与实验比较前，通常先乘一个经验的**缩放因子**（B3LYP配中等基组约$0.96$，哈特里-福克为$0.90$）。这个因子同时修正两件事：非谐性使真实基频低于简谐值，以及方法的系统误差。它是针对实验基频数据集拟合的经验校正；零点能有各自专门拟合的因子，同一个因子不可盲目用于零点能。

::: example 对称线性三原子分子的简正模 {#ex-co2-modes}
把$\mathrm{CO_2}$视为两根相同、力常数为$k$的弹簧把氧原子（质量$m_\mathrm{O}$）连到中心碳（质量$m_\mathrm{C}$）上，氧与氧之间无相互作用，只考虑沿轴向的运动。求两个伸缩频率及其比值。
::: solution
取位移$x_1, x_2, x_3$（O、C、O），势能为$V = \tfrac{1}{2}k(x_2 - x_1)^{2} + \tfrac{1}{2}k(x_3 - x_2)^{2}$，运动方程为
$$
m_\mathrm{O}\ddot x_1 = k(x_2 - x_1), \quad m_\mathrm{C}\ddot x_2 = k(x_1 - 2x_2 + x_3), \quad m_\mathrm{O}\ddot x_3 = k(x_2 - x_3).
$$
本征值问题有三个解。(i) $\omega = 0$：整体平动。(ii) **对称伸缩**，$x_1 = -x_3$、$x_2 = 0$：碳不动，每个氧在自己的弹簧上振动，故$\omega_\mathrm{s} = \sqrt{k/m_\mathrm{O}}$。(iii) **反对称伸缩**，$x_1 = x_3$且碳反向运动以保持质心不动，$x_2 = -2m_\mathrm{O}x_1/m_\mathrm{C}$；代入第一个方程得$\omega_\mathrm{a} = \sqrt{k\,(1/m_\mathrm{O} + 2/m_\mathrm{C})}$。于是
$$
\frac{\omega_\mathrm{a}}{\omega_\mathrm{s}} = \sqrt{1 + \frac{2m_\mathrm{O}}{m_\mathrm{C}}} = \sqrt{1 + \frac{2 \times 15.995}{12.000}} = 1.91 .
$$
实验上反对称伸缩位于$2349\ \mathrm{cm^{-1}}$，对称伸缩约$1340\ \mathrm{cm^{-1}}$（它与弯曲倍频发生费米共振而分裂为$1285$与$1388\ \mathrm{cm^{-1}}$两条谱带），比值约$1.7$–$1.8$。简单模型抓住了主要效应——反对称模更高，因为轻的碳位移很大——其余差异来自O–O相互作用与两根键之间的交叉项，它们自动包含在完整的量子化学Hessian里。
:::
:::

::: quiz
对一个强加$C_{2v}$对称性的分子做几何优化，收敛结构在频率计算中显示出一个$310i\ \mathrm{cm^{-1}}$的虚频，其简正模破坏对称性。你应当得出什么结论？
- [ ] 该结构就是平衡几何；虚频是数值噪声。
- [x] 该结构是一阶鞍点；沿虚频模式位移后取消对称性约束重新优化，将找到更低、对称性更低的极小。
- [ ] 该结构是二阶鞍点。
- [ ] 优化器失败了，因为收敛的梯度意味着极小。
::: solution
一个负Hessian特征值意味着一阶鞍点（[[#prop-stationary]]）。由于强加了对称性，优化器无法沿破坏对称的方向移动——梯度按对称性恒为零；该结构是驻点，但沿该模式下坡存在对称性更低的更低结构。极小的虚频（比如低于$50i\ \mathrm{cm^{-1}}$）确实可能来自松散的积分格点的数值噪声，但$310i\ \mathrm{cm^{-1}}$是真实的曲率。
:::
:::

## 过渡态与反应路径

寻找一阶鞍点比寻找极小更难，因为没有“下坡”可循。常用的方法有三族。

- **本征矢量跟踪法**（也称分块有理函数优化）：从靠近过渡态、Hessian恰有一个负特征值处出发，沿该特征矢量*上坡*、沿其余一切特征矢量*下坡*走一步。初猜落在鞍点的二次区内时收敛很快。
- **同步过渡**与**插值**方法：由反应物与产物结构构造初猜（线性或二次同步过渡），再加以精修。
- **链态**类方法，如**约束弹性带**（nudged elastic band, NEB）：用一串由弹簧相连的图像代表路径，每个图像在真实力垂直于路径的分量下弛豫。最高的图像（或一个沿路径被向上推的“爬升图像”）近似鞍点。这类方法在表面与固态反应中尤其流行，那里很难构造好的初猜。

找到之后，过渡态要用两种方式验证：其Hessian必须恰有一个虚频，且相应的模式必须看起来像该反应（氢在供体与受体之间迁移、一根键正在形成）。最确凿的检验是从鞍点两侧沿路径下行。

::: definition 内禀反应坐标 {#def-irc}
**内禀反应坐标**（intrinsic reaction coordinate, IRC）是从一阶鞍点出发、在质量加权坐标中以最速下降方式下行到两侧极小的路径。它从虚频模式特征矢量的方向出发，此后满足$\mathrm{d}\mathbf{q}/\mathrm{d}s = -\mathbf{g}_q/\lvert\mathbf{g}_q\rvert$，其中$\mathbf{g}_q$是对质量加权坐标的梯度，$s$是弧长。它是一个几何构造——速度无穷小的经典体系会走的路径——而不是真实反应分子的轨迹，后者有动能，还可能抄近路。
:::

一条把鞍点连到你预期的反应物与产物的IRC计算，正是该过渡态属于你的那个反应的证据。多鞍点的曲面常令人意外：“某个协同反应的过渡态”，沿IRC跟下去可能连到一个你从未考虑过的中间体。

势垒高度随后进入过渡态理论。艾林（Eyring）方程（见[[kinetics/transition-state-theory]]）中，$298\ \mathrm{K}$下的速率常数为$k = (k_\mathrm{B}T/h)\,e^{-\Delta^{\ddagger}G/RT}$，其中$k_\mathrm{B}T/h = 6.21\times10^{12}\ \mathrm{s^{-1}}$。每$5.7\ \mathrm{kJ\,mol^{-1}}$的势垒对应速率的十倍，这给计算定下了精度要求：$4\ \mathrm{kJ\,mol^{-1}}$（“化学精度”，$1\ \mathrm{kcal\,mol^{-1}}$）的误差就是速率常数的五倍。活化自由能来自电子势垒，加上由反应物与过渡态配分函数评估的零点、热与熵项——即[[#prop-normal-modes]]的简谐频率，并在过渡态处略去虚频模式（[[statistical-thermodynamics/statistical-rate-theory]]）。

::: example 从势垒到速率 {#ex-barrier-rate}
某单分子重排在$298.15\ \mathrm{K}$下的计算给出$\Delta^{\ddagger}G = 80.0\ \mathrm{kJ\,mol^{-1}}$。估计速率常数与半衰期，并求势垒误差$4.0\ \mathrm{kJ\,mol^{-1}}$的影响。
::: solution
$k_\mathrm{B}T/h = (1.380649\times10^{-23} \times 298.15)/(6.62607\times10^{-34})\ \mathrm{s^{-1}} = 6.212\times10^{12}\ \mathrm{s^{-1}}$，$\Delta^{\ddagger}G/RT = 80\,000/(8.31446 \times 298.15) = 32.27$，于是
$$
k = 6.212\times10^{12}\ \mathrm{s^{-1}} \times e^{-32.27} = 0.060\ \mathrm{s^{-1}}, \qquad t_{1/2} = \frac{\ln 2}{k} = 12\ \mathrm{s}.
$$
$4.0\ \mathrm{kJ\,mol^{-1}}$的势垒误差把$k$改变$e^{4000/(8.31446\times298.15)} = e^{1.61} = 5.0$倍：半衰期可能在$2$到$60\ \mathrm{s}$之间的任何值。因此计算给出的绝对速率常数只是数量级估计；误差相消的相似反应的*相对*速率要可靠得多。
:::
:::

低温或氢转移时，核可以**隧穿**穿过势垒。最简单的估计是维格纳（Wigner）修正，把速率乘以$\kappa = 1 + \tfrac{1}{24}\left(h\lvert\nu^{\ddagger}\rvert/k_\mathrm{B}T\right)^{2}$，其中$\nu^{\ddagger}$是虚频；它只在修正很小（$\kappa \lesssim 1.5$）时可靠，更认真的处理（埃卡特（Eckart）势垒、小曲率隧穿）要利用鞍点附近路径的形状。

## 这张曲面有多好？

本课的算法对曲面施加的是精确操作；曲面本身只和计算它的方法一样好。粗略的层级（后续各课解释）是：

| 方法 | 相对能量的典型误差 | 费用标度 | 典型用途 |
|---|---|---|---|
| 力场（[[computational-chemistry/molecular-mechanics]]） | 构象体：几$\mathrm{kJ\,mol^{-1}}$；不能断键 | $N$到$N^{2}$ | 蛋白质、液体、构象搜索 |
| 哈特里-福克（[[computational-chemistry/hartree-fock]]） | 势垒常偏高$40$–$80\ \mathrm{kJ\,mol^{-1}}$ | $N^{4}$ | 关联方法的起点 |
| DFT（[[computational-chemistry/density-functional-theory]]） | $8$–$20\ \mathrm{kJ\,mol^{-1}}$，随泛函而异 | $N^{3}$–$N^{4}$ | 几何、机理、频率 |
| CCSD(T)（[[computational-chemistry/electron-correlation]]） | 大基组下约$4\ \mathrm{kJ\,mol^{-1}}$ | $N^{7}$ | 小分子的基准 |

因此一个常见而合理的协议是“几何与频率用便宜级别，能量用更好级别”：用DFT优化并算频率，再在DFT几何上做CCSD(T)单点能计算。它之所以可行，是因为驻点*几何*对方法的敏感程度远低于能量——能量误差是几何误差的二阶小量，与变分原理同样的宽容性质。

## 后续内容

后面每一课都提供某种计算$E(\mathbf{R})$的方法，或用到其中一种。分子力学（[[computational-chemistry/molecular-mechanics]]）用拟合的经典函数取代电子问题，使蛋白质的曲面成为可负担的；哈特里-福克、基组、关联与DFT（[[computational-chemistry/hartree-fock]]至[[computational-chemistry/density-functional-theory]]）从第一性原理计算它。分子动力学（[[computational-chemistry/molecular-dynamics]]）不是把核沿曲面滑向下坡，而是用牛顿方程驱动核运动；自由能方法（[[computational-chemistry/free-energy-sampling]]）则把单个极小换成对整个势阱的热平均。本课的简谐频率是[[statistical-thermodynamics/partition-function]]振动配分函数与[[statistical-thermodynamics/statistical-rate-theory]]速率理论的输入。

::: history
化学反应势能面的思想与量子化学同龄。1931年艾林（Henry Eyring）与波兰尼（Michael Polanyi）用伦敦（London）方程为$\mathrm{H + H_2}$反应算出了半经验曲面，找到了那个鞍点——它后来成为艾林1935年过渡态理论中的“活化络合物”。赫尔曼（Hellmann，1937）与费曼（Feynman，1939）各自独立提出了以他们命名的能量导数定理。实用层面的革命来自解析梯度：普劳伊（Pulay）1969年关于哈特里-福克力的论文使自动几何优化成为可能；到1980年代，解析二阶导数（波普与合作者，1979）又使简谐频率成为常规。福井谦一（Kenichi Fukui）在1970年定义了内禀反应坐标，穆勒（Klaus Müller）与布朗（Leo Brown）在1979年提出了他们的二维测试曲面。约束弹性带方法由约恩松（Hannes Jónsson）与合作者在1990年代发展。
:::

::: summary
- 势能面$E(\mathbf{R})$依赖$3N - 6$个内部坐标；梯度给出力，Hessian给出曲率。
- 驻点满足$\mathbf{g} = \mathbf{0}$；负Hessian特征值的数目对其分类——极小为零个，过渡态一个。
- 赫尔曼-费曼定理使能量导数变得廉价；原子心基组下必须补上Pulay项，解析梯度的费用与一次能量相当。
- 牛顿-拉夫逊（拟牛顿、BFGS）优化在驻点附近二次收敛，但找到的是最近的*驻点*，所以务必检查Hessian。
- 对角化质量加权Hessian给出简谐频率与简正模；虚频标记过渡态处的反应坐标。
- 与实验比较能量与频率时，零点能（几十$\mathrm{kJ\,mol^{-1}}$）与缩放因子必不可少。
- 过渡态以一个虚频和一条连接预期极小的IRC确认；室温下$4\ \mathrm{kJ\,mol^{-1}}$的势垒误差对应速率的五倍。
:::

## 习题

::: exercise 数一数振动模式 {level=1 check="30"}
苯$\mathrm{C_6H_6}$有多少个振动简正模？（输入数目。）
::: solution
苯有$N = 12$个原子且非线性，故有$3N - 6 = 36 - 6 = 30$个简正模。（对称性把它们归为$20$个不同频率，其中$10$个二重简并，见[[quantum-chemistry/molecular-symmetry]]。）
:::
:::

::: exercise 由波数求力常数 {level=1 check="516"}
对$\mathrm{H^{35}Cl}$用$\tilde\omega_e = 2990.95\ \mathrm{cm^{-1}}$与$\mu = 0.97959\ \mathrm{u}$，计算简谐力常数。（以$\mathrm{N\,m^{-1}}$为单位、保留三位有效数字输入。）
::: solution
$\omega = 2\pi c\tilde\omega_e = 5.6339\times10^{14}\ \mathrm{s^{-1}}$，$\mu = 0.97959 \times 1.66054\times10^{-27}\ \mathrm{kg} = 1.62666\times10^{-27}\ \mathrm{kg}$，故$k = \mu\omega^{2} = 516\ \mathrm{N\,m^{-1}}$。
:::
:::

::: exercise 驻点分类 {level=1 check="1"}
某非线性三原子分子的驻点处，投影掉平动与转动后的质量加权Hessian特征值为$+2.1\times10^{-1}$、$-4.0\times10^{-3}$与$+8.6\times10^{-2}$（原子单位）。该驻点的指数是多少？它是什么？（输入指数。）
::: solution
一个特征值为负，故指数为$1$：它是一阶鞍点，过渡态。负特征值的绝对值与正特征值相比很小，预示曲面的一处平坦区域——也许是反转或内部旋转——值得用更紧的积分格点复核后再相信它。
:::
:::

::: exercise 同位素位移 {level=2 check="2145"}
在玻恩-奥本海默近似下，DCl的势能面——从而力常数——与HCl相同。用$\tilde\omega_e(\mathrm{H^{35}Cl}) = 2990.95\ \mathrm{cm^{-1}}$与原子质量$1.007825$、$2.014102$、$34.968853\ \mathrm{u}$，预测$\mathrm{D^{35}Cl}$的$\tilde\omega_e$。（以$\mathrm{cm^{-1}}$为单位、保留四位有效数字输入。）
::: solution
$\mu_\mathrm{H} = 0.979593\ \mathrm{u}$，$\mu_\mathrm{D} = (2.014102 \times 34.968853)/36.982955\ \mathrm{u} = 1.904413\ \mathrm{u}$。$k$固定时$\tilde\omega \propto \mu^{-1/2}$，故$\tilde\omega_e(\mathrm{DCl}) = 2990.95 \times \sqrt{0.979593/1.904413}\ \mathrm{cm^{-1}} = 2145\ \mathrm{cm^{-1}}$。实测值为$2145.2\ \mathrm{cm^{-1}}$：一张曲面服务于一切同位素异构体——这是对玻恩-奥本海默思想的一次出色检验。
:::
:::

::: exercise 一步牛顿迭代 {level=2 check="1.174"}
对双势阱模型$V(x) = x^{4} - 2x^{2}$（无量纲）从$x_0 = 1.5$出发取一步牛顿-拉夫逊步$x_1 = x_0 - V'(x_0)/V''(x_0)$。然后说明改从$x_0 = 0.4$出发会发生什么。（$x_0 = 1.5$时的$x_1$保留四位有效数字输入。）
::: hint
$V' = 4x^{3} - 4x$，$V'' = 12x^{2} - 4$。$V''$在哪里为负？
:::
::: solution
$x_0 = 1.5$：$V' = 13.5 - 6 = 7.5$，$V'' = 27 - 4 = 23$，故$x_1 = 1.5 - 7.5/23 = 1.174$。下一步得$1.032$，二次收敛于$x = 1$处的极小。从$x_0 = 0.4$：$V' = 0.256 - 1.6 = -1.344$，$V'' = 1.92 - 4 = -2.08$，故$x_1 = 0.4 - 0.646 = -0.246$——这一步*朝$x = 0$处的极大*移动，因为$\lvert x\rvert < 1/\sqrt{3}$时$V'' < 0$。牛顿法寻找的是驻点，不问曲率。
:::
:::

::: exercise 势垒的零点能 {level=2 check="18.5"}
某氢转移反应的反应物中有一条$2950\ \mathrm{cm^{-1}}$的C–H伸缩振动。在过渡态处，这条伸缩变成了虚的反应坐标模式；一个弯曲从$1200$软化到$1050\ \mathrm{cm^{-1}}$，其余频率视为不变。与纯电子势垒相比，零点能把势垒降低了多少？（以$\mathrm{kJ\,mol^{-1}}$输入降低量。）
::: solution
过渡态失去了伸缩的零点能$\tfrac{1}{2} \times 2950 = 1475\ \mathrm{cm^{-1}}$（虚频模式不带零点能），变软的弯曲又使它降低$\tfrac{1}{2}(1200 - 1050) = 75\ \mathrm{cm^{-1}}$。因此零点能校正后的势垒比电子势垒低$1550\ \mathrm{cm^{-1}} \times 0.0119627\ \mathrm{kJ\,mol^{-1}}/\mathrm{cm^{-1}} = 18.5\ \mathrm{kJ\,mol^{-1}}$。真实的氢转移中，移动的氢在过渡态会获得新的刚性弯曲模式，其中一部分被补回，所以净降低通常更小；伸缩零点能也是初级动力学同位素效应的根源，因为C–D的该项零点能小约$\sqrt{2}$倍。
:::
:::

::: exercise 维格纳隧穿修正 {level=3 check="3.18"}
某氢转移的计算过渡态有$1500i\ \mathrm{cm^{-1}}$的虚频。在$298.15\ \mathrm{K}$下计算维格纳修正$\kappa = 1 + \tfrac{1}{24}\left(hc\lvert\tilde\nu^{\ddagger}\rvert/k_\mathrm{B}T\right)^{2}$，并评论它是否可信。（输入$\kappa$。）
::: solution
$298.15\ \mathrm{K}$下$k_\mathrm{B}T/hc = 207.22\ \mathrm{cm^{-1}}$，故$u = 1500/207.22 = 7.239$，$\kappa = 1 + 52.40/24 = 3.18$。维格纳公式是抛物势垒顶部对$u^{2}$展开的首项，只在$u \lesssim 2$（即$\kappa \lesssim 1.2$）时有效；此处修正很大，展开已经失效。需要利用势垒形状的处理（埃卡特拟合，或沿IRC的小曲率隧穿），对这么尖锐的势垒通常给出更大的因子。
:::
:::

::: exercise 莫尔斯曲线的拐点 {level=3 check="1.65"}
证明莫尔斯势$V = D_e\left[1 - e^{-a(r - r_e)}\right]^{2}$的曲率在$r^{*} = r_e + (\ln 2)/a$处变号，并对HCl（$r_e = 1.2746\ \mathrm{\AA}$，$a = 1.868\ \mathrm{\AA^{-1}}$）求$r^{*}$。说明从$r > r^{*}$出发的牛顿-拉夫逊优化器会做什么。（以埃输入$r^{*}$。）
::: solution
记$u = e^{-a(r - r_e)}$，则$V' = 2D_e a u(1 - u)$、$V'' = 2D_e a^{2}u(2u - 1)$，在$u = \tfrac{1}{2}$即$a(r^{*} - r_e) = \ln 2$时为零。对HCl，$r^{*} = 1.2746 + 0.6931/1.868 = 1.65\ \mathrm{\AA}$。$r > r^{*}$时曲率为负而梯度为正（力把两原子往一起拉），牛顿步$-V'/V''$为*正*：优化器移向更大的$r$，键在计算中解离；而从同一点出发的最速下降法会走对方向。这就是[[#warn-newton]]的一维版本，也是优化器寻找极小时强制Hessian正定的原因。
:::
:::

::: exercise 各向异性谷上的最速下降 {level=3 check="0.818"}
在二次曲面$E = \tfrac{1}{2}(\lambda_1 x^{2} + \lambda_2 y^{2})$上（$\lambda_1 = 1$，$\lambda_2 = 10$），固定步长$\alpha$的最速下降法每步把$x$乘以$(1 - \alpha\lambda_1)$、把$y$乘以$(1 - \alpha\lambda_2)$。求使最慢收敛因子$\max\left(\lvert1 - \alpha\lambda_1\rvert, \lvert1 - \alpha\lambda_2\rvert\right)$最小的步长，并给出该最优因子。牛顿法在同一曲面上表现如何？（输入最优因子。）
::: solution
两个因子绝对值相等、符号相反时最大值最小：$1 - \alpha\lambda_1 = -(1 - \alpha\lambda_2)$，得$\alpha = 2/(\lambda_1 + \lambda_2) = 2/11$。此时因子为$(\lambda_2 - \lambda_1)/(\lambda_2 + \lambda_1) = 9/11 = 0.818$：每步误差只缩小$18\ \%$，要得到六位数字需要$\ln(10^{-6})/\ln(0.818) \approx 69$步。收敛快慢取决于Hessian的**条件数**$\lambda_2/\lambda_1$，对分子（刚性键、柔性扭转）它可以超过$1000$。牛顿步$-\mathbf{H}^{-1}\mathbf{g}$在二次曲面上一步就精确落在极小处，无论条件数多大。
:::
:::
