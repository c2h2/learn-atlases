每一次飞往空间站的载人和货运飞行都以交会结束：一个在数小时或数天前发射的航天器，必须在同一时刻、以几乎为零的相对速度到达同一条轨道上的同一点。调相机动（[[orbital-mechanics/orbital-manoeuvres]]）把追踪航天器带到几十千米以内。最终逼近则是另一类问题：重要的不再是每条轨道的形状，而是从目标看去两条相邻轨道之间微小的*差别*。从这个角度看，轨道力学变得很奇特。朝目标点火的追踪航天器会远离目标；在目标正下方一百米处静止不动的航天器，一圈之后会跑到目标前方几千米；要向前移动，就得向下推。所有这些都来自一组线性方程——**克洛希西-威尔特希尔**（Clohessy–Wiltshire）方程（或**希尔**（Hill）方程）——本章推导这组方程，求出其封闭形式的解，并用它来设计逼近轨迹、双脉冲交会转移和编队飞行轨道。最后，我们把线性理论与精确的二体运动相比较，看看它何时可信。

所用的工具是[[dynamics/relative-motion]]中的转动坐标系运动学以及常系数线性常微分方程（[线性方程组](/learn/maths/lesson.php?c=ode&l=linear-systems)）。

## 目标坐标系 {#sec-frame}

