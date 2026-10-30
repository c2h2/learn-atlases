在你头顶约 $15$–$35\ \mathrm{km}$ 处横着一层气体：若把它搬到地面 $0\ \mathrm{°C}$、$1\ \mathrm{atm}$ 之处，它只有约三毫米厚。这就是臭氧层，也是陆地生命得以存在的原因：臭氧几乎吸收全部 $290\ \mathrm{nm}$ 以下的太阳紫外——那种辐射能量之高，足以打断 DNA 和蛋白质中的化学键。它还加热平流层，造成把它与下方的天气分隔开来的逆温。1985 年，英国南极调查局的一个团队报告：自 1970 年代后期以来，每个南极春季，其站址上空的臭氧柱总量有三分之一以上消失了；三年内，实验室动力学、飞机观测和大气模型就把这一损失归因于工业氯氟烃和哈龙释放的氯与溴。本章讲的就是几十亿分之几的氯如何毁灭百万分之几的臭氧——这是光化学（[[kinetics/photochemistry]]）、链反应（[[kinetics/chain-reactions]]）以及云粒子上多相化学之惊人威力的一课——以及国际社会的回应，1987 年的《蒙特利尔议定书》。

## 臭氧与紫外光

到达大气顶的太阳辐射包含紫外光，惯例分为 **UVC**（$100$–$280\ \mathrm{nm}$）、**UVB**（$280$–$315\ \mathrm{nm}$）和 **UVA**（$315$–$400\ \mathrm{nm}$）。氧分子在约 $200\ \mathrm{nm}$ 以下强烈吸收（舒曼-龙格带及其连续区），并弱吸收直至 $242\ \mathrm{nm}$（赫茨伯格连续区）。$200$ 到 $300\ \mathrm{nm}$ 之间只有臭氧把关，靠的是它的**哈特利带**——任何大气气体最强的吸收带之一，吸收截面在 $255\ \mathrm{nm}$ 附近达到 $1.1\times10^{-17}\ \mathrm{cm^2}$ 的峰值，长波一侧每 $15$–$20\ \mathrm{nm}$ 约降十倍（**哈金斯带**，$310$–$360\ \mathrm{nm}$）。UVB 波段因此是臭氧不再不透明的"边缘"，也是对臭氧变化最敏感的波段。

