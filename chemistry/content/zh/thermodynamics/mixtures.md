在 $20\,^\circ\mathrm{C}$ 下把 $50.0\ \mathrm{cm^3}$ 的乙醇与 $50.0\ \mathrm{cm^3}$ 的水混合，你得到的并不是 $100.0\ \mathrm{cm^3}$，而大约只有 $96.5\ \mathrm{cm^3}$，而且倒液体的同时烧瓶还会发热。质量是可加的——$39.5\ \mathrm{g}$ 加 $49.9\ \mathrm{g}$ 永远是 $89.4\ \mathrm{g}$——但体积不是，随体积而变的其它广延性质同样不是。混合物的分子并不会把纯物质的性质原封不动地带进「社交场合」：氢键把双方都重新组织起来，堆积变得更紧密，整体于是比部分之和更小。本章的一切都从这一个事实生长出来。一旦混合物的性质不再是纯物质性质之和，我们就需要新的量来描述它们*究竟*如何相加——偏摩尔量——还需要化学势对组成的新依赖关系，而这个依赖原来是一个对数。由这个对数引出拉乌尔定律与亨利定律、一切理想溶液的自发混合、盐能融冰融雪的道理、让细胞不至于胀破的渗透压，以及每一座蒸馏塔所依据的相图形状。

我们借用的工具有：[[thermodynamics/free-energy]]中的化学势 $\mu_i = \left(\partial G/\partial n_i\right)_{T,p,n_{j\ne i}}$、[[thermodynamics/phase-equilibria]]中的相律与 $\mu_\alpha = \mu_\beta$ 条件，以及[[thermodynamics/second-law]]中的熵记账。符号约定不变：$\Delta U = q + w$，$w$ 是**对**系统做的功，且 $p^\circ = 1\ \mathrm{bar}$。

## 偏摩尔量

