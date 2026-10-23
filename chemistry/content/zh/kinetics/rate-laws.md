普通化学已经给了你动力学的词汇——速率、速率方程、三个积分速率方程、半衰期——并初步展示了速率如何测量（[[general-chemistry-2/rates-intro]]）。本章要做的，正是一门物理化学课程应当对这些词汇做的事：把它们拆开来看。速率方程从来不是被*看见*的，只能被推断，而推断要经过一串操作——一个物理信号变成浓度，一条浓度–时间记录变成级数，一个级数加一个浓度变成速率常数——这条链的每一环都有自己的假设和特有的失效方式。我们将用真实的仪器在时间中追踪反应，谨慎地把信号换算成浓度，把积分速率方程作为真正的定理而不是抄录的表格来推导，把半衰期当作测量级数的标尺，求解可逆一级问题使平衡常数从两个速率常数中浮现，最后诚实地审视：教科书的直线图为什么比看上去更不牢靠。

## 在时间中追踪反应

每个动力学实验都是一次翻译：某个你能测的东西——颜色、压力、旋光、电导——替你看不见的那个浓度说话。

::: definition 动力学曲线与工作曲线 {#def-kinetic-trace}
**动力学曲线**是反应混合物某个物理性质 $Q(t)$ 随时间的记录，测量条件须保证 $Q$ 的变化只源于组成的变化（恒容、恒温、无混合伪影）。**工作曲线**（校准曲线）是用已知组成的标准混合液独立测定的 $Q$ 与浓度的关系——理想情形是线性的 $Q = \alpha + \beta\,[\mathrm{X}]$。追踪反应的方法若直接测量反应物或产物本身（取出等份做化学分析、对某种离子有选择性的电极）则称为*直接*法；若测量与组成相关的性质（吸光度、压力、旋光度）则称为*间接*法。
:::

普遍的要求有这几条。探针必须比反应快（天平的读数对毫秒级过程毫无用处）；它不得扰动被测量（把样品煮开的温度计、迟一步才终止反应的取样移液管都不行）；性质必须对各物种具有可加性，混合液的信号才能分解为各物种的贡献。

溶液动力学的主力仪器是**分光光度计**。若只有一个物种在所选波长处吸收，记录到的**吸光度**就与其浓度成正比：

::: proposition 朗伯-比尔定律 {#prop-beer-lambert}
强度为 $I_0$ 的单色光束穿过光程为 $l$、吸收物浓度为 $c$ 的均匀溶液后，出射强度为 $I$，**吸光度**为
$$
A = \log_{10}\frac{I_0}{I} = \varepsilon\, l\, c,
$$
其中 $\varepsilon$ 是吸收物在该波长处的**摩尔吸收系数**，当 $l$ 以 $\mathrm{cm}$ 计时的数据表单位为 $\mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$。该定律对吸收分子彼此独立作用的稀溶液（通常 $A \lesssim 1$）成立，且吸光度具有**可加性**：混合液给出 $A = \sum_i \varepsilon_i l c_i$，两条光谱曲线就是这样分解成两个浓度的。
:::

::: example 从吸光度到浓度再到速率 {#ex-beer-lambert}
某无色反应物生成黄色产物，产物是 $\mathrm{430\,nm}$ 处唯一的吸收者。产物标准溶液给出 $\varepsilon l = 2.00\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}}$（所用比色皿光程 $1.00\ \mathrm{cm}$）。某次实验中 $t = 0$ 时 $A = 0.800$（空白读数，即已有少量产物生成），$t = 100.0\ \mathrm{s}$ 时 $A = 0.560$。求产物的浓度及这段时间内的平均生成速率。
::: solution
用把 $l$ 折进校准乘积 $\varepsilon l$ 的朗伯-比尔定律：
$$
[\mathrm{P}]_0 = \frac{0.800}{2.00\times10^{3}} = 4.00\times10^{-4}\ \mathrm{mol\,dm^{-3}},
\qquad
[\mathrm{P}] = \frac{0.560}{2.00\times10^{3}} = 2.80\times10^{-4}\ \mathrm{mol\,dm^{-3}}.
$$
吸光度在*下降*，所以尽管按"产物"来校准，这个吸收物种实际上在被消耗——一个好习惯是核对 $\mathrm{d}A/\mathrm{d}t$ 的正负号与化学是否相符。把它当作反应物，$100.0\ \mathrm{s}$ 内的平均消耗速率为
$$
\bar{v} = \frac{(4.00 - 2.80)\times10^{-4}}{100.0} = 1.20\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
$A$ 给出三位有效数字，故结果保留三位是合理的；由于速率随浓度下降而减小，*初始*速率会比这个平均值大。
:::
:::

::: warning 朗伯-比尔定律只适用于稀的理想溶液 {#warn-beer}
在高吸光度下（$A \gtrsim 1$，即透过光不足十分之一），线性失效：未被吸收波长的杂散光到达检测器，且近到足以相互作用的分子不再独立吸收。一次"动力学"测量若偏离线性响应，就会把一级直线曲线弯成曲线，交给你一个错误的 $k$。用覆盖整个浓度范围的标准溶液检验线性，$A > 1$ 时先稀释；还要记住其他陷阱：*产物*也吸收、气泡或浑浊散射光、反应太快以致曲线记录的主要是仪器的响应函数。
:::

还有四种经典换能器值得一提。**电导法**追踪任何改变离子数目或种类的反应：酯的皂化中，迁移快的 $\mathrm{OH^-}$ 被迁移慢的 $\mathrm{CH_3COO^-}$ 取代，中等浓度下电导随反应进度大致线性下降。**压力法**在恒容恒温下追踪气相反应中气体分子数的变化：总压正比于总物质的量，于是一个压力传感器就记录了进度（[[#ex-manometry]] 中就要用它）。**旋光法**靠手性物种对平面偏振光旋转角 $\alpha = [\alpha]\,l\,c$ 来追踪它们：蔗糖转化是教科书级的例子，它的妙处在于只需测量差值 $\alpha_t - \alpha_\infty$，完全不必知道绝对浓度。**淬灭与化学取样**——博登斯坦本人的方法——是在已知时刻取出已知体积的反应液，终止反应（稀释、冷却或快速化学捕获），再行分析；慢反应和没有合适物理信号的反应至今仍用此法研究。

当反应很快时，混合时间就是实验本身。在**流动法**中，两股反应液在混合室相遇，混合液流过检测器：沿管的位置*就是*反应时间。**停流法**变体在约一毫秒内混合几 $\mathrm{cm^3}$，然后观察静止的观察池——死时间 $1\text{–}5\ \mathrm{ms}$，足以覆盖大量的溶液化学。再往下是**弛豫方法**：一个小扰动（温度跃变、压力跃变或电场跃变）把平衡混合物从平衡位置推开百分之几，随后它的返回——一次*弛豫*——用分光光度法追踪。因为扰动小、混合物本来就包含一切，弛豫方法可深入微秒乃至更短，是研究快速平衡的天然手段；在 [[#prop-reversible]] 中我们将确切看到一个弛豫实验测量的是什么。

::: history
测量快反应的实验技艺在很大程度上是三种装置的故事。博登斯坦（Bodenstein）从 1880 年代起建立了淬灭分析与压力法，绘出了氢-碘体系和酯类反应的图景，并于 1913 年引入稳态思想。停流法由钱斯（Chance）于 1951 年为酶动力学创造，并经古特弗罗因德（Gutfreund）与斯特特文特（Sturtevant）使之常规化，为生物化学打开了毫秒世界。1953 年艾根（Eigen）引入温度跃变弛豫方法——用电容器组在微秒内对几 $\mathrm{cm^3}$ 溶液放电加热——并由此测出接近扩散极限的质子转移速率；他与人共享 1967 年诺贝尔化学奖，另两位是诺里什（Norrish）与波特（Porter），他们的闪光光解从光化学一侧覆盖了同一片前沿。
:::

::: example 压力法：用总压测 $\mathrm{N_2O_5}$ {#ex-manometry}
气相 $\mathrm{N_2O_5}$ 按 $2\,\mathrm{N_2O_5(g)} \rightarrow 4\,\mathrm{NO_2(g)} + \mathrm{O_2(g)}$ 分解。$\mathrm{25\,^\circ C}$ 下，容器充入纯 $\mathrm{N_2O_5}$ 至 $p_0 = 40.0\ \mathrm{kPa}$；$t = 2.00\times10^{4}\ \mathrm{s}$ 后总压为 $p = 69.6\ \mathrm{kPa}$；完全分解并冷却回原温度后为 $p_\infty = 100.0\ \mathrm{kPa}$。假设为一级动力学，求 $k$。
::: solution
按每摩尔 $\mathrm{N_2O_5}$ 计：$\mathrm{N_2O_5} \rightarrow 2\,\mathrm{NO_2} + \tfrac{1}{2}\,\mathrm{O_2}$，所以反应掉 $x$（以压力单位计）的 $\mathrm{N_2O_5}$ 使总压增加 $\tfrac{3}{2}x$：
$$
p = p_0 + \tfrac{3}{2}x
\qquad\Longrightarrow\qquad
p_{\mathrm{N_2O_5}} = p_0 - x = p_0 - \tfrac{2}{3}\left(p - p_0\right) = \tfrac{1}{3}\left(5p_0 - 2p\right).
$$
完全分解给出 $p_\infty = \tfrac{5}{2}p_0$，即 $5p_0 = 2p_\infty$，于是任一时刻反应物的分压为 $p_{\mathrm{N_2O_5}} = \tfrac{2}{3}(p_\infty - p)$：*剩余的*反应物由*尚未到来的*压力增量读出。对 $p_{\mathrm{N_2O_5}}$ 取一级（恒温下分压正比于浓度）得
$$
k = \frac{1}{t}\ln\frac{p_0}{p_{\mathrm{N_2O_5}}}
= \frac{1}{t}\ln\frac{3p_\infty}{5\left(p_\infty - p\right)}
= \frac{1}{2.00\times10^{4}}\ln\frac{3 \times 100.0}{5 \times 30.4}
= \frac{0.680}{2.00\times10^{4}} = 3.4\times10^{-5}\ \mathrm{s^{-1}},
$$
与气相数据表值吻合。在此温度下做真实实验时，$\mathrm{NO_2}$ 会部分二聚为 $\mathrm{N_2O_4}$，压力模型必须对该平衡作修正——这恰好说明一条普遍规则：误差住在测量的*化学*里，而不在算术里。
:::
:::

## 初始速率法，细致地

::: proposition 初始速率法 {#prop-initial-rates}
设速率方程在反应初期具有幂律形式 $v = k[\mathrm{A}]^{m}[\mathrm{B}]^{n}\cdots$。对一系列只改变初始浓度的实验测定初始速率 $v_0$——动力学曲线外推到 $t = 0$ 的斜率。对两次只差 $[\mathrm{A}]$ 的实验，
$$
\frac{v_0'}{v_0} = \left(\frac{[\mathrm{A}]'}{[\mathrm{A}]}\right)^{m}
\qquad\Longleftrightarrow\qquad
m = \frac{\ln\!\left(v_0'/v_0\right)}{\ln\!\left([\mathrm{A}]'/[\mathrm{A}]\right)},
$$
其余浓度保持不变；同时改变两个浓度的实验则给出相应级数之*和*。回代即由任何一次实验得到 $k$，$k$ 的单位按总级数 $o$ 取 $\mathrm{mol^{1-o}\,dm^{3(o-1)}\,s^{-1}}$。
:::

为什么是*初始*速率？因为在 $t = 0$ 时浓度正是你配制的浓度；没有产物积累去驱动逆反应或去抑制、催化；没有中间体积累；带自己级数的副反应也还没来得及贡献。代价是你只在一个组成处测量定律，而速率方程可以随组成改变——所以初始速率级数是*局域*级数，作为第一陈述极佳，却不是全部故事。外推本身值得讲究：把曲线早期的点拟合为低阶多项式并取 $t = 0$ 处的斜率，而不是凭眼睛画切线。

::: example 两个浓度同时改变的初始速率 {#ex-initial-no-o2}
$\mathrm{25\,^\circ C}$ 下对 $2\,\mathrm{NO(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO_2(g)}$ 测得初始速率如下：

| 实验 | $[\mathrm{NO}]/\mathrm{mol\,dm^{-3}}$ | $[\mathrm{O_2}]/\mathrm{mol\,dm^{-3}}$ | $v_0\ /\mathrm{mol\,dm^{-3}\,s^{-1}}$ |
|---|---|---|---|
| 1 | 0.010 | 0.010 | $7.0\times10^{-3}$ |
| 2 | 0.020 | 0.010 | $2.8\times10^{-2}$ |
| 3 | 0.010 | 0.020 | $1.4\times10^{-2}$ |
| 4 | 0.030 | 0.030 | $0.189$ |

确定各级数、总级数与 $k$。
::: solution
实验 1→2 只改变 $[\mathrm{NO}]$：$m = \ln(2.8\times10^{-2}/7.0\times10^{-3})/\ln(0.020/0.010) = \ln 4/\ln 2 = 2$。实验 1→3 只改变 $[\mathrm{O_2}]$：$n = \ln 2/\ln 2 = 1$。实验 1→4 把两者*都*变为三倍，故它给出的是级数之和：$v_{0,4}/v_{0,1} = 0.189/0.0070 = 27 = 3^{m+n}$，所以 $m + n = 3$——与 $2 + 1$ 一致；初始速率表能直接测总级数，说的就是这个意思。再由实验 1，
$$
k = \frac{v_0}{[\mathrm{NO}]^2[\mathrm{O_2}]} = \frac{7.0\times10^{-3}}{(0.010)^{2}(0.010)} = 7.0\times10^{3}\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}},
$$
实验 2–4 都复现它：$2.8\times10^{-2}/\big((0.020)^2 \times 0.010\big) = 7.0\times10^{3}$，且 $0.189/\big((0.030)^2 \times 0.030\big) = 7.0\times10^{3}$。这个圆是否闭合——每次实验给出同一个 $k$——才是幂律形式与级数正确性的真正检验；四次实验相符是弱证据，十几次相符才是强证据。
:::
:::

## 分离法与拟级

::: algorithm 分离法 {#alg-isolation}
把多试剂速率方程化为单试剂问题：**（1）**选定你要研究级数的反应物，记作 $\mathrm{A}$。**（2）**让其余每种试剂都*大量过量*——通常十倍到百倍——使得 $[\mathrm{A}]$ 跑完全程时它们的浓度至多变化百分之几，实际上恒定。**（3）**速率方程坍缩为 $v = k_{\text{obs}}[\mathrm{A}]^{m}$，其中 $k_{\text{obs}} = k[\mathrm{B}]_0^{n}\cdots$，这是一个**拟 $m$ 级**方程；用任何单试剂方法求 $m$ 与 $k_{\text{obs}}$。**（4）**在第二个过量水平上重复：由于 $k_{\text{obs}} \propto [\mathrm{B}]_0^{n}$，
$$
n = \frac{\ln\!\big(k_{\text{obs}}'/k_{\text{obs}}\big)}{\ln\!\big([\mathrm{B}]_0'/[\mathrm{B}]_0\big)},
$$
回代一次即恢复真正的 $k$。**（5）**对每种试剂重复。
:::

拟级不是反应的属性，而是*你的实验*的属性：同一个反应在化学计量配比下是二级，在过量下就是拟一级。这不是缺陷——这正是它的用处——但意味着来自不同过量水平的 $k_{\text{obs}}$ 绝不可不经第（4）步的修正就直接比较。

::: example 蔗糖转化：旋光法与一个被藏起来的催化剂 {#ex-sucrose}
酸催化转化 $\mathrm{C_{12}H_{22}O_{11} + H_2O \rightarrow C_6H_{12}O_6\ (glucose) + C_6H_{12}O_6\ (fructose)}$ 在 $\mathrm{25\,^\circ C}$ 的 $\mathrm{1.0\ mol\,dm^{-3}}$ 盐酸中用旋光法追踪。此类实验给出的代表性数据：$\alpha_0 = +26.0^{\circ}$，$\alpha_{\infty} = -8.0^{\circ}$，$100.0\ \mathrm{min}$ 后 $\alpha = +3.32^{\circ}$。求 $k_{\text{obs}}$ 与半衰期，并解释为什么酸的浓度加倍时 $k_{\text{obs}}$ 加倍、而对蔗糖的级数仍是一级。
::: solution
水是溶剂（$\approx 55\ \mathrm{mol\,dm^{-3}}$），$\mathrm{H^+}$ 是催化剂，两者都恒定，故方程对蔗糖为拟一级。旋光度与浓度成正比，且右旋的反应物与左旋的产物混合物符号相反，所以 $\alpha_t - \alpha_\infty \propto [\text{sucrose}]_t$，
$$
k_{\text{obs}} = \frac{1}{t}\ln\frac{\alpha_0 - \alpha_\infty}{\alpha_t - \alpha_\infty}
= \frac{1}{100.0}\ln\frac{26.0 - (-8.0)}{3.32 - (-8.0)}
= \frac{1}{100.0}\ln\frac{34.0}{11.32} = 1.10\times10^{-2}\ \mathrm{min^{-1}},
$$
$t_{1/2} = \ln 2 / k_{\text{obs}} = 63.0\ \mathrm{min}$。注意整个计算只用了旋光度的*差值*——不需要绝对校准、光程或浓度。酸依赖关系表明拟一级的面具下藏着一个真实的项：真实方程是 $v = k_{\mathrm{H}}[\text{sucrose}][\mathrm{H^+}]$，$k_{\text{obs}} = k_{\mathrm{H}}[\mathrm{H^+}]$，所以 $k_{\text{obs}}$ 随酸加倍，而*对蔗糖*的级数——旋光仪真正看到的那个——纹丝不动。
:::
:::

## 积分速率方程的推导

普通化学抄录了积分速率方程；这里我们证明它们。以下恒有：恒容下 $\mathrm{A} \rightarrow$ 产物，$-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$，逆反应可忽略，且为单反应物或拟级条件。

::: proposition 积分速率方程 {#prop-integrated}
$t = 0$ 时浓度为 $[\mathrm{A}]_0$：

| 级数 $o$ | $[\mathrm{A}](t)$ | 直线图 | 斜率 | 半衰期 |
|---|---|---|---|---|
| 0 | $[\mathrm{A}]_0 - kt$ | $[\mathrm{A}]$ 对 $t$ | $-k$ | $[\mathrm{A}]_0/2k$ |
| 1 | $[\mathrm{A}]_0\,e^{-kt}$ | $\ln[\mathrm{A}]$ 对 $t$ | $-k$ | $(\ln 2)/k$ |
| 2 | $[\mathrm{A}]_0/\left(1 + kt[\mathrm{A}]_0\right)$ | $1/[\mathrm{A}]$ 对 $t$ | $+k$ | $1/\left(k[\mathrm{A}]_0\right)$ |

$k$ 的单位依次为 $\mathrm{mol\,dm^{-3}\,s^{-1}}$（零级）、$\mathrm{s^{-1}}$（一级）、$\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（二级）；只有一级半衰期与 $[\mathrm{A}]_0$ 无关。
:::

::: proof 零级方程 {#proof-zero}
$-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k$ 说的是斜率恒定，积分一次即得
$$
[\mathrm{A}] = [\mathrm{A}]_0 - kt,
$$
一条直线，并在*有限*时间 $t = [\mathrm{A}]_0/k$ 处降到零——此后速率方程本身不再适用，因为浓度不能为负。令 $[\mathrm{A}] = [\mathrm{A}]_0/2$ 得 $t_{1/2} = [\mathrm{A}]_0/2k$：起始浓度加倍，半衰期也加倍；反应在每一个后续"半程"上花的时间按比例变长。对某反应物呈零级是*饱和*的标志：催化剂表面或酶已被占满，或者光化学步骤的速率由光子通量决定而根本不依赖 $[\mathrm{A}]$。此时速率对剩余反应物有多少一无所知——而这正是斜率恒定的含义。
:::

::: proof 二级方程与浓度不等的情形 {#proof-second}
对 $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^2$，分离变量——所有含 $\mathrm{A}$ 的项移到一边，所有含 $t$ 的移到另一边——并从 $t = 0$ 时的 $[\mathrm{A}]_0$ 积分到时刻 $t$ 的 $[\mathrm{A}]$：
$$
\int_{[\mathrm{A}]_0}^{[\mathrm{A}]} -\frac{\mathrm{d}[\mathrm{A}]}{[\mathrm{A}]^2} = \int_0^t k\,\mathrm{d}t
\qquad\Longrightarrow\qquad
\frac{1}{[\mathrm{A}]} - \frac{1}{[\mathrm{A}]_0} = kt,
$$
因为 $\int \mathrm{d}x/x^{2} = -1/x$。于是 $[\mathrm{A}] = [\mathrm{A}]_0/(1 + kt[\mathrm{A}]_0)$，再令 $[\mathrm{A}] = [\mathrm{A}]_0/2$ 得 $t_{1/2} = 1/\left(k[\mathrm{A}]_0\right)$：每个后续半衰期都*加倍*，因为浓度减半使速率变为四分之一。倒数图 $1/[\mathrm{A}]$ 对 $t$ 是一条截距为 $1/[\mathrm{A}]_0$、斜率为 $+k$ 的直线，即二级反应的签名。

对真正的双反应物情形 $\mathrm{A} + \mathrm{B} \rightarrow$ 产物，$v = k[\mathrm{A}][\mathrm{B}]$ 且初始浓度*不等*：$[\mathrm{A}]_0 = a$，$[\mathrm{B}]_0 = b$。记已反应量为 $x$：$[\mathrm{A}] = a - x$，$[\mathrm{B}] = b - x$，则
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = k(a-x)(b-x)
\qquad\Longrightarrow\qquad
\int_0^x \frac{\mathrm{d}x}{(a-x)(b-x)} = kt.
$$
部分分式 $\dfrac{1}{(a-x)(b-x)} = \dfrac{1}{a-b}\left(\dfrac{1}{b-x} - \dfrac{1}{a-x}\right)$ 积分得
$$
kt = \frac{1}{a-b}\ln\frac{b\,(a-x)}{a\,(b-x)} = \frac{1}{[\mathrm{B}]_0 - [\mathrm{A}]_0}\ln\frac{[\mathrm{B}]_0[\mathrm{A}]}{[\mathrm{A}]_0[\mathrm{B}]}.
$$
（对右端求导验证：链式法则恰好返回 $1\big/\left[(a-x)(b-x)\right]$，且该式在 $x = 0$ 处为零。）$\ln\!\big([\mathrm{A}]/[\mathrm{B}]\big)$ 对 $t$ 的图是斜率为 $(a - b)k$ 的直线——二级反应直线图的对应物。令 $b \rightarrow a$（一次洛必达法则的练习）把公式坍缩为 $1/[\mathrm{A}] - 1/[\mathrm{A}]_0 = kt$，正如它应当做的那样。
:::

::: example 酯的皂化：等浓度与不等浓度 {#ex-saponification}
乙酸乙酯在碱性溶液中水解，$\mathrm{CH_3COOC_2H_5 + OH^- \rightarrow CH_3COO^- + C_2H_5OH}$，$\mathrm{25\,^\circ C}$ 下 $k = 0.11\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（标准数据表值）。(a) 等体积的 $0.020\ \mathrm{mol\,dm^{-3}}$ 酯与 $0.020\ \mathrm{mol\,dm^{-3}}$ 氢氧化物混合：反应达 $75\,\%$ 需要多久？(b) 若改为混合后氢氧化物为 $0.200\ \mathrm{mol\,dm^{-3}}$、酯为 $0.020\ \mathrm{mol\,dm^{-3}}$，酯看到的 $k_{\text{obs}}$ 与半衰期各是多少？
::: solution
(a) 等体积混合使两者浓度减半，故混合后 $[\mathrm{A}]_0 = [\mathrm{B}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$，而 $1:1$ 反应从等量出发使 $[\mathrm{A}] = [\mathrm{B}]$ 始终成立：单反应物二级方程适用。$75\,\%$ 反应后 $[\mathrm{A}] = 0.0025\ \mathrm{mol\,dm^{-3}}$，于是
$$
t = \frac{1}{k}\left(\frac{1}{[\mathrm{A}]} - \frac{1}{[\mathrm{A}]_0}\right)
= \frac{1}{0.11}\left(\frac{1}{0.0025} - \frac{1}{0.010}\right)
= \frac{400 - 100}{0.11} = 2.7\times10^{3}\ \mathrm{s} \approx 45\ \mathrm{min}.
$$
(b) 氢氧化物为酯的二十倍，酯完全反应时它只从 $0.200$ 降到 $0.1975\ \mathrm{mol\,dm^{-3}}$（变化 $1.25\,\%$），故 $[\mathrm{OH^-}]$ 恒定，酯服从拟一级动力学，
$$
k_{\text{obs}} = k[\mathrm{OH^-}]_0 = 0.11 \times 0.200 = 2.2\times10^{-2}\ \mathrm{s^{-1}},
\qquad
t_{1/2} = \frac{\ln 2}{k_{\text{obs}}} = 32\ \mathrm{s}.
$$
两种情形都可用电导法追踪而无需取样：电导在 (a) 中直接跟踪 $\mathrm{OH^-}$，在 (b) 中则是一条形同背景的水平线——你透过一个与产物无关的世界观察酯。
:::
:::

::: widget odesolver
f: -0.5*y^2
y0: 1
t: 0, 10
exact: 1/(1 + 0.5*t)
h: 0.1
caption: 二级衰减 $y' = -k y^2$，$k = 0.5$，$y(0) = 1$，用欧拉法、休恩法与 RK4 数值积分并与精确解 $y = 1/(1+0.5t)$ 对比。图背后的几何事实：高度 $y$ 处的斜率正比于 $y^2$，所以曲线开头陡、随后爬行——二级反应的尾巴很长，而 $1/y$ 完美线性增长。观察整体误差栏随方法阶数升高而缩小：动力学数据通常正是用这些积分器反向拟合的——调整 $k$ 直到计算曲线与实验曲线吻合。
:::

## 半衰期与分数寿命法

半衰期不只是给一级速率找个说法——半衰期*如何变化*本身就是一台级数探测器。

::: proposition 分数寿命法 {#prop-fractional-life}
对 $v = k[\mathrm{A}]^{o}$，$[\mathrm{A}]$ 降到起始值分数 $f$ 所需的时间 $t_{1/f}$，当 $o \ne 1$ 时为
$$
t_{1/f} = \frac{f^{\,1-o} - 1}{(o-1)\,k\,[\mathrm{A}]_0^{\,o-1}}
\qquad\Longrightarrow\qquad
t_{1/2} \propto [\mathrm{A}]_0^{\,1-o},
$$
而 $o = 1$ 时 $t_{1/f} = \ln(1/f)/k$，与 $[\mathrm{A}]_0$ 无关。两个推论。**（1）**在不同 $[\mathrm{A}]_0$ 的实验之间，$[\mathrm{A}]_0$ 加倍时半衰期不变、减半或加倍，分别标志一级、二级、零级。**（2）**在同一次实验内，分数寿命之比是级数的指纹：
$$
\frac{t_{1/4}}{t_{1/2}} =
\begin{cases}
1.5 & o = 0\\
2 & o = 1\\
3 & o = 2
\end{cases}
$$
因为 $t_{1/4}$ 是降到 $[\mathrm{A}]_0/4$ 的时间，而不是"两倍的 $t_{1/2}$"——那条捷径只属于一级。
:::

::: example 由两个分数寿命定级数 {#ex-fractional-life}
某反应从 $[\mathrm{A}]_0 = 0.050\ \mathrm{mol\,dm^{-3}}$ 出发，$40\ \mathrm{s}$ 完成 $50\,\%$，$120\ \mathrm{s}$ 完成 $75\,\%$。求级数与 $k$。
::: solution
$t_{1/4}/t_{1/2} = 120/40 = 3.0$：二级的指纹。对照其他可能——一级应为 $80\ \mathrm{s}$，零级应为 $60\ \mathrm{s}$。二级还预言相继半衰期为 $40$、$80$、$160\ \mathrm{s}$，故 $87.5\,\%$ 完成应出现在 $280\ \mathrm{s}$——这是一个可以再做来验证的测量。由 $t_{1/2} = 1/(k[\mathrm{A}]_0)$，
$$
k = \frac{1}{t_{1/2}\,[\mathrm{A}]_0} = \frac{1}{40 \times 0.050} = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
分数寿命法对上一节的线性化陷阱免疫，也不受信号绝对校准误差的影响，因为它只用曲线越过固定分数处的*时刻*——前提是信号确实正比于 $[\mathrm{A}]$ 且 $[\mathrm{A}]_0$ 已知。
:::
:::

## 可逆反应：向平衡的弛豫

到此为止逆反应都可忽略。而在平衡附近，逆反应就是一切，最简单的情形可以精确求解。

::: proposition 一级趋近平衡 {#prop-reversible}
对 $\mathrm{A \underset{k_\mathrm{r}}{\overset{k_\mathrm{f}}{\rightleftharpoons}} C}$，两步均为一级，$[\mathrm{C}]_0 = 0$ 且总量 $[\mathrm{A}] + [\mathrm{C}] = [\mathrm{A}]_0$：
$$
[\mathrm{A}](t) = [\mathrm{A}]_\mathrm{eq} + \left([\mathrm{A}]_0 - [\mathrm{A}]_\mathrm{eq}\right)e^{-t/\tau},
\qquad
\tau = \frac{1}{k_\mathrm{f} + k_\mathrm{r}},
\qquad
[\mathrm{A}]_\mathrm{eq} = \frac{k_\mathrm{r}}{k_\mathrm{f} + k_\mathrm{r}}[\mathrm{A}]_0,
$$
体系以*单个*指数弛豫到平衡，弛豫时间 $\tau$ 是两个速率常数之**和**的倒数，而平衡常数是它们的**比**，
$$
K_\mathrm{c} = \frac{[\mathrm{C}]_\mathrm{eq}}{[\mathrm{A}]_\mathrm{eq}} = \frac{k_\mathrm{f}}{k_\mathrm{r}}.
$$
:::

::: proof 弛豫时间与 $K = k_\mathrm{f}/k_\mathrm{r}$ {#proof-reversible}
净速率为 $\mathrm{d}[\mathrm{A}]/\mathrm{d}t = -k_\mathrm{f}[\mathrm{A}] + k_\mathrm{r}[\mathrm{C}]$。代入 $[\mathrm{C}] = [\mathrm{A}]_0 - [\mathrm{A}]$：
$$
\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} = -\left(k_\mathrm{f} + k_\mathrm{r}\right)[\mathrm{A}] + k_\mathrm{r}[\mathrm{A}]_0.
$$
平衡时导数为零，故 $[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{A}]_0/(k_\mathrm{f} + k_\mathrm{r})$。现在把 $[\mathrm{A}]$ 从平衡值量起：令 $y = [\mathrm{A}] - [\mathrm{A}]_\mathrm{eq}$；由于 $\mathrm{d}y/\mathrm{d}t = \mathrm{d}[\mathrm{A}]/\mathrm{d}t$，
$$
\frac{\mathrm{d}y}{\mathrm{d}t} = -\left(k_\mathrm{f} + k_\mathrm{r}\right)y,
$$
因为常数项恰好与 $k_\mathrm{r}[\mathrm{A}]_0$ 相消。这又是一级方程，所以 $y = y_0\,e^{-(k_\mathrm{f}+k_\mathrm{r})t}$：*偏离平衡的量*按指数衰减，$\tau = 1/(k_\mathrm{f}+k_\mathrm{r})$——尽管浓度本身并不趋于零。最后，平衡时正、逆*速率*相等，$k_\mathrm{f}[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{C}]_\mathrm{eq}$，整理即得 $K_\mathrm{c} = [\mathrm{C}]_\mathrm{eq}/[\mathrm{A}]_\mathrm{eq} = k_\mathrm{f}/k_\mathrm{r}$。平衡常数不是第三次测量——它是两个速率常数之比；一次给出 $\tau$ 的弛豫实验加上分析测得的 $K_\mathrm{c}$，就同时给出 $k_\mathrm{f}$ 与 $k_\mathrm{r}$ 两个常数。
:::

::: example 一次弛豫实验的数字 {#ex-reversible}
对 $\mathrm{A \rightleftharpoons C}$，$\mathrm{25\,^\circ C}$ 下的温度跃变实验给出 $\tau = 133\ \mathrm{s}$，且平衡混合物中 $\mathrm{A}$ 的量只有起始时的三分之一。求 $k_\mathrm{f}$、$k_\mathrm{r}$ 与 $K_\mathrm{c}$，以及 $[\mathrm{A}]$ 从 $[\mathrm{A}]_0$ 降到 $0.40\,[\mathrm{A}]_0$ 所需的时间。
::: solution
$[\mathrm{A}]_\mathrm{eq} = [\mathrm{A}]_0/3$ 认出 $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r}) = 1/3$，即 $k_\mathrm{f} = 2k_\mathrm{r}$；又 $\tau^{-1} = k_\mathrm{f} + k_\mathrm{r} = 1/133 = 7.5\times10^{-3}\ \mathrm{s^{-1}}$，
$$
k_\mathrm{r} = 2.5\times10^{-3}\ \mathrm{s^{-1}},
\qquad
k_\mathrm{f} = 5.0\times10^{-3}\ \mathrm{s^{-1}},
\qquad
K_\mathrm{c} = \frac{k_\mathrm{f}}{k_\mathrm{r}} = 2.0 .
$$
求时间则解 $[\mathrm{A}]/[\mathrm{A}]_0 = \tfrac{1}{3} + \tfrac{2}{3}e^{-t/\tau} = 0.40$，得 $e^{-t/\tau} = 0.10$，故
$$
t = \tau\ln 10 = 133 \times 2.303 = 3.1\times10^{2}\ \mathrm{s}.
$$
注意可逆方程造成的不对称：$[\mathrm{A}]$ 先降得快，随后*停在* $[\mathrm{A}]_\mathrm{eq}$ 上——无论怎么作图，任何不可逆型的积分定律都不会给出直线。弛豫永不"结束"；$5\tau$ 之后它已在平衡的 $1\,\%$ 以内——弛豫能算"结束"也就到此为止。
:::
:::

::: widget plot
f: (kr + kf*exp(-(kf + kr)*x/1000))/(kf + kr); (kf - kf*exp(-(kf + kr)*x/1000))/(kf + kr)
x: 0, 1500
y: 0, 1.05
sliders: kf=5:1:10:0.5; kr=2.5:0.5:8:0.5
labels: \text{A}: [\mathrm{A}]/[\mathrm{A}]_0; \text{C}: [\mathrm{C}]/[\mathrm{A}]_0
caption: 从纯 $\mathrm{A}$ 出发对 $\mathrm{A \rightleftharpoons C}$ 的趋近平衡过程：$t$ 以秒计，$k_\mathrm{f}$ 与 $k_\mathrm{r}$ 以 $\mathrm{s^{-1}}$（均 $\times 10^{-3}$）由滑块设定。$\mathrm{A}$ 曲线的平台是 $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r})$，到达平台的快慢由 $k_\mathrm{f}+k_\mathrm{r}$ 决定——两个独立的事实，所以一条弛豫曲线加上平衡组成就能定出两个常数。把 $k_\mathrm{r}$ 调大：平台升高*并且*趋近变快；平衡不是变化的缺席，而是变化所能达到的最快平衡。
:::

::: widget newton
f: 1/3 + 2*exp(-0.0075*x)/3 - 0.4
x0: 300
x: 0, 1500
caption: 牛顿法求上面例题中 $[\mathrm{A}] = 0.40\,[\mathrm{A}]_0$ 的时刻（$k_\mathrm{f}+k_\mathrm{r} = 7.5\times10^{-3}\ \mathrm{s^{-1}}$）：根为 $t = 307\ \mathrm{s}$。这里的方程还能手工反解，但真实的弛豫曲线是几个指数之和（机理的每个独立弛豫模式各有自己的 $\tau$），那时这类方程根本没有封闭解——用牛顿法或二分法求根不是奢侈品，而是从数据提取常数的标准做法。
:::

## 线性化数据的陷阱

教科书的配方——把 $[\mathrm{A}]$、$\ln[\mathrm{A}]$、$1/[\mathrm{A}]$ 分别对 $t$ 作图，留下最直的那条——之所以被教授，是因为它简单；这里对它表示不信任，是因为它软弱。

::: warning 直线是弱证据 {#warn-linearise}
三个理由，按微妙程度递增。**（1）**在两三倍半衰期的范围内、带着百分之几的噪声，一级与二级曲线在三种图中几乎无法区分；"凭眼睛最直"什么也分辨不了。**（2）**每次变换都重新加权误差：取 $\ln[\mathrm{A}]$ 会放大小浓度的相对误差，于是对数图的拟合被最后几个噪声点主导，其"最佳 $k$"并不是对数据最佳的 $k$；对变换后的数据做最小二乘，估计的是错误的误差模型。在三种图之间比较相关系数毫无意义，因为每个相关系数都是*另一个*变量与 $t$ 的相关。**（3）**错误的机理也能产生直线——速率常数的分布或一条慢副反应，会把曲线弯成恰好模仿级数改变的方向。站得住的现代做法：用恰当的误差模型对*未变换*的曲线直接做非线性最小二乘拟合，并用不依赖线性化的方法确认级数——分数寿命法（[[#prop-fractional-life]]）、微分法（$\ln v$ 对 $\ln[\mathrm{A}]$ 作图，斜率即级数，因为 $\ln v = \ln k + o\ln[\mathrm{A}]$），或跨实验的半衰期标度律。
:::

::: quiz
两名学生用 $2\,\%$ 噪声的同一条衰减曲线分析 $0\text{–}90\,\%$ 反应区间：一人作 $\ln[\mathrm{A}]$ 对 $t$ 图，另一人作 $1/[\mathrm{A}]$ 对 $t$ 图，*两人*都看到目视很直的线且 $R^2 > 0.99$。能得出什么结论？
- [x] 几乎什么也得不出：在有限区间加噪声时，不同的积分定律几乎不可区分，且每种变换都藏着自己的误差畸变——数据必须用直接拟合或分数寿命来检验。
- [ ] 反应同时是一级又是二级。
- [ ] $R^2$ 较高的那位学生证明了级数，因为 $R^2$ 在同等条件下比较机理。
- [ ] $\ln[\mathrm{A}]$ 图笔直就证明是一级；另一张图纯属巧合。
::: solution
两张图都显得直，是因为两条定律的曲线加上噪声后差别很小，又因为变换变量的 $R^2$ 衡量的是*那个*变换变量的拟合——两个 $R^2$ 不可比较（第 3 项恰恰在此失败）。级数不是一张图能证明的属性；它是一个假说，要靠若干互相印证的独立诊断来检验。
:::
:::

## 后续内容

本章的一切都是*为了*什么而存在的证据：速率方程是机理的主要实验把手，[[kinetics/reaction-mechanisms]] 将讨论哪些机理能产生哪些方程，其中稳态近似承担最重的推导。为什么幂律级数通常是小整数、为什么三分子步骤罕见、$k$ 如何依赖温度，都是碰撞理论的问题（[[kinetics/collision-theory]]），其现代表述则是过渡态理论的问题（[[kinetics/transition-state-theory]]）。作为饱和的零级与作为单分子衰减的一级将在 [[kinetics/homogeneous-catalysis]] 与 [[kinetics/photochemistry]] 中反复出现。而本章使用的信号、校准与曲线这套词汇，正是 [[general-chemistry-2/rates-intro]] 引入的那一套——读完本章再重读它，会觉得它精确了许多。

::: summary
- 动力学曲线是物理信号；把它换算成浓度需要工作曲线，而朗伯-比尔定律（$A = \varepsilon l c$）只对稀的、吸收物种彼此独立的溶液线性。
- 压力法、电导法、旋光法与淬灭取样各把不同的可观测量转化为进度；停流法达到毫秒，弛豫方法达到微秒，而一次弛豫直接测量 $1/\tau = k_\mathrm{f} + k_\mathrm{r}$。
- 初始速率法在配制的组成处测量局域级数；改变单一试剂的实验给出单个级数，改变多种试剂的实验给出其和。
- 分离法把多试剂方程化为拟级方程；$k_{\text{obs}} = k[\mathrm{B}]_0^{n}\cdots$，改变过量水平即揭示被藏起的级数 $n$。
- 积分速率方程是 $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$ 的定理：零级在有限时间耗尽，二级有 $1/[\mathrm{A}]$ 对 $t$ 线性且半衰期逐次加倍，浓度不等的二级方程是一个部分分式积分。
- 分数寿命是级数探测器：跨实验有 $t_{1/2} \propto [\mathrm{A}]_0^{1-o}$，同一次实验内有 $t_{1/4}/t_{1/2} = 1.5, 2, 3$ 对应 $o = 0, 1, 2$。
- 可逆一级体系以单个指数弛豫，$\tau = 1/(k_\mathrm{f}+k_\mathrm{r})$，$K_\mathrm{c} = k_\mathrm{f}/k_\mathrm{r}$：平衡常数是两个速率常数之比。
- 对变换后数据的直线检验是弱证据——变换会重新加权误差并互相模仿；要相信直接非线性拟合、分数寿命与微分法。
:::

## 练习

::: exercise 由吸光度求浓度 {level=1 check="0.0003"}
某产物在 $450\ \mathrm{nm}$ 处吸收，$\varepsilon = 1.50\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$。反应混合液在 $1.00\ \mathrm{cm}$ 比色皿中于该波长读得 $A = 0.450$，其余物种均不吸收。产物的浓度是多少？（以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
$[\mathrm{P}] = A/(\varepsilon l) = 0.450/\left(1.50\times10^{3} \times 1.00\right) = 3.00\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。保留三位有效数字，与吸光度一致。
:::
:::

::: exercise 从拟级回到真实级数 {level=1 check="0.05"}
反应 $\mathrm{A} + \mathrm{B} \rightarrow$ 产物在 $[\mathrm{B}]$ 恒定缓冲于 $0.50\ \mathrm{mol\,dm^{-3}}$ 的条件下进行，$\mathrm{A}$ 的曲线呈一级，$k_{\text{obs}} = 2.50\times10^{-2}\ \mathrm{s^{-1}}$。已知反应对 $\mathrm{B}$ 为一级，求二级速率常数。（以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 输入 $k$。）
::: solution
$k_{\text{obs}} = k[\mathrm{B}]$，故 $k = 2.50\times10^{-2}/0.50 = 5.0\times10^{-2}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。拟一级常数就是把真实常数折进了那个隐藏浓度；把它除回去就是分离法的第（4）步。
:::
:::

::: exercise 弛豫时间 {level=1 check="200"}
快速平衡 $\mathrm{A \rightleftharpoons C}$ 的 $k_\mathrm{f} = 4.0\times10^{-3}\ \mathrm{s^{-1}}$，$k_\mathrm{r} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$。一个小扰动使混合液略微偏离平衡。弛豫时间是多少？（以秒输入。）
::: solution
$\tau = 1/(k_\mathrm{f} + k_\mathrm{r}) = 1/(5.0\times10^{-3}) = 200\ \mathrm{s}$。注意是"和"：两个方向都贡献恢复速率，弛豫比任何单一步骤暗示的都要快。
:::
:::

::: exercise 压力法测速率常数 {level=2 check="0.00006"}
对一级气相分解 $2\,\mathrm{N_2O_5} \rightarrow 4\,\mathrm{NO_2} + \mathrm{O_2}$，充压至 $p_0 = 50.0\ \mathrm{kPa}$ 的容器在 $t = 1.00\times10^{4}\ \mathrm{s}$ 后读得 $p = 83.8\ \mathrm{kPa}$，完全分解后 $p_\infty = 125.0\ \mathrm{kPa}$。求 $k$。（以 $\mathrm{s^{-1}}$ 输入。）
::: solution
与 [[#ex-manometry]] 相同，$p_{\mathrm{N_2O_5}} = \tfrac{2}{3}(p_\infty - p)$ 且 $p_0 = \tfrac{2}{5}p_\infty$，故
$$
k = \frac{1}{t}\ln\frac{3p_\infty}{5(p_\infty - p)} = \frac{1}{1.00\times10^{4}}\ln\frac{375}{5 \times 41.2} = \frac{\ln 1.820}{10^{4}} = 6.0\times10^{-5}\ \mathrm{s^{-1}}.
$$
先核对 $p_0 = 0.4 \times 125.0 = 50.0\ \mathrm{kPa}$，确认压力模型无误再谈动力学。
:::
:::

::: exercise 由两个半衰期定级数 {level=2 check="0.167"}
同一反应在 $[\mathrm{A}]_0 = 0.10\ \mathrm{mol\,dm^{-3}}$ 下测得 $t_{1/2} = 60\ \mathrm{s}$，在 $[\mathrm{A}]_0 = 0.20\ \mathrm{mol\,dm^{-3}}$ 下测得 $t_{1/2} = 30\ \mathrm{s}$。求级数与速率常数。（以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 输入 $k$。）
::: solution
$[\mathrm{A}]_0$ 加倍使半衰期*减半*，故 $t_{1/2} \propto [\mathrm{A}]_0^{1-o}$ 且 $2^{1-o} = \tfrac{1}{2}$：级数为 $o = 2$。于是 $k = 1/(t_{1/2}[\mathrm{A}]_0) = 1/(60 \times 0.10) = 0.167\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，第二次实验确认：$1/(30 \times 0.20) = 0.167$。不同浓度实验给出同一个 $k$，正是级数正确的自洽检验。
:::
:::

::: exercise 一次弛豫定出两个常数 {level=2 check="0.016"}
对 $\mathrm{A \rightleftharpoons C}$ 的弛豫实验给出 $\tau = 50\ \mathrm{s}$，平衡混合液的化学分析给出 $K_\mathrm{c} = [\mathrm{C}]_\mathrm{eq}/[\mathrm{A}]_\mathrm{eq} = 4.0$。求 $k_\mathrm{f}$。（以 $\mathrm{s^{-1}}$ 输入。）
::: solution
两个方程两个未知数：$k_\mathrm{f} + k_\mathrm{r} = 1/\tau = 0.020\ \mathrm{s^{-1}}$，$k_\mathrm{f}/k_\mathrm{r} = 4.0$。故 $k_\mathrm{r} = 0.020/5 = 4.0\times10^{-3}\ \mathrm{s^{-1}}$，$k_\mathrm{f} = 0.016\ \mathrm{s^{-1}}$。这就是由两个测量定出两个常数的标准路线——一个动态（$\tau$），一个静态（$K_\mathrm{c}$）。
:::
:::

::: exercise 一般分数寿命公式 {level=3}
对一般级数 $o \ne 1$ 积分 $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$，导出
$$
t_{1/f} = \frac{f^{\,1-o} - 1}{(o-1)\,k\,[\mathrm{A}]_0^{\,o-1}},
\qquad\text{从而}\qquad
t_{1/2} \propto [\mathrm{A}]_0^{\,1-o}.
$$
由此恢复 [[#prop-integrated]] 的三个半衰期，并证明该式在 $o \rightarrow 1$ 的极限给出 $t_{1/2} = (\ln 2)/k$。
::: solution
分离变量并积分：$-\int_{[\mathrm{A}]_0}^{[\mathrm{A}]} [\mathrm{A}]^{-o}\,\mathrm{d}[\mathrm{A}] = kt$，得 $\left([\mathrm{A}]^{1-o} - [\mathrm{A}]_0^{\,1-o}\right)/(o-1) = kt$。令 $[\mathrm{A}] = f[\mathrm{A}]_0$ 并提出因子 $[\mathrm{A}]_0^{\,1-o}$ 即得所给公式。取 $f = \tfrac{1}{2}$：$o = 0$ 给出 $t_{1/2} = (1 - \tfrac{1}{2})[\mathrm{A}]_0/k = [\mathrm{A}]_0/2k$；$o = 2$ 给出 $t_{1/2} = (2 - 1)/(k[\mathrm{A}]_0)$；$o = \tfrac{1}{2}$ 给出 $t_{1/2} = (\sqrt{2} - 1)\sqrt{[\mathrm{A}]_0}/k$——半级的半衰期随反应进行而缩短。求极限时写 $o = 1 + \delta$ 并展开 $f^{-\delta} = e^{-\delta\ln f} \approx 1 - \delta\ln f$：于是 $t_{1/f} \approx (1 - \delta\ln f - 1)/(\delta k) = \ln(1/f)/k$，取 $f = \tfrac{1}{2}$ 得 $(\ln 2)/k$。一级方程不是独立情形，而是一般公式的可去奇点。
:::
:::

::: exercise 用部分分式导出浓度不等的二级方程 {level=3}
对 $\mathrm{A} + \mathrm{B} \rightarrow$ 产物，$v = k[\mathrm{A}][\mathrm{B}]$，$[\mathrm{A}]_0 = a$，$[\mathrm{B}]_0 = b$，把 [[#proof-second]] 中的部分分式积分完整做一遍，导出 $kt = \dfrac{1}{a-b}\ln\dfrac{b\,(a-x)}{a\,(b-x)}$，并证明 $b \rightarrow a$ 的极限恢复 $1/[\mathrm{A}] - 1/[\mathrm{A}]_0 = kt$。
::: solution
由 $\mathrm{d}x/\mathrm{d}t = k(a-x)(b-x)$ 分离变量并分解：
$$
\frac{1}{(a-x)(b-x)} = \frac{1}{a-b}\left[\frac{1}{b-x} - \frac{1}{a-x}\right],
$$
把方括号通分即可验证。对每一项从 $0$ 积分到 $x$：$\int_0^x \mathrm{d}x/(b-x) = \ln\frac{b}{b-x}$，对 $a$ 同理，故
$$
kt = \frac{1}{a-b}\left[\ln\frac{b}{b-x} - \ln\frac{a}{a-x}\right] = \frac{1}{a-b}\ln\frac{b\,(a-x)}{a\,(b-x)}.
$$
求极限时令 $b = a + \varepsilon$、$x = a\,y$（$\mathrm{A}$ 的反应分数），对数化为 $\ln\!\big[(a+\varepsilon)(1-y)/(a + \varepsilon - ay)\big]$。对 $\varepsilon$ 展开到一阶（等价地，对 $\varepsilon \rightarrow 0$ 用洛必达法则）得 $\ln(\cdots) \approx -\varepsilon\, y/\big(a(1-y)\big)$，再除以 $a - b = -\varepsilon$，留下 $kt = y/\big(a(1-y)\big)$。由于 $[\mathrm{A}] = a(1-y)$，这就是 $kt = \dfrac{a - [\mathrm{A}]}{a\,[\mathrm{A}]} = \frac{1}{[\mathrm{A}]} - \frac{1}{a}$——等浓度的二级方程。浓度不等的情形在 $[\mathrm{A}]$ 对 $t$ 图中确实是弯曲的，尽管*方程*是二级：这再次提醒我们，曲线的形状是实验的属性，而不仅是机理的属性。
:::
:::
