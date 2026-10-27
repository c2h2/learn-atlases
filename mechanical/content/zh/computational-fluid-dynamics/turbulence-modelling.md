工程师计算的流动几乎都是湍流：汽车或机翼表面的空气、水泵中的水、燃烧室中的燃气、换热器中的冷却剂。湍流并不是一种独立的物理——[[computational-fluid-dynamics/governing-equations]]中的纳维-斯托克斯方程完整地描述了它——而是这些方程的一种流态，其解是混沌的、三维的和非定常的，涡的尺寸跨越极宽的范围。最大的涡与流动本身一样大；最小的涡（动能最终在那里耗散为热）可以只有零点几毫米。在网格上把它们全部解析出来，只有在不高的雷诺数下、以巨大的代价才做得到。因此工程 CFD 对湍流进行**建模**：它计算平均流动，并用附加方程表示脉动对平均流动的影响，这些方程的形式一部分是推导出来的，一部分是依据实验标定的。本课解释为什么必须这样做、平均方程是怎样得到的、经典模型如何工作、壁面如何处理，以及介于两者之间的大涡模拟能提供什么。

模型的好坏只取决于它所标定的那些流动。这里的目的不是记住常数，而是理解每个模型做了什么假设，以便你能合理地选择模型并批判性地评判其结果。本课背后的边界层物理见[[fluid-mechanics/boundary-layers-drag]]。

## 为什么必须对湍流建模

柯尔莫哥洛夫（Kolmogorov）1941 年的理论把湍流描绘为一个**能量级串**：平均流动以单位质量$\varepsilon \sim u'^3/\ell$的速率向尺寸为$\ell$、速度为$u'$的大涡输入能量；大涡破碎为更小的涡，把能量无损失地向下传递，直到涡小到足以让黏性将其耗散。耗散涡只能取决于能量到达的速率$\varepsilon$和黏度$\nu$。

