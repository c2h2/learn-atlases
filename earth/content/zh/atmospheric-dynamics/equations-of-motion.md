释放一团静止的高空气块、让它两侧有压差，牛顿第二定律说它应从静止沿梯度直着加速、几分钟内达到飓风风速、报出一个与任何观测天气都无关的结果。实际发生的事更奇：气块从不去力所指的方向。它转——稳定、可预测、速率只由纬度设定——直到沿等压线吹而不是穿过它们吹，而地球上每一张天气图都是那个折中的地图。原因是行星的旋转，而从旋转参考系看力的数学是气象学里后果最重大的单一思想。

## 力，以及旋转如何放大它们

::: definition 大气的真实力与视在力 {#def-forces}
密度$\rho$的气团感受三个**真实**的单位质量力：气压梯度力$-\rho^{-1}\nabla p$、重力$\mathbf{g}$、分子或湍流摩擦$\mathbf{F}$；另外，当其运动在以角速度$\boldsymbol{\Omega} = (0, 0, \Omega\cos\phi)$随地球旋转、纬度$\phi$的参考系中描述时，还有两个**视在**（惯性系）力，
$$
\frac{\mathrm{d}\mathbf{v}}{\mathrm{d}t} = -\frac{1}{\rho}\nabla p - 2\boldsymbol{\Omega}\times\mathbf{v} - \boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf{r}) + \mathbf{F} + \mathbf{g},
$$
即**科里奥利力**$-2\boldsymbol{\Omega}\times\mathbf{v}$（正比于速度、垂直于速度）和**离心力**（稳定、其变化极小，与真重力一起被吸收进定义重力位$\Phi$的实测有效重力$\mathbf{g}^{\ast}$）。取科里奥利力的垂直分量得**科里奥利参数**
$$
f = 2\Omega\sin\phi = 1.46\times10^{-4}\sin\phi\ \ \mathrm{s^{-1}},
$$
$30\ \mathrm{^\circ N}$为$7.3\times10^{-5}\ \mathrm{s^{-1}}$、$45$为$1.03\times10^{-4}$、$60$为$1.26\times10^{-4}$、赤道为零。$45\ \mathrm{^\circ N}$、$10\ \mathrm{m\,s^{-1}}$风上的单位质量水平科里奥利力为$fU = 1.0\times10^{-3}\ \mathrm{m\,s^{-2}}$——对$g$虽小，却恰是$100\ \mathrm{km}$内$1\ \mathrm{hPa}$的水平气压梯度力的大小，也就是地面低压两侧常见的压差。地球旋转不是力平衡的修正项，而是其中两项之一。
:::

