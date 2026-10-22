热力学始于分子细节变得无望之处。室温下的一升气体约含 $4\times10^{22}$ 个分子，每个分子都服从牛顿定律；逐一追踪它们既不可能，也毫无用处，因为化学家想知道的东西——一个反应放出多少热、能进行到什么程度、一个相是否稳定——是集体的性质，而不是任何一个分子的性质。热力学第一定律是使这种预言成为可能的两条事实中的第一条：能量是守恒的。这是一条关于任何体系——无论它由什么构成——都必须遵守什么的陈述，而本章要建立的，正是本课程其余部分通篇使用的词汇：体系、状态、状态函数、热、功。

这套词汇值得慢慢体会，因为几乎每个学生热力学的困难，都是这几个最初词语的困难。热不是流体，也不是物体的属性；功也不是物体的属性；而热力学能——它*确实*是一种属性——的改变量的多少，与变化是如何引起的毫不相干。一旦这个不对称性站稳了脚跟，课程剩下的部分就只是记账与推论了。

## 体系、环境与热力学能

::: definition 体系、环境、封闭与敞开 {#def-system}
**体系**是所研究的那部分宇宙；其余一切是**环境**。若体系与环境只交换能量而不交换物质，则为**封闭体系**；两者都交换则为**敞开体系**；两者都不交换则为**孤立体系**。只含一个相的封闭体系是**均相**体系；两个或更多相平衡共存构成**多相**体系。固定组成的简单封闭体系的**状态**由任意两个独立的状态变量确定——同时指定 $p$、$V$、$T$ 与 $n$ 会把它超定，因为它们被一个状态方程拴在一起。
:::

**热力学能** $U$ 是储存在体系内部的总能量：平动、转动、振动、电子与核的动能，以及粒子之间所有相互作用的势能。它的绝对值在化学中不可获得；要紧的、也是我们测量的，是**改变量** $\Delta U = U_\text{f} - U_\text{i}$。"internal（热力学内的）"一词把它与体系整体的动能及其在外场中的势能区分开来，后者是热力学不追踪的。

::: proposition 热力学第一定律 {#prop-first-law}
对封闭体系的任何过程，热力学能的改变等于加入体系的热 $q$ 加上对体系所做的功 $w$，
$$
\Delta U = q + w .
$$
等价地说，热力学能是一个**状态函数**：两态之间的 $\Delta U$ 对连接它们的每一条路径都相同，尽管 $q$ 与 $w$ 各自依赖于路径。本图谱通篇采用 IUPAC 的符号惯例：进入体系的能量为正。
:::

"$\Delta U$ 是状态函数"这一论断不是数学花招；它是第一定律的实验内容，而且确实曾经被直接检验过。焦耳发现，同一状态变化（比如把 $1\ \mathrm{g}$ 水从 $14.5$ 加热到 $15.5\,^\circ\mathrm{C}$）可以由电功、叶轮功、压缩，或由火焰供热来实现，而只要排除其余各项，产生这一变化所需的*任何一种*的量总是相同的。能量守恒，而记这笔账的账本就是 $U$。

因为 $\Delta U$ 只取决于终始两态，其微分 $\mathrm{d}U$ 是*exact*（精确的，即全微分）：对任何循环，$\oint \mathrm{d}U = 0$。而 $\delta q$ 与 $\delta w$ 不是全微分——非精确符号 $\delta$ 是一个永久的提醒：有限的热或功属于一个*过程*，从不属于一个状态。永远不会有人问"这瓶气体含有多少热？"，但你可能会被人问——也应当答得上来——"这个过程吸收了多少热？"

::: example 压缩所做的功 {#ex-const-pressure}
$1.00\ \mathrm{mol}$ 理想气体样品在 $300\ \mathrm{K}$ 下从 $V_\mathrm{i} = 10.0\ \mathrm{L}$ **不可逆地**压缩到 $V_\mathrm{f} = 2.0\ \mathrm{L}$，外压恒为 $5.00\ \mathrm{bar}$。求功。
::: solution
$$
w = -p_\text{ex}\,\Delta V = -5.00\ \mathrm{bar}\times(2.0 - 10.0)\ \mathrm{L} = +40\ \mathrm{L\,bar}.
$$
由 $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$（精确值），$w = +4.0\ \mathrm{kJ}$：功是**对**气体做的，故 $w$ 为正。气体在被挤压时升温；若器壁导热，这份多余的能量随后会以热的形式离开，但在压缩过程本身之中，这份能量无处可去。
:::
:::

::: warning 符号惯例只是惯例 {#warn-signs}
一些教科书，尤其是物理与工程方面的，写 $\mathrm{d}U = \delta Q - \delta W$，其中 $W$ 是体系**对外**做的功。物理惯例与 IUPAC 惯例只差 $w$ 的一个符号；要紧的是你知道自己的文献用的是哪一种，并且从不在同一次计算中混用。本图谱通篇取 $w = {}$ 对体系**所做**的功，于是压缩气体给出 $w \gt 0$，而气体推动活塞对环境做功时 $w \lt 0$。无论你采用哪一种惯例，先把*物理*摆正——能量进、能量出——符号自会跟上。
:::

## 功：以力传递的能量

::: definition 功与热 {#def-work-heat}
**功**是由力在距离上作用而传递的能量——在化学中几乎总是膨胀（即 $pV$）功，其 $\delta w = -p_\text{ex}\,\mathrm{d}V$，其中 $p_\text{ex}$ 是体系所推*抗*的外压。**热**是仅由温度差而传递的能量。两者都不是体系的性质：体系*具有*热力学能，但它并不*具有*功或热；功与热是*在途*的能量，其数值取决于所走的路径。
:::

::: proposition 沿路径的功 {#prop-work-path}
对简单封闭体系，体积变化的功为
$$
w = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} p_\text{ex}\,\mathrm{d}V ,
$$
即 $p$–$V$ 图上路径下方的（带符号的）面积。对**可逆**变化，体系处处处于力学平衡，故每一瞬时都有 $p_\text{ex} = p_\text{gas}$（只差一无穷小量），于是理想气体在恒温下有
$$
w_\text{rev} = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} \frac{nRT}{V}\,\mathrm{d}V = -nRT\ln\frac{V_\mathrm{f}}{V_\mathrm{i}}\qquad(\text{恒温，理想气体}).
$$
因为气体只能推抗它顶得过的东西，膨胀在可逆时做功最多；在相同两态之间，不可逆膨胀的功在数值上较小。**自由膨胀**抗真空而膨胀，做功为零。
:::

::: proof
取 $n\ \mathrm{mol}$ 理想气体在温度 $T$ 下从 $V_\mathrm{i}$ 到 $V_\mathrm{f}$ 的可逆恒温膨胀。取 $p_\text{ex} = nRT/V$，
$$
w_\text{rev} = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} \frac{nRT}{V}\,\mathrm{d}V = -nRT\left[\ln V\right]_{V_\mathrm{i}}^{V_\mathrm{f}} = -nRT\ln\frac{V_\mathrm{f}}{V_\mathrm{i}} .
$$
对 $p$–$V$ 图上相同两态之间的任何别的路径，外压从不超过气体压力（否则"膨胀"就会倒着走），故每一处都有 $p_\text{ex} \le p_\text{gas}$，从而 $|w| \le |w_\text{rev}|$。可逆路径是无穷多个无穷小阶段的极限，每一阶段都只抗一个比气体自身压力仅小一无穷小量的外压：它提取最大的功，代价是无穷慢地进行。
:::

::: example 可逆、不可逆与自由膨胀 {#ex-three-paths}
取 $1.00\ \mathrm{mol}$ 理想气体于 $300\ \mathrm{K}$，于是 $pV = nRT = 2494\ \mathrm{J} = 24.94\ \mathrm{L\,bar}$，让它从 $10.0\ \mathrm{L}$ 恒温膨胀到 $20.0\ \mathrm{L}$，分三条路径。求每条路径的 $w$ 与 $q$。
::: solution
**(a) 自由膨胀**，抗真空：$p_\text{ex} = 0$，故 $w = 0$。理想气体的恒温变化 $\Delta U = 0$（焦耳定律，见下），于是 $q = \Delta U - w = 0$ 也为零。

**(b) 不可逆膨胀**，抗恒定 $p_\text{ex} = p_\text{final} = 1.247\ \mathrm{bar}$：
$$
w = -1.247\ \mathrm{bar}\times 10.0\ \mathrm{L} = -12.5\ \mathrm{L\,bar} = -1.25\ \mathrm{kJ}.
$$

**(c) 可逆膨胀**：
$$
w = -24.94\ \mathrm{L\,bar}\times\ln 2 = -17.28\ \mathrm{L\,bar} = -1.73\ \mathrm{kJ}.
$$
每种情形下 $\Delta U = 0$，因为气体是理想的、温度未变，故 $q = -w$：分别为 $0$、$+1.25\ \mathrm{kJ}$ 与 $+1.73\ \mathrm{kJ}$。可逆路径输出的功最多、吸收的热最多；自由膨胀既不出功也不吸热。三个过程，同一个 $\Delta U$，三对不同的 $(q, w)$——状态函数与途径函数之别，尽在此一例中。
:::
:::

::: widget plot
f: 24.94/x ; 24.94/x^1.4
x: 2, 22
y: 0, 14
labels: \text{等温线 } pV = \text{常数}; \text{绝热线 } pV^{1.4} = \text{常数}
caption: 一定量气体的压强对体积：等温线（保持 $T$ 不变）与更陡的绝热线（沿其没有热流过的线）。每条曲线在两个体积之间的下方面积，即沿该路径膨胀做功的大小。因为绝热线比等温线下降得快，绝热膨胀在单位体积变化上起初做更多的功，但气体在膨胀中冷却；而恒温膨胀靠从环境吸热来维持温度。
:::

::: widget plot
f: 24.94/x
x: 2, 22
y: 0, 14
shade: 10, 20
labels: \text{在 } 300\ \mathrm{K} \text{的等温线}
caption: 例题中从 $10.0\ \mathrm{L}$ 到 $20.0\ \mathrm{L}$ 的可逆恒温膨胀的功，就是等温线下方画阴影的面积，$\int p\,\mathrm{d}V = nRT\ln 2 = 17.3\ \mathrm{L\,bar}$。什么也不用拖动——要点在几何：功是面积，而相同两体积之间的不同路径围出不同的面积，这正是 $w$ 是途径函数的原因。
:::

::: quiz
一气体从同一始态经三条路径膨胀到同一终体积：自由膨胀、抗恒定外压膨胀、可逆膨胀。哪条路径的功在数值上最大，为什么？
- [x] 可逆膨胀，因为在每一步，气体抗的外压都是可能达到的最大外压。
- [ ] 自由膨胀，因为没有任何东西阻挡气体。
- [ ] 三者相等，因为功是状态函数。
- [ ] 恒压膨胀，因为压强恒定。
::: solution
功是面积 $\int p_\text{ex}\,\mathrm{d}V$，而只有可逆路径让 $p_\text{ex}$ 处处等于气体压力——那是一个膨胀在不倒退的前提下所能有的最大外压。功*不是*状态函数——这正是全部要点——而抗真空时面积为零。
:::
:::

## 热、恒量与量热

::: proposition 恒容下的能量变化 {#prop-const-volume}
在恒容、且不做其他种类功的封闭体系中，$\delta w = -p_\text{ex}\,\mathrm{d}V = 0$，于是第一定律坍缩为 $\mathrm{d}U = \delta q_V$：**吸收的一切热都改变热力学能**。恒容热容 $C_V = \left(\partial U/\partial T\right)_V$ 于是给出
$$
\mathrm{d}U = C_V\,\mathrm{d}T \qquad (\text{恒容}),
$$
而对热力学能只依赖温度的理想气体，$C_V\,\mathrm{d}T$ 沿*任何*路径都给出 $\mathrm{d}U$，无论恒容与否。
:::

这就是弹式量热计测量——把反应放在密封的刚性钢弹中，浸入恒温水浴——直接测得 $\Delta U$ 的原因：弹壁替你做了 $pV$ 的记账，容器不动，$q_V = \Delta U$。放出的热由水浴的温升与整套装置已知的热容算出，与[[general-chemistry-1/thermochemistry|热化学]]中完全一样。

::: example 恒容加热气体 {#ex-n2-heat}
两摩尔 $\mathrm{N_2}$ 气体在刚性容器中被从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$。取 $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$（对双原子理想气体，$C_{V,\text{m}} = \tfrac{5}{2}R$）。求 $q$、$w$ 与 $\Delta U$。
::: solution
恒容下不做膨胀功：$w = 0$。故
$$
q = \Delta U = nC_{V,\text{m}}\Delta T = 2\times 20.8\ \mathrm{J\,K^{-1}}\times 100\ \mathrm{K} = 4160\ \mathrm{J} = 4.16\ \mathrm{kJ}.
$$
每一焦耳都进了热力学能。若同样的加热在恒压下进行，气体将膨胀做功，所需的热将是 $nC_{p,\text{m}}\Delta T = 5.82\ \mathrm{kJ}$——差额就是膨胀功，这正是焓而非热力学能才是敞口烧瓶化学的自然量的原因。
:::
:::

## 体积依赖与焦耳定律

::: proposition 能量变化的分解 {#prop-decomposition}
两个平衡态之间热力学能的改变总可以算作两个贡献之和，
$$
\Delta U = \Delta U_T + \Delta U_V ,
$$
其中 $\Delta U_T$ 是恒容下温度改变引起的改变，$\Delta U_V$ 是恒温下体积改变引起的改变。对理想气体 $\Delta U_V = 0$——这就是**焦耳定律** $\left(\partial U/\partial V\right)_T = 0$ 的实验内容——于是 $\Delta U$ 只依赖终始两态的温度。对实际气体 $\Delta U_V \ne 0$，且膨胀时通常为负，因为需要能量把分子从彼此的吸引中拉开。
:::

这个分解不是新定律而是一种策略：因为 $U$ 是状态函数，你可以沿*任何*方便的路径计算 $\Delta U$，而"恒容加热、再恒温膨胀"这条两步路径几乎总是最方便的一条。焦耳曾试图直接测量 $\left(\partial U/\partial V\right)_T$：让气体从一个容器膨胀进浸在水中的另一个相同的真空容器；温度变化对他的仪器来说太小而无法检出，他于是断定——以他仪器的精度而言，他是正确的——对稀气体它为零。实际气体的现代数值很小但不为零，[[thermodynamics/heat-capacity-adiabatic]]一章将把它们派上用场。

::: example 随温度与体积变化的能量 {#ex-two-steps}
一摩尔氮气从 $(300\ \mathrm{K},\ 10\ \mathrm{L})$ 到 $(400\ \mathrm{K},\ 20\ \mathrm{L})$。沿"恒容加热、再恒温膨胀"的两步路径计算 $\Delta U$，取 $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 并把气体当作理想气体。
::: solution
第一步，恒容下从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$：$\Delta U_1 = C_{V,\text{m}}\,\Delta T = 20.8\times 100 = 2.08\ \mathrm{kJ}$。第二步，$400\ \mathrm{K}$ 下的恒温膨胀：对理想气体 $\Delta U_2 = 0$（焦耳定律）。故 $\Delta U = 2.08\ \mathrm{kJ}$，而沿任何其他路径也会得到同一个数——这就是状态函数性质的内容。两步各自的功与热依赖路径；它们的和不依赖。
:::
:::

## 恒压与焓的预告

::: proposition 从热力学能到焓 {#prop-dh-du}
**焓**定义为 $H = U + pV$。因为 $U$、$p$ 与 $V$ 都是状态函数，$H$ 也是，且在恒压下
$$
\Delta H = \Delta U + p\,\Delta V = \Delta U - w = q_p :
$$
恒压下（除膨胀功外不做其他功）吸收的热就是焓变。对每摩尔反应生成 $\Delta n_\text{gas}$ 摩尔气体的反应，把气体当作理想气体并略去凝聚相的体积，
$$
\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} .
$$
:::

::: example 弹中与瓶中燃烧 {#ex-glucose}
$298\ \mathrm{K}$ 下，完全氧化 $\mathrm{C_6H_{12}O_6(s)} + 6\,\mathrm{O_2(g)} \rightarrow 6\,\mathrm{CO_2(g)} + 6\,\mathrm{H_2O(l)}$ 的 $\Delta_\text{r}U = -2808\ \mathrm{kJ\,mol^{-1}}$（弹式量热计数值）。求 $\Delta_\text{r}H$。
::: solution
消耗六摩尔气体、生成六摩尔气体，故 $\Delta n_\text{gas} = 0$，
$$
\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} = -2808\ \mathrm{kJ\,mol^{-1}} + 0 = -2808\ \mathrm{kJ\,mol^{-1}} .
$$
修正项消失，因为气体的摩尔数未变：反应体积几乎不变，大气既未被顶开也未压回来。若 $\Delta n_\text{gas} \ne 0$，修正项就不可忽略——在 $300\ \mathrm{K}$，每摩尔净生成气体有 $RT\,\Delta n_\text{gas} = 2.5\ \mathrm{kJ\,mol^{-1}}$，与多数量热的精度相当。
:::
:::

::: warning 焓不是热力学能 {#warn-enthalpy}
咖啡杯量热计测得的量不是 $\Delta U$ 而是 $\Delta H = \Delta U + \Delta(pV)$，因为反应在改变体积时顶开了大气；*弹式*量热计测得的量是 $\Delta U$。对只涉及凝聚相的反应，修正项 $\Delta(pV)$ 微乎其微；对涉及气体的反应，它是 $RT\,\Delta n_\text{gas}$，在 $300\ \mathrm{K}$ 下每摩尔生成气体 $2.5\ \mathrm{kJ\,mol^{-1}}$——不可忽略。把两者混为一谈，是初级热力学中最常见的单个错误。[[thermodynamics/heat-capacity-adiabatic]]一章全面展开焓。
:::

::: history
第一定律诞生于一场争论。把热当作无重量流体的热质说，一直是体面的科学，直到伦福德（Rumford）1798 年的镗炮实验表明热可以由摩擦无中生有地产生，以及戴维（Davy）1799 年用摩擦融化了冰。詹姆斯·普雷斯科特·焦耳（Joule）随后在整个 1840 年代测量热的热功当量——他 1847 年在牛津宣布的叶轮装置给出 $8.19\ \mathrm{J\,cal^{-1}}$，以当时的单位计，距现代的 $4.184\ \mathrm{J\,cal^{-1}}$ 只有几个百分点。朱利叶斯·罗伯特·迈耶（Mayer）1842 年从气体两定压热容之差得出了同样的结论。赫尔曼·冯·亥姆霍兹（Helmholtz）在 1847 年给出了守恒表述的普遍形式，鲁道夫·克劳修斯（Clausius）则在 1850 年把两条定律分开：留下守恒原理与完美热机之不可能，抛弃热质的守恒。
:::

## 后续内容

第一定律给出了账本；它没有告诉我们哪些过程实际发生，因为它被一些从未发生的过程满足着——热从冷体流向热体，能量守恒得完美无缺，却从未被看见。缺失的那味药是熵，见[[thermodynamics/second-law]]。计算 $\Delta U_T$ 与 $q_p$ 所需的热容与焓，是[[thermodynamics/heat-capacity-adiabatic]]的主题。分解式 $\Delta U = \Delta U_T + \Delta U_V$ 在[[thermodynamics/mixtures]]与[[thermodynamics/reaction-equilibrium]]中反复使用；而条件 $\left(\partial U/\partial V\right)_T = 0$ 将在[[statistical-thermodynamics/real-gases-liquids]]中作为非理想性的检验重新出现。

::: summary
- 第一定律陈述能量守恒：$\Delta U = q + w$，其中 $w$ 是对体系**所做**的功（IUPAC 惯例）。
- 热力学能 $U$ 是状态函数；热 $q$ 与功 $w$ 是途径函数，只有它们的和被终始两态确定。
- 膨胀功是 $w = -\int p_\text{ex}\,\mathrm{d}V$，即 $p$–$V$ 图上路径下的面积；可逆路径做功最多，自由膨胀做功为零。
- 恒容下所有热都变成热力学能（$q_V = \Delta U$），这就是弹式量热计测 $\Delta U$ 的原因；恒压下的热是 $\Delta H$。
- 理想气体的热力学能与体积无关（焦耳定律），故 $\Delta U$ 只依赖终始温度；实际气体有一个小的、通常为负的体积依赖。
- 任何 $\Delta U$ 都可沿一条方便的两步路径计算：先恒容加热，再恒温膨胀。
- 第一定律约束能量而不约束方向；它甚至被不可能的过程满足，因此需要第二定律。
:::

## 练习

::: exercise 压缩的功 {level=1 check="12.0"}
两摩尔理想气体在 $300\ \mathrm{K}$ 下抗恒定的 $8.00\ \mathrm{bar}$ 外压，从 $20.0\ \mathrm{L}$ 压缩到 $5.0\ \mathrm{L}$。计算功并指出其符号。（以 $\mathrm{kJ}$ 为单位输入 $w$。）
::: solution
$w = -p_\text{ex}\,\Delta V = -8.00\ \mathrm{bar}\times(5.0-20.0)\ \mathrm{L} = +120\ \mathrm{L\,bar}$。由 $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$，$w = +12.0\ \mathrm{kJ}$。功为正：环境对气体做功，而（容器随之升温）这份能量先入气体、后入水浴。
:::
:::

::: exercise 恒容的热 {level=1 check="4.16"}
两摩尔 $\mathrm{N_2}$ 气体在刚性容器中被从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$。取 $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$。吸收多少热？（以 $\mathrm{kJ}$ 为单位输入 $q$。）
::: solution
恒容下不做膨胀功，故 $q = \Delta U = nC_{V,\text{m}}\Delta T = 2\times20.8\times100 = 4160\ \mathrm{J} = 4.16\ \mathrm{kJ}$。
:::
:::

::: exercise 汽化的热力学能 {level=1 check="37.6"}
一摩尔液态水在 $373.15\ \mathrm{K}$、$1\ \mathrm{bar}$ 下汽化，此处 $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$。求此过程的 $\Delta_\text{vap}U$，把蒸气当作理想气体。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位、保留三位有效数字输入 $\Delta_\text{vap}U$。）
::: solution
$\Delta U = \Delta H - \Delta(pV) \approx \Delta H - RT\,\Delta n_\text{gas} = 40.66 - \dfrac{8.314\times373.15}{1000} = 40.66 - 3.10 = 37.6\ \mathrm{kJ\,mol^{-1}}$。修正项 $RT\,\Delta n_\text{gas} = 3.10\ \mathrm{kJ\,mol^{-1}}$ 是液体变成一摩尔蒸气时对抗大气做的功：汽化热的大部分留在后继相的热力学能里，约百分之八花在把世界推开上。
:::
:::

::: exercise 两级膨胀 {level=2 check="-1.46"}
一摩尔理想气体在 $300\ \mathrm{K}$ 下恒温地从 $10.0\ \mathrm{L}$ 分两级膨胀到 $20.0\ \mathrm{L}$：先抗恒定的 $p_\text{ex} = 1.663\ \mathrm{bar}$ 到 $V = 15.0\ \mathrm{L}$，再抗恒定的 $p_\text{ex} = 1.247\ \mathrm{bar}$ 到 $V = 20.0\ \mathrm{L}$。计算总功。（以 $\mathrm{kJ}$ 为单位输入 $w$。）
::: solution
$w = -\left(1.663\ \mathrm{bar}\times 5.0\ \mathrm{L} + 1.247\ \mathrm{bar}\times 5.0\ \mathrm{L}\right) = -(8.32 + 6.24)\ \mathrm{L\,bar} = -14.6\ \mathrm{L\,bar} = -1.46\ \mathrm{kJ}$。
与例题中单级的 $-1.25\ \mathrm{kJ}$ 和可逆极限 $-1.73\ \mathrm{kJ}$ 比较：把膨胀分成更多级就找回更多可逆功，而在无穷多级的极限下，和成为积分。（每一级的外压不得超过*该级终了*时气体的压力——这里 $1.663\ \mathrm{bar}$ 恰是气体在 $15.0\ \mathrm{L}$ 时的压力——否则那一级就会停住。）
:::
:::

::: exercise 盖斯定律 {level=2 check="-283.0"}
已知 $\Delta_\text{f}H^\circ[\mathrm{CO_2(g)}] = -393.5\ \mathrm{kJ\,mol^{-1}}$ 与 $\Delta_\text{f}H^\circ[\mathrm{CO(g)}] = -110.5\ \mathrm{kJ\,mol^{-1}}$，求 $\mathrm{CO(g)} + \tfrac{1}{2}\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$ 的 $\Delta_\text{r}H^\circ$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入。）
::: solution
$\Delta_\text{r}H^\circ = -393.5 - (-110.5) = -283.0\ \mathrm{kJ\,mol^{-1}}$。盖斯定律——反应焓像路径的各步一样可加——本身就是 $H$ 为状态函数的推论：CO 氧化成 $\mathrm{CO_2}$ 可以直达，也可以绕道单质，两条路线必须结平。
:::
:::

::: exercise 反应的功 {level=2 check="-2808"}
$298\ \mathrm{K}$ 下，反应 $\mathrm{C_6H_{12}O_6(s)} + 6\,\mathrm{O_2(g)} \rightarrow 6\,\mathrm{CO_2(g)} + 6\,\mathrm{H_2O(l)}$ 的 $\Delta_\text{r}U = -2808\ \mathrm{kJ\,mol^{-1}}$。求 $\Delta_\text{r}H$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入 $\Delta_\text{r}H$。）
::: solution
$\Delta n_\text{gas} = 6 - 6 = 0$，故 $\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} = -2808\ \mathrm{kJ\,mol^{-1}}$。修正项消失，因为气体的摩尔数未变。若水以蒸气形式生成，$\Delta n_\text{gas}$ 将是 $+6$，两个量就会相差 $6RT = 14.8\ \mathrm{kJ\,mol^{-1}}$——时刻写明聚集态，此为又一提醒。
:::
:::

::: exercise 推导能压关系 {level=3}
利用循环规则 $\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial z}\right)_x\left(\frac{\partial z}{\partial x}\right)_y = -1$ 与麦克斯韦关系式 $(\partial S/\partial V)_T = (\partial p/\partial T)_V$，证明
$$
\left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p .
$$
由此对理想气体导出焦耳定律，并对范德瓦尔斯气体计算左端。
::: hint
从基本方程 $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$（在[[thermodynamics/free-energy]]中证明）出发，在恒温下除以 $\mathrm{d}V$。
:::
::: solution
把 $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ 在恒温下除以 $\mathrm{d}V$ 得 $(\partial U/\partial V)_T = T(\partial S/\partial V)_T - p$，再用麦克斯韦关系式转换熵的偏导数：$(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$。对理想气体 $(\partial p/\partial T)_V = nR/V = p/T$，故右端为 $p - p = 0$：焦耳定律仅由状态方程即告成立。对范德瓦尔斯气体，$p = nRT/(V-nb) - a(n/V)^2$，于是 $T(\partial p/\partial T)_V - p = a(n/V)^2 \gt 0$：实际气体的热力学能在恒温下随体积*增大*，因为膨胀让分子逃出彼此的吸引势阱。这也正是前面那次自由膨胀会令实际气体微微冷却的原因——而文中符号惯例之争，争的是 $w$，不是物理。
:::
:::

::: exercise 三步循环 {level=3 check="-0.77"}
一摩尔理想气体始于 $(300\ \mathrm{K},\ 1.00\ \mathrm{bar})$。(i) 恒压下加热到 $600\ \mathrm{K}$；(ii) 恒容下冷却回 $300\ \mathrm{K}$；(iii) 恒温下压缩回始态。取 $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$。求每一步与整个循环的 $\Delta U$、$q$ 与 $w$。（以 $\mathrm{kJ}$ 为单位输入循环总功 $w_\text{cycle}$。）
::: solution
始体积 $V_1 = nRT/p = 24.94\ \mathrm{L}$；(i) 之后 $V_2 = 49.88\ \mathrm{L}$。

**第 (i) 步**，恒 $p = 1.00\ \mathrm{bar}$：$\Delta U_1 = C_{V,\text{m}}\Delta T = 20.8\times300 = +6.24\ \mathrm{kJ}$；$w_1 = -p\,\Delta V = -1.00\times24.94\ \mathrm{L\,bar} = -2.49\ \mathrm{kJ}$；$q_1 = \Delta U_1 - w_1 = +8.73\ \mathrm{kJ}$（等于 $C_{p,\text{m}}\Delta T$，也必须如此）。

**第 (ii) 步**，恒 $V$：$\Delta U_2 = -6.24\ \mathrm{kJ}$，$w_2 = 0$，$q_2 = -6.24\ \mathrm{kJ}$。

**第 (iii) 步**，$300\ \mathrm{K}$ 恒温下从 $49.88\ \mathrm{L}$ 到 $24.94\ \mathrm{L}$：$\Delta U_3 = 0$；$w_3 = -RT\ln(V_3/V_2) = -2.494\ \mathrm{kJ}\times\ln\tfrac{1}{2} = +1.73\ \mathrm{kJ}$；$q_3 = -1.73\ \mathrm{kJ}$。

**循环**：$\Delta U_\text{cycle} = 0$，精确成立——热力学能是状态函数，循环没有可资不同的终始两态。带上未舍入的分步值，$w_\text{cycle} = -2.494 + 0 + 1.728 = -0.77\ \mathrm{kJ}$，$q_\text{cycle} = +0.77\ \mathrm{kJ}$：这台机器吸入 $0.77\ \mathrm{kJ}$ 的热、输出 $0.77\ \mathrm{kJ}$ 的功，是一台（效率极低的）热机。第一定律把账结平；这个循环是否*被允许*，则是第二定律的问题。
:::
:::
