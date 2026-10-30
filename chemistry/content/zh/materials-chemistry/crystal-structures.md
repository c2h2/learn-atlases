钛酸锶$\mathrm{SrTiO_3}$是一种无色、看起来相当平淡无奇的氧化物。然而同样的原子排列，把锶换成钡，就是几十亿只陶瓷电容里的铁电体；换成镧、锰和少量钙，就是一种在磁场中电阻骤然坍塌的材料；换成铜和钇并作层状变体，就是氮气沸点以上的超导体；换成铅、碘离子与甲铵，就是太阳能电池的吸收层。它们全都是**钙钛矿**。学会辨认这样为数不多的几种结构类型、准确地描述它们、并预言哪些元素会采取它们，是材料化学的第一项技能，因为后面各章里几乎每一种性质（衍射图样、缺陷化学、能带结构、磁性、离子输运）都是一种特定原子排列的性质。

[[bonding-structure/solid-structures]]一章引入了晶胞、最密堆积、半径比与密度计算。在这里，我们对晶体的描述做到精确而普遍。我们会对全部七个晶系定义晶格、晶胞与分数坐标，证明为什么晶体中只可能存在某些旋转对称性，引入密勒指数并导出晶面间距——[[materials-chemistry/diffraction]]中X射线衍射所测定的正是这个间距。然后我们从最密堆积阵列及其空隙出发搭建重要的结构类型，最后用三种半定量工具收尾，用来判断一个被提出的结构在化学上是否合理：鲍林规则、钙钛矿的戈尔德施密特容差因子与键价和。

## 晶格、晶胞与坐标

晶体是一个在三维中按平移重复的图样。重复点的抽象集合是晶格；坐落在每个点上的东西是基元（母题）。这一区分之所以要紧，是因为许多不同的晶体共用同一种晶格：金属铜与氯化钠都具有面心立方晶格，前者的基元是一个Cu原子，后者是一个$\mathrm{Na^+}$加一个$\mathrm{Cl^-}$。

