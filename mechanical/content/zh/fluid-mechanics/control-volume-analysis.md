力学中的每一条守恒律都是为**系统**写就的——一团固定、可辨识的物质。而几乎每一件工程装置都是一个**控制体**——一块物质穿流而过的固定空间区域。雷诺输运定理是两者之间的翻译装置，一旦会用，弯管受力、火箭推力、风力机功率、水泵扬程就全变成同一个计算做四遍。

这个定理值得费一番抽象功夫的原因在于，它让你**不必求解流动**就能得到答案。弯管受力不需要弯管内的压强场，火箭推力不需要燃烧化学，风力机的贝兹极限不需要叶片。**你只需要知道穿过边界的东西**——而边界正是由你来选的，选在哪里你就知道什么。

::: warning 给出自信满满错误答案的七个控制体错误
**忘记压强力。**动量方程的左端是**控制体内流体所受一切力的合力**，作用在每个截面上的压强就是其中之一。喷嘴的锚固力由$p_1 A_1$主导，而不是动量通量：对$100\ \mathrm{mm}$缩到$25\ \mathrm{mm}$、流量$0.02\ \mathrm{m^{3} / s}$的喷嘴，压强项是$6{,}490\ \mathrm{N}$，动量项是$760\ \mathrm{N}$，只保留后者的计算错了八倍，而且**方向都反了**。**永远在截面上画出压强，永远用表压。****在运动控制体中使用绝对速度。**对以$\mathbf{V}_{cv}$运动的控制体，通量项中$\rho\, \mathbf{V} \cdot \mathbf{n}$里的速度以及所携带的动量都应使用**相对**速度$\mathbf{W} = \mathbf{V} - \mathbf{V}_{cv}$，一切水轮机、压气机、水射流和火箭问题都系于此。佩尔顿水斗的力是$\dot{m} \left( W_1 - W_2 \cos \beta \right)$，其中$\dot{m} = \rho A \left( V - u \right)$；用$V$代替$V - u$会把力高估$V / \left( V - u \right)$倍——在$u = 0.45\ V$时就是$1.8$倍。**对内容物正在加速的控制体套用方程。**$\sum \mathbf{F} = \oint \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) dA$这一形式只对**惯性**控制体成立。对加速控制体，正确的右端是$\sum \mathbf{F} - \int_{CV} \rho \mathbf{a}_{cv}\, dV$，一辆刹车卡车上水箱的冲击分析若不加这一修正，冲击力会差上整个$m a$。**在速度剖面不均匀时使用均匀剖面的动量通量。**通量是$\int \rho u^{2} dA$而**不是**$\rho V_{\mathrm{mean}}^{2} A$；二者之比是动量通量修正系数$\beta$，湍流管流为$1.005$到$1.05$，层流则**恰为$4 / 3$**。层流管道动量平衡取$\beta = 1$会错$33\ \%$，同样的系数也以动能修正系数$\alpha$的面目出现——层流为$2.0$。**把流体所受的力与结构所受的力混为一谈。**牛顿第三定律就是全部区别，符号约定必须一次说定并始终遵守。标准做法是对**流体**列方程，求出$\mathbf{F}_{\mathrm{on\ fluid}}$，再反向——反两次方向的计算会报告弯管在推它自己。**选取了一个切过无法求值表面的控制体。**若控制面切过一股压强未知的射流，该压强就是大气压，此项消失；若切过管道，压强未知，必须由伯努利或连续性方程求出；若切过**尾流**，压强接近大气压但速度剖面必须积分。**控制面的选取就是全部的本事**，经典错误是切过压强既不知也不可测的区域，然后发现答案恰好取决于它。**把变质量体当系统处理。**火箭在丢质量，$\sum \mathbf{F} = m \mathbf{a}$对它**不成立**；正确的表述是$m\, d\mathbf{V} / dt = \dot{m} \mathbf{V}_e + \sum \mathbf{F}_{\mathrm{ext}}$且$\dot{m} < 0$，而那个经典错误——对$m \mathbf{V}$求导、冒出一个莫须有的$\mathbf{V}\, dm / dt$——正是火箭方程必须由控制体而非牛顿第二定律导出的原因。
:::

## 雷诺输运定理

::: definition 定理 {#def-rtt}
**对任意广延属性**$N$，其强度量对应物为$\eta = d N / d m$：
$$
\boxed{ \left( \frac{d N}{d t} \right)_{\mathrm{sys}}
= \frac{\partial}{\partial t} \int_{CV} \eta \rho\, dV
+ \oint_{CS} \eta \rho \left( \mathbf{V} \cdot \mathbf{n} \right) d A }
$$
**两项**分别是控制体内的**非定常积累**和穿过其表面的**净流出**，$\mathbf{n}$为外法向。定理说的是：*系统属性的变化率，等于该属性在所围区域内的积累率加上离开该区域的速率*——而系统与控制体在所考察的瞬时重合。
**三个特例。**
$$
\begin{array}{l c l}
N = m,\ \eta = 1 & 0 = \partial_t \int \rho dV + \oint \rho \mathbf{V} \cdot \mathbf{n}\, dA & \text{质量守恒} \\
N = m \mathbf{V},\ \eta = \mathbf{V} & \sum \mathbf{F} = \partial_t \int \rho \mathbf{V} dV + \oint \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) dA & \text{线动量} \\
N = m \left( \mathbf{r} \times \mathbf{V} \right),\ \eta = \mathbf{r} \times \mathbf{V} & \sum \mathbf{M} = \partial_t \int \rho \left( \mathbf{r} \times \mathbf{V} \right) dV + \oint \rho \left( \mathbf{r} \times \mathbf{V} \right) \left( \mathbf{V} \cdot \mathbf{n} \right) dA & \text{角动量}
\end{array}
$$
**运动控制体。**以$\mathbf{W} = \mathbf{V} - \mathbf{V}_{cv}$表示**相对控制面**的速度，一切通量中的$\mathbf{V} \cdot \mathbf{n}$都换成$\mathbf{W} \cdot \mathbf{n}$：
$$
0 = \partial_t \int_{CV} \rho\, dV + \oint_{CS} \rho\, \mathbf{W} \cdot \mathbf{n}\, dA
$$
**但穿过控制面携带的动量仍是$\mathbf{V} \left( \rho\, \mathbf{W} \cdot \mathbf{n} \right)$——分子用绝对速度，通量用相对速度。** **这一处不对称是叶轮机械中最常见的错误**，也是压气机的欧拉功写成$\Delta \left( U V_{\theta} \right)$而不写成$\Delta \left( W_{\theta}^{2} / 2 \right)$的原因。
**定常状态下的固定、不变形控制体**把一切化简为
$$
\sum \mathbf{F} = \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
\quad \text{且} \quad
\oint \rho\, \mathbf{V} \cdot \mathbf{n}\, dA = 0
$$
在一维进、出口处$\oint \rho u^{2} dA = \beta \rho \bar{u}^{2} A$，其中
$$
\beta = \frac{1}{A \bar{u}^{2}} \int_A u^{2} dA, \qquad
\alpha = \frac{1}{A \bar{u}^{3}} \int_A u^{3} dA
$$
**必须记住的数值。**
$$
\begin{array}{l c c}
\text{剖面} & \beta & \alpha \\
\text{均匀} & 1.000 & 1.000 \\
\text{湍流管流，} u / U_c = \left( 1 - r / R \right)^{1 / 7} & 1.020 & 1.063 \\
\text{完全粗糙，} u / u_* = 2.5 \ln \left( y / y_0 \right) & 1.03 \text{ 到 } 1.05 & 1.08 \text{ 到 } 1.12 \\
\text{层流管流，} u = U_{\max} \left( 1 - r^{2} / R^{2} \right) & 4 / 3 = 1.333 & 2.000
\end{array}
$$
**使这个系数值得一记的那个数字。**层流微通道的动量平衡中，$\beta = 4 / 3$的修正**比所叠加的多数压降都大**；而充分发展的湍流管流中它只有$2\ \%$——比$\rho$的不确定度还小，这就是每本管流教材都取$\beta = 1$、而每本微流控教材都不取的原因。
:::

