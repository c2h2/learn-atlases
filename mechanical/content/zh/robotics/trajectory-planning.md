逆运动学告诉机器人它的关节必须处于**何处**；轨迹则告诉它**何时**到达。不能只给控制器一串位姿，让它在这些位姿之间跳变：电机有转矩限制，连杆有柔性，减速器有齿隙，而负载可能是满满一杯水。**轨迹**是一个以时间为参数的参考信号$\mathbf q_d(t)$（在任务空间中为$T_d(t)$），它必须足够光滑以便能被跟踪——至少位置和速度连续，通常加速度也连续——并且满足每个关节的速度和加速度限制。本章把几何问题（**路径**：走哪条曲线）与时间问题（**时间标度**：沿曲线走多快）分开，推导三次和五次多项式时间标度以及几乎所有工业控制器都采用的梯形速度曲线，用三次样条连接若干路径点，并规划姿态用球面线性插值（slerp）插补的笛卡儿直线路径。本章最后讨论关节空间规划与任务空间规划之间的选择，以及奇异位形和关节行程对笛卡儿路径施加的限制。所需的运动学来自[[robotics/forward-kinematics]]和[[robotics/inverse-kinematics]]；这里生成的轨迹是[[robotics/robot-control]]中各控制器的输入。

## 路径、轨迹与时间标度 {#sec-time-scaling}

