英格兰南部一条白垩溪里的一升水、挪威一座花岗岩湖中的一升水和一升海水，看上去毫无差别，却是三种不同的化学体系。白垩溪水中大约含有 $100\ \mathrm{mg}$ 溶解的钙，pH 接近 $8$，碳酸氢根多到足以中和相当可观的一剂酸。挪威的湖水只有几毫克溶质，pH 可能低于 $6$，几乎没有抵抗酸化的能力。海水含有 $35\ \mathrm{g}$ 盐分，比例惊人地恒定，被一套缓冲体系维持在 pH $8.1$，而这套缓冲体系如今正在吸收人类排放的 $\mathrm{CO_2}$ 的四分之一。与此同时，在富营养化湖泊的底部可能根本没有氧气，水闻起来有硫化氢的气味，并带着溶解的铁和锰——它们在几米之上本应是不溶的。

本课发展解释这些差异所需的平衡化学，遵循斯图姆（Werner Stumm）与摩根（James Morgan）的经典论述。两个主控变量几乎决定一切：**pH**，在多数天然水体中由碳酸盐体系支配；以及 **pe**，电子活度的度量，它告诉我们每种元素哪种氧化态是稳定的。所用的工具就是 [[analytical-chemistry/equilibria-in-analysis]] 的那一套——质量衡算、电荷衡算、分布分数——把它们应用到与大气和矿物相通的体系上。

## 天然水体的组成

河水中的溶质主要来自岩石风化，并叠加大气输入和生物作用的改造。典型的“世界平均”河流按摩尔丰度依次含碳酸氢根、钙、溶解硅、硫酸根、氯离子、钠、镁和钾，总溶解固体为 $100\ \mathrm{mg\,dm^{-3}}$ 量级。碳酸盐岩（石灰岩、白云岩）溶解迅速，形成硬度高、缓冲好的水；硅酸盐岩（花岗岩、片麻岩）风化缓慢，形成的水软而缓冲差——这就是为什么酸沉降对斯堪的纳维亚和苏格兰湖泊的伤害远甚于英格兰的白垩溪（[[environmental-chemistry/particulates-acid-deposition]]）。

海水则在本性上就不同。其主要离子——盐度 $35$ 时的 $\mathrm{Cl^-}$（$546\ \mathrm{mmol\,kg^{-1}}$）、$\mathrm{Na^+}$（$469$）、$\mathrm{Mg^{2+}}$（$52.8$）、$\mathrm{SO_4^{2-}}$（$28.2$）、$\mathrm{Ca^{2+}}$（$10.3$）、$\mathrm{K^+}$（$10.2$）、$\mathrm{HCO_3^-}$（约 $1.8$）——在整个大洋中几乎以恒定的比例出现（马塞特（Marcet）原理，由迪特马尔（Dittmar）于 1884 年定量证实），因为它们的停留时间（数百万年）远大于海洋的混合时间（约一千年）。因此盐度可以由电导率这样的单一性质测得。次要组分和痕量组分——营养盐、痕量金属、溶解气体——是**非保守的**：它们被生物吸收和释放，随深度和海域而变化。

## 碳酸盐体系