::: definition 线动量方程的实战 {#def-linear}
**操作步骤，按必须执行的顺序。**
$$
\begin{array}{l l}
1 & \text{画出控制体；每个进、出口都垂直于流动切开} \\
2 & \text{由连续性方程求速度，尽可能由伯努利方程求压强} \\
3 & \text{画出所有力：每个截面上的压强（用表压）、锚固力、重力} \\
4 & \text{以正确符号写通量项：} \rho \left( \mathbf{V} \cdot \mathbf{n} \right) \mathbf{V} \text{，外法向} \\
5 & \text{求解；反向得到结构所受的力}
\end{array}
$$
**一维$x$分量：**
$$
\sum F_x = \sum_{\mathrm{out}} \beta \rho \dot{Q} u - \sum_{\mathrm{in}} \beta \rho \dot{Q} u
$$
**算例：$180^{\circ}$回折弯管。**直径$D = 100\ \mathrm{mm}$不变、输水$V = 6\ \mathrm{m / s}$、表压$200\ \mathrm{kPa}$、两管腿相距$h = 0.4\ \mathrm{m}$：
$$
A = \frac{\pi}{4} \times 0.1^{2} = 7.854 \times 10^{- 3}\ \mathrm{m^{2}}, \qquad
\dot{Q} = 0.04712\ \mathrm{m^{3} / s}
$$
由伯努利方程，两端压强相同（同高程、同速度），故
$$
F_x = - \left( \rho \dot{Q} \left( - V \right) - \rho \dot{Q} \left( + V \right) \right) = 2 \rho \dot{Q} V = 2 \times 1{,}000 \times 0.04712 \times 6 = 565\ \mathrm{N}
$$
而压强向**同一**方向推**两个**截面：
$$
F_{p} = 2 p A = 2 \times 200{,}000 \times 7.854 \times 10^{- 3} = 3{,}142\ \mathrm{N}
$$
$$
\boxed{ F_{\mathrm{anchor}} = F_p + F_{\mathrm{mom}} = 3{,}142 + 565 = 3{,}707\ \mathrm{N}\ \text{，方向与进口流动同向} }
$$
**压强项占载荷的$85\ \%$**；而系统一泄压它就消失，这就是弯管镇墩按**静水压**试验压强而非运行工况设计的原因。
**算例：水平面内的变径弯管。**水以$D_1 = 200\ \mathrm{mm}$、$p_1 = 300\ \mathrm{kPa}$、$V_1 = 3\ \mathrm{m / s}$进入$45^{\circ}$变径弯管，从$D_2 = 100\ \mathrm{mm}$的截面 2 流出：
$$
\dot{Q} = \frac{\pi}{4} \times 0.2^{2} \times 3 = 0.09425\ \mathrm{m^{3} / s}, \qquad
V_2 = \frac{0.09425}{7.854 \times 10^{- 3}} = 12.0\ \mathrm{m / s}
$$
$$
p_2 = p_1 - \tfrac{1}{2} \rho \left( V_2^{2} - V_1^{2} \right) = 300{,}000 - 500 \times \left( 144 - 9 \right) = 232.5\ \mathrm{kPa}
$$
取$x$沿进口方向、$y$与之垂直，$u_1 = 3$，$u_2 = 12 \cos 45^{\circ} = 8.485$，$v_2 = 8.485$：
$$
F_x = \rho \dot{Q} \left( u_2 - u_1 \right) - p_1 A_1 + p_2 A_2 \cos 45^{\circ}
= 1{,}000 \times 0.09425 \times 5.485 - 300{,}000 \times 0.03142 + 232{,}500 \times 0.007854 \times 0.707
$$
$$
F_x = 517 - 9{,}425 + 1{,}292 = - 7{,}616\ \mathrm{N}
$$
$$
F_y = \rho \dot{Q} v_2 - p_2 A_2 \sin 45^{\circ} = 800 - 1{,}292 = - 492\ \mathrm{N}
$$
$$
F = \sqrt{7{,}616^{2} + 492^{2}} = 7{,}632\ \mathrm{N}, \qquad
\theta = 180^{\circ} + 3.7^{\circ}
$$
**压强项贡献$- 8{,}133\ \mathrm{N}$，动量通量贡献$+ 517\ \mathrm{N}$**——锚固是一个**压强**问题附带一个动量修正；而$F_y$由出口压强的分量主导，这就是弯管镇墩设在**斜接面**（mitre）处的原因。
:::

::: widget plot
f: 4*x*(1-x)^2; 2*(1-x)/3
x: 0, 1
y: 0, 0.85
labels: Cp = 4a(1-a)^2; CT/3 = 2(1-a)/3
caption: 执行盘功率系数$C_P = 4 a \left( 1 - a \right)^2$随轴向诱导因子$a$的变化：圆盘把流动从$V$减速到$V(1-a)$，尾流最终达到$V(1-2a)$。最大值在$a = 1 / 3$处，$C_P = 16 / 27 = 0.593$——即**贝兹极限**（**1920 年**），仅由一维动量方程和连续性方程导出，与叶片的数量、形状和材料无关。直线是**推力**系数的三分之一，$C_T / 3 = 2 \left( 1 - a \right) / 3$，如此绘制使两曲线共用一个坐标轴；贝兹最优点处$C_T = 4 / 3$，而运行在该点的水轮机**整个扫掠面积上承受着一又三分之一倍的全动压载荷**——$12\ \mathrm{m / s}$风速下$60\ \mathrm{m}$转子就是$222\ \mathrm{kN}$——这就是三叶转子根部弯矩由推力而非功率决定的原因。**$a > 0.5$之后动量理论失效**，因为尾流转为湍流、简单的压强恢复不再成立；实测曲线回落，需要**格劳尔特（Glauert）**的经验修正。
:::

## 运动控制体

::: definition 射流冲击叶片与叶栅 {#def-vanes}
**面积为$A$、速度为$V$的射流垂直冲击平板。**平板**固定**时：
$$
F = \rho A V^{2} = \dot{m} V
$$
**平板以速度$u$背离射流运动时**，实际截获的质量为$\rho A \left( V - u \right)$，射流相对平板的速度由$V - u$降为零：
$$
F = \rho A \left( V - u \right)^{2}, \qquad P = F u = \rho A u \left( V - u \right)^{2}
$$
**最大功率**在$u = V / 3$处，$P_{\max} = 4 \rho A V^{3} / 27 = 0.148\ \rho A V^{3}$——**是射流自身功率$\tfrac{1}{2}\rho A V^{3}$的$29.6\%$**，因为平板尾流仍带走大部分动能。
**射流冲击使其转过角度$\theta$的弯曲叶片**（出口相对速度沿运动方向的分量按此度量）：
$$
\boxed{ F_x = \rho A \left( V - u \right)^{2} \left( 1 - \cos \theta \right) }
\qquad
\eta = \frac{F_x u}{\tfrac{1}{2} \rho A V^{3}} = \left( 1 - \cos \theta \right) \frac{u}{V} \left( 1 - \frac{u}{V} \right)^{2} \Big/ \tfrac{1}{2}
$$
**最优速度比。**以$\beta_2$表示**相对**出口速度与运动方向的夹角，平板对应$\beta_2 = 90^{\circ}$，半圆形水斗对应$\beta_2 = 180^{\circ}$，则对**射流**功率的效率为
$$
\eta = 2 \frac{u}{V} \left( 1 - \frac{u}{V} \right)^{2} \left( 1 - \cos \beta_2 \right)
$$
对**任意**$\beta_2$，它都在$u / V = 1 / 3$处取最大值，此时
$$
\eta_{\max} = \frac{8}{27} \left( 1 - \cos \beta_2 \right)
= 0.296 \quad \left( \text{平板} \right), \qquad
0.593 \quad \left( \text{半圆形水斗} \right)
$$
**那个常被引用也常被引错的数字。**佩尔顿水轮机文献引用$\eta_{\max} \approx 0.98$，因为他们除以的是**截获的**射流功率$\tfrac{1}{2} \rho A \left( V - u \right) V^{2}$而非射流自身功率$\tfrac{1}{2} \rho A V^{3}$，这去掉了因子$\left( 1 - u / V \right)$中的一个，把$2 x \left( 1 - x \right)^{2}$变成$2 x \left( 1 - x \right)$——一条在$x = 1 / 2$处取最大值的抛物线，
$$
\eta_{\mathrm{intercepted}, \max} = \tfrac{1}{2} \left( 1 - \cos \beta_2 \right) = 0.983 \quad \text{当} \quad \beta_2 = 165^{\circ}
$$
**两种约定文献里都有，在设计点相差$44\%$，都没有错；但要说清你用的是哪一种。**实际后果是：按截获基准标称"效率$92\%$"的水轮机，按射流基准是$0.92 \times \left( 1 - 0.46 \right) = 0.50$；不写明定义的水力效率保证书是无法执行的。
**佩尔顿算例。**直径$d = 100\ \mathrm{mm}$、$V = 100\ \mathrm{m / s}$的射流冲击$\beta_2 = 165^{\circ}$的水斗，转轮速度$u = 45\ \mathrm{m / s}$：
$$
\dot{m} = \rho A \left( V - u \right) = 1{,}000 \times 7.854 \times 10^{- 3} \times 55 = 432\ \mathrm{kg / s}
$$
$$
F = 432 \times 55 \times \left( 1 - \cos 165^{\circ} \right) = 432 \times 55 \times 1.966 = 46{,}700\ \mathrm{N}
$$
$$
P = F u = 46{,}700 \times 45 = 2.10\ \mathrm{MW}, \qquad
\eta = \frac{2.10 \times 10^{6}}{\tfrac{1}{2} \times 1{,}000 \times 7.854 \times 10^{- 3} \times 100^{3}} = \frac{2.10 \times 10^{6}}{3.927 \times 10^{6}} = 0.535
$$
**对比$\eta_{\max} = \left( 1 + \cos 165^{\circ} \right) / 2 = 0.983$**——差距完全因为$u / V = 0.45$而非$0.50$；而真实佩尔顿水轮机运行在$u / V = 0.46$、能达到$\eta = 0.90$，是因为射流必须被下一个水斗的分流器**切断**，理想效率要为此让出一点。
**使佩尔顿水轮机轴承设计困难的那个数字。**$46.7\ \mathrm{kN}$的力作用在**节圆半径**上，轴把它当作**径向**载荷承受，且随每个水斗经过射流而反向——$300\ \mathrm{rpm}$轴上$2\ \mathrm{Hz}$的交变载荷，这就是佩尔顿轴承按疲劳而非平均载荷选型的原因。
:::

::: definition 火箭与变质量 {#def-rocket}
**火箭推力**，取包围发动机的控制体：
$$
\boxed{ T = \dot{m} V_e + \left( p_e - p_a \right) A_e }
$$
**两项**分别是**动量推力**和**压强推力**。**最佳高度**处$p_e = p_a$，第二项消失；低于它喷管**欠膨胀**，第二项为正；高于它**过膨胀**，为负，直至流动分离使其不可预测。
**算例。**$\dot{m} = 2{,}500\ \mathrm{kg / s}$，$V_e = 2{,}500\ \mathrm{m / s}$，$p_e = 0.70\ \mathrm{MPa}$，$p_a = 0.025\ \mathrm{MPa}$，$A_e = 1.5\ \mathrm{m^{2}}$：
$$
T = 2{,}500 \times 2{,}500 + \left( 0.70 - 0.025 \right) \times 10^{6} \times 1.5
= 6.25 \times 10^{6} + 1.013 \times 10^{6} = 7.26\ \mathrm{MN}
$$
**压强项占推力的$14\ \%$**；它随高度增大直到$p_e = p_a$，这就是喷管出口面积按弹道**中段**而非末端选取的全部原因。
**有效排气速度与比冲。**
$$
c \equiv \frac{T}{\dot{m}} = V_e + \frac{\left( p_e - p_a \right) A_e}{\dot{m}}
\qquad
I_{sp} = \frac{c}{g_0}
$$
上例中$c = 2{,}904\ \mathrm{m / s}$、$I_{sp} = 296\ \mathrm{s}$——一台固体助推器。氢氧发动机可达$c = 4{,}420\ \mathrm{m / s}$、$I_{sp} = 451\ \mathrm{s}$。
**运动方程。**无外力时，$m\, dV = - c\, dm$：
$$
\boxed{ \Delta V = c \ln \frac{m_0}{m_1} } \qquad \text{（齐奥尔科夫斯基，1903）}
$$
**单级能承担的质量比。**入轨需$\Delta V = 9{,}400\ \mathrm{m / s}$，取$c = 3{,}000\ \mathrm{m / s}$：
$$
\frac{m_0}{m_1} = e^{9{,}400 / 3{,}000} = 23.1
$$
**这要求结构系数低于$4\ \%$，是不可能的**，这就是火箭必须分级的全部原因。两级各取质量比$\sqrt{23.1} = 4.8$、结构系数$6\ \%$，载荷系数为$4\ \%$——决定运载火箭经济性的就是这个数字。
**使压强项成为设计驱动因素的那个数字。**在海平面，按真空优化的喷管处于**过膨胀**状态，其压强项为**负**；航天飞机的固体助推器在海平面因此损失真空推力的$12\ \%$；喷管膨胀比取$25$而不取$80$，原因在这$12\ \%$，而不在延伸段的重量。
:::

::: definition 角动量与叶轮机械方程 {#def-angular}
**动量矩方程**，对定常控制体：
$$
\sum \mathbf{M} = \oint_{CS} \rho \left( \mathbf{r} \times \mathbf{V} \right) \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**对轴向进、出流的机械**，只有切向速度$V_{\theta}$携带动量矩，**轴扭矩**为
$$
T_{\mathrm{shaft}} = \dot{m} \left( r_2 V_{\theta 2} - r_1 V_{\theta 1} \right)
$$
**欧拉叶轮机械方程。** **比功**为
$$
\boxed{ w = U_2 V_{\theta 2} - U_1 V_{\theta 1} }
\qquad \text{对泵则} \qquad
H_{\mathrm{Euler}} = \frac{U_2 V_{\theta 2} - U_1 V_{\theta 1}}{g}
$$
**速度三角形。**叶速$U = \Omega r$，相对速度$W$，绝对速度$\mathbf{V} = \mathbf{W} + \mathbf{U}$：
$$
V_{\theta} = U - W_{\theta} = U - \frac{V_r}{\tan \beta}
$$
**算例：径流泵。**$D_2 = 0.30\ \mathrm{m}$，$N = 1{,}450\ \mathrm{rpm}$，出口宽度$b_2 = 20\ \mathrm{mm}$，叶片角（自切向起）$\beta_2 = 25^{\circ}$，$\dot{Q} = 0.05\ \mathrm{m^{3} / s}$，进口无预旋：
$$
U_2 = \frac{\pi \times 0.30 \times 1450}{60} = 22.78\ \mathrm{m / s}, \qquad
A_2 = \pi D_2 b_2 = 0.01885\ \mathrm{m^{2}}
$$
$$
V_{r 2} = \frac{\dot{Q}}{A_2} = \frac{0.05}{0.01885} = 2.653\ \mathrm{m / s}, \qquad
V_{\theta 2} = U_2 - \frac{V_{r 2}}{\tan \beta_2} = 22.78 - \frac{2.653}{0.4663} = 17.09\ \mathrm{m / s}
$$
$$
\boxed{ H_{\mathrm{Euler}} = \frac{U_2 V_{\theta 2}}{g} = \frac{22.78 \times 17.09}{9.81} = 39.7\ \mathrm{m} }
\qquad
P = \rho g \dot{Q} H = 1{,}000 \times 9.81 \times 0.05 \times 39.7 = 19.5\ \mathrm{kW}
$$
**使欧拉方程只讲对一半故事的那个数字。** **滑移系数**$\sigma$计入流体并不完全贴合叶片出口角这一事实——有限叶片数使流动**向后滑脱**——**斯托多拉（Stodala）**估计
$$
\sigma = 1 - \frac{\pi \sin \beta_2}{Z}
$$
取$Z = 7$片叶片得$\sigma = 1 - \pi \times 0.4226 / 7 = 0.810$，故**实际**扬程为$0.810 \times 39.7 = 32.2\ \mathrm{m}$。**纯粹运动学原因造成的百分之十九的损失**，也是泵的叶片数取七片或五片而绝不取十二片的原因：叶片多了$\sigma$升高，但堵塞和摩擦也增大，最优值是真正的折中。
**反作用度。**扬程中由叶轮内**扩散**而非离心作用产生的份额：
$$
R = 1 - \frac{V_{\theta 2}}{2 U_2} = 1 - \frac{17.09}{45.56} = 0.625
$$
**即$62.5\ \%$的压强升高发生在叶轮内部**——这就是径流泵的推力平衡和口环间隙与水力的重要性不相上下的原因。
:::

## 算例

::: example 喷嘴的锚固 {#ex-nozzle}
消防水带喷嘴由$100\ \mathrm{mm}$缩至$25\ \mathrm{mm}$，输水$0.020\ \mathrm{m^{3} / s}$。求法兰处压强和螺纹必须承受的力。
::: solution
**速度。**
$$
A_1 = 7.854 \times 10^{- 3}\ \mathrm{m^{2}}, \quad A_2 = 4.909 \times 10^{- 4}\ \mathrm{m^{2}}, \qquad
V_1 = 2.546, \quad V_2 = 40.74\ \mathrm{m / s}
$$
**法兰压强**，对法兰与自由射流（该处$p_2 = 0$表压）列伯努利方程：
$$
p_1 = \tfrac{1}{2} \rho \left( V_2^{2} - V_1^{2} \right) = 500 \times \left( 1{,}659.7 - 6.5 \right) = 826.6\ \mathrm{kPa}
$$
**动量方程**沿流动方向，$F_x$为**螺栓与水带**对流体的力：
$$
F_x + p_1 A_1 - p_2 A_2 = \rho \dot{Q} \left( V_2 - V_1 \right)
$$
$$
F_x = 1{,}000 \times 0.020 \times \left( 40.74 - 2.546 \right) - 826{,}600 \times 7.854 \times 10^{- 3} + 0
$$
$$
F_x = 763.9 - 6{,}492 = - 5{,}728\ \mathrm{N}
$$
$$
\boxed{ F_{\mathrm{threads}} = 5{,}728\ \mathrm{N}\ \text{，有把喷嘴从水带上拉脱之势} }
$$
**解读。**动量通量贡献$+ 764\ \mathrm{N}$，法兰压强贡献$- 6{,}492\ \mathrm{N}$，所以**喷嘴被其内部压强向后推**，螺纹承受$5.7\ \mathrm{kN}$——这就是消防员顶住喷嘴而不是顺着它用力、$2\ \mathrm{bar}$水带接$25\ \mathrm{mm}$水枪必须双手操作的原因。
**使消防炮需要旋转限位装置的那个数字。**$5{,}728\ \mathrm{N}$的反力作用在$0.6\ \mathrm{m}$长的炮身上产生$3.4\ \mathrm{kN\, m}$的倾覆力矩；消防炮基座按**最不利**俯仰角而非水平位置设计，是因为反力**永远沿射流方向**，射流水平时力矩最大，而基座只校核了该位置。
**与射流自身动量的对照。**射流携带$\rho \dot{Q} V_2 = 1{,}000 \times 0.020 \times 40.74 = 815\ \mathrm{N}$，而反力是其**七倍**。**差值就是收缩壁面上的压强力**；喷嘴反力超过其射流动量通量数倍，是液压学中最违反直觉的结果——也是**自由**射流冲击壁面施力$\rho Q V$、而**产生它的喷嘴**却被$\rho Q (V_2 - V_1) + p_1 A_1$推向另一侧的原因。
**合理性检验。**$p_2 = 0$之所以合法，是因为射流排入大气、出口处流线是直的；若出口**淹没**于水下，该处压强为静水值，整个计算将平移$p_2 A_2 = 4.9 \times 10^{- 4} p_2$，在$10\ \mathrm{m}$水深就是$4.9\ \mathrm{kN}$——与答案同量级。**淹没喷嘴必须把环境压强计入一起计算，这不是一个修正量。**
:::
:::

::: example 风力机的贝兹极限 {#ex-betz}
一台水平轴风力机转子直径$60\ \mathrm{m}$，在$12\ \mathrm{m / s}$、$1.225\ \mathrm{kg / m^{3}}$的风中运行。求可用功率、贝兹极限功率、最优点推力、动量理论失效的轴向诱导因子，以及转子实度的要求。
::: solution
**气流中的可用功率。**
$$
A = \frac{\pi}{4} \times 60^{2} = 2{,}827\ \mathrm{m^{2}}, \qquad
P_{\mathrm{avail}} = \tfrac{1}{2} \rho A V^{3} = 0.5 \times 1.225 \times 2{,}827 \times 1{,}728 = 2.99\ \mathrm{MW}
$$
**贝兹极限功率。**
$$
P_{\max} = \frac{16}{27} P_{\mathrm{avail}} = 0.5926 \times 2.99 = 1.77\ \mathrm{MW}
$$
**最优诱导因子与尾流。**$a = 1 / 3$时转子处风速为$8\ \mathrm{m / s}$，远尾流为$4\ \mathrm{m / s}$，**穿过转子的质量流量**为
$$
\dot{m} = \rho A V \left( 1 - a \right) = 1.225 \times 2{,}827 \times 12 \times 0.667 = 27{,}700\ \mathrm{kg / s}
$$
**推力。**
$$
T = \dot{m} \times 2 a V = 27{,}700 \times 8 = 221{,}600\ \mathrm{N} = 222\ \mathrm{kN}
$$
**对应$1.77\ \mathrm{MW}$的功率**——推力功率比$125\ \mathrm{N / kW}$，这就是风力机的塔架和偏航驱动按**推力与重力**而非扭矩选型的原因。
**推力系数校核。**
$$
C_T = \frac{T}{\tfrac{1}{2} \rho A V^{2}} = \frac{221{,}600}{0.5 \times 1.225 \times 2{,}827 \times 144} = 0.889 \approx \frac{8}{9} \quad \checkmark
$$
**使贝兹极限实际上不可达到的那个数字。**动量理论假定圆盘紧后方的压强在尾流中恢复到**环境**值，这要求尾流保持**轴对称且定常**。$a > 0.4$时尾流转为湍流、流动从转子分离，实测$C_P$落到$4 a \left( 1 - a \right)^{2}$以下——即**格劳尔特（Glauert）****1935 年**修正的**湍流尾流状态**。实际大型转子能达到$C_P = 0.45$到$0.50$，故
$$
P_{\mathrm{actual}} \approx 0.47 \times 2.99 = 1.41\ \mathrm{MW}
$$
**$20\ \%$的差距不是能靠设计消除的损失**——它是叶尖损失、尾流旋转和有限叶片数的阻力代价。
**实度要求。**动量理论给出**轴向**诱导因子却不涉及转子；叶素理论补上缺失的关系，而转子必须能**转折流动**且叶片互不干扰的要求给出
$$
\sigma = \frac{Z c}{\pi R} \approx 0.05 \text{ 到 } 0.10 \quad \text{现代三叶机}
$$
$Z = 3$、$R = 30\ \mathrm{m}$：$c_{\mathrm{mean}} = 0.08 \times \pi \times 30 / 3 = 2.5\ \mathrm{m}$。**平均半径处两米半的弦长**；现代叶片根部必须同时承受$2.5\ \mathrm{m}$弦长**和**$70\ \mathrm{m}$梁——结构要求与气动要求在根部直接冲突，解决办法就是每片现代叶片都有的椭圆梯形平面形状。
**合理性检验。**贝兹极限是$16 / 27$而不是$1$，是因为**挡住**流动的风力机没有流量，**什么都不提取**的风力机也提取不到东西；该乘积在内部取极大值。一般规律$P \propto V^{3}$是风能中最重要的数字：**平均风速高$10\ \%$的场址多发电$33\ \%$**；加高$100\ \mathrm{m}$的塔架值$800{,}000$的钢材钱，是因为它换来$8\ \%$的风速和$26\ \%$的电量。
:::
:::

::: example 由尾流测量求阻力 {#ex-wake}
一块长$2.0\ \mathrm{m}$、宽$1.0\ \mathrm{m}$的平板在淡水中以$2\ \mathrm{m / s}$拖航。尾缘下游$200\ \mathrm{mm}$处的尾流测量发现速度亏损形如$U_{\infty} - u = \Delta U_0 \exp \left[ - \left( y / \delta \right)^{2} \right]$，其中$\Delta U_0 = 0.42\ \mathrm{m / s}$、$\delta = 25\ \mathrm{mm}$。求阻力，并与边界层估算比较。
::: solution
**对流管应用动量定理。**控制体由相距$h$的两条流线和上下游两截面围成，压强$p$均匀，
$$
D = \int_{- h}^{h} \rho u \left( U_{\infty} - u \right) d y
= \rho \int \frac{u}{U_{\infty}} \left( 1 - \frac{u}{U_{\infty}} \right) U_{\infty}^{2} d y
= \rho U_{\infty}^{2} \theta
$$
其中$\theta$是亏损的**动量厚度**。
**求值。**令$u / U_{\infty} = 1 - f$，$f = \left( \Delta U_0 / U_{\infty} \right) e^{- \eta^{2}}$，$\eta = y / \delta$：
$$
\theta = \int f \left( 1 - f \right) d y
= \delta \int_{- \infty}^{\infty} \left( f_0 e^{- \eta^{2}} - f_0^{2} e^{- 2 \eta^{2}} \right) d \eta
= \delta \left( f_0 \sqrt{\pi} - f_0^{2} \sqrt{\frac{\pi}{2}} \right)
$$
$f_0 = 0.42 / 2.0 = 0.21$：
$$
\theta = 0.025 \times \left( 0.21 \times 1.7725 - 0.0441 \times 1.2533 \right)
= 0.025 \times \left( 0.3722 - 0.0553 \right) = 7.92 \times 10^{- 3}\ \mathrm{m}
$$
$$
\boxed{ D = 1{,}000 \times 4 \times 7.92 \times 10^{- 3} \times 1.0 = 31.7\ \mathrm{N} }
$$
**与边界层估算的比较。**$2.0\ \mathrm{m}$长平板上$\mathrm{Re}_L = 2 \times 2 \times 10^{6} / 10^{- 6} = 4 \times 10^{6}$的**湍流**边界层：
$$
C_f = \frac{0.074}{\mathrm{Re}_L^{1 / 5}} = \frac{0.074}{24.3} = 0.00305, \qquad
D = C_f \times \tfrac{1}{2} \rho U^{2} \times 2 A_w = 0.00305 \times 2{,}000 \times 4 = 24.4\ \mathrm{N}
$$
**尾流测量多出$30\ \%$**，差值来自近尾流有限压强梯度伴随的**压差阻力**，以及测量截面只在下游$200\ \mathrm{mm}$处、亏损尚未扩散开。**尾流测量必须取在足够远的下游，使剖面自相似且压强为大气压**；尽管如此该技术在风洞模型上仍被使用，是因为它不需要天平、没有支架干扰。
**使动量厚度成为正确变量的那个数字。**只要$h > \delta$，$\theta$就**与流管高度$h$无关**，于是阻力由**局部**测量得到、不需要全场数据——这就是横跨尾流的一次热丝遍历能给出$\pm 5\ \%$的阻力，而模型表面压强积分需要一百个测压孔加支架修正的原因。
**合理性检验。**阻力是$\rho U_{\infty}^{2} \theta$而不是$\tfrac{1}{2} \rho U_{\infty}^{2} \theta$，是因为动量通量$\int \rho u (U - u) dy$含**完整**的$U^2$而非动压；把结果写成平板的$C_D = 2 \theta / L$时$\tfrac{1}{2}$又回来了，这个二倍因子是尾流测量中最常犯的错。
:::
:::

::: example 闸门与水跃 {#ex-sluice}
水平矩形渠道中一扇闸门，渠宽$5\ \mathrm{m}$，下泄$12\ \mathrm{m^{3} / s}$，上游水深$2.0\ \mathrm{m}$。求闸下收缩水深与流速、闸门推力，以及形成水跃时的下游共轭水深。
::: solution
**上游状态。**
$$
q = \frac{12}{5} = 2.4\ \mathrm{m^{2} / s}, \qquad
V_1 = \frac{2.4}{2.0} = 1.2\ \mathrm{m / s}, \qquad
\mathrm{Fr}_1 = \frac{1.2}{\sqrt{9.81 \times 2.0}} = 0.086
$$
**闸下收缩水深**，取比能守恒（$E_1 = 2.0 + 1.2^{2} / 19.62 = 2.073\ \mathrm{m}$），解三次方程取**浅**根：
$$
E = y_2 + \frac{q^{2}}{2 g y_2^{2}}
\quad \Rightarrow \quad y_2 = 0.246\ \mathrm{m}, \qquad
V_2 = 9.76\ \mathrm{m / s}, \qquad
\mathrm{Fr}_2 = 6.32
$$
**闸门推力**，对断面 1 与 2 列动量方程、忽略河床摩擦：
$$
F_{\mathrm{gate}} = \left( \tfrac{1}{2} \rho g y_1^{2} + \rho q V_1 \right) - \left( \tfrac{1}{2} \rho g y_2^{2} + \rho q V_2 \right)
$$
$$
= \left( 19{,}620 + 1{,}440 \right) - \left( 296 + 23{,}420 \right) = 21{,}060 - 23{,}716
$$
$$
\boxed{ F_{\mathrm{gate}} = - 2{,}656\ \mathrm{N / m} \times 5\ \mathrm{m} = 13.3\ \mathrm{kN}\ \text{，指向下游} }
$$
**使闸门启闭机超配的那个数字。**仅上游面上的**静水**力，在闸门全开高度就是$19{,}620 \times 5 / 2 \times 2 = 98\ \mathrm{kN}$，净力$13.3\ \mathrm{kN}$是两个大数之**差**。**闸门结构按下游无水时的静水头设计，启闭机按下游水位在收缩断面的动力工况设计**——闸门落入急流后提不起来，就是因为压差是$98\ \mathrm{kN}$而不是$13$。
**水跃共轭水深。**$\mathrm{Fr}_2 = 6.32$：
$$
\frac{y_3}{y_2} = \frac{1}{2} \left( \sqrt{1 + 8 \mathrm{Fr}_2^{2}} - 1 \right)
= \frac{1}{2} \left( \sqrt{320} - 1 \right) = 8.37
\quad \Rightarrow \quad y_3 = 2.06\ \mathrm{m}
$$
**水跃水头损失。**
$$
h_L = \frac{\left( y_3 - y_2 \right)^{3}}{4 y_2 y_3} = \frac{1.814^{3}}{4 \times 0.246 \times 2.06} = 2.95\ \mathrm{m}
$$
**而总水头只有$2.07\ \mathrm{m}$**——水跃耗散的能量**比水流相对临界水深具有的能量还多**；这不矛盾，因为$h_L$是对**比能**度量的，而比能中只有$E - E_c = 2.073 - 0.83 = 1.24\ \mathrm{m}$可用。**正确的说法是水跃摧毁$1.24\ \mathrm{m}$比能、留下$0.83\ \mathrm{m}$**；消力池必须长$30\ \mathrm{m}$，是因为$1.24\ \mathrm{m} \times 12\ \mathrm{m^{3} / s} \times 9.81 = 146\ \mathrm{kW}$的湍流总得有个去处。
**合理性检验。**动量函数$M = y^{2} / 2 + q^{2} / \left( g y \right)$是正确工具，是因为水平矩形渠道中单位重量的压力恰为$y^{2} / 2$，故$M$在任何无外力作用的过程中守恒——水跃、闸门收缩或桥孔皆然。**共轭水深公式就是动量方程，别无其他**；水跃是一团剧烈湍流的三维滚流，公式却仍精确到百分之一，是因为动量定理根本不在乎控制体内部发生了什么。
:::
:::

::: history
**输运定理**是**雷诺（Reynolds）****1903 年**的成果，发表于《曼彻斯特文学与哲学学会报告集》——同一篇论文里他写下了以其名字分解$u = \bar{u} + u'$，同一刊物在一个世纪前曾由**道尔顿（Dalton）**宣读原子论。**奥斯本·雷诺**宣读该论文时**32 岁**，而定理只是关于直管与弯管流动讨论的一个脚注；直到**1916 年**冯·**卡门（von Kármán）**与**伯吉斯（Burgess）**才注意到这个脚注是整个学科的基础。**火箭方程**是**齐奥尔科夫斯基（Tsiolkovsky）****1903 年**的成果，发表于莫斯科，论文题为《利用反作用装置探索宇宙空间》，其中他导出了$\Delta V = c \ln \left( m_0 / m_1 \right)$、设计了多级飞行器，并提出了带旋转轮缘的空间站——全部完成于**卡卢加**，一座他任中学数学教师、**因童年事故瞎了一只眼**的省会小城。**戈达德（Robert Goddard）**于**1919 年**独立导出该方程，并于**1926 年 3 月 16 日**在马萨诸塞州**奥本**发射了第一枚液体火箭。**贝兹极限**由**贝兹（Albert Betz）****1920 年**在给《机械工程杂志》（*Zeitschrift für das gesamte Maschinenwesen*）的三页短注中导出；同样的结果**扎布罗夫斯基（Zabrowsky）**于**1919 年**在俄国、**舍利亚汉科（Schelhaneiko）**于**1916 年**各自独立得到，贝兹的名字被留下，是因为他是唯一发表工程师会读的期刊的人。**执行盘**本身则是**兰金（Rankine）****1865 年**把动量用于螺旋桨的产物，**弗劳德（Froude）****1889 年**的致动盘动量理论是同一计算加上尾流旋转。**欧拉叶轮机械方程**是**欧拉（Euler）****1754 年**为水轮机写下的，它至今仍是叶轮机械中唯一严格成立的方程。
:::

::: quiz
真空中一枚火箭以相对喷管速度$c$、质量流量$\dot m$排气。其推力为$\dot m c$且与火箭自身速度无关，这一结论来自：

- [ ] 排气速度由喷管几何确定
- [x] 对随火箭运动的控制体应用雷诺输运定理，穿过控制面的速度是*相对*速度，火箭自身速度从不进入动量通量
- [ ] 没有空气可推
- [ ] 出口截面上压强项相互抵消

::: solution
**控制体随火箭一起运动。**定理$\sum \mathbf{F} = \frac{ \partial }{ \partial t } \int_{\mathrm{CV} } \rho \mathbf{V } \, d \mathcal{V } + \int_{\mathrm{CS} } \mathbf{V } \, \rho ( \mathbf{V }_{\mathrm{rel} } \cdot \hat{ \mathbf{n} } ) \, d A$对惯性控制体成立，对加速控制体则出现惯性力项；无论哪种情形，通量都由*相对控制面*的速度携带，整个装置的匀速平动对净通量没有贡献。**民间解释——火箭推它的排气、推地面或推空气——每个版本都是错的；而"火箭在真空中工作得更好"的标准演示也不尽属实：推力实为$\dot m c + ( p_e - p_a ) A_e$，海平面火箭产生的推力其实比在真空中略*大*，只是喷管未完全膨胀使$c$较低、效率略低。**这一课的要点是：控制体不是对正在发生之事的描述，而是一种记账选择，选对了就是分析的全部。
:::
:::

## 后续内容

带压强梯度和粘性壁面切应力的动量方程就成了[[fluid-mechanics/navier-stokes]]；同一方程跨边界层积分就成了[[fluid-mechanics/boundary-layers-drag]]的动量积分法；与之相伴的能量方程是[[fluid-mechanics/bernoulli]]和[[thermodynamics/first-law-open]]；角动量形式是[[aerodynamics]]螺旋桨理论和[[propulsion]]叶轮机械的全部；而这三个积分的控制体离散，就是[[computational-fluid-dynamics]]中有限体积单元的定义。

::: summary
- 雷诺输运定理把系统定律转化为控制体定律：积累加净流出。
- 运动控制体中**通量**用相对速度，**携带的动量**用绝对速度。
- 截面上的压强力通常是锚固力的主导项，且必须用表压书写。
- 动量通量修正系数湍流管流为$1.02$，层流为$4/3$。
- 射流冲击叶片给出$F = \rho A (V-u)^2 (1-\cos\theta)$；佩尔顿水斗的最优工况是$u/V = 1/2$。
- 推力为$\dot m V_e + (p_e - p_a) A_e$；火箭方程$\Delta V = c \ln(m_0/m_1)$由控制体导出，而非由$F = ma$导出。
- $w = U_2 V_{\theta 2} - U_1 V_{\theta 1}$对任何叶轮机械严格成立；其余一切——滑移、反作用、损失——都是对它的修正。
- 尾流测量由$\rho U_\infty^2 \theta$给出阻力而无需天平，因为动量定理不在乎控制体内部发生了什么。
:::

## 习题

::: exercise 回折弯管 {level=1 check="3707"}
给出直径$100\ \mathrm{mm}$的$180^{\circ}$回折弯管的锚固力（牛），输水$6\ \mathrm{m/s}$、表压$200\ \mathrm{kPa}$。
::: solution
$F = 2pA + 2\rho \dot Q V = 2 \times 200{,}000 \times 7.854 \times 10^{-3} + 2 \times 1{,}000 \times 0.04712 \times 6 = 3{,}142 + 565 = 3{,}707\ \mathrm{N}$。
:::
:::

::: exercise 喷嘴反力 {level=1 check="5728"}
给出$100\ \mathrm{mm}$缩至$25\ \mathrm{mm}$的消防喷嘴在$0.020\ \mathrm{m^{3}/s}$下螺纹必须承受的力（牛）。
::: solution
$F = p_1 A_1 - \rho \dot Q (V_2 - V_1) = 6{,}492 - 764 = 5{,}728\ \mathrm{N}$。
:::
:::

::: exercise 动量通量系数 {level=1 check="1.333"}
给出充分发展层流管流的动量通量修正系数$\beta$。
::: solution
$\beta = \frac{1}{A \bar u^2} \int u^2 dA = 4/3 = 1.333$。
:::
:::

::: exercise 佩尔顿最优 {level=1 check="0.5"}
给出$180^{\circ}$转角的佩尔顿水斗输出功率最大时的比值$u/V$。
::: solution
半圆形水斗$\eta = 2 (u/V)(1 - u/V)$，最大值在$u/V = 1/2$。
:::
:::

::: exercise 火箭推力 {level=1 check="7.26"}
给出$\dot m = 2{,}500\ \mathrm{kg/s}$、$V_e = 2{,}500\ \mathrm{m/s}$、$p_e = 0.70\ \mathrm{MPa}$、$p_a = 0.025\ \mathrm{MPa}$、$A_e = 1.5\ \mathrm{m^{2}}$时的推力（兆牛）。
::: solution
$T = 6.25 + 1.013 = 7.26\ \mathrm{MN}$。
:::
:::

::: exercise 贝兹 {level=1 check="0.593"}
给出执行盘的最大功率系数。
::: solution
$C_P = 4a(1-a)^2$在$a = 1/3$处取最大值$C_P = 16/27 = 0.593$。
:::
:::

::: exercise 欧拉扬程 {level=1 check="39.7"}
给出$U_2 = 22.78\ \mathrm{m/s}$、$V_{\theta 2} = 17.09\ \mathrm{m/s}$、进口无预旋的径流泵的欧拉扬程（米）。
::: solution
$H = U_2 V_{\theta 2} / g = 22.78 \times 17.09 / 9.81 = 39.7\ \mathrm{m}$。
:::
:::

::: exercise 滑移系数 {level=2}
某径流泵有七片叶片，出口叶片角$25^{\circ}$。给出斯托多拉滑移系数，若欧拉扬程为$39.7\ \mathrm{m}$，求实际扬程。
::: solution
$$
\sigma = 1 - \frac{\pi \sin \beta_2}{Z} = 1 - \frac{\pi \times 0.4226}{7} = 0.810, \qquad
H = 0.810 \times 39.7 = 32.2\ \mathrm{m}
$$
**解读。**纯粹运动学原因造成的百分之十九的损失，也是泵的叶片数在滑移与堵塞之间折中的原因。取$Z = 12$，$\sigma = 0.889$、$H = 35.3\ \mathrm{m}$——更好——但十二片叶片给吸力面边界层留下的空间更少，泵的效率反而下降。
:::
:::

::: exercise 运动平板 {level=2}
速度$30\ \mathrm{m / s}$、直径$50\ \mathrm{mm}$的射流冲击以$10\ \mathrm{m / s}$背离其运动的平板。给出作用力和输出功率。
::: solution
$$
F = \rho A \left( V - u \right)^{2} = 1{,}000 \times 1.963 \times 10^{- 3} \times 400 = 785\ \mathrm{N}, \qquad
P = F u = 7{,}850\ \mathrm{W}
$$
**射流自身功率为**$\tfrac{1}{2} \rho A V^{3} = 26.5\ \mathrm{kW}$，按射流基准的效率为$7.85 / 26.5 = 0.296$。**平板实际截获的功率**为$\tfrac{1}{2} \rho A \left( V - u \right) V^{2} = 17.7\ \mathrm{kW}$，按截获基准为$7.85 / 17.7 = 0.444$——而平板在$u / V = 1 / 2$的理论最大值为$0.500$。**两种定义此处相差$1/(1 - u/V) = 1.5$倍，文献中两者皆有；说清你用的是哪一种。**
:::
:::

::: exercise 推导 {level=3}
由雷诺输运定理导出固定控制体的线动量方程，并明确说明压强为何必须写成表压形式。
::: solution
**输运定理取**$N = m \mathbf{V}$、$\eta = \mathbf{V}$：
$$
\left( \frac{d \left( m \mathbf{V} \right)}{d t} \right)_{\mathrm{sys}}
= \frac{\partial}{\partial t} \int_{CV} \rho \mathbf{V}\, dV
+ \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**左端就是系统的牛顿第二定律**，在系统与控制体重合的瞬时它等于$\sum \mathbf{F}$，故
$$
\sum \mathbf{F} = \frac{\partial}{\partial t} \int_{CV} \rho \mathbf{V}\, dV
+ \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**力分为面力与体力**，$\sum \mathbf{F} = \oint_{CS} \boldsymbol{\tau} \cdot \mathbf{n}\, dA + \int_{CV} \rho \mathbf{g}\, dV$，且$\boldsymbol{\tau} = - p \mathbf{I} + \boldsymbol{\tau}'$：
$$
\oint_{CS} \left( - p \mathbf{I} + \boldsymbol{\tau}' \right) \cdot \mathbf{n}\, dA
= - \oint_{CS} p\, \mathbf{n}\, dA + \oint_{CS} \boldsymbol{\tau}' \cdot \mathbf{n}\, dA
$$
**为何用表压。**写$p = p_a + p_g$，则
$$
- \oint_{CS} p\, \mathbf{n}\, dA = - \oint_{CS} p_a\, \mathbf{n}\, dA - \oint_{CS} p_g\, \mathbf{n}\, dA
$$
对**封闭**曲面$\oint \mathbf{n}\, dA = 0$，故若$p_a$**均匀**，第一个积分恒等地为零：
$$
\oint_{CS} p_a\, \mathbf{n}\, dA = p_a \oint_{CS} \mathbf{n}\, dA = 0
$$
**这就是可以使用表压的全部原因。**推论即陷阱：若控制体**不封闭**——其边界的一部分是外表面暴露于大气、却未计入面积分的固壁——抵消就不成立，必须手工加上壁面外侧的大气压力。**气球、柔性风管和薄壁弯管是三条捷径给出错误答案的情形**，三种情形中误差都是$p_a$乘投影面积，对$100\ \mathrm{mm}$管道就是$785\ \mathrm{N}$。
**定常一维化简。**剖面均匀、$\beta$并入：
$$
\sum F_x = \sum_{\mathrm{out}} \beta \rho \dot Q u - \sum_{\mathrm{in}} \beta \rho \dot Q u
$$
**合理性检验。**推导必须由输运定理做，而不能对控制体的内容物用$\sum \mathbf{F} = d \left( m \mathbf{V} \right) / dt$，是因为内容物从一个瞬时到下一个瞬时**不是同一团物质**，而$d \left( m_{CV} \mathbf{V}_{CV} \right) / dt$不是力。**输运定理是唯一合法的路径**；它对$m_{CV}$正在变化的火箭也给出正确答案，正是它正确的检验。
:::
:::

::: exercise 设计 {level=3}
为一座闸门下泄$40\ \mathrm{m^{3} / s}$、水头$4\ \mathrm{m}$、渠宽$10\ \mathrm{m}$的消力池规定水力与结构设计，并给出验收标准。
::: solution
**设计工况的水力状态。**
$$
q = 4.0\ \mathrm{m^{2} / s}, \qquad y_1 = 4.0\ \mathrm{m}, \quad V_1 = 1.0\ \mathrm{m / s}, \quad \mathrm{Fr}_1 = 0.050
$$
取流量系数$0.61$、收缩系数$0.61$，闸下收缩水深为
$$
y_2 = \frac{C_c q^{2 / 3}}{\left( g E_0 \right)^{1 / 3}} \approx 0.55\ \mathrm{m}, \qquad
V_2 = 7.27\ \mathrm{m / s}, \qquad \mathrm{Fr}_2 = 9.92
$$
**共轭水深。**
$$
\frac{y_3}{y_2} = \tfrac{1}{2} \left( \sqrt{1 + 8 \times 98.4} - 1 \right) = 13.5
\quad \Rightarrow \quad y_3 = 7.45\ \mathrm{m}
$$
**而天然河床上的下游水深只有$3.2\ \mathrm{m}$。**共轭水深是下游水深的$2.3$倍，所以**在该水头下消力池中无法维持水跃**——美国垦务局（USBR）分类把设计归入"矮堰式消力池或挑流墩"一档，正确答案是**挑流消能**：把射流向上挑出、让它飞出去，在**水垫塘**中靠自身冲击耗散能量。
**挑流消能。**坎顶倾角$30^{\circ}$，射流中线以$7.27\ \mathrm{m / s}$、$30^{\circ}$射出，忽略空气与掺气，落距
$$
x \approx \frac{2 V^{2} \sin \theta \cos \theta}{g} = \frac{2 \times 52.9 \times 0.5 \times 0.866}{9.81} = 4.7\ \mathrm{m}
$$
**从坎顶算起**——一跳很短，因为相对这一水头速度太低。**挑流消能用于高水头坝而不用于此处，是因为它的价值在于把高速射流抛离坝趾**，而$7\ \mathrm{m / s}$的射流没有射程；在这一弗劳德数和这一下游水深亏缺下，正确的装置是**消力墩池**：中央墩把射流劈开，加高尾坎维持一个滚流。
**消力墩池。**中央墩高$2.4\ \mathrm{m}$、宽$1.2\ \mathrm{m}$，顶面倾角$45^{\circ}$，把水舌劈成两股侧射流；池末端$1.5\ \mathrm{m}$高的加高尾坎造成驻定滚流。池子尺寸按**美国垦务局**消力墩池比例确定：
$$
\begin{array}{l c l}
\text{池长} & 2.7\, y_3 = 20\ \mathrm{m} & \text{至尾坎} \\
\text{池宽} & 10\ \mathrm{m} & \text{渠宽} \\
\text{墩高（自池底）} & 2.4\ \mathrm{m} & 0.32\, y_3 \\
\text{尾坎高} & 1.5\ \mathrm{m} & 0.20\, y_3 \\
\text{底板厚} & 1.2\ \mathrm{m} & \text{钢筋混凝土，嵌入侧墙} \\
\text{底板低于天然河床} & 2.0\ \mathrm{m} & \text{降低所需尾坎高度}
\end{array}
$$
**能量耗散。**底板降低$2.0\ \mathrm{m}$后，底板上的下游水深为$5.2\ \mathrm{m}$，共轭水深$7.45\ \mathrm{m}$仅为其$1.43$倍，加高尾坎可以提供。水跃摧毁的水头为
$$
h_L = \frac{\left( 7.45 - 0.55 \right)^{3}}{4 \times 0.55 \times 7.45} = 20.0\ \mathrm{m}, \qquad
P_{\mathrm{diss}} = \rho g Q h_L = 1{,}000 \times 9.81 \times 40 \times 20.0 = 7.9\ \mathrm{MW}
$$
**使消力池成为土木工程问题的那个数字。**$7.9\ \mathrm{MW}$在$20 \times 10 \times 4\ \mathrm{m}$的体积内耗散，即每立方米$10\ \mathrm{kW}$的湍流；若其中任何部分传到天然河床将引发的**冲刷**，就是底板采用$1.2\ \mathrm{m}$厚钢筋混凝土、嵌入$6\ \mathrm{m}$深边墙的原因。**消力池是按抗浮而非抗冲击设计的**：水跃驻定时底板下的扬压力达$4\ \mathrm{m}$水头的$85\ \%$，排水廊道和减压井必须把它降到$20\ \%$以下，否则底板一次事件就会浮起。
**冲击荷载。**设计流量下消力墩迎水面的滞止压强为
$$
\tfrac{1}{2} \rho V_2^{2} = 0.5 \times 1{,}000 \times 7.27^{2} = 26.4\ \mathrm{kPa}
$$
**其脉动分量均方根为均值的$0.4$倍、峰值为均值的$2.5$倍**；墩体按$66\ \mathrm{kPa}$而非$26\ \mathrm{kPa}$设计，是因为剥落混凝土的是峰值。**消力池中的冲击压强必须在模型中用齐平式传感器测量，绝不可取平均流速水头。**
**验收标准。**
$$
\begin{array}{l l}
\text{滚流位置} & \text{在设计流量 } 10 \text{ 到 } 100\ \%\ \text{内稳定于 } \pm 3\ \mathrm{m} \\
\text{出口流速} & \le 2.5\ \mathrm{m / s} \text{，均匀，无射流} \\
\text{河床保护} & \text{百年一遇洪水下无移动} \\
\text{底板下扬压力} & \le \text{设计水头的 } 20\ \ \% \\
\text{掺气} & \text{水跃趾部进气；闸门唇口无空蚀}
\end{array}
$$
**保护买方的四个条款。**"**水工模型必须按实际下游水位曲线过程进行比尺试验，不得按单一假定的下游水位试验。**""**消力墩和尾坎上的冲击压强必须在模型中用脉动压力传感器测量，混凝土按峰值而非均值设计。**""**底板下的扬压力必须在模型中测量，排水系统按实测结果确定规模。**""**水舌下的进气设施必须按闸门全开而非设计流量确定规模。**"
**设计评注。**一般规律是：**消力池是一台摧毁能量的机器，凡是摧毁不了它的东西它都会摧毁**，其设计是水力、结构、岩土三个问题必须同时求解——这就是模型试验不是验证、而是第一设计文件的原因。
:::
:::
