普萘洛尔（propranolol）与激素肾上腺素结合同一个 β肾上腺素受体的同一个口袋，普萘洛尔的亲和力却高出几个数量级。然而肾上腺素使心跳加快，普萘洛尔则什么都不做——除了阻止肾上腺素起作用。这里藏着两个问题，正是本章的两个问题。第一个关于**亲和力**：是什么把一个分子固定在口袋里？多牢？多久？答案是一个自由能 $\Delta_\mathrm{b}G^\circ$，由氢键、离子相互作用、色散力与疏水效应构成，而这一切都要以剥去两个伙伴身上的水、并冻结配体的运动作为代价来偿付。第二个关于**效能**：结合之后，分子是把受体开启、半开，还是根本不打开？这个性质不是结合自由能，而是复合物的性质，要通过剂量-效应曲线来测量。

我们以[[medicinal-chemistry/drug-targets]]为基础，那里引入了分数占据 $\theta = [\mathrm{L}]/(K_\mathrm{d} + [\mathrm{L}])$；水中的非共价相互作用见[[biochemistry/water-noncovalent]]，结合平衡见[[biochemistry/protein-function]]。热力学工具来自[[thermodynamics/reaction-equilibrium]]。本章提到的药物只用于说明化学与药理学，没有任何内容是医疗建议。

## 结合的自由能

解离常数是平衡常数，而每一个平衡常数都是一个乔装的标准吉布斯能。

