[[cell-biology/membranes]] 中的双层是极好的屏障，但这既是解决办法，也是问题。细胞必须输入糖、氨基酸和离子，输出废物，并把细胞质基质的浓度远保持在外部之外：典型动物细胞把钾保持在内部约三十倍于外部，钠约十倍低于外部，游离钙约一万倍低于外部。这些差异中的每一个都在持续渗漏下维持，靠让特定物质通过的蛋白质和消耗能量把它们逆坡上推的泵。这些差异也是一座能量库。细胞利用其离子梯度驱动营养摄取、发出信号，并——作为跨膜的电压——使神经和肌肉的电活动成为可能。

本章逐步建立穿膜的物理：穿过双层的扩散与通透系数；载体与通道，使通过具有选择性且快速；电化学势，决定被动流的方向；泵与偶联运输蛋白，使流反向；膜电位，从单一离子的能斯特方程到多离子的 Goldman–Hodgkin–Katz 方程。热力学背景在[化学图谱：生物能量学](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics)中。

## 穿过双层的扩散

小的非极性分子——O₂、CO₂、N₂、类固醇激素——溶于烃核心并快速穿过双层。小的不带电极性分子如水、尿素和甘油穿过较慢；较大的极性分子如葡萄糖很慢；而离子必须脱去水分子壳才能进入核心，几乎不能穿过。在无蛋白的合成双层上测量，水的通透系数约为 $10^{-3}\ \mathrm{cm\,s^{-1}}$，而 Na⁺ 与 K⁺ 的约为 $10^{-12}\ \mathrm{cm\,s^{-1}}$ 或更低——小约十亿倍（数量级数值，如 Alberts《Molecular Biology of the Cell》第 7 版，2022 所总结）。

