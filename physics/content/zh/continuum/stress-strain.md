拉一根钢棒，它会伸长一点；松手，它又弹回去。把勺子推过蜂蜜，蜂蜜绕着勺子流走。这两种行为由同两个概念描述。**应力**说的是假想截面一侧的介质如何推另一侧的介质。**应变**说的一小块介质的形状改变了多少。固体是应力依赖于应变的连续介质；流体则是应力依赖于应变*变化率*的连续介质，这一点 [[continuum/viscous-flow]] 将会说明。本章在不对介质作任何假设的前提下建立这两个对象。

迫使我们引入全套机制的，是下面这个问题。一根直径 $12.0\,\mathrm{mm}$ 的钢杆承受沿轴线方向 $20.0\,\mathrm{kN}$ 的拉力。横截面上单位面积的力是 $F/A$。可是，与横截面成 $30^\circ$ 的斜截面上单位面积的力是多少？它有法向部分和切向部分，而两者都依赖于截面的方位。单个数装不下这些信息。向量也装不下，因为对不同的截面，答案是不同的向量。能装下它的是一个从截面法向到该面上力的线性映射：一个二阶张量。

用到的工具是 [[math-methods/vector-calculus|向量分析]]、[[math-methods/integral-theorems]] 中的散度定理，以及 [[mechanics/newton-laws]] 的牛顿第二定律。全篇使用带求和约定的指标记号：重复指标对 $1$ 到 $3$ 求和，所以 $\sigma_{ij}n_j$ 表示 $\sum_j \sigma_{ij}n_j$。一年级课程 [[mechanics/fluids]] 中的压强将作为应力在各个方向推挤等值的特例重新出现。

## 连续介质假设 {#continuum}

物质由原子组成，但我们不想跟踪 $10^{23}$ 个原子。我们要的是场：密度 $\rho(\mathbf x, t)$、速度 $\mathbf v(\mathbf x, t)$、位移 $\mathbf u(\mathbf x, t)$，在每一点都有定义且可微。

