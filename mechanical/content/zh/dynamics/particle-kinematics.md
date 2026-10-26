静力学问的是哪些力使物体保持静止。动力学问的是一组力产生怎样的运动——或者，其反问题，也是更常见的工程问题：一个已知的运动需要哪些力。机器所做的几乎每一件事都是一个动力学问题：必须按连杆的惯性来定尺寸的曲柄、必须在两秒内加速一吨载荷的升降电机、必须不允许从动件在$3000\ \mathrm{rpm}$下浮空的凸轮、必须不侧滑的转弯汽车、其整定时间决定生产节拍的机器人手臂、其翼面尺寸由必须多快转弯决定的导弹。

这门学科划分得很干净。**运动学**描述运动——位置、速度、加速度——而不问它由什么引起，它是几何的一个分支，而不是物理。**动力学**通过牛顿（Newton）第二定律把运动与力联系起来。本讲通篇是运动学，值得慢慢学，因为十个动力学问题里有九个不是丢在$F = ma$上，而是丢在把加速度算错上。

::: warning 加速度不是速率的变化率
速率是$\left| \mathbf{v} \right|$；速度是$\mathbf{v}$。一个沿圆周以恒定速率运动的质点，速率的变化率为零，而加速度为$v^{2} / r$。反过来，一个处于静止瞬时的质点可以有任意大的加速度：抛到最高点的小球有$v = 0$而$a = 9.81\ \mathrm{m / s^{2}}$向下；活塞在上止点处速度反向，故$v = 0$，而其加速度为$r \omega^{2}$，指向曲柄中心——是整个循环中的最大值。因为$v = 0$就令$a = 0$，是整个动力学中最常见的单个错误。
:::

## 直线运动

