位置分析告诉你零件在哪里。速度分析告诉你**机器此刻在做什么**，而速度决定了电机的功率、轴承的$PV$值、每个滑动接触处的摩擦和磨损，以及——再求一次导数之后——惯性力。这里也是本学科变得直观的地方：平面机构的速度既可以计算，也可以**画出来**，而作图往往比代数更清楚地说明机构为什么如此运动。

关键概念是**瞬心**：在每一瞬间，平面机构中的每个构件都相对任何其他构件绕某一点转动，其上每一点的速度都垂直于该点与这个中心的连线。找到中心，构件的整个速度场就按比例得出。**阿龙霍尔德–肯尼迪定理**告诉你用画直线的办法求出这些中心；它由阿龙霍尔德（Aronhold）于1872年发表，并由肯尼迪（Kennedy）于1886年独立提出，它把大部分求导工作变成了直尺作图。

::: warning 五个能通过计算检查的速度分析错误
**在错误的回路上求导。**速度是位置的导数，而四杆机构的位置有两个解。用交叉式回路的角度算出的速度，对交叉式连杆机构是对的，对图纸上的那个机构则是错的——一般大小不对，方向也常常相反。务必代入你所分析的那个回路的角度。

**问“连杆的速度”。**一个构件只有**一个**角速度，但每一点的线速度都不同。连杆的铰链$A$、铰链$B$、质心和连杆点在同一瞬间的运动各不相同，所以问题必须指明是哪一点——两个构件共享一点时，还必须指明是**哪个构件上的**点。

**跨越运动副使用$v = \omega r$。**$v = \omega r$只在**同一个**刚体**内部**成立，$r$从该刚体的瞬心量起。在曲柄上$v_A = a \omega_2$，因为$O_2$是曲柄的转动中心；在连杆上，$b \omega_3$是$B$**相对于**$A$的速度大小，而不是$A$或$B$的速度。写出$a \omega_2 = b \omega_3$是概念错误，会得到错误的$\omega_3$。

**忘记移动副对瞬心的影响。**滑块相对导路的速度沿导路方向，所以滑块与导路的瞬心**在垂直于滑动方向的无穷远处**。在三心定理作图中，“过”这个瞬心的直线画成过另一个已知瞬心、垂直于导路的直线。在固定导路上的滑块角速度为零，所以其上每一点速度相同。

**设计需要峰值时却报出平均值。**机构的平均速比就是它的位移比，但工艺受峰值限制。四槽槽轮分度期间的峰值角速度是其平均值的$2.41$倍，八槽槽轮是$1.86$倍；按平均分度速度标定的机器仍可能在峰值时把工件甩出转台。
:::

## 两种方法，一个答案

