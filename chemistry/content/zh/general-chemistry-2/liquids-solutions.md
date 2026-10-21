高压锅把炖肉的时间缩短一半；结冰的小路撒上一层盐，寒冷却因此消融；汽水瓶一开盖就嘶嘶冒泡；而放进纯水里的细胞会不断吸水膨胀直到胀破。这些没有一件是关于化学反应的故事——它们讲的都是*凝聚相的物理*，而且全部由同样几个数字讲述：液体的蒸气压、相界线的斜率、以及溶解粒子的浓度。本章就是液体不再充当化学那看不见的背景、而成为主角的地方。

组织全章的思想很简单。液体是靠分子间力维系的一个相，这些力弱到表面不断有分子逃逸到上方的气体中；而溶液的任何一个只取决于溶解粒子*数目*——与粒子是什么无关——的性质，都称为**依数性**。蒸气压下降、沸点升高、凝固点降低与渗透压就是四种依数性，而它们其实是同一现象从四个方向看到的模样：溶质把溶剂稀释了，溶剂便以更难蒸发、更难凝固、更少渗透来回应。

## 分子间力与蒸气压

::: definition 分子间力 {#def-imf}
把液体维系在一起的**分子间力**，按典型强度排列为：**氢键**（与 $\mathrm{F}$、$\mathrm{O}$ 或 $\mathrm{N}$ 成键的 $\mathrm{H}$ 原子被另一个此类原子上的孤对电子吸引，约 $10$–$40\ \mathrm{kJ\,mol^{-1}}$）；永久分子偶极之间的**偶极–偶极**相互作用（约 $1$–$10\ \mathrm{kJ\,mol^{-1}}$）；以及**色散（伦敦）力**，由电子云的瞬时涨落相互关联而产生（对小分子约在 $\sim 5\ \mathrm{kJ\,mol^{-1}}$ 以下，但对大分子或可极化分子占主导，而且是稀有气体、$\mathrm{H_2}$、$\mathrm{N_2}$ 与烃类中唯一的力）。色散力随电子数与分子表面积增大而增大，这就是烷烃按链长顺序沸腾的原因。
:::

由于这些力比共价键（$\sim 400\ \mathrm{kJ\,mol^{-1}}$）弱得多，液体是一个拥挤、不断重排的集合体：分子从表面不断蒸发，又不断冷凝回来。在密闭容器中，这一交换的两个方向最终达到等速率，液体上方的蒸气便具有稳定的压力。

::: definition 蒸气压与挥发性 {#def-vapour-pressure}
液体的**蒸气压** $p^{*}$ 是在给定温度下纯液体上方蒸气达到平衡时的压力。室温下蒸气压高的液体称为**易挥发**的。蒸气压只取决于温度与分子间力的强弱，不取决于其他任何东西：不取决于液体的量，不取决于容器的体积，也不取决于是否存在其他气体（在普通化学的精度内）。
:::

::: example 沸点排序 {#ex-imf-ranking}
把丙烷 $\mathrm{CH_3CH_2CH_3}$、二甲醚 $\mathrm{CH_3OCH_3}$、乙醇 $\mathrm{CH_3CH_2OH}$ 与乙烷-1,2-二醇（乙二醇）$\mathrm{HOCH_2CH_2OH}$ 按正常沸点递增排列，并解释这个顺序。这四个分子的摩尔质量分别为 $44$、$46$、$46$ 与 $62\ \mathrm{g\,mol^{-1}}$——几乎同样大小。
::: solution
丙烷非极性：只有色散力，沸点最低，$-42\ ^\circ\mathrm{C}$。二甲醚有永久偶极，但没有 $\mathrm{O–H}$ 键，不能自身形成氢键；偶极–偶极力只把它的沸点抬到 $-24\ ^\circ\mathrm{C}$。乙醇通过其单个 $\mathrm{O–H}$ 基团形成氢键，沸点 $78.4\ ^\circ\mathrm{C}$。乙二醇有两个 $\mathrm{O–H}$ 基团，每个分子形成的氢键网络约为乙醇的两倍；它的沸点为 $197\ ^\circ\mathrm{C}$——比质量几乎相同的乙醇高出一百多度。两个质量与分子式都几乎相同的分子，沸点相差 $220\ \mathrm{K}$，纯粹是因为每个分子能形成的氢键数目不同：决定沸点的是分子间力，而不是共价结构。
:::
:::

::: warning 蒸发、沸腾，以及蒸气压不是什么 {#warn-vapour-pressure}
有三个混淆值得现在就扼杀。第一，**蒸发与沸腾是不同的过程**：蒸发是沸点以下的表面损失，在任何温度都会发生；沸腾是蒸气*气泡在液体内部*的形成，只有当蒸气压等于外压时才可能发生。第二，水壶里沸腾的水中的气泡是**水蒸气，不是空气**——溶解的空气早在第一个气泡出现之前就被赶走了。第三，蒸气压是一个**强度性的平衡性质**：把液体倒进更大的容器，或在液面上方充入氦气，都不会改变它；同温度下，一滴水与一个湖泊的蒸气压相同。"加热使蒸气压升高，所以蒸气压把沸点推了上去"这种说法把因果弄反了——液体是在其（由温度决定的）蒸气压达到（由外部固定的）压力时才沸腾的。
:::

::: quiz
一只半装水的密闭烧瓶在 $25\ ^\circ\mathrm{C}$ 达到平衡，蒸气压为 $3.17\ \mathrm{kPa}$。在暗中小心地蒸发掉一部分水，只剩下一层薄膜，温度仍为 $25\ ^\circ\mathrm{C}$。此时蒸气压是多少？
- [x] 只要还有任何液态水存在，就仍是 $3.17\ \mathrm{kPa}$。
- [ ] 与剩余液体的分数成正比。
- [ ] 零，因为没有自由的液面。
- [ ] 取决于烧瓶的体积。
::: solution
仍是 $3.17\ \mathrm{kPa}$。平衡蒸气压只由温度决定；液体的量只决定体系达到平衡需要多久、以及是否还有液体剩下。如果液体*全部*被移走，压力就会降到 $p^{*}$ 以下，蒸气也不再是饱和的。
:::
:::

## 克劳修斯–克拉珀龙方程

蒸气压只在几个温度下列表给出，但真正有用的科学是预测没人测过的温度下的蒸气压。这正是克拉珀龙方程及其著名近似的工作。

::: proposition 克拉珀龙方程 {#prop-clapeyron}
沿纯物质任意两相平衡线，压力与温度被下述关系绑定：
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{\Delta H}{T\,\Delta V},
$$
其中 $\Delta H$ 与 $\Delta V$ 是该相变在温度 $T$ 下的焓变与体积变。因此纯物质的共存线是一维的线而非区域——这个事实在我们遇到相图时还会再用到。
:::

::: proposition 克劳修斯–克拉珀龙方程 {#prop-clausius-clapeyron}
对于液–气（或固–气）平衡，把蒸气当作理想气体并忽略凝聚相的体积，克拉珀龙方程化为
$$
\frac{\mathrm{d}\ln p}{\mathrm{d}T} = \frac{\Delta_\mathrm{vap}H}{R\,T^{2}}
\qquad\text{若 } \Delta_\mathrm{vap}H \text{ 取为常数，则}\qquad
\ln\frac{p_2}{p_1} = -\frac{\Delta_\mathrm{vap}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right).
$$
$\ln p$ 对 $1/T$ 作图是一条斜率为 $-\Delta_\mathrm{vap}H/R$ 的直线；这是测定摩尔汽化焓的标准方法。
:::

::: proof
从液 $\rightarrow$ 气相变的克拉珀龙方程出发。由于一摩尔蒸气在通常条件下约占 $24\ \mathrm{dm^3}$，而一摩尔液体只占几十 $\mathrm{cm^3}$，故 $\Delta V \approx V_\mathrm{m,gas}$。把蒸气当作理想气体，$V_\mathrm{m,gas} = RT/p$，于是
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{\Delta_\mathrm{vap}H}{T \cdot RT/p} = \frac{\Delta_\mathrm{vap}H}{R}\,\frac{p}{T^{2}}.
$$
分离变量得 $\mathrm{d}\ln p = (\Delta_\mathrm{vap}H/R)\,\mathrm{d}T/T^{2}$。若在所考虑的温度区间内 $\Delta_\mathrm{vap}H$ 与温度无关，在 $(T_1, p_1)$ 与 $(T_2, p_2)$ 之间积分即得两点式。$blacksquare$
:::

::: widget plot
f: ln(101.325) + a*1000/8.314*(1/373.15 - x/1000)
x: 2, 4
y: -3, 9
sliders: a=40.7:25:60:0.1
labels: \text{water, ln(p/kPa) vs 1000/T}
caption: 水的线性化克劳修斯–克拉珀龙方程：$\ln(p/\mathrm{kPa})$ 对 $1000/T$ 作图，汽化焓 $\Delta_\mathrm{vap}H$（单位 $\mathrm{kJ\,mol^{-1}}$）由滑块设定。直线被钉在正常沸点处（$1000/T = 2.68$，$\ln p = 4.62$），并随滑块改变斜率 $-\Delta_\mathrm{vap}H/R$ 而绕该点转动。直线越陡（$\Delta_\mathrm{vap}H$ 越大），蒸气压对温度越敏感——这正是为什么水（$40.7\ \mathrm{kJ\,mol^{-1}}$）这类氢键液体有如此陡峭的蒸气压曲线，而乙醚（$26\ \mathrm{kJ\,mol^{-1}}$）这类易挥发液体的曲线却如此平缓。
:::

::: example 由两点求汽化焓 {#ex-dHvap-water}
水在 $25.0\ ^\circ\mathrm{C}$ 的蒸气压为 $3.17\ \mathrm{kPa}$，在 $80.0\ ^\circ\mathrm{C}$ 为 $47.36\ \mathrm{kPa}$。估算这个区间内的 $\Delta_\mathrm{vap}H$。
::: solution
把两点式改写成：
$$
\Delta_\mathrm{vap}H = \frac{R\,\ln(p_2/p_1)}{1/T_1 - 1/T_2}
= \frac{8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times \ln(47.36/3.17)}{\left(1/298.15 - 1/353.15\right)\ \mathrm{K^{-1}}}
= \frac{8.314 \times 2.704}{5.223\times10^{-4}} = 4.30\times10^{4}\ \mathrm{J\,mol^{-1}}.
$$
所以 $\Delta_\mathrm{vap}H \approx 43.0\ \mathrm{kJ\,mol^{-1}}$。这既不是表列 $25\ ^\circ\mathrm{C}$ 下的 $44.0\ \mathrm{kJ\,mol^{-1}}$，也不是 $100\ ^\circ\mathrm{C}$ 下的 $40.7\ \mathrm{kJ\,mol^{-1}}$——它是这个区间的*平均值*，恰好落在两者之间，这才是读懂这个近似的正确方式。所作假设只有 $\Delta_\mathrm{vap}H$ 恒定这一条，而在 $55\ \mathrm{K}$ 的区间上它的代价约为 $3\ \%$。
:::
:::

::: example 高原上做饭，高压下做饭 {#ex-altitude}
在一个大气压为 $75.0\ \mathrm{kPa}$ 的城镇，水在什么温度沸腾？而在总压达到 $2.00\ \mathrm{atm}$ 的密闭高压锅里呢？取 $\Delta_\mathrm{vap}H = 40.7\ \mathrm{kJ\,mol^{-1}}$。
::: solution
以 $p_1 = 101.325\ \mathrm{kPa}$、$T_1 = 373.15\ \mathrm{K}$ 从两点式解出 $T_2$：
$$
\frac{1}{T_2} = \frac{1}{373.15} - \frac{R}{\Delta_\mathrm{vap}H}\ln\frac{p_2}{p_1}
= 2.6799\times10^{-3} - \frac{8.314}{40\,700}\ln\frac{75.0}{101.325}
= 2.6799\times10^{-3} + 0.6145\times10^{-4} = 2.7413\times10^{-3}\ \mathrm{K^{-1}},
$$
故 $T_2 = 364.8\ \mathrm{K} = 91.6\ ^\circ\mathrm{C}$。水的沸点低了将近九度，这就是高原上煮意面和豆子要久得多的原因——食物的温度永远不会超过沸点。对高压锅，$\ln(202.65/101.325) = 0.693$，得 $1/T_2 = 2.6799\times10^{-3} - 1.416\times10^{-4} = 2.5383\times10^{-3}$，$T_2 = 394.0\ \mathrm{K} = 121\ ^\circ\mathrm{C}$。压力多两成，烹饪温度多二十八度，厨房里大多数化学的速率大约翻倍——这就是高压锅的全部道理。
:::
:::

::: history
对蒸气的定量研究始于道尔顿（Dalton），他在 1801–1802 年测量了水及其他液体的"张力"，并认识到混合气体中每种蒸气都像其他气体不存在一样行事。法拉第（Faraday）在 1823 年用加压与降温液化了氯和二氧化碳，此后数十年这些"永久气体"仍拒不液化，因此安德鲁斯（Andrews）在 1869 年发现存在一个**临界温度**——高于它任何压力都不能使气体液化——才如此具有决定性：每种气体都有自己的临界温度，它是分子的属性而非技术的局限。范德华（van der Waals）在 1873 年给出了第一个分子层面的解释。溶液定律则出现在 1880 年代：拉乌尔（Raoult）1887 年的蒸气压测量，与范特霍夫（van 't Hoff）1886–1887 年认识到稀溶液服从气体定律 $\Pi V = nRT$，给了溶液化学你即将使用的定量形式。
:::

::: widget plot
f: 101.325*exp(-a*1000/8.314*(1/x - 1/373.15))
x: 250, 470
y: 0, 1600
sliders: a=40.7:25:60:0.1
labels: \text{p(T)/kPa for water}
caption: 同一信息的指数形式：水的蒸气压（$\mathrm{kPa}$）对热力学温度作图，$\Delta_\mathrm{vap}H$（滑块，$\mathrm{kJ\,mol^{-1}}$）。曲线按构造经过 $373.15\ \mathrm{K}$ 处的 $101.325\ \mathrm{kPa}$，并上升得如此陡峭，以致在 $470\ \mathrm{K}$ 已超过 $1.5\ \mathrm{MPa}$——正是家用高压锅在工作温度下的内部压力。这种指数形状正是为什么室温附近每升高 $10\ \mathrm{K}$，空气能容纳的湿度就变化约 $50\ \%$。
:::

## 相图

::: definition 相图 {#def-phase-diagram}
**相图**以压力对温度作图，给出纯物质在每一点上稳定的相（或相的混合物）。三条**共存线**——升华线（固–气）、汽化线（液–气）与熔化线（固–液）——交于**三相点**，即三相共存的唯一 $(T, p)$；汽化线终止于**临界点** $(T_\mathrm{c}, p_\mathrm{c})$，越过它物质成为单一的**超临界流体**。每条线都是线而非区域，因为由相律 $F = C - P + 2 = 1$，一个两相平衡的单元体系只有一个自由度。
:::

每个学生都应当烂熟于心的相图有两张：水的与二氧化碳的。水的三相点在 $0.01\ ^\circ\mathrm{C}$、$611.7\ \mathrm{Pa}$——*低于*大气压——所以在 $1\ \mathrm{atm}$ 下冰熔成液体，液体在 $100\ ^\circ\mathrm{C}$ 沸腾。二氧化碳的三相点在 $5.11\ \mathrm{bar}$、$-56.6\ ^\circ\mathrm{C}$——*高于*大气压——所以在 $1\ \mathrm{atm}$ 下液态 $\mathrm{CO_2}$ 根本不存在：固态 $\mathrm{CO_2}$（"干冰"）在 $194.7\ \mathrm{K}$ 升华，而气态 $\mathrm{CO_2}$ 在 $31.0\ ^\circ\mathrm{C}$（其临界温度）以上单靠加压无法液化。干冰在通风不良的场合是严重的窒息危险，因为升华出的气体密度大、无色、会排挤空气；取用要戴隔热手套，因为 $194.7\ \mathrm{K}$ 的干冰一接触就会冻伤皮肤。

::: example 冰–水线为什么向后倾斜 {#ex-ice-slope}
冰在 $273.15\ \mathrm{K}$ 熔化时 $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$，摩尔体积分别为 $19.66\ \mathrm{cm^3\,mol^{-1}}$（冰）与 $18.02\ \mathrm{cm^3\,mol^{-1}}$（水）。求熔化线的斜率，以及使熔点降低 $1\ \mathrm{K}$ 所需的压力。
::: solution
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{\Delta_\mathrm{fus}H}{T\,\Delta_\mathrm{fus}V}
= \frac{6010\ \mathrm{J\,mol^{-1}}}{273.15\ \mathrm{K} \times (18.02 - 19.66)\times10^{-6}\ \mathrm{m^3\,mol^{-1}}}
= \frac{6010}{-4.48\times10^{-4}} = -1.35\times10^{7}\ \mathrm{Pa\,K^{-1}},
$$
即 $-135\ \mathrm{bar\,K^{-1}}$。斜率为负是因为冰比水*更不*致密——熔化使样品收缩，所以压力偏向液相。降低 $1\ \mathrm{K}$ 需要 $135\ \mathrm{bar}$，即一百三十个大气压。
:::
:::

::: warning 滑冰不是压熔 {#warn-ice-skating}
关于滑冰的老解释——冰刀的压力降低熔点从而熔化了冰——经不起算术检验。一个 $70\ \mathrm{kg}$ 的滑冰者站在宽 $1\ \mathrm{mm}$、接触长 $8\ \mathrm{cm}$ 的冰刀上，施加的压强约 $86\ \mathrm{bar}$，只能把熔点降低 $0.6\ \mathrm{K}$：在 $-10\ ^\circ\mathrm{C}$ 的冰上毫无用处；而且冰刀本来就会陷进冰里，使接触面积大得多、压强小得多。公认的解释是摩擦生热与**表面预熔**的联合作用——冰的最外几层分子在远低于 $0\ ^\circ\mathrm{C}$ 时就已无序、近乎液态——一层薄水膜提供了润滑。这段公案是一个有用的告诫：一个*真实*的机制（压力确实降低冰的熔点）仍然可能把一个日常现象的解释错上两个数量级。
:::

::: quiz
为什么 $1\ \mathrm{atm}$、室温下的一块干冰直接变成气体，而一块冰却变成水？
- [x] $\mathrm{CO_2}$ 的三相点压力（$5.11\ \mathrm{bar}$）在 $1\ \mathrm{atm}$ 之上，所以在大气压下没有任何液相是稳定的。
- [ ] $\mathrm{CO_2}$ 在任何压力下都没有液相。
- [ ] 因为升华放热，干冰比冰更热。
- [ ] 因为大气中含有 $\mathrm{CO_2}$，阻止了熔化。
::: solution
三相点说了算。在低于三相点压力的压力下加热固体，它会直接从固相走到气相：根本到不了液相区。$\mathrm{CO_2}$ *确实*有液相——在 $5.11\ \mathrm{bar}$ 以上，任何一只灭火器都能证明——而在其临界温度 $31.0\ ^\circ\mathrm{C}$ 以上它变成超临界流体。升华和一切汽化类相变一样是吸热的。
:::
:::

## 溶解度与拉乌尔定律

溶解是两种能量与一种熵的竞争：必须拆开溶质–溶质与溶剂–溶剂的吸引（吸热），同时形成溶质–溶剂的吸引（放热），而混合熵无论如何都推动过程进行。"相似相溶"是记账规则：极性与氢键溶质溶于极性溶剂，因为新的相互作用偿付了旧的；烃溶于烃，因为四周都是色散力，真正出力的只有混合熵。

::: definition 亨利定律 {#def-henry}
气体在液体中的溶解度正比于该气体在液面上方的分压：
$$
c = k_\mathrm{H}\,p,
$$
其中 $k_\mathrm{H}$ 是亨利定律常数（$25\ ^\circ\mathrm{C}$ 时，$\mathrm{O_2}$ 在水中 $k_\mathrm{H} = 1.25\times10^{-3}\ \mathrm{mol\,dm^{-3}\,bar^{-1}}$；$\mathrm{CO_2}$ 为 $3.4\times10^{-2}\ \mathrm{mol\,dm^{-3}\,bar^{-1}}$——标准表列值）。亨利定律是一个极限定律：它适用于不反应气体的稀溶液，而对 $\mathrm{NH_3}$ 或 $\mathrm{HCl}$ 这类与水反应的气体失效。
:::

::: example 河里的氧与汽水瓶里的气 {#ex-henry}
(a) $25\ ^\circ\mathrm{C}$ 的河水与 $1.00\ \mathrm{bar}$ 的空气平衡，其中 $p_{\mathrm{O_2}} = 0.200\ \mathrm{bar}$。求溶解氧的浓度，以 $\mathrm{mg\,dm^{-3}}$ 计。(b) 一瓶汽水在 $3.0\ \mathrm{bar}$ 的 $\mathrm{CO_2}$ 下装瓶。求溶解 $\mathrm{CO_2}$ 的浓度，并说明开瓶接触空气后会发生什么——空气中有效的 $\mathrm{CO_2}$ 分压约为 $3.5\times10^{-4}\ \mathrm{bar}$。
::: solution
(a) $c = k_\mathrm{H} p = 1.25\times10^{-3} \times 0.200 = 2.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，以 $M(\mathrm{O_2}) = 32.0\ \mathrm{g\,mol^{-1}}$ 换算，
$$
c = 2.5\times10^{-4}\ \mathrm{mol\,dm^{-3}} \times 32.0\ \mathrm{g\,mol^{-1}} = 8.0\times10^{-3}\ \mathrm{g\,dm^{-3}} = 8.0\ \mathrm{mg\,dm^{-3}}.
$$
这就是温暖的有氧水体全部的氧预算——这就是为什么温暖而受污染（耗氧）的水会杀死鱼类，也是为什么这个数是受法律监测的量。(b) 装瓶时：$c = 3.4\times10^{-2} \times 3.0 = 0.10\ \mathrm{mol\,dm^{-3}}$。开瓶后：平衡只要求 $3.4\times10^{-2} \times 3.5\times10^{-4} = 1.2\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，小了 $8600$ 倍。汽水相对于空气是极度过饱和的，多余的部分就以气泡形式逸出——这就是"杀口感"。亨利定律也解释了"减压病"：潜水员血液中溶解的氮气会随压力下降而析出。
:::
:::

::: definition 理想溶液与拉乌尔定律 {#def-raoult}
若溶质–溶剂相互作用恰好等于它们所取代的溶质–溶质与溶剂–溶剂相互作用，溶液就是**理想的**。理想溶液服从**拉乌尔定律**：每个组分的分蒸气压等于其摩尔分数乘以纯液体的蒸气压，
$$
p_\mathrm{A} = x_\mathrm{A}\,p_\mathrm{A}^{*}, \qquad p_\mathrm{B} = x_\mathrm{B}\,p_\mathrm{B}^{*},
$$
总蒸气压为 $p = x_\mathrm{A}p_\mathrm{A}^{*} + x_\mathrm{B}p_\mathrm{B}^{*}$。真实溶液会有偏差：乙醇–水呈正偏差（氢键网络被拆散，$p$ 升高），盐酸–水呈很大的负偏差（电离与强水合，$p$ 降低）。
:::

::: proposition 蒸气压下降 {#prop-raoult-lowering}
对**非挥发性**溶质的溶液，蒸气压就是溶剂的蒸气压，$p = x_\mathrm{A} p_\mathrm{A}^{*}$，故下降值为
$$
\Delta p = p_\mathrm{A}^{*} - p = x_\mathrm{B}\,p_\mathrm{A}^{*},
$$
正比于溶质的摩尔分数。对稀溶液它正比于质量摩尔浓度；对电解质，每个化学式单位约贡献 $i$ 个粒子，$i$ 称为**范特霍夫因子**。
:::

::: example 蔗糖引起的蒸气压下降 {#ex-sucrose}
计算 $25\ ^\circ\mathrm{C}$ 时把 $45.0\ \mathrm{g}$ 蔗糖 $\mathrm{C_{12}H_{22}O_{11}}$（$M = 342.3\ \mathrm{g\,mol^{-1}}$）溶于 $100.0\ \mathrm{g}$ 水所得溶液的蒸气压。$25\ ^\circ\mathrm{C}$ 纯水的蒸气压为 $3.17\ \mathrm{kPa}$。
::: solution
$n_\mathrm{sucrose} = 45.0/342.3 = 0.1315\ \mathrm{mol}$，$n_\mathrm{water} = 100.0/18.02 = 5.551\ \mathrm{mol}$，于是
$$
x_\mathrm{water} = \frac{5.551}{5.551+0.1315} = 0.9769,
\qquad
p = x_\mathrm{water}\,p^{*} = 0.9769 \times 3.17 = 3.10\ \mathrm{kPa}.
$$
蔗糖不挥发（其蒸气压可忽略），所以全部压力都是水的，被降低了 $2.3\ \%$——恰好是蔗糖的摩尔分数。注意这个效应的量级：即便是糖浆般的浓溶液，蒸气压也几乎不变，这已经提醒我们：用蒸气压测摩尔质量需要灵敏的天平，而建立在同一种稀释效应之上的*依数*性质（下一节）是更方便的杠杆。
:::
:::

## 依数性

::: definition 依数性与范特霍夫因子 {#def-colligative}
**依数性**只取决于溶解粒子的*数目*，与粒子的身份无关。四种依数性是：蒸气压下降、沸点升高、凝固点降低与渗透压。对解离成 $\nu$ 个离子的电解质，粒子数要乘以**范特霍夫因子** $i$；强电解质在无限稀释时 $i = \nu$，但在真实溶液中因离子对而变小（$0.1\ \mathrm{mol\,kg^{-1}}\ \mathrm{NaCl}$ 实测 $i \approx 1.87$，而不是 $2$）。
:::

::: proposition 依数性定律 {#prop-colligative}
对非挥发性溶质的稀理想溶液：
$$
\Delta T_\mathrm{b} = i\,K_\mathrm{b}\,m, \qquad
\Delta T_\mathrm{f} = i\,K_\mathrm{f}\,m, \qquad
\Pi = i\,c\,R\,T,
$$
前两式中 $m$ 为质量摩尔浓度（$\mathrm{mol\,kg^{-1}}$），末式中 $c$ 为物质的量浓度（$\mathrm{mol\,dm^{-3}}$），$\Pi$ 为渗透压。摩尔沸点升高常数与摩尔凝固点降低常数只是*溶剂*的性质：$K_\mathrm{b} = RT_\mathrm{b}^{2}M_\mathrm{A}/\Delta_\mathrm{vap}H$，$K_\mathrm{f} = RT_\mathrm{f}^{2}M_\mathrm{A}/\Delta_\mathrm{fus}H$。水：$K_\mathrm{b} = 0.512$、$K_\mathrm{f} = 1.86\ \mathrm{K\,kg\,mol^{-1}}$；苯：$K_\mathrm{b} = 2.53$、$K_\mathrm{f} = 5.12\ \mathrm{K\,kg\,mol^{-1}}$（标准表列数据）。
:::

::: proof 沸点升高
在溶液的沸点，溶剂的蒸气压必须等于外压 $p^\circ$。由拉乌尔定律，由于 $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*} < p_\mathrm{A}^{*}$，溶液要达到 $p^\circ$ 必须比纯溶剂更高的温度。写出 $p_\mathrm{A}^{*}(T_\mathrm{b} + \Delta T_\mathrm{b}) = p^\circ/x_\mathrm{A} = p^\circ(1 + x_\mathrm{B} + \cdots)$，并用克劳修斯–克拉珀龙方程展开左端：
$$
\ln\frac{p_\mathrm{A}^{*}(T_\mathrm{b}+\Delta T_\mathrm{b})}{p_\mathrm{A}^{*}(T_\mathrm{b})}
= -\frac{\Delta_\mathrm{vap}H}{R}\left(\frac{1}{T_\mathrm{b}+\Delta T_\mathrm{b}} - \frac{1}{T_\mathrm{b}}\right)
\approx \frac{\Delta_\mathrm{vap}H}{R\,T_\mathrm{b}^{2}}\,\Delta T_\mathrm{b}.
$$
左端即 $\ln(1/x_\mathrm{A}) = -\ln x_\mathrm{A} \approx x_\mathrm{B}$（稀溶液）。于是
$$
\Delta T_\mathrm{b} = \frac{R\,T_\mathrm{b}^{2}}{\Delta_\mathrm{vap}H}\,x_\mathrm{B}.
$$
把摩尔分数换算成质量摩尔浓度（$x_\mathrm{B} \approx n_\mathrm{B}/n_\mathrm{A} = M_\mathrm{A} m$，$M_\mathrm{A}$ 为溶剂的摩尔质量，以 $\mathrm{kg\,mol^{-1}}$ 计）即得 $\Delta T_\mathrm{b} = K_\mathrm{b} m$，其中 $K_\mathrm{b} = RT_\mathrm{b}^{2}M_\mathrm{A}/\Delta_\mathrm{vap}H$。对水：$K_\mathrm{b} = 8.314 \times 373.15^{2} \times 0.01802 / 40\,700 = 0.512\ \mathrm{K\,kg\,mol^{-1}}$，由分子数据重现了表列值。同样的论证搬到*熔化*线上——当液相中溶剂的化学势降到固相的值时溶液开始凝固——即得 $\Delta T_\mathrm{f} = K_\mathrm{f} m$，其中 $K_\mathrm{f} = RT_\mathrm{f}^{2}M_\mathrm{A}/\Delta_\mathrm{fus}H = 1.86\ \mathrm{K\,kg\,mol^{-1}}$（水）。$blacksquare$
:::

::: widget plot
f: a*1.86*x
x: 0, 5
y: 0, 10
sliders: a=1:1:4:0.01
labels: \text{freezing-point depression}
caption: 水溶液的凝固点降低 $\Delta T_\mathrm{f} = i K_\mathrm{f} m$，范特霍夫因子 $i$ 由滑块设定。$i = 1$（葡萄糖、尿素——非电解质）时，$1.0\ \mathrm{mol\,kg^{-1}}$ 溶液在 $-1.86\ ^\circ\mathrm{C}$ 凝固；$i = 1.87$（$0.1\ \mathrm{mol\,kg^{-1}}\ \mathrm{NaCl}$ 实测值）时同样质量摩尔浓度降低 $3.5\ ^\circ\mathrm{C}$。撒盐除冰的队伍和做冰淇淋的师傅就靠这条线的右端过活；汽车水箱则需要整条线，因为 $2\ \mathrm{mol\,kg^{-1}}$ 的*盐*腐蚀性无法接受，而 $10.8\ \mathrm{mol\,kg^{-1}}$ 的乙二醇——$i = 1$、不腐蚀——可保护到 $-20\ ^\circ\mathrm{C}$。
:::

::: example 用算术配防冻液 {#ex-antifreeze}
汽车水箱里有 $4.0\ \mathrm{kg}$ 水，要保护到 $-20\ ^\circ\mathrm{C}$，需要加入多少乙烷-1,2-二醇（乙二醇，$M = 62.07\ \mathrm{g\,mol^{-1}}$，$i = 1$）？
::: solution
所需的质量摩尔浓度为
$$
m = \frac{\Delta T_\mathrm{f}}{i\,K_\mathrm{f}} = \frac{20\ \mathrm{K}}{1 \times 1.86\ \mathrm{K\,kg\,mol^{-1}}} = 10.8\ \mathrm{mol\,kg^{-1}},
$$
故 $n = 10.8 \times 4.0 = 43\ \mathrm{mol}$，$m_{\mathrm{glycol}} = 43 \times 62.07 = 2.7\times10^{3}\ \mathrm{g} = 2.7\ \mathrm{kg}$，约 $2.4\ \mathrm{L}$ 液体（密度 $1.11\ \mathrm{g\,cm^{-3}}$）。这是很大的体积——水箱最后大约一半是乙二醇——它表明每摩尔的依数杠杆有多弱：凝固点降低是每个*粒子* $1.86\ \mathrm{K}$，所以保护到 $-20\ ^\circ\mathrm{C}$ 要付出十摩尔。同时提一句安全：甲醇以一半的质量就能给出同样的降低值，但它在体内被氧化成甲醛与甲酸，经口与吸入均中毒；乙二醇本身也有毒（代谢成草酸盐，损害肾脏），属危险液体管理，绝不存放在饮料瓶中。两者都要放在贴标签的容器里，在通风良好的环境中操作，洒漏要清理，而不是用水冲进下水道。
:::
:::

::: example 由凝固点求摩尔质量 {#ex-molar-mass-dtf}
把 $0.520\ \mathrm{g}$ 未知非电解质溶于 $50.0\ \mathrm{g}$ 水，凝固点降低 $0.108\ \mathrm{K}$。求摩尔质量。
::: solution
$$
m = \frac{\Delta T_\mathrm{f}}{K_\mathrm{f}} = \frac{0.108}{1.86} = 0.0581\ \mathrm{mol\,kg^{-1}},
\qquad
n = 0.0581 \times 0.0500 = 2.90\times10^{-3}\ \mathrm{mol},
$$
$$
M = \frac{0.520\ \mathrm{g}}{2.90\times10^{-3}\ \mathrm{mol}} = 179\ \mathrm{g\,mol^{-1}}.
$$
凝固点降低法之所以是真正有用的摩尔质量方法，正因为许多溶剂的 $K_\mathrm{f}$ 很大——苯的 $5.12$ 使其每摩尔的灵敏度是水的四倍。精度取决于 $\Delta T_\mathrm{f}$ 能测得多好：能读到 $0.01\ \mathrm{K}$ 的温度计把这次测定的误差限制在百分之几。
:::
:::

::: example 渗透压：最灵敏的杠杆 {#ex-osmotic}
求 $25\ ^\circ\mathrm{C}$ 时 $0.100\ \mathrm{mol\,dm^{-3}}$ 葡萄糖的渗透压，并比较渗透压法与凝固点降低法对 $0.100\ \mathrm{mol\,dm^{-3}}$ 溶液的灵敏度。
::: solution
$$
\Pi = i c R T = 1 \times 0.100\ \mathrm{mol\,dm^{-3}} \times 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 298.15\ \mathrm{K}
= 248\ \mathrm{J\,dm^{-3}} = 248\ \mathrm{kPa},
$$
约 $2.45\ \mathrm{atm}$——足以把水柱顶起 $25\ \mathrm{m}$ 高。同一溶液的凝固点降低只有 $0.186\ \mathrm{K}$，沸点升高只有 $0.051\ \mathrm{K}$。渗透压每摩尔的灵敏度高出数百倍，这就是它是大分子首选方法的原因：即便对 $M \sim 5\times10^{4}\ \mathrm{g\,mol^{-1}}$ 的蛋白质，$1\ \mathrm{g\,dm^{-3}}$ 溶液的 $\Pi$ 仍可测量，而 $\Delta T_\mathrm{f}$ 只有 $10^{-4}\ \mathrm{K}$。在生物学上，$248\ \mathrm{kPa}$ 正是支撑草本植物的膨压的量级；渗透是细胞在纯水中胀破、生菜叶萎蔫的原因；而反渗透——施加超过 $\Pi$ 的压力把水*压出*盐水——正是海水工业淡化的办法。
:::
:::

::: warning 依数性的陷阱 {#warn-colligative}
四个错误造成了大部分失分。(1) **$i$ 不是整数。** $0.100\ \mathrm{mol\,kg^{-1}}$ 的 $\mathrm{NaCl}$ 溶液凝固点降低 $0.348\ \mathrm{K}$，而不是 $0.372\ \mathrm{K}$：离子对使 $i = 1.87$。要用实测或题给的 $i$，绝不要为浓电解质臆造 $i = 2$。(2) **$\Delta T$ 定律用质量摩尔浓度，$\Pi = cRT$ 用物质的量浓度。** 沸点与凝固点定律因质量摩尔浓度而与温度无关；渗透测量在单一温度下进行，用物质的量浓度自然。(3) **渗透的方向与直觉相反。** 溶剂穿过半透膜*流向*较浓的一侧——粒子多的一侧最终体积更大。(4) **依数数的是粒子，不是分子。** $\mathrm{CaCl_2}$ 按每个化学式单位三个离子计（理想 $i = 3$）；共价非电解质按一个计；弱电解质如乙酸按 $1 + \alpha$ 计。
:::

## 后续内容

蒸气压是相变的平衡压力，而一般的平衡见 [[general-chemistry-2/chemical-equilibrium]]；建立在其上的酸碱与溶解度平衡从 [[general-chemistry-2/acids-bases]] 开始。本章用到的气体定律代数来自 [[general-chemistry-1/gases]]，溶液化学计量来自 [[general-chemistry-1/solutions-reactions]]，克劳修斯–克拉珀龙方程背后的焓来自 [[general-chemistry-1/thermochemistry]]。相律以及依数定律严格的化学势推导，见 [[thermodynamics/phase-equilibria]] 与 [[thermodynamics/mixtures]]。

::: summary
- 蒸气压是由温度与分子间力决定的强度性平衡性质；液体在其蒸气压等于外压时沸腾。
- 克劳修斯–克拉珀龙方程 $\ln(p_2/p_1) = -(\Delta_\mathrm{vap}H/R)(1/T_2 - 1/T_1)$ 把两个蒸气压测量变成摩尔汽化焓，并解释了高原烹饪与高压锅。
- 相图是这些方程的地图：水的三相点在 $1\ \mathrm{atm}$ 之下，二氧化碳的在 $1\ \mathrm{atm}$ 之上，这就是干冰升华的原因；冰–水线以 $-135\ \mathrm{bar\,K^{-1}}$ 向后倾斜，但压熔解释不了滑冰。
- 气体溶解度服从亨利定律 $c = k_\mathrm{H}p$；河里的氧与汽水里的气是同一个方程。
- 拉乌尔定律 $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$ 说理想溶液的蒸气压是纯值按摩尔分数的加权和；非挥发性溶质使其降低 $x_\mathrm{B}p_\mathrm{A}^{*}$。
- 四种依数性数的是粒子而不是物种：$\Delta T_\mathrm{b} = iK_\mathrm{b}m$、$\Delta T_\mathrm{f} = iK_\mathrm{f}m$、$\Pi = icRT$，其中 $K_\mathrm{b} = RT_\mathrm{b}^2 M_\mathrm{A}/\Delta_\mathrm{vap}H$ 与 $K_\mathrm{f} = RT_\mathrm{f}^2 M_\mathrm{A}/\Delta_\mathrm{fus}H$ 只是溶剂的性质。
- 渗透压是迄今最灵敏的依数杠杆，也是让水穿过细胞膜与海水淡化装置的那一个。
:::

## 练习

::: exercise 葡萄糖输液的凝固点 {level=1 check="0.465"}
计算 $0.250\ \mathrm{mol\,kg^{-1}}$ 葡萄糖水溶液的凝固点降低值。（以 $\mathrm{K}$ 为单位输入 $\Delta T_\mathrm{f}$。）
::: solution
葡萄糖是非电解质，$i = 1$：$\Delta T_\mathrm{f} = iK_\mathrm{f}m = 1 \times 1.86 \times 0.250 = 0.465\ \mathrm{K}$。溶液在 $-0.465\ ^\circ\mathrm{C}$ 凝固。
:::
:::

::: exercise 糖溶液的蒸气压 {level=1 check="3.16"}
计算 $25\ ^\circ\mathrm{C}$ 时 $0.200\ \mathrm{mol}$ 蔗糖溶于 $1.00\ \mathrm{kg}$ 水所得溶液的蒸气压。$p^{*}(\mathrm{H_2O}, 25\ ^\circ\mathrm{C}) = 3.17\ \mathrm{kPa}$。（以 $\mathrm{kPa}$ 为单位输入 $p$。）
::: solution
$n_\mathrm{water} = 1000/18.02 = 55.5\ \mathrm{mol}$，故 $x_\mathrm{water} = 55.5/(55.5+0.200) = 0.9964$，$p = 0.9964 \times 3.17 = 3.16\ \mathrm{kPa}$。
:::
:::

::: exercise 代血浆的渗透压 {level=1 check="387"}
静脉注射用葡萄糖液的浓度为 $0.150\ \mathrm{mol\,dm^{-3}}$。计算其在 $37\ ^\circ\mathrm{C}$ 的渗透压。（以 $\mathrm{kPa}$ 为单位输入 $\Pi$。）
::: solution
$\Pi = icRT = 1 \times 0.150 \times 8.314 \times 310.15 = 387\ \mathrm{kPa}$，约 $3.8\ \mathrm{atm}$——与血液的渗透压接近，这就是该浓度称为等渗的原因。
:::
:::

::: exercise 苯的摩尔汽化焓 {level=2 check="31.1"}
苯在 $40.0\ ^\circ\mathrm{C}$ 的蒸气压为 $26.1\ \mathrm{kPa}$，在 $101.325\ \mathrm{kPa}$ 下于 $80.1\ ^\circ\mathrm{C}$ 沸腾。估算 $\Delta_\mathrm{vap}H$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入 $\Delta_\mathrm{vap}H$。）
::: solution
$\Delta_\mathrm{vap}H = R\ln(p_2/p_1)/(1/T_1 - 1/T_2) = 8.314 \times \ln(101.325/26.1)/(1/313.15 - 1/353.25) = 8.314 \times 1.357/3.625\times10^{-4} = 31.1\ \mathrm{kJ\,mol^{-1}}$，与表列值 $30.8\ \mathrm{kJ\,mol^{-1}}$ 符合良好。
:::
:::

::: exercise 山上烧水 {level=2 check="96.0"}
某高山气象站气压计读数为 $88.0\ \mathrm{kPa}$。水在那里什么温度沸腾？取 $\Delta_\mathrm{vap}H = 40.7\ \mathrm{kJ\,mol^{-1}}$。（以 $^\circ\mathrm{C}$ 为单位输入 $T$。）
::: solution
$1/T = 1/373.15 - (R/\Delta_\mathrm{vap}H)\ln(88.0/101.325) = 2.6799\times10^{-3} + 0.287\times10^{-4} = 2.7086\times10^{-3}\ \mathrm{K^{-1}}$，故 $T = 369.2\ \mathrm{K} = 96.0\ ^\circ\mathrm{C}$。茶能泡开，豆子却煮不烂——这就是山区厨房离不开高压锅的原因。
:::
:::

::: exercise 凝固点降低法测摩尔质量 {level=2 check="179"}
把 $0.520\ \mathrm{g}$ 某非电解质溶于 $50.0\ \mathrm{g}$ 水，凝固点降低 $0.108\ \mathrm{K}$。求摩尔质量。（以 $\mathrm{g\,mol^{-1}}$ 为单位输入 $M$。）
::: solution
$m = 0.108/1.86 = 0.0581\ \mathrm{mol\,kg^{-1}}$；$n = 0.0581 \times 0.0500 = 2.90\times10^{-3}\ \mathrm{mol}$；$M = 0.520/2.90\times10^{-3} = 179\ \mathrm{g\,mol^{-1}}$。
:::
:::

::: exercise 推导克劳修斯–克拉珀龙方程 {level=3}
写出克拉珀龙方程，并由它推导克劳修斯–克拉珀龙方程，逐一指明每个近似。为什么这个近似在临界点附近严重失效？
::: solution
克拉珀龙方程 $\mathrm{d}p/\mathrm{d}T = \Delta H/(T\Delta V)$ 由共存线上两相化学势相等导出。三个近似把它变成克劳修斯–克拉珀龙形式：(i) $\Delta V \approx V_\mathrm{m,gas}$，略去液体体积——在 $1\ \mathrm{atm}$ 下误差约 $0.2\ \%$；(ii) 理想气体 $V_\mathrm{m,gas} = RT/p$——低压下良好，是沸点附近极性液体的主要误差来源；(iii) $\Delta_\mathrm{vap}H$ 与 $T$ 无关，在温度区间 $\Delta T$ 上引入量级为 $(C_{p,\mathrm{g}} - C_{p,\mathrm{l}})\Delta T/T$ 的误差。在临界点附近三个近似同时失效：液、气摩尔体积变得相等，故 $\Delta V \rightarrow 0$，克拉珀龙斜率保持有限，而理想气体的替代毫无意义；$\Delta_\mathrm{vap}H$ 在 $T_\mathrm{c}$ 处趋于 $0$。水在 $0$–$370\ ^\circ\mathrm{C}$ 的 $\ln p$ 对 $1/T$ 图明显弯曲，直线处理只是一个局部工具。
:::
:::

::: exercise 又煮又冻：鉴定溶质 {level=3}
$30.0\ \mathrm{g}$ 某未知非电解质溶于 $250\ \mathrm{g}$ 水，在 $-0.930\ ^\circ\mathrm{C}$ 凝固。求溶质的质量摩尔浓度与摩尔质量，并预测同一溶液的沸点。
::: solution
质量摩尔浓度可由凝固点直接得出：$m = \Delta T_\mathrm{f}/K_\mathrm{f} = 0.930/1.86 = 0.500\ \mathrm{mol\,kg^{-1}}$。溶质的物质的量为 $0.500 \times 0.250 = 0.125\ \mathrm{mol}$，故 $M = 30.0/0.125 = 240\ \mathrm{g\,mol^{-1}}$。沸点升高为 $\Delta T_\mathrm{b} = 0.512 \times 0.500 = 0.256\ \mathrm{K}$，所以溶液沸点为 $100.256 \approx 100.26\ ^\circ\mathrm{C}$。本题的要点：一次依数测量就确定了粒子浓度，而*其他一切*依数性质随之而定——四种性质是一件事的四种测法，它们之间的自洽正是溶质为非电解质的经典判据。
:::
:::

::: exercise 渗透压法测蛋白质的摩尔质量 {level=3 check="50.5"}
把 $25.0\ \mathrm{mg}$ 某蛋白质溶于 $25.0\ \mathrm{cm^3}$ 水（$\rho = 1.00\ \mathrm{g\,cm^{-3}}$），在 $25.0\ ^\circ\mathrm{C}$ 产生的渗透压能支持 $5.00\ \mathrm{mm}$ 高的水柱。计算该蛋白质的摩尔质量。（以 $\mathrm{kg\,mol^{-1}}$ 为单位输入 $M$。）
::: solution
渗透压为 $\Pi = \rho g \Delta h = 1000\ \mathrm{kg\,m^{-3}} \times 9.81\ \mathrm{m\,s^{-2}} \times 5.00\times10^{-3}\ \mathrm{m} = 49.1\ \mathrm{Pa}$。质量浓度 $c = 25.0\ \mathrm{mg}/25.0\ \mathrm{cm^3} = 1.00\ \mathrm{kg\,m^{-3}}$，由 $\Pi V = nRT$，
$$
M = \frac{cRT}{\Pi} = \frac{1.00 \times 8.314 \times 298.15}{49.1} = 50.5\ \mathrm{kg\,mol^{-1}},
$$
即 $5.05\times10^{4}\ \mathrm{g\,mol^{-1}}$。同一溶液的凝固点降低只有 $2.7\times10^{-4}\ \mathrm{K}$——无法测量——这就是渗透压法成为测定蛋白质摩尔质量经典方法的全部理由。
:::
:::
