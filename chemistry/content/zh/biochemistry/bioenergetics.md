一个静息成年人每天转化大约四十千克的三磷酸腺苷（ATP），而任一时刻体内保有的 ATP 远不足一百克。从早餐到晚餐，每个 ATP 分子都被制造又花掉数百次，而细胞把 ATP 与其水解产物之比保持在离平衡如此远的地方，以至于每次水解所释放的自由能远比教科书上的数值 $-30.5\ \mathrm{kJ\,mol^{-1}}$ 多。这一条观察就包含了本章的全部主题。生物是维持在远离化学平衡的稳态中的开放系统；它们从食物或光中获得的自由能被储存在少数几种化学"货币"里——ATP 之于磷酰基，NADH 和 NADPH 之于电子，以及跨膜的质子梯度——并被花掉，去驱动那些本来会反向进行的反应。要做好这本账，我们需要三件工具：一个适合 pH 7 水溶液的标准态，标准自由能变与实际自由能变之间的关系，以及自由能与还原电势的联系。三者都是[[general-chemistry-2/entropy-free-energy]]和[[thermodynamics/reaction-equilibrium]]中的普通热力学，只是改成了细胞内部的条件。

## 生命体系中的自由能

细胞不活在平衡上；处在平衡的细胞就是死的。葡萄糖和氧气进，二氧化碳和水出，中间代谢物的浓度大致恒定，因为每一种被生成的速度恰好等于被消耗的速度。这是**稳态**，不是平衡，这一区分对下面的一切都至关重要。在平衡时每个反应都有 $\Delta_\mathrm{r}G = 0$，什么也驱动不了；在稳态中，一条途径的各个反应都有 $\Delta_\mathrm{r}G < 0$，于是净流量向前流动，而释放的自由能或者以热的形式耗散，或者通过偶联另一个过程被捕获。

第二定律仍支配每一步。在恒温恒压下，反应自发变化的方向由吉布斯自由能变 $\Delta_\mathrm{r}G$ 的符号决定——不是由标准值 $\Delta_\mathrm{r}G^\circ$，也不是由焓。标准吉布斯自由能为正的反应，只要产物被移走得足够快，就完全可正向进行，而这正是许多代谢步骤的工作方式。第一件工作因此是说清楚生物化学家用的是哪个标准态，以及它为什么与化学家的不同。

### 生物化学标准态

化学家的标准态把每个溶质都定为活度 1，氢离子也不例外：$\Delta_\mathrm{r}G^\circ$ 对应 $\mathrm{pH} = 0$。没有在 pH 0 工作的酶，而对一个释放或消耗质子的反应引用 pH 0 的自由能变，对细胞来说会有几十千焦的误导。因此生物化学把氢离子浓度固定在它的生理值上，并把它从反应商中略去。