::: definition 对回路求导 {#def-differentiate}
**把回路闭合方程对时间求导。**令$\omega_k = d \theta_k / dt$，四杆回路$a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$给出

$$
\boxed{ a \omega_2 i e^{i \theta_2} + b \omega_3 i e^{i \theta_3} = c \omega_4 i e^{i \theta_4} }
$$

**这是关于两个未知量**$\omega_3$和$\omega_4$**的两个实数方程，在已经求出的位置上计算。**展开为：

$$
\begin{aligned}
- a \omega_2 \sin \theta_2 - b \omega_3 \sin \theta_3 + c \omega_4 \sin \theta_4 &= 0 \\
a \omega_2 \cos \theta_2 + b \omega_3 \cos \theta_3 - c \omega_4 \cos \theta_4 &= 0
\end{aligned}
\qquad
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \omega_3 \\ \omega_4 \end{pmatrix} =
\begin{pmatrix} a \omega_2 \sin \theta_2 \\ - a \omega_2 \cos \theta_2 \end{pmatrix}
$$

**与位置方程不同，这些方程是线性的**——速度分析从来不需要选根。

**矩阵的行列式与传动角相联系。**展开：

$$
\det = b c \sin \theta_3 \cos \theta_4 - b c \cos \theta_3 \sin \theta_4 = b c \sin \left( \theta_3 - \theta_4 \right), \qquad \left| \det \right| = b c \sin \mu
$$

因为连杆与摇杆之间的夹角为$\mu$（或$180^\circ - \mu$）。**方程组恰好在$\sin \mu = 0$处奇异**：[[mechanisms/mechanisms-mobility]]中的传动角、[[mechanisms/position-analysis]]中为零的雅可比行列式和位置二次方程的重根是同一个条件。对于给定的输出力矩，连杆力——以及随之而来的输入力矩和铰链载荷——大致按$1 / \sin \mu$增大：$\mu = 20^\circ$时约为最佳值的$2.9$倍，$\mu = 5^\circ$时为$11.5$倍。
:::

::: definition 瞬心 {#def-centres}
::: theorem 阿龙霍尔德–肯尼迪定理 {#thm-kennedy2}
**在平面内相互运动的三个物体有三个瞬心，且三者共线。**
**证明。**设三个物体为$1$、$2$、$3$，以物体$1$为参考，$P_{12}$和$P_{13}$为物体$2$和$3$相对它的瞬心。物体$2$瞬时绕$P_{12}$转动，所以物体$2$上任一点$Q$相对物体$1$的速度垂直于$P_{12} Q$；同样，物体$3$上位于$Q$的点的速度垂直于$P_{13} Q$。按定义，瞬心$P_{23}$是物体$2$和$3$的重合点速度**相同**的点。若$Q$不在直线$P_{12} P_{13}$上，两条垂线指向不同方向，所以两个速度不可能相等，除非两者都为零——而这只在$P_{12}$与$P_{13}$重合时于这两点本身发生。因此$P_{23}$位于直线$P_{12} P_{13}$上。$\blacksquare$
:::

**作图规则，实际中需要的就是这些。**

$$
\begin{array}{l l}
\text{转动副} & \text{瞬心在销轴处} \\
\text{移动副} & \text{瞬心在垂直于滑动方向的无穷远处} \\
\text{纯滚动接触（无滑动）} & \text{瞬心在接触点} \\
\text{滚动兼滑动接触} & \text{瞬心在接触点的公法线上} \\
\text{齿轮啮合} & \text{瞬心在节点，位于连心线上} \\
\text{任意两个已知瞬心 } P_{ij}, P_{jk} & \text{第三个 } P_{ik} \text{ 在两者连线上（三心定理）}
\end{array}
$$

**角速度比定理。**对于都铰接在机架$1$上的构件$2$和$4$，

$$
\boxed{ \frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} }
$$

**沿通过$I_{12}$、$I_{14}$和$I_{24}$的直线量取，三心定理保证它是直线。**当$I_{24}$位于线段$I_{12} I_{14}$之外时比值为正（转向相同），位于两者之间时为负。这由$I_{24}$的定义得出：该点作为构件$2$上的点速度为$\omega_2 \cdot \overline{I_{12} I_{24}}$，作为构件$4$上的点速度为$\omega_4 \cdot \overline{I_{14} I_{24}}$。

**机械增益**由功率守恒得出：

$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4}, \qquad
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \eta \frac{v_{\mathrm{in}}}{v_{\mathrm{out}}}
$$

$\eta \le 1$为效率：**损失使输出变弱**，所以$\eta$乘在理想比上。
:::

::: example 四杆机构的速度，两种方法 {#ex-vel4}
四杆机构$a = 0.5$、$b = 1.2$、$c = 0.9$、$d = 1.1$米，$\theta_2 = 40^\circ$，$\omega_2 = 10\ \mathrm{rad / s}$逆时针。由位置解（开式回路）得$\theta_3 = 24.44^\circ$、$\theta_4 = 65.34^\circ$、$A = \left( 0.3830, 0.3214 \right)$、$B = \left( 1.4755, 0.8179 \right)$。求$\omega_3$、$\omega_4$、连杆点$P = \left( 0.848, 0.972 \right)$的速度以及力矩比。
::: solution
**方法1——求导。**
$$
v_A = a \omega_2 = 0.5 \times 10 = 5.00\ \mathrm{m / s}, \qquad
\vec{v}_A = 5.00 \left( - \sin 40^\circ, \cos 40^\circ \right) = \left( - 3.214,\; 3.830 \right)\ \mathrm{m / s}
$$
**两个标量方程：**
$$
- 3.214 - 1.2 \omega_3 \sin 24.44^\circ + 0.9 \omega_4 \sin 65.34^\circ = 0
\qquad \Rightarrow \qquad - 3.214 - 0.4965 \omega_3 + 0.8179 \omega_4 = 0
$$
$$
3.830 + 1.2 \omega_3 \cos 24.44^\circ - 0.9 \omega_4 \cos 65.34^\circ = 0
\qquad \Rightarrow \qquad 3.830 + 1.0924 \omega_3 - 0.3755 \omega_4 = 0
$$
**由第二式，**$\omega_4 = \left( 3.830 + 1.0924 \omega_3 \right) / 0.3755 = 10.200 + 2.9092 \omega_3$。**代入第一式：**
$$
- 3.214 - 0.4965 \omega_3 + 0.8179 \left( 10.200 + 2.9092 \omega_3 \right) = 0
\qquad \Rightarrow \qquad 5.129 + 1.8830 \omega_3 = 0
$$
$$
\boxed{ \omega_3 = - 2.724\ \mathrm{rad / s} \quad \left( \text{顺时针} \right) }, \qquad
\boxed{ \omega_4 = 10.200 - 7.925 = 2.276\ \mathrm{rad / s} \quad \left( \text{逆时针} \right) }
$$
**方法2——瞬心。**铰链瞬心为$I_{12} = O_2 = \left( 0, 0 \right)$、$I_{14} = O_4 = \left( 1.1, 0 \right)$、$I_{23} = A$、$I_{34} = B$。**给出$\omega_4$的是**$I_{24}$，它在两固定铰链的连线上，又在连杆线上——即$AB$与$x$轴的交点：
$$
AB \text{ 的斜率} = \frac{0.8179 - 0.3214}{1.4755 - 0.3830} = 0.4545
\qquad \Rightarrow \qquad x_{24} = 0.3830 - \frac{0.3214}{0.4545} = - 0.3241
$$
$$
\frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} = \frac{0.3241}{1.1 + 0.3241} = 0.2276
\qquad \Rightarrow \qquad \omega_4 = 0.2276 \times 10 = \mathbf{2.276\ \mathrm{rad / s}} \quad \checkmark
$$
**两种方法一致。**$I_{24}$位于$O_2 O_4$之外，所以摇杆与曲柄同向转动。
**$B$的速度：**
$$
v_B = c \left| \omega_4 \right| = 0.9 \times 2.276 = 2.048\ \mathrm{m / s}
$$
**其方向**垂直于$O_4 B$，指向$\omega_4$的转向。沿$O_4 B$的单位矢量为$\hat{u} = \left( 0.4172, 0.9088 \right)$，
$$
\vec{v}_B = c \omega_4 \left( - u_y, u_x \right) = 2.048 \left( - 0.9088,\; 0.4172 \right) = \left( - 1.861,\; 0.854 \right)\ \mathrm{m / s}
$$
**用相对速度检查。**沿$AB$的单位矢量为$\hat{e} = \left( 0.9104, 0.4138 \right)$：
$$
\vec{v}_{B / A} = b \omega_3 \left( - e_y, e_x \right) = 1.2 \left( - 2.724 \right) \left( - 0.4138,\; 0.9104 \right) = \left( 1.353,\; - 2.976 \right)
$$
$$
\vec{v}_B = \vec{v}_A + \vec{v}_{B / A} = \left( - 3.214 + 1.353,\; 3.830 - 2.976 \right) = \left( - 1.861,\; 0.854 \right) \quad \checkmark
$$
**用瞬心$I_{13}$求连杆点$P$的速度。**$I_{13}$在$O_2 A$上，也在$O_4 B$上：
$$
O_2 A \text{ 线}: y = 0.8391 x; \qquad O_4 B \text{ 线}: y = 2.1785 \left( x - 1.1 \right)
\qquad \Rightarrow \qquad I_{13} = \left( 1.789,\; 1.501 \right)
$$
连杆以$\omega_3$绕$I_{13}$转动。作为检查，$A$距它$\overline{A I_{13}} = 2.336 - 0.5 = 1.836\ \mathrm{m}$，而$\left| \omega_3 \right| \times 1.836 = 5.00\ \mathrm{m/s} = v_A$ ✓。对于$P$：
$$
\overline{P I_{13}} = \sqrt{\left( 1.789 - 0.848 \right)^2 + \left( 1.501 - 0.972 \right)^2} = 1.079\ \mathrm{m}
\qquad \Rightarrow \qquad v_P = \left| \omega_3 \right| \times 1.079 = 2.724 \times 1.079 = \mathbf{2.94\ \mathrm{m / s}}
$$
**用矢量相加检查：**$\vec{r}_{P / A} = \left( 0.465, 0.651 \right)$，所以
$$
\vec{v}_P = \vec{v}_A + \omega_3 \hat{z} \times \vec{r}_{P / A} = \left( - 3.214, 3.830 \right) + \left( - 2.724 \right) \left( - 0.651, 0.465 \right) = \left( - 1.441,\; 2.563 \right)
$$
$$
\left| \vec{v}_P \right| = \sqrt{2.077 + 6.569} = 2.94\ \mathrm{m / s} \quad \checkmark
$$
**力矩比。**
$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4} = \frac{1}{0.2276} = 4.39 \text{（理想）}, \qquad
T_4 = 0.90 \times 4.39 \, T_2 = 3.95 \, T_2 \text{（效率 } 90\ \% \text{）}
$$
**整个周期。**在其他曲柄转角重复计算，得到$\theta_2 = 0$时$\omega_4 / \omega_2 = - 0.833$（理想力矩比大小为$1.20$），$\theta_2 = 90^\circ$时为$0.563$（力矩比$1.78$）。力矩比在一转内变化很大，所以驱动装置必须按周期中最不利的瞬间来选，而不是按平均值。
*检验。*连杆的瞬心$I_{13}$距曲柄支点$2.34\ \mathrm{m}$——远在机构之外。这很正常：瞬心是平面上的点，而不是材料上的点，这里它只是说明连杆正绕一个远处的点缓慢转动。对$\vec{v}_B$和$\vec{v}_P$的两次独立检查证实了这些数值。
:::
:::

