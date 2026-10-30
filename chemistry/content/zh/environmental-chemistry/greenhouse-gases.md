如果地球没有大气但保持当前的反射率，其表面平均温度将约为 $255\ \mathrm{K}$ ——比冰点低十八度。实际的全球平均表面温度约为 $288\ \mathrm{K}$。这约 $33\ \mathrm{K}$ 的差额就是**温室效应**，而它几乎完全由占空气不足百分之一的分子造成：水汽、二氧化碳、甲烷、氧化亚氮和臭氧，合成卤代烃的贡献还在增长。氮和氧——大气的 $99\ \%$ ——几乎毫无贡献。为什么某些分子俘获红外辐射而另一些不俘获，是分子光谱学的问题；其浓度变化使行星增暖多少，是辐射传输的问题；我们加入的 $\mathrm{CO_2}$ 为何存留如此之久、它对海洋又做了什么，则是碳循环与碳酸盐平衡的问题。本课把这三方面合在一起，使用 [[environmental-chemistry/earth-system-chemistry]] 的箱式模型和 [[spectroscopy/vibrational-spectroscopy]] 的振动选律。

## 行星能量收支

::: proposition 有效辐射温度 {#prop-te}
一颗处于太阳辐照度为 $S_0$ 的轨道上、邦德反照率为 $\alpha$（入射阳光被反射的份额）、以均匀温度 $T_\mathrm{e}$ 作黑体辐射的行星，其辐射平衡条件为
$$
\frac{S_0(1-\alpha)}{4} = \sigma T_\mathrm{e}^4
\qquad\Longrightarrow\qquad
T_\mathrm{e} = \left[\frac{S_0(1-\alpha)}{4\sigma}\right]^{1/4},
$$
其中 $\sigma = 5.670\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$ 为斯特藩-玻尔兹曼常数。对地球（$S_0 = 1361\ \mathrm{W\,m^{-2}}$，$\alpha \approx 0.30$），$T_\mathrm{e} = 255\ \mathrm{K}$。这是地球*从外太空看*辐射时的温度，不是表面温度。
:::

::: proof 吸收的阳光等于发射的红外 {#proof-te}
行星以其横截面 $\pi R^2$ 拦截阳光，吸收 $\pi R^2 S_0(1-\alpha)$。它从整个表面积 $4\pi R^2$ 以单位面积 $\sigma T_\mathrm{e}^4$ 发射。稳态下两者相等：$\pi R^2S_0(1-\alpha) = 4\pi R^2\sigma T_\mathrm{e}^4$，即得所果。因子 $4$ 是表面积与横截面之比——入射通量的昼夜全球平均为 $S_0/4 = 340\ \mathrm{W\,m^{-2}}$。数值上，吸收 $1361\times0.70/4 = 238\ \mathrm{W\,m^{-2}}$，$T_\mathrm{e} = (238/5.670\times10^{-8})^{1/4} = 254.6\ \mathrm{K}$。
:::

表面比 $T_\mathrm{e}$ 更暖，是因为大气对阳光几乎透明（按维恩定律 $\lambda_\text{max} = 2898\ \mathrm{\mu m\,K}/T$，$T = 5772\ \mathrm{K}$ 时峰值在近 $0.5\ \mathrm{\mu m}$），但对表面发射的热红外却大体不透明（$288\ \mathrm{K}$ 时峰值在近 $10\ \mathrm{\mu m}$）。吸收红外的气体吸收表面辐射，并从更高、更冷的层级向上和向下再发射。行星仍须向太空排放 $238\ \mathrm{W\,m^{-2}}$，但它是在平均约 $5\ \mathrm{km}$ 的高空排放的，那里温度约 $255\ \mathrm{K}$；因为对流层中温度随高度下降，其下的表面就更暖。

::: example 单层温室 {#ex-one-layer}
把大气模拟为一个对阳光透明、吸收来自表面的红外份额 $\varepsilon$ 的等温层（并由基尔霍夫定律以发射率 $\varepsilon$ 发射）。求表面温度，以及给出 $288\ \mathrm{K}$ 的 $\varepsilon$ 值。
::: solution
设表面温度为 $T_\mathrm{s}$，该层温度为 $T_\mathrm{a}$。大气层顶的平衡（排向太空的等于吸收的）：
$$
(1-\varepsilon)\sigma T_\mathrm{s}^4 + \varepsilon\sigma T_\mathrm{a}^4 = \sigma T_\mathrm{e}^4 .
$$
该层的平衡（吸收 $\varepsilon\sigma T_\mathrm{s}^4$，向上向下发射）：$\varepsilon\sigma T_\mathrm{s}^4 = 2\varepsilon\sigma T_\mathrm{a}^4$，故 $T_\mathrm{a}^4 = T_\mathrm{s}^4/2$。代入得
$$
\sigma T_\mathrm{s}^4\left(1 - \varepsilon + \tfrac{\varepsilon}{2}\right) = \sigma T_\mathrm{e}^4
\quad\Longrightarrow\quad
T_\mathrm{s} = T_\mathrm{e}\left(\frac{2}{2-\varepsilon}\right)^{1/4} .
$$
完全不透明的层（$\varepsilon = 1$）给出 $T_\mathrm{s} = 2^{1/4}\times254.6 = 303\ \mathrm{K}$；$T_\mathrm{s} = 288\ \mathrm{K}$ 要求 $\varepsilon = 2[1 - (T_\mathrm{e}/T_\mathrm{s})^4] = 0.78$。这个模型是粗糙的——它忽略了把热量向上输送、使真实表面比纯辐射情形更冷的对流，也忽略了吸收的波长结构——但它点出了要害：提高红外不透明度会抬高表面温度，而吸收的阳光并未改变。
:::
:::

## 哪些分子吸收红外，吸收在何处

当一种振动改变分子的电偶极矩时，分子吸收红外辐射（[[spectroscopy/vibrational-spectroscopy]] 的总体选律）。同核双原子分子——$\mathrm{N_2}$、$\mathrm{O_2}$ ——没有偶极矩，其任何振动也不产生偶极矩的变化，所以它们是透明的（除极弱的碰撞诱导带外）。三个或更多原子的分子，或异核双原子分子，具有红外活性模式：

| 气体 | 重要谱带 | 评注 |
|---|---|---|
| $\mathrm{H_2O}$ | 弯曲 $6.3\ \mathrm{\mu m}$；$\sim 20\ \mathrm{\mu m}$ 以外的纯转动 | 总体上最强的吸收体；是反馈，不是强迫 |
| $\mathrm{CO_2}$ | 弯曲 $\nu_2$ 在 $667\ \mathrm{cm^{-1}}$（$15\ \mathrm{\mu m}$）；不对称伸缩 $\nu_3$ 在 $2349\ \mathrm{cm^{-1}}$（$4.3\ \mathrm{\mu m}$） | $15\ \mathrm{\mu m}$ 带位于地球发射峰值附近 |
| $\mathrm{CH_4}$ | $1306\ \mathrm{cm^{-1}}$（$7.7\ \mathrm{\mu m}$） | 窗口边缘 |
| $\mathrm{N_2O}$ | $1285\ \mathrm{cm^{-1}}$（$7.8\ \mathrm{\mu m}$）、$589\ \mathrm{cm^{-1}}$ | 与甲烷重叠 |
| $\mathrm{O_3}$ | $1042\ \mathrm{cm^{-1}}$（$9.6\ \mathrm{\mu m}$） | 在窗口之内 |
| 氯氟烃、氢氟烃、$\mathrm{SF_6}$、$\mathrm{CF_4}$ | C–F 与 C–Cl 伸缩，$800$–$1300\ \mathrm{cm^{-1}}$ | 在窗口之内：每个分子都极强 |

$\mathrm{CO_2}$ 的对称伸缩（$1388\ \mathrm{cm^{-1}}$）红外非活性，因为它不改变偶极矩。在约 $8$ 到 $12\ \mathrm{\mu m}$（$830$–$1250\ \mathrm{cm^{-1}}$）之间，水汽和 $\mathrm{CO_2}$ 只弱吸收：这个**大气窗口**让表面辐射直接逃逸到太空。在别的分子都不吸收的窗口内吸收的分子，其每个分子的效果远大于谱带已经饱和的分子——这就是氟代气体的增温能力可达 $\mathrm{CO_2}$ 数千倍的原因。

::: widget plot
f: 1/(x^5*(exp(14388/(x*T)) - 1))*1e4; 1/(x^5*(exp(14388/(x*255)) - 1))*1e4
x: 2, 40
y: 0, 1.1
sliders: T=288:220:320:1
labels: B_\lambda(T)\ \text{（相对值）}; B_\lambda(255\ \mathrm{K})
caption: 普朗克光谱辐射亮度（任意但通用的单位）对波长（微米）作图，两条曲线分别是表面温度 $T$（滑块）和有效辐射温度 $255\ \mathrm{K}$。峰值位于近 $10\ \mathrm{\mu m}$ 处（维恩定律：$2898/T$）。在图上找出表中各吸收带：$\mathrm{CO_2}$ 的 $15\ \mathrm{\mu m}$ 带位于峰值附近，臭氧的 $9.6\ \mathrm{\mu m}$ 带和氟代气体的 C–F 带位于 $8$–$12\ \mathrm{\mu m}$ 窗口之内。两条曲线之间的面积粗略地说，就是大气拦截下来并在更冷温度下重新辐射出去的那部分辐射。
:::

## 辐射强迫与气候敏感度

::: definition 辐射强迫、有效辐射强迫与气候敏感度 {#def-forcing}
某种扰动（气体、气溶胶或太阳输出的变化）的**辐射强迫** $\Delta F$，是它引起的大气层顶（或对流层顶）净向下辐射通量的变化，单位 $\mathrm{W\,m^{-2}}$，在表面温度响应之前定义。IPCC AR6 使用的**有效辐射强迫**（ERF）还计入几天到几个月内发生的大气和陆地表面的快速调整（平流层温度、云、水汽）。平衡时全球平均表面温度的响应与强迫近似成线性，
$$
\Delta T_\text{eq} = \lambda\,\Delta F,
$$
其中 $\lambda$ 为**气候敏感度参数**（$\mathrm{K\,W^{-1}\,m^2}$）。**平衡气候敏感度**（ECS）是 $\mathrm{CO_2}$ 倍增时的 $\Delta T_\text{eq}$。IPCC AR6（2021 年）评估 $\mathrm{CO_2}$ 倍增的 ERF 为 $3.93\ \mathrm{W\,m^{-2}}$，ECS 最佳估计 $3\ \mathrm{°C}$，可能（likely）$2.5$–$4\ \mathrm{°C}$、很可能（very likely）$2$–$5\ \mathrm{°C}$，故 $\lambda \approx 0.8\ \mathrm{K\,W^{-1}\,m^2}$。
:::

没有反馈时，响应由**普朗克响应**决定：更暖的行星辐射更多。对 $\sigma T_\mathrm{e}^4$ 求导，黑体给出 $4\sigma T_\mathrm{e}^3 = 3.7\ \mathrm{W\,m^{-2}\,K^{-1}}$；AR6 给出真实大气的普朗克反馈约为 $3.2\ \mathrm{W\,m^{-2}\,K^{-1}}$，所以仅 $\mathrm{CO_2}$ 倍增就会使地球增暖约 $3.93/3.2 = 1.2\ \mathrm{K}$。反馈会把这一数值成倍放大：水汽反馈（按克劳修斯-克拉珀龙关系，较暖的空气保持更多水汽，约每开尔文 $7\ \%$）、直减率反馈、地表反照率（冰雪融化）反馈和云反馈合起来大约把它放大两到三倍。

强迫如何依赖于浓度？对弱吸收气体——在所有波长上都光学薄——吸收正比于物质量，强迫亦然。而对 $\mathrm{CO_2}$，$15\ \mathrm{\mu m}$ 带的带心已完全不透明：再加多的分子在带心也无法多吸收。额外的吸收发生在谱带的翼部，那里的吸收系数急剧衰减。

::: proposition CO₂ 的对数强迫 {#prop-log-forcing}
对带心已饱和的强吸收气体，辐射强迫随浓度的对数增加。对 $\mathrm{CO_2}$，Myhre 等（1998，*Geophysical Research Letters*）提出的、IPCC 报告自 2001 年至 2013 年采用的简化表达式为
$$
\Delta F = 5.35\ \mathrm{W\,m^{-2}}\times\ln\frac{C}{C_0},
$$
其中 $C_0$ 为参考浓度（工业革命前，$278\ \mathrm{ppm}$）；每倍增一次都加上同样的 $5.35\ln2 = 3.7\ \mathrm{W\,m^{-2}}$。处于中间状态的气体（$\mathrm{CH_4}$、$\mathrm{N_2O}$）的强迫大致按浓度的平方根标度，光学薄气体（卤代烃）则按线性。该式是对逐线辐射传输计算的拟合，大致在 $C$ 从 $C_0$ 到约 $4C_0$ 的范围内有效；AR6 采用修订后的拟合（Meinshausen 等，2020），计入了与 $\mathrm{N_2O}$ 的重叠，给出每倍增约 $3.9\ \mathrm{W\,m^{-2}}$ 的 ERF。
:::

::: proof 为什么翼部给出对数 {#proof-log-forcing}
一个启发式论证（完整结果需要逐线计算）。设在谱带附近吸收截面随离开带心的距离指数衰减，$\sigma(\nu) = \sigma_0\exp(-\lvert\nu - \nu_0\rvert/\Gamma)$ ——这是对 $\mathrm{CO_2}$ 带轮廓的合理描述。在 $\lvert\nu - \nu_0\rvert < \Gamma\ln(\sigma_0N)$ 处大气实际上不透明（光学深度 $\sigma N > 1$，$N$ 为柱总量）。于是不透明区的宽度为
$$
\Delta\nu_\text{opaque} = 2\Gamma\ln(\sigma_0N) .
$$
在这一区域内，向太空的辐射来自冷的上层大气而非暖的表面，使外逸通量在每个波数单位上减少约 $\Delta B$（两个温度下普朗克辐射亮度之差，在整个带上几乎恒定）。外逸辐射的减少量为 $\Delta B\,\Delta\nu_\text{opaque}$，把 $N$ 从 $N_0$ 变到 $N$ 使其改变
$$
\Delta F \approx 2\Gamma\,\Delta B\,\ln\frac{N}{N_0},
$$
与浓度成对数关系。在光学薄极限下，同一积分给出 $\Delta F \propto N$。对数解释了为什么最初增加的 $100\ \mathrm{ppm}$ $\mathrm{CO_2}$ 比下一个 $100\ \mathrm{ppm}$ 产生更大的强迫，也解释了为什么不会饱和：不透明区不断变宽。
:::

::: example 工业革命以来的强迫与增暖 {#ex-forcing}
(a) 用[[#prop-log-forcing]]求 $410\ \mathrm{ppm}$（2019 年）相对 $278\ \mathrm{ppm}$ 的 $\mathrm{CO_2}$ 强迫。(b) 取 $\lambda = 3/3.93 = 0.76\ \mathrm{K\,W^{-1}\,m^2}$，AR6 的人为总 ERF $2.72\ \mathrm{W\,m^{-2}}$ 最终将产生多大的平衡增暖？与观测增暖比较。
::: solution
(a) $\Delta F = 5.35\ln(410/278) = 5.35\times0.3886 = 2.08\ \mathrm{W\,m^{-2}}$。AR6 使用较新的公式并计入快速调整，给出 1750–2019 年为 $2.16\ \mathrm{W\,m^{-2}}$——对一个三参数公式而言吻合得相当好。

(b) $\Delta T_\text{eq} = 0.76\times2.72 = 2.1\ \mathrm{K}$。AR6 评估 2011–2020 十年相对 1850–1900 的观测增暖为 $1.09\ \mathrm{°C}$，约为平衡值的一半。差额是**海洋的热惯性**：气候系统并不处于平衡，地球仍在吸收能量（**能量不平衡**，近年约 $0.5$–$1\ \mathrm{W\,m^{-2}}$），其中大部分进入海洋。因此即使在恒定强迫下，也已“承诺”了进一步的增暖。这一计算还说明了为什么强迫必须按因子分解：AR6 的总值 $2.72$ 是充分混合温室气体和臭氧的约 $+3.8\ \mathrm{W\,m^{-2}}$ 与气溶胶的约 $-1.1\ \mathrm{W\,m^{-2}}$ 之和（[[environmental-chemistry/particulates-acid-deposition]]）。
:::
:::

::: widget plot
f: 5.35*log(x/278); lam*5.35*log(x/278)
x: 278, 1200
y: 0, 10
sliders: lam=0.76:0.4:1.3:0.02
labels: \Delta F/\mathrm{W\,m^{-2}}; \Delta T_\text{eq}/\mathrm{K}
caption: 简化的 $\mathrm{CO_2}$ 强迫 $5.35\ln(C/278)$ 对浓度（ppm）作图，以及由滑块设定敏感度参数的平衡增暖 $\lambda\,\Delta F$（$0.76\ \mathrm{K\,W^{-1}\,m^2}$ 对应 AR6 最佳估计 ECS $3\ \mathrm{°C}$；$0.5$ 和 $1.0$ 大致跨越其*可能*范围）。浓度的相等**比值**给出相等的强迫增量：$278\to556$ 与 $556\to1112\ \mathrm{ppm}$ 各加 $3.7\ \mathrm{W\,m^{-2}}$。请注意未来增暖的不确定度有多大一部分在于 $\lambda$，而不在化学。
:::

## 温室气体

1750–2019 年评估的有效辐射强迫（IPCC AR6 第一工作组第 7 章，2021 年），以及 2019 年的摩尔分数：

| 因子 | 2019 年丰度 | ERF $/\mathrm{W\,m^{-2}}$ |
|---|---|---|
| $\mathrm{CO_2}$ | $410\ \mathrm{ppm}$ | $2.16$ |
| $\mathrm{CH_4}$ | $1866\ \mathrm{ppb}$ | $0.54$ |
| $\mathrm{N_2O}$ | $332\ \mathrm{ppb}$ | $0.21$ |
| 卤代气体 | — | $0.41$ |
| 对流层臭氧（由前体物生成） | — | $0.47$ |
| 气溶胶（所有效应） | — | $-1.1$ |
| 人为总量 |  | $2.72$（很可能 $1.96$–$3.48$） |

截至 2026 年，能有把握定年的最近年平均来自 NOAA 全球监测实验室：莫纳罗亚的 $\mathrm{CO_2}$ 在 2024 年平均约 $424.6\ \mathrm{ppm}$，全球平均甲烷摩尔分数在 2023 年超过 $1920\ \mathrm{ppb}$，且自 2020 年以来上升异常迅速。世界气象组织的《2024 年全球气候状况》（*State of the Global Climate 2024*）报告 2024 年是器测记录中最暖的一年，比 1850–1900 平均高约 $1.55 \pm 0.13\ \mathrm{°C}$ ——第一个超过 $1.5\ \mathrm{°C}$ 的自然年，这与超过《巴黎协定》所指的、以多年代之平均值定义的长期 $1.5\ \mathrm{°C}$ 水平并不是一回事。

**二氧化碳**因其丰度和长寿而主导强迫（[[environmental-chemistry/earth-system-chemistry#warn-co2-lifetime]]）：来自 $\mathrm{CO_2}$ 的增暖约正比于**累积**排放，约为每 $1000\ \mathrm{Gt\,CO_2}$ 增暖 $0.45\ \mathrm{°C}$（累积排放瞬态气候响应的 AR6 最佳估计），这就是“碳预算”以总量而非速率表述的原因。**甲烷**来自湿地、农业（反刍动物、水稻）、化石燃料开采和垃圾填埋场，并被 OH 销毁（[[environmental-chemistry/tropospheric-chemistry]]）；十年的寿命意味着甲烷减排会在数十年内影响增暖。它的氧化还生成对流层臭氧和平流层水汽，这些间接效应已计入其 ERF。**氧化亚氮**主要来自施肥土壤中微生物的硝化和反硝化（[[environmental-chemistry/earth-system-chemistry]]），只在平流层被销毁——光解和与 $\mathrm{O(^1D)}$ 的反应——寿命约 $110$ 年。**卤代气体**——氯氟烃、氢氯氟烃、氢氟烃、$\mathrm{SF_6}$、全氟化碳——几乎全部是人为的。

::: example 累积排放与碳预算 {#ex-tcre}
IPCC AR6 给出 1850–2019 年累积 $\mathrm{CO_2}$ 排放约 $2390\ \mathrm{Gt\,CO_2}$，累积排放瞬态气候响应（TCRE）的最佳估计为每 $1000\ \mathrm{Gt\,CO_2}$ 增暖 $0.45\ \mathrm{°C}$，自 2020 年初起的剩余预算为 $500\ \mathrm{Gt\,CO_2}$（对应把增暖限制在 $1.5\ \mathrm{°C}$ 以内的 $50\ \%$ 概率）。(a) 按此，到 2019 年可归因于 $\mathrm{CO_2}$ 的增暖是多少？(b) 若总 $\mathrm{CO_2}$ 排放约为每年 $40\ \mathrm{Gt\,CO_2}$（化石加土地利用，2020 年代初），这一剩余预算相当于多少年的排放？
::: solution
(a) $2.39\times0.45 = 1.08\ \mathrm{°C}$。观测到的总增暖（2011–2020 年为 $1.09\ \mathrm{°C}$）与之接近，是因为其它温室气体造成的增暖与气溶胶的冷却大致相抵。(b) $500/40 = 12.5$ 年，自 2020 年算起，即在恒定排放下到 2030 年代初。增暖对累积排放的线性——碳循环与海洋吸热的涌现性质，其中两个非线性（对数强迫和递减的海洋汇）大致相消——正是碳预算得以被引用的前提。该预算有几百 $\mathrm{Gt\,CO_2}$ 的不确定度（取决于非 $\mathrm{CO_2}$ 强迫和 TCRE 范围，可能为每 $1000\ \mathrm{Gt\,CO_2}$ $0.27$–$0.63\ \mathrm{°C}$），全球碳计划每年更新它。
:::
:::

### 全球升温潜能值

为了比较不同气体的排放，政策使用一个共同的度量。

::: definition 全球升温潜能值 {#def-gwp}
在时间域 $H$ 内脉冲排放 $1\ \mathrm{kg}$ 气体 $i$ 的**绝对全球升温潜能值**是它造成的对辐射强迫的时间积分，
$$
\mathrm{AGWP}_i(H) = \int_0^H a_i\,x_i(t)\,\mathrm{d}t,
$$
其中 $a_i$ 是辐射效率（大气中每 kg 造成的强迫），$x_i(t)$ 是脉冲剩余的份额。对具有单一一级寿命 $\tau$ 的气体，$x(t) = e^{-t/\tau}$，$\mathrm{AGWP}_i = a_i\tau(1 - e^{-H/\tau})$。**全球升温潜能值**（GWP）是对 $\mathrm{CO_2}$ 的比值，$\mathrm{GWP}_i(H) = \mathrm{AGWP}_i(H)/\mathrm{AGWP}_{\mathrm{CO_2}}(H)$，其中 $x_{\mathrm{CO_2}}(t)$ 取 [[environmental-chemistry/earth-system-chemistry#eq-bern]] 的多指数响应。排放乘以 $\mathrm{GWP}(100)$ 后以 **$\mathrm{CO_2}$-当量**报告。AR6 的 $\mathrm{GWP}(100)$ 数值包括甲烷 $27.0$（非化石）和 $29.8$（化石，其中加上了其碳最终变成的 $\mathrm{CO_2}$）、$\mathrm{N_2O}$ $273$、HFC-134a $1530$、$\mathrm{SF_6}$ $25\,200$。GWP 是比较排放的一个约定，不是物理定律；其它度量（全球温度变化潜能值、GWP*）回答的是不同的问题。
:::

::: example 为什么 GWP 取决于时间域 {#ex-gwp-horizon}
对扰动寿命 $\tau = 11.8$ 年的甲烷，比较 $\mathrm{GWP}(20)$ 与 $\mathrm{GWP}(100)$。$\mathrm{CO_2}$ 响应函数 [[environmental-chemistry/earth-system-chemistry#eq-bern]] 的积分为 $\int_0^{20}x\,\mathrm{d}t = 14.2\ \mathrm{yr}$ 和 $\int_0^{100}x\,\mathrm{d}t = 52.4\ \mathrm{yr}$。
::: solution
辐射效率在比值中相消：
$$
\frac{\mathrm{GWP}(20)}{\mathrm{GWP}(100)} = \frac{\tau(1 - e^{-20/\tau})/14.2}{\tau(1 - e^{-100/\tau})/52.4} = \frac{11.8\times0.816/14.2}{11.8\times1.000/52.4} = \frac{0.678}{0.225} = 3.0 .
$$
甲烷在 20 年上的增温能力约是在 100 年上的三倍；AR6 的数值（非化石甲烷 $79.7$ 和 $27.0$）之比为 $2.95$。原因是甲烷的强迫集中在最初几十年，而 $\mathrm{CO_2}$ 的强迫持续几个世纪；时间域越长，$\mathrm{CO_2}$ 的积分相对甲烷的积分增长得越多。对 $\mathrm{N_2O}$（$\tau \approx 109$ 年），同样的计算给出接近 $1$ 的比（AR6：两个时间域都是 $273$）。选择时间域是关于哪个时间尺度重要的价值判断，这就是报告都要明确注明它的原因。
:::
:::

::: warning 停留时间并不决定哪种气体“最重要” {#warn-gwp}
两种相反的错误都很常见。一种是因甲烷寿命“只有”十年就轻视它——但每千克它造成的强迫远大于 $\mathrm{CO_2}$，当前的甲烷排放对未来几十年增暖的影响很大。另一种是只按 GWP 给气体排序，并断定削减一种高 GWP 气体等同于削减“$\mathrm{CO_2}$-当量”相同数量的 $\mathrm{CO_2}$ ——但短寿命气体的温度效应在其排放停止后数十年内消退，而 $\mathrm{CO_2}$ 的效应持续几千年。一吨甲烷的 $\mathrm{CO_2}$-当量与一吨 $\mathrm{CO_2}$ 在 100 年上有相同的积分强迫，但温度轨迹截然不同。两类排放都重要；理由不同，时间尺度也不同。
:::

## 海洋与海洋酸化

约四分之一的人为 $\mathrm{CO_2}$ 已被海洋吸收（[[environmental-chemistry/earth-system-chemistry#ex-carbon-budget]]）。溶解的 $\mathrm{CO_2}$ 是弱酸，而海洋对它的大容量得益于碳酸根离子，后者中和这种酸：
$$
\mathrm{CO_2(aq)} + \mathrm{H_2O(l)} + \mathrm{CO_3^{2-}(aq)} \rightarrow 2\,\mathrm{HCO_3^-(aq)} .
$$
在 pH 约 $8.1$ 的海水中，溶解无机碳（DIC，$\mathrm{C_T} = [\mathrm{CO_2^*}] + [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$，其中 $\mathrm{CO_2^*}$ 表示溶解的 $\mathrm{CO_2}$ 加上少量的 $\mathrm{H_2CO_3}$）约为 $2000\ \mathrm{\mu mol\,kg^{-1}}$：约 $89\ \%$ 碳酸氢根、$10\ \%$ 碳酸根、溶解 $\mathrm{CO_2}$ 仅 $0.5\ \%$。其中的平衡就是 [[environmental-chemistry/particulates-acid-deposition#prop-effective-henry]] 的那些，但使用与海水离子强度相适应的“条件”常数（$25\ \mathrm{°C}$、盐度 $35$：$K_0 = 0.0284\ \mathrm{mol\,kg^{-1}\,atm^{-1}}$，$\mathrm{p}K_1^* = 5.85$，$\mathrm{p}K_2^* = 8.97$，总 pH 标度；Weiss 1974 与 Lueker 等 2000）。$\mathrm{CO_2}$ 溶解时保持不变的量是**总碱度**，粗略地 $A_\mathrm{T} \approx [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}] \approx 2300\ \mathrm{\mu mol\,kg^{-1}}$，因为加入 $\mathrm{CO_2}$ 不增加电荷。（碱度将在 [[environmental-chemistry/natural-waters]] 中完整展开。）

::: proposition 雷维尔因子 {#prop-revelle}
在碱度恒定时，溶解 $\mathrm{CO_2}$（从而平衡 $p_{\mathrm{CO_2}}$）的相对变化远大于 DIC 的相对变化：
$$
R = \left(\frac{\partial\ln p_{\mathrm{CO_2}}}{\partial\ln\mathrm{C_T}}\right)_{A_\mathrm{T}} \approx \mathrm{C_T}\left(\frac{1}{[\mathrm{CO_3^{2-}}]} + \frac{4}{[\mathrm{HCO_3^-}]}\right) \quad (\text{仅碳酸盐体系，} [\mathrm{CO_2^*}] \ll \mathrm{C_T}),
$$
称为**雷维尔（缓冲）因子**。只计碳酸盐的公式给出约 $14$；计入硼酸盐的缓冲后，当今暖表层海中约为 $10$（冷水中为 $12$–$15$）。大气 $\mathrm{CO_2}$ 上升 $10\ \%$，平衡时海洋 DIC 只上升约 $1\ \%$。随着 $\mathrm{CO_2}$ 被吸收，$[\mathrm{CO_3^{2-}}]$ 下降，$R$ 增大，海洋继续吸收 $\mathrm{CO_2}$ 的能力随之下降。
:::

::: proof 由碳酸盐平衡导出缓冲因子 {#proof-revelle}
碱度中略去硼酸盐、水和 $\mathrm{CO_2^*}$，于是 $A = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}]$，$\mathrm{C} \approx [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$（略去小量 $[\mathrm{CO_2^*}]$）。则 $[\mathrm{CO_3^{2-}}] = A - \mathrm{C}$，$[\mathrm{HCO_3^-}] = 2\mathrm{C} - A$。合并两级解离平衡，$[\mathrm{CO_2^*}] = (K_2/K_1)[\mathrm{HCO_3^-}]^2/[\mathrm{CO_3^{2-}}]$，故
$$
\ln[\mathrm{CO_2^*}] = \text{const} + 2\ln(2\mathrm{C} - A) - \ln(A - \mathrm{C}) .
$$
在 $A$ 恒定下对 $\mathrm{C}$ 求导，
$$
\frac{\partial\ln[\mathrm{CO_2^*}]}{\partial\ln\mathrm{C}} = \mathrm{C}\left(\frac{4}{2\mathrm{C} - A} + \frac{1}{A - \mathrm{C}}\right) = \mathrm{C}\left(\frac{4}{[\mathrm{HCO_3^-}]} + \frac{1}{[\mathrm{CO_3^{2-}}]}\right) .
$$
取 $\mathrm{C} = 2013$、$[\mathrm{HCO_3^-}] = 1796$、$[\mathrm{CO_3^{2-}}] = 205\ \mathrm{\mu mol\,kg^{-1}}$（下面 $420\ \mathrm{\mu atm}$ 的情形），碳酸根项给出 $9.8$，碳酸氢根项给出 $4.5$，故在这个两组分模型中 $R \approx 14$；硼酸盐也结合质子，在 $25\ \mathrm{°C}$ 的完整数值计算中把 $R$ 降到 $9.9$。由于 $p_{\mathrm{CO_2}} = [\mathrm{CO_2^*}]/K_0$，同样的因子也适用于分压。
:::

同样的化学会降低 pH 和碳酸根离子浓度——**海洋酸化**。在 $25\ \mathrm{°C}$ 下以 $A_\mathrm{T} = 2300\ \mathrm{\mu mol\,kg^{-1}}$、总硼酸盐 $416\ \mathrm{\mu mol\,kg^{-1}}$ 求解完整海水体系，得平衡于 $280\ \mathrm{\mu atm}$ 时 pH $8.17$，$420\ \mathrm{\mu atm}$ 时 $8.03$，$800\ \mathrm{\mu atm}$ 时 $7.79$，而 $[\mathrm{CO_3^{2-}}]$ 从 $262$ 降到 $205$ 再到 $131\ \mathrm{\mu mol\,kg^{-1}}$。IPCC AR6 以很高信度评估：自 1980 年代后期以来，开阔洋表层 pH 每十年下降 $0.017$–$0.027$ 个 pH 单位，且当前表层 pH 值至少在 $26\,000$ 年以来异常之低。钙化生物建造碳酸钙外壳，其稳定性取决于**饱和度** $\Omega = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]/K_\mathrm{sp}^*$；取 $[\mathrm{Ca^{2+}}] = 10.3\ \mathrm{mmol\,kg^{-1}}$、$K_\mathrm{sp}^*(\text{文石}) = 6.5\times10^{-7}\ \mathrm{mol^2\,kg^{-2}}$（Mucci，1983），在上述两个暖水情形之间 $\Omega_\text{arag}$ 从 $4.2$ 降到 $3.3$；在寒冷的高纬度和上升流水域，一些地方的 $\Omega_\text{arag}$ 已接近或低于 $1$，那里文石变得具腐蚀性。

::: example 表层海水的碳酸盐饱和度 {#ex-omega}
使用上面 $25\ \mathrm{°C}$ 的结果：$280\ \mathrm{\mu atm}$ 时 $[\mathrm{CO_3^{2-}}] = 262\ \mathrm{\mu mol\,kg^{-1}}$，$420\ \mathrm{\mu atm}$ 时 $205\ \mathrm{\mu mol\,kg^{-1}}$，$[\mathrm{Ca^{2+}}] = 10.3\ \mathrm{mmol\,kg^{-1}}$，求对文石（$K_\mathrm{sp}^* = 6.48\times10^{-7}$）和方解石（$K_\mathrm{sp}^* = 4.27\times10^{-7}\ \mathrm{mol^2\,kg^{-2}}$；Mucci，1983）的饱和度。
::: solution
$\Omega = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]/K_\mathrm{sp}^*$。$280\ \mathrm{\mu atm}$ 时：$\Omega_\text{arag} = 0.0103\times2.62\times10^{-4}/6.48\times10^{-7} = 4.2$，$\Omega_\text{calc} = 6.3$。$420\ \mathrm{\mu atm}$ 时：$\Omega_\text{arag} = 0.0103\times2.05\times10^{-4}/6.48\times10^{-7} = 3.3$，$\Omega_\text{calc} = 4.9$。暖表层水仍是过饱和的（碳酸盐的沉淀受动力学抑制，故 $\Omega > 1$ 得以维持），但 $\Omega$ 约 $22\ \%$ 的下降使建造外壳在能量上更加昂贵。文石是溶解度较高的多晶型，被珊瑚和翼足类利用，最先变为欠饱和；而在冷水——$\mathrm{CO_2}$ 更易溶、$K_\mathrm{sp}^*$ 更大——$\Omega_\text{arag}$ 已接近 $1$。这一计算也表明为什么该盯住的量是碳酸根：$[\mathrm{Ca^{2+}}]$ 是保守量，几乎不变。
:::
:::

::: widget newton
f: 10^(-5.85)*11.93/10^(-x) + 2*10^(-14.82)*11.93/10^(-2*x) + 416*10^(-8.6)/(10^(-8.6) + 10^(-x)) + 10^(x - 7.22) - 10^(6 - x) - 2300
method: newton
x0: 7.5
steps: 8
x: 7, 9
caption: 在 $p_{\mathrm{CO_2}} = 420\ \mathrm{\mu atm}$、$25\ \mathrm{°C}$、盐度 $35$ 下求解海水碱度方程的 pH（$x$）：函数为 $[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}] - A_\mathrm{T}$，单位 $\mathrm{\mu mol\,kg^{-1}}$，其中 $[\mathrm{CO_2^*}] = K_0p_{\mathrm{CO_2}} = 11.93\ \mathrm{\mu mol\,kg^{-1}}$，$A_\mathrm{T} = 2300$。牛顿法几步之内收敛到 pH $8.03$。该函数随 pH 急剧上升，因为碳酸根和硼酸盐项按 $10^{\mathrm{pH}}$ 和 $10^{2\,\mathrm{pH}}$ 增长；这种陡峭就是缓冲。
:::

::: quiz
海洋的碳含量约为大气五十倍，为什么不按此比例吸收大气 $\mathrm{CO_2}$？
- [ ] 因为 $\mathrm{CO_2}$ 不溶于水。
- [x] 因为在碱度恒定时，DIC 的较小相对增加会使海水 $p_{\mathrm{CO_2}}$ 产生约十倍大的相对增加（雷维尔因子），故 DIC 变化不大即达平衡——而且只有表层海洋能快速平衡。
- [ ] 因为海洋已被碳酸盐饱和，无法再溶解更多。
- [ ] 因为海洋中的光合作用会把吸收的全部 $\mathrm{CO_2}$ 送回大气。
::: solution
约 $10$ 的缓冲因子意味着，与高出 $10\ \%$ 的 $p_{\mathrm{CO_2}}$ 平衡只需多约 $1\ \%$ 的 DIC。再加上表层水混入深海之缓慢（几个世纪），这在十年尺度上限制了海洋汇；在千年尺度上，整个海洋、继而碳酸盐沉积物会吸收掉大部分过剩的 $\mathrm{CO_2}$。
:::
:::

::: history
傅里叶（Fourier）在 1820 年代就论证大气使地球比没有大气时更暖。丁铎尔（Tyndall）1859–61 年测量了气体对红外（“辐射热”）的吸收，发现水汽和碳酸（$\mathrm{CO_2}$）强烈吸收，而氧和氮不吸收；富特（Foote）早在 1856 年曾报告，充满 $\mathrm{CO_2}$ 的圆筒在阳光下比装空气的圆筒热得更多。阿伦尼乌斯（Arrhenius）1896 年首次对 $\mathrm{CO_2}$ 倍增的增暖作了定量估算，卡伦达尔（Callendar）1938 年把实测温度的上升与化石燃料 $\mathrm{CO_2}$ 联系起来。雷维尔（Revelle）与修斯（Suess，1957）证明海洋的缓冲化学限制了它对 $\mathrm{CO_2}$ 的吸收，直接促成了基林（Keeling）的莫纳罗亚记录。真锅淑郎（Manabe）与韦瑟拉德（Wetherald）的辐射-对流模型（1967）给出了第一个物理上自洽的气候敏感度估计；真锅分享 2021 年诺贝尔物理学奖。政府间气候变化专门委员会（IPCC）成立于 1988 年；其第六次评估报告（第一工作组）于 2021 年出版。
:::

## 后续内容

碳酸盐体系——碱度、缓冲能力、方解石饱和度——在 [[environmental-chemistry/natural-waters]] 中作了完全一般性的处理，除海洋外还涵盖河流与湖泊。以发现趋势所需的十亿分之一精度监测温室气体，是 [[environmental-chemistry/environmental-monitoring]] 的内容。减少排放的化学——可再生原料、氢与碳捕集——属于 [[green-chemistry/carbon-hydrogen]]，辐射与热机的热力学则属于 [[thermodynamics/second-law]]。

::: summary
- 辐射平衡给出有效温度 $T_\mathrm{e} = [S_0(1-\alpha)/4\sigma]^{1/4} = 255\ \mathrm{K}$；$288\ \mathrm{K}$ 的表面更暖，因为红外活性气体使大气从更冷的高度向太空辐射。
- 只有改变偶极矩的振动才吸收：$\mathrm{N_2}$ 和 $\mathrm{O_2}$ 透明；$\mathrm{H_2O}$、$\mathrm{CO_2}$（$15\ \mathrm{\mu m}$）、$\mathrm{CH_4}$、$\mathrm{N_2O}$、$\mathrm{O_3}$ 和氟代气体（在 $8$–$12\ \mathrm{\mu m}$ 窗口内）吸收。
- 强迫 $\Delta F$（AR6 用 ERF）产生平衡增暖 $\lambda\Delta F$；AR6：ECS $3\ \mathrm{°C}$（可能 $2.5$–$4$），$\mathrm{CO_2}$ 倍增 ERF $3.93\ \mathrm{W\,m^{-2}}$；仅普朗克响应约给 $1.2\ \mathrm{K}$。
- $\mathrm{CO_2}$ 强迫是对数的，$\approx 5.35\ln(C/C_0)$，因为带心已饱和、吸收在翼部增长；$\mathrm{CH_4}$ 和 $\mathrm{N_2O}$ 约按平方根标度，卤代烃按线性。
- AR6 的 1750–2019 ERF：人为总量 $2.72\ \mathrm{W\,m^{-2}}$，其中 $\mathrm{CO_2}$ $2.16$、$\mathrm{CH_4}$ $0.54$、气溶胶 $-1.1$；2011–2020 增暖 $1.09\ \mathrm{°C}$；2024 年是第一个比 1850–1900 高约 $1.55\ \mathrm{°C}$ 的自然年（WMO）。
- GWP 在给定时间域内对 $\mathrm{CO_2}$ 积分强迫之比；对短寿命气体强烈依赖时间域（甲烷 20 年约 $80$，100 年约 $27$–$30$）。
- 海洋通过 $\mathrm{CO_3^{2-}}$ 缓冲 $\mathrm{CO_2}$；雷维尔因子 $\approx 10$ 限制吸收，而吸收降低 pH 和碳酸盐饱和度（海洋酸化，每十年约 $0.02$ 个 pH）。
:::

## 练习

::: exercise 火星的有效温度 {level=1 check="210"}
火星接收 $S_0 = 586\ \mathrm{W\,m^{-2}}$ 的太阳辐照，邦德反照率约 $0.25$。求其有效辐射温度。（$T_\mathrm{e}$ 以 K 计，保留两位有效数字。）
::: solution
$T_\mathrm{e} = [586\times0.75/(4\times5.670\times10^{-8})]^{1/4} = (1.938\times10^{9})^{1/4} = 210\ \mathrm{K}$。火星的平均表面温度也约为 $210\ \mathrm{K}$：其稀薄的 $\mathrm{CO_2}$ 大气（约 $0.6\ \mathrm{kPa}$）只产生几开尔的温室增暖，因为谱线的压强变宽很弱，带翼保持透明。
:::
:::

::: exercise 2024 年的 CO₂ 强迫 {level=1 check="2.27"}
用 $\Delta F = 5.35\ln(C/C_0)$、$C_0 = 278\ \mathrm{ppm}$，求 $424.6\ \mathrm{ppm}$ 的强迫。（$\Delta F$ 以 $\mathrm{W\,m^{-2}}$ 计，保留三位有效数字。）
::: solution
$5.35\ln(424.6/278) = 5.35\times0.4235 = 2.27\ \mathrm{W\,m^{-2}}$。（较新的 AR6 表达式给出的值略大。）
:::
:::

::: exercise 地球的维恩峰 {level=1 check="10.1"}
$288\ \mathrm{K}$ 的黑体在什么波长处辐射最强（按单位波长）？（$\lambda_\text{max}$ 以 $\mathrm{\mu m}$ 计，保留三位有效数字。）
::: solution
$\lambda_\text{max} = 2898\ \mathrm{\mu m\,K}/288\ \mathrm{K} = 10.1\ \mathrm{\mu m}$ ——位于大气窗口之内，这就是窗口对冷却如此重要的原因。
:::
:::

::: exercise CO₂ 倍增的增暖 {level=2 check="3.0"}
用简化强迫公式和气候敏感度参数 $\lambda = 0.80\ \mathrm{K\,W^{-1}\,m^2}$，求 $C = 556\ \mathrm{ppm}$ 相对 $278\ \mathrm{ppm}$ 的平衡增暖。（$\Delta T$ 以 K 计，保留两位有效数字。）
::: solution
$\Delta F = 5.35\ln2 = 3.71\ \mathrm{W\,m^{-2}}$，故 $\Delta T = 0.80\times3.71 = 3.0\ \mathrm{K}$ ——即 AR6 最佳估计的 ECS。化学（强迫）的把握约 $10\ \%$；响应参数 $\lambda$ 才是主要的不确定度所在。
:::
:::

::: exercise 单层大气的发射率 {level=2 check="0.78"}
在[[#ex-one-layer]]的模型中，取 $T_\mathrm{e} = 254.6\ \mathrm{K}$，什么发射率 $\varepsilon$ 给出 $T_\mathrm{s} = 288\ \mathrm{K}$？（$\varepsilon$ 保留两位有效数字。）
::: solution
由 $T_\mathrm{s}^4(2-\varepsilon) = 2T_\mathrm{e}^4$，$\varepsilon = 2[1 - (T_\mathrm{e}/T_\mathrm{s})^4] = 2[1 - (0.8840)^4] = 2(1 - 0.6106) = 0.78$。
:::
:::

::: exercise 甲烷泄漏的 CO₂-当量 {level=2 check="279"}
某气田一年泄漏 $10.0\ \mathrm{Tg}$ 甲烷。用 AR6 甲烷的 $\mathrm{GWP}(100)$ $27.9$（未按化石/非化石区分的表列值），以 $\mathrm{CO_2}$-当量表示。改用 $\mathrm{GWP}(20) \approx 81$ 结果如何变化？（以 $\mathrm{Tg\,CO_2}$-当量计，填入按 $\mathrm{GWP}(100)$ 所得的值。）
::: solution
$10.0\times27.9 = 279\ \mathrm{Tg\,CO_2}$-当量。用 $\mathrm{GWP}(20) = 81$ 则为 $810\ \mathrm{Tg\,CO_2}$-当量。两者都谈不上“对”：前者比较一个世纪上的积分强迫，后者比较二十年上的。《联合国气候公约》下的清单现已按 AR5 或 AR6 的 $\mathrm{GWP}(100)$ 报告，且必须注明所用度量。
:::
:::

::: exercise 指数翼部导致的对数强迫 {level=3 check="2"}
(a) 用[[#proof-log-forcing]]的论证证明：谱带由 $\sigma(\nu) = \sigma_0e^{-\lvert\nu - \nu_0\rvert/\Gamma}$ 描述的气体，其强迫只通过 $\ln(N/N_0)$ 依赖于浓度。(b) 由此求 $\mathrm{CO_2}$ 四倍的强迫与两倍强迫之比。(c) 解释为什么 $N$ 很小时该结果失效。（填入 (b) 之比。）
::: solution
(a) 不透明半宽是使 $\sigma N = 1$ 的 $\lvert\nu - \nu_0\rvert$，即 $\Gamma\ln(\sigma_0N)$；强迫是 $\Delta B$ 乘不透明总宽的改变 $2\Gamma\Delta B[\ln(\sigma_0N) - \ln(\sigma_0N_0)] = 2\Gamma\Delta B\ln(N/N_0)$，与 $\sigma_0$ 无关。(b) $\ln4/\ln2 = 2$：四倍给出两倍强迫的二倍（用 $5.35$ 时为 $7.4$ 对 $3.7\ \mathrm{W\,m^{-2}}$）。(c) 若 $\sigma_0N < 1$，则无一处不透明，谱带光学薄，吸收份额 $\approx\int\sigma(\nu)N\,\mathrm{d}\nu$ 与 $N$ 成线性；只有带心饱和后对数律才适用。那正是氯氟烃和 $\mathrm{SF_6}$ 所处的状态，所以它们每个分子的强迫大得多。
:::
:::

::: exercise 最简模型中的酸化 {level=3 check="-0.18"}
设海水只含碳酸盐体系，碳酸盐碱度 $A_\mathrm{C} = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}]$ 固定，且 $[\mathrm{CO_3^{2-}}] \ll [\mathrm{HCO_3^-}]$。(a) 证明 $[\mathrm{H^+}] \approx K_0K_1p_{\mathrm{CO_2}}/A_\mathrm{C}$，从而 $\Delta\mathrm{pH} \approx -\log_{10}(p_2/p_1)$。(b) 计算 $280 \to 420\ \mathrm{\mu atm}$ 的 $\Delta\mathrm{pH}$。(c) 计入硼酸盐和碳酸根的完整计算给出 $-0.14$；解释为什么简单模型高估了变化。（(b) 的 $\Delta\mathrm{pH}$ 保留两位有效数字。）
::: hint
写出 $[\mathrm{HCO_3^-}] = K_1[\mathrm{CO_2^*}]/[\mathrm{H^+}]$，其中 $[\mathrm{CO_2^*}] = K_0p_{\mathrm{CO_2}}$。
:::
::: solution
(a) $[\mathrm{CO_3^{2-}}]$ 可略时，$A_\mathrm{C} \approx [\mathrm{HCO_3^-}] = K_1K_0p_{\mathrm{CO_2}}/[\mathrm{H^+}]$，故 $[\mathrm{H^+}] \approx K_0K_1p/A_\mathrm{C}$；$A_\mathrm{C}$ 固定时 $[\mathrm{H^+}]\propto p$，$\Delta\mathrm{pH} = -\log_{10}(p_2/p_1)$。(b) $-\log_{10}(1.5) = -0.176 \approx -0.18$。(c) 实际上 $[\mathrm{CO_3^{2-}}]$ 约占 DIC 的 $10\ \%$，硼酸盐保持着约 $100\ \mu$mol kg⁻¹ 的碱度：加入 $\mathrm{CO_2}$ 时，碳酸根和硼酸盐被质子化（$\mathrm{CO_3^{2-} + CO_2 + H_2O \rightarrow 2\,HCO_3^-}$，$\mathrm{B(OH)_4^- + CO_2 \rightarrow B(OH)_3 + HCO_3^-}$），消耗掉所加酸的一部分。这种缓冲正是雷维尔因子所度量的东西；它把 pH 变化从 $0.18$ 降到 $0.14$ ——代价是牺牲钙化生物所需的碳酸根离子。
:::
:::

::: exercise 氧化亚氮的 GWP 时间域 {level=3 check="1.03"}
用积分 $\int_0^{20}x_{\mathrm{CO_2}}\,\mathrm{d}t = 14.24\ \mathrm{yr}$ 和 $\int_0^{100}x_{\mathrm{CO_2}}\,\mathrm{d}t = 52.36\ \mathrm{yr}$，求寿命单一为 $109$ 年的 $\mathrm{N_2O}$ 的 $\mathrm{GWP}(20)/\mathrm{GWP}(100)$。（比值保留三位有效数字。）
::: solution
分子：$109(1 - e^{-20/109})/14.24 = 109\times0.1676/14.24 = 1.283$。分母：$109(1 - e^{-100/109})/52.36 = 109\times0.6005/52.36 = 1.250$。比值 $= 1.283/1.250 = 1.03$。对寿命与时间域相当的气体，它自己的积分和 $\mathrm{CO_2}$ 的积分都以相近的速率增长，时间域的选取几乎无关紧要——这与 AR6 的 $\mathrm{GWP}(20) = \mathrm{GWP}(100) = 273$ 一致。
:::
:::