::: proposition 穿过膜的被动通量 {#prop-fick}
对于通过溶于膜而穿过膜的不带电溶质，从外到内的净通量（单位面积单位时间的量）为

$$
J = P\,(c_\mathrm{o} - c_\mathrm{i}),
$$ {#eq-fick}

其中 $c_\mathrm{o}$ 与 $c_\mathrm{i}$ 是两侧溶液中的浓度，$P$ 是**通透系数**（速度单位，如 cm s⁻¹）。膜厚度为 $\ell$ 时，$P = KD_\mathrm{m}/\ell$，$K$ 是溶质在膜与水之间的分配系数，$D_\mathrm{m}$ 是其在膜中的扩散系数。假设：跨膜稳态、两侧溶液充分混合、无结合或载体。
:::

::: proof 穿过平板时的 Fick 第一定律
膜内通量服从 Fick 第一定律，$J = -D_\mathrm{m}\,dc/dx$。稳态下 $J$ 在每个深度都相同，因此浓度在平板上线性下降。在两面上，膜中的浓度是相邻水中浓度的 $K$ 倍，所以落差为 $K(c_\mathrm{o} - c_\mathrm{i})$，距离为 $\ell$，于是 $J = D_\mathrm{m}K(c_\mathrm{o}-c_\mathrm{i})/\ell$。
:::

Overton 的旧相关性（见 [[cell-biology/membranes]]）就是因子 $K$：分子越溶于油，穿过越快。

::: example 裸双层有多漏？ {#ex-leak}
半径 $r$ 的球形细胞置于不含某溶质的溶液中。若只有穿过双层的被动扩散起作用，内部浓度以时间常数 $\tau = V/(PA) = r/(3P)$ 指数趋近外部浓度。对 $r = 10\ \mathrm{\mu m}$ 求 $\tau$：(a) 类似水的通透性 $P = 10^{-3}\ \mathrm{cm\,s^{-1}}$；(b) 小极性溶质 $P = 10^{-6}\ \mathrm{cm\,s^{-1}}$；(c) 离子 $P = 10^{-12}\ \mathrm{cm\,s^{-1}}$。
::: solution
内部量的变化率为 $V\,dc_\mathrm{i}/dt = PA(c_\mathrm{o}-c_\mathrm{i})$，所以 $c_\mathrm{o}-c_\mathrm{i}$ 按 $e^{-t/\tau}$ 衰减，$\tau = V/(PA)$；球体 $V/A = r/3$。取 $r = 10^{-3}\ \mathrm{cm}$：

(a) $\tau = 10^{-3}/(3\times10^{-3}) = 0.33\ \mathrm{s}$。

(b) $\tau = 333\ \mathrm{s}$，约六分钟。

(c) $\tau = 3.3\times10^8\ \mathrm{s}$，约十年。

裸双层几乎瞬间平衡水，却能把离子留住数年。因此细胞需要蛋白质让离子和极性营养以有用速率通过——而这些蛋白质，而非脂质，决定哪些物质通过。（许多细胞还有水通道水孔蛋白，进一步提高水的通透性。）
:::
:::

## 运输蛋白：载体与通道

两族蛋白质把溶质运过膜，工作方式根本不同。

::: definition 运输蛋白与通道 {#def-transporters}
**运输蛋白**（载体或透酶）在膜的一侧结合其溶质，发生构象变化，把结合位点暴露到另一侧并在那里释放。任何时刻都没有穿过膜的开放通路。移动单一溶质的运输蛋白是**单转运蛋白**；把两种同向移动的溶质偶联起来的是**同向转运蛋白**，反向的是**反向转运蛋白**。

**通道**形成充水的孔，开启时让选定离子或分子流过，不紧密结合。通道通常有门控：响应膜电压变化（电压门控）、配体结合（配体门控）或机械应力（机械敏感）。
:::

差异体现在速率上。因为运输蛋白每移动一个溶质（或一小群溶质）都必须改变构象，它每秒处理约 $10^2$–$10^4$ 个分子。通道一旦开启，可让离子以每秒约 $10^8$ 个流过，接近扩散到孔口所设的极限。差异也体现在动力学上。

::: proposition 可饱和的载体动力学 {#prop-carrier}
若单转运蛋白在单一部位快速、可逆地结合其溶质，且构象变化是限速步骤，则从浓度 $c$ 的溶液（内部无溶质）摄取时的初始速率为

$$
v = \frac{V_{\max}\,c}{K_\mathrm{m} + c},
$$ {#eq-carrier}

其中 $V_{\max}$ 是所有载体都占满时的速率，$K_\mathrm{m}$ 是速率达到半最大时的浓度。这是酶动力学的米氏形式，载体是酶，转位是催化步骤（见[化学图谱：酶](/learn/chemistry/lesson.php?c=biochemistry&l=enzymes)）。相比之下，穿过双层的简单扩散 [[#eq-fick]] 线性增加，没有上限。
:::

饱和、高特异性（D-葡萄糖而非 L-葡萄糖）以及近似类似物的竞争性抑制，是实验上识别载体介导运输的方式。例如人红细胞中的葡萄糖单转运蛋白 GLUT1 对葡萄糖的 $K_\mathrm{m}$ 约为 1.5 mmol L⁻¹（Lodish《Molecular Cell Biology》第 9 版，2021）；在血糖浓度约 5 mmol L⁻¹ 时，它以约四分之三的最大速率运行。

::: widget plot
f: V*x/(K + x); p*x
x: 0, 20
y: 0, 12
sliders: V=10:1:12:0.1; K=1.5:0.1:10:0.1; p=0.3:0:1:0.01
labels: \text{载体：} V_{\max} c/(K_\mathrm{m}+c); \text{扩散：} Pc
caption: 摄取速率（任意单位）与外部浓度 $c$（mmol L⁻¹）的关系。第一条曲线是载体介导运输 [[#eq-carrier]]，滑块为 $V_{\max}$（$V$）与 $K_\mathrm{m}$（$K$）；直线是被动扩散 [[#eq-fick]]，斜率为 $p$。注意载体在低浓度胜出但会饱和，而扩散持续上升：在宽范围内绘制实测摄取与浓度的关系可区分二者。
:::

### 通道：选择性与速度

通道必须同时快速又有选择性，看似矛盾：紧密结合带来选择性却减慢释放。Roderick MacKinnon 对来自 *Streptomyces lividans* 的钾通道 KcsA 的晶体结构（Declan Doyle 及其同事，1998）说明了如何做到。孔的最窄部分即**选择性过滤器**，由特征序列 TVGYG 的骨架羰基氧衬里，间距恰好取代脱水 K⁺ 离子周围的水分子。K⁺ 进入过滤器时几乎不耗能量地失去水壳。小 0.04 nm 的 Na⁺ 不能被刚性过滤器贴合，因此脱水它得不到补偿，被排除——通道对 K⁺ 的偏好超过一千倍。若干 K⁺ 离子单列占据过滤器，相互排斥把它们快速推过。MacKinnon 与 Peter Agre 共享 2003 年诺贝尔化学奖；Agre 在 1992 年通过显示注射其 RNA 的蛙卵母细胞在稀溶液中迅速膨胀，从红细胞膜中鉴定出第一个水通道水孔蛋白-1。

单个通道的电流可由**膜片钳**直接测量，该技术由 Erwin Neher 与 Bert Sakmann 在 1976 年发展（1991 年诺贝尔生理学或医学奖）：玻璃微管紧密封在一小片膜上，隔离一个或几个通道，每个通道的开启与关闭表现为几皮安的矩形电流阶跃。

::: example 通过一个通道的电流 {#ex-channel-current}
一个单通道电导为 20 pS 的钾通道在膜中开启，K⁺ 的驱动力——膜电位与 K⁺ 平衡电位之差——为 100 mV。流过什么电流，每秒携带多少离子？
::: solution
由欧姆定律，$I = g\,\Delta V = (20\times10^{-12}\ \mathrm{S})(0.100\ \mathrm{V}) = 2.0\times10^{-12}\ \mathrm{A} = 2.0\ \mathrm{pA}$。每个离子携带电荷 $e = 1.602\times10^{-19}\ \mathrm{C}$，所以通量为 $2.0\times10^{-12}/1.602\times10^{-19} = 1.25\times10^7$ 个离子每秒——比典型运输蛋白快约一千倍。
:::
:::

## 电化学势

对不带电分子，被动流的方向只是顺着浓度梯度向下。离子还感受跨膜电场，两种效应必须合并。

::: definition 电化学势与被动及主动运输 {#def-electrochemical}
电荷数 $z$ 的离子在电势 $\psi$ 的隔室中的**电化学势**为

$$
\tilde\mu = \mu^\circ + RT\ln c + zF\psi,
$$ {#eq-electrochemical}

其中 $R$ 是气体常数，$T$ 是绝对温度，$F = 96\,485\ \mathrm{C\,mol^{-1}}$ 是法拉第常数，$c$ 是浓度（严格说是活度）。把一摩尔离子从外（o）移到内（i）的自由能变化为

$$
\Delta G = \tilde\mu_\mathrm{i} - \tilde\mu_\mathrm{o} = RT\ln\frac{c_\mathrm{i}}{c_\mathrm{o}} + zF V_\mathrm{m},
$$ {#eq-dg-ion}

其中 $V_\mathrm{m} = \psi_\mathrm{i} - \psi_\mathrm{o}$ 是**膜电位**（按约定，内部相对于外部）。$\Delta G < 0$ 的运输能自发发生，是被动的，无论通过双层、通道还是单转运蛋白。$\Delta G > 0$ 的运输是主动的，必须偶联到能源：ATP 水解、光，或另一溶质的顺坡移动。
:::

离子跨膜平衡时 $\Delta G = 0$，[[#eq-dg-ion]] 立刻给出电生理学中最重要的方程。

::: proposition 能斯特方程 {#prop-nernst}
电荷数 $z$ 的离子跨膜平衡时，膜电位等于其**平衡（能斯特）电位**

$$
E_\mathrm{X} = \frac{RT}{zF}\ln\frac{[\mathrm{X}]_\mathrm{o}}{[\mathrm{X}]_\mathrm{i}}.
$$ {#eq-nernst}

37 °C 时 $RT/F = 26.7\ \mathrm{mV}$，所以 $E_\mathrm{X} = (61.5\ \mathrm{mV}/z)\log_{10}([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$；20 °C 时因子为 58.2 mV。假设：离子处于电化学平衡（净通量为零），两侧活度系数相等，且只考虑这一种离子。
:::

::: proof
在 [[#eq-dg-ion]] 中令 $\Delta G = 0$：$RT\ln(c_\mathrm{i}/c_\mathrm{o}) + zFV_\mathrm{m} = 0$，所以 $V_\mathrm{m} = (RT/zF)\ln(c_\mathrm{o}/c_\mathrm{i})$。
:::

能斯特电位是恰好平衡该离子浓度梯度的电压：在 $V_\mathrm{m} = E_\mathrm{X}$ 时，把离子推向一侧的电力平衡其向另一侧扩散的趋势。差值 $V_\mathrm{m} - E_\mathrm{X}$ 是该离子受到的**驱动力**，即 [[#ex-channel-current]] 所用的量。

::: example 哺乳动物细胞中的平衡电位 {#ex-nernst}
哺乳动物细胞的典型浓度（mmol L⁻¹）为：K⁺ 内 140、外 5；Na⁺ 内 12、外 145；Cl⁻ 内 10、外 110；游离 Ca²⁺ 内 0.0001、外 2（代表性数值；不同细胞类型有差异）。计算 37 °C 下各自的平衡电位。
::: solution
取 $RT/F = 26.73\ \mathrm{mV}$：

$$
\begin{aligned}
E_\mathrm{K} &= 26.73\ln(5/140) = 26.73\times(-3.332) = -89\ \mathrm{mV},\\
E_\mathrm{Na} &= 26.73\ln(145/12) = 26.73\times2.492 = +67\ \mathrm{mV},\\
E_\mathrm{Cl} &= \frac{26.73}{-1}\ln(110/10) = -26.73\times2.398 = -64\ \mathrm{mV},\\
E_\mathrm{Ca} &= \frac{26.73}{2}\ln(2/0.0001) = 13.36\times9.903 = +132\ \mathrm{mV}.
\end{aligned}
$$

平衡电位跨度超过 200 mV。典型约 −70 mV 的静息电位接近 $E_\mathrm{K}$，但远离 $E_\mathrm{Na}$ 与 $E_\mathrm{Ca}$，所以打开钠或钙通道会让这些离子涌入——这是电信号与钙信号的基础。
:::
:::

::: warning “膜电位来自大量电荷分离”
细胞质基质与细胞外液在极好近似下都是电中性的。膜电位由膜两侧厚度不足一纳米的层中极小过剩电荷产生，它像电容器一样工作。[[#ex-capacitor]] 表明，把细胞充到 −100 mV 只移动约五万个钾离子中的一个。这就是为什么细胞能在毫秒内改变电位而不明显改变离子浓度——也说明把细胞内部想成“带负电”是错误的。
:::

::: example 多少离子产生膜电位？ {#ex-capacitor}
生物膜的单位面积电容约为 $1\ \mathrm{\mu F\,cm^{-2}}$。半径 10 µm、含 140 mmol L⁻¹ K⁺ 的球形细胞，需要多少单价离子跨膜才能改变电位 100 mV，这占细胞钾的多少？
::: solution
面积 $A = 4\pi r^2 = 1257\ \mathrm{\mu m^2} = 1.257\times10^{-5}\ \mathrm{cm^2}$，所以电容 $C = 1.26\times10^{-11}\ \mathrm{F} = 12.6\ \mathrm{pF}$。电荷 $Q = C\Delta V = 1.26\times10^{-12}\ \mathrm{C}$，即 $Q/e = 7.8\times10^6$ 个离子。

细胞体积 $4.19\times10^{-12}\ \mathrm{L}$，含 $0.14\times4.19\times10^{-12}\times6.022\times10^{23} = 3.5\times10^{11}$ 个 K⁺。比例为 $7.8\times10^6/3.5\times10^{11} = 2.2\times10^{-5}$：约四万五千个离子中的一个。
:::
:::

## 泵与偶联运输

[[#ex-nernst]] 的梯度会在数小时内经漏通道耗尽，除非有东西恢复它们。这就是原发性主动运输。

### 钠–钾泵

1957 年 Jens Christian Skou 在蟹（*Carcinus maenas*）神经的膜中发现一种同时需要 Na⁺ 和 K⁺ 的 ATP 酶——即今天所称的**Na⁺/K⁺-ATP 酶**或钠泵（Skou 共享 1997 年诺贝尔化学奖）。每水解一个 ATP，它输出三个 Na⁺ 并输入两个 K⁺，在朝内、对 Na⁺ 高亲和与朝外、对 K⁺ 高亲和两种构象间循环，由天冬氨酸残基的磷酸化驱动。它属于**P 型 ATP 酶**家族，该家族还包括质膜与内质网的 Ca²⁺ 泵和胃的 H⁺/K⁺ 泵。由于它每输入两个正电荷就输出三个，它是**生电的**，直接对膜电位贡献几毫伏。在许多动物细胞中它消耗全部 ATP 的很大一部分，常引用的估计约为五分之一到三分之一，在神经元中更多。

::: example 一个 ATP 能支付钠泵吗？ {#ex-pump}
用 [[#ex-nernst]] 的浓度和 37 °C 下 $V_\mathrm{m} = -70\ \mathrm{mV}$，计算输出 3 Na⁺、输入 2 K⁺ 所需自由能，并与细胞中 ATP 水解的自由能约 −50 到 −60 kJ mol⁻¹ 比较（[化学图谱：生物能量学](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics)）。
::: solution
$RT = 2.579\ \mathrm{kJ\,mol^{-1}}$，$F\times0.070\ \mathrm{V} = 6.75\ \mathrm{kJ\,mol^{-1}}$。

把 Na⁺ 从内（12 mM，$\psi = -70$ mV）移到外（145 mM，$\psi = 0$）：$\Delta G = RT\ln(145/12) + F(0 - (-0.070)) = 6.43 + 6.75 = 13.18\ \mathrm{kJ\,mol^{-1}}$——逆两个梯度上坡。

把 K⁺ 从外（5 mM）移到内（140 mM，$-70$ mV）：$\Delta G = RT\ln(140/5) + F(-0.070 - 0) = 8.59 - 6.75 = 1.84\ \mathrm{kJ\,mol^{-1}}$——浓度梯度反对它，但电压帮助。

总计：每循环 $3(13.18) + 2(1.84) = 43.2\ \mathrm{kJ}$。ATP 水解供应约 50–60 kJ mol⁻¹，足够并有余量，所以泵能正向运行；3:2 的化学计量接近这些条件下一个 ATP 能支付的最大值。
:::
:::

其他原发泵包括酸化溶酶体与液泡的**V 型 ATP 酶**（[[cell-biology/organelles]]），线粒体、叶绿体与细菌的**F 型 ATP 合酶**，它通常反向运行，用质子梯度制造 ATP（[化学图谱：氧化磷酸化](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation)），以及庞大的**ABC 转运蛋白**超家族，用 ATP 移动糖、肽、脂质和药物等多样底物。一个 ABC 转运蛋白 P-糖蛋白把化疗药泵出肿瘤细胞，是多药耐药的原因；另一个 CFTR 已成为氯通道，其缺失导致囊性纤维化（[医学图谱：遗传学](/learn/medicine/course.php?c=genetics)）。

### 继发性主动运输

泵建立梯度后，其他运输蛋白可以花费它。**同向转运蛋白**把 Na⁺（动物中）或 H⁺（细菌、真菌与植物中）的顺坡移动与营养的逆坡移动偶联；**反向转运蛋白**把它与输出别的东西偶联，如 Na⁺/H⁺ 交换器排出质子，Na⁺/Ca²⁺ 交换器排出钙。在肠与肾中，Na⁺–葡萄糖同向转运蛋白 SGLT1 每分子葡萄糖带两个 Na⁺进入上皮细胞；同一细胞的另一侧，GLUT2 单转运蛋白让葡萄糖扩散到血液。Peter Mitchell 的化学渗透观点（1961）认为离子梯度是可与 ATP 互相转换的一般能量货币，最初用于 ATP 合成，但在这里同样适用。

::: example 钠偶联的同向转运蛋白能把葡萄糖浓缩多远？ {#ex-sglt}
SGLT1 把 2 Na⁺ 与 1 葡萄糖偶联。平衡时一个完整循环的自由能变化为零。用 $[\mathrm{Na^+}]_\mathrm{o}/[\mathrm{Na^+}]_\mathrm{i} = 145/12$ 和 37 °C 下 $V_\mathrm{m} = -70\ \mathrm{mV}$，求它能维持的最大比值 $[\mathrm{glc}]_\mathrm{i}/[\mathrm{glc}]_\mathrm{o}$。
::: solution
对一个循环（2 Na⁺ 和 1 不带电葡萄糖向内移动），[[#eq-dg-ion]] 给出

$$
\Delta G = RT\ln\frac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} + 2\left(RT\ln\frac{[\mathrm{Na}]_\mathrm{i}}{[\mathrm{Na}]_\mathrm{o}} + FV_\mathrm{m}\right) = 0,
$$

所以

$$
\frac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} = \left(\frac{[\mathrm{Na}]_\mathrm{o}}{[\mathrm{Na}]_\mathrm{i}}\right)^2 \exp\!\left(-\frac{2FV_\mathrm{m}}{RT}\right) = (12.08)^2 \times e^{2\times70/26.73} = 146\times188 \approx 2.7\times10^4.
$$

原则上细胞可把葡萄糖保持在外部浓度约 27,000 倍。真实梯度远小，因为葡萄糖通过 GLUT2 离开的速度与进入一样快，但计算说明为何偶联两个 Na⁺ 而非一个（后者只给出约 166）能让上皮在肠或肾滤液中只剩很少葡萄糖时仍吸收它。
:::
:::

## 静息膜电位

若膜只对 K⁺ 通透，其电位会停在 $E_\mathrm{K}$。真实静息膜主要通过漏通道对 K⁺ 通透，但不只对 K⁺；它们也漏一些 Na⁺ 和 Cl⁻。静息电位位于能斯特电位之间，按通透性加权。

::: proposition Goldman–Hodgkin–Katz 电压方程 {#prop-ghk}
若 K⁺、Na⁺ 和 Cl⁻ 以通透性 $P_\mathrm{K}$、$P_\mathrm{Na}$、$P_\mathrm{Cl}$ 独立跨膜，净电流为零时的膜电位为

$$
V_\mathrm{m} = \frac{RT}{F}\ln\frac{P_\mathrm{K}[\mathrm{K^+}]_\mathrm{o} + P_\mathrm{Na}[\mathrm{Na^+}]_\mathrm{o} + P_\mathrm{Cl}[\mathrm{Cl^-}]_\mathrm{i}}{P_\mathrm{K}[\mathrm{K^+}]_\mathrm{i} + P_\mathrm{Na}[\mathrm{Na^+}]_\mathrm{i} + P_\mathrm{Cl}[\mathrm{Cl^-}]_\mathrm{o}}.
$$ {#eq-ghk}

注意氯是阴离子，其内外位置互换。假设（David Goldman，1943；Alan Hodgkin 与 Bernard Katz，1949）：电场在膜内均匀（“恒定场”假设），离子彼此独立移动，通透性在所考虑范围内不依赖电压，主动泵电流可忽略。仅有一种可透离子时它退化为 [[#eq-nernst]]。
:::

方程说明静息电位是稳态，不是平衡：Na⁺ 持续漏入、K⁺ 持续漏出，泵通过把它们送回使浓度恒定。这就是**泵–漏**图景。

::: example 静息与动作电位峰值时的乌贼巨轴突 {#ex-ghk}
Hodgkin 与 Katz（1949）估计乌贼巨轴突的相对通透性在静息时为 $P_\mathrm{K}:P_\mathrm{Na}:P_\mathrm{Cl} = 1:0.04:0.45$，动作电位峰值时为 $1:20:0.45$。取浓度（mmol L⁻¹）K⁺ 内 400、外 20；Na⁺ 内 50、外 440；Cl⁻ 内 52、外 560，$RT/F = 25.3\ \mathrm{mV}$（20 °C），计算两种状态下的 $V_\mathrm{m}$ 并与 $E_\mathrm{K}$、$E_\mathrm{Na}$ 比较。
::: solution
静息时：

$$
V_\mathrm{m} = 25.26\ln\frac{20 + 0.04(440) + 0.45(52)}{400 + 0.04(50) + 0.45(560)} = 25.26\ln\frac{61.0}{654} = 25.26\times(-2.372) = -60\ \mathrm{mV}.
$$

峰值时，$P_\mathrm{Na} = 20$：

$$
V_\mathrm{m} = 25.26\ln\frac{20 + 8800 + 23.4}{400 + 1000 + 252} = 25.26\ln\frac{8843}{1652} = 25.26\times1.678 = +42\ \mathrm{mV}.
$$

能斯特电位为 $E_\mathrm{K} = 25.26\ln(20/400) = -76\ \mathrm{mV}$ 与 $E_\mathrm{Na} = 25.26\ln(440/50) = +55\ \mathrm{mV}$。静息时膜更接近 $E_\mathrm{K}$，因为 K⁺ 主导通透性；当 Na⁺ 通道打开、$P_\mathrm{Na}$ 上升约 500 倍时，电位摆向 $E_\mathrm{Na}$。不需要浓度变化——只需通透性变化。
:::
:::

下图显示哺乳动物细胞（无氯项）的 [[#eq-ghk]]，随 $P_\mathrm{Na}/P_\mathrm{K}$ 在五个数量级内变化。

::: widget plot
f: 26.73*ln((k + 10^x*145)/(140 + 10^x*12)); 26.73*ln(k/140); 66.6
x: -3, 2
y: -120, 80
sliders: k=5:1:40:0.5
labels: V_\mathrm{m}\ \text{(GHK)}; E_\mathrm{K}; E_\mathrm{Na}
hlines: 0
caption: 37 °C 下 Goldman–Hodgkin–Katz 膜电位（mV）与 $\log_{10}(P_\mathrm{Na}/P_\mathrm{K})$ 的关系，取内部 K⁺ 140、Na⁺ 12，外部 Na⁺ 145 mmol L⁻¹，忽略氯。滑块 $k$ 设定外部 K⁺（mmol L⁻¹）。低 $P_\mathrm{Na}/P_\mathrm{K}$ 时电位接近 $E_\mathrm{K}$（第二条曲线），高比值时接近 $E_\mathrm{Na}$（+67 mV 水平线）。典型静息比值 0.01–0.05（水平位置 −2 到 −1.3）给出 −82 到 −65 mV。提高外部 K⁺，观察静息电位去极化。
:::

::: quiz
一种药物完全阻断 Na⁺/K⁺-ATP 酶。动物细胞的膜电位在第一秒和随后数小时会怎样？
- [ ] 一秒内崩溃到零，因为泵产生电位。
- [x] 立即只改变几毫伏（泵的生电部分），随后在数分钟到数小时内因 Na⁺ 与 K⁺ 梯度耗尽而缓慢下降。
- [ ] 变得更负，因为 K⁺ 不再被泵入。
- [ ] 什么也不发生，因为电位只取决于通道。
::: solution
静息电位主要由离子梯度和漏通透性通过 [[#eq-ghk]] 决定；泵的直接生电贡献只有几毫伏。阻断它立即移除这一贡献，但梯度会持续到漏失耗散它们，这取决于细胞大小与通透性，需数分钟到数小时。细胞还会肿胀，因为 Na⁺ 与 Cl⁻ 积累、水随之渗透——泵是动物细胞的主要体积调节器。洋地黄苷如 ouabain 与 digoxin 抑制该泵；其临床用途属于[医学图谱：药理学](/learn/medicine/course.php?c=pharmacology)。
:::
:::

::: application 渗透、体积与植物细胞壁
水被动跨膜，从总溶质浓度低处到高处，穿过双层和水孔蛋白。动物细胞没有壁，必须使内部渗透浓度等于外部，泵出钠部分原因在此；红细胞放入纯水会肿胀破裂。植物、真菌与细菌细胞则让水进入直到刚性细胞壁推回：产生的**膨压**在许多植物细胞中为几倍大气压，支撑非木质植物直立，这就是缺水时它们萎蔫的原因。淡水原生生物如 *Paramecium* 用收缩泡排出进入的水。植物细胞用质子泵（P 型 H⁺-ATP 酶），动物细胞用钠泵，所以植物膜由质子梯度供能，其静息电位常更负，约 −120 到 −200 mV。
:::

::: history
能斯特方程由 Walther Nernst 在 1889 年为电化学电池推导；1902 年 Julius Bernstein 提出神经与肌肉的静息电位源于膜对钾的选择性通透，兴奋是这种选择性的短暂破坏。David Goldman 在 1943 年推导恒定场电流方程。1949 年 Alan Hodgkin 与 Bernard Katz 在乌贼 *Loligo* 巨轴突上表明静息电位跟随 K⁺ 梯度、动作电位越过 Na⁺ 平衡电位，并用 Goldman 方程拟合数据；Hodgkin 与 Andrew Huxley 的动作电位定量模型于 1952 年出现（1963 年诺贝尔生理学或医学奖，与 John Eccles）。Jens Christian Skou 在 1957 年描述 Na⁺/K⁺-ATP 酶。Peter Mitchell 的化学渗透假说于 1961 年出现。Erwin Neher 与 Bert Sakmann 在 1976 年记录蛙肌肉的单个乙酰胆碱受体通道。Peter Agre 的团队在 1992 年鉴定水孔蛋白-1，Roderick MacKinnon 的团队在 1998 年解出钾通道 KcsA 的结构。
:::

神经元把 [[#ex-ghk]] 的通透性变化变成动作电位；完整的 Hodgkin–Huxley 故事属于 [[neuroscience]] 和[医学图谱：膜电位](/learn/medicine/lesson.php?c=physiology&l=membrane-potentials)。在 [[cell-biology/cell-signalling]] 中我们再次见到离子通道作为受体，以及具有一万倍梯度的 Ca²⁺ 作为信使。

::: summary
- 裸双层容易通过小的非极性分子和水，但离子慢约 $10^9$ 倍；$J = P(c_\mathrm{o} - c_\mathrm{i})$，仅靠双层离子平衡需数年。
- 运输蛋白（单转运、同向转运、反向转运）通过构象变化结合并转位溶质，速率 $10^2$–$10^4$ s⁻¹，具可饱和的米氏动力学；通道形成有门控、选择性的孔，可让最多 $10^8$ 个离子 s⁻¹ 通过。
- 把离子移入内部的自由能为 $\Delta G = RT\ln(c_\mathrm{i}/c_\mathrm{o}) + zFV_\mathrm{m}$；被动运输 $\Delta G < 0$，主动运输需偶联能源。
- 能斯特电位 $E_\mathrm{X} = (RT/zF)\ln([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$：37 °C 下每十倍 61.5 mV。典型值：$E_\mathrm{K} \approx -89$、$E_\mathrm{Na} \approx +67$、$E_\mathrm{Ca} \approx +130$ mV。
- 膜电位由极小的电荷分离设定（约 $10^4$–$10^5$ 个离子中的一个），跨 1 µF cm⁻² 电容器。
- Na⁺/K⁺-ATP 酶（每 ATP 输出 3 Na⁺、输入 2 K⁺）建立同向与反向转运蛋白所花费的梯度；SGLT1 的 2 Na⁺ 可浓缩葡萄糖约 $10^4$ 倍。
- GHK 方程把静息电位给出为通透性加权的稳态；仅改变通透性就使 $V_\mathrm{m}$ 在 $E_\mathrm{K}$ 与 $E_\mathrm{Na}$ 之间移动。
:::

## 练习

::: exercise 十倍钾梯度 {level=1 check="-61.5"}
计算 37 °C 下 K⁺ 外部 10 mmol L⁻¹、内部 100 mmol L⁻¹ 的平衡电位（mV）。
::: solution
$E_\mathrm{K} = 61.54\log_{10}(10/100) = -61.5\ \mathrm{mV}$。
:::
:::

::: exercise 钙平衡电位 {level=1 check="126"}
计算 37 °C 下游离 Ca²⁺ 外部 1.2 mmol L⁻¹、内部 100 nmol L⁻¹ 的 $E_\mathrm{Ca}$（mV，三位有效数字）。
::: solution
$E_\mathrm{Ca} = \dfrac{26.73}{2}\ln\dfrac{1.2\times10^{-3}}{1.0\times10^{-7}} = 13.36\times\ln(12\,000) = 13.36\times9.393 = 126\ \mathrm{mV}$。
:::
:::

::: exercise 葡萄糖载体的占据率 {level=1 check="0.769"}
GLUT1 的 $K_\mathrm{m} \approx 1.5\ \mathrm{mmol\,L^{-1}}$。在葡萄糖浓度 5 mmol L⁻¹ 时，它达到最大速率的多少比例（三位有效数字）？
::: solution
由 [[#eq-carrier]]，$v/V_{\max} = c/(K_\mathrm{m} + c) = 5/6.5 = 0.769$。
:::
:::

::: exercise 极性溶质的平衡 {level=2 check="333"}
用 [[#ex-leak]] 的结果 $\tau = r/(3P)$，$P = 10^{-6}\ \mathrm{cm\,s^{-1}}$ 的溶质在半径 10 µm 的球形细胞膜上平衡需要多少秒（一个时间常数）？
::: solution
$r = 10^{-3}\ \mathrm{cm}$，所以 $\tau = 10^{-3}/(3\times10^{-6}) = 333\ \mathrm{s}$。
:::
:::

::: exercise 由通透性求静息电位 {level=2 check="-65.2"}
用 [[#eq-ghk]]（忽略氯）计算 37 °C 下 K⁺ 内 140、外 5；Na⁺ 内 12、外 145（mmol L⁻¹）且 $P_\mathrm{Na}/P_\mathrm{K} = 0.05$ 的细胞静息电位（mV，三位有效数字）。
::: solution
$V_\mathrm{m} = 26.73\ln\dfrac{5 + 0.05\times145}{140 + 0.05\times12} = 26.73\ln\dfrac{12.25}{140.6} = 26.73\times(-2.440) = -65.2\ \mathrm{mV}$。
:::
:::

::: exercise 数通道中的离子 {level=2 check="25.0"}
电导 10 pS 的通道在 80 mV 驱动力下开启 5.0 ms。多少单价离子通过？以千为单位、三位有效数字作答。
::: solution
$I = 10\times10^{-12}\times0.080 = 0.80\ \mathrm{pA}$。电荷 $= 0.80\times10^{-12}\times5.0\times10^{-3} = 4.0\times10^{-15}\ \mathrm{C}$，即 $4.0\times10^{-15}/1.602\times10^{-19} = 2.50\times10^4$ 个离子——25.0 千。一次短暂开启移动数千个离子，所以几百个通道足以改变小细胞的电位。
:::
:::

::: exercise 一个钠的同向转运蛋白 {level=2 check="166"}
对只把一个 Na⁺ 与每分子葡萄糖偶联的假想同向转运蛋白重复 [[#ex-sglt]]。最大积累比是多少（三位有效数字）？
::: solution
$\dfrac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} = \dfrac{145}{12}\exp\!\left(\dfrac{70}{26.73}\right) = 12.08\times13.72 = 166$。化学计量加倍使因子平方，从 166 到约 27,000。
:::
:::

::: exercise 解读钾滴定 {level=3}
在不同外部 K⁺ 溶液中测量肌纤维静息电位（内部 K⁺ 约 140 mmol L⁻¹，37 °C）：

| $[\mathrm{K^+}]_\mathrm{o}$ (mM) | 2.5 | 5 | 10 | 20 | 50 | 100 |
|---|---|---|---|---|---|---|
| $V_\mathrm{m}$ (mV) | −95 | −82 | −67 | −50 | −27 | −9 |

（代表性数值。）(a) 计算各外部浓度下的 $E_\mathrm{K}$。(b) 在哪个范围内 $V_\mathrm{m}$ 跟随 $E_\mathrm{K}$，完美 K⁺ 选择性会给出每十倍变化的什么斜率？(c) 用 [[#eq-ghk]] 解释低 $[\mathrm{K^+}]_\mathrm{o}$ 时的偏离。
::: solution
(a) $E_\mathrm{K} = 26.73\ln([\mathrm{K}]_\mathrm{o}/140)$：−108、−89、−71、−52、−28 与 −9 mV。
(b) 约 20 到 100 mM 时实测值在 $E_\mathrm{K}$ 约 2 mV 内，斜率接近每十倍 61 mV，即 37 °C 的能斯特斜率。
(c) 低 $[\mathrm{K^+}]_\mathrm{o}$ 时 [[#eq-ghk]] 分子中的 K⁺ 项变小，因此小的 Na⁺（与 Cl⁻）通透性贡献相对更大，把 $V_\mathrm{m}$ 拉高于 $E_\mathrm{K}$：2.5 mM 时膜为 −95 mV 而非 −108 mV。把 GHK 方程拟合整条曲线可给出 $P_\mathrm{Na}/P_\mathrm{K}$，此处约 0.01——这基本上就是 Hodgkin 与 Katz 得出通透性比的方法。
:::
:::

::: exercise 细胞为何为钠梯度付费？ {level=3}
一名学生主张，Na⁺/K⁺-ATP 酶把细胞 ATP 的五分之一以上浪费在把 Na⁺ 赶出去，而细胞完全可以只让膜对 Na⁺ 不透。用本章思想给出三个不同理由，说明对稍微漏的膜而言钠梯度为何值得动物细胞付出成本。然后解释植物与细菌细胞为何用质子梯度承担同样角色。
::: solution
(1) **能量储存与偶联。** Na⁺ 梯度是同向与反向转运蛋白用来输入葡萄糖和氨基酸、输出 Ca²⁺ 与 H⁺ 等的货币（[[#ex-sglt]]）；对 Na⁺ 不透的膜无法使用它。
(2) **信号。** 在巨大梯度下打开 Na⁺ 通道产生快速去极化，这是动作电位和许多感觉反应的基础；这需要梯度和能开启的通道。
(3) **体积控制。** 动物细胞含不可透、带负电的大分子，吸引反离子并吸水；把 Na⁺ 泵出使膜对其有效不透并平衡渗透压。没有泵，细胞会肿胀。
完全对 Na⁺ 密闭的膜也会失去设定稳定静息电位的漏通透性。植物、真菌与细菌有刚性壁抵抗肿胀，所以体积控制不那么重要，它们用 P 型或呼吸质子泵产生质子动力势，其同向转运蛋白、反向转运蛋白与 ATP 合酶以同样方式花费它——Mitchell 的化学渗透原则在两个界中都适用。
:::
:::
