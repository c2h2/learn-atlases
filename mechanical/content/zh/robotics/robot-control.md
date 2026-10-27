轨迹规划器给出参考信号$\mathbf q_d(t)$；控制器的任务是每秒计算一千次甚至更多次电机转矩，使真实关节在重力、负载变化、摩擦和连杆间动力学耦合的影响下仍能跟踪参考信号——而当工具接触到物体时，还要在控制运动的同时控制接触力。本章按照对机器人模型利用程度递增的顺序建立各种标准控制器。**独立关节 PD 与 PID 控制**把每个关节看作一台独立的带减速器电机，把机器人的其余部分看作扰动；大多数工业机械臂运行的就是这种控制，它之所以有效，是因为大传动比削弱了耦合。**PD 加重力补偿**补上了造成稳态误差的那一个模型项，并且可以证明对任意正增益都稳定。**计算力矩控制**抵消[[robotics/manipulator-dynamics]]中的全部非线性动力学，留下线性、解耦且固有频率和阻尼可任意选定的误差动态。对于与环境接触的任务，我们随后从控制位置转向控制位置与力之间的**关系**——**阻抗控制与导纳控制**——或者把任务方向划分为力控方向和位控方向——**混合位置/力控制**。经典控制的背景知识（二阶系统、PID、稳定性）见[[control-systems/time-response]]和[[control-systems/pid-control]]；执行器和传感器见[[mechatronics/electric-actuators]]和[[mechatronics/sensors]]。

## 作为被控对象的关节 {#sec-plant}

