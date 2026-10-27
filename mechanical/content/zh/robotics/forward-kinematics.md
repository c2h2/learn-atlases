机器人控制器知道自己的关节角：每个关节都装有编码器（[[mechatronics/sensors]]）。而作业关心的是工具在哪里——夹持器指尖的位置及其接近方向。**正运动学**（forward kinematics）就是从前者到后者的映射：给定关节变量$\boldsymbol\theta = (\theta_1,\dots,\theta_n)$，求末端执行器坐标系相对于基座的位姿$T(\boldsymbol\theta) \in SE(3)$。它总是可求的，而且总是唯一的，因为它不过是[[robotics/rigid-motions]]中齐次变换的乘积，每个关节一个；技巧在于选择坐标系，使每个因子都简单、结果便于校核。本章首先定义关节变量和位形空间，然后用初等几何处理平面机械臂，再讲述每位机器人工程师都要用到的两种系统方法：**Denavit–Hartenberg**（D-H）约定，它在每个连杆上固连一个坐标系，使每个关节贡献一个含四个参数的矩阵；以及**指数积公式**（product of exponentials，PoE），它只需要两个坐标系和每个关节的旋量轴。我们用两种方法计算同样的机器人并核对两者一致，最后讨论机器人的工作空间。

## 关节、连杆与位形空间 {#sec-config}

串联机械臂是由刚性**连杆**$0, 1, \dots, n$通过$n$个单自由度**关节**连接而成的链；连杆 0 是固定的基座，关节$i$连接连杆$i-1$与连杆$i$。工业机器人使用两类关节，二者都是[[mechanisms/mechanisms-mobility]]意义下的低副：

- **转动**关节（R）允许绕一根轴转动，其变量$\theta_i$是一个角度；
- **移动**关节（P）允许沿一根轴滑动，其变量$d_i$是一个长度。

自由度更多的关节（球副、万向节）建模为两个或三个轴线相交、其间连杆长度为零的单自由度关节。机器人按从基座起的关节序列命名：SCARA 机械臂是 RRPR，斯坦福机械臂（Stanford Arm）是 RRPRRR，典型的六轴工业机械臂是 6R。

::: definition 位形空间与正运动学 {#def-fk}
机器人的**位形**是对机器人上每一点位置的完整描述。对串联机械臂，它由关节变量向量$\boldsymbol\theta = (\theta_1, \dots, \theta_n)$给出，全部位形的集合称为**位形空间**（C 空间），其维数等于**自由度**（DOF）数。**任务空间**是末端执行器位姿的空间$SE(3)$（平面机械臂为$SE(2)$），**正运动学**是映射
$$
\boldsymbol\theta \mapsto T_{0n}(\boldsymbol\theta) = \begin{bmatrix} R(\boldsymbol\theta) & \mathbf p(\boldsymbol\theta)\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}.
$$
:::

对开链，自由度等于各关节自由度之和。对含$N$个构件（包括基座）和$J$个自由度为$f_j$的关节的空间机构，格吕布勒（Grübler）公式$m = 6(N - 1 - J) + \sum_j f_j$对串联链给出$N - 1 = J$，因此对$n$个单自由度关节有$m = \sum f_j = n$。空间中的刚体有六个自由度，所以机械臂至少需要六个关节才能把工具放到任意位置**并且**任意姿态；多于六个关节的（例如 7R 机械臂）是**冗余**的，少于六个的只能到达一个低维的位姿集合。

## 用初等几何求平面机械臂 {#sec-planar}

