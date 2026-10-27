正运动学回答的是"给定关节，工具在哪里？"；而实际向机器人提出的问题恰好相反："工具必须在这里——关节应当怎样？"焊接程序规定空间中的一条焊缝，视觉系统报告零件的位姿，遥操作者移动手控器；在每种情况下，控制器都必须对期望位姿$T_d$求出满足$T(\boldsymbol\theta) = T_d$的关节值$\boldsymbol\theta$。这就是**逆运动学**（IK）问题，它确实比正运动学问题更难：它是一个非线性三角方程组，可能无解（目标超出可达范围），可能有多个解（肘部可以向上或向下），也可能有无穷多个解（冗余机械臂）。本章用两种方法求解它。**解析法**：对平面机械臂，以及——借助皮珀（Pieper）的腕心解耦——对在工业中占主导地位的带球形腕的六轴机械臂，以封闭形式给出全部解，使控制器可以在其中进行选择。**数值法**：牛顿-拉弗森迭代及其阻尼最小二乘变体，它们适用于任何机械臂，但只返回初始猜测附近的一个解，并且在奇异位形附近需要小心处理。正运动学和坐标系约定取自[[robotics/forward-kinematics]]；数值方法所用的雅可比矩阵在[[robotics/jacobians]]中完整建立。

## 逆问题 {#sec-problem}

