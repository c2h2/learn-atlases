1953 年，Ziegler 在米卢海姆的课题组发现，四氯化钛与三乙基铝的混合物在常压和室温下就能把乙烯变成高摩尔质量的聚乙烯——而当时既有的高压工艺在这些条件下什么也不生成。一年后，Natta 在米兰用同类催化剂把丙烯聚成一种结晶的、高熔点的塑料，其中每个甲基都指向同一侧。他们的催化剂如今每年生产远超一亿吨的聚烯烃。还是在 1950 与 1960 年代，几家石油公司的化学家在钼和钨催化剂上注意到一个更奇特的反应：丙烯变成了乙烯与丁-2-烯的混合物，仿佛其双键的两半被切断后与另一个伙伴的半键重新接合。这个反应——**烯烃复分解**——后来彻底改变了环的合成、聚合物化学和特种烯烃的制造。

两个反应都是与碳成键的过渡金属的催化循环，都由[[organometallics-catalysis/elementary-reactions]]中的基元步骤完成，外加一个新增步骤：金属–碳双键与烯烃的 **[2+2] 环加成**。本章说明复分解如何工作、它的平衡如何被驾驭、齐格勒-纳塔与茂金属催化剂如何一次插入一个单体地增长聚合物链、什么决定链长及其分布，以及催化剂的对称性如何决定聚丙烯的立构规整度。本章以[[organometallics-catalysis/ligands-complexes]]的卡宾配体与[[organometallics-catalysis/hydrogenation-hydroformylation]]的循环分析为基础。

## 烯烃复分解：Chauvin 机理