::: definition 柱总量与道森单位 {#def-dobson}
臭氧**柱总量**是单位地面面积上方的臭氧分子数 $N = \int_0^\infty n_{\mathrm{O_3}}(z)\,\mathrm{d}z$。它以**道森单位**（DU）报告：$1\ \mathrm{DU}$ 是能在 $273.15\ \mathrm{K}$、$1\ \mathrm{atm}$ 下形成 $10\ \mathrm{\mu m}$ 厚纯臭氧层的柱量，等于
$$
1\ \mathrm{DU} = 2.687\times10^{16}\ \text{个分子}\ \mathrm{cm^{-2}}
$$
（洛施密特数 $2.687\times10^{19}\ \mathrm{cm^{-3}}$ 乘以 $10^{-3}\ \mathrm{cm}$）。全球平均柱总量约 $300\ \mathrm{DU}$，从热带的约 $250\ \mathrm{DU}$ 到春季高纬的 $400\ \mathrm{DU}$ 以上。**臭氧洞**按惯例指柱总量低于 $220\ \mathrm{DU}$ 的区域，这一数值在 1979 年之前极少观测到。
:::

::: proposition 紫外经臭氧柱的透射 {#prop-transmission}
对波长 $\lambda$、垂直穿过臭氧柱 $N$（分子 $\mathrm{cm^{-2}}$）的光束，吸收截面为 $\sigma(\lambda)$（$\mathrm{cm^2}$），忽略散射和其它吸收体，透射份额为
$$
T(\lambda) = \exp\!\left[-\sigma(\lambda)N\right],
$$
即分子形式的朗伯-比尔定律（以 $e$ 为底，因为 $\sigma$ 是按自然对数定义的截面）。太阳天顶角 $\theta$ 的斜程使柱量乘以 $\sec\theta$。要紧的是**光学厚度** $\tau = \sigma N$：柱量的相对变化 $\delta N/N$ 把透射紫外改变 $\exp(-\sigma\,\delta N)$ 倍，所以小幅臭氧损失对应的紫外相对增幅约为 $\tau\,\lvert\delta N\rvert/N$——在 $\tau$ 为数个单位的波长处最大。
:::

::: proof 从吸收截面到透射率 {#proof-transmission}
在单位面积含 $n\,\mathrm{d}z$ 个吸收体的薄层 $\mathrm{d}z$ 里，每个吸收体遮住有效面积 $\sigma$，被移走的光子份额为 $\sigma n\,\mathrm{d}z$，故 $\mathrm{d}I = -\sigma n I\,\mathrm{d}z$。在 $\sigma$ 恒定（忽略温度依赖）下对整柱积分得 $\ln(I/I_0) = -\sigma\int n\,\mathrm{d}z = -\sigma N$。对小变化 $\delta N$，$T(N + \delta N)/T(N) = e^{-\sigma\,\delta N} \approx 1 - \sigma\,\delta N$；把 $\sigma\,\delta N$ 写成 $\tau\,\delta N/N$ 即得所述的灵敏度。与 [[kinetics/photochemistry]] 的实验室形式 $A = \varepsilon c\ell$ 对照：$\sigma$ 以 $\mathrm{cm^2}$ 计时 $\varepsilon = \sigma N_\mathrm{A}/(1000\ln10)$。
:::

::: example 臭氧层有多不透明？ {#ex-opacity}
取 $300\ \mathrm{DU}$ 的垂直柱。估算 $255\ \mathrm{nm}$（$\sigma = 1.1\times10^{-17}\ \mathrm{cm^2}$）和 $300\ \mathrm{nm}$（$\sigma \approx 3.9\times10^{-19}\ \mathrm{cm^2}$）处的透射率，以及柱量下降 $10\ \%$ 时 $300\ \mathrm{nm}$ 辐射的百分数增幅。
::: solution
柱量为 $N = 300\times2.687\times10^{16} = 8.06\times10^{18}\ \mathrm{cm^{-2}}$。$255\ \mathrm{nm}$ 处：$\tau = 1.1\times10^{-17}\times8.06\times10^{18} = 89$，故 $T = e^{-89} \approx 3\times10^{-39}$——什么都穿不过来。$300\ \mathrm{nm}$ 处：$\tau = 3.9\times10^{-19}\times8.06\times10^{18} = 3.1$，$T = e^{-3.1} = 0.043$，约 $4\ \%$。$N$ 降到 $270\ \mathrm{DU}$ 时 $\tau = 2.83$、$T = 0.059$：比值为 $e^{0.31} = 1.37$，即臭氧损失 $10\ \%$ 使 $300\ \mathrm{nm}$ 紫外**增加 $37\ \%$**。放大因子 $\approx\tau = 3.1$，正是[[#prop-transmission]]的预言。$320\ \mathrm{nm}$ 处 $\tau$ 远小于 $1$，同样的臭氧损失只使紫外变化几个百分点。这就是为什么光谱中生物危害最大的部分——向短波加权的 UVB——对臭氧如此敏感，而 UVA 几乎不受影响。
:::
:::

::: widget plot
f: exp(-s*x*0.02687); exp(-s2*x*0.02687)
x: 100, 500
y: 0, 0.2
sliders: s=3.9:0.5:10:0.1; s2=1.1:0.2:5:0.1
labels: T(\lambda_1); T(\lambda_2)
caption: 垂直紫外透射份额对臭氧柱总量（道森单位）的曲线，$T = \exp(-\sigma N)$，取两个波长，其吸收截面由滑块以 $10^{-19}\ \mathrm{cm^2}$ 为单位设定（初始值：$3.9$ 对应约 $300\ \mathrm{nm}$，$1.1$ 对应约 $315\ \mathrm{nm}$）。把柱量从 $300$ 拖到南极深臭氧洞的 $100$–$150\ \mathrm{DU}$，比较两条曲线的相对变化：吸收越强的波长，对同样的臭氧损失按比例的响应大得多。
:::

## 查普曼机理

1930 年，查普曼（Chapman）提出，臭氧层由只涉及氧的四个反应生成和毁灭：
$$
\begin{aligned}
&(1)\quad \mathrm{O_2} + h\nu\ (\lambda < 242\ \mathrm{nm}) \rightarrow \mathrm{O} + \mathrm{O} && J_1\\
&(2)\quad \mathrm{O} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{O_3} + \mathrm{M} && k_2\\
&(3)\quad \mathrm{O_3} + h\nu\ (\lambda < 1180\ \mathrm{nm}) \rightarrow \mathrm{O_2} + \mathrm{O} && J_3\\
&(4)\quad \mathrm{O} + \mathrm{O_3} \rightarrow 2\,\mathrm{O_2} && k_4
\end{aligned}
$$
这里 $\mathrm{M}$ 是任何第三体（$\mathrm{N_2}$ 或 $\mathrm{O_2}$），带走新生臭氧的多余能量；$J$ 值是一级光解速率系数（$\mathrm{s^{-1}}$）——吸收截面、量子产率与光化通量之积对波长的积分。反应 (1) 要求光子能量超过 $\mathrm{O{=}O}$ 键能 $498\ \mathrm{kJ\,mol^{-1}}$，即 $240\ \mathrm{nm}$（见[[#ex-thresholds]]）；反应 (3) 生成基态 $\mathrm{O(^3P)}$ 只需约 $100\ \mathrm{kJ\,mol^{-1}}$，但在约 $320\ \mathrm{nm}$ 以下会产生激发原子 $\mathrm{O(^1D)}$，这在对流层中重要至极（[[environmental-chemistry/tropospheric-chemistry]]）。

反应 (2) 和 (3) 极快，只在 $\mathrm{O}$ 与 $\mathrm{O_3}$ 之间来回搬运氧原子。于是定义**奇数氧** $\mathrm{O_x} = \mathrm{O} + \mathrm{O_3}$ 就很自然：反应 (1) 生成两个奇数氧，反应 (4) 毁灭两个，(2) 和 (3) 只是使二者相互转化。由于平流层中 $[\mathrm{O}] \ll [\mathrm{O_3}]$，奇数氧基本上就是臭氧。

::: proposition 查普曼稳态 {#prop-chapman}
阳光下，纯氧机理 (1)–(4) 在 $\mathrm{O}$ 与 $\mathrm{O_x}$ 的共同稳态下给出
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{J_3}{k_2[\mathrm{O_2}][\mathrm{M}]},
\qquad
[\mathrm{O_3}] = [\mathrm{O_2}]\left(\frac{J_1\,k_2\,[\mathrm{M}]}{J_3\,k_4}\right)^{1/2} .
$$
第一个比值由快循环 (2)–(3) 决定，几分之一秒内即可建立；第二个由奇数氧的慢生成 (1) 与慢损失 (4) 决定，奇数氧在低平流层的寿命为数周，在 $40\ \mathrm{km}$ 以上为数小时到一天。条件：白天、光化学稳态（忽略输送）、无催化损失循环。
:::

::: proof 查普曼机理的稳态分析 {#proof-chapman}
速率方程为
$$
\begin{aligned}
\frac{\mathrm{d}[\mathrm{O}]}{\mathrm{d}t} &= 2J_1[\mathrm{O_2}] - k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] + J_3[\mathrm{O_3}] - k_4[\mathrm{O}][\mathrm{O_3}],\\
\frac{\mathrm{d}[\mathrm{O_3}]}{\mathrm{d}t} &= k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] - J_3[\mathrm{O_3}] - k_4[\mathrm{O}][\mathrm{O_3}] .
\end{aligned}
$$
第一式中，$k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}]$ 与 $J_3[\mathrm{O_3}]$ 远大于其余两项，所以 $\mathrm{O}$ 的稳态条件化为 $k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] \approx J_3[\mathrm{O_3}]$，即第一个结果。两式相加得奇数氧收支
$$
\frac{\mathrm{d}[\mathrm{O_x}]}{\mathrm{d}t} = 2J_1[\mathrm{O_2}] - 2k_4[\mathrm{O}][\mathrm{O_3}] ,
$$
其中快项精确相消。稳态时 $J_1[\mathrm{O_2}] = k_4[\mathrm{O}][\mathrm{O_3}]$；代入 $[\mathrm{O}] = J_3[\mathrm{O_3}]/(k_2[\mathrm{O_2}][\mathrm{M}])$，
$$
J_1[\mathrm{O_2}] = \frac{k_4 J_3[\mathrm{O_3}]^2}{k_2[\mathrm{O_2}][\mathrm{M}]}
\quad\Longrightarrow\quad
[\mathrm{O_3}]^2 = \frac{J_1 k_2[\mathrm{O_2}]^2[\mathrm{M}]}{J_3 k_4},
$$
开平方即得结果。这是 [[kinetics/reaction-mechanisms]] 的准稳态近似在两个不同时间尺度上的两次应用。
:::

查普曼结果解释了为什么存在一个*层*。向上，$J_1$ 迅速增大（更多短波紫外得以穿透），而 $[\mathrm{O_2}]$ 和 $[\mathrm{M}]$ 依标高指数下降（[[environmental-chemistry/earth-system-chemistry#prop-barometric]]）。生成率 $J_1[\mathrm{O_2}]$ 因此在 $242\ \mathrm{nm}$ 以下的紫外恰好耗尽的高度达到峰值——按数密度约在 $25$–$30\ \mathrm{km}$，按混合比则更高。其下所余紫外太少；其上氧太少。

::: example 30 km 处的查普曼臭氧 {#ex-chapman-30}
$30\ \mathrm{km}$ 处取 $T = 227\ \mathrm{K}$、$p = 12.0\ \mathrm{hPa}$、$J_1 = 1\times10^{-11}\ \mathrm{s^{-1}}$、$J_3 = 1\times10^{-3}\ \mathrm{s^{-1}}$（示意性的正午值），速率常数取 JPL 表达式 $k_2 = 6.0\times10^{-34}(T/300)^{-2.4}\ \mathrm{cm^6\,s^{-1}}$ 与 $k_4 = 8.0\times10^{-12}\exp(-2060/T)\ \mathrm{cm^3\,s^{-1}}$。求 $[\mathrm{O_3}]$、其混合比和 $[\mathrm{O}]/[\mathrm{O_3}]$。
::: solution
$[\mathrm{M}] = p/(k_\mathrm{B}T) = 1200\ \mathrm{Pa}/(1.3806\times10^{-23}\times227) = 3.83\times10^{23}\ \mathrm{m^{-3}} = 3.83\times10^{17}\ \mathrm{cm^{-3}}$，且 $[\mathrm{O_2}] = 0.2095[\mathrm{M}] = 8.02\times10^{16}\ \mathrm{cm^{-3}}$。速率常数为 $k_2 = 6.0\times10^{-34}\times(0.757)^{-2.4} = 1.17\times10^{-33}\ \mathrm{cm^6\,s^{-1}}$，$k_4 = 8.0\times10^{-12}\,e^{-9.07} = 9.2\times10^{-16}\ \mathrm{cm^3\,s^{-1}}$。于是
$$
[\mathrm{O_3}] = 8.02\times10^{16}\left(\frac{10^{-11}\times1.17\times10^{-33}\times3.83\times10^{17}}{10^{-3}\times9.2\times10^{-16}}\right)^{1/2}
= 8.02\times10^{16}\times7.0\times10^{-5} = 5.6\times10^{12}\ \mathrm{cm^{-3}},
$$
混合比为 $5.6\times10^{12}/3.83\times10^{17} = 15\ \mathrm{ppm}$。又
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{10^{-3}}{1.17\times10^{-33}\times8.02\times10^{16}\times3.83\times10^{17}} = 2.8\times10^{-5},
$$
故 $[\mathrm{O}] \approx 1.6\times10^{8}\ \mathrm{cm^{-3}}$——证实奇数氧绝大部分是臭氧。观测到的 $30\ \mathrm{km}$ 臭氧约为 $3$–$4\times10^{12}\ \mathrm{cm^{-3}}$（约 $8$–$10\ \mathrm{ppm}$）：查普曼在此高估约两倍，更高处高估更多。必定另有东西在毁灭奇数氧。（这一答案有几十个百分点的不确定度，因为 $J_1$ 和 $J_3$ 强烈依赖高度、纬度和太阳角度，但这一偏差在输入参数的任何改进下依然存在。）
:::
:::

奇数氧收支是 $\mathrm{d}x/\mathrm{d}t = P - Lx^2$ 型的生成-损失方程，损失之所以是二次的，因为反应 (4) 消耗的本身就是处于固定比例的两个奇数氧。取无量纲形式——$x$ 以其稳态值为单位，时间以 $1/\sqrt{PL}$ 为单位——它就化为 $\mathrm{d}y/\mathrm{d}t = 1 - y^2$，其从 $y = 0$ 出发的解为 $\tanh t$。

::: widget odesolver
f: 1 - y^2
y0: 0
t: 0, 4
exact: tanh(t)
h: 0.5
caption: 奇数氧从零起向查普曼稳态增长，无量纲形式 $\mathrm{d}y/\mathrm{d}t = 1 - y^2$（生成恒定，损失二次）。精确解是 $\tanh t$；步长滑块比较欧拉法、海恩（Heun）法与 RK4。与一级箱的指数趋近不同，二次损失的趋近先慢后陡；又因为光化学弛豫时间 $1/\sqrt{PL}$ 在低平流层为数周，那里的臭氧尚未达到光化学稳态就被风搬来搬去——这就是为什么最大的柱总量出现在高纬度，远离热带的源区。
:::

## 催化循环

缺失的汇在 1950 至 1974 年间被认定为一族**催化循环**：自由基 $\mathrm{X}$ 在其中毁灭奇数氧而自己不被消耗：
$$
\begin{aligned}
\mathrm{X} + \mathrm{O_3} &\rightarrow \mathrm{XO} + \mathrm{O_2}\\
\mathrm{XO} + \mathrm{O} &\rightarrow \mathrm{X} + \mathrm{O_2}\\
\hline
\text{净:}\quad \mathrm{O} + \mathrm{O_3} &\rightarrow 2\,\mathrm{O_2}
\end{aligned}
$$
净反应就是查普曼的反应 (4)，但催化途径快得多。要紧的催化剂族有四个：$\mathrm{HO_x}$（$\mathrm{X = H, OH}$；来自水和甲烷的氧化）、$\mathrm{NO_x}$（$\mathrm{X = NO}$；来自氧化亚氮，经由 $\mathrm{N_2O + O(^1D) \rightarrow 2\,NO}$）、$\mathrm{ClO_x}$（$\mathrm{X = Cl}$；来自含氯源气体的光解）和 $\mathrm{BrO_x}$（$\mathrm{X = Br}$；来自甲基溴和哈龙）。

::: proposition 催化循环的速率与链长 {#prop-catalytic}
对上述两步循环，$[\mathrm{X}]$ 与 $[\mathrm{XO}]$ 互处稳态，则奇数氧的毁灭速率为
$$
-\frac{\mathrm{d}[\mathrm{O_x}]}{\mathrm{d}t} = 2k_b[\mathrm{XO}][\mathrm{O}],
$$
其中 $k_b$ 是**决速**步 $\mathrm{XO + O}$ 的速率常数（两步中较慢的一步，因为 $[\mathrm{O}] \ll [\mathrm{O_3}]$）。两者的分配为 $[\mathrm{X}]/[\mathrm{XO}] = k_b[\mathrm{O}]/(k_a[\mathrm{O_3}])$。与查普曼损失 $2k_4[\mathrm{O}][\mathrm{O_3}]$ 相比，催化损失快
$$
\frac{k_b[\mathrm{XO}]}{k_4[\mathrm{O_3}]},
$$
这一因子尽管 $[\mathrm{XO}]/[\mathrm{O_3}] \sim 10^{-4}$，却可以超过 $1$，因为 $k_b/k_4 \sim 10^{4}$–$10^{5}$。**链长**——$\mathrm{X}$ 转化为失活的**储库**物种之前完成的循环数——等于循环速率除以终止速率，氯的典型值为 $10^{3}$–$10^{5}$。
:::

::: proof 催化剂对的稳态 {#proof-catalytic}
以 $k_a$ 记 $\mathrm{X + O_3}$，以 $k_b$ 记 $\mathrm{XO + O}$。总量 $[\mathrm{X}] + [\mathrm{XO}]$ 变化很慢（经由储库的生成与破坏），而相互转化很快，故 $\mathrm{d}[\mathrm{XO}]/\mathrm{d}t = k_a[\mathrm{X}][\mathrm{O_3}] - k_b[\mathrm{XO}][\mathrm{O}] \approx 0$，即得分配比。循环每走一遍毁灭一个 $\mathrm{O_3}$（步骤 a）和一个 $\mathrm{O}$（步骤 b），即两个奇数氧，其速率即任一步的速率（稳态下两步速率相等）：$-\mathrm{d}[\mathrm{O_x}]/\mathrm{d}t = 2k_a[\mathrm{X}][\mathrm{O_3}] = 2k_b[\mathrm{XO}][\mathrm{O}]$。除以查普曼损失 $2k_4[\mathrm{O}][\mathrm{O_3}]$ 即得增幅因子。链长由 [[kinetics/chain-reactions]] 中采用的定义得出：传递速率除以终止速率。
:::

决定性的动力学事实是 $k_b$ 的大小。查普曼自己的汇 $\mathrm{O + O_3}$ 活化能约 $17\ \mathrm{kJ\,mol^{-1}}$，在寒冷的平流层中很慢；$\mathrm{ClO + O}$ 这类自由基-自由基反应没有势垒，速率可达碰撞速率的相当份额。

::: example 零点几个 ppb 的 ClO {#ex-clo-enhancement}
$30\ \mathrm{km}$ 处（$T = 227\ \mathrm{K}$，$[\mathrm{M}] = 3.83\times10^{17}\ \mathrm{cm^{-3}}$，$[\mathrm{O_3}] = 3.0\times10^{12}\ \mathrm{cm^{-3}}$，$[\mathrm{O}] = 1.6\times10^{8}\ \mathrm{cm^{-3}}$），设 $\mathrm{ClO}$ 为 $0.30\ \mathrm{ppb}$。取 $k(\mathrm{ClO + O}) = 3.0\times10^{-11}\exp(70/T)$ 与 $k(\mathrm{Cl + O_3}) = 2.3\times10^{-11}\exp(-200/T)\ \mathrm{cm^3\,s^{-1}}$（JPL 评估值），把氯催化损失与查普曼损失比较，并求 $[\mathrm{Cl}]/[\mathrm{ClO}]$。
::: solution
$[\mathrm{ClO}] = 0.30\times10^{-9}\times3.83\times10^{17} = 1.15\times10^{8}\ \mathrm{cm^{-3}}$。$227\ \mathrm{K}$ 时：$k_b = 3.0\times10^{-11}e^{0.308} = 4.1\times10^{-11}$，$k_a = 2.3\times10^{-11}e^{-0.881} = 9.5\times10^{-12}$，$k_4 = 9.2\times10^{-16}\ \mathrm{cm^3\,s^{-1}}$（出自[[#ex-chapman-30]]）。[[#prop-catalytic]]的增幅因子为
$$
\frac{k_b[\mathrm{ClO}]}{k_4[\mathrm{O_3}]} = \frac{4.1\times10^{-11}\times1.15\times10^{8}}{9.2\times10^{-16}\times3.0\times10^{12}} = \frac{4.7\times10^{-3}}{2.8\times10^{-3}} = 1.7 .
$$
零点三个 ppb 的 $\mathrm{ClO}$ 毁灭奇数氧的速率，几乎是查普曼全部氧化学的两倍，尽管臭氧比它多 $26\,000$ 倍。分配比为
$$
\frac{[\mathrm{Cl}]}{[\mathrm{ClO}]} = \frac{k_b[\mathrm{O}]}{k_a[\mathrm{O_3}]} = \frac{4.1\times10^{-11}\times1.6\times10^{8}}{9.5\times10^{-12}\times3.0\times10^{12}} = 2.3\times10^{-4},
$$
所以活性氯几乎全是 $\mathrm{ClO}$；自由 $\mathrm{Cl}$ 原子只存活 $1/(k_a[\mathrm{O_3}]) = 0.035\ \mathrm{s}$，就去进攻下一个臭氧分子。
:::
:::

是什么终止了链？活性氯被转化为两个不进攻臭氧的**储库物种**：
$$
\mathrm{Cl} + \mathrm{CH_4} \rightarrow \mathrm{HCl} + \mathrm{CH_3}, \qquad
\mathrm{ClO} + \mathrm{NO_2} + \mathrm{M} \rightarrow \mathrm{ClONO_2} + \mathrm{M} .
$$
氯化氢和硝酸氯在中纬度平流层持有 $95\ \%$ 以上的无机氯。它们经 $\mathrm{OH + HCl}$ 和 $\mathrm{ClONO_2}$ 的光解缓慢返回活性形式，并最终在平流层空气下降到对流层、$\mathrm{HCl}$ 溶入云中时被清除。各循环还彼此干扰：$\mathrm{NO_2}$ 锁住 $\mathrm{ClO}$，$\mathrm{ClONO_2}$ 锁住 $\mathrm{NO_2}$。溴的每原子效率约为氯的 $60$ 倍，因为它的储库（$\mathrm{HBr}$、$\mathrm{BrONO_2}$）不够稳定，溴的大部分保持活性。

## 氯氟烃

**氯氟烃**（CFC）如 $\mathrm{CFCl_3}$（CFC-11）和 $\mathrm{CF_2Cl_2}$（CFC-12），在 1930 年前后被开发为无毒、不燃的制冷剂，后来又用作气雾喷射剂、发泡剂和溶剂。它们的化学优点正是其环境难题：没有供 $\mathrm{OH}$ 进攻的 $\mathrm{C{-}H}$ 键，不溶于水，也不吸收任何能到达对流层的波长。它们因此没有对流层汇。它们被缓慢送入平流层，在约 $20$–$25\ \mathrm{km}$ 以上遇到 $\mathrm{O_2}$ 与 $\mathrm{O_3}$ 吸收之间"窗口"中小于约 $230\ \mathrm{nm}$ 的紫外而光解：
$$
\mathrm{CFCl_3} + h\nu \rightarrow \mathrm{CFCl_2} + \mathrm{Cl} .
$$
有机碎片被氧化，数日之内释放其余的氯。按 SPARC（2013）评估并为 WMO/UNEP《臭氧层损耗科学评估：2022》（*Scientific Assessment of Ozone Depletion: 2022*）采用的大气寿命，CFC-11 约 $52$ 年，CFC-12 约 $102$ 年。它们的替代品氢氯氟烃（HCFC，如 $\mathrm{CHF_2Cl}$，HCFC-22，寿命约 $12$ 年）含有一个 $\mathrm{C{-}H}$ 键，大多在对流层被 $\mathrm{OH}$ 摧毁；氢氟烃（HFC）则完全不含氯。

::: definition 臭氧耗减潜能值与等效有效平流层氯 {#def-odp}
某物质的**臭氧耗减潜能值**（ODP）是单位质量排放造成的全球臭氧累计损失，与同质量 CFC-11 所致损失之比（故 $\mathrm{ODP(CFC\text{-}11)} = 1$）。它随单位质量的氯、溴原子数、在平流层释放的份额和大气寿命而增大。典型值（WMO 2022）：CFC-12 约 $0.75$–$0.8$，HCFC-22 约 $0.03$–$0.04$，哈龙-1301（$\mathrm{CF_3Br}$）$15$ 以上，HFC 为零。**等效有效平流层氯**（EESC）把所有源气体合成单一的无机卤素负载指数，
$$
\mathrm{EESC} = \sum_i n_i\,f_i\,x_i^\text{（进入）} + \alpha\sum_j n_j\,f_j\,x_j^\text{（进入）},
$$
其中 $x$ 是数年前进入平流层的混合比，$n$ 是 $\mathrm{Cl}$（第一个和式）或 $\mathrm{Br}$（第二个和式）原子数，$f$ 是释放分数，$\alpha \approx 60$ 是溴相对氯的每原子效率。EESC 是半经验指数，不是可测量的量。
:::

::: example 长寿命 CFC 的衰减 {#ex-cfc-decay}
CFC-12 的全球排放在 2000 年代初降到很低的水平。取单指数寿命 $102$ 年，2005 年存在的 CFC-12 有多大份额到 2055 年仍在大气中？平流层氯为什么比这类估计暗示的下降得更慢？
::: solution
由[[environmental-chemistry/earth-system-chemistry#prop-onebox]]（无源），$M/M_0 = e^{-50/102} = e^{-0.490} = 0.61$：即 2005 年的负载半个世纪后仍存约 **$61\ \%$**。两个效应使恢复进一步放慢。其一，"库存"——仍封存在旧冰箱、保温泡沫和设备中的 CFC——在生产结束后的数十年里继续泄漏。其二，平流层以 $3$–$6$ 年的滞后（平流层空气的年龄）响应平流层输入，故 EESC 落后于排放。控制恢复时间尺度的是 $102$ 年的寿命，而不是禁令的日期。
:::
:::

## 南极臭氧洞

气相催化能解释全球臭氧缓慢的百分之几的下降。它解释不了法曼（Farman）、加德纳（Gardiner）和香克林（Shanklin）1985 年 5 月发表于 *Nature* 的发现：哈雷湾上空 10 月的臭氧柱总量自 1960 年代以来损失了三分之一以上，在短短几年内出现，且局限于南极上空的春季。在洞形成的低平流层，原子氧稀少，$\mathrm{ClO + O}$ 循环慢得太远。1986–87 年由所罗门（Susan Solomon）、加西亚（Rolando Garcia）、罗兰（Sherwood Rowland）、韦伯尔斯（Donald Wuebbles）、马里奥（Mario Molina）与路易莎·莫利纳（Luisa Molina）等人厘清、并经 1987 年飞机观测证实的解释，由三条要素构成。

1. **极地平流层云（PSC）。**极夜期间，被强**极地涡旋**隔绝的南极上空平流层冷却到约 $195\ \mathrm{K}$ 以下。硝酸与水以硝酸三水合物和过冷的 $\mathrm{H_2SO_4/HNO_3/H_2O}$ 三元液滴形式凝结，约 $188\ \mathrm{K}$ 以下还凝结为冰。
2. **多相氯活化。**在这些粒子的表面上，储库物种彼此反应：
$$
\mathrm{ClONO_2(g)} + \mathrm{HCl(s)} \rightarrow \mathrm{Cl_2(g)} + \mathrm{HNO_3(s)},
\qquad
\mathrm{ClONO_2} + \mathrm{H_2O(s)} \rightarrow \mathrm{HOCl} + \mathrm{HNO_3(s)} .
$$
这些反应的气相速率可以忽略；在冰面和酸面上它们却十分有效。硝酸留在粒子里，粒子可能长大到沉降出去（**去氮化**），于是再没有 $\mathrm{NO_2}$ 剩下来重新生成 $\mathrm{ClONO_2}$。
3. **一个不需要原子氧的循环。**9 月阳光回归时，$\mathrm{Cl_2}$ 和 $\mathrm{HOCl}$ 光解，在 $\mathrm{ClO}$ 达 $1$–$2\ \mathrm{ppb}$ 时，**ClO 二聚体循环**（Molina 和 Molina，1987）开始运转：
$$
\begin{aligned}
\mathrm{ClO} + \mathrm{ClO} + \mathrm{M} &\rightarrow \mathrm{Cl_2O_2} + \mathrm{M}\\
\mathrm{Cl_2O_2} + h\nu &\rightarrow \mathrm{Cl} + \mathrm{ClOO}\\
\mathrm{ClOO} + \mathrm{M} &\rightarrow \mathrm{Cl} + \mathrm{O_2} + \mathrm{M}\\
2\,(\mathrm{Cl} + \mathrm{O_3} &\rightarrow \mathrm{ClO} + \mathrm{O_2})\\
\hline
\text{净:}\quad 2\,\mathrm{O_3} &\rightarrow 3\,\mathrm{O_2}
\end{aligned}
$$
此外还伴随一个耦合的 $\mathrm{BrO + ClO}$ 循环。其速率受三分子二聚化限制，因而对 $\mathrm{ClO}$ 是二级——这就是为什么在 $\mathrm{ClO}$ 增强一百倍之前损失可以忽略，之后却来势迅猛。

::: example 二聚体循环毁灭臭氧有多快？ {#ex-dimer}
9 月南极低平流层 $18\ \mathrm{km}$ 处，取 $T = 195\ \mathrm{K}$、$p = 70\ \mathrm{hPa}$、$\mathrm{ClO} = 1.0\ \mathrm{ppb}$、$\mathrm{O_3} = 2.0\ \mathrm{ppm}$，$\mathrm{ClO + ClO + M}$ 取低压极限速率常数 $k_0 = 1.6\times10^{-32}(T/300)^{-4.5}\ \mathrm{cm^6\,s^{-1}}$。假设二聚体在阳光下迅速光解，估算 $12$ 小时日照中毁掉的臭氧百分比。
::: solution
$[\mathrm{M}] = 7000/(1.3806\times10^{-23}\times195) = 2.60\times10^{24}\ \mathrm{m^{-3}} = 2.60\times10^{18}\ \mathrm{cm^{-3}}$；$[\mathrm{ClO}] = 2.60\times10^{9}$，$[\mathrm{O_3}] = 5.2\times10^{12}\ \mathrm{cm^{-3}}$。速率常数为 $k_0 = 1.6\times10^{-32}\times(0.650)^{-4.5} = 1.11\times10^{-31}\ \mathrm{cm^6\,s^{-1}}$。每次二聚化导致损失两个臭氧分子，故
$$
-\frac{\mathrm{d}[\mathrm{O_3}]}{\mathrm{d}t} = 2k_0[\mathrm{ClO}]^2[\mathrm{M}] = 2\times1.11\times10^{-31}\times(2.60\times10^{9})^2\times2.60\times10^{18} = 3.9\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}} .
$$
$12\ \mathrm{h} = 43\,200\ \mathrm{s}$ 内即 $1.7\times10^{11}\ \mathrm{cm^{-3}}$，亦即每天 $3.2\ \%$ 的臭氧。在 9 月初至 10 月初约六周里，每天百分之几的持续损失除掉了这些高度上的大部分臭氧——正如观测所示，探空臭氧仪显示 $14$–$20\ \mathrm{km}$ 层几乎被完全抽空。（$70\ \mathrm{hPa}$ 下反应已稍入低压过渡区（fall-off 区），真实速率约低 $15\ \%$；结论不变。）
:::
:::

北极也有极地平流层云，但其涡旋更暖，受行星波的扰动更强，所以氯活化不完整，且通常更早结束；北极的大规模损失只出现在异常寒冷的年份（如 1997、2011 和 2020 年）。在中纬度，臭氧被气相循环、背景硫酸盐气溶胶上的多相反应以及贫氧极地空气的稀释共同压低了几个百分点——1991 年皮纳图博火山喷发增强了硫酸盐表面之后，还出现过暂时的额外损失。

::: warning 臭氧洞与全球变暖是两个不同的问题 {#warn-ozone-climate}
有三种混淆反复出现。(1) *臭氧洞不是保温被上的洞*：它放进来的不是"热"。它改变的是地面的紫外；它对全球能量收支的影响很小（平流层臭氧损失是一种弱的*负*强迫）。(2) *臭氧并非越多越好*：对流层中的臭氧是污染物，也是温室气体（[[environmental-chemistry/tropospheric-chemistry]]）；近地面的臭氧不能"回填"平流层，因为它在那里只存活数周，也无法大量穿越对流层顶。(3) *两个问题存在耦合，但不以那种简单的方式*：CFC、HCFC 和 HFC 都是强温室气体，所以《蒙特利尔议定书》也避免了可观的增暖；平流层变冷（由 $\mathrm{CO_2}$ 上升引起）在上平流层加速气相臭氧恢复，却可能在极地低平流层助长极地平流层云。先把机理分开，再去合并它们。
:::

## 《蒙特利尔议定书》与恢复

这里的政策回应按记录陈述。《保护臭氧层维也纳公约》（1985）为研究与合作建立了框架；**《关于消耗臭氧层物质的蒙特利尔议定书》**（1987 年通过，1989 年生效）设定了具约束力的生产限制，历次修正案（伦敦 1990、哥本哈根 1992、蒙特利尔 1997、北京 1999）把它收紧为淘汰：发达国家于 1996 年淘汰 CFC 和哈龙，发展中国家于 2010 年，HCFC 随后按更晚的时间表淘汰。2009 年它成为第一个获联合国所有会员国批准条约。**《基加利修正案》**（2016 年通过，2019 年生效）加入了 HFC 的削减，不是因为它们破坏臭氧，而是因为它们的全球升温潜能值。区域立法落实这些义务——例如在欧盟，2024 年关于消耗臭氧层物质和含氟温室气体的两项法规（法规（EU）2024/590 与 2024/573）；在美国，2020 年《美国创新与制造法》针对 HFC。

科学结论，据 WMO/UNEP《臭氧层损耗科学评估：2022》（截至 2026 年的最新一次四年一度评估）归纳：

- 对流层中耗氧氯、溴的总丰度自 1990 年代末峰值以来一直在下降，平流层 EESC 自约 2000 年以来亦然；
- 若现行政策延续，$60°\mathrm{S}$–$60°\mathrm{N}$ 平均的臭氧柱总量预计于 **2040** 年前后、北极于 **2045** 年前后、南极于 **2066** 年前后回到 1980 年数值；
- 约 2012 至 2018 年间 CFC-11 排放意外上升，主要溯源到中国东部（Montzka 等，2018，以及 Rigby 等，2019，均发表于 *Nature*），2018 年后急剧回落，没有显著拖延恢复；
- 预计《基加利修正案》到 2100 年可避免 $0.3$–$0.5\ \mathrm{°C}$ 的全球增暖（相对 HFC 不受约束的增长而言）。

南极臭氧洞大小的逐年波动仍然很大，由涡旋温度和动力学支配；诸如 2022 年洪阿汤加-洪阿哈阿帕伊岛（Hunga Tonga–Hunga Haʻapai）海底喷发这样把异常大量的水汽注入平流层的事件，正被研究其对臭氧的可能影响。

::: quiz
惰性的 CFC 为什么会对臭氧造成如此大的破坏？
- [x] 缺乏对流层汇使排放质量的几乎全部到达平流层，那里的强紫外释放氯原子，每个氯原子催化地毁灭数千个臭氧。
- [ ] 它们在地面直接与臭氧反应，贫氧空气上升进入平流层。
- [ ] 它们吸收了本可生成臭氧的紫外，使查普曼的生成步骤"断粮"。
- [ ] 它们是温室气体，使平流层变暖并加速查普曼损失反应。
::: solution
在对流层的惰性正是 CFC 危险的原因：在升到大部分臭氧之上之前没有什么能清除它们，而在 $\lambda < 230\ \mathrm{nm}$ 的光解处放出 $\mathrm{Cl}$。催化链随后把每个氯原子的作用放大成千上万倍。CFC 不直接与臭氧反应，其对紫外的吸收与 $\mathrm{O_2}$ 相比可以忽略，其温室效应其实还使平流层略微变冷。
:::
:::

::: history
夏尔·法布里（Charles Fabry）和亨利·布伊松（Henri Buisson）1913 年用光谱法测定了臭氧柱总量，戈登·道森（Gordon Dobson）从 1920 年代起建立了紫外分光光度计网，其名字至今仍是这个量的单位。查普曼（Chapman）的纯氧机理发表于 1930 年。催化循环随后而来：$\mathrm{HO_x}$（贝茨（Bates）与尼科莱（Nicolet），1950）、$\mathrm{NO_x}$（克鲁岑（Crutzen），1970；约翰斯顿（Johnston），1971，他警告超声速飞机会破坏臭氧），以及 $\mathrm{ClO_x}$（斯托尔斯基（Stolarski）与奇切罗内（Cicerone），1974）。1974 年 6 月，莫利纳（Molina）与罗兰（Rowland）在 *Nature* 上发表论断：CFC 能幸存到平流层并在那里释放氯。法曼、加德纳与香克林（1985）对南极臭氧洞的发现、以多相化学作出的解释，以及 1987 年飞越南极臭氧实验在涡旋边缘测得的 $\mathrm{ClO}$ 与臭氧的反相关，使此案铁证如山。克鲁岑、莫利纳和罗兰共获 1995 年诺贝尔化学奖。
:::

## 后续内容

羟基自由基、激发原子 $\mathrm{O(^1D)}$ 和氮氧化物在这里是平流层催化剂，在 [[environmental-chemistry/tropospheric-chemistry]] 中则是主角——那里的臭氧是生成而非被毁灭，并沦为污染物。粒子上的多相化学在 [[environmental-chemistry/particulates-acid-deposition]] 中再现。CFC、HCFC 和 HFC 的全球升温潜能值，以及 $\mathrm{N_2O}$ 与平流层变冷的作用，在 [[environmental-chemistry/greenhouse-gases]] 中讨论。地面、飞机和卫星对痕量组分的测量——这一切结论赖以立足的证据——是 [[environmental-chemistry/environmental-monitoring]] 的主题。

::: summary
- 臭氧吸收约 $290\ \mathrm{nm}$ 以下的全部紫外；透射率 $T = e^{-\sigma N}$ 使 UVB 对柱总量极其敏感（损失 $10\ \%$ 使 $300\ \mathrm{nm}$ 紫外约增 $37\ \%$）。柱总量约 $300\ \mathrm{DU}$；$1\ \mathrm{DU} = 2.687\times10^{16}\ \mathrm{cm^{-2}}$。
- 查普曼机理由奇数氧收支给出 $[\mathrm{O}]/[\mathrm{O_3}] = J_3/(k_2[\mathrm{O_2}][\mathrm{M}])$ 和 $[\mathrm{O_3}] = [\mathrm{O_2}](J_1k_2[\mathrm{M}]/J_3k_4)^{1/2}$；它高估臭氧。
- 催化循环 $\mathrm{X + O_3 \rightarrow XO + O_2}$、$\mathrm{XO + O \rightarrow X + O_2}$（$\mathrm{X = OH, NO, Cl, Br}$）以速率 $2k_b[\mathrm{XO}][\mathrm{O}]$ 毁灭奇数氧；ppb 级的 $\mathrm{ClO}$ 之所以压过查普曼的损失，是因为自由基-自由基反应很快。
- 储库（$\mathrm{HCl}$、$\mathrm{ClONO_2}$）通常固定住大部分氯；CFC 能到达平流层是因为没有对流层汇，寿命约 $52$（CFC-11）和 $102$ 年（CFC-12）。
- 南极臭氧洞需要低温（极地平流层云）、多相活化 $\mathrm{ClONO_2 + HCl \rightarrow Cl_2 + HNO_3}$、去氮化和对 $\mathrm{ClO}$ 为二级的 ClO 二聚体循环。
- ODP 与 EESC 对耗氧物质进行排序和合并；溴的每原子效率约为氯的 $60$ 倍。
- 在《蒙特利尔议定书》（1987）及其修正案下，卤素负载正在下降；WMO/UNEP 2022 评估预计柱总量回到 1980 年数值约在 2040 年（全球近地面平均）、2045 年（北极）和 2066 年（南极）。
:::

## 练习

::: exercise 氧的解离阈值 {#ex-thresholds level=1 check="240"}
$\mathrm{O{=}O}$ 键解离焓为 $498.4\ \mathrm{kJ\,mol^{-1}}$。能把 $\mathrm{O_2}$ 解离成两个基态原子的最长波长是多少？（波长以 nm 计，保留三位有效数字。）
::: solution
$\lambda = N_\mathrm{A}hc/D = (6.022\times10^{23}\times6.626\times10^{-34}\times2.998\times10^{8})/(498.4\times10^{3}) = 2.40\times10^{-7}\ \mathrm{m} = 240\ \mathrm{nm}$。观测到的赫茨伯格连续区阈约在 $242\ \mathrm{nm}$，与 $298\ \mathrm{K}$ 的焓和 $0\ \mathrm{K}$ 的解离能之差一致。
:::
:::

::: exercise 道森单位 {level=1 check="5.91"}
南极臭氧洞以低于 $220\ \mathrm{DU}$ 的柱总量定义。把 $220\ \mathrm{DU}$ 表示为以分子 $\mathrm{cm^{-2}}$ 计的柱量。（以 $10^{18}\ \mathrm{cm^{-2}}$ 为单位填入，保留三位有效数字。）
::: solution
$220\times2.687\times10^{16} = 5.91\times10^{18}\ \mathrm{cm^{-2}}$。在 $273\ \mathrm{K}$、$1\ \mathrm{atm}$ 下，这些臭氧将是厚 $2.2\ \mathrm{mm}$ 的一层。
:::
:::

::: exercise 残余的 CFC-12 {level=1 check="61"}
寿命 $102$ 年且不再有排放，$50$ 年后 CFC-12 负载还剩百分之多少？（填入百分数，保留两位有效数字。）
::: solution
$e^{-50/102} = 0.613$，即 $61\ \%$（同[[#ex-cfc-decay]]）。
:::
:::

::: exercise 更薄柱中的紫外增量 {level=2 check="69"}
在 $\sigma = 3.9\times10^{-19}\ \mathrm{cm^2}$ 的波长处，柱总量从 $300$ 降到 $250\ \mathrm{DU}$ 时，垂直透射率增加百分之多少？（填入百分增幅，保留两位有效数字。）
::: solution
比值为 $\exp(\sigma\,\delta N) = \exp(3.9\times10^{-19}\times50\times2.687\times10^{16}) = e^{0.524} = 1.69$，即增加 $69\ \%$。线性估计 $\tau\,\delta N/N = 3.14\times50/300 = 52\ \%$ 低估了它，因为这一变化不算小。
:::
:::

::: exercise 查普曼稳态中的原子氧 {level=2 check="6.9"}
$40\ \mathrm{km}$ 处取 $T = 250\ \mathrm{K}$、$[\mathrm{M}] = 8.6\times10^{16}\ \mathrm{cm^{-3}}$、$[\mathrm{O_2}] = 0.2095[\mathrm{M}]$、$J_3 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$、$k_2 = 6.0\times10^{-34}(T/300)^{-2.4}\ \mathrm{cm^6\,s^{-1}}$。求 $[\mathrm{O}]/[\mathrm{O_3}]$。（以 $10^{-4}$ 为单位填入，保留两位有效数字。）
::: solution
$k_2 = 6.0\times10^{-34}\times(0.8333)^{-2.4} = 9.29\times10^{-34}\ \mathrm{cm^6\,s^{-1}}$，且 $[\mathrm{O_2}][\mathrm{M}] = 0.2095\times(8.6\times10^{16})^2 = 1.549\times10^{33}\ \mathrm{cm^{-6}}$。由[[#prop-chapman]]，
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{1.0\times10^{-3}}{9.29\times10^{-34}\times1.549\times10^{33}} = \frac{1.0\times10^{-3}}{1.440} = 6.9\times10^{-4} .
$$
这是 $30\ \mathrm{km}$ 处数值（[[#ex-chapman-30]]）的 $25$ 倍，因为 $[\mathrm{M}]^2$ 约小 $20$ 倍。愈向上原子氧愈丰富，$\mathrm{XO + O}$ 步骤愈快，[[#prop-catalytic]]的催化循环在奇数氧损失中愈占支配地位。
:::
:::

::: exercise 活性氯的分配 {level=2 check="0.92"}
用[[#ex-clo-enhancement]]的数据，设 $[\mathrm{O}]$ 加倍至 $3.2\times10^{8}\ \mathrm{cm^{-3}}$、$[\mathrm{O_3}]$ 减半至 $1.5\times10^{12}\ \mathrm{cm^{-3}}$（接近 $40\ \mathrm{km}$ 的条件，速率常数仍取 $227\ \mathrm{K}$ 值），求 $[\mathrm{Cl}]/[\mathrm{ClO}]$。（比值以 $10^{-3}$ 为单位填入，保留两位有效数字。）
::: solution
比值为 $k_b[\mathrm{O}]/(k_a[\mathrm{O_3}])$，随 $[\mathrm{O}]/[\mathrm{O_3}]$ 定标：比 $2.3\times10^{-4}$ 大 $2/0.5 = 4$ 倍，即 $9.2\times10^{-4} = 0.92\times10^{-3}$。直接计算：$4.12\times10^{-11}\times3.2\times10^{8}/(9.53\times10^{-12}\times1.5\times10^{12}) = 9.2\times10^{-4}$。氯仍几乎全是 $\mathrm{ClO}$，但因为 $[\mathrm{O}]$ 更大，循环跑得更快。
:::
:::

::: exercise 查普曼臭氧随压强定标 {level=3 check="0.78"}
(a) 由[[#prop-chapman]]证明：在光照速率和温度固定的某一高度，稳态臭氧*混合比*正比于 $[\mathrm{M}]^{1/2}$。(b) 若一层的等温气柱在固定 $J_1$、$J_3$ 和 $T$ 下上移半个标高，查普曼臭氧混合比改变多少倍？（填入倍数，保留两位有效数字。）
::: solution
(a) $[\mathrm{O_3}] = [\mathrm{O_2}](J_1k_2[\mathrm{M}]/J_3k_4)^{1/2}$，且 $[\mathrm{O_2}] = 0.2095[\mathrm{M}]$，故 $[\mathrm{O_3}]\propto[\mathrm{M}]^{3/2}$，混合比 $[\mathrm{O_3}]/[\mathrm{M}] \propto [\mathrm{M}]^{1/2}$。(b) 半个标高使 $[\mathrm{M}]$ 降为 $e^{-1/2}$ 倍，故混合比变为 $([\mathrm{M}]'/[\mathrm{M}])^{1/2} = (e^{-1/2})^{1/2} = e^{-1/4} = 0.78$。实际中 $J_1$ 随高度强烈增大，补偿有余，这就是混合比的峰值远高于数密度峰值的原因。
:::
:::

::: exercise 南极涡旋中的臭氧损失 {level=3 check="13"}
以 $\mathrm{ClO} = 2.0\ \mathrm{ppb}$ 重做[[#ex-dimer]]，其余数据不变。假设该时段内速率保持恒定，$12$ 小时日照中毁掉的臭氧百分比是多少？解释为什么答案不是例题的两倍。（填入百分数，保留两位有效数字。）
::: hint
二聚体循环对 $\mathrm{ClO}$ 是二级。
:::
::: solution
速率按 $[\mathrm{ClO}]^2$ 定标，$\mathrm{ClO}$ 加倍使其变为四倍：$4\times3.9\times10^{6} = 1.56\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$。$43\,200\ \mathrm{s}$ 内即 $6.8\times10^{11}\ \mathrm{cm^{-3}}$，亦即 $6.8\times10^{11}/5.2\times10^{12} = 13\ \%$ 每天。二次依赖正是臭氧损失在极地平流层云活化氯时骤然启动的原因，也是《蒙特利尔议定书》下氯负载的削减对极地损失率有超比例效果的原因。
:::
:::
