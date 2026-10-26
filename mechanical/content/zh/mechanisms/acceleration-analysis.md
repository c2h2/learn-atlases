速度分析告诉你机器在做什么。加速度分析告诉你**它让结构付出什么代价**。一个以恒定输入转速驱动的连杆机构，输入加速度为零，其构件的加速度却常常达到重力加速度的五到十倍。这些加速度乘以构件质量就是惯性力，它们作用在轴承、螺栓和基础上；在高速压力机、缝纫机机头或包装转塔中，惯性力通常比工艺力本身还大。**惯性力从不离开机器：它们在运动副和机架中循环，而其未被平衡的合力就是使基础振动的力。**

数学上只是把回路方程再求导一次，系数矩阵与速度分析相同。物理上是三项，各有其大小和方向：**向心（法向）项、切向项和科里奥利项。**前两项描述刚体运动；第三项只出现在一点沿一个本身转动的构件滑动之处——导杆槽中的滑块、转动导轨上的滑块、伸缩臂——它也是最常被遗忘的一项。

::: warning 四种躲过速度校核的加速度错误
**丢掉向心项。**长为$r$、以$\omega$转动的构件，即使$\dot{\omega} = 0$，其远端也以$r \omega^2$的加速度**指向**铰链。该项按$\omega^2$增长，而切向项只随$\dot{\omega}$变化。在$3{,}000\ \mathrm{r / min}$时，$100\ \mathrm{mm}$的曲柄销加速度为$0.1 \times 314.16^2 = 987\ \mathrm{m / s^2}$——约为重力加速度的一百倍；而一根在半秒内从静止加速到该转速的曲柄（$\dot{\omega} = 628\ \mathrm{rad / s^2}$），切向加速度只有$62.8\ \mathrm{m / s^2}$。向心项约大十六倍，合加速度与曲柄轴线的夹角不到$3.6^\circ$。
**漏掉转动构件上移动副处的科里奥利项。**项$2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}$只在一点沿一个本身转动的物体滑动时才存在，而在第一门动力学课程的大多数例题中它都为零。一根以$0.4\ \mathrm{m / s}$伸出、同时以$4\ \mathrm{rad / s}$转动的伸缩臂，其科里奥利加速度为$3.2\ \mathrm{m / s^2}$，大于下文例题中$2.8\ \mathrm{m / s^2}$的切向项$R\alpha$。漏掉它不是让答案稍有偏差，而是丢掉了一半以上的横向加速度。
**把速度瞬心与加速度瞬心混为一谈。**作平面运动的构件有一个速度为零的点，一般还有一个**不同的**加速度为零的点（加速度极点）。两者只在特殊情况下重合。把速度瞬心当作加速度为零的中心来用，会使构件上每一点的加速度都算错。
**把法向项的方向弄反。**同一刚体上两点之间，$\vec{a}_B = \vec{a}_A + \vec{\alpha} \times \vec{r}_{B/A} - \omega^2 \vec{r}_{B/A}$：法向项**从$B$指向$A$**，绝不从$A$指向$B$。向外画的向心项错了其大小的两倍，即$2 \omega^2 r$，因为符号就是它方向的全部。把绕一个中心算出的法向项与绕另一个中心算出的切向项相加也是同样的错误：每一项都必须针对同一对点。
:::

## 再求导一次，同一个矩阵