::: definition 直线运动学 {#def-rectilinear}
沿固定直线运动，位置为$s (t)$，
$$
v = \frac{\mathrm{d} s}{\mathrm{d} t}, \qquad
a = \frac{\mathrm{d} v}{\mathrm{d} t} = \frac{\mathrm{d}^{2} s}{\mathrm{d} t^{2}} = v \frac{\mathrm{d} v}{\mathrm{d} s} .
$$
最后一个形式$a \, \mathrm{d} s = v \, \mathrm{d} v$是加速度给定为位置的函数时应使用的形式。对**恒定**加速度，
$$
v = v_0 + a t, \qquad
s = s_0 + v_0 t + \tfrac{1}{2} a t^{2}, \qquad
v^{2} = v_0^{2} + 2 a \left( s - s_0 \right), \qquad
s = s_0 + \tfrac{1}{2} \left( v_0 + v \right) t .
$$
平均速度为$\left( v_0 + v \right) / 2$，**仅当**$a$为常数。
:::

::: example 多项式运动 {#ex-polynomial}
一个质点的运动为$s = 2 t^{3} - 9 t^{2} + 12 t + 3\ \mathrm{m}$，其中$t$以秒计。求速度为零的时刻、前$3\ \mathrm{s}$内走过的总路程，以及$t = 3\ \mathrm{s}$时的加速度。
::: solution
$$
v = 6 t^{2} - 18 t + 12 = 6 \left( t - 1 \right) \left( t - 2 \right)\ \mathrm{m / s}, \qquad
a = 12 t - 18\ \mathrm{m / s^{2}} .
$$
**转折点。**$v = 0$在$t = 1\ \mathrm{s}$和$t = 2\ \mathrm{s}$，有
$$
s (0) = 3, \quad s (1) = 8, \quad s (2) = 7, \quad s (3) = 12\ \mathrm{m}.
$$
**总路程。**质点先移动$+ 5\ \mathrm{m}$，再移动$- 1\ \mathrm{m}$，再移动$+ 5\ \mathrm{m}$：
$$
d = 5 + 1 + 5 = 11\ \mathrm{m},
$$
而位移只有$12 - 3 = 9\ \mathrm{m}$。
**$t = 3\ \mathrm{s}$时的加速度：**$a = 36 - 18 = 18\ \mathrm{m / s^{2}}$。

**校核。**$t = 1$时，$a = - 6\ \mathrm{m / s^{2}} < 0$，且$v$由正变负——$s$的极大值，一致。$t = 2$时，$a = + 6$，$v$由负变正——极小值。$\checkmark$

**合理性检验。**这里路程与位移相差$22$个百分点；而在往复机械中，二者相差两倍甚至更多：活塞每转走过$4$倍行程的路程，而每转的位移为零。凡是题目要求路程而不是位移的问题，第一件事就是解$v = 0$，并检查解是否落在时间段内。
:::
:::

::: example 加速度作为位置的函数 {#ex-a-of-s}
一个滑块以$300\ \mathrm{m / s}$进入油阻尼器，以$a = - k v^{2}$减速，其中$k = 0.005\ \mathrm{m^{-1}}$。求它走过$200\ \mathrm{m}$后的速率和所用的时间。
::: solution
用$a = v \, \mathrm{d} v / \mathrm{d} s$：
$$
v \frac{\mathrm{d} v}{\mathrm{d} s} = - k v^{2}
\quad\Longrightarrow\quad
\frac{\mathrm{d} v}{v} = - k \, \mathrm{d} s
\quad\Longrightarrow\quad
v = v_0 e^{- k s} .
$$
$$
v = 300 \, e^{-0.005 \times 200} = 300 \, e^{-1} = 110.4\ \mathrm{m / s}.
$$
求时间，用$a = \mathrm{d} v / \mathrm{d} t$：
$$
\frac{\mathrm{d} v}{\mathrm{d} t} = - k v^{2}
\quad\Longrightarrow\quad
\frac{1}{v} = \frac{1}{v_0} + k t
\quad\Longrightarrow\quad
v = \frac{v_0}{1 + k v_0 t} ,
$$
$$
110.4 = \frac{300}{1 + 1.5 t}
\quad\Longrightarrow\quad
t = \frac{2.718 - 1}{1.5} = 1.145\ \mathrm{s}.
$$
**校核。**$s = \int_0^t v \, \mathrm{d} t = \dfrac{1}{k} \ln \left( 1 + k v_0 t \right) = 200 \ln 2.718 = 200\ \mathrm{m}$。$\checkmark$

**合理性检验。**注意两次积分给出**不同的**函数形式——对距离是指数，对时间是双曲——用错其一是经典错误。规则是：给定$a (s)$，用$v \, \mathrm{d} v = a \, \mathrm{d} s$积分；给定$a (t)$，对$t$积分两次；给定$a (v)$，分离变量$\mathrm{d} v / a (v) = \mathrm{d} t$或$v \, \mathrm{d} v / a (v) = \mathrm{d} s$。二次阻力律是三种形式互不相同的标准情形，也是一颗子弹在$500\ \mathrm{m}$处的剩余速度无法用匀加速公式以任何精度求出的原因。
:::
:::

::: widget plot
f: 2*x^3-9*x^2+12*x+3
x: 0, 3
y: 0, 13
labels: \text{位置 } s \text{ (m)}
caption: 例1中质点的位置随时间的变化。曲线在$t = 1\ \mathrm{s}$上升到极大值$8\ \mathrm{m}$，在$t = 2\ \mathrm{s}$下降到$7\ \mathrm{m}$，在$t = 3\ \mathrm{s}$升到$12\ \mathrm{m}$；两个转折点就是速度变号之处，总路程$11\ \mathrm{m}$比位移$9\ \mathrm{m}$多出的正是向下那一段的$2\ \mathrm{m}$。从位置-时间图像上把$v = 0$读成极大值或极小值，而不去解速度方程，恰恰就是找出机器死点的方法。
:::

## 曲线运动：三种坐标系

::: definition 直角坐标、法-切坐标与极坐标 {#def-coordinate-systems}
**直角坐标。**$\mathbf{r} = x \mathbf{i} + y \mathbf{j}$，$\mathbf{v} = \dot{x} \mathbf{i} + \dot{y} \mathbf{j}$，$\mathbf{a} = \ddot{x} \mathbf{i} + \ddot{y} \mathbf{j}$。当$x$和$y$各自独立给出时使用，如抛体运动。

**法向与切向。**对沿已知路径运动、曲率半径为$\rho$的质点，
$$
\mathbf{v} = v \mathbf{e}_t, \qquad
\mathbf{a} = \underbrace{\dot{v}}_{a_t} \mathbf{e}_t + \underbrace{\frac{v^{2}}{\rho}}_{a_n} \mathbf{e}_n .
$$
当**路径已知**、要求切向加速度或总加速度时使用。$y = f (x)$的曲率为
$$
\frac{1}{\rho} = \frac{\left| y^{\prime \prime} \right|}{\left[ 1 + y^{\prime 2} \right]^{3 / 2}} .
$$

**极坐标。**$\mathbf{r} = r \mathbf{e}_r$，其中$\mathbf{e}_r$以$\dot{\theta}$转动，
$$
\mathbf{v} = \dot{r} \mathbf{e}_r + r \dot{\theta} \mathbf{e}_\theta, \qquad
\mathbf{a} = \left( \ddot{r} - r \dot{\theta}^{2} \right) \mathbf{e}_r
+ \left( r \ddot{\theta} + 2 \dot{r} \dot{\theta} \right) \mathbf{e}_\theta .
$$
当质点被约束沿一条**转动**的路径运动，或数据以$r (t)$和$\theta (t)$给出时使用。项$2 \dot{r} \dot{\theta}$是**科里奥利**加速度，$- r \dot{\theta}^{2}$是向心项。
:::

::: proof 法向与切向分量 {#proof-nt}
对$\mathbf{v} = v \mathbf{e}_t$求导：
$$
\mathbf{a} = \dot{v} \mathbf{e}_t + v \dot{\mathbf{e}}_t .
$$
质点从$P$移到$P^{\prime}$时，单位切向量转过$\mathrm{d} \theta$而长度不变，故$\left| \mathrm{d} \mathbf{e}_t \right| = \mathrm{d} \theta$，方向沿内法线$\mathbf{e}_n$，于是
$$
\dot{\mathbf{e}}_t = \frac{\mathrm{d} \theta}{\mathrm{d} t} \mathbf{e}_n
= \frac{\mathrm{d} \theta}{\mathrm{d} s} \frac{\mathrm{d} s}{\mathrm{d} t} \mathbf{e}_n
= \frac{1}{\rho} v \mathbf{e}_n ,
$$
这里用到由曲率的定义有$\mathrm{d} s = \rho \, \mathrm{d} \theta$。因此
$$
\mathbf{a} = \dot{v} \mathbf{e}_t + \frac{v^{2}}{\rho} \mathbf{e}_n .
$$
两个分量按构造正交，故$a = \sqrt{a_t^{2} + a_n^{2}}$，而$a_n$只在直线路径上或速率为零的瞬时为零。
:::

::: proof 极坐标加速度 {#proof-polar}
转动的单位向量满足$\dot{\mathbf{e}}_r = \dot{\theta} \mathbf{e}_\theta$和$\dot{\mathbf{e}}_\theta = - \dot{\theta} \mathbf{e}_r$。对$\mathbf{v} = \dot{r} \mathbf{e}_r + r \dot{\theta} \mathbf{e}_\theta$求导，
$$
\mathbf{a} = \ddot{r} \mathbf{e}_r + \dot{r} \dot{\theta} \mathbf{e}_\theta
+ \left( \dot{r} \dot{\theta} + r \ddot{\theta} \right) \mathbf{e}_\theta
+ r \dot{\theta} \left( - \dot{\theta} \mathbf{e}_r \right),
$$
合并即得所述结果。科里奥利项$2 \dot{r} \dot{\theta}$的一个因子来自径向速度方向的改变，另一个来自$r$增大时横向速度大小的改变——它不是一种额外的物理力，而是在转动基下求导的记账结果。
:::

::: example 转动杆上的套筒 {#ex-polar}
一个套筒沿一根杆滑动，杆的角度为$\theta = 0.5 t^{2}\ \mathrm{rad}$，径向位置为$r = 0.4 - 0.1 t^{2}\ \mathrm{m}$。求$t = 1\ \mathrm{s}$时的加速度。
::: solution
$$
r = 0.3, \quad \dot{r} = - 0.2 t = - 0.2, \quad \ddot{r} = - 0.2\ \mathrm{m},
$$
$$
\theta = 0.5, \quad \dot{\theta} = t = 1.0, \quad \ddot{\theta} = 1.0\ \mathrm{rad / s^{2}} .
$$
$$
a_r = \ddot{r} - r \dot{\theta}^{2} = - 0.2 - 0.3 \times 1.0^{2} = - 0.500\ \mathrm{m / s^{2}},
$$
$$
a_\theta = r \ddot{\theta} + 2 \dot{r} \dot{\theta} = 0.3 \times 1.0 + 2 \left( - 0.2 \right) \times 1.0 = - 0.100\ \mathrm{m / s^{2}},
$$
$$
a = \sqrt{0.500^{2} + 0.100^{2}} = 0.510\ \mathrm{m / s^{2}},
$$
方向与向内径向方向成$\tan^{-1} \left( 0.100 / 0.500 \right) = 11.3^{\circ}$。

**校核。**仅科里奥利项就有$2 \times 0.2 \times 1.0 = 0.400\ \mathrm{m / s^{2}}$，与整个径向加速度相当——丢掉它会得到$a_r = - 0.5$和$a_\theta = + 0.3$，答案在**方向**和大小上都错。$\checkmark$

**合理性检验。**这就是转动臂上的凸轮-从动件、伸缩式机器人手臂、带滑动转杯的离心机，以及转动钢丝上珠子的经典问题背后的计算。注意科里奥利分量垂直于滑动速度，所以它永远不做功——这就是科氏质量流量计能工作的原因：流动产生横向加速度，从而产生横向力，它与质量流量成正比，而与流体的速度剖面、密度或黏度无关。
:::
:::

::: theorem 抛体运动 {#thm-projectile}
一个质点以速率$v_0$、角度$\theta$从水平地面抛出，只受重力，其轨迹为
$$
y = x \tan \theta - \frac{g x^{2}}{2 v_0^{2} \cos^{2} \theta},
$$
一条抛物线，飞行时间、射程和最大高度为
$$
T = \frac{2 v_0 \sin \theta}{g}, \qquad
R = \frac{v_0^{2} \sin 2 \theta}{g}, \qquad
h = \frac{v_0^{2} \sin^{2} \theta}{2 g} .
$$
轨迹**与质量无关**，任意高度处的速率只取决于该高度：
$$
v^{2} = v_0^{2} - 2 g y .
$$
:::

::: proof
取$a_x = 0$和$a_y = - g$，
$$
x = v_0 \cos \theta \, t, \qquad y = v_0 \sin \theta \, t - \tfrac{1}{2} g t^{2} .
$$
消去$t = x / \left( v_0 \cos \theta \right)$即得抛物线。令$y = 0$得$T$；代入得$R = v_0^{2} \sin 2 \theta / g$，其中用了$2 \sin \theta \cos \theta = \sin 2 \theta$。高度由顶点处$v_y = 0$得$t = v_0 \sin \theta / g$。速率关系由$v_x^{2} + v_y^{2} = v_0^{2} \cos^{2} \theta + \left( v_0 \sin \theta - g t \right)^{2}$和$y$的表达式得到。
:::

::: example 曲柄滑块机构的运动学 {#ex-slider-crank}
一台发动机曲柄半径$60\ \mathrm{mm}$，连杆长$240\ \mathrm{mm}$，转速$3000\ \mathrm{rpm}$。求活塞的最大加速度和速率，以及平均活塞速度。
::: solution
$\omega = 2 \pi \times 3000 / 60 = 314.2\ \mathrm{rad / s}$，$\lambda = r / l = 0.25$。相对上止点的活塞加速度，对$\lambda$取到二阶为
$$
a \approx - r \omega^{2} \left( \cos \theta + \lambda \cos 2 \theta \right),
$$
**上止点处**，$\theta = 0$：
$$
a = - 0.06 \times 314.2^{2} \times 1.25 = - 7400\ \mathrm{m / s^{2}} = - 755 \ g .
$$
**$90^{\circ}$处**，$a = - 0.06 \times 98\,696 \times \left( 0 - 0.25 \right) = + 1480\ \mathrm{m / s^{2}}$。
**速度**，$v \approx - r \omega \left( \sin \theta + \tfrac{1}{2} \lambda \sin 2 \theta \right)$，在$\theta = 75^{\circ}$附近达到峰值：
$$
v_{\max} = 0.06 \times 314.2 \times \left( 0.966 + 0.125 \times 0.5 \right) = 19.4\ \mathrm{m / s}.
$$
**平均活塞速度**，行程$2 r = 120\ \mathrm{mm}$，每秒$50$转：
$$
\bar{v} = 2 \times 0.12 \times 50 = 12.0\ \mathrm{m / s}.
$$
**合理性检验。**每个发动机设计师都记在心中的三个数字。$755 \ g$的峰值加速度出现在上止点，而那里活塞速度为**零**——连杆大端载荷恰恰在活塞瞬时静止处最大，这就是活塞销双向受力的原因，也是二阶项$\lambda \cos 2 \theta$使高转速发动机的连杆载荷在做功冲程与排气冲程之间不对称的原因。$12\ \mathrm{m / s}$的平均活塞速度是传统的发动机转速极限指标，量产汽油机的实际上限为$20$到$25\ \mathrm{m / s}$，限制它的不是活塞的强度，而是惯性力，惯性力按$r \omega^{2}$缩放，因而按转速的**平方**缩放。
:::
:::

::: example 带阻力的下落 {#ex-drag}
一个冰雹从静止开始在静空气中下落，达到$40\ \mathrm{m / s}$的终端速率。求它下落多远后速率进入终端速率的$5$个百分点以内、所用时间，以及下落$500\ \mathrm{m}$后的速率。
::: solution
二次阻力下方程为$\dot{v} = g \left( 1 - v^{2} / v_T^{2} \right)$，从静止出发的解为
$$
v = v_T \tanh \frac{g t}{v_T}, \qquad
y = \frac{v_T^{2}}{g} \ln \cosh \frac{g t}{v_T}, \qquad
v = v_T \sqrt{1 - e^{- 2 g y / v_T^{2}}} .
$$
**$v = 0.95 \, v_T$所需距离。**由最后一个关系，
$$
0.95^{2} = 1 - e^{- 2 g y / v_T^{2}}
\quad\Longrightarrow\quad
e^{- 2 g y / v_T^{2}} = 0.0975, \quad \frac{2 g y}{v_T^{2}} = 2.328 ,
$$
$$
y = \frac{2.328 \times 40^{2}}{2 \times 9.81} = 190\ \mathrm{m}.
$$
**时间。**$\tanh \left( g t / v_T \right) = 0.95$给出$g t / v_T = 1.832$，
$$
t = \frac{1.832 \times 40}{9.81} = 7.47\ \mathrm{s}.
$$
**$500\ \mathrm{m}$后：**
$$
v = 40 \sqrt{1 - e^{- 2 \times 9.81 \times 500 / 1600}} = 40 \sqrt{1 - 0.0022} = 39.96\ \mathrm{m / s}.
$$
**校核。**在$7.47\ \mathrm{s}$内，自由落体的物体将下落$\tfrac{1}{2} g t^{2} = 273\ \mathrm{m}$并达到$73\ \mathrm{m / s}$；阻力使它损失了$30$个百分点的距离和$45$个百分点的速率。$\checkmark$

**合理性检验。**冰雹到$200\ \mathrm{m}$处实际上已达到终端速率，这就是大冰雹会损坏屋顶却伤不到在云底以下巡航的飞机的原因，也是从高楼落下的猫能幸存的原因：猫的终端速率约为$60\ \mathrm{km / h}$，在$4$到$5$层楼后达到，所以再高也不会更糟。二次阻力的一般规律是，物体在约$v_T^{2} / g$的距离和约$v_T / g$的时间内损失掉大部分速度亏损——这两个尺度使这一类问题无量纲化。
:::
:::

::: example 沿螺旋线的运动 {#ex-helix}
滚珠丝杠的丝杠半径$50\ \mathrm{mm}$、导程$20\ \mathrm{mm}$，以$600\ \mathrm{rpm}$转动，螺母沿丝杠移动。求循环滚珠的速率和法向加速度。
::: solution
把运动写成螺旋线：$r = 0.05\ \mathrm{m}$恒定，$\dot{\theta} = 2 \pi \times 600 / 60 = 62.83\ \mathrm{rad / s}$，$\dot{z} = \left( 0.02 / 2 \pi \right) \dot{\theta} = 0.200\ \mathrm{m / s}$。
$$
v_\theta = r \dot{\theta} = 3.142\ \mathrm{m / s}, \qquad
v = \sqrt{v_\theta^{2} + v_z^{2}} = \sqrt{9.872 + 0.040} = 3.148\ \mathrm{m / s},
$$
$$
a_n = \frac{v_\theta^{2}}{r} = \frac{9.872}{0.05} = 197\ \mathrm{m / s^{2}} = 20.1 \ g .
$$
**校核。**螺旋线的曲率为$\kappa = r / \left( r^{2} + c^{2} \right)$，其中$c = 0.02 / 2 \pi = 3.183 \times 10^{-3}\ \mathrm{m}$，得$\rho = \left( 0.0025 + 1.013 \times 10^{-5} \right) / 0.05 = 0.0502\ \mathrm{m}$，$a_n = v^{2} / \rho = 9.912 / 0.0502 = 197\ \mathrm{m / s^{2}}$。$\checkmark$

**合理性检验。**$20 \ g$的法向加速度正是循环式滚珠丝杠螺母中滚珠实际经历的载荷，这就是返向通道要做得宽大的原因，是滚珠用钢或陶瓷而不用聚合物的原因，也是滚珠丝杠的转速极限由滚珠在螺母中的离心载荷而不是丝杠的转速决定的原因。另注意轴向运动对加速度的贡献几乎为零——$v_z$是$v_\theta$的$6$个百分点而$\dot{v}_z$为零——这是小导程螺旋线的一般结果：运动本质上是一个转动叠加一个缓慢的平动。
:::
:::

## 应用：倾斜弯道

::: example 最大转弯速率 {#ex-cornering}
一辆汽车在半径$60\ \mathrm{m}$的未倾斜路面上转弯，轮胎与路面间的摩擦因数为$0.8$。求最大速率。然后对同一弯道取$10^{\circ}$倾斜重复计算。
::: solution
**未倾斜。**唯一的水平力是摩擦，故
$$
\mu m g = \frac{m v^{2}}{r}
\quad\Longrightarrow\quad
v = \sqrt{\mu g r} = \sqrt{0.8 \times 9.81 \times 60} = 21.7\ \mathrm{m / s} = 78\ \mathrm{km / h}.
$$
**倾斜、无摩擦。**沿垂直路面方向分解得$N \sin \theta = m v^{2} / r$和$N \cos \theta = m g$，故
$$
v = \sqrt{g r \tan \theta} = \sqrt{9.81 \times 60 \times 0.1763} = 10.2\ \mathrm{m / s}.
$$
**倾斜且有摩擦**，在极限状态，
$$
v = \sqrt{g r \frac{\tan \theta + \mu}{1 - \mu \tan \theta}}
= \sqrt{588.6 \times \frac{0.9763}{0.8590}} = 25.9\ \mathrm{m / s} = 93\ \mathrm{km / h}.
$$
**校核。**$\theta = 0$时，倾斜公式化为$\sqrt{\mu g r}$，即未倾斜的答案。$\checkmark$

**合理性检验。**$10^{\circ}$的倾斜把极限从$78$提高到$93\ \mathrm{km / h}$，提高$19$个百分点，而且没有动用任何额外的摩擦——公路弯道的“设计速度”是**完全不需要**横向摩擦时的速度，这就是高速公路弯道的超高按卡车行驶的速度而不是按跑车赶到的速度设置的原因。另注意分母$1 - \mu \tan \theta$：当倾斜趋陡、$\tan \theta = 1 / \mu = 1.25$（$51^{\circ}$）时，允许速率趋于无穷，这就是死亡壁谷的物理，也是自行车馆$45^{\circ}$的倾斜能让骑手在半径$60\ \mathrm{m}$的弯道上以$70\ \mathrm{km / h}$转弯而几乎不需要侧向摩擦的原因。
:::
:::

::: warning 曲线坐标系是选出来的，不是给定的
没有“正确”的坐标系，只有使代数变小的坐标系。当路径已知、要求加速度时用**法-切坐标**；当几何由一个固定点的角度和半径描述、或一个构件沿另一个转动的构件滑动时用**极坐标**；当各分量相互独立（如抛体运动）时用**直角坐标**。用错误坐标系求解的问题不算错，只是长四倍——而用忘记对单位向量求导的坐标系求解的问题就是错的，而且错得再怎么检查算术也发现不了。在对任何东西求导之前，永远先写下你所选基的$\dot{\mathbf{e}}$。
:::

::: history
运动学是被发明了两次的。伽利略（Galileo）1638年的《关于两门新科学的对话》（*Discorsi*）确立了匀加速落体、作为水平匀速运动与竖直加速运动合成的抛物线轨迹，以及——对本讲最重要的——运动由可以独立于其成因来测量的量来描述的思想。笛卡儿（Descartes）在1637年提供了坐标，1644年提供了速度的合成。牛顿（Newton）1687年的《原理》（*Principia*）给出了动力学；欧拉（Euler）在1750年代把刚体运动的描述分解为平动和转动，并引入了使三维运动学可解的空间坐标轴与本体坐标轴。**内禀**的或法-切的表述，即加速度用路径的曲率而不是任何坐标系来书写，归功于法国学派——1810年前后的塞尔瓦（Servois）和比内（Binet），随后是柯西（Cauchy）和贝特朗（Bertrand），贝特朗$1847$年关于动三棱形导数的公式至今仍是标准表述。**科里奥利**项来自加斯帕尔-古斯塔夫·科里奥利（Gaspard-Gustave Coriolis）1835年关于运动机器中力的效应计算的论文，其地球物理后果——风、洋流、远程炮弹和河道的偏转——由拉普拉斯（Laplace）、泊松（Poisson）和傅科（Foucault）在1850年代阐明。机器的实用运动学，即连杆机构的速度与加速度图，是一门十九世纪的工程学科，由威利斯（Willis）、肯尼迪（Kennedy）和勒洛（Reuleaux）在1841年至1875年间建立形式。
:::

## 后续内容

同样的三种坐标系在[[dynamics/newtons-laws]]中作为书写$\sum \mathbf{F} = m \mathbf{a}$的参考系重新出现，极坐标和转动参考系的结果则构成[[dynamics/three-dimensional-dynamics]]的全部内容。抛体运动和轨道运动在[[orbital-mechanics/two-body-problem]]中讨论，曲率公式在[[dynamics/rigid-body-kinematics]]中为速度瞬心再次用到，而这些方程在无法求出封闭形式解时的数值积分本身是一个专门的主题。

::: summary
- 当加速度给定为位置的函数时，应使用$a = v \, \mathrm{d} v / \mathrm{d} s$；匀加速公式只在$a$真正恒定时才成立。
- 路程是$\left| v \right|$的积分；凡是要求路径长度的问题，先解$v = 0$。
- 在曲线路径上$\mathbf{a} = \dot{v} \mathbf{e}_t + \left( v^{2} / \rho \right) \mathbf{e}_n$：只要有曲率和速率，法向分量就存在，无论速率的变化率如何。
- 极坐标下加速度为$\left( \ddot{r} - r \dot{\theta}^{2} \right) \mathbf{e}_r + \left( r \ddot{\theta} + 2 \dot{r} \dot{\theta} \right) \mathbf{e}_\theta$；科里奥利项常常是最大的单个贡献。
- 坐标系要由路径的几何来选择，而不是由题目的措辞来决定。
:::

::: quiz
一个质点的速率瞬时为零。下列哪项必然成立？
- [ ] 它的加速度也为零
- [ ] 它位于其位置$s (t)$的极大值处
- [x] 关于它的加速度什么也推不出
- [ ] 它的总路程为零
::: solution
关于加速度什么也推不出。$v = 0$是关于$s$的一阶导数的一个陈述；加速度是二阶导数，与它无关。抛到最高点的小球有$v = 0$而$a = - g$。上止点的活塞有$v = 0$而$a = r \omega^{2}$指向曲柄。一个瞬时静止于$s = 0$的质点可以有任何加速度。$v = 0$唯一能告诉你的只是$s$取驻值——即便如此，它也可能是拐点而不是极大值，$s = t^{3}$在$t = 0$处就是如此。
:::
:::

## 习题

::: exercise 平均量 {level=1 check="-9"}
一个质点的位置为$s = t^{3} - 6 t^{2}\ \mathrm{m}$。求从$t = 0$到$t = 3\ \mathrm{s}$的平均速度。
::: solution
$s (0) = 0$，$s (3) = 27 - 54 = - 27\ \mathrm{m}$，故$v_{\text{avg}} = - 27 / 3 = - 9\ \mathrm{m / s}$。
**注。**平均**速率**不同：$v = 3 t^{2} - 12 t$在$t = 4$处为零，位于区间之外，所以质点从不调头，平均速率为$9\ \mathrm{m / s}$。
:::
:::

::: exercise 匀加速 {level=1 check="7.72"}
一辆汽车从$100\ \mathrm{km / h}$开始匀减速刹车，在$50\ \mathrm{m}$内停下。求减速度，单位$\mathrm{m / s^{2}}$。
::: solution
$v_0 = 27.78\ \mathrm{m / s}$，由$0 = v_0^{2} - 2 a s$得$a = 27.78^{2} / \left( 2 \times 50 \right) = 7.72\ \mathrm{m / s^{2}}$，即$0.79 g$。
**注。**应输入的答案是$7.72$。制动距离按$v^{2}$缩放，这就是$100\ \mathrm{km / h}$时的$50\ \mathrm{m}$在$50\ \mathrm{km / h}$时变成$12.5\ \mathrm{m}$的原因，也是学校附近的限速是一项背后有平方因子的道路安全措施的原因。
:::
:::

::: exercise 法向加速度 {level=1 check="22.4"}
一个质点以$10\ \mathrm{m / s}$沿半径$5\ \mathrm{m}$的路径运动，同时以$10\ \mathrm{m / s^{2}}$加速。求其总加速度的大小。
::: solution
$a_n = 10^{2} / 5 = 20\ \mathrm{m / s^{2}}$，$a_t = 10\ \mathrm{m / s^{2}}$，故
$$
a = \sqrt{20^{2} + 10^{2}} = 22.4\ \mathrm{m / s^{2}},
$$
与切线成$\tan^{-1} \left( 20 / 10 \right) = 63.4^{\circ}$。
**注。**答案是$22.4\ \mathrm{m / s^{2}}$，是切向值的两倍多：在这个速率下，路径的曲率占主导。
:::
:::

::: exercise 曲率 {level=2}
一列火车以$120\ \mathrm{km / h}$驶过剖面为$y = x^{2} / 2000$（米）的凸丘顶点。求顶点处的法向加速度，以及车轮离开钢轨时的速率。
::: solution
顶点处$x = 0$，$y^{\prime} = 0$，$y^{\prime \prime} = 1 / 1000$，故$\rho = 1 / y^{\prime \prime} = 1000\ \mathrm{m}$。
$$
a_n = \frac{v^{2}}{\rho} = \frac{33.33^{2}}{1000} = 1.11\ \mathrm{m / s^{2}} = 0.113 g .
$$
车轮抬起时$a_n = g$：
$$
v = \sqrt{g \rho} = \sqrt{9.81 \times 1000} = 99.0\ \mathrm{m / s} = 357\ \mathrm{km / h}.
$$
**合理性检验。**$120\ \mathrm{km / h}$时轮重减少$0.11 g$，这就是火车的黏着和乘坐舒适性都会在凸丘顶点变差的原因，也是轨道的竖向曲率由约$0.3\ \mathrm{m / s^{2}}$未平衡法向加速度的**舒适性**标准而不是由高得多的离轨速度限制的原因。同样的公式决定过山车越过山丘的最大速度，以及道路设计中凹形竖曲线的最小半径。
:::
:::

::: exercise 极坐标 {level=2}
一个质点以$r = 0.5 \cos \theta$和恒定$\dot{\theta} = 3\ \mathrm{rad / s}$运动。求$\theta = 0$处的径向和横向加速度。
::: solution
由$\ddot{\theta} = 0$和$r = 0.5 \cos \theta$：
$$
\dot{r} = - 0.5 \sin \theta \times \dot{\theta} = - 1.5 \sin \theta, \qquad
\ddot{r} = - 1.5 \cos \theta \times \dot{\theta} = - 4.5 \cos \theta,
$$
故在$\theta = 0$处，$r = 0.5$，$\dot{r} = 0$，$\ddot{r} = - 4.5$，从而
$$
a_r = - 4.5 - 0.5 \times 9 = - 9.0\ \mathrm{m / s^{2}}, \qquad
a_\theta = 0 + 0 = 0 .
$$
**校核。**路径$r = 0.5 \cos \theta$是一个过原点、直径$0.5\ \mathrm{m}$的圆，其圆心在$r = 0.25$处。$\theta = 0$时质点位于该圆的最远端，加速度必须指向圆心——即纯粹沿径向向内，与所求一致。其大小应为$v^{2} / \rho$，其中$v = r \dot{\theta} = 1.5\ \mathrm{m / s}$，$\rho = 0.25\ \mathrm{m}$：$1.5^{2} / 0.25 = 9.0\ \mathrm{m / s^{2}}$。$\checkmark$
:::
:::

::: exercise 抛体 {level=2}
一个球以$20\ \mathrm{m / s}$、$35^{\circ}$在水平地面上被踢出。求射程、最大高度和飞行时间。什么抛射角使射程最大？什么角使高度最大？
::: solution
$$
R = \frac{v_0^{2} \sin 2 \theta}{g} = \frac{400 \times \sin 70^{\circ}}{9.81} = 38.3\ \mathrm{m},
$$
$$
h = \frac{v_0^{2} \sin^{2} \theta}{2 g} = \frac{400 \times 0.3290}{19.62} = 6.71\ \mathrm{m}, \qquad
T = \frac{2 v_0 \sin \theta}{g} = 2.34\ \mathrm{s}.
$$
射程在$\theta = 45^{\circ}$最大，高度在$\theta = 90^{\circ}$最大。
**合理性检验。**$45^{\circ}$的答案只对抛出点与落地点同高且无阻力成立。有阻力时，高尔夫球的最优角降到$35$到$40^{\circ}$，子弹约为$30^{\circ}$；而对从高于落地水平面抛出的情形，即使无阻力最优角也低于$45^{\circ}$，为$\theta = \tfrac{1}{2} \cos^{-1} \left( 1 / \left[ 1 + h / R_0 \right] \right)$。凡是答案恰好为$45^{\circ}$的问题，都是你应当检查其假设的问题。
:::
:::

::: exercise 设计 {level=3}
一台立式注塑机必须用梯形速度曲线、以$0.1\ \mathrm{s}$的加速和减速时间，把一个$12\ \mathrm{kg}$的模具组件在$0.6\ \mathrm{s}$内举升$400\ \mathrm{mm}$。求峰值加速度、导轨立柱中的峰值力和峰值功率。
::: solution
加速时间$t_1 = 0.1\ \mathrm{s}$，匀速时间$0.4\ \mathrm{s}$，匀速速度$v$，
$$
s = \tfrac{1}{2} v \left( 0.1 \right) + v \left( 0.4 \right) + \tfrac{1}{2} v \left( 0.1 \right) = 0.5 v = 0.4\ \mathrm{m}
\quad\Longrightarrow\quad
v = 0.8\ \mathrm{m / s},
$$
$$
a = \frac{0.8}{0.1} = 8.0\ \mathrm{m / s^{2}} .
$$
**峰值力。**在向上加速阶段，导轨必须提供重力加惯性力：
$$
F = m \left( g + a \right) = 12 \left( 9.81 + 8.0 \right) = 214\ \mathrm{N}.
$$
**峰值功率。**
$$
P = F v = 214 \times 0.8 = 171\ \mathrm{W},
$$
不过这个峰值出现在加速段末端，此时速度为$0.8\ \mathrm{m / s}$而加速度仍为$8.0\ \mathrm{m / s^{2}}$，所以对梯形曲线两个极大值确实重合。

**设计评注。**注意加速力是重力的$82$个百分点，所以驱动装置按工作周期而不是静载荷选型：按$118\ \mathrm{N}$选的电机会在加速段堵转。另注意**减速**阶段只需要$m \left( g - a \right) = 21.7\ \mathrm{N}$，所以导轨承受载荷反向；若$a$超过$g$，组件将处于自由落体，导轨必须以拉力来承受它——这就是带重头的立式轴总是有平衡、制动器或支撑阀的原因，也是起重机的“超悬载荷”是一个标准安全项目的原因。
:::
:::

::: exercise 推导 {level=3}
推导路径$y = f (x)$的曲率半径表达式，以及沿该路径以恒定$\dot{x} = u$运动的质点的加速度分量，并证明两种方法一致。
::: solution
**曲率。**由$\tan \phi = y^{\prime}$，故$\phi = \tan^{-1} y^{\prime}$，
$$
\frac{\mathrm{d} \phi}{\mathrm{d} x} = \frac{y^{\prime \prime}}{1 + y^{\prime 2}}, \qquad
\frac{\mathrm{d} s}{\mathrm{d} x} = \sqrt{1 + y^{\prime 2}} ,
$$
于是
$$
\frac{1}{\rho} = \frac{\mathrm{d} \phi}{\mathrm{d} s}
= \frac{y^{\prime \prime}}{\left( 1 + y^{\prime 2} \right)^{3 / 2}} .
$$
**直接求导。**由$x = u t$和$y = f (x)$，
$$
\dot{y} = f^{\prime} u, \qquad
\ddot{y} = f^{\prime \prime} u^{2}, \qquad
\mathbf{a} = f^{\prime \prime} u^{2} \mathbf{j},
$$
所以加速度是**竖直的**，大小为$\left| y^{\prime \prime} \right| u^{2}$。

**一致性。**速率为$v = u \sqrt{1 + y^{\prime 2}}$，故
$$
a_n = \frac{v^{2}}{\rho}
= u^{2} \left( 1 + y^{\prime 2} \right) \times \frac{\left| y^{\prime \prime} \right|}{\left( 1 + y^{\prime 2} \right)^{3 / 2}}
= \frac{\left| y^{\prime \prime} \right| u^{2}}{\sqrt{1 + y^{\prime 2}}} ,
$$
而法线方向与竖直方向成角$\phi$，所以竖直加速度分解为
$$
a = \frac{a_n}{\cos \phi}
= \frac{\left| y^{\prime \prime} \right| u^{2}}{\sqrt{1 + y^{\prime 2}}} \times \sqrt{1 + y^{\prime 2}}
= \left| y^{\prime \prime} \right| u^{2} . \checkmark
$$
**评注。**这道习题值得做一遍，因为它揭示了内禀公式掩盖的东西：法向和切向分量取决于沿路径的**速率**，一个质点可以有纯竖直的加速度，同时有非零的切向分量$a_t = \dot{v} = y^{\prime} y^{\prime \prime} u^{2} / \sqrt{1 + y^{\prime 2}}$。两种分解是同一个向量在两个不同基下的分解，它们之间的任何不一致都意味着代数错误，而不是佯谬。
:::
:::
