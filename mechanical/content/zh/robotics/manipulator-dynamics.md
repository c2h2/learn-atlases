运动学描述机器人能怎样运动；动力学则说明为此要付出什么代价。要让一条负载的手臂沿轨迹摆动，电机必须提供力矩，使连杆加速、克服重力，并克服一根运动连杆施加于另一根连杆的耦合力——肩关节旋转时作用在肘部的离心拉力，前臂加速时作用在肩关节上的反作用。串联机械臂的**运动方程**把关节力矩$\boldsymbol\tau$与关节位置、速度和加速度联系起来，并且对每一台刚性串联机械臂都具有相同的结构，
$$
M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau ,
$$
其中质量矩阵$M$依赖于位形，$C\dot{\mathbf q}$为科里奥利项和离心项，$\mathbf g$为重力矩。本章用拉格朗日方程推导这一结构，利用[[robotics/jacobians]]中的雅可比矩阵表示每根连杆的动能；证明使该模型可用于控制的各项性质（$M$正定、$\dot M - 2C$反对称、关于惯性参数线性）；完整地求解平面二连杆机械臂和一个带减速器的单关节；然后建立递推牛顿-欧拉算法，它逐根连杆地计算同样的力矩，计算时间与连杆数成正比。从这里开始，按照动力学和控制中的惯例，关节变量记为$\mathbf q$（转动关节为角度，移动关节为长度）。刚体动力学、转动惯量和平行移轴公式取自[[dynamics/rigid-body-kinetics]]和[[dynamics/three-dimensional-dynamics]]；拉格朗日方程在[[dynamics/rigid-body-energy-momentum]]中介绍。

## 串联机械臂的动能和势能 {#sec-energy}

