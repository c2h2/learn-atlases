钢支架、混凝土大坝、涡轮叶片和发动机下的橡胶减振垫，都服从同样的三条陈述。每一小块材料都处于平衡；应变由连续的位移场导出，因而各小块在变形后仍能拼合在一起；一点处的应力只取决于该点处的应变。前两条已在[[solid-mechanics/stress-strain-3d]]中建立，对任何材料都成立。第三条——**本构关系**（constitutive law）——正是钢与橡胶的区别所在；对于大多数工程金属、陶瓷、处于玻璃化转变温度以下的聚合物以及在工作范围内的木材，它是线性的：应变加倍，应力也加倍。把这三条陈述放在一起，就得到**线弹性理论**：一组封闭的十五个方程，对应十五个未知场，能够根据物体的形状、支承和载荷预测其内部各处的应力。

[[mechanics-of-materials/stress-strain]]和[[mechanics-of-materials/bending-stress]]中的初等公式——$\sigma = P/A$、$\sigma = My/I$、$\tau = Tr/J$——都是这一理论的近似解，每一个都建立在一个猜测的变形方式之上（"平截面保持为平面"）。本章说明这些猜测从何而来、何时失效。本章建立广义胡克定律以及各弹性常数之间的关系；组装边值问题并证明其解唯一；把平面应力和平面应变这两类二维问题归结为关于**艾里应力函数**的一个四阶方程；并用它精确求解端部受载的悬臂梁和带圆孔的板——后者给出的因子3，正是机械设计中每一张应力集中图表背后的数。

## 广义胡克定律

取一个各向同性材料——其性质与方向无关——的立方体，沿$x$方向以应力$\sigma_x$拉伸。它伸长$\varepsilon_x = \sigma_x/E$，并在侧向收缩$\varepsilon_y = \varepsilon_z = -\nu\sigma_x/E$。如果再沿$y$和$z$方向拉伸，由于响应是线性的，三种效应简单相加。切应力$\tau_{xy}$只产生切应变$\gamma_{xy} = \tau_{xy}/G$：在各向同性固体中，剪切没有可"偏好"的方向，因而不会引起沿坐标轴的伸长；正应力也不会改变$x$与$y$之间的直角。