::: definition 路径、时间标度与轨迹 {#def-trajectory}
**路径**是位形空间中从起点$\boldsymbol\theta(0)$到终点$\boldsymbol\theta(1)$的一条曲线$\boldsymbol\theta(s)$，$s\in[0,1]$（在任务空间中为$\mathbf x(s)$）。**时间标度**（time scaling）是一个非减函数$s(t)$，满足$s(0) = 0$和$s(T) = 1$，其中$T$为运动时长。**轨迹**是复合函数$\boldsymbol\theta(s(t))$，$t\in[0, T]$。由链式法则，其速度和加速度为
$$
\dot{\boldsymbol\theta} = \frac{d\boldsymbol\theta}{ds}\,\dot s,\qquad \ddot{\boldsymbol\theta} = \frac{d\boldsymbol\theta}{ds}\,\ddot s + \frac{d^2\boldsymbol\theta}{ds^2}\,\dot s^2 .
$$ {#eq-chain}
:::

对于**关节空间中的直线路径**$\boldsymbol\theta(s) = \boldsymbol\theta_0 + s(\boldsymbol\theta_1 - \boldsymbol\theta_0)$，二阶导数为零，每个关节只是按其自身位移缩放后跟随同一个标量曲线$s(t)$：$\dot\theta_i = \Delta\theta_i\,\dot s$，$\ddot\theta_i = \Delta\theta_i\,\ddot s$。所有关节同时起动、同时停止——这就是工业控制器所说的关节（PTP）运动，即**同步**的点到点运动。因此，设计点到点运动就归结为设计一个标量函数$s(t)$。

把路径与时间分开不仅仅是为了方便：一条路径只需检查一次碰撞和关节限位，之后就可以重新确定其时间（更快、更慢、在障碍物或人附近减速）而无须重新规划路径。

## 多项式时间标度 {#sec-polynomial}

最简单的光滑时间标度是由边界条件确定系数的多项式。记$\tau = t/T\in[0,1]$为归一化时间。

::: proposition 三次与五次时间标度 {#prop-polynomials}
(a) 满足$s(0) = 0$、$s(T) = 1$、$\dot s(0) = \dot s(T) = 0$的唯一三次多项式为
$$
s(t) = 3\tau^2 - 2\tau^3,\qquad \dot s_{\max} = \frac{3}{2T}\ \text{于 } \tau = \tfrac12,\qquad \lvert\ddot s\rvert_{\max} = \frac{6}{T^2}\ \text{于 } \tau = 0, 1 .
$$ {#eq-cubic}
(b) 还满足$\ddot s(0) = \ddot s(T) = 0$的唯一五次多项式为
$$
s(t) = 10\tau^3 - 15\tau^4 + 6\tau^5,\qquad \dot s_{\max} = \frac{15}{8T},\qquad \lvert\ddot s\rvert_{\max} = \frac{10}{\sqrt3\,T^2}\ \text{于 } \tau = \tfrac12 \mp \tfrac{\sqrt3}{6} .
$$ {#eq-quintic}
:::

::: proof
(a) 设$s = a_0 + a_1\tau + a_2\tau^2 + a_3\tau^3$；则$ds/d\tau = a_1 + 2a_2\tau + 3a_3\tau^2$，且$\dot s = (ds/d\tau)/T$。$\tau = 0$处的条件给出$a_0 = 0$、$a_1 = 0$；$\tau = 1$处的条件给出$a_2 + a_3 = 1$和$2a_2 + 3a_3 = 0$，于是$a_3 = -2$，$a_2 = 3$。四个条件、四个系数、一个非奇异线性方程组：解唯一。$ds/d\tau = 6\tau - 6\tau^2$在$\tau = \frac12$处取最大值$\frac32$，故$\dot s_{\max} = 3/(2T)$。$d^2s/d\tau^2 = 6 - 12\tau$是线性的，其绝对值在两端最大，为$\pm6$，给出$6/T^2$。
(b) 由$\tau = 0$处的条件得$a_0 = a_1 = a_2 = 0$，$\tau = 1$处的条件为$a_3 + a_4 + a_5 = 1$、$3a_3 + 4a_4 + 5a_5 = 0$、$6a_3 + 12a_4 + 20a_5 = 0$，其解为$(a_3, a_4, a_5) = (10, -15, 6)$（代入验证：$10 - 15 + 6 = 1$，$30 - 60 + 30 = 0$，$60 - 180 + 120 = 0$）。于是$ds/d\tau = 30\tau^2(1-\tau)^2$，在$\tau = \frac12$处取最大值$\frac{30}{16} = \frac{15}{8}$。其次，$d^2s/d\tau^2 = 60\tau - 180\tau^2 + 120\tau^3 = 60\tau(1-\tau)(1-2\tau)$；其极值点满足$d^3s/d\tau^3 = 60 - 360\tau + 360\tau^2 = 0$，即$\tau = \frac12 \mp \frac{\sqrt3}{6}$，此处$\tau(1-\tau) = \frac16$，$1 - 2\tau = \pm\frac{1}{\sqrt3}$，给出$\lvert d^2s/d\tau^2\rvert = 60\cdot\frac16\cdot\frac1{\sqrt3} = \frac{10}{\sqrt3}$。
:::

三次曲线在起点和终点处加速度有跳变——瞬间从零跳到$6/T^2$——这意味着无穷大的加加速度（jerk）以及电机转矩的突然阶跃，可能激起振动。五次曲线以零加速度起止，代价是峰值速度高出 25%（$15/8$对$3/2$）。五次曲线的峰值加速度（$5.77/T^2$）实际上**略低于**三次曲线的峰值加速度（$6/T^2$），因为三次曲线把加速度集中用在了最开始。

::: example 一个关节的三次与五次运动 {#ex-poly}
一个关节须在$T = 2.0\,\mathrm s$内从$20^\circ$运动到$80^\circ$，起止均为静止。分别给出三次和五次时间标度下的$q(t)$，以及各自的峰值速度和峰值加速度。
::: solution
$\Delta q = 60^\circ$，$q(t) = 20^\circ + 60^\circ\,s(t)$。
**三次：** $q(t) = 20 + 60(3\tau^2 - 2\tau^3)$，其中$\tau = t/2$，即$q(t) = 20 + 45t^2 - 15t^3$（单位为度、秒）。峰值速度$60\times\frac{3}{2\times2} = 45^\circ/\mathrm s$，出现在$t = 1\,\mathrm s$；峰值加速度$60\times\frac{6}{4} = 90^\circ/\mathrm s^2$，出现在$t = 0$以及（减速）$t = 2\,\mathrm s$。验算：$\dot q = 90t - 45t^2$，在$t = 1$处为$45^\circ/\mathrm s$ ✓；$\ddot q(0) = 90^\circ/\mathrm s^2$ ✓。
**五次：** $q(t) = 20 + 60(10\tau^3 - 15\tau^4 + 6\tau^5)$。峰值速度$60\times\frac{15}{8\times2} = 56.25^\circ/\mathrm s$；峰值加速度$60\times\frac{10}{\sqrt3\times4} = 86.60^\circ/\mathrm s^2$，出现在$t = 2(0.5 - 0.2887) = 0.423\,\mathrm s$，两端加速度为零。
以弧度计，三次曲线的峰值为$0.785\,\mathrm{rad/s}$和$1.571\,\mathrm{rad/s^2}$。用平均值作合理性检查：平均速度为$60/2 = 30^\circ/\mathrm s$，两种曲线的峰值都是平均值的 1.5–1.9 倍，光滑的钟形速度曲线正应如此。
:::
:::

::: widget plot
f: 3x^2 - 2x^3; 10x^3 - 15x^4 + 6x^5; 6x - 6x^2; 30x^2 - 60x^3 + 30x^4
x: 0, 1
y: 0, 2
labels: s\ \text{三次}; s\ \text{五次}; ds/d\tau\ \text{三次}; ds/d\tau\ \text{五次}
caption: 三次与五次时间标度的归一化位置$s$和速度$ds/d\tau$随归一化时间$\tau = t/T$的变化（速度乘以$\Delta q/T$即得实际单位）。两条位置曲线都从 0 变到 1，两条速度曲线都以零起止。五次曲线的速度起始段是平的——斜率为零，即加速度为零——而峰值更高（$1.875$对$1.5$）。看三次曲线速度在$\tau = 0$处的斜率：它等于 6，即加速度的瞬时阶跃。
:::

### 非零边界速度与路径点

较长的运动常常不停顿地经过若干中间**路径点**（via point）。在时长为$T$的一段上、端点速度规定为$v_0, v_f$的三次多项式为
$$
q(t) = q_0 + v_0t + a_2t^2 + a_3t^3,\qquad a_2 = \frac{3(q_f - q_0) - (2v_0 + v_f)T}{T^2},\qquad a_3 = \frac{-2(q_f - q_0) + (v_0 + v_f)T}{T^3},
$$ {#eq-cubic-velocities}
它完全按[[#prop-polynomials]]的方法由$q(T) = q_f$、$\dot q(T) = v_f$得到。把这样的三次多项式首尾相接，并在路径点处使速度相等，得到的轨迹速度连续，但加速度一般不连续。如果选取路径点速度使**加速度**也相等，就得到**三次样条**：对$N$段，$N-1$个内点处的加速度连续条件加上两个端点条件，通过一个三对角线性方程组确定全部路径点速度（[数学图谱中的插值](/learn/maths/lesson.php?c=numerical-analysis&l=interpolation)）。

::: example 经过一个路径点的固支三次样条 {#ex-spline}
一个关节须在$t = 0$时静止于$0^\circ$，在$t = 1\,\mathrm s$时经过$40^\circ$，并在$t = 3\,\mathrm s$时停在$30^\circ$。求加速度连续的三次样条。
::: solution
未知量：路径点速度$v_1$。A 段（$0\le t\le1$，$T_A = 1$）从$0^\circ$到$40^\circ$，端点速度为$0, v_1$；B 段（$T_B = 2$）从$40^\circ$到$30^\circ$，端点速度为$v_1, 0$。由[[#eq-cubic-velocities]]，A 段末端的加速度为$2a_2^A + 6a_3^AT_A$，B 段起点的加速度为$2a_2^B$：
$$
a_2^A = 120 - v_1,\quad a_3^A = -80 + v_1,\quad \ddot q_A(1) = 2(120 - v_1) + 6(-80 + v_1) = -240 + 4v_1,
$$
$$
a_2^B = \frac{3(-10) - 2v_1(2)}{4} = -7.5 - v_1,\qquad \ddot q_B(0) = -15 - 2v_1 .
$$
令二者相等：$-240 + 4v_1 = -15 - 2v_1$，故$v_1 = 37.5^\circ/\mathrm s$，路径点处的加速度为$-90^\circ/\mathrm s^2$。各段为
$$
q_A(t) = 82.5t^2 - 42.5t^3,\qquad q_B(t) = 40 + 37.5(t-1) - 45(t-1)^2 + 11.875(t-1)^3 .
$$
验算：$q_A(1) = 82.5 - 42.5 = 40$ ✓；$q_B(3) = 40 + 75 - 180 + 95 = 30$ ✓；$\dot q_B(3) = 37.5 - 180 + 142.5 = 0$ ✓。最大加速度为$t = 0$处的$165^\circ/\mathrm s^2$；轨迹在经过路径点后略微越过$40^\circ$（在$t = 1.53\,\mathrm s$处达到最大值$49.0^\circ$），然后才回落到$30^\circ$——样条以非零速度**穿过**路径点，因此可能出现超调。如果超调不可接受（比如关节限位在$45^\circ$），就必须改变路径点的时刻。
:::
:::

## 梯形速度曲线 {#sec-trapezoid}

多项式固定运动时长，峰值落在哪里就是哪里。工业控制器通常反其道而行之：给定限值$v_{\max}$和$a_{\max}$，尽可能快地运动。在这两个限制下的最短时间曲线是：以$a_{\max}$加速，以$v_{\max}$匀速运行，再以$a_{\max}$减速——即**梯形速度曲线**（由匀加速段和匀速段连接而成，也称带抛物线过渡的线性段）。

::: proposition 最短时间梯形运动 {#prop-trapezoid}
在$\lvert\dot q\rvert\le v_{\max}$和$\lvert\ddot q\rvert\le a_{\max}$的限制下，距离为$D > 0$的静止到静止运动至少需要
$$
T = \begin{cases}\dfrac{D}{v_{\max}} + \dfrac{v_{\max}}{a_{\max}}, & D \ge \dfrac{v_{\max}^2}{a_{\max}}\quad\text{（梯形）},\\[2ex] 2\sqrt{\dfrac{D}{a_{\max}}}, & D < \dfrac{v_{\max}^2}{a_{\max}}\quad\text{（三角形，峰值速度 } \sqrt{a_{\max}D}),\end{cases}
$$ {#eq-trapezoid}
并且这一下界由"加速—匀速—减速"（bang–coast–bang）曲线达到：以$a_{\max}$加速$t_a = v_{\max}/a_{\max}$，匀速运行，然后以$a_{\max}$减速（梯形）；或者以$a_{\max}$和$-a_{\max}$各运行$\sqrt{D/a_{\max}}$（三角形）。
:::

::: proof
**下界。** 设$v(t)\ge0$是任一满足$v(0) = v(T) = 0$的容许速度曲线。由于$\lvert\dot v\rvert\le a_{\max}$，有$v(t)\le a_{\max}t$（它不可能升得更快）以及$v(t)\le a_{\max}(T - t)$（它必须仍能停下来）；同时$v(t)\le v_{\max}$。因此$D = \int_0^Tv\,dt \le \int_0^T\min\{a_{\max}t,\ v_{\max},\ a_{\max}(T - t)\}\,dt$。右端是时长为$T$的梯形（或三角形）下的面积；它随$T$增大而增大，所以使其达到$D$的最小$T$就是运动时长的一个下界。
**计算下界。** 若$T \ge 2v_{\max}/a_{\max}$，则达到上限$v_{\max}$，面积为斜坡时长$t_a = v_{\max}/a_{\max}$的梯形面积：$v_{\max}(T - t_a)$。令其等于$D$得$T = D/v_{\max} + v_{\max}/a_{\max}$，它恰在$D \ge v_{\max}^2/a_{\max}$时满足$T \ge 2t_a$。否则面积为三角形面积$a_{\max}(T/2)^2$，当$T = 2\sqrt{D/a_{\max}}$时等于$D$，峰值为$a_{\max}T/2 = \sqrt{a_{\max}D}$（恰好在这种情况下小于$v_{\max}$）。
**可达性。** 等于该界的曲线$\min\{a_{\max}t, v_{\max}, a_{\max}(T - t)\}$本身就是容许的，所以下界可以达到。
:::

::: example 最快的关节运动与同步 {#ex-trapezoid}
一台机械臂的两个关节须分别转过$\Delta q_1 = 90^\circ$和$\Delta q_2 = 30^\circ$；两者均有$v_{\max} = 60^\circ/\mathrm s$和$a_{\max} = 120^\circ/\mathrm s^2$。求每个关节单独运动的最短时间，再求两者沿关节空间直线同时起止的同步运动。
::: solution
临界距离为$v_{\max}^2/a_{\max} = 3600/120 = 30^\circ$，$t_a = 60/120 = 0.5\,\mathrm s$。
**关节 1：** $90^\circ \ge 30^\circ$，为梯形：$T_1 = 90/60 + 0.5 = 2.0\,\mathrm s$，其中加速$0.5\,\mathrm s$（走过$\frac12\times120\times0.5^2 = 15^\circ$），匀速$1.0\,\mathrm s$（$60^\circ$），减速$0.5\,\mathrm s$（$15^\circ$）：$15 + 60 + 15 = 90^\circ$ ✓。
**关节 2：** 恰好处于临界值，因此匀速段长度为零：$T_2 = 30/60 + 0.5 = 1.0\,\mathrm s = 2\sqrt{30/120}$ ✓（两个公式在分界处一致）。
**同步：** 较慢的关节决定运动时长，$T = 2.0\,\mathrm s$。关节 2 采用与关节 1 相同的归一化曲线$s(t)$，并按$30/90 = \frac13$缩放：它以$40^\circ/\mathrm s^2$加速到$20^\circ/\mathrm s$，匀速运行，再减速——完全在其限值之内。于是工具沿关节空间直线运动，两台电机采用同一时间规律，这简化了监控，并使路径与速度倍率无关。
:::
:::

::: widget plot
f: max(0, if(D >= vm^2/a, min(a*x, vm, a*(D/vm + vm/a - x)), min(a*x, a*(2*sqrt(D/a) - x))))
x: 0, 4
y: 0, 2
sliders: D=1.5:0.1:4:0.05; vm=1:0.2:2:0.05; a=2:0.5:6:0.1
labels: \dot q(t)\ \text{(rad/s)}
caption: 在限值$v_{\max}$和$a_{\max}$下、距离为$D$弧度的静止到静止运动的最短时间速度曲线（横轴为时间，单位为秒）。曲线下的面积始终为$D$。把$D$减小到$v_{\max}^2/a_{\max}$以下，匀速段就消失：梯形变成三角形，其峰值不再达到$v_{\max}$。提高$a_{\max}$对短距离运动帮助很大，对长距离运动帮助很小——长距离运动的时长主要由$D/v_{\max}$决定。
:::

梯形曲线在四个时刻加速度不连续（加加速度无穷大）。高速或对振动敏感的机器的控制器把每个拐角换成恒定加加速度的斜坡，得到带附加加加速度限值$j_{\max}$的七段式**S 形曲线**；[[#prop-trapezoid]]的最短时间推理可以直接推广，代价是情形更多。

::: warning 光滑的关节轨迹仍可能超出限值
按时长选定的时间标度（多项式）对限值一无所知：把$T$减半，三次曲线的峰值速度加倍，峰值加速度变为四倍（$\propto 1/T^2$）。务必为**每一个**关节计算峰值——$\Delta q\cdot\dot s_{\max}$和$\Delta q\cdot\ddot s_{\max}$——并延长$T$，直到限制最严的关节得到满足。经过路径点的样条还可能在节点之间超调（[[#ex-spline]]），从而越过每个节点都满足的关节限位。最后，速度和加速度限值只是真实限值——电机转矩——的替代量，而电机转矩通过[[robotics/manipulator-dynamics]]中的动力学依赖于位形和速度。
:::

## 笛卡儿路径 {#sec-cartesian}

关节空间轨迹计算量小，并且在两个可达位形之间总是可行的，但工具走的是一条难以预料的曲线（见[[robotics/forward-kinematics]]中的图）。焊接、涂胶、插轴入孔或在障碍物附近运动时，需要工具本身沿规定的路径运动——通常是一条姿态平滑变化的直线。

::: definition 姿态采用 slerp 的笛卡儿直线路径 {#def-cartesian}
在位姿$(R_0, \mathbf p_0)$与$(R_1, \mathbf p_1)$之间，**直线路径**为
$$
\mathbf p(s) = \mathbf p_0 + s(\mathbf p_1 - \mathbf p_0),\qquad
R(s) = R_0\,\exp\!\big(\log(R_0^{\mathsf T}R_1)\,s\big),\qquad s\in[0,1],
$$
其中$\log(R_0^{\mathsf T}R_1) = [\hat{\boldsymbol\omega}]\theta$是相对转动的轴-角表示（[[robotics/rigid-motions]]）。用单位四元数表示，同一条姿态路径就是**球面线性插值**（slerp）：
$$
q(s) = \frac{\sin\big((1-s)\Omega\big)}{\sin\Omega}\,q_0 + \frac{\sin(s\Omega)}{\sin\Omega}\,q_1,\qquad \cos\Omega = q_0\cdot q_1 > 0 .
$$ {#eq-slerp}
:::

::: proposition slerp 以匀速绕固定轴转动 {#prop-slerp}
沿$R(s) = R_0\exp([\hat{\boldsymbol\omega}]\theta s)$，物体坐标系中的角速度方向不变，$\boldsymbol\omega_b = \hat{\boldsymbol\omega}\,\theta\,\dot s$；配上时间标度$s(t)$，工具绕固定的（物体）轴$\hat{\boldsymbol\omega}$转过总角度$\theta$，时间规律与位置相同。四元数公式[[#eq-slerp]]表示的是同一组转动，其中$\Omega = \theta/2$。
:::

::: proof
$R^{\mathsf T}\dot R = \exp(-[\hat{\boldsymbol\omega}]\theta s)R_0^{\mathsf T}R_0\exp([\hat{\boldsymbol\omega}]\theta s)[\hat{\boldsymbol\omega}]\theta\dot s = [\hat{\boldsymbol\omega}]\theta\dot s$，因为矩阵与它自身的指数可交换；由[[robotics/rigid-motions]]，这就是$[\boldsymbol\omega_b]$。对于四元数形式，设$p = q_0^*\otimes q_1 = (\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$为$R_0^{\mathsf T}R_1$的四元数（取符号使$\cos\frac\theta2 > 0$）。转动$R_0\,\mathrm{Rot}(\hat{\boldsymbol\omega}, s\theta)$的四元数为$q_0\otimes(\cos\frac{s\theta}2, \sin\frac{s\theta}2\hat{\boldsymbol\omega})$。而$q_0\cdot q_1 = q_0^*\otimes q_1$的标量部分$= \cos\frac\theta2$，故$\Omega = \theta/2$。写出$(\cos s\Omega, \sin s\Omega\,\hat{\boldsymbol\omega}) = \frac{\sin((1-s)\Omega)}{\sin\Omega}(1, \mathbf 0) + \frac{\sin(s\Omega)}{\sin\Omega}(\cos\Omega, \sin\Omega\,\hat{\boldsymbol\omega})$——标量部分由恒等式$\sin((1-s)\Omega) + \sin(s\Omega)\cos\Omega = \cos(s\Omega)\sin\Omega$相等，矢量部分显然相等。左乘$q_0$（一个线性运算）把$(1,\mathbf 0)$变为$q_0$，把$p$变为$q_1$，即得[[#eq-slerp]]。
:::

::: example 2R 机械臂的直线运动 {#ex-line}
2R 机械臂（$L_1 = 0.6$，$L_2 = 0.5\,\mathrm m$，取肘部向上的解）须把末端从$(0.9, -0.3)$移到$(0.3, 0.9)\,\mathrm m$。比较笛卡儿直线与关节空间直线。
::: solution
两端的逆运动学（[[robotics/inverse-kinematics]]）：$\mathbf q_0 = (-45.9^\circ, 61.1^\circ)$，$\mathbf q_1 = (44.1^\circ, 61.1^\circ)$——两点到基座的距离都是$0.949\,\mathrm m$，所以肘关节角相同。
**关节空间直线：** 肘关节保持在$61.1^\circ$，只有肩关节转动，因此末端绕基座沿半径$0.949\,\mathrm m$的**圆弧**运动。在$s = 0.5$处，$\mathbf q = (-0.9^\circ, 61.1^\circ)$，末端位于$(0.849, 0.424)\,\mathrm m$。
**笛卡儿直线：** 在$s = 0.5$处末端必须位于$(0.6, 0.3)\,\mathrm m$，距基座$0.671\,\mathrm m$，需要$\mathbf q = (-19.4^\circ, 105.5^\circ)$。沿直线：

| $s$ | 末端（m） | $q_1$ | $q_2$ |
|---|---|---|---|
| 0 | $(0.90, -0.30)$ | $-45.9^\circ$ | $61.1^\circ$ |
| 0.25 | $(0.75, 0.00)$ | $-41.6^\circ$ | $94.5^\circ$ |
| 0.5 | $(0.60, 0.30)$ | $-19.4^\circ$ | $105.5^\circ$ |
| 0.75 | $(0.45, 0.60)$ | $11.5^\circ$ | $94.5^\circ$ |
| 1 | $(0.30, 0.90)$ | $44.1^\circ$ | $61.1^\circ$ |

两条路径的中点相距$\lVert(0.849 - 0.6,\ 0.424 - 0.3)\rVert = 0.28\,\mathrm m$。笛卡儿直线使肘关节先折起$44^\circ$再张开，而肩关节的运动并不均匀：在直线的中间一半（$s$从 0.25 到 0.75）它转过$53^\circ$，而在两端的两个四分之一段合计只转过$37^\circ$。因此对于恒定的工具速度，关节速度沿路径变化，规划器必须用[[#eq-chain]]在许多点上检查它们，而不仅仅是在两端。
:::
:::

::: example 用 slerp 求中间姿态 {#ex-slerp}
工具须从$R_0 = I$转到四元数为$q_1 = (\frac12, \frac12, \frac12, \frac12)$的$R_1$（即[[robotics/rigid-motions]]中绕$(1,1,1)/\sqrt3$转$120^\circ$的转动）。分别用 slerp 和对四元数分量直接线性插值求中间姿态。
::: solution
$q_0 = (1, 0, 0, 0)$，$\cos\Omega = q_0\cdot q_1 = \frac12$，$\Omega = 60^\circ$，$\sin\Omega = 0.8660$。在$s = \frac12$处，两个权重都是$\sin30^\circ/\sin60^\circ = 0.5774$：
$$
q(\tfrac12) = 0.5774\big((1,0,0,0) + (\tfrac12,\tfrac12,\tfrac12,\tfrac12)\big) = (0.8660,\ 0.2887,\ 0.2887,\ 0.2887),
$$
这是一个单位四元数，$\cos\frac\theta2 = 0.8660$，即绕$(1,1,1)/\sqrt3$转$\theta = 60^\circ$：恰好是总转动的一半，且绕同一根轴 ✓。直接线性插值给出$\frac12(q_0 + q_1) = (0.75, 0.25, 0.25, 0.25)$，其模为$0.866$——在重新归一化之前它不表示转动；归一化之后，它在这里恰好与 slerp 结果重合（因为$s = \frac12$处的对称性），但在其他$s$处，归一化线性插值沿同一段圆弧以不均匀的速率运动（中间快、两端慢），而对欧拉角插值则会沿一条完全不同的弯曲路径运动。
:::
:::

### 关节空间还是任务空间？

| | 关节空间轨迹 | 笛卡儿轨迹 |
|---|---|---|
| 工具路径 | 曲线，取决于几何结构 | 规定的（直线、圆弧） |
| 计算 | 对关节插值 | 每个控制周期都要求逆运动学 |
| 奇异位形 | 没有问题 | 在其附近关节速度急剧增大 |
| 关节限位 | 在两端检查 | 必须沿路径检查 |
| 工作空间 | 在可达点之间总是可行 | 直线可能离开工作空间 |
| 逆运动学解支 | 由两端位形确定 | 必须保持在同一解支上 |

笛卡儿路径继承了逆运动学的所有困难。如果直线经过奇异位形附近，对固定的工具速度，$\dot{\mathbf q} = J^{-1}\dot{\mathbf x}$会变得极大（[[robotics/jacobians]]）；如果它离开环形工作空间或越过关节限位，就不可行；如果起点和终点位于不同的逆运动学解支，那么不经过奇异位形就不存在连续的笛卡儿路径。工业控制器两者都提供——用于自由运动的"PTP"关节运动，以及用于工艺路径的"LIN"/"CIRC"笛卡儿运动——并且在笛卡儿运动接近奇异位形时报错停止。

::: remark 沿给定路径的时间最优时间规律
对固定路径$\mathbf q(s)$，机器人动力学$M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \boldsymbol\tau$结合[[#eq-chain]]，对每个关节变为$a_i(s)\ddot s + b_i(s)\dot s^2 + c_i(s) = \tau_i$。于是转矩限值把$\ddot s$限制在一个依赖于$(s, \dot s)$的区间内，最快的时间规律可以在$(s, \dot s)$相平面中求得：从起点以最大加速度向前积分，从终点以最大减速度向后积分，在两条曲线相交处切换（Bobrow、Dubowsky 和 Gibson 的方法，以及 Shin 和 McKay 的方法，1985 年）。当负载较轻时，它给出的运动比固定速度和加速度限值下的运动快得多。
:::

::: quiz
一个关节按三次时间标度运动，$\Delta q = 1\,\mathrm{rad}$。运动时长从$2\,\mathrm s$缩短到$1\,\mathrm s$。峰值速度和峰值加速度分别变为原来的多少倍？
- [ ] 都变为 2 倍
- [x] 速度变为 2 倍，加速度变为 4 倍
- [ ] 速度变为 4 倍，加速度变为 2 倍
- [ ] 都变为 4 倍
::: solution
由[[#prop-polynomials]]，$\dot q_{\max} = \frac32\Delta q/T$，$\ddot q_{\max} = 6\Delta q/T^2$：$T$减半使前者加倍、后者变为四倍。由于惯性力矩与加速度成正比，"快一倍"的运动需要四倍的惯性力矩。
:::
:::

::: history
关节空间轨迹和工具的笛卡儿运动是保罗（Richard Paul）1981 年的著作《机器人操作臂：数学、编程与控制》（*Robot Manipulators: Mathematics, Programming, and Control*）的核心主题之一，该书汇集了为最早的计算机控制机械臂发展起来的方法。肖梅克（Ken Shoemake）于 1985 年把四元数 slerp 引入计算机图形学。在转矩限制下沿给定路径的时间最优时间规律问题，由 Bobrow、Dubowsky 和 Gibson 以及 Shin 和 McKay 各自独立解决，两项成果均发表于 1985 年；Flash 和霍根（Hogan）1985 年对人类手臂运动的研究表明，人的伸手动作非常接近最小加加速度（五次）曲线。
:::

::: summary
- 轨迹是路径$\boldsymbol\theta(s)$与时间标度$s(t)$的复合；对关节空间直线，每个关节都按$\Delta\theta_i\,s(t)$运动，因此所有关节同时起止。
- 三次曲线$3\tau^2 - 2\tau^3$：$\dot s_{\max} = 1.5/T$，$\ddot s_{\max} = 6/T^2$，两端加速度有跳变。五次曲线$10\tau^3 - 15\tau^4 + 6\tau^5$：$\dot s_{\max} = 1.875/T$，$\ddot s_{\max} = 5.77/T^2$，两端加速度为零。
- 路径点：采用规定边界速度的三次多项式；三次样条选取这些速度以使加速度连续（且可能超调）。
- 梯形曲线是$v_{\max}$、$a_{\max}$限制下的最短时间曲线：若$D \ge v_{\max}^2/a_{\max}$，则$T = D/v_{\max} + v_{\max}/a_{\max}$，否则$T = 2\sqrt{D/a_{\max}}$。按最慢关节的曲线缩放可使各关节同步。
- 姿态采用 slerp 的笛卡儿直线以$s(t)$确定的速率绕固定轴转动；它们需要沿路径求逆运动学，在奇异位形附近、工作空间之外或跨越逆运动学解支时失效。
- 检查每个关节的峰值速度、加速度和转矩；它们分别按$1/T$和$1/T^2$变化。
:::

## 习题

::: exercise 三次曲线的峰值速度 {#exr-cubic level=1 check="45"}
一个关节以三次时间标度在$1.5\,\mathrm s$内从静止到静止转过$45^\circ$。它的峰值速度是多少？（以度每秒为单位输入。）
::: solution
$\dot q_{\max} = \frac32\Delta q/T = 1.5\times45/1.5 = 45^\circ/\mathrm s$，在$t = 0.75\,\mathrm s$时达到；峰值加速度为$6\times45/1.5^2 = 120^\circ/\mathrm s^2$。
:::
:::

::: exercise 梯形运动的时长 {#exr-trap level=1 check="1.7"}
一个关节须在$v_{\max} = 1.0\,\mathrm{rad/s}$、$a_{\max} = 2.0\,\mathrm{rad/s^2}$的限制下转过$1.2\,\mathrm{rad}$。最短时长是多少？（以 s 为单位输入$T$。）
::: solution
$v_{\max}^2/a_{\max} = 0.5\,\mathrm{rad} < 1.2\,\mathrm{rad}$：为梯形。$T = 1.2/1.0 + 1.0/2.0 = 1.7\,\mathrm s$（加速 0.5 s，走过$0.25\,\mathrm{rad}$；匀速 0.7 s，走过$0.7\,\mathrm{rad}$；减速 0.5 s，走过$0.25\,\mathrm{rad}$；共$1.2\,\mathrm{rad}$ ✓）。
:::
:::

::: exercise 短距离运动 {#exr-short level=1 check="0.6325"}
同一个关节只须转过$0.2\,\mathrm{rad}$。最短时长是多少？达到的峰值速度是多少？（以 s 为单位输入$T$，保留四位小数。）
::: solution
$0.2 < 0.5\,\mathrm{rad}$：为三角形。$T = 2\sqrt{0.2/2.0} = 2\sqrt{0.1} = 0.6325\,\mathrm s$，峰值速度$\sqrt{2.0\times0.2} = 0.632\,\mathrm{rad/s}$，低于$v_{\max}$。盲目套用梯形公式会得到$0.2 + 0.5 = 0.7\,\mathrm s$——比必要的时间长。
:::
:::

::: exercise 五次曲线的峰值加速度 {#exr-quintic level=2 check="86.60"}
对[[#ex-poly]]中的五次运动（$2\,\mathrm s$内转过$60^\circ$），通过计算$t = 2(\frac12 - \frac{\sqrt3}{6})\,\mathrm s$处的$\ddot q$来验证峰值加速度。（以度每二次方秒为单位输入，保留两位小数。）
::: solution
$\tau = 0.5 - 0.2887 = 0.2113$：$d^2s/d\tau^2 = 60\tau(1-\tau)(1-2\tau) = 60\times0.2113\times0.7887\times0.5774 = 5.774$。于是$\ddot q = \Delta q\,(d^2s/d\tau^2)/T^2 = 60\times5.774/4 = 86.60^\circ/\mathrm s^2$，等于$60\times10/(\sqrt3\times4)$ ✓。
:::
:::

::: exercise 两个关节的同步 {#exr-sync level=2 check="0.8"}
关节 1 须转过$1.0\,\mathrm{rad}$，关节 2 须转过$1.5\,\mathrm{rad}$；两者均有$v_{\max} = 1.2\,\mathrm{rad/s}$和$a_{\max} = 3.0\,\mathrm{rad/s^2}$。求每个关节的最短时间、同步运动的时长，以及同步运动中关节 1 的匀速段速度。（以 rad/s 为单位输入关节 1 的匀速段速度。）
::: solution
临界值$1.44/3.0 = 0.48\,\mathrm{rad}$；两者都是梯形。$T_1 = 1.0/1.2 + 0.4 = 1.233\,\mathrm s$；$T_2 = 1.5/1.2 + 0.4 = 1.65\,\mathrm s$。同步时长$T = 1.65\,\mathrm s$，关节 2 采用自身的最短时间曲线，关节 1 采用按$1.0/1.5$缩放的同一归一化曲线：匀速段速度$1.2\times\frac23 = 0.8\,\mathrm{rad/s}$，加速度$2.0\,\mathrm{rad/s^2}$，均在限值之内。
:::
:::

::: exercise 带末端速度的三次多项式 {#exr-endvel level=2 check="0.5"}
一段运动须在$T = 2\,\mathrm s$内从静止于$q_0 = 0$运动到$q_f = 1.0\,\mathrm{rad}$，到达时速度为$v_f = 0.5\,\mathrm{rad/s}$。求三次多项式的系数并检验端点条件。（以$\mathrm{rad/s^2}$为单位输入$a_2$。）
::: solution
由[[#eq-cubic-velocities]]：$a_2 = (3\times1.0 - (0 + 0.5)\times2)/4 = 0.5\,\mathrm{rad/s^2}$，$a_3 = (-2\times1.0 + 0.5\times2)/8 = -0.125\,\mathrm{rad/s^3}$。验算：$q(2) = 0.5\times4 - 0.125\times8 = 2 - 1 = 1.0$ ✓；$\dot q(2) = 2\times0.5\times2 - 3\times0.125\times4 = 2 - 1.5 = 0.5$ ✓。
:::
:::

::: exercise 最小加加速度运动 {#exr-minjerk level=3}
证明：在满足$s(0) = 0$、$s(1) = 1$且两端$s' = s'' = 0$的光滑函数中，五次多项式$s(\tau) = 10\tau^3 - 15\tau^4 + 6\tau^5$使加加速度平方的积分$\int_0^1(s''')^2\,d\tau$最小。（提示：$\int F(s''')\,d\tau$的欧拉-拉格朗日方程为$\frac{d^3}{d\tau^3}\frac{\partial F}{\partial s'''} = 0$。）偏好小加加速度的物理原因是什么？
::: solution
取$F = (s''')^2$，有$\partial F/\partial s''' = 2s'''$，欧拉-拉格朗日方程（对一阶变分分部积分三次得到；由于变分及其前两阶导数在两端为零，边界项消失）为$s^{(6)} = 0$：$s$是次数不超过 5 的多项式。六个边界条件确定其六个系数，而[[#prop-polynomials]]中的五次多项式满足这些条件，所以它就是极小化函数（该泛函是凸的，故驻点即最小点）。从物理上说，加加速度是加速度的变化率，因而也是惯性力的变化率：突变会激起连杆、减速器和负载中阻尼很小的振动模态（还会使液体洒出）。加加速度有界的曲线，如五次曲线或 S 形曲线，即使名义时长相同，也能让柔性机械臂在目标处更快地稳定下来。
:::
:::

::: exercise 规划一个取放循环 {#exr-design level=3}
一台 SCARA 机械臂须在相距$0.5\,\mathrm m$的两个工位之间搬运零件，每分钟 60 次，每个$1\,\mathrm s$的循环包括一次运动、一次$0.15\,\mathrm s$的手爪动作、返回运动和另一次$0.15\,\mathrm s$的手爪动作。工具的直线速度限制为$2\,\mathrm{m/s}$，加速度限制为$10\,\mathrm{m/s^2}$；零件易损，机械臂的一阶振动模态约为$15\,\mathrm{Hz}$。(a) 在直线上采用梯形曲线，这个循环是否可行？(b) 讨论你会采用笛卡儿直线还是关节运动，会采用梯形曲线、S 形曲线还是五次曲线，并说明理由。
::: solution
(a) 每次运动可用的时间为$T = (1 - 0.3)/2 = 0.35\,\mathrm s$。临界值$v^2/a = 4/10 = 0.4\,\mathrm m < 0.5\,\mathrm m$：为梯形，最短$T = 0.5/2 + 2/10 = 0.45\,\mathrm s$——**不**可行。可选方案：提高加速度限值（取$a = 20\,\mathrm{m/s^2}$时，临界值为$0.2\,\mathrm m$，$T = 0.25 + 0.1 = 0.35\,\mathrm s$，刚好可行），缩短手爪动作时间，或让手爪动作与运动的末段重叠。
(b) 工位之间的自由运动不需要走直线：关节空间运动通常更快（每个关节使用自身的限值，运行时无须求逆运动学，没有奇异位形风险），除非障碍物或零件的姿态要求规定的路径；每个工位处的竖直接近和离开则可以是很短的笛卡儿运动。对于$15\,\mathrm{Hz}$的模态（周期$67\,\mathrm{ms}$），梯形曲线中加速度的突变会激起残余振动，必须等它衰减后手爪才能动作；采用加加速度受限、斜坡时长约为一个周期（$\approx 70\,\mathrm{ms}$）的 S 形曲线或采用五次曲线，在运动中会多花一点时间，却节省了稳定时间——对易损零件而言通常是净收益。任何选择都必须利用动力学对照电机转矩限值进行校核，因为在$20\,\mathrm{m/s^2}$下惯性载荷起主导作用。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 的教材以及 Siciliano 等人的教材都论述了关节空间和操作空间中的多项式轨迹、样条轨迹和梯形轨迹；Lynch 与 Park 的教材讲述了时间标度、在$(s,\dot s)$平面中沿路径的时间最优时间规律，以及指数坐标下的 slerp。
