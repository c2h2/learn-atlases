切削轮廓的机床、给电路板上料的贴装机器人、光刻机中的晶圆工作台以及3D打印机的打印头，执行的都是同一项任务：使一个机械轴快速而准确地跟随规定的位置-时间关系，尽管存在摩擦、变化的负载和机构的弹性。这就是**运动控制**。它把本课程前面的全部内容——电机及其驱动器（[[mechatronics/electric-actuators]]）、编码器（[[mechatronics/sensors]]）、采样控制器（[[mechatronics/microcontrollers]]）——与[[control-systems/pid-control]]和[[control-systems/frequency-response]]中的控制理论结合在一起。

本章沿着现代伺服轴的信号通路展开。**轨迹发生器**把运动指令（“移动到300 mm”）转换为位置、速度和加速度的平滑参考曲线。**反馈控制器**——通常是位置环、速度环和电流环的串级——修正误差。**前馈**在任何误差出现之前就提供运动所需的转矩。而性能极限来自**摩擦**、**采样与量化**以及**机械谐振**，我们对它们逐一建模并定量分析。

## 轴的模型 {#sec-axis-model}

考虑一个旋转轴：转动惯量为$J_m$的电机通过传动装置驱动负载，折算到电机轴上的总惯量为$J = J_m + J_L/N^2$（[[mechatronics/electric-actuators#prop-inertia-match]]）。驱动器的电流环——在驱动器内部以一到几千赫兹的带宽闭合——使电机转矩几乎立即跟随转矩指令$u$。于是刚性旋转组件的受力图上有三个转矩：电机转矩$u$、摩擦转矩$-T_f(\omega)$以及负载或扰动转矩$-T_d$（重力、切削力）。由转动的牛顿第二定律得
$$
J\ddot\theta = u - T_f(\dot\theta) - T_d .
$$ {#eq-axis}
忽略摩擦和扰动，从转矩指令到转角的被控对象是一个**双积分器**，$\Theta(s)/U(s) = 1/(Js^2)$。由导程为$p$的滚珠丝杠驱动的直线轴是同一模型，其$J$中包含$m(p/2\pi)^2$；直线电机也是同一模型，只是以质量代替惯量、以力代替转矩。这个模型是出发点；柔度稍后再加入。

## 轨迹生成 {#sec-trajectory}

如果给控制器一个参考位置的阶跃，它会在第一个采样时刻要求极大的转矩，使驱动器饱和、产生超调，并激起机器的每一个谐振。因此参考输入应是一条平滑的曲线，它遵守轴的速度限值$v_{\max}$和加速度限值$a_{\max}$（较好的系统还限制**加加速度**（jerk），即加速度的变化率）。

::: proposition 梯形速度曲线 {#prop-trapezoid}
从静止到静止移动距离$d$，充分利用速度限值$v_{\max}$和加速度限值$a_{\max}$，所需的最短时间为
$$
T = \begin{cases} \dfrac{d}{v_{\max}} + \dfrac{v_{\max}}{a_{\max}}, & d \ge \dfrac{v_{\max}^2}{a_{\max}} \quad\text{（梯形）},\\[2ex] 2\sqrt{\dfrac{d}{a_{\max}}}, & d < \dfrac{v_{\max}^2}{a_{\max}}\quad\text{（三角形，峰值速度 } \sqrt{a_{\max}d}\text{）}. \end{cases}
$$ {#eq-trapezoid}
在梯形情形中，加速段和减速段各持续$t_a = v_{\max}/a_{\max}$。
:::

::: proof
以$a_{\max}$加速$t_a = v_{\max}/a_{\max}$，走过$\tfrac12a_{\max}t_a^2 = v_{\max}^2/(2a_{\max})$；对称地减速走过同样的距离。若$d \ge v_{\max}^2/a_{\max}$，剩余距离$d - v_{\max}^2/a_{\max}$以$v_{\max}$走完，用时$d/v_{\max} - v_{\max}/a_{\max}$，所以总时间为$2t_a + d/v_{\max} - t_a = d/v_{\max} + v_{\max}/a_{\max}$。否则轴必须在达到$v_{\max}$之前就开始减速：加速时间$t_1$、减速时间$t_1$走过$a_{\max}t_1^2 = d$，故$t_1 = \sqrt{d/a_{\max}}$，$T = 2t_1$，峰值速度为$a_{\max}t_1 = \sqrt{a_{\max}d}$。对给定的限值，这条曲线是时间最优的：每一时刻轴要么以允许的最大程度加速或减速，要么以全速运动，而速度曲线下的面积（距离）不可能在更短的时间内达到而不超过某个限值。
:::

梯形曲线在其拐角处加加速度为无穷大：加速度——因而电机转矩——发生跳变。这些跳变激起结构谐振，运动结束后的残余振动往往比运动本身衰减得还慢。**S形曲线**（限制加加速度的曲线）用加速度的斜坡代替每个拐角，使运动时间略有延长，但减小了振动和磨损。多轴机床沿路径使用同样的思想：**插补器**在每个采样时刻计算所有轴的参考位置，使刀具以编程的进给速度沿直线或圆弧运动。

::: example 点到点运动 {#ex-trapezoid}
一个$v_{\max} = 0.50\ \mathrm{m/s}$、$a_{\max} = 2.5\ \mathrm{m/s^2}$的直线轴移动(a) $0.30\ \mathrm{m}$，(b) $0.050\ \mathrm{m}$。求运动时间和峰值速度。运动质量为$20\ \mathrm{kg}$，轴由导程为$10\ \mathrm{mm}$的滚珠丝杠驱动；求加速期间的电机转矩（忽略电机和丝杠的惯量以及摩擦）和电机峰值转速。
::: solution
$v_{\max}^2/a_{\max} = 0.25/2.5 = 0.10\ \mathrm{m}$。

(a) $d = 0.30 \ge 0.10$：梯形。$T = 0.30/0.50 + 0.50/2.5 = 0.60 + 0.20 = 0.80\ \mathrm{s}$；$t_a = 0.20\ \mathrm{s}$；峰值速度$0.50\ \mathrm{m/s}$。

(b) $d = 0.050 < 0.10$：三角形。$T = 2\sqrt{0.050/2.5} = 2\sqrt{0.020} = 0.283\ \mathrm{s}$；峰值速度$\sqrt{2.5 \times 0.050} = 0.354\ \mathrm{m/s}$。

转矩：力$ma = 20 \times 2.5 = 50\ \mathrm{N}$；经导程为$p$的丝杠，转矩为$Fp/(2\pi) = 50 \times 0.010/(2\pi) = 0.080\ \mathrm{N\,m}$。电机峰值转速$0.50/0.010 = 50\ \mathrm{rev/s} = 3000\ \mathrm{rev/min}$。

合理性检查：速度曲线下的距离分别为$\tfrac12(0.80 + 0.40) \times 0.50 = 0.30\ \mathrm{m}$和$\tfrac12 \times 0.283 \times 0.354 = 0.050\ \mathrm{m}$。短行程运动没有一刻处于全速，所以对短行程，决定循环时间的是加速度而不是最高速度——这就是贴装机要按极高的加速度设计的原因。
:::
:::

::: widget plot
title: 梯形速度曲线
f: max(0, min(min(a*x, min(v, sqrt(a*0.3))), a*(0.3/min(v, sqrt(a*0.3)) + min(v, sqrt(a*0.3))/a - x)))
x: 0, 1.6
y: 0, 1
sliders: v=0.5:0.2:1:0.05; a=2.5:0.5:10:0.1
labels: v(t)\ \text{(m/s)}
caption: $0.30\ \mathrm{m}$运动的速度（m/s）随时间（s）的变化，速度限值$v$和加速度限值$a$由滑块设定。曲线下的面积总是$0.30\ \mathrm{m}$。固定$a$而提高$v$：超过$v = \sqrt{0.3a}$后，曲线变为三角形，多出的速度永远达不到。提高$a$：斜坡变陡，运动时间缩短，直到极限$d/v$。
:::

## 轴的反馈控制 {#sec-feedback}

### PD控制与轴的刚度

能使双积分器稳定的最简单控制器是比例加微分：$u = K_p(\theta_r - \theta) - K_d\dot\theta$，微分作用于测得的速度（速度反馈，来自测速发电机或对编码器信号作差分）。

::: proposition 惯量的PD控制 {#prop-pd-inertia}
对于轴$J\ddot\theta = u - T_d$，采用$u = K_p(\theta_r - \theta) - K_d\dot\theta$，闭环为
$$
J\ddot\theta + K_d\dot\theta + K_p\theta = K_p\theta_r - T_d,
$$ {#eq-pd-closed}
这是一个二阶系统，
$$
\omega_n = \sqrt{K_p/J},\qquad \zeta = \frac{K_d}{2\sqrt{K_pJ}};\qquad\text{等价地}\quad K_p = J\omega_n^2,\quad K_d = 2\zeta\omega_nJ .
$$ {#eq-pd-gains}
恒定扰动转矩$T_d$引起稳态位置误差$T_d/K_p$（轴表现为刚度为$K_p$的弹簧）。对斜坡参考输入$\theta_r = \Omega t$，跟随时存在稳态**跟随误差**$e_{ss} = K_d\Omega/K_p$。
:::

::: proof
把$u$代入$J\ddot\theta = u - T_d$并整理，得[[#eq-pd-closed]]。除以$J$并与$\ddot\theta + 2\zeta\omega_n\dot\theta + \omega_n^2\theta$比较，得$\omega_n^2 = K_p/J$和$2\zeta\omega_n = K_d/J$，即[[#eq-pd-gains]]。在恒定$T_d$、$\theta_r$不变时的稳态：$\dot\theta = \ddot\theta = 0$，所以$K_p\theta = K_p\theta_r - T_d$，$\theta_r - \theta = T_d/K_p$。对斜坡输入，稳态下轴以$\dot\theta = \Omega$运动，$\ddot\theta = 0$，并有恒定的滞后$e = \theta_r - \theta$；取$T_d = 0$，方程给出$K_d\Omega = K_p(\theta_r - \theta)$，所以$e = K_d\Omega/K_p$。
:::

比例增益是一种**伺服刚度**：整定良好的轴抵抗扰动，就好像被一个刚度为$K_p$（单位$\mathrm{N\,m/rad}$，直线轴为$\mathrm{N/m}$）的弹簧拉住一样，而刚度随带宽的平方增长。把$\omega_n$加倍，刚度变为四倍，切削力作用下的位置误差变为四分之一——这就是机床各轴的带宽要在结构允许的范围内尽量提高的原因。

工业驱动器以**串级**形式实现同样的控制律：外层位置环以比例增益$K_v$（常称**$K_v$系数**，单位$\mathrm{s^{-1}}$）产生速度指令$K_v(\theta_r - \theta)$，内层速度环以增益$K_{vel}$（通常为PI）产生转矩指令。当速度环为比例控制时，这恰好就是PD控制，$K_p = K_vK_{vel}$，$K_d = K_{vel}$，恒速时的跟随误差为$\Omega/K_v$。串级回路由内向外整定——先电流环，再速度环，最后位置环——每个回路都比其内环慢几倍，而且串级结构便于在各回路的边界处限制速度和电流。

::: example 整定PD位置环 {#ex-pd}
一个轴在电机处的总惯量为$J = 0.010\ \mathrm{kg\,m^2}$。按$\omega_n = 100\ \mathrm{rad/s}$和$\zeta = 0.7$选择$K_p$和$K_d$。求在$1.0\ \mathrm{N\,m}$稳定扰动下的位置误差，以及$10\ \mathrm{rad/s}$时的跟随误差。
::: solution
$K_p = J\omega_n^2 = 0.010 \times 10^{4} = 100\ \mathrm{N\,m/rad}$；$K_d = 2 \times 0.7 \times 100 \times 0.010 = 1.4\ \mathrm{N\,m\,s/rad}$。扰动误差$1.0/100 = 0.010\ \mathrm{rad}$（$0.57°$）。跟随误差$K_d\Omega/K_p = 1.4 \times 10/100 = 0.14\ \mathrm{rad}$（$8.0°$）；等效的$K_v = K_p/K_d = 71\ \mathrm{s^{-1}}$。

合理性检查：对导程$5\ \mathrm{mm}$的丝杠（$p/2\pi = 0.796\ \mathrm{mm/rad}$），跟随误差相当于$8\ \mathrm{mm/s}$时的$0.11\ \mathrm{mm}$——对只需到达终点的点到点运动可以容忍，但对轮廓加工则不行，在轮廓加工中，两个滞后不同的轴会切出错误的路径。解决办法是：用积分作用消除静态误差，用前馈消除跟随误差。
:::
:::

::: widget plot
title: PD控制轴的阶跃响应
f: 1 - exp(-z*x)*(cos(sqrt(1 - z^2)*x) + z/sqrt(1 - z^2)*sin(sqrt(1 - z^2)*x))
x: 0, 12
y: 0, 1.8
sliders: z=0.7:0.1:0.95:0.05
hlines: 0.98; 1.02
labels: \theta/\theta_r
caption: 闭环[[#eq-pd-closed]]对参考输入小阶跃的响应随归一化时间$\omega_nt$的变化，阻尼比$\zeta$由滑块设定；水平线标出$\pm 2\,\%$带。在$\zeta = 0.7$附近，响应快且超调小（$4.6\,\%$）；阻尼低时振荡，阻尼高时缓慢地爬进误差带。由于时间轴是$\omega_nt$，每条曲线都按$1/\omega_n$成比例缩短：带宽决定快慢，阻尼决定形状。实践中阶跃输入由规划好的运动曲线代替。
:::

### 积分作用与摩擦

加入积分项，$u = K_p e + K_i\int e\,\mathrm{d}t - K_d\dot\theta$，可以消除恒定扰动（垂直轴上的重力、恒定的切削力）下的稳态误差，因为积分器会不断改变$u$直到$e = 0$。此时闭环为三阶，$Js^3 + K_ds^2 + K_ps + K_i = 0$，可以选择增益来配置其极点。

::: proposition 惯量PID控制的极点配置 {#prop-pid-poles}
对于$J\ddot\theta = u$，采用$u = K_pe + K_i\int e\,\mathrm{d}t - K_d\dot\theta$，当
$$
K_d = J(p + 2\zeta\omega_n),\qquad K_p = J(\omega_n^2 + 2\zeta\omega_np),\qquad K_i = Jp\,\omega_n^2 .
$$ {#eq-pid-poles}
时，闭环特征多项式等于$J(s + p)(s^2 + 2\zeta\omega_ns + \omega_n^2)$——一个位于$-p$的实极点和一对固有频率为$\omega_n$、阻尼比为$\zeta$的共轭复极点。
:::

::: proof
令$e = \theta_r - \theta$，作变换：$Js^2\Theta = (K_p + K_i/s)(\Theta_r - \Theta) - K_ds\Theta$。乘以$s$并合并$\Theta$项：$(Js^3 + K_ds^2 + K_ps + K_i)\Theta = (K_ps + K_i)\Theta_r$。展开目标多项式：$J(s + p)(s^2 + 2\zeta\omega_ns + \omega_n^2) = J[s^3 + (p + 2\zeta\omega_n)s^2 + (\omega_n^2 + 2\zeta\omega_np)s + p\omega_n^2]$。令$s^2$、$s$和$s^0$的系数相等，即得[[#eq-pid-poles]]。
:::

常见的选择是$p$在$\omega_n/4$与$\omega_n$之间：$p$较小时积分消除扰动误差较慢，$p$较大时位于$-K_i/K_p$的零点会增加超调。

**摩擦**是机械轴的主要非线性。最简单的模型在黏性摩擦$b\dot\theta$之外加上**库仑**摩擦，即一个大小恒定为$T_c$、与运动方向相反的摩擦转矩；实际摩擦在起动时比滑动时大（**静摩擦**，stiction），在低速时随速度增大而减小（**斯特里贝克**（Stribeck）效应）。采用PD控制时，库仑摩擦使轴可以停在**死区**$\lvert e\rvert \le T_c/K_p$内的任何位置，在死区内弹簧力太小，不足以克服摩擦。积分作用会不断累积，直到轴突然挣脱，然后超调并粘在另一侧：这是一种称为**搜寻振荡**（hunting）的缓慢振荡，或者在轴缓慢运动时称为**爬行**（stick–slip，粘滑）。补救办法有：更硬的控制、**摩擦补偿**（在前馈转矩中加上$T_c\,\mathrm{sgn}(\dot\theta_r)$的估计值）、低摩擦机械结构（带滚动体的直线导轨、预紧丝杠、空气轴承），以及在死区内避免积分作用。

## 前馈 {#sec-feedforward}

反馈只在误差出现之后才起作用。当参考轨迹事先已知时——在运动控制中总是如此——它所需的转矩可以直接提供。这就是**前馈**。

::: proposition 基于模型的前馈 {#prop-feedforward}
对于具有黏性摩擦$T_f = b\dot\theta$、无扰动的轴[[#eq-axis]]，控制
$$
u = \underbrace{J\ddot\theta_r + b\dot\theta_r}_{\text{前馈}} + K_p(\theta_r - \theta) + K_d(\dot\theta_r - \dot\theta)
$$ {#eq-feedforward}
使跟踪误差$e = \theta_r - \theta$满足
$$
J\ddot e + (K_d + b)\dot e + K_pe = 0,
$$
因此对**任何**参考轨迹，无论其速度或加速度如何，$e$都会从任意初始误差衰减到零。
:::

::: proof
把[[#eq-feedforward]]代入$J\ddot\theta = u - b\dot\theta$：$J\ddot\theta = J\ddot\theta_r + b\dot\theta_r + K_pe + K_d\dot e - b\dot\theta$。把$J\ddot\theta$移到右边并归并，$0 = J\ddot e + b\dot e + K_pe + K_d\dot e$，这就是所述的误差方程。由于$J$、$K_p > 0$且$K_d + b > 0$，$Js^2 + (K_d + b)s + K_p$的两个根都具有负实部，所以$e \to 0$。
:::

前馈消除了跟随误差——在[[#ex-pd]]中，恒速时从$0.14\ \mathrm{rad}$降到基本为零——而无需提高反馈增益，因此也不会使回路的稳定性变差或噪声变大。其效果取决于模型的准确度：$J$有$10\,\%$的误差，加速期间就有$10\,\%$的加速转矩要由反馈来提供。反馈和前馈的任务是互补的：**前馈使轴跟随计划好的运动；反馈修正计划之外的东西**——扰动、模型误差、初始误差。平滑的参考曲线是必不可少的：前馈转矩与$\ddot\theta_r$成正比，所以无加加速度突变的曲线给出平滑的转矩。

::: example 规划运动的前馈转矩 {#ex-feedforward}
对于[[#ex-trapezoid]](a)的运动，轴在电机处的惯量为$J = 1.0\times10^{-4}\ \mathrm{kg\,m^2}$（电机和丝杠）加上折算的$20\ \mathrm{kg}$滑台，黏性摩擦系数$b = 2.0\times10^{-4}\ \mathrm{N\,m\,s/rad}$。计算加速期间和匀速期间的前馈转矩。
::: solution
滑台的折算惯量$m(p/2\pi)^2 = 20 \times (0.010/2\pi)^2 = 5.07\times10^{-5}\ \mathrm{kg\,m^2}$；总惯量$J = 1.51\times10^{-4}\ \mathrm{kg\,m^2}$。电机角加速度$\ddot\theta_r = a/(p/2\pi) = 2.5/1.592\times10^{-3} = 1571\ \mathrm{rad/s^2}$；$0.5\ \mathrm{m/s}$时的电机转速$\dot\theta_r = 314.2\ \mathrm{rad/s}$。

加速期间（转速从$0$升到$314\ \mathrm{rad/s}$）：$J\ddot\theta_r = 1.51\times10^{-4} \times 1571 = 0.237\ \mathrm{N\,m}$，加上升至$0.063\ \mathrm{N\,m}$的$b\dot\theta_r$：最大$0.30\ \mathrm{N\,m}$。匀速时：$b\dot\theta_r = 2.0\times10^{-4} \times 314.2 = 0.063\ \mathrm{N\,m}$。减速期间：开始时为$-0.237 + 0.063 = -0.17\ \mathrm{N\,m}$，逐渐降到$-0.24\ \mathrm{N\,m}$。

合理性检查：滑台只占惯量的三分之一；电机和丝杠占主导，所以[[#ex-trapezoid]]中只对滑台求得的$0.080\ \mathrm{N\,m}$严重低估了转矩。这些数据同样用于电机选型：峰值约$0.30\ \mathrm{N\,m}$，热校核则用循环的均方根值。
:::
:::

## 采样、量化与谐振 {#sec-limits}

有三种效应限制了增益能提高到什么程度。

**采样延迟。**采样周期为$T$的数字控制器附加约$T/2$的延迟（保持器）以及计算时间（[[mechatronics/microcontrollers]]）。在穿越频率$\omega_c$处损失的相角为$\omega_c\tau_d$；要使其保持在约$10°$–$20°$以下，采样频率必须是穿越频率的十到三十倍。伺服驱动器因此以$4$–$16\ \mathrm{kHz}$对其位置环和速度环采样。

**量化。**在高采样频率下对编码器作差分算出的速度非常粗糙：每转$n_e$个计数、周期为$T$时，一个计数对应$2\pi/(n_eT)$ rad/s（[[mechatronics/sensors#prop-speed]]）。高微分增益会放大这种噪声，产生可闻的转矩噪声和发热。高分辨率编码器（细分到每转数百万个计数的正余弦编码器）、速度观测器和对微分项的滤波可以缓解这一问题。

**机械谐振。**实际的传动装置是弹性的：联轴器、传动带、丝杠以及机架本身。能反映这一点的最简单模型是由扭转弹簧连接的两个惯量。

::: proposition 双质量谐振 {#prop-two-mass}
惯量为$J_m$的电机通过扭转刚度为$k$的轴（无阻尼）驱动惯量为$J_L$的负载。从电机转矩到电机转角的传递函数为
$$
\frac{\Theta_m(s)}{U(s)} = \frac{J_Ls^2 + k}{s^2\left[J_mJ_Ls^2 + k(J_m + J_L)\right]},
$$ {#eq-two-mass}
它在$\omega_{ar} = \sqrt{k/J_L}$处有一个**反谐振**（一对虚零点），在$\omega_r = \sqrt{k(1/J_m + 1/J_L)}$处有一个**谐振**（一对虚极点），且$\omega_r/\omega_{ar} = \sqrt{1 + J_L/J_m}$。
:::

::: proof
受力图：电机$J_m\ddot\theta_m = u - k(\theta_m - \theta_L)$；负载$J_L\ddot\theta_L = k(\theta_m - \theta_L)$。对负载方程作变换：$\Theta_L = k\Theta_m/(J_Ls^2 + k)$。代入电机方程：$J_ms^2\Theta_m = U - k\Theta_m + k^2\Theta_m/(J_Ls^2 + k)$，所以
$$
U = \Theta_m\,\frac{(J_ms^2 + k)(J_Ls^2 + k) - k^2}{J_Ls^2 + k} = \Theta_m\,\frac{s^2\left[J_mJ_Ls^2 + k(J_m + J_L)\right]}{J_Ls^2 + k},
$$
取倒数即得[[#eq-two-mass]]。零点满足$J_Ls^2 + k = 0$，$s = \pm j\sqrt{k/J_L}$；非零极点满足$J_mJ_Ls^2 + k(J_m + J_L) = 0$，$s = \pm j\sqrt{k(J_m + J_L)/(J_mJ_L)}$。二者之比的平方为$(J_m + J_L)/J_m$。当$k \to \infty$时，零点和极点一起移向无穷远，被控对象趋于$1/[(J_m + J_L)s^2]$，即刚性轴。
:::

在反谐振以下，轴表现为一个刚性惯量$J_m + J_L$；在谐振以上，电机只看到它自己的惯量，而负载被甩在后面。谐振限制了带宽：位置环的速度若明显超过$\omega_{ar}$的三分之一左右，就会激起谐振。惯量比$J_L/J_m$越大，反谐振与谐振相距越远，控制就越困难——这是伺服设计者使该比值保持适中的原因之一。补救办法有：更刚的传动、在速度环中加入调谐到谐振频率的**陷波滤波器**、负载侧编码器（它也带来自身的困难），以及不激起谐振的限制加加速度的轨迹。

::: example 带传动轴的谐振 {#ex-resonance}
一台$J_m = 1.0\times10^{-4}\ \mathrm{kg\,m^2}$的伺服电机通过同步带驱动折算惯量为$J_L = 4.0\times10^{-4}\ \mathrm{kg\,m^2}$的负载；折算到电机的带的扭转刚度为$k = 400\ \mathrm{N\,m/rad}$。求反谐振频率和谐振频率，并估算可达到的位置带宽。
::: solution
$\omega_{ar} = \sqrt{400/4.0\times10^{-4}} = \sqrt{10^6} = 1000\ \mathrm{rad/s}$（$159\ \mathrm{Hz}$）。$\omega_r = \sqrt{400(10^4 + 2500)} = \sqrt{5.0\times10^{6}} = 2236\ \mathrm{rad/s}$（$356\ \mathrm{Hz}$）。比值$\sqrt{1 + 4} = \sqrt5 = 2.24$。带宽：最多约为$\omega_{ar}/3 \approx 330\ \mathrm{rad/s}$，大约$50\ \mathrm{Hz}$；要达到这一带宽，通常需要在速度环中加一个$356\ \mathrm{Hz}$的陷波滤波器。

合理性检查：具有同样惯量的刚性轴不会有这种限制；决定带宽的是柔度，而不是电机。用更刚的滚珠丝杠（$k$大几倍）代替传动带，两个频率都按$\sqrt{k}$提高。
:::
:::

::: warning 只靠增益整定，以及用错编码器
两种常见错误。(1) 试图通过提高反馈增益来消除跟随误差或轮廓误差。增益受采样、量化噪声和谐振的限制；超过这些限度，轴就会振荡或发出啸叫。运动中的跟随误差靠速度前馈和加速度前馈消除，静态误差靠积分作用消除，而增益应按扰动抑制和稳定裕度来设定。(2) 以为电机编码器测量的是负载。二者之间有回差、丝杠导程误差、热伸长以及[[#prop-two-mass]]中的弹性变形；控制器把电机保持得分毫不差，刀具位置却是错的。精密机床增加负载侧（直线光栅尺）编码器——然后就必须处理出现在回路内部的谐振。
:::

::: quiz
一个PD控制轴的$K_p = 200\ \mathrm{N\,m/rad}$，$K_d = 2\ \mathrm{N\,m\,s/rad}$。在没有前馈时，它以恒定的$5\ \mathrm{rad/s}$运动的跟随误差是多少？
- [ ] $0$
- [ ] $0.025\ \mathrm{rad}$
- [x] $0.05\ \mathrm{rad}$
- [ ] $0.5\ \mathrm{rad}$
::: solution
$e_{ss} = K_d\Omega/K_p = 2 \times 5/200 = 0.05\ \mathrm{rad}$（[[#prop-pd-inertia]]）。速度反馈以$K_d\Omega = 10\ \mathrm{N\,m}$阻碍运动，位置误差必须通过$K_p$提供一个相等的转矩。速度前馈（$K_d\dot\theta_r$）可以代替它提供这一转矩，从而消除误差。
:::
:::

::: history
基于数字数据的机床轴闭环控制始于麻省理工学院伺服机构实验室：根据约翰·T·帕森斯（John T. Parsons）提出的由计算坐标加工直升机旋翼桨叶样板的建议，1952年在那里演示了一台数控铣床；其各轴由穿孔纸带供给数据的伺服电机驱动。第一台工业机器人——乔治·德沃尔（George Devol）和约瑟夫·恩格尔伯格（Joseph Engelberger）的Unimate——于1961年在通用汽车公司的工厂投入工作，其关节采用液压驱动和位置控制。以计算机代替硬接线逻辑的计算机数控（CNC）在20世纪70年代普及，而采用基于微处理器的速度环和位置环的数字伺服驱动器在20世纪80和90年代取代了模拟放大器，使前馈、陷波滤波器和自动整定成为标准功能。
:::

::: summary
- 电流控制的轴是一个双积分器，$J\ddot\theta = u - T_f - T_d$，$J$为电机处的总惯量。
- 梯形曲线：$T = d/v_{\max} + v_{\max}/a_{\max}$（短行程为$2\sqrt{d/a_{\max}}$）；S形曲线限制加加速度和残余振动。
- PD控制：$K_p = J\omega_n^2$，$K_d = 2\zeta\omega_nJ$；刚度$K_p$，扰动误差$T_d/K_p$，跟随误差$K_d\Omega/K_p = \Omega/K_v$。串级回路由内向外整定。
- 极点配置的PID：$K_d = J(p + 2\zeta\omega_n)$，$K_p = J(\omega_n^2 + 2\zeta\omega_np)$，$K_i = Jp\omega_n^2$。库仑摩擦导致死区$T_c/K_p$，加上积分作用时导致搜寻振荡。
- 前馈$J\ddot\theta_r + b\dot\theta_r$对任何轨迹都能消除跟随误差；反馈处理计划之外的情况。
- 采样延迟、编码器量化和双质量谐振（$\omega_{ar} = \sqrt{k/J_L}$，$\omega_r = \omega_{ar}\sqrt{1 + J_L/J_m}$）限制带宽。
:::

## 习题

::: exercise 梯形运动的时间 {level=1 check="0.9"}
一个$v_{\max} = 0.50\ \mathrm{m/s}$、$a_{\max} = 5.0\ \mathrm{m/s^2}$的轴从静止到静止移动$0.40\ \mathrm{m}$。求最短运动时间。（填写$T$，单位s。）
::: solution
$v_{\max}^2/a_{\max} = 0.05\ \mathrm{m} < 0.40\ \mathrm{m}$，所以为梯形：$T = 0.40/0.50 + 0.50/5.0 = 0.80 + 0.10 = 0.90\ \mathrm{s}$。
:::
:::

::: exercise 短行程运动 {level=1 check="0.2"}
同类的轴，$a_{\max} = 2.0\ \mathrm{m/s^2}$，$v_{\max} = 1.0\ \mathrm{m/s}$，移动$20\ \mathrm{mm}$。求运动时间。（填写$T$，单位s。）
::: solution
$v_{\max}^2/a_{\max} = 0.5\ \mathrm{m} > 0.02\ \mathrm{m}$：三角形。$T = 2\sqrt{0.02/2.0} = 2 \times 0.1 = 0.20\ \mathrm{s}$，峰值速度$\sqrt{2.0 \times 0.02} = 0.20\ \mathrm{m/s}$。
:::
:::

::: exercise 给定带宽的比例增益 {level=1 check="50"}
对$J = 0.020\ \mathrm{kg\,m^2}$、期望$\omega_n = 50\ \mathrm{rad/s}$的轴，求$K_p$。（填写$K_p$，单位N·m/rad。）
::: solution
$K_p = J\omega_n^2 = 0.020 \times 2500 = 50\ \mathrm{N\,m/rad}$。对$\zeta = 1$，$K_d = 2 \times 50 \times 0.020 = 2.0\ \mathrm{N\,m\,s/rad}$。
:::
:::

::: exercise 扰动下的误差 {level=1 check="0.01"}
上题中的轴在PD控制下承受$0.50\ \mathrm{N\,m}$的稳定扰动转矩。求稳态位置误差。（以rad为单位填写。）
::: solution
$e = T_d/K_p = 0.50/50 = 0.010\ \mathrm{rad}$。
:::
:::

::: exercise 串级回路的跟随误差 {level=2 check="4"}
一个直线轴的位置环$K_v$系数为$25\ \mathrm{s^{-1}}$，没有前馈。求$0.10\ \mathrm{m/s}$时的跟随误差。（以mm为单位填写。）
::: solution
$e = v/K_v = 0.10/25 = 4.0\times10^{-3}\ \mathrm{m} = 4\ \mathrm{mm}$。机床数控系统常以$(\mathrm{m/min})/\mathrm{mm}$表示$K_v$：这里$25\ \mathrm{s^{-1}} = 1.5\ (\mathrm{m/min})/\mathrm{mm}$，$6\ \mathrm{m/min}$时误差为$4\ \mathrm{mm}$。
:::
:::

::: exercise 峰值前馈转矩 {level=2 check="4"}
一个$J = 0.020\ \mathrm{kg\,m^2}$、摩擦可忽略的轴跟随一条峰值加速度为$200\ \mathrm{rad/s^2}$的曲线。求峰值前馈转矩。（以N·m为单位填写。）
::: solution
$J\ddot\theta_r = 0.020 \times 200 = 4.0\ \mathrm{N\,m}$。
:::
:::

::: exercise 摩擦死区 {level=2 check="0.004"}
一个库仑摩擦$T_c = 0.20\ \mathrm{N\,m}$的轴处于$K_p = 50\ \mathrm{N\,m/rad}$的PD控制之下。求它可能停止的位置区间的半宽。（以rad为单位填写。）
::: solution
只要恢复转矩$K_p\lvert e\rvert$小于它必须克服的摩擦，轴就会停住：$\lvert e\rvert \le T_c/K_p = 0.20/50 = 0.004\ \mathrm{rad}$。积分作用可以消除这个区间，但可能引起搜寻振荡。
:::
:::

::: exercise 谐振频率比 {level=2 check="2"}
在一个双质量轴中，负载惯量是电机惯量的三倍。求$\omega_r/\omega_{ar}$。（填写比值。）
::: solution
$\sqrt{1 + J_L/J_m} = \sqrt{1 + 3} = 2$。
:::
:::

::: exercise 极点配置求PID增益 {level=3 check="5000"}
对$J = 0.010\ \mathrm{kg\,m^2}$，选择PID增益，使闭环极点为一对$\omega_n = 100\ \mathrm{rad/s}$、$\zeta = 0.7$的共轭复极点和一个位于$-50\ \mathrm{s^{-1}}$的实极点。求全部三个增益。（填写$K_i$，单位N·m/(rad·s)。）
::: solution
由[[#eq-pid-poles]]：$K_d = 0.010(50 + 140) = 1.9\ \mathrm{N\,m\,s/rad}$；$K_p = 0.010(10^4 + 2 \times 0.7 \times 100 \times 50) = 0.010 \times 17\,000 = 170\ \mathrm{N\,m/rad}$；$K_i = 0.010 \times 50 \times 10^4 = 5000\ \mathrm{N\,m/(rad\,s)}$。校核：多项式$0.01s^3 + 1.9s^2 + 170s + 5000$除以$0.01$为$s^3 + 190s^2 + 17\,000s + 500\,000 = (s + 50)(s^2 + 140s + 10^4)$。
:::
:::

::: exercise 设计一个取放轴 {level=3}
一个带传动的取放轴必须在$0.35\ \mathrm{s}$内（包括稳定到$\pm 0.05\ \mathrm{mm}$）把$2\ \mathrm{kg}$的取放头移动$0.40\ \mathrm{m}$，每分钟$60$次。选择速度曲线及其限值，估算电机转矩和转速（带轮半径$20\ \mathrm{mm}$），选择编码器和采样频率，并说明如何处理带的谐振和稳定过程。
::: solution
好的回答：为稳定过程留出约$0.05\ \mathrm{s}$，运动用$0.30\ \mathrm{s}$。三角形曲线需要$a = 4d/T^2 = 17.8\ \mathrm{m/s^2}$，峰值速度$2.67\ \mathrm{m/s}$；$v_{\max} = 2.0\ \mathrm{m/s}$的梯形曲线需要$T = d/v + v/a$，即$a = 2.0/(0.30 - 0.20) = 20\ \mathrm{m/s^2}$——峰值加速度稍高、限制加加速度的S形曲线更有利于稳定。作用在取放头上的力$2 \times 20 = 40\ \mathrm{N}$，另加带和带轮的惯性力以及摩擦；在$20\ \mathrm{mm}$带轮上，仅取放头所需的转矩约为$0.8\ \mathrm{N\,m}$，计入电机和带轮的惯量后可能为$1.2$–$1.5\ \mathrm{N\,m}$（按[[#ex-feedforward]]计算）；电机转速$2.0/0.020 = 100\ \mathrm{rad/s}$（$955\ \mathrm{rev/min}$）。分辨率：$\pm 0.05\ \mathrm{mm}$需要每个计数约$10\ \mathrm{\mu m}$，即每转$2\pi \times 20\ \mathrm{mm}/10\ \mathrm{\mu m} \approx 12\,600$个计数——17位或更高的编码器。带的伸长使双质量谐振成为主要限制：根据带的刚度估算谐振频率，采用陷波滤波器和S形曲线，必要时采用输入整形，以及加速度前馈；如果运动结束时带的弹性变形超过公差，就考虑负载侧直线光栅尺。以$4$–$8\ \mathrm{kHz}$采样。按$1\ \mathrm{s}$循环的均方根转矩作热额定值校核。
:::
:::
