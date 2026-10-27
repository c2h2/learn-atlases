使飞机偏离配平状态后松开操纵，它并不会简单地回到原状态：它以几种特征方式振荡、漂移、滚转和偏航——这就是飞机的**模态**。常规布局飞机有五个模态。在俯仰方向上，有一个快速且通常阻尼良好的机头点头运动（**短周期**模态），以及一个缓慢、阻尼很小的高度与速度相互交换的运动，周期为一两分钟（**长周期**模态，phugoid）。在滚转和偏航方向上，有一个阻尼很大的**滚转收敛**模态，一个使坡度恢复或加剧的缓慢**螺旋**模态，以及一个偏航与滚转耦合的振荡，即**荷兰滚**。它们的频率和阻尼决定了飞机飞起来的“感觉”以及是否需要人工增稳：它们是**飞行品质**的核心。

本讲取[[flight-mechanics/aircraft-equations-of-motion]]中喷气运输机的线化状态空间模型，计算其特征值和特征向量，并推导把每个模态与少数几个稳定性导数联系起来的经典近似公式——设计者正是用这些公式来决定应当改动飞机的哪一部分。线性系统与特征值的理论见[[control-systems/state-space]]和[[control-systems/time-response]]。

## 模态、特征值及其含义 {#sec-eigen}

对于$\dot{\mathbf x} = \mathbf A\mathbf x$，每个解都是形如$\mathbf v\,e^{\lambda t}$的项的组合，其中$\lambda$是$\mathbf A$的特征值，$\mathbf v$是相应的特征向量。实特征值给出非振荡的**收敛**（$\lambda < 0$）或**发散**（$\lambda > 0$）；一对复特征值$\lambda = -\zeta\omega_n \pm \mathrm{i}\,\omega_n\sqrt{1 - \zeta^2}$给出振荡。

