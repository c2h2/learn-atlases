门绕铰链摆动，磨盘绕固定轴旋转，球沿斜坡滚下。每种情形里，有用的坐标都是一个角。物理还是牛顿的那一套，如 [[mechanics/newton-laws]] 与 [[mechanics/motion-1d]]；只是名字换了：角位置、角速度与角加速度取代了它们的直线对应量，力矩取代力，而转动惯量——它取决于质量围绕转轴如何排布——取代质量。

下面的关系只在角以弧度度量时才成立：把度数塞进弧度公式，是得到一个自信的错误答案的标准做法。我们用积分算出细杆的转动惯量，证明平行轴定理，然后把力矩与角加速度、动能接上关系。无滑滚动是一条约束，不是新定律；它决定了球、圆盘与圆环沿斜坡赛跑谁赢。

全文取 $g = 9.80\,\mathrm{m/s^2}$。这里证明的一切，要么是单条固定转轴的，要么是沿直线滚动的。可以自由翻滚、角动量未必沿角速度的刚体，留给 [[analytical-mechanics]]。

## 角运动学

选定一条转轴，以及一条与它垂直的参考线。**角位置** $\theta$ 是从参考线量到固连于刚体的一条线的角。正向是一种选择，由右手定则固定：四指随 $\theta$ 增大而弯，拇指沿轴。在这个选择做出并始终坚持之前，$\omega$ 与 $\alpha$ 的正负没有任何意义。

