用一个假想平面切开受载的曲轴、涡轮叶片的叶根或压力容器的器壁，切面一侧的材料就会拉、推另一侧的材料。在[[mechanics-of-materials]]中，这种作用很简单：杆承受均匀的$\sigma = N/A$，轴承受切应力$\tau = Tr/J$，梁承受线性分布的$\sigma = -My/I$，而[[mechanics-of-materials/stress-transformation]]中的平面应力单元有三个分量和一个莫尔圆。实际零件可没有这么配合。在圆角根部、螺栓孔处或接触载荷之下，六个独立的应力分量可能同时都不为零，而材料受载最严重的那个平面，往往不是你能猜到的那一个。

本章建立本课程其余部分所用的一般语言。一点处的应力是一个**张量**——一条把平面的方位变成作用在该平面上单位面积力的规则——而这条规则的全部内容由九个数刻画，其中六个是独立的。这些数不能随点任意变化：**平衡方程**把它们的导数联系在一起。一点处的变形是另一个张量，即由位移场导出的**小应变张量**；它的六个分量同样不能任意变化，因为它们只来自三个位移——这一约束就是**相容性**。平衡与相容是固体力学中每一个问题的两个部分；把它们联系起来的第三部分——材料定律——是[[solid-mechanics/linear-elasticity]]的主题。

全章中，$x, y, z$（或$x_1, x_2, x_3$）为笛卡儿坐标，拉伸正应力为正，切应力的符号按下文给出的"面与方向"规则确定。

## 应力矢量与应力张量

设想过物体内部一点$P$取一个面积为$\Delta A$的小平面，其单位法向量$\mathbf{n}$从我们要求其受力的那部分材料指向外。$\mathbf{n}$所指一侧的材料对它施加一个力$\Delta\mathbf{F}$。当这块小面缩小时，比值趋于一个极限。

