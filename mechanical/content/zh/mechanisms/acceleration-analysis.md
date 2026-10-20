速度分析告诉你机器在做什么。加速度分析告诉你**它向结构要什么代价**。一个输入转速恒定的连杆机构，输入加速度为零，其构件却承受着五到十倍重力的加速度；高速压力机机架、缝纫机机头、包装转塔之所以按这些数字而不是按轴上的转矩定尺寸，原因是**加速度产生的惯性力从不离开机器——它们在轴承、螺栓和基础里循环，而它们就是振动的一切**。

数学上只是再求导一次，用的是同一个矩阵。物理上是三个各有一个名字、一个方向、一种被遗忘方式的项：**向心项、切向项和科里奥利项。**其中两项属于刚体，一项属于参考系的选择；而第三项之所以是弄坏机器的那一个，原因是它只出现在一个构件沿另一个转动构件滑动之处——恰恰是设计者最不容易去看的地方。

::: warning 四种躲过速度校核的加速度错误
**丢掉向心项。**长为$r$的构件以$\omega$转动时，即使$\dot{\omega} = 0$，其远端也以$r \omega^2$的加速度**指向**铰链；而该项在每一个高速机构中占主导地位，原因是它按$\omega^2$增长，切向项却只按$\dot{\omega}$增长。**使这成为本学科最常见错误的数字是：在$3{,}000$转每分时，$100$毫米的曲柄销以$987\ \mathrm{m / s^2}$加速——一百倍重力——而一根从零加速到全速耗时半秒的曲柄，其切向加速度只有$6.3\ \mathrm{m / s^2}$。**向心项大一百五十七倍；而省略它的设计者会把合加速度的方向弄错四十度，原因是这两项互相垂直。
**漏掉转动构件上移动副处的科里奥利项。**项$2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}$只在一点沿一个本身转动的物体滑动时才存在；而它被漏掉，原因是第一门动力学课里的每个例题中它都为零。**使其具有决定性的数字是：在一根以$0.4\ \mathrm{m / s}$伸出、同时以$4\ \mathrm{rad / s}$转动的伸缩臂上，科里奥利加速度为$3.2\ \mathrm{m / s^2}$，而横向加速度为$2.8\ \mathrm{m / s^2}$——它是两者中较大的那个。** **急回机构的摇杆之所以要按比粗略分析给出的转矩高百分之五十的转矩来设计，原因是科里奥利项在一个瞬时沿摇杆轴线作用、在另一个瞬时横向作用于它，而后者才是轴承载荷。**
**把速度瞬心与加速度瞬心混为一谈。**一个构件有一个速度瞬心，而其加速度瞬心一般**不同**；第二个瞬心之所以存在，原因是作平面运动的刚体在每个瞬时恰有一个加速度为零的点，而除非角速度为零，它不是速度为零的那个点。**使这一区别成为设计问题而不是奇闻的数字是：四杆机构的连杆有一个加速度为零的点——兰格（Langer）点——而连杆点机构之所以可能，靠的正是这个点的存在**；一个必须使其工具不加速的缝合头之所以围绕该点构造，原因是任何配重都做不到的事，几何却免费给出。
**把不在同一参考系中的加速度相加。**相对加速度方程是在一个惯性系中定义的各矢量的和；而把一个绕某个中心算出的向心项与另一个绕另一个中心算出的切向项相加的作图是错的——这并不微妙——它量纲正确、数值可信，却是错的。**使这一错误可被发现的数字是：转动构件上一点绕其自身铰链的加速度必须满足$a_B = a_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r}$，其中$\omega^2$项从$B$指向$A$，绝不从$A$指向$B$。** **一个向心项朝外的解，其错误是两倍的量值而不是一点点，原因是符号就是方向的全部。**
:::

## 再求导一次，同一个矩阵

::: definition 加速度回路 {#def-accel-loop}
**对速度回路再求导一次。**记$\alpha_k = d \omega_k / dt$，四杆机构给出

$$
\boxed{ - a \omega_2^2 e^{i \theta_2} + a \alpha_2 i e^{i \theta_2} - b \omega_3^2 e^{i \theta_3} + b \alpha_3 i e^{i \theta_3} = - c \omega_4^2 e^{i \theta_4} + c \alpha_4 i e^{i \theta_4} }
$$

**其中$\alpha$项左边的所有量都已由位置分析和速度分析求得。**写成线性方程组，其**系数矩阵与速度分析相同**，因而**行列式也相同**，即$- b c \sin \mu$：

$$
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \alpha_3 \\ \alpha_4 \end{pmatrix} =
\begin{pmatrix} A_x \\ A_y \end{pmatrix}, \qquad
\begin{pmatrix} A_x \\ A_y \end{pmatrix} =
\begin{pmatrix} a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 \\ - a \omega_2^2 \cos \theta_2 - b \omega_3^2 \cos \theta_3 + c \omega_4^2 \cos \theta_4 \end{pmatrix}
$$

**读法是：一个在速度上奇异的机构在加速度上同样奇异，而其角加速度不只是增大，它们按$1 / \sin \mu$发散，角速度却保持有限。** **使这成为车间事实的数字是：$\mu = 20^\circ$的四杆机构，其角加速度是名义值的$2.9$倍；$\mu = 2^\circ$的肘节机构，其角加速度是名义值的二十九倍——而一个在肘节处卡死的连杆机构之所以不是被载荷卡死、而是被自己连杆的惯性卡死，原因是载荷正是以连杆的角加速度为参照来衡量的。**
:::

::: definition 刚体的平面运动 {#def-rigid-accel}
**同一刚体上的两点：**

$$
\boxed{ \vec{a}_B = \vec{a}_A + \underbrace{\vec{\alpha} \times \vec{r}_{B / A}}_{\text{切向},\; \perp \vec{r}} - \underbrace{\omega^2 \vec{r}_{B / A}}_{\text{法向，从 } B \text{ 到 } A} }
$$

**而两个分量由构造互相垂直，这正是加速度多边形可行的原因。**

$$
\begin{array}{l l l l}
\text{项} & \text{大小} & \text{方向} & \text{何时消失} \\
\text{法向} & \omega^2 r & B \text{ 到 } A & \omega = 0 \\
\text{切向} & \alpha r & \perp \vec{r} & \alpha = 0 \\
\text{科里奥利} & 2 \omega v_{\mathrm{rel}} & \perp \text{ 滑动方向} & \omega = 0 \text{ 或 } v_{\mathrm{rel}} = 0 \\
\text{平移} & a_A & \text{按给定} & A \text{ 固定}
\end{array}
$$

**科里奥利项出现在使用固连于构件的参考系时**，其方向由把滑动速度沿$\omega$的转向旋转$90^\circ$得到：

$$
\boxed{ \vec{a}_B = \vec{a}_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r} + \underbrace{2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}}_{\text{科里奥利}} + \vec{a}_{\mathrm{rel}} }
$$

**使科里奥利项值得一整段的数字是：它是整个机构动力学中唯一与两个由设计者独立设定的量之积成正比的项**——构件的转速与滑块的滑速——**而它在高输出速率下占主导，原因是其他每一项都只是其中之一二次的函数。**
:::

