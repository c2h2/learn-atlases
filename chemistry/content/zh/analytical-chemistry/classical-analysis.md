我们凭什么确信一种有证标准物质真的含有$25.0\ \mu\mathrm{g\,g^{-1}}$的铅，或者邻苯二甲酸氢钾"基准试剂"的纯度是$99.99\ \%$？追根溯源，靠的是不需要对照其他化学标准校准的方法：称量组成已知的沉淀，或者计量与分析物恰好完全反应所需的、纯度已知的试剂的量。重量分析与滴定分析是化学分析的**绝对**（或基准）方法。它们只依赖天平、经过校准的玻璃量器和化学计量关系，在熟练者手中可以达到$0.01$–$0.1\ \%$的相对不确定度——优于几乎任何仪器技术。国家计量院至今仍用它们为仪器方法校准所用的标准物质定值，常规实验室则每天用它们测定酸度、硬度、氯化物、铁、维生素C和食品中的氮含量。

本章讨论这两大家族。在重量分析中，分析物被转化为组成已知的纯而稳定的固体；功夫在于做出可过滤、纯净的沉淀，算术则只是一个换算因数。在滴定分析中，分析物与标准溶液反应，一个终点的出现标志着等量物相混。我们从[[analytical-chemistry/equilibria-in-analysis]]的平衡工具出发，推导四类经典反应——酸碱、以EDTA进行的配位、沉淀和氧化还原——的滴定曲线，并用它们选择指示剂、估计滴定误差。操作技能（称量、滴定管、标准溶液）见[[laboratory-methods/volumetric-technique]]。

## 重量分析

在**沉淀重量分析**方法中，分析物在溶液中以难溶化合物形式沉淀出来，经过滤、洗涤、干燥或灼烧，变成组成精确已知的化合物（**称量形式**，未必与沉淀形式相同），然后称量。硫酸盐以$\mathrm{BaSO_4}$形式沉淀并称量；镍用丁二酮肟沉淀，以红色螯合物$\mathrm{Ni(C_4H_7N_2O_2)_2}$称量；铁以水合氧化铁(III)沉淀，灼烧成$\mathrm{Fe_2O_3}$；钙以草酸盐沉淀，灼烧成$\mathrm{CaO}$，或干燥后以$\mathrm{CaC_2O_4\cdot H_2O}$称量。