::: definition 加速度回路 {#def-accel-loop}
**把速度回路再求导一次。**令$\alpha_k = d \omega_k / dt$，四杆机构回路$a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$给出

$$
\boxed{ - a \omega_2^2 e^{i \theta_2} + a \alpha_2 i e^{i \theta_2} - b \omega_3^2 e^{i \theta_3} + b \alpha_3 i e^{i \theta_3} = - c \omega_4^2 e^{i \theta_4} + c \alpha_4 i e^{i \theta_4} }
$$

其中所有含$\omega$的项都已由位置分析和速度分析求出。取实部和虚部，得到一个线性方程组，其系数矩阵**与速度分析相同**，因而**行列式也相同**：$b c \sin \left( \theta_3 - \theta_4 \right) = - b c \sin \mu$，其中$\mu = \theta_4 - \theta_3$为传动角：

$$
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \alpha_3 \\ \alpha_4 \end{pmatrix} =
\begin{pmatrix} A_x \\ A_y \end{pmatrix}, \qquad
\begin{pmatrix} A_x \\ A_y \end{pmatrix} =
\begin{pmatrix} a \omega_2^2 \cos \theta_2 + a \alpha_2 \sin \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 \\ a \omega_2^2 \sin \theta_2 - a \alpha_2 \cos \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 \end{pmatrix}
$$

**速度奇异的机构在加速度上也奇异。**在奇异位置附近，角速度按$1 / \sin \mu$增长；加速度方程组的右端含有角速度的平方，因此角加速度增长得更快，可达$1 / \sin^3 \mu$。与$\mu = 90^\circ$相比，单是因子$1 / \sin \mu$在$\mu = 20^\circ$时就是$2.9$，在$\mu = 2^\circ$时是$29$。这是工作连杆机构的传动角应保持在约$40^\circ$以上的又一个理由。
:::

::: definition 刚体的平面运动 {#def-rigid-accel}
**同一刚体上的两点：**

$$
\boxed{ \vec{a}_B = \vec{a}_A + \underbrace{\vec{\alpha} \times \vec{r}_{B / A}}_{\text{切向},\; \perp \vec{r}} - \underbrace{\omega^2 \vec{r}_{B / A}}_{\text{法向，从 } B \text{ 指向 } A} }
$$

切向分量与法向分量按构造互相垂直，加速度多边形正是靠这一点作出的。

$$
\begin{array}{l l l l}
\text{项} & \text{大小} & \text{方向} & \text{何时为零} \\
\text{法向} & \omega^2 r & B \text{ 指向 } A & \omega = 0 \\
\text{切向} & \alpha r & \perp \vec{r} & \alpha = 0 \\
\text{科里奥利} & 2 \omega v_{\mathrm{rel}} & \perp \text{ 滑动方向} & \omega = 0 \text{ 或 } v_{\mathrm{rel}} = 0 \\
\text{牵连平动} & a_A & \text{已给定} & A \text{ 固定}
\end{array}
$$

**当点$B$相对一个转动构件运动时**（槽中的滑块、转动导轨上的滑块），以该构件为动参考系写出加速度。设$B'$为构件上此刻与$B$重合的点，则

$$
\boxed{ \vec{a}_B = \vec{a}_{B'} + \underbrace{2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}}_{\mathrm{Coriolis}} + \vec{a}_{\mathrm{rel}}, \qquad \vec{a}_{B'} = \vec{a}_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r} }
$$

科里奥利项的方向由$\vec{v}_{\mathrm{rel}}$沿$\omega$的转向转过$90^\circ$得到。其大小是设计者分别设定的两个量——导杆的角速度与沿导杆的滑动速度——之积，因此任一个反向，它就反向。
:::

::: example 四杆机构的加速度 {#ex-acc4}
四杆机构$a = 0.5$、$b = 1.2$、$c = 0.9$、$d = 1.1$米，$\theta_2 = 40^\circ$，$\omega_2 = 10\ \mathrm{rad / s}$恒定。由位置解与速度解：$\theta_3 = 24.44^\circ$，$\theta_4 = 65.34^\circ$，$\omega_3 = - 2.724\ \mathrm{rad / s}$，$\omega_4 = 2.276\ \mathrm{rad / s}$。求$\alpha_3$、$\alpha_4$以及$A$、$B$和连杆质心的加速度。
::: solution
**已知的向心加速度大小：**
$$
a \omega_2^2 = 0.5 \times 100 = 50.0, \qquad
b \omega_3^2 = 1.2 \times 7.420 = 8.904, \qquad
c \omega_4^2 = 0.9 \times 5.180 = 4.662\ \mathrm{m / s^2}
$$
**两个标量方程**，即$\alpha_2 = 0$时回路方程的实部与虚部：
$$
- b \alpha_3 \sin \theta_3 + c \alpha_4 \sin \theta_4 = a \omega_2^2 \cos \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 = 38.30 + 8.11 - 1.94 = 44.47
$$
$$
b \alpha_3 \cos \theta_3 - c \alpha_4 \cos \theta_4 = a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 = 32.14 + 3.69 - 4.24 = 31.59
$$
其中$b \sin \theta_3 = 0.4967$，$c \sin \theta_4 = 0.8180$，$b \cos \theta_3 = 1.0925$，$c \cos \theta_4 = 0.3755$。由第一式，$\alpha_4 = \left( 44.47 + 0.4967 \alpha_3 \right) / 0.8180 = 54.36 + 0.6072 \alpha_3$。代入第二式：
$$
1.0925 \alpha_3 - 0.3755 \left( 54.36 + 0.6072 \alpha_3 \right) = 31.59
\qquad \Rightarrow \qquad 0.8645 \alpha_3 = 52.00
$$
$$
\boxed{ \alpha_3 = 60.1\ \mathrm{rad / s^2} \ \text{逆时针}, \qquad \alpha_4 = 54.36 + 36.52 = 90.9\ \mathrm{rad / s^2}\ \text{逆时针} }
$$
有限差分校核——在$\theta_2 \pm 10^{-4}\ \mathrm{rad}$处求解位置回路并数值求二阶导——得到$60.15$和$90.87\ \mathrm{rad / s^2}$。每个机构做一次这种校核是值得的，因为它能发现$\omega$的符号错误或两个标量方程的错位。
**$A$点的加速度**（曲柄匀速，无切向项）：
$$
\vec{a}_A = - a \omega_2^2 \left( \cos \theta_2 , \sin \theta_2 \right) = - 50.0 \left( 0.7660,\; 0.6428 \right) = \left( - 38.30,\; - 32.14 \right)
\qquad \left| \vec{a}_A \right| = 50.0\ \mathrm{m / s^2} = 5.1\ g
$$
**由连杆求$B$点的加速度：**
$$
\vec{r}_{B / A} = 1.2 \left( 0.9104,\; 0.4139 \right) = \left( 1.0925,\; 0.4967 \right)
$$
$$
\vec{\alpha}_3 \times \vec{r}_{B / A} = 60.15 \left( - 0.4967,\; 1.0925 \right) = \left( - 29.88,\; 65.71 \right), \qquad
- \omega_3^2 \vec{r}_{B / A} = - 7.420 \left( 1.0925,\; 0.4967 \right) = \left( - 8.11,\; - 3.69 \right)
$$
$$
\vec{a}_B = \left( - 38.30 - 29.88 - 8.11,\; - 32.14 + 65.71 - 3.69 \right) = \left( - 76.28,\; 29.88 \right)
$$
**由摇杆校核**，因$O_4$固定，必须得到同一矢量：
$$
\vec{a}_B = c \alpha_4 \left( - \sin \theta_4, \cos \theta_4 \right) - c \omega_4^2 \left( \cos \theta_4, \sin \theta_4 \right)
= 81.79 \left( - 0.9088, 0.4173 \right) - 4.662 \left( 0.4173, 0.9088 \right)
$$
$$
= \left( - 74.33 - 1.95,\; 34.13 - 4.24 \right) = \left( - 76.28,\; 29.89 \right) \quad \checkmark
$$
$$
\boxed{ \left| \vec{a}_B \right| = \mathbf{81.9\ \mathrm{m / s^2} = 8.4\ g} }
$$
两条路径在舍入误差内一致。这一校核能发现方程错位或角加速度反号：这两种错误都会使一个垂直分量反向，于是两条路径的结果相差几十米每二次方秒，而不是几个百分点。

**连杆质心**，位于$AB$中点：
$$
\vec{r}_{G / A} = \left( 0.5463,\; 0.2484 \right), \qquad
\vec{a}_G = \left( - 38.30, - 32.14 \right) + 60.15 \left( - 0.2484, 0.5463 \right) - 7.420 \left( 0.5463, 0.2484 \right)
$$
$$
= \left( - 38.30 - 14.94 - 4.05,\; - 32.14 + 32.86 - 1.84 \right) = \left( - 57.29,\; - 1.13 \right)
\qquad \left| \vec{a}_G \right| = \mathbf{57.3\ \mathrm{m / s^2} = 5.8\ g}
$$
**惯性力**：曲柄$3\ \mathrm{kg}$，连杆$6\ \mathrm{kg}$，摇杆$4\ \mathrm{kg}$，质心均在杆长中点。曲柄质心加速度为$\tfrac{1}{2} \times 50.0 = 25.0\ \mathrm{m / s^2}$，摇杆质心为$\tfrac{1}{2} \left| \vec{a}_B \right| = 41.0\ \mathrm{m / s^2}$：
$$
F_{\mathrm{crank}} = 3 \times 25.0 = 75\ \mathrm{N}, \qquad
F_{\mathrm{coupler}} = 6 \times 57.3 = 344\ \mathrm{N}, \qquad
F_{\mathrm{rocker}} = 4 \times 41.0 = 164\ \mathrm{N}
$$
**振动力**为$- \sum m_i \vec{a}_{G_i}$，即机架和基础所受的力：
$$
\sum m_i \vec{a}_{G_i} = 3 \left( - 19.15, - 16.07 \right) + 6 \left( - 57.29, - 1.13 \right) + 4 \left( - 38.14, 14.94 \right) = \left( - 554, \; 5 \right)\ \mathrm{N}
\qquad \left| \vec{F}_{\mathrm{shake}} \right| = \mathbf{554\ \mathrm{N}}
$$
而总重为$13 \times 9.81 = 128\ \mathrm{N}$。输入转速仅$95.5\ \mathrm{r / min}$时，机构对机架的振动力已达自重的$4.3$倍；各项都按$\omega_2^2$变化，转速加倍则振动力变为四倍。
*合理性检查。*$\left| \vec{a}_G \right|$以$x$分量为主，因为此刻连杆的切向项（$y$方向$+32.86$）几乎抵消了$y$方向的曲柄销项和法向项，而在$x$方向三者相加。
:::
:::

::: widget plot
f: 986.96*(cos(x*pi/180)+0.25*cos(x*pi/90))
x: 0, 360
y: -900, 1400
caption: $100$–$400$毫米曲柄滑块机构（$\lambda = 0.25$）在$3{,}000$转每分时的活塞加速度（米每二次方秒，指向曲柄中心为正）随曲柄转角（度）的变化。**曲线不是余弦：二次谐波项$0.25 \cos 2\theta$把上止点峰值提高到$1234$，把下止点值减小到$-740$。**上止点峰值约为重力加速度的$126$倍。注意二次谐波如何使下止点附近的曲线变平；连杆越短（$\lambda$越大），这种不对称越明显。
:::

## 多边形、极点与不加速的点

::: definition 加速度影像 {#def-images}
**加速度多边形就是按比例画出的矢量方程**，与速度多边形完全一样，每个相对加速度分为方向已知的切向部分和大小已知的法向部分。

$$
\begin{array}{l l l}
\text{矢量} & \text{已知} & \text{未知} \\
\vec{a}_A & \text{大小与方向} & \text{无（输入转速恒定时）} \\
\vec{a}_{B / A} & \text{法向部分 } \omega_3^2 b \text{（大小与方向）} & \text{切向部分，方向已知} \\
\vec{a}_B & \text{仅方向，} \perp O_4 B \text{，另加已知法向部分} & \text{大小}
\end{array}
$$

**作图：**从极点$o$作$\vec{a}_A$；从其末端作$\vec{a}_{B / A}^n$，方向**从$B$指向$A$**；再从该矢量末端作垂直于$AB$的直线（切向方向）；从$o$作$\vec{a}_B^n = c \omega_4^2$，方向从$B$指向$O_4$，并从其末端作垂直于$O_4 B$的直线。**两直线交点给出$\vec{a}_B$，两段切向长度除以各自杆长即得$\alpha_3$和$\alpha_4$。**

**加速度影像。**正如速度多边形中含有连杆转过$90^\circ$的副本，**加速度多边形中含有连杆的一个相似副本，按$\sqrt{\alpha_3^2 + \omega_3^4}$缩放并转过$180^\circ - \gamma$**，其中

$$
\tan \gamma = \frac{\alpha_3}{\omega_3^2}
$$

构件上每一点的相对加速度$\vec{a}_{P / A}$与$\vec{r}_{P / A}$所成的角都相同，因此任一连杆点的加速度可由图上两次量取得到。用代数语言说，相对加速度为$\left( i \alpha - \omega^2 \right) \vec{r}$：同一个复数乘以构件上的每一个位置矢量。

$$
\text{对上面的四杆机构：} \tan \gamma = \frac{60.15}{7.42} = 8.11 \qquad \Rightarrow \qquad \gamma = 83.0^\circ
$$

**加速度瞬心（加速度极点）。**作平面运动、$\alpha$与$\omega$不全为零的刚体，在每一瞬时**恰有一个加速度为零的点**。它到任一加速度已知的点$A$的距离为$\left| \vec{a}_A \right| / \sqrt{\alpha^2 + \omega^4}$，方向由$\vec{a}_A$沿$\alpha$的转向转过$\gamma$。**对上面的连杆，取$A$点：**

$$
\overline{A P_0} = \frac{\left| \vec{a}_A \right|}{\sqrt{\alpha_3^2 + \omega_3^4}} = \frac{50.0}{\sqrt{3{,}618 + 55.1}} = \frac{50.0}{60.61} = 0.825\ \mathrm{m}
$$

方向为从$\vec{a}_A$逆时针转过$83.0^\circ$。沿连杆及垂直于连杆分解，$P_0$沿$AB$方向$0.12\ \mathrm{m}$、偏离$AB$侧向$0.82\ \mathrm{m}$——不在杆上，但在连杆平面内，设计者可以用一块连杆板把该平面延伸过去。任一连杆点的加速度等于$\sqrt{\alpha_3^2 + \omega_3^4}$乘以它到$P_0$的距离。极点随机构运动而移动，所以连杆点只在瞬时与它重合；要使某点在有限区间内近似静止，需要用[[mechanisms/linkage-synthesis]]中的方法设计机构。
:::

::: example 转动臂上的科里奥利加速度 {#ex-coriolis}
一伸缩臂按$R = 0.30 + 0.40\, t$米伸出，同时按$\theta = 2.0\, t^2$弧度转动。求$t = 1.0\ \mathrm{s}$时末端执行器的加速度，以及科里奥利项在横向加速度中所占的比例。
::: solution
**$t = 1.0\ \mathrm{s}$时的运动学量：**
$$
R = 0.70\ \mathrm{m}, \quad \dot{R} = 0.40\ \mathrm{m / s}, \quad \ddot{R} = 0; \qquad
\theta = 2.0\ \mathrm{rad}, \quad \omega = \dot{\theta} = 4.0\ \mathrm{rad / s}, \quad \alpha = 4.0\ \mathrm{rad / s^2}
$$
**径向分量：**
$$
a_R = \ddot{R} - R \omega^2 = 0 - 0.70 \times 16.0 = \mathbf{- 11.20\ \mathrm{m / s^2}}
$$
**横向分量，分为两部分：**
$$
a_\theta = R \alpha + 2 \omega \dot{R} = 0.70 \times 4.0 + 2 \times 4.0 \times 0.40 = 2.80 + 3.20 = \mathbf{6.00\ \mathrm{m / s^2}}
$$
$$
\boxed{ \vec{a} = \left( - 11.20,\; 6.00 \right)\ \mathrm{m / s^2}, \qquad \left| \vec{a} \right| = 12.7\ \mathrm{m / s^2} = 1.3\ g }
$$
**科里奥利项所占比例：**
$$
\frac{2 \omega \dot{R}}{R \alpha + 2 \omega \dot{R}} = \frac{3.20}{6.00} = \mathbf{53\ \%}
$$
**解读。**横向加速度的一半以上——因而回转驱动为负载所需转矩的一半以上——来自一个仅因臂在伸出才存在的项。臂缩回时科里奥利项反号：其余不变时，$a_\theta$将为$2.80 - 3.20 = - 0.40\ \mathrm{m / s^2}$，回转转矩也随之反号。
**转矩**：末端负载$120\ \mathrm{kg}$，臂重$60\ \mathrm{kg}$，臂视为长度为$R$的均质细杆。对转轴的角动量为$H = \left( m_p R^2 + \tfrac{1}{3} m_b R^2 \right) \omega$，故
$$
T = \frac{d H}{d t} = \left( m_p + \tfrac{1}{3} m_b \right) \left( R^2 \alpha + 2 R \dot{R} \omega \right)
= 140 \times \left( 1.96 + 2.24 \right) = \mathbf{588\ \mathrm{N \cdot m}}
$$
其中科里奥利部分为$140 \times 2.24 = 314\ \mathrm{N \cdot m}$，同样占总量的$53\ \%$。
*合理性检查。*臂虽在伸出，$a_R$却指向内：径向速度$\dot R$恒定，唯一的径向加速度是向心项$- R \omega^2$。若负载能在无摩擦的伸缩导轨上自由滑动，它会相对于臂向外移动，因为没有任何东西提供向内的$11.2\ \mathrm{m / s^2}$。单位：$\mathrm{kg} \times \mathrm{m^2 / s^2} = \mathrm{N \cdot m}$。
:::
:::

::: widget plot
f: 3.2+0*x; 4*x
x: 0.2, 1.2
y: 0, 5
labels: 2\omega\dot R; R\alpha
caption: 以$0.4$米每秒伸出、以$\omega = 4$弧度每秒转动且$\alpha = 4$弧度每二次方秒的伸缩臂，其横向加速度的两部分随伸出长度$R$（米）的变化。**科里奥利项$2\omega\dot R = 3.2$是水平线：它取决于臂伸出和转动的快慢，而与伸出多远无关。**项$R\alpha$线性增长，在$R = 2\omega\dot R/\alpha = 0.8$米处超过它。在$R = 0.2$米处，科里奥利项提供横向加速度的$80$%。
:::

## 加速度的代价：惯性载荷、振动力与平衡

::: definition 惯性载荷与等效惯量 {#def-inertia}
**每个构件都是运动已知的刚体，因此其惯性载荷已知**（达朗贝尔原理）：

$$
\vec{F}_i = - m_i \vec{a}_{G_i}, \qquad T_i = - I_{G_i} \alpha_i
$$

惯性力与惯性力偶合起来，等效于单个力$- m_i \vec{a}_{G_i}$，其作用线偏离$G_i$的距离为

$$
e_i = \frac{I_{G_i} \left| \alpha_i \right|}{m_i \left| \vec{a}_{G_i} \right|}
$$

偏在使其对$G_i$之矩等于$- I_{G_i} \alpha_i$的一侧。对绕固定铰链转动的构件，这条作用线通过打击中心。

**振动力**是全部惯性力的矢量和，**振动力矩**是它们对固定点$O$的力矩之和：

$$
\vec{F}_{\mathrm{shake}} = - \sum_i m_i \vec{a}_{G_i} = - M_{\mathrm{tot}} \vec{a}_{G,\mathrm{tot}}, \qquad
T_{\mathrm{shake}} = - \sum_i \left( \vec{r}_{G_i} \times m_i \vec{a}_{G_i} + I_{G_i} \alpha_i \right)
$$

**中间那个表达式是力平衡的基础：**振动力等于运动部分总质量乘以机构总质心的加速度，因此当且仅当总质心不动时，它在所有时刻都为零。对四杆机构，只要在曲柄和摇杆上加配重就能精确做到这一点（Berkof 与 Lowen，1969）。同时平衡振动力矩一般需要附加元件，如反向旋转的惯性体；而且加配重通常会增大振动力矩和轴承载荷，所以实践中两者需要权衡。

**折算到输入轴的等效惯量**是电机所"看到"的：

$$
\boxed{ I_{\mathrm{eq}} \left( \theta \right) = \sum_i m_i \left( \frac{v_{G_i}}{\omega_{\mathrm{in}}} \right)^2 + \sum_i I_{G_i} \left( \frac{\omega_i}{\omega_{\mathrm{in}}} \right)^2 } , \qquad
T_{\mathrm{in}} = I_{\mathrm{eq}} \, \alpha_{\mathrm{in}} + \frac{1}{2} \frac{d I_{\mathrm{eq}}}{d \theta} \, \omega_{\mathrm{in}}^2
$$

第二项即使在输入转速完全恒定时也存在，这就是机构的驱动转矩不与输出转矩成正比的原因。对上面的四杆机构，取例题中的构件质量、各构件视为均质细杆（$I_G = m L^2 / 12$），$I_{\mathrm{eq}}$在一转内在$0.71$与$4.00\ \mathrm{kg \cdot m^2}$之间变化，$\omega_2 = 10\ \mathrm{rad / s}$时$\tfrac{1}{2} \left( d I_{\mathrm{eq}} / d \theta \right) \omega_2^2$在$-376$到$+192\ \mathrm{N \cdot m}$之间。只按稳态工艺转矩选型的伺服会因跟随误差报警，因为它的转矩曲线里没有这一惯性转矩。
:::

::: example 曲柄滑块机构的振动力及其平衡 {#ex-shake}
一台压缩机的曲柄滑块机构：$r = 60\ \mathrm{mm}$，$l = 240\ \mathrm{mm}$，$3{,}000\ \mathrm{r / min}$，往复质量$2.0\ \mathrm{kg}$，曲柄销质量$1.5\ \mathrm{kg}$。求三个瞬时的振动力，并设计配重。
::: solution
**基本量：**$\omega = 314.16\ \mathrm{rad / s}$，$r \omega^2 = 0.060 \times 98{,}696 = 5{,}922\ \mathrm{m / s^2}$，$\lambda = r / l = 0.25$。$x$从曲柄中心$O$指向活塞，上止点处$\theta = 0$。
**活塞加速度**为$\ddot{x} = - r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$。括号中的量值记为$a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$（指向$O$为正）：
$$
\theta = 0: \; a = 5922 \times 1.25 = 7{,}403; \qquad
\theta = 90^\circ: \; a = 5922 \times \left( 0 - 0.25 \right) = - 1{,}480; \qquad
\theta = 180^\circ: \; a = 5922 \times \left( - 1 + 0.25 \right) = - 4{,}442\ \mathrm{m / s^2}
$$
**往复质量的惯性力**$F_S = - m_S \ddot{x} = m_S a$，沿$+x$：
$$
F_S = + 14{,}806, \qquad - 2{,}961, \qquad - 8{,}884\ \mathrm{N}
$$
**曲柄销的惯性（离心）力**$m_A r \omega^2 = 1.5 \times 5922 = 8{,}883\ \mathrm{N}$，方向从$O$经$A$向外，分量为$8{,}883 \left( \cos \theta, \sin \theta \right)$：
$$
\theta = 0: \; \left( 8{,}883, 0 \right); \qquad \theta = 90^\circ: \; \left( 0, 8{,}883 \right); \qquad \theta = 180^\circ: \; \left( - 8{,}883, 0 \right)
$$
**总振动力：**
$$
\begin{array}{c c c c}
\theta & F_x \left( \mathrm{N} \right) & F_y \left( \mathrm{N} \right) & \left| F \right| \left( \mathrm{N} \right) \\
0^\circ & 14{,}806 + 8{,}883 = 23{,}689 & 0 & \mathbf{23{,}689} \\
90^\circ & - 2{,}961 & 8{,}883 & \mathbf{9{,}363} \\
180^\circ & - 8{,}884 - 8{,}883 = - 17{,}767 & 0 & \mathbf{17{,}767}
\end{array}
$$
**解读。**该力从不为零，峰值$23.7\ \mathrm{kN}$，而运动部分总重仅$3.5 \times 9.81 = 34\ \mathrm{N}$——比值约七百——且每转绕机架旋转一周。
**平衡。**在曲柄销对面半径$R_c$处加配重$m_c$，若$m_c R_c = m_A r = 1.5 \times 0.060 = 0.090\ \mathrm{kg \cdot m}$，就恰好抵消曲柄销的离心力。它还能抵消往复惯性力的一部分，但只能是一次谐波部分；标准做法是再平衡往复质量的一个分数$c$：
$$
m_c R_c = \left( m_A + c \, m_S \right) r
$$
**剩余的力为**
$$
F_x = m_S r \omega^2 \left[ \left( 1 - c \right) \cos \theta + \lambda \cos 2 \theta \right], \qquad
F_y = - c \, m_S r \omega^2 \sin \theta, \qquad m_S r \omega^2 = 11{,}844\ \mathrm{N}
$$
设计决策就是一种权衡：增大$c$会把力从行程方向移到与之垂直的方向。对每个$c$在一整转内求$\left| F \right|$的最大值：
$$
\begin{array}{c c c c}
c & m_c R_c \left( \mathrm{kg \cdot m} \right) & F_{\max} \left( \mathrm{kN} \right) & \text{峰值位置} \\
0 & 0.090 & 14.8 & \theta = 0 \text{，沿缸径方向的全部一次谐波} \\
0.3 & 0.126 & 11.3 & \theta = 0 \\
0.60 & 0.162 & \mathbf{7.9} & \theta \approx 101^\circ \; (0 \text{ 与 } 90^\circ \text{ 处均为 } 7.7) \\
1.0 & 0.210 & 12.2 & \theta = 90^\circ \text{，二次谐波与新引入的垂直分量}
\end{array}
$$
$c = 1$并非最优：完全平衡往复质量后，二次谐波力$m_S r \omega^2 \lambda \cos 2 \theta$（峰值$2{,}961\ \mathrm{N}$）仍未平衡，还新增了一个机器原本没有的垂直力$c \, m_S r \omega^2 \sin \theta = 11{,}844 \sin \theta\ \mathrm{N}$。一个简单规则是取$c$使$0^\circ$与$90^\circ$处的值相等，$\left( 1 - c \right) + \lambda = \sqrt{ \lambda^2 + c^2 }$，得$c = 0.60$；在整转内作数值极小化最大值，得$c = 0.59$、$F_{\max} = 7.8\ \mathrm{kN}$，可见该规则很接近。要做得更好，设计者采用两根反向旋转的平衡轴，它们完全抵消一次谐波而只留下二次谐波，代价是附加的轴、轴承和齿轮。
**$c = 0.60$时的剩余力：**
$$
F_{\max} = 7.9\ \mathrm{kN}, \qquad \text{比只平衡旋转质量时的 } 14.8\ \mathrm{kN} \text{ 降低 } 47\ \%
$$
比完全不加配重时的$23.7\ \mathrm{kN}$降低$67\ \%$。配重放在曲柄臂允许的最大半径处，因为$m_c R_c$是定值：$R_c$加倍，附加质量减半。
*合理性检查。*$90^\circ$处的振动力小于$0^\circ$处，虽然曲柄销的力不变，因为此处往复分量与旋转分量互相垂直，按平方和合成而不是同向相加。
:::
:::

::: widget plot
f: 11.844*sqrt(pow(1.75*cos(x*pi/180)+0.25*cos(x*pi/90),2)+pow(0.75*sin(x*pi/180),2))
x: 0, 360
y: 8, 26
caption: 完全不加配重的压缩机曲柄滑块机构的振动力大小（千牛）随曲柄转角（度）的变化。**曲线在上止点有$23.7$千牛的尖峰，在下止点有$17.8$千牛的次峰，其最小值$8.8$千牛出现在约$81^\circ$和$279^\circ$处，始终不为零。**峰谷之比为$2.7$。在止点以外，曲柄销的力与往复惯性力按平方和合成，所以谷底宽而平，而不是一个尖锐的零点。
:::

## 移动副、凸轮与随之而来的跃度

::: definition 跃度及其后果 {#def-jerk}
**再求导一次得到跃度**，$j = d a / d t$。运动规律的加速度在何处突变，跃度就在何处为无穷大（力的阶跃）；跃度在何处突变，力的斜率就在何处突变。两者都会激起从动件系统的振动。

$$
j = \frac{d a}{d t}, \qquad
\Delta F = m \, \Delta a = m \int j \, dt, \qquad
\text{接触力} = m a + F_{\mathrm{spring}}
$$

标准升程规律的峰值系数，升程$h$、凸轮转角$\beta$（速度$k_v h \omega / \beta$，加速度$k_a h \omega^2 / \beta^2$，跃度$k_j h \omega^3 / \beta^3$）：

$$
\begin{array}{l c c c l}
\text{凸轮规律} & k_v & k_a & k_j & \text{用途} \\
\text{等速} & 1.000 & \infty \text{（两端）} & \infty & \text{不单独使用} \\
\text{等加速等减速} & 2.000 & 4.000 & \infty \text{（3 处）} & \text{仅限低速} \\
\text{简谐} & 1.571 & 4.935 & \infty \text{（两端）} & \text{中速凸轮的升程} \\
\text{摆线} & 2.000 & 6.283 & 39.5 \text{（两端突变）} & \text{停—升—停} \\
\text{3-4-5 多项式} & 1.875 & 5.774 & 60.0 \text{（两端突变）} & \text{通用折中} \\
\text{4-5-6-7 多项式} & 2.188 & 7.513 & 52.5 \text{（连续）} & \text{高速凸轮，停—停} \\
\text{5-6-7-8-9 多项式} & 2.461 & 9.372 & 78.8 \text{（连续）} & \text{跃度而非加速度起决定作用时} \\
\text{修正正弦} & 1.760 & 5.528 & 69.5 \text{（两端突变）} & \text{峰值加速度低，三段}
\end{array}
$$

**决定取舍的不只是峰值加速度，还有哪一阶导数最先出现间断。**4-5-6-7多项式的跃度处处连续（$k_j = 52.5$，两端为零），而摆线规律两端各有$39.5$的跃度突变；代价是峰值加速度比摆线高$20\ \%$（$7.513 / 6.283 = 1.20$），峰值速度高$9\ \%$。当关心的是刚性好、速度高的从动件系统的振动时，这一取舍是对的；当从动件重且靠弹簧封闭时则不对，因为加速度高$20\ \%$就需要相应更强的弹簧。

**接触力。**凸轮从动件由刚度为$k$、预紧力为$F_0$的弹簧压在凸轮上，凸轮沿从动件轴线必须传递的力为
$$
F = m a + F_0 + k s + F_{\mathrm{friction}}
$$
**当$m a$为负且其大小超过弹簧力$F_0 + k s$时，从动件飞脱——失去接触。**由于$a \propto \omega^2$而弹簧力与转速无关，存在一个确定的转速，超过它就会失去接触，首先发生在减速度最大处附近。
:::

::: example 凸轮飞脱 {#ex-float}
一盘形凸轮驱动$1.4\ \mathrm{kg}$的从动件，按摆线规律在$70^\circ$内升程$18\ \mathrm{mm}$，弹簧预紧力$120\ \mathrm{N}$，刚度$9\ \mathrm{N / mm}$。求从动件失去接触时的转速。
::: solution
**峰值加速度**（摆线，$k_a = 2 \pi = 6.283$，$\beta = 70^\circ = 1.2217\ \mathrm{rad}$）：
$$
a_{\max} = k_a \frac{h}{\beta^2} \omega^2 = 6.283 \times \frac{0.018}{1.2217^2} \omega^2 = 0.07577\, \omega^2\ \mathrm{m / s^2}
$$
**减速度峰值的位置。**摆线加速度为$\left( 2 \pi h / \beta^2 \right) \omega^2 \sin \left( 2 \pi u \right)$，$u = \theta / \beta$，因此最大减速度出现在$u = 3/4$处，此时升程为
$$
s = h \left( \tfrac{3}{4} + \tfrac{1}{2 \pi} \right) = 0.909 \times 18 = 16.37\ \mathrm{mm}, \qquad
F_{\mathrm{spring}} = 120 + 9 \times 16.37 = 267.3\ \mathrm{N}
$$
**失去接触**发生在减速所需的力超过弹簧所能提供的力时：
$$
m a_{\max} = F_{\mathrm{spring}}
\qquad \Rightarrow \qquad
1.4 \times 0.07577 \times \omega^2 = 267.3
\qquad \Rightarrow \qquad \omega^2 = 2{,}520
$$
$$
\boxed{ \omega_{\mathrm{float}} = 50.2\ \mathrm{rad / s} = 479\ \mathrm{r / min} }
$$
在整个升程内搜索首次出现$m \left| a \right| > F_0 + k s$的点，得$478\ \mathrm{r / min}$（接触首先在$u = 0.73$处丧失，略早于减速度峰值，那里弹簧力稍小），可见按减速度峰值的估算已足够。
**按加速度取安全系数二的设计转速**——一种常用约定；加速度上的二倍对应转速上的$\sqrt{2}$倍：
$$
\omega_{\mathrm{design}} = \frac{50.2}{\sqrt{2}} = 35.5\ \mathrm{rad / s} = \mathbf{339\ \mathrm{r / min}}
$$
**假设机器需要每分钟$900$次从动件行程。**可选方案如下，每种方案的飞脱转速均用同样的升程内搜索求得：
$$
\begin{array}{l l l}
\text{1. 更硬的弹簧} & k \to 30\ \mathrm{N / mm} & \omega_{\mathrm{float}} \to 720\ \mathrm{r / min}\text{，但接触应力上升，凸轮磨损} \\
\text{2. 更轻的从动件} & m \to 0.5\ \mathrm{kg} & \omega_{\mathrm{float}} \to 800\ \mathrm{r / min} \\
\text{3. 换凸轮规律} & \text{修正正弦，} k_a = 5.53 \text{ 对 } 6.28 & \omega_{\mathrm{float}} \to 521\ \mathrm{r / min}\text{，提高百分之九} \\
\text{4. 双凸峰} & \text{每转两次相同升程} & 450\ \mathrm{r / min} \text{ 时即达每分钟 } 900 \text{ 次}
\end{array}
$$
**解读。**方案3最便宜也最无效：峰值加速度系数是运动规律的属性，只能改变百分之十左右。（常被推荐用于高速的4-5-6-7多项式在这一指标上比摆线更差，$k_a = 7.51$对$6.28$；选它是为了跃度连续。）飞脱转速大致按$\sqrt{F_{\mathrm{spring}} / m}$变化，所以质量和弹簧才是有效的手段。在同样$70^\circ$内作同样升程的双凸峰凸轮以一半的轴转速$450\ \mathrm{r / min}$满足行程频率，但这只比$478$的飞脱转速低$6\ \%$；再结合更轻的从动件（飞脱转速$800\ \mathrm{r / min}$），转速裕度为$1.78$，相当于加速度上的$3.2$倍。
*合理性检查。*单位：$\mathrm{kg} \times \mathrm{m} \times \mathrm{rad^2 / s^2} = \mathrm{N}$。质量加倍使飞脱转速降低$\sqrt{2}$倍，与公式一致。实际上失去接触是渐进的：从动件先在减速度峰值附近的一小段弧上离开轮廓，再落回时的冲击才是损坏凸轮和从动件的原因。
:::
:::

::: quiz
一滑块以相对速度$v_{\mathrm{rel}}$沿以$\omega$转动的构件移动。科里奥利加速度$2 \omega v_{\mathrm{rel}}$出现在加速度方程中：

- [ ] 对同一刚体上的任意两点，无论它们之间是何种运动副
- [x] 仅当从本身转动的参考系观察该移动副时；它垂直于滑动方向，由滑动方向沿$\omega$的转向转过$90^{ \circ }$，并在滑动反向时反号
- [ ] 仅当$\omega$恒定时，因为变化的$\omega$已由切向项计入
- [ ] 仅在空间机构中，额外的转动使各轴耦合

::: solution
**仅在转动构件上的移动副处。**该项来自对在转动参考系中表示的位置矢量求两次导数，等于$2 \boldsymbol{\omega} \times \mathbf{v}_{\mathrm{rel}}$，因此任一因子为零它就为零：转动副的$v_{\mathrm{rel}} = 0$，不转动导轨上的滑块$\omega = 0$。同一刚体上两点之间没有相对滑动，故第一项错；该项与$\omega$是否恒定无关，故第三项错；它出现在平面机构中，故第四项错。在导杆式急回机构中，科里奥利分量垂直于导槽，因此作用在滑块和导槽的侧面上；在行程两端导杆瞬时停止，它为零，在两端之间最大。在加速度多边形中漏掉它，多边形照样封闭，但得到的导杆角加速度是错的。
:::
:::

::: history
**科里奥利（Gaspard-Gustave Coriolis）**1835年在《巴黎综合理工学院学报》（*Journal de l'École polytechnique*）上发表论文《论物体系相对运动方程》（*Sur les équations du mouvement relatif des systèmes de corps*），给出了相对运动中的附加项。**布雷斯（Jacques Antoine Charles Bresse）**1853年在同一学报的一篇论文中证明，作平面运动的物体存在加速度瞬心，并描述了通过它的两个圆——拐点圆（其上各点法向加速度为零）和切向加速度为零的点所在的圆——今称布雷斯圆。图解速度多边形和加速度多边形在十九世纪末和二十世纪初的教科书中成为机构分析的标准工具，直到计算机使回路方程法成为常规。**伯科夫（R. S. Berkof）与洛温（G. G. Lowen）**1969年在《工业工程学报》（*Journal of Engineering for Industry*）上证明，四杆机构等简单连杆机构仅用配重即可完全实现力平衡。在凸轮方面，考虑从动件系统动力学来选择多项式运动规律的"polydyne"方法，由达德利（W. M. Dudley）于1948年针对汽车配气机构提出，并由斯托达特（D. A. Stoddart）1953年在《机械设计》（*Machine Design*）上的系列文章中加以发展。
:::

## 后续内容

这里算出的惯性力成为[[mechanisms/machine-dynamics]]的轴承载荷和决定电机尺寸的转矩；振动力及其平衡是[[vibrations]]隔振章节的主题，也是压力机要立在厚重基础上的原因；等效惯量是[[control-systems]]伺服回路必须处理的对象；接触力决定轴承寿命；而跃度是[[mechanisms/cams]]按光滑多项式规律加工、[[mechanisms/gears]]要磨齿的原因。

::: summary
- 再求导一次，系数矩阵不变：在奇异位置附近，角速度按$1/\sin\mu$增长，角加速度增长得更快。
- $\vec a_B = \vec a_A + \vec\alpha\times\vec r - \omega^2\vec r$；法向项从$B$指向$A$，因按$\omega^2$变化而在高速时占主导。
- 科里奥利项$2\omega v_{\mathrm{rel}}$只出现在转动构件上的移动副处，可能超过其他横向项，并随滑动反向而反号。
- 构件上每一点的相对加速度与其位置矢量所成的角都等于$\gamma = \arctan(\alpha/\omega^2)$，所以加速度多边形中含有构件的相似影像。
- 作平面运动的刚体在每一瞬时有一个加速度为零的点，即加速度极点。
- 振动力等于总质量乘以机构总质心的加速度；配重可以消除它，但同时消除振动力矩需要附加元件。
- 驱动端看到的等效惯量在循环中变化，$\tfrac12 (dI_{\mathrm{eq}}/d\theta)\omega^2$在恒速下也是真实存在的转矩。
- 凸轮飞脱由$ma$与弹簧力的比较决定；飞脱转速大致按$\sqrt{F_{\mathrm{spring}}/m}$变化，改变运动规律只能使它改变百分之十左右。
:::

## 习题

::: exercise 法向加速度 {level=1 check="987"}
一根$100$毫米的曲柄以$3{,}000$转每分匀速转动。求曲柄销的加速度（单位：米每二次方秒）。
::: solution
$\omega = 3000 \times 2\pi/60 = 314.16$ rad/s，故$r\omega^2 = 0.1\times(314.16)^2 = 987$ m/s$^2$，指向曲柄中心。
:::
:::

::: exercise 四杆机构的alpha三 {level=1 check="60.1"}
对例题中的四杆机构，求连杆的角加速度（单位：弧度每二次方秒）。
::: solution
由例题中的两个标量方程，$0.8645\,\alpha_3 = 52.00$，故$\alpha_3 = 60.1$ rad/s$^2$（逆时针）。
:::
:::

::: exercise 四杆机构的alpha四 {level=1 check="90.9"}
对同一四杆机构，求摇杆的角加速度（单位：弧度每二次方秒）。
::: solution
$\alpha_4 = 54.36 + 0.6072 \times 60.15 = 90.9$ rad/s$^2$（逆时针）。
:::
:::

::: exercise 连杆质心 {level=1 check="57.3"}
对同一四杆机构，求连杆质心加速度的大小（单位：米每二次方秒）。
::: solution
$\left|\vec a_G\right| = \sqrt{57.29^2 + 1.13^2} = 57.3$ m/s$^2$。
:::
:::

::: exercise 活塞加速度 {level=1 check="1234"}
对$100$–$400$毫米曲柄滑块机构，在$3{,}000$转每分时，求上止点处活塞加速度的大小（单位：米每二次方秒）。
::: solution
$\lambda = 100/400 = 0.25$，$r\omega^2 = 0.1 \times 314.16^2 = 986.96$ m/s$^2$，故$r\omega^2(1+\lambda) = 986.96\times1.25 = 1234$ m/s$^2$。
:::
:::

::: exercise 科里奥利加速度 {level=1 check="3.2"}
对例题中的伸缩臂，求$t=1$秒时的科里奥利加速度（单位：米每二次方秒）。
::: solution
$2\omega\dot R = 2\times4.0\times0.40 = 3.2$ m/s$^2$。
:::
:::

::: exercise 影像角 {level=1 check="83.0"}
对例题中的四杆机构，求连杆上一点的相对加速度与指向内侧的法向之间的夹角$\gamma$（单位：度）。
::: solution
$\gamma=\arctan(\alpha_3/\omega_3^2)=\arctan(60.15/7.42)=83.0^\circ$。
:::
:::

::: exercise 凸轮飞脱 {level=1 check="479"}
对例题中的凸轮，用减速度峰值估算法求从动件的飞脱转速（单位：转每分）。
::: solution
减速度峰值处弹簧力为$267.3$ N，故$1.4\times0.07577\times\omega^2 = 267.3$，$\omega = 50.2$ rad/s $=479$ r/min。
:::
:::

::: exercise 振动力 {level=2}
对压缩机曲柄滑块机构，给出九十度处的振动力，并解释它为什么小于上止点处。
::: solution
$$
F_x = m_S r \omega^2 \lambda \cos 180^\circ = - 2{,}961\ \mathrm{N}, \qquad F_y = m_A r \omega^2 = 8{,}883\ \mathrm{N}
\qquad \Rightarrow \qquad \left| F \right| = \sqrt{2961^2 + 8883^2} = 9{,}363\ \mathrm{N}
$$
它更小，是因为在九十度处往复分量与旋转分量互相垂直、按平方和合成，而在上止点处两者共线、直接相加。由于力的方向在循环中旋转、大小变化$2.7$倍，机架及其螺栓组必须在整个循环内校核，而不能只看大小最大的那个角度。
:::
:::

::: exercise 平衡分数 {level=2}
对压缩机曲柄滑块机构，给出完全平衡往复质量时的配重矩$m_c R_c$，并说明它留下了什么未平衡。
::: solution
$$
m_c R_c = \left( m_A + m_S \right) r = 3.5 \times 0.060 = 0.210\ \mathrm{kg \cdot m}
$$
它使往复惯性力的二次谐波部分全部未被平衡，即$m_S r \omega^2 \lambda \cos 2 \theta$，峰值$2.0 \times 5922 \times 0.25 = 2{,}961\ \mathrm{N}$；并引入一个只平衡旋转质量时没有的垂直力$- m_S r \omega^2 \sin \theta = -11{,}844 \sin \theta\ \mathrm{N}$。因此振动力峰值只从$23.7$降到$12.2\ \mathrm{kN}$（在$\theta = 90^\circ$处，两个剩余分量合成为$\sqrt{2961^2 + 11844^2}$）。两根反向旋转的平衡轴可以抵消一次谐波而不引入旋转矢量。
:::
:::

::: exercise 推导 {level=3}
将曲柄滑块回路求导两次得到活塞加速度，并证明两项表达式$a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$是精确结果关于$\lambda$的一阶近似。给出$\lambda = 0.3$时误差的界。
::: solution
**回路。**$x = r \cos \theta + l \cos \phi$，$\sin \phi = \lambda \sin \theta$；记$D = 1 - \lambda^2 \sin^2 \theta$，则$x / r = \cos \theta + \sqrt{D} / \lambda$。
**一阶导数**（见[[mechanisms/velocity-analysis]]），$\omega$恒定：
$$
v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{D}} \right]
$$
**二阶导数。**再对$\theta$求导并乘以$\omega$：
$$
\ddot{x} = - r \omega^2 \left[ \cos \theta + \frac{\lambda \cos 2 \theta}{\sqrt{D}} + \frac{\lambda^3 \sin^2 2 \theta}{4 D^{3 / 2}} \right]
$$
这是精确式。展开$1 / \sqrt{D} = 1 + \tfrac12 \lambda^2 \sin^2 \theta + \dots$得
$$
\ddot{x} = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + O \left( \lambda^3 \right) \right]
$$
所以两项表达式关于$\lambda$精确到一阶——实际上精确到二阶，因为不存在$\lambda^2$项。
**$\lambda = 0.3$时的误差。**精确式与两项式之差$\lambda \cos 2 \theta \left( D^{-1/2} - 1 \right) + \lambda^3 \sin^2 2 \theta / \left( 4 D^{3/2} \right)$的绝对值在$\theta = 90^\circ$处最大，此处第二部分为零：
$$
\left| \epsilon \right|_{\max} = \lambda \left( \frac{1}{\sqrt{1 - \lambda^2}} - 1 \right) = 0.3 \left( \frac{1}{0.9539} - 1 \right) = 0.0145\, r \omega^2
$$
相对于上止点的峰值加速度$r \omega^2 \left( 1 + \lambda \right) = 1.3\, r \omega^2$，为
$$
\frac{0.0145}{1.3} = 1.1\ \%
$$
$\lambda = 0.5$时同一界为$0.0774\, r \omega^2$，即峰值的$5.2\ \%$，因为误差按$\lambda^3$增长；对短连杆应采用精确式（或数值解）。
*合理性检查。*误差在上、下止点处为零，因为那里$\sin \theta = 0$、$D = 1$，所以两项式给出的上止点峰值加速度是精确的。对$x(\theta)$作数值二次求导，与精确式的差小于$10^{-6}\, r\omega^2$。
:::
:::

::: exercise 设计 {level=3}
设计一台**模切压力机的机构与驱动**：切刀头须在行程底部停歇$40^\circ$输入轴转角，以每分钟$45$次行程、$18\ \mathrm{kN}$的力切穿周长$250\ \mathrm{mm}$、厚$0.3\ \mathrm{mm}$的纸板，切入行程$2\ \mathrm{mm}$；刀头质量$28\ \mathrm{kg}$；机架允许的振动力为$4\ \mathrm{kN}$；每次切割位置须在同一处$\pm 0.1\ \mathrm{mm}$以内；驱动不得需要离合制动器。给出拓扑、运动规律、尺寸选择、平衡、失效模式和验收试验。
::: solution
**工况。**每分钟$45$次行程，循环周期$1.333\ \mathrm{s}$。**切割：**纸板剪切强度$\tau = 90\ \mathrm{MPa}$（假定），厚$0.3\ \mathrm{mm}$，周长$250\ \mathrm{mm}$：
$$
F_{\mathrm{cut}} = \tau t L = 90 \times 10^6 \times 0.0003 \times 0.250 = 6{,}750\ \mathrm{N}
$$
规定的$18\ \mathrm{kN}$是该理论剪切载荷的$2.7$倍，这是为钝刀和不均匀切割留的余量。设计载荷取$18\ \mathrm{kN}$；若力在$2\ \mathrm{mm}$内线性上升，每次行程能量的上界为
$$
E = \tfrac{1}{2} F d = \tfrac{1}{2} \times 18{,}000 \times 0.002 = 18\ \mathrm{J}
$$
**拓扑。**要求在行程底部停歇，可由凸轮、带连杆点停歇的六杆机构或伺服实现。
$$
\begin{array}{l l c l}
\text{A. 凸轮与滚子从动件} & \text{精确停歇，精确规律} & 18\ \mathrm{kN} \text{ 的形封闭凸轮尺寸很大} & \text{可行；磨损会移动切割位置} \\
\text{B. 曲柄滑块} & \text{无停歇} & \text{—} & \text{否决} \\
\text{C. 带停歇的六杆机构} & \text{按设计停歇} & \text{连杆点} & \text{候选} \\
\text{D. 肘杆机构} & \text{死点附近近似停歇} & \text{小驱动器产生 } 18\ \mathrm{kN} & \text{候选} \\
\text{E. 伺服与行星滚柱丝杠} & \text{任意规律} & 28\ \mathrm{kg} \text{ 在螺母上} & \text{候选}
\end{array}
$$
**选E，原因在于$\pm 0.1\ \mathrm{mm}$的切割位置要求，而不是停歇。**六杆机构的停歇是输出的驻点，切割处的位置误差为
$$
\delta = \frac{\partial s}{\partial \theta} \delta \theta + \sum \frac{\partial s}{\partial l_i} \delta l_i
$$
停歇处$\partial s / \partial \theta = 0$，第一项消失——这正是使用停歇机构的原因——但对运动副间隙和杆长误差的敏感度$\partial s / \partial l_i$不为零。若磨损的运动副到刀头的杠杆比为$2.5$，$0.05\ \mathrm{mm}$的销轴磨损会使切割位置移动$0.05 \times 2.5 = 0.125\ \mathrm{mm}$，已超出公差。滚柱丝杠伺服靠编码器和丝杠导程定位，其误差（导程误差、热伸长、间隙）可以测量并补偿。
**运动规律。**行程$52\ \mathrm{mm}$：快速趋近、受控切割、底部停歇、快速退回、顶部停歇。折算到$1.333\ \mathrm{s}$的循环：
$$
\begin{array}{l c c c}
\text{阶段} & \text{转角} & \text{时间} \left( \mathrm{s} \right) & \text{运动} \\
\text{趋近} & 90^\circ & 0.333 & 50\ \mathrm{mm}\text{，修正正弦} \\
\text{切割} & 30^\circ & 0.111 & 2\ \mathrm{mm}\text{，匀速} \\
\text{停歇} & 40^\circ & 0.148 & 0 \\
\text{退回} & 60^\circ & 0.222 & 52\ \mathrm{mm}\text{，修正正弦} \\
\text{停歇} & 140^\circ & 0.519 & 0
\end{array}
$$
**切割速度：**$v_{\mathrm{cut}} = 0.002 / 0.111 = 0.018\ \mathrm{m / s}$。规定匀速切割，是因为纤维纸板的切割力与速率有关，速度变化会导致力和毛刺的变化。
**加速度。**趋近：$0.333\ \mathrm{s}$内$50\ \mathrm{mm}$，修正正弦，$k_a = 5.53$：
$$
a_{\max} = 5.53 \times \frac{0.050}{0.333^2} = 2.49\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F_{\mathrm{inertia}} = 28 \times 2.49 = 70\ \mathrm{N}
$$
**退回：$0.222\ \mathrm{s}$内$52\ \mathrm{mm}$：**
$$
a_{\max} = 5.53 \times \frac{0.052}{0.222^2} = 5.82\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 28 \times 5.82 = 163\ \mathrm{N}
$$
**解读。**惯性力$163\ \mathrm{N}$，而切割力$18{,}000\ \mathrm{N}$——不到百分之一——这是因为行程频率低。若以同样运动规律每分钟$600$次行程，惯性力将大$\left( 600 / 45 \right)^2 = 178$倍，约$29\ \mathrm{kN}$，是振动力允许值的七倍：高速压力机是另一种机器。
**尺寸选择。**峰值力，保守地把切割力、退回惯性力和刀头重量相加：$18{,}000 + 163 + 28 \times 9.81 = 18{,}440\ \mathrm{N}$。**直径$32\ \mathrm{mm}$、导程$10\ \mathrm{mm}$、效率$\eta = 0.90$的行星滚柱丝杠：**
$$
T_{\mathrm{peak}} = \frac{F p}{2 \pi \eta} = \frac{18{,}440 \times 0.010}{2 \pi \times 0.90} = 32.6\ \mathrm{N \cdot m}
$$
**循环内的均方根转矩。**切割力只在$0.111\ \mathrm{s}$的切割期间存在；趋近、底部停歇和退回共$0.555\ \mathrm{s}$内取约$3\ \mathrm{N \cdot m}$用于加速和保持刀头，顶部停歇期间取零：
$$
T_{\mathrm{RMS}} = \sqrt{\frac{1}{1.333} \left[ 32.6^2 \times 0.111 + 3^2 \times 0.555 + 0 \times 0.667 \right]} = \sqrt{\frac{118.0 + 5.0}{1.333}} = 9.6\ \mathrm{N \cdot m}
$$
**转速。**修正正弦的退回峰值速度为$k_v h / t = 1.76 \times 0.052 / 0.222 = 0.412\ \mathrm{m / s}$，导程$10\ \mathrm{mm}$时丝杠转速为$0.412 / 0.010 \times 60 = 2{,}470\ \mathrm{r / min}$。须按所选长度和端部支承核对丝杠制造商的转速极限。
**电机。**直接联接时，电机须提供至少$9.6\ \mathrm{N \cdot m}$的连续转矩、约$33\ \mathrm{N \cdot m}$的峰值转矩和$2{,}500\ \mathrm{r / min}$的转速。额定$3{,}000\ \mathrm{r / min}$、约$3.5\ \mathrm{kW}$的伺服电机连续转矩为$3{,}500 / 314.2 = 11.1\ \mathrm{N \cdot m}$，按常见的$300\ \%$短时过载，峰值约$33\ \mathrm{N \cdot m}$。峰值裕度很小，但峰值转矩只在切割时以$0.018\ \mathrm{m / s}$（约$110\ \mathrm{r / min}$）需要，因此取决于制造商在低速段的转矩—转速曲线。加减速器能提高转矩裕度，但会使退回时电机转速超过$3{,}000\ \mathrm{r / min}$；这一取舍须按实际产品样本数据进行，并计入此处忽略的电机与丝杠的折算惯量。
**振动力。**刀头竖直运动；机架受$m a$及切割反力。切割力在压力机内部闭合——上模、纸板、下模、模座、机架、丝杠——不表现为外部振动力。基础感受到的是刀头和螺母的惯性力（至多$163\ \mathrm{N}$）、旋转件的残余不平衡，以及切穿时激起的瞬态。
**切穿瞬态。**纸板断开时切割力在约一毫秒内消失。设机架刚度为$900\ \mathrm{kN / mm}$（假定），机架被拉伸$18 / 900 = 0.020\ \mathrm{mm}$，储能$\tfrac{1}{2} \times 18{,}000 \times 2.0 \times 10^{-5} = 0.18\ \mathrm{J}$。若该能量无阻尼地释放到一个等效质量为$800\ \mathrm{kg}$（假定）的单一模态：
$$
\omega_n = \sqrt{\frac{900 \times 10^6}{800}} = 1{,}061\ \mathrm{rad / s}, \qquad
v = \sqrt{\frac{2 \times 0.18}{800}} = 0.0212\ \mathrm{m / s}, \qquad
F = M v \omega_n = 800 \times 0.0212 \times 1{,}061 = 18.0\ \mathrm{kN}
$$
——力幅等于切割力，这对突然释放而言是必然的（$F = k \delta$）。这是一个上界，为$4\ \mathrm{kN}$允许值的四倍半，因此冲击必须靠结构措施来处理——在局部闭合力流的刚性预紧模架、模垫中的阻尼，以及调试时的实测——而不能只靠计算。
**失效模式。**
$$
\begin{array}{l l}
\text{切割时丝杠失稳} & 18.4\ \mathrm{kN}\text{，对 } 0.4\ \mathrm{m} \text{ 两端铰支、底径 } 28\ \mathrm{mm} \text{ 的丝杠：} P_{\mathrm{cr}} = \pi^2 E I / L^2 = 391\ \mathrm{kN}\text{，安全系数 } 21 \\
\text{伺服在切割中让位} & 10\ \mathrm{mm} \text{ 导程下 } 0.02\ \mathrm{mm} \text{ 对应 } 0.0126\ \mathrm{rad}\text{，故位置环在丝杠处须有 } 32.6 / 0.0126 = 2.6\ \mathrm{kN \cdot m / rad} \\
\text{切割时间隙换向} & \text{每次都在间隙的同一侧切割；采用预紧螺母} \\
\text{丝杠热伸长} & 12\ \mu\mathrm{m / (m \cdot K)} \times 0.4\ \mathrm{m} \times 8\ \mathrm{K} = 38\ \mu\mathrm{m}\text{，在 } 100\ \mu\mathrm{m} \text{ 以内，但占三分之一} \\
\text{停歇时模具冲击} & 40^\circ \text{ 停歇使切割完成；力松弛后才开始退回} \\
\text{断电时刀头下落} & 28\ \mathrm{kg} \text{ 在效率 } 90\ \% \text{ 的丝杠上不能自锁；必须设保持制动器}
\end{array}
$$
**验收试验。**
$$
\begin{array}{l l}
\text{切割位置} & 1{,}000 \text{ 次连续行程，用 } 0.001\ \mathrm{mm} \text{ 量表对模具测量；} 3\sigma \le \pm 0.05\ \mathrm{mm}\text{，为磨损留裕度} \\
\text{停歇} & \text{对照编码器测量；} 40^\circ \text{ 停歇期间刀头移动不超过 } 0.02\ \mathrm{mm} \\
\text{振动力} & \text{机架上装加速度计；动态力峰值低于 } 4\ \mathrm{kN}\text{，先空模，再切割} \\
\text{转矩} & \text{记录一个循环的驱动转矩，作为状态基线保存} \\
\text{切割质量} & 10^4 \text{ 次行程后，重测位置并检查毛刺高度} \\
\text{断电} & \text{在行程顶部断电；刀头下落不超过 } 0.05\ \mathrm{mm}
\end{array}
$$
空模与切割两种情况下振动力测量值之差就是切穿瞬态，它是报告中唯一无法可靠计算的数字。
**技术规格条款。**"切割位置重复精度应在使用磨损模具的条件下按连续一千次行程测量，并以三倍标准差报告。""每次行程均应从间隙的同一侧驱动丝杠进行切割，螺母预紧力应可验证。""驱动断电时，机器应在行程任意位置将刀头保持在$0.05\ \mathrm{mm}$以内。""驱动转矩曲线应在调试时记录并每月跟踪；峰值上升视为模具磨损或润滑失效的征兆。"
*设计评注。*压力机先按能量和刚度设计，再按力设计；必须保持位置的压力机要按其结构和测量系统设计，而不是按其机构设计。本设计放弃连杆机构，是因为连杆机构的精度取决于随磨损增大的运动副间隙，而伺服丝杠的误差可以测量并补偿。这是说明方法的教学例子，不是经批准的机器设计；实际压力机须按适用的机械安全标准制造，并由合格工程师校核。
:::
:::
