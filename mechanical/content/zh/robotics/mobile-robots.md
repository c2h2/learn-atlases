机械臂用螺栓固定在地面上；移动机器人则带着自己的基座行走——仓库搬运车、割草机、农用拖拉机、行星探测车。这带来了两个新的难点。第一个是机械方面的：一个纯滚动而不打滑的车轮不能侧向移动，因此轮式机器人的独立速度数少于其位置坐标数。汽车在平面内有三个坐标（$x$、$y$、航向），却只有两个控制量（速度和转向），然而它仍能停到任何位置——这正是**非完整**（nonholonomic）系统的标志。第二个难点是知道机器人在哪里：机械臂通过正运动学从关节编码器读出自己的位姿，而一辆靠累加车轮转角来推算位置的车辆（**里程计**）会无界地积累误差，必须借助外部参照来校正自己。本章由滚动约束推导差速驱动机器人和类车机器人的运动学，证明这些约束不可积，精确计算里程计并研究其误差增长，设计路径跟踪控制器（纯追踪控制器和线性横向控制器），并介绍定位和占据栅格建图的概率观点，[[robotics/motion-planning-perception]]将进一步发展这一观点。平面内的位姿是$SE(2)$的元素，即[[robotics/rigid-motions]]的平面情形。

## 纯滚动约束 {#sec-constraints}

用**位姿**$\mathbf q = (x, y, \phi)$描述平面车辆：参考点的位置（对差速驱动机器人取车轮轴的中点）以及车体前进轴线的航向$\phi$，从世界坐标系的$x$轴起按逆时针方向量取。车轮在地面上纯滚动、不打滑，在接触点处施加两个条件：沿车轮轴线方向没有运动（无**侧滑**），前进运动等于轮缘速度（无**纵向打滑**）。