由[[robotics/manipulator-dynamics]]，关节$k$服从$\sum_jm_{kj}(\mathbf q)\ddot q_j + (C\dot{\mathbf q})_k + g_k(\mathbf q) = \tau_k$。设转子转动惯量为$J_m$的电机经传动比$N$驱动关节，关节处有黏性摩擦$b$，把方程分成常数部分和其余部分：
$$
J\,\ddot q_k + b\,\dot q_k = u_k - d_k,\qquad J = \bar m_{kk} + N^2J_m ,
$$ {#eq-joint-plant}
其中$u_k = N\tau_{m,k}$是作用在关节上的转矩，$\bar m_{kk}$是$m_{kk}(\mathbf q)$的名义（平均）值，而**扰动**$d_k$汇集了其余所有项：$m_{kk}$的变化、非对角惯性耦合$\sum_{j\ne k}m_{kj}\ddot q_j$、科里奥利力矩和离心力矩，以及重力。从电机轴看，惯性项相对于$J_m$按$1/N^2$缩小，扰动按$1/N$缩小，这就是大传动比关节（传动比 50–200 很常见）几乎表现为独立线性对象的原因。

::: definition 独立关节控制 {#def-independent}
**独立关节控制**根据线性模型[[#eq-joint-plant]]为每个关节设计一个单输入单输出控制器，把$d_k$视为未知、有界、缓慢变化的扰动。跟踪误差为$e = q - q_d$（本章通篇采用这一约定，因此正误差表示关节超前于其参考值）。
:::

## 单个关节的 PD 与 PID 控制 {#sec-pid}

::: proposition 关节的 PD 控制 {#prop-pd}
对于恒定设定值$q_d$和 PD 控制律$u = -K_pe - K_d\dot q$，[[#eq-joint-plant]]的闭环为
$$
J\ddot e + (b + K_d)\dot e + K_pe = -d .
$$
当$K_p > 0$、$b + K_d > 0$时它是稳定的，其固有频率和阻尼比为
$$
\omega_n = \sqrt{K_p/J},\qquad \zeta = \frac{b + K_d}{2\sqrt{K_pJ}},
$$ {#eq-pd-design}
恒定扰动$d$留下稳态误差$e_{ss} = -d/K_p$。
:::

::: proof
$q_d$为常数时，$e = q - q_d$给出$\dot e = \dot q$，$\ddot e = \ddot q$。把$u$代入$J\ddot q + b\dot q = u - d$，得$J\ddot e + b\dot e = -K_pe - K_d\dot e - d$，整理即得所述方程。其特征多项式$Js^2 + (b + K_d)s + K_p$的两个根都位于左半开平面，当且仅当所有系数同号（二阶劳斯-赫尔维茨条件），即$K_p > 0$且$b + K_d > 0$。除以$J$并与标准形式$s^2 + 2\zeta\omega_ns + \omega_n^2$比较，即得[[#eq-pd-design]]。对于恒定的$d$，稳态（$\ddot e = \dot e = 0$）为$K_pe_{ss} = -d$。
:::


稳态误差是 PD 控制器的弱点：重力是一个很大的、依赖于位形的、近乎恒定的扰动，它使机械臂下垂到目标以下。由此引出两种补救办法——积分项，或重力模型。

::: example 整定一个带减速器的关节 {#ex-pd}
[[robotics/manipulator-dynamics]]中带减速器的单连杆总转动惯量$J = 0.367\,\mathrm{kg\,m^2}$（连杆加上折算的转子），$b = 0.10\,\mathrm{N\,m\,s/rad}$。(a) 选择$K_p$和$K_d$，使系统在$\omega_n = 10\,\mathrm{rad/s}$下临界阻尼。(b) 最大重力矩为$4.905\,\mathrm{N\,m}$（连杆水平时）。它造成多大的稳态误差？(c) 加入积分项$K_i\int e\,dt$：$K_i$取何值时回路稳定？$K_i = 100\,\mathrm{N\,m/(rad\,s)}$时情况如何？
::: solution
(a) $K_p = J\omega_n^2 = 0.367\times100 = 36.7\,\mathrm{N\,m/rad}$；$b + K_d = 2\zeta\omega_nJ = 2\times1\times10\times0.367 = 7.34$，故$K_d = 7.24\,\mathrm{N\,m\,s/rad}$。
(b) $\lvert e_{ss}\rvert = 4.905/36.7 = 0.134\,\mathrm{rad} = 7.7^\circ$——对大多数任务而言都太大了。把$\omega_n$提高到$30\,\mathrm{rad/s}$可使它减小到九分之一（误差按$1/\omega_n^2$变化），但这受到结构共振和采样频率的限制。
(c) 采用 PID 时，对恒定的$d$（求导一次），闭环为$J\dddot e + (b + K_d)\ddot e + K_p\dot e + K_ie = 0$，特征多项式为$Js^3 + (b + K_d)s^2 + K_ps + K_i$。对系数为正的三次式$a_3s^3 + a_2s^2 + a_1s + a_0$，劳斯-赫尔维茨条件为$a_2a_1 > a_3a_0$，所以稳定性要求
$$
0 < K_i < \frac{(b + K_d)K_p}{J} = \frac{7.34\times36.7}{0.367} = 734\,\mathrm{N\,m/(rad\,s)}.
$$
取$K_i = 100$时，$0.367s^3 + 7.34s^2 + 36.7s + 100$的根为$s = -14.4$和$s = -2.82 \pm 3.32j$：稳定，且恒定的重力误差已被消除，但缓慢的共轭复根对（时间常数$1/2.82 = 0.35\,\mathrm s$）意味着下垂只能逐渐被积分消除，并伴有一定超调。电机饱和时积分作用还会出现积分饱和，因此实际的 PID 回路会限制积分器（抗积分饱和，[[control-systems/pid-control]]）。
:::
:::

::: widget phaseplane
f: y
g: (-Kp*(x - 1) - Kd*y - G*cos(x))/0.367
x: -0.5, 2
y: -4, 4
sliders: Kp=36.7:5:150:0.1; Kd=7.24:0:20:0.1; G=4.905:0:10:0.1
points: 0, 0; -0.3, 2; 0.3, -3
caption: 在 PD 控制下趋向$q_d = 1\,\mathrm{rad}$的带减速器单连杆，重力矩为$G\cos q$（$q$从水平位置量起；$x = q$，$y = \dot q$；$J = 0.367\,\mathrm{kg\,m^2}$）。轨线收敛到$q = 1$**以下**的一个平衡点，即零斜线的交点：这就是 PD 的稳态误差$G\cos q/K_p$。增大$K_p$，平衡点向 1 移动；令$G = 0$（重力已补偿），平衡点恰好位于 1。减小$K_d$可看到振荡式的趋近；阻尼比服从[[#eq-pd-design]]。
:::

## PD 加重力补偿 {#sec-pdg}

如果控制器知道重力矩$\mathbf g(\mathbf q)$——这只需要质量和质心位置——就可以把它们加上，从而完全消除下垂。引人注目的事实是：这个简单的控制律对完整的非线性耦合机械臂都是稳定的，而不仅仅对线性化后的关节稳定。

::: theorem PD 加重力补偿（Takegaki–Arimoto） {#thm-pd-gravity}
对于刚性机械臂$M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau$、恒定设定值$\mathbf q_d$以及对称正定的增益矩阵$K_p$、$K_d$，控制律
$$
\boldsymbol\tau = -K_p(\mathbf q - \mathbf q_d) - K_d\dot{\mathbf q} + \mathbf g(\mathbf q)
$$ {#eq-pd-gravity}
使平衡点$(\mathbf q, \dot{\mathbf q}) = (\mathbf q_d, \mathbf 0)$全局渐近稳定。
:::

::: proof
令$\mathbf e = \mathbf q - \mathbf q_d$，考虑李雅普诺夫函数
$$
V = \tfrac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q} + \tfrac12\mathbf e^{\mathsf T}K_p\mathbf e ,
$$
即动能加上把机械臂拉向$\mathbf q_d$的虚拟弹簧$K_p$的能量。由于$M$和$K_p$正定，$V$关于$(\mathbf e, \dot{\mathbf q})$正定。沿闭环运动，利用$M\ddot{\mathbf q} = \boldsymbol\tau - C\dot{\mathbf q} - \mathbf g = -K_p\mathbf e - K_d\dot{\mathbf q} - C\dot{\mathbf q}$，
$$
\dot V = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \tfrac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q} + \dot{\mathbf q}^{\mathsf T}K_p\mathbf e
= -\dot{\mathbf q}^{\mathsf T}K_d\dot{\mathbf q} + \tfrac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q}
= -\dot{\mathbf q}^{\mathsf T}K_d\dot{\mathbf q} \le 0,
$$
这里用到了$\dot M - 2C$的反对称性（[[robotics/manipulator-dynamics]]）。所以$V$永不增加，所有轨线都有界。只有在$\dot{\mathbf q} = \mathbf 0$处才有$\dot V = 0$。在一条停留在该集合中的轨线上，也有$\ddot{\mathbf q} = \mathbf 0$，闭环方程化为$\mathbf 0 = -K_p\mathbf e$，即$\mathbf e = \mathbf 0$。由拉萨尔（LaSalle）不变性原理，每条轨线都收敛到$\{\dot V = 0\}$中的最大不变集，即单点$(\mathbf e, \dot{\mathbf q}) = (\mathbf 0, \mathbf 0)$；又由于$V$径向无界，这一结论对每个初始状态都成立。假设：连杆和关节是刚性的，重力模型精确，执行器无饱和，连续时间控制。
:::

这一证明是一个能量论证：控制器对势能进行整形（抵消重力并加上一根在$\mathbf q_d$处取最小值的弹簧）并注入阻尼；一个势能有唯一最小值且带阻尼的被动机械系统必然在那里静止下来。该控制律广泛用于设定值调节，以及在人身边工作的机械臂的柔顺、安全行为：降低$K_p$可以使机械臂更柔软，而不会危及稳定性。

## 计算力矩控制 {#sec-computed-torque}

对于快速跟踪轨迹$\mathbf q_d(t)$，PD 加重力补偿是不够的：沿轨迹的惯性力矩和科里奥利力矩会产生跟踪误差。计算力矩控制利用整个模型。

::: proposition 计算力矩控制 {#prop-computed-torque}
采用控制律
$$
\boldsymbol\tau = M(\mathbf q)\big(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e\big) + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q),\qquad \mathbf e = \mathbf q - \mathbf q_d ,
$$ {#eq-computed-torque}
并且模型精确时，跟踪误差服从线性解耦方程
$$
\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0 .
$$
取对角增益$K_p = \mathrm{diag}(\omega_i^2)$、$K_d = \mathrm{diag}(2\zeta_i\omega_i)$且$\omega_i, \zeta_i > 0$，则对任意轨迹和任意初始误差，每个关节的误差都像固有频率为$\omega_i$、阻尼比为$\zeta_i$的二阶系统一样指数衰减。
:::

::: proof
把[[#eq-computed-torque]]代入运动方程：$M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = M(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e) + C\dot{\mathbf q} + \mathbf g$。$C$项和$\mathbf g$项相消，剩下$M(\mathbf q)(\ddot{\mathbf q} - \ddot{\mathbf q}_d + K_d\dot{\mathbf e} + K_p\mathbf e) = \mathbf 0$。由于$M(\mathbf q)$对每个$\mathbf q$都可逆（正定），括号为零：$\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0$。在对角增益下，这是$n$个独立方程$\ddot e_i + 2\zeta_i\omega_i\dot e_i + \omega_i^2e_i = 0$，当$\omega_i, \zeta_i > 0$时每个方程的特征根实部都为负，所以每个解都指数衰减。该控制律是**反馈线性化**的一个实例：内环抵消非线性，外环为双积分器配置极点。
:::

::: example 2R 机械臂的计算力矩控制 {#ex-computed-torque}
[[robotics/manipulator-dynamics]]中的 2R 机械臂处于$\mathbf q = (30^\circ, 60^\circ)$，$\dot{\mathbf q} = (1.0, -0.5)\,\mathrm{rad/s}$，参考信号的$\ddot{\mathbf q}_d = (2.0, 1.0)\,\mathrm{rad/s^2}$，误差为$\mathbf e = (0.01, -0.02)\,\mathrm{rad}$，$\dot{\mathbf e} = \mathbf 0$。为两个关节选择$\omega_n = 20\,\mathrm{rad/s}$、$\zeta = 1$的增益，并计算力矩。
::: solution
$K_p = \omega_n^2I = 400I\ \mathrm{s^{-2}}$，$K_d = 2\zeta\omega_nI = 40I\ \mathrm{s^{-1}}$——注意在计算力矩控制中，增益的单位是每单位误差的加速度，而不是每单位误差的力矩，因为它们要乘以$M$。指令加速度为
$$
\mathbf v = \ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e = (2.0 - 4.0,\ 1.0 + 8.0) = (-2.0, 9.0)\,\mathrm{rad/s^2}.
$$
利用动力学一章例题中的$M$、$C\dot{\mathbf q}$和$\mathbf g$，
$$
\boldsymbol\tau = \begin{bmatrix} 1.1300 & 0.2375\\ 0.2375 & 0.1250\end{bmatrix}\begin{bmatrix} -2.0\\ 9.0\end{bmatrix} + \begin{bmatrix} 0.1461\\ 0.1949\end{bmatrix} + \begin{bmatrix} 12.744\\ 0\end{bmatrix} = \begin{bmatrix} -0.1225 + 0.1461 + 12.744\\ 0.650 + 0.1949\end{bmatrix} = \begin{bmatrix} 12.77\\ 0.845\end{bmatrix}\mathrm{N\,m}.
$$
与零误差时的前馈力矩$(15.39, 0.795)\,\mathrm{N\,m}$比较：超前参考值$0.01\,\mathrm{rad}$的关节 1 被制动；滞后$0.02\,\mathrm{rad}$的关节 2 被向前推。关节 1 的修正是通过完整的惯性矩阵计算的，所以两个关节的修正正如机械臂动力学所要求的那样相互耦合。
:::
:::

实际上模型从来都不精确。采用估计值$\hat M$、$\hat C$、$\hat{\mathbf g}$时，误差方程变为$\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \boldsymbol\eta$，其中残差$\boldsymbol\eta = \hat M^{-1}\big((\hat M - M)\ddot{\mathbf q} + (\hat C - C)\dot{\mathbf q} + \hat{\mathbf g} - \mathbf g\big)$起扰动的作用；增益合适时它只产生小的有界误差（[[#exr-robust]]），自适应或鲁棒变体则对它进行估计或界定。控制律以固定的采样频率计算，现代控制器通常为$1$–$8\,\mathrm{kHz}$；所选的$\omega_n$必须远低于采样频率以及机械臂和驱动装置的最低结构共振频率，这在实际中把$\omega_n$限制在几十 rad/s。

::: warning 纸面上看来合适的增益可能使真实关节失稳
上面的分析假定连杆和减速器是刚性的，并且控制是连续时间的。实际的传动装置（谐波减速器、同步带）是弹簧，其共振频率常在$10$–$30\,\mathrm{Hz}$，而数字控制器会引入约一个采样周期的延迟。为减小跟踪误差而提高$K_p$和$K_d$，最终会激起这些共振，使回路失稳，尽管刚性模型预言任何正增益都是稳定的。应在真实机器上从低增益开始整定，使$\omega_n$比第一阶共振频率低若干倍，并记住对含噪声的编码器信号进行微分会放大噪声（应对微分进行滤波）。在真实机械臂上测试新控制器时，要在低速下进行，清空工作单元，手放在急停按钮上，并启用机械臂的安全功能。
:::

## 任务空间控制 {#sec-task-space}

许多任务是在笛卡儿坐标中定义的：把工具保持在某一位姿，沿一条焊缝运动。最简单的任务空间控制器是[[#thm-pd-gravity]]的笛卡儿对应形式：在工具处计算一个虚拟弹簧-阻尼器力旋量，并用[[robotics/jacobians]]中的雅可比矩阵转置把它映射为关节力矩，
$$
\boldsymbol\tau = J(\mathbf q)^{\mathsf T}\big(K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}\big) + \mathbf g(\mathbf q),
$$ {#eq-cartesian-pd}
其中$\mathbf x = \mathbf f(\mathbf q)$为工具位置，$\dot{\mathbf x} = J\dot{\mathbf q}$。同样的李雅普诺夫论证，取$V = \frac12\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} + \frac12(\mathbf x - \mathbf x_d)^{\mathsf T}K_x(\mathbf x - \mathbf x_d)$，给出$\dot V = -\dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} \le 0$（[[#exr-cartesian]]）：只要$J$在$\mathbf x_d$处非奇异，工具就会在那里静止下来。该控制律从不对雅可比矩阵求逆，所以在奇异位形附近性能只是平缓地下降，而$K_x$是一个有物理意义的**笛卡儿刚度**——工具的行为就像一个质量，用刚度为$K_x$的弹簧连在$\mathbf x_d$上。Khatib 的操作空间表述更进一步：它利用任务空间惯量$\Lambda = (JM^{-1}J^{\mathsf T})^{-1}$，使工具的闭环动力学在笛卡儿坐标中线性且解耦，这是计算力矩控制在任务空间中的对应形式。

## 交互控制：阻抗与导纳 {#sec-impedance}

高增益的位置控制器不适合用于接触。如果指令一台刚硬的机械臂压入钢表面$1\,\mathrm{mm}$，接触力将是使机械臂和表面共变形$1\,\mathrm{mm}$所需的任何力——可能达数千牛顿。纯力控制则在另一方面失败：在自由空间中没有可以推的东西，机械臂会一直加速直到撞上某物。**阻抗控制**规定工具相对于其参考值的偏差与外力之间的动态关系：
$$
M_d\ddot{\tilde{\mathbf x}} + D_d\dot{\tilde{\mathbf x}} + K_d\tilde{\mathbf x} = \mathbf F_{\text{ext}},\qquad \tilde{\mathbf x} = \mathbf x - \mathbf x_d ,
$$ {#eq-impedance}
即一个期望的质量-弹簧-阻尼器。在自由空间中$\mathbf F_{\text{ext}} = \mathbf 0$，工具跟踪$\mathbf x_d$；在接触中，它像一根刚度为$K_d$的弹簧那样屈服。力矩控制型机械臂直接实现[[#eq-impedance]]（笛卡儿 PD 控制律[[#eq-cartesian-pd]]就是采用机器人自身惯量的阻抗控制）；刚硬的位置控制型工业机械臂则以**导纳控制**的形式实现它：腕部的力传感器测量$\mathbf F_{\text{ext}}$，在软件中对[[#eq-impedance]]积分得到修正后的位置参考值，再由内部的位置环跟踪它。

::: proposition 阻抗控制下的接触力 {#prop-contact}
一个刚度为$K_d$的阻抗控制工具（单一方向，静态情形）被指令到$x_d$，即越过一个环境表面距离$\delta = x_d - x_w > 0$处，该环境表现为一根刚度为$k_e$的弹簧，其表面位于$x_w$。平衡时的接触力和压入量为
$$
F = \frac{K_dk_e}{K_d + k_e}\,\delta,\qquad x - x_w = \frac{K_d}{K_d + k_e}\,\delta .
$$
:::

::: proof
静止时，工具的阻抗给出$K_d(x - x_d) = F_{\text{ext}}$，其中$F_{\text{ext}}$是环境对工具的力；环境被压缩$x - x_w > 0$，以$F_{\text{ext}} = -k_e(x - x_w)$反推。令两者相等，$K_d(x - x_d) = -k_e(x - x_w)$，故$x = (K_dx_d + k_ex_w)/(K_d + k_e)$，$x - x_w = K_d(x_d - x_w)/(K_d + k_e)$。接触力的大小为$F = k_e(x - x_w) = K_dk_e\delta/(K_d + k_e)$：即两根弹簧串联。假设：准静态接触，线性弹簧，保持接触（$x > x_w$）。
:::

::: example 压向刚硬表面 {#ex-impedance}
一个$K_d = 2000\,\mathrm{N/m}$的阻抗控制工具被指令压入刚度$k_e = 50\,\mathrm{kN/m}$的表面$10\,\mathrm{mm}$。求接触力以及表面被压入多深。并与有效刚度为$K = 2\times10^6\,\mathrm{N/m}$的刚硬位置控制器进行比较。
::: solution
串联刚度$K_dk_e/(K_d + k_e) = 2000\times50000/52000 = 1923\,\mathrm{N/m}$，故$F = 1923\times0.010 = 19.2\,\mathrm N$，表面变形$(2000/52000)\times10 = 0.38\,\mathrm{mm}$；工具停在距指令位置$9.6\,\mathrm{mm}$处。采用刚硬位置控制器时，串联刚度为$2\times10^6\times5\times10^4/(2.05\times10^6) = 48.8\,\mathrm{kN/m}$，$F = 488\,\mathrm N$，表面被压入$9.8\,\mathrm{mm}$——同样的指令下力是前者的 25 倍。阻抗控制下的力由**较软**的弹簧主导，而它是设计者选定的；刚硬位置控制下的力由环境主导，而设计者并不精确了解环境。因此在阻抗控制下，表面位置的误差只转化为小而可预测的力误差。
:::
:::

::: widget plot
f: x*1000*ke/(x + 1000*ke)*0.01; x*0.01
x: 0, 20000
y: 0, 200
sliders: ke=50:5:500:5
labels: F\ \text{(N)，环境 } k_e\ \text{单位为 kN/m}; K_d\delta\ \text{（刚性环境）}
caption: 指令压入量$\delta = 10\,\mathrm{mm}$时接触力随阻抗刚度$K_d$（N/m，横轴）的变化，环境刚度$k_e$由滑块设定。当$K_d \ll k_e$时，力沿直线$K_d\delta$变化，几乎与$k_e$无关：设计者的弹簧决定了力。把$k_e$降到接近$5\,\mathrm{kN/m}$（一块泡沫垫），曲线就在直线下方很远处弯折：此时环境自身的柔度限制了力。
:::

## 混合位置/力控制 {#sec-hybrid}

当任务在某些方向上要求工具自由运动、在另一些方向上受环境约束时，可以对两者分别进行控制。Mason 的**自然约束与人为约束**思想把这种划分形式化。在附着于任务的约束坐标系中，六个方向（三个平移、三个转动）中的每一个，要么在**速度**上受环境约束——因此位置无法控制，转而规定力——要么在**力**上受约束——因此力无法控制，转而规定位置。用平面工具擦桌子时，桌面施加自然约束$v_z = 0$、$\omega_x = \omega_y = 0$（工具不能压进桌面或倾斜），而无摩擦滑动施加$f_x = f_y = 0$、$n_z = 0$；任务对互补的量给出人为约束：压紧力$f_z = F_d$、力矩$n_x = n_y = 0$，以及在$x, y$方向上的擦拭运动和绕$z$的姿态。

::: algorithm 混合位置/力控制 {#alg-hybrid}
1. 选择一个任务（约束）坐标系和一个对角**选择矩阵**$S$，对位置控制方向取$S_{ii} = 1$，对力控制方向取$0$。
2. 在任务坐标中计算位置环指令$\mathbf w_x = K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}$和力环指令$\mathbf w_f = \mathbf F_d + K_f(\mathbf F_d - \mathbf F) + K_{fi}\int(\mathbf F_d - \mathbf F)\,dt$，其中$\mathbf F$为测得的力旋量。
3. 将两者组合，使每个方向只接收自己的回路：$\mathbf w = S\mathbf w_x + (I - S)\mathbf w_f$。
4. 用$\boldsymbol\tau = J^{\mathsf T}\mathbf w + \mathbf g(\mathbf q)$（$J$在任务坐标系中表示）映射为关节力矩，或者在基于模型的版本中通过任务空间惯量进行映射。
:::

力传感器和接触都是有噪声且刚硬的，所以力环通常采用积分作用和适中的带宽。在位置控制型机器人上，力环常常作为外环实现，在力控方向上调整位置参考值。

::: example 位置控制型机械臂上的积分力环 {#ex-force-loop}
一台位置控制下的刚硬工业机械臂把工具压在刚度为$k_e = 50\,\mathrm{kN/m}$的表面上。一个外环以速率$\dot x_c = K_f(F_d - F)$调整法向的指令位置，其中$F = k_e(x_c - x_w)$为测得的力（位置环比力环快得多，$x \approx x_c$）。选择$K_f$，使力的时间常数为$0.05\,\mathrm s$，并求$F_d$从 0 阶跃到$20\,\mathrm N$时的响应。
::: solution
对$F = k_e(x_c - x_w)$求导：$\dot F = k_e\dot x_c = k_eK_f(F_d - F)$，这是一个时间常数为$T_f = 1/(k_eK_f)$的一阶滞后环节。对$T_f = 0.05\,\mathrm s$，$K_f = 1/(50000\times0.05) = 4\times10^{-4}\,\mathrm{m/(N\,s)}$。阶跃后$F(t) = 20(1 - e^{-t/0.05})\,\mathrm N$：$50\,\mathrm{ms}$时达到 63%，$150\,\mathrm{ms}$时达到 95%，无超调，稳态误差为零（该回路是积分型的）。指令位置向表面内移动$20/50000 = 0.4\,\mathrm{mm}$。该设计依赖于$k_e$：在刚度大十倍的表面上，同样的$K_f$给出$5\,\mathrm{ms}$的时间常数，这可能超出位置环的带宽和力传感器的滤波能力，使回路失稳——力环增益必须按预期最刚硬的表面来设定。
:::
:::

::: quiz
机器人须把一根轴插入一个配合紧密的竖直孔中。在与孔轴线$z$对齐的约束坐标系中，插入阶段的哪种分配是正确的？
- [ ] 在$x$、$y$、$z$上位置控制；没有力控制
- [x] 在$x$、$y$上力控制（零力），绕$x$、$y$零力矩；沿$z$和绕$z$位置或速度控制
- [ ] 沿$z$力控制；在$x$、$y$上位置控制
- [ ] 在全部六个方向上力控制
::: solution
孔约束了横向运动和倾斜（自然约束$v_x = v_y = 0$、$\omega_x = \omega_y = 0$），所以这些方向以零期望力和零期望力矩进行力控制，让轴顺应孔。沿轴线的运动和绕轴线的转动是自由的，用位置（或速度）控制把轴推入。在$x$、$y$上指令位置会与孔"对抗"，造成卡阻。
:::
:::

::: history
最早的工业机械臂运行的是关节空间 PD 和 PID 回路。在 Luh、Walker 和 Paul（1980）说明如何在线计算逆动力学之后，计算力矩控制才变得实用。1981 年，Takegaki 和 Arimoto 用能量（李雅普诺夫）论证证明，带重力补偿的 PD 控制对任意正增益都能调节非线性机械臂；同年，喷气推进实验室的 Raibert 和 Craig 基于 Mason 的自然约束与人为约束发表了混合位置/力控制。霍根（Neville Hogan）分为三部分的论文《阻抗控制：一种操作方法》（"Impedance control: an approach to manipulation"，1985）指出，与环境交互的机械臂应当调节其机械阻抗；哈提卜（Oussama Khatib）的操作空间表述（1987）则在任务坐标中统一了运动控制和力控制。
:::

::: summary
- 每个关节近似为$J\ddot q + b\dot q = u - d$，其中$J$包含折算的转子转动惯量$N^2J_m$；耦合力矩、科里奥利力矩和重力矩构成扰动$d$，并因减速而减小。
- PD：$\omega_n = \sqrt{K_p/J}$，$\zeta = (b + K_d)/(2\sqrt{K_pJ})$，稳态误差$-d/K_p$；若$K_i < (b + K_d)K_p/J$，PID 可消除恒定误差。
- PD 加重力补偿$\boldsymbol\tau = -K_p\mathbf e - K_d\dot{\mathbf q} + \mathbf g(\mathbf q)$对任意正定增益都全局渐近稳定（李雅普诺夫函数：动能加弹簧能；利用$\dot M - 2C$的反对称性）。
- 计算力矩$\boldsymbol\tau = M(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e) + C\dot{\mathbf q} + \mathbf g$给出线性解耦的误差动态$\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0$；模型误差起扰动作用。
- 任务空间 PD$\boldsymbol\tau = J^{\mathsf T}(K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}) + \mathbf g$无须对$J$求逆即可得到笛卡儿刚度。
- 阻抗控制规定$M_d\ddot{\tilde{\mathbf x}} + D_d\dot{\tilde{\mathbf x}} + K_d\tilde{\mathbf x} = \mathbf F_{\text{ext}}$；压向刚度为$k_e$的表面时，接触力为串联弹簧值$K_dk_e\delta/(K_d + k_e)$。导纳控制围绕位置环实现阻抗控制。
- 混合控制按照自然约束与人为约束，用选择矩阵把任务方向划分为位控方向和力控方向。
:::

## 习题

::: exercise 由性能指标求 PD 增益 {#exr-gains level=1 check="32"}
一个关节的$J = 0.50\,\mathrm{kg\,m^2}$，摩擦可忽略。选择$K_p$和$K_d$，使$\omega_n = 8\,\mathrm{rad/s}$，$\zeta = 0.7$。（以 N·m/rad 为单位输入$K_p$。）
::: solution
$K_p = J\omega_n^2 = 0.5\times64 = 32\,\mathrm{N\,m/rad}$；$K_d = 2\zeta\omega_nJ = 2\times0.7\times8\times0.5 = 5.6\,\mathrm{N\,m\,s/rad}$。此时阶跃响应的超调量为$e^{-\pi\zeta/\sqrt{1-\zeta^2}} = 4.6\%$。
:::
:::

::: exercise 重力作用下的下垂 {#exr-sag level=1 check="0.15"}
一个$K_p = 40\,\mathrm{N\,m/rad}$的 PD 控制关节托住一根重力矩为$6.0\,\mathrm{N\,m}$的连杆。稳态误差是多少？（以 rad 为单位输入其大小。）
::: solution
$\lvert e_{ss}\rvert = d/K_p = 6.0/40 = 0.15\,\mathrm{rad} = 8.6^\circ$。如果模型正确，重力补偿可以完全消除它；积分器则会缓慢地消除它。
:::
:::

::: exercise 串联弹簧 {#exr-series level=1 check="4.5455"}
一个阻抗刚度为$1000\,\mathrm{N/m}$的工具被指令压入刚度为$10\,\mathrm{kN/m}$的表面$5\,\mathrm{mm}$。产生的接触力是多少？（以 N 为单位输入$F$，保留四位小数。）
::: solution
$F = \frac{1000\times10000}{11000}\times0.005 = 909.09\times0.005 = 4.5455\,\mathrm N$。表面被压缩$0.45\,\mathrm{mm}$。
:::
:::

::: exercise PID 稳定极限 {#exr-pid level=2 check="734"}
对[[#ex-pd]]中$K_p = 36.7\,\mathrm{N\,m/rad}$、$K_d = 7.24\,\mathrm{N\,m\,s/rad}$的关节，推导使 PID 回路稳定的最大积分增益。（以 N·m/(rad·s) 为单位输入$K_i$。）
::: solution
特征多项式为$0.367s^3 + 7.34s^2 + 36.7s + K_i$。劳斯表的第一列为$0.367$、$7.34$、$(7.34\times36.7 - 0.367K_i)/7.34$、$K_i$；它们全为正当且仅当$0 < K_i < 7.34\times36.7/0.367 = 734$。当$K_i = 734$时，一对根位于虚轴上$s = \pm j\sqrt{36.7/0.367} = \pm10j$处：回路以$\omega_n$振荡。
:::
:::

::: exercise 力环增益 {#exr-force level=2 check="0.002"}
对于[[#ex-force-loop]]中的积分力环，若表面刚度为$k_e = 10\,\mathrm{kN/m}$，什么增益$K_f$能给出$0.05\,\mathrm s$的时间常数？（以 m/(N·s) 为单位输入$K_f$。）
::: solution
$K_f = 1/(k_eT_f) = 1/(10^4\times0.05) = 2\times10^{-3}\,\mathrm{m/(N\,s)}$，是$50\,\mathrm{kN/m}$表面所用值的五倍。为软表面整定的回路在硬表面上会快五倍——应按最硬的表面整定。
:::
:::

::: exercise 存在速度误差时的计算力矩 {#exr-ct level=2 check="10.51"}
在位置误差相同、但$\dot{\mathbf e} = (0.05, 0)\,\mathrm{rad/s}$的条件下重做[[#ex-computed-torque]]。（以 N·m 为单位输入$\tau_1$，保留两位小数。）
::: solution
指令加速度改变$-K_d\dot{\mathbf e} = (-2.0, 0)$，所以$\mathbf v = (-4.0, 9.0)\,\mathrm{rad/s^2}$，$\boldsymbol\tau$改变$M(-2.0, 0) = (-2.26, -0.475)\,\mathrm{N\,m}$：$\boldsymbol\tau = (12.77 - 2.26,\ 0.845 - 0.475) = (10.51, 0.370)\,\mathrm{N\,m}$。比参考值转得快的关节 1 被更强地制动，并且通过$m_{21}$，关节 2 的力矩也随之改变。
:::
:::

::: exercise 笛卡儿 PD 控制的稳定性 {#exr-cartesian level=3}
证明：采用对称正定的$K_x$、$D_x$和恒定的$\mathbf x_d$时，任务空间控制律[[#eq-cartesian-pd]]使$V = \frac12\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} + \frac12\tilde{\mathbf x}^{\mathsf T}K_x\tilde{\mathbf x}$（$\tilde{\mathbf x} = \mathbf x - \mathbf x_d$）不增加，并说明关于收敛性可以得出什么结论。再证明：在平衡点附近，小关节位移所感受到的关节空间刚度为$J^{\mathsf T}K_xJ$。
::: solution
$\dot V = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \frac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q} + \tilde{\mathbf x}^{\mathsf T}K_x\dot{\mathbf x}$。利用$M\ddot{\mathbf q} = J^{\mathsf T}(-K_x\tilde{\mathbf x} - D_x\dot{\mathbf x}) - C\dot{\mathbf q}$和$\dot{\mathbf x} = J\dot{\mathbf q}$：
$\dot V = -\dot{\mathbf x}^{\mathsf T}K_x\tilde{\mathbf x} - \dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} + \frac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q} + \tilde{\mathbf x}^{\mathsf T}K_x\dot{\mathbf x} = -\dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} \le 0$。轨线有界。在集合$\dot V = 0$上，$\dot{\mathbf x} = J\dot{\mathbf q} = \mathbf 0$；如果$J$沿途非奇异，这意味着$\dot{\mathbf q} = \mathbf 0$，于是$\ddot{\mathbf q} = \mathbf 0$且$J^{\mathsf T}K_x\tilde{\mathbf x} = \mathbf 0$，故$\tilde{\mathbf x} = \mathbf 0$（同样需要$J$非奇异）。由拉萨尔原理得收敛到$\mathbf x_d$——但一般只是局部的：在奇异位形处，$J^{\mathsf T}K_x\tilde{\mathbf x}$可以在$\tilde{\mathbf x} \ne \mathbf 0$时为零，机械臂可能停在那里；对于冗余机械臂，$\mathbf q$本身不一定收敛（除非加入关节阻尼，否则自运动是无阻尼的）。刚度：对于偏离平衡点的小关节位移$\delta\mathbf q$，$\delta\mathbf x = J\delta\mathbf q$，恢复力矩为$-J^{\mathsf T}K_x\delta\mathbf x = -J^{\mathsf T}K_xJ\,\delta\mathbf q$。
:::
:::

::: exercise 计算力矩对重力误差的鲁棒性 {#exr-robust level=3 check="0.006812"}
一个真实动力学为$J\ddot q + g = \tau$的单关节采用计算力矩控制，$J = 0.367\,\mathrm{kg\,m^2}$正确，但重力估计为$\hat g = g + \Delta g$，其中$\Delta g = 1.0\,\mathrm{N\,m}$为常数，增益为$K_p = 400\,\mathrm{s^{-2}}$、$K_d = 40\,\mathrm{s^{-1}}$。推导误差方程以及恒定设定值下的稳态误差。（以 rad 为单位输入$e_{ss}$，保留六位小数。）
::: solution
$\tau = J(\ddot q_d - K_d\dot e - K_pe) + \hat g$，故$J\ddot q + g = J(\ddot q_d - K_d\dot e - K_pe) + g + \Delta g$，即$\ddot e + K_d\dot e + K_pe = \Delta g/J$。稳态时$e_{ss} = \Delta g/(JK_p) = 1.0/(0.367\times400) = 0.006812\,\mathrm{rad} = 0.39^\circ$，为正（由于控制器对重力过补偿，机械臂停在目标上方）。由于计算力矩的增益要乘以$J$，有效刚度为$JK_p = 147\,\mathrm{N\,m/rad}$。在外环中加入积分项，即在$\mathbf v$上加$-K_i\int e\,dt$，可以消除这一误差。
:::
:::

::: exercise 为机器人抛光选择控制器 {#exr-design level=3}
一台六轴工业机械臂（刚硬、位置控制，腕部带六维力传感器）须抛光一块弯曲的汽车车身面板，其形状只知道到$\pm2\,\mathrm{mm}$的精度，要求以$30 \pm 3\,\mathrm N$的力压紧，同时以$0.1\,\mathrm{m/s}$沿表面移动。提出一种控制结构，说明哪些方向力控、哪些方向位控，如何选择增益，以及可能出现什么问题。
::: solution
一个好的答案：在附着于工具、与局部表面法线$z$对齐的任务坐标系中采用混合力/位置（或导纳）控制。自然约束：表面阻止沿$z$的运动和绕$x$、$y$的倾斜（若工具是平的），所以控制法向力$f_z = 30\,\mathrm N$以及零力矩$n_x$、$n_y$（让工具与表面贴合）；在$x$、$y$上和绕$z$的姿态上控制位置（抛光路径）。由于机械臂是位置控制的，把力环实现为调整法向位置参考值的外部导纳环或积分环（[[#ex-force-loop]]），按预期最刚硬的接触（面板加上工具和传感器的柔度）进行整定；柔顺的抛光垫降低$k_e$，使回路更鲁棒。$\pm2\,\mathrm{mm}$的形状不确定度加上$30\,\mathrm N$的力和$\pm3\,\mathrm N$的公差意味着，如果回路只是比例型的，力环所见的有效接触刚度应低于约$3\,\mathrm N/2\,\mathrm{mm} = 1.5\,\mathrm{N/mm}$，这就是需要积分作用（或软垫）的原因。根据 CAD 模型前馈预期的法线方向，使力环只修正小误差。风险：在边缘处失去接触（此时力环驱动工具向面板运动——应限制指令速度和位置修正量），$x$、$y$方向的摩擦力干扰力测量（加以补偿或滤波），传感器噪声和漂移（在非接触时对传感器清零，进行低通滤波），以及速度：在$0.1\,\mathrm{m/s}$下表面法线沿路径不断变化，因此任务坐标系必须连续更新。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 的教材讲述考虑执行器动力学的独立关节控制、PD 加重力补偿和计算力矩控制，并以本章的记法给出李雅普诺夫证明；Siciliano 等人的教材详细论述阻抗控制、导纳控制、力控制和混合控制；Lynch 与 Park 的教材用旋量记法讲述任务空间运动控制和混合运动-力控制。
