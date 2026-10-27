前几讲的静态分析回答了“是否存在恢复力矩？”这个问题。要回答“接下来会发生什么？”——飞机受突风扰动后如何运动，它对飞行员操纵的响应有多快，它的振荡是否衰减——我们需要它的**运动方程**：在随飞机一起运动的坐标轴中写出的六自由度刚体牛顿定律，再加上一个描述气动力如何依赖于运动的模型。完整的方程是非线性且相互耦合的，每一台飞行模拟器积分的正是它们。对于偏离定常飞行的小扰动，它们变成线性方程，并整齐地分离为纵向和横航向两组独立的方程，每一组都是一个四阶线性系统，其特征值就是飞机的固有模态（[[flight-mechanics/dynamic-modes]]）。

刚体力学——角动量、惯性张量、欧拉方程以及矢量在旋转坐标系中的导数——在[[dynamics/three-dimensional-dynamics]]中建立；状态空间模型的线性代数见[[control-systems/state-space]]以及 Maths Atlas 的[特征值](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)。

## 坐标轴与姿态 {#sec-axes}

::: definition 地面轴系、机体轴系与稳定轴系 {#def-axes}
- **地面轴系**$Ox_Ey_Ez_E$：固定于地面，$x_E$指北，$y_E$指东，$z_E$向下（NED）。在飞机飞行力学中把地球视为平坦且不旋转的，因此这一轴系被当作惯性系。
- **机体轴系**$Ox_by_bz_b$：固连于飞机，原点在重心，$x_b$在对称面内向前，$y_b$指向右翼，$z_b$在对称面内向下。
- **稳定轴系**：$x$轴在基准（配平）状态下与相对气流方向一致的机体轴系，因此基准迎角为零。一经选定，它在扰动运动中就固连于飞机不变。

在机体轴系中，重心相对空气的速度分量为$(u, v, w)$，角速度为$(p, q, r)$（滚转、俯仰和偏航角速度），气动力与推力的合力为$(X, Y, Z)$，绕重心的合力矩为$(\mathcal{L}, M, N)$。迎角和侧滑角为$\alpha = \tan^{-1}(w/u)$和$\beta = \sin^{-1}(v/V)$。
:::

机体轴系相对地面轴系的方位用三次相继转动来描述，即**欧拉角**：从两个坐标系重合开始，先绕$z$轴转过**偏航角**（航向角）$\psi$，再绕新的$y$轴转过**俯仰角**$\theta$，最后绕新的$x$轴转过**滚转角**$\phi$。这是“3-2-1”顺序；顺序很重要，因为有限转动不可交换。在地面轴系中分量为$\mathbf{x}_E$的矢量，在机体轴系中的分量为$\mathbf{x}_b = \mathbf{R}\,\mathbf{x}_E$，其中
$$
\mathbf{R} = \begin{bmatrix} 1 & 0 & 0\\ 0 & \cos\phi & \sin\phi\\ 0 & -\sin\phi & \cos\phi\end{bmatrix}
\begin{bmatrix} \cos\theta & 0 & -\sin\theta\\ 0 & 1 & 0\\ \sin\theta & 0 & \cos\theta\end{bmatrix}
\begin{bmatrix} \cos\psi & \sin\psi & 0\\ -\sin\psi & \cos\psi & 0\\ 0 & 0 & 1\end{bmatrix}.
$$ {#eq-rotation}
把它作用于地面轴系中的重力$(0, 0, mg)$，只有乘积的最后一列起作用：
$$
\mathbf{W}_b = mg\begin{bmatrix} -\sin\theta\\ \cos\theta\sin\phi\\ \cos\theta\cos\phi\end{bmatrix}.
$$ {#eq-gravity}

::: proposition 欧拉角运动学 {#prop-euler-rates}
欧拉角的变化率与机体角速度之间的关系为
$$
\dot\phi = p + (q\sin\phi + r\cos\phi)\tan\theta,\qquad
\dot\theta = q\cos\phi - r\sin\phi,\qquad
\dot\psi = \frac{q\sin\phi + r\cos\phi}{\cos\theta}.
$$ {#eq-euler-rates}
:::

::: proof
机体的角速度是三个欧拉角速率的矢量和，每个都绕各自的轴：$\dot\psi$绕地面$z$轴，$\dot\theta$绕（经$\psi$转动后的）中间$y$轴，$\dot\phi$绕机体$x$轴。把它们都表示在机体轴系中。$\dot\phi$已经沿$x_b$：$(\dot\phi, 0, 0)$。中间$y$轴只经滚转转动就变到机体轴系：$(0, \dot\theta\cos\phi, -\dot\theta\sin\phi)$。地面$z$轴经俯仰和滚转转动，得到不含$\psi$因子的$\mathbf{R}$的第三列：$\dot\psi(-\sin\theta, \cos\theta\sin\phi, \cos\theta\cos\phi)$。相加得
$$
p = \dot\phi - \dot\psi\sin\theta,\qquad q = \dot\theta\cos\phi + \dot\psi\cos\theta\sin\phi,\qquad r = -\dot\theta\sin\phi + \dot\psi\cos\theta\cos\phi .
$$
第二式乘以$\sin\phi$、第三式乘以$\cos\phi$后相加，得$q\sin\phi + r\cos\phi = \dot\psi\cos\theta$，即[[#eq-euler-rates]]的第三式。第二式乘以$\cos\phi$、第三式乘以$-\sin\phi$后相加，得$\dot\theta$。把$\dot\psi$代入$p = \dot\phi - \dot\psi\sin\theta$，得$\dot\phi$。
:::

$\tan\theta$和$1/\cos\theta$项在$\theta = \pm90^\circ$时变为无穷大：欧拉角描述在垂直飞行时是奇异的（**万向节锁**，gimbal lock），因为此时航向和滚转描述的是同一个转动。因此特技飞机和航天器的模拟器改为积分没有奇异性的四参数**四元数**；对于常规飞行，欧拉角已经足够，而且更容易解释。

::: example 定常转弯中的机体角速度 {#ex-turn-rates}
轻型飞机进行[[flight-mechanics/manoeuvres-takeoff-landing#ex-turn]]中的水平转弯：滚转角$\phi = 60^\circ$，转弯角速度$\dot\psi = 0.3397\ \mathrm{rad/s}$，假设俯仰角$\theta = 0$。安装在机体上的角速度陀螺读数是多少？
::: solution
在定常转弯中$\dot\phi = \dot\theta = 0$。由证明中的表达式：$p = -\dot\psi\sin\theta = 0$，$q = \dot\psi\cos\theta\sin\phi = 0.3397 \times 0.8660 = 0.2942\ \mathrm{rad/s}$，$r = \dot\psi\cos\theta\cos\phi = 0.3397 \times 0.5 = 0.1698\ \mathrm{rad/s}$。合理性检查：$\sqrt{q^2 + r^2} = 0.3397$，等于转弯角速度，这是必然的——飞机绕竖直轴转动，而竖直轴在机体轴系中部分沿$z_b$、部分沿$y_b$。在大坡度转弯中，飞机在其自身轴系中主要是在**俯仰**：这就是飞行员转弯时要拉杆的原因，也是俯仰阻尼器在转弯中起作用的原因。
:::
:::

::: widget plot
f: tan(x*pi/180); 1/cos(x*pi/180)
x: -89, 89
y: -12, 12
labels: \tan\theta; \sec\theta
caption: [[#eq-euler-rates]]中乘在$q\sin\phi + r\cos\phi$上的因子$\tan\theta$和$\sec\theta$随俯仰角$\theta$（度）的变化。在正常飞行中它们接近$0$和$1$，但当$\theta \to \pm 90^\circ$时无界增长：在接近垂直飞行时，很小的机体角速度就会产生巨大的航向角和滚转角变化率。这是欧拉角的万向节锁奇异性，而不是物理效应。
:::

## 刚体方程 {#sec-rigid-body}

把飞机视为质量不变的刚体（燃油消耗相对于我们关心的运动是缓慢的），平面$x_bz_b$为对称面。于是惯性积$I_{xy}$和$I_{yz}$为零，机体轴系中的惯性张量为
$$
\mathbf{I} = \begin{bmatrix} I_x & 0 & -I_{xz}\\ 0 & I_y & 0\\ -I_{xz} & 0 & I_z\end{bmatrix},
$$
由于坐标轴固连于机体，它是常量。

::: proposition 机体轴系中的运动方程 {#prop-eom}
对于在平坦、不旋转的地球上空飞行的、质量不变的对称刚性飞机，力方程为
$$
\begin{aligned}
m(\dot u + qw - rv) &= X - mg\sin\theta,\\
m(\dot v + ru - pw) &= Y + mg\cos\theta\sin\phi,\\
m(\dot w + pv - qu) &= Z + mg\cos\theta\cos\phi,
\end{aligned}
$$ {#eq-force}
力矩方程为
$$
\begin{aligned}
\mathcal{L} &= I_x\dot p - I_{xz}(\dot r + pq) + (I_z - I_y)qr,\\
M &= I_y\dot q + (I_x - I_z)pr + I_{xz}(p^2 - r^2),\\
N &= I_z\dot r - I_{xz}(\dot p - qr) + (I_y - I_x)pq ,
\end{aligned}
$$ {#eq-moment}
其中$(X, Y, Z)$和$(\mathcal{L}, M, N)$是气动力和推进力及其力矩。
:::

::: proof
**力。** 牛顿第二定律在惯性（地面）系中成立：$\mathbf{F} + \mathbf{W} = m\,(\mathrm{d}\mathbf{V}/\mathrm{d}t)_E$。速度在以$\boldsymbol\omega = (p, q, r)$旋转的机体轴系中分解；矢量在旋转坐标系中的导数（[[dynamics/three-dimensional-dynamics]]中的输运定理）为
$$
\left(\frac{\mathrm{d}\mathbf{V}}{\mathrm{d}t}\right)_E = \left(\frac{\mathrm{d}\mathbf{V}}{\mathrm{d}t}\right)_b + \boldsymbol\omega\times\mathbf{V}
= \begin{bmatrix}\dot u\\ \dot v\\ \dot w\end{bmatrix} + \begin{bmatrix} qw - rv\\ ru - pw\\ pv - qu\end{bmatrix}.
$$
加上[[#eq-gravity]]中的重力，即得[[#eq-force]]。（假设风是定常且均匀的，因此相对空气和相对地面的速度相差一个常量。）

**力矩。** 对重心，$\mathbf{M} = (\mathrm{d}\mathbf{H}/\mathrm{d}t)_E$，其中角动量$\mathbf{H} = \mathbf{I}\boldsymbol\omega = (I_xp - I_{xz}r,\ I_yq,\ I_zr - I_{xz}p)$。由输运定理并注意$\mathbf{I}$为常量，$\mathbf{M} = \mathbf{I}\dot{\boldsymbol\omega} + \boldsymbol\omega\times\mathbf{I}\boldsymbol\omega$。$x$分量：$I_x\dot p - I_{xz}\dot r + q(I_zr - I_{xz}p) - r(I_yq) = I_x\dot p - I_{xz}(\dot r + pq) + (I_z - I_y)qr$。$y$和$z$分量同理：$I_y\dot q + r(I_xp - I_{xz}r) - p(I_zr - I_{xz}p)$和$I_z\dot r - I_{xz}\dot p + p(I_yq) - q(I_xp - I_{xz}r)$，整理后即得[[#eq-moment]]。这就是含惯性积的欧拉方程。
:::

为使描述完整，运动学方程[[#eq-euler-rates]]给出姿态，**导航方程**$\dot{\mathbf{x}}_E = \mathbf{R}^{\mathsf T}(u, v, w)^{\mathsf T}$（加上风）给出位置。总共是关于十二个状态$(u, v, w, p, q, r, \phi, \theta, \psi, x_E, y_E, z_E)$的十二个一阶常微分方程——这是每一台六自由度飞行模拟器的核心。航向和位置不出现在动力学方程的右端（平坦地球模型中的大气除了通过高度之外与它们无关），因此对于稳定性研究只有前八个起作用。

::: warning 机体轴系是旋转的
[[#eq-force]]中的$qw - rv$等项并不是“力”：它们是由于坐标轴旋转而出现的惯性加速度的组成部分。漏掉它们——写成$m\dot w = Z + mg\cos\theta\cos\phi$——得到的飞机既不能转弯也不能拉起，因为在定常拉起中$\dot w = 0$，而附加升力所产生的正是惯性加速度$-qu$（在机体$z$方向上向上）。另外两个常见疏漏：用欧拉角速率$\dot\theta$、$\dot\psi$代替机体角速度$q$、$r$（它们只在机翼水平飞行时才相同），以及忘记惯性积$I_{xz}$——它在[[#eq-moment]]中耦合滚转与偏航，并且对大多数飞机在稳定轴系中都不可忽略。
:::

## 定常飞行与小扰动 {#sec-linearisation}

基准飞行状态是定常、机翼水平的对称飞行：$v_0 = p_0 = q_0 = r_0 = \phi_0 = 0$，在稳定轴系中$w_0 = 0$，故$u_0 = V$。此时力方程简化为$X_0 = mg\sin\theta_0$和$Z_0 = -mg\cos\theta_0$，这就是[[flight-mechanics/steady-flight-performance#prop-steady]]中的定常飞行平衡关系，其中$\theta_0 = \gamma_0$（航迹角，因为稳定轴系的$x$轴沿航迹）。

现在施加扰动：$u = u_0 + \Delta u$，$w = \Delta w$，$q = \Delta q$，$\theta = \theta_0 + \Delta\theta$，等等，并把每一项展开到扰动量的一阶。$q\,w$和$p\,r$这样的乘积是二阶的，予以舍去；$\sin(\theta_0 + \Delta\theta) \approx \sin\theta_0 + \Delta\theta\cos\theta_0$；$qu \approx u_0\Delta q$。

::: proposition 线化方程与解耦 {#prop-decoupling}
在偏离定常、对称、机翼水平飞行的小扰动的一阶近似下，运动方程分离为关于$(\Delta u, \Delta w, \Delta q, \Delta\theta)$的**纵向**方程组，
$$
\begin{aligned}
m\,\Delta\dot u &= \Delta X - mg\cos\theta_0\,\Delta\theta,\\
m(\Delta\dot w - u_0\Delta q) &= \Delta Z - mg\sin\theta_0\,\Delta\theta,\\
I_y\,\Delta\dot q &= \Delta M,\qquad \Delta\dot\theta = \Delta q,
\end{aligned}
$$ {#eq-lin-long}
以及关于$(\Delta v, \Delta p, \Delta r, \Delta\phi)$的**横航向**方程组，
$$
\begin{aligned}
m(\Delta\dot v + u_0\Delta r) &= \Delta Y + mg\cos\theta_0\,\Delta\phi,\\
I_x\Delta\dot p - I_{xz}\Delta\dot r &= \Delta\mathcal{L},\qquad
I_z\Delta\dot r - I_{xz}\Delta\dot p = \Delta N,\\
\Delta\dot\phi &= \Delta p + \tan\theta_0\,\Delta r,
\end{aligned}
$$ {#eq-lin-lat}
前提是气动扰动量$\Delta X, \Delta Z, \Delta M$只依赖于纵向变量，$\Delta Y, \Delta\mathcal{L}, \Delta N$只依赖于横向变量。
:::

::: proof
把扰动后的变量代入[[#eq-force]]、[[#eq-moment]]和[[#eq-euler-rates]]，减去基准方程，并舍去扰动量的乘积。例如$x$向力方程：$m(\Delta\dot u + \Delta q\,\Delta w - \Delta r\,\Delta v) = X_0 + \Delta X - mg(\sin\theta_0 + \Delta\theta\cos\theta_0)$；乘积项是二阶的，$X_0 = mg\sin\theta_0$相互抵消，剩下[[#eq-lin-long]]的第一行。在$z$向方程中$-qu = -\Delta q(u_0 + \Delta u) \approx -u_0\Delta q$。在力矩方程中，每个惯性耦合项（$qr$、$pr$、$p^2 - r^2$、$pq$）都是两个扰动角速度的乘积，因而消失，剩下$I_y\Delta\dot q = \Delta M$以及耦合的滚转–偏航方程对。在[[#eq-euler-rates]]中，由$\phi_0 = 0$：$\Delta\dot\theta = \Delta q$，$\Delta\dot\phi = \Delta p + \Delta r\tan\theta_0$。最后，关于气动力的条件来自对称性：对称飞机向左或向右侧滑时受到相同的$X$、$Z$、$M$，因此它们是$v$、$p$、$r$的偶函数，在对称基准状态下对这些量的一阶导数为零；同样，$Y$、$\mathcal{L}$、$N$是横向变量的奇函数，在一阶近似下不受对称变量的影响。
:::

解耦使飞行动力学变得易于处理：两个四阶问题代替了一个八阶问题。它在快速滚转机动中失效（此时$pr$和$pq$不再是小量——即**惯性耦合**，它曾在机身与机翼惯性比很大的早期喷气式战斗机上造成数起事故），在失速附近以及对不对称构型也失效。

## 稳定性导数 {#sec-derivatives}

气动扰动量写成运动变量和操纵量的线性组合，其中的偏导数在基准状态下取值——这就是布赖恩（G. H. Bryan）引入的**稳定性导数**：
$$
\Delta X = \frac{\partial X}{\partial u}\Delta u + \frac{\partial X}{\partial w}\Delta w + \frac{\partial X}{\partial\delta_e}\Delta\delta_e + \dots,
\qquad
\Delta M = \frac{\partial M}{\partial u}\Delta u + \frac{\partial M}{\partial w}\Delta w + \frac{\partial M}{\partial\dot w}\Delta\dot w + \frac{\partial M}{\partial q}\Delta q + \frac{\partial M}{\partial\delta_e}\Delta\delta_e,
$$
其他各量类似。对$\dot w$的导数表示下洗的滞后：只有当空气从机翼流到尾翼之后，尾翼才感受到机翼迎角的变化。把每个力导数除以质量、每个力矩导数除以相应的转动惯量较为方便；例如记$X_u = (\partial X/\partial u)/m$和$M_q = (\partial M/\partial q)/I_y$（这是 Nelson 的记号；Etkin 和 Cook 采用其他的归一化方式，因此混用不同来源前要先核对）。

::: definition 无量纲稳定性导数 {#def-derivatives}
无量纲导数是对$\hat u = \Delta u/u_0$、$\alpha \approx \Delta w/u_0$、$\hat q = q\bar c/(2u_0)$、$\hat{\dot\alpha} = \dot\alpha\bar c/(2u_0)$、$\beta \approx \Delta v/u_0$、$\hat p = pb/(2u_0)$和$\hat r = rb/(2u_0)$求导——例如
$$
C_{m\alpha} = \frac{\partial C_m}{\partial\alpha},\qquad C_{mq} = \frac{\partial C_m}{\partial\hat q},\qquad C_{lp} = \frac{\partial C_l}{\partial\hat p},\qquad C_{Du} = \frac{\partial C_D}{\partial\hat u}.
$$
它们取决于飞机的外形、马赫数以及（微弱地）雷诺数，但与其尺寸或速度无关，风洞试验、CFD 和工程手册方法提供的正是这些导数。
:::

::: proposition 由升力和阻力曲线得到的纵向力导数 {#prop-xz-derivs}
在稳定轴系中，若推力与速度无关且$C_{Lu} = C_{Du} = 0$（无马赫数效应），则对$u$和$w$的力导数为
$$
X_u = -\frac{2qSC_{D}}{m u_0},\qquad Z_u = -\frac{2qSC_{L}}{m u_0},\qquad
X_w = \frac{qS(C_L - C_{D\alpha})}{m u_0},\qquad Z_w = -\frac{qS(C_{L\alpha} + C_D)}{m u_0},
$$ {#eq-xz-derivs}
其中$C_L$、$C_D$在基准状态下取值，$q = \tfrac12\rho u_0^2$。
:::

::: proof
在稳定轴系中，气动力的分量为$X = -D\cos\alpha + L\sin\alpha$和$Z = -L\cos\alpha - D\sin\alpha$，其中$\alpha$是（扰动）迎角，在基准状态下为零。由$L = \tfrac12\rho V^2SC_L$和$V \approx u$：当$C_L$本身不依赖于$u$时，$\partial L/\partial u = \rho u_0SC_L = 2qSC_L/u_0$，$D$同理。在$\alpha = 0$处，$\partial X/\partial u = -\partial D/\partial u$，$\partial Z/\partial u = -\partial L/\partial u$，由此得$X_u$和$Z_u$。对于$w$：$\alpha \approx w/u_0$，故$\partial/\partial w = (1/u_0)\,\partial/\partial\alpha$，而在$\alpha = 0$处，$\partial X/\partial\alpha = -\partial D/\partial\alpha + L = qS(C_L - C_{D\alpha})$，$\partial Z/\partial\alpha = -\partial L/\partial\alpha - D = -qS(C_{L\alpha} + C_D)$。除以$m$即得[[#eq-xz-derivs]]。
:::

力矩导数遵循同样的模式：$M_w = qS\bar c\,C_{m\alpha}/(u_0I_y)$，$M_{\dot w} = C_{m\dot\alpha}(\bar c/2u_0)qS\bar c/(u_0I_y)$，$M_q = C_{mq}(\bar c/2u_0)qS\bar c/I_y$，横向导数列于[[#ex-lat-derivs]]。对于常规布局飞机，$C_{mq}$的大部分由尾翼提供：俯仰角速度$q$使尾翼迎角改变$ql_t/u_0$，给出$C_{mq} \approx -2\eta\bar V_Ha_t\,l_t/\bar c$。

::: example 喷气运输机的纵向导数 {#ex-long-derivs}
喷气运输机在$11\ \mathrm{km}$以$u_0 = 230.15\ \mathrm{m/s}$（马赫数$0.78$）巡航，$q = 9639\ \mathrm{Pa}$，$m = 70\,000\ \mathrm{kg}$，$S = 122.6\ \mathrm{m^2}$，$\bar c = 4.19\ \mathrm{m}$，$I_y = 3.6\times10^{6}\ \mathrm{kg\,m^2}$。其无量纲导数（稳定轴系，每弧度）为：$C_L = 0.5809$，$C_D = 0.0341$，$C_{L\alpha} = 5.5$，$C_{D\alpha} = 0.268$，$C_{m\alpha} = -0.55$，$C_{m\dot\alpha} = -6.0$，$C_{mq} = -18.0$，$C_{L\delta e} = 0.35$，$C_{m\delta e} = -1.20$。计算有量纲导数。
::: solution
$qS = 9639 \times 122.6 = 1.1817\times10^{6}\ \mathrm{N}$；$qS/(mu_0) = 1.1817\times10^{6}/(70\,000 \times 230.15) = 0.07335\ \mathrm{s^{-1}}$；$qS\bar c/I_y = 1.1817\times10^{6} \times 4.19/3.6\times10^{6} = 1.3754\ \mathrm{s^{-2}}$；$\bar c/(2u_0) = 0.009103\ \mathrm{s}$。
$$
\begin{aligned}
X_u &= -2 \times 0.0341 \times 0.07335 = -0.00501\ \mathrm{s^{-1}}, &
X_w &= (0.5809 - 0.268) \times 0.07335 = 0.0230\ \mathrm{s^{-1}},\\
Z_u &= -2 \times 0.5809 \times 0.07335 = -0.0852\ \mathrm{s^{-1}}, &
Z_w &= -(5.5 + 0.0341) \times 0.07335 = -0.406\ \mathrm{s^{-1}},\\
M_w &= -0.55 \times 1.3754/230.15 = -0.003287\ \mathrm{m^{-1}s^{-1}}, &
M_{\dot w} &= -6.0 \times 0.009103 \times 1.3754/230.15 = -3.26\times10^{-4}\ \mathrm{m^{-1}},\\
M_q &= -18.0 \times 0.009103 \times 1.3754 = -0.2253\ \mathrm{s^{-1}}, &
M_{\delta e} &= -1.20 \times 1.3754 = -1.650\ \mathrm{s^{-2}},
\end{aligned}
$$
以及$Z_{\delta e} = -0.35 \times 1.1817\times10^{6}/70\,000 = -5.908\ \mathrm{m\,s^{-2}}$。若按单位迎角而不是单位竖直速度表示：$Z_\alpha = u_0Z_w = -93.4\ \mathrm{m\,s^{-2}}$，$M_\alpha = u_0M_w = -0.756\ \mathrm{s^{-2}}$。合理性检查：单位与$\Delta\dot u = X_u\Delta u + \dots$（加速度）一致；$X_u = -2g/(u_0\,L/D) = -2 \times 9.807/(230.15 \times 17.02) = -0.00501$——速度导数由升阻比决定，这一结果在长周期模态中还会用到。
:::
:::

## 状态空间形式 {#sec-state-space}

整理各项，其中$\Delta\dot w$通过$M_{\dot w}$出现在俯仰方程的右端，并利用$Z$方程将其消去（同时忽略与$m$和$mu_0$相比很小的$Z_{\dot w}$和$Z_q$），以$\mathbf{x} = (\Delta u, \Delta w, \Delta q, \Delta\theta)^{\mathsf T}$为状态的纵向方程取$\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\Delta\delta_e$的形式：
$$
\mathbf{A}_{\text{long}} = \begin{bmatrix}
X_u & X_w & 0 & -g\cos\theta_0\\
Z_u & Z_w & u_0 & -g\sin\theta_0\\
M_u + M_{\dot w}Z_u & M_w + M_{\dot w}Z_w & M_q + M_{\dot w}u_0 & -M_{\dot w}g\sin\theta_0\\
0 & 0 & 1 & 0
\end{bmatrix},\qquad
\mathbf{B}_{\text{long}} = \begin{bmatrix} X_{\delta e}\\ Z_{\delta e}\\ M_{\delta e} + M_{\dot w}Z_{\delta e}\\ 0\end{bmatrix}.
$$ {#eq-a-long}

::: example 纵向系统矩阵 {#ex-a-long}
由[[#ex-long-derivs]]组建喷气运输机水平巡航（$\theta_0 = 0$，$M_u = 0$，$X_{\delta e} = 0$）时的$\mathbf{A}_{\text{long}}$。
::: solution
第三行：$M_{\dot w}Z_u = (-3.26\times10^{-4})(-0.0852) = 2.78\times10^{-5}$；$M_w + M_{\dot w}Z_w = -0.003287 + 1.32\times10^{-4} = -0.003154$；$M_q + M_{\dot w}u_0 = -0.2253 - 0.0751 = -0.3005$。因此
$$
\mathbf{A}_{\text{long}} = \begin{bmatrix}
-0.00501 & 0.0230 & 0 & -9.807\\
-0.0852 & -0.406 & 230.15 & 0\\
2.78\times10^{-5} & -0.003154 & -0.3005 & 0\\
0 & 0 & 1 & 0
\end{bmatrix},\qquad
\mathbf{B}_{\text{long}} = \begin{bmatrix} 0\\ -5.908\\ -1.648\\ 0\end{bmatrix}.
$$
合理性检查：矩阵具有预期的结构——一个把俯仰角与速度耦合起来的重力项，一个把俯仰角速度与竖直速度耦合起来的大数$u_0$，以及较小的速度导数。其特征值（在[[flight-mechanics/dynamic-modes]]中计算）为$-0.354 \pm 0.850\mathrm{i}$和$-0.00157 \pm 0.0569\mathrm{i}\ \mathrm{s^{-1}}$：一个快速、阻尼良好的振荡，以及一个非常缓慢、阻尼很小的振荡。
:::
:::

横航向方程通常以$\mathbf{x} = (\beta, p, r, \phi)^{\mathsf T}$为状态写出。忽略$I_{xz}$（或将其吸收进求解耦合滚转–偏航方程对所得的“带撇”导数$L'_\beta$、$N'_\beta$……中），在水平飞行中并忽略$Y_p$、$Y_r$：
$$
\mathbf{A}_{\text{lat}} = \begin{bmatrix}
Y_\beta/u_0 & 0 & -1 & g\cos\theta_0/u_0\\
L_\beta & L_p & L_r & 0\\
N_\beta & N_p & N_r & 0\\
0 & 1 & 0 & 0
\end{bmatrix},
$$ {#eq-a-lat}
其中$Y_\beta = qSC_{Y\beta}/m$，$L_\beta = qSbC_{l\beta}/I_x$，$L_p = qSb^2C_{lp}/(2I_xu_0)$，等等。

::: example 喷气运输机的横向导数 {#ex-lat-derivs}
对于同一巡航状态下的喷气运输机，$b = 34.13\ \mathrm{m}$，$I_x = 1.4\times10^{6}$，$I_z = 4.8\times10^{6}\ \mathrm{kg\,m^2}$（忽略$I_{xz}$），$C_{Y\beta} = -0.80$，$C_{l\beta} = -0.13$，$C_{n\beta} = 0.12$，$C_{lp} = -0.45$，$C_{np} = -0.03$，$C_{lr} = 0.15$，$C_{nr} = -0.18$，组建$\mathbf{A}_{\text{lat}}$。
::: solution
$qSb = 4.0332\times10^{7}\ \mathrm{N\,m}$；$qSb^2/(2u_0) = 2.9905\times10^{6}\ \mathrm{N\,m\,s}$。
$$
\begin{aligned}
Y_\beta &= -0.80 \times 1.1817\times10^{6}/70\,000 = -13.51\ \mathrm{m\,s^{-2}}, &
L_\beta &= -0.13 \times 4.0332\times10^{7}/1.4\times10^{6} = -3.745\ \mathrm{s^{-2}},\\
N_\beta &= 0.12 \times 4.0332\times10^{7}/4.8\times10^{6} = 1.008\ \mathrm{s^{-2}}, &
L_p &= -0.45 \times 2.9905\times10^{6}/1.4\times10^{6} = -0.961\ \mathrm{s^{-1}},\\
N_p &= -0.03 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.0187\ \mathrm{s^{-1}}, &
L_r &= 0.15 \times 2.9905\times10^{6}/1.4\times10^{6} = 0.320\ \mathrm{s^{-1}},\\
N_r &= -0.18 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.112\ \mathrm{s^{-1}}. & &
\end{aligned}
$$
由$Y_\beta/u_0 = -0.0587\ \mathrm{s^{-1}}$和$g/u_0 = 0.0426\ \mathrm{s^{-1}}$，
$$
\mathbf{A}_{\text{lat}} = \begin{bmatrix}
-0.0587 & 0 & -1 & 0.0426\\
-3.745 & -0.961 & 0.320 & 0\\
1.008 & -0.0187 & -0.112 & 0\\
0 & 1 & 0 & 0
\end{bmatrix}.
$$
合理性检查：滚转导数很大，因为$I_x$是最小的转动惯量；第一行中的$-1$表示偏航角速度使机头偏离速度矢量从而产生侧滑，$g/u_0$表示滚转角使升力倾斜并使飞机侧滑。其特征值（下一讲）为$-0.0283 \pm 1.058\mathrm{i}$、$-1.072$和$-0.0034\ \mathrm{s^{-1}}$。
:::
:::

::: widget phaseplane
f: -0.406*x + y
g: -0.726*x - 0.3005*y
x: -0.2, 0.2
y: -0.2, 0.2
points: 0.15, 0; -0.1, 0.1; 0, -0.15
nullclines: true
caption: 喷气运输机俯仰运动的短周期近似（在[[flight-mechanics/dynamic-modes]]中建立）：状态$(\Delta\alpha, \Delta q)$，单位为弧度和 rad/s，取自$\mathbf{A}_{\text{long}}$的第二、三行并保持速度不变。每条轨线都在几秒钟内螺旋收敛到配平点——这就是稳定配平点附近的线化动力学。注意这些螺旋线比临界阻尼运动绕得更紧（阻尼更小）：这架飞机在俯仰扰动后会有轻微的超调。
:::

::: quiz
在线化纵向方程中，为什么俯仰角速度扰动$\Delta q$在$z$向力方程中要乘以$u_0$出现？
- [ ] 因为俯仰阻尼导数$M_q$
- [x] 因为机体轴系是旋转的：俯仰角速度使机体$x$轴偏离速度矢量，这在机体轴系中表现为$w$的变化率
- [ ] 因为下洗滞后
- [ ] 因为推力线是倾斜的
::: solution
它是[[#eq-force]]中输运定理的$-qu$项，线化后为$-u_0\Delta q$。在$\dot w = 0$的定常拉起中，附加升力$\Delta Z = -mu_0\Delta q$恰好就是弯曲航迹所需的向心力。
:::
:::

::: history
布赖恩（G. H. Bryan）与威廉斯（W. E. Williams）在1904年写出了滑翔机纵向运动的线化方程；布赖恩的《航空中的稳定性》（*Stability in Aviation*，1911）给出了体轴系中完整的小扰动方程，引入了**稳定性导数**（他称之为“阻力导数”），并证明运动分离为纵向和横向两组，其稳定性由四次特征方程的根决定——这基本上就是本讲的框架。第一次世界大战前夕，伦纳德·贝尔斯托（Leonard Bairstow）和他在英国国家物理实验室（National Physical Laboratory）的同事发展了测量这些导数的风洞方法，并研究了对称运动与不对称运动在什么条件下可以分开处理，从而把布赖恩的理论变成了一种工程工具。1950年代出现了能够积分完整非线性六自由度方程的电子模拟计算机和数字计算机；而那个年代高速飞机遇到的惯性耦合问题——NACA 兰利中心的威廉·菲利普斯（William H. Phillips）在1948年（NACA TN 1627）就已预言——表明了线性解耦理论在何处失效。
:::

::: summary
- 机体轴系（$x$向前，$y$向右，$z$向下）随飞机转动；3-2-1 顺序的欧拉角$(\psi, \theta, \phi)$给出其姿态；重力在机体轴系中为$mg(-\sin\theta, \cos\theta\sin\phi, \cos\theta\cos\phi)$。
- 欧拉角速率：$\dot\phi = p + (q\sin\phi + r\cos\phi)\tan\theta$，$\dot\theta = q\cos\phi - r\sin\phi$，$\dot\psi = (q\sin\phi + r\cos\phi)\sec\theta$——在$\theta = \pm90^\circ$处奇异。
- 力：$m(\dot{\mathbf V}_b + \boldsymbol\omega\times\mathbf V) = \mathbf F + \mathbf W$；力矩：$\mathbf M = \mathbf I\dot{\boldsymbol\omega} + \boldsymbol\omega\times\mathbf I\boldsymbol\omega$，对称飞机含$I_{xz}$。
- 在定常对称飞行附近线化后，方程分离为纵向$(\Delta u, \Delta w, \Delta q, \Delta\theta)$和横向$(\beta, p, r, \phi)$两组。
- 气动力以稳定性导数的形式进入；$X_u = -2qSC_D/(mu_0)$，$Z_w = -qS(C_{L\alpha} + C_D)/(mu_0)$，$M_q = C_{mq}(\bar c/2u_0)qS\bar c/I_y$，等等。
- 每一组都是$\dot{\mathbf x} = \mathbf A\mathbf x + \mathbf B\mathbf u$；$\mathbf A$的特征值就是飞机的模态。
:::

## 习题

::: exercise 机体轴系中的重力 {level=1 check="3633"}
轻型飞机（$m = 1100\ \mathrm{kg}$）的$\theta = 10^\circ$，$\phi = 20^\circ$。求其重力的$y_b$分量。（单位 N，取整数。）
::: solution
$W_y = mg\cos\theta\sin\phi = 10\,787 \times 0.98481 \times 0.34202 = 3633\ \mathrm{N}$。其他分量为$W_x = -10\,787\sin 10^\circ = -1873\ \mathrm{N}$和$W_z = 10\,787\cos 10^\circ\cos 20^\circ = 9983\ \mathrm{N}$；三者合成的大小为$10\,787\ \mathrm{N}$。
:::
:::

::: exercise 由机体角速度求航向角速率 {level=1 check="0.0364"}
一架飞机在$\theta = 10^\circ$、$\phi = 20^\circ$时的机体角速度为$p = 0.10$，$q = 0.05$，$r = 0.02\ \mathrm{rad/s}$。求$\dot\psi$。（单位 rad/s，保留三位有效数字。）
::: solution
$\dot\psi = (q\sin\phi + r\cos\phi)/\cos\theta = (0.05 \times 0.34202 + 0.02 \times 0.93969)/0.98481 = (0.017101 + 0.018794)/0.98481 = 0.0364\ \mathrm{rad/s}$。另有$\dot\theta = 0.0401$，$\dot\phi = 0.1063\ \mathrm{rad/s}$。
:::
:::

::: exercise 由 L/D 求速度导数 {level=1 check="-0.00501"}
证明对于$C_{Du} = 0$的水平飞行，$X_u = -2g/(u_0\,L/D)$，并对$u_0 = 230.15\ \mathrm{m/s}$和$L/D = 17.02$求其数值。（输入$X_u$，单位$\mathrm{s^{-1}}$，保留三位有效数字。）
::: solution
$X_u = -2qSC_D/(mu_0)$，而在水平飞行中$qSC_L = mg$，故$qSC_D = mg\,C_D/C_L = mg/(L/D)$；因此$X_u = -2g/(u_0\,L/D) = -2 \times 9.80665/(230.15 \times 17.02) = -0.00501\ \mathrm{s^{-1}}$。
:::
:::

::: exercise 轻型飞机的俯仰阻尼 {level=2 check="-12.5"}
对轻型飞机的尾翼（$\eta = 0.90$，$\bar V_H = 0.5669$，$a_t = 4.0\ \mathrm{rad^{-1}}$，$l_t = 4.5\ \mathrm{m}$，$\bar c = 1.47\ \mathrm{m}$）估算$C_{mq} \approx -2\eta\bar V_Ha_t\,l_t/\bar c$。（输入$C_{mq}$，保留三位有效数字。）
::: solution
$C_{mq} \approx -2 \times 0.90 \times 0.5669 \times 4.0 \times (4.5/1.47) = -2 \times 0.90 \times 0.5669 \times 4.0 \times 3.061 = -12.5$。推导：俯仰角速度$q$使尾翼迎角增大$ql_t/u_0 = 2\hat q\,l_t/\bar c$，使尾翼升力系数改变$a_t \times 2\hat ql_t/\bar c$，力矩改变其$-\eta\bar V_H$倍。（许多教材再为机翼和机身加上约$10\,\%$。）
:::
:::

::: exercise 拉起中的输运定理 {level=2}
在定常拉起中，轻型飞机以$u = 50\ \mathrm{m/s}$、$w = 0$、$q = 0.2\ \mathrm{rad/s}$飞行，机翼水平，瞬时$\theta = 0$。用[[#eq-force]]求气动力$Z$和过载，并与[[flight-mechanics/manoeuvres-takeoff-landing#eq-pullup]]的拉起公式核对。
::: solution
由$\dot w = 0$、$p = v = 0$：$m(-qu) = Z + mg$，故$Z = -m(qu + g) = -1100 \times (10 + 9.807) = -21\,788\ \mathrm{N}$（向上的升力$21.8\ \mathrm{kN}$）。过载为$-Z/W = 21\,788/10\,787 = 2.02$。航迹半径为$u/q = 250\ \mathrm{m}$，而$1 + V^2/(gR) = 1 + 2500/(9.807 \times 250) = 2.02$。✓
:::
:::

::: exercise 惯性耦合 {level=2}
利用$I_{xz} = 0$时的[[#eq-moment]]，证明以$p$稳定滚转、并有小偏航角速度$r$的战斗机会受到俯仰角加速度$\dot q = (I_z - I_x)pr/I_y$，并在没有气动俯仰力矩的情况下，对$I_x = 2.5\times10^{4}$、$I_y = 1.6\times10^{5}$、$I_z = 1.8\times10^{5}\ \mathrm{kg\,m^2}$、$p = 3\ \mathrm{rad/s}$、$r = 0.1\ \mathrm{rad/s}$估算其数值。
::: solution
$M = 0$、$I_{xz} = 0$时的俯仰方程：$I_y\dot q + (I_x - I_z)pr = 0$，故$\dot q = (I_z - I_x)pr/I_y = (1.8\times10^{5} - 2.5\times10^{4}) \times 0.3/1.6\times10^{5} = 0.29\ \mathrm{rad/s^2}$——约$17^\circ/\mathrm{s^2}$，与升降舵的全部操纵能力相当。对于质量集中在机身的细长飞机（$I_x \ll I_z$），快速滚转会产生很大的俯仰和偏航力矩，这是线性解耦理论无法描述的。
:::
:::

::: exercise 特征多项式 {level=3}
用计算机或手算，求[[#ex-a-long]]中矩阵的特征多项式$\det(s\mathbf I - \mathbf A_{\text{long}})$，并证明它近似分解为$(s^2 + 0.708s + 0.848)(s^2 + 0.00314s + 0.00324)$。
::: solution
展开行列式（或用`numpy.poly`）得$s^4 + 0.7114s^3 + 0.8534s^2 + 0.004960s + 0.002747$。把建议的因式相乘：$s^4 + (0.708 + 0.00314)s^3 + (0.848 + 0.708 \times 0.00314 + 0.00324)s^2 + (0.708 \times 0.00324 + 0.848 \times 0.00314)s + 0.848 \times 0.00324 = s^4 + 0.7111s^3 + 0.8535s^2 + 0.004957s + 0.002748$——每个系数的吻合程度都在约$1\,\%$以内。两个固有频率（$0.92$和$0.057\ \mathrm{rad/s}$）相差悬殊，这使得两模态分解成为可能，也是[[flight-mechanics/dynamic-modes]]中短周期近似和长周期近似的基础。
:::
:::

::: exercise 选择仿真模型 {level=3}
一个团队要建造一台模拟器，用于评估 (a) 巡航中自动驾驶仪的高度保持性能，(b) 从$90^\circ$坡度异常姿态中改出，以及 (c) 一架特技飞机在垂直爬升中做滚转。对每一项，说明应使用本讲中的哪些方程（线性还是非线性，解耦还是耦合，欧拉角还是四元数），说明理由，并列出所需的主要数据。
::: solution
(a) 巡航中的高度保持涉及围绕定常水平飞行的小扰动：加入$\Delta h$作为第五个状态（$\Delta\dot h = u_0\Delta\theta - \Delta w$）的线性纵向模型[[#eq-a-long]]足以用于控制设计；数据：巡航状态下的纵向稳定性导数与操纵导数，发动机推力响应。最后在非线性模型上验证。(b) $90^\circ$坡度不是小扰动：横向运动与纵向运动之间的耦合（升力倾斜、机头下沉）是本质性的——使用完整的非线性六自由度方程[[#eq-force]]–[[#eq-moment]]，采用欧拉角（不涉及垂直飞行），以及覆盖大范围$\alpha$、$\beta$和角速度（包括失速附近）的气动数据。(c) 垂直飞行使欧拉角运动学奇异：用四元数表示姿态；使用含$I_{xz}$的完整非线性耦合方程，包括滚转中的惯性耦合，以及发动机反扭矩和陀螺效应；大迎角和大侧滑角下的气动数据。在所有情况下，好的回答都会提到用飞行试验数据验证模型。
:::
:::
