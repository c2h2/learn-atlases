正运动学告诉我们工具在哪里；要使它平稳地运动，还需要知道关节运动时它运动得多快。将$T(\boldsymbol\theta(t))$对时间求导，就得到关节速度$\dot{\boldsymbol\theta}$与末端执行器的线速度和角速度之间的线性关系，这一关系的矩阵就是**机械臂雅可比矩阵**（manipulator Jacobian）$J(\boldsymbol\theta)$。除正运动学本身之外，它是机器人学中用得最多的对象。它把期望的工具速度转换为关节速度（分解速度控制），它驱动[[robotics/inverse-kinematics]]中的数值逆运动学，并且——通过虚功原理——它的转置把作用在工具上的力转换为与之平衡的关节力矩。在$J$降秩之处，机器人处于**奇异位形**（singularity）：它无法使工具沿某个方向运动，要趋近该方向就需要无界的关节速度，而在该方向上它又可以不用任何关节力矩就承受力。本章逐列推导几何雅可比矩阵，确定奇异位形的位置，用吉川恒夫（Yoshikawa）的可操作度和速度椭球来度量一个位形离奇异位形有多远，证明力–力矩对偶性，最后讨论冗余机械臂与伪逆。转动矩阵和旋量工具来自[[robotics/rigid-motions]]；奇异值分解见 Maths Atlas（[奇异值分解](/learn/maths/lesson.php?c=linear-algebra&l=svd)）。

## 几何雅可比矩阵 {#sec-geometric}

回顾[[robotics/rigid-motions]]：姿态为$R(t)$的坐标系的角速度$\boldsymbol\omega$由$\dot RR^{\mathsf T} = [\boldsymbol\omega]$定义，并且链中各物体的角速度是**相加**的：若坐标系$i$相对于坐标系$i-1$以角速度$\boldsymbol\omega_{i-1,i}$转动，则$\boldsymbol\omega_{0,i} = \boldsymbol\omega_{0,i-1} + \boldsymbol\omega_{i-1,i}$（均在同一坐标系中表示）。点的线速度服从刚体法则$\mathbf v_P = \mathbf v_Q + \boldsymbol\omega\times(\mathbf p_P - \mathbf p_Q)$（[[dynamics/three-dimensional-dynamics]]）。

