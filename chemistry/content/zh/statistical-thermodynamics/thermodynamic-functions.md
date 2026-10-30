二氧化碳在$298\ \mathrm{K}$下的摩尔定压热容为$37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$（NIST-JANAF表）。经典物理给每个分子按其每一种二次储能方式各$\tfrac{1}{2}k_\mathrm{B}T$的能量，预言$62.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$；入门化学里的“刚性分子”图像预言$29.1$。两者都不对，而真实值尴尬地位于两者之间。解释这类数值——并且只用从红外光谱读出的四个振动波数就把它预言到量热计的精度以内——是量子统计力学最早的重大成功之一，也是本课的主要内容。

现在我们来兑现[[statistical-thermodynamics/partition-function]]中的配分函数。由$q$及其温度导数，我们得到一个分子的平均能量、气体的热力学能与热容，以及熵，每一项都写成平动、转动、振动与电子贡献之和。我们证明经典的能量均分定理，并确切看出它何时、为何失效；我们还把玻尔兹曼的$S = k_\mathrm{B}\ln W$与[[thermodynamics/second-law]]的量热熵联系起来，包括晶体在绝对零度仍保留一点熵的奇例。本课的全部内容中，体系都是$N$个独立分子的集合；相互作用体系的一般框架见[[statistical-thermodynamics/canonical-ensemble]]。

## 热力学能

按玻尔兹曼分布排布的$N$个分子的总能量为$E = \sum_i n_i\varepsilon_i = (N/q)\sum_i\varepsilon_ie^{-\beta\varepsilon_i}$。此式中的求和除一个符号外正是$q$对$\beta$的导数，由此得到本课题的中心公式。

