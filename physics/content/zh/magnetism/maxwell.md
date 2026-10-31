本课程迄今讲过的定律——库仑定律、高斯定律、毕奥–萨伐尔定律与安培定律、法拉第定律、电感定律——全都正确，但只在各定律当初被推导出来时所处的那些情形下正确：前两对的静电学情形，第二对的静磁学情形，第三对则是在稳恒电流或缓慢变化的磁通使被忽略的项化为零的那些特定构型里。这些定律*并非*由其推导出来的那些情形——正在充电的电容器、正在辐射的天线、正在加速的电荷——恰恰是过去两个世纪电工技术赖以建立的那些情形。弥合这一缺口的，是安培定律中单个额外的项：**位移电流**；而闭合后的四条方程所做的事，是预言一个其中任何一条单独定律都并非为描述它而建立的现象：一种在真空中以确定速度传播的、自维持的电磁扰动。这一速度是 $1/\sqrt{\mu_0\,\varepsilon_0}$，把两个常量代入测得值，算出来是 $2.998\times 10^{8}\,\mathrm{m/s}$，即测得的光速。光是电磁波，而说出这一点的四条方程就是麦克斯韦方程组。

本章以微分形式陈述这些方程，解释位移电流项如何从连续性方程出发强迫自己加入，并算出波动方程及其推论。波在真空中的传播、它的偏振、强度与辐射压，是下一章 [[magnetism/electromagnetic-waves]]；本对课程中第一门的边值问题，镜像法与多极展开，是场论课程 [[electrodynamics/electrostatics]] 的主题。四矢量表述——两组方程在其中合并为两条——见 [[electrodynamics/relativistic-fields]]。

## 静方程中的裂缝

