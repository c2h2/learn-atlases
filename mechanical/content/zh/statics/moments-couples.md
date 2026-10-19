两个人推一扇门。一个在把手处垂直于门面推，门轻松转动。另一个用同样大的力在靠近铰链处垂直于门面推，门几乎不动。在把手处**沿着**门面推，则什么也不会发生。单凭力不能描述推的转动效应；你需要力以及它作用在哪里。把两者结合起来的量是**力矩**，而合力为零但转动效应不为零的特殊情形是**力偶**。

力矩是扳手要做长的原因，是离合器做成远离轴线的一组小力而不是靠近轴线的一个大力、跳板做成悬臂而不是简支、船的复原作用取决于浮力的水平移动而不是其大小的原因。力矩也是把前两章的质点静力学变成真实结构静力学的那一步，因为真实物体有大小，其上的力不汇交。

::: warning 力矩不是焦耳
牛顿米和焦耳量纲相同，都是 $\mathrm{kg\,m^{2}\,s^{-2}}$，却永远不是一回事。功是**标量**——力与位移的点积——而力矩是**矢量**（在平面内是有正负的标量）——位置与力的叉积。把 $100\ \mathrm{N\,m}$ 的螺栓扭矩写成 $100\ \mathrm{J}$ 是范畴错误，这就是扭矩按惯例以牛顿米计、绝不以焦耳计的原因。这个区分不是迂腐：拧紧到 $100\ \mathrm{N\,m}$ 的螺栓大约储存 $25\ \mathrm{J}$ 弹性应变能，在设计计算中把这两个数字混为一谈，答案会错出四倍。
:::

## 力对点的矩

