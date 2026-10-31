一个在试管中以皮摩尔级亲和力结合靶点的分子还算不上药。服下之后，它必须溶在肠道里，穿过肠壁，挺过肝脏的首过，在血液中一边部分结合着白蛋白一边运行，离开血液进入靶点所在的组织，并在肝酶改写它的结构或被肾滤出之前停留足够长的时间以发挥作用。1980 与 1990 年代，大量候选药物在临床试验中失败，正是出于这些原因——药代动力学不佳，而非没有效应——这个教训改变了药物化学：效价与“类药性”如今从第一个苗头起就放在一起优化。

本章讲的就是这段旅程，其要点缩写在 **ADME** 里：吸收（absorption）、分布（distribution）、代谢（metabolism）与排泄（excretion）。**药代动力学**（机体对药物做什么）是对药物浓度时间进程的定量描述；**药效动力学**（药物对机体做什么）是[[medicinal-chemistry/drug-binding]]的主题。我们先看决定分子能否穿越膜的物理化学——电离、亲脂性与类药性的经验规则——再看细胞色素P450酶药物代谢的化学，最后看把清除率与分布容积变成浓度-时间曲线的简单房室模型。酸碱平衡来自[[general-chemistry-2/acids-bases]]，一级动理学来自[[kinetics/rate-laws]]。

**安全说明。** 本章所有剂量、浓度与清除率都是为了让算术清楚的**示意值**。它们不是任何药物的剂量，绝不可当作剂量使用；真实的剂量由处方医生依据现行处方集为具体患者确定。

## 吸收：穿越膜

多数药物经口服用，多数在小肠经上皮细胞脂双层的**被动扩散**吸收。菲克（Fick）定律说，通量正比于膜通透性与浓度差；通透性本身又大体正比于分子对膜的分配系数，并反比于其大小与形成氢键的基团数目——分子进入烃核心之前这些基团必须脱去水。带电物种几乎完全不穿越。因此电离与亲脂性是药物化学家最先检查的两个性质。

