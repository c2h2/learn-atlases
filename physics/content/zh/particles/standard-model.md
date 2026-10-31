到 1960 年代初，加速器已经造出了一百多种"基本"粒子：π 介子、K 介子、$\Lambda$、$\Sigma$、$\Xi$，以及一长串不断加长的短寿命共振。威利斯·兰姆（Willis Lamb）在 1955 年的诺贝尔奖演说中说过：发现新粒子的人以前会得诺贝尔奖，现在应该罚款。二十年之内，这张单子被精简成一张短表：六种夸克、六种轻子、三种相互作用的传播者，以及一种直到 2012 年才找到的标量粒子。这张表，加上支配它的量子场论，就是粒子物理的**标准模型**（Standard Model）。

本章在它的粒子与相互作用的层面描述这个模型。我们先认识夸克与轻子及其量子数，把"力就是一种粒子的交换"这个思想与描绘它的费曼图摆在一起，接着依次讲三种相互作用：量子电动力学（QED）、带有色荷与禁闭的量子色动力学（QCD），以及有 $W$、$Z$ 玻色子和夸克混合（CKM）矩阵的电弱理论。最后讲希格斯场——它给 $W$、$Z$ 与费米子质量——以及希格斯玻色子的发现。计算只保留量纲分析与几个标准结果所能完成的那些，这样的计算多得惊人。

你需要 [[relativity/four-vectors]] 的相对论运动学，[[quantum-1/spin]] 与 [[quantum-2/identical-particles]] 的自旋与全同粒子，[[quantum-2/time-dependent]] 的费米黄金定则，以及本课程前面各章的衰变与截面。我们在方便时使用**自然单位**：$\hbar = c = 1$，能量、动量与质量以 GeV 计，长度与时间以 $\mathrm{GeV}^{-1}$ 计，换算回来用 $\hbar c = 0.1973\,\mathrm{GeV\,fm}$ 与 $\hbar = 6.582\times10^{-25}\,\mathrm{GeV\,s}$。所有粒子数据都取自粒子数据组（Particle Data Group）的《Review of Particle Physics》（2024）。

## 粒子 {#particles}

标准模型的实物粒子是自旋 $\tfrac12$ 的费米子，分两类：**轻子**（lepton）不感受强相互作用，**夸克**（quark）感受强相互作用。每一类都出现在三个**代**（generation）里，它们是彼此的一份拷贝，只是质量一代比一代大。