::: definition 柯尔莫哥洛夫尺度 {#def-kolmogorov}
**柯尔莫哥洛夫长度、时间和速度尺度**是$\varepsilon$（单位$\mathrm{m^2/s^3}$，即 W/kg）与$\nu$（单位$\mathrm{m^2/s}$）的具有相应量纲的唯一组合：
$$
\eta = \left(\frac{\nu^3}{\varepsilon}\right)^{1/4},\qquad \tau_\eta = \left(\frac{\nu}{\varepsilon}\right)^{1/2},\qquad u_\eta = (\nu\varepsilon)^{1/4}.
$$ {#eq-kolmogorov}
利用$\varepsilon \sim u'^3/\ell$，最大尺度与最小尺度之比为$\ell/\eta \sim \mathrm{Re}_\ell^{3/4}$，其中$\mathrm{Re}_\ell = u'\ell/\nu$。
:::

**直接数值模拟**（DNS）必须在全部三个方向上解析该范围的两端，因此需要约$(\ell/\eta)^3 \sim \mathrm{Re}^{9/4}$个网格点；又因为时间步长必须解析最小的涡，而计算必须持续若干个大涡翻转时间，所以需要约$\mathrm{Re}^{3/4}$个时间步：总代价按$\mathrm{Re}^3$增长。

::: example 最小的涡有多小？ {#ex-kolmogorov}
水（$\nu = 1.0\times10^{-6}\ \mathrm{m^2/s}$）以$U = 1.0\ \mathrm{m/s}$流过直径$D = 0.10\ \mathrm{m}$的圆管。由压降估算平均耗散率、柯尔莫哥洛夫长度和时间尺度，以及对十倍直径长的管段进行 DNS、网格间距等于$\eta$时所需的网格点数。
::: solution
$\mathrm{Re}_D = UD/\nu = 1.0\times10^{5}$。布拉休斯（Blasius）摩擦因子为$f = 0.316\,\mathrm{Re}^{-1/4} = 0.0178$。单位质量耗散的功率等于压降乘以流量再除以质量：$\varepsilon = (\Delta p/L)\,U/\rho = f U^3/(2D) = 0.0178 \times 1.0/0.20 = 0.089\ \mathrm{W/kg}$（这是截面平均值；近壁处要高得多）。于是
$$
\eta = \left(\frac{(10^{-6})^3}{0.089}\right)^{1/4} = 5.8\times10^{-5}\ \mathrm{m},\qquad \tau_\eta = \left(\frac{10^{-6}}{0.089}\right)^{1/2} = 3.4\times10^{-3}\ \mathrm{s}.
$$
把长$1.0\ \mathrm{m}$、直径$0.10\ \mathrm{m}$的圆柱划分为边长为$\eta$的立方体，需要$(1.0/\eta)(\pi/4)(0.10/\eta)^2 \approx 4\times10^{10}$个点——与标度律$\mathrm{Re}^{9/4} = 1.8\times10^{11}$在数量级上一致。合理性检验：实际的 DNS 借助谱精度可以采用几个$\eta$的间距，使点数降低一个数量级；即便如此，对这一不起眼的管流做一次 DNS 也是大型超级计算机作业，而工程师需要在工作站上计算数以百计的设计方案。
:::
:::

## 雷诺平均

雷诺（Osborne Reynolds）的思想（1895）是把每个变量分解为平均值与脉动值之和，$u_i = U_i + u_i'$，$p = P + p'$，其中平均值$U_i = \overline{u_i}$是时间平均（对统计定常流动）或系综平均。按定义$\overline{u_i'} = 0$，但脉动**乘积**的平均值不为零：一般$\overline{u_i'u_j'} \ne 0$。

::: proposition 雷诺平均纳维-斯托克斯方程 {#prop-rans}
对于$\rho$和$\mu$为常数的不可压缩流动，平均速度和平均压强满足
$$
\frac{\partial U_i}{\partial x_i} = 0,\qquad
\rho\left(\frac{\partial U_i}{\partial t} + U_j\frac{\partial U_i}{\partial x_j}\right) = -\frac{\partial P}{\partial x_i} + \frac{\partial}{\partial x_j}\left(\mu\frac{\partial U_i}{\partial x_j} - \rho\,\overline{u_i'u_j'}\right).
$$ {#eq-rans}
新出现的项$-\rho\,\overline{u_i'u_j'}$是**雷诺应力张量**。
:::

::: proof
平均运算是线性的，且与空间和时间导数可交换。对连续性方程取平均：$\overline{\partial u_i/\partial x_i} = \partial U_i/\partial x_i = 0$，从瞬时方程中减去它，可知$\partial u_i'/\partial x_i = 0$也成立。把对流项写成守恒形式$\partial(u_iu_j)/\partial x_j$（因为$\nabla\cdot\mathbf{u} = 0$，此式成立），并对乘积取平均：
$$
\overline{u_iu_j} = \overline{(U_i + u_i')(U_j + u_j')} = U_iU_j + U_i\overline{u_j'} + U_j\overline{u_i'} + \overline{u_i'u_j'} = U_iU_j + \overline{u_i'u_j'} ,
$$
因为平均值乘以脉动的平均值为零。其他各项都是线性的，直接变为各自的平均值。于是$\rho\,\partial U_i/\partial t + \rho\,\partial(U_iU_j)/\partial x_j + \rho\,\partial\overline{u_i'u_j'}/\partial x_j = -\partial P/\partial x_i + \mu\nabla^2U_i$；把脉动项移到右边，并利用平均连续性方程写出$\partial(U_iU_j)/\partial x_j = U_j\partial U_i/\partial x_j$，即得[[#eq-rans]]。
:::

平均方程看起来与层流方程一样，只是多了一项应力，而这正是全部困难所在：$\overline{u_i'u_j'}$的六个独立分量是新的未知量，而方程的个数（四个）并没有改变。从纳维-斯托克斯方程推导$\overline{u_i'u_j'}$的方程是可能的，但其中含有三阶关联$\overline{u_i'u_j'u_k'}$，而三阶关联的方程又含有四阶关联，如此无穷无尽。这就是**封闭问题**。每个雷诺平均（RANS）模型都是一个封闭假设：用平均量表示雷诺应力的一种方法。

雷诺应力张量的迹给出单位质量的**湍动能**，
$$
k = \tfrac12\,\overline{u_i'u_i'} = \tfrac12\left(\overline{u'^2} + \overline{v'^2} + \overline{w'^2}\right),
$$ {#eq-tke}
它出现在每一个两方程模型中。

## 涡黏性

布西内斯克（Boussinesq，1877）提出，湍流动量传递的表现类似于一种增强的黏性：雷诺应力与平均应变率成正比。

::: definition Boussinesq 涡黏性假设 {#def-boussinesq}
$$
-\rho\,\overline{u_i'u_j'} = \mu_t\left(\frac{\partial U_i}{\partial x_j} + \frac{\partial U_j}{\partial x_i}\right) - \frac{2}{3}\rho k\,\delta_{ij},
$$ {#eq-boussinesq}
其中$\mu_t$（或$\nu_t = \mu_t/\rho$）是**涡黏度**，它是流动的属性，而不是流体的属性。各向同性项$-\tfrac23\rho k\delta_{ij}$使两边的迹相等（在不可压缩流动中应变率张量的迹为零）；它通常被并入一个修正压强之中。
:::

借助[[#eq-boussinesq]]，RANS 方程变成以$\mu + \mu_t$代替$\mu$的层流方程，前面各课的全部方法都可以原封不动地使用。建模任务缩小为求一个标量场$\mu_t$。从量纲上看，$\nu_t$是速度乘以长度，$\nu_t \sim u'\ell$；各种模型的区别在于如何得到这两个尺度。

这一假设有已知的弱点。它使雷诺应力的主轴与平均应变的主轴重合，这在强三维、旋流或快速畸变的流动中是错误的；在简单剪切中它给出相等的正应力，而实验表明$\overline{u'^2} > \overline{w'^2} > \overline{v'^2}$，因此会漏掉方管中的二次流；如果不加特设的修正，它也无法表示流线曲率和旋转的效应。**雷诺应力模型**对全部六个应力分量求解输运方程，从而避开了这一假设，但代价更高，鲁棒性也更差。

### 普朗特混合长度与对数律

普朗特（Prandtl，1925）通过与分子运动类比来估计剪切流中的涡黏度：一团流体沿垂直于平均梯度的方向移动距离$\ell_m$，就携带了速度差$u' \sim \ell_m\,\lvert\mathrm{d}U/\mathrm{d}y\rvert$，所以$\nu_t = \ell_m^2\,\lvert\mathrm{d}U/\mathrm{d}y\rvert$。在壁面附近，涡的尺寸受到到壁面距离的限制，这提示$\ell_m = \kappa y$。

::: proposition 对数壁面律 {#prop-log-law}
假设在壁面附近的某个区域内——离壁面足够远，使黏性应力可以忽略，又离壁面足够近，使总切应力保持其壁面值$\tau_w$——雷诺应力由混合长度$\ell_m = \kappa y$给出。那么平均速度满足
$$
U^+ = \frac{1}{\kappa}\ln y^+ + B,\qquad U^+ = \frac{U}{u_\tau},\quad y^+ = \frac{y\,u_\tau}{\nu},\quad u_\tau = \sqrt{\frac{\tau_w}{\rho}},
$$ {#eq-log-law}
其中$\kappa \approx 0.41$（冯·卡门常数）和$B \approx 5.0$由实验确定。在更靠近壁面、黏性应力占主导的地方，$U^+ = y^+$。
:::

::: proof
在所考虑的区域内，$\tau = \rho\nu_t\,\mathrm{d}U/\mathrm{d}y = \rho\kappa^2y^2(\mathrm{d}U/\mathrm{d}y)^2 = \tau_w$，所以$\kappa y\,\mathrm{d}U/\mathrm{d}y = u_\tau$，即$\mathrm{d}U/\mathrm{d}y = u_\tau/(\kappa y)$。积分得$U = (u_\tau/\kappa)\ln y + C$。仅凭这一区域无法求出常数，因为对数在$y = 0$处发散；它要通过与黏性层的匹配来确定。量纲一致性要求对数的自变量是量纲一的，而在光滑壁面附近唯一可用的长度是$\nu/u_\tau$；写出$C = (u_\tau/\kappa)\ln(u_\tau/\nu) + Bu_\tau$即得[[#eq-log-law]]。在**黏性底层**中，雷诺应力在壁面处为零，$\tau = \mu\,\mathrm{d}U/\mathrm{d}y = \tau_w$，所以$U = \tau_wy/\mu$，即$U^+ = y^+$。（同一定律也可以不借助任何混合长度假设、由量纲分析和重叠区匹配得出，这正是它如此稳健的原因。）
:::

由此得到的结构——**黏性底层**$y^+ \lesssim 5$、**缓冲层**$5 \lesssim y^+ \lesssim 30$、从$y^+ \approx 30$向外延伸到边界层厚度约$0.1$–$0.2$处的**对数层**——在附着边界层、圆管和槽道中具有惊人的普适性。斯波尔丁（Spalding，1961）给出了一个涵盖全部三个区域的单一公式：
$$
y^+ = U^+ + e^{-\kappa B}\left[e^{\kappa U^+} - 1 - \kappa U^+ - \frac{(\kappa U^+)^2}{2} - \frac{(\kappa U^+)^3}{6}\right].
$$ {#eq-spalding}

::: widget plot
f: 10^x; 5.616*x + 5.0
x: -1, 3.5
y: 0, 30
labels: U^+ = y^+; U^+ = \tfrac{1}{0.41}\ln y^+ + 5.0
vlines: 0.699; 1.477
caption: 横轴为$\log_{10} y^+$的壁面律（$-1$到$3.5$对应$y^+ = 0.1$到约$3000$）。黏性底层直线$U^+ = y^+$与对数律都是实测剖面的精确渐近线；虚线标出$y^+ = 5$和$y^+ = 30$，即缓冲层的边缘，在缓冲层中两者都不成立，真实剖面（Spalding 公式，见下一幅图）从一条渐近线弯向另一条。壁面函数假定第一个网格节点位于$y^+ \approx 30$的右侧；低雷诺数壁面处理则把它放在$y^+ \approx 1$，深入黏性底层之中。
:::

::: widget parametric
fx: log10(t + exp(-2.05)*(exp(0.41*t) - 1 - 0.41*t - (0.41*t)^2/2 - (0.41*t)^3/6))
fy: t
t: 0.1, 26
x: -1, 3.5
y: 0, 28
equal: false
caption: 取$\kappa = 0.41$、$B = 5.0$（$e^{-\kappa B} = e^{-2.05}$）的 Spalding 复合壁面律[[#eq-spalding]]，随$U^+$增大而描出：横轴为$\log_{10}y^+$，纵轴为$U^+$。与上一幅图中的两条渐近线比较：曲线在$y^+ \approx 5$以内沿$U^+ = y^+$，穿过缓冲层时弯曲，到$y^+ \approx 30$–$50$时并入对数直线。当第一个单元落在缓冲层中、两条渐近线都不适用时，就用它来计算壁面切应力。
:::

## 两方程模型

混合长度必须针对每种流动分别给定。两方程模型则由两个输运方程计算速度尺度和长度尺度，从而能够表示湍流的历史效应和输运。第一个方程总是关于$k$的；第二个方程关于提供长度尺度的某个量。

::: definition 标准$k$–$\varepsilon$模型 {#def-k-epsilon}
记耗散率为$\varepsilon$，生成项为$P_k = \mu_t S^2$，$S = \sqrt{2S_{ij}S_{ij}}$，$S_{ij} = \tfrac12(\partial U_i/\partial x_j + \partial U_j/\partial x_i)$：
$$
\frac{\partial(\rho k)}{\partial t} + \nabla\cdot(\rho\mathbf{U}k) = \nabla\cdot\left[\left(\mu + \frac{\mu_t}{\sigma_k}\right)\nabla k\right] + P_k - \rho\varepsilon,
$$
$$
\frac{\partial(\rho\varepsilon)}{\partial t} + \nabla\cdot(\rho\mathbf{U}\varepsilon) = \nabla\cdot\left[\left(\mu + \frac{\mu_t}{\sigma_\varepsilon}\right)\nabla\varepsilon\right] + C_{1\varepsilon}\frac{\varepsilon}{k}P_k - C_{2\varepsilon}\rho\frac{\varepsilon^2}{k},
$$
$$
\mu_t = \rho C_\mu\frac{k^2}{\varepsilon},
$$ {#eq-k-epsilon}
采用 Launder 与 Sharma（1974）的常数：$C_\mu = 0.09$，$C_{1\varepsilon} = 1.44$，$C_{2\varepsilon} = 1.92$，$\sigma_k = 1.0$，$\sigma_\varepsilon = 1.3$。
:::

每个方程都是[[computational-fluid-dynamics/convection-diffusion]]中所讨论的那类对流–扩散–源项方程。除了对其输运项采用梯度扩散模型之外，$k$方程是从纳维-斯托克斯方程精确推导出来的；$\varepsilon$方程则基本上是一个具有相同结构的经验构造。涡黏度由量纲得出：取速度尺度$\sqrt k$和长度尺度$k^{3/2}/\varepsilon$，得$\nu_t \propto k^2/\varepsilon$。常数是标定出来的：$C_{2\varepsilon}$来自格栅湍流的衰减，$C_\mu$来自在平衡剪切层中测得的比值$-\overline{u'v'}/k \approx 0.3$（$C_\mu = 0.3^2$），$C_{1\varepsilon}$则用来再现自由剪切流的扩展率和对数律。

$k$–$\varepsilon$模型鲁棒，适用于自由剪切流和弱压强梯度下的附着边界层。它在强应变区域（如驻点，即"驻点异常"）过高地预测$k$，并且在逆压梯度下预测的分离太晚。它的$\varepsilon$方程在壁面处的性态也很差，这就是它要与壁面函数配合使用、或者用阻尼函数加以修正的原因。

**$k$–$\omega$模型**（Wilcox，1988）采用比耗散率$\omega \sim \varepsilon/k$（单位$\mathrm{s^{-1}}$）和$\mu_t = \rho k/\omega$。它的$\omega$方程可以不用阻尼函数而一直积分穿过黏性底层到达壁面，在逆压梯度下表现也更好，但其在自由流区域中的结果对（任意取定的）自由流$\omega$值很敏感。

**Menter 的 SST 模型**（1994）把两者结合起来：一个混合函数在近壁处取$k$–$\omega$，在远离壁面处切换到（以$\omega$改写的）$k$–$\varepsilon$形式，从而消除了对自由流的敏感性；并且对涡黏度加以限制，
$$
\nu_t = \frac{a_1 k}{\max(a_1\omega,\ S F_2)},\qquad a_1 = 0.31,
$$
使得在逆压梯度下切应力服从 Bradshaw 的观察结果$-\overline{u'v'} \approx a_1k$，而不是随应变率增长。正是这一**剪切应力输运**（shear-stress transport）限制器改进了分离的预测。在航空航天和叶轮机械 CFD 的许多领域，SST 是默认选择。一方程的 **Spalart–Allmaras 模型**（1992）对一个修正的涡黏度求解输运方程，是为外流空气动力学设计的，广泛用于机翼和飞机。

::: example 进口处的湍流量 {#ex-inlet}
空气（$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）以$U = 5.0\ \mathrm{m/s}$、湍流强度$I = 5\,\%$进入直径$D = 0.10\ \mathrm{m}$的管道。采用常用的长度尺度估计$\ell = 0.07D$，估算$k$–$\varepsilon$进口边界条件所需的$k$和$\varepsilon$，以及比值$\nu_t/\nu$。
::: solution
对每个方向上$u' = IU$的各向同性脉动，$k = \tfrac32(IU)^2 = 1.5 \times (0.25)^2 = 0.0938\ \mathrm{m^2/s^2}$。采用约定$\varepsilon = C_\mu^{3/4}k^{3/2}/\ell$（它使$\ell$成为与对数律一致的混合长度），并取$\ell = 0.0070\ \mathrm{m}$：
$$
\varepsilon = \frac{0.09^{3/4} \times 0.0938^{3/2}}{0.0070} = \frac{0.1643 \times 0.02871}{0.0070} = 0.674\ \mathrm{m^2/s^3}.
$$
于是$\nu_t = C_\mu k^2/\varepsilon = 0.09 \times 0.00879/0.674 = 1.17\times10^{-3}\ \mathrm{m^2/s}$，约为分子黏度的$78$倍。合理性检验：涡黏度比$10$–$100$是中等湍流内流的典型值；如果进口远在关心区域的上游，精确的进口值关系不大，因为$k$和$\varepsilon$会在几倍直径之内调整到与当地生成相适应——但对于短物体上的自由流湍流，它们关系极大。
:::
:::

## 近壁处理

湍流最陡的梯度位于很薄的壁面层中，近壁网格决定了如何处理它们。

::: algorithm 选择近壁网格并确定其尺寸 {#alg-wall-mesh}
1. 确定壁面处理方式：**壁面函数**（第一个节点在对数层内，$30 \lesssim y^+ \lesssim 300$；由壁面律提供$\tau_w$以及近壁的$k$和$\varepsilon$），或**壁面解析**（低雷诺数）建模（第一个节点在$y^+ \approx 1$，在$y^+ < 30$范围内有$10$–$20$个单元）。对代价敏感的附着流动用壁面函数；对传热、分离、转捩和强压强梯度，要解析壁面。
2. 由关联式估算表面摩擦系数，例如湍流平板$C_f \approx 0.0576\,\mathrm{Re}_x^{-1/5}$（$5\times10^{5} < \mathrm{Re}_x < 10^{7}$），圆管中$C_f = f/4$。
3. 计算$\tau_w = \tfrac12\rho U^2C_f$和$u_\tau = U\sqrt{C_f/2}$。
4. 第一个节点到壁面的距离为$y_P = y^+\nu/u_\tau$；在单元中心型网格上，第一层网格高度为$2y_P$。
5. 计算完成后，检查所有壁面上算得的$y^+$分布，并局部加密或粗化。
:::

::: example 平板上的第一层网格高度 {#ex-first-cell}
空气（$\rho = 1.2\ \mathrm{kg/m^3}$，$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）以$U = 20\ \mathrm{m/s}$流过平板。在$x = 1.0\ \mathrm{m}$处，估算壁面切应力以及以下两种情况的第一个节点距离：(a) $y^+ = 1$的壁面解析模型；(b) $y^+ = 30$的壁面函数。
::: solution
$\mathrm{Re}_x = 20 \times 1.0/1.5\times10^{-5} = 1.33\times10^{6}$，所以$C_f = 0.0576 \times (1.33\times10^{6})^{-0.2} = 3.43\times10^{-3}$。于是$\tau_w = 0.5 \times 1.2 \times 20^2 \times 3.43\times10^{-3} = 0.823\ \mathrm{Pa}$，$u_\tau = 20\sqrt{3.43\times10^{-3}/2} = 0.828\ \mathrm{m/s}$，所以$\nu/u_\tau = 1.81\times10^{-5}\ \mathrm{m}$。

(a) $y_P = 1 \times 1.81\times10^{-5} = 18\ \mu\mathrm{m}$，第一层网格高度约$36\ \mu\mathrm{m}$。
(b) $y_P = 30 \times 1.81\times10^{-5} = 0.54\ \mathrm{mm}$，第一层网格高度约$1.1\ \mathrm{mm}$。

该处边界层厚度约为$0.37x\,\mathrm{Re}_x^{-1/5} = 22\ \mathrm{mm}$，因此壁面函数在边界层内只需寥寥几个单元，而壁面解析大约需要$30$个拉伸单元。合理性检验：$u_\tau/U \approx 0.04$是典型值；几十微米的黏性长度$\nu/u_\tau$说明了为什么壁面解析网格中沿壁面的单元长宽比可达$1000$甚至更大。
:::
:::

::: example 由一个速度读数求摩擦速度 {#ex-utau}
在空气（$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）中，距光滑壁面$y = 5.0\ \mathrm{mm}$的第一个节点上算得速度$U = 10.0\ \mathrm{m/s}$。像壁面函数那样，用$\kappa = 0.41$、$B = 5.0$的对数律求$u_\tau$和$\tau_w$，并确认该节点位于对数层内。
::: solution
对数律关于$u_\tau$是隐式的：求解
$$
g(u_\tau) = u_\tau\left[\frac{1}{0.41}\ln\frac{0.005\,u_\tau}{1.5\times10^{-5}} + 5.0\right] - 10.0 = 0 .
$$
从$u_\tau = 0.5\ \mathrm{m/s}$出发的牛顿法经几步就收敛到$u_\tau = 0.563\ \mathrm{m/s}$。于是$y^+ = 0.005 \times 0.563/1.5\times10^{-5} = 188$——位于对数层内，所以使用该定律是自洽的——取$\rho = 1.2\ \mathrm{kg/m^3}$，$\tau_w = \rho u_\tau^2 = 1.2 \times 0.563^2 = 0.380\ \mathrm{Pa}$。检验：$U^+ = 10.0/0.563 = 17.8$，而$2.439\ln 188 + 5.0 = 17.8$。
:::
:::

::: widget newton
f: x*(ln(0.005*x/1.5e-5)/0.41 + 5.0) - 10
x0: 0.5
x: 0.1, 1.2
caption: 用牛顿法求解上例中关于摩擦速度的对数律（$y = 5\ \mathrm{mm}$处$U = 10\ \mathrm{m/s}$）。该函数光滑，并在根$u_\tau = 0.563\ \mathrm{m/s}$附近近乎线性，所以几步之后就呈二次收敛——这就是壁面函数程序能够在每次迭代中对每个壁面面都这样做的原因。试一个差的初值，如$x_0 = 0.12$：第一步会冲过头，但迭代能恢复过来。
:::

::: warning 用错地方的壁面函数
壁面函数假定第一个节点位于附着的平衡边界层的对数层内。三种常见的误用是：在标准壁面函数下把第一个节点放在黏性底层或缓冲层中（$y^+ < 15$）——此时对数律给出的$\tau_w$和$\varepsilon$错得离谱（如今许多程序提供进行混合的"可缩放"或"增强"壁面处理，但并非全部都有）；在分离或再附流动中使用壁面函数，那里$\tau_w \to 0$，对数律毫无依据；以及为了"提高精度"而加密壁面函数网格，这会把$y^+$推到有效范围以下，使结果**更差**。计算后务必画出每个壁面上的$y^+$，并使网格与壁面处理相匹配。
:::

## 大涡模拟

RANS 对全部湍流尺度建模，DNS 对任何尺度都不建模；介于两者之间的**大涡模拟**（LES）解析大的、含能的涡——它们取决于几何形状并承担大部分输运——而只对小涡建模，小涡更接近普适。方程在空间上用与网格间距相当的滤波宽度$\Delta$进行**滤波**；滤波后的方程中含有一项必须建模的**亚格子应力**。经典的亚格子模型是 Smagorinsky 模型（1963），它是由滤波宽度和已解析应变率构成的涡黏度：
$$
\nu_{sgs} = (C_s\Delta)^2\,\lvert\bar S\rvert,\qquad \lvert\bar S\rvert = \sqrt{2\bar S_{ij}\bar S_{ij}},
$$ {#eq-smagorinsky}
其中$C_s \approx 0.1$–$0.2$，随流动而异。Germano 及其合作者的动态方法（1991）由已解析的流场本身在当地计算$C_s$。例如，取$\Delta = 1.0\ \mathrm{mm}$、$C_s = 0.10$、$\lvert\bar S\rvert = 500\ \mathrm{s^{-1}}$，得$\nu_{sgs} = (10^{-4})^2 \times 500 = 5.0\times10^{-6}\ \mathrm{m^2/s}$——为空气分子黏度的三分之一；大部分输运由已解析的涡承担。

LES 总是非定常和三维的，需要低耗散的数值格式（[[computational-fluid-dynamics/convection-diffusion]]）和长的平均时间，并且在壁面附近变得非常昂贵，因为那里重要的涡按$\nu/u_\tau$标度。**RANS–LES 混合**方法，如分离涡模拟（DES），在附着边界层中用 RANS、在分离区中用 LES，是钝体尾迹这类大规模分离流动的实用选择。

| 方法 | 解析的内容 | 代价标度（近似） | 典型用途 |
|---|---|---|---|
| RANS（$k$–$\varepsilon$、SST、S–A） | 仅平均流动 | 对 Re 依赖较弱（壁面函数网格） | 设计，定常及缓慢非定常流动 |
| RANS–LES 混合（DES） | 远离壁面的大涡 | 中等 | 钝体，大规模分离 |
| 壁面模化 LES | 大涡，壁面用模型 | 大致按 Re 增长 | 射流，燃烧室，气动声学 |
| 壁面解析 LES | 大涡，包括近壁条带 | 按$\mathrm{Re}^{13/7}$增长（Choi 与 Moin 的估计） | 研究，模型开发 |
| DNS | 全部尺度 | $\sim\mathrm{Re}^3$ | 中等 Re 下的研究 |

::: quiz
采用标准$k$–$\varepsilon$模型和壁面函数的定常 RANS 计算预测半角为$10^\circ$的扩压器中的流动保持附着，而实验显示发生了分离。哪一项改动最有可能改进预测？
- [ ] 把壁面处的网格加密到$y^+ \approx 1$，同时保留标准壁面函数。
- [x] 改用壁面解析网格（$y^+ \approx 1$）上的 SST $k$–$\omega$模型，其切应力限制器和近壁形式对逆压梯度的响应更好。
- [ ] 采用一阶迎风格式使解更鲁棒。
- [ ] 提高进口的湍流强度。
::: solution
标准$k$–$\varepsilon$在逆压梯度下过高地预测切应力，抵制分离；而壁面函数假定存在平衡对数层，在分离附近这样的对数层并不存在。壁面解析的 SST 正是为这种情况设计的。用标准壁面函数加密网格违反了其有效范围；迎风格式引入数值扩散，进一步推迟分离；更强的进口湍流同样推迟分离。
:::
:::

::: history
布西内斯克（Joseph Boussinesq）于 1877 年提出了涡黏性概念，雷诺（Osborne Reynolds）在其 1895 年发表于《皇家学会哲学汇刊》（*Philosophical Transactions of the Royal Society*）的论文中提出了把运动分解为平均运动与脉动运动的方法。普朗特（Ludwig Prandtl）于 1925 年提出了混合长度（《应用数学与力学杂志》（*Zeitschrift für angewandte Mathematik und Mechanik*）），柯尔莫哥洛夫（Andrei Kolmogorov）于 1941 年发表了他的小尺度理论。斯马戈林斯基（Joseph Smagorinsky）1963 年的亚格子模型是为大气环流计算而发展的。标准两方程模型由琼斯（W. P. Jones）和朗德（Brian Launder）提出（1972，《国际传热传质杂志》（*International Journal of Heat and Mass Transfer*）），采用朗德与夏尔马（B. I. Sharma）（1974）的常数，以及朗德与斯波尔丁（D. B. Spalding）的壁面函数（1974，《应用力学与工程中的计算机方法》（*Computer Methods in Applied Mechanics and Engineering*））。威尔科克斯（David Wilcox）的$k$–$\omega$模型发表于 1988 年（*AIAA Journal*），斯帕拉特（Philippe Spalart）与阿尔马拉斯（Steven Allmaras）的一方程模型发表于 1992 年（AIAA 论文 92-0439），门特（Florian Menter）的 SST 模型发表于 1994 年（*AIAA Journal*）。金（John Kim）、莫因（Parviz Moin）和莫泽（Robert Moser）完成的第一个湍流槽道流 DNS（1987，《流体力学杂志》（*Journal of Fluid Mechanics*））提供了近壁数据，此后许多此类模型都以这些数据为检验基准。
:::

::: summary
- 湍流尺度跨越$\ell/\eta \sim \mathrm{Re}^{3/4}$；DNS 需要$\sim\mathrm{Re}^{9/4}$个点和$\sim\mathrm{Re}^3$的计算量，所以工程 CFD 对湍流建模。
- 雷诺平均给出含有未知雷诺应力$-\rho\overline{u_i'u_j'}$的 RANS 方程：这就是封闭问题。
- Boussinesq 假设：雷诺应力$= \mu_t \times$平均应变$- \tfrac23\rho k\delta_{ij}$；于是 RANS 方程看起来就是以$\mu + \mu_t$为黏度的层流方程。
- 近壁处：$y^+ \lesssim 5$时$U^+ = y^+$，$y^+ \gtrsim 30$时$U^+ = \kappa^{-1}\ln y^+ + B$（$\kappa = 0.41$，$B \approx 5.0$）；Spalding 公式同时涵盖两者。
- $k$–$\varepsilon$：$\mu_t = \rho C_\mu k^2/\varepsilon$，对自由剪切流鲁棒；$k$–$\omega$能更好地处理壁面和逆压梯度；SST 把两者混合并限制$\nu_t$；S–A 是一方程空气动力学模型。
- 由$C_f$关联式确定近壁网格尺寸：$y_P = y^+\nu/u_\tau$；壁面解析模型取$y^+ \approx 1$，壁面函数取$30$–$300$；事后务必检查$y^+$。
- LES 解析大涡、对小涡建模（$\nu_{sgs} = (C_s\Delta)^2\lvert\bar S\rvert$）；RANS–LES 混合方法用于大规模分离流动。
:::

## 习题

::: exercise 柯尔莫哥洛夫长度 {level=1 check="2.41e-4"}
在湍流空气流动（$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）中，耗散率为$\varepsilon = 1.0\ \mathrm{W/kg}$。计算柯尔莫哥洛夫长度。（输入$\eta$，单位为米，保留三位有效数字。）
::: solution
$\eta = (\nu^3/\varepsilon)^{1/4} = (3.375\times10^{-15})^{1/4} = 2.41\times10^{-4}\ \mathrm{m}$，约四分之一毫米。
:::
:::

::: exercise 一个壁面单位 {level=1 check="3.333"}
空气（$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）中某壁面上的摩擦速度为$u_\tau = 0.50\ \mathrm{m/s}$。$y = 0.10\ \mathrm{mm}$处的$y^+$是多少？该点位于哪一层？（输入$y^+$，保留三位小数。）
::: solution
$y^+ = yu_\tau/\nu = 10^{-4} \times 0.50/1.5\times10^{-5} = 3.33$：位于黏性底层，那里$U^+ \approx y^+$，所以$U \approx 3.33 \times 0.50 = 1.7\ \mathrm{m/s}$。
:::
:::

::: exercise 由$k$和$\varepsilon$求涡黏度 {level=1 check="0.009"}
在$k$–$\varepsilon$解的某一点上，$k = 1.0\ \mathrm{m^2/s^2}$，$\varepsilon = 10\ \mathrm{m^2/s^3}$。计算运动涡黏度。（输入$\nu_t$，单位为$\mathrm{m^2/s}$。）
::: solution
$\nu_t = C_\mu k^2/\varepsilon = 0.09 \times 1.0/10 = 9.0\times10^{-3}\ \mathrm{m^2/s}$，为空气分子黏度的$600$倍。
:::
:::

::: exercise 对数层中的速度 {level=1 check="16.23"}
取$\kappa = 0.41$和$B = 5.0$，求$y^+ = 100$处的$U^+$。（输入$U^+$，保留两位小数。）
::: solution
$U^+ = \ln(100)/0.41 + 5.0 = 4.605/0.41 + 5.0 = 11.23 + 5.0 = 16.23$。
:::
:::

::: exercise 进口湍动能 {level=2 check="0.06"}
$U = 20\ \mathrm{m/s}$的风洞气流湍流强度为$1.0\,\%$。假定脉动各向同性，计算$k$。（输入$k$，单位为$\mathrm{m^2/s^2}$。）
::: solution
每个方向上$u' = 0.01 \times 20 = 0.20\ \mathrm{m/s}$，所以$k = \tfrac32 u'^2 = 1.5 \times 0.04 = 0.060\ \mathrm{m^2/s^2}$。
:::
:::

::: exercise DNS 代价的增长 {level=2 check="4.757"}
按$\mathrm{Re}^{9/4}$估计，雷诺数加倍时 DNS 网格点数增大到多少倍？总代价大约增大到多少倍？（输入网格点数的倍数，保留三位小数。）
::: solution
网格点数为原来的$2^{9/4} = 4.76$倍。时间步数按$\mathrm{Re}^{3/4}$增长，$2^{3/4} = 1.68$，所以总代价按$2^3 = 8$增长。
:::
:::

::: exercise 槽道中的混合长度 {level=3}
在半高为$h$的充分发展槽道流中，总切应力线性变化，$\tau = \tau_w(1 - y/h)$。(a) 利用$\ell_m = \kappa y$并忽略黏性应力，推导$\mathrm{d}U/\mathrm{d}y$，并证明它在近壁处化为对数律。(b) 解释为什么在远离壁面处必须限制混合长度（常见的选择是$\ell_m = \min(\kappa y, 0.09\,h)$），以及$\mathrm{d}U/\mathrm{d}y$在中心线上如何变化。
::: solution
(a) 由$\rho\ell_m^2(\mathrm{d}U/\mathrm{d}y)^2 = \tau_w(1 - y/h)$得$\mathrm{d}U/\mathrm{d}y = \dfrac{u_\tau\sqrt{1 - y/h}}{\kappa y}$。当$y \ll h$时，$\sqrt{1 - y/h} \approx 1$，$\mathrm{d}U/\mathrm{d}y = u_\tau/(\kappa y)$，积分即得对数律。(b) 远离壁面处，涡的尺寸由槽道决定，而不由$y$决定；若不加限制，$\ell_m = \kappa y$会超过半高。加以限制后，$\mathrm{d}U/\mathrm{d}y = u_\tau\sqrt{1 - y/h}/\ell_{\max}$，它在中心线$y = h$处（那里切应力为零）降为零——给出与观测一致的平顶剖面。混合长度模型还必然预测中心线上$\nu_t \to 0$，这不符合物理（那里仍有湍流），这是输运方程模型取代它的原因之一。
:::
:::

::: exercise 选择湍流处理方法 {level=3}
对下列每种情况，推荐一种湍流建模方法和近壁处理方式，并说明你要检查什么：(a) 管道设计中长直管的压降；(b) 带气膜冷却孔的涡轮叶片的传热；(c) 为确定风荷载，高层建筑后方的非定常尾迹和涡脱落；(d) 接近最大升力时高升力机翼上的分离点。
::: solution
(a) 采用壁面函数的定常 RANS（$k$–$\varepsilon$或 SST），甚至用关联式即可；对照穆迪图检查预测的摩擦因子，并检查$y^+$处于壁面函数范围内。(b) 至少采用壁面解析的 RANS（SST 或某种$k$–$\omega$变体，$y^+ \approx 1$），因为传热取决于黏性底层；涡黏性模型难以处理横流中的射流，所以详细设计采用 LES；检查努塞尔数的网格敏感性，并与实测的气膜冷却效率比较。(c) 非定常：DES 或 LES，因为 RANS 无法表示宽频的涡脱落和峰值载荷；检查斯特劳哈尔数和频谱、时间步长以及平均时长。(d) $y^+ \approx 1$的 SST 或 Spalart–Allmaras 模型，可能还需加上转捩模型；RANS 对最大升力的预测并不确定，所以要比较不同模型、加密网格，并对照相似翼型的风洞数据进行确认。
:::
:::