::: widget plot
f: 3.1416*(sin(x*pi/180)+0.25*sin(2*x*pi/180)/(2*sqrt(1-0.0625*pow(sin(x*pi/180),2))))
x: 0, 360
y: -3.4, 3.4
caption: $100$–$400$毫米曲柄滑块机构在每分钟$300$转时的活塞速度（米每秒，离开上止点为正）随曲柄转角（度）的变化。**这条曲线不是正弦波：其峰值$3.24$米每秒出现在$76.7^\circ$而不是$90^\circ$**，回程半周是去程半周的镜像只是因为机构是对心的。峰值比$r\omega = 3.14$米每秒高$3.1\ \%$，是$2.0$米每秒平均活塞速度的$1.62$倍。注意曲线在$90^\circ$处恰好经过$r\omega$，因为那里二次谐波项$\sin 2\theta$为零。
:::

## 瞬心线，以及为什么机构是一对滚动的形状

::: definition 瞬心线 {#def-centrodes}
**构件运动时，它相对机架的瞬心在固定平面上描出一条曲线，在运动构件上描出另一条曲线。**它们是**定瞬心线**和**动瞬心线**，平面运动学的一个基本定理指出：**动瞬心线在定瞬心线上作无滑动的滚动**。因此任何刚体的平面运动都可以用一条曲线在另一条曲线上的滚动来再现。

$$
\begin{array}{l l l}
\text{运动} & \text{定瞬心线} & \text{动瞬心线} \\
\text{绕固定销轴转动} & \text{一个点} & \text{同一个点} \\
\text{车轮在钢轨上滚动} & \text{钢轨（直线）} & \text{轮缘（圆）} \\
\text{一个齿轮相对其配对齿轮} & \text{配对齿轮的节圆} & \text{自身的节圆} \\
\text{四杆机构的连杆} & I_{13} \text{ 各位置连成的曲线} & \text{连杆上与之对滚的曲线} \\
\text{曲柄滑块机构的连杆} & \text{在连杆平动处伸向无穷远的曲线} & \text{连杆上与之对滚的曲线}
\end{array}
$$

**曲柄滑块机构的连杆是有启发性的例子。**连杆相对机架的瞬心是曲柄线$O_2 A$与过活塞销且垂直于滑块导路的直线的交点。**在上止点和下止点它位于活塞销处**——活塞瞬时静止。**在$\theta = 90^\circ$（和$270^\circ$）处两线平行，瞬心在无穷远：连杆瞬时平动**，其角速度为零。连杆角速度在止点处最大：对于$100$–$400$毫米机构在每分钟$300$转时，$\omega_{\mathrm{rod}} = \omega \lambda = 7.85\ \mathrm{rad / s}$（在$0^\circ$和$180^\circ$），$35^\circ$时为$6.50\ \mathrm{rad / s}$，$90^\circ$时为零。与此相反，其角**加速度**在$90^\circ$附近最大，那里角速度正在变号。

**齿轮是实体化的瞬心线。**当两个齿轮的节圆——其相对运动的瞬心线——相互滚动时，它们传递恒定速比，而渐开线齿形使这一点逐齿成立。渐开线的一个有用推论：若一对渐开线齿轮的中心距略有误差，速比仍然精确恒定（只有压力角和侧隙改变），因为速比由基圆决定。链条与链轮没有这个性质：其节线是多边形，链速每过一个齿波动一次（多边形效应）。
:::

::: example 速度多边形 {#ex-polygon}
对前面算例中的四杆机构，作速度多边形并读出$\omega_3$和$\omega_4$；然后由速度影像求连杆点$P$的速度。
::: solution
**速度多边形就是按比例画出的矢量方程$\vec{v}_B = \vec{v}_A + \vec{v}_{B / A}$。**
**第1步——已知速度。**$\vec{v}_A$的大小为$a \omega_2 = 5.00\ \mathrm{m / s}$，垂直于$O_2 A$；$\theta_2 = 40^\circ$、$\omega_2$逆时针时它指向$130^\circ$。**取比例尺$1\ \mathrm{m / s}$对应$20\ \mathrm{mm}$**，所以$\vec{v}_A$是一条$100\ \mathrm{mm}$的线段。
**第2步——两个方向。**$\vec{v}_B$垂直于$O_4 B$，所以沿$65.34^\circ + 90^\circ = 155.34^\circ$的直线。$\vec{v}_{B / A}$垂直于$AB$，所以沿$24.44^\circ + 90^\circ = 114.44^\circ$的直线（其指向由作图确定）。
**第3步——作图。**从极点$o$沿$130^\circ$量取$oa = 100\ \mathrm{mm}$。从$o$作$155.34^\circ$的直线；从$a$作$114.44^\circ$的直线。**两线交点为$b$。**
**第4步——量取。**
$$
\overline{ob} = 41.0\ \mathrm{mm} \Rightarrow v_B = 2.05\ \mathrm{m / s}, \qquad
\overline{ab} = 65.4\ \mathrm{mm} \Rightarrow v_{B / A} = 3.27\ \mathrm{m / s}
$$
$$
\omega_4 = \frac{v_B}{c} = \frac{2.05}{0.9} = \mathbf{2.28\ \mathrm{rad / s}}, \qquad
\omega_3 = \frac{v_{B / A}}{b} = \frac{3.27}{1.2} = \mathbf{2.72\ \mathrm{rad / s}} \quad \checkmark
$$
$\omega_3$的转向由图上$\vec{v}_{B/A}$的方向得出：$ab$指向右下方，这正是**顺时针**转动的连杆上$B$绕$A$的速度方向。
**为什么速度多边形仍值得画。**$\vec{v}_B$的方向（由摇杆决定）与$\vec{v}_{B/A}$的方向（由连杆决定）相交的角度等于传动角，这里为$40.9^\circ$。当该角变小时交点变得难以确定——在计算任何行列式之前，作图就显示出奇异位形。
**连杆的速度影像。**多边形上的点$a$、$b$、$p$构成一个与连杆三角形$A B P$**相似**的三角形，（按$\omega_3$的转向）转过$90^\circ$，并按$\left| \omega_3 \right|$缩放。所以$ap$的长度为$\left| \omega_3 \right| \cdot AP = 2.724 \times 0.8 = 2.18\ \mathrm{m / s}$，即$43.6\ \mathrm{mm}$，且垂直于$AP$：
$$
\overline{op} = 58.8\ \mathrm{mm} \quad \Rightarrow \quad v_P = 2.94\ \mathrm{m / s}
$$
——即瞬心法的答案，从图上读出。
:::
:::

::: example 槽轮的速度与峰均比陷阱 {#ex-geneva}
一个中心距$a = 100\ \mathrm{mm}$的四槽槽轮机构以$\omega_d = 10\ \mathrm{rad / s}$驱动。求分度期间输出的峰值角速度及其与平均值之比；再对八槽槽轮重复计算。
::: solution
**几何。**$r = a \sin \left( 180^\circ / n \right) = 100 \sin 45^\circ = 70.71\ \mathrm{mm}$。
**运动规律**，曲柄转角$\theta$从中心连线量起：
$$
\tan \psi = \frac{r \sin \theta}{a - r \cos \theta}
\qquad \Rightarrow \qquad
\frac{d \psi}{d \theta} = \frac{r a \cos \theta - r^2}{a^2 - 2 a r \cos \theta + r^2}
$$
**在$\theta = 0$处**（圆销进入槽中最深）：
$$
\left. \frac{d \psi}{d \theta} \right|_0 = \frac{r a - r^2}{\left( a - r \right)^2} = \frac{r}{a - r}
= \frac{70.71}{29.29} = 2.414
\qquad \Rightarrow \qquad \boxed{ \dot{\psi}_{\max} = 2.414 \times 10 = 24.14\ \mathrm{rad / s} }
$$
**分度期间的平均值。**曲柄转过$180^\circ - 360^\circ / 4 = 90^\circ$时槽轮转过$90^\circ$，所以平均速比为$1.000$，分度期间平均输出速度为$10.0\ \mathrm{rad / s}$：
$$
\frac{\dot{\psi}_{\max}}{\bar{\dot{\psi}}} = \frac{24.14}{10.0} = \mathbf{2.41}
$$
**对于八槽槽轮**，$r = 100 \sin 22.5^\circ = 38.27\ \mathrm{mm}$，所以
$$
\left. d \psi / d \theta \right|_0 = \frac{38.27}{61.73} = 0.620, \qquad
\text{平均速比} = \frac{45^\circ}{135^\circ} = 0.333, \qquad
\frac{\mathrm{峰值}}{\mathrm{平均}} = \frac{0.620}{0.333} = \mathbf{1.86}
$$
**结果的含义。**四槽槽轮在分度中点达到其平均分度速度的近两倍半，八槽槽轮略低于两倍。两个峰均比都应与停歇系数一起列在数据表上。
**加速度。**再求一次导数，得到四槽槽轮的峰值角加速度为$5.41\, \omega_d^2$，八槽为$0.70\, \omega_d^2$——相差$7.7$倍。在$\omega_d = 10\ \mathrm{rad/s}$时四槽槽轮达到$541\ \mathrm{rad / s^2}$，在$0.5\ \mathrm{m}$半径处为$270\ \mathrm{m / s^2}$，约$28\, g$。**加速度峰值不在速度峰值处：**分度中点速度最大而加速度为零；四槽槽轮的加速度最大值位于分度中点两侧各$11.5^\circ$曲柄转角处，那里速度曲线最陡。
*检验。*在进入和退出处（四槽时$\theta = \pm 45^\circ$），公式给出$d\psi/d\theta = (ra \cos 45^\circ - r^2)/(\ldots) = 0$，因为$r = a \cos 45^\circ$：槽轮按设计在静止状态下开始和结束分度。
:::
:::

::: widget plot
f: (0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))) / ((0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180))))))-1.1)
x: 0, 360
y: -1.1, 0.65
caption: $0.5$–$1.2$–$0.9$–$1.1$米四杆机构的角速度比$\omega_4 / \omega_2$随曲柄转角（度）的变化，由瞬心$I_{24}$在机架线上的位置计算。**该比值在$\theta_2 = 28.4^\circ$和$234.7^\circ$处为零——摇杆的两个极限位置，此时$I_{24}$与曲柄支点重合——并在那里变号。**两者之间，它在缓慢的外摆中升到$+0.57$（约$101^\circ$处），在急回中降到$-1.04$（约$344^\circ$处）。两瓣的不对称就是从速度上看到的急回比：回程用较少的曲柄转角走过同样的角度，所以必定更快。
:::

