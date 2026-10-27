上一课构造的差分格式，其截断误差随网格加密而趋于零。但这还不够。在[[computational-fluid-dynamics/finite-differences#ex-ftcs]]中，热方程的显式格式在扩散数$d = 0.2$时表现良好；若取$d = 0.6$运行，几十步之内温度就会在零上和零下数百万度之间振荡，尽管公式与之前完全一样“精确”。对流方程的时间向前、空间中心格式在空间上具有二阶精度，却对**任何**时间步长都会发散。问题出在**稳定性**上：格式放大了它不可避免地引入的误差，而不是使这些误差保持有界。

本课精确地阐述三个概念——**相容性**（格式近似的是正确的方程）、**稳定性**（误差不会无界增长）和**收敛性**（数值解随网格加密趋于精确解）——并通过拉克斯等价定理把它们联系起来。然后给出每个 CFD 工程师每天都在使用的两个实用工具：**冯·诺依曼分析**，它通过研究格式如何处理单个傅里叶模态得到稳定性限制；以及**柯朗-弗里德里希斯-列维（CFL）条件**，它用一句话说明了为什么对流的显式格式需要小的时间步长。最后，**修正方程**揭示了一个看起来精确但并不完美的格式实际上在计算什么：正确的方程加上人工扩散或人工色散。模型问题和记号与[[computational-fluid-dynamics/finite-differences]]相同。

## 相容性、稳定性、收敛性

对线性问题的线性两层格式，把时间层$n$上的所有网格值汇集为向量$\mathbf{u}^n$，写成
$$
\mathbf{u}^{n+1} = \mathbf{Q}\,\mathbf{u}^n + \Delta t\,\mathbf{f}^n ,
$$ {#eq-two-level}
其中$\mathbf{Q}$（**迭代矩阵**或**放大矩阵**）依赖于$\Delta x$和$\Delta t$，$\mathbf{f}^n$汇集了源项和边界数据。对于热方程的 FTCS 格式，$\mathbf{Q}$是三对角矩阵，三条对角线上分别为$d$、$1 - 2d$、$d$。

::: definition 相容性、稳定性与收敛性 {#def-csc}
设网格加密时$\Delta t$与$\Delta x$按某一固定规则联系在一起（例如$d$为常数或库朗数为常数）。
- 若代入精确解$\mathbf{u}_{\text{ex}}^n$时有$\mathbf{u}_{\text{ex}}^{n+1} = \mathbf{Q}\mathbf{u}_{\text{ex}}^n + \Delta t\,\mathbf{f}^n + \Delta t\,\boldsymbol{\tau}^n$，且**局部截断误差**$\boldsymbol{\tau}^n \to \mathbf{0}$（当$\Delta t, \Delta x \to 0$），则称格式是**相容的**。
- 若存在与$\Delta t$和$\Delta x$无关的常数$K$，使得对所有满足$m\,\Delta t \le T$（$T$为终止时刻）的$m$都有$\lVert\mathbf{Q}^m\rVert \le K$，则称格式是**稳定的**。
- 若对每个固定时刻$t^n \le T$和每个容许的初始条件，误差$\mathbf{e}^n = \mathbf{u}^n - \mathbf{u}_{\text{ex}}^n$在网格加密时满足$\lVert\mathbf{e}^n\rVert \to 0$，则称格式是**收敛的**。
:::

相容性是局部性质，容易用泰勒级数检验。收敛性是我们想要的，却无法直接检验——我们不知道精确解。稳定性就是二者之间的桥梁。

::: theorem 拉克斯等价定理 {#thm-lax}
对于适定的线性初值问题和相容的线性有限差分格式，稳定性是收敛性的充分必要条件。而且，若截断误差为$O(\Delta t^q + \Delta x^p)$，则稳定格式的整体误差具有相同的阶。
:::

::: proof
我们证明实践中所用的充分性部分。从[[#eq-two-level]]中减去相容性关系式：误差满足$\mathbf{e}^{n+1} = \mathbf{Q}\mathbf{e}^n - \Delta t\,\boldsymbol{\tau}^n$。从$\mathbf{e}^0$开始展开递推关系，
$$
\mathbf{e}^n = \mathbf{Q}^n\mathbf{e}^0 - \Delta t\sum_{m=0}^{n-1}\mathbf{Q}^{\,n-1-m}\boldsymbol{\tau}^m .
$$
取范数并利用稳定性，即对$j\Delta t \le T$有$\lVert\mathbf{Q}^j\rVert \le K$：
$$
\lVert\mathbf{e}^n\rVert \le K\lVert\mathbf{e}^0\rVert + K\,n\Delta t\,\max_m\lVert\boldsymbol{\tau}^m\rVert \le K\lVert\mathbf{e}^0\rVert + K\,T\,\max_m\lVert\boldsymbol{\tau}^m\rVert .
$$
初始误差$\mathbf{e}^0$为零（或与初始数据的表示误差一样小），而相容性使$\max\lVert\boldsymbol{\tau}^m\rVert \to 0$；因此$\lVert\mathbf{e}^n\rVert \to 0$，且趋零速率与$\boldsymbol{\tau}$相同。关键在于，$n \sim T/\Delta t$个大小各为$\Delta t\,\tau$的局部误差会**累加**，但不会被**放大**：这正是稳定性所保证的。稳定性的必要性（收敛的格式必定稳定）要用到泛函分析中的一致有界原理，其证明见 Richtmyer 和 Morton 的《初值问题的差分方法》（*Difference Methods for Initial-Value Problems*）；这里不需要它。
:::

这个定理就是 CFD 从业者如此频繁地谈论稳定性的原因：相容性容易满足，因此区分可用格式与无用格式的是稳定性。严格地说，它只适用于线性问题；对于非线性的纳维-斯托克斯方程，它被应用于线性化的“冻结系数”方程，这是一种启发式做法——但在实践中效果出奇地好。

## 冯·诺依曼稳定性分析

如何在不计算矩阵幂的情况下估计$\lVert\mathbf{Q}^m\rVert$的界？对于周期（或非常大的）区域上的常系数线性格式，傅里叶分析可以把问题对角化。每个网格函数都是傅里叶模态$e^{\mathrm{i}k x_j}$之和，而由于格式在每个节点上系数相同，每个模态独立地演化：一步之内它被乘以一个复数$G$，即**放大因子**。误差也是网格函数，因此若没有任何模态能够增长，格式就是稳定的。

::: algorithm 冯·诺依曼分析 {#alg-von-neumann}
1. 写出误差满足的格式（等价地，去掉源项和边界数据后的齐次格式）。
2. 代入单个傅里叶模态$u_j^n = G^n e^{\mathrm{i}j\theta}$，其中$\theta = k\Delta x \in [-\pi, \pi]$是每个网格间隔上的相位角，$G^n$表示$G$的$n$次幂。
3. 除以公因子$G^n e^{\mathrm{i}j\theta}$并解出$G(\theta)$，用到$e^{\mathrm{i}\theta} + e^{-\mathrm{i}\theta} = 2\cos\theta$和$1 - \cos\theta = 2\sin^2(\theta/2)$。
4. 若对每个$\theta$都有$\lvert G(\theta)\rvert \le 1$，则格式稳定（当精确解本身可能增长时，允许$\lvert G\rvert \le 1 + O(\Delta t)$）。求出使之成立的参数取值。
:::

对于两层时间的单个方程，在周期区域上该条件是充分必要的。有边界时，它仍是必要条件，而且在实践中几乎总是起决定作用的条件；边界格式可能引起额外的不稳定性，这需要用其他方法（GKS 理论）研究，超出了本课程的范围。

::: proposition 热方程各格式的稳定性 {#prop-heat-stability}
对于$T_t = \alpha T_{xx}$，记$d = \alpha\Delta t/\Delta x^2$，$s = \sin^2(\theta/2)$：
$$
G_{\text{FTCS}} = 1 - 4ds,\qquad
G_{\text{BTCS}} = \frac{1}{1 + 4ds},\qquad
G_{\text{CN}} = \frac{1 - 2ds}{1 + 2ds}.
$$
FTCS 稳定当且仅当$d \le \tfrac12$；BTCS 和克兰克-尼科尔森格式对所有$d > 0$都稳定（**无条件稳定**）。
:::

::: proof
FTCS：把$T_j^n = G^n e^{\mathrm{i}j\theta}$代入$T_j^{n+1} = T_j^n + d(T_{j+1}^n - 2T_j^n + T_{j-1}^n)$并相除，得$G = 1 + d(e^{\mathrm{i}\theta} - 2 + e^{-\mathrm{i}\theta}) = 1 + 2d(\cos\theta - 1) = 1 - 4ds$。$G$为实数且$\le 1$；在最不利的模态$\theta = \pi$（$s = 1$）处，条件$G \ge -1$给出$1 - 4d \ge -1$，即$d \le \tfrac12$。BTCS：同样代入$-dT_{j-1}^{n+1} + (1 + 2d)T_j^{n+1} - dT_{j+1}^{n+1} = T_j^n$，得$G(1 + 2d - 2d\cos\theta) = 1$，故对所有$d$都有$G = 1/(1 + 4ds) \in (0, 1]$。克兰克-尼科尔森格式：$G(1 + 2ds) = 1 - 2ds$；由于$2ds \ge 0$，$\lvert 1 - 2ds\rvert \le 1 + 2ds$，故对所有$d$都有$\lvert G\rvert \le 1$。
:::

$d \le \tfrac12$的物理意义就是[[computational-fluid-dynamics/finite-differences#ex-ftcs]]中看到的正性：FTCS 写作$T_j^{n+1} = dT_{j-1}^n + (1 - 2d)T_j^n + dT_{j+1}^n$，当$1 - 2d < 0$时，一个热的节点在一步之内会变得比它冷的邻点**更冷**。一个模态在一步中的精确因子为$e^{-\alpha k^2\Delta t} = e^{-d\theta^2}$，总在$0$和$1$之间。克兰克-尼科尔森格式在$d$很大时稳定，但对最短的波它的$G \to -1$：这些波没有被阻尼，而是每步改变一次符号。当用大时间步长从间断的初始条件启动克兰克-尼科尔森格式时，看到的缓慢衰减的振荡就源于此。

::: example 大时间步长的克兰克-尼科尔森格式 {#ex-cn-large}
用$d = 5$的克兰克-尼科尔森格式推进一个非稳态导热问题。计算锯齿模态（$\theta = \pi$）和$\theta = 0.1$的光滑模态的放大因子，分别与精确的单步衰减因子$e^{-d\theta^2}$比较，并描述初始温度场含有陡峭阶跃时会看到什么。
::: solution
对$\theta = \pi$，$s = \sin^2(\pi/2) = 1$，$G = (1 - 10)/(1 + 10) = -0.818$，而精确因子为$e^{-5\pi^2} \approx 4\times10^{-22}$。对$\theta = 0.1$，$s = \sin^2 0.05 = 2.498\times10^{-3}$，$2ds = 0.02498$，$G = 0.97502/1.02498 = 0.95126$，精确值为$e^{-0.05} = 0.95123$。

光滑模态被复现到五位有效数字；而在物理上应立即消失的锯齿模态，每步只减小$18\,\%$，且每步改变符号。陡峭的阶跃含有很强的网格尺度分量，因此解在阶跃附近呈现节点间的振荡，需要$\ln(0.01)/\ln(0.818) \approx 23$步才衰减到$1\,\%$。格式是稳定的——但在这些步中结果明显错误。合理性检查：当$d \to \infty$时$G(\pi) \to -1$，因此时间步长越大，振荡越持久。
:::
:::

::: widget plot
f: abs(1 - 4*d*sin(x/2)^2); 1/(1 + 4*d*sin(x/2)^2); abs((1 - 2*d*sin(x/2)^2)/(1 + 2*d*sin(x/2)^2)); exp(-d*x^2)
x: 0, pi
y: 0, 2
sliders: d=0.4:0.05:3:0.05
labels: |G|\ \text{FTCS}; |G|\ \text{BTCS}; |G|\ \text{克兰克-尼科尔森}; \text{精确值 } e^{-d\theta^2}
hlines: 1
caption: 热方程各格式放大因子的模随相位角$\theta = k\Delta x$的变化，扩散数$d$由滑块设定。把$d$推过$0.5$，FTCS 曲线在右端升到$1$以上：锯齿模态$\theta = \pi$被放大，格式发散。BTCS 总是阻尼的，在$d$较小时对长波的阻尼比精确解更强。注意在$d$较大时，克兰克-尼科尔森格式的$|G|$在高$\theta$处回升到接近$1$，而精确因子实际上为零：最短的波几乎未受阻尼地保留下来。
:::

::: proposition 对流方程迎风格式与中心格式的稳定性 {#prop-advection-stability}
对于$u_t + a u_x = 0$，$a > 0$，库朗数为$C = a\Delta t/\Delta x$：
$$
\begin{aligned}
\text{FTCS：}\quad & G = 1 - \mathrm{i}C\sin\theta, & \lvert G\rvert^2 &= 1 + C^2\sin^2\theta ,\\
\text{迎风（FTBS）：}\quad & G = 1 - C\left(1 - e^{-\mathrm{i}\theta}\right), & \lvert G\rvert^2 &= 1 - 2C(1 - C)(1 - \cos\theta).
\end{aligned}
$$
FTCS 对任何$C > 0$都不稳定；迎风格式稳定当且仅当$0 \le C \le 1$。
:::

::: proof
对于 FTCS，$u_j^{n+1} = u_j^n - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n)$给出$G = 1 - \tfrac{C}{2}(e^{\mathrm{i}\theta} - e^{-\mathrm{i}\theta}) = 1 - \mathrm{i}C\sin\theta$，对每个不是$\pi$整数倍的$\theta$，其模的平方都超过$1$。对于迎风格式，$G = 1 - C + Ce^{-\mathrm{i}\theta}$，且
$$
\lvert G\rvert^2 = (1 - C + C\cos\theta)^2 + C^2\sin^2\theta = (1-C)^2 + 2C(1-C)\cos\theta + C^2 = 1 - 2C(1-C)(1 - \cos\theta),
$$
其中用到$(1-C)^2 + C^2 = 1 - 2C(1-C)$。由于$1 - \cos\theta \in [0, 2]$，对所有$\theta$都有$\lvert G\rvert \le 1$当且仅当$C(1-C) \ge 0$，即$0 \le C \le 1$。
:::

对流方程 FTCS 的不稳定性值得思考片刻：因子$1 + C^2\sin^2\theta$每步只比$1$大$O(\Delta t^2)$，因此在固定时间$T$内的增长类似于$(1 + C^2)^{T/(2\Delta t)}$——在$C$固定、$\Delta t \to 0$时无界。一个“几乎稳定”的格式就是不稳定的。

::: example 显式导热计算的时间步长 {#ex-conduction-dt}
用 FTCS 在$\Delta x = 1.0\ \mathrm{mm}$的均匀网格上模拟一个铝制零件（$\alpha = 9.7\times10^{-5}\ \mathrm{m^2/s}$）。求一维和二维（$\Delta y = \Delta x$）情形下最大的稳定时间步长。
::: solution
一维：$\Delta t \le \Delta x^2/(2\alpha) = (1.0\times10^{-3})^2/(2 \times 9.7\times10^{-5}) = 5.15\times10^{-3}\ \mathrm{s}$。

二维：代入$T_{j,l}^n = G^n e^{\mathrm{i}(j\theta_x + l\theta_y)}$，得$G = 1 - 4d_x\sin^2(\theta_x/2) - 4d_y\sin^2(\theta_y/2)$；最不利的模态是棋盘格模态$\theta_x = \theta_y = \pi$，因此$1 - 4d_x - 4d_y \ge -1$，即$d_x + d_y \le \tfrac12$。当$\Delta x = \Delta y$时，$\Delta t \le \Delta x^2/(4\alpha) = 2.58\times10^{-3}\ \mathrm{s}$；三维中为$\Delta x^2/(6\alpha)$。

合理性检查：铝的热扩散率高，因此对毫米级的单元取毫秒级的时间步是合理的——热量穿过一毫米大约需要$\Delta x^2/\alpha \approx 10\ \mathrm{ms}$。每增加一个维度，限制就更严，因为棋盘格模态有更多的邻点与之交换热量。
:::
:::

## CFL 条件

冯·诺依曼分析给出模型问题的精确限制。CFL 条件则通过一个无需代数运算的几何论证，给出双曲型方程**任何**显式格式的一个必要限制。

::: definition 依赖域 {#def-domain-dependence}
点$(x_j, t^n)$的**物理依赖域**是其数据会影响该点精确解的那些初始点的集合；对于$u_t + au_x = 0$，它是单个点$x_j - at^n$；对于波速为$c$的波动方程，它是区间$[x_j - ct^n, x_j + ct^n]$。**数值依赖域**是其值参与$u_j^n$计算的那些初始网格点的集合。对于模板向左、向右各延伸$r$个点的显式格式，它是$[x_j - r\,n\Delta x,\ x_j + r\,n\Delta x]$。
:::

::: theorem 柯朗-弗里德里希斯-列维条件 {#thm-cfl}
双曲型方程差分格式收敛的一个必要条件是：在网格加密的极限下，其数值依赖域包含物理依赖域。对于$u_t + au_x = 0$的显式三点格式，这要求
$$
C = \frac{\lvert a\rvert\,\Delta t}{\Delta x} \le 1 .
$$ {#eq-cfl}
:::

::: proof
假设在网格加密过程中，点$(x, t)$的物理依赖域包含一个位于数值依赖域之外的点$x_0$。在$x_0$的一个始终处于数值依赖域之外的小邻域内改变初始数据。$(x, t)$处的精确解会改变，因为$x_0$在其依赖域之内；而$(x, t)$处的数值解不变，因为它所用的网格值一个也没有改变。于是原初始数据和修改后的初始数据不可能都收敛到各自的精确解，因此格式并非对所有数据都收敛。对于三点显式模板，$n$步后的数值依赖域向两侧各延伸$n\Delta x$，而物理依赖域位于距离$\lvert a\rvert n\Delta t$处；包含关系要求$\lvert a\rvert\Delta t \le \Delta x$。
:::

CFL 条件用文字表述就是：**在一个时间步内，信息传播的距离不得超出模板所能“看到”的范围。** 它是必要的而非充分的——对流方程的 FTCS 格式在$C \le 1$时满足它，却仍然不稳定——但它解释了为什么每个显式可压缩流动程序都用$\Delta t \le C_{\max}\,\Delta x/(\lvert u\rvert + c)$来限制时间步长，其中$c$为声速：是[[computational-fluid-dynamics/governing-equations#prop-euler-speeds]]中最快的特征决定了这一限制。隐式格式把新时间层上的所有节点耦合在一起，其数值依赖域是整个网格，因此 CFL 条件对它们不构成限制（但精度仍然构成限制）。

::: example 显式可压缩求解器的时间步长 {#ex-cfl-dt}
某显式求解器计算$u = 20\ \mathrm{m/s}$、$T = 300\ \mathrm{K}$（声速$c = 347\ \mathrm{m/s}$）的空气流动，网格的最小单元为$\Delta x = 2.0\ \mathrm{mm}$。对于$C_{\max} = 1$的格式，分别求以下情形的时间步长限制：(a) 只考虑以流速进行的对流；(b) 需分辨声波。并加以评论。
::: solution
(a) $\Delta t \le \Delta x/\lvert u\rvert = 2.0\times10^{-3}/20 = 1.0\times10^{-4}\ \mathrm{s}$。
(b) $\Delta t \le \Delta x/(\lvert u\rvert + c) = 2.0\times10^{-3}/367 = 5.4\times10^{-6}\ \mathrm{s}$。
声学限制小$18$倍。在如此低的马赫数（$0.058$）下，声波在物理上并不重要，但显式可压缩格式必须分辨它们：这种“低马赫数刚性”就是低速流动通常用不可压缩（基于压力的）求解器（[[computational-fluid-dynamics/pressure-velocity]]），或用隐式并经预条件处理的可压缩求解器计算的原因。合理性检查：$\Delta x/c$是声音穿过一个单元所需的时间，对$2\ \mathrm{mm}$约为$6\ \mu\mathrm{s}$。
:::
:::

## 格式真正求解的是什么：修正方程

稳定且相容的格式是收敛的——但在有限网格上，它的误差表现为什么形式？**修正方程**回答了这个问题：它找出数值解所满足的、比原方程**更**精确的那个偏微分方程。其中多出的项体现了格式的“个性”。

::: proposition 迎风格式与拉克斯-温德罗夫格式的修正方程 {#prop-modified}
对于$u_t + au_x = 0$，$a > 0$，$C = a\Delta t/\Delta x$，一阶迎风格式在主阶意义下满足
$$
u_t + a u_x = \nu_{\text{num}}\,u_{xx},\qquad \nu_{\text{num}} = \frac{a\Delta x}{2}(1 - C),
$$ {#eq-modified-upwind}
而二阶拉克斯-温德罗夫（Lax–Wendroff）格式$u_j^{n+1} = u_j^n - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n) + \tfrac{C^2}{2}(u_{j+1}^n - 2u_j^n + u_{j-1}^n)$满足
$$
u_t + a u_x = -\frac{a\Delta x^2}{6}(1 - C^2)\,u_{xxx}.
$$ {#eq-modified-lw}
:::

::: proof
对于迎风格式，把一个光滑函数代入$(u_j^{n+1} - u_j^n)/\Delta t + a(u_j^n - u_{j-1}^n)/\Delta x = 0$，并在$(x_j, t^n)$处展开：
$$
u_t + \frac{\Delta t}{2}u_{tt} + a u_x - \frac{a\Delta x}{2}u_{xx} + O(\Delta t^2, \Delta x^2) = 0 .
$$
为消去$u_{tt}$，对这一关系式求导：在主阶意义下$u_t = -au_x$，故$u_{tt} = -a u_{xt} = a^2 u_{xx}$（误差低一阶）。代入得
$$
u_t + a u_x = \left(\frac{a\Delta x}{2} - \frac{a^2\Delta t}{2}\right)u_{xx} + \cdots = \frac{a\Delta x}{2}(1 - C)\,u_{xx} + \cdots .
$$
对于拉克斯-温德罗夫格式，把同样的过程再推进一阶（该格式的构造使$u_{tt}$项恰好被$\tfrac{C^2}{2}$二阶差分抵消），剩下三阶项$\tfrac{\Delta t^2}{6}u_{ttt} + \tfrac{a\Delta x^2}{6}u_{xxx}$；利用$u_{ttt} = -a^3u_{xxx}$，二者合并为$\tfrac{a\Delta x^2}{6}(1 - C^2)u_{xxx}$，移到右端即得[[#eq-modified-lw]]。
:::

这两个结果描述了两种典型的失效模式：

- **数值扩散**（偶数阶误差项，$u_{xx}$、$u_{xxxx}$）：锋面被抹平，峰值被削平，但不出现新的极值。迎风格式增加了一个与$\Delta x$成正比的黏度$\nu_{\text{num}}$——在粗网格上它往往远大于物理黏度。
- **数值色散**（奇数阶项，$u_{xxx}$）：不同波长的波以不同速度传播，因此陡峭的锋面分裂成一串摆动；对于拉克斯-温德罗夫格式，这些摆动通常拖在锋面后方，因为其短波传播得太慢。

::: example 数值黏度与真实黏度 {#ex-num-visc}
在$\Delta x = 10\ \mathrm{mm}$的网格上用$C = 0.5$的迎风格式以$a = 1.0\ \mathrm{m/s}$对流一个标量。计算数值黏度，并与空气的运动黏度$1.5\times10^{-5}\ \mathrm{m^2/s}$比较。
::: solution
$\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C) = 0.5 \times 1.0 \times 0.010 \times 0.5 = 2.5\times10^{-3}\ \mathrm{m^2/s}$，约为空气分子黏度的$170$倍。计算出的流动表现得好像其雷诺数小了$170$倍。$\Delta x$减半使$\nu_{\text{num}}$减半，但对于高雷诺数流动，任何实用的网格都无法使它可以忽略——这就是为什么一阶迎风格式只用于启动迭代和保证鲁棒性，而计算结果要用高阶有界格式（[[computational-fluid-dynamics/convection-diffusion]]）。合理性检查：在$C = 1$时$\nu_{\text{num}} = 0$，与迎风格式在该处精确相符。
:::
:::

::: example 多步后的振幅与相位 {#ex-amplitude-phase}
用每个波长$10$个点分辨的正弦波以$C = 0.5$进行对流。分别对迎风格式和拉克斯-温德罗夫格式，计算波传播一个波长和五个波长后剩余的振幅，以及拉克斯-温德罗夫格式的相位误差。
::: solution
$\theta = 2\pi/10 = 0.6283$，$1 - \cos\theta = 0.1910$。一个波长为$10\Delta x$；每步移动$C\Delta x = 0.5\Delta x$，需要$20$步，五个波长需要$100$步。

迎风格式：$\lvert G\rvert^2 = 1 - 2(0.5)(0.5)(0.1910) = 0.9045$，$\lvert G\rvert = 0.9511$。$20$步后的振幅：$0.9511^{20} = 0.367$；$100$步后：$0.0066$。传播五个波长后，波基本上已经消失。

拉克斯-温德罗夫格式：$G = 1 - \mathrm{i}C\sin\theta - C^2(1 - \cos\theta)$，故$\lvert G\rvert^2 = 1 - C^2(1 - C^2)(1 - \cos\theta)^2 = 1 - 0.1875 \times 0.03647$，$\lvert G\rvert = 0.99657$。$20$步后的振幅：$0.934$；$100$步后：$0.710$。每步的相位变化为$\arg G = -0.2994$ rad，精确值为$-C\theta = -0.3142$ rad：数值波以真实速度的$95.3\,\%$传播，五个波长后落后$0.047 \times 5 = 0.24$个波长。

（对于$C = 0.5$的迎风格式，相位恰好是精确的；其误差全部体现在振幅上。）合理性检查：二阶格式对振幅的保持要好得多，但它以相位误差换取了振幅误差——这正是修正方程中偶数阶与奇数阶误差的结构。
:::
:::

::: widget plot
f: sqrt(abs(1 - 2*C*(1 - C)*(1 - cos(x)))); sqrt(abs(1 - C^2*(1 - C^2)*(1 - cos(x))^2))
x: 0, pi
y: 0, 2
sliders: C=0.5:0:1.5:0.05
labels: |G|\ \text{迎风}; |G|\ \text{拉克斯-温德罗夫}
hlines: 1
caption: 线性对流方程各格式放大因子的模随$\theta$的变化，库朗数由滑块设定。当$C < 1$时两种格式都有阻尼；迎风格式即使对中等长度的波也有强烈阻尼（数值扩散），而拉克斯-温德罗夫格式在$\theta$很大之前都使$|G|$保持在$1$附近。恰好在$C = 1$时两条线都平直地位于$1$：两种格式都化为精确平移。把$C$推过$1$，两条曲线都升到$|G| = 1$这条线之上——这就是在傅里叶空间中看到的 CFL 条件。
:::

::: warning 稳定不等于精确，精确也不等于有界
有三个不同的要求常被混淆。稳定的格式可能不精确（粗网格上$C = 0.1$的迎风格式会把一切都抹平）；精确且稳定的格式可能无界（拉克斯-温德罗夫格式和克兰克-尼科尔森格式在间断附近会产生过冲，却没有任何不稳定性，而一个跌到零以下的温度或湍流量随后可能毁掉整个模拟）；以极大时间步长运行的无条件稳定隐式格式是稳定且有界的，但在时间上是错误的。应根据你所关心的瞬态过程的精度来选择$\Delta t$；稳定性是底线，而不是目标。
:::

::: quiz
一位同事求解$u_t + au_x = 0$的显式程序在空间上使用中心差分，并说“只要库朗数保持在$0.1$以下，它就是稳定的”。你怎么回答？
- [ ] 说得对：小的库朗数总能保证稳定。
- [x] 对流方程的 FTCS 格式是无条件不稳定的；$C$很小时每步的增长只有$1 + O(C^2)$，因此只是发散得慢而已。在$C$固定的情况下加密网格只会使情况更糟，而不是更好。
- [ ] 该格式是稳定的，因为它满足 CFL 条件。
- [ ] 如果区域是周期的，它就是稳定的。
::: solution
对每个$C > 0$都有$\lvert G\rvert^2 = 1 + C^2\sin^2\theta > 1$。在固定的物理时间内，步数随网格加密而增加，因此总放大倍数$(1 + C^2)^{n/2}$无界增长。CFL 条件是必要的，而不是充分的。
:::
:::

::: history
CFL 条件来自理查德·柯朗（Richard Courant）、库尔特·弗里德里希斯（Kurt Friedrichs）和汉斯·列维（Hans Lewy）1928 年的论文《论数学物理中的偏差分方程》（“Über die partiellen Differenzengleichungen der mathematischen Physik”，《数学年刊》（*Mathematische Annalen*），第 100 卷），该文写于计算机出现之前多年，目的是用有限差分证明偏微分方程解的存在性。稳定性分析的傅里叶方法由约翰·冯·诺依曼（John von Neumann）在第二次世界大战期间于洛斯阿拉莫斯提出；第一篇完整的公开论述由 G. G. O'Brien、M. A. Hyman 和 S. Kaplan 于 1951 年发表（《数学与物理杂志》（*Journal of Mathematics and Physics*））。彼得·拉克斯（Peter Lax）和罗伯特·里克特迈耶（Robert Richtmyer）在 1956 年的《线性有限差分方程稳定性综述》（“Survey of the stability of linear finite difference equations”，《纯粹与应用数学通讯》（*Communications on Pure and Applied Mathematics*））中证明了等价定理；拉克斯和伯顿·温德罗夫（Burton Wendroff）于 1960 年在同一期刊上发表了他们的二阶格式。修正方程方法由 R. F. Warming 和 B. J. Hyett 于 1974 年系统化（《计算物理杂志》（*Journal of Computational Physics*））。
:::

::: summary
- 相容性：网格加密时格式化为偏微分方程。稳定性：$\lVert\mathbf{Q}^m\rVert$保持有界。收敛性：数值解趋于精确解。
- 拉克斯等价定理：对于相容的线性格式，稳定性$\Leftrightarrow$收敛性，且稳定格式的整体误差与其截断误差同阶。
- 冯·诺依曼分析代入$G^ne^{\mathrm{i}j\theta}$并要求$\lvert G\rvert \le 1$；热方程 FTCS：$d \le \tfrac12$（二维中$d_x + d_y \le \tfrac12$）；BTCS 和克兰克-尼科尔森格式：无条件稳定，克兰克-尼科尔森格式对短波无阻尼。
- 对流方程：FTCS 总是不稳定的；迎风格式要求$0 \le C \le 1$。
- CFL 条件：数值依赖域必须包含物理依赖域；显式格式要求$\lvert a\rvert\Delta t/\Delta x \le 1$，其中取最快的波速（通常为$\lvert u\rvert + c$）。
- 修正方程揭示了迎风格式的数值扩散$\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C)$和拉克斯-温德罗夫格式的色散$\propto(1 - C^2)u_{xxx}$。
:::

## 习题

::: exercise 二维显式导热 {level=1 check="0.025"}
对一个$\alpha = 1.0\times10^{-5}\ \mathrm{m^2/s}$的固体，在$\Delta x = \Delta y = 1.0\ \mathrm{mm}$的正方形网格上使用 FTCS。求最大的稳定时间步长。（以秒为单位输入$\Delta t$。）
::: solution
$d_x + d_y \le \tfrac12$，$d_x = d_y = \alpha\Delta t/\Delta x^2$，得$\Delta t \le \Delta x^2/(4\alpha) = 10^{-6}/(4\times10^{-5}) = 0.025\ \mathrm{s}$。
:::
:::

::: exercise 库朗数 {level=1 check="1.5"}
显式迎风格式在$\Delta x = 1.0\ \mathrm{mm}$的网格上以$\Delta t = 1.0\times10^{-4}\ \mathrm{s}$对流一个速度为$a = 15\ \mathrm{m/s}$的标量。计算库朗数并判断格式是否稳定。（输入$C$。）
::: solution
$C = a\Delta t/\Delta x = 15 \times 10^{-4}/10^{-3} = 1.5 > 1$：不稳定。时间步长必须减小到不超过$6.7\times10^{-5}\ \mathrm{s}$。
:::
:::

::: exercise 锯齿模态的增长 {level=1 check="1.4"}
以$d = 0.6$运行热方程的 FTCS 格式。求锯齿模态$\theta = \pi$的$\lvert G\rvert$，以及该模态在$20$步内增长的倍数。（输入$\lvert G\rvert$。）
::: solution
$G = 1 - 4d = 1 - 2.4 = -1.4$，故$\lvert G\rvert = 1.4$；$20$步后该模态被乘以$1.4^{20} \approx 837$，且每步改变符号——这是显式扩散格式失稳的典型特征。
:::
:::

::: exercise 数值黏度 {level=2 check="0.001"}
求$a = 2.0\ \mathrm{m/s}$、$\Delta x = 5.0\ \mathrm{mm}$、$C = 0.8$时迎风格式的数值黏度。（以$\mathrm{m^2/s}$为单位输入$\nu_{\text{num}}$。）
::: solution
$\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C) = 0.5 \times 2.0 \times 0.005 \times 0.2 = 1.0\times10^{-3}\ \mathrm{m^2/s}$。
:::
:::

::: exercise 已分辨波的阻尼 {level=2 check="0.157"}
每个波长$20$个点的波用$C = 0.25$的迎风格式对流$200$个时间步。剩余振幅占原振幅的比例是多少？（输入该比例，保留三位有效数字。）
::: solution
$\theta = 2\pi/20 = 0.3142$，$1 - \cos\theta = 0.04894$，$\lvert G\rvert^2 = 1 - 2(0.25)(0.75)(0.04894) = 0.98165$，$\lvert G\rvert = 0.99078$。$200$步后：$0.99078^{200} = 0.157$。在这$200$步中，波传播了$200 \times 0.25 = 50\Delta x = 2.5$个波长，尽管分辨良好，仍损失了$84\,\%$的振幅。
:::
:::

::: exercise 显式对流-扩散 {level=2 check="3.333e-4"}
FTCS 类格式$\phi_j^{n+1} = \phi_j^n - C(\phi_j^n - \phi_{j-1}^n) + d(\phi_{j+1}^n - 2\phi_j^n + \phi_{j-1}^n)$（迎风对流、中心扩散）用于$u = 1.0\ \mathrm{m/s}$、$\Gamma/\rho = 1.0\times10^{-3}\ \mathrm{m^2/s}$、$\Delta x = 1.0\ \mathrm{mm}$的情形。证明当$C + 2d \le 1$时它是旧值的加权平均，并求满足这一条件的最大时间步长。（以秒为单位输入$\Delta t$，保留四位有效数字。）
::: solution
整理得$\phi_j^{n+1} = (C + d)\phi_{j-1}^n + (1 - C - 2d)\phi_j^n + d\,\phi_{j+1}^n$：权重之和为$1$，且当$C + 2d \le 1$时全部非负，这保证了有界性（以及在最大模意义下的稳定性）。$C + 2d = \Delta t\left(u/\Delta x + 2\nu/\Delta x^2\right) = \Delta t(1000 + 2000)\ \mathrm{s^{-1}}$，故$\Delta t \le 1/3000 = 3.33\times10^{-4}\ \mathrm{s}$。这里起更严格限制作用的是扩散而不是对流：网格佩克莱数$u\Delta x/\nu = 1$很小。
:::
:::

::: exercise 拉克斯-弗里德里希斯格式 {level=3}
拉克斯-弗里德里希斯（Lax–Friedrichs）格式把 FTCS 中的$u_j^n$替换为其两个邻点的平均：$u_j^{n+1} = \tfrac12(u_{j+1}^n + u_{j-1}^n) - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n)$。(a) 求$G$和稳定性条件。(b) 推导其修正方程，并证明其数值黏度为$\tfrac{\Delta x^2}{2\Delta t}(1 - C^2)$。(c) 在$C = 0.5$时将它与迎风格式比较。
::: solution
(a) $G = \cos\theta - \mathrm{i}C\sin\theta$，$\lvert G\rvert^2 = \cos^2\theta + C^2\sin^2\theta = 1 - (1 - C^2)\sin^2\theta \le 1$当且仅当$\lvert C\rvert \le 1$——即 CFL 限制，这里恰好达到。
(b) 展开：$\tfrac12(u_{j+1} + u_{j-1}) = u + \tfrac{\Delta x^2}{2}u_{xx} + \cdots$，故$u_t + \tfrac{\Delta t}{2}u_{tt} + au_x - \tfrac{\Delta x^2}{2\Delta t}u_{xx} = O(\Delta x^2)$。利用$u_{tt} = a^2u_{xx}$：$u_t + au_x = \left(\tfrac{\Delta x^2}{2\Delta t} - \tfrac{a^2\Delta t}{2}\right)u_{xx} = \tfrac{\Delta x^2}{2\Delta t}(1 - C^2)u_{xx}$。
(c) 把$\Delta x^2/\Delta t$写成$a\Delta x/C$，拉克斯-弗里德里希斯格式的黏度为$\tfrac{a\Delta x}{2C}(1 - C^2)$；在$C = 0.5$时为$0.75\,a\Delta x$，是迎风格式的值$0.25\,a\Delta x$的三倍。对邻点取平均是通过加入大量扩散来使 FTCS 稳定的。
:::
:::

::: exercise 为工业瞬态问题选择时间步长 {level=3}
计划对水管中阀门关闭过程进行瞬态模拟（水中声速约$1480\ \mathrm{m/s}$，流速$3\ \mathrm{m/s}$），阀座附近网格的最小单元为$0.5\ \mathrm{mm}$。阀门在$20\ \mathrm{ms}$内关闭。讨论在显式可压缩求解器和隐式基于压力的求解器之间如何选择，估计时间步长和步数，并说明你会监测哪些量来确认时间步长是合适的。
::: solution
显式可压缩：$\Delta t \le \Delta x/(u + c) = 5\times10^{-4}/1483 = 3.4\times10^{-7}\ \mathrm{s}$；$20\ \mathrm{ms}$约需$6\times10^{4}$步，而要追踪随后的压强激增（水锤）还需要多得多的步数，水锤确实是声学现象。如果压强激增很重要——这通常正是进行此类研究的原因——那么无论如何都必须分辨这些声学时间尺度，采用$C_{\text{acoustic}} \sim 1$的显式或隐式可压缩格式是合适的。如果只关心通过正在关闭的阀门的不可压缩流动，那么在最小单元中对流库朗数$\sim 1$的隐式基于压力的求解器允许$\Delta t \sim \Delta x/u_{\text{max}}$；通过逐渐变窄的间隙的射流速度可能达到$30\ \mathrm{m/s}$，由此得$\Delta t \sim 1.7\times10^{-5}\ \mathrm{s}$，约$1200$步。时间步长是否合适可通过以下方式确认：进行时间步长研究（把$\Delta t$减半，比较阀门上的作用力、峰值压强和流量随时间的变化），检查最大库朗数是否保持在预期值附近，以及检查每个时间步内的迭代残差是否收敛。
:::
:::
