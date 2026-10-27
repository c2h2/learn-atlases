到目前为止，一切都假定了理想的二体问题：质点（或完美球形）的地球，没有大气，没有月球，也没有太阳。真实的轨道偏离这一理想，而且这些偏离并非只具学术意义。地球的赤道隆起使国际空间站的轨道平面每天转过约五度；没有这一效应，太阳同步对地观测轨道就不可能存在。大气阻力最终使每一颗低轨卫星坠落，并决定了碎片在轨道上停留多久。月球和太阳缓慢地使地球静止轨道倾斜，以至于运营者把大部分推进剂都花在与之对抗上。这些对开普勒运动的偏离称为**摄动**（perturbation）。本章建立受摄运动方程，介绍两种计算方法——直接数值积分和轨道根数的缓慢变化——推导地球扁率最重要的长期效应，用它们设计太阳同步轨道和临界倾角轨道，并估算阻力衰减和轨道寿命。最后比较各主要摄动在不同高度上的大小，告诉设计者哪些摄动是重要的。

背景知识是[[orbital-mechanics/orbital-elements]]中的轨道根数，以及[[orbital-mechanics/two-body-problem]]中关于能量和角动量的结论。

## 受摄二体问题 {#sec-perturbed}

把所有附加加速度归入一个**摄动加速度**$\mathbf{a}_p$，运动方程变为
$$
\ddot{\mathbf{r}} = -\frac{\mu}{r^3}\,\mathbf{r} + \mathbf{a}_p.
$$ {#eq-perturbed}
对于地球卫星，$\mathbf{a}_p$包括地球引力的非球形部分、大气阻力、月球和太阳的引力（以它们对卫星和对地球的引力之差的形式）、太阳辐射压，以及较小的效应（固体潮、相对论效应、推力）。在大多数情况下，$\lVert\mathbf{a}_p\rVert$只是$\mu/r^2$的一小部分，所以轨道在每一时刻都*近似*为开普勒轨道，这一观察引出两类方法。

**特殊摄动法**对[[#eq-perturbed]]进行数值积分。**科威尔（Cowell）法**在直角坐标中用高阶积分器（[常微分方程数值解](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)）直接积分完整方程；它简单，能处理任何力模型，是现代轨道软件的主力。**恩克（Encke）法**只积分相对于参考开普勒轨道的小偏差，从而允许更大的步长，并在偏差增大时**修正**（重置）参考轨道。

**一般摄动法**描述轨道根数在$\mathbf{a}_p$作用下如何缓慢变化。它们给出的是理解而非数字：节点移动多快，为什么某些轨道倾角很特殊，阻力如何使轨道收缩。本章其余部分走的是这条路线。

::: definition 密切根数 {#def-osculating}
在每一时刻，**密切轨道**是假如在该时刻撤去$\mathbf{a}_p$卫星将沿之运动的开普勒轨道；其根数用[[orbital-mechanics/orbital-elements]]中的算法由瞬时状态矢量算出，称为**密切根数**。在摄动作用下它们随时间变化。其变化通常分为**长期**变化（稳定漂移）、**长周期**变化（周期远长于轨道周期）和**短周期**变化（以轨道频率及其倍频变化）。**平均根数**是消去了短周期项的密切根数。
:::

## 高斯摄动方程 {#sec-gauss}

在卫星的 **RSW** 坐标系中分解摄动加速度：$R$沿径向向外，$S$在轨道平面内垂直于$R$、指向运动方向，$W$沿轨道法向，分量为$a_r$、$a_s$、$a_w$。

::: proposition 高斯行星方程（选录） {#prop-gauss}
记$p = h^2/\mu$，$u = \omega + \theta$为纬度幅角，$r = p/(1 + e\cos\theta)$，密切根数的变化率为
$$
\begin{aligned}
\frac{\mathrm{d}a}{\mathrm{d}t} &= \frac{2a^2}{h}\left(e\sin\theta\,a_r + \frac{p}{r}\,a_s\right),\\
\frac{\mathrm{d}e}{\mathrm{d}t} &= \frac{1}{h}\left(p\sin\theta\,a_r + \left[(p + r)\cos\theta + re\right]a_s\right),\\
\frac{\mathrm{d}i}{\mathrm{d}t} &= \frac{r\cos u}{h}\,a_w,\\
\frac{\mathrm{d}\Omega}{\mathrm{d}t} &= \frac{r\sin u}{h\sin i}\,a_w.
\end{aligned}
$$ {#eq-gauss}
（$\omega$和平近点角的方程涉及全部三个分量，见 Vallado 和 Battin 的书。）
:::

::: proof
我们证明第一个和最后两个方程；$e$的方程可由$\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$类似地得出。

**半长轴。**能量$\varepsilon = v^2/2 - \mu/r = -\mu/(2a)$只通过$\mathbf{a}_p$所做的功而变化：$\dot\varepsilon = \mathbf{v}\cdot\mathbf{a}_p = v_ra_r + v_\perp a_s$。由于$\dot\varepsilon = \mu\dot a/(2a^2)$，$\dot a = (2a^2/\mu)(v_ra_r + v_\perp a_s)$。代入$v_r = (\mu/h)e\sin\theta$和$v_\perp = h/r = (\mu/h)(p/r)$即得第一个方程。

**节点与轨道倾角。**$\dot{\mathbf{h}} = \mathbf{r}\times\mathbf{a}_p$。由$\mathbf{r} = r\hat{\mathbf{R}}$，$\mathbf{a}_p$中唯一使$\mathbf{h}$倾斜的分量是$a_w$：$\mathbf{r}\times a_w\hat{\mathbf{W}} = -ra_w\hat{\mathbf{S}}$。所以单位法向量$\hat{\mathbf{W}} = \mathbf{h}/h$以速率$\dot{\hat{\mathbf{W}}} = -(ra_w/h)\hat{\mathbf{S}}$转动（平面内分量只改变$h$）。在赤道坐标系中，$\hat{\mathbf{W}} = (\sin\Omega\sin i,\ -\cos\Omega\sin i,\ \cos i)$（[[orbital-mechanics/orbital-elements]]中矩阵$\mathbf{Q}$的第三列），$\hat{\mathbf{S}}$的$Z$分量为$\sin i\cos u$。比较$Z$分量：$-\sin i\,\dot i = -(ra_w/h)\sin i\cos u$，得$\dot i = (r\cos u/h)\,a_w$。类似地比较水平分量（或利用$\dot{\mathbf{N}}$的$\mathbf{K}$分量）得$\sin i\,\dot\Omega = (r\sin u/h)\,a_w$。$i = 0$处的奇异性反映了赤道轨道的节点无定义。
:::

两条结论一目了然。只有面外力（$a_w$）使轨道平面转动，而且它们在特定位置最有效：轨道倾角在节点处（$\cos u = \pm1$）变化最快，节点在最高纬度处（$\sin u = \pm1$）移动最快。并且只有沿迹力（对圆轨道为$a_s$）改变能量——因此与速度方向相反的阻力使$a$减小。

## 地球扁率：$J_2$ {#sec-j2}

地球的自转使它变扁：赤道半径（$6378.137\ \mathrm{km}$）比极半径大$21.4\ \mathrm{km}$。把其引力位按球谐函数展开，在中心项之后占主导的是二阶**带谐项**：
$$
U = -\frac{\mu}{r}\left[1 - J_2\left(\frac{R_E}{r}\right)^2\frac{3\sin^2\phi - 1}{2} - \cdots\right], \qquad J_2 = 1.082\,63\times10^{-3},
$$ {#eq-j2-potential}
其中$\phi$是地心纬度（采用$\mathbf{a} = -\nabla U$的约定）。下一项约小一千倍（$J_3 = -2.53\times10^{-6}$描述轻微的“梨形”）。取梯度并在 RSW 坐标系中分解，利用$\sin\phi = \sin i\sin u$，得到$J_2$摄动加速度
$$
(a_r,\ a_s,\ a_w) = -\frac{3\mu J_2R_E^2}{2r^4}\left(1 - 3\sin^2i\sin^2u,\ \ \sin^2i\sin 2u,\ \ \sin 2i\sin u\right).
$$ {#eq-j2-acc}
它在$400\ \mathrm{km}$高度处的大小约为$0.012\ \mathrm{m/s^2}$，是中心引力的$0.14\,\%$——很小，但一圈又一圈地朝同一方向作用。

::: theorem $J_2$的长期效应 {#thm-j2-secular}
在一圈上取平均，$J_2$不使$a$、$e$或$i$产生长期变化，但节点和近地点幅角以恒定速率漂移
$$
\dot\Omega = -\frac32\,nJ_2\left(\frac{R_E}{p}\right)^2\cos i, \qquad
\dot\omega = \frac34\,nJ_2\left(\frac{R_E}{p}\right)^2\left(5\cos^2i - 1\right),
$$ {#eq-j2-rates}
其中$n = \sqrt{\mu/a^3}$，$p = a(1-e^2)$，精确到$J_2$的一阶。
:::

::: proof
我们对圆轨道（$e = 0$，$r = a = p$，$h = \sqrt{\mu a}$，$u = nt + u_0$）证明节点变化率；一般情形是同样的计算，只是$r$沿轨道变化（见 Vallado、Battin）。把[[#eq-j2-acc]]中的$a_w$代入[[#eq-gauss]]的节点方程：
$$
\dot\Omega = \frac{a\sin u}{h\sin i}\left(-\frac{3\mu J_2R_E^2}{2a^4}\,2\sin i\cos i\sin u\right) = -\frac{3\mu J_2R_E^2\cos i}{a^3h}\,\sin^2u.
$$
在一圈上取平均，$\langle\sin^2u\rangle = \tfrac12$，所以$\langle\dot\Omega\rangle = -\tfrac32\mu J_2R_E^2\cos i/(a^3\sqrt{\mu a}) = -\tfrac32\,nJ_2(R_E/a)^2\cos i$。对于轨道倾角，$\dot i \propto \cos u\sin u = \tfrac12\sin 2u$的平均值为零；对于$a$，$a_s \propto \sin 2u$的平均值为零（而在圆轨道上$a_r$不做功）；所以$a$和$i$没有长期变化。所用假设：$J_2$的一阶近似（取平均时根数视为常数），以及在整圈上取平均。
:::

节点运动的物理图景是：每当卫星经过高纬度上空，隆起部分就把它拉向赤道面——这是作用在轨道上的力矩，它就像重力对旋转陀螺的力矩一样，使轨道角动量绕地轴*进动*而不是倾倒。对于顺行轨道（$\cos i > 0$），节点向西移动（**节点退行**）；对于逆行轨道，向东移动。当$i < 63.43^\circ$或$i > 116.57^\circ$时近地点向前转动，在两者之间则向后转动。

::: widget plot
f: -1.5*sqrt(398600/(6378 + h)^3)*1.08263e-3*(6378/(6378 + h))^2*cos(x*pi/180)*4950355.35; 0.75*sqrt(398600/(6378 + h)^3)*1.08263e-3*(6378/(6378 + h))^2*(5*cos(x*pi/180)^2 - 1)*4950355.35
x: 0, 180
y: -10, 16
sliders: h=700:200:3000:10
labels: \dot\Omega\ (^\circ/\text{天}); \dot\omega\ (^\circ/\text{天})
hlines: 0.9856; 0
vlines: 63.43; 116.57
caption: 高度为$h$（km，滑块）的圆轨道上，$J_2$引起的节点和近地点幅角长期漂移（度/天）随轨道倾角（度）的变化，按[[#eq-j2-rates]]绘制。$+0.9856^\circ/\mathrm{day}$处的水平线是太阳同步速率：$\dot\Omega$曲线与它的交点就是太阳同步倾角——$700\ \mathrm{km}$处为$98.2^\circ$。升高$h$：交点移向$180^\circ$，并在约$5970\ \mathrm{km}$以上消失，那里$J_2$太弱，无法足够快地转动轨道平面。竖线标出临界倾角，在那里无论高度如何近地点都静止不动。
:::

::: example 空间站的节点退行 {#ex-iss}
求高度$400\ \mathrm{km}$、轨道倾角$51.6^\circ$的圆轨道上，$J_2$引起的节点和近地点幅角漂移速率。
::: solution
$a = 6778\ \mathrm{km}$，$n = 1.1314\times10^{-3}\ \mathrm{rad/s}$，$(R_E/a)^2 = 0.88546$。所以$nJ_2(R_E/a)^2 = 1.0846\times10^{-6}\ \mathrm{rad/s}$，即$5.369^\circ/\mathrm{day}$。
$$
\dot\Omega = -\tfrac32 \times 5.369 \times \cos 51.6^\circ = -5.00^\circ/\mathrm{day}, \qquad
\dot\omega = \tfrac34 \times 5.369 \times (5 \times 0.3858 - 1) = +3.74^\circ/\mathrm{day}.
$$
**校核：**空间站的轨道平面在$72$天内退行$360^\circ$，这就是其轨道上的光照条件（以及可见过境的时间）大约以两个月为周期循环的原因。对圆轨道$\omega$无定义，但$\dot\omega$仍然重要：卫星的纬度幅角比开普勒速率前进得略快，这是使**交点周期**（从节点到节点）不同于$2\pi/n$的原因之一。
:::
:::

## 太阳同步轨道、临界倾角轨道和冻结轨道 {#sec-special-orbits}

最有用的轨道设计中有两种正是*因为*$J_2$才存在的。

**太阳同步轨道**的节点以与太阳沿赤道视运动相同的平均速率向东推进，即每回归年$360^\circ$：
$$
\dot\Omega_\text{SSO} = \frac{360^\circ}{365.2422\ \mathrm{d}} = 0.9856^\circ/\mathrm{day} = 1.991\times10^{-7}\ \mathrm{rad/s}.
$$
这样轨道平面与太阳方向保持固定夹角，卫星每天在相同的**地方太阳时**经过每一纬度——这对阴影一致的成像和太阳能供电都很理想。由[[#eq-j2-rates]]，$\cos i$必须为负：太阳同步轨道略呈逆行，对于$500$–$900\ \mathrm{km}$的高度，倾角接近$97$–$99^\circ$。

**临界倾角轨道**满足$5\cos^2i - 1 = 0$，即$i = 63.43^\circ$或$116.57^\circ$：近地点不转动。这是闪电轨道的基础，其远地点必须保持在北半球上空。

**冻结轨道**是$J_2$和奇次谐项$J_3$引起的$e$和$\omega$的缓慢变化相互抵消的轨道，对低轨道通常取$\omega = 90^\circ$和约$0.001$的小偏心率；这样在每一纬度上的高度逐圈重复，这简化了测高和成像任务。

::: example 设计太阳同步轨道 {#ex-sso}
什么轨道倾角能使$700\ \mathrm{km}$高度的圆轨道成为太阳同步轨道？
::: solution
$a = 7078\ \mathrm{km}$，$n = \sqrt{398\,600/7078^3} = 1.0603\times10^{-3}\ \mathrm{rad/s}$，$(R_E/a)^2 = 0.81198$。令[[#eq-j2-rates]]等于所需速率：
$$
\cos i = -\frac{1.991\times10^{-7}}{1.5 \times 1.0603\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.81198} = -\frac{1.991\times10^{-7}}{1.3982\times10^{-6}} = -0.1424,
$$
$i = 98.19^\circ$。

**校核：**约$700\ \mathrm{km}$高度的太阳同步对地观测卫星的轨道倾角约为$98.2^\circ$，与其任务说明中公布的一致。更高的轨道需要更大的倾角：$800\ \mathrm{km}$处为$98.60^\circ$；更低的轨道倾角更小：$500\ \mathrm{km}$处为$97.40^\circ$。
:::
:::

::: example 闪电轨道为何采用 63.4° {#ex-molniya}
[[orbital-mechanics/two-body-problem]]中的半日轨道（$a = 26\,562\ \mathrm{km}$，$e = 0.737$）要使其远地点保持在北半球上空。求$i = 63.43^\circ$、$60^\circ$和$65^\circ$时的近地点漂移以及节点漂移。
::: solution
$n = 1.4584\times10^{-4}\ \mathrm{rad/s}$，$p = a(1 - e^2) = 12\,134\ \mathrm{km}$，$(R_E/p)^2 = 0.27631$，所以$nJ_2(R_E/p)^2 = 4.363\times10^{-8}\ \mathrm{rad/s} = 0.2160^\circ/\mathrm{day}$。

在$63.43^\circ$处：$5\cos^2i - 1 = 0$，$\dot\omega = 0$。在$60^\circ$处：$5 \times 0.25 - 1 = 0.25$，$\dot\omega = 0.75 \times 0.2160 \times 0.25 = +0.0406^\circ/\mathrm{day}$，约每年$15^\circ$。在$65^\circ$处：$\dot\omega = -0.0174^\circ/\mathrm{day}$。节点以$\dot\Omega = -1.5 \times 0.2160 \cos 63.43^\circ = -0.145^\circ/\mathrm{day}$退行。

**校核：**远地点每年$15^\circ$的漂移会在几年之内使其离开服务区；在临界倾角下它保持不动（在一阶近似下；日月摄动和$J_3$仍会引起缓慢变化，由小的机动修正）。较小的因子$(R_E/p)^2$使这些效应比低轨道慢得多——但在整个任务期间并非可以忽略。
:::
:::

::: warning 速率单位错误，以及$p$与$a$ {#warn-j2}
$J_2$速率算出来以弧度每秒为单位；换算为度每天要乘以$180/\pi \times 86\,400 = 4.95\times10^6$，这个因子常常只用了一半。[[#eq-j2-rates]]中的因子是$(R_E/p)^2$，而不是$(R_E/a)^2$：对闪电轨道，$p = 12\,134\ \mathrm{km}$而$a = 26\,562\ \mathrm{km}$，速率相差$4.8$倍。太阳同步速率使用*回归*年（$365.2422$天），因为它跟踪的是太阳而不是恒星。还有符号：顺行轨道的节点退行（$\dot\Omega$为负）；算出的太阳同步倾角若小于$90^\circ$，说明符号出了错。
:::

## 大气阻力 {#sec-drag}

以速度$v$（相对于大致随地球一起转动的空气）在稀薄高层大气中运动的卫星，受到与其速度方向相反的阻力加速度
$$
\mathbf{a}_D = -\frac{1}{2}\,\frac{C_DA}{m}\,\rho\,v\,\mathbf{v} = -\frac{\rho v}{2B}\,\mathbf{v}, \qquad B = \frac{m}{C_DA},
$$ {#eq-drag}
其中$\rho$为空气密度，$A$为迎流面积，$C_D$为阻力系数（对于自由分子流中的卫星约为$2.2$），$B$为**弹道系数**（有些作者使用其倒数）。密度是最大的不确定因素：在约$200\ \mathrm{km}$以上，热层随太阳紫外辐射的强弱膨胀和收缩，因此在给定高度上$\rho$在11年太阳周期内变化五到十倍，在地磁暴期间一天之内就可能加倍。

::: proposition 近圆轨道的衰减 {#prop-decay}
对于在阻力[[#eq-drag]]作用下半径为$a$的圆轨道，半长轴以如下速率减小：
$$
\frac{\mathrm{d}a}{\mathrm{d}t} = -\frac{\rho\sqrt{\mu a}}{B}, \qquad \Delta a_\text{每圈} = -\frac{2\pi\rho a^2}{B}.
$$ {#eq-decay}
若密度随高度按指数变化，$\rho = \rho_0\,e^{-(z - z_0)/H}$，标高为$H$，并把因子$\sqrt{\mu a}$视为常数，则从$z_0$衰减到低得多的高度所需的时间近似为
$$
t_\text{寿命} \approx \frac{BH}{\rho_0\sqrt{\mu a}}.
$$ {#eq-lifetime}
:::

::: proof
对圆轨道，第一个高斯方程中$e\sin\theta = 0$，$p/r = 1$，所以$\dot a = (2a^2/h)\,a_s$，其中$a_s = -\rho v^2/(2B)$。代入$v^2 = \mu/a$和$h = \sqrt{\mu a}$：$\dot a = -(2a^2/\sqrt{\mu a})\,\rho\mu/(2Ba) = -\rho\sqrt{\mu a}/B$。乘以周期$2\pi\sqrt{a^3/\mu}$得每圈的变化。令$z = a - R_E$并采用指数模型，$\mathrm{d}z/\mathrm{d}t = -k\,e^{-(z - z_0)/H}$，$k = \rho_0\sqrt{\mu a}/B$；分离变量，$e^{(z - z_0)/H}\,\mathrm{d}z = -k\,\mathrm{d}t$，从$z_0$向下积分到$z_f$：$H\left[1 - e^{-(z_0 - z_f)/H}\right] = kt$。当$z_0 - z_f \gg H$时方括号为1。假设：近圆轨道（阻力先使偏心轨道圆化），$B$为常数，静态指数大气，$\sqrt{\mu a}$保持其初值——都很粗糙，所以结果只是数量级估计。
:::

一个违反直觉的推论是：阻力使卫星运动得*更快*。随着$a$减小，圆轨道速度$\sqrt{\mu/a}$增大——阻力消耗能量，但卫星落入势阱更深处，获得的动能是阻力所消耗能量的两倍。

::: example 一颗立方星能存活多久？ {#ex-cubesat}
一颗3U立方星的质量为$4.0\ \mathrm{kg}$，平均迎风面积$0.030\ \mathrm{m^2}$，$C_D = 2.2$。它在$400\ \mathrm{km}$处释放，该处密度取$\rho_0 = 3.7\times10^{-12}\ \mathrm{kg/m^3}$，标高$H = 58.5\ \mathrm{km}$（Vallado 书中基于 CIRA-72 参考大气、对应中等太阳活动的指数模型）。估算初始衰减率和轨道寿命。
::: solution
$B = 4.0/(2.2 \times 0.030) = 60.6\ \mathrm{kg/m^2}$；$\sqrt{\mu a} = \sqrt{3.986\times10^{14} \times 6.778\times10^{6}} = 5.198\times10^{10}\ \mathrm{m^2/s}$。

衰减率：$\dot a = -3.725\times10^{-12} \times 5.198\times10^{10}/60.6 = -3.19\times10^{-3}\ \mathrm{m/s}$，即每天$276\ \mathrm{m}$，或每圈约$18\ \mathrm{m}$。

寿命：$t \approx BH/(\rho_0\sqrt{\mu a}) = 58\,500/3.19\times10^{-3} = 1.83\times10^{7}\ \mathrm{s} \approx 210$天。

**校核：**衰减起初缓慢，然后加速：一半的寿命花在损失最初$H\ln 2 = 41\ \mathrm{km}$的高度上。在$400\ \mathrm{km}$附近部署的立方星，观测到的寿命从太阳活动峰年附近的几个月到太阳活动谷年附近的一两年不等——考虑到密度有几倍的不确定性，这与本估计相符。任何寿命预测都应以这样的范围给出，而绝不能给出单一的日期。
:::
:::

::: widget odesolver
f: -0.276*exp(-(y - 400)/58.5)
y0: 400
t: 0, 200
exact: 400 + 58.5*ln(1 - 0.276*t/58.5)
h: 20
caption: [[#ex-cubesat]]中立方星的高度（km）随时间（天）的变化，按$\mathrm{d}z/\mathrm{d}t = -0.276\,e^{-(z - 400)/58.5}\ \mathrm{km/day}$（即[[#eq-decay]]的衰减率，采用指数大气并把$\sqrt{\mu a}$固定在初值）用欧拉法、休恩法和 RK4 积分，并与精确解$z = 400 + H\ln(1 - kt/H)$比较。曲线在几个月内几乎是平的，然后急剧下坠：一旦下降了$100\ \mathrm{km}$，其$212$天的寿命只剩下约$38$天。步长为$20$天时，欧拉法在末段严重滞后，因为斜率变化太快；减小步长可看到它收敛。
:::

## 第三体、辐射压及其相对大小 {#sec-other}

**月球和太阳**通过它们对卫星和对地球的引力之差来摄动地球卫星（地心本身也在朝它们加速）。对于距地球$r$的卫星和距离为$d \gg r$、引力参数为$\mu_3$的天体，这一差值就是潮汐加速度，量级为$2\mu_3r/d^3$。它随$r$线性增大，所以对高轨道最为重要：在地球静止轨道高度，月球和太阳共同使轨道平面每年倾斜约$0.75$–$0.95^\circ$，地球静止卫星每年要花大约$45$–$50\ \mathrm{m/s}$的$\Delta v$进行南北位置保持来抵消它。

**太阳辐射压**来自阳光的动量：对吸收表面，在$1\ \mathrm{AU}$处约为$4.56\times10^{-6}\ \mathrm{N/m^2}$，再乘以介于1和2之间的反射系数$C_R$。其加速度$C_R\,P_\odot A/m$与高度无关；它主要摄动高轨道的偏心率，是导航卫星和深空探测器所受的主要非引力。

| 加速度（$\mathrm{m/s^2}$） | $400\ \mathrm{km}$ | $20\,200\ \mathrm{km}$（GNSS） | $35\,786\ \mathrm{km}$（GEO） |
|---|---|---|---|
| 中心引力$\mu/r^2$ | $8.68$ | $0.564$ | $0.224$ |
| $J_2$（幅值$\tfrac32J_2\mu R_E^2/r^4$） | $1.2\times10^{-2}$ | $5.3\times10^{-5}$ | $8.3\times10^{-6}$ |
| 月球（潮汐，$2\mu_\text{M}r/d^3$） | $1.2\times10^{-6}$ | $4.6\times10^{-6}$ | $7.3\times10^{-6}$ |
| 太阳（潮汐，$2\mu_\odot r/d^3$） | $5.4\times10^{-7}$ | $2.1\times10^{-6}$ | $3.3\times10^{-6}$ |
| 辐射压（$C_R = 1.3$，$A/m = 0.02\ \mathrm{m^2/kg}$） | $1.2\times10^{-7}$ | $1.2\times10^{-7}$ | $1.2\times10^{-7}$ |
| 阻力（$B = 60\ \mathrm{kg/m^2}$，$\rho = 3.7\times10^{-12}$） | $1.8\times10^{-6}$ | — | — |

这张由上述公式算出的表告诉设计者应该建模什么：在低轨道上，$J_2$比其他每一种摄动都大四个数量级，其次是阻力；在地球静止轨道高度，$J_2$与月球相当，太阳是月球的一半，而对于大而轻的卫星，辐射压也不再可以忽略。

::: example 在地球静止轨道上哪种摄动重要？ {#ex-geo}
利用上表，比较$J_2$和月球对地球静止卫星的影响，并解释为什么引起轨道倾角漂移的是月球而不是$J_2$。
::: solution
两者的幅值相近（$8.3\times10^{-6}$对$7.3\times10^{-6}\ \mathrm{m/s^2}$）。但对于赤道轨道，$J_2$的面外分量$a_w \propto \sin 2i$为零：$J_2$关于赤道对称，不能使位于赤道面内的轨道倾斜——它只使周期略有改变（位置保持的定点经度是计入它来计算的）。月球的轨道相对于赤道是倾斜的（随年份不同为$18$–$29^\circ$），所以它的引力有一个垂直于地球静止轨道平面的分量，其一天内的平均值不为零。由[[#eq-gauss]]中的轨道倾角方程，持续的$a_w$使轨道倾斜：这就是每年不到一度的日月引起的轨道倾角漂移。

**校核：**地球静止卫星位置保持预算中占主导的确实是南北（轨道倾角）控制，是东西控制预算的好几倍；后者对抗的是赤道椭率（$J_{22}$）和辐射压的小得多的效应。
:::
:::

::: quiz
一颗低圆轨道卫星在一圈中受到大气阻力作用。下列哪些说法正确？
- [x] 其半长轴减小。
- [x] 其速度增大。
- [ ] 其轨道周期增大。
- [ ] 其轨道倾角稳定减小，因为阻力作用在轨道平面内。
::: solution
阻力消耗能量，所以$a = -\mu/(2\varepsilon)$减小，周期$2\pi\sqrt{a^3/\mu}$也减小。圆轨道速度$\sqrt{\mu/a}$增大：卫星向内落并获得动能（由圆轨道的位力关系，是阻力所消耗能量的两倍）。阻力位于轨道平面内，所以不会使轨道平面倾斜（大气转动引起的小的面外分量只是次要效应）。
:::
:::

::: history
最早的卫星把摄动研究从理论变成了测量。1958年，R. H. 默森（R. H. Merson）和 D. G. 金-希尔（D. G. King-Hele）分析了斯普特尼克2号运载火箭轨道平面转动的速率，推导出地球扁率约为$1/298$，取代了大地测量学家自1924年以来使用的国际椭球的值$1/297$（*Nature*，1958年）。1959年，约翰·奥基夫（John O'Keefe）、安·埃克尔斯（Ann Eckels）和 R. K. 斯夸尔斯（R. K. Squires）从对先锋1号的跟踪中发现了近地点高度的周期性变化，揭示了奇次带谐项$J_3$——地球略呈“梨形”，南极区域相对于北极区域凹陷（*Science*，1959年）。对早期卫星的阻力分析还表明，高层大气密度随太阳活动的变化远远超出预期。此后，卫星大地测量学（如今由专门的重力测量任务进行）已把地球引力场测定到数千个谐项。
:::

## 后续内容 {#sec-next}

摄动正是轨道必须维持的原因：位置保持机动（[[orbital-mechanics/orbital-manoeuvres]]）以及低轨道和地球静止轨道的寿命末期处置规则，都源于本章中的效应。精密定轨（[[orbital-mechanics/orbit-determination]]）的力模型需要包括所有这些摄动，编队的相对运动设计（[[orbital-mechanics/relative-motion-rendezvous]]）必须考虑差分$J_2$和阻力。摄动*力矩*——重力梯度力矩、气动力矩、辐射力矩——也作用在卫星的姿态上，这是[[orbital-mechanics/attitude-dynamics]]的主题。

::: summary
- 受摄运动：$\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3 + \mathbf{a}_p$；直接积分（科威尔法、恩克法）或追踪密切根数的缓慢变化。
- 高斯方程由$\mathbf{a}_p$的 RSW 分量给出根数变化率：只有$a_w$移动轨道平面（轨道倾角在节点处变化，节点在最高纬度处移动）；沿迹力改变$a$。
- $J_2$（扁率）引起长期漂移$\dot\Omega = -\tfrac32nJ_2(R_E/p)^2\cos i$和$\dot\omega = \tfrac34nJ_2(R_E/p)^2(5\cos^2i - 1)$，$a$、$e$、$i$没有长期变化；在$400\ \mathrm{km}$、$51.6^\circ$处分别为每天$-5.0^\circ$和$+3.7^\circ$。
- 太阳同步轨道满足$\dot\Omega = +0.9856^\circ/\mathrm{day}$（$700\ \mathrm{km}$处约$98.2^\circ$）；临界倾角$63.43^\circ$使近地点冻结（闪电轨道）；冻结轨道平衡$J_2$和$J_3$。
- 阻力：$\dot a = -\rho\sqrt{\mu a}/B$；指数大气下寿命$\approx BH/(\rho_0\sqrt{\mu a})$——由于密度随太阳活动变化，不确定度达几倍。
- 日月潮汐和辐射压的相对重要性随高度增加；在地球静止轨道上它们驱动轨道倾角漂移并决定位置保持预算。
:::

## 习题

::: exercise 800 km 处的节点退行 {level=1 check="-4.66"}
求高度$800\ \mathrm{km}$、轨道倾角$45^\circ$的圆轨道上$J_2$引起的节点漂移速率。（以度每天为单位输入$\dot\Omega$，保留三位有效数字。）
::: solution
$a = 7178\ \mathrm{km}$，$n = 1.0382\times10^{-3}\ \mathrm{rad/s}$，$(R_E/a)^2 = 0.78953$。$\dot\Omega = -1.5 \times 1.0382\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.78953 \times \cos 45^\circ = -9.413\times10^{-7}\ \mathrm{rad/s} = -4.66^\circ/\mathrm{day}$。
:::
:::

::: exercise 500 km 处的太阳同步轨道 {level=1 check="97.4"}
什么轨道倾角能使$500\ \mathrm{km}$处的圆轨道成为太阳同步轨道？（以度为单位输入$i$，保留三位有效数字。）
::: solution
$a = 6878\ \mathrm{km}$，$n = 1.1069\times10^{-3}\ \mathrm{rad/s}$，$(R_E/a)^2 = 0.85989$。$\cos i = -1.991\times10^{-7}/(1.5 \times 1.1069\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.85989) = -0.1285$，$i = 97.4^\circ$。
:::
:::

::: exercise 每圈的衰减 {level=1 check="-2.07"}
一颗$B = 100\ \mathrm{kg/m^2}$的卫星位于$500\ \mathrm{km}$处的圆轨道上，该处$\rho = 6.97\times10^{-13}\ \mathrm{kg/m^3}$。其半长轴每圈变化多少？（以米为单位输入$\Delta a$，保留三位有效数字，带符号。）
::: solution
$\Delta a = -2\pi\rho a^2/B = -2\pi \times 6.97\times10^{-13} \times (6.878\times10^6)^2/100 = -2.07\ \mathrm{m}$每圈，约每天$31\ \mathrm{m}$。
:::
:::

::: exercise 椭圆轨道的近地点转动 {level=2 check="8.64"}
某轨道的近地点高度为$500\ \mathrm{km}$，远地点高度为$1500\ \mathrm{km}$，轨道倾角为$28.5^\circ$。求$\dot\omega$和$\dot\Omega$。（以度每天为单位输入$\dot\omega$，保留三位有效数字。）
::: solution
$r_p = 6878$，$r_a = 7878\ \mathrm{km}$，$a = 7378\ \mathrm{km}$，$e = 0.06777$，$p = a(1-e^2) = 7344.1\ \mathrm{km}$，$n = 9.9623\times10^{-4}\ \mathrm{rad/s}$，$(R_E/p)^2 = 0.75423$。$nJ_2(R_E/p)^2 = 8.135\times10^{-7}\ \mathrm{rad/s} = 4.027^\circ/\mathrm{day}$。$\dot\omega = 0.75 \times 4.027 \times (5\cos^2 28.5^\circ - 1) = 0.75 \times 4.027 \times 2.8616 = 8.64^\circ/\mathrm{day}$；$\dot\Omega = -1.5 \times 4.027 \times 0.8788 = -5.31^\circ/\mathrm{day}$。近地点$42$天转一周。
:::
:::

::: exercise 辐射压 {level=2 check="1.19e-7"}
一颗$A/m = 0.020\ \mathrm{m^2/kg}$、$C_R = 1.3$的卫星在$1\ \mathrm{AU}$处受到阳光照射。求其辐射压加速度，并与表中$400\ \mathrm{km}$处的阻力加速度比较。（以$\mathrm{m/s^2}$为单位输入加速度，保留三位有效数字；可以输入`1.19e-7`这样的表达式。）
::: solution
$a = C_RP_\odot A/m = 1.3 \times 4.56\times10^{-6} \times 0.020 = 1.19\times10^{-7}\ \mathrm{m/s^2}$，约比表中$400\ \mathrm{km}$处的阻力小$15$倍；在$800\ \mathrm{km}$处，密度约低一百倍，两者变得相当。
:::
:::

::: exercise 从 500 km 开始的寿命 {level=2 check="2020"}
在[[#eq-lifetime]]中取$\rho_0 = 6.967\times10^{-13}\ \mathrm{kg/m^3}$、$H = 63.8\ \mathrm{km}$，估算在$500\ \mathrm{km}$处释放、$B = 100\ \mathrm{kg/m^2}$的卫星的寿命。（以天为单位输入寿命，精确到10天。）
::: solution
$\sqrt{\mu a} = \sqrt{3.986\times10^{14} \times 6.878\times10^6} = 5.236\times10^{10}\ \mathrm{m^2/s}$。$t = 100 \times 63\,800/(6.967\times10^{-13} \times 5.236\times10^{10}) = 6.38\times10^6/0.03648 = 1.749\times10^8\ \mathrm{s} = 2024$天$\approx 2020$天——约$5.5$年。与[[#ex-cubesat]]相比，释放高度升高$100\ \mathrm{km}$使寿命增加约十倍；考虑到密度的不确定性，诚实的答案是“大约3到15年”。
:::
:::

::: exercise 临界倾角 {level=3 check="63.43"}
由[[#eq-j2-rates]]推导近地点不漂移的轨道倾角，并解释为什么结果与$a$和$e$无关。（以度为单位输入顺行临界倾角，保留四位有效数字。）
::: solution
$\dot\omega = 0$要求$5\cos^2i - 1 = 0$，所以$\cos i = \pm1/\sqrt5$，$i = 63.43^\circ$或$116.57^\circ$。大小和形状只通过公共因子$nJ_2(R_E/p)^2$进入，而它永不为零；对轨道倾角的依赖是$J_2$力在轨道上的几何平均，对每条轨道都相同（在$J_2$的一阶近似下）。
:::
:::

::: exercise 最高的太阳同步轨道 {level=3 check="5970"}
证明圆形太阳同步轨道只存在于某一高度以下，并求出这一高度。（以 km 为单位输入高度，精确到10 km。）
::: solution
所需的$\lvert\cos i\rvert = \dot\Omega_\text{SSO}/[\tfrac32nJ_2(R_E/a)^2]$不能超过1。分母按$a^{-7/2}$下降，所以存在一个最大的$a$，使分母等于$\dot\Omega_\text{SSO}$，此时$i = 180^\circ$：$\tfrac32\sqrt{\mu/a^3}\,J_2(R_E/a)^2 = 1.991\times10^{-7}\ \mathrm{rad/s}$，即$a^{7/2} = 1.5\sqrt\mu\,J_2R_E^2/1.991\times10^{-7}$。解得$a = 12\,352\ \mathrm{km}$，高度$5974\ \mathrm{km} \approx 5970\ \mathrm{km}$。真实的太阳同步轨道远低于此，倾角接近$98^\circ$，因为成像和发射经济性都偏向低高度。
:::
:::

::: exercise 设计：对地观测轨道 {level=3}
一项成像任务要求：(a) 每次穿越赤道时地方太阳时相同；(b) 星下点轨迹在整数天后精确重复；(c) 在没有推进补偿阻力的情况下寿命至少七年，$B = 150\ \mathrm{kg/m^2}$。提出一个高度和轨道倾角，说明$J_2$如何进入每一项要求，并指出主要的不确定因素。
::: solution
(a) 太阳同步：对选定的高度由[[#eq-j2-rates]]求$i$（$500$–$800\ \mathrm{km}$对应$97.4$–$98.6^\circ$）。(b) 回归轨迹要求在整数个*交点*日内恰好有整数个交点周期——交点日是地球相对于退行的节点转一圈的时间$2\pi/(\omega_E - \dot\Omega)$，对太阳同步轨道它恰好是一个太阳日。交点周期本身与$2\pi/n$相差若干$J_2$项。例如，每天$14 + 7/16$圈（16天回归）出现在$700\ \mathrm{km}$附近；精确高度需计入$J_2$项后数值求解。(c) 由指数模型下的[[#eq-lifetime]]，在$500\ \mathrm{km}$附近每升高$100\ \mathrm{km}$寿命大约增加十倍；取$B = 150$，$600$–$700\ \mathrm{km}$附近的高度在平均太阳活动下给出几十年的寿命，即使在太阳活动峰年也远超七年——但这也高于自然衰减能在25年（或更严格的5年）处置准则内清除碎片的高度，因此必须规划离轨机动。主要的不确定因素是热层密度（随太阳周期变化5–10倍）；由于阻力缓慢地改变周期，回归轨迹的高度还必须用小的机动来维持。
:::
:::
