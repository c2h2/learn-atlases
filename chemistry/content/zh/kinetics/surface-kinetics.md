气相中的分子是一个喂得饱足得令人恼火的东西：它拥有的每个键都得到满足，每个价都完全配对，它没有任何一点*需要*另一个伙伴。表面原子则恰恰相反。切开一块晶体，内部的原子保留着四个、六个或十二个近邻，而最外层原子失去了原本坐在如今真空所在之处的近邻——它们是**配位不饱和的**，带着悬挂键和一份能量盈余（表面能），使它们饥渴地想结合任何飘过的东西。正是这一个事实——表面是一片配位不饱和的高活性位点——决定了工业催化中约九成的步骤在固体表面上进行：铁上的氨、铂-铑上的尾气、负载钛化合物上的聚合，也决定了腐蚀、中毒与汽车尾气净化器同属一门学问。本章建立那个世界的动力学：分子如何附着（吸附等温式），它们产生的覆盖度如何依赖压力与温度，两个吸附物种如何找到彼此并反应（朗缪尔-欣谢尔伍德图像），以及这一切如何解释从气相看来不可能的反应级数——零级、半级甚至负级。所需的预备工具是 [[kinetics/reaction-mechanisms]] 的平衡与稳态代数以及 [[kinetics/collision-theory]] 的碰撞通量；回报则是通过对照对 [[kinetics/homogeneous-catalysis]] 的定量理解，以及对 [[kinetics/reaction-dynamics]] 中表面科学的理解。

## 表面为何吸附：物理吸附与化学吸附

