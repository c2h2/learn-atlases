乳清苷 5′-磷酸脱羧酶把羧基从嘧啶环上除去，这是核苷酸 UMP 合成的最后一步。在中性水中、没有酶时，同一个反应的半衰期约为 7800 万年；而在酶上，它每秒发生 39 次。这就是 $10^{17}$ 倍的速率增强，而且是在体温、水、pH 7 左右实现的——没有强酸，没有高压，没有奇异试剂——只有按正确位置排布的二十种氨基酸侧链。酶是化学能够管理一个细胞的原因：本来需要地质年代才能完成的反应被安排在心搏的时间尺度上发生，而且每一个都只发生在正确的分子上。

本章问的是如何办到。答案有两层。第一层是**动力学**：酶对速率方程做什么，它的表现如何由两个数 $k_\mathrm{cat}$ 与 $K_\mathrm{M}$ 概括，以及抑制剂如何以有诊断意义的方式改变这两个数。米氏方程的催化循环推导见[[kinetics/homogeneous-catalysis]]；这里我们把它推进到专一性常数、扩散极限、可逆抑制的完整家族，以及用速率数据解读机理。第二层是**化学**：催化策略——广义酸碱催化、共价催化、金属离子、邻近与定向，尤其是比底物更紧地结合过渡态——在丝氨酸蛋白酶上详细展开。本章以细胞如何把酶开开关关作结。使这一切成为可能的蛋白质结构见[[biochemistry/amino-acids-proteins]]，结合的语言（解离常数、饱和、别构）见[[biochemistry/protein-function]]。

## 催化剂能做什么、不能做什么

酶是催化剂，凡对催化剂成立的一切对酶都成立。它通过提供一条活化自由能较低的路径来加速反应，并在每个循环末再生。它**不**改变平衡常数：$K$ 只依赖于反应物与产物的自由能，$\Delta_\mathrm{r}G^\circ = -RT\ln K$，而酶在总反应的两侧都出现。把正向反应加速 $10^{10}$ 倍的酶，把逆向反应也恰好加速同样的倍数。一个反应在细胞中是否正向进行由热力学决定——由细胞浓度下的实际自由能变决定，这是[[biochemistry/bioenergetics]]的主题——酶只决定它多快到达那里。

