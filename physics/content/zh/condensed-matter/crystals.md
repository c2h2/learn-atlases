一粒食盐和一根铜线看起来毫无相似之处，但两者都是晶体：原子排在一个模式上，这个模式从样品的一端到另一端完全相同地重复。重复性是固体最有用的一条事实。它让一个有 $10^{23}$ 个原子的问题变得可解，因为一个空间周期函数可以展开成傅里叶级数，而该级数允许的波矢构成第二个格子，这个格子从 X 射线衍射图样到电子能带，主宰着一切。

本章建立几何框架。我们定义布拉维格子与基元，认识在本课程中反复出现的立方格子，并构造倒格子。然后使用它。晶体只在某些特殊方向上衍射 X 射线，而我们把这一条件推导两遍：一次用从晶面反射的图像，出自布拉格父子（the Braggs）；一次用相干叠加的波的图像，出自冯·劳厄（von Laue）。我们将说明两者是同一个表述。最后，结构因子解释了为什么某些晶格允许的反射会缺失，并且我们从实测的粉末衍射花样读出铜的格子。

只需要初等的向量代数和 [[quantum-1/schrodinger-equation]] 中平面波 $e^{i\mathbf k\cdot\mathbf r}$ 的概念。[[optics/interference]] 与 [[optics/diffraction]] 中的干涉和光栅衍射是有用的背景知识：晶体就是一个三维光栅。

## 格子与基元 {#lattices}

真实的晶体是原子的图案。描述它时我们分开两样东西：图案重复出现的那组点，以及被重复的那一组原子。