::: definition 当地垂线-当地水平坐标系 {#def-lvlh}
设**目标**在半径为$r_0$的圆轨道上运动，平均角速度$n = \sqrt{\mu/r_0^3}$。**当地垂线-当地水平**坐标系（LVLH 坐标系，或**希尔**坐标系）的原点在目标上，并以角速度$\boldsymbol{\Omega} = n\,\hat{\mathbf{k}}$随目标转动：

- $\hat{\mathbf{i}}$**沿径向向外**（背离地心），即 **R-bar** 方向；
- $\hat{\mathbf{j}}$**沿迹**，指向目标速度方向，即 **V-bar** 方向；
- $\hat{\mathbf{k}} = \hat{\mathbf{i}}\times\hat{\mathbf{j}}$沿轨道法向（目标的角动量方向），即 **H-bar** 方向。

追踪航天器相对于目标的位置为$\delta\mathbf{r} = x\,\hat{\mathbf{i}} + y\,\hat{\mathbf{j}} + z\,\hat{\mathbf{k}}$：$x$为径向（在目标上方为正），$y$为沿迹（在前方为正），$z$为横向（垂直于轨道面）。
:::

不同机构对这些坐标轴的排序和正负规定各不相同——例如国际空间站运行中采用的约定是$x$沿迹、$z$指向*下方*。每次阅读交会文件都要核对约定；物理是一样的，但方程中的符号不同。

## 克洛希西-威尔特希尔方程 {#sec-cw}

::: theorem 克洛希西-威尔特希尔方程 {#thm-cw}
若目标轨道为圆轨道，两个物体都只在同一中心天体的平方反比引力作用下运动，且间距远小于$r_0$，则在$\delta r/r_0$的一阶近似下，LVLH 坐标系中的相对运动满足
$$
\begin{aligned}
\ddot x - 3n^2x - 2n\dot y &= a_x,\\
\ddot y + 2n\dot x &= a_y,\\
\ddot z + n^2 z &= a_z,
\end{aligned}
$$ {#eq-cw}
其中$(a_x, a_y, a_z)$是追踪航天器的推力加速度（自由运动时为零）。
:::

::: proof
**惯性相对加速度。**设$\mathbf{r}_0$为目标的位置，$\mathbf{r} = \mathbf{r}_0 + \delta\mathbf{r}$为追踪航天器的位置。则
$$
\delta\ddot{\mathbf{r}}\big|_\text{惯性} = -\frac{\mu\,(\mathbf{r}_0 + \delta\mathbf{r})}{\lVert\mathbf{r}_0 + \delta\mathbf{r}\rVert^3} + \frac{\mu\,\mathbf{r}_0}{r_0^3} + \mathbf{a}.
$$
**线性化。**$\lVert\mathbf{r}_0 + \delta\mathbf{r}\rVert^{-3} = (r_0^2 + 2\mathbf{r}_0\cdot\delta\mathbf{r} + \delta r^2)^{-3/2} = r_0^{-3}\left(1 - 3\,\mathbf{r}_0\cdot\delta\mathbf{r}/r_0^2 + O(\delta r^2/r_0^2)\right)$。保留一阶项，
$$
\delta\ddot{\mathbf{r}}\big|_\text{惯性} = -\frac{\mu}{r_0^3}\left(\delta\mathbf{r} - \frac{3\,(\mathbf{r}_0\cdot\delta\mathbf{r})}{r_0^2}\,\mathbf{r}_0\right) + \mathbf{a} = -n^2\left(\delta\mathbf{r} - 3x\,\hat{\mathbf{i}}\right) + \mathbf{a},
$$
因为$\mathbf{r}_0 = r_0\hat{\mathbf{i}}$，$\mathbf{r}_0\cdot\delta\mathbf{r} = r_0 x$。写成分量：$(2n^2x,\ -n^2y,\ -n^2z) + \mathbf{a}$。这就是**重力梯度**：沿径向向外偏移的物体所受的回拉力小于跟上目标所需的力，而沿迹或横向偏移的物体则被拉回目标轨道。

**转动坐标系。**LVLH 坐标系以恒定角速度$\boldsymbol{\Omega} = n\hat{\mathbf{k}}$转动，所以（由[[dynamics/relative-motion]]）
$$
\delta\ddot{\mathbf{r}}\big|_\text{惯性} = \delta\ddot{\mathbf{r}}\big|_\text{转动} + 2\boldsymbol{\Omega}\times\delta\dot{\mathbf{r}}\big|_\text{转动} + \boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\delta\mathbf{r}),
$$
由于目标轨道是圆的，没有$\dot{\boldsymbol{\Omega}}$项。这里$2\boldsymbol{\Omega}\times\delta\dot{\mathbf{r}} = 2n(-\dot y,\ \dot x,\ 0)$，$\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\delta\mathbf{r}) = -n^2(x,\ y,\ 0)$。令惯性加速度的两个表达式逐分量相等：$x$：$\ddot x - 2n\dot y - n^2x = 2n^2x + a_x$，即$\ddot x - 2n\dot y - 3n^2x = a_x$；$y$：$\ddot y + 2n\dot x - n^2y = -n^2y + a_y$，即$\ddot y + 2n\dot x = a_y$；$z$：$\ddot z = -n^2z + a_z$。这就是[[#eq-cw]]。所用假设为：二体引力（无阻力，无扁率），目标轨道为圆轨道，以及$\delta r \ll r_0$使二阶项可以忽略。
:::

平面内的方程通过**科氏项**$2n\dot y$和$2n\dot x$相互耦合；横向运动是以轨道频率进行的简谐振动，因为小的横向偏移只不过是一个略有不同的轨道平面，每圈与目标轨道平面相交两次。

## 封闭形式的解 {#sec-solution}

方程[[#eq-cw]]是常系数线性方程，可以精确求解（[二阶线性常微分方程](/learn/maths/lesson.php?c=ode&l=second-order-linear)）。

::: proposition 克洛希西-威尔特希尔方程的解 {#prop-cw-solution}
对于$t = 0$时从$(x_0, y_0, z_0)$出发、速度为$(\dot x_0, \dot y_0, \dot z_0)$的自由运动，记$c = \cos nt$，$s = \sin nt$，
$$
\begin{aligned}
x(t) &= (4 - 3c)\,x_0 + \frac{s}{n}\,\dot x_0 + \frac{2}{n}(1 - c)\,\dot y_0,\\
y(t) &= 6(s - nt)\,x_0 + y_0 - \frac{2}{n}(1 - c)\,\dot x_0 + \frac{1}{n}(4s - 3nt)\,\dot y_0,\\
z(t) &= c\,z_0 + \frac{s}{n}\,\dot z_0,
\end{aligned}
$$ {#eq-cw-solution}
速度为
$$
\begin{aligned}
\dot x(t) &= 3ns\,x_0 + c\,\dot x_0 + 2s\,\dot y_0,\\
\dot y(t) &= -6n(1 - c)\,x_0 - 2s\,\dot x_0 + (4c - 3)\,\dot y_0,\\
\dot z(t) &= -ns\,z_0 + c\,\dot z_0.
\end{aligned}
$$
写成矩阵形式，$\begin{bmatrix}\delta\mathbf{r}\\ \delta\mathbf{v}\end{bmatrix}(t) = \begin{bmatrix}\boldsymbol{\Phi}_{rr} & \boldsymbol{\Phi}_{rv}\\ \boldsymbol{\Phi}_{vr} & \boldsymbol{\Phi}_{vv}\end{bmatrix}\begin{bmatrix}\delta\mathbf{r}_0\\ \delta\mathbf{v}_0\end{bmatrix}$，其中各$3\times3$分块由上面的系数读出：这就是相对运动的**状态转移矩阵**。
:::

::: proof
把$y$方程积分一次：$\dot y + 2nx = \dot y_0 + 2nx_0 \equiv C$，为常数。把$\dot y = C - 2nx$代入$x$方程：$\ddot x - 3n^2x - 2n(C - 2nx) = 0$，即$\ddot x + n^2x = 2nC$。其通解为$x = 2C/n + A\cos nt + B\sin nt$。由初始条件得$A = x_0 - 2C/n$，$B = \dot x_0/n$；代入$C = \dot y_0 + 2nx_0$，$A = -3x_0 - 2\dot y_0/n$，且
$$
x = 4x_0 + \frac{2\dot y_0}{n} - \left(3x_0 + \frac{2\dot y_0}{n}\right)c + \frac{\dot x_0}{n}s,
$$
这就是所给的$x(t)$。然后$\dot y = C - 2nx$积分得$y = y_0 + Ct - 2n\int_0^t x\,\mathrm{d}t'$；对$x$的三项分别积分并整理，即得所给的$y(t)$。$z$方程是一个谐振子。速度是对时间的导数。每个公式都可以通过代入[[#eq-cw]]并令$t = 0$来检验。
:::

$y$的解包含随时间线性增长的项。把它们合并，$y_\text{长期} = -3t\,(\dot y_0 + 2nx_0)$：除非
$$
\dot y_0 = -2n\,x_0,
$$ {#eq-no-drift}
否则追踪航天器沿迹稳定漂移，每圈漂移$-6\pi(\dot y_0 + 2nx_0)/n$。其物理意义是：$\dot y_0 + 2nx_0$度量了追踪航天器与目标的轨道能量（半长轴）之差，而大小不同的轨道周期不同。当[[#eq-no-drift]]成立时，周期相等，运动是周期性的。

::: example 在下方一百米处静止 {#ex-below}
一个空间站位于$400\ \mathrm{km}$高度的圆轨道上（$n = 1.1314\times10^{-3}\ \mathrm{rad/s}$，$T = 5553\ \mathrm{s}$）。$t = 0$时追踪航天器位于其正下方$100\ \mathrm{m}$，相对于 LVLH 坐标系速度为零。描述它在一圈内的运动。
::: solution
$x_0 = -100\ \mathrm{m}$，其余均为零。由[[#eq-cw-solution]]：
$$
x(t) = -100\,(4 - 3\cos nt)\ \mathrm{m}, \qquad y(t) = -600\,(\sin nt - nt)\ \mathrm{m}.
$$
在径向上，追踪航天器在$-100\ \mathrm{m}$（$t = 0$和$t = T$时）与$-700\ \mathrm{m}$（$t = T/2$时）之间振荡。在沿迹方向上，它稳定地向前移动；一圈之后（$nt = 2\pi$）
$$
y(T) = 600 \times 2\pi = 1200\pi = 3770\ \mathrm{m}.
$$
**校核：**无漂移条件[[#eq-no-drift]]要求$\dot y_0 = -2n x_0 = +0.226\ \mathrm{m/s}$；追踪航天器的$\dot y_0$为零，因此它以每圈$-6\pi(0 + 2n x_0)/n = 12\pi \times 100\ \mathrm{m} = 3.77\ \mathrm{km}$的速率向*前*漂移——较低的轨道更快。从物理上看，在下方$100\ \mathrm{m}$处相对速度为零，意味着惯性速度为$n(r_0 - 0.1\ \mathrm{km})$，略小于当地圆轨道速度，因此追踪航天器位于一个椭圆的远拱点，该椭圆的近拱点在目标轨道下方约$700\ \mathrm{m}$，平均半径小于目标的轨道半径。对同一初始状态数值积分精确的二体方程，得$y(T) = 3769.6\ \mathrm{m}$，$x(T) = -101.0\ \mathrm{m}$：在这里线性理论的精度在百分之一以内。
:::
:::

::: widget parametric
fx: 6*(sin(t) - t)*x0 - 2*(1 - cos(t))*vx/0.0011314 + (4*sin(t) - 3*t)*vy/0.0011314
fy: (4 - 3*cos(t))*x0 + sin(t)*vx/0.0011314 + 2*(1 - cos(t))*vy/0.0011314
t: 0, 4*pi
x: -4000, 8000
y: -1500, 1500
sliders: x0=-100:-500:500:10; vx=0:-0.5:0.5:0.005; vy=0:-0.5:0.5:0.005
equal: false
caption: 从$400\ \mathrm{km}$高度的目标看去的两圈自由相对运动，按[[#eq-cw-solution]]绘制：沿迹$y$为横轴（前方为正，单位米），径向$x$为纵轴（向上为正），参数$t$为轨道角$nt$。滑块设定初始径向偏移$x_0$（m）以及初始相对速度$v_x = \dot x_0$和$v_y = \dot y_0$（m/s）；$y_0 = 0$。默认情形是[[#ex-below]]：追踪航天器向下、向前绕圈，每圈前进$3.77\ \mathrm{km}$。现在设$v_y = 0.225$（接近$-2nx_0 = 0.226$）：漂移停止，轨迹闭合成一个$2{:}1$的椭圆。设$x_0 = 0$、$v_x = 0$、$v_y = 0.1$——一次向前的变轨——观察追踪航天器先升高再落到*后方*。
:::

## 自然运动与推力的悖论 {#sec-natural}

在[[#eq-no-drift]]成立且$y_0 = 0$、$\dot x_0 = 0$时，解化为
$$
x = x_0\cos nt, \qquad y = -2x_0\sin nt:
$$
这是一个以目标为中心、沿迹长度为径向两倍、每圈走一遍的椭圆——即**自然运动绕飞**。维持它不需要任何代价（在二体近似下），可用于从各个方向检查目标。加上横向振动$z = z_0\cos nt$会使椭圆倾斜出轨道平面；取$z_0 = \sqrt3\,x_0$时，相对轨道变成一个位于与当地水平面倾斜的平面内、半径为$2x_0$的圆，这是一些编队飞行设计的基础。

推力的表现违反直觉。一个小的向前变轨$\dot y_0 > 0$提高了追踪航天器的能量，使它爬升到更高、*更慢*的轨道：变轨后半圈它升到目标上方$4\dot y_0/n$，一圈后它位于沿迹$-6\pi\dot y_0/n$处——在后方。相反，径向变轨不产生净漂移：一圈之后追踪航天器回到出发点（$\dot x_0$各项都是周期性的），但半圈之后它位于沿迹$-4\dot x_0/n$处。所以**沿 V-bar 移动**的高效方法是*径向*推进：向下的变轨（$\dot x_0 < 0$）把追踪航天器带向前方。这就是交会实践中的**径向跳跃**和**切向跳跃**。

::: example 向前变轨反而落后 {#ex-forward}
在[[#ex-below]]的空间站处，航天员的工具包（或一个小型检查飞行器）从目标处以$0.10\ \mathrm{m/s}$的向前相对速度出发。半圈和一圈之后它在哪里？
::: solution
$\dot y_0 = 0.10\ \mathrm{m/s}$，其余均为零。由[[#eq-cw-solution]]：
$$
x = \frac{2}{n}(1 - \cos nt)\dot y_0, \qquad y = \frac{1}{n}(4\sin nt - 3nt)\dot y_0.
$$
由$\dot y_0/n = 88.4\ \mathrm{m}$：在$t = T/2$时，$x = 4 \times 88.4 = 354\ \mathrm{m}$（上方），$y = -3\pi \times 88.4 = -833\ \mathrm{m}$（后方）；在$t = T$时，$x = 0$，$y = -6\pi \times 88.4 = -1666\ \mathrm{m}$。

**校核：**非线性二体积分给出$y(T) = -1666.1\ \mathrm{m}$，$x(T) = -0.2\ \mathrm{m}$。向前抛出的物体一圈后落到后方$1.7\ \mathrm{km}$处——这就是从空间站释放的物体会漂走、只有碰巧才会回到空间站附近的原因。
:::
:::

::: warning 来自直线运动的直觉在这里失效 {#warn-intuition}
在自由空间中，对准目标推进就能到达目标。在轨道上，一个在 V-bar 上位于目标后方$1\ \mathrm{km}$、向前轻推的追踪航天器先升高再落后——它反而*丢失*了距离。要沿 V-bar 逼近，追踪航天器要么采用重复的跳跃（径向脉冲，或一连串小的沿迹脉冲、每个之后跟一个反向脉冲），要么持续推进以抵消科氏加速度和重力梯度加速度。沿 R-bar 的陷阱则不同：在目标下方$100\ \mathrm{m}$处以零相对速度悬停的追踪航天器并没有“停住”——它每圈向前漂移$3.8\ \mathrm{km}$。另外两个符号陷阱：坐标轴约定（径向向上还是径向向下，这会翻转每个$x$项的符号），以及忘记 LVLH 坐标系在转动，因此相对速度为零并不等于惯性速度与目标相同。
:::

## 双脉冲交会 {#sec-rendezvous}

要在选定的时间$t_f$内把追踪航天器从$\delta\mathbf{r}_0$带到目标，使用状态转移矩阵的方式与对完整轨道使用兰伯特问题（[[orbital-mechanics/orbit-determination]]）完全相同：

::: algorithm 克洛希西-威尔特希尔双脉冲交会 {#alg-cw-rendezvous}
给定第一次变轨前追踪航天器的相对状态$(\delta\mathbf{r}_0, \delta\mathbf{v}_0^-)$和转移时间$t_f$：

1. 所需的出发速度：$\delta\mathbf{v}_0^+ = -\boldsymbol{\Phi}_{rv}(t_f)^{-1}\,\boldsymbol{\Phi}_{rr}(t_f)\,\delta\mathbf{r}_0$，使$\delta\mathbf{r}(t_f) = \boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 + \boldsymbol{\Phi}_{rv}\delta\mathbf{v}_0^+ = \mathbf{0}$。
2. 第一次脉冲：$\Delta\mathbf{v}_1 = \delta\mathbf{v}_0^+ - \delta\mathbf{v}_0^-$。
3. 到达速度：$\delta\mathbf{v}_f^- = \boldsymbol{\Phi}_{vr}(t_f)\,\delta\mathbf{r}_0 + \boldsymbol{\Phi}_{vv}(t_f)\,\delta\mathbf{v}_0^+$。
4. 在目标处停下的第二次脉冲：$\Delta\mathbf{v}_2 = -\delta\mathbf{v}_f^-$。
5. 总代价$\lVert\Delta\mathbf{v}_1\rVert + \lVert\Delta\mathbf{v}_2\rVert$；对一系列$t_f$重复计算以选择转移时间。

当$nt_f$为$2\pi$的整数倍时（对平面内分块还有其他某些时刻），$\boldsymbol{\Phi}_{rv}$奇异，因此必须避开这些转移时间：经过整圈之后，速度脉冲除沿迹方向外不能产生任何净位移。
:::

::: example 沿 V-bar 的径向跳跃 {#ex-hop}
追踪航天器在 V-bar 上位于[[#ex-below]]中空间站后方$10.0\ \mathrm{km}$处，在 LVLH 坐标系中静止。规划一个半圈后到达空间站的双脉冲转移。
::: solution
$\delta\mathbf{r}_0 = (0, -10\,000, 0)\ \mathrm{m}$，$\delta\mathbf{v}_0^- = \mathbf{0}$，$nt_f = \pi$（$c = -1$，$s = 0$）。$nt = \pi$时的平面内分块：
$$
\boldsymbol{\Phi}_{rr} = \begin{bmatrix}7 & 0\\ -6\pi & 1\end{bmatrix}, \qquad
\boldsymbol{\Phi}_{rv} = \frac1n\begin{bmatrix}0 & 4\\ -4 & -3\pi\end{bmatrix}.
$$
$\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 = (0, -10\,000)$。求解$\boldsymbol{\Phi}_{rv}\delta\mathbf{v} = (0, 10\,000)$：第一行给出$\dot y = 0$，第二行给出$-4\dot x/n = 10\,000$，所以$\dot x_0^+ = -2500\,n = -2.829\ \mathrm{m/s}$——一次**向下**的径向变轨。到达速度：$\dot x_f = c\,\dot x_0^+ = +2.829\ \mathrm{m/s}$，$\dot y_f = -2s\,\dot x_0^+ = 0$；第二次变轨又是向下$2.829\ \mathrm{m/s}$。总量$5.66\ \mathrm{m/s}$，用时$46\ \mathrm{min}$。

**校核：**转移过程中追踪航天器的径向位置为$x = (s/n)\dot x_0^+$，在四分之一圈时达到$-2.5\ \mathrm{km}$：它下沉到空间站轨道下方，在那里运动更快，再升回来与空间站相遇——符合“向下推以前进”的规则。对同一次第一变轨作精确的非线性外推，偏离目标约$116\ \mathrm{m}$（约为距离的$1\,\%$），实践中用根据新导航数据计算的中途修正来消除。
:::
:::

在真实的逼近中，最后几千米是通过一系列停泊点飞完的——例如$2\ \mathrm{km}$、$250\ \mathrm{m}$、$30\ \mathrm{m}$——每个停泊点通过一次跳跃或一段受迫运动到达，而逼近走廊和中止轨迹的设计要保证一旦发生故障，追踪航天器处于不会撞上目标的被动安全路径上。**V-bar 逼近**（从前方或后方）对于对接前向或后向的对接口是自然的；**R-bar 逼近**（从下方）利用重力梯度制动，因为位于目标下方的追踪航天器停止推进后倾向于远离目标。这些操作选择都是用本章的方程做出、再用完整的非线性仿真验证的。

## 线性理论何时失效 {#sec-validity}

克洛希西-威尔特希尔方程建立在三个假设之上，每一个假设都以可辨识的方式失效：

- **间距。**被忽略的项相对于保留项为$(\delta r/r_0)^2$量级。在$r_0 = 6778\ \mathrm{km}$处相距$100\ \mathrm{m}$时，这一量为$2\times10^{-10}$；相距几十千米时误差就变得明显，而且误差的主要来源不是引力的非线性，而是*几何*：LVLH 坐标轴是直的，而轨道是弯曲的（[[#ex-validity]]）。采用曲线坐标（用沿目标轨道的弧长代替$y$）可以消除大部分这种误差。
- **偏心的目标轨道。**这时坐标系的转动不均匀；Tschauner–Hempel 方程推广了这一理论，对于$0.001$量级的$e$，CW 方程在一两圈内仍然够用。
- **摄动。**差分阻力（两个面质比不同的航天器）和$J_2$扁率项会引入缓慢的相对漂移，它们在许多圈后变得重要，在运行规划中要予以计入。

::: example 下方十千米：线性与精确 {#ex-validity}
重做[[#ex-below]]，但追踪航天器位于空间站下方$10.0\ \mathrm{km}$而不是$100\ \mathrm{m}$，把一圈后克洛希西-威尔特希尔方程的预测与对两个航天器的精确二体方程数值积分的结果进行比较。
::: solution
线性理论按比例精确缩放：$x(T) = x_0 = -10.0\ \mathrm{km}$，$y(T) = -12\pi x_0 = 377.0\ \mathrm{km}$。

精确解：对空间站和追踪航天器（其初始惯性速度为空间站的速度加上$\boldsymbol{\Omega}\times\delta\mathbf{r}_0$）分别积分$\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$，一圈后把两者之差沿空间站的 LVLH 坐标轴分解，得$x = -20.4\ \mathrm{km}$，$y = 373.6\ \mathrm{km}$。

沿迹误差不到$1\,\%$，但$10.4\ \mathrm{km}$的径向“误差”主要来自几何：沿空间站圆轨道再走$374\ \mathrm{km}$的一点，位于直的$y$轴（在空间站处与轨道相切）*下方*$374^2/(2 \times 6778) = 10.3\ \mathrm{km}$处。若以高出空间站轨道的高度——即曲线径向坐标——来度量，追踪航天器位于$-10.05\ \mathrm{km}$，沿轨道的弧长为$374.4\ \mathrm{km}$——两者都与线性预测接近。

**校核：**对$100\ \mathrm{m}$的情形，同样的比较给出约$1\ \mathrm{m}$的吻合；误差大致随间距的平方增长，一阶理论理应如此。
:::
:::

::: quiz
追踪航天器在 V-bar 上位于目标正前方$200\ \mathrm{m}$处（$y_0 = +200\ \mathrm{m}$），在 LVLH 坐标系中静止。如果它什么也不做，会怎样？
- [x] 它停留在原处。
- [ ] 它以每圈$12\pi \times 200\ \mathrm{m}$的速率向前漂移。
- [ ] 它在目标的引力作用下落向目标。
- [ ] 它以$200\ \mathrm{m}$的振幅作径向振荡。
::: solution
由于$x_0 = 0$且相对速度为零，[[#eq-cw-solution]]给出$x(t) = 0$和$y(t) = y_0$：追踪航天器在同一条圆轨道上，只是晚一些，无需代价就能保持位置。目标自身的引力可以忽略，也不在模型之内。V-bar 上的点是 CW 方程的平衡点——这就是逼近中使用 V-bar 停泊点的原因——而 R-bar 上的点则不是。
:::
:::

::: history
相对于圆轨道上物体的线性运动方程最早出现在天体力学中：乔治·威廉·希尔（George William Hill）在《月球理论研究》（“Researches in the lunar theory”，*American Journal of Mathematics*，1878年）中使用了这种转动坐标系，这就是这组方程常被称为希尔方程的原因。W. H. 克洛希西（W. H. Clohessy）和 R. S. 威尔特希尔（R. S. Wiltshire）在《卫星交会的末段制导系统》（“Terminal guidance system for satellite rendezvous”，*Journal of the Aerospace Sciences*，1960年）中针对航天器推导了这组方程并求出其封闭形式的解，目的是设计交会制导。实践在六年之内紧随而至：1965年12月15日，由沃尔特·施艾拉（Walter Schirra）和托马斯·斯塔福德（Thomas Stafford）驾驶的双子星6A号完成了首次载人空间交会，与双子星7号保持编队，距离最近约$30\ \mathrm{cm}$；1966年3月16日，双子星8号上的尼尔·阿姆斯特朗（Neil Armstrong）和戴维·斯科特（David Scott）与阿金纳（Agena）目标飞行器完成了两个航天器的首次对接。两次任务的航天员都发现，直接朝目标飞行是行不通的，正如方程所预言的那样。
:::

## 后续内容 {#sec-next}

本章的状态转移矩阵是[[orbital-mechanics/orbit-determination]]中所用拉格朗日系数的线性形式，而同样的思想——围绕参考轨迹线性化，用转移矩阵外推偏差——是各种轨道估计和轨道修正机动的基础。$J_2$和阻力作用下的相对运动（[[orbital-mechanics/perturbations]]）是长期编队的主要难题。在逼近过程中指向对接口、相机和推力器，则是[[orbital-mechanics/attitude-dynamics]]中的姿态控制问题。

::: summary
- 在圆形目标轨道的 LVLH 坐标系（$x$径向向上，$y$沿迹，$z$法向）中，小的相对运动满足$\ddot x - 3n^2x - 2n\dot y = 0$，$\ddot y + 2n\dot x = 0$，$\ddot z + n^2z = 0$：重力梯度加科氏效应。
- 封闭形式的解和状态转移矩阵给出任意时刻的相对状态；$\dot y_0 = -2nx_0$消除每圈$-6\pi(\dot y_0 + 2nx_0)/n$的长期沿迹漂移。
- 位于下方$100\ \mathrm{m}$、相对速度为零的追踪航天器每圈向前漂移$12\pi \times 100\ \mathrm{m} = 3.77\ \mathrm{km}$，径向偏移在$-100$和$-700\ \mathrm{m}$之间摆动；V-bar 上的点是平衡点，R-bar 上的点不是。
- 向前推使你落后；向下（径向）推使你在半圈后前进。自然运动绕飞是$2{:}1$的椭圆。
- 双脉冲交会：$\delta\mathbf{v}_0^+ = -\boldsymbol{\Phi}_{rv}^{-1}\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0$，再抵消到达速度；避免整圈的转移时间。
- 线性理论对几千米的间距非常准确；超过几十千米后，轨道的弯曲成为误差的主要来源，偏心率、阻力和$J_2$需要扩展的模型。
:::

## 习题

::: exercise 从下方五十米开始的漂移 {level=1 check="1885"}
位于目标正下方$50\ \mathrm{m}$的追踪航天器相对于 LVLH 坐标系速度为零。它一圈沿迹漂移多远，朝哪个方向？（以米为单位输入距离，精确到米。）
::: solution
每圈漂移$= -6\pi(\dot y_0 + 2nx_0)/n = -12\pi x_0 = 12\pi \times 50 = 1885\ \mathrm{m}$，在目标前方。它与轨道高度无关——只与偏移量有关。
:::
:::

::: exercise 由轨道倾角差引起的横向振荡 {level=1 check="1.18"}
追踪航天器与目标在同一条$400\ \mathrm{km}$圆轨道上，但其轨道平面与目标轨道平面倾斜$0.010^\circ$，升交点相同。其横向运动的振幅是多少？（以 km 为单位输入振幅，保留三位有效数字。）
::: solution
对小的$\Delta i$，横向偏移为$z = r_0\,\Delta i\,\sin u$，以振幅$r_0\,\Delta i = 6778 \times 1.745\times10^{-4} = 1.18\ \mathrm{km}$振荡——这是 CW 横向方程的解$z = (\dot z_0/n)\sin nt$。在追踪航天器穿过目标轨道平面处（$z = 0$，节线上），抵消$\dot z = n \times 1.18\ \mathrm{km} = 1.34\ \mathrm{m/s}$即可消除它——与[[orbital-mechanics/orbital-manoeuvres]]中轨道面改变的代价$v\,\Delta i$相同。
:::
:::

::: exercise 检查椭圆所需的速度 {level=1 check="-0.113"}
一颗检查卫星从$400\ \mathrm{km}$高度（$n = 1.1314\times10^{-3}\ \mathrm{rad/s}$）的目标上方$50\ \mathrm{m}$处出发。多大的沿迹相对速度$\dot y_0$能使它绕目标飞行一个闭合的自然运动椭圆？椭圆的沿迹半轴是多少？（以 m/s 为单位输入$\dot y_0$，保留三位有效数字，带符号。）
::: solution
$\dot y_0 = -2nx_0 = -2 \times 1.1314\times10^{-3} \times 50 = -0.113\ \mathrm{m/s}$（向后：在目标上方，它必须比坐标系运动得慢，才能平均而言与目标保持在一起）。椭圆为$x = 50\cos nt$，$y = -100\sin nt$：沿迹半轴$100\ \mathrm{m}$。
:::
:::

::: exercise 径向跳跃 {level=2 check="0.566"}
对[[#ex-below]]中的空间站，用径向跳跃在半圈内把追踪航天器从 V-bar 上空间站后方$1.00\ \mathrm{km}$处移到空间站，需要多少总$\Delta v$？（以 m/s 为单位输入总量，保留三位有效数字。）
::: solution
与[[#ex-hop]]相同，$y(T/2) = -4\dot x_0/n$必须等于$+1000\ \mathrm{m}$：$\dot x_0 = -250\,n = -0.283\ \mathrm{m/s}$，到达时径向速度为$+0.283\ \mathrm{m/s}$，由第二次变轨抵消。总量$0.566\ \mathrm{m/s}$——代价与距离成正比，$\Delta v_\text{总} = n\,\Delta y/2$。
:::
:::

::: exercise 三圈后落在后方 {level=2 check="-2.50"}
一个小物体以$0.05\ \mathrm{m/s}$的向前相对速度从[[#ex-below]]的空间站释放。恰好三圈后它在沿迹方向的什么位置？（以 km 为单位输入$y$，保留三位有效数字，带符号。）
::: solution
在整圈时只有长期项留下：$y = -3t\,\dot y_0 = -3 \times 3T \times 0.05 = -18\pi\dot y_0/n = -18\pi \times 0.05/1.1314\times10^{-3} = -2499\ \mathrm{m} = -2.50\ \mathrm{km}$。它在空间站后方，且在这些时刻位于$x = 0$（与空间站等高）。
:::
:::

::: exercise 从下后方出发的双脉冲转移 {level=2 check="2.92"}
追踪航天器位于[[#ex-below]]中空间站下方$1.00\ \mathrm{km}$、后方$5.00\ \mathrm{km}$处，在 LVLH 坐标系中静止。用[[#alg-cw-rendezvous]]取$t_f = T/2$，求两次脉冲及总量。（以 m/s 为单位输入总$\Delta v$，保留三位有效数字。）
::: solution
$\delta\mathbf{r}_0 = (-1000, -5000)\ \mathrm{m}$。用[[#ex-hop]]中的矩阵，$\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 = (-7000,\ 6000\pi - 5000) = (-7000,\ 13\,850)$。求解$\boldsymbol{\Phi}_{rv}\delta\mathbf{v} = (7000, -13\,850)$：第一行$4\dot y/n = 7000$，所以$\dot y_0^+ = 1750n = 1.980\ \mathrm{m/s}$；第二行$(-4\dot x - 3\pi\dot y)/n = -13\,850$，所以$\dot x_0^+ = (13\,850 n - 3\pi \times 1.980)/4 = -0.748\ \mathrm{m/s}$。$\lVert\Delta\mathbf{v}_1\rVert = \sqrt{0.748^2 + 1.980^2} = 2.117\ \mathrm{m/s}$。到达：$\dot x_f = 3ns\,x_0 + c\,\dot x_0^+ + 2s\,\dot y_0^+ = 0.748$，$\dot y_f = -6n(2)x_0 - 0 + (4c - 3)\dot y_0^+ = 13.577 - 13.860 = -0.283\ \mathrm{m/s}$（$x_0$以 m 计）。$\lVert\Delta\mathbf{v}_2\rVert = 0.800\ \mathrm{m/s}$。总量$2.92\ \mathrm{m/s}$。
:::
:::

::: exercise 漂移与半长轴 {level=3}
(a) 通过线性化活力公式，证明在一阶近似下追踪航天器与目标的半长轴之差为$\delta a = 4x_0 + 2\dot y_0/n$（记住$\dot y_0$是在转动坐标系中测量的）。(b) 由此证明每圈的沿迹漂移为$-3\pi\,\delta a$，并用开普勒第三定律解释。
::: solution
(a) 追踪航天器的惯性速度为目标的$nr_0\hat{\mathbf{j}}$加上$(\dot x_0, \dot y_0)$，再加上坐标系转动项$\boldsymbol{\Omega}\times\delta\mathbf{r} = (-ny_0, nx_0)$。一阶近似下其速度平方为$v^2 = n^2r_0^2 + 2nr_0(\dot y_0 + nx_0)$，半径为$r = r_0 + x_0$。由$1/a = 2/r - v^2/\mu$及$\mu = n^2r_0^3$：$1/a = \frac{2}{r_0}(1 - x_0/r_0) - \frac{1}{r_0} - \frac{2(\dot y_0 + nx_0)}{nr_0^2} = \frac{1}{r_0} - \frac{2x_0}{r_0^2} - \frac{2\dot y_0}{nr_0^2} - \frac{2x_0}{r_0^2}$。所以$\delta(1/a) = -(4x_0 + 2\dot y_0/n)/r_0^2$，$\delta a = 4x_0 + 2\dot y_0/n$。
(b) 每圈的长期漂移为$-6\pi(\dot y_0 + 2nx_0)/n = -3\pi(2\dot y_0/n + 4x_0) = -3\pi\,\delta a$。开普勒定律：$n \propto a^{-3/2}$，所以$\delta n = -\tfrac32 n\,\delta a/a$；一圈（$t = 2\pi/n$）内损失的角度为$2\pi\,\delta n/n = -3\pi\,\delta a/a$，乘以$a$即为沿迹距离$-3\pi\,\delta a$。用[[#ex-below]]校核：$\delta a = -400\ \mathrm{m}$，漂移$+1200\pi\ \mathrm{m}$。
:::
:::

::: exercise 设计：带安全中止的 R-bar 逼近 {level=3}
一艘货运飞船要从正下方（R-bar）逼近[[#ex-below]]中的空间站，从下方$250\ \mathrm{m}$的停泊点到下方$10\ \mathrm{m}$。(a) 在$x = -250\ \mathrm{m}$处悬停需要多大的持续径向推力加速度？(b) 如果悬停时推力器失效，飞船会去哪里，是否会威胁空间站？(c) 拟定一个逼近策略（速度剖面、停泊点、中止机动），并用 CW 方程论证其合理性。
::: solution
(a) 悬停意味着$\dot x = \dot y = \ddot x = \ddot y = 0$，所以[[#eq-cw]]要求$a_x = -3n^2x = -3(1.1314\times10^{-3})^2(-250) = 9.6\times10^{-4}\ \mathrm{m/s^2}$，向上，$a_y = 0$：每吨约$1\ \mathrm{N}$，持续施加。
(b) 失效后飞船位于$x_0 = -250\ \mathrm{m}$，相对速度为零：由[[#ex-below]]，它在半圈后降到$-1750\ \mathrm{m}$，并以每圈$12\pi \times 250 = 9.4\ \mathrm{km}$的速率向前漂移——远离空间站。这种被动安全性是 R-bar 的主要吸引力：重力梯度把目标下方的飞行器向下、向前推，永远不会把它推上去撞向目标。
(c) 一种典型策略：从$250\ \mathrm{m}$开始以与距离成正比的接近速度逼近（例如每秒距离的$0.1\ \%$，即开始时$0.25\ \mathrm{m/s}$，在$10\ \mathrm{m}$附近$1\ \mathrm{cm/s}$），设若干停泊点供航天员确认对准；推力剖面为$a_x = -3n^2x + \ddot x_\text{期望}$，$a_y = 2n\dot x$以抵消径向运动产生的科氏项。中止是一次小的径向*向下*变轨加一次反向变轨，使飞船进入向前下方漂移、每圈都增大间距的轨迹。通过带推力项外推 CW 方程，并检查从逼近过程中每一点出发的自由漂移轨迹，来论证每一个数字。
:::
:::
