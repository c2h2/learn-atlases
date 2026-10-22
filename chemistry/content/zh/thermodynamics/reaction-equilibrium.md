凡是平衡常数为有限值的反应，都是一种等待兑现的折中。氢气与氮气在室温下同处一器，百年也不会生成氨；可一旦加热到$500\,\mathrm{K}$、加压到十个巴、再放入锇作催化剂，它们便迅速反应起来——不过当混合物中氨的含量分数达到约百分之四十四时，净反应就停止了，尽管两个方向都丝毫没有停下来的意思。为什么*恰好是*这个组成？为什么冷却、压缩或用氩气稀释之后，这个组成就会移动？而同样一个问题若问到铁的锈蚀，只要把氧交给一氧化碳而不是别的物质，答案为何会彻底改变？

本章用一个函数、一个方程回答所有这些问题。这个函数是吉布斯自由能——在[[thermodynamics/free-energy|上一章]]中刚刚建成——不过不再是在纯物质之间取值，而是沿着反应混合物实际走过的路径求值；这个方程就是$\Delta_\mathrm{r}G^\circ = -RT\ln K$，它把迄今测得的每一个平衡常数换算成一个自由能，也把迄今列表的每一个自由能换算成一个平衡常数。这座桥的温度依赖——范特霍夫方程——正是石灰窑要烧高温、哈伯反应器要折中在四百度运行、而天空不是氧化氮的原因。这套机器刻意做得简朴：化学势、一次求导、外加记账。它触及的却是整个工业化学。

除特别说明外，本课数值数据一律取自 NIST-JANAF 热化学表（以 CRC 手册收录值为准），温度为$298.15\,\mathrm{K}$；$p^\circ = 1\,\mathrm{bar}$，$R = 8.314\,\mathrm{J\,K^{-1}\,mol^{-1}}$。

## 反应进度：反应混合物的坐标

反应物混合物并不是可以随意选取的单一热力学状态；反应一旦可以发生，组成就只剩一个自由度，我们不妨诚实地选取它。这个诚实的坐标就是**反应进度**。