::: definition 几何雅可比矩阵 {#def-jacobian}
对于一个有$n$个关节、工具原点为$\mathbf o_n(\boldsymbol\theta)$、工具姿态为$R_{0n}(\boldsymbol\theta)$的机械臂，**几何雅可比矩阵**（geometric Jacobian）$J(\boldsymbol\theta)\in\mathbb R^{6\times n}$是满足下式的矩阵：
$$
\begin{bmatrix} \mathbf v\\ \boldsymbol\omega\end{bmatrix} = J(\boldsymbol\theta)\,\dot{\boldsymbol\theta} = \begin{bmatrix} J_v\\ J_\omega\end{bmatrix}\dot{\boldsymbol\theta},
$$ {#eq-jacobian}
式中$\mathbf v = \dot{\mathbf o}_n$为工具原点的线速度，$\boldsymbol\omega$为工具坐标系的角速度，二者均在基坐标系$\{0\}$中表示。$J$的第$i$列是关节$i$以单位速度运动而其余关节都静止时工具的速度。
:::

我们像 Spong 等人和 Siciliano 等人那样把线速度排在前面；Lynch 与 Park 则按$(\boldsymbol\omega, \mathbf v)$排列，并在另一个点上表示线速度部分（空间雅可比矩阵使用位于基坐标原点处的物体点的速度）。内容是相同的；下面的公式采用[[#eq-jacobian]]的约定。

::: proposition 几何雅可比矩阵的各列 {#prop-columns}
采用 Denavit–Hartenberg 坐标系，设$\mathbf z_{i-1}$为关节$i$的单位轴线方向，$\mathbf o_{i-1}$为坐标系$i-1$的原点（轴线上的一点），二者均用基坐标表示。则$J$的第$i$列为
$$
J_i = \begin{bmatrix} \mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1})\\ \mathbf z_{i-1}\end{bmatrix} \ \text{（转动关节）},
\qquad
J_i = \begin{bmatrix} \mathbf z_{i-1}\\ \mathbf 0\end{bmatrix}\ \text{（移动关节）}.
$$ {#eq-columns}
这里$\mathbf z_{i-1} = R_{0,i-1}\hat{\mathbf z}$是$R_{0,i-1}$的第三列，$\mathbf o_{i-1}$是$T_{0,i-1} = A_1\cdots A_{i-1}$的平移部分。
:::

::: proof
冻结除关节$i$以外的所有关节，令关节$i$以速度$\dot\theta_i$运动。此时连杆$0,\dots,i-1$静止，连杆$i,\dots,n$作为一个固连在该关节上的刚体一起运动。
**转动关节。** 外侧物体绕通过$\mathbf o_{i-1}$、方向为$\mathbf z_{i-1}$的固定直线转动，角速度为$\dot\theta_i\mathbf z_{i-1}$。轴线上的点$\mathbf o_{i-1}$静止，因此工具原点的速度为$\dot\theta_i\mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1})$。改变轴线上所取的点，只使$\mathbf o_n - \mathbf o_{i-1}$改变$\mathbf z_{i-1}$的一个倍数，不会改变叉积。
**移动关节。** 外侧物体以速率$\dot d_i$沿$\mathbf z_{i-1}$平移而不转动：速度为$\dot d_i\mathbf z_{i-1}$，角速度为$\mathbf 0$。
**叠加。** 当所有关节都运动时，工具的角速度是各关节处相对角速度之和，$\boldsymbol\omega = \sum_{\text{转动关节}}\dot\theta_i\mathbf z_{i-1}$。对于线速度，$\mathbf o_n(\boldsymbol\theta)$是光滑函数，故由链式法则$\dot{\mathbf o}_n = \sum_i(\partial\mathbf o_n/\partial\theta_i)\dot\theta_i$，而按定义，$\partial\mathbf o_n/\partial\theta_i$正是只有关节$i$以单位速度运动时$\mathbf o_n$的速度——即刚才求得的表达式。归并每个$\dot\theta_i$的系数即得[[#eq-columns]]。
:::

角速度部分$J_\omega$一般**不是**任何三个姿态坐标的导数（角速度不是某个角度向量对时间的导数）。如果任务是用最小姿态表示$\boldsymbol\phi$（欧拉角或横滚–俯仰–偏航角）写出的，那么**解析雅可比矩阵**（analytic Jacobian）$J_a = \partial(\mathbf o_n, \boldsymbol\phi)/\partial\boldsymbol\theta$与几何雅可比矩阵的关系为$J_a = \begin{bmatrix} I & 0\\ 0 & B(\boldsymbol\phi)^{-1}\end{bmatrix}J$，其中$\boldsymbol\omega = B(\boldsymbol\phi)\dot{\boldsymbol\phi}$是[[robotics/rigid-motions]]中的速率映射；除机器人自身的奇异位形外，它还继承了$B$的表示奇异性（万向节锁）。

::: example 平面 2R 机械臂的雅可比矩阵 {#ex-2r-jacobian}
对于平面 2R 机械臂（$L_1 = 0.6\,\mathrm m$，$L_2 = 0.5\,\mathrm m$），用两种方法推导$J_v$，在$\boldsymbol\theta = (30^\circ, 60^\circ)$处求其值，并求$\dot{\boldsymbol\theta} = (0.5, -1.0)\,\mathrm{rad/s}$时末端的速度。
::: solution
**求导法。** $x = L_1c_1 + L_2c_{12}$，$y = L_1s_1 + L_2s_{12}$，故
$$
J_v = \begin{bmatrix} \partial x/\partial\theta_1 & \partial x/\partial\theta_2\\ \partial y/\partial\theta_1 & \partial y/\partial\theta_2\end{bmatrix}
= \begin{bmatrix} -L_1s_1 - L_2s_{12} & -L_2s_{12}\\ L_1c_1 + L_2c_{12} & L_2c_{12}\end{bmatrix}.
$$
**逐列法。** 两根轴线都是$\mathbf z = \hat{\mathbf k}$；$\mathbf o_0 = \mathbf 0$，$\mathbf o_1 = L_1(c_1, s_1, 0)$，$\mathbf o_2 = (x, y, 0)$。第 1 列：$\hat{\mathbf k}\times(x, y, 0) = (-y, x, 0)$；第 2 列：$\hat{\mathbf k}\times(\mathbf o_2 - \mathbf o_1) = (-L_2s_{12}, L_2c_{12}, 0)$。矩阵相同 ✓，且$J_\omega = [1\ \ 1]$（角速度为绕$\hat{\mathbf k}$的$\dot\theta_1 + \dot\theta_2$）。
**数值。** 在$(30^\circ, 60^\circ)$处：$s_1 = 0.5$，$c_1 = 0.8660$，$s_{12} = 1$，$c_{12} = 0$，故
$$
J_v = \begin{bmatrix} -0.3 - 0.5 & -0.5\\ 0.5196 + 0 & 0\end{bmatrix} = \begin{bmatrix} -0.8 & -0.5\\ 0.5196 & 0\end{bmatrix}\mathrm m,
\qquad
\mathbf v = J_v\begin{bmatrix} 0.5\\ -1.0\end{bmatrix} = \begin{bmatrix} -0.4 + 0.5\\ 0.2598\end{bmatrix} = \begin{bmatrix} 0.100\\ 0.260\end{bmatrix}\mathrm{m/s}.
$$
合理性检查：第二根连杆竖直向上（$\theta_1 + \theta_2 = 90^\circ$），因此单独转动关节 2 只能使末端水平移动——第 2 列为$(-0.5, 0)$ ✓。行列式为$(-0.8)(0) - (-0.5)(0.5196) = 0.2598\,\mathrm{m^2} = L_1L_2\sin\theta_2 = 0.3\times0.8660$ ✓。
:::
:::

::: example SCARA 机械臂的雅可比矩阵 {#ex-scara-jacobian}
利用[[robotics/forward-kinematics]]中的 SCARA 坐标系（轴线$\mathbf z_0 = \mathbf z_1 = \hat{\mathbf k}$，$\mathbf z_2 = \mathbf z_3 = -\hat{\mathbf k}$；关节依次为 R、R、P、R），写出$6\times4$雅可比矩阵。
::: solution
工具原点为$\mathbf o_4 = (a_1c_1 + a_2c_{12},\ a_1s_1 + a_2s_{12},\ d_1 - d_3 - d_4)$，$\mathbf o_1 = (a_1c_1, a_1s_1, d_1)$：
- 关节 1（R）：$\hat{\mathbf k}\times(\mathbf o_4 - \mathbf o_0) = (-a_1s_1 - a_2s_{12},\ a_1c_1 + a_2c_{12},\ 0)$，角速度部分为$\hat{\mathbf k}$；
- 关节 2（R）：$\hat{\mathbf k}\times(\mathbf o_4 - \mathbf o_1) = (-a_2s_{12},\ a_2c_{12},\ 0)$，角速度部分为$\hat{\mathbf k}$；
- 关节 3（P）：线速度部分为$\mathbf z_2 = (0, 0, -1)$，角速度部分为$\mathbf 0$；
- 关节 4（R）：$\mathbf o_4$位于轴线$\mathbf z_3$上，因此线速度部分为$\mathbf 0$；角速度部分为$(0,0,-1)$。
$$
J = \begin{bmatrix}
-a_1s_1 - a_2s_{12} & -a_2s_{12} & 0 & 0\\
a_1c_1 + a_2c_{12} & a_2c_{12} & 0 & 0\\
0 & 0 & -1 & 0\\
0 & 0 & 0 & 0\\
0 & 0 & 0 & 0\\
1 & 1 & 0 & -1
\end{bmatrix}.
$$
第 4、5 行为零——SCARA 不能使工具倾斜——因此秩至多为 4，与它的四个自由度相符。左上角的$2\times2$块就是 2R 雅可比矩阵；当$\sin\theta_2 = 0$时它奇异。
:::
:::

## 奇异位形 {#sec-singularities}

::: definition 奇异位形 {#def-singular}
若$J(\boldsymbol\theta^*)$的秩低于它在所有位形上的最大秩，则称位形$\boldsymbol\theta^*$为**奇异**的。在奇异位形处，末端执行器的某些速度方向无法由任何关节速度产生，并且（对方阵$J$）$\det J(\boldsymbol\theta^*) = 0$。
:::

奇异位形之所以重要，有三个原因。速度：在奇异位形附近，$J^{-1}$的元素很大，因此沿一个几乎丧失的方向要求不大的工具速度，就需要极大的关节速度。力：在奇异位形处，某些工具力可以用零关节力矩平衡（见[[#sec-statics]]）——这对支承载荷有用，但意味着这些方向无法进行力控制。解：奇异位形通常把逆运动学的各个解支（肘部向上与肘部向下）分隔开，因此在解支之间转换的路径必须经过一个奇异位形。

::: proposition 2R 机械臂的奇异位形 {#prop-2r-singular}
对于平面 2R 机械臂，$\det J_v = L_1L_2\sin\theta_2$，因此不论$\theta_1$为何值，奇异位形都是$\theta_2 = 0$（伸直）和$\theta_2 = \pi$（折叠）。在这些位形处，末端只能沿垂直于基座到末端连线的方向运动。
:::

::: proof
$\det J_v = (-L_1s_1 - L_2s_{12})L_2c_{12} + L_2s_{12}(L_1c_1 + L_2c_{12}) = L_1L_2(s_{12}c_1 - s_1c_{12}) = L_1L_2\sin(\theta_{12} - \theta_1) = L_1L_2\sin\theta_2$；含$L_2^2$的项相互抵消。由于$L_1L_2 \ne 0$，$\det J_v = 0$当且仅当$\sin\theta_2 = 0$。在$\theta_2 = 0$或$\pi$时，两列$(-y, x)$和$(-L_2s_{12}, L_2c_{12})$都垂直于（共线的）连杆方向$(c_1, s_1)$，而这也是从基座到末端的方向；因此$J_v$的值域是垂直于机械臂的直线。这些位形正是[[robotics/forward-kinematics]]中求得的环形工作空间的边界。
:::

对于带球形腕的六轴机械臂，$6\times6$行列式可以分解因式，这是 Pieper 解耦在奇异性方面的对应结果。

::: proposition 奇异位形的解耦 {#prop-decouple-singular}
设 6R 机械臂的最后三根关节轴线相交于腕心$\mathbf o_c$，并在$\mathbf o_c$而不是工具处计算[[#eq-jacobian]]中的线速度。则
$$
J = \begin{bmatrix} J_{11} & 0\\ J_{21} & J_{22}\end{bmatrix},\qquad \det J = \det J_{11}\,\det J_{22},
$$
式中$J_{11}$（$3\times3$）是腕心位置关于$\theta_1,\theta_2,\theta_3$的雅可比矩阵，$J_{22} = [\mathbf z_3\ \mathbf z_4\ \mathbf z_5]$。机械臂奇异，当且仅当**手臂**奇异（$\det J_{11} = 0$）或**手腕**奇异（腕部轴线$\mathbf z_3, \mathbf z_4, \mathbf z_5$中有两根平行，即对 ZYZ 手腕有$\theta_5 = 0$或$\pi$）。
:::

::: proof
线速度的参考点只会使$J$相差一个可逆变换：把它从$\mathbf o_n$移到$\mathbf o_c$，就是把$\mathbf v$换成$\mathbf v - \boldsymbol\omega\times(\mathbf o_n - \mathbf o_c)$，即把$J$换成$\begin{bmatrix} I & [\mathbf o_n - \mathbf o_c]\\ 0 & I\end{bmatrix}J$，左乘矩阵的行列式为 1；因此奇异位形不变。以$\mathbf o_c$为参考点时，第 4–6 列的线速度部分为$\mathbf z_{i-1}\times(\mathbf o_c - \mathbf o_{i-1}) = \mathbf 0$，因为$\mathbf o_c$位于每一根腕部轴线上。于是右上块为零，而分块三角矩阵的行列式等于其对角块行列式之积。最后，$\det[\mathbf z_3\ \mathbf z_4\ \mathbf z_5] = 0$当且仅当这三个单位向量共面；对 ZYZ 手腕，总有$\mathbf z_4 \perp \mathbf z_3$和$\mathbf z_4\perp\mathbf z_5$，因此它们共面当且仅当$\mathbf z_5 = \pm\mathbf z_3$，即$\sin\theta_5 = 0$。
:::

::: example 肘型机械臂的奇异位形 {#ex-elbow-singular}
对于[[robotics/forward-kinematics]]中的肘型机械臂（$d_1 = 0.5$，$a_2 = 0.6$，$a_3 = 0.5\,\mathrm m$），由腕心位置$\mathbf o_c = \big(c_1 r,\ s_1 r,\ d_1 + a_2s_2 + a_3s_{23}\big)$（其中$r = a_2c_2 + a_3c_{23}$）求手臂的奇异位形。
::: solution
求导并化简（或数值计算后比较）得
$$
\det J_{11} = -a_2a_3\,s_3\,(a_2c_2 + a_3c_{23}) = -a_2a_3\,s_3\,r .
$$
在$\boldsymbol\theta = (30^\circ, 45^\circ, -60^\circ)$处：$s_3 = -0.8660$，$r = 0.9073\,\mathrm m$，故$\det J_{11} = -0.30\times(-0.8660)\times0.9073 = 0.2357\,\mathrm{m^3}$，与用有限差分数值计算的雅可比矩阵一致。由此得到两族奇异位形：
- **肘部奇异**，$s_3 = 0$：前臂与上臂共线（伸直或折叠），与 2R 机械臂的情形相同——位于工作空间的边界上；
- **肩部奇异**，$r = 0$：腕心位于腰部轴线$\mathbf z_0$上。此时转动腰部完全不能移动腕心，而且任何关节速度都不能使它侧向移动；要沿一条穿过该轴线的路径运动，所需的腰部转角会跳变$180^\circ$。
肩部奇异位于工作空间**内部**，这就是控制器要检测它的原因；肘部奇异则位于工作空间的边界上。
:::
:::

::: warning 奇异不等于"行列式很小"
$\det J$是有单位的（对 2R 机械臂为$\mathrm m^2$），并随机器人的尺寸缩放，因此"$\lvert\det J\rvert < 0.01$"对钟表装配机器人和起重机意味着完全不同的东西。对于完整的$6\times6$雅可比矩阵，单位还是混合的（线速度行以米计，角速度行无量纲），因此若改用毫米，行列式就会改变。应当用一个无量纲量来判断离奇异位形的远近——经过一致缩放的雅可比矩阵的条件数$\sigma_{\max}/\sigma_{\min}$，或仅取位置部分的可操作度——并且始终说明线速度是针对哪一点的，以及$J$在哪个坐标系中表示：基坐标系中的雅可比矩阵与工具坐标系中的雅可比矩阵相差一个旋转，把二者混用是常见的程序错误。
:::

## 可操作度与速度椭球 {#sec-manipulability}

机械臂沿各个方向的运动能力如何？输入所有单位大小的关节速度向量，看看得到哪些工具速度。

::: definition 速度椭球与可操作度 {#def-manipulability}
对于$\operatorname{rank}J = m$的雅可比矩阵$J\in\mathbb R^{m\times n}$（取所关心任务对应的行），**速度（可操作度）椭球**是关节速度单位球的像$\{J\dot{\boldsymbol\theta} : \lVert\dot{\boldsymbol\theta}\rVert \le 1\}$。**吉川可操作度指标**（Yoshikawa's manipulability measure）为
$$
w(\boldsymbol\theta) = \sqrt{\det\big(J(\boldsymbol\theta)J(\boldsymbol\theta)^{\mathsf T}\big)} = \sigma_1\sigma_2\cdots\sigma_m ,
$$
即$J$的奇异值之积；对方阵$J$，$w = \lvert\det J\rvert$。
:::

::: proposition 速度椭球的形状 {#prop-ellipsoid}
设$J = U\Sigma V^{\mathsf T}$为奇异值分解，奇异值为$\sigma_1 \ge \dots \ge \sigma_m > 0$，左奇异向量为$\mathbf u_1,\dots,\mathbf u_m$。速度椭球是主轴沿$\mathbf u_i$、半轴为$\sigma_i$的实心椭球：
$$
\{\mathbf v : \mathbf v^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v \le 1\}.
$$
它的体积与$w$成正比。
:::

::: proof
令$\dot{\boldsymbol\theta} = V\boldsymbol\beta$；由于$V$是正交矩阵，$\lVert\boldsymbol\beta\rVert = \lVert\dot{\boldsymbol\theta}\rVert$，因此$\boldsymbol\beta$取遍$\mathbb R^n$中的单位球。于是$\mathbf v = U\Sigma\boldsymbol\beta$；在坐标$\boldsymbol\eta = U^{\mathsf T}\mathbf v$下，即为$\eta_i = \sigma_i\beta_i$（$i \le m$），分量$\beta_{m+1},\dots,\beta_n$不起作用。在$\sum\beta_i^2 \le 1$下可达的$\boldsymbol\eta$的集合恰好是$\sum_{i\le m}\eta_i^2/\sigma_i^2 \le 1$（取$\beta_i = \eta_i/\sigma_i$，其余$\beta$为零），这是沿$\boldsymbol\eta$坐标轴、即在$\mathbf v$空间中沿$\mathbf u_i$、半轴为$\sigma_i$的椭球。写成矩阵形式，$\sum\eta_i^2/\sigma_i^2 = \mathbf v^{\mathsf T}U\Sigma_m^{-2}U^{\mathsf T}\mathbf v = \mathbf v^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v$，因为$JJ^{\mathsf T} = U\Sigma_m^2U^{\mathsf T}$。椭球的体积等于单位球的体积乘以各半轴之积$\sigma_1\cdots\sigma_m = \sqrt{\det(U\Sigma_m^2U^{\mathsf T})} = w$。
:::

对 2R 机械臂，$w = \lvert\det J_v\rvert = L_1L_2\lvert\sin\theta_2\rvert$：在$\theta_2 = \pm90^\circ$时最大，在奇异位形处为零。比值$\sigma_{\min}/\sigma_{\max}$（条件数的倒数）度量各向同性——即椭圆有多圆。

::: example 2R 机械臂的速度椭圆 {#ex-ellipse}
对[[#ex-2r-jacobian]]中的$J_v = \begin{bmatrix} -0.8 & -0.5\\ 0.5196 & 0\end{bmatrix}\mathrm m$，求速度椭圆和可操作度。
::: solution
$$
J_vJ_v^{\mathsf T} = \begin{bmatrix} 0.64 + 0.25 & -0.4157\\ -0.4157 & 0.27\end{bmatrix} = \begin{bmatrix} 0.89 & -0.4157\\ -0.4157 & 0.27\end{bmatrix}\mathrm{m^2},
$$
其迹为$1.16$，行列式为$0.89\times0.27 - 0.4157^2 = 0.2403 - 0.1728 = 0.0675\,\mathrm{m^4}$。其特征值为$\sigma^2 = \frac12\big(1.16 \pm \sqrt{1.16^2 - 4\times0.0675}\big) = \frac12(1.16 \pm 1.0371)$，即$1.0986$和$0.0615\,\mathrm{m^2}$，故$\sigma_1 = 1.048\,\mathrm m$，$\sigma_2 = 0.248\,\mathrm m$。可操作度为$w = \sqrt{0.0675} = 0.2598\,\mathrm{m^2} = \sigma_1\sigma_2$ ✓ $= L_1L_2\sin60^\circ$ ✓。长轴沿$\mathbf u_1 = (-0.894, 0.448)$，方向角为$153.4^\circ$（等价地为$-26.6^\circ$），短轴沿$(0.448, 0.894)$，方向角为$63.4^\circ$。因此，在关节速度的范数不超过$1\,\mathrm{rad/s}$时，末端大致沿$153^\circ$方向可以以高达$1.05\,\mathrm{m/s}$的速度运动，而沿$63^\circ$方向只能以$0.25\,\mathrm{m/s}$运动——这一方向接近从基座到末端的连线方向（$\operatorname{atan2}(0.8, 0.5196) = 57^\circ$），因为伸出或缩回手臂需要张开肘部。
:::
:::

::: widget svd
matrix: -0.8, -0.5; 0.5196, 0
caption: 算例中的 2R 雅可比矩阵$J_v = U\Sigma V^{\mathsf T}$逐步作用于关节速度的单位圆：其像是半轴为$\sigma_1 = 1.05$和$\sigma_2 = 0.25\,\mathrm m$的速度椭圆。把矩阵改为接近伸直位形处的雅可比矩阵，例如$\theta = (0^\circ, 10^\circ)$，此时$J_v = \begin{bmatrix} -0.087 & -0.087\\ 1.092 & 0.492\end{bmatrix}$：椭圆塌缩成一条垂直于手臂的线段，而$\sigma_2$——径向可用的速度——几乎消失。
:::

::: widget plot
f: sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x) + sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x))^2 - 4*(L1*L2*sin(x))^2))/2); sqrt(abs(L1^2 + 2*L2^2 + 2*L1*L2*cos(x) - sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x))^2 - 4*(L1*L2*sin(x))^2))/2); L1*L2*abs(sin(x))
x: -pi, pi
y: 0, 2
sliders: L1=0.6:0.2:1:0.05; L2=0.5:0.2:1:0.05
labels: \sigma_1\ (\mathrm m); \sigma_2\ (\mathrm m); w\ (\mathrm{m^2})
piticks: true
caption: 2R 机械臂的奇异值$\sigma_1 \ge \sigma_2$和可操作度$w = \sigma_1\sigma_2$随肘关节角$\theta_2$的变化（它们与$\theta_1$无关）。$\sigma_2$和$w$在奇异位形$\theta_2 = 0$和$\pm\pi$处为零。不论连杆长度如何，可操作度都在$\theta_2 = \pm\pi/2$处取峰值；但椭圆最圆（$\sigma_2/\sigma_1$最大）的肘关节角却是另一个取决于$L_1/L_2$的值——两种合理的"灵巧性"度量并不一致，因此要说明一项设计优化的是哪一种。
:::

## 静力学：力与力矩 {#sec-statics}

雅可比矩阵也联系着力。设机械臂处于平衡，工具对环境施加力$\mathbf f$和力矩$\mathbf n$——二者合起来称为**力旋量**（wrench）$\mathbf F = (\mathbf f, \mathbf n)$，其中$\mathbf f$作用于工具原点。

::: theorem 力–力矩关系 {#thm-statics}
若一个无摩擦的刚性串联机械臂保持静力平衡，其工具对环境施加力旋量$\mathbf F = (\mathbf f, \mathbf n)$，且连杆上的重力和其他载荷另行平衡，则所需的关节力矩（对转动关节）和关节力（对移动关节）为
$$
\boldsymbol\tau = J(\boldsymbol\theta)^{\mathsf T}\mathbf F .
$$ {#eq-statics}
:::

::: proof
应用虚功原理（[[dynamics/rigid-body-energy-momentum]]）。给关节一个与约束相容的任意虚位移$\delta\boldsymbol\theta$。工具产生虚位移$\delta\mathbf x = (\delta\mathbf p, \delta\boldsymbol\phi) = J\delta\boldsymbol\theta$（速度关系[[#eq-jacobian]]乘以$\delta t$；$\delta\boldsymbol\phi$是无穷小转动向量）。驱动器对机械臂做虚功$\boldsymbol\tau^{\mathsf T}\delta\boldsymbol\theta$；环境对工具施加反作用$-\mathbf F$，做虚功$-\mathbf f\cdot\delta\mathbf p - \mathbf n\cdot\delta\boldsymbol\phi = -\mathbf F^{\mathsf T}J\delta\boldsymbol\theta$。关节和连杆无摩擦且为刚性，内力不做功，平衡时对每个$\delta\boldsymbol\theta$总虚功都为零：
$$
\boldsymbol\tau^{\mathsf T}\delta\boldsymbol\theta - \mathbf F^{\mathsf T}J\delta\boldsymbol\theta = (\boldsymbol\tau - J^{\mathsf T}\mathbf F)^{\mathsf T}\delta\boldsymbol\theta = 0\quad\text{对所有 }\delta\boldsymbol\theta,
$$
因此$\boldsymbol\tau = J^{\mathsf T}\mathbf F$。等价地说，功率守恒：$\boldsymbol\tau^{\mathsf T}\dot{\boldsymbol\theta} = \mathbf F^{\mathsf T}\mathbf v$。
:::

由此得到两个推论。第一，**在奇异位形处**存在非零的$\mathbf F$使$J^{\mathsf T}\mathbf F = \mathbf 0$（$J^{\mathsf T}$的零空间是$J$的值域的正交补）：沿某个"丧失的"速度方向的力旋量完全由结构承受，不需要关节力矩。伸直的手臂可以在电机松弛时承受轴向载荷；人推一辆沉重的汽车时会伸直双臂。第二，**对偶性**：在$\lVert\boldsymbol\tau\rVert\le1$的关节力矩下所能产生的工具力的集合是椭球$\{\mathbf F : \mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F \le 1\}$，它与速度椭球有**相同的**主轴$\mathbf u_i$，但半轴为$1/\sigma_i$。机械臂运动得快的方向就是它推得弱的方向，反之亦然——就像杠杆。

::: example 按压任务所需的关节力矩 {#ex-statics}
[[#ex-2r-jacobian]]中的 2R 机械臂在$(30^\circ, 60^\circ)$处以$20\,\mathrm N$的力把末端向下压在桌面上。求关节力矩。再求手臂沿$+x$水平伸直、在末端托住$2.0\,\mathrm{kg}$质量所需的力矩（忽略手臂自重；$g = 9.81\,\mathrm{m/s^2}$）。
::: solution
**按压。** 末端对桌面施加$\mathbf f = (0, -20)\,\mathrm N$（在手臂所在的竖直平面内，$y$向上）。由[[#eq-statics]]并用平面位置雅可比矩阵，
$$
\boldsymbol\tau = J_v^{\mathsf T}\mathbf f = \begin{bmatrix} -0.8 & 0.5196\\ -0.5 & 0\end{bmatrix}\begin{bmatrix} 0\\ -20\end{bmatrix} = \begin{bmatrix} -10.39\\ 0\end{bmatrix}\mathrm{N\,m}.
$$
关节 2 不需要力矩：连杆 2 竖直，力沿连杆作用并通过关节 2。用整个手臂的静力学校核：桌面对末端的反力$(0, +20)\,\mathrm N$作用在$x = 0.6\cos30^\circ = 0.5196\,\mathrm m$处，它对关节 1 的力矩为$+20\times0.5196 = 10.39\,\mathrm{N\,m}$（逆时针），电机必须提供$-10.39\,\mathrm{N\,m}$来平衡它 ✓。
**伸直手臂托住质量。** 在$\boldsymbol\theta = (0, 0)$处，$J_v = \begin{bmatrix} 0 & 0\\ 1.1 & 0.5\end{bmatrix}\mathrm m$。为支承重量，末端必须以$\mathbf f = (0, mg) = (0, 19.62)\,\mathrm N$向上推质量，故$\boldsymbol\tau = (1.1\times19.62,\ 0.5\times19.62) = (21.6, 9.81)\,\mathrm{N\,m}$——即重量乘以到各关节的水平距离，与初等静力学的结论一致。这个位形是奇异的：沿手臂方向的水平力$(f_x, 0)$给出$\boldsymbol\tau = J_v^{\mathsf T}(f_x, 0) = \mathbf 0$，因此手臂可以完全不用电机力矩而沿其长度方向推或拉（但也无法控制这个力）。
:::
:::

::: quiz
一个平面 2R 机械臂处于$\sigma_1 = 1.0\,\mathrm m$、$\sigma_2 = 0.1\,\mathrm m$的位形。关节力矩受限于$\lVert\boldsymbol\tau\rVert \le 10\,\mathrm{N\,m}$。与方向$\mathbf u_1$相比，在方向$\mathbf u_2$上机械臂能够
- [ ] 运动快 10 倍，推力大 10 倍。
- [x] 运动慢 10 倍，推力大 10 倍。
- [ ] 运动慢 10 倍，推力小 10 倍。
- [ ] 运动和推力都一样，因为力矩限制相同。
::: solution
速度半轴为$\sigma_i$，力半轴为$1/\sigma_i$（乘以力矩界限）：每$\mathrm{rad/s}$对应$1\,\mathrm{m/s}$和$0.1\,\mathrm{m/s}$，而$10\,\mathrm{N\,m}$对应$10$和$100\,\mathrm N$。沿$\mathbf u_2$，机械臂是一个低速挡杠杆：慢而有力。
:::
:::

## 分解速度控制与冗余 {#sec-resolved}

要使工具以期望速度$\mathbf v_d$运动，在每个控制步给出关节速度指令$\dot{\boldsymbol\theta} = J(\boldsymbol\theta)^{-1}\mathbf v_d$：这就是**分解速度控制**（resolved-rate control）。随时间积分并反馈位置误差，$\dot{\boldsymbol\theta} = J^{-1}(\mathbf v_d + K\mathbf e)$，它就能跟踪笛卡儿路径，它也是[[robotics/inverse-kinematics]]中牛顿法的连续时间形式。对于冗余机械臂（$n > m$），$J$没有逆，$J\dot{\boldsymbol\theta} = \mathbf v_d$有无穷多个解。

::: proposition 最小范数关节速度与零空间 {#prop-pseudoinverse}
设$J\in\mathbb R^{m\times n}$行满秩$m < n$，并令$J^{+} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}$。则 (a) $\dot{\boldsymbol\theta} = J^{+}\mathbf v_d$是$J\dot{\boldsymbol\theta} = \mathbf v_d$的范数$\lVert\dot{\boldsymbol\theta}\rVert$最小的解；(b) 每一个解都具有如下形式
$$
\dot{\boldsymbol\theta} = J^{+}\mathbf v_d + (I - J^{+}J)\,\dot{\boldsymbol\theta}_0
$$ {#eq-nullspace}
其中$\dot{\boldsymbol\theta}_0\in\mathbb R^n$为某个向量，$I - J^{+}J$是到$J$的零空间上的投影。
:::

::: proof
(a) $JJ^{+}\mathbf v_d = JJ^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v_d = \mathbf v_d$，故$J^{+}\mathbf v_d$是一个解；由于$J$行满秩，$JJ^{\mathsf T}$可逆。任何其他解与它相差一个满足$J\mathbf n = \mathbf 0$的$\mathbf n$。而$J^{+}\mathbf v_d = J^{\mathsf T}\mathbf y$（其中$\mathbf y = (JJ^{\mathsf T})^{-1}\mathbf v_d$）位于$J$的行空间中，行空间与零空间正交：$\mathbf n^{\mathsf T}J^{\mathsf T}\mathbf y = (J\mathbf n)^{\mathsf T}\mathbf y = 0$。由勾股定理，$\lVert J^{+}\mathbf v_d + \mathbf n\rVert^2 = \lVert J^{+}\mathbf v_d\rVert^2 + \lVert\mathbf n\rVert^2$，当$\mathbf n = \mathbf 0$时取最小。(b) $J(I - J^{+}J) = J - JJ^{+}J = J - J = 0$，故形如[[#eq-nullspace]]的每个向量都是解；反之，任一解$\dot{\boldsymbol\theta}$都等于取$\dot{\boldsymbol\theta}_0 = \dot{\boldsymbol\theta}$时的[[#eq-nullspace]]，因为$(I - J^{+}J)\dot{\boldsymbol\theta} = \dot{\boldsymbol\theta} - J^{+}\mathbf v_d$。
:::

零空间项使关节运动而工具不动——即**自运动**（self-motion）——用于追求次要目标：取$\dot{\boldsymbol\theta}_0 = k\nabla_{\boldsymbol\theta}h$，使某个指标$h(\boldsymbol\theta)$上升，例如可操作度或与关节极限和障碍物的距离。

::: example 奇异位形附近的冗余平面机械臂 {#ex-redundant}
连杆长度为$L_1 = 0.4$、$L_2 = 0.3$、$L_3 = 0.1\,\mathrm m$的平面 3R 机械臂只对其末端定位（任务$m = 2$，$n = 3$）。在$\boldsymbol\theta = (0^\circ, 10^\circ, 90^\circ)$处，前两根连杆几乎共线。比较产生末端速度$\mathbf v_d = (0.1, 0)\,\mathrm{m/s}$（沿手臂方向把末端拉回）所需的关节速度：(a) 锁住关节 3；(b) 用伪逆。
::: solution
$2\times3$位置雅可比矩阵的第$i$列为$\hat{\mathbf k}\times(\mathbf o_3 - \mathbf o_{i-1})$；连杆的绝对角度为$0^\circ, 10^\circ, 100^\circ$：
$$
J = \begin{bmatrix} -0.1506 & -0.1506 & -0.0985\\ 0.6781 & 0.2781 & -0.0174\end{bmatrix}\mathrm m.
$$
(a) 锁住关节 3 后只剩前两列，即一个接近奇异的 2R 机械臂：求解得$\dot{\boldsymbol\theta} = (0.462, -1.126, 0)\,\mathrm{rad/s}$，$\lVert\dot{\boldsymbol\theta}\rVert = 1.22\,\mathrm{rad/s}$。
(b) $JJ^{\mathsf T} = \begin{bmatrix} 0.0550 & -0.1423\\ -0.1423 & 0.5374\end{bmatrix}$，$\dot{\boldsymbol\theta} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v_d = (0.166, -0.443, -0.593)\,\mathrm{rad/s}$，范数为$0.758\,\mathrm{rad/s}$——减少了 38%，因为第三个关节处于很适合沿$x$移动末端的位置，承担了很大一部分运动。校核：$J\dot{\boldsymbol\theta} = (-0.0250 + 0.0667 + 0.0584,\ 0.1129 - 0.1232 + 0.0103) = (0.100, 0.000)\,\mathrm{m/s}$ ✓。
:::
:::

在奇异位形附近，即使伪逆也会产生很大的速度；[[robotics/inverse-kinematics]]中的阻尼最小二乘逆$J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}$以微小的跟踪误差为代价限制了这些速度。

::: history
惠特尼（Daniel Whitney）1969 年的论文《机械臂与人体假肢的分解运动速度控制》（"Resolved motion rate control of manipulators and human prostheses"）提出了通过雅可比逆矩阵给出关节速度指令的思想，使操作者能够用笛卡儿坐标来规定运动；分解速度控制至今仍用于遥操作机械臂。吉川恒夫（Tsuneo Yoshikawa）1985 年的论文《机器人机构的可操作度》（"Manipulability of robotic mechanisms"）定义了可操作度指标$\sqrt{\det JJ^{\mathsf T}}$和速度椭球，为比较不同位形和机械臂设计提供了定量方法。通过$J^{\mathsf T}$体现的力–速度对偶性就是虚功原理，它可以追溯到拉格朗日（Lagrange）的《分析力学》（*Mécanique analytique*，1788 年）。
:::

::: summary
- 几何雅可比矩阵把关节速度映射为工具速度，$(\mathbf v, \boldsymbol\omega) = J\dot{\boldsymbol\theta}$；转动关节的列为$(\mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1}), \mathbf z_{i-1})$，移动关节的列为$(\mathbf z_{i-1}, \mathbf 0)$。
- 对平面 2R 机械臂，$\det J_v = L_1L_2\sin\theta_2$；伸直或折叠时奇异。
- 奇异位形丧失某些速度方向，在其附近需要很大的关节速度，并分隔逆运动学的解支。对球形腕，$\det J = \det J_{11}\det J_{22}$：手臂奇异（肘部、肩部）和手腕奇异（$\theta_5 = 0$）。
- 可操作度$w = \sqrt{\det JJ^{\mathsf T}} = \prod\sigma_i$；速度椭球沿左奇异向量方向，半轴为$\sigma_i$。
- 静力学：$\boldsymbol\tau = J^{\mathsf T}\mathbf F$（虚功）；力椭球主轴相同，半轴为$1/\sigma_i$；在奇异位形处，某些力旋量不需要力矩。
- 分解速度$\dot{\boldsymbol\theta} = J^{-1}\mathbf v_d$；对冗余机械臂，$J^{+} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}$给出最小范数速度，$(I - J^{+}J)\dot{\boldsymbol\theta}_0$叠加自运动。
:::

## 习题

::: exercise 2R 雅可比矩阵的行列式 {#exr-det level=1 check="0.15"}
一个$L_1 = 0.6\,\mathrm m$、$L_2 = 0.5\,\mathrm m$的 2R 机械臂，$\theta_2 = 30^\circ$。求$\det J_v$。（以$\mathrm{m^2}$为单位输入。）
::: solution
$\det J_v = L_1L_2\sin\theta_2 = 0.30\times0.5 = 0.15\,\mathrm{m^2}$，与$\theta_1$无关。它是$\theta_2 = 90^\circ$时最大值$0.30\,\mathrm{m^2}$的$58\%$。
:::
:::

::: exercise 末端速度 {#exr-vel level=1 check="0.1697"}
对$L_1 = 0.6$、$L_2 = 0.5\,\mathrm m$的 2R 机械臂，在$\boldsymbol\theta = (45^\circ, 45^\circ)$、$\dot{\boldsymbol\theta} = (0.4, 0.3)\,\mathrm{rad/s}$时，求末端速度。（输入$\dot y$，单位 m/s，保留四位小数。）
::: solution
在$\theta_1 = 45^\circ$、$\theta_1 + \theta_2 = 90^\circ$处：$\dot x = -(L_1s_1 + L_2s_{12})\dot\theta_1 - L_2s_{12}\dot\theta_2 = -(0.4243 + 0.5)(0.4) - 0.5(0.3) = -0.370 - 0.150 = -0.520\,\mathrm{m/s}$；$\dot y = (L_1c_1 + L_2c_{12})\dot\theta_1 + L_2c_{12}\dot\theta_2 = 0.4243\times0.4 + 0 = 0.170\,\mathrm{m/s}$。第二根连杆竖直，因此它的转动只对$\dot x$有贡献。
:::
:::

::: exercise 支承载荷 {#exr-load level=1 check="11"}
2R 机械臂（$L_1 = 0.6$，$L_2 = 0.5\,\mathrm m$）水平伸直，$\boldsymbol\theta = (0, 0)$，末端悬挂一个$10\,\mathrm N$的重物。求关节力矩。（输入$\tau_1$，单位 N·m。）
::: solution
末端必须以$\mathbf f = (0, 10)\,\mathrm N$向上推；$J_v^{\mathsf T} = \begin{bmatrix} 0 & 1.1\\ 0 & 0.5\end{bmatrix}$，故$\boldsymbol\tau = (11, 5)\,\mathrm{N\,m}$：即重量乘以对各关节的力臂 ✓。
:::
:::

::: exercise 最佳可操作度 {#exr-best level=2 check="0.3"}
对$L_1 = 0.6$、$L_2 = 0.5\,\mathrm m$的 2R 机械臂，求使$w$最大的肘关节角及最大值。若总长$L_1 + L_2 = 1.1\,\mathrm m$固定，怎样分配长度能使最佳可操作度最大？（输入给定机械臂的最大$w$，单位$\mathrm{m^2}$。）
::: solution
$w = L_1L_2\lvert\sin\theta_2\rvert$在$\theta_2 = \pm90^\circ$时最大，$w_{\max} = 0.30\,\mathrm{m^2}$。若$L_1 + L_2 = \ell$固定，则$L_1L_2 \le (\ell/2)^2$，两杆等长时取等号：$L_1 = L_2 = 0.55\,\mathrm m$给出$0.3025\,\mathrm{m^2}$——只略大一点。吉川对这一情形的分析是许多机械臂的上臂与前臂长度几乎相等的原因之一。
:::
:::

::: exercise 肩部奇异 {#exr-shoulder level=2 check="66.87"}
对$a_2 = 0.6$、$a_3 = 0.5\,\mathrm m$、$\theta_2 = 60^\circ$的肘型机械臂，求使腕心落在腰部轴线上的肘关节角$\theta_3\in(0^\circ, 180^\circ)$。（输入$\theta_3$，单位为度，保留两位小数。）
::: solution
肩部奇异为$r = a_2c_2 + a_3c_{23} = 0$：$0.6\times0.5 + 0.5\cos(60^\circ + \theta_3) = 0$，故$\cos(60^\circ + \theta_3) = -0.6$，$60^\circ + \theta_3 = 126.87^\circ$，$\theta_3 = 66.87^\circ$。在这个位形处，尽管肘部远未伸直，仍有$\det J_{11} = -a_2a_3s_3r = 0$。
:::
:::

::: exercise 速度椭圆的轴 {#exr-ellipse level=2 check="0.2479"}
证明对[[#ex-2r-jacobian]]中的雅可比矩阵，最小奇异值为$\sigma_2 = \sqrt{\big(1.16 - \sqrt{1.16^2 - 4\times0.0675}\big)/2}\,\mathrm m$，并把它解释为一个速度。（输入$\sigma_2$，单位 m，保留四位小数。）
::: solution
$\sigma_i^2$是$J_vJ_v^{\mathsf T}$的特征值，即$\lambda^2 - (\operatorname{tr})\lambda + \det = 0$的根，其中$\operatorname{tr} = 1.16\,\mathrm{m^2}$，$\det = 0.0675\,\mathrm{m^4}$（[[#ex-ellipse]]）；较小的根给出$\sigma_2 = 0.248\,\mathrm m$。在范数为$1\,\mathrm{rad/s}$的关节速度下，末端沿其最慢的方向$\mathbf u_2 = (0.448, 0.894)$只能以$0.248\,\mathrm{m/s}$运动；要在该方向上以$0.5\,\mathrm{m/s}$运动，需要范数为$0.5/0.248 = 2.0\,\mathrm{rad/s}$的关节速度。
:::
:::

::: exercise 力椭球 {#exr-force-ellipsoid level=3}
证明对方阵且非奇异的$J$，工具力的集合$\{\mathbf F : \mathbf F = (J^{\mathsf T})^{-1}\boldsymbol\tau,\ \lVert\boldsymbol\tau\rVert\le1\}$是主轴为$\mathbf u_i$、半轴为$1/\sigma_i$的椭球$\mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F\le1$。由此推出同一方向上速度半轴与力半轴之积为 1，并从功率的角度解释这一点。
::: solution
$\boldsymbol\tau = J^{\mathsf T}\mathbf F$，故$\lVert\boldsymbol\tau\rVert^2 = \mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F \le 1$。由$JJ^{\mathsf T} = U\Sigma^2U^{\mathsf T}$，令$\boldsymbol\eta = U^{\mathsf T}\mathbf F$，条件化为$\sum\sigma_i^2\eta_i^2\le1$：这是主轴为$\mathbf u_i$、半轴为$1/\sigma_i$的椭球。速度半轴乘以力半轴为$\sigma_i\cdot(1/\sigma_i) = 1$。功率：沿$\mathbf v_i$的单位范数关节速度向量产生工具速度$\sigma_i\mathbf u_i$，沿$\mathbf v_i$的单位范数力矩向量产生工具力$\mathbf u_i/\sigma_i$；功率$\mathbf F^{\mathsf T}\mathbf v = (1/\sigma_i)\sigma_i = 1 = \boldsymbol\tau^{\mathsf T}\dot{\boldsymbol\theta}$在两侧相同，理想（无损耗）传动必然如此。机械臂是一个随位形变化的齿轮箱，它在方向$\mathbf u_i$上的"传动比"为$\sigma_i$。
:::
:::

::: exercise 肘型机械臂的雅可比矩阵 {#exr-elbow-jacobian level=3}
推导肘型机械臂腕心$\mathbf o_c = (c_1r, s_1r, d_1 + a_2s_2 + a_3s_{23})$（$r = a_2c_2 + a_3c_{23}$）的$3\times3$位置雅可比矩阵$J_{11}$，并证明$\det J_{11} = -a_2a_3s_3r$。
::: solution
$$
J_{11} = \begin{bmatrix} -s_1r & c_1\,\partial r/\partial\theta_2 & c_1\,\partial r/\partial\theta_3\\ c_1r & s_1\,\partial r/\partial\theta_2 & s_1\,\partial r/\partial\theta_3\\ 0 & a_2c_2 + a_3c_{23} & a_3c_{23}\end{bmatrix},
\quad \frac{\partial r}{\partial\theta_2} = -a_2s_2 - a_3s_{23},\quad \frac{\partial r}{\partial\theta_3} = -a_3s_{23}.
$$
按第一列展开。第 2、3 列的前两行分别是同一对数$(p, q) = (-a_2s_2 - a_3s_{23}, -a_3s_{23})$乘以$c_1$和$s_1$，故
$$
\det J_{11} = -s_1r\big(s_1p\,a_3c_{23} - s_1q\,r\big) - c_1r\big(c_1p\,a_3c_{23} - c_1q\,r\big) = -r\big(p\,a_3c_{23} - q\,r\big),
$$
这里用到了$s_1^2 + c_1^2 = 1$以及第三行元素为$r$和$a_3c_{23}$。而$p\,a_3c_{23} - q\,r = (-a_2s_2 - a_3s_{23})a_3c_{23} + a_3s_{23}(a_2c_2 + a_3c_{23}) = a_2a_3(s_{23}c_2 - s_2c_{23}) = a_2a_3s_3$。因此$\det J_{11} = -a_2a_3s_3r$，在$(30^\circ, 45^\circ, -60^\circ)$处给出$0.2357\,\mathrm{m^3}$，与[[#ex-elbow-singular]]中的数值结果一致。
:::
:::

::: exercise 选择工作姿态 {#exr-posture level=3}
一个$L_1 = L_2 = 0.5\,\mathrm m$、每个关节力矩限制为$30\,\mathrm{N\,m}$的 2R 机械臂，必须 (i) 以$60\,\mathrm N$向下压在工件上，并且 (ii) 同时在关节速度低于$2\,\mathrm{rad/s}$的条件下以至多$0.5\,\mathrm{m/s}$的速度沿工件水平滑动。工件表面可以放在可达范围内的任何位置。提出一个姿态，并用速度椭圆和力椭圆说明理由；校核所选姿态的力矩要求。
::: solution
两项要求的方向不同：用力向下压，要求力椭圆在$y$方向长（速度椭圆在$y$方向短）；快速水平滑动，要求速度椭圆在$x$方向长。当机械臂慢而有力的方向是竖直方向时——即从基座到末端的连线竖直且肘部弯曲时——两者都能满足。一种选择是：工件位于基座正下方深度$r = 0.707\,\mathrm m$处（$\theta_2 = 90^\circ$），$\theta_1 = -135^\circ$，于是连杆 1 指向左下方，连杆 2 指向右下方。此时$J_v = \begin{bmatrix} 0.354 + 0.354 & 0.354\\ -0.354 + 0.354 & 0.354\end{bmatrix} = \begin{bmatrix} 0.707 & 0.354\\ 0 & 0.354\end{bmatrix}\mathrm m$（用到$s_1 = c_1 = -0.707$，$s_{12} = -0.707$，$c_{12} = 0.707$）。以$\mathbf f = (0, -60)\,\mathrm N$按压：$\boldsymbol\tau = J_v^{\mathsf T}\mathbf f = (0, -21.2)\,\mathrm{N\,m}$，在限制以内。以$\dot x = 0.5\,\mathrm{m/s}$、$\dot y = 0$滑动：$\dot\theta_2 = 0$，$\dot\theta_1 = 0.5/0.707 = 0.71\,\mathrm{rad/s}$，在限制以内——整个手臂绕基座摆动。向下伸直的姿态按压时不需要力矩，但无法滑动（奇异）；末端远在一侧的姿态容易滑动，但按压需要很大的力矩。只要校核了两个椭圆和数值，其他答案也可接受。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 用本章的记法推导了几何雅可比矩阵、奇异位形解耦和解析雅可比矩阵；Siciliano 等人深入讨论了冗余、伪逆、阻尼最小二乘以及可操作度椭球和力椭球；Lynch 与 Park 用旋量记法给出了空间雅可比矩阵和物体雅可比矩阵。
