甲烷分子的四个氢原子位于一个立方体互不相邻的四个顶点上，碳原子位于立方体的中心。两条碳氢键之间的夹角是多少？一个平面经过山坡上的三个测量标志点；附近竖立的一根桅杆的顶端比这个平面高出多少？两根笔直的缆索横跨山谷而互不接触；它们之间最近相距多少？

这些都是关于三维空间中长度、角度和方向的问题；一旦有了合适的工具，每个问题都有简短的解答。本章就来建立这些工具：**向量**、**点积**（度量角度和长度）、**叉积**（产生垂直方向并度量面积）以及**混合积**（又称标量三重积，度量体积）。借助它们，我们将写出直线和平面的方程，计算距离，并辨认二次曲面——在本课程的其余部分中，二次曲面将是我们的标准例子。这里的所有内容，都是被赋予了几何意义的$\R^3$上的线性代数（参见[[linear-algebra/matrices]]一章）。

## 空间中的点与向量

我们用三个数$(x, y, z)$来确定空间中一个点的位置，它们是该点关于过原点$O$的三条两两垂直的坐标轴的坐标。我们始终使用**右手**坐标系：让右手四指从$x$轴正向弯向$y$轴正向，大拇指就指向$z$轴正向。所有三元组构成的集合就是$\R^3$。

两次应用勾股定理（先在水平面内，再在包含对角线的竖直平面内），就得到$P_1 = (x_1, y_1, z_1)$与$P_2 = (x_2, y_2, z_2)$之间的**距离**：

$$
\abs{P_1P_2} = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}.
$$

