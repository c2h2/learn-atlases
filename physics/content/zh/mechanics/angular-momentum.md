力改变质点的动量。这句话的转动对应并不限于一条固定转轴。质点对选定参考点的**角动量**，是它的动量对该点的矩，而各力对同一点的力矩等于该角动量的变化率。力矩为零时，角动量是运动的一个常量。仅这一句话，就包含了行星运动的面积定律、滑冰者收拢手臂转速变大的道理，以及子弹嵌入悬挂杆后，尽管支轴破坏了通常的动量守恒，问题仍可拿支轴作参考点来处理的理由。

本章先对一个质点、再对一个系统证明力矩与角动量之间的关系，其中包括以质心为参考描述的运动。然后把结果特化到绕对称轴转动的刚体上：这时它收缩为 $L = I\omega$，重新得到 [[mechanics/rotation]]；还对任意中心力导出面积定律。角动量守恒不是能量守恒：滑冰者与子弹两个例子正是为把两者分清而设。取 $g = 9.80\,\mathrm{m/s^2}$。$\mathbf{L}$ 不沿 $\boldsymbol{\omega}$ 的情形留给 [[analytical-mechanics]]。

## 质点的角动量

暂且取一个固定的原点 $O$，设 $\mathbf{r}$ 是质点相对 $O$ 的位置，设 $\mathbf{p} = m\mathbf{v}$ 为它的动量。

