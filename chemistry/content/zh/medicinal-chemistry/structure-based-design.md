1976 年，在惠康（Wellcome）工作的贝德尔（Christopher Beddell）与古德福德（Peter Goodford）取成人血红蛋白的坐标，问了一个此前无人能问的问题：给定两条 β 链之间那道缝隙的形状与化学，什么分子能嵌进去并结合？他们设计了取代苯甲醛，让它桥接缝隙两端的两个氨基，把它们合成出来，发现它们如模型所预测地降低了血红蛋白的氧亲和力。这是第一次发表的使用蛋白结构设计配体的尝试，也是**基于结构的药物设计**的开端。

五十年后这套做法已是常规：蛋白质数据库里存着二十多万条生物大分子结构，AlphaFold 已为几乎每一条已知蛋白序列预测了模型，任何蛋白靶点的项目开工前都要先问一句有没有结构。本章要讲的正是如何对待一具结构——结构能与不能告诉我们什么（[[#def-bfactor]]）、分子如何被对接与打分（[[#prop-score]]、[[#prop-fep]]）、片段如何在其晶体结构指导下生长（[[#def-ge]]），以及四次战役如何用结构决定下一步合成什么。这里的自由能是[[medicinal-chemistry/drug-binding]]里的那些，结构上的手法是[[medicinal-chemistry/structure-activity]]里的那些——只不过如今是有意识地运用，而不是试出来的。提到药物名字是为了说明化学；本文不构成任何医疗建议。

## 结构从哪里来，又能承担什么

**X 射线晶体学**仍是主要来源。衍射束的强度（[[materials-chemistry/diffraction]]）给出结构因子的振幅而非位相，位相来自分子置换法、重原子法或一个模型；由振幅与位相算出**电子密度图**，再往图里搭建并精修一个化学模型——残基、水、离子、配体——直到它预测的电子密度与观测到的密度相符。三个数字描述这一步做得如何。

**分辨率** $d_\mathrm{min}$，即测得的最小晶面间距，决定能看到多细：$3.0\ \text{Å}$ 的图显示出侧链的形状，$2.0\ \text{Å}$ 显示其原子的位置，$1.2\ \text{Å}$ 显示单个水分子，只有低于约 $0.9\ \text{Å}$ 才出现氢的密度。**R 因子** $R = \sum\lvert \lvert F_\mathrm{obs}\rvert - \lvert F_\mathrm{calc}\rvert\rvert / \sum\lvert F_\mathrm{obs}\rvert$ 衡量模型与数据的一致程度，而由精修中排除的反射算出的 $R_\mathrm{free}$ 才是诚实的数字：在 $1.8\ \text{Å}$ 下接近 $0.20$ 结构可靠，$0.35$ 则只是一幅草图。而每个原子都带一个**位移参数**，它的 B 因子。

::: definition 分辨率、B 因子与坐标不确定度 {#def-bfactor}
原子的**原子位移参数**（温度因子，B 因子）由它在分辨率 $d$ 处引起的散射衰减定义，
$$
f = f_0\exp\!\left(-\frac{B\sin^2\theta}{\lambda^2}\right) = f_0\exp\!\left(-\frac{B}{4d^2}\right),
$$ {#eq-debye}
并通过下式与对模型位置的平均平方位移 $\langle u^2\rangle$（对晶体与时间取平均）相关联：
$$
B = 8\pi^2\langle u^2\rangle, \qquad u_\mathrm{rms} = \sqrt{\langle u^2\rangle} = \sqrt{\frac{B}{8\pi^2}},
$$ {#eq-bfac}
其中 $B$ 以 $\text{Å}^2$ 计，$u_\mathrm{rms}$ 以 Å 计。B 值大意味着原子无序、可动或部分占据，它的坐标是相差 $u_\mathrm{rms}$ 乃至更多的若干位置的平均。
:::

::: proof $B = 8\pi^2\langle u^2\rangle$ 从何而来
设一个原子绕平均位置各向同性地振动，沿各轴的位移为高斯分布，方差 $\langle u^2\rangle/3$。一个被涂抹开的原子的散射等于 $f_0$ 乘以该分布的傅里叶变换，而一维上方差 $\sigma^2$ 的高斯的变换是 $\exp(-2\pi^2\sigma^2 s^2)$，其中 $s = 2\sin\theta/\lambda = 1/d$。三个相等的分量给出指数 $-2\pi^2\langle u^2\rangle s^2$；与[[#eq-debye]]中约定俗成的 $\exp(-Bs^2/4)$ 比较得 $B/4 = 2\pi^2\langle u^2\rangle$，即[[#eq-bfac]]。此推导假定谐振、各向同性的运动；真实的侧链在旋转异构体之间跳跃，所以高 B 因子往往报告的是一个拟合到若干构象叠加的模型，而不是一次振动。
:::

::: example 阅读结合位点中的 B 因子 {#ex-bfactor}
在一个 $1.9\ \text{Å}$ 的酶–抑制剂复合物结构中，抑制剂芳环核心的原子 $B \approx 20\ \text{Å}^2$，一个桥接配体与主链酰胺的结合水的氧 $B \approx 40\ \text{Å}^2$，抑制剂上暴露于溶剂的吗啉的末端碳 $B \approx 80\ \text{Å}^2$。把每一个换算成均方根位移，并说明这张图支持哪些结构结论。
::: solution
由[[#eq-bfac]]，$u_\mathrm{rms} = \sqrt{B/8\pi^2}$：$B = 20\ \text{Å}^2$ 时 $u_\mathrm{rms} = \sqrt{20/78.96} = 0.50\ \text{Å}$；$40\ \text{Å}^2$ 时 $0.71\ \text{Å}$；$80\ \text{Å}^2$ 时 $1.01\ \text{Å}$。

碳–碳键长 $1.5\ \text{Å}$，一根好的氢键两个重原子间距 $2.8$–$3.0\ \text{Å}$。所以芳环核心的定位足以支持朝某个特定口袋设计一个取代基；那座桥水大概是真的，但对它的氢键几何做出任何优于零点几埃的断言都缺乏依据；而吗啉的碳不确定到三分之二个键长，它们正在溶剂中翻滚，为它们设计相互作用就是在对噪声做设计。
:::
:::

**冷冻电子显微术（cryo-EM）** 自 2014 年前后把结构生物学扩展到不结晶的靶点：大型复合物、脂环境中的膜受体、带着亚基的离子通道。数十万张冻在玻璃态冰中的单颗粒噪声图像被分类并平均成一张图。$2.5$–$3.5\ \text{Å}$ 的分辨率很常见，但 cryo-EM 的分辨率强烈**局域化**：一张图在受体的刚性核心处也许是 $2.8\ \text{Å}$，在配体位点周围的环处却是 $4.5\ \text{Å}$。要看口袋里的局部分辨率，而不是标题上的数字。

**计算模型**是第三个来源。AlphaFold2（江珀（John Jumper）与同事，2021）从序列预测折叠，精度通常相当于一具低分辨率实验结构，并逐残基报告置信度 pLDDT。它没有取代晶体学在设计中的地位：模型是游离态、单一构象的，口袋的侧链没有按配体诱导的方式排布，其中低 pLDDT 的环恰恰是构成多数位点壁的可动部分，而且它不含水、离子、辅因子或配体。这类模型可以为对接战役开局；真正确定的化合物仍要在可能时与靶点共晶。

::: warning 结构是一个模型，而且它不含氢 {#warn-structure}
在基于结构的药物设计中，再没有别的错误比这四种误读浪费更多的合成。

1. **质子化状态观测不到。** 几乎在任何分辨率下都没有氢的密度，所以一个组氨酸是否质子化、采取哪个互变异构体、配体的胺在口袋里是否为阳离子，都是由几何与 $\mathrm{p}K_\mathrm{a}$ 计算做出的*推断*。对接程序必须被告知这些，而告知的经常是错的，于是以每摩尔几十千焦的幅度出错。
2. **水分子是设计问题的一部分。** 置换掉一个曾形成两根好氢键的水的配体必须补上它们；置换掉一个配位不佳的水则赚到熵。哪一个是哪一个，无法从图上判断。
3. **晶体不是细胞。** 缓冲剂与冷冻保护剂有时被误当成配体，晶体接触可能把一个环——或一个口袋——按在非生理的位置上。
4. **一具结构只是一个构象。** 每具游离结构里都不存在的隐秘口袋会在配体结合时打开：结构是一个集合的快照，而结合是遍及这个集合的自由能（[[medicinal-chemistry/drug-binding#eq-dg]]）。
:::

::: widget plot
f: sqrt(x/(8*pi^2))
x: 0, 100
y: 0, 1.2
hlines: 0.5, 1.0
points: 20,0.5; 40,0.71; 80,1.01
labels: u_\mathrm{rms}/\text{Å}
caption: 均方根原子位移 $u_\mathrm{rms} = \sqrt{B/8\pi^2}$ 对 B 因子，来自[[#eq-bfac]]；标出的三个点是[[#ex-bfactor]]里的三类原子。$0.5\ \text{Å}$ 处的参考线约为 C–C 键的三分之一，$1.0\ \text{Å}$ 处则是坐标不再携带设计信息的界线。平方根在小 $B$ 处很陡、在大 $B$ 处很平，所以 $B = 10$ 与 $30\ \text{Å}^2$ 的差别远比 $70$ 与 $90\ \text{Å}^2$ 的差别重要。
:::

## 对接与打分

在对接任何东西之前先刻画位点：量出它的口袋（药site通常埋于蛋白内部、多非极性、体积 $200$–$600\ \text{Å}^3$），按所接纳的底物残基给亚位点编号（蛋白酶的是 $\mathrm{S1}$、$\mathrm{S1}'$、$\mathrm{S2}$ …），用古德福德的 GRID 方法（1985）以探针描出其“热点”，按置换各结合水应付出的自由能给结合水排序，为可电离残基指定 $\mathrm{p}K_\mathrm{a}$ 值，并把形状与蛋白质组比较以预判选择性问题。两种柔性要紧：**诱导契合**，侧链与环移动以容纳配体；以及**构象选择**，配体结合蛋白本来就在访问的某种罕见构象——下面的神经氨酸酶与激酶战役各例其一。

::: algorithm 把分子对接进位点 {#algo-docking}
1. **准备蛋白。** 选定结构，按选定的质子化与互变异构状态加氢，指定电荷与力场（[[computational-chemistry/molecular-mechanics]]），决定保留哪些水，并定义位点。
2. **准备配体。** 枚举互变异构体、测定 pH 下的质子化状态与立体异构体；生成构象异构体；指定电荷。
3. **搜索。** 通过在位点内逐步构建、遗传算法、蒙特卡洛或与热点的特征匹配，遍历位置、取向与扭转——六个刚体自由度加上每根可旋转键一个。
4. **用一个快速近似函数为每个构象打分**（[[#prop-score]]），每个配体只留最好的。
5. **重新打分与过滤。** 用较慢的函数重新评估，按你相信的化学逐一过眼检查构象，剔除性质不合的化合物。
6. **决策并试验。** 购买或合成几百个排名靠前的化合物并测定。
:::

第 3 步与第 4 步是两个不同的问题，失败方式也不同。搜索问题——*程序能否复现晶体学构象？*——对刚性受体大体已解决：好的程序在 60–80 % 的测试案例中把实验构象复现到 $2\ \text{Å}$ 均方根偏差以内。打分问题——*它结合得多强？*——根本没有解决。

::: proposition 作为近似结合自由能的经验打分函数 {#prop-score}
**经验打分函数**把标准结合自由能近似为从单一构象数出的若干结构项的加权和，
$$
\Delta_\mathrm{b}G^\circ \approx \Delta G_0 + \Delta G_\mathrm{hb}\sum_{\text{H-bonds}} f(\Delta r, \Delta\alpha) + \Delta G_\mathrm{ion}\sum_{\text{ion pairs}} f(\Delta r,\Delta\alpha) + \Delta G_\mathrm{lipo}A_\mathrm{lipo} + \Delta G_\mathrm{rot}N_\mathrm{rot},
$$ {#eq-score}
其中 $A_\mathrm{lipo}$ 是非极性接触面积，$N_\mathrm{rot}$ 是被冻结的可旋转键数，$f$ 是对偏离理想氢键几何的惩罚，系数**由对已知结构与亲和力的复合物做回归拟合**。伯姆（Hans-Joachim Böhm）1994 年的函数是这个家族的第一个，得到 $\Delta G_0 = +5.4$、$\Delta G_\mathrm{hb} = -4.7$、$\Delta G_\mathrm{ion} = -8.3$、$\Delta G_\mathrm{rot} = +1.4\ \mathrm{kJ\,mol^{-1}}$ 与 $\Delta G_\mathrm{lipo} = -0.17\ \mathrm{kJ\,mol^{-1}}\,\text{Å}^{-2}$。这样的函数既经验又加和，因此只对类似其训练集的复合物估计亲和力，而且它的误差是系统性的，不是随机的。
:::

::: proof 为什么这一形式合理，又不可能精确
结合自由能是两个*集合*——复合物与分开的伙伴——之间的差，每个集合都遍及所有构象与溶剂平均。三个近似把这一切变成[[#eq-score]]。

首先，用最概然构象——对接出的构象——的值代替集合平均，从而丢却两个态的构型熵，只留下 $N_\mathrm{rot}$ 项恢复回来的粗陋版本。其次，假定**加和性**，即独立的基团贡献之和：对成对的焓力还算合理，但去溶剂化是合作性的（移走一个水会改变移走它邻水的代价），复合物的熵根本不能对基团求和，所以加和性是一条关于抵消的假定，不是定理。第三，把一切未被计入的东西——配体失去的平动与转动熵、极性基团去溶剂化的平均代价、标准态项——收进 $\Delta G_0$，即正的“入场费”，并把它当成对每个复合物都相同。用最小二乘拟合系数，就是把这个函数变成一台插值装置。每个近似的代价都以每摩尔几 kJ 计，而 $K_\mathrm{d}$ 的十倍不过 $5.7\ \mathrm{kJ\,mol^{-1}}$（[[medicinal-chemistry/drug-binding#eq-dg]]）——这就是实际精度限于亲和力大约一个数量级的原因。
:::

::: example 为一个构象打分，以及亲脂性陷阱 {#ex-score}
用伯姆的系数，为一个形成 2 根理想中性氢键（$f = 1$）与 1 对理想离子对、埋藏 $200\ \text{Å}^2$ 非极性表面并冻结 5 根可旋转键的构象打分，并在 $298\ \mathrm{K}$ 把分数换算成预测的 $K_\mathrm{d}$。然后对极性接触相同、但埋藏 $350\ \text{Å}^2$ 的更大类似物重算一遍。
::: solution
由[[#eq-score]]：
$$
\Delta_\mathrm{b}G^\circ \approx 5.4 + 2(-4.7) + 1(-8.3) + (-0.17)(200) + 1.4(5) = 5.4 - 9.4 - 8.3 - 34.0 + 7.0 = -39.3\ \mathrm{kJ\,mol^{-1}}.
$$
于是 $\mathrm{p}K_\mathrm{d} = -\Delta_\mathrm{b}G^\circ/(RT\ln 10) = 39.3/5.708 = 6.89$，即 $K_\mathrm{d} \approx 130\ \mathrm{nmol\,dm^{-3}}$——一个说得过去的先导。

更大的类似物：亲脂项变成 $-59.5\ \mathrm{kJ\,mol^{-1}}$，总计 $-64.8\ \mathrm{kJ\,mol^{-1}}$，得 $\mathrm{p}K_\mathrm{d} = 11.35$，$K_\mathrm{d} \approx 4\ \mathrm{pmol\,dm^{-3}}$。这个函数用四个数量级的亲和力奖励了 $150\ \text{Å}^2$ 额外的油性接触，却不惩罚溶解度、亲脂性或构象代价。这是加和打分的典型失败——**偏向大而亲脂的化合物**——因为非极性面积是唯一无上限增长的项。所以在购买任何东西之前，必须先按大小、$\log P$ 与配体效率（[[medicinal-chemistry/hits-and-leads#def-le]]）过滤苗头名单。
:::
:::

在用的函数有三族，弱点各不相同，所以人们常常混用（“共识打分”）：**力场**函数，把分子力学能量与去溶剂化相加；**经验**函数，即[[#eq-score]]那种回归拟合的和式；以及**知识基**函数，把蛋白质数据库里的原子对距离频次变成统计势 $w(r) = -k_\mathrm{B}T\ln[g(r)/g_\mathrm{ref}(r)]$。

::: widget regression
points: 4.2,5.4; 5.0,6.9; 5.3,5.1; 6.1,7.8; 6.4,6.0; 7.0,8.2; 7.3,6.6; 7.9,7.2; 8.4,9.3; 9.1,8.0
degree: 1
x: 3.5, 10
y: 3.5, 10
caption: 一个打分函数的典型表现：同一靶点的十个复合物，预测 $\mathrm{p}K_\mathrm{d}$（纵轴）对实测（横轴）。最小二乘斜率 $0.60$，远低于理想的 $1$；$r^2 = 0.51$，均方根误差 $1.12$ 个 log 单位，即 $6.4\ \mathrm{kJ\,mol^{-1}}$。秩相关 $0.67$：函数分得开强结合与弱结合，却摆错了邻居的位置。把两个效价最高的点向下拖，看 $r^2$ 如何崩塌：一个质子化状态弄错的配体就能对真实数据集做出这样的事。
:::

一个不擅长预测亲和力的打分函数对于**富集**可能仍然非常有用：把活性物拉到排名表的前列。对 200,000 个化合物、内含 100 个活性物的一次对接，若把其中 35 个放进前 2,000 名，就得到 $\mathrm{EF}_{0.01} = 35$——命中率 $1.75\ \%$，而背景只有 $0.05\ \%$——同时漏掉 65 % 的活性物。

::: definition 富集系数及其含义 {#def-ef}
设有含 $n$ 个活性物的 $N$ 个化合物的库。测得排名前 $x$ 的分率（即 $xN$ 个化合物）中有 $h$ 个活性物，该分率下的**富集系数**为
$$
\mathrm{EF}_x = \frac{h/(xN)}{n/N} = \frac{h}{x\,n},
$$ {#eq-ef}
即所选集合的命中率对随机选取命中率之比：$\mathrm{EF}_x = 1$ 表示排名毫无价值，$1/x$ 是上限。富集系数依赖 $x$ 与库的组成，所以只能用来比较在同一集合上检验过的方法。
:::

### 像样地计算自由能

当必须预测的是每摩尔几 kJ 而不是猜一个大概，首选方法是在一个热力学循环上做**自由能计算**：不算绝对结合自由能，只算两个相似配体之间的*差*，办法是在水中和在位点里把一个炼金术式地变成另一个。

::: proposition 由热力学循环求相对结合自由能 {#prop-fep}
设配体 1 与 2 结合同一蛋白的标准结合自由能为 $\Delta_\mathrm{b}G^\circ_1$ 与 $\Delta_\mathrm{b}G^\circ_2$，并设 $\Delta G_\mathrm{mut}^\mathrm{free}$ 与 $\Delta G_\mathrm{mut}^\mathrm{bound}$ 是把 1 变成 2 这一非物理变换在体相溶剂中与在复合物中的自由能。自由能是态函数，四个过程闭合为一个循环，故
$$
\Delta\Delta G = \Delta_\mathrm{b}G^\circ_2 - \Delta_\mathrm{b}G^\circ_1 = \Delta G_\mathrm{mut}^\mathrm{bound} - \Delta G_\mathrm{mut}^\mathrm{free}, \qquad \frac{K_{\mathrm{d},2}}{K_{\mathrm{d},1}} = \exp\!\left(\frac{\Delta\Delta G}{RT}\right).
$$ {#eq-fep}
右边只涉及配体在固定环境中的变换，可由分子动力学（[[computational-chemistry/free-energy-sampling]]）的自由能微扰或热力学积分算出。对结合方式已知的同系物系列，在好的力场与收敛的采样下，$4$–$6\ \mathrm{kJ\,mol^{-1}}$ 的精度是可以达到的。
:::

::: proof
从（配体 1 游离）到（配体 2 结合）有两条路：先结合 1 再在位点内把它变换，得 $\Delta_\mathrm{b}G^\circ_1 + \Delta G_\mathrm{mut}^\mathrm{bound}$；或先在溶液中把 1 变成 2 再结合，得 $\Delta G_\mathrm{mut}^\mathrm{free} + \Delta_\mathrm{b}G^\circ_2$。因为 $G$ 是态函数，两个和相等，移项即得[[#eq-fep]]的第一部分。第二部分是把[[medicinal-chemistry/drug-binding#eq-dg]]用于每个配体后相减：$\Delta\Delta G = RT\ln(K_{\mathrm{d},2}/K_{\mathrm{d},1})$。标准态项与蛋白自身的溶剂化自由能都出现在两条路上而相互抵消，这就是这个循环值得构造的原因。
:::

::: example 一个自由能微扰预测 {#ex-fep}
某先导的 $K_\mathrm{d} = 50\ \mathrm{nmol\,dm^{-3}}$。拟议的类似物把一个芳香氢换成一个氯，指向一个小的非极性缝隙。H → Cl 变换的模拟给出 $\Delta G_\mathrm{mut}^\mathrm{bound} = -25.0\ \mathrm{kJ\,mol^{-1}}$、$\Delta G_\mathrm{mut}^\mathrm{free} = -17.5\ \mathrm{kJ\,mol^{-1}}$，各有 $\pm 1.5\ \mathrm{kJ\,mol^{-1}}$ 的统计不确定度。在 $298\ \mathrm{K}$ 预测类似物的 $K_\mathrm{d}$ 并给出不确定度，并说明这个结果支持与不支持什么。
::: solution
由[[#eq-fep]]，$\Delta\Delta G = -25.0 + 17.5 = -7.5\ \mathrm{kJ\,mol^{-1}}$，两腿独立时不确定度 $\sqrt{1.5^2 + 1.5^2} = 2.1\ \mathrm{kJ\,mol^{-1}}$。亲和力之比为
$$
\frac{K_{\mathrm{d},2}}{K_{\mathrm{d},1}} = \exp\!\left(\frac{-7500}{8.314\times298.15}\right) = \exp(-3.03) = 0.0486 = \frac{1}{20.6},
$$
所以 $K_{\mathrm{d},2} = 50/20.6 = 2.4\ \mathrm{nmol\,dm^{-3}}$。$\pm 2.1\ \mathrm{kJ\,mol^{-1}}$ 相当于 $\exp(2100/2478) = 2.3$ 倍，所以诚实的预测是 $1$–$6\ \mathrm{nmol\,dm^{-3}}$：大约好 20 倍，肯定更好。

这个结果假定了结合方式不变、力场能描述非极性缝隙里的 C–Cl 基团、采样已经收敛——写出的 $\pm1.5$ 是精密度，不是准确度。
:::
:::

::: quiz 为什么要算一个循环？
自由能微扰计算通常给出两个相似配体的*相对*结合自由能，而不是单个配体的绝对亲和力。为什么？

- [x] 蛋白的溶剂化与标准态贡献在循环的各腿之间抵消，所以所计算的量更小、更易收敛。
- [ ] 因为绝对结合自由能在热力学上没有良好定义。
- [ ] 因为 $K_\mathrm{d}$ 在实验里也无法绝对测量。
- [x] 只有发生变化的原子需要充分采样，所以一次小扰动的短模拟就足够。
::: solution
第一与第四正确，而且是一件事的两面：[[#prop-fep]]里两个配体共有的东西——蛋白、它的水化层、体相溶剂、标准态——对两腿贡献相同而抵消，剩下一个小差值，短模拟就能收敛。绝对计算必须处理配体从水进入位点的整个转移；这类方法存在，但收敛困难得多。选定标准态后绝对结合自由能就有良好定义，而 $K_\mathrm{d}$ 每天都被量热法绝对地测量。
:::
:::

## 在结构上生长片段

基于结构的药物设计与基于片段的发现是天作之合：一个以 $1\ \mathrm{mmol\,dm^{-3}}$ 结合的片段，它的亲和力几乎什么都告诉不了你，它的晶体结构却几乎什么都能告诉你。这套策略——把晶体泡进片段混合物里、解出结构、把坐在热点上的片段朝相邻亚位点生长——由哈伊杜克（Philip Hajduk）与格里尔（Jeffrey Greer）在他们 2007 年关于基于片段的药物发现的综述中提出，而[[medicinal-chemistry/hits-and-leads#def-le]]的效率算法用于刚刚加上的那些原子，使它保持诚实。

::: definition 基团效率 {#def-ge}
当配体 A 通过加上一个含 $\Delta N$ 个重原子的基团 X 生长为配体 A–X 时，X 的**基团效率**是它每个加入原子贡献的结合自由能，
$$
\mathrm{GE}(X) = \frac{-\bigl(\Delta_\mathrm{b}G^\circ_{\mathrm{A-X}} - \Delta_\mathrm{b}G^\circ_{\mathrm{A}}\bigr)}{\Delta N} = \frac{RT\ln 10\,\bigl(\mathrm{p}K_{\mathrm{d},\mathrm{A-X}} - \mathrm{p}K_{\mathrm{d},\mathrm{A}}\bigr)}{\Delta N} \approx \frac{5.71\,\Delta\mathrm{p}K_\mathrm{d}}{\Delta N}\ \mathrm{kJ\,mol^{-1}}\ (298\ \mathrm{K}).
$$ {#eq-ge}
它是结合自由能对重原子数的局部斜率，所以只要 $\mathrm{GE}$ 不小于当前的 $\mathrm{LE}$，这一步生长就值得保留。
:::

::: proof 基团效率与配体效率的关系
把含 $N$ 个重原子的化合物的（负的）结合自由能记作 $G(N)$，则 $\mathrm{LE}(N) = -G(N)/N$。由[[#eq-ge]]有 $-G(N+\Delta N) = -G(N) + \mathrm{GE}\,\Delta N$，于是
$$
\mathrm{LE}(N+\Delta N) = \frac{N\,\mathrm{LE}(N) + \Delta N\,\mathrm{GE}}{N + \Delta N},
$$
即旧效率与加入基团效率的加权平均。所以 $\mathrm{GE} > \mathrm{LE}$ 时 $\mathrm{LE}$ 上升，$\mathrm{GE} < \mathrm{LE}$ 时下降；连续极限下 $\mathrm{d}\,\mathrm{LE}/\mathrm{d}N = (\mathrm{GE} - \mathrm{LE})/N$，是一个朝边际值移动的平均。因此优化期间有用的问题从来不是“新化合物效价更高吗？”——加原子几乎总能加点效价——而是“这些原子值回它们的位置吗？”
:::

::: example 逐原子生长一个片段 {#ex-ge}
一个 13 个重原子的片段以 $K_\mathrm{d} = 100\ \mu\mathrm{mol\,dm^{-3}}$ 结合某酶，其结构显示距某个环上位置 $4\ \text{Å}$ 处有一个未被占据的非极性口袋。朝那个口袋长入一个八个原子的取代基得到 $K_\mathrm{d} = 0.32\ \mu\mathrm{mol\,dm^{-3}}$。计算前后配体的配体效率与这一步的基团效率（以每重原子 $\mathrm{kJ\,mol^{-1}}$ 与 $\mathrm{kcal\,mol^{-1}}$ 计），并评判这一步。
::: solution
片段：$\mathrm{p}K_\mathrm{d} = 4.00$，故 $-\Delta_\mathrm{b}G^\circ = 5.708 \times 4.00 = 22.8\ \mathrm{kJ\,mol^{-1}}$，$\mathrm{LE} = 22.8/13 = 1.76\ \mathrm{kJ\,mol^{-1}} = 0.42\ \mathrm{kcal\,mol^{-1}}$ 每原子。生长后的化合物：$\mathrm{p}K_\mathrm{d} = 6.50$，$-\Delta_\mathrm{b}G^\circ = 37.1\ \mathrm{kJ\,mol^{-1}}$，$N_\mathrm{HA} = 21$，故 $\mathrm{LE} = 1.77\ \mathrm{kJ\,mol^{-1}} = 0.42\ \mathrm{kcal\,mol^{-1}}$ 每原子。基团效率，由[[#eq-ge]]：$\mathrm{GE} = 5.708(6.50 - 4.00)/8 = 1.78\ \mathrm{kJ\,mol^{-1}} = 0.43\ \mathrm{kcal\,mol^{-1}}$ 每原子。

这一步赢得 2.5 个 log 单位——320 倍——而配体效率不变，这正是[[#eq-ge]]在 $\mathrm{GE} \approx \mathrm{LE}$ 时所要求的。每个加入的原子都付了账，而这只有当新基团预先排好、恰好填满一个真实口袋时才会发生：同样的增益若靠十四条原子的柔性链取得，$\mathrm{GE}$ 只有每原子 $1.02\ \mathrm{kJ\,mol^{-1}}$，平均值会被拉低。
:::
:::

**维莫非尼**是教科书式的案例。Plexxikon 以晶体学为读出，在高浓度下对一组激酶筛了约两万个又小又简单的化合物，发现 7-氮杂吲哚以毫摩尔亲和力但很高的配体效率结合多种激酶的 ATP 位点，其两个环氮形成 ATP 的腺嘌呤所形成的那两处铰链区氢键。片段在若干激酶中的结构指导了生长：一个 3-取代的二氟苯基磺酰胺够到 DFG 基序旁的口袋，进一步修饰得到对 BRAF 的 V600E 突变体——它驱动着约一半的黑色素瘤——的纳摩尔效价。2011 年获批，距那个片段苗头约六年，是基于片段的战役产出的第一个药物——而这个故事的两大特点是普适的：筛选以结构而非效价为读出，选择性是在生长这一步*设计进去*的。

## 四次战役

### 卡托普利：没有靶点结构的设计

血管紧张素转换酶（ACE）通过把血管紧张素 I 转成血管紧张素 II 升高血压。1970 年代初，斯奎布公司的卡什曼（David Cushman）与翁代蒂（Miguel Ondetti）着手抑制它，起点是蛇毒里的缓激肽增强肽。当时没有 ACE 的结构——它 2003 年才被解出。他们拥有的是一个**模型**：ACE 是锌依赖羧肽酶，而利普斯科姆（William Lipscomb）的牛羧肽酶 A 结构显示着催化锌、结合底物末端羧酸根的精氨酸和一个疏水的 $\mathrm{S1}'$ 口袋。拜尔斯（Byers）与沃尔芬登（Wolfenden）已证明苄基丁二酸作为一种“副产物类似物”抑制该酶——一个羧酸根在锌上，另一个在精氨酸上。

卡什曼与翁代蒂把这个想法搬过来，假定 ACE 的位点相同、只是多一个残基的可及范围，因为 ACE 切掉的是一个二肽。琥珀酰-L-脯氨酸抑制 ACE，$\mathrm{IC_{50}} \approx 330\ \mu\mathrm{mol\,dm^{-3}}$；一个模拟底物倒数第二个侧链的甲基把它带到 $22\ \mu\mathrm{mol\,dm^{-3}}$。然后是决定性的一步：把配锌的羧酸根换成硫醇，Zn(II) 的强得多的配体（[[coordination-chemistry/bioinorganic]]）。产物 D-3-巯基-2-甲基丙酰-L-脯氨酸——卡托普利——以 $\mathrm{IC_{50}} \approx 23\ \mathrm{nmol\,dm^{-3}}$ 抑制 ACE；设计 1977 年发表于 *Biochemistry*，药物 1981 年获批，成为第一个 ACE 抑制剂。这场战役买来了 $23.7\ \mathrm{kJ\,mol^{-1}}$ 的结合自由能——甲基 $6.7$、硫醇 $17.0$，因为填满彼此独立的亚位点而可以加和，习题里会算到——凭的却是一具从同源酶搭起来的*模型*。基于结构的设计并不要求靶点的结构，但要求关于位点的一个正确假设。

### HIV 蛋白酶：结构设计的速度

HIV-1 蛋白酶切割病毒的 Gag 与 Gag-Pol 多聚蛋白；没有它，病毒颗粒不成熟也没有感染性。它是一个 99 残基亚基的同二聚体，活性位点 $C_2$ 对称，两个催化天冬氨酸（每个亚基的 Asp25）共享一个质子，柔性的“瓣”在配体上方合拢。晶体结构 1989 年出现，第一批抑制剂六年内就到了患者手里。

策略是**过渡态等排**（[[medicinal-chemistry/drug-targets]]）。天冬氨酸蛋白酶的水解经过一个四面体中间体，由天冬氨酸活化的水加到可水解羰基上形成；把底物衍生肽里的那个酰胺换成带羟基的、不可水解的四面体基团，抑制剂就捕获了酶对其过渡态亲和力的一部分。所用的基团是**羟乙胺**与**羟乙烯基**等排体，即 $\mathrm{{-}CH(OH){-}CH_2{-}NH{-}}$ 与 $\mathrm{{-}CH(OH){-}CH_2{-}CH_2{-}}$ 代替 $\mathrm{{-}C(O){-}NH{-}}$，其羟基坐在两个天冬氨酸羧酸根之间。

沙奎那韦（罗氏，1995，此类中的第一个）是按这一原则设计的羟乙胺，其十氢异喹啉羧酰胺经模型挑选，以刚性的疏水表面呈现给 $\mathrm{S1}'$ 口袋。两条进一步的设想贯穿全类：瓣通过一个被紧紧持有的**结构水**与抑制剂形成氢键，用一个羰基氧置换这个水产生了环状脲类；而位点的 $C_2$ 对称诱使人们设计对称抑制剂，例如利托那韦。

两条教训。肽模拟物继承肽类的性质——分子量高、氢键供体多、吸收差、代谢快——所以在结构上设计出的效价仍须与[[medicinal-chemistry/pharmacokinetics#def-ro5]]调和；利托那韦作为*增强剂*的用法，就是一个设计引出的问题的药代动力学补丁。而耐药性会回应那些被设计的接触，所以如今的抑制剂被要求去接触不变的主链原子（达芦那韦的双四氢呋喃基团就如此），并待在天然底物占据的“底物包络”之内，使破坏抑制剂的突变同样破坏底物。

### 神经氨酸酶：扎那米韦与奥司他韦

流感神经氨酸酶切断末端唾液酸（$N$-乙酰神经氨酸）与细胞表面聚糖其余部分之间的键，让新的病毒颗粒得以逸出。科尔曼（Peter Colman）的墨尔本小组 1983 年解出了它的结构；反应经过一个氧鎓离子样的过渡态，糖环在 C2 处变平，类似物 DANA（2-脱氧-2,3-双脱氢-Neu5Ac）具有那个几何并在微摩尔级抑制。

冯·伊茨施泰因（Mark von Itzstein）、科尔曼、拉弗（Graeme Laver）与同事利用结构改进 DANA，这项设计 1993 年发表于 *Nature*。GRID 式分析显示结合糖的 C4 位旁有一个口袋，内含两个保守谷氨酸（Glu119 与 Glu227）。把 DANA 的 C4 羟基换成氨基得到约百倍增益；换成**胍基**——平面、带离域正电荷、若干供体恰与那对羧酸根匹配——就得到纳摩尔抑制剂扎那米韦，1999 年获批。两性离子的多元醇不经口服吸收，所以扎那米韦吸入给药。

奥司他韦解决的就是这一点：糖环变成环己烯，取代基与几何不变；甘油侧链换成 3-戊氧基——这需要一个项目中由晶体学发现的诱导契合，Glu276 旋转着与 Arg224 形成盐桥，从而打开一个疏水口袋；羧酸根则掩蔽成乙酯，一个被肝脏酯酶水解的**前药**。产物可口服：基于结构的设计优化亲和力，而亲和力只是药物所需性质之一。

### 伊马替尼与 DFG-out 构象

全部五百多种人源激酶共有同一个双叶折叠，ATP 位点就在两叶之间；面对细胞内毫摩尔级的 ATP（[[medicinal-chemistry/drug-targets#eq-cheng]]），要为其中一种设计选择性抑制剂，1990 年时看来毫无希望。

伊马替尼由诺华（Ciba-Geigy/Novartis）的利登（Nicholas Lydon）、齐默尔曼（Jürg Zimmermann）、德鲁克（Brian Druker）与同事从一个苯氨基嘧啶先导发展而来，抑制引起慢性髓系白血病的融合激酶 BCR-ABL；它 2001 年获批，而库里延（John Kuriyan）小组 2000 年解出的复合物结构解释了它的选择性。激酶的活化环以一个保守的 Asp-Phe-Gly（“DFG”）基序开头：活的“DFG-in”构象中天冬氨酸在 ATP 位点配位 $\mathrm{Mg^{2+}}$；失活的“DFG-out”构象中环翻转，苯丙氨酸移入 ATP 位点、天冬氨酸移出，这就在其旁边**打开了一个别构口袋**。伊马替尼结合 DFG-out 形式，其吡啶与氨基嘧啶在腺嘌呤区形成铰链区氢键，其酰胺伸进新打开的口袋，其 *N*-甲基哌嗪伸入溶剂。各激酶采取 DFG-out 的难易以及它打开的口袋各不相同，为那个构象设计的抑制剂就能比只在腺嘌呤位点上竞争的抑制剂选择性高得多——由此有了**I 型**（DFG-in）、**II 型**（DFG-out）与**III 型**（别构）抑制剂的分类。

耐药随之而来，通过“守门员”苏氨酸的突变（ABL 中的 T315I）；后续抑制剂都在这些结构上设计而成，普纳替尼把酰胺换成一条足够细、能从更大的异亮氨酸旁通过去的碳–碳三键。这一类药物续见[[medicinal-chemistry/drug-case-studies]]。

::: history 从一道缝隙到一剂药的六个步骤 {#hist-sbdd}
- **1976** —— 贝德尔（Christopher Beddell）、古德福德（Peter Goodford）与同事为血红蛋白的中央腔设计取代苯甲醛：第一批从蛋白结构设计的配体。
- **1977** —— 卡什曼（David Cushman）与翁代蒂（Miguel Ondetti）在 *Biochemistry* 发表卡托普利的设计，其推理来自羧肽酶 A 以及拜尔斯与沃尔芬登的“副产物类似物”。
- **1982–1985** —— 昆茨（Irwin Kuntz）与同事发表第一个自动对接程序 DOCK；古德福德发表 GRID。
- **1989** —— 默克的纳维亚（Manuel Navia）与同事以及沃洛达沃尔（Alexander Wlodawer）小组报道 HIV-1 蛋白酶的晶体结构；1995 年沙奎那韦跟进。
- **1993** —— 冯·伊茨施泰因（Mark von Itzstein）、科尔曼（Peter Colman）、拉弗（Graeme Laver）与同事在 *Nature* 报道由神经氨酸酶结构设计 4-胍基 DANA 类似物扎那米韦；1999 年获批。
- **2007** —— 哈伊杜克（Philip Hajduk）与格里尔（Jeffrey Greer）综述基于片段的发现的第一个十年；由 7-氮杂吲哚片段生长而来的维莫非尼 2011 年跟进，AlphaFold2（江珀（John Jumper）与同事）2021 年。
:::

## 后续内容

基于结构的药物设计只是若干输入之一。它的构象排名汇入[[medicinal-chemistry/hits-and-leads]]的分拣，它的生长方案由[[medicinal-chemistry/structure-activity]]的方法检验，它的自由能立足于[[computational-chemistry/molecular-mechanics]]、[[computational-chemistry/molecular-dynamics]]与[[computational-chemistry/free-energy-sampling]]的力场与采样，它的静电立足于[[computational-chemistry/solvation-qmmm]]。各场战役续见[[medicinal-chemistry/drug-case-studies]]；小分子够不着的靶点交给[[medicinal-chemistry/biologics]]。结构背后是衍射（[[materials-chemistry/diffraction]]）与 NMR（[[spectroscopy/nmr-structure]]）。

::: summary 核心要点
- 结构是拟合到数据的模型：以分辨率、$R_\mathrm{free}$ 判断它，并逐原子地以 B 因子判断，因为 $u_\mathrm{rms} = \sqrt{B/8\pi^2}$ 到 $B = 80\ \text{Å}^2$ 就达到整整一埃（[[#def-bfactor]]）。氢、质子化状态与水的自由能是推断出来的，从来不是观测到的。
- cryo-EM 把设计扩展到不结晶的靶点，但它的分辨率是局域的；AlphaFold 模型是游离态、单一构象、没有配体的。
- 对接分成两个问题：搜索对刚性位点大体已解决，打分没有——加和的经验函数（[[#prop-score]]）精度约为亲和力的一个数量级，并偏爱又大又亲脂的分子。
- 打分对富集仍然有用：头 1 % 内 20–50 的 $\mathrm{EF}_x = h/(xn)$（[[#def-ef]]）能把一整个库变成一份短名单，却几乎不对排在它后面的东西作任何判断。对接决定测什么；它不能代替测。
- 要每摩尔几 kJ 的精度，就算一个差值：[[#prop-fep]]的循环抵消了蛋白的溶剂化与标准态，给出 $4$–$6\ \mathrm{kJ\,mol^{-1}}$ 的相对自由能。
- 以基团效率审查片段生长：$\mathrm{GE} = 5.71\,\Delta\mathrm{p}K_\mathrm{d}/\Delta N\ \mathrm{kJ\,mol^{-1}}$（[[#def-ge]]）；只有当 $\mathrm{GE}$ 超过 $\mathrm{LE}$ 时配体效率才上升，维莫非尼从 7-氮杂吲哚片段生长时正是如此。
- 结构买来了什么：卡托普利里一个值 $17\ \mathrm{kJ\,mol^{-1}}$ 的配锌硫醇、针对 HIV 蛋白酶的过渡态等排体、扎那米韦中与两个谷氨酸匹配的胍基、伊马替尼的 DFG-out 选择性——而扎那米韦的吸入、奥司他韦的前药酯与利托那韦的增强都在提醒：亲和力只是亲和力。
:::

## 习题

::: exercise 读取 B 因子 {level=1 check="0.87"}
一具精修结构中的原子有 $B = 60\ \text{Å}^2$。计算它的均方根位移。（$u_\mathrm{rms}$ 以 Å 输入，保留两位有效数字。）
::: solution
由[[#eq-bfac]]，$u_\mathrm{rms} = \sqrt{60/78.96} = 0.87\ \text{Å}$，超过碳–碳键长的一半：这个位置的可靠程度不足以对着它设计一个具体的相互作用，而且在利用它之前本应先查看那处的电子密度。
:::
:::

::: exercise 一个对接命中物的配体效率 {level=1 check="1.9"}
一个 18 个重原子的虚拟筛选命中物测得 $K_\mathrm{d} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$。计算它在 $298\ \mathrm{K}$ 的配体效率。（LE 以每重原子 $\mathrm{kJ\,mol^{-1}}$ 输入，保留两位有效数字。）
::: solution
$\mathrm{p}K_\mathrm{d} = 6.00$，故 $-\Delta_\mathrm{b}G^\circ = 34.2\ \mathrm{kJ\,mol^{-1}}$，$\mathrm{LE} = 34.2/18 = 1.9\ \mathrm{kJ\,mol^{-1}}$ 每原子，亦即 $0.45\ \mathrm{kcal\,mol^{-1}}$ 每原子——稳稳高于 $0.3$ 的惯用门槛（[[medicinal-chemistry/hits-and-leads#def-le]]），还有空间长到药物的个头。
:::
:::

::: exercise 为一个构象打分 {level=1 check="5.9"}
用[[#prop-score]]里的伯姆系数（$\Delta G_0 = +5.4$，$\Delta G_\mathrm{hb} = -4.7$，$\Delta G_\mathrm{ion} = -8.3$，$\Delta G_\mathrm{rot} = +1.4\ \mathrm{kJ\,mol^{-1}}$，$\Delta G_\mathrm{lipo} = -0.17\ \mathrm{kJ\,mol^{-1}}\,\text{Å}^{-2}$），为一个形成 3 根理想中性氢键、没有离子对、埋藏 $180\ \text{Å}^2$ 非极性表面并冻结 4 根可旋转键的构象打分，并在 $298\ \mathrm{K}$ 把分数换算成预测的 $\mathrm{p}K_\mathrm{d}$。（预测的 $\mathrm{p}K_\mathrm{d}$ 保留两位有效数字输入。）
::: solution
$\Delta_\mathrm{b}G^\circ \approx 5.4 + 3(-4.7) + 0 + (-0.17)(180) + 1.4(4) = 5.4 - 14.1 - 30.6 + 5.6 = -33.7\ \mathrm{kJ\,mol^{-1}}$。于是 $\mathrm{p}K_\mathrm{d} = 33.7/5.708 = 5.9$，即 $K_\mathrm{d} \approx 1\ \mu\mathrm{mol\,dm^{-3}}$——以 $6\ \mathrm{kJ\,mol^{-1}}$ 的典型误差论，这就是“微摩尔，精确到最近的量级”。
:::
:::

::: exercise 富集系数 {level=2 check="48"}
一个 500,000 个化合物、含 250 个已知活性物的库被对接；测得排名前 $0.50\ \%$，找到 60 个活性物。计算富集系数与这一分率下的可达上限。（输入富集系数。）
::: solution
$x = 0.0050$，故测试了 $xN = 2500$ 个化合物。命中率 $60/2500 = 2.4\ \%$，而背景是 $250/500000 = 0.050\ \%$。由[[#eq-ef]]，$\mathrm{EF} = 60/(0.0050 \times 250) = 60/1.25 = 48$。此分率下的上限是 $1/x = 200$，只有当全部 250 个活性物都排进前 2,500 才可能达到，所以这个排名大约做到了完美的四分之一。注意有 190 个活性物被漏掉：筛选是一台短名单生成器，不是分类器。
:::
:::

::: exercise 一个自由能微扰预测 {level=2 check="9.8"}
某先导的 $K_\mathrm{d} = 120\ \mathrm{nmol\,dm^{-3}}$。对一个拟议的类似物，模拟在 $298\ \mathrm{K}$ 给出 $\Delta G_\mathrm{mut}^\mathrm{bound} = -30.2\ \mathrm{kJ\,mol^{-1}}$、$\Delta G_\mathrm{mut}^\mathrm{free} = -24.0\ \mathrm{kJ\,mol^{-1}}$。预测类似物的 $K_\mathrm{d}$。（$K_\mathrm{d}$ 以 $\mathrm{nmol\,dm^{-3}}$ 输入，保留两位有效数字。）
::: solution
由[[#eq-fep]]，$\Delta\Delta G = -30.2 + 24.0 = -6.2\ \mathrm{kJ\,mol^{-1}}$，于是 $K_{\mathrm{d},2}/K_{\mathrm{d},1} = \exp(-6200/(8.314 \times 298.15)) = \exp(-2.501) = 1/12.2$。故 $K_{\mathrm{d},2} = 120/12.2 = 9.8\ \mathrm{nmol\,dm^{-3}}$。这个预测的可信程度只与“结合方式不变”这一假定一样好；类似物的晶体结构就是检验。
:::
:::

::: exercise 从 IC₅₀ 到配体效率 {level=2 check="0.32"}
一个 30 个重原子的抑制剂在 $[\mathrm{S}] = 2K_\mathrm{M}$ 的竞争性测定中给出 $\mathrm{IC_{50}} = 300\ \mathrm{nmol\,dm^{-3}}$。换算成 $K_\mathrm{I}$ 并计算 $298\ \mathrm{K}$ 下的配体效率。（LE 以每重原子 $\mathrm{kcal\,mol^{-1}}$ 输入，保留两位有效数字。）
::: solution
由 Cheng–Prusoff 关系[[medicinal-chemistry/drug-targets#eq-cheng]]，$K_\mathrm{I} = 300/(1 + 2) = 100\ \mathrm{nmol\,dm^{-3}}$，故 $\mathrm{p}K_\mathrm{I} = 7.00$，$\mathrm{LE} = 1.364 \times 7.00/30 = 0.32\ \mathrm{kcal\,mol^{-1}}$ 每原子（$1.33\ \mathrm{kJ\,mol^{-1}}$）。直接用 $\mathrm{IC_{50}}$ 会得 $0.30$：效率指标继承了它背后效价的一切测定伪影。
:::
:::

::: exercise 连接链算好吗？ {level=3 check="1.1"}
晶体学显示两个片段结合相邻的亚位点，$K_\mathrm{A} = 2.0\ \mathrm{mmol\,dm^{-3}}$、$K_\mathrm{B} = 0.80\ \mathrm{mmol\,dm^{-3}}$。一个连接起来的分子——其结构证实两个片段都保持原来的构象——以 $K_\mathrm{AB} = 1.5\ \mu\mathrm{mol\,dm^{-3}}$ 结合。计算有效摩尔浓度，在 $298\ \mathrm{K}$ 求 $\Delta G_\mathrm{link}$，并说明这些数字对连接链意味着什么。（$E_\mathrm{M}$ 以 $\mathrm{mol\,dm^{-3}}$ 输入，保留两位有效数字。）
::: hint
用[[medicinal-chemistry/hits-and-leads#eq-linking]]：$E_\mathrm{M} = K_\mathrm{A}K_\mathrm{B}/K_\mathrm{AB}$ 且 $E_\mathrm{M} = c^\circ\exp(-\Delta G_\mathrm{link}/RT)$。
:::
::: solution
$E_\mathrm{M} = (2.0\times10^{-3})(8.0\times10^{-4})/(1.5\times10^{-6}) = 1.1\ \mathrm{mol\,dm^{-3}}$，故 $\Delta G_\mathrm{link} = -RT\ln(E_\mathrm{M}/c^\circ) = -0.16\ \mathrm{kJ\,mol^{-1}}$，实际上为零。

所以这条连接链近乎理想：它让两个片段无应变地待在各自的晶体学构象上，而那相对更好的片段一千倍的增益，来自把平动与转动的代价只付一次而不是两次。$E_\mathrm{M}$ 接近 $1\ \mathrm{mol\,dm^{-3}}$ 的值很罕见，要求连接链的长度、刚度与伸出方向全都合适；短一个原子或软一根键通常要付出 $5$–$15\ \mathrm{kJ\,mol^{-1}}$，而结构上会看到一个片段偏离了它的构象。
:::
:::

::: exercise 卡托普利的飞跃 {level=3 check="23.7"}
在卡托普利系列中，琥珀酰-L-脯氨酸抑制 ACE 的 $\mathrm{IC_{50}} = 330\ \mu\mathrm{mol\,dm^{-3}}$，卡托普利为 $\mathrm{IC_{50}} = 23\ \mathrm{nmol\,dm^{-3}}$，在相同条件下测得。(a) 计算 $298\ \mathrm{K}$ 下结合自由能的总增益。(b) 卡托普利有 14 个重原子，琥珀酰-L-脯氨酸有 15 个；评论两者的配体效率。(c) 为什么在这里比较 $\mathrm{IC_{50}}$ 是正当的？什么时候就不正当？（自由能增益以 $\mathrm{kJ\,mol^{-1}}$ 输入，保留三位有效数字。）
::: hint
$\Delta\Delta G = RT\ln 10 \times \log_{10}(\mathrm{IC_{50},1}/\mathrm{IC_{50},2})$，而两个重原子数目足够接近，效率的比较几乎就是效价的比较。
:::
::: solution
(a) 比值为 $(3.30\times10^{-4})/(2.3\times10^{-8}) = 1.435\times10^{4}$，故 $\Delta\Delta G = 5.708 \times 4.157 = 23.7\ \mathrm{kJ\,mol^{-1}}$。

(b) 琥珀酰-L-脯氨酸：$\mathrm{p}K \approx 3.48$，15 个原子，$\mathrm{LE} = 1.32\ \mathrm{kJ\,mol^{-1}}$（$0.32\ \mathrm{kcal\,mol^{-1}}$）每原子。卡托普利：$\mathrm{p}K \approx 7.64$，14 个原子，$\mathrm{LE} = 3.11\ \mathrm{kJ\,mol^{-1}}$（$0.74\ \mathrm{kcal\,mol^{-1}}$）每原子。分子*变小*了，效率却翻了一倍多——这是一个纠正了错配而非增肥的改动的标志，而且这样的数值多半只有金属酶的小而带电的抑制剂才能达到。

(c) 两者是同一酶在相同底物浓度下测定的竞争性抑制剂，所以 Cheng–Prusoff 因子 $(1 + [\mathrm{S}]/K_\mathrm{M})$ 在比值中抵消。若各次测定的 $[\mathrm{S}]$ 不同、抑制机理不同，或是一个 $\mathrm{IC_{50}}$ 逼近酶浓度一半的紧密结合抑制剂，这个比较就会失效。
:::
:::

::: exercise 为什么打分函数偏爱肥分子 {level=3}
(a) 从[[#eq-score]]出发证明：对极性接触不变的同类系列，预测的 $\mathrm{p}K_\mathrm{d}$ 对埋藏的非极性面积 $A_\mathrm{lipo}$ 线性，并求每个加入的 $\mathrm{CH_2}$ 预测的 $\mathrm{p}K_\mathrm{d}$ 增益，设每个 $\mathrm{CH_2}$ 埋藏 $25\ \text{Å}^2$ 非极性表面、每两个 $\mathrm{CH_2}$ 新增一根可旋转键。(b) 与“一个埋藏的亚甲基值约 $2$–$3\ \mathrm{kJ\,mol^{-1}}$”这一经验规则比较。(c) 说明这个函数省略了什么，为什么由此产生的偏差对 $10^9$ 个“按需合成”化合物的虚拟筛选比对二十个类似物的重新打分危险得多。
::: hint
对分数关于 $A_\mathrm{lipo}$ 求导，记住 $\mathrm{p}K_\mathrm{d} = -\Delta_\mathrm{b}G^\circ/(RT\ln 10)$，且 $RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$。
:::
::: solution
(a) 极性求和固定时，[[#eq-score]]化为 $\Delta_\mathrm{b}G^\circ = \text{const} + \Delta G_\mathrm{lipo}A_\mathrm{lipo} + \Delta G_\mathrm{rot}N_\mathrm{rot}$，于是
$$
\mathrm{p}K_\mathrm{d} = -\frac{\Delta_\mathrm{b}G^\circ}{RT\ln 10} = \text{const}' - \frac{\Delta G_\mathrm{lipo}}{5.708}A_\mathrm{lipo} - \frac{\Delta G_\mathrm{rot}}{5.708}N_\mathrm{rot},
$$
对 $A_\mathrm{lipo}$ 线性，斜率 $0.17/5.708 = 0.0298$ 每 $\text{Å}^2$。每个 $\mathrm{CH_2}$ 贡献 $25\ \text{Å}^2$，值 $-4.25\ \mathrm{kJ\,mol^{-1}}$，外加半根可旋转键，花 $+0.7\ \mathrm{kJ\,mol^{-1}}$：净 $-3.55\ \mathrm{kJ\,mol^{-1}}$，即 $\mathrm{p}K_\mathrm{d}$ 的 $0.62$ 个单位——每个亚甲基 4 倍。

(b) 实测增量 $2$–$3\ \mathrm{kJ\,mol^{-1}}$（$\mathrm{p}K_\mathrm{d}$ 的 $0.35$–$0.53$），每个亚甲基小约 $1$–$1.5\ \mathrm{kJ\,mol^{-1}}$；六个碳下来就是 $K_\mathrm{d}$ 上一个数量级以上的夸大，并且随分子大小无上限地增长。

(c) 函数假定每个加入的非极性原子都被完全埋在互补的表面旁，而这超过某个程度在几何上不可能；它把构象熵当成键数，忽略应变；它不惩罚被拖进位点的极性原子的去溶剂化；它对溶解度与清除率一无所知。

偏差的危险程度与搜索的自由度成正比。给二十个大小相近的类似物重新打分是同类与同类相比，对全体共同的夸大在排名中抵消；而对分子量从 200 到 $700\ \mathrm{g\,mol^{-1}}$ 的 $10^9$ 个化合物做一次筛选，等于吩咐它最大化埋藏的非极性面积，它会把最油的分子顶到最前。补救都得靠外部：对接前先按分子量与 $\log P$ 过滤，按配体效率排名（[[medicinal-chemistry/hits-and-leads#def-le]]），并在大小分档内比较。
:::
:::
