应力告诉你梁会不会断；挠度告诉你梁能不能用。一根楼板梁承载两倍荷载而不屈服、却晃得足以震裂抹灰层，它就是失效的梁；一台在设计载荷下刚度足够、在运行载荷下挠三毫米的机床框架，会让它的齿轮脱离啮合。实践中，为满足 $L / 360$ 而购买的钢材多于为满足 $165\ \mathrm{MPa}$ 而购买的，为抗振而加劲的机床框架多于为抗屈服而加强的。

经典梁挠度的全部建立在一条微分方程之上，
$$
E I \frac{\mathrm{d}^{2} v}{\mathrm{d} x^{2}} = M(x),
$$
以及求解它的四种方法。直接积分精确而繁琐。叠加法快捷，覆盖九成的实际情形。矩面积定理和共轭梁法用几何换掉积分，是求载荷突变点处转角的最快途径。卡斯蒂利亚诺（Castigliano）能量定理是四种方法中唯一能对刚架、曲杆、桁架或超静定结构不费力气地起作用的，也是你将用到的每一款有限元程序的前身。

::: warning $EI v'' = M$ 假设小挠度
曲线的曲率为 $1 / \rho = v^{\prime \prime} / \left[ 1 + v^{\prime 2} \right]^{3 / 2}$，该方程丢掉了 $v^{\prime 2}$ 项。只要转角不超过约 $0.1$ 弧度这就合法，对梁意味着挠度不超过约 $L / 20$。超过之后方程就是错的，而且误差不小：挠度达到自身长度的悬臂梁，其有效力臂缩短三分之一；偏心距与截面高度同量级的受压柱，比线性理论说的弱 $50$ 个百分点。修正是大挠度理论或压弯构件理论，它对板弹簧、薄条、柔性联轴器、卡扣悬臂梁以及每一根接近屈曲载荷的细长构件都重要。
:::

## 微分方程