四条定律在其最初被陈述的受限领域内是：

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}, \qquad
\nabla \cdot \mathbf{B} = 0, \qquad
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \qquad
\nabla \times \mathbf{B} = \mu_0 \mathbf{J}.
$$ {#eq-static-four}

第一条是高斯定律，是库仑场平方反比形式的推论，已在静电学课程的 [[electrostatics/gauss-law]] 中证明过。第二条陈述的是一个多世纪以来任何实验都未能推翻的东西：穿过任一闭合面的净磁通量为零，这就是不存在孤立磁荷、不存在**磁单极**的积分表述。第三条是法拉第定律，它本来就允许场随时间变化，这才是要点：变化的磁场产生有旋的电场，而法拉第定律并不限于稳恒构型。第四条是静磁学的安培定律，推导见 [[magnetism/biot-savart]]，而它确实*是*在电流分布稳恒、或至少情形已进入某个位移项（推导中被忽略的那项）为零的区域这一假设下推导出来的。

紧张关系存在于第四式与连续性方程——电荷守恒的陈述——之间。电荷守恒是"电荷不会凭空产生、也不会凭空消失进入真空"的定域陈述，它是

$$
\nabla \cdot \mathbf{J} + \frac{\partial \rho}{\partial t} = 0.
$$ {#eq-continuity}

它是"流出闭合面的电流等于内部电荷减少的速率"这一积分陈述的微分形式，而且是把电流定义为运动电荷的推论——一个小体积元的电荷只能通过流过其边界的电流来改变。问题是 [[#eq-static-four]] 的四个方程与它是否相容。对第四式两边取散度，并使用矢量恒等式 $\nabla \cdot (\nabla \times \mathbf{B}) = 0$（旋度的散度恒为零）：

$$
\nabla \cdot (\nabla \times \mathbf{B}) = 0 = \mu_0\, \nabla \cdot \mathbf{J}.
$$

于是照写下来的四个方程要求 $\nabla \cdot \mathbf{J} = 0$，即稳恒电流条件。但 [[#eq-continuity]] 的连续性方程说 $\nabla \cdot \mathbf{J} = -\partial \rho/\partial t$，而 $\partial \rho/\partial t$ 一般不为零。正在充电的电容器就是现成的反例：导线中的电流不为零，极板上的电荷在变化，而两极板之间的一张平面既不载电流也不载电荷，于是由穿过它的电流算出的、穿过这一面的 $\mathbf{B}$ 的旋度给出零，而穿过一张切断导线的面的 $\mathbf{B}$ 的旋度给出 $\mu_0 I$。同一条回路，两个不同的答案：这条定律不是定律，而是一条带有隐藏假设的定律，隐藏的那个假设恰恰是会失效的那一个。

::: theorem 位移电流 {#thm-displacement}
 [[#eq-static-four]] 中第四式的散度为零，而连续性方程是 $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$。若把第四式换成

$$
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t},
$$ {#eq-ampere-maxwell}
两者就一致了；所加的项 $\varepsilon_0 \,\partial \mathbf{E}/\partial t$ 是**位移电流密度**。就（差一个整体常量而言）具有电流密度的量纲、插入安培定律后能恢复与 [[#eq-continuity]] 的电荷守恒之相容性这一点来说，所加的项是唯一的。
:::

::: proof
所加的项的量纲必须是电流密度的量纲，$\mathrm{A/m^2}$。与方程组的其余部分具有相同物理内容的候选项——由场与真空常量构成，并且与它所对应的法拉第定律具有相同的时间导数结构——是一个常量乘以 $\partial \mathbf{E}/\partial t$。这个常量由下述要求固定：新安培定律的散度要与连续性方程和高斯定律相容。对 [[#eq-ampere-maxwell]] 两边取散度；左边如前所述消失，右边则用 [[#eq-continuity]] 的 $\nabla \cdot \mathbf{J} = -\partial \rho/\partial t$ 与高斯定律的 $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$，得

$$
0 = \mu_0 \nabla \cdot \mathbf{J} + \mu_0 \varepsilon_0 \, \nabla \cdot \frac{\partial \mathbf{E}}{\partial t} = \mu_0 \left(-\frac{\partial \rho}{\partial t}\right) + \mu_0 \varepsilon_0 \frac{\partial}{\partial t}\left(\frac{\rho}{\varepsilon_0}\right) = -\mu_0 \frac{\partial \rho}{\partial t} + \mu_0 \frac{\partial \rho}{\partial t} = 0.
$$

两项相消，新方程的散度自动与连续性方程相容，对 $\nabla \cdot \mathbf{J}$ 不再有任何额外限制。所加的项中之所以是常量 $\varepsilon_0 \partial/\partial t$，因为在高斯定律给定的情况下，正是这一选择使相消恰好成立；任何别的常量都会留下残余项，使散度过正或欠正。只要要求四条方程构成的方程组与电荷守恒相容，所加的项在由单位制固定的整体尺度意义下就是唯一确定的。
:::

这一项的物理内容是直接的，而且它不是虚构。变化的电场像传导电流一样是磁场的源，而二者在 $\mathbf{B}$ 的旋度中不可区分：场"不知道"是两者中的哪一个产生了它。在正在充电的电容器里，导线中的电流是 [[#eq-ampere-maxwell]] 右边的传导部分，极板之间的位移电流是 $\varepsilon_0 \partial \mathbf{E}/\partial t$ 部分；两者在极板处衔接（到达极板的传导电流等于离开极板进入间隙的位移电流），而导线周围的磁场以同样的振幅延续进间隙里。场中的"裂缝"由这一项闭合，而安培定律的闭合形式，才与导线中早已满足电荷守恒的那条传导电流形式相容。

::: example 充电电容器两极板之间的场 {#ex-charging}
一个极板半径为 $a$ 的圆形平行板电容器，其接线方式使馈线中的传导电流为 $I(t) = I_0 \cos \\omega t$。求极板之间半径 $r < a$ 处的磁场随 $t$ 的变化。
::: solution
极板之间 $\rho = 0$（电荷在极板上，不在间隙里），位移电流密度为 $\varepsilon_0 \partial \mathbf{E}/\partial t$，其中 $\mathbf{E} = \sigma(t)/\varepsilon_0 \, \hat{\mathbf{z}}$ 是极板的均匀场，$\sigma = Q(t)/(\pi a^2) = I(t)/(\omega \pi a^2) \cdot \omega/\omega$……直接算，$Q(t) = I_0 \sin \\omega t / \omega$，所以 $\sigma(t) = I_0 \sin \\omega t/(\omega \pi a^2)$，而 $\partial \mathbf{E}/\partial t = \\partial \sigma / \\partial t / \varepsilon_0 = I_0 \cos \\omega t/(\pi a^2 \varepsilon_0)\, \hat{\mathbf{z}}$。把 [[#eq-ampere-maxwell]] 用于极板之间平面内以轴线为中心、半径为 $r$ 的圆形回路。回路不包围传导电流（间隙中没有电流流过），只包围穿过它所张的圆盘的位移电流：

$$
\oint \mathbf{B} \cdot d\mathbf{l} = B (2\pi r) = \mu_0 \varepsilon_0 \frac{\partial}{\partial t} \int_{\text{半径为 r 的圆盘}} \mathbf{E} \cdot d\mathbf{S} = \mu_0 \varepsilon_0 \frac{\partial}{\partial t}\left(E(t) \pi r^2\right) = \mu_0 \varepsilon_0 \pi r^2 \frac{\partial E}{\partial t}.
$$

代入 $\partial E/\partial t = I_0 \cos \\omega t/(\pi a^2 \varepsilon_0)$：

$$
B(r,t) = \frac{\mu_0 \varepsilon_0 \pi r^2}{2\pi r} \cdot \frac{I_0 \cos \\omega t}{\pi a^2 \varepsilon_0} = \frac{\mu_0 r}{2\pi a^2} I_0 \cos \\omega t.
$$

间隙中的磁场，正是若电流 $I(t)$ 真的流过该圆盘时、传导电流 $I(t)$ 会在半径 $r$ 处给出的那个随 $r$ 变化、随时间振荡的场：间隙中的位移电流起着传导电流在导线中起的作用，而且间隙中的场与导线周围的场相连续。对 $r > a$，回路所张的面包围全部位移电流 $\varepsilon_0 \partial E/\partial t \cdot \pi a^2 = \partial Q/\partial t = I(t)$，于是场为 $B = \\mu_0 I(t)/(2\pi r)$，与导线本身周围的相同。裂缝闭合了。
:::
:::

::: warning 位移电流不是电荷的流动
项 $\varepsilon_0 \partial \mathbf{E}/\partial t$ 被称为电流，也具有电流的单位，但它不是电荷的流动。电容器的间隙里没有电荷移动，可那里的场却像被源产生的场那样被产生着。这个名字是一个约定，而其内容是：*磁场的旋度*是相同的，无论源是运动中的传导电荷还是变化的电场。把两者混为一谈——例如，先按 $\mathbf{J}\cdot d\mathbf{S}$ 算出导线中的"电流"，再假设间隙里也有电荷在移动而把位移电流加上——就是那个标准错误，它会在电容器问题上导致重复计数：导线中的传导电流与间隙中的位移电流是*同一个源*，在极板处衔接，它们产生的场是一个场，不是两个场相加。
:::

## 四个方程，以及它们各自在说什么

真空中的完整方程组是

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}, \qquad
\nabla \cdot \mathbf{B} = 0, \qquad
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \qquad
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}.
$$ {#eq-maxwell}

::: definition 麦克斯韦方程组 {#def-maxwell}
 [[#eq-maxwell]] 中的四个方程就是经典电磁学定律在真空中的定域微分形式。它们依次陈述：(i) 电荷是 $\mathbf{E}$ 的散度的源；(ii) $\mathbf{B}$ 的散度没有源（没有磁单极）；(iii) 变化的 $\mathbf{B}$ 是 $\mathbf{E}$ 的旋度的源（法拉第）；(iv) 传导电流与位移电流一起是 $\mathbf{B}$ 的旋度的源。
:::

每个方程都是关于场的一个*部分*的陈述：矢量场的散度是它相对某点的"外发程度"（或"内敛程度"），旋度是它绕某点的"旋涡程度"。四个方程说的是：$\mathbf{E}$ 的外发程度由电荷密度决定；$\mathbf{B}$ 的外发程度处处为零；$\mathbf{E}$ 的旋涡程度由 $\mathbf{B}$ 的时间导数决定；$\mathbf{B}$ 的旋涡程度由传导电流加上 $\mathbf{E}$ 的时间导数决定。两个"外发程度"方程是约束方程，即在给定源的情况下某一时刻固定场的方程；两个"旋涡程度"方程是演化方程，即陈述场如何随时间改变的方程。四个方程合起来，在给定源 $\rho$ 与 $\mathbf{J}$ 以及初始条件和边界条件时，决定真空中的 $\mathbf{E}$ 与 $\mathbf{B}$。

每个方程的积分形式，就是关于闭合面（对两个散度方程）或闭合回路（对两个旋度方程）的相应陈述，配上恰当的通量或环流；两者经由 [[math-methods/integral-theorems]] 的高斯定理与斯托克斯定理等价，而积分形式是其物理内容最容易直接读出的形式。积分形式就是本章四条陈述通常被引用的样子：

- 电场的高斯定律：$\oint \mathbf{E} \cdot d\mathbf{S} = Q_{\mathrm{enc}}/\varepsilon_0$。
- 磁场的高斯定律：$\oint \mathbf{B} \cdot d\mathbf{S} = 0$。
- 法拉第定律：$\oint \mathbf{E} \cdot d\mathbf{l} = -d\Phi_B/dt$。
- 安培–麦克斯韦定律：$\oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{\mathrm{enc}} + \mu_0 \varepsilon_0 \, d\Phi_E/dt$。

两个高斯定律是通量陈述，它们与两个散度陈述是同一组方程，由高斯定理相联系；两个环流定律与两个旋度陈述之间同理，由斯托克斯定理相联系。两种形式的物理内容完全相同；形式的选择是语言的选择，不是物理的选择。

::: quiz 四个麦克斯韦方程中，哪一个是"不存在磁单极"的陈述？
- [ ] $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$
- [ ] $\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \, \partial \mathbf{E}/\partial t$
- [x] $\nabla \cdot \mathbf{B} = 0$
- [ ] $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$
::: solution
 $\nabla \cdot \mathbf{B} = 0$ 是磁场没有散度、没有源或汇的定域陈述：$\mathbf{B}$ 从任一点的外发程度为零，$\mathbf{B}$ 穿过任一闭合面的净通量为零。这就是"不存在**磁单极**、不存在像电荷之于 $\mathbf{E}$ 那样扮演角色孤立磁荷"的陈述。倘若发现了磁单极，这条方程就会被换成 $\nabla \cdot \mathbf{B} = \rho_m$，其中 $\rho_m$ 为某种磁荷密度，而磁的高斯定律将取 $\oint \mathbf{B} \cdot d\mathbf{S} = \Phi_{m,\mathrm{enc}}$，与电的高斯定律形式相同。一个多世纪以来这条方程一直是 $\nabla \cdot \mathbf{B} = 0$，这就是实验内容：磁场没有散度，没有孤立的源，从北极出来的场线会回到南极，两端没有磁荷。
:::
:::

## 波动方程

 [[#eq-maxwell]] 的四个方程用在真空中（$\rho = 0$、$\mathbf{J} = 0$，即没有电荷和电流），包含两个时间导数项 $-\partial \mathbf{B}/\partial t$ 与 $\mu_0\varepsilon_0\,\partial \mathbf{E}/\partial t$，以及两个空间导数项，即两个旋度。这一结构——一边是时间导数，另一边是空间导数——正是波动方程的结构；而两个方程以时间反演的方式把 $\mathbf{E}$ 与 $\mathbf{B}$ 耦合起来（法拉第：$\partial \mathbf{B}/\partial t$ 是 $\nabla \times \mathbf{E}$ 的源；安培–麦克斯韦：$\partial \mathbf{E}/\partial t$ 是 $\nabla \times \mathbf{B}$ 的源），正是这一耦合让一个场中的属动去驱动另一个场中的属动，后者再驱动回前者，形成自维持的循环。

::: theorem 电磁波动方程 {#thm-wave}
在真空中，电场与磁场各自满足波动方程

$$
\nabla^2 \mathbf{E} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}, \qquad
\nabla^2 \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{B}}{\partial t^2},
$$ {#eq-wave-eq}
波速为 $c = 1/\sqrt{\mu_0 \varepsilon_0}$。
:::

::: proof
从真空中的 [[#eq-maxwell]] 的两个旋度方程出发。对法拉第定律取旋度：

$$
\nabla \times (\nabla \times \mathbf{E}) = -\frac{\partial}{\partial t}\left(\nabla \times \mathbf{B}\right) = -\mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2},
$$

最后一步代入了安培–麦克斯韦定律（$\rho = \mathbf{J} = 0$，故 $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$）。使用矢量恒等式 $\nabla \times (\nabla \times \mathbf{E}) = \nabla(\nabla \cdot \mathbf{E}) - \nabla^2 \mathbf{E}$，且真空中 $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0 = 0$，于是左边的第一项消失：

$$
-\nabla^2 \mathbf{E} = -\mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}, \qquad \nabla^2 \mathbf{E} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}.
$$

这就是 $\mathbf{E}$ 的波动方程，波速 $c = 1/\sqrt{\mu_0\varepsilon_0}$。同样的论证从安培–麦克斯韦定律的旋度出发并使用法拉第定律，由两个方程在真空中的对称结构，给出 $\mathbf{B}$ 的完全相同的方程，波速相同。

用测得的常量写出这一速度：$\varepsilon_0 = 8.854\times 10^{-12}\,\mathrm{F/m}$，$\mu_0 = 4\pi\times 10^{-7}\,\mathrm{H/m}$，于是

$$
\frac{1}{\sqrt{\mu_0 \varepsilon_0}} = \frac{1}{\sqrt{(1.2566\times 10^{-6})(8.854\times 10^{-12})}} = \frac{1}{\sqrt{1.1126\times 10^{-17}}} \approx \frac{1}{3.336\times 10^{-9}} \approx 2.998\times 10^{8}\,\mathrm{m/s}.
$$

在常量的精度内，这就是测得的光速 $c$。两个速度的认同不是巧合，也不是近似：它是这样一个陈述—— [[#eq-maxwell]] 的四个方程在真空中预言的波，正是光学从业者测量了一个世纪的光——而 $\varepsilon_0$ 与 $\mu_0$ 这两个在实验室里由库仑力与安培力实验分别测出的常量，不是彼此独立的数，而是同一个更基本的速度两次测量。波动方程以 [[#eq-wave-eq]] 的形式，就是这一认同的数学内容。
:::

::: example 由常量算出的速度，以及 $c$ 的含义 {#ex-c-value}
常量的测量值为 $\varepsilon_0 = 8.8541878128\times 10^{-12}\,\mathrm{F/m}$、$\mu_0 \approx 1.2566370621\times 10^{-6}\,\mathrm{H/m}$（一旦米、秒、安培被固定，乘积 $\mu_0 \varepsilon_0$ 就被固定，其值为 $1.112650056\times 10^{-17}\,\mathrm{s^2/m^2}$）。求四位有效数字的 $c$，并说明等式 $c = 1/\sqrt{\mu_0\varepsilon_0}$ 对这两个常量说了什么。
::: solution
$\mu_0 \varepsilon_0 = (1.2566370621\times 10^{-6})(8.8541878128\times 10^{-12}) \approx 1.112650056\times 10^{-17}$，于是

$$
c = \frac{1}{\sqrt{1.112650056\times 10^{-17}}} = \frac{1}{3.335640952\times 10^{-9}} \approx 2.9979\times 10^{8}\,\mathrm{m/s}.
$$

四位有效数字下 $c = 2.998\times 10^{8}\,\mathrm{m/s}$，与测得的光速相符。这个等式并不是以"新计算"的意义从两个常量导出 $c$：它是这样一个陈述——$\varepsilon_0$ 与 $\mu_0$ 两个常量是同一个更本量的两次测量，这个更本量就是四个方程 [[#eq-maxwell]] 所预言的扰动的速度——而乘积 $\mu_0\varepsilon_0$ 由那个速度固定，而不是相反。两个常量不是理论的独立参数；它们是库仑力常量与安培力常量，其乘积是理论所预言之波速平方的倒数。波就是光、速度是 $2.998\times 10^{8}\,\mathrm{m/s}$，这是实验内容。
:::
:::

::: example 真空中的平面波：它的 $\mathbf{E}$ 与 $\mathbf{B}$ {#ex-plane}
真空中一列沿 $+x$ 方向传播的平面电磁波满足 $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$。求磁场 $\mathbf{B}$。
::: solution
真空中的平面波满足 $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ 与 $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$，而传播方向、偏振方向与比值 $E_0/B_0$ 由这两条确定。取 $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$。逐分量计算旋度：$(\nabla \times \mathbf{E})_z = \partial_x E_y - \partial_y E_x = \partial_x (E_0 \cos(kx - \omega t)) = -k E_0 \sin(kx - \omega t)$，其余分量为零（$E_y$ 除上述外不依赖 $x$ 或 $z$，且 $E_x = E_z = 0$）。于是 $\nabla \times \mathbf{E} = -k E_0 \sin(kx - \omega t)\, \hat{\mathbf{z}}$。法拉第定律给出 $\partial \mathbf{B}/\partial t = k E_0 \sin(kx - \omega t)\, \hat{\mathbf{z}}$，对时间积分（$\sin(kx - \omega t)$ 的积分是 $-\cos(kx - \omega t)/\omega$），

$$
\mathbf{B}(x,t) = \frac{k E_0}{\omega} \cos(kx - \omega t)\, \hat{\mathbf{z}}.
$$

安培–麦克斯韦定律对同一拟设，$\nabla \times \mathbf{B}$，$(\nabla \times \mathbf{B})_y = \partial_z B_x - \partial_x B_z = -\partial_x (B_0 \cos(kx - \omega t)) = k B_0 \sin(kx - \omega t)$，而 $\mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t = \mu_0\varepsilon_0 (\\omega E_0 \sin(kx - \omega t))\, \hat{\mathbf{y}}$，于是 $k B_0 = \mu_0\varepsilon_0 \omega E_0$，$B_0 = (\omega/(k)) \mu_0\varepsilon_0 E_0 = (1/c) E_0 \cdot \mu_0\varepsilon_0 c \cdot ... $ 直接算，速度为 $c$ 的波有 $k/\omega = 1/v = 1/c$，所以 $B_0 = (k/\omega) E_0 \cdot (1/(\mu_0\varepsilon_0 c)) \cdot \mu_0\varepsilon_0$……干净的算法是 $B_0 = \mu_0\varepsilon_0 \omega E_0/k = \mu_0\varepsilon_0 (\\omega/k) E_0 = \mu_0\varepsilon_0 c E_0 = E_0/c$，因为 $\omega/k = c$ 且 $\mu_0\varepsilon_0 c = 1/c$……直接算，$\mu_0\varepsilon_0 c = \mu_0\varepsilon_0 \cdot 1/\sqrt{\mu_0\varepsilon_0} = \sqrt{\mu_0\varepsilon_0} = 1/c$。于是 $B_0 = E_0/c$，且

$$
\mathbf{B}(x,t) = \frac{E_0}{c} \cos(kx - \omega t)\, \hat{\mathbf{z}}.
$$

两个场同相（都是 $\cos(kx - \omega t)$，没有四分之一周期的错位）、横向（都垂直于传播方向 $\hat{\mathbf{x}}$），比值 $E_0/B_0 = c$ 就是波速。这就是平面波的全部内容，而比值 $E/B = c$ 正是 [[magnetism/electromagnetic-waves]] 中强度与辐射压计算所使用的事实。
:::
:::

::: example 由测得的强度求场振幅 {#ex-intensity}
真空中一束激光的强度为 $I = 1.0\,\mathrm{W/m^2}$，线偏振。求电场的振幅 $E_0$ 与磁场的振幅 $B_0$。
::: solution
平面波的时间平均坡印廷通量为 $I = \langle S \rangle = \tfrac12 \varepsilon_0 c E_0^2$（$\cos^2$ 的平均是 $\tfrac12$），于是

$$
E_0 = \sqrt{\frac{2I}{\varepsilon_0 c}} = \sqrt{\frac{2}{(8.854\times 10^{-12})(2.998\times 10^{8})}} \approx \sqrt{7.52\times 10^{3}} \approx 86.7\,\mathrm{V/m}.
$$

磁场振幅为 $B_0 = E_0/c \approx 86.7/2.998\times 10^{8} \approx 2.89\times 10^{-7}\,\mathrm{T} = 0.289\,\mathrm{\mu T}$，与地磁场相当。两个振幅由平面波的 $E_0/B_0 = c$ 拴在一起，强度固定了其中一个，另一个由比值随即便得。$1\,\mathrm{W/m^2}$ 的束流是一个不大的强度——大气层顶的太阳约为其同量级，大约 $1.3\,\mathrm{kW/m^2}$ 乘以入射角余弦的一个因子——而 $86.7\,\mathrm{V/m}$ 是光电管看到的场的振幅：远在真空管或半导体结能够响应的范围之内，并且在 [[quantum-1/origins]] 的量子处理中，与驱动光电效应的场同量级。
:::
:::

::: warning 场不是被某种介质"携带"的
 [[#eq-wave-eq]] 中的波是场中的波，不是某种实体中的波。十九世纪以太的那种"介质"——把光波当作其中的机械扰动的假想弹性固体——不在方程里：$\mathbf{E}$ 与 $\mathbf{B}$ 是动力学变量，四个方程 [[#eq-maxwell]] 是它们的运动方程，而波是这些方程在真空中、没有任何物质存在时的解。速度 $c$ 不是波相对于介质的速度；它就是方程所预言的速度，并且在一切惯性系中相同，正如狭义相对论课程的 [[relativity/postulates#ax-light]] 所述。以太并不是"错误模型的失败介质"那个意义上的失败；它是 1905 年之前，为"波在真空中存在"这一事实设置的占位符，而当方程被理解为场自身的方程、无须任何实体时，这个占位符就被退役了。
:::

::: widget wave
A: 1
B: 0
k: 2
w: 2
caption: 一列向右传播的波，即 [[#ex-plane]] 的平面波的 $\mathbf{E}$ 场在其传播方向上的形式。$\mathbf{B}$ 场与之同相，振幅除以 $c$，方向垂直于 $\mathbf{E}$ 与传播方向两者。把 $B$ 设为一个小值即可看到驻波，它是右行与左行分量的叠加；驻波的形式与 [[oscillations/superposition]] 的机械驻波是同一套数学，只是把振动量换成了场。
:::

::: application 天线，以及它为什么能工作
一根两端有交变电流的直导线就是一副天线：尖端处加速的电荷把位移电流驱动进导线上下的间隙里，其产生的场在远处就是辐射场。天线不是推动某种波穿过某种实体的机械装置意义上的"发射机"；它是电路的一段，把位移电流驱动进间隙里，而位移电流依据安培–麦克斯韦定律是磁场旋度的源，磁场的旋度又是 $\mathbf{E}$ 场旋度的源，$\mathbf{E}$ 场的旋度再是下一个 $\mathbf{B}$ 的旋度的源，这条链以速度 $c$ 向外传播。天线能工作，是因为四个方程 [[#eq-maxwell]] 允许场在真空中自维持，而位移电流项正是这条链中不要求存在导电路径的那一环：导线上方间隙中的场由位移电流产生，而不是由任何传导产生，辐射的那部分是间隙，不是导电的部分。接收天线就是这条链倒过来运行。
:::

## 后续内容

真空中的波、它的偏振、在介质或导体中的传播、在界面上的反射与折射，以及波的强度与辐射压，是下一章 [[magnetism/electromagnetic-waves]]。同样四个方程，用在静电与静磁区域的边值问题上，就是场论课程的主题，从 [[electrodynamics/electrostatics]] 与 [[electrodynamics/magnetostatics]] 的镜像法与多极展开开始。四矢量统一—— [[#eq-maxwell]] 的两对方程在其中并成两条张量方程——见 [[electrodynamics/relativistic-fields]]。量子的内容——光子、场的量子化——是量子力学课程的主题，而把辐射场当作谐振子的处理是第一个应用，见 [[quantum-1/harmonic-oscillator]]。

::: history 麦克斯韦与光速
詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）对静电定律与静磁定律的统一，连同位移电流项，发表于 1860 年代，见于论文《论物理学的力线》(*On Physical Lines of Force*) 及随后的专著。把波速 $1/\sqrt{\mu_0\varepsilon_0}$ 认同为测得的光速、并由此推断光是电磁波，是麦克斯韦在 1865 年的论文《电磁场的动力学理论》(*A Dynamical Theory of the Electromagnetic Field*) 中完成的。实验的验证，即在实验室里产生并探测这些波，是海因里希·赫兹（Heinrich Hertz）在 1880 年代完成的：赫兹的火花隙发射器与接收器实际上就是上文 application 中的那副天线，由射频上的火花驱动；而他探测到的那些波，在远处、以四个方程预言的速度传播，是对这一理论的首次实验室验证。位移电流项闭合了只有传导电流的安培定律中的裂缝，它不是一条独立的定律；它就是导线中的传导电流本已满足的那个电荷守恒 $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$，改写成了极板之间的场所要求的形式。二者是一回事，而四个方程与这一陈述的相容性，正是位移电流项所提供的内容。
:::

::: summary
- 真空中的四个麦克斯韦方程 [[#eq-maxwell]]：$\mathbf{E}$ 的散度由 $\rho$ 决定，$\mathbf{B}$ 的散度为零（无磁单极），$\mathbf{E}$ 的旋度由 $-\partial \mathbf{B}/\partial t$ 决定（法拉第），$\mathbf{B}$ 的旋度由 $\mu_0 \mathbf{J} + \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$ 决定（安培–麦克斯韦，含位移电流项）。
- 位移电流项 $\varepsilon_0 \partial \mathbf{E}/\partial t$ 是被这一要求逼出来的：四个方程必须与电荷守恒方程 $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$ 相容；没有它，照写的安培定律要求 $\nabla \cdot \mathbf{J} = 0$，即稳恒电流条件，而这在充电电容器中不成立（[[#thm-displacement]]）。
- 两个方程在真空中联用，给出波动方程 $\nabla^2 \mathbf{E} = \mu_0\varepsilon_0\, \partial^2 \mathbf{E}/\partial t^2$（$\mathbf{B}$ 同理），波速 $c = 1/\sqrt{\mu_0\varepsilon_0} = 2.998\times 10^{8}\,\mathrm{m/s}$，即测得的光速（[[#thm-wave]]）。
- 真空中的平面波里 $\mathbf{E}$ 与 $\mathbf{B}$ 同相、横向于传播方向，且 $E_0/B_0 = c$；波是场中的波而不是介质中的波，速度在一切惯性系中相同。
- 充电电容器间隙中的位移电流，或天线尖端的位移电流，是在没有传导电流流动的区域里作为场的源的那一项，也是使辐射场得以可能的那一项：链条 $\mathbf{E} \to \mathbf{B} \to \mathbf{E}$ 以速度 $c$ 在真空中向外传播，无需任何物质。
- 同样四个方程，在静电与静磁区域内，就是场论课程的内容；四矢量统一是该课程的相对论场一章。
:::

## 习题

::: exercise level=1
一个半径 $R = 5.0\,\mathrm{cm}$ 的圆形回路处在均匀磁场 $\mathbf{B} = B_0 \cos(200 t)\, \hat{\mathbf{z}}$ 中，$B_0 = 0.10\,\mathrm{mT}$。求 $t = 0$ 与 $t = 0.01\,\mathrm{s}$ 时回路上的电动势；若回路电阻为 $10\,\Omega$，再求 $t = 0.01\,\mathrm{s}$ 时感应电流的方向。
::: solution
$\Phi_B(t) = B_0 \pi R^2 \cos(200 t)$，其中 $\pi R^2 = \pi (0.050)^2 \approx 7.854\times 10^{-3}\,\mathrm{m^2}$。于是磁通量振幅为 $B_0 \pi R^2 = (0.10\times 10^{-3})(7.854\times 10^{-3}) \approx 7.85\times 10^{-7}\,\mathrm{Wb}$，且

$$
\mathcal{E}(t) = -\frac{d\Phi_B}{dt} = 200\, B_0 \pi R^2 \, \sin(200 t) \approx 1.57\times 10^{-4}\sin(200 t)\,\mathrm{V}.
$$

$t = 0$ 时电动势为 $0$。$t = 0.01\,\mathrm{s}$ 时，$\sin(2.0) \approx 0.909$，所以 $\mathcal{E} \approx 1.57\times 10^{-4} \times 0.909 \approx 1.43\times 10^{-4}\,\mathrm{V} = 0.143\,\mathrm{mV}$，而 $R = 10\,\Omega$ 下电流为 $I \approx 1.43\times 10^{-5}\,\mathrm{A}$。方向：$t = 0.01\,\mathrm{s}$ 时 $d\mathbf{B}/dt = -200 B_0 \sin(2.0)\, \hat{\mathbf{z}} < 0$，沿 $+\hat{\mathbf{z}}$ 方向的磁通在减小，由楞次定律，感应电流产生的磁场反抗这一减小，即沿 $+\hat{\mathbf{z}}$ 方向，因此从 $+\hat{\mathbf{z}}$ 看电流为逆时针。
:::
:::

::: exercise level=1
一个 $N = 500$ 匝、面积 $A = 20\,\mathrm{cm^2}$ 的线圈处在均匀场中，场在 $0.020\,\mathrm{s}$ 内从 $0.15\,\mathrm{T}$ 降到零。求平均电动势。
check="7.5"
::: solution
$A = 20\,\mathrm{cm}^2 = 2.0\times 10^{-3}\,\mathrm{m}^2$，磁链的变化为 $\Delta\Lambda = N A \, \Delta B = 500 \times 2.0\times 10^{-3} \times 0.15 = 0.15\,\mathrm{Wb}$（匝数已计入）。平均电动势为

$$
\mathcal{E}_{\mathrm{avg}} = \frac{\Delta\Lambda}{\Delta t} = \frac{0.15}{0.020} = 7.5\,\mathrm{V},
$$

与 check 值相符。均匀下降给出的平均值与任何端点相同的下降相同； 骤降在所取的区间上给出同样的 $\Delta\Lambda/\Delta t$。符号由楞次定律确定，使感应电流反抗磁通的减小，但题目只问大小。
:::
:::

::: exercise level=2
一长螺线管半径为 $a$，每米 $n$ 匝，载电流 $I(t) = I_0 \sin \omega t$。用法拉第定律求螺线管外部半径 $r > a$ 处的电场。
hint="理想螺线管外部 B 为零，所以螺线管外半径 r 的圆形回路的磁通量就是螺线管横截面上的磁通量。由对称性，E 沿切向且在回路上大小均匀。"
::: solution
理想螺线管外部 $\mathbf{B} = 0$，半径 $r > a$ 的圆形回路的磁通量就是螺线管横截面 $\pi a^2$ 上的磁通量，即 $\Phi_B = B(t) \pi a^2 = n\mu_0 I(t) \pi a^2$，其中 $B(t) = n\mu_0 I_0 \sin \omega t$ 是螺线管内部的场。对回路用法拉第定律：

$$
\mathcal{E} = \oint \mathbf{E} \cdot d\mathbf{l} = E(r) \cdot 2\pi r = -\frac{d\Phi_B}{dt} = -n\mu_0 \pi a^2 \cdot I_0 \omega \cos \omega t.
$$

于是

$$
E(r) = -\frac{n\mu_0 I_0 \omega a^2}{2r} \cos \omega t, \qquad r > a.
$$

螺线管外部的场沿切向、按 $1/r$ 衰减，它完全由内部磁通的*变化*产生，而不是由回路处任何电荷或电流产生：这就是感应场，即使螺线管是一个短路的超导环，真空中螺线管外部也会存在的场；它与 [[#ex-charging]] 中充电电容器的电场是同一套数学，只是变化的磁通扮演变化电荷的角色。$1/r$ 依赖是把同样的总环流摊到更大的回路上所付的几何代价，它与线电荷的场有同样的 $1/r$，理由也相同：这个场是无源的（有旋）场，旋度穿过圆盘的通量被固定，于是边界上的线积分必须固定，而在 $1/r$ 对称之下唯一的做法就是 $1/r$ 的场。
:::
:::

::: exercise level=2
用连续性方程求面积为 $A$ 的平行板电容器在传导电流 $I$ 充电时两极板之间的位移电流。证明它与极板间距无关。
::: solution
极板之间，导线中的电流为 $I$；对一个包围一块极板及其间隙的扁盒形高斯面应用连续性方程，到达极板的电流（传导的 $I$）必须以位移电流的形式离开极板进入间隙：$\varepsilon_0 \partial E/\partial t \cdot A = I$，即 $\varepsilon_0 \partial E/\partial t = I/A$。位移电流的*密度*是 $I/A$，而穿过间隙的总位移电流是 $\varepsilon_0 \partial E/\partial t \cdot A = I$，与传导电流完全相合。间距不参与，因为无论极板间距如何，$\partial E/\partial t$ 都会自行调整，使位移电流密度保持 $I/A$：间隙越宽，$\partial E/\partial t$ 越小（同样的 $dQ/dt$ 之下场变化更慢，因为 $E = Q/(\varepsilon_0 A)$ 不依赖间距），而乘积 $\varepsilon_0 \partial E/\partial t \cdot A$ 无论如何都是 $I$。与极板间距无关这一事实就是连续性方程的内容，它和"导线中的传导电流与间隙中的位移电流是同一条电流的两个部分、而非两条独立电流"是同一个内容。
:::
:::

::: exercise level=3
证明 [[#thm-wave]] 的波动方程被 [[#ex-plane]] 的平面波 $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$ 对任意 $\omega$ 与 $k$ 满足，并求出它成为真空中完整麦克斯韦方程组的解时 $\omega/k$ 需满足的条件。
hint="场在一维情形下的拉普拉斯算子是 d^2 E_y / dx^2；对时间的二阶导数是 -omega^2 E_y。令二者相等，并用波速。"
::: solution
$\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$，其中 $E_y = E_0 \cos(kx - \omega t)$。拉普拉斯算子在一维（不依赖 $y$ 或 $z$）之下是 $\nabla^2 \mathbf{E} = (\partial^2 E_y/\partial x^2)\, \hat{\mathbf{y}} = -k^2 E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}} = -k^2 \mathbf{E}_y\, \hat{\mathbf{y}}$。对时间的二阶导数是 $\partial^2 E_y/\partial t^2 = -\omega^2 E_0 \cos(kx - \omega t)$，即 $\partial^2 \mathbf{E}/\partial t^2 = -\omega^2 \mathbf{E}$。波动方程 $∇^2 \mathbf{E} = \mu_0\varepsilon_0\, \partial^2 \mathbf{E}/\partial t^2$ 化为 $-k^2 \mathbf{E} = \mu_0\varepsilon_0 (-\omega^2) \mathbf{E}$，即 $k^2 = \mu_0\varepsilon_0 \omega^2$，即 $k/\omega = \sqrt{\mu_0\varepsilon_0} = 1/c$，故 $\omega/k = c$。 [[#ex-plane]] 的平面波对任意 $\omega, k$ 都满足波动方程，但它只在色散关系 $\omega = ck$ 成立、亦即波速恰为 $c$ 时，才满足真空中的*完整*麦克斯韦方程组。条件 $\omega/k = c$ 就是这列波的色散关系；它与"平面波满足 [[#eq-maxwell]] 的两个旋度方程、而不只是导出物波动方程"是同一个条件：波动方程是两个旋度方程的推论，而满足推论的函数未必满足原方程，除非再施加色散关系。满足 $\omega = ck$ 的平面波满足完整方程组，那才是电磁平面波。
:::
:::

::: exercise level=3
证明在真空中，$\nabla \cdot \mathbf{E} = 0$ 与 $\nabla \cdot \mathbf{B} = 0$ 对自由（无源）场可由两个旋度方程与电荷守恒方程推出。再证明：若在某个点 $\nabla \cdot \mathbf{E} \ne 0$，该点就必须有非零的 $\rho$，因而 $\mathbf{E}$ 的散度是局域电荷密度的诊断量。
::: solution
真空中 $\rho = 0$、$\mathbf{J} = 0$。两个旋度方程是 $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ 与 $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$。对第二个取散度：$0 = \nabla \cdot (\nabla \times \mathbf{B}) = \mu_0\varepsilon_0\, \partial (\nabla \cdot \mathbf{E})/\partial t$，由矢量恒等式 $\nabla \cdot (\nabla \times \mathbf{B}) = 0$ 这是一个恒等式，它本身并不直接给出关于 $\nabla \cdot \mathbf{E}$ 的信息；信息来自初始条件 $\nabla \cdot \mathbf{E} = \rho(0)/\varepsilon_0 = 0$（$t = 0$ 时）以及时间导数 $\partial (\nabla \cdot \mathbf{E})/\partial t = 0$，二者共同固定了 $\nabla \cdot \mathbf{E} = 0$ 对所有 $t$ 成立。同样的论证——对第一个旋度方程取散度并使用 $\nabla \cdot (\nabla \times \mathbf{E}) = 0$——给出 $\partial (\nabla \cdot \mathbf{B})/\partial t = 0$，再加上初始条件 $t = 0$ 时 $\nabla \cdot \mathbf{B} = 0$，场便永远保持无散。

第二部分，高斯定律是 $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$，所以在某点 $\nabla \cdot \mathbf{E} \ne 0$ 就要求该点 $\rho \ne 0$：$\mathbf{E}$ 的散度是 $\rho/\varepsilon_0$，非零散度就是"该点有电荷"的定域微分陈述。这一内容与积分形式 $\oint \mathbf{E} \cdot d\mathbf{S} = Q_{\mathrm{enc}}/\varepsilon_0$ 相同，而定域形式正是把电荷密度定在一点上的那一个，这才是诊断的意义：$\mathbf{E}$ 在某点的散度就是该点的电荷密度除以 $\varepsilon_0$，不掺别的。
:::
:::

::: exercise level=3
一列角频率为 $\omega$ 的电磁波沿法线方向入射到一个完全导体的平面上。证明反射波加上入射波给出驻波，并求电场波节的位置。
hint="导体表面 E = 0（切向 E 在表面为零）；反射波振幅相同、E 取反号（以在表面抵消入射 E），两者之和即驻波。"
::: solution
入射波自左向右沿 $+x$ 传播，$\mathbf{E}_i = E_0 \cos(\omega t - kx)\, \hat{\mathbf{y}}$（取 $x$ 为法向，$x = 0$ 是导体表面，$x < 0$ 是真空一侧……入射波沿 $+x$ 朝 $x = 0$ 处的导体传播，所以对 $x < 0$，$\mathbf{E}_i = E_0 \cos(\omega t - kx)\, \hat{\mathbf{y}}$）。反射波沿 $-x$ 传播：$\mathbf{E}_r = E_r \cos(\omega t + kx + \varphi_r) \hat{\mathbf{y}}$，振幅与相位由 $x = 0$ 处的边界条件固定：完全导体表面的切向 $\mathbf{E}$ 为零，故 $\mathbf{E}(0,t) = \mathbf{E}_i(0,t) + \mathbf{E}_r(0,t) = 0$，得 $E_r = -E_0$、$\varphi_r = 0$（差一个可被余弦吸收的符号），即 $\mathbf{E}_r = -E_0 \cos(\omega t + kx) \hat{\mathbf{y}}$。总场为，用 $\cos A - \cos B = -2 \sin((A+B)/2)\sin((A-B)/2)$，其中 $A = \omega t - kx$、$B = \omega t + kx$（于是 $(A+B)/2 = \omega t$、$(A-B)/2 = -kx$），

$$
\mathbf{E}(x,t) = E_0 \cos(\omega t - kx) - E_0 \cos(\omega t + kx) = 2E_0 \sin kx\, \sin \omega t\, \hat{\mathbf{y}}.
$$

这个场是驻波：空间因子 $\sin kx$ 与时间因子 $\sin \omega t$ 分离，波节（对所有 $t$ 场为零）在 $\sin kx = 0$，即 $x = n\pi/k = n\lambda/2$，$n = 0, 1, 2, \ldots$。波节间隔 $\lambda/2$，任一波节处的场在任何时刻都是零。导体处（$x = 0$）场为零，正如边界条件所要求；波节的位置就是入射波与反射波永远精确反相、振幅逐时刻相消之处。磁场由同样的论证得出——用完全导体处法向 $\mathbf{B}$ 的边界条件（为零）——它的波腹恰在电场波节处，而这两个驻波在空间上正交：电场的波节就是磁场的波腹，反之亦然。
:::
:::

::: exercise level=3
真空中电磁场的能量密度为 $u = \tfrac12 \varepsilon_0 E^2 + B^2/(2\mu_0)$，坡印廷矢量为 $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$。用 [[#eq-maxwell]] 在真空中的两个旋度方程证明它们满足定域能量守恒方程 $\partial u/\partial t + \nabla \cdot \mathbf{S} = 0$。
hint="对 u 关于 t 求导，用两个旋度方程给出的 dE/dt 与 dB/dt，并使用矢量恒等式 d/dt (E x B) = E x dB/dt + dE/dt x B，以及 E x B 的散度即坡印廷通量。"
::: solution
对 $u = \tfrac12 \varepsilon_0 E^2 + B^2/(2\mu_0)$ 关于 $t$ 求导：

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\partial \mathbf{E}}{\partial t} + \frac{\mathbf{B} \cdot \partial \mathbf{B}}{\mu_0 \partial t}.
$$

使用真空中的两个旋度方程：$\partial \mathbf{E}/\partial t = \cdots$ 由法拉第 $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$，以及安培–麦克斯韦 $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$，即 $\partial \mathbf{E}/\partial t = (\nabla \times \mathbf{B})/(\mu_0\varepsilon_0)$、$\partial \mathbf{B}/\partial t = -\nabla \times \mathbf{E}$。代入：

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\nabla \times \mathbf{B}}{\mu_0\varepsilon_0} + \frac{\mathbf{B} \cdot (-\nabla \times \mathbf{E})}{\mu_0} = \frac{1}{\mu_0} \left[\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E})\right].
$$

使用矢量恒等式 $\nabla \cdot (\mathbf{E} \times \mathbf{B}) = \mathbf{B} \cdot (\nabla \times \mathbf{E}) - \mathbf{E} \cdot (\nabla \times \mathbf{B})$，改写即 $\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E}) = -\nabla \cdot (\mathbf{E} \times \mathbf{B})$。于是

$$
\frac{\partial u}{\partial t} = -\frac{1}{\mu_0} \nabla \cdot (\mathbf{E} \times \mathbf{B}) = -\nabla \cdot \left(\frac{\mathbf{E} \times \mathbf{B}}{\mu_0}\right) = -\nabla \cdot \mathbf{S}.
$$

移项即得 $\partial u/\partial t + \nabla \cdot \mathbf{S} = 0$：一点处能量密度的变化率，是坡印廷矢量穿过该点周围一个小体积边界的通量的相反数，这就是场的能量守恒的定域陈述。项 $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$ 是能流，即电磁能随面积流动（单位面积、单位时间）的速率；方程说的是能量不增不减，只是被搬运：局域能量密度的减少由流出该区域的能流抵偿，增加则由流入的能流抵偿。对 [[#ex-plane]] 的平面波，$\mathbf{S} = E_0^2/\mu_0\, c \cdot \cos^2(kx - \omega t) \hat{\mathbf{x}} \cdot \mu_0\varepsilon_0 c \cdot ... $ 直接算，$\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0 = (E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}) \times (E_0/c \cos(kx - \omega t)\, \hat{\mathbf{z}})/\mu_0 = E_0^2/(c)\cos^2(kx - \omega t)\, \hat{\mathbf{x}}/\mu_0 \cdot \mu_0\varepsilon_0 c / \mu_0$……干净的算法是 $\mathbf{E} \times \mathbf{B} = (E_0 \cos(kx - \omega t))(E_0/c) \cos(kx - \omega t)\, \hat{\mathbf{y}} \times \hat{\mathbf{z}} = E_0^2/c \cos^2(kx - \omega t)\, \hat{\mathbf{x}}$，于是 $\mathbf{S} = E_0^2/(\mu_0 c) \cos^2(kx - \omega t)\, \hat{\mathbf{x}} = \varepsilon_0 c E_0^2 \cos^2(kx - \omega t)\, \hat{\mathbf{x}}$，因为 $1/(\mu_0 c) = \varepsilon_0 c$。一个周期上坡印廷通量的平均值为 $\tfrac12 \varepsilon_0 c E_0^2$，即波的强度；这就是场的能量守恒在辐射形式下的内容。
:::
:::
