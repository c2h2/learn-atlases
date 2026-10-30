1952 年夏天，加州理工学院的生物化学家哈根-斯米特（Arie Haagen-Smit）本来在研究菠萝的香味，却把仪器对准了让洛杉矶人眼睛刺痛、让庄稼叶片开裂的棕色烟霾。他证明这烟霾根本不是烟，而是在空气中被制造出来的新东西：把汽车尾气——氮氧化物与未燃尽的碳氢化合物——晒到阳光下，臭氧就出现了。这是一种前所未有的污染。1952 年 12 月的伦敦烟雾一周之内夺去数千条生命，那是煤烟、二氧化硫与雾构成的**还原性**烟雾，在寒冷、黑暗、无风的日子里最重。洛杉矶的烟雾则是**氧化性**的光化学烟雾，在炎热明亮的午后最重，而且无法归咎于任何一根烟囱，因为它的关键成分是化学在大气中生成的二次产物。

本课讲的就是这套化学。它的主角是一种丰度约为 $10^{13}$ 分之一个分子的自由基——羟基自由基 $\mathrm{OH}$——它氧化几乎每一种排入对流层的气体，从而决定了它们各自的寿命。它的剧情是由阳光（[[kinetics/photochemistry]]）驱动的自由基链反应（[[kinetics/chain-reactions]]）：氮氧化物充当催化剂，挥发性有机物充当燃料，副产物是臭氧。平流层臭氧（[[environmental-chemistry/stratospheric-ozone]]）是盾牌；我们呼吸的空气里的臭氧却是氧化剂，损伤肺和作物，还是第三重要的人为温室气体。

## 羟基自由基：大气的清洁剂

排入大气的大多数气体——甲烷、一氧化碳、碳氢化合物、二氧化硫、氨、二甲基硫、氢氯氟烃——都不是被 $\mathrm{O_2}$ 直接除去的。氧分子是基态三重态，键很强，它与闭壳层分子反应的势垒很大。氧化它们的是阳光制造的一小撮自由基，首推 $\mathrm{OH}$。它的一次源是臭氧的光解，只要波长足够短、能生成激发原子 $\mathrm{O(^1D)}$ 即可（实际上是 $\lambda \lesssim 330\ \mathrm{nm}$，取哈金斯带的长波边缘，因为更短的紫外到不了对流层）：
$$
\begin{aligned}
&\mathrm{O_3} + h\nu \rightarrow \mathrm{O(^1D)} + \mathrm{O_2} && J_{\mathrm{O^1D}}\\
&\mathrm{O(^1D)} + \mathrm{M} \rightarrow \mathrm{O(^3P)} + \mathrm{M} && k_\mathrm{M}\quad(\mathrm{M = N_2, O_2})\\
&\mathrm{O(^1D)} + \mathrm{H_2O} \rightarrow 2\,\mathrm{OH} && k_{\mathrm{H_2O}}
\end{aligned}
$$
被猝灭的基态原子与 $\mathrm{O_2}$ 重新化合成臭氧，所以那是一个零净循环。只有在水分子先于猝灭撞上 $\mathrm{O(^1D)}$ 的那一小部分激发原子里才真正生成自由基。