## 直接接触、滑动速度与磨损

::: definition 接触处的滑动 {#def-sliding}
**两个构件在高副处接触时，两个重合点的速度沿公法线的分量相等**（否则两物体会分离或相互嵌入）。**它们的差沿公切线方向：这就是滑动速度**，它决定接触处的磨损、摩擦功率和润滑。

$$
v_{\mathrm{slide}} = \left| \vec{v}_{C,1} - \vec{v}_{C,2} \right|, \qquad
P_{\mathrm{friction}} = \mu_f F_n v_{\mathrm{slide}}
$$

其中$\mu_f$为摩擦系数（不是传动角），$F_n$为法向力。

$$
\begin{array}{l c l}
\text{接触} & \text{滑动速度} & \text{后果} \\
\text{无滑动滚动的车轮} & 0 & \text{接触点就是瞬心} \\
\text{渐开线齿轮轮齿} & \text{节点处为 } 0 \text{，向齿顶和齿根增大} & \text{节线附近点蚀，齿顶附近胶合} \\
\text{平底凸轮从动件} & \omega \left( r_0 + s \right) \text{，从不为零} & \text{需要良好润滑和硬表面} \\
\text{滚子从动件} & \text{很小（滚子在凸轮上滚动）} & \text{滑动转移到滚子自身的轴承中} \\
\text{带与带轮} & \text{小的弹性滑动} & \text{速比略低于直径比}
\end{array}
$$

**要记住的是齿轮的结果。**两个以$\omega_1$和$\omega_2$转动的外啮合齿轮，在沿啮合线距节点$x$处的接触点，滑动速度为
$$
v_{\mathrm{slide}} = \left( \omega_1 + \omega_2 \right) x
$$
它**在节点处为零**，那里的接触是纯滚动，在啮合开始和终止处最大；接触点经过节点时滑动方向反向。这就是为什么齿面通常在节线附近出现点蚀（滑动少、接触应力高的滚动），在齿顶附近出现胶合（滑动大）。
:::

::: example 凸轮的压力角与滑动速度 {#ex-cam-vel}
一个盘形凸轮的基圆半径$r_0 = 30\ \mathrm{mm}$，在凸轮转过$\beta = 120^\circ$期间给出$h = 20\ \mathrm{mm}$的摆线运动规律升程，$\omega = 30\ \mathrm{rad / s}$。求从动件最大速度；尖顶从动件和$10\ \mathrm{mm}$滚子从动件的最大压力角；以及对平底从动件，求压力角、所需底面宽度和滑动速度。
::: solution
**运动规律。**摆线升程：$s = h \left[ \theta / \beta - \sin \left( 2\pi\theta / \beta \right) / 2\pi \right]$，所以$ds/d\theta = (h / \beta) \left[ 1 - \cos \left( 2\pi\theta/\beta \right) \right]$，在$\theta = \beta / 2$处最大：
$$
\left( \frac{ds}{d\theta} \right)_{\max} = \frac{2 h}{\beta} = \frac{2 \times 0.020}{2.0944} = 0.01910\ \mathrm{m/rad}, \qquad
v_{\max} = \omega \left( \frac{ds}{d\theta} \right)_{\max} = \mathbf{0.573\ \mathrm{m / s}}
$$
**对心尖顶或滚子从动件的压力角。**接触法线与从动件运动方向之间的夹角$\varphi$满足
$$
\tan \varphi = \frac{ds / d\theta}{r_p + s}
$$
其中$r_p$为理论基圆半径（尖顶时为$r_0$，滚子时为$r_0$加滚子半径）。在升程中点，$s = 10\ \mathrm{mm}$：
$$
\text{尖顶：} \tan \varphi = \frac{0.01910}{0.030 + 0.010} = 0.4775, \quad \varphi = 25.5^\circ
$$
在整个升程上计算$\varphi$得到的真实最大值为$26.1^\circ$，在$\theta = 54^\circ$处——略早于升程中点，因为那里分母仍在增大。用$10\ \mathrm{mm}$滚子时，$r_p = 40\ \mathrm{mm}$，最大值降到$\mathbf{21.2^\circ}$。一种常用准则是使直动滚子从动件的压力角保持在约$30^\circ$以下；两者都合格。
**平底从动件。**底面垂直于从动件轴线时，接触法线始终沿轴线，所以**压力角处处为零**——这是平底的大优点。代价出在别处：
- **底面宽度。**接触点距轴线$ds/d\theta$，所以底面在轴线两侧至少各需$19.1\ \mathrm{mm}$（再加裕量）。
- **滑动速度。**取从动件轴线为$y$轴，接触点在$(x_c, r_0 + s)$，$x_c = ds/d\theta$。凸轮上该处材料的速度为$\omega \times$其位置矢量，即$\omega \left( - (r_0 + s),\; x_c \right)$。$y$分量$\omega x_c = \omega \, ds/d\theta$正是从动件自身的速度，理应如此；$x$分量沿底面方向，而从动件底面在该方向没有速度。所以
$$
\boxed{ v_{\mathrm{slide}} = \omega \left( r_0 + s \right) }
$$
在升程开始时为$30 \times 0.030 = 0.90\ \mathrm{m/s}$，升程中点为$\mathbf{1.20\ \mathrm{m/s}}$，全升程处为$1.50\ \mathrm{m/s}$。**它从不降到零**，因为底面距凸轮中心至少为基圆半径。
**摩擦功率**，取$\mu_f = 0.12$、接触力$180\ \mathrm{N}$：
$$
P = 0.12 \times 180 \times 1.20 = 25.9\ \mathrm{W} \quad \text{（升程中点）}, \qquad 32.4\ \mathrm{W} \text{（全升程）}
$$
这些热量产生在一条狭窄的线接触中，这就是为什么平底从动件（如许多发动机的桶形挺柱）要在淬硬、润滑良好的表面上工作，并且常常相对凸轮偏置，使其转动以分散磨损。
**滚子从动件。**滚子在凸轮上几乎无滑动地滚动，所以凸轮–滚子接触几乎没有滑动；滑动转移到滚子的销轴或滚针轴承中，半径小得多，而且是在一个有润滑、可更换的零件里。
*检验。*平底从动件下凸轮廓线的曲率半径为$r_0 + s + d^2s/d\theta^2$；对这个运动规律其最小值为$19.3\ \mathrm{mm}$，为正，所以廓线处处外凸，平底能够跟随。更小的基圆或更快的升程最终会使它变为负值，而平底从动件无法跟随内凹或带尖点的廓线。
:::
:::

::: quiz
在一个四杆机构中，构件编号为$1 =$机架、$2 =$输入曲柄、$3 =$连杆、$4 =$输出摇杆，三心定理确定瞬心$I_{13}$位于：

- [ ] 连接$I_{12}$和$I_{34}$的线段的中点
- [x] 过$I_{12}$和$I_{23}$的直线与过$I_{14}$和$I_{34}$的直线的交点
- [ ] 过$I_{12}$和$I_{34}$的直线与过$I_{14}$和$I_{23}$的直线的交点
- [ ] 无处可求；必须通过解速度方程求得

::: solution
**$I_{12} I_{23}$与$I_{14} I_{34}$的交点。**三心定理说平面运动中三个物体的三个瞬心共线，所以对物体$\{ 1 , 2 , 3 \}$应用它，$I_{13}$在直线$I_{12} I_{23}$（曲柄线）上；对$\{ 1 , 3 , 4 \}$应用它，$I_{13}$在$I_{14} I_{34}$（摇杆线）上；交点就是$I_{13}$。对$\{1, 2, 4\}$和$\{2, 3, 4\}$应用同一定理，$I_{24}$在机架线上，又在连杆线上，于是角速度比定理给出理想机械增益

$$
M A = \frac{ T_4 }{ T_2 } = \frac{ \omega_2 }{ \omega_4 } = \frac{ \overline{ I_{14 } I_{24 } } }{ \overline{ I_{12 } I_{24 } } }
$$

**当曲柄与连杆共线时，连杆线经过$I_{12}$，所以$I_{24}$与$I_{12}$重合：$\omega_4 = 0$，理想增益为无穷大——摇杆极限位置处的肘节。**当连杆与摇杆共线时，$I_{24}$与$I_{14}$重合，增益为零：曲柄在那里无法驱动摇杆（死点，$\mu = 0$）。该方法在某一瞬间是精确的，但当两条直线以小角度相交时作图会不准确，而且它不给出加速度。
:::
:::

::: history
**威利斯（Robert Willis）**的《机构原理》（*Principles of Mechanism*，1841年）按机构在主动件与从动件之间产生的速比和方向关系对机构分类，这正是本讲的观点。**勒洛（Franz Reuleaux）**的《理论运动学》（*Theoretische Kinematik*，1875年）把平面运动理论建立在瞬心以及每个平面运动所确定的一对滚动曲线——瞬心线——之上。三心定理由**阿龙霍尔德（Siegfried Aronhold）**于1872年发表，并由**肯尼迪（Alexander Kennedy）**独立发现，写入其《机械力学》（*The Mechanics of Machinery*，1886年）。伯明翰梅森学院的**史密斯（Robert H. Smith）**于1885年向爱丁堡皇家学会提交了绘制机构速度图和加速度图的图解方法；**詹金（Fleeming Jenkin）**在为史密斯论文写的摘要中，把速度图的图形称为机构的“影像”——即上面速度多边形算例中所用的速度影像。
:::

## 后续内容

再求一次导数得到的加速度见[[mechanisms/acceleration-analysis]]，随之而来的惯性力使高速连杆机构成为动力学问题；速比是[[mechanisms/linkage-synthesis]]中与传动角相权衡的量；滑动速度是[[mechanisms/gears]]中磨损和效率以及[[mechanisms/cams]]中从动件选择的核心；而瞬心法推广为[[robotics]]中的速度雅可比矩阵。

::: summary
- 对回路求导：关于两个未知角速度的两个线性方程，在已求出的位置上计算——无需选根。
- 该方程组行列式的绝对值为$bc\sin\mu$；传动角、奇异雅可比矩阵和位置方程的重根是同一个条件。
- 三心定理使三个瞬心共线；转动副的瞬心在销轴处，移动副在无穷远处，纯滚动接触在接触点。
- $\omega_4 / \omega_2 = \overline{I_{12}I_{24}} / \overline{I_{14}I_{24}}$，实际力矩比是其倒数乘以效率。
- 构件的速度影像与构件相似，转过$90^\circ$，并按其角速度缩放。
- 定瞬心线与动瞬心线作无滑动滚动；曲柄滑块连杆的瞬心在止点处位于活塞销，在$90^\circ$处位于无穷远。
- 滑动速度决定磨损和摩擦功率：在齿轮节点处为零，在平底从动件处为$\omega(r_0+s)$且从不为零。
- 报峰值输出速度而不是平均值：四槽槽轮的峰值是其平均分度速度的$2.41$倍。
:::

## 习题

::: exercise 瞬心数 {level=1 check="6"}
给出四构件平面机构的瞬心数。
::: solution
$\binom{4}{2}=4\times3/2=6$。
:::
:::

::: exercise 速比 {level=1 check="2.28"}
对算例中的四杆机构，在$\theta_2=40^\circ$、$\omega_2=10$弧度每秒时给出$\omega_4$（单位弧度每秒）。
::: solution
$\overline{I_{12}I_{24}}/\overline{I_{14}I_{24}}=0.3241/1.4241=0.2276$；$\omega_4=2.28$ rad/s。
:::
:::

::: exercise 连杆角速度 {level=1 check="2.72"}
对同一四杆机构，给出连杆角速度的大小（单位弧度每秒）。
::: solution
$\left|\omega_3\right|=2.72$ rad/s（顺时针），由两个回路方程或由$v_A/\overline{AI_{13}}=5.00/1.836$得到。
:::
:::

::: exercise 力矩比 {level=1 check="4.39"}
对同一四杆机构，在$\theta_2=40^\circ$时给出理想力矩比$T_4/T_2$。
::: solution
$T_4/T_2=\omega_2/\omega_4=10/2.276=4.39$。
:::
:::

::: exercise 连杆角速度（曲柄滑块） {level=1 check="6.50"}
对$100$–$400$毫米曲柄滑块机构，在每分钟$300$转、$\theta=35^\circ$时给出连杆的角速度（单位弧度每秒）。
::: solution
$\omega_{\mathrm{rod}}=\omega\lambda\cos\theta/\sqrt{1-\lambda^2\sin^2\theta}=31.416\times0.25\times0.8192/0.98967=6.50$ rad/s。
:::
:::

::: exercise 槽轮峰值 {level=1 check="2.41"}
给出四槽槽轮机构分度期间输出角速度的峰值与平均值之比。
::: solution
$r/(a-r)=\sin45^\circ/(1-\sin45^\circ)=2.414$；分度期间平均速比为$1.000$，所以峰均比为$2.41$。
:::
:::

::: exercise 八槽槽轮 {level=1 check="1.86"}
给出八槽槽轮机构分度期间输出角速度的峰值与平均值之比。
::: solution
$\left[\sin22.5^\circ/(1-\sin22.5^\circ)\right]/(45/135)=0.620/0.333=1.86$。
:::
:::

::: exercise 滑动速度 {level=1 check="0"}
给出一对渐开线直齿圆柱齿轮在节点处的滑动速度（单位米每秒）。
::: solution
零。节点是两齿轮相对运动的瞬心，所以两个重合点速度相同；滑动只发生在远离节点处。
:::
:::

::: exercise 移动副的瞬心 {level=2}
滑块相对机架的瞬心在哪里？滑块的角速度是多少？在三心定理作图中如何处理移动副？
::: solution
**在垂直于滑动方向的无穷远处。****角速度为零**：滑块作平动，所以其上每一点速度相同——这是瞬心退向无穷远、而$\omega r$保持不变时$v = \omega r$的极限。在三心定理作图中，“过”无穷远瞬心的直线画成过另一个已知瞬心、垂直于导路的直线。计算机程序必须专门处理这种情形，因为本应相交以确定瞬心的两条直线是平行的；所以连杆分析程序把移动副存为一个方向而不是一个点。
:::
:::

::: exercise 肘节的机械增益 {level=2 check="5.72"}
一台肘节压力机有两根等长杆，每根与其外端两销连线成$\alpha = 5^\circ$角，由作用在膝部的横向力驱动。给出理想力比$F_{\mathrm{out}}/F_{\mathrm{in}}$，并用虚功（速度）加以验证。
::: solution
**用静力学：**
$$
\left( \frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} \right)_{\mathrm{ideal}} = \frac{1}{2 \tan \alpha} = \frac{1}{2 \tan 5^\circ} = 5.72
$$
**用速度。**设每根杆长$L$，一个外端销固定，另一个（滑块）可沿两销连线滑动。滑块位于$x = 2L\cos\alpha$，膝部高度为$y = L\sin\alpha$。于是$\dot x = -2L\sin\alpha\,\dot\alpha$，$\dot y = L\cos\alpha\,\dot\alpha$，所以
$$
\frac{v_{\mathrm{in}}}{v_{\mathrm{out}}} = \frac{\left| \dot y \right|}{\left| \dot x \right|} = \frac{\cos\alpha}{2 \sin\alpha} = \frac{1}{2\tan\alpha} = 5.72
$$
由功率守恒，$F_{\mathrm{out}} / F_{\mathrm{in}} = v_{\mathrm{in}} / v_{\mathrm{out}}$——结果相同。计入效率$\eta$后力比为$5.72\,\eta$。当$\alpha \to 0$时，对于有限的膝部速度，滑块速度趋于零：滑块到达行程终点，理想增益为无穷大。
:::
:::

::: exercise 推导 {level=3}
对曲柄滑块回路求导，得到活塞速度和连杆角速度，并求$\lambda = 0.25$时活塞速度最大的曲柄转角。
::: solution
**回路。**$x = r \cos \theta + l \cos \phi$，且$l \sin \phi = r \sin \theta$，所以$\sin \phi = \lambda \sin \theta$。
**对约束求导：**
$$
l \cos \phi \frac{d \phi}{d \theta} = r \cos \theta
\qquad \Rightarrow \qquad
\boxed{ \omega_\phi = \omega \frac{\lambda \cos \theta}{\cos \phi} = \frac{\omega \lambda \cos \theta}{\sqrt{1 - \lambda^2 \sin^2 \theta}} }
$$
**对位置求导：**
$$
\frac{d x}{d \theta} = - r \sin \theta - l \sin \phi \frac{d \phi}{d \theta} = - r \sin \theta - r \cos \theta \tan \phi
$$
$$
\boxed{ v = - \frac{dx}{dt} = r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right] }
$$
（离开上止点为正），**利用了$\tan \phi = \lambda \sin \theta / \sqrt{1 - \lambda^2 \sin^2 \theta}$和$2 \sin \theta \cos \theta = \sin 2 \theta$。**
**最大值。**取$\lambda$的一阶近似，$v \approx r\omega \left( \sin\theta + \tfrac{\lambda}{2} \sin 2\theta \right)$；令$dv / d\theta = 0$得$\cos \theta + \lambda \cos 2 \theta = 0$，代入$\cos 2 \theta = 2 \cos^2 \theta - 1$并令$c = \cos\theta$：
$$
2 \lambda c^2 + c - \lambda = 0
\qquad \Rightarrow \qquad c = \frac{- 1 \pm \sqrt{1 + 8 \lambda^2}}{4 \lambda}
$$
**取负号的根为$- 2.22$，在$[-1, 1]$之外；取正号的根就是答案：**
$$
\cos \theta = \frac{- 1 + \sqrt{1 + 8 \times 0.0625}}{4 \times 0.25} = \frac{- 1 + 1.2247}{1.0} = 0.2247
\qquad \Rightarrow \qquad \theta = 77.0^\circ
$$
**对精确表达式数值求最大值得**
$$
\boxed{ \theta_{v_{\max}} = 76.7^\circ, \qquad v_{\max} = 1.031\, r \omega }
$$
所以一阶估计的误差在$0.3^\circ$以内。与纯正弦运动相比，峰值高$3.1\ \%$、早$13.3^\circ$。由于速度最大处加速度为零，活塞加速度的过零点也移动了同样的$13.3^\circ$——一转的$3.7\ \%$。
*检验。*$v_{\max} / r \omega = 1.031$与$1 + \lambda^2 / 2 = 1.031$相符：峰值的修正是$\lambda$的二阶量。峰值高于$r\omega$，是因为在去程$90^\circ$之前，连杆的摆动叠加到了活塞的运动上。
:::
:::