设连杆$i$的质量为$m_i$，质心为$\mathbf p_{ci}(\mathbf q)$，关于其质心的惯性张量为$\mathcal I_i$，在固连于连杆的坐标系中表示。其姿态为$R_i(\mathbf q)$，因此它在基坐标系中的惯性张量为$R_i\mathcal I_iR_i^{\mathsf T}$。质心速度和连杆角速度关于$\dot{\mathbf q}$是线性的，论证与得到末端执行器雅可比矩阵的完全相同，只是止于连杆$i$：
$$
\dot{\mathbf p}_{ci} = J_{v,i}(\mathbf q)\,\dot{\mathbf q},\qquad \boldsymbol\omega_i = J_{\omega,i}(\mathbf q)\,\dot{\mathbf q},
$$ {#eq-link-jacobians}
其中$J_{v,i}$和$J_{\omega,i}$是$3\times n$矩阵，其第$i+1,\dots,n$列为零（连杆$i$以外的关节不会使它运动），而第$j\le i$列对转动关节为$(\mathbf z_{j-1}\times(\mathbf p_{ci} - \mathbf o_{j-1}),\ \mathbf z_{j-1})$，对移动关节为$(\mathbf z_{j-1}, \mathbf 0)$。

::: proposition 质量矩阵 {#prop-mass-matrix}
机械臂的总动能是关节速度的二次型，
$$
K = \tfrac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q},\qquad
M(\mathbf q) = \sum_{i=1}^n\Big(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i}\Big),
$$ {#eq-mass-matrix}
并且对每个$\mathbf q$，$M(\mathbf q)$都是对称正定的。
:::

::: proof
刚体的动能等于其质心的平动动能与绕质心的转动动能之和，$K_i = \frac12m_i\lVert\dot{\mathbf p}_{ci}\rVert^2 + \frac12\boldsymbol\omega_i^{\mathsf T}(R_i\mathcal I_iR_i^{\mathsf T})\boldsymbol\omega_i$（柯尼希定理，[[dynamics/three-dimensional-dynamics]]）。代入[[#eq-link-jacobians]]得$K_i = \frac12\dot{\mathbf q}^{\mathsf T}\big(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i}\big)\dot{\mathbf q}$，对各连杆求和即得[[#eq-mass-matrix]]。由于$\mathcal I_i$对称，每一项都对称。关于正定性：由于质量和惯性张量是正（半）定的，$\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} = 2K \ge 0$。若$2K = 0$，则每根连杆的质心速度和角速度都为零；特别地，连杆 1 静止，这（由于连杆 1 通过关节 1 与基座相连，且关于关节 1 具有非零的质量或转动惯量）迫使$\dot q_1 = 0$；于是连杆 2 相对于连杆 1 静止，迫使$\dot q_2 = 0$；依此类推。所以当$\dot{\mathbf q} \ne \mathbf 0$时$\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} > 0$。每根连杆都具有由其自身关节带动的质量或转动惯量这一假设，排除了无质量连杆，对于无质量连杆$M$可能是奇异的。
:::

在均匀重力场$\mathbf g_0$（例如$(0, 0, -9.81)\,\mathrm{m/s^2}$）中，势能为$P(\mathbf q) = -\sum_i m_i\mathbf g_0^{\mathsf T}\mathbf p_{ci}(\mathbf q)$，即各连杆按其质心高度计算的$m_igh_i$之和。

## 欧拉-拉格朗日方程 {#sec-lagrange}

::: theorem 串联机械臂的运动方程 {#thm-eom}
取拉格朗日函数$\mathcal L = K - P$，$K = \frac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q}$，广义力为$\boldsymbol\tau$（关节力矩和力，是唯一的非保守力），则拉格朗日方程$\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q_k} - \frac{\partial\mathcal L}{\partial q_k} = \tau_k$取如下形式
$$
\sum_j m_{kj}(\mathbf q)\ddot q_j + \sum_{i,j}c_{ijk}(\mathbf q)\dot q_i\dot q_j + g_k(\mathbf q) = \tau_k ,\qquad k = 1,\dots,n,
$$
其中**克里斯托弗尔符号**和重力矩为
$$
c_{ijk} = \frac12\left(\frac{\partial m_{kj}}{\partial q_i} + \frac{\partial m_{ki}}{\partial q_j} - \frac{\partial m_{ij}}{\partial q_k}\right),\qquad g_k = \frac{\partial P}{\partial q_k}.
$$
写成矩阵形式为$M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau$，其中$C$的元素为$C_{kj} = \sum_ic_{ijk}\dot q_i$。
:::

::: proof
$\partial\mathcal L/\partial\dot q_k = \sum_jm_{kj}\dot q_j$（利用$M$的对称性），所以
$$
\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q_k} = \sum_jm_{kj}\ddot q_j + \sum_{i,j}\frac{\partial m_{kj}}{\partial q_i}\dot q_i\dot q_j .
$$
又$\partial\mathcal L/\partial q_k = \frac12\sum_{i,j}\frac{\partial m_{ij}}{\partial q_k}\dot q_i\dot q_j - \partial P/\partial q_k$。两式相减，速度项为$\sum_{i,j}\big(\frac{\partial m_{kj}}{\partial q_i} - \frac12\frac{\partial m_{ij}}{\partial q_k}\big)\dot q_i\dot q_j$。由于$\dot q_i\dot q_j$关于$i, j$对称，可以用对称化形式$\frac12\big(\frac{\partial m_{kj}}{\partial q_i} + \frac{\partial m_{ki}}{\partial q_j}\big)$代替$\frac{\partial m_{kj}}{\partial q_i}$而不改变和。这就得到克里斯托弗尔形式。所需的假设就是拉格朗日力学的假设：连杆刚性，关节约束理想（不做功），坐标$\mathbf q$为完整坐标，所有非保守作用（电机力矩、摩擦）都归入$\boldsymbol\tau$。
:::

$i = j$的项（$\dot q_i^2$）是**离心**项；$i\ne j$的项（$\dot q_i\dot q_j$）是**科里奥利**项。矩阵$C$不是唯一的——许多矩阵给出同一个矢量$C\dot{\mathbf q}$——但克里斯托弗尔选择具有一个特殊性质。

::: proposition 结构性质 {#prop-properties}
对于克里斯托弗尔矩阵$C$：
1. **反对称性**：$N(\mathbf q,\dot{\mathbf q}) = \dot M(\mathbf q) - 2C(\mathbf q,\dot{\mathbf q})$是反对称的，因此对所有$\mathbf x$有$\mathbf x^{\mathsf T}N\mathbf x = 0$。
2. **功率平衡**：沿任何运动，$\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$。
3. **关于参数线性**：存在由已知函数构成的矩阵$Y(\mathbf q,\dot{\mathbf q},\ddot{\mathbf q})$和由惯性参数（质量、一阶矩$m_i\mathbf r_{ci}$、惯性张量元素）构成的常矢量$\boldsymbol\pi$，使得$M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = Y(\mathbf q,\dot{\mathbf q},\ddot{\mathbf q})\,\boldsymbol\pi$。
:::

::: proof
(1) $\dot m_{kj} = \sum_i\frac{\partial m_{kj}}{\partial q_i}\dot q_i$，且$C_{kj} = \sum_ic_{ijk}\dot q_i$，所以
$$
N_{kj} = \sum_i\Big(\frac{\partial m_{kj}}{\partial q_i} - \frac{\partial m_{kj}}{\partial q_i} - \frac{\partial m_{ki}}{\partial q_j} + \frac{\partial m_{ij}}{\partial q_k}\Big)\dot q_i = \sum_i\Big(\frac{\partial m_{ij}}{\partial q_k} - \frac{\partial m_{ki}}{\partial q_j}\Big)\dot q_i .
$$
交换$k$与$j$并利用$M$的对称性（$m_{ij} = m_{ji}$），得$N_{jk} = \sum_i\big(\frac{\partial m_{ik}}{\partial q_j} - \frac{\partial m_{ji}}{\partial q_k}\big)\dot q_i = -N_{kj}$。
(2) $\frac{d}{dt}K = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \frac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q}$，$\frac{d}{dt}P = \dot{\mathbf q}^{\mathsf T}\mathbf g$。代入$M\ddot{\mathbf q} = \boldsymbol\tau - C\dot{\mathbf q} - \mathbf g$：由 (1)，$\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau + \frac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q} = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$。其物理内容——电机功率等于机械能的变化率——对任何有效的$C$都成立，但只有反对称的选择才使这一恒等式逐项成立，而这正是控制证明所用到的（[[robotics/robot-control]]）。
(3) 把连杆$i$的质心写成$\mathbf p_{ci} = \mathbf o_i + R_i\mathbf r_{ci}$，其中$\mathbf r_{ci}$在连杆坐标系中为常量。连杆$i$的动能可以用关于坐标系原点的惯性张量$\bar{\mathcal I}_i = \mathcal I_i + m_i(\lVert\mathbf r_{ci}\rVert^2I - \mathbf r_{ci}\mathbf r_{ci}^{\mathsf T})$（平行移轴公式）写成$K_i = \frac12m_i\lVert\dot{\mathbf o}_i\rVert^2 + m_i\dot{\mathbf o}_i^{\mathsf T}(\boldsymbol\omega_i\times R_i\mathbf r_{ci}) + \frac12\boldsymbol\omega_i^{\mathsf T}R_i\bar{\mathcal I}_iR_i^{\mathsf T}\boldsymbol\omega_i$，它关于$m_i$、一阶矩$m_i\mathbf r_{ci}$以及$\bar{\mathcal I}_i$的六个元素是线性的，系数是$\mathbf q, \dot{\mathbf q}$的函数。$P_i = -\mathbf g_0^{\mathsf T}(m_i\mathbf o_i + R_im_i\mathbf r_{ci})$关于同样的参数是线性的。拉格朗日方程是对$\mathcal L$的线性运算，所以力矩关于每根连杆的这十个参数是线性的。
:::

关于参数线性，使得可以通过测量运动和力矩、用最小二乘法**辨识**机器人的惯性参数，并在线对其进行自适应调整。反对称性使机器人成为**无源的**：它储存的能量只能来自电机。