::: definition 各向同性固体的广义胡克定律 {#def-hooke}
对于弹性模量为$E$、泊松比为$\nu$、切变模量为$G$的线弹性各向同性材料，一般应力状态与均匀温度变化$\Delta T$（线膨胀系数为$\alpha$）共同产生的应变为
$$
\begin{aligned}
\varepsilon_x &= \frac{1}{E}\bigl[\sigma_x - \nu(\sigma_y + \sigma_z)\bigr] + \alpha\,\Delta T, &
\gamma_{yz} &= \frac{\tau_{yz}}{G},\\
\varepsilon_y &= \frac{1}{E}\bigl[\sigma_y - \nu(\sigma_z + \sigma_x)\bigr] + \alpha\,\Delta T, &
\gamma_{zx} &= \frac{\tau_{zx}}{G},\\
\varepsilon_z &= \frac{1}{E}\bigl[\sigma_z - \nu(\sigma_x + \sigma_y)\bigr] + \alpha\,\Delta T, &
\gamma_{xy} &= \frac{\tau_{xy}}{G}.
\end{aligned}
$$ {#eq-hooke}
其中$\gamma_{ij}$是工程切应变，等于张量分量$\varepsilon_{ij}$的两倍。用张量记号，$\delta_{ij}$为克罗内克（Kronecker）符号，
$$
\varepsilon_{ij} = \frac{1+\nu}{E}\,\sigma_{ij} - \frac{\nu}{E}\,\sigma_{kk}\,\delta_{ij} + \alpha\,\Delta T\,\delta_{ij}.
$$
:::

张量形式表明，为与$\gamma_{xy} = 2\varepsilon_{xy} = \tau_{xy}/G$一致，剪切部分需要$(1+\nu)/E = 1/(2G)$，因此$E$、$\nu$、$G$中只有**两个**是独立的：

$$
G = \frac{E}{2(1+\nu)}.
$$ {#eq-G}

这不是额外的假设，而是各向同性的推论。一个简短的证明：在$xy$坐标系中的纯剪切状态$\tau$，在转过$45°$的坐标系中是一条对角线方向受拉$\tau$、另一条受压$-\tau$（[[mechanics-of-materials/stress-transformation]]）。在转动后的坐标系中应用胡克定律，得对角线方向的应变$(\tau + \nu\tau)/E$，而应变变换公式表明它等于$\gamma_{xy}/2$；因此$\gamma_{xy} = 2(1+\nu)\tau/E$。

### 反解定律：拉梅常数

从[[#eq-hooke]]解出应力（暂令$\Delta T = 0$），得到场方程中使用的形式。把三个线应变方程相加可知，**体积应变**$e = \varepsilon_x + \varepsilon_y + \varepsilon_z$——一阶近似下体积的相对变化——只取决于平均应力：

$$
e = \frac{1-2\nu}{E}\,(\sigma_x + \sigma_y + \sigma_z) = \frac{\sigma_m}{K},
\qquad \sigma_m = \tfrac13(\sigma_x + \sigma_y + \sigma_z), \qquad K = \frac{E}{3(1-2\nu)}.
$$ {#eq-bulk}

::: definition 拉梅常数与体积模量 {#def-lame}
**拉梅常数**$\lambda$和$\mu$由胡克定律的逆形式定义，
$$
\sigma_{ij} = \lambda\, e\,\delta_{ij} + 2\mu\,\varepsilon_{ij},
\qquad\text{例如}\quad
\sigma_x = \lambda e + 2\mu\varepsilon_x,\quad \tau_{xy} = \mu\gamma_{xy},
$$ {#eq-lame}
于是$\mu = G$，且
$$
\lambda = \frac{E\nu}{(1+\nu)(1-2\nu)}, \qquad
K = \lambda + \tfrac23\mu = \frac{E}{3(1-2\nu)}, \qquad
E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}, \qquad
\nu = \frac{\lambda}{2(\lambda + \mu)}.
$$
**体积模量**$K$把平均应力与体积变化联系起来，$\sigma_m = K e$。$E, \nu, G, K, \lambda$中任意两个确定其余各个。
:::

验证$\lambda$的表达式：由[[#eq-hooke]]，$\varepsilon_x = [(1+\nu)\sigma_x - \nu\cdot 3\sigma_m]/E$，所以$\sigma_x = \frac{E}{1+\nu}\varepsilon_x + \frac{3\nu}{1+\nu}\sigma_m = 2G\varepsilon_x + \frac{3\nu K}{1+\nu}e$，而$\frac{3\nu K}{1+\nu} = \frac{E\nu}{(1+\nu)(1-2\nu)} = \lambda$。

::: proposition 泊松比的界限 {#prop-nu-bounds}
若各向同性线弹性材料在任何变形中储存的应变能都为正，则$G > 0$且$K > 0$，从而
$$
-1 < \nu < \tfrac12 .
$$
:::

::: proof
线弹性固体的应变能密度为$U_0 = \tfrac12\sigma_{ij}\varepsilon_{ij}$（应力从零开始一路所做的功，见[[solid-mechanics/energy-methods]]）。把应变分解为体积部分和**偏斜**部分，$\varepsilon_{ij} = \tfrac13 e\,\delta_{ij} + \varepsilon'_{ij}$，$\varepsilon'_{kk} = 0$。由[[#eq-lame]]，$\sigma_{ij} = K e\,\delta_{ij} + 2G\varepsilon'_{ij}$，而由于$\delta_{ij}\varepsilon'_{ij} = \varepsilon'_{kk} = 0$，交叉项消失：
$$
U_0 = \tfrac12 K e^2 + G\,\varepsilon'_{ij}\varepsilon'_{ij}.
$$
纯体积变化（$\varepsilon' = 0$，$e \ne 0$）给出$U_0 = \tfrac12 K e^2$，仅当$K > 0$时为正；纯畸变（$e = 0$）给出$U_0 = G\varepsilon'_{ij}\varepsilon'_{ij}$，仅当$G > 0$时为正。而$G = E/[2(1+\nu)] > 0$，$K = E/[3(1-2\nu)] > 0$。它们的比值$K/G = 2(1+\nu)/[3(1-2\nu)]$必须为正，这要求$1 + \nu$与$1 - 2\nu$同号；两者同为负是不可能的（要同时满足$\nu < -1$和$\nu > \tfrac12$），所以两者都为正：$-1 < \nu < \tfrac12$。再加上$G > 0$，也得出$E > 0$。
:::

实际材料都远在界限之内：金属的$\nu \approx 0.27$–$0.35$，玻璃和陶瓷为$0.2$–$0.25$，软木约为$0$（这就是它塞住瓶口而不鼓胀的原因），橡胶为$0.499\ldots$——几乎不可压缩，以致$K$比$G$大三个数量级。$\nu < 0$的人造泡沫和点阵结构（拉胀材料）受拉时会变宽。下图显示了$K$和$\lambda$在$\nu = \tfrac12$附近急剧增大的情形。

::: widget plot
f: 1/(2*(1+x)); 1/(3*(1-2*x)); x/((1+x)*(1-2*x))
x: -0.9, 0.49
y: -2, 6
labels: G/E; K/E; \lambda/E
hlines: 0
vlines: 0.3
caption: 弹性常数$G$、$K$和$\lambda$除以$E$后作为泊松比$\nu$（横轴）的函数。虚线标出典型金属$\nu = 0.3$，此时$G \approx 0.38E$，$K \approx 0.83E$。向$\nu = 0.5$移动，可以看到$K/E$和$\lambda/E$发散：像橡胶这样几乎不可压缩的材料，几乎刚性地抵抗体积变化，却很容易剪切。向$\nu = -1$移动，$G$增大而$K$减小；还要注意，$\nu < 0$时$\lambda$为负。
:::

::: example 结构钢的弹性常数 {#ex-constants}
结构钢的$E = 200\,\mathrm{GPa}$，$\nu = 0.30$。求$G$、$\lambda$和$K$，以及"侧限模量"$M = \lambda + 2\mu$——它是杆在侧面被刚性约束的情况下受压时应力与应变之比。
::: solution
$$
\begin{aligned}
G = \mu &= \frac{E}{2(1+\nu)} = \frac{200}{2.6}\,\mathrm{GPa} = 76.9\,\mathrm{GPa},\\
\lambda &= \frac{E\nu}{(1+\nu)(1-2\nu)} = \frac{200 \times 0.30}{1.30 \times 0.40}\,\mathrm{GPa} = 115.4\,\mathrm{GPa},\\
K &= \frac{E}{3(1-2\nu)} = \frac{200}{1.2}\,\mathrm{GPa} = 166.7\,\mathrm{GPa},\\
M &= \lambda + 2\mu = 115.4 + 153.8 = 269.2\,\mathrm{GPa}.
\end{aligned}
$$
校核：$K = \lambda + \tfrac23\mu = 115.4 + 51.3 = 166.7\,\mathrm{GPa}$ ✓，$\nu = \lambda/[2(\lambda+\mu)] = 115.4/384.6 = 0.300$ ✓。侧限模量比$E$高35%：不能侧向膨胀的杆更刚，因为现在一部分载荷由体积变化承担，而材料以$K$抵抗体积变化。对于橡胶（$\nu \to 0.5$），这一比值变得极大，这就是为什么粘结在钢板之间的薄橡胶垫在剪切下很软、在压缩下却很刚——这正是叠层橡胶桥梁支座的原理。
:::
:::

::: example 受载块体的体积变化 {#ex-volume}
一个边长$100\,\mathrm{mm}$的铝立方体（$E = 70\,\mathrm{GPa}$，$\nu = 1/3$）承受$\sigma_x = 80\,\mathrm{MPa}$、$\sigma_y = -40\,\mathrm{MPa}$、$\sigma_z = -20\,\mathrm{MPa}$，无切应力。求三个线应变和体积变化。
::: solution
由[[#eq-hooke]]，取$E = 70\,000\,\mathrm{MPa}$：
$$
\begin{aligned}
\varepsilon_x &= \frac{80 - \tfrac13(-40 - 20)}{70\,000} = \frac{100}{70\,000} = 1.429\times10^{-3},\\
\varepsilon_y &= \frac{-40 - \tfrac13(-20 + 80)}{70\,000} = \frac{-60}{70\,000} = -0.857\times10^{-3},\\
\varepsilon_z &= \frac{-20 - \tfrac13(80 - 40)}{70\,000} = \frac{-33.3}{70\,000} = -0.476\times10^{-3}.
\end{aligned}
$$
体积应变为$e = (1.429 - 0.857 - 0.476)\times10^{-3} = 0.0952\times10^{-3}$。用[[#eq-bulk]]校核：$K = 70/(3 \times \tfrac13)\,\mathrm{GPa} = 70\,\mathrm{GPa}$，$\sigma_m = (80 - 40 - 20)/3 = 6.67\,\mathrm{MPa}$，$e = 6.67/70\,000 = 0.0952\times10^{-3}$ ✓。体积变化为$\Delta V = eV = 0.0952\times10^{-3} \times 10^{6}\,\mathrm{mm^3} = 95\,\mathrm{mm^3}$——每立方厘米不到十分之一立方毫米，尽管每个单独的应变都要大十倍以上。只要应力有正有负，几乎等体积的大畸变就是典型情况。
:::
:::

::: warning 即使载荷不是三维的，胡克定律也是三维的
弹性力学中最常见的错误，是在有其他正应力存在时写$\varepsilon_x = \sigma_x/E$，或在材料在$z$方向不能膨胀时写$\sigma_z = 0$。厚板、压入轮毂的轴、在刚性零件之间冷却的焊缝——都有侧向约束，会在没有外加载荷的方向上产生应力。写出全部三个线应变，对每个方向判断已知的是**应力**还是**应变**（自由表面：应力为零；刚性约束：应变为零），然后求解。例如，一个完全受约束、温度升高$\Delta T$的块体，$e = 0$，因而有静水应力$\sigma = -E\alpha\,\Delta T/(1-2\nu)$，而不是$-E\alpha\,\Delta T$。
:::

## 弹性力学的边值问题

汇集占据区域$V$、边界为$S$、受体积力$\mathbf{b}$（单位体积，例如重力$\rho\mathbf{g}$）和部分表面上面力作用的物体的场方程：

- **平衡方程**（3个）：$\partial\sigma_{ij}/\partial x_j + b_i = 0$，例如$\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y + \partial\tau_{xz}/\partial z + b_x = 0$。
- **应变–位移关系**（6个）：$\varepsilon_{ij} = \tfrac12(\partial u_i/\partial x_j + \partial u_j/\partial x_i)$。
- **胡克定律**（6个）：[[#eq-lame]]。

未知量是6个应力、6个应变和3个位移：十五个方程，十五个未知量。相容性没有作为单独的方程出现，因为应变是由位移场**定义**的；当只用应力或应变求解问题时，它会重新出现。

::: definition 边界条件 {#def-bcs}
在表面$S$（外法向单位向量为$\mathbf{n}$）的每一部分上，每个方向给定下列条件之一：

- 在$S_t$上的**面力**条件$\sigma_{ij}n_j = \bar t_i$——自由表面有$\bar{\mathbf{t}} = \mathbf{0}$，受压强$p$作用的表面有$\bar{\mathbf{t}} = -p\,\mathbf{n}$；
- 在$S_u$上的**位移**条件$u_i = \bar u_i$——焊接或夹紧的面有$\bar{\mathbf{u}} = \mathbf{0}$；
- **混合**条件——例如无摩擦的滚动支座，其法向位移和切向面力均为零。

当每个表面点上每个分量恰好给定一个条件时，问题是**适定的**。
:::

### 纳维方程

把应变–位移关系代入胡克定律，再把结果代入平衡方程，就消去了应力和应变，剩下关于三个位移分量的三个方程。

::: proposition 纳维位移方程 {#prop-navier}
在承受体积力$\mathbf{b}$的均匀、各向同性线弹性体中，位移场满足
$$
(\lambda + \mu)\,\nabla(\nabla\cdot\mathbf{u}) + \mu\,\nabla^2\mathbf{u} + \mathbf{b} = \mathbf{0}.
$$ {#eq-navier}
:::

::: proof
假设小应变、均匀材料（$\lambda$、$\mu$为常数）和静力平衡。由[[#eq-lame]]和$\varepsilon_{ij} = \tfrac12(u_{i,j} + u_{j,i})$（逗号表示求导），
$$
\sigma_{ij} = \lambda\,u_{k,k}\,\delta_{ij} + \mu\,(u_{i,j} + u_{j,i}).
$$
对$x_j$求导并对$j$求和：
$$
\sigma_{ij,j} = \lambda\,u_{k,ki} + \mu\,u_{i,jj} + \mu\,u_{j,ij}
= (\lambda + \mu)\,u_{j,ji} + \mu\,u_{i,jj},
$$
这里用到了$u_{k,ki} = u_{j,ji}$（哑标改名）和混合偏导数相等。其中$u_{j,j} = \nabla\cdot\mathbf{u} = e$，$u_{i,jj} = (\nabla^2\mathbf{u})_i$。代入$\sigma_{ij,j} + b_i = 0$即得[[#eq-navier]]。
:::

当给定位移时，纳维方程是自然的表述形式，也是几乎所有数值方法的出发点：[[finite-element-method/weak-forms]]中的有限元法求解的就是它的弱形式。当处处给定面力时，用应力来求解往往更容易，此时[[solid-mechanics/stress-strain-3d]]中的六个相容方程经胡克定律改写为应力形式，就成为**贝尔特拉米–米歇尔方程**（Beltrami–Michell equations）；无体积力时为$(1+\nu)\nabla^2\sigma_{ij} + \partial^2\sigma_{kk}/\partial x_i\partial x_j = 0$。下面的艾里应力函数就是这一途径的二维版本。

### 唯一性与圣维南原理

有两个事实使得用"灵感猜测"求弹性力学解成为合理的做法。第一个事实是：任何满足全部方程的场**就是**答案。

::: theorem 弹性解的唯一性 {#thm-unique}
对于应变能密度正定的线弹性体，给定体积力、$S_t$上的面力和$S_u$上的位移的边值问题至多有一个应力场。若$S_u$阻止了刚体运动，则位移场也是唯一的；若$S_u$为空，则位移场在相差一个刚体运动的意义下唯一。
:::

::: proof
设$\mathbf{u}^{(1)}$和$\mathbf{u}^{(2)}$都是问题的解，令$\mathbf{w} = \mathbf{u}^{(1)} - \mathbf{u}^{(2)}$，其应变为$\varepsilon_{ij}$、应力为$\sigma_{ij}$。由于方程是线性的，$\mathbf{w}$是体积力为**零**、$S_t$上面力为零、$S_u$上位移为零的问题的解。考虑积分$\int_S \sigma_{ij}n_j w_i\,dS$。在$S_t$上面力$\sigma_{ij}n_j$为零；在$S_u$上位移$w_i$为零；所以积分为零。由散度定理，
$$
0 = \int_S \sigma_{ij}n_j w_i\,dS = \int_V (\sigma_{ij}w_i)_{,j}\,dV
= \int_V \sigma_{ij,j}\,w_i\,dV + \int_V \sigma_{ij}w_{i,j}\,dV.
$$
由无体积力时的平衡，第一个体积分为零。在第二个积分中，$\sigma_{ij}$是对称的，所以$\sigma_{ij}w_{i,j} = \sigma_{ij}\varepsilon_{ij} = 2U_0$。因此$\int_V 2U_0\,dV = 0$。由于$U_0$处处$\ge 0$且仅当应变为零时为零，在$V$内处处$\varepsilon_{ij} = 0$，从而$\sigma_{ij} = 0$：两个应力场相等。处处应变为零意味着$\mathbf{w}$是刚体运动，如果$S_u$上的支承足够，它就被消除了。
:::

第二个事实涉及那些**没有**被精确满足的边界条件。精确解需要知道受载表面上每一点的面力；而实践中我们只知道螺栓或焊缝施加的合力和合力矩。

::: remark 圣维南原理
如果把作用在弹性体表面一小部分上的力系，换成作用在同一部分上的静力等效力系（合力和合力矩相同），则应力只在该部分附近——大约在受载区域最大尺寸的距离以内——有明显变化。圣维南于1855年提出它，用来论证他的扭转解；它是一条原理，已被无数的解和实验所证实，只在特殊情形下得到了严格证明。正因为如此，梁的公式在离支座或集中载荷一个梁高之外是准确的，而紧挨着它们就不对了。
:::

## 平面应力与平面应变

许多物体实际上是二维的。在自身平面内受载的薄板，由于两个表面都是自由的，不可能在厚度方向产生显著的应力：这就是**平面应力**，$\sigma_z = \tau_{xz} = \tau_{yz} = 0$。长坝、隧道衬砌或沿长度方向均匀受载的长管，不能沿长度方向变形：这就是**平面应变**，$\varepsilon_z = \gamma_{xz} = \gamma_{yz} = 0$。在这两种情形下，面内的场只依赖于$x$和$y$。

::: definition 平面应力与平面应变 {#def-plane}
在**平面应力**中，$\sigma_z = 0$，面内胡克定律为
$$
\varepsilon_x = \frac{\sigma_x - \nu\sigma_y}{E}, \qquad
\varepsilon_y = \frac{\sigma_y - \nu\sigma_x}{E}, \qquad
\gamma_{xy} = \frac{2(1+\nu)}{E}\,\tau_{xy}, \qquad
\varepsilon_z = -\frac{\nu}{E}(\sigma_x + \sigma_y).
$$
在**平面应变**中，$\varepsilon_z = 0$，这需要面外应力
$$
\sigma_z = \nu(\sigma_x + \sigma_y),
$$ {#eq-sigz}
而面内定律变为
$$
\varepsilon_x = \frac{1-\nu^2}{E}\Bigl(\sigma_x - \frac{\nu}{1-\nu}\sigma_y\Bigr), \qquad
\varepsilon_y = \frac{1-\nu^2}{E}\Bigl(\sigma_y - \frac{\nu}{1-\nu}\sigma_x\Bigr), \qquad
\gamma_{xy} = \frac{2(1+\nu)}{E}\,\tau_{xy}.
$$
两个定律形式相同：**平面应变问题可用平面应力公式求解，只需把$E$和$\nu$换成**
$$
E' = \frac{E}{1-\nu^2}, \qquad \nu' = \frac{\nu}{1-\nu}.
$$ {#eq-plane-swap}
:::

在[[#eq-hooke]]中令$\varepsilon_z = 0$得[[#eq-sigz]]，再把$\sigma_z$代入$\varepsilon_x$的表达式：$E\varepsilon_x = \sigma_x - \nu\sigma_y - \nu^2(\sigma_x + \sigma_y) = (1-\nu^2)\sigma_x - \nu(1+\nu)\sigma_y$，这就是上述形式，平面应变定律由此得出。剪切项不变，因为$2(1+\nu')/E' = 2(1+\nu)/E$——在[[#ex-plane-proof]]中验证这一点。

平面应力和平面应变是一个范围的两端：薄板接近平面应力，厚板在内部接近平面应变、在表面处接近平面应力。这一区别在[[solid-mechanics/fracture-mechanics]]中极为重要，在那里裂纹尖端处的厚度方向约束会改变断裂韧度。

## 艾里应力函数

在无体积力的二维情形中，平衡方程为

$$
\frac{\partial\sigma_x}{\partial x} + \frac{\partial\tau_{xy}}{\partial y} = 0, \qquad
\frac{\partial\tau_{xy}}{\partial x} + \frac{\partial\sigma_y}{\partial y} = 0.
$$

艾里（G. B. Airy）注意到，如果由同一个函数导出三个应力，这两个方程就恒等满足。代价是：平衡方程对之一无所知的相容性，现在变成了对该函数的一个条件。

::: theorem 艾里应力函数与双调和方程 {#thm-airy}
在无体积力的平面应力或平面应变中，令
$$
\sigma_x = \frac{\partial^2\phi}{\partial y^2}, \qquad
\sigma_y = \frac{\partial^2\phi}{\partial x^2}, \qquad
\tau_{xy} = -\frac{\partial^2\phi}{\partial x\,\partial y}.
$$ {#eq-airy}
则对任何光滑的$\phi(x, y)$，平衡都得到满足；而应变相容当且仅当
$$
\nabla^4\phi = \frac{\partial^4\phi}{\partial x^4} + 2\frac{\partial^4\phi}{\partial x^2\,\partial y^2} + \frac{\partial^4\phi}{\partial y^4} = 0 .
$$ {#eq-biharmonic}
该方程不含任何弹性常数：对于给定面力边界条件的单连通物体，面内应力与$E$和$\nu$无关。
:::

::: proof
**平衡。** 由混合偏导数相等，$\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = \phi_{,yyx} - \phi_{,xyy} = 0$，$\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y = -\phi_{,xyx} + \phi_{,xxy} = 0$。

**相容。** 在二维中唯一非平凡的相容方程（[[solid-mechanics/stress-strain-3d]]）为
$$
\frac{\partial^2\varepsilon_x}{\partial y^2} + \frac{\partial^2\varepsilon_y}{\partial x^2} = \frac{\partial^2\gamma_{xy}}{\partial x\,\partial y}.
$$
它可由$\varepsilon_x = u_{,x}$、$\varepsilon_y = v_{,y}$、$\gamma_{xy} = u_{,y} + v_{,x}$得出（两边都等于$u_{,xyy} + v_{,yxx}$）；反之，在单连通区域中，它保证存在单值的位移场。代入平面应力胡克定律和[[#eq-airy]]：
$$
\varepsilon_x = \frac{\phi_{,yy} - \nu\phi_{,xx}}{E}, \qquad
\varepsilon_y = \frac{\phi_{,xx} - \nu\phi_{,yy}}{E}, \qquad
\gamma_{xy} = -\frac{2(1+\nu)}{E}\,\phi_{,xy}.
$$
于是
$$
\frac{1}{E}\bigl(\phi_{,yyyy} - \nu\phi_{,xxyy} + \phi_{,xxxx} - \nu\phi_{,xxyy}\bigr) = -\frac{2(1+\nu)}{E}\,\phi_{,xxyy},
$$
含$\nu$的项相互抵消，剩下$\phi_{,xxxx} + 2\phi_{,xxyy} + \phi_{,yyyy} = 0$。对于平面应变，把$E$、$\nu$换成[[#eq-plane-swap]]中的$E'$、$\nu'$；常数以同样方式抵消，所以[[#eq-biharmonic]]在两种情形下都成立。由于场方程和面力边界条件都不含$E$或$\nu$，应力也不含它们（对单连通物体而言；带孔的物体需要附加条件以保证位移单值，这可能使$\nu$重新出现）。
:::

正是这一与常数无关的结果使**光弹性法**成为可能：在透明塑料模型中测得的应力图案，对同样形状的钢制零件同样成立。在适合孔和圆盘的极坐标$(r, \theta)$中，同一定理表述为

$$
\sigma_r = \frac{1}{r}\frac{\partial\phi}{\partial r} + \frac{1}{r^2}\frac{\partial^2\phi}{\partial\theta^2}, \qquad
\sigma_\theta = \frac{\partial^2\phi}{\partial r^2}, \qquad
\tau_{r\theta} = -\frac{\partial}{\partial r}\Bigl(\frac{1}{r}\frac{\partial\phi}{\partial\theta}\Bigr),
\qquad
\nabla^2 = \frac{\partial^2}{\partial r^2} + \frac{1}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2}.
$$ {#eq-airy-polar}

::: algorithm 逆解法（半逆解法） {#alg-semi-inverse}
1. 根据载荷以及你预期大致正确的梁或板理论，猜测某一应力分量的形式（例如对梁，$\sigma_x$关于$y$线性）。
2. 积分[[#eq-airy]]，求出$\phi$的相应形式，其中含有未知函数或多项式系数。
3. 施加$\nabla^4\phi = 0$来约束这些系数。
4. 在长边界上精确施加面力条件，在短端面上只通过合力和合力矩施加（圣维南原理）。
5. 如有需要，积分应变求出位移，并用支承条件确定刚体位移项。
:::

多项式是最简单的试函数：任何三次及以下的多项式都是双调和的，二次式$\phi = \tfrac12(a x^2 + 2b\,xy + c\,y^2)$给出均匀应力状态$\sigma_x = c$、$\sigma_y = a$、$\tau_{xy} = -b$。更高次的多项式，其系数必须满足[[#eq-biharmonic]]所给出的关系。

### 端部受载的悬臂梁

取长$L$、高$h = 2c$、厚$b$的悬臂梁，$x$沿轴线从自由端量起，$y$从形心轴向上，向下的端部载荷$P$以端面上切向面力的形式作用在$x = 0$处；梁在$x = L$处固定。自由端与$x$处截面之间部分的受力图上，$x = 0$处有向下的载荷$P$，截面上有向上的合剪力$P$和使梁上凸的弯矩$Px$。梁理论给出$\sigma_x = Pxy/I$，其中$I = bh^3/12 = 2bc^3/3$：在自由端为零，线性增长，上侧受拉。

::: example 悬臂梁的精确解 {#ex-cantilever}
求给出$\sigma_x = Pxy/I$且上下表面自由的艾里函数、各应力，以及在固定端轴线水平、形心处横截面竖直（$\partial u/\partial y = 0$）时受载端的挠度。对钢梁计算：$P = 10\,\mathrm{kN}$，$L = 1.0\,\mathrm{m}$，$h = 0.20\,\mathrm{m}$，$b = 0.05\,\mathrm{m}$，$E = 200\,\mathrm{GPa}$，$\nu = 0.3$。
::: solution
**应力函数。** 应力是单位面积上的力；厚度$b$只通过$I = bh^3/12$出现。由$\phi_{,yy} = Pxy/I$，$\phi = Pxy^3/(6I) + f(x)\,y + g(x)$。上下表面不受法向载荷，所以对所有$y$有$\sigma_y = \phi_{,xx} = f''(x)\,y + g''(x) = 0$：$f$和$g$是线性的，且$g$不贡献应力。写$f = a_1 x$（$f$中的常数项同样不产生应力），
$$
\phi = \frac{Pxy^3}{6I} + a_1 xy, \qquad \nabla^4\phi = 0 \text{（每一项关于每个变量至多为三次，且 } \phi_{,xxyy} = 0).
$$
于是$\tau_{xy} = -\phi_{,xy} = -Py^2/(2I) - a_1$。表面$y = \pm c$上无切应力，所以$a_1 = -Pc^2/(2I)$，且
$$
\sigma_x = \frac{Pxy}{I}, \qquad \sigma_y = 0, \qquad \tau_{xy} = \frac{P}{2I}(c^2 - y^2).
$$
端面切应力积分为$b\int_{-c}^{c}\tfrac{P}{2I}(c^2 - y^2)\,dy = \tfrac{Pb}{2I}\cdot\tfrac{4c^3}{3} = P$ ✓。所以初等的弯曲和剪切公式是**精确的**——前提是自由端的载荷按抛物线分布。合力为$P$的任何其他分布只改变端部附近的应力。

**位移。** 平面应力，$\varepsilon_x = u_{,x} = Pxy/(EI)$，$\varepsilon_y = v_{,y} = -\nu Pxy/(EI)$，$\gamma_{xy} = u_{,y} + v_{,x} = P(c^2 - y^2)/(2GI)$。积分前两式，
$$
u = \frac{Px^2y}{2EI} + F(y), \qquad v = -\frac{\nu Pxy^2}{2EI} + H(x).
$$
代入切应变，并把含$x$的项与含$y$的项分开：
$$
\Bigl[\frac{Px^2}{2EI} + H'(x)\Bigr] + \Bigl[F'(y) - \frac{\nu Py^2}{2EI} + \frac{Py^2}{2GI}\Bigr] = \frac{Pc^2}{2GI}.
$$
每个方括号必须是常数，分别为$d$和$e$，$d + e = Pc^2/(2GI)$。积分得$H = -Px^3/(6EI) + dx + h_0$，$F = \nu Py^3/(6EI) - Py^3/(6GI) + ey + k_0$。在$x = L$、$y = 0$处的支承条件：$u = 0$给出$k_0 = 0$；$\partial u/\partial y = 0$给出$PL^2/(2EI) + e = 0$，故$e = -PL^2/(2EI)$，$d = PL^2/(2EI) + Pc^2/(2GI)$；$v = 0$给出$h_0 = PL^3/(6EI) - dL$。因此受载端形心的挠度为
$$
v(0,0) = h_0 = -\frac{PL^3}{3EI} - \frac{Pc^2L}{2GI} = -\Bigl(\frac{PL^3}{3EI} + \frac{3PL}{2AG}\Bigr), \qquad A = bh.
$$
第一项是梁理论的挠度；第二项是梁理论所忽略的**剪切变形**。

**数值。** $I = 0.05 \times 0.2^3/12 = 3.333\times10^{-5}\,\mathrm{m^4}$，$A = 0.01\,\mathrm{m^2}$，$G = 76.9\,\mathrm{GPa}$：
$$
\frac{PL^3}{3EI} = \frac{10^4 \times 1^3}{3 \times 2\times10^{11} \times 3.333\times10^{-5}} = 0.500\,\mathrm{mm}, \qquad
\frac{3PL}{2AG} = \frac{3 \times 10^4 \times 1}{2 \times 0.01 \times 7.69\times10^{10}} = 0.0195\,\mathrm{mm}.
$$
总计$0.520\,\mathrm{mm}$。最大弯曲正应力在固定端，为$PLc/I = 30\,\mathrm{MPa}$；最大切应力在轴线上，为$3P/(2A) = 1.5\,\mathrm{MPa}$。

**合理性检查。** 两项挠度之比为$\frac{3PL/(2AG)}{PL^3/(3EI)} = \frac{3}{4}(1+\nu)\Bigl(\frac{h}{L}\Bigr)^2 = 0.75 \times 1.3 \times 0.04 = 0.039$：跨度为五倍梁高时，剪切使挠度增加3.9%，而修正量随高跨比的平方下降——这正是欧拉–伯努利理论是细长梁理论的确切含义。
:::
:::

::: widget plot
f: 0.75*(1+nu)/x^2
x: 1, 20
y: 0, 0.5
sliders: nu=0.3:0:0.5:0.01
hlines: 0.05
caption: 端部受载悬臂梁的剪切挠度与弯曲挠度之比$\tfrac34(1+\nu)(h/L)^2$随跨高比$L/h$的变化。在5%虚线以上，梁理论会明显低估挠度：对金属而言，这发生在$L/h$小于约5时。拖动滑块：泊松比通过$E/G = 2(1+\nu)$进入，曲线几乎不变——决定梁是否"深"的是几何而不是材料。（对于$E/G$可超过50的复合材料夹层梁，修正要大得多；见[[solid-mechanics/composites]]。）
:::

同样的方法可以求解受均布载荷$w$的简支梁（Timoshenko与Goodier，《弹性理论》（*Theory of Elasticity*））。设跨度为$L$、梁高为$h$，并且这里$y$从形心**向下**量，跨中的弯曲正应力会多出一个三次修正项，
$$
\sigma_x = \frac{M y}{I} + \frac{w}{2I}\Bigl(\frac{2y^3}{3} - \frac{2c^2y}{5}\Bigr),
$$
它在最外层纤维处的值为梁理论应力的$\tfrac{4}{15}(h/L)^2$倍：$L/h = 4$时为1.7%，对普通梁可以忽略。同一个解还包含一个横向应力$\sigma_y$，它从受载面上的$-w$（单位宽度）降到另一面上的零，这是任何梁理论都没有的。

## 带圆孔的板

在受沿$x$方向均匀拉应力$\sigma$作用的宽板中开一个半径为$a$的孔，这是应力集中的奠基性问题。远处的应力是均匀的；在孔边，材料必须绕过空缺传递载荷。利用极坐标形式[[#eq-airy-polar]]，并把远场应力写成极坐标分量——$r$很大时$\sigma_r = \tfrac{\sigma}{2}(1 + \cos2\theta)$，$\tau_{r\theta} = -\tfrac{\sigma}{2}\sin2\theta$——问题就分解为一个轴对称部分和一个按$\cos2\theta$变化的部分。每一部分都用由双调和函数$r^2$、$\ln r$、$r^4\cos2\theta$、$r^2\cos2\theta$、$\cos2\theta$和$r^{-2}\cos2\theta$构成的应力函数求解；确定常数，使孔边无面力并恢复远场，得到

$$
\phi = \frac{\sigma}{4}\bigl(r^2 - 2a^2\ln r\bigr) - \frac{\sigma}{4}\Bigl(r^2 - 2a^2 + \frac{a^4}{r^2}\Bigr)\cos2\theta .
$$

::: proposition 基尔施解 {#prop-kirsch}
在含半径为$a$的无面力圆孔、无穷远处受沿$\theta = 0$方向均匀拉应力$\sigma$作用的无限大板（平面应力或平面应变）中，
$$
\begin{aligned}
\sigma_r &= \frac{\sigma}{2}\Bigl(1 - \frac{a^2}{r^2}\Bigr) + \frac{\sigma}{2}\Bigl(1 - \frac{4a^2}{r^2} + \frac{3a^4}{r^4}\Bigr)\cos2\theta,\\
\sigma_\theta &= \frac{\sigma}{2}\Bigl(1 + \frac{a^2}{r^2}\Bigr) - \frac{\sigma}{2}\Bigl(1 + \frac{3a^4}{r^4}\Bigr)\cos2\theta,\\
\tau_{r\theta} &= -\frac{\sigma}{2}\Bigl(1 + \frac{2a^2}{r^2} - \frac{3a^4}{r^4}\Bigr)\sin2\theta.
\end{aligned}
$$ {#eq-kirsch}
在孔边上$\sigma_\theta = \sigma(1 - 2\cos2\theta)$，在$\theta = \pm90°$处为$3\sigma$，在$\theta = 0°, 180°$处为$-\sigma$：**应力集中因数**为$K_t = 3$。
:::

::: proof
上面的函数$\phi$是若干项之和，每一项都是双调和的（$\nabla^2 r^2 = 4$，$\nabla^2\ln r = 0$；对于$f(r)\cos2\theta$，算子给出$f'' + f'/r - 4f/r^2$，它把$r^2$和$r^{-2}$变为零，把$r^0 = 1$变为$-4/r^2$，而后者乘以$\cos2\theta$本身是调和的）。逐项应用[[#eq-airy-polar]]即得[[#eq-kirsch]]；例如$\sigma_\theta = \phi_{,rr} = \tfrac{\sigma}{4}(2 + 2a^2/r^2) - \tfrac{\sigma}{4}(2 + 6a^4/r^4)\cos2\theta$。**边界条件。** 在$r = a$处：$\sigma_r = 0 + \tfrac{\sigma}{2}(1 - 4 + 3)\cos2\theta = 0$，$\tau_{r\theta} = -\tfrac{\sigma}{2}(1 + 2 - 3)\sin2\theta = 0$，所以孔边是自由的。当$r \to \infty$时：$\sigma_r \to \tfrac{\sigma}{2}(1 + \cos2\theta)$，$\sigma_\theta \to \tfrac{\sigma}{2}(1 - \cos2\theta)$，$\tau_{r\theta} \to -\tfrac{\sigma}{2}\sin2\theta$，这恰好是均匀应力$\sigma_x = \sigma$的极坐标分量（由转角为$\theta$的变换公式）。由[[#thm-unique]]，这就是问题的解。在孔边上，$\sigma_\theta(a,\theta) = \tfrac{\sigma}{2}\cdot2 - \tfrac{\sigma}{2}\cdot4\cos2\theta = \sigma(1 - 2\cos2\theta)$。
:::

沿横向轴线（$\theta = 90°$，$\cos2\theta = -1$），环向应力按下式衰减：

$$
\sigma_\theta = \sigma\Bigl(1 + \frac{a^2}{2r^2} + \frac{3a^4}{2r^4}\Bigr),
\qquad
\sigma_r = \frac{3\sigma}{2}\Bigl(\frac{a^2}{r^2} - \frac{a^4}{r^4}\Bigr).
$$ {#eq-kirsch-axis}

::: widget plot
f: 1 + 1/(2*x^2) + 3/(2*x^4); 1.5*(1/x^2 - 1/x^4)
x: 1, 5
y: 0, 3.2
labels: \sigma_\theta/\sigma; \sigma_r/\sigma
hlines: 1
caption: 沿过孔心且垂直于载荷的直线上的应力随$r/a$的变化。环向应力在孔边为$3\sigma$，在$r = 2a$处降到与远场值相差22%以内，在$r \approx 2.67a$处降到10%以内。应力集中是局部的：其范围与孔的半径成比例，而与板无关。径向应力在孔边为零（自由表面），在$r = \sqrt2\,a$处达到峰值$0.375\sigma$，随后消失。环向应力曲线之下，孔附近多承担的载荷恰好平衡了孔本身无法承担的载荷。
:::

::: example 螺栓孔附近的应力 {#ex-kirsch}
一条承受远场拉应力$\sigma = 100\,\mathrm{MPa}$的宽钢带上有一个直径$20\,\mathrm{mm}$的孔（孔内不受载）。求峰值应力、载荷轴线上孔边处的应力、横向轴线上距孔边$10\,\mathrm{mm}$处的环向应力，以及环向应力首次降到$\sigma$的10%以内时距孔心的距离。
::: solution
这里$a = 10\,\mathrm{mm}$。在孔边上，$\sigma_\theta = \sigma(1 - 2\cos2\theta)$：在$\theta = 90°$处，$\sigma_\theta = 3\sigma = 300\,\mathrm{MPa}$（拉应力峰值）；在$\theta = 0°$处，$\sigma_\theta = -\sigma = -100\,\mathrm{MPa}$——载荷轴线上的孔边处于**受压**状态，因为孔变成椭圆，其两端被向内推。

在距孔边$10\,\mathrm{mm}$处，$r = 2a$，[[#eq-kirsch-axis]]给出
$$
\sigma_\theta = 100\,\Bigl(1 + \frac18 + \frac{3}{32}\Bigr) = 100 \times 1.21875 = 121.9\,\mathrm{MPa}.
$$
对于10%点，令$q = a^2/r^2$，解$1 + q/2 + 3q^2/2 = 1.1$，即$1.5q^2 + 0.5q - 0.1 = 0$，得$q = 0.1407$，$r = a/\sqrt{q} = 2.67a = 26.7\,\mathrm{mm}$，距孔边约$17\,\mathrm{mm}$。

合理性检查：板仍必须通过过孔的截面传递远场载荷。把超出部分$\sigma_\theta - \sigma$沿横向轴线从$a$积分到$\infty$，每侧得$\sigma(a/2 + a/2) = \sigma a$，恰好是缺失的材料本应承担的载荷$\sigma a$ ✓。峰值$300\,\mathrm{MPa}$超过了低碳钢的屈服应力（$\approx 250\,\mathrm{MPa}$），所以在静载下孔边一个小区域屈服，而其余部分保持弹性；在疲劳载荷下，$K_t = 3$是设计者必须考虑的（[[machine-design/fatigue]]）。
:::
:::

由于问题是线性的，解可以叠加。沿$\theta = 0$的远场双向应力$\sigma_1$和沿$\theta = 90°$的$\sigma_2$，在孔边上给出

$$
\sigma_\theta(a,\theta) = \sigma_1 + \sigma_2 - 2(\sigma_1 - \sigma_2)\cos2\theta .
$$ {#eq-kirsch-biaxial}

等双向拉伸（$\sigma_1 = \sigma_2$，如球形压力容器器壁）给出$K_t = 2$；纯剪切（$\sigma_2 = -\sigma_1$，如受扭的轴）给出峰值$4\sigma_1$，这就是横向孔对扭转轴危害如此之大的原因。

::: widget plot
f: 1 + k - 2*(1 - k)*cos(2x)
x: 0, pi
y: -4, 4
sliders: k=0:-1:1:0.05
piticks: true
hlines: 0
caption: 远场应力比为$k = \sigma_2/\sigma_1$时，孔边环向应力除以$\sigma_1$随从$\sigma_1$方向量起的角度$\theta$的变化。$k = 0$（单向）时曲线在$-1$与$3$之间变化。滑到$k = 1$（等双向），应力沿孔边处处为$2\sigma_1$；滑到$k = -1$（纯剪切），峰值达到$\pm4$。注意最大值的位置：总是在$\theta = 90°$处，与较大的应力成直角。
:::

::: quiz
带小圆孔的薄板受远场应力$\sigma_x = 60\,\mathrm{MPa}$和$\sigma_y = 60\,\mathrm{MPa}$作用。下列哪些说法正确？
- [ ] 孔边的峰值应力为$180\,\mathrm{MPa}$。
- [x] 孔边每一点的环向应力都是$120\,\mathrm{MPa}$。
- [x] 无论板是钢还是铝，结果都相同。
- [ ] 如果板很厚，结果会改变，因为此时适用平面应变。
::: solution
$\sigma_1 = \sigma_2 = 60\,\mathrm{MPa}$时，[[#eq-kirsch-biaxial]]给出与$\theta$无关的$\sigma_\theta = 120\,\mathrm{MPa}$。$3\sigma$只适用于单向拉伸。基尔施应力不含弹性常数（孔不承受净力，所以附加的单值性条件不会使$\nu$重新出现），并且在平面应力和平面应变中都成立（平面应变只是多了面外应力$\sigma_z = \nu(\sigma_r + \sigma_\theta)$），所以材料和厚度都不改变面内结果。
:::
:::

::: example 平面应变代换的证明 {#ex-plane-proof}
证明在平面应力胡克定律中代入$E' = E/(1-\nu^2)$和$\nu' = \nu/(1-\nu)$，可以精确地得到平面应变定律，包括剪切关系；并对钢（$E = 200\,\mathrm{GPa}$，$\nu = 0.3$）计算$E'$和$\nu'$。
::: solution
线应变：$\varepsilon_x = (\sigma_x - \nu'\sigma_y)/E' = \frac{1-\nu^2}{E}\bigl(\sigma_x - \frac{\nu}{1-\nu}\sigma_y\bigr)$，这就是[[#def-plane]]中的平面应变形式。剪切：$\frac{2(1+\nu')}{E'} = \frac{2(1-\nu^2)}{E}\cdot\frac{1-\nu+\nu}{1-\nu} = \frac{2(1-\nu^2)}{E(1-\nu)} = \frac{2(1+\nu)}{E}$ ✓，所以$G$不变，理应如此——阻止$z$向应变不可能改变对面内剪切的响应，因为面内剪切本来就不产生$z$向应变。

对于钢，$E' = 200/(1 - 0.09) = 219.8\,\mathrm{GPa}$，$\nu' = 0.3/0.7 = 0.429$。合理性检查：在平面应变中，材料显得更刚（$z$向约束帮助承担载荷），泊松比显得更大（在$z$方向无法发生的侧向膨胀被挤进了平面内）。两个极限都表现正确：$\nu \to 0$给出$E' = E$、$\nu' = 0$，两种状态没有区别。
:::
:::

::: history
线弹性力学的方程在19世纪20年代的巴黎成形。纳维（Claude-Louis Navier）于1821年向法国科学院提交了一篇关于弹性固体平衡与运动的论文，从一个只含一个弹性常数的分子模型（相当于取定$\nu = \tfrac14$）推导出位移方程。柯西（Augustin-Louis Cauchy）于1822年引入了应力张量和应变张量，并用连续介质论证得到了含两个常数的各向同性定律；关于一个常数是否足够的"少常数"与"多常数"之争持续了很久，最终被测得的远离$\tfrac14$的泊松比所终结。拉梅（Gabriel Lamé）的《固体弹性数学理论讲义》（*Leçons sur la théorie mathématique de l'élasticité des corps solides*，1852）是这一学科的第一本书，确立了常数$\lambda$和$\mu$的地位。圣维南（Adhémar Barré de Saint-Venant）1855年关于棱柱体扭转的论文引入了半逆解法和以他命名的原理。英国皇家天文学家艾里（George Biddell Airy）在1863年发表于《哲学汇刊》（*Philosophical Transactions*）的一篇关于梁内部应变的论文中引入了应力函数；基尔施（Ernst Gustav Kirsch）于1898年在德国工程师协会（Verein Deutscher Ingenieure）的会刊上发表了带圆孔板的解——这是第一个定量的应力集中因数。铁木辛柯（Stephen Timoshenko）的《弹性理论》（*Theory of Elasticity*，1934；自1951年版起与古迪尔（J. N. Goodier）合著）把这些解汇集成工程师至今仍在学习的形式。
:::

## 后续内容

本课程后面的每一章都是这里所汇集方程的特解。[[solid-mechanics/thick-cylinders-discs]]针对轴对称物体求解它们——即拉梅问题；[[solid-mechanics/plates]]借助基尔霍夫的运动学假设，把它们归结为关于挠度的双调和方程，与[[#eq-biharmonic]]相对应。[[solid-mechanics/energy-methods]]把整个边值问题改写为能量的极小化，由此直接通向[[finite-element-method/plane-elements]]中的有限元法，那里本章的平面应力和平面应变本构矩阵被原样使用。[[solid-mechanics/fracture-mechanics]]从孔被压扁成裂纹时孔解的极限出发，而[[solid-mechanics/composites]]则用正交各向异性薄板的四个或五个常数取代两个各向同性常数。

::: summary
- 各向同性线弹性固体有两个独立常数；$G = E/[2(1+\nu)]$，$K = E/[3(1-2\nu)]$，$\lambda = E\nu/[(1+\nu)(1-2\nu)]$，$\mu = G$。应变能为正要求$-1 < \nu < \tfrac12$；当$\nu \to \tfrac12$时$K \to \infty$。
- 胡克定律是三维的：侧向约束会在不受载的方向上产生应力（平面应变中$\sigma_z = \nu(\sigma_x + \sigma_y)$）。
- 弹性力学是关于15个未知量的15个方程（平衡方程、应变–位移关系、胡克定律），配以面力、位移或混合边界条件；消去应力得到纳维方程$(\lambda+\mu)\nabla(\nabla\cdot\mathbf{u}) + \mu\nabla^2\mathbf{u} + \mathbf{b} = \mathbf{0}$。
- 解是唯一的（基尔霍夫基于正应变能的论证），所以任何满足全部方程的场就是答案；圣维南原理允许端部条件只在合力意义上满足。
- 平面应变问题用平面应力公式求解，取$E' = E/(1-\nu^2)$，$\nu' = \nu/(1-\nu)$。
- 艾里函数（$\sigma_x = \phi_{,yy}$，$\sigma_y = \phi_{,xx}$，$\tau_{xy} = -\phi_{,xy}$）满足平衡；相容要求$\nabla^4\phi = 0$，这是一个不含弹性常数的方程。
- 端部受载悬臂梁的解证实了$\sigma = My/I$，并增加了剪切挠度$3PL/(2AG)$，它是弯曲挠度的$\tfrac34(1+\nu)(h/L)^2$倍。
- 基尔施：单向拉伸下的圆孔$K_t = 3$（载荷轴线上为$-\sigma$）；双向应力在孔边给出$\sigma_\theta = \sigma_1 + \sigma_2 - 2(\sigma_1 - \sigma_2)\cos2\theta$；扰动在几倍半径之内消失。
:::

## 习题

::: exercise 切变模量 {level=1 check="80"}
某合金钢的$E = 200\,\mathrm{GPa}$，$\nu = 0.25$。求其切变模量$G$。（以GPa为单位输入$G$。）
::: hint
用$G = E/[2(1+\nu)]$。
:::
::: solution
$G = 200/(2 \times 1.25) = 80\,\mathrm{GPa}$。对同一材料，$\lambda = 200 \times 0.25/(1.25 \times 0.5) = 80\,\mathrm{GPa}$也成立——$\nu = 0.25$恰好是$\lambda = \mu$的值，即纳维最初的单常数固体——而$K = 200/1.5 = 133.3\,\mathrm{GPa}$。
:::
:::

::: exercise 体积应变 {level=1 check="125"}
某块体的$E = 200\,\mathrm{GPa}$，$\nu = 0.25$，承受$\sigma_x = 100\,\mathrm{MPa}$、$\sigma_y = -50\,\mathrm{MPa}$、$\sigma_z = 0$。求$\varepsilon_x$、$\varepsilon_y$、$\varepsilon_z$和体积应变$e$。（以微应变$10^{-6}$为单位输入$e$。）
::: solution
取$E = 200\,000\,\mathrm{MPa}$：$\varepsilon_x = [100 - 0.25(-50)]/200\,000 = 562.5\times10^{-6}$；$\varepsilon_y = [-50 - 0.25(100)]/200\,000 = -375\times10^{-6}$；$\varepsilon_z = -0.25(100 - 50)/200\,000 = -62.5\times10^{-6}$。求和：$e = 125\times10^{-6}$。校核：$e = (1-2\nu)(\sigma_x+\sigma_y+\sigma_z)/E = 0.5 \times 50/200\,000 = 125\times10^{-6}$ ✓。
:::
:::

::: exercise 孔附近的环向应力 {level=1 check="97.5"}
受单向拉应力$\sigma = 80\,\mathrm{MPa}$作用的宽板上有一个半径为$a$的小圆孔。求横向轴线上距孔边为$a$处（即$r = 2a$处）的环向应力。（以MPa为单位输入应力。）
::: solution
由[[#eq-kirsch-axis]]，在$r = 2a$处：$\sigma_\theta = 80(1 + \tfrac18 + \tfrac{3}{32}) = 80 \times 1.21875 = 97.5\,\mathrm{MPa}$。
:::
:::

::: exercise 平面应变中的面外应力 {level=2 check="48"}
在一块厚焊接板的内部，厚度方向的应变为零。某点处面内应力为$\sigma_x = 120\,\mathrm{MPa}$、$\sigma_y = 40\,\mathrm{MPa}$、$\tau_{xy} = 0$，$\nu = 0.3$。求$\sigma_z$，然后把米泽斯等效应力与错误地假设平面应力时得到的值比较。（以MPa为单位输入$\sigma_z$。）
::: solution
$\sigma_z = \nu(\sigma_x + \sigma_y) = 0.3 \times 160 = 48\,\mathrm{MPa}$。米泽斯应力$\sigma_\text{vM} = \sqrt{\tfrac12[(\sigma_x-\sigma_y)^2 + (\sigma_y-\sigma_z)^2 + (\sigma_z-\sigma_x)^2]}$在平面应变中为$\sqrt{\tfrac12(80^2 + 8^2 + 72^2)} = 76.3\,\mathrm{MPa}$，而若$\sigma_z = 0$则为$\sqrt{120^2 - 120\times40 + 40^2} = 105.8\,\mathrm{MPa}$。厚度方向的约束使应力状态更接近静水状态，**推迟**了屈服——正是同一种约束使厚截面更容易发生脆性断裂。
:::
:::

::: exercise 一个容许的应力函数 {level=2 check="-6"}
求使$\phi = x^4 + \alpha\,x^2y^2 + y^4$成为艾里应力函数的$\alpha$值，并写出应力。（输入$\alpha$。）
::: solution
$\partial^4\phi/\partial x^4 = 24$，$\partial^4\phi/\partial x^2\partial y^2 = 4\alpha$，$\partial^4\phi/\partial y^4 = 24$。所以$\nabla^4\phi = 24 + 8\alpha + 24 = 0$给出$\alpha = -6$。于是$\sigma_x = \phi_{,yy} = 12y^2 - 12x^2$，$\sigma_y = \phi_{,xx} = 12x^2 - 12y^2$，$\tau_{xy} = -\phi_{,xy} = 24xy$（单位与$\phi$协调）。校核平衡：$\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = -24x + 24x = 0$ ✓。注意$\phi = \operatorname{Re}(z^4)$，$z = x + iy$：解析函数的实部是调和的，因而是双调和的。
:::
:::

::: exercise 双向应力下的孔 {level=2 check="400"}
在承受远场主应力$\sigma_1 = 150\,\mathrm{MPa}$和$\sigma_2 = 50\,\mathrm{MPa}$的板上开一个圆形检修孔。求孔边环向应力的最大值和最小值及其位置。（以MPa为单位输入最大值。）
::: solution
由[[#eq-kirsch-biaxial]]，$\sigma_\theta = 200 - 200\cos2\theta\ \mathrm{MPa}$。最大值在$\theta = 90°$处（过孔心且与$\sigma_1$垂直的直线上）：$\sigma_\theta = 3\sigma_1 - \sigma_2 = 400\,\mathrm{MPa}$。最小值在$\theta = 0°$处：$3\sigma_2 - \sigma_1 = 0$。第二个应力**降低**了峰值，单独$\sigma_1$作用时峰值为$450\,\mathrm{MPa}$。
:::
:::

::: exercise 悬臂梁何时算"深"？ {level=2 check="15"}
一个短钢支架（$\nu = 0.25$）是端部受载的矩形悬臂梁，跨高比$L/h = 2.5$。用[[#ex-cantilever]]的弹性解，剪切挠度使梁理论挠度增加百分之几？（输入百分数。）
::: solution
比值$= \tfrac34(1+\nu)(h/L)^2 = 0.75 \times 1.25 \times 0.4^2 = 0.15$，所以剪切增加$15\,\%$。对于如此粗短的构件，支座附近的应力分布也远非线性（固定端距载荷不到一个梁高），所以梁理论给出的挠度和应力都只应视为估计值；通常的下一步是建立二维有限元模型。
:::
:::

::: exercise 受约束块体中的热应力 {level=3 check="-240"}
(a) 由[[#eq-hooke]]证明：一个被约束得在任何方向都不能变形、并均匀加热$\Delta T$的各向同性材料块体，会产生静水应力$\sigma = -E\alpha\,\Delta T/(1-2\nu)$。(b) 对$E = 200\,\mathrm{GPa}$、$\alpha = 12\times10^{-6}\,\mathrm{K^{-1}}$、$\nu = 0.25$、$\Delta T = 50\,\mathrm{K}$计算其值。(c) 与只在轴向受约束的杆比较。（以MPa为单位输入(b)中的应力。）
::: solution
(a) 由对称性，$\sigma_x = \sigma_y = \sigma_z = \sigma$，且无切应力。每个应变都为零：$0 = [\sigma - \nu(2\sigma)]/E + \alpha\Delta T$，所以$\sigma(1-2\nu) = -E\alpha\Delta T$，$\sigma = -E\alpha\Delta T/(1-2\nu)$。(b) $\sigma = -200\,000 \times 12\times10^{-6} \times 50/0.5 = -240\,\mathrm{MPa}$（压应力）。(c) 只在轴向受约束的杆有$\sigma_y = \sigma_z = 0$，$\sigma_x = -E\alpha\Delta T = -120\,\mathrm{MPa}$：对$\nu = 0.25$，完全的三维约束使应力加倍，而对几乎不可压缩的材料，因子$1/(1-2\nu)$会无界增长——在刚性壳体中加热的密封、完全充满的橡胶件或充液部件会产生非常高的压力。
:::
:::

::: exercise 一维纳维方程 {level=3}
一根高$H$、密度$\rho$的高柱立在刚性基础上。其侧面受约束，只有竖向位移$w(z)$不为零（土层是常见的例子；$z$从基础向上量）。(a) 把[[#eq-navier]]化为关于$w(z)$的常微分方程。(b) 在$w(0) = 0$和顶部自由的条件下求解。(c) 求基础处的竖向应力和水平应力，并对$H = 10\,\mathrm{m}$、$\rho = 2000\,\mathrm{kg/m^3}$、$\nu = 0.3$、$g = 9.81\,\mathrm{m/s^2}$计算其值。
::: solution
(a) 取$\mathbf{u} = (0, 0, w(z))$：$\nabla\cdot\mathbf{u} = w'$，所以$\nabla(\nabla\cdot\mathbf{u}) = (0,0,w'')$，$\nabla^2\mathbf{u} = (0,0,w'')$。体积力为$b_z = -\rho g$。纳维方程：$(\lambda + 2\mu)w'' - \rho g = 0$。
(b) 积分：$w' = \rho g z/(\lambda + 2\mu) + C_1$。自由顶面在$z = H$处有$\sigma_z = (\lambda + 2\mu)w' = 0$，所以$C_1 = -\rho g H/(\lambda + 2\mu)$；由$w(0) = 0$，$w = -\dfrac{\rho g}{\lambda + 2\mu}\Bigl(Hz - \dfrac{z^2}{2}\Bigr)$，即向下的沉降。
(c) $\sigma_z = (\lambda + 2\mu)w' = -\rho g(H - z)$——即上方柱体的重量，正如仅凭平衡所要求的那样。水平应力为$\sigma_x = \sigma_y = \lambda w' = \dfrac{\lambda}{\lambda + 2\mu}\sigma_z = \dfrac{\nu}{1-\nu}\sigma_z$。在基础处，$\sigma_z = -2000 \times 9.81 \times 10 = -196.2\,\mathrm{kPa}$，$\sigma_x = (0.3/0.7)(-196.2) = -84.1\,\mathrm{kPa}$。比值$\nu/(1-\nu)$就是弹性的"静止土压力"系数；实际土体并非线弹性，岩土工程实践采用经验值，但结果的结构正是纳维方程所给出的。
:::
:::

::: exercise 设计：缓解应力集中 {level=3}
一块厚$10\,\mathrm{mm}$、宽$200\,\mathrm{mm}$的钢拉板承受$200\,\mathrm{kN}$的稳定拉力，其中心必须留出一个让$16\,\mathrm{mm}$电缆通过的通道。用本章的结果比较：(i) 一个$20\,\mathrm{mm}$的圆孔；(ii) 一个长$40\,\mathrm{mm}$、宽$20\,\mathrm{mm}$、长轴沿载荷方向的椭圆形槽；(iii) 同样的槽横置于载荷方向。对于垂直于载荷的半轴为$a$、沿载荷的半轴为$b$的椭圆孔，英格利斯（Inglis，1913）求得无限大板中$K_t = 1 + 2a/b$。推荐一种布置，并说明你还要校核什么。
::: solution
远场应力：$\sigma = 200\,000/(200 \times 10) = 100\,\mathrm{MPa}$。板宽为孔径的十倍，所以无限大板的结果是合理的初步估计（有限宽度图表会使$K_t$略有升高，最终设计中应使用）。
(i) 圆孔：$K_t = 3$，峰值$300\,\mathrm{MPa}$。(ii) 沿载荷的槽：$a = 10\,\mathrm{mm}$，$b = 20\,\mathrm{mm}$，$K_t = 1 + 2(10/20) = 2$，峰值$200\,\mathrm{MPa}$。(iii) 横置的槽：$a = 20$，$b = 10$，$K_t = 5$，峰值$500\,\mathrm{MPa}$。
推荐：任何长形开口都应使其长轴沿载荷方向，并给予足够大的端部圆角半径；方案(ii)能让电缆通过而峰值应力最低。对于稳定载荷和延性钢，孔边的局部屈服是可以容许的，静强度由净截面应力（对(i)和(ii)为$200\,000/[(200 - 20) \times 10] = 111\,\mathrm{MPa}$）控制；如果载荷是波动的，弹性峰值应力控制疲劳，方案(ii)明显更好。进一步的校核：有限宽度修正、切割边缘的加工质量（火焰切割的边缘有其自身的缺口），以及护圈或电缆是否会对孔边施加载荷。这一计算讲的是原理；真实的拉板须按照适用的结构或机械设计规范进行设计。
:::
:::