::: definition 应力矢量 {#def-traction}
平面（单位法向量为$\mathbf{n}$）上点$P$处的**应力矢量**（traction，又称全应力）为
$$
\mathbf{t}^{(\mathbf{n})} = \lim_{\Delta A \to 0} \frac{\Delta \mathbf{F}}{\Delta A},
$$
即平面正侧（$\mathbf{n}$所指的一侧）的材料对负侧材料施加的单位面积上的力。它沿$\mathbf{n}$的分量$\sigma_n = \mathbf{t}\cdot\mathbf{n}$是该平面上的**正应力**（拉为正）；其余部分的大小$\tau_n = \sqrt{\lvert\mathbf{t}\rvert^2 - \sigma_n^2}$是该平面上的**切应力**。由牛顿（Newton）第三定律，$\mathbf{t}^{(-\mathbf{n})} = -\mathbf{t}^{(\mathbf{n})}$。
:::

应力矢量与平面有关：过同一点，受拉杆中垂直于杆轴的平面上作用$\sigma = N/A$而无切应力，而与杆轴成$45^\circ$的平面上正应力和切应力各为$N/2A$。于是看起来，对每一点都需要一张表，列出过该点的无穷多个平面中每一个上的应力矢量。柯西（Cauchy）的发现是：并不需要。

::: definition 应力分量 {#def-stress-components}
设$\mathbf{t}^{(x)}, \mathbf{t}^{(y)}, \mathbf{t}^{(z)}$为过$P$、外法向分别为$\mathbf{i}, \mathbf{j}, \mathbf{k}$的三个平面上的应力矢量。它们的分量就是**应力分量**$\sigma_{ij}$：第一个下标表示平面（以其法向命名），第二个下标表示力分量的方向，
$$
\mathbf{t}^{(x)} = \sigma_{xx}\mathbf{i} + \sigma_{xy}\mathbf{j} + \sigma_{xz}\mathbf{k}, \quad \text{对 } y, z \text{ 类似}.
$$
我们也记$\sigma_x = \sigma_{xx}$，$\tau_{xy} = \sigma_{xy}$。在外法向指向坐标正方向的面上沿坐标正方向作用的分量（或在负面上沿负方向作用的分量）为**正**。排成矩阵，
$$
[\boldsymbol{\sigma}] = \begin{bmatrix} \sigma_x & \tau_{xy} & \tau_{xz} \\ \tau_{yx} & \sigma_y & \tau_{yz} \\ \tau_{zx} & \tau_{zy} & \sigma_z \end{bmatrix}.
$$
:::

::: theorem 柯西应力定理 {#thm-cauchy}
在处于平衡（或以有限加速度和体积力运动）的物体内任一点，单位法向量为$\mathbf{n} = (n_x, n_y, n_z)$的平面上的应力矢量是$\mathbf{n}$的线性函数：
$$
t_i = \sum_{j} \sigma_{ji}\, n_j, \qquad \text{即}\qquad \mathbf{t} = [\boldsymbol{\sigma}]^{\mathsf T}\mathbf{n} = [\boldsymbol{\sigma}]\,\mathbf{n},
$$
其中最后一种形式用到了对称性$\sigma_{ij} = \sigma_{ji}$（[[#prop-symmetry]]）。因此，九个分量$\sigma_{ij}$决定了过该点每一个平面上的应力矢量。
:::

::: proof
在$P$处取出一个小四面体：三个面位于坐标平面上，外法向为$-\mathbf{i}, -\mathbf{j}, -\mathbf{k}$，面积为$A_x, A_y, A_z$；第四个斜面的外法向为$\mathbf{n}$，面积为$A$。把斜面投影到坐标平面上，得$A_x = n_x A$，$A_y = n_y A$，$A_z = n_z A$（对分量均为正的法向而言；其他卦限同理，符号被吸收进去）。设$h$为$P$到斜面的距离，则体积为$V = Ah/3$。

作用在四面体上的力是各面应力矢量乘以面积，以及体积力$\mathbf{b}$（单位体积）乘以$V$。在外法向为$-\mathbf{i}$的面上，应力矢量为$\mathbf{t}^{(-x)} = -\mathbf{t}^{(x)}$。设密度为$\rho$、加速度为$\mathbf{a}$，牛顿第二定律为
$$
\mathbf{t}^{(\mathbf{n})}A - \mathbf{t}^{(x)} n_x A - \mathbf{t}^{(y)} n_y A - \mathbf{t}^{(z)} n_z A + \mathbf{b}\,\frac{Ah}{3} = \rho\,\frac{Ah}{3}\,\mathbf{a}.
$$
除以$A$并令$h \to 0$（各应力矢量在各面的某个平均点上取值，这些点都趋于$P$；体积力项和惯性项随$h$成比例，因而消失）：
$$
\mathbf{t}^{(\mathbf{n})} = \mathbf{t}^{(x)}n_x + \mathbf{t}^{(y)}n_y + \mathbf{t}^{(z)}n_z .
$$
取第$i$个分量并利用[[#def-stress-components]]，得$t_i = \sigma_{xi}n_x + \sigma_{yi}n_y + \sigma_{zi}n_z = \sum_j \sigma_{ji}n_j$。假设：应力矢量在$P$附近连续，$\mathbf{b}$、$\rho\mathbf{a}$有界。表面力按$h^2$缩放，体积力按$h^3$缩放，这就是极限中只剩下表面力的原因。
:::

::: proposition 应力张量的对称性 {#prop-symmetry}
在没有分布体积力偶的情况下，$\tau_{xy} = \tau_{yx}$，$\tau_{yz} = \tau_{zy}$，$\tau_{zx} = \tau_{xz}$：应力矩阵是对称的，有六个独立分量。
:::

::: proof
取以$P$为中心的小长方体$\Delta x \times \Delta y \times \Delta z$，对过其中心的$z$轴求力矩之和。两个$x$面（面积$\Delta y\,\Delta z$）上的切应力$\tau_{xy}$给出沿$\pm y$方向的力$\pm\tau_{xy}\Delta y\Delta z$，构成力臂为$\Delta x$的力偶：力矩为逆时针的$\tau_{xy}\Delta x\Delta y\Delta z$。$y$面上的$\tau_{yx}$力给出顺时针力偶$\tau_{yx}\Delta x\Delta y\Delta z$。正应力和体积力在一阶意义上通过中心，而相对两面上应力的任何差异贡献的力矩为$\Delta^4$阶。角动量平衡给出
$$
(\tau_{xy} - \tau_{yx})\,\Delta x\,\Delta y\,\Delta z + O(\Delta^4) = I_{zz}\,\alpha_z = O(\Delta^5),
$$
因为小块的转动惯量与其尺寸的五次方成比例。除以体积并令小块缩小，得$\tau_{xy} = \tau_{yx}$；另两对同理可得。
:::

正是对称性让我们可以写$\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$而不必操心转置，它还使记账工作减半：六个数描述一点的应力状态。

::: example 斜截面上的应力矢量 {#ex-traction}
锻造支架中某点的应力分量（MPa）为
$$
[\boldsymbol{\sigma}] = \begin{bmatrix} 80 & 30 & 0 \\ 30 & -40 & 20 \\ 0 & 20 & 60 \end{bmatrix}.
$$
求法向平行于$(1, 2, 2)$的平面上的应力矢量、正应力和切应力。
::: solution
由于$\sqrt{1 + 4 + 4} = 3$，单位法向量为$\mathbf{n} = (1, 2, 2)/3$。由柯西定理，
$$
\mathbf{t} = [\boldsymbol\sigma]\mathbf{n} = \frac{1}{3}\begin{bmatrix} 80 + 60 + 0 \\ 30 - 80 + 40 \\ 0 + 40 + 120 \end{bmatrix} = \begin{bmatrix} 46.67 \\ -3.33 \\ 53.33 \end{bmatrix}\ \mathrm{MPa}.
$$
正应力是在$\mathbf{n}$上的投影：
$$
\sigma_n = \mathbf{t}\cdot\mathbf{n} = \tfrac13(46.67 - 6.67 + 106.67) = 48.89\ \mathrm{MPa}\ \text{（拉）}.
$$
应力矢量的大小为$\lvert\mathbf{t}\rvert = \sqrt{46.67^2 + 3.33^2 + 53.33^2} = 70.95\ \mathrm{MPa}$，所以该平面上的切应力为
$$
\tau_n = \sqrt{70.95^2 - 48.89^2} = 51.41\ \mathrm{MPa}.
$$
合理性检查：$\sigma_n$和$\tau_n$都不超过[[#ex-principal]]中求得的最大主应力$87.9\ \mathrm{MPa}$；切应力也低于那里求得的最大切应力$69.2\ \mathrm{MPa}$，理应如此。
:::
:::

## 平衡方程

柯西定理说明的是一点**处**的情况。平衡还约束着应力在点**与点之间**如何变化：如果小块右面上的$\sigma_x$比左面大，就必须有别的东西——切应力梯度或体积力——来平衡这一差值。

::: proposition 平衡方程 {#prop-equilibrium}
在承受单位体积体积力$\mathbf{b} = (b_x, b_y, b_z)$、处于静力平衡的物体中，应力场满足
$$
\begin{aligned}
\frac{\partial \sigma_x}{\partial x} + \frac{\partial \tau_{yx}}{\partial y} + \frac{\partial \tau_{zx}}{\partial z} + b_x &= 0,\\
\frac{\partial \tau_{xy}}{\partial x} + \frac{\partial \sigma_y}{\partial y} + \frac{\partial \tau_{zy}}{\partial z} + b_y &= 0,\\
\frac{\partial \tau_{xz}}{\partial x} + \frac{\partial \tau_{yz}}{\partial y} + \frac{\partial \sigma_z}{\partial z} + b_z &= 0,
\end{aligned}
$$ {#eq-equilibrium}
或简写为$\sum_j \partial\sigma_{ji}/\partial x_j + b_i = 0$。对于运动的物体，右端变为$\rho\,a_x$、$\rho\,a_y$、$\rho\,a_z$。在边界上，设外法向为$\mathbf{n}$、给定面力为$\bar{\mathbf{t}}$，应力必须满足$[\boldsymbol\sigma]\mathbf{n} = \bar{\mathbf{t}}$。
:::

::: proof
考虑角点位于$(x, y, z)$的小块$\Delta x\times\Delta y\times\Delta z$，把$x$方向的力相加。在$x + \Delta x$处的面上，正应力为$\sigma_x(x + \Delta x) \approx \sigma_x(x) + (\partial\sigma_x/\partial x)\Delta x$，沿$+x$作用；在$x$处的面上为$\sigma_x(x)$，沿$-x$作用。它们的合力为$(\partial\sigma_x/\partial x)\,\Delta x\,\Delta y\,\Delta z$。对$y$面和$z$面上沿$x$方向的切应力作同样论证，得$(\partial\tau_{yx}/\partial y)\,\Delta V$和$(\partial\tau_{zx}/\partial z)\,\Delta V$，体积力贡献$b_x\,\Delta V$。令其和为零并除以$\Delta V = \Delta x\Delta y\Delta z$，即得第一个方程，在小块趋于零的极限下是精确的（泰勒余项为高阶小量）。另外两个方程由论证的对称性得出。边界条件就是在表面点上应用柯西定理。
:::

这是关于六个未知应力分量的三个方程：仅靠平衡不能确定物体中的应力（除了某些特殊的静定情形，如薄壁容器）。另外三个方程来自变形——相容性和材料定律。

::: example 由弯曲正应力求梁中的切应力 {#ex-beam-equilibrium}
高$h$、宽$b$的矩形悬臂梁在$x = 0$处承受沿$-y$方向的端部载荷$P$，于是$M(x) = -Px$（下凸弯曲为正），简单梁理论给出$\sigma_x = -My/I = Pxy/I$，其中$I = bh^3/12$。设$\sigma_y = 0$且无体积力。已知上下表面$y = \pm h/2$不受载荷，用平衡方程求$\tau_{xy}$。对$P = 10\ \mathrm{kN}$、$b = 50\ \mathrm{mm}$、$h = 100\ \mathrm{mm}$计算其最大值。
::: solution
二维情况下第一个平衡方程为
$$
\frac{\partial\sigma_x}{\partial x} + \frac{\partial\tau_{xy}}{\partial y} = 0 \quad\Rightarrow\quad \frac{\partial\tau_{xy}}{\partial y} = -\frac{Py}{I} \quad\Rightarrow\quad \tau_{xy} = -\frac{Py^2}{2I} + f(x).
$$
第二个方程$\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y = 0$给出$f'(x) = 0$，所以$f$是常数$C$。法向为$\pm\mathbf{j}$的自由表面$y = \pm h/2$要求该处$\tau_{xy} = \sigma_y = 0$：$C = Ph^2/(8I)$，于是
$$
\tau_{xy} = \frac{P}{2I}\left(\frac{h^2}{4} - y^2\right).
$$
这正是[[mechanics-of-materials/transverse-shear]]中的抛物线切应力分布，这里不用任何"$VQ/It$"论证，仅由平衡就得到了。由$I = 50\times100^3/12 = 4.167\times10^{6}\ \mathrm{mm^4}$，$y = 0$处的最大值为
$$
\tau_{\max} = \frac{Ph^2}{8I} = \frac{10\,000 \times 100^2}{8\times4.167\times10^{6}} = 3.00\ \mathrm{N/mm^2} = 3.00\ \mathrm{MPa}.
$$
校核：$3P/(2bh) = 3\times10\,000/(2\times50\times100) = 3.00\ \mathrm{MPa}$，即熟悉的结果；将$\tau_{xy}$在截面上积分，得$\int_{-h/2}^{h/2} \tau_{xy}\,b\,dy = P$，即剪力。
:::
:::

## 主应力与不变量

转动过$P$的平面，会改变应力矢量分解为正应力与切应力的比例。应力矢量为纯法向（$\mathbf{t} = \sigma\mathbf{n}$）的平面上完全没有切应力；这样的平面是**主平面**，$\sigma$是**主应力**。

::: theorem 主应力 {#thm-principal}
对称应力张量有三个实主应力$\sigma_1 \ge \sigma_2 \ge \sigma_3$，它们是特征方程
$$
\det\bigl([\boldsymbol\sigma] - \sigma\mathbf{I}\bigr) = 0 \quad\Longleftrightarrow\quad \sigma^3 - I_1\sigma^2 + I_2\sigma - I_3 = 0
$$ {#eq-characteristic}
的根，其中**应力不变量**为
$$
\begin{aligned}
I_1 &= \sigma_x + \sigma_y + \sigma_z,\\
I_2 &= \sigma_x\sigma_y + \sigma_y\sigma_z + \sigma_z\sigma_x - \tau_{xy}^2 - \tau_{yz}^2 - \tau_{zx}^2,\\
I_3 &= \det[\boldsymbol\sigma].
\end{aligned}
$$
相应的主方向可以选为两两垂直。$I_1, I_2, I_3$在任何笛卡儿坐标系中取值相同。
:::

::: proof
条件$[\boldsymbol\sigma]\mathbf{n} = \sigma\mathbf{n}$（$\mathbf{n} \ne \mathbf{0}$）是一个特征值问题；它有非平凡解当且仅当$\det([\boldsymbol\sigma] - \sigma\mathbf{I}) = 0$。展开$3\times3$行列式即得具有上述系数的三次方程。矩阵特征多项式的根与基无关，因此系数$I_1, I_2, I_3$也与基无关：在转动后的坐标系中$[\boldsymbol\sigma'] = \mathbf{Q}[\boldsymbol\sigma]\mathbf{Q}^{\mathsf T}$，$\mathbf{Q}$为正交矩阵，而$\det(\mathbf{Q}[\boldsymbol\sigma]\mathbf{Q}^{\mathsf T} - \sigma\mathbf{I}) = \det(\mathbf{Q}([\boldsymbol\sigma] - \sigma\mathbf{I})\mathbf{Q}^{\mathsf T}) = \det([\boldsymbol\sigma] - \sigma\mathbf{I})$。

实性：若$[\boldsymbol\sigma]\mathbf{n} = \sigma\mathbf{n}$，其中$\sigma$和$\mathbf{n}$为复的，左乘共轭转置$\bar{\mathbf{n}}^{\mathsf T}$：$\bar{\mathbf{n}}^{\mathsf T}[\boldsymbol\sigma]\mathbf{n} = \sigma\,\bar{\mathbf{n}}^{\mathsf T}\mathbf{n}$。由于$[\boldsymbol\sigma]$是实对称的，左边等于其自身的共轭；而$\bar{\mathbf{n}}^{\mathsf T}\mathbf{n} > 0$为实数，所以$\sigma$是实数。正交性：若$[\boldsymbol\sigma]\mathbf{n}_1 = \sigma_1\mathbf{n}_1$且$[\boldsymbol\sigma]\mathbf{n}_2 = \sigma_2\mathbf{n}_2$，则由对称性$\mathbf{n}_2\cdot[\boldsymbol\sigma]\mathbf{n}_1 = \mathbf{n}_1\cdot[\boldsymbol\sigma]\mathbf{n}_2$，故$(\sigma_1 - \sigma_2)\,\mathbf{n}_1\cdot\mathbf{n}_2 = 0$，只要$\sigma_1 \ne \sigma_2$就有$\mathbf{n}_1\perp\mathbf{n}_2$。对于重根，相应平面内（或整个空间中）的每个方向都是主方向，仍可选出一组正交三元组。这就是[Maths Atlas](/learn/maths/)线性代数中的谱定理在应力上的应用。
:::

在主轴坐标系中，应力矩阵是对角的，$\operatorname{diag}(\sigma_1, \sigma_2, \sigma_3)$，不变量成为$I_1 = \sigma_1 + \sigma_2 + \sigma_3$，$I_2 = \sigma_1\sigma_2 + \sigma_2\sigma_3 + \sigma_3\sigma_1$，$I_3 = \sigma_1\sigma_2\sigma_3$——这是对任何一组算得的主应力都很有用的校核。

::: widget transform2d
matrix: 80,30; 30,-40
eigen: true
editable: true
range: 120
caption: 把[[#ex-traction]]中应力张量的面内部分看作线性映射：单位法向量$\mathbf{n}$被映射为应力矢量$\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$，因此像$A\mathbf{e}_1$和$A\mathbf{e}_2$就是$x$面和$y$面上的应力矢量（MPa）。一般而言$\mathbf{t}$不平行于$\mathbf{n}$——两者之间的夹角就是该平面上的切应力。两个特征向量方向是主方向，在那里$\mathbf{t}$与$\mathbf{n}$共线；由于矩阵对称，它们相互垂直。把两个非对角元改成不相等，可以看到特征向量不再垂直：非对称的"应力"将违反力矩平衡。
:::

### 最大切应力、八面体应力与应力偏量

由主应力还可以直接得到两个结果，它们在[[solid-mechanics/plasticity]]和设计中处处用到。

::: proposition 最大切应力与应力偏量 {#prop-max-shear}
(a) 过该点任一平面上的最大切应力为
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_3}{2},
$$
作用在平分$\sigma_1$与$\sigma_3$方向的两个平面上；这两个平面上的正应力为$(\sigma_1 + \sigma_3)/2$。

(b) **平均（静水）应力**为$\sigma_m = I_1/3$，**应力偏量**$s_{ij} = \sigma_{ij} - \sigma_m\delta_{ij}$与$\boldsymbol\sigma$有相同的主方向，主值为$\sigma_i - \sigma_m$，迹为零，第二不变量为
$$
J_2 = \tfrac16\bigl[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\bigr].
$$
**米泽斯等效应力**为$\sigma_{\mathrm{vM}} = \sqrt{3J_2}$，**八面体切应力**——与三个主轴等倾的平面上的切应力——为$\tau_{\mathrm{oct}} = \sqrt{2J_2/3} = (\sqrt2/3)\,\sigma_{\mathrm{vM}}$。
:::

::: proof
(a) 在主轴坐标系中，法向为$\mathbf{n}$的平面上的应力矢量为$(\sigma_1 n_1, \sigma_2 n_2, \sigma_3 n_3)$，因此令$\ell_i = n_i^2$（$\ell_1 + \ell_2 + \ell_3 = 1$，所有$\ell_i \ge 0$），
$$
\sigma_n = \sum \sigma_i \ell_i, \qquad \tau_n^2 = \sum\sigma_i^2\ell_i - \Bigl(\sum\sigma_i\ell_i\Bigr)^2 .
$$
$\tau_n^2$是一个以概率$\ell_i$取值$\sigma_i$的随机变量的方差。取值限于$[\sigma_3, \sigma_1]$的随机变量，在两个端点上各放概率$\tfrac12$时方差最大，此时方差为$(\sigma_1 - \sigma_3)^2/4$。因此$\tau_{\max} = (\sigma_1 - \sigma_3)/2$，在$\ell_1 = \ell_3 = \tfrac12$、$\ell_2 = 0$处取得：法向位于1–3平面内、与1轴和3轴成$45^\circ$，均值为$\sigma_n = (\sigma_1 + \sigma_3)/2$。

(b) 减去$\sigma_m\mathbf{I}$使每个特征值移动$-\sigma_m$，而特征向量不变；迹变为$I_1 - 3\sigma_m = 0$。对于主值为$s_i$的零迹张量，按惯例取第二不变量为$J_2 = \tfrac12\sum s_i^2$；由于$\sum s_i = 0$，$\sum_{i<j}(s_i - s_j)^2 = 3\sum s_i^2 - (\sum s_i)^2 = 3\sum s_i^2$；再由$s_i - s_j = \sigma_i - \sigma_j$即得该公式。在八面体平面上$\ell_i = \tfrac13$，由方差公式，$\tau_{\mathrm{oct}}^2 = \tfrac13\sum\sigma_i^2 - \sigma_m^2 = \tfrac13\sum s_i^2 = \tfrac23 J_2$。
:::

::: example 三维主应力 {#ex-principal}
对[[#ex-traction]]的应力状态，求主应力、$\sigma_1$的方向、最大切应力和米泽斯应力。
::: solution
不变量（MPa、MPa²、MPa³）：
$$
\begin{aligned}
I_1 &= 80 - 40 + 60 = 100,\\
I_2 &= (80)(-40) + (-40)(60) + (60)(80) - 30^2 - 20^2 - 0^2 = -3200 - 2400 + 4800 - 900 - 400 = -2100,\\
I_3 &= 80\bigl[(-40)(60) - 20^2\bigr] - 30\bigl[(30)(60) - 0\bigr] + 0 = 80(-2800) - 54\,000 = -278\,000 .
\end{aligned}
$$
三次方程$\sigma^3 - 100\sigma^2 - 2100\sigma + 278\,000 = 0$用数值方法（或三个实根的三角公式）求解：
$$
\sigma_1 = 87.92\ \mathrm{MPa}, \qquad \sigma_2 = 62.59\ \mathrm{MPa}, \qquad \sigma_3 = -50.52\ \mathrm{MPa}.
$$
校核：三者之和为$100.0 = I_1$；乘积为$87.92\times62.59\times(-50.52) = -2.780\times10^{5} = I_3$。

$\sigma_1$的方向满足$([\boldsymbol\sigma] - 87.92\,\mathbf{I})\mathbf{n} = \mathbf{0}$。前两行的叉积$(-7.92, 30, 0)\times(30, -127.92, 20)$为$(600, 158.5, 113.5)$，归一化后为
$$
\mathbf{n}_1 = (0.951,\ 0.251,\ 0.180),
$$
即一根与$x$轴成$18.0^\circ$的轴——较大的$\sigma_x = 80\ \mathrm{MPa}$被切应力分量略微抬高并偏转。

最大切应力：$\tau_{\max} = (87.92 + 50.52)/2 = 69.22\ \mathrm{MPa}$。米泽斯应力：
$$
\sigma_{\mathrm{vM}} = \sqrt{\tfrac12\bigl[(25.33)^2 + (113.11)^2 + (138.44)^2\bigr]} = 127.7\ \mathrm{MPa}.
$$
合理性检查：$\sigma_{\mathrm{vM}}$介于$\sigma_1 - \sigma_3 = 138.4\ \mathrm{MPa}$（特雷斯卡等效应力）与$(\sqrt3/2)(\sigma_1 - \sigma_3) = 119.9\ \mathrm{MPa}$之间，这对任何应力状态都成立。
:::
:::

::: warning 面内最大切应力不一定是最大切应力
对于平面应力（$\sigma_z = \tau_{xz} = \tau_{yz} = 0$），必须把面内主应力$\sigma_a, \sigma_b$与面外主应力$0$放在一起排序，再应用$\tau_{\max} = (\sigma_1 - \sigma_3)/2$。若$\sigma_a = 120\ \mathrm{MPa}$、$\sigma_b = 40\ \mathrm{MPa}$，面内莫尔圆给出$40\ \mathrm{MPa}$，但真正的最大值是$(120 - 0)/2 = 60\ \mathrm{MPa}$，作用在一个倾斜出板面的平面上。两个主应力同号，恰恰是薄壁压力容器器壁的情形；此时用面内值会把切应力低估最多一半，并按特雷斯卡准则高估抗屈服的裕度。
:::

## 三维莫尔圆

[[#prop-max-shear]]中的方差论证还表明了所有可能的$(\sigma_n, \tau_n)$点对位于何处：在$\sigma$–$\tau$平面上以$[\sigma_3, \sigma_1]$为直径的大圆之内、以$[\sigma_3, \sigma_2]$和$[\sigma_2, \sigma_1]$为直径的两个小圆之外的区域（莫尔三圆）。对于包含某一主轴的平面，点位于其中一个圆上，[[mechanics-of-materials/stress-transformation]]中熟悉的二维作图法适用。下图可以让你操纵二维应力圆：动点是法向与$x$成$\theta$角的平面上的应力，在圆上以$2\theta$角绘出。

::: widget parametric
fx: (sx + sy)/2 + (sx - sy)/2*cos(t) + txy*sin(t)
fy: (sx - sy)/2*sin(t) - txy*cos(t)
t: 0, 2pi
sliders: sx=80:-150:150:5; sy=-40:-150:150:5; txy=30:-100:100:5
x: -160, 160
y: -110, 110
equal: true
caption: 面内应力$(\sigma_x, \sigma_y, \tau_{xy})$的莫尔圆，横轴为$\sigma_n$，纵轴为$\tau$（按顺时针为正的约定绘制，所以$x$面从$(\sigma_x, -\tau_{xy})$出发）。参数$t$为$2\theta$。在圆与横轴的交点处读出主应力，在圆顶读出面内最大切应力。令$\sigma_y = 40$、$\tau_{xy} = 0$、$\sigma_x = 120$：圆不再到达原点，第三主应力$0$位于圆外，绝对最大切应力是从$0$到$120$的更大圆的半径。
:::

## 应变：从位移到变形

现在从几何的角度看同一点。在载荷作用下，每个材料点从$\mathbf{x}$移到$\mathbf{x} + \mathbf{u}(\mathbf{x})$，其中$\mathbf{u} = (u, v, w)$为**位移场**。刚体平移（$\mathbf{u}$为常数）或刚体转动使各点移动而不拉伸任何东西，因此应变必须由相邻点之间位移的**差**——即位移梯度——构成，并去掉转动部分。

::: definition 小应变张量与转动张量 {#def-strain}
当位移梯度远小于1时，**小（无穷小）应变张量**是位移梯度的对称部分，
$$
\varepsilon_{ij} = \frac12\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right),
$$
因而
$$
\varepsilon_x = \frac{\partial u}{\partial x},\quad \varepsilon_y = \frac{\partial v}{\partial y},\quad \varepsilon_z = \frac{\partial w}{\partial z},\quad
\gamma_{xy} = 2\varepsilon_{xy} = \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x},
$$
$\gamma_{yz}$、$\gamma_{zx}$按轮换类推。**工程切应变**$\gamma_{xy}$是原先沿$x$和$y$的两个线元之间直角的减小量；**张量切应变**$\varepsilon_{xy}$是它的一半。反对称部分$\omega_{ij} = \tfrac12(\partial u_i/\partial x_j - \partial u_j/\partial x_i)$描述局部刚体转动；在$x$–$y$平面内，转角（逆时针）为$\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y)$。
:::

跟踪两根短纤维就能看出其物理意义。沿$x$的纤维$dx$，其远端相对近端移动$(\partial u/\partial x\,dx,\ \partial v/\partial x\,dx)$：它伸长的比例为$\partial u/\partial x$，并逆时针转过$\partial v/\partial x$。沿$y$的纤维$dy$伸长$\partial v/\partial y$，并**顺时针**转过$\partial u/\partial y$。两者之间的直角减小了两个转角之和$\gamma_{xy}$，而两个转角的平均值就是刚体转动$\omega_z$。应变张量在坐标轴转动下的变换方式与应力完全相同，因此它也有主应变、不变量和莫尔圆——唯一的记账陷阱是：应变圆是用$\gamma/2$而不是$\gamma$画的。

::: example 由位移场求应变与转动 {#ex-displacement}
一块薄板按均匀位移场
$$
u = (3x + 2y)\times10^{-3}, \qquad v = (-2x + y)\times10^{-3}
$$
变形（$x, y$可用任意长度单位）。求应变和转动。有没有切应变？
::: solution
位移梯度为
$$
\begin{bmatrix} \partial u/\partial x & \partial u/\partial y \\ \partial v/\partial x & \partial v/\partial y \end{bmatrix} = \begin{bmatrix} 3 & 2 \\ -2 & 1 \end{bmatrix}\times10^{-3}.
$$
于是$\varepsilon_x = 3.0\times10^{-3}$，$\varepsilon_y = 1.0\times10^{-3}$，且
$$
\gamma_{xy} = (2 + (-2))\times10^{-3} = 0, \qquad \omega_z = \tfrac12(-2 - 2)\times10^{-3} = -2.0\times10^{-3}\ \mathrm{rad}.
$$
梯度的非对角项很大，但**没有**切应变：沿$x$的纤维顺时针转过$2\times10^{-3}$ rad，沿$y$的纤维也一样，所以两者之间的直角保持不变。整个单元分别伸长$0.3\,\%$和$0.1\,\%$，并顺时针转过$2$ mrad $= 0.115^\circ$。应变片只会读到伸长；把梯度误读为"剪切"，就会凭空造出一个并不存在的应力。（校核：纯刚体转动$u = -\omega y$、$v = \omega x$给出$\gamma_{xy} = -\omega + \omega = 0$，理应如此。）
:::
:::

## 相容性

六个应变分量由三个位移导出，因此不能独立给定。如果有人给你六个应变函数，未必存在能产生它们的位移场——物体变形后的各小块将无法拼合在一起。保证它们能拼合的条件就是**相容方程**。

::: proposition 圣维南相容方程 {#prop-compatibility}
若应变由单值且足够光滑的位移场导出，则它们满足六个相容方程。在平面问题中只有一个是非平凡的：
$$
\frac{\partial^2 \varepsilon_x}{\partial y^2} + \frac{\partial^2 \varepsilon_y}{\partial x^2} = \frac{\partial^2 \gamma_{xy}}{\partial x\,\partial y}.
$$ {#eq-compat2d}
在三维中还有两个同类方程（按$x \to y \to z \to x$轮换得到），以及三个形如
$$
2\frac{\partial^2\varepsilon_x}{\partial y\,\partial z} = \frac{\partial}{\partial x}\left(-\frac{\partial\gamma_{yz}}{\partial x} + \frac{\partial\gamma_{zx}}{\partial y} + \frac{\partial\gamma_{xy}}{\partial z}\right)
$$
的方程及其轮换。反之，在单连通物体中，满足全部六个方程的应变可以积分得到单值的位移场（至多相差一个刚体运动）。
:::

::: proof
平面情形的必要性：代入$\varepsilon_x = u_{,x}$、$\varepsilon_y = v_{,y}$、$\gamma_{xy} = u_{,y} + v_{,x}$（逗号表示偏导数）。左边为$u_{,xyy} + v_{,yxx}$，右边为$u_{,yxy} + v_{,xxy}$；由于光滑函数的混合偏导数可交换次序，两者相等。三维方程同理可得，例如$2\varepsilon_{x,yz} = 2u_{,xyz}$，而$-\gamma_{yz,xx} + \gamma_{zx,xy} + \gamma_{xy,xz} = -(v_{,zxx} + w_{,yxx}) + (w_{,xxy} + u_{,zxy}) + (u_{,yxz} + v_{,xxz}) = 2u_{,xyz}$。充分性（在单连通区域内由应变积分出位移）用到切萨罗（Cesàro）和沃尔泰拉（Volterra）的曲线积分论证；这里只陈述不证明。在多连通区域——带孔的物体——中，需要附加条件才能使位移绕孔一周是单值的；违反这些条件，正是位错以及把圆环焊合所引起的残余应力的机理。
:::

相容性对应力分析之所以重要，是因为应力经由材料定律由应变而来：一个满足平衡但产生不相容应变的应力场不是问题的解。在[[solid-mechanics/linear-elasticity]]中，艾里应力函数正是这样构造的：平衡自动满足，相容性变成一个方程$\nabla^4\phi = 0$。

::: intuition 平衡与相容：两本账
想一想超静定结构：平衡给出的方程少于未知力，缺少的方程来自要求各构件在变形后仍能拼合。连续介质力学在每一点上都是如此。三个平衡方程对应六个应力；六个应变来自三个位移；六个材料方程把它们联系起来。数一数：$6 + 6 + 3 = 15$个未知量（$\sigma_{ij}$、$\varepsilon_{ij}$、$u_i$）和$3 + 6 + 6 = 15$个方程（平衡方程、应变–位移关系、材料定律）。相容性并不是这一计数中额外的方程：如果你选择只用应变和应力、消去位移来求解，就必须补上它。
:::

## 应变测量：应变花

应力无法直接测量；自由表面上的应变则可以。粘贴在表面上的电阻应变片读出沿其自身轴线的线应变。在自由表面上材料处于平面应力状态，因此有三个面内应变分量$(\varepsilon_x, \varepsilon_y, \gamma_{xy})$未知，需要三个不同方向的应变片——即**应变花**。与$x$成$\theta$角方向上的线应变为
$$
\varepsilon_\theta = \varepsilon_x\cos^2\theta + \varepsilon_y\sin^2\theta + \gamma_{xy}\sin\theta\cos\theta .
$$ {#eq-gauge}

::: algorithm 直角（0°/45°/90°）应变花的数据处理 {#alg-rosette}
已知各向同性线弹性表面（$E$和$\nu$已知）上的应变片读数$\varepsilon_a$（$0^\circ$）、$\varepsilon_b$（$45^\circ$）和$\varepsilon_c$（$90^\circ$）：
1. 由[[#eq-gauge]]：$\varepsilon_x = \varepsilon_a$，$\varepsilon_y = \varepsilon_c$，$\gamma_{xy} = 2\varepsilon_b - \varepsilon_a - \varepsilon_c$。
2. 主应变：$\varepsilon_{1,2} = \dfrac{\varepsilon_x + \varepsilon_y}{2} \pm \sqrt{\left(\dfrac{\varepsilon_x - \varepsilon_y}{2}\right)^2 + \left(\dfrac{\gamma_{xy}}{2}\right)^2}$。
3. 主方向：$\tan 2\theta_p = \gamma_{xy}/(\varepsilon_x - \varepsilon_y)$；选取代回[[#eq-gauge]]后给出$\varepsilon_1$的那个根。
4. 由平面应力胡克定律（[[solid-mechanics/linear-elasticity]]）求主应力：$\sigma_1 = \dfrac{E}{1 - \nu^2}(\varepsilon_1 + \nu\varepsilon_2)$，$\sigma_2 = \dfrac{E}{1 - \nu^2}(\varepsilon_2 + \nu\varepsilon_1)$。
5. 面外应变（未测量，但真实存在）：$\varepsilon_z = -\dfrac{\nu}{1 - \nu}(\varepsilon_x + \varepsilon_y)$。
:::

::: example 钢支架上的应变花 {#ex-rosette}
钢支架（$E = 200\ \mathrm{GPa}$，$\nu = 0.3$）上的直角应变花读数为$\varepsilon_a = 600\ \mu\varepsilon$、$\varepsilon_b = 500\ \mu\varepsilon$、$\varepsilon_c = -200\ \mu\varepsilon$。求表面处的主应变及其方向、主应力和最大切应力。
::: solution
第1步：$\varepsilon_x = 600\ \mu\varepsilon$，$\varepsilon_y = -200\ \mu\varepsilon$，$\gamma_{xy} = 2(500) - 600 - (-200) = 600\ \mu\varepsilon$。

第2步：圆心$(600 - 200)/2 = 200\ \mu\varepsilon$，半径$\sqrt{400^2 + 300^2} = 500\ \mu\varepsilon$，所以
$$
\varepsilon_1 = 700\ \mu\varepsilon, \qquad \varepsilon_2 = -300\ \mu\varepsilon .
$$
第3步：$\tan2\theta_p = 600/800 = 0.75$，$2\theta_p = 36.87^\circ$，$\theta_p = 18.43^\circ$，从应变片$a$逆时针量起。用[[#eq-gauge]]校核：$600\cos^2 18.43^\circ - 200\sin^2 18.43^\circ + 600\sin18.43^\circ\cos18.43^\circ = 540 - 20 + 180 = 700\ \mu\varepsilon$。✓

第4步：$E/(1 - \nu^2) = 200\,000/0.91 = 219\,780\ \mathrm{MPa}$，所以
$$
\sigma_1 = 219\,780\,(700 - 90)\times10^{-6} = 134.1\ \mathrm{MPa}, \qquad \sigma_2 = 219\,780\,(-300 + 210)\times10^{-6} = -19.8\ \mathrm{MPa}.
$$
由于$\sigma_3 = 0$（自由表面），排序为$\sigma_1 = 134.1$、$0$、$-19.8\ \mathrm{MPa}$，所以$\tau_{\max} = (134.1 + 19.8)/2 = 77.0\ \mathrm{MPa}$——这里面内值就是真正的最大值，因为两个面内主应力异号。校核：$\tau_{\max} = G\gamma_{\max}$，其中$G = E/2(1+\nu) = 76.9\ \mathrm{GPa}$，$\gamma_{\max} = \varepsilon_1 - \varepsilon_2 = 1000\ \mu\varepsilon$，得$76.9\ \mathrm{MPa}$。✓（微小差别是舍入造成的。）
:::
:::

::: application 数据从哪里来
在起重机臂架、风力机轮毂、飞机接头和压力容器的样机鉴定试验中，应变花粘贴在有限元模型标出的危险部位——圆角根部、焊趾、孔边。把测得的主应力与模型比较，超过百分之几的偏差通常揭示的是建模错误（某个边界条件、某个接触），而不是应变片的误差。承压或旋转部件的验证试验和爆破试验储存着大量能量，只能在防护屏障后、由受过培训的人员按照适用的试验标准进行。
:::

::: history
柯西（Augustin-Louis Cauchy）于1822年向巴黎科学院提出了一点处应力的概念，用三个相互垂直平面上的分量来确定；上文使用的四面体论证就是他的。应力变换的图解作图法由莫尔（Otto Mohr）于1882年发表，至今仍以他的名字讲授。相容条件以圣维南（Adhémar Barré de Saint-Venant）命名，[[solid-mechanics/linear-elasticity]]中使用的同名原理也是他提出的。用电学方法测量表面应变，是随着粘贴式丝绕电阻应变片的出现才变得实用的：它于1938年由加州理工学院的西蒙斯（Edward E. Simmons）和麻省理工学院的鲁格（Arthur C. Ruge）各自独立发明；随后出现了箔式应变片和应变花，它们至今仍是实验应力分析的标准工具。
:::

::: quiz
某点处$\sigma_1 = 150\ \mathrm{MPa}$，$\sigma_2 = 90\ \mathrm{MPa}$，$\sigma_3 = 0$。最大切应力是多少？
- [ ] $30\ \mathrm{MPa}$
- [ ] $45\ \mathrm{MPa}$
- [x] $75\ \mathrm{MPa}$
- [ ] $120\ \mathrm{MPa}$
::: solution
$\tau_{\max} = (\sigma_1 - \sigma_3)/2 = (150 - 0)/2 = 75\ \mathrm{MPa}$。$30\ \mathrm{MPa}$是面内最大值$(\sigma_1 - \sigma_2)/2$，它忽略了面外方向（[[#prop-max-shear]]）。
:::
:::

::: quiz
某位移场给出$\partial u/\partial y = 4\times10^{-4}$和$\partial v/\partial x = -4\times10^{-4}$。下列哪个说法正确？
- [ ] $\gamma_{xy} = 8\times10^{-4}$
- [x] $\gamma_{xy} = 0$，单元转过$-4\times10^{-4}$ rad
- [ ] $\gamma_{xy} = 4\times10^{-4}$，且没有转动
::: solution
$\gamma_{xy} = \partial u/\partial y + \partial v/\partial x = 0$，$\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y) = -4\times10^{-4}$ rad（顺时针）：这是刚体转动，不是变形。
:::
:::

::: summary
- 平面上的应力矢量线性地依赖于其单位法向量：$\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$（柯西）。应力张量是对称的，所以六个分量描述一点的应力。
- 微元的平衡给出三个偏微分方程$\partial\sigma_{ji}/\partial x_j + b_i = 0$，外加面力边界条件$[\boldsymbol\sigma]\mathbf{n} = \bar{\mathbf{t}}$。仅凭它们不足以确定应力场。
- 主应力是$[\boldsymbol\sigma]$的特征值，即$\sigma^3 - I_1\sigma^2 + I_2\sigma - I_3 = 0$的根；不变量在任何坐标系中都相同。
- $\tau_{\max} = (\sigma_1 - \sigma_3)/2$，三个主应力都要参与排序，在平面应力中包括为零的面外主应力。
- 应力偏量$s_{ij} = \sigma_{ij} - \sigma_m\delta_{ij}$及其不变量$J_2$给出米泽斯应力$\sigma_{\mathrm{vM}} = \sqrt{3J_2}$和八面体切应力。
- 小应变是位移梯度的对称部分；反对称部分是刚体转动。工程切应变$\gamma$是张量分量的两倍。
- 由位移场导出的应变满足相容方程；在二维中为$\varepsilon_{x,yy} + \varepsilon_{y,xx} = \gamma_{xy,xy}$。
- 三个应变片（应变花）确定表面的应变状态；然后由平面应力胡克定律得到主应力。
:::

## 习题

::: exercise 斜截面上的正应力 {level=1 check="34"}
某点处仅有的非零应力分量为$\sigma_y = 50\ \mathrm{MPa}$、$\sigma_z = -20\ \mathrm{MPa}$和$\tau_{yz} = 30\ \mathrm{MPa}$。求单位法向量为$\mathbf{n} = (0, 0.6, 0.8)$的平面上的正应力。（以MPa为单位输入正应力。）
::: solution
$\mathbf{t} = [\boldsymbol\sigma]\mathbf{n} = (0,\ 50(0.6) + 30(0.8),\ 30(0.6) - 20(0.8)) = (0,\ 54,\ 2)\ \mathrm{MPa}$。于是$\sigma_n = 54(0.6) + 2(0.8) = 34\ \mathrm{MPa}$，该平面上的切应力为$\tau_n = \sqrt{54^2 + 2^2 - 34^2} = \sqrt{1764} = 42\ \mathrm{MPa}$。
:::
::: answer
$\sigma_n = 34\ \mathrm{MPa}$（且$\tau_n = 42\ \mathrm{MPa}$）。
:::
:::

::: exercise 由三维应力状态求最大切应力 {level=1 check="50"}
$$
[\boldsymbol\sigma] = \begin{bmatrix} 60 & 0 & 0 \\ 0 & -20 & 30 \\ 0 & 30 & 60 \end{bmatrix}\ \mathrm{MPa}.
$$
求三个主应力和最大切应力。（以MPa为单位输入$\tau_{\max}$。）
::: solution
由于第一行和第一列没有切应力项，$x$已经是主方向，$\sigma = 60\ \mathrm{MPa}$。$y$–$z$子块的圆心为$(-20 + 60)/2 = 20$，半径为$\sqrt{40^2 + 30^2} = 50$，所以其主值为$70$和$-30\ \mathrm{MPa}$。排序：$\sigma_1 = 70$，$\sigma_2 = 60$，$\sigma_3 = -30\ \mathrm{MPa}$，$\tau_{\max} = (70 + 30)/2 = 50\ \mathrm{MPa}$。校核：两种算法下$I_1 = 100$；$I_3 = 60[(-20)(60) - 900] = -126\,000 = 70\times60\times(-30)$。
:::
:::

::: exercise 应变花数据处理 {level=1 check="350"}
一个直角$0^\circ/45^\circ/90^\circ$应变花读数为$\varepsilon_a = 300\ \mu\varepsilon$、$\varepsilon_b = 250\ \mu\varepsilon$、$\varepsilon_c = -100\ \mu\varepsilon$。求较大的主应变。（以微应变为单位输入$\varepsilon_1$。）
::: solution
$\varepsilon_x = 300$，$\varepsilon_y = -100$，$\gamma_{xy} = 500 - 300 + 100 = 300\ \mu\varepsilon$。圆心$100$，半径$\sqrt{200^2 + 150^2} = 250$，所以$\varepsilon_1 = 350\ \mu\varepsilon$，$\varepsilon_2 = -150\ \mu\varepsilon$，且$\tan2\theta_p = 300/400$，$\theta_p = 18.4^\circ$，从应变片$a$量起。
:::
:::

::: exercise 这个应力场平衡吗？ {level=2 check="3"}
某平面应力场（MPa，$x, y$以米计）为
$$
\sigma_x = 4x + 3y, \qquad \sigma_y = 2x - y, \qquad \tau_{xy} = -2x + ky .
$$
(a) 求$k$，使第一个平衡方程在无体积力时成立。(b) 取该$k$值，求满足第二个方程所需的体积力$b_y$。（以MN/m³为单位输入$b_y$。）
::: solution
(a) $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = 4 + k = 0$，所以$k = -4$。
(b) $\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y + b_y = -2 - 1 + b_y = 0$，所以$b_y = 3\ \mathrm{MPa/m} = 3\ \mathrm{MN/m^3}$，是沿$+y$的体积力。作为比较，钢的重度约为$0.077\ \mathrm{MN/m^3}$：这个应力场所需的体积力比重力强四十倍，因此它只能描述高速旋转或加速的零件——否则它根本就不是一个平衡应力场。
:::
:::

::: exercise 切应变与转动 {level=2 check="5"}
位移场为$u = 10^{-3}x^2y$，$v = 10^{-3}xy^2$（$x, y$以m计，位移以m计）。求点$(1, 2)\ \mathrm{m}$处的$\varepsilon_x$、$\varepsilon_y$、$\gamma_{xy}$和$\omega_z$。（以$10^{-3}$为单位输入$\gamma_{xy}$。）
::: solution
$\varepsilon_x = 2\times10^{-3}xy = 4\times10^{-3}$；$\varepsilon_y = 2\times10^{-3}xy = 4\times10^{-3}$；$\gamma_{xy} = \partial u/\partial y + \partial v/\partial x = 10^{-3}(x^2 + y^2) = 5\times10^{-3}$；$\omega_z = \tfrac12\cdot10^{-3}(y^2 - x^2) = 1.5\times10^{-3}\ \mathrm{rad}$。它们都远小于1，所以小应变定义在该点是适用的（但在远离原点处不适用，那里它们会无界增长）。
:::
:::

::: exercise 一个相容的应变场 {level=2 check="4"}
拟定的平面应变场为$\varepsilon_x = k y^2$、$\varepsilon_y = k x^2$、$\gamma_{xy} = c\,xy$，$k = 10^{-4}\ \mathrm{m^{-2}}$。求使该场相容的$c$，并求出产生它的一个位移场。（以$10^{-4}\ \mathrm{m^{-2}}$为单位输入$c$。）
::: solution
由[[#eq-compat2d]]：$\partial^2\varepsilon_x/\partial y^2 + \partial^2\varepsilon_y/\partial x^2 = 2k + 2k = 4k$，而$\partial^2\gamma_{xy}/\partial x\partial y = c$，所以$c = 4k = 4\times10^{-4}\ \mathrm{m^{-2}}$。积分：$u = kxy^2 + f(y)$，$v = kx^2y + g(x)$；于是$\gamma_{xy} = 2kxy + f'(y) + 2kxy + g'(x) = 4kxy$要求$f'(y) + g'(x) = 0$，即$f' = -g' = $常数：一个刚体转动。一个位移场是$u = kxy^2$，$v = kx^2y$。取任何其他的$c$，则根本不存在位移场。
:::
:::

::: exercise 应变片处的面外应变 {level=2 check="-200"}
铝合金板（$\nu = 1/3$）上的应变花在自由表面处给出$\varepsilon_x = 250\ \mu\varepsilon$和$\varepsilon_y = 150\ \mu\varepsilon$。求厚度方向的应变$\varepsilon_z$。（以微应变为单位输入。）
::: solution
在自由表面上$\sigma_z = 0$，由胡克定律$\varepsilon_z = -\nu(\sigma_x + \sigma_y)/E$；又$\sigma_x + \sigma_y = E(\varepsilon_x + \varepsilon_y)/(1 - \nu)$，故$\varepsilon_z = -\nu(\varepsilon_x + \varepsilon_y)/(1 - \nu) = -\tfrac{1/3}{2/3}(400) = -200\ \mu\varepsilon$。尽管没有应变片沿厚度方向，板仍然变薄了。
:::
:::

::: exercise 八面体切应力与米泽斯应力 {level=3}
(a) 证明八面体平面上的正应力为$\sigma_m = I_1/3$，且$\tau_{\mathrm{oct}} = \tfrac13\sqrt{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}$。
(b) 由此证明$\sigma_{\mathrm{vM}} = \tfrac{3}{\sqrt2}\tau_{\mathrm{oct}}$，并证明在每个正应力分量上叠加静水应力$p$不改变两者。
(c) 对[[#ex-traction]]的应力状态计算$\tau_{\mathrm{oct}}$。
::: solution
(a) 在主轴坐标系中，八面体平面的法向为$\mathbf{n} = (1, 1, 1)/\sqrt3$，所以$\mathbf{t} = (\sigma_1, \sigma_2, \sigma_3)/\sqrt3$，$\sigma_n = \mathbf{t}\cdot\mathbf{n} = (\sigma_1 + \sigma_2 + \sigma_3)/3$。于是$\tau^2 = \lvert\mathbf{t}\rvert^2 - \sigma_n^2 = \tfrac13\sum\sigma_i^2 - \tfrac19(\sum\sigma_i)^2 = \tfrac19\bigl[3\sum\sigma_i^2 - (\sum\sigma_i)^2\bigr] = \tfrac19\sum_{i<j}(\sigma_i - \sigma_j)^2$。
(b) $\sigma_{\mathrm{vM}}^2 = \tfrac12\sum_{i<j}(\sigma_i - \sigma_j)^2 = \tfrac92\tau_{\mathrm{oct}}^2$，所以$\sigma_{\mathrm{vM}} = (3/\sqrt2)\tau_{\mathrm{oct}}$。两者都只依赖于主应力之差，而静水应力$p$不改变这些差。这就是两者都被用作金属屈服量度的原因：金属的塑性流动对静水压力几乎不敏感（[[solid-mechanics/plasticity]]）。
(c) 取$\sigma_i = 87.92, 62.59, -50.52\ \mathrm{MPa}$：$\tau_{\mathrm{oct}} = \tfrac13\sqrt{25.33^2 + 113.11^2 + 138.44^2} = 60.18\ \mathrm{MPa}$，而$(3/\sqrt2)(60.18) = 127.7\ \mathrm{MPa} = \sigma_{\mathrm{vM}}$，与[[#ex-principal]]中的结果一致。
:::
:::

::: exercise 三角形应变花 {level=3}
三角形（delta）应变花的应变片位于$0^\circ$、$60^\circ$和$120^\circ$，读数为$\varepsilon_a, \varepsilon_b, \varepsilon_c$。(a) 推导
$$
\varepsilon_x = \varepsilon_a,\qquad \varepsilon_y = \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a),\qquad \gamma_{xy} = \tfrac{2}{\sqrt3}(\varepsilon_b - \varepsilon_c).
$$
(b) 证明$\varepsilon_x + \varepsilon_y = \tfrac23(\varepsilon_a + \varepsilon_b + \varepsilon_c)$，并解释为什么无论应变花在表面上如何转动，这个和都相同。(c) 读数为$\varepsilon_a = 400$、$\varepsilon_b = 100$、$\varepsilon_c = 100\ \mu\varepsilon$：求主应变。
::: solution
(a) 由[[#eq-gauge]]，$\cos^2 60^\circ = \tfrac14$，$\sin^2 60^\circ = \tfrac34$，$\sin60^\circ\cos60^\circ = \tfrac{\sqrt3}{4}$，在$120^\circ$处相同但最后一项为负：
$\varepsilon_b = \tfrac14\varepsilon_x + \tfrac34\varepsilon_y + \tfrac{\sqrt3}{4}\gamma_{xy}$，$\varepsilon_c = \tfrac14\varepsilon_x + \tfrac34\varepsilon_y - \tfrac{\sqrt3}{4}\gamma_{xy}$。两式相减得$\gamma_{xy} = \tfrac{2}{\sqrt3}(\varepsilon_b - \varepsilon_c)$；相加得$\varepsilon_b + \varepsilon_c = \tfrac12\varepsilon_a + \tfrac32\varepsilon_y$，所以$\varepsilon_y = \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a)$。
(b) $\varepsilon_x + \varepsilon_y = \varepsilon_a + \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a) = \tfrac23(\varepsilon_a + \varepsilon_b + \varepsilon_c)$。和$\varepsilon_x + \varepsilon_y$是面内应变张量的第一不变量，与坐标轴无关；三个应变片在$60^\circ$转动下是对称的，所以它们的平均值必然等于该不变量的一半：它就是莫尔圆的圆心。
(c) $\varepsilon_x = 400$，$\varepsilon_y = \tfrac13(200 + 200 - 400) = 0$，$\gamma_{xy} = 0$：坐标轴就是主轴，$\varepsilon_1 = 400\ \mu\varepsilon$沿应变片$a$，$\varepsilon_2 = 0$。校核(b)：$\tfrac23(600) = 400 = \varepsilon_x + \varepsilon_y$。✓
:::
:::

::: exercise 应变片贴在哪里 {level=3}
你必须在一台铸铁泵壳的液压验证试验中验证其有限元模型。模型显示最高的米泽斯应力位于一个接管连接处的内侧，你无法够到；另一个次高峰位于外侧一个安装凸台的根部。说明你将如何决定应变花的位置、类型和数量，以及会对数据做哪些校核。该试验涉及哪些危险？
::: solution
好的答案应涵盖：(1) 应变片只能贴在可触及的自由表面上，所以在凸台处的外侧峰值以及接管连接处对面的外表面上若干点布片，那里模型的表面应力同样已知；在这些点上的吻合验证了模型，然后再相信模型对无法触及的内侧峰值的预测。(2) 在主方向未知处（凸台附近）使用直角应变花，只有在方向确定处才使用单片（在直的圆柱壳上，环向和轴向就是主方向）。(3) 在陡峭梯度附近使用短标距应变片，因为应变片给出的是其标距长度上的平均应变；在稍远处再贴一个应变花来测取梯度。(4) 校核：零压力时读数为零，加载和卸载时应变与压力呈线性关系（非线性或滞回意味着屈服或粘贴层滑移），卸载后回零，温度补偿，以及将$\varepsilon_x + \varepsilon_y$（一个不变量）与模型比较，作为与应变花方位无关的校核。(5) 铸铁是脆性材料，因此抗断裂的裕度必须用最大主应力而不是米泽斯应力来评估。危险：之所以采用液压试验，恰恰是因为水储存的能量很少，但滞留的空气、失效的管件或意外的脆性断裂仍可能抛出碎片和高压射流；试验须按照适用标准、排净空气、在防护屏障之后、由受过培训的人员进行。
:::
:::