::: definition 角速度与角加速度 {#def-omega}
设 $\theta(t)$ 是刚体绕所选转轴的角位置，以弧度计。该转轴的**角速度**与**角加速度**是

$$
\omega = \deriv{\theta}{t}, \qquad \alpha = \deriv{\omega}{t} = \deriv{^2\theta}{t^2}.
$$ {#eq-omega-def}

对固定转轴，两者都是带符号的标量。向量角速度 $\boldsymbol{\omega}$ 沿轴；$\omega > 0$ 时指向正向。
:::

弧度是被导数逼出来的。以弧度计角就是弧长除以半径，所以 $\omega$ 的单位是 $\mathrm{s^{-1}}$，写作 $\mathrm{rad/s}$ 只是提醒。若用度，$\deriv{\theta}{t}$ 就不是弧长的变化率除以 $R$，下面每个公式都会多出一个因子 $\pi/180$。绝不要把度数直接代入 $\omega = v/R$。先换算：一整圈是 $2\pi$ 弧度，$180^\circ = \pi$ 弧度。

考虑刚体上到转轴垂直距离为 $R$ 的一点。刚体转过角 $\theta$ 时，该点沿半径 $R$ 的圆运动。沿该圆、自 $\theta = 0$ 位置量起的弧长是

$$
s = R\theta,
$$

其中 $\theta$ 以弧度计。对时间求导，并用刚体上 $R$ 恒定，

$$
v = \deriv{s}{t} = R\deriv{\theta}{t} = R\omega.
$$

这个 $v$ 就是**切向速率**。再导一次，

$$
a_t = \deriv{v}{t} = R\alpha,
$$

即**切向加速度**。此外还有一个向内的、即向心的加速度。同样的分量把它与 $a_t$ 分开。

把圆心放在原点，把位置写成 $x = R\cos\theta$、$y = R\sin\theta$，$\theta$ 沿正向增大。于是

$$
\begin{aligned}
v_x &= -R\sin\theta\,\omega, & v_y &= R\cos\theta\,\omega, \\
a_x &= -R\cos\theta\,\omega^2 - R\sin\theta\,\alpha, & a_y &= -R\sin\theta\,\omega^2 + R\cos\theta\,\alpha.
\end{aligned}
$$

速率为 $\sqrt{v_x^2 + v_y^2} = R\abs{\omega}$。沿径向向外方向 $(\cos\theta, \sin\theta)$，加速度为

$$
a_x\cos\theta + a_y\sin\theta = -R\omega^2,
$$

所以径向加速度的大小为 $\omega^2 R$，指向圆心。比较大小时有 $v = R\omega$，故

$$
a_r = \frac{v^2}{R} = \omega^2 R,
$$

指向圆心。沿 $(-\sin\theta, \cos\theta)$ 的分量是 $R\alpha$，即 $a_t$。两者可以各自独立出现：$\alpha = 0$ 时 $\omega^2 R$ 仍在，$\omega = 0$ 的瞬间 $R\alpha$ 仍在。

::: proposition 切向加速度与径向加速度 {#prop-kinematic}
对距固定转轴垂直距离 $R$ 的一点，角以弧度计，

$$
s = R\theta, \qquad v = R\omega, \qquad a_t = R\alpha, \qquad a_r = \omega^2 R = \frac{v^2}{R},
$$ {#eq-kinematic}

其中 $a_r$ 由该点指向其所在圆的圆心。若 $\theta$、$\omega$ 或 $\alpha$ 以度计，这四条关系都不成立。
:::

::: proof
弧长公式 $s = R\theta$ 就是弧度制的定义。$R$ 固定，求导一次、两次得 $v = R\omega$ 与 $a_t = R\alpha$。上面的分量计算表明，指向圆心的加速度是 $\omega^2 R$。把 $v = R\omega$ 代入 $v^2/R$ 得到同样的向内加速度。若角用度，弧长应是 $s = R\theta\pi/180$，因子 $\pi/180$ 会残留在 $v$ 与 $a_t$ 里，[[#eq-kinematic]] 便不成立。
:::

::: intuition 一本词典，不是新世界
角运动学就是弧长 $s = R\theta$ 的一维运动学。除以 $R$ 把 $v$ 换成 $\omega$、$a_t$ 换成 $\alpha$。径向加速度改变的是速度的方向而不是 $\omega$ 的大小，所以这本词典里没有它的对应词条。下面凡是看着像 [[mechanics/motion-1d]] 里见过的公式，都是这样来的。
:::

::: warning 度、打滑与张冠李戴的轴
这里的错误答案多半出自三个错。不要把度数代入 [[#eq-kinematic]]：$\omega = v/R$ 与 $\theta = s/R$ 用的是弧度。不要对打滑的轮子强行套用 $v = \omega R$；两表面之间有滑动时，$v$ 与 $\omega R$ 互不相干。不要把对一条转轴的力矩和另一条转轴的 $I$ 凑在一起写 $\tau = I\alpha$。两者指的必须是同一条轴：本章中是固定轴，下面滚动的论证里则是质心轴。
:::

## 恒定角加速度

$\alpha$ 恒定时，$\omega$ 随时间线性增长，$\theta$ 是二次的。推导就是 [[mechanics/motion-1d]] 中的那一个，按上面那本词典照搬过去。假设是：$\alpha$ 恒定，且 $\theta$ 以弧度计。

::: theorem 恒定角加速度 {#thm-const-alpha}
若 $\alpha$ 恒定，$\theta_0$、$\omega_0$ 是 $t = 0$ 时的角位置与角速度，则

$$
\begin{aligned}
\omega &= \omega_0 + \alpha t, \\
\theta &= \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2, \\
\omega^2 &= \omega_0^2 + 2\alpha\,(\theta - \theta_0).
\end{aligned}
$$ {#eq-const-alpha}
:::

::: proof
由 [[#def-omega]]，$\alpha = \deriv{\omega}{t}$。$\alpha$ 不依赖 $t$ 时，从 $0$ 积到 $t$ 得 $\omega - \omega_0 = \alpha t$，即第一行。于是 $\deriv{\theta}{t} = \omega_0 + \alpha t$。从 $0$ 积到 $t$ 得第二行。第三行用链式法则，写成 $\alpha = \deriv{\omega}{t} = \bigl(\deriv{\omega}{\theta}\bigr)\bigl(\deriv{\theta}{t}\bigr) = \omega\deriv{\omega}{\theta}$，于是 $\omega\,\dd\omega = \alpha\,\dd\theta$。从初始状态积到其后某一状态，得 $\tfrac{1}{2}\bigl(\omega^2 - \omega_0^2\bigr) = \alpha\,(\theta - \theta_0)$，因为 $\alpha$ 恒定，可以离开积分号。整理即得第三行。若 $\theta$ 以度做同样的积分，被求导的已是另一个函数，[[#eq-const-alpha]] 就是错误的说法。
:::

时间既没给也不要求时用第三个公式；不需要角时用第一个。$\alpha$ 不恒定时三个都不可用：去积分 $\alpha(t)$，或者改用功与能量。

::: example 制动轮子 {#ex-brake}
一轮子以 $\omega_0 = 10.0\,\mathrm{rad/s}$ 自旋，施加制动使其获得恒定的 $\alpha = -2.00\,\mathrm{rad/s^2}$，直到停下。求所需时间与转过的角，以弧度计。
::: solution
停下即 $\omega = 0$。[[#eq-const-alpha]] 第一行给出 $0 = 10.0 + (-2.00)\,t$，所以 $t = 10.0/2.00 = 5.00\,\mathrm{s}$。

取 $\theta_0 = 0$，由第二行得转角

$$
\theta = (10.0)(5.00) + \tfrac{1}{2}(-2.00)(5.00)^2 = 50.0 - 25.0 = 25.0\,\mathrm{rad}.
$$

第三行是不用 $t$ 的核对。取 $\omega = 0$，

$$
0 = (10.0)^2 + 2(-2.00)\,\theta \implies 4.00\,\theta = 100, \implies \theta = 25.0\,\mathrm{rad}.
$$

两条路一致。除以 $2\pi$ 把角化成转数：$25.0/(2\pi) = 3.98$ 转；定理本身给出的就是弧度。
:::
:::

::: quiz
转台自静止开始以恒定 $\alpha > 0$ 加速。哪句话正确？
- [ ] 前 $2\,\mathrm{s}$ 转过的角等于接着 $2\,\mathrm{s}$ 转过的角，因为 $\alpha$ 恒定
- [x] 相继相等时段内转过的角依次增大，因为后一时段里 $\omega$ 更大
- [ ] 轮缘上一点的向内加速度恒定，因为 $\alpha$ 恒定
- [ ] 公式 $\theta = \tfrac{1}{2}\alpha t^2$ 对以度计的 $\theta$ 成立，只要 $\alpha$ 也写成每秒二次方度
::: solution
从静止起 $\theta = \tfrac{1}{2}\alpha t^2$。$t = 0$ 到 $t = 2$ 的转角是 $2\alpha$，而 $t = 2$ 到 $t = 4$ 的转角是 $\tfrac{1}{2}\alpha\cdot 16 - 2\alpha = 6\alpha$，大三倍，因为 $\omega$ 已经变大。向内加速度是 $\omega^2 R$，并不恒定。二次公式是对弧度推导的。
:::
:::

## 转动惯量

作用在刚体上的力本身说不出角加速度。轮缘上的力比同样大小、靠近轮轴的力更有效；质量集中在轮缘的轮子，比同样质量、质量靠近轮轴的轮子更难转起来。这两个事实都由同一个量承担。

::: definition 转动惯量 {#def-inertia}
质点系对所选转轴的**转动惯量**是

$$
I = \sum_i m_i r_i^2,
$$ {#eq-I-particles}

其中 $r_i$ 是质量 $m_i$ 的质点到转轴的垂直距离，不是到某点的距离。对连续分布、$\dd m$ 表示微元内质量的质量分布，

$$
I = \int r^2\,\dd m,
$$

其中 $r$ 仍是到转轴的垂直距离。SI 单位是 $\mathrm{kg\cdot m^2}$。
:::

质量一定时，物质离轴越远，$I$ 越大。一个物体没有唯一的转动惯量：每条轴各有各的。细杆是样板计算，因为积分是初等的，而平行轴定理随后就能把结果搬走。

::: theorem 细杆的转动惯量 {#thm-rod}
质量 $M$、长 $L$ 的均匀细杆，对过中心且垂直于杆的转轴，转动惯量为 $I = \tfrac{1}{12}ML^2$。
:::

::: proof
把杆沿 $x$ 轴放置，从 $x = -L/2$ 到 $x = L/2$，转轴取过中心的 $z$ 轴。均匀意味着线密度 $\lambda = M/L$ 恒定，所以 $\dd m = \lambda\,\dd x$，而位置 $x$ 处的质量到转轴的垂直距离是 $\abs{x}$。于是

$$
I = \int_{-L/2}^{L/2} x^2\lambda\,\dd x = \lambda\left[\frac{x^3}{3}\right]_{-L/2}^{L/2} = \lambda\cdot\frac{2}{3}\left(\frac{L}{2}\right)^3 = \lambda\cdot\frac{2}{3}\cdot\frac{L^3}{8} = \lambda\frac{L^3}{12}.
$$

代入 $\lambda = M/L$ 得 $I = \tfrac{1}{12}ML^2$。杆被当作细杆，所以垂直距离确实是 $\abs{x}$。
:::

另外三个结果都是标准结果。质量 $M$、半径 $R$ 的细圆环对过中心垂直于环面的轴，每个质量元都在距离 $R$ 处，所以 [[#eq-I-particles]] 给出 $I = MR^2$。圆盘或实心圆柱对自身轴的转动惯量是这样一圈圈叠起来的。夹在 $r$ 与 $r + \dd r$ 之间的圆环质量 $\dd m = (2M/R^2)\,r\,\dd r$，贡献 $r^2\,\dd m$，于是

$$
I = \int_0^R r^2\cdot\frac{2M}{R^2}\,r\,\dd r = \frac{2M}{R^2}\cdot\frac{R^4}{4} = \tfrac{1}{2}MR^2.
$$

质量 $M$、半径 $R$ 的实心球对任一直径有 $I = \tfrac{2}{5}MR^2$。这个积分就是把圆盘的计算对球的切片重复一遍；它是下面的一道习题，而结果正是滚动问题里用到的那个。不要把 $\tfrac{2}{5}$ 换成别的物体的分数。

| 刚体 | 转轴 | $I$ |
|---|---|---|
| 细圆环 | 过中心垂直于环面的轴 | $MR^2$ |
| 圆盘或实心圆柱 | 对称轴 | $\tfrac{1}{2}MR^2$ |
| 实心球 | 任一直径 | $\tfrac{2}{5}MR^2$ |
| 细杆 | 垂直于杆、过中心 | $\tfrac{1}{12}ML^2$ |
| 细杆 | 垂直于杆、过端点 | $\tfrac{1}{3}ML^2$ |

最后一行不是一次新的积分，它就是下一节的平行轴定理用在细杆上。每一行都是对旁边写明的转轴而言。

::: example 两个球组成的杠铃 {#ex-barbell}
两个实心球，质量都是 $m = 2.00\,\mathrm{kg}$、半径都是 $R = 0.100\,\mathrm{m}$，球心相距 $0.800\,\mathrm{m}$。两球由一根沿球心连线的轻杆连接。求杠铃对过杆中点且垂直于杆的转轴的转动惯量。
::: solution
杆是轻的，所以一无贡献。每个球对一条与所选转轴平行的直径有

$$
I_{\mathrm{sphere}} = \tfrac{2}{5}mR^2 = \tfrac{2}{5}(2.00)(0.100)^2 = (0.400)(0.0100) = 0.00800\,\mathrm{kg\cdot m^2}.
$$

过中点的转轴平行于那条直径，两条轴之间的距离是球心间距的一半，$d = 0.400\,\mathrm{m}$。平行轴定理（下面的 [[#thm-parallel]]）给每个球添上 $md^2$：

$$
md^2 = (2.00)(0.400)^2 = (2.00)(0.160) = 0.320\,\mathrm{kg\cdot m^2}.
$$

一个球贡献 $0.00800 + 0.320 = 0.328\,\mathrm{kg\cdot m^2}$，两个球共贡献

$$
I = 2\times 0.328 = 0.656\,\mathrm{kg\cdot m^2}.
$$

这里面几乎全是 $md^2$ 项：若把两球当作质点，它们贡献 $2md^2 = 0.640\,\mathrm{kg\cdot m^2}$，多出的 $0.0160\,\mathrm{kg\cdot m^2}$ 是它们的有限大小。平移用的两条轴是平行的。沿杆方向的转轴是另一个转动惯量，这条定理管不到它。
:::
:::

## 平行轴定理

表里的转动惯量都过质心。铰链和杆端需要的是平行的轴。这一定理不适用于成夹角相交的两条轴。

::: theorem 平行轴定理 {#thm-parallel}
设 $I_{\mathrm{cm}}$ 是质量 $M$ 的物体对一条过质心的转轴的转动惯量。设 $I$ 是对另一条与第一条平行、与它垂直距离为 $d$ 的转轴的转动惯量。则

$$
I = I_{\mathrm{cm}} + Md^2.
$$ {#eq-parallel}

平移项 $Md^2$ 是把这个物体的全部质量都放到质心处时它会有的转动惯量。定理不适用于不平行的两条轴。
:::

::: proof
对质点系证明就够了；连续物体只是把和换成积分的同一种论证。取坐标使质心轴为 $z$ 轴、质心在原点。于是 $\sum_i m_i x_i = 0$ 且 $\sum_i m_i y_i = 0$。平行的那条轴在 $xy$ 平面上的交点是 $(a, b)$，所以两轴间距为 $d = \sqrt{a^2 + b^2}$，而质点 $i$ 到新轴的垂直距离是平面内 $(x_i, y_i)$ 到 $(a, b)$ 的距离。于是

$$
\begin{aligned}
I &= \sum_i m_i\bigl[(x_i - a)^2 + (y_i - b)^2\bigr] \\
&= \sum_i m_i(x_i^2 + y_i^2) - 2a\sum_i m_i x_i - 2b\sum_i m_i y_i + (a^2 + b^2)\sum_i m_i.
\end{aligned}
$$

交叉项的和为零，因为原点就是质心。第一个和是 $I_{\mathrm{cm}}$，而 $(a^2 + b^2)M = Md^2$。故 $I = I_{\mathrm{cm}} + Md^2$。

若第二条轴与第一条不平行，距离的平方就不能写成 $(x_i - a)^2 + (y_i - b)^2$（对单一固定的 $(a, b)$），交叉项也组合不成 $Md^2$。平行是定理的假设，不是图方便。
:::

由于 $Md^2 \ge 0$，沿给定方向的所有平行轴中，过质心的那条转动惯量最小。对细杆，平移 $d = L/2$ 就把轴移到端点：

$$
I_{\mathrm{end}} = \tfrac{1}{12}ML^2 + M\left(\frac{L}{2}\right)^2 = \tfrac{1}{12}ML^2 + \tfrac{1}{4}ML^2 = \tfrac{1}{3}ML^2.
$$

直接积分结果相同。把杆从 $x = 0$ 放到 $x = L$，转轴过原点，$I = \int_0^L x^2 (M/L)\,\dd x = (M/L)\bigl[x^3/3\bigr]_0^L = \tfrac{1}{3}ML^2$。这就是杆状复摆对悬挂点的转动惯量。

::: history
克里斯蒂安·惠更斯（Christiaan Huygens）在《摆钟论》（*Horologium oscillatorium*，1673）中分析了复摆：一个刚体在重力作用下绕固定悬挂点摆动。决定周期的那个摆长，用现代语言写就是 $I/(Md)$，其中 $I$ 取对悬挂点的值，而那个 $I$ 正是质心处的转动惯量平移到悬挂点的结果。惠更斯没有写出 $I = I_{\mathrm{cm}} + Md^2$，但这个平移已经确定了他的振动中心的位置。莱昂哈德·欧拉（Leonhard Euler）的《刚体运动理论》（*Theoria motus corporum solidorum seu rigidorum*，1765）给出了刚体的运动方程，其中的转动惯量取对固连于物体的轴的値。下一节的定轴定律，是轴承把轴固定住的那个情形。自由刚体是 [[analytical-mechanics]] 的主题。
:::

## 力矩与转动定律

在固定转轴上，决定 $\alpha$ 的量不是力本身，而是力对转轴的矩。

::: definition 力矩 {#def-torque}
力 $\mathbf{F}$ 对点 $O$ 的**力矩**是向量

$$
\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F},
$$ {#eq-torque}

其中 $\mathbf{r}$ 是作用点相对 $O$ 的位置。其大小为 $\tau = rF\sin\phi = F\,\ell$，其中 $\phi$ 是 $\mathbf{r}$ 与 $\mathbf{F}$ 的夹角，**力臂** $\ell = r\sin\phi$ 是 $O$ 到 $\mathbf{F}$ 作用线的垂直距离。$\boldsymbol{\tau}$ 的方向由右手定则确定：四指沿 $\mathbf{F}$ 会使物体绕 $O$ 转动的方向弯，拇指沿 $\boldsymbol{\tau}$。对固定转轴，进入运动方程的只有 $\boldsymbol{\tau}$ 沿该轴的分量，我们把它记作带符号的标量 $\tau$。
:::

过 $O$ 的力力臂为零，不能让物体转动。同样的力，作用线到 $O$ 的垂直距离为 $\ell$ 时，力矩为 $F\ell$。在铰链附近推门很费劲，因为 $\ell$ 小；在门把手处垂直于门面推，$\ell$ 就是门的宽度。

::: theorem 定轴定律与转动动能 {#thm-rotlaw}
设刚体绕惯性系中固定的转轴转动。设 $I$ 是对该转轴的转动惯量，$\tau$ 是全体外力对该转轴的合力矩，$\omega$ 是角速度。则

$$
\tau = I\alpha, \qquad K = \tfrac{1}{2}I\omega^2.
$$ {#eq-rotlaw}

沿所作用质点连线等值反向的中心内力，对 $\tau$ 一无贡献。$\tau = I\alpha$ 这条恒等式要求 $\tau$ 与 $I$ 对同一条轴。它是定轴的陈述：转轴不固定的刚体的运动在 [[analytical-mechanics]] 中处理。
:::

::: proof
每个质点都沿自己的、半径为 $r_i$（垂直距离）的圆运动，具有同样的 $\omega$ 与同样的 $\alpha$。牛顿第二定律的切向部分是 $F_{i,t} = m_i r_i\alpha$，符号取法使正的切向力使 $\omega$ 增大。径向与轴向的力对转轴没有力臂，所以质点 $i$ 受到的力矩是 $r_i F_{i,t} = m_i r_i^2\alpha$。

对质点求和。对一对内力，$\mathbf{F}_{ij} = -\mathbf{F}_{ji}$ 沿两质点连线，它们对轴上任一点的力矩之和为 $(\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij} = \mathbf{0}$。轴承推在轴本身上，力臂为零。剩下的是对转轴的合外力矩 $\tau$，且

$$
\tau = \sum_i m_i r_i^2\alpha = I\alpha,
$$

这里 $\alpha$ 能提出来，是因为它对每个质点都相同。这就是 [[#eq-rotlaw]] 的前半。

对于动能，质点 $i$ 的速率是 $v_i = r_i\abs{\omega}$，于是

$$
K = \sum_i\tfrac{1}{2}m_i v_i^2 = \tfrac{1}{2}\omega^2\sum_i m_i r_i^2 = \tfrac{1}{2}I\omega^2.
$$

这一步 $v_i = r_i\abs{\omega}$ 用到了刚体与固定轴。若物体同时在滑动，还另有动能，在下面滚动中处理。
:::

力矩扮演力的角色，$I$ 扮演质量，$\alpha$ 扮演加速度，但只限于同一条固定转轴。$\tau$ 恒定时，它对一段以弧度计的角做的功是 $\tau\,\Delta\theta$，且 $\tau\,\Delta\theta = \Delta\bigl(\tfrac{1}{2}I\omega^2\bigr)$。当支轴不做功、重力用势能更好处理时，我们用的就是这个功–能形式。

::: application 长杆为什么能让走钢丝的人站稳
走钢丝者的长杆对钢丝的转动惯量很大，因为它的质量离那条轴很远。于是一个微小的高出力矩只会产生微小的 $\alpha$，走钢丝的人有时间纠正倾斜。飞轮用的是同一定律的能量形式：活塞冲程一阵一阵地输入力矩，两阵之间靠 $\tfrac{1}{2}I\omega^2$ 让 $\omega$ 掉得不多。两种情形里都有轴承或钢丝把轴固定住，这就是 [[#thm-rotlaw]] 适用的原因。
:::

::: example 恒力矩下的圆盘 {#ex-torque-disc}
质量 $M = 2.00\,\mathrm{kg}$、半径 $R = 0.300\,\mathrm{m}$ 的均匀圆盘可绕固定中心轴自由转动。对该轴施加恒力矩 $\tau = 0.450\,\mathrm{N\cdot m}$，自静止开始。求 $I$、$\alpha$，以及 $4.00\,\mathrm{s}$ 后的角速度、动能与转过的角。
::: solution
圆盘公式给出

$$
I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(2.00)(0.300)^2 = (1.00)(0.0900) = 0.0900\,\mathrm{kg\cdot m^2}.
$$

对同一条轴用 [[#thm-rotlaw]] 得 $\alpha = \tau/I = 0.450/0.0900 = 5.00\,\mathrm{rad/s^2}$。力矩恒定，所以 $\alpha$ 恒定，[[#thm-const-alpha]] 适用，取 $\omega_0 = 0$、$\theta_0 = 0$。$t = 4.00\,\mathrm{s}$ 后，

$$
\omega = \alpha t = (5.00)(4.00) = 20.0\,\mathrm{rad/s}.
$$

动能是

$$
K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(0.0900)(20.0)^2 = (0.0450)(400) = 18.0\,\mathrm{J}.
$$

转过的角是

$$
\theta = \tfrac{1}{2}\alpha t^2 = \tfrac{1}{2}(5.00)(4.00)^2 = (2.50)(16.0) = 40.0\,\mathrm{rad}.
$$

核对：$\omega^2 = 2\alpha\theta$ 给出 $(20.0)^2 = 400$、$2(5.00)(40.0) = 400$。力矩做的功是 $\tau\theta = (0.450)(40.0) = 18.0\,\mathrm{J}$，恰等于 $K$，这正是从静止出发的物体上力矩的功能关系。

此时轮缘上的一点有 $v = R\omega = (0.300)(20.0) = 6.00\,\mathrm{m/s}$、$a_t = R\alpha = (0.300)(5.00) = 1.50\,\mathrm{m/s^2}$、$a_r = \omega^2 R = (400)(0.300) = 120\,\mathrm{m/s^2}$。向内加速度占主导，因为它随 $\omega^2$ 增长。
:::
:::

## 无滑滚动

沿直线滚动的轮子并不是绕固定轴转动：中心在移动，转动发生在过中心、方向不变的轴上。轮子不打滑时，联系是接触点处的一条约束。

设 $v$ 是中心的速度，$\omega$ 是绕中心的角速率，$\omega$ 的正方向选成使最低点相对中心向后运动。相对中心，该点具有与 $\mathbf{v}$ 反向的速率 $\omega R$。无滑意味着接触的那个物质点瞬时静止，所以两部分贡献相消：

$$
v = \omega R.
$$

半径不变时求导得 $a = \alpha R$，其中 $a = \deriv{v}{t}$ 是中心的加速度，符号的匹配方式相同。这些是约束，不是定律；轮子打滑时它们失效：那时 $v$ 与 $\omega$ 各自独立，只由摩擦耦合。静摩擦力能够维持 $v = \omega R$，却不会自行决定其中任何一个值。

现在让一个质量 $m$、半径 $R$、对中心 $I = k\,mR^2$ 的圆形物体，沿倾角为 $\theta$ 的斜面作无滑滚下。由前面的表，实心球 $k = \tfrac{2}{5}$，圆盘或实心圆柱 $k = \tfrac{1}{2}$，细圆环 $k = 1$。自静止释放后它要往下滑，所以静摩擦力 $f$ 沿斜面向上。取沿斜面向下为正方向。

::: theorem 沿斜面滚下物体的加速度 {#thm-rolling}
对中心满足 $I = k\,mR^2$ 的圆形刚体沿倾角 $\theta$ 的斜面作无滑滚下时，其中心的加速度为

$$
a = \frac{g\sin\theta}{1 + k}
$$ {#eq-rolling-a}

沿斜面向下。静摩擦力沿斜面向上，大小为

$$
f = \frac{k}{1 + k}\,mg\sin\theta.
$$ {#eq-rolling-f}

无滑条件成立期间摩擦不做功，因为接触的物质点瞬时静止，于是机械能守恒。自静止起、下降高度 $h$ 后，

$$
v^2 = \frac{2gh}{1 + k}.
$$ {#eq-rolling-v}

牛顿力学的论证与能量的论证给出同一个 $a$。若接触面提供不出 [[#eq-rolling-f]] 所需的力，物体就打滑，$a = \alpha R$ 与 [[#eq-rolling-a]] 都不再用得。
:::

::: proof
对质心的牛顿第二定律，取沿斜面向下为正，写作

$$
mg\sin\theta - f = ma,
$$

法向支持力与重力的垂直分量平衡，$f$ 沿斜面向上。对中心，重力没有力矩；对圆形物体，法向支持力沿径向，所以它也没有力矩。轮缘处的摩擦力臂为 $R$，力矩为 $fR$，方向使 $\omega$ 增大。即使中心有加速度，$\tau = I\alpha$ 对中心仍然成立：那就是 [[mechanics/angular-momentum]] 中证明的质心形式。于是 $fR = I\alpha$。配上无滑约束 $a = \alpha R$，

$$
f = \frac{I a}{R^2} = k\,ma.
$$

代回中心的方程：

$$
mg\sin\theta - k\,ma = ma \implies g\sin\theta = a(1 + k) \implies a = \frac{g\sin\theta}{1 + k}.
$$

摩擦从 $a$ 的方程中消掉了。它仍然存在，而且被确定了：$f = k\,ma = \bigl[k/(1 + k)\bigr]mg\sin\theta$，即 [[#eq-rolling-f]]。法向支持力为 $N = mg\cos\theta$，所以接触面能提供所需的静摩擦，只有当 $\mu_s N \ge f$，即

$$
\mu_s \ge \frac{k}{1 + k}\tan\theta.
$$

这个不等式不成立时接触处打滑，$a = \alpha R$ 为假，推导到此失效。

走能量这条路：当 $v = \omega R$ 时接触的物质点速度为零，所以静摩擦力与法向支持力的功率为零、不做功。重力是保守力，机械能守恒。下降高度 $h$ 后，势能的减少等于中心的动能加上绕中心转动的动能，

$$
mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2.
$$

约束 $v = \omega R$（物体自静止无滑出发、$\mu_s$ 足够大时全程保持）给出 $\tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(kmR^2)(v^2/R^2) = \tfrac{1}{2}kmv^2$。于是

$$
mgh = \tfrac{1}{2}mv^2(1 + k) \implies v^2 = \frac{2gh}{1 + k},
$$

即 [[#eq-rolling-v]]。设 $s$ 为沿斜面的距离，则 $h = s\sin\theta$。从静止起 $v^2 = 2as$，能量结果化为 $2as = 2g(s\sin\theta)/(1 + k)$，故 $a = g\sin\theta/(1 + k)$。两条路一致。

同一个动能也可以用 [[#thm-parallel]] 来写。对接触点，$I_P = I_{\mathrm{cm}} + mR^2 = mR^2(k + 1)$，而接触点虽则瞬时静止，仍有 $K = \tfrac{1}{2}I_P\omega^2 = \tfrac{1}{2}m(1 + k)v^2$。这是对上面拆分的核对，不是允许你对这个动点使用 $\tau = I\alpha$ 的许可证——那需要下一章的论证。
:::

$k$ 越大，势能的减少中存进转动的份额越大，中心就加速越慢。摩擦不可缺少，因为没有它就没有力矩；但只要接触面能按 [[#eq-rolling-f]] 提供静摩擦，它就从 $a$ 中消掉。

::: widget rolling
angle: 30
caption: 实心球、圆盘与圆环同时释放。球最先到达底部，因为 I/(m R^2) 最小。这里的角度是 30°，即算例中使用的角度。
:::

::: example 三十度斜面上的球、圆盘与圆环 {#ex-rolling}
实心球、圆盘与细圆环沿同一倾角 $\theta = 30^\circ$ 的斜面作无滑滚下，自静止出发。取 $g = 9.80\,\mathrm{m/s^2}$、$\sin 30^\circ = \tfrac{1}{2}$。求各中心的加速度。对下降高度 $h = 0.500\,\mathrm{m}$，求球到底时的速率，并用 $v^2 = 2as$ 核对。
::: solution
这里 $g\sin\theta = (9.80)(\tfrac{1}{2}) = 4.90\,\mathrm{m/s^2}$，而 [[#eq-rolling-a]] 把这个数除以 $1 + k$。

球：$k = \tfrac{2}{5}$，$1 + k = \tfrac{7}{5} = 1.40$，

$$
a_{\mathrm{sphere}} = \frac{4.90}{1.40} = 3.50\,\mathrm{m/s^2}.
$$

圆盘：$k = \tfrac{1}{2}$，$1 + k = \tfrac{3}{2}$，

$$
a_{\mathrm{disc}} = \frac{4.90}{3/2} = \frac{9.80}{3} = 3.2666\ldots\,\mathrm{m/s^2},
$$

四位有效数字即 $3.267\,\mathrm{m/s^2}$。

圆环：$k = 1$，$1 + k = 2$，

$$
a_{\mathrm{hoop}} = \frac{4.90}{2} = 2.45\,\mathrm{m/s^2},
$$

即 $g/4$。球最快，因为 $k$ 最小。$I$ 写成 $k\,mR^2$ 后，质量与半径各自消掉了，所以大环与小环一起滚下。

摩擦力为 $f = \bigl[k/(1 + k)\bigr]mg\sin\theta = \bigl[k/(1 + k)\bigr]m(4.90)$。无量纲因子 $k/(1 + k)$：球为 $(2/5)/(7/5) = 2/7$，圆盘为 $(1/2)/(3/2) = 1/3$，圆环为 $1/2$。于是，$m$ 以千克计、$f$ 以牛顿计，

$$
f_{\mathrm{sphere}} = \tfrac{2}{7}(4.90)\,m = 1.40\,m, \qquad f_{\mathrm{disc}} = \tfrac{4.90}{3}\,m = 1.633\ldots\,m, \qquad f_{\mathrm{hoop}} = 2.45\,m.
$$

同样重量下，圆环要求的摩擦最大。下降 $h = 0.500\,\mathrm{m}$ 后球的速率由 [[#eq-rolling-v]] 得：

$$
v^2 = \frac{2gh}{1 + k} = \frac{2(9.80)(0.500)}{1.40} = \frac{9.80}{1.40} = 7.00\,\mathrm{m^2/s^2},
$$

所以 $v = \sqrt{7.00} = 2.646\,\mathrm{m/s}$。沿斜面 $s = h/\sin\theta = 0.500/(\tfrac{1}{2}) = 1.00\,\mathrm{m}$，$v^2 = 2as = 2(3.50)(1.00) = 7.00\,\mathrm{m^2/s^2}$，再次相符。势能的减少最终进入转动的份额是 $k/(1 + k)$：球 $2/7$，圆盘 $1/3$，圆环 $1/2$。静摩擦强制了约束，却没有做一点功。
:::
:::

## 后续内容

下一章 [[mechanics/angular-momentum]] 把 $\tau = I\alpha$ 换成：力矩等于角动量的变化率。当支轴可以推、却施加不了力矩，当没有任何轴固定时，活下来的正是这条定律。[[mechanics/gravitation]] 中的轨道就是例子：行星受到的力是中心的，对太阳的角动量恒定。当 $I$ 成为张量、$\mathbf{L}$ 未必沿 $\boldsymbol{\omega}$ 时，课题就属于 [[analytical-mechanics]]。这里的公式仍然是定轴的，或轮子沿直线无滑滚动的。

::: summary
- 转动运动学的角位置以弧度计。于是 $\omega = \deriv{\theta}{t}$、$\alpha = \deriv{\omega}{t}$，距轴 $R$ 的点有 $s = R\theta$、$v = R\omega$、$a_t = R\alpha$，向内加速度 $\omega^2 R$。
- 恒定 $\alpha$ 重复直线运动的公式：$\omega = \omega_0 + \alpha t$、$\theta = \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2$、$\omega^2 = \omega_0^2 + 2\alpha\,\Delta\theta$。
- 对一条轴的转动惯量是 $I = \sum m_i r_i^2 = \int r^2\,\dd m$，其中 $r$ 是到该轴的垂直距离。细杆对中心轴是 $\tfrac{1}{12}ML^2$，对端点轴是 $\tfrac{1}{3}ML^2$。
- 圆环对中心轴是 $MR^2$，圆盘或实心圆柱对自身轴是 $\tfrac{1}{2}MR^2$，实心球对直径是 $\tfrac{2}{5}MR^2$。
- 与质心轴相距 $d$ 的平行轴：$I = I_{\mathrm{cm}} + Md^2$。定理不适用于不平行的轴。
- 力矩是 $\mathbf{r}\times\mathbf{F}$，大小等于力乘以力臂。对固定转轴，$\tau = I\alpha$ 且 $K = \tfrac{1}{2}I\omega^2$，其中 $\tau$ 与 $I$ 对同一条轴。
- 无滑滚动给出约束 $v = \omega R$ 与 $a = \alpha R$。沿斜面，中心以 $a = g\sin\theta/(1 + k)$ 加速，$k = I/(mR^2)$，静摩擦不做功。
- 在 $30^\circ$ 斜面上，实心球的加速度是 $3.50\,\mathrm{m/s^2}$，圆盘 $3.267\,\mathrm{m/s^2}$，圆环 $2.45\,\mathrm{m/s^2}$。下降 $0.500\,\mathrm{m}$ 后球的速率是 $2.646\,\mathrm{m/s}$。
:::

## 习题

::: exercise 轮缘上一点的速率 {#exr-rim level=1 check="1.4"}
半径 $0.350\,\mathrm{m}$ 的轮子以恒定角速度 $4.00\,\mathrm{rad/s}$ 转动。求轮缘上一点的切向速率，以 $\mathrm{m/s}$ 计。
::: solution
角已经是每秒弧度，[[#eq-kinematic]] 直接适用。切向速率是

$$
v = R\omega = (0.350)(4.00) = 1.40\,\mathrm{m/s}.
$$

向内加速度没有问；它是 $\omega^2 R = 16.0\times 0.350 = 5.60\,\mathrm{m/s^2}$，而 $\omega$ 恒定，所以切向加速度为零。
:::
:::

::: exercise 细杆对中心的转动惯量 {#exr-rod level=1 check="0.096"}
均匀细杆质量 $M = 0.800\,\mathrm{kg}$、长 $L = 1.20\,\mathrm{m}$。求它对过中心且垂直于杆的转轴的转动惯量，以 $\mathrm{kg\cdot m^2}$ 计。
::: solution
[[#thm-rod]] 给出 $I = \tfrac{1}{12}ML^2$。先算 $L^2 = (1.20)^2 = 1.44\,\mathrm{m^2}$，于是

$$
ML^2 = (0.800)(1.44) = 1.152\,\mathrm{kg\cdot m^2}, \qquad I = \frac{1.152}{12} = 0.0960\,\mathrm{kg\cdot m^2}.
$$

题目问的是中心，不是端点。
:::
:::

::: exercise 转台转过的角 {#exr-turntable level=1 check="45"}
转台自静止出发，以恒定角加速度 $\alpha = 2.50\,\mathrm{rad/s^2}$ 转动 $6.00\,\mathrm{s}$。它转过多大的角，以弧度计？
::: solution
用 [[#eq-const-alpha]]，取 $\omega_0 = 0$、$\theta_0 = 0$。这个角不需要末角速度：

$$
\theta = \tfrac{1}{2}\alpha t^2 = \tfrac{1}{2}(2.50)(6.00)^2 = (1.25)(36.0) = 45.0\,\mathrm{rad}.
$$

核对：$\omega = \alpha t = (2.50)(6.00) = 15.0\,\mathrm{rad/s}$，$\omega^2 = 2\alpha\theta$ 给出 $225 = 2(2.50)\,\theta = 5.00\,\theta$，所以 $\theta = 45.0\,\mathrm{rad}$，再次相同。
:::
:::

::: exercise 球领先多少？ {#exr-race level=2 check="10/7"}
实心球与细圆环沿同一倾角 $30^\circ$ 的斜面作无滑滚下，自静止并肩出发。圆环沿斜面走过 $1.00\,\mathrm{m}$ 时，球沿斜面走了多少米？
::: hint
加速度之比就是 $1/(1 + k)$ 之比，而从静止起、同一时间内的距离之比就是加速度之比。
:::
::: solution
由 [[#ex-rolling]]，或直接用 [[#eq-rolling-a]] 配 $\sin 30^\circ = \tfrac{1}{2}$，

$$
a_{\mathrm{sphere}} = \frac{g/2}{7/5} = 3.50\,\mathrm{m/s^2}, \qquad a_{\mathrm{hoop}} = \frac{g/2}{2} = 2.45\,\mathrm{m/s^2},
$$

取 $g = 9.80\,\mathrm{m/s^2}$。比值为

$$
\frac{a_{\mathrm{sphere}}}{a_{\mathrm{hoop}}} = \frac{3.50}{2.45} = \frac{350}{245} = \frac{10}{7},
$$

它也是 $(1/1.40)/(1/2) = 2/1.40 = 10/7$，而且 $g$ 的具体值消掉了。两个物体都从静止出发，所以时间 $t$ 内沿斜面的距离是 $s = \tfrac{1}{2}at^2$。同一时间里，距离之比等于加速度之比。当 $s_{\mathrm{hoop}} = 1.00\,\mathrm{m}$ 时，

$$
s_{\mathrm{sphere}} = \frac{10}{7}\times 1.00 = \frac{10}{7}\,\mathrm{m}.
$$

球领先 $10/7 - 1 = 3/7\,\mathrm{m}$，约 $0.429\,\mathrm{m}$。质量与半径从头到尾没有进入。
:::
:::

::: exercise 圆盘短距下降后的速率 {#exr-disc-speed level=2 check="sqrt(98/15)"}
圆盘自静止起沿斜坡作无滑滚下，高度降低 $0.500\,\mathrm{m}$。求它到底时的速率，以 $\mathrm{m/s}$ 计。取 $g = 9.80\,\mathrm{m/s^2}$。
::: solution
圆盘 $k = \tfrac{1}{2}$，$1 + k = \tfrac{3}{2}$。能量公式 [[#eq-rolling-v]] 不需要斜坡的倾角：

$$
v^2 = \frac{2gh}{1 + k} = \frac{2(9.80)(0.500)}{3/2} = \frac{9.80}{3/2} = \frac{9.80\times 2}{3} = \frac{19.6}{3} = \frac{98}{15}.
$$

故 $v = \sqrt{98/15}\,\mathrm{m/s}$。数值上 $98/15 = 6.5333\ldots$，$v = 2.556\,\mathrm{m/s}$。同样的 $v^2$ 可由 $a = g\sin\theta/(3/2)$ 与 $s = h/\sin\theta$ 得到，因为 $v^2 = 2as = 2gh/(3/2)$，倾角消掉。静摩擦不做功，这就是能量方程不带摩擦项也能闭合的原因。
:::
:::

::: exercise 让圆盘滚动所需的最小摩擦 {#exr-mu level=2 check="sqrt(3)/9"}
把圆盘静止放在倾角 $30^\circ$ 的斜面上。求能让它无滑滚下的最小静摩擦系数。给出精确值。
::: hint
所需的摩擦力是 [[#eq-rolling-f]]，法向支持力是 $mg\cos\theta$。相除。
:::
::: solution
圆盘 $k = \tfrac{1}{2}$，所以 $k/(1 + k) = (1/2)/(3/2) = 1/3$。[[#thm-rolling]] 要求

$$
\mu_s \ge \frac{k}{1 + k}\tan\theta = \frac{1}{3}\tan 30^\circ.
$$

由于 $\tan 30^\circ = 1/\sqrt{3}$，

$$
\mu_{\min} = \frac{1}{3\sqrt{3}} = \frac{\sqrt{3}}{9}.
$$

数值上 $\sqrt{3}/9 \approx 0.1925$。系数更小时，在 $N = mg\cos\theta$ 之下提供不出 $f = \tfrac{1}{3}mg\sin\theta$，圆盘就打滑，$v$ 与 $\omega R$ 分道扬镳，加速度不再是 $g\sin\theta/(1 + k)$。质量与半径消掉了，正如它们在 $a$ 本身中消掉一样。
:::
:::

::: exercise 从水平位置放下的杆 {#exr-rod-fall level=3 check="39.2"}
长 $L = 0.750\,\mathrm{m}$ 的均匀杆，一端光滑地铰接在固定水平轴上，轴垂直于杆。杆自静止从水平位置释放。求杆摆到竖直下垂位置时的 $\omega^2$，以 $\mathrm{rad^2/s^2}$ 计。取 $g = 9.80\,\mathrm{m/s^2}$。
::: hint
支轴不动，所以那里的力不做功。质心下降 $L/2$，而对支轴的转动惯量取端点轴的值。
:::
::: solution
设质量为 $M$。它最后会消掉，这就是题目不指定它的原因。对支轴，[[#thm-parallel]] 或端点杆的公式给出 $I = \tfrac{1}{3}ML^2$。

质心下降 $L/2 = 0.375\,\mathrm{m}$。支轴不动，它的力不做功，机械能守恒：

$$
Mg\frac{L}{2} = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}\cdot\tfrac{1}{3}ML^2\,\omega^2 = \tfrac{1}{6}ML^2\omega^2.
$$

消去 $M$，乘以 $6/L^2$：

$$
\omega^2 = \frac{6}{L^2}\cdot g\frac{L}{2} = \frac{3g}{L} = \frac{3\times 9.80}{0.750} = \frac{29.4}{0.750} = 39.2\,\mathrm{rad^2/s^2}.
$$

核对除法：$0.750\times 39.2 = 29.25 + 0.15 = 29.4$。
:::
:::

::: exercise 实心球的转动惯量 {#exr-sphere level=3}
证明：质量 $M$、半径 $R$ 的均匀实心球对任一直径的转动惯量是 $\tfrac{2}{5}MR^2$。可以使用每片切片的圆盘结果 $I = \tfrac{1}{2}mr^2$。
::: hint
沿垂直于直径的方向把球切片。高度 $z$ 处的切片是半径 $\sqrt{R^2 - z^2}$ 的圆盘，而它自己的轴就是那条直径，所以不需要平行轴平移。
:::
::: solution
把球心放在原点，直径沿 $z$ 轴。球的体积是 $\tfrac{4}{3}\pi R^3$，所以均匀密度为 $\rho = M\big/\bigl(\tfrac{4}{3}\pi R^3\bigr) = 3M/(4\pi R^3)$。

夹在 $z$ 与 $z + \dd z$ 之间、垂直于 $z$ 轴的切片半径为 $a = \sqrt{R^2 - z^2}$，体积为 $\pi a^2\,\dd z$，误差在 $\dd z \to 0$ 的极限下消失。它的质量是

$$
\dd m = \rho\,\pi a^2\,\dd z = \frac{3M}{4\pi R^3}\cdot\pi a^2\,\dd z = \frac{3M}{4R^3}\,a^2\,\dd z.
$$

这块切片是半径为 $a$ 的圆盘，轴就是 $z$ 轴本身，所以它对直径的转动惯量是 $\tfrac{1}{2}\,a^2\,\dd m$，不需要平行轴修正。从 $z = -R$ 积到 $z = R$：

$$
I = \int \tfrac{1}{2}a^2\,\dd m = \int_{-R}^{R}\tfrac{1}{2}a^2\cdot\frac{3M}{4R^3}\,a^2\,\dd z = \frac{3M}{8R^3}\int_{-R}^{R} a^4\,\dd z.
$$

现在 $a^2 = R^2 - z^2$，$a^4 = (R^2 - z^2)^2 = R^4 - 2R^2 z^2 + z^4$。被积函数是偶函数，于是

$$
\int_{-R}^{R}(R^4 - 2R^2 z^2 + z^4)\,\dd z = 2\left[R^4 z - 2R^2\frac{z^3}{3} + \frac{z^5}{5}\right]_0^{R} = 2\left(R^5 - \frac{2R^5}{3} + \frac{R^5}{5}\right).
$$

$R^5$ 的系数是 $1 - \tfrac{2}{3} + \tfrac{1}{5} = \tfrac{15}{15} - \tfrac{10}{15} + \tfrac{3}{15} = \tfrac{8}{15}$，积分等于 $2R^5\cdot\tfrac{8}{15} = \tfrac{16}{15}R^5$。因此

$$
I = \frac{3M}{8R^3}\cdot\frac{16}{15}R^5 = \frac{3M\cdot 16\,R^2}{8\cdot 15} = \frac{3M\cdot 2\,R^2}{15} = \frac{6}{15}MR^2 = \tfrac{2}{5}MR^2.
$$

这就是滚动球所用的转动惯量。
:::
:::