::: definition 模态特性 {#def-mode}
对于特征值为$\lambda = \sigma \pm \mathrm{i}\,\omega_d$的模态：
- **固有频率**$\omega_n = \lvert\lambda\rvert = \sqrt{\sigma^2 + \omega_d^2}$，**阻尼比**$\zeta = -\sigma/\omega_n$；
- **周期**$T = 2\pi/\omega_d$；
- 若$\sigma < 0$，**半衰时间**$t_{1/2} = \ln 2/\lvert\sigma\rvert$；若$\sigma > 0$，**倍幅时间**$t_2 = \ln 2/\sigma$；
- 对于实特征值，**时间常数**$\tau = -1/\lambda$；
- **模态形状**：即特征向量，给出该模态中各状态变量的相对幅值和相位。
:::

特征值是特征多项式$\det(\lambda\mathbf I - \mathbf A) = 0$的根，对两组解耦方程中的每一组都是四次多项式。布赖恩（Bryan）的稳定性条件是所有根都有负实部，对于四次多项式$\lambda^4 + A_3\lambda^3 + A_2\lambda^2 + A_1\lambda + A_0$，这就是**劳斯–赫尔维茨**（Routh–Hurwitz）条件：所有系数为正，且$A_3A_2A_1 - A_1^2 - A_3^2A_0 > 0$（[[control-systems/feedback-stability]]）。仅常数项的符号往往就具有决定性：$A_0 < 0$意味着存在一个正实根，即非振荡的发散。

## 纵向模态 {#sec-longitudinal}

::: example 喷气运输机的纵向模态 {#ex-long-modes}
求[[flight-mechanics/aircraft-equations-of-motion#ex-a-long]]中喷气运输机纵向矩阵的特征值和模态特性，并描述模态形状。
::: solution
特征多项式为$\lambda^4 + 0.7114\lambda^3 + 0.8534\lambda^2 + 0.004960\lambda + 0.002747$，所有系数为正，劳斯判别式$0.7114 \times 0.8534 \times 0.004960 - 0.004960^2 - 0.7114^2 \times 0.002747 = 0.003011 - 0.0000246 - 0.001390 = 0.001597 > 0$：稳定。数值求解（用任何特征值程序）：

| 模态 | $\lambda$ / $\mathrm{s^{-1}}$ | $\omega_n$ / $\mathrm{rad\,s^{-1}}$ | $\zeta$ | 周期 / s | $t_{1/2}$ / s |
|---|---|---|---|---|---|
| 短周期 | $-0.3541 \pm 0.8500\mathrm{i}$ | 0.921 | 0.385 | 7.39 | 1.96 |
| 长周期 | $-0.00157 \pm 0.0569\mathrm{i}$ | 0.0569 | 0.0276 | 110 | 441 |

模态形状（特征向量按单位俯仰角$\Delta\theta$归一化）：在**短周期**模态中，$\lvert\Delta\alpha\rvert = \lvert\Delta w\rvert/u_0 = 1.08\lvert\Delta\theta\rvert$，而$\lvert\Delta u\rvert/u_0 = 0.025\lvert\Delta\theta\rvert$——这是一种几乎等速的俯仰运动，迎角与俯仰角一起变化。在**长周期**模态中，$\lvert\Delta u\rvert/u_0 = 0.75\lvert\Delta\theta\rvert$，$\Delta u$与$\Delta\theta$的相位相差约$90^\circ$，而$\lvert\Delta\alpha\rvert = 0.017\lvert\Delta\theta\rvert$——飞机爬升减速，然后俯冲加速，迎角几乎不变。合理性检查：两个模态的频率相差$16$倍，这使得研究其中一个时可以把另一个“冻结”；长周期模态需要将近四个周期才能使振幅减半，因此飞行员看到的是速度和高度缓慢而持久的漂移。
:::
:::

### 短周期模态

由于短周期运动中速度几乎不变，令$\Delta u = 0$并去掉$X$方程。剩下的是关于$\Delta\alpha = \Delta w/u_0$和$\Delta q$的二阶系统。

::: proposition 短周期近似 {#prop-short-period}
在$\Delta u = 0$、$\theta_0 = 0$，并记$Z_\alpha = u_0Z_w$、$M_\alpha = u_0M_w$、$M_{\dot\alpha} = u_0M_{\dot w}$时，
$$
\begin{bmatrix}\Delta\dot\alpha\\ \Delta\dot q\end{bmatrix} =
\begin{bmatrix} Z_\alpha/u_0 & 1\\ M_\alpha + M_{\dot\alpha}Z_\alpha/u_0 & M_q + M_{\dot\alpha}\end{bmatrix}
\begin{bmatrix}\Delta\alpha\\ \Delta q\end{bmatrix},
$$ {#eq-sp-matrix}
其特征方程$\lambda^2 + 2\zeta_{sp}\omega_{sp}\lambda + \omega_{sp}^2 = 0$给出
$$
\omega_{sp} = \sqrt{\frac{Z_\alpha M_q}{u_0} - M_\alpha},\qquad
\zeta_{sp} = -\frac{M_q + M_{\dot\alpha} + Z_\alpha/u_0}{2\,\omega_{sp}} .
$$ {#eq-sp}
:::

::: proof
把[[flight-mechanics/aircraft-equations-of-motion#eq-lin-long]]中的$z$向力方程除以$mu_0$，取$\Delta u = 0$、$\theta_0 = 0$，导数按质量归一化，得$\Delta\dot\alpha = (Z_\alpha/u_0)\Delta\alpha + \Delta q$。俯仰方程为$\Delta\dot q = M_\alpha\Delta\alpha + M_{\dot\alpha}\Delta\dot\alpha + M_q\Delta q$；代入$\Delta\dot\alpha$得[[#eq-sp-matrix]]的第二行。$2\times2$矩阵的特征多项式为$\lambda^2 - (\text{迹})\lambda + \det$：迹$= Z_\alpha/u_0 + M_q + M_{\dot\alpha}$，行列式$= (Z_\alpha/u_0)(M_q + M_{\dot\alpha}) - M_\alpha - M_{\dot\alpha}Z_\alpha/u_0 = Z_\alpha M_q/u_0 - M_\alpha$。与$\lambda^2 + 2\zeta\omega\lambda + \omega^2$对比即得[[#eq-sp]]。
:::

这些公式指明了应当改动什么。频率主要由**俯仰刚度**$-M_\alpha \propto -C_{m\alpha} = aK_n$决定：静稳定裕度越大，短周期越快、越“硬”；当重心移向中性点时频率下降（由于$Z_\alpha M_q$项，它不会完全降到零）。阻尼来自**俯仰阻尼**$M_q + M_{\dot\alpha}$（主要是尾翼）以及通过$Z_\alpha$起作用的**升力线斜率**。两者都与动压成比例，因此在高空——给定真空速下$q$较低——短周期变得更慢、阻尼更小，这是运输机装有俯仰阻尼器的原因之一。

对于喷气运输机：$Z_\alpha/u_0 = -0.406$，$M_q = -0.2253$，$M_{\dot\alpha} = -0.0751$，$M_\alpha = -0.7564\ \mathrm{s^{-2}}$：
$$
\omega_{sp} = \sqrt{(-0.406)(-0.2253) + 0.7564} = \sqrt{0.0915 + 0.7564} = 0.921\ \mathrm{rad/s},\qquad
\zeta_{sp} = \frac{0.2253 + 0.0751 + 0.406}{2 \times 0.921} = 0.384,
$$
与完整四阶模型的结果在三位有效数字上一致。

::: widget phaseplane
f: -0.406*x + y
g: -(Ka*0.7564 - 0.0305)*x - Mq*y
x: -0.2, 0.2
y: -0.25, 0.25
sliders: Ka=1:0.1:3:0.05; Mq=0.3005:0:1.5:0.01
points: 0.15, 0
nullclines: false
caption: 喷气运输机在$(\Delta\alpha, \Delta q)$平面（rad，rad/s）中的短周期近似。`Ka`缩放俯仰刚度$-M_\alpha$（1 为现有静稳定裕度），`Mq`为总俯仰阻尼$-(M_q + M_{\dot\alpha})$，单位$\mathrm{s^{-1}}$。轨线从$0.15\ \mathrm{rad}$的迎角扰动出发。增大`Mq`——正如俯仰阻尼器所做的那样——螺旋线变为直接趋近；把`Ka`降向$0.1$（重心接近中性点），运动变得迟缓而缓慢。
:::

### 长周期模态

在长周期模态中迎角几乎不变，因此升力系数近似不变，运动是动能与势能之间的交换。兰彻斯特（Lanchester）在1908年通过设想一架没有阻力的滑翔机描述了它：滑翔机爬升时减速，其升力（在$C_L$不变时）降到小于重量，航迹向下弯曲；下降时加速，升力超过重量，航迹向上弯曲。

::: proposition 长周期近似（兰彻斯特） {#prop-phugoid}
忽略俯仰动力学（$\Delta\alpha \approx 0$，去掉$\Delta\dot q$方程），并在水平飞行中取$C_{Du} = C_{Lu} = 0$，
$$
\omega_p = \sqrt2\,\frac{g}{u_0},\qquad \zeta_p = \frac{1}{\sqrt2\,(L/D)},\qquad T_p = \frac{\sqrt2\,\pi u_0}{g}.
$$ {#eq-phugoid}
:::

::: proof
在$\Delta w = 0$时，剩下的纵向方程为$\Delta\dot u = X_u\Delta u - g\Delta\theta$，以及由$z$向方程得到的$0 = Z_u\Delta u + u_0\Delta q = Z_u\Delta u + u_0\Delta\dot\theta$。对第一式求导并代入$\Delta\dot\theta = -Z_u\Delta u/u_0$：$\Delta\ddot u - X_u\Delta\dot u - (gZ_u/u_0)\Delta u = 0$。故$\omega_p^2 = -gZ_u/u_0$，$2\zeta_p\omega_p = -X_u$。由[[flight-mechanics/aircraft-equations-of-motion#prop-xz-derivs]]，在水平飞行中（$qSC_L = mg$）：$Z_u = -2g/u_0$，$X_u = -2g/(u_0\,L/D)$。因此$\omega_p = \sqrt2\,g/u_0$，$\zeta_p = (2g/(u_0L/D))/(2\sqrt2g/u_0) = 1/(\sqrt2\,L/D)$；周期为$2\pi/\omega_p$。
:::

长周期的周期只取决于速度——空速每 m/s 约$0.45$ s——其阻尼只取决于$L/D$：气动效率高的飞机，长周期模态的阻尼很差。对于喷气运输机，近似给出$\omega_p = 1.414 \times 9.807/230.15 = 0.0603\ \mathrm{rad/s}$（$T_p = 104\ \mathrm{s}$），$\zeta_p = 1/(1.414 \times 17.02) = 0.042$，而完整模型为$0.0569\ \mathrm{rad/s}$（$110\ \mathrm{s}$）和$0.028$。频率吻合得很好；阻尼高了$50\,\%$，因为近似忽略了迎角的微小变化（通过$X_w$和$M_u$类的耦合），而在本例中正是这些变化把能量反馈回运动之中。在高亚声速马赫数下，压缩性（阻力剧增附近的$C_{Du}$、$C_{mu}$）和推力随速度的变化会显著改变长周期模态，因此需要完整模型或飞行试验来预测其阻尼。

::: widget plot
f: exp(-x/(sqrt(2)*LD)*sqrt(2)*9.80665/V)*cos(sqrt(2)*9.80665/V*sqrt(1 - 1/(2*LD^2))*x)
x: 0, 600
y: -1.1, 1.1
sliders: V=230:50:300:5; LD=17:5:25:0.5
labels: \Delta u(t)/\Delta u(0)
caption: 由兰彻斯特近似得到的长周期模态中速度扰动（归一化）随时间（秒）的响应，滑块为真空速$V$（m/s）和升阻比$L/D$。周期与速度成正比增长；阻尼随$L/D$增大而减小。在$V = 230$、$L/D = 17$时，振幅要经过约四个周期才减半（完整模型的阻尼更小）。一架以$25\ \mathrm{m/s}$飞行、$L/D = 40$的滑翔机，周期只有$11\ \mathrm{s}$，但要经过十个以上的周期才能稳定下来。
:::

::: warning 近似公式用于洞察，而不是用于数值
短周期近似通常非常好；长周期和荷兰滚近似则往往不然。喷气运输机的长周期阻尼算得高了$50\,\%$，其荷兰滚阻尼（见下文）高了两倍。用近似公式来看清哪些导数重要、应向哪个方向改变它们，但用于设计和适航审定的模态特性要由完整的四阶模型（或非线性方程）计算，并与飞行试验核对。另一个经典错误是只从实部读取阻尼比：$\zeta = -\sigma/\omega_n$，而不是$-\sigma$。
:::

## 横航向模态 {#sec-lateral}

::: example 喷气运输机的横航向模态 {#ex-lat-modes}
求[[flight-mechanics/aircraft-equations-of-motion#ex-lat-derivs]]中$\mathbf A_{\text{lat}}$的特征值，并辨识各模态。
::: solution
特征多项式为$\lambda^4 + 1.1320\lambda^3 + 1.1850\lambda^2 + 1.2054\lambda + 0.004129$，特征值为

| 模态 | $\lambda$ / $\mathrm{s^{-1}}$ | 特性 |
|---|---|---|
| 滚转收敛 | $-1.072$ | $\tau = 0.93\ \mathrm{s}$ |
| 螺旋 | $-0.00344$ | $\tau = 291\ \mathrm{s}$，$t_{1/2} = 202\ \mathrm{s}$（稳定） |
| 荷兰滚 | $-0.0283 \pm 1.058\mathrm{i}$ | $\omega_n = 1.059\ \mathrm{rad/s}$，$\zeta = 0.027$，周期$5.94\ \mathrm{s}$，$t_{1/2} = 24.5\ \mathrm{s}$ |

荷兰滚特征向量按单位$\beta$归一化后，每弧度侧滑对应$\lvert\phi\rvert = 2.5$，$\lvert r\rvert = 0.98\ \mathrm{rad/s}$，$\lvert p\rvert = 2.65\ \mathrm{rad/s}$：飞机滚转的角度是其侧滑角的两倍半，滚转角滞后侧滑角约$135^\circ$。合理性检查：滚转模态快而螺旋模态非常慢，与预期一致；荷兰滚阻尼很小——要四个周期才减半——这是后掠翼喷气式飞机在高空的典型情况，也是它们装有偏航阻尼器的原因（[[flight-mechanics/flight-control]]）。
:::
:::

### 滚转收敛

在滚转中起主导作用的力矩是副翼力矩和滚转阻尼$L_p$；侧滑只是缓慢地建立起来。去掉侧力方程和偏航方程，剩下$\Delta\dot p = L_p\Delta p + L_{\delta a}\Delta\delta_a$，这是一个一阶系统：
$$
\lambda_{\text{roll}} \approx L_p,\qquad \tau_{\text{roll}} = -\frac{1}{L_p},\qquad p_{ss} = -\frac{L_{\delta a}}{L_p}\,\delta_a .
$$ {#eq-roll-mode}
对于喷气运输机，$\tau \approx 1/0.961 = 1.04\ \mathrm{s}$，精确值为$0.93\ \mathrm{s}$。稳定滚转角速度就是[[flight-mechanics/lateral-static-stability#prop-roll]]中由力矩平衡求得的值；时间常数表明达到它的快慢。由于$L_p \propto \rho u_0b^2/I_x$，滚转模态在高空以及对于机翼较重（燃油、翼吊发动机）的飞机会变慢。

### 螺旋模态

螺旋模态是滚转角和航向的缓慢演变。如果一侧机翼下沉，飞机就向该侧侧滑；随后垂尾（通过$N_\beta$）使机头转向侧滑方向，外侧机翼此时运动更快，升力增大，使飞机进一步滚转（通过$L_r$），而上反效应（$L_\beta$）则起改平机翼的作用。哪一方占上风决定了稳定性。由于这一运动非常缓慢，在$\lambda = 0$附近特征四次多项式的常数项和一次项起主导作用：$\lambda_s \approx -A_0/A_1$。对于水平飞行，展开行列式得$A_0 = (g/u_0)(L_\beta N_r - N_\beta L_r)$，因此

::: proposition 螺旋稳定性条件 {#prop-spiral}
对于水平飞行中的横向模型[[flight-mechanics/aircraft-equations-of-motion#eq-a-lat]]，螺旋模态稳定的充要条件是
$$
L_\beta N_r - N_\beta L_r > 0 ,
$$ {#eq-spiral}
其根近似为$\lambda_s \approx -A_0/A_1$，其中$A_0$和$A_1$是特征多项式的最后两个系数。
:::

::: proof
对于$4\times4$矩阵，$\det(\lambda\mathbf I - \mathbf A)$的常数项为$\det(-\mathbf A) = \det\mathbf A$。沿最后一行（其唯一的非零元素是$p$列中的$1$）展开$\det\mathbf A_{\text{lat}}$，再沿最后一列展开（只有第一行中的$g/u_0$保留下来），得$\det\mathbf A = (g/u_0)\,(L_\beta N_r - N_\beta L_r)$，这里两次代数余子式展开的符号都为正。实根恰好在$A_0$变号时穿过零，而另外三个根都稳定，因此变号的是螺旋根。在$\lambda = 0$附近多项式近似为$A_1\lambda + A_0$，故$\lambda_s \approx -A_0/A_1$。假设：螺旋根的绝对值远小于其他根，因此在其附近$\lambda^2$及更高次项可以忽略。
:::

对于喷气运输机：$L_\beta N_r = (-3.745)(-0.1121) = 0.4200$，$N_\beta L_r = (1.008)(0.3204) = 0.3230$，因此条件成立，螺旋模态稳定；$\lambda_s \approx -0.004129/1.2054 = -0.00343$，与精确值$-0.00344$相符。注意其中的矛盾：强的上反效应（$L_\beta$为大的负值）有利于螺旋模态，而强的风标效应（$N_\beta$）对它不利——而强的$N_\beta$正是抑制荷兰滚游荡趋势所需要的。许多飞机的螺旋模态略不稳定；只要发散足够慢，使飞行员在不知不觉中就能修正，这是可以接受的（例如，MIL-F-8785C 允许巡航中 1 级的倍幅时间不小于$20\ \mathrm{s}$）。

### 荷兰滚

荷兰滚是短周期模态在横向的对应物：一种由风标刚度$N_\beta$驱动、由偏航阻尼$N_r$阻尼的偏航振荡，并通过上反效应耦合进滚转运动。一种粗略的近似完全忽略滚转：取$\phi = p = 0$，
$$
\omega_{dr} \approx \sqrt{N_\beta + \frac{Y_\beta N_r}{u_0}},\qquad
\zeta_{dr} \approx -\frac{Y_\beta/u_0 + N_r}{2\,\omega_{dr}} .
$$ {#eq-dutch-roll}
对于喷气运输机，它给出$\omega_{dr} = 1.007\ \mathrm{rad/s}$和$\zeta_{dr} = 0.085$，而完整模型为$1.059$和$0.027$。频率尚可；阻尼高了两倍，因为很大的滚转分量（滚转角为侧滑角的$2.5$倍）——由后掠翼强烈的上反效应$L_\beta$驱动——通过滚转引起的偏航导数$N_p$和重力项把能量注入偏航运动。荷兰滚中的比值$\lvert\phi/\beta\rvert$是一个关键的飞行品质参数：值大意味着一种“摇摆”式的滚转振荡，很难用副翼阻尼，乘客也会感到不适。

::: example 加大垂尾对横向模态的影响 {#ex-fin-modes}
假设加大垂尾使$C_{n\beta}$从$0.12$提高到$0.16$，$C_{nr}$从$-0.18$变为$-0.24$，其他导数不变。估计新的螺旋条件和荷兰滚特性。
::: solution
$N_\beta = 0.16 \times 4.0332\times10^{7}/4.8\times10^{6} = 1.344\ \mathrm{s^{-2}}$，$N_r = -0.24 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.1495\ \mathrm{s^{-1}}$。螺旋：$L_\beta N_r - N_\beta L_r = (-3.745)(-0.1495) - (1.344)(0.3204) = 0.5600 - 0.4306 = 0.129 > 0$，仍然稳定（而且稍更稳定：这里增加的偏航阻尼超过了增加的风标刚度）。由完整矩阵计算荷兰滚：特征值变为$-0.0538 \pm 1.199\mathrm{i}$，故$\omega_{dr} = 1.200\ \mathrm{rad/s}$，$\zeta_{dr} = 0.045$（螺旋根移到$-0.0036$）。合理性检查：频率大致按$\sqrt{N_\beta}$升高（$\sqrt{1.344/1.008} = 1.15$，实际为$1.13$），阻尼只有适度改善——垂尾加大$33\,\%$后，荷兰滚仍远低于 1 级所需的$\zeta = 0.08$。这就是为什么标准的解决办法是偏航阻尼器，而不是更大的垂尾。
:::
:::

## 飞行品质 {#sec-handling}

一组模态是否可以接受，由飞行员来评判。在**库珀–哈珀评分尺度**（Cooper–Harper rating scale；G. E. Cooper 与 R. P. Harper Jr.，NASA TN D-5153，1969）中，试飞员完成一项规定的任务，并通过回答一个简短的决策树把飞机评为从 1（优秀，不需要飞行员补偿）到 10（存在重大缺陷，将失去控制）：它是否可控？能否以可容忍的工作负荷达到足够的性能？不加改进是否令人满意？评分 1–3.5 对应**1 级**（明显满足该任务阶段的要求），3.5–6.5 对应**2 级**（满足要求，但工作负荷增加或性能下降），6.5–9 对应**3 级**（飞机可以安全控制，但工作负荷过大或性能不足）。

规范把这些等级转化为对模态的要求，使飞机在首飞之前就能按此设计。美国军用规范 MIL-F-8785C《有人驾驶飞机的飞行品质》（*Flying Qualities of Piloted Airplanes*，1980）——后来被 MIL-STD-1797 系列取代——是使用和引用最广泛的规范；它对飞机分类（I 类小型轻型，II 类中型，III 类大型重型，IV 类高机动性）并对飞行阶段分类（A 种为需要剧烈机动和精确跟踪的阶段，B 种为巡航和爬升，C 种为起飞和着陆）。下表摘录了其中部分 1 级要求，按 Nelson（1998）的列表：

| 模态 | 1 级要求（摘录） |
|---|---|
| 长周期 | $\zeta_p \ge 0.04$（2 级：$\zeta_p \ge 0$；3 级：倍幅时间$\ge 55\ \mathrm{s}$） |
| 短周期 | $0.35 \le \zeta_{sp} \le 1.30$（A 种和 C 种）；$0.30 \le \zeta_{sp} \le 2.0$（B 种） |
| 荷兰滚，B 种 | $\zeta_{dr} \ge 0.08$，$\zeta_{dr}\omega_{dr} \ge 0.15\ \mathrm{rad/s}$，$\omega_{dr} \ge 0.4\ \mathrm{rad/s}$（2 级：$0.02$、$0.05$、$0.4$） |
| 滚转模态 | $\tau \le 1.4\ \mathrm{s}$（III 类，所有种类） |
| 螺旋 | 倍幅时间$\ge 20\ \mathrm{s}$（B 种） |

短周期的**频率**要求通过**操纵期望参数**（control anticipation parameter）$\omega_{sp}^2/(n/\alpha)$来表达，即初始俯仰角加速度与单位迎角的稳态过载之比，它反映了飞机对拉杆响应的快慢和强弱。这里给出这些数字是为了说明如何评判模态；实际设计要按其类别和阶段对应的完整现行规范来评估。

::: example 喷气运输机巡航时的飞行品质 {#ex-handling}
按上表对喷气运输机巡航时（III 类，B 种）的各模态进行评级。
::: solution
短周期：$\zeta_{sp} = 0.385$，在$0.30$–$2.0$之内——1 级。长周期：$\zeta_p = 0.028 < 0.04$——2 级（但$> 0$）。滚转：$\tau = 0.93\ \mathrm{s} \le 1.4\ \mathrm{s}$——1 级。螺旋：稳定——1 级。荷兰滚：$\zeta_{dr} = 0.027$（需要$0.08$），$\zeta_{dr}\omega_{dr} = 0.027 \times 1.059 = 0.029\ \mathrm{rad/s}$（1 级需要$0.15$，2 级需要$0.05$）——比 2 级还差。合理性检查：这一结果是无增稳后掠翼运输机的典型情况：荷兰滚是不合格的模态，长周期处于临界。解决办法——用偏航阻尼器把荷兰滚阻尼提高到约$0.3$以上，必要时用自动油门或俯仰姿态自动驾驶回路处理长周期——是[[flight-mechanics/flight-control]]的主题。
:::
:::

::: quiz
一架客机的重心向握杆中性点后移（但未到达中性点）。你预期纵向模态会有什么变化？
- [ ] 长周期的周期显著缩短。
- [x] 短周期频率下降，因为俯仰刚度$-M_\alpha$随静稳定裕度减小。
- [ ] 短周期阻尼比降为零。
- [ ] 没有变化；模态只取决于惯量。
::: solution
$\omega_{sp}^2 = Z_\alpha M_q/u_0 - M_\alpha$，而$-M_\alpha \propto aK_n$。当$K_n \to 0$时，$\omega_{sp}^2$降到$Z_\alpha M_q/u_0$，阻尼比$\zeta_{sp} \propto 1/\omega_{sp}$实际上会**增大**，飞机在俯仰上变得迟钝且过阻尼。长周期只受到微弱影响。
:::
:::

::: history
兰彻斯特（F. W. Lanchester）的《飞行动力学》（*Aerodonetics*，1908）是其《空中飞行》（*Aerial Flight*）的第二卷，书中分析了滑翔机的长周期振荡，并将其命名为 **phugoid**——取自一个他以为意为“飞行”的希腊词根（实际上它指的是“逃跑”意义上的 flight）。布赖恩（G. H. Bryan）的《航空中的稳定性》（*Stability in Aviation*，1911）给出了一般的小扰动理论以及两个四次方程的稳定性判据；1940年代，NACA 把飞行员的意见转化为定量要求：吉尔鲁思（R. R. Gilruth）的《飞机满意飞行品质的要求》（*Requirements for Satisfactory Flying Qualities of Airplanes*，NACA 第 755 号报告，1943）提出了可以用来核对飞行员评语的可测量准则。1969年的库珀–哈珀尺度使飞行员意见的记录方式标准化，而 MIL-F-8785C（1980）及其后续规范确立了整个行业直接采用或经修改后采用的模态要求。
:::

::: summary
- 每个特征值就是一个模态：$\omega_n = \lvert\lambda\rvert$，$\zeta = -\mathrm{Re}\,\lambda/\omega_n$，$t_{1/2} = \ln2/\lvert\mathrm{Re}\,\lambda\rvert$；特征向量是模态形状。
- 短周期：$\omega_{sp}^2 = Z_\alpha M_q/u_0 - M_\alpha$，$2\zeta_{sp}\omega_{sp} = -(M_q + M_{\dot\alpha} + Z_\alpha/u_0)$——由静稳定裕度和尾翼阻尼决定；通常是很好的近似。
- 长周期（兰彻斯特）：$\omega_p = \sqrt2g/u_0$，$\zeta_p = 1/(\sqrt2L/D)$，周期约为每 m/s $0.45\ \mathrm{s}$；近似不能可靠地预测阻尼。
- 滚转收敛$\tau \approx -1/L_p$；螺旋稳定当且仅当$L_\beta N_r - N_\beta L_r > 0$，根$\approx -A_0/A_1$。
- 荷兰滚由$N_\beta$驱动，由$N_r$阻尼，通过$L_\beta$与滚转耦合；滚转耦合使简单近似效果很差。
- 飞行品质：库珀–哈珀评分与 1–3 级；MIL-F-8785C 类要求；无增稳的后掠翼喷气式飞机通常需要偏航阻尼器。
:::

## 习题

::: exercise 读取特征值 {level=1 check="0.6"}
某模态的特征值为$-0.6 \pm 0.8\mathrm{i}\ \mathrm{s^{-1}}$。求其阻尼比。（输入$\zeta$的精确值。）
::: solution
$\omega_n = \sqrt{0.36 + 0.64} = 1.0\ \mathrm{rad/s}$，$\zeta = 0.6/1.0 = 0.6$。周期为$2\pi/0.8 = 7.85\ \mathrm{s}$，半衰时间为$\ln 2/0.6 = 1.16\ \mathrm{s}$。
:::
:::

::: exercise 轻型飞机的长周期周期 {level=1 check="22.7"}
用兰彻斯特近似求轻型飞机在$50\ \mathrm{m/s}$时的长周期周期。（单位 s，保留一位小数。）
::: solution
$T_p = \sqrt2\pi u_0/g = 1.4142 \times 3.1416 \times 50/9.80665 = 22.652\ \mathrm{s}$，保留一位小数为$22.7\ \mathrm{s}$。（该速度下$L/D \approx 10.9$，$\zeta_p \approx 0.065$。）
:::
:::

::: exercise 长周期阻尼 {level=1 check="0.0283"}
求$L/D = 25$的滑翔机的兰彻斯特长周期阻尼比。（输入$\zeta_p$，保留三位有效数字。）
::: solution
$\zeta_p = 1/(\sqrt2 \times 25) = 0.0283$。
:::
:::

::: exercise 不同重心位置下的短周期 {level=2 check="0.715"}
把喷气运输机的重心后移，使$M_\alpha$从$-0.7564$变为$-0.4200\ \mathrm{s^{-2}}$，其他导数不变。用[[#eq-sp]]求新的短周期固有频率。（输入$\omega_{sp}$，单位 rad/s，保留三位小数。）
::: solution
由$Z_\alpha M_q/u_0 = (-0.40592)(-0.22535) = 0.09147$：$\omega_{sp} = \sqrt{0.09147 + 0.4200} = \sqrt{0.51147} = 0.715\ \mathrm{rad/s}$，$\zeta_{sp} = 0.7064/(2 \times 0.715) = 0.494$。
:::
:::

::: exercise 滚转模态时间常数 {level=2 check="0.74"}
一架公务机的$C_{lp} = -0.40$，$b = 16\ \mathrm{m}$，$S = 30\ \mathrm{m^2}$，$I_x = 4.0\times10^{4}\ \mathrm{kg\,m^2}$，以$u_0 = 200\ \mathrm{m/s}$、$q = 7000\ \mathrm{Pa}$飞行。估算滚转模态时间常数。（输入$\tau$，单位 s，保留两位小数。）
::: solution
$L_p = qSb^2C_{lp}/(2I_xu_0) = 7000 \times 30 \times 256 \times (-0.40)/(2 \times 4.0\times10^{4} \times 200) = -21\,504/16\,000 = -1.344\ \mathrm{s^{-1}}$，故$\tau = 1/1.344 = 0.744\ \mathrm{s}$，即$0.74\ \mathrm{s}$——稳妥地处于 1 级典型限制$1.0$–$1.4\ \mathrm{s}$之内。
:::
:::

::: exercise 螺旋稳定性 {level=2}
某飞机的$L_\beta = -2.0\ \mathrm{s^{-2}}$，$N_\beta = 1.5\ \mathrm{s^{-2}}$，$L_r = 0.40\ \mathrm{s^{-1}}$，$N_r = -0.25\ \mathrm{s^{-1}}$。其螺旋模态是否稳定？若只改变一个导数使之成为中性稳定，你会改变哪一个、改变多少？
::: solution
$L_\beta N_r - N_\beta L_r = (-2.0)(-0.25) - (1.5)(0.40) = 0.50 - 0.60 = -0.10 < 0$：不稳定（缓慢发散）。若只改变$L_\beta$以达到中性稳定，$L_\beta = N_\beta L_r/N_r = -0.60/0.25 = -2.4\ \mathrm{s^{-2}}$——上反效应增加$20\,\%$。或者把$N_\beta$减小到$1.25\ \mathrm{s^{-2}}$，代价是荷兰滚频率降低。
:::
:::

::: exercise 由特征向量求模态形状 {level=3}
对于喷气运输机的长周期模态，按$\Delta\theta = 1$归一化的特征向量中$\Delta u = 171.6\ \mathrm{m/s}$，超前$\Delta\theta$ $94^\circ$。利用[[#prop-phugoid]]的兰彻斯特方程，推导预测的幅值比$\lvert\Delta u\rvert/(u_0\lvert\Delta\theta\rvert)$和相位，与特征向量比较，并从物理上解释该相位。
::: solution
由[[#prop-phugoid]]的证明，$\Delta\dot\theta = -Z_u\Delta u/u_0 = (2g/u_0^2)\Delta u$。对于模态$e^{\mathrm{i}\omega t}$，$\mathrm{i}\omega\Delta\theta = (2g/u_0^2)\Delta u$，故$\Delta u/\Delta\theta = \mathrm{i}\omega u_0^2/(2g)$：速度超前姿态$90^\circ$（姿态在速度达到最大之后四分之一周期才达到最高，即飞机在爬升中已减速之时），且$\lvert\Delta u\rvert/(u_0\lvert\Delta\theta\rvert) = \omega u_0/(2g)$。用精确的$\omega = 0.0569$：$0.0569 \times 230.15/(2 \times 9.807) = 0.668$；完整特征向量给出$171.6/230.15 = 0.746$和$94^\circ$的相位——对于如此简单的模型，吻合程度是合理的。物理上：爬升中飞机把速度转化为高度，所以在机头抬起、高度上升时速度在下降——速度振荡超前于姿态振荡。
:::
:::

::: exercise 偏航阻尼器的要求 {level=3}
按粗略近似[[#eq-dutch-roll]]，喷气运输机需要多大的偏航阻尼$N_r$才能满足 1 级荷兰滚要求$\zeta_{dr}\omega_{dr} \ge 0.15\ \mathrm{rad/s}$？为什么真实的要求更高？建议如何正确地求出它。
::: solution
在近似中$\zeta\omega = -(Y_\beta/u_0 + N_r)/2$，因此$\zeta\omega \ge 0.15$要求$-(−0.0587 + N_r) \ge 0.30$，即$N_r \le -0.241\ \mathrm{s^{-1}}$，约为机体本身$-0.112$的两倍。真实要求更高，因为近似所忽略的滚转耦合会消耗阻尼：完整模型给出$\zeta\omega = 0.028$，而近似给出$0.085$。正确的方法：在$\mathbf A_{\text{lat}}$的第三行加上$\Delta N_r$（这正是偏航角速度反馈$\delta_r = K_rr$的作用，$\Delta N_r = N_{\delta r}K_r$），计算特征值随$K_r$的变化——即根轨迹——选取使荷兰滚位于所需位置的增益，并检查螺旋模态和滚转模态不受损害，且稳定转弯不受阻碍（这就引出了[[flight-mechanics/flight-control]]中的洗出滤波器）。
:::
:::
