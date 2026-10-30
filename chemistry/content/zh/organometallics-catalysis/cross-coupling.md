看看过去二十年最畅销的小分子药物的结构，你会发现同一个片段一再出现：两个芳环或杂芳环由一根单键直接相连，或一个芳环连着一个氮。1970 年代以前，这类键很难制备。[[organic-2/aromatic-substitution]]中的经典芳香亲电取代是把亲电试剂接到环上，而不是把环接到环上；芳基卤化物的 Ullmann 铜偶联需要苛刻条件，而且最擅长生成的只是对称的联芳基。今天，药物化学家用一个下午就能把几乎任何芳基溴与几乎任何芳基硼酸偶联起来——在水与有机溶剂的混合介质中，钯催化剂用量只有零点几摩尔百分数。**钯催化的交叉偶联反应**——Suzuki–Miyaura、Negishi、Stille、Kumada、Heck、Sonogashira、Buchwald–Hartwig——大概是合成中使用最广的催化反应，Heck（Richard Heck）、根岸（Ei-ichi Negishi）与铃木（Akira Suzuki）也因此共同获得 2010 年诺贝尔化学奖。

它们全部运行在同一台引擎上：[[organometallics-catalysis/elementary-reactions]]中基元步骤搭建的 Pd(0)/Pd(II) 循环——**氧化加成、转金属化与还原消除**。本章把这台引擎拆开，解释每个具名反应为何有效、其边界何在，说明配体如何让本不活泼的芳基氯化物变得可用，最后给出决定一个偶联能否用于制药的实际数字——转化数、催化剂寿命与残留钯。

## 通用催化循环