::: proposition OH 的一次生成 {#prop-oh-production}
在 $\mathrm{O(^1D)}$ 的稳态下，$\mathrm{OH}$ 的一次生成率为
$$
P_{\mathrm{OH}} = 2\,\varepsilon\,J_{\mathrm{O^1D}}[\mathrm{O_3}],
\qquad
\varepsilon = \frac{k_{\mathrm{H_2O}}[\mathrm{H_2O}]}{k_{\mathrm{H_2O}}[\mathrm{H_2O}] + k_\mathrm{M}[\mathrm{M}]} ,
$$
其中 $\varepsilon$ 是与水反应的激发态原子份额。由于实际上 $k_\mathrm{M}[\mathrm{M}] \gg k_{\mathrm{H_2O}}[\mathrm{H_2O}]$，$\varepsilon \approx (k_{\mathrm{H_2O}}/k_\mathrm{M})\,x_{\mathrm{H_2O}}$：OH 生成率正比于臭氧、紫外与湿度。此结果假定没有其他重要的 $\mathrm{O(^1D)}$ 反应物，并略去自由基的二次源（甲醛、亚硝酸和过氧化物的光解，以及烯烃的臭氧化），而在污染空气中后者可能占主导。
:::

::: proof 激发态原子的稳态 {#proof-oh-production}
$\mathrm{O(^1D)}$ 以 $J_{\mathrm{O^1D}}[\mathrm{O_3}]$ 生成，经由两个对 $\mathrm{O(^1D)}$ 为一级的过程损失，故 $\mathrm{d}[\mathrm{O(^1D)}]/\mathrm{d}t = J[\mathrm{O_3}] - (k_\mathrm{M}[\mathrm{M}] + k_{\mathrm{H_2O}}[\mathrm{H_2O}])[\mathrm{O(^1D)}]$。它的寿命约一纳秒，所以[[kinetics/reaction-mechanisms]]的准稳态近似非常好：$[\mathrm{O(^1D)}] = J[\mathrm{O_3}]/(k_\mathrm{M}[\mathrm{M}] + k_{\mathrm{H_2O}}[\mathrm{H_2O}])$。与水每反应一次生成两个 $\mathrm{OH}$，故 $P_{\mathrm{OH}} = 2k_{\mathrm{H_2O}}[\mathrm{H_2O}][\mathrm{O(^1D)}] = 2\varepsilon J[\mathrm{O_3}]$，$\varepsilon$ 即分支比，与[[kinetics/photochemistry]]中激发态分子各失活途径的竞争完全同构。
:::

::: example 多少 O(¹D) 生成 OH？ {#ex-epsilon}
$298\ \mathrm{K}$、$1\ \mathrm{atm}$、水摩尔分数 $1.0\ \%$，用 JPL 速率常数 $k_{\mathrm{H_2O}} = 1.63\times10^{-10}e^{60/T}$、$k_{\mathrm{N_2}} = 2.15\times10^{-11}e^{110/T}$、$k_{\mathrm{O_2}} = 3.3\times10^{-11}e^{55/T}\ \mathrm{cm^3\,s^{-1}}$ 求 $\varepsilon$，并求 $40\ \mathrm{ppb}$ 臭氧、$J_{\mathrm{O^1D}} = 3.0\times10^{-5}\ \mathrm{s^{-1}}$（中纬度夏季正午的典型值）下的 OH 生成率。
::: solution
$298\ \mathrm{K}$ 下的速率常数：$k_{\mathrm{H_2O}} = 1.99\times10^{-10}$、$k_{\mathrm{N_2}} = 3.11\times10^{-11}$、$k_{\mathrm{O_2}} = 3.95\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$。对空气，$k_\mathrm{M} = 0.781\times3.11\times10^{-11} + 0.210\times3.95\times10^{-11} = 3.26\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$。用摩尔分数计算（总数密度约掉），
$$
\varepsilon = \frac{1.99\times10^{-10}\times0.010}{1.99\times10^{-10}\times0.010 + 3.26\times10^{-11}\times0.990} = \frac{1.99\times10^{-12}}{1.99\times10^{-12} + 3.23\times10^{-11}} = 0.058 .
$$
生成 $\mathrm{OH}$ 的激发态原子只有约 $6\ \%$。又 $[\mathrm{O_3}] = 40\times10^{-9}\times2.46\times10^{19} = 9.85\times10^{11}\ \mathrm{cm^{-3}}$，
$$
P_{\mathrm{OH}} = 2\times0.058\times3.0\times10^{-5}\times9.85\times10^{11} = 3.4\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}} .
$$
在更干或更冷的空气里——对流层上层、极地、冬季——$\varepsilon$ 随水汽含量成比例下降，这就是 OH 集中于湿热多阳的热带的原因之一。
:::
:::

$\mathrm{OH}$ 几乎与一切反应，所以它自己的寿命很短——清洁空气中约一秒，污染城市里十分之一秒——其浓度处于生成与损失之间的即时稳态：
$$
[\mathrm{OH}]_\text{ss} = \frac{P_{\mathrm{OH}}}{\sum_i k_i[\mathrm{X}_i]} ,
$$ {#eq-oh-ss}
分母称为 **OH 反应性**（单位 $\mathrm{s^{-1}}$），是对所有反应物 $\mathrm{X}_i$ 的拟一级损失率求和。清洁空气中反应性主要由 $\mathrm{CO}$ 和 $\mathrm{CH_4}$ 贡献；森林里是异戊二烯和萜烯；城市里是 $\mathrm{NO_2}$ 和人为碳氢化合物。用[[#ex-epsilon]]的生成率、$120\ \mathrm{ppb}$ 的 $\mathrm{CO}$（$1\ \mathrm{atm}$ 下 $k = 2.3\times10^{-13}\ \mathrm{cm^3\,s^{-1}}$）和 $1900\ \mathrm{ppb}$ 的 $\mathrm{CH_4}$（$298\ \mathrm{K}$ 下 $k = 6.3\times10^{-15}$），反应性为 $0.68 + 0.30 = 0.98\ \mathrm{s^{-1}}$，正午 $[\mathrm{OH}] \approx 3.5\times10^{6}\ \mathrm{cm^{-3}}$。夜间没有光解，它几乎降到零。全球昼夜年均值约 $1\times10^{6}\ \mathrm{cm^{-3}}$——混合比约 $0.04\ \mathrm{ppt}$。

::: definition 对 OH 的寿命 {#def-oh-lifetime}
对于经由 $\mathrm{OH + X \rightarrow products}$（速率常数 $k_\mathrm{X}$）被去除的物种 $\mathrm{X}$，其对 $\mathrm{X}$ 的损失是拟一级的，**对 OH 的寿命**为
$$
\tau_\mathrm{X} = \frac{1}{k_\mathrm{X}\,\overline{[\mathrm{OH}]}} ,
$$
其中 $\overline{[\mathrm{OH}]}$ 是合适的平均 OH 浓度（长寿命物种要遍历整层对流层，取全球平均 $\approx 1\times10^{6}\ \mathrm{cm^{-3}}$；短寿命物种取当地白昼值）。若 $\mathrm{X}$ 还有其它汇，总寿命满足 $1/\tau = \sum 1/\tau_i$。
:::

取 $\overline{[\mathrm{OH}]} = 1\times10^{6}\ \mathrm{cm^{-3}}$（速率常数取自 JPL 与 IUPAC 评估；温度依赖的按注明条件取值）：

| 物种 | $k_{\mathrm{OH}}/\mathrm{cm^3\,s^{-1}}$ | 寿命 |
|---|---|---|
| 甲烷，$\mathrm{CH_4}$ | $3.6\times10^{-15}$（$272\ \mathrm{K}$） | $8.8\ \mathrm{yr}$ |
| 甲基氯仿，$\mathrm{CH_3CCl_3}$ | $6.1\times10^{-15}$（$272\ \mathrm{K}$） | $5.2\ \mathrm{yr}$ |
| 一氧化碳，$\mathrm{CO}$ | $2.3\times10^{-13}$ | $50\ \mathrm{d}$ |
| 乙烷，$\mathrm{C_2H_6}$ | $2.5\times10^{-13}$（$298\ \mathrm{K}$） | $46\ \mathrm{d}$ |
| 二氧化硫，$\mathrm{SO_2}$ | $9\times10^{-13}$ | $13\ \mathrm{d}$ |
| 二氧化氮，$\mathrm{NO_2}$ | $1.1\times10^{-11}$ | $1\ \mathrm{d}$ |
| 异戊二烯，$\mathrm{C_5H_8}$ | $1.0\times10^{-10}$ | $3\ \mathrm{h}$ |

（甲烷那一行取 $272\ \mathrm{K}$，这是惯用来代表 $\mathrm{CH_4}$ 所感知的质量加权对流层的温度约定。）速率常数上跨越七个数量级，寿命也就跨越七个数量级，随之而来的是一种全球温室气体与一种局地烟雾前体物之间的差别。

::: example 用甲基氯仿称量 OH {#ex-mcf}
全球 OH 浓度无法直接测量（它在昼夜之间、地地之间相差好几个数量级），只能由示踪反演：排放清单清楚、唯一重要汇是 OH 的物种。工业甲基氯仿 $\mathrm{CH_3CCl_3}$ 堪称完美：排放有据可查，且在《蒙特利尔议定书》下淘汰之后，其衰减可直接观测。若观测衰减对应对流层 OH 的寿命 $6.0$ 年，这暗示怎样的平均 OH 浓度？取 $T = 272\ \mathrm{K}$，$k = 1.64\times10^{-12}\exp(-1520/T)\ \mathrm{cm^3\,s^{-1}}$。
::: solution
$k = 1.64\times10^{-12}\,e^{-5.588} = 6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}}$。由[[#def-oh-lifetime]]，
$$
\overline{[\mathrm{OH}]} = \frac{1}{k\,\tau} = \frac{1}{6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}} \times 6.0\times3.156\times10^{7}\ \mathrm{s}} = 8.6\times10^{5}\ \mathrm{cm^{-3}} .
$$
这类分析（普林（Prinn）等，*Science* 1995，以及 AGAGE 网络的后续更新）给出的全球均值接近 $1\times10^{6}\ \mathrm{cm^{-3}}$，年际变化只有百分之几。这一方法有个微妙之处：随着排放下降，剩余的甲基氯仿稀薄到残余排放和海洋吸收的不确定度开始主导的程度，如今正与其它新的示踪物联用。
:::
:::

::: warning OH 不会以简单的方式被污染"用尽" {#warn-oh-buffer}
人们很容易以为多排一些 $\mathrm{CO}$ 或甲烷就会把 OH 滴定掉。有两个效应使事情复杂化。其一，OH 被不断循环再生：$\mathrm{OH}$ 氧化 $\mathrm{CO}$ 时生成 $\mathrm{HO_2}$，而在 $\mathrm{NO}$ 存在下 $\mathrm{HO_2 + NO \rightarrow OH + NO_2}$ 把它再生出来，所以真正的收支属于总的 $\mathrm{HO_x} = \mathrm{OH} + \mathrm{HO_2}$，而 $\mathrm{NO_x}$ 排放实际上*提高* OH。其二，同一套化学还会生成臭氧，而臭氧本身就是 OH 的主要来源。确实，多出的甲烷会使 OH 略有下降——这就是为什么甲烷的*扰动*寿命（IPCC AR6 中为 $11.8$ 年）长于其*总*寿命（约 $9$ 年）——但这一反馈只是 $1.3$ 倍左右，不是失控。关于大气"氧化能力"的任何论断，都需要整个 $\mathrm{HO_x}$–$\mathrm{NO_x}$–臭氧系统。
:::

## 氮氧化物与光稳态

氮氧化物 $\mathrm{NO}$ 与 $\mathrm{NO_2}$（合称 $\mathrm{NO_x}$）主要来自高温燃烧——发动机和电厂中经泽尔多维奇（Zeldovich）机理 $\mathrm{O + N_2 \rightarrow NO + N}$、$\mathrm{N + O_2 \rightarrow NO + O}$ 生成——此外来自土壤和闪电。阳光下它们迅速互变：
$$
\begin{aligned}
&\mathrm{NO_2} + h\nu\ (\lambda < 420\ \mathrm{nm}) \rightarrow \mathrm{NO} + \mathrm{O(^3P)} && J_{\mathrm{NO_2}}\\
&\mathrm{O(^3P)} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{O_3} + \mathrm{M} && \text{快}\\
&\mathrm{NO} + \mathrm{O_3} \rightarrow \mathrm{NO_2} + \mathrm{O_2} && k_{\mathrm{NO+O_3}}
\end{aligned}
$$
这三个反应生成一个臭氧又毁掉一个——一个**零净循环**，不产生净臭氧，却定死了 $\mathrm{NO_2}$ 与 $\mathrm{NO}$ 之比。

::: proposition 莱顿光稳态 {#prop-leighton}
若互变 $\mathrm{NO}$ 与 $\mathrm{NO_2}$ 的反应只有上面三个，则阳光下（几分钟之内）
$$
[\mathrm{O_3}] = \frac{J_{\mathrm{NO_2}}}{k_{\mathrm{NO+O_3}}}\,\frac{[\mathrm{NO_2}]}{[\mathrm{NO}]} .
$$
取 $J_{\mathrm{NO_2}} \approx 8\times10^{-3}\ \mathrm{s^{-1}}$（烈日当头）与 $k_{\mathrm{NO+O_3}} = 3.0\times10^{-12}e^{-1500/T} = 1.9\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$（$298\ \mathrm{K}$），比值 $[\mathrm{NO_2}]/[\mathrm{NO}] = 1$ 对应约 $17\ \mathrm{ppb}$ 臭氧。此关系只适用于阳光下的纯 $\mathrm{NO_x}$；对它的偏离（$\mathrm{NO_2}$ 比臭氧所允许的更多）就度量了把 $\mathrm{NO}$ 不经消耗臭氧而转化为 $\mathrm{NO_2}$ 的过氧自由基。
:::

::: proof NO₂ 的稳态 {#proof-leighton}
$\mathrm{d}[\mathrm{NO_2}]/\mathrm{d}t = -J_{\mathrm{NO_2}}[\mathrm{NO_2}] + k_{\mathrm{NO+O_3}}[\mathrm{NO}][\mathrm{O_3}]$。弛豫时间为 $1/(J_{\mathrm{NO_2}} + k[\mathrm{O_3}]) \approx 1/(0.008 + 0.019)\ \mathrm{s} \approx 40\ \mathrm{s}$（$40\ \mathrm{ppb}$ 臭氧），所以在任何长于几分钟的时间尺度上导数为零。令其为零并解出 $[\mathrm{O_3}]$ 即得结果。数值上 $J/k = 8\times10^{-3}/1.95\times10^{-14} = 4.1\times10^{11}\ \mathrm{cm^{-3}}$，在 $1\ \mathrm{atm}$、$298\ \mathrm{K}$ 下即 $4.1\times10^{11}/2.46\times10^{10} = 17\ \mathrm{ppb}$。
:::

光稳态解释了城市臭氧最反直觉的特征。新鲜 $\mathrm{NO}$ 排放之处——繁忙马路旁边——臭氧立刻被它反应掉（"$\mathrm{NO}$ 滴定"），所以市中心的臭氧*低于*下风向的郊区和乡村，因为那里的 $\mathrm{NO_x}$ 已有时间加工碳氢化合物，臭氧也已有时间累积。只在市中心测臭氧的法规会错过它的峰值。

::: widget plot
f: J/0.0195*x/24.6
x: 0, 6
y: 0, 120
sliders: J=8:1:10:0.5
labels: [\mathrm{O_3}]_\text{PSS}/\text{ppb}
caption: 莱顿光稳态臭氧（ppb）对 $[\mathrm{NO_2}]/[\mathrm{NO}]$ 之比的曲线，$J_{\mathrm{NO_2}}$ 由滑块以 $10^{-3}\ \mathrm{s^{-1}}$ 为单位设定（烈日当头取 $8$，日出日落附近约 $2$–$4$），条件为 $298\ \mathrm{K}$、$1\ \mathrm{atm}$。零净循环本身只能把氧原子在 $\mathrm{NO_2}$、$\mathrm{NO}$ 与 $\mathrm{O_3}$ 之间*重新分配*：要从 $30$–$40\ \mathrm{ppb}$ 的本底升到烟雾事件的 $100$–$200\ \mathrm{ppb}$，必须有某种东西*不用臭氧*就把 $\mathrm{NO}$ 变成 $\mathrm{NO_2}$。
:::

## 挥发性有机物与臭氧净生成

那个"东西"就是一氧化碳与**挥发性有机物**（VOC）——碳氢化合物、醇、醛，以及异戊二烯、萜烯等庞大的生物源化合物家族——的氧化。它们被 OH 氧化生成过氧自由基 $\mathrm{HO_2}$ 与 $\mathrm{RO_2}$，后者可把 $\mathrm{NO}$ 直接转化为 $\mathrm{NO_2}$。最简单的情形是一氧化碳：
$$
\begin{aligned}
\mathrm{CO} + \mathrm{OH} &\rightarrow \mathrm{CO_2} + \mathrm{H}\\
\mathrm{H} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{HO_2} + \mathrm{M}\\
\mathrm{HO_2} + \mathrm{NO} &\rightarrow \mathrm{OH} + \mathrm{NO_2}\\
\mathrm{NO_2} + h\nu &\rightarrow \mathrm{NO} + \mathrm{O}\\
\mathrm{O} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{O_3} + \mathrm{M}\\
\hline
\text{净:}\quad \mathrm{CO} + 2\,\mathrm{O_2} &\rightarrow \mathrm{CO_2} + \mathrm{O_3}
\end{aligned}
$$
$\mathrm{OH}$ 和 $\mathrm{NO_x}$ 都获得再生：$\mathrm{HO_x}$ 是链载体，$\mathrm{NO_x}$ 是催化剂，$\mathrm{CO}$ 是燃料，臭氧是产物。对通用烷烃 $\mathrm{RH}$（写成 $\mathrm{RCH_3}$ 以显示羰基产物）链为
$$
\begin{aligned}
\mathrm{RCH_3} + \mathrm{OH} &\rightarrow \mathrm{RCH_2} + \mathrm{H_2O}\\
\mathrm{RCH_2} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{RCH_2O_2} + \mathrm{M}\\
\mathrm{RCH_2O_2} + \mathrm{NO} &\rightarrow \mathrm{RCH_2O} + \mathrm{NO_2}\\
\mathrm{RCH_2O} + \mathrm{O_2} &\rightarrow \mathrm{RCHO} + \mathrm{HO_2}\\
\mathrm{HO_2} + \mathrm{NO} &\rightarrow \mathrm{OH} + \mathrm{NO_2}\\
2\,(\mathrm{NO_2} + h\nu \rightarrow \mathrm{NO} + \mathrm{O};\ \mathrm{O} + \mathrm{O_2} &\rightarrow \mathrm{O_3})\\
\hline
\text{净:}\quad \mathrm{RCH_3} + 4\,\mathrm{O_2} &\rightarrow \mathrm{RCHO} + \mathrm{H_2O} + 2\,\mathrm{O_3}
\end{aligned}
$$
醛 $\mathrm{RCHO}$ 本身又会在后续步骤中被氧化或光解，每一步都产生更多过氧自由基和更多臭氧，所以一个 VOC 完全氧化每碳可生成多个臭氧分子。第一步中，OH 夺取一个氢原子（对烯烃和芳烃则加成到双键上）；第二步，碳中心自由基以接近碰撞速率加上 $\mathrm{O_2}$；第三步，过氧自由基把一个氧原子交给 $\mathrm{NO}$；第四步，$\mathrm{O_2}$ 夺走烷氧基自由基的 $\alpha$-氢，生成羰基和 $\mathrm{HO_2}$。甲烷经 $\mathrm{CH_3O_2}$、甲醛和 $\mathrm{CO}$ 走同一条路线，这就是它在全球尺度贡献对流层本底臭氧的原因。

::: example 数一数甲烷氧化生成多少臭氧 {#ex-methane-ozone}
高 $\mathrm{NO_x}$ 空气中，甲烷按 $\mathrm{CH_4 \rightarrow CH_3O_2 \rightarrow CH_3O \rightarrow HCHO}$ 氧化，接着 $\mathrm{HCHO + OH \rightarrow HCO + H_2O}$、$\mathrm{HCO + O_2 \rightarrow CO + HO_2}$，最后 $\mathrm{CO \rightarrow CO_2}$（同上）。假设每个过氧自由基都与 $\mathrm{NO}$ 反应，甲烷经此路线完全氧化为 $\mathrm{CO_2}$ 时生成多少个臭氧分子？
::: solution
数过氧自由基把 $\mathrm{NO \rightarrow NO_2}$ 转化的次数即可，因为每个这样生成的 $\mathrm{NO_2}$ 光解产生一个臭氧。（1）$\mathrm{CH_4 + OH \rightarrow CH_3 + H_2O}$、$\mathrm{CH_3 + O_2 \rightarrow CH_3O_2}$、$\mathrm{CH_3O_2 + NO \rightarrow CH_3O + NO_2}$：**一个**。（2）$\mathrm{CH_3O + O_2 \rightarrow HCHO + HO_2}$、$\mathrm{HO_2 + NO \rightarrow OH + NO_2}$：**两个**。（3）$\mathrm{HCHO + OH \rightarrow HCO + H_2O}$、$\mathrm{HCO + O_2 \rightarrow CO + HO_2}$、$\mathrm{HO_2 + NO}$：**三个**。（4）$\mathrm{CO + OH \rightarrow CO_2 + H}$、$\mathrm{H + O_2 \rightarrow HO_2}$、$\mathrm{HO_2 + NO}$：**四个**。所以每个甲烷**四个臭氧分子**，代价是消耗三个 OH（第 1、3、4 步）又再生三个（经第 2、3、4 步的 $\mathrm{HO_2 + NO}$——第 1 步消耗的 OH 在第 2 步再生）。反之，若甲醛经自由基通道*光解* $\mathrm{HCHO} + h\nu \rightarrow \mathrm{H} + \mathrm{HCO}$，则多出两个 $\mathrm{HO_2}$，产率升至五个臭氧并净增自由基。低 $\mathrm{NO_x}$ 空气中过氧自由基彼此反应，甲烷氧化反而可能成为臭氧净*汇*。因此 VOC 的臭氧产率不是固定数，而是化学 regimes 的属性。
:::
:::

## NO_x 限制区与 VOC 限制区

链既需要催化剂也需要燃料，而空气质量管理的头号实际问题——*要削减哪种排放才能降低臭氧？*——取决于二者中缺的是哪种。答案取决于自由基链如何终止。

::: proposition 两个极限区的臭氧生成 {#prop-regimes}
设 $P_{\mathrm{HO_x}}$ 为自由基的一次生成率，$R = \sum k_i[\mathrm{VOC}_i]$ 为 VOC 对 OH 的反应性，并设链的终止途径或者过氧自反应 $\mathrm{HO_2 + HO_2 \rightarrow H_2O_2 + O_2}$（速率常数 $k_\mathrm{p}$），或者 $\mathrm{OH + NO_2 + M \rightarrow HNO_3 + M}$（速率常数 $k_\mathrm{n}$）。臭氧生成率为 $P(\mathrm{O_3}) \approx k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}] \approx R[\mathrm{OH}]$，两个极限分别为：
- **$\mathrm{NO_x}$ 限制区**（低 $\mathrm{NO_x}$，过氧化物终止）：$P(\mathrm{O_3}) = k_{\mathrm{HO_2+NO}}\left(P_{\mathrm{HO_x}}/2k_\mathrm{p}\right)^{1/2}[\mathrm{NO}]$，正比于 $\mathrm{NO}$，与 VOC 无关；
- **VOC 限制区**（高 $\mathrm{NO_x}$，硝酸终止）：$P(\mathrm{O_3}) = P_{\mathrm{HO_x}}\,R/(k_\mathrm{n}[\mathrm{NO_2}])$，正比于 VOC 反应性，与 $\mathrm{NO_2}$ *反*比。
适用条件：自由基稳态，每个 OH–VOC 反应生成一个与 $\mathrm{NO}$ 反应的 $\mathrm{HO_2}$（单步链），$\mathrm{NO_x}$ 处于光稳态。
:::

::: proof 两个极限下的自由基收支 {#proof-regimes}
稳态下自由基生成等于自由基终止：
$$
P_{\mathrm{HO_x}} = 2k_\mathrm{p}[\mathrm{HO_2}]^2 + k_\mathrm{n}[\mathrm{OH}][\mathrm{NO_2}] ,
$$
而链传递步使 $\mathrm{OH \rightleftharpoons HO_2}$ 快速循环，故 $R[\mathrm{OH}] \approx k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}]$，也就是不耗臭氧地把 $\mathrm{NO}$ 转为 $\mathrm{NO_2}$ 的速率 $P(\mathrm{O_3})$。*低 $\mathrm{NO_x}$*：过氧化物项主导，$[\mathrm{HO_2}] = (P_{\mathrm{HO_x}}/2k_\mathrm{p})^{1/2}$，与 VOC 无关，且 $P(\mathrm{O_3}) = k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}]$ 与 $\mathrm{NO}$ 成线性。增加 VOC 只改变 OH/$\mathrm{HO_2}$ 之比，不改变总链速率。*高 $\mathrm{NO_x}$*：硝酸项主导，$[\mathrm{OH}] = P_{\mathrm{HO_x}}/(k_\mathrm{n}[\mathrm{NO_2}])$，且 $P(\mathrm{O_3}) = R[\mathrm{OH}] = P_{\mathrm{HO_x}}R/(k_\mathrm{n}[\mathrm{NO_2}])$。这里 $\mathrm{NO_2}$ 是自由基*汇*：更多 $\mathrm{NO_x}$ 更快清除链载体，从而*降低*臭氧生成。两极限之间 $P(\mathrm{O_3})$ 经过一个极大值，极大值所在 $\mathrm{NO_x}$ 随 $R$ 升高。一般情形需求解自由基收支的二次方程得 $[\mathrm{OH}]$，下图做的正是这件事。
:::

::: widget plot
f: 0.2927*R*Q/(0.1353*x + sqrt(0.01831*x^2 + 0.0021224*R^2*Q/x^2))
x: 0.05, 60
y: 0, 60
sliders: R=5:1:30:1; Q=10:1:30:1
labels: P(\mathrm{O_3})/\text{ppb h}^{-1}
caption: 臭氧生成率对 $\mathrm{NO_x}$（ppb，取 $\mathrm{NO} = \mathrm{NO_2}$）的精确曲线，由[[#prop-regimes]]的稳态自由基收支严格解出。滑块：VOC 反应性 $R$（$\mathrm{s^{-1}}$）与自由基一次生成率 $P_{\mathrm{HO_x}}$（以 $10^{6}\ \mathrm{cm^{-3}\,s^{-1}}$ 为单位）。速率常数：$k_{\mathrm{HO_2+NO}} = 8.5\times10^{-12}$、$k_\mathrm{p} = 2.9\times10^{-12}$、$k_\mathrm{n} = 1.1\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$。峰左侧（上升段）是 $\mathrm{NO_x}$ 限制区；右侧（下降段）是 VOC 限制区，那里削减 $\mathrm{NO_x}$ 反而*增加*臭氧生成。增大 $R$ 使峰移向更高 $\mathrm{NO_x}$——这就是同一座城市随车队和植被变化而切换 regime 的原因。
:::

::: example 哪个限制区？ {#ex-regime}
用图中模型取 $P_{\mathrm{HO_x}} = 1.0\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$、$R = 5\ \mathrm{s^{-1}}$，$1\ \mathrm{ppb}$ $\mathrm{NO_x}$ 处臭氧生成率为 $16.7\ \mathrm{ppb\,h^{-1}}$，$50\ \mathrm{ppb}$ 处为 $1.1\ \mathrm{ppb\,h^{-1}}$。（a）验证高 $\mathrm{NO_x}$ 值与 VOC 限制区公式一致。（b）两点各处于哪个限制区？对控制策略各意味着什么？
::: solution
（a）$50\ \mathrm{ppb}$ $\mathrm{NO_x}$ 时 $[\mathrm{NO_2}] = 25\ \mathrm{ppb} = 6.15\times10^{11}\ \mathrm{cm^{-3}}$。VOC 限制区公式给出
$$
P(\mathrm{O_3}) = \frac{P_{\mathrm{HO_x}}R}{k_\mathrm{n}[\mathrm{NO_2}]} = \frac{1.0\times10^{7}\times5}{1.1\times10^{-11}\times6.15\times10^{11}} = 7.4\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}},
$$
即 $7.4\times10^{6}\times3600/2.46\times10^{10} = 1.08\ \mathrm{ppb\,h^{-1}}$，与精确值 $1.1$ 吻合。（b）$50\ \mathrm{ppb}$ 处曲线在下降：空气处于 **VOC 限制区**，典型于市中心或贴近源头的烟羽。削减 VOC 成比例降低臭氧生成；只削 $\mathrm{NO_x}$ 起初反而会*抬高*臭氧（这正是某些城市观测到的"周末效应"的根源——柴油车流量下降的周日臭氧反而更高）。$1\ \mathrm{ppb}$ 处在峰左侧（$R = 5$ 时峰约在 $2\ \mathrm{ppb}$ 附近）：空气处于 **$\mathrm{NO_x}$ 限制区**，典型于郊区、农村和区域本底：那里只有削 $\mathrm{NO_x}$ 有效，削 VOC 作用不大。城市烟羽随向下游老化从前一 regime 移入后一 regime，所以区域臭氧总体对 $\mathrm{NO_x}$ 控制有响应，而某些城市的本地峰值首先响应 VOC 控制。野外观测用 $\mathrm{H_2O_2/HNO_3}$ 等指示比值诊断 regime，它们比较的正是两条终止通道。
:::
:::

::: quiz
在 VOC 限制区的城市，当局把 $\mathrm{NO_x}$ 排放削减 $30\ \%$ 而 VOC 排放不变。市中心臭氧最可能的即时反应是什么？
- [ ] 下降约 $30\ \%$，因为 $\mathrm{NO_x}$ 是催化剂。
- [x] 上升，因为更少的 $\mathrm{NO_2}$ 终止更少的自由基链，更少的 $\mathrm{NO}$ 滴定臭氧。
- [ ] 不变，因为臭氧只取决于阳光。
- [ ] 下降，因为光解的 $\mathrm{NO_2}$ 变少了。
::: solution
在 $P(\mathrm{O_3})$ 曲线的下降段，$\mathrm{NO_2}$ 主要经 $\mathrm{OH + NO_2 \rightarrow HNO_3}$ 充当自由基汇，除掉一部分反而*增加*链长和臭氧生成；同时新鲜 $\mathrm{NO}$ 变少，局地滴定臭氧也变少。更远的下风向空气处于 $\mathrm{NO_x}$ 限制区，同样的削减会降低那里的臭氧——所以这项政策对区域仍可能是对的，只是市中心的反应与朴素的预期相反。
:::
:::

## 夜间化学与 NO_x 的储库

夜间 $\mathrm{NO_2}$ 光解停止、OH 消失，但氧化经**硝酸自由基**继续：
$$
\mathrm{NO_2} + \mathrm{O_3} \rightarrow \mathrm{NO_3} + \mathrm{O_2},
\qquad
\mathrm{NO_3} + \mathrm{NO_2} + \mathrm{M} \rightleftharpoons \mathrm{N_2O_5} + \mathrm{M} .
$$
$\mathrm{NO_3}$ 在白昼数秒内即光解，所以只在夜间存在，夜间它氧化烯烃、生物源萜烯和二甲基硫。它的伙伴 $\mathrm{N_2O_5}$（五氧化二氮）在湿润粒子上水解，$\mathrm{N_2O_5 + H_2O \rightarrow 2\,HNO_3}$，这一多相反应是全球 $\mathrm{NO_x}$ 的一大汇，也是通向[[environmental-chemistry/particulates-acid-deposition]]粒子化学的一环。白昼 $\mathrm{NO_x}$ 主要以 $\mathrm{OH + NO_2}$ 生成的硝酸被去除，并以**过氧乙酰硝酸酯**（PAN，$\mathrm{CH_3C(O)OONO_2}$）的形式储存，由乙酰过氧自由基与 $\mathrm{NO_2}$ 生成。PAN 在地面温度下热不稳定（$298\ \mathrm{K}$ 寿命一小时），却能在寒冷的对流层上层存活数月，于是把 $\mathrm{NO_x}$ 从污染区运到偏远地区，随空气下沉分解并在远离任何源头处造出臭氧。PAN 也是催泪剂和植物毒素——正是让洛杉矶烟雾刺眼的那类成分之一。

## 作为污染物的臭氧

臭氧是强氧化剂。在呼吸道表面，它与衬里液体中的不饱和脂肪酸和抗氧化剂反应（经 $\mathrm{C{=}C}$ 键的臭氧化和硫醇的氧化），生成醛、过氧化氢物等活性物质，引发炎症；它被列为呼吸道刺激物，流行病学研究把长期暴露与肺功能下降和过早死亡联系起来。植物经气孔吸收臭氧，臭氧损伤细胞膜，降低光合作用和作物产量。它还是温室气体：IPCC AR6 评估，1750 年以来对流层臭氧的增加造成了约 $0.47\ \mathrm{W\,m^{-2}}$ 的有效辐射强迫。

截至 2026 年的标准与指南（照录，不作评判）：

- **世界卫生组织全球空气质量指南**（2021）建议日最大 8 小时均值的高峰季平均不超过 $60\ \mathrm{\mu g\,m^{-3}}$（约 $30\ \mathrm{ppb}$），日最大 8 小时均值不超过 $100\ \mathrm{\mu g\,m^{-3}}$（约 $51\ \mathrm{ppb}$）。
- **欧盟**：第 2008/50/EC 号指令为日最大 8 小时均值设目标值 $120\ \mathrm{\mu g\,m^{-3}}$，三年平均每年超标不得超过 25 天；修订后的环境空气质量指令（EU）2024/2881 保留臭氧目标值形式，更严格的限值自 2030 年生效。
- **美国**：环境保护署 2015 年制定的国家环境空气质量标准（NAAQS）为年第四高日最大 8 小时平均值的三年平均 $0.070\ \mathrm{ppm}$（$70\ \mathrm{ppb}$）。

这些数值不同，是因为用途不同：世卫指南是基于健康的建议，而有法律约束力的标准还要权衡可达性和本底臭氧。由于地面臭氧的大部分是区域甚至半球本底（北半球中纬度通常 $30$–$50\ \mathrm{ppb}$），城市不可能单靠本地措施达到严格的臭氧标准——这一科学事实正是臭氧在《长程越界空气污染公约》1999 年《哥德堡议定书》等国际协定下处理的原因之一。

::: warning 臭氧峰值在下风向，不在车流处 {#warn-ozone-location}
学生常以为臭氧会跟着其它交通污染物走。短尺度上它恰好相反。马路边，新鲜 $\mathrm{NO}$ 经 $\mathrm{NO + O_3 \rightarrow NO_2 + O_2}$ 消灭臭氧；总**奇数氧** $\mathrm{O_x} = \mathrm{O_3} + \mathrm{NO_2}$ 几乎守恒，只是被移进了 $\mathrm{NO_2}$。臭氧在烟羽漂移的数小时里随 VOC 被氧化而生成，所以最高臭氧通常出现在下风向几十公里处、午后，往往在郊区或农村。比较站点时请用 $\mathrm{O_x}$ 而非单看臭氧，且切勿断定臭氧实测值低的地区就没有臭氧问题。
:::

::: history
哈根-斯米特（Haagen-Smit）1952 年在实验室证明阳光下汽车尾气生成臭氧之后，菲利普·莱顿（Philip Leighton）的专著 *Photochemistry of Air Pollution*（1961）给出了以他命名的光稳态分析。多年间启动链反应的那种氧化剂身份成谜；1971 年海勒姆·莱维二世（Hiram Levy II）在 *Science* 上提出，由 $\mathrm{O(^1D)}$ 与水生成的 $\mathrm{OH}$ 遍布对流层，控制着甲烷和 $\mathrm{CO}$ 的氧化。随后保罗·克鲁岑（Paul Crutzen，1973）与威廉·查梅兹（William Chameides）、詹姆斯·沃克（James Walker，1973）证明同一套化学也能在本底对流层生成臭氧，推翻了"对流层臭氧只来自平流层"的观点。全球 OH 的第一次定量估计是罗纳德·普林（Ronald Prinn）及其同事自 1980 年代起由甲基氯仿收支做出的；OH 的激光诱导荧光和化学电离直接测量直到 1990 年代才成为常规。
:::

## 后续内容

硝酸、硫酸和 VOC 的氧化产物凝结，形成[[environmental-chemistry/particulates-acid-deposition]]中的细粒子和酸沉降。甲烷、臭氧与 OH 反馈作为气候因子在[[environmental-chemistry/greenhouse-gases]]中重访。本课所用速率常数来自[[kinetics/collision-theory]]与[[kinetics/transition-state-theory]]发展起来的实验室动力学，自由基与臭氧前体物的测量则是[[environmental-chemistry/environmental-monitoring]]的一部分。

::: summary
- 对流层由 $\mathrm{OH}$ 氧化：$\mathrm{OH}$ 来自 $\mathrm{O(^1D)} + \mathrm{H_2O}$，$1\ \%$ 水汽下每个激发态原子的产率 $\varepsilon \approx 6\ \%$，$P_{\mathrm{OH}} = 2\varepsilon J_{\mathrm{O^1D}}[\mathrm{O_3}]$。
- $[\mathrm{OH}]$ 处于稳态 $P/\sum k_i[\mathrm{X}_i]$；全球均值约 $10^{6}\ \mathrm{cm^{-3}}$；气体对 OH 的寿命为 $1/(k\overline{[\mathrm{OH}]})$——甲烷以年计，CO 以周计，异戊二烯以小时计。
- 阳光下 $\mathrm{NO_x}$ 与臭氧达到莱顿光稳态 $[\mathrm{O_3}] = J_{\mathrm{NO_2}}[\mathrm{NO_2}]/(k[\mathrm{NO}])$——零净循环，不产生净臭氧。
- CO 与 VOC 氧化生成的过氧自由基不耗臭氧地把 $\mathrm{NO}$ 转为 $\mathrm{NO_2}$，故 $\mathrm{CO + 2\,O_2 \rightarrow CO_2 + O_3}$，$\mathrm{HO_x}$ 是链载体，$\mathrm{NO_x}$ 是催化剂。
- $\mathrm{HO_2 + HO_2}$ 终止给出 $\mathrm{NO_x}$ 限制区（$P(\mathrm{O_3}) \propto \mathrm{NO}$）；$\mathrm{OH + NO_2}$ 终止给出 VOC 限制区（$P(\mathrm{O_3}) \propto R/[\mathrm{NO_2}]$），后者削 $\mathrm{NO_x}$ 可局地抬高臭氧。
- 夜间由 $\mathrm{NO_3}$ 和 $\mathrm{N_2O_5}$ 接管；PAN 把 $\mathrm{NO_x}$ 输往偏远地区。
- 臭氧经氧化气道衬里而起作用的呼吸道刺激物；截至 2026 年的指南与标准：世卫（2021）$100\ \mathrm{\mu g\,m^{-3}}$（8 小时）与 $60\ \mathrm{\mu g\,m^{-3}}$（高峰季），欧盟目标值 $120\ \mathrm{\mu g\,m^{-3}}$，美国 NAAQS $70\ \mathrm{ppb}$。
:::

## 练习

::: exercise 一氧化碳对 OH 的寿命 {level=1 check="50"}
$k(\mathrm{OH + CO}) = 2.3\times10^{-13}\ \mathrm{cm^3\,s^{-1}}$、$\overline{[\mathrm{OH}]} = 1.0\times10^{6}\ \mathrm{cm^{-3}}$，求 CO 的寿命。（以天计，保留两位有效数字。）
::: solution
$\tau = 1/(k[\mathrm{OH}]) = 1/(2.3\times10^{-7}\ \mathrm{s^{-1}}) = 4.35\times10^{6}\ \mathrm{s} = 50\ \mathrm{d}$——与[[environmental-chemistry/earth-system-chemistry]]中的收支估计一致。
:::
:::

::: exercise 阳光下的森林异戊二烯 {level=1 check="0.56"}
热带森林上空正午 $[\mathrm{OH}] = 5\times10^{6}\ \mathrm{cm^{-3}}$，$k(\mathrm{OH + isoprene}) = 1.0\times10^{-10}\ \mathrm{cm^3\,s^{-1}}$，求异戊二烯的寿命。（以小时计，保留两位有效数字。）
::: solution
$\tau = 1/(1.0\times10^{-10}\times5\times10^{6}) = 2000\ \mathrm{s} = 0.56\ \mathrm{h}$，约半小时。因此异戊二烯在冠层上方的边界层内就被氧化，被输送的是它的氧化产物——而不是异戊二烯本身。
:::
:::

::: exercise 光稳态臭氧 {level=1 check="31"}
$298\ \mathrm{K}$、$1\ \mathrm{atm}$，$J_{\mathrm{NO_2}} = 6.0\times10^{-3}\ \mathrm{s^{-1}}$、$[\mathrm{NO_2}]/[\mathrm{NO}] = 2.5$，用 $k_{\mathrm{NO+O_3}} = 1.95\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$、$n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$ 求光稳态臭氧混合比。（以 ppb 计，保留两位有效数字。）
::: solution
$[\mathrm{O_3}] = (6.0\times10^{-3}/1.95\times10^{-14})\times2.5 = 7.69\times10^{11}\ \mathrm{cm^{-3}}$，即 $7.69\times10^{11}/2.46\times10^{10} = 31\ \mathrm{ppb}$。
:::
:::

::: exercise 湿度与 OH {level=2 check="8.9"}
$298\ \mathrm{K}$、$1.000\ \mathrm{atm}$ 下，$50\ \%$ 相对湿度对应水蒸气压 $1.58\ \mathrm{kPa}$（饱和值 $3.17\ \mathrm{kPa}$ 的一半）。用[[#ex-epsilon]]的速率常数求生成 OH 的 $\mathrm{O(^1D)}$ 份额 $\varepsilon$。（$\varepsilon$ 以百分数填入，保留两位有效数字。）
::: solution
$x_{\mathrm{H_2O}} = 1.585/101.325 = 0.0156$。于是 $\varepsilon = 1.99\times10^{-10}\times0.0156/(1.99\times10^{-10}\times0.0156 + 3.26\times10^{-11}\times0.9844) = 3.11\times10^{-12}/(3.11\times10^{-12} + 3.21\times10^{-11}) = 0.089$，即 $8.9\ \%$。由于 $\varepsilon$ 几乎正比于湿度，在相同臭氧和紫外下，潮湿热带空气的 OH 生成率是干燥大陆冬季空气的好几倍。
:::
:::

::: exercise 由臭氧求 NO₂/NO 比值 {level=2 check="3.0"}
阳光下的乡村 $[\mathrm{O_3}] = 50\ \mathrm{ppb}$、$J_{\mathrm{NO_2}} = 8.0\times10^{-3}\ \mathrm{s^{-1}}$，$298\ \mathrm{K}$、$1\ \mathrm{atm}$。由光稳态预测 $[\mathrm{NO_2}]/[\mathrm{NO}]$（$k = 1.95\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$，$n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$）。若实测比值为 $4.5$，这说明什么？（预测比值保留两位有效数字。）
::: solution
$[\mathrm{NO_2}]/[\mathrm{NO}] = k[\mathrm{O_3}]/J = 1.95\times10^{-14}\times1.23\times10^{12}/8.0\times10^{-3} = 3.0$。实测 $4.5$ 意味着 $\mathrm{NO}$ 向 $\mathrm{NO_2}$ 的转化快过仅靠臭氧所能做到的：存在过氧自由基（$\mathrm{HO_2}$、$\mathrm{RO_2}$），净臭氧生成正在进行。对莱顿关系的偏离是估计过氧自由基浓度的经典手段。
:::
:::

::: exercise 乙烷的臭氧产率 {level=2 check="7"}
高 $\mathrm{NO_x}$ 空气中乙烷氧化为乙醛：$\mathrm{C_2H_6 \rightarrow C_2H_5O_2 \rightarrow C_2H_5O \rightarrow CH_3CHO}$（伴随 $\mathrm{HO_2}$），乙醛再经 $\mathrm{CH_3C(O)O_2}$ 往下走，后者与 $\mathrm{NO}$ 反应后脱去 $\mathrm{CO_2}$ 生成 $\mathrm{CH_3O_2}$；甲基过氧自由基随后从 $\mathrm{CH_3O_2}$ 起走[[#ex-methane-ozone]]的甲烷路线。每个过氧 + $\mathrm{NO}$ 反应计一个臭氧，乙烷完全氧化为 $\mathrm{CO_2}$ 时生成多少个臭氧分子？（填入数字。）
::: hint
列出每个生成的过氧自由基：$\mathrm{C_2H_5O_2}$、$\mathrm{HO_2}$、$\mathrm{CH_3C(O)O_2}$，然后是甲烷路线的四个。
:::
::: solution
（1）$\mathrm{C_2H_5O_2 + NO}$：一个。（2）$\mathrm{C_2H_5O + O_2 \rightarrow CH_3CHO + HO_2}$、$\mathrm{HO_2 + NO}$：两个。（3）$\mathrm{CH_3CHO + OH \rightarrow CH_3CO + H_2O}$、$\mathrm{CH_3CO + O_2 \rightarrow CH_3C(O)O_2}$、$\mathrm{CH_3C(O)O_2 + NO \rightarrow CH_3C(O)O + NO_2}$：三个；$\mathrm{CH_3C(O)O \rightarrow CH_3 + CO_2}$、$\mathrm{CH_3 + O_2 \rightarrow CH_3O_2}$。（4）从 $\mathrm{CH_3O_2}$ 起甲烷路线再给四个（$\mathrm{CH_3O_2}$，$\mathrm{CH_3O}$ 给的 $\mathrm{HO_2}$，$\mathrm{HCO}$ 给的 $\mathrm{HO_2}$，$\mathrm{CO}$ 给的 $\mathrm{HO_2}$）。合计 $3 + 4 = 7$ 个臭氧分子每乙烷。实际中乙酰过氧自由基部分存入 PAN、部分甲醛发生光解，所以产率会波动，但高 $\mathrm{NO_x}$ 下完全氧化每碳约 $3$–$4$ 个臭氧是典型值。
:::
:::

::: exercise NO_x 限制区表达式 {level=3 check="20"}
取 $P_{\mathrm{HO_x}} = 1.0\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$、$k_\mathrm{p} = 2.9\times10^{-12}$、$k_{\mathrm{HO_2+NO}} = 8.5\times10^{-12}\ \mathrm{cm^3\,s^{-1}}$，用[[#prop-regimes]]的 $\mathrm{NO_x}$ 限制区表达式计算 $[\mathrm{NO}] = 0.5\ \mathrm{ppb}$（$1\ \mathrm{ppb} = 2.46\times10^{10}\ \mathrm{cm^{-3}}$）时的 $P(\mathrm{O_3})$。与图中 $1\ \mathrm{ppb}$ $\mathrm{NO_x}$（故 $[\mathrm{NO}] = 0.5\ \mathrm{ppb}$）、$R = 30\ \mathrm{s^{-1}}$ 的精确模型值比较，并解释差别。（极限 $P(\mathrm{O_3})$ 以 $\mathrm{ppb\,h^{-1}}$ 填入，保留两位有效数字。）
::: solution
$[\mathrm{HO_2}] = (P_{\mathrm{HO_x}}/2k_\mathrm{p})^{1/2} = (1.0\times10^{7}/5.8\times10^{-12})^{1/2} = 1.31\times10^{9}\ \mathrm{cm^{-3}}$。又 $[\mathrm{NO}] = 0.5\times2.46\times10^{10} = 1.23\times10^{10}\ \mathrm{cm^{-3}}$，
$$
P(\mathrm{O_3}) = 8.5\times10^{-12}\times1.31\times10^{9}\times1.23\times10^{10} = 1.37\times10^{8}\ \mathrm{cm^{-3}\,s^{-1}},
$$
即 $1.37\times10^{8}\times3600/2.46\times10^{10} = 20\ \mathrm{ppb\,h^{-1}}$。$R = 30\ \mathrm{s^{-1}}$ 的精确模型给 $19.5\ \mathrm{ppb\,h^{-1}}$，略小，因为仍有百分之几的自由基经 $\mathrm{OH + NO_2}$ 损失；固定 $\mathrm{NO_x}$ 增大 $R$ 时精确值从下方逼近极限（$R = 100\ \mathrm{s^{-1}}$ 时为 $19.9$）。因此极限表达式是一个上界——它也表明 $\mathrm{NO_x}$ 限制区里再增加 VOC 几乎不改变臭氧生成。
:::
:::

::: exercise 由甲基氯仿求 OH {level=3 check="0.86"}
设某示踪物观测到的大气寿命为 $4.9$ 年，其中海洋损失的分寿命为 $89$ 年，平流层损失的分寿命为 $38$ 年，其余归因于对流层 OH。取 $272\ \mathrm{K}$ 下 $k_{\mathrm{OH}} = 6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}}$，求隐含的平均 OH 浓度。（$\overline{[\mathrm{OH}]}$ 以 $10^{6}\ \mathrm{cm^{-3}}$ 为单位填入，保留两位有效数字。）
::: hint
分寿命按速率相加：$1/\tau = \sum 1/\tau_i$。
:::
::: solution
$1/\tau_{\mathrm{OH}} = 1/4.9 - 1/89 - 1/38 = 0.2041 - 0.0112 - 0.0263 = 0.1665\ \mathrm{yr^{-1}}$，故 $\tau_{\mathrm{OH}} = 6.0\ \mathrm{yr}$。于是 $\overline{[\mathrm{OH}]} = 1/(k\tau_{\mathrm{OH}}) = 1/(6.14\times10^{-15}\times6.0\times3.156\times10^{7}) = 8.6\times10^{5}$，即 $0.86\times10^{6}\ \mathrm{cm^{-3}}$。附加汇缩短了总寿命，但推断 OH 之前必须把它们扣除；忽略它们会使 OH 高估约 $20\ \%$。
:::
:::