::: definition 弹性曲线 {#def-elastic-curve}
对 $E I$ 为常数、$v$ 向上为正、$x$ 向右、分布载荷 $w$ 向下为正的棱柱梁，
$$
E I \frac{\mathrm{d}^{2} v}{\mathrm{d} x^{2}} = M(x), \qquad
E I \frac{\mathrm{d}^{3} v}{\mathrm{d} x^{3}} = V(x), \qquad
E I \frac{\mathrm{d}^{4} v}{\mathrm{d} x^{4}} = - w(x),
$$
其中 $M$ 以下凸为正。从 $x = 0$ 积分得
$$
E I v^{\prime} = \int M \, \mathrm{d} x + C_1, \qquad
E I v = \iint M \, \mathrm{d} x \mathrm{d} x + C_1 x + C_2 ,
$$
两个常数来自**边界条件**：支座处 $v = 0$，固定端或对称点处 $v^{\prime} = 0$，铰或自由端处 $M = 0$，自由端处 $V = 0$。$n$ 跨、$n + 1$ 个支座的梁需要 $2 n$ 个条件，把它们列对就是全部难点。
:::

::: proof
由弯曲理论，距中性轴 $y$ 处的纤维应变为 $\varepsilon = y / \rho$，故 $\sigma = E y / \rho$ 且
$$
M = \int_A \sigma y \, \mathrm{d} A = \frac{E I}{\rho} .
$$
小转角下，挠曲线的曲率为 $1 / \rho = v^{\prime \prime}$，得 $E I v^{\prime \prime} = M$。求导一次并用 [[mechanics-of-materials/shear-moment-diagrams]] 中的 $\mathrm{d} M / \mathrm{d} x = V$，得三阶形式；再求导一次并用 $\mathrm{d} V / \mathrm{d} x = - w$，得四阶形式。矩阵方法在实践中用的正是四阶形式，因为它不需要事先算出弯矩图。
:::

::: proposition 标准挠度 {#prop-standard-deflections}
对跨度 $L$、$E I$ 为常数的棱柱梁：

- **简支、跨中载荷 $P$：**$\delta_{\max} = P L^{3} / (48 E I)$ 在跨中；$\theta_{\text{端}} = P L^{2} / (16 E I)$。
- **简支、均布载荷 $w$：**$\delta_{\max} = 5 w L^{4} / (384 E I)$；$\theta_{\text{端}} = w L^{3} / (24 E I)$。
- **简支、一端作用力偶 $C$：**$\delta_{\max} = C L^{2} / (9 \sqrt{3} E I)$，位于距加载端 $x = L \left( 1 - 1 / \sqrt{3} \right)$ 处；两端转角为 $C L / (3 E I)$ 和 $C L / (6 E I)$。
- **悬臂、尖端载荷 $P$：**$\delta_{\max} = P L^{3} / (3 E I)$；$\theta_{\max} = P L^{2} / (2 E I)$。
- **悬臂、均布载荷 $w$：**$\delta_{\max} = w L^{4} / (8 E I)$；$\theta_{\max} = w L^{3} / (6 E I)$。
- **两端固定、均布载荷 $w$：**$\delta_{\max} = w L^{4} / (384 E I)$ 在跨中；$M_{\text{端}} = w L^{2} / 12$。
- **带支座悬臂梁（一端固定一端简支）、均布载荷 $w$：**支座反力 $3 w L / 8$；$M_{\text{墙}} = w L^{2} / 8$；$\delta_{\max} = w L^{4} / (185 E I)$。

这些结果之间的比值比公式本身更值钱：均布载荷下，两端固定的梁比两端铰支的梁刚五倍，带支座悬臂梁比简支梁刚 $185 / 76.8 = 2.4$ 倍。
:::

::: example 二次积分 {#ex-double-integration}
推导承受跨中集中载荷 $P$ 的简支梁的跨中挠度。
::: solution
由对称性，两反力为 $P / 2$，跨中转角为零，所以只对左半跨积分，该段 $M = P x / 2$：
$$
E I v^{\prime \prime} = \frac{P x}{2}, \qquad
E I v^{\prime} = \frac{P x^{2}}{4} + C_1, \qquad
E I v = \frac{P x^{3}}{12} + C_1 x + C_2 .
$$
**边界条件。**$v (0) = 0$ 得 $C_2 = 0$。$v^{\prime} (L / 2) = 0$ 得 $C_1 = - P L^{2} / 16$。于是
$$
v (x) = \frac{P x}{12 E I} \left( x^{2} - \frac{3 L^{2}}{4} \right),
$$
$$
\delta_{\max} = - v \left( \frac{L}{2} \right) = - \frac{P L}{24 E I} \left( \frac{L^{2}}{4} - \frac{3 L^{2}}{4} \right) = \frac{P L^{3}}{48 E I},
$$
$$
\theta_{\text{端}} = \left| v^{\prime} (0) \right| = \frac{P L^{2}}{16 E I} .
$$
（$v$ 为负，因为梁向下挠曲。）**校核。**该表达式只在左半跨有效。一个干净的校核是矩面积定理：跨中切线水平，所以支座相对该切线的偏差就是跨中挠度；半跨上 $M / E I$ 图的面积是 $\tfrac{1}{2} \times \tfrac{L}{2} \times \tfrac{P L}{4 E I} = \tfrac{P L^{2}}{16 E I}$，其形心距支座 $L / 3$，给出 $\delta = \tfrac{P L^{2}}{16 E I} \times \tfrac{L}{3} = \tfrac{P L^{3}}{48 E I}$。$\checkmark$

**合理性。** 注意用到的两个边界条件——一个位移、一个转角——以及对称条件 $v^{\prime} (L / 2) = 0$ 顶替了第二个位移条件。这是标准技巧，每次都把代数减半。它只对对称载荷有效；非对称载荷必须对全跨积分或使用麦考利（Macaulay）括号。
:::
:::

::: example 悬臂梁 {#ex-cantilever-deflect}
一跨度 $2\ \mathrm{m}$、$I = 80 \times 10^{6}\ \mathrm{mm^{4}}$、$E = 200\ \mathrm{GPa}$ 的悬臂梁承受尖端载荷 $20\ \mathrm{kN}$。求尖端挠度和转角，以及使尖端挠度等于长度 $1 / 200$ 的载荷。
::: solution
$$
\delta = \frac{P L^{3}}{3 E I}
= \frac{20\,000 \times 2000^{3}}{3 \times 200\,000 \times 80 \times 10^{6}} = 3.33\ \mathrm{mm},
$$
$$
\theta = \frac{P L^{2}}{2 E I}
= \frac{20\,000 \times 2000^{2}}{2 \times 200\,000 \times 80 \times 10^{6}} = 2.50 \times 10^{-3}\ \mathrm{rad} = 0.143^{\circ}.
$$
要 $\delta = L / 200 = 10\ \mathrm{mm}$，
$$
P = \frac{3 E I \delta}{L^{3}} = \frac{3 \times 200\,000 \times 80 \times 10^{6} \times 10}{2000^{3}} = 60\ \mathrm{kN}.
$$
**合理性。** $60\ \mathrm{kN}$ 对 $2\ \mathrm{m}$ 悬臂梁是个大载荷，而真正要紧的校核不是挠度是应力：$60\ \mathrm{kN}$ 下弯矩为 $120\ \mathrm{kN\,m}$，除非抗弯截面系数超过 $120 \times 10^{6} / 165 = 727 \times 10^{3}\ \mathrm{mm^{3}}$，梁早在达到 $L / 200$ 之前就屈服的。$I = 80 \times 10^{6}\ \mathrm{mm^{4}}$、高约 $350\ \mathrm{mm}$ 的轧制工字钢，$Z = 2 I / d \approx 457 \times 10^{3}\ \mathrm{mm^{3}}$，所以这是**强度**问题而非刚度问题：它在约 $75\ \mathrm{kN\,m}$、即尖端载荷约 $38\ \mathrm{kN}$ 时就屈服。短而重载的悬臂梁通常由强度控制；长而轻载的跨度则由挠度控制。
:::
:::

::: widget plot
f: x*(x^2-27)/10
x: 0, 3
y: -6, 0
labels: \text{挠曲形状，} v / \left( P / 12 EI \right)
caption: 例 1 简支梁左半跨的挠曲线，按 $v \left( x \right) \times 12 E I / P = x \left( x^{2} - 3 L^{2} / 4 \right)$ 绘制，$L = 6\ \mathrm{m}$，为适应坐标轴除以 $10$。曲线是三次曲线，跨中转角为零、支座处最陡，端部转角与跨中挠度之比对跨中集中载荷为 $3 / L$、对均布载荷为 $3.2 / L$——几乎与载荷形式无关，所以在支座处读一次转角就能较好地估计跨中挠度。
:::

## 叠加法、矩面积法与共轭梁法

::: algorithm 选择方法 {#alg-methods}
- **叠加法**——只要载荷是标准情形之和、梁是静定的，就用它。最快、最不易错，每本手册和每个软件校核都以它为基础。
- **麦考利括号**——用于有多个集中力和力偶的静定梁。全跨一个 $M$ 表达式、一次积分、两个边界条件。
- **矩面积定理**——当你只需要一个点的转角或挠度、而 $M / E I$ 图由简单面积组成时使用。完全不用积分，只有面积和形心。
- **共轭梁**——用于简支梁的转角和挠度，共轭梁的剪力和弯矩代表真实梁的转角和挠度。优雅，对两端固定梁无可匹敌。
- **卡斯蒂利亚诺 / 单位载荷法**——用于刚架、曲杆、弯扭组合、桁架，以及任何超静定结构。
:::

::: theorem 矩面积定理 {#thm-moment-area}
对 $A$、$B$ 两点之间的梁，
$$
\theta_B - \theta_A = \int_A^B \frac{M}{E I} \, \mathrm{d} x, \qquad
t_{B / A} = \int_A^B \frac{M}{E I} x \, \mathrm{d} x ,
$$
其中 $t_{B / A}$ 是 $B$ 点相对过 $A$ 点切线的竖向偏差，按 $M / E I$ 面积对 $B$ 的一次矩计算。两者都直接来自 $\mathrm{d} \theta = M \, \mathrm{d} x / E I$ 和弹性曲线的几何。
:::

::: example 矩面积法 {#ex-moment-area}
一长 $L$ 的悬臂梁承受均布载荷 $w$。用矩面积定理求自由端的转角和挠度。
::: solution
$M$ 图是抛物线，墙处为 $- w L^{2} / 2$、尖端为零，其面积为
$$
\int_0^L M \, \mathrm{d} x = - \frac{w L^{3}}{6}
$$
（抛物线拱腹形的面积是底乘高的三分之一，$\tfrac{1}{3} \times L \times \tfrac{w L^{2}}{2} = \tfrac{w L^{3}}{6}$，即 $\int_0^L \tfrac{1}{2} w x^{2} \mathrm{d} x$）。

**第一定理。**由 $\theta_{\text{墙}} = 0$，
$$
\theta_{\text{尖}} = \frac{1}{E I} \int_0^L \left( - \frac{w x^{2}}{2} \right) \mathrm{d} x = - \frac{w L^{3}}{6 E I} .
$$
**第二定理。**对 $M / E I$ 面积取关于尖端的矩，$x$ 处微元的力臂为 $x$，
$$
t_{\text{尖} / \text{墙}} = \frac{1}{E I} \int_0^L \frac{w x^{2}}{2} \cdot x \, \mathrm{d} x = \frac{w L^{4}}{8 E I} .
$$
由于墙处切线水平，这个偏差**就是**尖端挠度。

**合理性。** 整个计算是两条一行积分，没有任何积分常数，因为固定端免费提供了两个边界条件。对比二次积分路线：需要 $M (x)$、两次积分、两个常数、两个边界条件。对悬臂梁，矩面积法的工作量大约少三倍，而且载荷不连续时优势更大，因为你从不需要写出 $M (x)$ 的表达式——只画它的图、取面积。
:::
:::

::: example 偏心集中载荷 {#ex-offcentre}
一跨度 $5\ \mathrm{m}$、$E I = 1.5 \times 10^{4}\ \mathrm{kN\,m^{2}}$ 的简支梁在距左支座 $1.5\ \mathrm{m}$ 处承受 $25\ \mathrm{kN}$。求两端转角、载荷下挠度和最大挠度。
::: solution
$a = 1.5\ \mathrm{m}$、$b = 3.5\ \mathrm{m}$：
$$
\theta_A = \frac{P b \left( L^{2} - b^{2} \right)}{6 E I L}
= \frac{25 \times 3.5 \times \left( 25 - 12.25 \right)}{6 \times 1.5 \times 10^{4} \times 5} = 2.48 \times 10^{-3}\ \mathrm{rad},
$$
$$
\theta_B = \frac{P a \left( L^{2} - a^{2} \right)}{6 E I L}
= \frac{25 \times 1.5 \times \left( 25 - 2.25 \right)}{4.5 \times 10^{5}} = 1.90 \times 10^{-3}\ \mathrm{rad},
$$
$$
\delta_{\text{载荷下}} = \frac{P a^{2} b^{2}}{3 E I L}
= \frac{25 \times 2.25 \times 12.25}{3 \times 1.5 \times 10^{4} \times 5} = 3.06\ \mathrm{mm}.
$$
**最大挠度。**出现在距 $A$ 点 $x_1 = \sqrt{\left( L^{2} - b^{2} \right) / 3} = \sqrt{12.75 / 3} = 2.06\ \mathrm{m}$ 处，且
$$
\delta_{\max} = \frac{P b \left( L^{2} - b^{2} \right)^{3 / 2}}{9 \sqrt{3} E I L} = 3.40\ \mathrm{mm}.
$$
**校核。**$\theta_A / \theta_B = 2.48 / 1.90 = 1.31$，精确比值为 $b \left( L^{2} - b^{2} \right) / a \left( L^{2} - a^{2} \right) = 1115 / 853 = 1.31$。$\checkmark$ 较大的转角在**靠近**载荷的一端，即弯矩图在其附近有较大面积的那一端。

**合理性。** 最大挠度 $3.40\ \mathrm{mm}$ 比载荷下挠度大 $11$ 个百分点，出现在远离载荷 $0.56\ \mathrm{m}$ 的长跨一侧。对称载荷的梁这两个数值重合，区别就被遗忘；偏心载荷则不然，在载荷点校核挠度限值是偏不保守的——这里偏 $11$ 个百分点，载荷越靠近支座偏得越多（$a = 0.2 L$ 时为 $30$ 个百分点），尽管那时挠度本身较小。规则是：对任何偏心载荷，都在距靠近载荷的支座 $\sqrt{\left( L^{2} - b^{2} \right) / 3}$ 处而非载荷下校核挠度。
:::
:::

## 能量法与超静定梁

::: theorem 卡斯蒂利亚诺定理 {#thm-castigliano}
对总应变能为 $U$ 的弹性结构，沿力 $P$ 方向的位移为
$$
\delta_P = \frac{\partial U}{\partial P},
$$
对弯曲、剪切和扭转分别有
$$
U = \int \frac{M^{2}}{2 E I} \mathrm{d} s + \int \frac{V^{2}}{2 k A G} \mathrm{d} s + \int \frac{T^{2}}{2 G J} \mathrm{d} s .
$$
对支座处无位移的**多余**约束力 $R$，$\partial U / \partial R = 0$ 直接给出协调方程。等价地，**单位载荷法**给出
$$
\delta = \int \frac{M m}{E I} \mathrm{d} s ,
$$
其中 $m$ 是在所求挠度处施加单位载荷产生的弯矩图。
:::

::: example 用卡斯蒂利亚诺定理求刚架挠度 {#ex-frame}
一托架由在 $A$ 处刚性固定的 $1.5\ \mathrm{m}$ 竖直腿 $A B$ 和在 $C$ 处承受 $10\ \mathrm{kN}$ 竖向载荷的 $2\ \mathrm{m}$ 水平臂 $B C$ 组成。两部分都是 $I = 60 \times 10^{6}\ \mathrm{mm^{4}}$、$E = 200\ \mathrm{GPa}$。求 $C$ 的竖向挠度。
::: solution
取 $x$ 沿臂从 $C$ 起、$y$ 沿腿从 $B$ 向上。
**悬臂段：**$M = P x$，$\partial M / \partial P = x$。
**立柱：**$M = P b$（常数，$b = 2\ \mathrm{m}$），$\partial M / \partial P = b$。
$$
\delta_C = \int_0^b \frac{P x \cdot x}{E I} \mathrm{d} x + \int_0^a \frac{P b \cdot b}{E I} \mathrm{d} y
= \frac{P b^{3}}{3 E I} + \frac{P b^{2} a}{E I} .
$$
代入 $P = 10\,000\ \mathrm{N}$、$b = 2000\ \mathrm{mm}$、$a = 1500\ \mathrm{mm}$，
$$
\frac{P b^{3}}{3 E I} = \frac{10\,000 \times 8.0 \times 10^{9}}{3 \times 200\,000 \times 60 \times 10^{6}} = 2.22\ \mathrm{mm},
$$
$$
\frac{P b^{2} a}{E I} = \frac{10\,000 \times 4.0 \times 10^{6} \times 1500}{200\,000 \times 60 \times 10^{6}} = 5.00\ \mathrm{mm},
$$
$$
\delta_C = 7.22\ \mathrm{mm}.
$$
**合理性。** 尽管载荷由悬臂段承担，**立柱**却贡献了挠度的 $69$ 个百分点，因为悬臂段的弯矩向尖端收缩到零，而立柱的弯矩全长恒为 $P b$。这是托架设计中单个最有用的结果：要给托架加刚，就缩短或加厚立柱，而不是悬臂段。这也是为什么墙挂式悬臂吊要设斜撑——斜撑把立柱的弯曲变成轴力，而轴向构件的柔度 $L / (A E)$ 远小于受弯构件的柔度。
:::
:::

::: example 带支座悬臂梁 {#ex-propped}
求一长 $L$、承受均布载荷 $w$、自由端加支座的悬臂梁的支座反力。
::: solution
取支座反力 $R$ 为多余未知力。以 $x$ 从支座起算，弯矩为
$$
M (x) = R x - \frac{w x^{2}}{2}, \qquad \frac{\partial M}{\partial R} = x .
$$
卡斯蒂利亚诺协调条件 $\partial U / \partial R = \int (M / E I) \left( \partial M / \partial R \right) \mathrm{d} x = 0$ 给出
$$
\int_0^L \left( R x^{2} - \frac{w x^{3}}{2} \right) \mathrm{d} x = 0
\quad\Longrightarrow\quad
\frac{R L^{3}}{3} = \frac{w L^{4}}{8},
$$
$$
R = \frac{3 w L}{8}.
$$
墙于是承担 $5 w L / 8$ 和弯矩 $w L^{2} / 8$，最大挠度为 $w L^{4} / (185 E I)$，在距支座 $x = 0.42 L$ 处。

**合理性。** 对同样的 $w L$ 比较三种情形：简支梁两端各承担 $w L / 2$，$M = w L^{2} / 8$；带支座悬臂梁承担 $3 w L / 8$ 和 $5 w L / 8$，墙处 $M = w L^{2} / 8$；两端固定梁承担 $w L / 2$，两端 $M = w L^{2} / 12$。带支座悬臂梁的最大弯矩与简支梁相同，刚度却是其 $2.4$ 倍；两端固定梁的弯矩是其 $67$ 个百分点，刚度是其五倍。最后这个因数解释了为什么凡节点构造做得到位之处都用连续梁或固定梁——也解释了为什么常常做不到：买来刚度的那个固结，同时也买来了对沉降、温度和施工公差的敏感，一个转动几个毫弧的"固定"端会把大部分好处吐回去。
:::
:::

::: warning 挠度并不总是适用性极限
对细长受压构件，挠度**就是**强度。承受轴力 $P$、初始初弯曲 $v_0$ 的柱，其挠度为
$$
v = \frac{v_0}{1 - P / P_E},
$$
所以弯矩被放大 $1 / \left( 1 - P / P_E \right)$ 倍，构件在应力达到屈服时破坏，而该载荷远低于压溃载荷。同样的放大出现在压弯构件中、弹性地基梁的移动载荷下，以及任何载荷通过自身变形形状施加的构件中——旗杆、钻柱、锯片、张紧的皮带。规则是：一旦 $P / P_E$ 超过约 $0.2$，挠度和应力必须一起计算，本章的线性叠加不再成立。
:::

::: history
挠曲梁的问题比弹性理论更古老。雅各布（詹姆斯）·伯努利（Jacob Bernoulli）1694年在《学术纪事》（*Acta Eruditorum*）上发表了弯曲薄条弹性曲线的解，他取曲率与弯矩成正比。欧拉（Euler）受丹尼尔·伯努利（Daniel Bernoulli）"弹性线使曲率平方的积分取极小"这一建议的启发，在1744年《求极大极小曲线的方法》（*Methodus inveniendi*）的附录中对弹性曲线进行了分类，并在其中导出了柱的屈曲载荷。**矩面积**和**共轭梁**的思想在一个世纪后随图解静力学而来：奥托·莫尔（Otto Mohr）在1868年证明，梁的挠曲形状就是以其 $M / E I$ 图为载荷的虚拟梁的弯矩图；密歇根大学的查尔斯·E. 格林（Charles E. Greene）在1873年发表了矩面积定理。**卡斯蒂利亚诺（Castigliano）**定理由阿尔贝托·卡斯蒂利亚诺在其1873年的都灵学位论文和1879年的著作《弹性系统平衡理论及其应用》（*Théorie de l'équilibre des systèmes élastiques et ses applications*）中提出，它们是转折点：把超静定结构分析变成了对一个能量表达式求导的事，其直系后代是最小势能原理和每一款有限元程序实现的刚度法。
:::

## 后续内容

挠度限值是 [[machine-design/shafts]] 的设计基础——那里轴承处转角起控制作用——也是 [[machine-design/springs]] 的设计基础——那里挠度本身就是产品。此处使用的能量法可推广到 [[solid-mechanics/energy-methods]] 和 [[finite-element-method/direct-stiffness]] 的矩阵刚度法，而大挠度警告在 [[solid-mechanics/plates]] 的后屈曲和 [[vibrations/free-vibration]] 的固有频率中成为整个主题。

::: summary
- $E I v^{\prime \prime} = M$ 只对小转角成立；四阶形式 $E I v^{\prime \prime \prime \prime} = w$ 免去画弯矩图。
- 每段梁两个边界条件；用对称性（跨中 $v^{\prime} = 0$）把工作量减半。
- 记住标准情形，凡是它们之和的载荷一律用**叠加法**。
- 矩面积法和共轭梁法用面积和形心取代积分，对悬臂梁或两端固定梁无可匹敌。
- 卡斯蒂利亚诺定理处理刚架、曲杆和多余约束；对托架，立柱贡献的挠度通常大于悬臂段。
- 挠度对梁是适用性极限，对柱是**强度**极限：一旦 $P / P_E$ 超过约 $0.2$，应力和挠度必须一起计算。
:::

::: quiz
两个几何相似的悬臂梁，一个长两倍，承受相同的尖端载荷、用相同材料制成。就尖端挠度与长度之**比**较小而言，哪个更刚？
- [x] 较长的那个，因为它相对承受的载荷较小
- [ ] 相同，因为两者都按 $L^{3}$ 缩放
- [ ] 较短的那个，因为挠度随长度增大
- [ ] 都不是，因为挠度不是刚度的度量
::: solution
较长的那个。对缩放因数 $\lambda$ 的几何相似悬臂梁，$I \propto b d^{3} \propto \lambda^{4}$，$P$ 固定时 $\delta \propto L^{3} / I \propto \lambda^{3} / \lambda^{4} = 1 / \lambda$，所以连**绝对**挠度都随构件变大而减小，而 $\delta / L \propto 1 / \lambda^{2}$：长两倍的悬臂梁相对挠度只有四分之一。若按相同弯曲应力缩放载荷，结论就变了：$P \propto Z / L \propto \lambda^{2}$，$\delta / L = \sigma L / (3 E c)$，两者相同。在按 $\lambda^{3}$ 增长的自重作用下，大的构件相对**更不**刚（$\delta / L \propto \lambda$）——这就是大型结构靠高度加劲的原因，也是缩尺模型并不自动成为原型有效刚度模型的原因。
:::
:::

## 习题

::: exercise 标准情形 {level=1 check="4.0"}
一跨度 $4\ \mathrm{m}$、$E I = 1.0 \times 10^{4}\ \mathrm{kN\,m^{2}}$ 的简支钢梁在跨中承受 $30\ \mathrm{kN}$。求跨中挠度（mm）。
::: solution
$\delta = P L^{3} / (48 E I) = 30 \times 4^{3} / (48 \times 1.0 \times 10^{4}) = 4.0 \times 10^{-3}\ \mathrm{m} = 4.0\ \mathrm{mm}$。
**注。** 以 N 和 mm 计，$E I = 10^{4}\ \mathrm{kN\,m^{2}} = 10^{13}\ \mathrm{N\,mm^{2}}$，$\delta = 30\,000 \times 4000^{3} / (48 \times 10^{13}) = 4.0\ \mathrm{mm}$。答案是 $4.0\ \mathrm{mm}$，对 $L / 360$ 限值 $11.1\ \mathrm{mm}$——刚度绰绰有余。
:::
:::

::: exercise 比值 {level=1 check="8"}
悬臂梁长度加倍、载荷和截面不变，尖端挠度变为几倍？
::: solution
$2^{3} = 8$ 倍，因为 $\delta \propto L^{3}$。若载荷改为均布载荷，倍数则是 $2^{4} = 16$。
:::
:::

::: exercise 固端 {level=1 check="0.2"}
均布载荷下，两端固定梁的跨中挠度与同一梁简支时之比是多少？（以小数输入比值。）
::: solution
$\left( w L^{4} / 384 \right) / \left( 5 w L^{4} / 384 \right) = 1 / 5 = 0.2$，所以两端固定梁的挠度**小五倍**。作为比较，同跨度悬臂梁的挠度是两端固定梁的 $(w L^{4} / 8) / (w L^{4} / 384) = 48$ 倍。
:::
:::

::: exercise 叠加法 {level=2}
一跨度 $6\ \mathrm{m}$、$E I = 2.0 \times 10^{4}\ \mathrm{kN\,m^{2}}$ 的简支梁承受均布载荷 $20\ \mathrm{kN / m}$ 和跨中集中载荷 $30\ \mathrm{kN}$。求跨中挠度。
::: solution
$$
\delta_w = \frac{5 w L^{4}}{384 E I} = \frac{5 \times 20 \times 6^{4}}{384 \times 2.0 \times 10^{4}} = 0.0169\ \mathrm{m} = 16.9\ \mathrm{mm},
$$
$$
\delta_P = \frac{P L^{3}}{48 E I} = \frac{30 \times 216}{48 \times 2.0 \times 10^{4}} = 0.00675\ \mathrm{m} = 6.8\ \mathrm{mm},
$$
$$
\delta = 23.6\ \mathrm{mm}.
$$
**合理性。** 均布载荷用占总载荷 $80$ 个百分点的份额贡献了挠度的 $71$ 个百分点：每千牛相比，跨中集中载荷产生的挠度是同样载荷均匀分布时的 $(1 / 48) / (5 / 384) = 1.6$ 倍。
:::
:::

::: exercise 矩面积法 {level=2}
一简支梁在左支座处承受力偶 $C_0$。用矩面积定理求两端转角、最大挠度的位置和数值。
::: solution
弯矩图从 $A$ 处的 $C_0$ 线性降到 $B$ 处的零，面积 $C_0 L / 2$，形心在距 $A$ 点 $L / 3$ 处。
**第一定理：**$\theta_B - \theta_A = C_0 L / (2 E I)$。
**第二定理：**$B$ 相对 $A$ 处切线的偏差为 $t_{B / A} = \left( C_0 L / 2 E I \right) \times \left( 2 L / 3 \right) = C_0 L^{2} / (3 E I)$，而 $v_A = v_B = 0$，故它等于 $L \left( - \theta_A \right)$，于是
$$
\theta_A = - \frac{C_0 L}{3 E I}, \qquad
\theta_B = \frac{C_0 L}{2 E I} - \frac{C_0 L}{3 E I} = + \frac{C_0 L}{6 E I}.
$$
转角为零处即从 $A$ 起的 $M / E I$ 面积等于 $- \theta_A$ 之处：$C_0 \left( x - x^{2} / 2 L \right) = C_0 L / 3$，即距 $A$ 点 $x = L \left( 1 - 1 / \sqrt{3} \right) = 0.423 L$ 处，此处
$$
\delta_{\max} = \frac{C_0 L^{2}}{9 \sqrt{3} E I} = 0.0642 \frac{C_0 L^{2}}{E I}.
$$
**校核。**两端转角符号相反，对单一曲率的弯曲这是必然的，且 $|\theta_A| = 2 |\theta_B|$，与形心在距 $A$ 点 $L / 3$ 处一致。$\checkmark$
:::
:::

::: exercise 超静定 {level=2}
一跨度 $L$ 的两端固定梁承受跨中集中载荷 $P$。求端弯矩和跨中挠度。
::: solution
由对称性，两端多余端弯矩 $M_0$ 相同。左半跨 $M = P x / 2 - M_0$，用支座处 $\theta = 0$ 的条件，矩面积定理给出
$$
\int_0^{L / 2} \left( \frac{P x}{2} - M_0 \right) \mathrm{d} x = 0
\quad\Longrightarrow\quad
\frac{P L^{2}}{16} = \frac{M_0 L}{2}
\quad\Longrightarrow\quad
M_0 = \frac{P L}{8}.
$$
跨中弯矩为 $P L / 4 - P L / 8 = P L / 8$，所以最大弯矩为 $P L / 8$，对照简支梁的 $P L / 4$——省 $50$ 个百分点。挠度为
$$
\delta_{\max} = \frac{P L^{3}}{192 E I},
$$
是简支值的四分之一。
**合理性。** 固结把弯矩减半、挠度变四分之一，代价是一个必须传递弯矩的支座构造。用两个溜孔螺栓做成的"固定"端大约只能提供假定固结的三分之一，把大部分好处吐了回去——更糟的是——引入了设计从未考虑过的偏心。
:::
:::

::: exercise 设计 {level=3}
一跨度 $1.2\ \mathrm{m}$ 的机床床身横梁简支，承受跨中集中载荷 $40\ \mathrm{kN}$。载荷下挠度不得超过 $0.1\ \mathrm{mm}$，箱形截面的宽度限于 $150\ \mathrm{mm}$、壁厚 $12\ \mathrm{mm}$。求所需高度，并校核弯曲应力。
::: solution
$$
I_{\text{req}} = \frac{P L^{3}}{48 E \delta}
= \frac{40\,000 \times 1200^{3}}{48 \times 200\,000 \times 0.1}
= 72.0 \times 10^{6}\ \mathrm{mm^{4}} .
$$
外宽 $b = 150$、内宽 $b_i = 126$ 的箱形截面，
$$
I = \frac{150 d^{3} - 126 \left( d - 24 \right)^{3}}{12} = 72.0 \times 10^{6} .
$$
试 $d = 240\ \mathrm{mm}$：$I = \left( 2073.6 - 1269.8 \right) \times 10^{6} / 12 = 67.0 \times 10^{6}\ \mathrm{mm^{4}}$——差一点。试 $d = 250$：$I = \left( 2343.8 - 1454.4 \right) \times 10^{6} / 12 = 74.1 \times 10^{6}\ \mathrm{mm^{4}}$，足够，挠度 $\delta = 0.097\ \mathrm{mm}$。**选 $d = 250\ \mathrm{mm}$。**

**应力校核。**
$$
M = \frac{40 \times 1.2}{4} = 12\ \mathrm{kN\,m}, \qquad
\sigma = \frac{12 \times 10^{6} \times 125}{74.1 \times 10^{6}} = 20.2\ \mathrm{MPa}.
$$
**设计点评。** 刚度要求给出的应力只有 $20\ \mathrm{MPa}$，约为典型许用值 $165\ \mathrm{MPa}$ 的八分之一，所以梁完全由挠度控制——机器结构几乎总是如此。另请注意 $0.1\ \mathrm{mm}$ 限值到底为什么存在：机床的定位精度取决于切削力下结构的变形，刀尖处 $0.1\ \mathrm{mm}$ 的挠度就是加工件上 $0.1\ \mathrm{mm}$ 的误差。这就是机床床身用重加筋铸铁或聚合物混凝土制成、其 $E I$ 远超强度所需的原因，也是按应力的定尺寸的机床框架会做出一个又轻、又便宜、又不准的框架的原因。
:::
:::

::: exercise 推导 {level=3}
用卡斯蒂利亚诺定理求一高 $h$、跨 $L$、刚接、在横梁中点承受竖向力 $W$ 的对称两铰门式刚架的水平反力，并陈述结果所依赖的假设。
::: solution
由对称性，每个竖向反力为 $W / 2$。取铰处水平反力 $H$ 为多余未知力：
$$
\frac{\partial U}{\partial H} = \frac{1}{E I} \int M \frac{\partial M}{\partial H} \mathrm{d} s = 0 .
$$
每根柱上 $M = H y$、$\partial M / \partial H = y$；梁上 $M = H h - W x / 2$、$\partial M / \partial H = h$。于是
$$
2 \int_0^h H y^{2} \mathrm{d} y + 2 \int_0^{L / 2} \left( H h - \frac{W x}{2} \right) h \, \mathrm{d} x = 0 ,
$$
$$
\frac{2 H h^{3}}{3} + H h^{2} L - \frac{W h L^{2}}{8} = 0
\quad\Longrightarrow\quad
H = \frac{3 W h L^{2}}{8 \left( 2 h^{3} + 3 h^{2} L \right)}
= \frac{3 W L^{2}}{8 h \left( 2 h + 3 L \right)} .
$$
**假设：**线弹性材料；小挠度，故平衡写在未变形几何上；各杆 $E I$ 均匀；梁柱刚接、传弯矩不转动；杆件轴向刚性，故无轴向压缩引起的侧移；无支座沉降。

**评论。** 这些假设在真实建筑框架中无一成立。节点是半刚性的，杆件不是轴向刚性的，载荷是不对称的，基础会沉降，整个结构还会侧移。这就是为什么框架设计在方案阶段用近似方法、在施工图阶段用矩阵分析，也是为什么刚架问题的答案是取决于相对刚度的力的**分布**，而不是静力学给出的单个数值。拱也是如此：其推力完全依赖铰不张开的假设，$10\ \mathrm{m}$ 跨的铰张开 $5\ \mathrm{mm}$，推力就变化几十个百分点。
:::
:::
