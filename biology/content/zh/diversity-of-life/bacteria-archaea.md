在生命最初约 20 亿年里，地球上只有细菌与古菌两类生物；直到今天，它们仍是数量最多、分布最广、代谢最多样的生命形式。对地球原核细胞总数的估计，从约 $10^{30}$ 个（Hans-Curt Flemming 与 Stefan Wuertz，2019）到 $4$–$6\times10^{30}$ 个（William Whitman、David Coleman 与 William Wiebe，1998）不等，其中大多数在土壤、沉积物和深部地下。它们的总生物量仅次于植物：按 Yinon Bar-On、Rob Phillips 与 Ron Milo 的普查（2018），全部生物约 550 吉吨碳中，植物约占 450，细菌约 70，古菌约 7——真菌约 12、原生生物约 4、全部动物约 2。细菌与古菌固定氮、制造——作为自由生活的蓝细菌，也作为藻与植物的质体（后者是被俘获的蓝细菌）——地球上几乎所有的氧，驱动碳、氮、硫循环，并栖息在一切有液态水的环境，从沸腾的泉眼到地表以下几公里深处的岩石孔隙。

本章考察 [[diversity-of-life/classifying-life#def-domains]] 定义的两个原核域：它们的细胞结构、惊人的代谢谱和主要谱系（附其门级的现用名称）。随后介绍描述主要只知 DNA 序列的微生物群落的定量工具：多样性指数与稀疏化。细胞结构详见 [[cell-biology/cells-and-microscopy]]，基因转移见 [[genetics/microbial-genetics]]，生长、生理与病原体见 [[microbiology]]。

## 原核细胞

::: definition 原核生物 {#def-prokaryote}
**原核生物**是没有细胞核的细胞：其染色体通常是一个环状 DNA 分子，位于细胞质中的**类核**（nucleoid）区域，没有线粒体、内膜系统等膜包被细胞器。转录与翻译在细胞质中偶联。细菌与古菌都是原核生物，但"原核生物"命名的是一种细胞组织水平，而不是一个进化枝：在任何定根方式下，该类的排除对象——真核生物——都与它共享共同祖先。
:::

多数原核细胞直径 0.5–5 µm，但范围很宽。候选门辐射类群（Patescibacteria）的成员和一些海洋细菌只有零点几微米，接近能装下基因组与核糖体的最小体积。另一极端，硫细菌 *Thiomargarita namibiensis* 的细胞直径可达 0.75 mm，体积大部分是储存硝酸盐的液泡（Heide Schulz 及同事，1999）；来自加勒比红树林的 '*Candidatus* Thiomargarita magnifica' 单个细胞长达约一厘米，其多份基因组拷贝被包在膜包被的小室中（Jean-Marie Volland 及同事，2022）。大小之受限，是因为细胞依赖扩散和经表面的运输，而半径 $r$ 的球体其表面积与体积之比按 $3/r$ 下降（[[cell-biology/cells-and-microscopy#prop-sv]]）；巨型细菌或靠液泡把细胞质挤成薄层，或靠遍布细胞的众多基因组拷贝来逃脱这一极限。

::: example 为什么多数细菌很小 {#ex-size}
把细胞当作球体。(a) 比较半径 0.5 µm 的球菌与半径 375 µm 的 *Thiomargarita namibiensis* 细胞的表面积与体积之比。(b) 一个小分子在水中的扩散系数 $D \approx 10^{-9}$ m² s⁻¹；用一维扩散时间 $t \approx x^2/2D$，估算从细胞表面到中心所需的时间。(c) *Thiomargarita* 的细胞质是围绕中央液泡、约 2 µm 厚的壳层。穿过它需要多久？
::: solution
(a) $S/V = 3/r$：球菌 $3/0.5 = 6$ µm⁻¹，*Thiomargarita* $3/375 = 0.008$ µm⁻¹——单位体积的膜少了 750 倍。

(b) 球菌：$(0.5\times10^{-6})^2/(2\times10^{-9}) = 1.25\times10^{-4}$ s，约十分之一毫秒。*Thiomargarita*：$(3.75\times10^{-4})^2/(2\times10^{-9}) = 70$ s。这样大小的实心细胞，扩散无法快至足以维持细菌的代谢速率。

(c) $(2\times10^{-6})^2/(2\times10^{-9}) = 2\times10^{-3}$ s。液泡（以硝酸盐作电子受体）使这个巨细胞在代谢上不过是一层普通细菌尺度的薄细胞质，包裹着一只气球。
:::
:::

基因组大小从昆虫内共生体的约 0.11–0.16 百万碱基对（已丢失大多数基因，如 '*Candidatus* Carsonella ruddii'，Atsushi Nakabachi 及同事，2006），到某些土壤黏细菌的超过 1400 万；自由生活的物种通常有 2–6 Mb，每千碱基约一个基因。

### 细胞被膜

丹麦医生 Hans Christian Gram 1884 年发明的染色法，至今把细菌分成两大类。结晶紫染色经碘固定；酒精洗涤会把 **革兰氏阴性**细胞的染料洗掉，**革兰氏阳性**细胞则留着不动，保持紫色。

::: definition 细菌与古菌的细胞被膜 {#def-envelope}
**革兰氏阳性**被膜由质膜及其外一层 20–80 nm 厚的**肽聚糖**（peptidoglycan，又称 murein）壁构成——*N*-乙酰氨基葡萄糖与 *N*-乙酰胞壁酸交替的聚糖链由短肽交联——其间穿插磷壁酸。**革兰氏阴性**被膜的肽聚糖层很薄，位于周质空间，其外是一层**外膜**，外膜的外小叶是**脂多糖**（LPS）。古菌从无肽聚糖；多数有一种由蛋白质或糖蛋白亚基排成晶格的**表层**（S-layer），一些产甲烷菌有由不同糖与氨基酸构成的**假肽聚糖**。古菌膜由**醚键连到甘油-1-磷酸上的异戊二烯链**构成，许多物种还有单次跨膜的**四醚脂质**；而细菌（和真核生物）的膜使用**酯键连到甘油-3-磷酸上的脂肪酸**——即"脂质分野"。
:::

被膜关乎生态与医学。外膜使革兰氏阴性菌对许多抗生素和去污剂有抗性；肽聚糖是青霉素与溶菌酶的靶标；分枝杆菌有一层蜡质的分枝菌酸外层，不着色或着色不良。醚键连接、常常横跨全膜的古菌脂质更耐热、对质子的通透性更低，这是古菌繁盛于高温酸性生境的原因之一。两个域呈镜像的甘油骨架是细胞起源的谜题：或者 LUCA 的膜由混合或简单脂质构成，或者其中一个域后来整体更换了脂质。

许多原核生物靠**鞭毛**游动，但两个域的鞭毛并不同源。细菌鞭毛是由流入细胞的质子（或钠离子）驱动的旋转马达，带动螺旋状鞭毛丝以每秒 100 转以上的速度转动；古菌的**古菌鞭毛**（archaellum）由 ATP 水解驱动，与 IV 型菌毛同源。一些 Bacillota 形成**内生孢子**（芽孢）——具有厚蛋白质外壳、核心脱水的休眠细胞，能在沸腾、干燥与辐射下存活数十年甚至更久——这就是灭菌采用 121 °C 加压蒸汽而不是煮沸的原因。

::: warning "细菌都是病菌，古菌都是极端微生物"
只有一丁点比例的细菌种致病；绝大多数是自由生活的、无害的或有益的共生体，我们所知的生命全靠它们维系。古菌最初在极端生境中发现——热泉、盐湖、缺氧沉积物——"极端微生物"的标签就此粘住；但氨氧化古菌（Nitrososphaerota）是海洋与土壤中数量最多的细胞之一（Edward DeLong，1992，以及 Jed Fuhrman 及同事，1992，在海水中发现了它们），产甲烷菌生活在牛和人的肠道里。没有任何古菌被知道是动物或植物的病原体。古菌也不是"原始的"或细菌的祖先：其名称取义"古老"，反映的是 1970 年代的一个猜测；两个域都有同样长的进化时间。
:::

## 代谢多样性

真核生物的生活方式基本上只有两种——有机分子的有氧呼吸，以及产氧光合作用（从蓝细菌借来的）。原核生物有几十种。分类依据三个问题：能量从哪里来？电子从哪里来？碳从哪里来？

::: definition 营养类型 {#def-trophic}
按能量来源，生物分为**光能营养型**（phototroph，光）与**化能营养型**（chemotroph，化学反应）。按电子供体，分为**有机营养型**（organotroph，有机化合物）与**无机营养型**（lithotroph，H₂、H₂S、Fe²⁺、NH₃ 或 H₂O 等无机化合物）。按碳源，分为**异养型**（heterotroph，有机碳）与**自养型**（autotroph，CO₂）。术语可以组合：人与 *E. coli*（大肠杆菌）是化能有机异养型，植物与蓝细菌是光能无机自养型（以水为电子供体），氧化铁的 *Acidithiobacillus ferrooxidans* 是化能无机自养型（chemolithoautotroph），而红细菌 *Rhodobacter* 之类紫色非硫细菌在光下以有机酸生长时是光能有机异养型。
:::

若干具有全球重要性的过程只有原核生物会做：

| 过程 | 反应（简化） | 生物 |
|---|---|---|
| 固氮 | N₂ + 8 H⁺ + 8 e⁻ + 16 ATP → 2 NH₃ + H₂ + 16 ADP + 16 Pᵢ | 多样的细菌与某些产甲烷菌，自由生活或共生（豆科根瘤中的根瘤菌、*Frankia*、蓝细菌） |
| 硝化作用 | NH₃ → NO₂⁻ → NO₃⁻ | 氨氧化细菌与古菌、亚硝酸盐氧化菌；完全氨氧化菌（"comammox"，*Nitrospira*；Holger Daims 及同事与 Maartje van Kessel 及同事，2015） |
| 厌氧氨氧化（anammox） | NH₄⁺ + NO₂⁻ → N₂ + 2 H₂O | Planctomycetota，如 '*Candidatus* Brocadia'（Marc Strous 及同事，1999） |
| 产甲烷作用 | CO₂ + 4 H₂ → CH₄ + 2 H₂O，或乙酸 → CH₄ + CO₂ | 仅古菌（多个谱系） |
| 厌氧甲烷氧化 | CH₄ + SO₄²⁻ → HCO₃⁻ + HS⁻ + H₂O | ANME 古菌与硫酸盐还原菌的共生联合体（Antje Boetius 及同事，2000） |
| 不产氧光合作用 | CO₂ + 2 H₂S → (CH₂O) + 2 S + H₂O | 紫色与绿色硫细菌、Chloroflexota、放碳菌等 |
| 产氧光合作用 | CO₂ + H₂O → (CH₂O) + O₂ | Cyanobacteriota（及由其衍生的质体） |

不靠叶绿素也能收获光。*Halobacterium salinarum*（盐沼盐杆菌）之类嗜盐古菌使用**菌视紫红质**（bacteriorhodopsin）——带视黄醛发色团的光驱动质子泵（Dieter Oesterhelt 与 Walther Stoeckenius，1971）；同源的**蛋白视紫红质**（proteorhodopsin）由很大一部分海洋细菌编码（Oded Béjà 及同事，2000）。

化能营养型只能从在其所栖条件下**放能**（exergonic）的反应获得能量，而可用能量可能极小。Sergei Winogradsky 1887 年发现硫细菌 *Beggiatoa* 氧化 H₂S 获取能量，开创了化能无机营养（chemolithotrophy）之端；今天我们知道有生物靠每摩尔只放出几十千焦的反应生活。

::: proposition 反应可提供的能量 {#prop-gibbs}
对反应 $aA + bB \to cC + dD$，实际条件下的吉布斯自由能变为

$$
\Delta G = \Delta G^{\circ\prime} + RT\ln\frac{[C]^c[D]^d}{[A]^a[B]^b},
$$ {#eq-gibbs}

其中 $\Delta G^{\circ\prime}$ 是标准变（溶质 1 mol L⁻¹、气体 1 bar、pH 7），$R = 8.314$ J mol⁻¹ K⁻¹，$T$ 为绝对温度，活度以浓度（或分压，以 bar 计）近似。只有 $\Delta G < 0$ 时反应才能提供能量。生长中的细胞合成 ATP 大约需要 +60 至 +70 kJ mol⁻¹；但由于能量以离子梯度贮存、每转移一个离子约 −15 至 −20 kJ mol⁻¹ 分级保存，细胞可以使用只够 ATP 分数的反应。Bernhard Schink（1997）提出约 −20 kJ mol⁻¹ 是多数生物可用的最小能量子；有些生物被认为生活在更靠近平衡之处。
:::

这与[化学图谱](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics)中处理代谢途径所用的是同一个关系。

::: example 产甲烷菌能拿到多少能量？ {#ex-methanogen}
氢营养型产甲烷，CO₂ + 4 H₂ → CH₄ + 2 H₂O，$\Delta G^{\circ\prime} = -131$ kJ mol⁻¹（Rudolf Thauer 及同事，1977）。在 25 °C 的淡水沉积物中，CO₂ 与 CH₄ 分压大致相等，发酵细菌把 H₂ 压在约 $10^{-4}$ bar。$\Delta G$ 是多少？每分子 CH₄ 能造几个 ATP？
::: solution
水是溶剂（活度 1），$p_{\mathrm{CH_4}} = p_{\mathrm{CO_2}}$ 时反应商为 $1/p_{\mathrm{H_2}}^4 = 10^{16}$。$RT = 8.314\times10^{-3}\times298.15 = 2.479$ kJ mol⁻¹：

$$
\Delta G = -131 + 2.479\ln 10^{16} = -131 + 2.479\times36.84 = -131 + 91.3 = -39.7\ \text{kJ mol}^{-1}.
$$

每分子甲烷连一个 ATP（约 +60 kJ mol⁻¹）都不到——实际约 0.5 个。把 $p_{\mathrm{H_2}}$ 降十倍到 $10^{-5}$ bar，则 $+4\times2.479\times\ln 10 = 22.8$ kJ mol⁻¹，只剩 −16.8 kJ mol⁻¹，接近生命的极限。氢分压是关键变量：反应商中的四次方使反应对它灵敏得出奇。
:::
:::

同样的灵敏度解释了**互营**（syntrophy）。把丁酸或丙酸之类化合物氧化成乙酸与 H₂ 的发酵细菌，面临的反应在标准条件下是吸能的；只有把 H₂ 一产生就移除，它才变为放能。产甲烷菌干的正是这件事。两个伙伴谁也不能单靠底物生长；在一起则可以——一场热力学刀锋上的"专性互利共生"。第一株被培养的阿斯加德古菌正是这样的互营生物（[[diversity-of-life/classifying-life]]）。

::: quiz
一种细菌把 H₂S 氧化成硫酸盐、固定 CO₂、并靠这个氧化反应获取能量。它应归入哪一类？
- [ ] 光能无机自养型
- [x] 化能无机自养型
- [ ] 化能有机异养型
- [ ] 光能有机异养型
::: solution
能量来自化学反应（化能-），电子供体是无机的 H₂S（无机营养-），碳源是 CO₂（自养-）。热液口的许多硫氧化细菌，包括管栖蠕虫的共生菌，都这样生活。
:::
:::

## 细菌的主要谱系

细菌的门长期只有非正式名称。2021 年起《国际原核生物命名法规》对门一级的名称作出规定，词尾为 *-ota*，接在模式属词干之后；许多熟悉的名称已经改变（Aharon Oren 与 George Garrity，2021）。两套名称在文献中都会遇到。

| 门（旧名） | 特征与实例 |
|---|---|
| **Pseudomonadota**（Proteobacteria，变形菌） | 已描述物种最多的门；革兰氏阴性；代谢范围极广。*Escherichia coli*（大肠杆菌）、*Pseudomonas*、*Vibrio*、固氮的 *Rhizobium*、植物病原 *Agrobacterium*、胞内的 *Rickettsia*；α-变形菌包括线粒体的祖先。纲为 Alpha-、Beta-（GTDB 中并入 Gamma-）与 Gammaproteobacteria；原先的 delta 类群已拆分成若干独立的门，如 Myxococcota。 |
| **Bacillota**（Firmicutes，厚壁菌） | 多数革兰氏阳性，低 G+C 含量；产内生孢子者（*Bacillus*、*Clostridium*），乳酸菌（广义的 *Lactobacillus*、*Streptococcus*），*Staphylococcus*；没有细胞壁的支原体也在此列。 |
| **Actinomycetota**（Actinobacteria，放线菌） | 革兰氏阳性，高 G+C；丝状土壤链霉菌 *Streptomyces* 是临床所用多数抗生素的来源；分枝杆菌属 *Mycobacterium*；双歧杆菌属 *Bifidobacterium*。 |
| **Cyanobacteriota**（Cyanobacteria，蓝细菌） | 以叶绿素 *a* 与两个光系统进行产氧光合作用；单细胞（原绿球藻 *Prochlorococcus*、集胞藻 *Synechococcus*）与丝状类型，部分具固氮**异形胞**（heterocysts）（*Anabaena*、*Nostoc*）。 |
| **Bacteroidota**（Bacteroidetes，拟杆菌） | 革兰氏阴性；肠道与海洋中复杂多糖的降解者（*Bacteroides*、*Flavobacterium*）。 |
| **Spirochaetota**、**Chlamydiota**、**Planctomycetota**、**Verrucomicrobiota** | 螺旋形细胞、具细胞内鞭毛；专性胞内寄生；厌氧氨氧化与不寻常的膜系统；土壤与肠道中丰富——后三个归为 PVC 超门。 |
| **Chloroflexota**、**Deinococcota**、**Thermotogota**、**Aquificota** | 绿色非硫光合菌及许多未培养的亲属；抗辐射的 *Deinococcus radiodurans*（耐辐射奇球菌）与 *Thermus aquaticus*（水生栖热菌，*Taq* 聚合酶的来源）；超嗜热的 *Thermotoga* 与 *Aquifex*。 |
| **Patescibacteria**（候选门辐射，CPR） | 几乎全部只知道宏基因组；细胞与基因组极小（常在 1 Mb 以下），缺失许多生物合成途径，推测附着于其他微生物生活（Christopher Brown 及同事，2015）。 |

绝大多数细菌多样性从未在实验室培养出来。天然样品的直接镜检计数超过平板计数 100 倍以上（"巨大的平板计数异常"，James Staley 与 Allan Konopka，1985）；属于没有培养代表的谱系的细胞比例很大，但在不同环境之间差异悬殊，且取决于如何测量。Norman Pace 的团队在 1980 年代开创了替代途径：从环境中提取 DNA，测序 16S rRNA 基因——结果揭示出整整一些只以序列形式存在的门。直接从环境 DNA 组装基因组（**宏基因组学**；如 Gene Tyson 及同事，2004，来自酸性矿山排水）使推断其代谢也成为可能。在 Laura Hug 及同事基于宏基因组与基因组数据的 2016 年之树上，CPR 占据细菌分支的很大份额，尽管它代表多少门取决于等级如何校准。

## 古菌的主要谱系

在现行分类（GTDB 与 ICNP）中，古菌被分成少数几个大类，名称同样是新的：

- **Methanobacteriota** 及近亲（原先 Euryarchaeota 的大部分）：多数产甲烷菌（人肠道的 *Methanobrevibacter smithii*、*Methanococcus*、*Methanosarcina*）；极端嗜盐菌（Halobacteria），在饱和盐水中生长，用类胡萝卜素与菌视紫红质把盐田染成红色；超嗜热的 *Pyrococcus furiosus*，最适生长温度 100 °C（Gerhard Fiala 与 Karl Stetter，1986）；以及没有细胞壁的嗜酸菌 *Picrophilus*，能在 pH 0.7 生长（Christa Schleper 及同事，1995）。
- **Thermoproteota**（原 Crenarchaeota 与 Thaumarchaeota）：嗜热嗜酸菌如 *Sulfolobus*（Thomas Brock 及同事 1972 年分离自黄石），以及氨氧化 **Nitrososphaeria**，如第一株被培养的海洋古菌 *Nitrosopumilus maritimus*（Martin Könneke 及同事，2005）。氨氧化菌占海洋原核浮游生物的相当比例（深水中高达约 20–40 %）。
- **DPANN** 古菌：微小细胞、极小基因组，许多是其他古菌的共生体。附着于 *Ignicoccus hospitalis* 生活的 *Nanoarchaeum equitans* 基因组仅 0.49 Mb（Harald Huber 及同事，2002；Elizabeth Waters 及同事，2003）。
- **阿斯加德古菌**（Asgard archaea；Asgardarchaeota 或 Promethearchaeota）：真核生物最近的原核亲戚（[[diversity-of-life/classifying-life#prop-two-domains]]）。

生命的温度上限由古菌保持：*Methanopyrus kandleri* 菌株 116 在高压下于 122 °C 生长（Ken Takai 及同事，2008）。古菌还在信息处理机器上与真核生物共享若干特征：多亚基 RNA 聚合酶、TATA 结合蛋白与转录因子 B（与真核生物 TFIIB 同源）、许多类群中使 DNA 缠绕的组蛋白，以及与真核生物同源而相关的 DNA 复制蛋白。

## 测量微生物多样性

多数微生物群落靠对样品中某个标志基因——通常是 16S rRNA 基因的一段——测序来研究，再把读段归入**操作分类单元**（OTU）或精确的**扩增子序列变体**（ASV）（[[diversity-of-life/classifying-life]]）。结果是一张计数表：类型 1 多少条读段，类型 2 多少条，等等。这样一个群落的多样性该如何概括？类型的数目，**丰富度** $S$，是最简单的度量，但它不理会个体在各类型间分布得是否均匀。一个 99 % 属于一种、其余 1 % 散在另外 99 种中的群落，其丰富度与 100 个丰度相同的种的群落一样是 100，可你绝大多数时候只会遇到一种。两个经典指数把多度考虑在内。

::: definition Shannon 指数与 Simpson 指数 {#def-indices}
设 $p_i$ 为类型 $i$ 的个体（或读段）比例，$i = 1, \dots, S$。**Shannon 指数**为

$$
H' = -\sum_{i=1}^S p_i\ln p_i,
$$ {#eq-shannon}

即多度分布的熵（Claude Shannon 的信息度量，1948）。**Simpson 指数**为

$$
D = \sum_{i=1}^S p_i^2,
$$ {#eq-simpson}

即随机（有放回）抽取的个体属于同一类型的概率（Edward Simpson，1949）；多样性可表为 $1 - D$（属于不同类型的概率）或 $1/D$。**Pielou 均匀度**为 $J = H'/\ln S$。一阶的**有效类型数**（Hill 数）是 $e^{H'}$，二阶是 $1/D$：即产生同样指数值时丰度相等的类型的数目。
:::

::: proposition Shannon 指数的界 {#prop-shannon-max}
对含 $S$ 个类型的群落，$0 \le H' \le \ln S$；$H' = \ln S$ 当且仅当所有类型丰度相等（$p_i = 1/S$），$H' = 0$ 当且仅当某一类型独占整个群落。类似地 $1/S \le D \le 1$，$D = 1/S$ 恰当所有类型丰度相等时成立。
:::

::: proof
$0 < p_i \le 1$ 时每一项 $-p_i\ln p_i \ge 0$，仅在 $p_i = 1$ 时取等，故 $H' \ge 0$，仅当某个 $p_i = 1$ 时取等。上界方面，$\ln$ 是凹函数，由 Jensen 不等式（以 $p_i$ 为权重），

$$
H' = \sum_i p_i\ln\frac{1}{p_i} \le \ln\Big(\sum_i p_i\cdot\frac{1}{p_i}\Big) = \ln S,
$$

仅在一切 $1/p_i$ 相等时取等。对 Simpson 指数，由 Cauchy–Schwarz 不等式 $1 = (\sum_i p_i)^2 \le S\sum_i p_i^2 = SD$，故 $D \ge 1/S$，一切 $p_i$ 相等时取等；又 $p_i^2 \le p_i$，故 $D \le \sum_i p_i = 1$。
:::

::: example 一份 16S 样品的多样性 {#ex-indices}
一份样品得到 100 条读段，分属 5 个 ASV，计数为 50、25、12、8、5。计算 $H'$、$J$、$e^{H'}$、$D$ 与 $1/D$，并与 5 个丰度相等的 ASV 的群落比较。
::: solution
比例为 0.50、0.25、0.12、0.08、0.05。于是

$$
H' = -(0.5\ln0.5 + 0.25\ln0.25 + 0.12\ln0.12 + 0.08\ln0.08 + 0.05\ln0.05) = 0.3466 + 0.3466 + 0.2544 + 0.2021 + 0.1498 = 1.299.
$$

$J = 1.299/\ln 5 = 1.299/1.609 = 0.807$；$e^{H'} = 3.67$。$D = 0.25 + 0.0625 + 0.0144 + 0.0064 + 0.0025 = 0.336$，故 $1 - D = 0.664$，$1/D = 2.98$。

5 个丰度相等的 ASV 的群落：$H' = \ln 5 = 1.609$，$J = 1$，$e^{H'} = 1/D = 5$。这个不均匀的群落有 5 个的丰富度，但只有约 3 个（$e^{H'}$）或二三个（更重视频富类型的 $1/D$）的有效多样性。不同的指数回答不同的问题；多报几个，或把 Hill 数报成一列剖面。
:::
:::

::: widget plot
f: -(x*ln(x) + (1 - x)*ln(1 - x)); 1 - x^2 - (1 - x)^2; exp(-(x*ln(x) + (1 - x)*ln(1 - x)))
x: 0.001, 0.999
y: 0, 2.1
labels: H'; 1 - D; e^{H'}
hlines: 0.6931
caption: 两类型群落的多样性随第一类型比例 $p$ 的变化：Shannon 的 $H'$、Simpson 的 $1 - D$ 与有效类型数 $e^{H'}$。三者都在 $p = 0.5$ 处最大，此时 $H' = \ln 2 = 0.693$（虚线）、$1 - D = 0.5$、$e^{H'} = 2$。把鼠标移到 $p = 0.9$ 附近：$H'$ 降到 0.33，$e^{H'}$ 降到 1.38——一个 90:10 的群落表现得像 1.4 个丰度相同的种。在两端附近 Simpson 指数比 Shannon 指数变化更小，因为它由最富的类型主导。
:::

### 稀疏化

多样性指数与丰富度都依赖样本量：测序越多，稀有类型越多。为了公平比较大小不等的样品，生态学家把它们**稀疏化**（rarefy）到共同大小——即问：$n$ 个个体的随机子样本中预期会出现多少类型。

::: proposition 稀疏化下的期望丰富度 {#prop-rarefaction}
样本有 $N$ 个个体、$S$ 个类型，类型 $i$ 有 $N_i$ 个个体。若不放回地随机抽取 $n \le N$ 个个体的子样本，则其中包含的类型数的期望为

$$
\E[S_n] = \sum_{i=1}^{S}\left[1 - \frac{\binom{N - N_i}{n}}{\binom{N}{n}}\right].
$$ {#eq-rarefaction}

（Howard Sanders，1968；Stuart Hurlbert，1971 校正为此形式。）
:::

::: proof
设子样本中出现类型 $i$ 时 $X_i = 1$，否则为 0，则 $S_n = \sum_i X_i$，由期望的线性性 $\E[S_n] = \sum_i \Prob(X_i = 1)$。类型 $i$ 缺席，当且仅当 $n$ 个个体全部抽自其余 $N - N_i$ 个个体。$\binom{N}{n}$ 个子样本等可能，其中 $\binom{N - N_i}{n}$ 个避开了类型 $i$，故 $\Prob(X_i = 0) = \binom{N - N_i}{n}/\binom{N}{n}$（零成功的超几何概率）。代入即得 [[#eq-rarefaction]]。
:::

::: example 手工稀疏化一个小样本 {#ex-rarefaction}
一个 10 个个体的样本含 3 个种，个体数为 6、3、1。随机子样本取 3 个个体时，期望出现多少个种？
::: solution
$\binom{10}{3} = 120$。种 1：$\binom{4}{3} = 4$，出现概率 $1 - 4/120 = 0.967$。种 2：$\binom{7}{3} = 35$，故 $1 - 35/120 = 0.708$。种 3：$\binom{9}{3} = 84$，故 $1 - 84/120 = 0.300$。相加，$\E[S_3] = 0.967 + 0.708 + 0.300 = 1.975$ 种。那个稀有种只在 30 % 的抽样子样本中被发现。
:::
:::

::: widget plot
f: 5 - binom(50, x)/binom(100, x) - binom(75, x)/binom(100, x) - binom(88, x)/binom(100, x) - binom(92, x)/binom(100, x) - binom(95, x)/binom(100, x); 5 - 5*binom(80, x)/binom(100, x)
x: 0, 50
y: 0, 5.5
labels: \text{不均匀 (50, 25, 12, 8, 5)}; \text{均匀 (各 20)}
hlines: 5
caption: 由 [[#eq-rarefaction]] 对两个 100 条读段、各含 5 个 ASV 的样品画出的稀疏化曲线：[[#ex-indices]] 的不均匀群落与一个完全均匀的群落。两者最终都达到 5 个类型（虚线），但均匀群落快得多；在 10 条读段的子样本上，均匀群落显示约 4.5 个类型，不均匀群落约 3.7。稀疏化曲线在样本量等于全样本量处的斜度，衡量再测一点序还能增加多少——曲线陡说明丰富度仍被严重低估。
:::

稀疏化要扔掉数据，统计学家在某些用途上反对它（Paul McMurdie 与 Susan Holmes，2014），转而推荐直接对抽样过程建模的方法，或按相等的**覆盖率**（已观察类型占群落个体的估计比例）而不是相等的大小来比较样品（Anne Chao 与 Lou Jost，2012）。其中的教训是普遍的：离开了背后的抽样努力，物种计数一文不值。

::: application 养活世界、治愈世界的微生物
生物固氮每年向陆地与海洋生态系统添加约 1–2 亿吨氮，与 Haber–Bosch 工艺的工业固氮相当；豆科作物依靠根瘤中的根瘤菌。Actinomycetota，尤其 *Streptomyces*，是临床所用多数抗生素的来源——从链霉素（Albert Schatz、Elizabeth Bugie 与 Selman Waksman，1944）开始；基因组测序表明每个 *Streptomyces* 基因组编码几十个生物合成基因簇，其中大多数在实验室里沉默。嗜热菌的耐热酶，如来自 *Thermus aquaticus*（Thomas Brock 与 Hudson Freeze 于 1969 年分离）的 *Taq* DNA 聚合酶，使 PCR 成为实用技术；CRISPR–Cas 系统——细菌与古菌的适应性免疫系统——如今是基因组编辑的基础（[[biotechnology]]）。细菌作为疾病病原，见[医学图谱](/learn/medicine/course.php?c=microbiology)。
:::

::: history
Antonie van Leeuwenhoek（列文虎克）在 1676 与 1683 年致英国皇家学会的信中描述了从自己牙齿上刮下的"微小动物"（animalcules），其中包括细菌。Ferdinand Cohn 按形状对细菌分类（1872）并发现了内生孢子（1876）；Hans Christian Gram 于 1884 年发明了以其命名的染色法。Sergei Winogradsky 发现化能无机营养（1887），Martinus Beijerinck 分离出固氮的根瘤菌（1888），开创了微生物生态学。Édouard Chatton（1925，1938）以及 Roger Stanier 与 Cornelis van Niel（1962）界定了原核生物。乌斯（Carl Woese）与 George Fox 对古菌的发现（1977），以及 Norman Pace 直接从环境中给 16S rRNA 基因测序（自 1980 年代中期起），揭示了因依赖培养而漏掉了多少多样性；此后宏基因组学——从酸性矿山排水（2004）到候选门辐射（2015）再到阿斯加德古菌（2015–2017）——又绘出了其余大部分。
:::

::: summary
- 原核生物（细菌与古菌，一种组织水平，不是进化枝）约有 $10^{30}$ 个细胞，碳储量近 80 Gt，比全部动物与真菌之和还多好几倍。
- 细胞多为 0.5–5 µm，受表面积与体积之比限制；*Thiomargarita* 之类巨无霸靠液泡与众多基因组拷贝破局。基因组从约 0.1 Mb（内共生体）到超过 14 Mb。
- 革兰氏阳性被膜肽聚糖厚；革兰氏阴性者肽聚糖薄并加一层 LPS 外膜。古菌没有肽聚糖，具有醚键连接的异戊二烯脂质连于甘油-1-磷酸。
- 代谢按能量（光能/化能）、电子供体（无机/有机）与碳源（自养/异养）分类；固氮、硝化、厌氧氨氧化、产甲烷与不产氧光合作用都是原核生物独有。$\Delta G = \Delta G^{\circ\prime} + RT\ln Q$ 决定可用能量——H₂ 分压 $10^{-4}$ bar 时产甲烷菌约 −40 kJ mol⁻¹。
- 细菌主要诸门：Pseudomonadota、Bacillota、Actinomycetota、Cyanobacteriota、Bacteroidota 与 CPR；古菌主要类群：Methanobacteriota、Thermoproteota（含氨氧化菌）、DPANN 与阿斯加德。
- 多样性指数：Shannon $H' = -\sum p_i\ln p_i \le \ln S$；Simpson $D = \sum p_i^2$；有效数 $e^{H'}$ 与 $1/D$。稀疏化，$\E[S_n] = \sum_i[1 - \binom{N - N_i}{n}/\binom{N}{n}]$，在相等样本量下比较丰富度。
:::

## 习题

::: exercise Shannon 指数 {level=1 check="0.898"}
一个群落有 3 个种，比例 0.6、0.3、0.1。计算 $H'$（保留三位小数）。
::: solution
$H' = -(0.6\ln0.6 + 0.3\ln0.3 + 0.1\ln0.1) = 0.3065 + 0.3612 + 0.2303 = 0.898$。
:::
:::

::: exercise 逆 Simpson {level=1 check="2.17"}
对上一题的群落，计算 $1/D$（保留两位小数）。
::: solution
$D = 0.36 + 0.09 + 0.01 = 0.46$；$1/D = 2.17$，即有效 2.17 个丰度相同的种。
:::
:::

::: exercise 给生活方式定名 {level=1}
按营养类型对下列生物分类：(a) *Nitrosomonas*（亚硝化单胞菌），氧化氨并固定 CO₂；(b) *Chlorobium*，一种绿色硫细菌，利用光、H₂S 与 CO₂；(c) *Bacillus subtilis*（枯草芽孢杆菌），好气地在葡萄糖上生长；(d) 一种嗜盐古菌，用菌视紫红质造 ATP，同时吸收氨基酸作碳源。
::: solution
(a) 化能无机自养型。(b) 光能无机自养型（不产氧）。(c) 化能有机异养型。(d) 光能有机异养型——能量来自光，碳（和电子）来自有机分子。
:::
:::

::: exercise 手工稀疏化 {level=2 check="1.975"}
通过计算每个种被漏掉的概率，验证 [[#ex-rarefaction]] 的结果，并给出 $\E[S_3]$（保留三位小数）。
::: solution
被漏概率为 $4/120 = 0.0333$、$35/120 = 0.2917$ 与 $84/120 = 0.7$。$\E[S_3] = 3 - (0.0333 + 0.2917 + 0.7) = 3 - 1.025 = 1.975$。
:::
:::

::: exercise 氢饥饿 {level=2 check="-16.8"}
把 [[#ex-methanogen]] 改用 $p_{\mathrm{H_2}} = 10^{-5}$ bar 重算，其余条件不变。$\Delta G$ 以 kJ mol⁻¹ 计是多少（保留一位小数）？
::: solution
$Q = 10^{20}$；$RT\ln Q = 2.479\times46.05 = 114.2$ kJ mol⁻¹；$\Delta G = -131 + 114.2 = -16.8$ kJ mol⁻¹。
:::
:::

::: exercise 生物量份额 {level=2 check="12.7"}
按 Bar-On 及同事的估计——全部生命 550 Gt C 中细菌约 70 Gt C——细菌占世界生物量碳的百分之多少（保留一位小数）？为什么这个估计的确定性远不如植物的估计？
::: solution
$70/550 = 12.7\,\%$。多数细菌生物量在深部地下与土壤中，其细胞数目由少量岩芯估计并外推；生长缓慢、个体微小的地下细胞单细胞碳含量不确定。植物生物量则由资源清查与遥感测得。事实上，对地下生物量的估计自 1998 年以来已下调了好几倍。
:::
:::

::: exercise 革兰氏染色与古菌 {level=2}
(a) 解释为什么醇洗时革兰氏阴性细胞失去结晶紫而革兰氏阳性细胞不失去。(b) 古菌可呈革兰氏阳性或阴性反应。为什么古菌的革兰氏反应不能说明其亲缘关系？(c) 检验古菌膜的哪两个特征可以确认它不是细菌？
::: solution
(a) 酒精使革兰氏阳性细胞厚而高度交联的肽聚糖脱水、孔径收缩，从而把染料-碘复合物关在里面；革兰氏阴性细胞中，酒精溶解外膜，薄肽聚糖留不住复合物。(b) 反应取决于壁厚与结构而非祖裔；具厚假肽聚糖的古菌呈阳性，只有 S-layer 的呈阴性，而这些状态与细菌者是同塑的。(c) 醚键连接的异戊二烯脂质及其甘油-1-磷酸骨架（以及如果存在的话，跨膜四醚）；肽聚糖的缺失；以及 16S rRNA 或基因组序列。
:::
:::

::: exercise 多样性的最大值 {level=3}
(a) 用求导证明 $S = 2$ 时 $H'(p) = -p\ln p - (1 - p)\ln(1 - p)$ 在 $p = 1/2$ 处最大。(b) 证明一个由两个等半部组成的群落——一半是 $S_1$ 个丰度相等的种，另一半是 $S_2$ 个（两半各占一半个体）——的有效数 $e^{H'}$ 等于 $2\sqrt{S_1S_2}$。(c) 解读：$S_1 = 1$、$S_2 = 100$ 时有效种数是多少？
::: solution
(a) $dH'/dp = -\ln p - 1 + \ln(1 - p) + 1 = \ln\big((1 - p)/p\big)$，在 $p = 1/2$ 处为零，其下为正、其上为负；故 $p = 1/2$ 是最大值，$H' = \ln 2$。

(b) 第一半中每个种的比例为 $1/(2S_1)$，第二半为 $1/(2S_2)$。于是 $H' = S_1\cdot\frac{1}{2S_1}\ln(2S_1) + S_2\cdot\frac{1}{2S_2}\ln(2S_2) = \tfrac12\ln(2S_1) + \tfrac12\ln(2S_2) = \ln\sqrt{4S_1S_2}$，故 $e^{H'} = 2\sqrt{S_1S_2}$。

(c) $2\sqrt{100} = 20$ 个有效种。群落的一半是单一优势种；那 100 个稀有种对有效多样性的贡献远不如其数目所显示——有效数是两半"空间"的几何平均的二倍，而不是它们的和（101）。
:::
:::

::: exercise 解读稀疏化曲线 {level=3}
两份土壤样品分别测到 10,000 与 50,000 条读段。第一份显示 900 个 ASV，第二份 2100 个。稀疏化到 10,000 条读段时，第二份有 1200 个 ASV。在 10,000 条读段处，第一份的稀疏化曲线仍在陡峭上升，第二份已趋平缓。(a) 就这些数据所示，哪份土壤更丰富？(b) 哪份样品的丰富度被低估得更严重？(c) 在下"两土有差异"的结论之前，建议再作两项分析。
::: solution
(a) 在相等样本量（10,000 条读段）下第二份土壤 ASV 更多（1200 对 900），因此显得更丰富；原始比较（900 对 2100）主要反映测序深度。(b) 第一份：其曲线在全样本量处仍陡，许多 ASV 尚未检出；第二份曲线趋平，说明覆盖率较好——尽管若稀疏化到 10,000 条它同样仍在上升。(c) 按相等覆盖率而不是相等大小比较样品；计算 Chao1（[[diversity-of-life/classifying-life#prop-chao1]]）之类丰富度估计量并给出置信区间；对每份土壤测生物学重复以估计位点内变异；核查 DNA 提取、PCR 与测序是否完全一致，因为方法差异会伪装成生物学差异。
:::
:::