::: definition 偏摩尔量 {#def-partial-molar}
混合物中组分 $i$ 的**偏摩尔量** $\bar{J}_i$ 是某个广延性质 $J$（体积、热力学能、焓、熵、吉布斯能、热容……）对组分 $i$ 的偏导数，即在温度、压力及其它各组分的物质的量都不变的条件下，向大量混合物中加入一摩尔 $i$ 时 $J$ 的改变：
$$
\bar{J}_i \equiv \left(\frac{\partial J}{\partial n_i}\right)_{T,p,n_{j\ne i}} .
$$
下划线式的上杠是符号的一部分；$\bar{V}_i$ 称为**偏摩尔体积**，$\bar{H}_i$ 称为**偏摩尔焓**。化学势 $\mu_i$ 就是偏摩尔吉布斯能，$\bar{G}_i = \mu_i$——这正是它在[[thermodynamics/free-energy]]中先于混合物出场的原因。
:::

定义中有三个特点值得在计算之前先内化于心。第一，$\bar{J}_i$ 是强度性质：它依赖组成，而不依赖混合物的多少，并且会随着稀释而改变。第二，求导要在恒定 $T$ *和* $p$ 下进行，因为那正是 $G$ 的自然变量组，也是实验室所能控制的变量组。第三，偏摩尔体积未必为正，甚至未必接近纯物质的摩尔体积：溶质的 $\bar{V}_2$ 可以为负——硫酸镁在水中的中等浓度下就有 $\bar{V}_2 < 0$，因为 $\mathrm{Mg^{2+}}$ 周围电致收缩的水比它原来所在的自由水占的地方更小。往溶液里再溶入溶质，溶液反而可能*缩小*。

::: proposition 广延性质的欧拉展开 {#prop-euler}
混合物的任何广延性质 $J$ 都等于其偏摩尔贡献之和，
$$
J = \sum_i n_i \bar{J}_i ,
$$
即混合物的性质由各组分的偏摩尔量按其物质的量加权求和而得。对体积而言，$V = n_\mathrm{A}\bar{V}_\mathrm{A} + n_\mathrm{B}\bar{V}_\mathrm{B} + \cdots$。
:::

::: proof
$J(T, p, n_1, n_2, \ldots)$ 是广延量：在固定 $T$、$p$ 和组成下把所有物质的量同倍放大，$J$ 也同倍放大，所以在固定 $T$、$p$ 下它是各 $n_i$ 的一次齐次函数。它在恒定 $T$、$p$ 下的全微分为
$$
\mathrm{d}J = \sum_i \left(\frac{\partial J}{\partial n_i}\right)_{T,p,n_{j\ne i}} \mathrm{d}n_i = \sum_i \bar{J}_i\,\mathrm{d}n_i .
$$
现在沿路径 $n_i(\lambda) = \lambda n_i$（$0 \le \lambda \le 1$）把每个 $n_i$ 从零增大到终值，从而把混合物「配制」出来，此时 $\mathrm{d}n_i = n_i\,\mathrm{d}\lambda$。由于沿此路径组成始终不变，每个 $\bar{J}_i$ 在其上都是常数，于是
$$
J = \int_0^1 \sum_i \bar{J}_i\, n_i\,\mathrm{d}\lambda = \sum_i n_i \bar{J}_i . \qquad \blacksquare
$$
把展开式用于 $G$，得到 $G = \sum_i n_i \mu_i$——化学势是*每摩尔组分*的化学势，而不是每摩尔混合物的。
:::

::: proposition 吉布斯-杜亥姆方程 {#prop-gibbs-duhem}
在恒定温度和压力下，混合物各组分的偏摩尔量不能随组成独立变化，它们由
$$
\sum_i n_i\,\mathrm{d}\bar{J}_i = 0 \qquad (\text{constant } T, p)
$$
联系在一起，此即**吉布斯-杜亥姆方程**。特别地，在恒定 $T$、$p$ 下 $\sum_i n_i\,\mathrm{d}\mu_i = 0$：若某一组分的化学势随组成升高，另一组分的化学势就必须下降。
:::

::: proof
在恒定 $T$、$p$ 下对欧拉展开 $J = \sum_i n_i \bar{J}_i$ 求微分：
$$
\mathrm{d}J = \sum_i n_i\,\mathrm{d}\bar{J}_i + \sum_i \bar{J}_i\,\mathrm{d}n_i .
$$
而由 $\bar{J}_i$ 的定义读出的同一个微分是 $\mathrm{d}J = \sum_i \bar{J}_i\,\mathrm{d}n_i$。两式相减即得 $\sum_i n_i\,\mathrm{d}\bar{J}_i = 0$。对 $J = G$ 便是 $\sum_i n_i\,\mathrm{d}\mu_i = 0$，这是在[[thermodynamics/phase-equilibria]]与[[thermodynamics/reaction-equilibrium]]中贯穿使用的形式；它正是「平衡条件使各强度变量相互制约」这一命题的数学内容。
:::

::: example 乙醇与水的体积收缩 {#ex-contraction}
$20\,^\circ\mathrm{C}$ 时密度（CRC）为 $\rho(\text{乙醇}) = 0.7893\ \mathrm{g\,cm^{-3}}$、$\rho(\text{水}) = 0.9982\ \mathrm{g\,cm^{-3}}$。各取 $50.0\ \mathrm{cm^3}$ 混合：最终体积约为 $96.5\ \mathrm{cm^3}$。求摩尔分数与体积收缩量，并解释为什么这一结果与质量可加性并不矛盾。
::: solution
两组分的质量为 $m_\mathrm{E} = 50.0 \times 0.7893 = 39.5\ \mathrm{g}$、$m_\mathrm{W} = 50.0 \times 0.9982 = 49.9\ \mathrm{g}$，以 $M_\mathrm{E} = 46.07\ \mathrm{g\,mol^{-1}}$、$M_\mathrm{W} = 18.02\ \mathrm{g\,mol^{-1}}$ 计算，
$$
n_\mathrm{E} = \frac{39.5}{46.07} = 0.857\ \mathrm{mol}, \qquad
n_\mathrm{W} = \frac{49.9}{18.02} = 2.77\ \mathrm{mol}, \qquad
x_\mathrm{E} = \frac{0.857}{3.627} = 0.236 .
$$
收缩量 $\Delta V = 96.5 - 100.0 = -3.5\ \mathrm{cm^3}$，约占总体积的 $3.5\,\%$——大到肉眼可见，其成因是水的氢键网络接纳了乙醇的羟基，而乙基则嵌进网络的空隙之中。质量可加，因为它是分子数目的求和；体积不可加，因为它是分子*彼此相处*方式的性质。在欧拉展开中，$V = n_\mathrm{E}\bar{V}_\mathrm{E} + n_\mathrm{W}\bar{V}_\mathrm{W}$，此组成下 $\bar{V}_\mathrm{E} \approx 55\ \mathrm{cm^3\,mol^{-1}}$，明显低于乙醇纯物质的摩尔体积 $58.3\ \mathrm{cm^3\,mol^{-1}}$。
:::
:::

::: example 截距法 {#ex-intercept}
$25\,^\circ\mathrm{C}$ 下某盐溶于 $1000\ \mathrm{g}$ 水所成溶液的体积，可用平滑拟合式 $V/\mathrm{cm^3} = 1000.0 + 34.60\,n_\mathrm{B} - 0.940\,n_\mathrm{B}^{3/2}$ 表示，$n_\mathrm{B}$ 为盐的物质的量（单位摩尔；这是溶液数据汇编中常见类型的示意性数字）。求 $n_\mathrm{B} = 2.00\ \mathrm{mol}$ 时的 $\bar{V}_\mathrm{B}$ 与 $\bar{V}_\mathrm{A}$。
::: solution
由定义，$\bar{V}_\mathrm{B} = \left(\partial V/\partial n_\mathrm{B}\right)_{T,p,n_\mathrm{A}}$，故
$$
\bar{V}_\mathrm{B} = 34.60 - 1.5\times 0.940\, n_\mathrm{B}^{1/2} = 34.60 - 1.410\times\sqrt{2.00} = 34.60 - 1.99 = 32.6\ \mathrm{cm^3\,mol^{-1}} .
$$
$\bar{V}_\mathrm{A}$ **不需要**第二次拟合：恒定 $T$、$p$ 下的吉布斯-杜亥姆方程 $n_\mathrm{A}\,\mathrm{d}\bar{V}_\mathrm{A} + n_\mathrm{B}\,\mathrm{d}\bar{V}_\mathrm{B} = 0$ 说明，一旦知道 $\bar{V}_\mathrm{B}$ 随组成的变化，$\bar{V}_\mathrm{A}$ 就被确定到一个常数以内——而欧拉展开提供了这个常数。取 $n_\mathrm{A} = 1000/18.02 = 55.5\ \mathrm{mol}$，$V = 1000.0 + 34.60\times2.00 - 0.940\times2.00^{3/2} = 1066.5\ \mathrm{cm^3}$，
$$
\bar{V}_\mathrm{A} = \frac{V - n_\mathrm{B}\bar{V}_\mathrm{B}}{n_\mathrm{A}}
= \frac{1066.5 - 2.00\times 32.6}{55.5} = \frac{1001.3}{55.5} = 18.0\ \mathrm{cm^3\,mol^{-1}} ,
$$
与纯水的摩尔体积几乎相同——在这样稀的溶液中本应如此。几何上，在固定 $n_\mathrm{A}$ 下作 $V$ 对 $n_\mathrm{B}$ 的曲线：某点处切线的斜率是 $\bar{V}_\mathrm{B}$，而切线在 $n_\mathrm{A}$ 轴上的截距除以 $n_\mathrm{A}$ 就是 $\bar{V}_\mathrm{A}$——这就是经典的**截距法**，也是为什么一条实测曲线能同时给出*两个*偏摩尔体积。
:::
:::

::: quiz
关于偏摩尔量，下列哪种说法正确？
- [x] 偏摩尔体积可以为负：继续溶解溶质可能使溶液缩小。
- [ ] 偏摩尔体积总是介于零与该组分的纯物质摩尔体积之间。
- [ ] $\bar{J}_i$ 依赖混合物的多少，因为它是通过广延量 $J$ 定义的。
- [ ] 组分的偏摩尔吉布斯能在原则上不同于它的化学势。
::: solution
电解质在某些浓度下经常有负的偏摩尔体积（硫酸镁是教科书级的例子），所以第一条对、第二条错。$\bar{J}_i$ 是强度量——依赖组成而不依赖体系大小，第三条因此错误。而 $\bar{G}_i = \mu_i$ *就是*化学势，第四条按定义即错。
:::
:::

## 混合物中组分的化学势

对于理想气体，[[thermodynamics/free-energy]]中的论证可以逐个组分地推广。理想气体混合物中每种气体都仿佛其它气体不存在一样膨胀到整个体积（焦耳定律，[[thermodynamics/first-law]]），所以它的化学势只依赖它自己的分压，而[[general-chemistry-1/gases]]中的道尔顿（Dalton）定律给出 $p_i = x_i p$：
$$
\mu_\mathrm{A}(T, p_\mathrm{A}) = \mu_\mathrm{A}^\circ(T) + RT\ln\frac{p_\mathrm{A}}{p^\circ} .
$$

::: example 理想气体混合物中组分的化学势 {#ex-mu-gas}
$298.15\ \mathrm{K}$、总压 $1.00\ \mathrm{bar}$ 的空气中 $x(\mathrm{N_2}) = 0.78$。问空气中 $\mathrm{N_2}$ 的化学势比同温同压（$p = 1.00\ \mathrm{bar}$）下纯 $\mathrm{N_2}$ 的化学势低多少？
::: solution
$p(\mathrm{N_2}) = 0.78\ \mathrm{bar}$，故
$$
\mu_\mathrm{A} - \mu_\mathrm{A}^{*} = RT\ln\frac{p_\mathrm{A}}{p} = 8.314 \times 298.15 \times \ln 0.78 = -616\ \mathrm{J\,mol^{-1}} .
$$
负号就是混合的吉布斯能：氮分散在空气里比单独装瓶、同压下*更*稳定，每摩尔稳定 $0.62\ \mathrm{kJ}$。正是这一个对数，解释了为什么气体能以任意比例自发混合，也解释了为什么把它们分离开来必须消耗功——空气分离工业就是这条公式的逆过程。
:::
:::

液体没有这样简单的出发点，所以溶液中的理想行为是通过可测的蒸气压来*定义*的。

::: definition 理想溶液与拉乌尔定律 {#def-ideal-solution}
若液体混合物中每个组分在整个组成范围内都服从**拉乌尔定律**，则称其为**理想溶液**：每个组分的分蒸气压等于其纯态蒸气压乘以其摩尔分数，
$$
p_\mathrm{A} = x_\mathrm{A}\,p_\mathrm{A}^{*}, \qquad p_\mathrm{B} = x_\mathrm{B}\,p_\mathrm{B}^{*},
$$
其中 $p_\mathrm{A}^{*}$ 是纯 A 在混合物温度下的蒸气压。苯-甲苯、正己烷-正庚烷以及许多结构相似的分子对，其偏离在百分之几以内；此时总压 $p = x_\mathrm{A} p_\mathrm{A}^{*} + x_\mathrm{B} p_\mathrm{B}^{*}$，是连接 $p_\mathrm{B}^{*}$ 与 $p_\mathrm{A}^{*}$ 的一条直线。
:::

::: proposition 理想溶液中组分的化学势 {#prop-mu-solution}
对于理想溶液中的组分 A，取同温同压下的纯液体为标准态（对液体记 $\mu_\mathrm{A}^{*} \equiv \mu_\mathrm{A}^\circ$），则
$$
\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT \ln x_\mathrm{A} .
$$
这个对数与理想气体出现的完全相同——说话的是混合熵，而不是任何能量效应。
:::

::: proof
溶液上方的蒸气与液体平衡，故 $\mu_\mathrm{A}(\text{liq}) = \mu_\mathrm{A}(\text{vap})$。把蒸气当作理想气体，在分压 $p_\mathrm{A}$ 下使用气体表达式，
$$
\mu_\mathrm{A}(\text{liq}) = \mu_\mathrm{A}^{\circ} + RT\ln\frac{p_\mathrm{A}}{p^\circ} .
$$
对与自身蒸气在 $p_\mathrm{A}^{*}$ 下平衡的纯液体，同一方程写作 $\mu_\mathrm{A}^{*} = \mu_\mathrm{A}^{\circ} + RT\ln(p_\mathrm{A}^{*}/p^\circ)$。两式相减得 $\mu_\mathrm{A}(\text{liq}) - \mu_\mathrm{A}^{*} = RT\ln(p_\mathrm{A}/p_\mathrm{A}^{*})$，再由拉乌尔定律把压力比换成 $x_\mathrm{A}$。这个证明同时说明了「理想」的代价：它假设蒸气是理想的，且拉乌尔定律成立——其余一切皆由此推出。
:::

## 混合热力学

::: proposition 理想溶液的混合热力学函数 {#prop-mixing}
当 $n = \sum_i n_i$ 摩尔纯液体在恒定 $T$、$p$ 下形成理想溶液，记 $x_i = n_i/n$，则
$$
\Delta_\text{mix}G = nRT\sum_i x_i \ln x_i < 0, \qquad
\Delta_\text{mix}S = -nR\sum_i x_i \ln x_i > 0,
$$
$$
\Delta_\text{mix}H = 0, \qquad \Delta_\text{mix}V = 0, \qquad
\Delta_\text{mix}U = 0 .
$$
一切理想溶液都能从其纯液体在任何组成下自发形成，既不吸放热，也无体积变化；全部驱动力都是混合熵。
:::

::: proof
$\Delta_\text{mix}G = G(\text{solution}) - \sum_i n_i \mu_{\mathrm{m},i}^{*}$；代入 $\mu_i = \mu_i^{*} + RT\ln x_i$ 得 $\Delta_\text{mix}G = RT\sum_i n_i \ln x_i$，而每个 $\ln x_i < 0$ 使其为负。因为 $\Delta_\text{mix}G$ 正比于 $T$，故 $\Delta_\text{mix}S = -\partial(\Delta_\text{mix}G)/\partial T = -nR\sum_i x_i\ln x_i$，而 $G = H - TS$ 随即迫使 $\Delta_\text{mix}H = \Delta_\text{mix}G + T\Delta_\text{mix}S = 0$：理想溶液混合无热效应，恰如拉乌尔定律所要求的那样。$\Delta_\text{mix}V = \partial\Delta_\text{mix}G/\partial p = 0$，因为 $\Delta_\text{mix}G$ 中不含压力项；$\Delta_\text{mix}U = \Delta_\text{mix}H - \Delta(pV) = 0$。这个熵公式与[[thermodynamics/second-law]]中为理想气体导出的 $\Delta_\text{mix}S = -nR\sum x_i\ln x_i$ 完全一致——混合首先是熵的事，物态是其次的事。
:::

::: example 混合苯与甲苯 {#ex-mix-benzene}
$2.00\ \mathrm{mol}$ 苯与 $3.00\ \mathrm{mol}$ 甲苯在 $298.15\ \mathrm{K}$ 下混合；该物系的理想性在百分之几以内。求 $\Delta_\text{mix}G$、$\Delta_\text{mix}S$、$\Delta_\text{mix}H$ 与 $\Delta_\text{mix}V$。
::: solution
$x_\mathrm{B} = 0.400$，$x_\mathrm{T} = 0.600$，故 $\sum x_i\ln x_i = 0.400\ln 0.400 + 0.600\ln 0.600 = -0.3665 - 0.3065 = -0.6730$。于是
$$
\Delta_\text{mix}G = 5.00 \times 8.314 \times 298.15 \times (-0.6730) = -8.34\ \mathrm{kJ},
$$
$$
\Delta_\text{mix}S = +28.0\ \mathrm{J\,K^{-1}}, \qquad \Delta_\text{mix}H = 0, \qquad \Delta_\text{mix}V = 0 .
$$
仅仅让两种相似的液体共用一只烧瓶，就出现八点五千焦的吉布斯能——原则上足以驱动机器；而在实践中，这正是蒸馏必须消耗能量来「撤销」混合的原因。
:::
:::

::: widget plot
f: x*log(x) + (1-x)*log(1-x) + chi*x*(1-x)
x: 0.01, 0.99
y: -0.75, 1.0
sliders: chi=0:0:6:0.1
vlines: 0.5
labels: \Delta_\text{mix}G_\mathrm{m}/RT
caption: 正规溶液摩尔混合吉布斯能（以 $RT$ 为单位）的曲线，$\Delta_\text{mix}G_\mathrm{m}/RT = x\ln x + (1-x)\ln(1-x) + \chi x(1-x)$，相互作用参数 $\chi$ 由滑块调节。$\chi = 0$ 时曲线即理想溶液：处处为负，极小值唯一，位于 $x = 0.5$，混合总是自发。把 $\chi$ 调大——A-B 接触不利，$\Delta_\text{mix}H$ 为正——势阱变平；超过 $\chi = 2$ 后曲线出现两个极小值、中间隔着一个驼峰，单一相相对于分成两个组成变得不稳定。混合熵只在焓不太作对的时候才保证自发性。
:::

::: warning 理想混合并非混溶性的全部故事 {#warn-miscibility}
「$\Delta_\text{mix}S > 0$，所以 $\Delta_\text{mix}G < 0$」是一条关于*理想*溶液的定理，把它随意推广是常见的考试错误。当异种分子相互「嫌弃」时，$\Delta_\text{mix}H > 0$，而混合的 $T\Delta S$ 优势——在最佳组成处每摩尔至多 $RT\ln 2 \approx 1.7\ \mathrm{kJ\,mol^{-1}}$，是个小数字——可能被压过。此时 $\Delta_\text{mix}G$ 出现两个极小值，混合物分裂成两个液相：油与水、水与丁醇、以及升温反而分相的聚合物共混物（上临界共溶温度行为）。混合熵真实但微弱；日常生活中大多数混溶性来自有利的相互作用，而不是那个对数。
:::

## 真实溶液：偏差、亨利定律与活度

真实溶液对拉乌尔定律的偏离有系统的方向。若 A-B 吸引力*弱于*它们取代的 A-A 与 B-B 吸引力（丙酮-二硫化碳、乙醇-正己烷），分子比理想情形更容易逃逸，$p_\mathrm{A} > x_\mathrm{A}p_\mathrm{A}^{*}$：这是**正偏差**，$\Delta_\text{mix}H > 0$，溶液降温时会趋向分层，总压曲线可能出现极大值——即**最低共沸物**，如乙醇-水，其在常压下于约 $95.6$ 质量分数乙醇处沸腾，沸点 $78.2\,^\circ\mathrm{C}$，蒸馏无法越过。若 A-B 吸引力*更强*（氯仿-丙酮、丙酮-苯胺），则 $p_\mathrm{A} < x_\mathrm{A}p_\mathrm{A}^{*}$：这是**负偏差**，$\Delta_\text{mix}H < 0$，并出现最高共沸物，如 $20.2\,\%$ 的盐酸。

对于稀溶液中的*溶质*，普遍成立的规律不是拉乌尔定律，而是亨利定律。

::: definition 亨利定律 {#def-henry}
在稀的理想稀溶液中，溶质的蒸气压与其摩尔分数成正比，比例常数自成一类，
$$
p_\mathrm{B} = K_\mathrm{B}\, x_\mathrm{B} \qquad (x_\mathrm{B} \to 0),
$$
**亨利常数** $K_\mathrm{B}$ 取决于溶质-溶剂对与温度。溶剂仍服从拉乌尔定律；溶质服从亨利定律。物理上，溶质分子被溶剂包围，其逃逸倾向由溶剂环境决定，而非由纯溶质决定——这正是一般情况下 $K_\mathrm{B} \ne p_\mathrm{B}^{*}$ 的原因。对气体而言，这就是溶解度理论的全部：$p_\mathrm{B} = K_\mathrm{B} x_\mathrm{B}$ 说溶解气体的浓度正比于其分压（威廉·亨利（William Henry），1803 年），而 $\mathrm{O_2}$、$\mathrm{N_2}$ 这类气体的 $K_\mathrm{B} \gg p_\mathrm{B}^{*}$，因为要让它们以纯液体形式在一巴下存在需要深冷的低温。
:::

::: example 由亨利定律求氧在水中的溶解度 {#ex-henry-o2}
$298\ \mathrm{K}$ 下 $\mathrm{O_2}$ 在水中的 $K_\mathrm{B} = 4.37\times 10^{4}\ \mathrm{bar}$（Atkins）。求 $1.00\ \mathrm{bar}$ 空气（$x(\mathrm{O_2}) = 0.21$）饱和的水中溶解氧的浓度。
::: solution
$$
x(\mathrm{O_2}) = \frac{p(\mathrm{O_2})}{K_\mathrm{B}} = \frac{0.21}{4.37\times10^{4}} = 4.8\times 10^{-6}.
$$
稀溶液中 $n(\mathrm{O_2})/n(\mathrm{H_2O}) = x(\mathrm{O_2})$，而水为 $55.34\ \mathrm{mol\,L^{-1}}$，故
$$
c(\mathrm{O_2}) = 4.8\times10^{-6} \times 55.34\ \mathrm{mol\,L^{-1}} = 2.7\times 10^{-4}\ \mathrm{mol\,L^{-1}},
$$
即 $2.7\times10^{-4} \times 32.00\ \mathrm{g\,mol^{-1}} = 8.5\ \mathrm{mg\,L^{-1}}$——正是数据表中充空气水的饱和含氧量，也刚好够鱼呼吸。同一个常数的亨利定律还解释了为什么潜水员在深水会得氮麻醉（五巴的 $p_{\mathrm{N_2}}$ 溶入五倍的氮气），以及为什么打开汽水瓶盖会冒泡（$p_{\mathrm{CO_2}}$ 从 $4$ 巴骤降到 $0.0004$ 巴）。
:::
:::

::: warning 两种标准态，两个不同的 μ° {#warn-standard-state}
溶质的化学势可以写成两种形式，把二者混为一谈会污染其后的一切计算。写 $\mu_\mathrm{B} = \mu_\mathrm{B}^{\circ,x} + RT\ln x_\mathrm{B}$ 是把标准态锚定在*拉乌尔约定*——纯液体 B，B 为气体时是假想态——$\mu_\mathrm{B}^{\circ,x}$ 中包含 $\ln K_\mathrm{B}$；写 $\mu_\mathrm{B} = \mu_\mathrm{B}^{\circ,b} + RT\ln(b_\mathrm{B}/b^\circ)$ 则锚定在*质量摩尔浓度（溶质）约定*，$b^\circ = 1\ \mathrm{mol\,kg^{-1}}$。两个 $\mu^\circ$ 相差一个只依赖溶剂摩尔体积的常数，因此由 $x$ 与由 $b$ 构成的平衡常数也相差这个常数。两者都不错；它们是同一把尺子上不同的零点，而数据表中水物种的 $\Delta_\mathrm{f}G^\circ$ 恰好只属于其中之一（质量摩尔浓度约定，生物化学几乎总是如此）。拿到一个数值，先问它是用哪把尺子写下的。
:::

::: definition 活度与活度系数 {#def-activity}
组分的**活度** $a_i$ 由保持化学势的理想形式成立来定义，
$$
\mu_i = \mu_i^{\circ} + RT \ln a_i, \qquad a_i \equiv \gamma_i x_i ,
$$
**活度系数** $\gamma_i$ 度量对理想行为的偏离：$\gamma_i \to 1$（当 $x_i \to 1$，拉乌尔约定）或 $\gamma_i \to 1$（当 $x_i \to 0$，亨利约定）。活度就是「让理想公式成真的那个摩尔分数」——这是吉尔伯特·路易斯（Gilbert Lewis）的说法（1916 年），他与梅尔·兰德尔（Merle Randall）把它完善为溶液热力学的实用工具。对电解质，同一思想进入[[thermodynamics/ions-in-solution]]与[[electrochemistry/cell-thermodynamics]]后成为平均离子活度系数。
:::

::: widget plot
f: pstar*x; KH*x
x: 0, 1
y: 0, 800
sliders: pstar=74:20:200:1; KH=300:50:800:1
labels: \text{拉乌尔：}x\,p_\mathrm{B}^{*}; \text{亨利：}K_\mathrm{B}\,x
caption: 溶质蒸气压的两条过原点直线：拉乌尔线 $x\,p_\mathrm{B}^{*}$（斜率为纯液体蒸气压，滑块调节）与亨利线 $K_\mathrm{B}x$（斜率为亨利常数，滑块调节）。对真实溶液，$p_\mathrm{B}$ 曲线在 $x \to 0$ 时与亨利线相切，在 $x \to 1$ 时与拉乌尔线相交；正偏差意味着 $K_\mathrm{B} > p_\mathrm{B}^{*}$，负偏差意味着 $K_\mathrm{B} < p_\mathrm{B}^{*}$。把两条斜率调到相等，两条定律的区别就消失了——那正是理想溶液情形，也正是为什么说两条定律是关于两个极限的同一句话，而非两条竞争的定律。
:::

::: history 从拉乌尔的温度计到路易斯的活度 {#hist-mixtures}
弗朗索瓦-马里·拉乌尔（François Marie Raoult）在十九世纪八十年代测量溶液的凝固点与蒸气压，于 1887 年发表了以他命名的定律：溶剂蒸气压的降低正比于溶质的摩尔分数——这一定律来自数百次凝固点降低与沸点升高测定。更早五年，雅可比·亨德里克·范特霍夫（Jacobus Henricus van 't Hoff）在 1887 年证明，稀溶质降低凝固点、产生渗透压，恰如气体占据溶液体积一般，$\Pi V = nRT$，并主要凭此获得首届诺贝尔化学奖（1901 年）。多组分平衡的普遍理论——偏摩尔量、吉布斯-杜亥姆方程（吉布斯（Gibbs），十九世纪七十年代；杜亥姆（Duhem），1886 年）、相律——都写进[[thermodynamics/second-law]]中已见过的 1876 年巨著《关于多相物质平衡》。威廉·亨利（William Henry）在 1803 年读出气体溶解度的正比关系，比理论早了一个世纪的经验脚手架。吉尔伯特·牛顿·路易斯（Gilbert Newton Lewis）于 1916 年引入活度与逸度，以挽救理想形式方程对真实溶液的适用性；他与梅尔·兰德尔（Merle Randall）合著的 1923 年巨著 *Thermodynamics and the Free Energy of Chemical Substances* 给出了至今每张数据表仍在使用的活度系数与标准态。
:::

## 依数性：粒子的民主

因为 $\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT\ln x_\mathrm{A}$ 对溶质的依赖只通过 $x_\mathrm{A}$——一个数字，没有化学——稀释的一切后果都是*依数性*的：它数的是粒子，不是身份。一摩尔 $\mathrm{NaCl}$ 约算作两摩尔粒子（范特霍夫因子 $i$），这就是盐能作融雪剂、静脉注射液必须等渗的原因。

**蒸气压下降。** 在恒定 $T$ 下，$p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$：溶质摩尔分数为 $0.010$ 时，溶剂蒸气压下降 $1.0\,\%$；对 $25\,^\circ\mathrm{C}$ 的水，即下降 $0.010 \times 3.17\ \mathrm{kPa} = 0.032\ \mathrm{kPa}$。

**沸点升高。** 溶液在 $x_\mathrm{A} p_\mathrm{A}^{*}(T) = p_\text{ex}$ 时沸腾，所以更低的 $p_\mathrm{A}^{*}$ 等效值要求更高的 $T$。

::: proposition 沸点升高与凝固点降低 {#prop-colligative}
对非挥发性溶质的稀溶液，
$$
\Delta T_\mathrm{b} = K_\mathrm{b}\, b_\mathrm{B}, \qquad K_\mathrm{b} = \frac{R\,T_\mathrm{b}^{*2}\,M_\mathrm{A}}{\Delta_\text{vap}H},
\qquad\qquad
\Delta T_\mathrm{f} = K_\mathrm{f}\, b_\mathrm{B}, \qquad K_\mathrm{f} = \frac{R\,T_\mathrm{f}^{*2}\,M_\mathrm{A}}{\Delta_\text{fus}H},
$$
其中 $b_\mathrm{B}$ 为溶质*粒子*的质量摩尔浓度，$M_\mathrm{A}$ 为溶剂的摩尔质量。对水，$K_\mathrm{b} = 0.512\ \mathrm{K\,kg\,mol^{-1}}$、$K_\mathrm{f} = 1.86\ \mathrm{K\,kg\,mol^{-1}}$（CRC）；这种不对称——凝固点降低的灵敏度是沸点升高的三倍多——正是为什么十克盐保护汽车散热器远比它提高烹饪温度更有用的原因。
:::

::: proof （沸点升高）
沸腾要求 $p_\mathrm{A} = x_\mathrm{A} p_\mathrm{A}^{*}(T_\mathrm{b}) = p_\text{ex}$，而纯溶剂在 $p_\mathrm{A}^{*}(T_\mathrm{b}^{*}) = p_\text{ex}$ 处沸腾。两式相除并取对数，得 $\ln x_\mathrm{A} + \ln p_\mathrm{A}^{*}(T_\mathrm{b}) - \ln p_\mathrm{A}^{*}(T_\mathrm{b}^{*}) = 0$；[[thermodynamics/phase-equilibria]]中的克劳修斯-克拉佩龙方程把压力差换成 $-\left(\Delta_\text{vap}H/R\right)\left(1/T_\mathrm{b} - 1/T_\mathrm{b}^{*}\right)$，于是
$$
\ln x_\mathrm{A} = -\frac{\Delta_\text{vap}H}{R}\left(\frac{1}{T_\mathrm{b}^{*}} - \frac{1}{T_\mathrm{b}}\right)
\approx -\frac{\Delta_\text{vap}H}{R\,T_\mathrm{b}^{*2}}\,\Delta T_\mathrm{b}.
$$
稀溶液中 $\ln x_\mathrm{A} = \ln(1 - x_\mathrm{B}) \approx -x_\mathrm{B} \approx -n_\mathrm{B}/n_\mathrm{A} = -M_\mathrm{A} b_\mathrm{B}$，即得所求。凝固点形式只需把 $\Delta_\text{vap}H$ 换成 $\Delta_\text{fus}H$——固溶平衡 $\mu_\mathrm{A}(\text{solid}) = \mu_\mathrm{A}(\text{solution})$——两者在稀溶液极限下都是精确的，对 $b_\mathrm{B}$ 为一阶。
:::

::: example 水的沸点升高常数 {#ex-kb-water}
由 $T_\mathrm{b}^{*} = 373.15\ \mathrm{K}$、$\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$（NIST）与 $M_\mathrm{A} = 18.02\times10^{-3}\ \mathrm{kg\,mol^{-1}}$ 计算水的 $K_\mathrm{b}$，并用它求 $500\ \mathrm{g}$ 水中溶有 $0.100\ \mathrm{mol}$ 葡萄糖的溶液的沸点。
::: solution
$$
K_\mathrm{b} = \frac{8.314 \times 373.15^{2} \times 18.02\times10^{-3}}{40\,660} = 0.513\ \mathrm{K\,kg\,mol^{-1}},
$$
与表列值 $0.512$ 在 $\Delta_\text{vap}H$ 的精度内一致。由 $b = 0.100/0.500 = 0.200\ \mathrm{mol\,kg^{-1}}$，
$$
\Delta T_\mathrm{b} = 0.513 \times 0.200 = 0.103\ \mathrm{K},
$$
故溶液沸点为 $373.25\ \mathrm{K}$。十分摩尔的糖溶液只比纯水高沸点十分之一度：对厨房里的溶质浓度而言，依数性真实但数值很小；只有对小分子溶质的高浓度溶液——或者对成倍计数的离子——它才变得显著。
:::
:::

**渗透压。** 用只透过溶剂的膜把溶剂与溶液隔开，溶剂就*流入*溶液，直到压力差 $\Pi$ 把溶剂的化学势重新抬到相等。

::: proposition 渗透压 {#prop-osmotic}
稀溶液的渗透压满足**范特霍夫方程**
$$
\Pi = c_\mathrm{B} R T ,
$$
其中 $c_\mathrm{B}$ 为溶质*粒子*的物质的量浓度——与理想气体定律在形式上完全相同，而统计上的理由也相同。
:::

::: proof
平衡时，溶液中被加压到 $p + \Pi$ 的溶剂的化学势等于纯溶剂在 $p$ 下的化学势：
$$
\mu_\mathrm{A}^{*}(p + \Pi) + RT\ln x_\mathrm{A} = \mu_\mathrm{A}^{*}(p).
$$
由 $\left(\partial\mu/\partial p\right)_T = V_\mathrm{m}$ 且液体的 $V_\mathrm{m}$ 几乎不变，$\mu_\mathrm{A}^{*}(p+\Pi) - \mu_\mathrm{A}^{*}(p) = \Pi V_\mathrm{m}$，故 $\Pi V_\mathrm{m} = -RT\ln x_\mathrm{A} \approx RT\,x_\mathrm{B} = RT\,n_\mathrm{B}/n_\mathrm{A}$。两边乘以 $n_\mathrm{A}$，并注意到 $n_\mathrm{A}V_\mathrm{m} \approx V$ 即溶液体积，即得 $\Pi V = n_\mathrm{B}RT$。[[general-chemistry-2/entropy-free-energy]]中关于 $K(T)$ 的范特霍夫方程与此同名，推导的神髓也相同：两者都把 $RT$ 读作一个对数的代价。
:::

::: example 由渗透压求摩尔质量 {#ex-osmotic}
每升溶液含 $20.0\ \mathrm{g}$ 某种蛋白质的溶液，在 $298.15\ \mathrm{K}$ 下产生 $0.500\ \mathrm{kPa}$ 的渗透压。求该蛋白质的摩尔质量。
::: solution
$$
c = \frac{\Pi}{RT} = \frac{500\ \mathrm{Pa}}{8.314 \times 298.15\ \mathrm{J\,mol^{-1}}} = 0.2017\ \mathrm{mol\,m^{-3}} = 2.017\times10^{-4}\ \mathrm{mol\,L^{-1}},
$$
$$
M = \frac{20.0\ \mathrm{g\,L^{-1}}}{2.017\times10^{-4}\ \mathrm{mol\,L^{-1}}} = 9.9\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
同一溶液的凝固点降低仅约 $c\,K_\mathrm{f}/\rho \approx 0.0004\ \mathrm{K}$——无法测出——而 $\Pi$ 却是可观的 $5\ \mathrm{mbar}$，相对大小是前者的数百倍。这就是为什么生物化学称量大分子用的是渗透压法而非凝固点降低法，也是为什么这个数值落在每摩尔数万克的量级——依数性的*浓度*效应恰好在灵敏度耗尽之处接力。
:::
:::

::: quiz
下列哪种操作使水的凝固点降得最多？
- [x] 在 $1.00\ \mathrm{kg}$ 水中溶解 $0.20\ \mathrm{mol}$ 的 $\mathrm{NaCl}$。
- [ ] 在 $1.00\ \mathrm{kg}$ 水中溶解 $0.30\ \mathrm{mol}$ 的葡萄糖。
- [ ] 在 $1.00\ \mathrm{kg}$ 水中溶解 $0.25\ \mathrm{mol}$ 的蔗糖。
- [ ] 它们降低得一样多，因为都是稀溶液。
::: solution
依数性数的是*粒子*：$\mathrm{NaCl}$ 每个化学式单元解离成约两个粒子，给出约 $0.40\ \mathrm{mol}$ 粒子——多于葡萄糖的 $0.30$ 和蔗糖的 $0.25$。（真实溶液中离子相互作用使有效计数为 $i \approx 1.9$ 而非 $2.0$；排序不受影响。）第四个选项把「稀」与「粒子数相同」混为一谈。
:::
:::

## 二组分液-气相图

::: proposition 杠杆规则 {#prop-lever}
在二元相图的两相区内，若总组成为 $z$ 的混合物分成组成分别为 $x$（液相）与 $y$（气相）的两相，则两相的物质的量满足
$$
\frac{n_\text{vapour}}{n_\text{liquid}} = \frac{z - x}{y - z},
$$
即**杠杆规则**：两相的量反比于总组成点到两相组成点的距离，仿佛连接线是一根在 $z$ 处支起的杠杆。
:::

::: proof
对组分作物料衡算：$z\,n = x\,n_\mathrm{L} + y\,n_\mathrm{V}$，其中 $n = n_\mathrm{L} + n_\mathrm{V}$。代入 $n_\mathrm{L} = n - n_\mathrm{V}$ 得 $z(n_\mathrm{L} + n_\mathrm{V}) = x\,n_\mathrm{L} + y\,n_\mathrm{V}$，即 $(z - x)n_\mathrm{L} = (y - z)n_\mathrm{V}$，整理即得规则。证明没有用到任何理想性——杠杆规则是算术，对任何二元相图的任何连接线都成立，包括下文的共沸物系。
:::

::: example 读 $p$–$x$ 图：苯-甲苯 {#ex-px}
$100\,^\circ\mathrm{C}$ 时蒸气压（NIST Antoine 方程）为 $p_\mathrm{A}^{*} = 181.1\ \mathrm{kPa}$（苯）、$p_\mathrm{B}^{*} = 74.2\ \mathrm{kPa}$（甲苯）；该物系为理想。**(a)** 组成 $x_\mathrm{A} = 0.30$ 的液体在 $100\,^\circ\mathrm{C}$ 下恒温：求分蒸气压与气相组成。**(b)** 总组成 $z_\mathrm{A} = 0.50$ 的混合物在什么压力以上完全为液体？**(c)** 总组成 $z_\mathrm{A} = 0.50$ 的混合物在 $110\ \mathrm{kPa}$、$100\,^\circ\mathrm{C}$ 下，气化率为多少？
::: solution
**(a)** 拉乌尔定律：$p_\mathrm{A} = 0.30\times181.1 = 54.3\ \mathrm{kPa}$，$p_\mathrm{B} = 0.70\times74.2 = 51.9\ \mathrm{kPa}$，总压 $p = 106.3\ \mathrm{kPa}$。道尔顿定律：$y_\mathrm{A} = 54.3/106.3 = 0.511$——气相中苯比液相更富集（$0.51$ 对 $0.30$），这就是蒸馏的全部原理。
**(b)** 全液相要求 $p \ge z_\mathrm{A}p_\mathrm{A}^{*} + (1-z_\mathrm{A})p_\mathrm{B}^{*} = 0.50\times181.1 + 0.50\times74.2 = 127.7\ \mathrm{kPa}$：即泡点线在 $z = 0.50$ 处的压力。
**(c)** 在 $110\ \mathrm{kPa}$ 下，连接线两端由图中两条直线给出：液相 $x_\mathrm{A} = (110 - 74.2)/(181.1 - 74.2) = 0.335$，气相 $y_\mathrm{A} = 0.335\times181.1/110 = 0.552$。杠杆规则给出
$$
\frac{n_\text{V}}{n_\text{L}} = \frac{z - x}{y - z} = \frac{0.50 - 0.335}{0.552 - 0.50} = \frac{0.165}{0.052} = 3.2,
$$
即约四分之三的物质的量为气相。注意几何代劳了多少：两条直线加一根杠杆，顶替了任何状态方程。
:::
:::

::: widget plot
f: pA*x; pB*(1-x); pA*x + pB*(1-x)
x: 0, 1
y: 0, 300
sliders: pA=181:50:300:1; pB=20:20:200:1
hlines: 101.3
labels: p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}; p_\mathrm{B} = x_\mathrm{B}p_\mathrm{B}^{*}; p_\text{总}
caption: 恒温下理想二元物系的 $p$–$x$ 图：两条分压直线从各自的 $p^{*}$ 线性降到零，总压则是连接 $p_\mathrm{B}^{*}$ 与 $p_\mathrm{A}^{*}$ 的直线（滑块设定两个纯组分蒸气压；水平线为一个大气压）。上方直线是泡点线，下方是露点线；两线之间由命题中的杠杆规则支配。把 $p_\mathrm{A}^{*}$ 向 $p_\mathrm{B}^{*}$ 调低，两线合并——挥发度相同，蒸馏无法分离。真实溶液会让直线弯曲；弯得足够多，总压线就出现极大值，并在泡点线与露点线相切处出现共沸物。
:::

固定压力下的 $T$–$x$ 图是同一幅图的翻转：沸点落在两个纯组分沸点之间，下方曲线（液相）与上方曲线（气相）在两端相接，气相曲线总是位于更易挥发的一侧。对非理想物系，曲线在泡点线与露点线组成相等处相切处出现极小值（正偏差，乙醇-水）或极大值（负偏差，盐酸）——共沸物像纯物质一样沸腾，普通蒸馏无法将其分离，这就是无水乙醇必须用萃取或分子筛制备的原因，也是[[thermodynamics/phase-equilibria]]中的相律把共沸物算作一个约束而非巧合的原因。

## 后续内容

溶液中组分的化学势，正是决定反应方向的同一个量：把 $\mu_i = \mu_i^\circ + RT\ln a_i$ 代入 $\Delta_\mathrm{r}G = \sum_i \nu_i \mu_i$，[[thermodynamics/reaction-equilibrium]]的平衡常数便随之落出，只是以活度取代浓度。把活度思想带进电解质——离子不能单独存在——就到达平均离子活度系数、德拜-休克尔理论以及[[thermodynamics/ions-in-solution]]与[[electrochemistry/cell-thermodynamics]]的电极电势。本章的沸点、凝固点推导，是把[[thermodynamics/phase-equilibria]]的相图透过溶液来读时的稀溶液极限——海冰、石灰软化，以及水相图中熔化线的降低，都住在那里。分子层面的解读——$\Delta_\text{mix}H$ 为何正、为何负，$\chi$ 参数数的是什么——是[[statistical-thermodynamics/real-gases-liquids]]的纲领；理想气体的对数最早见于[[general-chemistry-2/entropy-free-energy]]与[[general-chemistry-1/gases]]。截距法与偏摩尔思想在任何对组成求导的地方重现，包括[[thermodynamics/heat-capacity-adiabatic]]中提到的过量热容。

::: summary
- 混合物的广延性质不可加；正确的展开是 $J = \sum_i n_i \bar{J}_i$，其中偏摩尔量 $\bar{J}_i = \left(\partial J/\partial n_i\right)_{T,p,n_{j\ne i}}$，而化学势就是偏摩尔吉布斯能。
- 吉布斯-杜亥姆方程 $\sum_i n_i\,\mathrm{d}\bar{J}_i = 0$ 把各组分的偏摩尔量绑在一起：一条实测曲线同时给出两个偏摩尔体积（截距法）。
- 理想溶液中每个组分都服从拉乌尔定律 $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$，由此必然推出 $\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT\ln x_\mathrm{A}$。
- 理想溶液 $\Delta_\text{mix}G = nRT\sum x_i\ln x_i < 0$、$\Delta_\text{mix}S = -nR\sum x_i\ln x_i > 0$，且 $\Delta_\text{mix}H = \Delta_\text{mix}V = 0$：混合总是自发，完全由熵驱动。
- 真实溶液对拉乌尔定律有正、负偏差；溶质服从亨利定律 $p_\mathrm{B} = K_\mathrm{B}x_\mathrm{B}$，其标准态另立，而活度 $a_i = \gamma_i x_i$ 恢复了 $\mu_i$ 的理想形式。
- 依数性数的是粒子：$\Delta T_\mathrm{b} = K_\mathrm{b}b$，$K_\mathrm{b} = RT_\mathrm{b}^{*2}M_\mathrm{A}/\Delta_\text{vap}H$；$\Delta T_\mathrm{f} = K_\mathrm{f}b$；$\Pi = cRT$——最后者灵敏到足以称量蛋白质。
- 理想二元物系的 $p$–$x$ 与 $T$–$x$ 图是连接纯组分端点的直线；杠杆规则分配两相的量，而共沸物标志着偏离理想战胜蒸馏之处。
:::

## 练习

::: exercise 混合吉布斯能 {level=1 check="-6.20"}
$1.00\ \mathrm{mol}$ 正己烷与 $4.00\ \mathrm{mol}$ 正庚烷在 $298.15\ \mathrm{K}$ 下混合；该物系为理想。求 $\Delta_\text{mix}G$。（以 $\mathrm{kJ}$ 为单位填数值。）
::: solution
$x_\text{hex} = 0.200$，$x_\text{hep} = 0.800$，$\sum x_i\ln x_i = 0.200\ln 0.200 + 0.800\ln 0.800 = -0.3219 - 0.1785 = -0.5004$。于是
$$
\Delta_\text{mix}G = 5.00 \times 8.314 \times 298.15 \times (-0.5004) = -6.20\ \mathrm{kJ}.
$$
比例 $2:3$ 的算例更不负一些：混合在 $x = 0.5$ 处最划算，因为 $-\sum x\ln x$ 在此最大。
:::
:::

::: exercise 苯-甲苯的拉乌尔定律 {level=1 check="117.0"}
$100\,^\circ\mathrm{C}$ 时 $p_\mathrm{A}^{*} = 181.1\ \mathrm{kPa}$（苯）、$p_\mathrm{B}^{*} = 74.2\ \mathrm{kPa}$（甲苯）。求 $100\,^\circ\mathrm{C}$ 下 $x_\mathrm{A} = 0.40$ 的理想液面上方的总蒸气压。（以 $\mathrm{kPa}$ 为单位填 $p$。）
::: solution
$p = x_\mathrm{A}p_\mathrm{A}^{*} + x_\mathrm{B}p_\mathrm{B}^{*} = 0.40\times181.1 + 0.60\times74.2 = 72.44 + 44.52 = 117.0\ \mathrm{kPa}$，且 $y_\mathrm{A} = 72.44/117.0 = 0.619$。气相中苯富集了 $0.619/0.400 = 1.55$ 倍——相当于一块理想塔板。
:::
:::

::: exercise 沸点升高 {level=1 check="0.102"}
用 $K_\mathrm{b} = 0.512\ \mathrm{K\,kg\,mol^{-1}}$ 求 $500\ \mathrm{g}$ 水中溶有 $0.100\ \mathrm{mol}$ 葡萄糖的溶液的沸点升高值。（以 $\mathrm{K}$ 为单位填 $\Delta T_\mathrm{b}$。）
::: solution
$b = 0.100/0.500 = 0.200\ \mathrm{mol\,kg^{-1}}$，故 $\Delta T_\mathrm{b} = 0.512 \times 0.200 = 0.102\ \mathrm{K}$。葡萄糖不解离，粒子质量摩尔浓度等于化学式质量摩尔浓度；换成 $\mathrm{NaCl}$ 效果几乎翻倍。
:::
:::

::: exercise 推导水的 $K_\mathrm{b}$ {level=2 check="0.513"}
用 $K_\mathrm{b} = RT_\mathrm{b}^{*2}M_\mathrm{A}/\Delta_\text{vap}H$，取 $T_\mathrm{b}^{*} = 373.15\ \mathrm{K}$、$\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$（NIST）、$M_\mathrm{A} = 18.02\times10^{-3}\ \mathrm{kg\,mol^{-1}}$，计算水的沸点升高常数。（以 $\mathrm{K\,kg\,mol^{-1}}$ 为单位填 $K_\mathrm{b}$，保留三位有效数字。）
::: solution
$$
K_\mathrm{b} = \frac{8.314 \times 139\,241 \times 0.01802}{40\,660} = 0.513\ \mathrm{K\,kg\,mol^{-1}},
$$
对比 CRC 值 $0.512$——差异来自推导稀溶液极限中 $\Delta_\text{vap}H$ 的温度依赖。注意其结构：$K_\mathrm{b}$ 对易挥发溶剂（$\Delta_\text{vap}H$ 小）较大，对结合强的溶剂较小，且完全不含溶质的任何性质——这就是「依数」的含义。
:::
:::

::: exercise 渗透压法测摩尔质量 {level=2 check="98000"}
将 $1.00\ \mathrm{g}$ 某聚合物溶于 $100.0\ \mathrm{cm^3}$ 溶液，在 $298.15\ \mathrm{K}$ 下测得渗透压为 $0.253\ \mathrm{kPa}$。求该聚合物的摩尔质量。（以 $\mathrm{g\,mol^{-1}}$ 为单位填 $M$。）
::: solution
$c = \Pi/RT = 253/(8.314\times298.15) = 0.1021\ \mathrm{mol\,m^{-3}} = 1.021\times10^{-4}\ \mathrm{mol\,L^{-1}}$，而浓度为 $10.0\ \mathrm{g\,L^{-1}}$，故
$$
M = \frac{10.0}{1.021\times10^{-4}} = 9.8\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
多分散聚合物由此得到的是数均摩尔质量；同样 $10\ \mathrm{g\,L^{-1}}$ 的溶液凝固点只降低约 $2\times10^{-4}\ \mathrm{K}$，远低于任何凝固点计的分辨能力。
:::
:::

::: exercise 防冻液 {level=2 check="12.0"}
$200\ \mathrm{g}$ 乙二醇 $\mathrm{C_2H_6O_2}$（$M = 62.07\ \mathrm{g\,mol^{-1}}$）溶于 $500\ \mathrm{g}$ 水，能把水的凝固点降低多少？取 $K_\mathrm{f} = 1.86\ \mathrm{K\,kg\,mol^{-1}}$。（以 $\mathrm{K}$ 为单位填 $\Delta T_\mathrm{f}$。）
::: solution
$b = (200/62.07)/0.500 = 6.44\ \mathrm{mol\,kg^{-1}}$，故 $\Delta T_\mathrm{f} = 1.86 \times 6.44 = 12.0\ \mathrm{K}$。在这一质量摩尔浓度上线性定律已经开始吃力（真实值更接近 $11\ \mathrm{K}$），但工程结论不变：此浓度下乙二醇可把散热器保护到约 $-12\,^\circ\mathrm{C}$；乙二醇好用，是因为它便宜、完全混溶，且每千克溶入 $200\ \mathrm{g}$ 就交出六摩尔粒子——离子每克更高效，但会腐蚀发动机。
:::
:::

::: exercise 杜亥姆-马居尔公式 {level=3}
从恒温的吉布斯-杜亥姆方程 $n_\mathrm{A}\,\mathrm{d}\mu_\mathrm{A} + n_\mathrm{B}\,\mathrm{d}\mu_\mathrm{B} = 0$ 出发，证明恒温下
$$
x_\mathrm{A}\,\mathrm{d}\ln p_\mathrm{A} + x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = 0
$$
（杜亥姆-马居尔公式，设蒸气理想），并由此推出：若一个组分在整个组成范围服从拉乌尔定律，另一个组分也必须服从。为什么同样的论证使溶质的亨利定律*蕴含*溶剂的拉乌尔定律？
::: solution
恒温下 $\mathrm{d}\mu_i = RT\,\mathrm{d}\ln p_i$（蒸气平衡，理想蒸气），吉布斯-杜亥姆方程除以 $n$ 即得 $x_\mathrm{A}\,\mathrm{d}\ln p_\mathrm{A} + x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = 0$。若 A 处处服从拉乌尔定律，$p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$，则 $\mathrm{d}\ln p_\mathrm{A} = \mathrm{d}\ln x_\mathrm{A} = \mathrm{d}x_\mathrm{A}/x_\mathrm{A}$；代入得 $x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = -\mathrm{d}x_\mathrm{A} = \mathrm{d}x_\mathrm{B}$，故 $\mathrm{d}\ln p_\mathrm{B} = \mathrm{d}x_\mathrm{B}/x_\mathrm{B} = \mathrm{d}\ln x_\mathrm{B}$，从 $x_\mathrm{B} = 1$（此处 $p_\mathrm{B} = p_\mathrm{B}^{*}$）积分得 $p_\mathrm{B} = x_\mathrm{B}p_\mathrm{B}^{*}$。对亨利定律极限，$x_\mathrm{B} \to 0$ 时 $\mathrm{d}\ln p_\mathrm{B} = \mathrm{d}\ln x_\mathrm{B}$；杜亥姆-马居尔公式随即迫使 $x_\mathrm{A} \to 1$ 附近 $\mathrm{d}\ln p_\mathrm{A} = \mathrm{d}\ln x_\mathrm{A}$，而那里 $p_\mathrm{A} \to p_\mathrm{A}^{*}$，故 $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$：溶剂的拉乌尔定律不是独立的实验事实，而是溶质亨利定律的推论。两条定律，一个方程——吉布斯-杜亥姆方程在替自己记账。
:::
:::

::: exercise 熵失守之时：临界相互作用参数 {level=3 check="2.00"}
正规溶液的 $\Delta_\text{mix}G_\mathrm{m}/RT = x\ln x + (1-x)\ln(1-x) + \chi x(1-x)$。通过求出使 $\partial^2(\Delta_\text{mix}G_\mathrm{m}/RT)/\partial x^2 > 0$ 对一切 $x$ 成立的最大 $\chi$，证明当 $\chi > 2$ 时单一相相对于分相失稳。（以 $\chi_\mathrm{c}$ 填临界值。）
::: solution
二阶求导，$\partial^2(\Delta_\text{mix}G_\mathrm{m}/RT)/\partial x^2 = 1/x + 1/(1-x) - 2\chi$。曲率在 $x = 1/2$ 处最小，等于 $4 - 2\chi$；稳定性极限因此是 $4 - 2\chi_\mathrm{c} = 0$，即 $\chi_\mathrm{c} = 2.00$。超过它，混合吉布斯能在 $x = 1/2$ 附近出现负曲率区，混合物分裂为两相，两相组成由公切线作图确定——这正是算例图中双阱曲线背后的几何。物理解读：混合熵每摩尔至多贡献 $4RT$ 的曲率，而接触惩罚 $\chi RT$ 每摩尔一旦使 $\chi > 2$ 就压过它。理想混合的自发性保证，只有两个 $RT$ 的余量，不多。
:::
:::
