放在实验台上的一瓶溴会慢慢变干，房间里充满红棕色蒸气；而同样这瓶溴若放在带塞的瓶里，液体几乎不见减少，上方的空间却很快变成一种稳定的红色。分子本身没有任何改变——改变的只是它们能否逃走。这一个观察就包含了本章的全部思想：在密闭容器中，过程不会停止，而是达到*平衡*。液体蒸发的速率与蒸气冷凝的速率相等，于是颜色——压强、浓度、一切宏观的变化迹象——都保持不变，而两个过程仍在毫无衰减地进行。化学反应也是如此：几乎每个反应都是一条双向道路，而我们所说的"反应结束"，通常就是正向与逆向以同样步调进行的那个状态。**化学平衡**就是这个状态，而平衡常数是告诉你它停在何处的单个数字——还剩多少反应物、生成了多少产物、以及一旦扰动，混合物会往哪边走。本章建立那套定量机器：质量作用定律、反应商、ICE 表，以及勒夏特列原理。

## 动态平衡

::: definition 动态平衡 {#def-dynamic-equilibrium}
当一个反应的正向过程与逆向过程速率相等，混合物的组成不再随时间改变时，该反应处于**化学平衡**。这种状态是**动态**的而非静态的：分子在每一时刻都在两个方向上反应，但一个方向的每一次事件，平均而言都由另一方向的一次事件所抵消。平衡可以从两侧到达——从纯反应物或纯产物出发，都会趋近同一个平衡组成（在固定的温度与体积下）——它的特征是宏观性质的恒定，而不是变化的缺席。
:::

"速率相等"与"浓度相等"之间的区别是本章最重要的一个观念，值得停下来想一想。考虑四氧化二氮——这种解离成红棕色二氧化氮的无色气体，$\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$。把纯 $\mathrm{N_2O_4}$ 注入密闭烧瓶，棕色逐渐变深，然后停止变深；注入纯 $\mathrm{NO_2}$，棕色逐渐变浅，然后停止变浅。两个烧瓶最终到达*同一个*混合物——但那个混合物并不是一半对一半：在 $\mathrm{298\,K}$ 和常压下它绝大部分是 $\mathrm{N_2O_4}$，因为平衡强烈偏左。在那里，解离速率与复合速率相等；浓度却不相等，而且没有任何理由必须相等。两个过程可以在不相等的水平上达到平衡，就像一个市场可以在买方多于卖方的情况下出清，只要每个买方买得多一些。

::: quiz
在平衡时，下列哪个说法正确？
- [x] 正反应与逆反应以相等速率继续进行，所以浓度保持恒定，但彼此并不相等。
- [ ] 反应已经停止，因为浓度不再改变。
- [ ] 反应物与产物的浓度相等。
- [ ] 如果混合物不再变化，反应一定已经进行完全。
::: solution
平衡是动态的：两个方向的反应都在进行，速率相等，这正是组成被"冻结"却没有真正死掉的原因。速率相等并不蕴含浓度相等——浓度之比由平衡常数决定，而它很少恰好等于一。"不再变化"的混合物只是在*变化*的意义上到达了终点，而不是反应的意义上：反应究竟走了多远，恰恰是 $K$ 所度量的东西。
:::
:::

过程仍在继续的证据是直接的。把同位素标记的 $\mathrm{^{15}N}$ 二氧化氮放入一个平衡混合物，标记会扩散进 $\mathrm{N_2O_4}$，而总组成毫无变化：反应在跑，只是两个方向跑得一样快。与晶体共存的离子型固体的饱和溶液也显示同样的事——固体与溶液之间持续地交换离子（可用示踪法测得），而晶体质量保持不变。

## 平衡常数

::: proposition 质量作用定律 {#prop-mass-action}
对于单相中处于平衡的可逆反应 $\sum_i \nu_i\,\mathrm{A_i} = 0$（产物系数取正），**平衡常数**是所涉各物种的平衡浓度（对气体则为分压）之积，每项以其化学计量系数为幂，产物在分子、反应物在分母：
$$
\mathrm{a\,A + b\,B \rightleftharpoons c\,C + d\,D}
\qquad
K_\mathrm{c} = \frac{[\mathrm{C}]_\mathrm{eq}^{c}\,[\mathrm{D}]_\mathrm{eq}^{d}}{[\mathrm{A}]_\mathrm{eq}^{a}\,[\mathrm{B}]_\mathrm{eq}^{b}}.
$$
在相同温度下，无论怎样配制，两个混合物的 $K_\mathrm{c}$ 相同：$K$ 只依赖温度（对理想混合物），不依赖起始量、压强或催化剂。质量作用定律是一条**经验定律**——它是对实验的概括，其深刻论证将在[[general-chemistry-2/entropy-free-energy]]中由自由能给出。
:::

严格地写，$K_\mathrm{c}$ 中的每个浓度都是*相对*浓度 $[\mathrm{X}]/c^\circ$，其中 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$；每个压强都是相对压强 $p/p^\circ$，其中 $p^\circ = 1\ \mathrm{bar}$；这样平衡常数就是一个纯数，没有单位。一年级的惯例是把以 $\mathrm{mol\,dm^{-3}}$ 计的浓度和以 bar 计的压强代入，并把 $K$ 当作带有相应单位的量来引用；你应当知道这只是一套记账办法，而比较两个平衡常数只有在两者以同样方式构造时才有意义。

为什么 $K$ 应当是速率常数之比？对*单一基元步骤*，这个联系是立即可得的，而这个论证值得一看，恰恰是因为它既显示了这一论证能走多远——也显示了它在何处失效。

::: proof 作为速率常数之比的 $K$（一步反应情形） {#proof-k-ratio}
设 $\mathrm{A \rightleftharpoons B}$ 是一个基元步骤，正向速率常数为 $k_\mathrm{f}$，逆向为 $k_\mathrm{r}$。B 的净生成速率为 $k_\mathrm{f}[\mathrm{A}] - k_\mathrm{r}[\mathrm{B}]$，平衡时它为零：
$$
k_\mathrm{f}[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{B}]_\mathrm{eq}
\qquad\Longrightarrow\qquad
K_\mathrm{c} = \frac{[\mathrm{B}]_\mathrm{eq}}{[\mathrm{A}]_\mathrm{eq}} = \frac{k_\mathrm{f}}{k_\mathrm{r}}.
$$
$K$ 大意味着在浓度相等时正向步骤跑过逆向——平衡偏向产物。若正、逆两步的活化能分别为 $E_\mathrm{f}$ 与 $E_\mathrm{r}$，则 $k_\mathrm{f}/k_\mathrm{r} = (A_\mathrm{f}/A_\mathrm{r})\,e^{-(E_\mathrm{f}-E_\mathrm{r})/RT}$，于是 $K$ 的温度依赖由两个势垒之*差*支配，而这个差就是反应能：放热反应的 $K$ 随温度升高而下降。

然而，这个动用的是基元步骤的速率方程。对多步反应，观测到的速率方程并不是从总反应式直接读出的质量作用形式（[[general-chemistry-2/rates-intro]]中的氢-溴反应是标准反例），所以"平衡常数等于正、逆速率常数之比"在一般情况下只是一个*启发式*，而不是证明。普遍的真命题——平衡组成由热力学决定，而催化剂把 $k_\mathrm{f}$ 与 $k_\mathrm{r}$ 乘以同一因子、因而无法改变 $K$——依然成立，但它的论证是自由能，不是速率方程。
:::

::: definition 异相平衡 {#def-heterogeneous}
当平衡涉及一个以上的相时，称为**异相**平衡。纯凝聚相——一种纯固体，或稀溶液中的液态溶剂——的浓度由其自身密度决定、不随该相的量的多少而改变，因此被吸收进常数，**不出现在**平衡表达式中。对于石灰石的分解，
$$
\mathrm{CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)}
\qquad
K_\mathrm{p} = p_\mathrm{eq}(\mathrm{CO_2})/p^\circ,
$$
平衡时二氧化碳的压强只由温度决定：多加白垩、多加生石灰，只要两种固体都还在，一切都不动。
:::

对气体，用分压写常数更自然。两种形式由理想气体定律相联系。

::: proposition $K_\mathrm{c}$ 与 $K_\mathrm{p}$ 的换算 {#prop-kp-kc}
对气相反应，设 $\Delta n$ 为气体分子数目的变化（产物减反应物），则
$$
K_\mathrm{p} = K_\mathrm{c}\,(RT)^{\Delta n},
$$
其中若压强以 bar 计、浓度以 $\mathrm{mol\,dm^{-3}}$ 计，则 $R = 0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}}$。当 $\Delta n = 0$ 时两个常数相等。
:::

::: proof $K_\mathrm{p} = K_\mathrm{c}(RT)^{\Delta n}$ 关系 {#proof-kp-kc}
对理想气体，分压与浓度由 $p_i V = n_i RT$ 相联系，即 $p_i = [\mathrm{i}]\,RT$。把它代入压强形式的常数：
$$
K_\mathrm{p} = \prod_i (p_i)^{\nu_i} = \prod_i \big([\mathrm{i}]\,RT\big)^{\nu_i} = \left(\prod_i [\mathrm{i}]^{\nu_i}\right)(RT)^{\sum_i \nu_i} = K_\mathrm{c}\,(RT)^{\Delta n},
$$
因为 $\sum_i \nu_i$ 恰好就是从反应物到产物气体分子数的变化。对 $\mathrm{N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g)}$，$\Delta n = 2 - 4 = -2$，于是 $K_\mathrm{p} = K_\mathrm{c}(RT)^{-2}$：两个常数相差因子 $(RT)^2$，在 $\mathrm{298\,K}$ 约为 $614$。
:::

::: example 书写平衡常数表达式 {#ex-equilibrium-expressions}
写出下列反应的 $K_\mathrm{c}$：(a) $\mathrm{N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g)}$；(b) $\mathrm{CH_3CO_2H(aq) + H_2O(l) \rightleftharpoons CH_3CO_2^-(aq) + H_3O^+(aq)}$；(c) $\mathrm{AgCl(s) \rightleftharpoons Ag^+(aq) + Cl^-(aq)}$；并说明每个反应式倒写时常数如何变化。
::: solution
(a) $K_\mathrm{c} = [\mathrm{NH_3}]^2/([\mathrm{N_2}][\mathrm{H_2}]^3)$——所有物种都是气体，全部出现。(b) $K_\mathrm{c} = [\mathrm{CH_3CO_2^-}][\mathrm{H_3O^+}]/[\mathrm{CH_3CO_2H}]$：水是稀溶液中的液态溶剂，其（基本恒定的）浓度被吸收进常数——这就是为什么酸的强度以 $K_\mathrm{a}$ 列表而不含水项。(c) $K_\mathrm{sp} = [\mathrm{Ag^+}][\mathrm{Cl^-}]$：唯一的凝聚相是固体 $\mathrm{AgCl}$，它不出现；这个常数就是[[general-chemistry-2/solubility-equilibria]]将要讨论的**溶度积**。把任何反应式倒写，常数就取倒数：(a) 若写成 $2\,\mathrm{NH_3} \rightleftharpoons \mathrm{N_2} + 3\,\mathrm{H_2}$，则 $K' = 1/K_\mathrm{c}$。
:::
:::

::: example 四氧化二氮的 $K_\mathrm{p}$ 与 $K_\mathrm{c}$ {#ex-kp-kc-n2o4}
对 $\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$，在 $\mathrm{298\,K}$ 由标准生成吉布斯自由能（$\Delta_\mathrm{f}G^\circ$：$\mathrm{NO_2}$ 为 $+51.31$，$\mathrm{N_2O_4}$ 为 $+97.89\ \mathrm{kJ\,mol^{-1}}$，标准数据表值）可得 $K_\mathrm{p} = 0.148$。求同温下的 $K_\mathrm{c}$。
::: solution
这里 $\Delta n = 2 - 1 = +1$，所以 $K_\mathrm{p} = K_\mathrm{c}\,RT$，于是
$$
K_\mathrm{c} = \frac{K_\mathrm{p}}{RT} = \frac{0.148}{0.08314 \times 298.15} = \frac{0.148}{24.79} = 5.98\times10^{-3}.
$$
数值上的差异并不矛盾：$K_\mathrm{p}$ 通过压强计数分子，$K_\mathrm{c}$ 通过浓度计，而在 $\mathrm{298\,K}$，$1\ \mathrm{mol\,dm^{-3}}$ 大约对应 $24.8\ \mathrm{bar}$。因为 $\Delta n = +1$，解离*增加*分子数，浓度形式的常数是两者中较小的那个。
:::
:::

::: widget odesolver
f: 0.5 - 1.5*y
y0: 1
t: 0, 6
exact: 1/3 + 2/3*exp(-1.5*t)
caption: 可逆一级对 $\mathrm{A \rightleftharpoons B}$ 趋近平衡的过程，$k_\mathrm{f} = 1$、$k_\mathrm{r} = 0.5$（以时间单位的倒数计），从纯 A 出发。$y = [\mathrm{A}]$ 的变化率为 $-k_\mathrm{f}y + k_\mathrm{r}(1-y)$：净速率直到 $y$ 降到 $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r}) = 1/3$——即平衡值——才为零，并以速率常数 $k_\mathrm{f}+k_\mathrm{r}$ 指数地趋近该值。平衡是一个*吸引子*：体系从两侧都向它弛豫，而弛豫速率是两个速率常数之和——比单独任何一个反应都更快。
:::

## 反应商与 ICE 表

常数告诉你平衡停在何处；要知道给定的混合物将往哪边跑，还需要一个量。

::: definition 反应商 {#def-reaction-quotient}
**反应商** $Q$ 是把质量作用表达式在*当前*浓度或分压下（而不是在平衡时）求值：对 $\mathrm{a\,A + b\,B \rightleftharpoons c\,C + d\,D}$，
$$
Q_\mathrm{c} = \frac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b}\quad(\text{按此式，就在此刻}).
$$
若 $Q < K$，分子太小：混合物向**前**移动（净生成产物），直到 $Q$ 升到 $K$。若 $Q > K$，则向**逆**方向移动。若 $Q = K$，混合物已处于平衡。$Q$ 与 $K$ 形式相同，关于纯相的约定也相同；不同之处在于 $Q$ 随反应的进行而改变。
:::

::: example 往哪个方向进行？ {#ex-direction-hi}
对 $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$，在某温度下 $K_\mathrm{c} = 50.5$。某混合物的分析结果为 $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.10$、$[\mathrm{HI}] = 0.40\ \mathrm{mol\,dm^{-3}}$。它处于平衡吗？若不是，往哪边移动？
::: solution
$$
Q_\mathrm{c} = \frac{(0.40)^2}{(0.10)(0.10)} = \frac{0.16}{0.010} = 16 < 50.5 = K_\mathrm{c}.
$$
不在平衡：$Q < K$，所以分子必须增大——混合物向**前**移动，消耗 $\mathrm{H_2}$ 与 $\mathrm{I_2}$、生成 HI，直到 $Q$ 升到 $50.5$。注意这一比较在构造上是无量纲的：$Q$ 与 $K$ 以同样的方式求值，所以它们的比值有意义，尽管原始数字带着 $\mathrm{mol\,dm^{-3}}$ 表达式的记账单位。
:::
:::

平衡计算的主力工具是一张记账表。

::: algorithm ICE 表 {#alg-ice}
**输入：**配平的反应式、所关心温度下的 $K$、以及起始量。**输出：**平衡组成。
1. 画三行——**I**nitial（初始）、**C**hange（变化）、**E**quilibrium（平衡）——每个物种一列，用浓度或分压。
2. 填入初始值；除非另有说明，产物通常从零开始。
3. 用化学计量系数写变化行：若反应进度为 $x$，各物种改变 $\nu\,x$（反应物 $-a\,x$，产物 $+c\,x$）。绝不写不带系数的变化。
4. 相加得 $E$ 行，代入平衡表达式，解出 $x$。
5. 若得到一元二次方程，用求根公式；若是完全平方（在 $\Delta n = 0$ 且初始产物为零时常见），两边开平方。
6. **检验答案**：每个平衡浓度都必须落在其初始值与完全反应极限之间；代回平衡表达式应能还原 $K$；若用了小 $x$ 近似，检验它（见下文）。
:::

::: example 一元二次的 ICE 问题：$\mathrm{373\,K}$ 的 $\mathrm{N_2O_4}$ {#ex-n2o4-373}
$\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$ 的 $\Delta_\mathrm{r}H^\circ = +57.2\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = +175.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$（标准数据表值），在 $\mathrm{373\,K}$ 给出 $K_\mathrm{p} \approx 15$。一烧瓶充入纯 $\mathrm{N_2O_4}$ 至 $1.00\ \mathrm{bar}$，恒温于 $\mathrm{373\,K}$。求平衡分压与解离度。
::: solution
设有 $x\ \mathrm{bar}$ 的 $\mathrm{N_2O_4}$ 解离：

| | $\mathrm{N_2O_4}$ | $\mathrm{NO_2}$ |
|---|---|---|
| I / bar | $1.00$ | $0$ |
| C / bar | $-x$ | $+2x$ |
| E / bar | $1.00 - x$ | $2x$ |

$$
K_\mathrm{p} = \frac{(2x)^2}{1.00 - x} = 15
\qquad\Longrightarrow\qquad
4x^2 + 15x - 15 = 0
\qquad\Longrightarrow\qquad
x = \frac{-15 + \sqrt{225 + 240}}{8} = 0.820 .
$$
所以 $p(\mathrm{N_2O_4}) = 0.18\ \mathrm{bar}$，$p(\mathrm{NO_2}) = 1.64\ \mathrm{bar}$，总压从 $1.00$ 升到 $1.82\ \mathrm{bar}$——解离制造分子，压力计看得见。解离度为 $82\ \%$。检验：$1.64^2/0.18 = 14.9 \approx 15$。一元二次方程的负根被舍去，因为它会使 $p(\mathrm{NO_2})$ 为负——数学负责提供，化学负责挑选。
:::
:::

::: example 一个完全平方：$\mathrm{448\,K}$ 的 $\mathrm{H_2 + I_2}$ {#ex-hi-square}
对 $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$，$\mathrm{448\,K}$ 时 $K_\mathrm{c} = 50.5$（标准数据表值）。在该温度下把等浓度的单质 $0.500$ 与 $0.500\ \mathrm{mol\,dm^{-3}}$ 混合。求平衡组成。
::: solution

| | $\mathrm{H_2}$ | $\mathrm{I_2}$ | $\mathrm{HI}$ |
|---|---|---|---|
| I | $0.500$ | $0.500$ | $0$ |
| C | $-x$ | $-x$ | $+2x$ |
| E | $0.500 - x$ | $0.500 - x$ | $2x$ |

因为 $\Delta n = 0$ 且两个反应物起始相等，分母是一个完全平方，无需一元二次方程：
$$
\frac{(2x)^2}{(0.500 - x)^2} = 50.5
\qquad\Longrightarrow\qquad
\frac{2x}{0.500 - x} = \sqrt{50.5} = 7.106
\qquad\Longrightarrow\qquad
x = 0.390 .
$$
所以 $[\mathrm{HI}] = 0.780$，$[\mathrm{H_2}] = [\mathrm{I_2}] = 0.110\ \mathrm{mol\,dm^{-3}}$；反应完成 $78\ \%$。检验：$0.780^2/0.110^2 = 50.3 \approx 50.5$。先找平方根，再去拿一元二次公式——开方是精确的、更快的，而且不会挑错根。
:::
:::

::: example 当 $K$ 极小时：小 $x$ 近似 {#ex-small-x}
对 $\mathrm{N_2(g) + O_2(g) \rightleftharpoons 2\,NO(g)}$，$\mathrm{298\,K}$ 时 $K_\mathrm{c} = 4.7\times10^{-31}$（由 $\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = +86.55\ \mathrm{kJ\,mol^{-1}}$ 得出）。空气按同义计为 $0.78\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{N_2}$ 与 $0.21$ 的 $\mathrm{O_2}$；估算 $\mathrm{298\,K}$ 时 NO 的平衡浓度。
::: solution
若 $x$ 为反应的 $\mathrm{N_2}$ 量，则 $[\mathrm{NO}] = 2x$，且
$$
\frac{(2x)^2}{(0.78 - x)(0.21 - x)} = 4.7\times10^{-31}.
$$
因为 $K$ 小得离谱，$x$ 相对于 $0.78$ 与 $0.21$ 必须可忽略；把两个差都用初始值代替，
$$
(2x)^2 \approx 4.7\times10^{-31} \times 0.78 \times 0.21 = 7.7\times10^{-32}
\qquad\Longrightarrow\qquad
[\mathrm{NO}] = 2x = 2.8\times10^{-16}\ \mathrm{mol\,dm^{-3}}.
$$
这大约是每 $\mathrm{cm^3}$ $1.7\times10^{5}$ 个分子——真实但微乎其微的浓度。这个近似显然成立（$x$ 比最小的初始浓度低约十五个数量级），而它证明的化学事实很重要：一氧化氮不可能来自常温空气，这就是为什么内燃机只在气缸达到 $\mathrm{2500\,K}$ 时才产生 $\mathrm{NO}$——在那里这个 $K$ 大了约 $10^{28}$ 倍。
:::
:::

::: warning 小 $x$ 近似是一张你必须挣得的许可证 {#warn-small-x}
把 $x$ 从一个初始浓度中丢掉，只有当它不改变任何东西时才合法——通常的规则是 $x$ 必须小于被丢自之值的 $5\ \%$，而且事后*必须*检验。陷阱在于：近似是否奏效取决于起始浓度，而不只取决于 $K$。对 $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$，$\mathrm{500\,K}$ 时 $K_\mathrm{c} = 0.027$（代表性数据表值），$[\mathrm{PCl_5}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$，近似给出 $x \approx \sqrt{0.027 \times 0.100} = 0.052$——这是 $0.100$ 的 $52\ \%$，而精确的一元二次解给出 $x = 0.040$。近似错了 $29\ \%$；只要你做 $5\ \%$ 检验，它每次都能抓住这一点。把同一体系稀释到 $0.020\ \mathrm{mol\,dm^{-3}}$，精确解离度升到 $67\ \%$：起始浓度越*小*，这条捷径就越*不*成立。做这个检验；它只花一次除法。
:::

::: widget plot
f: 4*x^2/((0.5-x)*(0.5-x)); k
x: 0, 0.49
y: 0, 120
sliders: k=50:10:100:5
labels: \text{反应商 } Q(x); \text{平衡常数 } K
caption: 对 $\mathrm{H_2 + I_2 \rightleftharpoons 2\,HI}$，从各 $0.50\ \mathrm{mol\,dm^{-3}}$ 的元素出发，反应商 $Q(x) = (2x)^2/(0.5-x)^2$ 随反应进度 $x$ 的变化曲线，常数 $K$ 由滑块设定。曲线从零单调上升，在 $x$ 趋于完全反应极限时发散；平衡进度恰是它与水平 $K$ 线相交之处。把 $K$ 往上调，交点右移：常数越大，反应走得越远。同一幅图支撑着每一张 ICE 表——解表就是找那个交点。
:::

## 平衡常数的组合

::: proposition 平衡方程的组合规则 {#prop-combining}
平衡常数像方程一样组合——方程相加之处，常数相乘：
- **倒写**方程：$K' = 1/K$。
- **相加**两个方程：$K' = K_1 K_2$（在两者之间被消去的物种不再另作贡献）。
- 把方程**乘以** $n$：$K' = K^{\,n}$——所以方程减半，$K$ 开平方。
这些直接从 $K$ 的幂积形式得出：方程相加即指数相加，亦即乘积相乘。
:::

::: example 由两个已知常数构造一个常数 {#ex-combining}
$\mathrm{298\,K}$ 下：(i) $\mathrm{N_2(g) + O_2(g) \rightleftharpoons 2\,NO(g)}$，$K_1 = 4.7\times10^{-31}$；(ii) $\mathrm{2\,NO(g) + O_2(g) \rightleftharpoons 2\,NO_2(g)}$，$K_2 = 2.2\times10^{12}$。求 $\mathrm{N_2(g) + 2\,O_2(g) \rightleftharpoons 2\,NO_2(g)}$ 的 $K$，以及 $\mathrm{NO_2(g) \rightleftharpoons \tfrac12\,N_2(g) + O_2(g)}$ 的 $K$。
::: solution
目标方程是 (i) + (ii)，NO 被消去——它可以消去，因为同一种物种出现在等号两侧，其浓度相除而消掉：
$$
K = K_1 K_2 = 4.7\times10^{-31} \times 2.2\times10^{12} = 1.0\times10^{-18}.
$$
第二个方程是第一个目标倒写后减半：
$$
K' = K^{-1/2} = \frac{1}{\sqrt{1.0\times10^{-18}}} = 9.7\times10^{8}.
$$
这两个数字用一行讲出了环境故事：二氧化氮相对于单质在热力学上是不稳定的（其分解的 $K'$ 巨大），然而空气与排气却永远共存，因为[[general-chemistry-2/rates-intro]]已经教过我们：$K$ 对快慢一无所言。
:::
:::

## 勒夏特列原理

::: proposition 勒夏特列原理 {#prop-le-chatelier}
若处于平衡的体系受到**约束**——浓度、压强或温度的改变——它将向*部分抵消*这一改变的方向移动，直到 $Q$ 重新等于 $K$。更准确地说：浓度或压强的改变移动平衡的*位置*而不改变 $K$（它们改变 $Q$，反应随之移动以恢复 $Q = K$）；只有**温度的改变才改变 $K$ 本身**，而且它朝吸热方向改变。这一原理是定性的、经验的，但它完全正确，而 ICE 表把它变成数字。
:::

**浓度。**加入反应物抬高 $Q$ 的分母，于是 $Q < K$，混合物向前移动——加入的反应物有一部分被消耗，"抵消"了加入，但不是全部（新平衡中该物种仍比加入前多，只是没有你加进去的那么多）。从另一侧移走产物同理，而且是驱动反应的日常手法：把费歇尔酯化中低沸点的酯蒸出去，酸就会不断转化。

**压强与体积。**压缩气体混合物（缩小体积）把每个浓度乘以同一因子，而只有当两侧气体分子数不同时，这一因子对 $Q$ 的分子与分母的影响才不相等。移动方向是气体分子数少的一侧，以缓解压强。对 $\mathrm{N_2O_4 \rightleftharpoons 2\,NO_2}$，体积减半使每个压强加倍、$Q$ 的分子变为四倍而分母变为二倍：$Q$ 翻倍、超过 $K$，混合物向左移动——而且是可见的：棕色先变深（一切加倍），随后随着 $\mathrm{N_2O_4}$ 重新生成，褪回到低于"刚加倍瞬间"的那个色调。若 $\Delta n = 0$——如 $\mathrm{H_2 + I_2 \rightleftharpoons 2\,HI}$——压强对平衡位置*没有*影响，因为 $Q$ 不变。

**惰性气体。**在恒容下加入惰性气体不改变任何分压和浓度：$Q$ 纹丝不动，什么都不移动。在恒*压*下加入（让容器膨胀），它稀释每个物种，作用相当于降压——平衡向气体分子数多的一侧移动。"加气体，平衡移动"只有在说明你保住了哪个约束时才成其为原理。

**温度。**这里 $K$ 本身会动，方向由 $\Delta_\mathrm{r}H^\circ$ 的符号决定：加热有利于**吸热**方向。对 $\mathrm{N_2O_4 \rightleftharpoons 2\,NO_2}$（$\Delta_\mathrm{r}H^\circ = +57.2\ \mathrm{kJ\,mol^{-1}}$），$K_\mathrm{p}$ 从 $\mathrm{298\,K}$ 的 $0.148$ 升到 $\mathrm{373\,K}$ 的约 $15$：热密封管里的气体是深棕色，冷的几乎无色。理由是[[#proof-k-ratio]]中速率常数之比的论证：加热对势垒较大的那个步骤的速率常数提升更多，而对吸热的正反应，那个势垒正是正向的势垒。

**催化剂。**催化剂把两个方向加速同一倍数，所以它既不改变 $K$，也不改变平衡组成——只改变到达组成所需的时间。工业合成里满是催化剂，而没有一种催化剂能提高平衡产率；它们提高的是*收获产率的速率*。

::: warning 勒夏特列只抵消，从不撤销——而 $K$ 不因浓度而动分毫 {#warn-le-chatelier}
三条精确的告诫。第一，移动只*部分*抵消约束：向 $\mathrm{H_2/I_2/HI}$ 平衡中加入 $\mathrm{I_2}$，一部分会被消耗，但新平衡中 $\mathrm{I_2}$ 仍比旧平衡多。"抵消"不是"撤销"。第二，$K$ 只是温度的*函数*：加入反应物改变的是 $Q$，组成随之响应，而 $K$ 恰是原来的样子——"加入反应物后重新计算 $K$"的学生，是在不知不觉中于头脑里改变了温度。第三，原理说不出*多少*：两个都"向左移动"的体系，移动幅度可以是 $0.1\ \%$，也可以是 $90\ \%$。只有 ICE 表回答多少，这就是为什么原理开启每一道平衡题，而表格关闭它。
:::

::: quiz
石灰石在密闭容器中分解：$\mathrm{CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)}$，在 $\mathrm{CO_2}$ 平衡压为 $0.20\ \mathrm{bar}$ 的某固定温度下。容器当前含有 $0.20\ \mathrm{bar}$ 的 $\mathrm{CO_2}$，两种固体都在。若再加入 $\mathrm{CaCO_3(s)}$，会发生什么？
- [x] 什么也不发生：固体的"浓度"不在平衡表达式中，而 $p(\mathrm{CO_2})$ 已经处于其平衡值。
- [ ] 平衡右移，$\mathrm{CO_2}$ 压强大于 $0.20\ \mathrm{bar}$。
- [ ] 平衡左移，消耗加入的固体。
- [ ] 取决于加入多少 $\mathrm{CaCO_3}$。
::: solution
$Q_\mathrm{p} = p(\mathrm{CO_2})/p^\circ$ 只含气体；纯固体自行确定其活度而被消去（见[[#def-heterogeneous]]）。既然 $p(\mathrm{CO_2}) = 0.20\ \mathrm{bar} = p_\mathrm{eq}$，体系就在平衡上，加入更多任何一种固体都不改变什么——前提是两者都还在，因为一旦某一种耗尽，异相平衡就不复存在，压强也就不再被钉住了。
:::
:::

每门一年级课程都会到达的工业支点是氨，$\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$（$\Delta_\mathrm{r}H^\circ = -92\ \mathrm{kJ\,mol^{-1}}$，四个气体分子变成两个）。平衡在*低*温和*高*压下有利于氨——但低温化学太慢，于是哈伯-博施法热到足以有可接受的速率（$\sim 700\ \mathrm{K}$）、压得很狠（$150$–$250\ \mathrm{bar}$）以夺回产率，并用铁催化剂快速到达平衡而不移动它。这三个选择中的每一个都是本章内容的一行注脚：温度以产率换速率（而 $K$ 会动），压强移动位置而不碰 $K$，催化剂只买来时间。同样的三行分析贯穿接触法制硫酸和你将会遇到的每一座合成塔。

::: history
贝尔托莱（Berthollet）在十九世纪初就观察到反应可以"朝反方向"跑——方向取决于条件和比例，而非某种不可更改的选择性亲和力——种下了平衡点的思想。1864–1867 年，挪威学生古德贝格（Guldberg）与瓦贝（Waage）定量地建立了质量作用定律，把平衡组成同"有效质量"之积、并（如[[#proof-k-ratio]]中的证明那样）同反应速率之比联系起来。范特霍夫（van 't Hoff）在 1884 年给了这一定律热力学的外形及其温度依赖；同一年，研究火焰与炸药的采矿工程师勒夏特列（Le Chatelier）提出了这条使平衡移动可以被预测的抵消原理；他 1884 年的论文就是读者刚刚读完的这一节的源头。能斯特（Nernst）在 1906 年前后对低温反应热的测量，为工业平衡计算提供了数据——并且经由热力学第三定律提供了其论证。从 1910 年起就完全依靠这些计算的哈伯（Haber）法合成氨，就是"本章值得学"的论据。
:::

## 后续内容

酸碱就是水中的平衡化学，[[general-chemistry-2/acids-bases]]里的每一个 pH 计算都是一张加上了水位线的 ICE 表；[[general-chemistry-2/buffers-titrations]]中的缓冲与滴定是两个平衡在讨价还价；[[general-chemistry-2/solubility-equilibria]]中的沉淀与配合离子则是本章的异相情形。$K$ 究竟为何存在——为什么它只是温度的函数，以及 $\Delta_\mathrm{r}G^\circ = -RT\ln K$ 如何计算它——在[[general-chemistry-2/entropy-free-energy]]；同一关系的电极电势形式在[[general-chemistry-2/electrochemistry-intro]]。平衡的速率侧解读见[[general-chemistry-2/rates-intro]]，更深入的层次见[[thermodynamics/reaction-equilibrium]]；机理如何隐藏在平衡与速率数据之中，见[[kinetics/reaction-mechanisms]]。

::: summary
- 平衡是动态的：正逆速率相等，组成恒定而非静止，且可从两侧到达。
- 质量作用定律（经验的）给出 $K_\mathrm{c}$ 与 $K_\mathrm{p}$：产物除以反应物，各按其系数取幂；纯固体与溶剂不出现；$K$ 只依赖温度。
- $K_\mathrm{p} = K_\mathrm{c}(RT)^{\Delta n}$，其中 $R = 0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}}$；$\Delta n = 0$ 时两常数相等。
- 在当前条件下求值的反应商 $Q$ 预测方向：$Q < K$ 正向，$Q > K$ 逆向。
- ICE 表把数据变成答案：把系数带进变化行，精确求解或为小 $x$ 捷径通过 $5\ \%$ 检验给出理由，并总是代回验证。
- 常数组合：倒写取倒数，相加相乘，乘 $n$ 取 $n$ 次幂。
- 勒夏特列：浓度与压强的移动不改变 $K$，且只部分抵消约束；只有温度改变 $K$，且有利于吸热方向；催化剂两者都不改变。
:::

## 练习

::: exercise 写出 $K_\mathrm{c}$ {level=1}
写出下列反应的平衡常数表达式 $K_\mathrm{c}$：(a) $\mathrm{2\,SO_2(g) + O_2(g) \rightleftharpoons 2\,SO_3(g)}$；(b) $\mathrm{C(s) + H_2O(g) \rightleftharpoons CO(g) + H_2(g)}$。哪些物种被省略，为什么？
::: solution
(a) $K_\mathrm{c} = [\mathrm{SO_3}]^2/([\mathrm{SO_2}]^2[\mathrm{O_2}])$——什么都不省略，所有物种都是气体。(b) $K_\mathrm{c} = [\mathrm{CO}][\mathrm{H_2}]/[\mathrm{H_2O}]$：固态碳是纯凝聚相，"浓度"固定，被吸收进 $K$；气态水则不然，因为它的分压真的会变。
:::
:::

::: exercise 换算为 $K_\mathrm{p}$ {level=1 check="0.149"}
对 $\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$，$\mathrm{298\,K}$ 时 $K_\mathrm{c} = 6.0\times10^{-3}$。$K_\mathrm{p}$ 是多少？（输入无量纲的 $K_\mathrm{p}$；压强以 $1\ \mathrm{bar}$ 为基准。）
::: solution
$\Delta n = +1$，所以 $K_\mathrm{p} = K_\mathrm{c}\,RT = 6.0\times10^{-3} \times 0.08314 \times 298.15 = 6.0\times10^{-3} \times 24.79 = 0.149$。
:::
:::

::: exercise 反应方向 {level=1 check="16"}
对 $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$，$K_\mathrm{c} = 50.5$，某混合物有 $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.10$、$[\mathrm{HI}] = 0.40\ \mathrm{mol\,dm^{-3}}$。计算 $Q_\mathrm{c}$。（输入 $Q_\mathrm{c}$。）混合物往哪个方向移动？
::: solution
$Q_\mathrm{c} = 0.40^2/(0.10 \times 0.10) = 16$。因为 $Q < K$，混合物正向移动、生成 HI，直到 $Q = 50.5$。
:::
:::

::: exercise 需要一元二次方程的 ICE 表 {level=2 check="0.0134"}
对 $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$，$\mathrm{500\,K}$ 时 $K_\mathrm{c} = 0.027$。一容器充入 $0.0200\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{PCl_5}$。求 $\mathrm{Cl_2}$ 的平衡浓度。（以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
$x^2/(0.0200 - x) = 0.027$ 给出 $x^2 + 0.027x - 5.40\times10^{-4} = 0$，所以 $x = [-0.027 + \sqrt{7.29\times10^{-4} + 2.16\times10^{-3}}]/2 = 0.0134\ \mathrm{mol\,dm^{-3}}$。小 $x$ 近似会给出 $x = 0.0232$——是精确值的 $116\ \%$——在 $5\ \%$ 检验下惨败：在这一稀释度下五氯化磷解离了 $67\ \%$。
:::
:::

::: exercise 完全平方的 ICE 表 {level=2 check="0.780"}
对 $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$，$\mathrm{448\,K}$ 时 $K_\mathrm{c} = 50.5$。$\mathrm{H_2}$ 与 $\mathrm{I_2}$ 各以 $0.500\ \mathrm{mol\,dm^{-3}}$ 的初始浓度在此温度下反应。求 $[\mathrm{HI}]_\mathrm{eq}$。（以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
$\sqrt{50.5} = 2x/(0.500 - x)$ 给出 $x = 0.390$，$[\mathrm{HI}] = 2x = 0.780\ \mathrm{mol\,dm^{-3}}$。检验：$(0.780)^2/(0.110)^2 = 50.3 \approx 50.5$。
:::
:::

::: exercise 勒夏特列原理，定性地 {level=2}
对平衡 $\mathrm{CO(g) + 2\,H_2(g) \rightleftharpoons CH_3OH(g)}$，$\Delta_\mathrm{r}H^\circ = -91\ \mathrm{kJ\,mol^{-1}}$，预测下列每种改变对平衡时甲醇量的影响：(a) 恒温压缩；(b) 恒容加入 $\mathrm{H_2}$；(c) 恒容加入氩气；(d) 恒压加入氩气；(e) 升温；(f) 加入催化剂。每种情形都说清 $K$ 是否改变。
::: solution
(a) 右移（三个气体分子变成一个）：甲醇增多；$K$ 不变。(b) $Q$ 下降，右移；甲醇增多，但加入的氢不会被全部消耗；$K$ 不变。(c) 什么也不发生：恒容意味着分压无一改变；$K$ 不变。(d) 恒压下加惰性气体稀释一切——作用相当于降压，向三个分子的一侧左移；甲醇减少；$K$ 不变。(e) 正反应放热，升温*降低* $K$ 并左移：甲醇减少——这就是为什么甲醇合成与氨合成一样，是速率与产率之间的妥协。(f) 平衡量与 $K$ 都不变；只是平衡到达得更快。
:::
:::

::: exercise 定量的压缩 {level=2 check="3.44"}
取 $\mathrm{373\,K}$ 下例题中的 $\mathrm{N_2O_4/NO_2}$ 平衡（$K_\mathrm{p} = 15$；$p(\mathrm{N_2O_4}) = 0.18$、$p(\mathrm{NO_2}) = 1.64\ \mathrm{bar}$），恒温下把体积减半。平衡时*新的*总压是多少？（以 bar 输入。）
::: solution
瞬时把每个压强加倍得 $Q = (3.28)^2/0.359 = 30 > 15$：左移。写 $p(\mathrm{NO_2}) = 3.28 - 2y$、$p(\mathrm{N_2O_4}) = 0.359 + y$，解 $(3.28-2y)^2/(0.359+y) = 15$：$4y^2 - 28.1y + 5.40 = 0$，得 $y = 0.197$（另一根超过了可用的 $\mathrm{NO_2}$）。于是 $p(\mathrm{NO_2}) = 2.89$、$p(\mathrm{N_2O_4}) = 0.556\ \mathrm{bar}$，总压 $3.44\ \mathrm{bar}$——高于原来的 $1.82$（压缩只被部分抵消），但低于"压缩瞬间"的 $3.64$（抵消确实发生了）。解离度从 $0.82$ 降到 $0.72$：压强有利于分子数少的一侧，恰如勒夏特列所言，而算术说出了多少。
:::
:::

::: exercise 精确与近似 {level=3}
对 $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$，$\mathrm{500\,K}$ 时 $K_\mathrm{c} = 0.027$、$[\mathrm{PCl_5}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$：精确求解平衡，再用小 $x$ 近似求解，并量化误差。然后求出一个初始浓度，低于它时近似在 $5\ \%$ 水平上才可接受。
::: solution
精确：$x^2 + 0.027x - 0.0027 = 0$ 给出 $x = 0.0402\ \mathrm{mol\,dm^{-3}}$（解离 $40\ \%$）。近似：$x_0 = \sqrt{K_\mathrm{c} C_0} = \sqrt{0.0027} = 0.0520$——误差 $(0.0520 - 0.0402)/0.0402 = 29\ \%$，且 $x_0/C_0 = 52\ \% \gg 5\ \%$：拒绝。近似在 $x/C_0 \lesssim 0.05$ 时可接受，即 $C_0 \gtrsim 20\,x \approx 20\sqrt{K_\mathrm{c}C_0}$，亦即 $C_0 \gtrsim 400\,K_\mathrm{c} = 10.8\ \mathrm{mol\,dm^{-3}}$。对这个 $K$，在通常浓度下这条捷径几乎永远不可用——一个警告：判据不是"$K$ 小"，而是"$x$ 相对于被丢自之值小"，而后者取决于你选的浓度。
:::
:::

::: exercise 炉火中的平衡常数 {level=3 check="1.0e-18"}
已知 $\mathrm{298\,K}$ 下 $\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = +86.55$、$\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31\ \mathrm{kJ\,mol^{-1}}$，用两种方法计算 $\mathrm{N_2(g) + 2\,O_2(g) \rightleftharpoons 2\,NO_2(g)}$ 的 $K_\mathrm{p}$：直接由自由能，以及把 $\mathrm{N_2 + O_2 \rightleftharpoons 2\,NO}$ 的 $K_1$ 与 $\mathrm{2\,NO + O_2 \rightleftharpoons 2\,NO_2}$ 的 $K_2$ 组合。（以科学计数法输入 $K_\mathrm{p}$。）两者为什么一致？$K_\mathrm{p}$ 的大小对闪电与化肥说明了什么？
::: solution
直接：$\Delta_\mathrm{r}G^\circ = 2 \times 51.31 = 102.6\ \mathrm{kJ\,mol^{-1}}$，所以 $K_\mathrm{p} = e^{-102\,600/(8.314 \times 298.15)} = e^{-41.4} = 1.0\times10^{-18}$。组合：$K_1 = e^{-173\,100/RT} = 4.7\times10^{-31}$，$K_2 = e^{+70\,480/RT} = 2.2\times10^{12}$，而 $K_1 K_2 = 1.0\times10^{-18}$——完全一致，因为目标方程是那两个方程之和，而两个表达式的质量作用乘积正是 $[\mathrm{NO}]$ 消去后的目标表达式（见[[#prop-combining]]）。这个大小解释了氮循环：在 $\mathrm{298\,K}$，空气中几乎不可能生成 $\mathrm{NO_2}$，但 $K$ 随温度升高而增大（两步都吸热或仅微放热），而约 $\mathrm{30\,000\,K}$ 的闪电通道固定的 NO 已足够多——它们氧化并溶入雨水成为硝酸盐——足以养育天然土壤。工业化肥正是同一个平衡论证，只是把温度选在本章速率与平衡的妥协之处。
:::
:::

::: exercise 异构化的技巧 {level=3}
丁烷异构化为异丁烷：$\mathrm{n\text{-}C_4H_{10}(g) \rightleftharpoons i\text{-}C_4H_{10}(g)}$，$\mathrm{298\,K}$ 时 $K_\mathrm{c} = 2.5$。一股纯正丁烷的炼油物流通过酸催化剂直至达到平衡。单程可获得的最大异丁烷摩尔分数是多少？而工厂为什么还能得到更多？（第二部分，用 $Q$ 与分离来推理。）
::: solution
设异构化量为 $x$：$x/(1-x) = 2.5$ 给出 $x = 2.5/3.5 = 0.714$——单程封顶在 $71\ \%$ 异丁烷，因为在该组成下 $Q = K$、净速率为零（催化剂使混合物*到达*上限，却永远无法越过它：见[[#warn-le-chatelier]]）。工厂越过上限的办法是把产物撤出平衡的游戏：异丁烷一生成就被分离（精馏利用约 $11\ \mathrm{K}$ 的沸点差），于是反应器出料从一个 $Q < K$ 的混合物重新建立平衡，如此循环。这就是工业上每一句"产率超过平衡产率"背后的普遍真理：平衡产率从未被超过——是平衡从未被允许到达，因为产物在被连续移除。同样的逻辑驱动着哈伯-博施法中靠冷凝移氨，以及酯化反应中靠分子筛移水。
:::
:::
