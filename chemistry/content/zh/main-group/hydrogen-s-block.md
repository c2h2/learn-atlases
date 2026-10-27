氢与s区金属是元素周期表中最简单的化学，正因如此，它们是观察前四章工具箱实际运作的最佳场所。氢有一个电子而没有原子实；锂到铯在稀有气体原子实之外有一个价电子，铍到钡有两个。这里没有需要安放的孤对电子，没有需要争论的重键，氧化态也几乎没有选择余地。使这些元素彼此区别开来的一切——为什么锂是水中还原性最强的金属，却与水反应得最温和；为什么钾燃烧生成超氧化物，而锂只生成普通氧化物；为什么硫酸钡难溶到可以作为X射线造影剂吞服，而硫酸镁却是一种泻盐；为什么钠溶于液氨会生成含自由电子的蓝色溶液——都源于尺寸、电离能、晶格能与水合能。本章推导这些事实，而不是罗列它们。所用的周期性物理量来自[[main-group/periodic-trends]]；晶格能的计算工具来自[[bonding-structure/ionic-bonding]]。

## 氢：没有族的元素

氢哪里都放不下，又哪里都放得下。它的$1s^1$电子排布使它位于锂之上；它只差一个电子就能填满电子层，这又使它位于氟之上；它的电负性$\chi = 2.20$使它处于硼（$2.04$）与碳（$2.55$）之间。它的电离能$1312\ \mathrm{kJ\,mol^{-1}}$更接近氯（$1251$）而非锂（$520$），这就是为什么“$\mathrm{H^+}$”在凝聚相中从不作为自由离子存在：直径$10^{-15}\ \mathrm{m}$的裸质子总是附着在一对孤对电子上——在水中是$\mathrm{H_3O^+}$，在氨中是$\mathrm{NH_4^+}$。单质本身是$\mathrm{H_2}$分子，其键既短（$74\ \mathrm{pm}$）又强（$436\ \mathrm{kJ\,mol^{-1}}$）。这个键焓是氢化学的第一个事实：$\mathrm{H_2}$在热力学上是良好的还原剂，在动力学上却很懒惰，它几乎所有的工业反应都需要一种能在金属表面断开$\mathrm{H{-}H}$键的催化剂。

氢有三种各有专名的同位素：氕$^1\mathrm{H}$、氘$^2\mathrm{H} = \mathrm{D}$（约占天然氢的$0.016\ \%$，大约每6400个原子中有一个）以及放射性的氚$^3\mathrm{H} = \mathrm{T}$（$\beta^-$发射体，半衰期$12.3$年）。由于质量相差两倍和三倍——这是所有元素中最大的相对差别——氢的同位素表现出可测量的化学差异，而这些差异是我们所拥有的最有用的机理探针之一。

::: proposition 一级动力学同位素效应 {#prop-kie}
如果与氢相连的键在决速步中断裂，并且其伸缩振动的零点能在过渡态中失去，而其他一切不变，那么在温度$T$下H化合物与D化合物的速率常数之比为
$$
\frac{k_\mathrm{H}}{k_\mathrm{D}} = \exp\!\left(\frac{hc\,(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})}{2k_\mathrm{B}T}\right), \qquad \tilde\nu_\mathrm{D} = \tilde\nu_\mathrm{H}\sqrt{\mu_\mathrm{H}/\mu_\mathrm{D}},
$$
其中$\tilde\nu$是伸缩振动波数，$\mu$是$\mathrm{X{-}H}$与$\mathrm{X{-}D}$振子的约化质量。适用条件是半经典模型的条件：忽略隧穿、弯曲振动以及过渡态中残留的任何零点能。
:::

