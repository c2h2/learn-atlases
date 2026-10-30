向氯化银的饱和溶液中加入一药匙硝酸钾——一种与氯化银毫无共同之处的盐——会有更多的氯化银溶解。把等量的$\mathrm{NaH_2PO_4}$和$\mathrm{Na_2HPO_4}$混合，配成"pH 7.21的磷酸盐缓冲溶液"，pH计读出的却是$6.9$左右，而不是$7.21$。把$0.0010\ \mathrm{mol\,dm^{-3}}$的$\mathrm{NaH_2PO_4}$溶于水，pH是$5.1$，而不是教科书公式$\tfrac12(\mathrm{p}K_{\mathrm{a}1}+\mathrm{p}K_{\mathrm{a}2})$预言的$4.7$。这些都不是平衡化学的失败。每一例失败的都是在入门课程里惯用的捷径：把浓度当作活度，以及在检验某些项是否很小之前就先从方程中把它们丢掉。

分析化学用不起这些捷径，因为平衡本身*就是*方法：滴定的终点、沉淀的完全程度、萃取的效率和缓冲溶液的pH都是平衡组成。本章给出可靠地计算它们的工具。我们定义活度，并用德拜-休克尔（Debye–Hückel）理论由离子强度估算活度系数；我们陈述**平衡的系统处理法**——电荷平衡、质量平衡与平衡常数联立求解——它对任何混合物都适用；我们用**分布分数**（$\alpha$）函数一眼看出在给定pH下多元酸或金属配合物的哪种型体占主导。平衡常数、缓冲溶液与溶度积取自[[general-chemistry-2/buffers-titrations]]和[[general-chemistry-2/solubility-equilibria]]；它们的热力学基础见[[thermodynamics/ions-in-solution]]。

## 活度与离子强度

由热力学导出的平衡常数是写在**活度**上的，而不是浓度上。对氯化银的溶解，
$$
K_\mathrm{sp} = a_{\mathrm{Ag^+}}\,a_{\mathrm{Cl^-}},
$$
只有在极稀的溶液中，离子的活度才等于它的浓度除以$c^\circ = 1\ \mathrm{mol\,dm^{-3}}$。在真实溶液中，每个离子周围平均都围绕着略为过量的异号离子——它的**离子氛**。离子氛降低了离子的能量（它被带相反电荷的近邻所稳定），因而降低了它的化学势和有效浓度。离子越多、电荷越高，离子氛就越密，效应就越大。