对转动轴全部平行（垂直于平面）的平面机械臂，几何关系直接给出正运动学。从前一连杆的方向量取每个关节角$\theta_i$，逆时针为正；于是连杆$i$指向绝对角$\theta_1 + \dots + \theta_i$，末端是各连杆向量之和。对长度为$L_1, L_2, L_3$的三个连杆，
$$
\begin{aligned}
x &= L_1c_1 + L_2c_{12} + L_3c_{123},\\
y &= L_1s_1 + L_2s_{12} + L_3s_{123},\\
\phi &= \theta_1 + \theta_2 + \theta_3,
\end{aligned}
$$ {#eq-3r-planar}
其中$c_{12} = \cos(\theta_1+\theta_2)$，$s_{123} = \sin(\theta_1+\theta_2+\theta_3)$，$\phi$为最后一个连杆的方向。两连杆（2R）机械臂是$L_3 = 0$的情形。

::: example 平面 3R 机械臂的正运动学 {#ex-3r}
一平面 3R 机械臂的$L_1 = 0.40\,\mathrm m$，$L_2 = 0.30\,\mathrm m$，$L_3 = 0.10\,\mathrm m$，位于$\boldsymbol\theta = (30^\circ, 45^\circ, -30^\circ)$。求工具的位置和姿态。
::: solution
各连杆的绝对角为$30^\circ$、$75^\circ$和$45^\circ$。由[[#eq-3r-planar]]，
$$
\begin{aligned}
x &= 0.40\cos30^\circ + 0.30\cos75^\circ + 0.10\cos45^\circ = 0.3464 + 0.0776 + 0.0707 = 0.4948\,\mathrm m,\\
y &= 0.40\sin30^\circ + 0.30\sin75^\circ + 0.10\sin45^\circ = 0.2000 + 0.2898 + 0.0707 = 0.5605\,\mathrm m,\\
\phi &= 30^\circ + 45^\circ - 30^\circ = 45^\circ.
\end{aligned}
$$
合理性检查：到基座的距离$\sqrt{0.4948^2 + 0.5605^2} = 0.748\,\mathrm m$小于总长$0.80\,\mathrm m$，连杆不共线时理应如此。下面用 D-H 和 PoE 方法将得到同样的数值。
:::
:::

一旦各轴不再平行，初等几何就不再适用。系统方法把几何问题变成矩阵乘法。

## Denavit–Hartenberg 约定 {#sec-dh}

一般的齐次变换有六个参数。Denavit 和 Hartenberg 注意到，只要巧妙地放置坐标系，从一个连杆坐标系到下一个的变换只需要**四个**参数，其中一个是关节变量，另外三个是由连杆几何决定的常数。我们采用 Spong、Hutchinson 与 Vidyasagar 以及 Siciliano 等人的经典约定：坐标系$i$固连在连杆$i$的远端，且**轴$\mathbf z_{i-1}$是关节$i$的轴线**。

::: algorithm 建立 Denavit–Hartenberg 坐标系 {#alg-dh}
1. 将关节编号为$1,\dots,n$，并画出每个关节的轴线。令$\mathbf z_{i-1}$沿关节$i$的轴线（$i = 1,\dots,n$），指向任取一个方向。
2. 基坐标系$\{0\}$：原点取在$\mathbf z_0$上任意一点；$\mathbf x_0$取垂直于$\mathbf z_0$的任意方向。
3. 对$i = 1,\dots,n-1$，已知$\mathbf z_{i-1}$和$\mathbf z_i$：
   - 若二者为异面直线，$\mathbf x_i$沿它们唯一的**公垂线**，从$\mathbf z_{i-1}$指向$\mathbf z_i$，原点$\mathbf o_i$取在该公垂线与$\mathbf z_i$的交点；
   - 若二者相交，$\mathbf o_i$取在交点，$\mathbf x_i$沿$\pm\mathbf z_{i-1}\times\mathbf z_i$；
   - 若二者平行，可任选一条公垂线（通常取通过$\mathbf o_{i-1}$的那条，或使$d_i = 0$的那条）。
   然后令$\mathbf y_i = \mathbf z_i\times\mathbf x_i$。
4. 工具坐标系$\{n\}$：原点在工具点，$\mathbf x_n$垂直于$\mathbf z_{n-1}$并与之相交；通常$\mathbf z_n$取为接近方向。
5. 读出每个连杆$i$的四个**D-H 参数**：
   - $a_i$（连杆长度）：沿$\mathbf x_i$量得的从$\mathbf z_{i-1}$到$\mathbf z_i$的距离；
   - $\alpha_i$（连杆扭角）：绕$\mathbf x_i$量得的从$\mathbf z_{i-1}$到$\mathbf z_i$的角度；
   - $d_i$（连杆偏距）：沿$\mathbf z_{i-1}$量得的从$\mathbf o_{i-1}$到$\mathbf x_i$在$\mathbf z_{i-1}$上垂足的距离；
   - $\theta_i$（关节角）：绕$\mathbf z_{i-1}$量得的从$\mathbf x_{i-1}$到$\mathbf x_i$的角度。
   对转动关节，$\theta_i$是变量；对移动关节，$d_i$是变量。
:::

::: proposition Denavit–Hartenberg 连杆变换 {#prop-dh}
按[[#alg-dh]]建立坐标系后，从坐标系$i-1$到坐标系$i$的变换为
$$
A_i = \mathrm{Rot}_z(\theta_i)\,\mathrm{Trans}_z(d_i)\,\mathrm{Trans}_x(a_i)\,\mathrm{Rot}_x(\alpha_i)
= \begin{bmatrix}
c_{\theta_i} & -s_{\theta_i}c_{\alpha_i} & s_{\theta_i}s_{\alpha_i} & a_ic_{\theta_i}\\
s_{\theta_i} & c_{\theta_i}c_{\alpha_i} & -c_{\theta_i}s_{\alpha_i} & a_is_{\theta_i}\\
0 & s_{\alpha_i} & c_{\alpha_i} & d_i\\
0 & 0 & 0 & 1
\end{bmatrix},
$$ {#eq-dh}
正运动学为$T_{0n}(\boldsymbol\theta) = A_1A_2\cdots A_n$。反之，两个坐标系之间的任一变换，只要满足（DH1）$\mathbf x_i \perp \mathbf z_{i-1}$和（DH2）$\mathbf x_i$与$\mathbf z_{i-1}$相交，就对某组$(\theta_i, d_i, a_i, \alpha_i)$具有这一形式。
:::

::: proof
**乘积。** 从坐标系$i-1$出发依次按四个参数运动，是一系列绕**当前**坐标轴和沿当前坐标轴的运动，因此矩阵右乘（[[robotics/rigid-motions]]）：绕$\mathbf z_{i-1}$转$\theta_i$（使$\mathbf x_{i-1}$转到$\mathbf x_i$的方向），沿同一轴移动$d_i$（到达$\mathbf x_i$的垂足），沿新的$x$轴移动$a_i$（到达$\mathbf o_i$），再绕该$x$轴转$\alpha_i$（使$\mathbf z_{i-1}$转到$\mathbf z_i$）。绕$z$的转动与沿$z$的平移可交换，对$x$亦然，因此每一对内部的次序无关紧要。将$\mathrm{Rot}_z(\theta)\mathrm{Trans}_z(d) = \begin{bmatrix} \mathrm{Rot}_z(\theta) & d\hat{\mathbf z}\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$乘以$\mathrm{Trans}_x(a)\mathrm{Rot}_x(\alpha) = \begin{bmatrix} \mathrm{Rot}_x(\alpha) & a\hat{\mathbf x}\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$，得到旋转部分$\mathrm{Rot}_z(\theta)\mathrm{Rot}_x(\alpha)$——即[[#eq-dh]]的$3\times3$块——以及平移$d\hat{\mathbf z} + a\,\mathrm{Rot}_z(\theta)\hat{\mathbf x} = (ac_\theta, as_\theta, d)$。链式法则$T_{0n} = T_{01}T_{12}\cdots T_{n-1,n}$与$T_{i-1,i} = A_i$给出正运动学。
**只需四个参数。** 令$R = R_{i-1,i}$，$\mathbf p = \mathbf p_{i-1,i}$。（DH1）表示$\hat{\mathbf x}_i\cdot\hat{\mathbf z}_{i-1} = 0$，即$r_{31} = 0$。第一列$(r_{11}, r_{21}, 0)$是单位向量，故对唯一的$\theta$有$r_{11} = c_\theta$，$r_{21} = s_\theta$；第三行$(0, r_{32}, r_{33})$是单位向量，故对唯一的$\alpha$有$r_{32} = s_\alpha$，$r_{33} = c_\alpha$。于是正交归一性把其余四个元素确定为$\mathrm{Rot}_z(\theta)\mathrm{Rot}_x(\alpha)$的相应元素（第三列必须是前两列的叉积，第二列必须是第三列与第一列的叉积）。（DH2）表示过$\mathbf o_i$、方向为$\hat{\mathbf x}_i$的直线与$\mathbf z_{i-1}$相交：对某两个标量$a, d$有$\mathbf p - a\,\hat{\mathbf x}_i = d\,\hat{\mathbf z}$，故$\mathbf p = a(c_\theta, s_\theta, 0) + d(0,0,1)$——恰为[[#eq-dh]]中的平移。剩下四个自由的数：$\theta, \alpha, a, d$。
:::

::: example 平面 3R 机械臂的 D-H 参数 {#ex-dh-3r}
为[[#ex-3r]]的机械臂建立 D-H 坐标系，并校核结果。
::: solution
三个关节轴都垂直于平面，因此$\mathbf z_0, \mathbf z_1, \mathbf z_2$都指向纸面外且互相平行。把$\mathbf o_0$放在关节 1，并让每个$\mathbf x_i$沿连杆$i$，使$\mathbf o_1$在关节 2，$\mathbf o_2$在关节 3，$\mathbf o_3$在工具处。于是所有连杆的$d_i = 0$、$\alpha_i = 0$，$a_i = L_i$，$\theta_i$为从$\mathbf x_{i-1}$到$\mathbf x_i$的角度——即相对关节角。

| 连杆 | $a_i$ | $\alpha_i$ | $d_i$ | $\theta_i$ |
|---|---|---|---|---|
| 1 | $0.40\,\mathrm m$ | $0$ | $0$ | $\theta_1$ |
| 2 | $0.30\,\mathrm m$ | $0$ | $0$ | $\theta_2$ |
| 3 | $0.10\,\mathrm m$ | $0$ | $0$ | $\theta_3$ |

当$\alpha = d = 0$时，$A_i$是转$\theta_i$的平面转动，再沿新的$x$轴平移$L_i$；平面转动相乘时转角相加，因此
$$
T_{03} = \begin{bmatrix} c_{123} & -s_{123} & 0 & L_1c_1 + L_2c_{12} + L_3c_{123}\\ s_{123} & c_{123} & 0 & L_1s_1 + L_2s_{12} + L_3s_{123}\\ 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 1\end{bmatrix},
$$
这就是[[#eq-3r-planar]]。在$(30^\circ, 45^\circ, -30^\circ)$处，三个矩阵的数值乘积的旋转部分为$\mathrm{Rot}_z(45^\circ)$，平移为$(0.4948, 0.5605, 0)\,\mathrm m$，与几何结果一致。
:::
:::

::: example SCARA 机械臂 {#ex-scara}
SCARA（RRPR）机械臂有两个互相平行的竖直转动轴、一个竖直移动关节和一个竖直的工具回转轴。使用下面的 D-H 参数表（基坐标系在地面上，因此第一个连杆包含立柱高度$d_1$），$d_1 = 0.40\,\mathrm m$，$a_1 = 0.35\,\mathrm m$，$a_2 = 0.30\,\mathrm m$，$d_4 = 0.05\,\mathrm m$，求$\theta_1 = 30^\circ$、$\theta_2 = 60^\circ$、$d_3 = 0.10\,\mathrm m$、$\theta_4 = 45^\circ$时的工具位姿。

| 连杆 | $a_i$ | $\alpha_i$ | $d_i$ | $\theta_i$ |
|---|---|---|---|---|
| 1 | $a_1$ | $0$ | $d_1$ | $\theta_1^*$ |
| 2 | $a_2$ | $180^\circ$ | $0$ | $\theta_2^*$ |
| 3 | $0$ | $0$ | $d_3^*$ | $0$ |
| 4 | $0$ | $0$ | $d_4$ | $\theta_4^*$ |

（星号表示关节变量。）
::: solution
扭角$\alpha_2 = 180^\circ$使$\mathbf z_2$翻转向下，从而正的$d_3$使主轴套筒下降。将四个矩阵[[#eq-dh]]作符号相乘，得
$$
T_{04} = \begin{bmatrix}
c_{12}c_4 + s_{12}s_4 & s_{12}c_4 - c_{12}s_4 & 0 & a_1c_1 + a_2c_{12}\\
s_{12}c_4 - c_{12}s_4 & -c_{12}c_4 - s_{12}s_4 & 0 & a_1s_1 + a_2s_{12}\\
0 & 0 & -1 & d_1 - d_3 - d_4\\
0 & 0 & 0 & 1
\end{bmatrix},
$$
即工具坐标系绕竖直轴转过$\theta_1 + \theta_2 - \theta_4$，其$z$轴向下。代入数值：$\theta_1 + \theta_2 = 90^\circ$，故
$$
x = 0.35\cos30^\circ + 0.30\cos90^\circ = 0.3031\,\mathrm m,\quad y = 0.35\sin30^\circ + 0.30\sin90^\circ = 0.4750\,\mathrm m,\quad z = 0.40 - 0.10 - 0.05 = 0.25\,\mathrm m,
$$
工具的$x$轴位于$\theta_1 + \theta_2 - \theta_4 = 45^\circ$：第一列为$(0.7071, 0.7071, 0)$。校核：水平伸距$\sqrt{0.3031^2 + 0.475^2} = 0.563\,\mathrm m$介于$a_1 - a_2 = 0.05\,\mathrm m$与$a_1 + a_2 = 0.65\,\mathrm m$之间。SCARA 的结构特点在$T_{04}$中一目了然：水平位置只取决于$\theta_1, \theta_2$，高度只取决于$d_3$——这正是 SCARA 在台面上的高速拾放作业中占主导地位的原因。
:::
:::

::: example 肘型（拟人型）机械臂 {#ex-elbow}
大多数六轴工业机械臂的前三个关节构成一个“肘型”机械臂：一个竖直的腰关节，然后是轴线互相平行且水平的肩关节和肘关节。D-H 参数$(a, \alpha, d, \theta)$ = $(0, 90^\circ, d_1, \theta_1)$、$(a_2, 0, 0, \theta_2)$、$(a_3, 0, 0, \theta_3)$，$d_1 = 0.50\,\mathrm m$，$a_2 = 0.60\,\mathrm m$，$a_3 = 0.50\,\mathrm m$，求$\boldsymbol\theta = (30^\circ, 45^\circ, -60^\circ)$时腕点$\mathbf o_3$的位置。
::: solution
$A_1$的$\alpha_1 = 90^\circ$使肩关节轴$\mathbf z_1$变为水平；于是关节 2 和 3 在方位角为$\theta_1$的竖直平面内构成一个平面 2R 机械臂。相乘得
$$
\mathbf o_3 = \begin{bmatrix} c_1(a_2c_2 + a_3c_{23})\\ s_1(a_2c_2 + a_3c_{23})\\ d_1 + a_2s_2 + a_3s_{23}\end{bmatrix}.
$$
数值上$\theta_2 + \theta_3 = -15^\circ$：水平伸距为$r = 0.6\cos45^\circ + 0.5\cos(-15^\circ) = 0.4243 + 0.4830 = 0.9073\,\mathrm m$，故
$$
\mathbf o_3 = (0.9073\cos30^\circ,\ 0.9073\sin30^\circ,\ 0.50 + 0.6\sin45^\circ + 0.5\sin(-15^\circ)) = (0.7857,\ 0.4536,\ 0.7949)\,\mathrm m .
$$
校核：从肩部$(0,0,0.5)$到$\mathbf o_3$的距离为$\sqrt{0.9073^2 + 0.2949^2} = 0.954\,\mathrm m$，由余弦定理它必须等于$\sqrt{a_2^2 + a_3^2 + 2a_2a_3\cos\theta_3} = \sqrt{0.36 + 0.25 + 0.30} = 0.954\,\mathrm m$ ✓。球形手腕（三根转动轴交于$\mathbf o_3$）再用三行 D-H 参数加上；它改变工具姿态而不移动$\mathbf o_3$——正是这一性质使逆运动学易于求解（[[robotics/inverse-kinematics]]）。
:::
:::

::: warning 两种 Denavit–Hartenberg 约定
Craig 的教科书和许多机器人文档采用**改进型** D-H 约定，其中坐标系$i$位于关节$i$处（近端），$A_i = \mathrm{Rot}_x(\alpha_{i-1})\mathrm{Trans}_x(a_{i-1})\mathrm{Rot}_z(\theta_i)\mathrm{Trans}_z(d_i)$，$a$和$\alpha$的下标错开一位。两者描述的是同样的机器人，但按一种约定写出的参数表代入另一种约定的公式会得出毫无意义的结果。要查明数据手册采用哪种约定，并在一个能凭观察预知答案的位形（所有关节为零，或某一关节为$90^\circ$）上检验任何 D-H 参数表。还要记住，制造商所定的关节“零位”常与 D-H 的$\theta_i = 0$相差一个常数偏置。
:::

## 指数积公式 {#sec-poe}

D-H 坐标系要求每个连杆上都有一个坐标系，并且要小心处理特殊情形（平行轴使$d_i$可以任意取值；名义上平行的轴稍有偏斜就会使$d_i$发生跳变，这对标定不利）。指数积（PoE）公式只用两个坐标系——基座坐标系$\{s\}$和末端执行器坐标系$\{b\}$——并用旋量轴（[[robotics/rigid-motions]]）描述每个关节。

::: theorem 指数积公式（空间形式） {#thm-poe}
选定一个**零位位形**$\boldsymbol\theta = \mathbf 0$，令$M \in SE(3)$为此时末端执行器的位姿。令$\mathcal S_i = (\boldsymbol\omega_i, \mathbf v_i)$为关节$i$**在零位位形下**在$\{s\}$中表示的旋量轴：对转动关节，$\boldsymbol\omega_i$为轴线的单位方向，$\mathbf v_i = -\boldsymbol\omega_i\times\mathbf q_i$，$\mathbf q_i$为轴线上任意一点；对移动关节，$\boldsymbol\omega_i = \mathbf 0$，$\mathbf v_i$为运动的单位方向。于是
$$
T(\boldsymbol\theta) = e^{[\mathcal S_1]\theta_1}\,e^{[\mathcal S_2]\theta_2}\cdots e^{[\mathcal S_n]\theta_n}\,M .
$$ {#eq-poe}
:::

::: proof
最终位姿只取决于关节值，而与各关节运动的先后次序无关，因此从末端向内依次移动各关节。从零位出发，位姿为$M$。单独把关节$n$转到$\theta_n$：连杆$1, \dots, n-1$仍处于零位，因此关节$n$的轴线正在$\mathcal S_n$所描述的位置，末端执行器经历旋量运动$e^{[\mathcal S_n]\theta_n}$；其位姿变为$e^{[\mathcal S_n]\theta_n}M$（在空间坐标系中描述的运动左乘）。再把关节$n-1$转到$\theta_{n-1}$。连杆$1,\dots,n-2$仍处于零位，因此关节$n-1$的轴线仍是$\mathcal S_{n-1}$；整个外侧组件（连杆$n-1$和$n$，不论处于何种位形）作刚体运动$e^{[\mathcal S_{n-1}]\theta_{n-1}}$，得到$e^{[\mathcal S_{n-1}]\theta_{n-1}}e^{[\mathcal S_n]\theta_n}M$。一直继续到关节 1，就得到[[#eq-poe]]。关键假设是每个旋量轴都在零位位形下计算；关节$1,\dots,i-1$运动时关节$i$的轴线会移动，但按这一次序，在移动关节$i$时它们还没有动。
:::

::: algorithm 用指数积公式求正运动学 {#alg-poe}
1. 固定$\{s\}$和$\{b\}$，并选定零位位形（通常取各轴与$\{s\}$对齐的伸展位姿）。
2. 通过观察写出$M = T_{sb}(\mathbf 0)$。
3. 对每个关节，在零位下：读出轴线方向$\boldsymbol\omega_i$及轴上一点$\mathbf q_i$，构成$\mathcal S_i = (\boldsymbol\omega_i, -\boldsymbol\omega_i\times\mathbf q_i)$（转动关节）或$(\mathbf 0, \hat{\mathbf v}_i)$（移动关节）。
4. 用[[robotics/rigid-motions#eq-screw-exp|旋量指数公式]]计算每个$e^{[\mathcal S_i]\theta_i}$，并按[[#eq-poe]]相乘。
:::

::: example 用指数积公式求肘型机械臂 {#ex-poe-elbow}
用 PoE 重新计算[[#ex-elbow]]，取$\{s\}$为 D-H 基坐标系，$\{b\}$为 D-H 坐标系 3。
::: solution
**零位位形**$\boldsymbol\theta = \mathbf 0$：机械臂在肩高处沿$\hat{\mathbf x}_s$水平伸直。此时坐标系 3 位于$(a_2 + a_3, 0, d_1) = (1.1, 0, 0.5)\,\mathrm m$，姿态与 D-H 坐标系 1 相同，为$\mathrm{Rot}_x(90^\circ)$：
$$
M = \begin{bmatrix} 1 & 0 & 0 & 1.1\\ 0 & 0 & -1 & 0\\ 0 & 1 & 0 & 0.5\\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
**旋量轴。** 腰关节轴为过原点的$\hat{\mathbf z}_s$：$\mathcal S_1 = (0,0,1,\ 0,0,0)$。肩关节轴为$\mathbf z_1 = \mathrm{Rot}_x(90^\circ)\hat{\mathbf z} = (0,-1,0)$，过$\mathbf q_2 = (0,0,0.5)$：$\boldsymbol\omega_2\times\mathbf q_2 = (-0.5, 0, 0)$，故$\mathcal S_2 = (0,-1,0,\ 0.5, 0, 0)$。肘关节轴与之平行，过$\mathbf q_3 = (0.6, 0, 0.5)$：$\boldsymbol\omega_3\times\mathbf q_3 = (-0.5, 0, 0.6)$，故$\mathcal S_3 = (0,-1,0,\ 0.5, 0, -0.6)$。（轴取$-\hat{\mathbf y}$，使正的$\theta_2$抬起手臂，与 D-H 模型一致。）
**乘积。** 数值计算$e^{[\mathcal S_1]\pi/6}e^{[\mathcal S_2]\pi/4}e^{[\mathcal S_3](-\pi/3)}M$，得到位置$(0.7857, 0.4536, 0.7949)\,\mathrm m$，旋转矩阵与$A_1A_2A_3$逐元素相同（第一列为$(0.8365, 0.4830, -0.2588)$）。两种方法是同一函数的两种因式分解。
为什么成立——手算位置即可看出：$e^{[\mathcal S_3]\theta_3}$使前臂绕肘部转动；$e^{[\mathcal S_2]\theta_2}$再使整条手臂绕肩部转动；$e^{[\mathcal S_1]\theta_1}$使全部绕竖直轴摆动——与[[#thm-poe]]证明中的运动次序相同。
:::
:::

::: example 用指数积公式求平面 3R 机械臂 {#ex-poe-3r}
取$\{b\}$在工具处，求[[#ex-3r]]的 3R 机械臂的$M$和旋量轴，并证明 PoE 重现[[#eq-3r-planar]]。
::: solution
零位时机械臂沿$\hat{\mathbf x}_s$放置，因此$M$的$R = I$，$\mathbf p = (0.8, 0, 0)\,\mathrm m$。所有轴都是$\hat{\mathbf z}$，分别通过$(0,0,0)$、$(0.4,0,0)$和$(0.7,0,0)$；由$\hat{\mathbf z}\times(q_x,0,0) = (0, q_x, 0)$，
$$
\mathcal S_1 = (0,0,1,\ 0,0,0),\quad \mathcal S_2 = (0,0,1,\ 0,-0.4,0),\quad \mathcal S_3 = (0,0,1,\ 0,-0.7,0).
$$
每个因子$e^{[\mathcal S_i]\theta_i}$是绕点$\mathbf q_i$转$\theta_i$的平面转动（节距为零）。把它们作用于零位的工具点$(0.8, 0)$：绕$(0.7,0)$转$\theta_3$得$(0.7 + 0.1c_3, 0.1s_3)$；再绕$(0.4,0)$转$\theta_2$得$(0.4 + 0.3c_2 + 0.1c_{23},\ 0.3s_2 + 0.1s_{23})$；再绕原点转$\theta_1$得$(0.4c_1 + 0.3c_{12} + 0.1c_{123},\ \dots)$——恰为[[#eq-3r-planar]]。姿态为$\mathrm{Rot}_z(\theta_1+\theta_2+\theta_3)$。在$(30^\circ, 45^\circ, -30^\circ)$处数值乘积给出$(0.4948, 0.5605)\,\mathrm m$和$\phi = 45^\circ$，与前面相同。
:::
:::

PoE 有三个实用上的优点。转动关节和移动关节用同一个公式处理；不需要连杆坐标系，因此模型可以直接从零位位姿的图纸上读出；旋量轴随几何参数连续变化，适合运动学标定。D-H 的优点是紧凑（每个关节四个数而不是六个），而且大多数机器人数据手册至今仍给出 D-H 参数。

::: remark 物体形式
把坐标系移到末端执行器，得到**物体形式**$T(\boldsymbol\theta) = M\,e^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$，其中$\mathcal B_i$是零位时在$\{b\}$中表示的关节$i$的旋量轴。它由$Me^{[\mathcal B]\theta}M^{-1} = e^{M[\mathcal B]M^{-1}\theta}$推出（[[#exr-body]]）。空间形式自然地对应空间雅可比矩阵，物体形式对应[[robotics/jacobians]]中的物体雅可比矩阵。
:::

## 工作空间 {#sec-workspace}

::: definition 可达工作空间与灵巧工作空间 {#def-workspace}
机械臂的**可达工作空间**是工具点至少能以一种姿态到达的点的集合；**灵巧工作空间**是能以任意姿态到达的点的集合。两者都由正运动学在允许的关节范围内计算得到。
:::

::: proposition 平面 2R 机械臂的工作空间 {#prop-2r-workspace}
不计关节限位时，$L_1, L_2 > 0$的平面 2R 机械臂的可达工作空间是闭圆环
$$
\lvert L_1 - L_2\rvert \le \sqrt{x^2 + y^2} \le L_1 + L_2 ,
$$
且末端到基座的距离只取决于肘关节角：$r^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$。
:::

::: proof
由[[#eq-3r-planar]]取$L_3 = 0$，$x^2 + y^2 = L_1^2(c_1^2 + s_1^2) + L_2^2(c_{12}^2 + s_{12}^2) + 2L_1L_2(c_1c_{12} + s_1s_{12}) = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$，因为$c_1c_{12} + s_1s_{12} = \cos(\theta_{12} - \theta_1)$。当$\theta_2$遍历一整周时，$\cos\theta_2$取遍$[-1,1]$中的每个值，因此$r^2$取遍$[(L_1 - L_2)^2, (L_1 + L_2)^2]$中的每个值。对给定的$r$（及$\theta_2$），末端位于极角$\theta_1 + \beta(\theta_2)$处，$\beta$为固定偏置，而$\theta_1$可以自由取值，因此半径为$r$的圆上每一点都能到达。故工作空间恰为该圆环。
:::

边界圆$r = L_1 + L_2$（手臂伸直）和$r = \lvert L_1 - L_2\rvert$（手臂折叠）是机械臂处于**奇异**的地方——末端不能沿径向向外（或向内）运动——这将由[[robotics/jacobians]]的雅可比矩阵说明。[[#ex-3r]]中 3R 机械臂的灵巧工作空间是把圆环两侧各收缩$L_3$：只有当腕点$(x - L_3\cos\phi, y - L_3\sin\phi)$对每个$\phi$都在 2R 圆环内时，一个点才能从每个方向接近，即$\lvert L_1 - L_2\rvert + L_3 \le r \le L_1 + L_2 - L_3$，此处为$0.2 \le r \le 0.6\,\mathrm m$。

::: widget plot
f: sqrt(L1^2 + L2^2 + 2*L1*L2*cos(x))
x: -pi, pi
y: 0, 2
sliders: L1=0.6:0.1:1:0.05; L2=0.4:0.1:1:0.05
labels: r(\theta_2)\ \text{(m)}
piticks: true
caption: 2R 机械臂末端到基座的距离随肘关节角$\theta_2$的变化，连杆长度$L_1$、$L_2$以米计。最大值$L_1 + L_2$出现在$\theta_2 = 0$（伸直），最小值$\lvert L_1 - L_2\rvert$出现在$\theta_2 = \pm\pi$（折叠）。令$L_1 = L_2$，内半径降为零：连杆等长的机械臂能够到达自己的基座。注意曲线在$\theta_2 = 0$附近多么平坦：在那里肘关节角大幅改变，伸距却几乎不变，这正是边界奇异位形的运动学特征。
:::

关节限位会削减圆环。若肘关节只能在$-150^\circ \le \theta_2 \le 150^\circ$内运动，最小伸距就是$\sqrt{L_1^2 + L_2^2 + 2L_1L_2\cos150^\circ}$而不是$\lvert L_1 - L_2\rvert$；若肩关节的范围受限，圆环就变成扇环。实际机械臂还会因自碰撞和安装面而损失工作空间。

::: widget parametric
fx: cos(t) + 0.7*cos((1 + k)*t)
fy: sin(t) + 0.7*sin((1 + k)*t)
t: 0, 1.5
x: -1.8, 1.8
y: -1.8, 1.8
sliders: k=1:-3:3:0.1
caption: 当各关节在关节空间中沿直线运动，即$\theta_1 = t$，$\theta_2 = k\,t$，$0 \le t \le 1.5\,\mathrm{rad}$时，2R 机械臂（$L_1 = 1$，$L_2 = 0.7$）末端的路径。只有$k = 0$（肘关节锁定）时末端路径才是圆；其他$k$下它是一条既非直线也非圆的曲线。关节空间中的直线是任务空间中的曲线，反之亦然——这就是轨迹规划器必须决定在哪个空间中插值的原因（[[robotics/trajectory-planning]]）。
:::

::: quiz
一个 7R 机械臂有七个转动关节。下列哪个说法正确？
- [ ] 对每个关节向量，其正运动学有多个解。
- [x] 其位形空间的维数为 7，因此对一个可达的工具位姿，一般存在一个单参数族的关节向量。
- [ ] 它不能用 Denavit–Hartenberg 参数描述。
- [ ] 其任务空间的维数为 7。
::: solution
正运动学是一个函数：一个关节向量恰好给出一个位姿。位形空间每个关节一维（共 7 维）；任务空间$SE(3)$为 6 维，因此给出某一固定位姿的关节向量集合一般是一维的——即冗余机械臂的“自运动”，例如手保持不动而肘部摆动。任何由 R 和 P 关节组成的串联链都有 D-H 描述。
:::
:::

::: history
在美国西北大学研究空间连杆机构的雅克·德纳维特（Jacques Denavit）和理查德·哈滕伯格（Richard Hartenberg）于 1955 年在《应用力学杂志》（*Journal of Applied Mechanics*）上发表了《基于矩阵的低副机构运动学记法》（"A kinematic notation for lower-pair mechanisms based on matrices"）。他们的四参数描述被第一代计算机控制的机械臂所采用；理查德·保罗（Richard Paul）1981 年的著作《机器人操作臂：数学、编程与控制》（*Robot Manipulators: Mathematics, Programming, and Control*）使$A$矩阵及其乘积成为机械臂编程的标准方法。1984 年，罗杰·布罗克特（Roger Brockett）证明任何串联链的正运动学都可以写成关节运动旋量的矩阵指数之积，这一方法在 Murray、Li 与 Sastry（1994）和 Lynch 与 Park（2017）的教科书中得到发展。
:::

::: summary
- 正运动学把关节变量映射为末端执行器位姿，$\boldsymbol\theta\mapsto T(\boldsymbol\theta)\in SE(3)$；它是唯一的，并且是每个关节一个变换的乘积。具有$n$个单自由度关节的串联机械臂有$n$个自由度；要实现任意位姿需要六个。
- D-H 约定：$\mathbf z_{i-1}$沿关节$i$，$\mathbf x_i$沿公垂线；每个连杆四个参数$(a_i,\alpha_i,d_i,\theta_i)$，$A_i = \mathrm{Rot}_z(\theta_i)\mathrm{Trans}_z(d_i)\mathrm{Trans}_x(a_i)\mathrm{Rot}_x(\alpha_i)$，$T_{0n} = A_1\cdots A_n$。要弄清资料采用哪种 D-H 约定。
- PoE：$T(\boldsymbol\theta) = e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_n]\theta_n}M$，旋量轴在零位位形下读出；转动关节$\mathcal S = (\boldsymbol\omega, -\boldsymbol\omega\times\mathbf q)$，移动关节$(\mathbf 0, \hat{\mathbf v})$。
- D-H 和 PoE 给出相同的结果；务必在一个能手算预知结果的位形上检验模型。
- 2R 工作空间是圆环$\lvert L_1 - L_2\rvert \le r \le L_1 + L_2$，$r^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$；关节限位和偏置使之缩小，其边界是奇异位形。
:::

## 习题

::: exercise 2R 机械臂的末端 {#exr-2r level=1 check="0.5964"}
一平面 2R 机械臂的$L_1 = 0.5\,\mathrm m$，$L_2 = 0.4\,\mathrm m$，位于$\theta_1 = 60^\circ$，$\theta_2 = -90^\circ$。求末端位置。（输入$x$，单位 m，保留四位小数。）
::: solution
绝对角为$60^\circ$和$-30^\circ$：$x = 0.5\cos60^\circ + 0.4\cos(-30^\circ) = 0.25 + 0.3464 = 0.5964\,\mathrm m$，$y = 0.5\sin60^\circ + 0.4\sin(-30^\circ) = 0.4330 - 0.2 = 0.2330\,\mathrm m$。校核：$r = 0.640\,\mathrm m = \sqrt{0.25 + 0.16 + 0.4\cos(-90^\circ)} = \sqrt{0.41}$ ✓。
:::
:::

::: exercise 自由度 {#exr-dof level=1 check="8"}
一条串联链由四个转动关节、一个移动关节和一个球副（三个转动自由度）组成。它有多少个自由度？（输入该数。）
::: solution
有$N = 7$个构件（包括基座）和$J = 6$个关节，格吕布勒公式给出$m = 6(7 - 1 - 6) + (4\cdot1 + 1 + 3) = 8$。对开链，这就是各关节自由度之和。对空间作业而言，该机械臂冗余二度。
:::
:::

::: exercise 由肘关节角求伸距 {#exr-reach level=1 check="0.9539"}
一 2R 机械臂的$L_1 = 0.6\,\mathrm m$，$L_2 = 0.5\,\mathrm m$。当$\theta_2 = -60^\circ$时，末端离基座多远？（输入$r$，单位 m，保留四位小数。）
::: solution
$r = \sqrt{0.36 + 0.25 + 2(0.6)(0.5)\cos(-60^\circ)} = \sqrt{0.91} = 0.9539\,\mathrm m$，与$\theta_1$无关（[[#prop-2r-workspace]]）。它介于$0.1$与$1.1\,\mathrm m$之间 ✓。
:::
:::

::: exercise 圆柱坐标型机器人 {#exr-cyl level=2 check="0.2165"}
一圆柱坐标型（RPP）机器人的 D-H 参数行$(a, \alpha, d, \theta)$为：$(0, 0, d_1, \theta_1^*)$、$(0, -90^\circ, d_2^*, 0)$、$(0, 0, d_3^*, 0)$，$d_1 = 0.30\,\mathrm m$。求$T_{03}$的符号表达式，以及$\theta_1 = 30^\circ$、$d_2 = 0.40\,\mathrm m$、$d_3 = 0.25\,\mathrm m$时的工具位置。（输入$y$坐标，单位 m，保留四位小数。）
::: solution
$A_1 = \mathrm{Rot}_z(\theta_1)\mathrm{Trans}_z(d_1)$，$A_2 = \mathrm{Trans}_z(d_2)\mathrm{Rot}_x(-90^\circ)$，$A_3 = \mathrm{Trans}_z(d_3)$。转动$\mathrm{Rot}_x(-90^\circ)$使$\mathbf z_2$变为水平：$\mathrm{Rot}_x(-90^\circ)\hat{\mathbf z} = (0, 1, 0)$，故$\mathbf z_2 = \mathbf y_1$。相乘得
$$
T_{03} = \begin{bmatrix} c_1 & 0 & -s_1 & -s_1d_3\\ s_1 & 0 & c_1 & c_1d_3\\ 0 & -1 & 0 & d_1 + d_2\\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
数值上$\mathbf p = (-0.25\sin30^\circ,\ 0.25\cos30^\circ,\ 0.70) = (-0.125,\ 0.2165,\ 0.70)\,\mathrm m$。校核：到立柱的径向距离为$d_3 = 0.25\,\mathrm m$，高度为$d_1 + d_2$——正是圆柱坐标，这种机器人因此得名。
:::
:::

::: exercise PoE 的旋量轴 {#exr-screw level=2 check="-0.6"}
对[[#ex-poe-elbow]]的肘型机械臂，由$\boldsymbol\omega_3 = (0,-1,0)$和$\mathbf q_3 = (a_2, 0, d_1)$符号推导$\mathcal S_3$，并用运动旋量的速度解释校核结果。（对$a_2 = 0.6\,\mathrm m$，输入$\mathbf v_3$的$z$分量，单位 m。）
::: solution
$\boldsymbol\omega_3\times\mathbf q_3 = (0,-1,0)\times(a_2, 0, d_1) = \big((-1)d_1 - 0,\ 0\cdot a_2 - 0\cdot d_1,\ 0 - (-1)a_2\big) = (-d_1, 0, a_2)$，故$\mathbf v_3 = (d_1, 0, -a_2) = (0.5, 0, -0.6)\,\mathrm m$。速度校核：若前臂以$1\,\mathrm{rad/s}$绕肘关节轴转动，（延伸的）前臂上位于基座原点的点的速度为$\boldsymbol\omega\times(\mathbf 0 - \mathbf q_3) = -(-d_1, 0, a_2) = (d_1, 0, -a_2)$：它向前运动（它在轴线下方$d_1$处）并向下运动（它在轴线后方$a_2$处）。✓
:::
:::

::: exercise SCARA 的伸距 {#exr-scara level=2 check="0.4610"}
对[[#ex-scara]]的 SCARA 机械臂，当$\theta_2 = 90^\circ$（$\theta_1$任意）时，工具到基座轴线的水平距离是多少？并求不计关节限位时水平伸距的范围。（输入该距离，单位 m，保留四位小数。）
::: solution
水平部分是一个 2R 机械臂，故$r^2 = a_1^2 + a_2^2 + 2a_1a_2\cos\theta_2 = 0.35^2 + 0.30^2 + 0 = 0.2125$，$r = 0.461\,\mathrm m$。范围为$a_1 - a_2 = 0.05\,\mathrm m$到$a_1 + a_2 = 0.65\,\mathrm m$（实际上 SCARA 的肘关节范围限于约$\pm 150^\circ$，这会提高最小值）。
:::
:::

::: exercise 指数积公式的物体形式 {#exr-body level=3}
证明$T(\boldsymbol\theta) = M e^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$，其中$[\mathcal B_i] = M^{-1}[\mathcal S_i]M$，并解释$\mathcal B_i$的含义。对[[#ex-poe-3r]]的平面 3R 机械臂计算$\mathcal B_1$。
::: solution
对任意可逆矩阵$P$和方阵$A$，$Pe^{A}P^{-1} = e^{PAP^{-1}}$（对级数的每一项作共轭）。因此$e^{[\mathcal S_i]\theta_i}M = M\,M^{-1}e^{[\mathcal S_i]\theta_i}M = M e^{M^{-1}[\mathcal S_i]M\,\theta_i}$。把$M$从[[#eq-poe]]的右端逐个因子地移到左端：$e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_n]\theta_n}M = e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_{n-1}]\theta_{n-1}}Me^{[\mathcal B_n]\theta_n} = \cdots = Me^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$。矩阵$M^{-1}[\mathcal S_i]M$是同一旋量轴在零位末端执行器坐标系$\{b\}$中的表示：$\mathcal B_i$是从工具看到的关节$i$的轴线。对 3R 机械臂，$M = (I, (0.8,0,0))$，所以在$\{b\}$中第一根轴是过点$(-0.8, 0, 0)$的$\hat{\mathbf z}$：$\mathcal B_1 = (0,0,1,\ -\hat{\mathbf z}\times(-0.8,0,0)) = (0,0,1,\ 0, 0.8, 0)$。校核：整条手臂以$1\,\mathrm{rad/s}$绕基座转动时，工具（位于$\{b\}$的原点）以$0.8\,\mathrm{m/s}$沿$+\mathbf y_b$运动 ✓。
:::
:::

::: exercise 平面机械臂的尺寸设计 {#exr-size level=3 check="0.6"}
一平面 2R 机械臂必须能到达内半径$0.2\,\mathrm m$、外半径$1.0\,\mathrm m$的圆环内的每一点，且不超出该范围（以保持紧凑）。(a) 求$L_1$和$L_2$，$L_1 \ge L_2$。(b) 由于布线，肘关节被限制在$\lvert\theta_2\rvert \le 150^\circ$。此时内半径是多少？如何恢复所要求的$0.2\,\mathrm m$？(c) 讨论在两个边界附近还有哪些因素限制有效工作空间。（输入$L_1$，单位 m。）
::: solution
(a) 由$L_1 + L_2 = 1.0$和$L_1 - L_2 = 0.2$得$L_1 = 0.6\,\mathrm m$，$L_2 = 0.4\,\mathrm m$。
(b) $r_{\min} = \sqrt{0.36 + 0.16 + 2(0.24)\cos150^\circ} = \sqrt{0.1043} = 0.323\,\mathrm m$：关节限位去掉了$0.2 < r < 0.323\,\mathrm m$这一环带。同样总长的另一种分配能否恢复$0.2\,\mathrm m$？当$L_1 + L_2 = 1$时，$r_{\min}^2 = L_1^2 + L_2^2 + 2L_1L_2\cos150^\circ = (L_1 + L_2)^2 - 2L_1L_2(1 - \cos150^\circ) = 1 - 3.732\,L_1L_2$，它在$L_1L_2$最大即$L_1 = L_2 = 0.5\,\mathrm m$时最小：$r_{\min} = \sqrt{1 - 0.933} = 0.259\,\mathrm m$。因此总长$1.0\,\mathrm m$、肘关节范围$\pm150^\circ$的 2R 机械臂都到不了$0.2\,\mathrm m$。补救办法是机械上的：增大肘关节范围（使第二连杆在竖直方向偏置，让两连杆可以相互折过，许多 SCARA 就是这样做的），增加第三个关节，或接受中心的死区而把作业安排在其外。
(c) 在外边界附近，手臂几乎伸直：雅可比矩阵降秩，因此径向速度需要极大的关节速度，而径向力由结构而非电机承担（利于推压，不利于精确运动）。在内边界附近，手臂折叠时出现同样的情况，而且连杆之间或连杆与基座之间可能发生碰撞。实用的设计把作业安排在圆环中部——[[robotics/jacobians]]中将用可操作度对此加以量化。
:::
:::

## 延伸阅读

Spong、Hutchinson 与 Vidyasagar 按本章所用的约定给出了更多 D-H 参数表的算例（斯坦福机械臂、PUMA 型机械臂、球形手腕）；Craig 采用改进型约定；Lynch 与 Park 以空间形式和物体形式两种方式阐述指数积公式，并附有算例。