::: proof 零点能是一种领先优势
谐振子的零点能为$\tfrac12 hc\tilde\nu$，且$\tilde\nu \propto \sqrt{k/\mu}$，其中力常数$k$由电子结构决定——在玻恩-奥本海默近似下，$\mathrm{C{-}H}$与$\mathrm{C{-}D}$的力常数相同。因此$\tilde\nu_\mathrm{D}/\tilde\nu_\mathrm{H} = \sqrt{\mu_\mathrm{H}/\mu_\mathrm{D}}$。两种同位素的势能面完全相同，不同的只是起始能级。$\mathrm{X{-}H}$分子在势阱中的位置高出$\Delta E_0 = \tfrac12 hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$，所以如果该伸缩振动成为反应坐标（因而在过渡态中不贡献零点能），H化合物的活化能就小$\Delta E_0$。若指前因子相等，阿伦尼乌斯方程给出$k_\mathrm{H}/k_\mathrm{D} = \exp(\Delta E_0/k_\mathrm{B}T)$，这就是上述结果。把同样的零点能差应用于平衡而不是能垒，就解释了为什么$\mathrm{p}K_\mathrm{w}(\mathrm{D_2O})$大于$\mathrm{p}K_\mathrm{w}(\mathrm{H_2O})$，即[[main-group/inorganic-acids-bases#ex-pd]]中演算的例题。
:::

::: example C–H同位素效应有多大 {#ex-kie-ch}
某$\mathrm{C{-}H}$伸缩振动吸收于$2900\ \mathrm{cm^{-1}}$。估计$\mathrm{C{-}D}$的波数，以及$298\ \mathrm{K}$和$373\ \mathrm{K}$下的最大一级同位素效应$k_\mathrm{H}/k_\mathrm{D}$。（$hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$；原子质量$12.000$、$1.008$、$2.014$。）
::: solution
约化质量：$\mu_\mathrm{CH} = (12.000)(1.008)/13.008 = 0.9299$，$\mu_\mathrm{CD} = (12.000)(2.014)/14.014 = 1.7246$（原子质量单位）。于是$\sqrt{0.9299/1.7246} = 0.7343$，$\tilde\nu_\mathrm{D} = 0.7343 \times 2900 = 2129\ \mathrm{cm^{-1}}$——比粗略的“质量加倍”估计$2900/\sqrt2 = 2051\ \mathrm{cm^{-1}}$略大，因为碳原子也在运动。$298\ \mathrm{K}$下的指数为
$$
\frac{1.4388\ \mathrm{cm\,K} \times (2900 - 2129)\ \mathrm{cm^{-1}}}{2 \times 298.15\ \mathrm{K}} = 1.860, \qquad \frac{k_\mathrm{H}}{k_\mathrm{D}} = e^{1.860} = 6.4,
$$
而在$373\ \mathrm{K}$下，同样的分子除以$746.3\ \mathrm{K}$，得到$e^{1.486} = 4.4$。零点能差为$4.6\ \mathrm{kJ\,mol^{-1}}$，所以该效应随$T$升高而减小。室温下观测到的一级效应在2到7之间，意味着慢步骤中有$\mathrm{C{-}H}$键断裂；值为1.0–1.4则意味着没有；远大于7的值指向隧穿，而模型忽略了隧穿。正是这一个指数式，使氘标记成为[[organic-synthesis/mechanism-determination]]和[[kinetics/reaction-mechanisms]]中的常规工具。
:::
:::

下图让你改变伸缩振动波数。伙伴原子越重、键越硬，效应越大；$\mathrm{O{-}H}$键（$3600\ \mathrm{cm^{-1}}$）的效应比$\mathrm{C{-}H}$的大，而两者在高温下都趋于1。

::: widget plot
f: exp(1.4388*0.2657*nu/(2*x))
x: 200, 800
y: 0, 20
sliders: nu=1000:100:3800
labels: k_\mathrm{H}/k_\mathrm{D}
hlines: 1
caption: 半经典最大一级动力学同位素效应$k_\mathrm{H}/k_\mathrm{D} = \exp[hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})/2k_\mathrm{B}T]$随温度$x$（单位K）的变化，取$\tilde\nu_\mathrm{D} = 0.7343\,\tilde\nu_\mathrm{H}$（$\mathrm{C{-}H}$/$\mathrm{C{-}D}$的约化质量比），因此指数为$1.4388 \times 0.2657\,\tilde\nu_\mathrm{H}/2T$。滑块设定$\tilde\nu_\mathrm{H}$（单位$\mathrm{cm^{-1}}$）：$2900$在$298\ \mathrm{K}$下给出$6.4$。低温下的硬键、高频键效应最大；当$T \to \infty$、零点能相对于$k_\mathrm{B}T$可以忽略时，效应趋于1。
:::

### 氢化物

氢几乎与每一种元素化合，其二元化合物按照伙伴元素的电负性自行分类。

::: definition 二元氢化物的三种类型 {#def-hydrides}
- **类盐（离子型）氢化物**由正电性最强的金属——碱金属以及钙、锶和钡——形成：$\mathrm{LiH}$、$\mathrm{NaH}$、$\mathrm{CaH_2}$。它们是含有**氢负离子**$\mathrm{H^-}$的高熔点固体（NaH具有岩盐结构），是强碱和还原剂：$\mathrm{H^- + H_2O \rightarrow H_2 + OH^-}$。
- **分子型（共价型）氢化物**由p区元素形成：$\mathrm{B_2H_6}$、$\mathrm{CH_4}$、$\mathrm{NH_3}$、$\mathrm{H_2O}$、$\mathrm{HF}$、$\mathrm{SiH_4}$、$\mathrm{H_2S}$。它们按电子数再分为**缺电子型**（第13族，电子数不足以形成二中心键：硼烷）、**电子准确型**（第14族，每对电子都成键）和**富电子型**（第15–17族，中心原子上有孤对电子）。
- **金属型（间隙型）氢化物**由许多d区和f区金属形成：$\mathrm{PdH}_x$、$\mathrm{TiH_2}$、$\mathrm{LaNi_5H_6}$。氢占据金属晶格中的间隙，常常是非化学计量的，这些材料仍然是金属导体。

铍和镁的氢化物介于类盐型与分子型之间：$\mathrm{BeH_2}$是带有$\mathrm{Be{-}H{-}Be}$三中心桥键的聚合物，$\mathrm{MgH_2}$主要是离子型的，但有相当的共价性。
:::

氢上电荷的符号取决于电负性：当它与电负性比自己小的任何原子（碱金属、硼、铝、硅）相连时，它是**负氢性**的（$\mathrm{H^{\delta-}}$）；当它与氮、氧或卤素相连时，它是**质子性**的（$\mathrm{H^{\delta+}}$）。仅凭这一个比较就能预测哪些氢化物与水反应放出$\mathrm{H_2}$（负氢性的那些：$\mathrm{H^{\delta-}}$遇上水的$\mathrm{H^{\delta+}}$），哪些是布朗斯特酸（质子性的那些）。碳的电负性为$2.55$，氢为$2.20$，形成几乎无极性的$\mathrm{C{-}H}$键，这是烃类如此不活泼的部分原因。质子性氢化物所形成的强氢键——以及它们在$\mathrm{NH_3}$、$\mathrm{H_2O}$和$\mathrm{HF}$沸点反常中的作用——在[[bonding-structure/intermolecular-forces]]中讨论。

::: example 氢化钙作干燥剂 {#ex-cah2}
实验室中用氢化钙干燥二氯甲烷和胺类等溶剂。写出它与水的反应，解释为什么它适用于胺而不适用于醇或羧酸，并说明必须控制的危害。
::: solution
氢负离子是负氢性的，水是质子性的，所以两者结合成氢气：
$$
\mathrm{CaH_2(s)} + 2\,\mathrm{H_2O(l)} \rightarrow \mathrm{Ca(OH)_2(s)} + 2\,\mathrm{H_2(g)}.
$$
反应不可逆（氢气逸出），产物是不溶性固体，因此溶剂可以直接蒸馏出来。$\mathrm{H^-}$是很强的碱（$\mathrm{H_2}$的$\mathrm{p}K_\mathrm{a}$约为35），所以它会使存在的任何$\mathrm{O{-}H}$酸去质子化：醇（$\mathrm{p}K_\mathrm{a} \approx 16$）或羧酸会被消耗，而不是被干燥。叔胺没有酸性质子，伯胺的$\mathrm{N{-}H}$（$\mathrm{p}K_\mathrm{a} \approx 35$或更高）与该固体反应非常缓慢，因此胺被干燥而不被破坏。危害来自氢气本身：它极易燃，所以干燥应在通风橱中、惰性气氛下进行，容器要通气并远离火源，用过的氢化物要在监督下缓慢销毁。类盐型氢化物被归类为遇水放出易燃气体的物质（GHS02，火焰象形图）。
:::
:::

### 氢的制备

每年生产约一亿吨氢，大部分用于氨的合成和石油炼制，截至2026年，绝大部分仍来自化石燃料。主要途径是在镍催化剂上于约$800\ \mathrm{^\circ C}$进行的甲烷**水蒸气重整**，随后在较低温度下进行**水煤气变换**：
$$
\mathrm{CH_4(g) + H_2O(g) \rightleftharpoons CO(g) + 3\,H_2(g)}\quad \Delta_\mathrm{r}H^\circ = +206\ \mathrm{kJ\,mol^{-1}},
$$
$$
\mathrm{CO(g) + H_2O(g) \rightleftharpoons CO_2(g) + H_2(g)}\quad \Delta_\mathrm{r}H^\circ = -41\ \mathrm{kJ\,mol^{-1}}.
$$
重整反应吸热，且由两摩尔气体生成四摩尔，所以勒夏特列原理要求高温和低压；变换反应放热且气体物质的量不变，因此在较低温度下进行，此时其平衡更偏右。每摩尔甲烷最终都变成一摩尔$\mathrm{CO_2}$，这就是为什么“低碳”氢要么需要捕集这些$\mathrm{CO_2}$，要么需要另一种来源：**电解水**，$\mathrm{2\,H_2O(l) \rightarrow 2\,H_2(g) + O_2(g)}$，热力学上至少需要$1.23\ \mathrm{V}$，实际中由于[[electrochemistry/fuel-cells-electrolysis]]中讨论的超电势，需要约$1.8$–$2\ \mathrm{V}$。这些途径的经济性是[[green-chemistry/carbon-hydrogen]]的主题。

## 碱金属

锂、钠、钾、铷和铯（钫的放射性太强，无法积累）是柔软、低熔点、高度活泼的金属，各自在稀有气体原子实之外有一个$ns$电子。它们的化学几乎完全是$\mathrm{M^+}$离子的化学，重要的性质沿族向下平滑变化：

| | Li | Na | K | Rb | Cs |
|---|---|---|---|---|---|
| $IE_1$ / $\mathrm{kJ\,mol^{-1}}$ | 520 | 496 | 419 | 403 | 376 |
| $r(\mathrm{M^+})$ / pm（六配位） | 76 | 102 | 138 | 152 | 167 |
| 熔点 / °C | 180.5 | 97.8 | 63.5 | 39.3 | 28.5 |
| $E^\circ(\mathrm{M^+/M})$ / V | $-3.04$ | $-2.71$ | $-2.93$ | $-2.98$ | $-3.03$ |
| 焰色 | 深红 | 黄 | 淡紫 | 红紫 | 蓝紫 |

熔点下降是因为每个原子的一个电子分布在越来越大的原子上，金属键随之减弱（[[bonding-structure/metallic-bonding]]）；铯在温暖的手中就会熔化。焰色是原子发射谱线：原子在火焰中被激发后跃迁回低能级，发出特征波长的光——钠的D线在$589.0$和$589.6\ \mathrm{nm}$，锂线在$670.8\ \mathrm{nm}$，钾的双线在$766.5$和$769.9\ \mathrm{nm}$（几乎不可见，因此呈淡紫色，最好透过能吸收钠黄光的蓝色钴玻璃观察）。铷和铯正是以这种方式被发现的——作为分光镜中的新谱线——并以谱线颜色命名（拉丁文*rubidus*，深红；*caesius*，天蓝）。火焰光度法和原子发射法是它们在分析化学中的后代，见[[analytical-chemistry/atomic-spectrometry]]。

唯一不平滑的一行是标准电势：电势最负的是锂，而不是铯。这个反常值得仔细看一看。

::: example 为什么锂是水中最强的还原剂 {#ex-li-potential}
利用下表数据（标准数据表，$298\ \mathrm{K}$；$\mathrm{kJ\,mol^{-1}}$），解释为什么尽管锂的电离能较大，$E^\circ(\mathrm{Li^+/Li})$仍比$E^\circ(\mathrm{Na^+/Na})$更负。

| | $\Delta_\mathrm{at}H^\circ$（金属 → 气体） | $IE_1$ | $\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq})$ | $\Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})$ |
|---|---|---|---|---|
| Li | 159.3 | 520.2 | $-278.5$ | $-293.3$ |
| Na | 107.5 | 495.8 | $-240.1$ | $-261.9$ |
::: solution
**电势。** 相对于标准氢电极，$\mathrm{M^+(aq)} + \tfrac12\,\mathrm{H_2(g)} \rightarrow \mathrm{M(s)} + \mathrm{H^+(aq)}$的$\Delta_\mathrm{r}G^\circ = -\Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})$（按惯例$\mathrm{H^+(aq)}$取为零），所以$E^\circ = \Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})/F$：锂为$-293\,300/96\,485 = -3.04\ \mathrm{V}$，钠为$-261\,900/96\,485 = -2.71\ \mathrm{V}$，即表列值。