::: definition 质点的角动量 {#def-L}
质点对原点 $O$ 的**角动量**是

$$
\mathbf{L} = \mathbf{r}\times\mathbf{p} = \mathbf{r}\times m\mathbf{v}.
$$ {#eq-L-def}

其大小为 $L = mvr\sin\phi = mv\,r_\perp$，其中 $\phi$ 是 $\mathbf{r}$ 与 $\mathbf{v}$ 的夹角，$r_\perp = r\sin\phi$ 是 $O$ 到速度所在直线的垂直距离。方向由右手定则确定。原点属于定义的一部分：换一个点，就得到一个不同的 $\mathbf{L}$。
:::

若速度与位置垂直，则 $\sin\phi = 1$，$L = mvr$。若速度径直指向原点、或径直背离原点，则 $\sin\phi = 0$，虽然质点在运动，却有 $\mathbf{L} = \mathbf{0}$。除了我们测量所依据的点、或 $\mathbf{v}$ 相对该点的方向，质点本身没有任何改变。角动量不像质量那样，是质点随身自带的一种属性。

在平面内，把 $O$ 取为坐标原点，唯一的分量是垂直纸面向外的这一个，

$$
L_z = m(xv_y - yv_x).
$$

$L_z$ 为正表示质点绕 $O$ 逆时针环绕。当速度从径向线的一侧摆到另一侧时符号翻转；在速度恰好落在该线上的瞬间，它为零。下面的图就是这个叉积，按单位质量画出：若 $\mathbf{a}$ 代表 $\mathbf{r}$、$\mathbf{b}$ 代表 $\mathbf{v}$，那么 $a_x b_y - a_y b_x$ 就是 $L_z/m$。

::: widget vector
ax: 2
ay: 0.5
bx: 0.4
by: 1.5
caption: 若 a 代表位置、b 代表速度，就把 a × b 读作垂直纸面向外的、单位质量的角动量。拖动箭头末端，观察速度摆过径向线时叉积如何变号。
:::

按两向量最初的样子，$a_x b_y - a_y b_x = (2)(1.5) - (0.5)(0.4) = 3 - 0.2 = 2.8$。拖动 $\mathbf{b}$ 直到它与 $\mathbf{a}$ 共线，乘积经过零；把它拖过那条线，乘积变号。这个零不是什么特殊的动力学事件，它是 $\mathbf{r}\times\mathbf{v}$ 的几何。

::: intuition 动量的力臂
动量问的是质量运动得多快；角动量问的是这份运动中有多少没有指向原点。因子 $r_\perp$ 是一个力臂，与 [[mechanics/rotation]] 中力的力臂是同一个想法，只是用在了 $\mathbf{p}$ 而不是 $\mathbf{F}$ 上。径直对准 $O$ 的大动量一无所贡献；动量不大、力臂却长，贡献却可以很大。
:::

::: example 圆周上运动的质点 {#ex-circle}
质量 $m = 0.500\,\mathrm{kg}$ 的质点以速率 $v = 3.00\,\mathrm{m/s}$ 沿半径 $R = 0.400\,\mathrm{m}$ 的圆运动。求它对圆心的角动量，并用 $L = I\omega$ 核对结果。
::: solution
速度与半径垂直，所以 $\sin\phi = 1$，

$$
L = mvr = (0.500)(3.00)(0.400) = 0.600\,\mathrm{kg\cdot m^2/s}.
$$

方向沿圆的轴线，由右手定则确定，在匀速圆周运动中不变。第二次计算：$\omega = v/R = 3.00/0.400 = 7.50\,\mathrm{rad/s}$，质点对圆心的转动惯量为 $I = mR^2 = (0.500)(0.160) = 0.0800\,\mathrm{kg\cdot m^2}$。于是

$$
I\omega = (0.0800)(7.50) = 0.600\,\mathrm{kg\cdot m^2/s},
$$

同一个值。使质点留在圆上的力沿径向，所以它对圆心的力矩为零。$\mathbf{L}$ 恒定正是力矩为零必然产生的结果，这就是下一节的内容。这一运动对应的面积速度要等面积定律就位后才能算出：$\deriv{A}{t} = L/(2m) = 0.600/(2\times 0.500) = 0.600\,\mathrm{m^2/s}$。
:::
:::

## 力矩与变化率

对 $O$ 的力矩在 [[mechanics/rotation]] 中定义为 $\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F}$。对单个质点，该力矩与 $\mathbf{L}$ 之间存在一个微分关系，而且不要求质点做圆周运动。

::: theorem 单个质点的力矩 {#thm-taudL}
设质量恒为 $m$ 的质点在力 $\mathbf{F}$ 作用下运动，并设 $\mathbf{L}$ 与 $\boldsymbol{\tau}$ 都是相对惯性系中固定的原点 $O$ 计算的。则

$$
\boldsymbol{\tau} = \deriv{\mathbf{L}}{t}.
$$ {#eq-taudL}

两边必须参照同一个原点。若原点有加速度，或 $\boldsymbol{\tau}$ 与 $\mathbf{L}$ 所用的不是同一个点，等式未必成立。
:::

::: proof
由 [[#def-L]]，且 $m$ 恒定，

$$
\deriv{\mathbf{L}}{t} = \deriv{}{t}(\mathbf{r}\times m\mathbf{v}) = \dot{\mathbf{r}}\times(m\mathbf{v}) + \mathbf{r}\times m\dot{\mathbf{v}}.
$$

第一项是 $m(\mathbf{v}\times\mathbf{v}) = \mathbf{0}$。惯性系中牛顿第二定律给出 $m\dot{\mathbf{v}} = \mathbf{F}$，所以第二项是 $\mathbf{r}\times\mathbf{F} = \boldsymbol{\tau}$。故 $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}$。

这一步 $\dot{\mathbf{r}} = \mathbf{v}$ 用的是惯性系中静止的原点。若 $O$ 有加速度，相对位置的导数就不是惯性系速度，会多出一项。质量被提到了导数外面；变质量（如火箭）需要对带进带出的动量单独记账，那是 [[mechanics/momentum]] 的事，不是这个恒等式的事。
:::

这个定理是 $\mathbf{F} = \deriv{\mathbf{p}}{t}$ 的转动形式。在一段时间上积分就得到一个角冲量：$\int\boldsymbol{\tau}\,\dd t = \Delta\mathbf{L}$。短暂碰撞中力极大、时段极小，于是一个保持有限大小的力矩——例如杆的重力——贡献的角冲量与撞击的角冲量相比可以忽略。这就是为什么子弹嵌入期间可以忽略重力，而之后杆要摆动几秒量级的时间时，必须把重力加回来。

::: warning 不同的点，以及动能
对不同点的力矩与角动量不得划上等号。一个物体的动量可能不守恒，因为支轴在推；而它对支轴的角动量却守恒，因为那一推没有力臂。这两句话说的是不同的量。另一处独立的错误，是把守恒的 $\mathbf{L}$ 当成守恒的能量。子弹嵌入时动能通常有损失，滑冰者收拢手臂时动能通常上升。[[#eq-taudL]] 对 $K$ 什么也没有说。
:::

## 质点系

对多个质点，总角动量（相对固定原点）是各个角动量之和，$\mathbf{L} = \sum_i \mathbf{r}_i\times m_i\mathbf{v}_i$。求导并对每个质点使用 [[#thm-taudL]]，得 $\deriv{\mathbf{L}}{t} = \sum_i \mathbf{r}_i\times\mathbf{F}_i$，即一切力（外力与内力）的总力矩。当内力是中心力时，它们在这张和中抵消。

::: theorem 质点系的角动量 {#thm-system}
设系统的内力成对出现，$\mathbf{F}_{ij} = -\mathbf{F}_{ji}$，沿两质点的连线作用。则对惯性系中固定的原点，总角动量的变化率等于对该原点的合外力矩：

$$
\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}.
$$ {#eq-system}

若对该原点有 $\boldsymbol{\tau}_{\mathrm{ext}} = \mathbf{0}$，则 $\mathbf{L}$ 守恒。由下面的 [[#thm-cm]]，同样的结论对质心也成立，即使质心有加速度。
:::

::: proof
把 $\mathbf{F}_i = \mathbf{F}_i^{\mathrm{ext}} + \sum_{j\neq i}\mathbf{F}_{ij}$ 拆开。于是

$$
\deriv{\mathbf{L}}{t} = \sum_i \mathbf{r}_i\times\mathbf{F}_i^{\mathrm{ext}} + \sum_i\sum_{j\neq i}\mathbf{r}_i\times\mathbf{F}_{ij}.
$$

第一个和就是 $\boldsymbol{\tau}_{\mathrm{ext}}$。二重和里把 $(i, j)$ 与 $(j, i)$ 归为一组。每一对的贡献是 $\mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times\mathbf{F}_{ji} = (\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}$，这里用了 $\mathbf{F}_{ji} = -\mathbf{F}_{ij}$。按中心力假设，力 $\mathbf{F}_{ij}$ 平行于 $\mathbf{r}_i - \mathbf{r}_j$，所以叉积消失。每一对都消掉，于是 $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}$。

若内力只是等值反向、却不沿连线，叉积就会残留。运动电荷之间的电磁力可能就是这样；那时电荷的力学角动量就不是全部，因为场也带走一部分。就本课程中的接触力、张力与引力而言，中心力对假设是通行的那一个，它与 [[mechanics/rotation]] 中导出 $\tau = I\alpha$ 时已经使用的假设相同。
:::

关于质心的说法需要单独的论证，因为质心可能有加速度，而 [[#thm-taudL]] 是对固定原点证明的。写 $\mathbf{r}_i = \mathbf{R} + \mathbf{r}_i'$ 与 $\mathbf{v}_i = \mathbf{V} + \mathbf{v}_i'$，其中 $\mathbf{R}$、$\mathbf{V}$ 是质心的位置与速度，带撇的向量以质心为起点度量。于是 $\sum m_i\mathbf{r}_i' = \mathbf{0}$ 且 $\sum m_i\mathbf{v}_i' = \mathbf{0}$。把对固定原点的 $\mathbf{L}$ 之和展开，

$$
\mathbf{L} = \mathbf{R}\times M\mathbf{V} + \mathbf{L}', \qquad \mathbf{L}' = \sum_i \mathbf{r}_i'\times m_i\mathbf{v}_i'.
$$

第一项是这个物体若化作了位于质心的一个质点时所具有的角动量。第二项 $\mathbf{L}'$ 是相对质心的角动量。交叉项为零，因为 $\sum m_i\mathbf{r}_i' = \mathbf{0}$ 且 $\sum m_i\mathbf{v}_i' = \mathbf{0}$。

::: theorem 对质心的角动量 {#thm-cm}
对内力作与 [[#thm-system]] 相同的假设，

$$
\deriv{\mathbf{L}'}{t} = \boldsymbol{\tau}'_{\mathrm{ext}},
$$

其中 $\mathbf{L}'$ 与 $\boldsymbol{\tau}'_{\mathrm{ext}}$ 是以质心为起点的位置向量算出的角动量与外力矩。无论质心有无加速度，这一结论都成立。
:::

::: proof
对 $\mathbf{L}' = \sum_i \mathbf{r}_i'\times m_i\mathbf{v}_i'$ 求导。$\mathbf{v}_i'\times m_i\mathbf{v}_i'$ 这些项为零，所以 $\deriv{\mathbf{L}'}{t} = \sum_i \mathbf{r}_i'\times m_i\mathbf{a}_i'$，其中 $\mathbf{a}_i' = \dot{\mathbf{v}}_i'$ 是相对质心的加速度。惯性系加速度是 $\mathbf{a}_i = \mathbf{A} + \mathbf{a}_i'$，$\mathbf{A}$ 为质心的加速度，牛顿第二定律写作 $m_i\mathbf{a}_i = \mathbf{F}_i^{\mathrm{ext}} + \mathbf{F}_i^{\mathrm{int}}$。于是

$$
\sum_i \mathbf{r}_i'\times m_i\mathbf{a}_i' = \sum_i \mathbf{r}_i'\times\mathbf{F}_i^{\mathrm{ext}} + \sum_i \mathbf{r}_i'\times\mathbf{F}_i^{\mathrm{int}} - \Bigl(\sum_i m_i\mathbf{r}_i'\Bigr)\times\mathbf{A}.
$$

最后一个和为零，因为带撇的原点就是质心。内力和逐对抵消，用的正是 [[#thm-system]] 中那套代数：那套代数从未用到原点固定，只用到质点之间的向量。剩下的和就是 $\boldsymbol{\tau}'_{\mathrm{ext}}$。
:::

这就是 [[mechanics/rotation]] 中预告过的论证，说明为什么可以对滚动物体的中心写 $\tau = I\alpha$。中心沿斜面加速而下，但 [[#thm-cm]] 依然给出 $\tau' = \deriv{L'}{t}$，而对那一章的对称物体，$L' = I\omega$ 沿转轴方向。

若对固定点或对质心的合外力矩为零，对应的角动量就恒定。没有通过这一检验的力在受力图上很好认：凡作用线不经过该点的外力都有贡献。作用在质心的重力对质心没有贡献，支轴处的力对支轴没有贡献。内力在它们是中心力时，无论多大都从不贡献力矩。它们却仍然可以做功。拉滑冰者双臂向内的肌肉力是内力，也足够"中心"，因而不绕竖直轴产生力矩，但手臂在动，力做正功，动能上升。角动量守恒与能量守恒是两个独立的定理，各有各的假设。

## 对称轴上的刚体

绕固定轴转动的刚体满足 $K = \tfrac{1}{2}I\omega^2$ 与 $\tau = I\alpha$，这由 [[mechanics/rotation]] 从切向分量形式的牛顿定律证得。当转轴是物体的对称轴时，走角动量这条路得到同一条定律；它还说明了物体不对称时定律为什么会失灵。

::: proposition 沿对称轴的角动量 {#prop-rigid}
设刚体以角速度 $\boldsymbol{\omega}$ 绕 $z$ 轴转动，该轴固定，且是质量分布的对称轴。则它对轴上一点的角动量是 $\mathbf{L} = I\boldsymbol{\omega}$，沿轴方向，其中 $I = \int(x^2 + y^2)\,\dd m$ 是对该轴的转动惯量。配上 [[#thm-system]] 或 [[#thm-cm]]，就得到对轴的 $\tau = I\alpha$。对不对称的刚体，$\mathbf{L}$ 未必沿 $\boldsymbol{\omega}$；那种情形留给 [[analytical-mechanics]]。
:::

::: proof
位于 $\mathbf{r}$ 的质量元的速度是 $\boldsymbol{\omega}\times\mathbf{r}$。取 $\boldsymbol{\omega} = \omega\,\mathbf{e}_z$，

$$
\dd\mathbf{L} = \dd m\,\mathbf{r}\times(\boldsymbol{\omega}\times\mathbf{r}) = \dd m\bigl[(\mathbf{r}\cdot\mathbf{r})\boldsymbol{\omega} - (\mathbf{r}\cdot\boldsymbol{\omega})\mathbf{r}\bigr].
$$

用分量写，$\mathbf{r}\cdot\boldsymbol{\omega} = \omega z$、$\mathbf{r}\cdot\mathbf{r} = x^2 + y^2 + z^2$，于是贡献为

$$
\dd L_x = -\dd m\,\omega\, xz, \qquad \dd L_y = -\dd m\,\omega\, yz, \qquad \dd L_z = \dd m\,\omega\,(x^2 + y^2).
$$

$z$ 分量积分得 $L_z = I\omega$。横向分量为零，只要质量分布对 $z \to -z$ 对称，或对绕轴半圈对称，因为那时 $z$ 处与 $-z$ 处的贡献相互抵消。躺在 $z = 0$ 平面内的物体是最简单的情形：$z = 0$ 直接把 $\dd L_x$ 与 $\dd L_y$ 消掉。圆环、圆盘、绕自身轴的圆柱、绕直径的球都有这种对称性。于是 $\mathbf{L} = I\boldsymbol{\omega}$；若 $I$ 恒定，就有 $\tau_z = \deriv{L_z}{t} = I\alpha$，而对定轴转动的刚体 $I$ 正是恒定的。

若刚体是一只歪着的哑铃，质量离开转轴、又没有对称性来配平，$\int xz\,\dd m$ 就未必为零。那时 $\mathbf{L}$ 有一个垂直于 $\boldsymbol{\omega}$ 的分量，而且这个分量随刚体转动一起旋转。即使 $\omega$ 恒定，轴承也必须提供力矩。标量定律 $\tau = I\alpha$ 描述不了那个力矩。
:::

## 中心力与等面积

当一个力总是沿 $O$ 到质点的连线方向时，称它关于点 $O$ 是**中心的**：$\mathbf{F}$ 平行于 $\mathbf{r}$，吸引或排斥皆可。固定太阳产生的引力、光滑桌面上穿过小孔的绳中的张力，各自关于那颗太阳或那个小孔是中心的。对 $O$ 的力矩是 $\mathbf{r}\times\mathbf{F} = \mathbf{0}$。

::: theorem 等面积 {#thm-area}
若质点所受的力关于固定点 $O$ 是中心的，则质点对 $O$ 的角动量恒定。从 $O$ 到质点的向径因此以不变的速率扫出面积，

$$
\deriv{A}{t} = \frac{L}{2m},
$$ {#eq-area}

其中 $L = \abs{\mathbf{L}}$，$m$ 是质量。反过来，若面积速度恒定，即对 $O$ 的 $\mathbf{L}$ 恒定，则力关于 $O$ 是中心的。
:::

::: proof
由 [[#thm-taudL]]，$\deriv{\mathbf{L}}{t} = \mathbf{r}\times\mathbf{F}$。中心力的叉积为零，所以 $\mathbf{L}$ 的大小与方向都恒定。$\mathbf{L}$ 方向固定的运动，落在过 $O$ 且垂直于 $\mathbf{L}$ 的平面内。

在时间 $\dd t$ 内位置改变 $\dd\mathbf{r} = \mathbf{v}\,\dd t$。以 $O$、$\mathbf{r}$ 与 $\mathbf{r} + \dd\mathbf{r}$ 为顶点的三角形，面积是其两边叉积大小的一半，

$$
\dd A = \tfrac{1}{2}\abs{\mathbf{r}\times\dd\mathbf{r}} = \tfrac{1}{2}\abs{\mathbf{r}\times\mathbf{v}}\,\dd t.
$$

而 $\abs{\mathbf{r}\times m\mathbf{v}} = L$，所以 $\abs{\mathbf{r}\times\mathbf{v}} = L/m$，于是 $\deriv{A}{t} = L/(2m)$。$L$ 恒定就是面积速度恒定。"相等时间内扫过相等面积"就是把这句话念成文字。

反过来，平面内面积速度恒定意味着 $\mathbf{L}$ 恒定，于是 $\boldsymbol{\tau} = \deriv{\mathbf{L}}{t} = \mathbf{0}$，进而 $\mathbf{r}\times\mathbf{F} = \mathbf{0}$。力平行于 $\mathbf{r}$。
:::

因子 $\tfrac{1}{2}$ 来自三角形，不是可以随手丢掉的约定。对 [[#ex-circle]] 中的质点，$L = 0.600\,\mathrm{kg\cdot m^2/s}$、$m = 0.500\,\mathrm{kg}$，所以 $\deriv{A}{t} = 0.600\,\mathrm{m^2/s}$。一秒内向径扫过 $0.600\,\mathrm{m^2}$，占半径 $0.400\,\mathrm{m}$ 圆盘面积的 $0.600/(\pi R^2) = 0.600/0.5027 = 1.19$ 倍：超过一整圈，因为周期是 $2\pi R/v = 2\pi(0.400)/3.00 = 0.838\,\mathrm{s}$，而 $1/0.838 = 1.19$ 是每秒的转数。几何与动力学彼此相符。

::: history
开普勒（Kepler）的《新天文学》（*Astronomia nova*，1609）提出：太阳到行星的连线在相等时间内扫过相等面积。他从第谷·布拉赫（Tycho Brahe）对火星的观测中读出这一定律，把它当作关于轨道的一个事实，而不是某个力的推论。在《自然哲学的数学原理》（*Principia*，1687）第一卷中，牛顿（Newton）证明了 [[#thm-area]] 的两个方向：指向固定点的力蕴含面积定律，面积定律也蕴含力指向那个点。论证就是上面给出的那一个，只是用他那个时代的几何语言写成。把 $\mathbf{r}\times m\mathbf{v}$ 认定为一个守恒向量是后来的事；牛顿守恒的是面积速度本身。
:::

::: quiz
子弹嵌入一根悬挂在支轴上的杆。在短暂的碰撞期间，哪句话正确？
- [ ] 动能与对支轴的角动量都守恒
- [x] 对支轴的角动量守恒，动能不守恒
- [ ] 动量守恒，因为碰撞后杆可以自由摆动
- [ ] 对支轴的角动量不守恒，因为支轴在推杆
::: solution
支轴可能施加很大的冲量，所以动量不守恒：支轴在推。那一冲量对支轴没有力矩，而短暂碰撞期间重力的角冲量可以忽略，于是对支轴的角动量守恒。嵌入是非弹性的，动能急剧减少。最后一个选项犯的错，正是写 [[#thm-system]] 时要防住的那种：过原点的力不改变对该原点的 $\mathbf{L}$。
:::
:::

## 两个含转动的碰撞与一位滑冰者

守恒定律每一次的用法都相同。先报出那个点，检验在所关心的时段内对它的合外力矩为零，再把前后的 $\mathbf{L}$ 划等号，然后才去问能量怎么样了。

::: example 滑冰者收拢手臂 {#ex-skater}
一位滑冰者绕竖直轴转动，转动惯量 $I_1 = 4.00\,\mathrm{kg\cdot m^2}$，角速度 $\omega_1 = 2.00\,\mathrm{rad/s}$。她收拢手臂，转动惯量降到 $I_2 = 1.60\,\mathrm{kg\cdot m^2}$。求新的角速度与动能的改变。对竖直轴没有外力矩：冰面足够光滑，或者说冰刀处的力对该轴没有力臂。
::: solution
她在绕竖直轴转动期间，由 [[#prop-rigid]] 有沿轴的 $L = I\omega$，于是 [[#thm-system]] 说对竖直轴的 $I\omega$ 恒定。因此

$$
I_1\omega_1 = (4.00)(2.00) = 8.00\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{8.00}{1.60} = 5.00\,\mathrm{rad/s}.
$$

动能为

$$
K_1 = \tfrac{1}{2}I_1\omega_1^2 = \tfrac{1}{2}(4.00)(4.00) = 8.00\,\mathrm{J}, \qquad K_2 = \tfrac{1}{2}(1.60)(5.00)^2 = (0.800)(25.0) = 20.0\,\mathrm{J}.
$$

动能增加了 $12.0\,\mathrm{J}$。角动量守恒了，能量没有。增加的这部分是滑冰者的肌肉收拢手臂时做的功：那些力是内力，所以对轴没有力矩贡献；但作用点向内移动，力做正功。$I$ 固定的刚体做不到这一点。收臂期间滑冰者不是刚体，这就是 $I$ 可以变、$I\omega$ 不可以变的原因。
:::
:::

::: example 子弹嵌入悬挂的杆 {#ex-bullet}
质量 $M = 1.00\,\mathrm{kg}$、长 $L = 0.800\,\mathrm{m}$ 的均匀杆，一端挂在支轴上静止。质量 $m = 0.0100\,\mathrm{kg}$ 的子弹以 $400\,\mathrm{m/s}$ 的速度垂直于杆飞来，击中自由端并嵌入。求碰撞后一刻的角速度，并比较动能。
::: solution
碰撞期间铰链可能施加很大的冲量，所以动量不守恒。那一冲量对支轴没有力矩。重力有限，而碰撞历时极短，所以重力的角冲量与子弹带进来的角动量相比可以忽略。于是 [[#thm-system]] 守恒的是对支轴的角动量，动能并不守恒：嵌入是非弹性的。

杆对过端点转轴的转动惯量是 $I_{\mathrm{rod}} = ML^2/3$。由 $L^2 = 0.640$，

$$
I_{\mathrm{rod}} = \frac{(1.00)(0.640)}{3} = 0.21333\ldots\,\mathrm{kg\cdot m^2},
$$

四位小数即 $0.2133\,\mathrm{kg\cdot m^2}$。嵌入的子弹是距轴 $L$ 处的质点，所以

$$
I = I_{\mathrm{rod}} + mL^2 = 0.21333\ldots + (0.0100)(0.640) = 0.21973\ldots\,\mathrm{kg\cdot m^2},
$$

记作 $0.21973\,\mathrm{kg\cdot m^2}$。碰撞前一刻杆静止，子弹的动量垂直于从支轴出发、长度为 $L$ 的位置向量，所以

$$
L_{\mathrm{ang}} = mvL = (0.0100)(400)(0.800) = 3.20\,\mathrm{kg\cdot m^2/s}.
$$

碰撞后一刻，组合体是刚性的，带着同样大小的角动量：

$$
\omega = \frac{3.20}{0.21973\ldots} = 14.563\ldots\,\mathrm{rad/s},
$$

四位有效数字即 $14.56\,\mathrm{rad/s}$。

碰撞前的动能是

$$
K_{\mathrm{before}} = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(0.0100)(400)^2 = 800\,\mathrm{J}.
$$

碰后一刻 $K = \tfrac{1}{2}I\omega^2$。用中间量 $I = 0.219733\,\mathrm{kg\cdot m^2}$ 与 $\omega = 14.563\,\mathrm{rad/s}$，

$$
(14.563)^2 = 212.080969, \qquad \tfrac{1}{2}(0.219733)(212.080969) = 23.3006\ldots\,\mathrm{J},
$$

取作 $23.3\,\mathrm{J}$。直接用 $L_{\mathrm{ang}}^2/(2I)$ 也得到同一个 $23.3\,\mathrm{J}$，且不经过中间舍入。子弹的动能几乎全部进了永久形变。

杆加子弹的质心位于

$$
r_{\mathrm{cm}} = \frac{M(L/2) + mL}{M + m} = \frac{0.400 + 0.00800}{1.01} = \frac{0.408}{1.01} = 0.404\,\mathrm{m}
$$

处（自支轴量起）。摆到倒立位置要把质心抬高 $2r_{\mathrm{cm}} = 0.808\,\mathrm{m}$，代价是

$$
(1.01)(9.80)(0.808) = (9.898)(0.808) = 8.00\,\mathrm{J}.
$$

碰撞后还剩下 $23.3\,\mathrm{J}$，所以杆能摆过竖直向上的位置。重力在碰撞期间可忽略，它通过 [[mechanics/work-energy]] 决定这段后续运动，支轴始终不做功。
:::
:::

## 稳定进动的一个给定公式

一只轮子快速自旋，角动量 $\mathbf{L}$ 沿水平转轴；重力矩 $\boldsymbol{\tau}$ 使该轴以 $\Omega = \tau/L$ 进动。

::: warning 快速自旋假设
稳定进动公式 $\Omega = \tau/L$ 假设自旋很快。它把 $\mathbf{L}$ 只当作自旋角动量，并略去了与缓慢进动相伴随的角动量。自旋不够快的轮子不服从这个公式；完整的处理在 [[analytical-mechanics]]。只有题目说自旋很快时才用 $\Omega = \tau/L$，也不要拿定轴的 $\tau = I\alpha$ 去杜撰一个它的推导。
:::

::: example 旋转轮子的进动 {#ex-precess}
轮子快速自旋，自旋角动量大小 $L = 5.00\,\mathrm{kg\cdot m^2/s}$，沿水平转轴。轮子的质量是 $2.00\,\mathrm{kg}$，质心距支撑转轴的支轴 $0.250\,\mathrm{m}$。求重力矩的大小和稳定进动速率 $\Omega = \tau/L$。取 $g = 9.80\,\mathrm{m/s^2}$。
::: solution
重力作用在质心，位于过支轴的竖直线外侧水平距离 $0.250\,\mathrm{m}$ 处，所以力臂就是 $0.250\,\mathrm{m}$，

$$
\tau = mgd = (2.00)(9.80)(0.250) = (19.6)(0.250) = 4.90\,\mathrm{N\cdot m}.
$$

在快速自旋假设下，给定的公式给出

$$
\Omega = \frac{\tau}{L} = \frac{4.90}{5.00} = 0.980\,\mathrm{rad/s}.
$$

相应的周期是 $T = 2\pi/\Omega = 2\pi/0.980 = 6.41\,\mathrm{s}$。转轴在水平面内扫过。我们没有推导 $\Omega = \tau/L$，只是把它算了出来。同一只轮子若几乎不转，这个数就不是它的运动。
:::
:::

## 后续内容

面积定律是轨道力学的开场。[[mechanics/gravitation]] 把中心力特化为平方反比律，找到闭合的椭圆、圆轨道速率与逃逸速率；$\mathbf{L}$ 的恒定正是把轨道化为单个径向坐标上问题的关键。只要物体是刚体、而转轴不是对称轴，或者进动不是上面用的快速自旋特例，$\mathbf{L}$ 与 $\boldsymbol{\omega}$ 就要分道扬镳，合适的语言是惯量张量。那是 [[analytical-mechanics]] 的起点。当 [[mechanics/rotation]] 中定轴与滚动结果的假设确实成立时，它们仍然是干活的工具。

::: summary
- 质点对原点的角动量是 $\mathbf{L} = \mathbf{r}\times m\mathbf{v}$，大小为 $mvr\sin\phi$。原点是命题的一部分。
- 在惯性系中对固定原点，质量恒定的单个质点满足 $\boldsymbol{\tau} = \deriv{\mathbf{L}}{t}$。力矩与角动量必须对同一个原点。
- 对内力为中心力的系统，对固定原点有 $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}$；同样的定律对相对质心的 $\mathbf{L}'$ 也成立。外力矩为零意味着守恒。
- 在固定的对称轴上，$\mathbf{L} = I\boldsymbol{\omega}$ 且 $\tau = I\alpha$。对不对称的刚体，$\mathbf{L}$ 未必沿 $\boldsymbol{\omega}$。
- 中心力守恒 $\mathbf{L}$，于是向径以恒定速率 $L/(2m)$ 扫出面积。反过来也成立。
- 角动量守恒并不守恒动能。滑冰者的 $I$ 从 $4.00$ 降到 $1.60\,\mathrm{kg\cdot m^2}$，转速从 $2.00$ 升到 $5.00\,\mathrm{rad/s}$，$K$ 从 $8.00\,\mathrm{J}$ 升到 $20.0\,\mathrm{J}$。
- 角动量为 $3.20\,\mathrm{kg\cdot m^2/s}$ 的子弹嵌入悬挂的杆后，杆以 $14.56\,\mathrm{rad/s}$ 转动，动能是 $23.3\,\mathrm{J}$，而碰前是 $800\,\mathrm{J}$。支轴的冲量不产生对支轴的力矩。
- 快速自旋的稳定进动是给定的公式 $\Omega = \tau/L$，只在自旋很快时才成立。
:::

## 习题

::: exercise 对圆心的角动量 {#exr-particle level=1 check="1.2"}
质量 $0.200\,\mathrm{kg}$ 的质点以 $4.00\,\mathrm{m/s}$ 运动，速度垂直于它相对所选原点的位置向量。它到原点的距离是 $1.50\,\mathrm{m}$。求对该原点的 $L$，以 $\mathrm{kg\cdot m^2/s}$ 计。
::: solution
速度垂直于 $\mathbf{r}$，所以 $\sin\phi = 1$，由 [[#def-L]] 得

$$
L = mvr = (0.200)(4.00)(1.50) = (0.200)(6.00) = 1.20\,\mathrm{kg\cdot m^2/s}.
$$

若同样大小的速度与 $\mathbf{r}$ 成 $30^\circ$，因子 $\sin 30^\circ = \tfrac{1}{2}$ 会把结果砍去一半。题目说明运动是垂直的。
:::
:::

::: exercise 滑冰者：常规数字 {#exr-skater-w level=1 check="7.5"}
滑冰者绕竖直轴转动，转动惯量 $2.50\,\mathrm{kg\cdot m^2}$，角速度 $3.00\,\mathrm{rad/s}$。她收拢手臂直到转动惯量变成 $1.00\,\mathrm{kg\cdot m^2}$。对轴没有外力矩。求新的角速度，以 $\mathrm{rad/s}$ 计。
::: solution
由 [[#thm-system]] 与 [[#prop-rigid]]，$I\omega$ 恒定：

$$
I_1\omega_1 = (2.50)(3.00) = 7.50\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{7.50}{1.00} = 7.50\,\mathrm{rad/s}.
$$

动能从 $\tfrac{1}{2}(2.50)(3.00)^2 = 11.25\,\mathrm{J}$ 升到 $\tfrac{1}{2}(1.00)(7.50)^2 = 28.125\,\mathrm{J}$。题目只问 $\omega_2$。增加量是滑冰者做的功，如 [[#ex-skater]]。
:::
:::

::: exercise 圆上的面积速度 {#exr-area level=1 check="0.6"}
质量 $0.500\,\mathrm{kg}$ 的质点对某固定点的角动量大小为 $0.600\,\mathrm{kg\cdot m^2/s}$，它受到的力关于该点是中心的。求面积扫过的速率，以 $\mathrm{m^2/s}$ 计。
::: solution
由 [[#thm-area]] 得

$$
\deriv{A}{t} = \frac{L}{2m} = \frac{0.600}{2\times 0.500} = \frac{0.600}{1.00} = 0.600\,\mathrm{m^2/s}.
$$

这个值恒定，因为 $L$ 恒定。这里的质量和角动量就是 [[#ex-circle]] 的那一组；一旦知道 $L$ 和 $m$，就不再需要半径。
:::
:::

::: exercise 杆端的黏土块 {#exr-clay level=2 check="10"}
质量 $M = 1.20\,\mathrm{kg}$、长 $L = 1.00\,\mathrm{m}$ 的均匀杆一端挂在支轴上静止。质量 $m = 0.0500\,\mathrm{kg}$ 的黏土块以 $90.0\,\mathrm{m/s}$ 的速度垂直于杆飞来，击中自由端并粘住。求碰撞后一刻的角速率，以 $\mathrm{rad/s}$ 计。
::: hint
铰链的冲量对支轴没有力矩。碰撞期间重力的角冲量可以忽略。守恒的是对支轴的角动量；动能不守恒。
:::
::: solution
对支轴，$I_{\mathrm{rod}} = ML^2/3 = (1.20)(1.00)/3 = 0.400\,\mathrm{kg\cdot m^2}$。粘在自由端的黏土块添上 $mL^2 = (0.0500)(1.00) = 0.0500\,\mathrm{kg\cdot m^2}$，所以

$$
I = 0.400 + 0.0500 = 0.450\,\mathrm{kg\cdot m^2}.
$$

黏土块带进来的角动量是

$$
mvL = (0.0500)(90.0)(1.00) = 4.50\,\mathrm{kg\cdot m^2/s}.
$$

碰前杆静止，铰链对支轴无贡献，于是

$$
\omega = \frac{4.50}{0.450} = 10.0\,\mathrm{rad/s}.
$$

动能不守恒。碰前 $K = \tfrac{1}{2}(0.0500)(90.0)^2 = (0.0250)(8100) = 202.5\,\mathrm{J}$。碰后 $K = \tfrac{1}{2}(0.450)(10.0)^2 = 22.5\,\mathrm{J}$。大部分能量在黏土的形变中失去，如 [[#ex-bullet]]。
:::
:::

::: exercise 滑冰者要提供的能量 {#exr-energy level=2 check="13.5"}
一物体绕竖直轴自由转动，转动惯量 $6.00\,\mathrm{kg\cdot m^2}$，角速度 $1.50\,\mathrm{rad/s}$。内力（对轴无外力矩）把转动惯量减到 $2.00\,\mathrm{kg\cdot m^2}$。求动能的增加量，以焦耳计。
::: solution
对轴的角动量守恒：

$$
L = (6.00)(1.50) = 9.00\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{9.00}{2.00} = 4.50\,\mathrm{rad/s}.
$$

动能为

$$
K_1 = \tfrac{1}{2}(6.00)(1.50)^2 = (3.00)(2.25) = 6.75\,\mathrm{J},
$$

$$
K_2 = \tfrac{1}{2}(2.00)(4.50)^2 = (1.00)(20.25) = 20.25\,\mathrm{J}.
$$

增加量是 $20.25 - 6.75 = 13.5\,\mathrm{J}$。这个差值就是质量分布改变过程中内力做的功。守恒了 $L$ 之后又令 $K_2 = K_1$，等于同时使用两个假设并不都满足的定律。
:::
:::

::: exercise 用给定公式算进动速率 {#exr-omega level=2 check="0.98"}
快速自旋的轮子自旋角动量 $5.00\,\mathrm{kg\cdot m^2/s}$，沿水平转轴。质量 $2.00\,\mathrm{kg}$ 的质心距支撑支轴 $0.250\,\mathrm{m}$。用 $\Omega = \tau/L$ 与 $g = 9.80\,\mathrm{m/s^2}$，求 $\Omega$，以 $\mathrm{rad/s}$ 计。
::: solution
重力矩的大小为

$$
\tau = mgd = (2.00)(9.80)(0.250) = 4.90\,\mathrm{N\cdot m}.
$$

给定的快速自旋公式给出 $\Omega = \tau/L = 4.90/5.00 = 0.980\,\mathrm{rad/s}$。同样的算术见 [[#ex-precess]]。这里是在使用公式，不是推导它，而公式要求自旋很快。
:::
:::

::: exercise 在转台上刹停轮子 {#exr-platform level=3 check="5/3"}
一人站在转台上，可绕竖直轴自由转动，人与转台的总转动惯量为 $3.20\,\mathrm{kg\cdot m^2}$。她手里拿着一只转动惯量 $0.400\,\mathrm{kg\cdot m^2}$ 的轮子，轮子绕同一条竖直轴以 $15.0\,\mathrm{rad/s}$ 自旋。转台最初静止。她刹住轮子，使轮子相对她静止。求人、转台与轮子的最终角速度，以 $\mathrm{rad/s}$ 计。
::: hint
人与轮子之间的内力矩对竖直轴相互抵消。最终轮子与人共用同一个角速度，所以最终的转动惯量是两者之和。
:::
::: solution
对竖直轴没有外力矩：转台的轴承就在轴上，重力与法向支持力都沿竖直方向。[[#thm-system]] 守恒的是对该轴的总角动量。最初只有轮子有贡献，

$$
L = (0.400)(15.0) = 6.00\,\mathrm{kg\cdot m^2/s}.
$$

最终轮子相对人静止，两者以同一个 $\omega$ 转动，于是

$$
I_{\mathrm{f}} = 3.20 + 0.400 = 3.60\,\mathrm{kg\cdot m^2}, \qquad \omega = \frac{6.00}{3.60} = \frac{600}{360} = \frac{5}{3}\,\mathrm{rad/s}.
$$

动能不守恒。之前 $K = \tfrac{1}{2}(0.400)(15.0)^2 = (0.200)(225) = 45.0\,\mathrm{J}$。之后

$$
K = \tfrac{1}{2}(3.60)\Bigl(\frac{5}{3}\Bigr)^2 = (1.80)\cdot\frac{25}{9} = 5.00\,\mathrm{J}.
$$

刹车做负功。情形与 [[#ex-skater]] 有一处相反、一处相同：两种情形 $L$ 都守恒；而只要内力做功或耗散能量，$K$ 就会改变。
:::
:::

::: exercise 中心力对为什么不产生力矩 {#exr-pair level=3}
两质点之间的相互作用力为 $\mathbf{F}_{ij} = -\mathbf{F}_{ji}$，沿两质点的连线。证明：这一对力对任意固定原点的总力矩没有贡献，并由此得出结论：由这样的力对组成的孤立系统的总角动量守恒。
::: hint
把两个力矩对原点写出来，并提取因子 $\mathbf{F}_{ij}$。向量 $\mathbf{r}_i - \mathbf{r}_j$ 与该力平行。
:::
::: solution
对固定原点，这一对的力矩是

$$
\boldsymbol{\tau}_{ij} = \mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times\mathbf{F}_{ji} = \mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times(-\mathbf{F}_{ij}) = (\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}.
$$

按假设 $\mathbf{F}_{ij}$ 平行于 $\mathbf{r}_i - \mathbf{r}_j$，所以叉积为零。原点除了作为 $\mathbf{r}_i$、$\mathbf{r}_j$ 的起点之外从未进入计算，而且它抵消了。因此孤立系统的每一对内力都没有贡献；又因根本没有外力，[[#thm-system]] 给出对任何固定原点 $\deriv{\mathbf{L}}{t} = \mathbf{0}$。每个质点自己的角动量未必恒定：质点之间确实在互相施加力矩。守恒的只是总和。若力只是等值反向却不是中心的，$(\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}$ 就会残留，结论便不成立。
:::
:::