::: definition 逆运动学 {#def-ik}
给定正运动学映射$\boldsymbol\theta\mapsto T(\boldsymbol\theta)$和期望的末端执行器位姿$T_d\in SE(3)$（或者只是期望位置，或平面位置和角度），**逆运动学问题**就是在允许的关节范围内求出所有满足$T(\boldsymbol\theta) = T_d$的$\boldsymbol\theta$。每个这样的$\boldsymbol\theta$称为一个**逆运动学解**；所有解的集合可能为空、有限，或为一个连续统。
:::

数一数方程和未知数，就能解释这三种情况。位姿有六个独立分量；有$n$个关节的机械臂有$n$个未知数。若$n < 6$，一般位姿根本无法到达，只能退而求其次（只要求位置，或位置加一个方向）。若$n = 6$，六个未知数的六个方程一般有有限个解：对一般的 6R 机械臂，解是一个 16 次多项式的根（Primrose 于 1986 年证明解至多有 16 个，并且存在达到 16 个解的例子），而带球形腕的机械臂至多有 8 个解。若$n > 6$，机械臂是冗余的，解构成一个$n - 6$维的族，需要用一个次要准则从中选出一个（[[robotics/jacobians]]）。

工业中偏好解析（封闭形式）解：它们快速且确定，能列出全部解，并且使机器人在整个运动过程中保持在同一种"位形"（肘部向上、腕部不翻转）成为可能。研究中以及对没有特殊几何结构的机械臂，则偏好数值解。

## 平面二连杆机械臂 {#sec-2r}

每一种封闭形式的方法都依赖于两个工具：余弦定理，它把距离转化为关节角；以及双变量反正切$\operatorname{atan2}(y, x)$，它返回点$(x, y)$在$(-\pi, \pi]$中且象限正确的角度。平面 2R 机械臂同时用到这两者。

::: proposition 平面 2R 机械臂的逆运动学 {#prop-2r-ik}
设连杆长度为$L_1, L_2 > 0$的平面 2R 机械臂的末端位置为$(x, y)$，并令
$$
D = \frac{x^2 + y^2 - L_1^2 - L_2^2}{2L_1L_2}.
$$
若$\lvert D\rvert > 1$，则无解。若$\lvert D\rvert \le 1$，则解为
$$
\theta_2 = \operatorname{atan2}\!\big(\pm\sqrt{1 - D^2},\ D\big),\qquad
\theta_1 = \operatorname{atan2}(y, x) - \operatorname{atan2}\!\big(L_2\sin\theta_2,\ L_1 + L_2\cos\theta_2\big),
$$ {#eq-2r-ik}
当$\lvert D\rvert < 1$时有两个不同的解（"肘部向上"和"肘部向下"），当$\lvert D\rvert = 1$时有一个解（手臂伸直或折叠）。若$(x, y) = (0, 0)$且$L_1 = L_2$，则$\theta_2 = \pi$，$\theta_1$任意。
:::

::: proof
由正运动学$x = L_1c_1 + L_2c_{12}$、$y = L_1s_1 + L_2s_{12}$，末端距离满足$x^2 + y^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$（同[[robotics/forward-kinematics]]），故$\cos\theta_2 = D$；实数$\theta_2$存在当且仅当$\lvert D\rvert \le 1$，此时$\sin\theta_2 = \pm\sqrt{1 - D^2}$。对$(\sin\theta_2, \cos\theta_2)$这一对数用`atan2`而不用$\arccos D$，既保留了两种符号，又避免了$\arccos$在$\pm1$附近的病态。对于$\theta_1$，展开$c_{12}$和$s_{12}$：
$$
\begin{bmatrix} x\\ y\end{bmatrix} = \begin{bmatrix} k_1 & -k_2\\ k_2 & k_1\end{bmatrix}\begin{bmatrix} c_1\\ s_1\end{bmatrix},
\qquad k_1 = L_1 + L_2\cos\theta_2,\quad k_2 = L_2\sin\theta_2 .
$$
写$(k_1, k_2) = \rho(\cos\gamma, \sin\gamma)$，其中$\gamma = \operatorname{atan2}(k_2, k_1)$，$\rho = \sqrt{k_1^2 + k_2^2}$。则$x = \rho\cos(\theta_1 + \gamma)$，$y = \rho\sin(\theta_1 + \gamma)$，故$\theta_1 + \gamma = \operatorname{atan2}(y, x)$，这就是[[#eq-2r-ik]]。这需要$\rho > 0$；$\rho = 0$只在$L_1 = L_2$且$\theta_2 = \pi$时发生，即末端位于基座处，此时对每个$\theta_1$都有$x = y = 0$。从几何上看，$\operatorname{atan2}(y, x)$是目标的方向，$\gamma$是第一根连杆与从基座到末端的连线之间的夹角。
:::

::: example 肘部向上与肘部向下 {#ex-2r-ik}
一台 2R 机械臂的$L_1 = 0.6\,\mathrm m$，$L_2 = 0.5\,\mathrm m$。求使末端位于$(0.7, 0.6)\,\mathrm m$的全部关节角。
::: solution
$x^2 + y^2 = 0.49 + 0.36 = 0.85\,\mathrm{m^2}$，所以
$$
D = \frac{0.85 - 0.36 - 0.25}{2(0.6)(0.5)} = \frac{0.24}{0.60} = 0.4, \qquad \sqrt{1 - D^2} = 0.9165 .
$$
$\lvert D\rvert < 1$：有两个解，$\theta_2 = \operatorname{atan2}(\pm0.9165, 0.4) = \pm66.42^\circ$。目标方向为$\operatorname{atan2}(0.6, 0.7) = 40.60^\circ$。
对$\theta_2 = +66.42^\circ$：$\gamma = \operatorname{atan2}(0.5\times0.9165,\ 0.6 + 0.5\times0.4) = \operatorname{atan2}(0.4583, 0.8) = 29.81^\circ$，故$\theta_1 = 40.60^\circ - 29.81^\circ = 10.80^\circ$。
对$\theta_2 = -66.42^\circ$：$\gamma = -29.81^\circ$，$\theta_1 = 70.41^\circ$。
验算第一个解：$x = 0.6\cos10.80^\circ + 0.5\cos77.22^\circ = 0.5894 + 0.1106 = 0.700\,\mathrm m$，$y = 0.6\sin10.80^\circ + 0.5\sin77.22^\circ = 0.1124 + 0.4876 = 0.600\,\mathrm m$ ✓。两个解关于从基座到目标的连线互为镜像：$\theta_1$的两个值关于$40.60^\circ$对称（$40.60 \mp 29.81$）。
:::
:::

两个解背后的图像可以在误差地形中看到。把末端与目标之间的距离平方画成$(\theta_1, \theta_2)$的函数：它有两个零点，每个解对应一个，中间被一道山脊隔开。

::: widget contour
f: (0.6*cos(x) + 0.5*cos(x + y) - px)^2 + (0.6*sin(x) + 0.5*sin(x + y) - py)^2
x: -3.1416, 3.1416
y: -3.1416, 3.1416
levels: 18
sliders: px=0.7:-1.2:1.2:0.05; py=0.6:-1.2:1.2:0.05
point: 0, 1.57
caption: 2R 机械臂（$L_1 = 0.6$，$L_2 = 0.5\,\mathrm m$）对目标$(p_x, p_y)$的位置误差平方$\lVert\mathbf f(\boldsymbol\theta) - \mathbf p_d\rVert^2$在关节空间中的分布，$x = \theta_1$，$y = \theta_2$，单位为弧度。对默认目标，有两个误差为零的极小点，位于$(0.188, 1.159)$和$(1.229, -1.159)$ rad——肘部向上和肘部向下。拖动该点：梯度箭头就是基于梯度的逆运动学步骤将要采取的方向，而你滑入哪个极小点取决于从哪里出发。把目标移到可达范围之外（$p_x = 1.2$，$p_y = 0$）：零点消失，只剩一个极小点，即指向目标的伸直手臂。把目标移近基座：随着手臂折叠，两个极小点合并。
:::

### 加入姿态：平面 3R 机械臂

平面 3R 机械臂能以姿态角$\phi$把工具放到$(x, y)$处。可推广到六轴机械臂的技巧是：从工具倒推到**腕点**——关节 3 的位置——它与$\theta_3$无关：
$$
x_w = x - L_3\cos\phi, \qquad y_w = y - L_3\sin\phi .
$$
对$(x_w, y_w)$求解 2R 问题，然后$\theta_3 = \phi - \theta_1 - \theta_2$。

::: example 带姿态的平面 3R {#ex-3r-ik}
对[[robotics/forward-kinematics]]中的 3R 机械臂（$L_1 = 0.4$，$L_2 = 0.3$，$L_3 = 0.1\,\mathrm m$），求工具位姿$(x, y, \phi) = (0.4948\,\mathrm m, 0.5605\,\mathrm m, 45^\circ)$的全部解。
::: solution
腕点：$x_w = 0.4948 - 0.1\cos45^\circ = 0.4241\,\mathrm m$，$y_w = 0.5605 - 0.0707 = 0.4898\,\mathrm m$。于是$D = (0.4241^2 + 0.4898^2 - 0.16 - 0.09)/(2\times0.4\times0.3) = (0.4197 - 0.25)/0.24 = 0.7073$，故$\theta_2 = \pm45.0^\circ$。目标方向$\operatorname{atan2}(0.4898, 0.4241) = 49.1^\circ$；对$\theta_2 = 45^\circ$，$\gamma = \operatorname{atan2}(0.3\sin45^\circ, 0.4 + 0.3\cos45^\circ) = \operatorname{atan2}(0.2121, 0.6121) = 19.1^\circ$，得$\theta_1 = 30.0^\circ$，$\theta_3 = 45^\circ - 30.0^\circ - 45.0^\circ = -30.0^\circ$。另一个解为$\theta_1 = 68.2^\circ$，$\theta_2 = -45.0^\circ$，$\theta_3 = 45^\circ - 68.2^\circ + 45.0^\circ = 21.8^\circ$。第一个解恢复了[[robotics/forward-kinematics]]中用来计算该目标的位形$(30^\circ, 45^\circ, -30^\circ)$ ✓。
:::
:::

## 六轴机械臂：运动学解耦 {#sec-pieper}

六个角度的六个非线性方程一般没有封闭形式解，但大多数工业机械臂在构造上使其有解：它们最后三个关节的轴线交于一点，即**腕心**，构成球形腕。于是问题分解为前三个关节的位置问题和后三个关节的姿态问题。

::: proposition 腕心处的运动学解耦 {#prop-decoupling}
设关节 4、5、6 的轴线交于点$\mathbf o_c$，工具坐标系原点沿工具$z$轴位于距$\mathbf o_c$为$d_6$处。对期望位姿$T_d = (R_d, \mathbf p_d)$：
1. 腕心必须位于$\mathbf p_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$；它只依赖于$\theta_1, \theta_2, \theta_3$，通过求解$\mathbf o_c(\theta_1,\theta_2,\theta_3) = \mathbf p_c$得到它们。
2. 已知$\theta_1, \theta_2, \theta_3$后，腕部必须提供转动$R_{36} = R_{03}(\theta_1,\theta_2,\theta_3)^{\mathsf T}R_d$，对球形腕而言，这就是一组关于$(\theta_4, \theta_5, \theta_6)$的欧拉角。
:::

::: proof
关节 4、5、6 使外侧连杆绕通过$\mathbf o_c$的轴线转动，因此它们不能移动$\mathbf o_c$：其位置只是前三个关节的函数。工具原点为$\mathbf o_6 = \mathbf o_c + d_6R_{06}\hat{\mathbf z}$（偏移量是沿工具自身$z$轴的$d_6$，该轴在空间中的方向是$R_{06}$的第三列）。令$\mathbf o_6 = \mathbf p_d$且$R_{06} = R_d$，得$\mathbf o_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$，即第 1 部分。对于第 2 部分，$R_{06} = R_{03}R_{36}$，其中$R_{36}$只依赖于$\theta_4, \theta_5, \theta_6$；在$R_{03}R_{36} = R_d$两边左乘$R_{03}^{\mathsf T}$即得所述的$R_{36}$。对于标准球形腕（D-H 参数行为$(0, -90^\circ, 0, \theta_4)$、$(0, 90^\circ, 0, \theta_5)$、$(0, 0, d_6, \theta_6)$），三个旋转块的乘积为$\mathrm{Rot}_z(\theta_4)\mathrm{Rot}_y(\theta_5)\mathrm{Rot}_z(\theta_6)$，所以$(\theta_4,\theta_5,\theta_6)$就是$R_{36}$的 ZYZ 欧拉角，按[[robotics/rigid-motions]]中的方法提取。
:::

[[robotics/forward-kinematics]]中肘型机械臂（腰关节$\theta_1$、肩关节$\theta_2$和肘关节$\theta_3$，$\mathbf o_c = \mathbf o_3$）的位置问题用几何方法求解：腰关节角使手臂所在的竖直平面指向目标，
$$
\theta_1 = \operatorname{atan2}(y_c, x_c)\quad\text{或}\quad \theta_1 = \operatorname{atan2}(y_c, x_c) + \pi ,
$$
在该平面内，肩关节和肘关节构成连杆为$a_2, a_3$的 2R 机械臂，它必须到达水平距离为$r = \pm\sqrt{x_c^2 + y_c^2}$（对"向后伸"的$\theta_1$取负号）、在肩关节以上高度为$s = z_c - d_1$的点。[[#prop-2r-ik]]对每个$\theta_1$给出两个解：手臂共有四个解，每个再与两个腕部解组合，共有**八个**逆运动学解。

::: example 肘型机械臂的四个手臂解 {#ex-elbow-ik}
$d_1 = 0.50$、$a_2 = 0.60$、$a_3 = 0.50\,\mathrm m$的肘型机械臂须把腕心置于$\mathbf p_c = (0.7857, 0.4536, 0.7949)\,\mathrm m$。求全部$(\theta_1, \theta_2, \theta_3)$。
::: solution
$\theta_1 = \operatorname{atan2}(0.4536, 0.7857) = 30.0^\circ$（前方）或$210.0^\circ$（后方）。水平距离$\sqrt{0.7857^2 + 0.4536^2} = 0.9073\,\mathrm m$；肩关节以上的高度$s = 0.7949 - 0.50 = 0.2949\,\mathrm m$。肘关节：$D = (0.9073^2 + 0.2949^2 - 0.36 - 0.25)/(2\times0.6\times0.5) = (0.9100 - 0.61)/0.60 = 0.500$，故$\theta_3 = \pm60.0^\circ$。
**前方**（$r = +0.9073$）：手臂平面内指向目标的方向$\operatorname{atan2}(0.2949, 0.9073) = 18.0^\circ$；对$\theta_3 = -60^\circ$，$\gamma = \operatorname{atan2}(0.5\sin(-60^\circ), 0.6 + 0.5\cos60^\circ) = \operatorname{atan2}(-0.4330, 0.85) = -27.0^\circ$，故$\theta_2 = 45.0^\circ$；对$\theta_3 = +60^\circ$，$\theta_2 = 18.0^\circ - 27.0^\circ = -9.0^\circ$。
**后方**（$\theta_1 = 210^\circ$，$r = -0.9073$）：方向$\operatorname{atan2}(0.2949, -0.9073) = 162.0^\circ$，给出$\theta_3 = +60^\circ$时$\theta_2 = 135.0^\circ$，以及$\theta_3 = -60^\circ$时$\theta_2 = 189.0^\circ$（$= -171.0^\circ$）。
解$(30^\circ, 45^\circ, -60^\circ)$正是[[robotics/forward-kinematics]]中用来计算$\mathbf p_c$的位形 ✓。其余的是"肘部向下"解（$(30^\circ, -9^\circ, 60^\circ)$）和两个"越过顶部伸出"的解，在真实机械臂上后两者通常会超出肩关节的关节限位。用正运动学验算其中一个：对$(30^\circ, -9^\circ, 60^\circ)$，$r = 0.6\cos(-9^\circ) + 0.5\cos51^\circ = 0.5926 + 0.3147 = 0.9073$ ✓，$s = 0.6\sin(-9^\circ) + 0.5\sin51^\circ = -0.0939 + 0.3886 = 0.2947 \approx 0.2949$ ✓（舍入误差）。
:::
:::

::: example 腕部关节角 {#ex-wrist}
求出手臂关节角之后，所需的腕部转动计算为
$$
R_{36} = R_{03}^{\mathsf T}R_d = \begin{bmatrix} 0.5798 & -0.4730 & 0.6634\\ 0.0400 & 0.8298 & 0.5567\\ -0.8138 & -0.2962 & 0.5000\end{bmatrix}.
$$
对 ZYZ 球形腕，求两组腕部关节角$(\theta_4, \theta_5, \theta_6)$。
::: solution
用[[robotics/rigid-motions]]中的 ZYZ 提取公式：$\theta_5 = \operatorname{atan2}(\pm\sqrt{r_{13}^2 + r_{23}^2},\ r_{33}) = \operatorname{atan2}(\pm\sqrt{0.4401 + 0.3099},\ 0.5) = \operatorname{atan2}(\pm0.8660, 0.5) = \pm60.0^\circ$。
对$\theta_5 = +60^\circ$（$\sin\theta_5 > 0$）：$\theta_4 = \operatorname{atan2}(r_{23}, r_{13}) = \operatorname{atan2}(0.5567, 0.6634) = 40.0^\circ$，$\theta_6 = \operatorname{atan2}(r_{32}, -r_{31}) = \operatorname{atan2}(-0.2962, 0.8138) = -20.0^\circ$。
对$\theta_5 = -60^\circ$，$\sin\theta_5$的所有符号都翻转：$\theta_4 = \operatorname{atan2}(-r_{23}, -r_{13}) = -140.0^\circ$，$\theta_6 = \operatorname{atan2}(-r_{32}, r_{31}) = 160.0^\circ$。
两个解的$\theta_4$和$\theta_6$相差$180^\circ$，$\theta_5$符号相反——这就是"腕部翻转"。验算：两者都有$r_{33} = \cos\theta_5 = 0.5$ ✓；$r_{13} = \cos\theta_4\sin\theta_5 = \cos40^\circ\sin60^\circ = 0.6634$ ✓。在$\theta_5 = 0$处腕部奇异：轴 4 与轴 6 共线，只有$\theta_4 + \theta_6$是确定的。
:::
:::

::: warning 使用 atan2，并有意识地选择解
写$\theta = \arctan(y/x)$会丢失象限（它无法区分$(1,1)$与$(-1,-1)$），并在$x = 0$处失效；写$\theta = \arccos(D)$会丢失符号。本章的每一个封闭形式逆运动学解都对正弦-余弦对使用$\operatorname{atan2}$。其次，在真实机器人上，只返回"一个"解的逆运动学程序是不够的：沿路径的相继目标必须用**同一个**解支（肘部向上、腕部不翻转）求解，否则手臂会在两个相近位姿之间大幅摆动。选定一次解支，检查关节限位，并在路径点之间优先选择最接近当前关节矢量的解，同时考虑角度的周期回绕（$179^\circ$与$-179^\circ$只相差$2^\circ$）。
:::

## 数值逆运动学 {#sec-numerical}

对于没有球形腕的机械臂、冗余机械臂，以及只规定部分位姿的任务，逆运动学方程用迭代法求解。把任务写成求$\mathbf e(\boldsymbol\theta) = \mathbf x_d - \mathbf f(\boldsymbol\theta)$的根，其中$\mathbf f$是用任务坐标矢量（位置，或位置加上适当的姿态误差）表示的正运动学。在猜测值$\boldsymbol\theta_k$附近，由泰勒定理得$\mathbf f(\boldsymbol\theta_k + \Delta\boldsymbol\theta) \approx \mathbf f(\boldsymbol\theta_k) + J(\boldsymbol\theta_k)\Delta\boldsymbol\theta$，其中$J = \partial\mathbf f/\partial\boldsymbol\theta$为雅可比矩阵；令线性化误差为零就得到牛顿法（[数学图谱中的数值分析](/learn/maths/lesson.php?c=numerical-analysis)）。

::: algorithm 牛顿-拉弗森逆运动学 {#alg-newton-ik}
输入：目标$\mathbf x_d$，初始猜测$\boldsymbol\theta_0$（通常为当前关节矢量），容差$\varepsilon$，迭代次数上限$k_{\max}$。
1. 计算$\mathbf e_k = \mathbf x_d - \mathbf f(\boldsymbol\theta_k)$。若$\lVert\mathbf e_k\rVert < \varepsilon$，停止并返回$\boldsymbol\theta_k$。
2. 计算$J_k = J(\boldsymbol\theta_k)$，并求解$J_k\Delta\boldsymbol\theta = \mathbf e_k$（$J$为方阵），或用伪逆取$\Delta\boldsymbol\theta = J_k^{+}\mathbf e_k$（$J$非方阵）。
3. 令$\boldsymbol\theta_{k+1} = \boldsymbol\theta_k + \Delta\boldsymbol\theta$，把转动关节角折回$(-\pi, \pi]$，然后重复。若$k > k_{\max}$，报告失败。
:::

在$J$可逆的解附近，牛顿法**二次**收敛：正确的有效数字位数大约每步翻一番。远离解或在奇异位形附近时，它可能迈出很大的步长而四处游荡。

::: example 2R 机械臂的牛顿迭代 {#ex-newton}
从猜测值$\boldsymbol\theta_0 = (0, \pi/2)$出发，用数值方法求解[[#ex-2r-ik]]。
::: solution
2R 雅可比矩阵（在[[robotics/jacobians]]中推导）为
$$
J = \begin{bmatrix} -L_1s_1 - L_2s_{12} & -L_2s_{12}\\ L_1c_1 + L_2c_{12} & L_2c_{12}\end{bmatrix}.
$$
**第 0 步。** $\mathbf f(\boldsymbol\theta_0) = (0.6 + 0.5\cos90^\circ,\ 0 + 0.5\sin90^\circ) = (0.6, 0.5)$，故$\mathbf e_0 = (0.1, 0.1)\,\mathrm m$，$\lVert\mathbf e_0\rVert = 0.141\,\mathrm m$，$J_0 = \begin{bmatrix} -0.5 & -0.5\\ 0.6 & 0\end{bmatrix}$。第二行给出$0.6\,\Delta\theta_1 = 0.1$，故$\Delta\theta_1 = 0.1667$；第一行$-0.5(0.1667) - 0.5\,\Delta\theta_2 = 0.1$给出$\Delta\theta_2 = -0.3667$。新的猜测值$\boldsymbol\theta_1 = (0.1667, 1.2041)\,\mathrm{rad}$。
**后续各步**（用同样方法计算）：

| $k$ | $\theta_1$（rad） | $\theta_2$（rad） | $\lVert\mathbf e_k\rVert$（m） |
|---|---|---|---|
| 0 | 0 | 1.5708 | $1.4\times10^{-1}$ |
| 1 | 0.1667 | 1.2041 | $1.4\times10^{-2}$ |
| 2 | 0.1881 | 1.1600 | $2.2\times10^{-4}$ |
| 3 | 0.1884 | 1.1593 | $6.3\times10^{-8}$ |
| 4 | 0.1884 | 1.1593 | $4.9\times10^{-15}$ |

极限$(0.1884, 1.1593)\,\mathrm{rad} = (10.80^\circ, 66.42^\circ)$就是[[#ex-2r-ik]]的肘部向上解。误差的指数大约每步翻一番（$10^{-2}, 10^{-4}, 10^{-8}, 10^{-15}$）——这就是二次收敛。若改从$(\pi/2, -\pi/2)$出发，迭代同样快速地收敛到肘部向下解$(70.41^\circ, -66.42^\circ)$；若从$(0, -\pi/2)$出发，猜测值位于下面误差地形中山脊的另一侧，最初几步步长很大，迭代值游荡约十步，最后收敛到肘部**向上**的解。牛顿法返回的是猜测值所在吸引域对应的解，这就是为什么当前关节矢量是自然的初始猜测。
:::
:::

当目标不可达，或手臂经过奇异位形附近时，$J$接近奇异，$J^{-1}\mathbf e$极大。补救办法是要求一个既能减小误差、**又**保持很小的步长。

::: proposition 阻尼最小二乘步 {#prop-dls}
对$\lambda > 0$，使
$$
\lVert J\Delta\boldsymbol\theta - \mathbf e\rVert^2 + \lambda^2\lVert\Delta\boldsymbol\theta\rVert^2
$$
最小的步长是唯一的，等于
$$
\Delta\boldsymbol\theta = (J^{\mathsf T}J + \lambda^2I)^{-1}J^{\mathsf T}\mathbf e = J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}\mathbf e .
$$ {#eq-dls}
沿$J$的奇异值为$\sigma$的奇异方向，增益为$\sigma/(\sigma^2 + \lambda^2) \le 1/(2\lambda)$，而不是精确逆的$1/\sigma$。
:::

::: proof
目标函数是$\Delta\boldsymbol\theta$的凸二次函数：$\Delta\boldsymbol\theta^{\mathsf T}(J^{\mathsf T}J + \lambda^2I)\Delta\boldsymbol\theta - 2\mathbf e^{\mathsf T}J\Delta\boldsymbol\theta + \mathbf e^{\mathsf T}\mathbf e$。当$\lambda > 0$时，其黑塞矩阵$2(J^{\mathsf T}J + \lambda^2I)$正定（因为$\mathbf u^{\mathsf T}J^{\mathsf T}J\mathbf u = \lVert J\mathbf u\rVert^2 \ge 0$），所以唯一的极小点就是梯度为零之处：$(J^{\mathsf T}J + \lambda^2I)\Delta\boldsymbol\theta = J^{\mathsf T}\mathbf e$。第二种形式来自恒等式$J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I) = (J^{\mathsf T}J + \lambda^2I)J^{\mathsf T}$，左乘$(J^{\mathsf T}J + \lambda^2I)^{-1}$并右乘$(JJ^{\mathsf T} + \lambda^2I)^{-1}$即得；它只需对一个$m\times m$矩阵（$m$为任务维数）求逆，对冗余机械臂而言计算量更小。关于增益，写出奇异值分解$J = U\Sigma V^{\mathsf T}$（[奇异值分解](/learn/maths/lesson.php?c=linear-algebra&l=svd)）；于是[[#eq-dls]]变为$\Delta\boldsymbol\theta = \sum_i \frac{\sigma_i}{\sigma_i^2 + \lambda^2}\mathbf v_i\mathbf u_i^{\mathsf T}\mathbf e$。函数$\sigma/(\sigma^2 + \lambda^2)$在$\sigma = \lambda$处取最大值$1/(2\lambda)$，并在$\sigma\to0$时趋于零，而$1/\sigma \to \infty$。
:::

**阻尼**$\lambda$（单位与任务坐标相同，这里是米）以精度换取鲁棒性：远离奇异位形时（$\sigma_i \gg \lambda$），步长几乎就是牛顿步；在奇异位形附近，步长受到限制。当$\lambda\to\infty$时，$\Delta\boldsymbol\theta \approx J^{\mathsf T}\mathbf e/\lambda^2$，这是沿$\frac12\lVert\mathbf e\rVert^2$的负梯度方向的一小步——即**雅可比转置**法，鲁棒但缓慢（线性收敛）。

::: example 对不可达目标的阻尼最小二乘 {#ex-dls}
要求 2R 机械臂（$L_1 = 0.6$，$L_2 = 0.5\,\mathrm m$，最大伸展距离$1.1\,\mathrm m$）从$\boldsymbol\theta_0 = (0.3, 0.6)\,\mathrm{rad}$出发，把末端置于$(1.3, 0)\,\mathrm m$。比较牛顿法与$\lambda = 0.3\,\mathrm m$的阻尼最小二乘法。
::: solution
目标超出可达范围$0.2\,\mathrm m$，所以不存在精确解；最好的结果是沿$+x$方向伸直的手臂$\boldsymbol\theta = (0, 0)$，误差为$0.2\,\mathrm m$。迭代结果（数值来自一段简短的脚本）：

| $k$ | 牛顿法 $\lVert\mathbf e_k\rVert$（m） | 牛顿法 $\lVert\Delta\boldsymbol\theta\rVert$（rad） | DLS $\lVert\mathbf e_k\rVert$（m） | DLS $\boldsymbol\theta_k$（rad） |
|---|---|---|---|---|
| 0 | 0.705 | 0.61 | 0.705 | $(0.300, 0.600)$ |
| 1 | 0.245 | 2.54 | 0.227 | $(-0.219, 0.360)$ |
| 2 | 0.670 | 1.64 | 0.206 | $(-0.090, 0.201)$ |
| 3 | 0.229 | 2.13 | 0.201 | $(-0.048, 0.099)$ |
| 4 | 0.490 | 1.45 | 0.200 | $(-0.024, 0.050)$ |
| 5 | 0.206 | 4.95 | 0.200 | $(-0.012, 0.025)$ |

牛顿法不断试图把手臂伸得超过其长度：当$\theta_2\to0$时雅可比矩阵变得奇异，步长增大到好几弧度，迭代值在各位形之间跳来跳去。阻尼最小二乘法则平稳地停在伸直的位形上，误差处于其最小值$0.200\,\mathrm m$，步长每次迭代减半。在在线控制器中，牛顿法的这种行为意味着剧烈的关节运动；这就是商用逆运动学求解器都采用阻尼的原因（通常只在奇异位形附近增大$\lambda$）。取$\lambda = 0.1\,\mathrm m$时，同样的 DLS 迭代仍会振荡（对这种几何结构而言阻尼太弱），而$\lambda = 0.2$–$0.5\,\mathrm m$都能收敛。
:::
:::

::: widget gradientdescent
f: (0.6*cos(x) + 0.5*cos(x + y) - 0.7)^2 + (0.6*sin(x) + 0.5*sin(x + y) - 0.6)^2
start: -1, -2.5
rate: 0.5
steps: 60
x: -3.1416, 3.1416
y: -3.1416, 3.1416
caption: 雅可比转置法就是对误差平方的一半进行梯度下降，这里针对 2R 机械臂和目标$(0.7, 0.6)\,\mathrm m$（$x = \theta_1$，$y = \theta_2$，单位为弧度）。拖动起点并改变学习率。从大多数起点出发，迭代值都会滑入两个零误差极小点之一（肘部向上或肘部向下），但速度缓慢，并沿着一条弯曲的谷底前进——与例题中牛顿法的四步作比较。学习率太大，迭代值会冲过头并呈之字形；学习率太小，进展就极其缓慢。
:::

::: quiz
要求一台带球形腕的六轴机械臂到达一个位于其工作空间内部深处、远离奇异位形的位姿。不考虑关节限位，一个完整的封闭形式求解器应返回多少个逆运动学解？
- [ ] 1
- [ ] 2
- [ ] 4
- [x] 8
::: solution
腰关节角有两种选择（前方或后方），每种对应两种肘部位形，每个手臂解又对应两种腕部位形（腕部翻转）：$2\times2\times2 = 8$。关节限位通常会排除其中几个；在奇异位姿处有些解会重合。
:::
:::

::: history
皮珀（Donald Pieper）1968 年在斯坦福大学的博士论文《计算机控制下操作臂的运动学》（*The Kinematics of Manipulators under Computer Control*）证明，最后三根轴线相交的六轴机械臂可以通过把位置和姿态分开而以封闭形式求解——此后几乎每一台工业机械臂都遵循这一设计准则，始于沙因曼（Victor Scheinman）1969 年的斯坦福臂。惠特尼（Daniel Whitney）1969 年关于分解运动速率控制的论文引入了迭代地使用逆雅可比矩阵来驱动手臂趋向目标的方法。一般的六转动关节问题在二十年间一直未能得到封闭形式解：Primrose 于 1986 年证明它至多有 16 个解，20 世纪 80 年代后期，Lee 与 Liang 以及 Raghavan 与 Roth 把它化为关于一个关节变量的 16 次多项式。
:::

::: summary
- 逆运动学求满足$T(\boldsymbol\theta) = T_d$的$\boldsymbol\theta$；解可能不存在，可能有有限个（一般 6R 机械臂至多 16 个，带球形腕的至多 8 个），也可能构成连续统（冗余机械臂）。
- 平面 2R：$D = (x^2 + y^2 - L_1^2 - L_2^2)/(2L_1L_2)$；可达当且仅当$\lvert D\rvert\le1$；$\theta_2 = \operatorname{atan2}(\pm\sqrt{1 - D^2}, D)$，$\theta_1 = \operatorname{atan2}(y, x) - \operatorname{atan2}(L_2s_2, L_1 + L_2c_2)$。
- 有姿态要求时，减去最后一根连杆得到腕点，对手臂求解，再求出最后一个角。
- 皮珀解耦：腕心$\mathbf p_c = \mathbf p_d - d_6R_d\hat{\mathbf z}$确定$\theta_1,\theta_2,\theta_3$；然后$R_{36} = R_{03}^{\mathsf T}R_d$给出腕部的欧拉角（两个解，即腕部翻转）。
- 牛顿-拉弗森法从好的猜测值出发二次收敛，并返回附近的解；阻尼最小二乘$\Delta\boldsymbol\theta = J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}\mathbf e$在奇异位形附近和目标不可达时限制步长。
- 始终使用 atan2，选定并保持一个解支，并遵守关节限位和角度周期回绕。
:::

## 习题

::: exercise 肘关节角 {#exr-elbow level=1 check="87.71"}
一台$L_1 = L_2 = 0.5\,\mathrm m$的 2R 机械臂须到达$(0.6, 0.4)\,\mathrm m$。求$\theta_2$的正解。（以度为单位输入$\theta_2$，保留两位小数。）
::: solution
$D = (0.36 + 0.16 - 0.25 - 0.25)/(2\times0.25) = 0.02/0.5 = 0.04$，故$\theta_2 = \operatorname{atan2}(\sqrt{1 - 0.0016}, 0.04) = 87.71^\circ$。目标距基座$0.721\,\mathrm m$，略大于$\sqrt2\times0.5 = 0.707\,\mathrm m$（肘部成直角时的伸展距离），因此$\theta_2$略小于$90^\circ$是一致的。
:::
:::

::: exercise 可达与否？ {#exr-reach level=1 check="0.88/0.56"}
一台 2R 机械臂的$L_1 = 0.7\,\mathrm m$，$L_2 = 0.4\,\mathrm m$。对目标$(1.2, 0.3)\,\mathrm m$计算$D$，并判断它是否可达。（精确输入$D$，例如以分数形式。）
::: solution
$D = (1.44 + 0.09 - 0.49 - 0.16)/(2\times0.7\times0.4) = 0.88/0.56 = 1.571 > 1$：不可达。实际上目标距离为$\sqrt{1.53} = 1.237\,\mathrm m$，而伸展距离只有$1.1\,\mathrm m$。数值求解器应当报告失败，或返回最接近的可达位形（指向目标的伸直手臂），而不是编造一个角度。
:::
:::

::: exercise 腰关节角 {#exr-waist level=1 check="126.87"}
肘型机械臂的腕心须位于$(-0.3, 0.4, 0.8)\,\mathrm m$。求"前方"腰关节角$\theta_1$。（以度为单位输入，取值在$(-180, 180]$内，保留两位小数。）
::: solution
$\theta_1 = \operatorname{atan2}(0.4, -0.3) = 126.87^\circ$；"后方"解为$126.87^\circ - 180^\circ = -53.13^\circ$，此时手臂越过上方伸出。注意$\arctan(0.4/(-0.3)) = -53.13^\circ$——普通的反正切返回的是后方解，这是一个典型的象限错误。
:::
:::

::: exercise 平面 3R 目标 {#exr-3r level=2 check="21.11"}
对$L_1 = 0.4$、$L_2 = 0.3$、$L_3 = 0.1\,\mathrm m$的 3R 机械臂，求$(x, y, \phi) = (0.5\,\mathrm m, 0.3\,\mathrm m, 90^\circ)$的两个解。（以度为单位输入$\theta_2 > 0$的那个解的$\theta_3$，保留两位小数。）
::: solution
腕点$(0.5 - 0.1\cos90^\circ,\ 0.3 - 0.1\sin90^\circ) = (0.5, 0.2)\,\mathrm m$。$D = (0.25 + 0.04 - 0.16 - 0.09)/0.24 = 0.1667$，$\theta_2 = \pm80.41^\circ$。方向$\operatorname{atan2}(0.2, 0.5) = 21.80^\circ$。对$\theta_2 = +80.41^\circ$：$\gamma = \operatorname{atan2}(0.3\sin80.41^\circ, 0.4 + 0.3\cos80.41^\circ) = \operatorname{atan2}(0.2958, 0.4500) = 33.32^\circ$，$\theta_1 = -11.52^\circ$，$\theta_3 = 90^\circ + 11.52^\circ - 80.41^\circ = 21.11^\circ$。对$\theta_2 = -80.41^\circ$：$\theta_1 = 55.12^\circ$，$\theta_3 = 90^\circ - 55.12^\circ + 80.41^\circ = 115.29^\circ$。用正运动学验算第一个解：$x = 0.4\cos(-11.52^\circ) + 0.3\cos68.89^\circ + 0.1\cos90^\circ = 0.3919 + 0.1081 + 0 = 0.500$ ✓。
:::
:::

::: exercise 手算一步牛顿迭代 {#exr-newton level=2 check="1/6"}
自己完成[[#ex-newton]]的第一步牛顿-拉弗森迭代：从$\boldsymbol\theta_0 = (0, \pi/2)$出发，目标$(0.7, 0.6)\,\mathrm m$，$L_1 = 0.6$，$L_2 = 0.5\,\mathrm m$。（以 rad 为单位精确输入这一步之后的$\theta_1$——可以输入分数。）
::: solution
$\mathbf f(\boldsymbol\theta_0) = (0.6, 0.5)$，$\mathbf e_0 = (0.1, 0.1)$；在$\boldsymbol\theta_0$处，$s_1 = 0$，$c_1 = 1$，$s_{12} = 1$，$c_{12} = 0$，所以$J_0 = \begin{bmatrix} -0.5 & -0.5\\ 0.6 & 0\end{bmatrix}$。求解$J_0\Delta\boldsymbol\theta = \mathbf e_0$：$\Delta\theta_1 = 0.1/0.6 = 1/6$，$\Delta\theta_2 = -(0.1 + 0.5/6)/0.5 = -0.3667$。因此$\theta_1 = 0.1667\,\mathrm{rad}$，$\theta_2 = 1.2041\,\mathrm{rad}$，误差从$0.141$降到$0.0138\,\mathrm m$。
:::
:::

::: exercise 由旋转矩阵求腕部关节角 {#exr-wrist level=2 check="100"}
一个 ZYZ 球形腕须产生
$$
R_{36} = \begin{bmatrix} 0.3861 & -0.6899 & 0.6124\\ 0.9143 & 0.1978 & -0.3536\\ 0.1228 & 0.6964 & 0.7071\end{bmatrix}.
$$
求两个解。（以度为单位输入$\theta_5 > 0$的那个解的$\theta_6$。）
::: solution
$\theta_5 = \operatorname{atan2}(\pm\sqrt{0.6124^2 + 0.3536^2}, 0.7071) = \operatorname{atan2}(\pm0.7071, 0.7071) = \pm45^\circ$。取$\theta_5 = 45^\circ$：$\theta_4 = \operatorname{atan2}(-0.3536, 0.6124) = -30^\circ$，$\theta_6 = \operatorname{atan2}(0.6964, -0.1228) = 100^\circ$。取$\theta_5 = -45^\circ$：$\theta_4 = 150^\circ$，$\theta_6 = -80^\circ$。验算：$r_{31} = -\sin\theta_5\cos\theta_6 = -0.7071\cos100^\circ = 0.1228$ ✓。
:::
:::

::: exercise 雅可比转置步是下降方向 {#exr-jt level=3}
令$E(\boldsymbol\theta) = \frac12\lVert\mathbf x_d - \mathbf f(\boldsymbol\theta)\rVert^2$。证明$\nabla E = -J^{\mathsf T}\mathbf e$，从而除非$J^{\mathsf T}\mathbf e = \mathbf 0$，步长$\Delta\boldsymbol\theta = \alpha J^{\mathsf T}\mathbf e$在$\alpha > 0$足够小时使$E$减小。对[[#ex-dls]]中的不可达目标解释条件$J^{\mathsf T}\mathbf e = \mathbf 0$，并证明阻尼最小二乘步也是下降方向。
::: solution
$E = \frac12\mathbf e^{\mathsf T}\mathbf e$，$\partial\mathbf e/\partial\boldsymbol\theta = -J$，故由链式法则$\nabla E = -J^{\mathsf T}\mathbf e$。对$\Delta\boldsymbol\theta = \alpha J^{\mathsf T}\mathbf e$，$E(\boldsymbol\theta + \Delta\boldsymbol\theta) = E(\boldsymbol\theta) + \nabla E^{\mathsf T}\Delta\boldsymbol\theta + O(\alpha^2) = E - \alpha\lVert J^{\mathsf T}\mathbf e\rVert^2 + O(\alpha^2)$，当$J^{\mathsf T}\mathbf e \ne \mathbf 0$且$\alpha$很小时，它小于$E$。条件$J^{\mathsf T}\mathbf e = \mathbf 0$意味着误差与每一个可实现的末端速度正交：即$E$的驻点。对于不可达目标，在$\boldsymbol\theta = (0,0)$处手臂沿$x$伸直，每个末端速度都沿$y$方向（$J$的两列都是$(0, \cdot)$），而误差$(0.2, 0)$沿$x$方向，所以$J^{\mathsf T}\mathbf e = \mathbf 0$：这是手臂所能做到的最好结果。对于 DLS，当$\mathbf w = J^{\mathsf T}\mathbf e \ne \mathbf 0$时，$\nabla E^{\mathsf T}\Delta\boldsymbol\theta = -\mathbf e^{\mathsf T}J(J^{\mathsf T}J + \lambda^2I)^{-1}J^{\mathsf T}\mathbf e = -\mathbf w^{\mathsf T}(J^{\mathsf T}J + \lambda^2I)^{-1}\mathbf w < 0$，因为$(J^{\mathsf T}J + \lambda^2I)^{-1}$正定。（下降方向只保证步长足够短时有所进展；$\lambda = 0.1\,\mathrm m$时出现的振荡表明，完整的 DLS 步仍可能太长。）
:::
:::

::: exercise 在逆运动学解中进行选择 {#exr-choose level=3}
一台带球形腕的肘型机械臂须沿一条直焊缝运动。在焊缝起点，你的封闭形式求解器返回了八个解。(a) 列出选择其中一个解的准则。(b) 在焊缝中途，腕部经过$\theta_5 = 0$附近。说明如果求解器总是选择最接近前一关节矢量的解，$\theta_4$和$\theta_6$会发生什么，并提出补救办法。(c) 既然球形腕会在工作空间内部产生这种奇异位形，为什么大多数工业机械臂仍采用球形腕？
::: solution
(a) 关节限位（舍弃超出限位的解）；与基座、夹具和机器人自身的碰撞；在整条焊缝上与奇异位形的距离（优先选择$\theta_5$和肘关节角始终远离$0$的解）；连续性（整条焊缝使用同一解支）；腕部线缆和软管的缠绕；以及次要偏好，例如相对当前位姿关节运动最小或可操作度最好。
(b) 在$\theta_5 = 0$附近，只有$\theta_4 + \theta_6$是良好确定的（[[#ex-wrist]]）。工具姿态绕奇异方向的微小变化，需要$\theta_4$和$\theta_6$做大幅、快速、方向相反的转动（在短时间内可达$180^\circ$）——即"腕部翻转"。最近解跟踪会照此执行，要求超过电机限值的关节速度。补救办法：重新规划路径，使$\lvert\theta_5\rvert$保持在几度以上（使焊枪稍微倾斜——焊接通常能容许几度的工作角偏差），在奇异位形附近减速，采用阻尼最小二乘法以接受小的姿态误差而不是无界的速度，或者在冗余机械臂上利用多余关节避开奇异位形。
(c) 解耦使逆运动学成为封闭形式的、快速且完备的（全部八个解，这对选择解支和检查限位很重要）；腕部紧凑，三台腕部电机可以安装在前臂上，减小运动质量；而且腕部奇异位形易于描述（$\theta_5 = 0$），因而在规划中易于避开。没有球形腕的机械臂（某些腕部偏置的协作机械臂）放弃这些好处，换取其他优点，例如工作空间内部的奇异位形更少，并且需要数值的或更复杂的解析逆运动学。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 的教材在本章所用的 D-H 约定下求解带球形腕的肘型机械臂和斯坦福臂的逆运动学；Siciliano 等人的教材深入论述数值逆运动学、阻尼最小二乘和冗余；Lynch 与 Park 的教材在指数坐标框架下给出牛顿-拉弗森法。