::: proposition 由配分函数求热力学能 {#prop-u}
对分子配分函数为$q$的$N$个独立分子，
$$
U - U(0) = N\langle\varepsilon\rangle = -N\left(\frac{\partial\ln q}{\partial\beta}\right)_{V} = Nk_\mathrm{B}T^{2}\left(\frac{\partial\ln q}{\partial T}\right)_{V} ,
$$ {#eq-u}
其中$U(0)$是$T = 0$时的热力学能（所有分子都在基态，分子能量的零点），$\langle\varepsilon\rangle$是一个分子的平均能量。导数在恒容下取，因为能级依赖于$V$（平动能级依赖于容器大小）。
:::

::: proof
分子的平均能量是布居加权的平均，
$$
\langle\varepsilon\rangle = \sum_i\varepsilon_i\frac{e^{-\beta\varepsilon_i}}{q} = -\frac{1}{q}\sum_i\frac{\partial}{\partial\beta}e^{-\beta\varepsilon_i} = -\frac{1}{q}\left(\frac{\partial q}{\partial\beta}\right)_{V} = -\left(\frac{\partial\ln q}{\partial\beta}\right)_{V} ,
$$
其中在固定$V$下允许对求和号内的式子求导，因为诸$\varepsilon_i$不依赖$\beta$。$N$个分子以共同基态为起点量度的能量是$N\langle\varepsilon\rangle$；加上基态能量即得$U = U(0) + N\langle\varepsilon\rangle$。最后，由于$\beta = 1/k_\mathrm{B}T$，$\mathrm{d}\beta = -\mathrm{d}T/k_\mathrm{B}T^{2}$，故$-\partial/\partial\beta = k_\mathrm{B}T^{2}\,\partial/\partial T$。
:::

因为$\ln q$是各模式之和，$U - U(0)$也是。每一贡献都由相应的配分函数得出。

**平动。**$q^\mathrm{T} = V/\Lambda^{3} \propto VT^{3/2}$，故$\ln q^\mathrm{T} = \tfrac{3}{2}\ln T + \text{const}$，$U^\mathrm{T} = Nk_\mathrm{B}T^{2}\times\tfrac{3}{2}T^{-1} = \tfrac{3}{2}Nk_\mathrm{B}T$——气体动理论的结果，如今是推导出来的，不再是假设。

**转动**（线性分子，$T \gg \theta_\mathrm{R}$）。$q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$，故$U^\mathrm{R} = Nk_\mathrm{B}T$；非线性分子$q^\mathrm{R} \propto T^{3/2}$，$U^\mathrm{R} = \tfrac{3}{2}Nk_\mathrm{B}T$。

**振动。**由$q^\mathrm{V} = (1 - e^{-\beta hc\tilde\nu})^{-1}$，$\ln q^\mathrm{V} = -\ln(1 - e^{-\beta hc\tilde\nu})$，于是
$$
U^\mathrm{V} = -N\frac{\partial\ln q^\mathrm{V}}{\partial\beta} = N\frac{hc\tilde\nu\,e^{-\beta hc\tilde\nu}}{1 - e^{-\beta hc\tilde\nu}} = \frac{Nhc\tilde\nu}{e^{\beta hc\tilde\nu} - 1} = Nk_\mathrm{B}\frac{\theta_\mathrm{V}}{e^{\theta_\mathrm{V}/T} - 1} .
$$ {#eq-uv}
低温下$U^\mathrm{V} \approx Nhc\tilde\nu\,e^{-\theta_\mathrm{V}/T}$，指数性地小：振子是冻结的。高温下$e^{\theta_\mathrm{V}/T} - 1 \approx \theta_\mathrm{V}/T$，$U^\mathrm{V} \to Nk_\mathrm{B}T$。

**电子。**对简并度为$g_0$、$g_1$、间隔为$\varepsilon$的二能级体系，$q^\mathrm{E} = g_0 + g_1e^{-\beta\varepsilon}$，$U^\mathrm{E} = N\varepsilon g_1e^{-\beta\varepsilon}/(g_0 + g_1e^{-\beta\varepsilon})$：能隙乘以被激发分子的分数。

::: example 碘的振动能 {#ex-iodine-u}
计算$\mathrm{I_2}$（$\tilde\nu = 214.5\ \mathrm{cm^{-1}}$）在$298.15\ \mathrm{K}$的摩尔振动能$U^\mathrm{V}_\mathrm{m}$，并与经典值及零点能比较。
::: solution
$\theta_\mathrm{V} = 1.438\,78\times214.5 = 308.6\ \mathrm{K}$，故$\theta_\mathrm{V}/T = 1.0351$，$e^{1.0351} - 1 = 1.8155$。由[[#eq-uv]]按摩尔，
$$
U^\mathrm{V}_\mathrm{m} = R\,\frac{\theta_\mathrm{V}}{e^{\theta_\mathrm{V}/T} - 1} = 8.3145\times\frac{308.6}{1.8155}\ \mathrm{J\,mol^{-1}} = 1.413\ \mathrm{kJ\,mol^{-1}} .
$$
经典值为$RT = 2.479\ \mathrm{kJ\,mol^{-1}}$，故即使对这一极低频模式，振动也持有其经典份额的$57\,\%$。摩尔零点能$\tfrac{1}{2}N_\mathrm{A}hc\tilde\nu = \tfrac{1}{2}R\theta_\mathrm{V} = 1.283\ \mathrm{kJ\,mol^{-1}}$不包含在$U - U(0)$里：它是$U(0)$的一部分，在$T = 0$时也存在，且不贡献给热容。
:::
:::

## 热容

::: proposition 定容热容 {#prop-cv}
$$
C_V = \left(\frac{\partial U}{\partial T}\right)_{V} = -k_\mathrm{B}\beta^{2}\left(\frac{\partial U}{\partial\beta}\right)_{V} .
$$
对振动温度为$\theta_\mathrm{V}$的谐振振动，
$$
C^\mathrm{V}_{V,\mathrm{m}} = R\,f_\mathrm{E}\!\left(\frac{\theta_\mathrm{V}}{T}\right), \qquad f_\mathrm{E}(x) = \frac{x^{2}e^{x}}{(e^{x} - 1)^{2}},
$$ {#eq-einstein}
其中$f_\mathrm{E}$称为**爱因斯坦函数（Einstein function）**，从低温下的0升至高温下的1。对简并度为$g_0$、$g_1$、间隔为$\varepsilon$的二能级体系，
$$
C_{V,\mathrm{m}} = R\left(\frac{\varepsilon}{k_\mathrm{B}T}\right)^{2}\frac{(g_1/g_0)\,e^{-\varepsilon/k_\mathrm{B}T}}{\left(1 + (g_1/g_0)\,e^{-\varepsilon/k_\mathrm{B}T}\right)^{2}} ,
$$ {#eq-schottky}
它在低温与高温下都为零，中间经过一个极大，即**肖特基异常**。
:::

::: proof
第一条就是定义，配合$\mathrm{d}\beta/\mathrm{d}T = -k_\mathrm{B}\beta^{2}$。对振动，把[[#eq-uv]]（按摩尔）对$\beta$求导，记$\varepsilon = hc\tilde\nu$：
$$
\frac{\partial U^\mathrm{V}_\mathrm{m}}{\partial\beta} = -N_\mathrm{A}\frac{\varepsilon^{2}e^{\beta\varepsilon}}{(e^{\beta\varepsilon} - 1)^{2}} ,
\qquad\text{于是}\qquad
C^\mathrm{V}_{V,\mathrm{m}} = N_\mathrm{A}k_\mathrm{B}\frac{(\beta\varepsilon)^{2}e^{\beta\varepsilon}}{(e^{\beta\varepsilon} - 1)^{2}} = R f_\mathrm{E}(\beta\varepsilon),
$$
且$\beta\varepsilon = \theta_\mathrm{V}/T$。$x$小时，$e^{x} - 1 \approx x(1 + x/2)$，$f_\mathrm{E} \to 1$；$x$大时，$f_\mathrm{E} \approx x^{2}e^{-x} \to 0$。对二能级体系，记$r = g_1/g_0$，则$U_\mathrm{m} = N_\mathrm{A}\varepsilon\,re^{-\beta\varepsilon}/(1 + re^{-\beta\varepsilon}) = N_\mathrm{A}\varepsilon/(r^{-1}e^{\beta\varepsilon} + 1)$。于是
$$
\frac{\partial U_\mathrm{m}}{\partial\beta} = -N_\mathrm{A}\varepsilon^{2}\frac{r^{-1}e^{\beta\varepsilon}}{(r^{-1}e^{\beta\varepsilon} + 1)^{2}} = -N_\mathrm{A}\varepsilon^{2}\frac{re^{-\beta\varepsilon}}{(1 + re^{-\beta\varepsilon})^{2}} ,
$$
再乘以$-k_\mathrm{B}\beta^{2}$即得[[#eq-schottky]]。
:::

::: widget plot
f: (1/x)^2*exp(1/x)/(exp(1/x) - 1)^2; (1/x)^2*g*exp(-1/x)/(1 + g*exp(-1/x))^2
x: 0.02, 3
y: 0, 1.1
sliders: g=1:1:5:1
labels: \text{谐振子 } C/Nk_\mathrm{B}; \text{二能级体系 } C/Nk_\mathrm{B}
hlines: 1
caption: 每个分子的热容（以$k_\mathrm{B}$为单位）对约化温度$x = k_\mathrm{B}T/\varepsilon$作图，其中$\varepsilon$是振动量子$hc\tilde\nu$（第一条曲线，爱因斯坦函数[[#eq-einstein]]）或简并度比$g = g_1/g_0$的二能级体系的能隙（第二条曲线，[[#eq-schottky]]）。振子的热容升到经典值1并保持在那里，因为它的能级梯无限延伸；二能级体系的热容升到极大后又*回落*，因为一旦两个能级几乎等分布，多余的热就无处可去。增大$g$会把肖特基峰推向更低温度并使其变高。
:::

当温度的微小改变引起布居的大变化时，热容就大，而这发生在$k_\mathrm{B}T$与能隙相当的时候。这正是读懂热容曲线的钥匙：一种贡献的启动揭示一道能隙。[[#eq-schottky]]的**肖特基异常**在顺磁盐中（毫开尔文到开尔文温区的塞曼分裂能级，是绝热去磁的基础）、基能级被晶体场分裂的稀土化合物中，以及NO一类分子中都可观测到。

::: example NO的电子热容 {#ex-no-cv}
NO的$^{2}\Pi_{1/2}$与$^{2}\Pi_{3/2}$能级都是二重简并，相隔$121.1\ \mathrm{cm^{-1}}$（[[statistical-thermodynamics/partition-function]]）。$C_{V,\mathrm{m}}$的电子贡献在什么温度最大？其值是多少？$298\ \mathrm{K}$下的贡献又是多少？
::: solution
这里$g_1/g_0 = 1$，$\varepsilon/k_\mathrm{B} = 1.438\,78\times121.1 = 174.2\ \mathrm{K}$。令$y = \varepsilon/k_\mathrm{B}T$，[[#eq-schottky]]化为$C/R = y^{2}e^{y}/(1 + e^{y})^{2}$。令它对$y$的导数为零，得超越方程$y\tanh(y/2) = 2$，其根（牛顿法，或数值求解）为$y = 2.399$。于是
$$
T_\text{max} = \frac{174.2\ \mathrm{K}}{2.399} = 72.6\ \mathrm{K}, \qquad
C_\text{max} = 0.439R = 3.65\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
$298\ \mathrm{K}$下$y = 0.5844$，$C/R = 0.3415\times1.794/(2.794)^{2} = 0.0785$，即$0.65\ \mathrm{J\,K^{-1}\,mol^{-1}}$——虽小，但任何精确计算NO热容时都必须计入；因此NO在低温下的热容超出$\mathrm{N_2}$或$\mathrm{O_2}$的数值之多，单靠振动无法解释。
:::
:::

## 能量均分定理

我们遇到的高温极限——平动$\tfrac{3}{2}k_\mathrm{B}T$，线性分子转动$k_\mathrm{B}T$，振动$k_\mathrm{B}T$——遵循一个早在量子力学之前经典物理就已认识到的规律。

::: theorem 能量均分定理 {#thm-equipartition}
在热平衡的经典体系中，能量里任何对某一个坐标或动量为二次的项——$\varepsilon = a\xi^{2}$，$\xi$取遍$(-\infty, \infty)$——对每个分子的平均能量贡献$\tfrac{1}{2}k_\mathrm{B}T$，对摩尔热容贡献$\tfrac{1}{2}R$。当$k_\mathrm{B}T$远大于某一运动模式量子化能级的间距时，它对该模式成立。
:::

::: proof
经典地，该模式的状态由连续变量$\xi$标记，玻尔兹曼平均变成积分：
$$
\langle a\xi^{2}\rangle = \frac{\int_{-\infty}^{\infty}a\xi^{2}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi}{\int_{-\infty}^{\infty}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi} = -\frac{\partial}{\partial\beta}\ln\int_{-\infty}^{\infty}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi = -\frac{\partial}{\partial\beta}\ln\left(\frac{\pi}{\beta a}\right)^{1/2} = \frac{1}{2\beta} = \tfrac{1}{2}k_\mathrm{B}T .
$$
系数$a$消掉了，所以一切二次项的结果都相同，无论质量、力常数还是转动惯量。只要能量是各含单一变量的项之*和*，能量的其余变量就在分子分母中作为常数因子被积掉。积分取代了对量子态的求和；只有当$k_\mathrm{B}T$之内包含许多状态时，即$T$远大于该模式的特征温度（$\theta_\mathrm{R}$或$\theta_\mathrm{V}$）时，这样做才合法。
:::

数二次项：平动有三项（$p_x^{2}/2m$、$p_y^{2}/2m$、$p_z^{2}/2m$）；线性分子的转动有两项（两条垂直轴，各贡献$J^{2}/2I$），非线性分子有三项；每个振动有*两项*——动能项与势能项，$p^{2}/2\mu + \tfrac{1}{2}k_\mathrm{f}x^{2}$——所以充分激发的振动贡献$k_\mathrm{B}T$，而非$\tfrac{1}{2}k_\mathrm{B}T$。因此，含$N_\text{at}$个原子、有$3N_\text{at} - 5$（线性）或$3N_\text{at} - 6$（非线性）个振动的分子，其经典热容为
$$
C_{V,\mathrm{m}}^\text{经典} = \tfrac{3}{2}R + \begin{cases}R + (3N_\text{at} - 5)R & \text{线性}\\ \tfrac{3}{2}R + (3N_\text{at} - 6)R & \text{非线性。}\end{cases}
$$

::: warning 能量均分是高温结果 {#warn-equipartition}
数一数二次项便宣布一切双原子气体都有$C_{V,\mathrm{m}} = \tfrac{7}{2}R$，这种诱惑难以抵挡。但那只是*经典*值，只有当$T \gg \theta_\mathrm{V}$才能达到——对$\mathrm{N_2}$须在$10\,000\ \mathrm{K}$以上，而那时分子早已解离。室温下轻双原子分子的伸缩振动是冻结的，$C_{V,\mathrm{m}} \approx \tfrac{5}{2}R$；$\mathrm{H_2}$在约$80\ \mathrm{K}$以下连转动也冻结，$C_{V,\mathrm{m}} \to \tfrac{3}{2}R$。经典物理恰恰无法解释这一失效——双原子气体“失踪”的热容，麦克斯韦（Maxwell）1875年称之为分子论面临的最大困难。能量均分定理还要求能量是*二次*的：非谐振动、受阻内旋转或引力场中的粒子（$\varepsilon = mgz$，对$z$线性）各自贡献不同的东西。
:::

::: widget plot
f: 2.5 + (t/x)^2*exp(t/x)/(exp(t/x) - 1)^2; 2.5; 3.5
x: 20, 6000
y: 1, 4
sliders: t=3393:300:5000:1
labels: C_{V,\mathrm{m}}/R; \text{刚性转子 } 5/2; \text{经典 } 7/2
caption: 双原子完整气体的摩尔热容$C_{V,\mathrm{m}}/R$对$T$（以K计）作图，转动按经典处理（$T \gg \theta_\mathrm{R}$），另含一个振动温度为$\theta_\mathrm{V}$（滑块`t`，以K计）的谐振振动。起始值为$\mathrm{N_2}$（$3393\ \mathrm{K}$）；试试$\mathrm{Cl_2}$的$805\ \mathrm{K}$与$\mathrm{I_2}$的$309\ \mathrm{K}$。振动贡献在$T \approx 0.2\theta_\mathrm{V}$附近启动，直到$T \approx 1.4\theta_\mathrm{V}$才达到经典值的$90\,\%$。（在几倍$\theta_\mathrm{R}$以下——除$\mathrm{H_2}$外都在图左缘之外——转动贡献也会下降。）
:::

::: example 二氧化碳的热容 {#ex-co2-cv}
利用$\mathrm{CO_2}$的正则模式波数（$1388.2$、$667.4$（×2）与$2349.2\ \mathrm{cm^{-1}}$），计算$298.15\ \mathrm{K}$下的$C_{V,\mathrm{m}}$与$C_{p,\mathrm{m}}$，并与经典预言及表值$C_{p,\mathrm{m}} = 37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$比较。
::: solution
平动与转动（线性，$\theta_\mathrm{R} = 0.56\ \mathrm{K}$）是经典的：$\tfrac{3}{2}R + R = \tfrac{5}{2}R$。对每个振动算出$x = c_2\tilde\nu/T$与$f_\mathrm{E}(x)$：

| 模式 | $\tilde\nu/\mathrm{cm^{-1}}$ | $x$ | $f_\mathrm{E}(x)$ |
|---|---|---|---|
| 对称伸缩 | 1388.2 | 6.699 | 0.0554 |
| 弯曲（×2） | 667.4 | 3.221 | 各0.4493 |
| 反对称伸缩 | 2349.2 | 11.337 | 0.0015 |

振动各项之和为$0.0554 + 2\times0.4493 + 0.0015 = 0.9556$，于是
$$
C_{V,\mathrm{m}} = (2.5 + 0.9556)R = 3.456\times8.3145 = 28.7\ \mathrm{J\,K^{-1}\,mol^{-1}},
\qquad C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R = 37.0\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
这与表值$37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$相符到$0.2\,\%$。经典值$C_{V,\mathrm{m}} = \tfrac{5}{2}R + 4R = 6.5R = 54.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$（故$C_{p,\mathrm{m}} = 62.4$）高得离谱，刚性分子值$C_{p,\mathrm{m}} = \tfrac{7}{2}R = 29.1$又太低：两个弯曲模大约激发了一半，伸缩模则几乎没有。弯曲模也正是吸收地球$15\ \mu\mathrm{m}$附近热辐射的模式（[[environmental-chemistry/greenhouse-gases]]）。
:::
:::

### 焓与热化学表中的热函数

对完整气体$pV = Nk_\mathrm{B}T$，焓立刻由热力学能得出：$H - H(0) = U - U(0) + Nk_\mathrm{B}T$，按摩尔即$H_\mathrm{m} - H_\mathrm{m}(0) = U_\mathrm{m} - U_\mathrm{m}(0) + RT$。热化学表（JANAF、NIST）列出的正是这个由配分函数算出的“焓函数”$H^\circ(T) - H^\circ(0)$，因为它正是把$T = 0$的反应能转化为$T$下的反应焓所需的量（[[statistical-thermodynamics/equilibrium-from-molecules]]），也正是基尔霍夫定律所积分的量（[[thermodynamics/heat-capacity-adiabatic]]）。

::: example 氮气的焓函数 {#ex-n2-h}
计算$\mathrm{N_2}$（$\theta_\mathrm{R} = 2.875\ \mathrm{K}$，$\theta_\mathrm{V} = 3393\ \mathrm{K}$）的$H^\circ_\mathrm{m}(298.15\ \mathrm{K}) - H^\circ_\mathrm{m}(0)$，并与表值$8.670\ \mathrm{kJ\,mol^{-1}}$比较。
::: solution
平动贡献$\tfrac{3}{2}RT$，$pV$项贡献$RT$：合计$\tfrac{5}{2}RT = 6.197\ \mathrm{kJ\,mol^{-1}}$。转动按最低阶贡献$RT$；高温展开的下一项来自$q^\mathrm{R} = (T/\theta_\mathrm{R} + \tfrac{1}{3} + \cdots)/\sigma$，把它压低$\tfrac{1}{3}R\theta_\mathrm{R} = 8.0\ \mathrm{J\,mol^{-1}}$，得$U^\mathrm{R}_\mathrm{m} = 2.479 - 0.008 = 2.471\ \mathrm{kJ\,mol^{-1}}$。振动贡献$R\theta_\mathrm{V}/(e^{\theta_\mathrm{V}/T} - 1) = 8.3145\times3393\times1.14\times10^{-5} = 0.32\ \mathrm{J\,mol^{-1}}$，完全可忽略。总计，
$$
H^\circ_\mathrm{m}(298.15\ \mathrm{K}) - H^\circ_\mathrm{m}(0) = 6.197 + 2.471 + 0.000 = 8.669\ \mathrm{kJ\,mol^{-1}},
$$
与表值准确到末位一致。刚性转子值$\tfrac{7}{2}RT = 8.677\ \mathrm{kJ\,mol^{-1}}$的精度也已达$0.1\,\%$以内：对室温下的双原子气体，$\tfrac{7}{2}RT$就是一切。
:::
:::

### 低温下的转动

在几乎所有温度下，几乎所有分子的转动都是经典的，因为转动温度只有几开尔文。例外是氢分子，其$\theta_\mathrm{R}$介于$43\ \mathrm{K}$（$\mathrm{D_2}$）与$85\ \mathrm{K}$（$\mathrm{H_2}$）之间，对它们必须使用完整求和。热容最容易由[[#prop-cv]]的*涨落形式*得到：由$U - U(0) = N\langle\varepsilon\rangle$，把$\langle\varepsilon\rangle = \sum_ig_i\varepsilon_ie^{-\beta\varepsilon_i}/q$对$\beta$求导，得
$$
C_V = Nk_\mathrm{B}\beta^{2}\left(\langle\varepsilon^{2}\rangle - \langle\varepsilon\rangle^{2}\right) ,
$$ {#eq-cv-fluct}
即以$(k_\mathrm{B}T)^{2}$为单位的分子能量的方差。（在[[statistical-thermodynamics/canonical-ensemble]]中，我们会在整个体系的能量上再遇到同一关系。）

::: widget plot
f: (sum((2*j + 1)*(j*(j + 1)/x)^2*exp(-j*(j + 1)/x), j, 0, 30)/sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 30)) - (sum((2*j + 1)*(j*(j + 1)/x)*exp(-j*(j + 1)/x), j, 0, 30)/sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 30))^2; 1
x: 0.05, 4
y: 0, 1.2
labels: C^\mathrm{R}_{V,\mathrm{m}}/R; \text{经典值 } 1
caption: 异核线性转子的转动热容$C^\mathrm{R}_{V,\mathrm{m}}/R$对$x = T/\theta_\mathrm{R}$作图，由[[#eq-cv-fluct]]用对$J$的精确求和算出。$x \approx 0.3$以下转动是冻结的，随后陡峭启动，*冲过*经典值$R$（约$10\,\%$，在$x = 0.81$附近），然后从上侧落到$R$。这个过冲是$J = 0 \rightarrow 1$激发形成的一个小的类肖特基峰。除氢分子外，一切分子在其呈气态的全部温度下都有$x > 10$，曲线平坦在1。
:::

::: example HD的转动热容 {#ex-hd-cv}
氘化氢的$B = 45.655\ \mathrm{cm^{-1}}$，且因异核，其转动能级不受核自旋限制。计算它在$30\ \mathrm{K}$与$53\ \mathrm{K}$的转动热容。
::: solution
$\theta_\mathrm{R} = 1.438\,78\times45.655 = 65.69\ \mathrm{K}$。$30\ \mathrm{K}$时$\theta_\mathrm{R}/T = 2.190$，头几个能级的玻尔兹曼因子$(2J+1)e^{-2.190J(J+1)}$为$1$、$3\times0.012\,53 = 0.0376$与$5\times1.97\times10^{-6} = 9.8\times10^{-6}$。以$k_\mathrm{B}T$为单位，能级能量为$0$、$4.380$与$13.14$，于是
$$
\langle\varepsilon\rangle/k_\mathrm{B}T = \frac{0.0376\times4.380 + 9.8\times10^{-6}\times13.14}{1.0376} = 0.1588, \qquad
\langle\varepsilon^{2}\rangle/(k_\mathrm{B}T)^{2} = \frac{0.0376\times19.18 + 9.8\times10^{-6}\times172.7}{1.0376} = 0.6967,
$$
由[[#eq-cv-fluct]]得$C^\mathrm{R}_{V,\mathrm{m}}/R = 0.6967 - 0.1588^{2} = 0.671$，即$5.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$——是经典值的三分之二，尽管此时只有$3.6\,\%$的分子在转动。$53\ \mathrm{K}$（$x = 0.81$）时用更多项重算得$C^\mathrm{R}_{V,\mathrm{m}}/R = 1.098$，即图中曲线的极大值：此刻气体的转动热容一时*超过*了能量均分允许的值。$\mathrm{H_2}$本身的情形因正氢-仲氢统计而复杂化（[[statistical-thermodynamics/partition-function]]）——正是每一个简单模型都无法拟合其热容，才使丹尼森（Dennison）提出了冻结的正氢-仲氢混合物。
:::
:::

## 熵

热力学能告诉我们分子拥有多少能量；熵告诉我们它们有多少种方式持有这些能量。对[[statistical-thermodynamics/boltzmann-distribution]]中的优势分布方式应用玻尔兹曼公式$S = k_\mathrm{B}\ln W$，就把熵用配分函数表示了出来。

::: definition 统计熵 {#def-boltzmann-entropy}
孤立体系的**统计熵**为
$$
S = k_\mathrm{B}\ln W ,
$$
其中$W$是最概然分布方式的权（等价地，对大$N$，即与宏观约束相容的微观状态总数：两者仅差一个因子，其对数与$\ln W$相比可以忽略）。
:::

两条性质表明这是正确的定义。它是*可加的*：对两个独立体系，$W = W_\mathrm{A}W_\mathrm{B}$，$S = S_\mathrm{A} + S_\mathrm{B}$，广延的热力学量理当如此。它在自发变化中*增大*：听之任之的孤立体系会走向$W$最大的分布方式，这正是热力学第二定律所要求的。剩下的事是证明它与热力学熵$\mathrm{d}S = \mathrm{d}q_\text{rev}/T$是同一个函数——下一条命题已经蕴含了这一点，因为它再现了热力学关系$(\partial S/\partial U)_V = 1/T$。

::: proposition 由配分函数求熵（可分辨分子） {#prop-s}
对$N$个独立的可分辨分子（例如定域在晶体格位上的分子或原子），
$$
S = \frac{U - U(0)}{T} + Nk_\mathrm{B}\ln q .
$$ {#eq-s}
于是$(\partial S/\partial U)_{V,N} = 1/T$，与温度的热力学定义一致。
:::

::: proof
由玻尔兹曼分布的推导，用斯特林近似，$\ln W = N\ln N - \sum_i n_i\ln n_i = -\sum_i n_i\ln(n_i/N)$。对玻尔兹曼布居，$\ln(n_i/N) = -\beta\varepsilon_i - \ln q$，故
$$
\ln W = \sum_i n_i(\beta\varepsilon_i + \ln q) = \beta\sum_i n_i\varepsilon_i + N\ln q = \beta\,(U - U(0)) + N\ln q .
$$
乘以$k_\mathrm{B}$即得[[#eq-s]]，因为$k_\mathrm{B}\beta = 1/T$。对导数，把$S$看作固定$V$与$N$时$\beta$的函数：
$$
\mathrm{d}S = k_\mathrm{B}\left[(U - U(0))\,\mathrm{d}\beta + \beta\,\mathrm{d}U + N\frac{\partial\ln q}{\partial\beta}\mathrm{d}\beta\right] = k_\mathrm{B}\beta\,\mathrm{d}U ,
$$
因为由[[#prop-u]]，$N\,\partial\ln q/\partial\beta = -(U - U(0))$。故$(\partial S/\partial U)_{V,N} = k_\mathrm{B}\beta = 1/T$。恒容下$U$的改变就是可逆传递的热，故$\mathrm{d}S = \mathrm{d}q_\text{rev}/T$：统计熵与热力学熵一致（至多差一个相加常数，第三定律把它定为零）。
:::

对*气体*，分子不可分辨，微状态数必须除以$N!$。其结果——在[[statistical-thermodynamics/canonical-ensemble]]中推导——是把$Nk_\mathrm{B}\ln q$换成$Nk_\mathrm{B}\ln(q/N) + Nk_\mathrm{B}$。这一修正属于平动运动，因为正是平动使气体分子可以互换；*内部*贡献——转动、振动、电子——照[[#eq-s]]原样计算，其中的$q$为内部配分函数。

::: proposition 转动熵、振动熵与二能级熵 {#prop-s-modes}
按摩尔计，能量从基态量起，
$$
S^\mathrm{R}_\mathrm{m} = R\left[1 + \ln\frac{T}{\sigma\theta_\mathrm{R}}\right]\quad(\text{线性}, T \gg \theta_\mathrm{R}),
\qquad
S^\mathrm{V}_\mathrm{m} = R\left[\frac{x}{e^{x} - 1} - \ln(1 - e^{-x})\right],\quad x = \frac{\theta_\mathrm{V}}{T},
$$
而对$g_0 = g_1 = 1$的二能级体系，$S_\mathrm{m} = R\left[\ln(1 + e^{-y}) + y\,e^{-y}/(1 + e^{-y})\right]$，其中$y = \varepsilon/k_\mathrm{B}T$，它从$0$升至$R\ln 2$。
:::

::: proof
各式都由[[#eq-s]]对一摩尔写出，$S_\mathrm{m} = U_\mathrm{m}/T + R\ln q$。转动：$U^\mathrm{R}_\mathrm{m} = RT$，$q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$。振动：由[[#eq-uv]]，$U^\mathrm{V}_\mathrm{m}/T = R\,x/(e^{x} - 1)$；$\ln q^\mathrm{V} = -\ln(1 - e^{-x})$。二能级：$U_\mathrm{m}/T = R\,y\,e^{-y}/(1 + e^{-y})$，$\ln q = \ln(1 + e^{-y})$；当$y\to0$时第一项趋于$\ln 2$，第二项趋于0。
:::

::: example 振动熵与转动熵 {#ex-s-modes}
计算(a)$\mathrm{I_2}$的振动熵与(b)$\mathrm{N_2}$的转动熵，均按每摩尔、$298.15\ \mathrm{K}$。
::: solution
（a）对$\mathrm{I_2}$，$x = 1.0351$（见[[#ex-iodine-u]]）：$x/(e^{x} - 1) = 1.0351/1.8155 = 0.5702$，$-\ln(1 - e^{-x}) = -\ln(0.6448) = 0.4388$。于是
$$
S^\mathrm{V}_\mathrm{m} = 8.3145\times(0.5702 + 0.4388) = 8.39\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
（b）对$\mathrm{N_2}$，$T/\sigma\theta_\mathrm{R} = q^\mathrm{R} = 51.86$（[[statistical-thermodynamics/partition-function]]），故
$$
S^\mathrm{R}_\mathrm{m} = 8.3145\times(1 + \ln 51.86) = 8.3145\times4.949 = 41.1\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
$\mathrm{N_2}$的振动只贡献$1.2\times10^{-3}\ \mathrm{J\,K^{-1}\,mol^{-1}}$。加上平动熵（$1\ \mathrm{bar}$下$150.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$，由下一课的萨库尔–特特罗德方程给出），得$S^\circ_\mathrm{m}(\mathrm{N_2}) = 191.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$，与表值$191.6$吻合。
:::
:::

::: quiz
一晶体含$N$个独立顺磁离子，每个离子的两个自旋状态被一小磁场分裂。当温度从很低升到很高时，摩尔熵的磁贡献如何变化？
- [ ] 它像振动熵一样无限增大。
- [x] 它从$0$升至$R\ln 2$并停在那里。
- [ ] 它升至极大然后回落为0，像热容那样。
- [ ] 它永远是$R\ln 2$，与温度无关。
::: solution
由[[#prop-s-modes]]，二能级熵从0（所有离子都在低能态，$W = 1$）升至$R\ln 2$（两态等概率，$W = 2^{N}$）。它不会超过$R\ln 2$，因为每个离子只有两个状态；它也不回落，因为熵是温度的单调函数（$C_V \ge 0$）。升而又降的是*热容*，即斜率$T\,\mathrm{d}S/\mathrm{d}T$——肖特基异常。绝热去磁恰恰利用这一熵：低温下磁化把$R\ln 2$移走，随后绝热去磁便使晶体冷却。
:::
:::

### 第三定律与残余熵

$T = 0$时每个分子都在基态，$W = g_0^{N}$，故$S(0) = Nk_\mathrm{B}\ln g_0$；基态非简并的完整晶体$S(0) = 0$——这就是热力学第三定律（[[thermodynamics/second-law]]）的统计内涵。比较由光谱数据算出的熵（*统计*熵或*光谱*熵，如[[#ex-s-modes]]）与由接近绝对零度起积分$C_p/T$测得的熵（*量热*熵）是严格的检验。多数物质两者在实验误差内一致。少数物质的统计熵更大，其差就是**残余熵**：低温下冻结进晶体里的无序。

::: example 一氧化碳的残余熵 {#ex-residual}
CO分子的偶极矩非常小，晶体中每个分子几乎同能地以CO或OC方式排列。若降温时取向被随机冻结，会得到多大的残余摩尔熵？与统计熵和量热熵之间约$4.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$的实测差值（克莱顿（Clayton）与吉奥克（Giauque），1932年）比较，并与冰的残余熵比较。
::: solution
若$N_\mathrm{A}$个分子各自独立地取两种取向之一，$W = 2^{N_\mathrm{A}}$，且
$$
S_\mathrm{m}(0) = k_\mathrm{B}\ln 2^{N_\mathrm{A}} = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
实测的$4.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$略小，说明无序并不完全（在取向冻结之前发生了某种部分有序化）。冰的情形更微妙：每个氧周围有两个近氢与两个远氢，鲍林（Pauling）（1935年）证明“冰规则”每摩尔留下约$(3/2)^{N_\mathrm{A}}$种排布，故$S_\mathrm{m}(0) = R\ln\tfrac{3}{2} = 3.37\ \mathrm{J\,K^{-1}\,mol^{-1}}$，与吉奥克和斯托特（Stout）测得的$3.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$（1936年）极好地吻合。这些残余熵不是第三定律的失效：晶体在低温下并不处于内部平衡，真正达到平衡的有序晶体有$S(0) = 0$。
:::
:::

::: history
双原子气体中能量均分的失效困扰着麦克斯韦（1875年）与玻尔兹曼，玻尔兹曼曾提议某种运动不知为何没有与其他运动“通信”。解决来自量子理论：爱因斯坦1907年关于固体热容的论文（[[statistical-thermodynamics/quantum-statistics]]）引入了[[#eq-einstein]]的函数$f_\mathrm{E}$，证明量子化的振子在低温下失去热容。奥伊肯（Arnold Eucken）1912年测出氢的转动热容在$100\ \mathrm{K}$以下降到$\tfrac{3}{2}R$，任何经典模型都无法解释。肖特基（Walter Schottky）在1922年分析了具有几个低激发能级的体系的热容。统计熵与量热熵的比较由吉奥克（William Giauque）及其伯克利的学生们在1920至1930年代系统化；吉奥克因其在极低温度下物质性质的工作（包括绝热去磁的发展）获得1949年诺贝尔化学奖。
:::

## 后续内容

公式$U - U(0) = -N\,\partial\ln q/\partial\beta$与$S = (U - U(0))/T + Nk_\mathrm{B}\ln q$，是从[[statistical-thermodynamics/canonical-ensemble]]中由正则配分函数对任何体系导出的一般关系对独立分子的特例。在那里，气体的熵补上不可分辨性修正后完成（萨库尔–特特罗德方程），并由此得出亥姆霍兹自由能与吉布斯自由能。用$q$表示的吉布斯自由能是平衡常数计算的出发点（[[statistical-thermodynamics/equilibrium-from-molecules]]）。爱因斯坦函数在德拜固体理论（[[statistical-thermodynamics/quantum-statistics]]）中以推广到频率谱的形式重现，这里算出的热容正是基尔霍夫定律（[[thermodynamics/heat-capacity-adiabatic]]）所用的热容。

::: summary
- 独立分子的热力学能为$U - U(0) = -N(\partial\ln q/\partial\beta)_V = Nk_\mathrm{B}T^{2}(\partial\ln q/\partial T)_V$；$U(0)$包含零点能。
- 每个分子的贡献：$\tfrac{3}{2}k_\mathrm{B}T$（平动），$k_\mathrm{B}T$（线性转动），$hc\tilde\nu/(e^{\theta_\mathrm{V}/T} - 1)$（谐振振动）。
- $C_V = (\partial U/\partial T)_V$；一个振动贡献$Rf_\mathrm{E}(\theta_\mathrm{V}/T)$，即爱因斯坦函数；二能级体系给出一个升而又降的肖特基峰。
- 能量均分：每个二次项贡献$\tfrac{1}{2}k_\mathrm{B}T$——但仅对$T \gg \theta$的模式；冻结的模式毫无贡献，这就解释了$C_{p,\mathrm{m}}(\mathrm{CO_2}) = 37.1$而非$62.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
- $S = k_\mathrm{B}\ln W$；对可分辨分子$S = (U - U(0))/T + Nk_\mathrm{B}\ln q$，满足$(\partial S/\partial U)_V = 1/T$。
- 内部熵：$S^\mathrm{R}_\mathrm{m} = R[1 + \ln(T/\sigma\theta_\mathrm{R})]$，$S^\mathrm{V}_\mathrm{m} = R[x/(e^{x}-1) - \ln(1 - e^{-x})]$；二能级体系饱和于$R\ln 2$。
- $S(0) = Nk_\mathrm{B}\ln g_0$；残余熵（CO约$R\ln 2$；冰$R\ln\tfrac{3}{2}$）记录了冻结进晶体里的无序。
:::

## 习题

::: exercise 一摩尔气体的平动能 {level=1 check="3.72"}
计算$298.15\ \mathrm{K}$下完整气体摩尔热力学能中的平动贡献。（以$\mathrm{kJ\,mol^{-1}}$为单位输入$U^\mathrm{T}_\mathrm{m}$。）
::: solution
$U^\mathrm{T}_\mathrm{m} = \tfrac{3}{2}RT = 1.5\times8.3145\times298.15\ \mathrm{J\,mol^{-1}} = 3718\ \mathrm{J\,mol^{-1}} = 3.72\ \mathrm{kJ\,mol^{-1}}$。它与分子的质量无关：同温下，一摩尔氢与一摩尔氙的平动能相同。
:::
:::

::: exercise 经典热容 {level=1 check="3"}
用能量均分定理预言(a)氩、(b)刚性$\mathrm{H_2O}$（振动冻结）、(c)所有振动充分激发的$\mathrm{H_2O}$的$C_{V,\mathrm{m}}/R$。（输入(b)的值。）
::: solution
(a) 只有平动：$\tfrac{3}{2}$。(b) 平动$\tfrac{3}{2}$ + 非线性转动$\tfrac{3}{2}$ = $3$。(c) 加上$3N_\text{at} - 6 = 3$个振动，各贡献$1$：$C_{V,\mathrm{m}}/R = 6$。室温下的真实值接近(b)，为$3.04$，因为水的最低振动（弯曲，$1595\ \mathrm{cm^{-1}}$，$\theta_\mathrm{V} = 2295\ \mathrm{K}$）几乎冻结。
:::
:::

::: exercise 氯的振动热容 {level=1 check="6.73"}
计算$\mathrm{Cl_2}$（$\theta_\mathrm{V} = 805.3\ \mathrm{K}$）在$500\ \mathrm{K}$的振动对$C_{V,\mathrm{m}}$的贡献。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入。）
::: solution
$x = 805.3/500 = 1.6106$；$e^{x} = 5.006$；$f_\mathrm{E} = x^{2}e^{x}/(e^{x} - 1)^{2} = 2.594\times5.006/(4.006)^{2} = 0.809$。于是$C^\mathrm{V}_{V,\mathrm{m}} = 0.809\times8.3145 = 6.73\ \mathrm{J\,K^{-1}\,mol^{-1}}$，为经典值$R$的$81\,\%$。
:::
:::

::: exercise 平均振动量子数 {level=2 check="0.551"}
谐振子的平均振动量子数为$\langle v\rangle = (U - U(0))/Nhc\tilde\nu$。证明$\langle v\rangle = 1/(e^{\theta_\mathrm{V}/T} - 1)$，并对$\mathrm{I_2}$在$298.15\ \mathrm{K}$求值。（输入$\langle v\rangle$。）
::: solution
把[[#eq-uv]]除以$Nhc\tilde\nu$得$\langle v\rangle = 1/(e^{\theta_\mathrm{V}/T} - 1)$，即我们将在[[statistical-thermodynamics/quantum-statistics]]中再遇到的玻色-爱因斯坦形式（振动量子是玻色子）。对$\mathrm{I_2}$，$e^{1.0351} - 1 = 1.8155$，$\langle v\rangle = 0.551$。用布居验证：$\sum_v v(1-x)x^{v} = x/(1-x) = 0.3552/0.6448 = 0.551$。
:::
:::

::: exercise 一个肖特基峰 {level=2 check="2.40"}
一顺磁离子有一个非简并基级与一个能量为$\varepsilon$的非简并激发级。证明热容的极大出现在$y = \varepsilon/k_\mathrm{B}T$满足$y\tanh(y/2) = 2$之处，并解出$y$。（$y$取三位有效数字输入。）
::: hint
把$C/R = y^{2}e^{y}/(1+e^{y})^{2} = (y/2)^{2}/\cosh^{2}(y/2)$写出，然后对$y$求导。
:::
::: solution
由于$e^{y}/(1+e^{y})^{2} = 1/(e^{-y/2} + e^{y/2})^{2} = 1/(4\cosh^{2}(y/2))$，令$u = y/2$，则$C/R = u^{2}/\cosh^{2}u$。于是$\mathrm{d}(C/R)/\mathrm{d}u = 2u/\cosh^{2}u - 2u^{2}\sinh u/\cosh^{3}u = (2u/\cosh^{2}u)(1 - u\tanh u)$，在$u\tanh u = 1$即$(y/2)\tanh(y/2) = 1$，或$y\tanh(y/2) = 2$时为零。从$y = 2$起用牛顿法：$f(y) = y\tanh(y/2) - 2$，$f(2) = -0.477$，$f'(2) = \tanh 1 + 1/\cosh^{2}1 = 1.181$，得$y = 2.404$；再迭代一次得$y = 2.399$，即$2.40$。最大热容为$C/R = (1.200)^{2}/\cosh^{2}(1.200) = 0.439$。
:::
:::

::: exercise 水蒸气的热容 {level=2 check="3.03"}
$\mathrm{H_2O}$的基础波数为$3657$、$1595$与$3756\ \mathrm{cm^{-1}}$。计算$298.15\ \mathrm{K}$下水蒸气的$C_{V,\mathrm{m}}/R$（按完整气体处理）。（输入$C_{V,\mathrm{m}}/R$。）
::: solution
平动与转动：$\tfrac{3}{2} + \tfrac{3}{2} = 3$。振动：$x = c_2\tilde\nu/T = 17.65$、$7.697$、$18.13$，得$f_\mathrm{E} = 6.7\times10^{-6}$、$0.0269$、$4.4\times10^{-6}$。总计$C_{V,\mathrm{m}}/R = 3.027$，即$3.03$；表中完整气体的$C_{p,\mathrm{m}} = 33.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$对应$C_{V,\mathrm{m}}/R = 33.6/8.3145 - 1 = 3.04$，微小差别来自非谐性与转动-振动耦合。只有弯曲模有贡献，而且只有其经典份额的$3\,\%$。
:::
:::

::: exercise 用概率表示的熵 {level=3}
证明：对具有玻尔兹曼布居$p_i = n_i/N$的$N$个可分辨分子，熵[[#eq-s]]可写成$S = -Nk_\mathrm{B}\sum_ip_i\ln p_i$。用这一形式证明：$g$个等分布状态体系的每分子熵为$k_\mathrm{B}\ln g$，且它是$g$个状态下的最大可能值。
::: solution
$\ln p_i = -\beta\varepsilon_i - \ln q$，故$-\sum_ip_i\ln p_i = \beta\sum_ip_i\varepsilon_i + \ln q\sum_ip_i = \beta\langle\varepsilon\rangle + \ln q$。乘以$Nk_\mathrm{B}$得$N\langle\varepsilon\rangle/T + Nk_\mathrm{B}\ln q = (U - U(0))/T + Nk_\mathrm{B}\ln q$，即[[#eq-s]]。若$g$个状态各有$p_i = 1/g$，则$-\sum p_i\ln p_i = -g\times(1/g)\ln(1/g) = \ln g$。证明这是极大：以拉格朗日乘数$\lambda$在$\sum_ip_i = 1$约束下最大化$-\sum_ip_i\ln p_i$：$-\ln p_i - 1 + \lambda = 0$给出一切$i$的$p_i$相等，二阶导数$-1/p_i < 0$确认为极大。形式$-\sum p\ln p$就是吉布斯熵；同一表达式（把$k_\mathrm{B}$换成$1/\ln 2$）就是香农（Shannon）的信息熵。
:::
:::

::: exercise 氯化氢的统计熵 {level=3 check="186.7"}
HCl（$M = 36.46\ \mathrm{g\,mol^{-1}}$）在$298.15\ \mathrm{K}$、$1\ \mathrm{bar}$下的标准摩尔平动熵为$153.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$（由[[statistical-thermodynamics/canonical-ensemble]]的萨库尔–特特罗德方程）。加上转动与振动贡献（$B = 10.59\ \mathrm{cm^{-1}}$，$\tilde\nu = 2990.9\ \mathrm{cm^{-1}}$），转动用精确求和$q^\mathrm{R} = 19.90$及$U^\mathrm{R}_\mathrm{m} = RT$，与表值$S^\circ_\mathrm{m} = 186.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$比较。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入你的$S^\circ_\mathrm{m}$。）
::: solution
转动：$S^\mathrm{R}_\mathrm{m} = U^\mathrm{R}_\mathrm{m}/T + R\ln q^\mathrm{R} = R(1 + \ln 19.90) = 8.3145\times(1 + 2.9907) = 33.18\ \mathrm{J\,K^{-1}\,mol^{-1}}$。（严格地说，由精确求和的$U^\mathrm{R}_\mathrm{m} = RT^{2}\,\mathrm{d}\ln q^\mathrm{R}/\mathrm{d}T$在此温度下为$0.983RT$，因为$q^\mathrm{R} \approx T/\theta_\mathrm{R} + \tfrac{1}{3}$的增长略慢于$T$；用它得$S^\mathrm{R}_\mathrm{m} = 33.04$。）振动：$x = 4303/298.15 = 14.43$，故$S^\mathrm{V}_\mathrm{m} \approx R(x + 1)e^{-x} = 8.3145\times15.43\times5.4\times10^{-7} = 7\times10^{-5}\ \mathrm{J\,K^{-1}\,mol^{-1}}$，可忽略。电子：基态$^{1}\Sigma^{+}$非简并。总计，
$$
S^\circ_\mathrm{m} = 153.7 + 33.0 + 0.0 = 186.7\ \mathrm{J\,K^{-1}\,mol^{-1}}
$$
用精确转动能量（或用$U^\mathrm{R}_\mathrm{m} = RT$则得$186.9$）——与表值$186.9$相差在$0.1\,\%$以内。微小剩余来自非刚性转子与同位素（$\mathrm{H^{37}Cl}$）贡献。
:::
:::