::: definition 布拉维格子 {#def-bravais}
**布拉维格子（Bravais lattice）** 是无穷点集

$$
\mathbf R = n_1 \mathbf a_1 + n_2 \mathbf a_2 + n_3 \mathbf a_3, \qquad n_1, n_2, n_3 \in \Z,
$$ {#eq-lattice}

其中 $\mathbf a_1, \mathbf a_2, \mathbf a_3$ 是三个不共面的向量，称为**基矢**。等价地，它是一个点集，使得无论选取哪个点作为观察者，从该点看出去的排列——方位和距离都一样——都完全相同。
:::

两种说法一致。若点集由 [[#eq-lattice]] 给出，那么把原点平移到任何 $\mathbf R'$ 都把该集合映到自身，因为 $\mathbf R - \mathbf R'$ 的系数仍是整数。反过来，从每个点看都一样的点集对减法封闭，并且可以证明它有一组由三个基矢构成的基。向量 $\mathbf R$ 称为晶体的**格矢**或**平移**。

基矢不唯一。在二维里，$\mathbf a_1$ 和 $\mathbf a_2$ 可以换成 $\mathbf a_1$ 和 $\mathbf a_1 + \mathbf a_2$ 而不改变点集；一般地，任何行列式为 $\pm1$ 的整数矩阵把一组基矢变成另一组。唯一的是它们张成的体积。

::: definition 原胞、惯用胞与基元 {#def-cell}
**原胞**是空间的一个区域，用它沿所有格矢平移可以无重叠地填满空间，且其中恰好含一个格点。$\mathbf a_1, \mathbf a_2, \mathbf a_3$ 张成的平行六面体就是一个原胞；其体积为

$$
V_c = \abs{\mathbf a_1 \cdot (\mathbf a_2 \times \mathbf a_3)}.
$$ {#eq-vcell}

**维格纳–赛茨胞（Wigner–Seitz cell）** 是由离某个给定格点比离任何其他格点更近的全部点构成的原胞。**惯用胞**是较大的胞，为显示对称性而选取，沿格矢的某个子集平移即可填满空间。**晶体结构**是一个布拉维格子加上一个**基元**：原胞内位于 $\mathbf r_1, \dots, \mathbf r_p$ 的一组原子，在每个格点处重复。
:::

所有原胞体积相同，都是 $V_c$，因为每个原胞装一个格点，而体积 $V$ 的大区域含 $V/V_c$ 个格点。维格纳–赛茨胞值得单独定义，是因为它具有格子的全部对称性：它的构造不依赖基矢的任何选择。

### 立方格子

三维空间中恰有十四个布拉维格子，按对称性分为七个晶系（立方、四方、正交、单斜、三斜、三方、六角）。布拉维（Bravais）在 1848 年完成的计数是一条几何定理；证明是对与格子相容的转动进行分类的细致工作，可见 Ashcroft 与 Mermin 第 7 章。三个立方格子将承担本课程的绝大部分内容。

- **简单立方（sc）。** 基矢 $a\hat{\mathbf x}, a\hat{\mathbf y}, a\hat{\mathbf z}$。每个边长 $a$ 的立方含一个格点，最近邻六个，距离 $a$。钋是唯一在常压下以此方式结晶的元素。
- **体心立方（bcc）。** 立方体的八个顶角加体心。基矢可取 $\frac a2(-1,1,1)$、$\frac a2(1,-1,1)$、$\frac a2(1,1,-1)$。每个惯用立方含两个格点，$V_c = a^3/2$，最近邻八个，距离 $\sqrt3\,a/2$。常温下的铁、钠、铬和钨都是 bcc。
- **面心立方（fcc）。** 立方体的顶角加六个面的面心。基矢 $\frac a2(0,1,1)$、$\frac a2(1,0,1)$、$\frac a2(1,1,0)$。每个惯用立方含四个格点，$V_c = a^3/4$，最近邻十二个，距离 $a/\sqrt2$。铜、铝、银、金和镍都是 fcc。

数 $a$ 是**晶格常数**，永远指惯用立方的边长。因此，给出一个 bcc 或 fcc 金属的晶格常数，并没有给出基矢的长度，这是 $\sqrt2$ 因子差错的一个常见来源。

多数晶体需要多于一个原子的基元。氯化钠是 fcc 格子配上基元：$\mathrm{Na}$ 在 $(0,0,0)$，$\mathrm{Cl}$ 在 $\frac a2(1,0,0)$：两套互相穿插的 fcc 格子，每个离子被六个异号离子包围。氯化铯是简单立方，$\mathrm{Cs}$ 在顶角，$\mathrm{Cl}$ 在体心。它看起来像 bcc，但不是，因为体心位置是另一种原子，与顶角不等价。金刚石、硅和锗具有**金刚石结构**：fcc 配两个全同原子，位于 $(0,0,0)$ 和 $\frac a4(1,1,1)$，每个原子以四面体方式与四个近邻成键。闪锌矿（$\mathrm{GaAs}$、$\mathrm{ZnS}$）情形相同，只是两个原子不同。这些以及许多其他结构的晶体化学概要，见化学图谱（[晶体结构](/learn/chemistry/lesson.php?c=materials-chemistry&l=crystal-structures)）。

::: example 致密度 {#ex-packing}
把原子当作与最近邻相切的硬球。求 sc、bcc、fcc 三种格子中球填满空间的比例。
::: solution
相切的球半径 $r$ 等于最近邻距离的一半。致密度是一个惯用立方内球的体积除以 $a^3$。

对于 sc，每个立方一个球，$r = a/2$：

$$
f_\mathrm{sc} = \frac{\frac43\pi (a/2)^3}{a^3} = \frac{\pi}{6} = 0.524.
$$

对于 bcc，每个立方两个球，沿体对角线相切，故 $4r = \sqrt3\,a$：

$$
f_\mathrm{bcc} = \frac{2\cdot\frac43\pi\bigl(\sqrt3 a/4\bigr)^3}{a^3} = \frac{\sqrt3\,\pi}{8} = 0.680.
$$

对于 fcc，每个立方四个球，沿面对角线相切，故 $4r = \sqrt2\,a$：

$$
f_\mathrm{fcc} = \frac{4\cdot\frac43\pi\bigl(\sqrt2 a/4\bigr)^3}{a^3} = \frac{\pi}{3\sqrt2} = 0.740.
$$

fcc 的值是全等球可能的最密堆积，这是开普勒（Kepler）猜想、黑尔斯（Hales）于 1998 年证明的事实。六角密排用同样的密排层的另一种堆垛方式达到同样的比例。没有方向性成键的金属往往在这两者中择一。
:::
:::

::: example 铜的密度 {#ex-cu-density}
铜是 fcc，常温下晶格常数 $a = 3.615\,\text{Å}$，摩尔质量 $63.546\,\mathrm{g/mol}$。预言它的密度。
::: solution
惯用立方含四个原子：八个顶角各被八个立方分享，六个面心各被两个立方分享，故 $8\cdot\frac18 + 6\cdot\frac12 = 4$。一个原子的质量是 $M/N_A$。于是

$$
\rho = \frac{4M}{N_A a^3} = \frac{4 \times 63.546\times10^{-3}\,\mathrm{kg/mol}}{(6.02214\times10^{23}\,\mathrm{mol^{-1}})(3.615\times10^{-10}\,\mathrm{m})^3} = 8.93\times10^{3}\,\mathrm{kg/m^3}.
$$

手册中铜的密度是 $8.96\,\mathrm{g/cm^3}$。符合到三分之一个百分点，是对整个图像的一次检验：原子坐在 fcc 格子上，其晶格常数由 X 射线衍射测得，正如我们将看到的。把论证倒过来跑，测得的密度加测得的晶格常数就给出阿伏伽德罗常数；在 2019 年其数值被定义为定值之前，$N_A$ 的最精确测定就是这样做的。
:::
:::

::: quiz
石墨烯中碳原子的蜂窝图案在平面内重复。碳原子位置构成的集合是布拉维格子吗？
- [ ] 是，因为它是周期的。
- [x] 不是；它是一个三角布拉维格子配二元基元。
- [ ] 不是，因为原子不相切。
- [ ] 是，但只在忽略两个子格子时成立。
::: solution
站在一个碳原子上：它的三个近邻指向"左上、右上、正下"。站在近邻原子上，它们指向"左下、右下、正上"。周围环境距离相同但转了方向，所以两类位置不等价，该集合不满足 [[#def-bravais]] 的第二种表述。蜂窝格子是三角格子配每个原胞两个原子。光有周期性不够；每个点都必须看到相同的景象。
:::
:::

## 晶面与密勒指数 {#planes}

任意三个不共线的格点确定一个包含无穷多个格点的平面，称为**晶面**。让它沿所有格矢平移，得到一族平行、等间距的平面，全体格点都在这族平面上。衍射谈论的正是这样的平面族，所以我们需要一个标签。

::: definition 密勒指数 {#def-miller}
取一族晶面以及该族中离原点最近而不过原点的平面。设它沿惯用胞的三条基矢方向截轴于 $x_1 \mathbf a$、$x_2 \mathbf b$、$x_3 \mathbf c$。该平面族的**密勒指数（Miller indices）** $(hkl)$ 是倒数 $1/x_1, 1/x_2, 1/x_3$ 乘上使它们成为无公因子整数的最小倍数。与某轴平行的平面截距为 $\infty$，相应指数为 $0$；负指数在数字上加横线表示，如 $(\bar1 10)$。**面间距** $d_{hkl}$ 是该族中相邻两平面的距离。
:::

在立方轴上截距为 $(a, \infty, \infty)$ 的平面是 $(100)$，即立方体的一个面。截距 $(a, a, \infty)$ 的是 $(110)$，穿过一条面对角线。截距 $(a,a,a)$ 的是 $(111)$，垂直于体对角线。立方晶体中 $(100)$、$(010)$、$(001)$ 由对称性相联系；全部等价平面族写作 $\{100\}$。对以惯用立方为基准的立方格子，面间距为

$$
d_{hkl} = \frac{a}{\sqrt{h^2 + k^2 + l^2}},
$$ {#eq-dcubic}

我们将在 [[#cor-dcubic]] 中由倒格子证明它。分析立方晶体的衍射时，用得最多的公式就是它。密勒指数有时是相对基矢而非惯用胞定义的；在本课程中它们总是指惯用立方。

## 倒格子 {#reciprocal}

具有格子周期性的量，例如电子密度 $n(\mathbf r)$ 或电子感受到的势，对每个格矢 $\mathbf R$ 满足 $n(\mathbf r + \mathbf R) = n(\mathbf r)$。这样的函数可以按平面波 $e^{i\mathbf G\cdot \mathbf r}$ 展开，但只能按那些自身也是周期的平面波展开：我们需要对一切 $\mathbf R$ 有 $e^{i\mathbf G\cdot(\mathbf r + \mathbf R)} = e^{i\mathbf G\cdot\mathbf r}$。

::: definition 倒格子 {#def-reciprocal}
布拉维格子 $\{\mathbf R\}$ 的**倒格子**是使

$$
e^{i\mathbf G\cdot\mathbf R} = 1 \qquad \text{对每个格矢 } \mathbf R
$$ {#eq-recip-def}

成立的全部波矢 $\mathbf G$ 的集合。原来的格子称为**正格子**。倒格子的维格纳–赛茨胞是**第一布里渊区（Brillouin zone）**。
:::

这个定义还没有说明诸 $\mathbf G$ 构成格子。下一条定理把它构造出来。

::: theorem 倒格子的基矢 {#thm-recip-basis}
设 $\mathbf a_1, \mathbf a_2, \mathbf a_3$ 为基矢，$V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3)$，并定义

$$
\mathbf b_1 = \frac{2\pi}{V}\,\mathbf a_2 \times \mathbf a_3, \qquad
\mathbf b_2 = \frac{2\pi}{V}\,\mathbf a_3 \times \mathbf a_1, \qquad
\mathbf b_3 = \frac{2\pi}{V}\,\mathbf a_1 \times \mathbf a_2.
$$ {#eq-bvectors}

则 $\mathbf a_i \cdot \mathbf b_j = 2\pi\,\delta_{ij}$，且倒格子恰为集合 $\mathbf G = m_1\mathbf b_1 + m_2\mathbf b_2 + m_3\mathbf b_3$，$m_1, m_2, m_3 \in \Z$。它本身是一个布拉维格子，原胞体积为 $(2\pi)^3/V_c$。
:::

::: proof
先算点积。$\mathbf a_1\cdot\mathbf b_1 = (2\pi/V)\,\mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = 2\pi$。$\mathbf a_2\cdot\mathbf b_1 = (2\pi/V)\,\mathbf a_2\cdot(\mathbf a_2\times\mathbf a_3) = 0$，因为叉积垂直于每个因子，同样 $\mathbf a_3\cdot\mathbf b_1 = 0$。其余两列由循环置换得到，用到 $\mathbf a_2\cdot(\mathbf a_3\times\mathbf a_1) = \mathbf a_3\cdot(\mathbf a_1\times\mathbf a_2) = V$。

诸 $\mathbf b_j$ 线性无关：若 $\sum_j c_j\mathbf b_j = 0$，与 $\mathbf a_i$ 作点积得 $2\pi c_i = 0$。所以任何波矢都可写成 $\mathbf k = \sum_j m_j \mathbf b_j$，$m_j$ 为实数。对格矢 $\mathbf R = \sum_i n_i\mathbf a_i$，

$$
\mathbf k\cdot\mathbf R = \sum_{i,j} n_i m_j\, \mathbf a_i\cdot\mathbf b_j = 2\pi\,(n_1m_1 + n_2m_2 + n_3m_3).
$$

若每个 $m_j$ 都是整数，则对一切整数 $n_i$ 上式都是 $2\pi$ 的整数倍，[[#eq-recip-def]] 成立。反过来，若 [[#eq-recip-def]] 对每个 $\mathbf R$ 成立，取 $\mathbf R = \mathbf a_1$：则 $2\pi m_1$ 是 $2\pi$ 的整数倍，故 $m_1\in\Z$，同理 $m_2, m_3\in\Z$。所以倒格子就是诸 $\mathbf b_j$ 的整数张成，是一个布拉维格子。其原胞体积为 $\abs{\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3)}$；以 $\mathbf a_i$ 为行的矩阵乘以以 $\mathbf b_j$ 为列的矩阵等于 $2\pi$ 倍单位阵，所以两个行列式之积为 $(2\pi)^3$，体积即为 $(2\pi)^3/V_c$。
:::

关系 $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$ 对两套向量是对称的，所以倒格子的倒格子就是正格子。基矢长则倒格子基矢短：边长 $a$ 的简单立方格子的倒格子是边长 $2\pi/a$ 的简单立方格子。

::: example fcc 的倒格子是 bcc {#ex-fcc-recip}
求惯用立方边长为 $a$ 的 fcc 格子的倒格子，以及最短的非零倒格矢。
::: solution
取 $\mathbf a_1 = \frac a2(0,1,1)$，$\mathbf a_2 = \frac a2(1,0,1)$，$\mathbf a_3 = \frac a2(1,1,0)$。叉积为

$$
\mathbf a_2\times\mathbf a_3 = \frac{a^2}{4}\bigl((0)(0) - (1)(1),\ (1)(1) - (1)(0),\ (1)(1) - (0)(1)\bigr) = \frac{a^2}{4}(-1, 1, 1),
$$

且 $V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = \frac a2\cdot\frac{a^2}{4}(0 + 1 + 1) = a^3/4$，恰是四分之一个立方体的体积，正如应为。于是

$$
\mathbf b_1 = \frac{2\pi}{a^3/4}\cdot\frac{a^2}{4}(-1,1,1) = \frac{2\pi}{a}(-1, 1, 1),
$$

由对称性 $\mathbf b_2 = \frac{2\pi}{a}(1,-1,1)$，$\mathbf b_3 = \frac{2\pi}{a}(1,1,-1)$。这些恰是一个 bcc 格子的基矢，其惯用立方边长为 $4\pi/a$。最短的非零倒格矢是八个 $\frac{2\pi}{a}(\pm1,\pm1,\pm1)$，长度 $2\sqrt3\,\pi/a$；接下来是六个 $\frac{2\pi}{a}(\pm2, 0, 0)$ 及其置换，长度 $4\pi/a$。fcc 晶体的第一布里渊区是这个 bcc 格子的维格纳–赛茨胞：一个截角八面体，八个六角面垂直平分第一组，六个正方形面垂直平分第二组。这个形状出现在铜、硅、砷化镓的每一张能带图上。
:::
:::

倒格子并不是扣在晶体之上的一层抽象。它的每个向量都挂着一族晶面，其长度编码着面间距。

::: theorem 倒格矢与晶面 {#thm-planes}
对每族间距为 $d$ 的晶面，都存在垂直于该族平面的倒格矢，其中最短者长度为 $2\pi/d$。反过来，对每个非零倒格矢 $\mathbf G$，存在一族垂直于 $\mathbf G$ 的晶面，其间距 $d$ 满足 $\abs{\mathbf G} = 2\pi n/d$，$n$ 为某个正整数。
:::

::: proof
先证反向。设 $\mathbf G \neq 0$ 是倒格矢，写 $\mathbf G = n\mathbf G_0$，其中 $\mathbf G_0$ 是与 $\mathbf G$ 平行的最短倒格矢，$n$ 为正整数。对任何格矢，$\mathbf G_0\cdot\mathbf R = 2\pi m$，$m\in\Z$。给定 $m$ 的格点位于平面 $\mathbf G_0\cdot\mathbf r = 2\pi m$ 上，该平面垂直于 $\mathbf G_0$，而相邻的 $m$ 值给出相距 $2\pi/\abs{\mathbf G_0}$ 的平面。每个格点都落在这些平面之一上。每个平面上确实含有格点：设 $\mathbf G_0 = \sum m_j\mathbf b_j$，整数 $m_j$ 无公因子（否则 $\mathbf G_0$ 不是最短），故由贝祖（Bézout）定理存在整数 $n_j$ 使 $\sum n_jm_j = 1$，于是存在 $m = 1$ 的格点 $\mathbf R_1$，而 $\mathbf R_1$ 的倍数到达每个 $m$。一个含格点的平面含该平面上的一张二维格点网，因为满足 $\mathbf G_0\cdot\mathbf R = 0$ 的格矢张成该平面。所以这些平面构成一族晶面，间距 $d = 2\pi/\abs{\mathbf G_0}$，且 $\abs{\mathbf G} = 2\pi n/d$。

再证正向。给定一族间距为 $d$、单位法向为 $\hat{\mathbf n}$ 的平面，设其中一个平面过原点，则每个格点满足 $\hat{\mathbf n}\cdot\mathbf R = jd$，$j$ 为整数。令 $\mathbf G = (2\pi/d)\hat{\mathbf n}$。则对一切 $\mathbf R$ 有 $e^{i\mathbf G\cdot\mathbf R} = e^{2\pi i j} = 1$，故 $\mathbf G$ 是倒格矢。若存在与之平行且更短的向量 $(2\pi/d')\hat{\mathbf n}$，$d' > d$，则要求对出现的每个 $j$（包括 $j = 1$，相邻平面含格点）$jd/d'$ 都是整数，而 $d' > d$ 时这是不可能的。所以 $2\pi/d$ 就是最短长度。
:::

::: corollary 立方晶体的面间距 {#cor-dcubic}
对惯用立方边长为 $a$ 的立方晶体，密勒指数为 $(hkl)$ 的平面族垂直于 $\mathbf G = \frac{2\pi}{a}(h,k,l)$，其面间距为 $d_{hkl} = a/\sqrt{h^2+k^2+l^2}$。
:::

::: proof
在惯用立方生成的简单立方格子中计算；其倒格子是 $\frac{2\pi}{a}(h,k,l)$，分量为整数。截距为 $a/h, a/k, a/l$ 的平面是 $hx + ky + lz = a$，其法向为 $(h,k,l)$，故垂直于 $\mathbf G = \frac{2\pi}{a}(h,k,l)$。$h,k,l$ 互素时这个 $\mathbf G$ 是同方向中最短的，由 [[#thm-planes]] 得 $d = 2\pi/\abs{\mathbf G} = a/\sqrt{h^2+k^2+l^2}$。对 bcc 与 fcc，真正的格子比简单立方格子多格点，简单立方的某些平面族会被额外的平面穿插。这些平面族在衍射中仍按同样的 $d_{hkl}$ 公式出现，但指数要受 [[#structure-factor]] 的结构因子限制。
:::

::: intuition 为什么叫"倒"
一族平面就是一组波阵面。倒格矢就是这组波阵面的波矢：它垂直穿过平面，其长度等于 $2\pi$ 除以面间距，与波的 $k = 2\pi/\lambda$ 一模一样。面密的平面族 $\mathbf G$ 长。稠密的倒格子对应稀疏的正格子。每个位置周期的函数都是这些波阵面的叠加，$n(\mathbf r) = \sum_{\mathbf G} n_{\mathbf G}\,e^{i\mathbf G\cdot\mathbf r}$，这就是 [[math-methods/fourier]] 的傅里叶级数在三维的对应。
:::

## 衍射：布拉格与劳厄 {#diffraction}

X 射线的波长在埃（Å）量级，与原子间距相当，所以晶体对它的作用如同光栅。被电子轰击的铜靶发出特征 $\mathrm{K\alpha}$ 线，$\lambda = 1.5406\,\text{Å}$，光子能量 $8.05\,\mathrm{keV}$，这就是大多数实验室衍射仪所用的波长。

### 布拉格图像

布拉格父子把一族晶面想象成一层层弱反射镜。每个面镜面式地反射入射束的一小部分，反射角等于入射角。角 $\theta$ 从平面量起，不是从平面法线量起。从相邻两面反射的射线光程差为 $2d\sin\theta$：下面那条射线下行多走 $d\sin\theta$ 到达它的面，再上行多走同样距离。当这个差为波长的整数倍时，各面反射相长叠加：

$$
2d\sin\theta = n\lambda, \qquad n = 1, 2, 3, \dots
$$ {#eq-bragg}

这就是**布拉格定律（Bragg's law）**。光束总共偏转 $2\theta$，衍射仪记录的是 $2\theta$。由于 $\sin\theta \le 1$，只有 $d \ge \lambda/2$ 的平面才可能反射；可见光的 $\lambda$ 是 $d$ 的数千倍，所以可见光不被晶体衍射。

镜面图像是一个模型，不是推导：它没有说明为什么平面内的原子会像镜子一样反射，也没有给出强度是多少。冯·劳厄的图像两者都回答。

### 劳厄图像

设波矢为 $\mathbf k$ 的平面波入射晶体，考虑被弹性散射到波矢 $\mathbf k'$ 方向的波，$\abs{\mathbf k'} = \abs{\mathbf k} = 2\pi/\lambda$。位于 $\mathbf r$ 处、含电子密度 $n(\mathbf r)$ 的小体积元，其散射振幅正比于 $n(\mathbf r)$，相位由路径决定：相对于原点处的散射中心，入射波多走了相位 $\mathbf k\cdot\mathbf r$ 到达，出射波带走相位 $-\mathbf k'\cdot\mathbf r$。在远离晶体处，总散射振幅正比于

$$
F(\Delta\mathbf k) = \int n(\mathbf r)\,e^{-i\Delta\mathbf k\cdot\mathbf r}\,\dd^3 r, \qquad \Delta\mathbf k = \mathbf k' - \mathbf k.
$$ {#eq-amplitude}

**散射矢量** $\Delta\mathbf k$ 是动量转移除以 $\hbar$。代入周期密度的傅里叶级数 $n(\mathbf r) = \sum_{\mathbf G} n_{\mathbf G} e^{i\mathbf G\cdot\mathbf r}$：

$$
F(\Delta\mathbf k) = \sum_{\mathbf G} n_{\mathbf G} \int e^{i(\mathbf G - \Delta\mathbf k)\cdot\mathbf r}\,\dd^3 r.
$$

对大晶体，除非指数因子消失，积分可以忽略；指数消失时积分等于晶体体积。因此，只有当

$$
\Delta\mathbf k = \mathbf k' - \mathbf k = \mathbf G \quad \text{对某个倒格矢 } \mathbf G
$$ {#eq-laue}

时，才出现尖锐的衍射束。这就是**劳厄条件**：散射矢量必须是倒格矢。此时振幅正比于傅里叶系数 $n_{\mathbf G}$。锐度的理由与多缝光栅相同，下图对 $N$ 个原子排成的一行作了展示。

::: widget plot
f: sin(pi*N*x)^2/(N^2*sin(pi*x)^2)
x: -0.49, 3.49
y: 0, 1.05
sliders: N=6:1:40:1
caption: 间距 $a$ 的 $N$ 个全同原子排成一行所散射的强度，除以其最大值 $N^2$，对 $x = \Delta k\,a/2\pi$ 作图。峰位于整数 $x$ 处，那里 $\Delta k$ 是倒格矢 $2\pi m/a$。把 $N$ 调大，看峰变窄：宽度约为 $1/N$，而高度（未除以 $N^2$ 前）按 $N^2$ 增长，所以峰下面积按 $N$ 增长。对每条棱上有 $10^7$ 个原子的晶体，只有劳厄条件幸存。把 $N = 1$，单个原子向一切方向散射。
:::

::: theorem 布拉格与劳厄等价 {#thm-bragg-laue}
对弹性散射，$\abs{\mathbf k'} = \abs{\mathbf k} = 2\pi/\lambda$，劳厄条件 $\mathbf k' - \mathbf k = \mathbf G$ 对某个非零倒格矢 $\mathbf G$ 成立，当且仅当入射束与散射束同垂直于 $\mathbf G$、间距为 $d$ 的一族晶面成等角 $\theta$，且满足 $2d\sin\theta = n\lambda$，其中 $\abs{\mathbf G} = 2\pi n/d$。
:::

::: proof
设 $\mathbf k' = \mathbf k + \mathbf G$。两边平方并用 $\abs{\mathbf k'} = \abs{\mathbf k}$ 得 $2\mathbf k\cdot\mathbf G + G^2 = 0$，即

$$
\mathbf k\cdot\hat{\mathbf G} = -\tfrac12 \abs{\mathbf G},
$$

进而 $\mathbf k'\cdot\hat{\mathbf G} = \mathbf k\cdot\hat{\mathbf G} + \abs{\mathbf G} = +\tfrac12\abs{\mathbf G}$。$\mathbf k$ 与 $\mathbf k'$ 沿 $\hat{\mathbf G}$ 的分量大小相等、方向相反；它们垂直于 $\hat{\mathbf G}$ 的分量相等，因为 $\mathbf k' - \mathbf k$ 没有垂直分量。所以 $\mathbf k'$ 是 $\mathbf k$ 关于垂直于 $\mathbf G$ 的平面的镜像：镜面反射。设 $\theta$ 为 $\mathbf k$ 与该平面的夹角。$\mathbf k$ 垂直于平面的分量为 $k\sin\theta$，故

$$
k\sin\theta = \tfrac12\abs{\mathbf G}, \qquad \frac{2\pi}{\lambda}\sin\theta = \frac{1}{2}\cdot\frac{2\pi n}{d},
$$

其中已用 [[#thm-planes]] 把垂直于 $\mathbf G$ 的晶面族写成 $\abs{\mathbf G} = 2\pi n/d$。整理即 $2d\sin\theta = n\lambda$。

反过来，设两束与一族间距为 $d$ 的平面成等角 $\theta$，$\mathbf k'$ 是 $\mathbf k$ 的镜像，且 $2d\sin\theta = n\lambda$。则差 $\mathbf k' - \mathbf k$ 垂直于平面，大小为 $2k\sin\theta = (4\pi/\lambda)\sin\theta = 2\pi n/d$。由 [[#thm-planes]]，$(2\pi/d)\hat{\mathbf n}$ 是倒格矢，其 $n$ 倍也是，而 $\mathbf k' - \mathbf k$ 正是它，是一个倒格矢。
:::

证明同时给出了如何解读级数 $n$。间距为 $d$ 的平面的 $n$ 级反射，与间距为 $d/n$ 的假想平面的第一级反射是同一件事。因此晶体学家干脆去掉 $n$，把"$(100)$ 的二级反射"写作 $(200)$ 反射，对 [[#eq-bragg]] 取 $n = 1$，对 [[#eq-dcubic]] 取允许有公因子的指数。

::: warning 衍射中的角度
有三种常见错误。第一，布拉格定律中的 $\theta$ 是光束与平面的夹角，不是光束与法线的夹角；用光学的入射角会把 $\sin$ 错成 $\cos$。第二，衍射仪报出的是 $2\theta$，即总偏转角，忘记折半是常事。第三，劳厄条件中 $\mathbf G$ 不含因子 $2$，布拉格定律里却是 $2d$：因子通过 $\abs{\mathbf k'-\mathbf k} = 2k\sin\theta$ 重新出现。如果算出 $\sin\theta > 1$，要么三者之一出了错，要么该反射在这个波长下不可达。
:::

劳厄条件有一个由埃瓦尔德（Ewald）给出的作图法。画出倒格子，画出来到原点的 $\mathbf k$，再以 $\mathbf k$ 的起点为心、$k$ 为半径作球。球面上的任何倒格点都给出一条从球心指向它的衍射束。对固定的晶体和单一波长，这个球一般恰好不经过除原点以外的任何格点，于是什么都看不到。所以实验必须改变某个变量。劳厄用的是连续谱，给出半径的一系列值；布拉格父子转动晶体；德拜（Debye）与谢勒（Scherrer）的**粉末法**使用细粉末，其中一切取向都有，于是每个满足 $d \ge \lambda/2$ 的反射都呈现为以入射束为轴、半顶角 $2\theta$ 的圆锥。

## 结构因子 {#structure-factor}

劳厄条件说束可以往哪里去。它们有多亮则取决于胞里装着什么。设基元的原子位于 $\mathbf r_1, \dots, \mathbf r_p$，原子 $j$ 附近的电子密度为 $n_j(\mathbf r - \mathbf r_j)$。把 [[#eq-amplitude]] 在 $\Delta\mathbf k = \mathbf G$ 处逐胞求值，每个胞的贡献相同，所以振幅等于胞数 $N$ 乘以

$$
\int_\text{原胞} n(\mathbf r)\,e^{-i\mathbf G\cdot\mathbf r}\,\dd^3r = \sum_{j=1}^{p} e^{-i\mathbf G\cdot\mathbf r_j}\int n_j(\boldsymbol\rho)\,e^{-i\mathbf G\cdot\boldsymbol\rho}\,\dd^3\rho.
$$

::: definition 结构因子 {#def-structure-factor}
原子 $j$ 的**原子形状因子**为 $f_j(\mathbf G) = \int n_j(\boldsymbol\rho)\,e^{-i\mathbf G\cdot\boldsymbol\rho}\,\dd^3\rho$。基元的**几何结构因子**为

$$
S_{\mathbf G} = \sum_{j=1}^{p} f_j(\mathbf G)\,e^{-i\mathbf G\cdot\mathbf r_j}.
$$ {#eq-structure}

$\mathbf G$ 处反射的强度正比于 $\abs{S_{\mathbf G}}^2$。
:::

在 $\mathbf G = 0$ 处形状因子等于原子的电子数，中性原子就是 $Z$；它随 $\abs{\mathbf G}$ 衰减，因为电子云有有限大小。较重的原子对 X 射线散射更强；氢几乎不可见，这是中子衍射——散射自原子核——与 X 射线互补的原因之一。最重要的是基元内各原子间的干涉。若 [[#eq-structure]] 中的相位相消，一个晶格允许的反射强度为零：**系统消光**。

最重要的情形是用惯用立方描述的立方布拉维格子。对 bcc 和 fcc，惯用立方不是原胞，但我们可以把 bcc 当作带两点基元的简单立方格子，把 fcc 当作带四点基元的简单立方格子，所有点全同。于是劳厄条件跑遍简单立方的倒格子 $\mathbf G = \frac{2\pi}{a}(h,k,l)$，而结构因子把不属于真正倒格子的向量剔除掉。

::: theorem bcc 与 fcc 的系统消光 {#thm-absences}
对用惯用立方描述的单原子晶体，$\mathbf G = \frac{2\pi}{a}(h,k,l)$，形状因子为 $f$，

$$
S^\mathrm{bcc}_{hkl} = f\bigl(1 + (-1)^{h+k+l}\bigr) =
\begin{cases} 2f, & h+k+l \text{ 为偶数}, \\ 0, & h+k+l \text{ 为奇数}; \end{cases}
$$ {#eq-s-bcc}

$$
S^\mathrm{fcc}_{hkl} = f\bigl(1 + (-1)^{h+k} + (-1)^{k+l} + (-1)^{h+l}\bigr) =
\begin{cases} 4f, & h,k,l \text{ 全为偶数或全为奇数}, \\ 0, & \text{其他情况}. \end{cases}
$$ {#eq-s-fcc}
:::

::: proof
bcc 的基元是 $\mathbf r_1 = 0$、$\mathbf r_2 = \frac a2(1,1,1)$。于是 $\mathbf G\cdot\mathbf r_2 = \pi(h+k+l)$ 且 $e^{-i\pi(h+k+l)} = (-1)^{h+k+l}$，代入 [[#eq-structure]] 即得 [[#eq-s-bcc]]。

fcc 的基元是 $0$、$\frac a2(0,1,1)$、$\frac a2(1,0,1)$、$\frac a2(1,1,0)$，相位为 $\pi(k+l)$、$\pi(h+l)$、$\pi(h+k)$，即得 [[#eq-s-fcc]] 的第一种形式。若 $h,k,l$ 奇偶相同，则每一对之和为偶数，$S = 4f$。若不然，则三者中两个奇偶相同、另一个不同；于是三个两两之和中恰有一个为偶数、两个为奇数，$S = f(1 + 1 - 1 - 1) = 0$。
:::

这条定理与 [[#ex-fcc-recip]] 相容：幸存的 fcc 指数 $(111)$、$(200)$、$(220)$、$(311)$，…恰是那里求出的 bcc 倒格子的点 $\frac{2\pi}{a}(h,k,l)$。结构因子没有发明任何东西；它是从一个过大的格子里重建出真正的倒格子。

::: example 铜的粉末衍射花样 {#ex-cu-xrd}
用铜 $\mathrm{K\alpha}$ 辐射 $\lambda = 1.5406\,\text{Å}$ 观察铜粉末。铜为 fcc，$a = 3.6149\,\text{Å}$。预言前五条衍射线 $2\theta$ 的角度。
::: solution
由 [[#thm-absences]]，允许的指数 $h,k,l$ 全为偶数或全为奇数。按 $s = h^2+k^2+l^2$ 从小到大依次为 $(111)$，$s = 3$；$(200)$，$s = 4$；$(220)$，$s = 8$；$(311)$，$s = 11$；$(222)$，$s = 12$。$s = 1, 2, 5, 6, 9, 10$ 缺失。对每条线，由 [[#eq-dcubic]] 得 $d$，再由 $n = 1$ 的布拉格定律得 $\sin\theta = \lambda/2d$：

| $hkl$ | $s$ | $d\ (\text{Å})$ | $\theta$ | $2\theta$ |
|---|---|---|---|---|
| $111$ | $3$ | $2.0871$ | $21.66^\circ$ | $43.32^\circ$ |
| $200$ | $4$ | $1.8075$ | $25.23^\circ$ | $50.45^\circ$ |
| $220$ | $8$ | $1.2781$ | $37.06^\circ$ | $74.13^\circ$ |
| $311$ | $11$ | $1.0899$ | $44.97^\circ$ | $89.94^\circ$ |
| $222$ | $12$ | $1.0435$ | $47.58^\circ$ | $95.15^\circ$ |

对第一条线，$d_{111} = 3.6149/\sqrt3 = 2.0871\,\text{Å}$ 且 $\sin\theta = 1.5406/(2\times2.0871) = 0.36908$，故 $\theta = 21.66^\circ$。标准粉末衍射数据库中铜的实测花样，最强的峰在 $43.3^\circ$、$50.4^\circ$ 和 $74.1^\circ$，与计算一致。头两条线间隔很近、随后出现一段空档，这是 fcc 的指纹。倒过来读，一条已标定峰的位置就能给出四位或五位有效数字的 $a$；[[#ex-cu-density]] 用的晶格常数就是这样得到的。
:::
:::

::: example 标定未知立方花样 {#ex-indexing}
某立方金属在 $\lambda = 1.5406\,\text{Å}$ 下给出 $2\theta = 40.26^\circ, 58.25^\circ, 73.19^\circ, 87.00^\circ, 100.63^\circ, 114.93^\circ, 131.17^\circ$ 的谱线。辨认格子并求 $a$。
::: solution
由布拉格定律和 [[#eq-dcubic]]，

$$
\sin^2\theta = \frac{\lambda^2}{4a^2}\,(h^2+k^2+l^2),
$$

所以诸 $\sin^2\theta$ 值必与形如 $h^2+k^2+l^2$ 的整数 $s$ 成正比。把角度折半、正弦平方，得

$$
0.1184,\ 0.2369,\ 0.3554,\ 0.4738,\ 0.5922,\ 0.7108,\ 0.8292,
$$

其比为 $1 : 2.000 : 3.00 : 4.00 : 5.00 : 6.00 : 7.00$。若为 fcc，比值应以 $3:4:8$ 开头，这里不是。对简单立方，每个 $s$ 都允许，除非它不能表为三个平方数之和，最小的这样的数是 $7$；所以比值为 $7$ 的第七条线对 sc 是不可能的。对 bcc，允许的 $s$ 是偶数 $2, 4, 6, 8, 10, 12, 14$，比值正是 $1:2:3:4:5:6:7$。格子是 bcc，第一条线是 $(110)$，$s = 2$：

$$
a = \frac{\lambda\sqrt{s}}{2\sin\theta} = \frac{1.5406\,\text{Å}\times\sqrt2}{2\sqrt{0.11844}} = 3.165\,\text{Å}.
$$

这是钨，$a = 3.165\,\text{Å}$，密度 $2\times183.84\,\mathrm{g/mol}/(N_A a^3) = 19.25\,\mathrm{g/cm^3}$。假如只记录了前六条线，仅凭位置就无法区分 sc 与 bcc；那时要靠密度裁决，因为边长 $a = 3.165/\sqrt2\,\text{Å}$ 的 sc 格子将意味着另一个密度。
:::
:::

若基元由不同原子组成，相消就不完全。岩盐 $\mathrm{NaCl}$ 中，[[#eq-s-fcc]] 的 fcc 因子再乘上基元因子 $f_\mathrm{Na} + f_\mathrm{Cl}(-1)^{h+k+l}$。全偶反射很强，$\propto f_\mathrm{Na}+f_\mathrm{Cl}$；全奇反射很弱，$\propto f_\mathrm{Cl}-f_\mathrm{Na}$。$\mathrm{KCl}$ 中两种离子电子数相同，各有 $18$ 个电子，故 $f_\mathrm{K}\approx f_\mathrm{Cl}$，奇反射几乎消失：X 射线看到的是一张边长 $a/2$ 的简单立方格子。下一张图让你做出它的一维版本。

::: widget plot
f: (1 + F^2 + 2*F*cos(2*pi*u*x))/(1 + F)^2*sin(12*pi*x)^2/(144*sin(pi*x)^2)
x: -0.49, 4.49
y: 0, 1.05
sliders: u=0.3:0:0.5:0.01; F=1:0:1:0.05
caption: 一条由 $12$ 个长度为 $a$ 的胞组成的链，每胞在 $0$ 处放一个形状因子为 $1$ 的原子，在 $ua$ 处放一个形状因子为 $F$ 的原子，对 $x = \Delta k\,a/2\pi$ 作图。格子决定峰位在整数 $x$ 处；基元通过 $\abs{1 + F e^{2\pi i u x}}^2$ 决定峰高。取 $F = 1$ 并把 $u$ 滑到 $0.5$：奇峰消失，链显露出间距为 $a/2$ 的格子，这就是 bcc 消光的一维类比。再把 $F$ 压低，如同 $\mathrm{NaCl}$，奇峰回归，虽弱但存在。
:::

::: quiz
bcc 金属的粉末衍射花样中出现下列哪些反射？
- [x] $(110)$
- [ ] $(111)$
- [x] $(200)$
- [ ] $(210)$
- [x] $(211)$
::: solution
由 [[#eq-s-bcc]]，$h+k+l$ 为偶数时 bcc 反射幸存：$(110)$ 得 $2$，$(200)$ 得 $2$，$(211)$ 得 $4$。$(111)$ 与 $(210)$ 的和为奇数，缺失。物理上，对立方体的 $(100)$ 型平面，体心原子恰好在两相邻平面中间多插一层，散射位相恰好相反。"全偶或全奇"的规则属于 fcc，不属于 bcc。
:::
:::

::: history 从劳厄斑到达布拉格定律
1912 年，在慕尼黑，马克斯·冯·劳厄（Max von Laue）提出：若 X 射线的波长与原子间距相当，晶体就应当衍射它们；瓦尔特·弗里德里希（Walter Friedrich）与保罗·克尼平（Paul Knipping）把一束 X 射线穿过硫酸铜晶体，记录下的斑点花样一次解决了两个问题——X 射线是波，晶体是格子。劳厄获得 1914 年诺贝尔物理学奖。1912 年晚些时候和 1913 年，当时还是剑桥学生的威廉·劳伦斯·布拉格（William Lawrence Bragg）把这些斑点重新解释为晶面的反射，并与父亲威廉·亨利·布拉格（William Henry Bragg）一起建成 X 射线光谱仪，测定了 $\mathrm{NaCl}$、$\mathrm{KCl}$ 和金刚石的结构。父子分享了 1915 年诺贝尔奖；小布拉格时年 25 岁，至今保持最年轻物理学奖得主纪录。十四个格子由奥古斯特·布拉维（Auguste Bravais）于 1848 年枚举完毕；倒格子作图法由保罗·埃瓦尔德（Paul Ewald）在 1913 与 1921 年发展；彼得·德拜（Peter Debye）与保罗·谢勒（Paul Scherrer）于 1916 年引入粉末衍射法。
:::

## 后续内容 {#leads}

倒格子是本课程其余部分的主战场。在 [[condensed-matter/lattice-vibrations]] 中，晶格振动的波矢只在模一个倒格矢的意义下有定义，第一布里渊区为每个模保留一份。在 [[condensed-matter/free-electrons]] 中，电子态在 $\mathbf k$ 空间中计数；而在 [[condensed-matter/band-structure]] 中，劳厄条件重新出现为电子波被晶格布拉格反射、从而打开能隙的条件。中子散射测量声子和磁有序，就是加上能量转移的劳厄条件。这一切背后的数学是 [[math-methods/fourier]] 的傅里叶级数。

::: summary
- 晶体是布拉维格子 $\mathbf R = \sum n_i\mathbf a_i$ 加上在每个格点重复的原子基元；sc、bcc、fcc 的每个惯用立方分别含 $1$、$2$、$4$ 个格点。
- 倒格子是使 $e^{i\mathbf G\cdot\mathbf R} = 1$ 的诸 $\mathbf G$ 之集；其基矢满足 $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$，fcc 与 bcc 互为倒格子。
- 每个倒格矢垂直于一族晶面，$\abs{\mathbf G_\text{min}} = 2\pi/d$；立方晶体中 $d_{hkl} = a/\sqrt{h^2+k^2+l^2}$。
- 衍射要求 $\mathbf k' - \mathbf k = \mathbf G$（劳厄）；对弹性散射它等价于 $2d\sin\theta = n\lambda$（布拉格）。
- 反射强度 $\propto\abs{S_\mathbf G}^2$，其中 $S_\mathbf G = \sum_j f_j e^{-i\mathbf G\cdot\mathbf r_j}$；bcc 要求 $h+k+l$ 为偶数，fcc 要求 $h,k,l$ 奇偶不混。
- 粉末花样中 $\sin^2\theta$ 的比值可辨认立方格子，一条已标定的线就给出晶格常数。
:::

## 习题 {#exercises}

::: exercise 铁中的最近邻 {level=1 check="2.482"}
常温下的铁是 bcc，$a = 2.8665\,\text{Å}$。以埃为单位求最近邻距离。
::: solution
bcc 中顶角原子的最近邻是共享该顶角的八个立方体的体心原子。顶角到体心的距离是体对角线的一半：

$$
d_\mathrm{nn} = \frac{\sqrt3}{2}a = 0.86603 \times 2.8665\,\text{Å} = 2.482\,\text{Å}.
$$

次近邻有六个，沿立方棱方向，距离 $a = 2.8665\,\text{Å}$，只远 $15\%$。这个差距不大，所以 bcc 有时被说成有"八个加六个"近邻。
:::
:::

::: exercise 一个布拉格角 {level=1 check="15.85"}
岩盐的 $(200)$ 面间距 $d = 2.8201\,\text{Å}$。求铜 $\mathrm{K\alpha}$ 辐射 $\lambda = 1.5406\,\text{Å}$ 一级反射的布拉格角 $\theta$，以度为单位。
::: solution
由 [[#eq-bragg]]，取 $n = 1$，

$$
\sin\theta = \frac{\lambda}{2d} = \frac{1.5406}{2\times2.8201} = 0.27315, \qquad \theta = 15.85^\circ.
$$

探测器应在 $2\theta = 31.70^\circ$。面间距是 $a/2$，对应 $a = 5.6402\,\text{Å}$，正如 [[#eq-dcubic]] 对 $(200)$ 所给。
:::
:::

::: exercise 简单立方的致密度 {level=1 check="pi/6"}
证明在简单立方格子上相切的硬球填满空间的 $\pi/6$，并给出该比例。
::: solution
每个边长 $a$ 的立方含一个球，近邻沿棱相切，故 $r = a/2$。比例为 $\frac43\pi(a/2)^3/a^3 = \pi/6 \approx 0.524$，如 [[#ex-packing]]。填不满六成半的空间，这是几乎没有任何元素采用这种结构的原因之一。
:::
:::

::: exercise bcc 的倒格子 {level=2 check="sqrt(2)"}
用基矢 $\mathbf a_1 = \frac a2(-1,1,1)$、$\mathbf a_2 = \frac a2(1,-1,1)$、$\mathbf a_3 = \frac a2(1,1,-1)$，求 bcc 的倒格子。以 $2\pi/a$ 为单位给出其最短非零向量的长度。
::: solution
计算 $\mathbf a_2\times\mathbf a_3 = \frac{a^2}{4}\bigl((-1)(-1) - (1)(1),\ (1)(1) - (1)(-1),\ (1)(1) - (-1)(1)\bigr) = \frac{a^2}{4}(0, 2, 2)$，且 $V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = \frac{a^3}{8}(0 + 2 + 2) = a^3/2$。于是

$$
\mathbf b_1 = \frac{2\pi}{a^3/2}\cdot\frac{a^2}{4}(0,2,2) = \frac{2\pi}{a}(0,1,1),
$$

由对称性 $\mathbf b_2 = \frac{2\pi}{a}(1,0,1)$，$\mathbf b_3 = \frac{2\pi}{a}(1,1,0)$。这是边长 $4\pi/a$ 的立方的 fcc 基矢。最短向量是十二条形如 $\frac{2\pi}{a}(\pm1,\pm1,0)$ 的向量，以 $2\pi/a$ 为单位长度为 $\sqrt2$。它们对应 $\{110\}$ 反射，由 [[#eq-s-bcc]] 这正是 bcc 花样中的头几条线。
:::
:::

::: exercise 铁的第一条线 {level=2 check="44.67"}
预言 bcc 铁粉末衍射花样第一条线的角度 $2\theta$，以度为单位，$a = 2.8665\,\text{Å}$，$\lambda = 1.5406\,\text{Å}$。
::: solution
满足 $h+k+l$ 为偶数且不全为零的最小的 $s = h^2+k^2+l^2$ 是 $s = 2$，即 $(110)$ 反射。于是 $d_{110} = 2.8665/\sqrt2 = 2.0269\,\text{Å}$，

$$
\sin\theta = \frac{1.5406}{2\times2.0269} = 0.38004, \qquad \theta = 22.335^\circ, \qquad 2\theta = 44.67^\circ.
$$

它紧邻铜的 $(111)$ 线 $43.32^\circ$，铁铜混合样品要小心处理就是这个缘故。
:::
:::

::: exercise 金刚石的结构因子 {level=2 check="32"}
金刚石结构是 fcc 配位于 $0$ 和 $\frac a4(1,1,1)$ 的两个全同原子。证明其结构因子为 $S^\mathrm{fcc}_{hkl}\bigl(1 + e^{-i\pi(h+k+l)/2}\bigr)$，并求 $\abs{S_{111}}^2/f^2$。再证明 $(200)$ 尽管在 fcc 中允许，在这里却是缺失的。
::: hint
把金刚石看作配二元基元的 fcc 格子，结构因子就写成乘积。
:::
::: solution
四个 fcc 位置每个携带两个原子，位于 $\mathbf r$ 和 $\mathbf r + \frac a4(1,1,1)$，于是 [[#eq-structure]] 中的和因子化为 fcc 之和乘以 $1 + e^{-i\mathbf G\cdot\frac a4(1,1,1)} = 1 + e^{-i\pi(h+k+l)/2}$。对 $(111)$，fcc 因子是 $4f$，第二个因子是 $1 + e^{-3\pi i/2} = 1 + i$，模平方为 $2$：

$$
\abs{S_{111}}^2 = 16f^2\times2 = 32f^2.
$$

对 $(200)$，fcc 因子是 $4f$，但 $1 + e^{-i\pi} = 0$。一般地，在全偶反射中，$h+k+l = 4m+2$ 的那些消失。所以硅显示 $(111)$、$(220)$ 和 $(311)$，但没有 $(200)$ 或 $(222)$；$(222)$ 处有一条弱线，来自成键电荷，它不是球对称的。
:::
:::

::: exercise 从一条线定晶格常数 {level=2 check="4.050"}
铝（fcc）的第一条线在 $\lambda = 1.5406\,\text{Å}$ 下位于 $2\theta = 38.47^\circ$。求 $a$，以埃为单位，保留四位有效数字。
::: solution
fcc 第一条线是 $(111)$，$s = 3$。$\theta = 19.235^\circ$ 时 $\sin\theta = 0.32947$，故

$$
a = \frac{\lambda\sqrt3}{2\sin\theta} = \frac{1.5406\times1.73205}{0.65894} = 4.050\,\text{Å}.
$$

常温下的公认值是 $4.0495\,\text{Å}$。角度测到 $0.01^\circ$，在这个角度上 $a$ 约为三千分之一；高角线处 $\cot\theta$ 小，效果好得多，因为 $\delta a/a = -\cot\theta\,\delta\theta$。
:::
:::

::: exercise 倒格子胞的体积 {level=3}
直接用 [[#eq-bvectors]] 证明 $\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3) = (2\pi)^3/V$，不使用行列式。
::: hint
用恒等式 $(\mathbf A\times\mathbf B)\times(\mathbf C\times\mathbf D) = [\mathbf A\cdot(\mathbf B\times\mathbf D)]\,\mathbf C - [\mathbf A\cdot(\mathbf B\times\mathbf C)]\,\mathbf D$。
:::
::: solution
写 $\mathbf b_2\times\mathbf b_3 = (2\pi/V)^2(\mathbf a_3\times\mathbf a_1)\times(\mathbf a_1\times\mathbf a_2)$。对 $\mathbf A = \mathbf a_3$、$\mathbf B = \mathbf a_1$、$\mathbf C = \mathbf a_1$、$\mathbf D = \mathbf a_2$ 套用恒等式：

$$
(\mathbf a_3\times\mathbf a_1)\times(\mathbf a_1\times\mathbf a_2) = [\mathbf a_3\cdot(\mathbf a_1\times\mathbf a_2)]\,\mathbf a_1 - [\mathbf a_3\cdot(\mathbf a_1\times\mathbf a_1)]\,\mathbf a_2 = V\mathbf a_1,
$$

因为 $\mathbf a_1\times\mathbf a_1 = 0$，且混合积具有循环性。所以 $\mathbf b_2\times\mathbf b_3 = (2\pi)^2\mathbf a_1/V$，于是

$$
\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3) = \frac{2\pi}{V}(\mathbf a_2\times\mathbf a_3)\cdot\frac{(2\pi)^2}{V}\mathbf a_1 = \frac{(2\pi)^3}{V^2}\,V = \frac{(2\pi)^3}{V}.
$$

同样的计算表明 $\mathbf b_2\times\mathbf b_3 \propto \mathbf a_1$，这是"倒格子的倒格子是正格子"这一结论的向量形式。
:::
:::

::: exercise 格子求和 {level=3}
对位于 $x = 0, a, \dots, (N-1)a$ 的 $N$ 个全同散射中心，证明散射强度正比于 $\sin^2(N\phi/2)/\sin^2(\phi/2)$，其中 $\phi = \Delta k\,a$。证明其在 $\phi = 2\pi m$ 处的极大高度为 $N^2$，前两个零点位于 $\phi = 2\pi m \pm 2\pi/N$，并由此推出每条峰下的面积按 $N$ 增长。
::: solution
振幅是等比级数

$$
A = \sum_{n=0}^{N-1} e^{-in\phi} = \frac{1 - e^{-iN\phi}}{1 - e^{-i\phi}} = e^{-i(N-1)\phi/2}\,\frac{\sin(N\phi/2)}{\sin(\phi/2)},
$$

其中从分子提出 $e^{-iN\phi/2}$、从分母提出 $e^{-i\phi/2}$，并用了 $e^{ix}-e^{-ix} = 2i\sin x$。强度为 $\abs A^2 = \sin^2(N\phi/2)/\sin^2(\phi/2)$。在 $\phi = 2\pi m$ 处级数每项都是 $1$，故 $A = N$，强度为 $N^2$。分子在 $N\phi/2 = \pi(Nm \pm 1)$，即 $\phi = 2\pi m \pm 2\pi/N$ 处消失，而分母不为零，这些就是中央峰两侧的第一个零点，峰宽为 $2\pi/N$ 量级。高度 $N^2$ 乘宽 $\propto 1/N$ 给出面积 $\propto N$。精确地说，$\abs A^2$ 在一个周期上的平均为 $\sum_{n,n'}\langle e^{-i(n-n')\phi}\rangle = N$，因为平均后只剩 $N$ 个对角项。每个原子贡献它自己的散射功率，格子只是把它重新分配到劳厄方向上。
:::
:::
