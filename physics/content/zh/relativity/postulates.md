你站在一条又长又平的站台上，一列火车以恒定速度滑过。松手丢一枚硬币：它竖直落到车厢地板，就像火车停在原地时一样。把球抛给同车的乘客：与站台上两个人之间的一样，就一切实际目的而言，球的飞行毫无二致。车厢内部发生的力学，看起来并不在意车厢在运动。这不是巧合。正如 [[relativity/galilean]] 所显示的，从一个**惯性**参考系换到另一个时，力学定律保持形式不变，而完成这笔账的坐标记账就是伽利略变换。

电磁学打破了这个习惯。真空中的麦克斯韦方程组预言以确定速率 $c \approx 2.99792458\times 10^{8}\,\mathrm{m/s}$ 传播的波。确定的速率——**什么**相对**什么**的速率？如果速度是相对观察者的参考系而言的，那么在伽利略图像下，光波对一个相对……以 $v$ 运动的观察者就应以 $c+v$ 传播——相对什么的 $v$？以太就是作为答案被发明出来的：波在其中奔跑、速率相对它测量的那种东西——而著名的 1887 年迈克尔逊–莫雷（Michelson–Morley）实验找不到以太风。爱因斯坦在 1905 年的论文里做了所有其他人反着做的事：他不再问“$c$ 是相对什么的？”，而是把 $c$ 的不变性立为一条**规则**：每个惯性观察者测得同一光速。这一条规则，连同一切惯性系都平权的原理，把一套关于空间与时间的新算术强加给物理学的其余部分。

本章陈述这两条规则，并在不夹带任何隐藏物理的前提下导出它们所蕴含的坐标变换。推导是初等代数，其结论却不初等：时间与长度不再绝对。时间膨胀、长度收缩，以及它们背后同时的相对性，是 [[relativity/time-and-length]] 的主题；由这套新运动学产生的能量与动量在 [[relativity/velocity-energy]]。

## 两条公设