::: definition 晶格、晶胞与分数坐标 {#def-lattice}
**晶格**是由三个不共面的**点阵矢量**$\mathbf{a}, \mathbf{b}, \mathbf{c}$生成的无限点集$\mathbf{R} = n_1\mathbf{a} + n_2\mathbf{b} + n_3\mathbf{c}$（$n_i$为整数）。它们张成的平行六面体是一个**晶胞**，由六个**晶格参数**描述：棱长$a, b, c$以及夹角$\alpha$（$\mathbf{b}$与$\mathbf{c}$之间）、$\beta$（$\mathbf{a}$与$\mathbf{c}$之间）和$\gamma$（$\mathbf{a}$与$\mathbf{b}$之间）。它的体积是
$$
V = abc\sqrt{1 - \cos^2\alpha - \cos^2\beta - \cos^2\gamma + 2\cos\alpha\cos\beta\cos\gamma}.
$$ {#eq-volume}
只含一个点阵点的晶胞是**初基**的（P）；为显示对称性而选出的惯用晶胞可以带心：体心（I）、面心（F）或单面心（A，B，C）。位于$\mathbf{r} = x\mathbf{a} + y\mathbf{b} + z\mathbf{c}$的原子有**分数坐标**$(x, y, z)$，在晶胞内每个坐标介于0与1之间。每个晶胞所含的化学式单位数写作$Z$。
:::

[[#eq-volume]]在直角坐标轴下化为$V = abc$；对单斜晶胞（$\alpha = \gamma = 90^\circ$）为$V = abc\sin\beta$；对六方晶胞（$a = b$，$\gamma = 120^\circ$）为$V = \tfrac{\sqrt3}{2}a^2c$。它是**度规张量**——点积$\mathbf{a}\cdot\mathbf{a}, \mathbf{a}\cdot\mathbf{b}, \dots$排成的矩阵——之行列式的平方根，晶体学软件正是由分数坐标经它算出一切距离与角度：两个原子间的距离是$\lvert\Delta\mathbf{r}\rvert$，其中$\Delta\mathbf{r} = \Delta x\,\mathbf{a} + \Delta y\,\mathbf{b} + \Delta z\,\mathbf{c}$且$\lvert\Delta\mathbf{r}\rvert^2 = \Delta x^2a^2 + \Delta y^2b^2 + \Delta z^2c^2 + 2\Delta x\Delta y\,ab\cos\gamma + 2\Delta x\Delta z\,ac\cos\beta + 2\Delta y\Delta z\,bc\cos\alpha$。

七个**晶系**由晶格的最小对称性定义，而不是由晶格参数本身定义（一个单斜晶体可能碰巧使$\beta$落在$90^\circ$的测量误差之内）。所要求的对称性强迫参数之间满足某些关系：立方（$a = b = c$，诸角$90^\circ$；四条三重轴）、四方（$a = b \ne c$；一条四重轴）、正交（三条二重轴）、六方（一条六重轴）、三方（一条三重轴）、单斜（一条二重轴）与三斜（无）。把晶系与带心类型组合起来就得到**十四种布拉维点阵**；把点对称与平移结合起来——包括螺旋轴与滑移面——就得到**230种空间群**，每种晶体都由其中之一描述。整套机器属于晶体学课程，但关于哪些对称性究竟可能存在的一个结果值得在这里证明。

::: proposition 晶体学限制 {#prop-restriction}
晶格只有在$n = 1, 2, 3, 4$或$6$时才可能在转角$\theta = 2\pi/n$的旋转下保持不变。在周期晶体中，五重、七重及更高次旋转轴都是不可能的。
:::

::: proof
设旋转$\mathsf{R}$把晶格映射到自身。那么它把每个点阵矢量$\mathbf{a}, \mathbf{b}, \mathbf{c}$映为一个点阵矢量，即$\mathbf{a}, \mathbf{b}, \mathbf{c}$的整数线性组合。在点阵基下写出，$\mathsf{R}$的矩阵因而有整数元素，其迹是整数。矩阵的迹不依赖于基的选取；在旋转轴取作$z$方向的笛卡尔基下，旋转矩阵是
$$
\begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix},
$$
其迹为$1 + 2\cos\theta$。所以$2\cos\theta$必须是整数，而由于$-2 \le 2\cos\theta \le 2$，仅有的可能是$2\cos\theta = -2, -1, 0, 1, 2$，即$\theta = 180^\circ, 120^\circ, 90^\circ, 60^\circ, 0^\circ$：$n = 2, 3, 4, 6, 1$。五重轴会要求$2\cos72^\circ = 0.618$，这不是整数。
:::

这一限制解释了为什么晶体学点群只有32个，而分子的对称群有无穷多个（[[quantum-chemistry/molecular-symmetry]]）：二茂铁分子可以有五重轴，二茂铁的晶体却不行。它还解释了1984年丹·谢赫特曼（Dan Shechtman）的急冷Al–Mn合金电子衍射图样引起的震惊——那些尖锐的斑点呈现出十重对称。这类**准晶体**是有序的但不周期，所以这个证明（它假定了晶格）对它们并不适用；国际晶体学联合会1992年把晶体重新定义为任何具有本质上分立的衍射图样的固体。

::: widget transform2d
matrix: 1,-1; 1,0
eigen: false
vector: 1, 0
range: 3
caption: 以二维六角点阵的基$\mathbf{a}_1 = (1, 0)$与$\mathbf{a}_2 = (-\tfrac12, \tfrac{\sqrt3}{2})$写出的$60^\circ$旋转的矩阵。旋转把$\mathbf{a}_1 \to \mathbf{a}_1 + \mathbf{a}_2$、$\mathbf{a}_2 \to -\mathbf{a}_1$，所以它的两列是$(1, 1)$与$(-1, 0)$：都是整数，正如[[#prop-restriction]]所要求的；迹为$1 = 2\cos60^\circ$，行列式为1。这里平面按点阵坐标绘制，所以旋转看起来像一次切变。可以改动矩阵的元素：任何行列式为1且迹为$0$、$\pm1$或$\pm2$的整数矩阵都是有限阶的点阵对称；任何整数元素都给不出迹$2\cos72^\circ = 0.618$。
:::

## 密勒指数与晶面间距

点阵点可以按无穷多种方式归入一族族平行、等间距的晶面。这样的晶面支配着晶体的外表（岩盐立方体的面、明矾晶体的八面体面）、金属形变所沿的滑移面、解理，尤其是衍射——衍射把每一族晶面当作一面镜子。

::: definition 密勒指数 {#def-miller}
取一族晶面中最靠近原点而又不经过原点的那个面，设它在各轴上的截距为$a/h$、$b/k$与$c/l$。没有公因子的整数$(hkl)$就是这一族晶面的**密勒指数**。实际操作是：求出截距（以$a, b, c$的倍数计）；取倒数；去分母。与某轴平行的晶面截距为$\infty$，对应指标为0；负截距在数字上加一横表示，如$(\bar1 10)$。记号$\{hkl\}$表示按对称等价的全体晶面族（在立方晶体中$\{100\}$就是六个立方面），$[uvw]$表示点阵方向$u\mathbf{a} + v\mathbf{b} + w\mathbf{c}$，$\langle uvw\rangle$表示等价方向的全体。
:::

对衍射而言，允许指标带有公因子是方便的：$(200)$指面间距为$(100)$之半的那一族晶面，它包含$(100)$晶面以及每相邻两面正中间的一个面。粉末谱图中标为200的反射是来自(100)面的二级反射，而[[materials-chemistry/diffraction]]的语言把它当作来自(200)面的一级反射。

::: proposition 晶面间距 {#prop-dspacing}
对直角坐标轴的晶胞（立方、四方、正交），$(hkl)$面的间距$d_{hkl}$由下式给出
$$
\frac{1}{d_{hkl}^2} = \frac{h^2}{a^2} + \frac{k^2}{b^2} + \frac{l^2}{c^2},
$$ {#eq-dspacing}
对立方晶胞它化为$d_{hkl} = a/\sqrt{h^2 + k^2 + l^2}$。对六方晶胞，
$$
\frac{1}{d_{hkl}^2} = \frac{4}{3}\,\frac{h^2 + hk + k^2}{a^2} + \frac{l^2}{c^2}.
$$ {#eq-dhex}
:::

::: proof
取沿正交轴的笛卡尔坐标。晶面族中最靠近原点的面经过$(a/h, 0, 0)$、$(0, b/k, 0)$与$(0, 0, c/l)$，所以它的方程是
$$
\frac{h}{a}X + \frac{k}{b}Y + \frac{l}{c}Z = 1.
$$
法向矢量$\mathbf{n} = (h/a, k/b, l/c)$的平面$\mathbf{n}\cdot\mathbf{X} = 1$到原点的垂直距离为$1/\lvert\mathbf{n}\rvert$。原点本身位于这一族晶面的下一个面上（右端为0的方程），所以这个距离就是面间距：$d_{hkl} = 1/\lvert\mathbf{n}\rvert$，平方即得[[#eq-dspacing]]。对六方晶胞，取$\mathbf{a} = a(1, 0, 0)$、$\mathbf{b} = a(-\tfrac12, \tfrac{\sqrt3}{2}, 0)$、$\mathbf{c} = c(0, 0, 1)$。过$\mathbf{a}/h$、$\mathbf{b}/k$、$\mathbf{c}/l$之面的法向矢量$\mathbf{n}$满足$\mathbf{n}\cdot\mathbf{a} = h$、$\mathbf{n}\cdot\mathbf{b} = k$、$\mathbf{n}\cdot\mathbf{c} = l$（如此每个截距都满足$\mathbf{n}\cdot\mathbf{X} = 1$）。解得$n_x = h/a$、$n_y = (2k + h)/(\sqrt3\,a)$、$n_z = l/c$，且$\lvert\mathbf{n}\rvert^2 = [h^2 + (2k + h)^2/3]/a^2 + l^2/c^2 = \tfrac43(h^2 + hk + k^2)/a^2 + l^2/c^2$。
:::

证明中的矢量$\mathbf{n}$垂直于晶面而长度为$1/d_{hkl}$，它就是一个**倒格矢**$\mathbf{G}_{hkl} = h\mathbf{a}^* + k\mathbf{b}^* + l\mathbf{c}^*$，其中倒格子基由$\mathbf{a}^*\cdot\mathbf{a} = 1$、$\mathbf{a}^*\cdot\mathbf{b} = 0$等定义。每一族晶面对应倒格子上的一点；正是这一对应，在下一章中把衍射几何变成了矢量代数。

::: example 金红石中的密勒指数与面间距 {#ex-rutile-d}
金红石$\mathrm{TiO_2}$是四方晶系，$a = 4.594\ \text{Å}$，$c = 2.959\ \text{Å}$。(a) 一个晶面在各轴上的截距为$a$、$b$与$\infty$；另一个晶面的截距为$a$、$\infty$与$c$。写出它们的密勒指数。(b) 计算$d_{110}$、$d_{101}$与$d_{211}$。
::: solution
(a) 截距$1, 1, \infty$；倒数$1, 1, 0$：该面为$(110)$。截距$1, \infty, 1$：$(101)$。

(b) 由[[#eq-dspacing]]并取$a = b$，
$$
\frac{1}{d_{110}^2} = \frac{2}{4.594^2} = 0.09477\ \text{Å}^{-2}, \qquad d_{110} = 3.248\ \text{Å};
$$
$$
\frac{1}{d_{101}^2} = \frac{1}{4.594^2} + \frac{1}{2.959^2} = 0.04738 + 0.11421 = 0.16159\ \text{Å}^{-2}, \qquad d_{101} = 2.488\ \text{Å};
$$
$$
\frac{1}{d_{211}^2} = \frac{5}{4.594^2} + \frac{1}{2.959^2} = 0.23691 + 0.11421 = 0.35112\ \text{Å}^{-2}, \qquad d_{211} = 1.688\ \text{Å}.
$$
这就是金红石粉末谱中最强的三条线，位于$3.25$、$2.49$与$1.69\ \text{Å}$——白色颜料厂商正是靠它来检验一批产品是金红石而不是锐钛矿。晶格参数已知到四位数字，所以给出四位数字的面间距是合理的。
:::
:::

::: warning 密勒指数不是坐标，而且(200)不是(100) {#warn-miller}
三类错误反复出现。(1) 用截距而不取其倒数：截距为$1, 2, \infty$的晶面是$(210)$，不是$(120)$。(2) 把$(hkl)$当作方向：在立方晶体中$[hkl]$垂直于$(hkl)$，但在其他晶系中一般并不如此，因为轴不正交或不等长。(3) 对衍射指标约分：体心立方金属没有100反射，却有很强的200；除以2去"化简"，恰恰抹掉了消光所揭示的那条信息（带心方式）。
:::

## 由最密堆积阵列出发的结构类型

大多数简单的无机固体都可以想象成较大离子（通常是阴离子）的最密堆积阵列，较小的离子位于其中一部分空隙里。刚性球按ABAB…分层堆叠得到六方最密堆积（hcp），按ABCABC…堆叠得到立方最密堆积（ccp），它就是每个点阵点一个球的fcc点阵。[[bonding-structure/solid-structures]]中已经说明：$N$个最密堆积球的阵列恰含$N$个八面体空隙与$2N$个四面体空隙。在ccp晶胞（$4$个球）中，八面体空隙位于体心$(\tfrac12, \tfrac12, \tfrac12)$与各棱的中点；八个四面体空隙位于$(\tfrac14, \tfrac14, \tfrac14)$及其等价位置，即晶胞所能分成的八个小平行六面体的中心。哪些空隙被占据、按什么图样占据，定义了结构类型。

| 结构类型 | 阴离子阵列 | 被占据的空隙 | 配位（阳离子:阴离子） | 实例 |
|---|---|---|---|---|
| 岩盐（NaCl） | ccp | 全部八面体 | 6:6 | MgO、NiO、FeO、TiC、LiF、AgCl |
| 闪锌矿（ZnS） | ccp | 半数四面体 | 4:4 | GaAs、CdTe、CuCl；若所有原子相同则为Si与金刚石 |
| 反萤石（$\mathrm{Li_2O}$） | ccp | 全部四面体 | 4:8 | $\mathrm{Na_2O}$、$\mathrm{K_2S}$ |
| 萤石（$\mathrm{CaF_2}$） | 阳离子ccp | 阴离子占全部四面体 | 8:4 | $\mathrm{UO_2}$、$\mathrm{CeO_2}$、$\mathrm{ZrO_2}$（立方相） |
| NiAs | hcp | 全部八面体 | 6:6 | FeS、CoS、NiS |
| 纤锌矿（ZnS） | hcp | 半数四面体 | 4:4 | ZnO、GaN、AlN、CdS |
| $\mathrm{CdCl_2}$ / $\mathrm{CdI_2}$ | ccp / hcp | 隔层的八面体 | 6:3 | $\mathrm{MgCl_2}$、$\mathrm{TiS_2}$、$\mathrm{Mg(OH)_2}$ |
| 刚玉（$\mathrm{Al_2O_3}$） | hcp | 三分之二八面体 | 6:4 | $\mathrm{Cr_2O_3}$、$\mathrm{Fe_2O_3}$ |
| 金红石（$\mathrm{TiO_2}$） | 畸变的hcp | 半数八面体，成链 | 6:3 | $\mathrm{SnO_2}$、$\mathrm{MnO_2}$、$\mathrm{MgF_2}$ |
| 尖晶石（$\mathrm{AB_2O_4}$） | ccp | ⅛四面体（A），½八面体（B） | A 4，B 6 | $\mathrm{MgAl_2O_4}$、$\mathrm{Fe_3O_4}$、$\mathrm{LiMn_2O_4}$ |
| 氯化铯 | 简单立方，非最密堆积 | 立方体心 | 8:8 | CsBr、CsI、NH₄Cl、β-黄铜CuZn |

层状的$\mathrm{CdI_2}$型值得特别一提，因为它将在[[materials-chemistry/energy-materials]]与[[materials-chemistry/nanomaterials]]中再次出现：把*每隔一层*的阴离子层对之间的每个八面体空隙都填满，就留下空着的范德华隙，锂离子可以插入其中（$\mathrm{TiS_2}$，第一代可充电锂电池的正极材料），沿这些间隙还可以把固体剥离成单层（$\mathrm{MoS_2}$，它的同族结构中金属呈三方棱柱配位）。用氧层、并使Li层与Co层交替排列的同一想法给出$\mathrm{LiCoO_2}$：它是阳离子在间隔的(111)面上有序化的岩盐结构。

::: example 数化学式单位并用密度检验结构 {#ex-spinel-density}
尖晶石$\mathrm{MgAl_2O_4}$具有立方晶胞，$a = 8.083\ \text{Å}$，实测密度$3.58\ \mathrm{g\,cm^{-3}}$。(a) 氧离子构成ccp阵列，晶胞棱长是简单ccp晶胞的两倍。这个晶胞含多少个氧离子、多少个四面体空隙和八面体空隙？多少个化学式单位？(b) 核对密度。
::: solution
(a) 把fcc晶胞的棱加长一倍，其体积变为8倍，所以晶胞容纳$8 \times 4 = 32$个氧离子，从而有$32$个八面体空隙与$64$个四面体空隙。化学式含四个氧，所以$Z = 32/4 = 8$：八个$\mathrm{Mg^{2+}}$占据$64$个四面体空隙中的$8$个（八分之一），十六个$\mathrm{Al^{3+}}$占据$32$个八面体空隙中的$16$个（一半）。

(b) $M = 24.305 + 2(26.982) + 4(15.999) = 142.27\ \mathrm{g\,mol^{-1}}$，$V = (8.083\times10^{-8}\ \mathrm{cm})^3 = 5.281\times10^{-22}\ \mathrm{cm^3}$，所以
$$
\rho = \frac{ZM}{N_\mathrm{A}V} = \frac{8 \times 142.27}{6.022\times10^{23} \times 5.281\times10^{-22}} = 3.58\ \mathrm{g\,cm^{-3}},
$$
与实验一致。这样的密度核对是对假定的$Z$最快捷的检验：若当初猜成$Z = 4$，算出的密度就会是实测值的一半。
:::
:::

### 正尖晶石与反尖晶石

在**正**尖晶石$\mathrm{A^{II}[B^{III}_2]O_4}$中，二价离子占据四面体位置（方括号标出八面体位置）。在**反**尖晶石$\mathrm{B[AB]O_4}$中，四面体位置容纳一半的三价离子，二价离子则移到八面体位置；介于两者之间的分布很常见，用**反序度**$x$描述，即被B占据的四面体位置的分数。$\mathrm{MgAl_2O_4}$几乎是正尖晶石；磁铁矿$\mathrm{Fe_3O_4} = \mathrm{Fe^{3+}[Fe^{2+}Fe^{3+}]O_4}$与$\mathrm{NiFe_2O_4}$是反尖晶石。单靠静电作用与离子尺寸只轻微偏向正的排布。对过渡金属离子而言，决定性的因素往往是配体场稳定化（[[coordination-chemistry/crystal-field-theory]]）。

::: proposition 八面体占位优先能 {#prop-ospe}
对高自旋的过渡金属离子，**八面体占位优先能**是它在八面体位置与四面体位置的配体场稳定化能之差，
$$
\mathrm{OSPE} = \lvert\mathrm{CFSE_{oct}}\rvert - \lvert\mathrm{CFSE_{tet}}\rvert,
$$
对同一离子、同一配体、相同距离按$\Delta_\mathrm{t} \approx \tfrac49\Delta_\mathrm{o}$估算。在尖晶石中，OSPE较大的离子倾向于占据八面体位置。这条规则是经验的：它忽略了马德隆能、离子尺寸与共价性的差异，而当OSPE之差很小时，这些被忽略的因素可能起主导作用。
:::

::: proof
在八面体位置中，每个$t_{2g}$电子被稳定化$0.4\Delta_\mathrm{o}$，每个$e_g$电子被去稳定化$0.6\Delta_\mathrm{o}$；在四面体位置中，每个$e$电子被稳定化$0.6\Delta_\mathrm{t}$，每个$t_2$电子去稳定化$0.4\Delta_\mathrm{t}$。这些权重来自重心规则：能级分裂保持五个$d$轨道的平均能量不变。对高自旋$d^8$，八面体$t_{2g}^6e_g^2$给出$6(-0.4) + 2(0.6) = -1.2\Delta_\mathrm{o}$；四面体$e^4t_2^4$给出$4(-0.6) + 4(0.4) = -0.8\Delta_\mathrm{t} = -0.36\Delta_\mathrm{o}$；所以OSPE $= 0.84\Delta_\mathrm{o}$。对高自旋$d^5$，两种稳定化都为零，OSPE $= 0$。对每个$d^n$做同样的计算，得到OSPE（以$\Delta_\mathrm{o}$为单位）：$d^0$、$d^5$与$d^{10}$为0，最大值$0.84\Delta_\mathrm{o}$出现在$d^3$与$d^8$。由于每个离子对晶格能的贡献恰含一份它的优先能，在其他条件相同时，把OSPE较大的离子放到八面体位置的排布能量更低。
:::

利用氧化物配合物光谱得到的$\Delta_\mathrm{o}$值，杰克·邓尼茨（Jack Dunitz）与莱斯利·奥尔切尔（Leslie Orgel）（以及独立地，唐纳德·麦克卢尔（Donald McClure））在1957年估算出OSPE约为：$\mathrm{Cr^{3+}}$ $158\ \mathrm{kJ\,mol^{-1}}$，$\mathrm{Ni^{2+}}$ $86$，$\mathrm{Mn^{3+}}$ $95$，$\mathrm{Co^{2+}}$ $31$，$\mathrm{Fe^{2+}}$ $17$，而$\mathrm{Mn^{2+}}$、$\mathrm{Fe^{3+}}$与$\mathrm{Zn^{2+}}$为零。所有铬(III)尖晶石都是正的；$\mathrm{NiFe_2O_4}$与$\mathrm{NiAl_2O_4}$在很大程度上是反的，因为镍(II)从八面体位置得到的稳定化超过铁(III)或铝(III)所失去的。

::: example 正的还是反的？ {#ex-spinel-inversion}
预言(a) $\mathrm{Fe_3O_4}$、(b) $\mathrm{Mn_3O_4}$与(c) $\mathrm{ZnFe_2O_4}$是正尖晶石还是反尖晶石。
::: solution
(a) 磁铁矿含$\mathrm{Fe^{2+}}$（$d^6$，高自旋）与$\mathrm{Fe^{3+}}$（$d^5$）。八面体$t_{2g}^4e_g^2$：$4(-0.4) + 2(0.6) = -0.4\Delta_\mathrm{o}$；四面体$e^3t_2^3$：$3(-0.6) + 3(0.4) = -0.6\Delta_\mathrm{t} = -0.27\Delta_\mathrm{o}$；OSPE $= 0.13\Delta_\mathrm{o}$，虽小却为正。$\mathrm{Fe^{3+}}$的OSPE为零。于是$\mathrm{Fe^{2+}}$走八面体位置：**反的**，$\mathrm{Fe^{3+}[Fe^{2+}Fe^{3+}]O_4}$，与观测一致。八面体位置的混合价态正是磁铁矿导电的原因——电子在$\mathrm{Fe^{2+}}$与$\mathrm{Fe^{3+}}$之间跳跃。

(b) $\mathrm{Mn_3O_4}$含$\mathrm{Mn^{2+}}$（$d^5$，OSPE 0）与$\mathrm{Mn^{3+}}$（$d^4$：八面体$t_{2g}^3e_g^1 = -0.6\Delta_\mathrm{o}$，四面体$e^2t_2^2 = -0.4\Delta_\mathrm{t} = -0.18\Delta_\mathrm{o}$，OSPE $0.42\Delta_\mathrm{o}$）。$\mathrm{Mn^{3+}}$留在八面体位置：**正的**，$\mathrm{Mn^{2+}[Mn^{3+}_2]O_4}$。它实际上发生四方畸变（矿物为hausmannite），这是$e_g^1$离子的协同姜-泰勒效应。

(c) $\mathrm{Zn^{2+}}$（$d^{10}$）与$\mathrm{Fe^{3+}}$（$d^5$）的OSPE都为零，配体场论证无所适从。由于共价性方面的原因，$\mathrm{Zn^{2+}}$强烈偏好四面体配位（ZnO与ZnS即如此），所以这个尖晶石是**正的**，观测证实如此。这一情形正显示了[[#prop-ospe]]的局限。
:::
:::

## 钙钛矿与容差因子

理想的**钙钛矿**$\mathrm{ABX_3}$是立方的：B在晶胞顶角$(0, 0, 0)$，X在棱中点$(\tfrac12, 0, 0)$及其等价位置，A在体心$(\tfrac12, \tfrac12, \tfrac12)$，$Z = 1$。等价地说，它是一个由共顶点$\mathrm{BX_6}$八面体构成的三维网络，每个立方八面体腔里有一个大的A阳离子，与十二个X配位；或者说，它是组成为$\mathrm{AX_3}$的ccp阵列，B占据只被X包围的那四分之一八面体空隙。A与X一起搭起密置层，所以A必须与X大小相仿。

::: proposition 戈尔德施密特容差因子 {#prop-tolerance}
把离子视为半径为$r_\mathrm{A}$、$r_\mathrm{B}$与$r_\mathrm{X}$的硬球，理想的立方钙钛矿要求$t = 1$，其中
$$
t = \frac{r_\mathrm{A} + r_\mathrm{X}}{\sqrt2\,(r_\mathrm{B} + r_\mathrm{X})}.
$$ {#eq-tolerance}
经验上，大约$0.8 < t < 1.06$范围内钙钛矿能够形成（氧化物，用香农半径）：$t$接近1时结构是立方的或接近立方；$t < 1$时八面体倾转、对称性下降（正交的$\mathrm{CaTiO_3}$、$\mathrm{GdFeO_3}$）；$t > 1$时B离子在对其过于庞大的笼中"晃荡"，结构可能变成极性的或采取六方堆垛。这些界限只是经验指南，不是定律。
:::

::: proof
在棱长为$a$、B位于顶角的立方晶胞中，B–X距离沿晶胞棱从顶角延伸到棱中点$(\tfrac12, 0, 0)$：它是$a/2$。位于$(\tfrac12, \tfrac12, \tfrac12)$的A离子到同一个X离子的距离为$\sqrt{0 + \tfrac14 + \tfrac14}\,a = a/\sqrt2$（面对角线的一半），而在这个距离上的棱中点共有十二个，这就是A的十二配位。对彼此接触的硬球，$r_\mathrm{B} + r_\mathrm{X} = a/2$且$r_\mathrm{A} + r_\mathrm{X} = a/\sqrt2$。消去$a$，得$r_\mathrm{A} + r_\mathrm{X} = \sqrt2\,(r_\mathrm{B} + r_\mathrm{X})$，即$t = 1$。若$t < 1$，则当B–X键处于理想长度时A离子对它的空腔来说太小；八面体绕其共用顶点转动可以在不改变B–X的情况下缩短某些A–X距离，这就是观测到的倾转。若$t > 1$则相反：A–X接触决定晶胞的大小，而B–X键被拉长。
:::

若改选A为原点，则X落在面心、B落在体心；这是同一结构的另一种常用设定，能在两幅图像之间自如切换是值得的。

::: example 三种钛酸盐的容差因子 {#ex-tolerance}
利用香农的离子半径（$\mathrm{O^{2-}}$ $1.40\ \text{Å}$；六配位$\mathrm{Ti^{4+}}$ $0.605\ \text{Å}$；十二配位$\mathrm{Ca^{2+}}$ $1.34$、$\mathrm{Sr^{2+}}$ $1.44$、$\mathrm{Ba^{2+}}$ $1.61\ \text{Å}$），计算$\mathrm{CaTiO_3}$、$\mathrm{SrTiO_3}$与$\mathrm{BaTiO_3}$的$t$，并把它与它们室温下的结构联系起来。然后用$a = 3.905\ \text{Å}$求$\mathrm{SrTiO_3}$的密度。
::: solution
分母是公共的：$\sqrt2(0.605 + 1.40) = 1.4142 \times 2.005 = 2.8355\ \text{Å}$。于是
$$
t(\mathrm{Ca}) = \frac{2.74}{2.8355} = 0.966, \qquad t(\mathrm{Sr}) = \frac{2.84}{2.8355} = 1.002, \qquad t(\mathrm{Ba}) = \frac{3.01}{2.8355} = 1.062.
$$
$\mathrm{SrTiO_3}$（$t \approx 1.00$）是教科书式的立方钙钛矿。$\mathrm{CaTiO_3}$（$t < 1$）是八面体倾转的正交结构，即钙钛矿这种矿物本身。$\mathrm{BaTiO_3}$（$t > 1$）的晶胞很大，$\mathrm{Ti^{4+}}$在其中很宽松；在$120\,^\circ\mathrm{C}$以下它偏离所在八面体的中心，给出四方、极性、铁电的结构（[[materials-chemistry/magnetic-optical]]）。

$\mathrm{SrTiO_3}$的密度：$M = 87.62 + 47.867 + 3(15.999) = 183.48\ \mathrm{g\,mol^{-1}}$，$Z = 1$，$V = (3.905\times10^{-8})^3 = 5.955\times10^{-23}\ \mathrm{cm^3}$，$\rho = 183.48/(6.022\times10^{23} \times 5.955\times10^{-23}) = 5.12\ \mathrm{g\,cm^{-3}}$（实测$5.12$）。半径只给到两三位小数，$t$的界限本身又模糊，所以$t$报出三位数字已是极限。
:::
:::

::: widget plot
f: (x + r)/(sqrt(2)*(b + r))
x: 0.8, 2.0
y: 0.6, 1.3
sliders: b=0.605:0.4:1.1:0.005; r=1.40:1.2:2.3:0.01
hlines: 1; 0.8; 1.06
labels: t
caption: [[#eq-tolerance]]的容差因子$t$随A位半径$x$（以Å计）的变化曲线，其中B位半径$b$与阴离子半径$r$由滑条设定（默认值对应$\mathrm{Ti^{4+}}$与$\mathrm{O^{2-}}$）。水平线标出$t = 1$与氧化物钙钛矿的经验窗口$0.8$–$1.06$。对$\mathrm{CsPbI_3}$这类卤化物钙钛矿，取$b = 1.19$（$\mathrm{Pb^{2+}}$）与$r = 2.20$（$\mathrm{I^-}$）：$\mathrm{Cs^+}$（约$1.88\ \text{Å}$）给出$t \approx 0.85$，靠近下缘——这就是黑色立方$\mathrm{CsPbI_3}$在室温下容易转变为黄色非钙钛矿相、而太阳能电池采用更大的甲铵与甲脒阳离子的原因（[[materials-chemistry/energy-materials]]）。
:::

::: quiz
关于理想的立方钙钛矿$\mathrm{ABX_3}$，下列说法哪些是正确的？
- [x] B阳离子是六配位，A阳离子是十二配位。
- [ ] $\mathrm{BX_6}$八面体共用棱。
- [x] 晶胞中含有一个化学式单位。
- [x] A与X一起构成立方最密堆积阵列。
- [ ] 容差因子$t < 1$意味着A阳离子对它的格位来说太大。
::: solution
八面体共用的是顶点（每个X被两个B共享），不是棱。晶胞含有一个B（8个顶角 × ⅛）、三个X（12条棱 × ¼）与一个A（体心）：$Z = 1$。A与X（$\mathrm{AX_3}$）构成ccp层。$t < 1$意味着$r_\mathrm{A} + r_\mathrm{X}$与$\sqrt2(r_\mathrm{B} + r_\mathrm{X})$相比太*小*：A离子太小，八面体发生倾转以在它周围收紧。
:::
:::

## 结构在化学上合理吗？鲍林规则与键价

精修出的晶体结构，或计算机搜索提出的结构，还必须经得起化学的检验。1929年，鲍林（Pauling）把离子结构的规律总结为五条规则，其中最常用的是前两条。**规则1**：每个阳离子周围由阴离子构成一个配位多面体，阳离子–阴离子距离由半径之和决定，配位数由半径比决定。**规则2**，即静电价原理，是定量的那一条。

::: definition 静电键强与键价 {#def-bond-valence}
按鲍林的表述，电荷为$z$、配位数为$N$的阳离子把$s = z/N$的**静电键强**分配给它的每条键；在稳定的离子结构中，达到每个阴离子的各条键的键强之和等于该阴离子的电荷（**鲍林第二规则**，经验规律）。现代的**键价**模型（布朗（Brown）与阿尔塔马特（Altermatt），1985）让键强依赖于键长：
$$
s_{ij} = \exp\!\left(\frac{R_0 - R_{ij}}{b}\right), \qquad V_i = \sum_j s_{ij},
$$ {#eq-bvs}
其中$R_{ij}$是实测键长，$b = 0.37\ \text{Å}$，$R_0$是对每一对阳离子–阴离子查表的常数（例如$\mathrm{Ti^{4+}}$–O为$1.815\ \text{Å}$，$\mathrm{Sr^{2+}}$–O为$2.118\ \text{Å}$，$\mathrm{Fe^{3+}}$–O为$1.759\ \text{Å}$）。**键价和**$V_i$应当等于原子$i$的形式氧化态，在测定良好的结构中通常落在约0.1–0.2价单位以内。这些参数是对大量结构的经验拟合。
:::

鲍林其余的规则是定性的：多面体宁可共顶点而不共棱、宁可共棱而不共面，因为共用会把阳离子拉得更近、抬高它们之间的排斥（规则3），对电荷高而配位数小的阳离子尤其如此（规则4）；而且结构倾向于只含少数几种不同的格位（规则5，最省原理）。规则3解释了为什么金红石——每个八面体共用两条棱——会畸变以拉长共用棱两端Ti···Ti的距离，也解释了为什么硅酸盐中$\mathrm{SiO_4}$四面体几乎从不共棱。

::: example 用鲍林规则与键价检验钙钛矿 {#ex-bvs}
(a) 对$\mathrm{SrTiO_3}$中的一个氧离子、以及尖晶石$\mathrm{MgAl_2O_4}$中的一个氧离子（每个氧与三个Al和一个Mg成键）检验鲍林第二规则。(b) 计算立方$\mathrm{SrTiO_3}$（$a = 3.905\ \text{Å}$）中Ti与Sr的键价和。
::: solution
(a) 在$\mathrm{SrTiO_3}$中，每个O位于两个Ti之间（Ti–O–Ti成直线相连），并被四个Sr包围。Ti键的$s = 4/6$，Sr键的$s = 2/12$，所以总和为$2(\tfrac23) + 4(\tfrac16) = \tfrac43 + \tfrac23 = 2$：恰好是氧离子的电荷。在尖晶石中，Al键的$s = 3/6 = \tfrac12$，（四面体）Mg键的$s = 2/4 = \tfrac12$，所以总和为$3(\tfrac12) + \tfrac12 = 2$。两种结构都严格满足规则2，这正是它们如此普遍的部分原因。

(b) Ti–O $= a/2 = 1.9525\ \text{Å}$：$s = \exp[(1.815 - 1.9525)/0.37] = \exp(-0.3716) = 0.690$，六条键给出$V_\mathrm{Ti} = 4.14$。Sr–O $= a/\sqrt2 = 2.761\ \text{Å}$：$s = \exp[(2.118 - 2.761)/0.37] = \exp(-1.738) = 0.176$，十二条键给出$V_\mathrm{Sr} = 2.11$。两者都比形式值4与2略高，意味着键略短：两种阳离子都略为"过成键"——对密堆积氧化物，经验参数常常如此。容差因子$t = 1.00$用另一种语言说的是同一件事。当键价和远离氧化态时（例如对假定的$\mathrm{Fe^{3+}}$得到$V = 2.6$），说明该格位承受着应变、氧化态指定有误，或精修出了错。
:::
:::

::: intuition 键价为什么管用
[[#eq-bvs]]说的是：阳离子把一份固定的"成键本领"（它的价）分配到它的各条键上，键越短，分得越多。七配位的格位，或者一长一短两条键并存的格位，加和起来仍是同一个价。这是分子中键级–键长关联在固体中的对应物，它使混合价氧化物中氧化态的判定（$\mathrm{LaMnO_3}$中哪个Mn是$\mathrm{Mn^{3+}}$？）变成了测量距离的问题。
:::

## 后续内容

本章的词汇在整个课程中都要用到。[[materials-chemistry/diffraction]]依据[[#prop-dspacing]]给出的晶面间距以及原子在晶胞内的排布来测定晶格参数与原子位置。[[materials-chemistry/defects]]追问这些结构的格位空着或被错误占据时会发生什么，萤石型的$\mathrm{ZrO_2}$与$\mathrm{CeO_2}$是其中关键的离子导体。[[materials-chemistry/electronic-structure-solids]]由这些晶格的轨道搭建能带；[[materials-chemistry/magnetic-optical]]解释反尖晶石的亚铁磁性与$\mathrm{BaTiO_3}$的铁电性；[[materials-chemistry/porous-materials]]会遇到空旷到晶胞大部分是空的骨架；[[materials-chemistry/energy-materials]]则把层状、尖晶石与橄榄石结构用作电池电极，把卤化物钙钛矿用作太阳能吸收材料。晶格与倒格子的物理在物理图谱的[凝聚态：晶体](/learn/physics/lesson.php?c=condensed-matter&l=crystals)中展开。

::: history
1784年，勒内-雅斯特·阿维（René-Just Haüy）在《晶体结构理论试论》（*Essai d'une théorie sur la structure des crystaux*）中提出，晶体由相同的小单元（"组成分子"）堆叠而成；威廉·哈洛斯·米勒（William Hallowes Miller）在《晶体学论集》（*A Treatise on Crystallography*，1839）中引入了以他命名的那套指数。奥古斯特·布拉维（Auguste Bravais）于1850年枚举了十四种点阵；230种空间群则由叶夫格拉夫·费奥多罗夫（Evgraf Fedorov）与阿图尔·舍恩弗利斯（Arthur Schoenflies）于1891年各自独立导出，威廉·巴洛（William Barlow）于1894年跟进。最早用X射线测定的结构——碱金属卤化物的结构——出自威廉·亨利·布拉格（William Henry Bragg）与威廉·劳伦斯·布拉格（William Lawrence Bragg）之手（1913年）；尖晶石结构则由W. H. 布拉格与西川（Shoji Nishikawa）于1915年各自独立解出。维克托·莫里茨·戈尔德施密特（Victor Moritz Goldschmidt）1920年代的地球化学研究引入了容差因子（1926）与系统的离子半径；鲍林于1929年在《美国化学会志》（*Journal of the American Chemical Society*）上发表了鲍林规则。罗伯特·香农（Robert Shannon）经严格修订的离子半径（1976）与I. 戴维·布朗（I. David Brown）和多夫·阿尔塔马特（Dov Altermatt）的键价参数（1985）都发表于《Acta Crystallographica》，正是今天通用的两套表。
:::

::: summary
- 晶体是晶格加基元；晶胞由$a, b, c, \alpha, \beta, \gamma$描述，原子由分数坐标描述，其内容物由$Z$描述，并用$\rho = ZM/N_\mathrm{A}V$对照密度加以检验。
- 七个晶系、十四种布拉维点阵与230种空间群对所有晶体进行分类；只有1、2、3、4、6重旋转与晶格相容，因为迹$1 + 2\cos\theta$必须是整数。
- 密勒指数$(hkl)$是截距的倒数；直角坐标轴下$1/d^2 = h^2/a^2 + k^2/b^2 + l^2/c^2$，立方晶胞$d = a/\sqrt{h^2 + k^2 + l^2}$。
- 大多数简单结构是阴离子的最密堆积阵列加上填入八面体或四面体空隙的阳离子：岩盐、闪锌矿、萤石、NiAs、纤锌矿、$\mathrm{CdI_2}$、刚玉、金红石与尖晶石。
- 在尖晶石中，来自配体场理论的八面体占位优先能决定正、反分布（$\mathrm{Fe_3O_4}$与$\mathrm{NiFe_2O_4}$为反，$\mathrm{Mn_3O_4}$与亚铬酸盐为正）。
- 钙钛矿$\mathrm{ABX_3}$是共顶点八面体网络；容差因子$t = (r_\mathrm{A} + r_\mathrm{X})/\sqrt2(r_\mathrm{B} + r_\mathrm{X})$预言立方（$t \approx 1$）、倾转（$t < 1$）或极性/六方（$t > 1$）各变体。
- 鲍林第二规则与键价和$V_i = \sum\exp[(R_0 - R_{ij})/b]$检验结构及其氧化态是否在化学上合理。
:::

## 练习

::: exercise 由截距定密勒指数 {level=1}
写出截距为下列值的晶面的密勒指数：(a) $a, b, c$；(b) $a, 2b, \infty$；(c) $\tfrac12a, \infty, \infty$；(d) $-a, b, \infty$。
::: solution
取倒数并去分母。(a) $1, 1, 1$：$(111)$。(b) $1, \tfrac12, 0$，乘以2：$(210)$。(c) $2, 0, 0$：作为晶面族这是$(100)$；作为衍射指标，间距减半的那些面是$(200)$。(d) $-1, 1, 0$：$(\bar110)$。
:::
:::

::: exercise 铜的一个面间距 {level=1 check="2.087"}
铜是面心立方，$a = 3.615\ \text{Å}$。计算$d_{111}$。（以Å输入$d_{111}$，四位有效数字。）
::: solution
$d_{111} = a/\sqrt{1 + 1 + 1} = 3.615/1.7321 = 2.087\ \text{Å}$。（同样，$d_{200} = 1.808\ \text{Å}$，$d_{220} = 1.278\ \text{Å}$；这正是铜粉末谱的前三条线。）
:::
:::

::: exercise 萤石的密度 {level=1 check="3.18"}
氟化钙具有萤石结构，$a = 5.463\ \text{Å}$。晶胞中有多少个化学式单位？计算密度。（以$\mathrm{g\,cm^{-3}}$输入密度，三位有效数字。）
::: solution
$\mathrm{Ca^{2+}}$构成fcc阵列（每胞4个），$\mathrm{F^-}$填满全部8个四面体空隙，所以$Z = 4$。$M = 40.078 + 2(18.998) = 78.07\ \mathrm{g\,mol^{-1}}$。$V = (5.463\times10^{-8})^3 = 1.6304\times10^{-22}\ \mathrm{cm^3}$。$\rho = 4 \times 78.07/(6.022\times10^{23} \times 1.6304\times10^{-22}) = 3.18\ \mathrm{g\,cm^{-3}}$（实测$3.18$）。
:::
:::

::: exercise 纤锌矿型的氧化锌 {level=2 check="5.67"}
氧化锌（纤锌矿）是六方的，$a = 3.250\ \text{Å}$，$c = 5.207\ \text{Å}$，$Z = 2$。(a) 由[[#eq-volume]]计算晶胞体积。(b) 计算密度。(c) 计算$d_{100}$与$d_{002}$。（以$\mathrm{g\,cm^{-3}}$输入密度，三位有效数字。）
::: solution
(a) 由$a = b$，$\alpha = \beta = 90^\circ$，$\gamma = 120^\circ$：[[#eq-volume]]中的根号为$\sqrt{1 - \cos^2120^\circ} = \sin120^\circ = 0.8660$，所以$V = 0.8660 \times 3.250^2 \times 5.207 = 47.63\ \text{Å}^3$。(b) $M = 65.38 + 16.00 = 81.38\ \mathrm{g\,mol^{-1}}$；$\rho = 2 \times 81.38/(6.022\times10^{23} \times 47.63\times10^{-24}) = 5.67\ \mathrm{g\,cm^{-3}}$（实测约$5.6$）。(c) 由[[#eq-dhex]]，$1/d_{100}^2 = \tfrac43/3.250^2$，$d_{100} = 3.250 \times \sqrt{3}/2 = 2.815\ \text{Å}$；$d_{002} = c/2 = 2.604\ \text{Å}$。
:::
:::

::: exercise 哪种钙钛矿？ {level=2 check="1.05"}
利用香农半径$r(\mathrm{K^+}, \mathrm{XII}) = 1.64\ \text{Å}$、$r(\mathrm{Nb^{5+}}, \mathrm{VI}) = 0.64\ \text{Å}$与$r(\mathrm{O^{2-}}) = 1.40\ \text{Å}$，计算$\mathrm{KNbO_3}$的容差因子，并预言它室温下更可能是立方的、倾转的还是极性的。对它的氧离子检验鲍林第二规则。（以三位有效数字输入$t$。）
::: solution
$t = (1.64 + 1.40)/[\sqrt2(0.64 + 1.40)] = 3.04/2.885 = 1.05$。由于$t > 1$，$\mathrm{Nb^{5+}}$处在过大的八面体中，预期会偏离中心位移：$\mathrm{KNbO_3}$在室温下确实是铁电体（正交、极性），与$\mathrm{BaTiO_3}$一样。规则2：每个O从Nb得到$2 \times \tfrac56$、从K得到$4 \times \tfrac{1}{12}$，总和$\tfrac53 + \tfrac13 = 2$。（注意$\mathrm{A^+B^{5+}}$与$\mathrm{A^{2+}B^{4+}}$都满足规则2；$\mathrm{LaAlO_3}$中的$\mathrm{A^{3+}B^{3+}}$也是如此。）
:::
:::

::: exercise 尖晶石的占位偏好 {level=2}
利用八面体占位优先能预言(a) $\mathrm{NiCr_2O_4}$、(b) $\mathrm{CoFe_2O_4}$与(c) $\mathrm{MgFe_2O_4}$是正尖晶石还是反尖晶石，并指出这个论证在何处最薄弱。
::: solution
(a) $\mathrm{Cr^{3+}}$（$d^3$，OSPE $\approx 158\ \mathrm{kJ\,mol^{-1}}$）胜过$\mathrm{Ni^{2+}}$（$86$）：Cr保持八面体位置，为**正**尖晶石$\mathrm{Ni[Cr_2]O_4}$（因四面体的$\mathrm{Ni^{2+}}$——该几何下的姜-泰勒离子——而发生四方畸变）。(b) $\mathrm{Co^{2+}}$（$d^7$，OSPE $\approx 31$）对阵$\mathrm{Fe^{3+}}$（0）：**反的**，$\mathrm{Fe[CoFe]O_4}$，与观测一致（部分无序，程度取决于热处理）。(c) $\mathrm{Mg^{2+}}$与$\mathrm{Fe^{3+}}$的OSPE都为零，配体场理论给不出预言。$\mathrm{MgFe_2O_4}$实际上在很大程度上是反的（$x \approx 0.9$），原因在于马德隆能与共价性；它的反序度取决于冷却速率，因为阳离子在格位之间的交换是热激活的。这就是最薄弱的情形。
:::
:::

::: exercise hcp的理想轴比 {level=3 check="1.633"}
在半径为$r$的刚性球的六方最密堆积中，六方晶胞有$a = 2r$，并在$(0, 0, 0)$与$(\tfrac13, \tfrac23, \tfrac12)$处各含一个球。利用正文中的距离公式导出理想比$c/a$，并据此求$a = 2.507\ \text{Å}$的金属（钴）的理想$c$值。（以四位有效数字输入$c/a$。）
::: hint
位于$(\tfrac13, \tfrac23, \tfrac12)$的球必须与原点处的球接触：它们的距离为$2r = a$。
:::
::: solution
取$\Delta x = \tfrac13$、$\Delta y = \tfrac23$、$\Delta z = \tfrac12$、$a = b$、$\gamma = 120^\circ$、$\alpha = \beta = 90^\circ$：
$$
\lvert\Delta\mathbf{r}\rvert^2 = a^2\left(\tfrac19 + \tfrac49 + 2 \cdot \tfrac13 \cdot \tfrac23 \cdot (-\tfrac12)\right) + \tfrac14c^2 = a^2\left(\tfrac59 - \tfrac29\right) + \tfrac14c^2 = \tfrac13a^2 + \tfrac14c^2.
$$
令其等于$a^2$：$\tfrac14c^2 = \tfrac23a^2$，$c/a = \sqrt{8/3} = 1.633$。对钴，理想$c = 1.633 \times 2.507 = 4.094\ \text{Å}$；实测值$4.070\ \text{Å}$（$c/a = 1.623$）与之很接近。锌与镉（$c/a \approx 1.86$）偏离很大，说明这些金属中存在有方向性的键。
:::
:::

::: exercise 金红石中的键价和 {level=3 check="4.08"}
在金红石中，每个钛与四个O成键（$1.946\ \text{Å}$）、与两个O成键（$1.983\ \text{Å}$）。(a) 取$R_0 = 1.815\ \text{Å}$、$b = 0.37\ \text{Å}$，计算Ti的键价和。(b) 金红石中每个O与三个Ti成键。检验鲍林第二规则。(c) 解释为什么对畸变的格位来说，键价和比鲍林规则提供的信息更多。（以三位有效数字输入键价和。）
::: solution
(a) $s(1.946) = \exp(-0.131/0.37) = \exp(-0.3541) = 0.7018$；$s(1.983) = \exp(-0.168/0.37) = \exp(-0.4541) = 0.6351$。$V_\mathrm{Ti} = 4(0.7018) + 2(0.6351) = 2.807 + 1.270 = 4.08$，接近形式的$+4$。(b) 每条Ti–O键的鲍林键强为$4/6 = \tfrac23$，三条键给出$2$：规则2成立。(c) 鲍林规则给同一格位的每条键相同的键强，不论键长，所以它无法判断一个畸变的八面体是否合理；键价模型按键长为每条键加权，会立刻指出——比如说——一个"Ti"格位的键加和只有$3.3$，从而揭示那是$\mathrm{Ti^{3+}}$、一个指认错误的原子，或一个错误的结构。
:::
:::

::: exercise 数钙钛矿与反尖晶石 {level=2 check="8"}
(a) 在A位于体心、B位于顶角、X位于棱中点的立方钙钛矿晶胞中，数出每种原子每胞的个数。(b) 磁铁矿的$a = 8.396\ \text{Å}$，$Z = 8$。一个晶胞中有多少个$\mathrm{Fe^{3+}}$占据四面体位置？它的密度是多少？（输入每胞四面体位$\mathrm{Fe^{3+}}$的个数。）
::: solution
(a) B：$8 \times \tfrac18 = 1$；X：$12 \times \tfrac14 = 3$；A：$1$。所以是$\mathrm{ABX_3}$，$Z = 1$。(b) 反尖晶石$\mathrm{Fe^{3+}[Fe^{2+}Fe^{3+}]O_4}$：每个化学式单位有一个四面体的$\mathrm{Fe^{3+}}$，所以每胞$8$个（另有$8$个$\mathrm{Fe^{2+}}$与$8$个$\mathrm{Fe^{3+}}$在八面体位置）。$M(\mathrm{Fe_3O_4}) = 3(55.845) + 4(15.999) = 231.53\ \mathrm{g\,mol^{-1}}$；$V = (8.396\times10^{-8})^3 = 5.919\times10^{-22}\ \mathrm{cm^3}$；$\rho = 8 \times 231.53/(6.022\times10^{23} \times 5.919\times10^{-22}) = 5.20\ \mathrm{g\,cm^{-3}}$（实测$5.17$–$5.20$）。
:::
:::
