[[electrochemistry/cell-thermodynamics]]的热力学在零电流下讨论。电池一旦输出电流，电荷就必须穿过电极之间的电解质，而电解质中的载流子不是电子而是离子——沉重、水化、被溶剂分子彼此推挤着。$0.1\ \mathrm{mol\,dm^{-3}}$氯化钾溶液的电导率比铜差约一百万倍，而在每厘米一伏的电场中，离子以每秒几微米的漂移速度穿过它。然而溶液的电导率很容易测到万分之一的精度，从它可以读出：离子的数目、每种离子运动的快慢、它在水中挤行时显得有多大、每种离子载运多大份额的电流，还有——对弱酸——它的解离常数。

本章建立这套工具。我们定义电导与摩尔电导率，介绍科尔劳施（Kohlrausch）关于强电解质的两个经验定律与奥斯特瓦尔德（Ostwald）关于弱电解质的定律，把电导率同离子迁移率与扩散系数联系起来，引入迁移数并用它计算液接电位，最后讨论固体中的离子导电——正是它使固体氧化物燃料电池、钠-硫电池与固态锂电池成为可能。极限离子电导率数据取自CRC《化学与物理手册》（*Handbook of Chemistry and Physics*），$25\,^\circ\mathrm{C}$。

## 电导与电导率

欧姆定律$V = IR$对电解质溶液很好地成立，只要测量不改变溶液本身。直流电会使溶液电解并使电极极化，所以电导测量在镀铂黑的铂电极之间用交流电压（通常$1$–$10\ \mathrm{kHz}$）进行，镀铂层的大表面积使双电层阻抗（[[electrochemistry/double-layer]]）可以忽略。

