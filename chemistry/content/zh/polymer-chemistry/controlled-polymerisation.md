1956 年，在雪城大学（Syracuse）的 Szwarc 把一管萘钠的绿色溶液加到溶有苯乙烯的四氢呋喃（THF）中。溶液变为樱桃红、发热，几秒之内随着苯乙烯被消耗而变得黏稠。然后一切静止：红色保持不退。再加入苯乙烯，溶液重新发热，黏度重新上升。若改加异戊二烯，异戊二烯便聚合到现有链的*末端上*。链并没有死。它们的末端携带着仍然活泼、等待着单体的碳负离子，Szwarc 把它们称为**活性聚合物（living polymers）**。在[[polymer-chemistry/radical-polymerisation]]的自由基聚合中，每条链只存活约一秒钟，遇到另一个自由基便死亡。活性链只要溶液保持洁净就一直活着。正是这一个差别使四件事成为可能。摩尔质量可由单体与引发剂之比预先选定。分布可以做得几乎均匀。可以加入第二种单体制备**嵌段共聚物**。链端还可以在聚合结束时被接上选定的官能团。

本章讲的是实现这种控制的方法。**阴离子**与**阳离子**聚合使用离子型活性中心，同性电荷彼此不能结合。**可逆失活自由基聚合**（NMP、ATRP 与 RAFT）保留自由基化学，却让几乎每一条链几乎全程处于休眠状态。**开环聚合**把张力环变成聚酯、聚醚与聚酰胺。**配位聚合**使用齐格勒-纳塔与茂金属催化剂，在金属中心上决定[[polymer-chemistry/polymer-structure#def-tacticity]]的立构规整度，生产出世界上大部分聚烯烃。它们的化学各不相同，却共享同一套动力学逻辑，我们就从这里开始。

## 什么使聚合成为活性的

::: definition 活性聚合与受控聚合 {#def-living}
**活性聚合**是指不存在链转移与链终止的链式聚合。单体耗尽后活性中心仍然存在，加入更多单体时恢复增长。若此外引发比增长快得多，使所有链同时开始，且各种活性形式之间的交换比增长快，则聚合是**受控**的。实验判据为：

1. $\ln([\mathrm{M}]_0/[\mathrm{M}])$ 对时间**呈线性**（活性中心数目恒定）；
2. $\bar{X}_\mathrm{n}$ 对转化率 $x$ **呈线性**，且每个增长端等于 $x[\mathrm{M}]_0/[\mathrm{I}]_0$；
3. 分散度**低**（$Đ \lesssim 1.1$）且随转化率增大而下降；
4. 链可以被**延伸**：加入新鲜单体，使整个分布干净地移向更高的摩尔质量。

IUPAC 对[[#sec-rdrp]]中的自由基方法推荐使用**可逆失活自由基聚合**（RDRP）一词，因为这类方法是受控的而非严格活性的——总会发生一些终止。
:::

::: proposition 理想活性聚合中的摩尔质量与分布 {#prop-living}
在瞬时引发的活性聚合中，每个引发剂分子产生 $n_\mathrm{e}$ 个增长端（丁基锂为 1，双阴离子为 2），增长速率常数为 $k_\mathrm{p}$，无终止也无转移：

1. 活性中心数目恒定，$[\mathrm{P^*}] = n_\mathrm{e}[\mathrm{I}]_0$，于是
$$
\ln\frac{[\mathrm{M}]_0}{[\mathrm{M}]} = k_\mathrm{p}[\mathrm{P^*}]\,t ;
$$ {#eq-living-rate}
2. 在转化率 $x$ 下，数均聚合度为
$$
\bar{X}_\mathrm{n} = \frac{x[\mathrm{M}]_0}{[\mathrm{I}]_0}
$$ {#eq-living-xn}
即每个*分子*的单体单元数，每个增长端则为 $x[\mathrm{M}]_0/(n_\mathrm{e}[\mathrm{I}]_0)$；
3. 每个端加入的单体单元数服从平均值为 $\nu = x[\mathrm{M}]_0/[\mathrm{P^*}]$ 的**泊松分布**，于是对单官能引发剂（计入引发单元，$\bar{X}_\mathrm{n} = \nu + 1$）
$$
Đ = 1 + \frac{\nu}{(\nu+1)^2} \approx 1 + \frac{1}{\bar{X}_\mathrm{n}} .
$$ {#eq-poisson-d}
:::

::: proof
(1) 无终止时，$[\mathrm{P^*}]$ 从不改变，$-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{P^*}][\mathrm{M}]$ 是拟一级速率律。积分即得[[#eq-living-rate]]。

(2) 每个被消耗的单体都在某条链上，而链的数目等于引发剂分子的数目，每条链带有 $n_\mathrm{e}$ 个端。因此每个分子的单体数为 $x[\mathrm{M}]_0/[\mathrm{I}]_0$，每个端的单体数即此值再除以 $n_\mathrm{e}$。

(3) 跟踪一个增长端。在每个短的时间间隔 $\mathrm{d}t$ 内，它以概率 $k_\mathrm{p}[\mathrm{M}](t)\,\mathrm{d}t$ 加上一个单体，与它的历史和其他端无关，因为增长是一个无记忆、速率常数与链长无关的基元反应。这类过程在时间 $t$ 内发生的事件数服从泊松分布，均值等于速率的积分，$\nu = \int_0^t k_\mathrm{p}[\mathrm{M}]\,\mathrm{d}t' = ([\mathrm{M}]_0 - [\mathrm{M}])/[\mathrm{P^*}]$。第二个等式成立，是因为 $[\mathrm{P^*}]$ 个端平均地均分被消耗的单体。单元数为 $\nu + 1$、$\nu$ 服从泊松分布的链的分散度已在[[polymer-chemistry/polymer-structure]]的习题中算过：$\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n} = (\nu^2 + 3\nu + 1)/(\nu+1)^2 = 1 + \nu/(\nu+1)^2$。$\blacksquare$
:::

（对双官能引发剂，分子从两端同时增长，所以每个端只加上分子所含单元数的一半。）泊松分布极窄。100 个单元的链 $Đ \approx 1.01$，相对标准差 10%。真实的活性聚合物达不到这一极限，主要因为引发不是瞬时的（慢引发剂让先起的链抢跑）、单体加入快于混合，以及杂质造成的痕量终止。$Đ = 1.02$–$1.05$ 的阴离子聚苯乙烯已是常规水平，正是尺寸排阻色谱校准标样的材料。

::: widget distribution
dist: poisson
params: lambda=20
normal: true
caption: 理想活性聚合中每条链加入的单体单元数的泊松分布（[[#prop-living]]），此处为平均 $\nu = 20$ 次加成及其正态近似。宽度为 $\sqrt{\nu}$，所以*相对*宽度 $1/\sqrt{\nu}$ 随链增长而缩小：$\nu = 20$ 时链与链相差约 $\pm22\%$，$\nu = 400$ 时约 $\pm5\%$。对比[[polymer-chemistry/polymer-structure#def-flory]]的最可能分布，其相对宽度无论链多长都保持在 100%。滑块改变 $\nu$，从而改变分散度 $1 + \nu/(\nu+1)^2$。
:::

## 阴离子聚合

能进行阴离子聚合的单体带有可稳定相邻碳上负电荷的取代基：苯基（苯乙烯）、乙烯基（丁二烯、异戊二烯）、酯基（甲基丙烯酸酯、丙烯酸酯）、氰基（丙烯腈），环状单体中则有环氧化物、内酯与硅氧烷。增长物种是与金属抗衡离子（通常是 $\mathrm{Li^+}$、$\mathrm{Na^+}$ 或 $\mathrm{K^+}$）配对的碳负离子（或醇盐负离子、硅醇盐负离子）。

**引发**通过亲核加成或电子转移进行。丁基锂直接加成：C–Li 键进攻苯乙烯的 $\mathrm{CH_2}$ 端，电子对形成新的 C–C 键，留下与 $\mathrm{Li^+}$ 配对的苄基碳负离子。通常选用*仲*丁基锂，因为它在烃中快速引发苯乙烯，而*正*丁基锂引发慢，从而加宽分布。在**电子转移**引发中，萘自由基负离子把一个电子交给苯乙烯，生成苯乙烯自由基负离子。两个这样的物种在自由基端偶合，生成**双阴离子** $^{-}\mathrm{CH(Ph)CH_2{-}CH_2CH(Ph)}^{-}$，它从两端增长。这就是 Szwarc 的体系，也是制备对称三嵌段共聚物的路线。

**不存在终止**，因为两个碳负离子互相排斥，而抗衡离子不能加到链上。但碳负离子是强碱和强亲核试剂，浓度低至百万分之几的水、醇、氧、二氧化碳和酸就能把它们摧毁，所以阴离子聚合需要严格纯化的单体和溶剂，并在惰性气氛或高真空下进行。烷基锂是自燃的（GHS：自燃液体、遇水反应、具有腐蚀性）。必须由受过训练的人员在惰性气体下用无氧无水处理技术操作，绝不能在敞开的实验台上进行。对杂质的敏感在收尾时被反转为优势：通过加入终止剂，有意识地给活性链做**端基官能化**。$\mathrm{CO_2}$ 给出羧酸盐端基，环氧乙烷给出羟基端基，氯硅烷把链偶合成星形。

::: example 设计一条活性阴离子聚苯乙烯链 {#ex-anionic}
$20.0\ \mathrm{g}$ 苯乙烯在环己烷中用 $1.00\ \mathrm{mmol}$ *仲*丁基锂聚合完全，链用甲醇终止。预言 $\bar{X}_\mathrm{n}$、$\bar{M}_\mathrm{n}$ 与理想分散度。若改用 $1.00\ \mathrm{mmol}$ 萘钠（每个钠给出一个电子，生成双阴离子），结果有何不同？
::: solution
用*仲*-BuLi 时每个引发剂分子给出一条链，所以 $\bar{M}_\mathrm{n}$ 等于每摩尔引发剂对应的单体质量加上端基（一端为 $\mathrm{C_4H_9}$，另一端为甲醇给出的 H，合计 $58.12\ \mathrm{g\,mol^{-1}}$）：
$$
\bar{M}_\mathrm{n} = \frac{20.0\ \mathrm{g}}{1.00\times10^{-3}\ \mathrm{mol}} + 58 = 2.01\times10^{4}\ \mathrm{g\,mol^{-1}},
\qquad
\bar{X}_\mathrm{n} = \frac{20\,000}{104.15} = 192 .
$$
[[#eq-poisson-d]]给出泊松极限 $Đ = 1 + 191/192^2 = 1.005$。实测的 1.02–1.04 反映引发与混合速率并非无限快。

用萘钠时，两个萘钠离子（两个电子）生成一个双阴离子，所以 $1.00\ \mathrm{mmol}$ 萘钠生成 $0.50\ \mathrm{mmol}$ 链，每条链从两端增长。于是 $\bar{M}_\mathrm{n} \approx 20.0/5.0\times10^{-4} = 4.0\times10^{4}\ \mathrm{g\,mol^{-1}}$，带有两个终止氢原子而没有丁基。摩尔质量翻倍，因为分子数减半。
:::
:::

### 离子对与自由离子

阴离子增长的速率常数强烈依赖溶剂和抗衡离子，因为"活性中心"实际上是几种处于平衡的物种。在 THF 中，聚苯乙烯基钠主要以**离子对** $\mathrm{P^-Na^+}$ 存在，只有极小部分解离为**自由离子** $\mathrm{P^-}$ 与 $\mathrm{Na^+}$。自由阴离子的反应性约高出一千倍。

::: proposition 离子对与自由离子存在时的表观增长速率常数 {#prop-ion-pairs}
设链端为离子对（速率常数 $k_\mathrm{p}^{\pm}$），与自由离子（速率常数 $k_\mathrm{p}^{-}$）平衡，$\mathrm{P^-M^+} \rightleftharpoons \mathrm{P^-} + \mathrm{M^+}$，解离常数为 $K_\mathrm{D}$，总浓度为 $[\mathrm{P^*}]$，且不加盐。若自由离子分数 $\alpha$ 很小，
$$
k_\mathrm{p}^\text{app} = \frac{R_\mathrm{p}}{[\mathrm{P^*}][\mathrm{M}]} = k_\mathrm{p}^{\pm} + \left(k_\mathrm{p}^{-} - k_\mathrm{p}^{\pm}\right)\alpha \approx k_\mathrm{p}^{\pm} + k_\mathrm{p}^{-}\left(\frac{K_\mathrm{D}}{[\mathrm{P^*}]}\right)^{1/2} .
$$ {#eq-kapp}
以 $k_\mathrm{p}^\text{app}$ 对 $[\mathrm{P^*}]^{-1/2}$ 作图为直线，截距为 $k_\mathrm{p}^{\pm}$，斜率为 $k_\mathrm{p}^{-}K_\mathrm{D}^{1/2}$。
:::

::: proof
速率是两种物种贡献之和：$R_\mathrm{p} = k_\mathrm{p}^{-}[\mathrm{P^-}][\mathrm{M}] + k_\mathrm{p}^{\pm}[\mathrm{P^-M^+}][\mathrm{M}]$。由 $[\mathrm{P^-}] = \alpha[\mathrm{P^*}]$ 与 $[\mathrm{P^-M^+}] = (1-\alpha)[\mathrm{P^*}]$，除以 $[\mathrm{P^*}][\mathrm{M}]$ 即得第一种形式。无外加盐时 $[\mathrm{M^+}] = [\mathrm{P^-}]$，故 $K_\mathrm{D} = \alpha^2[\mathrm{P^*}]/(1-\alpha)$。当 $\alpha \ll 1$ 时得 $\alpha \approx (K_\mathrm{D}/[\mathrm{P^*}])^{1/2}$。代入并略去 $k_\mathrm{p}^{\pm}\alpha$（相对 $k_\mathrm{p}^{-}\alpha$ 为小量），即得第二种形式。$\blacksquare$
:::

::: example 速率中有多少来自自由离子？ {#ex-free-ions}
对 $25\ ^\circ\mathrm{C}$ 下 THF 中的聚苯乙烯基钠，取 $k_\mathrm{p}^{\pm} = 80$、$k_\mathrm{p}^{-} = 6.5\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$K_\mathrm{D} = 1.5\times10^{-7}\ \mathrm{mol\,dm^{-3}}$（Szwarc 与 Schulz 课题组的近似文献值）。当 $[\mathrm{P^*}] = 1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ 时，求自由离子分数、$k_\mathrm{p}^\text{app}$、自由离子承担的增长份额，以及单体的半衰期。
::: solution
$\alpha = (1.5\times10^{-7}/1.0\times10^{-3})^{1/2} = 1.22\times10^{-2}$。只有约 1.2% 的链端是自由离子。（精确的二次方程给出 $1.217\times10^{-2}$，三位有效数字相同。）于是
$$
k_\mathrm{p}^\text{app} = 80 + (6.5\times10^{4})(1.22\times10^{-2}) = 80 + 796 = 876\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
自由离子虽只占链端的 1.2%，却承担了 $796/876 = 91\%$ 的增长。由[[#eq-living-rate]]，单体的半衰期为
$$
t_{1/2} = \frac{\ln 2}{k_\mathrm{p}^\text{app}[\mathrm{P^*}]} = \frac{0.693}{(876)(1.0\times10^{-3})\ \mathrm{s^{-1}}} = 0.79\ \mathrm{s} .
$$
THF 中的阴离子聚合几秒之内即告结束，这就解释了 Szwarc 感受到的温热。加入同离子盐（如四苯基硼酸钠）会抑制解离，把反应减慢到离子对的速率。在环己烷这类烃中，有机锂端发生聚集（聚苯乙烯基锂形成二聚体），因此聚合慢得多，且对 $[\mathrm{P^*}]$ 呈分数级数，约为二分之一。
:::
:::

溶剂还控制聚二烯的*微观结构*。烃中的锂给出的聚异戊二烯含 90% 以上的*顺*式-1,4 单元，即合成天然橡胶。在 THF 中，或改用钠、钾抗衡离子时，同一单体主要给出 3,4-和 1,2-单元。极性溶剂把离子对拆开，改变烯丙基负离子的哪一个碳进攻下一个单体。**苯乙烯-丁二烯-苯乙烯**（SBS）三嵌段共聚物由顺序阴离子加法制成，是热塑性弹性体。其聚苯乙烯端段形成玻璃态微区，为橡胶态聚丁二烯中间段充当物理交联点，详见[[polymer-chemistry/copolymerisation]]。

## 阳离子聚合

带有给电子取代基（能稳定碳正离子）的单体进行阳离子聚合。例子有异丁烯（2-甲基丙烯）、乙烯基醚、苯乙烯及其 4-甲氧基衍生物，环状单体中则有 THF 与其他环醚。引发使用质子酸，或使用路易斯酸（$\mathrm{BF_3}$、$\mathrm{AlCl_3}$、$\mathrm{TiCl_4}$）并提供共引发剂（痕量水或烷基卤化物）以供给阳离子。例如 $\mathrm{BF_3}$ 与水的作用相当于强酸 $\mathrm{H^+[BF_3OH]^-}$。质子加到异丁烯的 $\mathrm{CH_2}$ 端生成叔碳正离子，随后单体依次加到碳正离子的空 p 轨道上。

传统阳离子聚合远非活性。碳正离子带有酸性的 $\beta$-氢，**向单体的 β-质子转移**与增长竞争：$\mathrm{\sim CH_2C^+(CH_3)_2} + \mathrm{CH_2{=}C(CH_3)_2} \rightarrow \mathrm{\sim CH{=}C(CH_3)_2} + (\mathrm{CH_3})_3\mathrm{C^+}$。这就终止了一条链并引发另一条链，即向单体转移，且 $C_\mathrm{M}$ 很大。转移的活化能比增长高，所以降温会使其重要性下降。丁基橡胶（异丁烯与约 2% 异戊二烯共聚，留待后续硫化）因此是在约 $-100\ ^\circ\mathrm{C}$ 下、几秒之内制得的。活性阳离子聚合在 1980 年代成为可能，当时 Higashimura 与 Sawamoto（乙烯基醚）以及 Kennedy 与 Faust（异丁烯）发现了这样的引发体系：碳正离子与一个**休眠**的共价物种（如由弱路易斯酸可逆活化的 C–I 或 C–Cl 键）快速平衡。这一可逆失活的思路随后被搬到了自由基体系。

::: warning "没有终止"不等于"杂质无所谓" {#warn-living-impurity}
一种常见的误读是：活性聚合没有终止步骤，所以对杂质很皮实。事实正相反。正因为没有*本征的*终止，每一条链都会被碰到它的第一滴水、醇、氧或酸分子杀死，而每个这样的分子都*按化学计量*杀死一条链。链端浓度为 $10^{-3}\ \mathrm{mol\,dm^{-3}}$ 时，$18\ \mathrm{mg\,dm^{-3}}$ 的水（即 $10^{-3}\ \mathrm{mol\,dm^{-3}}$）就能把它们全部摧毁。更少的量会在聚合开始前杀死一部分引发剂，使 $\bar{M}_\mathrm{n}$ 高于设计值；或使生长中的链中途夭折，加宽分布。活性离子聚合是本课程中对杂质*最*敏感的方法，而能容忍水的传统自由基聚合是最不敏感的。RDRP 居于两者之间。这种耐受性正是其吸引力的重要组成部分。
:::

## 可逆失活自由基聚合 {#sec-rdrp}

无法阻止自由基终止：两个自由基相遇几乎以扩散极限的速率化合。然而终止速率正比于 $[\mathrm{P\cdot}]^2$，增长速率正比于 $[\mathrm{P\cdot}]$。如果几乎每一条链几乎全部时间都处于不能终止的**休眠**态，只是短暂、反复地被活化，加上几个单体后再次失活，那么就有三个结果。任一时刻活泼自由基的浓度极小。因终止而损失的链的分数很小。每条链在上千个活化循环中每个循环都增长一点，使链长趋于均等，正如泊松论证所要求的。

::: definition 可逆失活与持久自由基效应 {#def-rdrp}
在**可逆失活自由基聚合**中，增长自由基 $\mathrm{P_n\cdot}$ 与既不增长也不终止的休眠物种 $\mathrm{P_n{-}X}$ 快速平衡：
$$
\mathrm{P_n{-}X} \;\underset{k_\mathrm{deact}}{\overset{k_\mathrm{act}}{\rightleftharpoons}}\; \mathrm{P_n\cdot} + \mathrm{X^\bullet}
$$
这里 $\mathrm{X^\bullet}$ 是一个**持久**物种——一个稳定自由基（氮氧自由基）或被氧化的金属配合物——它不与自身反应。三大类是：

- **氮氧稳定自由基聚合**（NMP）：$\mathrm{X}$ 是 TEMPO 一类的氮氧自由基，烷氧胺的 C–ON 键受热断裂。
- **原子转移自由基聚合**（ATRP）：$\mathrm{P{-}X}$ 是烷基卤化物，铜(I)配合物攫取卤原子，$\mathrm{P{-}Br} + \mathrm{Cu^{I}L} \rightleftharpoons \mathrm{P\cdot} + \mathrm{Br{-}Cu^{II}L}$。
- **可逆加成-断裂链转移聚合**（RAFT）：硫代羰基硫化合物 $\mathrm{Z{-}C(=S){-}S{-}R}$ 通过*简并转移*在链之间交换。自由基加到 C=S 上，中间体断裂释放出另一个不同的自由基。自由基数目由常规引发剂决定，RAFT 试剂把增长分配给所有链。

**持久自由基效应**（Fischer）解释了 NMP 与 ATRP 为何能自我调节。早期的终止事件摧毁了一些 $\mathrm{P\cdot}$，却留下它们的伙伴 $\mathrm{X^\bullet}$，后者不断累积。过量的 $\mathrm{X^\bullet}$ 使平衡移向休眠一边，终止随之减缓到几乎停滞。
:::

::: proposition ATRP 的速率 {#prop-atrp}
若 ATRP 的活化-失活平衡（常数 $K_\mathrm{ATRP} = k_\mathrm{act}/k_\mathrm{deact}$）全程维持，且终止可忽略，则
$$
[\mathrm{P\cdot}] = K_\mathrm{ATRP}\frac{[\mathrm{P{-}X}][\mathrm{Cu^{I}}]}{[\mathrm{X{-}Cu^{II}}]},
\qquad
\ln\frac{[\mathrm{M}]_0}{[\mathrm{M}]} = k_\mathrm{p}K_\mathrm{ATRP}\frac{[\mathrm{P{-}X}]_0[\mathrm{Cu^{I}}]}{[\mathrm{X{-}Cu^{II}}]}\,t ,
$$ {#eq-atrp}
摩尔质量按[[#eq-living-xn]]的方式增长，其中 $[\mathrm{I}]_0 = [\mathrm{P{-}X}]_0$，即烷基卤化物引发剂。
:::

::: proof
平衡时 $k_\mathrm{act}[\mathrm{P{-}X}][\mathrm{Cu^{I}}] = k_\mathrm{deact}[\mathrm{P\cdot}][\mathrm{X{-}Cu^{II}}]$，整理即得第一个结果。几乎每条链都处于休眠态，故 $[\mathrm{P{-}X}] \approx [\mathrm{P{-}X}]_0$；无终止时，铜的氧化态之比保持恒定。于是 $[\mathrm{P\cdot}]$ 恒定，$-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{P\cdot}][\mathrm{M}]$ 积分得一级速率律。链的数目由引发性卤化物分子的数目固定，所以 $\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{P{-}X}]_0$。$\blacksquare$
:::

[[#eq-atrp]]给出了可用的杠杆。速率由两种铜氧化态的*比值*决定，而不是铜的总量。稳定 $\mathrm{Cu^{II}}$ 的配体（如三[2-(二甲氨基)乙基]胺）能使 $K_\mathrm{ATRP}$ 提高若干个数量级。现代变体（"ARGET"、"ICAR" 以及电化学或光化学介导的 ATRP）连续再生 $\mathrm{Cu^{I}}$，因而可用百万分之一级别的铜。产物分布有多窄，取决于每条链经历了多少个活化-失活循环。动力学分析（出自 Matyjaszewski 与 Fukuda 的课题组）给出，在快引发、终止可忽略时，
$$
Đ = 1 + \frac{1}{\bar{X}_\mathrm{n}} + \frac{k_\mathrm{p}[\mathrm{P{-}X}]_0}{k_\mathrm{deact}[\mathrm{X{-}Cu^{II}}]}\left(\frac{2}{x} - 1\right) .
$$ {#eq-atrp-d}
最后一项是链在每次活化中加上的单体数与链长之比。失活快、失活剂充足就使它变小，并随转化率 $x$ 升高而下降。这正是[[#def-living]]中"分散度随转化率下降"的判据。

::: widget plot
f: 1 + 1/(n*x) + c*(2/x - 1)
x: 0.05, 1
y: 1, 2
sliders: n=200:20:1000:10; c=0.05:0:0.5:0.01
labels: Đ
caption: 由[[#eq-atrp-d]]得到的 ATRP 中分散度随转化率 $x$ 的变化，滑块设定目标聚合度 $n = [\mathrm{M}]_0/[\mathrm{P{-}X}]_0$（于是 $\bar{X}_\mathrm{n} = nx$）与控制参数 $c = k_\mathrm{p}[\mathrm{P{-}X}]_0/(k_\mathrm{deact}[\mathrm{X{-}Cu^{II}}])$。反应早期每条链经历的活化循环很少，$Đ$ 很高。随转化率上升，统计趋于均匀，$Đ$ 下降到 $1 + 1/\bar{X}_\mathrm{n}$ 附近。调大 $c$（失活剂太慢，或 $\mathrm{Cu^{II}}$ 太少）聚合物就保持宽分布。$c \to 0$ 时曲线趋于泊松极限。这里忽略的终止最终会在高转化率处把 $Đ$ 重新推高。
:::

::: example 苯乙烯的一次 ATRP {#ex-atrp}
苯乙烯（$[\mathrm{M}]_0 = 8.7\ \mathrm{mol\,dm^{-3}}$，本体）在 $110\ ^\circ\mathrm{C}$ 下聚合，引发剂为 1-溴乙基苯，$[\mathrm{P{-}X}]_0 = [\mathrm{M}]_0/100$，催化剂为溴化铜-联吡啶。取 $K_\mathrm{ATRP} = 4\times10^{-8}$、$[\mathrm{Cu^I}]/[\mathrm{Cu^{II}}] = 10$、$k_\mathrm{p} = 1.58\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（由 IUPAC 基准 Arrhenius 表达式得出）、$k_\mathrm{deact} = 1\times10^{7}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$[\mathrm{Cu^{II}}] = 8.7\times10^{-3}\ \mathrm{mol\,dm^{-3}}$（数值量级真实）。求 $[\mathrm{P\cdot}]$、达到 60% 转化率所需的时间，以及此时 $\bar{M}_\mathrm{n}$ 与 $Đ$。
::: solution
$[\mathrm{P{-}X}]_0 = 0.087\ \mathrm{mol\,dm^{-3}}$。由[[#eq-atrp]]，
$$
[\mathrm{P\cdot}] = (4\times10^{-8})(0.087)(10) = 3.5\times10^{-8}\ \mathrm{mol\,dm^{-3}},
\qquad
k_\mathrm{p}[\mathrm{P\cdot}] = (1.58\times10^{3})(3.5\times10^{-8}) = 5.5\times10^{-5}\ \mathrm{s^{-1}} .
$$
$x = 0.60$ 时，$\ln(1/0.40) = 0.916$，所以 $t = 0.916/5.5\times10^{-5} = 1.7\times10^{4}\ \mathrm{s} \approx 4.6\ \mathrm{h}$。自由基浓度与传统聚合（[[polymer-chemistry/radical-polymerisation]]）中的相近，但现在链的数目为 $0.087\ \mathrm{mol\,dm^{-3}}$，比自由基多 $2.5\times10^{6}$ 倍。每条链只有约 $2.5\times10^{6}$ 分之一的时间处于活泼状态。

60% 转化率时，$\bar{X}_\mathrm{n} = 0.60\times100 = 60$，$\bar{M}_\mathrm{n} = 60\times104.15 + 185$（$\mathrm{C_8H_9Br}$ 端基）$= 6.4\times10^{3}\ \mathrm{g\,mol^{-1}}$。控制项 $c = (1.58\times10^{3})(0.087)/[(1\times10^{7})(8.7\times10^{-3})] = 1.6\times10^{-3}$，于是[[#eq-atrp-d]]给出
$$
Đ = 1 + \frac{1}{60} + (1.6\times10^{-3})\left(\frac{2}{0.60} - 1\right) = 1 + 0.017 + 0.004 = 1.02 .
$$
:::
:::

### RAFT

RAFT 的工作原理不同。自由基总数由常规引发剂决定，与[[polymer-chemistry/radical-polymerisation]]完全一样。用量大得多的 RAFT 试剂使自由基在链之间*交换*得如此之快，以致每条链都分到均等的增长份额。每次加成-断裂事件把自由基从一条链移到另一条链，而不改变总数。因此速率与自由基浓度就是常规体系的数值，终止仍然发生。但每一次终止只杀死 RAFT 试剂所承载的众多链中的一条。链的数目是 RAFT 试剂分子的数目加上由引发剂衍生自由基引发的链的数目：
$$
\bar{M}_\mathrm{n} \approx \frac{x[\mathrm{M}]_0M_0}{[\mathrm{CTA}]_0 + 2f[\mathrm{I}]_0\left(1 - e^{-k_\mathrm{d}t}\right)\cdot\tfrac{1+\delta}{2}} + M_\mathrm{CTA},
$$
分母中的第二项统计可追溯到引发剂自由基的死链。在一次设计良好的 RAFT 聚合中，该项只有 $[\mathrm{CTA}]_0$ 的百分之几。Z 基团与 R 基团的选择须匹配单体：苯乙烯类、丙烯酸酯与甲基丙烯酸酯用二硫代酸酯和三硫代碳酸酯，乙烯基酯用黄原酸酯与二硫代氨基甲酸酯。RAFT 是用途最广的 RDRP 方法，不需要金属，代价是有颜色、含硫的端基，通常事后再除去。

::: example RAFT 聚合的活性程度 {#ex-raft}
丙烯酸甲酯（$[\mathrm{M}]_0 = 5.0\ \mathrm{mol\,dm^{-3}}$，$M_0 = 86.09\ \mathrm{g\,mol^{-1}}$）在 $60\ ^\circ\mathrm{C}$ 下用三硫代碳酸酯聚合，$[\mathrm{CTA}]_0 = 0.025\ \mathrm{mol\,dm^{-3}}$，AIBN 为 $[\mathrm{I}]_0 = 0.0025\ \mathrm{mol\,dm^{-3}}$（$k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$，$f = 0.5$），反应 $10.0\ \mathrm{h}$，达到 70% 转化率。估算 $\bar{M}_\mathrm{n}$（不计 CTA 的质量）以及仍带硫代羰基硫端基的链的分数，假设最不利的情况：每个引发剂衍生自由基最终都落在一条死链里。
::: solution
$3.6\times10^{4}\ \mathrm{s}$ 内分解的引发剂：$[\mathrm{I}]_0(1 - e^{-k_\mathrm{d}t}) = 0.0025(1 - e^{-0.346}) = 7.3\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。引发链的自由基：$2f \times 7.3\times10^{-4} = 7.3\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。这些至多占 RAFT 链的 3%，所以一级近似下
$$
\bar{M}_\mathrm{n} \approx \frac{(0.70)(5.0)(86.09)}{0.025} = 1.2\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
由引发剂衍生的链的分数至多为 $7.3\times10^{-4}/(0.025 + 7.3\times10^{-4}) = 0.028$，所以至少**97%** 的链带 RAFT 端基，可以被链增长扩展为嵌段共聚物。设计规则由此而来：使 $[\mathrm{CTA}]_0/[\mathrm{I}]_0$ 保持较高（5–10 或更高），并且不要让引发剂耗尽。多加引发剂反应更快，但死链也更多。
:::
:::

## 开环聚合

环酯（内酯、丙交酯）、环酰胺（内酰胺）、环醚（环氧化物、氧杂环丁烷、THF）、碳酸酯、硅氧烷与张力的环烯烃都能开环聚合。产物的组成与单体相同，但主链含有缩聚物式的杂原子连接。**开环聚合**（ROP）因此是通向聚酯与聚酰胺的链式路线，具有活性聚合的全部控制力，且没有需要除去的小分子。

驱动力是**环张力**。开环并把环接进链要付出平动熵，与乙烯基聚合一样，但付得少一些，因为环自身的运动本就受限。获得的焓就是释放的张力。由燃烧热得到的环烷烃张力能显示出规律：环丙烷约 $115$、环丁烷 $110$、环戊烷 $26$、环己烷约 $0$、环庚烷 $26$、环辛烷 $40\ \mathrm{kJ\,mol^{-1}}$。三元与四元环容易聚合。六元环几乎不聚合（δ-戊内酯与乳酸的二聚体丙交酯因酯基的构象而受益）。五元环处在边缘：γ-丁内酯在通常条件下不聚合，而 THF 可阳离子聚合，但上限温度很低。开环聚合因此常在接近平衡处进行，平衡时的残留单体（[[polymer-chemistry/radical-polymerisation#prop-ceiling]]）是产品指标的一部分。

机理随环的化学而定。醇盐对环氧乙烷的**阴离子 ROP** 得聚乙二醇；ε-己内酰胺阴离子或水解聚合得尼龙-6。THF 的**阳离子 ROP** 得聚四氢呋喃，即氨纶纤维的软段。对聚酯最重要的是**配位-插入 ROP**。2-乙基己酸锡(II) $\mathrm{Sn(Oct)_2}$ 与醇引发剂反应生成锡醇盐。丙交酯的羰基配位到锡上，醇盐进攻羰基碳，环的酰氧键断裂，把开环的单体插入锡与增长的酯链之间。钌与钼卡宾催化的张力环烯烃**开环复分解聚合**（ROMP）是另一种活性链增长，见[[organometallics-catalysis/metathesis-polymerisation]]。

::: example 用开环聚合制备聚丙交酯 {#ex-pla}
L-丙交酯（乳酸的环状二酯，$\mathrm{C_6H_8O_4}$，$144.13\ \mathrm{g\,mol^{-1}}$）用 $\mathrm{Sn(Oct)_2}$ 与苄醇引发剂聚合，$[\text{丙交酯}]_0/[\mathrm{BnOH}]_0 = 100$，转化率 95%。预言 $\bar{M}_\mathrm{n}$ 与每条链的乳酸单元数。为什么丙交酯必须极干？
::: solution
每个苄醇引发一条链，所以
$$
\bar{X}_\mathrm{n} = 0.95\times100 = 95\ \text{个丙交酯单元},\qquad
\bar{M}_\mathrm{n} = 95\times144.13 + 108.14 = 1.38\times10^{4}\ \mathrm{g\,mol^{-1}},
$$
计入苄氧基与氢端基（$\mathrm{BnOH}$，$108.14\ \mathrm{g\,mol^{-1}}$）。每个丙交酯贡献两个乳酸单元，所以链中共有 190 个。水也是引发剂（生成带羧酸端基的链），任何存在的羟基化合物都会加到 $[\mathrm{I}]_0$ 上。因此未干燥的丙交酯会给出比设计值更多的链和更低的 $\bar{M}_\mathrm{n}$。聚合物聚丙交酯（PLA）在工业堆肥条件下可堆肥降解，是[[polymer-chemistry/functional-polymers]]的主题之一。
:::
:::

## 配位聚合

最便宜的单体乙烯与丙烯最难受控地聚合。它们的双键未被活化以接受阴离子，而丙烯自由基会夺取烯丙位氢而不是继续增长。自由基只在约 $2000\ \mathrm{bar}$ 下使乙烯聚合（LDPE），对丙烯则完全不能有用。1953 年，在米卢海姆的 Ziegler 发现四氯化钛与三乙基铝能在常压下把乙烯聚成线型高密度聚乙烯。1954 年，在米兰的 Natta 用同类催化剂制得*等规*聚丙烯。

公认的机理出自 **Cossee 与 Arlman**（1964）。活性中心是带一条增长烷基链和一个空配位位的钛（或锆）中心。烯烃经 π键配位到空位上，然后发生**迁移插入**：烷基链经四中心过渡态（Ti、烯烃的两个碳与链的 α-碳）迁移到配位的烯烃上，形成新的 C–C 键，并在原来烯烃的位置再生一个空位。基元步骤见[[organometallics-catalysis/elementary-reactions]]。链经 **β-氢消除**（得乙烯基端链与一个开始新链的金属氢化物）或向烷基铝转移而终止，也可有意识地经加入 $\mathrm{H_2}$ 的**氢解**终止——后者正是工业上的摩尔质量调节剂。这些都是转移反应，所以一个催化剂位点能生成许多条链；而由于多相催化剂带有多种不同类型的位点，传统齐格勒-纳塔聚烯烃分布很宽（$Đ = 4$–$8$）。

**立体控制**来自位点的形状。每次丙烯插入可以把两个对映异位面之一呈现给金属。手性位点偏好某一个面，聚合物即为等规。**茂金属**催化剂（由甲基铝氧烷 MAO 活化，Kaminsky 与 Sinn 在 1980 年发现）是单活性中心催化剂，给出窄分布（$Đ \approx 2$，即随机转移的位点的 Flory 值）。它们的对称性编码了立构规整度。$C_2$ 对称的 *ansa*-茂金属（Brintzinger）有两个同位的位点，都偏好同一个面，因此给出等规聚丙烯。$C_\mathrm{s}$ 对称的一种（Ewen，1988）随链在每次插入时换边而交替偏好两个面，因此给出间规聚丙烯。当控制立体化学的是*位点*而不是链端时，一次错误插入会在下一步被纠正，错误以孤立的 $mrrm$ 五单元组出现。这就是[[polymer-chemistry/polymer-structure]]中提到的**对映异位位点**统计。

::: example 位点控制的五单元组统计 {#ex-pentads}
在对映异位位点控制下，每个丙烯单元以位点偏好的构型插入，概率为 $\sigma$，与链端无关。用 $\sigma$ 导出等规五单元组分数 $(mmmm)$，并对 $\sigma = 0.98$ 求值。什么五单元组标志着一次错误插入？
::: solution
一个五单元组涵盖五个连续的立体中心与四个二单元组。四个二单元组全为 $m$，只有当五个中心构型全同：全部"正确"（概率 $\sigma^5$）或全部"错误"（概率 $(1-\sigma)^5$）。于是
$$
(mmmm) = \sigma^5 + (1-\sigma)^5 .
$$
$\sigma = 0.98$：$(0.98)^5 + (0.02)^5 = 0.9039 + 3\times10^{-9} = 0.904$。90% 的等规五单元组已经要求每次插入 98% 的选择性。一个本来正确的序列中的单个错误单元 $\dots ddd\,l\,ddd \dots$ 使它两侧的两个二单元组变成 $r$，其余为 $m$，得到五单元组序列 $mmrr$、$mrrm$、$rrmm$。其标志是 $(mmrr) : (mrrm) = 2 : 1$，且没有孤立的 $mmmr$ 五单元组。相反，在链端控制下错误会传播（下一个单元复制错误单元），给出单个 $r$ 二单元组与标志 $mmmr = mmrm$。NMR 五单元组分析由此把两种机理区分开来。
:::
:::

::: quiz
一次聚合给出 $\ln([\mathrm{M}]_0/[\mathrm{M}])$ 对时间的线性图，但在 20%、50% 和 80% 转化率下测得的 $\bar{M}_\mathrm{n}$ 相同，约 $10^{5}\ \mathrm{g\,mol^{-1}}$，且 $Đ \approx 2$。最可能的解释是什么？
- [ ] 引发慢的活性聚合。
- [x] 处于稳态的传统链式聚合（活性中心数目恒定），存在终止或转移，链不断生成又不断死亡。
- [ ] 逐步聚合。
- [ ] 所有链都被杂质杀死的活性聚合。
::: solution
第二个选项。线性一级图只说明 $[\mathrm{P^*}]$ 恒定。处于稳态的传统自由基聚合也是如此：链虽然死去，却以同样的速率被补充。破绽是摩尔质量*不*随转化率上升，再加上约 2 的分散度——两者合起来说明每条链都是早生、早长、早死。在活性体系中 $\bar{M}_\mathrm{n}$ 会随转化率线性上升。逐步聚合的 $\bar{M}_\mathrm{n}$ 只在最后才陡升。杀死所有链会让反应停下，而不会让一级图保持笔直。
:::
:::

::: history
Szwarc（Michael Szwarc）在 1956 年报告了活性阴离子聚苯乙烯及其用于制备嵌段共聚物（*Nature* 178, 1168）。二烯的锂引发阴离子聚合在 1950 年代已由 Firestone 公司发展至工业规模，产出高*顺*式聚异戊二烯。Ziegler（Karl Ziegler，1953，乙烯）与 Natta（Giulio Natta，1954，等规丙烯）因配位聚合分享 1963 年诺贝尔化学奖。Cossee（Piet Cossee）与 Arlman（Eduard Arlman）于 1964 年提出插入机理。Kaminsky（Walter Kaminsky）与 Sinn（Hansjörg Sinn）在 1980 年发现甲基铝氧烷对茂金属的活化，Brintzinger（Hans-Herbert Brintzinger）与 Ewen（John Ewen）在 1980 年代中期确立了立体控制的对称性规则。乙烯基醚的活性阳离子聚合由 Higashimura（Toshinobu Higashimura）与 Sawamoto（Mitsuo Sawamoto）于 1984 年报道。可逆失活自由基聚合随之而来：1993 年 Georges（Michael Georges）等人在施乐公司以 TEMPO 实现氮氧稳定自由基聚合；1995 年 Matyjaszewski（Krzysztof Matyjaszewski）与 Wang（Jin-Shan Wang）实现 ATRP，Sawamoto 课题组同年独立用钌实现；1998 年 Rizzardo（Ezio Rizzardo）、Moad（Graeme Moad）与 Thang（San Thang）在 CSIRO 实现 RAFT。持久自由基效应由 Fischer（Hanns Fischer）阐明。
:::

## 后续内容

带活泼端基的活性链是链拓扑结构之钥。顺序加单体得嵌段共聚物，偶联与接枝得星形、梳形与刷状聚合物。它们的自组装在[[polymer-chemistry/copolymerisation]]中讨论。窄分布的活性聚苯乙烯是[[polymer-chemistry/polymer-characterisation]]的校准标样；带设计端基与可降解主链的聚合物（PLA、聚己内酯、PEG 偶联物）将在[[polymer-chemistry/functional-polymers]]中再登场。配位聚合与 ROMP 背后的有机金属基元反应（迁移插入、β-氢消除、金属环丁烷）在[[organometallics-catalysis/elementary-reactions]]与[[organometallics-catalysis/metathesis-polymerisation]]中展开。

::: summary
- 活性聚合无终止无转移。引发快时给出 $\ln([\mathrm{M}]_0/[\mathrm{M}]) \propto t$、$\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{I}]_0$、$Đ \approx 1 + 1/\bar{X}_\mathrm{n}$ 的泊松分布，链端可被延伸或官能化。
- 阴离子聚合（苯乙烯、二烯、甲基丙烯酸酯、环氧化物；BuLi 或电子转移）是真正的活性聚合，但被质子性杂质按化学计量杀死。在极性溶剂中稀有的自由离子占主导，$k_\mathrm{p}^\text{app} \approx k_\mathrm{p}^{\pm} + k_\mathrm{p}^{-}(K_\mathrm{D}/[\mathrm{P^*}])^{1/2}$，溶剂决定二烯的微观结构。
- 阳离子聚合（异丁烯、乙烯基醚）受 β-质子转移之累，须在低温下进行。活性版本使用可逆的共价休眠物种。
- RDRP（NMP、ATRP、RAFT）让链几乎全程休眠。ATRP 中 $[\mathrm{P\cdot}] = K_\mathrm{ATRP}[\mathrm{PX}][\mathrm{Cu^I}]/[\mathrm{Cu^{II}}]$，持久自由基效应抑制终止，$Đ$ 随转化率下降。RAFT 靠简并转移分配增长，其死链分数由 $[\mathrm{CTA}]_0/[\mathrm{I}]_0$ 决定。
- 开环聚合由环张力驱动（3、4 元环 ≫ 5 > 6 元环）。它以链式机理给出聚酯、聚醚与聚酰胺，常接近平衡；丙交酯用 $\mathrm{Sn(Oct)_2}$ 配位-插入聚合。
- 齐格勒-纳塔与茂金属催化剂按 Cossee–Arlman 迁移插入聚合烯烃。β-H 消除与 $\mathrm{H_2}$ 的链转移决定摩尔质量，位点对称性决定立构规整度（$C_2$ 得等规，$C_\mathrm{s}$ 得间规），五单元组统计可揭示之。
:::

## 习题

::: exercise 目标摩尔质量 {level=1 check="20900"}
$10.4\ \mathrm{g}$ 苯乙烯用 $0.50\ \mathrm{mmol}$ *仲*丁基锂聚合完全，甲醇终止。预言 $\bar{M}_\mathrm{n}$，计入端基。（以 $\mathrm{g\,mol^{-1}}$ 输入 $\bar{M}_\mathrm{n}$，保留三位有效数字。）
::: solution
$\bar{M}_\mathrm{n} = 10.4/5.0\times10^{-4} + 58 = 20\,800 + 58 = 2.09\times10^{4}\ \mathrm{g\,mol^{-1}}$。端基只是 0.3% 的修正，低于大多数 $\bar{M}_\mathrm{n}$ 测量的精度。
:::
:::

::: exercise 泊松分散度 {level=1 check="1.010"}
理想活性聚合给出 $\bar{X}_\mathrm{n} = 100$ 的链（即引发单元上 $\nu = 99$ 次加成）。分散度是多少？（输入 $Đ$，保留四位有效数字。）
::: solution
$Đ = 1 + \nu/(\nu+1)^2 = 1 + 99/10\,000 = 1.0099 \approx 1.010$。近似式 $1 + 1/\bar{X}_\mathrm{n} = 1.010$ 与之相符。
:::
:::

::: exercise ATRP 的聚合度 {level=1 check="180"}
一次 ATRP 的投料为 $[\mathrm{M}]_0/[\mathrm{R{-}Br}]_0 = 300$，在 60% 转化率处停止。假设每个引发剂分子引发一条链，$\bar{X}_\mathrm{n}$ 是多少？（输入 $\bar{X}_\mathrm{n}$。）
::: solution
$\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{R{-}Br}]_0 = 0.60\times300 = 180$。实践中常把目标 DP 设得较高，而在中等转化率处停止反应，此时终止还几乎没有造成损害。
:::
:::

::: exercise 活性体系的一级动力学 {level=2 check="99.7"}
一次活性聚合在 $30.0\ \mathrm{min}$ 内达到 50% 转化率。从开始算起，达到 90% 转化率需要多久？（以分钟输入时间，保留三位有效数字。）
::: solution
$\ln([\mathrm{M}]_0/[\mathrm{M}]) = k_\mathrm{app}t$。50% 时，$\ln 2 = k_\mathrm{app}(30.0)$；90% 时，$\ln 10 = k_\mathrm{app}t$。所以 $t = 30.0\times\ln10/\ln2 = 30.0\times3.322 = 99.7\ \mathrm{min}$。若实测时间明显更长，就说明活性中心在流失（一级图发生弯曲）。
:::
:::

::: exercise 稀释阴离子活性体系 {level=2 check="2600"}
用[[#ex-free-ions]]的数据，求活性端浓度降到 $1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ 时的 $k_\mathrm{p}^\text{app}$。（以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 输入 $k_\mathrm{p}^\text{app}$，保留两位有效数字。）
::: solution
$\alpha = (1.5\times10^{-7}/1.0\times10^{-4})^{1/2} = 0.0387$，于是 $k_\mathrm{p}^\text{app} = 80 + 6.5\times10^{4}\times0.0387 = 80 + 2517 = 2.6\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。稀释*增大*了表观速率常数，因为解离平衡被推向自由离子一边。总速率 $k_\mathrm{p}^\text{app}[\mathrm{P^*}][\mathrm{M}]$ 仍然下降，但只下降 $0.876/0.260 = 3.4$ 倍而不是 10 倍。
:::
:::

::: exercise RAFT 的活性程度 {level=2 check="0.952"}
一次 RAFT 聚合使用 $[\mathrm{CTA}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$，反应过程中引发剂共产生 $5.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ 的开始链的自由基。假设每条引发剂衍生的链都是死链、每条 CTA 衍生的链都是活链，活链占全部链的分数是多少？（输入分数，保留三位有效数字。）
::: solution
链的总数为 $0.010 + 0.0005 = 0.0105\ \mathrm{mol\,dm^{-3}}$，活链分数为 $0.010/0.0105 = 0.952$。要提高它，就用更少的引发剂（并接受更慢的反应），或在更低的转化率停止。
:::
:::

::: exercise 等规催化剂的选择性 {level=3 check="0.990"}
某茂金属在对映异位位点控制下聚合丙烯。要使等规五单元组分数 $(mmmm) = 0.95$，需要多大的插入选择性 $\sigma$？解释为什么 $(1-\sigma)^5$ 项可以忽略，并给出 $(mmrr)$ 与 $(mrrm)$ 五单元组的预期之比。（输入 $\sigma$，保留三位有效数字。）
::: solution
$(mmmm) = \sigma^5 + (1-\sigma)^5$。$\sigma$ 接近 1 时 $(1-\sigma)^5 \sim 10^{-10}$，可以忽略。于是 $\sigma = 0.95^{1/5} = 0.9898 \approx 0.990$。每一百个单元就有一个以错误的面对插入。每个孤立的错误产生 $mmrr$、$mrrm$、$rrmm$ 三种五单元组。因阅读方向不同，$mmrr$ 与 $rrmm$ 是同一种五单元组，所以预期比为 $(mmrr) : (mrrm) = 2 : 1$。等价地说，$rr$ 三单元组成对出现。这就是位点控制的指纹。
:::
:::

::: exercise 提取离子对与自由离子的速率常数 {level=3 check="80"}
对 THF 中的一次活性阴离子聚合，表观速率常数在 $[\mathrm{P^*}] = 1.0\times10^{-3}$ 时为 $876\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，在 $[\mathrm{P^*}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ 时为 $2597\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。电导测量给出 $K_\mathrm{D} = 1.5\times10^{-7}\ \mathrm{mol\,dm^{-3}}$。用[[#prop-ion-pairs]]求 $k_\mathrm{p}^{\pm}$ 与 $k_\mathrm{p}^{-}$。（以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 输入 $k_\mathrm{p}^{\pm}$，保留两位有效数字。）
::: hint
以 $k_\mathrm{p}^\text{app}$ 对 $[\mathrm{P^*}]^{-1/2}$ 作图：两点定直线。
:::
::: solution
两次实验的 $[\mathrm{P^*}]^{-1/2}$ 分别为 $31.62$ 与 $100.0\ \mathrm{dm^{3/2}\,mol^{-1/2}}$。斜率为
$$
\frac{2597 - 876}{100.0 - 31.62} = \frac{1721}{68.38} = 25.17\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}} = k_\mathrm{p}^{-}K_\mathrm{D}^{1/2},
$$
截距为 $k_\mathrm{p}^{\pm} = 876 - 25.17\times31.62 = 80\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。于是 $k_\mathrm{p}^{-} = 25.17/(1.5\times10^{-7})^{1/2} = 25.17/3.873\times10^{-4} = 6.5\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。自由阴离子的反应性约比离子对高 800 倍。实际分析要用多个浓度，并用加入同离子盐来验证：盐抑制自由离子项，而让 $k_\mathrm{p}^{\pm}$ 保持不变。
:::
:::