::: definition 普法夫约束、完整约束与非完整约束 {#def-nonholonomic}
关于速度为线性的一组$k$个速度约束$A(\mathbf q)\dot{\mathbf q} = \mathbf 0$，$A(\mathbf q)\in\mathbb R^{k\times n}$，称为**普法夫约束**（Pfaffian constraint）。如果它等价于$k$个位置约束$h_j(\mathbf q) = \text{常数}$，即$A$的各行可以组合成梯度$\nabla h_j$，则称它是**完整的**（可积的）；此时运动被限制在位形空间中一个$(n-k)$维曲面上。否则称它是**非完整的**：它限制每个位形处的运动方向，但不限制哪些位形可以到达。
:::

对单个车轮（或差速驱动机器人，其车轴中点的运动与一个车轮相同），无侧滑条件表明参考点的速度在车轴方向$(-\sin\phi, \cos\phi)$上没有分量：
$$
-\dot x\sin\phi + \dot y\cos\phi = 0 ,\qquad\text{即}\qquad A(\mathbf q) = \begin{bmatrix} -\sin\phi & \cos\phi & 0\end{bmatrix}.
$$ {#eq-noskid}

::: proposition 滚动约束是非完整的 {#prop-nonholonomic}
约束[[#eq-noskid]]不可积：不存在梯度非零的函数$h(x, y, \phi)$，使得对某个标量$\lambda(\mathbf q)$有$\nabla h = \lambda(\mathbf q)\,(-\sin\phi, \cos\phi, 0)$。因此，服从这一约束的机器人不被限制在$(x, y, \phi)$空间中的任何曲面上。
:::

::: proof
假设这样的$h$和$\lambda$存在。第三个分量给出$\partial h/\partial\phi = 0$，于是$h = h(x, y)$，其偏导数$h_x$、$h_y$与$\phi$无关。前两个分量给出$h_x = -\lambda\sin\phi$和$h_y = \lambda\cos\phi$。在任一固定的、$(h_x, h_y)\ne\mathbf 0$的点$(x, y)$处，矢量$(h_x, h_y)$是一个固定的非零矢量，但它被要求对**每一个**$\phi$都与$(-\sin\phi, \cos\phi)$平行——这是不可能的，因为不同$\phi$对应的方向$(-\sin\phi, \cos\phi)$并不都平行。因此处处有$(h_x, h_y) = \mathbf 0$，从而$\nabla h = \mathbf 0$，与假设矛盾。至于推论：利用下面独轮车模型的两个控制量（向前行驶、转向），可以从任一位姿到达任何其他位姿——转向朝着目标、直线驶向目标、再转到最终航向——所以没有任何曲面$h = \text{常数}$包含可达集。
:::

完整约束降低位形空间的维数；非完整约束只降低**速度**空间的维数。汽车可以停到任何位置（三维位形空间），但在任一时刻它只能沿两个独立方向运动。代价体现在规划上：两个位姿之间的最短路径不是直线，而要到达紧挨着当前位置侧面的位姿需要一系列操纵动作（侧方停车）。

## 差速驱动机器人 {#sec-diff-drive}

**差速驱动**机器人在一根公共车轴上有两个独立驱动、半径为$r$的车轮，间距为**轮距**$b$，另有用于保持平衡的被动万向脚轮。大多数室内服务机器人和扫地机器人都是这样构成的。

::: proposition 差速驱动运动学 {#prop-diff-drive}
设车轮角速度为$\omega_R$、$\omega_L$（向前滚动为正），则车轴中点的前进速度$v$和横摆角速度$\omega = \dot\phi$为
$$
v = \frac{r(\omega_R + \omega_L)}{2},\qquad \omega = \frac{r(\omega_R - \omega_L)}{b},
$$ {#eq-diff-drive}
位姿按**独轮车模型**变化：
$$
\dot x = v\cos\phi,\qquad \dot y = v\sin\phi,\qquad \dot\phi = \omega .
$$ {#eq-unicycle}
机器人绕**瞬时转动中心**（ICR）转动，该中心位于车轴线上、在中点左侧的有向距离$R = v/\omega = \frac b2\,\frac{\omega_R + \omega_L}{\omega_R - \omega_L}$处。
:::

::: proof
纯滚动使每个车轮的接触点瞬时静止，因此轮心以速度$v_R = r\omega_R$和$v_L = r\omega_L$向前运动（无侧滑意味着它们没有侧向分量）。车体是刚体并在平面内运动，所以任一点的速度为$\mathbf v_P = \mathbf v_O + \omega\hat{\mathbf k}\times(\mathbf p_P - \mathbf p_O)$。取$O$为车轴中点，并在车体坐标系（前方$\hat{\mathbf x}_b$、左方$\hat{\mathbf y}_b$）中表示矢量：右轮位于$-\frac b2\hat{\mathbf y}_b$，因此其速度为$v\hat{\mathbf x}_b + \omega\hat{\mathbf k}\times(-\frac b2\hat{\mathbf y}_b) = (v + \omega\frac b2)\hat{\mathbf x}_b$，左轮速度为$(v - \omega\frac b2)\hat{\mathbf x}_b$。令它们分别等于$r\omega_R$和$r\omega_L$并求解，即得[[#eq-diff-drive]]。中点在世界坐标中沿$\hat{\mathbf x}_b = (\cos\phi, \sin\phi)$运动，即得[[#eq-unicycle]]。ICR 是速度为零的点：它位于车轴线上$\hat{\mathbf y}_b$坐标为$\rho$处，满足$v - \omega\rho = 0$，即$\rho = v/\omega$。
:::

特殊情形：$\omega_R = \omega_L$时直线运动（$R = \infty$）；$\omega_R = -\omega_L$时原地转动（$R = 0$）；一个车轮停止时绕该车轮转动（$R = \pm b/2$）。

::: example 差速驱动的速度与转弯半径 {#ex-diff-drive}
一台机器人的车轮半径$r = 0.05\,\mathrm m$，轮距$b = 0.30\,\mathrm m$。右轮以$12\,\mathrm{rad/s}$转动，左轮以$8\,\mathrm{rad/s}$转动。求$v$、$\omega$和转弯半径；再求以$v = 0.4\,\mathrm{m/s}$沿半径$1\,\mathrm m$的圆向右转弯时的车轮转速。
::: solution
$v = 0.05(12 + 8)/2 = 0.50\,\mathrm{m/s}$，$\omega = 0.05(12 - 8)/0.30 = 0.667\,\mathrm{rad/s}$（逆时针，向左转），$R = v/\omega = 0.75\,\mathrm m$。用公式验算：$R = \frac b2\frac{20}{4} = 0.15\times5 = 0.75\,\mathrm m$ ✓。机器人每$2\pi/0.667 = 9.4\,\mathrm s$转完一圈。
向右转的圆：$\omega = -v/R = -0.4\,\mathrm{rad/s}$。反解[[#eq-diff-drive]]：$\omega_R = (v + \omega b/2)/r = (0.4 - 0.06)/0.05 = 6.8\,\mathrm{rad/s}$，$\omega_L = (v - \omega b/2)/r = (0.4 + 0.06)/0.05 = 9.2\,\mathrm{rad/s}$——外侧（左）轮转得更快，理应如此。
:::
:::

## 类车机器人 {#sec-car}

汽车、拖拉机和许多户外机器人通过偏转前轮来转向。**运动学自行车模型**把两个前轮合并为前轴处的一个转向轮，把两个后轮合并为后轴处的一个固定轮，两者相距**轴距**$L$。取参考点为后轴中点，速度为$v$，转向角为$\delta$：
$$
\dot x = v\cos\phi,\qquad \dot y = v\sin\phi,\qquad \dot\phi = \frac{v}{L}\tan\delta .
$$ {#eq-bicycle}
后轮不能侧滑，所以 ICR 位于后轴线上；前轮不能侧滑，所以 ICR 也位于过前轮且垂直于前轮的直线上。两线交于距后轴中点$R = L/\tan\delta$处，由此得$\dot\phi = v/R$。与差速驱动不同，汽车不能原地转向：$\lvert\delta\rvert\le\delta_{\max}$规定了**最小转弯半径**$R_{\min} = L/\tan\delta_{\max}$。

对于真实的四轮车辆，四个车轮必须共用同一个 ICR，所以内侧前轮的转向角必须大于外侧前轮——这就是**阿克曼转向几何**（Ackermann steering geometry）。设前轮轮距为$w$，后轴中点处的转弯半径为$R$，则内、外侧转向角为
$$
\delta_i = \arctan\frac{L}{R - w/2},\qquad \delta_o = \arctan\frac{L}{R + w/2},\qquad \cot\delta_o - \cot\delta_i = \frac wL .
$$

::: example 类车机器人的转弯圆 {#ex-car}
一台类车配送机器人的轴距$L = 2.7\,\mathrm m$，前轮轮距$w = 1.5\,\mathrm m$，最大转向角为$35^\circ$（自行车模型）。求后轴中点处的最小转弯半径，以及转弯半径$R = 6\,\mathrm m$时两个前轮的阿克曼转向角。
::: solution
$R_{\min} = 2.7/\tan35^\circ = 2.7/0.7002 = 3.86\,\mathrm m$。对$R = 6\,\mathrm m$：$\delta_i = \arctan(2.7/5.25) = 27.2^\circ$，$\delta_o = \arctan(2.7/6.75) = 21.8^\circ$，等效的自行车模型转向角为$\arctan(2.7/6) = 24.2^\circ$，介于两者之间。验算：$\cot21.8^\circ - \cot27.2^\circ = 2.500 - 1.944 = 0.556 = 1.5/2.7$ ✓。如果两个车轮都转到$24.2^\circ$（平行转向），每次转弯时车轮都会侧向擦地，既磨损轮胎又破坏里程计。
:::
:::

::: remark 全向底盘
车轮可以设计成能沿第二个方向自由滚动：**麦克纳姆轮**（mecanum wheel）在轮缘上以$45^\circ$安装一圈辊子，四个这样的车轮独立驱动，就能让平台沿任意方向平移并同时转动。这样的底盘有三个独立速度，因而没有速度约束，可以像完整机器人那样进行规划——代价是辊子会打滑、磨损并传递振动，里程计也不如普通车轮精确。
:::

## 里程计 {#sec-odometry}

用车轮编码器测得的速度对[[#eq-unicycle]]积分即得位姿——这就是**航位推算**或**里程计**。编码器给出每个采样周期内的车轮转角增量$\Delta\varphi_R$、$\Delta\varphi_L$，由此得到中点行驶的距离和航向变化
$$
\Delta s = \frac{r(\Delta\varphi_R + \Delta\varphi_L)}{2},\qquad \Delta\phi = \frac{r(\Delta\varphi_R - \Delta\varphi_L)}{b}.
$$

::: proposition 精确的里程计更新 {#prop-odometry}
若在该周期内$v$和$\omega$为常数（机器人沿圆弧运动），则位姿更新为
$$
\begin{aligned}
x_{k+1} &= x_k + \Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}\,\cos\!\Big(\phi_k + \frac{\Delta\phi}{2}\Big),\\
y_{k+1} &= y_k + \Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}\,\sin\!\Big(\phi_k + \frac{\Delta\phi}{2}\Big),\qquad \phi_{k+1} = \phi_k + \Delta\phi ,
\end{aligned}
$$ {#eq-odometry}
当$\Delta\phi = 0$时，因子$\sin(\Delta\phi/2)/(\Delta\phi/2)$取为 1。略去该因子得到二阶（中点）近似；用$\phi_k$代替$\phi_k + \Delta\phi/2$得到一阶（欧拉）近似。
:::

::: proof
当$v$为常数且$\omega \ne 0$时，$\phi(t) = \phi_k + \omega t$，$\dot x = v\cos(\phi_k + \omega t)$，于是在该周期内$x_{k+1} - x_k = \frac v\omega\big(\sin(\phi_k + \Delta\phi) - \sin\phi_k\big)$，类似地$y_{k+1} - y_k = -\frac v\omega\big(\cos(\phi_k + \Delta\phi) - \cos\phi_k\big)$，其中$\Delta\phi = \omega\Delta t$，$v/\omega = \Delta s/\Delta\phi$。和差化积恒等式$\sin(a + c) - \sin a = 2\cos(a + c/2)\sin(c/2)$和$\cos(a + c) - \cos a = -2\sin(a + c/2)\sin(c/2)$把它们化为[[#eq-odometry]]：位移是圆弧的**弦**，长度为$2\frac{\Delta s}{\Delta\phi}\sin\frac{\Delta\phi}{2}$，方向为平均航向。当$\Delta\phi\to0$时，$\sin(\Delta\phi/2)/(\Delta\phi/2)\to1$，更新趋于沿$\phi_k$方向的直线步长$\Delta s$，与$\omega = 0$的情形连续衔接。
:::

::: example 精确、中点与欧拉里程计 {#ex-odometry}
一台$r = 0.05\,\mathrm m$、$b = 0.30\,\mathrm m$的机器人从$(0, 0, 0)$出发；在一个（故意取得很长的）周期内，编码器报告$\Delta\varphi_R = 12\,\mathrm{rad}$和$\Delta\varphi_L = 4\,\mathrm{rad}$。分别用三种更新计算新位姿。
::: solution
$\Delta s = 0.05\times16/2 = 0.40\,\mathrm m$；$\Delta\phi = 0.05\times8/0.30 = 1.333\,\mathrm{rad}$（$76.4^\circ$）；圆弧半径为$\Delta s/\Delta\phi = 0.30\,\mathrm m$。
**精确：** 因子为$\sin(0.6667)/0.6667 = 0.9276$，弦长$0.371\,\mathrm m$，平均航向$0.6667\,\mathrm{rad}$：$(x, y) = (0.371\cos0.6667,\ 0.371\sin0.6667) = (0.2916, 0.2294)\,\mathrm m$。（直接计算：$0.30\sin1.333 = 0.2916$，$0.30(1 - \cos1.333) = 0.2294$ ✓。）
**中点：** $(0.40\cos0.6667,\ 0.40\sin0.6667) = (0.3144, 0.2473)\,\mathrm m$——偏差$0.029\,\mathrm m$。
**欧拉：** $(0.40, 0)\,\mathrm m$——偏差$0.25\,\mathrm m$：它先让机器人直线前进，然后再转向。
三者都给出$\phi = 1.333\,\mathrm{rad}$。在实际的采样频率下（比如$100\,\mathrm{Hz}$，每步$\Delta\phi$只有几毫弧度），三种更新每步的差别可以忽略；当编码器数据到达得很慢或成批到达时，精确形式才显得重要。
:::
:::

### 里程计为何会漂移

里程计对小误差进行累加：与名义值不同的车轮半径（轮胎磨损、负载）、不确定的有效轮距$b$（宽轮胎以一片区域接触地面）、在光滑地面和不平地面上的车轮打滑，以及编码器的量化误差。航向误差的危害最大，因为航向误差$\delta\phi$会把此后每一米的行驶都变成$\delta\phi$米的横向误差。系统性的半径失配会使一台自以为在直线行驶的机器人实际上沿圆弧运动，此时横向误差随距离的**平方**增长。

::: widget plot
f: (0.3/(eps/100))*(1 - cos(x*(eps/100)/0.3))
x: 0, 20
y: 0, 2
sliders: eps=0.5:0.1:2:0.1
labels: \text{横向误差 (m)}
caption: 一台差速驱动机器人（$b = 0.30\,\mathrm m$）按其里程计"直线"行驶$x$米时的横向位置误差，其中右轮实际比左轮大$\varepsilon$（以百分数计，见滑块）。机器人实际上沿半径约为$b/\varepsilon$的圆弧运动，因此误差为$\frac b\varepsilon(1 - \cos(x\varepsilon/b))$，短距离时$\approx x^2\varepsilon/(2b)$。$0.5\%$的失配——还不及软轮胎上几千克负载的影响——在$6\,\mathrm m$后就已产生约$0.3\,\mathrm m$的误差，并按平方增长。标定$r_R/r_L$和$b$（例如沿两个方向各走正方形并测量闭合误差）能减小但永远无法消除这种漂移。
:::

## 路径跟踪 {#sec-path-following}

规划器给出一条几何路径；车辆必须在存在扰动和建模误差的情况下以一定速度跟踪它。对于非完整车辆，有两种经典控制器可以做到这一点。

::: proposition 纯追踪曲率 {#prop-pure-pursuit}
设目标点位于路径上、与机器人参考点相距$L_d$（**前视距离**），与机器人航向成$\alpha$角——等价地，其车体坐标为$(x_g, y_g)$，$x_g^2 + y_g^2 = L_d^2$。过参考点、与当前航向相切并经过目标点的唯一圆弧的曲率为
$$
\kappa = \frac{2\sin\alpha}{L_d} = \frac{2y_g}{L_d^2},
$$ {#eq-pure-pursuit}
纯追踪（pure pursuit）指令为$\omega = v\kappa$（独轮车模型）或$\delta = \arctan(L\kappa)$（自行车模型）。
:::

::: proof
在车体坐标系原点处与航向相切的圆弧，其圆心位于车体$y$轴上的$(0, \rho)$处，$\rho = 1/\kappa$（向左为正）。目标点在该圆弧上当且仅当$x_g^2 + (y_g - \rho)^2 = \rho^2$，即$x_g^2 + y_g^2 = 2\rho y_g$，故$\kappa = 1/\rho = 2y_g/L_d^2$。由$y_g = L_d\sin\alpha$，这就是$2\sin\alpha/L_d$。自行车模型关系$\dot\phi = v\tan\delta/L$与$\dot\phi = v\kappa$联立，得$\tan\delta = L\kappa$。
:::

::: example 纯追踪的一步 {#ex-pure-pursuit}
一台差速驱动机器人（$r = 0.05\,\mathrm m$，$b = 0.30\,\mathrm m$）以$v = 0.5\,\mathrm{m/s}$运动，发现前方$1.5\,\mathrm m$处的路径点位于车体坐标$(1.2, 0.9)\,\mathrm m$处。计算指令曲率、横摆角速度和车轮转速。
::: solution
验算$L_d = \sqrt{1.44 + 0.81} = 1.5\,\mathrm m$ ✓。$\kappa = 2\times0.9/2.25 = 0.80\,\mathrm{m^{-1}}$（半径$1.25\,\mathrm m$，向左转）；$\alpha = \operatorname{atan2}(0.9, 1.2) = 36.9^\circ$，$2\sin\alpha/L_d = 2\times0.6/1.5 = 0.80$ ✓。$\omega = v\kappa = 0.40\,\mathrm{rad/s}$，于是$\omega_R = (0.5 + 0.4\times0.15)/0.05 = 11.2\,\mathrm{rad/s}$，$\omega_L = (0.5 - 0.06)/0.05 = 8.8\,\mathrm{rad/s}$。在下一个控制周期中，会在路径上前方$L_d$处重新选取目标点，因此机器人实际上从不走完这段圆弧；这段圆弧只是一个不断重新计算的局部规划。
:::
:::

前视距离是调节旋钮：$L_d$短时跟踪紧密，但会振荡，并对路径噪声反应剧烈；$L_d$长时运动平顺，但会抄近路切角。常用的规则是使$L_d$与速度成正比。

对于直线路径，线性控制器能给出更多的理解。设路径为$x$轴，横向误差为$y$，航向误差为$\phi$。对小误差，[[#eq-unicycle]]给出$\dot y = v\sin\phi \approx v\phi$和$\dot\phi = \omega$。反馈$\omega = -k_1y - k_2\phi$导出
$$
\ddot y + k_2\dot y + vk_1y = 0 ,
$$ {#eq-lateral}
这是一个二阶系统，$\omega_n = \sqrt{vk_1}$，$\zeta = k_2/(2\sqrt{vk_1})$：取$k_1 = \omega_n^2/v$，$k_2 = 2\zeta\omega_n$。横向误差增益必须与速度成反比，才能在时间上保持相同的响应——高速时航向的微小变化就会产生很大的横向速度。

::: example 横向控制器 {#ex-lateral}
一台独轮车机器人以$v = 1.0\,\mathrm{m/s}$运动，须以$\omega_n = 1.0\,\mathrm{rad/s}$和$\zeta = 0.7$跟踪$x$轴。求增益，以及它从直线左侧$0.5\,\mathrm m$处平行于直线出发时的初始横摆角速度指令。估计误差衰减得有多快。
::: solution
$k_1 = \omega_n^2/v = 1.0\,\mathrm{rad/(m\,s)}$，$k_2 = 2\zeta\omega_n = 1.4\,\mathrm{s^{-1}}$。初始时$y = 0.5\,\mathrm m$，$\phi = 0$：$\omega = -0.5\,\mathrm{rad/s}$（向右转，驶向直线）。误差包络按$e^{-\zeta\omega_nt} = e^{-0.7t}$衰减，因此降到初始误差的$10\%$约需$\ln10/0.7 = 3.3\,\mathrm s$，约行驶$3.3\,\mathrm m$，在另一侧的超调量为$e^{-\pi\zeta/\sqrt{1-\zeta^2}} = 4.6\%$（$2.3\,\mathrm{cm}$）。对非线性模型（$\dot y = v\sin\phi$）进行仿真，得到驶向直线途中的最大航向误差为$0.23\,\mathrm{rad}$（$13^\circ$），并且从$t = 2.6\,\mathrm s$起$\lvert y\rvert < 5\,\mathrm{cm}$——角度很小，所以线性化是合理的。
:::
:::

::: widget phaseplane
f: y
g: -w*x - k2*y
x: -1, 1
y: -1, 1
sliders: w=1:0.1:6:0.1; k2=1.4:0:3:0.1
points: 0.5, 0; -0.5, 0.3; 0.8, -0.8
caption: 线性化的路径跟踪误差动态[[#eq-lateral]]（横轴：横向误差$y$，单位 m；纵轴：其变化率$\dot y = v\phi$，单位 m/s），其中$w = vk_1$，阻尼增益为$k_2$；初始值$w = 1$、$k_2 = 1.4$即[[#ex-lateral]]中的取值。轨线平缓地盘旋进入原点——机器人位于路径上且航向正确。把$k_2$减小到接近 0，机器人就会沿路径左右摆动；增大$w$（提高速度而$k_1$不变），振荡变得更快、阻尼更小，这就是$k_1$应按$1/v$缩放的原因。
:::

::: remark 类车机器人的最短路径
对于只能前进且有最小转弯半径的汽车，Dubins 于 1957 年证明：两个位姿之间的最短路径至多由三段组成，每段是一条直线段（S）或一段最小半径的圆弧（C）：即 CSC 或 CCC 两种模式之一。允许倒车（Reeds 与 Shepp）则增加了尖点和更多模式。这些路径被用作类车车辆规划器中的局部连接（[[robotics/motion-planning-perception]]）。
:::

::: warning 不要把非完整机器人当作完整机器人来控制
从当前位置**朝向**目标点指令一个速度的控制器——这对机械臂或全向底盘是很自然的——会要求差速驱动机器人产生它无法产生的侧向速度。把该指令投影到前进方向上，又会使机器人驶过目标或绕着目标打转。此外，任何光滑的时不变状态反馈都不能把非完整车辆镇定到单个位姿（Brockett 条件），因此位姿调节控制器是不连续的或时变的，实际系统镇定到一条**路径**（如上所述）而不是一个点，最后再用单独的操纵动作调整最终航向。
:::

## 定位与建图 {#sec-localisation}

由于里程计会漂移，移动机器人必须把它感知到的与它预期的进行比较：位置已知的路标、已知地图中的墙壁、户外的卫星定位。由于每个传感器都有噪声，机器人对自身位姿的认识是一个概率分布——**置信度**$\mathrm{bel}(\mathbf q_k)$——而不是单个位姿。

::: algorithm 贝叶斯滤波 {#alg-bayes}
输入：置信度$\mathrm{bel}(\mathbf q_{k-1})$，控制量$\mathbf u_k$（例如里程计增量），测量$\mathbf z_k$。
1. 用运动模型$p(\mathbf q_k\mid\mathbf q_{k-1},\mathbf u_k)$进行**预测**：$\overline{\mathrm{bel}}(\mathbf q_k) = \int p(\mathbf q_k\mid\mathbf q_{k-1},\mathbf u_k)\,\mathrm{bel}(\mathbf q_{k-1})\,d\mathbf q_{k-1}$。不确定性增大。
2. 用测量模型$p(\mathbf z_k\mid\mathbf q_k)$进行**校正**：$\mathrm{bel}(\mathbf q_k) = \eta\,p(\mathbf z_k\mid\mathbf q_k)\,\overline{\mathrm{bel}}(\mathbf q_k)$，其中$\eta$为归一化常数。不确定性减小。
:::

预测就是全概率公式，校正就是贝叶斯公式（[条件概率](/learn/maths/lesson.php?c=probability&l=conditional-probability)）；使递推成立的假设是马尔可夫性——给定当前位姿，过去的测量和控制不再提供更多信息。各种实现的区别在于如何表示置信度：概率栅格（直方图滤波）、高斯分布（[[robotics/motion-planning-perception]]中的卡尔曼滤波），或一组样本（粒子滤波，广泛用于已知地图中的定位）。

**建图**是反过来的问题：已知位姿，估计地图。**占据栅格**把地面划分成单元格，每个单元格有一个被占据的概率，用贝叶斯公式独立地更新。采用**对数几率**$\ell = \ln\frac{p}{1-p}$可以把更新变成加法：每次测量加上$\ln\frac{p(\text{占据}\mid z)}{1 - p(\text{占据}\mid z)}$（减去先验的对数几率），因此一个反复被观测为占据的单元格会线性地积累证据。

::: example 一个占据栅格单元格 {#ex-occupancy}
一个单元格初始时$p = 0.5$（$\ell = 0$）。测距传感器的逆模型表明：单元格中的一次"命中"意味着它以概率$0.7$被占据，而光束穿过它（"未命中"）意味着它以概率$0.4$被占据。经过两次命中、再一次未命中之后，占据概率是多少？
::: solution
命中：$\ell_{\text{命中}} = \ln(0.7/0.3) = 0.847$。未命中：$\ell_{\text{未命中}} = \ln(0.4/0.6) = -0.405$。两次命中后，$\ell = 1.695$，$p = 1/(1 + e^{-1.695}) = 0.845$。未命中后，$\ell = 1.289$，$p = 0.784$。该单元格仍很可能被占据，但确定性降低了。可加性使更新计算量很小（每束光对每个单元格一次加法）且对称：测量的顺序无关紧要。实现中会把$\ell$限制在某个范围内，例如$[-4, 4]$，以便在环境变化（一扇门打开）时单元格的状态还能再次改变。
:::
:::

在建图的同时在图中定位——**同时定位与建图**（SLAM）——把两个问题耦合在一起：位姿误差会破坏地图，地图误差又会破坏定位。SLAM 的概率表述始于 Smith 和 Cheeseman 1986 年关于空间不确定性的表示与传播的工作，现代系统则结合里程计、激光雷达或相机，并对整条轨迹进行优化。

::: quiz
一台差速驱动机器人的$\omega_R = 10\,\mathrm{rad/s}$，$\omega_L = -10\,\mathrm{rad/s}$。它的瞬时转动中心在哪里？
- [ ] 在无穷远处：它直线行驶
- [x] 在车轴中点：它原地转动
- [ ] 在左轮处
- [ ] 由于$v = 0$，ICR 无定义
::: solution
$v = r(10 - 10)/2 = 0$，$\omega = 20r/b \ne 0$，故$R = v/\omega = 0$：机器人绕车轴中点旋转。只有当$v$和$\omega$都为零时 ICR 才无定义（$\omega = 0$时 ICR 在无穷远处）。
:::
:::

::: history
杜宾斯（L. E. Dubins）于 1957 年在《美国数学杂志》（*American Journal of Mathematics*）上刻画了有界曲率的最短路径，远早于类车机器人对它的需要。库尔特（R. Craig Coulter）1992 年的卡内基梅隆大学技术报告《纯追踪路径跟踪算法的实现》（"Implementation of the pure pursuit path tracking algorithm"）记录了用于 Navlab 自主车辆的几何追踪律；它至今仍是使用最广泛的路径跟踪器之一。史密斯（Randall Smith）和奇斯曼（Peter Cheeseman）1986 年发表在《国际机器人研究杂志》（*International Journal of Robotics Research*）上的论文《论空间不确定性的表示与估计》（"On the representation and estimation of spatial uncertainty"），以及 Smith、Self 和 Cheeseman 的随机地图，奠定了定位和 SLAM 的概率基础，并在 Thrun、Burgard 和 Fox 的《概率机器人》（*Probabilistic Robotics*，2005）中得到发展。
:::

::: summary
- 无侧滑滚动给出普法夫约束$-\dot x\sin\phi + \dot y\cos\phi = 0$，它是非完整的：限制速度，但不限制可达位姿。
- 差速驱动：$v = r(\omega_R + \omega_L)/2$，$\omega = r(\omega_R - \omega_L)/b$，独轮车模型$\dot x = v\cos\phi$，$\dot y = v\sin\phi$，$\dot\phi = \omega$；ICR 位于车轴线上$R = v/\omega$处。
- 类车机器人：$\dot\phi = v\tan\delta/L$，$R_{\min} = L/\tan\delta_{\max}$；阿克曼几何$\cot\delta_o - \cot\delta_i = w/L$。
- 精确里程计沿圆弧的弦移动：沿平均航向移动$\Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}$。里程计会无界漂移；航向误差使位置误差随距离平方增长。
- 纯追踪：朝向前视点的曲率$\kappa = 2\sin\alpha/L_d = 2y_g/L_d^2$；线性横向控制器给出$\ddot y + k_2\dot y + vk_1y = 0$。
- 定位是一个贝叶斯滤波（用运动模型预测，用测量模型校正）；占据栅格以对数几率对单元格进行加法更新。
:::

## 习题

::: exercise 转弯半径 {#exr-radius level=1 check="1"}
一台差速驱动机器人的$r = 0.10\,\mathrm m$，$b = 0.50\,\mathrm m$；其车轮转速为$\omega_R = 10\,\mathrm{rad/s}$和$\omega_L = 6\,\mathrm{rad/s}$。求$v$、$\omega$和转弯半径。（以 m 为单位输入$R$。）
::: solution
$v = 0.1\times16/2 = 0.8\,\mathrm{m/s}$，$\omega = 0.1\times4/0.5 = 0.8\,\mathrm{rad/s}$，$R = v/\omega = 1.0\,\mathrm m$（向左）。验算：$\frac b2\frac{16}{4} = 0.25\times4 = 1.0$ ✓。
:::
:::

::: exercise 由指令求车轮转速 {#exr-wheels level=1 check="11"}
一台$r = 0.05\,\mathrm m$、$b = 0.30\,\mathrm m$的机器人须以$v = 0.4\,\mathrm{m/s}$、$\omega = 1.0\,\mathrm{rad/s}$运动。求两个车轮的转速。（以 rad/s 为单位输入$\omega_R$。）
::: solution
$\omega_R = (v + \omega b/2)/r = (0.4 + 0.15)/0.05 = 11\,\mathrm{rad/s}$；$\omega_L = (0.4 - 0.15)/0.05 = 5\,\mathrm{rad/s}$。转弯半径为$0.4\,\mathrm m$。
:::
:::

::: exercise 最小转弯半径 {#exr-rmin level=1 check="1.7321"}
一台小型类车机器人的轴距$L = 1.0\,\mathrm m$，最大转向角为$30^\circ$。它在后轴中点处的最小转弯半径是多少？（以 m 为单位输入，保留四位小数。）
::: solution
$R_{\min} = L/\tan30^\circ = 1.0/0.5774 = 1.7321\,\mathrm m$。要在走廊中掉头，它需要至少约$2R_{\min}$加上自身宽度的宽度，或者进行多点掉头。
:::
:::

::: exercise 纯追踪曲率 {#exr-pursuit level=2 check="0.2353"}
前视点位于车体坐标$(2.0, 0.5)\,\mathrm m$处。纯追踪指令的曲率是多少？（以$\mathrm{m^{-1}}$为单位输入$\kappa$，保留四位小数。）
::: solution
$L_d^2 = 4 + 0.25 = 4.25\,\mathrm{m^2}$，$\kappa = 2\times0.5/4.25 = 0.2353\,\mathrm{m^{-1}}$（半径$4.25\,\mathrm m$，向左）。用$\alpha = \operatorname{atan2}(0.5, 2.0) = 14.04^\circ$验算：$2\sin\alpha/L_d = 2\times0.2425/2.0616 = 0.2353$ ✓。
:::
:::

::: exercise 阿克曼内侧车轮 {#exr-ackermann level=2 check="30.17"}
一辆$L = 2.5\,\mathrm m$、前轮轮距$w = 1.4\,\mathrm m$的车辆沿半径$R = 5\,\mathrm m$（后轴中点处）的圆行驶。求两个前轮的转向角。（以度为单位输入内侧转向角，保留两位小数。）
::: solution
$\delta_i = \arctan(2.5/(5 - 0.7)) = \arctan0.5814 = 30.17^\circ$；$\delta_o = \arctan(2.5/5.7) = 23.68^\circ$。验算：$\cot23.68^\circ - \cot30.17^\circ = 2.280 - 1.720 = 0.560 = 1.4/2.5$ ✓。
:::
:::

::: exercise 一步里程计 {#exr-odom level=2 check="0.30*sin(4/3)"}
对[[#ex-odometry]]，在$v$和$\omega$为常数的条件下直接积分独轮车模型，以验证精确更新。取周期为$1\,\mathrm s$。（以 m 为单位精确输入$x$——可以输入诸如 0.3*sin(4/3) 的表达式。）
::: solution
$v = 0.40\,\mathrm{m/s}$，$\omega = 4/3\,\mathrm{rad/s}$。$x(1) = \int_0^1v\cos(\omega t)\,dt = \frac v\omega\sin\omega = 0.30\sin(4/3) = 0.2916\,\mathrm m$；$y(1) = \frac v\omega(1 - \cos\omega) = 0.2294\,\mathrm m$，与弦公式一致。
:::
:::

::: exercise 标定轮距 {#exr-track level=3 check="35.64"}
一台机器人的里程计使用$b = 0.300\,\mathrm m$，但其有效轮距为$0.303\,\mathrm m$。指令它原地旋转，直到里程计报告转满十圈。(a) 它实际转过多少？航向误差是多少？(b) 说明在两个方向上各做一次这类试验，如何把轮距误差与车轮半径失配区分开。（以度为单位输入航向误差的大小，保留两位小数。）
::: solution
(a) 里程计计算$\Delta\phi_{\text{里程计}} = r(\Delta\varphi_R - \Delta\varphi_L)/b_{\text{名义}}$，真实转角为$r(\Delta\varphi_R - \Delta\varphi_L)/b_{\text{真实}}$，所以真实转角为$3600^\circ\times0.300/0.303 = 3564.36^\circ$：机器人少转了$35.64^\circ$。(b) 轮距误差在两个方向上都以同一因子缩放每次转动（顺时针和逆时针转动都偏小或都偏大），而车轮半径失配会附加一个与行驶距离成正比的转动，其符号与转向方向无关——它使机器人在直线段上总是向同一侧偏弯。因此，沿顺时针和逆时针各走一个正方形路径并测量闭合误差，就能分别估计并校正这两种误差（这正是 Borenstein 与 Feng 的 UMBmark 试验的思路）。
:::
:::

::: exercise 由约束理解侧方停车 {#exr-parking level=3}
独轮车只能前进/后退（$v$）和转向（$\omega$）。证明：从$(0, 0, 0)$出发，"前进$\varepsilon$、转$\varepsilon$、后退$\varepsilon$、转回$\varepsilon$"这一序列使它侧向移动约$\varepsilon^2$（精确到二阶）。把这一结果与[[#prop-nonholonomic]]的不可积性证明以及汽车侧方停车的方式联系起来。
::: solution
跟踪位姿（小角度运算保留到二阶）。前进$\varepsilon$：$(\varepsilon, 0, 0)$。转$\varepsilon$：$(\varepsilon, 0, \varepsilon)$。沿航向$\varepsilon$后退$\varepsilon$：$(\varepsilon - \varepsilon\cos\varepsilon,\ -\varepsilon\sin\varepsilon,\ \varepsilon) \approx (\varepsilon^3/2, -\varepsilon^2, \varepsilon)$。转回：$(\approx0, -\varepsilon^2, 0)$。净位移是**侧向**的$\varepsilon^2$（这里向右；把转向反过来则向左），航向没有净变化——运动恰好发生在瞬时约束所禁止的方向上。用控制理论的语言说，侧向方向是"行驶"和"转向"两个矢量场$(\cos\phi, \sin\phi, 0)$与$(0, 0, 1)$的李括号，它在相差一个符号的意义下等于$(-\sin\phi, \cos\phi, 0)$，位于这两个场张成的空间之外：这就是该约束不能积分成一个曲面的原因。汽车侧方停车依据的是同一原理，只是把转向换成了边行驶边打方向盘；由于侧向位移只是操纵幅度的二阶量，在狭窄空间中需要来回好几次。
:::
:::

## 延伸阅读

Siegwart、Nourbakhsh 与 Scaramuzza 的教材以入门水平讲述移动机器人的车轮运动学、里程计误差和定位；Lynch 与 Park 的教材讲述轮式机器人的非完整约束、能控性和运动规划；Thrun、Burgard 与 Fox 的教材发展了贝叶斯滤波、占据栅格和 SLAM。