::: example 科里奥利力对阵压力 {#ex-coriolis-scale}
比较$45\ \mathrm{^\circ N}$、$U = 10\ \mathrm{m\,s^{-1}}$的空气在$|\nabla_h p| = 1\ \mathrm{hPa}$每$100\ \mathrm{km}$（$\rho = 1.2\ \mathrm{kg\,m^{-3}}$）气压场上运动时所受三个单位质量力。
::: solution
气压梯度：$|\nabla p|/\rho = 100/10^{5}/1.2 = 8.3\times10^{-4}\ \mathrm{m\,s^{-2}}$。科里奥利：$fU = 1.03\times10^{-4}\times10 = 1.0\times10^{-3}\ \mathrm{m\,s^{-2}}$。风偏离平衡流几$\mathrm{m\,s^{-1}}$时，近地面摩擦同量级。重力$9.81\ \mathrm{m\,s^{-2}}$，大四个量级——但它几乎恰好被垂直气压力平衡（下文静力），留下两个同量级的水平力决定风。前两者的平衡是地转；重力垂直作用的近乎相消是静力平衡；这两个平衡就是天气图能像力的地图一样被读、而不必像力一样被解的原因。
:::
:::

## 尺度与Rossby数

::: proposition 尺度分析与Rossby数 {#prop-ro}
用速度$U$、水平长度$L$、时标$L/U$对水平动量方程无量纲化：局地加速度尺度为$U^{2}/L$，科里奥利项为$fU$，两者之比为**Rossby数**
$$
\mathrm{Ro} = \frac{U}{fL},
$$
惯性效应与旋转效应之比。对大尺度大气$U \sim 10\ \mathrm{m\,s^{-1}}$、$L \sim 1000\ \mathrm{km}$、$f \sim 10^{-4}\ \mathrm{s^{-1}}$，所以$\mathrm{Ro} \sim 0.1$：旋转占主导，流动在百分之十精度内是压力与科里奥利力的平衡。龙卷风$U \sim 50\ \mathrm{m\,s^{-1}}$、$L \sim 100\ \mathrm{m}$，$\mathrm{Ro} \sim 5000$：地球在其下方无用处转动，其风只由径向气压梯度设定。中尺度对流系统$L \sim 100\ \mathrm{km}$、$\mathrm{Ro} \sim 1$：两个极限都不适用，而这些尺度恰恰是天气预报最难之处。Rossby数是任何动力学问题的第一个计算，因为它说出在解任何东西之前可以扔掉方程的哪些项。
:::

::: example 大气的Rossby数 {#ex-ro}
计算$\mathrm{Ro}$：（a）$45\ \mathrm{^\circ N}$、$U = 15\ \mathrm{m\,s^{-1}}$、半径$500\ \mathrm{km}$的地面低压；（b）$5\ \mathrm{m\,s^{-1}}$、跨$20\ \mathrm{km}$的海风；（c）$1\ \mathrm{m\,s^{-1}}$、$10\ \mathrm{m}$的尾流涡。
::: solution
取$f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$：（a）$\mathrm{Ro} = 15/(f\times5\times10^{5}) = 0.29$——旋转重要，但紧低压周围的流动明显非地转。（b）$\mathrm{Ro} = 5/(f\times2\times10^{4}) = 2.4$——海风是不旋转的热力环流，这就是它完全可以不含科里奥利项建模的原因。（c）$\mathrm{Ro} = 1/(f\times10) = 10^{3}$——旋转对建筑物后的涡无关紧要。大气因此不是"一股流"而是尺度的叠加，最大的旋转且近平衡，最小的不旋转且湍流，而数值天气预报的全部难题在于模型必须分辨或参数化两者之间的过渡。
:::
:::

::: widget plot
f: 1.458*sin(x*pi/180)
x: -90, 90
y: -1.5, 1.5
labels: 10^{4}f\ (\text{s}^{-1})
caption: 科里奥利参数$f = 2\Omega\sin\phi$（乘$10^{4}$）随纬度的变化。注意**反称**——南半球$f$为负，惯性振荡朝另一方向转——以及**赤道处归零**，这就是中纬度使用的科里奥利近似为何在热带失效、赤道动力学为何需要自己的工具。赤道处的斜率$\beta = \mathrm{d}f/\mathrm{d}y = 2\Omega\cos\phi/R = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$（$45\ \mathrm{^\circ N}$），是让Rossby波成为可能的参数。
:::

## 运动方程

::: definition 原始方程 {#def-primitive}
在感兴趣的区域内$f$为常数的beta平面上，**原始方程**——每台业务预报模型的祖先——是带科里奥利项的水平动量方程，
$$
\frac{\mathrm{d}u}{\mathrm{d}t} = -\frac{1}{\rho}\frac{\partial p}{\partial x} + fv - F_x, \qquad
\frac{\mathrm{d}v}{\mathrm{d}t} = -\frac{1}{\rho}\frac{\partial p}{\partial y} - fu - F_y,
$$
加上静力垂直动量方程、质量连续方程，
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0,
$$
位温形式的热力学第一定律，以及理想气体定律$p = \rho R_d T$。物质导数$\mathrm{d}/\mathrm{d}t = \partial/\partial t + u\,\partial/\partial x + v\,\partial/\partial y + w\,\partial/\partial z$携带随团变化；它的存在让系统非线性、让大气混沌。封闭该系统的静力方程在下文推导；除最小、最猛烈垂直运动外它处处成立，这就是垂直速度在多数模型里是诊断量而非预报量的原因。
:::

::: proposition 静力平衡 {#der-hydrostatic}
平衡厚度$\delta z$、单位面积气块的垂直力：下方减压上方$(p(z) - p(z + \delta z))A$对抗重力$\rho g A\,\delta z$。则
$$
\frac{p(z) - p(z+\delta z)}{\rho g\,\delta z} = 1 \;\longrightarrow\; \frac{\partial p}{\partial z} = -\rho g .
$$
这是近似吗？是，且其误差可测。对垂直动量方程作尺度分析：垂直加速度$\sim W^{2}/H$，气压梯度减重力的残差$\sim (U^{2}/L)\cdot(H/L)\cdot(\text{形状因子})$；被弃项与保留项之比为$\mathrm{Ro}\cdot(WH/uL)\cdot(H/L)$，对$H/L = 10\ \mathrm{km}/1000\ \mathrm{km} = 10^{-2}$的天气尺度系统，静力误差低于百分之一。对$H/L \sim 1$、$\mathrm{Ro} \sim 1$的深对流云则一点也不小——这就是允许对流的预报和湍流边界层用非静力模型、全球中期用静力模型的原因。
:::

::: example 层的厚度 {#ex-thickness}
用理想气体定律积分静力方程得两气压间层的**厚度**$H = z_2 - z_1 = R_d \bar{T} \ln(p_1/p_2)/g$。求平均温度$288\ \mathrm{K}$时$1000$–$900\ \mathrm{hPa}$层的厚度，并解释为什么暖柱的层厚。
::: solution
$$
H = \frac{287\times288\times\ln(1000/900)}{9.81} = \frac{287\times288\times0.105}{9.81} = 888\ \mathrm{m}.
$$
厚度正比于$\bar T$：比另一柱暖$3\ \mathrm{K}$的柱，其$900\ \mathrm{hPa}$面高约$30\ \mathrm{m}$，而这正是等压面图显示的——高空暖低压、脊下厚层。这也是为什么按标准大气设定的高度计在暖空气中读数偏高：飞机的真实高度高于气压所示，误差按每开尔文每公里约$4\ \mathrm{m}$累积，这件事对飞行员比对气象学家更要紧。
:::
:::

## 地转

::: definition 地转风 {#def-geostrophic}
小Rossby数下水平、定常、无摩擦的流，动量方程约化为气压梯度力与科里奥利力的平衡，
$$
f v_g = \frac{1}{\rho}\frac{\partial p}{\partial y}, \qquad -f u_g = -\frac{1}{\rho}\frac{\partial p}{\partial x}, \qquad \mathbf{v}_g = \frac{1}{\rho f}\,\mathbf{k}\times\nabla_h p .
$$
**地转风**平行于等压线吹——北半球沿等压线吹、低压在左——风速正比于气压梯度、反比于$f$和$\rho$。$1\ \mathrm{hPa}$每$100\ \mathrm{km}$的梯度在$45\ \mathrm{^\circ N}$给$8.1\ \mathrm{m\,s^{-1}}$、$30$给$11.4$、$60$给$6.6$：同一张图在副热带读起来风更大。地转不是定律而是一个**流趋近的平衡**：从静止启动的空气团以叠加其上的惯性圆螺旋渐近地趋近$\mathbf{v}_g$，而气压场的任何变化都会使风失衡、重新开始振荡。业务内容是双向使用：从高度场读风，或者——更难也更有用的方向——把高度型读成造出它们的风的记录。
:::

::: example 计算地转风 {#ex-geostrophic}
$45\ \mathrm{^\circ N}$的$500\ \mathrm{hPa}$高度向北递减、每$200\ \mathrm{km}$降$60\ \mathrm{m}$（$\bar T \approx 255\ \mathrm{K}$，该层$\rho \approx 0.6\ \mathrm{kg\,m^{-3}}$；等价地$\partial\Phi/\partial y = g\,\partial z/\partial y$）。求地转风并说出它朝哪吹。
::: solution
位势梯度$|\partial\Phi/\partial y| = 9.81\times60/2\times10^{5} = 2.94\times10^{-3}\ \mathrm{m^{2}\,s^{-2}}$每米，所以
$$
V_g = \frac{1}{f}\left|\frac{\partial\Phi}{\partial y}\right| = \frac{2.94\times10^{-3}}{1.03\times10^{-4}} = 28.5\ \mathrm{m\,s^{-1}} .
$$
高度向北下降，梯度矢量指向南（低高度方向）；$\mathbf{v}_g = f^{-1}\mathbf{k}\times\nabla\Phi$指向东：风**从西边**吹来、低高度在左。这就是中纬度西风急流——$30\ \mathrm{m\,s^{-1}}$的地转风是一张平常的高空图，而中纬度整个风暴轴动力学都跑在这套垂直结构蕴含的热成风上。
:::
:::

## 惯性振荡与梯度风

::: proposition 惯性运动 {#prop-inertial}
无气压梯度时，动量方程约化为$\dot u = fv$、$\dot v = -fu$，其解是匀速圆——**惯性振荡**——
$$
u = U\cos ft, \qquad v = -U\sin ft,
$$
北半球顺时针（反气旋式）运行，周期
$$
T_i = \frac{2\pi}{f} = \frac{17.4}{\sin\phi}\ \mathrm{h},
$$
$45\ \mathrm{^\circ N}$约$17\ \mathrm{h}$、$60$约$14\ \mathrm{h}$、赤道无穷大。以速度$U$位移的气团绕半径$U/f$转圈：$45\ \mathrm{^\circ N}$、$10\ \mathrm{m\,s^{-1}}$时$97\ \mathrm{km}$。惯性振荡不是课堂虚构：近惯性流是海洋混合层观测方差和日落后摩擦松弛、风得以自由振荡的夜间边界层的大部分——与日循环中傍晚风速极大值同一物理。
:::

::: widget parametric
fx: cos(t)
fy: -sin(t)
t: 0, 2pi
caption: 从上方看的**惯性圆**，北半球：只受科里奥利力的气团以匀速顺时针运行、周期$2\pi/f$。物理单位的半径是$U/f$——$45\ \mathrm{^\circ N}$、$10\ \mathrm{m\,s^{-1}}$的风约$100\ \mathrm{km}$——赤道以南转向反转。把这个圆叠加到地转漂移上就是完整的无摩擦解：气团绕其平衡风打圈。
:::

::: definition 梯度风 {#def-gradient}
绕半径$r$（气旋式为正）的弯曲流，压力、科里奥利力与离心加速度$V^{2}/r$的定常径向平衡是**梯度风**关系
$$
\frac{V^{2}}{r} + fV = \frac{1}{\rho}\frac{\partial p}{\partial n} \equiv f V_g, \qquad V = \frac{fr}{2}\left[\sqrt{1 + \frac{4V_g}{fr}} - 1\right] \ (\text{低压}), \quad \frac{fr}{2}\left[\sqrt{1 - \frac{4V_g}{fr}} - 1\right]\text{式}（\text{高压}）。
$$
低压上风**亚地转**——曲率吃掉部分压力——高压上**超地转**，直到反气旋平方根失效：$V_g > fr/4$时不存在定常弯曲流。$r = 100\ \mathrm{km}$、$45\ \mathrm{^\circ N}$处该上限为$2.6\ \mathrm{m\,s^{-1}}$，这就是为什么强风从不出现在紧高压周围、为什么副热带的大高压宽阔、平坦而弱，而低压可以小而猛烈。梯度风是飓风外风速极大区的平衡、切断低压周围流的平衡，也是地面图上每条弯曲流线的平衡。
:::

::: example 曲率订正 {#ex-gradient}
$45\ \mathrm{^\circ N}$，求梯度风：（a）半径$500\ \mathrm{km}$、$V_g = 10\ \mathrm{m\,s^{-1}}$的低压；（b）半径$100\ \mathrm{km}$、$V_g = 20\ \mathrm{m\,s^{-1}}$的低压；（c）$r = 100\ \mathrm{km}$处存在定常反气旋解的最大$V_g$。
::: solution
取$f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$：（a）$fr = 51.6\ \mathrm{m\,s^{-1}}$，所以$V = 25.8(\sqrt{1 + 40/51.6} - 1) = 8.6\ \mathrm{m\,s^{-1}}$，亚地转百分之十四——温和的订正。（b）$fr = 10.3$，$V = 5.15(\sqrt{1+80/10.3}-1) = 10.1\ \mathrm{m\,s^{-1}}$：地转值的一半——紧曲率支配平衡，图上等压线疏密严重高估风速。（c）反气旋判别式要求$V_g \le fr/4 = 2.6\ \mathrm{m\,s^{-1}}$。实用规则随之而来：曲率订正在$r \lesssim 500\ \mathrm{km}$时重要，它们总是削弱气旋式解、在大$V_g$下会摧毁反气旋式解，而预报模型在$50\ \mathrm{km}$尺度分辨的地面低压根本不能用地转规则来读。
:::
:::

::: example 近惯性流 {#ex-inertial-current}
风暴过后，$45\ \mathrm{^\circ N}$的海洋混合层留下与空间均匀的非地转速度$0.5\ \mathrm{m\,s^{-1}}$的不平衡（风生流的摩擦松弛使其低于地转值）。描述其后的运动，求振荡振幅和相对平均位置的最大位移。
::: solution
以相对地转流的非地转速度$\mathbf{u}_a$度量，动量方程为$\mathrm{d}\mathbf{u}_a/\mathrm{d}t = -f\,\mathbf{k}\times\mathbf{u}_a$：混合层执行振幅$0.5\ \mathrm{m\,s^{-1}}$、周期$2\pi/f = 17\ \mathrm{h}$的惯性振荡，叠加在其平均地转漂移上。位移振幅为$u_a/f = 0.5/1.03\times10^{-4} = 4.9\ \mathrm{km}$：一个水团绕其平均位置游荡数公里而风毫无变化。观测的流速计记录正是如此——每次风暴后17小时振荡如敲响的钟般连荡数日——同样的钟声也解释夜间低空急流的振荡过冲：日落时表面摩擦松弛使风非地转、边界层惯性振荡，直到晨间摩擦再次把它阻尼掉。
:::
:::

::: warning 科里奥利力不做功，浴缸不记得半球，而地转风不是风
五个要尽早杀死的错误。**科里奥利力不做功**——它垂直于速度、只改方向、永远无法加速任何东西；风由压力加速，视在力只是掌舵。**浴缸涡神话**：浴缸放水方向由盆形和残余旋量设定，不由半球设定——盆自身的Rossby数巨大——而对一个大、静、精心控制、放水一天的盆，同一说法确实成立。**地转风不是风**：它是平衡部分，高空通常为真实风的80–100%，但近地面只有50–70%，摩擦在那里把风越过等压线推向低压——而正是那个小的穿等压线分量把空气送进低压、使它们加深。**$f$为零不是旋转为零**：赤道$f = 0$但$\boldsymbol{\Omega}$的水平分量不消失，赤道波和Kelvin模由它支配——热带不是无旋转，而是以不同方式旋转。**还有平衡不是因果**：等压线不"导致"风；风场和气压场是同一个演化系统的两个侧面，图看起来平衡是因为不平衡被迅速以重力波辐射掉、并被非地转运动调整掉。
:::

::: history
旋转参考系的运动学由**Gaspard-Gustave de Coriolis**了结，他于1835年发表了视在力的形式，建立在**欧拉**和**拉普拉斯**早先的力学之上；**Pierre-Simon Laplace**已在1779年写下流体大气的方程。**Christoph Buys Ballot**在1857年编纂了经验规则——背风而立、北半球低压在左——即民间形式的地转定律。**Vilhelm Bjerknes**在1904年把预报改写为这些方程的积分，**Carl-Gustaf Rossby**在1939年辨认出行星涡度梯度和以其命名的波，那个发现让数值预报成为可能。**梯度风**关系由**Margules**和因斯布鲁克学派在1903年前后完成其气象应用，海洋的近惯性振荡最先从**Nansen**的Fram号（1893–96）的漂流中被分离、由**Ekman**在1905年解释。
:::

第一定律的热力学项在 [[atmospheric-dynamics/thermodynamics]] 展开，状态方程和静力稳定度在同一课，湿形式在 [[atmospheric-dynamics/moist-thermodynamics]]；驱动气压梯度的辐射在 [[atmospheric-dynamics/radiative-transfer]]；建立在这些方程上的涡度代数在 [[atmospheric-dynamics/vorticity]]，真实天气图的平衡流在 [[atmospheric-dynamics/balanced-flow]]，摩擦与边界层在 [[atmospheric-dynamics/boundary-layer]]，它们解释的一般环流在 [[atmospheric-dynamics/general-circulation]]。海洋的惯性流在 [[oceanography/wind-driven]]。

::: quiz
$45\ \mathrm{^\circ N}$的地面低压等压线密集且强烈弯曲。与由同一气压梯度算出的地转风相比，实际风
- [ ] 更快，因为曲率添了离心力。
- [x] 更慢，因为低压周围压力部分提供了离心加速度。
- [ ] 相同——地转风总是实际风。
- [ ] 只在夜里更快。
::: solution
低压周围的径向平衡是$V^{2}/r + fV = fV_g$：压力必须同时提供科里奥利力和向心加速度，所以$V < V_g$。$45\ \mathrm{^\circ N}$、半径$100\ \mathrm{km}$、$V_g = 20\ \mathrm{m\,s^{-1}}$的低压，梯度风只有$10\ \mathrm{m\,s^{-1}}$——用地转规则读这样的系统会把风翻倍。
:::
:::

::: summary
- 在旋转参考系中，水平动量方程携带科里奥利力$-f\mathbf{k}\times\mathbf{v}$，$f = 2\Omega\sin\phi$，其对普通风的量级等于普通气压梯度力——旋转是主导项，不是订正项。
- Rossby数$U/fL$决定哪套动力学适用：天气尺度流$\ll 1$（地转），中尺度$\sim 1$，对流和湍流$\gg 1$。
- 除最小尺度外垂直运动都是静力的；层厚正比于平均温度，这就是暖柱有高等压面的原因。
- 地转风平行于等压线、风速$\propto$气压梯度$/f$；它是风的平衡部分，由绕它的惯性振荡趋近。
- 从静止启动的无摩擦气团绕半径$U/f$、周期$2\pi/f$的惯性圆螺旋进入地转风；近惯性运动支配海洋混合层和夜间边界层。
- 曲率使低压周围的流亚地转、高压周围的超地转，而$V_g > fr/4$时反气旋解不复存在——强反气旋风需要巨大半径的原因。
:::

## 练习

::: exercise 科里奥利参数 {level=1 check="1.26"}
以$10^{-4}\ \mathrm{s^{-1}}$为单位计算$60\ \mathrm{^\circ N}$的$f$（两位小数）。
::: solution
$f = 1.46\times10^{-4}\sin 60^\circ = 1.26\times10^{-4}\ \mathrm{s^{-1}}$。$30$与$60\ \mathrm{^\circ N}$之间1.7倍的因子，就是同一气压型越靠近极地驱动的风越弱的原因。
:::
:::

::: exercise 地转风 {level=1 check="8.1"}
$45\ \mathrm{^\circ N}$、气压梯度$1\ \mathrm{hPa}$每$100\ \mathrm{km}$、$\rho = 1.2\ \mathrm{kg\,m^{-3}}$，求地转风速（$\mathrm{m\,s^{-1}}$）。
::: solution
$V_g = |\nabla p|/(\rho f) = 10^{-3}/(1.2\times1.03\times10^{-4}) = 8.1\ \mathrm{m\,s^{-1}}$。把它当标尺记住：每一百帕每一百公里，四十五度处每秒八米。
:::
:::

::: exercise 惯性周期 {level=1 check="17"}
求$45\ \mathrm{^\circ N}$惯性振荡的周期（小时，取整）。
::: solution
$T = 2\pi/f = 2\pi/1.03\times10^{-4} = 6.1\times10^{4}\ \mathrm{s} = 17\ \mathrm{h}$。这个周期就是凡日落后摩擦急剧松弛之处，夜间风速极大值的周期都接近当地惯性周期的原因。
:::
:::

::: exercise 锋的Rossby数 {level=2 check="0.5"}
$50\ \mathrm{^\circ N}$的锋带$U = 20\ \mathrm{m\,s^{-1}}$、$L = 100\ \mathrm{km}$。计算$\mathrm{Ro}$（一位小数）。
::: solution
取$f = 1.11\times10^{-4}\ \mathrm{s^{-1}}$，$\mathrm{Ro} = 20/(1.11\times10^{-4}\times10^{5}) = 1.8$。锋是轻微非地转的：旋转仍然组织它们——锋之所以窄是因为地转调整把它们集中——但其内部抬升空气、造出云带的是非地转环流，而恰恰是经典平衡理论扔掉的$\mathrm{Ro} \sim 1$那一项。
:::
:::

::: exercise 低压周围的梯度风 {level=2 check="8.6"}
$45\ \mathrm{^\circ N}$、半径$500\ \mathrm{km}$、$V_g = 10\ \mathrm{m\,s^{-1}}$的低压，求梯度风（$\mathrm{m\,s^{-1}}$，一位小数）。
::: solution
$V = \frac{fr}{2}\left(\sqrt{1 + 4V_g/fr}-1\right)$，$fr = 51.6\ \mathrm{m\,s^{-1}}$：$V = 25.8(\sqrt{1.78}-1) = 8.6\ \mathrm{m\,s^{-1}}$，低于地转百分之十四。当$4V_g/fr$接近1、即$r \lesssim 4V_g/f \approx 400\ \mathrm{km}$时，曲率订正变得重要。
:::
:::

::: exercise 层厚 {level=2 check="888"}
平均温度$288\ \mathrm{K}$，求$1000$–$900\ \mathrm{hPa}$层厚（米）。
::: solution
$H = R_d\bar T\ln(p_1/p_2)/g = 287\times288\times0.1054/9.81 = 888\ \mathrm{m}$。平均$273\ \mathrm{K}$时同一层厚$842\ \mathrm{m}$——$46\ \mathrm{m}$的差正是高空图显示为暖脊冷槽的信号。
:::
:::

::: exercise 高压上限 {level=3 check="2.6"}
$45\ \mathrm{^\circ N}$，求半径$100\ \mathrm{km}$反气旋的梯度风解的地转上界$V_g^{\max} = fr/4$（$\mathrm{m\,s^{-1}}$，一位小数）。
::: solution
$V_g^{\max} = fr/4 = 1.03\times10^{-4}\times10^{5}/4 = 2.6\ \mathrm{m\,s^{-1}}$。超过它反气旋二次方程无实根：所需的科里奥利力将超过气压场能提供的、同时又把气团向外甩。自然的变通是几何——副热带大高压横跨数千公里，那里$fr/4 \sim 65\ \mathrm{m\,s^{-1}}$、上限无关紧要——这就是行星上最强的风聚集在气旋周围而从不聚集在反气旋周围的原因。
:::
:::

::: exercise 推导惯性圆 {level=3 check="97"}
从$\dot u = fv$、$\dot v = -fu$、$\mathbf{v}(0) = (U, 0)$出发，证明轨迹是圆，并求$45\ \mathrm{^\circ N}$、$U = 10\ \mathrm{m\,s^{-1}}$的半径（km，取整）。
::: solution
求导，$\ddot u = f\dot v = -f^{2}u$，所以$u = U\cos ft$、$v = -U\sin ft$。从原点积分，$x = (U/f)\sin ft$、$y = (U/f)(1 - \cos ft)$：绕$(0, U/f)$、半径$U/f$的圆，顺时针——反气旋式——周期$2\pi/f$。数值上$U/f = 10/1.03\times10^{-4} = 97\ \mathrm{km}$。把地转漂移$\mathbf{v}_g$加到这个解上就是完整的无摩擦响应：气团沿等压线打圈，圈半径随$f$增大而在高纬缩小，而打圈运动的均值恰是地转风——这就是大气"调整"到平衡的准确含义。
:::
:::