过渡态理论（[[kinetics/transition-state-theory]]）把效应的大小说得具体。一级速率常数为 $k = (k_\mathrm{B}T/h)\exp(-\Delta^\ddagger G/RT)$，所以速率增强 $k_\mathrm{cat}/k_\mathrm{non}$ 对应活化自由能降低
$$
\Delta\Delta^\ddagger G = RT\ln\frac{k_\mathrm{cat}}{k_\mathrm{non}}.
$$ {#eq-ddg}
在 $298\ \mathrm{K}$，$RT\ln 10 = 5.71\ \mathrm{kJ\,mol^{-1}}$：速率每上十倍，相当于 $5.7\ \mathrm{kJ\,mol^{-1}}$ 的能垒。百万倍的增强是 $34\ \mathrm{kJ\,mol^{-1}}$——约两根好的氢键的能量。这就是酶学家说催化是由结合能"付账"的缘故：酶与其底物形成许多微弱非共价接触（[[biochemistry/water-noncovalent#def-hbond]]）时释放的自由能，就是花在降低能垒上的通货。

::: proposition 过渡态结合 {#prop-ts}
设底物 S 无催化时的速率常数为 $k_\mathrm{non}$，在酶上从复合物 ES 出发的速率常数为 $k_\mathrm{cat}$。设 $K_\mathrm{S}$ 为 ES 的解离常数，并定义 $K_\mathrm{T}$ 为酶-过渡态复合物 $\mathrm{ES^\ddagger \rightleftharpoons E + S^\ddagger}$ 的（假想）解离常数。若两个速率常数都服从带同一指前因子 $k_\mathrm{B}T/h$ 的过渡态理论，则
$$
\frac{k_\mathrm{cat}}{k_\mathrm{non}} = \frac{K_\mathrm{S}}{K_\mathrm{T}}.
$$ {#eq-ts}
酶加速反应的倍数，恰好等于它结合过渡态比结合底物更紧的倍数。
:::

::: proof 一个热力学方框
写出用两条路线把 $\mathrm{E + S}$ 与 $\mathrm{ES^\ddagger}$ 联系起来的四个平衡。路线一：结合 $\mathrm{E + S \rightleftharpoons ES}$（平衡常数 $1/K_\mathrm{S}$），再在酶上活化 $\mathrm{ES \rightleftharpoons ES^\ddagger}$（准平衡常数 $K^\ddagger_\mathrm{cat}$）。路线二：在溶液中活化 $\mathrm{S \rightleftharpoons S^\ddagger}$（$K^\ddagger_\mathrm{non}$），再结合过渡态 $\mathrm{E + S^\ddagger \rightleftharpoons ES^\ddagger}$（$1/K_\mathrm{T}$）。自由能是状态函数，所以两条路线上平衡常数的乘积相等：
$$
\frac{K^\ddagger_\mathrm{cat}}{K_\mathrm{S}} = \frac{K^\ddagger_\mathrm{non}}{K_\mathrm{T}}.
$$
过渡态理论给出 $k_\mathrm{cat} = (k_\mathrm{B}T/h)K^\ddagger_\mathrm{cat}$ 与 $k_\mathrm{non} = (k_\mathrm{B}T/h)K^\ddagger_\mathrm{non}$；两式相除，指前因子相消，即得[[#eq-ts]]。公共指前因子（透射系数相等）的假设是这一论证的薄弱环节，但它使结论改变的是小因子，不是数量级。
:::

[[#prop-ts]]是鲍林（Linus Pauling）1946 年提出的一个思想的现代表述：酶与其底物不互补，而与过渡态互补。它解释了为什么**过渡态类似物**——模仿过渡态的几何与电荷的稳定分子——往往比底物被结合得紧数百万倍，以及为什么许多药物按这一思路设计（[[medicinal-chemistry/drug-binding]]）。它还解释了一个常令学生困惑的事实：把底物结合得**过**紧的酶会是糟糕的催化剂，因为花在地面上的结合能是从 ES 抬高能垒，而不是降低它。

::: example 效率最高的酶 {#ex-ts}
对于乳清苷 5′-磷酸脱羧酶，Radzicka 与 Wolfenden（*Science*，1995）测得 $25\ \mathrm{^\circ C}$ 下无催化反应的 $k_\mathrm{non} = 2.8\times10^{-16}\ \mathrm{s^{-1}}$，酶上的 $k_\mathrm{cat} = 39\ \mathrm{s^{-1}}$。计算速率增强、相应的活化自由能降低，以及若底物以 $K_\mathrm{S} \approx 1\ \mu\mathrm{mol\,dm^{-3}}$ 结合时过渡态的解离常数。
::: solution
速率增强为 $39/(2.8\times10^{-16}) = 1.4\times10^{17}$。由[[#eq-ddg]]，
$$
\Delta\Delta^\ddagger G = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln(1.39\times10^{17}) = 97.9\ \mathrm{kJ\,mol^{-1}}.
$$
由[[#eq-ts]]，$K_\mathrm{T} = K_\mathrm{S}\,k_\mathrm{non}/k_\mathrm{cat} = (1\times10^{-6})(2.8\times10^{-16})/39 = 7\times10^{-24}\ \mathrm{mol\,dm^{-3}}$。没有任何真实配体能被结合得这么紧（已知最强的非共价复合物解离常数在 $10^{-15}\ \mathrm{mol\,dm^{-3}}$ 上下），这正说明过渡态与酶的相互作用必定多么不寻常。引言中引用的半衰期为 $\ln 2/k_\mathrm{non} = 2.5\times10^{15}\ \mathrm{s}$，即 $7800$ 万年。这里的 $K_\mathrm{S}$ 只是数量级假设；速率增强与 $\Delta\Delta^\ddagger G$ 并不依赖它。
:::
:::

## 米氏（Michaelis–Menten）动力学

### 速率方程

几乎每一种酶，在底物大大过量于酶的条件下研究，都表现出同样的行为：初速率起初随底物浓度线性上升，然后趋于一个最大值。给出这一行为的最简单机理，就是米夏埃利斯（Leonor Michaelis）与门滕（Maud Menten）1913 年使用的那一个。

::: proposition 米氏方程 {#prop-mm}
对机理
$$
\mathrm{E + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ES} \xrightarrow{\ k_2\ } \mathrm{E + P},
$$
在酶总浓度 $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}]$、底物大大过量（$[\mathrm{S}] \gg [\mathrm{E}]_0$，故结合不消耗 $[\mathrm{S}]$）、产物可忽略（初速率）且 $\mathrm{ES}$ 处于稳态的条件下，初速率为
$$
v_0 = \frac{V_\mathrm{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}, \qquad V_\mathrm{max} = k_2[\mathrm{E}]_0, \qquad K_\mathrm{M} = \frac{k_{-1} + k_2}{k_1}.
$$ {#eq-mm}
:::

::: proof 稳态加守恒
稳态条件令 $\mathrm{ES}$ 的生成速率等于其分解速率：
$$
k_1[\mathrm{E}][\mathrm{S}] = (k_{-1} + k_2)[\mathrm{ES}] \quad\Rightarrow\quad [\mathrm{E}] = \frac{K_\mathrm{M}[\mathrm{ES}]}{[\mathrm{S}]}.
$$
代入守恒式：$[\mathrm{E}]_0 = [\mathrm{ES}](K_\mathrm{M}/[\mathrm{S}] + 1)$，故 $[\mathrm{ES}] = [\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$。产物的生成速率 $v_0 = k_2[\mathrm{ES}]$，即[[#eq-mm]]。当 $[\mathrm{S}] \gg [\mathrm{E}]_0$ 时，稳态在毫秒内即达到，因为 $\mathrm{ES}$ 的池子与它所汲取的 $\mathrm{S}$ 的池子相比微乎其微；完整的论证是[[kinetics/reaction-mechanisms]]中的奇异摄动论证。
:::

两个极限承载着物理。当 $[\mathrm{S}] \ll K_\mathrm{M}$ 时，$v_0 \approx (V_\mathrm{max}/K_\mathrm{M})[\mathrm{S}]$：反应对底物是一级的，酶大多游离着等待底物。当 $[\mathrm{S}] \gg K_\mathrm{M}$ 时，$v_0 \approx V_\mathrm{max}$：反应对底子是零级的，酶已饱和，每个分子都在忙碌。$K_\mathrm{M}$ 就是使 $v_0 = V_\mathrm{max}/2$ 的底物浓度。对于含更多步骤的机理（酰基酶、产物释放），同样的双曲线照样出现，只是常数的含义不同，所以我们按常数度量什么来给它们命名，而不是按某一个机理的速率常数。

::: definition 转换数、米氏常数与专一性常数 {#def-kcat}
对服从速率定律 $v_0 = k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$ 的酶：

- **转换数** $k_\mathrm{cat} = V_\mathrm{max}/[\mathrm{E}]_0$ 是饱和时每个活性位点每秒转化的底物分子数（单位 $\mathrm{s^{-1}}$）；两步机理中 $k_\mathrm{cat} = k_2$；
- **米氏常数** $K_\mathrm{M}$ 是给出半最大速率的底物浓度（单位 $\mathrm{mol\,dm^{-3}}$）；
- **专一性常数** $k_\mathrm{cat}/K_\mathrm{M}$ 是低底物浓度下 $\mathrm{E + S}$ 的表观二级速率常数，$v_0 = (k_\mathrm{cat}/K_\mathrm{M})[\mathrm{E}][\mathrm{S}]$（单位 $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$）。

$k_\mathrm{cat}$ 描述酶-底物复合物；$k_\mathrm{cat}/K_\mathrm{M}$ 描述游离酶遇见游离底物，是催化效率与对底物偏好的度量。
:::

为什么 $k_\mathrm{cat}/K_\mathrm{M}$ 是特异性的恰当度量？设有两种底物 A 与 B 竞争同一种酶。各自的转化速率为 $v = (k_\mathrm{cat}/K_\mathrm{M})[\mathrm{E}][\mathrm{X}]$，两个表达式中的游离酶浓度 $[\mathrm{E}]$ 是**同一个**，于是
$$
\frac{v_\mathrm{A}}{v_\mathrm{B}} = \frac{(k_\mathrm{cat}/K_\mathrm{M})_\mathrm{A}[\mathrm{A}]}{(k_\mathrm{cat}/K_\mathrm{M})_\mathrm{B}[\mathrm{B}]}
$$ {#eq-competing}
在**任何**底物浓度下都成立，饱和与否都一样（推导见[[#ex-competing-substrates]]）。混合物中酶偏好哪一种底物，$k_\mathrm{cat}$ 或 $K_\mathrm{M}$ 单独都说了不算；说了算的是它们的比。

::: warning $K_\mathrm{M}$ 一般不是解离常数 {#warn-km}
人们容易把小的 $K_\mathrm{M}$ 读作"结合紧"。只有当 $k_2 \ll k_{-1}$、$\mathrm{E + S \rightleftharpoons ES}$ 处于平衡、从而 $K_\mathrm{M} \approx k_{-1}/k_1 = K_\mathrm{S}$ 时这才是对的（即米夏埃利斯与门滕自己假设的快平衡情形）。当化学步骤相对于解离很快时，$K_\mathrm{M} = (k_{-1} + k_2)/k_1$ 可以远大于 $K_\mathrm{S}$；而对多步机理，$K_\mathrm{M}$ 甚至可以*小于* $K_\mathrm{S}$（积累的酰基酶把半饱和点拉低）。同样，$V_\mathrm{max}$ 不是酶的属性——它随你往比色皿里加多少酶而成比例变化；$k_\mathrm{cat}$ 才是内在量。而高的 $k_\mathrm{cat}$ 也不是"效率"：一个 $k_\mathrm{cat} = 10^4\ \mathrm{s^{-1}}$ 但 $K_\mathrm{M} = 1\ \mathrm{mol\,dm^{-3}}$ 的酶，在细胞的微摩尔浓度下毫无用处。
:::

### 测定 $k_\mathrm{cat}$ 与 $K_\mathrm{M}$

实验中，在大约覆盖 $0.2K_\mathrm{M}$ 到 $5K_\mathrm{M}$ 的一系列底物浓度下测定初速率，再用非线性最小二乘把[[#eq-mm]]拟合到数据上。双倒数形式的 **Lineweaver–Burk** 方程
$$
\frac{1}{v_0} = \frac{K_\mathrm{M}}{V_\mathrm{max}}\cdot\frac{1}{[\mathrm{S}]} + \frac{1}{V_\mathrm{max}},
$$ {#eq-lb}
是一条斜率为 $K_\mathrm{M}/V_\mathrm{max}$、截距为 $1/V_\mathrm{max}$（在 $1/v_0$ 轴上）和 $-1/K_\mathrm{M}$（在 $1/[\mathrm{S}]$ 轴上）的直线。它对于*看出*抑制模式极其宝贵，对于*估计*参数却很糟糕，因为取倒数会放大最慢、最不准的那些速率的误差，并给它们最大的杠杆。

::: example 拟合初速率数据 {#ex-mm-fit}
一种酶在 $[\mathrm{E}]_0 = 10.0\ \mathrm{nmol\,dm^{-3}}$ 下给出下列初速率：

| $[\mathrm{S}]$ / $\mathrm{mmol\,dm^{-3}}$ | 0.50 | 1.00 | 2.00 | 4.00 | 8.00 |
|---|---|---|---|---|---|
| $v_0$ / $\mu\mathrm{mol\,dm^{-3}\,s^{-1}}$ | 10.3 | 16.2 | 25.4 | 32.9 | 40.6 |

试估计 $V_\mathrm{max}$ 与 $K_\mathrm{M}$：(a) 由 Lineweaver–Burk 图；(b) 用非线性最小二乘，并由此求 $k_\mathrm{cat}$ 与 $k_\mathrm{cat}/K_\mathrm{M}$。
::: solution
(a) 倒数为 $1/[\mathrm{S}] = 2, 1, 0.5, 0.25, 0.125\ \mathrm{dm^3\,mmol^{-1}}$，$1/v_0 = 0.0971, 0.0617, 0.0394, 0.0304, 0.0246\ \mathrm{dm^3\,s\,\mu mol^{-1}}$。不加权的直线拟合给出斜率 $0.03872$、截距 $0.02063$，所以 $V_\mathrm{max} = 1/0.02063 = 48.5\ \mu\mathrm{mol\,dm^{-3}\,s^{-1}}$，$K_\mathrm{M} = 0.03872/0.02063 = 1.88\ \mathrm{mmol\,dm^{-3}}$。

(b) 直接最小化 $\sum(v_i - V_\mathrm{max}[\mathrm{S}]_i/(K_\mathrm{M} + [\mathrm{S}]_i))^2$（例如用 `scipy.optimize.curve_fit`）给出 $V_\mathrm{max} = 50.7\ \mu\mathrm{mol\,dm^{-3}\,s^{-1}}$、$K_\mathrm{M} = 2.06\ \mathrm{mmol\,dm^{-3}}$。两种方法相差约 5 % 与 10 %，因为倒数图给了 $0.50\ \mathrm{mmol\,dm^{-3}}$ 处的点——最小、最不精确的速率——最大的权重。应当采用非线性拟合值：
$$
k_\mathrm{cat} = \frac{V_\mathrm{max}}{[\mathrm{E}]_0} = \frac{50.7\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}}{10.0\times10^{-9}\ \mathrm{mol\,dm^{-3}}} = 5.07\times10^{3}\ \mathrm{s^{-1}},\qquad \frac{k_\mathrm{cat}}{K_\mathrm{M}} = \frac{5.07\times10^{3}\ \mathrm{s^{-1}}}{2.06\times10^{-3}\ \mathrm{mol\,dm^{-3}}} = 2.5\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}.
$$
只有五个点，至多两位、最多三位有效数字是有根据的。
:::
:::

::: widget regression
points: 2,0.0971; 1,0.0617; 0.5,0.0394; 0.25,0.0304; 0.125,0.0246
degree: 1
x: 0, 2.2
y: 0, 0.11
caption: [[#ex-mm-fit]]的 Lineweaver–Burk 图：$1/v_0$（单位 $\mathrm{dm^3\,s\,\mu mol^{-1}}$）对 $1/[\mathrm{S}]$（单位 $\mathrm{dm^3\,mmol^{-1}}$）作图。截距为 $1/V_\mathrm{max}$，斜率为 $K_\mathrm{M}/V_\mathrm{max}$。把最右边那个点——最慢的速率、最低的底物浓度——拖动百分之几，看截距、进而 $V_\mathrm{max}$ 如何大幅摆动；拖动靠近轴的点几乎无影响。最不准数据的这种杠杆作用，正是参数应当直接拟合双曲线本身的原因。
:::

### 酶究竟能有多快？

$k_\mathrm{cat}/K_\mathrm{M}$ 有一个上限：酶转化底物的速度不可能快过底物到达的速度。对在溶液中扩散的两个球，Smoluchowski 理论给出相遇速率常数
$$
k_\mathrm{d} = 4\pi N_\mathrm{A}(D_\mathrm{E} + D_\mathrm{S})(r_\mathrm{E} + r_\mathrm{S}),
$$ {#eq-smol}
其中 $D$ 为扩散系数，$r_\mathrm{E} + r_\mathrm{S}$ 为发生反应时的距离。对一个酶和一个小底物，其量级为 $10^{9}$–$10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$；由于活性位点只是酶表面的一小块，而且底物必须以正确的取向到达，实际的上限约为 $10^{8}$–$10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。达到这一上限的酶被称为已达到**催化完美**：每次相遇都导致反应，再改进化学也不会提高速率。

::: example 哪些酶是扩散控制的？ {#ex-diffusion}
用下面的数据（取自 Nelson 与 Cox《Lehninger Principles of Biochemistry》第 8 版），计算 $k_\mathrm{cat}/K_\mathrm{M}$ 并判断哪些酶接近扩散极限。

| 酶 | 底物 | $k_\mathrm{cat}$ / $\mathrm{s^{-1}}$ | $K_\mathrm{M}$ / $\mathrm{mol\,dm^{-3}}$ |
|---|---|---|---|
| 乙酰胆碱酯酶 | 乙酰胆碱 | $1.4\times10^{4}$ | $9\times10^{-5}$ |
| 碳酸酐酶 | $\mathrm{CO_2}$ | $1\times10^{6}$ | $1.2\times10^{-2}$ |
| 延胡索酸酶 | 延胡索酸 | $8\times10^{2}$ | $5\times10^{-6}$ |
| 磷酸丙糖异构酶 | 3-磷酸甘油醛 | $4.3\times10^{3}$ | $1.8\times10^{-5}$ |
::: solution
相除得：乙酰胆碱酯酶 $1.6\times10^{8}$，碳酸酐酶 $8.3\times10^{7}$，延胡索酸酶 $1.6\times10^{8}$，磷酸丙糖异构酶 $2.4\times10^{8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。四个都在 $10^{8}$–$10^{9}$ 的一个数量级之内，所以本质上都受扩散控制，尽管它们的转换数跨度超过三个数量级。这一课是：完美可以有不同的到达方式——碳酸酐酶每秒转换百万次但对 $\mathrm{CO_2}$ 结合得弱，延胡索酸酶转换得慢但在微摩尔浓度结合延胡索酸。对磷酸丙糖异构酶，粘度实验（加蔗糖或甘油以减慢扩散）证实了这一结论：$k_\mathrm{cat}/K_\mathrm{M}$ 随粘度增大而成比例下降，这正是扩散限制步骤的特征。
:::
:::

## 可逆抑制

**抑制剂**是降低酶促反应速率的分子。**不可逆**抑制剂与酶形成共价键，或结合得紧到在实验的时间尺度上不脱落；**可逆**抑制剂快速结合又解离，其效应由平衡常数描述。可逆抑制剂按其结合哪一种酶的形式来区分：游离酶 E、酶-底物复合物 ES，或两者都结合。

::: proposition 可逆抑制的速率方程 {#prop-inhibition}
设抑制剂 I 以解离常数 $K_\mathrm{I}$ 结合游离酶（$\mathrm{E + I \rightleftharpoons EI}$），以解离常数 $K_\mathrm{I}'$ 结合酶-底物复合物（$\mathrm{ES + I \rightleftharpoons ESI}$），两个复合物都没有催化活性，抑制剂的结合步骤处于平衡，$\mathrm{ES}$ 处于稳态，且 $[\mathrm{I}]$ 不因结合而消耗。定义
$$
\alpha = 1 + \frac{[\mathrm{I}]}{K_\mathrm{I}}, \qquad \alpha' = 1 + \frac{[\mathrm{I}]}{K_\mathrm{I}'}.
$$
则
$$
v_0 = \frac{V_\mathrm{max}[\mathrm{S}]}{\alpha K_\mathrm{M} + \alpha'[\mathrm{S}]}, \qquad\text{于是}\qquad V_\mathrm{max}^\mathrm{app} = \frac{V_\mathrm{max}}{\alpha'}, \quad K_\mathrm{M}^\mathrm{app} = \frac{\alpha}{\alpha'}K_\mathrm{M}.
$$ {#eq-mixed}
特例为**竞争性**抑制（只结合 E：$\alpha' = 1$）、**反竞争性**抑制（只结合 ES：$\alpha = 1$）、**纯非竞争性**抑制（以相同亲和力结合两者，$K_\mathrm{I} = K_\mathrm{I}'$：$\alpha = \alpha'$），以及一般的**混合性**抑制（$K_\mathrm{I} \ne K_\mathrm{I}'$）。
:::

::: proof 清点酶的各存在形式
由抑制剂的平衡，$[\mathrm{EI}] = [\mathrm{E}][\mathrm{I}]/K_\mathrm{I}$ 且 $[\mathrm{ESI}] = [\mathrm{ES}][\mathrm{I}]/K_\mathrm{I}'$。守恒式变为
$$
[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{EI}] + [\mathrm{ES}] + [\mathrm{ESI}] = \alpha[\mathrm{E}] + \alpha'[\mathrm{ES}].
$$
$\mathrm{ES}$ 的稳态（由 $\mathrm{E + S}$ 生成，经解离与转换而损失；与 $\mathrm{ESI}$ 的交换处于平衡、不贡献净流量）仍给出 $[\mathrm{E}] = K_\mathrm{M}[\mathrm{ES}]/[\mathrm{S}]$，与[[#prop-mm]]的证明完全相同。于是 $[\mathrm{E}]_0 = [\mathrm{ES}](\alpha K_\mathrm{M}/[\mathrm{S}] + \alpha')$，且
$$
v_0 = k_\mathrm{cat}[\mathrm{ES}] = \frac{k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]}{\alpha K_\mathrm{M} + \alpha'[\mathrm{S}]}.
$$
分子分母同除以 $\alpha'$，就把它化成带上述表观常数的米氏形式。（若 $\mathrm{EI}$ 也能结合 $\mathrm{S}$，方案就闭合成一个方框，其四个平衡由详细平衡原理相联系；在快平衡下结果不变。）
:::

上述命题把抑制变成了一种诊断。竞争性抑制剂抬高 $K_\mathrm{M}^\mathrm{app}$ 而 $V_\mathrm{max}$ 不变：底物浓度足够高时，底物赢得对 E 的竞争。在 Lineweaver–Burk 形式中，斜率 $\alpha K_\mathrm{M}/V_\mathrm{max}$ 增大而截距 $1/V_\mathrm{max}$ 不变，所以不同 $[\mathrm{I}]$ 的直线**交于 $1/v_0$ 轴上**。反竞争性抑制剂把 $V_\mathrm{max}$ 与 $K_\mathrm{M}$ 按同一因子 $\alpha'$ 压低——它只结合复合物，并依勒夏特列（Le Chatelier）原理把 $\mathrm{E + S \rightleftharpoons ES}$ 拉向右边——于是斜率不变，直线**平行**。纯非竞争性抑制剂压低 $V_\mathrm{max}$ 而 $K_\mathrm{M}$ 不变；它的直线在 $-1/K_\mathrm{M}$ 处**交于 $1/[\mathrm{S}]$ 轴**。混合性抑制剂的直线交于 $1/v_0$ 轴之左、$1/[\mathrm{S}]$ 轴之上或之下（[[#exr-intersection]]）。

::: widget plot
f: x/(1+x); x/(a+b*x)
x: 0, 10
y: 0, 1.1
sliders: a=2:1:5:0.1; b=1:1:5:0.1
labels: \text{无抑制剂}; \text{有抑制剂}
hlines: 1; 0.5
caption: 初速率 $v_0/V_\mathrm{max}$ 对 $[\mathrm{S}]/K_\mathrm{M}$（横轴 $x$）作图，无抑制剂，以及加入由 $\alpha$（滑块 $a$）与 $\alpha'$（滑块 $b$）描述的抑制剂，按[[#eq-mixed]]：$v_0/V_\mathrm{max} = x/(\alpha + \alpha' x)$。当 $b = 1$ 时抑制剂是竞争性的：曲线沿轴被拉伸，但仍趋近 1。当 $a = 1$ 时是反竞争性的；当 $a = b$ 时是纯非竞争性的：平台降到 $1/\alpha'$。注意每条曲线在何处穿过自身平台的一半——那就是 $K_\mathrm{M}^\mathrm{app} = (\alpha/\alpha')K_\mathrm{M}$。
:::

::: example 一个竞争性抑制剂 {#ex-ki}
一种酶的 $K_\mathrm{M} = 2.0\ \mathrm{mmol\,dm^{-3}}$。在 $10\ \mu\mathrm{mol\,dm^{-3}}$ 抑制剂存在下拟合得 $K_\mathrm{M}^\mathrm{app} = 5.0\ \mathrm{mmol\,dm^{-3}}$，而 $V_\mathrm{max}$ 不变。判断抑制类型，求 $K_\mathrm{I}$，并计算 $[\mathrm{S}] = 2.0\ \mathrm{mmol\,dm^{-3}}$ 时有、无抑制剂下的速率分数 $v_0/V_\mathrm{max}$。
::: solution
$V_\mathrm{max}$ 不变而 $K_\mathrm{M}$ 增大，意味着 $\alpha' = 1$ 且 $\alpha > 1$：竞争性抑制。于是 $\alpha = K_\mathrm{M}^\mathrm{app}/K_\mathrm{M} = 5.0/2.0 = 2.5$，由 $\alpha = 1 + [\mathrm{I}]/K_\mathrm{I}$ 得
$$
K_\mathrm{I} = \frac{[\mathrm{I}]}{\alpha - 1} = \frac{10\ \mu\mathrm{mol\,dm^{-3}}}{1.5} = 6.7\ \mu\mathrm{mol\,dm^{-3}}.
$$
无抑制剂时 $v_0/V_\mathrm{max} = 2.0/(2.0 + 2.0) = 0.50$；有抑制剂时 $2.0/(5.0 + 2.0) = 0.29$。抑制剂的结合比底物的 $K_\mathrm{M}$ 所暗示的底物结合紧约 300 倍，这是设计出的抑制剂的典型情形：一个微摩尔级的分子成功地与毫摩尔级的底物竞争。注意 $K_\mathrm{I}$ 与 $K_\mathrm{M}$ 不同，*确实*是一个真正的解离常数，因为抑制剂不被转换。
:::
:::

药物发现中，效价常以 $\mathrm{IC_{50}}$ 报告，即在该测定条件下使速率减半的抑制剂浓度。对竞争性抑制剂，在[[#eq-mixed]]中令 $v_0(\mathrm{I}) = v_0(0)/2$ 得 **Cheng–Prusoff 关系**
$$
\mathrm{IC_{50}} = K_\mathrm{I}\left(1 + \frac{[\mathrm{S}]}{K_\mathrm{M}}\right),
$$ {#eq-cheng}
所以 $\mathrm{IC_{50}}$ 依赖所用的底物浓度，只有 $K_\mathrm{I}$ 能在实验室之间比较。这一区分将在[[medicinal-chemistry/drug-binding]]中重新出现。

::: quiz
在三个抑制剂浓度下测得的 Lineweaver–Burk 直线彼此平行。这是哪一类抑制剂？它结合什么？
- [ ] 竞争性；它结合活性位点上的游离酶。
- [x] 反竞争性；它只结合酶-底物复合物。
- [ ] 纯非竞争性；它以相同亲和力结合 E 与 ES。
- [ ] 不可逆；它使固定比例的酶永久失活。
::: solution
直线平行意味着斜率 $\alpha K_\mathrm{M}/V_\mathrm{max}$ 不变，故 $\alpha = 1$：抑制剂不结合游离酶。只有截距 $\alpha'/V_\mathrm{max}$ 上升，这要求结合 ES。竞争性抑制剂只改变斜率（直线交于 $1/v_0$ 轴）；纯非竞争性抑制剂把斜率与截距按同一因子改变（直线交于 $1/[\mathrm{S}]$ 轴）；不可逆抑制剂降低有效的 $[\mathrm{E}]_0$，因而看起来像非竞争性抑制，而不是反竞争性抑制。
:::
:::

**不可逆抑制剂**按化学而非按动力学分类。基团专一性试剂与某一类侧链反应：二异丙基氟磷酸（DIFP）使糜蛋白酶中一个异常活泼的丝氨酸磷酸化并使其失活——正是这个实验认定 Ser195 为催化残基。这一类有机磷化合物剧毒，因为它们以同样的方式使乙酰胆碱酯酶失活、阻止神经递质降解——这是一种机理的说明，不是一份配方，也是这类化合物受到严格管制的原因。**机理依赖型**（"自杀性"）抑制剂本身不活泼，直到靶酶开始对它们施加自己的催化化学：青霉素被交联细胞壁的细菌转肽酶的活性位点丝氨酸进攻，形成一个不水解的稳定酰基酶。与可逆抑制剂的区别在动力学上可见：不可逆抑制随接触时间加深，且不能靠稀释或过量底物解除。

## 酶如何催化：丝氨酸蛋白酶

肽键极其稳定。它在 pH 7、$25\ \mathrm{^\circ C}$ 下的无催化水解半衰期为几百年，因为酰胺被共振稳定（[[organic-2/carboxylic-derivatives]]）：氮的孤对离域进羰基，使碳成为蹩脚亲电体，使酰胺氮成为蹩脚离去基。糜蛋白酶是小肠的一种消化酶，它在大的疏水残基（Phe、Tyr、Trp）的羧基一侧水解肽键，转换数为每秒几十到几百。它靠的是组合四种在酶学中反复出现的策略：

- **共价催化**：反应经由一个共价的**酰基酶**中间体（Ser195 的酯）被拆成两个更容易的步骤。
- **广义酸碱催化**：His57 在每一步移走并归还质子，以致溶液中从不出现强碱或强酸物种（[[kinetics/homogeneous-catalysis]]区分专性催化与广义催化）。
- **过渡态稳定**：由 Gly193 与 Ser195 主链 N–H 基团构成的**氧负离子穴**向每个四面体中间体的带负电氧提供两根氢键——因而也向与它相似的过渡态提供——但对平面底物的羰基提供得差得多。
- **结合、邻近与定向**：**S1 口袋**容纳待断键之前那个残基的侧链，把那个键正好安放在亲核试剂旁边。

残基 Asp102、His57 与 Ser195（糜蛋白酶原编号）构成**催化三联体**：丝氨酸的羟基与组氨酸的 $\mathrm{N\varepsilon2}$ 氢键相连，组氨酸的另一个氮 $\mathrm{N\delta1}$ 与天冬氨酸的羧酸根氢键相连。

::: algorithm 糜蛋白酶的机理 {#algo-serine}
1. **结合。**底物结合时，其 P1 残基的芳香侧链进入疏水的 S1 口袋。待断肽键的羰基紧挨 Ser195，其氧指向氧负离子穴。
2. **亲核进攻（酰化，前半）。**Ser195 氧的孤对进攻羰基碳。新的 O–C 键形成之际，His57 的 $\mathrm{N\varepsilon2}$ 用自己的孤对取走丝氨酸羟基的质子（广义碱催化），C=O 的 π 电子移到羰基氧上。产物是一个带氧负离子的**四面体中间体**，由氧负离子穴中的两根氢键稳住；His57 此时成为咪唑鎓离子，其正电荷由与 Asp102 的氢键稳定。
3. **崩塌（酰化，后半）。**氧负离子的一对电子返回，重建 C=O π 键；C–N 键断裂，其电子归氮，氮从 His57 的 $\mathrm{N\varepsilon2}$ 取走质子（广义酸催化）。底物的胺半侧——新的 N 端片段——离去。留下的是**酰基酶**：底物酰基与 Ser195 之间的酯。
4. **水进攻（脱酰，前半）。**一分子水进入空出的位置。已恢复中性的 His57 在它进攻酯羰基碳时取走它的一个质子；π 电子移到氧上，给出第二个四面体中间体，同样在氧负离子穴中被稳定。
5. **崩塌与释放（脱酰，后半）。**氧负离子重建 C=O 键，与 Ser195 相连的 C–O 键断裂，丝氨酸的氧从 His57 取回质子。羧酸产物离去，酶以其原始质子化状态再生。
:::

上述算法给出可检验的预言，而且每条都已检验。若形成酰基酶，则从底物的胺（或醇）半侧释放的第一个产物分子应当比稳态转换更快出现：这就是在 *p*-硝基苯乙酸酯之类酯底物上看到的**爆发相**（[[#ex-burst]]）。若 His57 是广义碱，活性就应依赖它的质子化状态，给出 $\mathrm{p}K_\mathrm{a}$ 在 7 附近的 pH 依赖（[[#ex-ph]]）。若三联体是必需的，拆掉它就应是灾难性的，事实正是：在细菌丝氨酸蛋白酶枯草杆菌蛋白酶中，把催化丝氨酸换成丙氨酸使 $k_\mathrm{cat}/K_\mathrm{M}$ 下降约一百万倍（Carter 与 Wells，1988），但突变体水解肽的速率仍比纯水快几千倍，因为结合与定向还在。

丝氨酸蛋白酶的**特异性**由其 S1 口袋决定，三联体则相同。糜蛋白酶的口袋又深又疏水，接纳芳香侧链。胰蛋白酶的口袋底部带着 Asp189，其羧酸根与赖氨酸或精氨酸的带正电侧链形成盐桥，所以胰蛋白酶在 Lys 与 Arg 之后切割。在弹性蛋白酶中，缬氨酸与苏氨酸侧链（Val216、Thr226）部分填充口袋，只有丙氨酸这样的小残基装得下。同样的催化装置经**趋同进化**出现在枯草杆菌蛋白酶中，它的整体折叠与糜蛋白酶毫无亲缘关系：化学两次找到了同一个解。

::: example 用爆发相数活性位点 {#ex-burst}
标称浓度 $6.0\ \mu\mathrm{mol\,dm^{-3}}$（由其 $280\ \mathrm{nm}$ 吸光度得出）的糜蛋白酶与过量乙酸对硝基苯酯在 $1.00\ \mathrm{cm}$ 比色皿中混合，在 $400\ \mathrm{nm}$ 追踪对硝基苯酚盐的释放（所用条件下 $\varepsilon = 1.8\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$）。吸光度先快速上升 $0.090$，然后以每分钟 $0.030$ 线性增加。解释这条曲线的形状，求活性酶浓度与稳态转换数。
::: solution
酰化（[[#algo-serine]]第 2–3 步）快速释放对硝基苯酚盐；脱酰（第 4–5 步）缓慢再生酶。最初每个活性位点都酰化一次，各释放一个对硝基苯酚盐——这就是爆发相；此后酚盐只以慢脱酰解放酶的速率出现。把线性段外推回零时刻得到爆发幅度，它（当酰化远快于脱酰时）等于活性位点的浓度：
$$
[\mathrm{E}]_\mathrm{active} = \frac{\Delta A}{\varepsilon l} = \frac{0.090}{(1.8\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}})(1.00\ \mathrm{cm})} = 5.0\ \mu\mathrm{mol\,dm^{-3}},
$$
所以蛋白质中有 $5.0/6.0 = 83\ \%$ 有活性。稳态速率为 $0.030/(1.8\times10^{4}) = 1.67\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$，除以活性位点浓度得 $k_\mathrm{cat} = 0.33\ \mathrm{min^{-1}} = 5.6\times10^{-3}\ \mathrm{s^{-1}}$。这个很小的数值就是乙酰糜蛋白酶的脱酰速率常数：乙酰基不占据 S1 口袋，所以是一个糟糕的底物，而这恰恰使它适合用来滴定活性位点。Hartley 与 Kilby 1954 年对这个爆发相的观察，是酰基酶存在的第一条动力学证据。
:::
:::

### 其他催化策略

丝氨酸蛋白酶展示了多数策略，但不是全部。**金属离子催化**是第三大类型。碳酸酐酶中，由三个组氨酸持住的 $\mathrm{Zn^{2+}}$ 结合一分子水，把它的 $\mathrm{p}K_\mathrm{a}$ 从约 15.7（水中的水）降到约 7，于是中性 pH 下就存在锌结合氢氧化物——一个强亲核试剂；它进攻 $\mathrm{CO_2}$ 给出碳酸氢盐。质子从锌结合水经一个组氨酸接力传给溶剂，是决定 $k_\mathrm{cat} \approx 10^{6}\ \mathrm{s^{-1}}$ 的限速步骤。金属离子还把底物固定在位并屏蔽负电荷：几乎每一种用 ATP 的酶都需要 $\mathrm{Mg^{2+}}$，它结合磷酸根的氧（[[biochemistry/bioenergetics]]）。与辅酶一起的**共价催化**扩展了侧链可用的化学：磷酸吡哆醛与氨基酸形成亚胺，焦磷酸硫胺素形成进攻羰基的碳负离子，醛缩酶中赖氨酸侧链形成席夫碱（[[biochemistry/glycolysis-citric-acid#ex-aldolase]]）。**邻近与定向**——把两个反应物按正确几何放在一起——值 $10^{5}$ 倍乃至更多，物理有机化学中的分子内模型反应对此已有展示。

## pH 的影响

大多数酶只在一个有限的 pH 范围内有活性，而 pH–速率曲线的形状揭示哪些可解离基团参加了催化。设酶（或 ES 复合物）存在于三种质子化状态：$\mathrm{EH_2 \rightleftharpoons EH + H^+}$，酸解离常数 $K_1$；$\mathrm{EH \rightleftharpoons E + H^+}$，常数 $K_2$；且只有单质子化的形式 EH 有活性。由 $[\mathrm{EH_2}] = [\mathrm{EH}][\mathrm{H^+}]/K_1$ 与 $[\mathrm{E}] = [\mathrm{EH}]K_2/[\mathrm{H^+}]$，处于活性形式的酶的比例为
$$
f_\mathrm{EH} = \frac{1}{1 + [\mathrm{H^+}]/K_1 + K_2/[\mathrm{H^+}]} = \frac{1}{1 + 10^{\mathrm{p}K_1 - \mathrm{pH}} + 10^{\mathrm{pH} - \mathrm{p}K_2}},
$$ {#eq-ph}
速率常数跟着它走：$k_\mathrm{obs} = k_\mathrm{max}f_\mathrm{EH}$。这就是[[biochemistry/water-noncovalent#prop-hh]]的亨德森-哈塞尔巴尔赫逻辑用两次。结果是一条钟形曲线，当 $\mathrm{p}K_1$ 与 $\mathrm{p}K_2$ 相隔足够远时，它的两侧在 $\mathrm{p}K_1$ 与 $\mathrm{p}K_2$ 处有拐点。$k_\mathrm{cat}/K_\mathrm{M}$ 的 pH 曲线报告游离酶与游离底物的电离；$k_\mathrm{cat}$ 的曲线报告 ES 复合物中的电离。

::: widget plot
f: 1/(1+10^(p-x)+10^(x-q))
x: 4, 12
y: 0, 1.05
sliders: p=6.8:4:9:0.1; q=9.0:7:11:0.1
labels: f_\mathrm{EH}
hlines: 0.5
caption: 处于活性质子化状态的酶的比例 $f_\mathrm{EH}$ 对 pH（横轴）作图，按[[#eq-ph]]，参数为 $\mathrm{p}K_1$（滑块 $p$）与 $\mathrm{p}K_2$（滑块 $q$）。起点值 6.8 与 9.0 是糜蛋白酶 $k_\mathrm{cat}/K_\mathrm{M}$ 曲线的典型值（酸性一侧是 His57，碱性一侧是 Ile16 的 α-氨基）。把两个 $\mathrm{p}K$ 移近：极大值跌到 1 以下，表观拐点不再与真实 $\mathrm{p}K$ 重合——这是 pH 曲线必须拟合、不能目测读数的一个原因。
:::

::: example 糜蛋白酶的 pH 曲线 {#ex-ph}
糜蛋白酶的 $k_\mathrm{cat}/K_\mathrm{M}$ 曲线可用[[#eq-ph]]拟合，得 $\mathrm{p}K_1 = 6.8$（His57 必须呈中性才能充当广义碱）与 $\mathrm{p}K_2 = 9.0$（Ile16 的 α-氨基必须质子化，才能与 Asp194 形成维持活性构象的盐桥）。计算 pH 7.4 时最大活性的分数，求最适 pH 并给出该处的分数。
::: solution
pH 7.4 时：$10^{6.8 - 7.4} = 10^{-0.6} = 0.251$，$10^{7.4 - 9.0} = 10^{-1.6} = 0.0251$，所以 $f_\mathrm{EH} = 1/(1 + 0.251 + 0.0251) = 0.78$。函数在 $10^{\mathrm{p}K_1 - \mathrm{pH}} + 10^{\mathrm{pH} - \mathrm{p}K_2}$ 最小处最大；令它对 pH 的导数为零得 $10^{\mathrm{p}K_1 - \mathrm{pH}} = 10^{\mathrm{pH} - \mathrm{p}K_2}$，故 $\mathrm{pH_{opt}} = (\mathrm{p}K_1 + \mathrm{p}K_2)/2 = 7.9$。该处两项都等于 $10^{-1.1} = 0.0794$，$f_\mathrm{EH} = 1/1.159 = 0.86$。即使在最适处，仍有 14 % 的酶处于失活的质子化状态，因为两个 $\mathrm{p}K$ 只相隔 2.2 个单位。小肠的消化环境在 pH 7–8 附近，正落在这一最适值旁边。
:::
:::

## 酶的调节

细胞不希望每种酶每时每刻都全力工作。途径必须根据需要同开同关，而开关主要有四类，各自在不同的时间尺度上起作用。

**别构调节**（毫秒）。许多位于途径起点的酶是寡聚体，在不同于活性位点的位点结合调节分子，并在低活性与高活性构象之间切换。它们的速率曲线是 S 形的而不是双曲线的，米氏方程不适用；为血红蛋白发展的[[biochemistry/protein-function#prop-mwc]]齐变模型描述它们。经典的例子是天冬氨酸转氨甲酰酶（ATCase），它催化嘧啶合成的第一个关键（committed）步骤：它被 CTP——该途径的终产物——所抑制（**反馈抑制**），被 ATP 所激活——ATP 是嘌呤充足、能量可用的信号。反馈抑制正是代谢途径在其关键步骤受调控的原因，这是[[biochemistry/glycolysis-citric-acid#def-control]]的主题。

**可逆共价修饰**（秒到分钟）。蛋白激酶把 ATP 的 γ-磷酰基转移到丝氨酸、苏氨酸或酪氨酸侧链上，磷酸酶再把它除去。加入的双阴离子磷酸基能形成新的盐桥与氢键，改变酶的构象。糖原磷酸化酶——从糖原动员葡萄糖的酶——响应激素信号，靠单个丝氨酸的磷酸化从活性较低的 *b* 形式切换到活性较高的 *a* 形式——这一发现开创了磷酸化信号转导的领域。

**蛋白水解激活**（不可逆）。消化蛋白酶以无活性前体即**酶原**的形式合成，以免消化制造它们的细胞。糜蛋白酶原在胰蛋白酶切开 Arg15 与 Ile16 之间的键时被激活。Ile16 新的 N 端 α-氨基转向内侧，与 Asp194 形成盐桥，使主链移动，建成氧负离子穴与 S1 口袋：一刀重建了活性位点，也解释了[[#ex-ph]]中 pH 曲线的碱性一侧。胰蛋白酶原本身在肠中由肠激酶激活，然后胰蛋白酶激活更多胰蛋白酶原与其他酶原，形成一个小级联。血液凝固是同类更长的级联。

**酶含量的控制**（小时）。基因表达与蛋白质降解设定 $[\mathrm{E}]_0$，因而设定 $V_\mathrm{max}$；**同工酶**——催化同一反应但 $K_\mathrm{M}$ 与调节性质不同的不同蛋白质——让不同组织微调同一步。肌肉的己糖激酶与肝的葡萄糖激酶以很不相同的 $K_\mathrm{M}$ 磷酸化葡萄糖，就是糖酵解中要讨论的例子。

::: history
酶作为一类物质被确认，远早于任何人知道它们是什么。帕扬（Anselme Payen）与佩索兹（Jean-François Persoz）1833 年浓缩出"淀粉酶"（diastase），即麦芽中消化淀粉的活性；毕希纳（Eduard Buchner）1897 年的无细胞发酵证明酶在细胞外也工作。埃米尔·费歇尔根据酵母酶区分立体异构糖的方式，1894 年提出了特异性的锁钥图像。维克托·亨利（Victor Henri）1902 年提出酶-底物复合物来解释饱和现象；米夏埃利斯与门滕 1913 年在控制的 pH 下测定转化酶水解蔗糖的初速率，给了速率方程标准形式；乔治·布里格斯（George Briggs）与霍尔丹（J. B. S. Haldane）1925 年用稳态取代了他们的平衡假设。酶是不是蛋白质，在萨姆纳（James Sumner）1926 年结晶出脲酶、诺思罗普（John Northrop）其后几年结晶出胃蛋白酶、胰蛋白酶与糜蛋白酶后尘埃落定；萨姆纳与诺思罗普分享 1946 年诺贝尔化学奖。莱内韦弗（Hans Lineweaver）与伯克（Dean Burk）1934 年发表他们的双倒数图。鲍林 1946 年提出酶与过渡态互补，科什兰（Daniel Koshland）1958 年提出诱导契合。哈特利（Brian Hartley）与基尔比（B. A. Kilby）1954 年在糜蛋白酶上看到爆发相；第一个酶结构——鸡蛋清溶菌酶——由戴维·菲利普斯（David Phillips）的小组于 1965 年解出；戴维·布洛（David Blow）的小组 1969 年描述了糜蛋白酶的催化三联体。拉德基茨卡（Annette Radzicka）与沃尔芬登（Richard Wolfenden）1995 年对乳清苷 5′-磷酸无催化脱羧的测定，给酶的效力报出了一个数字。
:::

## 后续内容

本章的动力学是本课程之后每一章都要使用的工具。[[biochemistry/glycolysis-citric-acid]]中糖酵解、糖异生与柠檬酸循环的受调控步骤，是远离平衡、受别构与共价修饰的酶；这里窥见的辅酶化学——NAD⁺、FAD、焦磷酸硫胺素、辅酶A——是[[biochemistry/bioenergetics]]与[[biochemistry/lipid-nitrogen-metabolism]]的主题。[[#prop-inhibition]]的抑制理论，连同 $K_\mathrm{I}$ 与 $\mathrm{IC_{50}}$ 的区分，是[[medicinal-chemistry/drug-targets]]与[[medicinal-chemistry/drug-binding]]的起点，在那里，大多数小分子药物原来是酶抑制剂，其中许多是过渡态类似物。催化循环与酸碱催化的一般理论在[[kinetics/homogeneous-catalysis]]，过渡态理论及其自由能关系在[[kinetics/transition-state-theory]]，而支撑丝氨酸蛋白酶机理的酰基转移的弯箭头化学在[[organic-2/carboxylic-derivatives]]。

::: summary
- 酶降低活化自由能但不改变平衡常数；速率每十倍在 $298\ \mathrm{K}$ 值 $RT\ln 10 = 5.7\ \mathrm{kJ\,mol^{-1}}$，速率增强等于底物与过渡态解离常数之比 $K_\mathrm{S}/K_\mathrm{T}$。
- 底物过量时的稳态下，$v_0 = k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$：低于 $K_\mathrm{M}$ 时对 $[\mathrm{S}]$ 一级，高于时为零级。
- $k_\mathrm{cat}$ 是饱和酶的转换数；$k_\mathrm{cat}/K_\mathrm{M}$ 是游离酶遇见底物的二级常数，是效率与特异性的真正度量，被扩散封顶在约 $10^{8}$–$10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。
- $K_\mathrm{M}$ 只在快平衡极限下等于底物解离常数；参数应拟合到双曲线，Lineweaver–Burk 图只用于诊断。
- 可逆抑制剂服从 $v_0 = V_\mathrm{max}[\mathrm{S}]/(\alpha K_\mathrm{M} + \alpha'[\mathrm{S}])$：竞争性抑制剂抬高 $K_\mathrm{M}^\mathrm{app}$，反竞争性抑制剂把 $V_\mathrm{max}$ 与 $K_\mathrm{M}$ 一起压低，混合性两者兼有；竞争性抑制剂的 $\mathrm{IC_{50}} = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$。
- 丝氨酸蛋白酶组合了共价催化（酰基酶）、广义酸碱催化（Asp–His–Ser 三联体）、过渡态稳定（氧负离子穴）与结合（决定特异性的 S1 口袋）。
- 钟形 pH 曲线揭示催化电离；酶受别构调节、共价修饰、酶原的蛋白水解激活以及酶含量控制来调节。
:::

## 习题

::: exercise 一个米氏速率 {level=1 check="90"}
一种酶 $V_\mathrm{max} = 120\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$，$K_\mathrm{M} = 0.50\ \mathrm{mmol\,dm^{-3}}$。$[\mathrm{S}] = 1.50\ \mathrm{mmol\,dm^{-3}}$ 时的初速率是多少？酶有多大比例处于 ES 复合物中？（速率以 $\mu\mathrm{mol\,dm^{-3}\,min^{-1}}$ 输入。）
::: solution
$v_0 = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 120 \times 1.50/(0.50 + 1.50) = 90\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$。以 ES 形式存在的酶的比例为 $v_0/V_\mathrm{max} = [\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 0.75$。在三倍 $K_\mathrm{M}$ 处酶四分之三饱和；要达到 99 % 饱和需要 $[\mathrm{S}] = 99K_\mathrm{M}$，这就是"$V_\mathrm{max}$"永远是外推值的原因。
:::
:::

::: exercise 转换数与效率 {level=1 check="2000"}
一份含 $20\ \mathrm{nmol\,dm^{-3}}$ 活性位点的制剂有 $V_\mathrm{max} = 4.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，$K_\mathrm{M} = 0.25\ \mathrm{mmol\,dm^{-3}}$。计算 $k_\mathrm{cat}$ 与 $k_\mathrm{cat}/K_\mathrm{M}$，并评论该酶是否接近扩散极限。（$k_\mathrm{cat}$ 以 $\mathrm{s^{-1}}$ 输入。）
::: solution
$k_\mathrm{cat} = V_\mathrm{max}/[\mathrm{E}]_0 = 4.0\times10^{-5}/(20\times10^{-9}) = 2.0\times10^{3}\ \mathrm{s^{-1}}$。于是 $k_\mathrm{cat}/K_\mathrm{M} = 2.0\times10^{3}/(2.5\times10^{-4}) = 8.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，比 $10^{8}$–$10^{9}$ 的扩散上限低一到两个数量级：一把好手酶，但限制其效率的仍是化学步骤（或一个构象步骤），而不是相遇。
:::
:::

::: exercise 由参数读出抑制类型 {level=1}
对每种抑制剂，指出可逆抑制的类型及其结合的酶形式。(a) $V_\mathrm{max}$ 不变，$K_\mathrm{M}^\mathrm{app}$ 增为三倍。(b) $V_\mathrm{max}$ 与 $K_\mathrm{M}^\mathrm{app}$ 都减半。(c) $V_\mathrm{max}$ 减半，$K_\mathrm{M}$ 不变。(d) $V_\mathrm{max}$ 减半，$K_\mathrm{M}^\mathrm{app}$ 加倍。
::: solution
用[[#prop-inhibition]]的 $V_\mathrm{max}^\mathrm{app} = V_\mathrm{max}/\alpha'$ 与 $K_\mathrm{M}^\mathrm{app} = (\alpha/\alpha')K_\mathrm{M}$。(a) $\alpha' = 1$，$\alpha = 3$：竞争性，只结合游离 E。(b) $\alpha' = 2$，$\alpha/\alpha' = 1/2$ 故 $\alpha = 1$：反竞争性，只结合 ES。(c) $\alpha' = 2$ 且 $\alpha/\alpha' = 1$，故 $\alpha = 2$：纯非竞争性，以相同亲和力结合 E 与 ES（$K_\mathrm{I} = K_\mathrm{I}'$）。(d) $\alpha' = 2$ 且 $\alpha = 4$：混合性，结合游离 E 比 ES 更紧（$K_\mathrm{I} = [\mathrm{I}]/3$，$K_\mathrm{I}' = [\mathrm{I}]$）。
:::
:::

::: exercise 一种酶，两种底物 {level=2 check="40"}
一种蛋白酶切割两种肽 A 与 B，$k_\mathrm{cat}/K_\mathrm{M}$ 分别为 $2.0\times10^{6}$ 与 $5.0\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。若两者以相同浓度共存，A 被切割的速率是 B 的多少倍？证明答案与酶是否饱和无关。（比值 $v_\mathrm{A}/v_\mathrm{B}$ 输入。）
::: hint
把两个反应的稳态速率都用*游离*酶的浓度写出来，它对两者是同一个。
:::
::: solution {#ex-competing-substrates}
对每种底物，稳态给出 $[\mathrm{EX}] = [\mathrm{E}][\mathrm{X}]/K_\mathrm{M,X}$，故 $v_\mathrm{X} = k_\mathrm{cat,X}[\mathrm{EX}] = (k_\mathrm{cat}/K_\mathrm{M})_\mathrm{X}[\mathrm{E}][\mathrm{X}]$。守恒式 $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{EA}] + [\mathrm{EB}]$ 决定 $[\mathrm{E}]$，但无论它取何值，它对两个速率都是公共的、在比值中相消，于是得到[[#eq-competing]]：等浓度时 $v_\mathrm{A}/v_\mathrm{B} = (2.0\times10^{6})/(5.0\times10^{4}) = 40$。饱和降低 $[\mathrm{E}]$ 因而降低两个速率，但不降低其比。这正是为什么 $k_\mathrm{cat}/K_\mathrm{M}$——而不是单独的 $k_\mathrm{cat}$ 或 $K_\mathrm{M}$——被称为专一性常数。
:::
:::

::: exercise 从 IC₅₀ 求 Kᵢ {level=2 check="1"}
一个竞争性抑制剂在 $[\mathrm{S}] = 2K_\mathrm{M}$ 的测定中给出 $\mathrm{IC_{50}} = 3.0\ \mu\mathrm{mol\,dm^{-3}}$。从[[#eq-mixed]]导出[[#eq-cheng]]的 Cheng–Prusoff 关系并计算 $K_\mathrm{I}$。若在 $[\mathrm{S}] = 10K_\mathrm{M}$ 下做测定的实验室会报告多大的 $\mathrm{IC_{50}}$？（$K_\mathrm{I}$ 以 $\mu\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
竞争性抑制时 $v_0 = V_\mathrm{max}[\mathrm{S}]/(\alpha K_\mathrm{M} + [\mathrm{S}])$。要使无抑制速率减半需要 $\alpha K_\mathrm{M} + [\mathrm{S}] = 2(K_\mathrm{M} + [\mathrm{S}])$，故 $(\alpha - 1)K_\mathrm{M} = K_\mathrm{M} + [\mathrm{S}]$，即 $[\mathrm{I}]/K_\mathrm{I} = 1 + [\mathrm{S}]/K_\mathrm{M}$，做到这一点的 $[\mathrm{I}]$ 就是 $\mathrm{IC_{50}} = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$。这里 $K_\mathrm{I} = 3.0/(1 + 2) = 1.0\ \mu\mathrm{mol\,dm^{-3}}$。在 $[\mathrm{S}] = 10K_\mathrm{M}$ 下，同一抑制剂给出 $\mathrm{IC_{50}} = 1.0 \times 11 = 11\ \mu\mathrm{mol\,dm^{-3}}$——一个看起来更弱、其实完全相同的化合物。
:::
:::

::: exercise 酸性一侧的活性 {level=2 check="0.137"}
用[[#eq-ph]]，取 $\mathrm{p}K_1 = 6.8$、$\mathrm{p}K_2 = 9.0$，计算 pH 6.0 时糜蛋白酶处于活性质子化状态的比例。是哪个残基负责活性的丢失？（比例保留三位有效数字输入。）
::: solution
$10^{6.8 - 6.0} = 10^{0.8} = 6.31$，$10^{6.0 - 9.0} = 0.001$，所以 $f_\mathrm{EH} = 1/(1 + 6.31 + 0.001) = 0.137$。活性丢失缘于 His57 的质子化（$\mathrm{p}K_\mathrm{a} \approx 6.8$）：作为咪唑鎓离子，它不能再在[[#algo-serine]]第 2 步中接受丝氨酸羟基的质子，所以不能充当广义碱。
:::
:::

::: exercise Smoluchowski 极限 {level=2 check="1.66"}
估计一个酶（$D_\mathrm{E} = 1.0\times10^{-10}\ \mathrm{m^2\,s^{-1}}$）与一个小底物（$D_\mathrm{S} = 1.0\times10^{-9}\ \mathrm{m^2\,s^{-1}}$）在 $2.0\ \mathrm{nm}$ 间距上接触即反应时的扩散控制相遇速率常数[[#eq-smol]]。为什么完美酶实测的 $k_\mathrm{cat}/K_\mathrm{M}$ 要小十到一百倍？（$k_\mathrm{d}$ 以 $10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 为单位输入。）
::: solution
$k_\mathrm{d} = 4\pi(6.022\times10^{23}\ \mathrm{mol^{-1}})(1.1\times10^{-9}\ \mathrm{m^2\,s^{-1}})(2.0\times10^{-9}\ \mathrm{m}) = 1.66\times10^{7}\ \mathrm{m^3\,mol^{-1}\,s^{-1}}$；乘以 $10^{3}\ \mathrm{dm^3\,m^{-3}}$ 得 $1.66\times10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。公式假定两个球的整个表面在所有取向下都有反应性。实际上活性位点只占酶表面的一小部分，且底物必须以特定取向到达，这使有效速率降低一到两个数量级；静电导航（如超氧化物歧化酶与乙酰胆碱酯酶那样）能部分补回来。
:::
:::

::: exercise 混合抑制直线的交点 {level=3 #exr-intersection}
对服从[[#eq-mixed]]的混合性抑制剂，证明有、无抑制剂的 Lineweaver–Burk 直线交于
$$
\frac{1}{[\mathrm{S}]} = -\frac{K_\mathrm{I}}{K_\mathrm{I}'}\cdot\frac{1}{K_\mathrm{M}}, \qquad \frac{1}{v_0} = \frac{1}{V_\mathrm{max}}\left(1 - \frac{K_\mathrm{I}}{K_\mathrm{I}'}\right),
$$
与 $[\mathrm{I}]$ 无关。由此推出竞争性、纯非竞争性以及 $K_\mathrm{I} < K_\mathrm{I}'$ 的混合性抑制剂的交点位置，并解释反竞争性的直线为什么永不相交。
::: hint
把 $1/v_0 = (\alpha K_\mathrm{M}/V_\mathrm{max})x + \alpha'/V_\mathrm{max}$ 写成 $x = 1/[\mathrm{S}]$ 的函数，令 $\alpha, \alpha'$ 的表达式与 $\alpha = \alpha' = 1$ 的表达式相等，并用 $(\alpha - 1)/(\alpha' - 1) = K_\mathrm{I}'/K_\mathrm{I}$。
:::
::: solution
以 $x = 1/[\mathrm{S}]$，有抑制剂的直线为 $y = (\alpha K_\mathrm{M}x + \alpha')/V_\mathrm{max}$，无抑制剂的为 $y = (K_\mathrm{M}x + 1)/V_\mathrm{max}$。令两者相等，$(\alpha - 1)K_\mathrm{M}x = -(\alpha' - 1)$。由于 $\alpha - 1 = [\mathrm{I}]/K_\mathrm{I}$、$\alpha' - 1 = [\mathrm{I}]/K_\mathrm{I}'$，抑制剂浓度相消：
$$
x = -\frac{\alpha' - 1}{(\alpha - 1)K_\mathrm{M}} = -\frac{K_\mathrm{I}}{K_\mathrm{I}'K_\mathrm{M}}, \qquad y = \frac{K_\mathrm{M}x + 1}{V_\mathrm{max}} = \frac{1}{V_\mathrm{max}}\left(1 - \frac{K_\mathrm{I}}{K_\mathrm{I}'}\right).
$$
因为这个点不依赖 $[\mathrm{I}]$，一族中的所有直线共享它。竞争性：$K_\mathrm{I}' \to \infty$，故 $x \to 0$、$y = 1/V_\mathrm{max}$——直线交于 $1/v_0$ 轴。纯非竞争性：$K_\mathrm{I} = K_\mathrm{I}'$，故 $x = -1/K_\mathrm{M}$、$y = 0$——交于 $1/[\mathrm{S}]$ 轴。$K_\mathrm{I} < K_\mathrm{I}'$（优先结合 E）的混合性：$-1/K_\mathrm{M} < x < 0$ 且 $y > 0$——交于第二象限、$1/[\mathrm{S}]$ 轴之上；$K_\mathrm{I} > K_\mathrm{I}'$ 时交于其下。反竞争性：$\alpha = 1$，所以斜率 $K_\mathrm{M}/V_\mathrm{max}$ 对所有 $[\mathrm{I}]$ 相同（形式上 $K_\mathrm{I} \to \infty$ 把交点送到无穷远）：平行线。
:::
:::

::: exercise 过渡态的亲和力 {level=3 check="62.8"}
一种酶对某反应的 $k_\mathrm{cat} = 1.0\times10^{3}\ \mathrm{s^{-1}}$、$K_\mathrm{M} = 0.10\ \mathrm{mmol\,dm^{-3}}$，该反应无催化时的速率常数在 $298.15\ \mathrm{K}$ 为 $1.0\times10^{-8}\ \mathrm{s^{-1}}$。(a) 酶把活化自由能降低了多少？(b) 假设 $K_\mathrm{M} \approx K_\mathrm{S}$，估计酶-过渡态复合物的解离常数。(c) 一个只捕获该酶过渡态结合自由能 50 % 的过渡态类似物，其解离常数是多少？（(a) 的答案以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: hint
用[[#eq-ddg]]与[[#eq-ts]]；(c) 中"结合自由能的一半"指 $\Delta G_\mathrm{bind} = \tfrac12 RT\ln K_\mathrm{T}$，即以 $\mathrm{mol\,dm^{-3}}$ 为单位的 $K_\mathrm{T}$ 的平方根。
:::
::: solution
(a) $k_\mathrm{cat}/k_\mathrm{non} = 1.0\times10^{11}$，故 $\Delta\Delta^\ddagger G = (8.314)(298.15)\ln(10^{11}) = 62.8\ \mathrm{kJ\,mol^{-1}}$（即 $11 \times 5.71$）。(b) $K_\mathrm{T} = K_\mathrm{S}k_\mathrm{non}/k_\mathrm{cat} = (1.0\times10^{-4})(1.0\times10^{-8})/(1.0\times10^{3}) = 1.0\times10^{-15}\ \mathrm{mol\,dm^{-3}}$，结合自由能为 $RT\ln K_\mathrm{T} = -85.6\ \mathrm{kJ\,mol^{-1}}$。(c) 其一半 $-42.8\ \mathrm{kJ\,mol^{-1}}$ 对应 $K = \sqrt{10^{-15}} = 3.2\times10^{-8}\ \mathrm{mol\,dm^{-3}}$——一个 $30\ \mathrm{nmol\,dm^{-3}}$ 的抑制剂，比底物紧约 3000 倍。真实的过渡态类似物只捕获过渡态相互作用的一部分，但那一部分往往已足够做出一个强效抑制剂。
:::
:::

::: exercise 酰基酶机理的动力学 {level=3}
对方程 $\mathrm{E + S \rightleftharpoons ES} \xrightarrow{k_2} \mathrm{EA + P_1}$、$\mathrm{EA} \xrightarrow{k_3} \mathrm{E + P_2}$（EA 为酰基酶，P₁ 为胺或醇，P₂ 为酸），设 $K_\mathrm{S} = [\mathrm{E}][\mathrm{S}]/[\mathrm{ES}]$ 处于平衡、EA 处于稳态，证明稳态速率具有米氏形式，且
$$
k_\mathrm{cat} = \frac{k_2k_3}{k_2 + k_3}, \qquad K_\mathrm{M} = K_\mathrm{S}\frac{k_3}{k_2 + k_3}.
$$
解释为什么对 $k_2 \gg k_3$ 的酯底物，$k_\mathrm{cat} \approx k_3$，饱和时大部分酶以酰基酶存在，$K_\mathrm{M}$ 远小于 $K_\mathrm{S}$，并且观察到爆发相。
::: hint
写出 $[\mathrm{ES}] = [\mathrm{E}][\mathrm{S}]/K_\mathrm{S}$ 与 $k_2[\mathrm{ES}] = k_3[\mathrm{EA}]$，再用 $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}] + [\mathrm{EA}]$；速率为 $v = k_3[\mathrm{EA}] = k_2[\mathrm{ES}]$。
:::
::: solution
由 EA 的稳态，$[\mathrm{EA}] = (k_2/k_3)[\mathrm{ES}]$；由结合平衡，$[\mathrm{E}] = K_\mathrm{S}[\mathrm{ES}]/[\mathrm{S}]$。于是
$$
[\mathrm{E}]_0 = [\mathrm{ES}]\left(\frac{K_\mathrm{S}}{[\mathrm{S}]} + 1 + \frac{k_2}{k_3}\right) = [\mathrm{ES}]\,\frac{k_2 + k_3}{k_3}\left(\frac{K_\mathrm{S}k_3}{(k_2 + k_3)[\mathrm{S}]} + 1\right).
$$
故 $v = k_2[\mathrm{ES}] = \dfrac{k_2k_3}{k_2 + k_3}\cdot\dfrac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{S}k_3/(k_2 + k_3) + [\mathrm{S}]}$，即带上述 $k_\mathrm{cat}$ 与 $K_\mathrm{M}$ 的米氏形式。若 $k_2 \gg k_3$：$k_\mathrm{cat} \to k_3$（脱酰限制转换）；饱和时 $[\mathrm{EA}]/[\mathrm{ES}] = k_2/k_3 \gg 1$，酶大量积累为酰基酶；$K_\mathrm{M} = K_\mathrm{S}k_3/(k_2 + k_3) \ll K_\mathrm{S}$，因为积累的 EA 从结合平衡中抽走酶，使酶在更低的底物浓度就达到半饱和（即[[#warn-km]]中提到过的情形）。混合之初，每个活性位点都以快速率 $k_2$ 酰化一次，在慢脱酰使转换开始之前各释放一个 $\mathrm{P_1}$：这就是[[#ex-burst]]的爆发相，其幅度在这一极限下趋近 $[\mathrm{E}]_0$。对酰胺底物，酰化通常是限速的（$k_2 \ll k_3$），$k_\mathrm{cat} \approx k_2$，看不到爆发相。
:::
:::