陈述公设之前，词汇表里需要一个精确的词。**惯性系**是这样一种参考系：其中不受力的质点沿直线以恒定速率运动。固定在一台旋转离心机上的实验室不是；一艘远离一切质量自由滑行的飞船是极好的——在 [[relativity/galilean#def-inertial]] 中，力学的惯性系正是这样定义的，而且这个定义并没有要变。每个参考系携带一整套测量装置：静在该系中的尺，以及**静在该系中、布满空间的钟**。事件——这里一次闪光、那里一次碰撞——是发生在空间一点与时间一瞬的局部事情，每个参考系在一维空间中为它指派自己的坐标 $(x, t)$。该查哪一只钟是记账的一部分：查*该系中事件所在地点的那只钟*，按该系自己的对表程序 ([[relativity/time-and-length#def-sync]])。

爱因斯坦在 1905 年陈述的两条公设：

::: axiom 相对性公设 {#ax-relativity}
物理定律在每个惯性系中取相同的形式。
:::

::: axiom 光速不变公设 {#ax-light}
真空中的光速在每个惯性系中是同一常量 $c$，与波源的运动无关。
:::

第一条公设是牛顿的那一条的升级版：不问力学的定律，而问**物理**的定律，包括通不过伽利略检验的麦克斯韦方程组。第二条公设是经验咬人的地方。“与波源的运动无关”要紧：行驶火车的头灯闪光不会因车速而更快。波源的速度从答案中退场。

这两条不能从任何更基本的东西导出——公设是与自然商定的规则。从它们**出发**、此外不借外力、只靠代数得到的，是两个惯性系赋予同一批事件的坐标之间的变换。这就是本章的内容。

## 变换可以是什么样

两个参考系记作 $S$ 与 $S'$，同 [[relativity/galilean#def-galilean]]。$S'$ 相对 $S$ 沿 $+x$ 方向以恒定速率 $v$ 运动。两原点在 $t = t' = 0$ 重合，坐标轴平行。我们要求用 $(x, t)$ 表示 $(x', t')$。

在有第一个数进入之前，已有两条结构性约束生效。

::: proposition 线性 {#prop-linear}
从一个事件在 $S$ 中的坐标到它在 $S'$ 中坐标的变换是线性的：由常数的乘与加构成，不含对坐标的平方或除法。
:::

::: proof
静在 $S'$ 中的自由质点（对所有 $t'$ 有 $x' = 0$）在 $S$ 中以恒定速率 $v$ 运动：世界线 $x' = 0$ 必须映射为 $S$ 中笔直、均匀的世界线 $x = vt$。若映射是非线性的——比如 $x'$ 含有 $x^2$ 或 $xt$ 一类东西——那么直线 $x = vt$ 从 $S'$ 返回时就会变弯或不均匀，与“无力运动在每个惯性系中都是均匀直线的”这一公设矛盾。

同样的论证反过来讲：$S$ 中一条匀速运动线 $x = ut$，在 $S'$ 中也必须是一条匀速运动线。把每条非竖直直线送成直线、把原点送成原点的函数是仿射的：线性加一个常数，而两原点重合消掉了那个常数。系数不能依赖事件：若依赖，从 $S$ 到 $S'$ 的变换就会因事件而异，这是矛盾的，因为参考系本身是固定的，它们之间的关系只是坐标系统之间的一个固定关系。

于是，对单个空间维度，
$$
x' = A\,x + B\,t, \qquad t' = C\,t + D\,x,
$$ {#eq-general}
其中 $A, B, C, D$ 是与事件无关的常数。线性是第一公设加上空间与时间的均匀性的推论；随后第二条公设将确定这四个常量。
:::

$S'$ 的原点按定义坐在 $S$ 的 $x = vt$ 处，而它在自己的系里坐标为 $x' = 0$。把 $x = vt$ 代入 [[#eq-general]] 的第一式，得对一切 $t$ 有 $0 = A v t + B t$，所以 $B = -A v$：

$$
x' = A\,(x - v t).
$$ {#eq-xfactor}

这已经超出伽利略力学所允许的了。在 [[relativity/galilean#eq-galilean]] 的伽利略变换里，时间是共享的，$t' = t$，空间被 $-vt$ 剪切而系数为 $1$。这里同一个剪切的系数是未知的 $A$，而且时间坐标允许同时是 $t$ 与 $x$ 的混合。新物理全在这第二部分里，因为它恰恰是第二条公设所要求的。

## 光波前确定时间坐标

$t = t' = 0$ 时在公共原点处发出的闪光球对称地散开。在我们的轴线上，扰动右行的边缘是**光波前**，在 $S$ 中为 $x = c t$。在 $S'$ 中，同一次闪光从 $S'$ 的原点散开，右行的边缘在那儿是 $x' = c t'$：第二条公设没有说*哪个*参考系可以对这个波前看到不同的速率，它说两者都看到 $c$。

于是，$S$ 坐标中的直线 $x = c t$ 必须被变换载为 $S'$ 坐标中的直线 $x' = c t'$。对右行的波前 $x = c t$ 应用 [[#eq-general]]，并写 $\beta = v/c$：

$$
x' = A\,(c t - v t) = A c\,(1 - \beta)\,t, \qquad t' = (C + D\,c)\,t.
$$ {#eq-rfront}

要求这条线是 $S'$ 中的光波前 $x' = c t'$，就是让 $x'$ 与 $t'$ 逐点满足 $x' = c t'$；把 [[#eq-rfront]] 的第一式除以第二式、令比值等于 $c$，得到约束

$$
C + D\,c = A\,(1 - \beta).
$$ {#eq-rconstraint}

::: proposition 光波前约束 {#prop-lightfront}
变换把右行光波前送到右行光波前、左行光波前送到左行光波前：
$$
x = c t \iff x' = c t', \qquad x = -c t \iff x' = -c t'.
$$ {#eq-lightfront}
:::

左行的波前是同一次球闪光的另一半，处理完全相同。对它——$x = -c t$——应用 [[#eq-general]]：

$$
x' = A\,(-c t - v t) = -A c\,(1 + \beta)\,t, \qquad t' = (C - D\,c)\,t,
$$

而沿这条线要求 $x' = -c t'$，用同样的除法得

$$
C - D\,c = A\,(1 + \beta).
$$ {#eq-lconstraint}

把 [[#eq-rconstraint]] 与 [[#eq-lconstraint]] 相加：$D$ 项相消且 $C = A$。相减：$2 D c = A(1-\beta) - A(1+\beta) = -2 A \beta$，于是 $D = -A \beta / c$。有了 $C = A$ 与 $D = -A\beta/c$，时间坐标是

$$
t' = C t + D x = A \left(t - \frac{\beta}{c}\,x\right) = A\left(t - \frac{v x}{c^2}\right),
$$

连同 [[#eq-xfactor]]，它就是

$$
x' = A\,(x - v t), \qquad t' = A\left(t - \frac{v x}{c^2}\right).
$$ {#eq-pregamma}

$S'$ 的时间坐标货真价实地被位置污染了：$S$ 判为同时（$t_1 = t_2$）但 $x$ 不同的两个事件，在 $S'$ 中*不*同时。还没有代入任何数值，第二条公设就已经打碎了绝对时间。只剩一个常量 $A$，而它的确定完全不费任何物理输入：只要求变换是一次名副其实的换坐标——它的逆变换必须与把 $v$ 换成 $-v$ 的同一条定律一致。它必须一致，因为 $S$ 相对 $S'$ 以 $-v$ 运动，而两个系平权。

## 洛伦兹变换

::: theorem 洛伦兹变换 {#thm-lorentz2}
在 $t=t'=0$ 时两原点重合、相对只有纵向运动、速率为 $v$ 的两个惯性系 $S$ 与 $S'$ 的坐标之间，把光波前送到光波前的线性变换是唯一的；记 $\beta = v/c$ 及

$$
\gamma = \frac{1}{\sqrt{1 - \beta^2}} = \frac{1}{\sqrt{1 - v^2/c^2}},
$$ {#eq-gamma}

它等于

$$
x' = \gamma\,(x - v t), \qquad t' = \gamma\left(t - \frac{v x}{c^2}\right).
$$ {#eq-lorentz2}
:::

::: proof
从 [[#eq-pregamma]] 出发。因为两个参考系平权——第一公设是关于这*一对*参考系的陈述，不是对其中任何一个的偏袒——逆变换就是把 $v$ 换成 $-v$ 的同一条定律：同一个未知系数 $A$，相反的相对速度：

$$
x = A\,(x' + v t'), \qquad t = A\left(t' + \frac{v x'}{c^2}\right).
$$ {#eq-inverse}

（这里没有新的常量：若从 $S$ 到 $S'$ 的正变换与从 $S'$ 到 $S$ 的逆变换带着不同的比例因子，那么往返一趟 $S \to S' \to S$ 的复合就会在每个事件上留下一个残余比例，与“往返是恒等变换”矛盾。互易性把两个比例因子固定为相等，随后复合运算确定它们的公共值。）

现在把 [[#eq-inverse]] 代入正变换的 $x$ 律，并要求结果是 $x'$：

$$
x - v t \;=\; A(x' + v t') - v A\left(t' + \frac{v x'}{c^2}\right) \;=\; A x' + A v t' - A v t' - \frac{A v^2}{c^2}\,x' \;=\; A\left(1 - \frac{v^2}{c^2}\right)x' .
$$

$t'$ 项精确相消——$+Avt'$ 对 $-Av\,t'$——因为两条定律里出现的是*同一个* $A$ 与*同一个* $v$；这一相消是互易性的内容，不是偷运进来的假设。于是对每个事件，

$$
x' \;=\; A(x - v t) \;=\; A^2\left(1 - \frac{v^2}{c^2}\right) x' .
$$

系数必须是 1：

$$
A^2 = \frac{1}{1 - v^2/c^2} \qquad\Longrightarrow\qquad A = \frac{1}{\sqrt{1 - v^2/c^2}} = \gamma,
$$

取正根，因为 $A$ 关于 $v$ 连续，且当 $v \to 0$ 时必须回到伽利略系数 $1$。$t$ 律的复合由完全一样的代数归为恒等——那边的 $x'$ 项恰好以刚才 $t'$ 项相消的方式相消。把 $A = \gamma$ 代入 [[#eq-pregamma]] 即得 [[#eq-lorentz2]]。 \qquad∎
:::

推导刻意逐行写明，因为仅有的两个*输入*是：(i) 两个参考系平权，故逆变换是正变换作 $v \to -v$；(ii) 两个参考系都以 $c$ 看到光波前。其余一切——因子 $\gamma$、时间与位置的混合、量 $c^2 t^2 - x^2$ 的不变性——都是代数。这套代数的代价在 $v \gg c$ 处支付，那里 $\gamma \to \infty$；推导中没有任何神秘之处。

::: corollary 不变间隔 {#cor-interval}
量 $c^2 t^2 - x^2$ 在 $S$ 与 $S'$ 中相同：对任何事件，

$$
c^2 t'^2 - x'^2 = c^2 t^2 - x^2.
$$ {#eq-interval2}
:::

::: proof
以 $A = \gamma$ 代入 [[#eq-lorentz2]]：

$$
c^2 t'^2 - x'^2 = \gamma^2 c^2\left(t - \frac{v x}{c^2}\right)^2 - \gamma^2(x - v t)^2 = \gamma^2\left[c^2 t^2 - 2 v t x + \frac{v^2 x^2}{c^2} - x^2 + 2 v t x - v^2 t^2\right]
$$

$$
= \gamma^2\left[\left(c^2 - v^2\right) t^2 + \left(\frac{v^2}{c^2} - 1\right) x^2\right] = \gamma^2 (c^2 - v^2)\left[t^2 - \frac{x^2}{c^2}\right] = \gamma^2 c^2\left(1 - \frac{v^2}{c^2}\right)\left(t^2 - \frac{x^2}{c^2}\right).
$$

因为 $\gamma^2 = 1/(1 - v^2/c^2)$，前置因子恰为 $c^2$，于是

$$
c^2 t'^2 - x'^2 = c^2 t^2 - x^2. \qquad\blacksquare
$$
:::

不变量 $c^2 t^2 - x^2$（或反号的那个表亲 $x^2 - c^2 t^2$——取哪一个都是约定）是所有惯性系都一致的东西。它是伽利略世界里分别绝对的距离与时间的替身。它——而不是单独的 $t$ 或单独的 $x$——*正是*这个量并非巧合：它是洛伦兹变换群保持的二次型，而群条件恰恰就是在 [[#thm-lorentz2]] 的证明中固定 $A = \gamma$ 的那个条件。这一不变量的完整结构——四维矢量、质量壳、碰撞中的不变量——在 [[relativity/four-vectors]]。

## 低速极限是伽利略的

::: corollary 伽利略极限 {#cor-galilean}
当 $v/c \to 0$ 时，洛伦兹变换 [[#eq-lorentz2]] 归约为伽利略变换 $x' = x - vt$、$t' = t$。
:::

::: proof
令 $\beta = v/c$。则 $\gamma = 1/\sqrt{1-\beta^2} = 1 + \beta^2/2 + O(\beta^4)$，且

$$
x' = \gamma(x - vt) = \left(1 + \frac{\beta^2}{2} + \cdots\right)(x - vt) = (x - vt)\left(1 + O(\beta^2)\right),
$$

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = \left(1 + O(\beta^2)\right)\left(t - \beta \frac{x}{c}\right) = t + O(\beta) \cdot \frac{x}{c} + O(\beta^2) t.
$$

对任何有限大小 $x \leq L$、有限时长 $t \leq T$ 的装置（以 $cL$ 与 $cT$ 为自然尺度的单位制），$x' = x - vt$ 与 $t' = t$ 的修正分别为 $O(v^2/c^2)$ 与 $O(v L / c^2 \cdot c) = O(v L/(c^2/c)) = O(v L / c) \cdot O(1)$，二者都随 $v/c \to 0$ 而消失。$v = 10\,\mathrm{m/s}$ 时 $\beta \approx 3.3\times 10^{-8}$、$\gamma - 1 \approx 5.5\times 10^{-16}$：伽利略结果精确到大约十六位有效数字。这正是 [[relativity/galilean#eq-galilean]] 的伽利略变换对日常力学好用到那一步、而只在光面前轰然失效的原因。 \qquad∎
:::

公设没有抛弃牛顿。在相对 $c$ 的低速下，它们精确地重现牛顿的变换，[[relativity/galilean]] 的每一个力学结论都幸存下来。这不是两条公设的局限，而是它的要点。新物理不是“世界变了”；而是“世界在低速下与过去相同、在高速下不同，不同在坐标里，不在物理里”。

## 算例

::: example 光波前不变性的数值检验 {#ex-lightfront-check}
取 $\beta = 0.6$，于是 $\gamma = 1/\sqrt{1 - 0.36} = 1/\sqrt{0.64} = 1.25$。$c = 1$ 单位制下的事件 $E = (x, t) = (3, 4)$ 在光波面上，因为 $x^2 - t^2 = 9 - 16 = -7 = -(4^2 - 3^2)$，即 $c^2 t^2 - x^2 = 16 - 9 = 7$。求 $S'$ 中的 $E' = (x', t')$，并检验 $E'$ 也在光波面上。
::: solution
以 $v = 0.6$、$c = 1$ 应用 [[#eq-lorentz2]]：

$$
x' = \gamma(x - vt) = 1.25(3 - 0.6 \times 4) = 1.25(3 - 2.4) = 1.25 \times 0.6 = 0.75,
$$

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = 1.25\left(4 - 0.6 \times 3\right) = 1.25(4 - 1.8) = 1.25 \times 2.2 = 2.75.
$$

检验不变量：$c^2 t'^2 - x'^2 = 2.75^2 - 0.75^2 = 7.5625 - 0.5625 = 7$。两个参考系都给 $7$。事件 $E'$ 有 $t' = 2.75 \neq |x'| = 0.75$，所以 $E$ 在哪个系中都*不*在光波面上——不变的是不变量，不是 $|x'|$ 与 $t'$ 相等。光波面本身是满足 $c^2 t^2 = x^2$ 的事件集；检验其中一个：$F = (x,t) = (4,4)$，$x = t$，所以 $F$ 是光事件。于是

$$
x' = 1.25(4 - 0.6 \times 4) = 1.25 \times 1.6 = 2.0, \qquad t' = 1.25(4 - 0.6 \times 4) = 1.25 \times 1.6 = 2.0.
$$

$x' = t' = 2.0$：$F'$ 在 $S'$ 中也在光波面上。光波面是一个事件集，它在 $S$ 中的每个事件都在 $S'$ 中在其上，正与 [[#prop-lightfront]] 的要求一致。
:::
:::

::: example 从变换直接读出时间膨胀 {#ex-dilation-readoff}
一只钟静在 $S'$ 中滴答。两次滴答之间这只钟走过 $\Delta t' = \tau$（它自己的时间）。$S$ 给这两个滴答之间的时间间隔指派多少？
::: solution
钟静在 $S'$ 中，所以两个滴答事件发生在 $S'$ 中同一地点：$\Delta x' = 0$。用逆变换（同形，$v \to -v$）：

$$
\Delta t = \gamma\left(\Delta t' - \frac{v\, \Delta x'}{c^2}\right) = \gamma\left(\Delta t' - 0\right) = \gamma\, \Delta t' = \gamma\, \tau.
$$

运动的钟在 $S$ 看来，在自己的固有时间走过 $\tau$ 期间，$S$ 的坐标时间前进了 $\gamma \tau > \tau$。所以 $S$ 看到 $S'$ 的钟走得*慢*。这就是 [[relativity/time-and-length#thm-dilation]] 的时间膨胀公式，而且它是直接从洛伦兹变换上读出来的，没有添加任何物理。注意装置的不对称：这里的两个事件*在 $S'$ 中同地*，而*在 $S$ 中不同地*。膨胀公式适用于在一个参考系中同一地点发生的两事件对；对任意的两事件对，一般规律就是 [[#eq-lorentz2]] 本身。
:::
:::

::: example $S'$ 的原点在 $S$ 坐标中 {#ex-origin-track}
求 $S$ 记录下的 $S'$ 原点的世界线。
::: solution
$S'$ 的原点是按定义满足 $x' = 0$ 的事件集。把 [[#eq-lorentz2]] 的 $x'$ 方程置零：

$$
0 = \gamma(x - v t) \quad\Longrightarrow\quad x = v t.
$$

$S'$ 的原点在 $S$ 中扫出 $x = vt$，正是装置所要求的：$S'$ 在 $S$ 中以速度 $v$ 运动。校验这条世界线上的 $t'$ 坐标：

$$
t' = \gamma\left(t - \frac{v(v t)}{c^2}\right) = \gamma t\left(1 - \frac{v^2}{c^2}\right) = \gamma t\,\frac{1}{\gamma^2} = \frac{t}{\gamma}.
$$

于是沿原点的世界线，$S'$ 的时间以 $S$ 时间的 $1/\gamma$ 前进：$S$ 读 $t$ 时，$S'$ 原点的钟（平凡地与自身同地）读 $t' = t/\gamma$。这与 [[#ex-dilation-readoff]] 是同一条时间膨胀陈述，从另一侧接近。
:::
:::

::: example 代数的低速校验 {#ex-galilean-check}
直接验证：当 $v/c = \varepsilon$ 很小时，$x' = x - vt + O(\varepsilon^2)$ 且 $t' = t + O(\varepsilon)$。
::: solution
把 $\gamma$ 按 $\varepsilon = v/c$ 的幂展开：

$$
\gamma = (1 - \varepsilon^2)^{-1/2} = 1 + \frac{\varepsilon^2}{2} + O(\varepsilon^4).
$$

于是

$$
x' = \gamma(x - v t) = \left(1 + \frac{\varepsilon^2}{2} + \cdots\right)(x - \varepsilon c t) = x - \varepsilon c t + \frac{\varepsilon^2 x}{2} + O(\varepsilon^3),
$$

所以对伽利略式 $x' = x - vt$ 的修正是 $O(\varepsilon^2 x) = O(v^2 x / c^2)$。对 $t'$：

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = \left(1 + \frac{\varepsilon^2}{2} + \cdots\right)\left(t - \frac{x}{c}\varepsilon\right) = t - \frac{\varepsilon x}{c} + \frac{\varepsilon^2 t}{2} + O(\varepsilon^3).
$$

对 $t' = t$ 的主导修正是 $-\varepsilon x/c = -v x/c^2$，即 $O(v x / c^2)$。对一个尺寸 $x \leq 1\,\mathrm{m}$、$v = 10\,\mathrm{m/s}$ 的实验室，它约为 $\sim 10 / (9\times 10^{16}) \sim 1.1\times 10^{-16}\,\mathrm{s}$：远远在任何直接测量之下，与 [[#cor-galilean]] 以及“在迈克尔逊–莫雷实验逼出问题之前，伽利略变换好用了好几个世纪”这一历史事实都一致。
:::
:::

最值得亲眼看一眼的一个推论，是 [[#eq-lorentz2]] 随身携带、下一讲完整推导的速度加法规则。图中以 $c = 1$ 为速度单位，拖动参考系速度 $v$ 与粒子速度 $u$，把爱因斯坦合成与朴素的和作比较：

::: widget boost
v: 0.5
u: 0.6
caption: 把 $v$ 与 $u$ 设到接近 $1$，看爱因斯坦结果始终保持在 $1$ 以下，而伽利略和 $u + v$ 越过 $1$：任何亚光速的合成都不会从下方达到 $c$，而一条光线（$u = 1$）在任何 $v$ 下都仍是光线。
:::

## 快速检验

::: quiz 为什么第二条公设强迫 $t'$ 依赖 $x$？
- [ ] 因为光是一种介质，而介质随光源运动
- [ ] 因为若 $t' = t$，光速在 $S'$ 中就是 $c \pm v$ 而不是 $c$
- [x] 因为 $S$ 中的光波面 $x = ct$ 必须映射为 $S'$ 中的 $x' = ct'$，而任何单一的时间坐标 $t' = t$ 都无法对右行与左行两个波面同时做到这一点
- [ ] 因为 $S'$ 中的钟以依赖位置的量走慢
::: solution
起作用的约束是 [[#prop-lightfront]]。若 $t' = t$（伽利略假设），右行波面 $x = ct$ 给出 $x' = x - vt$（在 $x'$ 方程中取 $A = 1$ 以与低速极限相容），于是 $S'$ 中的波面是 $x' = (c - v)t$，以速率 $c - v$、而非 $c$ 运动；左行波面同理给出 $c + v$。要让两个波面在 $S'$ 中都动以 $c$，唯一的办法是让 $t'$ 成为 $t$ 与 $x$ 两者的函数——这正是 $t' = \gamma(t - vx/c^2)$。$t'$ 对 $x$ 的依赖不是可选的精细化；它是使光速不变的唯一一处结构性改动。
:::
:::

::: quiz 洛伦兹变换在 $v \to 0$ 时给出……
- [ ] 一个对 $t'$ 带 $O(v^2)$ 额外修正的伽利略变换
- [x] $v/c \to 0$ 时恰好就是伽利略变换 $x' = x - vt$、$t' = t$
- [ ] 一个把 $t$ 换成 $t/\gamma$ 的伽利略变换
- [ ] 两个参考系重合，因此根本不存在变换
::: solution
[[#cor-galilean]] 明确证明了这个极限：在 $v/c \to 0$ 极限下 $x'$ 与 $t'$ 分别回到伽利略形式，修正各为 $v^2/c^2$ 阶与 $v x/c^2$ 阶，两者都趋于零。$v = 10\,\mathrm{m/s}$ 时第一项修正约 $10^{-16}$，低于任何实际测量。洛伦兹变换在低速下不只是*近似*伽利略变换；它在严格极限下*就是*伽利略变换，两条公设与在它之上建立的两个世纪成功的牛顿力学完全相容。
:::
:::

::: warning 不是 $t' = t$，也不只是“时间很怪”
这份材料里最常见的错误，是写下 $x' = \gamma(x - vt)$ 却保留 $t' = t$，然后在光波面于 $S'$ 中露出 $c - v$ 时大惑不解。$t'$ 方程 $t' = \gamma(t - vx/c^2)$ 不是附加装饰；它是变换中使第二条公设为真的那一部分。任何把 $t'$ 设为等于 $t$ 的计算算的都是错误的变换。同样，“时间膨胀”与“长度收缩”都是两条方程一起作用的推论，不是两个独立的效应；它们是同一个变换 [[#eq-lorentz2]] 的两种看法。
:::

::: intuition 光锥是变换的脊柱
满足 $c^2 t^2 - x^2 = 0$ 的事件集——光锥——正是洛伦兹变换*保持*的那个集合。[[#cor-interval]] 的不变量 $c^2 t^2 - x^2$ 是它的推广：曲面族 $c^2 t^2 - x^2 = \text{常数}$ 整体是一族双曲面，洛伦兹变换在这一族之间作旋转并保持二次型，恰如空间旋转在保持 $x^2 + y^2$ 的同时旋转平面。这里的“旋转”发生在由 $x$ 与 $ct$ 张成的平面内，不变量是 $c^2 t^2 - x^2$ 而非 $x^2 + y^2$——正是符号之差使几何成为双曲而非圆形的，也正是这个符号使 $\gamma$ 的极点落在 $v = c$ 而不在 $v = 0$。
:::

## 后续内容

两条公设加给时间与长度的推论——时间膨胀、长度收缩、双生子佯谬的结构——在 [[relativity/time-and-length]] 中算清。速度加法规则、相对论多普勒移动、能量–动量关系，都是同一个洛伦兹变换的应用，见 [[relativity/velocity-energy]]。同一内容的几何表述——四维矢量、不变量、质量壳——在 [[relativity/four-vectors]]。那些章都不添加新公设；它们全都使用 [[#thm-lorentz2]] 这一个变换。

::: history 爱因斯坦的 1905 年推导
爱因斯坦 1905 年的论文《论动体的电动力学》（*On the Electrodynamics of Moving Bodies*）在论证中没有提到迈克尔逊–莫雷实验；它从两条公设出发，把洛伦兹变换作为坐标变换律推导出来，与本章的做法完全一致。1887 年的迈克尔逊–莫雷实验与爱因斯坦之前的洛伦兹以太论提供了物理背景，但 1905 年的结果是公设加上代数的推论，不是以太测量的产物。闵可夫斯基（Minkowski）在 1908 年把同一内容改写为四维时空的几何，不变量为 $c^2 t^2 - x^2 - y^2 - z^2$，这是本课程从 [[relativity/four-vectors]] 起一路使用的形式。两条公设不是“爱因斯坦的猜测”；它们是任何自洽的坐标变换律都必须吸收进去的两个有实验根据的事实（惯性系平权、$c$ 的不变性）。
:::

::: summary
- 两条公设——惯性系平权、$c$ 的不变性——是全部的物理输入；本节其余部分是代数。
- 坐标变换的线性由第一公设加空间与时间的均匀性得出（[[#prop-linear]]）。
- 光波前在两个参考系中的不变性强迫出 $t' = \gamma(t - vx/c^2)$，即 $t'$ 同时依赖 $t$ 与 $x$（[[#prop-lightfront]]）。
- 逆对称要求（反过来的定律是同一条）固定 $A = \gamma = 1/\sqrt{1 - v^2/c^2}$（[[#thm-lorentz2]]）。
- 洛伦兹变换保持不变量 $c^2 t^2 - x^2$（[[#cor-interval]]）；它就是分别绝对的空间与时间的替身。
- 在 $v/c \to 0$ 极限下洛伦兹变换精确地回到伽利略变换（[[#cor-galilean]]）；低速牛顿力学没有被推翻，而是被重新得到。
:::

## 习题

::: exercise level=1
对相对 $S$ 以速率 $v = 0.8\,c$ 运动的参考系 $S''$，在与前文相同的原点重合约定下写出洛伦兹变换。计算 $S$ 中事件 $(x, t) = (0, 1\,\mathrm{s})$ 的 $x''$ 与 $t''$。取 $c = 3\times 10^{8}\,\mathrm{m/s}$，$x''$ 以米计，$t''$ 以秒计。
check="1.6667"
::: solution
$v = 0.8c$、$\beta = 0.8$、$\gamma = 1/\sqrt{1 - 0.64} = 1/\sqrt{0.36} = 1/0.6 = 5/3$。事件为 $x = 0$、$t = 1\,\mathrm{s}$。应用 [[#eq-lorentz2]]：

$$
x'' = \gamma(x - vt) = \frac{5}{3}(0 - 0.8c \times 1) = \frac{5}{3} \times \frac{-4}{5} \cdot c = -\frac{4}{3}c = -\frac{4 \times 3\times 10^{8}}{3}\,\mathrm{m} = -4\times 10^{8}\,\mathrm{m},
$$

$$
t'' = \gamma\left(t - \frac{v x}{c^2}\right) = \frac{5}{3}\left(1 - 0\right) = \frac{5}{3}\,\mathrm{s} \approx 1.6667\,\mathrm{s}.
$$

检验值是 $t'' = 5/3 \approx 1.6667$。
:::
:::

::: exercise level=1
对 $c = 1$ 单位下的事件 $(x,t) = (6, 8)$，取 $\beta = 0.6$、$\gamma = 1.25$，明确验证不变量 $c^2 t^2 - x^2$ 在两个参考系中相同。
::: solution
在 $S$ 中：$c^2 t^2 - x^2 = 1 \cdot 64 - 36 = 28$。变换：$x' = 1.25(6 - 0.6 \times 8) = 1.25(6 - 4.8) = 1.25 \times 1.2 = 1.5$；$t' = 1.25(8 - 0.6 \times 6) = 1.25(8 - 3.6) = 1.25 \times 4.4 = 5.5$。在 $S'$ 中：$c^2 t'^2 - x'^2 = 1 \cdot 30.25 - 2.25 = 28$。两个参考系都给 $28$。 \qquad∎
:::
:::

::: exercise level=2 {#ex-exercise-3}
固有长度为 $L_0$ 的尺沿 $S'$ 的 $x'$ 轴放置，一端在 $x' = 0$，另一端在 $x' = L_0$。只使用洛伦兹变换以及“长度是在 $S$ 中同一时刻的两端距离”这一定义，求 $S$ 给这把尺指派的长度。
hint="S 中的长度要求两端事件在 S 中同时。把时间方程分别用于两端，解出在同一 t 下两端的位置。"
::: solution
两端在 $S'$ 中位于 $x' = 0$ 与 $x' = L_0$。设左端的 $S'$ 坐标为 $(0, t'_L)$，右端为 $(L_0, t'_R)$。应用逆变换（$v \to -v$）：

$$
x_L = \gamma(0 + v t'_L) = \gamma v t'_L, \qquad t_L = \gamma(t'_L + 0) = \gamma t'_L,
$$

$$
x_R = \gamma(L_0 + v t'_R), \qquad t_R = \gamma(t'_R + v L_0 / c^2).
$$

$S$ 中的长度要求同时性：$t_L = t_R$。于是

$$
\gamma t'_L = \gamma\left(t'_R + \frac{v L_0}{c^2}\right) \quad\Longrightarrow\quad t'_L - t'_R = \frac{v L_0}{c^2}.
$$

$S$ 中的长度是 $L = x_R - x_L = \gamma(L_0 + v t'_R) - \gamma v t'_L = \gamma L_0 + \gamma v(t'_R - t'_L) = \gamma L_0 - \gamma v \cdot \frac{v L_0}{c^2} = \gamma L_0\left(1 - \frac{v^2}{c^2}\right) = \gamma L_0 \cdot \frac{1}{\gamma^2} = \frac{L_0}{\gamma}$。

于是运动的尺在 $S$ 中被量得长度 $L_0 / \gamma < L_0$：尺沿运动方向*收缩*，正如 [[relativity/time-and-length#thm-contraction]] 所述。收缩是下述两件事的推论：“$S$ 中的长度”意味着“$S$ 中同一时刻两端的距离”，以及洛伦兹变换不保持不同地点事件的同时性。并不是尺在任何绝对意义上“被物理压扁”了；而是两个参考系对哪些端点对同时意见不同，而 $S$ 中的距离更短。
:::
:::

::: exercise level=2
证明速度加法规则 $u' = (u - v)/(1 - uv/c^2)$ 由洛伦兹变换直接得出：对 $x' = \gamma(x - vt)$ 与 $t' = \gamma(t - vx/c^2)$ 关于 $t$ 求导，并使用 $u = dx/dt$。
::: solution
把 $x'$ 方程关于 $t$ 求导（固定粒子的世界线，故 $x = x(t)$）：

$$
\frac{dx'}{dt} = \gamma\left(\frac{dx}{dt} - v\right) = \gamma(u - v).
$$

对 $t'$ 方程求导：

$$
\frac{dt'}{dt} = \gamma\left(1 - \frac{v}{c^2}\frac{dx}{dt}\right) = \gamma\left(1 - \frac{v u}{c^2}\right).
$$

$S'$ 中的速度是 $u' = dx'/dt' = (dx'/dt)/(dt'/dt)$：

$$
u' = \frac{\gamma(u - v)}{\gamma(1 - vu/c^2)} = \frac{u - v}{1 - \frac{v u}{c^2}}.
$$

$\gamma$ 相消，这是一个有用的校验：分子与分母中的 $\gamma$ 相同，因为 $x'$ 与 $t'$ 服从同一个变换律。在低速极限 $uv/c^2 \to 0$ 下它化为 $u' = u - v$，即 [[relativity/galilean#thm-velocity]] 的伽利略速度律，与把 [[#cor-galilean]] 用于速度的结果一致。
:::
:::

::: exercise level=3 {#ex-exercise-5}
设参考系 $S'$ 相对 $S$ 以 $v = 0.5c$ 运动，一个粒子在 $S$ 中沿 $+x$ 方向以速率 $u = 0.9c$ 运动。求粒子在 $S'$ 中的速率 $u'$，并验证结果小于 $c$，且在 $v$ 固定时 $u \to c$ 有 $u' \to c$。
::: solution
用刚导出的速度加法规则：

$$
u' = \frac{u - v}{1 - \frac{uv}{c^2}} = \frac{0.9c - 0.5c}{1 - \frac{0.9 \times 0.5 \cdot c^2}{c^2}} = \frac{0.4c}{1 - 0.45} = \frac{0.4c}{0.55} \approx 0.727\,c.
$$

校验 $u' < c$：$0.727c < c$。再校验 $v$ 固定时 $u \to c$ 的极限：

$$
\lim_{u \to c} \frac{u - v}{1 - uv/c^2} = \frac{c - v}{1 - v/c} = \frac{c - v}{(c - v)/c} = c.
$$

$S$ 中的一条光线在 $S'$ 中仍是一条光线，正如 [[#ax-light]] 要求的。对所有 $u < c$ 有 $u' < c$（在亚光速的 $v$ 固定时）并非巧合；它是速度加法规则的直接推论，而 $u \to c$ 时 $u' \to c$ 就是光速在两个参考系中的不变性。
:::
:::

::: exercise level=3
相对性公设说物理定律在每个惯性系中相同。只用洛伦兹变换解释：为什么自由粒子的拉格朗日量 $L = -mc^2\sqrt{1 - v^2/c^2}$（其中 $v$ 是粒子在某个参考系中的速率）与公设相容：也就是说，为什么一个由不变的速度 $v$ 与不变的 $c$ 构造的拉格朗日量，在两个参考系中给出同样的物理。
hint="关键在于 v^2 = v'v' 以不依赖参考系的方式成立；拉格朗日量对 v 的依赖只通过 v^2/c^2 出现，而它在洛伦兹变换下不变。"
::: solution
粒子在一个参考系中的速率，就是在该系坐标下的 $v = dx/dt$。由 [[#cor-interval]] 的不变量 $c^2 t^2 - x^2$，对沿粒子世界线的无穷小位移，$c^2 dt^2 - dx^2$ 在两个系中相同：$c^2 dt'^2 - dx'^2 = c^2 dt^2 - dx^2$。两边除以 $dt^2$，并用 $dx = v\,dt$、$dx' = v'\,dt'$：

$$
c^2 - v^2 = c^2\left(\frac{dt'}{dt}\right)^2 - v'^2\left(\frac{dt'}{dt}\right)^2 = \left(c^2 - v'^2\right)\left(\frac{dt'}{dt}\right)^2.
$$

由 [[#eq-lorentz2]]，$dt'/dt = \gamma(1 - v u/c^2)$ 在粒子的世界线上取值——对以速率 $u = v$ 运动的粒子（静在其自身系的自由粒子，或一般的粒子），比值 $dt/dt'$ 就是时间膨胀因子 $\gamma(v)$，因而就静止系情形 $dt'/dt = 1/\gamma$。在粒子的静止系中 $v' = 0$，且 $c^2 - v^2 = c^2 / \gamma^2$，得 $\gamma = 1/\sqrt{1 - v^2/c^2}$，与 [[#eq-gamma]] 是同一个 $\gamma$。因此拉格朗日量 $L = -mc^2\sqrt{1 - v^2/c^2} = -mc^2/\gamma$ 是不变量 $v^2/c^2$（经由 $\gamma$）与常量 $c$ 的函数，在两个参考系中相同——至多差在“$v$ 是在哪个系中定义的”这一选择上。物理——作用量 $S = \int L\,dt$、运动方程——不依赖参考系，因为被积分的量 $L$ 只由不变量 $v^2/c^2$ 与常量 $c$ 构造。这就是自由粒子的相对性公设 [[#ax-relativity]] 的内容：拉格朗日量从而作用量在两个参考系中相同，尽管 $v$ 与 $v'$ 并不相同。
:::
:::

::: exercise level=3
证明洛伦兹变换是闵可夫斯基度量 $\eta = \mathrm{diag}(1, -1)$ 的等距映射，即矩阵 $\Lambda = \begin{pmatrix} \gamma & -\gamma\beta \\ -\gamma\beta & \gamma \end{pmatrix}$ 作用于 $(ct, x)^T$ 满足 $\Lambda^T \eta \Lambda = \eta$。
::: solution
写 $\eta = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$、$\Lambda = \gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix}$。计算 $\Lambda^T \eta \Lambda$：

$$
\Lambda^T \eta = \gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \gamma\begin{pmatrix} 1 & \beta \\ -\beta & -1 \end{pmatrix}.
$$

于是

$$
\Lambda^T \eta \Lambda = \gamma\begin{pmatrix} 1 & \beta \\ -\beta & -1 \end{pmatrix}\gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix} = \gamma^2\begin{pmatrix} 1 - \beta^2 & -\beta + \beta \\ -\beta + \beta & \beta^2 - 1 \end{pmatrix} = \gamma^2\begin{pmatrix} 1 - \beta^2 & 0 \\ 0 & -(1 - \beta^2) \end{pmatrix}.
$$

因为 $\gamma^2 = 1/(1 - \beta^2)$，因子 $\gamma^2(1 - \beta^2)$ 为 $1$，于是

$$
\Lambda^T \eta \Lambda = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \eta. \qquad\blacksquare
$$

这就是 [[#cor-interval]] 的矩阵表述：二次型 $c^2 t^2 - x^2 = (ct)^2 - x^2$ 被线性映射 $\Lambda$ 保持，而这正是闵可夫斯基度量的等距映射的定义。这一几何里的“圆”是双曲线 $c^2 t^2 - x^2 = \text{常数}$，洛伦兹变换在各条双曲线之间旋转而不改变不变量的值。
:::
:::

::: exercise level=3
两条公设是在一个空间维度中陈述的。用文字加一个方程解释：为什么推广到三个空间维度不是一条新的物理假设——也就是说，为什么同一条公设（$c$ 的不变性）加同样的线性论证，就给出完整的洛伦兹变换、且 $\gamma = 1/\sqrt{1 - v^2/c^2}$，其中 $v = |\mathbf{v}|$ 是两参考系相对运动的速率。
hint="boost 沿相对运动方向；把横向坐标分解出来，证明它们保持不变。"
::: solution
设 $S'$ 相对 $S$ 以 $\mathbf{v} = v\hat{x}$ 运动。[[#prop-linear]] 的线性论证在三维同样成立：变换必须是 $(x, y, z, t)$ 的常系数线性函数。第二条公设说光波前在每个参考系中都是球面：$S$ 中的 $x^2 + y^2 + z^2 - c^2 t^2 = 0$ 必须映为 $S'$ 中的 $x'^2 + y'^2 + z'^2 - c^2 t'^2 = 0$。混合 $x$ 与 $t$（boost 方向）的变换就是上面导出的那个：$x' = \gamma(x - vt)$、$t' = \gamma(t - vx/c^2)$。横向坐标必须映为 $y' = y$、$z' = z$（无横向剪切条件——它由空间的各向同性，以及沿 $x$ 方向的 boost 不应混入 $y$ 或 $z$ 这一事实得出；若混入，光球面在 $S'$ 中会变成椭球，横向的光速就会改变）。于是完整的变换是

$$
x' = \gamma(x - vt), \qquad t' = \gamma\left(t - \frac{v x}{c^2}\right), \qquad y' = y, \qquad z' = z,
$$

而不变量是 $c^2 t^2 - x^2 - y^2 - z^2$，由构造被保持：横向部分 $y^2 + z^2$ 不变，$x$–$t$ 部分如 [[#cor-interval]] 那样被保持。因此，单凭一条公设（$c$ 的不变性）加上线性与各向同性，就在没有额外物理输入的情况下定出了完整的三维洛伦兹变换；$\gamma$ 因子与一维情形相同，因为 boost 只在一个方向，而横向坐标解耦。
:::
:::