::: definition 轻子与夸克 {#def-fermions}
**轻子**是电子 $e$、μ 子 $\mu$ 与 τ 子 $\tau$，电荷都是 $-1$（以 $e$ 为单位），以及它们的中微子 $\nu_e$、$\nu_\mu$、$\nu_\tau$，电荷为 $0$。**夸克**是上型的 $u$、$c$、$t$，电荷 $+\tfrac23$，以及下型的 $d$、$s$、$b$，电荷 $-\tfrac13$。每个费米子都有一个电荷相反、相加量子数也相反的反粒子。每个夸克带三种**色**（colour）之一，且每个夸克的重子数为 $B = \tfrac13$；每个轻子带有属于自己一族、值为 $L = 1$ 的轻子数。
:::

| 代 | 轻子（质量） | 中微子 | 上型夸克（质量） | 下型夸克（质量） |
|---|---|---|---|---|
| 1 | $e$ ($0.511\,\mathrm{MeV}$) | $\nu_e$ | $u$ ($2.16\,\mathrm{MeV}$) | $d$ ($4.70\,\mathrm{MeV}$) |
| 2 | $\mu$ ($105.66\,\mathrm{MeV}$) | $\nu_\mu$ | $c$ ($1.273\,\mathrm{GeV}$) | $s$ ($93.5\,\mathrm{MeV}$) |
| 3 | $\tau$ ($1776.9\,\mathrm{MeV}$) | $\nu_\tau$ | $t$ ($172.6\,\mathrm{GeV}$) | $b$ ($4.18\,\mathrm{GeV}$) |

中微子的质量不是零，但小于约 $0.45\,\mathrm{eV}$（KATRIN 对电子中微子有效质量给出的上限）。轻夸克的质量不是自由粒子的质量——夸克从来不是自由的；它们是理论的参数，按标准重整化方案引用。顶夸克的质量是直接从它的衰变产物测出的。

夸克只存在于**强子**（hadron）内部：**重子**（baryon）由三个夸克组成（$qqq$），**介子**由一个夸克和一个反夸克组成（$q\bar q$）。质子是 $uud$，中子是 $udd$，$\pi^+$ 是 $u\bar d$，$K^+$ 是 $u\bar s$。电荷相加：$uud$ 给 $\tfrac23 + \tfrac23 - \tfrac13 = 1$。每个重子的重子数为 $1$，每个介子的为 $0$。

各种力由自旋 $1$ 的**规范玻色子**（gauge boson）传递：电磁力由光子 $\gamma$（无质量）传递；强力由八种**胶子**（gluon）$g$（无质量、带色）传递；弱力由 $W^\pm$（$80.37\,\mathrm{GeV}$）与 $Z^0$（$91.19\,\mathrm{GeV}$）传递。最后还有一个自旋 $0$ 的粒子：**希格斯玻色子**（Higgs boson）$H$（$125.2\,\mathrm{GeV}$）。引力不属于这个模型；在粒子物理的能量下，它比其他相互作用弱三十多个数量级。

::: remark 守恒律速览
每种相互作用都守恒能量、动量、角动量、电荷、重子数以及（在所有对撞机实验的精度内）总轻子数。强与电磁相互作用还守恒每种夸克（$u$、$d$、$s$、……）的数目以及分别的轻子数。弱相互作用改变夸克的味，这就是奇异粒子如 $\Lambda$ 的寿命是 $10^{-10}\,\mathrm{s}$ 而不是 $10^{-23}\,\mathrm{s}$ 的原因。中微子振荡表明分别的轻子数并不严格守恒。这些定律在 [[particles/symmetries]] 中被系统地处理。
:::

## 作为交换的力 {#exchange}

经典物理里，电荷产生场，场再作用于另一个电荷。在量子场论里场被量子化，它的量子就是粒子，两个粒子之间的力来自交换场的量子。汤川秀树（Hideki Yukawa）1935 年把这变成了预言。

::: theorem 汤川势与力的力程 {#thm-yukawa}
强度为 $g$、与量子质量为 $m$ 的场耦合的静态源，在距离 $r$ 处产生的势为

$$
V(r) = \frac{g^2}{4\pi}\,\frac{e^{-r/R}}{r}, \qquad R = \frac{\hbar}{mc} .
$$ {#eq-yukawa}

因此力的力程约为被交换粒子的约化康普顿波长 $\hbar/mc$。$m = 0$ 时化为库仑形式 $1/r$。
:::

::: proof
量子质量为 $m$ 的自由场服从克莱因–戈登方程 $\bigl(\tfrac{1}{c^2}\partial_t^2 - \nabla^2 + \mu^2\bigr)\phi = 0$，其中 $\mu = mc/\hbar$，它是平面波解满足 $E^2 = p^2c^2 + m^2c^4$ 的波动方程。位于原点、强度为 $g$ 的静态点源加进一个 δ 函数：$(\nabla^2 - \mu^2)\phi = -g\,\delta^3(\mathbf{r})$。我们验证 $\phi = g e^{-\mu r}/(4\pi r)$ 是它的解。离开原点，对球对称函数，$\nabla^2\phi = \frac{1}{r}\frac{\dd^2}{\dd r^2}(r\phi)$，而 $r\phi \propto e^{-\mu r}$ 的二阶导数为 $\mu^2 r\phi$，所以 $\nabla^2\phi = \mu^2\phi$。在原点处 $\phi$ 表现为 $g/4\pi r$，其拉普拉斯为 $-g\,\delta^3(\mathbf{r})$（点电荷的高斯定理），其余各项可积，对 δ 函数没有贡献。强度同为 $g$ 的第二个源在这个场中的能量是 $g\phi$，即 [[#eq-yukawa]]。
:::

一个不用场论的启发式版本把话说得更直接。从一个静止的核子放出一个质量为 $m$ 的粒子，会把能量守恒破坏 $mc^2$，不确定性原理允许它维持 $\Delta t \approx \hbar/mc^2$ 的时间。在这段时间里粒子最多走 $c\Delta t = \hbar/mc$。汤川知道核力的力程约为 $1.4\,\mathrm{fm}$，于是预言量子的质量应为 $\hbar c/(1.4\,\mathrm{fm}) = 197/1.4 \approx 140\,\mathrm{MeV}$。带电 π 介子，质量 $139.6\,\mathrm{MeV}$，由塞西尔·鲍威尔（Cecil Powell）的小组于 1947 年在宇宙线中找到。（1936 年以相近质量发现的 μ 子曾被误认作它，但它不感受强力。）

同样的论证说明弱相互作用为什么在低能下那么弱：$W$ 交换的力程是 $\hbar/M_Wc = 0.1973/80.37\,\mathrm{fm} = 2.5\times10^{-3}\,\mathrm{fm}$，远小于一个核子。它看起来像点接触——费米在 [[particles/decay]] 中正是这样为 β 衰变建模的。

### 费曼图

理查德·费曼（Richard Feynman）的图（1948–49）是微扰论各项的记账工具，同时也能当作过程的图像。时间从左到右。带箭头的实线是费米子（箭头指向时间反方向的是反费米子）；波浪线是光子、$W$ 或 $Z$；卷曲线是胶子；虚线是希格斯玻色子。线在**顶点**相交，每个顶点守恒电荷、动量与其他守恒量，并对振幅贡献一个耦合常数的因子。内线是两个顶点之间交换的粒子，它携带的四维动量 $q$ 不必满足 $q^2 = m^2$；它贡献一个**传播子**因子 $1/(q^2 - m^2)$。

三种基本顶点用文字描述如下。

- **QED**：一条带电费米子线发出或吸收一个光子。顶点因子正比于费米子的电荷 $Q_f e$，每个顶点给振幅带来因子 $\sqrt{\alpha}$，其中 $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$。
- **QCD**：一条夸克线发出或吸收一个胶子，改变自己的色；而且独一无二的，胶子在三点与四点胶子顶点上彼此耦合。耦合是 $\sqrt{\alpha_s}$。
- **弱**：一条带电轻子线发出 $W^-$ 变成它的中微子，或一个下型夸克变成一个上型夸克（$d \to u\,W^-$）；或者任何一个费米子发出一个 $Z$ 而不改变身份。

中子 β 衰变 $n \to p\,e^-\bar\nu_e$ 就是这样一张图：中子的一个 $d$ 夸克发出一个虚 $W^-$ 变成 $u$，$W^-$ 实体化为 $e^-\bar\nu_e$。另外两个夸克是旁观者。振幅有两个弱顶点与一个 $W$ 传播子；在动量转移 $q^2 \ll M_W^2$ 下，传播子是 $-1/M_W^2$，一个常数，所以这个相互作用看起来就是费米的点耦合，强度为

$$
\frac{G_F}{\sqrt{2}} = \frac{g_W^2}{8M_W^2},
$$ {#eq-gf}

其中 $g_W$ 是弱耦合。费米常量 $G_F = 1.1663788\times10^{-5}\,\mathrm{GeV}^{-2}$ 之所以小，是因为 $M_W$ 大，而不是因为 $g_W$ 小：$g_W^2/4\pi \approx 1/30$，比 $\alpha$ 还大。

### 数幂次：用量纲分析做一个截面

QED 中最简单的过程是 $e^+e^- \to \mu^+\mu^-$：电子与正电子湮灭成一个虚光子，后者产生一对 μ 子。振幅有两个顶点，所以正比于 $\alpha$，截面正比于 $\alpha^2$。在远高于两个质量的能量下，唯一的尺度是 $s$，而截面在自然单位中的量纲是 $\mathrm{energy}^{-2}$，所以 $\sigma \propto \alpha^2/s$。完整计算（Griffiths §7.8）给出

$$
\sigma(e^+e^- \to \mu^+\mu^-) = \frac{4\pi\alpha^2}{3s}\,(\hbar c)^2 = \frac{86.8\,\mathrm{nb}}{s\,[\mathrm{GeV}^2]} .
$$ {#eq-mumu}

## 量子电动力学 {#qed}

QED 是电子、正电子与光子的量子场论，由朝永振一郎（Sin-Itiro Tomonaga）、朱利安·施温格（Julian Schwinger）、费曼与弗里曼·戴森（Freeman Dyson）于 1946–49 年完成。它的预言是 $\alpha$ 的展开，而因为 $\alpha$ 很小，展开起初收敛很快。电子磁矩的反常量 $a_e = (g-2)/2$ 已算到 $\alpha$ 的五阶，与测量符合到优于 $a_e$ 的 $10^9$ 分之一，是科学中理论与实验最精密的比较之一。

QED 的两个特征在其他相互作用中反复出现。第一，虚电子–正电子对**屏蔽**电荷：在短距离，也就是高动量转移处，有效耦合增大，从低能的 $1/137$ 到 $Q = M_Z$ 处的约 $1/128$。耦合会"跑动"。第二，QED 提供了一个**规范理论**的样板：只要要求理论在电子场一个逐点变化的相位旋转下保持不变，相互作用的形式就随之而定。这个思想在 [[particles/symmetries]] 中展开。

::: example μ 子对与 R 值 {#ex-r-ratio}
(a) 在 $\sqrt{s} = 10\,\mathrm{GeV}$ 处求值 [[#eq-mumu]]。(b) 同一张图把 μ 子换成电荷为 $Q_q$ 的一对夸克–反夸克，对每种轻到可以产生的夸克给出 $\sigma(e^+e^- \to q\bar q) = N_c Q_q^2\,\sigma_{\mu\mu}$，其中 $N_c$ 是色数。每一对 $q\bar q$ 都变成强子。预言 $\sqrt{s} = 10\,\mathrm{GeV}$ 时 $N_c = 1$ 与 $N_c = 3$ 的 $R = \sigma(e^+e^- \to \text{强子})/\sigma(e^+e^- \to \mu^+\mu^-)$。实验给出约 $3.6$。
::: solution
(a) $s = 100\,\mathrm{GeV}^2$，所以 $\sigma_{\mu\mu} = 86.8/100\,\mathrm{nb} = 0.868\,\mathrm{nb}$。亮度 $10^{33}\,\mathrm{cm^{-2}\,s^{-1}}$——即 $1\,\mathrm{nb^{-1}\,s^{-1}}$——之下，这差不多是每秒一对 μ 子。

(b) 在 $10\,\mathrm{GeV}$ 下可以产生 $u$、$d$、$s$、$c$ 夸克（产生 $b$ 夸克对、造 $B$ 介子约需 $10.6\,\mathrm{GeV}$）。把电荷平方加起来，

$$
\sum_q Q_q^2 = \left(\tfrac23\right)^2 + \left(\tfrac13\right)^2 + \left(\tfrac13\right)^2 + \left(\tfrac23\right)^2 = \frac{10}{9}.
$$

一种色时，$R = 10/9 = 1.11$；三种色时，$R = 10/3 = 3.33$。实测值约 $3.6$，断然排除了 $N_c = 1$。剩下的 $8\%$ 是第一个 QCD 修正，即放出一个胶子带来的因子 $1 + \alpha_s/\pi$，这一能量下 $\alpha_s \approx 0.18$。每当 $\sqrt{s}$ 跨过一个新的夸克阈值，$R$ 就上一个台阶，每个台阶的大小度量那个夸克的电荷乘以三。
:::
:::

## 量子色动力学 {#qcd}

### 色

色的思想是被一个佯谬逼出来的。$\Delta^{++}$ 共振电荷 $+2$、自旋 $\tfrac32$，所以在夸克模型中它是 $uuu$ 且三个自旋全部平行。它的基态没有轨道角动量，所以波函数的空间、自旋与味部分对任意两个夸克的交换都是对称的。但夸克是费米子，总波函数必须反对称。奥斯卡·格林伯格（Oscar Greenberg）1964 年、韩（Moo-Young Han）与南部阳一郎（Yoichiro Nambu）1965 年提出，夸克带一个额外的三值量子数，现在称为**色**（红、绿、蓝），并且每个强子的色波函数是反对称的：

$$
\frac{1}{\sqrt{6}}\sum_{i,j,k}\varepsilon_{ijk}\,\lvert q_i q_j q_k\rangle .
$$

::: definition 色单态与色禁闭 {#def-singlet}
如果夸克与胶子构成的态，在它所有组分的色态经同一个 SU(3) 矩阵变换后保持不变，就称为**色单态**（colour singlet）。三夸克态 $\frac{1}{\sqrt{6}}\sum\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ 与夸克–反夸克态 $\frac{1}{\sqrt3}\sum_i\lvert q_i\bar q_i\rangle$ 都是色单态。**禁闭假说**（confinement hypothesis）是说：每个自由粒子都是色单态。
:::

只有色单态才能作为自由粒子存在——这条规则解释了为什么夸克按 $qqq$、$\bar q\bar q\bar q$ 与 $q\bar q$ 结合，而不是 $qq$ 或单个夸克。上面的 R 值，以及正比于 $N_c^2$ 的 $\pi^0 \to \gamma\gamma$ 的速率，都证实 $N_c = 3$。

### 胶子与渐近自由

QCD——色的规范理论——于 1972–73 年建立（哈拉尔德·弗里奇（Harald Fritzsch）、默里·盖尔曼（Murray Gell-Mann）与海因里希·洛伊特维勒（Heinrich Leutwyler））。它的传播者胶子本身就带色：一个胶子带一份色与一份反色，九种组合中除去单态那一个，剩下八种。因为胶子带色，它们彼此相互作用，于是一切都变了。

在 QED 中，真空极化屏蔽电荷，所以耦合在短距离增大。在 QCD 中，胶子的自相互作用产生一种**反屏蔽**（anti-screening），只要夸克味数少于 17 种就占上风。所以强耦合在短距离*减小*。戴维·格罗斯（David Gross）与弗兰克·维尔切克（Frank Wilczek），以及独立地戴维·波利策（David Politzer），在 1973 年发现了这一**渐近自由**（asymptotic freedom）。单圈下，

$$
\alpha_s(Q^2) = \frac{\alpha_s(\mu^2)}{1 + \dfrac{33 - 2n_f}{12\pi}\,\alpha_s(\mu^2)\ln\dfrac{Q^2}{\mu^2}},
$$ {#eq-running}

其中 $n_f$ 是轻于 $Q$ 的夸克味数。PDG 的世界平均为 $\alpha_s(M_Z) = 0.1180 \pm 0.0009$。

::: widget plot
f: a/(1 + (23/(12 pi)) a log(x^2/91.19^2)); (1/128)
x: 2, 300
y: 0, 0.4
sliders: a=0.118:0.10:0.13:0.001
labels: α_s(Q) (单圈, n_f = 5); α(M_Z) = 1/128
caption: 强耦合 [[#eq-running]] 对动量尺度 $Q$（GeV）作图，起点为 $\alpha_s(M_Z) = a$（滑块），五种味。它从 $2\,\mathrm{GeV}$ 处的约 $0.3$ 降到 $200\,\mathrm{GeV}$ 以上的约 $0.1$，下降是对数般缓慢的。沿曲线向左看，看它往上爬：单圈公式在 $Q \approx 0.1\,\mathrm{GeV}$ 附近发散，这是微扰论在强子尺度失效的信号。那条水平线是 $M_Z$ 处的电磁耦合；相比之下它在这一区间几乎不动，而且朝相反方向缓慢增长。
:::

### 禁闭

大距离下耦合变强，微扰论毫无用处。格点计算与重夸克介子的谱表明，重夸克与反夸克之间的势可以很好地写成

$$
V(r) = -\frac43\,\frac{\alpha_s\hbar c}{r} + kr, \qquad k \approx 0.9\,\mathrm{GeV/fm},
$$ {#eq-cornell}

即单胶子交换给出的库仑型项（$\tfrac43$ 是一个色因子）加上一个线性项。线性项意味着力趋于一个常数：夸克之间的胶子场被挤进一根管子，一根**弦**，其能量随长度增长。要把一个夸克从强子里拉出来，将花费无限大的能量。而在远未到那一步之前，一旦弦储存的能量超过约一对轻夸克–反夸克的两倍质量，它就会靠创造一对新的夸克而断开，出来的不是自由夸克而是两个强子。这就是**禁闭**（confinement）。它得到所有实验与数值格点 QCD 的支持，但从理论的方程给出证明，仍是开放的千禧年难题之一。

::: widget plot
f: -(4/3) a 0.1973/x + k x
x: 0.05, 2
y: -2, 2
sliders: a=0.3:0.1:0.6:0.01; k=0.9:0.5:1.2:0.01
labels: V(r) (GeV)
caption: 夸克–反夸克势 [[#eq-cornell]] 对 $r$（fm）作图，$\alpha_s = a$，弦张力 $k$ 以 GeV/fm 计。小 $r$ 处库仑项占主导，曲线陡然下坠；超过约 $0.3\,\mathrm{fm}$，它几乎是一条直线。$r = 1\,\mathrm{fm}$ 处，弦已经储存约 $0.8\,\mathrm{GeV}$ 的能量，足以创造一对轻夸克–反夸克并断开它。把 $a$ 调大，注意短程行为在变，而长程斜率不变：禁闭就是那个线性项。
:::

实验在高能下看到的是**喷注**（jet）：硬碰撞中产生的一个夸克或胶子飞走，它身后的弦一次次断开，沿它原来的方向走出一束窄窄的强子。$e^+e^-$ 碰撞中的双喷注事例服从自旋 $\tfrac12$ 夸克的角分布，而 1979 年在 DESY 的 PETRA 对撞机上观察到的三喷注事例，是胶子存在的第一个直接证据。

夸克本身的现身，是在 SLAC–MIT 合作组 1968 年起的**深度非弹性散射**实验中（杰罗姆·弗里德曼（Jerome Friedman）、亨利·肯德尔（Henry Kendall）、理查德·泰勒（Richard Taylor）），作为质子内部的类点散射体被看见的。电子大动量转移散射的截面，远比一个光滑的质子所允许的大，而且其运动学依赖方式正符合詹姆斯·比约肯（James Bjorken）对类点组分的预言。费曼叫它们**部分子**（parton）；它们就是夸克与胶子。

::: quiz
为什么胶子是八种而不是九种？
- [ ] 因为其中一种组合的电荷会是 $\pm1$。
- [x] 因为色单态组合 $(r\bar r + g\bar g + b\bar b)/\sqrt{3}$ 不属于规范群 SU(3)，后者有 $3^2 - 1 = 8$ 个生成元。
- [ ] 因为有一种胶子与光子全同。
- [ ] 因为胶子像夸克一样被禁闭，而其中一种会是自由的。
::: solution
胶子对应 SU(3) 的生成元，而 $3\times3$ 行列式为一的幺正矩阵群有 $3^2 - 1 = 8$ 个生成元。九种色–反色组合中，完全对称的单态在色旋转下不变；这样一个胶子不带色，将是在质子这样的色单态之间传递的长程力，而它没有被观测到。胶子是电中性的，所以第一个选项不对。
:::
:::

## 电弱理论 {#electroweak}

### 弱相互作用

弱相互作用负责 β 衰变、μ 子与 τ 子以及 π 介子的衰变，还负责所有奇、粲、底强子的衰变。它有几个别的相互作用都没有的特征：它改变味，它最大程度地破坏宇称（只有左手费米子与右手反费米子参与带电流相互作用，见 [[particles/symmetries]]），而且它的传播者有质量。

::: example μ 子的寿命 {#ex-muon}
μ 子经虚 $W$ 衰变 $\mu^- \to e^-\bar\nu_e\nu_\mu$。忽略电子质量的费米理论给出衰变率

$$
\Gamma = \frac{G_F^2 m_\mu^5}{192\pi^3}
$$

（自然单位下）。用 $m_\mu = 0.105\,658\,\mathrm{GeV}$ 算出寿命，并与实测的 $2.1970\,\mu\mathrm{s}$ 比较。然后用同一个公式估计 τ 子的寿命，已知它衰变到 $e\bar\nu_e\nu_\tau$ 的分支比为 $17.8\%$。
::: solution
自然单位下 $\Gamma = (1.16638\times10^{-5})^2(0.105658)^5/(192\pi^3)\,\mathrm{GeV}$。各项为 $G_F^2 = 1.3604\times10^{-10}\,\mathrm{GeV}^{-4}$、$m_\mu^5 = 1.3165\times10^{-5}\,\mathrm{GeV}^5$、$192\pi^3 = 5953.0$，所以

$$
\Gamma = \frac{1.3604\times10^{-10} \times 1.3165\times10^{-5}}{5953.0}\,\mathrm{GeV} = 3.009\times10^{-19}\,\mathrm{GeV}.
$$

寿命为 $\tau = \hbar/\Gamma = 6.582\times10^{-25}\,\mathrm{GeV\,s}/3.009\times10^{-19}\,\mathrm{GeV} = 2.187\times10^{-6}\,\mathrm{s}$，与实测 $2.197\,\mu\mathrm{s}$ 之差在 $0.5\%$ 以内；差额由辐射修正与电子质量解释。实际上逻辑是倒过来的：μ 子寿命正是测量 $G_F$ 的办法。

τ 子经同一张图（$m_\mu \to m_\tau$）衰变到 $e\bar\nu\nu$，所以那个部分衰变率大 $(m_\tau/m_\mu)^5$ 倍。它的分支比是 $17.8\%$，所以

$$
\tau_\tau \approx \tau_\mu\left(\frac{m_\mu}{m_\tau}\right)^5 \times 0.178 = 2.197\times10^{-6} \times \left(\frac{0.10566}{1.77693}\right)^5 \times 0.178\,\mathrm{s} = 2.9\times10^{-13}\,\mathrm{s},
$$

与实测的 $290.3\,\mathrm{fs}$ 符合。强烈的 $m^5$ 依赖，正是 [[particles/decay]] 中萨金特定律的新装扮。τ 子其余 $82\%$ 的衰变——到 $\mu\bar\nu\nu$，以及三种色下的 $d\bar u$——解释了这一分支比：未加 QCD 修正时为 $1/(1 + 1 + 3) = 20\%$。
:::
:::

### 电弱统一

谢尔登·格拉肖（Sheldon Glashow，1961）、史蒂文·温伯格（Steven Weinberg，1967）与阿卜杜勒·萨拉姆（Abdus Salam，1968）把弱相互作用与电磁相互作用合并为一个基于群 $\mathrm{SU}(2)\times\mathrm{U}(1)$ 的规范理论，有四个规范玻色子。其中三个通过下面要讲的希格斯机制获得质量；光子保持无质量。理论多出一个新参数，**弱混合角**（weak mixing angle）$\theta_W$，树图阶预言

$$
e = g_W\sin\theta_W, \qquad M_W = M_Z\cos\theta_W .
$$ {#eq-weinberg}

理论要求存在一种弱中性流，其中中微子与之散射而不变成带电轻子。CERN 的加加梅尔（Gargamelle）气泡室合作组 1973 年找到了这样的事例。把 [[#eq-gf]] 与 $e = g_W\sin\theta_W$ 结合，从低能数据预言了 $W$ 与 $Z$ 的质量，约在 $80$ 与 $90\,\mathrm{GeV}$。卡洛·鲁比亚（Carlo Rubbia）与西蒙·范德梅尔（Simon van der Meer）把 CERN 的 SPS 改造成质子–反质子对撞机以达到它们，UA1 与 UA2 实验于 1983 年 1 月发现 $W$，1983 年 5–6 月发现 $Z$。实测值（PDG 2024）为 $M_W = 80.369\,\mathrm{GeV}$、$M_Z = 91.1880\,\mathrm{GeV}$，标准方案中 $Z$ 质量处的 $\sin^2\theta_W = 0.2313$。

::: example 几种中微子？ {#ex-neutrinos}
在 LEP 上，$e^+e^-$ 碰撞中的 $Z$ 共振被高精度地测量：总宽度 $\Gamma_Z = 2.4955\,\mathrm{GeV}$，其中衰变到不可见粒子的部分为 $\Gamma_\mathrm{inv} = 499.0\,\mathrm{MeV}$。标准模型预言每种中微子的衰变宽度为 $167.2\,\mathrm{MeV}$。轻中微子有几种？
::: solution
不可见宽度不是直接看得到的。它是总宽度——来自共振的形状 [[particles/reactions#eq-bw]]——减去测得的到强子与带电轻子的宽度。如果它全部来自中微子，

$$
N_\nu = \frac{\Gamma_\mathrm{inv}}{\Gamma_\nu} = \frac{499.0}{167.2} = 2.98 .
$$

存在三种轻中微子；于是，假定每一代各有一种，费米子共有三代。每多一种，都会使 $Z$ 加宽 $167\,\mathrm{MeV}$，并把它的强子峰值截面压低约 $12\%$，这一变化远大于测量误差。（质量大于 $M_Z/2$、或不与 $Z$ 耦合的中微子会逃过这一计数。）
:::
:::

::: quiz
以下哪些过程在标准模型中能以树图阶（交换或发射一个玻色子）发生？
- [x] $\nu_\mu + e^- \to \nu_\mu + e^-$，经 $Z$ 交换
- [ ] $K^0 \to \mu^+\mu^-$，单个 $Z$ 把 $d\bar s$ 变成 $\mu^+\mu^-$
- [x] $\pi^+ \to \mu^+\nu_\mu$，由湮灭的 $u\bar d$ 发出一个 $W^+$
- [ ] $\mu^- \to e^-\gamma$，单个光子顶点
::: solution
μ 中微子从电子上的中性流散射，正是加加梅尔 1973 年看到的：两种粒子都保持身份、交换一个 $Z$。π 介子靠 $u\bar d \to W^+ \to \mu^+\nu_\mu$ 衰变，这是带电流。$Z$ 从不改变味，所以树图阶它不能把 $d\bar s$ 变成任何东西；$K^0_L \to \mu^+\mu^-$ 确实发生，但只能通过圈图，而且稀有。光子顶点从不改变轻子味，$\mu \to e\gamma$ 从未被观测到（分支比低于约 $10^{-12}$）。
:::
:::

### 夸克混合与 CKM 矩阵

$W$ 把一个上型夸克耦合的不是某一个下型夸克，而是一个组合。尼科拉·卡比博（Nicola Cabibbo，1963）提出的方案是：让 $u$ 耦合到 $d\cos\theta_C + s\sin\theta_C$（$\sin\theta_C \approx 0.225$），从而解释了奇异衰变与非奇异衰变的相对速率。小林诚（Makoto Kobayashi）与益川敏英（Toshihide Maskawa，1973）把它推广到三代。

::: definition CKM 矩阵 {#def-ckm}
**卡比博–小林–益川矩阵**（Cabibbo–Kobayashi–Maskawa matrix）$V$ 是联系下列两组态的 $3\times3$ 幺正矩阵：经 $W$ 与 $u$、$c$、$t$ 耦合的下型夸克态 $d'$、$s'$、$b'$，以及质量本征态 $d$、$s$、$b$：

$$
\begin{pmatrix} d' \\ s' \\ b' \end{pmatrix} = \begin{pmatrix} V_{ud} & V_{us} & V_{ub} \\ V_{cd} & V_{cs} & V_{cb} \\ V_{td} & V_{ts} & V_{tb} \end{pmatrix} \begin{pmatrix} d \\ s \\ b \end{pmatrix} .
$$ {#eq-ckm}

$W$ 连接上型夸克 $i$ 与下型夸克 $j$ 的振幅正比于 $V_{ij}$。
:::

PDG 的全局拟合给出模

$$
\lvert V\rvert \approx \begin{pmatrix} 0.974 & 0.225 & 0.0037 \\ 0.225 & 0.973 & 0.042 \\ 0.0086 & 0.041 & 0.999 \end{pmatrix} .
$$

这个矩阵很接近单位矩阵：同代内的跃迁最受青睐，相邻代之间被压低约 $\lambda = 0.225$，第一代到第三代压低约 $\lambda^3$。这类 $3\times3$ 幺正矩阵有三个实角与一个不可消去的复相位，而这个相位就是标准模型夸克部分中 CP 破坏的唯一来源（[[particles/symmetries]]）。小林与益川注意到这一点时，夸克只知三种，于是他们预言了第三代；$b$ 夸克于 1977 年找到，$t$ 夸克于 1995 年。幺正性要求，例如，$\lvert V_{ud}\rvert^2 + \lvert V_{us}\rvert^2 + \lvert V_{ub}\rvert^2 = 1$，测量在约 $0.1\%$ 的精度上满足它。

轻子也混合。与电子、μ 子或 τ 子一起产生的中微子，是三个质量本征态的叠加，二者由 PMNS 矩阵（得名于庞蒂科夫（Bruno Pontecorvo）、牧二郎（Ziro Maki）、中川畅司（Masami Nakagawa）与坂田昌一（Shoichi Sakata））相联系。因为质量本征态的演化带着略有不同的相位，一个以 $\nu_\mu$ 产生的中微子飞行一段距离后可以被探测为 $\nu_\tau$：**中微子振荡**。超级神冈 1998 年确立了大气 μ 中微子的振荡，萨德伯里中微子观测台（SNO）2001–02 年表明太阳电子中微子在来地球的路上改变了味，解决了 [[particles/reactions]] 中的太阳中微子疑难。振荡要求中微子具有不同的、因而非零的质量，这是原来的标准模型不曾包含的。

::: warning CKM 矩阵不把上型夸克相互混合
惯例是把全部混合都放下型夸克，如 [[#eq-ckm]]。只有上型与下型态之间的*相对*转动才是物理的，所以这是一种选择，不是说 $u$、$c$、$t$ "没有混合"。同样，CKM 矩阵在电磁、强以及中性流 $Z$ 相互作用中不起任何作用，它们树图阶不改变味：没有 $Z \to s\bar d$ 顶点。这种改变味的中性流之不存在——在 K 介子衰变中被注意到——正是格拉肖、约翰·伊利奥普洛斯（John Iliopoulos）与卢恰诺·马亚尼（Luciano Maiani）1970 年预言粲夸克的依据。
:::

## 希格斯玻色子 {#higgs}

规范理论单看它自己，要求它的规范玻色子无质量，而带电流相互作用对左手与右手费米子的区分，也不允许它们写通常的质量项。然而 $W$、$Z$ 与费米子都有质量。解决办法由弗朗索瓦·恩格勒特（François Englert）与罗伯特·布劳特（Robert Brout）、由彼得·希格斯（Peter Higgs）、由杰拉尔德·古拉尼克（Gerald Guralnik）、卡尔·哈根（Carl Hagen）与汤姆·基布尔（Tom Kibble）于 1964 年各自提出：对称性在方程中是严格的，但在真空中被隐藏了。

标准模型包含一个复标量场二重态 $\phi$，其势为

$$
V(\phi) = -\mu^2\lvert\phi\rvert^2 + \lambda\lvert\phi\rvert^4, \qquad \mu^2, \lambda > 0 .
$$ {#eq-higgs-potential}

它的最小值不在 $\phi = 0$，而在圆 $\lvert\phi\rvert^2 = \mu^2/2\lambda$ 上。真空必须在圆上挑一个点，而这一挑就把对称性**自发破缺**了，正如停在对称山顶上的一颗球必须朝某一个特定方向滚下去。场于是有非零的真空值，惯例取 $\langle\phi\rangle = v/\sqrt{2}$，与它相互作用的规范玻色子便获得质量。场的四个实分量中，三个成为 $W^+$、$W^-$ 与 $Z$ 的纵向极化态；第四个是一个实物粒子，**希格斯玻色子**，质量 $m_H = \sqrt{2\lambda}\,v$。

::: widget plot
f: -m x^2 + l x^4
x: -2, 2
y: -1, 1.5
sliders: m=1:-1:2:0.05; l=0.5:0.1:1.5:0.05
labels: 沿场一个方向的 V
caption: 势 [[#eq-higgs-potential]] 的一个切片，任意单位，$\mu^2 = m$、$\lambda = l$。$m > 0$ 时，曲线在对称点处有局部极大，在 $\pm\sqrt{m/2l}$ 处有两个最小；在完整的复场里它们是一个最小圆，即"墨西哥帽"。把 $m$ 拖到零以下，两个最小就合并为原点一个：对称性不再破缺，规范玻色子就将无质量。最小处的曲率——随着 $l$ 的变化可以看到它在变——决定希格斯玻色子的质量。
:::

$v$ 的值由费米常量固定：把 [[#eq-gf]] 与树图阶 $M_W = g_Wv/2$ 结合，得 $v = (\sqrt{2}G_F)^{-1/2} = 246.2\,\mathrm{GeV}$。费米子通过与同一个场以**汤川耦合**（Yukawa coupling）$y_f$ 作用获得质量，$m_f = y_fv/\sqrt{2}$。模型对耦合为何取这些值一无所知；顶夸克的非常接近 1，电子的约 $3\times10^{-6}$。希格斯玻色子对每个粒子的耦合正比于该粒子的质量，实验检验的正是这一点。

::: example 希格斯场的尺度 {#ex-higgs}
由 $G_F = 1.1663788\times10^{-5}\,\mathrm{GeV}^{-2}$ 算出 $v$，由 $m_t = 172.57\,\mathrm{GeV}$ 算出顶夸克的汤川耦合，由 $m_H = 125.20\,\mathrm{GeV}$ 算出自耦合 $\lambda$。
::: solution
$\sqrt{2}G_F = 1.64952\times10^{-5}\,\mathrm{GeV}^{-2}$，所以 $v = (1.64952\times10^{-5})^{-1/2}\,\mathrm{GeV} = 246.22\,\mathrm{GeV}$。于是

$$
y_t = \frac{\sqrt{2}\,m_t}{v} = \frac{1.41421 \times 172.57}{246.22} = 0.991, \qquad \lambda = \frac{m_H^2}{2v^2} = \frac{125.20^2}{2 \times 246.22^2} = 0.129 .
$$

顶夸克是唯一汤川耦合为一量级的费米子，这就是它在 LHC 的希格斯玻色子产生中占主导的原因：主要机制是通过一个顶夸克圈的胶子融合。$\lambda$ 的值是 2012 年之前标准模型最后一个未测的参数；现在由 $m_H$ 间接知道，而通过产生希格斯玻色子对来直接测量它，是高亮度 LHC 的目标之一。
:::
:::

2012 年 7 月 4 日，ATLAS 与 CMS 合作组在 CERN 的报告中宣布观测到一个质量在 $125\,\mathrm{GeV}$ 附近的新玻色子，每个实验的显著性都约为五个标准差，主要靠 $H \to \gamma\gamma$ 与 $H \to ZZ^* \to 4\ell$ 两个衰变道。此后测得的自旋、宇称与耦合，都同意于标准模型希格斯玻色子的相应值，测得最好的耦合的不确定度约为 $10\%$。恩格勒特与希格斯获 2013 年诺贝尔物理学奖（布劳特已于 2011 年去世）。PDG 2024 的平均质量为 $125.20 \pm 0.11\,\mathrm{GeV}$。

::: history 标准模型的建立
汤川 1935 年提出介子交换，π 介子于 1947 年找到。默里·盖尔曼与独立地乔治·茨威格（George Zweig）于 1964 年提出夸克；同年，格林伯格引入了后来称为色的额外自由度，希格斯机制也发表了。格拉肖、温伯格与萨拉姆在 1961 到 1968 年间建立了电弱理论；特胡夫特（Gerard 't Hooft）与马丁努斯·费尔特曼（Martinus Veltman）于 1971–72 年证明了它的可重整性。SLAC 从 1968 年起的深度非弹性散射揭示了类点的部分子，而渐近自由（1973 年）解释了它们为什么表现得近乎自由。$J/\psi$，一个粲与反粲的束缚态，于 1974 年 11 月在布鲁克海文（丁肇中（Samuel Ting））与 SLAC（伯顿·里希特（Burton Richter））同时被发现。马丁·珀尔（Martin Perl）的小组 1975 年发现 $\tau$，利昂·莱德曼（Leon Lederman）的小组 1977 年发现 $\Upsilon$（$b\bar b$），PETRA 1979 年发现胶子喷注。$W$ 与 $Z$ 继而在 CERN 于 1983 年现身，顶夸克在费米实验室的 Tevatron（CDF 与 D0）于 1995 年，τ 中微子（DONUT）在 2000 年，希格斯玻色子在 LHC 于 2012 年。
:::

## 后续内容 {#leads}

标准模型不是最终的理论。它有约 19 个自由参数（加上中微子质量还要更多），对引力只字未提，不含有天体物理所要求的暗物质的候选者（[[gravitation/cosmology]]），而它的 CP 破坏远小于解释宇宙为什么含有物质、而不是等量的物质与反物质所需要的量。这些问题正驱动着当前的实验。这个模型背后的组织原理——相互作用来自局域对称性——以及弱相互作用所破坏的那些分立对称性 C、P 与 T，是 [[particles/symmetries]] 的主题。用来确立它的仪器在 [[particles/accelerators]]。

::: summary
- 实物由三代自旋 $\tfrac12$ 费米子构成：轻子（$e$、$\mu$、$\tau$ 与三种中微子）与电荷为 $+\tfrac23$、$-\tfrac13$ 的夸克（$u$、$d$；$c$、$s$；$t$、$b$）。强子是色单态的 $qqq$ 重子与 $q\bar q$ 介子。
- 各种力来自自旋 $1$ 规范玻色子的交换：光子、八种胶子、$W^\pm$ 与 $Z$。质量为 $m$ 的粒子传递的力的力程为 $\hbar/mc$（汤川），所以弱力是短程的，低能下看起来像点相互作用，$G_F/\sqrt2 = g_W^2/8M_W^2$。
- 费曼图：每个顶点带来一个耦合因子（$\sqrt{\alpha}$、$\sqrt{\alpha_s}$、$g_W$），每条内线带来一个传播子 $1/(q^2 - m^2)$。量纲分析给出 $\sigma(e^+e^- \to \mu^+\mu^-) = 4\pi\alpha^2/3s = 86.8\,\mathrm{nb}/s[\mathrm{GeV}^2]$。
- 色被 $\Delta^{++}$、R 值（$R = 3\sum Q_q^2$）与 $\pi^0 \to \gamma\gamma$ 所要求。QCD 渐近自由，$\alpha_s(M_Z) = 0.118$，并且禁闭，大距离下有约 $0.9\,\mathrm{GeV/fm}$ 的线性势。
- 电弱理论以混合角 $\sin^2\theta_W \approx 0.231$ 统一弱与电磁相互作用；它预言了中性流（1973）与 $W$、$Z$（1983）。$Z$ 宽度给出三种轻中微子。
- CKM 矩阵联系夸克的弱本征态与质量本征态；它的单个相位是标准模型夸克 CP 破坏的来源。中微子振荡（1998）表明中微子有质量。
- 希格斯场的真空值 $v = 246\,\mathrm{GeV}$ 给 $W$、$Z$ 与费米子质量，$m_f = y_fv/\sqrt2$。它的玻色子，$125.2\,\mathrm{GeV}$，由 ATLAS 与 CMS 于 2012 年发现。
:::

## 习题 {#exercises}

::: exercise Z 交换的力程 {level=1 check="2.16e-3"}
求 $Z$ 玻色子（$M_Z = 91.188\,\mathrm{GeV}/c^2$）传递的力的力程 $\hbar/M_Zc$，以飞米计。
::: solution
$\hbar/M_Zc = \hbar c/M_Zc^2 = 0.19733\,\mathrm{GeV\,fm}/91.188\,\mathrm{GeV} = 2.16\times10^{-3}\,\mathrm{fm}$，约为质子半径的 $1/400$。在远小于 $M_Z$ 的动量转移下，中性流相互作用实际上是接触相互作用，像带电流一样。
:::
:::

::: exercise 30 GeV 下的 μ 子对 {level=1 check="96.5"}
用 [[#eq-mumu]] 求 $\sqrt{s} = 30\,\mathrm{GeV}$ 处的 $\sigma(e^+e^- \to \mu^+\mu^-)$，以皮靶恩计。
::: solution
$s = 900\,\mathrm{GeV}^2$，所以 $\sigma = 86.8\,\mathrm{nb}/900 = 0.0965\,\mathrm{nb} = 96.5\,\mathrm{pb}$。截面按 $1/s$ 下降；$\sqrt{s}$ 接近 $M_Z$ 时这个简单公式失效，因为 $Z$ 可以在质壳上产生，共振占主导。
:::
:::

::: exercise b 阈值之上的 R {level=1 check="11/3"}
预言 $e^+e^-$ 湮灭中能量高于 $b\bar b$ 阈值但低于 $t\bar t$ 阈值时的 $R = \sigma(\text{强子})/\sigma(\mu^+\mu^-)$，取三种色、不含 QCD 修正。
::: solution
可产生的夸克是 $u$、$d$、$s$、$c$、$b$，所以 $\sum Q_q^2 = 2 \times \tfrac49 + 3 \times \tfrac19 = \tfrac{11}{9}$，$R = 3 \times \tfrac{11}{9} = \tfrac{11}{3} = 3.67$。台阶从 $\tfrac{10}{3}$ 上升 $\tfrac13$，之所以小，是因为 $b$ 夸克电荷为 $-\tfrac13$；粲阈值处的台阶 $\tfrac43$ 要醒目得多。
:::
:::

::: exercise τ 子的寿命 {level=2 check="2.91e-13"}
用 $\tau_\mu = 2.1970\,\mu\mathrm{s}$、$m_\mu = 105.658\,\mathrm{MeV}$、$m_\tau = 1776.93\,\mathrm{MeV}$ 与分支比 $B(\tau \to e\bar\nu_e\nu_\tau) = 0.1782$，按 [[#ex-muon]] 的做法估计 τ 子的寿命，以秒计，保留三位有效数字。
::: solution
按同一张图，到 $e\bar\nu\nu$ 的部分宽度为 $\Gamma_e = \Gamma_\mu(m_\tau/m_\mu)^5$，而总宽度为 $\Gamma_\mathrm{tot} = \Gamma_e/B$。由 $(m_\mu/m_\tau)^5 = (0.0594606)^5 = 7.4337\times10^{-7}$，

$$
\tau_\tau = B\,\tau_\mu\left(\frac{m_\mu}{m_\tau}\right)^5 = 0.1782 \times 2.1970\times10^{-6} \times 7.4337\times10^{-7}\,\mathrm{s} = 2.91\times10^{-13}\,\mathrm{s}.
$$

实测值为 $2.903\times10^{-13}\,\mathrm{s}$。这一符合是对**轻子普适性**的检验：$W$ 与 τ 的耦合和与 μ、e 的耦合一样强。
:::
:::

::: exercise 强耦合的跑动 {level=2 check="0.0877"}
用单圈公式 [[#eq-running]]，取 $n_f = 5$、$M_Z = 91.19\,\mathrm{GeV}$ 处 $\alpha_s(M_Z) = 0.1180$，估计 $Q = 1000\,\mathrm{GeV}$ 处的 $\alpha_s$。
::: solution
$b_0 = (33 - 10)/12\pi = 0.61008$，且 $\ln(Q^2/M_Z^2) = 2\ln(1000/91.19) = 2 \times 2.3948 = 4.7896$。分母为 $1 + 0.61008 \times 0.1180 \times 4.7896 = 1.3448$，所以 $\alpha_s(1000\,\mathrm{GeV}) = 0.1180/1.3448 = 0.0877$。（越过顶夸克质量改用 $n_f = 6$ 会影响第三位数字；耦合在十一倍的能量区间内下降了四分之一，这是奔向自由的、对数般缓慢的逼近。）
:::
:::

::: exercise 由低能数据求 W 质量 {level=2 check="80.2"}
树图阶下，[[#eq-gf]] 与 [[#eq-weinberg]] 给出 $M_W^2 = \pi\alpha/(\sqrt{2}G_F\sin^2\theta_W)$。用 $\alpha = 1/128$（它在 $Z$ 质量处的值）、$G_F = 1.16638\times10^{-5}\,\mathrm{GeV}^{-2}$ 与 $\sin^2\theta_W = 0.2313$ 算出 $M_W$，以 GeV 计。
::: solution
先推导公式：$G_F/\sqrt2 = g_W^2/8M_W^2$，而 $g_W^2 = e^2/\sin^2\theta_W = 4\pi\alpha/\sin^2\theta_W$（自然 Heaviside–Lorentz 单位制下 $e^2 = 4\pi\alpha$）。所以 $M_W^2 = \sqrt2 g_W^2/8G_F = \sqrt2 \cdot 4\pi\alpha/(8G_F\sin^2\theta_W) = \pi\alpha/(\sqrt2 G_F\sin^2\theta_W)$。数值上，

$$
\frac{\pi\alpha}{\sqrt2G_F} = \frac{\pi/128}{1.64952\times10^{-5}}\,\mathrm{GeV}^2 = 1487.9\,\mathrm{GeV}^2, \qquad M_W = \sqrt{\frac{1487.9}{0.2313}}\,\mathrm{GeV} = 80.2\,\mathrm{GeV}.
$$

实测的 $80.37\,\mathrm{GeV}$ 与之差 $0.2\%$，来自含顶夸克与希格斯玻色子的圈修正；1995 年之前，那种敏感性被用来预言顶夸克质量。若取 $\alpha = 1/137$，估计值将是 $77.5\,\mathrm{GeV}$，这就是 $\alpha$ 的跑动之所以要紧的原因。
:::
:::

::: exercise 顶夸克汤川耦合 {level=2 check="0.991"}
用 $v = 246.22\,\mathrm{GeV}$ 与 $m_t = 172.57\,\mathrm{GeV}$，求 $y_t = \sqrt2 m_t/v$，保留三位有效数字，并求电子的对应值。
::: solution
$y_t = 1.41421 \times 172.57/246.22 = 0.991$。对电子，$y_e = 1.41421 \times 0.000511/246.22 = 2.94\times10^{-6}$。二者之比约 $3\times10^5$，就是那未获解释的"味难题"（flavour puzzle）：标准模型容纳费米子的质量，却不预言它们。
:::
:::

::: exercise 汤川势 {level=3}
(a) 对球对称的 $f$ 用 $\nabla^2 f = \frac1r\frac{\dd^2}{\dd r^2}(rf)$，直接证明 $\phi(r) = e^{-\mu r}/r$ 在 $r > 0$ 时满足 $(\nabla^2 - \mu^2)\phi = 0$。(b) 把 $(\nabla^2 - \mu^2)\phi$ 在原点周围半径 $\varepsilon$ 的小球上积分，并用高斯散度定理，证明积分在 $\varepsilon \to 0$ 时趋于 $-4\pi$，从而 $(\nabla^2 - \mu^2)\phi = -4\pi\delta^3(\mathbf{r})$。(c) 证明 $e^{-\mu r}/4\pi r$ 的傅里叶变换是 $1/(q^2 + \mu^2)$，并把这一点与传播子联系起来。
::: hint
对 (b)，$\oint\nabla\phi\cdot\dd\mathbf{A} = 4\pi\varepsilon^2\phi'(\varepsilon)$，而球上的 $\int\mu^2\phi\,\dd V$ 在 $\varepsilon \to 0$ 时消失。对 (c)，先对角积分，如 [[particles/nuclear-structure]] 中形状因子的做法。
:::
::: solution
(a) $r\phi = e^{-\mu r}$，所以 $\frac{\dd^2}{\dd r^2}(r\phi) = \mu^2e^{-\mu r}$，且 $\nabla^2\phi = \mu^2e^{-\mu r}/r = \mu^2\phi$。

(b) $\phi'(r) = -e^{-\mu r}(1 + \mu r)/r^2$，所以面积分为 $4\pi\varepsilon^2\phi'(\varepsilon) = -4\pi e^{-\mu\varepsilon}(1 + \mu\varepsilon) \to -4\pi$。体积分 $\int_0^\varepsilon\mu^2(e^{-\mu r}/r)4\pi r^2\,\dd r \le 2\pi\mu^2\varepsilon^2 \to 0$。由于 $(\nabla^2 - \mu^2)\phi$ 离开原点为零、而围绕原点的任何球上的积分为 $-4\pi$，它等于 $-4\pi\delta^3(\mathbf{r})$。

(c) $\int\frac{e^{-\mu r}}{4\pi r}e^{-i\mathbf{q}\cdot\mathbf{r}}\,\dd^3r = \int_0^\infty\frac{e^{-\mu r}}{4\pi r}\frac{\sin qr}{qr}4\pi r^2\,\dd r = \frac1q\int_0^\infty e^{-\mu r}\sin qr\,\dd r = \frac1q\cdot\frac{q}{q^2 + \mu^2} = \frac{1}{q^2 + \mu^2}$。对静态交换，四维动量转移满足 $q^0 = 0$，所以 $q^2_{(4)} = -\lvert\mathbf{q}\rvert^2$，传播子 $1/(q_{(4)}^2 - m^2)$ 就是 $-1/(\lvert\mathbf{q}\rvert^2 + m^2)$：汤川势是被交换粒子传播子的傅里叶变换，它的力程 $1/\mu$ 由分母中的质量决定。
:::
:::

::: exercise 为什么需要色 {level=3}
(a) 写出 $\Delta^{++}$ 在 $J_z = +\tfrac32$ 时的自旋波函数，证明它的空间（基态，$\ell = 0$）、自旋与味波函数之积，在任意两个夸克交换下是对称的。(b) 证明 $\frac{1}{\sqrt6}\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ 在任意两个夸克交换下是反对称的，并且当每个夸克的色态经同一个行列式为一的 $3\times3$ 矩阵 $U$ 变换时保持不变。(c) 说明为什么不存在由两个夸克组成的色单态态。
::: hint
对 (b)，变换使态乘以 $\varepsilon_{ijk}U_{ai}U_{bj}U_{ck} = \det(U)\,\varepsilon_{abc}$。
:::
::: solution
(a) 三个自旋全朝上时，自旋态为 $\lvert\uparrow\uparrow\uparrow\rangle$，味态为 $\lvert uuu\rangle$。二者在三个夸克的任何置换下都不变。处于对称势中的三个全同粒子，其 $\ell = 0$ 的空间基态是对称的。乘积是对称的，与费米子的泡利原理矛盾，除非还有另一个因子是反对称的。

(b) 交换夸克 1 与 2，把 $\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ 重标为 $\varepsilon_{ijk}\lvert q_jq_iq_k\rangle = \varepsilon_{jik}\lvert q_iq_jq_k\rangle = -\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$；其余各对同理。在 $q_i \to \sum_a U_{ai}q_a$ 下，态变为 $\sum_{abc}\bigl(\sum_{ijk}\varepsilon_{ijk}U_{ai}U_{bj}U_{ck}\bigr)\lvert q_aq_bq_c\rangle = \det U\sum\varepsilon_{abc}\lvert q_aq_bq_c\rangle$，当 $\det U = 1$ 时是同一个态。所以色提供了缺的那个反对称性，$\Delta^{++}$ 的总波函数如所要求的那样是反对称的。

(c) 由两个色指标构造的不变量，需要一个张量 $T_{ij}$，对 SU(3) 中的所有 $U$ 满足 $T_{ij}U_{ai}U_{bj} = T_{ab}$。SU(3) 的指标全在下的不变张量只有 $\varepsilon_{ijk}$（三个指标），一上一下的只有 $\delta_i^j$，它把一个夸克与一个反夸克配成对。同类两个指标的不变张量不存在，所以没有 $qq$ 单态；双夸克不是自由粒子。夸克–反夸克（$\delta_i^j$）与三夸克（$\varepsilon_{ijk}$）单态就是介子与重子。
:::
:::