::: definition 反应进度 {#def-extent}
对写成$\sum_i \nu_i \mathrm{A}_i = 0$的反应（化学计量数$\nu_i$对反应物取负、对产物取正），**反应进度**$\xi$由$\mathrm{d}n_i = \nu_i\,\mathrm{d}\xi$对每个物种$i$定义，于是$n_i = n_{i,0} + \nu_i\xi$。一摩尔的反应进度恰好按配平方程式的比例把反应物转化为产物。
:::

对$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，取$\nu(\mathrm{N_2O_4}) = -1$、$\nu(\mathrm{NO_2}) = +2$，从一摩尔纯$\mathrm{N_2O_4}$出发，进度$\xi = \alpha$留下$1-\alpha$摩尔四氧化二氮和$2\alpha$摩尔二氧化氮；此时$\alpha$就是熟悉的**离解度**。反应进度是反应沿一条线的位置，而任何位置都连着一条能量斜率。

::: proposition $G$沿反应方向的斜率 {#prop-slope}
在恒温恒压下，对反应混合物有
$$
\Delta_\mathrm{r}G \equiv \sum_i \nu_i \mu_i = \left(\frac{\partial G}{\partial \xi}\right)_{T,p},
$$
其中$\mu_i$是混合物中各物种的化学势。体系沿使$G$减小的方向自发演化，即$\Delta_\mathrm{r}G < 0$的一侧，并在$\Delta_\mathrm{r}G = 0$处停止。
:::

::: proof
由基本方程$\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \sum_i \mu_i\,\mathrm{d}n_i$（其中$\mu_i = (\partial G/\partial n_i)_{T,p,n_{j\neq i}}$，见[[thermodynamics/free-energy|化学势]]），在恒温恒压下$\mathrm{d}G = \sum_i \mu_i\,\mathrm{d}n_i$。代入$\mathrm{d}n_i = \nu_i\,\mathrm{d}\xi$得$\mathrm{d}G = \left(\sum_i \nu_i\mu_i\right)\mathrm{d}\xi$，即为所证。判据$\Delta_\mathrm{r}G < 0$对应自发性，正是[[thermodynamics/free-energy|吉布斯自由能一章]]的吉布斯判据用于唯一剩余坐标$\xi$。
:::

把$G$想象成固定$T$、$p$下关于$\xi$的函数：一条从纯反应物延伸到纯产物的曲线。在反应物一端附近，它几乎总是陡峭下坠，因为把第一丝产物混入反应物会带来巨大的、有利的混合熵——与两种气体自发混合的是同一项（[[thermodynamics/mixtures|混合物]]）。在产物一端附近，镜像的原因使它陡峭上升。两端斜率的两个无穷之间必有极小值，混合物就停在该极小值处：**任何$K$有限的反应都不会进行到底**，任何$K$有限的反应也绝不会完全不开始。本章余下的内容，就是计算这个极小值在哪里、以及它如何移动。

## 反应等温方程

理想混合物中每个组分的化学势为$\mu_i = \mu_i^\circ + RT\ln a_i$，其中$a_i$是活度——理想气体为$p_i/p^\circ$；稀溶液中的溶质为$c_i/c^\circ$；纯固体或纯液体为$1$（见[[thermodynamics/free-energy|理想混合物命题]]）。把它代入$\Delta_\mathrm{r}G$，整个组成依赖就收拢进一个对数。

::: proposition 反应等温方程 {#prop-isotherm}
对任意反应混合物，
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q, \qquad Q = \prod_i a_i^{\nu_i},
$$
其中$\Delta_\mathrm{r}G^\circ = \sum_i \nu_i\mu_i^\circ$是标准反应吉布斯自由能，$Q$即**反应商**，按混合物的*当前*组成取值。
:::

::: proof
$\Delta_\mathrm{r}G = \sum_i \nu_i\mu_i = \sum_i \nu_i\mu_i^\circ + RT\sum_i \nu_i\ln a_i$。第一个和按定义就是$\Delta_\mathrm{r}G^\circ$，第二个和等于$RT\ln\prod_i a_i^{\nu_i} = RT\ln Q$，因为系数作为指数进入对数。
:::

$RT\ln Q$项的物理内容正是上文勾勒的混合与膨胀自由能：它在$Q = 0$（纯反应物）处为负无穷，把体系从任何一端拉离极端。

::: warning $\Delta_\mathrm{r}G^\circ$并不描述平衡混合物 {#warn-dg0-equilibrium}
化学热力学中最顽固的混淆，是把$\Delta_\mathrm{r}G^\circ$读成反应实际发生时*那个*自由能变。它不是：它是纯标准态反应物与纯标准态产物之间的变值，而这两个状态反应混合物从不光顾。在平衡组成处，真实的变化永远是$\Delta_\mathrm{r}G = 0$，无论$\Delta_\mathrm{r}G^\circ$是多少。$\Delta_\mathrm{r}G^\circ$决定的是极小值的*位置*，即通过$K$；它的符号只说明极小值偏向产物一侧（$\Delta_\mathrm{r}G^\circ < 0$，$K > 1$）还是偏向反应物一侧（$\Delta_\mathrm{r}G^\circ > 0$，$K < 1$）。一个$\Delta_\mathrm{r}G^\circ = +100\,\mathrm{kJ\,mol^{-1}}$的反应从纯反应物出发仍会正向进行，因为那里$Q = 0$、$\Delta_\mathrm{r}G = -\infty$；一个$\Delta_\mathrm{r}G^\circ = -100\,\mathrm{kJ\,mol^{-1}}$的反应，若起始产物的量远高于平衡量，就会逆向进行。
:::

::: widget plot
f: dg*x + x*log(x) + (1-x)*log(1-x)
x: 0.005, 0.995
y: -6.5, 0.5
sliders: dg=-1.1:-6:6:0.1
labels: (G - G(0)) / RT
caption: 型如$\mathrm{A} \rightleftharpoons \mathrm{B}$的反应混合物的吉布斯自由能（以$RT$为单位、以纯A为基准）随B的摩尔分数$x$的变化：标准自由能贡献$\Delta G^\circ x$加上混合熵项$x\ln x + (1-x)\ln(1-x)$，后者在两端都向下发散。滑块设定$\Delta_\mathrm{r}G^\circ/RT$。极小值位于$x/(1-x) = e^{-\Delta_\mathrm{r}G^\circ/RT} = K$处：取默认的$\Delta_\mathrm{r}G^\circ/RT = -1.1$，极小值在$x = 0.75$。把$\Delta_\mathrm{r}G^\circ$滑到$+6$，看极小值如何爬到$x = 0.0025$——反应“不进行”，却仍然会开始，因为曲线在$x = 0$处永远是下降的。
:::

::: example 四氧化二氮：一个熟悉平衡背后的数字 {#ex-n2o4-K}
对$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，列表数据为$\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31$、$\Delta_\mathrm{f}G^\circ(\mathrm{N_2O_4}) = +97.89$、$\Delta_\mathrm{f}H^\circ(\mathrm{NO_2}) = +33.18$、$\Delta_\mathrm{f}H^\circ(\mathrm{N_2O_4}) = +9.16\,\mathrm{kJ\,mol^{-1}}$。计算$298.15\,\mathrm{K}$下的$\Delta_\mathrm{r}G^\circ$、$\Delta_\mathrm{r}H^\circ$、$\Delta_\mathrm{r}S^\circ$和$K$。同一反应若把方程式加倍，$K$是多少？
::: solution
$$
\Delta_\mathrm{r}G^\circ = 2(51.31) - 97.89 = +4.73\,\mathrm{kJ\,mol^{-1}}, \qquad
\Delta_\mathrm{r}H^\circ = 2(33.18) - 9.16 = +57.20\,\mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r}S^\circ = \frac{\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ}{T} = \frac{52.47\times 10^{3}}{298.15} = +176.0\,\mathrm{J\,K^{-1}\,mol^{-1}},
$$
一摩尔气体变两摩尔，它必为正。于是
$$
K = \exp\!\left(-\frac{4.73\times 10^{3}}{8.314 \times 298.15}\right) = e^{-1.908} = 0.148 .
$$
把方程式加倍，$\Delta_\mathrm{r}G^\circ$加倍，$K$被平方：$K' = K^2 = 0.0220$。平衡常数属于方程式而不属于反应——化学计量系数中的因子会变成$K$中的指数。
:::
:::

## 平衡：$\Delta_\mathrm{r}G^\circ = -RT\ln K$

::: proposition 平衡条件 {#prop-drg-K}
恒温恒压下的反应混合物恰好在下列位置达到平衡：
$$
\Delta_\mathrm{r}G^\circ = -RT\ln K,
$$
其中$K$是反应商在平衡时的取值。
:::

::: proof
平衡是$G$沿$\xi$的极小值，故那里$\Delta_\mathrm{r}G = 0$。在$Q = K$处令$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$为零，即得$\Delta_\mathrm{r}G^\circ = -RT\ln K$。
:::

::: definition 平衡常数 {#def-K}
本课程中$K$一律指**热力学平衡常数**：$K = \prod_i (a_i^{\mathrm{eq}})^{\nu_i}$，即活度按化学计量幂次的连乘积。活度无量纲，故$K$无量纲，纯固体与纯液体贡献因子$1$。本课所有公式都用这一约定；下文的$K_p$、$K_c$、$K_x$是它的换算形式，不是它的对手。
:::

::: proposition 换算：$K_c$与$K_x$ {#prop-k-forms}
对$\Delta\nu = \sum_i \nu_i$的理想气体反应，
$$
K = K_c\left(\frac{c^\circ RT}{p^\circ}\right)^{\Delta\nu} = K_x\left(\frac{p}{p^\circ}\right)^{\Delta\nu}, \qquad K_x = \prod_i x_i^{\nu_i},
$$
其中$K_c = \prod_i (c_i/c^\circ)^{\nu_i}$。在$298.15\,\mathrm{K}$下，$c^\circ RT/p^\circ = 24.79$。
:::

::: proof
对理想气体$a_i = p_i/p^\circ$。写$p_i = c_iRT$得$a_i = (c_i/c^\circ)(c^\circ RT/p^\circ)$；取$\nu_i$次幂并对$i$相乘，就收集出$K_c$的乘积并剩下$(c^\circ RT/p^\circ)^{\sum\nu_i}$。写$p_i = x_ip$得$a_i = x_i(p/p^\circ)$，第二个恒等式立得。
:::

因子$c^\circ RT/p^\circ = 24.79$是$298.15\,\mathrm{K}$、$1\,\mathrm{bar}$下理想气体的摩尔体积除以$1\,\mathrm{dm^3\,mol^{-1}}$——即[[general-chemistry-1/gases|气体定律各章]]里那个$24.8\,\mathrm{dm^3}$。这就是每当$\Delta\nu \neq 0$时$K_p$与$K_c$“不一致”的原因：它们是同一平衡在不同浓度标尺上的读数。

::: example 四氧化二氮离解到什么程度？ {#ex-n2o4-alpha}
从$1\,\mathrm{mol}$纯$\mathrm{N_2O_4}$出发、总压为$p$，证明离解度$\alpha$满足$K = 4\alpha^2(p/p^\circ)/(1-\alpha^2)$，并用$K = 0.148$计算$298.15\,\mathrm{K}$下$p = 1.00\,\mathrm{bar}$与$p = 0.10\,\mathrm{bar}$时的$\alpha$。
::: solution
进度为$\alpha$时：$n(\mathrm{N_2O_4}) = 1-\alpha$，$n(\mathrm{NO_2}) = 2\alpha$，$n_\mathrm{tot} = 1+\alpha$，故$x(\mathrm{N_2O_4}) = (1-\alpha)/(1+\alpha)$、$x(\mathrm{NO_2}) = 2\alpha/(1+\alpha)$。于是
$$
K = \frac{\left[x(\mathrm{NO_2})\,p/p^\circ\right]^2}{x(\mathrm{N_2O_4})\,p/p^\circ} = \frac{4\alpha^2}{(1-\alpha)(1+\alpha)}\,\frac{p}{p^\circ} = \frac{4\alpha^2\,(p/p^\circ)}{1-\alpha^2},
$$
反解得$\alpha = \sqrt{K/(K + 4p/p^\circ)}$。$1.00\,\mathrm{bar}$时：$\alpha = \sqrt{0.148/4.148} = 0.189$。$0.10\,\mathrm{bar}$时：$\alpha = \sqrt{0.148/0.548} = 0.520$。把气体从一巴膨胀到十分之一巴，离解度增至三倍——体系制造出更多分子，以部分抵消压强的下降。这就是勒夏特列原理，但已被推导出来，并且带着一个数字。
:::
:::

::: widget plot
f: sqrt(k/(k + 4*x))
x: 0.01, 10
y: 0, 1
sliders: k=0.148:0.001:2:0.001
labels: \alpha
vlines: 1
caption: $\mathrm{N_2O_4}$的离解度$\alpha = \sqrt{K/(K+4p/p^\circ)}$随总压（横轴，单位为巴）的变化，$K$取滑块值。竖线标记$1\,\mathrm{bar}$：在$K = 0.148$（$298.15\,\mathrm{K}$）时，该处离解度为$0.189$，在$0.1\,\mathrm{bar}$为$0.520$，在$10\,\mathrm{bar}$为$0.061$。把滑块升到$K = 4.53$（$350\,\mathrm{K}$的值），每条曲线都被抬起：温度与压强通过同一个公式起作用，各占一角。
:::

::: proposition 压强、惰性气体与摩尔分数陷阱 {#prop-pressure}
对理想气体反应，恒温下改变总压，平衡组成按因子
$$
K_x = K\left(\frac{p}{p^\circ}\right)^{-\Delta\nu}
$$
移动，故压缩有利于气体分子数较少的一侧。在恒总压下加入惰性气体，只要$\Delta\nu \neq 0$，其效果与*降低*压强的方向相同；在恒容下加入惰性气体则完全不动。
:::

::: proof
$K_x = K(p/p^\circ)^{-\Delta\nu}$即[[#prop-k-forms]]的第三个恒等式。若$\Delta\nu > 0$，升高$p$使$K_x$下降：产物的摩尔分数必须减小。至于惰性气体，注意$Q$由*分压*构成。恒容时加入惰性气体抬高总压，但每个$p_i$分毫未动，故$Q$不变、不发生移动。恒总压时加入惰性气体稀释混合物：每个$x_i$下降，$Q_x$改变因子$(n_\mathrm{tot}^0/n_\mathrm{tot})^{\Delta\nu}$——对$\Delta\nu > 0$这使$Q < K$，反应正向移动，恰如压强被降低一样。
:::

::: quiz
一个$\mathrm{N_2O_4}$与$\mathrm{NO_2}$的平衡混合物置于刚性钢瓶中，温度为$298.15\,\mathrm{K}$。保持体积与温度不变注入氩气。会发生什么？
- [ ] 平衡向$\mathrm{N_2O_4}$移动，因为总压升高。
- [x] 什么都不移动：每个分压$p_i$不变，$Q$仍等于$K$。
- [ ] 平衡向$\mathrm{NO_2}$移动，因为氩气稀释了混合物。
- [ ] 平衡常数$K$减小，混合物颜色变深。
::: solution
在恒温恒容下，对每个反应物种$p_i = n_iRT/V$，而$n_i$、$T$、$V$均未改变；反应商原封不动，混合物原地不动。人们半记得的那种移动是*恒压*情形——稀释确实会降低分压（见[[#prop-pressure]]）。$K$本身只依赖温度。
:::
:::

## 完整的平衡组成：500 K 下的氨

::: example $500\,\mathrm{K}$、$10\,\mathrm{bar}$下的哈伯混合物 {#ex-nh3-500}
对$\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$，$\Delta_\mathrm{f}G^\circ(\mathrm{NH_3}) = -16.45$、$\Delta_\mathrm{f}H^\circ(\mathrm{NH_3}) = -45.9\,\mathrm{kJ\,mol^{-1}}$。把$\Delta_\mathrm{r}H^\circ$视为常数，则$K(500\,\mathrm{K}) = 0.187$（与[[thermodynamics/free-energy|吉布斯–亥姆霍兹例题]]中给出$\Delta_\mathrm{r}G^\circ(500\,\mathrm{K}) = +6.98\,\mathrm{kJ\,mol^{-1}}$的是同一计算）。一容器充入$1\,\mathrm{mol}$的$\mathrm{N_2}$与$3\,\mathrm{mol}$的$\mathrm{H_2}$，维持在$500\,\mathrm{K}$、总压$10\,\mathrm{bar}$。求平衡组成。
::: solution
进度为$\xi$时：$n(\mathrm{N_2}) = 1-\xi$，$n(\mathrm{H_2}) = 3(1-\xi)$，$n(\mathrm{NH_3}) = 2\xi$，$n_\mathrm{tot} = 4-2\xi$。由$\Delta\nu = -2$，
$$
K = \frac{x(\mathrm{NH_3})^2}{x(\mathrm{N_2})\,x(\mathrm{H_2})^3}\left(\frac{p}{p^\circ}\right)^{2} = \frac{(2\xi)^2(4-2\xi)^{2}}{(1-\xi)\,[3(1-\xi)]^{3}}\left(\frac{p}{p^\circ}\right)^{-2}.
$$
令$K = 0.187$、$p/p^\circ = 10$求解得$\xi = 0.611$，故摩尔分数$x(\mathrm{NH_3}) = 1.222/2.778 = 0.440$、$x(\mathrm{N_2}) = 0.140$、$x(\mathrm{H_2}) = 0.420$，分压分别为$4.40$、$1.40$、$4.20\,\mathrm{bar}$。验算：$Q = 0.440^2/(0.140\times0.420^3)\times10^{-2} = 0.187 = K$。同温但只有$1\,\mathrm{bar}$时，同一方程给出$\xi = 0.200$、$x(\mathrm{NH_3}) = 0.111$：压强增十倍，氨产率增四倍，因为对这个$\Delta\nu = -2$的反应$K_x \propto (p/p^\circ)^{+2}$。工业过程宁可付出钢材的代价也要在一百到两百巴运行，全因这个数字。
:::
:::

## 温度依赖：范特霍夫方程

常数$K$随温度移动，而移动的快慢由一个量决定：标准反应焓。

::: theorem 范特霍夫方程 {#thm-vant-hoff}
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{r}H^\circ}{RT^{2}}
\qquad\Longleftrightarrow\qquad
\frac{\mathrm{d}\ln K}{\mathrm{d}(1/T)} = -\frac{\Delta_\mathrm{r}H^\circ}{R}.
$$
吸热反应（$\Delta_\mathrm{r}H^\circ > 0$）的$K$随温度上升；放热反应的$K$随温度下降。
:::

::: proof
由$\Delta_\mathrm{r}G^\circ = -RT\ln K$得$\ln K = -\Delta_\mathrm{r}G^\circ/(RT)$，故$\mathrm{d}\ln K/\mathrm{d}T = -(1/R)\,\partial(\Delta_\mathrm{r}G^\circ/T)/\partial T$。吉布斯–亥姆霍兹关系$\partial(G/T)/\partial T = -H/T^2$用于反应（证明见[[thermodynamics/free-energy|吉布斯–亥姆霍兹命题]]）把它化为$-(1/R)(-\Delta_\mathrm{r}H^\circ/T^2) = \Delta_\mathrm{r}H^\circ/(RT^2)$。第二个形式就是对$u = 1/T$用链式法则。
:::

::: proposition 范特霍夫方程的积分形式 {#prop-vh-int}
若$\Delta_\mathrm{r}H^\circ$在$T_1$到$T_2$范围内为常数，则
$$
\ln\frac{K_2}{K_1} = -\frac{\Delta_\mathrm{r}H^\circ}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right),
\qquad
\ln K = -\frac{\Delta_\mathrm{r}H^\circ}{R}\,\frac{1}{T} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
当$\Delta_\mathrm{r}C_p$不可忽略时，先用基尔霍夫定律$\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \Delta_\mathrm{r}C_p$把$\Delta_\mathrm{r}H^\circ(T)$与$\Delta_\mathrm{r}S^\circ(T)$携带过去，再作积分。
:::

::: proof
在两温度间积分$\mathrm{d}\ln K = (\Delta_\mathrm{r}H^\circ/R)\,\mathrm{d}T/T^2$，把$\Delta_\mathrm{r}H^\circ$提到积分号外；由$\int T^{-2}\mathrm{d}T = -1/T$即得结果。直线形式是同一积分从参考态出发再配上$\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$。至于修正：把基尔霍夫给出的$\Delta_\mathrm{r}H^\circ(T)$表达式代入定理再积一次分；机器与[[thermodynamics/heat-capacity-adiabatic|温度依赖焓]]的热容处理完全相同。
:::

::: example 加热四氧化二氮 {#ex-vh-n2o4}
已知$\mathrm{N_2O_4} \rightleftharpoons 2\,\mathrm{NO_2}$的$\Delta_\mathrm{r}H^\circ = +57.20\,\mathrm{kJ\,mol^{-1}}$且$K(298.15\,\mathrm{K}) = 0.148$，求$K(350\,\mathrm{K})$以及$350\,\mathrm{K}$、$1\,\mathrm{bar}$下的离解度。
::: solution
$$
\ln\frac{K(350)}{0.148} = -\frac{57.20\times 10^{3}}{8.314}\left(\frac{1}{350} - \frac{1}{298.15}\right) = -(6880)(-4.969\times 10^{-4}) = +3.42,
$$
故$K(350) = 0.148 \times 30.6 = 4.53$。平衡在$325\,\mathrm{K}$附近越过$K = 1$——正是在一巴下棕色气体成为多数物种的温度。$350\,\mathrm{K}$、$1\,\mathrm{bar}$时，$\alpha = \sqrt{4.53/8.53} = 0.729$：把密封玻璃球中的气体从$25\,^\circ\mathrm{C}$加热到$77\,^\circ\mathrm{C}$，就离解度而言颜色加深近四倍。同一个$\Delta_\mathrm{r}H^\circ$也解释了为什么发动机炽热的排气中二聚体是少数物种，而清晨冷空气里它是多数物种。
:::
:::

::: widget plot
f: -dH*1000/(8.314*x) + dS/8.314
x: 250, 600
y: -10, 10
sliders: dH=57:0:120:1; dS=176:0:400:1
labels: \ln K
vlines: 298, 350
caption: 范特霍夫直线$\ln K = -\Delta_\mathrm{r}H^\circ/(RT) + \Delta_\mathrm{r}S^\circ/R$随温度的变化，滑块为$\Delta_\mathrm{r}H^\circ$（单位$\mathrm{kJ\,mol^{-1}}$）与$\Delta_\mathrm{r}S^\circ$（单位$\mathrm{J\,K^{-1}\,mol^{-1}}$）；默认值是$\mathrm{N_2O_4}$离解的数据，两条竖线标记$298$与$350\,\mathrm{K}$，直线在那里经过$\ln K = -1.9$与$+1.6$——即例题中的$K = 0.148$与$4.53$。直线对$1/T$是直的，并在$T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$处过零。把$\Delta_\mathrm{r}H^\circ$滑到负值，斜率反转：放热反应把$K$输给了热，这正是氨合成难题的一瞥。
:::

::: history 从《化学动力学研究》到氨合成厂 {#hist-vant-hoff}
荷兰阿姆斯特丹二十六岁的讲师范特霍夫（van 't Hoff）于1884年发表*Études de dynamique chimique*：第一次把化学平衡与反应速率当作同一门数学来系统处理的尝试，其中就包括以他名字命名的$K$的温度依赖。1887年他与奥斯特瓦尔德（Ostwald）共同创办了本学科第一份期刊*Zeitschrift für physikalische Chemie*，1896年转赴柏林大学；1901年他成为首届诺贝尔化学奖的唯一得主。他的工具来自吉布斯（Gibbs）——吉布斯的《多相物质的平衡》（*On the Equilibrium of Heterogeneous Substances*，1876、1878年）提供了化学势与相律，却发表在几乎无欧洲人问津的美国院刊上——范特霍夫本人写出了该书的第一部法文阐述。这方程的工业分量在1906年变成一场公开争执：能斯特（Nernst）宣称氨的平衡过于不利、无从利用；哈伯（Haber）用能斯特自己的数据重新计算了平衡，于1909至1910年间演示了高压合成，博施（Bosch）则在巴斯夫把它放大，到1913年投产。1920年代，德杜安德（De Donder）把驱动力$\Delta_\mathrm{r}G$改写为*亲和势*$A = -\sum_i\nu_i\mu_i$，即非平衡热力学沿用语至今的表达。
:::

## 勒夏特列原理：推导之后再加约束

::: proposition 由等温方程得出的勒夏特列原理 {#prop-lechatelier}
对处于平衡的混合物，任何使$Q \neq K$的改变都驱动反应沿恢复$Q = K$的方向进行：增大产物活度（或减小反应物活度）驱动反应逆向；增大压强驱动反应向气体分子数少的一侧；供热驱动反应向吸热方向。催化剂对上述一切毫无改变。
:::

::: proof
写$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q = RT\ln(Q/K)$，其中用到$\Delta_\mathrm{r}G^\circ = -RT\ln K$。若扰动使$Q < K$，则$\Delta_\mathrm{r}G < 0$，正向反应自发，直到$Q$爬回$K$；若$Q > K$则逆向。压强起作用是因为在固定摩尔分数下$Q \propto p^{\Delta\nu}$；热量起作用是通过范特霍夫定理——它使$K$本身向吸热方向移动。催化剂改变两个方向的速率以及其间的途径，但$K$由$\Delta_\mathrm{r}G^\circ$锁定，而$\Delta_\mathrm{r}G^\circ$是状态函数之差，催化剂碰不到它。
:::

::: warning 勒夏特列的口号跑在了勒夏特列前面 {#warn-lechatelier}
“平衡体系抵消外界的扰动”是民间传说而非定理，它在学生常跌的三处失效。（一）*恒压下加入反应物*：向氨混合物恒总压加氩会稀释每个物种，对$\Delta\nu < 0$反而使平衡**逆向**移动——体系抵消的是稀释，不是加入。即便恒压加入反应性的$\mathrm{N_2}$，也可能*降低*氨的摩尔分数同时提高其摩尔产率；口号并不告诉你追踪的是哪个量。（二）*加入惰性气体*：恒容下根本不动，口号在此失声（见[[#prop-pressure]]）。（三）*催化剂*：口号诱使学生期待移动；催化剂只是让体系更快地抵达平衡，从不移动平衡。等温方程$\Delta_\mathrm{r}G = RT\ln(Q/K)$从无例外，因为它不是原理，而是恒等式。
:::

::: quiz
对处于平衡的氨合成$\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$，下列哪一项单独的改变能提高氨的平衡*摩尔分数*？
- [ ] 恒温恒总压下加入氩气。
- [ ] 恒压下升高温度。
- [x] 恒温下增大总压。
- [ ] 加入催化剂。
::: solution
$K_x = K(p/p^\circ)^{-\Delta\nu} = K(p/p^\circ)^{+2}$：对$\Delta\nu = -2$，压缩抬高$K_x$与氨的摩尔分数（上文$10\,\mathrm{bar}$的例题：$0.111 \to 0.440$）。恒压下加氩稀释使平衡逆移；反应放热，加热降低$K$；催化剂只改变到达的快慢。
:::
:::

## 偶联反应：驱动力的算术

$\Delta_\mathrm{r}G^\circ = -RT\ln K$最深刻的用途在于：自由能可以**相加**，而平衡只能相乘。一个单独看来毫无希望的反应，只要与一个慷慨的反应共享中间体，就变得稀松平常。

::: proposition 偶联 {#prop-coupling}
若某反应是反应1与反应2之和，则$\Delta_\mathrm{r}G^\circ = \Delta_{\mathrm{r}1}G^\circ + \Delta_{\mathrm{r}2}G^\circ$且$K = K_1 K_2$。更一般地，把反应乘以$c$则$K$升到$c$次幂。
:::

::: proof
$\Delta_\mathrm{r}G^\circ$是对净化学计量的和$\sum_i\nu_i\mu_i^\circ$；反应相加即$\nu_i$相加，故和相加。对$-\left(\Delta_{\mathrm{r}1}G^\circ + \Delta_{\mathrm{r}2}G^\circ\right)/RT$取指数即得$K_1K_2$；把所有$\nu_i$乘以$c$使和放大$c$倍，$K$随之升到$c$次幂。
:::

::: example 用一氧化碳还原铁矿石 {#ex-fe2o3}
$298.15\,\mathrm{K}$下赤铁矿$\mathrm{Fe_2O_3}$不会把氧交给铁：对$\mathrm{Fe_2O_3(s)} \rightarrow 2\,\mathrm{Fe(s)} + \tfrac32\mathrm{O_2(g)}$，$\Delta_\mathrm{r}G^\circ = +742.2\,\mathrm{kJ\,mol^{-1}}$、$K = 9.2\times 10^{-131}$。把它与$\mathrm{CO(g)} + \tfrac12\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$偶联，后者的$\Delta_\mathrm{r}G^\circ = (-394.4) - (-137.2) = -257.2\,\mathrm{kJ\,mol^{-1}}$，$K_\mathrm{ox} = 1.15\times 10^{45}$。求$\mathrm{Fe_2O_3(s)} + 3\,\mathrm{CO(g)} \rightarrow 2\,\mathrm{Fe(s)} + 3\,\mathrm{CO_2(g)}$的$\Delta_\mathrm{r}G^\circ$与$K$，以及使铁不被氧化的气体比$p(\mathrm{CO_2})/p(\mathrm{CO})$。
::: solution
净反应是分解反应加上三倍的一氧化碳氧化反应：
$$
\Delta_\mathrm{r}G^\circ = 742.2 + 3(-257.2) = -29.4\,\mathrm{kJ\,mol^{-1}}, \qquad
K = (9.2\times 10^{-131})(1.15\times 10^{45})^{3} = 1.4\times 10^{5}.
$$
一个$K = 10^{-131}$的反应变成了$K = 10^{5}$——用三个一氧化碳分子买来了$10^{136}$的变化。固体的活度为$1$，故$K = [p(\mathrm{CO_2})/p(\mathrm{CO})]^3$，无锈的铁处于$p(\mathrm{CO_2})/p(\mathrm{CO}) = K^{1/3} = 52$的大气之下：高炉就是靠一股奔流的气体把这个不等式维持在远离平衡处。同样的算术也在你的线粒体里运行——三磷酸腺苷的水解为$\Delta_\mathrm{r}G^\circ > +30\,\mathrm{kJ\,mol^{-1}}$的磷酸化买单——而把一氧化碳换成电子，就是[[electrochemistry/cell-thermodynamics|电化学电池]]里的电解与精炼，其中$\Delta_\mathrm{r}G^\circ = -\nu F E^\circ$是同一本账的电压记法。
:::
:::

## 平衡计算的算法

::: algorithm 计算平衡组成 {#algo-equilibrium}
给定配平方程式、$T$、$p$（或$V$）与初始投料：
1. 从同一张表列出$\Delta_\mathrm{f}G^\circ$与$\Delta_\mathrm{f}H^\circ$；计算$\Delta_\mathrm{r}G^\circ(T)$（若$T \neq 298.15\,\mathrm{K}$用范特霍夫方程）与$K = e^{-\Delta_\mathrm{r}G^\circ/RT}$。
2. 写出物料衡算$n_i = n_{i,0} + \nu_i\xi$及总量$n_\mathrm{tot}$。
3. 由活度构造$Q(\xi)$：气体用$p_i/p^\circ = x_ip/p^\circ$，纯凝聚相用$1$，稀溶质用$c_i/c^\circ$。
4. 解$Q(\xi) = K$求$\xi$（化学计量简单时为多项式；否则因$Q$对$\xi$单调，二分法迭代一次即够）。
5. 报告$x_i$、$p_i$，并代回$Q$验算。
:::

步骤一至四正是上文氨的例题；步骤五能抓住经典的符号与指数失误。溶液中反应的同一算法，配上以$K_\mathrm{a}$标度取的活度，就生成[[thermodynamics/ions-in-solution|溶液中的离子]]里每一个酸碱与溶解度平衡。

## 后续内容

等温方程与范特霍夫方程是本课程的全部引擎；此后皆是燃料。把反应设为相变，$\Delta_\mathrm{r}G^\circ = -RT\ln K$就变成[[thermodynamics/phase-equilibria|相平衡]]中的克劳修斯–克拉佩龙方程与蒸气压方程；设为电子转移，它就变成[[electrochemistry/cell-thermodynamics|电池热力学]]中的$E^\circ = -\Delta_\mathrm{r}G^\circ/\nu F$；设为溶解一盐或解离一酸，它就变成[[thermodynamics/ions-in-solution|溶液中的离子]]里$K_\mathrm{sp}$与$\mathrm{p}K_\mathrm{a}$的算术。非理想性通过把$p_i/p^\circ$换成$a_i = \gamma_i x_i$进入——那是[[statistical-thermodynamics/real-gases-liquids|真实气体与液体]]的逸度与活度系数世界，对气体而言也是[[general-chemistry-1/gases|理想气体定律]]背后的修正。$K$的分子意义——为什么从配分函数算出的恰是同一个数——属于统计力学；这套记账的初级版本见[[general-chemistry-2/entropy-free-energy|熵与自由能入门]]。

::: summary
- 反应进度$\xi$把反应混合物约化成一个坐标；$\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i = (\partial G/\partial\xi)_{T,p}$是$G$沿它的斜率。
- 反应等温方程$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$才是真实的驱动力；$\Delta_\mathrm{r}G^\circ$单独只是标准态的账目。
- 平衡即$\Delta_\mathrm{r}G = 0$，故$\Delta_\mathrm{r}G^\circ = -RT\ln K$，$K$由活度构成因而无量纲；$K$属于按原样书写的方程式。
- $K = K_c(c^\circ RT/p^\circ)^{\Delta\nu} = K_x(p/p^\circ)^{\Delta\nu}$：浓度与摩尔分数常数只是换算，而$K_x$正是压强起作用之处。
- 范特霍夫方程$\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^2$（吉布斯–亥姆霍兹的化身）使$\ln K$对$1/T$成直线、斜率为$-\Delta_\mathrm{r}H^\circ/R$；吸热反应从热中赢得$K$。
- 勒夏特列原理是把等温方程读成文字——只有作为$Q$对$K$才可靠，对恒容加惰性气体、恒压稀释和催化剂都会说错，而催化剂从不移动$K$。
- 偶联反应使$\Delta_\mathrm{r}G^\circ$相加、$K$相乘：一氧化碳还原氧化铁、细胞为不可能的化学买单，靠的都是这一机制。
:::

## 练习

::: exercise 由列表自由能求平衡常数 {level=1 check="0.148"}
用$\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31$、$\Delta_\mathrm{f}G^\circ(\mathrm{N_2O_4}) = +97.89\,\mathrm{kJ\,mol^{-1}}$，计算$298.15\,\mathrm{K}$下$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$的$K$。$K$取三位有效数字。
::: solution
$\Delta_\mathrm{r}G^\circ = 2(51.31) - 97.89 = +4.73\,\mathrm{kJ\,mol^{-1}}$，故$K = \exp[-4730/(8.314\times298.15)] = e^{-1.908} = 0.148$。不大的正$\Delta_\mathrm{r}G^\circ$意味着平衡混合物以$\mathrm{N_2O_4}$为主，但并非压倒性地如此。
:::
:::

::: exercise 由$K$换算$K_c$ {level=1 check="0.00598"}
对同一反应$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，$298.15\,\mathrm{K}$下$K = 0.148$，计算$K_c = [c(\mathrm{NO_2})/c^\circ]^2/[c(\mathrm{N_2O_4})/c^\circ]$。$K_c$取三位有效数字。
::: solution
$\Delta\nu = +1$，故$K_c = K(p^\circ/c^\circ RT) = K/24.79 = 0.148/24.79 = 0.00598$。因子$24.79$是以$\mathrm{dm^3\,mol^{-1}}$计的理想气体摩尔体积；只有$\Delta\nu = 0$时$K_c$与$K$才重合。
:::
:::

::: exercise 五氯化磷的离解 {level=1 check="0.622"}
对$\mathrm{PCl_5(g)} \rightleftharpoons \mathrm{PCl_3(g)} + \mathrm{Cl_2(g)}$，$523\,\mathrm{K}$下$K = 1.26$。抽空的烧瓶充入纯$\mathrm{PCl_5}$，在$523\,\mathrm{K}$下保持到总压为$2.00\,\mathrm{bar}$。计算离解度。$\alpha$取三位有效数字。
::: solution
从$1\,\mathrm{mol}$出发：进度为$\alpha$时$n_\mathrm{tot} = 1+\alpha$，且$K = \alpha^2(p/p^\circ)/(1-\alpha^2)$（此处化学计量为$1:1:1$，故没有因子四）。于是$\alpha^2 = K/(K + p/p^\circ) = 1.26/3.26 = 0.3865$，$\alpha = 0.622$。
:::
:::

::: exercise 范特霍夫的跃升 {level=2 check="4.53"}
对$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，$\Delta_\mathrm{r}H^\circ = +57.20\,\mathrm{kJ\,mol^{-1}}$，$298.15\,\mathrm{K}$下$K = 0.148$。设$\Delta_\mathrm{r}H^\circ$为常数，计算$350\,\mathrm{K}$下的$K$。$K$取三位有效数字。
::: solution
$\ln[K(350)/0.148] = -(57\,200/8.314)(1/350 - 1/298.15) = -(6880)(-4.969\times10^{-4}) = 3.42$，故$K(350) = 0.148\,e^{3.42} = 4.53$。升温$52\,\mathrm{K}$使$K$乘以三十：大$\Delta_\mathrm{r}H^\circ$反应中温度对平衡的杠杆效应是巨大的，而且全部藏在指数里。
:::
:::

::: exercise 一巴下的氨产率 {level=2 check="0.111"}
对$\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$，$500\,\mathrm{K}$下$K = 0.187$。$\mathrm{N_2}$与$\mathrm{H_2}$按$1:3$的混合气在$500\,\mathrm{K}$、总压$1.00\,\mathrm{bar}$下保持。计算氨的平衡摩尔分数。$x(\mathrm{NH_3})$取三位有效数字。
::: solution
由$n_\mathrm{tot} = 4-2\xi$与$\Delta\nu = -2$：$K = \dfrac{(2\xi)^2(4-2\xi)^2}{(1-\xi)[3(1-\xi)]^3}(p/p^\circ)^{-2}$。在$p/p^\circ = 1$下解得$\xi = 0.200$，$x(\mathrm{NH_3}) = 2\xi/(4-2\xi) = 0.400/3.600 = 0.111$。对照$10\,\mathrm{bar}$下算得的$0.440$，压强依赖$K_x \propto (p/p^\circ)^2$就此化为数字。
:::
:::

::: exercise 氩气在边缘 {level=2 check="0.250"}
对$298.15\,\mathrm{K}$（$K = 0.148$）下的$\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，一容器中盛$1\,\mathrm{mol}$的$\mathrm{N_2O_4}$与$1\,\mathrm{mol}$的氩气，总压为$1.00\,\mathrm{bar}$。计算四氧化二氮的离解度。$\alpha$取三位有效数字。
::: solution
现在$n_\mathrm{tot} = (1-\alpha) + 2\alpha + 1 = 2+\alpha$，故$K = 4\alpha^2(p/p^\circ)/[(2+\alpha)(1-\alpha)]$。代入$K = 0.148$、$p/p^\circ = 1$：$4.148\alpha^2 + 0.148\alpha - 0.296 = 0$，正根为$\alpha = 0.250$。对照无氩时的$0.189$：恒总压下惰性气体稀释反应物种，使平衡正向移动，恰如降低压强的效果。
:::
:::

::: exercise 推导等温方程与平衡常数 {level=3}
仅从$\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i$与理想混合物各组分的$\mu_i = \mu_i^\circ + RT\ln a_i$出发，推导$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$。然后证明$G(\xi)$极小值处$\Delta_\mathrm{r}G = 0$蕴含$\Delta_\mathrm{r}G^\circ = -RT\ln K$，并解释为何$K$无量纲、为何方程式加倍会使$K$平方。
::: solution
$\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i^\circ + RT\sum_i\nu_i\ln a_i = \Delta_\mathrm{r}G^\circ + RT\ln\prod_ia_i^{\nu_i} = \Delta_\mathrm{r}G^\circ + RT\ln Q$。极小值条件是$(\partial G/\partial\xi)_{T,p} = \sum_i\nu_i\mu_i = 0$（对$\mathrm{d}G = \sum_i\mu_i\mathrm{d}n_i$用链式法则，$\mathrm{d}n_i = \nu_i\mathrm{d}\xi$），故平衡时$0 = \Delta_\mathrm{r}G^\circ + RT\ln Q^\mathrm{eq}$，即$\Delta_\mathrm{r}G^\circ = -RT\ln K$。$K$无量纲是因为每个$a_i$都是比值（$p_i/p^\circ$、$c_i/c^\circ$或$1$），故$K$是纯数的乘积；方程式加倍使每个$\nu_i$加倍，从而$\Delta_\mathrm{r}G^\circ$加倍，于是$K = e^{-\Delta_\mathrm{r}G^\circ/RT}$平方。
:::
:::

::: exercise 高炉的定量分析 {level=3 check="52.1"}
用$298.15\,\mathrm{K}$下的$\Delta_\mathrm{f}G^\circ$：$\mathrm{Fe_2O_3(s)}\ -742.2$、$\mathrm{CO(g)}\ -137.2$、$\mathrm{CO_2(g)}\ -394.4\,\mathrm{kJ\,mol^{-1}}$，计算$\mathrm{Fe_2O_3(s)} + 3\,\mathrm{CO(g)} \rightarrow 2\,\mathrm{Fe(s)} + 3\,\mathrm{CO_2(g)}$的$\Delta_\mathrm{r}G^\circ$与$K$，以及铁*不*被气体氧化的最低比值$p(\mathrm{CO_2})/p(\mathrm{CO})$。比值取三位有效数字。
::: solution
$\Delta_\mathrm{r}G^\circ = [3(-394.4)] - [-742.2 + 3(-137.2)] = -1183.2 + 1153.8 = -29.4\,\mathrm{kJ\,mol^{-1}}$，故$K = e^{29\,400/2478.8} = 1.42\times10^{5}$。固体活度为$1$，故$K = [p(\mathrm{CO_2})/p(\mathrm{CO})]^3$，临界比值为$K^{1/3} = 52.1$。低于它铁被还原（或保持金属态）；高于它二氧化碳氧化铁。把净反应同样分解——$K = K_\mathrm{dec}K_\mathrm{ox}^3$，其中$K_\mathrm{dec} = 9.2\times10^{-131}$、$K_\mathrm{ox} = 1.15\times10^{45}$——就展示了偶联的算术：$10^{-131}$乘以$(10^{45})^3$等于$10^{5}$。
:::
:::