**循环。** 构建$\mathrm{M(s)} \rightarrow \mathrm{M(g)} \rightarrow \mathrm{M^+(g)} \rightarrow \mathrm{M^+(aq)}$。盖斯定律给出$\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq}) = \Delta_\mathrm{at}H^\circ + IE_1 + \Delta_\mathrm{hyd}H^\circ(\mathrm{M^+})$，其中电子交给了惯例中的质子（这是一个常数，比较两种金属时会消去）。用锂减去钠：
$$
\underbrace{-38.4}_{\Delta\Delta_\mathrm{f}H^\circ} = \underbrace{+51.8}_{\Delta\Delta_\mathrm{at}H^\circ} + \underbrace{+24.4}_{\Delta IE_1} + \Delta\Delta_\mathrm{hyd}H^\circ \quad\Rightarrow\quad \Delta\Delta_\mathrm{hyd}H^\circ = -114.6\ \mathrm{kJ\,mol^{-1}}.
$$
锂在前两步都吃亏——它的金属键更强，电子更难移去，合计$76\ \mathrm{kJ\,mol^{-1}}$——但它的小离子的水合比$\mathrm{Na^+}$放热多约$115\ \mathrm{kJ\,mol^{-1}}$，绰绰有余地偿还了这笔债。（绝对水合焓数据表给出约$-519$和$-404\ \mathrm{kJ\,mol^{-1}}$，差值相同。）焓的差额$38\ \mathrm{kJ\,mol^{-1}}$相当于$0.40\ \mathrm{V}$；自由能的差额$31\ \mathrm{kJ\,mol^{-1}}$就是观测到的$0.33\ \mathrm{V}$，因为小离子的水合还会使更多的水有序化，付出更多的熵。标准电势是关于**水合离子**的陈述，而在水中小离子占优。
:::
:::

