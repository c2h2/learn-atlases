运动学是不考虑成因的运动几何，而在流体力学中，这一课是你学习一门新语言的地方。流体没有身份——你无法两次指出"同一团水"——因此描述它的运动必须在**跟踪微团**与**观察定点**之间做出选择，而这个选择将改变[[fluid-mechanics/fluid-properties|流体的性质]]和[[statics]]之后每一个方程的形式。

这门课值得下功夫的原因在于，**流体力学中几乎每一个难题都是一个伪装起来的运动学问题**。流动是否分离、机翼是否失速、泵在叶轮进口处是否空化、烟羽是否转为湍流、面板法是否收敛，都在任何力被算出来之前很久，就由速度场的几何——它的流线、涡量、应变和环量——决定了。

::: warning 让本课程后续内容全部出错的七个运动学错误
**把迹线与流线混为一谈。**二者只在**定常**流中重合，而且这种区别并非学究气：在周期性往复的潮汐中，港湾染料示踪画出的脉线（染色线）是**闭合回路**，而流线则横扫整个海湾；用速度场的一张快照算出的污染物扩散轨迹，会差上整整一个潮汐输运距离。**在固定点对场求导，却称之为微团的加速度。**物质导数是
$$
\frac{D \mathbf{V}}{D t} = \frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V}
$$
第二项——**对流**加速度——在**定常**流中同样存在，而且通常更大。稳定喷嘴中的流体以$10\ g$加速，而任何一点都不随时间变化；受过刚体动力学训练的读者会去找非定常项，找到零，然后断定什么都没发生。**因为速度场看起来光滑就假定它不可压缩。**连续性是关于**散度**的陈述，而$\mathbf{V} = \left( x^{2}, y^{2}, 0 \right)$光滑、定常、二维，却以$2 x + 2 y$违背连续性。每个速度场都必须检验，而检验只花十秒钟。**令$\nabla \times \mathbf{V} = 0$，却又使用带剪切的速度剖面。**均匀流涡量为零；边界层、圆管泊肃叶剖面和自由涡的涡核都有涡量，而自由涡才是陷阱——它的涡量**除原点外处处**为零，在原点处为无穷大，环量却不为零。对涡做无旋分析处处正确，却把它结构的全部都漏掉了。**在有旋流中跨流线使用伯努利方程。**$p / \rho + V^{2} / 2 + g z$中的常数**只有当流动无旋时才在每条流线上相同**，而圆管充分发展剖面、水轮机尾流和大气边界层都不是无旋的。在壁面处使用来流的伯努利常数，压强的误差量级为$\tfrac{1}{2} \rho U^{2}$，而这正是你要测的全部压差。**叠加两个势流却忘记了自己造出的奇点。**源加均匀流有一个速度为**零**、压强为滞止压强的驻点；源加汇加均匀流有两个。置于拐角处的偶极子产生无穷大速度，而把配置点放在面板边界而非面板中心的面板法，会把那个无穷大当成答案读出来。**把流函数当成速度势。**$\phi$与$\psi$是共轭的：速度是$\nabla \phi$，且**垂直**于$\nabla \psi$。对$\psi$求导时符号弄反的学生会得到旋转了九十度的流动，而由于许多教科书例题的流线是对称的，这个错误一直隐藏到阻力从侧面冒出来才被发现。
:::

## 描述流动