::: definition 电导与摩尔电导率 {#def-conductivity}
样品的**电导**$G = 1/R$，单位西门子（$1\ \mathrm{S} = 1\ \Omega^{-1}$）。对长度为$l$、横截面积为$A$的均匀导体，$G = \kappa A/l$，由此定义**电导率**$\kappa$（IUPAC符号亦作$\sigma$），单位$\mathrm{S\,m^{-1}}$。实际电导池中几何形状由**电导池常数**$C_\mathrm{cell} = l/A$概括，用标准溶液标定得到，于是$\kappa = C_\mathrm{cell}/R$。电解质在物质的量浓度$c$下的**摩尔电导率**为
$$
\Lambda_\mathrm{m} = \frac{\kappa}{c},
$$ {#eq-lambda}
单位$\mathrm{S\,m^2\,mol^{-1}}$，$c$以$\mathrm{mol\,m^{-3}}$计。它是单位浓度电解质的电导率；若离子各自独立运动、电解质完全解离，它与$c$无关。
:::

标定的标准是氯化钾水溶液：$25\,^\circ\mathrm{C}$下$0.0100\ \mathrm{mol\,dm^{-3}}$ KCl的$\kappa = 0.1412\ \mathrm{S\,m^{-1}}$（$1412\ \mu\mathrm{S\,cm^{-1}}$）。相比之下纯水$\kappa = 5.5\ \mu\mathrm{S\,m^{-1}}$，来自其$10^{-7}\ \mathrm{mol\,dm^{-3}}$的$\mathrm{H^+}$与$\mathrm{OH^-}$；因此读一个$\kappa$值就是实验室与电站中检验水纯度的标准快检。

::: example 标定电导池 {#ex-cell-constant}
某电导池装入$25\,^\circ\mathrm{C}$的$0.0100\ \mathrm{mol\,dm^{-3}}$ KCl时电阻为$452\ \Omega$。改装$0.0100\ \mathrm{mol\,dm^{-3}}$乙酸时为$3.92\ \mathrm{k\Omega}$。求电导池常数，以及该酸液的电导率与摩尔电导率。
::: solution
$C_\mathrm{cell} = \kappa R = 0.1412\ \mathrm{S\,m^{-1}}\times452\ \Omega = 63.8\ \mathrm{m^{-1}}$。对酸液，$\kappa = C_\mathrm{cell}/R = 63.8\ \mathrm{m^{-1}}/3920\ \Omega = 0.0163\ \mathrm{S\,m^{-1}}$。由$c = 0.0100\ \mathrm{mol\,dm^{-3}} = 10.0\ \mathrm{mol\,m^{-3}}$，
$$
\Lambda_\mathrm{m} = \frac{0.0163\ \mathrm{S\,m^{-1}}}{10.0\ \mathrm{mol\,m^{-3}}} = 1.63\times10^{-3}\ \mathrm{S\,m^2\,mol^{-1}} = 1.63\ \mathrm{mS\,m^2\,mol^{-1}} .
$$
作为对比，$0.0100\ \mathrm{mol\,dm^{-3}}$ KCl的$\Lambda_\mathrm{m} = 0.1412/10.0 = 14.1\ \mathrm{mS\,m^2\,mol^{-1}}$。同样每摩尔溶质，乙酸的导电差九倍：它大部分没有电离。（旧表用$\mathrm{S\,cm^2\,mol^{-1}}$；$1\ \mathrm{mS\,m^2\,mol^{-1}} = 10\ \mathrm{S\,cm^2\,mol^{-1}}$。）
:::
:::

::: warning $\Lambda_\mathrm{m} = \kappa/c$中的浓度单位 {#warn-units}
$\kappa$以$\mathrm{S\,m^{-1}}$计时，$c$必须以$\mathrm{mol\,m^{-3}}$计，且$1\ \mathrm{mol\,dm^{-3}} = 1000\ \mathrm{mol\,m^{-3}}$。用$\mathrm{mol\,dm^{-3}}$作$c$的单位会得到一千倍过大的摩尔电导率——KCl将是"14 S m² mol⁻¹"，那比许多金属的电导率还好。第二个陷阱是电解质的"化学式单元"：表中有时列$\Lambda_\mathrm{m}(\tfrac{1}{2}\mathrm{CaCl_2})$或$\lambda(\tfrac{1}{2}\mathrm{Ca^{2+}})$，按每摩尔*电荷*而非每摩尔$\mathrm{CaCl_2}$计；两者相差因子2。务必检查"摩尔"数的是什么单元。
:::

## 强电解质：科尔劳施定律

1870年代，科尔劳施用交流电测定了数百种盐溶液的电导率，发现两条规律。两者都是经验定律；第二条在半个世纪后才由理论解释。

::: proposition 科尔劳施定律 {#prop-kohlrausch}
(1) **平方根定律。**低浓度下（$1{:}1$型盐约$0.01\ \mathrm{mol\,dm^{-3}}$以下）的强电解质，
$$
\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ - \mathcal{K}\sqrt{c},
$$ {#eq-sqrt}
其中$\Lambda_\mathrm{m}^\circ$是**极限摩尔电导率**，$\mathcal{K}$主要取决于电解质的离子价型。

(2) **离子独立迁移定律。**在无限稀释下，每种离子贡献一个固定份额$\lambda_i$——它的**极限摩尔离子电导率**——与反离子无关：
$$
\Lambda_\mathrm{m}^\circ = \nu_+\lambda_+ + \nu_-\lambda_- .
$$ {#eq-independent}
:::

::: proof
两条定律都由实验发现，所以能证明的是它们的自洽，以及对(1)而言其背后的理论。对(2)：无限稀释时离子相距很远，各自只在外加电场与溶剂摩擦下运动，每种离子所载的电流正比于它自己的浓度与迁移率，贡献相加。自洽性因此可检验：差值$\Lambda_\mathrm{m}^\circ(\mathrm{KCl}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaCl})$与$\Lambda_\mathrm{m}^\circ(\mathrm{KNO_3}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaNO_3})$必须相等（都等于$\lambda_{\mathrm{K^+}} - \lambda_{\mathrm{Na^+}} = 2.34\ \mathrm{mS\,m^2\,mol^{-1}}$），科尔劳施对许多盐对都作了验证。

对(1)，德拜（Debye）、休克尔（Hückel）与昂萨格（Onsager）（1923–1927）证明，[[thermodynamics/ions-in-solution]]中的离子氛从两个方面拖慢离子。*弛豫效应*：运动中的离子把离子氛略微甩在身后，错位的反号电荷把它往后拉。*电泳效应*：离子氛带反号电荷，被电场推向反方向并拖着溶剂走，于是中心离子逆着一股流泅行。两个修正项都正比于德拜长度的倒数，因而正比于$\sqrt{I}$，对单一盐类因而正比于$\sqrt{c}$。对$25\,^\circ\mathrm{C}$水中的$1{:}1$电解质，结果是
$$
\mathcal{K} = A + B\Lambda_\mathrm{m}^\circ, \qquad A = 6.020\ \mathrm{mS\,m^2\,mol^{-1}}\,(\mathrm{mol\,dm^{-3}})^{-1/2}, \quad B = 0.229\ (\mathrm{mol\,dm^{-3}})^{-1/2},
$$
电泳项$A$与弛豫项$B\Lambda_\mathrm{m}^\circ$（后者正比于$\Lambda_\mathrm{m}^\circ$，因为离子自身的速度决定了它的离子氛的形变）。与德拜-休克尔极限公式一样，这个德拜-休克尔-昂萨格方程在$c \rightarrow 0$时严格成立，在中等浓度下失效。
:::

| 离子 | $\lambda/(\mathrm{mS\,m^2\,mol^{-1}})$ | 离子 | $\lambda/(\mathrm{mS\,m^2\,mol^{-1}})$ |
|---|---|---|---|
| $\mathrm{H^+}$ | $34.96$ | $\mathrm{OH^-}$ | $19.8$ |
| $\mathrm{Li^+}$ | $3.87$ | $\mathrm{Cl^-}$ | $7.63$ |
| $\mathrm{Na^+}$ | $5.01$ | $\mathrm{NO_3^-}$ | $7.14$ |
| $\mathrm{K^+}$ | $7.35$ | $\mathrm{CH_3CO_2^-}$ | $4.09$ |
| $\mathrm{Ag^+}$ | $6.19$ | $\mathrm{SO_4^{2-}}$ | $16.0$ |
| $\mathrm{Ca^{2+}}$ | $11.9$ | $\mathrm{Mg^{2+}}$ | $10.6$ |

*水在$25\,^\circ\mathrm{C}$下的极限摩尔离子电导率（CRC手册；数值以每摩尔离子计，故$\lambda(\mathrm{Ca^{2+}}) = 2\lambda(\tfrac{1}{2}\mathrm{Ca^{2+}})$）。*

这张表值得再看一眼。最小的碱金属阳离子锂却*最慢*；而$\mathrm{H^+}$与$\mathrm{OH^-}$快得反常，分别是其他离子的5倍与3倍。在把$\lambda$同离子速度联系起来之后，我们再回来谈这两点。

对KCl，昂萨格理论预测$\mathcal{K} = 6.020 + 0.229\times14.98 = 9.45\ \mathrm{mS\,m^2\,mol^{-1}}(\mathrm{mol\,dm^{-3}})^{-1/2}$，故$c = 0.0010\ \mathrm{mol\,dm^{-3}}$时$\Lambda_\mathrm{m} = 14.98 - 9.45\times0.0316 = 14.68\ \mathrm{mS\,m^2\,mol^{-1}}$；实测值为$14.70$。

## 弱电解质：奥斯特瓦尔德稀释定律

乙酸这样的弱酸表现得完全不同：稀释时摩尔电导率陡升，不是因为离子跑得更快，而是因为更多酸电离了。若电离分数为$\alpha$，只有离子导电，而在所涉的低离子浓度下它们几乎像在无限稀释时那样运动，所以$\Lambda_\mathrm{m} \approx \alpha\Lambda_\mathrm{m}^\circ$——阿伦尼乌斯（Arrhenius）1887年的假设，他的整个离子解离理论就建立在此之上。

::: proposition 奥斯特瓦尔德稀释定律 {#prop-ostwald}
浓度为$c$的弱$1{:}1$电解质$\mathrm{HA \rightleftharpoons H^+ + A^-}$，电离度$\alpha = \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ$、活度系数取一，则
$$
K_\mathrm{a} = \frac{c\,\alpha^{2}}{c^\circ(1-\alpha)}, \qquad\text{等价地}\qquad \frac{1}{\Lambda_\mathrm{m}} = \frac{1}{\Lambda_\mathrm{m}^\circ} + \frac{c\,\Lambda_\mathrm{m}}{c^\circ K_\mathrm{a}(\Lambda_\mathrm{m}^\circ)^{2}} .
$$ {#eq-ostwald}
$1/\Lambda_\mathrm{m}$对$c\Lambda_\mathrm{m}$作图是一条直线，截距$1/\Lambda_\mathrm{m}^\circ$，斜率$1/(c^\circ K_\mathrm{a}\Lambda_\mathrm{m}^{\circ2})$。
:::

::: proof
平衡时$[\mathrm{H^+}] = [\mathrm{A^-}] = \alpha c$、$[\mathrm{HA}] = (1-\alpha)c$，故$K_\mathrm{a} = (\alpha c)^2/[(1-\alpha)c\,c^\circ] = c\alpha^2/[c^\circ(1-\alpha)]$。代入$\alpha = \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ$并展开：$c^\circ K_\mathrm{a}(1 - \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ) = c\Lambda_\mathrm{m}^2/\Lambda_\mathrm{m}^{\circ2}$。两边除以$c^\circ K_\mathrm{a}\Lambda_\mathrm{m}$：$1/\Lambda_\mathrm{m} - 1/\Lambda_\mathrm{m}^\circ = c\Lambda_\mathrm{m}/(c^\circ K_\mathrm{a}\Lambda_\mathrm{m}^{\circ2})$，整理即得线性形式。两个近似是：离子以其极限速度运动（$\alpha c$很小时成立），以及活度系数为一（$\alpha c \approx 10^{-3}\ \mathrm{mol\,dm^{-3}}$以下误差在百分之几；精确工作对两者都作校正）。
:::

弱酸的$\Lambda_\mathrm{m}^\circ$无法用外推得到，因为曲线朝$c = 0$越来越陡。科尔劳施第二定律用强电解质把它送上门来：$\Lambda_\mathrm{m}^\circ(\mathrm{CH_3CO_2H}) = \Lambda_\mathrm{m}^\circ(\mathrm{HCl}) + \Lambda_\mathrm{m}^\circ(\mathrm{CH_3CO_2Na}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaCl}) = \lambda_{\mathrm{H^+}} + \lambda_{\mathrm{CH_3CO_2^-}} = 39.05\ \mathrm{mS\,m^2\,mol^{-1}}$。

::: example 乙酸的解离常数 {#ex-acetic}
用[[#ex-cell-constant]]求得的摩尔电导率——$c = 0.0100\ \mathrm{mol\,dm^{-3}}$时$\Lambda_\mathrm{m} = 1.63\ \mathrm{mS\,m^2\,mol^{-1}}$——估算$\alpha$、$K_\mathrm{a}$与pH。
::: solution
$\alpha = 1.63/39.05 = 0.0417$。于是
$$
K_\mathrm{a} = \frac{0.0100\times(0.0417)^{2}}{1 - 0.0417} = 1.82\times10^{-5}, \qquad [\mathrm{H^+}] = \alpha c = 4.17\times10^{-4}\ \mathrm{mol\,dm^{-3}}, \quad \mathrm{pH} \approx 3.38 .
$$
热力学值为$K_\mathrm{a} = 1.75\times10^{-5}$（$\mathrm{p}K_\mathrm{a} = 4.756$）。$4\,\%$的超出主要来自忽略的活度系数：离子强度为$4\times10^{-4}$时$\gamma_\pm^2 \approx 0.95$，乘上它可把估计值拉回$1.73\times10^{-5}$。MacInnes与Shedlovsky 1932年对乙酸的电导研究把两项修正都做了，得到$K_\mathrm{a} = 1.753\times10^{-5}$，是溶液化学的经典精密结果之一。
:::
:::

::: widget plot
f: 149.8 - 94.5*x; L0*(-K*1e-5 + sqrt(K^2*1e-10 + 4*K*1e-5*x^2))/(2*x^2)
x: 0.005, 0.32
y: 0, 400
sliders: K=1.75:0.1:20:0.05; L0=390.5:100:450:0.5
labels: \mathrm{KCl}\ (\text{强电解质}); \text{弱酸 HA}
caption: 摩尔电导率$\Lambda_\mathrm{m}$，单位$\mathrm{S\,cm^2\,mol^{-1}}$（乘$0.1$化为$\mathrm{mS\,m^2\,mol^{-1}}$），对$\sqrt{c}$作图，$c$以$\mathrm{mol\,dm^{-3}}$计。强电解质服从科尔劳施直线[[#eq-sqrt]]（这里是KCl的昂萨格斜率）。弱酸服从奥斯特瓦尔德定律[[#eq-ostwald]]，$K$是以$10^{-5}$为单位的酸常数，$L_0$是其极限摩尔电导率（默认乙酸）：浓度一升高它的电导便告坍塌，只有在外推中才回升到$\Lambda_\mathrm{m}^\circ$附近。调大$K$，弱酸就越来越像强酸。
:::

## 离子迁移率与运动离子的大小

::: definition 离子迁移率 {#def-mobility}
在场强为$\mathcal{E}$的电场中，离子在几皮秒内达到恒定的**漂移速度**$s$，此时电力$z e\mathcal{E}$与黏性摩擦平衡。**迁移率**为$u = s/\mathcal{E}$，单位$\mathrm{m^2\,V^{-1}\,s^{-1}}$。若摩擦服从半径为流体力学半径$a$的球在黏度为$\eta$的溶剂中的斯托克斯（Stokes）定律，则$ze\mathcal{E} = 6\pi\eta a s$，于是
$$
u = \frac{ze}{6\pi\eta a} .
$$ {#eq-stokes}
:::

::: proposition 摩尔离子电导率、迁移率与扩散 {#prop-mobility}
对电荷数为$z$（此处取正，一般用$|z|$）、迁移率为$u$的离子，
$$
\lambda = zuF ,
$$ {#eq-lambda-u}
其扩散系数$D$满足**能斯特-爱因斯坦关系**
$$
D = \frac{uRT}{zF}, \qquad\text{从而}\qquad \lambda = \frac{z^{2}F^{2}D}{RT} .
$$ {#eq-nernst-einstein}
两者都在离子独立运动的无限稀释极限下成立。
:::

::: proof
**电导。**考虑浓度为$c_i$（以$\mathrm{mol\,m^{-3}}$计）、以速度$s_i = u_i\mathcal{E}$漂移的离子。在时间$\Delta t$内，距面积$A$的平面$s_i\Delta t$之内的离子都穿过该平面，载运电荷$z_iF\,c_i\,s_i\Delta t\,A$。物种$i$的电流通量密度$j_i = z_iFc_iu_i\mathcal{E}$，由欧姆定律$j = \kappa\mathcal{E}$得$\kappa = \sum_i z_iFc_iu_i$。对浓度为$c$的盐，$c_\pm = \nu_\pm c$，故$\Lambda_\mathrm{m} = \kappa/c = \nu_+z_+u_+F + \nu_-|z_-|u_-F$；与[[#eq-independent]]比较可知$\lambda_i = |z_i|u_iF$。

**扩散。**设想一个处于电势$\phi(x)$中的离子达到平衡。平衡意味着电化学势$\mu + zF\phi$处处相等（[[electrochemistry/cell-thermodynamics#def-echem-potential]]），于是由$\mu = \mu^\circ + RT\ln c$，浓度服从玻尔兹曼（Boltzmann）分布$c \propto \exp(-zF\phi/RT)$，且$\mathrm{d}c/\mathrm{d}x = -(zF/RT)c\,\mathrm{d}\phi/\mathrm{d}x = (zF/RT)c\mathcal{E}$。电场驱动$+x$方向的漂移通量$J_\mathrm{drift} = c\,u\mathcal{E}$，浓度梯度产生扩散通量$J_\mathrm{diff} = -D\,\mathrm{d}c/\mathrm{d}x = -D(zF/RT)c\mathcal{E}$（菲克第一定律）。平衡时净通量为零，故$u = DzF/RT$。代入$\lambda = zuF$得第二个形式。这就是爱因斯坦（Einstein）1905年的论证：限制漂移的那个摩擦同样限制扩散。
:::

::: example 钠离子有多快、多大？ {#ex-mobility}
由$\lambda(\mathrm{Na^+}) = 5.01\ \mathrm{mS\,m^2\,mol^{-1}}$，求$\mathrm{Na^+}$在$25\,^\circ\mathrm{C}$水中的迁移率、在$100\ \mathrm{V\,m^{-1}}$场中的漂移速度、流体力学半径（$\eta = 0.890\ \mathrm{mPa\,s}$）与扩散系数。
::: solution
$$
u = \frac{\lambda}{zF} = \frac{5.01\times10^{-3}\ \mathrm{S\,m^2\,mol^{-1}}}{96\,485\ \mathrm{C\,mol^{-1}}} = 5.19\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}
$$
（用到$\mathrm{S} = \mathrm{A\,V^{-1}} = \mathrm{C\,s^{-1}\,V^{-1}}$）。在$100\ \mathrm{V\,m^{-1}}$（每厘米一伏）中它将以$s = 5.19\ \mu\mathrm{m\,s^{-1}}$漂移——约每小时$2\ \mathrm{cm}$。由[[#eq-stokes]]，
$$
a = \frac{e}{6\pi\eta u} = \frac{1.602\times10^{-19}\ \mathrm{C}}{6\pi\times8.90\times10^{-4}\ \mathrm{Pa\,s}\times5.19\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}} = 1.84\times10^{-10}\ \mathrm{m} = 184\ \mathrm{pm} .
$$
$\mathrm{Na^+}$在晶体中的离子半径是$102\ \mathrm{pm}$；运动中的实体更大，因为它带着自己的第一水化层一起走。最后，$D = uRT/F = 5.19\times10^{-8}\times0.025693\ \mathrm{m^2\,s^{-1}} = 1.33\times10^{-9}\ \mathrm{m^2\,s^{-1}}$，与示踪扩散测量结果（$1.334\times10^{-9}$）一致。
:::
:::

对$\mathrm{Li^+}$作同样的计算得$a = 238\ \mathrm{pm}$，而其晶体半径只有$76\ \mathrm{pm}$：裸离子越小，电场越强，水化壳结合得越紧、也越大。把斯托克斯定律用于$\mathrm{H^+}$会得到荒谬的$26\ \mathrm{pm}$。质子根本不像一个粒子那样运动。在**格罗特斯（Grotthuss）机制**中，质子从$\mathrm{H_3O^+}$离子沿氢键跳到相邻的水分子上，正电荷——虽然没有哪个质子与单个分子同行——随氢键网络的重排而在水中快速移动，决速步是第二溶剂化层中水分子的重新取向。$\mathrm{OH^-}$按镜像过程运动：质子从水分子跳*到*它身上。这种结构扩散就是酸和碱导电如此之好的原因，也是燃料电池中质子交换膜必须保水（[[electrochemistry/fuel-cells-electrolysis]]）的原因。

## 迁移数

::: definition 迁移数 {#def-transport}
离子的**迁移数**$t_i$是它载运的电流占总电流的份额。对无限稀释的单一电解质，
$$
t_\pm = \frac{\nu_\pm\lambda_\pm}{\Lambda_\mathrm{m}^\circ} = \frac{\nu_\pm|z_\pm|u_\pm}{\nu_+z_+u_+ + \nu_-|z_-|u_-}, \qquad t_+ + t_- = 1 .
$$
:::

对KCl，$t_+ = 7.35/14.98 = 0.491$：钾离子与氯离子几乎均分电流。对HCl，$t_+ = 34.96/42.59 = 0.821$。迁移数可用希托夫（Hittorf）法直接测定——电解，然后分析各电极附近隔室组成的变化，它之所以不同，是因为每种离子只载运自己那份电流；也可用界面移动法，给共用一种离子的两种电解质之间清晰界面的漂移计时。无论哪种方法，结合$\Lambda_\mathrm{m}$都能给出单个离子的电导率——上面的表就是这样建起来的。

希托夫法的账值得算一次，因为同样的账在电池的浓差极化中还会出现。取硝酸银溶液中的银电极，通过一法拉第电量。阳极有一摩尔银溶解为$\mathrm{Ag^+}$；阴极沉积一摩尔。溶液中的电流由$t_+$ mol朝阴极移动的$\mathrm{Ag^+}$与$t_-$ mol朝阳极移动的$\mathrm{NO_3^-}$载运。阳极隔室因此得到$1 - t_+ = t_-$ mol的$\mathrm{Ag^+}$与$t_-$ mol的$\mathrm{NO_3^-}$——即净得$t_-$ mol盐——阴极隔室则失去同样多。中间隔室不变，这正是没有发生混合的实验检验。

::: example 希托夫法测迁移数 {#ex-hittorf}
带银电极的希托夫电解池盛有硝酸银水溶液。串联的银库仑计显示沉积了$108.0\ \mathrm{mg}$银。事后分析表明阳极隔室增加了$0.536\ \mathrm{mmol}$的$\mathrm{AgNO_3}$。求$t_+$与$t_-$，并与由极限离子电导率得到的值比较。
::: solution
通过的电量：$108.0\ \mathrm{mg}/107.87\ \mathrm{g\,mol^{-1}} = 1.001\ \mathrm{mmol}$电子。阳极隔室盐的增量是电量的$t_-$倍，故$t_- = 0.536/1.001 = 0.535$，$t_+ = 0.465$。由表，$t_+ = 6.19/(6.19 + 7.14) = 0.464$。二者相符得好，因为对离子迁移率相近的$1{:}1$型盐，迁移数随浓度变化很慢。注意这个实验需要什么：一个数法拉第的库仑计，以及精确到能在一个盛几毫摩尔溶液的隔室里看出半毫摩尔变化的分析——这就是希托夫的数字花了多年才拿到的原因。
:::
:::

迁移数决定了两种不同电解质溶液相接处出现的电势。

::: proposition $1{:}1$型电解质的液接电位 {#prop-junction}
同一种$1{:}1$电解质、平均活度分别为$a_\mathrm{L}$（左）与$a_\mathrm{R}$（右）的两溶液之间的液接，取迁移数在液接区内恒定，则
$$
E_\mathrm{j} = \phi_\mathrm{R} - \phi_\mathrm{L} = (t_+ - t_-)\frac{RT}{F}\ln\frac{a_\mathrm{L}}{a_\mathrm{R}} .
$$ {#eq-junction}
:::

::: proof
可逆地通过一法拉第正电荷，从左到右穿过液接。其中份额$t_+$由$t_+$ mol从L移向R的阳离子载运，$t_-$由$t_-$ mol从R移向L的阴离子载运。这一转移的吉布斯能变化为
$$
\Delta G = t_+RT\ln\frac{a_\mathrm{R}}{a_\mathrm{L}} + t_-RT\ln\frac{a_\mathrm{L}}{a_\mathrm{R}} = (t_+ - t_-)RT\ln\frac{a_\mathrm{R}}{a_\mathrm{L}},
$$
其中单离子活度取为平均活度（要给液接电位一个确定的值就需要这一约定）。把电荷$F$从电势$\phi_\mathrm{L}$移到$\phi_\mathrm{R}$的电学吉布斯能为$F(\phi_\mathrm{R} - \phi_\mathrm{L}) = FE_\mathrm{j}$。液接处于稳态而非真正的平衡，但把转移当作可逆处理（小通量下非平衡热力学的假定）使总和为零：$FE_\mathrm{j} + \Delta G = 0$，整理即得[[#eq-junction]]。
:::

::: example 酸与盐的液接电位 {#ex-junction}
估计$25\,^\circ\mathrm{C}$下(a) $0.100\ \mathrm{mol\,dm^{-3}}$ HCl与$0.0100\ \mathrm{mol\,dm^{-3}}$ HCl相接触、(b) KCl取相同浓度时的$E_\mathrm{j}$。活度用浓度代替。
::: solution
(a) $t_+ = 0.821$，$t_- = 0.179$，$t_+ - t_- = 0.642$：
$$
E_\mathrm{j} = 0.642\times0.025693\ \mathrm{V}\times\ln 10 = 0.642\times59.16\ \mathrm{mV} = 38.0\ \mathrm{mV},
$$
稀的一侧为正，因为快的质子跑在氯离子前面进入稀溶液。（用平均活度$0.0796$与$0.00904$则估计值变为$35.9\ \mathrm{mV}$。）(b) $t_+ - t_- = 0.491 - 0.509 = -0.019$，故$E_\mathrm{j} = -0.019\times59.16\ \mathrm{mV} = -1.1\ \mathrm{mV}$。小了三十五倍：这就是氯化钾盐桥的理由。在两个稀溶液之间架一座饱和KCl（$4.2\ \mathrm{mol\,dm^{-3}}$）盐桥，每个液接的电流几乎全由K⁺与Cl⁻载运，而它们的迁移数几乎相等，两个液接电位都很小——典型为$1$–$3\ \mathrm{mV}$，这一残余项限制了每一次pH测量的准确度（[[analytical-chemistry/electroanalytical]]）。
:::
:::

::: quiz
$0.010\ \mathrm{mol\,dm^{-3}}$、$25\,^\circ\mathrm{C}$的下列溶液，电导率最高的是哪一个？
- [ ] $\mathrm{KCl}$
- [ ] $\mathrm{NaCH_3CO_2}$
- [x] $\mathrm{HCl}$
- [ ] $\mathrm{CH_3CO_2H}$
::: solution
除乙酸外都是强电解质，其电导率都接近$c\Lambda_\mathrm{m}^\circ$：分别约为$42.6$（HCl）、$15.0$（KCl）与$9.1$（乙酸钠）$\mathrm{mS\,m^2\,mol^{-1}}$乘以$c$。$\mathrm{H^+}$的格罗特斯导电使HCl几乎是KCl的三倍。乙酸虽含同样的快质子，却只有$4\,\%$电离，是四者中最差的。
:::
:::

**电导滴定**利用的就是这些反差。用NaOH滴定HCl，随着快的$\mathrm{H^+}$被慢的$\mathrm{Na^+}$取代，电导陡降，在化学计量点达到极小，随后过量的$\mathrm{OH^-}$出现又使它上升；终点是两条直线的交点，不需要指示剂，对有色或极稀的溶液很有用。

## 固体中的离子导电

固体也能导离子，有些甚至与液体电解质相当。在离子晶体中，离子靠越过能垒跳入邻近的空位或间隙位置而运动，所以电导率是热激活的。

::: definition 固体电解质及其激活电导率 {#def-solid}
**固体电解质**（快离子导体）是一种一种离子可动而电子不可动的固体，工作温度下离子电导率通常高于$10^{-2}\ \mathrm{S\,m^{-1}}$。其电导率常服从经验公式
$$
\kappa T = \kappa_0\exp\!\left(-\frac{E_\mathrm{a}}{RT}\right),
$$ {#eq-solid}
其中$E_\mathrm{a}$是离子跳跃的激活能（本征导体中还加上缺陷形成能的一半），因子$T$来自能斯特-爱因斯坦关系，它使$\kappa \propto D/T$。
:::

技术上重要的例子：

- **氧化钇稳定氧化锆（YSZ）**：$\mathrm{ZrO_2}$掺约$8$ mol % $\mathrm{Y_2O_3}$。每有一对$\mathrm{Y^{3+}}$取代$\mathrm{Zr^{4+}}$就产生一个氧离子空位，$\mathrm{O^{2-}}$借空位跳跃。YSZ在$1000\,^\circ\mathrm{C}$附近达到约$10\ \mathrm{S\,m^{-1}}$，是固体氧化物燃料电池以及汽车排气中氧（"lambda"）传感器的电解质，后者是对$\mathrm{O_2}$的浓差电池。能斯特1897年的电灯——一根掺氧化钇而发亮的氧化锆棒——是第一个用到它的器件。
- **β-氧化铝钠**：$\mathrm{NaAl_{11}O_{17}}$及其非化学计量变体，$\mathrm{Na^+}$在尖晶石块之间排列疏松的平面中运动；其快速的$\mathrm{Na^+}$导电由Yao与Kummer于1967年报道，是工作在$300\,^\circ\mathrm{C}$附近的钠-硫电池的基础。
- **固态电池的锂导体**：石榴石型如$\mathrm{Li_7La_3Zr_2O_{12}}$（室温约$10^{-2}\ \mathrm{S\,m^{-1}}$）与硫化物如$\mathrm{Li_{10}GeP_2S_{12}}$，2011年报道达到$1.2\ \mathrm{S\,m^{-1}}$——可与商用锂离子电池中约$1\ \mathrm{S\,m^{-1}}$的液体电解质相比。
- **质子导电聚合物**：如Nafion，一个带磺酸基的全氟聚合物，水合后在充水通道中以约$10\ \mathrm{S\,m^{-1}}$传导质子。

::: example 氧离子导体的激活能 {#ex-ysz}
某YSZ陶瓷在$1000\,^\circ\mathrm{C}$时$\kappa = 10.0\ \mathrm{S\,m^{-1}}$，$800\,^\circ\mathrm{C}$时$\kappa = 2.56\ \mathrm{S\,m^{-1}}$。由[[#eq-solid]]求$E_\mathrm{a}$。
::: solution
取$T_1 = 1273.15\ \mathrm{K}$与$T_2 = 1073.15\ \mathrm{K}$，对两温度下的[[#eq-solid]]取比值：
$$
\ln\frac{\kappa_1T_1}{\kappa_2T_2} = \frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right), \qquad
E_\mathrm{a} = \frac{8.314\times\ln\dfrac{10.0\times1273.15}{2.56\times1073.15}}{\dfrac{1}{1073.15} - \dfrac{1}{1273.15}}\ \mathrm{J\,mol^{-1}} = \frac{8.314\times1.533}{1.464\times10^{-4}}\ \mathrm{J\,mol^{-1}} = 87\ \mathrm{kJ\,mol^{-1}} ,
$$
即每次跳跃$0.90\ \mathrm{eV}$。每降温$200\ \mathrm{K}$电导率损失四倍，这就是固体氧化物电池要热运行、而研究目标是更薄的电解质与更低能垒材料（如掺杂氧化铈）的原因。忽略因子$T$（把$\ln\kappa$对$1/T$作图）会得$E_\mathrm{a} = 77\ \mathrm{kJ\,mol^{-1}}$：温度范围宽时，作图方式的选择是重要的。
:::
:::

::: widget plot
f: lgA - log(1000/x)/log(10) - Ea*x/(8.314*log(10))
x: 0.7, 3.4
y: -11, 3
sliders: Ea=87:20:150:1; lgA=7.7:5:11:0.1
labels: \log_{10}(\kappa/\mathrm{S\,m^{-1}})
vlines: 3.354
caption: 固体电解质的阿伦尼乌斯图，[[#eq-solid]]：$\log_{10}\kappa$对$1000\,\mathrm{K}/T$（$x$）作图，激活能$E_\mathrm{a}$以$\mathrm{kJ\,mol^{-1}}$计、指前因子$\log_{10}(\kappa_0/\mathrm{S\,m^{-1}\,K})$。默认值近似YSZ（$x = 0.79$即$1000\,^\circ\mathrm{C}$处约$10\ \mathrm{S\,m^{-1}}$）。竖直标线记室温，那里YSZ实际上是绝缘体（按此外推约$10^{-10}\ \mathrm{S\,m^{-1}}$）。室温锂导体要求在该线上$\kappa \gtrsim 10^{-2}\ \mathrm{S\,m^{-1}}$：把$E_\mathrm{a}$降到约$40\ \mathrm{kJ\,mol^{-1}}$，看看跳跃能垒必须多小。
:::

::: history 搬运电流的离子 {#hist-conductivity}
格罗特斯（Theodor von Grotthuss）1806年提出，水的分解是一串分子把氢和氧沿链条传给电极——细节不对，却是以他名字命名的质子跳跃机制的祖先。迈克尔·法拉第（Michael Faraday）与威廉·惠威尔（William Whewell）在1834年创造了*ion*、*anion*、*cation*、*electrode*、*anode*与*cathode*这些词。希托夫（Hittorf）在1853至1859年间测定了迁移数，证明不同离子运动速度不同。科尔劳施用交流电避免极化，在1870年代确立了离子独立迁移定律，到1900年又给出平方根定律。阿伦尼乌斯1884年关于电解质电导的学位论文引出他的离子解离理论（1887），奥斯特瓦尔德稀释定律（1888）则把它变成了定量检验。德拜与休克尔（1923）、昂萨格（1926–1927）用离子氛解释了平方根定律。固体方面，能斯特1897年把掺杂氧化锆用作灯丝，卡尔·瓦格纳（Carl Wagner）在1930–1940年代用点缺陷解释了这类固体中的导电。
:::

## 后续内容

电导率以后每一章都以电阻的身份出场。在工作的电池中，电解质的电阻造成*欧姆降*$IR$，使电池或燃料电池的电压降低、使电解池的电压升高（[[electrochemistry/batteries]]、[[electrochemistry/fuel-cells-electrolysis]]）；在伏安法中它畸变工作电极的电势，这就是要加入大量支持电解质、抑制迁移、让待测物仅靠扩散到达电极的原因（[[electrochemistry/voltammetry]]）。作为昂萨格修正基础的德拜长度，还决定了电极处扩散双电层的厚度（[[electrochemistry/double-layer]]）；环境的电导率控制着腐蚀电流能蔓延多远（[[electrochemistry/corrosion]]）。能斯特-爱因斯坦关系把本章与[[kinetics/rate-laws]]中的扩散、以及伏安法用到的菲克定律联系起来，固体电解质则在[[materials-chemistry]]中再次出现。

::: summary
- 电导率$\kappa = C_\mathrm{cell}/R$用交流电在经标准KCl标定的电导池中测量；摩尔电导率$\Lambda_\mathrm{m} = \kappa/c$，$c$以$\mathrm{mol\,m^{-3}}$计。
- 强电解质服从科尔劳施平方根定律$\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ - \mathcal{K}\sqrt{c}$（由离子氛的弛豫效应与电泳效应解释）与离子独立迁移定律$\Lambda_\mathrm{m}^\circ = \nu_+\lambda_+ + \nu_-\lambda_-$。
- 弱电解质$\Lambda_\mathrm{m} \approx \alpha\Lambda_\mathrm{m}^\circ$；奥斯特瓦尔德稀释定律于是能由电导给出$K_\mathrm{a}$，其中$\Lambda_\mathrm{m}^\circ$来自独立迁移。
- $\lambda = |z|uF$把电导与迁移率联系起来；斯托克斯定律给出的流体力学半径，对小而强水化的离子大于晶体半径；$\mathrm{H^+}$与$\mathrm{OH^-}$借格罗特斯机制以反常的高速运动。
- 能斯特-爱因斯坦关系$D = uRT/|z|F$通过共同的摩擦把迁移率与扩散联系起来。
- 迁移数$t_\pm$给出每种离子载运的电流份额与液接电位$(t_+ - t_-)(RT/F)\ln(a_\mathrm{L}/a_\mathrm{R})$；KCl盐桥之所以有效，是因为$t_+ \approx t_-$。
- 固体电解质（YSZ、β-氧化铝、石榴石型与硫化物锂导体、Nafion）靠激活跳跃导电，$\kappa T = \kappa_0\mathrm{e}^{-E_\mathrm{a}/RT}$。
:::

## 习题

::: exercise 一次电导率测量 {level=1 check="0.0530"}
某电导池用$0.0100\ \mathrm{mol\,dm^{-3}}$ KCl（$\kappa = 0.1412\ \mathrm{S\,m^{-1}}$）标定时显示$452\ \Omega$。装入一份河水样品后显示$1205\ \Omega$。求河水的电导率。（$\kappa$以$\mathrm{S\,m^{-1}}$为单位填写。）
::: solution
$C_\mathrm{cell} = 0.1412\times452 = 63.8\ \mathrm{m^{-1}}$，故$\kappa = 63.8/1205 = 0.0530\ \mathrm{S\,m^{-1}}$（$530\ \mu\mathrm{S\,cm^{-1}}$），是硬水河流的典型值。由于只用到电阻之比，可直接$\kappa = 0.1412\times452/1205$。
:::
:::

::: exercise 独立迁移 {level=1 check="12.15"}
$25\,^\circ\mathrm{C}$下$\Lambda_\mathrm{m}^\circ$：NaCl为$12.64$，$\mathrm{KNO_3}$为$14.49$，KCl为$14.98\ \mathrm{mS\,m^2\,mol^{-1}}$。不使用单个离子数值求$\Lambda_\mathrm{m}^\circ(\mathrm{NaNO_3})$。（以$\mathrm{mS\,m^2\,mol^{-1}}$为单位填写。）
::: solution
$\Lambda^\circ(\mathrm{NaNO_3}) = \Lambda^\circ(\mathrm{NaCl}) + \Lambda^\circ(\mathrm{KNO_3}) - \Lambda^\circ(\mathrm{KCl}) = 12.64 + 14.49 - 14.98 = 12.15\ \mathrm{mS\,m^2\,mol^{-1}}$：$\mathrm{K^+}$与$\mathrm{Cl^-}$的贡献相消。表中给出$5.01 + 7.14 = 12.15$。
:::
:::

::: exercise 钾的迁移率 {level=1 check="7.62"}
由$\lambda(\mathrm{K^+}) = 7.35\ \mathrm{mS\,m^2\,mol^{-1}}$，求$\mathrm{K^+}$在$25\,^\circ\mathrm{C}$水中的迁移率与$100\ \mathrm{V\,m^{-1}}$场中的漂移速度。（$u$以$10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}$为单位填写。）
::: solution
$u = \lambda/F = 7.35\times10^{-3}/96\,485 = 7.62\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}$，且$s = u\mathcal{E} = 7.62\ \mu\mathrm{m\,s^{-1}}$。因为$\mathrm{K^+}$与$\mathrm{Cl^-}$（$7.91\times10^{-8}$）迁移率几乎相等，KCl是标准的盐桥电解质。
:::
:::

::: exercise 由电导率求溶解度 {level=2 check="1.32"}
$25\,^\circ\mathrm{C}$下AgCl饱和溶液的$\kappa = 1.89\times10^{-4}\ \mathrm{S\,m^{-1}}$；所用纯水的$\kappa = 0.06\times10^{-4}\ \mathrm{S\,m^{-1}}$。求AgCl的溶解度与溶度积。（溶解度以$10^{-5}\ \mathrm{mol\,dm^{-3}}$为单位填写。）
::: solution
盐的贡献是$\kappa = 1.83\times10^{-4}\ \mathrm{S\,m^{-1}}$。溶液极稀，$\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ = \lambda(\mathrm{Ag^+}) + \lambda(\mathrm{Cl^-}) = 6.19 + 7.63 = 13.82\ \mathrm{mS\,m^2\,mol^{-1}}$。于是$s = \kappa/\Lambda_\mathrm{m}^\circ = 1.83\times10^{-4}/1.382\times10^{-2} = 1.32\times10^{-2}\ \mathrm{mol\,m^{-3}} = 1.32\times10^{-5}\ \mathrm{mol\,dm^{-3}}$，$K_\mathrm{sp} = s^2 = 1.75\times10^{-10}$。电导法是测量那些小到重量法无法测定的溶解度的经典方法；对水本身电导率的修正必不可少，因为这里它占总量的$3\,\%$。
:::
:::

::: exercise 较低浓度的乙酸 {level=2 check="1.78"}
$25\,^\circ\mathrm{C}$下$c = 1.00\times10^{-3}\ \mathrm{mol\,dm^{-3}}$的乙酸$\Lambda_\mathrm{m} = 4.87\ \mathrm{mS\,m^2\,mol^{-1}}$。由奥斯特瓦尔德定律求$\alpha$与$K_\mathrm{a}$，取$\Lambda_\mathrm{m}^\circ = 39.05\ \mathrm{mS\,m^2\,mol^{-1}}$。（$K_\mathrm{a}$以$10^{-5}$为单位填写。）
::: solution
$\alpha = 4.87/39.05 = 0.1247$，是$0.0100\ \mathrm{mol\,dm^{-3}}$时的三倍，正符合稀释定律的要求。$K_\mathrm{a} = 1.00\times10^{-3}\times0.1247^2/(1 - 0.1247) = 1.78\times10^{-5}$。两个不同浓度的测量给出相差$2\,\%$以内的同一个$K_\mathrm{a}$，这正是奥斯特瓦尔德用来证明平衡图像正确的证据。
:::
:::

::: exercise 盐酸中的液接 {level=2 check="38.0"}
用极限离子电导率估计$25\,^\circ\mathrm{C}$下$0.100$与$0.0100\ \mathrm{mol\,dm^{-3}}$ HCl之间的液接电位（活度用浓度代替），并指出哪一侧为正。（$|E_\mathrm{j}|$以mV为单位填写。）
::: solution
$t_+ = 34.96/(34.96 + 7.63) = 0.821$，故$t_+ - t_- = 0.642$，$|E_\mathrm{j}| = 0.642\times59.16\ \mathrm{mV} = 38.0\ \mathrm{mV}$，稀侧为正：质子跑在氯离子前面扩散进去。真实值要略低，因为迁移数与活度系数在液接两侧都在变化，但这样大的液接会毁掉任何热力学测量——所以要避免液接的电池，或者盐桥。
:::
:::

::: exercise 水化锂离子 {level=3 check="238"}
由[[#eq-stokes]]与[[#eq-lambda-u]]证明斯托克斯半径为$a = z^2eF/(6\pi\eta\lambda)$，并对$\mathrm{Li^+}$（$\lambda = 3.87\ \mathrm{mS\,m^2\,mol^{-1}}$，$\eta = 0.890\ \mathrm{mPa\,s}$）计算之。然后解释为什么晶体中最小的碱金属离子$\mathrm{Li^+}$在水中反而最慢。（$a$以pm为单位填写。）
::: hint
单价离子$u = \lambda/F$，且$u = e/(6\pi\eta a)$。
:::
::: solution
把$u = \lambda/(zF)$与$u = ze/(6\pi\eta a)$联立得$a = z^2eF/(6\pi\eta\lambda)$；$z = 1$时
$$
a = \frac{1.602\times10^{-19}\times96\,485}{6\pi\times8.90\times10^{-4}\times3.87\times10^{-3}}\ \mathrm{m} = 2.38\times10^{-10}\ \mathrm{m} = 238\ \mathrm{pm}.
$$
晶体半径为$76\ \mathrm{pm}$。小离子表面电荷密度高，束缚着一层又大又牢的水化层（第一层有4到6个水分子，第二层受强烈扰动），被拖过溶剂的是这一整个集团。迁移率的顺序$\mathrm{Li^+} < \mathrm{Na^+} < \mathrm{K^+}$与晶体半径的顺序恰好相反。（在这个尺度上斯托克斯定律本身只是近似——溶剂对$0.2\ \mathrm{nm}$的球不是连续介质——所以这个半径最好当作比较意义上的"有效尺寸"来读。）
:::
:::

::: exercise 能斯特-爱因斯坦关系 {level=3 check="2.03"}
由平衡时漂移与扩散通量相抵的条件推导$\lambda = z^2F^2D/RT$，并用它由$\lambda = 7.63\ \mathrm{mS\,m^2\,mol^{-1}}$求$25\,^\circ\mathrm{C}$下$\mathrm{Cl^-}$的扩散系数。（$D$以$10^{-9}\ \mathrm{m^2\,s^{-1}}$为单位填写。）
::: solution
在电势$\phi(x)$中达到平衡时，电化学势均匀给出$c \propto \exp(-zF\phi/RT)$，于是$\mathrm{d}c/\mathrm{d}x = (zF/RT)c\mathcal{E}$，其中$\mathcal{E} = -\mathrm{d}\phi/\mathrm{d}x$。漂移通量$c\,u\mathcal{E}\,\mathrm{sgn}(z)$与扩散通量$-D\,\mathrm{d}c/\mathrm{d}x$必须相消：$u = |z|FD/RT$。由$\lambda = |z|uF$得$\lambda = z^2F^2D/RT$。对$\mathrm{Cl^-}$：
$$
D = \frac{\lambda RT}{z^2F^2} = \frac{7.63\times10^{-3}\times8.314\times298.15}{96\,485^2}\ \mathrm{m^2\,s^{-1}} = 2.03\times10^{-9}\ \mathrm{m^2\,s^{-1}},
$$
与示踪测量结果（$2.03\times10^{-9}$）一致。该关系在无限稀释下严格成立；有限浓度下，离子-离子关联使电导降低，却不以同样的方式减慢示踪扩散，两者之比（Haven比，用于固体）是关联运动的诊断量。
:::
:::

::: exercise 更冷的固体氧化物电池 {level=3 check="1.04"}
用[[#ex-ysz]]的YSZ数据（$1000\,^\circ\mathrm{C}$下$\kappa = 10.0\ \mathrm{S\,m^{-1}}$，$E_\mathrm{a} = 87\ \mathrm{kJ\,mol^{-1}}$），预测$700\,^\circ\mathrm{C}$下的$\kappa$。一块电解质厚$10\ \mu\mathrm{m}$的电池要求面积比电阻不超过$0.05\ \Omega\,\mathrm{cm^2}$；$700\,^\circ\mathrm{C}$下能满足吗？（$700\,^\circ\mathrm{C}$的$\kappa$以$\mathrm{S\,m^{-1}}$为单位填写。）
::: solution
$$
\kappa_2 = \kappa_1\frac{T_1}{T_2}\exp\!\left[-\frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)\right] = 10.0\times\frac{1273.15}{973.15}\times\exp\!\left[-\frac{87\,000}{8.314}\left(\frac{1}{973.15} - \frac{1}{1273.15}\right)\right]\ \mathrm{S\,m^{-1}} = 1.04\ \mathrm{S\,m^{-1}} .
$$
面积比电阻等于厚度除以电导率：$10\times10^{-6}\ \mathrm{m}/1.04\ \mathrm{S\,m^{-1}} = 9.6\times10^{-6}\ \Omega\,\mathrm{m^2} = 0.096\ \Omega\,\mathrm{cm^2}$，约为目标的两倍。要么电解质更薄（约$5\ \mu\mathrm{m}$），要么使用更好的导体如掺钆氧化铈——中温固体氧化物电池正是沿这两条路线发展起来的。
:::
:::