::: definition 生物化学标准态与变换自由能 {#def-standard-bio}
在**生物化学标准态**中，除 $\mathrm{H^+}$ 外每个反应物和产物都处于 $1\ \mathrm{mol\,dm^{-3}}$（气体处于 $1\ \mathrm{bar}$），水的活度为 1，氢离子浓度固定为 $10^{-7}\ \mathrm{mol\,dm^{-3}}$（pH 7），除非另有说明，温度为 $298.15\ \mathrm{K}$。这些条件下的标准吉布斯自由能变记作 $\Delta_\mathrm{r}G^{\circ\prime}$（"delta G nought prime"，标准自由能加撇号），相应的平衡常数称为**表观平衡常数**
$$
K' = \exp\!\left(-\frac{\Delta_\mathrm{r}G^{\circ\prime}}{RT}\right),
$$
其中不出现 $[\mathrm{H^+}]$ 和 $[\mathrm{H_2O}]$。ATP 等反应物的浓度是**总**浓度，对它们所有的质子化形态和金属配合物求和（ATP⁴⁻、HATP³⁻、MgATP²⁻……），所以 $K'$ 和 $\Delta_\mathrm{r}G^{\circ\prime}$ 依赖 pH、游离 $\mathrm{Mg^{2+}}$ 浓度和离子强度；表列数值通常指约 $1\ \mathrm{mmol\,dm^{-3}}$ 游离 $\mathrm{Mg^{2+}}$ 和接近 $0.25\ \mathrm{mol\,dm^{-3}}$ 的离子强度。
:::

对既不释放也不消耗质子的反应，$\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ$。当有质子参与时两者相差一个固定的量，只要把氢离子的贡献显式写出来就能推出来。若反应产生 $\nu$ 摩尔的 $\mathrm{H^+}$，则 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ 中 $Q$ 含有因子 $[\mathrm{H^+}]^\nu$。把这一项按 pH 7 吸收进标准项得
$$
\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ + \nu RT\ln(10^{-7}) = \Delta_\mathrm{r}G^\circ - 7\nu\,RT\ln 10 .
$$ {#eq-prime}
在 $298.15\ \mathrm{K}$，$RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$，所以每释放一个质子的反应在 pH 7 比在 pH 0 有利 $39.95\ \mathrm{kJ\,mol^{-1}}$，而消耗质子的反应则不利那么多。对消耗质子的还原半反应施加同样的修正，就得到本章后面使用的生物化学标准还原电势 $E^{\circ\prime}$。

::: example 在化学标度与生化标度之间换算 {#ex-prime-conversion}
还原反应 $\tfrac12\,\mathrm{O_2(g)} + 2\,\mathrm{H^+(aq)} + 2\,\mathrm{e^-} \rightarrow \mathrm{H_2O(l)}$ 在 pH 0、$298.15\ \mathrm{K}$ 下 $E^\circ = +1.229\ \mathrm{V}$（标准表列数据，如 CRC Handbook）。求 pH 7 时的 $E^{\circ\prime}$，以及相应的半反应标准吉布斯自由能变。
::: solution
该半反应消耗两个质子（$\nu = -2$）和两个电子。由[[#eq-prime]]，$\Delta G^{\circ\prime} = \Delta G^\circ + 2 \times 7 \times 5.708\ \mathrm{kJ\,mol^{-1}} = \Delta G^\circ + 79.9\ \mathrm{kJ\,mol^{-1}}$：去掉质子的高活度使还原变得不那么有利。由 $\Delta G = -nFE$ 且 $n = 2$，
$$
E^{\circ\prime} = E^\circ - \frac{79\,910\ \mathrm{J\,mol^{-1}}}{2 \times 96\,485\ \mathrm{C\,mol^{-1}}} = 1.229 - 0.414 = 0.815\ \mathrm{V}.
$$
等价地说，一个每个电子对应一个质子的电对在 $298\ \mathrm{K}$ 每 pH 单位损失 $0.05916\ \mathrm{V}$，而 $7 \times 0.05916 = 0.414\ \mathrm{V}$。这一结果与表列值 $E^{\circ\prime}(\tfrac12\mathrm{O_2/H_2O}) = +0.816\ \mathrm{V}$（Berg 等，第 9 版）在数据的舍入范围内一致。教训：合并来自两个来源的数值之前，务必先查表用的是哪个标度。
:::
:::

### 标准自由能变与实际自由能变

标准值告诉我们平衡落在哪里。决定一个反应能否在细胞中进行的，是其在当前浓度下的实际自由能变，而两者由生物能学中最重要的方程相连。

::: proposition 实际自由能变 {#prop-actual-dg}
对稀水溶液中 pH 7、温度 $T$ 下的反应 $a\mathrm{A} + b\mathrm{B} \rightarrow c\mathrm{C} + d\mathrm{D}$，
$$
\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q', \qquad Q' = \frac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b},
$$ {#eq-actual}
浓度以 $\mathrm{mol\,dm^{-3}}$ 计（除以标准的 $1\ \mathrm{mol\,dm^{-3}}$），$\mathrm{H^+}$ 和水略去。平衡时 $\Delta_\mathrm{r}G' = 0$ 且 $Q' = K'$，故等价地 $\Delta_\mathrm{r}G' = RT\ln(Q'/K')$。当 $Q' < K'$ 时反应正向进行。结果假定理想稀溶液行为（活度系数已吸收进表观常数），且 pH 等于标准态的 pH。
:::

::: proof 由化学势出发
对每个溶质，在理想稀近似下 $\mu_i = \mu_i^{\circ\prime} + RT\ln([i]/c^\circ)$，其中 $\mu_i^{\circ\prime}$ 是生物化学标准态下的化学势（对 $\mathrm{H^+}$，浓度项固定在 pH 7 并被吸收进 $\mu^{\circ\prime}$，这就是[[#eq-prime]]的内容）。反应吉布斯自由能是按化学计量数的加和 $\Delta_\mathrm{r}G' = \sum_i \nu_i\mu_i$，产物 $\nu_i$ 取正、反应物取负。把和式拆开，
$$
\Delta_\mathrm{r}G' = \sum_i \nu_i\mu_i^{\circ\prime} + RT\sum_i \nu_i\ln[i] = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln\prod_i [i]^{\nu_i},
$$
乘积正是 $Q'$。在平衡时令 $\Delta_\mathrm{r}G' = 0$ 得 $\Delta_\mathrm{r}G^{\circ\prime} = -RT\ln K'$，回代即得 $\Delta_\mathrm{r}G' = RT\ln(Q'/K')$。
:::

质量作用比每变十倍，$\Delta_\mathrm{r}G'$ 变化 $RT\ln 10$：$25\ \mathrm{^\circ C}$ 下是 $5.71\ \mathrm{kJ\,mol^{-1}}$，$37\ \mathrm{^\circ C}$ 下是 $5.94\ \mathrm{kJ\,mol^{-1}}$。这个数字值得记住。一个 $\Delta_\mathrm{r}G^{\circ\prime} = +17\ \mathrm{kJ\,mol^{-1}}$ 的反应，只要细胞把产物维持在比反应物稀约一千倍的水平，就能正向进行——醛缩酶和磷酸丙糖异构酶在糖酵解中正是这样工作的（[[biochemistry/glycolysis-citric-acid#ex-aldolase]]）。

::: example 红细胞中 ATP 水解的自由能 {#ex-atp-cell}
人红细胞中的总浓度约为 $[\mathrm{ATP}] = 2.25$、$[\mathrm{ADP}] = 0.25$、$[\mathrm{P_i}] = 1.65\ \mathrm{mmol\,dm^{-3}}$（Nelson 与 Cox，第 8 版）。对 $\mathrm{ATP + H_2O \rightarrow ADP + P_i}$ 取 $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$，计算 $37\ \mathrm{^\circ C}$ 下的实际自由能变。（忽略 $\Delta_\mathrm{r}G^{\circ\prime}$ 随温度的微小变化。）
::: solution
质量作用比（浓度以 $\mathrm{mol\,dm^{-3}}$ 计，水略去）为
$$
Q' = \frac{[\mathrm{ADP}][\mathrm{P_i}]}{[\mathrm{ATP}]} = \frac{(2.5\times10^{-4})(1.65\times10^{-3})}{2.25\times10^{-3}} = 1.83\times10^{-4}.
$$
在 $T = 310.15\ \mathrm{K}$，$RT = 2.579\ \mathrm{kJ\,mol^{-1}}$，$RT\ln Q' = 2.579 \times (-8.60) = -22.2\ \mathrm{kJ\,mol^{-1}}$。于是
$$
\Delta_\mathrm{r}G' = -30.5 - 22.2 = -52.7\ \mathrm{kJ\,mol^{-1}},
$$
约 $-53\ \mathrm{kJ\,mol^{-1}}$（浓度数据只支持两位有效数字）。细胞内的水解释放的自由能比标准值所显示的多约 70 %，因为细胞把 ATP 维持在高位、把 ADP 和磷酸盐维持在低位。这个实际值 $\Delta G_\mathrm{p}$ 称为**磷酸化势**；它是细胞真正能够花销的量，在不同组织与不同代谢状态介于约 $-45$ 到 $-60\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

下图把[[#eq-actual]]画成一条直线：$\Delta_\mathrm{r}G'$ 对 $\log_{10}Q'$，斜率为 $RT\ln 10$。拖动标准值，看看 $\Delta_\mathrm{r}G^{\circ\prime}$ 为正的反应在 $Q'$ 足够小时如何变得有利，并读出每条线在何处穿过零——在 $\log_{10}K'$ 处。

::: widget plot
f: g + 5.937*x; -30.5 + 5.937*x
x: -8, 4
y: -90, 40
sliders: g=13.8:-62:30:0.1
hlines: 0
vlines: -3.74
labels: \Delta_\mathrm{r}G'\ \text{（可调）}; \Delta_\mathrm{r}G'\ \text{（ATP 水解）}
caption: $310\ \mathrm{K}$ 下的实际自由能变 $\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q'$（单位 $\mathrm{kJ\,mol^{-1}}$）对 $x = \log_{10}Q'$ 作图；斜率为 $RT\ln 10 = 5.94\ \mathrm{kJ\,mol^{-1}}$ 每数量级。滑块设定第一条线的 $\Delta_\mathrm{r}G^{\circ\prime}$（起点 $+13.8\ \mathrm{kJ\,mol^{-1}}$，葡萄糖 + 磷酸 → 6-磷酸葡萄糖）。第二条线是 ATP 水解（$-30.5\ \mathrm{kJ\,mol^{-1}}$）；竖线标出红细胞的质量作用比 $\log_{10}(1.83\times10^{-4}) = -3.74$，此处 $\Delta_\mathrm{r}G' \approx -53\ \mathrm{kJ\,mol^{-1}}$。每条线在 $\log_{10}K'$ 处穿过零。
:::

::: warning ΔG°′ 不能告诉你反应在细胞中往哪个方向进行 {#warn-standard}
读代谢时最常见的错误，是把 $\Delta_\mathrm{r}G^{\circ\prime}$ 当作驱动力。它不是：只有当每个反应物和产物都在 $1\ \mathrm{mol\,dm^{-3}}$ 时它才是驱动力，而这种条件在细胞中从未出现——细胞中代谢物通常在微摩尔到毫摩尔浓度。好几个糖酵解步骤的标准值为正却仍正向运行，因为 $Q'$ 远低于 $K'$；反过来说，标准值为负的反应也可能被维持在平衡或近平衡处。还有两个陷阱：其一，很大的负 $\Delta_\mathrm{r}G'$ 对速率什么也没说——ATP 在中性溶液中具有动力学稳定性，没有酶就水解得很慢；其二，$\Delta_\mathrm{r}G^{\circ\prime}$ 和 $K'$ 依赖 pH 与 $\mathrm{Mg^{2+}}$，来自不同表、在不同条件下测定的数值不加核对不应混用。
:::

## ATP 与偶联反应

### ATP 水解为何如此有利

三磷酸腺苷是一种核苷酸：碱基腺嘌呤、糖核糖和一条三个磷酰基组成的链（从核糖向外依次标记 $\alpha$、$\beta$、$\gamma$），由两个**磷酸酐**键（P–O–P）连接。pH 7 时三磷酸链上几乎带四个负电荷，而在细胞中它主要与 $\mathrm{Mg^{2+}}$ 配位成 MgATP²⁻——几乎所有利用 ATP 的酶的真正底物。末端酐键水解给出 ADP 和正磷酸盐；$\alpha$ 与 $\beta$ 之间水解给出 AMP 和焦磷酸。

这些反应的大负值 $\Delta_\mathrm{r}G^{\circ\prime}$ 与分子中任何特殊的"高能键"毫无关系——打断任何键都要消耗能量。它反映的是反应物与产物整体的自由能之差，几个因素都有贡献：

1. **静电缓解。**三磷酸链上的四个负电荷挤在一起；水解把它们分成两个可以相互远离的离子。
2. **产物的共振稳定。**正磷酸盐的等价共振式多于酐的磷酰基——在酐中桥氧的孤对由两个磷原子共享。
3. **电离。**pH 7 时水解（平均而言）释放一个质子（略少于一个，因为 ADP 新的末端磷酸和正磷酸盐的 $\mathrm{p}K_\mathrm{a}$ 都在 7 附近），而由[[#eq-prime]]，在 pH 7 释放质子是有利的。
4. **溶剂化与熵。**产物比 ATP 水合得更好，而且一个分子变成两个。

这些正是使羧酸酐成为比酯更活泼的酰化剂的同一批论证（[[organic-2/carboxylic-derivatives]]）：磷酐之于磷酸盐，正如酸酐之于羧酸。

一个化合物的**磷酰基转移势**是其标准水解自由能的负值：它越大，化合物把磷酰基交给水或别的受体的倾向就越大。标准值（Nelson 与 Cox，第 8 版，Berg 等，第 9 版；$\Delta_\mathrm{r}G^{\circ\prime}$ 单位 $\mathrm{kJ\,mol^{-1}}$）为：

| 被水解的化合物 | 产物 | $\Delta_\mathrm{r}G^{\circ\prime}$ |
|---|---|---|
| 磷酸烯醇式丙酮酸 | 丙酮酸 + $\mathrm{P_i}$ | $-61.9$ |
| 1,3-二磷酸甘油酸 | 3-磷酸甘油酸 + $\mathrm{P_i}$ | $-49.4$ |
| ATP | AMP + $\mathrm{PP_i}$ | $-45.6$ |
| 磷酸肌酸 | 肌酸 + $\mathrm{P_i}$ | $-43.0$ |
| 乙酰辅酶A（硫酯） | 乙酸 + 辅酶A | $-31.4$ |
| ATP | ADP + $\mathrm{P_i}$ | $-30.5$ |
| 1-磷酸葡萄糖 | 葡萄糖 + $\mathrm{P_i}$ | $-20.9$ |
| 焦磷酸 | $2\,\mathrm{P_i}$ | $-19.2$ |
| 6-磷酸葡萄糖 | 葡萄糖 + $\mathrm{P_i}$ | $-13.8$ |
| 3-磷酸甘油 | 甘油 + $\mathrm{P_i}$ | $-9.2$ |

引人注目的是 ATP 恰好处在表*中间*。排在它上面的化合物——磷酸烯醇式丙酮酸、1,3-二磷酸甘油酸、磷酸肌酸——能把 ADP 磷酸化成 ATP；ATP 又转而能磷酸化排在它下面的化合物，即糖磷酸酯和甘油磷酸酯。ATP 不是细胞中含"能"最多的磷酸化合物；它是中间人，是公共货币，磷酰基经由它从分解代谢制造的高势供体流向生物合成所需的低势受体。

### 偶联

自由能变为正的反应怎样才能进行？通过一个共享的中间体，把它与一个更有利的反应偶联起来。

::: proposition 可加性与偶联 {#prop-coupling}
若反应 1 与反应 2 合并成总反应 3（反应 3 = 反应 1 + 反应 2），则
$$
\Delta_\mathrm{r}G^{\circ\prime}_3 = \Delta_\mathrm{r}G^{\circ\prime}_1 + \Delta_\mathrm{r}G^{\circ\prime}_2, \qquad K'_3 = K'_1\,K'_2,
$$
同样的可加性对给定浓度下的实际值 $\Delta_\mathrm{r}G'$ 也成立。因此，把一个不利反应与 $n$ 个 ATP 的水解偶联，就使其表观平衡常数乘以 $\exp(30.5n\ \mathrm{kJ\,mol^{-1}}/RT)$——在 $298\ \mathrm{K}$ 每个 ATP 约 $2.2\times10^5$ 倍；在 $310\ \mathrm{K}$ 采用 $-52\ \mathrm{kJ\,mol^{-1}}$ 的细胞磷酸化势时，每个 ATP 约 $10^{8.8}$ 倍。只有当两个反应共享一个化学中间体（被磷酸化的底物或酶，或一个公共载体），使彼此离不开对方时，偶联才是真实的。
:::

::: proof 自由能是状态函数
吉布斯自由能是状态函数，所以反应 3 的初态与末态之间的变化，无论转化是一步完成还是经由反应 1 再接反应 2，都是相同的：这就是 $G$ 的盖斯定律。于是 $\Delta_\mathrm{r}G_3 = \Delta_\mathrm{r}G_1 + \Delta_\mathrm{r}G_2$，对标准值和对固定浓度下的实际值都成立（$RT\ln Q'$ 项同样相加，因为和式的反应商是各反应商的乘积，共享中间体相消）。于是 $K'_3 = \exp(-\Delta_\mathrm{r}G^{\circ\prime}_3/RT) = \exp(-\Delta_\mathrm{r}G^{\circ\prime}_1/RT)\exp(-\Delta_\mathrm{r}G^{\circ\prime}_2/RT) = K'_1K'_2$。取 $\Delta_\mathrm{r}G_2 = -30.5n\ \mathrm{kJ\,mol^{-1}}$，因子 $K'_2 = \exp(30.5n/RT)$ 随之得出；在 $298.15\ \mathrm{K}$，$30\,500/(8.314 \times 298.15) = 12.30$，$e^{12.30} = 2.2\times10^5$。热力学把方程相加；是酶的机理使它们的和成为唯一可走的路径——这就是最后那个条件是化学的而非热力学的缘故。
:::

::: example 磷酸化葡萄糖 {#ex-hexokinase}
直接反应葡萄糖 + $\mathrm{P_i}$ → 6-磷酸葡萄糖 + $\mathrm{H_2O}$ 的 $\Delta_\mathrm{r}G^{\circ\prime} = +13.8\ \mathrm{kJ\,mol^{-1}}$。己糖激酶催化的却是葡萄糖 + ATP → 6-磷酸葡萄糖 + ADP。求 $298\ \mathrm{K}$ 下两者的 $\Delta_\mathrm{r}G^{\circ\prime}$ 与 $K'$，并解释这一比较说明了什么。
::: solution
对直接反应，$K'_1 = \exp(-13\,800/(8.314 \times 298.15)) = \exp(-5.567) = 3.8\times10^{-3}$：在磷酸盐浓度 $10\ \mathrm{mmol\,dm^{-3}}$ 时，平衡下只有 $3.8\times10^{-5}$ 的葡萄糖被磷酸化——毫无用处。己糖激酶反应是直接反应与 ATP 水解之和：
$$
\Delta_\mathrm{r}G^{\circ\prime} = +13.8 + (-30.5) = -16.7\ \mathrm{kJ\,mol^{-1}}, \qquad K' = \exp(16\,700/2479) = 8.4\times10^{2}.
$$
平衡常数增大了 $8.4\times10^2/3.8\times10^{-3} = 2.2\times10^5$ 倍，正是[[#prop-coupling]]里的那个因子。就机理而言，酶从不产生自由的磷酸：它把葡萄糖和 MgATP 结合在一起，把 $\gamma$-磷酰基直接交给 6-位羟基。由于水被排除在闭合的活性中心之外（酶通过诱导契合围绕葡萄糖合拢），ATP 不会被浪费地水解。在细胞浓度下，红细胞中己糖激酶的 $\Delta_\mathrm{r}G'$ 约为 $-33\ \mathrm{kJ\,mol^{-1}}$（Berg 等），这正是它是糖酵解不可逆调控点之一的原因。
:::
:::

ATP 有三种不同的用法，读途径时分清它们会有帮助。在**磷酰基转移**（激酶）中，$\gamma$-磷酰基交给底物，使其活化。在**腺苷酰基转移**中，ATP 把 AMP 交给羧酸根生成酰基腺苷酸，释放的焦磷酸随后被焦磷酸酶水解；总反应消耗两个磷酸酐键，$\Delta_\mathrm{r}G^{\circ\prime}$ 为 $-45.6 - 19.2 = -64.8\ \mathrm{kJ\,mol^{-1}}$，足以使脂肪酸的活化和蛋白质合成中氨基酸的活化实际上不可逆（[[biochemistry/nucleic-acids]]，[[biochemistry/lipid-nitrogen-metabolism]]）。而在**构象偶联**中，ATP 的结合与水解改变一个蛋白质——一台泵、一个马达或一个伴侣——的形状，使活性中心的自由能变化变成机械功或浓度梯度（[[biochemistry/carbohydrates-lipids#prop-transport]]）。

::: example 磷酸肌酸作为 ATP 缓冲剂 {#ex-creatine}
肌肉储存磷酸肌酸（PCr），肌酸激酶用它再生 ATP：PCr + ADP ⇌ 肌酸 + ATP。(a) 由上表计算 $310\ \mathrm{K}$ 下的 $\Delta_\mathrm{r}G^{\circ\prime}$ 与 $K'$。(b) 静息肌肉中取 $[\mathrm{PCr}] = 25$、$[\mathrm{Cr}] = 13$、$[\mathrm{ATP}] = 8.0\ \mathrm{mmol\,dm^{-3}}$；肌酸激酶足够快，能使反应保持在平衡附近。估算游离 ADP 浓度。
::: solution
(a) 该反应是磷酸肌酸水解减去 ATP 水解：$\Delta_\mathrm{r}G^{\circ\prime} = -43.0 - (-30.5) = -12.5\ \mathrm{kJ\,mol^{-1}}$。在 $310.15\ \mathrm{K}$，$K' = \exp(12\,500/(8.314 \times 310.15)) = \exp(4.848) = 1.27\times10^{2}$。

(b) 平衡时
$$
K' = \frac{[\mathrm{Cr}][\mathrm{ATP}]}{[\mathrm{PCr}][\mathrm{ADP}]} \quad\Rightarrow\quad [\mathrm{ADP}] = \frac{(13)(8.0)}{(25)(127)}\ \mathrm{mmol\,dm^{-3}} = 0.033\ \mathrm{mmol\,dm^{-3}} = 33\ \mu\mathrm{mol\,dm^{-3}}.
$$
静息肌肉中的游离 ADP 确实处于几十微摩尔（组织提取物中测到的 ADP 大部分与蛋白质结合）。由于平衡如此偏向 ATP，一次把 ATP 转成 ADP 的强烈收缩会立刻借磷酸肌酸逆转回来，在磷酸肌酸耗尽可能之前 $[\mathrm{ATP}]$ 几乎不动。磷酸肌酸对 ATP/ADP 之比的缓冲，恰如弱酸-共轭碱对对 pH 的缓冲（[[biochemistry/water-noncovalent#prop-hh]]）。低的游离 ADP 还使肌肉的磷酸化势比红细胞更大：当 $[\mathrm{P_i}]$ 等于 $[\mathrm{ATP}]$ 时，$\Delta_\mathrm{r}G' = -30.5 + RT\ln(3.3\times10^{-5}) \approx -57\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: quiz
利用水解自由能表，哪个反应如所写的那样具有有利的标准自由能变（负的 $\Delta_\mathrm{r}G^{\circ\prime}$）？
- [x] 磷酸烯醇式丙酮酸 + ADP → 丙酮酸 + ATP
- [ ] 6-磷酸葡萄糖 + ADP → 葡萄糖 + ATP
- [ ] 3-磷酸甘油 + ADP → 甘油 + ATP
- [ ] ATP + 肌酸 → ADP + 磷酸肌酸
::: solution
（在标准条件下）磷酰基自发地从磷酰基转移势较高的供体流向势较低的受体。第一个反应 $\Delta_\mathrm{r}G^{\circ\prime} = -61.9 + 30.5 = -31.4\ \mathrm{kJ\,mol^{-1}}$；这就是糖酵解的丙酮酸激酶步骤。第二和第三个分别是 $+16.7$ 和 $+21.3\ \mathrm{kJ\,mol^{-1}}$，因为糖磷酸酯和甘油磷酸酯排在 ATP 之下；第四个是肌酸激酶的逆反应，标准条件下为 $+12.5\ \mathrm{kJ\,mol^{-1}}$（恢复期它之所以朝这个方向运行，只是因为细胞的浓度使 $Q'$ 很小）。
:::
:::

## 氧化还原载体与还原电势

食物中的自由能大部分不是靠磷酰基转移、而是靠氧化释放的：葡萄糖和脂肪酸的碳原子最终变成 $\mathrm{CO_2}$，它们的电子最终落在氧上。细胞并不把这些电子直接递给氧，而是先交给少数几种可溶的或与蛋白质结合的**电子载体**，由它们在途径之间运送还原力。

### NAD⁺、NADP⁺ 与黄素

**烟酰胺腺嘌呤二核苷酸**（$\mathrm{NAD^+}$）及其磷酸化亲戚 $\mathrm{NADP^+}$ 以**氢负离子** $\mathrm{H^-}$ 的形式在烟酰胺吡啶环的 C4 上接受电子。芳香的吡啶鎓阳离子变成 1,4-二氢吡啶，底物 $\mathrm{XH_2}$ 的第二个质子则释放给溶剂：
$$
\mathrm{NAD^+} + 2\,\mathrm{e^-} + \mathrm{H^+} \rightarrow \mathrm{NADH}, \qquad \mathrm{XH_2} + \mathrm{NAD^+} \rightarrow \mathrm{X} + \mathrm{NADH} + \mathrm{H^+}.
$$
氢负离子向吡啶鎓环的转移，是络合金属氢化物还原在生物体内的对应物；其逆过程——NADH 向羰基给出氢负离子——则是硼氢化物还原的对应物（[[organic-2/carbonyl-addition]]）。脱氢酶把氢负离子立体专一地转移到环的一个面上，这是酶区分对映异位面的一个漂亮例子（[[organic-1/stereochemistry]]）。还原型环在 $340\ \mathrm{nm}$ 有吸收而氧化型没有，几乎所有脱氢酶活性测定都是靠这一点做光谱追踪的。

**黄素腺嘌呤二核苷酸**（FAD）和**黄素单核苷酸**（FMN）在核黄素的异咯嗪环上运载电子，接受两个电子和两个质子生成 $\mathrm{FADH_2}$。与烟酰胺不同，黄素还能只接受一个电子，形成稳定的**半醌**自由基。这使它们成为两电子化学（氢负离子供体、C–C 键的脱氢，如琥珀酸 → 延胡索酸）与呼吸链中单电子载体（铁硫簇、细胞色素）之间的枢纽。黄素通常与它们的酶（黄素蛋白）紧密结合，其还原电势被蛋白质在游离值 $-0.219\ \mathrm{V}$ 上下很宽的范围里调校。

细胞把两个烟酰胺库维持在非常不同的状态。胞质游离的 $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ 之比很高（肝中的估计在几百的量级），所以 $\mathrm{NAD^+}$ 随时准备在分解代谢中接受电子；游离的 $[\mathrm{NADP^+}]/[\mathrm{NADPH}]$ 之比很低（约 $10^{-2}$ 的量级），所以 NADPH 随时准备在生物合成中给出电子。两种辅酶的标准化电势几乎相同；正是由不同酶维持的两个不同比值给了它们相反的任务。

### 自由能与还原电势

::: proposition 电子转移反应的自由能 {#prop-redox}
对有 $n$ 个电子从供体电对（还原电势 $E'_\mathrm{donor}$）流向受体电对（$E'_\mathrm{acceptor}$）的氧化还原反应，
$$
\Delta_\mathrm{r}G' = -nF\,\Delta E', \qquad \Delta E' = E'_\mathrm{acceptor} - E'_\mathrm{donor},
$$ {#eq-redox}
在生物化学标准条件下 $\Delta_\mathrm{r}G^{\circ\prime} = -nF\,\Delta E^{\circ\prime}$。每个电对的电势通过其氧化型与还原型之比依赖于能斯特（Nernst）方程，
$$
E' = E^{\circ\prime} + \frac{RT}{nF}\ln\frac{[\mathrm{ox}]}{[\mathrm{red}]},
$$ {#eq-nernst}
pH 7 的质子已经吸收在 $E^{\circ\prime}$ 里。电子自发地从电势较低（较负）的电对流向电势较高的电对。
:::

::: proof 电功
在恒温恒压下，$-\Delta_\mathrm{r}G$ 是一个反应所能做的最大非膨胀功。若把反应装在原电池中进行，则每摩尔反应有 $n$ 摩尔电子穿过电势差 $\Delta E'$，做电功 $nF\Delta E'$，其中 $F$ 是 1 摩尔电子的电荷。可逆地，这份功等于 $-\Delta_\mathrm{r}G'$，于是 $\Delta_\mathrm{r}G' = -nF\Delta E'$。对每个半反应 $\mathrm{ox} + n\,\mathrm{e^-} \rightarrow \mathrm{red}$ 应用[[#prop-actual-dg]]：$\Delta G' = \Delta G^{\circ\prime} + RT\ln([\mathrm{red}]/[\mathrm{ox}])$；除以 $-nF$ 得 $E' = E^{\circ\prime} - (RT/nF)\ln([\mathrm{red}]/[\mathrm{ox}])$，即[[#eq-nernst]]。同样的推导把电极换成膜，就是[[biochemistry/oxidative-phosphorylation#prop-pmf]]质子动力势的基础；一般理论在[[electrochemistry/cell-thermodynamics]]。
:::

$298\ \mathrm{K}$、pH 7 的标准生物化学还原电势（Berg 等，第 9 版；Nelson 与 Cox，第 8 版），一律写成还原方向，单位伏特：

| 电对 | $E^{\circ\prime}$ / V |
|---|---|
| $\mathrm{NADP^+} + \mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{NADPH}$ | $-0.324$ |
| $\mathrm{NAD^+} + \mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{NADH}$ | $-0.320$ |
| FAD + $2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{FADH_2}$（游离） | $-0.219$ |
| 乙醛 + $2\mathrm{H^+} + 2\mathrm{e^-}$ → 乙醇 | $-0.197$ |
| 丙酮酸 + $2\mathrm{H^+} + 2\mathrm{e^-}$ → 乳酸 | $-0.185$ |
| 草酰乙酸 + $2\mathrm{H^+} + 2\mathrm{e^-}$ → 苹果酸 | $-0.166$ |
| 延胡索酸 + $2\mathrm{H^+} + 2\mathrm{e^-}$ → 琥珀酸 | $+0.031$ |
| 泛醌 + $2\mathrm{H^+} + 2\mathrm{e^-}$ → 泛醇 | $+0.045$ |
| 细胞色素 *c*（$\mathrm{Fe^{3+}}$）+ $\mathrm{e^-}$ → 细胞色素 *c*（$\mathrm{Fe^{2+}}$） | $+0.254$ |
| $\tfrac12\mathrm{O_2} + 2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{H_2O}$ | $+0.816$ |

把这张表从上往下读，就是呼吸链的地图：电子从 NADH 出发，经黄素、泛醌和细胞色素到达氧，每一步都是下坡。

::: example NADH 氧化的自由能 {#ex-nadh-o2}
计算 $\mathrm{NADH} + \mathrm{H^+} + \tfrac12\,\mathrm{O_2} \rightarrow \mathrm{NAD^+} + \mathrm{H_2O}$ 的 $\Delta_\mathrm{r}G^{\circ\prime}$，并与合成 ATP 所需的自由能比较。
::: solution
NADH 是供体，氧是受体：$\Delta E^{\circ\prime} = +0.816 - (-0.320) = 1.136\ \mathrm{V}$，$n = 2$：
$$
\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.136\ \mathrm{V} = -2.192\times10^{5}\ \mathrm{J\,mol^{-1}} = -219.2\ \mathrm{kJ\,mol^{-1}}.
$$
纸上谈兵，这在标准条件下够制造 $219.2/30.5 = 7.2$ 个 ATP；在细胞磷酸化势 $-52\ \mathrm{kJ\,mol^{-1}}$ 下则约 $219/52 \approx 4.2$ 个。线粒体实际每个 NADH 制造约 2.5 个 ATP（[[biochemistry/oxidative-phosphorylation#prop-atp-stoich]]），在细胞条件下热力学效率接近 60 %。若把全部 $219\ \mathrm{kJ\,mol^{-1}}$ 一步放掉，就只会变成热浪费掉；呼吸链把这一大台阶梯拆成若干小步，每步与质子泵送偶联。
:::
:::

::: example 乳酸脱氢酶：近平衡的氧化还原步骤 {#ex-ldh}
乳酸脱氢酶催化丙酮酸 + NADH + $\mathrm{H^+}$ ⇌ 乳酸 + $\mathrm{NAD^+}$。(a) 求 $298\ \mathrm{K}$ 下的 $\Delta_\mathrm{r}G^{\circ\prime}$ 与 $K'$。(b) 在某组织中游离 $[\mathrm{NAD^+}]/[\mathrm{NADH}] = 700$、$[\text{乳酸}]/[\text{丙酮酸}] = 10$，求 $\Delta_\mathrm{r}G'$（为简便按 $298\ \mathrm{K}$ 计）并加评论。
::: solution
(a) 丙酮酸是受体，NADH 是供体：$\Delta E^{\circ\prime} = -0.185 - (-0.320) = +0.135\ \mathrm{V}$，所以 $\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485 \times 0.135 = -26.05\ \mathrm{kJ\,mol^{-1}}$，$K' = \exp(26\,050/2479) = 3.7\times10^4$。

(b) $Q' = ([\text{乳酸}]/[\text{丙酮酸}]) \times ([\mathrm{NAD^+}]/[\mathrm{NADH}]) = 10 \times 700 = 7.0\times10^3$，于是
$$
\Delta_\mathrm{r}G' = -26.05 + 2.479 \ln(7.0\times10^3) = -26.05 + 21.95 = -4.1\ \mathrm{kJ\,mol^{-1}}.
$$
尽管标准值很大，反应却接近平衡（$Q'$ 只比 $K'$ 低 5 倍）。由于 NAD 的氧化型/还原型之比如此之高，还原丙酮酸只是勉强有利；当糖酵解快过线粒体再氧化 NADH 的速度时（运动中肌肉），NADH/NAD⁺ 之比升高，乳酸积累，把糖酵解需要的 $\mathrm{NAD^+}$ 再生出来。这样一个近平衡的酶可以随浓度变化双向运行：在肝中同一反应反向运行，把乳酸变成丙酮酸供糖异生。这类比值也反过来使用，从实测的乳酸和丙酮酸估算游离的 $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ 之比。
:::
:::

下图对两个烟酰胺电对，按其氧化型/还原型之比的对数绘制[[#eq-nernst]]。因为 $n = 2$，$298\ \mathrm{K}$ 下电势每数量级只变化 $29.6\ \mathrm{mV}$，是单电子值的一半。竖线标出典型的胞质比值：被维持在氧化态的 $\mathrm{NAD^+}$（比值 700）位于其标准电势上方约 $84\ \mathrm{mV}$，被维持在还原态的 NADPH（比值 $10^{-2}$）位于下方约 $60\ \mathrm{mV}$，于是两个 $E^{\circ\prime}$ 几乎相同的库，在细胞中相差约 $0.15\ \mathrm{V}$——对两电子转移约为 $28\ \mathrm{kJ\,mol^{-1}}$。

::: widget plot
f: -0.320 + 0.02958*x; -0.324 + 0.02958*x
x: -3, 4
y: -0.45, -0.15
hlines: -0.185
vlines: 2.845; -2
labels: E'(\mathrm{NAD^+/NADH}); E'(\mathrm{NADP^+/NADPH})
caption: $298\ \mathrm{K}$ 下 $\mathrm{NAD^+/NADH}$（$E^{\circ\prime} = -0.320\ \mathrm{V}$）与 $\mathrm{NADP^+/NADPH}$（$-0.324\ \mathrm{V}$）的能斯特线 $E' = E^{\circ\prime} + (RT/2F)\ln([\mathrm{ox}]/[\mathrm{red}])$（单位 V），对 $x = \log_{10}([\mathrm{ox}]/[\mathrm{red}])$ 作图；斜率每数量级 $0.0296\ \mathrm{V}$。水平线是丙酮酸/乳酸的 $E^{\circ\prime}$（$-0.185\ \mathrm{V}$）。竖线标出比值 700（$x = 2.85$，典型的胞质 $\mathrm{NAD^+/NADH}$，给出 $E' \approx -0.236\ \mathrm{V}$）和 $10^{-2}$（$x = -2$，典型的 $\mathrm{NADP^+/NADPH}$，给出 $E' \approx -0.383\ \mathrm{V}$）。让两个比值保持不同，就赋予两种辅酶相反的角色：一个是分解代谢的电子汇，另一个是生物合成的电子源。
:::

## 后续内容

之后每一章代谢都是本章三个结果的运用。在[[biochemistry/glycolysis-citric-acid]]中，每个步骤的质量作用比与 $K'$ 相比，把近平衡反应与不可逆调控点区分开来（[[biochemistry/glycolysis-citric-acid#def-control]]），而底物水平磷酸化被看作磷酰基从表中排在 ATP 之上的化合物的转移。在[[biochemistry/oxidative-phosphorylation]]中，本章的氧化还原电势变成呼吸链，[[#prop-redox]]带着一张膜取代导线重新出现，成为质子动力势；同一章还要讲光合作用——光在那里把电子从水推上坡到 $\mathrm{NADP^+}$。在[[biochemistry/lipid-nitrogen-metabolism]]中，脂肪酸经腺苷酰基转移的活化和尿素循环的 ATP 账目，都是纯粹的偶联论证。[[#prop-actual-dg]]背后的理想稀溶液化学势在[[thermodynamics/mixtures]]中深入讨论，而离子逆梯度的转运——以浓度和电压形式花掉的自由能——在[[biochemistry/carbohydrates-lipids]]。

::: history
"由单一化合物在细胞反应之间运载能量"这一观念前后花了大约四十年才搭建起来。1906 年，阿瑟·哈登（Arthur Harden）与威廉·约翰·杨（William John Young）发现酵母汁透析后失去发酵能力，把煮过的透析液——一种耐热的"辅酶"（co-zymase），后来证明含 $\mathrm{NAD^+}$——加回去能力即恢复，而且发酵期间无机磷酸被掺入糖磷酸酯；哈登与汉斯·冯·欧拉-卡尔平（Hans von Euler-Chelpin，他搞清了辅酶的组成）分享 1929 年诺贝尔化学奖。三磷酸腺苷本身 1929 年由卡尔·洛曼（Karl Lohmann）在奥托·迈耶霍夫（Otto Meyerhof）实验室从肌肉中分离，几乎同时弗里士（Cyrus Fiske）与苏巴洛（Yellapragada Subbarow）在哈佛也独立完成。1935 年，奥托·瓦尔堡（Otto Warburg）与瓦尔特·克里斯蒂安（Walter Christian）证明其"辅酶 II"（NADP⁺）中携氢部分是烟酰胺；差不多同时，胡戈·泰莱尔（Hugo Theorell）把"旧黄色酶"拆成一个蛋白质加一个黄素磷酸酯（他获 1955 年诺贝尔生理学或医学奖）。综合出现在 1941 年：弗里茨·李普曼（Fritz Lipmann）在综述《磷酸键能的代谢生成与利用》中提出 ATP 是细胞自由能的公共载体，并用波浪线 ~P 表示"高能"磷酸；李普曼与汉斯·克雷布斯分享 1953 年诺贝尔生理学或医学奖。在固定 pH 和 $\mathrm{Mg^{2+}}$ 下对表观平衡常数的现代定量处理主要归功于罗伯特·阿尔贝蒂（Robert Alberty），他的工作是 1994 年 IUPAC-IUBMB 生物化学热力学推荐的基础。
:::

::: summary
- 细胞是维持在远离平衡的稳态中的开放系统；有净流量通过的途径中每一步都有 $\Delta_\mathrm{r}G' < 0$。
- 生物化学标准态固定 pH 7，并把 $\mathrm{H^+}$ 和水从 $Q'$ 中略去：对释放 $\nu$ 个质子的反应，$\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ - 7\nu RT\ln 10$。
- 实际自由能变为 $\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q' = RT\ln(Q'/K')$；$Q'$ 每移动一个数量级，它移动 $5.7$–$5.9\ \mathrm{kJ\,mol^{-1}}$。
- ATP 水解的 $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$，但细胞磷酸化势约为 $-45$ 到 $-60\ \mathrm{kJ\,mol^{-1}}$，因为 ATP 被维持在远高于其与 ADP 和磷酸盐的平衡比的位置。
- ATP 位于磷酰基转移标度的中间：它由更高势的供体（PEP、1,3-二磷酸甘油酸、磷酸肌酸）生成，又花在势较低的受体上。
- 偶联反应的自由能相加、$K'$ 相乘，但偶联需要共享中间体；标准条件下每个 ATP 使 $K'$ 乘以约 $10^{5}$。
- $\mathrm{NAD^+}$ 与 $\mathrm{NADP^+}$ 运载氢负离子；黄素运载一个或两个电子；$\Delta_\mathrm{r}G' = -nF\Delta E'$，氧氧化 NADH 在标准条件下释放 $219\ \mathrm{kJ\,mol^{-1}}$。
:::

## 习题

::: exercise 糖磷酸酯的表观平衡常数 {level=1 check="262"}
6-磷酸葡萄糖 + $\mathrm{H_2O}$ → 葡萄糖 + $\mathrm{P_i}$ 的 $\Delta_\mathrm{r}G^{\circ\prime} = -13.8\ \mathrm{kJ\,mol^{-1}}$。计算 $298.15\ \mathrm{K}$ 下的 $K'$。（$K'$ 保留三位有效数字输入。）
::: solution
$K' = \exp(-\Delta_\mathrm{r}G^{\circ\prime}/RT) = \exp(13\,800/(8.314 \times 298.15)) = \exp(5.567) = 262$。平衡时，若磷酸盐为 $1\ \mathrm{mmol\,dm^{-3}}$，比值 $[\text{葡萄糖}]/[\text{6-磷酸葡萄糖}]$ 将是 $262/10^{-3} = 2.6\times10^5$：糖磷酸酯对水解在热力学上不稳定，却因为没有葡萄糖-6-磷酸酶、反应很慢而在细胞中留存。
:::
:::

::: exercise 用 NADH 还原 FAD {level=1 check="-19.5"}
用标准生物化学还原电势（$\mathrm{NAD^+/NADH}$ $-0.320\ \mathrm{V}$；游离 $\mathrm{FAD/FADH_2}$ $-0.219\ \mathrm{V}$），计算 $\mathrm{NADH + H^+ + FAD \rightarrow NAD^+ + FADH_2}$ 的 $\Delta_\mathrm{r}G^{\circ\prime}$。（$\Delta_\mathrm{r}G^{\circ\prime}$ 以 $\mathrm{kJ\,mol^{-1}}$ 保留三位有效数字输入。）
::: solution
FAD 是受体：$\Delta E^{\circ\prime} = -0.219 - (-0.320) = +0.101\ \mathrm{V}$。取 $n = 2$，$\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485 \times 0.101 = -1.949\times10^4\ \mathrm{J\,mol^{-1}} = -19.5\ \mathrm{kJ\,mol^{-1}}$。反应是有利的，但幅度不大；与酶结合的黄素电势会被蛋白质移动，所以真正的驱动力取决于具体的黄素蛋白。
:::
:::

::: exercise 丙酮酸激酶 {level=1 check="-31.4"}
用表中的水解自由能计算磷酸烯醇式丙酮酸 + ADP → 丙酮酸 + ATP 的 $\Delta_\mathrm{r}G^{\circ\prime}$。（$\Delta_\mathrm{r}G^{\circ\prime}$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
该反应是 PEP 水解（$-61.9$）加 ATP 水解的逆反应（$+30.5$）：$\Delta_\mathrm{r}G^{\circ\prime} = -31.4\ \mathrm{kJ\,mol^{-1}}$。PEP 大的磷酰基转移势大部分来自产物：水解所释放的丙酮酸烯醇式互变异构成稳定得多的酮式（[[organic-2/enols-enolates]]），这一步使总反应强烈有利，在细胞中实际上不可逆。
:::
:::

::: exercise 肌肉的磷酸化势 {level=2 check="-48.5"}
大鼠骨骼肌中总浓度约为 $[\mathrm{ATP}] = 8.05$、$[\mathrm{ADP}] = 0.93$、$[\mathrm{P_i}] = 8.05\ \mathrm{mmol\,dm^{-3}}$（Nelson 与 Cox，第 8 版）。取 $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$，计算 $37\ \mathrm{^\circ C}$ 下 ATP 水解的 $\Delta_\mathrm{r}G'$。（$\Delta_\mathrm{r}G'$ 以 $\mathrm{kJ\,mol^{-1}}$ 保留三位有效数字输入。）
::: solution
$Q' = [\mathrm{ADP}][\mathrm{P_i}]/[\mathrm{ATP}] = (0.93\times10^{-3})(8.05\times10^{-3})/(8.05\times10^{-3}) = 9.3\times10^{-4}$。$RT\ln Q' = 2.5786 \times \ln(9.3\times10^{-4}) = 2.5786 \times (-6.980) = -18.0\ \mathrm{kJ\,mol^{-1}}$。故 $\Delta_\mathrm{r}G' = -30.5 - 18.0 = -48.5\ \mathrm{kJ\,mol^{-1}}$。这里用的是总 ADP；游离 ADP 低得多（见[[#ex-creatine]]），所以肌肉中真正的磷酸化势还要更负。
:::
:::

::: exercise 不同 pH 下的一个电对 {level=2 check="-0.028"}
延胡索酸 + $2\,\mathrm{H^+}$ + $2\,\mathrm{e^-}$ → 琥珀酸在 pH 7、$298\ \mathrm{K}$ 下 $E^{\circ\prime} = +0.031\ \mathrm{V}$。pH 8 时该电对（延胡索酸和琥珀酸均为 $1\ \mathrm{mol\,dm^{-3}}$）的标准电势是多少？（电势以 V 保留三位小数输入。）
::: solution
两个质子伴随两个电子，所以电势每 pH 单位下降 $(RT\ln 10/F) \times (2/2) = 0.05916\ \mathrm{V}$。pH 8 时：$E = 0.031 - 0.059 = -0.028\ \mathrm{V}$。升高 pH 使消耗质子的还原变得不那么有利——与[[#eq-prime]]同一个逻辑，只不过把七个 pH 单位换成一个。
:::
:::

::: exercise 每天的 ATP 周转 {level=2 check="41.0"}
一个静息成年人每天消耗约 $8.4\ \mathrm{MJ}$ 自由能。假定其中一半经由 ATP，而每摩尔 ATP 的生成加水解对应 $52\ \mathrm{kJ}$（磷酸化势）。估算每天周转的 ATP 质量（$M(\mathrm{ATP}) = 507.2\ \mathrm{g\,mol^{-1}}$）。（质量以 kg 保留三位有效数字输入。）
::: solution
经由 ATP 的能量：$0.5 \times 8.4\times10^{6} = 4.2\times10^{6}\ \mathrm{J}$。物质的量：$4.2\times10^{6}/5.2\times10^{4} = 80.8\ \mathrm{mol}$。质量：$80.8 \times 507.2\ \mathrm{g} = 4.10\times10^{4}\ \mathrm{g} = 41.0\ \mathrm{kg}$——与人体自身质量同一量级，即引言中引用的数字。既然全身含有的 ATP 不足 $100\ \mathrm{g}$，每个分子每天就要循环几百到一千次。（答案是估算：能量经过 ATP 的份额和 $\Delta G_\mathrm{p}$ 都在变化。）
:::
:::

::: exercise 释放质子的反应恰好平衡时的 pH {level=3 check="8.75"}
反应 $\mathrm{A} \rightarrow \mathrm{B} + \mathrm{H^+}$ 在生化标度（pH 7，$298.15\ \mathrm{K}$）上的标准吉布斯自由能 $\Delta_\mathrm{r}G^{\circ\prime} = +10.0\ \mathrm{kJ\,mol^{-1}}$。(a) 证明：在任意固定 pH 下定义的标准自由能——像 $\Delta_\mathrm{r}G^{\circ\prime}$ 那样定义、但取 $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$——为 $\Delta_\mathrm{r}G^{\circ\prime} - (\mathrm{pH} - 7)RT\ln 10$。(b) 它在什么 pH 下为零？（pH 保留两位小数输入。）
::: hint
从 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln([\mathrm{B}][\mathrm{H^+}]/[\mathrm{A}])$ 出发，像[[#eq-prime]]那样把 $[\mathrm{H^+}]$ 吸收进标准项。
:::
::: solution
(a) 把 $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$ 吸收进标准项得 $\Delta_\mathrm{r}G^\circ(\mathrm{pH}) = \Delta_\mathrm{r}G^\circ + RT\ln 10^{-\mathrm{pH}} = \Delta_\mathrm{r}G^\circ - \mathrm{pH}\,RT\ln 10$。pH 7 时这就是 $\Delta_\mathrm{r}G^{\circ\prime}$，故 $\Delta_\mathrm{r}G^\circ(\mathrm{pH}) = \Delta_\mathrm{r}G^{\circ\prime} - (\mathrm{pH} - 7)RT\ln 10$。(b) 令其为零：$\mathrm{pH} = 7 + 10.0/5.708 = 7 + 1.752 = 8.75$。对一个释放一个质子的反应，每个 pH 单位值 $5.7\ \mathrm{kJ\,mol^{-1}}$——这就是释放或结合质子的反应其平衡和速率都依赖 pH 的原因。
:::
:::

::: exercise 氧化磷酸化的效率 {level=3 check="59"}
$\mathrm{O_2}$ 氧化 NADH 的 $\Delta_\mathrm{r}G^{\circ\prime} = -219.2\ \mathrm{kJ\,mol^{-1}}$（[[#ex-nadh-o2]]）。线粒体每个 NADH 制造 2.5 个 ATP。(a) 用 $52\ \mathrm{kJ\,mol^{-1}}$ 的细胞磷酸化势，计算 NADH 氧化自由能中被保存在 ATP 里的百分比。(b) 解释为什么这里 NADH 氧化的标准值是合理的近似，若改用实际浓度会有什么变化。（百分比保留两位有效数字输入。）
::: solution
(a) 保存：每摩尔 NADH $2.5 \times 52 = 130\ \mathrm{kJ}$。效率 $= 130/219.2 = 0.593$，即 $59\ \%$。(b) 在线粒体基质中游离 $\mathrm{NAD^+/NADH}$ 之比远低于细胞质（10 的量级），由[[#eq-nernst]]这使 $E'(\mathrm{NAD^+/NADH})$ 比 $E^{\circ\prime}$ *少*负约 $0.030\ \mathrm{V}$；而细胞内低的 $p(\mathrm{O_2})$ 又使氧的电势略降。两个效应都让 $\Delta E'$ 略为缩小。每 $30\ \mathrm{mV}$ 对 $n = 2$ 是 $2 \times 96\,485 \times 0.030 = 5.8\ \mathrm{kJ\,mol^{-1}}$，不到 $219\ \mathrm{kJ\,mol^{-1}}$ 的 3 %，所以效率估计只升高几个百分点；标准值的准确度就在这一带。其余的 40 % 以热的形式耗散——这份损失恰恰维持了流量以有用的速率向前，因为一台效率 100 % 的机器就处在平衡上，会以无穷慢的速度运转。
:::
:::

::: exercise 运动中的磷酸肌酸 {level=3 check="414"}
在[[#ex-creatine]]的肌肉中（$310\ \mathrm{K}$ 时 $K' = 127$，$[\mathrm{ATP}]$ 维持在 $8.0\ \mathrm{mmol\,dm^{-3}}$），剧烈运动使磷酸肌酸降到 $5\ \mathrm{mmol\,dm^{-3}}$、肌酸升到 $33\ \mathrm{mmol\,dm^{-3}}$（二者之和守恒）。(a) 假定肌酸激酶使其反应保持平衡，计算新的游离 ADP 浓度。(b) 在 $[\mathrm{P_i}]$ 不变时，磷酸化势变化多少？（游离 ADP 浓度以 $\mu\mathrm{mol\,dm^{-3}}$ 保留三位有效数字输入。）
::: hint
用 $[\mathrm{ADP}] = [\mathrm{Cr}][\mathrm{ATP}]/(K'[\mathrm{PCr}])$，多保留几位 $K'$（$127.4$），并比较新旧 ADP 浓度的对数。
:::
::: solution
(a) $[\mathrm{ADP}] = (33)(8.0)/(127.4 \times 5) = 0.414\ \mathrm{mmol\,dm^{-3}} = 414\ \mu\mathrm{mol\,dm^{-3}}$，比静息时的 $33\ \mu\mathrm{mol\,dm^{-3}}$ 大幅上升。(b) 比值为 $414/32.6 = 12.7$；ATP 水解的 $\Delta_\mathrm{r}G'$ 上升（负得少些）$RT\ln 12.7 = 2.579 \times 2.54 = 6.6\ \mathrm{kJ\,mol^{-1}}$。ATP 本身几乎没变——这就是缓冲——但游离 ADP 的十二倍上升是一个强烈信号：ADP（以及腺苷酸激酶由它生成的 AMP）激活糖酵解和线粒体呼吸，于是细胞以更快制造 ATP 来回应磷酸化势的下降。(b) 中我们把磷酸盐当作常数；实际上随着磷酸肌酸水解它也会上升，加剧这一变化。
:::
:::