::: definition 两种描述方法与物质导数 {#def-describe}
$$
\begin{array}{l l l}
\text{描述方法} & \text{自变量} & \text{跟踪对象} \\
\text{拉格朗日} & \left( \mathbf{a}, t \right),\ \mathbf{a} = \text{微团标记} & \text{逐个微团} \\
\text{欧拉} & \left( x, y, z, t \right) & \text{空间固定点}
\end{array}
$$
**物质（随体、全）导数。**对任意属性$f \left( x, y, z, t \right)$：
$$
\boxed{ \frac{D f}{D t} = \frac{\partial f}{\partial t} + u \frac{\partial f}{\partial x}
+ v \frac{\partial f}{\partial y} + w \frac{\partial f}{\partial z}
= \frac{\partial f}{\partial t} + \mathbf{V} \cdot \nabla f }
$$
**加速度场。**
$$
\mathbf{a} = \frac{D \mathbf{V}}{D t} = \underbrace{\frac{\partial \mathbf{V}}{\partial t}}_{\text{当地}}
+ \underbrace{\left( \mathbf{V} \cdot \nabla \right) \mathbf{V}}_{\text{对流}}
$$
**算例：收缩喷嘴。**理想化的一维收缩段，
$$
u \left( x \right) = U_0 \left( 1 + \frac{x}{L} \right), \qquad v = w = 0, \qquad 0 \le x \le L
$$
其**当地**加速度为**零**，对流加速度为
$$
a_x = u \frac{\partial u}{\partial x} = \frac{U_0^{2}}{L} \left( 1 + \frac{x}{L} \right)
$$
对$U_0 = 2\ \mathrm{m / s}$、$L = 0.5\ \mathrm{m}$：$a_x$从进口的$8\ \mathrm{m / s^{2}}$升到出口的$16\ \mathrm{m / s^{2}}$——**在定常流中达到$1.6\ g$**，完全由流体运动到速度不同的地方所产生。
**使文丘里管喉部成为空化问题的那个数字。**量级分析：$a \sim U^{2} / L$，所以喉部长度减半，加速度和驱动它的压强梯度都**加倍**。$U = 20\ \mathrm{m / s}$、$L = 20\ \mathrm{mm}$时加速度为$20{,}000\ \mathrm{m / s^{2}} = 2{,}000\ g$，所需压强梯度为$\rho a = 20\ \mathrm{MPa / m}$——不到一米压降就超过水的饱和蒸气压。**每一台会空化的文丘里管都是按这个量级关系设计的，而不只看压强。**
**四种线型。**
$$
\begin{array}{l l l}
\text{迹线} & d \mathbf{r} / d t = \mathbf{V} \left( \mathbf{r}, t \right) & \text{单个微团的历程} \\
\text{脉线} & \text{通过某定点的一切微团的轨迹} & \text{一缕烟、一条染料迹} \\
\text{流线} & d \mathbf{r} \times \mathbf{V} = 0, \quad d x / u = d y / v = d z / w & \text{与瞬时速度相切} \\
\text{时间线} & \text{一组标记的相邻微团} & \text{其变形给出应变率}
\end{array}
$$
**定常流中四线重合**；流体不能穿越流线这一事实，正是流线成为控制体天然边界的原因。
**算例：四线不重合的非定常场。**$\mathbf{V} = \left( a t - b y,\ b x,\ 0 \right)$，$a, b$为常数：任一时刻流线是平移了$a t / b$的圆，迹线却是**螺线**，从一点释放的染料画出一条**摆线状的脉线**。**这就是搅拌釜近壁处的流动，也是搅拌器的混合时间无法由单一稳态 CFD 解预测的原因。**
:::

::: definition 连续性方程 {#def-continuity}
$$
\boxed{ \frac{\partial \rho}{\partial t} + \nabla \cdot \left( \rho \mathbf{V} \right) = 0 }
\qquad \Longleftrightarrow \qquad
\frac{D \rho}{D t} + \rho \, \nabla \cdot \mathbf{V} = 0
$$
**对密度恒定的流体**，它化为
$$
\nabla \cdot \mathbf{V} = 0
\quad \Longleftrightarrow \quad
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0
$$
**积分形式**，对固定控制体：
$$
\frac{\partial}{\partial t} \int_{CV} \rho\, dV + \oint_{CS} \rho \mathbf{V} \cdot d\mathbf{A} = 0
$$
**每天被用上一千次的一维化简：**
$$
\rho_1 V_1 A_1 = \rho_2 V_2 A_2, \qquad Q = V A
$$
**必须对每个场做的检验。**$\mathbf{V} = \left( 2 x^{2} + y^{2} + z^{2} - 3 y - 3 z,\ 2 y^{2} + x^{2} + z^{2} - 3 x - 3 z,\ 2 z^{2} + y^{2} + x^{2} - 3 x - 3 y \right)$是否满足连续性方程？
$$
\frac{\partial u}{\partial x} = 4 x, \quad
\frac{\partial v}{\partial y} = 4 y, \quad
\frac{\partial w}{\partial z} = 4 z
\quad \Rightarrow \quad \nabla \cdot \mathbf{V} = 4 \left( x + y + z \right) \ne 0
$$
**不满足**；除平面$x + y + z = 0$外，该场在任何地方都不是可能的不可压缩流动。**同一个场对于密度按$D \rho / D t = - 4 \rho \left( x + y + z \right)$变化的流体却是可能的流动**，这正是连续性方程是一条**定律**而非流体属性这层含义。
**管道的面积–速度关系。**给定$A \left( x \right)$且$V \left( x \right) = Q / A$：
$$
\frac{1}{V} \frac{d V}{d x} = - \frac{1}{A} \frac{d A}{d x}
$$
**决定风洞收缩比的那个数字。**$10\ \mathrm{m}$的稳定段向$1\ \mathrm{m}$试验段供气，$V \propto 100$，而要保持流动不脱离收缩段壁面所需的加速长度——经典的**贝尔-梅塔（Bell and Mehta）**型线$\left( 1 + 25 e^{- 8 x / L} \right)$——由$d \left( \tfrac{1}{2} \rho V^{2} \right) / d x$不得超过边界层所能承受的能力这一要求决定。**风洞收缩段是一个运动学问题，其湍流度就是答案。**
:::

## 两个标量函数

::: definition 流函数 {#def-psi}
**二维不可压缩流。**按下式定义即自动满足连续性：
$$
u = \frac{\partial \psi}{\partial y}, \qquad v = - \frac{\partial \psi}{\partial x}
\qquad \Longleftrightarrow \qquad
\mathbf{V} = \frac{1}{\rho} \nabla \times \left( \psi \hat{\mathbf{k}} \right)
$$
$\psi = $常数的线就是**流线**，且**两条流线之间的体积流量等于$\psi$之差**：
$$
Q_{1 \to 2} = \psi_2 - \psi_1
$$
**平面极坐标下**
$$
v_r = \frac{1}{r} \frac{\partial \psi}{\partial \theta}, \qquad
v_{\theta} = - \frac{\partial \psi}{\partial r}
$$
**基本构件。**
$$
\begin{array}{l c c l}
\text{流动} & \phi & \psi & \text{速度} \\
\text{沿 } x \text{ 的均匀流 } U & U x = U r \cos \theta & U r \sin \theta = U y & \left( U, 0 \right) \\
\text{原点处的源 } m & \dfrac{m}{2 \pi} \ln r & \dfrac{m}{2 \pi} \theta & v_r = \dfrac{m}{2 \pi r} \\
\text{汇 } - m & - \dfrac{m}{2 \pi} \ln r & - \dfrac{m}{2 \pi} \theta & \text{向内} \\
\text{涡 } \Gamma & - \dfrac{\Gamma}{2 \pi} \theta & \dfrac{\Gamma}{2 \pi} \ln r & v_{\theta} = \dfrac{\Gamma}{2 \pi r} \\
\text{朝向 } - x \text{ 的偶极子 } \mu & - \dfrac{\mu \cos \theta}{2 \pi r} & - \dfrac{\mu \sin \theta}{2 \pi r} & \text{按 } 1 / r^{2} \text{ 衰减}
\end{array}
$$
**算例：驻点（直角）流。**$\psi = x y$给出
$$
u = \frac{\partial \psi}{\partial y} = x, \qquad v = - \frac{\partial \psi}{\partial x} = - y
$$
连续性：$\partial u / \partial x + \partial v / \partial y = 1 - 1 = 0$ ✓。涡量：$\partial v / \partial x - \partial u / \partial y = 0$ ✓ **无旋**。流线$x y = $常数是等轴双曲线，原点是一个**驻点**。壁面$y = 0$上的速度为$u = x$，所以流动**从头部沿壁面线性加速**——这是机翼前缘和皮托管头部附近流动的理想化，相应的压强梯度$d p / d x = - \rho u\, du / d x = - \rho x$是使边界层保持附着的**顺压**梯度。
**使驻点传热可解的那个数字。**因为$u_e \left( x \right) = C x$是边界层方程存在**相似**解的**唯一**外流速度分布（**1956 年**的希门茨（Hiemenz）流），驻点是唯一具有精确粘性解的非平板情形——一切散热器冲击冷却关联式都建立在它之上。
:::

::: definition 速度势与环量 {#def-phi}
**无旋流。**在$\nabla \times \mathbf{V} = 0$处存在**速度势**，满足
$$
\mathbf{V} = \nabla \phi
\quad \Longleftrightarrow \quad
u = \frac{\partial \phi}{\partial x}, \quad v = \frac{\partial \phi}{\partial y}
$$
代入连续性方程得**拉普拉斯方程**
$$
\nabla^{2} \phi = 0
$$
**柯西-黎曼关系**——它使$\phi$与$\psi$构成一对解析函数，并使整个经典空气动力学成为复变函数论的一章：
$$
\frac{\partial \phi}{\partial x} = \frac{\partial \psi}{\partial y} = u, \qquad
\frac{\partial \phi}{\partial y} = - \frac{\partial \psi}{\partial x} = v, \qquad
W \left( z \right) = \phi + i \psi, \qquad \frac{d W}{d z} = u - i v
$$
**两族曲线——$\phi = $常数与$\psi = $常数——正交相交**，由此得到的**流网**是一种图解求解器，直到**1950 年**都是最先进的工具，今天仍是判断数值网格是否可靠的最快方法。
**环量。**
$$
\Gamma = \oint_C \mathbf{V} \cdot d \mathbf{s} = \iint_S \left( \nabla \times \mathbf{V} \right) \cdot \mathbf{n}\, dA
$$
**对自由涡**$v_\theta = \Gamma / \left( 2 \pi r \right)$**沿半径为$r$的圆周的计算**：
$$
\Gamma_{\mathrm{circ}} = v_{\theta} \times 2 \pi r = \frac{\Gamma}{2 \pi r} \times 2 \pi r = \Gamma
$$
**与$r$无关**，而涡量$\nabla \times \mathbf{V}$在回路上每一点都为零。**环量是所围区域的属性，而非回路的属性；含奇点的区域不是单连通区域**——这正是允许无旋流承载升力的严格表述。
**使翼型成为可能的那个数字。**圆柱在无粘无旋流中阻力**为零**、升力也**为零**（**1752 年**达朗贝尔佯谬）；加上环量为$\Gamma$的涡后，单位展向升力为
$$
\boxed{ L' = \rho U_{\infty} \Gamma } \qquad \text{（库塔-茹科夫斯基，1902--1906）}
$$
对$\rho = 1.225$、$U = 60\ \mathrm{m / s}$、$\Gamma = 12\ \mathrm{m^{2} / s}$：$L' = 882\ \mathrm{N / m}$展长。**一展$24\ \mathrm{m}$的机翼按$882\ \mathrm{N / m}$承载$21{,}100\ \mathrm{N}$——一架轻型飞机——而上个世纪全部空气动力学要回答的就是$\Gamma$由什么决定。**
:::

::: widget plot
f: 1-4*pow(sin(x*pi/180),2); -1
x: 0, 180
y: -3.2, 1.2
labels: Cp on a cylinder, potential flow; Cp on a real cylinder at Re = 1e5
caption: 均匀流中圆柱表面压强系数$C_p = \left( p - p_{\infty} \right) / \left( \tfrac{1}{2} \rho U_{\infty}^{2} \right) = 1 - \left( v_{\theta} / U_{\infty} \right)^{2}$随角位置的变化。势流曲线来自$v_{\theta} = - 2 U_{\infty} \sin \theta$，**前后对称**，积分结果阻力为零——一行字就是达朗贝尔佯谬。$C_p = - 1$的水平线是雷诺数$10^{5}$下真实圆柱**后半**表面的实测平均值：边界层在$\theta \approx 82^{\circ}$分离，底部压强停在$- 1.2$附近。**整个后半表面$1.2$的压强亏缺就是压差阻力**；而底部压强系数改变$12\ \%$——通过触发使边界层转为湍流，把分离点移到$120^{\circ}$——就能把阻力削减**三分之一**，这正是高尔夫球有凹坑、板球有缝线的原因。
:::

## 叠加原理及其应用

::: definition 典型势流 {#def-canonical}
**圆柱。**强度为$\mu = 2 \pi U a^{2}$的偶极子置于均匀流原点，得到
$$
\psi = U \left( r - \frac{a^{2}}{r} \right) \sin \theta, \qquad
v_r = U \left( 1 - \frac{a^{2}}{r^{2}} \right) \cos \theta, \qquad
v_{\theta} = - U \left( 1 + \frac{a^{2}}{r^{2}} \right) \sin \theta
$$
在表面$r = a$上：$v_r = 0$ ✓，$v_{\theta} = - 2 U \sin \theta$，所以**最大表面速度是来流速度的两倍**（在$\theta = 90^{\circ}$处），压强系数为
$$
C_p = 1 - 4 \sin^{2} \theta
$$
**驻点在$\theta = 0$和$\pi$处**，该处$C_p = 1$。
**带环量的圆柱。**加上一个涡后，驻点移到
$$
\sin \theta = - \frac{\Gamma}{4 \pi U a}
$$
当$\Gamma > 4 \pi U a$时**驻点离开表面**，这是流动不再满足库塔条件的数学标志。升力为$L' = \rho U \Gamma$，阻力仍为**零**——佯谬在有升力时依然成立。
**兰金半体。**均匀流中放一个强度为$m$的源：
$$
\psi = U r \sin \theta - \frac{m}{2 \pi} \theta, \qquad
r_{\mathrm{stag}} = \frac{m}{2 \pi U} \ \text{在}\ \theta = \pi
$$
下游无穷远处物体的半厚为
$$
h = \frac{m}{2 U}, \qquad \text{单位深度的总体积} = \frac{m}{U} = 2 h
$$
**为皮托管支架和天线桅杆定尺寸的那个数字。**半体是无粘流体中**钝头支柱**的形状，源到头部的距离为$h / \pi$——所以物体的宽度**是从源到头部深度的$\pi \approx 3.14$倍**，头部半径为$0.69\ h$。这就是**流线型**物体细长而**钝**物体不细长的原因。
**兰金椭圆。**强度为$\pm m$、相距$2 a$的源-汇对置于速度$U$的均匀流中。记$l = m / \left( \pi U a \right)$，半长与半厚满足
$$
\frac{L}{2 a} = \sqrt{1 + l}, \qquad
\frac{B}{2 a} = \beta \quad \text{其中} \quad \beta = l \arctan \left( \frac{1}{\beta} \right)
$$
于是长厚比为
$$
\begin{array}{l c c c c}
l = m / \left( \pi U a \right) & 0.5 & 1.0 & 2.0 & 5.0 \\
B / \left( 2 a \right) & 0.53 & 0.86 & 1.30 & 2.16 \\
L / B & 2.31 & 1.64 & 1.33 & 1.13
\end{array}
$$
**使物体细长比成为设计变量的那个数字。**兰金椭圆的表面峰值速度随物体变厚而升高——$L / B = 2.3$时约$1.15\ U$，$L / B = 1.33$时约$1.9\ U$——所以**越钝**的物体**峰值吸力越大**，最先空化或分离，这就是水翼厚度受空化数而非强度限制的原因。
**墙附近的源。**距平面墙$a$处强度为$m$的源等价于源加其镜像，所得流动在墙上有一个驻点，其流线的**位移**正是**钝体**对近旁壁面影响的模型——风洞模型堵塞修正中的**壁面修正**
$$
\frac{\Delta U}{U} \approx \frac{\pi^{2}}{8} \left( \frac{d}{H} \right)^{2}
$$
**每一项风洞结果都必须施加的那个数字。**高$H = 0.3\ \mathrm{m}$的风洞中直径$d = 0.1\ \mathrm{m}$的模型给出$\Delta U / U = 1.23 \%$，相应的**动压**误差为$2.5\ \%$——比典型实验想要测出的气动效应还大。**堵塞修正不是精化，而是拿到风洞数据后做的第一件事。**
:::

::: definition 变形与旋转 {#def-deform}
**速度梯度张量的分解**（亥姆霍兹速度分解定理）：
$$
\frac{\partial u_i}{\partial x_j} = e_{ij} + \omega_{ij}, \qquad
e_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right), \qquad
\omega_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} - \frac{\partial u_j}{\partial x_i} \right)
$$
**三个旋转分量与涡量。**
$$
\omega_z = \tfrac{1}{2} \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right), \qquad
\zeta_z = 2 \omega_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}
$$
**角（剪切）变形率。**
$$
\dot{\gamma}_{xy} = \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x} = 2 e_{xy}
$$
**注意$\dot{\gamma}_{xy} = 0$与$2 \omega_z = 0$是两个不同的条件**：前者说微团保持直角，后者说微团不转动。
**两个线应变率**$\dot{\varepsilon}_{xx} = \partial u / \partial x$、$\dot{\varepsilon}_{yy} = \partial v / \partial y$；不可压缩流的连续性即$\dot{\varepsilon}_{xx} + \dot{\varepsilon}_{yy} + \dot{\varepsilon}_{zz} = 0$——**体积不变，故三个法向应变率之和为零。**
**算例：简单剪切**$\mathbf{V} = \left( k y, 0, 0 \right)$：
$$
\dot{\varepsilon}_{xx} = 0, \quad \dot{\varepsilon}_{yy} = 0, \quad
\dot{\gamma}_{xy} = k, \qquad
\omega_z = - \frac{k}{2}, \quad \zeta_z = - k
$$
**纯剪切是有旋的**，第一次见到的人都会吃惊：库埃特流中的流体微团在平移的同时**转动**，转速为涡量的一半。
**算例：自由涡**$v_\theta = C / r$：
$$
\zeta_z = \frac{1}{r} \frac{\partial \left( r v_{\theta} \right)}{\partial r} = \frac{1}{r} \frac{\partial C}{\partial r} = 0
\quad \left( r > 0 \right)
$$
**无旋**，尽管每个流体微团都在绕圆周转。化解之道在于微团**变形**——它切向拉伸、径向收缩，其速率恰好使它不转动。**自由涡中的流体微团就像一辆绕环形路口行驶而车轮自由转动的汽车：它绕中心转，却不绕自身转。**
**算例：强制涡**$v_\theta = \Omega r$：
$$
\zeta_z = \frac{1}{r} \frac{\partial \left( \Omega r^{2} \right)}{\partial r} = 2 \Omega
$$
**每个微团以$\Omega$转动，涡量是转速的两倍**——这个两倍因子考倒过每一场考试和每一次面试。
**使涡量成为设计量的那个数字。**在涡轮叶栅中，**损失系数**由出口截面的**环量亏损**和**二次涡通量**算出，通流流动端壁涡通量变化$1\ \%$相当于级效率的$0.15\ \%$。**涡量输运是叶轮机械设计师核算损失的方式**，其测量是用五孔探针在环面内 200 个点上遍历三个速度分量。
:::

## 算例

::: example 检验速度场 {#ex-field}
判断下列每个场（i）是否为可能的不可压缩流动，（ii）是否无旋；两者都成立时求流函数和速度势：
$\mathbf{V}_1 = \left( 2 x y,\ - y^{2} - 2 x z,\ 0 \right)$，$\mathbf{V}_2 = \left( x^{2} - y^{2},\ - 2 x y,\ 0 \right)$，$\mathbf{V}_3 = \left( - y,\ x,\ 0 \right)$。
::: solution
**场 1。**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z}
= 2 y + \left( - 2 y \right) + 0 = 0 \quad \checkmark \ \text{满足连续性}
$$
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 - 2 x = - 2 x \ne 0
\quad \Rightarrow \quad \text{有旋}
$$
**流函数存在**（流动二维且满足连续性）：
$$
\psi = \int u\, d y = x y^{2} + f \left( x \right), \qquad
v = - \frac{\partial \psi}{\partial x} = - y^{2} - f' \left( x \right) = - y^{2} - 2 x z
$$
**这要求$f' = 2 x z$——不可能，因为$f$只能依赖于$x$。**尽管$w = 0$，**该场并不是二维的**，因为$v$依赖于$z$。**陷阱在于：$w = 0$并不能使流动成为二维的；$\partial / \partial z = 0$才行。**场 1 是一个合法的三维不可压缩流动，但不存在流函数。
**场 2。**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 2 x - 2 x = 0 \quad \checkmark
\qquad
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - 2 y - 2 y = - 4 y \ne 0
$$
**满足连续性且有旋。**流函数：
$$
\psi = \int u\, d y = \int \left( x^{2} - y^{2} \right) d y = x^{2} y - \frac{y^{3}}{3} + f \left( x \right)
$$
$$
v = - \frac{\partial \psi}{\partial x} = - 2 x y - f' \left( x \right) = - 2 x y
\quad \Rightarrow \quad f' = 0
$$
$$
\boxed{ \psi = x^{2} y - \frac{y^{3}}{3} }
$$
**场 3。**$\mathbf{V} = \left( - y, x, 0 \right)$：
$$
\nabla \cdot \mathbf{V} = 0 \quad \checkmark, \qquad
\zeta_z = 1 - \left( - 1 \right) = 2
$$
**满足连续性、有旋，是角速度为 1 的刚体转动。**$\psi = x^{2} / 2 + y^{2} / 2 = r^{2} / 2$，所以流线是**圆**，速度势不存在。
**解读。** **这三个场覆盖了四种逻辑情形**：连续且无旋（此处没有）、连续且有旋（1、2、3），第四种——不连续——根本不是流动。**运动学中最有用的一个习惯，是在做任何别的事之前先算$\nabla \cdot \mathbf{V}$和$\nabla \times \mathbf{V}$**，因为它们告诉你两个标量函数中允许用哪一个，从而决定有哪些求解方法可用。
**合理性检验。**场 2 虽由调和函数构成却有旋，原因是$x^{2} - y^{2}$与$- 2 x y$**不是**一对柯西-黎曼配对——配对应是$x^{2} - y^{2}$与$2 x y$，给出$\mathbf{V} = \left( x^{2} - y^{2}, 2 x y \right)$，那属于**偶极子加均匀流**一族，是无旋的。**改一个符号就把势流变成有旋流，并毁掉整套求解方法**，这正是面板程序里法向符号弄反会得到大小正确、方向错误的升力这一现象的算术版本。
:::
:::

::: example 手工绘制流网 {#ex-flownet}
一道混凝土坝上下游水头差$6\ \mathrm{m}$，底板上游长$2\ \mathrm{m}$、下游长$4\ \mathrm{m}$。用$4$条流管、$12$个势降的流网估算坝基渗流量，并求坝趾处的扬压力。
::: solution
**流网的流量关系。**由曲线正方形组成、含$N_f$条流管和$N_d$个等势线落差的流网，
$$
q = k\, h\, \frac{N_f}{N_d} \quad \left[ \mathrm{m^{3} / s\ per\ metre\ length} \right]
$$
取$k = 2 \times 10^{- 4}\ \mathrm{m / s}$（中砂）、$h = 6\ \mathrm{m}$、$N_f = 4$、$N_d = 12$：
$$
q = 2 \times 10^{- 4} \times 6 \times \frac{4}{12} = 4.0 \times 10^{- 4}\ \mathrm{m^{3} / s\ per\ m}
$$
**每米坝长每小时$14\ \mathrm{m^{3}}$**，这就是为排水廊道水泵定型号的数字。
**扬压力。**每条等势线使水头降落$6 / 12 = 0.5\ \mathrm{m}$。坝底板下，设上下游两端之间有$7$个落差：
$$
h_{\mathrm{toe}} = 6 - 7 \times 0.5 = 2.5\ \mathrm{m} \text{（高于下游水位的水头）}
$$
**每米坝长的扬压力**，取底板长$8\ \mathrm{m}$、压强分布从坝踵的$6\ \mathrm{m}$水头到坝趾的$2.5\ \mathrm{m}$水头线性变化：
$$
u_{\mathrm{mean}} = \frac{6 + 2.5}{2} = 4.25\ \mathrm{m}, \qquad
U = 9.81 \times 4.25 \times 8 = 333.5\ \mathrm{kN / m}
$$
而坝重典型值为$1{,}800\ \mathrm{kN / m}$——扬压力占抗倾覆稳定重量的**$18\ \%$**，并以相同比例降低基底有效应力和抗倾覆能力。
**使排水幕值得钻的那个数字。**坝趾处一排排水孔把该处水头降到接近下游水位，平均扬压力降到$\left( 6 + 0.5 \right) / 2 = 3.25\ \mathrm{m}$：
$$
U = 9.81 \times 3.25 \times 8 = 255\ \mathrm{kN / m}
$$
花$200{,}000$的灌浆费换来$78\ \mathrm{kN / m}$的稳定性增益，这就是**1950 年**以后修建的每一座重力坝都设排水廊道的原因。
**出口坡降——真正的破坏模式。**下游坝趾处的水力坡降为$\Delta h / \Delta s$，其中$\Delta s$是流网最后一格正方形的边长。若最后一格长$0.6\ \mathrm{m}$，
$$
i_e = \frac{0.5}{0.6} = 0.83
$$
而石英砂的临界坡降为$i_c = \left( G_s - 1 \right) / \left( 1 + e \right) = 2.65 / 1.6 = 1.66$——安全裕度为两倍。**裕度小于一，坝趾就会发生管涌（冒水翻砂）**，而科兹尼-卡曼关系表明，冲走滤层的管涌是不可逆的。
**合理性检验。**流网之所以可行，是因为饱和土中的渗流受$\nabla^{2} h = 0$控制，而这正是**与势流同形式的拉普拉斯方程**——于是$\phi$与$\psi$的全套工具都能搬过来，用水头$h$代替$\phi / k$，用流函数代替$\psi k$。**地下水工程师和空气动力学家用不同的符号、在不同的学术会议上解同一个方程解了五十年**，而**1950 年代**松弛法从一个群体传到另一个群体，是二十世纪工程学中一场较为安静的交叉授粉。
:::
:::

::: example 涡与机翼 {#ex-lift}
一机翼翼展$12\ \mathrm{m}$、弦长$2\ \mathrm{m}$，在海平面以$60\ \mathrm{m / s}$飞行。附着涡环量估计为$\Gamma = 12\ \mathrm{m^{2} / s}$。求升力、尾迹中环量的分布、诱导阻力和下洗速度。
::: solution
**由库塔-茹科夫斯基定理求升力。**取$\rho = 1.225\ \mathrm{kg / m^{3}}$：
$$
L' = \rho U \Gamma = 1.225 \times 60 \times 12 = 882\ \mathrm{N / m}
$$
**总升力**，假定环量沿展向均匀（实际并非如此）：
$$
L = 882 \times 12 = 10.6\ \mathrm{kN}
$$
**升力系数。**$S = 12 \times 2 = 24\ \mathrm{m^{2}}$、$q = \tfrac{1}{2} \times 1.225 \times 3{,}600 = 2{,}205\ \mathrm{Pa}$：
$$
C_L = \frac{10{,}600}{2{,}205 \times 24} = 0.200
$$
**环量的尾迹。**亥姆霍兹定理要求涡线不能在流体中断止，所以各站强度为$\Gamma$的附着涡必须被**延续**——经典模型是**马蹄涡**，两条拖曳腿各强$\Gamma / 2$；升力线模型则把它们代之以强度为$d \Gamma / d y$（单位展长）的拖曳涡**片**。
**机翼处的下洗速度。**椭圆载荷、总环量$\Gamma_0$、展长$b$：
$$
w = - \frac{\Gamma_0}{2 b} = - \frac{12}{2 \times 12} = - 0.50\ \mathrm{m / s}
$$
**诱导迎角与诱导阻力。**
$$
\alpha_i = \frac{w}{U} = \frac{0.50}{60} = 0.00833\ \mathrm{rad} = 0.48^{\circ}
$$
$$
D_i = L \sin \alpha_i \approx L \alpha_i = 10{,}600 \times 0.00833 = 88\ \mathrm{N}
$$
$$
C_{D,i} = \frac{C_L^{2}}{\pi e A_R} = \frac{0.2^{2}}{\pi \times 1.0 \times 6} = 0.00212, \qquad
D_i = 0.00212 \times 2{,}205 \times 24 = 112\ \mathrm{N}
$$
**两种估算之间$27\ \%$的出入，来自第一种估算中环量均匀的假定**，以及椭圆载荷的诱导阻力是给定升力下**最小值**这一事实。
**使翼梢小翼值得买的那个数字。**诱导阻力为$88$至$112\ \mathrm{N}$，而巡航总阻力约$900\ \mathrm{N}$——占**$10$至$12\ \%$**——翼梢小翼能收回其中三分之一。**翼梢小翼是一个运动学装置：它既不减小升力也不改变翼型，而是把翼尖环量卷成一个集中涡，从而削弱拖曳涡片的强度。**
**翼尖涡的强度及其危险。**全部环量在翼尖处脱落。按**斯卡利（Scully）**模型，涡核半径$r_c = 0.05\ b = 0.6\ \mathrm{m}$，距涡核$r$处的切向速度为
$$
v_{\theta} = \frac{\Gamma}{2 \pi} \frac{r}{r^{2} + r_c^{2}}
\quad \Rightarrow \quad v_{\theta,\max} = \frac{\Gamma}{4 \pi r_c} = \frac{12}{4 \pi \times 0.6} = 1.59\ \mathrm{m / s}
$$
**在涡核边缘处**；$r = 1\ \mathrm{m}$处为$0.53\ \mathrm{m / s}$。**轻型飞机在同一高度穿越大型运输机尾迹时会遭遇$20\ \mathrm{m / s}$的垂直突风**，而各国空中交通管制的尾流间隔标准都是按这个公式而非运输机的重量算出来的。
**合理性检验。**升力是$\rho U \Gamma$而不是$\rho U^{2} \Gamma$，理由是量纲：$\left[ \rho U \Gamma \right] = \mathrm{kg \cdot m^{- 3} \cdot m \cdot s^{- 1} \cdot m^{2} \cdot s^{- 1}} = \mathrm{kg \cdot m \cdot s^{- 2}}$（单位展长），即每米的力。**库塔-茹科夫斯基结果是关于通过一条封闭回线的动量通量的陈述，不含任何物体形状的信息**——这就是同一公式给出圆柱、椭圆和翼型的升力的原因，也是形状的全部贡献都藏在$\Gamma$的数值里的原因。
:::
:::

::: example 收缩段的加速 {#ex-contraction}
某风洞稳定段直径$3.0\ \mathrm{m}$，经长$4.0\ \mathrm{m}$的贝尔-梅塔型线收缩段向$0.6\ \mathrm{m}$的试验段供气。求面积比、中心线上的速度和加速度，以及喉部压强梯度。
::: solution
**面积比与速度。**
$$
\frac{A_{\mathrm{sc}}}{A_{\mathrm{ts}}} = \left( \frac{3.0}{0.6} \right)^{2} = 25, \qquad
V_{\mathrm{ts}} = 25\, V_{\mathrm{sc}}
$$
试验段速度为$40\ \mathrm{m / s}$时，稳定段风速为$1.6\ \mathrm{m / s}$，低到其中的阻尼网效率有保证、蜂窝器的转向损失可忽略。
**由面积律求中心线速度。**直径分布为
$$
\frac{D \left( x \right)}{D_{\mathrm{ts}}} = 1 + \left( \frac{D_{\mathrm{sc}}}{D_{\mathrm{ts}}} - 1 \right) \left( A + B \xi^{2} + C \xi^{3} + E \xi^{4} + F \xi^{5} \right), \qquad \xi = 1 - \frac{x}{L}
$$
**贝尔-梅塔**系数$A = 0.2041$、$B = - 0.3699$、$C = 1.6173$、$E = - 2.8262$、$F = 2.3747$给出的型线**两端二阶导数为零**——这正是使边界层不会遇到曲率突变的条件。
**加速度。**由$V \left( x \right) = V_{\mathrm{ts}} \left( D_{\mathrm{ts}} / D \left( x \right) \right)^{2}$：
$$
a_x = V \frac{d V}{d x} = - \frac{2 V_{\mathrm{ts}}^{2}}{D} \frac{d D}{d x} \left( \frac{D_{\mathrm{ts}}}{D} \right)^{3}
$$
在**喉部**$x = L$，按构型设计$d D / d x$很小，加速度不大；在**收缩段起点**$x = 0$，贝尔-梅塔型线的$d D / d x$很大，于是
$$
a_x \big|_{x = 0} \approx \frac{2 V_{\mathrm{ts}}^{2}}{L} \times 0.35 = \frac{2 \times 1{,}600}{4.0} \times 0.35 = 280\ \mathrm{m / s^{2}} = 28.5\ g
$$
**压强梯度。**
$$
\frac{d p}{d x} = - \rho a_x = - 1.225 \times 280 = - 343\ \mathrm{Pa / m}
$$
而绝对压强是$101\ \mathrm{kPa}$——顺压梯度为每米一个大气的$0.34\ \%$，边界层可以轻松应付。**失效模式是相反的：同样量级的逆压梯度会使边界层分离**，这就是扩压段角度限于$7^{\circ}$而喷管收缩段可以达$20^{\circ}$的原因。
**决定风洞湍流度的那个数字。**收缩段使进入其中的湍流**衰减**：轴向速度脉动按$1 / \left( A_{\mathrm{sc}} / A_{\mathrm{ts}} \right) = 1 / 25$衰减，横向分量按$1 / \sqrt{25} = 1 / 5$衰减，于是湍流度为$2\ \%$的稳定段送出的脉动为
$$
u'_{\mathrm{sc}} = 0.02 \times 1.6 = 0.032\ \mathrm{m / s}
\quad \xrightarrow{\ \times 1 / 25\ }\quad
u'_{\mathrm{ts}} = 1.28 \times 10^{- 3}\ \mathrm{m / s}
\quad \Rightarrow \quad \frac{u'}{U} = \frac{1.28 \times 10^{- 3}}{40} = 0.003\ \%
$$
**绝对脉动降低二十五倍**；即便为边界层和风机留出$0.05\ \%$，比值上仍有四十倍的改善。低速风洞收缩比选在$9$到$36$之间、**收缩段长度与喉径之比**取$1.5$成为标准，全部原因尽在于此。
**合理性检验。**加速度为$28\ g$而压强梯度只有$343\ \mathrm{Pa / m}$，是因为密度为$1.225\ \mathrm{kg / m^{3}}$——**同样的加速度在水中需要$28\ \mathrm{kPa / m}$**；而水洞的收缩段短、风洞的收缩段长，是因为水承受得住压强梯度，空气承受不住分离。
:::
:::

::: history
**物质导数**是**欧拉（Euler）1755 年**对跟踪质点与观察定点的区分，其现代记号$D / D t$则是**拉格朗日（Lagrange）1788 年**的记号，由**斯托克斯（Stokes）1845 年**用于流体。**流函数**又出自**斯托克斯**，为**1842 年**之作（不过**兰金（Rankine）**在一份私人笔记中更早用过它）；**速度势**是**兰金 1858 年**的成果——正是此人，手持**格林（Green）1838 年**定理，建立了源、汇与镜像的整套工具，至今塞满每本空气动力学教材的中间几章。**经柯西-黎曼关系进入流体力学的道路**由**拉莫特（Lamott）**于**1845 年**开辟，经**基尔霍夫（Kirchhoff）、亥姆霍兹（Helmholtz）与瑞利（Rayleigh）**在**1870 年代**大力开发；**米尔恩-汤姆森（Milne-Thomson）1933 年**的《用保角变换法研究环量翼型与其他流体射流》（*Circulation Airfoils and Other Fluid Jets by the Method of Conformal Transformation*）是该技术最完整的表述，至今可读。**亥姆霍兹的三条涡定理**发表于**1858 年**，其中第三条——涡丝不能在流体中断止——是一个拓扑学陈述，它使机翼的拖曳涡、龙卷风的漏斗和烟环的闭合环成为同一种现象。**库塔-茹科夫斯基定理**由**库塔（Kutta）**于**1902 年**发表（作为他的斯图加特博士论文，导师是**利林塔尔（Lilienthal）**的同时代人），**茹科夫斯基（Joukowsky）**于**1906 年**独立发表；而使它与达朗贝尔佯谬调和的**层流边界层**，是**普朗特（Prandtl）1904 年**的海德堡会议论文——只有三页，却是现代流体力学的诞生。**贝尔与梅塔**的收缩段型线出自**1935 年**加州理工的古根海姆风洞，至今仍是每座风洞建造所依据的型线。
:::

::: quiz
平面流的速度势为$\phi = K ( x^{ 2 } - y^{ 2 } )$，流函数为$\psi = 2 K x y$。在第一象限释放的一小块方形流体会：

- [ ] 转动，因为流线$x y = $常数是弯的
- [x] 沿$x$拉伸、沿$y$压扁，不转动、面积不变——流动无旋且不可压缩，故为纯应变
- [ ] 沿$x$平移，因为$\nabla \phi$是速度
- [ ] 什么都不做，因为流动定常

::: solution
**纯应变。**$u = \partial \phi / \partial x = 2 K x$，$v = - 2 K y$，故$\partial u / \partial x = 2 K$，$\partial v / \partial y = - 2 K$——体积膨胀率为零——涡量$\omega_z = \partial v / \partial x - \partial u / \partial y = 0 - 0 = 0$。**本题考查的是第一个选项：流线弯曲并不意味着转动。**这是本学科中最顽固的错误观念之一。势涡$\psi = K \ln r$的流线是圆，除原点外涡量处处为零，绕其运动的流体微团连续变形而不转动，恰如一条狭长小船随环形水流绕圈时不断改变姿态，而其龙骨在运动学意义上保持不转。**涡量是两条相互垂直的物质线的平均角速度，而不是路径的曲率**；这一区分正是机翼拖曳涡片承载了流动全部旋转、而绕翼流动本身可按势流处理的原因。
:::
:::

## 后续内容

物质导数是[[fluid-mechanics/navier-stokes]]的左端；流函数和速度势是[[fluid-mechanics/dimensional-analysis]]相似论证的未知量，也是[[aerodynamics]]中一切面板法和势流程序的未知量；环量是[[aerodynamics]]升力线理论要求解、[[propulsion]]叶素法要积分的量；而流网所用的拉普拉斯方程，与[[heat-transfer]]的导热形状问题和[[manufacturing]]的坝基渗流问题所解的是同一个方程。

::: summary
- 欧拉描述观察定点，拉格朗日描述观察微团；桥梁是物质导数$D / Dt = \partial / \partial t + \mathbf{V} \cdot \nabla$，其对流项在定常流中同样存在。
- 迹线、脉线与流线只在定常流中重合。
- 连续性方程为$\partial \rho / \partial t + \nabla \cdot (\rho \mathbf{V}) = 0$；对密度恒定的流体$\nabla \cdot \mathbf{V} = 0$，每个速度场都必须用它检验。
- 任何二维不可压缩流都存在流函数，其等值线即流线；速度势只在无旋处存在。两者都存在时，它们构成一对柯西-黎曼配对。
- 环量是所围区域的属性而非回路的属性：自由涡处处无旋却仍有环量。
- 均匀流、源、汇、涡与偶极子的叠加生成圆柱、半体与兰金椭圆——也给出每一项风洞数据都必须施加的堵塞修正。
- 涡量是流体微团转速的两倍；强制涡的涡量为$2\Omega$，自由涡的涡量为零。
- $L' = \rho U \Gamma$对物体形状不置一词，一切都取决于$\Gamma$由什么决定。
:::

## 习题

::: exercise 连续性 {level=1 check="0"}
给出$\mathbf{V} = (2x,\; -3y,\; z)$的$\nabla \cdot \mathbf{V}$值。
::: solution
$\partial u / \partial x + \partial v / \partial y + \partial w / \partial z = 2 - 3 + 1 = 0$，故该场**是**可能的不可压缩流动。
:::
:::

::: exercise 对流加速度 {level=1 check="16"}
给出喷嘴$u = U_0(1 + x/L)$（$U_0 = 2\ \mathrm{m/s}$、$L = 0.5\ \mathrm{m}$）出口处的加速度（米每二次方秒）。
::: solution
$a_x = u\, \partial u / \partial x = U_0^2 (1 + x/L) / L$；在$x = L$处：$a_x = 2 \times 4 / 0.5 = 16\ \mathrm{m / s^{2}}$。
:::
:::

::: exercise 涡量 {level=1 check="2"}
给出刚体转动场$\mathbf{V} = (-y, x, 0)$的涡量$z$分量。
::: solution
$\zeta_z = \partial v / \partial x - \partial u / \partial y = 1 - (-1) = 2$。
:::
:::

::: exercise 圆柱 {level=1 check="-3"}
给出势流中圆柱肩部（表面速度为$2U$处）的压强系数。
::: solution
$C_p = 1 - (2)^2 = -3$。
:::
:::

::: exercise 库塔-茹科夫斯基 {level=1 check="882"}
给出$\rho = 1.225\ \mathrm{kg/m^3}$、$U = 60\ \mathrm{m/s}$、$\Gamma = 12\ \mathrm{m^2/s}$时单位展长的升力（牛）。
::: solution
$L' = 1.225 \times 60 \times 12 = 882\ \mathrm{N/m}$。
:::
:::

::: exercise 下洗速度 {level=1 check="0.5"}
给出展长$12\ \mathrm{m}$、翼根环量$12\ \mathrm{m^2/s}$的椭圆载荷机翼在机翼处的下洗速度（米每秒）。
::: solution
$w = \Gamma_0 / (2b) = 12 / 24 = 0.5\ \mathrm{m/s}$。
:::
:::

::: exercise 面积比 {level=1 check="25"}
给出稳定段$3.0\ \mathrm{m}$、试验段$0.6\ \mathrm{m}$的风洞的收缩比。
::: solution
$(3.0 / 0.6)^2 = 25$。
:::
:::

::: exercise 流函数 {level=2}
某流动的流函数为$\psi = x^2 - y^2$。给出速度分量，并判断速度势是否存在。
::: solution
$$
u = \frac{\partial \psi}{\partial y} = - 2 y, \qquad v = - \frac{\partial \psi}{\partial x} = - 2 x
$$
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - 2 - \left( - 2 \right) = 0
$$
**无旋，故速度势存在。**由$u = \partial \phi / \partial x = - 2 y$和$v = \partial \phi / \partial y = - 2 x$：
$$
\phi = - 2 x y + C
$$
**解读。**$\phi = - 2xy$与$\psi = x^{2} - y^{2}$是一对柯西-黎曼配对，该流动是**旋转了$45^{\circ}$的驻点流**。$\psi$的流线是以$y = \pm x$为渐近线的等轴双曲线，$\phi = $常数的线是共轭双曲线——两族曲线正交，这就是最简单形式的流网。
:::
:::

::: exercise 半体 {level=2}
强度$m = 8\ \mathrm{m^{2} / s}$的源置于$4\ \mathrm{m / s}$的均匀流中。给出源到驻点的距离和半体的渐近半厚。
::: solution
$$
r_{\mathrm{stag}} = \frac{m}{2 \pi U} = \frac{8}{2 \pi \times 4} = 0.318\ \mathrm{m}, \qquad
h = \frac{m}{2 U} = \frac{8}{8} = 1.0\ \mathrm{m}
$$
**物体的宽度是从源到头部深度的$\pi = 3.14$倍**，它排开的总体积流量为$m / U = 2\ \mathrm{m^{2}}$（单位深度），恰等于$2h$——这是算术正确的校核。
:::
:::

::: exercise 推导 {level=3}
由控制体导出二维连续性方程，然后证明流函数恒等地满足它，并导出流函数与两条流线之间流量的关系。
::: solution
**控制体。**取单位深度、$\delta x \times \delta y$的矩形。净质量流出率为
$$
\left[ \frac{\partial \left( \rho u \right)}{\partial x} \delta x + \frac{\partial \left( \rho v \right)}{\partial y} \delta y \right] \times 1
$$
内部质量减少率为$- \partial \rho / \partial t \times \delta x \delta y$。令两者相等并除以$\delta x \delta y$：
$$
\frac{\partial \rho}{\partial t} + \frac{\partial \left( \rho u \right)}{\partial x} + \frac{\partial \left( \rho v \right)}{\partial y} = 0
$$
**密度$\rho$恒定时**，这就是$\partial u / \partial x + \partial v / \partial y = 0$。
**流函数恒等地满足它。**代入$u = \partial \psi / \partial y$、$v = - \partial \psi / \partial x$：
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}
= \frac{\partial^{2} \psi}{\partial x \partial y} - \frac{\partial^{2} \psi}{\partial y \partial x} = 0
$$
**对任意二阶可微的$\psi$都成立**——这就是流函数"恒等地满足连续性方程"的含义，也是二维不可压缩问题只有**一个**未知量而不是两个的原因。
**两条流线之间的流量。**考虑由两条流线$\psi_1$、$\psi_2$和在$A$、$B$处连接它们的两条曲线围成的四边形。由于**流体不能穿越流线**，穿过$AB$的流出通量等于沿两条流线的通量，而沿任一路径从$A$到$B$计算通量：
$$
\dot{Q}_{A \to B} = \int_A^B \left( u\, d y - v\, d x \right)
= \int_A^B \left( \frac{\partial \psi}{\partial y} d y + \frac{\partial \psi}{\partial x} d x \right)
= \int_A^B d \psi = \psi_B - \psi_A
$$
$$
\boxed{ \dot{Q}_{1 \to 2} = \psi_2 - \psi_1 }
$$
**路径是任意的**，因为被积表达式是全微分——这与连续性方程是同一件事的另一种语言。
**符号约定。**按$u = \partial \psi / \partial y$、$v = - \partial \psi / \partial x$，流动方向是**$\psi$增大的方向且$\psi$位于左侧**，采用相反约定的读者（许多英国教材用$u = - \partial \psi / \partial y$）必须把本讲的每个符号都反过来。**两种约定至今都在使用，唯一的防护是在任何报告的第一页写明自己用的是哪一种。**
**合理性检验。**同一个$\psi$既给流量**又**给流线几何，是因为两者都是质量守恒的表述；这个推导值得做一遍，是因为它解释了为什么**按相等的$\Delta \psi$和相等的$\Delta \phi$画出的流网**由曲线**正方形**组成：两个条件$\Delta \psi = u \Delta n$与$\Delta \phi = u \Delta s$在增量相等时给出$\Delta n / \Delta s = 1$。**正方形不是美学约定；它是网格比例正确的数值表述**，格子不是正方形的流网就不是拉普拉斯方程的解。
:::
:::

::: exercise 设计 {level=3}
为一座试验段$2\ \mathrm{m} \times 1.5\ \mathrm{m}$、最高风速$80\ \mathrm{m / s}$的闭式回流亚声速风洞规定运动学设计依据——速度场、湍流度、均匀性、堵塞、试验段边界层与测量方案——并给出验收试验。
::: solution
**回路与面积比。**
$$
\begin{array}{l c c l}
\text{试验段} & 2.0 \times 1.5\ \mathrm{m} & 3.0\ \mathrm{m^{2}} & 80\ \mathrm{m / s} \\
\text{稳定段} & 6.0 \times 4.5\ \mathrm{m} & 27.0\ \mathrm{m^{2}} & 8.9\ \mathrm{m / s},\ A_r = 9 \\
\text{第二喉道} & 4.0 \times 3.0\ \mathrm{m} & 12.0\ \mathrm{m^{2}} & 20\ \mathrm{m / s} \\
\text{扩压段出口} & 7.0 \times 5.25\ \mathrm{m} & 36.75\ \mathrm{m^{2}} & 6.5\ \mathrm{m / s} \\
\text{风机} & 5.5\ \mathrm{m}\ \text{直径} & & 12.5\ \mathrm{m / s}\ \text{轴向}
\end{array}
$$
**收缩段。**收缩比为$9$，轴向湍流衰减$9$倍、横向$3$倍；长$6.0\ \mathrm{m}$的贝尔-梅塔型线给出的最大壁面加速度为
$$
a \approx \frac{2 V_{\mathrm{ts}}^{2}}{L} \times 0.35 = \frac{2 \times 6{,}400}{6.0} \times 0.35 = 747\ \mathrm{m / s^{2}} = 76\ g
$$
壁面压强梯度为$0.92\ \mathrm{kPa / m}$，为**顺压**，边界层可以接受。**收缩段的任务是使流动又快、又直、又安静，而它的长度由第二条决定。**
**湍流度预算。**
$$
\begin{array}{l c}
\text{稳定段网格湍流度} & 3\ \% \\
\text{收缩段衰减} \left( A_r = 9 \right) & \times 1 / 9 \\
\text{试验段边界层贡献} & 0.04\ \% \\
\text{风机叶片通过，经第二喉道滤波} & 0.03\ \% \\
\text{所需整流网压降比} & \ge 0.85 \\
\hline
\text{预测试验段 } u' / U & 0.08\ \%
\end{array}
$$
**决定整流网设计的那个数字。**最后一片网的压降比达$90\ \%$，才使收缩段之前的$3\ \%$降为$0.33\ \%$；网的$d / t$和开孔率是仅次于收缩比的风洞最重要尺寸。
**试验段内的边界层。**试验段长$3\ \mathrm{m}$、风速$80\ \mathrm{m / s}$，收缩段出口设湍流触发器使边界层从$x = 0$起即为湍流，末端位移厚度为
$$
\delta^{*} = 0.016 \left( \frac{\nu}{U x} \right)^{1 / 7} x
= 0.016 \times \left( \frac{1.5 \times 10^{- 5}}{80 \times 3} \right)^{1 / 7} \times 3 = 0.016 \times 0.216 \times 3 = 10.4\ \mathrm{mm}
$$
**空试验段的有效堵塞为$2 \times 10.4 / 1{,}500 = 1.4\ \%$**（按高度计），而模型的**实体**堵塞上限由总量低于$5\ \%$决定：
$$
\frac{\Delta U}{U} \approx \frac{\pi^{2}}{8} \left( \frac{d}{H} \right)^{2} \le 0.02
\quad \Rightarrow \quad \frac{d}{H} \le 0.127 \quad \Rightarrow \quad d \le 190\ \mathrm{mm}
$$
**最大尺寸超过$190\ \mathrm{mm}$的模型需要自适应壁或开缝壁的封闭试验段**，且修正必须在数据整理之前施加。
**测量方案。**
$$
\begin{array}{l l l}
\text{热丝} & \text{单丝，后换 X 形阵列} & \text{ } 0.08\ \% \text{ 的湍流度需要 } 0.01\ \% \text{ 的噪声底} \\
\text{五孔探针} & \text{全截面遍历测量} & \pm 0.2^{\circ} \text{ 的气流角均匀性} \\
\text{皮托-静压耙} & \text{九个位置} & \pm 0.3\ \% \text{ 的动压均匀性} \\
\text{压敏漆} & \text{涂于模型} & \text{对面板程序的全场校核} \\
\text{纹影} & \text{两个正交视场} & \text{边界层触发器的效果}
\end{array}
$$
**验收试验。**
$$
\begin{array}{l l}
\text{空试验段均匀性} & q \text{ 的 } \pm 0.3\ \%\ \text{，覆盖中央 } 80\ \% \\
\text{气流角} & \text{两个平面内均为 } \pm 0.2^{\circ} \\
\text{轴向湍流度} & 60\ \mathrm{m / s} \text{ 时 } \le 0.10\ \% \\
\text{静压漂移} & \le 2\ \mathrm{Pa / h} \\
\text{长期重复性} & \text{三十天内 } C_p \text{ 的 } \pm 0.1\ \%
\end{array}
$$
**保护买方的四个条款。**"**湍流度必须用经校准的热丝风速仪测量，不得由皮托管推算，且必须以谱的形式报告，不得只报一个数字。**""**收缩比、整流网压降比和蜂窝器长径比必须标注在铭牌上。**""**空试验段压强梯度必须针对五套试验段衬里分别测量并报告。**""**堵塞修正方法及其适用范围必须在第一台模型制造之前商定。**"
**设计评注。**一般规律是：**风洞是一台产生湍流的机器，只是被劝得住了手**，而它的规格书是一份它安静不下来的机制清单，而不是一份速度清单——这就是两座尺寸和速度相同的风洞，用途可以相差十倍的原因。
:::
:::