特别地，以$(a, b, c)$为球心、$r$为半径的**球面**，即到球心的距离为$r$的点的集合，其方程为$(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$。

::: example 识别球面 {#ex-sphere}
证明$x^2 + y^2 + z^2 - 2x + 4y - 6z = 2$是一个球面，并求出它的球心和半径。
::: solution
对每个变量配方：

$$
(x^2 - 2x + 1) + (y^2 + 4y + 4) + (z^2 - 6z + 9) = 2 + 1 + 4 + 9,
$$

即$(x-1)^2 + (y+2)^2 + (z-3)^2 = 16$。这是球心为$(1, -2, 3)$、半径为$4$的球面。（如果右边算出来是负数，这个方程就根本没有解；如果右边是$0$，这个“球面”就只是一个点。）
:::
:::

**向量**记录的是一个位移：既有长度，又有方向。从$P_1$到$P_2$的位移就是向量

$$
\overrightarrow{P_1P_2} = (x_2 - x_1,\; y_2 - y_1,\; z_2 - z_1).
$$

无论起点在哪里，长度和方向都相同的箭头由同一个向量描述。当箭头的起点是原点、终点是$P$时，向量$\overrightarrow{OP}$称为$P$的**位置向量**，它的分量与点$P$本身的坐标相同；因此，我们对点和向量使用同样的记号$(v_1, v_2, v_3)$，并用黑体表示向量。

::: definition 向量及其长度 {#def-vector}
$\R^3$中的**向量**是一个有序实数三元组$\mathbf{v} = (v_1, v_2, v_3)$，这三个实数称为它的**分量**。向量的加法以及向量与标量$c \in \R$的乘法都按分量进行：

$$
\mathbf{u} + \mathbf{v} = (u_1 + v_1,\, u_2 + v_2,\, u_3 + v_3), \qquad c\,\mathbf{v} = (cv_1, cv_2, cv_3).
$$

$\mathbf{v}$的**长度**（或**范数**）为$\norm{\mathbf{v}} = \sqrt{v_1^2 + v_2^2 + v_3^2}$。长度为$1$的向量称为**单位向量**；**标准基向量**是$\mathbf{i} = (1,0,0)$，$\mathbf{j} = (0,1,0)$，$\mathbf{k} = (0,0,1)$。
:::

从几何上看，把$\mathbf{v}$的起点放在$\mathbf{u}$的终点，就得到$\mathbf{u} + \mathbf{v}$（三角形法则）；$c\mathbf{v}$则把$\mathbf{v}$伸缩为原来的$\abs{c}$倍，当$c < 0$时还要反向。由于这些运算是逐个分量进行的，它们满足熟悉的代数运算律——交换律、结合律、分配律；用[[linear-algebra/vector-spaces]]一章的语言来说，$\R^3$是一个向量空间。每个向量都是基向量的组合：$\mathbf{v} = v_1\mathbf{i} + v_2\mathbf{j} + v_3\mathbf{k}$，并且$\norm{c\mathbf{v}} = \abs{c}\,\norm{\mathbf{v}}$。把非零向量除以它的长度，得到$\mathbf{v}/\norm{\mathbf{v}}$，这就是与它同方向的单位向量；这一步骤称为把$\mathbf{v}$**单位化**。

到目前为止，没有任何内容依赖于分量恰好有三个。$\R^n$中的向量是$n$元组，运算方式相同；下一节的大多数结果在$\R^n$中都成立，证明也相同。

## 点积

怎样从分量判断两个向量是否垂直，或者计算它们之间的夹角？答案只是一个数，但这个数极其有用。

::: definition 点积 {#def-dot}
$\mathbf{u} = (u_1, u_2, u_3)$与$\mathbf{v} = (v_1, v_2, v_3)$的**点积**（或**数量积**）是数

$$
\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 .
$$
:::

直接由公式可知，对所有向量$\mathbf{u}, \mathbf{v}, \mathbf{w}$和标量$c$，有：

- $\mathbf{u}\cdot\mathbf{v} = \mathbf{v}\cdot\mathbf{u}$（对称性）；
- $\mathbf{u}\cdot(\mathbf{v} + \mathbf{w}) = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{w}$，$(c\mathbf{u})\cdot\mathbf{v} = c(\mathbf{u}\cdot\mathbf{v})$（线性）；
- $\mathbf{v}\cdot\mathbf{v} = \norm{\mathbf{v}}^2 \ge 0$，且仅当$\mathbf{v} = \mathbf{0}$时等号成立。

每一条都只需一行就能验证；例如最后一条成立，是因为$v_1^2 + v_2^2 + v_3^2$是平方和。有了这些法则，就可以像展开普通乘积那样展开点积。例如，

$$
\norm{\mathbf{u} + \mathbf{v}}^2 = (\mathbf{u} + \mathbf{v})\cdot(\mathbf{u} + \mathbf{v}) = \norm{\mathbf{u}}^2 + 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2 .
$$ {#eq-expand}

### 夹角与柯西-施瓦茨（Cauchy–Schwarz）不等式

非零向量$\mathbf{u}$与$\mathbf{v}$的**夹角**，是指从同一点出发画出代表它们的箭头时，两个箭头之间的角$\theta \in [0, \pi]$。

::: theorem 点积的几何形式 {#thm-dot-geometric}
设$\theta$是$\R^3$中非零向量$\mathbf{u}$与$\mathbf{v}$的夹角，则

$$
\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\,\norm{\mathbf{v}}\cos\theta .
$$
:::

::: proof
从同一点出发画出$\mathbf{u}$和$\mathbf{v}$。它们与连接两者终点的$\mathbf{u} - \mathbf{v}$构成一个三角形，三边长为$\norm{\mathbf{u}}$、$\norm{\mathbf{v}}$、$\norm{\mathbf{u}-\mathbf{v}}$，前两边的夹角为$\theta$。由余弦定理得

$$
\norm{\mathbf{u} - \mathbf{v}}^2 = \norm{\mathbf{u}}^2 + \norm{\mathbf{v}}^2 - 2\norm{\mathbf{u}}\,\norm{\mathbf{v}}\cos\theta .
$$

另一方面，像[[#eq-expand]]那样展开，得$\norm{\mathbf{u}-\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2$。比较这两个表达式，即得$\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$。若$\mathbf{u}$与$\mathbf{v}$平行，三角形就退化了，但余弦定理仍然成立：当$\mathbf{v} = c\mathbf{u}$且$c > 0$（于是$\theta = 0$）时，两边都等于$(1-c)^2\norm{\mathbf{u}}^2$；$c < 0$（$\theta = \pi$）的情形类似。
:::

于是，点积把关于角度的问题转化成了算术：$\cos\theta = \dfrac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}\norm{\mathbf{v}}}$。特别地，$\mathbf{u}$与$\mathbf{v}$垂直当且仅当$\mathbf{u}\cdot\mathbf{v} = 0$。满足$\mathbf{u}\cdot\mathbf{v} = 0$的向量称为**正交**的；按照约定，$\mathbf{0}$与任何向量都正交。

::: example 四面体角 {#ex-methane}
把甲烷的碳原子放在原点，把氢原子放在立方体的顶点$(1,1,1)$、$(1,-1,-1)$、$(-1,1,-1)$和$(-1,-1,1)$处。求H–C–H键角。
::: solution
取两条键$\mathbf{u} = (1,1,1)$和$\mathbf{v} = (1,-1,-1)$。则$\mathbf{u}\cdot\mathbf{v} = 1 - 1 - 1 = -1$，$\norm{\mathbf{u}} = \norm{\mathbf{v}} = \sqrt3$，所以

$$
\cos\theta = \frac{-1}{\sqrt3\cdot\sqrt3} = -\frac13, \qquad \theta = \arccos\left(-\tfrac13\right) \approx 109.47^\circ .
$$

四条键中任意两条的点积都是$-1$，所以六个键角全都相等——这就是化学家所说的正四面体形的对称排布。由于点积为负，这个角是钝角。
:::
:::

当$n > 3$时，$\R^n$中没有图形可以借助，于是我们把[[#thm-dot-geometric]]反过来用，以$\cos\theta = \mathbf{u}\cdot\mathbf{v}/(\norm{\mathbf{u}}\norm{\mathbf{v}})$来**定义**夹角。要使这个定义有意义，右边必须落在$[-1, 1]$中。这正是数学中最有用的不等式之一的内容；它的证明只用到上面的代数法则，因此在每个$\R^n$中都成立。

::: theorem 柯西-施瓦茨不等式 {#thm-cauchy-schwarz}
对$\R^n$中的所有向量$\mathbf{u}, \mathbf{v}$，

$$
\abs{\mathbf{u}\cdot\mathbf{v}} \le \norm{\mathbf{u}}\,\norm{\mathbf{v}},
$$

等号成立当且仅当其中一个向量是另一个的标量倍数。
:::

::: proof
若$\mathbf{v} = \mathbf{0}$，则两边都是$0$，且$\mathbf{v} = 0\,\mathbf{u}$；因此不妨设$\mathbf{v} \neq \mathbf{0}$。对每个实数$t$，

$$
0 \le \norm{\mathbf{u} - t\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - 2t\,\mathbf{u}\cdot\mathbf{v} + t^2\norm{\mathbf{v}}^2 .
$$

右边是$t$的二次函数，在$t_0 = \mathbf{u}\cdot\mathbf{v}/\norm{\mathbf{v}}^2$处取得最小值。代入$t = t_0$，得

$$
0 \le \norm{\mathbf{u}}^2 - \frac{(\mathbf{u}\cdot\mathbf{v})^2}{\norm{\mathbf{v}}^2},
$$

整理即得$(\mathbf{u}\cdot\mathbf{v})^2 \le \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2$，再两边开平方即可。等号成立当且仅当$\norm{\mathbf{u} - t_0\mathbf{v}} = 0$，即$\mathbf{u} = t_0\mathbf{v}$。反之，若$\mathbf{u} = c\mathbf{v}$，则$\abs{\mathbf{u}\cdot\mathbf{v}} = \abs{c}\norm{\mathbf{v}}^2 = \norm{\mathbf{u}}\norm{\mathbf{v}}$。
:::

::: corollary 三角不等式 {#cor-triangle}
对$\R^n$中的所有$\mathbf{u}, \mathbf{v}$，有$\norm{\mathbf{u} + \mathbf{v}} \le \norm{\mathbf{u}} + \norm{\mathbf{v}}$。
:::

::: proof
由[[#eq-expand]]和柯西-施瓦茨不等式，
$\norm{\mathbf{u}+\mathbf{v}}^2 = \norm{\mathbf{u}}^2 + 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2 \le \norm{\mathbf{u}}^2 + 2\norm{\mathbf{u}}\norm{\mathbf{v}} + \norm{\mathbf{v}}^2 = \bigl(\norm{\mathbf{u}} + \norm{\mathbf{v}}\bigr)^2$。所要证明的不等式两边都是非负的，因此可以开平方。
:::

从几何上看，这是说：三角形的一边绝不会比另外两边之和更长。正是三角不等式使$\norm{\mathbf{u} - \mathbf{v}}$具有距离的性质，这也是[[real-analysis/metric-spaces]]一章的出发点。

::: quiz
已知非零向量$\mathbf{u}$和$\mathbf{v}$满足$\mathbf{u}\cdot\mathbf{v} < 0$。关于它们的夹角$\theta$，我们能得出什么结论？
- [ ] $\theta$是锐角
- [ ] $\theta = \pi/2$
- [x] $\theta$是钝角：$\pi/2 < \theta \le \pi$
- [ ] 什么也得不出——点积的符号与夹角无关
::: solution
由于$\norm{\mathbf{u}}\norm{\mathbf{v}} > 0$，$\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$的符号就是$\cos\theta$的符号。在$[0, \pi]$上，余弦恰好在$(\pi/2, \pi]$上取负值。点积为正意味着夹角是锐角，点积为零意味着垂直。
:::
:::

### 投影

点积还能度量一个向量有多少是沿着另一个向量的方向的。设力$\mathbf{F}$拖着一个箱子沿向量$\mathbf{u}$的方向在地面上移动。只有$\mathbf{F}$沿$\mathbf{u}$方向的部分使箱子移动；其余部分则把箱子压向地面或把它向上提。

::: definition 投影 {#def-projection}
设$\mathbf{u} \neq \mathbf{0}$。$\mathbf{v}$在$\mathbf{u}$上的**标量投影**和$\mathbf{v}$在$\mathbf{u}$上的**向量投影**分别为

$$
\operatorname{comp}_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}}, \qquad \proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\,\mathbf{u}.
$$
:::

由[[#thm-dot-geometric]]，$\operatorname{comp}_{\mathbf{u}}\mathbf{v} = \norm{\mathbf{v}}\cos\theta$：它是$\mathbf{v}$投在$\mathbf{u}$所在直线上的影子的有向长度，夹角为钝角时为负。以下两个事实说明，投影正是“沿$\mathbf{u}$的分量”这一概念的恰当形式。

::: proposition 投影是最接近的倍数 {#prop-projection}
设$\mathbf{u} \ne \mathbf{0}$，$\mathbf{p} = \proj_{\mathbf{u}}\mathbf{v}$。则$\mathbf{v} - \mathbf{p}$与$\mathbf{u}$正交，并且在$\mathbf{u}$的所有倍数中$\mathbf{p}$最接近$\mathbf{v}$：对每个实数$t$都有$\norm{\mathbf{v} - t\mathbf{u}} \ge \norm{\mathbf{v} - \mathbf{p}}$，且仅当$t\mathbf{u} = \mathbf{p}$时等号成立。
:::

::: proof
记$\mathbf{p} = c\,\mathbf{u}$，其中$c = \mathbf{u}\cdot\mathbf{v}/\mathbf{u}\cdot\mathbf{u}$。则$(\mathbf{v} - c\mathbf{u})\cdot\mathbf{u} = \mathbf{u}\cdot\mathbf{v} - c\,\mathbf{u}\cdot\mathbf{u} = 0$。因此，对任意$t$，向量$\mathbf{v} - \mathbf{p}$与$\mathbf{p} - t\mathbf{u} = (c - t)\mathbf{u}$正交；像[[#eq-expand]]那样展开时，交叉项为零（勾股定理）：

$$
\norm{\mathbf{v} - t\mathbf{u}}^2 = \norm{(\mathbf{v} - \mathbf{p}) + (\mathbf{p} - t\mathbf{u})}^2 = \norm{\mathbf{v} - \mathbf{p}}^2 + (c-t)^2\norm{\mathbf{u}}^2 \ge \norm{\mathbf{v}-\mathbf{p}}^2,
$$

且仅当$t = c$时等号成立。
:::

同样的“先作垂线，再用勾股定理”的论证，将在下文给出点到平面的距离；在[[linear-algebra/least-squares]]一章中，它则发展为最小二乘法。

::: widget projection
u: 3, 1
v: 1, 2
mode: projection
caption: 拖动$\mathbf{u}$和$\mathbf{v}$的箭头尖端。$\mathbf{v}$在$\mathbf{u}$所在直线上的投影与正交余量$\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}$总是成直角。把夹角变成钝角，就会看到投影翻转过来，指向与$\mathbf{u}$相反的方向——标量投影变成了负数。把$\mathbf{u}$拉长，投影完全不变。
:::

::: example 把向量分解为平行部分与垂直部分 {#ex-projection}
把$\mathbf{v} = (2, 3, 1)$写成一个与$\mathbf{u} = (1,1,1)$平行的向量与一个与$\mathbf{u}$正交的向量之和。
::: solution
我们有$\mathbf{u}\cdot\mathbf{v} = 2 + 3 + 1 = 6$，$\mathbf{u}\cdot\mathbf{u} = 3$，所以

$$
\proj_{\mathbf{u}}\mathbf{v} = \frac{6}{3}(1,1,1) = (2,2,2), \qquad \mathbf{v} - \proj_{\mathbf{u}}\mathbf{v} = (0, 1, -1).
$$

检验：$(0,1,-1)\cdot(1,1,1) = 0$。所以$\mathbf{v} = (2,2,2) + (0,1,-1)$，而且这种分解是唯一的：若$\mathbf{v} = a\mathbf{u} + \mathbf{w}$且$\mathbf{w}\cdot\mathbf{u} = 0$，两边与$\mathbf{u}$作点积，就必有$a = \mathbf{u}\cdot\mathbf{v}/\mathbf{u}\cdot\mathbf{u}$。
:::
:::

::: application 力所做的功
恒力$\mathbf{F}$使物体产生位移$\mathbf{D}$时所做的**功**为$W = \mathbf{F}\cdot\mathbf{D} = \norm{\mathbf{F}}\norm{\mathbf{D}}\cos\theta$，即力沿运动方向的分量乘以移动的距离。与运动方向垂直的力不做功，例如用绳子甩动石块时绳中的张力。当力沿一条弯曲的路径变化时，把各小段上的$\mathbf{F}\cdot\Delta\mathbf{r}$加起来，就引出了[[multivariable/line-integrals]]一章中的曲线积分。
:::

::: warning 点积是一个数
$\mathbf{u}\cdot\mathbf{v}$是标量而不是向量，所以像$\mathbf{u}\cdot\mathbf{v}\cdot\mathbf{w}$这样的表达式没有意义——$(\mathbf{u}\cdot\mathbf{v})\mathbf{w}$是与$\mathbf{w}$平行的向量，而$\mathbf{u}(\mathbf{v}\cdot\mathbf{w})$与$\mathbf{u}$平行。点积也不能消去：$\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\cdot\mathbf{w}$只说明$\mathbf{v} - \mathbf{w}$与$\mathbf{u}$正交。例如$\mathbf{i}\cdot\mathbf{j} = \mathbf{i}\cdot\mathbf{k} = 0$，但$\mathbf{j} \neq \mathbf{k}$。
:::

## 叉积

空间中的许多问题都需要一个与两个已知向量都垂直的向量：平面的法向量、转动的轴、力矩的方向。点积用来检验垂直，叉积则用来制造垂直。

::: definition 叉积 {#def-cross}
$\mathbf{u} = (u_1,u_2,u_3)$与$\mathbf{v} = (v_1,v_2,v_3)$的**叉积**（或**向量积**）是向量

$$
\mathbf{u}\times\mathbf{v} = (u_2v_3 - u_3v_2,\; u_3v_1 - u_1v_3,\; u_1v_2 - u_2v_1) = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix},
$$

其中的行列式只是一种助记符号：像[[linear-algebra/determinants]]一章中那样按第一行展开即可。
:::

例如，$(1, 3, -1)\times(-1, 1, 3) = (3\cdot 3 - (-1)\cdot 1,\; (-1)(-1) - 1\cdot 3,\; 1\cdot 1 - 3\cdot(-1)) = (10, -2, 4)$，可以验证$(10,-2,4)$与两个因子的点积都为零。

::: theorem 叉积的代数性质 {#thm-cross-props}
对所有$\mathbf{u}, \mathbf{v}, \mathbf{w} \in \R^3$和$c \in \R$，有：

1. $\mathbf{v}\times\mathbf{u} = -(\mathbf{u}\times\mathbf{v})$，特别地，$\mathbf{u}\times\mathbf{u} = \mathbf{0}$；
2. $(c\mathbf{u})\times\mathbf{v} = c(\mathbf{u}\times\mathbf{v}) = \mathbf{u}\times(c\mathbf{v})$，且$\mathbf{u}\times(\mathbf{v} + \mathbf{w}) = \mathbf{u}\times\mathbf{v} + \mathbf{u}\times\mathbf{w}$；
3. $\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = 0$，$\mathbf{v}\cdot(\mathbf{u}\times\mathbf{v}) = 0$；
4. $\mathbf{i}\times\mathbf{j} = \mathbf{k}$，$\mathbf{j}\times\mathbf{k} = \mathbf{i}$，$\mathbf{k}\times\mathbf{i} = \mathbf{j}$。
:::

::: proof
$\mathbf{u}\times\mathbf{v}$的每个分量都具有$u_av_b - u_bv_a$的形式。交换$\mathbf{u}$与$\mathbf{v}$会改变每个分量的符号，这就是(1)；取$\mathbf{v} = \mathbf{u}$，得$\mathbf{u}\times\mathbf{u} = -\mathbf{u}\times\mathbf{u}$，所以它是$\mathbf{0}$。固定$\mathbf{v}$时，每个分量关于$\mathbf{u}$是线性的，反之亦然，这就是(2)。至于(3)，

$$
\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = u_1(u_2v_3 - u_3v_2) + u_2(u_3v_1 - u_1v_3) + u_3(u_1v_2 - u_2v_1) = 0,
$$

因为这六项两两抵消（$u_1u_2v_3$与$-u_2u_1v_3$抵消，等等）；第二个恒等式可由第一个和(1)推出。最后，(4)只需直接代入：$(1,0,0)\times(0,1,0) = (0\cdot 0 - 0\cdot 1,\; 0\cdot 0 - 1\cdot 0,\; 1\cdot 1 - 0\cdot 0) = (0,0,1)$，其余两个同理。
:::

性质(3)正是这个定义的要义所在：$\mathbf{u}\times\mathbf{v}$与$\mathbf{u}$和$\mathbf{v}$都正交。它的长度则有一个漂亮的解释。

### 叉积的长度

::: theorem 拉格朗日（Lagrange）恒等式与平行四边形的面积 {#thm-cross-length}
对所有$\mathbf{u}, \mathbf{v} \in \R^3$，

$$
\norm{\mathbf{u}\times\mathbf{v}}^2 = \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2 - (\mathbf{u}\cdot\mathbf{v})^2 .
$$

因此，若$\theta$是非零向量$\mathbf{u}$与$\mathbf{v}$的夹角，则$\norm{\mathbf{u}\times\mathbf{v}} = \norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$，这正是以$\mathbf{u}$和$\mathbf{v}$为边的平行四边形的面积。特别地，$\mathbf{u}\times\mathbf{v} = \mathbf{0}$当且仅当$\mathbf{u}$与$\mathbf{v}$平行（其中一个是另一个的倍数）。
:::

::: proof
展开右边，其中的求和都对$i, j \in \set{1,2,3}$进行：

$$
\Bigl(\sum_i u_i^2\Bigr)\Bigl(\sum_j v_j^2\Bigr) - \Bigl(\sum_i u_iv_i\Bigr)^2 = \sum_{i\ne j} u_i^2v_j^2 - 2\sum_{i<j} u_iv_iu_jv_j = \sum_{i<j}\bigl(u_iv_j - u_jv_i\bigr)^2 ,
$$

这是因为两个乘积中$i = j$的项相互抵消，而每个无序对$i < j$贡献$u_i^2v_j^2 + u_j^2v_i^2 - 2u_iv_ju_jv_i$。三个平方$(u_1v_2 - u_2v_1)^2$、$(u_1v_3 - u_3v_1)^2$、$(u_2v_3 - u_3v_2)^2$恰好是$\mathbf{u}\times\mathbf{v}$各分量的平方，这就证明了该恒等式。

利用[[#thm-dot-geometric]]，右边等于$\norm{\mathbf{u}}^2\norm{\mathbf{v}}^2(1 - \cos^2\theta) = \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2\sin^2\theta$，并且当$\theta\in[0,\pi]$时$\sin\theta \ge 0$。两边长为$\norm{\mathbf{u}}$和$\norm{\mathbf{v}}$、夹角为$\theta$的平行四边形，底为$\norm{\mathbf{u}}$，高为$\norm{\mathbf{v}}\sin\theta$。最后，这个恒等式表明，$\mathbf{u}\times\mathbf{v} = \mathbf{0}$当且仅当柯西-施瓦茨不等式中等号成立，即（由[[#thm-cauchy-schwarz]]）其中一个向量是另一个的倍数。
:::

所以，叉积是一个与$\mathbf{u}$和$\mathbf{v}$都垂直的向量，其长度等于它们张成的面积。这就把叉积确定到只差一个符号；符号由**右手法则**确定：让右手四指从$\mathbf{u}$弯向$\mathbf{v}$，大拇指就指向$\mathbf{u}\times\mathbf{v}$的方向——正如$\mathbf{i}\times\mathbf{j} = \mathbf{k}$。（精确的表述见[[#thm-triple-product]]之后的注记。）

::: intuition 叉积是有向面积
可以把$\mathbf{u}\times\mathbf{v}$看作由$\mathbf{u}$和$\mathbf{v}$张成的平行四边形，只不过用一个箭头记录下来：箭头的长度是面积，方向是法向，而在两个法向之间的选择记录了两条边的先后次序。这就是为什么每当需要计算空间中的面积时，叉积都会出现——其中最重要的是[[multivariable/surface-integrals]]一章中参数化曲面的面积元素$\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$。
:::

::: example 空间三角形的面积 {#ex-triangle}
求以$P = (1,0,1)$、$Q = (2,3,0)$和$R = (0,1,4)$为顶点的三角形的面积。
::: solution
这个三角形是由$\overrightarrow{PQ} = (1,3,-1)$和$\overrightarrow{PR} = (-1,1,3)$张成的平行四边形的一半。前面已经算出

$$
\overrightarrow{PQ}\times\overrightarrow{PR} = (10, -2, 4), \qquad \norm{(10,-2,4)} = \sqrt{100 + 4 + 16} = \sqrt{120} = 2\sqrt{30}.
$$

所以面积为$\tfrac12\cdot 2\sqrt{30} = \sqrt{30} \approx 5.48$。在[[#ex-plane]]中我们还会用到法向量$(10,-2,4)$。
:::
:::

::: warning 叉积不满足交换律和结合律
次序很重要：$\mathbf{v}\times\mathbf{u} = -\mathbf{u}\times\mathbf{v}$。括号也很重要：$\mathbf{i}\times(\mathbf{i}\times\mathbf{j}) = \mathbf{i}\times\mathbf{k} = -\mathbf{j}$，而$(\mathbf{i}\times\mathbf{i})\times\mathbf{j} = \mathbf{0}\times\mathbf{j} = \mathbf{0}$。所以不加括号的$\mathbf{u}\times\mathbf{v}\times\mathbf{w}$没有意义。此外，叉积是三维空间所特有的：除了$\R^7$这个奇特的例外，在$n \ge 2$的$\R^n$中，除$\R^3$之外，没有哪个空间带有同时具备[[#thm-cross-props]]中的正交性质和[[#thm-cross-length]]中的长度性质的双线性乘积。
:::

::: application 力矩与角动量
若力$\mathbf{F}$作用在相对于支点的位置为$\mathbf{r}$的点上，则它关于该支点的**力矩**为$\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F}$。力矩的长度$\norm{\mathbf{r}}\norm{\mathbf{F}}\sin\theta$解释了为什么垂直地、在远离螺母的地方推扳手最有效；力矩的方向则是这个力使物体倾向于绕之转动的轴。类似地，质量为$m$、速度为$\mathbf{v}$的质点的角动量为$\mathbf{L} = m\,\mathbf{r}\times\mathbf{v}$；角动量在有心力作用下守恒，这是开普勒（Kepler）第二定律的基础（[[multivariable/vector-functions]]）。
:::

### 混合积

把两种乘积结合起来，就得到与三个向量相联系的一个数。

::: theorem 混合积 {#thm-triple-product}
对$\mathbf{u}, \mathbf{v}, \mathbf{w} \in \R^3$，

$$
\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix},
$$

并且$\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$是以$\mathbf{u}, \mathbf{v}, \mathbf{w}$为棱的平行六面体的体积。特别地，$\mathbf{u}, \mathbf{v}, \mathbf{w}$位于同一个过原点的平面内，当且仅当$\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = 0$。
:::

::: proof
把行列式按第一行展开，得

$$
u_1(v_2w_3 - v_3w_2) - u_2(v_1w_3 - v_3w_1) + u_3(v_1w_2 - v_2w_1),
$$

而三个括号依次就是$\mathbf{v}\times\mathbf{w}$的分量$(v_2w_3 - v_3w_2)$、$(v_3w_1 - v_1w_3)$、$(v_1w_2 - v_2w_1)$（中间项的负号吸收了顺序的颠倒）。这正是$\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})$。

至于体积，把由$\mathbf{v}$和$\mathbf{w}$张成的平行四边形看作底面。若$\mathbf{v}\times\mathbf{w} = \mathbf{0}$，则底面积为零，这个立体是扁平的，两边都是$0$。否则，由[[#thm-cross-length]]，底面积为$\norm{\mathbf{v}\times\mathbf{w}}$，并且$\mathbf{n} = \mathbf{v}\times\mathbf{w}$是底面的法向量。平行六面体的高是$\mathbf{u}$沿$\mathbf{n}$的分量的长度，即$\abs{\operatorname{comp}_{\mathbf{n}}\mathbf{u}} = \abs{\mathbf{u}\cdot\mathbf{n}}/\norm{\mathbf{n}}$。因此

$$
\text{体积} = \text{底面积}\times\text{高} = \norm{\mathbf{n}}\cdot\frac{\abs{\mathbf{u}\cdot\mathbf{n}}}{\norm{\mathbf{n}}} = \abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}.
$$

三个向量位于同一个过原点的平面内，当且仅当平行六面体是扁平的，即体积为零。
:::

由于交换行列式的两行会改变它的符号，混合积在轮换下保持不变：$\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \mathbf{v}\cdot(\mathbf{w}\times\mathbf{u}) = \mathbf{w}\cdot(\mathbf{u}\times\mathbf{v})$。

::: remark 定向与右手法则
$\det[\mathbf{u}, \mathbf{v}, \mathbf{w}]$的符号记录了$(\mathbf{u}, \mathbf{v}, \mathbf{w})$是右手系（为正，就像$(\mathbf{i}, \mathbf{j}, \mathbf{k})$，其行列式为$1$）还是左手系（为负）。对于不平行的$\mathbf{u}, \mathbf{v}$，由轮换对称性得$\det[\mathbf{u}, \mathbf{v}, \mathbf{u}\times\mathbf{v}] = (\mathbf{u}\times\mathbf{v})\cdot(\mathbf{u}\times\mathbf{v}) > 0$，所以$(\mathbf{u}, \mathbf{v}, \mathbf{u}\times\mathbf{v})$总是构成右手系。这就是右手法则的精确含义，也是改用左手坐标系时叉积会变号的原因。
:::

::: example 四点共面 {#ex-coplanar}
点$A = (1,0,0)$、$B = (0,1,0)$、$C = (0,0,1)$和$D = (1,1,-1)$是否位于同一平面内？
::: solution
四点共面当且仅当从$A$出发的三个棱向量共面，即它们张成的平行六面体是扁平的。由$\overrightarrow{AB} = (-1,1,0)$，$\overrightarrow{AC} = (-1,0,1)$，$\overrightarrow{AD} = (0,1,-1)$，

$$
\begin{vmatrix} -1 & 1 & 0 \\ -1 & 0 & 1 \\ 0 & 1 & -1 \end{vmatrix} = -1\,(0 - 1) - 1\,(1 - 0) + 0 = 1 - 1 = 0 .
$$

所以这四点共面。事实上，四个点都满足$x + y + z = 1$。
:::
:::

::: quiz
下列哪些命题对$\R^3$中的**所有**向量$\mathbf{u}, \mathbf{v}, \mathbf{w}$都成立？（选出所有正确的选项。）
- [ ] $\mathbf{u}\times\mathbf{v} = \mathbf{v}\times\mathbf{u}$
- [x] $\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = 0$
- [ ] $\mathbf{u}\times(\mathbf{v}\times\mathbf{w}) = (\mathbf{u}\times\mathbf{v})\times\mathbf{w}$
- [x] $\norm{\mathbf{u}\times\mathbf{v}} \le \norm{\mathbf{u}}\,\norm{\mathbf{v}}$
- [x] $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \mathbf{w}\cdot(\mathbf{u}\times\mathbf{v})$
::: solution
叉积是反交换的，所以只要$\mathbf{u}\times\mathbf{v} \ne \mathbf{0}$，第一个命题就不成立；叉积也不满足结合律（见上面的“注意”）。第二个命题就是[[#thm-cross-props]](3)。第四个命题由$\norm{\mathbf{u}\times\mathbf{v}} = \norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$和$\sin\theta \le 1$推出。最后一个是混合积的轮换对称性。
:::
:::

## 直线与平面

一条直线由它上面的一点和一个方向确定。若$\mathbf{r}_0$是直线上一点$P_0$的位置向量，$\mathbf{v} \neq \mathbf{0}$与直线平行，则直线上的点恰好就是位置向量具有如下形式的点：

$$
\mathbf{r}(t) = \mathbf{r}_0 + t\,\mathbf{v}, \qquad t\in\R .
$$ {#eq-line}

写成分量形式，记$\mathbf{r}_0 = (x_0, y_0, z_0)$，$\mathbf{v} = (a, b, c)$，就得到**参数方程**$x = x_0 + at$，$y = y_0 + bt$，$z = z_0 + ct$。若$a, b, c$都不为零，可以消去$t$，得到**对称式方程**

$$
\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}.
$$

把$t$看作时间：[[#eq-line]]描述的是一个以恒定速度$\mathbf{v}$运动、在$t = 0$时经过$P_0$的质点。在平面上，两条不同的直线要么平行，要么相交；在空间中还有第三种可能。既不平行又不相交的两条直线称为**异面直线**。

一个平面由它上面的一点$P_0$和一个与它垂直的**法向量**$\mathbf{n} \ne \mathbf{0}$确定。位置向量为$\mathbf{r}$的点$P$位于该平面内，当且仅当$\overrightarrow{P_0P} = \mathbf{r} - \mathbf{r}_0$与$\mathbf{n}$正交：

$$
\mathbf{n}\cdot(\mathbf{r} - \mathbf{r}_0) = 0, \qquad\text{或写成分量形式}\qquad ax + by + cz = d,
$$ {#eq-plane}

其中$\mathbf{n} = (a, b, c)$，$d = \mathbf{n}\cdot\mathbf{r}_0 = ax_0 + by_0 + cz_0$。反之，每个满足$(a,b,c) \ne \mathbf{0}$的方程$ax + by + cz = d$都表示一个以$(a, b, c)$为法向量的平面：任取一个解$\mathbf{r}_0$（例如当$a \ne 0$时取$(d/a, 0, 0)$），则$ax + by + cz = d$等价于$\mathbf{n}\cdot\mathbf{r} = \mathbf{n}\cdot\mathbf{r}_0$，这就是[[#eq-plane]]。所以，**线性方程的系数构成一个法向量**，这个事实会经常用到。

两个平面的夹角定义为它们法向量的夹角（或其补角）；两个平面平行当且仅当它们的法向量平行；两个不平行的平面相交于一条直线，其方向与两个法向量都垂直，即$\mathbf{n}_1\times\mathbf{n}_2$。

::: example 过三点的平面 {#ex-plane}
求过点$P = (1,0,1)$、$Q = (2,3,0)$和$R = (0,1,4)$的平面的方程。
::: solution
向量$\overrightarrow{PQ}$和$\overrightarrow{PR}$位于该平面内，所以它们的叉积——[[#ex-triangle]]中的$(10,-2,4)$——是一个法向量，$\mathbf{n} = (5, -1, 2)$也是。利用点$P$：

$$
5(x - 1) - (y - 0) + 2(z - 1) = 0, \qquad\text{即}\qquad 5x - y + 2z = 7.
$$

用另外两点检验：$5\cdot2 - 3 + 0 = 7$，$0 - 1 + 8 = 7$。（如果这三点共线，叉积就会是$\mathbf{0}$，它们也就不能确定一个平面。）
:::
:::

::: quiz
平面$2x - y + 3z = 1$与$-4x + 2y - 6z = 5$有什么关系？
- [ ] 它们是同一个平面
- [x] 它们平行且不重合
- [ ] 它们互相垂直
- [ ] 它们相交于一条直线
::: solution
法向量$(2,-1,3)$与$(-4,2,-6) = -2\,(2,-1,3)$平行，所以这两个平面平行。把第二个方程除以$-2$，得$2x - y + 3z = -\tfrac52$，其右边与第一个方程不同，所以没有点同时位于两个平面上。
:::
:::

### 距离

要求点到平面的距离，就像[[#prop-projection]]中那样作垂线。

::: theorem 点到平面的距离 {#thm-point-plane}
位置向量为$\mathbf{r}_1 = (x_1, y_1, z_1)$的点$P_1$到平面$\Pi\colon ax + by + cz = d$的距离为

$$
D = \frac{\abs{ax_1 + by_1 + cz_1 - d}}{\sqrt{a^2 + b^2 + c^2}} ,
$$

并且$\Pi$上离$P_1$最近的点是垂足$\mathbf{q} = \mathbf{r}_1 - \lambda\mathbf{n}$，其中$\mathbf{n} = (a,b,c)$，$\lambda = (\mathbf{n}\cdot\mathbf{r}_1 - d)/\norm{\mathbf{n}}^2$。
:::

::: proof
首先，$\mathbf{q}$在$\Pi$上：$\mathbf{n}\cdot\mathbf{q} = \mathbf{n}\cdot\mathbf{r}_1 - \lambda\norm{\mathbf{n}}^2 = d$。现在设$\mathbf{r}$是$\Pi$上的任意一点。则$\mathbf{n}\cdot(\mathbf{q} - \mathbf{r}) = d - d = 0$，所以$\mathbf{r}_1 - \mathbf{q} = \lambda\mathbf{n}$与$\mathbf{q} - \mathbf{r}$正交，由勾股定理得

$$
\norm{\mathbf{r}_1 - \mathbf{r}}^2 = \norm{(\mathbf{r}_1 - \mathbf{q}) + (\mathbf{q} - \mathbf{r})}^2 = \lambda^2\norm{\mathbf{n}}^2 + \norm{\mathbf{q} - \mathbf{r}}^2 \ge \lambda^2\norm{\mathbf{n}}^2,
$$

且仅当$\mathbf{r} = \mathbf{q}$时等号成立。所以最小距离为$\abs{\lambda}\norm{\mathbf{n}} = \abs{\mathbf{n}\cdot\mathbf{r}_1 - d}/\norm{\mathbf{n}}$，这正是所述的公式。
:::

对于[[#ex-plane]]中的平面$5x - y + 2z = 7$，原点到它的距离为$\abs{0 - 7}/\sqrt{30} = 7/\sqrt{30} \approx 1.28$。公式中绝对值号内的表达式，其符号也携带着信息：满足$ax+by+cz > d$的点位于平面的$\mathbf{n}$所指向的那一侧。

::: example 两条异面直线之间的距离 {#ex-skew}
证明直线$L_1\colon \mathbf{r} = t(1,1,0)$与$L_2\colon \mathbf{r} = (1,0,1) + s(0,1,1)$是异面直线，并求它们之间的距离。
::: solution
方向向量$\mathbf{v}_1 = (1,1,0)$与$\mathbf{v}_2 = (0,1,1)$不平行。它们的叉积

$$
\mathbf{n} = \mathbf{v}_1\times\mathbf{v}_2 = (1\cdot1 - 0\cdot1,\; 0\cdot0 - 1\cdot1,\; 1\cdot1 - 1\cdot0) = (1, -1, 1)
$$

与两条直线都垂直。过$L_1$且以$\mathbf{n}$为法向量的平面是$x - y + z = 0$，过$L_2$且以$\mathbf{n}$为法向量的平面是$x - y + z = 2$（代入点$(1,0,1)$）。这两个平行平面分别包含两条直线，所以两直线之间的距离就是两平面之间的距离——由[[#thm-point-plane]]，即$(1,0,1)$到$x - y + z = 0$的距离：

$$
D = \frac{\abs{1 - 0 + 1}}{\sqrt{3}} = \frac{2}{\sqrt3} \approx 1.155 .
$$

由于$D > 0$，两直线不相交；它们又不平行，所以是异面直线。一般地，分别过$P_1, P_2$、方向为$\mathbf{v}_1, \mathbf{v}_2$的两条直线之间的距离为$\abs{\overrightarrow{P_1P_2}\cdot(\mathbf{v}_1\times\mathbf{v}_2)}/\norm{\mathbf{v}_1\times\mathbf{v}_2}$。把$t(1,1,0)$与$(1,0,1) + s(0,1,1)$之间距离的平方对$t$和$s$求最小值，可以验证这一点：最近的两点是$(\tfrac13, \tfrac13, 0)$和$(1, -\tfrac13, \tfrac23)$，它们相差$\tfrac23(1,-1,1)$，其长度为$\tfrac{2}{\sqrt3}$，并且与$\mathbf{n}$平行，这是理所当然的。
:::
:::

::: warning 法向量不是平面内的方向
$ax+by+cz=d$的系数向量$(a,b,c)$与平面垂直，而不是沿着平面。所以，方向为$\mathbf{v}$的直线在$\mathbf{v}\cdot\mathbf{n} = 0$时与平面**平行**，在$\mathbf{v}$是$\mathbf{n}$的倍数时与平面**垂直**——这与学生们最初常写的恰好相反。同样，两平面交线的方向是$\mathbf{n}_1\times\mathbf{n}_2$，而不是$\mathbf{n}_1$或$\mathbf{n}_2$。
:::

::: application 计算机图形学中的光照
渲染软件用许多小三角形来表示曲面。对每个顶点为$P, Q, R$的三角形，软件计算法向量$\overrightarrow{PQ}\times\overrightarrow{PR}$（顶点的顺序决定了哪一侧是“外侧”）；在来自单位方向$\boldsymbol{\ell}$的光线照射下，三角形的亮度取为与$\max(0, \mathbf{n}\cdot\boldsymbol{\ell})$成正比，其中$\mathbf{n}$是单位法向量——这就是朗伯（Lambert）余弦定律。法向量背离摄像机的面（通过一个点积的符号来判断）根本不予绘制。3D游戏的每一帧都要计算数以百万计的本章所讲的这些乘积。
:::

## 二次曲面

关于$x, y, z$的线性方程表示一个平面。次简单的曲面由二次方程给出，称为**二次曲面**；它们将是我们检验切平面、极值、曲率和曲面积分的试验用例。通过平移和旋转坐标轴，每个非退化的二次曲面都可以化为少数几种标准形式之一（旋转使一个对称矩阵对角化，参见[[linear-algebra/spectral-theorem]]一章）。设$a, b, c > 0$：

| 曲面 | 标准方程 | 截痕（截线） |
|---|---|---|
| 椭球面 | $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$ | 三个方向的截痕都是椭圆 |
| 椭圆抛物面 | $z = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$ | $z = k > 0$时为椭圆；$x = k$或$y = k$时为抛物线 |
| 双曲抛物面 | $z = \dfrac{x^2}{a^2} - \dfrac{y^2}{b^2}$ | $z = k \ne 0$时为双曲线；$x = k$或$y = k$时为抛物线 |
| 锥面 | $z^2 = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$ | $z = k \ne 0$时为椭圆；$x = k$、$y = k$时为双曲线或一对直线 |
| 单叶双曲面 | $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = 1$ | $z = k$时为椭圆；$x = k$、$y = k$时为双曲线（$\abs{k} = a$或$b$时为一对直线） |
| 双叶双曲面 | $-\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$ | $z = k$且$\abs{k} > c$时为椭圆；$x = k$、$y = k$时为双曲线 |

识别二次曲面的方法是考察它的**截痕**，即曲面与平行于坐标面的平面相交所得的曲线。每条截痕都是一条二元的圆锥曲线，而你已经知道如何识别圆锥曲线。对于双曲抛物面$z = x^2 - y^2$，它在平面$y = k$上的截痕是开口向上的抛物线$z = x^2 - k^2$，在$x = k$上的截痕是开口向下的抛物线$z = k^2 - y^2$，而在高度$z = k$处的截痕是双曲线$x^2 - y^2 = k$（$k > 0$时沿$x$轴方向张开，$k < 0$时沿$y$轴方向张开，$k = 0$时为一对直线$y = \pm x$）。其结果就是图中的马鞍面。

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
caption: 双曲抛物面$z = x^2 - y^2$。旋转它：沿$x$方向它向上弯曲，沿$y$方向它向下弯曲；等高线（即截痕$z = k$）是双曲线，在高度$0$处交叉成一对直线$y = \pm x$。在[[multivariable/extrema]]一章中，这个马鞍面将作为鞍点的标准例子再次出现。
:::

::: example 识别二次曲面 {#ex-quadric}
指出曲面$x^2 + 2z^2 - 6x - y + 10 = 0$是什么曲面。
::: solution
只有$x$和$z$以平方的形式出现，所以对$x$配方：$x^2 - 6x = (x - 3)^2 - 9$。方程化为

$$
(x - 3)^2 + 2z^2 = y - 1 .
$$

这是一个椭圆抛物面。它的顶点在$(3, 1, 0)$，开口朝$y$增大的方向：当$k > 1$时，截痕$y = k$是椭圆$(x-3)^2 + 2z^2 = k - 1$（当$k < 1$时截痕为空集），截痕$z = 0$和$x = 3$分别是抛物线$y = 1 + (x-3)^2$和$y = 1 + 2z^2$。与标准形式相比，$y$与$z$的角色互换了，顶点也离开了原点。
:::
:::

双曲面和锥面属于同一个曲面族。对常数$k$，曲面$x^2 + y^2 - z^2 = k$在$k > 0$时是单叶双曲面，在$k = 0$时是锥面，在$k < 0$时是双叶双曲面。每条水平截痕都是圆$x^2 + y^2 = k + z^2$，所以这个曲面是由半径为$\sqrt{k + z^2}$的圆扫出来的，下图正是这样画出它的。

::: widget surface
fx: sqrt(max(k + v^2, 0))*cos(u)
fy: sqrt(max(k + v^2, 0))*sin(u)
fz: v
u: 0, 2pi
v: -2, 2
sliders: k=1:-1:1:0.05
caption: 曲面$x^2 + y^2 - z^2 = k$，在每个高度$z$处画成半径为$\sqrt{k + z^2}$的圆。把$k$从$1$逐渐减小到$-1$：单叶双曲面的腰部逐渐收窄，在$k = 0$时收缩成锥面的顶点，随后曲面撕裂成双叶双曲面的两叶（在不存在实圆的地方，图中用一段轴把两叶连接起来）。
:::

::: application 曲面上的直线
单叶双曲面$x^2 + y^2 - z^2 = 1$包含无穷多条直线：对每个角度$t$，每个点$(\cos t - s\sin t,\; \sin t + s\cos t,\; s)$（$s \in \R$）都满足该方程，因为$(\cos t - s\sin t)^2 + (\sin t + s\cos t)^2 - s^2 = 1$。双曲抛物面也被直线所覆盖，因为$x^2 - y^2 = (x-y)(x+y)$。这样的**直纹面**可以用笔直的梁搭建起来，这就是为什么发电站的冷却塔和许多格构塔都是双曲面形状：外形弯曲而坚固，但每一根结构构件都是直的。
:::

::: history
空间坐标与解析几何一样古老：17世纪30年代，笛卡儿（Descartes）和费马（Fermat）在平面上引入了坐标方法；此后，克莱罗（Clairaut）和欧拉（Euler）等18世纪的数学家通过关于$x$、$y$、$z$的方程来研究空间中的曲线和曲面。作为代数对象的向量则晚了一个世纪才出现。1843年，威廉·罗恩·哈密顿（William Rowan Hamilton）发现了四元数，即形如$a + b\,i + c\,j + d\,k$的数，并把其中的$b\,i + c\,j + d\,k$部分称为**向量**（vector）；两个向量的四元数乘积的标量部分为$-\mathbf{u}\cdot\mathbf{v}$，向量部分为$\mathbf{u}\times\mathbf{v}$。1844年，赫尔曼·格拉斯曼（Hermann Grassmann）出版了《扩张论》（*Ausdehnungslehre*），这是一套关于任意维数的向量及其乘积的理论，远远超前于它的时代，却鲜有人读。19世纪80年代，耶鲁大学的约西亚·威拉德·吉布斯（Josiah Willard Gibbs）和英国的奥利弗·亥维赛（Oliver Heaviside）都在研究麦克斯韦（Maxwell）的电磁理论，他们把哈密顿的乘积拆分成独立的点积和叉积，创立了本章所讲的向量代数。吉布斯的讲义通过他的学生埃德温·比德韦尔·威尔逊（Edwin Bidwell Wilson）编写的教科书《向量分析》（*Vector Analysis*，1901）而广为流传。
:::

## 后续内容

向量是本课程其余部分的语言。让点$\mathbf{r}_0 + t\mathbf{v}$沿曲线而不是直线运动，就得到[[multivariable/vector-functions]]一章中的向量值函数，在那里，点积和叉积将给出速率、曲率和副法向量。平面的法向量推广为梯度，梯度是等值面的法向量；曲面的切平面也完全按照[[#eq-plane]]的方式写出（[[multivariable/gradient]]）。混合积可以解释为体积，这就是行列式出现在换元公式中的原因（[[multivariable/change-of-variables]]）；叉积可以解释为面积，由此得到曲面的面积元素（[[multivariable/surface-integrals]]）。在[[linear-algebra/inner-products]]一章中，点积被推广为抽象的内积，柯西-施瓦茨不等式在那里依然成立，证明也相同。

::: summary
- $\R^3$中向量的加法和数乘都按分量进行；$\norm{\mathbf{v}} = \sqrt{v_1^2+v_2^2+v_3^2}$，$\mathbf{v}/\norm{\mathbf{v}}$是与$\mathbf{v}$同方向的单位向量。
- 点积$\mathbf{u}\cdot\mathbf{v} = \sum u_iv_i = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$度量角度；$\mathbf{u}\perp\mathbf{v}$当且仅当$\mathbf{u}\cdot\mathbf{v} = 0$（[[#thm-dot-geometric]]）。
- 柯西-施瓦茨不等式$\abs{\mathbf{u}\cdot\mathbf{v}} \le \norm{\mathbf{u}}\norm{\mathbf{v}}$在每个$\R^n$中都成立，并蕴涵三角不等式（[[#thm-cauchy-schwarz]]）。
- $\proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\mathbf{u}$是$\mathbf{u}$的倍数中最接近$\mathbf{v}$的一个，并且$\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}\perp\mathbf{u}$。
- $\mathbf{u}\times\mathbf{v}$与$\mathbf{u}$和$\mathbf{v}$都正交，遵循右手法则，长度为$\norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$，即它们张成的平行四边形的面积（[[#thm-cross-length]]）。叉积是反交换的，且不满足结合律。
- $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \det[\mathbf{u};\mathbf{v};\mathbf{w}]$是有向体积；它为零当且仅当三个向量共面（[[#thm-triple-product]]）。
- 直线：$\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$。平面：$\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0) = 0$，即$ax + by + cz = d$，法向量为$(a,b,c)$。点到平面的距离：$\abs{ax_1+by_1+cz_1-d}/\norm{\mathbf{n}}$。
- 二次曲面可以通过截痕来识别；配方可以确定它们的中心或顶点。
:::

## 习题

::: exercise 求夹角 {level=1 check="pi/3"}
求$\mathbf{u} = (1, 0, 1)$与$\mathbf{v} = (0, 1, 1)$的夹角（用弧度表示）。
::: solution
$\mathbf{u}\cdot\mathbf{v} = 0 + 0 + 1 = 1$，$\norm{\mathbf{u}} = \norm{\mathbf{v}} = \sqrt2$，所以$\cos\theta = \dfrac{1}{\sqrt2\sqrt2} = \dfrac12$，$\theta = \dfrac{\pi}{3}$。
:::
:::

::: exercise 三角形的面积 {level=1 check="7/2"}
求以$A = (1,0,0)$、$B = (0,2,0)$和$C = (0,0,3)$为顶点的三角形的面积。
::: solution
$\overrightarrow{AB} = (-1, 2, 0)$，$\overrightarrow{AC} = (-1, 0, 3)$，所以

$$
\overrightarrow{AB}\times\overrightarrow{AC} = (2\cdot 3 - 0\cdot 0,\; 0\cdot(-1) - (-1)\cdot 3,\; (-1)\cdot 0 - 2\cdot(-1)) = (6, 3, 2),
$$

其长度为$\sqrt{36 + 9 + 4} = 7$。三角形的面积是平行四边形面积的一半：$\tfrac72$。
:::
:::

::: exercise 到平面的距离 {level=1 check="18/7"}
求点$(1, -2, 4)$到平面$3x + 2y + 6z = 5$的距离。
::: solution
由[[#thm-point-plane]]，$D = \dfrac{\abs{3\cdot1 + 2\cdot(-2) + 6\cdot4 - 5}}{\sqrt{9 + 4 + 36}} = \dfrac{\abs{18}}{7} = \dfrac{18}{7}$。
:::
:::

::: exercise 包含一条直线的平面 {level=2}
求包含点$(1,1,1)$和直线$\mathbf{r}(t) = (2,0,1) + t(1,-1,2)$的平面的方程。
::: hint
你需要平面内两个线性无关的方向：直线的方向，以及从直线上一点指向$(1,1,1)$的向量。
:::
::: solution
该平面包含点$P = (1,1,1)$以及直线上的点$Q = (2,0,1)$，所以它包含方向$\overrightarrow{PQ} = (1,-1,0)$和$\mathbf{v} = (1,-1,2)$。一个法向量为

$$
\overrightarrow{PQ}\times\mathbf{v} = ((-1)\cdot 2 - 0\cdot(-1),\; 0\cdot 1 - 1\cdot 2,\; 1\cdot(-1) - (-1)\cdot 1) = (-2,-2,0),
$$

所以可以取$\mathbf{n} = (1,1,0)$。过点$P$：$(x - 1) + (y - 1) = 0$，即$x + y = 2$。检验：直线上的每个点$(2+t, -t, 1+2t)$都满足$(2 + t) + (-t) = 2$。
:::
:::

::: exercise 平行六面体的体积 {level=2 check="1"}
求以$\mathbf{u} = (1,2,3)$、$\mathbf{v} = (0,1,4)$和$\mathbf{w} = (5,6,0)$为棱的平行六面体的体积。
::: solution
由[[#thm-triple-product]]，体积等于下式的绝对值：

$$
\begin{vmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{vmatrix} = 1\,(0 - 24) - 2\,(0 - 20) + 3\,(0 - 5) = -24 + 40 - 15 = 1,
$$

所以体积为$1$。（行列式为正，所以这三个向量不共面，并且$(\mathbf{u}, \mathbf{v}, \mathbf{w})$构成右手系。）
:::
:::

::: exercise 四面体的体积 {level=2 check="13/6"}
一个四面体以$O$为一个顶点，从$O$出发的三条棱为$\mathbf{u}, \mathbf{v}, \mathbf{w}$；它是一个棱锥，底面是由$\mathbf{v}$和$\mathbf{w}$张成的平行四边形的一半。利用“棱锥的体积$= \tfrac13\times$底面积$\times$高”，证明它的体积为$\tfrac16\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$，并求以$(0,0,0)$、$(1,2,0)$、$(0,1,3)$和$(2,0,1)$为顶点的四面体的体积。
::: solution
底面三角形的面积为$\tfrac12\norm{\mathbf{v}\times\mathbf{w}}$，而与[[#thm-triple-product]]的证明一样，高为$\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}/\norm{\mathbf{v}\times\mathbf{w}}$。所以体积为$\tfrac13\cdot\tfrac12\norm{\mathbf{v}\times\mathbf{w}}\cdot\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}/\norm{\mathbf{v}\times\mathbf{w}} = \tfrac16\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$。对于给定的顶点，

$$
\begin{vmatrix} 1 & 2 & 0 \\ 0 & 1 & 3 \\ 2 & 0 & 1 \end{vmatrix} = 1\,(1 - 0) - 2\,(0 - 6) + 0 = 13,
$$

所以体积为$\tfrac{13}{6}$。
:::
:::

::: exercise 辨认二次曲面 {level=2}
指出曲面$4x^2 - y^2 + 2z^2 + 4 = 0$是什么曲面，并描述它的截痕。
::: solution
移项并除以$4$：$\dfrac{y^2}{4} - x^2 - \dfrac{z^2}{2} = 1$。这是一个以$y$轴（对应带正号的那个变量）为轴的双叶双曲面。截痕：对$y = k$，$x^2 + \tfrac{z^2}{2} = \tfrac{k^2}{4} - 1$，当$\abs{k} > 2$时为椭圆，当$\abs{k} = 2$时为单个点$(0, \pm2, 0)$，当$\abs{k} < 2$时为空集——所以曲面有两叶，分别位于$y \ge 2$和$y \le -2$。对$x = k$，$\tfrac{y^2}{4} - \tfrac{z^2}{2} = 1 + k^2$；对$z = k$，$\tfrac{y^2}{4} - x^2 = 1 + \tfrac{k^2}{2}$：它们都是沿$y$轴方向张开的双曲线。
:::
:::

::: exercise 异面直线 {level=2 check="sqrt(2)"}
求直线$\mathbf{r} = (1,0,2) + t(2,1,-1)$与$\mathbf{r} = (0,3,1) + s(1,-1,1)$之间的距离。
::: solution
两个方向不平行，且$\mathbf{n} = (2,1,-1)\times(1,-1,1) = (1\cdot 1 - (-1)(-1),\; (-1)\cdot 1 - 2\cdot 1,\; 2\cdot(-1) - 1\cdot 1) = (0,-3,-3)$。由$\overrightarrow{P_1P_2} = (0,3,1) - (1,0,2) = (-1, 3, -1)$，[[#ex-skew]]中的公式给出

$$
D = \frac{\abs{(-1,3,-1)\cdot(0,-3,-3)}}{\norm{(0,-3,-3)}} = \frac{\abs{0 - 9 + 3}}{3\sqrt2} = \frac{6}{3\sqrt2} = \sqrt2 .
$$
:::
:::

::: exercise 点到直线的距离 {level=3}
设$L$是过$P_0$、方向为$\mathbf{v} \ne \mathbf{0}$的直线。证明点$P$到$L$的距离为$\dfrac{\norm{\overrightarrow{P_0P}\times\mathbf{v}}}{\norm{\mathbf{v}}}$，并用它求点$(1,2,3)$到过原点、方向为$(1,1,1)$的直线的距离。
::: hint
所求距离就是$\mathbf{w} = \overrightarrow{P_0P}$与$\mathbf{v}$正交的分量的长度。把[[#prop-projection]]与拉格朗日恒等式结合起来。
:::
::: solution
设$\mathbf{w} = \overrightarrow{P_0P}$。$L$上的点为$P_0 + t\mathbf{v}$，$P$到这样一点的距离为$\norm{\mathbf{w} - t\mathbf{v}}$。由[[#prop-projection]]，当$t\mathbf{v} = \proj_{\mathbf{v}}\mathbf{w}$时这个距离最小，再由勾股定理，最小距离$D$满足

$$
D^2 = \norm{\mathbf{w}}^2 - \norm{\proj_{\mathbf{v}}\mathbf{w}}^2 = \norm{\mathbf{w}}^2 - \frac{(\mathbf{v}\cdot\mathbf{w})^2}{\norm{\mathbf{v}}^2} = \frac{\norm{\mathbf{w}}^2\norm{\mathbf{v}}^2 - (\mathbf{v}\cdot\mathbf{w})^2}{\norm{\mathbf{v}}^2} = \frac{\norm{\mathbf{w}\times\mathbf{v}}^2}{\norm{\mathbf{v}}^2}
$$

最后一步用到了拉格朗日恒等式（[[#thm-cross-length]]）。对于$P = (1,2,3)$，$P_0 = O$，$\mathbf{v} = (1,1,1)$：$\mathbf{w}\times\mathbf{v} = (2 - 3,\, 3 - 1,\, 1 - 2) = (-1, 2, -1)$，其长度为$\sqrt6$，所以$D = \sqrt6/\sqrt3 = \sqrt2$。
:::
:::

::: exercise 双重向量积 {level=3}
证明：对所有$\mathbf{a}, \mathbf{b}, \mathbf{c} \in \R^3$，

$$
\mathbf{a}\times(\mathbf{b}\times\mathbf{c}) = (\mathbf{a}\cdot\mathbf{c})\,\mathbf{b} - (\mathbf{a}\cdot\mathbf{b})\,\mathbf{c},
$$

并由此推出**雅可比（Jacobi）恒等式**$\mathbf{a}\times(\mathbf{b}\times\mathbf{c}) + \mathbf{b}\times(\mathbf{c}\times\mathbf{a}) + \mathbf{c}\times(\mathbf{a}\times\mathbf{b}) = \mathbf{0}$。
::: hint
两边关于$\mathbf{a}, \mathbf{b}, \mathbf{c}$中的每一个都是线性的，所以只需在它们各自取$\mathbf{i}, \mathbf{j}, \mathbf{k}$之一时验证这个恒等式——或者直接比较第一个分量。
:::
::: solution
比较第一个分量。由于$\mathbf{b}\times\mathbf{c} = (b_2c_3 - b_3c_2,\; b_3c_1 - b_1c_3,\; b_1c_2 - b_2c_1)$，$\mathbf{a}\times(\mathbf{b}\times\mathbf{c})$的第一个分量为

$$
a_2(b_1c_2 - b_2c_1) - a_3(b_3c_1 - b_1c_3) = b_1(a_2c_2 + a_3c_3) - c_1(a_2b_2 + a_3b_3).
$$

加上再减去$a_1b_1c_1$，它就变成$b_1(\mathbf{a}\cdot\mathbf{c}) - c_1(\mathbf{a}\cdot\mathbf{b})$，即右边的第一个分量。其余分量可以同样得到（或者把坐标按$1\to2\to3\to1$轮换重新标号，这样做两边都保持不变）。对于雅可比恒等式，对每一项应用这个公式：

$$
\bigl[(\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{a}\cdot\mathbf{b})\mathbf{c}\bigr] + \bigl[(\mathbf{b}\cdot\mathbf{a})\mathbf{c} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}\bigr] + \bigl[(\mathbf{c}\cdot\mathbf{b})\mathbf{a} - (\mathbf{c}\cdot\mathbf{a})\mathbf{b}\bigr] = \mathbf{0},
$$

这是因为由点积的对称性，这六项两两抵消。
:::
:::

::: exercise 平行四边形及其对角线 {level=3}
设$\mathbf{u}, \mathbf{v}$是一个平行四边形的两边，于是它的对角线为$\mathbf{u}+\mathbf{v}$和$\mathbf{u}-\mathbf{v}$。证明**平行四边形公式**$\norm{\mathbf{u}+\mathbf{v}}^2 + \norm{\mathbf{u}-\mathbf{v}}^2 = 2\norm{\mathbf{u}}^2 + 2\norm{\mathbf{v}}^2$；并证明：对角线互相垂直当且仅当该平行四边形是菱形（$\norm{\mathbf{u}} = \norm{\mathbf{v}}$），对角线长度相等当且仅当它是矩形（$\mathbf{u}\cdot\mathbf{v} = 0$）。
::: solution
由[[#eq-expand]]，$\norm{\mathbf{u}\pm\mathbf{v}}^2 = \norm{\mathbf{u}}^2 \pm 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2$；把两式相加即得平行四边形公式。其次，

$$
(\mathbf{u}+\mathbf{v})\cdot(\mathbf{u}-\mathbf{v}) = \norm{\mathbf{u}}^2 - \mathbf{u}\cdot\mathbf{v} + \mathbf{v}\cdot\mathbf{u} - \norm{\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - \norm{\mathbf{v}}^2,
$$

它为零当且仅当$\norm{\mathbf{u}} = \norm{\mathbf{v}}$。最后，把两个展开式相减，得$\norm{\mathbf{u}+\mathbf{v}}^2 - \norm{\mathbf{u}-\mathbf{v}}^2 = 4\,\mathbf{u}\cdot\mathbf{v}$，它为零当且仅当$\mathbf{u}\cdot\mathbf{v} = 0$，即相邻两边互相垂直。
:::
:::
