有机化学只有少数几种基元步骤——亲核进攻、离去基团离去、质子转移、周环重排——任何机理都由它们拼装而成。金属有机化学自有一份自己的短清单，而且比你可能担心的还要短。本课程中几乎每一个催化循环——从烯烃加氢、乙烯聚合到两个芳环的偶联——都只是五类步骤的序列：**配体取代**、**氧化加成**、**还原消除**、**迁移插入**与**消除**（尤其是 β-氢消除），外加第六种——**σ键复分解**——在金属没有 $d$ 电子可给出时取而代之。

本章为每一步下定义，说明它对本课程在[[organometallics-catalysis/organometallic-bonding#def-counts]]中定义的电子数、氧化态与配位数做了什么，用文字描述其机理，并展示揭示到底由哪种机理运行的实验手段——动力学、活化参数、同位素标记、立体化学。所涉配体见[[organometallics-catalysis/ligands-complexes]]；动力学工具（稳态、前置平衡、Eyring 分析）见[[kinetics/reaction-mechanisms]]与[[kinetics/transition-state-theory]]；经典 Werner 配合物的取代机理见[[coordination-chemistry/inorganic-mechanisms]]。

## 基元步骤的计数

每个基元步骤都以特征方式改变金属周围的配体集 $\mathrm{L_\ell X_x}$，因此计数公式可以预言各个计数如何变化。

::: proposition 基元步骤如何改变各计数 {#prop-step-counts}
由 $\mathrm{VE} = g + 2\ell + x - q$、$\mathrm{OS} = x + q$ 与 $\mathrm{CN} = \ell + x$（[[organometallics-catalysis/organometallic-bonding#def-counts]]），各基元步骤对计数的改变如下：

| 步骤 | 配体变化 | ΔVE | ΔOS | ΔCN |
|---|---|---|---|---|
| L 的缔合 / L 的解离 | $\ell \to \ell \pm 1$ | $\pm 2$ | $0$ | $\pm 1$ |
| A–B 的氧化加成 / 还原消除 | $x \to x \pm 2$ | $\pm 2$ | $\pm 2$ | $\pm 2$ |
| 1,1-或 1,2-迁移插入 / 其逆（消除） | $\ell \to \ell \mp 1$ | $\mp 2$ | $0$ | $\mp 1$ |
| σ键复分解 | $x$ 不变 | $0$ | $0$ | $0$ |

这里"插入"把一个 L 配体（CO、烯烃）与一个 X 配体（H、烷基）合并为一个 X 配体（酰基、烷基）；其逆——脱插入，即 β-氢消除——把一个 X 拆成一个 L 加一个 X。
:::

::: proof
每一行都由把 $\ell$ 与 $x$ 的改变代入三个公式得出，$q$ 固定（表中没有步骤改变总电荷）。
**L 的缔合：**$\Delta\ell = +1$，$\Delta x = 0$，故 $\Delta\mathrm{VE} = 2$、$\Delta\mathrm{OS} = 0$、$\Delta\mathrm{CN} = 1$。
**A–B 的氧化加成：**A–B 键断裂，A 与 B 都成为金属的 X 配体，$\Delta x = +2$：$\Delta\mathrm{VE} = 2$、$\Delta\mathrm{OS} = 2$、$\Delta\mathrm{CN} = 2$。（若 A–B 是 $\mathrm{H_2}$，[[organometallics-catalysis/ligands-complexes]]中的二氢配合物就是两者之间 L 配位的中间体：先缔合，再对已配位的配体做氧化加成。）
**迁移插入**，例如 $\mathrm{M(CH_3)(CO)} \rightarrow \mathrm{M\{C(O)CH_3\}}$：一个 L（CO）与一个 X（$\mathrm{CH_3}$）变成一个 X（酰基）。于是 $\Delta\ell = -1$、$\Delta x = 0$，得 $\Delta\mathrm{VE} = -2$、$\Delta\mathrm{OS} = 0$、$\Delta\mathrm{CN} = -1$。烯烃对 M–H 的插入同理（烯烃 L + 氢化物 X → 烷基 X）。
**σ键复分解**，$\mathrm{M{-}R + H{-}R' \rightarrow M{-}R' + H{-}R}$：一个 X 换成另一个 X，其余一切不变。$\blacksquare$
:::

遇到任何提议的机理，首先要查的就是这张表。18 电子配合物不能直接发生氧化加成（那会变成 20 电子）——它必须先失去一个配体。$d^0$ 配合物根本不能发生氧化加成，因为那需要一个比族数所允许还高二个单位的氧化态；这就是早期金属与镧系烷基化物改按 σ键复分解反应的原因。而迁移插入*产生*一个空位，循环要继续必须先把它填满。

::: example 三步之间的计数 {#ex-count-steps}
Vaska 配合物 $\mathrm{[IrCl(CO)(PPh_3)_2]}$ 与碘甲烷加成，给出 $\mathrm{[IrCl(I)(CH_3)(CO)(PPh_3)_2]}$。在 CO 压力下，甲基随后可迁移到一个羰基上生成酰基配合物。给出各阶段的计数。
::: solution
**起始：**$\mathrm{VE} = 9 + 2(3) + 1 = 16$，Ir(I)，$d^8$，CN 4（平面正方形）。
**$\mathrm{CH_3{-}I}$ 氧化加成后：**两个新的 X 配体（$\mathrm{CH_3}$、I）：$\mathrm{VE} = 9 + 6 + 3 = 18$，Ir(III)，$d^6$，CN 6（八面体）。三个计数各增 2，正如[[#prop-step-counts]]所预言。
**甲基迁移到 CO 后：**$\mathrm{CH_3}$（X）与 CO（L）变成乙酰基（X）：$\mathrm{VE} = 9 + 4 + 3 = 16$，仍是 Ir(III)，CN 5——一个空位打开了。**再结合外加的 CO 后：**$\mathrm{VE} = 18$，CN 6。氧化加成 → 迁移插入 → 配体配位这一序列，正是铱催化（Cativa）与铑催化（Monsanto）甲醇羰基化制乙酸的核心。
:::
:::

## 配体取代

18 电子配合物以**解离**方式取代：一个配体离去，给出 16 电子中间体，中间体再俘获进入的配体。16 电子配合物——通常是平面正方形 $d^8$——以**缔合**方式取代，进入的配体利用空的 $p_z$ 轨道（[[organometallics-catalysis/organometallic-bonding#prop-16-18]]）形成 18 电子五配位中间体。这就是 Tolman 16/18 规则的动力学表述：不存在 20 电子中间体。

::: proposition 解离取代的速率方程 {#prop-dissociative}
对机理
$$
\mathrm{ML_nL'} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ML_n} + \mathrm{L'}, \qquad \mathrm{ML_n} + \mathrm{L''} \xrightarrow{\;k_2\;} \mathrm{ML_nL''},
$$
16 电子中间体 $\mathrm{ML_n}$ 处于稳态，则 L′ 被 L″ 取代的速率为 $v = k_\text{obs}[\mathrm{ML_nL'}]$，其中
$$
k_\text{obs} = \frac{k_1 k_2[\mathrm{L''}]}{k_{-1}[\mathrm{L'}] + k_2[\mathrm{L''}]} = \frac{k_1}{1 + \dfrac{k_{-1}[\mathrm{L'}]}{k_2[\mathrm{L''}]}}.
$$ {#eq-dissociative}
$[\mathrm{L''}]$ 高或无自由 L′ 时，$k_\text{obs} \rightarrow k_1$：对配合物为一级，对进入配体为**零级**。加入 L′ **阻滞**反应，且 $1/k_\text{obs}$ 对 $[\mathrm{L'}]/[\mathrm{L''}]$ 作图为直线，截距 $1/k_1$，斜率 $k_{-1}/(k_1k_2)$。
:::

::: proof
对中间体的稳态条件是
$$
\frac{\mathrm{d}[\mathrm{ML_n}]}{\mathrm{d}t} = k_1[\mathrm{ML_nL'}] - k_{-1}[\mathrm{ML_n}][\mathrm{L'}] - k_2[\mathrm{ML_n}][\mathrm{L''}] \approx 0,
$$
于是 $[\mathrm{ML_n}] = k_1[\mathrm{ML_nL'}]/(k_{-1}[\mathrm{L'}] + k_2[\mathrm{L''}])$。产物以速率 $k_2[\mathrm{ML_n}][\mathrm{L''}]$ 生成，代入即得[[#eq-dissociative]]。取倒数，
$$
\frac{1}{k_\text{obs}} = \frac{1}{k_1} + \frac{k_{-1}}{k_1k_2}\cdot\frac{[\mathrm{L'}]}{[\mathrm{L''}]},
$$
即线性形式。稳态近似的合理性在于 16 电子中间体极为活泼（$k_{-1}$ 与 $k_2$ 都很大），其浓度始终极小。$\blacksquare$
:::

::: widget plot
f: 1/(1 + r*x); 1/(1 + 0.2*x)
x: 0, 5
y: 0, 1
sliders: r=5:0.5:20:0.5
labels: k_\text{obs}/k_1,\ k_{-1}/k_2 = r; k_\text{obs}/k_1,\ k_{-1}/k_2 = 0.2
caption: 离去配体对解离取代的阻滞，[[#eq-dissociative]]：$k_\text{obs}/k_1$ 对自由离去配体与进入配体浓度之比 $[\mathrm{L'}]/[\mathrm{L''}]$。当中间体强烈倾向重新俘获 L′（$r = k_{-1}/k_2$ 大，滑块）时，加入一点 L′ 就严重拖慢反应；当它不加挑选（$r = 0.2$）时，加入 L′ 几乎无妨。催化化学家恰是在利用这一效应：游离三苯基膦会减慢 Wilkinson 加氢与铑催化氢甲酰化，因为它们的活性物种都由失去膦生成。
:::

::: example 膦的阻滞 {#ex-retardation}
$\mathrm{[Ni(CO)_3(PPh_3)]}$ 经解离机理以 $\mathrm{P(OEt)_3}$ 交换 $\mathrm{PPh_3}$，实验温度下 $k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$（示例值），且等浓度下中间体 $\mathrm{Ni(CO)_3}$ 重新俘获 $\mathrm{PPh_3}$ 的速率是俘获 $\mathrm{P(OEt)_3}$ 的五倍（$k_{-1}/k_2 = 5$）。设 $[\mathrm{P(OEt)_3}] = 0.10\ \mathrm{mol\,dm^{-3}}$，求 (a) 不加 $\mathrm{PPh_3}$ 与 (b) 加入 $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{PPh_3}$ 时的 $k_\text{obs}$ 与半衰期。
::: solution
(a) 无游离 $\mathrm{PPh_3}$ 时（早期），$k_\text{obs} = k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$，$t_{1/2} = \ln 2/k_\text{obs} = 693\ \mathrm{s}$。

(b) $[\mathrm{L'}]/[\mathrm{L''}] = 0.050/0.10 = 0.50$，由[[#eq-dissociative]]
$$
k_\text{obs} = \frac{1.0\times10^{-3}}{1 + 5 \times 0.50} = \frac{1.0\times10^{-3}}{3.5} = 2.9\times10^{-4}\ \mathrm{s^{-1}}, \qquad t_{1/2} = \frac{0.693}{2.86\times10^{-4}} = 2.4\times10^{3}\ \mathrm{s}.
$$
加入离去配体的半个当量，反应慢了三倍半。严格的缔合机理不会显示这种阻滞，而且对进入配体应为一级——这就是区分两者的办法。
:::
:::

活化参数从另一个角度说明同一个故事。解离步骤断一个键并放出一个分子：$\Delta H^\ddagger$ 很大（大致就是金属-配体键焓），且 $\Delta S^\ddagger$ 为**正**。缔合步骤成一个键并把两个分子并成一个：$\Delta H^\ddagger$ 较小，$\Delta S^\ddagger$ 为**负**，常常很负。Eyring 方程（[[kinetics/transition-state-theory]]），
$$
\ln\frac{k}{T} = \ln\frac{k_\mathrm{B}}{h} + \frac{\Delta S^\ddagger}{R} - \frac{\Delta H^\ddagger}{RT}, \qquad \ln\frac{k_\mathrm{B}}{h} = 23.760 \ \ (k_\mathrm{B}/h\ \text{以 }\mathrm{K^{-1}\,s^{-1}}\text{计}),
$$ {#eq-eyring}
由两个以上温度的速率常数把两者提取出来。

::: example 活化参数与机理 {#ex-eyring}
某 18 电子羰基配合物的 CO 取代为一级速率常数，$298.15\ \mathrm{K}$ 下 $k = 1.0\times10^{-4}\ \mathrm{s^{-1}}$，$318.15\ \mathrm{K}$ 下 $1.5\times10^{-3}\ \mathrm{s^{-1}}$，与进入配体无关。求 $\Delta H^\ddagger$ 与 $\Delta S^\ddagger$ 并评论。
::: solution
两个温度的[[#eq-eyring]]相减消去 $\Delta S^\ddagger$：
$$
\Delta H^\ddagger = \frac{R\,\ln\!\big[(k_2/T_2)/(k_1/T_1)\big]}{1/T_1 - 1/T_2} = \frac{8.314 \times \ln\!\big[(1.5\times10^{-3}/318.15)/(1.0\times10^{-4}/298.15)\big]}{(3.3540 - 3.1432)\times10^{-3}} = 104\ \mathrm{kJ\,mol^{-1}}.
$$
然后由 $298.15\ \mathrm{K}$ 的点，
$$
\Delta S^\ddagger = R\left[\ln\frac{k_1}{T_1} - 23.760\right] + \frac{\Delta H^\ddagger}{T_1} = 8.314\,(-14.908 - 23.760) + \frac{104\,220}{298.15} = +28\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
大的活化焓（与 M–CO 键焓相当）与正的活化熵，加上对进入配体为零级，都指向决速的 **CO 解离**。（这些数值带着两点法测定的不确定度；实际工作要用五个以上的温度。）
:::
:::

::: widget plot
f: 23.76 + s/8.314 - h*x/8.314; 23.76 - 194/8.314 - 24.8*x/8.314
x: 2.8, 3.6
y: -25, 0
sliders: h=104:40:160:1; s=28:-200:100:2
labels: \text{可调：} \Delta H^\ddagger = h,\ \Delta S^\ddagger = s; \text{缔合型氧化加成： } 24.8\ \mathrm{kJ\,mol^{-1}},\ -194\ \mathrm{J\,K^{-1}\,mol^{-1}}
caption: Eyring 图，$\ln(k/T)$ 对 $10^3\,\mathrm{K}/T$，由[[#eq-eyring]]而来。斜率为 $-\Delta H^\ddagger/R$，$1/T = 0$ 处截距为 $23.76 + \Delta S^\ddagger/R$。可调直线始于[[#ex-eyring]]的解离型 CO 取代（$h = 104\ \mathrm{kJ\,mol^{-1}}$，$s = +28\ \mathrm{J\,K^{-1}\,mol^{-1}}$）；固定直线是习题中 $\mathrm{S_N2}$ 型氧化加成（$24.8\ \mathrm{kJ\,mol^{-1}}$，$-194\ \mathrm{J\,K^{-1}\,mol^{-1}}$）。两个反应在室温附近速率可以相近而机理完全不同：陡峭的直线配上高截距，意味着断键与获得自由；平缓的直线配上低截距，意味着成键与秩序的建立。只有温度依赖性把它们分开。
:::

18 电子配合物的取代也可以是*缔合*的，只要某个配体能够改变自身的电子数以腾出空间。直线型亚硝酰会弯曲（从三电子变一电子，[[organometallics-catalysis/organometallic-bonding]]）；η⁵-环戊二烯基尤其是 η⁵-茚基配体会滑移为 η³。**茚基效应**十分显著：Rerek（Mark Rerek）与 Basolo（Fred Basolo）发现（1983–84 年），$\mathrm{[Rh(\eta^5\text{-}C_9H_7)(CO)_2]}$ 的 CO 缔合取代比 $\mathrm{[Rh(\eta^5\text{-}C_5H_5)(CO)_2]}$ 快约 $10^{8}$ 倍，因为环滑移为 η³ 恢复了苯环的芳香性，并使过渡态保持在 18 电子。

## 氧化加成与还原消除

::: definition 氧化加成与还原消除 {#def-oa-re}
**氧化加成**（OA）指分子 A–B 加到金属中心上，伴随 A–B 键断裂与两个新键 M–A、M–B 的形成：$\mathrm{L_nM + A{-}B \rightarrow L_nM(A)(B)}$。金属的氧化态、电子数与配位数各增二（[[#prop-step-counts]]），所以氧化加成要求金属有一个空位（或能造出一个），有两富余的 $d$ 电子，且氧化态能升高两个单位（Rh(I)→Rh(III)、Pd(0)→Pd(II)、Ir(I)→Ir(III)）。**还原消除**（RE）是其逆过程：两个顺式 X 配体偶联，A–B 键形成并离去，三个计数各减二。氧化加成的典型底物有 $\mathrm{H_2}$、$\mathrm{C{-}X}$（烷基与芳基卤化物、三氟甲磺酸酯）、Si–H、B–H、H–X，金属足够活泼时还可以是 C–H 甚至 C–C 键。
:::

氧化加成遵循三种主要机理，它们给出不同的立体化学，对溶剂与取代基的响应也不同。

1. **协同（三中心）。**非极性底物——$\mathrm{H_2}$、C–H、Si–H，以及 Pd(0) 对芳基卤化物——先以 σ配合物形式侧向配位，随后金属向 A–B 的 $\sigma^*$ 轨道反馈，同时 A–B 的成键电子对向金属的空轨道给予；A–B 键被拉长、拉断，两个 M–A、M–B 键*同时*形成，经过一个三角形过渡态。因此两个新配体最终处于**顺式**。Vaska 配合物就以这种方式加 $\mathrm{H_2}$，给出*顺*式二氢化物；Kubas 的二氢配合物正是第一阶段的快照。
2. **$\mathrm{S_N2}$ 型。**带良好离去基团的极性底物，如碘甲烷与溴化苄，与亲核性金属的反应就像碳上的 $\mathrm{S_N2}$ 取代：充满的金属 $d_{z^2}$ 轨道（实际上是一对孤对电子）从背面进攻碳，使其构型翻转；碘离子作为阴离子离去，生成阳离子中间体 $\mathrm{[L_nM{-}CH_3]^+\,I^-}$；随后碘离子再结合到金属上，常位于甲基的 *trans* 位。反应为二级（每个反应物各一级），强极性溶剂使其大大加速，$\Delta S^\ddagger$ 为大负值（高度有序、电荷分离的过渡态），且在手性碳上伴随**翻转**。
3. **自由基。**某些烷基卤化物经卤原子攫取或单电子转移反应，生成自由的烷基自由基，后者与金属复合；这类反应使立体中心外消旋化，并被自由基捕获剂抑制。

热力学取决于成键与断键。对二氢，当两倍 M–H 键焓超过 H–H 键焓 $436\ \mathrm{kJ\,mol^{-1}}$ 时氧化加成有利。由于 5d 金属的 M–H、M–C 键强于 3d，富电子、低价金属配以良好给电子配体时也更强，氧化加成沿族向下更有利（Ir > Rh > Co），膦比羰基有利，降低金属的正电荷有利。

::: example $\mathrm{H_2}$ 的氧化加成是下坡的吗？ {#ex-oa-thermo}
设每个 M–H 键焓为 $250\ \mathrm{kJ\,mol^{-1}}$，估算 $298\ \mathrm{K}$ 下溶液中 $\mathrm{L_nM + H_2(g) \rightarrow L_nMH_2}$ 的 $\Delta_\mathrm{r}H$ 与 $\Delta_\mathrm{r}G$。取 $D(\mathrm{H{-}H}) = 436\ \mathrm{kJ\,mol^{-1}}$，并设熵变以气态 $\mathrm{H_2}$ 的损失为主，$\Delta_\mathrm{r}S \approx -S^\circ_\mathrm{m}(\mathrm{H_2, g}) = -130.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$（NIST 标准摩尔熵）。
::: solution
$\Delta_\mathrm{r}H \approx D(\mathrm{H{-}H}) - 2D(\mathrm{M{-}H}) = 436 - 500 = -64\ \mathrm{kJ\,mol^{-1}}$，且
$$
\Delta_\mathrm{r}G \approx -64\ \mathrm{kJ\,mol^{-1}} - (298.15\ \mathrm{K})(-0.1307\ \mathrm{kJ\,K^{-1}\,mol^{-1}}) = -64 + 39 = -25\ \mathrm{kJ\,mol^{-1}}.
$$
加成是下坡的，但坡度不大：若 M–H 键为 $230\ \mathrm{kJ\,mol^{-1}}$，吉布斯自由能上就几乎热中性。这就是为什么对许多催化剂 $\mathrm{H_2}$ 的氧化加成是可逆的（周转的要求——太稳定的氢化物永远不会转移它的氢），也是为什么加热放大了 $-T\Delta S$ 项、会把 $\mathrm{H_2}$ 赶走。
:::
:::

**还原消除**是几乎每个催化循环放出产物的成键步骤。它要求两个基团处于*顺*式，受高氧化态与缺电子金属的促进（Pd(IV) > Pd(II)；Pt(IV) 容易发生消除），受庞大配体的促进（在拥挤较小的产物中缓解自身张力），也受螯合双膦宽齿合角的促进（把两个基团挤到一起）。其速率取决于基团：C–H 与 H–H 消除很快，C(芳基)–C(芳基) 与 C–N 在 Pd(II) 上中等快，而 C(sp³)–C(sp³) 很慢，因为方向性强的 $sp^3$ 轨道必须转离金属才能与伙伴重叠，而 $sp^2$ 碳与氢在过渡态中能同时与两个原子成键。C–H 消除如此有利，以至于其逆过程——**C–H 活化**，即烷烃 C–H 键的氧化加成——直到 1982 年才由 Bergman（Robert Bergman）课题组用光解产生的 $\mathrm{Cp^*Ir(PMe_3)}$、以及 Graham（William Graham）课题组用 $\mathrm{Cp^*Ir(CO)}$ 首次观察到。

::: warning 微观可逆性与"同一机理的逆过程" {#warn-reversibility}
由于氧化加成与还原消除互为逆反应，对其中一种所了解的一切都适用于*同一路径*上的另一种：过渡态是同一个，所以给出顺式产物的协同氧化加成，对应于需要顺式反应物的协同还原消除。然而，认为按 $\mathrm{S_N2}$ 路径发生氧化加成的配合物其还原消除必沿该路径之逆进行，或认为在不同配合物中观察到的氧化加成与还原消除互相关联，都是错误的。微观可逆性联系的是同一反应在相同条件下的正逆步骤；它对另一个配合物会选哪条路径一无所知。在催化循环中，氧化加成与还原消除通常发生在不同阶段、配上不同配体——交叉偶联中的还原消除并不是其氧化加成的逆。
:::

## 迁移插入及其逆反应

::: definition 迁移插入 {#def-insertion}
**迁移插入**指与 X 配体（H、烷基、芳基）处于顺式的不饱和配体插入 M–X 键。在 **1,1-插入**中，两个新键都接到不饱和配体的同一个原子上：CO 与异腈以这种方式插入，$\mathrm{M(R)(CO) \rightarrow M{-}C(O)R}$。在 **1,2-插入**中，X 基团落到一个原子上、金属落在下一个原子上：烯烃与炔烃以这种方式插入，$\mathrm{M(H)(CH_2{=}CH_2) \rightarrow M{-}CH_2CH_3}$。两个基团必须**顺式**，步骤是**分子内**的，金属氧化态不变，并产生一个空位（[[#prop-step-counts]]）。1,2-插入中，金属与迁移基团加到烯烃的同一面（**顺式**加成），经过四中心过渡态 $\mathrm{M{\cdots}C{\cdots}C{\cdots}X}$。
:::

"迁移"这个名字记录了一个由同位素标记确立的机理事实：多数情形下是烷基*迁移*到羰基碳上，而不是羰基插入 M–C 键。经典证明由 Noack（Keith Noack）与 Calderazzo（Fausto Calderazzo）于 1967 年对 $\mathrm{[Mn(CH_3)(CO)_5]}$ 给出，是一段漂亮的推理。

::: example 谁在迁移？标记实验 {#ex-noack}
酰基配合物 *cis*-$\mathrm{[Mn\{C(O)CH_3\}(CO)_4(^{13}CO)]}$ 的 $^{13}\mathrm{CO}$ 标记位于乙酰基的顺位，将其脱羰基（插入的逆反应）得到 $\mathrm{[Mn(CH_3)(CO)_5]}$。预言产物中标记的分布：(a) 若逆反应是甲基迁移（甲基从酰基碳移到一个空位，酰基的 CO 留在原地）；(b) 若逆反应是 CO 迁移（酰基 CO 移入空位，甲基留在酰基原来所在的位置）。设空位由四个与酰基顺位的 CO 配体中任意一个等概率离去而产生。
::: solution
把酰基放在 $+z$ 轴上。四个顺式羰基位于 $\pm x$ 与 $\pm y$；标记在 $+x$；反位羰基在 $-z$。

**步骤 1（两种机理相同）：**一个顺式 CO 解离；四个各以概率 $\tfrac14$ 离去。若 $+x$ 的标记 CO 离去（概率 $\tfrac14$），无论其后发生什么，产物都**无标记**。

**(a) 甲基迁移（逆反应）：**甲基从酰基碳移入空位，把它的 CO 留在 $+z$。
- 空位在 $-x$（概率 $\tfrac14$）：甲基在 $-x$，标记在 $+x$——标记位于甲基***反位***；
- 空位在 $+y$ 或 $-y$（概率 $\tfrac12$）：甲基在 $\pm y$，标记在 $+x$——标记位于甲基***顺位***。

分布：$25\,\%$ 无标记、$50\,\%$ *顺*、$25\,\%$ *反*——顺：反 = **2 : 1**。

**(b) CO 迁移（逆反应）：**酰基 CO 移入空位，甲基留在 $+z$。于是 $+x$ 的标记总是与 $+z$ 顺式：$25\,\%$ 无标记、$75\,\%$ *顺*，**无反位**。

Noack 与 Calderazzo 找到的正是反位标记的产物，顺：反 ≈ 2 : 1，与 (a) 的预言一致。由微观可逆性，正向插入也是甲基迁移。红外光谱区分了异构体：*顺*、*反*-$\mathrm{[Mn(CH_3)(CO)_4(^{13}CO)]}$ 的 $^{13}\mathrm{CO}$ 吸收带位于不同波数（[[organometallics-catalysis/ligands-complexes#ex-isotope]]）。
:::
:::

CO 的迁移插入受结合酰基氧的路易斯酸、庞大配体以及金属单电子氧化的促进——后者使羰基碳更亲电、M–C 键更不稳定。烯烃对 M–H 的插入通常快且可逆；烯烃对 M–C 的插入是聚合的链增长步骤（[[organometallics-catalysis/metathesis-polymerisation]]）。1,2-插入对 M–H 的逆反应是过渡金属烷基化物最重要的分解反应。

## β-氢消除与其他消除

::: definition β-氢消除 {#def-beta-h}
**β-氢消除**指与金属 β 位（相隔两个键）的碳上的氢转移到金属上，烷基变成配位烯烃：$\mathrm{L_nM{-}CH_2CH_2R \rightarrow L_nM(H)(CH_2{=}CHR)}$。它是烯烃对 M–H 的 1,2-插入的逆。它要求 (i) 一个 **β-氢**，(ii) 与烷基**顺式的空位**（金属必须能再接受一个配体：不超过 16 电子，才可能 ΔVE = +2），(iii) 一个使 M–C–C–H 片段**顺式共平面**的构象，让 β 的 C–H 键得以接近金属。步骤是顺式的：金属与氢从正在生成的烯烃的同一面离开。
:::

这些条件解释了[[organometallics-catalysis/organometallic-bonding]]中烷基化物"稳定性"之谜。没有 β-H 的烷基（甲基、新戊基、苄基、$\mathrm{CH_2SiMe_3}$）无法消除；没有易离去配体的 18 电子烷基无法提供空位；铂杂环戊烷这类金属杂环无法达到顺式共平面，分解比其开链类似物慢约 $10^4$ 倍（Whitesides（George Whitesides）课题组 1970 年代的工作）；桥头碳上的 β-氢（降冰片基）消除将生成桥头烯烃，张力太大。

β-氢消除并不总是麻烦。它是 Heck 反应（[[organometallics-catalysis/cross-coupling]]）的成产物步骤，也是控制聚乙烯摩尔质量的链转移步骤。与再插入结合，它让金属氢化物沿链"行走"，使烯烃异构：1-己烯被许多氢化物催化剂转化为内位己烯的平衡混合物。相关的消除可移去**α**-氢（从烷基得到烷基叉，对高价早期金属很常见，是通往 Schrock 卡宾的路径），或移去一个 β-烷基、β-烷氧基。

::: example 预言 β-氢消除的产物 {#ex-beta-h}
$\mathrm{Pd{-}Ph}$ 对（*E*)-1-苯基丙烯顺式加成生成的钯(II)烷基为 $\mathrm{L_nPd{-}CH(CH_3){-}CHPh_2}$，带一个顺式空位。哪些 β-氢可用？生成哪个烯烃？
::: solution
与 Pd 相连的碳（Cα）带一个甲基与一个 $\mathrm{CHPh_2}$ 基。β-氢在甲基碳上（三个）与 $\mathrm{CHPh_2}$ 碳上（一个）。从甲基消除给出末端烯烃 $\mathrm{CH_2{=}CH{-}CHPh_2}$（3,3-二苯基丙烯）；从 $\mathrm{CHPh_2}$ 消除给出共轭的三取代烯烃 $\mathrm{CH_3CH{=}CPh_2}$（1,1-二苯基丙烯）。苄位 C–H 必须旋转到与 Pd–C 顺式共平面，且产物与两个苯环共轭；共轭烯烃通常是主产物，但由于 β-氢消除可逆，混合物与异构化很常见。Heck 反应的立体化学由顺式插入接顺式消除决定，有选择余地时通常给出（*E*)-烯烃。
:::
:::

## σ键复分解

对 $d^0$ 金属——Sc(III)、Ti(IV)、Zr(IV)、镧系、Ta(V)——氧化加成不可能，但这类配合物却能迅速断裂 H–H 甚至 C–H 键。它们通过 **σ键复分解**做到这一点：四中心过渡态 $[\mathrm{M{\cdots}R{\cdots}H{\cdots}R'}]$ 中 M–R 与 H–R′ 键断裂、M–R′ 与 R–H 键形成，一步之内完成，氧化态不变。1983 年 Watson（Patricia Watson）证明 $\mathrm{[Cp^*_2Lu(CH_3)]}$ 在溶液中与 $^{13}\mathrm{CH_4}$ 交换甲基——这是氧化态不变、条件温和的甲烷反应。σ键复分解是茂金属聚合中氢气控制摩尔质量的链转移步骤：$\mathrm{M{-}polymer + H_2 \rightarrow M{-}H + H{-}polymer}$。

::: quiz
某手性仲烷基溴化物（碳为 *R* 构型）与富电子、亲核性 Pd(0) 配合物在极性溶剂中反应；烷基钯(II)产物在碳上为 *S* 构型（优先顺序未变）。速率对每个反应物各一级，且不受自由基捕获剂影响。哪种氧化加成机理最吻合？
- [x] $\mathrm{S_N2}$ 型，金属从背面进攻碳
- [ ] 协同三中心加成
- [ ] 经卤原子攫取的自由基链
- [ ] σ键复分解
::: solution
构型翻转、二级动力学、极性溶剂、对自由基捕获剂不敏感，是 $\mathrm{S_N2}$ 型氧化加成的指纹。协同三中心加成会保留碳的构型；自由基机理会使其外消旋化并被捕获剂抑制；σ键复分解不改变氧化态，对富电子 Pd(0) 也不适用。
:::
:::

## 对配位配体的进攻

最后一类步骤在金属本身毫无变化，变的只是它握着的东西：外部亲核或亲电试剂进攻配位的配体。亲核试剂从与金属*相反*的一面进攻结合在缺电子 Pd(II) 上的烯烃（**反式**加成，外层）——这是 Wacker 法的关键步骤——而迁移插入把基团从金属一侧递送（**顺式**，内层）。$\mathrm{Cr(CO)_3}$ 配合物中配位的芳烃、$\mathrm{Fe(CO)_3}$ 阳离子中的二烯以及钯上的 η³-烯丙基（Tsuji–Trost 反应）都以同样的外层方式被软亲核试剂进攻。立体化学是区分两种方式的手段，而且至关重要：催化循环的立体化学结果取决于哪些步骤是顺式、哪些是反式。

## 后续内容

接下来三章用这些步骤搭建催化循环。[[organometallics-catalysis/hydrogenation-hydroformylation]]组合了配体解离、$\mathrm{H_2}$ 的氧化加成、烯烃插入与还原消除（加氢），再加上 CO 插入（氢甲酰化）。[[organometallics-catalysis/cross-coupling]]组合了芳基卤化物的氧化加成、转金属化——有机基团从主族金属（[[organometallics-catalysis/main-group-organometallics]]）移到钯的一种取代——以及还原消除；Heck 反应以插入与 β-H 消除取代转金属化。[[organometallics-catalysis/metathesis-polymerisation]]使用金属烷基叉的 [2+2] 环加成与反复插入，并以 β-H 消除作链转移。这里使用的动力学分析是[[kinetics/reaction-mechanisms]]的稳态方法。

::: history
Vaska（Lauri Vaska）1962 年（与 DiLuzio（John DiLuzio）合作）发现 $\mathrm{[IrCl(CO)(PPh_3)_2]}$ 可逆地加 $\mathrm{O_2}$、$\mathrm{H_2}$ 与 HCl，给了化学家第一批清晰的例子，这种反应很快被命名为氧化加成；Halpern（Jack Halpern）与 Collman（Jim Collman）在 1960 年代使这一概念系统化。Calderazzo 与 Cotton 1962 年研究了 $\mathrm{[Mn(CH_3)(CO)_5]}$ 的 CO 插入，Noack 与 Calderazzo 1967 年的 $^{13}\mathrm{CO}$ 标记实验确立了甲基迁移。Whitesides 1970 年代对铂杂环的工作澄清了 β-氢消除的几何要求。1982 年 Janowicz（Andrew Janowicz）与 Bergman、以及独立地 Hoyano（James Hoyano）与 Graham 报道了烷烃 C–H 键对铱的氧化加成，1983 年 Watson 描述了甲烷在镥上的 σ键复分解。Rerek 与 Basolo 于 1983–84 年定量了茚基效应。
:::

::: summary
- 五种基元步骤——取代、氧化加成（OA）、还原消除（RE）、迁移插入与 β-氢消除——加上 $d^0$ 金属的 σ键复分解，构成了几乎每一个金属有机机理。
- 计数公式预言每一步的效应：OA 与 RE 使 VE、OS、CN 各变 ±2；插入使 VE 与 CN 减 2 并产生一个空位；σ键复分解什么都不改变。
- 18 电子配合物按解离方式取代（$k_\text{obs}$ 对进入配体零级，被游离离去配体阻滞，$\Delta S^\ddagger > 0$）；16 电子配合物按缔合方式（$\Delta S^\ddagger < 0$）；环滑移（茚基效应）让 18 电子也能走缔合路径。
- OA 对 $\mathrm{H_2}$、C–H 与芳基卤化物是协同的（顺式，构型保持），对烷基卤化物是 $\mathrm{S_N2}$ 型的（翻转，极性，$\Delta S^\ddagger \ll 0$），或按自由基进行；它需要能升高两个氧化态的金属。
- RE 要求基团顺式，受高氧化态、位阻与宽齿合角促进；C–H 与 H–H 消除最快，$sp^3$–$sp^3$ C–C 最慢。
- 迁移插入是顺式的、分子内的；标记实验（Noack–Calderazzo，顺：反 2 : 1）表明是烷基在迁移。β-氢消除需要 β-H、顺式空位与顺式共平面。
- 对配位配体的外层进攻是反式的；内层插入是顺式的。
:::

## 习题

::: exercise 氧化加成后的氧化态 {level=1 check="3"}
$\mathrm{H_2}$ 对 Vaska 配合物 $\mathrm{[IrCl(CO)(PPh_3)_2]}$ 做氧化加成，产物的氧化态是多少？（输入氧化态。）
::: solution
Vaska 配合物中为 Ir(I)；氧化加成加上两个 X 配体（两个氢化物），氧化态升高二：**Ir(III)**，即 $\mathrm{[IrH_2Cl(CO)(PPh_3)_2]}$，两个氢化物处于顺位。VE 从 16 升到 18。
:::
:::

::: exercise 迁移插入之后 {level=1 check="16"}
$\mathrm{[Mn(CH_3)(CO)_5]}$ 发生 CO 的迁移插入。新配体结合之前，酰基配合物紧接着的价电子数是多少？（输入电子数。）
::: solution
起始 $7 + 10 + 1 = 18$。插入把一个 L（CO）与一个 X（$\mathrm{CH_3}$）并成一个 X（酰基）：$\mathrm{[Mn\{C(O)CH_3\}(CO)_4]}$ 有 $7 + 8 + 1 = 16$ 电子，空出的位点由进来的 CO 或膦填满。
:::
:::

::: exercise 标记的统计 {level=1 check="0.5"}
在 Noack–Calderazzo 实验（[[#ex-noack]]）中，若机理是甲基迁移，$\mathrm{[Mn(CH_3)(CO)_5]}$ 产物中带*顺*位（与甲基顺位）$^{13}\mathrm{CO}$ 标记的分数是多少？（输入分数。）
::: solution
四个等概率的空位中，两个（在 $\pm y$）使甲基与 $+x$ 的标记处于顺位：分数 $\tfrac12 = 0.5$。一个给出*反*位（$0.25$），一个失去标记（$0.25$）。
:::
:::

::: exercise 游离配体的阻滞 {level=2 check="0.0002"}
某解离取代的 $k_1 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$，$k_{-1}/k_2 = 2.0$。求 $[\mathrm{L'}] = 0.20\ \mathrm{mol\,dm^{-3}}$、$[\mathrm{L''}] = 0.10\ \mathrm{mol\,dm^{-3}}$ 时的 $k_\text{obs}$。（$k_\text{obs}$ 以 $\mathrm{s^{-1}}$ 输入。）
::: solution
$k_\text{obs} = k_1/\big(1 + (k_{-1}/k_2)[\mathrm{L'}]/[\mathrm{L''}]\big) = 1.0\times10^{-3}/(1 + 2.0 \times 2.0) = 1.0\times10^{-3}/5.0 = 2.0\times10^{-4}\ \mathrm{s^{-1}}$。
:::
:::

::: exercise 缔合的活化焓 {level=2 check="24.8"}
烷基卤化物对某 Rh(I) 配合物的氧化加成为二级速率常数，$298.15\ \mathrm{K}$ 下 $2.0\times10^{-2}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，$318.15\ \mathrm{K}$ 下 $4.0\times10^{-2}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。计算 $\Delta H^\ddagger$，再求 $\Delta S^\ddagger$（标准态 $1\ \mathrm{mol\,dm^{-3}}$），并说明这些数值提示哪种机理。（$\Delta H^\ddagger$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
$\Delta H^\ddagger = R\ln\big[(k_2/T_2)/(k_1/T_1)\big]/(1/T_1 - 1/T_2) = 8.314 \times \ln(2 \times 298.15/318.15)/(2.1082\times10^{-4}) = 8.314 \times 0.6283/2.1082\times10^{-4} = 24.8\ \mathrm{kJ\,mol^{-1}}$。于是 $\Delta S^\ddagger = 8.314\,[\ln(0.020/298.15) - 23.760] + 24\,770/298.15 = 8.314\,(-9.610 - 23.760) + 83.1 = -194\ \mathrm{J\,K^{-1}\,mol^{-1}}$。小的活化焓与很负的活化熵表明高度有序、极性的双分子过渡态：$\mathrm{S_N2}$ 型氧化加成。
:::
:::

::: exercise 哪些烷基活得下来？ {level=2}
按对 β-氢消除的预期热力学稳定性排列下列各物并解释：(a) $\mathrm{[Ti(CH_2CH_3)_4]}$；(b) $\mathrm{[Ti(CH_2CMe_3)_4]}$；(c) *cis*-$\mathrm{[Pt(CH_2CH_2CH_2CH_3)_2(PPh_3)_2]}$；(d) 铂杂环戊烷 $\mathrm{[Pt\{(CH_2)_4\}(PPh_3)_2]}$。
::: solution
(b) 最稳健：新戊基没有 β-氢（β-碳是季碳），β-氢消除不可能，而且庞大基团还保护了钛。(d) 次之：它有 β-氢，但五元环中 Pt–C–C–H 片段无法成为顺式共平面，消除受到强烈阻滞。(c) 分解更容易：开链丁基可旋转到顺式共平面构型，且一个膦可解离提供顺式空位（加入 $\mathrm{PPh_3}$ 会阻滞反应）。(a) 最不稳定：Ti(IV) 是 8 电子的 $d^0$ 中心，空位多多，乙基又带 β-氢；室温下无法分离。
:::
:::

::: exercise 推导缔合速率方程 {level=3}
平面正方形取代常遵循两项速率方程 $k_\text{obs} = k_\mathrm{s} + k_\mathrm{Y}[\mathrm{Y}]$（[[coordination-chemistry/inorganic-mechanisms]]）。对 16 电子配合物 $\mathrm{ML_3X}$ 与 Y 经五配位中间体的反应 $\mathrm{ML_3X + Y} \underset{k_{-a}}{\overset{k_a}{\rightleftharpoons}} \mathrm{ML_3XY} \xrightarrow{k_b} \mathrm{ML_3Y + X}$，在稳态近似下导出 $k_\text{obs}$，并证明低 $[\mathrm{Y}]$ 时它化为 $k_\mathrm{Y}[\mathrm{Y}]$。$k_\mathrm{s}$ 项对应什么？它为何不违反 16/18 规则？
::: hint
把 $\mathrm{ML_3XY}$ 当作稳态中间体。溶剂本身就是一个潜在的配体。
:::
::: solution
稳态：$k_a[\mathrm{ML_3X}][\mathrm{Y}] = (k_{-a} + k_b)[\mathrm{ML_3XY}]$，故速率 $k_b[\mathrm{ML_3XY}] = \dfrac{k_ak_b[\mathrm{Y}]}{k_{-a} + k_b}[\mathrm{ML_3X}]$，即
$$
k_\text{obs} = \frac{k_ak_b}{k_{-a}+k_b}[\mathrm{Y}] \equiv k_\mathrm{Y}[\mathrm{Y}],
$$
对 Y 为一级（只有中间体积累时才会出现饱和，而稳态排除了这一点；若有可观 $K$ 的前置平衡，则得 $k_\text{obs} = k_bK[\mathrm{Y}]/(1 + K[\mathrm{Y}])$，低 $[\mathrm{Y}]$ 时趋于 $k_\mathrm{Y}[\mathrm{Y}]$）。$k_\mathrm{s}$ 项是同一缔合路径、以**溶剂分子**为进入配体：溶剂进攻（经 18 电子五配位中间体），X 离去，溶剂合配合物随后迅速被 Y 取代。由于溶剂浓度恒定，这一项看似与 $[\mathrm{Y}]$ 无关，但它是缔合的而非解离的：不涉及 14 电子中间体，且每个中间体都是 16 或 18 电子，正合 Tolman 规则。
:::
:::

::: exercise 氢负离子"行走"实现的烯烃异构化 {level=3}
某铑氢化物催化剂 $\mathrm{L_nRh{-}H}$ 把己-1-烯异构化为（*E*)-与（*Z*)-己-2-烯和己-3-烯的混合物。用 $\mathrm{L_nRh{-}D}$ 做反应时，回收的己烯在 C1、C2 与 C3 上都出现氘。提出一个机理，用文字描述每一步及电子数的变化，并解释氘的分布。
::: hint
想象 1,2-插入之后朝另一个方向做 β-氢消除，反复进行。
:::
::: solution
**步骤 1（配位）：**己-1-烯结合 16 电子氢化物的一个空位（VE 16 → 18）。**步骤 2（1,2-插入）：**烯烃插入 Rh–D，Rh 接到 C1、D 接到 C2（空间上受利的反马氏取向），生成伯烷基 $\mathrm{Rh{-}CH_2CHD{-}C_4H_9}$（VE 18 → 16）；另一取向的插入（D 接 C1、Rh 接 C2）给出仲烷基 $\mathrm{Rh{-}CH(CH_2D){-}C_4H_9}$。**步骤 3（β-氢消除）：**仲烷基上，金属可从 C3 夺氢（而不是从 C1，那只会退回己-1-烯），生成配位的己-2-烯与 $\mathrm{Rh{-}H}$（VE 16 → 18）。**步骤 4（解离）：**己-2-烯释出，或者反向再插入（Rh 接 C3、H 接 C2）并消除 C4 的氢，给出己-3-烯。插入与消除每循环一次，双键就沿链移动一个碳（"链行走"），每一次涉及不同氢的插入-消除都会使 H 与 D 混合：氘先被送到 C2（或 C1），再插入并消除一个 H 之后，氘就留在了链上，而金属带走了一个氢。因此回收的己-1-烯可能在 C1 或 C2 带 D，内部烯烃则在 C1、C2 与 C3。热力学驱动力是内部、多取代烯烃更稳定，平衡时（*E*)-异构体为主。所有步骤都使金属保持 16 或 18 电子与同一氧化态。
:::
:::