::: exercise 设计 {level=3}
为一台**旋转贴标机的分度驱动**选型并确定尺寸：八个工位，每分钟$60$次分度，每次分度须在$0.35\ \mathrm{s}$内完成，$3\ \mathrm{kg}$的瓶子位于$0.45\ \mathrm{m}$的工位半径上，转台为$60\ \mathrm{kg}$的圆盘，贴标头处定位重复精度$\pm 0.03^\circ$，断电时转台不得移动。瓶中装有液体；取$0.2\, g$为敞口瓶的横向加速度限值。给出拓扑、运动规律、尺寸、失效模式和验收试验。
::: solution
**工况。**每分钟$60$次分度即每$1.000\ \mathrm{s}$一次：分度至多$0.35\ \mathrm{s}$，停歇至少$0.65\ \mathrm{s}$，停歇系数为$0.65$。每次分度$45^\circ = 0.7854\ \mathrm{rad}$。
**槽轮？**$45^\circ$分度需要八槽槽轮，其停歇系数固定为$0.625$：主动件每秒一转时分度需要$0.375\ \mathrm{s}$——**太长**。槽轮因时间不合格而被否定。
**凸轮分度器。**其分度角和运动规律由凸轮设计确定，所以可以恰好在$0.35\ \mathrm{s}$内分度，并在停歇期间锁住转塔——这也从机械上满足了断电要求。活动度（把转塔滚子焊在转塔上）：$N = 3$，$J_1 = 2$，$J_2 = 1$，$M = 1$。采用**修正正弦**规律（系数$C_v = 1.76$，$C_a = 5.53$）：
$$
\dot{\psi}_{\max} = 1.76 \times \frac{0.7854}{0.35} = 3.95\ \mathrm{rad / s}, \qquad
\ddot{\psi}_{\max} = 5.53 \times \frac{0.7854}{0.35^2} = 35.5\ \mathrm{rad / s^2}
$$
**液体才是真正的约束。**在$0.45\ \mathrm{m}$工位半径处，峰值切向加速度为$35.5 \times 0.45 = 16.0\ \mathrm{m / s^2} = 1.63\, g$，是$0.2\, g$限值的八倍。要保持在$0.2\, g$以内需要
$$
\ddot{\psi}_{\max} \le \frac{0.2 \times 9.81}{0.45} = 4.36\ \mathrm{rad / s^2}
\qquad \Rightarrow \qquad t_{\mathrm{index}} \ge \sqrt{\frac{5.53 \times 0.7854}{4.36}} = 1.00\ \mathrm{s}
$$
**——也就是整个周期。**没有任何分度机构能同时满足这个节拍和$0.2\, g$限值；**必须修改要求**。现实的选项是：(1) 在封盖之后贴标，瓶子由托座或夹具夹持，并设定更高的限值（比如$1.5\, g$，须经试验确认）；(2) 减小半径；(3) 降低节拍；或 (4) 采用连续运动的机器，从根本上消除分度加速度——这是高速贴标的通常选择。
**按选项(1)并采用较小转台确定尺寸。**把节圆半径减到$0.40\ \mathrm{m}$，转台质量减到$50\ \mathrm{kg}$。峰值横向加速度为$35.5 \times 0.40 = 14.2\ \mathrm{m/s^2} = 1.45\, g$，在假定的$1.5\, g$以内。输出端转动惯量为
$$
I = 8 \times 3 \times 0.40^2 + \tfrac{1}{2} \times 50 \times 0.40^2 = 3.84 + 4.00 = 7.84\ \mathrm{kg \cdot m^2}
\qquad \Rightarrow \qquad T_{\max} = 7.84 \times 35.5 = 278\ \mathrm{N \cdot m}
$$
另加摩擦；分度器按制造商额定值加使用系数选型。
**重复精度。**在距轴$80\ \mathrm{mm}$的贴标头处，$\pm 0.03^\circ$即$\pm 0.042\ \mathrm{mm}$。假定各项贡献为$\pm 0.01^\circ$（凸轮廓线）、$\pm 0.02^\circ$（锁止时滚子与槽的间隙）、$\pm 0.008^\circ$（轴承跳动）和$\pm 0.005^\circ$（输入定位），方和根为
$$
\sqrt{0.005^2 + 0.01^2 + 0.02^2 + 0.008^2} = 0.024^\circ \quad \checkmark
$$
**失效模式。**凸轮滚子磨损（首先表现为重复精度下降）；卡料使驱动过载（加装过载离合器）；瓶子在加速度峰值时在托座中移位；以及凸轮锁止段磨损后断电时失去位置。
**验收试验。**在贴标半径处测量至少$100$次连续分度的重复精度；测量分度时间；用高速摄像拍摄最不利灌装液位的瓶子在分度中的情况；记录输入力矩并与模型比较；在周期中最不利的相位断电，证明转台不移动。本例说明速度和加速度分析如何决定选型；机器本身须由有资质的工程师按适用的机械安全要求设计和校核。
:::
:::