::: definition 分配系数与分布系数 {#def-logp}
中性化合物的**分配系数** $P$ 是其在水与 1-辛醇中平衡浓度之比，$P = [\mathrm{X}]_\mathrm{oct}/[\mathrm{X}]_\mathrm{aq}$，通常以 $\log P$ 报出。给定 pH 下的**分布系数** $D$ 是两相中所有形式（中性与电离的）*总*浓度之比，$D = [\mathrm{X}]_\mathrm{oct,total}/[\mathrm{X}]_\mathrm{aq,total}$，以 $\log D_\mathrm{pH}$ 报出（例如 $\log D_{7.4}$）。辛醇是膜的实验替身：湿辛醇疏水，却能接受和给出氢键。
:::

::: proposition 可电离化合物的 log D {#prop-logd}
假设只有中性形式分配进入辛醇（离子留在水中）。对解离常数为 $K_\mathrm{a}$ 的一元酸 HA，
$$
\log D = \log P - \log_{10}\!\left(1 + 10^{\,\mathrm{pH} - \mathrm{p}K_\mathrm{a}}\right),
$$ {#eq-logd-acid}
对共轭酸 $\mathrm{BH^+}$ 的解离常数为 $K_\mathrm{a}$ 的碱 B，
$$
\log D = \log P - \log_{10}\!\left(1 + 10^{\,\mathrm{p}K_\mathrm{a} - \mathrm{pH}}\right).
$$ {#eq-logd-base}
:::

::: proof
对酸，辛醇相中只有 HA，所以 $D = [\mathrm{HA}]_\mathrm{oct}/([\mathrm{HA}]_\mathrm{aq} + [\mathrm{A^-}]_\mathrm{aq})$。分子分母同除以 $[\mathrm{HA}]_\mathrm{aq}$，并用 $[\mathrm{A^-}]/[\mathrm{HA}] = K_\mathrm{a}/[\mathrm{H^+}] = 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}}$（亨德森-哈塞尔巴尔赫方程）即得 $D = P/(1 + 10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}})$；取对数。对碱，水相中含 B 与 $\mathrm{BH^+}$，且 $[\mathrm{BH^+}]/[\mathrm{B}] = 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}}$，同样的步骤给出[[#eq-logd-base]]。离子不分配的假设所带来的误差取决于反离子（离子对确实会进入辛醇），它通常把远离 $\mathrm{p}K_\mathrm{a}$ 处的 $\log D$ 限制在约 $\log P - 3$ 或 $-4$。
:::

于是化合物基本未电离时 $\log D$ 等于 $\log P$，在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处下降 $0.30$（两倍），此后每偏离一个 pH 单位再降一个单位。多数药物是弱碱（胺）或弱酸（羧酸、四氮唑、磺酰胺），所以它们的有效亲脂性沿消化道变化，从胃（pH 1–3）到小肠（pH 6–7.5）再到血液（pH 7.4）。

::: example 酸的 log D 与碱的 log D {#ex-logd}
(a) 一个布洛芬类型的羧酸药物 $\log P = 4.0$、$\mathrm{p}K_\mathrm{a} = 4.4$。求 $\log D_{7.4}$。(b) 一个胺类药物 $\log P = 3.0$、共轭酸 $\mathrm{p}K_\mathrm{a} = 9.5$。求 $\log D_{7.4}$。
::: solution
(a) 由[[#eq-logd-acid]]，$\log D = 4.0 - \log(1 + 10^{3.0}) = 4.0 - 3.000 = 1.0$。在血液 pH 下该酸 99.9 % 电离，其有效亲脂性比 $\log P$ 所示低一千倍。

(b) 由[[#eq-logd-base]]，$\log D = 3.0 - \log(1 + 10^{2.1}) = 3.0 - 2.104 = 0.90$。该胺在 pH 7.4 下 99.2 % 质子化。两个化合物仍能充分穿越膜，因为少量中性形式的扩散很快，而且中性形式一旦被移走，两种形式之间的平衡立即重建。
:::
:::

::: widget plot
f: P - log10(1 + 10^(x - a)); P - log10(1 + 10^(b - x))
x: 0, 14
y: -3, 5
sliders: P=3:0:5:0.1; a=4.4:2:7:0.1; b=9.5:7:11:0.1
labels: \text{弱酸}, \mathrm{p}K_\mathrm{a} = a; \text{弱碱}, \mathrm{p}K_\mathrm{a} = b
vlines: 1.5; 6.5; 7.4
caption: 同一 $\log P$ 的弱酸（$\mathrm{p}K_\mathrm{a} = a$）与弱碱（$\mathrm{p}K_\mathrm{a} = b$）的 $\log D$ 随 pH 的变化，出自[[#prop-logd]]。竖线标出胃（1.5）、小肠（6.5）与血液（7.4）。酸在胃中最亲脂，碱在碱性介质中最亲脂；曲线在 $\mathrm{p}K_\mathrm{a}$ 处转折，此后以斜率 1 下降。把胺的 $\mathrm{p}K_\mathrm{a}$ 压低两个单位——例如在氮旁放一个吸电子基——就能在不改变 $\log P$ 的情况下把 $\log D_{7.4}$ 提高近两个单位。
:::

当膜两侧 pH 不同，中性形式达到平衡，而电离的形式被截留在它生成的一侧。平衡时两侧中性浓度相等，所以对酸而言，膜两侧*总*浓度之比为 $(1 + 10^{\mathrm{pH}_1 - \mathrm{p}K_\mathrm{a}})/(1 + 10^{\mathrm{pH}_2 - \mathrm{p}K_\mathrm{a}})$——**pH 分配假说**（布罗迪（Brodie）、肖尔（Shore）与同事，1950 年代）。酸在碱性一侧富集，碱在酸性一侧富集；奥美拉唑在壁细胞酸性分泌小管中的富集（[[medicinal-chemistry/drug-targets]]）就是这种**离子截留**的设计案例。

::: example 弱酸的离子截留 {#ex-trap}
一个 $\mathrm{p}K_\mathrm{a} = 3.5$ 的酸经胃黏膜在胃液（pH 1.5）与血浆（pH 7.4）之间达到平衡。设只有中性形式穿越，求总浓度之比，血浆 : 胃。
::: solution
比值 $= (1 + 10^{7.4 - 3.5})/(1 + 10^{1.5 - 3.5}) = (1 + 7943)/(1.01) = 7.9\times10^{3}$。尽管该酸在胃中主要为中性，因而很容易进入黏膜细胞，平衡时它却几乎全部在血浆一侧以电离形式存在。实际上，小肠以其巨大的表面积吸收的酸性药物甚至比胃还多；pH 分配假说描述的是平衡，而吸收是速率，还由面积与停留时间决定。
:::
:::

并非所有转运都是被动的。**摄取转运体**把一些药物运进来（肽转运体 PEPT1 吸收 β-内酰胺类抗生素与缬氨酸酯前药伐昔洛韦；氨基酸转运体 LAT1 把左旋多巴运过血脑屏障），而**外排转运体**——最重要的是 P-糖蛋白（P-gp，*ABCB1*）——把许多亲脂性药物从肠细胞泵回肠腔、从脑泵出。溶解度也能限制吸收：分子必须先溶解才能扩散，而许多现代亲脂性候选药物溶解度很差——这正是[[medicinal-chemistry/drug-development]]中盐型与晶型选择的主题。

### 类药性：利平斯基五规则

1997 年，辉瑞的利平斯基（Christopher Lipinski）与同事考察了约 2,000 个已进入 II 期临床试验的药物的性质，并把它们与当时高通量筛选产出的化合物作比较。他们把所见总结为一条经验法则，并因其中 5 的倍数而得名。

::: definition 利平斯基五规则（经验的） {#def-ro5}
口服化合物符合以下条目不止一条时，其吸收或渗透不良的可能性更大：

- 氢键供体多于 5 个（按 OH 与 NH 基团总数计）；
- 氢键受体多于 10 个（按 N 与 O 原子总数计）；
- 摩尔质量超过 $500\ \mathrm{g\,mol^{-1}}$；
- 计算 $\log P$ 超过 5。

这条规则是**经验**的——对过去药物的统计描述，不是物理定律——而且它明确排除转运体的底物（许多抗生素、维生素与强心苷）。韦伯（Daniel Veber）与同事（2002）为大鼠口服生物利用度补充了两条经验判据：可旋转键至多 10 根，极性表面积至多 $140\ \text{Å}^2$。
:::

五规则之所以管用，是因为每条判据都是一项物理代价的代理：氢键基团进入膜必须去溶剂化，尺寸减慢扩散并降低溶解度，而亲脂性过高带来溶解度差、血浆蛋白结合高与代谢快。它作为**活性**的过滤器并不管用，而一些重要的药物类别在它之外——天然产物、大环、肽，以及[[medicinal-chemistry/biologics]]的靶向蛋白降解剂——即如今所谓“超越五规则”的领地。

::: example 应用五规则 {#ex-ro5}
对照规则检查：(a) 普萘洛尔，$\mathrm{C_{16}H_{21}NO_2}$，含一个 OH、一个 NH，$\log P \approx 3.0$；(b) 环孢素（ciclosporin），$\mathrm{C_{62}H_{111}N_{11}O_{12}}$，环状十一肽，含四个酰胺 NH、一个 OH，$\log P \approx 3$。环孢素却有可观的口服吸收。这可能是什么原因？
::: solution
(a) 摩尔质量 $= 16(12.011) + 21(1.008) + 14.007 + 2(15.999) = 259.3\ \mathrm{g\,mol^{-1}}$；供体 2；受体（N + O）3；$\log P$ 3.0。无违反。

(b) 摩尔质量 $= 62(12.011) + 111(1.008) + 11(14.007) + 12(15.999) = 1202.6\ \mathrm{g\,mol^{-1}}$；供体 $4 + 1 = 5$（不算违反）；受体 $11 + 12 = 23$；$\log P$ 约 3。两项违反（质量与受体），所以规则预测吸收不良。环孢素逃出了预测，因为它的 11 个酰胺氮中有 7 个是 *N*-甲基化的，而且在非极性环境中，它剩余的 NH 基团与自身的羰基形成分子内氢键。这个分子像变色龙一样改变构象，进入膜时把极性基团藏进大环内部。数原子看不见构象效应——这正是规则是指南而非定律的原因。
:::
:::

## 分布

进入血液后，药物分布进入组织。分布程度用一个相当抽象的数来概括。

::: definition 分布容积、清除率与半衰期 {#def-pk}
**分布容积** $V$ 是体内药量 $A$ 与其血浆浓度 $C$ 之间的比例常数：$V = A/C$。**清除率** $\mathrm{CL}$ 是消除速率与血浆浓度之间的比例常数：消除速率 $= \mathrm{CL}\times C$；它是单位时间内被完全清除药物的血浆体积。一级消除下，**消除速率常数**为 $k = \mathrm{CL}/V$，**半衰期**为 $t_{1/2} = \ln 2/k = \ln 2\, V/\mathrm{CL}$。
:::

$V$ 不是物理体积。局限于血浆的药物，成人的 $V \approx 3\ \mathrm{dm^3}$；均匀分布于总体水的药物 $V \approx 40\ \mathrm{dm^3}$；强烈结合组织磷脂的亲脂性碱，表观 $V$ 可达数百甚至数千升，远超身体的体积，只因留在血浆中的太少。与白蛋白高度结合的酸往往 $V$ 小；亲脂性碱 $V$ 大。

**血浆蛋白结合**之所以要紧，是因为只有未结合的药物能穿越毛细血管壁、到达靶点并被肾滤过。未结合分数 $f_\mathrm{u}$ 的范围从接近 1 到低于 0.01。例如华法林约 99 % 结合白蛋白。然而，仅蛋白结合的变化很少能长久改变稳态下的*未结合*浓度，因为低提取率药物的清除率随 $f_\mathrm{u}$ 上升（见[[#prop-wellstirred]]）——这是关于“置换相互作用”的无谓担忧的常见来源。

**血脑屏障**——以紧密连接相连、高表达 P-gp 的脑毛细血管内皮细胞——排斥大多数极性分子和 P-gp 底物。中枢神经系统药物平均而言比其他药物更小、极性更低（极性表面积低于约 $90\ \text{Å}^2$）、也更少带酸性；反过来，第二代抗组胺药之所以不那么镇静，正是因为被做成了 P-gp 底物或不入脑的两性离子。

## 代谢

肝脏把亲脂性分子转化为极性分子，以便肾排出。这是针对膳食中亲脂性外源物质的防御机制，药物也被如此对待。代谢按惯例分为 **I 相**反应——引入或显露一个极性基团（氧化、还原、水解）——与 **II 相**反应——在其上连接一个大极性基团（与葡萄糖醛酸、硫酸、谷胱甘肽、乙酰基或氨基酸的结合）。

### 细胞色素P450酶

最重要的 I 相酶是**细胞色素P450**（CYP），结合在肝与肠细胞内质网上的血红素-硫醇盐单加氧酶。它们的名字来自还原型酶与一氧化碳复合体在 $450\ \mathrm{nm}$ 处的吸收带。人类有 57 个 CYP 基因，但少数几个——CYP3A4、CYP2D6、CYP2C9、CYP2C19 与 CYP1A2——代谢了大多数药物，仅 CYP3A4 就参与其中约三分之一的代谢（Zanger 与 Schwab，2013）。它的活性部位又大又灵活，这就是它接受如此多多姿底物的原因。

总反应把 $\mathrm{O_2}$ 的一个氧原子插入 C–H 键，另一个还原成水：
$$
\mathrm{R{-}H + O_2 + NADPH + H^+ \rightarrow R{-}OH + H_2O + NADP^+}.
$$

::: algorithm P450 催化循环 {#algo-p450}
1. 底物结合在血红素附近，把一个水配体从铁(III)静息态置换下来；铁由低自旋变为高自旋，使其更容易被还原。
2. 一个电子经细胞色素P450还原酶来自 NADPH，把 $\mathrm{Fe^{III}}$ 还原为 $\mathrm{Fe^{II}}$。
3. $\mathrm{O_2}$ 结合铁(II)，生成最好描述为 $\mathrm{Fe^{III}{-}O{-}O^{\cdot -}}$（超氧化物）的氧合配合物。
4. 第二个电子与一个质子给出氢过氧配合物 $\mathrm{Fe^{III}{-}OOH}$。
5. 对远端氧的第二次质子化与 O–O 键的异裂放出水，留下**化合物 I**：一个氧代铁(IV)单元，卟啉被氧化为自由基阳离子，$(\mathrm{Por^{\cdot +}})\mathrm{Fe^{IV}{=}O}$，比静息态高两个氧化当量。轴向的半胱氨酸硫醇盐把电子密度推向铁，并帮助断裂 O–O 键。
6. 化合物 I 从底物的 C–H 键攫取一个氢原子，生成碳自由基与 $\mathrm{Fe^{IV}{-}OH}$。
7. **氧回弹**：自由基与铁上的羟基结合，生成醇并再生 $\mathrm{Fe^{III}}$；产物离去。
:::

氢攫取这一步解释了 P450 氧化的位点选择性——它遵循自由基稳定性，再经分子各部位接近铁的程度修正：苄位与烯丙位 C–H 键、以及氮或氧旁的 C–H 键优先被进攻，分子最外露的位置最先被进攻。胺氮 α 位的氧化给出甲醇胺，随即碎裂为仲胺与醛（*N*-**脱烷基化**）；醚氧 α 位的氧化给出 *O*-脱烷基化；芳环与烯烃被环氧化。发现代谢“软点”的药物化学家可以把它堵住——在芳环上放一个氟，在苄位放一个甲基，或用氘取代氢（氢攫取上的动力学同位素效应拖慢这一步；2017 年获批的氘丁苯那嗪（deutetrabenazine）是第一个氘代药物）。整体降低亲脂性会减少 P450 代谢，这正是类药性亲脂性判据存在的理由之一。

### 结合反应与活性代谢物

II 相中，UDP-葡萄糖醛酸转移酶把葡萄糖醛酸接到羟基、羧基与氨基上；磺基转移酶把硫酸接到酚上；*N*-乙酰转移酶酰化芳香胺与肼（NAT2 的一种常见遗传多态性把人分为“快”与“慢”乙酰化者）；谷胱甘肽 *S*-转移酶把三肽谷胱甘肽加到亲电体上。

最后这个反应是保护性的。有些 I 相产物是活性亲电体，能与蛋白质共价结合。教科书式的例子是对乙酰氨基酚（paracetamol，acetaminophen）。它大部分直接葡萄糖醛酸化或硫酸化，但有一小部分被 CYP2E1 与 CYP3A4 氧化成 *N*-乙酰对苯醌亚胺（NAPQI），一种喹啉亚胺，正常情况下立即被谷胱甘肽捕获。谷胱甘肽耗尽时，NAPQI 与肝蛋白的半胱氨酸残基反应，造成肝细胞损伤；解毒剂乙酰半胱氨酸的作用是把谷胱甘肽补回来。药物化学家会筛查能被这样活化的基团（“结构警示”）——苯胺、噻吩、呋喃、迈克尔受体——并在项目早期检测谷胱甘肽加合物。

### 前药与药物相互作用

代谢也可为我所用。**前药**是在体内转化为活性药物的无活性化合物。依那普利（enalapril）是 ACE 抑制剂依那普利拉（enalaprilat）的乙酯，后者作为二元羧酸吸收很差；酯酶在吸收后把它显露出来（[[medicinal-chemistry/drug-case-studies]]）。伐昔洛韦（valaciclovir）是阿昔洛韦（aciclovir）的 L-缬氨酸酯，经 PEPT1 吸收后水解为阿昔洛韦，使口服生物利用度提高数倍。

因为少数酶处理许多药物，药物之间会相互作用。CYP3A4 的**抑制剂**（抗真菌药酮康唑、HIV 蛋白酶抑制剂利托那韦、在肠道作用于 CYP3A4 的葡萄柚汁呋喃香豆素）会升高其他 CYP3A4 底物的浓度；**诱导剂**（抗生素利福平、草药圣约翰草——经由核受体 PXR）在数天内增加酶的量并把浓度压低。利托那韦对 CYP3A4 的抑制被有意利用：小剂量为合并给予的蛋白酶抑制剂“增强”（boost）浓度（[[medicinal-chemistry/structure-based-design]]）。依据关于药物相互作用研究的 ICH M12 指导原则（2024 年采纳），每个新药都要评估相互作用风险。

## 排泄与清除

肾通过三条途径排出极性药物与代谢物：未结合药物的肾小球滤过（健康青年人的肾小球滤过率约 $120\ \mathrm{cm^3\,min^{-1}}$，即 $7\ \mathrm{dm^3\,h^{-1}}$）、近端小管的主动分泌、以及小管液中亲脂性中性物种的被动重吸收——同一个 pH 分配原理，这就是尿 pH 能改变弱酸弱碱排泄的原因。肝通过代谢和分泌入胆汁消除药物。不同器官的清除率相加。

对肝而言，清除率既取决于酶工作的快慢，也取决于血流把药物送到酶面前的快慢。

::: proposition 肝清除率：良好搅拌模型 {#prop-wellstirred}
设血液以速率 $Q$ 流过肝，血中未结合分数为 $f_\mathrm{u}$，肝酶以**固有清除率** $\mathrm{CL_{int}}$ 消除未结合药物（血流不受限时酶会表现出的清除率）。若肝表现得像一个充分混合的单一房室、流出浓度等于器官内浓度，则稳态时的**提取率**与肝清除率为
$$
E = \frac{f_\mathrm{u}\mathrm{CL_{int}}}{Q + f_\mathrm{u}\mathrm{CL_{int}}}, \qquad \mathrm{CL_H} = QE = \frac{Q\,f_\mathrm{u}\mathrm{CL_{int}}}{Q + f_\mathrm{u}\mathrm{CL_{int}}},
$$ {#eq-wellstirred}
而口服剂量逃脱肝脏首过代谢的分数为 $F_\mathrm{H} = 1 - E$。
:::

::: proof
设 $C_\mathrm{in}$ 为流入肝的血液浓度，$C_\mathrm{out}$ 为流出浓度。稳态质量衡算：移除速率等于流入减流出，$Q(C_\mathrm{in} - C_\mathrm{out})$。良好搅拌模型中酶看到的是流出浓度，其中分数 $f_\mathrm{u}$ 为未结合，所以代谢速率为 $\mathrm{CL_{int}}f_\mathrm{u}C_\mathrm{out}$。令两者相等，$Q(C_\mathrm{in} - C_\mathrm{out}) = f_\mathrm{u}\mathrm{CL_{int}}C_\mathrm{out}$，于是 $C_\mathrm{out}/C_\mathrm{in} = Q/(Q + f_\mathrm{u}\mathrm{CL_{int}})$。提取率为 $E = (C_\mathrm{in} - C_\mathrm{out})/C_\mathrm{in} = 1 - C_\mathrm{out}/C_\mathrm{in}$，即第一个表达式。清除率是移除速率除以进入浓度，$Q(C_\mathrm{in} - C_\mathrm{out})/C_\mathrm{in} = QE$。自肠道吸收的药物在进入体循环之前先经门静脉入肝，其中分数 $E$ 在路上就被移除。
:::

两个极限使模型有用。若 $f_\mathrm{u}\mathrm{CL_{int}} \ll Q$（**低提取率**药物），$\mathrm{CL_H} \approx f_\mathrm{u}\mathrm{CL_{int}}$：清除率由酶活性与蛋白结合决定，酶抑制剂或诱导剂按同比例改变它。若 $f_\mathrm{u}\mathrm{CL_{int}} \gg Q$（**高提取率**药物），$\mathrm{CL_H} \approx Q$：清除率受血流限制，但口服生物利用度低，因为每剂的大部分在首过被移除。

::: example 首过提取 {#ex-wellstirred}
某药未结合分数 $f_\mathrm{u} = 0.10$，肝固有清除率 $\mathrm{CL_{int}} = 1800\ \mathrm{dm^3\,h^{-1}}$；肝血流 $Q = 90\ \mathrm{dm^3\,h^{-1}}$（成人典型值）。求 $E$、$\mathrm{CL_H}$ 与 $F_\mathrm{H}$。若某相互作用把 $f_\mathrm{u}$ 升到 0.20，会发生什么？
::: solution
$f_\mathrm{u}\mathrm{CL_{int}} = 180\ \mathrm{dm^3\,h^{-1}}$。由[[#eq-wellstirred]]，$E = 180/(90 + 180) = 0.667$，$\mathrm{CL_H} = 90 \times 0.667 = 60\ \mathrm{dm^3\,h^{-1}}$，$F_\mathrm{H} = 0.333$：口服剂量的三分之二在首过损失。$f_\mathrm{u} = 0.20$ 时，$f_\mathrm{u}\mathrm{CL_{int}} = 360$，$E = 360/450 = 0.80$，$\mathrm{CL_H} = 72\ \mathrm{dm^3\,h^{-1}}$：自由分数加倍只使清除率升高 20 %，因为血流正在成为限制。若是低提取率药物，同样的改变几乎会使清除率加倍。
:::
:::

## 浓度-时间曲线

### 单房室模型

最简单的模型把身体当作一个充分混合的体积 $V$，药物以清除率 $\mathrm{CL}$ 从中移除。

::: proposition 单房室静脉推注 {#prop-bolus}
向体积 $V$ 的单一房室迅速静脉注射剂量 $D$、一级消除（清除率 $\mathrm{CL}$ 与浓度无关）时，血浆浓度为
$$
C(t) = \frac{D}{V}\,e^{-kt}, \qquad k = \frac{\mathrm{CL}}{V},
$$ {#eq-bolus}
而浓度-时间曲线从 $0$ 到 $\infty$ 的面积内为 $\mathrm{AUC} = D/\mathrm{CL}$。
:::

::: proof
体内药量 $A = VC$，消除速率为 $\mathrm{CL}\,C$，所以 $V\,dC/dt = -\mathrm{CL}\,C$，即 $dC/dt = -kC$，$k = \mathrm{CL}/V$。由 $C(0) = D/V$，解为[[#eq-bolus]]（[[kinetics/rate-laws]]）。积分得 $\mathrm{AUC} = \int_0^\infty (D/V)e^{-kt}\,dt = D/(Vk) = D/\mathrm{CL}$。结果 $\mathrm{AUC} = D/\mathrm{CL}$ 比模型更一般：把 $\mathrm{CL}\,C$ 对全部时间积分给出消除的总量，即剂量，对任何从所采样房室消除的线性模型都成立。
:::

这个推导展示了药代动力学的逻辑：$V$ 与 $\mathrm{CL}$ 是生理上有意义的参数，$k$ 与 $t_{1/2}$ 由它们导出。一个药物半衰期长，可以因为消除慢，*或*因为分布容积巨大——同一张图，两种截然不同的情形。

::: example 由两份血浆样品求参数 {#ex-bolus}
静脉注射 $500\ \mathrm{mg}$（示意值）后，血浆浓度在 $1.0\ \mathrm{h}$ 为 $8.0\ \mathrm{mg\,dm^{-3}}$，在 $5.0\ \mathrm{h}$ 为 $2.0\ \mathrm{mg\,dm^{-3}}$。设单房室行为，求 $k$、$t_{1/2}$、$C(0)$、$V$、$\mathrm{CL}$ 与 $\mathrm{AUC}$。
::: solution
$k = \ln(8.0/2.0)/(5.0 - 1.0\ \mathrm{h}) = 1.386/4.0 = 0.347\ \mathrm{h^{-1}}$，所以 $t_{1/2} = 0.693/0.347 = 2.0\ \mathrm{h}$（两个半衰期把浓度从 8 降到 2）。反向外推，$C(0) = 8.0\,e^{0.347 \times 1.0} = 11.3\ \mathrm{mg\,dm^{-3}}$。于是 $V = D/C(0) = 500/11.3 = 44\ \mathrm{dm^3}$，$\mathrm{CL} = kV = 0.347 \times 44.2 = 15\ \mathrm{dm^3\,h^{-1}}$，$\mathrm{AUC} = D/\mathrm{CL} = C(0)/k = 11.3/0.347 = 33\ \mathrm{mg\,h\,dm^{-3}}$。44 升的容积提示分布进入了大约相当于总体水的空间。
:::
:::

### 口服吸收：Bateman 函数

口服给药后，药物以速率常数 $k_\mathrm{a}$ 的一级过程自肠道进入房室，而只有一部分 $F$——**生物利用度**——以原形到达体循环（吸收不完全与首过代谢造成的损失，$F = F_\mathrm{abs}F_\mathrm{G}F_\mathrm{H}$）。

::: proposition 一级吸收与一级消除 {#prop-bateman}
一级吸收（$k_\mathrm{a}$）与一级消除（$k$），$k_\mathrm{a} \neq k$，生物利用度 $F$、剂量 $D$ 下，单房室药物的血浆浓度为
$$
C(t) = \frac{F D\,k_\mathrm{a}}{V(k_\mathrm{a} - k)}\left(e^{-kt} - e^{-k_\mathrm{a}t}\right),
$$ {#eq-bateman}
极大值在 $t_\mathrm{max} = \ln(k_\mathrm{a}/k)/(k_\mathrm{a} - k)$。面积为 $\mathrm{AUC} = FD/\mathrm{CL}$，所以 $F$ 按 $F = (\mathrm{AUC_{oral}}/D_\mathrm{oral})/(\mathrm{AUC_{iv}}/D_\mathrm{iv})$ 测定。
:::

::: proof
肠道药量 $A_\mathrm{g}$ 服从 $dA_\mathrm{g}/dt = -k_\mathrm{a}A_\mathrm{g}$，$A_\mathrm{g}(0) = FD$，故 $A_\mathrm{g} = FDe^{-k_\mathrm{a}t}$。体内药量服从 $dA/dt = k_\mathrm{a}A_\mathrm{g} - kA$，一个连串一级过程（[[kinetics/rate-laws]]）。乘以积分因子 $e^{kt}$：$d(Ae^{kt})/dt = k_\mathrm{a}FDe^{(k - k_\mathrm{a})t}$。从 0 积分，$A(0) = 0$：$Ae^{kt} = k_\mathrm{a}FD(e^{(k - k_\mathrm{a})t} - 1)/(k - k_\mathrm{a})$，故 $A = k_\mathrm{a}FD(e^{-kt} - e^{-k_\mathrm{a}t})/(k_\mathrm{a} - k)$；除以 $V$。令 $dC/dt = 0$ 得 $ke^{-kt} = k_\mathrm{a}e^{-k_\mathrm{a}t}$，于是 $e^{(k_\mathrm{a} - k)t} = k_\mathrm{a}/k$，$t_\mathrm{max}$ 随之得到。把[[#eq-bateman]]从 0 到 ∞ 积分得 $FDk_\mathrm{a}(1/k - 1/k_\mathrm{a})/(V(k_\mathrm{a} - k)) = FD/(Vk) = FD/\mathrm{CL}$。
:::

::: example 达峰时间与峰浓度 {#ex-bateman}
某药（示意值）$k_\mathrm{a} = 1.5\ \mathrm{h^{-1}}$，$k = 0.20\ \mathrm{h^{-1}}$，$V = 40\ \mathrm{dm^3}$，$F = 0.80$。口服 $200\ \mathrm{mg}$ 后，求 $t_\mathrm{max}$ 与 $C_\mathrm{max}$。
::: solution
$t_\mathrm{max} = \ln(1.5/0.20)/(1.5 - 0.20) = 2.015/1.30 = 1.55\ \mathrm{h}$。[[#eq-bateman]] 中的系数为 $FDk_\mathrm{a}/(V(k_\mathrm{a} - k)) = (0.80)(200)(1.5)/((40)(1.30)) = 4.615\ \mathrm{mg\,dm^{-3}}$，而 $e^{-0.20 \times 1.55} - e^{-1.5 \times 1.55} = 0.7335 - 0.0977 = 0.6358$。所以 $C_\mathrm{max} = 4.615 \times 0.6358 = 2.9\ \mathrm{mg\,dm^{-3}}$。注意 $t_\mathrm{max}$ 只依赖于两个速率常数，与剂量无关；而吸收更慢（$k_\mathrm{a}$ 更小）会推迟并削低峰，却不改变 AUC。
:::
:::

::: widget plot
f: 5*a/(a - k)*(exp(-k*x) - exp(-a*x)); 5*exp(-k*x)
x: 0, 24
y: 0, 5.5
sliders: a=1.5:0.3:4:0.05; k=0.2:0.05:0.25:0.01
labels: \text{口服，} C(t); \text{静脉推注}
caption: 血浆浓度（以 $FD/V$ 为单位，此处 $5\ \mathrm{mg\,dm^{-3}}$）随时间（小时）的变化，口服剂量（[[#eq-bateman]]，吸收速率常数 $a = k_\mathrm{a}$）与同一生物利用度剂量的静脉推注（[[#eq-bolus]]），消除速率常数为 $k$。吸收慢会把峰压平并推迟；$k_\mathrm{a}$ 接近 $k$ 时，口服曲线长时间保持低位。$k_\mathrm{a} \gg k$ 时，两条曲线的末端斜率都是 $k$；但若吸收是较慢的过程，末端相反映的却是 $k_\mathrm{a}$——缓释制剂有意利用的“翻转”（flip-flop）情形。
:::

### 重复给药与稳态

多数药物需要反复给药。每间隔 $\tau$ 给药 $D$、线性动理学下，浓度曲线相互叠加：每一剂都把自己衰减的指数加在此前各剂残留之上。静脉推注方案给药后，第 $n$ 剂刚给药完时的浓度为 $(D/V)(1 + e^{-k\tau} + \dots + e^{-(n-1)k\tau})$，一个等比级数。$n \to \infty$ 时它趋于 $(D/V)/(1 - e^{-k\tau})$，所以**蓄积系数**为
$$
R_\mathrm{ac} = \frac{1}{1 - e^{-k\tau}},
$$ {#eq-accumulation}
而稳态时一个给药间隔内的平均浓度为 $C_\mathrm{ss,avg} = FD/(\mathrm{CL}\,\tau)$，因为稳态时每个间隔消除的量等于吸收的量。恒速输注 $R_0$ 下，稳态浓度为 $C_\mathrm{ss} = R_0/\mathrm{CL}$。每种情形下，趋近稳态都按 $1 - e^{-kt}$：一个半衰期后一半，$3.3$ 个半衰期后 90 % ——与剂量或给药间隔无关。这些关系正是药物化学家追求与一日一次或两次给药相容的半衰期的原因。

::: widget plot
f: sum(heaviside(x - n*T)*exp(-k*(x - n*T)), n, 0, 15); 1/(1 - exp(-k*T))
x: 0, 72
y: 0, 5
sliders: T=8:2:24:1; k=0.1:0.03:0.5:0.01
labels: C(t)\ \text{（以 } D/V\text{ 为单位）}; \text{稳态峰值}
caption: 每 $T$ 小时重复静脉给药，消除速率常数 $k$（以 $\mathrm{h^{-1}}$ 计）：锯齿波上升，趋向的稳态峰值为首峰的 $R_\mathrm{ac} = 1/(1 - e^{-kT})$ 倍（[[#eq-accumulation]]）。$T$ 等于一个半衰期（$kT = 0.69$）时浓度加倍；$T$ 远短于半衰期时药物强烈蓄积，每个间隔内的起伏变小。达到稳态的时间只取决于 $k$，与 $T$ 无关。
:::

::: warning 半衰期不是药物清除快慢的度量 {#warn-halflife}
$t_{1/2} = \ln 2\,V/\mathrm{CL}$ 同时依赖于清除率与容积。消除快但分布进入巨大组织容积的药物（许多亲脂性胺）可以有很长的半衰期；消除慢但局限于血浆的药物可以有很短的。抑制一个肝酶时，改变的是 $\mathrm{CL}$；组织结合改变时，改变的是 $V$。推断机理需要两个原始参数，而不是只看半衰期。同样，若药物的效应取决于靶点驻留时间（[[medicinal-chemistry/drug-binding]]）或不可逆抑制（[[medicinal-chemistry/drug-targets]]），长半衰期也不意味着作用时间长。
:::

::: quiz
一个新化合物效价高，$\log D_{7.4} = 5.8$，摩尔质量 $620\ \mathrm{g\,mol^{-1}}$，水溶解度差，与肝微粒体孵育时很快消失。哪些改变最可能改善它的口服药代动力学？
- [x] 降低亲脂性，例如用一个更小的极性杂环替换一个芳环。
- [ ] 再加两个芳环以提高亲和力，以便需要更低的浓度。
- [x] 用氟或删去易氧化基团封闭 P450 氧化位点。
- [x] 在能保持效价的前提下降低摩尔质量。
::: solution
这个化合物违反五规则的两条判据，而且亲脂性高——后者通常带来溶解度差与氧化代谢快。降低 $\log D$ 与尺寸、封闭代谢软点，都在针对这些成因。加芳环会让每一个问题都更糟——汉恩（Michael Hann，2011）把“分子肥胖”描述为先导优化的通病。
:::
:::

::: history
托雷尔（Torsten Teorell）1937 年发表了药物分布的第一个房室模型，多斯特（Friedrich Hartmut Dost）的《血药浓度》（*Der Blutspiegel*，1953）为这门学问带来了 *pharmacokinetics* 这个名字。pH 分配假说由布罗迪（Bernard Brodie）、肖尔（Parkhurst Shore）、尚克（Lewis Schanker）与美国国立卫生研究院的同事在 1950 年代根据药物自胃与肠吸收的测定发展出来。布罗迪与阿克塞尔罗德（Julius Axelrod）还证明（1948–1949）对乙酰氨基酚是乙酰苯胺与非那西丁的活性代谢物，这是药物经由代谢物起效的早期例证。肝中与一氧化碳复合体在 $450\ \mathrm{nm}$ 有吸收带的那个色素由克林伯格（Martin Klingenberg）1958 年描述，并由大村（Tsuneo Omura）与佐藤（Ryo Sato）在 1962–1964 年鉴定为一种血红素蛋白——细胞色素P450；埃斯特布鲁克（Ronald Estabrook）、库珀（David Cooper）与罗森塔尔（Otto Rosenthal）1963 年证明它催化类固醇羟基化。格罗夫斯（John Groves）1976 年提出氧回弹机理。罗兰（Malcolm Rowland）、贝内特（Leslie Benet）与格雷厄姆（Garry Graham）1973 年引入清除率概念与良好搅拌肝模型。利平斯基的五规则 1997 年发表于 *Advanced Drug Delivery Reviews*，改变了化合物库的设计方式。
:::

## 后续内容

药代动力学性质与效价在整个项目中一起优化。[[medicinal-chemistry/hits-and-leads]]引入了亲脂性配体效率，它嘉奖不靠亲脂性换来的效价；[[medicinal-chemistry/structure-activity]]则引入了把 $\log P$ 作为变量的汉施方程。前药设计与代谢封闭在[[medicinal-chemistry/drug-case-studies]]的案例中重现。生物药（[[medicinal-chemistry/biologics]]）经由完全不同的途径清除——蛋白水解、靶点介导的清除与新生儿 Fc 受体的再循环——半衰期也截然不同。ADME 性质的临床前与临床测定，包括首次人体给药，见[[medicinal-chemistry/drug-development]]。本章所用线性微分方程的数学见[[kinetics/rate-laws]]与 Maths Atlas（`/learn/maths/`）。

::: summary
- ADME——吸收、分布、代谢、排泄——决定一个效价高的分子能否到达靶点，并以有用的游离浓度停留足够长的时间。
- 被动吸收需要中性形式；$\log D = \log P - \log(1 + 10^{\pm(\mathrm{pH} - \mathrm{p}K_\mathrm{a})})$，膜两侧的 pH 差把电离药物截留在某一侧。
- 利平斯基五规则（不超过一条：供体 $> 5$、受体 $> 10$、$M > 500$、$\log P > 5$）是口服类药性的经验指南，有已知例外，如转运体底物与变色龙式大环。
- 分布容积 $V = A/C$ 与清除率（消除速率 $= \mathrm{CL}\,C$）是原始参数；$k = \mathrm{CL}/V$，$t_{1/2} = \ln 2\,V/\mathrm{CL}$，$\mathrm{AUC} = FD/\mathrm{CL}$。
- 细胞色素P450酶经氢攫取、经化合物 I $(\mathrm{Por^{\cdot+}})\mathrm{Fe^{IV}{=}O}$ 的氧回弹氧化 C–H 键；II 相结合反应使代谢物带极性；活性代谢物被谷胱甘肽捕获。
- 良好搅拌模型中肝清除率遵循 $\mathrm{CL_H} = Qf_\mathrm{u}\mathrm{CL_{int}}/(Q + f_\mathrm{u}\mathrm{CL_{int}})$；高提取率药物首过损失大。
- 口服给药时 $C(t)$ 服从 Bateman 函数；重复给药时浓度按 $1/(1 - e^{-k\tau})$ 蓄积，约经四到五个半衰期达到稳态。
:::

## 习题

以下所有剂量与浓度都只是用于计算的示意值。

::: exercise 分布容积 {level=1 check="40"}
静脉推注 $200\ \mathrm{mg}$ 给出外推的初始血浆浓度 $5.0\ \mathrm{mg\,dm^{-3}}$。分布容积是多少？（$V$ 以 $\mathrm{dm^3}$ 输入。）
::: solution
$V = D/C(0) = 200/5.0 = 40\ \mathrm{dm^3}$——成人约总体水。
:::
:::

::: exercise 由清除率与容积求半衰期 {level=1 check="6.93"}
某药 $V = 70\ \mathrm{dm^3}$，$\mathrm{CL} = 7.0\ \mathrm{dm^3\,h^{-1}}$。求它的半衰期，以及恒速输注时达到稳态 90 % 所需的时间。（$t_{1/2}$ 以小时输入，保留三位有效数字。）
::: solution
$k = \mathrm{CL}/V = 0.100\ \mathrm{h^{-1}}$，所以 $t_{1/2} = 0.6931/0.100 = 6.93\ \mathrm{h}$。$1 - e^{-kt} = 0.90$ 时达到稳态 90 %，即 $t = \ln 10/k = 23\ \mathrm{h}$（$3.32$ 个半衰期）。
:::
:::

::: exercise 胺的 log D {level=1 check="0.9"}
某胺类药物 $\log P = 3.0$，其共轭酸 $\mathrm{p}K_\mathrm{a} = 9.5$。计算 $\log D_{7.4}$，并说明若氟化把 $\mathrm{p}K_\mathrm{a}$ 降到 7.4 而 $\log P$ 不变，$\log D_{7.4}$ 会怎样变化。（第一个 $\log D_{7.4}$ 输入到小数点后一位。）
::: solution
由[[#eq-logd-base]]，$\log D_{7.4} = 3.0 - \log(1 + 10^{2.1}) = 3.0 - 2.10 = 0.9$。$\mathrm{p}K_\mathrm{a} = 7.4$ 时，$\log D_{7.4} = 3.0 - \log 2 = 2.7$，升高 1.8 个单位。
:::
:::

::: exercise 由 AUC 求口服生物利用度 {level=2 check="0.6"}
静脉注射 $100\ \mathrm{mg}$ 给出 $\mathrm{AUC} = 20\ \mathrm{mg\,h\,dm^{-3}}$；同一受试者口服同一药物 $200\ \mathrm{mg}$ 给出 $\mathrm{AUC} = 24\ \mathrm{mg\,h\,dm^{-3}}$。求 $F$ 与清除率。（输入 $F$。）
::: solution
$F = (24/200)/(20/100) = 0.12/0.20 = 0.60$。由静脉数据，$\mathrm{CL} = D/\mathrm{AUC} = 100/20 = 5.0\ \mathrm{dm^3\,h^{-1}}$。按剂量归一化假定在这一剂量范围内为线性动理学。
:::
:::

::: exercise 蓄积 {level=2 check="3.41"}
半衰期为 $12\ \mathrm{h}$ 的药物每 $6\ \mathrm{h}$ 重复静脉给药一次。稳态峰浓度将超过首剂峰值多少倍？（$R_\mathrm{ac}$ 保留三位有效数字。）
::: solution
$k\tau = (\ln 2/12)(6) = 0.3466$，所以 $e^{-k\tau} = 2^{-1/2} = 0.7071$，由[[#eq-accumulation]]，$R_\mathrm{ac} = 1/(1 - 0.7071) = 3.41$。以半个半衰期为间隔给药产生三倍以上的蓄积；以一个半衰期为间隔给药则为 2。
:::
:::

::: exercise 输注达到目标浓度 {level=2 check="10"}
为示意计算，设某药 $\mathrm{CL} = 5.0\ \mathrm{dm^3\,h^{-1}}$、$V = 50\ \mathrm{dm^3}$，要以恒速输注把血浆浓度维持在 $2.0\ \mathrm{mg\,dm^{-3}}$。稳态需要多大的输注速率？不给负荷剂量的话，进入目标值 10 % 以内需要多久？（速率以 $\mathrm{mg\,h^{-1}}$ 输入。）
::: solution
$R_0 = C_\mathrm{ss}\,\mathrm{CL} = 2.0 \times 5.0 = 10\ \mathrm{mg\,h^{-1}}$。$k = 5.0/50 = 0.10\ \mathrm{h^{-1}}$，达到 $C_\mathrm{ss}$ 的 90 % 需 $\ln 10/0.10 = 23\ \mathrm{h}$。这种缓慢的逼近正是药代动力学设计中需要快速达到目标浓度时使用负荷量 $V C_\mathrm{ss}$ 的原因。
:::
:::

::: exercise 达峰时间 {level=3}
(a) 由[[#eq-bateman]]证明 $t_\mathrm{max} = \ln(k_\mathrm{a}/k)/(k_\mathrm{a} - k)$，且交换 $k_\mathrm{a}$ 与 $k$ 时它不变。(b) 解释为什么这一对称性意味着单条口服浓度-时间曲线无法告诉你末端下降反映的是消除还是吸收，以及哪个补充实验能消除这一歧义。
::: hint
对 (a)，把 $t_\mathrm{max}$ 中两个常数的角色互换写出来并化简。对 (b)，想想静脉注射测的是什么。
:::
::: solution
(a) $dC/dt = 0$ 要求 $ke^{-kt} = k_\mathrm{a}e^{-k_\mathrm{a}t}$，于是 $(k_\mathrm{a} - k)t = \ln(k_\mathrm{a}/k)$，即得 $t_\mathrm{max}$。互换：$\ln(k/k_\mathrm{a})/(k - k_\mathrm{a}) = (-\ln(k_\mathrm{a}/k))/(-(k_\mathrm{a} - k)) = t_\mathrm{max}$。而且除尺度外，$C(t)$ 的形状只通过对称组合 $\left(e^{-kt} - e^{-k_\mathrm{a}t}\right)/(k_\mathrm{a} - k)$ 依赖 $k$ 与 $k_\mathrm{a}$，这个组合在互换下也恰好两次变号。

(b) 拟合口服曲线得到两个指数，却不能说哪个是哪个：吸收快、消除慢的药与吸收慢、消除快的药给出同样的形状（“翻转”）。不同的只是尺度，而尺度牵涉未知的 $F/V$。静脉注射没有吸收相，直接测出 $k$，歧义随之消除。
:::
:::

::: exercise 低提取率与高提取率 {level=3 check="15"}
在良好搅拌模型中取 $Q = 90\ \mathrm{dm^3\,h^{-1}}$，比较两个药物：X 的 $\mathrm{CL_{int}} = 90\ \mathrm{dm^3\,h^{-1}}$，Y 的 $\mathrm{CL_{int}} = 1800\ \mathrm{dm^3\,h^{-1}}$，两者 $f_\mathrm{u} = 0.10$。(a) 分别求 $\mathrm{CL_H}$ 与 $F_\mathrm{H}$。(b) 若 X 的 $f_\mathrm{u}$ 加倍到 0.20，求其 $\mathrm{CL_H}$。(c) 一个把 $\mathrm{CL_{int}} 减半的抑制剂会更显著地影响哪个药的口服暴露量？（X 在 $f_\mathrm{u} = 0.20$ 的 $\mathrm{CL_H}$ 以 $\mathrm{dm^3\,h^{-1}}$ 输入。）
::: hint
口服暴露量为 $\mathrm{AUC_{oral}} = F D/\mathrm{CL}$；只有肝清除且吸收完全时，$F_\mathrm{H}/\mathrm{CL_H} = 1/(f_\mathrm{u}\mathrm{CL_{int}})$。
:::
::: solution
(a) X：$f_\mathrm{u}\mathrm{CL_{int}} = 9$，$E = 9/99 = 0.091$，$\mathrm{CL_H} = 8.2\ \mathrm{dm^3\,h^{-1}}$，$F_\mathrm{H} = 0.91$。Y：由[[#ex-wellstirred]]，$\mathrm{CL_H} = 60\ \mathrm{dm^3\,h^{-1}}$，$F_\mathrm{H} = 0.33$。

(b) X 取 $f_\mathrm{u} = 0.20$：$f_\mathrm{u}\mathrm{CL_{int}} = 18$，$E = 18/108 = 0.167$，$\mathrm{CL_H} = 15\ \mathrm{dm^3\,h^{-1}}$——几乎加倍，正如低提取率药物所预期。

(c) 由[[#eq-wellstirred]]，$F_\mathrm{H}/\mathrm{CL_H} = (1 - E)/(QE) = 1/(f_\mathrm{u}\mathrm{CL_{int}})$，所以对*两个*药，口服 AUC 都与 $f_\mathrm{u}\mathrm{CL_{int}}$ 成反比：$\mathrm{CL_{int}}$ 减半在两种情形下都使口服暴露量加倍。但机理不同。X 的升高几乎全部来自全身清除率的下降；Y 则主要来自生物利用度升高（$F_\mathrm{H}$ 从 0.33 升到 0.50），而它的全身清除率只从 60 降到 $45\ \mathrm{dm^3\,h^{-1}}$。静脉给药后，只有 X 会出现大的变化。
:::
:::