::: definition 活度、活度系数与离子强度 {#def-activity}
溶质型体$i$的**活度**为$a_i = \gamma_i\,[i]/c^\circ$，其中$[i]$是它的浓度，$\gamma_i$是它的**活度系数**（溶液无限稀释时$\gamma_i \to 1$）。溶液的**离子强度**为
$$
I = \frac{1}{2}\sum_i c_i z_i^2,
$$ {#eq-ionic-strength}
对全部离子求和，$c_i$是各离子的浓度，$z_i$是其电荷数。因子$z_i^2$使二价和三价离子的贡献分别是单价离子的四倍和九倍。中性分子没有贡献，一级近似下它们的活度系数为$1$。
:::

对$\mathrm{NaCl}$这样的$1{:}1$型电解质，$I = c$。对$0.010\ \mathrm{mol\,dm^{-3}}$的$\mathrm{MgSO_4}$，$I = \frac12(0.010\times4 + 0.010\times4) = 0.040\ \mathrm{mol\,dm^{-3}}$——是浓度的四倍。控制活度系数的是离子强度，而不是浓度。

::: proposition 德拜-休克尔方程 {#prop-debye-huckel}
对$25\ ^\circ\mathrm{C}$水中电荷数为$z$的离子，$I$以$\mathrm{mol\,dm^{-3}}$计：

1. **德拜-休克尔极限公式**，适用于$I \lesssim 0.001\ \mathrm{mol\,dm^{-3}}$：
$$
\log_{10}\gamma = -A z^2\sqrt{I}, \qquad A = 0.509 ;
$$ {#eq-dh-limiting}
2. 经验性的**达维（Davies）方程**，在$I \approx 0.1$–$0.5\ \mathrm{mol\,dm^{-3}}$内好用：
$$
\log_{10}\gamma = -A z^2\left(\frac{\sqrt{I}}{1+\sqrt{I}} - 0.3\,I\right) .
$$ {#eq-davies}

常数$A = 1.825\times10^{6}\,(\varepsilon_\mathrm{r}T)^{-3/2}$取决于溶剂的相对介电常数和温度；对$298.15\ \mathrm{K}$的水，$\varepsilon_\mathrm{r} = 78.5$给出$A = 0.509$。**扩展德拜-休克尔方程**$\log_{10}\gamma = -Az^2\sqrt{I}/(1 + B\mathring{a}\sqrt{I})$为每种离子带一个离子尺寸参数$\mathring{a}$；当可以查到离子尺寸的表值时，它是达维方程的一种替代。
:::

::: proof {collapsed}
**德拜-休克尔推导概要。**把电荷为$z_je$的某个离子固定在原点。它周围的电势$\phi(r)$服从泊松（Poisson）方程$\nabla^2\phi = -\rho/(\varepsilon_\mathrm{r}\varepsilon_0)$，其中电荷密度$\rho$来自其余的离子。每种离子$i$按玻尔兹曼（Boltzmann）定律分布，$c_i(r) = c_i\exp(-z_ie\phi/k_\mathrm{B}T)$，于是$\rho = \sum_i z_ie\,c_iN_\mathrm{A}\exp(-z_ie\phi/k_\mathrm{B}T)$。稀溶液中的指数很小；展开到一阶，零阶项由于电中性（$\sum c_iz_i = 0$）而消失，得到
$$
\nabla^2\phi = \kappa^2\phi, \qquad \kappa^2 = \frac{2e^2N_\mathrm{A}\,I}{\varepsilon_\mathrm{r}\varepsilon_0k_\mathrm{B}T}
$$
（其中$I$以单位体积的物质的量计）。离子强度通过$\sum_i c_iz_i^2 = 2I$进入此处。在无穷远处为零的球对称解是$\phi = (z_je/4\pi\varepsilon_\mathrm{r}\varepsilon_0)\,e^{-\kappa r}/r$：即在**德拜长度**$1/\kappa$上被屏蔽的库仑（Coulomb）势。减去裸离子的电势并令$r\to0$，剩下的是中心离子处离子氛的电势$-z_je\kappa/(4\pi\varepsilon_\mathrm{r}\varepsilon_0)$。在离子氛存在下给中心离子充电所需的功就是过量化学势，$\mu_j^\mathrm{ex} = k_\mathrm{B}T\ln\gamma_j = -z_j^2e^2\kappa/(8\pi\varepsilon_\mathrm{r}\varepsilon_0)$。由于$\kappa \propto \sqrt{I/(\varepsilon_\mathrm{r}T)}$，这就给出$\ln\gamma_j \propto -z_j^2\sqrt{I}\,(\varepsilon_\mathrm{r}T)^{-3/2}$，把常数归并起来（并换算成以$10$为底的对数和$\mathrm{mol\,dm^{-3}}$）即为[[#eq-dh-limiting]]。把离子当作有限半径的球而不是点，就得到扩展方程中的分母$1 + B\mathring{a}\sqrt{I}$。达维方程加上一个经验线性项来描述更高离子强度下$\gamma$的回升；它是对数据的拟合，不是推导。
:::

极限公式显示了本质的行为：$\log\gamma$随$\sqrt{I}$和$z^2$成比例下降。$I = 0.010\ \mathrm{mol\,dm^{-3}}$时，达维方程对单价离子给出$\gamma = 0.90$，对二价离子给出$0.66$，对三价离子给出$0.40$。$I = 0.10$时这些值为$0.78$、$0.37$和$0.11$。中等盐度溶液里的三价离子，其表现就好像只有十分之一的量存在一样。

::: widget plot
f: 10^(-0.509*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*4*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*9*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*sqrt(x))
x: 0, 0.5
y: 0, 1
labels: z=1 \text{（达维）}; z=2 \text{（达维）}; z=3 \text{（达维）}; z=1 \text{（极限公式）}
caption: $25\ ^\circ\mathrm{C}$下活度系数对离子强度$I$（以$\mathrm{mol\,dm^{-3}}$计）的曲线，电荷为$1$、$2$、$3$的离子由达维方程[[#eq-davies]]计算，并附上$z = 1$的德拜-休克尔极限公式[[#eq-dh-limiting]]以资比较。两条曲线只在最左端吻合；$I \approx 0.01$以上，极限公式下降得过于陡峭。达维曲线在$I \approx 0.3$以上变平并开始回升，这是一个真实的效应（离子水合束缚住了溶剂），方程只是粗略地把它抓住。注意$z = 3$的曲线降得多快：$\mathrm{Fe^{3+}}$、$\mathrm{PO_4^{3-}}$和$\mathrm{Al^{3+}}$即使在稀溶液中也严重偏离理想。
:::

::: example 混合电解质中的活度系数 {#ex-ionic-strength}
求一份含$0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$和$0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaCl}$的溶液的离子强度，并由达维方程求$\mathrm{Na^+}$和$\mathrm{SO_4^{2-}}$的活度系数。
::: solution
离子为：$\mathrm{Na^+}$ $2\times0.020 + 0.010 = 0.050$，$\mathrm{SO_4^{2-}}$ $0.020$，$\mathrm{Cl^-}$ $0.010\ \mathrm{mol\,dm^{-3}}$。由[[#eq-ionic-strength]]，
$$
I = \tfrac12\left(0.050\times1^2 + 0.020\times2^2 + 0.010\times1^2\right) = \tfrac12(0.050 + 0.080 + 0.010) = 0.070\ \mathrm{mol\,dm^{-3}} .
$$
于是$\sqrt{I} = 0.2646$，$\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.2092 - 0.0210 = 0.1882$。对$\mathrm{Na^+}$：$\log_{10}\gamma = -0.509\times0.1882 = -0.0958$，$\gamma = 0.80$。对$\mathrm{SO_4^{2-}}$：$\log_{10}\gamma = -4\times0.0958 = -0.383$，$\gamma = 0.41$。硫酸根"有效浓度"的一半以上被离子氛吞掉了。（在这一离子强度下达维方程准确到百分之几以内；$\gamma$取两位数字即可。）
:::
:::

### 盐效应对溶解度的影响

活度系数解释了引言中的第一个疑团。用活度表示时，氯化银的溶度积写作$K_\mathrm{sp} = \gamma_{\pm}^2[\mathrm{Ag^+}][\mathrm{Cl^-}]$，对$1{:}1$型盐使用平均活度系数$\gamma_\pm$。若溶解度为$s$，则$s = \sqrt{K_\mathrm{sp}}/\gamma_\pm$：惰性盐抬高$I$、压低$\gamma_\pm$，溶解度便*升高*。

::: example 硝酸钾中的氯化银 {#ex-salt-effect}
$25\ ^\circ\mathrm{C}$时$K_\mathrm{sp}(\mathrm{AgCl}) = 1.77\times10^{-10}$。比较氯化银在纯水中的溶解度与在$0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{KNO_3}$中的溶解度。
::: solution
纯水中，溶解出的离子给出$I \approx 10^{-5}$，所以$\gamma_\pm \approx 1$，$s = \sqrt{1.77\times10^{-10}} = 1.33\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。

在$0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{KNO_3}$中，$I = 0.050$（氯化银自身只贡献可忽略的$10^{-5}$）。达维方程：$\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.1827 - 0.0150 = 0.1677$，所以$\log_{10}\gamma_\pm = -0.0854$，$\gamma_\pm = 0.822$。于是
$$
s = \frac{\sqrt{K_\mathrm{sp}}}{\gamma_\pm} = \frac{1.33\times10^{-5}}{0.822} = 1.62\times10^{-5}\ \mathrm{mol\,dm^{-3}},
$$
比在水中多$22\ \%$。这对重量分析关系重大：用浓电解质溶液洗涤沉淀，溶掉的量比用稀溶液洗多，尽管防止胶溶（[[analytical-chemistry/classical-analysis]]）又需要这种电解质。
:::
:::

活度也解释了磷酸盐缓冲溶液。$\mathrm{H_2PO_4^-} \rightleftharpoons \mathrm{H^+} + \mathrm{HPO_4^{2-}}$的热力学常数为$K_{\mathrm{a}2} = a_\mathrm{H^+}\gamma_{\mathrm{HPO_4^{2-}}}[\mathrm{HPO_4^{2-}}]/(\gamma_{\mathrm{H_2PO_4^-}}[\mathrm{H_2PO_4^-}])$。pH电极响应（近似地）的是$a_\mathrm{H^+}$，所以两种阴离子浓度相等时
$$
\mathrm{pH} = \mathrm{p}K_{\mathrm{a}2} + \log_{10}\frac{\gamma_{\mathrm{HPO_4^{2-}}}}{\gamma_{\mathrm{H_2PO_4^-}}},
$$
而因为二价离子的$\gamma$更小，pH*低于*$\mathrm{p}K_{\mathrm{a}2}$。$I = 0.10$时，达维方程的数值给出$\log_{10}(0.373/0.782) = -0.32$，所以"pH 7.21"的缓冲溶液读数约为$6.89$。人们常把这类因子吸收进一个在某一指明离子强度下有效的**条件**（或浓度）常数$K'$——多数稳定常数表就是这个路子，其数值标明在例如$I = 0.1\ \mathrm{mol\,dm^{-3}}$下。

::: warning 活度不是可有可无的点缀 {#warn-activity}
人们很容易把活度校正当作无关紧要的细则。它们不是。在海水的离子强度（$I \approx 0.7$）、血浆（$I \approx 0.15$）或一次典型滴定（$0.05$–$0.1$）下，二价离子的活度系数远在$0.5$以下；忽视它们，算出的溶解度或自由离子浓度就会出错两倍甚至更多。相反的错误也很常见：在$I = 0.1$处套用极限公式，它把$\mathrm{Ca^{2+}}$的$\gamma$低估了近两倍（给出$0.23$；达维方程和实验值约为$0.37$）。极限公式只用在$I \approx 0.001$以下，达维方程或扩展方程用到约$0.1$–$0.5$，再往上则用特性相互作用模型或皮茨（Pitzer）模型。还要记住，pH计测的是（近似地）$-\log a_\mathrm{H^+}$，不是$-\log[\mathrm{H^+}]$。
:::

## 平衡的系统处理法

入门级的酸碱问题的解法是：猜出哪个反应占主导，写一张ICE表，事后再检查猜得是否合理。当一个平衡占绝对优势时这招管用。当好几个平衡彼此相当时——极稀的酸、两性物质盐、既水解又形成配合物的金属离子——猜就失灵了。系统处理法以记账取代猜测。

::: algorithm 平衡的系统处理法 {#alg-systematic}
1. 写出所有相关的反应，包括水的自递。
2. 写出**电荷平衡**：正电荷浓度之和等于负电荷之和，$\sum_i z_i[\mathrm{C}_i] = \sum_j \lvert z_j\rvert[\mathrm{A}_j]$，每个浓度乘以其电荷的绝对值。
3. 对每一种总量已知的元素或基团写**质量平衡**：总浓度等于包含它的所有型体的浓度之和。
4. 对每个反应写出平衡常数表达式（离子强度不可忽略时带上活度系数）。
5. 数一数：独立方程的数目必须等于未知浓度的数目。
6. 求解，或精确地（数值地）求解，或先作近似再解——然后对照解逐一检验每个近似。
:::

电荷平衡表达的是电中性：溶液不能带净电荷。二价离子的浓度要乘以$2$正是此意：一个$\mathrm{SO_4^{2-}}$离子平衡两个$\mathrm{Na^+}$离子。质量平衡表达的是守恒：投进烧瓶的磷还在那里，只是分布在$\mathrm{H_3PO_4}$、$\mathrm{H_2PO_4^-}$、$\mathrm{HPO_4^{2-}}$和$\mathrm{PO_4^{3-}}$之间。

::: example 极稀的强酸 {#ex-dilute-hcl}
求$25\ ^\circ\mathrm{C}$下$1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$的pH（$K_\mathrm{w} = 1.0\times10^{-14}$）。
::: solution
幼稚的答案$\mathrm{pH} = 8.0$描述的是往水里加酸得到的碱性溶液——不可能。系统处理法：

- 反应：$\mathrm{HCl} \rightarrow \mathrm{H^+} + \mathrm{Cl^-}$（完全）；$\mathrm{H_2O} \rightleftharpoons \mathrm{H^+} + \mathrm{OH^-}$。
- 电荷平衡：$[\mathrm{H^+}] = [\mathrm{Cl^-}] + [\mathrm{OH^-}]$。
- 质量平衡：$[\mathrm{Cl^-}] = 1.0\times10^{-8}$。
- 平衡：$[\mathrm{H^+}][\mathrm{OH^-}] = K_\mathrm{w}$（这一离子强度下活度系数为$1$）。

三个未知数，三个方程。代入得$[\mathrm{H^+}] = 1.0\times10^{-8} + K_\mathrm{w}/[\mathrm{H^+}]$，即$[\mathrm{H^+}]^2 - 1.0\times10^{-8}[\mathrm{H^+}] - 1.0\times10^{-14} = 0$，其正根为
$$
[\mathrm{H^+}] = \frac{1.0\times10^{-8} + \sqrt{(1.0\times10^{-8})^2 + 4.0\times10^{-14}}}{2} = 1.05\times10^{-7}\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 6.98 .
$$
这里大部分$\mathrm{H^+}$来自水，加入的酸只是略微压制了水自身的解离。（实际操作中，空气中的二氧化碳会使敞口溶液比这更酸。）
:::
:::

## 多元体系的分布分数

对多元酸，仅凭质量平衡和平衡常数就能固定各型体在给定$[\mathrm{H^+}]$下的*比例*，与总浓度无关。这些比例就是分布分数。

::: proposition 多元酸的分布分数 {#prop-alpha}
设酸$\mathrm{H}_n\mathrm{A}$的逐级酸解离常数为$K_1, K_2, \dots, K_n$，总（形式）浓度为$F$。以失去$j$个质子的型体存在的酸的分数$\alpha_j = [\mathrm{H}_{n-j}\mathrm{A}^{j-}]/F$为
$$
\alpha_j = \frac{[\mathrm{H^+}]^{n-j}\,K_1K_2\cdots K_j}{D}, \qquad D = \sum_{k=0}^{n}[\mathrm{H^+}]^{n-k}\,K_1\cdots K_k ,
$$ {#eq-alpha}
其中空积（$k = 0$）等于$1$。对二元酸，
$$
\alpha_{\mathrm{H_2A}} = \frac{[\mathrm{H^+}]^2}{D}, \quad \alpha_{\mathrm{HA^-}} = \frac{K_1[\mathrm{H^+}]}{D}, \quad \alpha_{\mathrm{A^{2-}}} = \frac{K_1K_2}{D}, \quad D = [\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2 .
$$
各分数之和为$1$，只取决于pH；两种相邻型体在$\mathrm{pH} = \mathrm{p}K_j$时相等。
:::

::: proof
由逐级平衡，每种型体都可用完全质子化的型体表示：$[\mathrm{H}_{n-1}\mathrm{A}^-] = K_1[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]$，$[\mathrm{H}_{n-2}\mathrm{A}^{2-}] = K_1K_2[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]^2$，一般地$[\mathrm{H}_{n-j}\mathrm{A}^{j-}] = K_1\cdots K_j[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]^j$。质量平衡$F = \sum_j[\mathrm{H}_{n-j}\mathrm{A}^{j-}]$于是给出
$$
F = [\mathrm{H}_n\mathrm{A}]\sum_{k=0}^n \frac{K_1\cdots K_k}{[\mathrm{H^+}]^k} .
$$
每种型体除以$F$，再把分子分母同乘$[\mathrm{H^+}]^n$即得[[#eq-alpha]]。由于诸分子正是$D$的各项，分数之和为$1$。相邻的$j-1$与$j$两型体相等，当$[\mathrm{H^+}]^{n-j+1}K_1\cdots K_{j-1} = [\mathrm{H^+}]^{n-j}K_1\cdots K_j$，即$[\mathrm{H^+}] = K_j$。
:::

::: widget plot
f: 1/(1+10^(x-p1)+10^(2*x-p1-p2)); 10^(x-p1)/(1+10^(x-p1)+10^(2*x-p1-p2)); 10^(2*x-p1-p2)/(1+10^(x-p1)+10^(2*x-p1-p2))
x: 0, 14
y: 0, 1
sliders: p1=6.35:0:14:0.05; p2=10.33:0:14:0.05
labels: \alpha_{\mathrm{H_2A}}; \alpha_{\mathrm{HA^-}}; \alpha_{\mathrm{A^{2-}}}
caption: 由[[#eq-alpha]]计算的二元酸分布分数对pH（$x$）的曲线。滑块设定$\mathrm{p}K_1$和$\mathrm{p}K_2$；默认值是碳酸的（$6.35$和$10.33$），曲线因此显示出为什么pH 7–8.5的天然水体中的无机碳几乎全部以碳酸氢根的形式存在。相邻曲线在$\mathrm{pH} = \mathrm{p}K$处、$\alpha = 0.5$时相交。把$\mathrm{p}K_2$移近$\mathrm{p}K_1$，中间型体就永远无法占主导——其峰值低于$0.5$——这就是滴定中两个靠得很近的终点无法分辨的原因（[[analytical-chemistry/classical-analysis]]）。
:::

::: example 生理pH下的磷酸盐 {#ex-phosphate-alpha}
磷酸的$\mathrm{p}K_1 = 2.16$、$\mathrm{p}K_2 = 7.21$、$\mathrm{p}K_3 = 12.32$（$25\ ^\circ\mathrm{C}$的热力学值，CRC手册）。求$\mathrm{pH}\ 7.40$下四种型体的分数，把浓度当作活度处理。
::: solution
取$[\mathrm{H^+}] = 10^{-7.40} = 3.98\times10^{-8}$，$K_1 = 6.92\times10^{-3}$，$K_2 = 6.17\times10^{-8}$，$K_3 = 4.79\times10^{-13}$，$D$的四项为
$$
\begin{aligned}
[\mathrm{H^+}]^3 &= 6.31\times10^{-23}, & K_1[\mathrm{H^+}]^2 &= 1.097\times10^{-17},\\
K_1K_2[\mathrm{H^+}] &= 1.699\times10^{-17}, & K_1K_2K_3 &= 2.04\times10^{-22},
\end{aligned}
$$
相加得$D = 2.795\times10^{-17}$。于是$\alpha_{\mathrm{H_3PO_4}} = 2.3\times10^{-6}$，$\alpha_{\mathrm{H_2PO_4^-}} = 0.392$，$\alpha_{\mathrm{HPO_4^{2-}}} = 0.608$，$\alpha_{\mathrm{PO_4^{3-}}} = 7.3\times10^{-6}$。只有其$\mathrm{p}K$恰好夹住该pH的两种型体要紧；其余可以忽略。一条捷径可以印证：$[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = 10^{7.40-7.21} = 1.55$，而$1.55/2.55 = 0.608$。在血液的离子强度下，条件$\mathrm{p}K_2$约为$6.9$，真实的比值更接近$3$——这又是一处活度要紧的地方。
:::
:::

## 混合物：让平衡式发挥作用

$\alpha$函数使电荷平衡成为关于$[\mathrm{H^+}]$的一个方程。考虑形式浓度$F$的两性物质盐$\mathrm{NaH_2PO_4}$溶液。电荷平衡为
$$
[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{OH^-}] + [\mathrm{H_2PO_4^-}] + 2[\mathrm{HPO_4^{2-}}] + 3[\mathrm{PO_4^{3-}}],
$$
取$[\mathrm{Na^+}] = F$并把每种磷酸盐型体写成$\alpha_jF$，得
$$
F + [\mathrm{H^+}] - \frac{K_\mathrm{w}}{[\mathrm{H^+}]} - F\left(\alpha_1 + 2\alpha_2 + 3\alpha_3\right) = 0 .
$$ {#eq-charge-balance-phosphate}
每个$\alpha_j$都是$[\mathrm{H^+}]$的已知函数，所以这是一个单未知数方程——手算别扭，计算机上轻而易举。同样的模式能处理任何混合物：对每个酸碱体系加上其$\alpha$加权的电荷；对每种强电解质加上其固定的离子浓度。

::: proposition 两性物质的pH {#prop-amphiprotic}
设二元酸的中间型体$\mathrm{HA^-}$（以$\mathrm{NaHA}$形式存在）的形式浓度为$F$，若除水的反应之外，进一步解离为$\mathrm{A^{2-}}$和质子化为$\mathrm{H_2A}$是仅有的重要反应，则
$$
[\mathrm{H^+}] = \sqrt{\frac{K_1K_2F + K_1K_\mathrm{w}}{K_1 + F}} ,
$$ {#eq-amphiprotic}
只有当$F \gg K_1$且$K_2F \gg K_\mathrm{w}$时，它才化简为$\mathrm{pH} \approx \tfrac12(\mathrm{p}K_1 + \mathrm{p}K_2)$。
:::

::: proof
电荷平衡：$[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{HA^-}] + 2[\mathrm{A^{2-}}] + [\mathrm{OH^-}]$。质量平衡：$[\mathrm{Na^+}] = F = [\mathrm{H_2A}] + [\mathrm{HA^-}] + [\mathrm{A^{2-}}]$。电荷平衡减去质量平衡消去$[\mathrm{Na^+}]$：
$$
[\mathrm{H^+}] + [\mathrm{H_2A}] = [\mathrm{A^{2-}}] + [\mathrm{OH^-}],
$$
即**质子条件**：得到的质子（水得到质子生成$\mathrm{H^+}$，$\mathrm{HA^-}$得到质子生成$\mathrm{H_2A}$）等于失去的质子。代入$[\mathrm{H_2A}] = [\mathrm{H^+}][\mathrm{HA^-}]/K_1$、$[\mathrm{A^{2-}}] = K_2[\mathrm{HA^-}]/[\mathrm{H^+}]$和$[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$，再乘以$K_1[\mathrm{H^+}]$：
$$
[\mathrm{H^+}]^2\left(K_1 + [\mathrm{HA^-}]\right) = K_1K_2[\mathrm{HA^-}] + K_1K_\mathrm{w} .
$$
因为$\mathrm{HA^-}$既是弱酸又是弱碱，它很少反应；令$[\mathrm{HA^-}] \approx F$即得[[#eq-amphiprotic]]。当$F \gg K_1$时分母就是$F$；当$K_2F \gg K_\mathrm{w}$时分子第二项可忽略，剩下$[\mathrm{H^+}]^2 = K_1K_2$。
:::

::: example 磷酸二氢钠：捷径何时失效 {#ex-amphiprotic}
用[[#ex-phosphate-alpha]]中的常数、忽略活度，求$0.010\ \mathrm{mol\,dm^{-3}}$和$0.0010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaH_2PO_4}$的pH。与$\tfrac12(\mathrm{p}K_1 + \mathrm{p}K_2) = 4.69$比较。
::: solution
$F = 0.010$时：$K_1K_2F = 6.92\times10^{-3}\times6.17\times10^{-8}\times0.010 = 4.27\times10^{-12}$，$K_1K_\mathrm{w} = 6.9\times10^{-17}$（可忽略），$K_1 + F = 0.01692$。于是
$$
[\mathrm{H^+}] = \sqrt{\frac{4.27\times10^{-12}}{0.01692}} = 1.59\times10^{-5}, \qquad \mathrm{pH} = 4.80 .
$$
$F = 0.0010$时：$[\mathrm{H^+}] = \sqrt{4.27\times10^{-13}/0.00792} = 7.34\times10^{-6}$，$\mathrm{pH} = 5.13$。

数值求解完整电荷平衡[[#eq-charge-balance-phosphate]]给出$4.80$和$5.14$：这个公式很好，但捷径$4.69$分别错了$0.1$和$0.45$个pH单位。捷径假定$F \gg K_1$，而磷酸的$K_1 = 6.9\times10^{-3}$与$F$相当：相当一部分$\mathrm{H_2PO_4^-}$被质子化为$\mathrm{H_3PO_4}$，这消耗$\mathrm{H^+}$、抬高pH。
:::
:::

::: widget newton
f: 0.010 + 10^(-x) - 1e-14*10^x - 0.010*(6.918e-3*10^(-2*x) + 2*6.918e-3*6.166e-8*10^(-x) + 3*6.918e-3*6.166e-8*4.786e-13)/(10^(-3*x) + 6.918e-3*10^(-2*x) + 6.918e-3*6.166e-8*10^(-x) + 6.918e-3*6.166e-8*4.786e-13)
method: bisection
x0: 3
x1: 7
steps: 30
caption: 对$0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaH_2PO_4}$的电荷平衡[[#eq-charge-balance-phosphate]]作二分法，它被写成$x = \mathrm{pH}$的函数（其中的分数即[[#eq-alpha]]给出的$\alpha_1 + 2\alpha_2 + 3\alpha_3$）。从区间$3 < \mathrm{pH} < 7$出发，每步区间减半，收拢到$\mathrm{pH} = 4.80$。对电荷平衡来说，二分法是稳妥的选择：函数恰好变号一次，但它太陡（浓度横跨许多个数量级），起点不好的牛顿法可能严重过冲。
:::

系统处理法原封不动地扩展到耦合的溶解平衡与配位平衡。对氨水溶液中的氯化银，银的质量平衡要包括$\mathrm{Ag^+}$、$\mathrm{Ag(NH_3)^+}$和$\mathrm{Ag(NH_3)_2^+}$，氯的质量平衡说明所有溶解的氯都来自固体，常数则是$K_\mathrm{sp}$与累积形成常数$\beta_1$、$\beta_2$。金属-配体体系同样有$\alpha$函数——金属以各种配合物存在的分数只取决于自由配体浓度——而EDTA以完全去质子的$\mathrm{Y^{4-}}$形式存在的分数$\alpha_{\mathrm{Y^{4-}}}$，是[[analytical-chemistry/classical-analysis]]中配位滴定的关键。

::: quiz
关于$0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{CaCl_2}$与$0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$混合溶液的电荷平衡（忽略水解和离子对），哪种说法正确？
- [ ] $[\mathrm{Ca^{2+}}] + [\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{Cl^-}] + [\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [x] $2[\mathrm{Ca^{2+}}] + [\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{Cl^-}] + 2[\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [ ] $[\mathrm{Ca^{2+}}] + 2[\mathrm{Na^+}] + [\mathrm{H^+}] = 2[\mathrm{Cl^-}] + [\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [ ] 两种盐都是电中性的，所以不需要电荷平衡。
::: solution
每个浓度都乘以其离子电荷的绝对值：一摩尔$\mathrm{Ca^{2+}}$带有两摩尔正电荷。代入数字：左边$0.020 + 0.040 = 0.060$，右边$0.020 + 0.040 = 0.060$（再加上微小而相等的$\mathrm{H^+}$和$\mathrm{OH^-}$）。第三个选项把盐的化学计量系数与离子的电荷混为一谈。电荷平衡永远成立，而且常常是整个方程组中最有用的一个方程。
:::
:::

## 对数浓度图

$\alpha$曲线在普通刻度上显示比例，百分之几以下的一切都被藏了起来。要判断电荷平衡中哪些项可以丢掉，**对数浓度图**（西伦图，Sillén diagram）更好：对固定的形式浓度，把每种型体浓度的$\log_{10}$对pH作图。每条曲线都由近乎笔直的线段拼成。对形式浓度$F$的一元酸HA，$[\mathrm{HA}] = F\,[\mathrm{H^+}]/([\mathrm{H^+}] + K_\mathrm{a})$：在$\mathrm{pH} = \mathrm{p}K_\mathrm{a}$以下它几乎是$F$（一条水平线），在其上$\log[\mathrm{HA}]$以每个pH单位$-1$的斜率下降。$[\mathrm{A^-}]$的曲线与它成镜像。直线$\log[\mathrm{H^+}] = -\mathrm{pH}$和$\log[\mathrm{OH^-}] = \mathrm{pH} - 14$是笔直的对角线。

这种图把一个方程变成一幅图。对纯酸的溶液，质子条件是$[\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$。酸性溶液中$[\mathrm{OH^-}]$可忽略，所以pH就在$\log[\mathrm{H^+}]$线与$\log[\mathrm{A^-}]$曲线相交的地方。对纯碱NaA的溶液，质子条件是$[\mathrm{H^+}] + [\mathrm{HA}] = [\mathrm{OH^-}]$，pH就在$\log[\mathrm{HA}]$与$\log[\mathrm{OH^-}]$相交的地方。读出交点，看清被忽略的型体在交点以下多远，是检验[[#alg-systematic]]中那些近似的快捷而诚实的办法。

::: widget plot
f: log10(F*10^(-x)/(10^(-x)+10^(-pKa))); log10(F*10^(-pKa)/(10^(-x)+10^(-pKa))); -x; x-14
x: 0, 14
y: -12, 0
sliders: F=0.01:0.0001:0.1:0.0001; pKa=4.76:2:12:0.01
labels: \log[\mathrm{HA}]; \log[\mathrm{A^-}]; \log[\mathrm{H^+}]; \log[\mathrm{OH^-}]
caption: 一元酸的对数浓度图，形式浓度$F$（以$\mathrm{mol\,dm^{-3}}$计）与$\mathrm{p}K_\mathrm{a}$由滑块设定；默认值描述$0.010\ \mathrm{mol\,dm^{-3}}$的乙酸。只有酸的溶液落在$\log[\mathrm{H^+}]$线与$\log[\mathrm{A^-}]$曲线相交的地方附近，约pH $3.4$（[[#ex-log-diagram]]）；只有钠盐的溶液落在$\log[\mathrm{HA}]$与$\log[\mathrm{OH^-}]$相交的地方附近，约pH $8.4$。调小$F$，两个点都向$7$移去；把$\mathrm{p}K_\mathrm{a}$升到$9$附近，看酸的交点如何趋近水的自身$\mathrm{H^+}$不再能被忽略的区域。
:::

::: example 读一张对数浓度图 {#ex-log-diagram}
用$0.010\ \mathrm{mol\,dm^{-3}}$乙酸（$\mathrm{p}K_\mathrm{a} = 4.76$）的对数浓度图求该酸溶液的pH，并检验近似。
::: solution
在$\mathrm{pH} < \mathrm{p}K_\mathrm{a}$的区域，$\log[\mathrm{HA}] \approx \log F = -2.00$，$\log[\mathrm{A^-}] \approx \log F + \mathrm{pH} - \mathrm{p}K_\mathrm{a} = \mathrm{pH} - 6.76$。令其等于$\log[\mathrm{H^+}] = -\mathrm{pH}$，得$2\,\mathrm{pH} = 6.76$，$\mathrm{pH} = 3.38$。该pH下$\log[\mathrm{OH^-}] = -10.62$，比$\log[\mathrm{A^-}] = -3.38$低七个单位以上：丢掉$[\mathrm{OH^-}]$是合理的。精确的二次方程$[\mathrm{H^+}]^2 + K_\mathrm{a}[\mathrm{H^+}] - K_\mathrm{a}F = 0$给出$\mathrm{pH} = 3.39$；小小的差值来自已解离的那$4\ \%$的酸，直线近似$[\mathrm{HA}] = F$把它们忽略了。
:::
:::

## 副反应与条件常数

在分析中我们通常只关心某一个平衡——一次沉淀、一次配合物的形成——而别的平衡在争夺同一种型体。沉淀钙的草酸根也可能被质子化；本应由EDTA配位的金属离子也可能被缓冲溶液的氨抓住。与其每次都解完整的体系，不如把竞争反应归并成一个数。

::: definition 副反应系数与条件常数 {#def-conditional}
若型体X参与主反应，却又因**副反应**（质子化、被辅助配体配位、水解）而分布在其他存在形式中，设$[\mathrm{X}']$为未参与主反应的X的总浓度。**副反应系数**为
$$
\alpha_\mathrm{X} = \frac{[\mathrm{X}']}{[\mathrm{X}]} \ge 1
$$
（于是$1/\alpha_\mathrm{X}$就是以反应型体存在的分数）。对带有辅助配体L的金属离子M，$\alpha_\mathrm{M} = 1 + \beta_1[\mathrm{L}] + \beta_2[\mathrm{L}]^2 + \cdots$。**条件常数**是用带撇浓度写出的主常数；对溶度积，$K_\mathrm{sp}' = [\mathrm{M}'][\mathrm{A}'] = K_\mathrm{sp}\,\alpha_\mathrm{M}\alpha_\mathrm{A}$。它只在固定的pH和固定的辅助配体浓度下才是常数。
:::

注意并存的两种约定：[[#prop-alpha]]的$\alpha_j$是*分数*（至多$1$），而林博姆（Ringbom）的副反应系数是它们的*倒数*（至少$1$）。对草酸二价阴离子，$\alpha_{\mathrm{C_2O_4}}(\text{副反应}) = 1/\alpha_{\mathrm{C_2O_4^{2-}}}(\text{分数})$。两种约定在教材中都有出现；查表时要弄清它用的是哪一种。

::: example 酸中的草酸钙 {#ex-oxalate}
草酸钙的$K_\mathrm{sp} \approx 2.3\times10^{-9}$（一个代表性数值；文献值随水合状态而异），草酸的$\mathrm{p}K_1 = 1.25$、$\mathrm{p}K_2 = 4.27$。求$\mathrm{pH}\ 7.00$、$4.00$和$2.00$（由缓冲溶液固定）下草酸钙的溶解度，忽略活度。
::: solution
设溶解度为$s$。则$[\mathrm{Ca^{2+}}] = s$，溶解的草酸根总量也是$s$，其中分数$\alpha_{\mathrm{C_2O_4^{2-}}} = K_1K_2/([\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2)$的部分是二价阴离子。于是$K_\mathrm{sp} = s\cdot\alpha s$，$s = \sqrt{K_\mathrm{sp}/\alpha}$。

- $\mathrm{pH}\ 7.00$：$\alpha = 0.998$，$s = 4.8\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。
- $\mathrm{pH}\ 4.00$：$\alpha = 0.349$，$s = 8.1\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。
- $\mathrm{pH}\ 2.00$：$\alpha = 4.54\times10^{-3}$，$s = 7.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$。

条件溶度积$K_\mathrm{sp}' = K_\mathrm{sp}/\alpha$从pH 7到pH 2增大约$220$倍。这就是为什么钙要从热、酸的溶液中沉淀为草酸盐、然后再用氨慢慢中和（低过饱和度下的缓慢沉淀给出更大、更纯的晶体），也是为什么沉淀绝不能用酸洗涤的原因。
:::
:::

## 后续内容

这些工具是本课程中每一种基于平衡的方法的基础。带活度校正的沉淀平衡、EDTA的分布分数与条件形成常数、以及酸碱、配位和氧化还原滴定曲线的形状，都在[[analytical-chemistry/classical-analysis]]中展开。活度在电位分析法中重新登场，因为电极响应的是活度而不是浓度（[[analytical-chemistry/electroanalytical]]）。两相体系中的分配平衡到[[analytical-chemistry/chromatography]]中成为保留的理论。天然水体——环境中的碳酸盐体系、金属形态与溶解度——见[[environmental-chemistry/natural-waters]]，活度系数背后的热力学见[[thermodynamics/ions-in-solution]]。

::: history
路易斯（Lewis）引入了*活度*（1907）和*离子强度*（与梅尔·兰德尔（Randall）合作，1921）这两个术语，使热力学对真实溶液管用。彼得·德拜（Debye）和埃里希·休克尔（Hückel）于1923年在*Physikalische Zeitschrift*上发表了他们的离子氛理论，解释了弗里德里希·科尔劳施（Kohlrausch）早先在电导中经验发现的对浓度的平方根依赖。塞西尔·达维（Davies）于1938年提出了他的经验性扩展。在酸碱工作方面，尼尔斯·比耶鲁姆（Bjerrum）1914年对两性电解质的处理引入了我们现在画成$\alpha$曲线的分布图，拉尔斯·古纳尔·西伦（Sillén）在20世纪50年代发展了用于平衡计算的图解对数浓度图。西伦与阿瑟·马特尔（Martell）编纂的稳定常数表（*Stability Constants of Metal-Ion Complexes*，1964）至今仍是分析用平衡数据的基石。
:::

::: summary
- 平衡常数以活度$a_i = \gamma_i[i]/c^\circ$表述才是精确的；活度系数随离子强度$I = \frac12\sum c_iz_i^2$下降，高电荷离子下降得快得多。
- 德拜-休克尔极限公式$\log\gamma = -0.509z^2\sqrt{I}$（25 °C）在$I \approx 0.001$以下成立；达维方程可延伸到$I \approx 0.1$–$0.5$。
- 惰性盐抬高难溶盐的溶解度（盐效应），并使缓冲溶液的pH偏离其$\mathrm{p}K_\mathrm{a}$；条件常数在指明的$I$下把这些效应吸收进去。
- 系统处理法——反应、电荷平衡、质量平衡、常数、数方程、求解——对任何混合物都适用；近似在之后作出并加以检验。
- 多元酸的分布分数$\alpha_j$只取决于pH；相邻型体在$\mathrm{pH} = \mathrm{p}K_j$处相等。
- 两性物质公式$[\mathrm{H^+}] = \sqrt{(K_1K_2F + K_1K_\mathrm{w})/(K_1+F)}$可靠；捷径$\tfrac12(\mathrm{p}K_1+\mathrm{p}K_2)$在$F$不比$K_1$大得多时失灵。
- 用$\alpha$函数写出的电荷平衡把任何酸碱混合物化为关于$[\mathrm{H^+}]$的一个方程，数值上以二分法求解最稳妥。
:::

## 习题

::: exercise 离子强度 {level=1 check="0.021"}
计算含有$0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{K_2SO_4}$和$0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{MgCl_2}$的溶液的离子强度。（以$\mathrm{mol\,dm^{-3}}$输入$I$。）
::: solution
离子：$\mathrm{K^+}$ $0.010$，$\mathrm{SO_4^{2-}}$ $0.0050$，$\mathrm{Mg^{2+}}$ $0.0020$，$\mathrm{Cl^-}$ $0.0040\ \mathrm{mol\,dm^{-3}}$。于是$I = \frac12(0.010\times1 + 0.0050\times4 + 0.0020\times4 + 0.0040\times1) = \frac12(0.042) = 0.021\ \mathrm{mol\,dm^{-3}}$。
:::
:::

::: exercise 活度系数 {level=1 check="0.66"}
用达维方程求$I = 0.010\ \mathrm{mol\,dm^{-3}}$、$25\ ^\circ\mathrm{C}$下$\mathrm{Ca^{2+}}$的活度系数。极限公式给出什么？（输入达维方程的值。）
::: solution
$\sqrt{I} = 0.100$；$\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.0909 - 0.0030 = 0.0879$；$\log_{10}\gamma = -0.509\times4\times0.0879 = -0.179$；$\gamma = 0.66$。极限公式给出$\log_{10}\gamma = -0.509\times4\times0.100 = -0.204$，$\gamma = 0.63$——在这一不大的离子强度下就已经偏低$5\ \%$。
:::
:::

::: exercise 碳酸盐的形态分布 {level=1 check="0.980"}
碳酸的$\mathrm{p}K_1 = 6.35$、$\mathrm{p}K_2 = 10.33$，问$\mathrm{pH}\ 8.30$下溶解无机碳中以$\mathrm{HCO_3^-}$存在的分数是多少？（输入$\alpha_{\mathrm{HCO_3^-}}$。）
::: solution
取$h = 10^{-8.30}$：$D/h^2 = 1 + 10^{8.30-6.35} + 10^{16.60-16.68} = 1 + 89.1 + 0.832 = 90.9$。所以$\alpha_{\mathrm{HCO_3^-}} = 89.1/90.9 = 0.980$，而$\alpha_{\mathrm{H_2CO_3}} = 0.011$、$\alpha_{\mathrm{CO_3^{2-}}} = 0.009$。pH 8.3正是碳酸氢根峰值所在——碳酸盐滴定的酚酞终点。
:::
:::

::: exercise 极稀的碱 {level=2 check="7.11"}
求$25\ ^\circ\mathrm{C}$下$5.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$的pH。（输入pH。）
::: solution
电荷平衡$[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{OH^-}]$，其中$[\mathrm{Na^+}] = 5.0\times10^{-8}$、$[\mathrm{H^+}] = K_\mathrm{w}/[\mathrm{OH^-}]$：$[\mathrm{OH^-}]^2 - 5.0\times10^{-8}[\mathrm{OH^-}] - 1.0\times10^{-14} = 0$，所以$[\mathrm{OH^-}] = (5.0\times10^{-8} + \sqrt{2.5\times10^{-15} + 4.0\times10^{-14}})/2 = 1.28\times10^{-7}$，$\mathrm{pOH} = 6.89$，$\mathrm{pH} = 7.11$（不是幼稚答案$6.7$）。
:::
:::

::: exercise 碳酸氢钠 {level=2 check="8.34"}
由[[#eq-amphiprotic]]求$0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaHCO_3}$的pH（常数同倒数第二道习题），并解释为什么pH值的简单平均在这里管用，对$\mathrm{NaH_2PO_4}$却失败了。（输入pH。）
::: solution
$K_1 = 4.47\times10^{-7}$，$K_2 = 4.68\times10^{-11}$。$K_1K_2F = 1.04\times10^{-18}$，$K_1K_\mathrm{w} = 4.5\times10^{-21}$，$K_1 + F \approx 0.050$。$[\mathrm{H^+}] = \sqrt{(1.04\times10^{-18} + 0.0045\times10^{-18})/0.050} = 4.58\times10^{-9}$，$\mathrm{pH} = 8.34$，与$\tfrac12(6.35 + 10.33) = 8.34$相同。两个条件都满足得很宽裕：$F = 0.050 \gg K_1 = 4.5\times10^{-7}$且$K_2F = 2.3\times10^{-12} \gg K_\mathrm{w}$。而对$\mathrm{NaH_2PO_4}$，$K_1$与$F$相当。
:::
:::

::: exercise 盐效应对硫酸钡的作用 {level=2 check="2.68"}
硫酸钡在$0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaCl}$中的溶解度是它在纯水中溶解度的多少倍？用达维方程，并忽略硫酸钡自身对$I$的贡献。（输入倍数。）
::: solution
在水中$\gamma \approx 1$，$s_0 = \sqrt{K_\mathrm{sp}}$。在盐溶液中，$s = \sqrt{K_\mathrm{sp}}/\gamma_\pm$，$\gamma_\pm$按$z = 2$、$I = 0.10$计：$\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.2403 - 0.0300 = 0.2103$；$\log_{10}\gamma = -0.509\times4\times0.2103 = -0.428$；$\gamma = 0.373$。倍数为$1/0.373 = 2.68$。二价离子受影响之剧，远甚于[[#ex-salt-effect]]中$1{:}1$型的情形。
:::
:::

::: exercise 等浓度磷酸盐缓冲溶液的真实pH {level=3 check="6.89"}
一份等浓度的$\mathrm{NaH_2PO_4}$/$\mathrm{Na_2HPO_4}$缓冲溶液用$\mathrm{NaCl}$调至$I = 0.10\ \mathrm{mol\,dm^{-3}}$。用$\mathrm{p}K_2 = 7.21$和达维方程，预言pH计（它测的是$-\log_{10}a_\mathrm{H^+}$）的读数。再预言：若"pH"的定义改为$-\log_{10}[\mathrm{H^+}]$、其中$\gamma_\mathrm{H^+}$取自达维方程，那么在同一介质中$[\mathrm{H_2PO_4^-}] = [\mathrm{HPO_4^{2-}}]$是在什么pH达到的。（输入pH计的读数。）
::: hint
把$K_2$用活度写出，对pH计保留$a_\mathrm{H^+}$原样不动。第二问用$a_\mathrm{H^+} = \gamma_1[\mathrm{H^+}]$。
:::
::: solution
$K_2 = a_\mathrm{H^+}\gamma_2[\mathrm{HPO_4^{2-}}]/(\gamma_1[\mathrm{H_2PO_4^-}])$。两种离子浓度相等时，$-\log a_\mathrm{H^+} = \mathrm{p}K_2 + \log_{10}(\gamma_2/\gamma_1)$。$I = 0.10$时：$\gamma_1 = 0.782$，$\gamma_2 = 0.373$，$\log_{10}(0.373/0.782) = -0.322$。pH计读数：$7.21 - 0.32 = 6.89$。

浓度标度方面，$a_\mathrm{H^+} = \gamma_1[\mathrm{H^+}]$，所以$-\log[\mathrm{H^+}] = -\log a_\mathrm{H^+} + \log\gamma_1 = 6.89 - 0.107 = 6.78$；等价地说，浓度常数为$\mathrm{p}K_2' = \mathrm{p}K_2 + \log_{10}\gamma_2 = 6.78$（取$\gamma_\mathrm{H^+} = \gamma_1$）。同一份溶液上相差$0.1$的两个"pH"标度说明：任何严谨的工作都必须把约定说清楚。
:::
:::

::: exercise 氨水中的氯化银 {level=3 check="0.00479"}
求$0.10\ \mathrm{mol\,dm^{-3}}$氨水溶液中$\mathrm{AgCl}$的溶解度。取$K_\mathrm{sp} = 1.77\times10^{-10}$，$\mathrm{Ag^+} + 2\,\mathrm{NH_3} \rightleftharpoons \mathrm{Ag(NH_3)_2^+}$的$\beta_2 = 10^{7.20}$；设$\mathrm{Ag(NH_3)_2^+}$是占主导的银型体，忽略氨的质子和活度系数。然后检验这些假设。（溶解度以$\mathrm{mol\,dm^{-3}}$输入，保留三位有效数字。）
::: hint
质量平衡：$[\mathrm{Cl^-}] = s \approx [\mathrm{Ag(NH_3)_2^+}]$，$[\mathrm{NH_3}] = 0.10 - 2s$。总反应$\mathrm{AgCl(s)} + 2\,\mathrm{NH_3} \rightleftharpoons \mathrm{Ag(NH_3)_2^+} + \mathrm{Cl^-}$的$K = K_\mathrm{sp}\beta_2$。
:::
::: solution
$K = 1.77\times10^{-10}\times1.585\times10^{7} = 2.81\times10^{-3}$。于是$s^2/(0.10 - 2s)^2 = K$，所以$s/(0.10 - 2s) = \sqrt{K} = 0.0530$，
$$
s = \frac{0.10\times0.0530}{1 + 2\times0.0530} = 4.79\times10^{-3}\ \mathrm{mol\,dm^{-3}} .
$$
检验：自由$[\mathrm{Ag^+}] = K_\mathrm{sp}/s = 3.7\times10^{-8}$，与$s$相比可忽略；$[\mathrm{Ag(NH_3)^+}] = \beta_1[\mathrm{Ag^+}][\mathrm{NH_3}]$（$\beta_1 \approx 10^{3.3}$）约为$7\times10^{-6}$，同样可忽略（把它计入，$s$改变不到$0.1\ \%$）。溶解度是水中的$360$倍——这就是经典定性分析中把氯化银与碘化银分离的基础。忽略$\mathrm{NH_4^+}$的生成没有妨碍，因为$0.10\ \mathrm{mol\,dm^{-3}}$的氨大约只有$1\ \%$被质子化。
:::
:::
