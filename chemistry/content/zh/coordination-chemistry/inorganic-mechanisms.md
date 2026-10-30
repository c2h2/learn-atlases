维尔纳之所以能用硝酸银数出氯离子，只是因为钴(III)释放配体的速度很慢（[[coordination-chemistry/coordination-compounds#ex-werner-silver]]）。铬(III)上配位的水分子与溶剂交换大约几天一次；铜(II)上配位的水分子每秒交换约十亿次。两个电荷相同、半径几乎相同的离子，取代速率竟横跨十五个数量级，而这无法用热力学解释。$\mathrm{[Co(NH_3)_6]^{3+}}$ 在酸中虽然相对于 $\mathrm{[Co(H_2O)_6]^{3+}}$ 与铵是热力学不稳定的，却能在酸中存留数天；$\mathrm{[Ni(CN)_4]^{2-}}$ 的生成常数约为 $10^{30}$，却会在几秒之内与溶液中标记的氰离子交换其氰配体。

本章讨论配合物如何反应：通过**配体取代**，一个配体取代另一个；以及通过**电子转移**，金属改变自己的氧化态。我们把取代机理分为解离型（D）、缔合型（A）与交换型（I），并说明速率方程与活化体积如何区分它们；用配体场理论解释为什么 $d^3$ 与低自旋 $d^6$ 配合物是惰性的；描述平面正方形铂(II)的缔合化学，以及化学家用以合成顺铂的**反位效应**；并介绍亨利·陶布（Henry Taube）对**内界**与**外界**电子转移的区分，以及后者的马库斯（Marcus）理论。所用的动力学工具见[[kinetics/rate-laws]]与[[kinetics/transition-state-theory]]。

## 惰性与活性配合物

::: definition 活性与惰性 {#def-labile}
依照亨利·陶布（1952）的定义：在 $25\ ^\circ\mathrm{C}$、浓度 $0.1\ \mathrm{mol\,dm^{-3}}$ 下，若配体取代的半衰期短于约一分钟，该配合物是**活性的**；反应更慢的则是**惰性的**。这两个词是动力学概念，说的是取代的速率，不是平衡常数：惰性配合物可能在热力学上不稳定，活性配合物反而可能非常稳定。
:::

度量活性最干净的单一指标，是配位水与体相水交换的速率常数 $k_\mathrm{ex}$，用 $^{17}\mathrm{O}$ NMR 谱线展宽或同位素标记测定。$298\ \mathrm{K}$ 下的数值（取自洛塔尔·赫尔姆（Lothar Helm）与安德烈·默巴赫（André Merbach）2005 年的综述）如下，单位为每个配位水的 $\mathrm{s^{-1}}$（表中 HS 与 LS 分别指高自旋与低自旋）：

| 离子 | $d^n$ | $k_\mathrm{ex}$ | 离子 | $d^n$ | $k_\mathrm{ex}$ |
|---|---|---|---|---|---|
| $\mathrm{Cu^{2+}}$ | $d^9$ | $4.4\times10^9$ | $\mathrm{Fe^{3+}}$ | $d^5$ (HS) | $1.6\times10^2$ |
| $\mathrm{Mn^{2+}}$ | $d^5$ (HS) | $2.1\times10^7$ | $\mathrm{V^{2+}}$ | $d^3$ | $87$ |
| $\mathrm{Fe^{2+}}$ | $d^6$ (HS) | $4.4\times10^6$ | $\mathrm{Al^{3+}}$ | — | $1.3$ |
| $\mathrm{Co^{2+}}$ | $d^7$ (HS) | $3.2\times10^6$ | $\mathrm{Ru^{2+}}$ | $d^6$ (LS) | $1.8\times10^{-2}$ |
| $\mathrm{Mg^{2+}}$ | — | $6.7\times10^5$ | $\mathrm{Cr^{3+}}$ | $d^3$ | $2.4\times10^{-6}$ |
| $\mathrm{Ni^{2+}}$ | $d^8$ | $3.2\times10^4$ | $\mathrm{Rh^{3+}}$ | $d^6$ (LS) | $2.2\times10^{-9}$ |
| $\mathrm{Pd^{2+}}$ | $d^8$ (planar) | $5.6\times10^2$ | $\mathrm{Ir^{3+}}$ | $d^6$ (LS) | $1.1\times10^{-10}$ |

有四条规律引人注目。速率随电荷增大、半径减小而下降（比较 $\mathrm{Mg^{2+}}$ 与 $\mathrm{Al^{3+}}$）。同族同电荷时，速率沿族向下下降（Co、Rh、Ir）。带 $e_g$ 电子（σ 反键）的离子是活性的，其中 $\mathrm{Cu^{2+}}$ 与 $\mathrm{Cr^{2+}}$（姜-泰勒畸变，轴向键极长极弱）最甚。而每种电荷中最慢的离子是 $d^3$（$\mathrm{V^{2+}}$、$\mathrm{Cr^{3+}}$）与低自旋 $d^6$（$\mathrm{Ru^{2+}}$、$\mathrm{Co^{3+}}$、$\mathrm{Rh^{3+}}$、$\mathrm{Ir^{3+}}$），即晶体场稳定化能最大的那些组态。

::: example 慢到什么程度？ {#ex-half-lives}
用上表求 (a) $\mathrm{Cr^{3+}}$、(b) $\mathrm{Ni^{2+}}$、(c) $\mathrm{Ir^{3+}}$ 上一个指定配位水分子的平均寿命。
::: solution
对一级过程，半衰期 $t_{1/2} = \ln 2/k$，平均寿命 $\tau = 1/k$。(a) $t_{1/2} = 0.693/(2.4\times10^{-6}\ \mathrm{s^{-1}}) = 2.9\times10^5\ \mathrm{s} = 80\ \mathrm{h}$，约三天。(b) $0.693/(3.2\times10^4) = 2.2\times10^{-5}\ \mathrm{s}$，即 $22\ \mu\mathrm{s}$。(c) $0.693/(1.1\times10^{-10}) = 6.3\times10^9\ \mathrm{s}$，约 200 年。铬(III)配合物可以用色谱法纯化；铱(III)上的一个水配体会比化学家本人活得更久；镍(II)配合物在水中的重新平衡比手工混合还快，这就是它们的异构体无法分离的原因（[[coordination-chemistry/coordination-compounds#warn-isomers]]）。
:::
:::

## 配体取代的机理

::: definition 计量机理与内在机理 {#def-mechanisms}
依照库珀·朗福德（Cooper Langford）与哈里·格雷（Harry Gray）（1965），取代反应 $\mathrm{ML_nX + Y \rightarrow ML_nY + X}$ 按其**计量机理**分类：

- **解离型（D）**：X 先离开，生成一个原则上可以检测的、配位数较低的中间体，$\mathrm{ML_nX \rightarrow ML_n + X}$，随后 $\mathrm{ML_n + Y \rightarrow ML_nY}$；
- **缔合型（A）**：Y 首先进入，生成配位数较高的中间体，$\mathrm{ML_nX + Y \rightarrow ML_nXY}$，随后 X 离开；
- **交换型（I）**：X 的离开与 Y 的进入在同一步完成，没有中间体。

在交换机理内部，**内在机理**为 $\mathrm{I_d}$（解离活化：速率对离去基团敏感、对进入基团不敏感，过渡态中旧键的断裂已相当充分）或 $\mathrm{I_a}$（缔合活化：速率强烈依赖进入基团，新键的形成已相当充分）。
:::

大多数八面体配合物的取代属于 I 或 D；缔合途径对平面正方形 $d^8$ 配合物很常见，因为它们的平面上方与下方各有一个空的配位位置。

### 艾根-威尔金斯机理

活性的水合金属离子与配体反应时，第一步是扩散控制的碰撞相遇，把配体放进第二配位层、紧挨一个配位水。曼弗雷德·艾根（Manfred Eigen）与拉尔夫·威尔金斯（Ralph Wilkins）证明，许多这类反应的速率由这种**外界配合物**以及随后的交换步骤决定。

::: proposition 艾根-威尔金斯速率方程 {#prop-eigen-wilkins}
对下面的方案
$$
\mathrm{[M(H_2O)_6] + L} \underset{\text{快}}{\rightleftharpoons} \mathrm{\{[M(H_2O)_6], L\}} \xrightarrow{k_\mathrm{i}} \mathrm{[M(H_2O)_5L] + H_2O},
$$
外界缔合常数为 $K_\mathrm{os}$、交换为决速步（$k_\mathrm{i}$）时，配体过量下观测到的速率为 $-\dd[\mathrm{M}]_\mathrm{tot}/\dd t = k_\mathrm{obs}[\mathrm{M}]_\mathrm{tot}$，其中
$$
k_\mathrm{obs} = \frac{k_\mathrm{i}K_\mathrm{os}[\mathrm{L}]}{1 + K_\mathrm{os}[\mathrm{L}]} \;\approx\; k_\mathrm{i}K_\mathrm{os}[\mathrm{L}] \quad (K_\mathrm{os}[\mathrm{L}] \ll 1),
$$ {#eq-eigen}
因此二级生成常数为 $k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$。对 $\mathrm{I_d}$ 机理，$k_\mathrm{i}$ 接近水交换速率常数 $k_\mathrm{ex}$（再乘一个量级为 1 的因子，代表离开的水恰好是 L 旁边那一个的概率）。
:::

::: proof
令 $[\mathrm{M}]_\mathrm{tot} = [\mathrm{M}] + [\mathrm{M}{\cdot}\mathrm{L}]$ 为尚未反应的金属总量，其中 $\mathrm{M}{\cdot}\mathrm{L}$ 是外界配合物。由于碰撞平衡的建立远快于交换，任何时刻都有 $[\mathrm{M}{\cdot}\mathrm{L}] = K_\mathrm{os}[\mathrm{M}][\mathrm{L}]$，于是 $[\mathrm{M}{\cdot}\mathrm{L}] = K_\mathrm{os}[\mathrm{L}][\mathrm{M}]_\mathrm{tot}/(1 + K_\mathrm{os}[\mathrm{L}])$。产物只由外界配合物生成，速率为 $k_\mathrm{i}[\mathrm{M}{\cdot}\mathrm{L}]$，即得[[#eq-eigen]]。$[\mathrm{L}]$ 过量且恒定，$k_\mathrm{obs}$ 是一个准一级常数；它在低 $[\mathrm{L}]$ 下线性上升，并在 $K_\mathrm{os}[\mathrm{L}] \gg 1$ 时饱和于 $k_\mathrm{i}$。解离活化的交换中，决速事件是内界失去一个水，这与 L 是什么无关；所以 $k_\mathrm{i} \approx k_\mathrm{ex}$，而 $k_\mathrm{f}$ 随 L 的变化只通过 $K_\mathrm{os}$，后者主要取决于电荷。
:::

::: widget plot
f: k*K*x/(1 + K*x); k*K*x
x: 0, 10
y: 0, 1.2
sliders: k=1:0.2:2:0.05; K=0.5:0.05:3:0.05
labels: k_\mathrm{obs}; \text{低浓度极限 } k_\mathrm{i}K_\mathrm{os}[\mathrm{L}]
caption: 艾根-威尔金斯机理下，准一级速率常数 $k_\mathrm{obs}$（滑块 $k = 1$ 时以 $k_\mathrm{i}$ 为单位）随配体浓度 $x$（以 $\mathrm{mol\,dm^{-3}}$ 计）的变化，见[[#eq-eigen]]。滑块 $K$ 是 $K_\mathrm{os}$，以 $\mathrm{dm^3\,mol^{-1}}$ 计。低浓度下依赖关系是线性的，斜率为 $k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$；高浓度下速率饱和于 $k_\mathrm{i}$，因为全部金属都已处于外界配合物中。中性或一价配体的 $K_\mathrm{os}$ 很小（0.1–2），只有配体极浓或双方电荷很高时才能达到饱和，所以实际测到的几乎都是线性区。
:::

::: example 镍(II)配合物的生成速率 {#ex-eigen}
$\mathrm{[Ni(H_2O)_6]^{2+} + NH_3}$ 的速率常数在 $25\ ^\circ\mathrm{C}$ 下约为 $5\times10^3\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。对 $2+$ 离子与中性配体取 $K_\mathrm{os} \approx 0.15\ \mathrm{dm^3\,mol^{-1}}$，估算 $k_\mathrm{i}$ 并与 $k_\mathrm{ex}$ 比较。这对机理说明了什么？你预期氟离子会反应快得多吗？
::: solution
$k_\mathrm{i} = k_\mathrm{f}/K_\mathrm{os} = 5\times10^3/0.15 = 3\times10^4\ \mathrm{s^{-1}}$，与水交换常数 $3.2\times10^4\ \mathrm{s^{-1}}$ 基本相等。无论进入基团是什么，交换步骤都以镍失去水的速率进行：这是一个 $\mathrm{I_d}$ 机理。氟离子是 $1-$ 阴离子，与 $2+$ 阳离子的 $K_\mathrm{os}$ 更大（量级 $1\ \mathrm{dm^3\,mol^{-1}}$），所以它的 $k_\mathrm{f}$ 应大约按两个外界常数之比增大，即几倍而已，而不会增大几个数量级；镍(II)与各种配体的实测结果正是如此。同样的分析预言 $\mathrm{Co^{2+}}$（$k_\mathrm{ex} = 3.2\times10^6\ \mathrm{s^{-1}}$）生成氨配合物快约一百倍，$k_\mathrm{f} \approx 0.15 \times 3.2\times10^6 = 4.8\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。
:::
:::

### 活化体积

对机理最直接的实验检验是压力的效应。由过渡态理论，$(\partial\ln k/\partial p)_T = -\Delta^\ddagger V/RT$，其中 $\Delta^\ddagger V$ 是**活化体积**。解离型过渡态有一条被拉长或断裂的键、一个部分脱离的分子，比反应物更大：$\Delta^\ddagger V > 0$，加压使反应变慢。缔合型的有一个部分进入配位层的分子，比反应物更小：$\Delta^\ddagger V < 0$。对第一行二价阳离子的水交换，$\Delta^\ddagger V$（以 $\mathrm{cm^3\,mol^{-1}}$ 计，默巴赫的测量）在整个系列上换号：$\mathrm{V^{2+}}$ $-4.1$、$\mathrm{Mn^{2+}}$ $-5.4$、$\mathrm{Fe^{2+}}$ $+3.8$、$\mathrm{Co^{2+}}$ $+6.1$、$\mathrm{Ni^{2+}}$ $+7.2$。前几个离子的 $t_{2g}$ 组为空或半满，其轨道指向配体之间第七个配体可以靠近的方向，按 $\mathrm{I_a}$ 反应；后面的离子 $t_{2g}$ 组已满或接近满、挡住了这一方向，按 $\mathrm{I_d}$ 反应。

## 配体效应对取代的影响

为什么 $d^3$ 与低自旋 $d^6$ 离子如此慢？解离机理中，八面体在通往过渡态的路上失去一个配体，过渡态类似一个四方锥。若五配位结构的 CFSE 小于八面体的，其差值就加进活化能。

::: proposition 晶体场活化能 {#prop-cfae}
把解离途径的**晶体场活化能**（CFAE）定义为 $\mathrm{CFSE}(\text{四方锥}) - \mathrm{CFSE}(\text{八面体})$。在只有 σ 的角重叠模型中，所有配体取相同的 $e_\sigma$，
$$
\mathrm{CFAE} = +0.2\Delta_\mathrm{o}\ (d^3),\quad +0.4\Delta_\mathrm{o}\ (\text{低自旋 } d^6),\quad +0.2\Delta_\mathrm{o}\ (d^8),\quad 0\ (d^0,\ \text{高自旋 } d^5,\ d^{10}).
$$
点电荷晶体场模型给出的也是这些值（$2Dq$、$4Dq$ 与 $2Dq$）。正的 CFAE 使解离取代变慢；它对低自旋 $d^6$ 最大，并且与 $\Delta_\mathrm{o}$ 成正比，所以在电荷更高以及 $4d$、$5d$ 金属处更大。
:::

::: proof
由[[coordination-chemistry/ligand-field-mo#prop-aom]]（只考虑 σ 相互作用）：八面体中 $E(e_g) = 3e_\sigma$、$E(t_{2g}) = 0$，五个轨道合计 $6e_\sigma$，于是重心在 $1.2e_\sigma$，两组轨道相对重心分别在 $+1.8e_\sigma$（$e_g$）与 $-1.2e_\sigma$（$t_{2g}$）处，$\Delta_\mathrm{o} = 3e_\sigma$。移去 $-z$ 上的配体：剩下的轴向配体只对 $d_{z^2}$ 贡献 $e_\sigma$，别无其他，故 $E(d_{x^2-y^2}) = 3e_\sigma$，$E(d_{z^2}) = 1 + 1 = 2e_\sigma$，$E(d_{xy}) = E(d_{xz}) = E(d_{yz}) = 0$。总和为 $5e_\sigma$，重心为 $e_\sigma$；相对重心：$d_{x^2-y^2}$ 为 $+2e_\sigma$，$d_{z^2}$ 为 $+e_\sigma$，$t_{2g}$ 型轨道为 $-e_\sigma$。现在填电子：

- $d^3$（$t_{2g}^3$）：八面体 $3(-1.2) = -3.6e_\sigma$；四方锥 $3(-1) = -3.0e_\sigma$。CFAE $= +0.6e_\sigma = +0.2\Delta_\mathrm{o}$。
- 低自旋 $d^6$（$t_{2g}^6$）：$-7.2e_\sigma$ 对 $-6.0e_\sigma$。CFAE $= +1.2e_\sigma = +0.4\Delta_\mathrm{o}$。
- $d^8$（$t_{2g}^6e_g^2$，上方每个轨道各一个电子）：八面体 $-7.2 + 2(1.8) = -3.6e_\sigma$；四方锥 $-6 + 1 + 2 = -3.0e_\sigma$。CFAE $= +0.2\Delta_\mathrm{o}$。
- 高自旋 $d^5$：八面体 $3(-1.2) + 2(1.8) = 0$；四方锥 $3(-1) + 1 + 2 = 0$。CFAE $= 0$；$d^0$ 与 $d^{10}$ 同理。

要紧的是相对 CFSE，因为重心能量（σ 排斥的总和）是整个配合物的性质，已计入通常的键能，而不计入配体场项。
:::

CFAE 解释的是规律，不是绝对速率。对铬(III)，$0.2\Delta_\mathrm{o} = 0.2 \times 17\,400 = 3480\ \mathrm{cm^{-1}} = 42\ \mathrm{kJ\,mol^{-1}}$，单是这一项就足以在常温下把反应放慢 $e^{-42\,000/RT} \approx 10^{-7}$ 倍。镍(II)有同样的 $0.2\Delta_\mathrm{o}$，但 $\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$，只合 $20\ \mathrm{kJ\,mol^{-1}}$，而且它的电荷较低，Ni–O 键本来就更弱；对 $2+$ 离子来说它算中等偏慢，但仍是活性的。对低自旋钴(III)，$0.4 \times 18\,200\ \mathrm{cm^{-1}}$ 为 $87\ \mathrm{kJ\,mol^{-1}}$，这就是钴(III)化学能像维尔纳的工作那样从容完成的原因。

::: warning 惰性不等于稳定，活性不等于不稳定 {#warn-inert}
两者很容易混为一谈，因为它们常被一同概括为"结合得牢"。它们是不同的量：稳定性是 $\Delta G^\circ$，反应物与产物之间的自由能差；（不）活性由 $\Delta^\ddagger G$ 决定，即二者之间能垒的高度。$\mathrm{[Co(NH_3)_6]^{3+}}$ 在 $1\ \mathrm{mol\,dm^{-3}}$ 酸中水解为 $\mathrm{[Co(H_2O)_6]^{3+}} + 6\,\mathrm{NH_4^+}$ 的平衡常数量级为 $10^{20}$（由 $\log\beta_6 \approx 35$ 与铵的 $\mathrm{p}K_\mathrm{a}$ 得出），溶液却能放几周不变；$\mathrm{[Ni(CN)_4]^{2-}}$ 极其稳定（$\beta_4 \approx 10^{30}$），却以秒级的半衰期与标记氰化物交换，走的是平面正方形配合物敞开的缔合途径。金属药物或 MRI 造影剂必须两头都设计到位：热力学上足够稳定，不在平衡时释放金属；动力学上足够惰性，不在使用的时间尺度内释放金属。
:::

## 平面正方形配合物的取代

铂(II)、钯(II)、镍(II)与金(III)的平面正方形 $d^8$ 配合物按缔合机理反应。进入的配体沿空着的 $z$ 轴接近，过渡态（有时还有中间体）为三角双锥：进入基团、离去基团以及原来与离去基团处于*反位*的配体位于三角平面上。速率方程有两项。

::: proposition 平面正方形取代的两项速率方程 {#prop-square-planar}
对配位性溶剂 S 中的 $\mathrm{[PtL_3X] + Y \rightarrow [PtL_3Y] + X}$，Y 大量过量，
$$
-\frac{\dd[\mathrm{PtL_3X}]}{\dd t} = (k_1 + k_2[\mathrm{Y}])[\mathrm{PtL_3X}], \qquad k_\mathrm{obs} = k_1 + k_2[\mathrm{Y}].
$$ {#eq-two-term}
$k_2$ 项是 Y 的直接缔合进攻；$k_1$ 项是溶剂的缔合进攻（决速），生成 $\mathrm{[PtL_3S]}$，后者再迅速与 Y 反应。两条途径都是缔合型的。
:::

::: proof
设溶剂途径为 $\mathrm{PtL_3X + S \xrightarrow{k_\mathrm{s}} PtL_3S + X}$，随后快速的 $\mathrm{PtL_3S + Y \rightarrow PtL_3Y + S}$；直接途径为 $\mathrm{PtL_3X + Y \xrightarrow{k_2} PtL_3Y + X}$。溶剂以一个恒定、极高的浓度 $[\mathrm{S}]$ 存在，所以第一条途径是准一级的，$k_1 = k_\mathrm{s}[\mathrm{S}]$。若溶剂合中间体被消耗的速度远快于其生成速度，它就达到一个可以忽略的稳态浓度，凡进入这条途径的每个分子都变成产物。于是两条平行途径以总速率 $(k_1 + k_2[\mathrm{Y}])[\mathrm{PtL_3X}]$ 消耗底物。$k_\mathrm{obs}$ 对 $[\mathrm{Y}]$ 作图是一条直线，斜率为 $k_2$，截距为 $k_1$。表明 $k_1$ 途径是缔合而非解离的证据，是 $k_1$ 依赖于溶剂的亲核性，以及两条途径的活化熵与活化体积都是大的负值。
:::

### 反位效应

1926 年，伊利亚·切尔尼亚耶夫（Ilya Chernyaev）注意到，从平面正方形铂(II)配合物中离去的配体，通常是"反位导向"能力最强的那个配体的*反位*配体。**反位效应**指一个配位配体对其对位配体取代*速率*的影响。经验序列大致为
$$
\mathrm{H_2O \approx OH^- < NH_3 \approx py < Cl^- < Br^- < I^- \approx SCN^- \approx NO_2^- < C_6H_5^- < CH_3^- < PR_3 \approx H^- < CO \approx C_2H_4 \approx CN^-}.
$$
这一效应有两个成分。强 σ 给体（H⁻、$\mathrm{CH_3^-}$、$\mathrm{PR_3}$）在基态就削弱其*反位*的键，因为两条处于*反位*的配体共用同一对金属 $p_x$ 与 $d_{x^2-y^2}$ 轨道；这种基态削弱称为**反位影响**，可以从键长上看到。强 π 受体（CO、$\mathrm{C_2H_4}$、$\mathrm{CN^-}$）稳定五配位过渡态——在过渡态里，它们能把进入配体带进三角平面的多余电子密度取走。两者都降低*反位*配体离去的能垒。

::: example 合成顺铂与反铂 {#ex-cisplatin}
利用反位效应（$\mathrm{Cl^-} > \mathrm{NH_3}$）说明：(a) $\mathrm{[PtCl_4]^{2-}}$ 与两当量氨反应给出 *cis*-$\mathrm{[PtCl_2(NH_3)_2]}$；(b) $\mathrm{[Pt(NH_3)_4]^{2+}}$ 与两当量氯离子反应给出 *trans* 异构体。
::: solution
(a) $\mathrm{[PtCl_4]^{2-}}$ 中四个位置全同，第一个氨取代任何一个氯都行：$\mathrm{[PtCl_3(NH_3)]^-}$。它有两种氯：处于 $\mathrm{NH_3}$ *反位*的那一个，以及彼此处于*反位*的那两个（各自处于 Cl 的*反位*）。因为 Cl⁻ 的反位效应更大，处于氯*反位*的氯被活化，第二个氨就取代它们之一。两个氨最终处于*cis*：顺铂。(b) $\mathrm{[Pt(NH_3)_4]^{2+}}$ 中第一个氯取代任何一个氨都行：$\mathrm{[PtCl(NH_3)_3]^+}$。这时处于氯*反位*的氨是活泼的那一个，第二个氯就进入第一个氯的*反位*：反铂。这些路线是十九世纪米凯莱·佩罗内（Michele Peyrone，1844）与朱尔·赖泽特（Jules Reiset）搞清楚的，远早于人们知道它们的结构；它们解释了为什么两种异构体要用不同的起始原料来制备。实际上顺铂由 $\mathrm{K_2[PtCl_4]}$ 经 $\mathrm{K_2[PtI_4]}$ 制备，以利用碘离子更大的反位效应（见[[#exr-iodide-route]]）。这类铂化合物有细胞毒性和致敏性，只能在适当的防护条件下操作。
:::
:::

::: quiz
对平面正方形取代，哪个观测最能指明缔合机理？
- [ ] 速率强烈依赖于离去基团。
- [x] 速率常数 $k_2$ 随进入的亲核试剂不同变化达多个数量级。
- [ ] 活化体积为大正值。
- [x] 速率常数与立体化学都显示其余配体的相对位置保持不变。
::: solution
缔合反应对进入基团敏感，因为它在过渡态中已经成键；而对平面正方形配合物，三角双锥中间体把进入的配体送到离去配体原来的位置，所以其余配体的构型保持。对离去基团敏感是两种机理都会有的。正的活化体积指向解离途径。
:::
:::

## 电子转移

配合物之间的氧化还原反应在生物学（细胞色素、铁硫蛋白、蓝铜蛋白）与电化学中都是核心问题。陶布在 1950 年代证明，它们按两种截然不同的机理进行。

::: definition 外界与内界电子转移 {#def-et}
**外界**反应中，两个反应物的配位层都保持完整；电子在一个碰撞配合物中于两个金属之间穿隧，速率受限于随之必须完成的键长与溶剂重组。**内界**反应中，一个反应物的某个配体先结合到另一个反应物上，生成**桥式**双核中间体，电子经由桥穿过；桥联配体常常在此过程中转移到另一个金属上。
:::

陶布的经典检验利用了两种离子的惰性差异。$\mathrm{[CoCl(NH_3)_5]^{2+}}$（惰性，钴(III)）被 $\mathrm{[Cr(H_2O)_6]^{2+}}$（活性，铬(II)）还原。产物是 $\mathrm{Co^{2+}(aq)}$ 与 $\mathrm{[CrCl(H_2O)_5]^{2+}}$，每一个氯现在都在铬上，溶液里一个也没有——即便向溶液中加入了放射性氯离子也是如此。氯只可能经由桥式中间体 $\mathrm{[(NH_3)_5Co{-}Cl{-}Cr(H_2O)_5]^{4+}}$ 从钴到达铬：铬(II)足够活性，能结合氯；随后电子转移到钴；产物是活性的钴(II)与惰性的铬(III)，氯便留在它现在的位置上。这个实验之所以成功，是因为反应物与产物在活性上的差别恰好以正确的方式错开。

### 外界反应的马库斯理论

针对外界反应，鲁道夫·马库斯（Rudolph Marcus）在 1956 年证明，活化自由能取决于推动力与一个单一参数——**重组能** $\lambda$：把反应物及其周围溶剂畸变到产物的平衡结构、而不转移电子所需的能量。

::: proposition 马库斯方程 {#prop-marcus}
若反应物态与产物态的自由能都按单一反应坐标二次变化且曲率相同，则
$$
\Delta^\ddagger G = \frac{\lambda}{4}\left(1 + \frac{\Delta_\mathrm{r}G^\circ}{\lambda}\right)^2,
$$ {#eq-marcus}
其中 $\Delta_\mathrm{r}G^\circ$ 是标准反应自由能（已对把反应物拉到一起所需的功作修正）。自交换反应（$\Delta_\mathrm{r}G^\circ = 0$）的 $\Delta^\ddagger G = \lambda/4$。对电对 1 与 2 之间的交叉反应，自交换速率常数为 $k_{11}$ 与 $k_{22}$、平衡常数为 $K_{12}$，则
$$
k_{12} \approx \sqrt{k_{11}k_{22}K_{12}f}, \qquad \log f = \frac{(\log K_{12})^2}{4\log(k_{11}k_{22}/Z^2)},
$$ {#eq-cross}
其中 $Z \approx 10^{11}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 是碰撞频率；除非 $K_{12}$ 非常大，$f \approx 1$。
:::

::: proof
设反应物自由能为 $G_\mathrm{R}(q) = a q^2$，产物自由能为 $G_\mathrm{P}(q) = a(q - q_0)^2 + \Delta_\mathrm{r}G^\circ$，即两条曲率相同、沿反应坐标 $q$ 错开的抛物线。按定义 $\lambda = G_\mathrm{P}(0) - \Delta_\mathrm{r}G^\circ = aq_0^2$：产物态在反应物几何下的能量，相对其自身极小值。电子转移在交叉点处最快（能量守恒，弗兰克-康登原理），交叉点满足 $aq^2 = a(q - q_0)^2 + \Delta_\mathrm{r}G^\circ$，即 $2aqq_0 = aq_0^2 + \Delta_\mathrm{r}G^\circ$，$q^* = (\lambda + \Delta_\mathrm{r}G^\circ)/2aq_0$。能垒为
$$
\Delta^\ddagger G = a(q^*)^2 = \frac{(\lambda + \Delta_\mathrm{r}G^\circ)^2}{4aq_0^2} = \frac{(\lambda + \Delta_\mathrm{r}G^\circ)^2}{4\lambda},
$$
即[[#eq-marcus]]。至于交叉关系：交叉反应的重组能很好地近似为两个自交换值的平均，$\lambda_{12} = \tfrac12(\lambda_{11} + \lambda_{22})$，因为每个反应物都按它在自身自交换中的方式重组。对每个反应写出 $k = Z e^{-\Delta^\ddagger G/RT}$，把[[#eq-marcus]]展开为 $\Delta^\ddagger G_{12} = \tfrac{\lambda_{12}}{4} + \tfrac12\Delta_\mathrm{r}G^\circ_{12} + (\Delta_\mathrm{r}G^\circ_{12})^2/4\lambda_{12}$，并用 $\lambda_{ii}/4 = -RT\ln(k_{ii}/Z)$ 与 $\Delta_\mathrm{r}G^\circ_{12} = -RT\ln K_{12}$。前两项给出 $k_{12} = \sqrt{k_{11}k_{22}K_{12}}$，二次项给出因子 $f$。
:::

::: widget plot
f: (l/4)*(1 + x/l)^2; l/4
x: -300, 100
y: 0, 120
sliders: l=100:20:250:5
labels: \Delta^\ddagger G; \lambda/4\ \text{（自交换）}
caption: 由[[#eq-marcus]]得到的马库斯活化自由能（以 $\mathrm{kJ\,mol^{-1}}$ 计）随推动力 $x = \Delta_\mathrm{r}G^\circ$（以 $\mathrm{kJ\,mol^{-1}}$ 计）的变化，重组能 $\lambda$ 由滑块设定。使反应更放能起初会降低能垒，正如预期的那样；到 $\Delta_\mathrm{r}G^\circ = -\lambda$ 处能垒降为零。越过这一点进入**反转区**，能垒重新升高，放能极强的反应反而*变慢*。马库斯在 1960 年预言了这一点；1984 年约翰·米勒（John Miller）、格哈德·克洛斯（Gerhard Closs）及其合作者用刚性连接的给体-受体分子在实验上证实了它。这也是光合作用的电荷分离态不立即复合的原因之一。
:::

::: example 马库斯交叉关系的一次估算 {#ex-marcus}
$\mathrm{[Fe(H_2O)_6]^{3+/2+}}$ 的自交换速率常数约为 $4\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。设一假想氧化剂电对的自交换常数为 $1.0\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，标准电势比铁的高 $0.30\ \mathrm{V}$。取 $f = 1$，估算该氧化剂氧化 $\mathrm{Fe^{2+}(aq)}$ 的速率常数。
::: solution
单电子转移的 $\log K_{12} = \Delta E^\circ/0.05916 = 0.30/0.05916 = 5.07$，故 $K_{12} = 1.18\times10^5$。于是 $k_{12} = \sqrt{4.0 \times 1.0\times10^5 \times 1.18\times10^5} = \sqrt{4.7\times10^{10}} = 2.2\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。校核 $f$：$\log f = 5.07^2/[4\log(4\times10^5/10^{22})] = 25.7/(4 \times -16.4) = -0.39$，所以 $f = 0.41$，$\sqrt f = 0.64$，把估计值降到约 $1.4\times10^5$。铁的自交换本身之慢（$\lambda$ 很大，因为 $\mathrm{Fe^{2+}}$ 与 $\mathrm{Fe^{3+}}$ 之间 Fe–O 键长改变约 $13\ \mathrm{pm}$）部分被快得多的对方与推动力补偿。这类交叉关系预测实测外界速率常数时通常在一个数量级以内，这是对理论的有力支持。
:::
:::

自交换速率覆盖极大的范围，并由电子转移引起的结构变化决定。$\mathrm{[Ru(NH_3)_6]^{3+/2+}}$ 与 $\mathrm{[Fe(phen)_3]^{3+/2+}}$ 中，电子进入 $t_{2g}$ 轨道，金属-配体键几乎不变，交换很快。$\mathrm{[Co(NH_3)_6]^{3+/2+}}$ 极慢（量级 $10^{-6}$ 至 $10^{-8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$），因为电子从低自旋 $t_{2g}^6$ 变到高自旋 $t_{2g}^5e_g^2$：自旋状态改变，每条 Co–N 键还要伸长约 $15\ \mathrm{pm}$。

## 后续内容

本章的机理在凡是用到金属的地方都会重现。缔合的 16 电子取代与解离的 18 电子取代，是[[organometallics-catalysis/elementary-reactions]]中有机金属反应的起始步骤。反位效应指导铂类药物的合成，而惰性决定铂或钆配合物在体内能存留多久（[[coordination-chemistry/bioinorganic]]）。马库斯理论既描述溶液中的电子转移，也描述电极上的（[[electrochemistry/electrode-kinetics]]）和蛋白质内部的——蛋白质基质降低 $\lambda$，并控制电子穿隧的距离。热力学稳定性与动力学惰性，"结合得牢"的两层含义，到此终于都有了定量的表述。

::: history
配合物的动力学研究始于阿尔弗雷德·维尔纳（Alfred Werner）的异构化实验；伊利亚·切尔尼亚耶夫于 1926 年提出反位效应，以解释铂异构体的合成。这一现代学科由亨利·陶布（Henry Taube）奠基。他 1952 年在《化学评论》（*Chemical Reviews*）上的综述把活性与 $d$ 电子组态联系起来；1953–54 年他与霍华德·迈尔斯（Howard Myers）、罗伯特·里奇（Robert Rich）用铬(II)与钴(III)氨配合物的实验证明了内界电子转移；他获得 1983 年诺贝尔化学奖。弗雷德·巴索洛（Fred Basolo）与拉尔夫·皮尔逊（Ralph Pearson）的《无机反应机理》（*Mechanisms of Inorganic Reactions*，1958）把取代化学系统化了；库珀·朗福德与哈里·格雷于 1965 年引入 D、A、I 命名法。曼弗雷德·艾根（Manfred Eigen，因快反应弛豫方法与他人共享 1967 年诺贝尔化学奖）与拉尔夫·威尔金斯在 1960 年代阐明了配合物形成的外界机理。鲁道夫·马库斯（Rudolph Marcus）1956 年发表外界电子转移理论，其后不久给出交叉关系，获 1992 年诺贝尔化学奖。安德烈·默巴赫（André Merbach）自 1970 年代起以高压 NMR 测量活化体积，确定了整个周期表上水交换的机理。
:::

::: summary
- 活性配合物在一分钟以内完成取代，惰性配合物更慢；水交换速率跨约二十个数量级，随电荷更高、半径更小、金属更重而下降。
- 取代机理有解离型（D）、缔合型（A）与交换型（I，分 $\mathrm{I_d}$ 与 $\mathrm{I_a}$ 两种）；进入基团依赖性与 $\Delta^\ddagger V$ 的符号可以把它们区分开。
- 活性水合金属离子生成配合物遵循艾根-威尔金斯机理，$k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i}$，$\mathrm{I_d}$ 时 $k_\mathrm{i} \approx k_\mathrm{ex}$。
- $d^3$ 与低自旋 $d^6$ 离子是惰性的，因为解离型过渡态会损失 CFSE（CFAE 分别为 $0.2\Delta_\mathrm{o}$ 与 $0.4\Delta_\mathrm{o}$）；$e_g$ 电子与姜-泰勒畸变使离子活性。
- 平面正方形 $d^8$ 配合物按缔合方式反应，$k_\mathrm{obs} = k_1 + k_2[\mathrm{Y}]$；经验反位效应源于 σ 反位影响与过渡态的 π 稳定化，它决定哪个配体被取代，并被用来合成 *cis*- 与 *trans*-$\mathrm{[PtCl_2(NH_3)_2]}$。
- 电子转移分为内界（经桥，常伴配体转移，如陶布所证明）与外界；马库斯理论给出 $\Delta^\ddagger G = (\lambda/4)(1 + \Delta_\mathrm{r}G^\circ/\lambda)^2$、交叉关系与反转区。
- 动力学惰性与热力学稳定性彼此独立，使用配合物时两者都必须考虑。
:::

## 习题

::: exercise 惰性还是活性？ {level=1}
预测下列配合物是活性还是惰性，并解释：(a) $\mathrm{[Cr(NH_3)_6]^{3+}}$，(b) $\mathrm{[Fe(H_2O)_6]^{2+}}$，(c) $\mathrm{[Co(NH_3)_6]^{3+}}$，(d) $\mathrm{[Cu(NH_3)_4(H_2O)_2]^{2+}}$，(e) $\mathrm{[Rh(H_2O)_6]^{3+}}$，(f) $\mathrm{[V(H_2O)_6]^{3+}}$。
::: solution
(a) 惰性：$d^3$，CFAE $0.2\Delta_\mathrm{o}$ 且 $\Delta_\mathrm{o}$ 大，电荷 3+。(b) 活性：高自旋 $d^6$，带两个 $e_g$ 电子，电荷 2+。(c) 惰性：低自旋 $d^6$。(d) 活性：$d^9$，姜-泰勒伸长，反键 $d_{x^2-y^2}$ 上有一个电子，轴向键极弱。(e) 非常惰性：低自旋 $d^6$，第二行金属，3+。(f) 对 3+ 离子算中等活性：$d^2$，没有 $e_g$ 电子，但 CFAE 很小，而且空着的 $t_{2g}$ 轨道允许缔合进攻（$k_\mathrm{ex} \approx 5\times10^2\ \mathrm{s^{-1}}$）。
:::
:::

::: exercise 一个半衰期 {level=1 check="80.2"}
已知 $\mathrm{[Cr(H_2O)_6]^{3+}}$ 的 $k_\mathrm{ex} = 2.4\times10^{-6}\ \mathrm{s^{-1}}$，计算其上一个指定水分子交换的半衰期，以小时计。（半衰期以小时输入，保留三位有效数字。）
::: solution
$t_{1/2} = \ln2/k = 0.6931/(2.4\times10^{-6}\ \mathrm{s^{-1}}) = 2.888\times10^5\ \mathrm{s} = 80.2\ \mathrm{h}$。
:::
:::

::: exercise 反位效应的产物 {level=1}
预测下列反应的产物：(a) $\mathrm{[PtCl_3(NH_3)]^-} + \mathrm{NH_3}$，(b) $\mathrm{[PtCl_3(C_2H_4)]^-}$（蔡斯阴离子）$+ \mathrm{NH_3}$，(c) $\mathrm{[PtCl(NH_3)_3]^+} + \mathrm{Cl^-}$。
::: solution
(a) 两个彼此处于*反位*的氯相互活化；氨取代其中之一：*cis*-$\mathrm{[PtCl_2(NH_3)_2]}$。(b) 乙烯的反位效应远大于氯，所以处于乙烯*反位*的氯被取代：*trans*-$\mathrm{[PtCl_2(C_2H_4)(NH_3)]}$。(c) 处于 Cl *反位*的氨被取代：*trans*-$\mathrm{[PtCl_2(NH_3)_2]}$。
:::
:::

::: exercise 钴(II)的艾根-威尔金斯机理 {level=2 check="4.8e5"}
取 $K_\mathrm{os} = 0.15\ \mathrm{dm^3\,mol^{-1}}$ 并按 $\mathrm{I_d}$ 机理，估算由 $\mathrm{[Co(H_2O)_6]^{2+}}$（$k_\mathrm{ex} = 3.2\times10^6\ \mathrm{s^{-1}}$）与氨生成 $\mathrm{[Co(NH_3)(H_2O)_5]^{2+}}$ 的二级速率常数。（$k_\mathrm{f}$ 以 $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 输入。）
::: solution
$k_\mathrm{f} = K_\mathrm{os}k_\mathrm{i} \approx K_\mathrm{os}k_\mathrm{ex} = 0.15 \times 3.2\times10^6 = 4.8\times10^5\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，比相应的镍(II)反应快约一百倍，与水交换速率之比成正比。
:::
:::

::: exercise 读懂活化体积 {level=2}
$\mathrm{[Ti(H_2O)_6]^{3+}}$ 上的水交换 $\Delta^\ddagger V = -12.1\ \mathrm{cm^3\,mol^{-1}}$，$\mathrm{[Ga(H_2O)_6]^{3+}}$ 的则为 $+5.0\ \mathrm{cm^3\,mol^{-1}}$。这两个值对机理说明什么？这一差别与电子组态有什么关系？
::: solution
钛(III)的大负值表明缔合活化机理（$\mathrm{I_a}$ 或 A）：过渡态比反应物更紧凑，因为第七个水已部分成键。钛(III)为 $t_{2g}^1$，还有两个空的 $t_{2g}$ 轨道指向配体之间，进入的水可以在不受到强排斥的情况下接近。镓(III)为 $d^{10}$，满的 $3d$ 壳层挡住了这一接近，其正的活化体积表明解离活化（$\mathrm{I_d}$）。从 $\mathrm{V^{2+}}$ 到 $\mathrm{Ni^{2+}}$ 的第一行二价阳离子上也可以看到同样的转换。
:::
:::

::: exercise 马库斯能垒 {level=2 check="12.25"}
某外界反应 $\lambda = 100\ \mathrm{kJ\,mol^{-1}}$，$\Delta_\mathrm{r}G^\circ = -30\ \mathrm{kJ\,mol^{-1}}$。求 $\Delta^\ddagger G$，与自交换能垒比较，并求反应最快时的推动力。（$\Delta^\ddagger G$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
$\Delta^\ddagger G = (100/4)(1 - 30/100)^2 = 25 \times 0.49 = 12.25\ \mathrm{kJ\,mol^{-1}}$，是 $\lambda/4 = 25\ \mathrm{kJ\,mol^{-1}}$ 的自交换能垒的一半。当 $\Delta_\mathrm{r}G^\circ = -\lambda = -100\ \mathrm{kJ\,mol^{-1}}$ 时能垒为零、速率最大；更放能的反应落在反转区，又会慢下来。
:::
:::

::: exercise 拟合两项速率方程 {level=3 check="4.00e-3"}
$25\ ^\circ\mathrm{C}$ 下，某铂(II)配合物在甲醇中被吡啶取代，测得准一级速率常数在 $[\mathrm{py}] = 0.010$、$0.020$、$0.030$、$0.040$ 与 $0.050\ \mathrm{mol\,dm^{-3}}$ 处分别为 $k_\mathrm{obs} = 0.61$、$0.99$、$1.41$、$1.79$ 与 $2.21 \times 10^{-4}\ \mathrm{s^{-1}}$。(a) 用最小二乘法求 $k_1$ 与 $k_2$。(b) 在 $[\mathrm{py}] = 0.020\ \mathrm{mol\,dm^{-3}}$ 时，有多大分数经溶剂途径反应？（$k_2$ 以 $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 输入。）
::: hint
用线性回归拟合 $k_\mathrm{obs} = k_1 + k_2[\mathrm{py}]$：$[\mathrm{py}]$ 的平均值为 $0.030$，$k_\mathrm{obs}$ 的平均值为 $1.402\times10^{-4}\ \mathrm{s^{-1}}$。
:::
::: solution
(a) 以 $\bar x = 0.030$、$\bar y = 1.402\times10^{-4}$：$\sum(x - \bar x)^2 = (0.02^2 + 0.01^2) \times 2 = 1.0\times10^{-3}$；$\sum(x - \bar x)(y - \bar y) = (-0.02)(-0.792) + (-0.01)(-0.412) + 0 + (0.01)(0.388) + (0.02)(0.808)$（以 $10^{-4}$ 为单位）$= 0.01584 + 0.00412 + 0.00388 + 0.01616 = 0.0400\times10^{-4}$。所以 $k_2 = 0.0400\times10^{-4}/1.0\times10^{-3} = 4.00\times10^{-3}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，$k_1 = \bar y - k_2\bar x = 1.402\times10^{-4} - 1.20\times10^{-4} = 2.0\times10^{-5}\ \mathrm{s^{-1}}$。(b) 在 $0.020\ \mathrm{mol\,dm^{-3}}$ 处：$k_1/k_\mathrm{obs} = 2.0\times10^{-5}/(2.0\times10^{-5} + 8.0\times10^{-5}) = 0.20$：五分之一的反应经溶剂合配合物进行。
:::
:::

::: exercise 顺铂的碘化物路线 {#exr-iodide-route level=3}
顺铂的工业合成把 $\mathrm{K_2[PtCl_4]}$ 转化为 $\mathrm{K_2[PtI_4]}$，加两当量氨得到 *cis*-$\mathrm{[PtI_2(NH_3)_2]}$，再把碘离子换成氯离子（经由水合配合物）。(a) 用反位效应解释为什么碘化物中间体给出的 *cis* 产物比 $\mathrm{[PtCl_4]^{2-}}$ 与氨直接反应更纯。(b) 为什么必须把碘离子除去、而不是留在最终产物里？(c) 尽管 $\mathrm{Pt{-}I}$ 键很强，为什么*cis*-二碘配合物仍是一种方便的中间体？
::: solution
(a) 直接路线中 Cl⁻ 与 $\mathrm{NH_3}$ 的反位效应差别不大，所以有些取代发生在氨的*反位*，产物中含有*trans* 异构体以及过度取代生成的 $\mathrm{[PtCl(NH_3)_3]^+}$。碘离子的反位效应比氨大得多；在 $\mathrm{[PtI_3(NH_3)]^-}$ 中，处于碘*反位*的碘被强烈活化，第二个氨几乎专一地进入第一个氨的*cis* 位。(b) 活性药物是二氯配合物；碘离子更软、结合更强，会改变药物在体内的活化方式（它水解成活性水合物种慢得多）。(c) *cis*-$\mathrm{[PtI_2(NH_3)_2]}$ 溶解度差，以高纯度沉淀析出。随后硝酸银把碘离子以难溶的 AgI 除去，尽管 Pt–I 键很强仍能驱动反应，得到二水合配合物；再加氯离子就转化为顺铂。这条路线把动力学工具（反位效应）与热力学工具（AgI 沉淀）结合了起来。它使用有毒、致敏的铂化合物，只在受控条件下进行；这里的要点是这一序列设计的逻辑。
:::
:::

::: exercise 碱水解与共轭碱机理 {level=3}
$\mathrm{[CoCl(NH_3)_5]^{2+}}$ 在碱性溶液中的水解服从速率方程 $-\dd[\mathrm{Co}]/\dd t = k_\mathrm{OH}[\mathrm{Co}][\mathrm{OH^-}]$，比酸催化水解快约 $10^6$ 倍。提出的**共轭碱**机理（$\mathrm{S_N1CB}$，或称 $\mathrm{D_{cb}}$）是：氨配体的快速前置平衡去质子化，$\mathrm{[CoCl(NH_3)_5]^{2+} + OH^- \rightleftharpoons [CoCl(NH_2)(NH_3)_4]^+ + H_2O}$（常数 $K$）；随后酰胺基配合物决速地失去氯离子（$k$）；再快速加上水。(a) 导出速率方程，并证明当 $K[\mathrm{OH^-}] \ll 1$ 时 $k_\mathrm{OH} = kK$。(b) 解释酰胺基为什么加速氯的失去。(c) 配合物 $\mathrm{[CoCl(py)_4(CN)]^+}$ 不显示这种碱加速。为什么？
::: solution
(a) 以 $C$ 表示氯配合物，$C_\mathrm{b}$ 表示其共轭碱。前置平衡给出 $[C_\mathrm{b}] = K[C][\mathrm{OH^-}]$（水的活度取 1）。速率为 $k[C_\mathrm{b}] = kK[C][\mathrm{OH^-}]$。由钴总量 $[C]_\mathrm{tot} = [C] + [C_\mathrm{b}] = [C](1 + K[\mathrm{OH^-}])$，速率为 $kK[\mathrm{OH^-}][C]_\mathrm{tot}/(1 + K[\mathrm{OH^-}])$，当 $K[\mathrm{OH^-}] \ll 1$ 时化为 $kK[\mathrm{OH^-}][C]_\mathrm{tot}$。钴(III)上氨配体的酸性极弱（$\mathrm{p}K_\mathrm{a} > 14$），这一条件在水中总成立，于是以 $k_\mathrm{OH} = kK$ 再现观测到的二级速率方程。注意仅凭速率方程本身无法把它与氢氧根的直接进攻区分开；共轭碱机理的证据来自氨质子与氘的交换（远快于水解），以及机理要求存在 N–H 键。(b) $\mathrm{NH_2^-}$ 是强 π 给体；它的孤对电子通过向氯留下的空轨道给电子，稳定五配位中间体 $\mathrm{[Co(NH_2)(NH_3)_4]^{2+}}$，使解离能垒降低多达几十个 $\mathrm{kJ\,mol^{-1}}$。(c) 以吡啶和氰为其余配体时，没有酸性的 N–H 质子可以移去，共轭碱无法生成，只剩下慢的、未催化的途径——这就是对该机理的决定性检验。
:::
:::