::: definition 换算因数 {#def-gravimetric-factor}
若称量形式P按每$p$ mol的P含$a$ mol分析物A的化学计量比含有A，则与质量为$m_\mathrm{P}$的称量形式对应的分析物质量为
$$
m_\mathrm{A} = m_\mathrm{P}\times\underbrace{\frac{a\,M_\mathrm{A}}{p\,M_\mathrm{P}}}_{\text{换算因数}},
$$ {#eq-gravimetric}
其中$M$为摩尔质量。质量为$m_\mathrm{s}$的样品中分析物的质量分数为$w_\mathrm{A} = m_\mathrm{A}/m_\mathrm{s}$。该方法假定：沉淀是完全的；称量形式是纯的、且组成与所述的完全一致；没有其他物质与它一起被称量。
:::

::: example 以硫酸钡称量硫酸盐 {#ex-sulfate}
将$0.5000\ \mathrm{g}$化肥试样溶解，用氯化钡沉淀硫酸盐。过滤、洗涤并灼烧后，$\mathrm{BaSO_4}$重$0.4123\ \mathrm{g}$。求硫酸盐的质量分数。（摩尔质量取自IUPAC 2021标准原子量：$\mathrm{BaSO_4}$ $233.38$，$\mathrm{SO_4}$ $96.06\ \mathrm{g\,mol^{-1}}$。）
::: solution
一摩尔$\mathrm{BaSO_4}$含一摩尔硫酸根，所以换算因数为$96.06/233.38 = 0.41159$。于是
$$
m(\mathrm{SO_4^{2-}}) = 0.4123\ \mathrm{g}\times0.41159 = 0.16970\ \mathrm{g}, \qquad w = \frac{0.16970}{0.5000} = 33.94\ \%.
$$
四位有效数字是有根据的：两个质量的精度为$\pm0.0001\ \mathrm{g}$，即相对$0.02$–$0.03\ \%$左右，而换算因数知道得更精确得多。结果是否*真实*到这个水平，则取决于化学而不是算术：硫酸钡因共沉淀硝酸根、氯和碱金属离子而"恶名昭彰"，这就是沉淀要在热的、稀的、酸化的溶液中缓慢进行的原因。
:::
:::

### 如何得到好的沉淀

重量分析用的沉淀必须（i）难溶到损失可以忽略；（ii）可过滤，即颗粒要大；（iii）纯净。溶解度由平衡决定（如前所述，惰性电解质会抬高它，弱酸盐在酸中也会被抬高）。颗粒大小和纯度则由**动力学**决定。加入沉淀剂时，溶液变为过饱和，两个过程相互竞争：**成核**，生成新的微小颗粒，以及在已有颗粒上的**晶体生长**。魏玛恩（von Weimarn）在二十世纪初观察到，颗粒大小随**相对过饱和度**
$$
\text{相对过饱和度} = \frac{Q - S}{S}
$$
的增大而减小，其中$Q$是混合瞬间溶质的浓度，$S$是其平衡溶解度。高的相对过饱和度有利于成核（大量小颗粒，形成胶体）；低的相对过饱和度有利于生长（少量大晶体）。这是一条经验规则，但它解释了标准做法：从**热**溶液（$S$较大）沉淀；用**稀**溶液，缓慢加入**稀**沉淀剂并搅拌（$Q$较小）；当沉淀是弱酸盐时，在抬高$S$的低pH下沉淀，事后再缓慢调节pH。**均相沉淀**则在整个溶液中缓慢产生沉淀剂——例如加热时尿素水解产生氢氧根——使$Q$从不超过$S$太多。

有些沉淀，特别是铁(III)和铝的水合氧化物以及银的卤化物，溶解度之低使它们不可避免地形成胶体。这些沉淀通过加热并加入电解质来**凝聚**（使其结团成可过滤的聚集体），电解质压缩每个颗粒周围带电的吸附离子层。用纯水洗涤可能使凝聚逆转（**胶溶**），所以要用挥发性电解质——如稀硝酸或硝酸铵——洗涤，它们在干燥时被赶跑。

杂质因**共沉淀**而被带入：表面吸附（对具有巨大表面积的胶体最严重）、生长中的晶体把溶液包裹进来（吸留），以及外来离子进入晶格（混晶）。**陈化**——让沉淀在热母液中停留一小时或更久——使小颗粒溶解、大颗粒长大（奥斯特瓦尔德熟化），排出吸留的杂质。对于顽固的污染，对策是再沉淀（溶解后在更干净的溶液中重新沉淀）。

::: example 用丁二酮肟测镍 {#ex-nickel}
溶解$1.000\ \mathrm{g}$钢样，在氨性酒石酸盐溶液中，用丁二酮肟（$\mathrm{H_2dmg}$）沉淀镍。干燥后的沉淀$\mathrm{Ni(Hdmg)_2}$（$M = 288.92\ \mathrm{g\,mol^{-1}}$）重$0.1845\ \mathrm{g}$。求镍的质量分数（$M = 58.693\ \mathrm{g\,mol^{-1}}$）。为什么这是一种有利的称量形式？
::: solution
$w(\mathrm{Ni}) = 0.1845\times58.693/288.92/1.000 = 0.03748$，即$3.748\ \%$。这种称量形式之所以有利，是因为它的换算因数很小（$0.2031$）：每毫克镍约产生五毫克沉淀，因此与直接称量金属本身相比，称量的相对误差缩小了五倍。这个有机试剂在氨性溶液中对镍还高度选择；酒石酸把铁(III)络合在溶液中，使它不致沉淀为氢氧化物——**掩蔽**的一个例子。
:::
:::

重量分析还包括**挥发**法（赶出并吸收、称量水或二氧化碳，或测量试样的失重）和**热重分析**——在升温过程中连续记录质量。它们遵循同样的算术。

## 滴定分析：共同的框架

::: definition 滴定、化学计量点与终点 {#def-titration}
在**滴定**中，用滴定管把准确已知浓度的**滴定剂**加到分析物中，直到二者之间的反应完全。**化学计量点**是指所加滴定剂的量恰好等于化学计量所需的量时的体积$V_\mathrm{e}$，对反应$a\,\mathrm{A} + t\,\mathrm{T}\rightarrow\text{产物}$，有$c_\mathrm{T}V_\mathrm{e} = (t/a)\,n_\mathrm{A}$。**终点**是某种物理变化（指示剂变色、电位的突跃、电导的改变）被观察到的体积。二者之差就是**滴定误差**。一个反应适合滴定，须满足：反应快速；化学计量已知且无副反应；进行得如此完全，以致化学计量点由某个可测性质的急剧变化所标示。
:::

滴定可以**直接**进行（滴定剂与分析物反应）；或作**返滴定**（加入过量的试剂，再用滴定剂滴定剩余的部分——用于直接反应太慢或没有终点的情形，如氮的凯氏测定）；或采用**置换**滴定（分析物释放出等量的某种物质，再滴定该物质）。滴定剂要对照**基准物质**标定：基准物质纯度已知且很高、稳定、不吸湿、摩尔质量大，例如标定碱用的邻苯二甲酸氢钾，标定酸用的碳酸钠或三(羟甲基)氨基甲烷（Tris），标定氧化剂用的草酸钠或重铬酸钾，以及标定EDTA用的碳酸钙或金属锌。

滴定曲线在化学计量点附近的形状决定滴定是否可行。我们绘制一个对数型变量——pH、$\mathrm{pM} = -\log[\mathrm{M}]$，或通过能斯特（Nernst）方程对浓度取对数的电位——对体积的曲线。远离化学计量点时，因为有一种试剂过量并把它缓冲住，变量变化缓慢；在化学计量点处它突然改变。那个突跃越陡、越高，给定的终点不确定度带来的滴定误差就越小。

## 酸碱滴定

强酸和弱酸的滴定曲线在[[general-chemistry-2/buffers-titrations]]中曾逐区域地勾画过：初始溶液、缓冲区域、化学计量点、滴定剂过量。系统处理法把整条曲线写成一个公式。

::: proposition 弱酸用强碱滴定的曲线 {#prop-titration-curve}
体积$V_\mathrm{a}$的一元弱酸HA（分析浓度$C_\mathrm{a}$，解离常数$K_\mathrm{a}$）用浓度为$C_\mathrm{b}$的强碱滴定。令$\phi = C_\mathrm{b}V_\mathrm{b}/(C_\mathrm{a}V_\mathrm{a})$为到达化学计量点的分数。则在滴定的任一点上
$$
\phi = \frac{\alpha_{\mathrm{A^-}} - \dfrac{[\mathrm{H^+}] - [\mathrm{OH^-}]}{C_\mathrm{a}}}{1 + \dfrac{[\mathrm{H^+}] - [\mathrm{OH^-}]}{C_\mathrm{b}}}, \qquad \alpha_{\mathrm{A^-}} = \frac{K_\mathrm{a}}{[\mathrm{H^+}] + K_\mathrm{a}},
$$ {#eq-titration-curve}
其中$[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$。对强酸，令$\alpha_{\mathrm{A^-}} = 1$。活度系数取$1$。
:::

::: proof
加入$V_\mathrm{b}$的碱后，溶液（体积$V_\mathrm{a}+V_\mathrm{b}$）中$[\mathrm{Na^+}] = C_\mathrm{b}V_\mathrm{b}/(V_\mathrm{a}+V_\mathrm{b})$，酸的总量$F = C_\mathrm{a}V_\mathrm{a}/(V_\mathrm{a}+V_\mathrm{b})$，其中$[\mathrm{A^-}] = \alpha_{\mathrm{A^-}}F$。电荷平衡为$[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$。记$\Delta = [\mathrm{H^+}] - [\mathrm{OH^-}]$并代入：
$$
\frac{C_\mathrm{b}V_\mathrm{b}}{V_\mathrm{a}+V_\mathrm{b}} + \Delta = \frac{\alpha_{\mathrm{A^-}}C_\mathrm{a}V_\mathrm{a}}{V_\mathrm{a}+V_\mathrm{b}} .
$$
乘以$V_\mathrm{a}+V_\mathrm{b}$并整理含$V_\mathrm{b}$的项：$V_\mathrm{b}(C_\mathrm{b} + \Delta) = V_\mathrm{a}(\alpha_{\mathrm{A^-}}C_\mathrm{a} - \Delta)$。两边除以$C_\mathrm{a}V_\mathrm{a}$再除以$C_\mathrm{b}$，
$$
\phi = \frac{C_\mathrm{b}V_\mathrm{b}}{C_\mathrm{a}V_\mathrm{a}} = \frac{\alpha_{\mathrm{A^-}} - \Delta/C_\mathrm{a}}{1 + \Delta/C_\mathrm{b}} .
$$
除了理想行为的假定之外没有作任何近似：该式对任意选定的pH精确给出$\phi$，所以曲线是"倒着"算出来的——选定一系列pH值，计算对应的体积。
:::

::: widget parametric
fx: (10^(-pKa)/(10^(-t)+10^(-pKa)) - (10^(-t)-1e-14*10^t)/C)/(1 + (10^(-t)-1e-14*10^t)/C)
fy: t
t: 0.5, 13.5
x: 0, 2
y: 0, 14
sliders: pKa=4.76:1:11:0.01; C=0.1:0.001:0.5:0.001
trace: false
caption: 弱酸用同浓度$C$（以$\mathrm{mol\,dm^{-3}}$计）的强碱滴定的滴定曲线，由[[#eq-titration-curve]]计算：pH（纵轴）对滴定分数$\phi = V_\mathrm{b}/V_\mathrm{e}$（横轴）。默认参数是$0.1\ \mathrm{mol\,dm^{-3}}$的乙酸：半化学计量点在$\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$处，化学计量点在$8.73$。把$\mathrm{p}K_\mathrm{a}$升到$8$或$9$，突跃便缩小，直到没有任何指示剂能定位它；把$C$降到$0.001$，同样的事就会发生。一条有用的规则：当$C_\mathrm{a}K_\mathrm{a} \gtrsim 10^{-8}$时，目视终点才可行。
:::

::: example 乙酸用氢氧化钠滴定 {#ex-acetic-titration}
$25.00\ \mathrm{cm^3}$的$0.1000\ \mathrm{mol\,dm^{-3}}$乙酸（$\mathrm{p}K_\mathrm{a} = 4.76$）用$0.1000\ \mathrm{mol\,dm^{-3}}$的$\mathrm{NaOH}$滴定。求化学计量点的pH，以及$\phi = 0.99$和$1.01$处的pH。哪种指示剂合适？
::: solution
在化学计量点（$V_\mathrm{b} = 25.00\ \mathrm{cm^3}$），溶液是$0.05000\ \mathrm{mol\,dm^{-3}}$的乙酸钠。由$K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.75\times10^{-10}$，$[\mathrm{OH^-}] = \sqrt{K_\mathrm{b}\times0.05000} = 5.36\times10^{-6}$，$\mathrm{pOH} = 5.27$，$\mathrm{pH} = 8.73$。

$\phi = 0.99$时，溶液是缓冲体系，$[\mathrm{A^-}]/[\mathrm{HA}] = 99$，所以$\mathrm{pH} = 4.76 + \log 99 = 6.76$。$\phi = 1.01$时，过量的碱为$0.01\times2.500\ \mathrm{mmol} = 0.0250\ \mathrm{mmol}$，存在于$50.25\ \mathrm{cm^3}$中，$[\mathrm{OH^-}] = 4.98\times10^{-4}$，$\mathrm{pH} = 10.70$。（[[#eq-titration-curve]]在这些$\phi$处解出pH，给出$6.76$、$8.73$和$10.70$。）

在化学计量点$\pm1\ \%$的范围内pH上升四个单位，而化学计量点呈碱性，所以指示剂必须在约pH 7到10之间变色：酚酞（约8.2–10由无色变粉红）是标准选择。甲基橙（3.1–4.4）在仅有约五分之一的酸被中和时就会变色。
:::
:::

多元酸只有当相邻$\mathrm{p}K$值相差约四个单位以上时，才每个质子给出一个突跃——碳酸钠用盐酸滴定给出两个终点（酚酞在pH 8.3附近，甲基橙或溴甲酚绿在pH 4附近）——而柠檬酸的三个质子（$\mathrm{p}K$值彼此相差不到两个单位）滴定起来如同一个。**凯氏（Kjeldahl）定氮法**——至今仍是食品蛋白质含量的参比方法——是一次酸碱返滴定：试样在热的浓硫酸中消解，把氮转化为铵；把溶液碱化，将氨蒸馏出来，吸收到已知过量的标准酸中，再滴定未反应的酸。

## EDTA配位滴定

大多数金属离子与氨这类简单配体并不发生一步反应：它们生成$\mathrm{ML}, \mathrm{ML_2}, \dots$，各级逐级常数彼此接近，滴定曲线因而没有尖锐的突跃。能把配位点一次全部占有的**螯合**配体，则以大的形成常数一步按$1{:}1$反应。最重要的是乙二胺四乙酸（EDTA），一个六齿配体（两个胺氮和四个羧基氧），几乎与所有电荷为$2$或更高的金属离子形成$1{:}1$配合物。EDTA是六元酸$\mathrm{H_6Y^{2+}}$，$\mathrm{p}K$值为$0.0$、$1.5$、$2.00$、$2.69$、$6.13$和$10.37$（$25\ ^\circ\mathrm{C}$、$I = 0.1\ \mathrm{mol\,dm^{-3}}$，如Harris教材所列表），而在形成常数中只有完全去质子的$\mathrm{Y^{4-}}$与金属结合：
$$
\mathrm{M}^{n+} + \mathrm{Y^{4-}} \rightleftharpoons \mathrm{MY}^{n-4}, \qquad K_\mathrm{f} = \frac{[\mathrm{MY}^{n-4}]}{[\mathrm{M}^{n+}][\mathrm{Y^{4-}}]} .
$$

::: proposition 条件形成常数 {#prop-conditional-kf}
在固定pH的缓冲溶液中，用$[\mathrm{EDTA}]$表示未与金属配位的EDTA在所有质子化状态下的总浓度。于是
$$
\frac{[\mathrm{MY}^{n-4}]}{[\mathrm{M}^{n+}][\mathrm{EDTA}]} = K_\mathrm{f}' = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f},
$$ {#eq-conditional-kf}
其中$\alpha_{\mathrm{Y^{4-}}}$是游离EDTA中以$\mathrm{Y^{4-}}$存在的分数，由[[analytical-chemistry/equilibria-in-analysis#eq-alpha]]取$n = 6$给出。若金属还另外被辅助配位剂抓住，则$[\mathrm{M}^{n+}]$换成未配位金属的总量，$K_\mathrm{f}'' = \alpha_{\mathrm{M}^{n+}}\alpha_{\mathrm{Y^{4-}}}K_\mathrm{f}$，其中$\alpha_{\mathrm{M}^{n+}}$是未配位金属中以游离离子存在的分数。
:::

::: proof
按定义$[\mathrm{Y^{4-}}] = \alpha_{\mathrm{Y^{4-}}}[\mathrm{EDTA}]$，而在固定pH下$\alpha_{\mathrm{Y^{4-}}}$是常数。代入$K_\mathrm{f}$得$K_\mathrm{f} = [\mathrm{MY}]/([\mathrm{M}]\,\alpha_{\mathrm{Y^{4-}}}[\mathrm{EDTA}])$，重排即为[[#eq-conditional-kf]]。辅助配体的情形完全相同，只要把$[\mathrm{M}^{n+}] = \alpha_{\mathrm{M}^{n+}}[\mathrm{M}]_\text{游离}$。按[[analytical-chemistry/equilibria-in-analysis#def-conditional]]的语言，$1/\alpha_{\mathrm{Y^{4-}}}$就是EDTA因质子化而产生的副反应系数。
:::

::: widget plot
f: log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x))); 10.65 + log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x))); 8.79 + log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x)))
x: 2, 14
y: -14, 12
hlines: 8
labels: \log\alpha_{\mathrm{Y^{4-}}}; \log K_\mathrm{f}'(\mathrm{CaY^{2-}}); \log K_\mathrm{f}'(\mathrm{MgY^{2-}})
caption: $\log\alpha_{\mathrm{Y^{4-}}}$随pH（$x$）的变化，以及钙、镁配合物的条件形成常数[[#eq-conditional-kf]]（$\log K_\mathrm{f}$分别为$10.65$和$8.79$）。pH低于10时，$\mathrm{Y^{4-}}$的分数每升高一个pH单位就降一个数量级，pH低于6时降得更快。水平线标出$\log K_\mathrm{f}' = 8$，大致是$0.01\ \mathrm{mol\,dm^{-3}}$下能给出敏锐终点的条件常数最小值：钙可在约pH 7.5以上滴定，镁只能在约pH 9.5以上滴定。$\log K_\mathrm{f}$接近25的离子（铁(III)、铋）可以在pH 1–2滴定，此时钙和镁完全不干扰。
:::

::: example 一条EDTA滴定曲线 {#ex-edta-curve}
pH 10.00缓冲下的$50.00\ \mathrm{cm^3}$、$0.0400\ \mathrm{mol\,dm^{-3}}$的$\mathrm{Ca^{2+}}$，用$0.0800\ \mathrm{mol\,dm^{-3}}$的EDTA滴定。求加入$20.00$、$25.00$（化学计量点）和$30.00\ \mathrm{cm^3}$后的$\mathrm{pCa}$。
::: solution
在pH 10.00，$\alpha_{\mathrm{Y^{4-}}} = 0.30$（由[[analytical-chemistry/equilibria-in-analysis#eq-alpha]]和上面六个$\mathrm{p}K$值得出），所以$K_\mathrm{f}' = 0.30\times10^{10.65} = 1.34\times10^{10}$。化学计量点体积为$V_\mathrm{e} = 0.0400\times50.00/0.0800 = 25.00\ \mathrm{cm^3}$。

*化学计量点之前，$20.00\ \mathrm{cm^3}$。*反应基本完全，未反应的钙为$2.000 - 1.600 = 0.400\ \mathrm{mmol}$，在$70.00\ \mathrm{cm^3}$中：$[\mathrm{Ca^{2+}}] = 5.71\times10^{-3}$，$\mathrm{pCa} = 2.24$。

*化学计量点处。*全部钙都是$\mathrm{CaY^{2-}}$：$2.000\ \mathrm{mmol}$在$75.00\ \mathrm{cm^3}$中，即$0.02667\ \mathrm{mol\,dm^{-3}}$。配合物解离一点，给出$[\mathrm{Ca^{2+}}] = [\mathrm{EDTA}] = x$：
$$
\frac{0.02667 - x}{x^2} = 1.34\times10^{10} \quad\Rightarrow\quad x = \sqrt{\frac{0.02667}{1.34\times10^{10}}} = 1.41\times10^{-6}, \qquad \mathrm{pCa} = 5.85 .
$$
*化学计量点之后，$30.00\ \mathrm{cm^3}$。*EDTA过量：$2.400 - 2.000 = 0.400\ \mathrm{mmol}$在$80.00\ \mathrm{cm^3}$中，$[\mathrm{EDTA}] = 5.00\times10^{-3}$，且$[\mathrm{CaY^{2-}}] = 0.02500$。由[[#eq-conditional-kf]]，$[\mathrm{Ca^{2+}}] = 0.02500/(1.34\times10^{10}\times5.00\times10^{-3}) = 3.74\times10^{-10}$，$\mathrm{pCa} = 9.43$。

在$\pm5\ \mathrm{cm^3}$之内从2.24跳到9.43，突跃是大的；若在pH 8，$K_\mathrm{f}'$只有$10^{8.27}$，化学计量点之后的分支会低两个单位，突跃也就远没有那么敏锐了。
:::
:::

EDTA滴定的终点通常用**金属指示剂**确定：这类染料本身就是弱螯合剂，游离态与结合金属时颜色不同。例如铬黑T在pH 10时与镁结合呈酒红色，游离时呈蓝色。指示剂对金属的结合弱于EDTA；到达终点时，EDTA把最后一点金属从指示剂上夺走，颜色随之改变。最著名的应用是**水的硬度**——钙与镁的总量——惯例上以$\mathrm{CaCO_3}$的$\mathrm{mg\,dm^{-3}}$表示。EDTA滴定的选择性靠pH实现（如上图所示），还靠**掩蔽剂**——它们对干扰离子的结合比EDTA更强：氰化物掩蔽锌、铜和镍；三乙醇胺掩蔽铝和铁。

::: warning 忘了pH {#warn-edta-ph}
$10^{10.65}$的形成常数似乎表明钙与EDTA的反应总是完全的。其实不然：在pH 6，$\alpha_{\mathrm{Y^{4-}}} = 1.8\times10^{-5}$，$K_\mathrm{f}'$只有$10^{5.9}$，远不足以产生敏锐的终点。每一次EDTA滴定都必须在选定的pH下缓冲，使$K_\mathrm{f}'$足够大——而且$\mathrm{H_2Y^{2-}}$（常用二钠盐的形式）与金属结合时释放的质子，本来就会在滴定过程中压低pH。走向另一个极端，pH太高又会使金属氢氧化物沉淀（氢氧化镁在约pH 11以上沉淀，人们反而利用这一点在pH 12–13单独测定钙）。缓冲溶液是方法的一部分，不是可有可无的方便。
:::

## 沉淀滴定

经典的沉淀滴定是用硝酸银测定卤化物，即**银量法**。滴定曲线以$\mathrm{pAg}$对体积作图，其突跃的高度由$K_\mathrm{sp}$决定：碘化物（$K_\mathrm{sp}(\mathrm{AgI}) = 8.3\times10^{-17}$）的突跃比氯化物（$1.8\times10^{-10}$）更大。三种确定终点的方法以其创立者的名字命名：

- **莫尔（Mohr）法**（1856）：加入铬酸盐作指示剂；待氯离子全部沉淀后，稍过量的银便沉淀出红棕色的$\mathrm{Ag_2CrO_4}$。pH必须接近中性（7–10）：在酸中，铬酸根被质子化为酸式铬酸根和重铬酸根，终点偏晚；在碱中，银的氢氧化物/氧化物沉淀。
- **佛尔哈德（Volhard）法**（1874）：返滴定。向酸化试样中加入过量的标准硝酸银，再用标准硫氰酸盐滴定未反应的银，以铁(III)作指示剂，终点时生成红色的$\mathrm{FeSCN^{2+}}$。因为它在酸中工作，在原本中性溶液中会沉淀银的碳酸根及其他阴离子都不干扰。
- **法扬斯（Fajans）法**（1920年代）：用**吸附指示剂**，如二氯荧光素——一种阴离子染料；一旦沉淀表面在越过化学计量点后被过量的$\mathrm{Ag^+}$带正电，它便被吸附到沉淀表面，颜色由黄绿变为粉红。

硝酸银使皮肤着色并对眼睛有腐蚀性，铬酸盐有毒且致癌；教学实验室越来越多地以法扬斯法或电位终点（[[analytical-chemistry/electroanalytical]]）取代莫尔法的铬酸盐，银残渣则收集回收。一如既往，实验工作必须在监督下、经风险评估后进行。

## 氧化还原滴定

氧化还原滴定中，被测变量是溶液的电极电位，能斯特方程把它与处于过量的那个电对的氧化型与还原型的比值联系起来。常用的滴定剂有高锰酸钾（自身指示：终点时出现$\mathrm{MnO_4^-}$的粉红色）、铈(IV)、重铬酸钾、碘（以淀粉作指示剂）；对氧化性分析物，则先加碘化物，再用硫代硫酸钠滴定释放出的碘（**碘量法**）。电位采用**式量电位**$E^{\circ\prime}$，即在指明介质中测得的电位（例如$1\ \mathrm{mol\,dm^{-3}}$的$\mathrm{H_2SO_4}$），它把活度系数和介质的配位吸收进常数，正像条件常数一样。

::: proposition 化学计量点的电位 {#prop-redox-eq}
用氧化剂$\mathrm{Ox_2}$（电对$\mathrm{Ox_2}/\mathrm{Red_2}$，$n_2$个电子，$E_2^{\circ\prime}$）滴定还原剂$\mathrm{Red_1}$（电对$\mathrm{Ox_1}/\mathrm{Red_1}$，$n_1$个电子，式量电位$E_1^{\circ\prime}$），若半反应中不出现其他物种（如$\mathrm{H^+}$），则$25\ ^\circ\mathrm{C}$时化学计量点的电位为
$$
E_\mathrm{eq} = \frac{n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime}}{n_1 + n_2} .
$$ {#eq-redox-eq}
化学计量点之前，$E = E_1^{\circ\prime} - (0.05916/n_1)\log_{10}([\mathrm{Red_1}]/[\mathrm{Ox_1}])$；之后，$E = E_2^{\circ\prime} - (0.05916/n_2)\log_{10}([\mathrm{Red_2}]/[\mathrm{Ox_2}])$。
:::

::: proof
在任何一点，两个电对都彼此平衡、并与电极平衡，所以两个能斯特方程给出同一个$E$：
$$
E = E_1^{\circ\prime} - \frac{0.05916}{n_1}\log\frac{[\mathrm{Red_1}]}{[\mathrm{Ox_1}]}, \qquad E = E_2^{\circ\prime} - \frac{0.05916}{n_2}\log\frac{[\mathrm{Red_2}]}{[\mathrm{Ox_2}]} .
$$
第一式乘以$n_1$，第二式乘以$n_2$，相加：
$$
(n_1 + n_2)E = n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime} - 0.05916\log\frac{[\mathrm{Red_1}][\mathrm{Red_2}]}{[\mathrm{Ox_1}][\mathrm{Ox_2}]} .
$$
反应为$n_2\,\mathrm{Red_1} + n_1\,\mathrm{Ox_2} \rightarrow n_2\,\mathrm{Ox_1} + n_1\,\mathrm{Red_2}$。在化学计量点，加入的$\mathrm{Ox_2}$与原有的$\mathrm{Red_1}$按$n_1{:}n_2$的化学计量比相当，它们的剩余量也按此比例；产物也按同一比例生成。于是$[\mathrm{Red_1}]/[\mathrm{Ox_2}] = n_2/n_1$，$[\mathrm{Red_2}]/[\mathrm{Ox_1}] = n_1/n_2$，对数号内的乘积为$1$，对数消失，即得[[#eq-redox-eq]]。若$\mathrm{H^+}$参加反应（如高锰酸钾或重铬酸钾），其浓度便保留在对数中，$E_\mathrm{eq}$依赖于pH（[[#exr-permanganate-eq]]）。
:::

::: widget parametric
fx: (10^((t-E1)/0.05916)/(1+10^((t-E1)/0.05916)))*(1+10^((t-E2)/0.05916))
fy: t
t: 0.4, 1.65
x: 0, 2
y: 0.4, 1.65
sliders: E1=0.68:0.2:1.2:0.01; E2=1.44:0.8:1.7:0.01
trace: false
caption: 铈(IV)滴定铁(II)的滴定曲线：电位$E$（以伏计）对滴定分数$\phi$，由两个能斯特方程和电子守恒精确计算（$n_1 = n_2 = 1$）。默认值是$1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$介质中的式量电位：$E^{\circ\prime}(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.68\ \mathrm{V}$，$E^{\circ\prime}(\mathrm{Ce^{4+}/Ce^{3+}}) = 1.44\ \mathrm{V}$。$\phi = 0.5$处电位等于$E_1^{\circ\prime}$，$\phi = 2$处等于$E_2^{\circ\prime}$，$\phi = 1$处是二者的平均值$1.06\ \mathrm{V}$（[[#eq-redox-eq]]）。把两个电位移近，突跃就缩小；两者相差不足约$0.2\ \mathrm{V}$时，任何指示剂都找不到终点。与酸碱曲线不同，该曲线与稀释无关，因为进入公式的只有浓度之比。
:::

::: example 标定高锰酸钾 {#ex-permanganate}
将$0.2500\ \mathrm{g}$干燥的草酸钠（$\mathrm{Na_2C_2O_4}$，$M = 134.00\ \mathrm{g\,mol^{-1}}$）溶于稀硫酸，加热，用高锰酸钾溶液滴定；持久的淡粉红色在$37.20\ \mathrm{cm^3}$处出现。求高锰酸钾的浓度。然后用标定好的溶液：$0.4500\ \mathrm{g}$铁矿样，溶解并把铁完全还原为$\mathrm{Fe^{2+}}$，消耗$23.45\ \mathrm{cm^3}$。求铁的质量分数。
::: solution
*标定。*配平的反应为
$$
2\,\mathrm{MnO_4^-} + 5\,\mathrm{C_2O_4^{2-}} + 16\,\mathrm{H^+} \rightarrow 2\,\mathrm{Mn^{2+}} + 10\,\mathrm{CO_2} + 8\,\mathrm{H_2O}.
$$
$n(\mathrm{C_2O_4^{2-}}) = 0.2500/134.00 = 1.8657\ \mathrm{mmol}$，故$n(\mathrm{MnO_4^-}) = \tfrac25\times1.8657 = 0.74628\ \mathrm{mmol}$，$c = 0.74628/37.20 = 0.02006\ \mathrm{mol\,dm^{-3}}$。

*铁。*$\mathrm{MnO_4^-} + 5\,\mathrm{Fe^{2+}} + 8\,\mathrm{H^+} \rightarrow \mathrm{Mn^{2+}} + 5\,\mathrm{Fe^{3+}} + 4\,\mathrm{H_2O}$。$n(\mathrm{Fe}) = 5\times0.02006\times23.45\ \mathrm{mmol} = 2.352\ \mathrm{mmol}$，质量$2.352\times55.845 = 131.4\ \mathrm{mg}$，于是$w(\mathrm{Fe}) = 131.4/450.0 = 29.19\ \%$。

草酸盐的反应开始很慢，而其产物$\mathrm{Mn^{2+}}$会催化它——自动催化的经典例子——这就是为什么要加热溶液，以及为什么最初几滴褪色很慢。铁矿石传统上溶于盐酸，但氯离子会被高锰酸钾氧化；加入齐默尔曼-莱因哈特（Zimmermann–Reinhardt）试剂（硫酸锰(II)与磷酸的混合液）以抑制这一反应。
:::
:::

::: quiz
对下列哪一个滴定，目视终点*最*不可行？
- [ ] $0.1\ \mathrm{mol\,dm^{-3}}$乙酸（$\mathrm{p}K_\mathrm{a} = 4.76$）用$0.1\ \mathrm{mol\,dm^{-3}}$的NaOH滴定。
- [x] $0.01\ \mathrm{mol\,dm^{-3}}$硼酸（$\mathrm{p}K_\mathrm{a} = 9.24$）用$0.01\ \mathrm{mol\,dm^{-3}}$的NaOH滴定。
- [ ] $0.02\ \mathrm{mol\,dm^{-3}}$的$\mathrm{Ca^{2+}}$在pH 10用EDTA滴定。
- [ ] $0.1\ \mathrm{mol\,dm^{-3}}$的$\mathrm{Fe^{2+}}$在$1\ \mathrm{mol\,dm^{-3}}$的$\mathrm{H_2SO_4}$中用$\mathrm{Ce^{4+}}$滴定。
::: solution
对硼酸，$C_\mathrm{a}K_\mathrm{a} = 0.01\times5.8\times10^{-10} = 5.8\times10^{-12}$，远低于经验规则的$10^{-8}$；曲线几乎没有突跃。（硼酸要先与甘露醇或甘油络合生成强得多的酸，然后再滴定。）乙酸的$C_\mathrm{a}K_\mathrm{a} = 1.7\times10^{-6}$；钙在pH 10处$\log K_\mathrm{f}' = 10.1$；铁(II)/铈(IV)的两个式量电位之间相差$0.76\ \mathrm{V}$——后三者都是常规滴定。
:::
:::

## 滴定误差

指示剂在以其$\mathrm{p}K_\mathrm{In}$为中心、约两个pH单位的范围内变色，而终点在我们看到颜色变化之处，不是化学计量点所在之处。[[#eq-titration-curve]]让我们能量化这个代价：pH到达终点时的滴定分数恰为$\phi_\mathrm{end}$，相对滴定误差即$\phi_\mathrm{end} - 1$。对$0.1\ \mathrm{mol\,dm^{-3}}$的乙酸，终点在pH 9.0时$\phi = 1.0001$（误差$+0.01\ \%$），在pH 7.0时$\phi = 0.9943$（误差$-0.57\ \%$），在pH 4.0时$\phi = 0.147$——彻底报废。曲线在化学计量点附近的陡峭，才使小小的pH误判代价甚微；在曲线平坦的地方，误判的代价就很大。一个相关的修正是**指示剂空白**：改变指示剂本身和溶剂的颜色需要百分之几立方厘米的滴定剂，可通过滴定一份空白来测得。

## 后续内容

电位终点——用pH电极或离子选择性电极代替指示剂，由曲线的最大斜率定位——在[[analytical-chemistry/electroanalytical]]中展开；库仑滴定也在该章，其滴定剂由电解产生、以库仑计量。平行滴定数据的统计处理，以及滴定结果与认证值的比较，见[[analytical-chemistry/statistics-calibration]]。EDTA与螯合效应的结构性解释见[[coordination-chemistry/complex-stability]]，天然水的硬度见[[environmental-chemistry/natural-waters]]。

::: history
约瑟夫·路易·盖-吕萨克（Gay-Lussac）以氯化钠滴定银的分析（1832）为滴定分析奠定了定量基础，取代了巴黎造币厂用火试金测定银的方法。卡尔·弗里德里希·莫尔（Mohr）的《化学分析滴定法教程》（*Lehrbuch der chemisch-analytischen Titrirmethode*，1855）引入了带夹子阀的滴定管和以他命名的铬酸盐终点；雅各布·佛尔哈德（Volhard）于1874年发表了他的硫氰酸盐法。约翰·基耶达尔（Kjeldahl）于1883年描述了他在嘉士伯实验室发展出的测氮方法。列夫·丘加耶夫（Chugaev）于1905年引入丁二酮肟作为镍的试剂。格尔德·施瓦岑巴赫（Schwarzenbach）在20世纪40年代发展了EDTA配位滴定与金属指示剂；安德斯·林博姆（Ringbom）的《分析化学中的配位作用》（*Complexation in Analytical Chemistry*，1963）把本章使用的副反应系数与条件常数系统化了。
:::

::: summary
- 重量分析称量组成已知的纯化合物；$m_\mathrm{A} = m_\mathrm{P}\times aM_\mathrm{A}/(pM_\mathrm{P})$。
- 大而纯的晶体需要低的相对过饱和度$(Q-S)/S$：热溶液、稀溶液、缓慢加入、均相沉淀、陈化；胶体用电解质凝聚，并用挥发性电解质洗涤。
- 滴定需要快速、按化学计量、进行完全的反应，以及一个尽量靠近化学计量点的终点；滴定剂要对照基准物质标定。
- 整条酸碱曲线都来自电荷平衡：$\phi = (\alpha_{\mathrm{A^-}} - \Delta/C_\mathrm{a})/(1 + \Delta/C_\mathrm{b})$；目视终点需要$C_\mathrm{a}K_\mathrm{a} \gtrsim 10^{-8}$。
- EDTA滴定依赖条件常数$K_\mathrm{f}' = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f}$，因此由缓冲溶液设定的pH同时控制着可行性与选择性。
- 银量法使用莫尔法、佛尔哈德法或法扬斯法终点；每一种都有自己的pH和干扰条件。
- 氧化还原滴定中，若质子不参加反应，$E_\mathrm{eq} = (n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime})/(n_1+n_2)$；曲线与稀释无关。
- 滴定误差为$\phi_\mathrm{end} - 1$，由精确曲线在终点pH处读出。
:::

## 习题

::: exercise 以氧化物称量铝 {level=1 check="15.05"}
某合金试样$1.2000\ \mathrm{g}$经处理得灼烧后的$\mathrm{Al_2O_3}$ $0.3412\ \mathrm{g}$（$M = 101.96\ \mathrm{g\,mol^{-1}}$；$M(\mathrm{Al}) = 26.982\ \mathrm{g\,mol^{-1}}$）。求铝的质量分数。（以百分数输入。）
::: solution
换算因数$2\times26.982/101.96 = 0.52926$。$m(\mathrm{Al}) = 0.3412\times0.52926 = 0.18058\ \mathrm{g}$；$w = 0.18058/1.2000 = 15.05\ \%$。
:::
:::

::: exercise 水的硬度 {level=1 check="201"}
$50.00\ \mathrm{cm^3}$水样，用pH 10缓冲、铬黑T作指示剂，消耗$0.01020\ \mathrm{mol\,dm^{-3}}$的EDTA $9.86\ \mathrm{cm^3}$。以$\mathrm{CaCO_3}$的$\mathrm{mg\,dm^{-3}}$表示总硬度（$M = 100.09\ \mathrm{g\,mol^{-1}}$）。（输入硬度。）
::: solution
$50.00\ \mathrm{cm^3}$中$n(\mathrm{Ca + Mg}) = 9.86\times0.01020 = 0.1006\ \mathrm{mmol}$，即$2.011\ \mathrm{mmol\,dm^{-3}}$。折合成$\mathrm{CaCO_3}$：$2.011\times100.09 = 201\ \mathrm{mg\,dm^{-3}}$——按常用分类属于"硬"水。
:::
:::

::: exercise 莫尔法测氯化物 {level=1 check="1981"}
$10.00\ \mathrm{cm^3}$盐水试样稀释后，用$0.02500\ \mathrm{mol\,dm^{-3}}$的$\mathrm{AgNO_3}$以莫尔法滴定；扣除指示剂空白后，终点在$22.35\ \mathrm{cm^3}$。求原试样中氯化物的浓度。（以$\mathrm{mg\,dm^{-3}}$输入。）
::: solution
$10.00\ \mathrm{cm^3}$中$n(\mathrm{Cl^-}) = 22.35\times0.02500 = 0.5588\ \mathrm{mmol}$：$55.88\ \mathrm{mmol\,dm^{-3}}$，即$55.88\times35.45 = 1981\ \mathrm{mg\,dm^{-3}}$。滴定前的稀释不必计入，因为滴定的是氯化物的量。
:::
:::

::: exercise 甲酸 {level=2 check="8.07"}
$0.0500\ \mathrm{mol\,dm^{-3}}$的甲酸（$\mathrm{p}K_\mathrm{a} = 3.75$）用$0.0500\ \mathrm{mol\,dm^{-3}}$的NaOH滴定。求化学计量点的pH，并建议一种指示剂。（输入pH。）
::: solution
化学计量点时溶液是$0.0250\ \mathrm{mol\,dm^{-3}}$的甲酸根（稀释了$2$倍）。$K_\mathrm{b} = 10^{-14}/10^{-3.75} = 5.62\times10^{-11}$；$[\mathrm{OH^-}] = \sqrt{5.62\times10^{-11}\times0.0250} = 1.19\times10^{-6}$；$\mathrm{pOH} = 5.93$；$\mathrm{pH} = 8.07$。可用酚酞（8.2–10）或百里酚蓝（8.0–9.6）；由于该处曲线陡峭，酚酞略偏高的变色区间带来的终点误差可以忽略。
:::
:::

::: exercise 在较低pH下用EDTA {level=2 check="8.27"}
已知pH 8.00时$\alpha_{\mathrm{Y^{4-}}} = 4.19\times10^{-3}$，$\log K_\mathrm{f}(\mathrm{CaY^{2-}}) = 10.65$，求pH 8.00时钙的$\log K_\mathrm{f}'$。镁（$\log K_\mathrm{f} = 8.79$）能在此pH滴定吗？（输入钙的$\log K_\mathrm{f}'$。）
::: solution
$\log K_\mathrm{f}' = 10.65 + \log(4.19\times10^{-3}) = 10.65 - 2.38 = 8.27$。钙（勉强）可以滴定。镁的$\log K_\mathrm{f}' = 8.79 - 2.38 = 6.41$：太小，得不到敏锐的终点。在pH 8原则上可以在镁存在下滴定钙，尽管实际的终点敏锐程度处于边缘；通常的做法是在pH 12–13沉淀掉氢氧化镁后测定钙。
:::
:::

::: exercise 凯氏定氮 {level=2 check="8.88"}
$0.5000\ \mathrm{g}$食品经凯氏消解后，把氨蒸馏出来，吸收到$50.00\ \mathrm{cm^3}$、$0.1000\ \mathrm{mol\,dm^{-3}}$的HCl中。剩余的酸需要$18.30\ \mathrm{cm^3}$的$0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH。求氮的质量分数，并用惯用系数$6.25$换算成蛋白质含量。（氮以百分数输入。）
::: solution
取用的酸：$5.000\ \mathrm{mmol}$；剩余的酸：$1.830\ \mathrm{mmol}$；氨消耗的酸：$3.170\ \mathrm{mmol} = n(\mathrm{N})$。氮的质量：$3.170\times14.007 = 44.40\ \mathrm{mg}$；$w(\mathrm{N}) = 44.40/500.0 = 8.88\ \%$。蛋白质$\approx 6.25\times8.88 = 55.5\ \%$。系数$6.25$假定蛋白质含氮$16\ \%$；它只是一个惯例，非蛋白来源的氮（如2008年奶粉中被恶意添加的三聚氰胺）按此法也被算作蛋白质——这提醒我们：一个方法测的是它测的东西，不是我们希望它测的东西。
:::
:::

::: exercise 高锰酸滴定的化学计量点电位 {#exr-permanganate-eq level=3 check="1.305"}
推导用$\mathrm{MnO_4^-}$滴定$\mathrm{Fe^{2+}}$的化学计量点电位，其中高锰酸根的半反应为$\mathrm{MnO_4^-} + 8\,\mathrm{H^+} + 5\,\mathrm{e^-} \rightleftharpoons \mathrm{Mn^{2+}} + 4\,\mathrm{H_2O}$。在pH 1.00下求值，取$E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.771\ \mathrm{V}$、$E^\circ(\mathrm{MnO_4^-/Mn^{2+}}) = 1.507\ \mathrm{V}$（标准电位，CRC手册）。（以V输入$E_\mathrm{eq}$。）
::: hint
把铁的能斯特方程加上高锰酸根那个的五倍。在化学计量点处$[\mathrm{Fe^{3+}}] = 5[\mathrm{Mn^{2+}}]$、$[\mathrm{Fe^{2+}}] = 5[\mathrm{MnO_4^-}]$。
:::
::: solution
$E = 0.771 - 0.05916\log([\mathrm{Fe^{2+}}]/[\mathrm{Fe^{3+}}])$，$5E = 5\times1.507 - 0.05916\log([\mathrm{Mn^{2+}}]/([\mathrm{MnO_4^-}][\mathrm{H^+}]^8))$。两式相加，
$$
6E = 0.771 + 7.535 - 0.05916\log\frac{[\mathrm{Fe^{2+}}][\mathrm{Mn^{2+}}]}{[\mathrm{Fe^{3+}}][\mathrm{MnO_4^-}][\mathrm{H^+}]^8} .
$$
代入化学计量点关系，浓度比即为$1/[\mathrm{H^+}]^8$，于是$6E = 8.306 + 8\times0.05916\log[\mathrm{H^+}]$，故
$$
E_\mathrm{eq} = \frac{E_\mathrm{Fe}^\circ + 5E_\mathrm{Mn}^\circ}{6} - \frac{8}{6}\,(0.05916)\,\mathrm{pH} = 1.3843 - 0.0789 = 1.305\ \mathrm{V}
$$
（pH 1.00）。化学计量点电位靠近高锰酸根的电位，因为五个电子给了它五倍的权重；它每单位pH下降$79\ \mathrm{mV}$。
:::
:::

::: exercise 选错指示剂的代价 {level=3 check="-0.57"}
利用[[#eq-titration-curve]]求：以$0.1000\ \mathrm{mol\,dm^{-3}}$的NaOH滴定$0.1000\ \mathrm{mol\,dm^{-3}}$的乙酸，终点定在pH 7.00（溴百里酚蓝）时的相对滴定误差（以百分数计）。解释误差为什么是负的，以及误差为什么主要来自$\alpha$项。（以百分数输入误差。）
::: hint
在pH 7.00，$[\mathrm{H^+}] = [\mathrm{OH^-}]$，故$\Delta = 0$，$\phi = \alpha_{\mathrm{A^-}}$。
:::
::: solution
pH 7.00时$\Delta = 0$，$\phi = K_\mathrm{a}/([\mathrm{H^+}] + K_\mathrm{a}) = 1.738\times10^{-5}/(1.0\times10^{-7} + 1.738\times10^{-5}) = 0.99428$。误差为$(0.99428 - 1)\times100 = -0.57\ \%$。误差为负，是因为终点在化学计量点之前到达：在pH 7，约$0.6\ \%$的乙酸尚未被中和，这正是$\alpha$项——弱酸的化学计量点在碱性一侧，停在中性pH就停得太早。改用酚酞（终点接近pH 9）时误差为$+0.01\ \%$。
:::
:::