::: definition 交叉偶联与转金属化 {#def-cross-coupling}
**交叉偶联**指在催化下，于有机亲电试剂 R–X（芳基、烯基，或较少见的烷基卤化物或磺酸酯）与有机金属亲核试剂 R′–[M]（$[M] = \mathrm{B(OR)_2}$、$\mathrm{ZnX}$、$\mathrm{SnR_3}$、$\mathrm{MgX}$、$\mathrm{SiR_3}$、Cu…）之间形成键 R–R′：
$$
\mathrm{R{-}X + R'{-}[M] \xrightarrow{\text{Pd 催化剂}} R{-}R' + X{-}[M]}.
$$
**转金属化**指有机基团从主族金属移到钯上、卤素（或其他阴离子）反向移动的步骤，$\mathrm{L_nPd(R)X + R'{-}[M] \rightarrow L_nPd(R)R' + X{-}[M]}$；它是钯上的一次配体取代，氧化态不变。转移方向遵循[[organometallics-catalysis/main-group-organometallics]]的电正性规则：卤素最终落在电正性更强的金属上。
:::

芳基溴与芳基硼酸的 Suzuki–Miyaura 偶联，循环逐步描述如下：

1. **产生 $\mathrm{L_nPd(0)}$。**预催化剂——$\mathrm{[Pd(PPh_3)_4]}$，或更常见的、加入膦的 Pd(II) 盐如乙酸钯(II)——生成配位不饱和的 Pd(0) 物种 $\mathrm{PdL_2}$（14 电子），或在配体非常庞大时生成 $\mathrm{PdL}$（12 电子）。Pd(II) 预催化剂被*原位*还原（被膦、硼酸或胺）。
2. **氧化加成。**芳基溴经芳环 π 体系与 C–Br 键侧向结合到 Pd(0) 上，C–Br 键以协同三中心过程加到金属上，给出 $\mathrm{L_2Pd(Ar)Br}$：Pd(II)、$d^8$、16 电子平面正方形配合物（最初为*顺*式，异构化为*反*式）。
3. **转金属化。**碱把硼酸转化为亲核性更强的硼酸根 $\mathrm{[Ar'B(OH)_3]^-}$，或把溴化钯转化为氢氧化钯 $\mathrm{L_2Pd(Ar)(OH)}$；两个伙伴随后经 Pd–O–B 桥相遇，芳基 Ar′ 从硼迁移到钯。产物是 $\mathrm{L_2Pd(Ar)(Ar')}$，仍为 Pd(II)。
4. ***反*–*顺*异构化。**还原消除要求两个有机基团处于顺式。
5. **还原消除。**Ar 与 Ar′ 偶联，生成联芳基并再生 $\mathrm{PdL_2}$，后者从第 2 步重新进入循环。

视底物与配体不同，任何一步都可能是决速步。对芳基氯化物与富电子芳基溴配以简单膦，氧化加成通常最慢；对位阻大的伙伴，转金属化或还原消除可能取而代之。

::: proposition 氧化加成为决速步时的速率方程 {#prop-oa-limiting}
设静息态为 $\mathrm{PdL_2}$，与只发生氧化加成的单配位物种 $\mathrm{PdL}$ 快速平衡（$\mathrm{PdL_2 \rightleftharpoons PdL + L}$，常数为 $K_\mathrm{d}$），并设氧化加成之后的所有步骤都很快。则
$$
v = \frac{k_\mathrm{OA}K_\mathrm{d}\,[\mathrm{Pd}]_0\,[\mathrm{ArX}]}{K_\mathrm{d} + [\mathrm{L}]},
$$ {#eq-oa-rate}
对钯与芳基卤化物为一级，对有机金属伙伴为零级，且在 $[\mathrm{L}] \gg K_\mathrm{d}$ 时对自由配体为负相关。
:::

::: proof
钯守恒：$[\mathrm{Pd}]_0 \approx [\mathrm{PdL_2}] + [\mathrm{PdL}]$，因为所有 Pd(II) 中间体都被迅速消耗、占比很小。前置平衡给出 $[\mathrm{PdL_2}] = [\mathrm{PdL}][\mathrm{L}]/K_\mathrm{d}$，于是 $[\mathrm{PdL}] = K_\mathrm{d}[\mathrm{Pd}]_0/(K_\mathrm{d} + [\mathrm{L}])$。决速步是 $\mathrm{PdL + ArX}$，速率 $k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}]$；每次氧化加成一个产物分子，故 $v = k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}]$，即[[#eq-oa-rate]]。有机金属伙伴只在慢步之后才进入，所以不出现在速率方程中。$\blacksquare$
:::

这一结论解释了现代交叉偶联的一个核心事实。速率取决于有多大比例的钯处于能进攻芳基卤化物的低配位形式，所以**庞大配体**有利于 $\mathrm{PdL}$ 而非 $\mathrm{PdL_2}$（$K_\mathrm{d}$ 大），从而加速氧化加成。**富电子配体**通过抬高向 C–X $\sigma^*$ 轨道反馈的电子所在的满 Pd $d$ 轨道能量，使其进一步加速。改变整个领域的配体——三*叔*丁基膦（Fu 课题组 1998 年起用于芳基氯化物）、Buchwald 课题组的双烷基联芳基膦（SPhos、XPhos 及其同类，2000 年代）以及庞大的 N-杂环卡宾——无一不是既极庞大又极强给予。它们还通过把两个有机基团挤在一起而加速还原消除。

## 亲电试剂：氧化加成及其规律

氧化加成的难易遵循 C–X 键的强度。苯基卤化物的近似键解离焓为 Ph–Cl $400\ \mathrm{kJ\,mol^{-1}}$、Ph–Br $340$、Ph–I $270$，反应性顺序为
$$
\mathrm{Ar{-}I > Ar{-}OTf \approx Ar{-}Br \gg Ar{-}Cl \gg Ar{-}F},
$$
其中 OTf 为三氟甲磺酸酯。芳基氯化物是最便宜、最容易得到的芳基卤化物，让它们反应起来是该领域 1990 年代的主要实用难题。哈米特（Hammett）方程定量表明，环上的吸电子取代基会加速氧化加成。

::: proposition 氧化加成的哈米特关系（经验式） {#prop-hammett}
对一系列*对位*与*间位*取代芳基卤化物 $\mathrm{X{-}C_6H_4{-}Hal}$ 向某一给定 Pd(0) 配合物的氧化加成，
$$
\log_{10}\frac{k_\mathrm{X}}{k_\mathrm{H}} = \rho\,\sigma_\mathrm{X},
$$ {#eq-hammett}
其中 $\sigma_\mathrm{X}$ 是哈米特取代基常数（取自取代苯甲酸的解离，例如 $\sigma_p$：$\mathrm{NO_2}$ $0.78$、$\mathrm{CN}$ $0.66$、$\mathrm{COCH_3}$ $0.50$、Cl $0.23$、H $0$、$\mathrm{CH_3}$ $-0.17$、$\mathrm{OCH_3}$ $-0.27$），$\rho$ 是反应常数。Fauvarque、Pflüger 与 Troupel（1981 年）测得芳基碘化物向 $\mathrm{[Pd(PPh_3)_4]}$ 在甲苯中的加成 $\rho \approx +2$。这一关系是**线性自由能关系**，来自经验。
:::

::: proof 解读
对 Eyring 方程取对数，$\log_{10}k = \text{const} - \Delta G^\ddagger/(2.303RT)$，于是[[#eq-hammett]]是说：取代基改变化合加成活化吉布斯自由能 $\Delta G^\ddagger$ 的幅度，与其对苯甲酸解离 $\Delta G^\circ$ 的改变成正比：$\Delta\Delta G^\ddagger = -2.303RT\rho\sigma$。$\rho$ 为**正**意味着吸电子基团（$\sigma > 0$）降低能垒：过渡态上芳环积累负电荷——若富电子 Pd(0) 把电子密度推入 C–X $\sigma^*$ 轨道、部分类似芳香亲核取代，这正是预期的图像。$\rho = +2$ 表明电荷发展显著但未完成（定义 $\rho = 1$ 的苯甲酸解离产生的是一个位于与环相隔一个原子处的完整负电荷）。只有整系列机理相同时该关系才成立；哈米特图上的折点预示着机理或决速步的改变。$\blacksquare$
:::

::: widget plot
f: r*x
x: -0.4, 0.9
y: -1, 2
sliders: r=2:-1:4:0.1
points: 0.78, 1.56; 0.66, 1.32; 0.50, 1.00; 0.23, 0.46; 0, 0; -0.17, -0.34; -0.27, -0.54
labels: \log_{10}(k_\mathrm{X}/k_\mathrm{H}) = \rho\sigma
caption: 氧化加成的哈米特图，$\log_{10}(k_\mathrm{X}/k_\mathrm{H})$ 对 $\sigma_p$。圆点由[[#eq-hammett]]取 $\rho = +2.0$ 对取代基 $\mathrm{NO_2}$、$\mathrm{CN}$、$\mathrm{COCH_3}$、Cl、H、$\mathrm{CH_3}$ 与 $\mathrm{OCH_3}$（自右向左）算出；它们说明效应的大小，并不复现某组具体数据。拖动 $\rho$：$\rho = 2$ 时，*对*位硝基使氧化加成加速约 36 倍，*对*位甲氧基使其减速约 3.5 倍。若 $\rho$ 为负，则意味着过渡态带正电荷，如对环的亲电进攻。
:::

::: example 活化与钝化的芳基卤化物 {#ex-hammett}
取 $\rho = +2.0$，对碘硝基苯的氧化加成比碘苯快多少倍？对碘苯甲醚又慢多少倍？把第一个倍数表为 $298\ \mathrm{K}$ 下 $\Delta G^\ddagger$ 之差。
::: solution
对硝基：$\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 2.0 \times 0.78 = 1.56$，故 $k_\mathrm{X}/k_\mathrm{H} = 10^{1.56} = 36$。对甲氧基：$2.0 \times (-0.27) = -0.54$，$k_\mathrm{X}/k_\mathrm{H} = 10^{-0.54} = 0.29$，约慢 3.5 倍。硝基使能垒降低
$$
\Delta\Delta G^\ddagger = 2.303RT \times 1.56 = 2.303 \times 8.314 \times 298.15 \times 1.56\ \mathrm{J\,mol^{-1}} = 8.9\ \mathrm{kJ\,mol^{-1}}.
$$
这就是为什么 4-氯硝基苯、2-氯吡啶这类"活化"（缺电子）芳基氯化物用简单催化剂就能偶联，而 4-氯苯甲醚这类富电子芳基氯化物需要[[#prop-oa-limiting]]中那种庞大而富电子的配体。
:::
:::

## 具名反应

各反应的主要差别在亲核试剂，因而也在转金属化步骤；Heck 反应则以插入取代了转金属化。

| 反应（年份） | 亲核试剂 | 注记 |
|---|---|---|
| Kumada–Tamao–Corriu（1972） | $\mathrm{RMgX}$（Ni 或 Pd） | 极为活泼；能容忍的官能团很少 |
| Negishi（1977） | $\mathrm{RZnX}$ | 适用范围广，含烷基；试剂对空气敏感 |
| Stille（1978） | $\mathrm{RSnR'_3}$ | 中性条件，耐受性极好；锡副产物有毒 |
| Suzuki–Miyaura（1979） | $\mathrm{RB(OH)_2}$、$\mathrm{RB(OR)_2}$ + 碱 | 试剂稳定、低毒；水相条件；使用最广 |
| Hiyama（1988） | $\mathrm{RSi(OR)_3}$ + 氟化物或碱 | 硅被活化为五配位硅酸盐 |
| Sonogashira（1975） | 端炔 + CuI + 胺 | 乙炔亚铜进行转金属化 |
| Heck（Mizoroki 1971，Heck 1972） | 烯烃（无有机金属） | 插入 + β-氢消除 |
| Buchwald–Hartwig（1994–95） | 胺 $\mathrm{HNR_2}$ + 强碱 | 形成 C–N 键；依赖配体 |

### Suzuki–Miyaura 偶联

有机硼化合物是劣质亲核试剂，因为硼的空 $p$ 轨道把 B–C 键抓得很紧。碱——碳酸盐、磷酸盐或氢氧化物——必不可少：它要么把 $\mathrm{ArB(OH)_2}$ 变成四配位硼酸根 $\mathrm{[ArB(OH)_3]^-}$，其 B–C 键更富电子、更易转移；要么把卤化钯变成氢氧化物或醇盐，经氧与中性硼酸结合。Amatore（Christian Amatore）与 Jutand（Anny Jutand），以及 Carrow（Brad Carrow）与 Hartwig（John Hartwig）（2011 年）的动力学研究表明，在典型水相条件下，钯-羟基路径常常更快。副产物——硼酸与无机盐——毒性低，用水即可洗去，这就是 Suzuki 反应在工业与药物化学中占统治地位的原因。

::: example 设计一个联芳基 {#ex-suzuki}
设计一条 4-甲氧基联苯 $\mathrm{CH_3O{-}C_6H_4{-}C_6H_5}$ 的 Suzuki–Miyaura 合成路线，并计算 4-溴苯甲醚（$M = 187.04\ \mathrm{g\,mol^{-1}}$）与苯硼酸（$121.93\ \mathrm{g\,mol^{-1}}$）偶联的原子经济性（只计这两种反应物；产物 $M = 184.24\ \mathrm{g\,mol^{-1}}$）。
::: solution
**逆合成切断。**切断芳基–芳基键：一个环作亲电试剂（卤化物），另一个作亲核试剂（硼酸）。两种选择都行——4-溴苯甲醚配苯硼酸，或溴苯配 4-甲氧基苯硼酸。把缺电子的环选作卤化物有助于氧化加成（[[#ex-hammett]]）；这里两个环都没有强活化，选择由价格与可得性决定。典型条件：$1$–$2\ \mathrm{mol\,\%}$ 的 Pd(0) 或 Pd(II)/膦催化剂、碳酸钾水溶液、有机共溶剂、温和加热。

**原子经济性。**对 $\mathrm{ArBr + PhB(OH)_2 \rightarrow ArPh + "HOBr{\cdot}BOH"}$（硼与溴最终进入与碱成盐），
$$
\text{AE} = \frac{184.24}{187.04 + 121.93} = \frac{184.24}{308.97} = 59.6\,\%.
$$
把计量消耗的碱也算进去会更低。交叉偶联在选择性与适用范围上极为出色，在原子经济性上只是中等，因为"把手"（卤素与硼）都被扔掉了（[[green-chemistry/green-metrics]]）。
:::
:::

### Heck 反应

在 Heck 反应中（Mizoroki（Tsutomu Mizoroki），1971；Heck，1972），偶联伙伴是烯烃，不需要主族有机金属试剂。循环逐步如下：

1. ArX 对 $\mathrm{PdL_2}$ 的**氧化加成**给出 $\mathrm{L_2Pd(Ar)X}$。
2. **烯烃配位**：失去一分子膦（在三氟甲磺酸酯与螯合双膦更倾向的阳离子路径中则是失去卤素）后，使烯烃与芳基处于顺式。
3. **迁移插入**（顺式，1,2）：芳基迁移到烯烃的一个碳上，钯与另一个碳成键，两者在同一面。对丙烯酸酯，芳基加到未取代的末端碳上——既有空间位阻的原因，也因为在这种极化的插入中，缺电子的 β-碳正是芳基进攻的位点。
4. **旋转与顺式 β-氢消除**：新烷基绕 C–C 键旋转，使一个 β-氢与钯顺式共平面；消除释放出取代烯烃与 $\mathrm{L_2Pd(H)X}$。有选择余地时，氢的移除使较大的基团处于 *trans*，给出（*E*)-烯烃。
5. **碱促进的还原消除**：从 $\mathrm{L_2Pd(H)X}$ 消除 HX（碱，通常为叔胺或碳酸盐，移去质子）再生 Pd(0)。

由于插入与消除都是顺式的、且发生在不同的碳上，总立体化学可以预测：产物烯烃保留原料烯烃的取代模式，只是其中一个氢被芳基取代。

::: example Heck 反应的产物 {#ex-heck}
预言碘苯与丙烯酸甲酯（methyl prop-2-enoate，即 methyl acrylate）在三乙胺为碱的 Heck 条件下的产物，并描述决定立体化学的步骤。
::: solution
氧化加成给出 $\mathrm{PhPd(I)L_2}$。丙烯酸酯配位并插入，苯基加到末端 $\mathrm{CH_2}$、钯加到带酯基的碳上：$\mathrm{Pd{-}CH(CO_2CH_3){-}CH_2Ph}$。该烷基只有苄位 $\mathrm{CH_2}$ 上有 β-氢（另一个邻位是酯基碳，上面没有）。绕 C–C 键旋转使苄位 H 与 Pd 顺式时，苯基可与酯基处于 *anti* 或 *gauche*；苯基与酯基 *anti*（拥挤较小）的构象经顺式消除给出苯基与酯基处于 *trans* 的烯烃。产物是 **（*E*)-3-苯基丙烯酸甲酯**（肉桂酸甲酯）。三乙胺从 $\mathrm{HPdIL_2}$ 移去 HI，再生 Pd(0) 并生成 $\mathrm{Et_3NH^+\,I^-}$。
:::
:::

### Sonogashira 偶联与 C–N 偶联

**Sonogashira 反应**（Sonogashira（Kenkichi Sonogashira）、Tohda（Yasuo Tohda）与 Hagihara（Nobue Hagihara），1975）用钯、铜(I)助催化剂与胺，把端炔与芳基或烯基卤化物偶联。胺与铜一起把炔去质子化为**乙炔亚铜**，后者把炔基转金属化到芳基钯(II)卤化物上；随后还原消除给出芳基炔。若有空气，铜还催化炔的氧化自身偶联（Glaser 偶联），这就是反应须在惰性气氛下进行、且已发展出无铜变体的原因。

**Buchwald–Hartwig 胺化**（Buchwald 与 Hartwig 各自独立，1994–95）形成 C–N 键。氧化加成后，胺配位到芳基钯(II)卤化物上；强碱（叔丁醇钠、碳酸铯）移去配位胺的 N–H 质子，生成氨基配合物 $\mathrm{L_nPd(Ar)(NR_2)}$；C–N 还原消除放出芳胺。一个竞争的副反应是从氨基发生 **β-氢消除**（若它带有 α-C–H，即对钯处于 β 位），生成亚胺与芳基钯氢化物，后者消除出芳烃——这是主要副反应，可被使还原消除变快的庞大配体抑制。为这单独一步发展配体——从 BINAP、dppf 等螯合双膦到双烷基联芳基膦——是机理指导催化剂设计最清晰的例子之一。

::: quiz
4-氯苯甲醚与苯硼酸的 Suzuki 偶联，用 $\mathrm{[Pd(PPh_3)_4]}$ 无产物，而用带三*叔*丁基膦的钯催化剂在室温下迅速反应。哪些解释正确？
- [x] 富电子芳基氯化物的氧化加成是慢步骤，庞大而强给予的 $\mathrm{P}t\mathrm{Bu_3}$ 有利于高活性的单配位 Pd(0)。
- [x] 用 $\mathrm{PPh_3}$ 时，大部分钯被锁在配位饱和的 $\mathrm{PdL_3}$/$\mathrm{PdL_4}$ 物种中，可用的低配位 Pd(0) 极少。
- [ ] 三*叔*丁基膦是更好的 π 接受体，能稳定 Pd(0) 并加速氧化加成。
- [ ] 配体庞大时，硼酸直接对 Pd(0) 转金属化。
::: solution
这个芳基氯化物集强 C–Cl 键与钝化的甲氧基（$\sigma_p = -0.27$）于一身，所以氧化加成决定转化数（[[#prop-oa-limiting]]）。$\mathrm{P}t\mathrm{Bu_3}$（锥角 $182^\circ$，TEP $2056.1\ \mathrm{cm^{-1}}$，[[organometallics-catalysis/ligands-complexes#def-tolman]]）是强 σ 给体、弱 π 接受体；其体积把钯限制在一至两个膦上，其给予性使 Pd(0) 更富电子。转金属化发生在氧化加成之后的 Pd(II) 上，绝不发生在 Pd(0) 上。
:::
:::

## 催化剂寿命与残留钯

催化剂若在底物耗尽之前死亡，则无论反应进行多久，产率都受到限制。最简单的模型能定量地说明这一点。

::: proposition 一级失活下的最大转化数 {#prop-ton-max}
设活性催化剂以恒定频率 $k_\text{cat}$ 周转（底物饱和，对底物为零级），并以速率常数为 $k_\mathrm{d}$ 的一级过程失活（聚集为钯黑、配体降解）。则到时间 $t$ 生成的产物为
$$
[\mathrm{P}](t) = \frac{k_\text{cat}}{k_\mathrm{d}}[\mathrm{Cat}]_0\left(1 - e^{-k_\mathrm{d}t}\right),
$$ {#eq-ton-max}
最大转化数为 $\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d}$。浓度为 $[\mathrm{S}]_0$ 的底物的最大可达转化率为 $\min\!\big(1,\ \mathrm{TON_{max}}[\mathrm{Cat}]_0/[\mathrm{S}]_0\big)$。
:::

::: proof
失活给出 $[\mathrm{Cat}](t) = [\mathrm{Cat}]_0e^{-k_\mathrm{d}t}$。产物以 $\mathrm{d}[\mathrm{P}]/\mathrm{d}t = k_\text{cat}[\mathrm{Cat}](t)$ 生成，所以
$$
[\mathrm{P}](t) = k_\text{cat}[\mathrm{Cat}]_0\int_0^t e^{-k_\mathrm{d}t'}\,\mathrm{d}t' = \frac{k_\text{cat}[\mathrm{Cat}]_0}{k_\mathrm{d}}\left(1 - e^{-k_\mathrm{d}t}\right).
$$
$t \to \infty$ 时 $[\mathrm{P}] \to (k_\text{cat}/k_\mathrm{d})[\mathrm{Cat}]_0$，即平均每个催化剂分子周转 $k_\text{cat}/k_\mathrm{d}$ 次——它是工作速率与死亡速率之比。产物不能超过 $[\mathrm{S}]_0$，这就给出转化率上限；接近完全转化时零级假设失效（速率随底物减少而下降），但上限仍然成立。$\blacksquare$
:::

::: widget plot
f: min(1, l*0.5/d*(1 - exp(-0.001*d*x)))
x: 0, 6000
y: 0, 1.05
sliders: l=1:0.2:5:0.1; d=1:0.2:5:0.1
labels: \text{转化率}
caption: 转化率对时间（秒），催化剂以 $k_\text{cat} = 5.0\ \mathrm{s^{-1}}$ 周转、以 $k_\mathrm{d} = d \times 10^{-3}\ \mathrm{s^{-1}}$ 失活，负载量为 $l \times 0.010\ \mathrm{mol\,\%}$（[[#eq-ton-max]]）。$l = 1$、$d = 1$ 时催化剂至多完成 $\mathrm{TON_{max}} = 5000$ 次周转，只够 $50\,\%$ 的转化率：曲线变平是因为催化剂死了，而不是底物耗尽。把负载量加倍，或用更稳固的配体把 $d$ 减半，曲线就能到达完全转化。加入新鲜催化剂后重新启动的停滞反应，正是这种情形的实验指纹。
:::

::: example 停滞的偶联 {#ex-stall}
以 $0.010\ \mathrm{mol\,\%}$ 钯进行的偶联在 $50\,\%$ 转化率处停止。独立测得 $k_\text{cat} = 5.0\ \mathrm{s^{-1}}$、$k_\mathrm{d} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$。解释这一停滞，并求完全转化所需的负载量，以及生成可达产物 $90\,\%$ 所需的时间。
::: solution
$\mathrm{TON_{max}} = 5.0/1.0\times10^{-3} = 5.0\times10^{3}$。负载量为每摩尔底物 $1.0\times10^{-4}$ 摩尔时，最大转化率为 $5.0\times10^{3} \times 1.0\times10^{-4} = 0.50$：恰是观察到的停滞值。完全转化至少需要 $1/(5.0\times10^{3}) = 2.0\times10^{-4}$，即 **$0.020\ \mathrm{mol\,\%}$**（实际要稍多一些，因为底物快耗尽时速率会放慢）。由[[#eq-ton-max]]，当 $1 - e^{-k_\mathrm{d}t} = 0.90$ 时生成可达产物的 $90\,\%$：
$$
t = \frac{\ln 10}{k_\mathrm{d}} = \frac{2.303}{1.0\times10^{-3}\ \mathrm{s^{-1}}} = 2.3\times10^{3}\ \mathrm{s} \approx 38\ \mathrm{min},
$$
与负载量无关。把反应静置一夜不会有帮助；只有更多的催化剂、死得更慢的催化剂或周转更快的催化剂才行。
:::
:::

进入产物的钯是杂质。对于药物，人用药品注册技术要求国际协调理事会的元素杂质指导原则 **ICH Q3D** 规定钯的每日允许暴露量（PDE）为口服制剂 $100\ \mu\mathrm{g}$（按现行修订版）。原料药中相应的浓度上限取决于每日剂量：每日剂量为 $m$ 克时，上限为 $\mathrm{PDE}/m$（微克每克，ppm）。按每日 $10\ \mathrm{g}$ 的默认假设，即 $10\ \mathrm{ppm}$。

::: example 残留钯 {#ex-residual-pd}
某药物口服每日 $0.50\ \mathrm{g}$。在 PDE $100\ \mu\mathrm{g\,day^{-1}}$ 下，其中允许的钯浓度上限是多少？若最后的偶联用了 $0.50\ \mathrm{mol\,\%}$ 钯、产物摩尔质量 $400\ \mathrm{g\,mol^{-1}}$，且所有钯都留在产物中，浓度会是多少？
::: solution
上限 $= 100\ \mu\mathrm{g\,day^{-1}}/0.50\ \mathrm{g\,day^{-1}} = 200\ \mu\mathrm{g\,g^{-1}} = 200\ \mathrm{ppm}$。若所有钯都残留：每摩尔产物（$400\ \mathrm{g}$）含钯 $0.0050\ \mathrm{mol}$，即 $0.0050 \times 106.42 = 0.532\ \mathrm{g}$，故浓度将为 $0.532/400 = 1.33\times10^{-3}\ \mathrm{g\,g^{-1}} = 1330\ \mathrm{ppm}$——几乎是上限的七倍。必须除去钯（用结晶、吸附剂或金属清除剂），或降低负载量，或把偶联放在合成的早期，让后续步骤把金属除净。低催化剂负载量既是监管要求，也是经济考量。
:::
:::

::: warning "钯催化"不等于"钯包办一切" {#warn-cu-base}
人们很容易写出一个只含钯的偶联循环，而忘记其他角色。在 Suzuki 反应中，**碱**是转金属化步骤里的试剂，换一种碱可使速率变化几个数量级；在 Sonogashira 反应中，**铜**生成乙炔亚铜；在 Negishi 反应中，**锌**盐生成锌酸盐配合物，影响转金属化；许多偶联中微量的**氧**会氧化膦或促进自身偶联。甚至"钯"本身也会误导：有些报道为无金属的反应后来被证实源于其他试剂中百万分之一级别的钯杂质，有些"均相"偶联其实由可溶性钯纳米颗粒催化。机理解释必须交代每一个影响速率的组分。
:::

## 后续内容

交叉偶联把[[organometallics-catalysis/main-group-organometallics]]的极性试剂与[[organometallics-catalysis/elementary-reactions]]的基元步骤接在一起，其配体设计则立足于[[organometallics-catalysis/ligands-complexes]]的空间与电子参数。Heck 反应的插入与 β-氢消除，与[[organometallics-catalysis/metathesis-polymerisation]]中聚合链的增长与终止是同样的步骤。偶联在合成中的策略性运用——选择切断与保护基——在[[organic-synthesis/carbon-carbon-bonds]]与[[organic-synthesis/retrosynthesis]]中展开，其在药物发现中的地位见[[medicinal-chemistry/hits-and-leads]]。直接的 C–H 官能化彻底省掉卤素与有机金属这两个"把手"，是[[green-chemistry/carbon-hydrogen]]的主题。

::: history
现代篇章始于 1970 年代初。Mizoroki（Tsutomu Mizoroki，1971）与 Heck（1972）报道了钯催化的烯烃芳基化；熊田（Makoto Kumada）与玉尾（Kohei Tamao）、以及独立地 Corriu（Robert Corriu）于 1972 年描述了镍催化的格氏试剂偶联。园越（Kenkichi Sonogashira）、Tohda（Yasuo Tohda）与 Hagihara（Nobue Hagihara）于 1975 年发表了铜助催化的炔烃偶联。根岸于 1976–77 年引入有机锌（与有机铝）伙伴，Milstein（David Milstein）与 Stille（John Stille）于 1978 年引入有机锡试剂，宫浦（Norio Miyaura）、Yamada（Kinji Yamada）与铃木于 1979 年引入有机硼试剂；Hatanaka（Yasuo Hatanaka）与檜山（Tamejiro Hiyama）于 1988 年加入有机硅。Buchwald 与 Hartwig 于 1994–95 年各自独立发展了钯催化胺化；1998 年起，庞大而富电子的膦（Fu、Buchwald、Hartwig）使芳基氯化物成为常规底物。Heck、根岸与铃木分享了 2010 年诺贝尔化学奖，"为有机合成中的钯催化交叉偶联反应"。
:::

::: summary
- 交叉偶联通过 Pd(0)/Pd(II) 循环把有机亲电试剂 R–X 与有机金属试剂 R′–[M] 接起来：氧化加成、转金属化、（异构化、）还原消除。
- 氧化加成决定转化数时，$v = k_\mathrm{OA}K_\mathrm{d}[\mathrm{Pd}]_0[\mathrm{ArX}]/(K_\mathrm{d} + [\mathrm{L}])$；庞大而富电子的配体（P*t*Bu₃、双烷基联芳基膦、NHC）提高活性低配位 Pd(0) 的比例，使芳基氯化物变得可用。
- ArX 的反应性：I > OTf ≈ Br ≫ Cl，随 C–X 键强度而来；吸电子基团加速氧化加成（哈米特 $\rho \approx +2$，经验式）。
- 具名反应的差别在亲核试剂（Mg、Zn、Sn、B、Si、乙炔亚铜、胺）；Suzuki 偶联中碱活化硼或钯；Heck 反应以顺式插入与顺式 β-氢消除给出（*E*)-烯烃。
- 一级失活时 $\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d}$；停滞的反应往往是催化剂死了，而不是慢了。
- 药物中的残留钯受监管（ICH Q3D 口服 PDE $100\ \mu\mathrm{g\,day^{-1}}$）；低负载量与除金属是工艺设计的一部分。
:::

## 习题

::: exercise 循环中数一数 {level=1 check="16"}
氧化加成产物 *trans*-$\mathrm{[Pd(Ph)Br(PPh_3)_2]}$ 的价电子数是多少？（输入电子数。）
::: solution
Pd，$g = 10$；两个 $\mathrm{PPh_3}$（L，4 电子），Ph 与 Br（X，2 电子）：$\mathrm{VE} = 10 + 4 + 2 = 16$，Pd(II)、$d^8$、平面正方形——$d^8$ 的正常电子数。
:::
:::

::: exercise 哈米特加速 {level=1 check="10"}
对 $\rho = +2.0$ 的氧化加成，*对*位乙酰基（$\sigma_p = 0.50$）相对氢使反应加速多少倍？（输入倍数。）
::: solution
$\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 2.0 \times 0.50 = 1.0$，故倍数为 $10^{1.0} = 10$。
:::
:::

::: exercise 残留钯上限 {level=1 check="200"}
某药物口服每日最大剂量 $0.50\ \mathrm{g}$。用钯的口服 PDE $100\ \mu\mathrm{g\,day^{-1}}$，允许的最大钯浓度是多少？（以 ppm，即 $\mu\mathrm{g\,g^{-1}}$ 输入。）
::: solution
$100/0.50 = 200\ \mathrm{ppm}$（[[#ex-residual-pd]]）。
:::
:::

::: exercise 最大转化数 {level=2 check="20000"}
某钯催化剂以 $k_\text{cat} = 4.0\ \mathrm{s^{-1}}$ 周转，以 $k_\mathrm{d} = 2.0\times10^{-4}\ \mathrm{s^{-1}}$ 失活。最大转化数是多少？（输入 TON。）
::: solution
$\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d} = 4.0/2.0\times10^{-4} = 2.0\times10^{4}$。完全转化的最低负载量为 $1/(2.0\times10^{4}) = 5\times10^{-5}$，即 $0.005\ \mathrm{mol\,\%}$（按摩尔计为 $50\ \mathrm{ppm}$）。
:::
:::

::: exercise Suzuki 偶联的原子经济性 {level=2 check="59.6"}
计算 4-溴苯甲醚（$187.04\ \mathrm{g\,mol^{-1}}$）+ 苯硼酸（$121.93\ \mathrm{g\,mol^{-1}}$）→ 4-甲氧基联苯（$184.24\ \mathrm{g\,mol^{-1}}$）的原子经济性（只把芳基溴与硼酸计为反应物）。（原子经济性以百分数输入，保留三位有效数字。）
::: solution
$184.24/(187.04 + 121.93) = 184.24/308.97 = 0.596 = 59.6\,\%$（[[#ex-suzuki]]）。
:::
:::

::: exercise 具名偶联的产物 {level=2}
写出各反应的产物并指明反应名：(a) 4-溴苯甲腈 + 苯乙炔，Pd/CuI，二乙胺；(b) 2-溴吡啶 + 吗啉，Pd/庞大膦，叔丁醇钠；(c) （*E*)-1-碘己-1-烯 + 氯化苯基锌，Pd 催化剂；(d) 溴苯 + 苯乙烯，Pd(OAc)₂/膦，三乙胺。
::: solution
(a) Sonogashira：4-(苯乙炔基)苯甲腈，$\mathrm{NC{-}C_6H_4{-}C{\equiv}C{-}Ph}$。(b) Buchwald–Hartwig 胺化：4-(吡啶-2-基)吗啉（吗啉氮接到吡啶的 C2 上）。(c) Negishi：（*E*)-己-1-烯基苯，$\mathrm{C_4H_9CH{=}CHPh}$，烯键构型保持（烯基碳上的氧化加成与还原消除均保持构型）。(d) Heck：（*E*)-二苯乙烯，$\mathrm{PhCH{=}CHPh}$，来自苯乙烯向 Pd–Ph 的顺式插入（苯基加到末端 $\mathrm{CH_2}$）与给出 *trans* 烯烃的顺式 β-氢消除。
:::
:::

::: exercise 推导完整速率方程 {level=3}
在[[#prop-oa-limiting]]中假设氧化加成产物从不积累。现在改设转金属化（速率常数 $k_\mathrm{T}$，对硼酸根浓度 $[\mathrm{B}]$ 为一级）慢到可比，使 $\mathrm{PdL(Ar)X}$ 达到稳态。忽略 $\mathrm{PdL_2}$ 储库（视 $\mathrm{PdL}$ 与 $\mathrm{PdL(Ar)X}$ 为唯一显著的物种），证明
$$
v = \frac{k_\mathrm{OA}k_\mathrm{T}[\mathrm{ArX}][\mathrm{B}]}{k_\mathrm{OA}[\mathrm{ArX}] + k_\mathrm{T}[\mathrm{B}]}[\mathrm{Pd}]_0,
$$
并讨论两个极限下对 ArX 与硼酸根的反应级数。实验上你将如何判定哪一步决定转化数？
::: hint
对 $\mathrm{PdL(Ar)X}$ 写稳态方程，并用守恒式 $[\mathrm{Pd}]_0 = [\mathrm{PdL}] + [\mathrm{PdL(Ar)X}]$。
:::
::: solution
稳态：$k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}] = k_\mathrm{T}[\mathrm{PdL(Ar)X}][\mathrm{B}]$。以 $[\mathrm{PdL}] = [\mathrm{Pd}]_0 - [\mathrm{PdL(Ar)X}]$：
$$
[\mathrm{PdL(Ar)X}] = \frac{k_\mathrm{OA}[\mathrm{ArX}]}{k_\mathrm{OA}[\mathrm{ArX}] + k_\mathrm{T}[\mathrm{B}]}[\mathrm{Pd}]_0,
$$
再由 $v = k_\mathrm{T}[\mathrm{PdL(Ar)X}][\mathrm{B}]$ 即得所给速率方程。**极限 1**，$k_\mathrm{OA}[\mathrm{ArX}] \ll k_\mathrm{T}[\mathrm{B}]$：$v \to k_\mathrm{OA}[\mathrm{Pd}]_0[\mathrm{ArX}]$，对 ArX 一级，对硼酸根零级；静息态是 Pd(0)。**极限 2**，$k_\mathrm{OA}[\mathrm{ArX}] \gg k_\mathrm{T}[\mathrm{B}]$：$v \to k_\mathrm{T}[\mathrm{Pd}]_0[\mathrm{B}]$，对 ArX 零级，对硼酸根一级；静息态是芳基钯卤化物。实验上：分别改变每个伙伴测初速率（定级数）；用 $^{31}\mathrm{P}$ NMR 指认静息态（Pd(0) 膦配合物与 Pd(II) 芳基卤化物配合物的化学位移不同）；与按化学计量测得的各步速率比较。把芳基卤化物从溴换成氯，或把硼酸从富电子换成位阻大的，就能把体系从一个极限推到另一个——这就是为什么交叉偶联"的"决速步是底物对的属性，而不是反应名称的属性。
:::
:::

::: exercise 围绕化学选择性做设计 {level=3}
一位化学家想合成不对称三联苯 $\mathrm{Ar^1{-}C_6H_4{-}Ar^2}$，其中心苯环在 1-位与 4-位带两个**不同**的芳基。以 1-溴-4-碘苯为起始原料，提出一个由两次 Suzuki 偶联组成、可选择性引入两个芳基的序列，解释选择性的依据，并指出计划可能失败的一种途径。
::: hint
比较 C–I 与 C–Br 键的氧化加成速率。
:::
::: solution
**步骤 1。**在温和条件下——简单催化剂如 $\mathrm{[Pd(PPh_3)_4]}$、室温或微热——让 1-溴-4-碘苯与 $\mathrm{Ar^1B(OH)_2}$（一当量）偶联。C–I 的氧化加成远快于 C–Br（键更弱，苯基卤化物中约 $270$ 对约 $340\ \mathrm{kJ\,mol^{-1}}$），所以碘代位选择性地反应，得到 $\mathrm{Br{-}C_6H_4{-}Ar^1}$。
**步骤 2。**在更强烈的条件下或用更活泼的催化剂（加热；庞大富电子膦），让该芳基溴与 $\mathrm{Ar^2B(OH)_2}$ 偶联，给出 $\mathrm{Ar^2{-}C_6H_4{-}Ar^1}$。
**选择性的依据：**氧化加成分辨 C–I 与 C–Br；由于两次偶联共用同一个循环，化学选择性在涉及卤化物的第一个不可逆步骤处决定。
**可能的失败：**(i) 步骤 1 中若催化剂太活泼或硼酸过量，会发生"双重偶联"——第一次偶联后，还原消除生成的钯(0) 可以留在产物的 π 体系上，在扩散开之前插入相邻的 C–Br 键（这是极活泼庞大催化剂的已知问题）；(ii) 有氧存在时硼酸自身偶联；(iii) 缺电子或杂芳基硼酸在水相碱性条件下质子脱硼，还没得及转金属化就被破坏。每种失败都指向具体的对策：步骤 1 用活性较低的催化剂与恰好一当量、严格隔绝空气，或改用更稳定的硼试剂（频哪醇或 MIDA 硼酸酯）。
:::
:::