## 平面二连杆机械臂 {#sec-2r}

::: example 竖直平面内 2R 机械臂的动力学 {#ex-2r-dynamics}
两根均质刚性连杆在竖直平面内运动，关节角按逆时针方向量取，$q_1$从水平位置量起。连杆$i$的质量为$m_i$，长度为$L_i$，质心位于$\ell_i = L_i/2$处，关于垂直于平面的轴的中心转动惯量为$I_i = m_iL_i^2/12$。推导$M$、$C$和$\mathbf g$。然后，对$m_1 = 2.0\,\mathrm{kg}$、$m_2 = 1.5\,\mathrm{kg}$、$L_1 = 0.6\,\mathrm m$、$L_2 = 0.5\,\mathrm m$，计算在$\mathbf q = (30^\circ, 60^\circ)$、$\dot{\mathbf q} = (1.0, -0.5)\,\mathrm{rad/s}$、$\ddot{\mathbf q} = (2.0, 1.0)\,\mathrm{rad/s^2}$时所需的力矩。
::: solution
**受力图。** 每根连杆在其质心处承受自重$m_ig$；关节 1 承受基座约束力和电机力矩$\tau_1$；关节 2 承受等值反向的内力和电机力矩$\tau_2$（作用于连杆 2，连杆 1 上作用$-\tau_2$）。拉格朗日方法只需要能量。
**运动学。** $\mathbf p_{c1} = \ell_1(c_1, s_1)$，$\mathbf p_{c2} = (L_1c_1 + \ell_2c_{12},\ L_1s_1 + \ell_2s_{12})$，所以
$$
J_{v,1} = \begin{bmatrix} -\ell_1s_1 & 0\\ \ell_1c_1 & 0\end{bmatrix},\qquad
J_{v,2} = \begin{bmatrix} -L_1s_1 - \ell_2s_{12} & -\ell_2s_{12}\\ L_1c_1 + \ell_2c_{12} & \ell_2c_{12}\end{bmatrix},
$$
角速度为$\omega_1 = \dot q_1$，$\omega_2 = \dot q_1 + \dot q_2$，即$J_{\omega,1} = [1\ 0]$，$J_{\omega,2} = [1\ 1]$。
**质量矩阵。** 由[[#eq-mass-matrix]]，利用$J_{v,2}^{\mathsf T}J_{v,2}$的元素$L_1^2 + \ell_2^2 + 2L_1\ell_2c_2$、$\ell_2^2 + L_1\ell_2c_2$、$\ell_2^2$：
$$
M(\mathbf q) = \begin{bmatrix}
m_1\ell_1^2 + I_1 + m_2(L_1^2 + \ell_2^2 + 2L_1\ell_2c_2) + I_2 & m_2(\ell_2^2 + L_1\ell_2c_2) + I_2\\
m_2(\ell_2^2 + L_1\ell_2c_2) + I_2 & m_2\ell_2^2 + I_2
\end{bmatrix}.
$$
**科里奥利项和离心项。** 只有$m_{11}$和$m_{12}$依赖于$\mathbf q$，且只通过$q_2$：$\partial m_{11}/\partial q_2 = 2h$，$\partial m_{12}/\partial q_2 = h$，其中$h = -m_2L_1\ell_2s_2$。非零的克里斯托弗尔符号为$c_{121} = c_{211} = h$、$c_{221} = h$、$c_{112} = -h$，所以
$$
C(\mathbf q,\dot{\mathbf q}) = \begin{bmatrix} h\dot q_2 & h(\dot q_1 + \dot q_2)\\ -h\dot q_1 & 0\end{bmatrix},\qquad
C\dot{\mathbf q} = \begin{bmatrix} h(2\dot q_1\dot q_2 + \dot q_2^2)\\ -h\dot q_1^2\end{bmatrix}.
$$
**重力。** $P = m_1g\ell_1s_1 + m_2g(L_1s_1 + \ell_2s_{12})$，故$g_1 = (m_1\ell_1 + m_2L_1)gc_1 + m_2\ell_2gc_{12}$，$g_2 = m_2\ell_2gc_{12}$。
**数值。** $I_1 = 2.0\times0.36/12 = 0.0600\,\mathrm{kg\,m^2}$，$I_2 = 1.5\times0.25/12 = 0.03125\,\mathrm{kg\,m^2}$，$\ell_1 = 0.30$，$\ell_2 = 0.25\,\mathrm m$；$c_2 = 0.5$，$s_2 = 0.8660$。
$$
M = \begin{bmatrix} 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0.15) + 0.03125 & 1.5(0.0625 + 0.075) + 0.03125\\ \cdot & 1.5(0.0625) + 0.03125\end{bmatrix} = \begin{bmatrix} 1.1300 & 0.2375\\ 0.2375 & 0.1250\end{bmatrix}\mathrm{kg\,m^2}.
$$
$h = -1.5\times0.6\times0.25\times0.8660 = -0.1949\,\mathrm{kg\,m^2}$，故$C\dot{\mathbf q} = \big(-0.1949(2(1.0)(-0.5) + 0.25),\ 0.1949(1.0)^2\big) = (0.1461, 0.1949)\,\mathrm{N\,m}$。重力：$q_1 + q_2 = 90^\circ$，故$c_{12} = 0$，$g_1 = (0.6 + 0.9)(9.81)(0.8660) = 12.744\,\mathrm{N\,m}$，$g_2 = 0$。最后
$$
\boldsymbol\tau = M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \begin{bmatrix} 2.260 + 0.2375 + 0.1461 + 12.744\\ 0.475 + 0.125 + 0.1949 + 0\end{bmatrix} = \begin{bmatrix} 15.39\\ 0.795\end{bmatrix}\mathrm{N\,m}.
$$
合理性检查：重力在$\tau_1$中占主导（一条 3.5 kg 的手臂斜伸在外），而由于连杆 2 竖直，$g_2 = 0$。关节 2 上$0.195\,\mathrm{N\,m}$的离心项是肩关节以$1\,\mathrm{rad/s}$旋转时作用在前臂上的向外拉力；它占关节 2 总力矩的四分之一——即使在中等速度下，动力学耦合也不可忽略。
:::
:::

::: example 验证反对称性 {#ex-skew}
对[[#ex-2r-dynamics]]中的机械臂和状态，验证[[#prop-properties]]的性质 1。
::: solution
$\dot M = \frac{\partial M}{\partial q_2}\dot q_2$，其中$\partial m_{11}/\partial q_2 = 2h$，$\partial m_{12}/\partial q_2 = h$：$\dot M = \dot q_2\begin{bmatrix} 2h & h\\ h & 0\end{bmatrix} = \begin{bmatrix} 0.1949 & 0.0974\\ 0.0974 & 0\end{bmatrix}$（$h = -0.1949$，$\dot q_2 = -0.5$）。又$C = \begin{bmatrix} h\dot q_2 & h(\dot q_1 + \dot q_2)\\ -h\dot q_1 & 0\end{bmatrix} = \begin{bmatrix} 0.0974 & -0.0974\\ 0.1949 & 0\end{bmatrix}$。于是
$$
\dot M - 2C = \begin{bmatrix} 0.1949 - 0.1949 & 0.0974 + 0.1949\\ 0.0974 - 0.3898 & 0\end{bmatrix} = \begin{bmatrix} 0 & 0.2923\\ -0.2923 & 0\end{bmatrix},
$$
是反对称的 ✓。如果我们把同一个矢量$C\dot{\mathbf q}$写成$\begin{bmatrix} 2h\dot q_2 & h\dot q_2\\ -h\dot q_1 & 0\end{bmatrix}\dot{\mathbf q}$（用于计算力矩同样有效），则$\dot M - 2C$的对角元素为$2h\dot q_2 - 4h\dot q_2 \ne 0$：不是反对称的。这一性质属于克里斯托弗尔分解。
:::
:::

位形对惯量的影响有多大？下图给出$M$的各元素随肘关节角的变化。

::: widget plot
f: 0.18 + 0.06 + m2*(0.36 + 0.0625 + 0.3*cos(x)) + m2*0.25/12; m2*(0.0625 + 0.15*cos(x)) + m2*0.25/12; m2*0.0625 + m2*0.25/12
x: -pi, pi
y: -0.2, 2
sliders: m2=1.5:0.5:5:0.1
labels: m_{11}; m_{12}; m_{22}
piticks: true
caption: 例题中机械臂的质量矩阵元素（$\mathrm{kg\,m^2}$）随肘关节角$q_2$的变化，前臂质量$m_2$（包括沿前臂分布的任何负载）可调。肩关节所见的惯量$m_{11}$在手臂伸直时（$q_2 = 0$）最大，在折叠时（$q_2 = \pm\pi$）最小：当$m_2 = 1.5\,\mathrm{kg}$时变化将近 3 倍。增大$m_2$，变化幅度随之增大。因此，为某一位形整定的固定增益关节控制器在另一位形下会过软或过硬——这是[[robotics/robot-control]]中基于模型的控制器的动因之一。
:::

## 执行器、减速器与折算惯量 {#sec-gears}

电动机（[[mechatronics/electric-actuators]]）转速高、转矩小，因此每个关节都有一个传动比为$N$的减速器（电机转角$= Nq$）。电机转矩$\tau_m$产生关节力矩$N\tau_m$（忽略齿轮损耗），而转子自身的转动惯量$J_m$以关节$N$倍的速度旋转，贡献动能$\frac12J_m(N\dot q)^2$：**折算惯量**$N^2J_m$加到$M$中该关节对应的对角元素上。

::: example 带减速器的单连杆机械臂 {#ex-geared}
一根质量$2.0\,\mathrm{kg}$、长$0.50\,\mathrm m$的均质连杆，由一台转子转动惯量$J_m = 2.0\times10^{-5}\,\mathrm{kg\,m^2}$的电机通过传动比$N = 100$的减速器绕其一端驱动。取$q$从竖直向下位置量起，关节处有黏性摩擦$b\dot q$，写出运动方程并比较各项。
::: solution
动能$K = \frac12(I_O + N^2J_m)\dot q^2$，其中$I_O = mL^2/3 = 2.0\times0.25/3 = 0.1667\,\mathrm{kg\,m^2}$，$N^2J_m = 10^4\times2.0\times10^{-5} = 0.200\,\mathrm{kg\,m^2}$。势能$P = -mg\frac L2\cos q$。广义力为$N\tau_m - b\dot q$的拉格朗日方程：
$$
(I_O + N^2J_m)\,\ddot q + b\dot q + mg\tfrac L2\sin q = N\tau_m,\qquad 0.367\,\ddot q + b\dot q + 4.905\sin q = 100\,\tau_m .
$$
电机的折算惯量大于连杆自身的转动惯量。这有两个后果。从动力学上看，当负载或位形改变时，总惯量变化很小（大传动比的关节在电机"看来"几乎是恒定的）——这正是[[robotics/robot-control]]中的独立关节控制器在工业机械臂上效果良好的原因。从能量上看，加速转子比加速连杆更费能量。最大重力矩（连杆水平时为$4.905\,\mathrm{N\,m}$）只需要电机提供$0.049\,\mathrm{N\,m}$。同样，其他连杆的耦合力矩在到达电机之前被除以$N$，而电机的转动惯量则被乘以$N^2$。
:::
:::

## 递推牛顿-欧拉算法 {#sec-rne}

拉格朗日推导能给出深刻的理解和封闭形式的表达式，但对六根连杆的符号能量求导会产生极其庞大的公式。对于计算给定运动所需的力矩——即**逆动力学**问题$\boldsymbol\tau = \mathrm{ID}(\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q})$，基于模型的控制器在每个周期都需要求解它——逐根连杆地应用牛顿-欧拉方程要高效得多。

::: algorithm 递推牛顿-欧拉逆动力学 {#alg-rne}
数据：每根连杆$i$的质量$m_i$、质心位置、惯性张量$\mathcal I_i$以及关节轴线$\mathbf z_{i-1}$。输入：$\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q}$。以$\boldsymbol\omega_0 = \boldsymbol\alpha_0 = \mathbf 0$和$\mathbf a_0 = -\mathbf g_0$初始化基座（基座的一个虚拟向上加速度，一次性计入了作用在每根连杆上的重力）。
1. **前向（向外）递推**，$i = 1,\dots,n$：对转动关节
$$
\boldsymbol\omega_i = \boldsymbol\omega_{i-1} + \dot q_i\mathbf z_{i-1},\qquad
\boldsymbol\alpha_i = \boldsymbol\alpha_{i-1} + \ddot q_i\mathbf z_{i-1} + \dot q_i\,\boldsymbol\omega_{i-1}\times\mathbf z_{i-1},
$$
$$
\mathbf a_{e,i} = \mathbf a_{e,i-1} + \boldsymbol\alpha_i\times\mathbf r_{i-1,i} + \boldsymbol\omega_i\times(\boldsymbol\omega_i\times\mathbf r_{i-1,i}),\qquad
\mathbf a_{c,i} = \mathbf a_{e,i-1} + \boldsymbol\alpha_i\times\mathbf r_{i-1,ci} + \boldsymbol\omega_i\times(\boldsymbol\omega_i\times\mathbf r_{i-1,ci}),
$$
其中$\mathbf a_{e,i}$是坐标系$i$原点（连杆$i$的远端）的加速度，$\mathbf r_{i-1,i} = \mathbf o_i - \mathbf o_{i-1}$，$\mathbf r_{i-1,ci} = \mathbf p_{ci} - \mathbf o_{i-1}$。
2. **后向（向内）递推**，$i = n,\dots,1$，其中$\mathbf f_{n+1}$、$\mathbf n_{n+1}$为工具施加于环境的力旋量（自由运动时为零）：连杆$i-1$施加于连杆$i$的力$\mathbf f_i$和力矩$\mathbf n_i$为
$$
\mathbf f_i = \mathbf f_{i+1} + m_i\mathbf a_{c,i},\qquad
\mathbf n_i = \mathbf n_{i+1} + \mathbf r_{i-1,ci}\times m_i\mathbf a_{c,i} + \mathbf r_{i-1,i}\times\mathbf f_{i+1} + \mathcal I_i^{(0)}\boldsymbol\alpha_i + \boldsymbol\omega_i\times(\mathcal I_i^{(0)}\boldsymbol\omega_i),
$$
其中$\mathcal I_i^{(0)} = R_i\mathcal I_iR_i^{\mathsf T}$，力矩对$\mathbf o_{i-1}$取。
3. **关节力矩**：$\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf n_i$（转动关节）或$\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf f_i$（移动关节）。
:::

每次递推对每根连杆只访问一次，算术运算量固定，因此计算量随$n$**线性**增长——这正是 Luh、Walker 和 Paul 在 1980 年报告的决定性优势。向外的一遍是刚体运动学；向内的一遍是对每根连杆应用牛顿第二定律$\mathbf f_i - \mathbf f_{i+1} + m_i\mathbf g_0 = m_i\mathbf a_{c,i}$（重力隐含在基座加速度中）和欧拉方程$\sum\mathbf M_{c} = \mathcal I\boldsymbol\alpha + \boldsymbol\omega\times\mathcal I\boldsymbol\omega$，经整理求出来自内侧关节的未知力和力矩。关节力矩是该力矩沿关节轴线的分量；其余分量由轴承承受。

::: example 2R 机械臂的牛顿-欧拉计算 {#ex-rne}
用递推牛顿-欧拉算法重新计算[[#ex-2r-dynamics]]的力矩。
::: solution
在平面内计算；矢量为$(x, y)$，角量是绕$\hat{\mathbf k}$的标量，对平面矢量$\mathbf r$记$\mathbf r^\perp = \hat{\mathbf k}\times\mathbf r = (-r_y, r_x)$，于是$\alpha\hat{\mathbf k}\times\mathbf r = \alpha\mathbf r^\perp$，$\omega\hat{\mathbf k}\times(\omega\hat{\mathbf k}\times\mathbf r) = -\omega^2\mathbf r$。沿连杆的单位矢量：$\mathbf e_1 = (\cos30^\circ, \sin30^\circ)$，$\mathbf e_2 = (\cos90^\circ, \sin90^\circ) = (0, 1)$。为使算术过程清晰可见，我们显式地施加重力，而不是通过基座加速度。
**向外。** $\omega_1 = 1.0$，$\alpha_1 = 2.0$；$\omega_2 = 0.5$，$\alpha_2 = 3.0\,\mathrm{rad/s^2}$（平面情形，所以没有$\boldsymbol\omega\times\mathbf z$项）。加速度：
$$
\mathbf a_{c1} = \alpha_1(\ell_1\mathbf e_1)^\perp - \omega_1^2\ell_1\mathbf e_1 = 2.0(-0.15, 0.2598) - (0.2598, 0.15) = (-0.5598, 0.3696)\,\mathrm{m/s^2},
$$
$$
\mathbf a_{e1} = 2.0(-0.3, 0.5196) - (0.5196, 0.3) = (-1.1196, 0.7392),\quad
\mathbf a_{c2} = \mathbf a_{e1} + 3.0(\ell_2\mathbf e_2)^\perp - 0.25\,\ell_2\mathbf e_2 = (-1.8696, 0.6767)\,\mathrm{m/s^2}.
$$
**向内，连杆 2。** 牛顿定律：连杆 1 作用于连杆 2 的力$\mathbf f_2$满足$\mathbf f_2 + m_2\mathbf g_0 = m_2\mathbf a_{c2}$，故$\mathbf f_2 = 1.5\big((-1.8696, 0.6767) + (0, 9.81)\big) = (-2.804, 15.730)\,\mathrm N$。对连杆 2 的质心应用欧拉方程，$\mathbf f_2$作用在相对于质心$-\ell_2\mathbf e_2 = (0, -0.25)$处：$\tau_2 + (\mathbf f_2\text{ 的力矩}) = I_2\alpha_2$，其中力矩$= r_xf_y - r_yf_x = 0 - (-0.25)(-2.804) = -0.701$，故$\tau_2 = 0.03125\times3.0 + 0.701 = 0.795\,\mathrm{N\,m}$。
**向内，连杆 1。** $\mathbf f_1 = m_1(\mathbf a_{c1} - \mathbf g_0) + \mathbf f_2 = 2.0(-0.5598, 10.1796) + (-2.804, 15.730) = (-3.924, 36.089)\,\mathrm N$。对连杆 1 的质心：$\mathbf f_1$作用于$-\ell_1\mathbf e_1 = (-0.2598, -0.15)$处，力矩为$(-0.2598)(36.089) - (-0.15)(-3.924) = -9.965\,\mathrm{N\,m}$；$-\mathbf f_2$作用于$+\ell_1\mathbf e_1 = (0.2598, 0.15)$处，力矩为$(0.2598)(-15.730) - (0.15)(2.804) = -4.507\,\mathrm{N\,m}$；关节 2 的电机对连杆 1 的反作用为$-\tau_2$。所以$\tau_1 - \tau_2 - 9.965 - 4.507 = I_1\alpha_1 = 0.120$，即$\tau_1 = 0.120 + 0.795 + 9.965 + 4.507 = 15.39\,\mathrm{N\,m}$。
两个力矩都与拉格朗日结果$(15.39, 0.795)\,\mathrm{N\,m}$一致 ✓。副产品——关节约束力$\mathbf f_1$、$\mathbf f_2$——正是设计者确定轴承尺寸所需要的；拉格朗日方法不提供它们。
:::
:::

::: warning 不要重复计入重力，并始终明确力矩的取矩点
在递推算法中，重力**要么**作为虚拟的基座加速度$\mathbf a_0 = -\mathbf g_0$进入，**要么**作为每根连杆上显式的重量进入——绝不能两者兼用。同样，力矩平衡对每根连杆必须取同一个一致的点（质心或关节），每个力的力臂都从该点量起；把两者混用是牛顿-欧拉力矩出错的最常见原因。对任何动力学程序的快速检验：在静止时（$\dot{\mathbf q} = \ddot{\mathbf q} = \mathbf 0$），它必须恰好返回静态重力矩；在$\boldsymbol\tau = \mathbf 0$的无摩擦仿真中，总能量$K + P$必须保持恒定。
:::

## 正动力学与仿真 {#sec-simulation}

**正动力学**是相反的问题：已知力矩，求运动。从运动方程中解出加速度，
$$
\ddot{\mathbf q} = M(\mathbf q)^{-1}\big(\boldsymbol\tau - C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} - \mathbf g(\mathbf q)\big),
$$ {#eq-forward-dynamics}
由于$M$正定，这总是可以做到的，由此得到状态$(\mathbf q, \dot{\mathbf q})$的一阶方程组，用数值积分器沿时间推进（[线性与非线性常微分方程组](/learn/maths/lesson.php?c=ode&l=nonlinear-systems)）。仿真器需要$M$（它本身可以通过调用逆动力学程序$n$次来计算，每次一列，取零速度、零重力和单位加速度）以及偏置项$C\dot{\mathbf q} + \mathbf g$（取零加速度调用一次）。存在更快的$O(n)$正动力学算法（Featherstone 的铰接体算法），但对于六关节或七关节的机械臂，$M^{-1}$的方法很常用。

::: widget phaseplane
f: y
g: -k*sin(x) - c*y
x: -7, 7
y: -6, 6
sliders: k=13.4:1:30:0.1; c=0.5:0:5:0.1
caption: 例题中无驱动的带减速器连杆的相图，$\ddot q = -k\sin q - c\dot q$，其中$x = q$（rad，从竖直向下位置量起），$y = \dot q$（rad/s）。只有连杆时，$k = mg(L/2)/I_O = 29.4\,\mathrm{s^{-2}}$；加上电机的折算惯量后，$k = 4.905/0.367 = 13.4\,\mathrm{s^{-2}}$，因此摆动较慢。令$c = 0$，可以看到保守运动（$K + P$恒定）的闭轨线环绕$q = 0, \pm2\pi$处的稳定平衡点，并被$q = \pm\pi$处（连杆竖直向上）的鞍点分隔；增大$c$，每条轨线都随着摩擦耗散能量而盘旋进入下垂位置，这与功率平衡$\frac{d}{dt}(K + P) = -cI\dot q^2$（$I$为总转动惯量）的预言完全一致。
:::

::: quiz
一个机器人控制器每毫秒针对期望加速度$\ddot{\mathbf q}_d$计算一次$\boldsymbol\tau = M(\mathbf q)\ddot{\mathbf q}_d + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q)$。哪种算法最合适？
- [ ] 用铰接体算法求正动力学
- [x] 取$\ddot{\mathbf q} = \ddot{\mathbf q}_d$的递推牛顿-欧拉逆动力学
- [ ] 每一步对拉格朗日函数作符号求导
- [ ] 对[[#eq-forward-dynamics]]进行数值积分
::: solution
所需的量恰好是逆动力学$\mathrm{ID}(\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q}_d)$，递推牛顿-欧拉算法用$O(n)$次运算算出它，无须构造$M$或$C$。正动力学回答的是相反的问题（由力矩求运动），而运行时的符号求导则太慢了。
:::
:::

::: history
相连刚体的运动方程可由拉格朗日的《分析力学》（*Mécanique analytique*，1788）和欧拉的刚体方程得出，但把它们实时地应用于机械臂曾是一个计算难题。1980 年，J. Y. S. Luh、M. W. Walker 和 R. P. C. Paul 发表了《机械臂的在线计算方案》（"On-line computational scheme for mechanical manipulators"），这是一种计算量随连杆数线性增长的递推牛顿-欧拉表述；他们报告在一台 PDP-11/45 小型计算机上约 4.5 ms 即可算出斯坦福臂的关节力矩，足以用于在线控制。费瑟斯通（Roy Featherstone）的空间矢量表述及其用于正动力学的铰接体算法，汇集在《刚体动力学算法》（*Rigid Body Dynamics Algorithms*，2008）中，是大多数现代机器人仿真器的基础。
:::

::: summary
- 动能$K = \frac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q}$，其中$M = \sum_i(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i})$，对称正定。
- 拉格朗日方程给出$M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \boldsymbol\tau$，克里斯托弗尔符号为$c_{ijk} = \frac12(\partial_im_{kj} + \partial_jm_{ki} - \partial_km_{ij})$，$\mathbf g = \nabla P$。
- $\dot M - 2C$反对称；$\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$；动力学关于惯性参数线性，$Y\boldsymbol\pi$。
- 对 2R 机械臂，肩关节惯量随$\cos q_2$变化，即使在中等速度下耦合力矩也很显著。
- 减速增加折算惯量$N^2J_m$，并把负载力矩除以$N$；大传动比关节在其电机看来几乎是解耦的。
- 递推牛顿-欧拉算法以$O(n)$计算逆动力学：向外递推速度和加速度，向内递推力和力矩，$\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf n_i$。
- 对正动力学$\ddot{\mathbf q} = M^{-1}(\boldsymbol\tau - C\dot{\mathbf q} - \mathbf g)$积分即可仿真机械臂；用静态重力矩和能量守恒检验程序。
:::

## 习题

::: exercise 折算惯量 {#exr-reflected level=1 check="0.075"}
一台关节电机的转子转动惯量为$3.0\times10^{-5}\,\mathrm{kg\,m^2}$，通过$50{:}1$的减速器驱动关节。它在关节处增加多少惯量？（以$\mathrm{kg\,m^2}$为单位输入。）
::: solution
$N^2J_m = 2500\times3.0\times10^{-5} = 0.075\,\mathrm{kg\,m^2}$——与一根$1\,\mathrm{kg}$、$0.5\,\mathrm m$的连杆绕其端部的转动惯量（$0.083\,\mathrm{kg\,m^2}$）相当。
:::
:::

::: exercise 静态重力矩 {#exr-gravity level=1 check="10.19"}
一根质量$3.0\,\mathrm{kg}$、质心距关节$0.40\,\mathrm m$的单连杆被保持静止在水平线以上$30^\circ$处。需要多大的关节力矩？（以 N·m 为单位输入，保留两位小数；$g = 9.81\,\mathrm{m/s^2}$。）
::: solution
$\tau = mg\ell\cos30^\circ = 3.0\times9.81\times0.40\times0.8660 = 10.19\,\mathrm{N\,m}$：重量乘以它到关节的水平距离，即运动方程的静态特例$\boldsymbol\tau = \mathbf g(\mathbf q)$。
:::
:::

::: exercise 2R 机械臂的动能 {#exr-kinetic level=1 check="1.4298"}
对[[#ex-2r-dynamics]]中的机械臂，计算$q_2 = 45^\circ$（$q_1$任意）、$\dot{\mathbf q} = (1.0, 2.0)\,\mathrm{rad/s}$时的动能。（以 J 为单位输入$K$，保留四位小数。）
::: solution
在$c_2 = \cos45^\circ = 0.70711$处：
$$
\begin{aligned}
m_{11} &= 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0.3\times0.70711) + 0.03125 = 0.24 + 0.95195 + 0.03125 = 1.22320,\\
m_{12} &= 1.5(0.0625 + 0.15\times0.70711) + 0.03125 = 0.25285 + 0.03125 = 0.28410,\qquad m_{22} = 0.125
\end{aligned}
$$
（单位均为$\mathrm{kg\,m^2}$）。于是$K = \frac12(m_{11}\dot q_1^2 + 2m_{12}\dot q_1\dot q_2 + m_{22}\dot q_2^2) = \frac12(1.22320 + 1.13640 + 0.50000) = 1.4298\,\mathrm J$。交叉项$2m_{12}\dot q_1\dot q_2$几乎与肩关节项一样大：能量不是各关节独立能量之和。
:::
:::

::: exercise 离心力矩 {#exr-centrifugal level=2 check="0.9"}
对[[#ex-2r-dynamics]]中的机械臂，在$q_2 = 90^\circ$时肩关节以$\dot q_1 = 2\,\mathrm{rad/s}$旋转，$\dot q_2 = 0$，且无加速度。关节 2 必须提供多大的力矩来抵抗离心效应（忽略重力）？解释其符号。（以 N·m 为单位输入$\tau_2$。）
::: solution
$(C\dot{\mathbf q})_2 = -h\dot q_1^2 = m_2L_1\ell_2s_2\dot q_1^2 = 1.5\times0.6\times0.25\times1\times4 = 0.90\,\mathrm{N\,m}$。为正：前臂成直角时，作用在其质心上的离心力从肩关节沿径向向外，趋于使前臂顺时针摆动（使肘部向伸直位置张开，$q_2$减小）；电机必须逆时针推动才能保持$q_2$不变。
:::
:::

::: exercise 肘部成直角时的质量矩阵 {#exr-m11 level=2 check="0.905"}
计算[[#ex-2r-dynamics]]中机械臂在$q_2 = 90^\circ$时的$m_{11}$，并求它在所有$q_2$上的最大值与最小值之比。（以$\mathrm{kg\,m^2}$为单位输入$m_{11}(90^\circ)$。）
::: solution
$m_{11} = 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0) + 0.03125 = 0.905\,\mathrm{kg\,m^2}$。其极值出现在$c_2 = \pm1$处：$0.905 \pm 1.5\times0.3 = 1.355$和$0.455\,\mathrm{kg\,m^2}$，比值为$2.98$。
:::
:::

::: exercise 辨识参数 {#exr-identify level=2 check="0.2"}
一个单关节服从$\tau = a\ddot q + b\cos q$，其中$a$（惯量）和$b$（重力矩$mg\ell$）未知。进行了两次测量：在$q = 0$处静止时力矩为$4.2\,\mathrm{N\,m}$；在$q = 90^\circ$、$\ddot q = 5.0\,\mathrm{rad/s^2}$时力矩为$1.0\,\mathrm{N\,m}$。写出回归形式$\tau = Y\boldsymbol\pi$并求参数。（以$\mathrm{kg\,m^2}$为单位输入$a$。）
::: solution
$Y = [\ddot q\ \ \cos q]$，$\boldsymbol\pi = (a, b)$。第一次测量：$4.2 = 0\cdot a + 1\cdot b$，故$b = 4.2\,\mathrm{N\,m}$。第二次：$1.0 = 5.0a + 0\cdot b$，故$a = 0.20\,\mathrm{kg\,m^2}$。实际中，沿一条"激励"轨迹进行的大量含噪声测量被叠加成$\boldsymbol\tau_{\text{all}} = Y_{\text{all}}\boldsymbol\pi$，用最小二乘法求解；轨迹必须使$Y_{\text{all}}$条件良好（在这里，加速度和重力项都必须变化）。
:::
:::

::: exercise 能量与无源性 {#exr-passivity level=3}
(a) 利用[[#prop-properties]]证明：若$\boldsymbol\tau = -D\dot{\mathbf q}$，$D$对称正定（纯关节阻尼），则总能量$K + P$永不增加。(b) 证明对任何力矩历程都有$\int_0^T\dot{\mathbf q}^{\mathsf T}\boldsymbol\tau\,dt \ge -\big(K(0) + P(0) - P_{\min}\big)$：机械臂输出的能量不能超过它最初储存的能量。(c) (a) 只用到矢量$C\dot{\mathbf q}$，所以对任何给出正确科里奥利力矩和离心力矩的矩阵$C$都成立。那么，为什么控制器的稳定性证明坚持要用克里斯托弗尔$C$？
::: solution
(a) $\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau = -\dot{\mathbf q}^{\mathsf T}D\dot{\mathbf q} \le 0$，仅在静止时取等号。(b) 对功率平衡积分，$\int_0^T\dot{\mathbf q}^{\mathsf T}\boldsymbol\tau\,dt = (K + P)(T) - (K + P)(0) \ge 0 + P_{\min} - K(0) - P(0)$，因为$K \ge 0$且$P \ge P_{\min}$（在紧的位形空间上势能有下界）。这正是从力矩到速度的无源性的定义。(c) 在跟踪控制的证明中（[[robotics/robot-control]]），必须为零的项是$\mathbf x^{\mathsf T}(\dot M - 2C)\mathbf x$，其中矢量$\mathbf x$**不是**$\dot{\mathbf q}$——通常是速度误差$\dot{\mathbf e}$——因为控制器用到的是$C(\mathbf q,\dot{\mathbf q})$乘以一个参考速度。这要求$\dot M - 2C$作为矩阵是反对称的，而这对克里斯托弗尔分解成立，对给出同一$C\dot{\mathbf q}$的其他分解不成立（[[#ex-skew]]）。
:::
:::

::: exercise 选择传动比 {#exr-gear level=3 check="100"}
一台转子转动惯量为$J_m$、最大转矩为$\tau_{\max}$的电机，通过传动比$N$驱动一个纯惯性负载$I_L$（无重力、无摩擦）。(a) 证明负载加速度为$\ddot q = N\tau_{\max}/(I_L + N^2J_m)$，并求使之最大的传动比$N^*$。(b) 对$I_L = 0.50\,\mathrm{kg\,m^2}$、$J_m = 5.0\times10^{-5}\,\mathrm{kg\,m^2}$计算$N^*$。(c) 讨论为什么实际的机器人关节常采用不同于$N^*$的传动比。（输入$N^*$。）
::: solution
(a) 能量：$K = \frac12(I_L + N^2J_m)\dot q^2$，电机对$q$的广义力为$N\tau_{\max}$，故$(I_L + N^2J_m)\ddot q = N\tau_{\max}$。使$f(N) = N/(I_L + N^2J_m)$最大：$f'(N) = (I_L + N^2J_m - 2N^2J_m)/(\cdot)^2 = 0$给出$N^{*2}J_m = I_L$，$N^* = \sqrt{I_L/J_m}$——**惯量匹配**：折算的电机惯量等于负载惯量。(b) $N^* = \sqrt{0.50/5.0\times10^{-5}} = \sqrt{10^4} = 100$。此时$\ddot q_{\max} = 100\tau_{\max}/(0.5 + 0.5) = 100\tau_{\max}\,\mathrm{rad/s^2}$（每 N·m）。(c) 重力载荷即使在静止时也需要力矩，这倾向于较大的$N$；电机的最高转速把关节速度限制在$\omega_{m,\max}/N$，这倾向于较小的$N$；负载惯量随位形和负载变化，所以没有哪个单一的$N$能与之匹配；较大的$N$减小负载变化和扰动对电机的影响（[[#ex-geared]]），但增大摩擦、齿隙和传动装置的刚度问题，并降低反向可驱动性，而这对与人安全接触很重要。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 的教材以本章的记法推导欧拉-拉格朗日方程及其性质，并讨论带减速器的独立关节模型；Craig 的教材在改进 D-H 约定下清楚地讲述了迭代牛顿-欧拉方程；Featherstone 的著作发展了空间矢量、递推牛顿-欧拉算法和铰接体算法；Siciliano 等人的教材讲述动力学参数辨识。
