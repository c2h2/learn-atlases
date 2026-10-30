蛋白质是一条由几百个氨基酸经强共价键连成的链，然而让它成为酶、受体或结构纤维的却是它的*形状*，而这种形状靠的是比共价键弱一百倍的力来维系。把蛋清溶液加热到 $70\ \mathrm{^\circ C}$，形状消失了，却没有断开一根共价键。把油和水放在一起，它们会分层，尽管油分子与水分子之间的吸引根本不是排斥。往一升血液里加入几毫摩尔乳酸，它的 pH 几乎不动。这三个事实——生物结构的脆弱、疏水效应与体液的缓冲——就是本章的主题，而三者都是水的性质。生物化学发生在水中，其中水的浓度约 $55\ \mathrm{mol\,dm^{-3}}$，生物分子之间的每一次相互作用，都是与每个分子本可跟溶剂发生的相互作用的竞争。

我们从水分子与氢键讲起，然后定量处理静电作用与范德华作用，再讲疏水效应——它根本不是一种力，而是溶剂的熵。最后一部分回到酸碱化学——[[general-chemistry-2/acids-bases]]与[[general-chemistry-2/buffers-titrations]]中的平衡——应用到细胞与血液的缓冲体系。分子间力的一般描述见[[bonding-structure/intermolecular-forces]]；这里我们要问的是每种力*在水中*有多大，这才是对一个细胞唯一要紧的问题。

## 水与氢键

水分子是弯曲的，$\mathrm{H{-}O{-}H}$ 角为 $104.5^\circ$，$\mathrm{O{-}H}$ 键长 $95.7\ \mathrm{pm}$。氧（$\chi = 3.44$）把电子密度从氢（$\chi = 2.20$）拉过来，所以每个氢带部分正电荷，氧带集中于其两对孤对电子上的部分负电荷。结果是一个很大的偶极矩——气相中 $1.85\ \mathrm{D}$——以及一个有两个氢键供体和两对按近似四面体排布的受体孤对电子的分子。正是这个四重几何构型，造成了这种液体几乎一切反常性质的根源。