::: definition 碳酸盐体系的分布分数 {#def-alpha}
设溶解无机碳总量为 $\mathrm{C_T} = [\mathrm{H_2CO_3^*}] + [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$，其中 $\mathrm{H_2CO_3^*}$ 表示溶解的 $\mathrm{CO_2(aq)}$ 加上少量真实的 $\mathrm{H_2CO_3}$。以酸解离常数 $K_1 = [\mathrm{H^+}][\mathrm{HCO_3^-}]/[\mathrm{H_2CO_3^*}]$ 和 $K_2 = [\mathrm{H^+}][\mathrm{CO_3^{2-}}]/[\mathrm{HCO_3^-}]$，**分布分数**为
$$
\alpha_0 = \frac{[\mathrm{H^+}]^2}{D},\qquad \alpha_1 = \frac{K_1[\mathrm{H^+}]}{D},\qquad \alpha_2 = \frac{K_1K_2}{D},\qquad D = [\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2,
$$
于是 $[\mathrm{H_2CO_3^*}] = \alpha_0\mathrm{C_T}$，以此类推，且 $\alpha_0 + \alpha_1 + \alpha_2 = 1$。对 $25\ \mathrm{°C}$、离子强度为零的淡水，$\mathrm{p}K_1 = 6.35$、$\mathrm{p}K_2 = 10.33$；$\mathrm{CO_2}$ 的亨利定律常数为 $K_\mathrm{H} = 10^{-1.47}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$（斯图姆与摩根）。海水需要使用条件常数（[[environmental-chemistry/greenhouse-gases]]）。
:::

::: widget plot
f: 1/(1 + 10^(x - p1) + 10^(2*x - p1 - p2)); 1/(10^(p1 - x) + 1 + 10^(x - p2)); 1/(10^(p1 + p2 - 2*x) + 10^(p2 - x) + 1)
x: 3, 13
y: 0, 1.05
sliders: p1=6.35:5.8:6.5:0.01; p2=10.33:8.9:10.4:0.01
labels: \alpha_0\ (\mathrm{H_2CO_3^*}); \alpha_1\ (\mathrm{HCO_3^-}); \alpha_2\ (\mathrm{CO_3^{2-}})
caption: 碳酸盐体系的分布分数对 pH 的曲线。使用淡水常数（$\mathrm{p}K_1 = 6.35$、$\mathrm{p}K_2 = 10.33$）时，碳酸氢根在约 pH $6.4$ 到 $10.3$ 之间占主导——这几乎涵盖了所有天然水体的范围——并且在 pH $7$ 到 $9.7$ 之间占 $\mathrm{C_T}$ 的 $80\ \%$ 以上。把滑块移到海水的条件值（$5.85$、$8.97$），碳酸根离子在 pH $8$ 就已重要，这就是海洋的缓冲在其天然 pH 下得以运转的原因。
:::

体系的行为取决于什么被固定。在**封闭体系**中——一只密封的样品瓶，或与空气隔绝的地下水——$\mathrm{C_T}$ 固定，加入酸或碱只是把碳在三种型体之间重新分配。在与大气平衡的**开放体系**中，固定的是 $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$，而 $\mathrm{C_T} = K_\mathrm{H}p_{\mathrm{CO_2}}/\alpha_0$ 随 pH 急剧上升，因为 $\mathrm{CO_2}$ 不断从气相被吸入。地表水通常介于两者之间：湖泊和河流的 $\mathrm{CO_2}$ 常常**过饱和**，因为有机质的呼吸作用加入 $\mathrm{CO_2}$ 快于它逃逸的速度，于是水向大气脱出 $\mathrm{CO_2}$。

## 碱度

水的 pH 是一种灵敏的指标，却不能很好地表征水的化学性质。真正告诉你水将如何响应酸的输入——酸雨、酸性废水、$\mathrm{CO_2}$ 本身——的是它的碱度。

::: definition 碱度 {#def-alkalinity}
水的**总碱度** $A_\mathrm{T}$ 是它的酸中和容量：把单位体积（或质量）的水滴定到碳酸的化学计量点（约 pH $4.5$）所需强酸的量。对于碱组分为碳酸盐型体、氢氧根以及（海水中）硼酸根的水，
$$
A_\mathrm{T} = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}],
$$
单位为 $\mathrm{eq\,dm^{-3}}$（或 $\mathrm{mol\,kg^{-1}}$）。它计的是相对于**参考水准**——$\mathrm{H_2CO_3^*}$、$\mathrm{H_2O}$、$\mathrm{B(OH)_3}$——质子受体超出质子给体的部分。由电荷平衡，它也等于保守阳离子对保守阴离子的超出量，
$$
A_\mathrm{T} = \left([\mathrm{Na^+}] + [\mathrm{K^+}] + 2[\mathrm{Ca^{2+}}] + 2[\mathrm{Mg^{2+}}] + \ldots\right) - \left([\mathrm{Cl^-}] + 2[\mathrm{SO_4^{2-}}] + [\mathrm{NO_3^-}] + \ldots\right).
$$
给水排水工程中碱度以“以 $\mathrm{CaCO_3}$ 计的 mg/L”表示（$1\ \mathrm{meq\,dm^{-3}} = 50.04\ \mathrm{mg\,dm^{-3}}$（以 $\mathrm{CaCO_3}$ 计））。
:::

::: proposition 碱度的守恒性 {#prop-alk-conservative}
碱度不因 $\mathrm{CO_2}$ 的得失而改变（脱气、呼吸作用，以及在只消耗 $\mathrm{CO_2}$ 的程度上进行的光合作用），并且它按保守方式混合：两种水混合时，混合水的碱度是体积加权的平均值。只有改变保守离子平衡的反应才改变它：强酸或强碱的加入、碳酸盐矿物的溶解或沉淀（每溶解 $1\ \mathrm{mol}$ $\mathrm{CaCO_3}$，$A_\mathrm{T}$ 升高 $2\ \mathrm{eq}$、$\mathrm{C_T}$ 升高 $1\ \mathrm{mol}$）、生物对硝酸根或铵的吸收，以及反硝化和硫酸盐还原等消耗或产生质子的氧化还原反应。
:::

::: proof 碱度的电荷平衡表述 {#proof-alk-conservative}
写出溶液完整的电荷平衡：$\sum z_i[\text{阳离子}] = \sum\lvert z_j\rvert[\text{阴离子}]$。把离子分成保守的一类（其浓度不依赖 pH 或 $\mathrm{C_T}$：$\mathrm{Na^+}$、$\mathrm{Ca^{2+}}$、$\mathrm{Cl^-}$、$\mathrm{SO_4^{2-}}$、……）与酸-碱型体（$\mathrm{H^+}$、$\mathrm{OH^-}$、$\mathrm{HCO_3^-}$、$\mathrm{CO_3^{2-}}$、$\mathrm{B(OH)_4^-}$）。重新排列后，质子转移组合 $[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}]$ 就等于保守电荷超出量。加入 $\mathrm{CO_2}$ 不引入任何离子，所以保守电荷超出量、从而 $A_\mathrm{T}$，保持不变——加入的 $\mathrm{CO_2}$ 只是把碳酸根转化为碳酸氢根并降低 pH。混合对保守离子浓度是线性的，因而对 $A_\mathrm{T}$ 也是线性的。溶解 $\mathrm{CaCO_3}$ 引入一个 $\mathrm{Ca^{2+}}$，即两个当量的保守阳离子电荷。
:::

::: example 由滴定求碱度与溶解无机碳 {#ex-alkalinity}
一份 $100.0\ \mathrm{cm^3}$ 的湖水样品需 $4.20\ \mathrm{cm^3}$ 的 $0.0200\ \mathrm{mol\,dm^{-3}}$ HCl 才能到达 pH $4.5$。其初始 pH 为 $7.50$。求 (a) 以 $\mathrm{meq\,dm^{-3}}$ 和以 $\mathrm{mg\,dm^{-3}}$（$\mathrm{CaCO_3}$ 计）表示的碱度；(b) $\mathrm{C_T}$，使用淡水常数并忽略活度校正。
::: solution
(a) 加入的酸：$4.20\times10^{-3}\ \mathrm{dm^3}\times0.0200 = 8.40\times10^{-5}\ \mathrm{mol}$，溶于 $0.1000\ \mathrm{dm^3}$，故 $A_\mathrm{T} = 8.40\times10^{-4}\ \mathrm{eq\,dm^{-3}} = 0.840\ \mathrm{meq\,dm^{-3}}$，即 $0.840\times50.04 = 42\ \mathrm{mg\,dm^{-3}}$（以 $\mathrm{CaCO_3}$ 计）——一种中等硬度的水。

(b) 在 pH $7.50$，[[#def-alpha]] 给出 $\alpha_1 = 0.933$、$\alpha_2 = 0.0014$（$[\mathrm{H^+}] = 3.16\times10^{-8}$，$D$ 以前两项为主）。于是 $A_\mathrm{T} \approx \mathrm{C_T}(\alpha_1 + 2\alpha_2) + [\mathrm{OH^-}] - [\mathrm{H^+}]$，最后两项（$3.2\times10^{-7}$ 和 $3.2\times10^{-8}$）与 $8.4\times10^{-4}$ 相比可忽略：
$$
\mathrm{C_T} = \frac{8.40\times10^{-4}}{0.933 + 0.0028} = 8.98\times10^{-4}\ \mathrm{mol\,dm^{-3}} .
$$
碳约有 $93\ \%$ 以碳酸氢根存在、$6.6\ \%$ 为溶解的 $\mathrm{CO_2}$。若与空气平衡，溶解 $\mathrm{CO_2}$ 应为 $K_\mathrm{H}p_{\mathrm{CO_2}} = 10^{-1.47}\times4.24\times10^{-4} = 1.43\times10^{-5}\ \mathrm{mol\,dm^{-3}}$；这里却是 $0.066\times8.98\times10^{-4} = 5.9\times10^{-5}$，过饱和四倍——这是湖泊的常见状态，湖泊是大气 $\mathrm{CO_2}$ 的净源。
:::
:::

::: example 酸性支流汇入大河 {#ex-mixing}
一条流经旧矿区的酸性溪流具有 $100\ \mathrm{\mu eq\,dm^{-3}}$ 的净酸度（即 $A_\mathrm{T} = -100\ \mathrm{\mu eq\,dm^{-3}}$，来自溶解的硫酸）。它以 $1:3$ 的流量比汇入一条碱度为 $800\ \mathrm{\mu eq\,dm^{-3}}$ 的大河。求混合水的碱度，以及它与大气平衡（$424\ \mathrm{\mu atm}$、淡水常数、$25\ \mathrm{°C}$）后的 pH。
::: solution
由[[#prop-alk-conservative]]，碱度线性混合：
$$
A_\text{mix} = \frac{1\times(-100) + 3\times800}{4} = 575\ \mathrm{\mu eq\,dm^{-3}} .
$$
混合水在容量意义上仍是碱性的：大河的碳酸氢根中和了酸，释放出 $\mathrm{CO_2}$（$\mathrm{H^+ + HCO_3^- \rightarrow H_2CO_3^* \rightarrow CO_2 + H_2O}$）。这部分 $\mathrm{CO_2}$ 脱出后，水成为 $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$ 的开放体系，又因碳酸氢根占主导，$[\mathrm{HCO_3^-}] \approx A_\text{mix}$：
$$
[\mathrm{H^+}] = \frac{K_1K_\mathrm{H}p_{\mathrm{CO_2}}}{[\mathrm{HCO_3^-}]} = \frac{10^{-6.35}\times10^{-1.47}\times4.24\times10^{-4}}{5.75\times10^{-4}} = 1.12\times10^{-8},
$$
pH $7.95$。混合后、脱气前，pH 会更低，因为释放的 $\mathrm{CO_2}$ 还留在水中；随着水向下游流动，pH 逐渐回升。注意混合**没有**做什么：它没有把两股水的 pH 取平均。pH 是对数型的强度量，从不线性混合；碱度和 $\mathrm{C_T}$ 则会线性混合。
:::
:::

### 方解石溶解与硬水

石灰岩通过与碳酸反应溶解：
$$
\mathrm{CaCO_3(s)} + \mathrm{CO_2(g)} + \mathrm{H_2O(l)} \rightleftharpoons \mathrm{Ca^{2+}(aq)} + 2\,\mathrm{HCO_3^-(aq)} .
$$

::: proposition 与 CO₂ 平衡的方解石 {#prop-calcite-open}
纯水与方解石（$25\ \mathrm{°C}$ 时 $K_\mathrm{sp} = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}] = 10^{-8.48}$）和固定 $p_{\mathrm{CO_2}}$ 的气相平衡，在碳酸氢根占主导的 pH 范围内，有
$$
[\mathrm{Ca^{2+}}] = \left(\frac{K_\mathrm{sp}K_1K_\mathrm{H}\,p_{\mathrm{CO_2}}}{4K_2}\right)^{1/3},
\qquad [\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}] .
$$
溶解钙只按 $p_{\mathrm{CO_2}}$ 的立方根增长。对大气 $p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$，得 $[\mathrm{Ca^{2+}}] = 0.48\ \mathrm{mmol\,dm^{-3}}$（$19\ \mathrm{mg\,dm^{-3}}$）、pH $8.2$（忽略活度系数；计入它们会使钙增大约 $10\ \%$、pH 升高约 $0.1$）。
:::

::: proof 合并四个平衡与一个电荷平衡 {#proof-calcite-open}
总反应是 $\mathrm{CaCO_3 \rightleftharpoons Ca^{2+} + CO_3^{2-}}$（$K_\mathrm{sp}$）、$\mathrm{CO_3^{2-} + H^+ \rightleftharpoons HCO_3^-}$（$1/K_2$）、$\mathrm{CO_2(g) + H_2O \rightleftharpoons H_2CO_3^*}$（$K_\mathrm{H}$）和 $\mathrm{H_2CO_3^* \rightleftharpoons H^+ + HCO_3^-}$（$K_1$）之和，故其平衡常数为
$$
K = \frac{[\mathrm{Ca^{2+}}][\mathrm{HCO_3^-}]^2}{p_{\mathrm{CO_2}}} = \frac{K_\mathrm{sp}K_1K_\mathrm{H}}{K_2} .
$$
电荷平衡：$2[\mathrm{Ca^{2+}}] + [\mathrm{H^+}] = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{OH^-}]$。pH $8$ 附近小项很小，剩下 $[\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}]$。代入得 $4[\mathrm{Ca^{2+}}]^3 = Kp_{\mathrm{CO_2}}$，即所求。数值上 $K = 10^{-8.48-6.35-1.47+10.33} = 10^{-5.97}$；取 $p = 4.24\times10^{-4}$，$[\mathrm{Ca^{2+}}]^3 = 10^{-5.97}\times4.24\times10^{-4}/4 = 1.14\times10^{-10}$，$[\mathrm{Ca^{2+}}] = 4.84\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。于是 $[\mathrm{H^+}] = K_1K_\mathrm{H}p/[\mathrm{HCO_3^-}] = 10^{-7.82}\times4.24\times10^{-4}/9.69\times10^{-4} = 6.6\times10^{-9}$，pH $8.18$；该 pH 下 $[\mathrm{CO_3^{2-}}]/[\mathrm{HCO_3^-}] = 0.007$，近似成立。
:::

土壤空气中的 $\mathrm{CO_2}$ 远高于大气——常达 $1$–$10\ \%$——因为根系和微生物的呼吸。因此在 $p_{\mathrm{CO_2}} = 10^{-2}\ \mathrm{atm}$ 下渗滤过石灰岩的地下水约含 $1.4\ \mathrm{mmol\,dm^{-3}}$ 的钙（立方根标度：因子 $(10^{-2}/4.24\times10^{-4})^{1/3} = 2.9$），pH $7.3$。当它从泉水涌出并脱气到大气 $p_{\mathrm{CO_2}}$ 时便成为过饱和，沉淀出方解石——这正是钙华、钟乳石以及硬水地区水壶水垢的成因。**硬度**是 $[\mathrm{Ca^{2+}}] + [\mathrm{Mg^{2+}}]$ 之和（也以 $\mathrm{mg\,dm^{-3}}$ $\mathrm{CaCO_3}$ 报告），是个麻烦（水垢、皂垢），却不是健康危害。

::: warning pH 不是碱度，“碱性”也不等于“高碱度” {#warn-ph-alk}
两股 pH 相同的水，碱度可以相差一百倍，它们抗酸的能力也就相差一百倍。一座 pH $6.8$、$A_\mathrm{T} = 20\ \mathrm{\mu eq\,dm^{-3}}$ 的花岗岩湖泊，被区区几十微当量的酸就能压到 pH $5$ 以下；而一条 pH $7.8$、$A_\mathrm{T} = 4\ \mathrm{meq\,dm^{-3}}$ 的白垩溪对同样的输入几乎无感。反过来，一股水可以 pH 高于 $7$ 而显“碱性”（因为晴朗的下午光合作用消耗了 $\mathrm{CO_2}$），碱度却不高。pH 告诉你酸-碱状态的**强度**；碱度告诉你**容量**。酸化监测计划因此测定碱度或酸中和容量，而不只是 pH（[[environmental-chemistry/environmental-monitoring]]）。
:::

## 溶解氧与水体的氧化还原状态

溶解氧是水质最重要的单一指标。其溶解度服从亨利定律：$25\ \mathrm{°C}$ 时 $K_\mathrm{H}(\mathrm{O_2}) = 1.26\times10^{-3}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$，而 $1\ \mathrm{atm}$ 下被水饱和的空气中氧的分压为 $0.2095\times(1 - 0.0313) = 0.203\ \mathrm{atm}$，故饱和浓度为 $2.56\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 8.2\ \mathrm{mg\,dm^{-3}}$。$10\ \mathrm{°C}$ 时升至约 $11\ \mathrm{mg\,dm^{-3}}$，海水中更低（“盐析”）。这是一个很小的储库：仅仅氧化 $7.7\ \mathrm{mg\,dm^{-3}}$ 的葡萄糖（$\mathrm{C_6H_{12}O_6 + 6\,O_2 \rightarrow 6\,CO_2 + 6\,H_2O}$，每克耗 $192/180 = 1.07\ \mathrm{g}$ $\mathrm{O_2}$）就把它用光。因此污水的**生化需氧量**（BOD）——微生物在 $20\ \mathrm{°C}$ 下五天消耗的氧——才是其污染力的关键度量，而营养盐驱动的藻类水华（**富营养化**）死亡分解后，可以把湖泊和近海底层水的氧消耗殆尽。

要描述氧耗尽之后会发生什么，我们需要氧化还原条件的定量度量。

::: definition pe 与氧化还原强度 {#def-pe}
把氧化还原半反应写成还原形式：$\mathrm{Ox} + n\,\mathrm{e^-} \rightleftharpoons \mathrm{Red}$（需要时加上质子），并定义 $\mathrm{pe} = -\log_{10}a_{\mathrm{e^-}}$，一种形式上的电子活度。于是
$$
\mathrm{pe} = \mathrm{pe}^\circ + \frac{1}{n}\log_{10}\frac{\{\mathrm{Ox}\}}{\{\mathrm{Red}\}},
\qquad
\mathrm{pe}^\circ = \frac{\log_{10}K}{n} = \frac{FE^\circ}{2.303RT} = \frac{E^\circ}{0.05916\ \mathrm{V}}\ (\text{于 } 298\ \mathrm{K}),
$$
且 $\mathrm{pe} = E_\mathrm{H}/0.05916\ \mathrm{V}$，其中 $E_\mathrm{H}$ 是氢标度上的电极电势。pe 高为氧化性，pe 低为还原性。对涉及质子的半反应，引用 $\mathrm{pe}^\circ(\mathrm{W})$ 很方便，即 pH $7$、其余物种活度为 $1$ 时的取值。
:::

水的 pe 受水本身稳定范围的限制。在氧化极限，$\frac{1}{4}\mathrm{O_2(g)} + \mathrm{H^+} + \mathrm{e^-} \rightleftharpoons \frac{1}{2}\mathrm{H_2O}$（$\mathrm{pe}^\circ = 20.75$）给出
$$
\mathrm{pe} = 20.75 - \mathrm{pH} + \tfrac{1}{4}\log_{10}p_{\mathrm{O_2}} ;
$$ {#eq-pe-upper}
在还原极限，$\mathrm{H^+} + \mathrm{e^-} \rightleftharpoons \frac{1}{2}\mathrm{H_2(g)}$（$\mathrm{pe}^\circ = 0$）给出 $\mathrm{pe} = -\mathrm{pH} - \frac{1}{2}\log_{10}p_{\mathrm{H_2}}$。pH $7$ 下与空气平衡的水有 $\mathrm{pe} = 13.75 + \frac{1}{4}\log0.21 = 13.6$；一座产甲烷的缺氧沉积物接近 $\mathrm{pe} = -4$。

::: widget plot
f: 20.75 - x; -x; 14.9 - 1.25*x; 4.25 - 1.125*x
x: 0, 14
y: -14, 21
labels: \mathrm{O_2/H_2O}\ (p_{\mathrm{O_2}} = 1); \mathrm{H_2O/H_2}\ (p_{\mathrm{H_2}} = 1); \mathrm{NO_3^-/NH_4^+}\ (\text{等活度}); \mathrm{SO_4^{2-}/HS^-}\ (\text{等活度})
caption: pe–pH 图。水稳定在最上方的直线（$\mathrm{O_2}$ 逸出）与第二条直线（$\mathrm{H_2}$ 逸出）之间，两条直线斜率都是 $-1$，因为每个电子伴随一个质子。其余直线是氧化型与还原型活度相等的边界：硝酸根/铵（$\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$，斜率 $-10/8$）与硫酸根/硫氢根（$\mathrm{SO_4^{2-} + 9\,H^+ + 8\,e^- \rightleftharpoons HS^- + 4\,H_2O}$，斜率 $-9/8$）。直线之上氧化型占主导。天然水体的 pe 从靠近最上方的直线（地表水）一直分布到靠近最下方的直线（产甲烷沉积物）。
:::

### 氧化还原阶梯

当有机质在与大气隔绝的水体或沉积物中分解时，微生物按自由能产率递减的顺序利用可用的氧化剂——这一顺序与氧化剂半反应 $\mathrm{pe}^\circ(\mathrm{W})$ 递减的顺序相同（pH $7$、$25\ \mathrm{°C}$ 的数值取自斯图姆与摩根的《水化学》（*Aquatic Chemistry*））：

| 氧化剂 → 产物 | $\mathrm{pe}^\circ(\mathrm{W})$ |
|---|---|
| $\mathrm{O_2 \rightarrow H_2O}$（好氧呼吸） | $+13.75$ |
| $\mathrm{NO_3^- \rightarrow N_2}$（反硝化） | $+12.65$ |
| $\mathrm{MnO_2(s) \rightarrow Mn^{2+}}$（锰还原，按 $10^{-3}\ \mathrm{M}$ 碳酸氢根下以 $\mathrm{MnCO_3}$ 计） | $+8.5$ |
| $\mathrm{NO_3^- \rightarrow NH_4^+}$ | $+6.15$ |
| $\mathrm{FeOOH(s) \rightarrow Fe^{2+}}$（铁还原，按 $10^{-3}\ \mathrm{M}$ 碳酸氢根下以 $\mathrm{FeCO_3}$ 计） | $-0.8$ |
| $\mathrm{SO_4^{2-} \rightarrow HS^-}$（硫酸盐还原） | $-3.75$ |
| $\mathrm{CO_2 \rightarrow CH_4}$（产甲烷作用） | $-4.13$ |
| $\mathrm{H^+ \rightarrow H_2}$ | $-7.00$ |

有机质本身——以 $\mathrm{CH_2O}$ 被氧化为 $\mathrm{CO_2}$ 计——位于 $\mathrm{pe}^\circ(\mathrm{W}) = -8.2$ 附近，所以它上面的每一种氧化剂都能被利用，且一种比一种产能更少。由此产生的**氧化还原序列**在时间上（淹水的稻田，或整个夏天停滞不动的湖泊）和空间上（沉积物的深度剖面，或污染地下水羽流的流动路径上）都能观察到：先是氧消失，然后是硝酸根，接着溶解的锰和铁出现，然后是硫化物，最后是甲烷。这张阶梯是热力学的，但它由生物执行：微生物一次只专精一种氧化剂，并按能量产率的顺序相互竞争胜出。

::: example 水体的 pe 与氮的形态 {#ex-pe-nitrogen}
(a) 求 pH $8.0$、与空气平衡的湖水的 pe。(b) 对半反应 $\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$（$\log_{10}K = 119.2$），求该水中平衡时的比值 $[\mathrm{NO_3^-}]/[\mathrm{NH_4^+}]$。(c) 评论。
::: solution
(a) 由[[#eq-pe-upper]]，$\mathrm{pe} = 20.75 - 8.0 + \frac{1}{4}\log_{10}0.21 = 12.75 - 0.17 = 12.58$。

(b) $\mathrm{pe}^\circ = 119.2/8 = 14.90$，且 $\mathrm{pe} = 14.90 + \frac{1}{8}\log_{10}\left(\frac{[\mathrm{NO_3^-}][\mathrm{H^+}]^{10}}{[\mathrm{NH_4^+}]}\right) = 14.90 - \frac{10}{8}\mathrm{pH} + \frac{1}{8}\log_{10}\frac{[\mathrm{NO_3^-}]}{[\mathrm{NH_4^+}]}$。在 pH $8.0$：$14.90 - 10.00 = 4.90$，于是
$$
\log_{10}\frac{[\mathrm{NO_3^-}]}{[\mathrm{NH_4^+}]} = 8(12.58 - 4.90) = 61.4 .
$$
(c) 在与空气平衡时，铵应低六十个数量级以致不存在。然而充氧的湖泊中却常见微摩尔级的铵，来自腐烂有机质的释放和动物的排泄。这一矛盾是动力学的：硝化作用缓慢且由微生物介导，天然水体中的许多氧化还原电对彼此并不平衡。因此，单一的“水体 pe”只是对占主导的快电对（氧化性水中是 $\mathrm{O_2}$；缺氧水中常是 $\mathrm{Fe^{3+}/Fe^{2+}}$ 或硫化物）有用的理想化，而不是所有电对共同拥有的一种实测性质。铂电极测得的 $E_\mathrm{H}$ 主要响应铁电对，只在缺氧、富铁的水中才可解释。
:::
:::

## 天然水体中的金属：水解、配位与形态

金属在水中的行为——溶解度、迁移性、生物有效性和毒性——取决于它的化学形态（**形态**），而不是总浓度。主要过程有：

- **水解。**高电荷阳离子结合氢氧根或从配位水上失去质子：$\mathrm{Fe(H_2O)_6^{3+} \rightleftharpoons Fe(H_2O)_5(OH)^{2+} + H^+}$，如此继续直到生成不溶的氢氧化物。铁(III)和铝在中性 pH 下几乎不溶，而它们的二价对应离子（Fe²⁺）以及碱金属、碱土金属离子则可溶。
- 被无机配体（$\mathrm{Cl^-}$、$\mathrm{CO_3^{2-}}$、$\mathrm{SO_4^{2-}}$、$\mathrm{OH^-}$）**配位**，而往往更强地结合天然有机质（腐殖酸和富里酸）与生物成因配体。海水中，超过 $99\ \%$ 的溶解铜被强有机配体束缚，自由 $\mathrm{Cu^{2+}}$ 的活度比总浓度低好几个数量级。
- **吸附**到颗粒表面——铁、锰的（氧）氢氧化物、黏土、有机质——对阳离子通常随 pH 升高而增强（[[environmental-chemistry/soils-remediation]]）。
- **氧化还原转化**：以铬酸根存在的铬(VI)可迁移且有毒，铬(III)则大多不溶；砷(III)比砷(V)更易迁移、毒性更强；汞(II)可被缺氧沉积物中的硫酸盐还原菌甲基化为甲基汞，后者发生生物累积（[[environmental-chemistry/pollutants-fate]]）。

**自由离子活度模型**是一种经验概括：对许多金属，水生生物的吸收和毒性与自由离子活度的相关性好于与总溶解浓度的相关性；它是监管上“生物配体模型”的基础，这类模型按局部的 pH、硬度和溶解有机碳来修订铜和锌的水质标准。

::: example 酸化溶出的铝 {#ex-aluminium}
三水铝石的溶解平衡为 $\mathrm{Al(OH)_3(s) + 3\,H^+ \rightleftharpoons Al^{3+} + 3\,H_2O}$，$25\ \mathrm{°C}$ 时 $\log_{10}{}^{*}K_\mathrm{s0} = 8.11$。忽略羟基配合物，求 pH $6.0$、$5.0$ 和 $4.5$ 时平衡的自由 $\mathrm{Al^{3+}}$ 浓度，以 $\mathrm{\mu g\,dm^{-3}}$ 计。
::: solution
由平衡关系，$[\mathrm{Al^{3+}}] = {}^{*}K_\mathrm{s0}[\mathrm{H^+}]^3$，即 $\log_{10}[\mathrm{Al^{3+}}] = 8.11 - 3\,\mathrm{pH}$：

| pH | $\log_{10}[\mathrm{Al^{3+}}]$ | $[\mathrm{Al^{3+}}]/\mathrm{\mu g\,dm^{-3}}$ |
|---|---|---|
| $6.0$ | $-9.89$ | $0.0035$ |
| $5.0$ | $-6.89$ | $3.5$ |
| $4.5$ | $-5.39$ | $110$ |

（乘以 $26.98\ \mathrm{g\,mol^{-1}}$ 换算。）每降低一个 pH 单位，自由铝升高一千倍。pH 低于 $5$ 左右时，从土壤矿物释放的无机单体铝达到对鱼有害的浓度（危害机理：它在酸性较弱的鳃表面沉淀并聚合，破坏气体交换和离子调节），这是酸化湖泊中鱼类消失的主要机制。羟基配合物 $\mathrm{Al(OH)^{2+}}$、$\mathrm{Al(OH)_2^+}$ 和 $\mathrm{Al(OH)_4^-}$ 在此被忽略，它们会进一步抬高**总**溶解铝，尤其在中性和碱性 pH 附近，所以真实的溶解度极小值位于 pH $6$ 附近。
:::
:::

::: example 多少有机质能耗尽氧化剂？ {#ex-electron-budget}
某浅层地下水含 $8.0\ \mathrm{mg\,dm^{-3}}$ 的溶解 $\mathrm{O_2}$ 和 $10\ \mathrm{mg\,dm^{-3}}$ 的硝酸盐氮（$\mathrm{NO_3^-}$–N）。要两者都耗尽，必须氧化多少有机质（以 $\mathrm{CH_2O}$ 表示）？设硝酸根还原为 $\mathrm{N_2}$。若还有更多有机碳可利用，接下来会发生什么？
::: solution
数**电子当量**。$\mathrm{O_2}$ 接受 $4\ \mathrm{e^-}$：$8.0/32.00 = 0.250\ \mathrm{mmol}$，即每 $\mathrm{dm^3}$ $1.00\ \mathrm{meq}$。硝酸根的 N 从 $+5$ 到 $0$ 接受 $5\ \mathrm{e^-}$：$10/14.007 = 0.714\ \mathrm{mmol}$ N，即 $3.57\ \mathrm{meq}$。总计 $4.57\ \mathrm{meq\,dm^{-3}}$。$\mathrm{CH_2O}$ 中的有机碳（氧化态 $0$）氧化为 $\mathrm{CO_2}$ 给出 $4\ \mathrm{e^-}$，故需 $4.57/4 = 1.14\ \mathrm{mmol\,dm^{-3}}$ 的 $\mathrm{CH_2O}$，即 $1.14\times30.03 = 34\ \mathrm{mg\,dm^{-3}}$。支配这片农业地下水氧化容量的是硝酸根而非氧。若有更多有机碳，下一批阶梯——含水层颗粒上的锰、铁氧化物——就会被进攻，释放出溶解的 $\mathrm{Mn^{2+}}$ 和 $\mathrm{Fe^{2+}}$（以及吸附在铁氧化物上的砷，这是一些地下水砷污染的机制），然后硫酸盐被还原为硫化物。这类电子账目正是水文地质学家估算含水层降解污染物羽流能力的方法。
:::
:::

::: widget plot
f: 8.11 - 3*x + log(26.98e6)/log(10); log(26.98e6*(10^(8.11 - 3*x) + 10^(8.11 - 4.99 - 2*x) + 10^(8.11 - 10.1 - x) + 10^(8.11 - 22.7 + x)))/log(10)
x: 3, 9
y: -4, 6
labels: \log_{10}[\mathrm{Al^{3+}}]/(\mathrm{\mu g\,dm^{-3}}); \log_{10}[\mathrm{Al}]_\text{tot}/(\mathrm{\mu g\,dm^{-3}})
caption: 与三水铝石平衡的铝的溶解度对 pH 的曲线（对数标度，以 $\mathrm{\mu g\,dm^{-3}}$ 计）：只有自由离子（斜率 $-3$，出自[[#ex-aluminium]]），以及计入羟基配合物 $\mathrm{Al(OH)^{2+}}$、$\mathrm{Al(OH)_2^+}$ 和 $\mathrm{Al(OH)_4^-}$ 的总量（采用示意的羟基配合常数 $\log{}^{*}\beta_1 = -4.99$、$\log{}^{*}\beta_2 = -10.1$、$\log{}^{*}\beta_4 = -22.7$）。总量在 pH $6$–$6.5$ 附近有极小值，两侧都上升——铝是两性的——这就是为什么水处理中作絮凝剂的铝盐要在 pH $6$–$7$ 投加（[[environmental-chemistry/soils-remediation]]）。
:::

::: quiz
一口垃圾填埋场附近的地下水井没有溶解氧和硝酸根，溶解铁高，硫酸根略有一点，没有硫化物也没有甲烷。它在氧化还原阶梯的哪个位置？
- [ ] 好氧：含氧的水中总有溶解铁。
- [ ] 产甲烷：填埋场会产甲烷。
- [x] 铁还原带：氧和硝酸根（以及锰氧化物）已耗尽，铁(III)氧化物正在被还原为可溶的 $\mathrm{Fe^{2+}}$，但硫酸盐还原尚未开始。
- [ ] 硫酸盐还原带，因为硫酸根低。
::: solution
顺着阶梯看：$\mathrm{O_2}$ 没了，$\mathrm{NO_3^-}$ 没了，$\mathrm{Fe^{2+}}$ 存在说明铁这一级正在活动；硫化物要到硫酸盐还原开始才会出现，甲烷只有硫酸盐耗尽之后才会有。硫酸根低而非零、又无硫化物，与铁还原带相容（源水中的硫酸根本来可能就低）。填埋场的污染物羽流沿流动路径呈现这种分带，而分带支配着氯代溶剂和砷等氧化还原敏感污染物的归趋。
:::
:::

::: history
把平衡热力学系统地用于天然水体，始于西伦（Lars Gunnar Sillén）1961 年的论文《海水的物理化学》（*The physical chemistry of sea water*），该文把大洋当作与沉积物平衡的体系来处理。加雷尔斯（Garrels）与克里斯特（Christ）的《溶液、矿物与平衡》（*Solutions, Minerals, and Equilibria*，1965）让 pe–pH（Eh–pH）图成为地球化学的标准工具，这建立在普贝（Pourbaix）1940 年代电化学图的基础上。斯图姆（Stumm）与摩根（Morgan）的《水化学》（*Aquatic Chemistry*，1970；第 3 版 1996）把天然水体的酸-碱、配位、氧化还原和表面化学熔铸成今天所教的这门学科。把碱度作为保守性质的概念，以及格兰（Gran，1952）法对其的精确滴定，支撑了其后数十年的海洋碳测量。
:::

## 后续内容

有机污染物在水、沉积物、空气和生物之间的分配，以及氧化还原分带在其降解中的作用，在 [[environmental-chemistry/pollutants-fate]] 中讨论。金属在矿物表面的吸附、水处理的化学（铝盐和铁盐絮凝、软化、消毒）以及氧化还原敏感污染物的修复，接在 [[environmental-chemistry/soils-remediation]]。分析方法——碱度滴定、离子色谱、痕量金属的 ICP-MS 以及形态分析技术——属于 [[environmental-chemistry/environmental-monitoring]] 与 [[analytical-chemistry/atomic-spectrometry]]。

::: summary
- 天然水体的溶质来自风化；碳酸盐地貌给出硬的、缓冲好的水，硅酸盐地貌给出软的、脆弱的水；海水的主要离子比例恒定。
- 碳酸盐体系：分布分数 $\alpha_0$、$\alpha_1$、$\alpha_2$，$\mathrm{p}K_1 = 6.35$、$\mathrm{p}K_2 = 10.33$（淡水，$25\ \mathrm{°C}$）；碳酸氢根在天然水体中占主导。开放体系固定 $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$，封闭体系固定 $\mathrm{C_T}$。
- 碱度是酸中和容量，$[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + \ldots - [\mathrm{H^+}]$，等于保守电荷超出量；不因 $\mathrm{CO_2}$ 交换而改变，并按保守方式混合。
- 暴露于 $\mathrm{CO_2}$ 的方解石给出 $[\mathrm{Ca^{2+}}] = (K_\mathrm{sp}K_1K_\mathrm{H}p/4K_2)^{1/3}$：空气中为 $0.48\ \mathrm{mmol\,dm^{-3}}$、pH $8.2$；土壤 $\mathrm{CO_2}$ 造成硬的地下水，脱气时沉淀方解石。
- 溶解氧的饱和浓度只有 $8.2\ \mathrm{mg\,dm^{-3}}$（$25\ \mathrm{°C}$），所以有机负荷（BOD）和富营养化很容易造成缺氧。
- pe $= \mathrm{pe}^\circ + \frac{1}{n}\log(\mathrm{Ox/Red})$；水稳定在 $\mathrm{pe} = 20.75 - \mathrm{pH}$ 与 $\mathrm{pe} = -\mathrm{pH}$ 之间。氧化剂按 $\mathrm{O_2} > \mathrm{NO_3^-} > \mathrm{Mn(IV)} > \mathrm{Fe(III)} > \mathrm{SO_4^{2-}} > \mathrm{CO_2}$ 的顺序被利用，尽管许多电对彼此并不平衡。
- 金属的行为取决于形态——水解、配位、吸附、氧化还原；pH $6$ 以下自由 $\mathrm{Al^{3+}}$ 每降一个 pH 单位升高一千倍，是酸化湖泊中的主要毒物。
:::

## 练习

::: exercise 曝气海水的 pe {level=1 check="12.5"}
用[[#eq-pe-upper]]求 pH $8.1$、与空气平衡（$p_{\mathrm{O_2}} = 0.21\ \mathrm{atm}$）的表层海水的 pe。（填入 pe，保留三位有效数字。）
::: solution
$\mathrm{pe} = 20.75 - 8.1 + \frac{1}{4}\log_{10}0.21 = 12.65 - 0.169 = 12.5$。对应的电势为 $E_\mathrm{H} = 0.05916\times12.48 = 0.74\ \mathrm{V}$ ——不过，正如[[#ex-pe-nitrogen]]所警告的，氧化性海水中的铂电极达不到这个值，因为 $\mathrm{O_2}$ 电对的电极反应很迟钝。
:::
:::

::: exercise 中性 pH 下碳酸氢根的份额 {level=1 check="82"}
用[[#def-alpha]]的淡水常数，pH $7.00$ 时碳酸氢根占 $\mathrm{C_T}$ 的百分之多少？（填入百分数，保留两位有效数字。）
::: solution
$[\mathrm{H^+}] = 10^{-7}$；$D = 10^{-14} + 10^{-6.35}\times10^{-7} + 10^{-16.68} = 10^{-14} + 4.47\times10^{-14} + 2.1\times10^{-17} = 5.47\times10^{-14}$。于是 $\alpha_1 = 4.47\times10^{-14}/5.47\times10^{-14} = 0.817$，即 $82\ \%$；$\alpha_0 = 18\ \%$，$\alpha_2 = 0.04\ \%$。
:::
:::

::: exercise 由滴定求碱度 {level=1 check="1.26"}
$50.0\ \mathrm{cm^3}$ 河水样品需 $6.30\ \mathrm{cm^3}$ 的 $0.0100\ \mathrm{mol\,dm^{-3}}$ HCl 到达 pH $4.5$。求总碱度。（$A_\mathrm{T}$ 以 $\mathrm{meq\,dm^{-3}}$ 计，保留三位有效数字。）
::: solution
$6.30\times10^{-3}\times0.0100 = 6.30\times10^{-5}\ \mathrm{mol}$ 酸，溶于 $0.0500\ \mathrm{dm^3}$：$A_\mathrm{T} = 1.26\times10^{-3}\ \mathrm{eq\,dm^{-3}} = 1.26\ \mathrm{meq\,dm^{-3}}$，即 $63\ \mathrm{mg\,dm^{-3}}$（以 $\mathrm{CaCO_3}$ 计）。碱度低时，为准确起见，终点用格拉恩（Gran）图定位而不取固定 pH，因为化学计量点的 pH 取决于 $\mathrm{C_T}$。
:::
:::

::: exercise 石灰岩中的地下水 {level=2 check="1.4"}
用[[#prop-calcite-open]]求 $25\ \mathrm{°C}$ 下与方解石平衡、土壤空气 $p_{\mathrm{CO_2}} = 1.0\times10^{-2}\ \mathrm{atm}$ 的水的钙浓度及其 pH。（$[\mathrm{Ca^{2+}}]$ 以 $\mathrm{mmol\,dm^{-3}}$ 计，保留两位有效数字。）
::: solution
$[\mathrm{Ca^{2+}}]^3 = 10^{-5.97}\times1.0\times10^{-2}/4 = 2.68\times10^{-9}$，故 $[\mathrm{Ca^{2+}}] = 1.39\times10^{-3}\ \mathrm{mol\,dm^{-3}} = 1.4\ \mathrm{mmol\,dm^{-3}}$（$56\ \mathrm{mg\,dm^{-3}}$；硬度 $139\ \mathrm{mg\,dm^{-3}}$（以 $\mathrm{CaCO_3}$ 计））。于是 $[\mathrm{HCO_3^-}] = 2.78\times10^{-3}$，$[\mathrm{H^+}] = K_1K_\mathrm{H}p/[\mathrm{HCO_3^-}] = 10^{-7.82}\times10^{-2}/2.78\times10^{-3} = 5.45\times10^{-8}$，pH $7.26$。$\mathrm{CO_2}$ 增至二十四倍，钙只增至 $2.9$ 倍：立方根定律。
:::
:::

::: exercise 排污口下游的溶解氧低谷 {level=2 check="2.4"}
一股本无溶解氧、BOD 为 $20\ \mathrm{mg\,dm^{-3}}$ 的污水排入氧饱和于 $8.0\ \mathrm{mg\,dm^{-3}}$ 的河流，污水与河水的体积比为 1 比 4（河水自身的 BOD 可忽略）。若全部 BOD 在任何复氧之前就被耗尽，还剩多少溶解氧？（以 $\mathrm{mg\,dm^{-3}}$ 计，保留两位有效数字。）
::: solution
混合后 $\mathrm{DO} = (4\times8.0 + 1\times0)/5 = 6.4\ \mathrm{mg\,dm^{-3}}$，$\mathrm{BOD} = 20/5 = 4.0\ \mathrm{mg\,dm^{-3}}$。全部耗尽后剩 $6.4 - 4.0 = 2.4\ \mathrm{mg\,dm^{-3}}$——低到足以威胁鱼类。真实河流中，BOD 在数天内被消耗，同时氧从大气重新溶入，形成经典的“溶解氧低谷”曲线，由斯特里特-菲尔普斯（Streeter–Phelps）方程描述，那是一对耦合的一级过程。
:::
:::

::: exercise 硬水的溶解无机碳 {level=2 check="2.50"}
某水 pH $8.30$，总碱度 $2.50\ \mathrm{meq\,dm^{-3}}$。用淡水常数求 $\mathrm{C_T}$。（$\mathrm{C_T}$ 以 $\mathrm{mmol\,dm^{-3}}$ 计，保留三位有效数字。）
::: solution
pH $8.30$ 时：$\alpha_1 = 0.980$，$\alpha_2 = 0.00914$。$[\mathrm{OH^-}] = 2.0\times10^{-6}$、$[\mathrm{H^+}] = 5\times10^{-9}$，都很小。故 $\mathrm{C_T} = (2.50\times10^{-3} - 2.0\times10^{-6})/(0.980 + 2\times0.00914) = 2.50\times10^{-3}\ \mathrm{mol\,dm^{-3}}$。这个 pH 就是“酚酞终点”，碱度与 $\mathrm{C_T}$ 几乎相等，因为碳几乎全部是以一个当量计的碳酸氢根。
:::
:::

::: exercise 硝酸根还是铵？ {level=3 check="5.5"}
(a) 由 $\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$（$\log_{10}K = 119.2$）导出 $[\mathrm{NO_3^-}] = [\mathrm{NH_4^+}]$ 的 pe–pH 直线，并证明它给出 $\mathrm{pe}^\circ(\mathrm{W}) = 6.15$。(b) pH $7.5$ 时两者相等对应什么 pe？(c) 一片 pH $7.5$ 的地下水实测 $E_\mathrm{H}$ 为 $+0.20\ \mathrm{V}$。平衡时应以哪种型体为主？（填入 (b) 的 pe，保留两位有效数字。）
::: solution
(a) $\log K = \log[\mathrm{NH_4^+}] - \log[\mathrm{NO_3^-}] + 10\,\mathrm{pH} + 8\,\mathrm{pe}$（因为 $\log[\mathrm{H^+}]^{-10} = 10\,\mathrm{pH}$ 且 $\log a_{\mathrm{e^-}}^{-8} = 8\,\mathrm{pe}$）。浓度相等时，$8\,\mathrm{pe} = 119.2 - 10\,\mathrm{pH}$，即 $\mathrm{pe} = 14.90 - 1.25\,\mathrm{pH}$。pH $7$ 时：$14.90 - 8.75 = 6.15$。(b) pH $7.5$ 时：$14.90 - 9.375 = 5.53 \approx 5.5$。(c) $\mathrm{pe} = 0.20/0.05916 = 3.4$，低于 $5.5$，所以平衡时铵应为主，高出 $10^{8(5.53 - 3.38)} = 10^{17}$ 倍。（若硝酸根依然存在，说明水体内部并未达到氧化还原平衡——这在地下水中很常见，因为硝酸根的还原需要微生物种群和电子供料的供应。）
:::
:::

::: exercise 泉水处的方解石沉淀 {level=3 check="90"}
前面练习中的地下水（$[\mathrm{Ca^{2+}}] = 1.39\ \mathrm{mmol\,dm^{-3}}$、$[\mathrm{HCO_3^-}] = 2.78\ \mathrm{mmol\,dm^{-3}}$）从泉水涌出，与方解石和大气（$p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$）达到平衡。假设沉淀反应 $\mathrm{Ca^{2+} + 2\,HCO_3^- \rightarrow CaCO_3(s) + CO_2(g) + H_2O}$ 是唯一的反应，且终态服从[[#prop-calcite-open]]，问每立方分米沉淀多少方解石？（质量以 mg 计，保留两位有效数字。）
::: hint
按化学计量，$[\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}]$ 全程保持，所以终态钙就是大气 $p_{\mathrm{CO_2}}$ 下的开放体系值。
:::
::: solution
每个被除去的 $\mathrm{Ca^{2+}}$ 带走两个 $\mathrm{HCO_3^-}$，保持了[[#prop-calcite-open]]所假设的比值 $[\mathrm{HCO_3^-}]/[\mathrm{Ca^{2+}}] = 2$。因此终态为 $[\mathrm{Ca^{2+}}] = 0.484\ \mathrm{mmol\,dm^{-3}}$，沉淀的方解石为 $1.389 - 0.484 = 0.905\ \mathrm{mmol\,dm^{-3}}$，即 $0.905\times100.09 = 90\ \mathrm{mg\,dm^{-3}}$。碱度下降 $1.81\ \mathrm{meq\,dm^{-3}}$——与[[#prop-alk-conservative]]一致，因为碳酸盐矿物的沉淀正是少数改变碱度的过程之一。实践中沉淀很慢，需要成核位点（苔藓、藻类、管壁），所以泉水在下游一段距离内仍保持过饱和。
:::
:::

::: exercise 酸化溪流中的铝 {level=2 check="14"}
用[[#ex-aluminium]]的三水铝石平衡，求 pH $4.8$ 时自由 $\mathrm{Al^{3+}}$ 的浓度。（以 $\mathrm{\mu g\,dm^{-3}}$ 计，保留两位有效数字。）
::: solution
$\log_{10}[\mathrm{Al^{3+}}] = 8.11 - 14.4 = -6.29$，故 $[\mathrm{Al^{3+}}] = 5.13\times10^{-7}\ \mathrm{mol\,dm^{-3}} = 5.13\times10^{-7}\times26.98\times10^{6}\ \mathrm{\mu g\,dm^{-3}} = 14\ \mathrm{\mu g\,dm^{-3}}$。
:::
:::