::: definition 连续介质场 {#def-continuum}
当存在一个中间尺度 $\ell$ 使得 $a \ll \ell \ll L$ 时，就说材料在长度尺度 $L$ 上可按**连续介质**处理，其中 $a$ 是微观尺度（固体或液体中的原子间距，气体中的平均自由程）。$\mathbf x$ 处的一个**物质点**是以 $\mathbf x$ 为中心、大小为 $\ell^3$ 的体积元。它的密度是其中的质量除以 $\ell^3$；它的速度是其中的动量除以质量。这些平均值在很好的精度下不依赖于 $\ell$ 的精确取法，并且定义了光滑的场。
:::

尺度之间的分离很容易满足。常温常压的空气每立方米约有 $2.5\times10^{25}$ 个分子。边长 $1\,\mu\mathrm m$ 的立方体中含有其中 $2.5\times10^{7}$ 个，因此分子数的相对统计涨落约为 $1/\sqrt{2.5\times 10^7} = 2\times10^{-4}$。平均自由程约为 $70\,\mathrm{nm}$。在水或钢中，原子间距是零点几纳米，边长 $1\,\mu\mathrm m$ 的立方体容纳约 $10^{10}$ 个原子。因此连续介质力学在液体和固体中直到微米尺度都成立；而在稀薄气体（高层大气、真空泵）中它失效，因为那里平均自由程与容器尺寸相比已不能忽略。

::: remark 连续介质是模型，不是论断
本课程中没有任何东西断言物质是连续的。它说的是：对物质点的平均服从封闭的偏微分方程，其中只有少数几个材料常数——密度、弹性模量、黏度——概括了微观物理。从原子出发计算这些常数，是 [[statistical-mechanics]] 与 [[condensed-matter]] 的事。
:::

## 体力与表面力 {#forces}

在介质内取任意区域 $V$，以曲面 $S$ 为边界。宇宙其余部分以两种方式作用于 $V$ 中的介质。

- **体力**作用于每个体积元：重力，或电磁场对带电、被磁化介质的作用力。我们把体力写成单位体积的力 $\mathbf f(\mathbf x)$，总力即 $\int_V \mathbf f\,\dd V$。重力对应 $\mathbf f = \rho\mathbf g$。
- **表面力**由 $S$ 外侧紧邻的介质跨过 $S$ 施加。它们来自程非常短的分子间作用力，以及穿过 $S$ 的分子对动量的输运。无论哪种来源，其作用都局限于 $S$ 处一个分子厚度的薄层内，所以在连续介质尺度上它是单位面积的力。

::: definition 面力 {#def-traction}
设 $\dd A$ 是 $\mathbf x$ 处一块单位法向为 $\mathbf n$ 的小面元。由 $\mathbf n$ 所指向一侧的介质对 $\mathbf n$ 所背离一侧的介质施加的力为 $\mathbf t(\mathbf x, \mathbf n)\,\dd A$。向量 $\mathbf t(\mathbf x, \mathbf n)$ 称为该面元上的**面力**（或应力矢量）。它沿 $\mathbf n$ 的分量 $\sigma_n = \mathbf t\cdot\mathbf n$ 是**法向应力**；$\sigma_n$ 为正表示拉伸。余下的部分 $\mathbf t - \sigma_n\mathbf n$ 是该面元上的**剪切应力**。
:::

换句话说：当 $\mathbf n$ 取外法向时，$\mathbf t(\mathbf n)$ 就是外部对内部单位面积的力。假设表面力只依赖于位置与法向、不依赖于曲面的弯曲程度，这就是**柯西（Cauchy）应力原理**。其依据是那些力的短程性。

应力与压强量纲相同，单位是帕斯卡。工程师通常用兆帕：$1\,\mathrm{MPa} = 1\,\mathrm{N/mm^2}$。结构钢约在 $250\,\mathrm{MPa}$ 屈服；大气压强是 $0.101\,\mathrm{MPa}$。

## 柯西定理：应力是张量 {#cauchy}

面力本来是方向 $\mathbf n$ 的任意函数。把牛顿（Newton）第二定律用于极小的介质块，就迫使它对 $\mathbf n$ 是线性的。论证用到一个事实：表面力按面积 $\ell^2$ 伸缩，而惯性力和体力按体积 $\ell^3$ 伸缩。在足够小的块上，表面力必须自身平衡。

::: lemma 作用与反作用 {#lem-action}
$\mathbf t(\mathbf x, -\mathbf n) = -\mathbf t(\mathbf x, \mathbf n)$。
:::

::: proof
考虑以 $\mathbf x$ 为中心的一块薄平板介质，两表面面积为 $A$、法向为 $\pm\mathbf n$，厚度为 $h$。薄板的牛顿第二定律是

$$
\mathbf t(\mathbf n)A + \mathbf t(-\mathbf n)A + (\text{棱边上的力}) + \int_{\text{薄片}}(\mathbf f - \rho\mathbf a)\,\dd V = 0.
$$

棱边的面积和薄板的体积都正比于 $h$。保持 $A$ 固定令 $h \to 0$，再除以 $A$，并利用 $\mathbf t$ 对 $\mathbf x$ 的连续性让薄板收缩到 $\mathbf x$。剩下的就是 $\mathbf t(\mathbf n) + \mathbf t(-\mathbf n) = 0$。
:::

::: theorem 柯西应力定理 {#thm-cauchy}
设面力对 $\mathbf x$ 和 $\mathbf n$ 连续，体力与加速度有界。则在每一点存在九个数 $\sigma_{ij}(\mathbf x)$，使得对每个单位向量 $\mathbf n$ 都有

$$
t_i(\mathbf x, \mathbf n) = \sigma_{ij}(\mathbf x)\,n_j .
$$ {#eq-cauchy}

数 $\sigma_{ij}$ 是法向沿第 $j$ 个坐标轴的面上面力的 $i$ 分量：$\sigma_{ij} = t_i(\mathbf e_j)$。
:::

::: proof
固定 $\mathbf x$ 和三个分量全为正的单位向量 $\mathbf n$。作一个顶点在 $\mathbf x$ 的四面体：三个面在坐标平面上，第四个面面积为 $A$、外法向为 $\mathbf n$，与 $\mathbf x$ 相距 $h$。位于垂直于 $\mathbf e_j$ 的坐标平面内的那个面，是斜截面在该平面上的投影，所以它的面积是 $A_j = A n_j$，外法向是 $-\mathbf e_j$。体积是 $\frac13 hA$。

对四面体内的介质写牛顿第二定律：

$$
\int_{A}\mathbf t(\mathbf n)\,\dd A + \sum_{j=1}^{3}\int_{A_j}\mathbf t(-\mathbf e_j)\,\dd A + \int_{V}(\mathbf f - \rho\mathbf a)\,\dd V = 0 .
$$

除以 $A$，固定 $\mathbf n$ 令 $h \to 0$。体积分项被常数乘 $hA/3$ 控制，除以 $A$ 后在极限下消失。由连续性，每个面积分除以 $A$ 后趋于 $\mathbf x$ 处的面力乘以面积比：

$$
\mathbf t(\mathbf n) + \sum_j n_j\,\mathbf t(-\mathbf e_j) = 0 .
$$

由 [[#lem-action]]，$\mathbf t(-\mathbf e_j) = -\mathbf t(\mathbf e_j)$，故 $\mathbf t(\mathbf n) = \sum_j n_j\,\mathbf t(\mathbf e_j)$。取 $i$ 分量即得 [[#eq-cauchy]]，其中 $\sigma_{ij} = t_i(\mathbf e_j)$。

若 $\mathbf n$ 的某些分量为负，改用坐标面外法向为 $-\operatorname{sgn}(n_j)\mathbf e_j$ 的四面体；同样的论证配上 [[#lem-action]] 给出同一公式。若某个分量为零，公式由 $\mathbf n$ 的连续性得到。
:::

九个数 $\sigma_{ij}$ 组成**柯西应力张量** $\boldsymbol\sigma$。写成矩阵形式即 $\mathbf t = \boldsymbol\sigma\mathbf n$。对角元 $\sigma_{11}, \sigma_{22}, \sigma_{33}$ 是坐标面上的法向应力；非对角元是剪切应力。因为 $\mathbf t$ 与 $\mathbf n$ 都是向量，且关系在每个参考系中都成立，分量在旋转 $R$ 下按 $\sigma'_{ij} = R_{ik}R_{jl}\sigma_{kl}$ 变换——这正是 $\boldsymbol\sigma$ 是张量而不只是一张数表的原因。

### 运动方程

对有限区域 $V$，牛顿第二定律现在化为偏微分方程。表面力总和是 $\oint_S \sigma_{ij}n_j\,\dd A$，散度定理把它变成 $\int_V \partial_j\sigma_{ij}\,\dd V$。

::: theorem 柯西运动方程 {#thm-motion}
若 $\boldsymbol\sigma$ 连续可微，则在介质的每一点

$$
\rho\,a_i = \pdv{\sigma_{ij}}{x_j} + f_i ,
$$ {#eq-motion}

其中 $\mathbf a$ 是该点处物质点的加速度。平衡时 $\partial_j\sigma_{ij} + f_i = 0$。
:::

::: proof
对随介质一起运动的任意区域 $V$，动量的变化率等于总力：

$$
\int_V \rho\,a_i\,\dd V = \oint_S \sigma_{ij}n_j\,\dd A + \int_V f_i\,\dd V = \int_V\left(\pdv{\sigma_{ij}}{x_j} + f_i\right)\dd V .
$$

（左端确实是该区域动量的变化率——这是关于运动体积的一个命题，在 [[continuum/fluid-kinematics]] 中证明；这里只需要每个物质点具有质量 $\rho\,\dd V$ 和加速度 $\mathbf a$。）被积函数 $\rho a_i - \partial_j\sigma_{ij} - f_i$ 连续，且对每个区域积分为零。若它在某点为正，它在该点附近一个小球内都为正，于是该球上的积分就为正。所以它处处为零。
:::

[[#eq-motion]] 的物理内容是：使介质产生加速度的只是应力的*变化*。一根均匀受力的杆，无论应力多大，都有 $\partial_j\sigma_{ij} = 0$，保持不动。

### 应力张量的对称性

牛顿第二定律不是唯一的守恒律。每一块介质的角动量必须按它所受力矩规定的速率改变。这迫使 $\sigma_{ij} = \sigma_{ji}$，于是九个分量中只有六个独立。

::: theorem 应力的对称性 {#thm-symmetric}
若不存在体力偶，也不存在偶应力（不是由 $\mathbf t$ 的力矩产生的单位面积力矩），则 $\sigma_{ij} = \sigma_{ji}$。
:::

::: proof
介质区域 $V$ 对原点的力矩是 $\oint_S \epsilon_{ijk}x_j t_k\,\dd A + \int_V \epsilon_{ijk}x_j f_k\,\dd V$，其角动量的变化率是 $\int_V \epsilon_{ijk}x_j\rho a_k\,\dd V$。把 $t_k = \sigma_{kl}n_l$ 代入并用散度定理：

$$
\oint_S \epsilon_{ijk}x_j\sigma_{kl}n_l\,\dd A = \int_V \epsilon_{ijk}\pdv{}{x_l}\bigl(x_j\sigma_{kl}\bigr)\dd V = \int_V \epsilon_{ijk}\bigl(\delta_{jl}\sigma_{kl} + x_j\partial_l\sigma_{kl}\bigr)\dd V .
$$

于是角动量平衡化为

$$
\int_V \epsilon_{ijk}x_j\bigl(\rho a_k - \partial_l\sigma_{kl} - f_k\bigr)\dd V = \int_V \epsilon_{ijk}\sigma_{kj}\,\dd V .
$$

左端由 [[#eq-motion]] 消失。于是 $\int_V\epsilon_{ijk}\sigma_{kj}\,\dd V = 0$ 对每个区域成立，按上一个证明末尾的论证，$\epsilon_{ijk}\sigma_{kj} = 0$ 在每一点成立。取 $i = 3$ 就是 $\sigma_{21} - \sigma_{12} = 0$，另外两个分量同理。
:::

::: intuition 小方块
在 $xy$ 平面内画一个边长 $\ell$ 的小方块。垂直于 $x$ 的两个面上的剪应力 $\sigma_{yx}$ 构成一个力偶，单位厚度的力矩大小为 $\sigma_{yx}\ell^2\cdot\ell$；垂直于 $y$ 的面上的 $\sigma_{xy}$ 构成反向力偶 $\sigma_{xy}\ell^3$。方块对中心的转动惯量按 $\ell^4$ 伸缩。若两个力偶不平衡，方块缩小时角加速度将按 $1/\ell$ 无界增长。剪应力在相互垂直的面上成对出现。
:::

::: example 斜截面上的面力 {#ex-traction}
受力构件内某点的应力张量（单位兆帕）为

$$
\boldsymbol\sigma = \begin{pmatrix} 10 & 4 & 0 \\ 4 & -6 & 2 \\ 0 & 2 & 3\end{pmatrix}.
$$

求单位法向为 $\mathbf n = \frac13(1, 2, 2)$ 的截面上的面力、法向应力以及剪切应力的大小。
::: solution
由 [[#eq-cauchy]]，$\mathbf t = \boldsymbol\sigma\mathbf n$：

$$
\mathbf t = \frac13\begin{pmatrix} 10 + 8 + 0 \\ 4 - 12 + 4 \\ 0 + 4 + 6\end{pmatrix} = \frac13\begin{pmatrix}18\\-4\\10\end{pmatrix} = \begin{pmatrix}6.00\\-1.33\\3.33\end{pmatrix}\mathrm{MPa}.
$$

法向应力是

$$
\sigma_n = \mathbf t\cdot\mathbf n = \frac19(18 - 8 + 20) = \frac{30}{9} = 3.33\,\mathrm{MPa},
$$

为拉应力。面力的大小是 $\abs{\mathbf t} = \frac13\sqrt{324 + 16 + 100} = \frac{\sqrt{440}}{3} = 6.99\,\mathrm{MPa}$，所以剪切应力的大小为

$$
\tau = \sqrt{\abs{\mathbf t}^2 - \sigma_n^2} = \sqrt{\frac{440}{9} - \frac{100}{9}} = \frac{\sqrt{340}}{3} = 6.15\,\mathrm{MPa}.
$$

面力离平行于 $\mathbf n$ 差得很远：这个截面上介质主要在被剪切。
:::
:::

### 压强就是各向同性应力

静止流体中没有剪切应力，因为流体按定义就不能在平衡状态下抵抗剪切。于是对每个截面都有 $\mathbf t = -p\,\mathbf n$，其中 $p$ 是某个数。[[#exr-isotropic]] 表明这迫使 $\sigma_{ij} = -p\,\delta_{ij}$，且对一切方位用同一个 $p$：[[mechanics/fluids]] 的帕斯卡（Pascal）定律是一条关于张量的定理。对一般的应力，我们*定义*平均压强为

$$
p = -\tfrac13\sigma_{kk} = -\tfrac13(\sigma_{11} + \sigma_{22} + \sigma_{33}),
$$ {#eq-pressure}

并把 $\sigma_{ij}$ 拆成 $\sigma_{ij} = -p\,\delta_{ij} + s_{ij}$，其中**偏应力** $s_{ij}$ 的迹为零。张量的迹在旋转下不变，所以 $p$ 在每个参考系中都相同。改变形状的是偏应力部分；改变体积的是压强。

## 主应力 {#principal}

因为 $\boldsymbol\sigma$ 是实对称矩阵，线性代数的谱定理适用（见数学图谱的[谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)一课）。存在一组由特征向量构成的标准正交基，在该基下应力张量是对角阵。

::: theorem 主应力 {#thm-principal}
在每一点存在三个两两垂直的方向 $\mathbf n^{(1)}, \mathbf n^{(2)}, \mathbf n^{(3)}$，称为**主方向（主轴）**，其截面上的面力纯属法向：$\boldsymbol\sigma\mathbf n^{(k)} = \sigma_k\mathbf n^{(k)}$。实数 $\sigma_1 \ge \sigma_2 \ge \sigma_3$ 称为**主应力**。它们是方程

$$
\det(\boldsymbol\sigma - \lambda I) = -\lambda^3 + I_1\lambda^2 - I_2\lambda + I_3 = 0
$$

的根，其中的**不变量**为 $I_1 = \sigma_{kk}$、$I_2 = \frac12(\sigma_{ii}\sigma_{jj} - \sigma_{ij}\sigma_{ij})$、$I_3 = \det\boldsymbol\sigma$。过该点的一切截面中，法向应力的最大值与最小值是 $\sigma_1$ 和 $\sigma_3$；剪切应力的最大值是 $\frac12(\sigma_1 - \sigma_3)$，在与第一、第三主轴各成 $45^\circ$ 的截面上取得。
:::

::: proof
实标准正交特征基的存在性就是实对称矩阵的谱定理，把特征多项式展开即得不变量。在主基下，单位法向 $\mathbf n = (n_1, n_2, n_3)$ 上的面力为 $(\sigma_1 n_1, \sigma_2 n_2, \sigma_3 n_3)$，于是

$$
\sigma_n = \sigma_1 n_1^2 + \sigma_2 n_2^2 + \sigma_3 n_3^2 .
$$

权重 $n_k^2$ 非负且和为 $1$，所以 $\sigma_n$ 是主应力的加权平均，介于 $\sigma_3$ 与 $\sigma_1$ 之间，最值在 $\mathbf n = \mathbf n^{(1)}$ 与 $\mathbf n = \mathbf n^{(3)}$ 处取得。

再看剪应力：$\tau^2 = \abs{\mathbf t}^2 - \sigma_n^2 = \sum_k\sigma_k^2 n_k^2 - \bigl(\sum_k \sigma_k n_k^2\bigr)^2$。这正是取值 $\sigma_k$、对应概率为 $n_k^2$ 的一个随机变量的方差。取值限于 $[\sigma_3, \sigma_1]$ 的变量，其方差不超过 $\frac14(\sigma_1 - \sigma_3)^2$，且只有把概率 $\frac12$ 各放在两端时才达到。所以 $\tau \le \frac12(\sigma_1 - \sigma_3)$，等号在 $n_1^2 = n_3^2 = \frac12$、$n_2 = 0$ 时成立：法向在第一、第三主轴之间 $45^\circ$ 处。
:::

平面问题中，一个主方向已知是 $z$，另外两个的旋转就是一族单参数曲线。把坐标轴绕 $z$ 转过角 $\theta$。法向与 $x$ 成角 $\theta$ 的截面上的法向应力与剪切应力为

$$
\begin{aligned}
\sigma_n(\theta) &= \frac{\sigma_{xx} + \sigma_{yy}}{2} + \frac{\sigma_{xx} - \sigma_{yy}}{2}\cos 2\theta + \sigma_{xy}\sin 2\theta, \\
\tau(\theta) &= -\frac{\sigma_{xx} - \sigma_{yy}}{2}\sin 2\theta + \sigma_{xy}\cos 2\theta .
\end{aligned}
$$ {#eq-rotation}

这些式子由 $\sigma_n = \mathbf n\cdot\boldsymbol\sigma\mathbf n$、$\tau = \mathbf m\cdot\boldsymbol\sigma\mathbf n$ 配上 $\mathbf n = (\cos\theta, \sin\theta)$、$\mathbf m = (-\sin\theta, \cos\theta)$ 和二倍角公式得到。当 $\theta$ 变化时，点 $(\sigma_n, \tau)$ 沿一个圆运行，圆心 $\frac12(\sigma_{xx} + \sigma_{yy})$，半径 $\sqrt{\frac14(\sigma_{xx} - \sigma_{yy})^2 + \sigma_{xy}^2}$：这就是**莫尔圆（Mohr's circle）**，工程师对 [[#eq-rotation]] 的图像。$\sigma_n$ 的驻点位于 $\tau = 0$ 处，即 $\tan 2\theta = 2\sigma_{xy}/(\sigma_{xx} - \sigma_{yy})$。

::: widget plot
f: (a+b)/2 + (a-b)/2*cos(2*x) + c*sin(2*x); -(a-b)/2*sin(2*x) + c*cos(2*x)
x: 0, pi
y: -100, 100
sliders: a=80:-100:100:5; b=-20:-100:100:5; c=30:-60:60:5
labels: 法向应力; 剪切应力
piticks: true
caption: 法向应力 $\sigma_n$ 与剪切应力 $\tau$（单位 MPa），画的是法向与 $x$ 轴成角 $\theta$ 的截面，对应 $\sigma_{xx} = a$、$\sigma_{yy} = b$、$\sigma_{xy} = c$ 的平面应力状态。取初始值 $80, -20, 30$ 时，法向应力在 $\theta = 0.27$（$15.5^\circ$）附近达到峰值 $88.3$，恰好是剪应力曲线过零之处；最小值 $-28.3$ 在再转四分之一圈处。先设 $a = 50$、$b = -50$、$c = 0$，再设 $a = b = 0$、$c = 50$：纯剪切正是在 $45^\circ$ 方向上看到的等值拉伸与压缩。设 $a = b$、$c = 0$，两条曲线都变平——各向同性应力没有特殊的截面。
:::

::: example 平面应力状态的主应力 {#ex-principal}
一块薄板处于平面应力，$\sigma_{xx} = 80\,\mathrm{MPa}$、$\sigma_{yy} = -20\,\mathrm{MPa}$、$\sigma_{xy} = 30\,\mathrm{MPa}$，且 $\sigma_{zz} = \sigma_{xz} = \sigma_{yz} = 0$。求主应力、主方向和最大剪应力。
::: solution
一个主方向是 $z$，对应主应力 $0$。在 $xy$ 平面内，$\begin{pmatrix}80 & 30\\ 30 & -20\end{pmatrix}$ 的特征值满足 $\lambda^2 - 60\lambda + (-1600 - 900) = 0$：

$$
\lambda = 30 \pm \sqrt{900 + 2500} = 30 \pm\sqrt{3400} = 30 \pm 58.3 .
$$

面内主应力为 $88.3\,\mathrm{MPa}$ 和 $-28.3\,\mathrm{MPa}$，于是排序后的主应力是 $\sigma_1 = 88.3$、$\sigma_2 = 0$、$\sigma_3 = -28.3\,\mathrm{MPa}$。$\sigma_1$ 的方向满足

$$
\tan 2\theta = \frac{2\times 30}{80 - (-20)} = 0.6, \qquad \theta = \tfrac12\arctan 0.6 = 15.5^\circ
$$

从 $x$ 轴量起；$\sigma_3$ 的方向在 $105.5^\circ$。把 $\theta = 15.5^\circ$ 代入 [[#eq-rotation]] 得 $\sigma_n = 88.3$、$\tau = 0$，证实根选得对。由 [[#thm-principal]]，最大剪应力是 $\frac12(\sigma_1 - \sigma_3) = \frac12(88.3 + 28.3) = 58.3\,\mathrm{MPa}$，在相对主方向 $45^\circ$ 的截面上。这里第三个主应力在板内；若两个面内主应力都是正的，最大剪应力就要用到面外那个零主应力——这是薄板计算中的常见疏漏。
:::
:::

::: example 受拉的杆 {#ex-rod}
回答篇首的问题。直径 $12.0\,\mathrm{mm}$ 的杆承受沿轴线 $x$ 的拉力 $F = 20.0\,\mathrm{kN}$。求法向与轴线成 $30.0^\circ$ 的截面上的法向应力和剪应力，以及杆内的最大剪应力。
::: solution
离两端远处应力是均匀的，$\sigma_{xx} = F/A$，其余分量全为零：

$$
\sigma_{xx} = \frac{20.0\times10^{3}\,\mathrm N}{\pi(6.00\times10^{-3}\,\mathrm m)^2} = 1.768\times10^{8}\,\mathrm{Pa} = 177\,\mathrm{MPa}.
$$

由 $\sigma_{yy} = \sigma_{xy} = 0$，[[#eq-rotation]] 化为 $\sigma_n = \sigma_{xx}\cos^2\theta$ 和 $\abs\tau = \sigma_{xx}\sin\theta\cos\theta$。在 $\theta = 30.0^\circ$：

$$
\sigma_n = 176.8\times 0.750 = 133\,\mathrm{MPa}, \qquad \abs\tau = 176.8\times 0.433 = 76.6\,\mathrm{MPa}.
$$

主应力是 $\sigma_{xx}$、$0$、$0$，所以最大剪应力是 $\frac12\sigma_{xx} = 88.4\,\mathrm{MPa}$，在与轴线成 $45^\circ$ 的截面上。这就是韧性金属杆拉断时断口常成与轴约 $45^\circ$ 的锥形的原因：金属靠滑移屈服，而滑移由剪应力驱动。
:::
:::

::: quiz
一材料单元处于纯剪切：$\sigma_{xy} = \sigma_{yx} = \tau_0$，其余分量全为零。下面哪句话正确？
- [ ] 纯剪状态，所以不存在有法向应力的截面。
- [x] 主应力是 $\tau_0$、$0$ 和 $-\tau_0$，非零主应力的方向沿对角线 $x = \pm y$。
- [ ] 主应力是 $\tau_0$、$\tau_0$ 和 $0$。
- [ ] 平均压强是 $-\tau_0$。
::: solution
二阶块 $\begin{pmatrix}0&\tau_0\\\tau_0&0\end{pmatrix}$ 的特征值为 $\pm\tau_0$，特征向量为 $(1, \pm1)/\sqrt2$。所以纯剪切就是沿一条对角线拉伸 $\tau_0$、沿另一条对角线压缩 $\tau_0$。迹为零，由 [[#eq-pressure]] 得 $p = 0$。这就是扭转至断裂的粉笔条沿与轴成 $45^\circ$ 的螺旋面断开的原因：粉笔是脆性材料，因拉伸而破坏，而扭转中拉的主方向正在 $45^\circ$。
:::
:::

## 位移与应变 {#strain}

应力描述力，应变描述几何。用每个物质点在参考构形中的位置 $\mathbf X$ 给它编号，参考构形通常取无载荷状态。变形后它位于 $\mathbf x = \mathbf X + \mathbf u(\mathbf X)$。向量场 $\mathbf u$ 是**位移**。

平动 $\mathbf u = \text{常数}$ 不使任何东西变形，刚性转动也不。变形存在于 $\mathbf u$ 随点的变化方式之中，即存在于梯度 $\partial u_i/\partial X_j$ 之中。变形前相距 $\dd\mathbf X$ 的两个邻近物质点，变形后相距

$$
\dd x_i = \dd X_i + \pdv{u_i}{X_j}\dd X_j .
$$

因此两段长度的平方相差

$$
\abs{\dd\mathbf x}^2 - \abs{\dd\mathbf X}^2 = 2E_{ij}\,\dd X_i\,\dd X_j, \qquad E_{ij} = \frac12\left(\pdv{u_i}{X_j} + \pdv{u_j}{X_i} + \pdv{u_k}{X_i}\pdv{u_k}{X_j}\right).
$$ {#eq-green}

对称张量 $E_{ij}$ 是**格林-拉格朗日（Green–Lagrange）应变**。它对任何刚性运动都为零，无论转多大——因为刚性运动保持一切长度。

::: definition 小应变张量 {#def-strain}
当所有位移梯度都很小、$\abs{\partial u_i/\partial X_j} \ll 1$ 时，[[#eq-green]] 中的二次项可以忽略，导数里 $\mathbf X$ 与 $\mathbf x$ 的区别也可以去掉。**微小应变张量**为

$$
\varepsilon_{ij} = \frac12\left(\pdv{u_i}{x_j} + \pdv{u_j}{x_i}\right),
$$ {#eq-strain}

而**微小转动**为 $\Omega_{ij} = \frac12\bigl(\partial u_i/\partial x_j - \partial u_j/\partial x_i\bigr)$，于是 $\partial u_i/\partial x_j = \varepsilon_{ij} + \Omega_{ij}$。
:::

反对称部分 $\Omega_{ij}$ 有三个独立分量，且 $\Omega_{ij}\dd x_j = (\boldsymbol\phi\times\dd\mathbf x)_i$，其中 $\boldsymbol\phi = \frac12\nabla\times\mathbf u$。它把每个小线元都转过同一个微小角度 $\boldsymbol\phi$，所以不改变任何长度和角度。变形全在 $\varepsilon_{ij}$ 里。各分量的含义就是下面这条定理的内容。

::: theorem 应变分量的含义 {#thm-strain-meaning}
对位移梯度取到一阶：

1. 沿单位向量 $\mathbf n$ 的线元，其长度的相对改变为 $\varepsilon_{nn} = n_i\varepsilon_{ij}n_j$；特别地，$\varepsilon_{11}$ 是沿 $x$ 的纤维的相对伸长；
2. 沿两个相互垂直的单位向量 $\mathbf a$ 与 $\mathbf b$ 的线元，其夹角减小 $2a_i\varepsilon_{ij}b_j$；特别地，$x$ 轴与 $y$ 轴之间的直角减小 $2\varepsilon_{12}$；
3. 小体积的相对改变为 $\Delta V/V = \varepsilon_{kk} = \nabla\cdot\mathbf u$。
:::

::: proof
(1) 写 $\dd\mathbf X = s\,\mathbf n$。在 [[#eq-green]] 中略去二次项，得 $\abs{\dd\mathbf x}^2 = s^2(1 + 2\varepsilon_{nn})$，所以 $\abs{\dd\mathbf x} = s(1 + \varepsilon_{nn} + O(\varepsilon^2))$，长度的相对改变就是 $\varepsilon_{nn}$。

(2) 变形后两个线元成为 $\mathbf a + (\nabla\mathbf u)\mathbf a$ 和 $\mathbf b + (\nabla\mathbf u)\mathbf b$（按原长为单位长度计），其中 $(\nabla\mathbf u)_{ij} = \partial u_i/\partial x_j$。取到一阶，它们的点积为

$$
\mathbf a\cdot\mathbf b + a_i\pdv{u_i}{x_j}b_j + b_i\pdv{u_i}{x_j}a_j = 0 + 2a_i\varepsilon_{ij}b_j ,
$$

而它们的长度是 $1 + O(\varepsilon)$。新角 $\frac{\pi}{2} - \gamma$ 的余弦是 $\sin\gamma \approx \gamma$，按一阶它正好等于那个点积。所以 $\gamma = 2a_i\varepsilon_{ij}b_j$。

(3) 以 $\dd\mathbf X^{(1)}, \dd\mathbf X^{(2)}, \dd\mathbf X^{(3)}$ 为棱的小平行六面体被映为以 $(I + \nabla\mathbf u)\dd\mathbf X^{(k)}$ 为棱的平行六面体。体积乘以 $\det(I + \nabla\mathbf u) = 1 + \tr(\nabla\mathbf u) + O(\varepsilon^2)$，而 $\tr(\nabla\mathbf u) = \partial_k u_k = \varepsilon_{kk}$；转动部分的迹为零。
:::

所以对角分量是伸缩，非对角分量是直角改变量的一半。$\boldsymbol\varepsilon$ 对称，故有主方向；沿主方向介质只伸缩不剪切；三个主应变 $\varepsilon_1, \varepsilon_2, \varepsilon_3$ 之和是体应变。

::: warning 工程剪应变是张量分量的两倍
许多工程书写 $\gamma_{xy} = \partial u_x/\partial y + \partial u_y/\partial x = 2\varepsilon_{xy}$，即直角的完整改变量，并称它为剪应变。它是扭转试验中的自然量，但**不是**张量分量：把 $\gamma_{xy}$ 放进矩阵里去旋转、或求特征值，都会得到错误答案。做张量运算前先换成 $\varepsilon_{xy} = \frac12\gamma_{xy}$，并核对公式或应变片数据表用的是哪一种约定。
:::

::: example 平面位移场 {#ex-strain}
一块板以位移 $u_x = \kappa(2x + y)$、$u_y = \kappa(3x - y)$、$u_z = 0$ 变形，其中 $\kappa = 1.00\times10^{-3}$。求应变与转动、主应变及其方向，以及面积的相对改变。
::: solution
位移梯度是常数：$\partial_x u_x = 2\kappa$、$\partial_y u_x = \kappa$、$\partial_x u_y = 3\kappa$、$\partial_y u_y = -\kappa$。由 [[#eq-strain]]，

$$
\varepsilon_{xx} = 2\kappa, \qquad \varepsilon_{yy} = -\kappa, \qquad \varepsilon_{xy} = \tfrac12(\kappa + 3\kappa) = 2\kappa ,
$$

而 $\Omega_{xy} = \frac12(\kappa - 3\kappa) = -\kappa$：整块板还绕 $z$ 逆时针转过 $\phi_z = -\Omega_{xy} = +1.00\times10^{-3}\,\mathrm{rad}$，这并不引起任何变形。

主应变是 $\kappa\begin{pmatrix}2 & 2\\2 & -1\end{pmatrix}$ 的特征值，即 $\lambda^2 - \kappa\lambda - 6\kappa^2 = 0$ 的根：

$$
\lambda = \kappa\,\frac{1 \pm 5}{2} = 3\kappa \text{ 或 } -2\kappa ,
$$

即 $\varepsilon_1 = 3.00\times10^{-3}$、$\varepsilon_2 = -2.00\times10^{-3}$。对应 $3\kappa$ 的特征向量满足 $(2-3)v_x + 2v_y = 0$，故沿 $(2, 1)$ 方向，与 $x$ 成 $\arctan\frac12 = 26.6^\circ$；另一个与之垂直。沿 $(2,1)$ 的纤维伸长 $0.300\,\%$，沿 $(-1, 2)$ 的纤维缩短 $0.200\,\%$。面积的相对改变是迹 $\varepsilon_{xx} + \varepsilon_{yy} = \kappa = 1.00\times10^{-3}$，必等于 $\varepsilon_1 + \varepsilon_2$。
:::
:::

::: example 应变何时算小？ {#ex-small}
一根橡皮圈先沿 $x$ 均匀拉伸 $1.00\,\%$，另一情形拉伸 $50.0\,\%$。分别比较格林-拉格朗日应变 $E_{xx}$ 与微小应变 $\varepsilon_{xx}$。
::: solution
按因子 $\lambda$ 均匀拉伸时 $u_x = (\lambda - 1)X$，所以 $\partial u_x/\partial X = \lambda - 1$。于是 $\varepsilon_{xx} = \lambda - 1$，而由 [[#eq-green]]，

$$
E_{xx} = (\lambda - 1) + \tfrac12(\lambda - 1)^2 = \tfrac12(\lambda^2 - 1).
$$

$\lambda = 1.01$ 时：$\varepsilon_{xx} = 0.0100$，$E_{xx} = 0.01005$。差额是应变本身的一半个百分点，也正是 [[continuum/elasticity]] 每条公式所作误差的大小。$\lambda = 1.50$ 时：$\varepsilon_{xx} = 0.500$，$E_{xx} = 0.625$，相差 $25\,\%$。金属和岩石在应变约小于 $10^{-2}$ 时就断裂或屈服，所以对它们而言，小应变理论直到破坏前夕都非常好。橡胶、肌腱和软组织经常超过这个范围，需要有限应变弹性理论。
:::
:::

::: remark 相容性
六个应变分量由三个位移分量算出，所以并非每个对称场 $\varepsilon_{ij}(\mathbf x)$ 都来自某个位移。应变必须满足六个**相容性条件**（协调条件），最早由圣维南（Saint-Venant）写出，其中一个典型的是 $\partial_y^2\varepsilon_{xx} + \partial_x^2\varepsilon_{yy} = 2\partial_x\partial_y\varepsilon_{xy}$。它们保证变形后的小块彼此严丝合缝、不留空隙。当像 [[continuum/elasticity]] 那样直接解位移时，相容性自动成立。
:::

::: quiz
下面哪个位移场（$\alpha$ 为小常数）给出零微小应变？
- [ ] $\mathbf u = \alpha(x, y, z)$
- [ ] $\mathbf u = \alpha(y, 0, 0)$
- [x] $\mathbf u = \alpha(-y, x, 0)$
- [ ] $\mathbf u = \alpha(x, -y, 0)$
::: solution
对 $\mathbf u = \alpha(-y, x, 0)$，梯度为 $\partial_y u_x = -\alpha$、$\partial_x u_y = \alpha$，于是 $\varepsilon_{xy} = 0$，而对角项消失：这是绕 $z$ 转过角 $\alpha$ 的微小刚性转动。第一个场是均匀膨胀，$\varepsilon_{kk} = 3\alpha$。第二个是简单剪切，$\varepsilon_{xy} = \alpha/2$，等于纯剪切加一个转动。第四个沿 $x$ 拉伸、沿 $y$ 压缩、面积不变——与第二个是同一个纯剪切，只是坐标轴转过了 $45^\circ$。
:::
:::

::: application 应变片
应变片是粘在表面上的薄箔电阻。表面沿栅丝方向伸长 $\varepsilon$ 时，电阻的相对改变为 $k\varepsilon$，金属箔的应变片系数 $k \approx 2$。典型应变片可分辨 $10^{-6}$ 的应变。因为表面处于平面应力，按 $0^\circ$、$45^\circ$、$90^\circ$ 贴的三片——应变花——测出三个方向的 $\varepsilon_{nn}$，由 [[#thm-strain-meaning]] 的第 (1) 条，它们是 $\varepsilon_{xx}$、$\varepsilon_{yy}$、$\varepsilon_{xy}$ 的三个线性组合。解出即得完整的平面应变张量，进而得主应变。应力分析的工程做法在机械工程图谱的[应力变换](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=stress-transformation)与[三维应力与应变](/learn/mechanical/lesson.php?c=solid-mechanics&l=stress-strain-3d)两课中展开。
:::

::: history 应力概念是谁提出的
欧拉（Euler）在 1750 年代的流体论文中，已经把压强当作作用于任一内部曲面、单位面积的力来处理。一般概念来自柯西（Cauchy, Augustin-Louis）：他于 1822 年 9 月在巴黎科学院宣读，1823 年发表摘要，并在 1827–28 年的《数学练习》（*Exercices de mathématiques*）中给出完整理论——四面体论证、张量的对称性、主应力和应变张量。纳维（Navier, Claude-Louis）在 1821 年从一个以中心力联结的分子模型出发导出过弹性平衡方程，泊松（Poisson, Siméon Denis）坚持分子路线；柯西的连续介质路线使结果不依赖于任何分子图像。圣维南在 1864 年发表了相容性条件，莫尔（Mohr, Christian Otto）在 1882 年提出了他的圆。
:::

## 后续内容 {#leads}

到目前为止，应力张量与应变张量彼此还没有联系：[[#eq-motion]] 里有六个未知应力、三个未知位移。**本构关系**封闭方程组。小应变的弹性固体中，应力是应变的线性函数——胡克（Hooke）定律——这就是 [[continuum/elasticity]]，其中同一条运动方程产生地震波。流体中应力改而依赖于速度梯度，[[continuum/fluid-kinematics]] 建立流体所需的运动描述；[[continuum/ideal-flow]] 取 $\sigma_{ij} = -p\,\delta_{ij}$，[[continuum/viscous-flow]] 加上黏性应力。电磁场也带一个应力张量——麦克斯韦（Maxwell）应力——在 [[electrodynamics]] 中处理。

::: summary
- 在微米及以上的尺度上，物质由光滑场描述；表面力是面力 $\mathbf t(\mathbf n)$，单位面积的力。
- 柯西的四面体论证给出 $t_i = \sigma_{ij}n_j$：应力张量 $\boldsymbol\sigma$ 把截面的法向映为该面上单位面积的力。
- 动量平衡给出 $\rho a_i = \partial_j\sigma_{ij} + f_i$；角动量平衡给出 $\sigma_{ij} = \sigma_{ji}$。
- 对称应力有三个互相垂直的主轴，其上面力纯属法向；法向应力在 $[\sigma_3, \sigma_1]$ 内变化，最大剪应力 $\frac12(\sigma_1 - \sigma_3)$ 在 $45^\circ$ 截面上。
- 平均压强为 $p = -\frac13\sigma_{kk}$；迹为零的剩余部分是偏应力。
- 位移梯度很小时应变为 $\varepsilon_{ij} = \frac12(\partial_i u_j + \partial_j u_i)$；对角元是相对伸缩，非对角元是直角减小量的一半，$\varepsilon_{kk}$ 是体积的相对改变。
- $\nabla\mathbf u$ 的反对称部分是刚性转动；工程剪应变 $\gamma_{xy}$ 是 $2\varepsilon_{xy}$。
:::

## 习题

::: exercise 截面上的法向应力 {level=1 check="22/9"}
对 [[#ex-traction]] 中的应力张量，求法向为 $\mathbf n = \frac13(2, -1, 2)$ 的截面上的法向应力（单位 MPa）。
::: solution
先按行算面力：

$$
\boldsymbol\sigma\mathbf n = \frac13\begin{pmatrix}20 - 4 + 0\\ 8 + 6 + 4\\ 0 - 2 + 6\end{pmatrix} = \frac13\begin{pmatrix}16\\18\\4\end{pmatrix}\mathrm{MPa}.
$$

于是

$$
\sigma_n = \mathbf n\cdot\boldsymbol\sigma\mathbf n = \frac19(2\times16 - 1\times18 + 2\times4) = \frac{22}{9} = 2.44\,\mathrm{MPa}.
$$

作为校核，把二次型 $\sigma_{ij}n_in_j$ 展开得 $\frac19\bigl(10\cdot4 - 6\cdot1 + 3\cdot4 + 2\cdot4\cdot(2)(-1) + 2\cdot2\cdot(-1)(2)\bigr) = \frac19(40 - 6 + 12 - 16 - 8) = \frac{22}{9}$，结果相同。
:::
:::

::: exercise 平均压强 {level=1 check="50"}
岩石内部某点的应力（单位 MPa）为 $\sigma_{xx} = -50$、$\sigma_{yy} = -80$、$\sigma_{zz} = -20$、$\sigma_{xy} = 10$，其余剪切分量为零。求平均压强（单位 MPa）与偏应力。
::: solution
由 [[#eq-pressure]]，$p = -\frac13(-50 - 80 - 20) = 50\,\mathrm{MPa}$。偏应力为 $s_{ij} = \sigma_{ij} + p\,\delta_{ij}$：$s_{xx} = 0$、$s_{yy} = -30$、$s_{zz} = 30$、$s_{xy} = 10\,\mathrm{MPa}$，其余为零。它的迹为零，理当如此。岩石承受着 $50\,\mathrm{MPa}$ 的围压，约相当于 $2\,\mathrm{km}$ 深处的数值；此外还有 $30\,\mathrm{MPa}$ 的偏应力部分，可能使它破裂或蠕变的正是这个部分。
:::
:::

::: exercise 对角纤维的伸长 {level=1 check="0.0025"}
对 [[#ex-strain]] 中的位移场，求沿对角方向 $\mathbf n = (1, 1, 0)/\sqrt2$ 的纤维的相对伸长。
::: solution
由 [[#thm-strain-meaning]] 的第 (1) 条，$\varepsilon_{nn} = n_i\varepsilon_{ij}n_j = \frac12(\varepsilon_{xx} + 2\varepsilon_{xy} + \varepsilon_{yy}) = \frac12(2 + 4 - 1)\kappa = 2.5\kappa = 2.50\times10^{-3}$。它介于主应变 $3\kappa$ 与 $-2\kappa$ 之间——任何 $\varepsilon_{nn}$ 都必须如此；它接近 $3\kappa$，因为对角线方向离第一主方向只有 $18.4^\circ$。
:::
:::

::: exercise 主应力 {level=2 check="55"}
平面应力下 $\sigma_{xx} = 50\,\mathrm{MPa}$、$\sigma_{yy} = 10\,\mathrm{MPa}$、$\sigma_{xy} = 15\,\mathrm{MPa}$。求最大主应力（单位 MPa）、它的方向与 $x$ 的夹角，以及材料内的最大剪应力，注意 $\sigma_{zz} = 0$。
::: solution
面内主应力是

$$
\frac{50 + 10}{2} \pm\sqrt{\left(\frac{50 - 10}{2}\right)^2 + 15^2} = 30 \pm\sqrt{400 + 225} = 30 \pm 25 ,
$$

即 $55\,\mathrm{MPa}$ 和 $5\,\mathrm{MPa}$。较大者的方向满足 $\tan 2\theta = 30/40 = 0.75$，$\theta = 18.4^\circ$。三个主应力为 $\sigma_1 = 55$、$\sigma_2 = 5$、$\sigma_3 = 0$。面内最大剪应力是 $\frac12(55 - 5) = 25\,\mathrm{MPa}$，但由 [[#thm-principal]]，全局最大剪应力是 $\frac12(\sigma_1 - \sigma_3) = 27.5\,\mathrm{MPa}$，在与板面成 $45^\circ$ 的斜截面上。
:::
:::

::: exercise 立方体的体积改变 {level=2 check="-0.1"}
边长 $10.0\,\mathrm{cm}$ 的钢立方体变形，$\varepsilon_{xx} = -2.0\times10^{-4}$、$\varepsilon_{yy} = \varepsilon_{zz} = 0.5\times10^{-4}$，剪应变 $\varepsilon_{xy} = 1.0\times10^{-4}$。求其体积改变 $\Delta V$，单位立方厘米（减小为负）。
::: solution
由 [[#thm-strain-meaning]] 的第 (3) 条，$\Delta V/V = \varepsilon_{kk} = (-2.0 + 0.5 + 0.5)\times10^{-4} = -1.0\times10^{-4}$。剪应变只改变角度、不改变体积，不进入公式。由 $V = 1000\,\mathrm{cm^3}$，

$$
\Delta V = -1.0\times10^{-4}\times1000\,\mathrm{cm^3} = -0.10\,\mathrm{cm^3}.
$$

立方体失去了十分之一立方厘米。钢中这样大小的应变对应几十兆帕的应力，[[continuum/elasticity]] 将会说明。
:::
:::

::: exercise 焊缝上的剪应力 {level=2 check="25*sqrt(3)"}
两块板由一条直焊缝连接，焊缝与 $y$ 轴成 $30^\circ$（所以其法向与 $x$ 成 $30^\circ$）。板沿 $x$ 被均匀拉伸，$\sigma_{xx} = 100\,\mathrm{MPa}$。求焊缝上剪应力的大小，单位 MPa。
::: solution
单轴应力下，[[#eq-rotation]] 在法向与 $x$ 成角 $\theta$ 的截面上给出 $\abs\tau = \sigma_{xx}\sin\theta\cos\theta = \frac12\sigma_{xx}\sin2\theta$。取 $\theta = 30^\circ$：

$$
\abs\tau = 50\sin 60^\circ = 25\sqrt3 = 43.3\,\mathrm{MPa}.
$$

法向应力是 $100\cos^2 30^\circ = 75\,\mathrm{MPa}$。焊缝的抗剪强度常常低于母材，所以斜对接接头要对两种应力都作校核。
:::
:::

::: exercise 各向同性应力 {level=3 #exr-isotropic}
设某点的每个截面上的面力都垂直于该截面：对每个单位 $\mathbf n$ 都存在数 $\lambda(\mathbf n)$ 使 $\mathbf t(\mathbf n) = \lambda(\mathbf n)\,\mathbf n$。证明 $\lambda$ 与 $\mathbf n$ 无关，从而 $\sigma_{ij} = -p\,\delta_{ij}$，$p$ 为某个数。
::: hint
这时每个单位向量都是 $\boldsymbol\sigma$ 的特征向量。把它用于 $\mathbf e_1$、$\mathbf e_2$ 和 $(\mathbf e_1 + \mathbf e_2)/\sqrt2$。
:::
::: solution
由 [[#thm-cauchy]]，对每个单位 $\mathbf n$ 有 $\boldsymbol\sigma\mathbf n = \lambda(\mathbf n)\mathbf n$。取 $\mathbf n = \mathbf e_1$ 和 $\mathbf e_2$：$\boldsymbol\sigma\mathbf e_1 = \lambda_1\mathbf e_1$、$\boldsymbol\sigma\mathbf e_2 = \lambda_2\mathbf e_2$。再取 $\mathbf m = (\mathbf e_1 + \mathbf e_2)/\sqrt2$。由线性

$$
\boldsymbol\sigma\mathbf m = \frac{\lambda_1\mathbf e_1 + \lambda_2\mathbf e_2}{\sqrt2},
$$

按假设它等于 $\lambda(\mathbf m)(\mathbf e_1 + \mathbf e_2)/\sqrt2$。比较分量得 $\lambda_1 = \lambda(\mathbf m) = \lambda_2$。同样的论证给出 $\lambda_2 = \lambda_3$。于是 $\boldsymbol\sigma$ 在标准正交基上只有单一特征值 $\lambda$，故 $\boldsymbol\sigma = \lambda I$，且对每个 $\mathbf n$ 都有 $\lambda(\mathbf n) = \lambda$。写 $\lambda = -p$ 即得 $\sigma_{ij} = -p\,\delta_{ij}$。这就是帕斯卡定律：不能承受剪应力的静止流体中，一点的压强在过它的每个截面上都相同。注意证明只用到了柯西定理所提供的线性。
:::
:::

::: exercise 有限转动的微小应变 {level=3}
一个物体绕 $z$ 刚性转过角 $\theta$，于是 $u_x = (\cos\theta - 1)x - \sin\theta\,y$、$u_y = \sin\theta\,x + (\cos\theta - 1)y$。计算微小应变 $\varepsilon_{ij}$ 与格林-拉格朗日应变 $E_{ij}$。证明 $E_{ij} = 0$ 严格成立，而 $\varepsilon_{xx}$ 为 $\theta^2$ 量级，并对 $\theta = 0.0100\,\mathrm{rad}$ 与 $\theta = 0.500\,\mathrm{rad}$ 计算 $\varepsilon_{xx}$。这对 [[#def-strain]] 的适用范围说明什么？
::: solution
位移梯度为

$$
\nabla\mathbf u = \begin{pmatrix}\cos\theta - 1 & -\sin\theta \\ \sin\theta & \cos\theta - 1\end{pmatrix}.
$$

它的对称部分是 $\varepsilon_{xx} = \varepsilon_{yy} = \cos\theta - 1$、$\varepsilon_{xy} = 0$。[[#eq-green]] 的二次项是 $\frac12(\nabla\mathbf u)\T(\nabla\mathbf u)$，其 $xx$ 元为 $\frac12\bigl[(\cos\theta - 1)^2 + \sin^2\theta\bigr] = \frac12(2 - 2\cos\theta) = 1 - \cos\theta$；其 $xy$ 元为 $\frac12\bigl[-(\cos\theta - 1)\sin\theta + \sin\theta(\cos\theta - 1)\bigr] = 0$。$yy$ 元同样是 $1 - \cos\theta$。相加得 $E_{xx} = E_{yy} = (\cos\theta - 1) + (1 - \cos\theta) = 0$、$E_{xy} = 0$——刚性运动理应如此。

微小应变 $\cos\theta - 1 \approx -\theta^2/2$ 是一个虚假的收缩。$\theta = 0.0100$ 时为 $-5.0\times10^{-5}$；$\theta = 0.500$ 时为 $-0.122$。所以微小理论要求*转动*与应变同样很小：若单元还转过 $0.1\,\mathrm{rad}$，$10^{-3}$ 的应变就没有意义了，因为那个转动会造出 $5\times10^{-3}$ 的假应变。细长梁或鱼竿各部分大幅转动而应变很小，这正是它们需要几何非线性理论的原因。
:::
:::

::: exercise 法向应力的极值 {level=3}
用拉格朗日乘数证明：$\sigma_n(\mathbf n) = \sigma_{ij}n_in_j$ 在单位球面 $n_in_i = 1$ 上的驻值恰在 $\mathbf n$ 为 $\boldsymbol\sigma$ 的特征向量时取得，且驻值就是对应的主应力。论证中哪里用到了 $\boldsymbol\sigma$ 的对称性？
::: solution
$\sigma_{ij}n_in_j$ 在约束 $n_in_i = 1$ 下的驻点，就是 $F = \sigma_{ij}n_in_j - \lambda(n_in_i - 1)$ 的驻点。对 $n_k$ 求导：

$$
\pdv{F}{n_k} = \sigma_{kj}n_j + \sigma_{ik}n_i - 2\lambda n_k = (\sigma_{kj} + \sigma_{jk})n_j - 2\lambda n_k .
$$

由 [[#thm-symmetric]]，$\sigma_{jk} = \sigma_{kj}$，所以条件是 $\sigma_{kj}n_j = \lambda n_k$：$\mathbf n$ 是属于特征值 $\lambda$ 的特征向量。反过来，每个单位特征向量都满足该条件。在这样的点，$\sigma_n = n_k\sigma_{kj}n_j = \lambda n_kn_k = \lambda$。对称性是在合并导数的两项时用掉的。对非对称矩阵，二次型的驻止方向是其对称部分的特征向量而不是矩阵本身的——这又是一条应力必须对称的理由。
:::
:::
