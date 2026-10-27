扩散容易离散，因为它是一种温和的物理过程：它把事物均匀地向各个方向扩展，而同样均等地看向各个方向的中心差分恰好完美地反映了它。对流则不同。流动的流体把热量、动量和组分向**下游**携带；一点处发生的事情压倒性地取决于其上游的情况。一个对上游和下游邻点同等加权的格式——即自然的中心差分——忽略了这种不对称性，当在一个单元的尺度上对流压倒扩散时，它会产生剧烈的、非物理的振荡。相反的补救办法，即只看上游，是鲁棒的，但会用数值扩散抹平每一个陡峭的特征，这在[[computational-fluid-dynamics/stability-accuracy#prop-modified]]中已经看到。寻找既精确又有界的格式，占据了 CFD 五十年的时间，这也是本课的主题。

我们把[[computational-fluid-dynamics/finite-volume-diffusion]]中的有限体积法推广到定常**对流-扩散方程**，指出网格佩克莱数是起控制作用的参数，分析中心格式和迎风格式及其失效模式，然后构造实践中使用的高阶格式：QUICK 格式，以及现代程序中默认采用的带通量限制器的 TVD 格式。全课中速度场视为已知；如何求得速度场是[[computational-fluid-dynamics/pressure-velocity]]的主题。

## 模型问题及其精确解

在密度$\rho$和速度$u$为常数的流动中，标量$\phi$的定常一维对流与扩散满足
$$
\frac{\mathrm{d}}{\mathrm{d}x}(\rho u\phi) = \frac{\mathrm{d}}{\mathrm{d}x}\left(\Gamma\frac{\mathrm{d}\phi}{\mathrm{d}x}\right),
\qquad \frac{\mathrm{d}(\rho u)}{\mathrm{d}x} = 0 .
$$ {#eq-cd-1d}
第二个方程是连续性方程：在一维定常流动中，质量流量$\rho u$为常数。

::: proposition 定常一维对流-扩散的精确解 {#prop-exact-cd}
在$\phi(0) = \phi_0$、$\phi(L) = \phi_L$且$\rho u$和$\Gamma$为常数时，[[#eq-cd-1d]]的解为
$$
\frac{\phi(x) - \phi_0}{\phi_L - \phi_0} = \frac{\exp(\mathrm{Pe}\,x/L) - 1}{\exp(\mathrm{Pe}) - 1},
\qquad \mathrm{Pe} = \frac{\rho u L}{\Gamma}.
$$ {#eq-exact-cd}
:::

::: proof
系数为常数时方程为$\rho u\,\phi' = \Gamma\phi''$。积分一次得$\Gamma\phi' - \rho u\phi = \text{常数}$：总通量（扩散加对流）是均匀的，在无源项的一维定常问题中理应如此。齐次线性常微分方程$\phi'' - (\mathrm{Pe}/L)\phi' = 0$的解为$1$和$\exp(\mathrm{Pe}\,x/L)$，故$\phi = A + B\exp(\mathrm{Pe}\,x/L)$。用两个边界值确定常数即得[[#eq-exact-cd]]。当$\mathrm{Pe} \to 0$时，展开指数函数得$\phi \to \phi_0 + (\phi_L - \phi_0)x/L$，即线性的导热分布。
:::

当$\mathrm{Pe}$为很大的正数时，分布几乎一直保持在上游值$\phi_0$，然后在出口处一个厚度约为$L/\mathrm{Pe} = \Gamma/(\rho u)$的薄层中降到$\phi_L$。格式必须应对的正是这个薄层。

::: widget plot
f: 1 - (exp(P*x) - 1)/(exp(P) - 1)
x: 0, 1
y: 0, 1.1
sliders: P=1:0.1:50:0.1
caption: 入口（$x/L = 0$）处$\phi = 1$、出口（$x/L = 1$）处$\phi = 0$之间定常对流-扩散的精确解，整体佩克莱数$\mathrm{Pe} = \rho uL/\Gamma$由滑块设定。$\mathrm{Pe}$较小时扩散占优，分布接近纯导热的直线。随着$\mathrm{Pe}$增大，对流把入口值扫向下游，变化被挤压到厚度约为$L/\mathrm{Pe}$的出口层中。用五个宽为$0.2L$的单元时，$\mathrm{Pe}$能有多大，才不至于使这一薄层比一个单元还薄？
:::

## 有限体积离散

在$P$周围的控制体上积分[[#eq-cd-1d]]。记单位面积的面质量流量为$F = \rho u$，单位面积的扩散传导为$D = \Gamma/\delta x$，
$$
F_e\phi_e - F_w\phi_w = D_e(\phi_E - \phi_P) - D_w(\phi_P - \phi_W).
$$ {#eq-cd-integrated}
扩散一侧与之前完全相同。对流一侧需要**面上**的标量值$\phi_e$和$\phi_w$，但未知量位于节点上。由节点值给出面值的规则就是**对流格式**，它是本课的全部主题。

::: definition 网格佩克莱数 {#def-cell-peclet}
面上的**网格佩克莱数**是一个节点间距上对流强度与扩散强度之比：
$$
P_\Delta = \frac{F}{D} = \frac{\rho u\,\delta x}{\Gamma}.
$$
对于传热问题，$\Gamma = k/c_p$，$P_\Delta = u\,\delta x/\alpha$；对于动量，$\Gamma = \mu$，$P_\Delta$即网格雷诺数$u\,\delta x/\nu$。
:::

在分析各种格式之前，先列出好的格式应具备的性质（Versteeg 和 Malalasekera 的清单）。

::: definition 守恒性、有界性与输运性 {#def-scheme-properties}
- 若通过每个面的通量由两个单元共享的同一表达式计算，从而对所有单元求和时可以逐项相消，则称格式是**守恒的**。
- 若在无源项时每个计算出的$\phi$都位于边界值之间，则称格式是**有界的**；一个充分条件（斯卡伯勒（Scarborough）判据加上正性）是：所有系数$a_{nb}$为正，且在所有节点上$\sum\lvert a_{nb}\rvert/\lvert a_P\rvert \le 1$，在一个或多个节点上严格不等式成立。
- 若格式能识别流动方向，则称它是**输运性的**：在$P_\Delta$很大时，一个节点应主要受其上游邻点的影响。
:::

## 中心差分与摆动

均匀网格上的自然选择是两个相邻节点的平均值，$\phi_e = \tfrac12(\phi_P + \phi_E)$，$\phi_w = \tfrac12(\phi_W + \phi_P)$。代入[[#eq-cd-integrated]]并利用连续性（$F_e = F_w = F$），
$$
a_P\phi_P = a_W\phi_W + a_E\phi_E,\qquad a_W = D + \frac{F}{2},\quad a_E = D - \frac{F}{2},\quad a_P = a_W + a_E .
$$ {#eq-central}
该格式具有二阶精度，且是守恒的。但看看$a_E$：只要$F > 2D$，即$P_\Delta > 2$，它就是负的。

::: proposition $P_\Delta > 2$时中心格式发生振荡 {#prop-central-wiggles}
在$F$和$D$为常数的均匀网格上，中心差分方程[[#eq-central]]在内部节点上的每个解都具有如下形式
$$
\phi_i = A + B\,r^i,\qquad r = \frac{1 + P_\Delta/2}{1 - P_\Delta/2}.
$$
当$P_\Delta < 2$时，$r > 1$，离散解是单调的，模仿了[[#eq-exact-cd]]中的指数函数；当$P_\Delta > 2$时，$r < 0$，解在相邻节点间交替改变符号。
:::

::: proof
把$\phi_i = r^i$代入$(a_W + a_E)\phi_i = a_W\phi_{i-1} + a_E\phi_{i+1}$并除以$r^{i-1}$：$a_E r^2 - (a_W + a_E)r + a_W = 0$，它可分解为$(r - 1)(a_E r - a_W) = 0$。根为$r = 1$和$r = a_W/a_E = (D + F/2)/(D - F/2) = (1 + P_\Delta/2)/(1 - P_\Delta/2)$。线性递推的通解是组合$A + Br^i$。若$P_\Delta > 2$，分母为负，$r < 0$，于是$r^i$交替变号。（在节点上取样的精确解为$A + B\left(e^{P_\Delta}\right)^i$；由于$e^{P_\Delta} = 1 + P_\Delta + \dots$，对于小的$P_\Delta$，中心格式的$r$与之吻合到$O(P_\Delta^3)$。）
:::

这些振荡不是时间上的不稳定性——这里根本没有时间——而是有界性的丧失：负系数把节点值**推离**其下游邻点。从物理上说，中心差分让下游信息与上游信息同等强烈地影响一个节点，而当对流占主导时这是错误的。

::: example 五个单元上的中心格式与迎风格式 {#ex-five-cells}
标量沿长$L = 1.0\ \mathrm{m}$的管道被携带，$\rho = 1.0\ \mathrm{kg/m^3}$，$\Gamma = 0.10\ \mathrm{kg\,m^{-1}\,s^{-1}}$，$x = 0$处$\phi = 1$，$x = L$处$\phi = 0$。用五个控制体（$\delta x = 0.20\ \mathrm{m}$），对 (a) $u = 0.2\ \mathrm{m/s}$和 (b) $u = 3.0\ \mathrm{m/s}$用中心差分求解，并与精确解比较。
::: solution
$D = \Gamma/\delta x = 0.50\ \mathrm{kg\,m^{-2}\,s^{-1}}$。边界面距节点半个单元，因此其扩散传导为$2D$，面值等于边界值。内部系数按[[#eq-central]]计算；在节点 1，$a_W = 0$，边界贡献$S_P = -(2D + F)$，$S_u = (2D + F)\phi_0$；在节点 5，$a_E = 0$，$S_P = -(2D - F)$，$S_u = (2D - F)\phi_L$。

(a) $F = 0.2$，$P_\Delta = 0.4$：$a_W = 0.6$，$a_E = 0.4$，全部为正。解及精确值（$\mathrm{Pe} = 2$）：

| $x$ / m | 0.1 | 0.3 | 0.5 | 0.7 | 0.9 |
|---|---|---|---|---|---|
| 中心差分 | 0.9697 | 0.8787 | 0.7422 | 0.5374 | 0.2303 |
| 精确解 | 0.9653 | 0.8713 | 0.7311 | 0.5218 | 0.2096 |

吻合良好（最大误差$0.021$）。

(b) $F = 3.0$，$P_\Delta = 6$：$a_W = 2.0$，$a_E = 0.5 - 1.5 = -1.0$。解为
$$
\phi = (1.091,\ 0.727,\ 1.455,\ 0.000,\ 2.909),
$$
而精确解为$(1.000, 1.000, 1.000, 0.9999, 0.950)$（$\mathrm{Pe} = 30$）。这些值超出了两个边界值并交替变化——恰好是$r = (1 + 3)/(1 - 3) = -2$所预测的行为。合理性检查：出口层厚度为$\Gamma/(\rho u) = 0.033\ \mathrm{m}$，只有一个单元的六分之一；在这套网格上任何格式都无法分辨它，但好的格式至少不应凭空造出$[0, 1]$之外的值。
:::
:::

显而易见的补救办法是加密网格，直到处处$P_\Delta < 2$。对于上例，这意味着$\delta x < 2\Gamma/(\rho u) = 0.067\ \mathrm{m}$，即需要超过$15$个单元。对于实际流动，这通常是不可能的：$10\ \mathrm{m/s}$的空气（$\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$）需要整个计算域中的单元都小于$3\ \mu\mathrm{m}$。

## 迎风差分

**一阶迎风**格式从上游一侧的节点取面值：若$F_e > 0$，则$\phi_e = \phi_P$；若$F_e < 0$，则$\phi_e = \phi_E$。写成对两种流动方向都适用的紧凑形式，
$$
a_W = D_w + \max(F_w, 0),\qquad a_E = D_e + \max(-F_e, 0),\qquad a_P = a_W + a_E + (F_e - F_w).
$$ {#eq-upwind}
对任何$P_\Delta$，每个系数都为正，且由连续性$F_e = F_w$，$a_P = a_W + a_E$：该格式无条件有界且具有输运性。其代价是精度：面值是一阶近似，上一课的修正方程分析在此适用——在一维定常流动中，迎风格式增加了一个**假（数值）扩散**$\Gamma_{\text{num}} = \tfrac12\rho u\,\delta x$，因此有效扩散系数为$\Gamma(1 + P_\Delta/2)$。

::: example 迎风格式与网格加密 {#ex-upwind-refine}
用迎风格式求解[[#ex-five-cells]]的情形 (b)（$u = 3.0\ \mathrm{m/s}$，五个单元），然后比较中心差分和迎风差分在$10$、$20$、$40$和$80$个单元上的最大节点误差。
::: solution
$F = 3.0$，$D = 0.5$：内部$a_W = D + F = 3.5$，$a_E = D = 0.5$，$a_P = 4.0$；节点 1 有$a_W = 0$，$S_P = -(2D + F) = -4$，$S_u = 4\phi_0$；节点 5 有$a_E = 0$，$S_P = -2D = -1$，$S_u = 2D\phi_L = 0$。所有系数都为正。解为
$$
\phi = (0.9999,\ 0.9993,\ 0.9949,\ 0.9643,\ 0.7500),
$$
它有界且定性正确，但出口层被摊开到两个单元上：有效扩散系数为$\Gamma(1 + P_\Delta/2) = 4\Gamma$。网格加密时的最大节点误差为

| 单元数 | 10 | 20 | 40 | 80 |
|---|---|---|---|---|
| $P_\Delta$ | 3 | 1.5 | 0.75 | 0.375 |
| 中心差分 | 0.72（振荡） | 0.22 | 0.062 | 0.017 |
| 迎风 | 0.18 | 0.12 | 0.091 | 0.055 |

一旦$P_\Delta < 2$，单元尺寸每减半一次，中心差分的误差约缩小为原来的$1/3.6$（二阶，趋近于渐近因子$4$），而迎风格式的误差缩小不到一半：一阶且常数很大。合理性检查：在$10$个单元时迎风格式的答案更好，在$40$个单元及以上时中心差分更好——哪个格式“更好”取决于网格，而下面的有界高阶格式旨在兼得二者之长。
:::
:::

::: warning 横越流动方向的假扩散最为严重
在二维和三维中，迎风格式的危害远大于一维，因为该格式在每个网格方向上分别应用其一维迎风法则。当流动斜穿网格线时，平行于流动的陡峭锋面会被一种**横流假扩散**向侧向抹平，而这在一维中并不存在。De Vahl Davis 和 Mallinson（1976）对与$x$轴成$\theta$角的均匀流动在$\Delta x \times \Delta y$网格上的这一假扩散给出了估计
$$
\Gamma_{\text{false}} = \frac{\rho U\,\Delta x\,\Delta y\,\sin 2\theta}{4\left(\Delta y\sin^3\theta + \Delta x\cos^3\theta\right)},
$$
它在$\theta = 45^\circ$附近最大，对于与网格对齐的流动为零。这解释了为什么与主流方向对齐的六面体网格比相同单元尺寸的四面体网格给出锐利得多的结果，也解释了为什么“一阶迎风”的结果永远不应作为最终结果报告。
:::

### 混合格式、乘方格式与指数格式

由于一维精确解[[#eq-exact-cd]]已知，可以构造一个对一维定常问题精确的格式：**指数格式**，其中$a_E = F/(\exp(P_\Delta) - 1)$，$a_W = a_E\exp(P_\Delta)$（对常系数情形）。指数运算代价高，因此斯波尔丁的**混合格式**（1972）对其进行分段近似：$\lvert P_\Delta\rvert < 2$时采用中心差分，$\lvert P_\Delta\rvert \ge 2$时采用迎风并关闭扩散：
$$
a_E = \max\!\left[-F_e,\ D_e - \frac{F_e}{2},\ 0\right],\qquad a_W = \max\!\left[F_w,\ D_w + \frac{F_w}{2},\ 0\right].
$$
帕坦卡的**乘方格式**（1980）用五次多项式更紧密地拟合指数曲线，只在$\lvert P_\Delta\rvert > 10$时才去掉扩散。这些格式是有界的，对于类一维流动比普通迎风格式更好，但在$P_\Delta$很高的多维流动中，它们退化为一阶迎风格式，带有全部的假扩散。

## 高阶格式：QUICK

要在保持上游偏向的同时提高精度，就要使用更多的上游信息。Leonard 的 **QUICK**（对流运动的二次迎风插值，Quadratic Upstream Interpolation for Convective Kinetics）格式通过两个上游节点和一个下游节点拟合一条抛物线，并在面上取值。

::: proposition QUICK 面值 {#prop-quick}
在均匀网格上、流动沿$+x$方向时，过$\phi_W$、$\phi_P$、$\phi_E$的抛物线在$P$与$E$中点处的面$e$上取值为
$$
\phi_e = \frac{6}{8}\phi_P + \frac{3}{8}\phi_E - \frac{1}{8}\phi_W .
$$ {#eq-quick}
:::

::: proof
把$P$置于$\xi = 0$，$W$置于$\xi = -1$，$E$置于$\xi = 1$（以$\delta x$为单位），并把抛物线写成$\phi(\xi) = \phi_P + b\xi + c\xi^2$。匹配$W$和$E$：$\phi_E = \phi_P + b + c$，$\phi_W = \phi_P - b + c$，故$b = \tfrac12(\phi_E - \phi_W)$，$c = \tfrac12(\phi_E + \phi_W) - \phi_P$。在面上，$\xi = \tfrac12$：
$$
\phi_e = \phi_P + \tfrac14(\phi_E - \phi_W) + \tfrac18(\phi_E + \phi_W) - \tfrac14\phi_P = \tfrac34\phi_P + \tfrac38\phi_E - \tfrac18\phi_W .
$$
对于相反的流动方向，模板向下游移动一个节点（$P$、$E$、$EE$）。
:::

面插值具有三阶精度；由此得到的对流通量有限体积格式在均匀网格上形式上是三阶的（在多维中计入扩散项和中点通量积分后，整体为二阶）。它的数值扩散比迎风格式小得多。但[[#eq-quick]]中$\phi_W$的系数为负，因此 QUICK 不是无条件有界的：它在陡峭梯度附近产生小的过冲和下冲，比中心差分小，但足以使湍流量或质量分数变成负值。实践中它通过**延迟修正**实现：迎风部分进入矩阵（保持系数为正，使线性求解器正常工作），QUICK 面值与迎风面值之差则用最新迭代值显式地加入源项。

::: example QUICK 面值及其过冲 {#ex-quick}
流动沿$+x$方向。(a) 当$\phi_W = 1$，$\phi_P = 2$，$\phi_E = 4$时，分别用迎风、中心和 QUICK 计算$\phi_e$。(b) 对阶跃$\phi_W = 0$，$\phi_P = 0$，$\phi_E = 1$，以及$\phi_W = 0$，$\phi_P = 1$，$\phi_E = 1$重复计算。
::: solution
(a) 迎风：$\phi_e = \phi_P = 2$。中心：$(2 + 4)/2 = 3$。QUICK：$\tfrac68(2) + \tfrac38(4) - \tfrac18(1) = 1.5 + 1.5 - 0.125 = 2.875$。对于这种平滑弯曲的数据，QUICK 位于二者之间，更接近中心值，并带有曲率修正。

(b) 对于$(0, 0, 1)$：QUICK 给出$\tfrac38 = 0.375$——在$0$和$1$之间，可以接受。对于$(0, 1, 1)$：QUICK 给出$\tfrac68 + \tfrac38 = 1.125$，**高于**两个相邻值：在阶跃顶部产生了跳跃量$12.5\,\%$的过冲。合理性检查：过$(0, 1, 1)$的抛物线在最后两点之间必然升到$1$以上，因此过冲是二次插值的性质，而不是程序错误。
:::
:::

## 有界高阶格式：TVD 与通量限制器

是否存在一种既有界（保单调）又优于一阶的线性格式？戈杜诺夫定理给出了否定的回答。

::: theorem 戈杜诺夫阶数障碍 {#thm-godunov}
保单调——即决不会由单调数据产生新极值——的对流方程线性数值格式，至多只有一阶精度。
:::

其证明考察线性单调格式所必须具有的系数，并表明这些系数无法满足二阶相容性条件，见 Hirsch 和 LeVeque 的著作。出路是使格式成为**非线性的**：让格式本身依赖于解，在解光滑处加入高阶修正，在极值和陡峭梯度附近关闭这些修正。哈滕（Harten）的**总变差递减**（TVD）框架使这一点精确化：若总变差$\sum_i\lvert\phi_{i+1} - \phi_i\rvert$从不增加，则格式是 TVD 的，这就排除了新摆动的产生。

::: definition 通量限制器 {#def-limiter}
对于沿$+x$方向的流动，把面值写成迎风值加上一个受限的修正，
$$
\phi_e = \phi_P + \frac{1}{2}\,\psi(r)\,(\phi_E - \phi_P),\qquad r = \frac{\phi_P - \phi_W}{\phi_E - \phi_P},
$$ {#eq-limiter}
其中$r$是上游梯度与下游梯度之比，$\psi(r) \ge 0$是**限制器函数**。$\psi = 0$给出迎风格式，$\psi = 1$给出中心差分，$\psi = r$给出二阶线性迎风格式。常用的限制器有：

| 限制器 | $r > 0$时的$\psi(r)$（$r \le 0$时全部为$0$） |
|---|---|
| minmod | $\min(r, 1)$ |
| van Leer | $\dfrac{r + \lvert r\rvert}{1 + r}$ |
| van Albada | $\dfrac{r + r^2}{1 + r^2}$ |
| superbee | $\max\left[\min(2r, 1),\ \min(r, 2)\right]$ |
:::

比值$r$是一个光滑性传感器。在光滑的单调区域$r \approx 1$，每个限制器都给出$\psi(1) = 1$，即二阶精度。在局部极值处，两个梯度符号相反，$r < 0$，$\psi = 0$：格式恰好在可能开始产生摆动的地方降为迎风格式。Sweby（1984）证明，若$\psi(r)$位于区域$0 \le \psi \le \min(2r, 2)$内，这类限制格式就是 TVD 的；若此外还有$\psi(1) = 1$且$\psi$介于$r$与$1$之间，则它是二阶的——minmod 构成这一二阶区域的下边界，superbee 构成上边界。minmod 是 TVD 限制器中扩散性最强的，superbee 是压缩性最强的（它使锋面变陡，但往往把光滑的峰削成方形）；van Leer 和 van Albada 是光滑的折中，而可微的限制器有助于定常迭代的收敛。

::: widget plot
f: max(0, min(x, 1)); (x + abs(x))/(1 + abs(x)); max(0, (x + x^2)/(1 + x^2)); max(0, max(min(2*x, 1), min(x, 2)))
x: -0.5, 3
y: 0, 2.2
labels: \text{minmod}; \text{van Leer}; \text{van Albada}; \text{superbee}
points: 1, 1
caption: 限制器函数$\psi(r)$随梯度比$r$的变化。所有曲线都经过$(1, 1)$，即二阶精度的点；在$r \le 0$处全部为零，那里解有局部极值，格式退回迎风格式。minmod 和 superbee 从下方和上方界定了 Sweby 的二阶 TVD 区域。比较$r = 3$（梯度变陡）处的$\psi$：minmod 保持中心权重$1$，superbee 将其加倍为$2$，这就是 superbee 使锋面变陡、并可能使光滑峰看起来呈方形的原因。
:::

::: example 受限的面值 {#ex-limiter}
流动沿$+x$方向，$\phi_W = 1$，$\phi_P = 2$，$\phi_E = 4$（同[[#ex-quick]]）。计算$r$以及用 minmod 和 van Leer 限制器得到的面值$\phi_e$。对$\phi_W = 3$，$\phi_P = 2$，$\phi_E = 4$重复计算。
::: solution
第一种情形：$r = (2 - 1)/(4 - 2) = 0.5$。minmod：$\psi = 0.5$，$\phi_e = 2 + \tfrac12(0.5)(2) = 2.5$。van Leer：$\psi = (0.5 + 0.5)/1.5 = 0.667$，$\phi_e = 2 + \tfrac12(0.667)(2) = 2.667$。二者都位于迎风值（$2$）和中心值（$3$）之间，且都低于 QUICK 值$2.875$——在梯度变化之处，限制器是谨慎的。

第二种情形：$\phi_P = 2$是局部极小值（$r = (2 - 3)/(4 - 2) = -0.5 < 0$），因此两个限制器都给出$\psi = 0$，$\phi_e = \phi_P = 2$：纯迎风，不会把极小值压得更低。合理性检查：若一个格式以固定的正权重乘以$\phi_E - \phi_P$跨越极小值进行插值，就会把较高的值$\phi_E$带入该单元的流出通量中，使该单元变得更低——这正是摆动产生的机理。
:::
:::

在程序中，限制格式与 QUICK 一样通过延迟修正实现：迎风系数进入矩阵，受限的修正量$\tfrac12\psi(r)(\phi_E - \phi_P)F_e$进入源项，并在每次外迭代时更新。在非结构网格上，“远上游”节点$W$并不存在，$r$由重构的单元梯度构造：$r = 2\,(\nabla\phi)_P\cdot\mathbf{d}_{PE}/(\phi_E - \phi_P) - 1$，其中$\mathbf{d}_{PE}$为单元中心之间的矢量。商用程序把这类选项标为“二阶迎风”（线性重构，常带梯度限制器）、“有界中心”或“TVD/NVD”格式。

::: application 实践中选用哪种格式？
对于工业流动的定常 RANS 计算，一种常见且站得住脚的做法是：先用一阶迎风格式以保证鲁棒性，再对动量、能量和组分切换到二阶有界格式（带限制的线性迎风或 TVD 格式），对必须保持为正的湍流量也使用有界格式。对于大涡模拟，数值扩散会淹没被解析的湍流，因此动量采用中心格式或低耗散格式，并用细网格使$P_\Delta$保持适中。默认的“一阶”设置只用于启动计算。
:::

::: quiz
一个二维定常计算模拟以与网格线成$30^\circ$的方向射入冷环境的热射流，使用一阶迎风格式。预测的射流扩展速度是实验的两倍。最可能的解释是什么？
- [ ] 中心差分本来会是有界且精确的。
- [x] 在与流动不对齐的网格上，迎风格式产生了横流数值扩散；应使用有界二阶格式并加密网格。
- [ ] 网格佩克莱数太小。
- [ ] 线性求解器没有收敛。
::: solution
在斜交网格上，迎风格式在横越流动方向上增加了量级为$\rho U\Delta x$的假扩散，使射流扩展。有界高阶格式（TVD 或带限制的线性迎风）以及加密或与射流对齐的网格可以减小它。中心差分在高$P_\Delta$下会振荡；小的$P_\Delta$实际上反而有帮助。
:::
:::

::: history
迎风思想由理查德·柯朗（Richard Courant）、尤金·艾萨克森（Eugene Isaacson）和米娜·里斯（Mina Rees）于 1952 年针对双曲型方程组提出（《纯粹与应用数学通讯》（*Communications on Pure and Applied Mathematics*））。D. 布莱恩·斯波尔丁（D. Brian Spalding）于 1972 年提出混合格式（《国际工程数值方法杂志》（*International Journal for Numerical Methods in Engineering*）），苏哈斯·帕坦卡（Suhas Patankar）在其 1980 年的著作中提出乘方格式。G. de Vahl Davis 和 G. D. Mallinson 于 1976 年定量分析了多维流动中迎风格式的假扩散（《计算机与流体》（*Computers & Fluids*））。布赖恩·P·伦纳德（Brian P. Leonard）于 1979 年发表了 QUICK 格式（《应用力学与工程中的计算机方法》（*Computer Methods in Applied Mechanics and Engineering*），第 19 卷）。线性单调格式的阶数障碍归功于谢尔盖·戈杜诺夫（Sergei Godunov）（1959）。布拉姆·范莱尔（Bram van Leer）的五篇系列论文《走向终极守恒差分格式》（“Towards the ultimate conservative difference scheme”，1973–1979，第 II 至 V 部分发表于《计算物理杂志》（*Journal of Computational Physics*））引入了受限的高分辨率格式；阿米·哈滕（Ami Harten）于 1983 年定义了总变差递减格式（《计算物理杂志》（*Journal of Computational Physics*））；P. K. Sweby 1984 年的论文（《SIAM 数值分析杂志》（*SIAM Journal on Numerical Analysis*））给出了用于比较它们的限制器图。
:::

::: summary
- 定常一维对流-扩散有精确解[[#eq-exact-cd]]：$\mathrm{Pe}$很大时，变化被挤压到厚度为$\Gamma/(\rho u)$的薄层中。
- 对流格式提供面值；其行为由网格佩克莱数$P_\Delta = \rho u\,\delta x/\Gamma$支配。
- 中心差分是二阶的，但当$P_\Delta > 2$时$a_E < 0$，产生节点间振荡（$r = (1 + P_\Delta/2)/(1 - P_\Delta/2) < 0$）。
- 迎风差分对所有$P_\Delta$都有界且具有输运性，但只有一阶精度，在一维中有假扩散$\tfrac12\rho u\,\delta x$，在二维/三维中有横流假扩散。
- 混合格式和乘方格式在一维中模仿精确的指数格式，但在高$P_\Delta$时退回迎风格式。
- QUICK 格式$\phi_e = \tfrac68\phi_P + \tfrac38\phi_E - \tfrac18\phi_W$在面上是三阶的，但可能过冲。
- 戈杜诺夫定理：线性单调格式至多为一阶；带限制器$\psi(r)$的 TVD 格式是非线性的，在光滑区域为二阶，在极值处有界。用延迟修正实现它们。
:::

## 习题

::: exercise 传热问题的网格佩克莱数 {level=1 check="3571"}
水（$\alpha = 1.4\times10^{-7}\ \mathrm{m^2/s}$）以$u = 0.50\ \mathrm{m/s}$流过长度为$\delta x = 1.0\ \mathrm{mm}$的单元。计算温度方程的网格佩克莱数。（输入$P_\Delta$，取最接近的整数。）
::: solution
$P_\Delta = u\,\delta x/\alpha = 0.50 \times 10^{-3}/1.4\times10^{-7} = 3571$。温度方程若用中心差分，单元需要小约$1800$倍才能保持有界；有界格式是必不可少的。
:::
:::

::: exercise 中心差分允许的最大单元 {level=1 check="0.01"}
一个$\Gamma/\rho = 1.0\times10^{-3}\ \mathrm{m^2/s}$的标量以$u = 0.20\ \mathrm{m/s}$被对流。求中心差分保持有界的最大单元尺寸。（以米为单位输入$\delta x$。）
::: solution
$P_\Delta \le 2$要求$\delta x \le 2(\Gamma/\rho)/u = 2 \times 10^{-3}/0.20 = 0.010\ \mathrm{m}$。
:::
:::

::: exercise QUICK 面值 {level=1 check="2.875"}
流动沿$+x$方向，$\phi_W = 1$，$\phi_P = 2$，$\phi_E = 4$，计算$e$面上的 QUICK 面值。（输入$\phi_e$。）
::: solution
$\phi_e = \tfrac68(2) + \tfrac38(4) - \tfrac18(1) = 1.5 + 1.5 - 0.125 = 2.875$。
:::
:::

::: exercise 振荡比 {level=2 check="-3"}
对于$P_\Delta = 4$的中心差分，求[[#prop-central-wiggles]]中离散解$\phi_i = A + Br^i$的比值$r$。（输入$r$。）
::: solution
$r = (1 + 2)/(1 - 2) = -3$：振荡部分的幅值在相邻节点间变为三倍并改变符号，因此它由下游边界条件主导，并从那里向回污染解。
:::
:::

::: exercise van Leer 面值 {level=2 check="2.6667"}
流动沿$+x$方向，$\phi_W = 1$，$\phi_P = 2$，$\phi_E = 4$，用 van Leer 限制器计算面值。（输入$\phi_e$，保留四位小数。）
::: solution
$r = 0.5$，$\psi = (0.5 + 0.5)/(1 + 0.5) = 0.6667$，$\phi_e = 2 + \tfrac12(0.6667)(4 - 2) = 2.6667$。
:::
:::

::: exercise 斜交网格上的假扩散 {level=2 check="0.00707"}
$\rho = 1.0\ \mathrm{kg/m^3}$的流体以$U = 2.0\ \mathrm{m/s}$的均匀流动与正方形网格（$\Delta x = \Delta y = 10\ \mathrm{mm}$）成$45^\circ$斜穿。用 de Vahl Davis–Mallinson 估计式求一阶迎风格式的假扩散系数。（以$\mathrm{kg\,m^{-1}\,s^{-1}}$为单位输入$\Gamma_{\text{false}}$，保留三位有效数字。）
::: solution
在$\theta = 45^\circ$处，$\sin 2\theta = 1$，$\sin^3\theta = \cos^3\theta = 0.3536$，故$\Gamma_{\text{false}} = \rho U\Delta x^2/(4 \times 2 \times 0.3536\,\Delta x) = \rho U\Delta x/2.828 = 1.0 \times 2.0 \times 0.010/2.828 = 7.07\times10^{-3}\ \mathrm{kg\,m^{-1}\,s^{-1}}$。对于空气（$\mu = 1.8\times10^{-5}$），这是分子黏度的$390$倍。
:::
:::

::: exercise 指数格式 {level=3}
(a) 证明：对于常数$F$和$D$，指数格式$a_E = F/(e^{P_\Delta} - 1)$，$a_W = a_E e^{P_\Delta}$，$a_P = a_W + a_E$，在均匀网格的节点上复现精确解[[#eq-exact-cd]]。(b) 证明当$P_\Delta \to 0$时$a_E \to D - F/2$，当$P_\Delta \to \infty$时$a_E \to 0$、$a_W \to F$，并解释这些极限。
::: solution
(a) 把$\phi_i = A + Bs^i$代入$(a_W + a_E)\phi_i = a_W\phi_{i-1} + a_E\phi_{i+1}$：与[[#prop-central-wiggles]]中一样，根为$s = 1$和$s = a_W/a_E = e^{P_\Delta}$。由于$\rho u\,\delta x/\Gamma = P_\Delta$，精确解在节点$x_i = i\,\delta x$处为$A' + B'e^{\rho u x_i/\Gamma} = A' + B'(e^{P_\Delta})^i$。两族解相同；匹配边界值确定出相同的常数。(b) $a_E = F/(e^{P} - 1)$，其中$F = PD$：$e^P - 1 = P(1 + P/2 + P^2/6 + \dots)$，故$a_E = D(1 - P/2 + P^2/12 - \dots) \to D - F/2$——即中心差分。当$P \to \infty$时，$a_E \to 0$，$a_W = F e^P/(e^P - 1) \to F$——即关闭扩散的纯迎风格式。混合格式是这条曲线的三段直线近似。
:::
:::

::: exercise 污染物羽流的格式选择 {level=3}
一个三维定常 RANS 计算须预测从建筑物上风方向$200\ \mathrm{m}$处烟囱释放的污染物浓度，并在一个进风口处核对浓度限值。网格为非结构网格，单元尺寸为$0.5$–$2\ \mathrm{m}$。讨论浓度方程对流格式的选择、一阶迎风格式的预期误差、如何验证预测结果没有被数值扩散主导，以及高阶格式产生负浓度的风险。
::: solution
好的答案应指出：基于湍流扩散系数的网格佩克莱数（在大气边界层中$\nu_t$约为$1\ \mathrm{m^2/s}$，$u \sim 5\ \mathrm{m/s}$，$\delta x \sim 1\ \mathrm{m}$）约为$5$的量级——中心差分不安全，而迎风格式会增加约$\tfrac12 u\,\delta x \approx 2.5\ \mathrm{m^2/s}$的假扩散，与物理湍流扩散相当甚至更大，因此羽流会被摊开，峰值浓度被低估（对安全校核而言是偏于不保守的）。应使用有界二阶格式（TVD/带限制的线性迎风）；沿羽流路径和进风口附近加密网格；比较一阶与二阶结果以及至少两套网格——若进风口浓度变化显著，说明数值扩散不可忽视。限制器能保持浓度非负；无界格式（QUICK、中心差分）可能在羽流边缘产生负浓度，这些负值不能被悄悄截断，因为截断会破坏守恒。建议用类似构型的风洞或现场数据进行确认。
:::
:::
