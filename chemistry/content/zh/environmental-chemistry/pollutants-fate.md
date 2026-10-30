1960 至 70 年代，科学家开始在从未使用过多氯联苯（PCB）和杀虫剂 DDT 的地方发现它们：北极海豹的脂肪里、偏远海岛上海鸟的卵里、距离任何工业或农田数千千米之外的因纽特妇女的母乳里。这些顶级捕食者体内的浓度比周围海水高数百万倍。一种物质在一个地方以极低的浓度释放，为何会在另一个地方被浓缩？答案在于三种物理化学性质——化合物亲脂疏水的程度、在水与空气之间往返的难易、降解的快慢——以及这些性质驱使其在环境中穿行的方式。本课建立预测这段旅程的定量工具：分配系数、吸附、唐纳德·麦凯（Donald Mackay）的逸度概念，以及降解与生物累积的动力学。课程最后转向非常不同的持久性无机污染物——重金属，它们的归趋由形态（[[environmental-chemistry/natural-waters]]）而非分配支配。

## 持久性有机污染物

::: definition 持久性有机污染物 {#def-pop}
**持久性有机污染物**（POP）是这样的有机物质：(1) 抵抗环境降解（**持久性**，在水、土壤或沉积物中的半衰期为数月到数年）；(2) 在生物的脂肪组织中累积（**生物累积**）；(3) 经空气或水发生**长距离环境输送**，到达远离源区的地区；(4) 对人类健康或环境有不利影响（**毒性**）。这四条标准出自《关于持久性有机污染物的斯德哥尔摩公约》附件 D（2001 年通过，2004 年生效）；筛查值例如水中半衰期超过两个月、或生物浓缩因子超过 $5000$（或 $\log K_\mathrm{ow} > 5$）。这些标准是监管筛查规则，不是尖锐的化学界限。
:::

公约最初列出十二种物质或物质族——八种有机氯杀虫剂（艾氏剂、氯丹、狄氏剂、异狄氏剂、七氯、十氯酮、毒杀芬与 DDT）、工业化学品 PCB 与六氯苯，以及非故意产生的副产物多氯代二苯并-*对*-二噁英和二苯并呋喃。清单此后不断扩充，新增者包括全氟辛烷磺酸（PFOS，2009）、六溴环十二烷（2013）、全氟辛酸（PFOA，2019）与全氟己烷磺酸（PFHxS，2022）。每一项列名都会限制或消除相关生产与使用，具体豁免由缔约方商定；例如 DDT 仍获准用于控制病媒。

持久性背后的化学主要是键强与反应位点的缺失。多氯芳香族化合物有很强的 $\mathrm{C(sp^2){-}Cl}$ 键、没有易被夺取的氢、缺电子的环既抗 OH 氧化又抗微生物加氧酶的进攻；全氟化合物则由 $\mathrm{C{-}F}$ 键（约 $485\ \mathrm{kJ\,mol^{-1}}$，与碳之间的最强单键）和屏蔽碳链免受进攻的氟鞘保护。它们的危害按机理描述：许多有机氯化合物亲脂并作用于神经系统（DDT 使神经膜上的钠通道保持开放）；二噁英和类二噁英 PCB 结合芳香烃受体——一种转录因子——扰乱基因表达，造成发育、免疫与致癌效应；若干 POP 是干扰激素信号的内分泌干扰物。类二噁英化合物的毒性强度以 WHO 毒性当量因子表示，以 2,3,7,8-四氯二苯并-*对*-二噁英为基准。

## 分配系数

释放进环境的分子按平衡分配系数分布于空气、水、有机质与生物体之间，再被转移和降解的速率修正。

::: definition 分配系数 K_ow、K_aw 与 K_oa {#def-partition}
对于稀浓度下的中性有机化合物，
- **辛醇-水分配系数** $K_\mathrm{ow} = C_\text{octanol}/C_\text{water}$（平衡态，两者均以 $\mathrm{mol\,m^{-3}}$ 计）是进入脂质与天然有机质之分配的替代指标，通常以 $\log K_\mathrm{ow}$ 报出；
- **空气-水分配系数**（无量纲亨利定律常数）$K_\mathrm{aw} = C_\text{air}/C_\text{water} = H/RT$，其中 $H = p/C_\text{water}$（$\mathrm{Pa\,m^3\,mol^{-1}}$）是环境化学常用形式的亨利定律常数；
- **辛醇-空气分配系数** $K_\mathrm{oa} = K_\mathrm{ow}/K_\mathrm{aw}$ 描述从空气进入植物蜡、土壤有机质和气溶胶的吸收。

三者通过化学势热力学关联，任两者确定第三者。它们依赖温度（每一对相各有相转移焓，故范特霍夫（van 't Hoff）图为直线）；对可解离化合物还依赖 pH：只有中性形态分配进辛醇。
:::

$25\ \mathrm{°C}$ 下的典型值（取自麦凯等《有机化学品物理化学性质与环境归趋手册》（*Handbook of Physical-Chemical Properties and Environmental Fate for Organic Chemicals*）的汇编）：苯 $\log K_\mathrm{ow} = 2.13$，$H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$（$K_\mathrm{aw} = 0.22$）；萘 $\log K_\mathrm{ow} = 3.37$，$H = 43\ \mathrm{Pa\,m^3\,mol^{-1}}$（$K_\mathrm{aw} = 0.017$）；高氯 PCB 与 DDT $\log K_\mathrm{ow} \approx 6$–$7$。据此可得一张粗略的地图：$K_\mathrm{aw}$ 高的化合物主要在空气；$K_\mathrm{ow}$ 高的在土壤、沉积物和脂肪；$K_\mathrm{oa}$ 高的在植被和冷区沉积。$K_\mathrm{ow}$ 背后的物理是疏水效应：非极性分子从水转入辛醇时释放其空腔周围的有序水，这一收益随分子表面积增长。这就是联苯上每个额外的氯使 $\log K_\mathrm{ow}$ 约增 $0.5$、以及同一同系物中 $K_\mathrm{ow}$ 与分子尺寸相关如此之好的原因。

::: example 顶空瓶中的分配 {#ex-headspace}
顶空分析中，把 $10.0\ \mathrm{cm^3}$ 水样密封在 $20.0\ \mathrm{cm^3}$ 样品瓶中，于 $25\ \mathrm{°C}$ 达到平衡。原来在水中的苯（$K_\mathrm{aw} = 0.225$）和萘（$K_\mathrm{aw} = 0.0174$）分别有多大比例进入 $10.0\ \mathrm{cm^3}$ 顶空？
::: solution
质量衡算：$n_\text{tot} = C_\mathrm{w}V_\mathrm{w} + C_\mathrm{a}V_\mathrm{a} = C_\mathrm{w}(V_\mathrm{w} + K_\mathrm{aw}V_\mathrm{a})$，故顶空份额为
$$
\phi_\mathrm{a} = \frac{K_\mathrm{aw}V_\mathrm{a}}{V_\mathrm{w} + K_\mathrm{aw}V_\mathrm{a}} .
$$
苯：$0.225\times10.0/(10.0 + 2.25) = 0.184$，即 $18\ \%$。萘：$0.174/(10.0 + 0.174) = 0.017$，即 $1.7\ \%$。因此顶空采样对苯、甲苯和氯代溶剂等挥发性化合物效果好，对半挥发物差；加热样品瓶（提高 $K_\mathrm{aw}$）或加盐（盐析）可改善回收率。这与下文[[#prop-koc]]的溶解分数用的是同一套代数，只是以空气取代了沉积物——这也是下文一般化逸度记账的第一个预告。
:::
:::

## 在土壤与沉积物上的吸附

水中的疏水性有机化合物与其说是被矿物表面吸引，不如说是被包裹其外的天然有机质吸引，并像进入辛醇那样分配进去。

::: proposition 有机碳归一化吸附 {#prop-koc}
对疏水中性化合物，土壤或沉积物的固-水分配系数与其有机碳分数 $f_\mathrm{oc}$ 成正比：
$$
K_\mathrm{d} = \frac{C_\text{solid}}{C_\text{water}} = f_\mathrm{oc}K_\mathrm{oc},
$$
其中 $C_\text{solid}$ 以 $\mathrm{mg\,kg^{-1}}$、$C_\text{water}$ 以 $\mathrm{mg\,dm^{-3}}$ 计，故 $K_\mathrm{d}$ 以 $\mathrm{dm^3\,kg^{-1}}$ 计。有机碳分配系数与 $K_\mathrm{ow}$ 相关；常用的经验关系（卡里克霍夫（Karickhoff）、布朗（Brown）与斯科特（Scott），1979）为 $K_\mathrm{oc} \approx 0.41K_\mathrm{ow}$（$\mathrm{dm^3\,kg^{-1}}$）。在每体积水 $V_\mathrm{w}$ 含固体质量 $m_\mathrm{s}$（固水比 $r_\mathrm{sw} = m_\mathrm{s}/V_\mathrm{w}$）的体系中，化合物处于溶解态的分数为
$$
f_\mathrm{w} = \frac{1}{1 + K_\mathrm{d}\,r_\mathrm{sw}} .
$$
条件：线性等温线（低浓度）、平衡、$f_\mathrm{oc} \gtrsim 0.001$（低于此矿物表面有贡献）、中性化合物。黑碳（烟炱、炭）对平面芳烃的吸附可远强于预测值。
:::

::: proof 固-液两相的质量衡算 {#proof-koc}
若有机质表现为整体分配相，则每千克固体含 $f_\mathrm{oc}$ 千克有机碳，其持量为每千克 $K_\mathrm{oc}C_\text{water}$；故 $C_\text{solid} = f_\mathrm{oc}K_\mathrm{oc}C_\text{water}$。体系总量为 $V_\mathrm{w}C_\text{water} + m_\mathrm{s}C_\text{solid} = V_\mathrm{w}C_\text{water}(1 + K_\mathrm{d}r_\mathrm{sw})$，溶解分数即 $V_\mathrm{w}C_\text{water}$ 除以该值。$K_\mathrm{oc}$ 与 $K_\mathrm{ow}$ 成正比是一个经验事实：天然有机质与辛醇对非极性溶质有相似的溶剂性质（线性自由能关系）；因子 $0.41$ 反映土壤有机质是比辛醇略差的溶剂。
:::

::: widget plot
f: 100/(1 + 0.41*10^x*foc*r); 100/(1 + 0.41*10^x*foc*0.0001)
x: 0, 8
y: 0, 105
sliders: foc=0.02:0.001:0.1:0.001; r=0.5:0.01:2:0.01
labels: \%\ \text{溶解态（沉积物浆液，比 } r\text{）}; \%\ \text{溶解态（河流，固体 } 0.1\ \mathrm{g\,dm^{-3}}\text{）}
caption: 疏水化合物处于溶解态的百分比对 $\log K_\mathrm{ow}$ 的曲线，由[[#prop-koc]]取 $K_\mathrm{oc} = 0.41K_\mathrm{ow}$ 作出。滑块：有机碳分数 $f_\mathrm{oc}$ 与固水比 $r$（单位 $\mathrm{kg\,dm^{-3}}$；沉积物孔隙水为 $0.5$–$2$）。悬浮固体仅 $0.1\ \mathrm{g\,dm^{-3}}$ 的浑浊河流里，即使 $\log K_\mathrm{ow} = 6$ 的化合物也约有一半溶解；而在沉积物中，$\log K_\mathrm{ow} \approx 4$ 以上几乎全部被吸附。这就是沉积物成为 PCB 和二噁英长期汇与库的原因。
:::

吸附还会使含水层中污染物的运移慢于水。

::: proposition 地下水中的阻滞 {#prop-retardation}
对经历线性、快速、可逆吸附的溶质，在容重 $\rho_\mathrm{b}$（$\mathrm{kg\,dm^{-3}}$）、孔隙度 $n$ 的多孔介质中，溶质锋面的移动速度为地下水流速除以**阻滞因子**
$$
R_\mathrm{f} = 1 + \frac{\rho_\mathrm{b}K_\mathrm{d}}{n} .
$$
:::

::: proof 移动柱中的质量衡算 {#proof-retardation}
每单位容重体积中，溶解浓度 $C$ 对应孔隙水中 $nC$、固体上 $\rho_\mathrm{b}K_\mathrm{d}C$；运动的只有孔隙水，其孔隙速度为 $v$。含吸附的对流给出
$$
\frac{\partial}{\partial t}\left[(n + \rho_\mathrm{b}K_\mathrm{d})C\right] = -nv\frac{\partial C}{\partial x},
\quad\text{即}\quad
\frac{\partial C}{\partial t} = -\frac{v}{R_\mathrm{f}}\frac{\partial C}{\partial x},
$$
即速度为 $v/R_\mathrm{f}$ 的对流方程。每个溶质分子把 $1/R_\mathrm{f}$ 的时间花在溶解与运动上，其余时间被吸附而静止。
:::

::: example 萘羽流 {#ex-retardation}
萘（$\log K_\mathrm{ow} = 3.37$）漏入 $f_\mathrm{oc} = 0.0010$、$\rho_\mathrm{b} = 1.70\ \mathrm{kg\,dm^{-3}}$、$n = 0.30$ 的砂质含水层，其中地下水以 $0.50\ \mathrm{m\,d^{-1}}$ 流动。萘锋面移动多快？同时漏入的保守示踪剂（氯离子）已到达 $100\ \mathrm{m}$ 外的水井；萘走到了哪里？
::: solution
$K_\mathrm{oc} = 0.41\times10^{3.37} = 0.41\times2344 = 961\ \mathrm{dm^3\,kg^{-1}}$，故 $K_\mathrm{d} = 0.0010\times961 = 0.96\ \mathrm{dm^3\,kg^{-1}}$。于是
$$
R_\mathrm{f} = 1 + \frac{1.70\times0.96}{0.30} = 1 + 5.4 = 6.4 .
$$
萘锋面以 $0.50/6.4 = 0.078\ \mathrm{m\,d^{-1}}$ 移动；氯离子走完 $100\ \mathrm{m}$ 时，萘约走 $100/6.4 = 16\ \mathrm{m}$。阻滞为生物降解争取了时间（萘在有氧条件下降解很快），也解释了为什么吸附性污染物形成的羽流常比其源强所暗示的更短。若含水层的有机碳高十倍，$R_\mathrm{f}$ 将为 $55$；而苯（$\log K_\mathrm{ow} = 2.13$）在原含水层中只有 $1.3$，所以油品泄漏中的苯、甲苯和二甲苯总是最先到达水井。
:::
:::

## 逸度与多介质模型

当一种物质分布于多相时，比较浓度是件麻烦事——某化合物在土壤中的浓度可能比水中高千倍，却仍处于平衡。麦凯为环境化学引入了一个在平衡时各相相等的变量：逸度。

::: definition 逸度与逸度容量 {#def-fugacity}
物质的**逸度** $f$（Pa）是它的“逃逸倾向”，是与化学势相关的热力学量，$\mu = \mu^\circ + RT\ln(f/f^\circ)$；对理想气体它等于分压。平衡时各相逸度相同。低浓度下逸度与浓度成正比，$C_i = Z_if$，其中 $Z_i$（$\mathrm{mol\,m^{-3}\,Pa^{-1}}$）是相 $i$ 的**逸度容量**：
$$
Z_\text{air} = \frac{1}{RT},\qquad
Z_\text{water} = \frac{1}{H},\qquad
Z_\text{octanol} = K_\mathrm{ow}Z_\text{water},\qquad
Z_\text{solid} = K_\mathrm{d}\,\rho_\mathrm{s}\,Z_\text{water},
$$
其中 $K_\mathrm{d}$ 以 $\mathrm{m^3\,kg^{-1}}$ 计，$\rho_\mathrm{s}$ 为固体密度（$\mathrm{kg\,m^{-3}}$）。分配系数是 $Z$ 值之比：$K_\mathrm{aw} = Z_\text{air}/Z_\text{water} = H/RT$。
:::

::: proposition Level I 模型中的平衡分配 {#prop-level1}
若不可降解物质的一定量 $M$（mol）在体积 $V_i$、逸度容量 $Z_i$ 的各隔室之间平衡分配（**Level I** 逸度模型），则公共逸度与每个隔室中的量为
$$
f = \frac{M}{\sum_i Z_iV_i}, \qquad n_i = Z_iV_if, \qquad \frac{n_i}{M} = \frac{Z_iV_i}{\sum_j Z_jV_j} .
$$
**容量** $Z_iV_i$ 最大的隔室持有大部分物质。条件：各隔室之间平衡、线性分配、无降解与对流。Level II 加入稳态排放与降解（逸度仍为公共）；Level III 允许各隔室各有逸度，彼此以转移速率联系。
:::

::: proof 公共逸度下的质量衡算 {#proof-level1}
总量 $M = \sum_iC_iV_i = \sum_iZ_ifV_i$；由于平衡时 $f$ 对各隔室公共，$M = f\sum_iZ_iV_i$，由此解出 $f$；于是 $n_i = C_iV_i = Z_iV_if$。各份额由除法即得。这套形式无非是两相结果 $f_\mathrm{w} = 1/(1 + K_\mathrm{d}r_\mathrm{sw})$ 的多相版本，而逸度让记账一目了然：每个相用一个数 $Z_i$ 刻画，每个分配系数都是其中两个 $Z$ 值之比。
:::

::: example 它会到哪里去？Level I 计算 {#ex-level1}
使用麦凯的“单位世界”：空气 $1\times10^{14}\ \mathrm{m^3}$，水 $2\times10^{11}\ \mathrm{m^3}$，土壤 $9\times10^{9}\ \mathrm{m^3}$（固体，密度 $2400\ \mathrm{kg\,m^{-3}}$，$f_\mathrm{oc} = 0.02$）与沉积物 $1\times10^{8}\ \mathrm{m^3}$（$2400\ \mathrm{kg\,m^{-3}}$，$f_\mathrm{oc} = 0.04$），$298\ \mathrm{K}$，$K_\mathrm{oc} = 0.41K_\mathrm{ow}$。求 (a) 苯（$\log K_\mathrm{ow} = 2.13$，$H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$）和 (b) 类 PCB 化合物（$\log K_\mathrm{ow} = 6.5$，$H = 20\ \mathrm{Pa\,m^3\,mol^{-1}}$）的百分比分布。
::: solution
$Z_\text{air} = 1/(8.314\times298) = 4.04\times10^{-4}\ \mathrm{mol\,m^{-3}\,Pa^{-1}}$，两者相同。

(a) 苯：$Z_\text{water} = 1/557 = 1.80\times10^{-3}$；$K_\mathrm{oc} = 0.41\times10^{2.13} = 55.3\ \mathrm{dm^3\,kg^{-1}}$，故 $K_\mathrm{d}(\text{土壤}) = 0.02\times55.3/1000 = 1.11\times10^{-3}\ \mathrm{m^3\,kg^{-1}}$，$Z_\text{soil} = 1.11\times10^{-3}\times2400\times1.80\times10^{-3} = 4.77\times10^{-3}$；$Z_\text{sed} = 9.53\times10^{-3}$。容量 $Z_iV_i$：空气 $4.04\times10^{10}$、水 $3.59\times10^{8}$、土壤 $4.29\times10^{7}$、沉积物 $9.5\times10^{5}$。份额：**空气 $99.0\ \%$**、水 $0.88\ \%$、土壤 $0.11\ \%$、沉积物 $0.002\ \%$。

(b) 类 PCB：$Z_\text{water} = 1/20 = 0.050$；$K_\mathrm{oc} = 0.41\times10^{6.5} = 1.30\times10^{6}\ \mathrm{dm^3\,kg^{-1}}$，故 $Z_\text{soil} = 0.02\times1296\times2400\times0.050 = 3.11\times10^{3}$，$Z_\text{sed} = 6.22\times10^{3}$。容量：空气 $4.04\times10^{10}$、水 $1.0\times10^{10}$、土壤 $2.80\times10^{13}$、沉积物 $6.2\times10^{11}$。份额：空气 $0.14\ \%$、水 $0.035\ \%$、**土壤 $97.7\ \%$**、沉积物 $2.2\ \%$。

挥发性、水溶性的苯无论排向哪个隔室都是空气污染物；PCB 则最终进入土壤和沉积物。但注意其中的微妙之处：空气份额只有 $0.14\ \%$ 的 PCB 仍然可以*通过*空气移动——空气隔室正是长距离输送发生的地方，正是这按每周数千千米移动的微小空气份额把此类化合物送进北极。
:::
:::

### 长距离输送与冷浓缩

$\log K_\mathrm{oa}$ 约在 $6$–$10$ 的半挥发化合物可以在暖区挥发、在空气中输送、并在较低温度处冷凝——那里 $K_\mathrm{oa}$ 更大（这类化合物每降温 $10$–$15\ \mathrm{K}$，$K_\mathrm{oa}$ 约升十倍）。沉降与再排放的反复循环——“蚱蜢效应”——加上纬度温度梯度产生**全球分馏**：挥发性较强的 POP 优先在极地积累，挥发性最差的则留在源区附近。冷区食物网富含脂质，再把它们进一步浓缩。这一机制由弗兰克·瓦尼亚（Frank Wania）与唐纳德·麦凯（Donald Mackay）（1993）提出，解释了本章开篇的北极观测事实。

## 降解与持久性

化合物的持久性是其各隔室中所有降解过程共同作用的结果：水解（酯、氨基甲酸酯、部分有机磷化合物、烷基卤）、直接和间接光解（阳光，以及地表水中光化学产生的 OH 和单线态氧）、空气中与 OH 的反应（[[environmental-chemistry/tropospheric-chemistry#def-oh-lifetime]]），以及在土壤和水体中通常最重要的微生物生物降解。若若干一级过程并联作用，其速率常数相加，
$$
k_\text{tot} = \sum_i k_i, \qquad \frac{1}{t_{1/2,\text{tot}}} = \sum_i\frac{1}{t_{1/2,i}},
$$ {#eq-parallel}
故最快的过程占主导。环境中的半衰期是有条件的：生物降解依赖温度、氧气、营养物和适应性微生物的存在；许多疏水化合物降解得慢，只是因为它们被吸附而对生物不可得。多介质模型中的**总持久性**是稳态时系统中的物质量与排放速率之比，即其停留时间（[[environmental-chemistry/earth-system-chemistry#prop-residence]]），并取决于物质所在的隔室——在空气中短命、在沉积物中长命的化合物，若分配到沉积物就是持久性的。

## 生物浓缩与生物放大

::: definition 生物浓缩、生物累积与生物放大 {#def-bcf}
**生物浓缩因子** $\mathrm{BCF} = C_\text{organism}/C_\text{water}$（以 $\mathrm{dm^3\,kg^{-1}}$ 湿重计）在稳态下描述仅经鳃或皮肤从水中的吸收。**生物累积因子**（BAF）包括经食物的吸收。**生物放大**是脂质归一化浓度从猎物到捕食者的增高；**营养放大因子**是食物网中每营养级的平均倍率。若经水的吸收是进入脂质的被动分配，而脂质表现得像辛醇，则平衡时
$$
\mathrm{BCF} \approx L\,K_\mathrm{ow},
$$
其中 $L$ 是生物体的脂质分数。麦凯对鱼的经验拟合（1982）$\mathrm{BCF} = 0.048K_\mathrm{ow}$，对应 $L \approx 5\ \%$。该关系在 $\log K_\mathrm{ow} \approx 6$–$7$ 以上失效（吸收太慢，达不到平衡；极疏水化合物的生物有效性低），对生物体会代谢的化合物也失效。
:::

::: example 鱼体中的 PCB 浓度 {#ex-bcf}
某湖含 $\log K_\mathrm{ow} = 6.5$ 的某 PCB 同类物 $1.0\ \mathrm{ng\,dm^{-3}}$。估算与水达到平衡的、脂质含量 $5\ \%$ 的鱼体内的浓度，并评论为什么实测值可能更高。
::: solution
$\mathrm{BCF} = 0.05\times10^{6.5} = 0.05\times3.16\times10^{6} = 1.6\times10^{5}\ \mathrm{dm^3\,kg^{-1}}$。于是 $C_\text{fish} = 1.6\times10^{5}\ \mathrm{dm^3\,kg^{-1}}\times1.0\ \mathrm{ng\,dm^{-3}} = 1.6\times10^{5}\ \mathrm{ng\,kg^{-1}} = 160\ \mathrm{\mu g\,kg^{-1}}$ 湿重。肉食鱼的实测浓度常常更高，因为它们吃受污染的猎物：消化从食物中除去脂质的速度快于 PCB，使肠道中 PCB 的逸度高于食物中的，于是化合物被“泵”上食物链。对难以代谢的化合物，脂质归一化浓度每营养级上升 $2$–$10$ 倍，这就是生物放大。对呼吸空气的动物（海鸟、海豹、人），高 $K_\mathrm{oa}$ 的化合物经呼出空气的排出可以忽略，放大可以更强——这也是 $K_\mathrm{oa}$ 如今也进入生物累积筛查原因之一。
:::
:::

::: widget plot
f: log(0.048*10^x)/log(10); log(0.048*10^x/(1 + 10^(x - c)))/log(10)
x: 1, 9
y: 0, 7
sliders: c=6.5:5:8:0.1
labels: \log\mathrm{BCF} = \log K_\mathrm{ow} - 1.32; \text{在 }K_\mathrm{ow}\text{ 高处截断}
caption: 鱼体生物浓缩因子对 $\log K_\mathrm{ow}$ 的曲线：麦凯的平衡分配直线 $\mathrm{BCF} = 0.048K_\mathrm{ow}$，以及一条示意性的截断曲线，在截断点 $\log K_\mathrm{ow} = c$（滑块）以上发生弯折——对吸收太慢或过多结合在溶解有机质上而达不到平衡的极疏水化合物，观测到的正是这种情形。监管阈值 $\mathrm{BCF} = 5000$（$\log\mathrm{BCF} = 3.7$）对应直线上的 $\log K_\mathrm{ow} \approx 5$。
:::

::: warning log K_ow 高并不意味着水中浓度高 {#warn-kow}
学生有时把高 $K_\mathrm{ow}$ 读作“这种化合物在水中无处不在”。恰恰相反：极疏水化合物的水溶解度极小且大多被吸附，所以溶解浓度很低——常以每升纳克乃至更低计。它们的危险在于*最终去处*：脂肪、沉积物、顶级捕食者。反过来，可迁移、极性、持久的化合物（低 $K_\mathrm{ow}$、降解慢——某些 PFAS、许多药物与农药代谢物）穿过土壤和污水处理厂进入饮用水，尽管它们几乎不生物累积。“持久与可迁移”在欧盟化学品政策中已被视为独立的危害类别（2023 年 CLP 法规修订加入了 PMT/vPvM 类别）。永远要问：某个性质把物质送进哪个隔室。
:::

## 全氟烷基物质

**全氟与多氟烷基物质**（PFAS）——数千种含全氟化碳链的化合物，因耐水、耐油、耐热而用于涂层、纺织品、食品包装和灭火泡沫——以富有教益的方式打破了 POP 模板。全氟烷基酸（PFOA、PFOS 及其同系物）是表面活性剂：阴离子头基使其溶于水，全氟化尾链使其分配到界面和蛋白质（血清白蛋白、肝脂肪酸结合蛋白）而非脂质，所以 $K_\mathrm{ow}$ 对其行为不是有意义的预测量。它们在环境中几乎不可降解；许多前体化合物会转化为它们。其危害——欧洲食品安全局、美国 EPA 等机构的评估已认定——包括对免疫系统（疫苗应答降低）、脂质代谢、肝脏和发育的影响；PFOA 被国际癌症研究机构（IARC）列为对人类致癌（1 类，2023）。

截至 2026 年的监管，中性描述：欧盟重订的《饮用水指令》（EU）2020/2184 对列出的 20 种 PFAS 总和设定指标值 $0.1\ \mathrm{\mu g\,dm^{-3}}$、对“PFAS 总量”设定 $0.5\ \mathrm{\mu g\,dm^{-3}}$，自 2026 年 1 月 12 日起适用；美国方面，EPA 2024 年 4 月的《国家饮用水主标准法规》为 PFOA 与 PFOS 各设定最大污染物水平 $4.0\ \mathrm{ng\,dm^{-3}}$（并为若干其他 PFAS 设定了限值），该局 2025 年宣布拟保留 PFOA 与 PFOS 限值、延长合规期限并重新审议其余各项——读者应核实现行状态。欧盟 REACH 法规下对 PFAS 的广泛限制提案，截至 2025–26 年正由欧洲化学品管理局评估。

## 重金属

金属不能被降解，只能改变其形态和所在隔室。它们的环境化学就是 [[environmental-chemistry/natural-waters]] 的化学——配位、氧化还原、吸附、沉淀——其毒性则主要是与生物配体结合的问题。危害按机理：

- **汞。** 以单质 $\mathrm{Hg^0}$ 排放（来自燃煤以及手工和小规模采金，据 UNEP《全球汞评估 2018》（*Global Mercury Assessment 2018*），这是最大的人为两源），在大气中的寿命为数月至一年，因而是全球性污染物。被氧化为 $\mathrm{Hg^{2+}}$ 并沉降后，它在缺氧沉积物中被硫酸盐还原菌和铁还原菌甲基化为**甲基汞** $\mathrm{CH_3Hg^+}$：后者强烈结合蛋白质的巯基，穿过血脑屏障和胎盘屏障，并在水生食物网中生物放大。其神经毒性在 1950 年代日本水俣湾居民因工业排放而中毒的事件中暴露无遗。《关于汞的水俣公约》（2013 年通过，2017 年生效）管控汞的开采、产品、排放与贸易。
- **铅。** 它抑制血红素合成的酶（δ-氨基乙酰丙酸脱水酶），并干扰发育中神经系统的钙依赖信号传导；其儿童神经发育效应尚未识别出阈值（WHO）。含铅汽油的淘汰——据 UNEP，已于 2021 年在全球完成——移除了最主要的大气源；铅管、旧漆和某些工业场地仍然存在。
- **镉**在肾脏中与金属硫蛋白结合而积累，并与锌、钙竞争；**砷**以亚砷酸盐形态结合巯基，以砷酸盐形态模拟磷酸根。地下水中的天然砷——由铁氧化物的还原性溶解所释放（[[environmental-chemistry/natural-waters#ex-electron-budget]]）——影响数以千万计人口的饮用水，尤以恒河-布拉马普特拉河三角洲为甚；WHO 指导值为 $10\ \mathrm{\mu g\,dm^{-3}}$。

::: quiz
哪一对性质最能预测排入河流的中性有机化学品最终将在沉积物和鱼体内富集？
- [ ] $K_\mathrm{aw}$ 高、半衰期短。
- [x] $K_\mathrm{ow}$ 高（从而 $K_\mathrm{oc}$ 高）、降解慢。
- [ ] 水溶解度高、蒸气压高。
- [ ] $K_\mathrm{ow}$ 低、$K_\mathrm{aw}$ 高。
::: solution
$K_\mathrm{ow}$ 高意味着强烈分配进有机碳（沉积物）和脂质（鱼），降解慢则使其得以累积。$K_\mathrm{aw}$ 高会把化合物送往空气；高溶解度和低 $K_\mathrm{ow}$ 则使它留在水中随水运动。
:::
:::

::: history
蕾切尔·卡森（Rachel Carson）的《寂静的春天》（*Silent Spring*，1962）让持久性农药对野生动物的影响进入公众视野。斯德哥尔摩的瑟伦·延森（Sören Jensen）1966 年认定 PCB 是环境污染物——他在用气相色谱分析 DDT 时，在鱼和一根鹰羽中发现了它们。唐纳德·麦凯自 1979 年起在一系列论文中把逸度模型引入环境化学，后结集为《多介质环境模型：逸度方法》（*Multimedia Environmental Models: The Fugacity Approach*，1991）。塞缪尔·卡里克霍夫（Samuel Karickhoff）与同事于 1979 年确立了吸附的有机碳基础。弗兰克·瓦尼亚与麦凯于 1993 年提出全球分馏与冷浓缩；2001 年《斯德哥尔摩公约》随之签订。
:::

## 后续内容

土壤上的吸附、受污染水体的处理，以及被有机化合物和金属污染土地的修复，是 [[environmental-chemistry/soils-remediation]] 的主题。测定每升纳克级的 POP 和 PFAS，需要 [[environmental-chemistry/environmental-monitoring]] 与 [[analytical-chemistry/hyphenated-methods]] 中的萃取、净化与质谱方法。设计使用后能够降解的化学品——“因设计而无害”——是 [[green-chemistry/green-principles]] 的原则之一。

::: summary
- POP 具有持久性、生物累积性、可长距离输送并有毒（《斯德哥尔摩公约》，2001；列名已扩展至 PFOS、PFOA、PFHxS 等）。
- $K_\mathrm{ow}$、$K_\mathrm{aw} = H/RT$ 与 $K_\mathrm{oa} = K_\mathrm{ow}/K_\mathrm{aw}$ 概括了中性有机化合物的去处：空气、水、有机质、脂质。
- 对土壤和沉积物的吸附随有机碳标度，$K_\mathrm{d} = f_\mathrm{oc}K_\mathrm{oc}$，其中 $K_\mathrm{oc} \approx 0.41K_\mathrm{ow}$；溶解分数为 $1/(1 + K_\mathrm{d}r_\mathrm{sw})$；地下水羽流被 $R_\mathrm{f} = 1 + \rho_\mathrm{b}K_\mathrm{d}/n$ 阻滞。
- 平衡时逸度 $f$ 在各相相等，$C_i = Z_if$；Level I 模型中每个隔室持有份额 $Z_iV_i/\sum Z_jV_j$。
- 并联的一级降解速率相加；总持久性是稳态停留时间，取决于物质占有的隔室。
- 鱼体生物浓缩在 $\log K_\mathrm{ow} \approx 6$ 以下遵循 $\mathrm{BCF} \approx LK_\mathrm{ow}$（约 $0.05K_\mathrm{ow}$）；食物网传递使难代谢的化合物生物放大；半挥发 POP 向极地分馏。
- PFAS 和金属不符合亲脂模板：PFAS 结合蛋白质并在水中可迁移；金属改变形态（如汞的甲基化）却从不降解。
:::

## 练习

::: exercise 苯的无量纲亨利常数 {level=1 check="0.225"}
把苯的 $H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$ 换算为 $298\ \mathrm{K}$ 下的 $K_\mathrm{aw}$。（以三位有效数字填入 $K_\mathrm{aw}$。）
::: solution
$K_\mathrm{aw} = H/RT = 557/(8.314\times298) = 557/2478 = 0.225$。平衡时每单位体积空气中浓度约为水中的四分之一——但大气的体积大得多，所以大多数苯在空气中。
:::
:::

::: exercise 由 K_ow 估算 K_oc {level=1 check="4100"}
用卡里克霍夫关系估算 $\log K_\mathrm{ow} = 4.00$ 的化合物的 $K_\mathrm{oc}$。（$K_\mathrm{oc}$ 以 $\mathrm{dm^3\,kg^{-1}}$ 计，保留两位有效数字。）
::: solution
$K_\mathrm{oc} = 0.41\times10^{4.00} = 4.1\times10^{3}\ \mathrm{dm^3\,kg^{-1}}$。这类关系的离散约 $0.3$–$0.5$ 个对数单位，故结果只应作数量级估计。
:::
:::

::: exercise 瘦鱼与肥鱼的生物浓缩 {level=1 check="5000"}
设脂质含量 $5.0\ \%$ 的鱼对脂质-水做平衡分配且 $K_\text{lipid–water} = K_\mathrm{ow}$，估算 $\log K_\mathrm{ow} = 5.0$ 的化合物的 BCF。（BCF 以 $\mathrm{dm^3\,kg^{-1}}$ 计，保留两位有效数字。）
::: solution
$\mathrm{BCF} = 0.050\times10^{5.0} = 5.0\times10^{3}\ \mathrm{dm^3\,kg^{-1}}$——恰为《斯德哥尔摩公约》的筛查阈值。脂质 $15\ \%$ 的肥鱼 BCF 为三倍，这就是监测计划报脂质归一化浓度的原因。
:::
:::

::: exercise 萘的阻滞 {level=2 check="6.4"}
重演[[#ex-retardation]]的计算：$\log K_\mathrm{ow} = 3.37$，$f_\mathrm{oc} = 0.0010$，$\rho_\mathrm{b} = 1.70\ \mathrm{kg\,dm^{-3}}$，$n = 0.30$。（以两位有效数字填入 $R_\mathrm{f}$。）
::: solution
$K_\mathrm{d} = 0.0010\times0.41\times2344 = 0.961\ \mathrm{dm^3\,kg^{-1}}$；$R_\mathrm{f} = 1 + 1.70\times0.961/0.30 = 6.4$。
:::
:::

::: exercise 沉积物浆液中溶解态的分数 {level=2 check="2.4"}
某沉积物浆液每 $\mathrm{dm^3}$ 水含 $0.50\ \mathrm{kg}$ 固体，$f_\mathrm{oc} = 0.020$。问 $\log K_\mathrm{ow} = 4.0$ 的化合物平衡时有多少百分比处于溶解态？（百分数以两位有效数字填入。）
::: solution
$K_\mathrm{d} = 0.020\times0.41\times10^{4} = 82\ \mathrm{dm^3\,kg^{-1}}$；$f_\mathrm{w} = 1/(1 + 82\times0.50) = 1/42 = 0.024$，即 $2.4\ \%$。
:::
:::

::: exercise 并联降解 {level=2 check="23"}
某农药在湖中水解半衰期 $30\ \mathrm{d}$、光解半衰期 $120\ \mathrm{d}$、生物降解半衰期 $400\ \mathrm{d}$，均为一级。其总半衰期是多少？（以天计，保留两位有效数字。）
::: solution
由[[#eq-parallel]]，$1/t_{1/2} = 1/30 + 1/120 + 1/400 = 0.0333 + 0.00833 + 0.0025 = 0.0442\ \mathrm{d^{-1}}$，故 $t_{1/2} = 22.6 \approx 23\ \mathrm{d}$。最快的水解占主导；把最慢的那个过程加快一倍也几乎不会改变结果。
:::
:::

::: exercise 中等疏水性化学品的 Level I 模型 {level=3 check="67"}
用[[#ex-level1]]的单位世界，求 $\log K_\mathrm{ow} = 4.0$、$H = 100\ \mathrm{Pa\,m^3\,mol^{-1}}$ 的化合物平衡时处于空气的百分比；再求若 $100\ \mathrm{t}$ 该化合物（摩尔质量 $150\ \mathrm{g\,mol^{-1}}$）存在于单位世界中，水中的溶解浓度。（空气中的百分数以两位有效数字填入。）
::: solution
$Z_\text{air} = 4.04\times10^{-4}$，$Z_\text{water} = 0.0100$，$K_\mathrm{oc} = 4100\ \mathrm{dm^3\,kg^{-1}}$，$Z_\text{soil} = 0.02\times4.1\times2400\times0.0100 = 1.97$，$Z_\text{sed} = 3.94\ \mathrm{mol\,m^{-3}\,Pa^{-1}}$。容量：空气 $4.04\times10^{10}$、水 $2.0\times10^{9}$、土壤 $1.77\times10^{10}$、沉积物 $3.9\times10^{8}$；总容量 $6.05\times10^{10}$。空气持有 $4.04/6.05 = 67\ \%$，土壤 $29\ \%$，水 $3.3\ \%$，沉积物 $0.65\ \%$。由 $M = 10^{8}\ \mathrm{g}/150 = 6.67\times10^{5}\ \mathrm{mol}$，$f = 6.67\times10^{5}/6.05\times10^{10} = 1.10\times10^{-5}\ \mathrm{Pa}$，$C_\text{water} = Z_\text{water}f = 1.10\times10^{-7}\ \mathrm{mol\,m^{-3}} = 0.017\ \mathrm{\mu g\,dm^{-3}}$。即使分布由空气主导，土壤仍持有近三分之一——而在排放入土壤、土壤向空气转移缓慢的 Level III 模型中，土壤会持有得多得多。
:::
:::

::: exercise 湖泊的挥发 {level=3 check="20"}
双膜模型中，水相挥发的总传质系数 $K_\mathrm{OL}$ 由水侧系数 $k_\mathrm{w}$ 与气侧系数 $k_\mathrm{a}$ 按串联阻力合成：$1/K_\mathrm{OL} = 1/k_\mathrm{w} + 1/(k_\mathrm{a}K_\mathrm{aw})$。对深度为 $d$ 的充分混合湖泊，溶解浓度的衰减速率常数为 $K_\mathrm{OL}/d$（空气浓度可忽略）。(a) 导出这一衰减律。(b) 对苯（$K_\mathrm{aw} = 0.225$），取 $k_\mathrm{w} = 2.0\times10^{-5}\ \mathrm{m\,s^{-1}}$、$k_\mathrm{a} = 3.0\times10^{-3}\ \mathrm{m\,s^{-1}}$、$d = 2.0\ \mathrm{m}$，求挥发半衰期。(c) 哪一侧阻力控制？对萘（$K_\mathrm{aw} = 0.0174$）结果如何变化？（苯的半衰期以小时计，保留两位有效数字。）
::: hint
通过单位面积表面的通量为 $K_\mathrm{OL}(C_\mathrm{w} - C_\mathrm{a}/K_\mathrm{aw})$。
:::
::: solution
(a) 单位表面积上，湖泊持有 $dC_\mathrm{w}$、每小时段损失 $K_\mathrm{OL}C_\mathrm{w}$（取 $C_\mathrm{a} \approx 0$），故 $d\,\mathrm{d}C_\mathrm{w}/\mathrm{d}t = -K_\mathrm{OL}C_\mathrm{w}$，$C_\mathrm{w} = C_0e^{-K_\mathrm{OL}t/d}$，且 $t_{1/2} = d\ln2/K_\mathrm{OL}$。串联阻力源于：稳态下通过水膜的通量 $k_\mathrm{w}(C_\mathrm{w} - C_\mathrm{w,i})$ 等于通过气膜的通量 $k_\mathrm{a}(C_\mathrm{a,i} - C_\mathrm{a})$，而界面平衡为 $C_\mathrm{a,i} = K_\mathrm{aw}C_\mathrm{w,i}$；消去界面浓度即得公式。(b) $1/K_\mathrm{OL} = 1/2.0\times10^{-5} + 1/(3.0\times10^{-3}\times0.225) = 50\,000 + 1481 = 51\,481\ \mathrm{s\,m^{-1}}$，$K_\mathrm{OL} = 1.94\times10^{-5}\ \mathrm{m\,s^{-1}}$，故 $t_{1/2} = 2.0\times0.693/1.94\times10^{-5} = 7.1\times10^{4}\ \mathrm{s} = 20\ \mathrm{h}$。(c) 对苯，水侧阻力（占总阻力 $97\ \%$）控制，一切 $K_\mathrm{aw} \gtrsim 0.1$ 的化合物皆然。对萘，气侧项为 $1/(3.0\times10^{-3}\times0.0174) = 19\,200\ \mathrm{s\,m^{-1}}$，总阻力 $69\,200$，$K_\mathrm{OL} = 1.45\times10^{-5}\ \mathrm{m\,s^{-1}}$，$t_{1/2} = 27\ \mathrm{h}$：此时气侧贡献超过四分之一的阻力；对 $K_\mathrm{aw} \lesssim 10^{-3}$ 的化合物，气侧占主导。
:::
:::