::: warning 热力学不等于剧烈程度 {#warn-li-vigour}
锂是本族中电势最负的，但一块锂放入水中只是平稳地冒泡，而钾会点燃它放出的氢气，铯则会爆炸。这并不矛盾：$E^\circ$衡量的是反应能进行到什么程度，而不是多快。锂在$180\ \mathrm{^\circ C}$才熔化，所以它的表面保持为固体且面积小，其较高的原子化能和电离能也使电子转移步骤变慢；钠（$97.8\ \mathrm{^\circ C}$）在反应热中熔成一颗四处滑动的液珠，其新鲜表面反应越来越快；钾、铷和铯更容易熔化，反应更快。这五种金属都被归类为遇水放出易燃气体的物质（GHS02）和腐蚀性物质（其氢氧化物会造成严重灼伤）；它们保存在油中或惰性气体中，只以演示用量在安全屏后用镊子操作，绝不能投入水槽或废溶剂桶。
:::

### 氧化物、过氧化物和超氧化物

在过量空气中燃烧时，碱金属生成的化合物并不都是同一类。锂生成**氧化物**$\mathrm{Li_2O}$；钠主要生成**过氧化物**$\mathrm{Na_2O_2}$（含$\mathrm{O_2^{2-}}$，$\mathrm{O{-}O}$键级为1）；钾、铷和铯生成**超氧化物**$\mathrm{MO_2}$（含顺磁性的$\mathrm{O_2^-}$，键级为$1\tfrac12$）。这些键级由[[bonding-structure/molecular-orbitals]]中的$\mathrm{O_2}$分子轨道图在$\pi^*$能级上加入一个或两个电子得到。这一规律是晶格能效应，也是一条将贯穿本章其余部分的原理最清楚的实例。

::: proposition 离子晶格的尺寸匹配原理 {#prop-size-matching}
在一系列具有共同阴离子的盐中，晶格相对于某种分解产物或溶解产物的稳定性取决于晶格能如何随阳离子半径变化。由于晶格能按$1/(r_+ + r_-)$变化（卡普斯钦斯基形式），而水合能大致按$1/r_+ + 1/r_-$变化：

(i) **大阴离子**（过氧根、超氧根、碳酸根、硫酸根、三碘离子）相对于它可能分解成的较小阴离子，**被大阳离子稳定得最多**：含氧阴离子盐的热稳定性在第1族和第2族中自上而下增大；

(ii) **阳离子与阴离子尺寸相近时**（大–大或小–小），盐的**溶解度最小**；尺寸严重失配时溶解度最大。

这些是电荷类型固定的同类离子固体中的规律，而不是定量预测；当共价性（Li、Be）或结构变化介入时，它们会失效。
:::

::: proof 卡普斯钦斯基论证
取卡普斯钦斯基方程$\Delta_\mathrm{latt}H \approx K\,\nu |z_+z_-|/(r_+ + r_-)$，其中$K \approx 1.07\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$，$\nu$为每个化学式单位中的离子数（略去其小的修正项）。(i) 考虑$\mathrm{MCO_3(s)} \rightarrow \mathrm{MO(s)} + \mathrm{CO_2(g)}$。循环中与晶格无关的部分——把$\mathrm{CO_3^{2-}}$拆成$\mathrm{O^{2-}}$和$\mathrm{CO_2}$——对每种金属都相同，因此$\Delta_\mathrm{r}H$中与金属有关的部分就是晶格能的**增益**，它正比于
$$
\frac{1}{r_+ + r(\mathrm{O^{2-}})} - \frac{1}{r_+ + r(\mathrm{CO_3^{2-}})}.
$$
取$r(\mathrm{O^{2-}}) = 140\ \mathrm{pm}$，碳酸根的热化学半径约为$178\ \mathrm{pm}$，则对$\mathrm{Mg^{2+}}$（$72\ \mathrm{pm}$）这个括号为$7.2\times10^{-4}\ \mathrm{pm^{-1}}$，而对$\mathrm{Ba^{2+}}$（$135\ \mathrm{pm}$）只有$4.4\times10^{-4}\ \mathrm{pm^{-1}}$。这个括号是两个“和的倒数”之差，随$r_+$增大而缩小，因为大阳离子冲淡了两种阴离子之间的差别。所以分解的驱动力对小阳离子最大：碳酸镁容易分解，碳酸钡则很难分解。用过氧根和超氧根代替碳酸根作同样的代数运算，就得出锂的产物是$\mathrm{Li_2O}$，而钾的$\mathrm{KO_2}$能够存在。(ii) 对于溶解，尺寸失配时晶格能$\propto 1/(r_+ + r_-)$由**较大**的离子主导，而水合能$\propto 1/r_+ + 1/r_-$由**较小**的离子主导。阴离子大时，改变阳离子几乎不影响晶格项，却大大改变水合项，因此溶解度随阳离子增大而下降；阴离子小时情形相反。这正是第2族中硫酸盐与氢氧化物溶解度相反趋势的由来。
:::

::: example 呼吸器中的超氧化物 {#ex-ko2}
自给式救生呼吸器曾使用超氧化钾，它吸收呼出的二氧化碳并放出氧气。写出配平的方程式，指出氧的氧化态，并计算每千克$\mathrm{KO_2}$（$M = 71.10\ \mathrm{g\,mol^{-1}}$）放出的$\mathrm{O_2}$体积（$298\ \mathrm{K}$，$1\ \mathrm{bar}$，$24.79\ \mathrm{dm^3\,mol^{-1}}$）。
::: solution
$$
4\,\mathrm{KO_2(s)} + 2\,\mathrm{CO_2(g)} \rightarrow 2\,\mathrm{K_2CO_3(s)} + 3\,\mathrm{O_2(g)}.
$$
在$\mathrm{O_2^-}$中每个氧的形式氧化态为$-\tfrac12$；在碳酸根中为$-2$，在氧气中为$0$。八个超氧根氧原子中，两个被还原到$-2$（各得$1\tfrac12$个电子，共$3$个），六个被氧化到$0$（各失$\tfrac12$个，共$3$个）：这是一个歧化反应，由非常稳定的碳酸盐晶格的形成所驱动。一千克为$1000/71.10 = 14.06\ \mathrm{mol}$的$\mathrm{KO_2}$，生成$\tfrac34 \times 14.06 = 10.55\ \mathrm{mol}$的$\mathrm{O_2}$，即$10.55 \times 24.79 = 262\ \mathrm{dm^3}$。该装置放出的氧气略多于它吸收的二氧化碳（每$2\ \mathrm{CO_2}$放出$3\ \mathrm{O_2}$），这适合人体呼吸，因为人的呼吸商小于1。超氧化物是强氧化剂（GHS03），与水和有机物剧烈反应；须密封保存并远离可燃物。
:::
:::

### 碱金属的液氨溶液

液氨（沸点$-33\ \mathrm{^\circ C}$）能溶解碱金属而不与之快速反应，所得溶液是化学中最奇特的溶液之一。无论是哪种金属，稀溶液都呈深蓝色；它们导电性极好，并且是顺磁性的。浓度高于约$3\ \mathrm{mol\,dm^{-3}}$时，溶液变成青铜色并具有金属性。解释是金属在溶剂中电离，
$$
\mathrm{Na(s)} \xrightarrow{\ \mathrm{NH_3(l)}\ } \mathrm{Na^+(am)} + \mathrm{e^-(am)},
$$
而电子与阳离子一样被**溶剂化**：它占据定向排列的氨分子之间的一个空穴，氨分子的氢原子指向它。溶剂化电子在近红外区有一个宽吸收带，其尾部延伸到可见光谱的红端，因此透射光呈蓝色；它的未成对自旋产生顺磁性，它的高迁移率产生导电性。在浓溶液中，电子相互重叠形成能带，液体变成金属。

这些溶液是亚稳的。在过渡金属的催化下（痕量氧化铁即可），它们分解为氨基化物和氢气，
$$
\mathrm{2\,Na + 2\,NH_3 \rightarrow 2\,NaNH_2 + H_2},
$$
这是钠与水反应在氨中的类似物——即[[main-group/inorganic-acids-bases#def-autoionization]]中溶剂体系的对应关系，其中$\mathrm{NH_2^-}$是特征碱。无催化时，它们在$-33\ \mathrm{^\circ C}$下可保存数小时，这个时间窗口使它们成为强有力的合成还原剂：芳环的**伯奇还原**（[[organic-synthesis/redox-in-synthesis]]）就使用锂或钠的液氨溶液，并以醇作为质子源。

::: example 碱金属负离子化合物：作为阴离子的钠 {#ex-sodide}
用穴醚2.2.2（一种能把$\mathrm{Na^+}$离子完全包裹起来的笼状聚醚胺），钠形成一种金黄色的晶态固体$\mathrm{[Na(2.2.2\text{-}crypt)]^+Na^-}$，其中一半的钠以**钠负离子**$\mathrm{Na^-}$的形式存在。为什么$\mathrm{Na^-}$是合理的？为什么需要穴醚？
::: solution
钠的电子亲和能很小但为放热（释放$53\ \mathrm{kJ\,mol^{-1}}$）：$\mathrm{Na^-}$具有闭壳层的$3s^2$电子排布，在气相中它对失去多余电子是稳定的。在通常条件下这种阴离子从不能存留，因为任何$\mathrm{Na^-}$都会立即把电子交给阳离子，$\mathrm{Na^+ + Na^- \rightarrow 2\,Na}$（金属远比离子对稳定）。穴醚堵住了这条途径：它把$\mathrm{Na^+}$包裹得如此紧密，使配位后的阳离子无法被还原成金属；而且它很大，使所得盐的晶格能很小，从而减少了把电子还给它所获得的好处。逆反应被切断后，阴离子便能存留。它的存在（由戴（James Dye）的研究组于1974年首次报道）表明，一种元素的“显而易见”的氧化态是关于它通常伙伴的陈述，而不是关于元素本身的陈述。
:::
:::

## 碱土金属

铍、镁、钙、锶和钡（镭具有放射性）有两个价电子，形成$\mathrm{M^{2+}}$离子。较小离子上的双倍电荷使它们比第1族的邻居更硬、密度更大、熔点更高，而且它们有更多的化合物难溶——晶格能按$z_+z_-$标度，而水合能大致按$z^2/r$标度，对于二价阳离子，平衡更常偏向固体。

铍是印证[[main-group/periodic-trends#def-diagonal]]中各条规则的例外。$\mathrm{Be^{2+}}$离子（四配位时为$45\ \mathrm{pm}$）的电荷密度如此之高，以致它的化合物基本上是共价的：$\mathrm{BeCl_2}$是带桥连氯的链状聚合物，熔融的$\mathrm{BeCl_2}$几乎不导电，$\mathrm{Be(OH)_2}$是两性的，在强碱中溶解为$\mathrm{[Be(OH)_4]^{2-}}$，正如氢氧化铝生成$\mathrm{[Al(OH)_4]^-}$。在水中铍总是四配位的，即$\mathrm{[Be(H_2O)_4]^{2+}}$，具有明显的酸性。铍化合物吸入有毒，并被归类为致癌物（慢性铍病）；处理铍粉末或粉尘需要教学实验室所不具备的工程控制措施。

镁很轻，尽管其电势很负（$E^\circ = -2.37\ \mathrm{V}$），但由于有一层薄的氧化物–氢氧化物膜，它在空气和冷水中是稳定的；燃烧的镁不能用水或二氧化碳扑灭（它能还原两者）。对有机化学家而言，它最重要的化学是**格氏试剂**$\mathrm{RMgX}$，其中碳与正电性金属相连，表现得像碳负离子（[[organometallics-catalysis/main-group-organometallics]]）。在生物学中，$\mathrm{Mg^{2+}}$位于叶绿素的中心，并伴随着每一个ATP分子。

钙是石灰石、水泥和骨骼的金属。石灰循环
$$
\mathrm{CaCO_3} \xrightarrow{\ \text{加热}\ } \mathrm{CaO} + \mathrm{CO_2}, \qquad \mathrm{CaO} + \mathrm{H_2O} \rightarrow \mathrm{Ca(OH)_2}, \qquad \mathrm{Ca(OH)_2} + \mathrm{CO_2} \rightarrow \mathrm{CaCO_3} + \mathrm{H_2O},
$$
是石灰砂浆的基础，而平衡$\mathrm{CaCO_3(s) + CO_2(aq) + H_2O \rightleftharpoons Ca^{2+}(aq) + 2\,HCO_3^-(aq)}$既解释了石灰岩溶洞，也解释了水的“暂时硬度”——煮沸时它以水垢的形式被除去。

### 碳酸盐的分解

[[#prop-size-matching]]的第一部分作出了一个可以用普通热力学数据表检验的定量预测。

::: example 碳酸钙何时分解？ {#ex-caco3}
利用下列标准数据（CRC手册，$298\ \mathrm{K}$），把$\Delta_\mathrm{r}H^\circ$和$\Delta_\mathrm{r}S^\circ$视为与温度无关，求$\mathrm{CaCO_3(s) \rightarrow CaO(s) + CO_2(g)}$的$\Delta_\mathrm{r}H^\circ$、$\Delta_\mathrm{r}S^\circ$以及$\Delta_\mathrm{r}G^\circ = 0$时的温度。这个温度的物理意义是什么？

| | $\Delta_\mathrm{f}H^\circ$ / $\mathrm{kJ\,mol^{-1}}$ | $S^\circ$ / $\mathrm{J\,K^{-1}\,mol^{-1}}$ |
|---|---|---|
| $\mathrm{CaCO_3(s)}$（方解石） | $-1207.6$ | $91.7$ |
| $\mathrm{CaO(s)}$ | $-634.9$ | $38.1$ |
| $\mathrm{CO_2(g)}$ | $-393.5$ | $213.8$ |
::: solution
$$
\Delta_\mathrm{r}H^\circ = -634.9 - 393.5 - (-1207.6) = +179.2\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r}S^\circ = 38.1 + 213.8 - 91.7 = +160.2\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
$\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$在下述温度为零：
$$
T = \frac{179\,200\ \mathrm{J\,mol^{-1}}}{160.2\ \mathrm{J\,K^{-1}\,mol^{-1}}} = 1119\ \mathrm{K}\ (846\ \mathrm{^\circ C}).
$$
由于固体处于标准态，$K = p(\mathrm{CO_2})/p^\circ$，$\Delta_\mathrm{r}G^\circ = 0$意味着$K = 1$：在$1119\ \mathrm{K}$时，碳酸盐上方$\mathrm{CO_2}$的平衡压力达到$1\ \mathrm{bar}$，因此固体在大气压下的纯$\mathrm{CO_2}$气氛中分解。（实测温度约为$1170\ \mathrm{K}$；$50\ \mathrm{K}$的误差来自假设$\Delta_\mathrm{r}H^\circ$和$\Delta_\mathrm{r}S^\circ$不变。）在空气中，$p(\mathrm{CO_2})$只有约$4\times10^{-4}\ \mathrm{bar}$，分解在低得多的温度下就开始了——这就是石灰窑要把气体扫走的原因。对每一种碳酸盐，熵变几乎相同，因为它主要由放出的气体决定；金属是通过$\Delta_\mathrm{r}H^\circ$起作用的，正如卡普斯钦斯基论证所说。
:::
:::

::: widget plot
f: 100.7 - 0.1751*x; 179.2 - 0.1602*x; 234.6 - 0.1711*x; 271.5 - 0.1738*x
x: 300, 1800
y: -80, 260
hlines: 0
points: 575,0; 1119,0; 1371,0; 1562,0
labels: \mathrm{MgCO_3}; \mathrm{CaCO_3}; \mathrm{SrCO_3}; \mathrm{BaCO_3}
caption: $\mathrm{MCO_3(s) \rightarrow MO(s) + CO_2(g)}$的$\Delta_\mathrm{r}G^\circ$（单位$\mathrm{kJ\,mol^{-1}}$）随温度$x$（单位K）的变化，由298 K的$\Delta_\mathrm{r}H^\circ$和$\Delta_\mathrm{r}S^\circ$值得出（CRC手册数据；这些直线忽略了两者随温度的变化）。圆点标出每条线与零的交点——即$\mathrm{CO_2}$平衡压力达到1 bar之处：镁约为$575\ \mathrm{K}$，钙为$1119\ \mathrm{K}$，锶为$1371\ \mathrm{K}$，钡为$1562\ \mathrm{K}$。这些直线几乎平行（$\Delta_\mathrm{r}S^\circ$相近，由放出的气体决定），并随阳离子增大而向上平移：分解碳酸盐所需的焓沿族向下增大，正如尺寸匹配原理所预测的。
:::

### 第2族中的溶解度

该原理的第二部分解释了第2族硫酸盐与氢氧化物相反的溶解度趋势，这类事实常被死记而很少被理解。

| | Mg | Ca | Sr | Ba |
|---|---|---|---|---|
| $\mathrm{MSO_4}$的$K_\mathrm{sp}$ | 易溶 | $4.9\times10^{-5}$ | $3.4\times10^{-7}$ | $1.1\times10^{-10}$ |
| $\mathrm{M(OH)_2}$的$K_\mathrm{sp}$ | $5.6\times10^{-12}$ | $5.0\times10^{-6}$ | 易溶 | 易溶 |

硫酸根离子很大：从镁到钡，$\mathrm{MSO_4}$的晶格能几乎不变，而阳离子的水合能急剧下降，所以硫酸盐沿族向下变得**更难**溶。氢氧根很小：随着阳离子增大，$\mathrm{M(OH)_2}$的晶格能比阳离子水合能下降得更快，所以氢氧化物变得**更易**溶。硫酸钡的难溶性使它可以安全地用作X射线成像的“钡餐”，尽管可溶性钡盐有毒；氢氧化镁的难溶性使它成为一种温和的抗酸剂（“镁乳”）。（氢氧化锶和氢氧化钡被列为易溶，是因为它们的饱和溶液浓度超过约$0.05\ \mathrm{mol\,dm^{-3}}$，浓度太高，简单的$K_\mathrm{sp}$不能很好地描述。）溶度积的算术见[[general-chemistry-2/solubility-equilibria]]。

::: quiz
按照尺寸匹配原理，哪种化合物对失去$\mathrm{O_2}$或$\mathrm{CO_2}$的热稳定性最高？
- [ ] $\mathrm{MgCO_3}$
- [ ] $\mathrm{LiO_2}$
- [x] $\mathrm{CsO_2}$
- [ ] $\mathrm{Li_2CO_3}$
::: solution
大阴离子（超氧根或碳酸根）最能被大阳离子稳定，而分解为较小的$\mathrm{O^{2-}}$时，阳离子越小，获得的晶格能越多。铯是所给阳离子中最大的，所以$\mathrm{CsO_2}$是稳定的那个。超氧化锂在室温下不能作为块状固体分离出来，碳酸锂在强热下分解（与其他碱金属碳酸盐不同），碳酸镁在约$575\ \mathrm{K}$分解，原因都相同：一个小的、极化能力强的阳离子。
:::
:::

## s区元素的制备与应用

提取化学由电势决定。$E^\circ$接近$-3\ \mathrm{V}$，在常温下没有比金属本身更便宜的化学还原剂能从盐中制得钠或钾，而在任何水溶液阴极上，水都会远在金属离子之前被还原。因此这些金属用**熔盐电解**制备，这是戴维开创的途径：钠在**唐斯电解槽**中由熔融$\mathrm{NaCl}$制得，加入氯化钙使熔点从$801\ \mathrm{^\circ C}$降到约$600\ \mathrm{^\circ C}$；锂同样由$\mathrm{LiCl{-}KCl}$熔体制得。镁既用电解法也用热还原法生产（皮江法在高温真空下用硅铁还原煅烧白云石，这是[[main-group/inorganic-redox#prop-ellingham-reading]]中的埃林厄姆权衡，其中镁蒸气的移出推动了平衡）。钾是用钠蒸气还原熔融$\mathrm{KCl}$制得的，这个表面上逆势的反应之所以能进行，是因为把更易挥发的钾蒸馏出去了。

化合物的生产规模远大于金属。盐水的**氯碱电解**，$\mathrm{2\,NaCl + 2\,H_2O \rightarrow 2\,NaOH + Cl_2 + H_2}$，同时提供氢氧化钠和氯；现代离子膜电解槽用一张阳离子交换膜分隔产物，它让$\mathrm{Na^+}$通过，而不让$\mathrm{OH^-}$或$\mathrm{Cl^-}$通过（[[electrochemistry/fuel-cells-electrolysis]]）。一个半世纪以来，**碳酸钠**是用**索尔维法**生产的，其关键步骤是在用氨和二氧化碳饱和的浓盐水中沉淀出溶解度最小的盐，
$$
\mathrm{NaCl + NH_3 + CO_2 + H_2O \rightarrow NaHCO_3(s) + NH_4Cl},
$$
随后把碳酸氢钠煅烧为$\mathrm{Na_2CO_3}$；氨用石灰石制得的石灰回收，所以净变化只是$\mathrm{CaCO_3 + 2\,NaCl \rightarrow Na_2CO_3 + CaCl_2}$——如果直接尝试，这个反应会逆向进行，而借助溶解度与挥发性的循环使它正向进行。**锂**作为锂离子电池的阳离子已成为战略资源：它通过蒸发从盐湖卤水中回收，也从锂辉石矿中提取，截至2026年，其供应链已成为若干国家产业政策的议题（[[electrochemistry/batteries]]）。

## 后续内容

本章的尺寸匹配论证以及晶格能与水合能的比较，在离子固体遇水的任何地方都会再次出现：[[main-group/groups-13-14]]中的铝与硅酸盐化学，[[main-group/halogens-noble-gases]]中多卤化物盐的稳定性，以及[[materials-chemistry/solid-synthesis]]中的固态化学。氢化物将作为硼烷在[[main-group/groups-13-14]]中再次出现，并作为氨、水和硫化氢在[[main-group/groups-15-16]]中出现，在那里哈伯-博施法把水蒸气重整制得的氢变成肥料。动力学同位素效应在[[kinetics/transition-state-theory]]中充分展开，溶剂化电子在[[kinetics/photochemistry]]中再次出现，而s区有机金属化合物——格氏试剂和有机锂试剂——是[[organometallics-catalysis/main-group-organometallics]]的主题。

::: history
1766年，卡文迪什（Henry Cavendish）把氢表征为金属与酸作用产生的“可燃空气”；拉瓦锡（Lavoisier）在1783年证明其燃烧生成水之后为它命名（*hydro-gène*，“成水者”）。碱金属与碱土金属是随伏打电堆而来的：戴维（Humphry Davy）于1807年电解熔融氢氧化物分离出钾和钠，1808年又分离出镁、钙、锶和钡。1817年，在贝采利乌斯（Berzelius）实验室工作的阿韦德松（Johan August Arfwedson）在透锂长石中认出了锂。铷和铯是最早用光谱法发现的元素，由本生（Robert Bunsen）和基尔霍夫（Gustav Kirchhoff）作为火焰光谱中的新谱线分别在迪尔克海姆矿泉水中（铯，1860）和锂云母中（铷，1861）发现。碱金属的蓝色氨溶液由魏尔（W. Weyl）于1864年描述，而克劳斯（Charles Kraus）自1907年起的电导测量导出了溶剂化电子的概念。尤里（Harold Urey）与布里克韦德（Ferdinand Brickwedde）、墨菲（George Murphy）于1931年用光谱法发现了氘（尤里获得1934年诺贝尔化学奖），氚则由奥利芬特（Mark Oliphant）、哈特克（Paul Harteck）和卢瑟福（Ernest Rutherford）于1934年制得。佩德森（Charles Pedersen）1967年关于冠醚的报道和莱恩（Jean-Marie Lehn）的穴醚开启了碱金属的配位化学；佩德森和莱恩与克拉姆（Donald Cram）分享了1987年诺贝尔奖，而戴（James Dye）于1974年用穴醚制得了第一个钠负离子盐。
:::

::: summary
- 氢不属于任何族：高电离能使凝聚相中不存在自由的$\mathrm{H^+}$，强达$436\ \mathrm{kJ\,mol^{-1}}$的键使$\mathrm{H_2}$在动力学上迟钝。
- 二元氢化物分为类盐型（正电性金属，$\mathrm{H^-}$）、分子型（p区；缺电子型、电子准确型或富电子型）和金属型（间隙型）；相对于$2.20$的电负性决定氢是负氢性的还是质子性的。
- 同位素效应来自零点能：$k_\mathrm{H}/k_\mathrm{D} = \exp[hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})/2k_\mathrm{B}T]$，室温下对$\mathrm{C{-}H}$键约为6–7。
- 除$E^\circ$外，碱金属的性质沿族向下平滑变化：锂是水中最强的还原剂，因为其小离子的水合放热极多；与水反应的剧烈程度是动力学问题，沿族向下增大。
- 尺寸匹配原理：大阴离子（过氧根、超氧根、碳酸根）被大阳离子稳定，因此含氧阴离子盐的热稳定性在第1族和第2族中自上而下增大；离子尺寸相近时盐最难溶，因此第2族硫酸盐沿族向下变得更难溶，氢氧化物变得更易溶。
- 碱金属溶于液氨，形成阳离子和溶剂化电子——蓝色、顺磁、导电，并且是强还原剂。
- 极负的电势迫使人们从熔盐中电解提取；大宗化合物来自氯碱电解和（历史上的）索尔维法。
:::

## 习题

::: exercise 氢化物的分类 {level=1}
把下列氢化物分为类盐型、分子型或金属型，并说明其中的氢是负氢性的还是质子性的：(a) $\mathrm{KH}$；(b) $\mathrm{H_2S}$；(c) $\mathrm{SiH_4}$；(d) $\mathrm{PdH}_{0.6}$；(e) $\mathrm{NH_3}$。
::: solution
(a) 类盐型，负氢性：钾（$\chi = 0.82$）形成$\mathrm{K^+H^-}$，与水反应生成$\mathrm{H_2}$。(b) 分子型，富电子型，质子性：硫（$2.58$）的电负性大于氢，$\mathrm{H_2S}$是弱酸。(c) 分子型，电子准确型，负氢性：硅（$1.90$）的电负性小于氢，因此$\mathrm{SiH_4}$与水反应（碱催化）生成$\mathrm{H_2}$和二氧化硅，并在空气中自燃。(d) 金属型（间隙型），非化学计量；氢溶解在钯的晶格中，固体仍是金属。(e) 分子型，富电子型，在$\mathrm{H^{\delta+}}$的意义上是质子性的——尽管氨作为通过孤对电子起作用的碱远比作为酸更为人熟知。
:::
:::

::: exercise 钠的D线 {level=1 check="203"}
钠的火焰在$589.0\ \mathrm{nm}$处发光。计算一摩尔这种光子的能量（$h = 6.626\times10^{-34}\ \mathrm{J\,s}$，$c = 2.998\times10^{8}\ \mathrm{m\,s^{-1}}$，$N_\mathrm{A} = 6.022\times10^{23}\ \mathrm{mol^{-1}}$），并说明它对应于哪个电子跃迁。（以$\mathrm{kJ\,mol^{-1}}$为单位输入能量，保留三位有效数字。）
::: solution
$E = N_\mathrm{A}hc/\lambda = (6.022\times10^{23})(6.626\times10^{-34})(2.998\times10^{8})/(589.0\times10^{-9}\ \mathrm{m}) = 2.031\times10^{5}\ \mathrm{J\,mol^{-1}} = 203\ \mathrm{kJ\,mol^{-1}}$。它是钠原子的$3p \rightarrow 3s$跃迁（$589.0$和$589.6\ \mathrm{nm}$的双线来自$3p$的两个自旋–轨道能级）。注意它远小于电离能$496\ \mathrm{kJ\,mol^{-1}}$：火焰能激发原子，但使之电离的很少。
:::
:::

::: exercise 由氢化钙产生的氢气 {level=1 check="1.18"}
$1.00\ \mathrm{g}$的$\mathrm{CaH_2}$（$M = 42.09\ \mathrm{g\,mol^{-1}}$）与水完全反应，放出的氢气在$298\ \mathrm{K}$和$1\ \mathrm{bar}$下的体积是多少？（$R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$。）（以$\mathrm{dm^3}$为单位输入体积，保留三位有效数字。）
::: solution
$\mathrm{CaH_2 + 2\,H_2O \rightarrow Ca(OH)_2 + 2\,H_2}$。氢化物的物质的量$= 1.00/42.09 = 0.02376\ \mathrm{mol}$，所以$n(\mathrm{H_2}) = 0.04752\ \mathrm{mol}$。$V = nRT/p = (0.04752)(8.314)(298)/(1.00\times10^{5}\ \mathrm{Pa}) = 1.178\times10^{-3}\ \mathrm{m^3} = 1.18\ \mathrm{dm^3}$。一克固体产生一升多的易燃气体，这就是为什么该反应要缓慢进行、保持通气并远离明火。
:::
:::

::: exercise 硫酸钡在水中 {level=2 check="10.4"}
$25\ \mathrm{^\circ C}$下$K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.08\times10^{-10}$。计算硫酸钡在纯水中的摩尔溶解度，并用尺寸匹配原理解释为什么硫酸钡比硫酸镁难溶得多。（以$\mu\mathrm{mol\,dm^{-3}}$为单位输入溶解度，保留三位有效数字。）
::: solution
$\mathrm{BaSO_4(s) \rightleftharpoons Ba^{2+} + SO_4^{2-}}$，所以$s^2 = K_\mathrm{sp}$，$s = \sqrt{1.08\times10^{-10}} = 1.04\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 10.4\ \mu\mathrm{mol\,dm^{-3}}$（约每升$2.4\ \mathrm{mg}$）。硫酸根是大阴离子，所以依赖于$1/(r_+ + r_-)$的晶格能在$\mathrm{Mg^{2+}}$（$72\ \mathrm{pm}$）与$\mathrm{Ba^{2+}}$（$135\ \mathrm{pm}$）之间变化很小；而强烈依赖于$1/r_+$的阳离子水合焓对钡则小得多。可用来偿付晶格能的水合作用较少，$\mathrm{BaSO_4}$就保持为固体。在医学应用中，正是游离$\mathrm{Ba^{2+}}$的这种低浓度使悬浮液安全，而可溶性钡盐是有毒的。
:::
:::

::: exercise 碳酸锶 {level=2 check="1371"}
对于$\mathrm{SrCO_3(s) \rightarrow SrO(s) + CO_2(g)}$，利用$\Delta_\mathrm{f}H^\circ$（$\mathrm{kJ\,mol^{-1}}$）：$\mathrm{SrCO_3}$ $-1220.1$，$\mathrm{SrO}$ $-592.0$，$\mathrm{CO_2}$ $-393.5$，以及$S^\circ$（$\mathrm{J\,K^{-1}\,mol^{-1}}$）：$97.1$、$54.4$、$213.8$，估计$\mathrm{CO_2}$平衡压力达到$1\ \mathrm{bar}$时的温度。（以K为单位输入温度，精确到开尔文。）
::: solution
$\Delta_\mathrm{r}H^\circ = -592.0 - 393.5 + 1220.1 = 234.6\ \mathrm{kJ\,mol^{-1}}$；$\Delta_\mathrm{r}S^\circ = 54.4 + 213.8 - 97.1 = 171.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$；$T = 234\,600/171.1 = 1371\ \mathrm{K}$。它位于钙（$1119\ \mathrm{K}$）与钡（$1562\ \mathrm{K}$）之间，正如尺寸匹配原理所要求的；熵项与碳酸钙的几乎相同，所以全部差别来自焓。
:::
:::

::: exercise O–H同位素效应 {level=2 check="10.6"}
某$\mathrm{O{-}H}$伸缩振动位于$3600\ \mathrm{cm^{-1}}$，氘代后变为$2621\ \mathrm{cm^{-1}}$。利用[[#prop-kie]]的半经典模型，取$hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$，估计在决速步中断裂该键的反应在$298.15\ \mathrm{K}$下的最大$k_\mathrm{H}/k_\mathrm{D}$。（输入该比值，保留三位有效数字。）
::: solution
指数$= 1.4388 \times (3600 - 2621)/(2 \times 298.15) = 1.4388 \times 979/596.3 = 2.362$；$k_\mathrm{H}/k_\mathrm{D} = e^{2.362} = 10.6$。它比$\mathrm{C{-}H}$的大，因为$\mathrm{O{-}H}$伸缩振动频率更高，因而有更多的零点能可以失去。实际上，氧原子之间的质子转移常表现出较小的效应，因为质子在过渡态中被共享，保留了部分零点能——这违背了模型的假设之一。
:::
:::

::: exercise 电解制氢的最低能量 {level=2 check="32.7"}
对于$298\ \mathrm{K}$下的$\mathrm{H_2O(l) \rightarrow H_2(g) + \tfrac12\,O_2(g)}$，$\Delta_\mathrm{r}G^\circ = +237.1\ \mathrm{kJ\,mol^{-1}}$，$\Delta_\mathrm{r}H^\circ = +285.8\ \mathrm{kJ\,mol^{-1}}$。计算制取$1\ \mathrm{kg}$氢（$M = 2.016\ \mathrm{g\,mol^{-1}}$）所需的最低电能及相应的槽电压。为什么实际电解槽耗能更多？（以kWh为单位输入能量，保留三位有效数字。）
::: solution
一千克为$1000/2.016 = 496.0\ \mathrm{mol}$。最低电功$= 496.0 \times 237.1\ \mathrm{kJ} = 1.176\times10^{5}\ \mathrm{kJ} = 117.6\ \mathrm{MJ}$，除以$3.6\ \mathrm{MJ\,kWh^{-1}}$得$32.7\ \mathrm{kWh}$。电压为$E = \Delta_\mathrm{r}G^\circ/nF = 237\,100/(2 \times 96\,485) = 1.23\ \mathrm{V}$。在此电压下，其余的$T\Delta_\mathrm{r}S^\circ = 48.7\ \mathrm{kJ\,mol^{-1}}$必须以热的形式供给；在$\Delta_\mathrm{r}H^\circ/2F = 1.48\ \mathrm{V}$（热中性电压）下，电解槽既不吸热也不放热。实际电解槽在约$1.8$–$2\ \mathrm{V}$下运行，原因是两个电极上的活化超电势（析氧最大）以及电解质和隔膜中的欧姆损失，因此实际能耗通常为每千克50–55 kWh。
:::
:::

::: exercise 钠与钾的比较 {level=3}
钾的标准电势比钠的更负（$-2.93$对$-2.71\ \mathrm{V}$）。利用$\Delta_\mathrm{at}H^\circ$（$\mathrm{K}$：$89.0$；$\mathrm{Na}$：$107.5\ \mathrm{kJ\,mol^{-1}}$）、$IE_1$（$418.8$；$495.8$）和$\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq})$（$-252.4$；$-240.1$），求水合焓之差$\Delta_\mathrm{hyd}H^\circ(\mathrm{K^+}) - \Delta_\mathrm{hyd}H^\circ(\mathrm{Na^+})$，并解释为什么电势的顺序是$\mathrm{Li} < \mathrm{K} < \mathrm{Na}$（最负者在前），而不是单独遵循电离能或水合能的顺序。
::: hint
建立与[[#ex-li-potential]]相同的循环，用钾的一列减去钠的一列。
:::
::: solution
对每种金属，$\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq}) = \Delta_\mathrm{at}H^\circ + IE_1 + \Delta_\mathrm{hyd}H^\circ$（+ 一个常数）。K减Na：$-12.3 = -18.5 - 77.0 + \Delta\Delta_\mathrm{hyd}H^\circ$，所以$\Delta\Delta_\mathrm{hyd}H^\circ = +83.2\ \mathrm{kJ\,mol^{-1}}$：钾的较大离子的水合放热**少**$83\ \mathrm{kJ\,mol^{-1}}$。但钾在原子化和电离上节省了$96\ \mathrm{kJ\,mol^{-1}}$，因此在焓上领先$12\ \mathrm{kJ\,mol^{-1}}$（计入熵后，在自由能上领先$21\ \mathrm{kJ\,mol^{-1}}$，即$0.22\ \mathrm{V}$）。从钠沿族向下，电离和原子化的节省超过水合的损失，所以电势缓慢地变得更负；从钠向上到锂，水合的收益（$115\ \mathrm{kJ\,mol^{-1}}$，[[#ex-li-potential]]）超过电离和原子化的损失（$76\ \mathrm{kJ\,mol^{-1}}$）。电势是大项之间的小差，在族的两端由不同的项取胜——这就是为什么它是表中唯一不单调的一行。
:::
:::

::: exercise 卡普斯钦斯基括号 {level=3}
(a) 证明在卡普斯钦斯基近似下，分解$\mathrm{MX \rightarrow MY}$（电荷相同，$r_\mathrm{X} > r_\mathrm{Y}$）的晶格能增益正比于$f(r_+) = 1/(r_+ + r_\mathrm{Y}) - 1/(r_+ + r_\mathrm{X})$，并证明$f$随$r_+$增大而减小。(b) 对$\mathrm{Li^+}$（$76\ \mathrm{pm}$）和$\mathrm{K^+}$（$138\ \mathrm{pm}$），取$\mathrm{Y} = \mathrm{O^{2-}}$（$140\ \mathrm{pm}$，以$\mathrm{M_2O}$形式）和$\mathrm{X} = \mathrm{O_2^{2-}}$（取$173\ \mathrm{pm}$）计算$f$，并用结果解释为什么锂燃烧生成氧化物，而钾不会停在氧化物阶段。
::: hint
把$f$通分，看分子和分母如何依赖于$r_+$。
:::
::: solution
(a) 在卡普斯钦斯基方程中，晶格焓为$K\nu|z_+z_-|/(r_+ + r_-)$；两种盐的电荷和$\nu$相同时，其变化为$K\nu|z_+z_-|\,f(r_+)$。通分得
$$
f(r_+) = \frac{r_\mathrm{X} - r_\mathrm{Y}}{(r_+ + r_\mathrm{X})(r_+ + r_\mathrm{Y})}.
$$
分子是正的常数，分母随$r_+$增大，所以$f$单调递减（其导数为$-(r_\mathrm{X} - r_\mathrm{Y})(2r_+ + r_\mathrm{X} + r_\mathrm{Y})/[(r_+ + r_\mathrm{X})(r_+ + r_\mathrm{Y})]^2 < 0$）。(b) 锂：$33/(249 \times 216) = 6.14\times10^{-4}\ \mathrm{pm^{-1}}$；钾：$33/(311 \times 278) = 3.82\times10^{-4}\ \mathrm{pm^{-1}}$。把过氧化物转变为氧化物的晶格回报，锂约大60 %。转变的代价（断开$\mathrm{O{-}O}$键并在每个氧上加上第二个负电荷）对两种金属相同，所以对锂而言回报超过代价，产物是$\mathrm{Li_2O}$；而对钾，较小的回报不足以抵偿代价，较大的阴离子——过氧根，以及在氧更多时的超氧根——得以存留。实际的半径和结构会修正这些数字，但不会改变趋势的符号。
:::
:::