::: definition 吸附；物理吸附与化学吸附 {#def-adsorption}
**吸附**是指某种物种（**吸附质**）在凝聚相（**吸附剂**）界面上的富集，与**吸收**不同——吸收中物种渗入体相。气体在固体上的吸附分为两类，以维系它的力区分：

| | 物理吸附 | 化学吸附 |
|---|---|---|
| 力 | 范德华力（色散、诱导、偶极） | 真正的化学键（σ、π 给予；反馈到反键轨道） |
| 焓 | $-5$ 至 $-40\ \mathrm{kJ\,mol^{-1}}$，与凝聚相仿 | $-50$ 至 $-400\ \mathrm{kJ\,mol^{-1}}$，与成键相仿 |
| 专一性 | 几乎普遍存在，弱依赖结构 | 高度专一：$\mathrm{H_2}$ 在 W、Ni 上化学吸附，在石墨上不 |
| 活化 | 无（总是很快） | 常需活化：要断键（如 $\mathrm{H_2}$ 解离） |
| 可逆性 | 在凝聚温度附近可逆 | 常不可逆；只在高得多的 $T$ 下脱附，有时以解离态脱附 |
| 层数 | 可以多层 | 严格**单层**：每个表面位点一个键 |
| 吸附质状态 | 分子完整，仅弱极化 | 分子常已解离（$\mathrm{N_2 \rightarrow 2\,N}$），被强烈改变 |

两类常先后相继：分子先在浅的**前驱态**中物理吸附，在表面扩散，然后要么再蒸发，要么跌入化学吸附势阱。
:::

::: definition 表面覆盖度 {#def-coverage}
某吸附物种的**分数表面覆盖度** $\theta$ 是它占据的可利用表面位点分数：$\theta = 0$ 是干净表面，$\theta = 1$ 是完整**单层**（每个表面位点一个吸附粒子）。实验上 $\theta$ 由吸附量 $V$（物质的量，或标准压力温度下的气体体积）除以**单层容量** $V_\mathrm{mon}$ 得到：$\theta = V/V_\mathrm{mon}$。典型金属表面每平方米承载约 $10^{19}$ 个位点，所以一克高比表面催化剂上的单层是可测量的气体量——吸附等温式是表面的温度计。
:::

化学吸附是与表面发生的一场化学反应，和任何反应一样，当必须断键时它有活化能——$\mathrm{H_2}$ 或 $\mathrm{N_2}$ 的解离化学吸附通常需要，分子态物理吸附从不需要。这就是为什么真空腔里的"干净"表面不会自动被覆盖：在 $\mathrm{100\ K}$ 几乎每次碰撞都粘住（物理吸附），而在 $\mathrm{600\ K}$ 分子可能撞击表面百万次才有一次撞上活化位点而成键。

::: example 碰撞通量与单层生长时间 {#ex-flux}
气体分子撞击单位表面面积的通量（Hertz–Knudsen 撞击率，来自 [[kinetics/collision-theory]]：每个分子都是每秒扫过 $\tfrac{1}{2}\bar v$ 体积的靶，同种分子碰撞的 $\sqrt{2}$ 因子的一半）为
$$
Z_\mathrm{W} = \frac{p}{\left(2\pi m k_\mathrm{B} T\right)^{1/2}} .
$$
计算 $p = 1.00\times10^{-4}\ \mathrm{Pa}$、$T = 300\ \mathrm{K}$ 下 $\mathrm{N_2}$（$M = 28.02\ \mathrm{g\,mol^{-1}}$）的 $Z_\mathrm{W}$，以及在位密度 $1.0\times10^{19}\ \mathrm{m^{-2}}$ 的表面上、每次碰撞都粘住时生长一个单层所需的时间。在 $p = 1.00\times10^{-7}\ \mathrm{Pa}$ 和 $1.00\times10^{5}\ \mathrm{Pa}$ 下这两个时间又各是多少？
::: solution
一个 $\mathrm{N_2}$ 分子的质量 $m = 0.02802\ \mathrm{kg\,mol^{-1}} / 6.022\times10^{23}\ \mathrm{mol^{-1}} = 4.65\times10^{-26}\ \mathrm{kg}$，于是
$$
2\pi m k_\mathrm{B} T = 2\pi \times 4.65\times10^{-26} \times 1.381\times10^{-23} \times 300 = 1.211\times10^{-45}\ \mathrm{kg^{2}\,m^{2}\,s^{-2}}
$$
故
$$
Z_\mathrm{W} = \frac{1.00\times10^{-4}\ \mathrm{Pa}}{\left(1.211\times10^{-45}\right)^{1/2}} = \frac{1.00\times10^{-4}}{3.48\times10^{-23}} = 2.87\times10^{18}\ \mathrm{m^{-2}\,s^{-1}} .
$$
一个单层需要 $1.0\times10^{19}\ \mathrm{m^{-2}}$ 次粘附事件，所以
$$
t_\mathrm{ML} = \frac{1.0\times10^{19}}{2.87\times10^{18}} = 3.5\ \mathrm{s}.
$$
因为 $Z_\mathrm{W} \propto p$，时间随压力反比变化：在 $1.00\times10^{-7}\ \mathrm{Pa}$ 下为 $3.5\times10^{3}\ \mathrm{s} \approx 1\ \mathrm{h}$，在大气压 $1.00\times10^{5}\ \mathrm{Pa}$ 下为 $3.5\times10^{-9}\ \mathrm{s}$——纳秒。这就是表面科学必须在 $10^{-7}\ \mathrm{Pa}$ 以下进行的全部理由：只有在那里，干净表面才活得足够长、值得研究。
:::
:::

## 朗缪尔吸附等温式

第一个表面定量理论是朗缪尔（Langmuir）1916 年提出的，它是假设最小化的杰作。

::: proposition 朗缪尔吸附等温式 {#prop-langmuir}
假设 (i) 固定密度的等价、独立位点；(ii) 每个位点一个吸附质，故最多一个单层；(iii) 吸附近邻之间无相互作用；(iv) 分子（非解离）吸附与气体平衡。则平衡覆盖度为
$$
\theta = \frac{Kp}{1 + Kp},
\qquad\text{等价地}\qquad
\frac{p}{V} = \frac{1}{K V_\mathrm{mon}} + \frac{p}{V_\mathrm{mon}},
$$
其中 $V = V_\mathrm{mon}\theta$ 是吸附量，$K$（单位 $\mathrm{压力^{-1}}$）是**吸附平衡常数**。两种线性形式——$p/V$ 对 $p$（斜率 $1/V_\mathrm{mon}$，截距 $1/KV_\mathrm{mon}$）与 $1/\theta$ 对 $1/p$——是从数据提取 $K$ 与 $V_\mathrm{mon}$ 的经典方法。极限才是有意思的部分：低压下 $Kp \ll 1$，$\theta \approx Kp$——吸附以及由它供料的任何表面反应对压力呈**一级**；高压下 $Kp \gg 1$，$\theta \rightarrow 1$——表面**饱和**，速率变为**零级**。温度依赖由带（负的）吸附焓的范特霍夫方程给出：
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{ads} H}{RT^{2}} < 0,
\qquad
K \propto e^{-\Delta_\mathrm{ads} H / RT},
$$
所以在固定压力下覆盖度随表面加热而*下降*：吸附是放热的，加热总使表面趋于更干净。
:::

::: proof 朗缪尔等温式，推导两次 {#proof-langmuir}
**动态平衡推导。**吸附需要一个气体分子*加上*一个空位，故其速率正比于碰撞通量（∝ $p$）乘以空位分数：$r_\mathrm{ads} = k_\mathrm{a}\,p\,(1 - \theta)$。脱附只需要一个吸附分子：$r_\mathrm{des} = k_\mathrm{d}\,\theta$。平衡时两速率相等，
$$
k_\mathrm{a}\,p\,(1 - \theta) = k_\mathrm{d}\,\theta
\qquad\Longrightarrow\qquad
\theta = \frac{(k_\mathrm{a}/k_\mathrm{d})\,p}{1 + (k_\mathrm{a}/k_\mathrm{d})\,p},
$$
这就是以 $K = k_\mathrm{a}/k_\mathrm{d}$ 写出的等温式。两个常量的物理一目了然：$k_\mathrm{a}$ 承载碰撞通量与粘附系数（弱依赖 $T$），而 $k_\mathrm{d} = \nu\,e^{-E_\mathrm{des}/RT}$ 是从深度为 $E_\mathrm{des}$ 的吸附势阱中的阿伦尼乌斯逃逸。于是 $K \propto e^{(E_\mathrm{des} - 0)/RT}$（差前置因子），而由于 $\Delta_\mathrm{ads} H = E_\mathrm{ads} - E_\mathrm{des} < 0$（分子吸附时 $E_\mathrm{ads} \approx 0$），$K$ 随温度下降，恰如范特霍夫方程所要求。

**化学势推导。**把气体当理想气体，$\mu_\mathrm{g} = \mu^\circ(T) + RT\ln(p/p^\circ)$，把吸附层当作占据位点（分数 $\theta$）与空位（分数 $1 - \theta$）构成的理想二维溶液，其化学势为
$$
\mu_\mathrm{ads} = \mu_\mathrm{ads}^{\circ}(T) + RT\ln\frac{\theta}{1 - \theta}
$$
（把分子放到位点上的混合熵给出 $\ln\theta/(1-\theta)$ 项）。平衡要求 $\mu_\mathrm{ads} = \mu_\mathrm{g}$：
$$
\ln\frac{\theta}{1 - \theta} = \ln\frac{p}{p^\circ} - \frac{\mu_\mathrm{ads}^{\circ} - \mu^{\circ}}{RT}
\qquad\Longrightarrow\qquad
\frac{\theta}{1 - \theta} = Kp,
\qquad
K = \frac{1}{p^\circ}\,e^{-(\mu_\mathrm{ads}^{\circ} - \mu^{\circ})/RT}.
$$
两个推导结果一致，因为 $K = k_\mathrm{a}/k_\mathrm{d}$ *就是*步 $\mathrm{A(g)} + * \rightleftharpoons \mathrm{A(ads)}$ 的平衡常数（此处及下文 $*$ 表示空位），而第二种形式使范特霍夫符号一目了然：$\mu^\circ$ 含焓，吸附降低焓。由 $\theta/(1-\theta) = Kp$ 解出 $\theta$ 即得等温式；写入 $V = V_\mathrm{mon}\theta$ 并整理得 $p/V = p/V_\mathrm{mon} + 1/(KV_\mathrm{mon})$，是 $p$ 的直线。
:::

::: widget plot
f: k*x/(1 + k*x)
x: 0, 10
y: 0, 1.05
sliders: k=1:0.1:10:0.1
labels: \text{朗缪尔覆盖度 } \theta
caption: 朗缪尔等温式 $\theta = Kp/(1 + Kp)$，吸附常数 $K$（以压力轴的倒数单位计）由滑块设定。每条曲线在低压下以斜率 $K$ 线性上升，在 $Kp = 1$（恰有 $\theta = \tfrac{1}{2}$）处弯折，并趋于 $\theta = 1$ 而变平：饱和不是细节，它就是形状本身。调大 $K$（结合更强，或温度更低）把拐点移向更低的压力——整族曲线只是同一条曲线沿 $\log p$ 轴的拉伸。变平的尾部正是零级表面化学的栖身之地。
:::

::: example 由朗缪尔常数计算覆盖度 {#ex-langmuir-theta}
某气体在均匀表面上分子吸附，$300\ \mathrm{K}$ 时 $K = 0.25\ \mathrm{kPa^{-1}}$。计算 $p = 1.0$、$5.0$ 与 $20\ \mathrm{kPa}$ 处的 $\theta$，以及 $\theta = 0.99$ 所需的压力。吸附放热，$\Delta_\mathrm{ads} H = -60\ \mathrm{kJ\,mol^{-1}}$：求 $350\ \mathrm{K}$ 时的 $K$ 与 $\theta(5.0\ \mathrm{kPa})$。
::: solution
$\theta = Kp/(1 + Kp)$：
$$
\theta(1.0) = \frac{0.25}{1.25} = 0.20,
\qquad
\theta(5.0) = \frac{1.25}{2.25} = 0.56,
\qquad
\theta(20) = \frac{5.0}{6.0} = 0.83 .
$$
反解等温式求压力：$p = \theta/[K(1 - \theta)]$，故
$$
p(\theta = 0.99) = \frac{0.99}{0.25 \times 0.01} = 3.96\times10^{2}\ \mathrm{kPa}.
$$
达到 $99\ \%$ 覆盖所花的压力是达到 $50\ \%$ 的一千倍——饱和吝啬它的最后百分之一。温度变化方面，在 $300$ 与 $350\ \mathrm{K}$ 之间积分范特霍夫方程：
$$
\ln\frac{K(350)}{K(300)} = -\frac{\Delta_\mathrm{ads} H}{R}\left(\frac{1}{350} - \frac{1}{300}\right)
= \frac{60\,000}{8.314}\times\left(-4.762\times10^{-4}\right) = -3.44,
$$
故 $K(350) = 0.25\,e^{-3.44} = 8.0\times10^{-3}\ \mathrm{kPa^{-1}}$——小了 $31$ 倍——于是
$$
\theta(5.0\ \mathrm{kPa},\,350\ \mathrm{K}) = \frac{0.040}{1.040} = 0.039 .
$$
$50\ \mathrm{K}$ 的升温在固定压力下把表面从 $56\ \%$ 覆盖剥蚀到 $4\ \%$。这就是为什么"一加热反应反而停了"可能是表面*饱和*的故事而非失活的故事，也是程序升温脱附能够成立的原因。
:::
:::

::: example 由直线图提取 K 与单层容量 {#ex-linear-fit}
$298\ \mathrm{K}$ 下某气体在 $1\ \mathrm{g}$ 催化剂上的吸附量 $V$ 如下。用朗缪尔等温式检验并提取 $K$ 与 $V_\mathrm{mon}$。

| $p/\mathrm{kPa}$ | $5.0$ | $10.0$ | $20.0$ | $40.0$ |
|---|---|---|---|---|
| $V/(\mathrm{cm^{3}\,g^{-1}})$（STP） | $50.0$ | $66.7$ | $80.0$ | $88.9$ |
::: solution
计算 $p/V$（单位 $\mathrm{kPa\,g\,cm^{-3}}$）：$0.100$、$0.150$、$0.250$、$0.450$。它们对 $p$ 落在一条直线上——这就是朗缪尔检验——因为 $p/V = p/V_\mathrm{mon} + 1/(KV_\mathrm{mon})$。过两端点的斜率为
$$
\text{slope} = \frac{0.450 - 0.100}{40.0 - 5.0} = \frac{0.350}{35.0} = 0.0100\ \mathrm{g\,cm^{-3}},
\qquad
V_\mathrm{mon} = \frac{1}{0.0100} = 1.00\times10^{2}\ \mathrm{cm^{3}\,g^{-1}},
$$
截距（在 $p = 0$ 处读出，或由任一点：$0.100 - 0.0100 \times 5.0$）为 $0.050 = 1/(K V_\mathrm{mon})$，故
$$
K = \frac{1}{0.050 \times 100} = 0.20\ \mathrm{kPa^{-1}} .
$$
检验：预测 $V(40) = 100 \times 8/9 = 88.9$——中间各点也在直线上，故线性形式自洽。最小二乘拟合（下图）给出同样的斜率与截距；注意*线性化改变了误差的权重*——低压点在 $p/V$ 中被放大——这就是现代工作直接拟合 $V$ 的原因。
:::
:::

::: widget regression
points: 5,0.100; 10,0.150; 20,0.250; 40,0.450
degree: 1
x: 0, 45
y: 0, 0.5
caption: 上例数据的朗缪尔线性化 $p/V$ 对 $p$：一条斜率 $1/V_\mathrm{mon} = 0.0100$、截距 $1/(KV_\mathrm{mon}) = 0.050$ 的直线，由此得 $V_\mathrm{mon} = 100\ \mathrm{cm^{3}\,g^{-1}}$、$K = 0.20\ \mathrm{kPa^{-1}}$。拖动数据点，看 $R^{2}$ 如何崩塌——这张图的线性*就是*朗缪尔模型的实验内容；它的失效（高压端向上弯曲，或向下弯曲）正是诊断多层吸附或表面不均匀性的方法。
:::

::: warning 零级是饱和的证据，而非零级基元步的证据 {#warn-zero-order}
你在 [[kinetics/rate-laws]] 中见过零级反应，并被告诫零级绝不是反应分子数——没有任何基元步的速率与一切无关。在表面上零级有自己的机理：它就是 $\theta \rightarrow 1$。一个在几十个压力数量级内对某反应物保持零级的气相反应在告诉你：该反应物占有了表面（$Kp \gg 1$），速率由拥挤吸附层里发生的事决定，而非分子到达的快慢。实际后果很尖锐：速率不依赖该反应物的压力（加大它毫无收获），会被任何其他吸附物种*抑制*（争夺日益缩小的空位池），并会在压力降到 $Kp \sim 1$ 时突然转为一级。酶饱和动力学是同一套代数在溶液中的版本；在速率方程背后看见 $\theta = Kp/(1+Kp)$ 是可迁移的本领。
:::

## 假设失效时：特姆金与弗罗因德利希等温式

::: proposition 超越朗缪尔：特姆金（Temkin）与弗罗因德利希（Freundlich）等温式 {#prop-beyond-langmuir}
**特姆金等温式（相互作用的吸附质）。**若吸附物种相互排斥（或吸引），吸附焓随覆盖度线性变化，$\Delta_\mathrm{ads} H(\theta) = \Delta_\mathrm{ads} H^{\circ}(1 - g\theta)$，平衡常数获得一个平均场因子，$K(\theta) = K^{\circ} e^{g\theta/RT}$——即 $\ln K$ 随 $\theta$ 线性变化。把平衡条件 $\theta/(1-\theta) = K(\theta)\,p$ 写在物理上感兴趣的中间覆盖区间，得
$$
\theta \propto \ln\!\left(K^{\circ} p\right) :
$$
覆盖度只随压力*对数*增长，这是一个越来越难填满的表面的签名。

**弗罗因德利希等温式（不均匀位点）。**对结合能存在分布的表面，经验式
$$
\theta = k_\mathrm{F}\, p^{1/n} \qquad (n > 1)
$$
在有限压力区间内拟合良好。它是**经验的**：没有饱和极限（$p \rightarrow \infty$ 时 $\theta \rightarrow \infty$，荒谬），$k_\mathrm{F}$ 与 $n$ 没有分子解释，也没有温度热力学——但它简单，而不均匀表面（氧化物、碳、真实催化剂）在两三个压力数量级内服从它。一组带合适 $K$ 分布的朗缪尔位点可以再现弗罗因德利希形式，这才是读它的诚实方式。
:::

::: warning 特姆金与弗罗因德利希是对朗缪尔的修补，而非改进 {#warn-fixes}
人们容易把三个等温式排成"朗缪尔，然后加修正"。要抵制：朗缪尔是一个*模型*（位点、无相互作用、单层），其参数有含义；弗罗因德利希是一个*拟合函数*，其参数孤立地看没有含义；特姆金则是用一个假设（能量随覆盖度线性变化）换掉另一个假设（无相互作用）。把弗罗因德利希拟合到数据并宣称"$n$ 表征不均匀性"是范畴错误，除非确实测得了位点能量分布。真正要紧的诊断是形状：朗缪尔弯向平台，特姆金按对数缓慢爬升，弗罗因德利希永不停止上升。在你的压力范围内数据服从哪一个，说的是你的表面，不是方程的优雅。
:::

## 多层吸附与比表面：BET 等温式

化学吸附止于单层；物理吸附不然，而多层正是催化剂与材料科学中使用最广的测量的基础。

::: proposition BET 等温式 {#prop-bet}
布鲁诺（Brunauer）、埃米特（Emmett）与泰勒（Teller）（1938）让朗缪尔模型逐层堆叠：(i) 表面有 $N_\mathrm{s}$ 个位点；(ii) 层一层一层生长——分子只能在第 $i-1$ 层已满处吸附到第 $i$ 层——且*每一层*各自服从朗缪尔平衡；(iii) 第一层感受固体的作用，焓为 $\Delta_\mathrm{ads} H_1$，更高各层只感受邻居，故 $\Delta_\mathrm{ads} H_{i\ge 2} = \Delta_\mathrm{vap} H$（凝聚焓）；(iv) 无横向相互作用。对所得级数求和得 **BET 等温式**，几乎总以线性形式使用，其中 $x = p/p^\circ$（相对压力）：
$$
\frac{x}{V(1 - x)} = \frac{1}{V_\mathrm{m} C} + \frac{C - 1}{V_\mathrm{m} C}\,x,
\qquad
C = e^{-(\Delta_\mathrm{ads} H_1 - \Delta_\mathrm{vap} H)/RT} \gg 1,
$$
其中 $V_\mathrm{m}$ 是单层容量，$C$ 度量第一层比凝聚被优先多少。$x/[V(1-x)]$ 对 $x$ 的图是直线；斜率 $+$ 截距 $= 1/V_\mathrm{m}$，且 $C = (\text{slope}/\text{intercept}) + 1$。标准测量——一种**测量技术**，不是反应——是 $77\ \mathrm{K}$（液氮）下 $\mathrm{N_2}$ 的吸附，在 $x = 0.05$–$0.35$ 区间拟合，分子面积取 $\sigma(\mathrm{N_2}) = 0.162\ \mathrm{nm^{2}}$：
$$
S = \frac{V_\mathrm{m} N_\mathrm{A} \sigma}{V_\mathrm{m}^\text{(gas)}}\,,
$$
其中 $V_\mathrm{m}^{\text{(gas)}} = 22\,414\ \mathrm{cm^{3}\,mol^{-1}}$（STP）把单层体积换算为物质的量。
:::

::: widget plot
f: (1 + (c - 1)*x)/(vm*c)
x: 0, 0.9
y: 0, 0.02
sliders: vm=120:50:200:10; c=20:5:300:5
labels: \text{BET 线性形式}
caption: BET 线性形式 $x/[V(1-x)] = [1 + (C-1)x]/(V_\mathrm{m}C)$ 对相对压力 $x = p/p^\circ$，单层容量 $V_\mathrm{m}$ 与亲和参数 $C$ 由滑块设定。图按构造就是线性的——这就是全部诀窍——斜率 $+$ 截距 $= 1/V_\mathrm{m}$；大 $C$（第一层结合很强，$\mathrm{N_2}$ 在 $77\ \mathrm{K}$ 氧化物上的常见情形）把曲线的弯曲推进 $x > 0.4$ 区域，而该方法刻意忽略该区域。
:::

::: example 一次 BET 比表面测定 {#ex-bet}
$77\ \mathrm{K}$ 下 $\mathrm{N_2}$ 在 $1.00\ \mathrm{g}$ 某氧化物催化剂上的吸附数据如下（$p^\circ = 101.3\ \mathrm{kPa}$）：

| $p/p^\circ$ | $0.050$ | $0.100$ | $0.200$ | $0.300$ |
|---|---|---|---|---|
| $V/(\mathrm{cm^{3}\,g^{-1}})$（STP） | $109.0$ | $124.0$ | $145.2$ | $168.2$ |

求 $V_\mathrm{m}$、$C$ 与比表面。
::: solution
逐点计算 $y = x/[V(1 - x)]$：
$$
y = 4.83\times10^{-4},\ 8.96\times10^{-4},\ 1.722\times10^{-3},\ 2.549\times10^{-3}.
$$
它们对 $x$ 是一条直线（差分可证实：$\Delta y/\Delta x$ 到三位数字恒定）。由两端点求斜率
$$
\text{slope} = \frac{(2.549 - 0.483)\times10^{-3}}{0.300 - 0.050} = 8.26\times10^{-3},
\qquad
\text{intercept} = 4.83\times10^{-4} - 0.050 \times 8.26\times10^{-3} = 7.0\times10^{-5},
$$
于是
$$
V_\mathrm{m} = \frac{1}{\text{slope} + \text{intercept}} = \frac{1}{8.33\times10^{-3}} = 1.20\times10^{2}\ \mathrm{cm^{3}\,g^{-1}},
\qquad
C = \frac{8.26\times10^{-3}}{7.0\times10^{-5}} + 1 \approx 1.2\times10^{2}.
$$
$C \approx 120$ 是 $\mathrm{N_2}$ 在氧化物上的典型值（第一层比凝聚结合强得多），而 $C > 1$ 且图为直线，正是该方法要求的质量检验。面积由单层中的分子数得出：
$$
S = \frac{120\ \mathrm{cm^{3}\,g^{-1}}}{22\,414\ \mathrm{cm^{3}\,mol^{-1}}} \times 6.022\times10^{23}\ \mathrm{mol^{-1}} \times 0.162\times10^{-18}\ \mathrm{m^{2}}
= 5.22\times10^{2}\ \mathrm{m^{2}\,g^{-1}} .
$$
一克这种粉末呈现五百平方米——每克半个足球场的表面，这就是负载型催化剂做成粉末的原因，也是 $S$ 位列任何催化剂数据表第一行的原因。$V$ 给到四位，故保留三位；BET 方法本身的诚实不确定度为百分之几。
:::
:::

## 吸附物种之间的反应：朗缪尔-欣谢尔伍德动力学

::: definition 朗缪尔-欣谢尔伍德机理与艾雷-李德尔机理 {#def-lh-er}
考虑双分子表面反应 $\mathrm{A + B \rightarrow P}$。两种极限机理相互竞争：

- **朗缪尔-欣谢尔伍德（LH）机理：***两个*反应物都吸附，作为可移动吸附物种扩散（常由物理吸附**前驱态**供料），并在*都在表面上*时相互反应：$\mathrm{A(ads) + B(ads) \rightarrow P + 2\,*}$。速率正比于发现 A 与 B 相邻的概率，$v \propto \theta_\mathrm{A}\theta_\mathrm{B}$。
- **艾雷-李德尔（ER）机理：**一个反应物吸附；另一个在撞击它时*直接从气相*（或从松散的吸附前驱态）反应：$\mathrm{A(g) + B(ads) \rightarrow P + *}$。速率为 $v \propto p_\mathrm{A}\,\theta_\mathrm{B}$，热的稀分子束可以维持它。

实验上以压力依赖区分两者：ER 速率随进攻物种的气相压力无限增长，LH 速率则被位点竞争扼住并出现极大值。许多真实反应介于两个极限之间，有"热原子"与经由前驱态的通道共同贡献。
:::

::: proposition 朗缪尔-欣谢尔伍德速率方程与位点竞争 {#prop-lh-rate}
两个反应物在同一批位点上分子吸附，且表面反应步（速率常数 $k$）为决速步，则
$$
v = k\,\theta_\mathrm{A}\theta_\mathrm{B}
= \frac{k\,K_\mathrm{A} K_\mathrm{B}\,p_\mathrm{A} p_\mathrm{B}}{\left(1 + K_\mathrm{A}p_\mathrm{A} + K_\mathrm{B}p_\mathrm{B}\right)^{2}} .
$$
分母是位点竞争因子：每个吸附物种都从每个其他物种手里偷位点。后果正是 LH 动力学能解释如此多工业行为的原因：

- **强吸附的抑制。**若 B 比 A 结合强得多（$K_\mathrm{B}p_\mathrm{B} \gg 1 + K_\mathrm{A}p_\mathrm{A}$），则 $v \approx k\,(K_\mathrm{A}/K_\mathrm{B})\,p_\mathrm{A}/p_\mathrm{B}$：*对弱吸附反应物为一级，对强吸附者为负（倒数）级*。多加 B 反而拖慢反应——B 毒化它自己的反应。
- **速率的极大值。**当 A 弱吸附时，$v$ 在 $p_\mathrm{B}$ 上经过一个极大值，位置在 $K_\mathrm{B}p_\mathrm{B} = 1$（下面证明）：最优操作在 B 半覆盖处，而非把 B 加到饱和。
- **经典案例：**铂上 CO 氧化，$\mathrm{CO + \tfrac{1}{2}O_2 \rightarrow CO_2}$，其中 CO 的吸附远强于氧（氧需要*两个*相邻空位才能解离）。低温高 CO 压下表面被 CO 饱和而近乎死寂——这种自毒化使冷车的尾气污染严重；催化转化器的"点火"就是 CO 覆盖度降到足以让氧上表面的那个温度。
:::

::: proof 当 A 弱吸附时，LH 极大值位于 $K_\mathrm{B} p_\mathrm{B} = 1$ {#proof-lh-max}
设 A 弱吸附，$K_\mathrm{A}p_\mathrm{A} \ll 1$，故 $\theta_\mathrm{A} \approx K_\mathrm{A}p_\mathrm{A}$ 基本固定，竞争只发生在 B 与空位之间：
$$
v \propto \theta_\mathrm{B} \cdot \text{const} \times \theta_\mathrm{A}
\propto \frac{K_\mathrm{B}p_\mathrm{B}}{\left(1 + K_\mathrm{B}p_\mathrm{B}\right)^{2}} .
$$
（平方：$\theta_\mathrm{B}$ 贡献一个 $K_\mathrm{B}p_\mathrm{B}$，$\theta_\mathrm{A} \propto \theta_* = 1/(1 + K_\mathrm{B}p_\mathrm{B})$ 贡献一个。）记 $x = K_\mathrm{B}p_\mathrm{B}$，对 $f(x) = x/(1+x)^{2}$ 求导：
$$
f'(x) = \frac{(1+x)^{2} - x\cdot 2(1+x)}{(1+x)^{4}} = \frac{1 - x}{(1+x)^{3}},
$$
它只在 $x = 1$ 处为零，且在此由 $+$ 变 $-$：极大值在
$$
K_\mathrm{B}\,p_\mathrm{B} = 1
\qquad\Longleftrightarrow\qquad
\theta_\mathrm{B} = \tfrac{1}{2}.
$$
最大速率 $f(1) = \tfrac{1}{4}$ 是两个饱和极限乘积的四分之一，且 $f$ 关于 $\log x$ 对称：$f(1/x) = f(x)$，故 $K_\mathrm{B}p_\mathrm{B} = \tfrac{1}{2}$ 处的速率等于 $K_\mathrm{B}p_\mathrm{B} = 2$ 处的速率。半层 B 是最好的世界：B 足够多以反应，空位足够多以让 A 上来。
:::

::: widget plot
f: ka*kb*x/((1 + ka*pa + kb*x)^2)
x: 0, 10
y: 0, 0.3
sliders: ka=0.2:0.05:2:0.05; kb=1:0.1:5:0.1; pa=1:0.1:5:0.1
labels: \text{LH 速率 } v/k
caption: 朗缪尔-欣谢尔伍德速率 $v/k = K_\mathrm{A}K_\mathrm{B}p_\mathrm{A}p_\mathrm{B}/(1 + K_\mathrm{A}p_\mathrm{A} + K_\mathrm{B}p_\mathrm{B})^{2}$ 对 $p_\mathrm{B}$，$K_\mathrm{A}$、$K_\mathrm{B}$ 与 $p_\mathrm{A}$ 在滑块上。当 $K_\mathrm{A}p_\mathrm{A} \ll 1$ 时曲线线性上升，在 $K_\mathrm{B}p_\mathrm{B} = 1$ 处达峰，然后按 $1/p_\mathrm{B}$ 下降——对反应物的负级数，由机理画出。把 $K_\mathrm{A}p_\mathrm{A}$ 调大，看峰如何缩小并移动：A 与 B 是同一批座位的争夺者，火山不在化学里，而在位点的记账里。
:::

::: example CO 氧化的极大值落在哪里？ {#ex-lh-max}
某温度下铂上 CO 氧化取 $K_\mathrm{CO} = 2.0\ \mathrm{kPa^{-1}}$，并把氧视为固定在给定 $p_{\mathrm{O_2}}$ 下的弱吸附反应物。速率在何 $p_\mathrm{CO}$ 处最大？在 $p_\mathrm{CO} = 0.10$ 与 $5.0\ \mathrm{kPa}$ 处各损失最大速率的多少？
::: solution
CO 是强吸附物种，极大值在 $K_\mathrm{CO}\,p_\mathrm{CO} = 1$：
$$
p_\mathrm{CO}^{*} = \frac{1}{2.0\ \mathrm{kPa^{-1}}} = 0.50\ \mathrm{kPa}.
$$
约化速率为 $f(x) = x/(1+x)^{2}$，$x = K_\mathrm{CO}p_\mathrm{CO}$，$f(1) = 0.25$。在 $p_\mathrm{CO} = 0.10\ \mathrm{kPa}$ 处 $x = 0.20$：
$$
\frac{v}{v_\mathrm{max}} = \frac{0.20/1.44}{0.25} = \frac{0.139}{0.25} = 0.56 ;
$$
在 $5.0\ \mathrm{kPa}$ 处 $x = 10$：
$$
\frac{v}{v_\mathrm{max}} = \frac{10/121}{0.25} = \frac{0.0826}{0.25} = 0.33 .
$$
最优 CO 压的五倍只给出三分之一的速率——自毒化是有代价的。另注意上面证明的对数对称性：$p_\mathrm{CO} = 0.25\ \mathrm{kPa}$（$x = 0.5$）与 $1.0\ \mathrm{kPa}$（$x = 2$）给出完全相同的速率，这是拟合数据时值得一查的诊断。
:::
:::

::: definition 萨巴蒂埃原理 {#def-sabatier}
萨巴蒂埃原理（1912）：最好的催化剂对反应物的结合*既不太强也不太弱*。太弱（$K \ll 1$）则表面空着——没有反应物被活化；太强（$K \rightarrow \infty$）则表面死寂——吸附质不能动、遇不到伙伴、也不能作为产物脱附。LH 速率律的两个极限之间存在一个最优，把活性对结合能的代理量作图得到**火山曲线**，其顶点标记理想催化剂。该原理不是定理，但它组织了多相催化：Pt 在加氢与 CO 氧化中接近火山顶点；硫对几乎一切结合都太好，因而成为普遍毒物；贵金属对某些键活化结合太弱，对另一些则出色。
:::

::: example 钨上氨分解的速率方程 {#ex-nh3}
氨在热钨上分解，$\mathrm{2\,NH_3 \rightarrow N_2 + 3\,H_2}$，在工业范围的很大区间内观测速率方程为
$$
v = k_\text{obs}\,\frac{p_\mathrm{NH_3}}{p_\mathrm{H_2}^{1/2}} .
$$
提出一个 LH 机理并推导它。
::: solution
取三个快速平衡步或慢步：

1. 氨的分子吸附，快速平衡：$\mathrm{NH_3(g)} + * \rightleftharpoons \mathrm{NH_3(ads)}$，$K_1 = \theta_\mathrm{NH_3}/(p_\mathrm{NH_3}\,\theta_*)$。
2. 氢（产物）的解离吸附，快速平衡：$\mathrm{H_2(g)} + 2\,* \rightleftharpoons 2\,\mathrm{H(ads)}$，$\theta_\mathrm{H} = (K_2 p_\mathrm{H_2})^{1/2}\,\theta_*$（解离吸附到成对位点——见习题）。
3. 表面吸附氨的决速转化（N–H 断裂级联至 $\mathrm{N_2}$）：$\mathrm{NH_3(ads)} \rightarrow$ 产物，$v = k\,\theta_\mathrm{NH_3}$。

由 1，$v = k K_1 p_\mathrm{NH_3}\,\theta_*$。位点衡算为 $\theta_\mathrm{NH_3} + \theta_\mathrm{H} + \theta_* = 1$；氨分解被氢强烈抑制，故表面被氢覆盖，$\theta_\mathrm{H} \gg \theta_\mathrm{NH_3}, \theta_*$，于是
$$
\theta_* \approx \frac{1}{1 + (K_2 p_\mathrm{H_2})^{1/2}} \approx (K_2 p_\mathrm{H_2})^{-1/2}.
$$
因此
$$
v = k K_1\,p_\mathrm{NH_3}\,(K_2 p_\mathrm{H_2})^{-1/2}
= \underbrace{k K_1 K_2^{-1/2}}_{k_\text{obs}}\;\frac{p_\mathrm{NH_3}}{p_\mathrm{H_2}^{1/2}} .
$$
对氢的半级数是*解离吸附在说话*；抑制是位点竞争在说话；对氨的一级是氨自身的低覆盖极限。在低 $p_\mathrm{H_2}$（或高温）下氢的覆盖退去，$\theta_* \rightarrow 1$，速率过渡到 $v = kK_1p_\mathrm{NH_3}/(1 + K_1p_\mathrm{NH_3})$——低压下对氨一级，氨饱和表面时零级。一个机理，三种观测级数，绝非巧合。
:::
:::

::: quiz
铂上 CO 氧化服从朗缪尔-欣谢尔伍德速率方程，CO 比氧吸附强得多。为什么 CO 压力升得远超极大值后速率反而*下降*？
- [x] CO 占满表面，而氧——需要两个相邻空位才能解离——再也无法吸附，于是 $\theta_\mathrm{O}$ 崩塌，$v \propto \theta_\mathrm{CO}\theta_\mathrm{O}$ 下降。
- [ ] CO 与 $\mathrm{CO_2}$ 反应重新生成 $\mathrm{CO}$，抵消了产物。
- [ ] 表面步的活化能随 CO 压力升高而增大。
- [ ] 高 CO 压力按勒夏特列原理使氧的吸附平衡移向气相。
::: solution
速率需要*两个*伙伴都在表面上。越过极大值后 $K_\mathrm{CO}p_\mathrm{CO} \gg 1 + K_\mathrm{O}p_\mathrm{O}$，故 $\theta_\mathrm{CO} \rightarrow 1$ 而 $\theta_* \rightarrow 0$：氧的解离（双位步，比单位近似更缺空位）停摆，$v \approx k(K_\mathrm{O}/K_\mathrm{CO})\,p_\mathrm{O}/p_\mathrm{CO}$——对 CO 为负级。活化能什么也没变（选项 3）；勒夏特列（选项 4）描述平衡而非受驱反应的速率；选项 1 是位点竞争，即 LH 分母的全部内涵。
:::
:::

## 催化循环、助剂与毒物：哈伯-博施法

::: definition 转化频率 {#def-tof}
**转化频率**（TOF）是每位活性位点每秒生成的产物分子数，单位 $\mathrm{s^{-1}}$——速率常数的催化类比，也是比较不同分散度催化剂的唯一诚实方式。速率 $R$（每秒物质的量）对 $n_\text{sites}$ 摩尔表面位点为 $\mathrm{TOF} = R/n_\text{sites}$；典型工业 TOF 为 $10^{-2}$–$10^{2}\ \mathrm{s^{-1}}$。**多相催化循环**把记账闭合：(i) *吸附*反应物（通常带解离——$\mathrm{H_2}$、$\mathrm{N_2}$、$\mathrm{O_2}$ 都断裂）；(ii) 表面上相邻物种间*反应*（LH）；(iii) *脱附*产物，再生位点。在第 (iii) 步失败的催化剂是海绵，不是催化剂——萨巴蒂埃原理对产物与对反应物同样适用。
:::

这一切的工业试金石是氨合成，$\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$——哈伯法（弗里茨·哈伯（Haber），1909）经卡尔·博施（Bosch）的高压工程放大（BASF，1913），至今仍是按质量计最大的化学工艺。教科书级描述：反应器在**熔融铁催化剂**上运行——磁铁矿原位还原成多孔、高比表面的 $\alpha$-Fe 海绵（每克催化剂暴露几 $\mathrm{m^{2}\,g^{-1}}$ 的金属表面，其面积正像上面的 BET 例题那样测量）——以 $\mathrm{K_2O}$（电子助剂）和 $\mathrm{Al_2O_3}$、$\mathrm{CaO}$（结构助剂）为助剂，约在 $400$–$500\,^\circ\mathrm{C}$、$150$–$300\ \mathrm{bar}$ 下操作，产物冷凝移出、未反应气体循环，因为在动力学所要求的温度下平衡不利。

为什么是这套配方？等温式与 LH 逻辑逐一回答每个成分：

- **为什么是铁，为什么 $\mathrm{N_2}$ 解离是决速步？**$\mathrm{N{\equiv}N}$ 键（$945\ \mathrm{kJ\,mol^{-1}}$）是工业化学中最强的键；它在 Fe 上解离——循环的第一步——其他每一步（H 加到 N 上，NH、NH₂、NH₃）相比之下都很快。工作催化剂的速率方程带着它的签名：近似为 $v \approx k\,p_{\mathrm{N_2}}\,(p_{\mathrm{H_2}}^{3/2}/p_\mathrm{NH_3})^{\alpha}$，$\alpha \approx 0.5$–$1$，即对氨呈*负*级——产物抑制，吸附的 N 与 H 竞争位点，正是 LH 分母。
- **为什么要助剂？**钾向铁供给电子密度，增强对吸附 $\mathrm{N_2}$ 的 $2\pi^{*}$ 轨道的反馈，降低决速解离步的能垒——朝火山顶点挪一步的萨巴蒂埃微调。氧化铝与石灰把还原后的铁晶粒撑开，使表面面积在 $500\,^\circ\mathrm{C}$ 下保持多年：它们保护位的*数目*，钾保护位的*质量*。
- **为什么怕毒物？**硫对铁的化学吸附焓远高于 $\mathrm{N_2}$ 或 $\mathrm{H_2}$：每几百个表面原子一个 $\mathrm{H_2S}$ 分子就足以把位点几乎不可逆地封死，因为在一切操作压力下都有 $K_\mathrm{S}p_\mathrm{S} \gg 1$——朗缪尔竞争成了垄断。因此原料气进转化器前须加氢脱硫至 ppm 以下。**危害说明：**$\mathrm{H_2S}$ 是易燃气体，急性剧毒（它抑制细胞色素 c 氧化酶，即氰化物所阻断的同一种末端氧化酶；GHS：易燃气体类别 2，急性毒性气体类别 2），含硫原料只能在气体检测与排风设施下操作。

最后是选择性——表面胜过均相对手之处：表面只能以位点允许的几何方式握住分子，所以它活化*能结合的那个键*（一个面上的 C–H，端基吸附的 N≡N），并且只配对*相邻的*吸附质（LH 的 $\theta_\mathrm{A}\theta_\mathrm{B}$ 既是速率律也是选择性滤器）。均相催化剂调电子；表面同时调电子*与*几何——相邻原子的系综——这第二个旋钮正是沸石、合金与单原子催化剂存在的原因。

::: history
朗缪尔（Langmuir）在通用电气实验室建立了他的等温式与表面单分子蒸发理论（1916 年论文"The constitution and fundamental properties of solids and liquids"），并因这些工作获 1932 年诺贝尔化学奖——第一个因表面化学颁发的诺贝尔奖。保罗·萨巴蒂埃（Sabatier）与让-巴蒂斯特·桑德内（Senderens）在 1900 年前后证明乙烯可被镍加氢*而镍不被消耗*，提出了 1912 年诺贝尔奖背后"吸附化合物"的思想。弗里茨·哈伯（Haber）于 1909 年演示了催化氨合成，卡尔·博施（Bosch）于 1913 年将其工业化（诺贝尔奖 1918 与 1931）。休·泰勒（Hugh S. Taylor）1925 年提出化学吸附经由"活性中心"上的吸附中间体——他的"超摩尔"预示了现代观念：催化剂表面是反应性不同的位点的拼贴。欣谢尔伍德（Hinshelwood）（1956 年诺贝尔奖，与谢苗诺夫（Semyonov）分享）发展了表面反应动力学，包括 CO 的氧化，他与普鲁顿（Prutton）1929 年对其速率方程的分析是 LH 的早期版本。斯蒂芬·布鲁诺（Brunauer）、埃米特（Emmett）与爱德华·泰勒（Teller）1938 年发表了多层吸附与表面面积的 BET 理论，格哈德·埃特尔（Ertl）因在分子水平上完成朗缪尔开创的纲领——金属上合成气化学的图像——获 2007 年诺贝尔化学奖。
:::

## 观察表面：程序升温脱附、低能电子衍射与扫描隧道显微镜

表面科学以三种工具回答三个问题。**程序升温脱附（TPD）**：低温覆盖表面，线性升温，观察什么脱附、何时脱附——峰温度量脱附活化能（结合越强脱附越晚），峰面积度量覆盖度，一组升温速率度量指前因子；吸附能 $E_\mathrm{des}$（化学吸附势阱深度）的数据表就是靠 TPD 编出来的。**低能电子衍射（LEED）**：衍射 $\sim 100\ \mathrm{eV}$ 的电子（其非弹性平均自由程只有几个原子层，故只有最表层散射），读出吸附覆盖层的二维对称性与重构。**扫描隧道显微镜（STM）**：让原子级尖锐的针尖在表面上方不到一纳米处掠过，对隧道电流成像——电流对间隙呈指数依赖——于是有了吸附质、缺陷与反应过程的原子分辨实空间图像；自宾尼希（Binnig）与罗雷尔（Rohrer）（1981，诺贝尔奖 1986）以来，它一直是埃特尔氨研究的看家工具。三者合力，把等温式里抽象的 $\theta$ 变成了数得清的原子。

## 后续内容

你已经见过三次的朗缪尔分母——在等温式里、在 LH 速率里、在哈伯动力学里——是一般机理论证的表面版本，它带着同样的代数重现于酶饱和，也重现于 [[kinetics/homogeneous-catalysis]]：那里的"位点"是金属配合物，竞争的是配位空间。用于氨机理的稳态与前置平衡记账，是把 [[kinetics/reaction-mechanisms]] 用到吸附质上；单层时钟背后的碰撞通量在 [[kinetics/collision-theory]]；而自由基表面的链化学（卤代、壁面燃烧）把本章的位点动力学接入 [[kinetics/chain-reactions]]。现代的续章——表面的态分辨散射、断键的飞秒化学、从第一性原理计算 $K$ 与 $E_\mathrm{des}$ 的密度泛函理论——在 [[kinetics/reaction-dynamics]]，而激发表面与半导体的光化学在 [[kinetics/photochemistry]]。

::: summary
- 表面会反应是因为表面原子配位不饱和；**物理吸附**（范德华力，$-5$ 至 $-40\ \mathrm{kJ\,mol^{-1}}$，非专一，可多层）与**化学吸附**（化学键，$-50$ 至 $-400\ \mathrm{kJ\,mol^{-1}}$，专一，常解离，仅单层）是两个势阱。
- **朗缪尔等温式** $\theta = Kp/(1+Kp)$ 来自位点平衡与平衡条件（两条路：速率或化学势）；低压一级，高压零级（饱和），且因吸附放热，$K$ 随温度下降。
- 气相反应物的零级是表面饱和的证据，绝非零级基元步的证据；表观级数在 $Kp = 1$ 处滑过 $\tfrac{1}{2}$。
- **特姆金**（相互作用：$\ln K$ 随 $\theta$ 线性，对数等温式）与**弗罗因德利希**（不均匀性：$\theta \propto p^{1/n}$，经验的，无饱和）修补朗缪尔的失效；它们是不同物理的模型，不是同一条定律的改进。
- **BET** 把朗缪尔层层堆叠：线性图 $x/[V(1-x)]$ 对 $x$ 给出 $V_\mathrm{m}$ 与 $C$，配合 $77\ \mathrm{K}$ 的 $\mathrm{N_2}$（$\sigma = 0.162\ \mathrm{nm^{2}}$）即得比表面——催化科学的标配 $S$。
- **朗缪尔-欣谢尔伍德**动力学（$v \propto \theta_\mathrm{A}\theta_\mathrm{B}$）产生抑制、负级数与位于 $K_\mathrm{B}p_\mathrm{B} = 1$ 的速率极大值；**艾雷-李德尔**（气相进攻吸附质）没有极大值。Pt 上 CO 氧化是经典；**萨巴蒂埃原理**（结合既不太强也不太弱）是其背后的火山。
- W 上 NH₃ 给出 $v = k\,p_\mathrm{NH_3}/p_\mathrm{H_2}^{1/2}$：半级数出自解离吸附，抑制出自位点竞争——级数是通过等温式读出的机理。
- 催化循环（吸附-反应-脱附）以 TOF 为其速率；哈伯-博施的铁催化剂、钾与氧化物助剂、硫中毒，是上述一切内容的工业语法。
:::

## 练习

::: exercise 由朗缪尔常数求覆盖度 {level=1 check="0.667"}
某气体分子吸附，$300\ \mathrm{K}$ 时 $K = 0.80\ \mathrm{kPa^{-1}}$。$p = 2.5\ \mathrm{kPa}$ 时的分数覆盖度 $\theta$ 是多少？（输入无量纲的 $\theta$。）
::: solution
$\theta = Kp/(1 + Kp) = (0.80 \times 2.5)/(1 + 0.80 \times 2.5) = 2.0/3.0 = 0.667$。表面三分之二被覆盖，剩下三分之一空位可供反应。
:::
:::

::: exercise 单层生长时间 {level=1 check="3.5"}
某压力下冷表面上的 $\mathrm{O_2}$ 通量为 $2.87\times10^{18}\ \mathrm{m^{-2}\,s^{-1}}$，位密度为 $1.0\times10^{19}\ \mathrm{m^{-2}}$。若每次碰撞都粘住，生长一个单层需多久？（以秒输入时间。）
::: solution
$t = (1.0\times10^{19})/(2.87\times10^{18}) = 3.5\ \mathrm{s}$。若粘附系数为 $0.10$，时间则长十倍——工作形式是 $t_\mathrm{ML} = \theta_{\text{target}} N_\text{sites}/(s Z_\mathrm{W})$。
:::
:::

::: exercise 高压下的饱和 {level=1 check="0.857"}
$K = 1.5\ \mathrm{kPa^{-1}}$，$p = 4.0\ \mathrm{kPa}$ 时的 $\theta$ 是多少？（输入 $\theta$。）
::: solution
$Kp = 6.0$，$\theta = 6.0/7.0 = 0.857$。注意压力早已越过半覆盖点（$p_{1/2} = 1/K = 0.67\ \mathrm{kPa}$），但单层最后的 $14\ \%$ 仍要再花六个半覆盖压力——等温式变平的现实版。
:::
:::

::: exercise 两个覆盖度，一条等温线 {level=2 check="0.086"}
$298\ \mathrm{K}$ 下吸附数据给出 $p = 5.0\ \mathrm{kPa}$ 时 $\theta = 0.30$，$p = 35.0\ \mathrm{kPa}$ 时 $\theta = 0.75$。证明它们与朗缪尔等温式相容并提取 $K$；若第一点处 $V = 15.0\ \mathrm{cm^{3}\,g^{-1}}$（STP），求 $V_\mathrm{mon}$。（以 $\mathrm{kPa^{-1}}$ 输入 $K$。）
::: solution
线性化为 $\theta/(1 - \theta) = Kp$：两点分别给出 $K = \dfrac{0.30/0.70}{5.0} = 0.0857$ 与 $K = \dfrac{0.75/0.25}{35.0} = 0.0857\ \mathrm{kPa^{-1}}$——到三位数字完全相同，故两点朗缪尔检验通过。$K = 0.086\ \mathrm{kPa^{-1}}$，且 $V_\mathrm{mon} = V/\theta = 15.0/0.30 = 50.0\ \mathrm{cm^{3}\,g^{-1}}$。（对第二点的自洽检验：$50.0 \times 0.75 = 37.5\ \mathrm{cm^{3}\,g^{-1}}$。）
:::
:::

::: exercise 加热已覆盖的表面 {level=2 check="0.029"}
$300\ \mathrm{K}$ 时 $K = 0.50\ \mathrm{kPa^{-1}}$，$\Delta_\mathrm{ads} H = -50\ \mathrm{kJ\,mol^{-1}}$。$350\ \mathrm{K}$ 时的 $K$ 是多少？该温度下 $p = 10\ \mathrm{kPa}$ 处的 $\theta$ 又是多少？（以 $\mathrm{kPa^{-1}}$ 输入 $K$。）
::: solution
$\ln[K(350)/K(300)] = -(\Delta_\mathrm{ads} H/R)(1/350 - 1/300) = (50\,000/8.314)(-4.762\times10^{-4}) = -2.86$，故 $K(350) = 0.50\,e^{-2.86} = 0.029\ \mathrm{kPa^{-1}}$——小了十七倍。于是 $\theta = 0.29/1.29 = 0.22$：同一个 $10\ \mathrm{kPa}$，在 $300\ \mathrm{K}$ 覆盖 $83\ \%$ 的表面，在 $350\ \mathrm{K}$ 只覆盖 $22\ \%$。加热引起脱附是范特霍夫方程的作用，不是漏气。
:::
:::

::: exercise LH 极大值的位置与代价 {level=2 check="0.25"}
某反应服从 LH 动力学，强吸附反应物 B 的 $K_\mathrm{B} = 4.0\ \mathrm{kPa^{-1}}$，A 弱吸附。速率在何 $p_\mathrm{B}$ 处最大？$p_\mathrm{B} = 0.050\ \mathrm{kPa}$ 时 $v/v_\mathrm{max}$ 是多少？（以 kPa 输入压力。）
::: solution
极大值在 $K_\mathrm{B}p_\mathrm{B} = 1$：$p_\mathrm{B} = 1/4.0 = 0.25\ \mathrm{kPa}$。在 $0.050\ \mathrm{kPa}$ 处 $x = K_\mathrm{B}p_\mathrm{B} = 0.20$，$v/v_\mathrm{max} = [x/(1+x)^{2}]/(1/4) = 0.1389/0.25 = 0.56$：比最优压力低五倍只损失不到一半的速率——火山的低压侧是宽容的；由对数对称性，$x = 5$（$p_\mathrm{B} = 1.25\ \mathrm{kPa}$）处同样是 $56\ \%$。
:::
:::

::: exercise 解离吸附等温式与半级数 {level=3}
$\mathrm{H_2}$ 的吸附需要*成对*位点：$\mathrm{H_2(g)} + 2\,* \rightleftharpoons 2\,\mathrm{H(ads)}$。推导解离朗缪尔等温式 $\theta = (Kp)^{1/2}/[1 + (Kp)^{1/2}]$，再推导氢饱和表面时、吸附 H 与分子吸附物种 A 在同一批位点上发生 LH 反应的速率方程。对 A 与对 $\mathrm{H_2}$ 的反应级数各是多少？
::: solution
以 $\theta$ 为 H 原子覆盖度的平衡：吸附速率 $\propto p\,\theta_*^{2}$（需要两个位点）与脱附 $\propto \theta^{2}$ 相抵，故 $\theta/\theta_* = (Kp)^{1/2}$，再取 $\theta_* = 1 - \theta$（忽略 A）即得等温式。现在 LH：$v = k\theta_\mathrm{A}\theta_\mathrm{H}$，其中 $\theta_\mathrm{A} = K_\mathrm{A}p_\mathrm{A}\theta_*$，且 H 占主导时 $\theta_* \approx (Kp_\mathrm{H_2})^{-1/2}$。于是
$$
v = k\,K_\mathrm{A}p_\mathrm{A}\,\theta_* \cdot \theta_\mathrm{H} \approx k\,K_\mathrm{A}p_\mathrm{A}\,(Kp_\mathrm{H_2})^{-1/2},
$$
用到 $\theta_\mathrm{H} \approx 1$。对 A 的级数是 $+1$（它是稀的，覆盖度正比于其压力）；对氢的级数是 $-\tfrac{1}{2}$——*倒数*半级：氢饱和了表面，每多一个氢分子就把 A 从位点上挤走。表面动力学中的半级数是解离吸附在位点衡算上留下的指纹；负半级则说同一枚指纹正把反应扼杀。
:::
:::

::: exercise 朗缪尔表面上的表观级数与表观活化能 {level=3}
某单分子表面反应速率 $v = k\theta$，其中 $k = A e^{-E_\mathrm{a}/RT}$，$\theta$ 服从朗缪尔式 $Kp/(1 + Kp)$。(a) 证明对压力的表观级数为 $n_\text{app} = \mathrm{d}\ln v/\mathrm{d}\ln p = 1/(1 + Kp)$，并求其等于 $\tfrac{1}{2}$ 之处。(b) 证明表观活化能为 $E_\text{app} = E_\mathrm{a} + \Delta_\mathrm{ads} H/(1 + Kp)$，并给出两个极限。为什么表面反应测得的 $E_\mathrm{a}$ 可以*小于*基元步的能垒？
::: solution
(a) $\ln v = \ln k + \ln K + \ln p - \ln(1 + Kp)$。固定 $T$，对 $\ln p$ 求导：$n_\text{app} = 1 - Kp/(1 + Kp) = 1/(1 + Kp)$。它恰在 $Kp = 1$ 处等于 $\tfrac{1}{2}$——半覆盖点，与上一题的 LH 极大值是同一个压力。级数从 $1$（干净表面）连续滑到 $0$（饱和表面）；报道"级数 $0.4$"其实是在说你工作在等温式的哪个位置。
(b) $E_\text{app} = RT^{2}\,\mathrm{d}\ln v/\mathrm{d}T = E_\mathrm{a} + RT^{2}\,\mathrm{d}\ln\theta/\mathrm{d}T$。由 $\theta = Kp/(1+Kp)$，$\mathrm{d}\ln\theta/\mathrm{d}T = [1/(1+Kp)]\,\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{ads} H/[RT^{2}(1+Kp)]$，故
$$
E_\text{app} = E_\mathrm{a} + \frac{\Delta_\mathrm{ads} H}{1 + Kp}.
$$
低覆盖时 $E_\text{app} = E_\mathrm{a} + \Delta_\mathrm{ads} H$——测得的能垒被吸附放热*压低*了，因为升温既加快表面步又腾空表面；饱和时 $E_\text{app} = E_\mathrm{a}$，因为 $\theta$ 钉死在 1。因此表面上测得的活化能是化学与热力学的*复合*量，不注明覆盖区间就引用它毫无意义——这正是 [[kinetics/rate-laws]] 中阿伦尼乌斯方程向你提过的同一告诫。
:::
:::