::: definition 力矩 {#def-moment}
设力 $\mathbf{F}$ 作用于点 $P$，$O$ 为任一点，从 $O$ 到 $P$ 的位置矢量为 $\mathbf{r}$。**$\mathbf{F}$ 对 $O$ 的矩**是矢量
$$
\mathbf{M}_O = \mathbf{r} \times \mathbf{F}, \qquad M_O = r F \sin\theta ,
$$
其中 $\theta$ 是把 $\mathbf{r}$ 与 $\mathbf{F}$ 的起点放在一起时从 $\mathbf{r}$ 到 $\mathbf{F}$ 的角。力矩垂直于包含 $O$ 和 $\mathbf{F}$ 作用线的平面，指向由右手定则给出。其大小为 $M_O = F d$，其中 $d = r \sin\theta$ 是**力臂**——从 $O$ 到作用线的垂直距离。SI 单位是牛顿米，$\mathrm{N\,m}$。
:::

两个事实随之立即成立并被不断使用。第一，只有 $\mathbf{F}$ 垂直于 $\mathbf{r}$ 的分量有贡献：沿指向 $O$ 的直线作用的力对 $O$ 没有矩。第二，力臂 $d$ 可以由从 $O$ 向作用线所作的**任意**垂线求得，而这往往是最快的途径：把力沿自身作用线滑动到最好相乘的位置。

::: proposition 力矩是滑移矢量属性；可传性 {#prop-transmissibility}
力对固定点 $O$ 的矩，在力沿其自身作用线移到任何位置时不变。因此，作用于**刚体**的力可以作为滑移矢量处理，在其作用线的任何一点上替换而不改变对该物体的外部效应。这就是**力的可传性原理**。它对物体内力或变形**不**成立，对柔性物体也不成立。
:::

::: proof
把作用点从 $P$ 移到同一作用线上的 $P'$，于是新的位置矢量为 $\mathbf{r}' = \mathbf{r} + \lambda \mathbf{F}$，$\lambda$ 为某标量。则
$$
\mathbf{M}_O' = \mathbf{r}' \times \mathbf{F} = (\mathbf{r} + \lambda \mathbf{F}) \times \mathbf{F}
= \mathbf{r} \times \mathbf{F} + \lambda\, \mathbf{F} \times \mathbf{F}
= \mathbf{r} \times \mathbf{F} ,
$$
因为任何矢量与自身的叉积为零。刚体的外部效应完全由合力和对一点的合力矩描述，两者都不变，所以物体的平衡和刚体运动不受影响。内力确实会变：沿杆轴在一端推使杆受压，在另一端推使杆受拉，而两者给出相同的外力-力偶系。因此变形不在可传性适用范围之内，缆索也是——缆索上的作用点决定其形状。
:::

::: example 扳手对螺栓的扭矩 {#ex-spanner}
一个技工在长 $0.25\ \mathrm{m}$ 的扳手末端施加 $250\ \mathrm{N}$ 的力。力与扳手柄成 $60^\circ$。对螺栓轴线的矩是多少？在什么角度下矩最大？
::: solution
对螺栓轴线 $O$ 取矩，$\mathbf{r}$ 沿柄，$r = 0.25\ \mathrm{m}$：
$$
M_O = r F \sin\theta = 0.25 \times 250 \times \sin 60^\circ = 62.5 \times 0.866 = 54.1\ \mathrm{N\,m}.
$$
等价地，分解该力：垂直于柄的分量 $250 \sin 60^\circ = 216.5\ \mathrm{N}$，力臂 $0.25\ \mathrm{m}$，得 $54.1\ \mathrm{N\,m}$；沿柄的分量 $250 \cos 60^\circ = 125\ \mathrm{N}$，力臂为零，除了无用地弯曲螺栓杆之外什么也不贡献。

当 $\sin\theta = 1$，即 $\theta = 90^\circ$ 时矩最大，得 $M_{\max} = 62.5\ \mathrm{N\,m}$。以 $60^\circ$ 而不是垂直推损失可用扭矩的 $13\%$，以 $30^\circ$ 推损失一半。

**合理性检验。**$54\ \mathrm{N\,m}$ 是普通轿车轮毂轴承的典型扭矩；技工单手在 $0.25\ \mathrm{m}$ 长的杆上加 $250\ \mathrm{N}$ 恰好是达到它的正确量级。答案在 $0$ 到 $62.5\ \mathrm{N\,m}$ 之间，正如应当，其单位是力乘长度，不是力。
:::
:::

## 伐里农定理与力矩的计算

::: theorem 伐里农（Varignon）定理（合力矩定理） {#thm-varignon}
若干汇交力的合力对点 $O$ 的矩，等于各分力对 $O$ 的矩的矢量和：
$$
\mathbf{r} \times (\mathbf{F}_1 + \mathbf{F}_2 + \cdots + \mathbf{F}_n)
= \mathbf{r} \times \mathbf{F}_1 + \mathbf{r} \times \mathbf{F}_2 + \cdots + \mathbf{r} \times \mathbf{F}_n .
$$
更一般地，对作用于不同点的力，力系的合力对任一点的矩等于力系各成员对该点之矩的和——只要把合力放在正确的作用线上。
:::

::: proof
这个结果就是叉积的分配律逐项应用：
$$
\mathbf{r} \times \textstyle \sum_i \mathbf{F}_i
= \mathbf{r} \times \left( \sum_i F_{ix} \mathbf{i} + F_{iy} \mathbf{j} + F_{iz} \mathbf{k} \right)
= \textstyle \sum_i \left( \mathbf{r} \times F_{ix} \mathbf{i} + \mathbf{r} \times F_{iy} \mathbf{j} + \mathbf{r} \times F_{iz} \mathbf{k} \right)
= \textstyle \sum_i \mathbf{r} \times \mathbf{F}_i ,
$$
用到叉积行列式定义的双线性。对非汇交力，取作用于 $Q$ 点的 $\sum \mathbf{F}_i$ 之矩与作用于 $P_i$ 的各力 $\mathbf{F}_i$ 之矩：
$$
\sum_i \mathbf{r}_i \times \mathbf{F}_i = \mathbf{r}_Q \times \sum_i \mathbf{F}_i + \sum_i (\mathbf{r}_i - \mathbf{r}_Q) \times \mathbf{F}_i ,
$$
当且仅当 $Q$ 取在合力的作用线上时第二项消失，这就是“正确的作用线”的含义。伐里农定理正是日常捷径——把力分解为分量并相加其矩——的合法性来源，这一步本来是无据可依的。
:::

伐里农定理就是实用方法。在二维中，$O$ 在原点，力 $(F_x, F_y)$ 作用于 $(x, y)$，$\mathbf{r} \times \mathbf{F}$ 的 $z$ 分量是标量
$$
M_O = x F_y - y F_x ,
$$
逆时针为正。平面问题中的每个力都可以用这一行式子处理，它免去了关于力在点哪一侧的全部几何争论。

::: example 平面内的伐里农定理 {#ex-varignon}
三个力作用于三角板。$\mathbf{F}_1 = (60, 40)\ \mathrm{N}$ 作用于 $(0, 0.3)\ \mathrm{m}$，$\mathbf{F}_2 = (-30, 50)\ \mathrm{N}$ 作用于 $(0.4, 0)\ \mathrm{m}$，$\mathbf{F}_3 = (20, -20)\ \mathrm{N}$ 作用于 $(0.4, 0.3)\ \mathrm{m}$。求合力及其对原点 $O$ 的矩。
::: solution
分量相加：
$$
R_x = 60 - 30 + 20 = 50\ \mathrm{N}, \qquad
R_y = 40 + 50 - 20 = 70\ \mathrm{N}, \qquad
R = \sqrt{50^{2} + 70^{2}} = 86.0\ \mathrm{N}
$$
方向在 $x$ 轴上方 $\theta = \arctan(70 / 50) = 54.5^{\circ}$。再求矩，对每个力用 $M_O = x F_y - y F_x$：
$$
M_1 = 0 \times 40 - 0.3 \times 60 = -18.0\ \mathrm{N\,m},
$$
$$
M_2 = 0.4 \times 50 - 0 \times (-30) = +20.0\ \mathrm{N\,m},
$$
$$
M_3 = 0.4 \times (-20) - 0.3 \times 20 = -8.0 - 6.0 = -14.0\ \mathrm{N\,m}.
$$
$$
M_O = -18.0 + 20.0 - 14.0 = -12.0\ \mathrm{N\,m},
$$
即顺时针 $12.0\ \mathrm{N\,m}$。

**合理性检验。**用几何法重算 $M_3$：$-20\ \mathrm{N}$ 的水平分量力臂 $0.3\ \mathrm{m}$，绕 $O$ 顺时针转（$-6.0\ \mathrm{N\,m}$）；$-20\ \mathrm{N}$ 的竖直分量力臂 $0.4\ \mathrm{m}$，也顺时针转（$-8.0\ \mathrm{N\,m}$）；合计 $-14.0\ \mathrm{N\,m}$。一致。这类问题的全部难点在符号，而 $x F_y - y F_x$ 不辩自明。
:::
:::

## 对指定轴的矩

::: definition 力对轴的矩（三重积） {#def-axis-moment}
力对过 $O$、沿单位矢量 $\mathbf{u}$ 方向的**直线**的矩，是 $\mathbf{M}_O$ 沿该直线的分量，
$$
M_{\mathbf{u}} = \mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})
= \begin{vmatrix} u_x & u_y & u_z \\ r_x & r_y & r_z \\ F_x & F_y & F_z \end{vmatrix} ,
$$
其中 $\mathbf{r}$ 从轴上**任意**一点画到力作用线上任意一点。它是一个标量，符号由 $\mathbf{u}$ 的指向决定，度量的是物体**绕该轴**转动的趋势——若物体被铰接于该轴，这是它唯一能用到的分量。
:::

::: proposition 力对轴的矩与所选的点无关 {#prop-axis-invariant}
把 $\mathbf{r}$ 的起点沿轴移到任何位置，或把终点沿 $\mathbf{F}$ 的作用线移到任何位置，$M_{\mathbf{u}} = \mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})$ 都不变。
:::

::: proof
把起点沿轴移动 $\lambda \mathbf{u}$：改变量为 $\mathbf{u} \cdot (\lambda \mathbf{u} \times \mathbf{F}) = \lambda\, \mathbf{F} \cdot (\mathbf{u} \times \mathbf{u}) = 0$。把终点沿作用线移动 $\mu \mathbf{F}$：改变量为 $\mathbf{u} \cdot (\mu \mathbf{F} \times \mathbf{F}) = \mu\, \mathbf{F} \cdot (\mathbf{u} \times \mathbf{F}) = 0$，因为 $\mathbf{u} \times \mathbf{F}$ 垂直于 $\mathbf{F}$。实际中两个不变性都需要：它们意味着你可以任选轴上一点和力上一点，只要代数上方便，这就是标量三重积通常比先叉积再点积更容易的原因。
:::

::: example 对对角轴的矩 {#ex-axis}
力 $\mathbf{F} = (30, -20, 50)\ \mathrm{N}$ 作用于 $P(2, 3, 1)\ \mathrm{m}$。求它对从 $A(0, 0, 0)$ 到 $B(1, 2, 2)\ \mathrm{m}$ 的轴的矩，以及对 $x$ 轴的矩。
::: solution
轴方向为 $\mathbf{u}_{AB} = (\mathbf{i} + 2 \mathbf{j} + 2 \mathbf{k}) / \sqrt{1 + 4 + 4} = (0.333, 0.667, 0.667)$。取 $\mathbf{r}$ 从 $A$ 到 $P$：$\mathbf{r} = (2, 3, 1)\ \mathrm{m}$。先算
$$
\mathbf{M}_A = \mathbf{r} \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & 3 & 1 \\ 30 & -20 & 50 \end{vmatrix}
= (3 \times 50 - 1 \times (-20)) \mathbf{i} - (2 \times 50 - 1 \times 30) \mathbf{j} + (2 \times (-20) - 3 \times 30) \mathbf{k}
$$
$$
\mathbf{M}_A = 170 \mathbf{i} - 70 \mathbf{j} - 130 \mathbf{k} \quad \mathrm{N\,m}.
$$
于是
$$
M_{AB} = \mathbf{u}_{AB} \cdot \mathbf{M}_A
= \frac{1 \times 170 + 2 \times (-70) + 2 \times (-130)}{3}
= \frac{170 - 140 - 260}{3} = -76.7\ \mathrm{N\,m}.
$$
负号表示该力有绕 $A \to B$ 指向顺时针转动物体的趋势。对 $x$ 轴，$\mathbf{u} = \mathbf{i}$，立即得 $M_x = 170\ \mathrm{N\,m}$。

**合理性检验。**$|M_{AB}| = 76.7\ \mathrm{N\,m}$ 不能大于 $|\mathbf{M}_A| = \sqrt{170^{2} + 70^{2} + 130^{2}} = 224.5\ \mathrm{N\,m}$，因为分量不能超过矢量本身；它是后者的 $34\%$，对一个不与 $\mathbf{M}_A$ 一致的轴来说是合理的。改用从 $B$ 出发的 $\mathbf{r}$ 重算得到同样的 $-76.7\ \mathrm{N\,m}$，正如命题保证的那样。
:::
:::

## 力偶

::: definition 力偶 {#def-couple}
**力偶**是大小相等、指向相反、沿两条平行而不重合的直线作用的一对力。其合力为零，而对空间中**每个**点的矩都相同：
$$
\mathbf{M} = \mathbf{r}_A \times \mathbf{F} + \mathbf{r}_B \times (-\mathbf{F}) = (\mathbf{r}_A - \mathbf{r}_B) \times \mathbf{F} = \mathbf{d} \times \mathbf{F},
\qquad M = F d ,
$$
其中 $\mathbf{d}$ 从第二个力的作用线指向第一个力的作用线，$d$ 是两作用线之间的垂直距离，即力偶的**偶臂**。因此力偶是**自由矢量**：它可以施加在任何位置、取任何保持其矢量不变的方位，都产生同样的转动效应。它的矩称为力偶的**扭矩**。
:::

::: proof
设 $\mathbf{F}$ 作用于 $A$，$-\mathbf{F}$ 作用于 $B$。合力为 $\mathbf{F} + (-\mathbf{F}) = \mathbf{0}$。对任一点 $O$ 的矩为
$$
\mathbf{M}_O = \mathbf{r}_A \times \mathbf{F} + \mathbf{r}_B \times (-\mathbf{F})
= (\mathbf{r}_A - \mathbf{r}_B) \times \mathbf{F} = \mathbf{d} \times \mathbf{F},
$$
其中不含 $O$——矢量 $\mathbf{r}_A - \mathbf{r}_B = \mathbf{d}$ 仅由两条作用线决定。因为对每个点的矩都相同，没有任何单个力能与力偶等效（力对其自身作用线上的点矩为零，力偶的矩从不为零），而力偶只能由另一个大小相等、转向相反的力偶来平衡。力偶矩矢量相同的两个力偶完全等效，无论它们的力和偶臂如何：$200\ \mathrm{N}$ 乘 $0.15\ \mathrm{m}$ 与 $20\ \mathrm{N}$ 乘 $1.5\ \mathrm{m}$ 对刚体来说是同一回事。
:::

::: example 力偶作为自由矢量相加 {#ex-couples}
一个管道弯头受两个力偶作用：绕 $x$ 轴的 $M_1 = 300\ \mathrm{N\,m}$，以及绕 $xy$ 平面内与 $x$ 轴成 $30^\circ$ 的轴的 $M_2 = 400\ \mathrm{N\,m}$。求合力偶。
::: solution
因为力偶是自由矢量，它们按普通矢量加法相加。写出
$$
\mathbf{M}_1 = 300\, \mathbf{i}\ \mathrm{N\,m}, \qquad
\mathbf{M}_2 = 400 (\cos 30^\circ\, \mathbf{i} + \sin 30^\circ\, \mathbf{j}) = 346.4\, \mathbf{i} + 200.0\, \mathbf{j}\ \mathrm{N\,m},
$$
$$
\mathbf{M} = 646.4\, \mathbf{i} + 200.0\, \mathbf{j}\ \mathrm{N\,m}, \qquad
M = \sqrt{646.4^{2} + 200.0^{2}} = 676\ \mathrm{N\,m}
$$
方向在 $xy$ 平面内与 $x$ 轴成 $\arctan(200 / 646.4) = 17.2^{\circ}$。

**合理性检验。**结果介于代数和 $700\ \mathrm{N\,m}$ 与矢量差 $100\ \mathrm{N\,m}$ 之间，且更接近代数和，因为两个力偶之间只差 $30^\circ$。若两者垂直，答案将恰好是 $\sqrt{300^{2} + 400^{2}} = 500\ \mathrm{N\,m}$。
:::
:::

::: widget plot
f: 400*sin(x*pi/180)
x: 0, 180
y: 0, 420
labels: \text{力偶的矩，} M = Fd\sin\theta
caption: 两个相距 $0.15\ \mathrm{m}$ 的 $400\ \mathrm{N}$ 力组成的力偶之矩，对连接两作用线的偶臂与力本身之间夹角 $\theta$ 的曲线。最大值 $60\ \mathrm{N\,m}$ 在 $\theta = 90^\circ$；$30^\circ$ 时矩为 $30\ \mathrm{N\,m}$；$0^\circ$ 时两力共线，力偶消失。这就是螺栓分布圆、离合器摩擦片和法兰螺栓按其承载的**垂直**间距来定尺寸的原因。
:::

## 把力系向一点简化为一个力和一个力偶

无论多么复杂，作用在刚体上的任何力系都可以在不改变外部效应的前提下，用一个任意选定的点 $O$ 处的单个力 $\mathbf{F}_R$ 和单个力偶 $\mathbf{M}_{R,O}$ 代替。这一简化是刚体静力学的代数骨架，是 [[solid-mechanics/stress-strain-3d]] 中截面分析的基础，也是应力张量定义的基础。

::: proposition 力系的简化 {#prop-reduction}
作用于点 $P_i$ 的力系 $\mathbf{F}_i$ 外部等效于
$$
\mathbf{F}_R = \sum_i \mathbf{F}_i , \qquad
\mathbf{M}_{R,O} = \sum_i \mathbf{r}_i \times \mathbf{F}_i ,
$$
即一个作用于 $O$ 的力加一个力偶。把简化中心从 $O$ 改为 $O'$，力偶变为
$$
\mathbf{M}_{R,O'} = \mathbf{M}_{R,O} + \mathbf{r}_{O \to O'} \times \mathbf{F}_R ,
$$
而 $\mathbf{F}_R$ 保持不变。两个推论：$\mathbf{M}_{R}$ 沿 $\mathbf{F}_R$ 的分量，称为**扭转**或**螺距**分量，与 $O$ 无关；并且总存在某个点（三维中是整整一条点线），在该点力偶垂直于 $\mathbf{F}_R$ 的分量消失，于是力系简化为**力螺旋**——一个力和一个与之平行的力偶。
:::

::: proof
用可传性加上在 $O$ 处插入 $+\mathbf{F}_i$ 与 $-\mathbf{F}_i$ 的标准技巧，把每个力 $\mathbf{F}_i$ 移到 $O$：这就得到作用于 $O$ 的力 $\mathbf{F}_i$ 加上力偶 $\mathbf{r}_i \times \mathbf{F}_i$。对 $i$ 求和即得所述的力-力偶对，对刚体而言这种等效是精确的。对换点，写 $\mathbf{r}_i' = \mathbf{r}_i - \mathbf{a}$，其中 $\mathbf{a} = \mathbf{r}_{O \to O'}$；则
$$
\mathbf{M}_{R,O'} = \sum_i (\mathbf{r}_i - \mathbf{a}) \times \mathbf{F}_i
= \mathbf{M}_{R,O} - \mathbf{a} \times \mathbf{F}_R = \mathbf{M}_{R,O} + \mathbf{a} \times \mathbf{F}_R \cdot(-1) \cdot(-1) = \mathbf{M}_{R,O} + \mathbf{r}_{O' \to O} \times \mathbf{F}_R .
$$
与单位矢量 $\hat{\mathbf{F}}_R$ 作点积得 $\mathbf{M}_{R,O'} \cdot \hat{\mathbf{F}}_R = \mathbf{M}_{R,O} \cdot \hat{\mathbf{F}}_R + (\mathbf{r}_{O' \to O} \times \mathbf{F}_R) \cdot \hat{\mathbf{F}}_R$，最后一项为零，因为 $\mathbf{r} \times \mathbf{F}_R$ 垂直于 $\mathbf{F}_R$；所以扭转分量不变。最后，取一个沿垂直于 $\mathbf{F}_R$ 方向偏移 $\mathbf{a}$ 的点，使 $\mathbf{a} \times \mathbf{F}_R = -\mathbf{M}_{\perp}$；这样的 $\mathbf{a}$ 存在且在沿 $\mathbf{F}_R$ 移动的意义下唯一，即 $\mathbf{a} = \mathbf{M}_{\perp} \times \hat{\mathbf{F}}_R / F_R$，这就证明了力螺旋形式和那条点线。
:::

::: example 把平面力系简化为一个力和一个力偶，再简化为一个力 {#ex-reduce}
三个力作用于支架：$\mathbf{F}_1 = (40, 30)\ \mathrm{N}$ 作用于 $(0, 0.20)\ \mathrm{m}$，$\mathbf{F}_2 = (-20, 10)\ \mathrm{N}$ 作用于 $(0.30, 0)\ \mathrm{m}$，$\mathbf{F}_3 = (10, -40)\ \mathrm{N}$ 作用于 $(0.20, 0.25)\ \mathrm{m}$。把力系向原点 $O$ 简化；然后把它化为一个力，并指出它作用在哪里。
::: solution
**合力。**
$$
R_x = 40 - 20 + 10 = 30\ \mathrm{N}, \qquad R_y = 30 + 10 - 40 = 0\ \mathrm{N}, \qquad
\mathbf{F}_R = 30\ \mathrm{N}\ \text{沿} + x .
$$
**$O$ 处的合力偶**，用 $M_O = x F_y - y F_x$：
$$
M_O = [0 \times 30 - 0.20 \times 40] + [0.30 \times 10 - 0] + [0.20 \times (-40) - 0.25 \times 10]
$$
$$
= -8.0 + 3.0 - 10.5 = -15.5\ \mathrm{N\,m}.
$$
所以在 $O$ 处，该力系是一个沿 $+x$ 方向的 $30\ \mathrm{N}$ 的力加上顺时针 $15.5\ \mathrm{N\,m}$ 的力偶。

**单个等效力。**因为 $\mathbf{F}_R \neq \mathbf{0}$，可以把力移出 $O$ 来消去力偶。把力放在直线 $y = y_0$ 上，它对 $O$ 的矩为 $-y_0 R_x$：
$$
-y_0 \times 30 = -15.5 \quad\Longrightarrow\quad y_0 = 0.517\ \mathrm{m}.
$$
因此整个力系等效于一个沿直线 $y = 0.517\ \mathrm{m}$ 作用的水平力 $30\ \mathrm{N}$，该直线在支架每一点之上。

**合理性检验。**对新作用线上的点 $(0.5, 0.517)$ 取矩：该力在此处矩为零，原来的三个力给出 $M = -8.0 + 3.0 - 10.5 + 0.517 \times 30 - 0.5 \times 0 = -15.5 + 15.5 = 0$。正确——单个力对其自身作用线上每一点的矩为零。
:::
:::

::: warning 力偶不能被一个力平衡
学生常常把 $\sum M = 0$ 和 $\sum F = 0$ 写得好像一个蕴含另一个，并试图用一个力来“抵消”一个力偶。它们是独立的条件：力偶合力为零而矩不为零，所以没有任何力在 $\sum \mathbf{F}$ 中对其平衡有贡献，$\sum \mathbf{F}$ 中也不出现无合力的力偶。当问题中出现力偶矩——电机的扭矩反作用、螺栓的预紧、焊接接头承受的力矩——只把它写进力矩方程，并且带符号写，而不是只写大小。还要记住，写 $\sum M = 0$ 时力偶可以**对任意**一点计入，这是单个力没有的自由度。
:::

::: history
伐里农（Varignon）定理出现在他1687年的《新力学纲要》（*Projet d'une nouvelle méchanique*）中，与牛顿（Newton）的《原理》同年出版却远少有人读；伐里农1722年去世，完整的《关于重力的新猜想》（*Nouvelles conjectures sur la pesanteur*）在其身后出版。这一定理在实质上斯台文（Stevin）和伽利略（Galileo）已经知道，但伐里农用分量给出的表述沿用至今，欧拉（Euler）与丹尼尔·伯努利（Daniel Bernoulli）在1750年代把它纳入解析力学。力偶的概念及其矩与取矩点无关的证明，属于潘索（Poinsot）1808年的《静力学教程》（*Éléments de statique*）与1834年的《物体旋转新理论》（*Théorie nouvelle de la rotation des corps*），后者给出了把任意力系简化为力螺旋，以及潘索椭与中心轴的几何图像。该简化中的“中心轴”正是力螺旋形式成立的那条点线，至今仍是表述一般载荷系对刚体作用的最简洁方式。
:::

::: quiz
一个大小为 $F$ 的力作用在距 $O$ 为 $r$ 处。哪种改变使对 $O$ 的矩最大？
- [ ] 把 $F$ 加倍
- [x] 把力臂 $d$ 加倍
- [ ] 把 $F$ 减半并把 $r$ 加倍
- [ ] 把力转到沿径向
::: solution
矩是 $M = F d$，所以把力臂加倍就把矩加倍，与把力加倍完全一样——两者等价，任一个都使 $M$ 加倍。若力保持垂直，把 $F$ 减半、$r$ 加倍则 $M$ 不变；把力转到径向则 $d = 0$，矩为零。教训是力和力臂在 $M = Fd$ 中对称地进入：就刚体平衡而言，长杠杆上的小力与短杠杆上的大力无法区分。这就是阿基米德（Archimedes）杠杆的全部内容，也是 $0.5\ \mathrm{m}$ 杆上 $400\ \mathrm{N}$ 的拉力超过 $0.15\ \mathrm{m}$ 杆上 $1000\ \mathrm{N}$ 拉力的原因。
:::
:::

## 后续内容

力矩是一个物体需要六个平衡方程而不是三个的原因，这是 [[statics/rigid-body-equilibrium]]。内部力矩在梁和轴中成为弯矩和扭矩，在 [[statics/centroids-distributed-loads]]、[[mechanics-of-materials/bending-stress]] 与 [[mechanics-of-materials/torsion]] 中处理。力对轴的矩是轴承能约束什么、不能约束什么，而把载荷系向一点简化为一个力和一个力偶正是内部应力合力的定义，用于 [[solid-mechanics/stress-strain-3d]] 并贯穿 [[mechanics-of-materials/stress-transformation]]。

::: summary
- 力对点的矩是 $\mathbf{M}_O = \mathbf{r} \times \mathbf{F}$，大小为 $F d$，其中 $d$ 是从该点到作用线的垂直距离；单位是牛顿米。
- 力可以沿自身作用线滑移而不改变其对固定点的矩（可传性），但这不适用于内力和变形。
- 伐里农定理允许把力分解为分量并相加其矩；平面内 $M_O = x F_y - y F_x$，逆时针为正。
- 力对轴的矩是标量三重积 $\mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})$，与在轴和作用线上选哪些点无关。
- 力偶合力为零，对每个点的矩相同；力偶是自由矢量，按矢量相加。
- 任何力系都可向选定点简化为力 $\mathbf{F}_R$ 与力偶 $\mathbf{M}_{R,O}$；力偶随简化中心改变，但力偶沿 $\mathbf{F}_R$ 的分量不变，并且总有一处力系可简化为力螺旋。
:::

## 习题

::: exercise 力的矩 {level=1 check="54"}
一个 $180\ \mathrm{N}$ 的力垂直作用于 $0.30\ \mathrm{m}$ 长手柄的末端。对另一端转轴的矩是多少？（答案以 $\mathrm{N\,m}$ 计。）
::: solution
$M_O = F d = 180 \times 0.30 = 54\ \mathrm{N\,m}$。因为力垂直于手柄，力臂就是手柄全长；把力倾斜 $30^\circ$ 会使矩减为 $54 \cos 30^\circ = 46.8\ \mathrm{N\,m}$。
:::
:::

::: exercise 空间力的矩 {level=1 check="44.8"}
力 $\mathbf{F} = (10, -8, 12)\ \mathrm{N}$ 作用于点 $(2, 1, 3)\ \mathrm{m}$。其对原点之矩的大小是多少？（答案以 $\mathrm{N\,m}$ 计。）
::: solution
$$
\mathbf{M}_O = \mathbf{r} \times \mathbf{F}
= \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & 1 & 3 \\ 10 & -8 & 12 \end{vmatrix}
= (1 \times 12 - 3 \times (-8)) \mathbf{i} - (2 \times 12 - 3 \times 10) \mathbf{j} + (2 \times (-8) - 1 \times 10) \mathbf{k}
$$
$$
= 36\, \mathbf{i} + 6\, \mathbf{j} - 26\, \mathbf{k}\ \mathrm{N\,m},
\qquad
M_O = \sqrt{36^{2} + 6^{2} + 26^{2}} = \sqrt{2008} = 44.8\ \mathrm{N\,m}.
$$
对 $x$ 轴的矩是 $36\ \mathrm{N\,m}$，对 $y$ 轴是 $6\ \mathrm{N\,m}$，对 $z$ 轴是 $-26\ \mathrm{N\,m}$。
:::
:::

::: exercise 力偶 {level=1 check="12"}
两个 $60\ \mathrm{N}$ 的力沿相距 $0.20\ \mathrm{m}$ 的两条平行直线反向作用。力偶的矩是多少？（答案以 $\mathrm{N\,m}$ 计。）
::: solution
$M = F d = 60 \times 0.20 = 12\ \mathrm{N\,m}$，对每个点都相同。把力加倍、偶臂减半得到同样的力偶：$120 \times 0.10 = 12\ \mathrm{N\,m}$。这就是大直径、多块小压块的离合器与小直径、单块大压块的离合器传递相同扭矩而磨损率更低的原因。
:::
:::

::: exercise 伐里农定理 {level=2}
四个力作用于 $0.6\ \mathrm{m} \times 0.4\ \mathrm{m}$ 的矩形板：左下角 $(50, 0)\ \mathrm{N}$，右下角 $(0, 40)\ \mathrm{N}$，右上角 $(-30, 0)\ \mathrm{N}$，左上角 $(0, -20)\ \mathrm{N}$，原点取在左下角。求合力及其对原点的矩，并确定作用线。
::: solution
$$
R_x = 50 - 30 = 20\ \mathrm{N}, \qquad R_y = 40 - 20 = 20\ \mathrm{N}, \qquad
F_R = \sqrt{20^{2} + 20^{2}} = 28.3\ \mathrm{N}
$$
方向 $45^\circ$。矩，用 $M_O = x F_y - y F_x$：
$$
M_O = [0 - 0] + [0.6 \times 40 - 0] + [0.6 \times 0 - 0.4 \times (-30)] + [0 - 0.4 \times 0]
= 24.0 + 12.0 = 36.0\ \mathrm{N\,m}.
$$
合力作用线到原点的垂直距离为 $d = M_O / F_R = 36.0 / 28.3 = 1.27\ \mathrm{m}$，在逆时针一侧。把该直线写成 $y = x + c$（斜率为 1），力 $(20, 20)$ 作用在其上任意处对原点的矩为 $x \times 20 - y \times 20 = -20 c$，所以 $-20 c = 36.0$，$c = -1.80\ \mathrm{m}$：直线为 $y = x - 1.80$，远在板外。

作用线落在物体之外是正常而重要的——这正是使高而窄的物体倾覆的情形。
:::
:::

::: exercise 力对轴的矩 {level=2 check="-76.7"}
力 $\mathbf{F} = (30, -20, 50)\ \mathrm{N}$ 作用于 $P(2, 3, 1)\ \mathrm{m}$。求对从 $A(0, 0, 0)$ 到 $B(1, 2, 2)\ \mathrm{m}$ 的轴的矩。（答案以 $\mathrm{N\,m}$ 计，带符号。）
::: solution
$\mathbf{u}_{AB} = (1, 2, 2) / 3$，$\mathbf{r} = \vec{AP} = (2, 3, 1)\ \mathrm{m}$，$\mathbf{M}_A = \mathbf{r} \times \mathbf{F} = (170, -70, -130)\ \mathrm{N\,m}$。于是
$$
M_{AB} = \mathbf{u}_{AB} \cdot \mathbf{M}_A = \frac{170 - 140 - 260}{3} = -76.7\ \mathrm{N\,m}.
$$
改用 $\mathbf{r} = \vec{BP} = (1, 1, -1)$ 重算得到同样的值，证实了不变性。对 $A$ 的总矩大小为 $224.5\ \mathrm{N\,m}$，其中只有 $34\%$ 可用于对角轴；其余由轴的轴承承受。
:::
:::

::: exercise 向力螺旋简化 {level=2}
某力系在 $O$ 处简化为 $\mathbf{F}_R = (60, 0, 80)\ \mathrm{N}$ 与 $\mathbf{M}_{R,O} = (30, 40, -22.5)\ \mathrm{N\,m}$。求力偶的扭转（螺距）分量，以及使力系简化为单个力的那条点线。
::: solution
$F_R = \sqrt{60^{2} + 80^{2}} = 100\ \mathrm{N}$，所以 $\hat{\mathbf{F}} = (0.6, 0, 0.8)$，
$$
M_\parallel = \hat{\mathbf{F}} \cdot \mathbf{M}_{R,O}
= 0.6 \times 30 + 0 \times 40 + 0.8 \times (-22.5) = 18.0 - 18.0 = 0\ \mathrm{N\,m}.
$$
力偶完全垂直于力，所以该力系根本不是力螺旋，而是一个单力。因为 $\mathbf{M} \cdot \mathbf{F} = 0$，从 $O$ 到作用线的位移 $\mathbf{a}$ 满足 $\mathbf{a} \times \mathbf{F}_R = -\mathbf{M}_{R,O}$，由矢量三重积，
$$
\mathbf{a} = \frac{\mathbf{M}_{R,O} \times \mathbf{F}_R}{F_R^{2}} : \qquad
\left( \frac{\mathbf{M} \times \mathbf{F}}{F^{2}} \right) \times \mathbf{F}
= \frac{\mathbf{F}(\mathbf{M} \cdot \mathbf{F}) - \mathbf{M}(\mathbf{F} \cdot \mathbf{F})}{F^{2}} = -\mathbf{M}.
$$
数值上，
$$
\mathbf{M}_{R,O} \times \mathbf{F}_R
= \big( 40 \times 80 - (-22.5) \times 0,\; (-22.5) \times 60 - 30 \times 80,\; 30 \times 0 - 40 \times 60 \big)
= (3200,\; -3750,\; -2400)\ \mathrm{N^{2}m},
$$
$$
\mathbf{a} = (0.320,\; -0.375,\; -0.240)\ \mathrm{m}, \qquad |\mathbf{a}| = 0.541\ \mathrm{m}.
$$
**校核。**$\mathbf{a} \times \mathbf{F}_R = \big( (-0.375)(80) - (-0.240)(0),\; (-0.240)(60) - (0.320)(80),\; (0.320)(0) - (-0.375)(60) \big)$
$$
= (-30.0,\; -14.4 - 25.6,\; 22.5) = (-30.0,\; -40.0,\; 22.5) = -\mathbf{M}_{R,O}.
$$
三个分量都正确。注意 $|\mathbf{a}| = 0.541\ \mathrm{m} = M_\perp / F_R = 54.1 / 100$，正如应当，并且直线 $\mathbf{a} + \lambda \hat{\mathbf{F}}$ 上的每一点同样有效——力的作用线是一条线，不是一个点。
:::
:::

::: exercise 设计：螺栓分布圆 {level=3}
一个法兰联轴器用分布在直径 $150\ \mathrm{mm}$ 圆周上的六个螺栓传递 $500\ \mathrm{N\,m}$。求每个螺栓的剪力。若运行中缺失一个螺栓，其余五个中任意一个的最大受力是多少？
::: solution
**六个螺栓。**法兰刚性、螺栓相同，载荷平均分担，每个承受切向力
$$
F = \frac{T}{n r} = \frac{500}{6 \times 0.075} = 1111\ \mathrm{N}.
$$
**五个螺栓。**平均分担不再成立，因为法兰绕**剩余螺栓组的形心**转动，而每个螺栓中的力正比于它到该中心的距离。把缺失的螺栓放在 $0^\circ$；余下的在 $60^\circ, 120^\circ, 180^\circ, 240^\circ, 300^\circ$，其形心在
$$
\bar{x} = \frac{r}{5} \sum \cos\theta_i = \frac{0.075}{5} (0.5 - 0.5 - 1 - 0.5 + 0.5) = -0.015\ \mathrm{m}, \qquad \bar{y} = 0 .
$$
到这个中心的距离为：缺口旁 $60^\circ$ 与 $300^\circ$ 的两个螺栓 $0.0835\ \mathrm{m}$，$120^\circ$ 与 $240^\circ$ 的 $0.0687\ \mathrm{m}$，$180^\circ$ 的 $0.0600\ \mathrm{m}$，于是
$$
\textstyle \sum d_i^{2} = 2 (0.0835^{2} + 0.0687^{2} + 0.0600^{2}) = 0.03059\ \mathrm{m^{2}} .
$$
刚性板绕形心的扭转给出 $F_i = T d_i / \sum d_j^{2}$，所以最危险的螺栓承受
$$
F_{\max} = \frac{500 \times 0.0835}{0.03059} = 1365\ \mathrm{N},
$$
比六螺栓值高 $23\%$，比朴素的平均值 $500 / (5 \times 0.075) = 1333\ \mathrm{N}$ 高 $2.7\%$。

**设计结论。**六个螺栓中掉一个只使最危险螺栓增大约四分之一，若接头按此额定则可容忍；但载荷现在还是**偏心**的，因为螺栓组中心不再与轴心重合，原本自平衡的法兰现在会弯曲。打算在缺一个螺栓时仍能工作的联轴器，必须按偏心的螺栓组而不是对称的螺栓组来额定。
:::
:::

::: exercise 推导：力对任意点的矩 {level=3}
证明：对作用于距某直线 $x_i$ 处的平行力系 $P_i$，对该直线的矩为 $M = R \bar{x}$，其中 $R = \sum P_i$，$\bar{x} = \sum P_i x_i / \sum P_i$；并用该结果证明：集度 $w$、跨度 $L$ 的均布载荷的合力作用于跨中，大小为 $w L$；从 $0$ 线性增大到 $w$、跨长 $L$ 的三角形载荷的合力作用于距顶点 $2 L / 3$ 处，大小为 $w L / 2$。
::: solution
对垂直于 $x$ 轴的平行力，每个力对基准线的矩为 $P_i x_i$，所以
$$
M = \sum_i P_i x_i = \left( \sum_i P_i \right) \frac{\sum_i P_i x_i}{\sum_i P_i} = R \bar{x} .
$$
也就是说，合力作用在载荷分布的**形心**。过渡到连续情形，$R = \int w(x)\, \mathrm{d}x$，$\bar{x} = \int x\, w(x)\, \mathrm{d}x / \int w(x)\, \mathrm{d}x$，即面积对一次矩除以面积——所以分布载荷的合力等于载荷图下的面积，并作用在其形心。

**均布载荷。**$R = \int_0^L w\, \mathrm{d}x = w L$，$\bar{x} = \int_0^L x w\, \mathrm{d}x / (w L) = (w L^{2} / 2) / (w L) = L / 2$。跨中，正如预期。

**三角形载荷。**取 $w(x) = w x / L$，
$$
R = \int_0^L \frac{w x}{L}\, \mathrm{d}x = \frac{w L}{2}, \qquad
\bar{x} = \frac{\int_0^L x (w x / L)\, \mathrm{d}x}{w L / 2}
= \frac{w L^{2} / 3}{w L / 2} = \frac{2 L}{3}.
$$
从顶点起三分之二处，正是三角形的形心。这两个结果就是每一道梁计算中“用合力代替分布载荷”那一步的全部内容，也是 [[statics/centroids-distributed-loads]] 自成一章的原因：同样的形心代数用于面积和体积，就得到形心、惯性矩以及 [[statics/area-moments]] 所需的截面性质。
:::
:::