::: definition 氢键 {#def-hbond}
**氢键** $\mathrm{D{-}H\cdots A}$ 是与电负性**供体**原子 $\mathrm{D}$（生物分子中为 O 或 N，偶尔为 S 或活化了的 C）共价相连的氢原子，与电负性**受体**原子 $\mathrm{A}$（O 或 N）的孤对电子之间的吸引相互作用。在生物结构中：

- $\mathrm{D\cdots A}$ 距离通常为 $0.27$–$0.31\ \mathrm{nm}$（冰中 $\mathrm{O\cdots O}$ 为 $0.28\ \mathrm{nm}$），小于两个重原子范德华半径之和（两个氧为 $0.304\ \mathrm{nm}$）；
- 该键具有**方向性**：$\mathrm{D{-}H\cdots A}$ 接近直线时最强，弯曲超过约 $30^\circ$ 后明显减弱；
- 其能量大部分是静电的（偶极-偶极与电荷-偶极），并带有共价的电荷转移成分；气相中孤立测定，水二聚体约 $20\ \mathrm{kJ\,mol^{-1}}$，中性与离子对之间为 $4$–$40\ \mathrm{kJ\,mol^{-1}}$。

在水中要紧的能量不是气相值，而是当一条溶质-溶质氢键取代两条溶质-水氢键时的**净**变化；这个净值很小，通常 $0$–$6\ \mathrm{kJ\,mol^{-1}}$。
:::

冰 Ih 中每个分子给出两个、接受两个氢键，搭成一个疏松的四面体晶格，其密度比液体还低——这就是冰能浮在水上、湖泊从上往下结冰的原因。冰融化时约 $15\ \%$ 的氢键被破坏，$25\ \mathrm{^\circ C}$ 的液体是一个涨落的网络，其中每个分子平均形成约 $3.4$ 条氢键，而其伙伴在皮秒时间尺度上不断更换。破坏这个网络需要能量，所以水具有异常高的热容（$4.18\ \mathrm{J\,g^{-1}\,K^{-1}}$）、蒸发焓（$25\ \mathrm{^\circ C}$ 下 $44.0\ \mathrm{kJ\,mol^{-1}}$），相对其分子之小还有异常高的表面张力。在生理上，这些数值意味着身体能很好地缓冲温度，并通过蒸发高效散热。

对细胞的化学最要紧的性质是**相对介电常数**（介电常数）：$25\ \mathrm{^\circ C}$ 下 $\varepsilon_\mathrm{r} = 78.4$，$37\ \mathrm{^\circ C}$ 下为 $74.2$（CRC 手册；Malmberg-Maryott 拟合）。水的永久偶极在电场中重新取向并部分抵消它，所以水中两个离子之间的相互作用比真空中弱约八十倍。这就是盐能溶解的原因：每个离子都被定向排列的水分子包围——**水化层**——晶格能由水化能量偿付，如[[thermodynamics/ions-in-solution]]中所述。

::: warning "氢键把蛋白质维系在一起"——但不是字面上的意思 {#warn-hbond-net}
一个蛋白质含有数百条氢键，人们很容易把它们乘以 $20\ \mathrm{kJ\,mol^{-1}}$，得出折叠态蛋白质极其稳定的结论。事实并非如此：整个分子的典型去折叠自由能只有 $20$–$60\ \mathrm{kJ\,mol^{-1}}$。去折叠的链并不缺少氢键；它跟水形成氢键。折叠*交换*了酰胺-水与水-水氢键，换成酰胺-酰胺与水-水氢键，账目几乎恰好抵消。氢键贡献的是**专一性**：一个被埋藏的极性基团若没有形成氢键，代价极大（它白白失去了水的伙伴），所以折叠结构必须几乎满足每一个被埋藏的供体与受体。氢键决定的与其说是*是否*形成结构，不如说是形成*哪一个*结构。
:::

## 静电相互作用

带电基团遍布生物分子：天冬氨酸与谷氨酸的羧酸根、赖氨酸与精氨酸的铵与胍、核酸的磷酸基、金属离子。它们的相互作用服从经介质修正的库仑定律。

::: proposition 介质中的库仑能 {#prop-coulomb}
在相对介电常数为 $\varepsilon_\mathrm{r}$ 的均匀介质中，相距 $r$ 的两个点电荷 $z_1e$ 与 $z_2e$ 的相互作用能（每摩尔对）为
$$
E(r) = \frac{N_\mathrm{A}\,z_1z_2e^2}{4\pi\varepsilon_0\varepsilon_\mathrm{r}\,r} = \frac{1389.4\ \mathrm{kJ\,mol^{-1}\,Å}}{\varepsilon_\mathrm{r}}\,\frac{z_1z_2}{r}.
$$ {#eq-coulomb}
在离子强度为 $I$ 的电解质中，移动的离子会屏蔽这一相互作用，在几个埃以外的距离上它近似按 $E(r)\,e^{-r/\lambda_\mathrm{D}}$ 衰减，其中**德拜长度** $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{I/(\mathrm{mol\,dm^{-3}})}$（$25\ \mathrm{^\circ C}$ 的水）。条件是连续介质静电学的条件：介质均匀且远大于电荷间距，且电荷相距不至于近到其间溶剂的分子结构要紧的程度。
:::

::: proof 数值的来历
真空中两个点电荷的能量为 $q_1q_2/4\pi\varepsilon_0 r$。在可极化的介质中，每个电荷的电场使周围的偶极取向并变形，其感生电荷部分抵消该电场；对于线性各向同性介质，任意距离处的场、从而能量，都缩小 $\varepsilon_\mathrm{r}$ 倍。乘以 $N_\mathrm{A}$ 得摩尔单位；取 $e = 1.602\,18\times10^{-19}\ \mathrm{C}$、$\varepsilon_0 = 8.854\,19\times10^{-12}\ \mathrm{F\,m^{-1}}$、$r$ 以埃计（$10^{-10}\ \mathrm{m}$），
$$
\frac{N_\mathrm{A}e^2}{4\pi\varepsilon_0} = \frac{(6.022\,14\times10^{23})(1.602\,18\times10^{-19})^2}{4\pi(8.854\,19\times10^{-12})} = 1.3894\times10^{-4}\ \mathrm{J\,m\,mol^{-1}} = 1389.4\ \mathrm{kJ\,mol^{-1}\,Å}.
$$
至于屏蔽，德拜-休克尔理论求解对电势线性化的泊松-玻尔兹曼方程：电荷周围的反离子云使电势按 $e^{-r/\lambda_\mathrm{D}}/r$ 衰减，其中 $\lambda_\mathrm{D}^2 = \varepsilon_0\varepsilon_\mathrm{r}k_\mathrm{B}T/(2N_\mathrm{A}e^2 I)$，$I$ 以 $\mathrm{mol\,m^{-3}}$ 计。代入 $\varepsilon_\mathrm{r} = 78.4$ 与 $T = 298.15\ \mathrm{K}$，得 $I = 1\ \mathrm{mol\,dm^{-3}}$ 时 $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}$，$1/\sqrt{I}$ 依赖关系由公式直接得出。
:::

这个方程一下子点明了要害。体温下每摩尔可用的热能为 $RT = 2.58\ \mathrm{kJ\,mol^{-1}}$；相互作用要达到几个 $RT$ 才算显著。在水中，相距 $0.4\ \mathrm{nm}$ 的两个异号单位电荷的能量不到 $2\,RT$ 的两倍，但在非极性环境中它是 $30\,RT$。

::: example 表面的盐桥与内部的盐桥 {#ex-salt-bridge}
赖氨酸的铵基（$+1$）与谷氨酸的羧酸根（$-1$）形成一个离子对——**盐桥**——电荷中心相距 $0.40\ \mathrm{nm}$。估算库仑能：（a）在充分暴露于水的蛋白质表面（$\varepsilon_\mathrm{r} = 78.4$）；（b）埋在蛋白质内部，那里常用有效值 $\varepsilon_\mathrm{r} \approx 4$。各与 $298\ \mathrm{K}$ 的 $RT$ 比较，并解释为什么埋藏的盐桥却仍然很少见。
::: solution
由[[#eq-coulomb]]，$z_1z_2 = -1$、$r = 4.0\ \text{Å}$：

（a）$E = -1389.4/(78.4 \times 4.0) = -4.43\ \mathrm{kJ\,mol^{-1}}$，约 $1.8\,RT$（$RT = 2.48\ \mathrm{kJ\,mol^{-1}}$）。加入 $0.15\ \mathrm{mol\,dm^{-3}}$ 的盐（$\lambda_\mathrm{D} = 0.785\ \mathrm{nm}$）会把它乘以 $e^{-0.40/0.785} = 0.60$，只剩约 $-2.7\ \mathrm{kJ\,mol^{-1}}$：一个表面盐桥约值一个 $RT$，它对稳定性的贡献实测常在 $1$–$4\ \mathrm{kJ\,mol^{-1}}$。

（b）$E = -1389.4/(4 \times 4.0) = -86.8\ \mathrm{kJ\,mol^{-1}}$，约 $35\,RT$——极其巨大。

问题在于到那里的代价。水中每个离子都强烈水化；把单个电荷从水移入低介电内部要花几十 $\mathrm{kJ\,mol^{-1}}$ 的**去溶剂化**（Born）能，这是孤立电荷永远还不上的。对一对离子，两者的去溶剂化在很大程度上抵消了埋在内部的那份强吸引，所以与溶剂暴露的一对相比，净收益很小甚至为负。因此埋藏离子对主要出现在有功能之处——活性部位与亚基界面——而且通常与更多氢键连成网络。一般教训是：不说明它取代了哪些相互作用的强度，一种相互作用的强度就毫无意义。
:::
:::

下图对一对异号单位电荷画出[[#eq-coulomb]]；把滑块从蛋白质内部的值移向水，看着势阱消失。

::: widget plot
f: -1389.4/(e*x); -1389.4/(78.4*x)
x: 2, 12
y: -150, 0
sliders: e=4:2:80:1
labels: \varepsilon_\mathrm{r} = e\ \text{（滑块）}; \text{水 } (\varepsilon_\mathrm{r} = 78.4)
hlines: -2.48
caption: 一对异号单位电荷的库仑能 $E$（单位 $\mathrm{kJ\,mol^{-1}}$）对间距 $x$（单位 Å）的曲线，由 $E = -1389.4/(\varepsilon_\mathrm{r}x)$ 计算。滑块设定介质的 $\varepsilon_\mathrm{r}$（4 是蛋白质内部常用的有效值）；第二条曲线是 $25\ \mathrm{^\circ C}$ 的水。水平线是 $298\ \mathrm{K}$ 的 $-RT$：在水中，离子对即便在接触距离也几乎不成键，而在非极性介质中它被束缚住几十个 $RT$。盐的屏蔽未画出，它会进一步削弱水的曲线。
:::

### 偶极与范德华相互作用

多数生物分子基团是中性但有极性的。电荷与偶极的相互作用能按 $1/r^2$ 衰减，两个固定偶极按 $1/r^3$，而两个自由旋转的偶极经取向的玻尔兹曼平均后按 $1/r^6$。每个分子——无论极性与否——还通过**伦敦色散**相互作用吸引其他所有分子；它源于电子云的关联涨落，同样按 $1/r^6$ 衰减。在短程，已占据轨道的重叠产生陡峭的排斥。$1/r^6$ 吸引与排斥之和，就是生物化学家所说的**范德华相互作用**。

::: definition 范德华（伦纳德-琼斯）相互作用 {#def-vdw}
两个不带电的原子或基团之间的**范德华相互作用**常用伦纳德-琼斯势建模
$$
V(r) = 4\epsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right],
$$ {#eq-lj}
其中 $\sigma$ 是 $V = 0$ 处的距离，$\epsilon$ 是势阱深度。极小值位于**范德华接触距离** $r_\mathrm{min} = 2^{1/6}\sigma \approx 1.12\,\sigma$，此处 $V = -\epsilon$。碳、氮、氧原子两两之间，$r_\mathrm{min}$ 约 $0.34$–$0.40\ \mathrm{nm}$，$\epsilon$ 约 $0.4$–$1\ \mathrm{kJ\,mol^{-1}}$。$r^{-6}$ 项有物理根据（色散）；$r^{-12}$ 项只是对重叠排斥的经验简化处理。
:::

令 $\mathrm{d}V/\mathrm{d}r = 0$ 得 $12\sigma^{12}/r^{13} = 6\sigma^6/r^7$，即 $r^6 = 2\sigma^6$，回代得 $V = 4\epsilon(\tfrac14 - \tfrac12) = -\epsilon$。每次原子-原子接触都比 $RT$ 弱，但一个折叠的蛋白质或一个贴合严紧的配体可形成数百次这样的接触；而且与氢键不同，它们不会被与水的接触一一抵消，因为蛋白质内部的堆积密度与有机晶体相当（堆积分数接近 $0.75$），而溶质周围的水却不然。所以紧密堆积累积起来价值巨大；这也解释了为什么蛋白质内部很少容得下空腔，为什么尺寸大出零点几埃的配体结合得糟糕：$r^{-12}$ 的墙毫不留情。

::: widget plot
f: 4*w*((s/x)^12 - (s/x)^6)
x: 0.28, 0.8
y: -1.5, 2
sliders: w=0.6:0.1:2:0.05; s=0.34:0.28:0.42:0.005
labels: V(r)
hlines: 0
caption: 伦纳德-琼斯势 $V(r) = 4\epsilon[(\sigma/r)^{12} - (\sigma/r)^6]$（单位 $\mathrm{kJ\,mol^{-1}}$）对 $r$（单位 nm）作图。滑块设定势阱深度 $w = \epsilon$ 与尺寸参数 $s = \sigma$。极小值 $-\epsilon$ 位于 $r = 2^{1/6}\sigma$——$\sigma = 0.34\ \mathrm{nm}$ 时为 $0.382\ \mathrm{nm}$。注意其不对称性：把接触压缩 $0.03\ \mathrm{nm}$ 的代价远大于拉伸同样幅度，这就是位阻冲突决定结合部位形状的原因。
:::

::: example 色散接触是累积的 {#ex-vdw-sum}
一个埋在结合口袋中的小配体形成 $40$ 次原子-原子接触，每次都在范德华极小附近、$\epsilon = 0.5\ \mathrm{kJ\,mol^{-1}}$。在水中、结合之前，同样的配体原子与水分子的接触给出的色散能约为口袋中的 $70\ \%$（水在溶质周围堆积较疏，其原子也不如碳易极化）。估算 $310\ \mathrm{K}$ 下范德华作用对结合的自由能净贡献，并以 $RT$ 为单位表示。再求 $\sigma = 0.35\ \mathrm{nm}$ 时的接触距离。
::: solution
在口袋中色散能为 $40 \times (-0.5) = -20\ \mathrm{kJ\,mol^{-1}}$。结合前是 $0.70 \times (-20) = -14\ \mathrm{kJ\,mol^{-1}}$。净变化为 $-20 - (-14) = -6\ \mathrm{kJ\,mol^{-1}}$，在 $310\ \mathrm{K}$ 下即 $6/2.58 = 2.3\,RT$——仅凭堆积就使结合常数提高 $e^{2.3} \approx 10$ 倍。（从口袋中被置换的水在体相中还会获得相互作用，这个粗略估计没有计入；真实计算处理整个循环。）接触距离为 $r_\mathrm{min} = 2^{1/6} \times 0.35 = 0.393\ \mathrm{nm}$。教训与氢键相同：每次范德华接触都很弱、大部分被溶剂抵消，但良好堆积与平庸堆积之间在许多接触上的*差异*在化学上是重要的。
:::
:::

## 疏水效应

甲烷在 $1\ \mathrm{bar}$、$25\ \mathrm{^\circ C}$ 下水中只溶解约 $1.4\ \mathrm{mmol\,dm^{-3}}$，油水分层。天真的解释——烃排斥水——是错的：烃与水之间的色散吸引与烃分子之间的相当。真正的解释在非极性溶质对其周围的水做了什么。

::: definition 疏水效应 {#def-hydrophobic}
**疏水效应**是水中非极性分子与基团聚集在一起、或转入非极性相以尽量减少与水接触的趋势。对小非极性溶质，它在室温附近的热力学特征是：

- 从非极性溶剂转入水的自由能为正，大致与暴露的非极性表面积成正比（每个 $\mathrm{CH_2}$ 基团约 $3.5$–$4\ \mathrm{kJ\,mol^{-1}}$，量级上每个 $\text{Å}^2$ 约 $0.1\ \mathrm{kJ\,mol^{-1}}$；经验值来自溶解度数据）；
- 这一转移受**熵**阻碍（非极性溶质入水时 $\Delta S < 0$），而焓变很小；
- 水化时热容有很大的正变化，于是转移的焓与熵都随温度强烈变化。

它是溶剂的效应，不是非极性基团之间的吸引力。
:::

分子图像是这样的。紧靠非极性表面的水分子无法把它的四个氢键方向中的任何一个指向溶质。要保住氢键，它必须让氢键沿表面切向排布，这就限制了它的取向。氢键得以保全（所以 $\Delta H$ 很小），但第一层壳中的水可及构型变少了（所以 $\Delta S$ 为负）。当两个非极性分子靠近时，这部分有序的壳层被释放回体相，水的熵增驱动结合。这就是弗兰克（Henry Frank）与埃文斯（Marjorie Evans）旧的"冰山"图像的更站得住脚的形式；水并不像冰，但其取向自由确实降低了。

::: example 把甲烷移出水的热力学 {#ex-methane-transfer}
$25\ \mathrm{^\circ C}$ 下甲烷从水转入苯，依据考兹曼分析汇编的数据（Voet 与 Voet 所列表格）给出 $\Delta H = +11.7\ \mathrm{kJ\,mol^{-1}}$、$\Delta G = -10.9\ \mathrm{kJ\,mol^{-1}}$。求 $\Delta S$ 与 $-T\Delta S$，指出哪一项驱动转移，并计算平衡浓度比 $[\mathrm{CH_4}]_\text{苯}/[\mathrm{CH_4}]_\text{水}$。
::: solution
由 $\Delta G = \Delta H - T\Delta S$：
$$
\Delta S = \frac{\Delta H - \Delta G}{T} = \frac{(11.7 + 10.9)\times10^{3}\ \mathrm{J\,mol^{-1}}}{298.15\ \mathrm{K}} = +75.8\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
故 $-T\Delta S = -22.6\ \mathrm{kJ\,mol^{-1}}$。转移是*吸热*的：甲烷在水里——若说得上什么的话——反而比在苯中结合得更好。它之所以发生全是因为熵，对它有利的 $22.6\ \mathrm{kJ\,mol^{-1}}$，即从甲烷水化壳中释放的水分子所得到的熵。分配比为
$$
K = e^{-\Delta G/RT} = \exp\!\left(\frac{10\,900}{8.314 \times 298.15}\right) = e^{4.40} = 81.
$$
（自由能取摩尔分数标准态，如考兹曼的表，所以 $K$ 严格说是摩尔分数之比；结论不变。）甲烷几乎偏向苯两个数量级，出于熵的理由而非焓的理由：这就是疏水效应的一句话版本。
:::
:::

巨大的热容变化有一个惊人的后果。由于 $\partial\Delta H/\partial T = \Delta C_p$、$\partial\Delta S/\partial T = \Delta C_p/T$，这一效应在 $25\ \mathrm{^\circ C}$ 的熵特征在更高温度下变得越来越焓性，而疏水缔合的自由能在室温以上某处达到最大强度。因此主要由疏水效应折叠的蛋白质既会被加热去稳定，也会——较少为人所知——被冷却去稳定：**冷变性**已在若干蛋白质上观察到，温度低于 $0\ \mathrm{^\circ C}$，条件是防止结冰。折叠的两态热力学见[[biochemistry/amino-acids-proteins#prop-folding]]。

疏水效应在每个尺度上组织着生物学。它驱动非极性侧链（亮氨酸、异亮氨酸、缬氨酸、苯丙氨酸）埋入球状蛋白的核心，驱动磷脂自组装成双分子层、去污剂形成胶束，驱动核酸中的碱基堆积，并贡献药物与其靶标结合的很大一部分。**兼性（amphipathic）**分子——同时带极性与非极性部分的分子，如脂肪酸盐与磷脂——通过形成极性头朝向水、尾部藏起的结构同时满足两种偏好，这一主题在[[biochemistry/carbohydrates-lipids]]中结合膜来展开。

::: quiz
两个非极性侧链在水中结合。哪一项陈述最准确地描述了 $25\ \mathrm{^\circ C}$ 下的热力学？
- [ ] $\Delta H$ 是大的负值，因为烃彼此吸引远强于它们吸引水。
- [x] $\Delta H$ 很小；$\Delta S$ 为正，因为被限制在非极性表面的水分子被释放回体相。
- [ ] 两个分子变成一个复合物，所以 $\Delta S$ 为负，过程由侧链之间的氢键驱动。
- [ ] 过程由感生电荷的库仑吸引驱动；因为水的介电常数高，这种吸引很强。
::: solution
室温附近疏水效应由熵驱动：溶质-溶质与溶质-水的色散相互作用大小相近，所以 $\Delta H$ 很小，但释放受限的壳层水提高了溶剂的熵。两个溶质的平动熵损失确实存在，但较小。高介电常数*削弱*而非增强静电吸引，而非极性侧链不形成氢键。
:::
:::

## 水的电离与 pH

水微弱电离：$\mathrm{2\,H_2O \rightleftharpoons H_3O^+ + OH^-}$，$25\ \mathrm{^\circ C}$ 下 $K_\mathrm{w} = [\mathrm{H^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$（浓度以 $\mathrm{mol\,dm^{-3}}$ 计，活度系数取 1）。电离吸热，所以 $K_\mathrm{w}$ 随温度上升：$37\ \mathrm{^\circ C}$ 时 $\mathrm{p}K_\mathrm{w} = 13.62$，中性水的 $\mathrm{pH} = 6.81$。"中性"不是一个固定的 pH。把水合质子写成 $\mathrm{H^+}$ 只是简写；水中的质子通过氢键网络以**格罗特斯（Grotthuss）机制**移动——一场键重排的接力——这就是 $\mathrm{H^+}$ 与 $\mathrm{OH^-}$ 的迁移率远高于其他离子、而酶与膜蛋白中的质子转移可以如此之快的原因。

多数生物分子是弱酸或弱碱。羧基（$\mathrm{p}K_\mathrm{a} \approx 4$）在 pH 7 几乎完全去质子化；氨基（$\mathrm{p}K_\mathrm{a} \approx 9$–$10$）几乎完全质子化；组氨酸的咪唑侧链（$\mathrm{p}K_\mathrm{a} \approx 6.0$）部分质子化，所以它是酶活性部位中最常见的质子穿梭体（[[biochemistry/enzymes]]）。把 pH、$\mathrm{p}K_\mathrm{a}$ 与质子化状态联系起来的方程，是这个领域的看家工具。

::: proposition 亨德森-哈塞尔巴尔赫方程 {#prop-hh}
对稀水溶液中共轭碱为 $\mathrm{A^-}$ 的弱酸 $\mathrm{HA}$，
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]},
$$ {#eq-hh}
而酸以碱式存在的分数为
$$
\alpha = \frac{[\mathrm{A^-}]}{[\mathrm{HA}] + [\mathrm{A^-}]} = \frac{1}{1 + 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}}.
$$ {#eq-alpha}
当浓度可以代表活度时（稀溶液，或 $\mathrm{p}K_\mathrm{a}$ 已按工作离子强度校正、写作 $\mathrm{p}K_\mathrm{a}'$），方程成立；而当它被用来由混合用量*预测*缓冲液的 pH 时，则要求 $[\mathrm{HA}]$ 与 $[\mathrm{A^-}]$ 都远大于 $[\mathrm{H^+}]$ 与 $[\mathrm{OH^-}]$。
:::

::: proof 由平衡常数出发
酸解离常数为 $K_\mathrm{a} = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]$。两边取 $-\log_{10}$：
$$
-\log_{10}K_\mathrm{a} = -\log_{10}[\mathrm{H^+}] - \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}, \quad\text{即}\quad \mathrm{p}K_\mathrm{a} = \mathrm{pH} - \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]},
$$
整理即得[[#eq-hh]]。至于分数，把 $\alpha$ 的分子分母同除以 $[\mathrm{A^-}]$：$\alpha = 1/(1 + [\mathrm{HA}]/[\mathrm{A^-}])$，而 $[\mathrm{HA}]/[\mathrm{A^-}] = [\mathrm{H^+}]/K_\mathrm{a} = 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}$。这个关系对平衡浓度本身是精确的；近似只出现在把*平衡*的 $[\mathrm{HA}]$ 与 $[\mathrm{A^-}]$ 换成配制的*形式*用量之时——而水的解离或质子化对它们的移动可以忽略，这正是前述条件。
:::

有三条推论值得记住。$\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 时基团一半质子化。相差一个 pH 单位，比率为 $10:1$（$\alpha = 0.909$ 或 $0.091$）；相差两个单位，$100:1$。而缓冲液在其 $\mathrm{p}K_\mathrm{a}$ 处抵抗 pH 变化的能力最强，下面就来证明。

::: definition 缓冲容量 {#def-buffer-capacity}
溶液的**缓冲容量** $\beta$ 是把单位体积的 pH 提高一个单位所需强碱的量，$\beta = \mathrm{d}c_\mathrm{b}/\mathrm{d\,pH}$。对总浓度为 $C$ 的单一弱酸碱对，忽略水自身的贡献，
$$
\beta = \ln 10\; C\,\frac{K_\mathrm{a}[\mathrm{H^+}]}{(K_\mathrm{a} + [\mathrm{H^+}])^2} = \ln 10\; C\,\alpha(1 - \alpha),
$$ {#eq-beta}
它在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处取最大值 $\beta_\mathrm{max} = (\ln 10)\,C/4 \approx 0.576\,C$，在一个 pH 单位之外降到最大值的三分之一。缓冲液在约 $\mathrm{p}K_\mathrm{a} \pm 1$ 范围内有用。
:::

下图同时展示[[#eq-alpha]]与归一化缓冲容量 $\beta/C$。把 $\mathrm{p}K_\mathrm{a}$ 拖到 $6.86$（磷酸盐）、$6.1$（碳酸氢盐）或 $6.0$（组氨酸），注意 pH 7.4 落在各条曲线的什么位置。

::: widget plot
f: 1/(1 + 10^(p - x)); 2.3026*10^(x - p)/(1 + 10^(x - p))^2
x: 2, 12
y: 0, 1.05
sliders: p=6.86:3:11:0.01
labels: \alpha = [\mathrm{A^-}]/C; \beta/C
hlines: 0.5
vlines: 7.4
caption: 弱酸以碱式存在的分数 $\alpha$（S 形曲线）与单位总浓度的缓冲容量 $\beta/C = \ln 10\,\alpha(1-\alpha)$（钟形曲线）对 pH $x$ 作图。滑块设定 $\mathrm{p}K_\mathrm{a}$（默认 $6.86$，磷酸的第二个 $\mathrm{p}K_\mathrm{a}$）。$\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 时酸一半解离，$\beta/C$ 在 $0.576$ 处达峰值；竖线标出 pH 7.4。水自身的缓冲贡献（只在 pH 3 以下或 11 以上才重要）未计入。
:::

## 生理缓冲体系

细胞质的 pH 维持在 $7.2$ 附近，血浆的在 $7.35$ 与 $7.45$ 之间。三套缓冲体系承担大部分工作。

**磷酸盐。**Lehninger（第 8 版）给出磷酸在 $25\ \mathrm{^\circ C}$ 的 $\mathrm{p}K_\mathrm{a}$ 为 $2.14$、$6.86$ 与 $12.4$。Harris 的《定量化学分析》中的热力学（零离子强度）常数为 $2.15$、$7.20$ 与 $12.38$；中间那个值在生理离子强度下降至约 $6.8$–$6.9$，这就是生物化学教材引用 $6.86$ 的原因，我们也用它。pH 7 附近只有中间那一对 $\mathrm{H_2PO_4^-/HPO_4^{2-}}$ 要紧；细胞质磷酸盐（无机的与代谢物中的）达几 $\mathrm{mmol\,dm^{-3}}$，使它成为主要的细胞内小分子缓冲体系。

**蛋白质。**组氨酸侧链（$\mathrm{p}K_\mathrm{a} \approx 6$，受环境影响而移动）与末端氨基在 pH 7 附近起缓冲作用。血红蛋白在血液中的浓度约为四聚体 $2.3\ \mathrm{mmol\,dm^{-3}}$（红细胞本身内约 $5\ \mathrm{mmol\,dm^{-3}}$），每个分子带有几十个组氨酸，是血液中最大的非碳酸氢盐缓冲体系，其质子化与氧的结合相耦合（玻尔效应，[[biochemistry/protein-function]]）。

**碳酸氢盐。**主要细胞外缓冲体系很不寻常，因为它的酸式是与肺交换的气体：
$$
\mathrm{CO_2(g)} \rightleftharpoons \mathrm{CO_2(aq)}, \qquad \mathrm{CO_2(aq)} + \mathrm{H_2O} \rightleftharpoons \mathrm{H_2CO_3} \rightleftharpoons \mathrm{H^+} + \mathrm{HCO_3^-}.
$$
$\mathrm{CO_2}$ 的水合本身很慢，在红细胞中由**碳酸酐酶**催化——它是最快的已知酶之一。由于 $[\mathrm{H_2CO_3}]$ 只有 $[\mathrm{CO_2(aq)}]$ 的约 $1/400$，生理学家把两个平衡合并为一个以溶解 $\mathrm{CO_2}$ 为准的表观常数，$37\ \mathrm{^\circ C}$ 下 $\mathrm{p}K_\mathrm{a}' = 6.1$，并使用亨利定律 $[\mathrm{CO_2(aq)}] = s\,p_\mathrm{CO_2}$，其中 $s = 0.0307\ \mathrm{mmol\,dm^{-3}\,mmHg^{-1}}$（常圆整为 $0.03$）。

::: example 动脉血的 pH {#ex-bicarbonate}
动脉血浆的 $[\mathrm{HCO_3^-}] = 24\ \mathrm{mmol\,dm^{-3}}$、$p_\mathrm{CO_2} = 40\ \mathrm{mmHg}$。计算其 pH。然后用同一方程解释：为什么碳酸氢盐体系的 $\mathrm{p}K_\mathrm{a}'$ 比血液 pH 低 $1.3$ 个单位，它却是有效的生理缓冲体系。
::: solution
溶解 $\mathrm{CO_2}$：$0.030 \times 40 = 1.20\ \mathrm{mmol\,dm^{-3}}$。于是
$$
\mathrm{pH} = 6.1 + \log_{10}\frac{24}{1.20} = 6.1 + \log_{10}20 = 6.1 + 1.30 = 7.40.
$$
（用未圆整的 $s = 0.0307$ 得 $7.39$；差异在 $\mathrm{p}K_\mathrm{a}' = 6.1$ 的精度之内。）按[[#def-buffer-capacity]]的判据，一对距其 $\mathrm{p}K_\mathrm{a}$ $1.3$ 个单位、碱酸比 $20:1$ 的体系在密闭容器里是差劲的缓冲液。但身体是一个**开放系统**：肺把 $p_\mathrm{CO_2}$——分母——保持在近似恒定，并能在几分钟内通过加快呼吸把它压低，而肾脏在数小时到数天内调节 $[\mathrm{HCO_3^-}]$——分子。加入的强酸把 $\mathrm{HCO_3^-}$ 变成 $\mathrm{CO_2}$，后者被呼出而不是积累，所以比率下降远小于烧杯中会发生的幅度（[[#exr-open]]对此进行了量化）。这就是临床医生把酸碱紊乱描述为"呼吸性"（$p_\mathrm{CO_2}$ 的改变）或"代谢性"（$[\mathrm{HCO_3^-}]$ 的改变）的原因：各打击方程的一项。
:::
:::

::: example 配制磷酸盐缓冲液 {#ex-phosphate}
需要 $1.00\ \mathrm{dm^3}$ pH 7.40 的 $0.100\ \mathrm{mol\,dm^{-3}}$ 磷酸钠缓冲液，用 $\mathrm{Na_2HPO_4}$（$M = 141.96\ \mathrm{g\,mol^{-1}}$）与 $\mathrm{NaH_2PO_4}$（$M = 119.98\ \mathrm{g\,mol^{-1}}$）配制。取 $\mathrm{p}K_\mathrm{a} = 6.86$，求两种盐的质量，以及所得缓冲液的缓冲容量。
::: solution
由[[#eq-hh]]，$[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = 10^{7.40 - 6.86} = 10^{0.54} = 3.467$。碱式分数为 $\alpha = 3.467/4.467 = 0.7762$，所以缓冲液含 $\mathrm{HPO_4^{2-}}$ $0.07762\ \mathrm{mol}$、$\mathrm{H_2PO_4^-}$ $0.02238\ \mathrm{mol}$：
$$
m(\mathrm{Na_2HPO_4}) = 0.07762 \times 141.96 = 11.0\ \mathrm{g}, \qquad m(\mathrm{NaH_2PO_4}) = 0.02238 \times 119.98 = 2.69\ \mathrm{g}.
$$
由[[#eq-beta]]，容量为 $\beta = 2.303 \times 0.100 \times 0.7762 \times 0.2238 = 0.040\ \mathrm{mol\,dm^{-3}}$ 每 pH 单位，是同一浓度在 pH 6.86 所能给出的最大值的 $70\ \%$。实践中要用校准过的 pH 计核对 pH，并用少量酸或碱微调，因为 $\mathrm{p}K_\mathrm{a}$ 取决于离子强度与温度。（磷酸钠是低危险度的实验室化学品，照常佩戴护目镜即可。）
:::
:::

::: warning 亨德森-哈塞尔巴尔赫方程不是滴定的全部 {#warn-hh-limits}
这个方程经常在适用域之外被使用。它给不出只有弱酸或只有碱的溶液的 pH（此时对数的一项接近零，且水的平衡要紧），而对组分浓度与 $[\mathrm{H^+}]$ 可以相比的极稀缓冲液会给出荒谬结果。对多元酸，每个 $\mathrm{p}K_\mathrm{a}$ 只适用于自己的那一对，且只有当相邻 $\mathrm{p}K_\mathrm{a}$ 分得足够开（超过约 2 个单位）时才行。对蛋白质中的基团，"$\mathrm{p}K_\mathrm{a}$"是取决于邻近电荷的表观值，所以蛋白质的滴定不是游离氨基酸曲线的简单加和——即[[biochemistry/amino-acids-proteins#def-pi]]的主题。
:::

## 后续内容

后面每一章都会用到这里的思想。[[biochemistry/amino-acids-proteins]]中的蛋白质折叠在疏水效应与链的构象熵之间权衡，由氢键与堆积决定细节；本章的酸碱方程给出氨基酸的电荷与蛋白质的等电点。[[biochemistry/protein-function]]中的配体结合与[[biochemistry/enzymes]]中的催化，利用的正是低介电口袋中精确安置的电荷与氢键。[[biochemistry/carbohydrates-lipids]]中的膜是看得见的疏水效应，而[[biochemistry/nucleic-acids]]的碱基堆积与氢键搭成双螺旋。同一套连续介质静电学将在[[thermodynamics/ions-in-solution]]（德拜-休克尔理论）和[[medicinal-chemistry/drug-binding]]中的药物设计中重现。至于贯穿各处使用的对数与指数数学，见[Maths Atlas](/learn/maths/)。

::: history
氢键于 1920 年进入化学：拉蒂默（Wendell Latimer）与罗德巴什（Worth Rodebush）在伯克利的路易斯（Gilbert Lewis）门下，把水的缔合与氢氧化铵作为碱的弱势，解释为一个氢核"被夹在两个八隅体之间"。1933 年贝纳尔（John Desmond Bernal）与福勒（Ralph Fowler）提出液体的四面体氢键模型；1935 年鲍林（Linus Pauling）用质子的无序解释了冰的残余熵（每摩尔 $R\ln\tfrac32$）。pH 的语言出自嘉士伯实验室：瑟伦森（Søren Sørensen）1909 年引入 pH 标度，比亨德森（Lawrence Henderson）为血液中的碳酸写出缓冲平衡方程晚一年；哈塞尔巴尔赫（Karl Albert Hasselbalch）1916 年把亨德森方程写成对数形式。德拜（Peter Debye）与休克尔（Erich Hückel）1923 年发表电解质屏蔽理论，伦纳德-琼斯（John Lennard-Jones）1924 年提出他的反幂势。疏水水合的热力学由弗兰克（Henry Frank）与埃文斯（Marjorie Evans）1945 年描述（"冰山"）；考兹曼（Walter Kauzmann）1959 年的综述论证"疏水键"是蛋白质折叠的主要力量——这一观点在坦福德（Charles Tanford）的《疏水效应》（1973）一书中得到巩固。
:::

::: summary
- 水是小而强极性的分子，四面体排布的两个供体与两个受体；其氢键网络赋予它高热容、高蒸发焓与高相对介电常数（$25\ \mathrm{^\circ C}$ 下 $78.4$，$37\ \mathrm{^\circ C}$ 下 $74.2$）。
- 氢键 $\mathrm{D{-}H\cdots A}$ 有方向性，气相中约值 $20\ \mathrm{kJ\,mol^{-1}}$，但在水中其*净*贡献很小；氢键带来的是专一性多于稳定性。
- 介质中的库仑能为 $1389.4\,z_1z_2/(\varepsilon_\mathrm{r}r)\ \mathrm{kJ\,mol^{-1}}$（$r$ 以 Å 计），再被盐在德拜长度 $0.304/\sqrt{I}\ \mathrm{nm}$ 上进一步屏蔽；离子对在水中很弱，在蛋白质内部虽强但去溶剂化代价高昂。
- 范德华相互作用（伦纳德-琼斯势，极小在 $2^{1/6}\sigma$）单个弱于 $RT$，但紧密堆积的众多累加起来十分可观。
- 疏水效应在室温附近是溶剂的熵效应，$\Delta H$ 小而热容变化大；它驱动蛋白质折叠、膜的形成与许多配体结合。
- 亨德森-哈塞尔巴尔赫方程：$\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log([\mathrm{A^-}]/[\mathrm{HA}])$；缓冲容量 $\beta = \ln 10\,C\alpha(1-\alpha)$ 在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处最大。
- 细胞内由磷酸盐与组氨酸缓冲；碳酸氢盐（$\mathrm{p}K_\mathrm{a}' = 6.1$，$p_\mathrm{CO_2}$ 由肺设定）是一个开放体系缓冲液，把血液维持在 pH 7.4。
:::

## 习题

::: exercise 醋酸缓冲对的比率 {level=1 check="10"}
醋酸在 $25\ \mathrm{^\circ C}$ 的 $\mathrm{p}K_\mathrm{a} = 4.76$。什么样的 $[\mathrm{CH_3COO^-}]/[\mathrm{CH_3COOH}]$ 比率能给出 pH 5.76 的缓冲液？此时酸有多大分数已去质子化？（输入该比率。）
::: solution
由亨德森-哈塞尔巴尔赫方程，$\log_{10}([\mathrm{A^-}]/[\mathrm{HA}]) = 5.76 - 4.76 = 1.00$，所以比率为 $10^{1.00} = 10$。去质子化分数为 $\alpha = 10/11 = 0.909$。此时缓冲容量只有 $\ln 10 \times 0.909 \times 0.091 = 0.19$ 倍的 $C$，为其最大值的三分之一，正合"缓冲液只在 $\mathrm{p}K_\mathrm{a}$ 一个单位内有效"的通例。
:::
:::

::: exercise 部分埋藏的盐桥 {level=1 check="34.7"}
精氨酸的胍基（$+1$）与天冬氨酸的羧酸根（$-1$）在部分埋藏区域相距 $0.40\ \mathrm{nm}$，该区域有效 $\varepsilon_\mathrm{r} = 10$。计算其库仑能的大小。（$\lvert E\rvert$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入，保留三位有效数字。）
::: solution
$E = -1389.4 \times 1 \times 1/(10 \times 4.0) = -34.7\ \mathrm{kJ\,mol^{-1}}$，故 $\lvert E\rvert = 34.7\ \mathrm{kJ\,mol^{-1}}$——是在水中数值（$4.43$）的八倍，约 $310\ \mathrm{K}$ 下的 $13\,RT$。蛋白质区域的有效介电常数不是基本常数；视埋藏程度与周围极性，取 4 到 20 之间的值，所以这类估计最多只有两倍的精度。
:::
:::

::: exercise 代谢性酸中毒 {level=1 check="7.32"}
某患者动脉血 $[\mathrm{HCO_3^-}] = 20\ \mathrm{mmol\,dm^{-3}}$，而 $p_\mathrm{CO_2} = 40\ \mathrm{mmHg}$。取 $\mathrm{p}K_\mathrm{a}' = 6.1$、$s = 0.030\ \mathrm{mmol\,dm^{-3}\,mmHg^{-1}}$，计算 pH，并指出这是哪一类紊乱。（pH 输入两位小数。）
::: solution
$[\mathrm{CO_2(aq)}] = 0.030 \times 40 = 1.20\ \mathrm{mmol\,dm^{-3}}$，$\mathrm{pH} = 6.1 + \log_{10}(20/1.20) = 6.1 + 1.222 = 7.32$。碳酸氢盐（"代谢"项）偏低而 $p_\mathrm{CO_2}$ 正常，所以这是代谢性酸中毒；预期的生理反应是加快呼吸以降低 $p_\mathrm{CO_2}$，使比率回到 20 附近。（这是一道化学练习，不是临床评估。）
:::
:::

::: exercise 接触距离 {level=1 check="0.382"}
两个碳原子的伦纳德-琼斯参数为 $\sigma = 0.340\ \mathrm{nm}$、$\epsilon = 0.36\ \mathrm{kJ\,mol^{-1}}$。求势能极小处的间距与该处能量，以及 $r = \sigma$ 处的能量。（$r_\mathrm{min}$ 以 nm 输入，保留三位有效数字。）
::: solution
$r_\mathrm{min} = 2^{1/6}\sigma = 1.1225 \times 0.340 = 0.382\ \mathrm{nm}$，且 $V(r_\mathrm{min}) = -\epsilon = -0.36\ \mathrm{kJ\,mol^{-1}}$，约体温下的 $0.14\,RT$。$r = \sigma$ 时括号两项都等于 1，$V = 0$：从极小向内压缩仅 $0.042\ \mathrm{nm}$ 就已花掉整个势阱深度，再压缩则能量陡升。
:::
:::

::: exercise 配制给定缓冲容量的缓冲液 {level=2 check="0.0288"}
$50.0\ \mathrm{mmol\,dm^{-3}}$ HEPES 缓冲液（$25\ \mathrm{^\circ C}$ 下 $\mathrm{p}K_\mathrm{a} = 7.5$）的最大缓冲容量是多少？在什么 pH 达到？若在该 pH 加入 $1.0\ \mathrm{mmol\,dm^{-3}}$ 强酸，pH 会改变多少？（$\beta_\mathrm{max}$ 以 $\mathrm{mol\,dm^{-3}}$ 每 pH 单位输入，保留三位有效数字。）
::: solution
$\beta_\mathrm{max} = \ln 10\,C/4 = 2.3026 \times 0.0500/4 = 0.0288\ \mathrm{mol\,dm^{-3}}$ 每 pH 单位，在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 7.5$ 处达到。少量加入时 $\Delta\mathrm{pH} \approx -\Delta c/\beta = -0.0010/0.0288 = -0.035$。（精确计算：碱式与酸式由 $25.0$ 和 $25.0$ 变为 $24.0$ 和 $26.0\ \mathrm{mmol\,dm^{-3}}$，故 $\mathrm{pH} = 7.5 + \log_{10}(24/26) = 7.465$，变化 $-0.035$。）
:::
:::

::: exercise 乙烷与疏水效应 {level=2 check="84.2"}
$25\ \mathrm{^\circ C}$ 下乙烷从水转入苯，与[[#ex-methane-transfer]]所用相同的汇编给出 $\Delta H = +9.2\ \mathrm{kJ\,mol^{-1}}$、$\Delta G = -15.9\ \mathrm{kJ\,mol^{-1}}$。计算 $\Delta S$，并把每个碳的自由能与甲烷比较。（$\Delta S$ 以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 输入，保留三位有效数字。）
::: solution
$\Delta S = (9.2 + 15.9)\times10^{3}/298.15 = 84.2\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故 $-T\Delta S = -25.1\ \mathrm{kJ\,mol^{-1}}$；转移同样是吸热而熵驱动的。多出的 $\mathrm{CH_2}$ 基团使 $\Delta G$ 多负 $5.0\ \mathrm{kJ\,mol^{-1}}$，与由更长短系列得到的每个亚甲基 $3.5$–$4\ \mathrm{kJ\,mol^{-1}}$ 同量级：疏水驱动力大致与非极性表面积成正比。
:::
:::

::: exercise 德拜屏蔽 {level=2 check="0.785"}
计算 $25\ \mathrm{^\circ C}$ 下生理离子强度 $0.15\ \mathrm{mol\,dm^{-3}}$ 时水的德拜长度，以及与纯水相比，相距 $0.40\ \mathrm{nm}$ 的两个电荷的库仑能被屏蔽缩小为几分之一。再对 $I = 0.010\ \mathrm{mol\,dm^{-3}}$ 重算一遍。（$I = 0.15$ 时的 $\lambda_\mathrm{D}$ 以 nm 输入，保留三位有效数字。）
::: solution
$\lambda_\mathrm{D} = 0.304/\sqrt{0.15} = 0.785\ \mathrm{nm}$，屏蔽因子为 $e^{-0.40/0.785} = 0.60$。$I = 0.010$ 时，$\lambda_\mathrm{D} = 0.304/0.100 = 3.04\ \mathrm{nm}$，因子为 $e^{-0.40/3.04} = 0.88$。所以生理盐分消除短程离子对相互作用的约 $40\ \%$，以及 $1$–$2\ \mathrm{nm}$ 以外几乎全部远程相互作用；这就是 DNA 结合蛋白这类高度带电分子的结合对盐浓度如此敏感的原因。（在可与离子尺寸相比的距离上，指数形式本身也只是近似的。）
:::
:::

::: exercise 由第一性原理求缓冲容量 {level=3}
一溶液含弱酸 $\mathrm{HA}$ 与其钠盐，总浓度 $C = [\mathrm{HA}] + [\mathrm{A^-}]$，向其中加入浓度为 $c_\mathrm{b}$ 的强碱。（a）用电荷平衡证明：当 $[\mathrm{H^+}]$ 与 $[\mathrm{OH^-}]$ 相对缓冲物种可忽略时，$c_\mathrm{b} = C\alpha + \text{常数}$，并由此导出[[#eq-beta]]。（b）证明 $\beta$ 在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处最大，并求比值 $\beta(\mathrm{p}K_\mathrm{a} \pm 1)/\beta_\mathrm{max}$。
::: hint
把 $\alpha$ 写成 $h = [\mathrm{H^+}] = 10^{-\mathrm{pH}}$ 的函数，并用 $\mathrm{d}h/\mathrm{d\,pH} = -h\ln 10$。
:::
::: solution
（a）设盐贡献 $c_\mathrm{s}$ 的 $\mathrm{Na^+}$。电荷平衡：$[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$，其中 $[\mathrm{Na^+}] = c_\mathrm{s} + c_\mathrm{b}$。忽略 $[\mathrm{H^+}]$ 与 $[\mathrm{OH^-}]$，得 $c_\mathrm{b} = [\mathrm{A^-}] - c_\mathrm{s} = C\alpha - c_\mathrm{s}$。由 $\alpha = K_\mathrm{a}/(K_\mathrm{a} + h)$，
$$
\frac{\mathrm{d}\alpha}{\mathrm{d}h} = -\frac{K_\mathrm{a}}{(K_\mathrm{a} + h)^2}, \qquad \beta = \frac{\mathrm{d}c_\mathrm{b}}{\mathrm{d\,pH}} = C\,\frac{\mathrm{d}\alpha}{\mathrm{d}h}\,\frac{\mathrm{d}h}{\mathrm{d\,pH}} = \ln 10\;C\,\frac{K_\mathrm{a}h}{(K_\mathrm{a} + h)^2},
$$
而 $\alpha(1 - \alpha) = K_\mathrm{a}h/(K_\mathrm{a} + h)^2$，故即为 $\ln 10\,C\alpha(1-\alpha)$。（计入水再加 $\ln 10\,([\mathrm{H^+}] + [\mathrm{OH^-}])$。）（b）$\alpha(1-\alpha)$ 是关于 $\alpha$ 的开口向下的抛物线，在 $\alpha = \tfrac12$ 即 $h = K_\mathrm{a}$、$\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处取最大值 $\tfrac14$。在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$ 处，$\alpha = 10/11$ 或 $1/11$，$\alpha(1-\alpha) = 10/121$，所以比值为 $(10/121)/(1/4) = 40/121 = 0.33$。
:::
:::

::: exercise 碳酸氢盐缓冲：开放与封闭 {level=3 check="7.17" #exr-open}
血浆起始时 $[\mathrm{HCO_3^-}] = 24.0$、$[\mathrm{CO_2(aq)}] = 1.20\ \mathrm{mmol\,dm^{-3}}$（$\mathrm{p}K_\mathrm{a}' = 6.1$）。加入强酸使 $[\mathrm{H^+}]$ 达 $10.0\ \mathrm{mmol\,dm^{-3}}$，且全部与碳酸氢盐反应。计算最终 pH：（a）在密闭容器中，生成的 $\mathrm{CO_2}$ 留在溶液里；（b）在呼吸使 $[\mathrm{CO_2(aq)}]$ 保持 $1.20\ \mathrm{mmol\,dm^{-3}}$ 的开放体系中。忽略非碳酸氢盐缓冲。（情形（b）的 pH 输入两位小数。）
::: hint
每个质子把一个 $\mathrm{HCO_3^-}$ 变成一个 $\mathrm{CO_2}$；两种情形的差别只在于 $\mathrm{CO_2}$ 的去向。
:::
::: solution
反应后 $[\mathrm{HCO_3^-}] = 24.0 - 10.0 = 14.0\ \mathrm{mmol\,dm^{-3}}$。

（a）密闭：$[\mathrm{CO_2}] = 1.20 + 10.0 = 11.2\ \mathrm{mmol\,dm^{-3}}$，$\mathrm{pH} = 6.1 + \log_{10}(14.0/11.2) = 6.1 + 0.097 = 6.20$——灾难性的下降 1.2 个单位。

（b）开放：$\mathrm{pH} = 6.1 + \log_{10}(14.0/1.20) = 6.1 + 1.067 = 7.17$，只下降 $0.23$。

开放体系把一个平庸的封闭缓冲液变成优秀的缓冲液，因为酸式刚一生成就被移走。加快呼吸（把 $p_\mathrm{CO_2}$ 压到正常以下）会使 pH 更接近 7.4：$[\mathrm{CO_2}] = 0.70\ \mathrm{mmol\,dm^{-3}}$ 时为 $6.1 + \log_{10}20 = 7.40$。非碳酸氢盐缓冲（血红蛋白、磷酸盐、血浆蛋白）也会吸收一部分酸，使两种情形下的下降都更小。
:::
:::

::: exercise 埋藏的氢键值得形成吗？ {level=3}
某蛋白质可采取两种构象。构象 A 中，一个埋藏的丝氨酸羟基向主链羰基提供一条氢键。构象 B 中侧链旋转，羟基仍然埋藏但不形成氢键。在去折叠态，羟基与羰基各与水形成氢键。用[[#warn-hbond-net]]的账目解释：（a）为什么 A 中这条氢键相对于去折叠态对折叠稳定性的净贡献很小；（b）为什么 A 与 B 之间的自由能差却很大（几 $\mathrm{kJ\,mol^{-1}}$）。（c）若 $310\ \mathrm{K}$ 下 $G_\mathrm{B} - G_\mathrm{A} = 6.0\ \mathrm{kJ\,mol^{-1}}$，A 与 B 的布居比是多少？
::: solution
（a）折叠成 A 打破丝氨酸-水与羰基-水氢键，形成一条丝氨酸-羰基键；被置换的水在体相中形成一条水-水氢键。前后氢键数目差不多，所以净焓变很小；剩下的是几何最优的分子内键与跟水成键之间的微小差别，加上熵项，通常 $0$–$6\ \mathrm{kJ\,mol^{-1}}$。

（b）在 B 中，羟基与羰基失去了水的伙伴而一无所得：两条氢键份量的相互作用被放弃，在低介电内部没有得到补偿。所以 B 远高于 A，对这个基团来说也高于去折叠态。这正是专一性论证：被埋藏的极性基团必须被满足，所以氢键在紧致的备选结构中选择正确的结构，尽管它们相对于去折叠链对稳定性几乎没有增益。

（c）$N_\mathrm{A}/N_\mathrm{B} = e^{\Delta G/RT} = \exp(6000/(8.314 \times 310)) = e^{2.33} = 10.3$：每 1 个 B 约有 10 个 A。
:::
:::