::: example 四杆机构的加速度 {#ex-acc4}
四杆机构$a = 0.5$、$b = 1.2$、$c = 0.9$、$d = 1.1$米，$\theta_2 = 40^\circ$，$\omega_2 = 10\ \mathrm{rad / s}$恒定。由位置与速度解：$\theta_3 = 24.44^\circ$，$\theta_4 = 65.34^\circ$，$\omega_3 = - 2.724\ \mathrm{rad / s}$，$\omega_4 = 2.276\ \mathrm{rad / s}$。求$\alpha_3$、$\alpha_4$以及$A$、$B$和连杆质心的加速度。
::: solution
**已知的向心加速度大小：**
$$
a \omega_2^2 = 0.5 \times 100 = 50.0, \qquad
b \omega_3^2 = 1.2 \times 7.420 = 8.904, \qquad
c \omega_4^2 = 0.9 \times 5.180 = 4.662\ \mathrm{m / s^2}
$$
**由回路方程取实部与虚部（$\alpha_2 = 0$）得到的两个标量方程：**
$$
- b \alpha_3 \sin \theta_3 + c \alpha_4 \sin \theta_4 = a \omega_2^2 \cos \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 = 38.30 + 8.11 - 1.94 = 44.47
$$
$$
b \alpha_3 \cos \theta_3 - c \alpha_4 \cos \theta_4 = a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 = 32.14 + 3.69 - 4.24 = 31.59
$$
**其中$b \sin \theta_3 = 0.4967$，$c \sin \theta_4 = 0.8180$，$b \cos \theta_3 = 1.0925$，$c \cos \theta_4 = 0.3747$。** **由第一个方程，**$\alpha_4 = \left( 44.47 + 0.4967 \alpha_3 \right) / 0.8180 = 54.36 + 0.6072 \alpha_3$。**代入第二个：**
$$
1.0925 \alpha_3 - 0.3747 \left( 54.36 + 0.6072 \alpha_3 \right) = 31.59
\qquad \Rightarrow \qquad 0.8649 \alpha_3 = 51.96
$$
$$
\boxed{ \alpha_3 = 60.1\ \mathrm{rad / s^2}\ \text{逆时针}, \qquad \alpha_4 = 54.36 + 36.49 = 90.9\ \mathrm{rad / s^2}\ \text{逆时针} }
$$
**用位置解作有限差分、经精确回路闭合数值二阶求导校核，给出$60.15$和$90.87$**——而每个机构值得做一次这种校核，原因是它能抓住$\vec{\omega}$中的符号错误和两个标量方程的互换，而这两个错误能躲过其他一切校核。
**$A$的加速度**（曲柄匀速，故无切向项）：
$$
\vec{a}_A = - a \omega_2^2 \left( \cos \theta_2 , \sin \theta_2 \right) = - 50.0 \left( 0.7660,\; 0.6428 \right) = \left( - 38.30,\; - 32.14 \right)
\qquad \left| \vec{a}_A \right| = 50.0\ \mathrm{m / s^2} = 5.1\ g
$$
**$B$的加速度，由连杆求：**
$$
\vec{r}_{B / A} = 1.2 \left( 0.9104,\; 0.4139 \right) = \left( 1.0925,\; 0.4967 \right)
$$
$$
\vec{\alpha}_3 \times \vec{r}_{B / A} = 60.1 \left( - 0.4967,\; 1.0925 \right) = \left( - 29.85,\; 65.66 \right), \qquad
- \omega_3^2 \vec{r}_{B / A} = - 7.420 \left( 1.0925,\; 0.4967 \right) = \left( - 8.11,\; - 3.69 \right)
$$
$$
\vec{a}_B = \left( - 38.30 - 29.85 - 8.11,\; - 32.14 + 65.66 - 3.69 \right) = \left( - 76.26,\; 29.83 \right)
$$
**由摇杆校核**，由于$O_4$固定，必须给出同一个矢量：
$$
\vec{a}_B = c \alpha_4 \left( - \sin \theta_4, \cos \theta_4 \right) - c \omega_4^2 \left( \cos \theta_4, \sin \theta_4 \right)
= 81.8 \left( - 0.9087, 0.4174 \right) - 4.662 \left( 0.4174, 0.9087 \right)
$$
$$
= \left( - 74.33 - 1.95,\; 34.14 - 4.24 \right) = \left( - 76.28,\; 29.90 \right) \quad \checkmark
$$
$$
\boxed{ \left| \vec{a}_B \right| = \mathbf{81.9\ \mathrm{m / s^2} = 8.4\ g} }
$$
**读法是：两条路线的符合程度达百分之一，而这种符合是唯一对两个标量方程的互换、或对任一角加速度反向敏感的校核**——而通不过它的解会错$150\ \mathrm{m / s^2}$而不是百分之几，原因是垂直分量对中的一个符号错误会把一个矢量反转而不是倾斜。

**连杆的质心**，位于$AB$的中点：
$$
\vec{r}_{G / A} = \left( 0.5463,\; 0.2484 \right), \qquad
\vec{a}_G = \left( - 38.30, - 32.14 \right) + 60.1 \left( - 0.2484, 0.5463 \right) - 7.420 \left( 0.5463, 0.2484 \right)
$$
$$
= \left( - 38.30 - 14.93 - 4.05,\; - 32.14 + 32.83 - 1.84 \right) = \left( - 57.28,\; - 1.15 \right)
\qquad \left| \vec{a}_G \right| = \mathbf{57.3\ \mathrm{m / s^2} = 5.8\ g}
$$
**惯性力**：连杆$6\ \mathrm{kg}$，曲柄$3\ \mathrm{kg}$，摇杆$4\ \mathrm{kg}$，后两者的质心在中点处：
$$
F_{\mathrm{crank}} = 3 \times 50.0 = 150\ \mathrm{N}, \qquad
F_{\mathrm{coupler}} = 6 \times 57.3 = 344\ \mathrm{N}, \qquad
F_{\mathrm{rocker}} = 4 \times 41.0 = 164\ \mathrm{N}
$$
**振动力**——惯性力的矢量和，即基础感受到的力：
$$
\vec{F} = 3 \left( - 38.30, - 32.14 \right) + 6 \left( - 57.28, - 1.15 \right) + 4 \left( - 38.14, 14.92 \right) = \left( - 611, - 44 \right)\ \mathrm{N}
\qquad \left| \vec{F} \right| = \mathbf{613\ \mathrm{N}}
$$
**而机构总重只有$128\ \mathrm{N}$。** **在每秒九十六转的输入转速下，机构以相当于自重四倍半的力摇晃自己的机架，而机器的螺栓之所以是疲劳环节而不是杆件，正是这个比值。**
*合理性检验。*$\left| \vec{a}_G \right|$之所以由$x$分量主导，原因是在此瞬时连杆的向心与切向加速度在$y$方向几乎相消、在$x$方向相加；而即使输入转速严格恒定，连杆的加速度也不平滑，原因是这两项互相垂直并随构件旋转。
:::
:::

::: widget plot
f: 986.96*(cos(x*pi/180)+0.25*cos(x*pi/90))
x: 0, 360
y: -360, 1320
caption: $100$–$400$毫米曲柄滑块机构在$300$转每分下的活塞加速度，以米每二次方秒计。**曲线不是余弦：二次谐波项$0.25 \cos 2\theta$使上止点峰值为$1234$、下止点峰值为$-247$，相差五倍。** **$1234$米每二次方秒的峰值是重力的一百二十六倍**；而曲线的不对称正是连杆大端粗、中间细的原因，原因是最大压力发生在上止点，而$-247$处的最大拉力只有其五分之一——**一根按峰值设计的连杆，在行程的另一端会比必要重量重五倍。**
:::

## 多边形、极点与不加速的点

::: definition 加速度影像 {#def-images}
**加速度多边形就是按比例画出的矢量方程**，与速度多边形完全一样，只是把每个相对加速度拆成方向已知的切向分量和大小已知的法向分量。

$$
\begin{array}{l l l}
\text{矢量} & \text{已知} & \text{未知} \\
\vec{a}_A & \text{大小和方向} & \text{若输入转速恒定则无未知} \\
\vec{a}_{B / A} & \text{法向分量} \omega_3^2 b \text{（大小和方向）} & \text{切向分量，方向已知} \\
\vec{a}_B & \text{仅方向，} \perp O_4 B \text{ 加上已知的法向分量} & \text{大小}
\end{array}
$$

**作图法：**从极点$o$画出$\vec{a}_A$；从其末端画出指向**从$B$到$A$**的$\vec{a}_{B / A}^n$；从其终点作垂直于$AB$的直线（切向方向）；从$o$画出$\vec{a}_B^n = c \omega_4^2$，方向从$B$到$O_4$，并从其终点作垂直于$O_4 B$的直线。**交点给出$\vec{a}_B$，而两个切向长度除以各自构件长度即给出$\alpha_3$和$\alpha_4$。**

**加速度影像。**正如速度多边形内含一个转过$90^\circ$的连杆副本，**加速度多边形内含一个转过角度$\gamma$的连杆副本，$\gamma$由下式给出**

$$
\tan \gamma = \frac{\alpha_3}{\omega_3^2}
$$

**而这不是奇闻的原因在于：它凭图纸上的两个测量就给出任一连杆点的加速度**——并且角度$\gamma$**对构件上每一点都不相同**，这正是"刚体的加速度场是一个复数"这一几何表述。

$$
\text{对上面的四杆机构：} \tan \gamma = \frac{60.1}{7.42} = 8.10 \qquad \Rightarrow \qquad \gamma = 83.0^\circ
$$

**加速度瞬心。**作平面运动的刚体在每个瞬时有**一个加速度为零的点**，求法是：从加速度已知的点起，沿与$\vec{a}$成$\gamma$角的方向量出长度$a / \sqrt{\alpha^2 + \omega^4}$。**对上述连杆，取$A$点：**

$$
\overline{A P_0} = \frac{\left| \vec{a}_A \right|}{\sqrt{\alpha_3^2 + \omega_3^4}} = \frac{50.0}{\sqrt{3{,}612 + 55.1}} = \frac{50.0}{60.55} = 0.826\ \mathrm{m}
$$

**方向与$\vec{a}_A$成$83.0^\circ$。** **使这成为设计工具的数字是：$0.826$米比连杆本身还长，所以加速度为零的点位于实体构件之外——而连杆点仍可放到该处，原因是连杆是一块三角形板，其平面可以随设计者的意愿延伸多远就延伸多远。** **携带在该点处的工具在此瞬时完全不加速，这就是连杆点缝合头的原理，也是[[mechanisms/linkage-synthesis]]中精确机构一族的原则。**
:::

::: example 转动臂上的科里奥利加速度 {#ex-coriolis}
一根伸缩臂按$R = 0.30 + 0.40\, t$米伸出，同时按$\theta = 2.0\, t^2$弧度转动。求$t = 1.0\ \mathrm{s}$时末端执行器的加速度，以及科里奥利项在横向加速度中所占的份额。
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
**横向分量，拆成两部分：**
$$
a_\theta = R \alpha + 2 \omega \dot{R} = 0.70 \times 4.0 + 2 \times 4.0 \times 0.40 = 2.80 + 3.20 = \mathbf{6.00\ \mathrm{m / s^2}}
$$
$$
\boxed{ \vec{a} = \left( - 11.20,\; 6.00 \right)\ \mathrm{m / s^2}, \qquad \left| \vec{a} \right| = 12.7\ \mathrm{m / s^2} = 1.3\ g }
$$
**科里奥利份额：**
$$
\frac{2 \omega \dot{R}}{R \alpha + 2 \omega \dot{R}} = \frac{3.20}{6.00} = \mathbf{53\ \%}
$$
**读法。** **横向加速度的一半以上——因而回转驱动必须提供的转矩的一半以上——来自一个只因臂正在伸出才存在的项。** **使这成为控制问题而不仅是尺寸问题的数字是：臂缩回时科里奥利项变号，所以驱动在伸出时看到$+ 3.20$、缩回时看到$- 3.20$，其他一切不变**——而伸缩臂装卸机的吊臂回转之所以在操作员换向伸出的瞬间感到冲击，原因是转矩需求在换向时瞬时跳变$6.4\ \mathrm{m / s^2}$乘以载荷质量。
**转矩**：载荷$120\ \mathrm{kg}$，均质吊臂$60\ \mathrm{kg}$：
$$
T = \left( 120 \times 0.70 + 60 \times 0.35 \right) \times 6.00 + \left( 120 \times 0.70^2 + 60 \times 0.35^2 \right) \times 4.0
= 105.0 \times 6.00 + 66.15 \times 4.0 = 630 + 265 = \mathbf{895\ \mathrm{N \cdot m}}
$$
**其中仅科里奥利部分就占$120 \times 0.70 \times 3.20 + 60 \times 0.35 \times 3.20 = 269 + 67 = 336\ \mathrm{N \cdot m}$——占总数的百分之三十八。**
*合理性检验。*$a_R$为负——向内——尽管臂正在伸出，原因是向心项$R \omega^2 = 11.2\ \mathrm{m / s^2}$恰好超出向外的$\ddot{R} = 0$；而末端执行器的路径却仍然在变长，原因是速度与加速度彼此独立；而在此转速下一个放在无摩擦伸缩导轨上的载荷会自己向内滑，原因是没有东西提供那$11.2\ \mathrm{m / s^2}$。
:::
:::

::: widget plot
f: 2*(4*x)*(0.4)
x: 0.2, 1.2
y: 0, 4
caption: 一根以$0.4$米每秒伸出、同时以$4x$弧度每秒转动的伸缩臂的科里奥利加速度$2 \omega \dot R$，横轴为伸出量$x$，以米计。**曲线是平的，这正是要点：科里奥利项不在乎臂伸出多远，只在乎它伸得多快、转得多快。** **在完全缩回的$0.2$米处它仍有$1.6$米每二次方秒，超过该处横向加速度的一半**；而伸缩臂装卸机在吊臂伸出时最难操纵，原因不是科里奥利项而是$R\alpha$项——它线性增长，并在$R = 2\omega\dot R/\alpha = 0.8$米处超过前者。
:::

## 加速度的代价：惯性载荷、振动力与平衡

::: definition 惯性载荷与等效惯量 {#def-inertia}
**每个构件都是一个运动已知的刚体，所以它的惯性载荷是已知的：**

$$
\vec{F}_i = - m_i \vec{a}_{G_i}, \qquad T_i = - I_{G_i} \alpha_i
$$

**而两者合起来就是作用在单一点——撞击中心——上的单个力，作用点距离为**

$$
\overline{G Q} = \frac{I_G}{m \overline{G P}} \qquad \left( \text{从} G \text{量起，在加速度中心} P \text{的另一侧} \right)
$$

**振动力**是所有惯性力的矢量和，**振动力偶**是它们对任一点的矩之和：

$$
\vec{F}_{\mathrm{shake}} = - \sum_i m_i \vec{a}_{G_i} = - M_{\mathrm{tot}} \vec{a}_{G,\mathrm{tot}}, \qquad
T_{\mathrm{shake}} = - \sum_i \left( \vec{r}_{G_i} \times m_i \vec{a}_{G_i} + I_{G_i} \alpha_i \right)
$$

**中间那个表达式一行写尽了整个平衡理论：** **振动力是总质量乘以机构总质心的加速度，所以它对所有时间都为零，当且仅当总质心不动。** **使振动力可实现、振动力偶却基本不可能实现的数字是：单个配重就能使质心保持不动，但要同时使质心不动又使振动力偶为零，机构的质分布必须满足两个独立条件；而四杆机构只能在一个规定位置同时满足两者的原因，正是关于一个连杆机构能拥有多少个精确点的切比雪夫（Chebyshev）定理。**

**折算到输入端的等效惯量**是电机看到的东西：

$$
\boxed{ I_{\mathrm{eq}} \left( \theta \right) = \sum_i m_i \left( \frac{v_{G_i}}{\omega_{\mathrm{in}}} \right)^2 + \sum_i I_{G_i} \left( \frac{\omega_i}{\omega_{\mathrm{in}}} \right)^2 } , \qquad
T_{\mathrm{in}} = I_{\mathrm{eq}} \, \alpha_{\mathrm{in}} + \frac{1}{2} \frac{d I_{\mathrm{eq}}}{d \theta} \, \omega_{\mathrm{in}}^2
$$

**而第二项即使在输入转速完全恒定时也存在，这就是机构的驱动转矩不与输出转矩成正比的原因。** **使这成为定尺寸环节的数字是：对上述四杆机构，$I_{\mathrm{eq}}$在一转之内从$0.62$变到$1.31\ \mathrm{kg \cdot m^2}$，所以即使曲柄严格匀速运转，$\tfrac{1}{2} d I_{\mathrm{eq}} / d \theta \times \omega^2$在$\omega_2 = 10\ \mathrm{rad / s}$下也达到$19\ \mathrm{N \cdot m}$**——而按稳态转矩选伺服的设计者之所以看到它报跟随误差故障，原因是报警阈值是按轮廓转矩设定的，而轮廓里没有这一项。
:::

::: example 曲柄滑块机构的振动力及其平衡 {#ex-shake}
一台压缩机曲柄滑块机构：$r = 60\ \mathrm{mm}$，$l = 240\ \mathrm{mm}$，$3{,}000\ \mathrm{rev / min}$，往复质量$2.0\ \mathrm{kg}$，曲柄销质量$1.5\ \mathrm{kg}$。求三个瞬时的振动力，并设计配重。
::: solution
**已知量：**$\omega = 314.16\ \mathrm{rad / s}$，$r \omega^2 = 0.060 \times 98{,}696 = 5{,}922\ \mathrm{m / s^2}$，$\lambda = 0.25$。
**活塞加速度**$a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$：
$$
\theta = 0: \; a = 5922 \times 1.25 = 7{,}403; \qquad
\theta = 90^\circ: \; a = 5922 \times \left( 0 - 0.25 \right) = - 1{,}480; \qquad
\theta = 180^\circ: \; a = 5922 \times \left( - 1 + 0.25 \right) = - 4{,}442\ \mathrm{m / s^2}
$$
**往复质量的惯性力**$F_S = - m_S a$：
$$
F_S = - 14{,}806, \qquad + 2{,}961, \qquad + 8{,}884\ \mathrm{N}
$$
**曲柄销的向心力**$F_A = m_A r \omega^2 = 1.5 \times 5922 = 8{,}883\ \mathrm{N}$，方向从$A$指向$O$，所以其分量为$F_A \left( - \cos \theta, - \sin \theta \right)$：
$$
\theta = 0: \; \left( - 8{,}883, 0 \right); \qquad \theta = 90^\circ: \; \left( 0, - 8{,}883 \right); \qquad \theta = 180^\circ: \; \left( 8{,}883, 0 \right)
$$
**总振动力：**
$$
\begin{array}{c c c c}
\theta & F_x \left( \mathrm{N} \right) & F_y \left( \mathrm{N} \right) & \left| F \right| \left( \mathrm{N} \right) \\
0^\circ & - 14{,}806 - 8{,}883 = - 23{,}689 & 0 & \mathbf{23{,}689} \\
90^\circ & 2{,}961 & - 8{,}883 & \mathbf{9{,}366} \\
180^\circ & 8{,}884 + 8{,}883 = 17{,}767 & 0 & \mathbf{17{,}767}
\end{array}
$$
**读法。** **力从不为零，其峰值为$23.7\ \mathrm{kN}$，而运动件总重只有$34\ \mathrm{N}$，并且它每转绕机架旋转一周。** **使压缩机机架成为铸件而不是焊接件的那个七百比一的比值，就是答案。**
**平衡。**在与曲柄销相对的方位配一个质量$m_c$，只要$m_c R_c = m_A r = 1.5 \times 0.060 = 0.090\ \mathrm{kg \cdot m}$，就能恰好抵消曲柄销的向心力。**它还能抵消往复力的一部分**，但只能抵消其一阶谐波部分，标准做法是再平衡往复质量的一个分数$c$：
$$
m_c R_c = \left( m_A + c \, m_S \right) r
$$
**于是残余力为**
$$
F_x = - m_S r \omega^2 \left[ \left( 1 - c \right) \cos \theta + \lambda \cos 2 \theta \right], \qquad
F_y = - c \, m_S r \omega^2 \sin \theta, \qquad m_S r \omega^2 = 11{,}844\ \mathrm{N}
$$
**而权衡——这就是设计决定的全部——是$c$把力从水平方向搬到了竖直方向：**
$$
\begin{array}{c c c c}
c & m_c R_c \left( \mathrm{kg \cdot m} \right) & F_{\max} \left( \mathrm{kN} \right) & \text{峰值出现处} \\
0 & 0.090 & 14.8 & \theta = 0 \text{，沿气缸轴线的一阶谐波全部} \\
0.3 & 0.126 & 11.3 & \theta = 0 \\
0.60 & 0.162 & \mathbf{7.7} & \theta = 0 \text{与} 90^\circ \text{同时} \\
1.0 & 0.210 & 12.2 & \theta = 90^\circ \text{，二阶谐波加引入的竖直分量}
\end{array}
$$
**$c = 1$不是最优，原因是完全平衡往复力会把二阶谐波力$m_S r \omega^2 \lambda \cos 2 \theta = 2{,}961\ \mathrm{N}$留下不管，还会引入机器原本没有的竖直力$c \, m_S r \omega^2 \sin \theta = 11{,}844 \sin \theta$。** **使$c \approx 0.60$成为标准答案的数字是：它正是两个候选峰值相等之处——$\left( 1 - c \right) + \lambda$对$\sqrt{ \lambda^2 + c^2 }$**——而需要比$7.7\ \mathrm{kN}$更平稳的机器的设计者之所以采用两根平衡轴，原因是两根反向旋转的配重能完全抵消一阶谐波、只留下二阶，代价是两根轴、四个轴承和一对齿轮。
**最优处的残余：**
$$
F_{\max} = 7.7\ \mathrm{kN}, \qquad \text{比完全平衡旋转质量的机器的} 14.8\ \mathrm{kN} \text{降低} 48\ \%
$$
**比完全不设配重的机器的$23.7\ \mathrm{kN}$降低$68\ \%$。** **配重之所以放在曲柄臂允许的最大半径处，原因是$m_c R_c$是定值，而配重自身对轴承载荷的贡献按$m_c$计，所以$R_c$加倍则$m_c$减半、主轴承载荷也减半。**
*合理性检验。*$90^\circ$处的振动力之所以小于$0^\circ$处——尽管曲柄销力并未改变——原因是往复分量与旋转分量在该处互相垂直、按平方和合成，而在$0^\circ$处它们共线直接相加；而只按$0^\circ$工况设计的机架之所以在一个方向过强、在四十度方向不足，原因是力的方向在旋转，不只是大小。
:::
:::

::: widget plot
f: 11.844*sqrt(pow(1.75*cos(x*pi/180)+0.25*cos(x*pi/90),2)+pow(0.75*sin(x*pi/180),2))
x: 0, 360
y: 8, 26
caption: 完全不设配重的压缩机曲柄滑块机构的振动力大小，以千牛计，横轴为曲柄转角。**曲线在上止点有一个$23.7$千牛的尖锐极大值，在九十度附近有一个宽而低的区域，而它在任何角度都不取零。** **峰值$23.7$、谷值$9.4$，比值$2.5$**；而曲线不关于九十度对称——与产生它的活塞加速度曲线不同——原因是曲柄销的向心力按平方和合成而不是共线相加，这使合力旋转并把谷底抹平。
:::

## 移动副、凸轮与随之而来的跃度

::: definition 跃度及其后果 {#def-jerk}
**再求导一次就得到跃度**；而在机构中，运动规律在哪里不连续，跃度就在哪里不连续，也就是说**每个凸轮、每个槽轮机构每循环两次**。

$$
j = \frac{d a}{d t}, \qquad
\Delta F = m \, j \, \Delta t, \qquad
\text{接触力} \propto m a + F_{\mathrm{spring}}
$$

$$
\begin{array}{l c c c l}
\text{凸轮规律} & k_v & k_a & k_j & \text{用途} \\
\text{等速} & 1.000 & 0 & \infty \text{（} 2 \text{点）} & \text{永不，除非在讨论中} \\
\text{抛物线} & 2.000 & 4.000 & \infty \text{（} 3 \text{点）} & \text{仅低速} \\
\text{简谐} & 1.571 & 4.935 & \infty \text{（} 2 \text{点）} & \text{中等凸轮的升程} \\
\text{摆线} & 2.000 & 6.283 & 39.5 & \text{反转，无停歇误差} \\
\text{3-4-5多项式} & 1.500 & 6.000 & 12.0 \text{（端部} \infty \text{）} & \text{通用折中} \\
\text{4-5-6-7多项式} & 2.188 & 7.513 & 52.5 & \text{高速凸轮，停歇到停歇} \\
\text{5-6-7-8-9多项式} & 2.461 & 9.372 & 78.8 & \text{由跃度而非加速度统治之处} \\
\text{改进正弦} & 1.761 & 5.189 & 33.5 & \text{良好的折中，八段}
\end{array}
$$

**在它们之间作出抉择的数字不是峰值加速度，而是哪个导数先不连续。**4-5-6-7多项式买到的跃度处处有限——$k_j = 52.5$，对比摆线的$39.5$和3-4-5在端部的无穷跳跃——代价是峰值加速度比摆线高$20\ \%$、峰值速度高$9\ \%$。**当从动件靠弹簧封闭且载荷轻时，这笔交易是划算的，因为那时是加速度使从动件飞离、跃度使它振铃；而当从动件很重、凸轮很慢时这笔交易是亏的，因为那时$20\ \%$的加速度代价所花掉的弹簧力，比跃度跳跃所花的疲劳代价更多。**三千转每分的凸轮按多项式轮廓加工、三百转每分的凸轮按摆线轮廓加工，原因是后者的无穷跃度会在机器自身动力学的一个控制周期内产生$m \Delta a$的力跳变，而在三千转每分时这种跳变每秒发生$167$次。

**接触力。**凸轮的从动件由弹簧压住，而凸轮必须传递的力是
$$
F = m a + F_s + k \left( s + s_0 \right) + \mu \left( \text{侧向推力各项} \right)
$$
**而凸轮在高速下会飞脱——失去接触——原因是$m a$按$\omega^2$增长，弹簧力却不随转速变化**，所以存在一个转速，超过它从动件就在负加速度最大处离开轮廓。**定义这个极限的数字是凸轮自己的无量纲参数$\bar{a} = m a_{\max} / \left( k s_0 \right)$：超过约$0.6$凸轮就会飞脱；而该参数与转速无关，原因是$m a_{\max}$和弹簧力都只随几何变化，不随速率变化。**
:::

::: example 凸轮飞脱 {#ex-float}
一个径向凸轮以摆线升程驱动$1.4\ \mathrm{kg}$的从动件，在$70^\circ$凸轮角内升$18\ \mathrm{mm}$，弹簧预紧力$120\ \mathrm{N}$，刚度$9\ \mathrm{N / mm}$。求从动件失去接触的转速。
::: solution
**峰值加速度**（摆线，$k_a = 6.28$）：
$$
a_{\max} = k_a \frac{h}{\beta^2} \omega^2 = 6.28 \times \frac{0.018}{1.219^2} \omega^2 = 0.0760\, \omega^2\ \mathrm{m / s^2}
$$
**加速度为负——从动件想要比弹簧拉得动更快地减速——发生在升程末端，那里弹簧力相对需求最小：**
$$
F_{\mathrm{spring}} = 120 + 9 \times 18 = 282\ \mathrm{N}
$$
**当从动件所需的力超过弹簧所能提供的时，就发生接触损失：**
$$
m a_{\max} = F_{\mathrm{spring}}
\qquad \Rightarrow \qquad
1.4 \times 0.0760 \times \omega^2 = 282
\qquad \Rightarrow \qquad \omega^2 = 2{,}653
$$
$$
\boxed{ \omega_{\mathrm{float}} = 51.5\ \mathrm{rad / s} = 492\ \mathrm{rev / min} }
$$
**取加速度安全系数为二的设计转速**——这是惯例，因为使从动件飞脱的是加速度，加速度取二的安全系数相当于转速取$\sqrt{2}$：
$$
\omega_{\mathrm{design}} = \frac{51.5}{\sqrt{2}} = 36.4\ \mathrm{rad / s} = \mathbf{348\ \mathrm{rev / min}}
$$
**使这个答案成为重新设计而不是速度限值的数字是：机器需要$900\ \mathrm{rev / min}$。** **三条出路，按应当尝试的顺序：**
$$
\begin{array}{l l l}
\text{1. 更硬的弹簧} & k \to 30\ \mathrm{N / mm} & \omega_{\mathrm{float}} \to 840\ \mathrm{rev / min} \text{，但接触应力上升、凸轮磨损} \\
\text{2. 更轻的从动件} & m \to 0.5\ \mathrm{kg} \text{，用滚动元件设计} & \omega_{\mathrm{float}} \to 820\ \mathrm{rev / min} \text{，代价是刚度} \\
\text{3. 更平缓的凸轮规律} & \text{改进正弦，} k_a = 5.19 \text{ 对 } 6.28 & \omega_{\mathrm{float}} \to 541\ \mathrm{rev / min} \text{，只提高百分之十} \\
\text{4. 更慢的凸轮、更多凸瓣} & \text{两个凸瓣，转速减半} & \omega_{\mathrm{float}} \text{不变，但机器达到其节拍}
\end{array}
$$
**读法。** **方案3几乎无用，而它总是第一个被提出的原因是它最便宜。** **凸轮的峰值加速度系数是运动规律的属性，最多只能移动百分之十左右——注意常被推荐用于高速的4-5-6-7多项式在这一特定判据上比摆线更差，$k_a = 7.51$对$6.28$；选它是为了有限的跃度，不是为了低加速度。**飞脱转速按$\sqrt{k s_0 / m}$变化，所以质量和弹簧才是起作用的杠杆。**使方案4成为正确答案的数字是：机器的要求是位移速率，不是单次升程：把$18\ \mathrm{mm}$拆成双凸瓣凸轮上的两次$9\ \mathrm{mm}$升程，升程减半，而由于$a_{\max} \propto h / \beta^2$且$\beta$按凸轮角不变，加速度减半，飞脱转速翻倍到$984\ \mathrm{rev / min}$——而这之所以带裕度地满足要求，原因是从动件质量分毫未动。**
*合理性检验。*$\omega_{\mathrm{float}}$之所以按弹簧力的平方根变化，原因是需求是$m a \propto \omega^2$而供给是常数；而文献中凸轮的最高转速之所以以"气门飞脱限值"的名义给出、各家公布值之间散布达两倍，原因是接触损失是渐进的而非突然的：从动件在升程中某一点开始离开轮廓，远早于它在每一点都离开。
:::
:::

::: quiz
一个滑块沿一个以$\omega$转动的构件以相对速度$v_{\mathrm{rel}}$滑动。科里奥利加速度$2 \omega v_{\mathrm{rel}}$出现在加速度方程中：

- [ ] 对同一刚体上的任意两点，无论其间的运动副是什么
- [x] 只在从一个本身转动的参考系观察移动副时；它垂直于滑动方向、沿$\omega$的转向转过$90^{ \circ }$，并在滑动反向时变号
- [ ] 只在$\omega$恒定时，因为变化的$\omega$已由切向项承担
- [ ] 只在空间机构中，因为额外的转动使各轴耦合

::: solution
**只在转动构件上的移动副处。**该项来自对$\boldsymbol{\omega} \times \mathbf{r}$求导两次，为$2 \boldsymbol{\omega} \times \mathbf{v}_{\mathrm{rel}}$，所以任一因子为零它就消失：转动副的$v_{\mathrm{rel}} = 0$，不转动导轨上的滑块的$\omega = 0$。**它的实际重要性与其大小完全不成比例。**它就是刨床滑枕——滑块块在一个转动的槽形构件上滑动——的轴承长度要按$2 \omega v_{\mathrm{rel}}$而不是按直接加速度确定的原因：科里奥利分量是导轨上的侧向载荷，且每转反向两次，所以短滑块块会摇晃，而机床在$v_{\mathrm{rel}}$最大的行程两端表面质量退化。它就是急回机构的槽形构件销即使滑枕平均加速度为零仍按疲劳设计的原因。而它之所以必须在加速度多边形中始终计入，原因是它不是修正项：丢掉它不会让答案稍微出错，而会让多边形根本不闭合。
:::
:::

::: history
**科里奥利（Coriolis）1835年在一篇关于物体系相对运动的论文中提出了他的项，十年之内就被朗肯（Rankine）采纳进工程力学，而朗肯需要它是为了当时正在刨床上出现的摇杆机构。** **加速度多边形见于威利斯（Willis）1841年的《机构原理》（*Principles of Mechanism*）和朗肯1858年的《应用力学》（*Applied Mechanics*），而加速度影像——多边形中的相似形——是勒洛（Reuleaux）的贡献。** **加速度瞬心与拐点圆归功于德拉瓦莱-普桑（de la Vallée Poussin），通常记在雷斯姆（Bresme）名下，他1885年的论文给出了法向加速度为零之点所在的圆；兰格（Langer）点——加速度为零的连杆点——于1865年被认定，此后一直是个奇闻，直到1950年代对精确运动联轴器的需求使它成为设计工具。** **连杆机构完全力平衡的理论——配重条件，以及力与力偶在一个完整循环内不可能同时平衡——是赫利泽（Chelidze）与季缅特贝格（Dimentberg）1950年代的工作，而没有任何四杆机构能在多于有限一组的位置上完全平衡的证明是谢尔曼（Sherman）1960年给出的。** **4-5-6-7凸轮规律是1960年代数值计算的产物；双摆线与改进正弦规律更早，而本讲义列表中的系数出自1958年赫罗瓦特与杜兰（Hrovat and Durein）的目录，它至今仍是大多数凸轮磨削软件所用的来源。**
:::

## 后续内容

这里算出的惯性力成为[[mechanisms/machine-dynamics]]的轴承载荷和决定电机尺寸的转矩；振动力及其平衡是[[vibrations]]隔振章节的主题，也是压力机基础是一整块混凝土的原因；等效惯量是[[control-systems]]伺服回路必须扰对象；接触力决定轴承寿命；而跃度是[[mechanisms/cams]]按多项式加工、[[mechanisms/gears]]要磨齿的原因。

::: summary
- 再求导一次，同一个系数矩阵：角速度保持有限之处，角加速度按$1/\sin\mu$发散。
- $\vec a_B = \vec a_A + \vec\alpha\times\vec r - \omega^2\vec r$；法向项从$B$指向$A$，并因按$\omega^2$增长而在高速下占主导。
- 科里奥利项$2\omega v_{\mathrm{rel}}$只出现在转动构件的移动副处，可以超过其他一切横向项，并随滑动反向而变号。
- 加速度多边形内含转过$\gamma = \arctan(\alpha/\omega^2)$的连杆影像，该角对构件上每一点都相同。
- 刚体有一个加速度为零的点；把工具放在那里，就得到一个携带工具而不使其加速的机构。
- 振动力是总质量乘以机构总质心的加速度；配重可以使其为零，而同时消掉振动力偶一般不可能。
- 驱动看到的是沿循环变化的等效惯量，而$\tfrac12 (dI_{\mathrm{eq}}/d\theta)\omega^2$在匀速下也是真实的转矩。
- 凸轮飞脱由$ma_{\max}$对弹簧力决定，按$\sqrt{k/m}$变化，换运动规律治不了。
:::

## 习题

::: exercise 法向加速度 {level=1 check="987"}
一根$100$毫米的曲柄以$3{,}000$转每分匀速转动。给出曲柄销的加速度，以米每二次方秒计。
::: solution
$r\omega^2 = 0.1\times(314.16)^2 = 987$ m/s$^2$，方向向内。
:::
:::

::: exercise 四杆机构的alpha三 {level=1 check="60.1"}
对算例中的四杆机构，给出连杆的角加速度，以弧度每二次方秒计。
::: solution
$\alpha_3 = 60.1$ rad/s$^2$。
:::
:::

::: exercise 四杆机构的alpha四 {level=1 check="90.9"}
对同一四杆机构，给出摇杆的角加速度，以弧度每二次方秒计。
::: solution
$\alpha_4 = 90.9$ rad/s$^2$。
:::
:::

::: exercise 连杆质心 {level=1 check="57.3"}
对同一四杆机构，给出连杆质心加速度的大小，以米每二次方秒计。
::: solution
$\left|\vec a_G\right| = \sqrt{57.28^2 + 1.15^2} = 57.3$ m/s$^2$。
:::
:::

::: exercise 活塞加速度 {level=1 check="1234"}
对$100$–$400$毫米曲柄滑块机构在$300$转每分时，给出上止点处的活塞加速度，以米每二次方秒计。
::: solution
$r\omega^2(1+\lambda) = 986.96\times1.25 = 1234$ m/s$^2$。
:::
:::

::: exercise 科里奥利加速度 {level=1 check="3.2"}
对算例中的伸缩臂，给出$t=1$秒时的科里奥利加速度，以米每二次方秒计。
::: solution
$2\omega\dot R = 2\times4.0\times0.40 = 3.2$ m/s$^2$。
:::
:::

::: exercise 影像角 {level=1 check="83.0"}
对算例中的四杆机构，给出连杆加速度影像转过的角度，以度计。
::: solution
$\gamma=\arctan(\alpha_3/\omega_3^2)=\arctan(60.1/7.42)=83.0^\circ$。
:::
:::

::: exercise 凸轮飞脱 {level=1 check="492"}
对算例中的凸轮，给出从动件的飞脱转速，以转每分计。
::: solution
$1.4\times0.0760\times\omega^2 = 282$；$\omega = 51.5$ rad/s $=492$ rev/min。
:::
:::

::: exercise 振动力 {level=2}
对压缩机曲柄滑块机构，给出九十度处的振动力，并解释它为什么小于上止点处。
::: solution
$$
F_x = - m_S r \omega^2 \lambda = + 2{,}961\ \mathrm{N}, \qquad F_y = - m_A r \omega^2 = - 8{,}883\ \mathrm{N}
\qquad \Rightarrow \qquad \left| F \right| = 9{,}366\ \mathrm{N}
$$
**它更小，原因是两个分量在该处互相垂直、按平方和合成，而在上止点处它们共线直接相加。** **使这成为设计问题的数字是：力矢量的方向在整个循环中旋转，其大小却变化$2.5$倍，所以机架必须按力矢量端点的包络而不是按最大大小来定尺寸**——而只按$0^\circ$工况布置的螺栓组之所以在$35^\circ$处失效，原因是力对螺栓组中心的力臂在力不是最大的地方反而最大。
:::
:::

::: exercise 平衡分数 {level=2}
对压缩机曲柄滑块机构，给出完全平衡往复质量时的配重矩$m_c R_c$，并说明它留下了什么未平衡。
::: solution
$$
m_c R_c = \left( m_A + m_S \right) r = 3.5 \times 0.060 = 0.210\ \mathrm{kg \cdot m}
$$
**它把全部二阶谐波往复力留下未平衡，**$m_S r \omega^2 \lambda \cos 2 \theta = 2.0 \times 5922 \times 0.25 = 2{,}961\ \mathrm{N}$**峰值**，**并引入了一个**$\left( m_A + m_S \right) r \omega^2 \sin \theta = 20{,}687 \sin \theta\ \mathrm{N}$**的竖直力，这是未平衡的机器所没有的。** **峰值振动力之所以只从$23.7$降到$11.8\ \mathrm{kN}$而不是降到零，原因是二阶谐波与引入的竖直分量合起来构成了残余**；而必须做得更好的设计者之所以采用两根反向旋转的平衡轴，原因是它们抵消一阶谐波而根本不引入旋转矢量。
:::
:::

::: exercise 推导 {level=3}
对曲柄滑块回路求导两次得到活塞加速度，并证明二项式$a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$是精确结果对$\lambda$的一阶展开。在$\lambda = 0.3$处估计误差。
::: solution
**回路。**$x = r \cos \theta + l \cos \phi$，$\sin \phi = \lambda \sin \theta$。
**一阶导数**（见[[mechanisms/velocity-analysis]]）：
$$
v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right]
$$
**二阶导数。**求导并按$\lambda$整理到一阶：
$$
a = \frac{d v}{d t} = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + O \left( \lambda^2 \right) \right]
$$
**精确的二阶导数是**
$$
a = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + \frac{\lambda^2 \sin^2 \theta \cos 2 \theta}{4 \left( 1 - \lambda^2 \sin^2 \theta \right)^{3 / 2}} + \frac{\lambda^3 \sin^3 \theta \cos \theta}{4 \left( 1 - \lambda^2 \sin^2 \theta \right)^{5 / 2}}  \right]
$$
**第三项是领头误差。** **在$\lambda = 0.3$处其极大值出现在$\theta = 90^\circ$附近：**
$$
\left| \epsilon \right|_{\max} = \frac{\lambda^2}{4 \left( 1 - \lambda^2 \right)^{3 / 2}} = \frac{0.09}{4 \times 0.8240} = 0.0273
\qquad \Rightarrow \qquad \frac{\epsilon}{r \omega^2} = 2.7\ \%
$$
**相对于上止点处的$r \omega^2 \left( 1 + \lambda \right) = 1.3\, r \omega^2$，峰值加速度的相对误差为**
$$
\frac{0.0273}{1.3} = 2.1\ \%
$$
**使二项式可以接受的数字是：$2.1\ \%$小于往复质量本身的容差——后者很少有优于百分之三的把握。** **它在$\lambda = 0.5$处不可接受，原因是误差按$\lambda^2$增长、达到$9\ \%$；而长行程发动机之所以要数值分析，原因是它们的$\lambda$为$0.35$到$0.45$。**
*合理性检验。*误差项在上止点和下止点消失，原因是那里$\sin \theta = 0$；而二项式仍然被用于峰值——峰值就在上止点——的原因是误差恰好在载荷最大处为零，这是最好的巧合，也是这个公式在一个世纪更精确的算术面前存活下来的原因。
:::
:::

::: exercise 设计 {level=3}
设计一台**旋转式模切机的连杆机构与驱动**：切头必须在行程底部、输入轴转角的$40^\circ$内停歇，以每分钟$45$次冲程在$250$毫米周长、$0.3$毫米厚的纸板上以$18\ \mathrm{kN}$冲切$2\ \mathrm{mm}$，切头质量$28\ \mathrm{kg}$，机床机架可容忍$4\ \mathrm{kN}$的振动力，每个循环的冲切位置必须重复在$\pm 0.1\ \mathrm{mm}$以内，且驱动不得需要离合-制动器。给出拓扑、运动规律、尺寸计算、平衡、失效模式与验收试验。
::: solution
**工作循环。**每分钟$45$次冲程即$1.333\ \mathrm{s}$一个循环。**冲切：**抗剪强度$\tau = 90\ \mathrm{MPa}$、厚$0.3\ \mathrm{mm}$、周长$250\ \mathrm{mm}$的纸板：
$$
F_{\mathrm{cut}} = \tau t L = 90 \times 10^6 \times 0.0003 \times 0.250 = 6{,}750\ \mathrm{N}
$$
**所以规定的$18\ \mathrm{kN}$是理论剪切载荷的$2.7$倍，这是对钝刀和不均匀冲切的常规裕量；设计载荷取$18\ \mathrm{kN}$，能量为**
$$
E = \tfrac{1}{2} F d = \tfrac{1}{2} \times 18{,}000 \times 0.002 = 18\ \mathrm{J} \text{ 每次冲程}
$$
**拓扑。**要求是底部停歇，这是一个**停歇-停歇-升程-停歇**凸轮工况，或一个**带连杆点停歇的六杆机构**。
$$
\begin{array}{l l c l}
\text{A. 凸轮与滚子从动件} & \text{精确停歇、精确规律} & 28\ \mathrm{kg} \text{的从动件太重} & \text{否决：飞脱} \\
\text{B. 曲柄滑块} & \text{无停歇} & \text{—} & \text{否决} \\
\text{C. 拖杆六杆机构} & \text{按设计停歇} & \text{连杆点} & \text{候选} \\
\text{D. 肘节增力机构} & \text{肘节处近似停歇} & 18\ \mathrm{kN} \text{来自小执行器} & \text{候选} \\
\text{E. 伺服与行星滚柱丝杠} & \text{任意规律} & 28\ \mathrm{kg} \text{装在螺母上} & \text{候选}
\end{array}
$$
**选择是E，而理由是$\pm 0.1\ \mathrm{mm}$的冲切位置要求，不是停歇。**拖杆六杆机构的停歇是**连杆路径的驻点**，而切头必须由第二套连杆沿直线驱动；两套连杆在冲切处的累积角度误差为
$$
\delta = \frac{\partial s}{\partial \theta} \delta \theta + \sum \frac{\partial s}{\partial l_i} \delta l_i
$$
**停歇处$\partial s / \partial \theta = 0$使第一项消失——这正是采用拖杆的原因——但$\partial s / \partial l_i$不是零，而$250$毫米四杆机构里$0.05\ \mathrm{mm}$的销磨损会把冲切位置移动$0.05 \times \left( 300 / 120 \right) = 0.125\ \mathrm{mm}$。** **连杆机构之所以无法在一万小时里保持$\pm 0.1\ \mathrm{mm}$，原因是它的精度是其运动副间隙的函数，而运动副间隙是磨损的函数。** **滚柱丝杠伺服靠丝杠自身的刚度保持位置；它之所以贵四倍仍被选中，原因是它的精度是丝杠导程精度的函数，而导程精度不会变。**
**运动规律。**行程$60\ \mathrm{mm}$：升$30^\circ$凸轮角，顶部停歇$40^\circ$，回程$30^\circ$，底部停歇$260^\circ$——**但冲切发生在下行途中，所以规律是：快速趋近、受控冲切、快速退回。**折算到$1.333\ \mathrm{s}$的循环：
$$
\begin{array}{l c c c}
\text{阶段} & \text{角度} & \text{时间} \left( \mathrm{s} \right) & \text{运动} \\
\text{趋近} & 90^\circ & 0.333 & 50\ \mathrm{mm} \text{，改进正弦} \\
\text{冲切} & 30^\circ & 0.111 & 2\ \mathrm{mm} \text{，匀速} \\
\text{停歇} & 40^\circ & 0.148 & 0 \\
\text{退回} & 60^\circ & 0.222 & 52\ \mathrm{mm} \text{，改进正弦} \\
\text{停歇} & 140^\circ & 0.519 & 0
\end{array}
$$
**冲切速度：**$v_{\mathrm{cut}} = 0.002 / 0.111 = 0.018\ \mathrm{m / s}$。**规定恒定的冲切速度而不是恒定的加速度，原因是纤维材料的冲切力取决于速率，而变化的速度给出变化的力和变化的毛刺。**
**加速度。**趋近：$0.333\ \mathrm{s}$内$50\ \mathrm{mm}$，改进正弦，$k_a = 5.19$：
$$
a_{\max} = 5.19 \times \frac{0.050}{0.333^2} = 2.34\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F_{\mathrm{inertia}} = 28 \times 2.34 = 66\ \mathrm{N}
$$
**退回：$0.222\ \mathrm{s}$内$52\ \mathrm{mm}$：**
$$
a_{\max} = 5.19 \times \frac{0.052}{0.222^2} = 5.48\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 28 \times 5.48 = 153\ \mathrm{N}
$$
**读法。** **惯性力$153\ \mathrm{N}$，对比冲切力$18{,}000\ \mathrm{N}$——不到百分之一。** **使这台机器的动力学无关紧要的数字是每分钟$45$次的低冲程率；一台每分钟$600$冲程的压力机之所以是另一台完全不同的机器，原因是惯性力按速率的平方增长，届时将大$27$倍、达$4.2\ \mathrm{kN}$，与振动力容差相当。**
**尺寸计算。**峰值力$18{,}000 + 153 + 28 \times 9.81 = 18{,}430\ \mathrm{N}$。**直径$32\ \mathrm{mm}$、导程$10\ \mathrm{mm}$、$\eta = 0.90$的行星滚柱丝杠：**
$$
T_{\mathrm{peak}} = \frac{F p}{2 \pi \eta} = \frac{18{,}430 \times 0.010}{2 \pi \times 0.90} = 32.6\ \mathrm{N \cdot m}
$$
**循环内的均方根转矩。**力只在$0.111\ \mathrm{s}$的冲切期间存在，所以
$$
T_{\mathrm{RMS}} = \sqrt{\frac{1}{1.333} \left[ 32.6^2 \times 0.111 + 3^2 \times 0.555 + 0 \times 0.667 \right]} = \sqrt{\frac{118.3 + 5.0}{1.333}} = 9.6\ \mathrm{N \cdot m}
$$
**一台$3{,}000\ \mathrm{rev / min}$的$1.5\ \mathrm{kW}$伺服给出额定$4.77\ \mathrm{N \cdot m}$、峰值$14.3\ \mathrm{N \cdot m}$。** **在$3{,}000\ \mathrm{rev / min}$、导程$10\ \mathrm{mm}$下的速度是$3.0\ \mathrm{m / min} = 0.050\ \mathrm{m / s}$，而退回峰值速度为$2 \times 0.052 / 0.222 = 0.469\ \mathrm{m / s}$——差九倍。** **迫使设计打开局面的数字是速度，不是转矩。** **$3{:}1$带传动把丝杠提到$9{,}000\ \mathrm{rev / min}$，超过了$32\ \mathrm{mm}$丝杠的$d n$限值；答案是导程$20\ \mathrm{mm}$的丝杠，此时转矩翻倍为峰值$65\ \mathrm{N \cdot m}$、均方根$19.2\ \mathrm{N \cdot m}$。**
$$
\boxed{ \text{一台 } 3{,}000\ \mathrm{rev / min} \text{ 的 } 2.2\ \mathrm{kW} \text{ 伺服 } \left( 7.0\ \mathrm{N \cdot m} \text{ 额定， } 21\ \mathrm{N \cdot m} \text{ 峰值} \right) \text{ 经 } 1{:}3.5 \text{ 行星减速} \to 24.5\ \mathrm{N \cdot m} \text{ 额定， } 73.5\ \mathrm{N \cdot m} \text{ 峰值} }
$$
**对比所需的$19.2$和$65$；以及一根$32\ \mathrm{mm}$、导程$20\ \mathrm{mm}$、以$8{,}570\ \mathrm{rev / min}$运转的丝杠——带$1.3$安全系数后仍低于其$12{,}000$的$d n$限值。**
**振动力。**切头竖直运动；机架承受$m a$加冲切反力。**冲切力本身在模座上闭合——上模、板料、下模、模座，再回到上模——根本不表现为振动力。** **机架感受到的是切头与螺母的惯性，$153\ \mathrm{N}$，加上旋转零件的残余不平衡，加上冲切开始瞬间激起的瞬态。**
**瞬态才是需要分析的那一项。**剪切应力在纸板让开的瞬间崩溃，而储存在机架弹性中的能量——在$18\ \mathrm{kN}$、机架刚度$900\ \mathrm{kN / mm}$下，弹性压缩$0.020\ \mathrm{mm}$、$180\ \mathrm{J}$——在约一毫秒内释放。
**用能量平衡估计由此产生的冲击毫无价值，而说明为什么的算术值得做一次：**
$$
v = \sqrt{\frac{2 E}{M}} = \sqrt{\frac{2 \times 180}{800}} = 0.67\ \mathrm{m / s}, \qquad
a = v \omega_n = 0.67 \times 754 = 505\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 800 \times 505 = 404\ \mathrm{kN}
$$
**这荒谬得离谱，而荒谬本身就是信号：这个估计假定全部储存能量进入一个无阻尼刚体的单一振型。**  **诚实的设计声明是：冲击必须靠构造而不是靠计算来处理：预紧的刀架、使一阶固有频率高于$400\ \mathrm{Hz}$的足够刚的模座——使冲击能量分散到许多振型上——以及调试时的一次实测。** **使$4\ \mathrm{kN}$容差可以满足的数字是：一个接合良好的铸造机架传递这种量级的冲击时只有静力的百分之二到五——$360$到$900\ \mathrm{N}$**——而验收试验之所以先空刀运行、再带载冲切，原因是两者之差就是冲击，而它是报告上唯一算不出来的数字。
**失效模式。**
$$
\begin{array}{l l}
\text{丝杠在冲切中失稳} & 18.4\ \mathrm{kN} \text{，对比} 2.4\ \mathrm{m} \text{无支撑} 32\ \mathrm{mm} \text{丝杠} 96\ \mathrm{kN} \text{的欧拉载荷，安全系数} 5.2 \\
\text{伺服在冲切中丢失位置} & 18\ \mathrm{kN} \text{下、回路刚度} 19.2\ \mathrm{N \cdot m / rad} \text{的跟随误差} = 0.02\ \mathrm{mm} \\
\text{冲切时间隙换向} & \text{每个循环从间隙的同一侧吃刀；预紧螺母} \\
\text{丝杠热伸长} & 1.2\ \mu\mathrm{m / m \cdot K} \times 1.2\ \mathrm{m} \times 8\ \mathrm{K} = 11.5\ \mu\mathrm{m} \text{，在} 100\ \mu\mathrm{m} \text{之内} \\
\text{停歇时刀具撞击} & 40^\circ \text{停歇使切口保持张开；退回只在剪切回弹之后才开始} \\
\text{断电时切头下坠} & 28\ \mathrm{kg} \text{压在效率} 90\ \% \text{的丝杠上不自锁；必须装轴制动器}
\end{array}
$$
**验收试验。**
$$
\begin{array}{l l}
\text{冲切位置} & 1{,}000 \text{次连续冲程，用} 0.001\ \mathrm{mm} \text{量规对刀测量；} 3\sigma \le \pm 0.05\ \mathrm{mm} \text{，为磨损留裕度} \\
\text{停歇} & \text{按编码器测量；} 40^\circ \text{停歇内切头移动不得超过} 0.02\ \mathrm{mm} \\
\text{振动力} & \text{机架上三个加速度计；空刀时峰值动载荷低于} 4\ \mathrm{kN} \\
\text{转矩} & \text{丝杠上装转矩传感器；记录的转矩曲线留作状态基准} \\
\text{冲切质量} & 10^4 \text{次冲程后重新测量位置，并按} 0.05\ \mathrm{mm} \text{基准检查毛刺高度} \\
\text{断电} & \text{在行程顶部切断电源；切头下落不得超过} 0.05\ \mathrm{mm}
\end{array}
$$
**保护买方的四个条款。**"冲切位置重复精度必须在一千次连续冲程上、用磨损的刀具测量，并以三倍标准差报告。""每个冲程的切削必须从间隙的同一侧驱动丝杠，且螺母的预紧必须可验证。""在驱动断电、处于行程任一点时，机床必须把切头保持在零点零零五毫米以内。""驱动转矩曲线必须在调试时记录并每月取趋势，峰值增大应被视为刀具磨损或润滑失效的征兆。"
*设计评注。*一般规律是**压力机先按能量和刚度设计、然后才按力设计，而一台必须保持位置的压力机要按结构而不是按机构设计**——而这个设计之所以抛弃连杆机构，原因是连杆机构的精度是会磨损的几何属性，而丝杠的精度是会磨损的制造属性，但它磨损的方向是设计者能测量、能补偿的。
:::
:::
