前面几课求解的是由**已知**速度场携带的标量。现在速度本身成了未知量，与之相伴的还有一个奇特的伙伴：压强。在不可压缩流动中，方程[[computational-fluid-dynamics/governing-equations#eq-incompressible]]包含三个动量方程，每个都是某一速度分量的输运方程，可以完全按[[computational-fluid-dynamics/convection-diffusion]]中的方法离散；还有一个连续性方程$\nabla\cdot\mathbf{u} = 0$。没有**关于**压强的方程。压强只以其梯度的形式出现在动量方程中，它的作用是取某个值，使速度场满足连续性——用数学术语说，它是不可压缩约束的拉格朗日乘数。把这句话变成一个算法，同时不让压强场在网格上出现荒谬的结果，这就是**压力-速度耦合**问题。

本课首先展示陷阱——朴素的离散“看不见”的棋盘格压强场——以及两条出路：**交错网格**和同位网格上的**动量插值**（Rhie–Chow 插值）。然后推导主导工业定常 CFD 的分离式 **SIMPLE** 系列算法、其变体 SIMPLEC 和 PISO，以及主导非定常计算和科研程序的**投影法**（分步法）。由此得到的线性方程组用[[computational-fluid-dynamics/linear-solvers]]中的方法求解。

## 棋盘格问题

采用最简单的布置：所有变量（$u$、$v$、$p$）都存储在同一组节点上——即**同位**网格——并处处采用中心差分。在一维中，作用在控制体$P$上的压力为$-(p_e - p_w)A$，用线性插值$p_e = \tfrac12(p_P + p_E)$，$p_w = \tfrac12(p_W + p_P)$，
$$
-(p_e - p_w)A = -\frac{p_E - p_W}{2}A .
$$
$P$点自身的压强消失了；$P$点的动量方程只“看到”相隔两个单元的压强。同样，单元$P$的连续性方程在采用插值面速度$u_e = \tfrac12(u_P + u_E)$，$u_w = \tfrac12(u_W + u_P)$时变为$\tfrac12(u_E - u_W) = 0$，又一次跳过了$u_P$。

::: proposition 棋盘格模态不可见 {#prop-checkerboard}
在压强和速度都线性插值到面上的均匀同位网格上，向任何解叠加振荡场$p'_i = \varepsilon(-1)^i$（二维中为$\varepsilon(-1)^{i+j}$），每个离散动量方程和连续性方程都保持不变。因此离散压强不唯一，方程中也没有任何东西能阻尼这种模态。
:::

::: proof
压强只通过$p_{i+1} - p_{i-1}$进入节点$i$处的离散动量方程。对于$p'_i = \varepsilon(-1)^i$，$p'_{i+1} - p'_{i-1} = \varepsilon(-1)^{i-1}\left[(-1)^2 - 1\right] = 0$。因此叠加的场对任何节点都不施加力；速度不变，而连续性方程（只涉及速度）仍然满足。在二维中，由于$(-1)^{i+1+j} - (-1)^{i-1+j} = 0$，在每个方向上分别有同样的结论。傅里叶观点给出相同的结果：对中心梯度再施加一次中心梯度所得的“宽”拉普拉斯算子，其符号为$-\sin^2\theta/\Delta x^2$，它在棋盘格波数$\theta = \pi$处为零。
:::

::: example 求解器看不见的棋盘格压强 {#ex-checkerboard}
在$\Delta x = 0.10\ \mathrm{m}$的一维同位网格上，五个相继节点的压强为$p = (100, 50, 100, 50, 100)\ \mathrm{Pa}$。计算用中心差分时节点 2–4 的动量方程所用的压强梯度，以及相邻节点之间的梯度。
::: solution
$(\partial p/\partial x)_2 = (p_3 - p_1)/(2\Delta x) = (100 - 100)/0.20 = 0$；同样，节点 3 处为$(p_4 - p_2)/0.20 = 0$，节点 4 处为$(p_5 - p_3)/0.20 = 0$。动量方程完全感受不到力。然而相邻节点之间的梯度为$\pm(100 - 50)/0.10 = \pm 500\ \mathrm{Pa/m}$——足以使水（$\rho = 1000\ \mathrm{kg/m^3}$）产生$0.5\ \mathrm{m/s^2}$的加速度。合理性检查：这个场在物理上是荒谬的（均匀流动中压强逐个单元交替变化），但离散方程无法拒绝它。叠加到真解上，它就产生一个看似已收敛、却叠加了锯齿的压强场——这是失耦的典型症状。
:::
:::

::: widget plot
f: 4*sin(x/2)^2; sin(x)^2; x^2
x: 0, pi
y: 0, 4.5
labels: \text{紧致 } 4\sin^2(\theta/2); \text{宽 } \sin^2\theta; \text{精确 } \theta^2
caption: 离散压强拉普拉斯算子如何处理波数为$\theta = k\Delta x$的压强波（三条曲线都乘以$1/\Delta x^2$并去掉符号）。在相邻节点之间跨面取压强梯度所得的紧致三点拉普拉斯算子，对所有短波都有强烈响应。在同位网格上两次施加中心梯度所得的宽拉普拉斯算子先上升，然后在$\theta = \pi$处回落到**零**：最短的波——棋盘格——不产生任何响应，因此永远得不到修正。交错网格和 Rhie–Chow 插值都是通过恢复紧致行为来起作用的。
:::

## 交错网格

哈洛（Harlow）和韦尔奇（Welch）的补救办法（1965）是不把速度分量存储在压强节点上，而存储在压强单元的面上：$u$在东、西面上，$v$在南、北面上。每个速度分量都有自己的控制体，以压强单元的某个面为中心。

- 作用在$u$控制体上的压力为$(p_P - p_E)A_e$：即**相邻**压强节点之差。棋盘格现在会产生很大的力。
- 压强单元的连续性方程直接使用面速度，$(\rho uA)_e - (\rho uA)_w + (\rho vA)_n - (\rho vA)_s = 0$，无需插值。

棋盘格消失了，离散干净且守恒。代价是繁琐的记录工作：三套（三维中为四套）相互交错的网格，每套都有各自的几何数据，对非正交网格和非结构网格的处理很不方便。交错网格在笛卡儿网格科研程序以及许多直接数值模拟和大涡模拟程序中仍是标准做法；通用的非结构网格程序则采用带动量插值的同位网格。

## SIMPLE 算法

下面推导使工业 CFD 成为可能的分离式算法。在交错网格上进行推导（同位网格版本只在面速度的构造方式上不同）。面$e$上速度的离散$u$动量方程为
$$
a_e u_e = \sum a_{nb}u_{nb} + (p_P - p_E)A_e + b_e ,
$$ {#eq-u-momentum}
其系数来自上一课的对流-扩散离散，$b_e$包含其他源项。

其思想是预测-校正。猜测一个压强场$p^\ast$，求解[[#eq-u-momentum]]（及其$v$、$w$对应方程）得到速度$u^\ast$、$v^\ast$：
$$
a_e u_e^\ast = \sum a_{nb}u_{nb}^\ast + (p_P^\ast - p_E^\ast)A_e + b_e .
$$
它们在猜测的压强下满足动量方程，但一般不满足连续性方程。寻求修正量$p = p^\ast + p'$，$u = u^\ast + u'$来解决这一问题。两个动量方程相减，
$$
a_e u_e' = \sum a_{nb}u_{nb}' + (p_P' - p_E')A_e .
$$ {#eq-u-correction}

::: proposition SIMPLE 的压力修正方程 {#prop-simple}
若忽略[[#eq-u-correction]]中的邻点项$\sum a_{nb}u'_{nb}$，则速度修正量为
$$
u_e' = d_e(p_P' - p_E'),\qquad d_e = \frac{A_e}{a_e},
$$ {#eq-velocity-correction}
要求修正后的速度对每个压强单元满足连续性，在二维中得到
$$
a_P p_P' = a_W p_W' + a_E p_E' + a_S p_S' + a_N p_N' + b',\qquad a_E = \rho_e d_e A_e\ (\text{等}),\qquad a_P = \textstyle\sum a_{nb},
$$ {#eq-pressure-correction}
$$
b' = (\rho u^\ast A)_w - (\rho u^\ast A)_e + (\rho v^\ast A)_s - (\rho v^\ast A)_n ,
$$
即带星号场的质量不平衡量。
:::

::: proof
去掉邻点项后，[[#eq-u-correction]]直接给出[[#eq-velocity-correction]]；类似地，$u_w' = d_w(p_W' - p_P')$，$v_n' = d_n(p_P' - p_N')$，$v_s' = d_s(p_S' - p_P')$。压强单元的连续性方程为
$$
(\rho A)_e(u_e^\ast + u_e') - (\rho A)_w(u_w^\ast + u_w') + (\rho A)_n(v_n^\ast + v_n') - (\rho A)_s(v_s^\ast + v_s') = 0 .
$$
代入修正量并合并$p'$项：$p_P'$的系数为$(\rho dA)_e + (\rho dA)_w + (\rho dA)_n + (\rho dA)_s$，每个邻点$p'$的系数为$(\rho dA)_{nb}$，带星号的质量流量构成$b'$。把邻点项移到右边即得[[#eq-pressure-correction]]。所有系数都为正且$a_P = \sum a_{nb}$：这是关于$p'$的离散泊松方程——椭圆型的，正如[[computational-fluid-dynamics/governing-equations#prop-ppe]]所指出的那样。
:::

去掉$\sum a_{nb}u_{nb}'$就是算法名称（压力耦合方程的半隐式方法，Semi-Implicit Method for Pressure-Linked Equations）中的“半隐式”近似。它不影响收敛解——收敛时$p' = 0$且$u' = 0$，所求解的方程就是精确的离散动量方程和连续性方程——但它使$p'$偏大，因为整个速度修正都被归因于当地的压强差。这就是 SIMPLE 需要**亚松弛**的原因。

::: algorithm SIMPLE {#alg-simple}
1. 猜测压强场$p^\ast$（并以当前速度为起点）。
2. 带亚松弛地求解动量方程，得到$u^\ast$、$v^\ast$、$w^\ast$。
3. 计算$d$系数和质量不平衡量$b'$；求解压力修正方程[[#eq-pressure-correction]]得到$p'$。
4. 用完整的$p'$经[[#eq-velocity-correction]]修正速度——修正后的面速度此时满足连续性——并带亚松弛地修正压强：$p = p^\ast + \alpha_p p'$。
5. 求解其他输运方程（能量、湍流量、组分）。
6. 令$p^\ast = p$并返回第 2 步，直到残差和被监控的量都已收敛。

典型的亚松弛因子是：动量$\alpha_u \approx 0.7$（隐式施加，对角线上为$a_P/\alpha_u$），压强$\alpha_p \approx 0.3$；常用的经验法则是$\alpha_u + \alpha_p \approx 1$。
:::

::: example 一个单元的一次压力修正 {#ex-simple-cell}
一个二维压强单元，$\Delta x = \Delta y = 0.10\ \mathrm{m}$（单位厚度），其中为水（$\rho = 1000\ \mathrm{kg/m^3}$）。动量步之后的面速度为$u_w^\ast = 1.00$，$u_e^\ast = 1.05$，$v_s^\ast = 0$，$v_n^\ast = 0.020\ \mathrm{m/s}$，四个面的动量系数都是$a = 50\ \mathrm{kg/s}$。假设相邻单元的压力修正量为零（如同高斯-赛德尔扫描中的第一个单元），计算$p'_P$、修正后的面速度以及$\alpha_p = 0.3$时的压强更新量。
::: solution
各面面积为$0.10\ \mathrm{m^2}$，因此每个面的$d = A/a = 0.10/50 = 2.0\times10^{-3}\ \mathrm{m^2\,s\,kg^{-1}}$，每个$p'$系数为$\rho dA = 1000 \times 0.002 \times 0.10 = 0.20\ \mathrm{m\,s}$；$a_P = 0.80\ \mathrm{m\,s}$。质量不平衡量（流入减流出）为
$$
b' = 1000\left[(1.00 - 1.05)(0.10) + (0 - 0.020)(0.10)\right] = -7.0\ \mathrm{kg/s}.
$$
流出的质量多于流入的，因此$p'_P = b'/a_P = -7.0/0.80 = -8.75\ \mathrm{Pa}$：单元内的压强必须下降，以吸入流体并阻止其流出。修正：
$$
u_e = 1.05 + d(p'_P - 0) = 1.05 - 0.0175 = 1.0325,\quad u_w = 1.00 + d(0 - p'_P) = 1.0175,
$$
$$
v_n = 0.020 - 0.0175 = 0.0025,\quad v_s = 0 + 0.0175 = 0.0175\ \mathrm{m/s}.
$$
检验连续性：$(1.0325 - 1.0175)(0.10) + (0.0025 - 0.0175)(0.10) = 0.0015 - 0.0015 = 0$。压强只更新$\alpha_p p' = -2.63\ \mathrm{Pa}$。合理性检查：$b'/a_P$的单位是$(\mathrm{kg/s})/(\mathrm{m\,s}) = \mathrm{kg\,m^{-1}\,s^{-2}} = \mathrm{Pa}$；而在实际扫描中，相邻单元的修正会分担这一调整，因此这个单单元的值高估了所需的变化——这是需要亚松弛的又一个原因。
:::
:::

### SIMPLEC 与 PISO

被忽略的邻点项可以近似处理而不是直接去掉。**SIMPLEC**（SIMPLE-Consistent，Van Doormaal 和 Raithby，1984）在[[#eq-u-correction]]两边同时减去$\sum a_{nb}u_e'$，假设邻点修正量与$u_e'$相近，只忽略$\sum a_{nb}(u_{nb}' - u_e')$，得到
$$
d_e = \frac{A_e}{a_e - \sum a_{nb}} .
$$ {#eq-simplec}
由于这一近似是相容的，压力修正几乎不需要亚松弛（$\alpha_p \approx 1$），收敛往往快得多。**PISO**（算子分裂的压力隐式算法，Pressure-Implicit with Splitting of Operators，Issa，1986）保留 SIMPLE 的$d$，但在同一次迭代中增加**第二个**（可能还有第三个）压力修正步，其中邻点项由第一次修正的结果计算。它是为非定常计算设计的：在小时间步长下使用两个修正步，每个时间步进行一次 PISO 计算，无需外迭代即可得到时间精确的结果。许多程序把这两种思想结合起来（OpenFOAM 的“PIMPLE”格式在类 SIMPLE 的外迭代中使用 PISO 修正步）。

## 同位网格与 Rhie–Chow 插值

在同位网格上，动量方程求解的是单元中心的速度$\mathbf{u}_P$，但连续性方程需要面速度。Rhie 和 Chow 的思想（1983）是：不是通过插值单元速度来构造面速度，而是把**动量方程**插值到面上，使面速度对跨越该面的、相邻节点之间的压强差作出响应。

把单元中心的动量方程写成$u_P = \hat u_P - D_P(\partial p/\partial x)_P$，其中$\hat u_P = (\sum a_{nb}u_{nb} + b)/a_P$汇集了除压强以外的所有项，$D_P = \Delta V_P/a_P$。把$\hat u$和$D$插值到面上，但**直接在面上**计算压强梯度，得到
$$
u_e = \overline{u}_e - \overline{D}_e\left[\frac{p_E - p_P}{\delta x_{PE}} - \overline{\left(\frac{\partial p}{\partial x}\right)}_e\right],
$$ {#eq-rhie-chow}
其中上划线表示单元值的线性插值。方括号内是紧致面梯度与插值所得的单元中心梯度之差。对于光滑的压强场，它的量级为$\Delta x^2\,\partial^3p/\partial x^3$，并随网格加密而消失，因此面速度是相容的；对于棋盘格，它很大，并恰好驱动出压强方程将要消除的那个质量不平衡。

::: example Rhie–Chow 插值察觉棋盘格 {#ex-rhie-chow}
$\Delta x = 0.10\ \mathrm{m}$的同位网格上，每个节点的速度均为$u = 1.0\ \mathrm{m/s}$，压强为棋盘格分布$p_W = 100$，$p_P = 50$，$p_E = 100$，$p_{EE} = 50\ \mathrm{Pa}$（且$p_{WW} = 50$）。每个面上$\overline{D} = 1.0\times10^{-4}\ \mathrm{m^2\,s\,kg^{-1}}$，分别用线性插值和[[#eq-rhie-chow]]计算单元$P$的$u_e$和$u_w$，以及由此产生的连续性不平衡量。
::: solution
线性插值给出$u_e = u_w = 1.0\ \mathrm{m/s}$：连续性完全满足，棋盘格不可见。

Rhie–Chow：单元中心梯度为$(\partial p/\partial x)_P = (p_E - p_W)/(2\Delta x) = 0$和$(\partial p/\partial x)_E = (p_{EE} - p_P)/(2\Delta x) = 0$，因此它们插值到面上的值为$0$。紧致面梯度在$e$处为$(p_E - p_P)/\Delta x = 50/0.10 = 500\ \mathrm{Pa/m}$，在$w$处为$(p_P - p_W)/\Delta x = -500\ \mathrm{Pa/m}$。因此
$$
u_e = 1.0 - 10^{-4}(500 - 0) = 0.95\ \mathrm{m/s},\qquad u_w = 1.0 - 10^{-4}(-500 - 0) = 1.05\ \mathrm{m/s}.
$$
单元$P$现在有$u_e - u_w = -0.10\ \mathrm{m/s}$：流体在积聚，因此压力修正方程会提高$p_P$——使之趋向其邻点。棋盘格被察觉并被阻尼。合理性检查：对于线性压强场，比如$p = 100 + 500x$，紧致梯度和插值梯度都是$500\ \mathrm{Pa/m}$，方括号为零，$u_e$就是普通的插值值。
:::
:::

::: warning Rhie–Chow 插值的细节在实践中很重要
一些众所周知的人为假象来自草率的动量插值。如果面速度依赖于亚松弛因子（因为$a_P$包含$1/\alpha_u$），那么改变$\alpha_u$时收敛解也会改变——这本应是不可能的结果。如果非定常计算中的面速度依赖于时间步长，那么非常小的时间步长又会产生压强摆动。由压强梯度平衡的体积力（浮力流中的重力、多孔介质阻力）必须以与压强梯度相同的方式插值，否则静止流体中会出现虚假速度。实用程序对上述每一种情况都有修正；当一个简单的测试——重力作用下的静止流体、槽道中的均匀流动——没能给出显而易见的答案时，就应怀疑面速度插值。
:::

## 投影法（分步法）

对于非定常流动，科研程序中使用最广泛的方法是乔林（Chorin）的**投影法**（1968）。它把每个时间步分成两部分：先**忽略**不可压缩约束推进动量方程，再把结果投影到无散场的空间上。

::: algorithm 乔林投影法 {#alg-projection}
对于从$\mathbf{u}^n$到$\mathbf{u}^{n+1}$的每个时间步：
1. **预测步：** 在不含（或含旧的）压强梯度的情况下计算中间速度，
$$
\frac{\mathbf{u}^\ast - \mathbf{u}^n}{\Delta t} = -(\mathbf{u}\cdot\nabla)\mathbf{u} + \nu\nabla^2\mathbf{u}\quad(\text{显式或半隐式}).
$$
2. **压强泊松方程：** 求解
$$
\nabla^2 p^{n+1} = \frac{\rho}{\Delta t}\nabla\cdot\mathbf{u}^\ast
$$ {#eq-projection-poisson}
其中$\partial p/\partial n$与边界速度相协调。
3. **校正步：** $\mathbf{u}^{n+1} = \mathbf{u}^\ast - \dfrac{\Delta t}{\rho}\nabla p^{n+1}$。
:::

::: proposition 投影产生无散场 {#prop-projection}
若$p^{n+1}$满足[[#eq-projection-poisson]]，且第 2 步和第 3 步使用相同的离散散度算子和梯度算子（离散拉普拉斯算子定义为二者之积），则$\nabla\cdot\mathbf{u}^{n+1} = 0$。
:::

::: proof
对校正步取散度：$\nabla\cdot\mathbf{u}^{n+1} = \nabla\cdot\mathbf{u}^\ast - \tfrac{\Delta t}{\rho}\nabla\cdot\nabla p^{n+1} = \nabla\cdot\mathbf{u}^\ast - \tfrac{\Delta t}{\rho}\cdot\tfrac{\rho}{\Delta t}\nabla\cdot\mathbf{u}^\ast = 0$。只有当泊松方程中的“$\nabla\cdot\nabla$”确实是把离散散度作用于校正步中所用的离散梯度时，这一论证在离散情形下才成立。在交错网格上，这一乘积就是紧致拉普拉斯算子；在使用单元中心梯度的同位网格上，它是[[#prop-checkerboard]]中的宽拉普拉斯算子，这又带回了棋盘格——于是又需要 Rhie–Chow 型的面速度。从几何上看，这一步就是**亥姆霍兹-霍奇分解**：任何光滑场（在给定边界条件下）都可以唯一地分解为一个无散部分和一个梯度，$\mathbf{u}^\ast = \mathbf{u}^{n+1} + \nabla q$，而投影去掉了梯度部分。
:::

::: example 投影一个被污染的泰勒-格林场 {#ex-projection}
泰勒-格林（Taylor–Green）涡场$u = \sin x\cos y$，$v = -\cos x\sin y$是无散的。设一个预测步用梯度污染了它：$\mathbf{u}^\ast = \mathbf{u}_{TG} + a\nabla\varphi$，其中$\varphi = \cos x\cos y$，$a = 0.10\ \mathrm{m^2/s}$（长度以米计，$\rho = 1.0\ \mathrm{kg/m^3}$，$\Delta t = 0.010\ \mathrm{s}$）。计算$\nabla\cdot\mathbf{u}^\ast$，求解压强方程，并确认校正步恢复了$\mathbf{u}_{TG}$。
::: solution
$\nabla\cdot\mathbf{u}_{TG} = \cos x\cos y - \cos x\cos y = 0$，而$\nabla\cdot(a\nabla\varphi) = a\nabla^2\varphi = -2a\cos x\cos y$。故
$$
\nabla^2 p = \frac{\rho}{\Delta t}(-2a\cos x\cos y).
$$
由于$\nabla^2(\cos x\cos y) = -2\cos x\cos y$，（周期、均值为零的）解为$p = \dfrac{\rho a}{\Delta t}\cos x\cos y = \dfrac{1.0 \times 0.10}{0.010}\cos x\cos y = 10\cos x\cos y\ \mathrm{Pa}$。校正步减去$\tfrac{\Delta t}{\rho}\nabla p = a\nabla\varphi$，恰好剩下$\mathbf{u}_{TG}$。合理性检查：压强幅值按$1/\Delta t$缩放——在更短的时间内消除固定的散度误差需要更大的冲击压强，这就是为什么对投影法得到的压强最好结合时间步长来解读。
:::
:::

::: widget vectorfield
P: sin(x)*cos(y) - a*sin(x)*cos(y)
Q: -cos(x)*sin(y) - a*cos(x)*sin(y)
x: -3.1416, 3.1416
y: -3.1416, 3.1416
sliders: a=0.5:0:1:0.05
streamlines: true
shade: divergence
caption: 例题中的场$\mathbf{u}^\ast = \mathbf{u}_{TG} + a\nabla(\cos x\cos y)$，梯度污染量$a$由滑块设定，着色表示散度。在$a = 0$时，它是泰勒-格林涡阵列：流线闭合，散度处处为零。增大$a$，涡心处出现源和汇——流体被产生或消灭，而不可压缩流体不可能这样。投影步求解一个泊松方程，恰好找出这个梯度部分并将其减去，使滑块回到零。
:::

显式投影法具有通常的时间步长限制（[[computational-fluid-dynamics/stability-accuracy]]）：对流库朗条件$\lvert u\rvert\Delta t/\Delta x \lesssim 1$，对于显式黏性项，二维中还有$\nu\Delta t/\Delta x^2 \le \tfrac14$。半隐式变体（黏性项隐式，对流项用多步法显式处理）消除了黏性限制。高阶版本在预测步中使用旧的压强梯度并求解其增量——即增量压力修正格式——从而提高压强的时间精度。

## 耦合求解器与可压缩流动

分离式方法（SIMPLE、PISO、投影法）依次求解动量和压强，耦合只通过迭代来实现。**耦合式**基于压力的求解器则把动量方程和连续性方程（采用 Rhie–Chow 通量）组装成每个单元一个块的大型块方程组，并用代数多重网格求解；它们需要更多的内存，但对于强耦合流动，所需的外迭代次数要少得多。对于可压缩流动，**基于密度**的求解器在（伪）时间上推进守恒方程，由连续性方程得到密度，由状态方程得到压强，并使用基于特征速度$u$、$u \pm c$的迎风格式。在低马赫数下，[[computational-fluid-dynamics/stability-accuracy#ex-cfl-dt]]中的声学刚性使基于密度的方法效率低下，此时采用**预条件**来重新标定声速；反过来，通过让密度对压力修正作出响应，基于压力的方法也已被推广到可压缩流动。

::: quiz
一个同位网格上的定常模拟收敛了，但其压强场在光滑解上叠加了细密的锯齿图案，而速度场看起来是光滑的。最可能的原因是什么？
- [ ] 动量亚松弛因子太大。
- [x] 压力-速度失耦：连续性方程中所用的面速度不是由动量（Rhie–Chow）插值构造的，或者插值不相容，因此棋盘格模态没有被抑制。
- [ ] 对流格式是一阶的。
- [ ] 压力修正方程求解得太精确了。
::: solution
压强在单元间振荡而速度光滑，是[[#prop-checkerboard]]中棋盘格模态的特征。中心压强梯度看不到它，因此速度不受影响；只有在连续性通量中采用基于面的紧致压强差（交错布置或动量插值），才能察觉并消除它。
:::
:::

::: history
洛斯阿拉莫斯的弗朗西斯·H·哈洛（Francis H. Harlow）和 J. 埃迪·韦尔奇（J. Eddie Welch）在 1965 年用于自由面流动的标记网格（MAC）方法中引入了交错网格（《流体物理》（*Physics of Fluids*））。亚历山大·乔林（Alexandre Chorin）于 1968 年发表了投影法（《计算数学》（*Mathematics of Computation*））。苏哈斯·帕坦卡（Suhas Patankar）和 D. 布莱恩·斯波尔丁（D. Brian Spalding）于 1972 年在一篇关于三维抛物型流动的论文中提出了 SIMPLE（《国际传热传质杂志》（*International Journal of Heat and Mass Transfer*）），帕坦卡 1980 年的著作使其成为标准。C. M. Rhie 和 W. L. Chow 1983 年关于带后缘分离的翼型流动的论文（《AIAA 杂志》（*AIAA Journal*））引入了同位网格上的动量插值，为非正交网格和非结构网格开辟了道路。J. P. Van Doormaal 和 G. D. Raithby 于 1984 年发表了 SIMPLEC（《数值传热》（*Numerical Heat Transfer*）），拉德·伊萨（Raad Issa）于 1986 年发表了 PISO 算法（《计算物理杂志》（*Journal of Computational Physics*））。
:::

::: summary
- 在不可压缩流动中，压强没有自己的方程；它就是使速度场无散的那个值，其方程是椭圆型的。
- 在采用线性插值的同位网格上，棋盘格压强$(-1)^i$不施加任何力，也不违反任何方程：压强与速度失耦。
- 交错网格（速度位于压强单元的面上）使用相邻节点的压强差，消除了这一问题；同位网格则使用 Rhie–Chow 动量插值[[#eq-rhie-chow]]。
- SIMPLE：猜测$p^\ast$，求解动量方程，由质量不平衡量求解$p'$的泊松方程，完全修正$u$并以$\alpha_p \approx 0.3$修正$p$，反复迭代。被忽略的邻点项不影响收敛的答案。
- SIMPLEC（$d = A/(a - \sum a_{nb})$）几乎不需要压强亚松弛；PISO 增加修正步，用于时间精确的非定常流动。
- 投影法：不加约束地预测，求解$\nabla^2p = (\rho/\Delta t)\nabla\cdot\mathbf{u}^\ast$，减去梯度——若离散算子相容，结果精确无散。
:::

## 习题

::: exercise 棋盘格的紧致梯度 {level=1 check="1000"}
相距$0.050\ \mathrm{m}$的相邻同位节点上的压强交替为$100$和$50\ \mathrm{Pa}$。求相邻节点之间压强梯度的大小，以及某一节点处的中心差分梯度。（以$\mathrm{Pa/m}$为单位输入相邻节点之间的梯度。）
::: solution
相邻节点之间为$(100 - 50)/0.050 = 1000\ \mathrm{Pa/m}$；任一节点处的中心梯度为$(100 - 100)/0.10 = 0$。
:::
:::

::: exercise 速度修正系数 {level=1 check="0.005"}
面积为$A_e = 0.010\ \mathrm{m^2}$的面，动量系数为$a_e = 2.0\ \mathrm{kg/s}$。计算 SIMPLE 系数$d_e$。（以$\mathrm{m^2\,s\,kg^{-1}}$为单位输入。）
::: solution
$d_e = A_e/a_e = 0.010/2.0 = 5.0\times10^{-3}\ \mathrm{m^2\,s\,kg^{-1}}$：$1\ \mathrm{Pa}$的压力修正差使面速度改变$5\ \mathrm{mm/s}$。
:::
:::

::: exercise 亚松弛的压强更新 {level=1 check="-2.625"}
在[[#ex-simple-cell]]中，当$\alpha_p = 0.3$时施加到该单元上的压强变化是多少？（以 Pa 为单位输入。）
::: solution
$\alpha_p p'_P = 0.3 \times (-8.75) = -2.625\ \mathrm{Pa}$。
:::
:::

::: exercise 质量不平衡量 {level=2 check="-0.24"}
一个$\Delta x = 0.20\ \mathrm{m}$、$\Delta y = 0.10\ \mathrm{m}$（单位厚度）的二维单元中为空气（$\rho = 1.2\ \mathrm{kg/m^3}$）。带星号的面速度为$u_w^\ast = 5.0$，$u_e^\ast = 6.0$，$v_s^\ast = 1.0$，$v_n^\ast = 1.5\ \mathrm{m/s}$。计算压力修正方程的质量源项$b'$。（以 kg/s 为单位输入$b'$。）
::: solution
东、西面的面积为$\Delta y \times 1 = 0.10\ \mathrm{m^2}$；南、北面为$\Delta x \times 1 = 0.20\ \mathrm{m^2}$。$b' = 1.2\left[(5.0 - 6.0)(0.10) + (1.0 - 1.5)(0.20)\right] = 1.2(-0.10 - 0.10) = -0.24\ \mathrm{kg/s}$：净流出，因此$p'_P$将为负。
:::
:::

::: exercise SIMPLE 与 SIMPLEC 的比较 {level=2 check="5"}
某个面的$A_e = 0.010\ \mathrm{m^2}$，$a_e = 10\ \mathrm{kg/s}$，$\sum a_{nb} = 8.0\ \mathrm{kg/s}$。SIMPLEC 的$d_e$是 SIMPLE 的$d_e$的多少倍？（输入倍数。）
::: solution
SIMPLE：$d_e = 0.010/10 = 1.0\times10^{-3}$。SIMPLEC：$d_e = 0.010/(10 - 8) = 5.0\times10^{-3}$。倍数为$5$。SIMPLE 较小的$d$使同样的不平衡量产生较大的$p'$——这正是压强亚松弛所补偿的高估。
:::
:::

::: exercise Rhie–Chow 面速度 {level=2 check="2.02"}
单元中心速度为$u_P = u_E = 2.0\ \mathrm{m/s}$；单元中心压强梯度为$(\partial p/\partial x)_P = -100$和$(\partial p/\partial x)_E = -300\ \mathrm{Pa/m}$；$p_P = 400$，$p_E = 360\ \mathrm{Pa}$，$\delta x_{PE} = 0.10\ \mathrm{m}$；$\overline{D}_e = 1.0\times10^{-4}\ \mathrm{m^2\,s\,kg^{-1}}$。由[[#eq-rhie-chow]]计算$u_e$。（以 m/s 为单位输入$u_e$。）
::: solution
紧致面梯度：$(360 - 400)/0.10 = -400\ \mathrm{Pa/m}$。插值的单元梯度：$\tfrac12(-100 - 300) = -200\ \mathrm{Pa/m}$。于是
$$
u_e = 2.0 - 1.0\times10^{-4}\left[-400 - (-200)\right] = 2.0 + 0.020 = 2.02\ \mathrm{m/s}.
$$
压强跨越该面下降得比单元梯度所显示的更陡，因此面速度略高于插值值$2.0\ \mathrm{m/s}$。修正量与压强三阶导数乘以$\Delta x^2$成正比，对于光滑场随网格加密而消失。
:::
:::

::: exercise 推导一维压力修正方程 {level=3}
对于截面积$A(x)$变化的一维管道中的定常不可压缩流动，在交错网格上写出面$e$处速度的动量方程，推导压强节点$P$的 SIMPLE 压力修正方程，并证明对于密度不变的等截面管道，其系数化为$a_E = \rho A^2/a_e$和$a_W = \rho A^2/a_w$。解释为什么收敛解不依赖于近似$\sum a_{nb}u'_{nb} \approx 0$。
::: solution
面$e$处的动量方程：$a_eu_e = \sum a_{nb}u_{nb} + (p_P - p_E)A_e + b_e$。令$p = p^\ast + p'$，$u = u^\ast + u'$并去掉邻点修正，得$u'_e = d_e(p'_P - p'_E)$，$d_e = A_e/a_e$，以及$u'_w = d_w(p'_W - p'_P)$。压强单元$P$的连续性方程：$\rho A_eu_e - \rho A_wu_w = 0$。代入得$(\rho A_ed_e + \rho A_wd_w)p'_P = \rho A_wd_wp'_W + \rho A_ed_ep'_E + (\rho A_wu_w^\ast - \rho A_eu_e^\ast)$，故$a_E = \rho A_ed_e = \rho A_e^2/a_e$，$a_W = \rho A_w^2/a_w$；对于等截面管道$A_e = A_w = A$。收敛时质量不平衡量$b'$为零，因此处处$p' = 0$且$u' = 0$；此时$p^\ast$、$u^\ast$所满足的方程就是精确的离散动量方程和连续性方程，与$p'$的计算方式无关。这一近似只影响路径（收敛速度），不影响终点。
:::
:::

::: exercise 选择耦合算法 {level=3}
为下列情形推荐一种压力-速度算法并说明理由：(a) 在$5\times10^{6}$个单元上对离心泵内部流动进行定常 RANS 计算；(b) 对$\mathrm{Re} = 3900$的圆柱绕流进行大涡模拟；(c) 高方腔中由浮力驱动缓慢流动的自然对流；(d) 机翼上的跨声速流动。对每种情形，说明运行过程中你会关注什么。
::: solution
(a) SIMPLEC 或采用 AMG 的耦合式基于压力的求解器；对于压力-速度强耦合的旋转机械，耦合求解器所需的迭代次数要少得多。关注扬程和转矩的历程、入口与出口之间的质量不平衡以及残差。(b) 采用二阶时间推进和低耗散空间格式的投影法或 PISO 方法，时间步长按库朗数小于约$1$选取；关注库朗数、每步的连续性误差以及平均量的统计收敛。(c) SIMPLE 系列或耦合式基于压力的求解器，体积力的插值须与压强梯度相容（否则会出现虚假流动）；关注能量平衡和努塞尔数；由于浮力耦合很强，亚松弛因子可能需要取得更小。(d) 基于密度的求解器（或基于压力的可压缩形式），采用尊重特征速度的迎风通量；激波要求守恒、有界的格式；关注升力和阻力的收敛、网格加密下激波位置的变化以及熵的行为。
:::
:::