::: proposition 结合自由能与解离常数 {#prop-dg}
对于稀溶液中的结合平衡 $\mathrm{R + L \rightleftharpoons RL}$，以 $\mathrm{mol\,dm^{-3}}$ 表示的解离常数为 $K_\mathrm{d}$，标准浓度 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$，则标准结合吉布斯能为
$$
\Delta_\mathrm{b}G^\circ = RT\ln\frac{K_\mathrm{d}}{c^\circ} = -RT\ln 10 \times \mathrm{p}K_\mathrm{d}, \qquad \Delta_\mathrm{b}G^\circ = \Delta_\mathrm{b}H^\circ - T\Delta_\mathrm{b}S^\circ .
$$ {#eq-dg}
在 $298\ \mathrm{K}$ 下，$\Delta_\mathrm{b}G^\circ = -5.71\,\mathrm{p}K_\mathrm{d}\ \mathrm{kJ\,mol^{-1}}$。
:::

::: proof
结合常数为 $K_\mathrm{a} = 1/K_\mathrm{d}$，在稀溶液（理想）极限下，缔合的热力学平衡常数为 $K = K_\mathrm{a}c^\circ = c^\circ/K_\mathrm{d}$，其中每个浓度都除以 $c^\circ$，使活度无量纲。一般关系 $\Delta_\mathrm{r}G^\circ = -RT\ln K$（[[thermodynamics/reaction-equilibrium]]）随即给出 $\Delta_\mathrm{b}G^\circ = -RT\ln(c^\circ/K_\mathrm{d}) = RT\ln(K_\mathrm{d}/c^\circ)$。写出 $\ln x = \ln 10\,\log_{10}x$ 与 $\mathrm{p}K_\mathrm{d} = -\log_{10}(K_\mathrm{d}/c^\circ)$ 即得第二种形式；$RT\ln 10 = (8.314)(298.15)(2.3026)\ \mathrm{J\,mol^{-1}} = 5.71\ \mathrm{kJ\,mol^{-1}}$。
:::

关于[[#eq-dg]]有两点容易被忽略。第一，$\Delta_\mathrm{b}G^\circ$ 依赖于标准态的选择：它描述的是从 $1\ \mathrm{mol\,dm^{-3}}$ 溶液出发的结合——一个任何药物都达不到的浓度——其*熵*项包括配体从该浓度进入复合物时平动自由度的损失。因此绝对值是约定俗成的；同一蛋白质上不同配体之间的*差值*则不是。第二，这把标尺是对数的而且被压缩：从毫摩尔级的片段（$\mathrm{p}K_\mathrm{d} = 3$）到皮摩尔级的抗体（$\mathrm{p}K_\mathrm{d} = 12$），整个药物效价的跨度只有 $-17$ 到 $-68\ \mathrm{kJ\,mol^{-1}}$——几根典型共价键的能量就会超过它的全部。药物设计是一场以每摩尔几千焦为单位进行的角力。

焓与熵可以用**等温滴定量热法**（ITC）在实验上分开：把配体注入盛有蛋白质的样品池，每次注入放出的热直接给出 $\Delta_\mathrm{b}H^\circ$，由滴定曲线的形状给出 $K_\mathrm{d}$，差值法给出 $T\Delta_\mathrm{b}S^\circ$。

::: example 一次 ITC 测定 {#ex-itc}
$25\ \mathrm{^\circ C}$ 下的 ITC 给出某抑制剂结合其酶的 $K_\mathrm{d} = 10\ \mathrm{nmol\,dm^{-3}}$、$\Delta_\mathrm{b}H^\circ = -60\ \mathrm{kJ\,mol^{-1}}$。求 $\Delta_\mathrm{b}G^\circ$、$-T\Delta_\mathrm{b}S^\circ$ 与 $\Delta_\mathrm{b}S^\circ$，并加评论。
::: solution
由[[#eq-dg]]，$\Delta_\mathrm{b}G^\circ = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln(1.0\times10^{-8}) = -45.7\ \mathrm{kJ\,mol^{-1}}$。于是 $-T\Delta_\mathrm{b}S^\circ = \Delta_\mathrm{b}G^\circ - \Delta_\mathrm{b}H^\circ = -45.7 - (-60) = +14.3\ \mathrm{kJ\,mol^{-1}}$，故 $\Delta_\mathrm{b}S^\circ = -14.3\times10^{3}/298.15 = -48\ \mathrm{J\,K^{-1}\,mol^{-1}}$。结合由**焓驱动**、受熵阻碍：有利的热来自氢键与紧密的范德华接触，不利的熵来自配体转动与平动的冻结（被释放的水部分抵偿）。一个可比拟的抑制剂若主要经由疏水效应结合，就能以较小的 $\Delta H$ 和有利的熵达到同样的 $K_\mathrm{d}$。
:::
:::

在这类数据中有一个普遍的观察，即**焓-熵补偿**：一项使 $\Delta_\mathrm{b}H^\circ$ 更负（比如形成更紧的氢键）的化学改动，往往也让 $T\Delta_\mathrm{b}S^\circ$ 更负（复合物更僵硬），于是 $\Delta_\mathrm{b}G^\circ$ 的变化远小于两者之中任何一个。这部分是物理——更强的相互作用限制运动——部分是统计，因为 $\Delta G$ 测得比 $\Delta H$ 精，$\Delta H$ 的误差会以相反的符号出现在 $T\Delta S$ 里。补偿正是“加一根氢键”提高亲和力屡屡落空的原因。

## 把药物固定在原位的相互作用

结合发生在水中，而药物与蛋白质形成的几乎每一种相互作用，都是对两个伙伴原本已经与水形成的相互作用的替换。值得关注的能量永远是**交换**的能量：
$$
\mathrm{R{\cdots}H_2O} + \mathrm{L{\cdots}H_2O} \rightleftharpoons \mathrm{R{\cdots}L} + \mathrm{H_2O{\cdots}H_2O}.
$$
这是推断结合时最重要的一个思想，它解释了下面的典型数值（在形状契合良好的复合物中，一个相互作用对 $\Delta_\mathrm{b}G^\circ$ 的净贡献，不是气相能量）。

| 相互作用 | 典型气相能量 / $\mathrm{kJ\,mol^{-1}}$ | 水中典型净贡献 / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|
| 离子（盐桥），如 $\mathrm{R{-}NH_3^+\cdots{}^-O_2C{-}R'}$ | 数百 | $0$ 到 $-15$；若埋入蛋白内部且位置良好可达 $-20$ |
| 中性氢键，如 $\mathrm{N{-}H\cdots O{=}C}$ | $-15$ 到 $-30$ | $0$ 到 $-6$ |
| 电荷辅助氢键 | $-40$ 到 $-100$ | $-4$ 到 $-12$ |
| 范德华（色散）接触，每个紧密接触的重原子 | $-2$ 到 $-4$ | 约 $-1$ 到 $-2$ |
| 疏水效应 | — | 每埋藏 $1\ \text{Å}^2$ 非极性表面约 $-0.1\ \mathrm{kJ\,mol^{-1}}$；每个 $\mathrm{CH_2}$ 约 $-3$ |
| 阳离子-π（铵离子浮于芳环之上） | $-40$ 到 $-80$ | $-2$ 到 $-8$ |
| 卤键 $\mathrm{C{-}X\cdots O}$（$\mathrm{X = Cl, Br, I}$） | $-5$ 到 $-20$ | $0$ 到 $-5$ |

右列数值来自对大量蛋白质-配体复合物的分析，是数量级指南而非常数：同一根氢键，若供体或受体的另一头无人满足，可能毫无贡献；若被屏蔽于水外，则可能超过 $10\ \mathrm{kJ\,mol^{-1}}$。

**离子相互作用**在气相中很强，但在水中（相对介电常数约 80）被严重屏蔽，且要付出巨大的**去溶剂化代价**：铵离子必须甩掉紧紧抓住它的水化层。蛋白质表面的盐桥贡献很小；埋入内部的盐桥——例如大多数生物胺类 GPCR 配体的质子化胺与受体中保守的天冬氨酸（Asp3.32）之间的那一座——能把一整类药物锚定住。

**氢键**是有方向的（$\mathrm{N{-}H\cdots O}$ 接近直线，供体-受体距离 $2.7$–$3.1\ \text{Å}$）。在水中，与蛋白质形成一根氢键替换掉的是与水形成的一根，净收益很小——除非蛋白质的对手基团处在水无法好好满足它的口袋里。反过来，把配体的极性基团埋起来*而*没有氢键伙伴，要付出每摩尔好几千焦的去溶剂化代价，这就是为什么在错误的地方加一个羟基能让分子结合得*差*十倍。

**范德华相互作用**——色散吸引与短程排斥的平衡——单独看弱而且无方向，却数量众多；契合良好的口袋里的药物可能形成几十处接触。形状互补由范德华回报，而且回报是陡峭的，因为色散按 $r^{-6}$ 衰减：配体与口袋壁之间 $1\ \text{Å}$ 的空隙就失去大部分吸引。

**疏水效应**根本不是非极性基团之间的吸引，而是水结构的后果（[[biochemistry/water-noncovalent]]）。非极性表面周围的水无法形成完整的氢键网络；埋藏那块表面会把水释放回体相。室温下，对小溶质而言该效应主要是熵性的。它是最可靠的亲和力来源，也是药物分子普遍相当亲脂的主要原因——其对溶解性与代谢的后果在[[medicinal-chemistry/pharmacokinetics]]中展开。一个好用的经验数字是：在疏水口袋中给配体每增加一个亚甲基，最多可得约 $3\ \mathrm{kJ\,mol^{-1}}$，$K_\mathrm{d}$ 约提高 3.4 倍，大致等于它从水转移到辛醇的自由能。

**阳离子-π相互作用**把一个阳离子（常是季铵或质子化胺）放在色氨酸、酪氨酸或苯丙氨酸芳环的面上方，芳环的 π 电子云在环面上下方带有部分负电荷。乙酰胆碱无论结合胆碱酯酶还是它的受体都是这种方式。**卤键**则利用 **σ空穴**：在 C–Cl、C–Br 或 C–I 键沿键轴背离键的另一侧，存在一块正静电势区域，它与主链羰基氧的孤对电子相互作用。

有两项代价抵消所有这些收益。结合冻结了配体的**转动与平动**自由；每一根在溶液中自由、在复合物中被固定的**可旋转键**都要付出构象熵，粗略估计每根 $1$–$4\ \mathrm{kJ\,mol^{-1}}$。已经呈结合构象的刚性配体不必付出第二项代价——这正是[[medicinal-chemistry/structure-activity]]中构象限制策略的动机。

::: example 基团对结合的平均贡献 {#ex-andrews}
安德鲁斯（Peter Andrews）、克莱伊克（David Craik）与马丁（Jennifer Martin）（*J. Med. Chem.*，1984）把约 200 个配体的结合常数拟合为一个加和模型。在他们的经验方案中，平均本征结合能（以 $\mathrm{kcal\,mol^{-1}}$ 计，有利取正）为：$\mathrm{N^+}$ 11.5，$\mathrm{CO_2^-}$ 8.2，$\mathrm{OH}$ 2.5，$\mathrm{C{=}O}$ 3.4，醚 O 1.1，$\mathrm{sp^2}$ C 0.7，$\mathrm{sp^3}$ C 0.8；失去整体转动与平动熵的代价为 14.0，每根可旋转键再罚 0.7。试估算普萘洛尔（一个铵氮、一个羟基、一个醚氧、萘环的十个 $\mathrm{sp^2}$ 碳、六个 $\mathrm{sp^3}$ 碳、六根可旋转键）的“平均”结合能，在 $298\ \mathrm{K}$ 下换算成 $\mathrm{p}K_\mathrm{d}$，并与它在 β肾上腺素受体上约 9 的实测 $\mathrm{p}K_\mathrm{d}$ 比较。
::: solution
基团项之和：$11.5 + 2.5 + 1.1 + 10(0.7) + 6(0.8) = 26.9\ \mathrm{kcal\,mol^{-1}}$。代价项：$14.0 + 6(0.7) = 18.2$。净值：$8.7\ \mathrm{kcal\,mol^{-1}} = 36.4\ \mathrm{kJ\,mol^{-1}}$，故 $\Delta_\mathrm{b}G^\circ \approx -36.4\ \mathrm{kJ\,mol^{-1}}$，$\mathrm{p}K_\mathrm{d} = 36.4/5.71 = 6.4$。实测值高约 2.6 个单位。安德鲁斯的数值描述的是一个与*平均*受体形成*平均*相互作用的配体；一个比估算好出数量级的配体，是它的口袋契合得异乎寻常地好；远低于估算者则契合得差。这套方案是经验的、粗糙的——它完全忽略几何——但它给评判一个实测亲和力提供了有用的基线，这个思想后来在[[medicinal-chemistry/hits-and-leads]]中被提炼为配体效率。
:::
:::

::: warning 在结合中一根氢键不值 20 kJ mol⁻¹ {#warn-hbond}
把气相相互作用能加起来——每根氢键 $20\ \mathrm{kJ\,mol^{-1}}$，盐桥几百——然后断言五根氢键的配体必以接近 $-100\ \mathrm{kJ\,mol^{-1}}$ 的 $\Delta G$ 结合，是很诱人的。这忽略了这些基团在结合之前每一个都与水形成氢键。氢键在水中的净效果是两个相似相互作用之*差*，典型值只有每摩尔几千焦，有时为零甚至为正。收益来自水做不好的相互作用（色散接触、埋藏的非极性表面），来自水到不了的地方的相互作用。
:::

## 结合动理学：药物停留多久

平衡常数对平衡多快达到一无所知。对于浓度以小时为单位涨落的药物，结合与解离的速率可以和 $K_\mathrm{d}$ 同等重要。

::: proposition 单步结合的动理学 {#prop-kinetics}
对于 $\mathrm{R + L} \underset{k_\mathrm{off}}{\overset{k_\mathrm{on}}{\rightleftharpoons}} \mathrm{RL}$：

1. 平衡时 $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on}$；
2. 配体过量且浓度 $[\mathrm{L}]$ 恒定时，复合物以观察速率常数指数地趋近平衡
$$
k_\mathrm{obs} = k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off};
$$ {#eq-kobs-bind}
3. 移去游离配体后，复合物以速率常数 $k_\mathrm{off}$ 衰减；复合物的平均寿命即**驻留时间** $\tau = 1/k_\mathrm{off}$，其半衰期为 $\ln 2/k_\mathrm{off}$。
:::

::: proof
速率方程为 $d[\mathrm{RL}]/dt = k_\mathrm{on}[\mathrm{R}][\mathrm{L}] - k_\mathrm{off}[\mathrm{RL}]$。(1) 平衡时导数为零，故 $[\mathrm{R}][\mathrm{L}]/[\mathrm{RL}] = k_\mathrm{off}/k_\mathrm{on}$，按定义即 $K_\mathrm{d}$。(2) 写 $[\mathrm{R}] = [\mathrm{R}]_0 - [\mathrm{RL}]$，$[\mathrm{L}]$ 恒定：
$$
\frac{d[\mathrm{RL}]}{dt} = k_\mathrm{on}[\mathrm{L}][\mathrm{R}]_0 - (k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off})[\mathrm{RL}],
$$
这是一阶线性方程，其解以 $1 - e^{-k_\mathrm{obs}t}$ 弛豫到平衡值 $[\mathrm{RL}]_\mathrm{eq}$，$k_\mathrm{obs}$ 由[[#eq-kobs-bind]]给出。(3) $[\mathrm{L}] = 0$ 时方程化为 $d[\mathrm{RL}]/dt = -k_\mathrm{off}[\mathrm{RL}]$，指数衰减；一级衰减的平均寿命为 $1/k$。
:::

小分子与蛋白质的结合速率常数典型落在 $10^{5}$ 到 $10^{8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 之间，低于约 $10^{9}$ 的扩散极限，因为蛋白质表面只有一小部分是该位点的入口，而且蛋白质可能需要改变形状。由于 $k_\mathrm{on}$ 的变化范围有限，高亲和力多半意味着解离缓慢：一个 $1\ \mathrm{nmol\,dm^{-3}}$ 的药物若 $k_\mathrm{on} = 10^6\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$，必有 $k_\mathrm{off} = 10^{-3}\ \mathrm{s^{-1}}$。

::: example 驻留时间 {#ex-residence}
表面等离子体共振给出某受体拮抗剂的 $k_\mathrm{on} = 1.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$、$k_\mathrm{off} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$。求 $K_\mathrm{d}$、驻留时间与复合物的半衰期。在 $[\mathrm{L}] = 10\ \mathrm{nmol\,dm^{-3}}$ 下，达到平衡结合的 90 % 需要多久？
::: solution
$K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = 1.0\times10^{-9}\ \mathrm{mol\,dm^{-3}} = 1.0\ \mathrm{nmol\,dm^{-3}}$。驻留时间 $\tau = 1/k_\mathrm{off} = 1000\ \mathrm{s} \approx 17\ \mathrm{min}$；半衰期 $\ln 2/k_\mathrm{off} = 693\ \mathrm{s} \approx 12\ \mathrm{min}$。由[[#eq-kobs-bind]]，$k_\mathrm{obs} = (1.0\times10^{6})(1.0\times10^{-8}) + 1.0\times10^{-3} = 1.1\times10^{-2}\ \mathrm{s^{-1}}$，达到平衡的 90 % 需 $\ln 10/k_\mathrm{obs} = 209\ \mathrm{s}$，约 $3.5$ 分钟。只孵育一分钟的结合试验会低估这个化合物的亲和力；而拮抗作用在游离药物被洗去后仍会持续一段时间，原因就在驻留时间。
:::
:::

科普兰（Robert Copeland）与同事在 2006 年论证：**驻留时间**往往比 $K_\mathrm{d}$ 更能预测药物在体内的作用持续时间，因为身体是一个开放系统，游离药物浓度在不断变化。毒蕈碱型拮抗剂噻托溴铵在 $\mathrm{M_3}$ 受体上的驻留时间长达数小时，是最常被引用的例子。这个思想有边界——在给定 $K_\mathrm{d}$ 下解离慢也意味着结合慢，而被清除得比解离还快的药物是一类情形——但它已使动理学测量成为先导优化的常规。

## 立体化学与构象

蛋白质口袋是手性的，所以在靶点看来，手性药物的两个对映体是不同的化合物。伊森（Arthur Easson）与斯特德曼（Edgar Stedman）在 1933 年提出，配体与受体在三个点上发生相互作用时就能分辨对映体，因为只有一个对映体能同时形成三处接触；活性较高的对映体称为**优体**（eutomer），活性较低的称为**劣体**（distomer），两者亲和力之比称为**优比**（eudismic ratio）。

::: example 作为自由能的优比 {#ex-eudismic}
普萘洛尔的 (*S*)-对映体结合 β肾上腺素受体比 (*R*)-对映体紧约 100 倍。这在 $298\ \mathrm{K}$ 下相当于多大的结合自由能之差？它必须涉及几处“三点”接触？
::: solution
由[[#eq-dg]]，$\Delta\Delta_\mathrm{b}G^\circ = RT\ln 100 = (8.314)(298.15)(4.605)\ \mathrm{J\,mol^{-1}} = 11.4\ \mathrm{kJ\,mol^{-1}}$。在 (*S*)-对映体中，羟基、质子化胺与芳氧基可以同时够到各自的伙伴（丝氨酸与天冬酰胺侧链、天冬氨酸的羧酸根、芳环口袋）；在 (*R*)-对映体中，羟基与氢互换了位置，三处接触中必有一处无法与其他两处同时形成。失去一处安置得当的极性接触——比如一根电荷辅助氢键连同随之而来的水重排——就足以解释 $10\ \mathrm{kJ\,mol^{-1}}$；其余接触什么都不必改变。
:::
:::

自 FDA 1992 年发布关于立体异构体药物开发的政策声明（要求对外消旋体的每个对映体分别做出表征）以来，单一对映体药物成为常态。关于沙利度胺常被讲述的故事——一个对映体镇静、另一个致畸，所以单一对映体本会安全——经不起推敲：沙利度胺的立体中心是酸性的（处于酰亚胺羰基的 α 位），两个对映体在体内数小时内即相互转化。手性重要，立体中心的化学同样重要。沙利度胺效应的分子靶点——泛素连接酶组分 cereblon——将在[[medicinal-chemistry/biologics]]中再次出现。

**构象**的道理相同。柔性配体以一种构象结合，而这种构象未必是它在溶液中的最低能构象；达到结合构象所需的自由能（**应变能**）要从结合自由能中扣除。**诱导契合**（科什兰，Daniel Koshland，1958）描述反面情形：蛋白质在结合时同样改变构象，那部分变化的能量同样出自结合自由能——这也是把受体按在失活状态上的拮抗剂，常比必须把它推入激活状态的激动剂结合得更紧的原因之一。

## 激动剂、拮抗剂与效能

::: definition 激动剂、拮抗剂与效能 {#def-efficacy}
受体配体若结合后产生反应，称为**激动剂**；若结合而不产生反应、从而减弱激动剂的反应，称为**拮抗剂**。**效能**是已结合的配体激活受体的能力。**完全激动剂**能产生系统的最大反应；**部分激动剂**无论浓度多高，最大反应都更小；**反向激动剂**降低受体的组成性（无配体时）活性。**竞争性拮抗剂**在激动剂的位点上可逆结合，其效应可以通过提高激动剂浓度来克服（**可克服的**）；**非竞争性拮抗剂**（在同一位点不可逆结合的配体，或别构抑制剂）降低最大反应（**不可克服的**）。
:::

在分子层面，效能是构象选择的问题。受体存在于失活与活性构象的平衡之间；激动剂结合活性构象比失活构象更紧，从而把平衡推向活性构象；反向激动剂反之；中性拮抗剂对两者一视同仁。由于效应既取决于药物的性质（亲和力、效能），也取决于组织的性质（受体数目、放大能力），药理学家用一个模型把两者分开。

::: proposition 激动作用的操作性模型 {#prop-operational}
设激动剂 A 以解离常数 $K_\mathrm{A}$ 结合受体，而效应是激动剂-受体复合物浓度的双曲函数，$E = E_\mathrm{m}[\mathrm{AR}]/(K_\mathrm{E} + [\mathrm{AR}])$，其中 $E_\mathrm{m}$ 是系统的最大效应，$K_\mathrm{E}$ 是给出其一半的复合物浓度。定义**换能比** $\tau = [\mathrm{R}]_0/K_\mathrm{E}$。则
$$
\frac{E}{E_\mathrm{m}} = \frac{\tau[\mathrm{A}]}{K_\mathrm{A} + (1 + \tau)[\mathrm{A}]}, \qquad E_\mathrm{max} = \frac{\tau}{1 + \tau}E_\mathrm{m}, \qquad \mathrm{EC_{50}} = \frac{K_\mathrm{A}}{1 + \tau}.
$$ {#eq-operational}
:::

::: proof
占据给出 $[\mathrm{AR}] = [\mathrm{R}]_0[\mathrm{A}]/(K_\mathrm{A} + [\mathrm{A}])$（[[medicinal-chemistry/drug-targets#prop-occupancy]]）。代入换能函数，分子分母同乘 $(K_\mathrm{A} + [\mathrm{A}])/K_\mathrm{E}$：
$$
\frac{E}{E_\mathrm{m}} = \frac{[\mathrm{R}]_0[\mathrm{A}]/K_\mathrm{E}}{K_\mathrm{A} + [\mathrm{A}] + [\mathrm{R}]_0[\mathrm{A}]/K_\mathrm{E}} = \frac{\tau[\mathrm{A}]}{K_\mathrm{A} + (1 + \tau)[\mathrm{A}]}.
$$
$[\mathrm{A}] \to \infty$ 时趋于 $\tau/(1 + \tau)$。该式是关于 $[\mathrm{A}]$ 的形式为 $E_\mathrm{max}[\mathrm{A}]/(\mathrm{EC_{50}} + [\mathrm{A}])$ 的双曲线，分子分母同除以 $1 + \tau$ 即可看出 $\mathrm{EC_{50}} = K_\mathrm{A}/(1 + \tau)$。
:::

这个模型由布莱克（James Black）与莱夫（Paul Leff）于 1983 年提出。$\tau$ 大——效能高，或组织受体多、放大强——得到的是完全激动剂，其 $\mathrm{EC_{50}}$ 远低于 $K_\mathrm{A}$：存在**储备受体**，最大反应只需占据一部分受体。$\tau$ 小则得到 $\mathrm{EC_{50}} \approx K_\mathrm{A}$ 的部分激动剂。因此同一分子可以在一种组织中是完全激动剂、在另一种组织中是部分激动剂，这个事实解释了同类药物之间的若干临床差异。

::: widget plot
f: 10^x/(1 + 10^x); t*10^x/(1 + (1 + t)*10^x)
x: -4, 3
y: 0, 1.05
sliders: t=10:0.1:100:0.1
labels: \text{占据分数 } \theta; \text{效应 } E/E_\mathrm{m}
hlines: 0.5
caption: 由操作性模型[[#eq-operational]]算出的占据与效应，对 $x = \log_{10}([\mathrm{A}]/K_\mathrm{A})$ 作图，换能比 $t = \tau$。$\tau = 10$ 时效应曲线位于占据曲线左侧约一个对数单位：约 8 % 占据即达半最大效应。把 $\tau$ 降到 1 附近，激动剂变为部分激动——平台降到 $\tau/(1+\tau)$，效应曲线滑回占据曲线之上。把它升到 100，储备受体随之增长。
:::

::: example 两种组织中的部分激动剂 {#ex-partial}
某激动剂 $K_\mathrm{A} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$，在组织 X 中 $\tau = 9$，在组织 Y（表达较少受体）中 $\tau = 1$。求两种组织中的 $E_\mathrm{max}/E_\mathrm{m}$ 与 $\mathrm{EC_{50}}$，以及组织 X 中 $\mathrm{EC_{50}}$ 处的受体占据分数。
::: solution
由[[#eq-operational]]。组织 X：$E_\mathrm{max}/E_\mathrm{m} = 9/10 = 0.90$，$\mathrm{EC_{50}} = 1.0/10 = 0.10\ \mu\mathrm{mol\,dm^{-3}}$。组织 Y：$E_\mathrm{max}/E_\mathrm{m} = 1/2 = 0.50$，$\mathrm{EC_{50}} = 1.0/2 = 0.50\ \mu\mathrm{mol\,dm^{-3}}$。在 $0.10\ \mu\mathrm{mol\,dm^{-3}}$ 处，组织 X 的占据为 $0.10/(1.0 + 0.10) = 0.091$：9 % 的占据给出该组织最大反应的一半。这个分子在 X 中表现为近乎完全的激动剂，在 Y 中却是部分激动剂——效能是药物与组织共同的性质，只有 $K_\mathrm{A}$ 才是药物-受体对本身的性质。部分激动剂之所以有实用价值，正因为其最大效应自我设限。
:::
:::

## 竞争性拮抗与 Schild 方程

拮抗剂不能靠测量它的效应来研究，因为它没有效应；要通过它阻止的效应来研究它。若激动剂与竞争性拮抗剂 B 竞争同一位点，加入 B 会使激动剂的剂量-效应曲线右移而不改变最大值。移动的大小度量拮抗剂的亲和力，而且这一度量与受体以下的一切无关。

::: proposition Schild 方程 {#prop-schild}
设激动剂 A 与竞争性拮抗剂 B 可逆地结合同一位点，解离常数分别为 $K_\mathrm{A}$ 与 $K_\mathrm{B}$，处于平衡。设效应只依赖于激动剂占据（通过任何单调函数）。则**剂量比** $r$——在 B 存在时为产生与之前相同的反应必须把激动剂浓度增大的倍数——为
$$
r = 1 + \frac{[\mathrm{B}]}{K_\mathrm{B}}, \qquad \log_{10}(r - 1) = \log_{10}[\mathrm{B}] - \log_{10}K_\mathrm{B}.
$$ {#eq-schild}
$\log(r - 1)$ 对 $\log[\mathrm{B}]$ 作图（**Schild 图**）是一条斜率为 1 的直线，其在 $\log[\mathrm{B}]$ 轴上的截距为 $\log K_\mathrm{B}$；$\mathrm{p}A_2 = -\log_{10}K_\mathrm{B}$ 即拮抗剂的亲和力。
:::

::: proof
两个配体竞争一个位点时，质量作用给出 $[\mathrm{AR}] = [\mathrm{A}][\mathrm{R}]/K_\mathrm{A}$ 与 $[\mathrm{BR}] = [\mathrm{B}][\mathrm{R}]/K_\mathrm{B}$。受体的守恒 $[\mathrm{R}]_0 = [\mathrm{R}] + [\mathrm{AR}] + [\mathrm{BR}]$ 给出激动剂的占据（**Gaddum 方程**）
$$
\theta_\mathrm{A} = \frac{[\mathrm{A}]/K_\mathrm{A}}{1 + [\mathrm{A}]/K_\mathrm{A} + [\mathrm{B}]/K_\mathrm{B}}.
$$
反应相同意味着激动剂占据相同。设无拮抗剂时 $[\mathrm{A}]$ 给出占据 $\theta$，有拮抗剂时 $[\mathrm{A}']$ 给出同样的占据。令两式相等，交叉相乘并化简：
$$
\frac{[\mathrm{A}]/K_\mathrm{A}}{1 + [\mathrm{A}]/K_\mathrm{A}} = \frac{[\mathrm{A}']/K_\mathrm{A}}{1 + [\mathrm{A}']/K_\mathrm{A} + [\mathrm{B}]/K_\mathrm{B}} \quad\Rightarrow\quad [\mathrm{A}]\left(1 + \frac{[\mathrm{B}]}{K_\mathrm{B}}\right) = [\mathrm{A}'].
$$
于是 $r = [\mathrm{A}']/[\mathrm{A}] = 1 + [\mathrm{B}]/K_\mathrm{B}$，与 $\theta$ 无关，与 $K_\mathrm{A}$ 无关，与占据如何变成效应也无关；对 $r - 1$ 取对数即得线性形式。
:::

对信号转导过程的独立正是[[#eq-schild]]如此宝贵之处：同一拮抗剂在表达同一受体的任何组织中应给出同样的 $K_\mathrm{B}$，所以在受体还无法被克隆出来之前很久，$\mathrm{p}A_2$ 值就已被用来给受体分类。明显偏离 1 的 Schild 斜率本身就是一条诊断：它或者说明拮抗剂并非单纯竞争性，或者说明尚未达到平衡，或者说明激动剂作用于一种以上的受体。

::: widget plot
f: 1/(1 + 10^(-x - 7)); 1/(1 + (1 + 10^b)*10^(-x - 7))
x: -10, -2
y: 0, 1.05
sliders: b=1:-1:4:0.1
labels: \text{仅激动剂}; \text{加拮抗剂}
hlines: 0.5
caption: 激动剂效应对 $x = \log_{10}[\mathrm{A}]$ 作图，激动剂的 $\mathrm{EC_{50}} = 10^{-7}\ \mathrm{mol\,dm^{-3}}$，分别为单独存在与处于 $[\mathrm{B}] = 10^{b}K_\mathrm{B}$ 的竞争性拮抗剂之中。曲线右移 $\log_{10} r = \log_{10}(1 + 10^b)$，形状与最大值不变：设 $b = 1$，移动为 $\log_{10}11 = 1.04$ 个单位；$b$ 每再增加一单位，移动几乎恰好增加一个单位——这就是 Schild 图中斜率 1 的含义。
:::

::: example 一次 Schild 分析 {#ex-schild}
在离体组织实验中，拮抗剂浓度 $1.0\times10^{-8}$、$1.0\times10^{-7}$、$1.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$ 给出激动剂剂量比 3.0、21、201。画出 Schild 图，检验该拮抗是否为竞争性，并求 $K_\mathrm{B}$ 与 $\mathrm{p}A_2$。
::: solution
在 $\log[\mathrm{B}] = -8, -7, -6$ 处，$\log(r - 1)$ 分别为 $\log 2 = 0.301$、$\log 20 = 1.301$、$\log 200 = 2.301$。各点随 $\log[\mathrm{B}]$ 每单位恰好上升一个单位：斜率 1，与单纯竞争性拮抗相符。由[[#eq-schild]]，从第一点 $0.301 = -8 - \log K_\mathrm{B}$，故 $\log K_\mathrm{B} = -8.301$，$K_\mathrm{B} = 5.0\times10^{-9}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{p}A_2 = 8.30$。（每一点给出同样的答案；面对真实的散布数据，应先拟合直线、检验斜率，再把斜率固定为 1 来估计 $K_\mathrm{B}$。）
:::
:::

::: widget regression
points: -8,0.301; -7,1.301; -6,2.301; -7.5,0.85; -6.5,1.75
degree: 1
x: -9, -5
y: -0.5, 3
caption: Schild 图：$\log_{10}(r - 1)$ 对 $\log_{10}([\mathrm{B}]/\mathrm{mol\,dm^{-3}})$，含[[#ex-schild]]的三个点与两个带有真实散布的附加测量。对竞争性拮抗剂，拟合斜率应接近 1；直线在 $\log[\mathrm{B}] = \log K_\mathrm{B}$ 处穿过 $\log(r-1) = 0$。拖动一个点，看看单一处理不佳的剂量比对斜率有多敏感——以及为什么 0.8 这样的斜率本身并非非竞争性行为的证据。
:::

::: quiz
一个新的拮抗剂使激动剂的剂量-效应曲线右移，同时压低其最大值，且该效应无法通过洗涤消除。哪种说法最合适？
- [ ] $K_\mathrm{B}$ 极低的竞争性拮抗剂。
- [x] 在激动剂位点上的不可逆（或极缓慢解离的）配体，或别构抑制剂：不可克服的拮抗。
- [ ] $\tau$ 很大的部分激动剂。
- [ ] 在过高浓度下研究的竞争性拮抗剂。
::: solution
可逆的竞争性拮抗剂无论在多高浓度下只会平移曲线，因为足够的激动剂总能把它置换下来（[[#prop-schild]]）。压低最大值意味着有一部分受体退出了反应——或共价结合，或在实验期间不解离的配体，或降低效能的别构机理。储备受体较大时，不可逆拮抗剂可以先平移曲线（储备受体吸收损失）然后才压低最大值：弗奇戈特（Robert Furchgott）在 1966 年正是用这一办法测量储备受体的。
:::
:::

::: history
费歇尔（Emil Fischer）1894 年关于酶专一性的锁钥比喻与埃尔利希（Paul Ehrlich）的受体理论，给了药理学第一幅结合的图景。克拉克（Alfred Joseph Clark）在 1920 年代证明离体组织对乙酰胆碱及其拮抗剂的反应服从质量作用的双曲定律；加德姆（John Gaddum）1937 年导出了两个竞争配体的占据。伊森与斯特德曼分辨对映体的三点模型出自 1933 年。希尔德（Heinz Otto Schild）1947 年引入 $\mathrm{p}A_2$ 标度，阿伦拉克沙纳（Ooi Arunlakshana）与希尔德 1959 年发表了线性 Schild 图。阿里恩斯（E. J. Ariëns，1954）引入内在活性描述部分激动剂，斯蒂芬森（R. P. Stephenson，1956）把亲和力与效能分开；弗奇戈特对不可逆拮抗剂的运用（1966）使储备受体可以测量，布莱克与莱夫的操作性模型（1983）给出现代的定量框架。怀斯曼（Thomas Wiseman）与同事 1989 年报道的仪器与分析方法使等温滴定量热法对生物分子变得实用；科普兰、波姆普里亚诺（David Pompliano）与米克（Thomas Meek）2006 年的文章使药物-靶点驻留时间成为药物发现的标准概念。
:::

## 后续内容

自由能[[#eq-dg]]是之后每一章设计时优化的那个量。[[medicinal-chemistry/hits-and-leads]]把它除以分子大小定义配体效率；[[medicinal-chemistry/structure-activity]]研究它随结构如何变化，包括与亲脂性的定量关系；[[medicinal-chemistry/structure-based-design]]则试图用打分函数与自由能微扰从三维结构把它算出来。本章决定占据与效应的游离药物浓度，由吸收、分布与清除产生——即[[medicinal-chemistry/pharmacokinetics]]的主题。物理背景：平衡的热力学在[[thermodynamics/reaction-equilibrium]]，熵各项（平动与转动自由）的统计本源在[[statistical-thermodynamics]]。

::: summary
- $\Delta_\mathrm{b}G^\circ = RT\ln(K_\mathrm{d}/c^\circ) = -5.71\,\mathrm{p}K_\mathrm{d}\ \mathrm{kJ\,mol^{-1}}$（$298\ \mathrm{K}$）；全部药物效价大约落在 $-17$ 到 $-70\ \mathrm{kJ\,mol^{-1}}$ 之间，ITC 能把焓与熵分开，而两者常相互补偿。
- 水中的结合是用与蛋白质的相互作用换取与水的相互作用；氢键与盐桥的净贡献很小，色散接触与埋藏的非极性表面（疏水效应，每个 $\mathrm{CH_2}$ 约 $3\ \mathrm{kJ\,mol^{-1}}$）则可靠；去溶剂化与失去的构象熵阻碍结合。
- 安德鲁斯式的基团加和方案是经验基线，不是预言。
- $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on}$；趋近平衡有 $k_\mathrm{obs} = k_\mathrm{on}[\mathrm{L}] + k_\mathrm{off}$，而驻留时间 $1/k_\mathrm{off}$ 可以决定作用持续时间。
- 对化学手性的口袋，两个对映体是不同的配体；优比可换算为自由能差，而体内的消旋化能使单一对映体的开发落空。
- 效能与亲和力不同：在操作性模型中 $E_\mathrm{max} = \tau E_\mathrm{m}/(1 + \tau)$、$\mathrm{EC_{50}} = K_\mathrm{A}/(1 + \tau)$，激动剂是完全还是部分的取决于组织。
- 竞争性拮抗剂以剂量比 $r = 1 + [\mathrm{B}]/K_\mathrm{B}$ 平移剂量-效应曲线；斜率为 1 的 Schild 图给出与组织无关的 $\mathrm{p}A_2 = -\log K_\mathrm{B}$。
:::

## 习题

::: exercise 由 Kd 求结合自由能 {level=1 check="-43.4"}
某抑制剂在 $298.15\ \mathrm{K}$ 下以 $K_\mathrm{d} = 25\ \mathrm{nmol\,dm^{-3}}$ 结合其酶。计算 $\Delta_\mathrm{b}G^\circ$。（$\Delta_\mathrm{b}G^\circ$ 以 $\mathrm{kJ\,mol^{-1}}$ 输入，保留三位有效数字。）
::: solution
$\Delta_\mathrm{b}G^\circ = RT\ln(K_\mathrm{d}/c^\circ) = (8.314)(298.15)\ln(2.5\times10^{-8})\ \mathrm{J\,mol^{-1}} = -43.4\ \mathrm{kJ\,mol^{-1}}$。等价地，$\mathrm{p}K_\mathrm{d} = 7.60$，$-5.71 \times 7.60 = -43.4$。
:::
:::

::: exercise 由速率常数求 Kd {level=1 check="2"}
某配体以 $k_\mathrm{on} = 5.0\times10^{5}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 结合、以 $k_\mathrm{off} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ 解离。$K_\mathrm{d}$ 是多少？驻留时间呢？（$K_\mathrm{d}$ 以 $\mathrm{nmol\,dm^{-3}}$ 输入。）
::: solution
$K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = (1.0\times10^{-3})/(5.0\times10^{5}) = 2.0\times10^{-9}\ \mathrm{mol\,dm^{-3}} = 2.0\ \mathrm{nmol\,dm^{-3}}$。驻留时间为 $1/k_\mathrm{off} = 1000\ \mathrm{s}$，约 17 分钟。
:::
:::

::: exercise 由单一剂量比求 pA₂ {level=1 check="9"}
在 $10\ \mathrm{nmol\,dm^{-3}}$ 下，竞争性拮抗剂使激动剂的剂量-效应曲线移动，剂量比为 11。求 $K_\mathrm{B}$ 与 $\mathrm{p}A_2$。（输入 $\mathrm{p}A_2$。）
::: solution
由[[#eq-schild]]，$K_\mathrm{B} = [\mathrm{B}]/(r - 1) = 10/10 = 1.0\ \mathrm{nmol\,dm^{-3}}$，故 $\mathrm{p}A_2 = -\log(1.0\times10^{-9}) = 9.0$。只有在拮抗确为竞争性时，单一剂量比才能给出 $K_\mathrm{B}$；要确立这一点，需要几个浓度和斜率为 1 的 Schild 图。
:::
:::

::: exercise 一个甲基值多少？ {level=2 check="3.4"}
填入一个小的疏水口袋而增加的一个甲基，使某抑制剂在 $298.15\ \mathrm{K}$ 下的结合自由能改善 $3.0\ \mathrm{kJ\,mol^{-1}}$。$K_\mathrm{d}$ 下降多少倍？若要提高十倍，需要多大的 $\Delta_\mathrm{b}G^\circ$ 改善？（倍数保留两位有效数字。）
::: solution
倍数为 $\exp(\Delta\Delta G/RT) = \exp(3000/(8.314 \times 298.15)) = \exp(1.210) = 3.4$。提高十倍需要 $RT\ln 10 = 5.7\ \mathrm{kJ\,mol^{-1}}$。单个甲基带来十倍甚至更多的改进（“魔术甲基”效应）确有发生，但通常是因为甲基同时改变了配体的偏好构象，或置换了一处位置不利的水分子——而不单是疏水效应。
:::
:::

::: exercise 完全激动还是部分激动？ {level=2 check="0.8"}
某激动剂在某一组织中 $K_\mathrm{A} = 50\ \mathrm{nmol\,dm^{-3}}$，换能比 $\tau = 4$。求 $E_\mathrm{max}/E_\mathrm{m}$ 与 $\mathrm{EC_{50}}$。若一半受体被不可逆灭活，新值是多少？（输入原来的 $E_\mathrm{max}/E_\mathrm{m}$。）
::: solution
由[[#eq-operational]]，$E_\mathrm{max}/E_\mathrm{m} = 4/5 = 0.80$，$\mathrm{EC_{50}} = 50/5 = 10\ \mathrm{nmol\,dm^{-3}}$。$[\mathrm{R}]_0$ 减半使 $\tau$ 减半为 2：$E_\mathrm{max}/E_\mathrm{m} = 2/3 = 0.67$，$\mathrm{EC_{50}} = 50/3 = 17\ \mathrm{nmol\,dm^{-3}}$。曲线右移且最大值下降，而 $K_\mathrm{A}$——分子本身的性质——保持不变。
:::
:::

::: exercise 由结合曲线测定 kon 和 koff {level=2 check="1000000"}
在一次结合动理学试验中，$[\mathrm{L}] = 10\ \mathrm{nmol\,dm^{-3}}$ 时测得结合的观察速率常数为 $0.011\ \mathrm{s^{-1}}$，$50\ \mathrm{nmol\,dm^{-3}}$ 时为 $0.051\ \mathrm{s^{-1}}$。求 $k_\mathrm{on}$、$k_\mathrm{off}$ 与 $K_\mathrm{d}$。（$k_\mathrm{on}$ 以 $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$ 输入。）
::: solution
由[[#eq-kobs-bind]]，$k_\mathrm{obs}$ 对 $[\mathrm{L}]$ 线性，斜率为 $k_\mathrm{on}$，截距为 $k_\mathrm{off}$。斜率：$(0.051 - 0.011)/(40\times10^{-9}) = 1.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$。截距：$0.011 - (1.0\times10^{6})(1.0\times10^{-8}) = 1.0\times10^{-3}\ \mathrm{s^{-1}}$。于是 $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$。截距是两个相近数之差，所以 $k_\mathrm{off}$ 最好由解离实验直接测定。
:::
:::

::: exercise 配体耗竭 {level=3 check="0.73"}
某结合试验含 $10\ \mathrm{nmol\,dm^{-3}}$ 的受体位点与 $10\ \mathrm{nmol\,dm^{-3}}$ 的 $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$ 的配体。(a) 证明复合物浓度 $x$ 满足 $x^2 - ([\mathrm{R}]_0 + [\mathrm{L}]_0 + K_\mathrm{d})x + [\mathrm{R}]_0[\mathrm{L}]_0 = 0$。(b) 求分数占据，并与错误地用配体总浓度代入[[medicinal-chemistry/drug-targets#eq-occupancy]]所得的值比较。（真正的占据保留两位有效数字。）
::: hint
在 $K_\mathrm{d} = [\mathrm{R}][\mathrm{L}]/x$ 中写 $[\mathrm{R}] = [\mathrm{R}]_0 - x$、$[\mathrm{L}] = [\mathrm{L}]_0 - x$；取较小的根。
:::
::: solution
(a) $K_\mathrm{d}x = ([\mathrm{R}]_0 - x)([\mathrm{L}]_0 - x) = [\mathrm{R}]_0[\mathrm{L}]_0 - ([\mathrm{R}]_0 + [\mathrm{L}]_0)x + x^2$，重排即得上面的二次方程。

(b) 浓度以 $\mathrm{nmol\,dm^{-3}}$ 计：$x^2 - 21x + 100 = 0$，故 $x = (21 - \sqrt{441 - 400})/2 = (21 - 6.403)/2 = 7.30$。（另一个根 13.7 超过两者总量。）占据为 $7.30/10 = 0.73$，游离配体只有 $2.70\ \mathrm{nmol\,dm^{-3}}$。用想当然的公式得 $10/(10 + 1) = 0.91$。当受体与配体浓度彼此相当且都远高于 $K_\mathrm{d}$ 时，结合会耗尽配体，简单双曲线会高估占据——这就是“紧密结合”区，其中低于受体浓度的 $K_\mathrm{d}$ 无法可靠测量。
:::
:::

::: exercise 热力学特征 {level=3}
两种抑制剂在 $298\ \mathrm{K}$ 下以同样的 $K_\mathrm{d} = 1.0\ \mathrm{nmol\,dm^{-3}}$ 结合同一种酶。对 A，ITC 给出 $\Delta_\mathrm{b}H^\circ = -70\ \mathrm{kJ\,mol^{-1}}$；对 B，$\Delta_\mathrm{b}H^\circ = -15\ \mathrm{kJ\,mol^{-1}}$。(a) 分别计算 $-T\Delta_\mathrm{b}S^\circ$。(b) 设想各自的结合以哪类相互作用为主；若附近一个残基发生使某处极性接触略微错位的突变，预计哪种化合物的亲和力损失更多？(c) 解释为什么仅凭 A 的结合由焓驱动就断言 A 是“更好的分子”是错误的。
::: hint
$\Delta_\mathrm{b}G^\circ$ 对两者相同，约 $-51\ \mathrm{kJ\,mol^{-1}}$。
:::
::: solution
(a) 两者都是 $\Delta_\mathrm{b}G^\circ = RT\ln(10^{-9}) = -51.4\ \mathrm{kJ\,mol^{-1}}$。A：$-T\Delta S = -51.4 + 70 = +18.6\ \mathrm{kJ\,mol^{-1}}$（熵阻碍结合）。B：$-T\Delta S = -51.4 + 15 = -36.4\ \mathrm{kJ\,mol^{-1}}$（熵驱动结合）。

(b) A 主要经由具体的、有方向的极性相互作用与紧密的范德华堆积结合，为刚性付出熵的代价。B 主要经由疏水效应（非极性表面释放有序水）结合，较强的极性接触相对较少。A 的亲和力依赖严格的氢键几何，对使极性接触错位的突变更敏感；病毒酶的耐药突变正是这种扰动的一个例子。

(c) 亲和力只由 $\Delta G$ 决定，两者的亲和力相等。人们常说焓驱动的分子选择性更好、也更容易优化，因为疏水结合往往伴随高亲脂性（及其药代动力学与安全性的害处）；这是有用的启发式而非定律；何况焓-熵补偿、两项对缓冲液质子化变化的依赖、以及弱结合剂 $\Delta H$ 的巨大不确定度，都使单独的 ITC 特征难以解读。
:::
:::