::: definition 烯烃复分解与 Chauvin 机理 {#def-metathesis}
**烯烃复分解**是烷基叉片段在烯烃之间的催化再分配：$\mathrm{R^1CH{=}CHR^1 + R^2CH{=}CHR^2 \rightleftharpoons 2\,R^1CH{=}CHR^2}$。在 Chauvin 与 Hérisson 于 1971 年提出的机理中，活性催化剂是一个**金属烷基叉** $\mathrm{L_nM{=}CHR}$。每个周转：

1. 一分子烯烃配位到金属上，处于烷基叉的顺位；
2. M=C 键与 C=C 键发生 **[2+2] 环加成**，生成四元**金属环丁烷**，金属氧化态不变；
3. 金属环丁烷沿*另一对*相对的键发生**环逆裂解**，放出一个新的烯烃，并在金属上留下一个新的烷基叉；
4. 新的烷基叉与另一分子烯烃重复上述过程。

每一步都可逆，所以复分解本身只建立起所有存在烯烃之间的平衡；有用的反应靠移去产物（通常是乙烯）或释放环张力来驱动。
:::

Chauvin 的证据是环状与无环烯烃交叉复分解的产物分布：它无法用当时流行的"成对"机理（两个烯烃在金属上像环丁烷样交换）解释，却自然而然地来自由金属卡宾携带的链。Katz（Thomas Katz）与 Grubbs（Robert Grubbs）在 1970 年代中期用标记实验证实了它，而 Schrock 分离出能执行复分解的结构明确的烷基叉配合物，则使问题尘埃落定。

要使 [2+2] 步骤容易发生，金属必须能容纳金属环丁烷，这意味着需要一个高氧化态的 $d^0$ 金属（Mo(VI)、W(VI)、Re(VII)），或一个带空位的钌(II)中心。实际使用两类结构明确的催化剂：

- **Schrock 催化剂**，钼和钨的亚胺基金属烷基叉配合物，如 $\mathrm{[Mo(NAr)(CHCMe_2Ph)(OR)_2]}$（Ar = 2,6-二异丙基苯基，OR 为庞大的氟代醇盐；Schrock，1990）。它们活性极高，并可通过醇盐调节，包括用于对映选择性复分解的手性版本；但它们对空气、水和许多极性官能团敏感——亲氧的 $d^0$ 金属会结合醛和醇。
- **Grubbs 催化剂**，钌基金属烷基叉配合物。第一代 $\mathrm{[RuCl_2(PCy_3)_2({=}CHPh)]}$（1995）能耐受水、醇、酸以及短时间的空气；第二代（1999）用一个 N-杂环卡宾取代一分子膦，活性大增。**Hoveyda–Grubbs** 变体带一个螯合的异丙氧基苄叉基，使它们既稳定又便于回收。

对 Grubbs 催化剂，机理始于膦的**解离**，生成 14 电子的烷基叉物种，后者结合烯烃。二代催化剂的引发比一代*更慢*（失去膦更慢），但一经引发，其带 NHC 的 14 电子物种更愿意结合烯烃而不重新抓回膦，因此每次引发能周转的次数多得多——这是引发与增长之间的权衡，Grubbs 课题组正是用[[organometallics-catalysis/elementary-reactions#prop-dissociative]]中那种解离型动力学对它作了分析。

::: widget graph
nodes: M=CHR@0,2; M=CHR(alkene)@2,3; metallacycle@4,2; M=CHR'(alkene)@2,0; M=CHR'@0,0
edges: M=CHR>M=CHR(alkene):1; M=CHR(alkene)>metallacycle:2; metallacycle>M=CHR'(alkene):3; M=CHR'(alkene)>M=CHR':4; metallacycle>M=CHR(alkene); M=CHR'(alkene)>metallacycle
algorithm: none
caption: 一次有生产性的复分解事件的 Chauvin 循环，画成有向网络。步骤 1：烯烃 $\mathrm{R'CH{=}CHR''}$ 结合到烷基叉 $\mathrm{M{=}CHR}$ 上；步骤 2：[2+2] 环加成生成金属环丁烷；步骤 3：沿另一条对角线环逆裂解，给出配位的 $\mathrm{RCH{=}CHR''}$ 和新烷基叉 $\mathrm{M{=}CHR'}$；步骤 4：产物烯烃离去。未编号的回箭头标明环加成与环逆裂解是可逆的：金属环丁烷总能按生成它的方式裂开（一次无生产性的"简并"事件）。每个含催化剂的物种中金属都保持同一氧化态。
:::

## 驾驭平衡：RCM、CM、ROMP 与 ADMET

因为复分解是可逆的，而对无张力烯烃又几乎热中性（断裂与生成的 C=C 键同种同量），结果就由熵、张力和移去产物决定。反应分为四种模式。

- **关环复分解**（RCM）：二烯生成环烯烃和乙烯。放出一分子气体使 $\Delta S > 0$，移去乙烯可把反应推至完全。五元到七元环容易关合；大环需要高稀释。
- **交叉复分解**（CM）：两种不同的烯烃交换伙伴。选择性靠挑选反应性不同的伙伴实现（一种容易均二聚，另一种不易）。
- **开环复分解聚合**（ROMP）：张力的环烯烃（降冰片烯、环辛烯、双环戊二烯）开环成主链上带 C=C 键的聚合物；环张力的释放使 $\Delta H < 0$。
- **无环二烯复分解**（ADMET）：α,ω-二烯经反复交叉复分解并放出乙烯而聚合。

RCM 与 ADMET 始于同一类分子。二烯究竟关环还是聚合，由浓度决定。

::: proposition 环化对抗低聚：有效摩尔浓度 {#prop-em}
对某个既可分子内反应（关环，对二烯一级，速率常数 $k_\text{intra}$）又可分子间反应（链增长，二级，速率常数 $k_\text{inter}$）的二烯，二烯浓度为 $c$ 时两速率之比为
$$
\frac{v_\text{intra}}{v_\text{inter}} = \frac{k_\text{intra}}{k_\text{inter}\,c} = \frac{\mathrm{EM}}{c},
\qquad \mathrm{EM} \equiv \frac{k_\text{intra}}{k_\text{inter}},
$$ {#eq-em}
发生关环的事件分数为 $\mathrm{EM}/(\mathrm{EM} + c)$。**有效摩尔浓度** EM 具有浓度的量纲；它相当于使分子间与分子内反应同样快时第二个分子的浓度。当复分解可逆时，同一平衡常数之比决定热力学的环-链平衡。
:::

::: proof
两个过程都消耗活性链端（在催化剂上），区别只在它遇到什么。分子内的伙伴连在同一分子上，其速率为 $k_\text{intra}[\text{二烯–催化剂}]$，与 $c$ 无关；分子间的伙伴是另一个二烯分子，其速率为 $k_\text{inter}[\text{二烯–催化剂}]\,c$。相比时催化剂结合态的浓度相消，得到[[#eq-em]]。关环分数为 $v_\text{intra}/(v_\text{intra} + v_\text{inter}) = \mathrm{EM}/(\mathrm{EM} + c)$。热力学情形中，$K_\text{intra}$（无量纲）与 $K_\text{inter}$（浓度$^{-1}$）给出同样的结构，$\mathrm{EM} = K_\text{intra}/K_\text{inter}$；这就是 Jacobson–Stockmayer 环-链平衡理论的基础。对成环原子超过约七个的环，有效摩尔浓度急剧下降，因为长链很少能找到自己的链端（[[polymer-chemistry/step-growth]]）。$\blacksquare$
:::

::: widget plot
f: e/(e + x)
x: 0, 0.5
y: 0, 1
sliders: e=0.05:0.001:1:0.001
labels: \text{关环事件的分数}
caption: 发生关环的复分解事件分数 $\mathrm{EM}/(\mathrm{EM} + c)$ 对二烯浓度 $c$（单位 $\mathrm{mol\,dm^{-3}}$）的曲线（[[#eq-em]]），有效摩尔浓度由滑块设定。五元或六元环的 EM 很大（常高于 $1\ \mathrm{mol\,dm^{-3}}$），在任何实用浓度下 RCM 都占优；十四元大环的 EM 可能只有 $0.01$–$0.05\ \mathrm{mol\,dm^{-3}}$，只有高稀释才能阻止低聚物生成。把 EM 设为 $0.05$：在 $0.005\ \mathrm{mol\,dm^{-3}}$ 处关环占 $91\,\%$，在 $0.5$ 处却只有 $9\,\%$。
:::

::: example 大环的关环 {#ex-rcm}
一个设计用于经 RCM 关合成十六元内酯的二烯，二代 Grubbs 催化剂下的有效摩尔浓度为 $0.050\ \mathrm{mol\,dm^{-3}}$。(a) 在 $c = 0.0050$ 与 $0.50\ \mathrm{mol\,dm^{-3}}$ 时，反应事件中关环的分数各是多少？(b) 逐步描述催化剂在二烯上的第一个周转。(c) 为什么反应要在缓慢的氮气流下或减压下进行？
::: solution
(a) 由[[#prop-em]]，$c = 0.0050$ 时：$0.050/(0.050 + 0.0050) = 0.909$，即 $91\,\%$ 关环。$c = 0.50$ 时：$0.050/(0.050 + 0.50) = 0.091$，仅 $9\,\%$——大部分二烯将通过 ADMET 生成低聚物。

(b) 预催化剂 $\mathrm{[RuCl_2(NHC)(PCy_3)(=CHPh)]}$ 失去 $\mathrm{PCy_3}$，生成 14 电子的 $\mathrm{[RuCl_2(NHC)(=CHPh)]}$。二烯的一个端烯配位；[2+2] 环加成生成钌杂环丁烷；环逆裂解释放苯乙烯，并把钌烷基叉留在底物的端基碳上，$\mathrm{Ru{=}CH{-}(链)}$。该烷基叉接下来遇到二烯的另一个端烯——在同一分子上，即关环事件——第二次环加成生成与正在形成的大环并合的钌杂环丁烷；环逆裂解释放环烯烃，并留下亚甲基叉 $\mathrm{Ru{=}CH_2}$。亚甲基叉与新的二烯反应生成乙烯和新的底物烷基叉，循环继续；乙烯是第一个周转之后每个周转的副产物。

(c) 乙烯是挥发性的。把它吹走就移去了产物，可逆反应便被拉向环烯烃一边（Le Chatelier 原理）；这同时防止亚甲基叉进行无生产性的乙烯交换并防止其分解（钌亚甲基叉是循环中最不稳定的物种）。
:::
:::

ROMP 的驱动方向相反，靠的是张力。它的热力学与任何链式聚合相同，并有一个重要结果：**上限温度**。

::: proposition 开环聚合的上限温度 {#prop-ceiling}
对增长平衡 $\mathrm{P_n + M \rightleftharpoons P_{n+1}}$，标准聚合焓与熵为 $\Delta H_\mathrm{p}^\circ < 0$ 和 $\Delta S_\mathrm{p}^\circ < 0$（单体取 $1\ \mathrm{mol\,dm^{-3}}$ 标准态），聚合物与单体处于平衡时的单体浓度为
$$
[\mathrm{M}]_\mathrm{e} = c^\circ \exp\!\left(\frac{\Delta H_\mathrm{p}^\circ}{RT} - \frac{\Delta S_\mathrm{p}^\circ}{R}\right),
$$
而对浓度为 $[\mathrm{M}]$ 的单体，聚合只有在**上限温度**
$$
T_\mathrm{c} = \frac{\Delta H_\mathrm{p}^\circ}{\Delta S_\mathrm{p}^\circ + R\ln([\mathrm{M}]/c^\circ)}
$$
以下才可能进行。
:::

::: proof
对长链，加成一分子单体对聚合物活性的影响可以忽略，所以增长的平衡常数为 $K = c^\circ/[\mathrm{M}]_\mathrm{e}$。由 $\Delta G_\mathrm{p}^\circ = -RT\ln K = \Delta H_\mathrm{p}^\circ - T\Delta S_\mathrm{p}^\circ$，
$$
\ln\frac{[\mathrm{M}]_\mathrm{e}}{c^\circ} = \frac{\Delta G_\mathrm{p}^\circ}{RT} = \frac{\Delta H_\mathrm{p}^\circ}{RT} - \frac{\Delta S_\mathrm{p}^\circ}{R}.
$$
聚合只在 $[\mathrm{M}] > [\mathrm{M}]_\mathrm{e}$ 时进行。令 $[\mathrm{M}]_\mathrm{e} = [\mathrm{M}]$ 并解出 $T$ 即得 $T_\mathrm{c}$。高于 $T_\mathrm{c}$ 时，$-T\Delta S$ 项压过放出的焓，解聚占优。高张力单体（降冰片烯，$\Delta H_\mathrm{p}$ 负值很大）的上限温度远高于任何操作温度；几乎无张力的环己烯 $\Delta H_\mathrm{p} \approx 0$，不发生 ROMP。$\blacksquare$
:::

::: example 低张力单体 {#ex-ceiling}
某个中等张力的环烯烃的 $\Delta H_\mathrm{p}^\circ = -20\ \mathrm{kJ\,mol^{-1}}$、$\Delta S_\mathrm{p}^\circ = -70\ \mathrm{J\,K^{-1}\,mol^{-1}}$（量级与环戊烯实测值相当的示例值）。求 $1.0\ \mathrm{mol\,dm^{-3}}$ 单体的 $T_\mathrm{c}$，以及 $25\,^\circ\mathrm{C}$ 和 $0\,^\circ\mathrm{C}$ 下的平衡单体浓度。
::: solution
$[\mathrm{M}] = c^\circ$ 时对数项为零：$T_\mathrm{c} = (-20\,000)/(-70) = 286\ \mathrm{K}$（$13\,^\circ\mathrm{C}$）。$298.15\ \mathrm{K}$ 时：
$$
[\mathrm{M}]_\mathrm{e} = \exp\!\left(\frac{-20\,000}{8.314 \times 298.15} + \frac{70}{8.314}\right) = \exp(-8.068 + 8.420) = e^{0.352} = 1.42\ \mathrm{mol\,dm^{-3}},
$$
高于单体浓度，所以 $1.0\ \mathrm{mol\,dm^{-3}}$ 的溶液在室温下不会聚合。$273.15\ \mathrm{K}$ 时，$[\mathrm{M}]_\mathrm{e} = \exp(-8.806 + 8.420) = 0.68\ \mathrm{mol\,dm^{-3}}$：聚合进行到只剩 $0.68\ \mathrm{mol\,dm^{-3}}$ 单体为止，转化率约 $32\,\%$。低张力 ROMP 要在低温、浓溶液（或本体）中进行；残留在聚合物中的活性催化剂升温后能使其解聚。
:::
:::

## 齐格勒-纳塔与茂金属聚合

复分解催化剂制造 C=C 键；聚合催化剂消耗它们。齐格勒-纳塔催化剂形成一个**带空位的钛烷基**，聚乙烯靠烯烃反复插入 Ti–C 键而增长。

::: definition Cossee–Arlman 机理 {#def-cossee}
在 Cossee 与 Arlman（1964）提出的机理中，活性中心是配位不饱和的过渡金属烷基——在多相 $\mathrm{TiCl_3}$/$\mathrm{MgCl_2}$ 催化剂上，是晶体棱边上带一个氯空位、已被铝助催化剂烷基化的钛原子。每个增长步是：(1) 烯烃在生长链顺位的空位上**配位**，接着 (2) 烯烃经四中心过渡态向 M–C 键发生 **1,2-迁移插入**，使链增长两个碳，并在链原来所在的位置再生一个空位。链增长以如下方式终止（链转移）：向金属或向单体发生 **β-氢消除**、**向铝转移**（聚合物链与烷基交换），或**与 $\mathrm{H_2}$ 的 σ键复分解**——工业上正是用后者控制摩尔质量。
:::

其均相对应变体是**茂金属催化剂**。Sinn（Hansjörg Sinn）与 Kaminsky（Walter Kaminsky）1980 年发现，部分水解的三甲基铝——**甲基铝氧烷**（MAO）——能使 $\mathrm{Cp_2ZrCl_2}$ 变成对乙烯聚合活性极高的催化剂。MAO 先使锆烷基化，再攫取一个甲基负离子，生成阳离子 $\mathrm{[Cp_2ZrCH_3]^+}$，配以弱配位抗衡阴离子。该物种是 $d^0$，只有 $4 + 10 + 1 - 1 = 14$ 个价电子，带两个空轨道：一个结合烯烃，另一个是插入后链转移进入的位点。作为 $d^0$ 金属它不能反馈，所以烯烃结合得弱、插入得快。（与制它的三烷基铝一样，MAO 自燃且遇水反应；危险性见[[organometallics-catalysis/main-group-organometallics#warn-pyrophoric]]。）

### 链长及其分布

::: proposition 有链转移时的聚合度 {#prop-xn}
对处于稳态的单活性中心催化剂，增长速率常数为 $k_\mathrm{p}$（对活性中心处的单体为一级），链转移过程的伪一级速率常数为 $k_{\beta}$（向金属的 β-氢消除，与单体无关）、$k_\mathrm{trM}[\mathrm{M}]$（向单体转移）与 $k_\mathrm{H}[\mathrm{H_2}]^{a}$（氢解），则数均聚合度为
$$
\frac{1}{X_\mathrm{n}} = \frac{k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^{a}}{k_\mathrm{p}[\mathrm{M}]} = \frac{k_\beta}{k_\mathrm{p}[\mathrm{M}]} + \frac{k_\mathrm{trM}}{k_\mathrm{p}} + \frac{k_\mathrm{H}[\mathrm{H_2}]^{a}}{k_\mathrm{p}[\mathrm{M}]},
$$ {#eq-mayo}
这是 Mayo 方程的金属有机形式（对氢的级数 $a$ 由实验测定，通常在 ½ 与 1 之间）。
:::

::: proof
每个活性中心都在增长一条链与释放一条链之间交替。链以速率 $k_\mathrm{p}[\mathrm{M}]$ 增长一个单体，以总速率 $k_\text{tr} = k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^{a}$ 被终止；每次转移都使活性中心保持活性，所以单位时间每个中心生成的链数为 $k_\text{tr}$，消耗的单体数为 $k_\mathrm{p}[\mathrm{M}]$。释放出的链的数均长度即二者之比
$$
X_\mathrm{n} = \frac{k_\mathrm{p}[\mathrm{M}]}{k_\text{tr}},
$$
取倒数即得[[#eq-mayo]]。（等价地：给定链端加单体而非转移的概率为 $p = k_\mathrm{p}[\mathrm{M}]/(k_\mathrm{p}[\mathrm{M}] + k_\text{tr})$，对长链 $X_\mathrm{n} = 1/(1-p) \approx k_\mathrm{p}[\mathrm{M}]/k_\text{tr}$。）这一推导假定只有一种活性中心且单体浓度恒定。$\blacksquare$
:::

::: proposition Schulz–Flory 分布 {#prop-flory}
对每个链端以恒定概率 $p$ 加单体、以概率 $1 - p$ 转移的单活性中心催化剂，长度为 $n$ 的链的数目分数为 $x_n = (1-p)p^{n-1}$，重量分数为 $w_n = n(1-p)^2p^{n-1}$。两种平均为 $X_\mathrm{n} = 1/(1-p)$ 与 $X_\mathrm{w} = (1+p)/(1-p)$，于是**分散度**为
$$
Đ = \frac{X_\mathrm{w}}{X_\mathrm{n}} = 1 + p \approx 2 \quad\text{（长链时）}.
$$
引发快且无链转移的**活性**聚合则给出泊松分布，$Đ = 1 + \nu/(\nu+1)^2 \approx 1 + 1/X_\mathrm{n}$，其中 $\nu$ 是每条链平均加入的单体数。
:::

::: proof
恰好含 $n$ 个单元的链经历了 $n - 1$ 次连续加成（概率 $p^{n-1}$），然后一次转移（概率 $1 - p$），即得 $x_n$；按几何级数，各 $x_n$ 之和为 $1$。于是 $X_\mathrm{n} = \sum n x_n = (1-p)\sum n p^{n-1} = (1-p)/(1-p)^2 = 1/(1-p)$，且 $X_\mathrm{w} = \sum n^2x_n/\sum nx_n = (1-p)^2\sum n^2p^{n-1}$；利用 $\sum_{n\ge1} n^2p^{n-1} = (1+p)/(1-p)^3$ 得 $X_\mathrm{w} = (1+p)/(1-p)$，二者之比为 $1 + p$。重量分数为 $w_n = nx_n/X_\mathrm{n} = n(1-p)^2p^{n-1}$。泊松结果的推导见[[polymer-chemistry/controlled-polymerisation]]。$\blacksquare$
:::

::: widget plot
f: x*(1/a)^2*(1 - 1/a)^(x - 1)
x: 1, 2000
y: 0, 0.0015
sliders: a=300:50:1000:10
labels: w_n\ \text{（Schulz–Flory 分布，}X_\mathrm{n} = a\text{）}
caption: Schulz–Flory 重量分数 $w_n = n(1-p)^2p^{n-1}$ 对链长 $n$ 的曲线，其中 $p = 1 - 1/X_\mathrm{n}$，$X_\mathrm{n}$ 由滑块设定。极大值位于 $n \approx X_\mathrm{n}$，通向高 $n$ 的长尾使 $X_\mathrm{w} \approx 2X_\mathrm{n}$：分散度 2 是"单一活性中心 + 随机转移"的标志。多活性中心的多相齐格勒-纳塔催化剂叠加若干条具有不同 $X_\mathrm{n}$ 的此类曲线，给出 4–8 的分散度；而活性 ROMP 会显示一个 $Đ$ 接近 1 的窄峰。
:::

::: example 用氢气控制聚乙烯的摩尔质量 {#ex-hydrogen}
某茂金属催化剂在固定乙烯浓度下，每个活性中心的增长速率为 $k_\mathrm{p}[\mathrm{M}] = 1.0\times10^{3}\ \mathrm{s^{-1}}$；β-氢转移速率 $k_\beta = 0.050\ \mathrm{s^{-1}}$，向单体转移可忽略，在所选氢压下 $k_\mathrm{H}[\mathrm{H_2}]^{a} = 0.15\ \mathrm{s^{-1}}$。求有无氢气时的 $X_\mathrm{n}$ 与 $M_\mathrm{n}$（$M(\mathrm{C_2H_4}) = 28.05\ \mathrm{g\,mol^{-1}}$），以及预期的 $M_\mathrm{w}$。
::: solution
有氢气时，由[[#eq-mayo]]，
$$
X_\mathrm{n} = \frac{1.0\times10^{3}}{0.050 + 0.15} = 5.0\times10^{3}, \qquad M_\mathrm{n} = 5.0\times10^{3} \times 28.05 = 1.4\times10^{5}\ \mathrm{g\,mol^{-1}}.
$$
无氢气时，$X_\mathrm{n} = 1.0\times10^{3}/0.050 = 2.0\times10^{4}$，$M_\mathrm{n} = 5.6\times10^{5}\ \mathrm{g\,mol^{-1}}$。单活性中心催化剂给出 Schulz–Flory 分布，故 $M_\mathrm{w} \approx 2M_\mathrm{n}$：分别为 $2.8\times10^{5}$ 与 $1.1\times10^{6}\ \mathrm{g\,mol^{-1}}$。氢气是生产商拨摩尔质量的旋钮：它与 Zr–聚合物键发生 σ键复分解，放出一条饱和链和一个 Zr–H，后者插入乙烯开始一条新链，而活性中心的数目不变。两种端基不同：β-氢转移在放出的链上留下一个乙烯基端基，氢解留下的是饱和端基——这一区别可由 $^{1}\mathrm{H}$ NMR 分辨。
:::
:::

### 立体化学：由催化剂对称性决定立构规整度

丙烯插入时，甲基处在*不*与金属成键的那个碳上（**1,2-插入**），在链上每隔一个碳产生一个立体中心。若相邻的立体中心构型相同，聚合物是**等规**的；若交替，是**间规**的；若随机，是**无规**的。等规聚丙烯结晶，熔点接近 $165\,^\circ\mathrm{C}$；无规聚丙烯是软而发黏的非晶材料。由催化剂决定生成哪一种，靠两种立体控制机理之一：**链端控制**（链的最后一个立体中心影响下一次插入）或**对映异位位点控制**（活性中心的手性选择每个进入的丙烯的面）。

茂金属使位点控制成为可以理性设计的对象。在 *ansa*-茂金属中，两个环戊二烯型环被一个桥（如 $\mathrm{CH_2CH_2}$ 或 $\mathrm{Me_2Si}$）连起来，阻止其旋转，催化剂的形状因此被固定。每次插入都把链移到原先烯烃占据的位点（链"迁移"），两个配位位点于是被交替使用。

- **$C_2$ 对称**的 *rac*-ansa-茂金属（例如 *rac*-亚乙基双(茚基)二氯化锆）有两个**同位的**位点，经 $C_2$ 轴相关联：两者选*相同*的丙烯面，于是每次插入产生相同构型——**等规**聚丙烯（Ewen，1984；Kaminsky 与 Brintzinger，1985）。
- **$C_\mathrm{s}$ 对称**的催化剂（Ewen 的 $\mathrm{[Me_2C(Cp)(fluorenyl)]ZrCl_2}$，1988）有两个**对映异位的**位点，互为镜像：它们选*相反*的丙烯面，而链在两者间交替，于是构型交替——**间规**聚丙烯。
- 非手性的 $C_{2v}$ 催化剂如 $\mathrm{Cp_2ZrCl_2}$ 无法区分两个面，给出**无规**聚合物（低温下微弱的链端控制除外）。
- 而 ansa-茂金属的 meso 异构体（$C_\mathrm{s}$，镜面包含两个位点）有两个相同但无选择性的位点，同样给出无规聚合物。

::: example 预言立构规整度 {#ex-tacticity}
预言下列催化剂所得聚丙烯的立构规整度：(a) *rac*-$\mathrm{[Me_2Si(2\text{-}methylindenyl)_2]ZrCl_2}$/MAO，(b) 其 *meso* 异构体，(c) $\mathrm{[Me_2C(Cp)(fluorenyl)]ZrCl_2}$/MAO。用位点对称性与链迁移解释。
::: solution
(a) *rac* 异构体是 $C_2$ 对称的：两个配位位点经 $C_2$ 轴互换了位置，因此手性完全相同。两者都偏好丙烯的同一对映面（使甲基远离茚基六元环的那个面）。每次插入后链移到另一个位点，但因为两个位点偏好相同，每个新立体中心构型相同：**等规**。
(b) *meso* 异构体有一个镜面，包含 Zr 并平分配体骨架，把两个茚基关联起来；每个位点都在镜面上、本身非手性，因而不区分丙烯的两个面：**无规**。
(c) 该 $C_\mathrm{s}$ 配合体的镜面从两个位点之间穿过，把二者互相反映：两个位点对映异位。一个偏好 *re* 面，另一个偏好 *si* 面。链迁移使催化剂交替使用两个位点，于是构型交替：**间规**。若偶尔发生一次*没有*位点交替的插入（链"回跳"），就出现一个立构错误——用 $^{13}\mathrm{C}$ NMR 五单元组分析计数的这类错误，正是链迁移机理的关键证据。
:::
:::

::: warning 立构规整度不是由单体决定的 {#warn-tacticity}
一种常见的误解是丙烯"想要"形成某一种立构规整度，或者等规聚合物只因更稳定才生成。聚合物的立构规整度是催化剂决定的**动力学**产物：每次插入时丙烯两个对映面各自过渡态之间的能量差决定构型（即[[organometallics-catalysis/hydrogenation-hydroformylation#prop-ee]]中柯廷-哈梅特式的论证，在每条链上重复几千遍）。把催化剂从 $C_2$ 换成 $C_\mathrm{s}$，同一单体就给出不同的聚合物；升高温度，每一步的选择性下降，立构规整度与熔点随之下降。
:::

::: quiz
某单活性中心茂金属催化剂给出 $Đ = 2.0$ 的聚乙烯；同一条件下多相齐格勒-纳塔催化剂给出 $Đ = 6$。最可能的解释是什么？
- [x] 多相催化剂有几类活性中心，其增长与转移的速率之比各不相同，每一类各自给出自己的 Schulz–Flory 分布。
- [ ] 茂金属是没有链转移的活性催化剂。
- [ ] 多相催化剂按自由基机理聚合。
- [ ] 茂金属反应中没有氢气。
::: solution
单一类活性中心加随机转移给出 Schulz–Flory 分布与 $Đ = 1 + p \approx 2$（[[#prop-flory]]）。几个具有不同 $X_\mathrm{n}$ 的分布叠加会使总分布变宽，所以 $Đ \gg 2$ 是多位点的诊断特征。活性催化剂的 $Đ$ 会接近 1 而不是 2；齐格勒-纳塔催化剂按插入而非自由基聚合；氢气改变 $X_\mathrm{n}$，但不改变单活性中心分布的形状。
:::
:::

## 后续内容

钌与钼的复分解催化剂见[[organic-synthesis/carbon-carbon-bonds]]与[[organic-synthesis/total-synthesis]]，RCM 在那里已成为闭合中、大环的标准方法。ROMP 与活性聚合在[[polymer-chemistry/controlled-polymerisation]]中进一步展开；链的微观结构、立构规整度与性能之间的联系见[[polymer-chemistry/polymer-structure]]与[[polymer-chemistry/polymer-properties]]。负载在 $\mathrm{MgCl_2}$ 与硅胶上的多相齐格勒-纳塔与 Phillips 铬催化剂属于[[organometallics-catalysis/heterogeneous-catalysis]]的表面化学，聚烯烃生产的工业规模见[[green-chemistry/petrochemicals]]。

::: history
Ziegler（Karl Ziegler）用 $\mathrm{TiCl_4/AlEt_3}$ 发现低压聚乙烯（1953）与 Natta（Giulio Natta）的等规聚丙烯（1954）为他们赢得了 1963 年诺贝尔化学奖；Hogan（J. Paul Hogan）与 Banks（Robert Banks）早在 1951 年就发现了 Phillips 的负载于硅胶的铬催化剂。Cossee（Piet Cossee）与 Arlman（Edward Arlman）于 1964 年提出插入机理。Sinn（Hansjörg Sinn）与 Kaminsky（Walter Kaminsky）于 1980 年发现 MAO 对茂金属的活化；Ewen（John Ewen，1984）以及 Kaminsky 与 Brintzinger（Hans Brintzinger，1985）用手性 ansa-茂金属制得等规聚丙烯，Ewen 又于 1988 年用 $C_\mathrm{s}$ 催化剂制得间规聚丙烯。复分解方面，Banks（Robert Banks）与 Bailey（Grant K. Bailey）在 Phillips 公司描述了丙烯的"烯烃歧化"（1964），Calderon（Nissim Calderon）于 1967 年造出"复分解"（metathesis）这个名字，Chauvin（Yves Chauvin）与 Hérisson（Jean-Louis Hérisson）于 1971 年提出金属卡宾机理。Schrock（Richard Schrock）的钼亚胺基烷基叉配合物（1990）与 Grubbs（Robert Grubbs）的钌催化剂（1992 年起；第一代催化剂 1995 年，带 NHC 的第二代 1999 年）使这一反应成为常规武器。Chauvin、Grubbs 与 Schrock 分享 2005 年诺贝尔化学奖。
:::

::: summary
- 烯烃复分解按 Chauvin 机理进行：金属烷基叉与烯烃经 [2+2] 环加成生成金属环丁烷，后者沿另一对键裂解，给出新的烯烃与烷基叉；每一步都可逆。
- Schrock 催化剂（Mo、W 亚胺基烷基叉）活性极高但敏感；Grubbs 催化剂（Ru）耐空气、水和极性基团，经膦解离引发。
- RCM 由放出乙烯驱动，在浓度低于有效摩尔浓度时占优（关环分数 $\mathrm{EM}/(\mathrm{EM} + c)$）；ROMP 由环张力驱动，受上限温度 $T_\mathrm{c} = \Delta H_\mathrm{p}^\circ/(\Delta S_\mathrm{p}^\circ + R\ln[\mathrm{M}]/c^\circ)$ 限制。
- 齐格勒-纳塔与茂金属催化剂按 Cossee–Arlman 机理增长链：烯烃在空位配位并顺式迁移插入；由 MAO 生成的 $[\mathrm{Cp_2ZrMe}]^+$（14 电子，$d^0$）是原典型的活性物种。
- $1/X_\mathrm{n} = (\text{转移速率之和})/(k_\mathrm{p}[\mathrm{M}])$；氢气经 σ键复分解降低摩尔质量。单活性中心催化剂给出 $Đ \approx 2$ 的 Schulz–Flory 分布；多活性中心催化剂的分布更宽；活性聚合给出 $Đ \approx 1 + 1/X_\mathrm{n}$。
- 催化剂对称性通过带链迁移的对映异位位点控制决定立构规整度：$C_2$ → 等规，$C_\mathrm{s}$（对映异位位点）→ 间规，非手性位点 → 无规。
:::

## 习题

::: exercise 数一数复分解催化剂 {level=1 check="14"}
膦解离后，第一代 Grubbs 催化剂给出 $\mathrm{[RuCl_2(PCy_3)(=CHPh)]}$。把苄叉基当作两电子 L 型（Fischer 型）配体，数出它的价电子数。（输入电子数。）
::: solution
Ru，$g = 8$；两个 Cl（X 型，2），$\mathrm{PCy_3}$（L 型，2），烷基叉按 L 配体计（2）：$\mathrm{VE} = 8 + 2 + 2 + 2 = 14$，在此形式体系下为 Ru(II)。14 电子物种结合一分子烯烃（16），随后生成金属环丁烷。（把烷基叉按 X₂ 处理则得 Ru(IV)，总数相同，也是 14。）
:::
:::

::: exercise 交叉复分解的产物 {level=1}
给出下列复分解反应的产物：(a) 只有丙烯；(b) 高稀释下的 2,2-二烯丙基丙二酸二乙酯 $\mathrm{(EtO_2C)_2C(CH_2CH{=}CH_2)_2}$；(c) 降冰片烯与 Grubbs 催化剂。
::: solution
(a) 乙烯与丁-2-烯（*E*/*Z* 混合物）：$2\,\mathrm{CH_3CH{=}CH_2 \rightleftharpoons CH_2{=}CH_2 + CH_3CH{=}CHCH_3}$——这就是 Phillips 最初的"三烯烃"反应。(b) 关环复分解生成环戊-3-烯-1,1-二甲酸二乙酯与乙烯。(c) ROMP 生成聚降冰片烯：聚(1,3-环戊烯撑-乙烯撑)，主链中环戊烷环由 C=C 键相连。
:::
:::

::: exercise 由转移速率求摩尔质量 {level=1 check="20000"}
某单活性中心催化剂的增长速率 $k_\mathrm{p}[\mathrm{M}] = 1.0\times10^{3}\ \mathrm{s^{-1}}$，只经 β-氢消除转移，速率 $0.050\ \mathrm{s^{-1}}$。$X_\mathrm{n}$ 是多少？（输入 $X_\mathrm{n}$。）
::: solution
$X_\mathrm{n} = 1.0\times10^{3}/0.050 = 2.0\times10^{4}$；对聚乙烯 $M_\mathrm{n} = 2.0\times10^{4} \times 28.05 = 5.6\times10^{5}\ \mathrm{g\,mol^{-1}}$。
:::
:::

::: exercise 有效摩尔浓度发挥作用 {level=2 check="0.53"}
某二烯经 RCM 关环，$\mathrm{EM} = 0.010\ \mathrm{mol\,dm^{-3}}$。要使至少 $95\,\%$ 的事件关环，反应浓度必须低于多少？（输入最大浓度，单位 $\mathrm{mmol\,dm^{-3}}$，保留两位有效数字。）
::: solution
由[[#prop-em]]，$\mathrm{EM}/(\mathrm{EM} + c) \ge 0.95$ 化为 $c \le \mathrm{EM}\,(1 - 0.95)/0.95 = \mathrm{EM}/19$。代入 $\mathrm{EM} = 0.010\ \mathrm{mol\,dm^{-3}}$，$c \le 5.3\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 0.53\ \mathrm{mmol\,dm^{-3}}$。这样的稀释度是大环合成的常态；把二烯缓慢加到催化剂溶液中，无需巨大的溶剂体积即可把瞬时浓度保持在低位。
:::
:::

::: exercise 单活性中心催化剂的分散度 {level=2 check="1.998"}
对 $X_\mathrm{n} = 500$ 的 Schulz–Flory 分布，精确计算分散度。（输入 $Đ$，保留四位有效数字。）
::: solution
$p = 1 - 1/X_\mathrm{n} = 0.998$，$Đ = 1 + p = 1.998$（[[#prop-flory]]）。长链时 $Đ \to 2$。
:::
:::

::: exercise 平衡单体与上限温度 {level=2 check="286"}
某环烯烃的 $\Delta H_\mathrm{p}^\circ = -20\ \mathrm{kJ\,mol^{-1}}$、$\Delta S_\mathrm{p}^\circ = -70\ \mathrm{J\,K^{-1}\,mol^{-1}}$。单体浓度为 $1.0\ \mathrm{mol\,dm^{-3}}$ 时它的上限温度是多少？（输入 $T_\mathrm{c}$，单位开尔文。）
::: solution
$T_\mathrm{c} = \Delta H_\mathrm{p}^\circ/\Delta S_\mathrm{p}^\circ = 20\,000/70 = 286\ \mathrm{K}$（见[[#ex-ceiling]]）；单体浓度更高（本体）时 $T_\mathrm{c}$ 上升，因为 $R\ln([\mathrm{M}]/c^\circ) > 0$ 使分母负得少一些。
:::
:::

::: exercise 推导含向铝转移的 Mayo 形式 {level=3}
齐格勒-纳塔聚合中，链也会向铝助催化剂转移：$\mathrm{M{-}P_n + AlR_3 \rightarrow M{-}R + R_2Al{-}P_n}$，每条链的速率为 $k_\mathrm{Al}[\mathrm{AlR_3}]$。(a) 把这一项加进[[#eq-mayo]]，说明固定单体浓度下 $1/X_\mathrm{n}$ 如何随 $[\mathrm{AlR_3}]$ 变化。(b) 如何利用 $1/X_\mathrm{n}$ 对 $[\mathrm{AlR_3}]$ 的图测定 $k_\mathrm{Al}/k_\mathrm{p}$？(c) 若向铝的链转移快且可逆（链在生长期间在 Al 与金属之间来回交换许多次），聚合物可以远窄于 Schulz–Flory 分布。定性解释。
::: hint
对 (c)，想一想：当链在休眠态（与铝结合）与活性态（与金属结合）之间快速交换时，是否每条链都获得了相同的生长机会。
:::
::: solution
(a) 把新的转移项加进分子：
$$
\frac{1}{X_\mathrm{n}} = \frac{k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^a + k_\mathrm{Al}[\mathrm{AlR_3}]}{k_\mathrm{p}[\mathrm{M}]},
$$
所以在固定 $[\mathrm{M}]$ 与 $[\mathrm{H_2}]$ 时，$1/X_\mathrm{n}$ 对 $[\mathrm{AlR_3}]$ 呈线性，斜率为 $k_\mathrm{Al}/(k_\mathrm{p}[\mathrm{M}])$。
(b) 在几个铝浓度下测定 $X_\mathrm{n}$（用尺寸排阻色谱或端基 NMR），作 $1/X_\mathrm{n}$ 对 $[\mathrm{AlR_3}]$ 图；斜率乘以 $[\mathrm{M}]$ 即得 $k_\mathrm{Al}/k_\mathrm{p}$，截距给出其他转移贡献。
(c) 若链在过渡金属（链在此生长）与铝（链在此休眠）之间的交换快于整个聚合时间，每条链平均就有相同比例的时间待在活性金属上，从而以相同的平均速率加单体；链不是被"终止"，只是被暂时搁置。于是所有链几乎同时开始、平行生长，如同活性聚合，分布向类泊松（$Đ$ 趋近 1）收窄。这就是**配位链转移聚合**的原理，也是两种催化剂之间"链穿梭"制备烯烃嵌段共聚物的原理。反之，向铝的不可逆转移只是终止链，使 $Đ \approx 2$ 不变。
:::
:::

::: exercise 一个复分解机理问题 {level=3}
将 Grubbs 催化剂 $\mathrm{[Ru]{=}CHPh}$ 与 (*Z*)-环辛烯及少量 (*Z*)-己-3-烯混合。(a) 逐步描述第一次开环事件如何发生，之后的链端是什么样子。(b) 己-3-烯起什么作用？它的用量如何控制摩尔质量？(c) 反应时间很长时，聚合物中含有大环低聚物，主链 C=C 键大部分变为 (*E*)。解释这两个现象。
::: solution
(a) 14 电子烷基叉（失去膦后）结合环辛烯；[2+2] 环加成生成与八元环并合的钌杂环丁烷；沿另一条对角线环逆裂解使环打开，生成新烷基叉 $\mathrm{[Ru]{=}CH(CH_2)_6CH{=}CHPh}$：链的一端带着钌烷基叉，另一端被原来的苄叉基封顶。之后每插入一分子环辛烯，就把八个碳和一个 C=C 键加进生长链，由环张力的释放驱动。
(b) 己-3-烯是**链转移剂**。生长烷基叉与己-3-烯的交叉复分解用 $\mathrm{CHCH_2CH_3}$（亚丙叉基）端基封住旧链，并生成新的 $\mathrm{[Ru]{=}CHCH_2CH_3}$ 开始一条新链。由于各步都可逆，系统趋于一个平衡，其中链的数目由链转移剂分子的数目决定；平均聚合度约等于环辛烯单元数与己-3-烯分子数之比。转移剂越多，链越短。
(c) 复分解可逆，链端的活性烷基叉也能与*自身*主链中的 C=C 键反应（"回咬"），切出一个大环——即[[#prop-em]]的环-链平衡，留下一个环状低聚物的群体。主链 C=C 键同样被二次复分解交换；既然每次交换都可能以任意几何重新成键，构型便趋近热力学平衡，张力较小的 (*E*) 双键占多数。两个现象都说明反应已从动力学控制转入热力学控制。
:::
:::
