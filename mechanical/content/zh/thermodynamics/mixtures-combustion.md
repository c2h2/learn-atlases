这是合二为一的两课，连接它们的事实是两课都在**数原子**。第一课说，理想气体混合物表现得好像每个组分单独占满整个容器，于是混合物的性质就是各组分已有性质按摩尔分数的加权平均。第二课说，原子在反应前后守恒，于是火焰就是**一个带放热的质量衡算**，关于它的一切——温度、露点、污染物、㶲——都由这个衡算和这份热推出。

两者之所以属于热力学课而不属于化学课，是因为工程师在每一根管道里遇到混合物、在每一座炉子里遇到燃烧，而这两种情况下难的都不是物理，而是**记账的纪律**：写明基准、把水放在方程的正确一侧、绝不在同一行里混用质量基准和摩尔基准。

::: warning 七种能熬过电厂调试的混合物与燃烧错误
**在同一方程中混用质量基准与摩尔基准。** 摩尔分数给出气体常数、反应计量和化学平衡；质量分数给出以千克计的热容和燃料的热值。用**摩尔**分数乘以按**质量**计的热容，结果会错上组分摩尔质量与混合物摩尔质量之比——对湿空气中的水蒸气是 $18 / 28.97 = 0.62$——即 **$62\ \%$** 的误差，也正是每个湿空气公式里那个系数 $0.622$ 的由来。**对水用表压而不是分压力。** 相对湿度是 $\phi = p_v / p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)$，其中 $p_{\mathrm{sat}}$ 在**干球**温度下取值；**露点**是按**水蒸气分压力**对应的饱和温度。拿干球的饱和压力去查露点，会把 $30\ {}^{\circ}\mathrm{C}$、$50\ \%$ 湿度的空气报成 $30\ {}^{\circ}\mathrm{C}$ 而不是 $18\ {}^{\circ}\mathrm{C}$。**忘了烟气里的水。** 烧甲烷**每摩尔燃料生成两摩尔水**，水占烟气总体积的 $18\ \%$。用**干**烟气成分做露点计算，会报出 $20\ {}^{\circ}\mathrm{C}$ 而不是 $55\ {}^{\circ}\mathrm{C}$，于是锅炉一年就被腐蚀。**把奥氏分析当成含水的分析。** 奥氏分析仪在样品到达水蒸气之前**先**吸收 $\mathrm{CO_2}$ 和 $\mathrm{O_2}$，所以该分析是**干基**的，$\mathrm{CO_2} + \mathrm{O_2} + \mathrm{CO} + \mathrm{N_2}$ 之和按构造就是 $100\ \%$。按湿基做碳平衡会把过剩空气高估 **$15\ \%$**。**以为绝热火焰温度是燃料的属性。** 它取决于氧化剂、当量比、压力、进口温度和解离程度。甲烷在空气中按化学计量比燃烧得 $2{,}150\ {}^{\circ}\mathrm{C}$；在**氧气**中得 $3{,}000\ {}^{\circ}\mathrm{C}$；在 $\phi = 1.2$ 时得 $2{,}200\ {}^{\circ}\mathrm{C}$；在预热到 $600\ {}^{\circ}\mathrm{C}$ 的空气中得 $2{,}500\ {}^{\circ}\mathrm{C}$；而在 $20\ \mathrm{bar}$ 下反而**更低**，因为 $\mathrm{CO_2}$ 和 $\mathrm{H_2O}$ 的解离随压力升高而加剧。**配平时把氩混进氮气。** 标准燃烧分析把空气当作 $21\ \%\ \mathrm{O_2}$ 和 $79\ \%\ \mathrm{N_2}$，即每摩尔氧对应 $3.76\ \mathrm{mol\ N_2}$，并使用 $M_{\mathrm{air}} = 28.97$、$R_{\mathrm{air}} = 0.287$。在化学计量里用 $3.76$、气体常数却用 $28.85$，就自相矛盾了 **$0.4\ \%$**——这很小；但在一处用**真实**成分 $79\ \%\ \mathrm{N_2}$、$0.93\ \%\ \mathrm{Ar}$、在另一处又用 $3.76$ 约定，就犯下了一个怎么校核都查不出来的错误。**把高位发热量当成可用能量。** HHV 把产物中水的潜热记了账，而这份潜热只有把烟气冷凝到露点**以下**才收得回来——而水的潜热占甲烷 HHV 的 **$10.9\ \%$**。按 HHV 基准 $106\ \%$ 的冷凝式锅炉"效率"，按 LHV 基准就是 $95\ \%$，而且是个**正确**的数字；一份不写明基准的规格书就算不上一份规格书。
:::

## 气体混合物

::: definition 成分与两条定律 {#def-mixtures}
**道尔顿分压定律**和**阿马加分体积定律**，对理想气体两者都是精确的：
$$
P = \sum_i p_i \ \ \left( T, V \ \text{固定} \right), \qquad
V = \sum_i V_i \ \ \left( T, P \ \text{固定} \right), \qquad
y_i = \frac{p_i}{P} = \frac{V_i}{V} = \frac{n_i}{n}
$$
**两种成分基准。**
$$
y_i = \frac{n_i}{n} = \frac{m_i / M_i}{\sum_j m_j / M_j}, \qquad
w_i = \frac{m_i}{m} = \frac{y_i M_i}{\sum_j y_j M_j}
$$
**混合物的摩尔质量与气体常数。**
$$
M_m = \sum_i y_i M_i, \qquad R_m = \frac{R_u}{M_m} = \sum_i y_i R_i, \qquad R_u = 8.31446\ \mathrm{kJ / kmol \cdot K}
$$
**人人都用、却没人校核的数字。** 干空气取 $21\ \%\ \mathrm{O_2}$、$79\ \%\ \mathrm{N_2}$：
$$
M_{\mathrm{air}} = 0.21 \times 31.999 + 0.79 \times 28.013 = 28.85\ \mathrm{kg / kmol}, \qquad R = 0.2882
$$
而**真实**成分计入氩后给出 $M = 28.97$、$R = 0.2870$。**这 $0.4\ \%$ 的差别就是氩**，通行的约定是空气用 $28.97$ 和 $0.287$、化学计量里用 $3.76$，两者相互一致到 $0.4\ \%$。
**表观与分比性质。** 对温度为 $T$ 的理想气体混合物：
$$
u_m = \sum_i y_i u_i \left( T \right), \quad h_m = \sum_i y_i h_i \left( T \right), \quad
c_{v,m} = \sum_i y_i c_{v,i} \left( T \right)
$$
**每个组分都好像自己单独占着体积、处于温度 $T$**——理想气体的热力学能和焓不依赖压力，所以分值和表观值重合。**熵却不重合**，这就是混合熵的全部：
$$
\bar{s}_i \left( T, p_i \right) = \bar{s}_i^{\circ} \left( T, P \right) - R_u \ln y_i
$$
**求值。** 把 $1\ \mathrm{kmol}$、$100\ \mathrm{kPa}$ 的氮气并入一个其分压为 $79\ \mathrm{kPa}$ 的混合物，代价是
$$
\Delta \bar{s} = - 8.314 \ln 0.79 = + 1.96\ \mathrm{kJ / kmol \cdot K}
$$
**让混合物成为热力学问题而不只是记账问题的数字**：电厂里的每一个混合过程——空气混入燃料、燃料混入空气、排气混入大气——都带着这个量级的熵产，而**燃烧的不可逆性一半是混合、一半是反应**。
:::

::: definition 湿空气：空气与水蒸气 {#def-psych}
**含湿量。**
$$
\omega = \frac{m_v}{m_a} = 0.622\, \frac{p_v}{P - p_v}, \qquad 0.622 = \frac{R_a}{R_v} = \frac{0.2870}{0.4615}
$$
**相对湿度与露点。**
$$
\phi = \frac{p_v}{p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)}, \qquad
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( p_v \right)
$$
**每千克干空气的比焓。**
$$
h = 1.005\, T_{\mathrm{db}} + \omega \left( 2{,}501 + 1.86\, T_{\mathrm{db}} \right) \quad \left[ \mathrm{kJ / kg\ da} \right]
$$
**让湿球温度计能用的数字。** 热力学湿球（绝热饱和）温度满足
$$
\omega_{\mathrm{sat}} \left( T_{\mathrm{wb}} \right) - \omega
= \frac{ \left( 1.005 + 1.86\, \omega \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right) }{ 2{,}501 + 1.86\, T_{\mathrm{wb}} - 4.19\, T_{\mathrm{wb}} }
$$
需迭代求解或从焓湿图上查读；对**常温湿空气，湿球差约为干球低于饱和之差的 $0.25$ 到 $0.30$ 倍**——这条经验准则在 $- 10$ 到 $40\ {}^{\circ}\mathrm{C}$ 之间准确到 $0.5\ \mathrm{K}$。
**算一个状态：干球 $30\ {}^{\circ}\mathrm{C}$，相对湿度 $50\ \%$，$101.325\ \mathrm{kPa}$。**
$$
p_{\mathrm{sat}} \left( 30 \right) = 4.247\ \mathrm{kPa}, \qquad p_v = 0.50 \times 4.247 = 2.124\ \mathrm{kPa}
$$
$$
\omega = 0.622 \times \frac{2.124}{101.325 - 2.124} = 0.01336\ \mathrm{kg / kg\ da}
$$
$$
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( 2.124 \right) = 18.3\ {}^{\circ}\mathrm{C}, \qquad
h = 1.005 \times 30 + 0.01336 \left( 2{,}501 + 55.8 \right) = 30.15 + 34.14 = 64.3\ \mathrm{kJ / kg\ da}
$$
**湿球温度是 $22.0\ {}^{\circ}\mathrm{C}$**，三个温度——$30.0$、$22.0$、$18.3$——就是描述该状态的三个数字，而**其中只有两个是独立的**。
**决定盘管尺寸的数字。** 把 $1\ \mathrm{kg / s}$ 的这种空气在 $101.325\ \mathrm{kPa}$ 下冷却到 $12\ {}^{\circ}\mathrm{C}$，此处 $\omega_{\mathrm{sat}} \left( 12 \right) = 0.00873$：
$$
\dot{Q} = 1 \times \left[ \left( 64.3 - h_2 \right) \right], \qquad
h_2 = 1.005 \times 12 + 0.00873 \left( 2{,}501 + 22.3 \right) = 12.06 + 22.01 = 34.1
$$
$$
\dot{Q} = 30.2\ \mathrm{kW}, \qquad
\dot{m}_{\mathrm{cond}} = 1 \times \left( 0.01336 - 0.00873 \right) = 4.63\ \mathrm{g / s} = 16.7\ \mathrm{kg / h}
$$
**显热与潜热的拆分。** 显热部分是 $1.005 \times \left( 1 + 1.86 \times 0.01336 \right) \times 18 = 18.6\ \mathrm{kW}$，潜热是 $11.6\ \mathrm{kW}$——**潜热占 $38\ \%$**，这个数字决定了冷却盘管的设计约束是**表面温度**而不是面积；这也是为什么只把数据中心冷却到干球 $24\ {}^{\circ}\mathrm{C}$ 比冷却到 $24\ {}^{\circ}\mathrm{C}$ **并且**除湿所需的盘管更小。
:::

::: definition 空气调节过程与蒸发冷却 {#def-ac}
$$
\begin{array}{l l l}
\text{过程} & \text{不变量} & \text{在焓湿图上} \\
\text{等湿加热} & \omega & \text{水平向右} \\
\text{等湿冷却，高于露点} & \omega & \text{水平向左} \\
\text{冷却除湿} & - & \text{向左下到饱和线，再沿饱和线走} \\
\text{喷水加湿} & h\ \text{（绝热）} & \text{沿等湿球温度线} \\
\text{喷蒸汽加湿} & T_{\mathrm{db}}\ \text{（近似）} & \text{垂直向上} \\
\text{两股风混合} & - & \text{在两状态连线上，与干空气流量成反比}
\end{array}
$$
**混合准则，焓湿图上被用得最多的一条线。**
$$
\frac{\dot{m}_{a,1}}{\dot{m}_{a,2}} = \frac{\text{点 2 到点 3 的距离}}{\text{点 1 到点 3 的距离}}
\quad \Longleftrightarrow \quad
\dot{m}_{a,3} \omega_3 = \dot{m}_{a,1} \omega_1 + \dot{m}_{a,2} \omega_2, \quad
\dot{m}_{a,3} h_3 = \dot{m}_{a,1} h_1 + \dot{m}_{a,2} h_2
$$
**让蒸发冷却成为设计决策而不是花招的数字。** 直接蒸发冷却沿**等湿球温度**线进行，所以 $35\ {}^{\circ}\mathrm{C}$、$20\ \%$ 湿度的空气（$\omega = 0.00775$，$T_{\mathrm{wb}} = 20.3\ {}^{\circ}\mathrm{C}$）可以冷却到
$$
T_{\mathrm{out}} = 20.3 + \left( 1 - \eta_{\mathrm{evap}} \right) \left( 35 - 20.3 \right)
$$
取蒸发效率 $85\ \%$，得 $22.5\ {}^{\circ}\mathrm{C}$——**用一台风机的功率换来 $12.5\ \mathrm{K}$ 的降温**，只有蒸气压缩式机组所需压缩机功率的 $1 / 25$。**代价是水**：$1\ \mathrm{kg / s}$ 的空气蒸发 $0.0055\ \mathrm{kg / s}$ 的水，每 $\mathrm{MW}$ 冷量每天用 **$20\ \mathrm{m^{3}}$ 水**，这就是蒸发冷却在亚利桑那和沙特是标准配置、在新加坡却无人使用的原因。
**能达到露点的两级方案。** **直接**级后接**间接**级（进风与被冷却饱和后的出风之间的换热器），能在不加水的情况下把送风降到进风露点以下，达到一个**由湿球差限定**的温度
$$
T_{\mathrm{supply}} = T_{\mathrm{wb}} + \left( 1 - \eta_{\mathrm{IE}} \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right)
$$
取 $\eta_{\mathrm{IE}} = 0.75$、湿球差 $14.7\ \mathrm{K}$，得 $23.9\ {}^{\circ}\mathrm{C}$、$\omega = 0.00775$——**干爽**的冷空气，这就是在干燥气候下两级蒸发冷却值两级第一级造价两倍的全部理由。
**给冷却塔定罪的数字。** 冷却塔是一种蒸发冷却器，其**目的是水而不是空气**：在 $7\ \mathrm{K}$ 的供回水温差和 $4\ \mathrm{K}$ 的接近端差下排 $1\ \mathrm{MW}$ 热，蒸发量为
$$
\dot{m}_{\mathrm{evap}} = \frac{1{,}000}{2{,}400} = 0.417\ \mathrm{kg / s} = 36\ \mathrm{m^{3} / day\ per\ MW}
$$
再加上漂失与排污的 $2$ 到 $5\ \%$。**一座 $1{,}000\ \mathrm{MW}$ 的电厂每小时耗水 $2{,}500\ \mathrm{m^{3}}$**——比一座 $50{,}000$ 人的城镇还多——而干式冷却正在美国西南部、西班牙和中国上马，原因是**水**，不是碳。
:::

::: widget plot
f: 0.622*(0.5*0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.5*0.61094*exp(17.27*x/(237.3+x))); 0.622*(0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.61094*exp(17.27*x/(237.3+x)))
x: -10, 45
y: 0, 0.07
labels: humidity ratio at 50 per cent RH; humidity ratio at saturation
caption: $101.325\ \mathrm{kPa}$ 下湿空气含湿量随干球温度的变化，分别取相对湿度 $50\ \%$ 和饱和，饱和压力用 Magnus 关联式 $p_{\mathrm{sat}} = 0.61094 \exp \left[ 17.27\, T / \left( 237.3 + T \right) \right]$ 千帕计算，$T$ 以摄氏度计。两条曲线**指数式地发散**，而这个发散正是冷却盘管潜热负荷随室外空气湿度急剧上升的全部原因：在 $20$ 到 $35\ {}^{\circ}\mathrm{C}$ 之间，饱和含湿量从 $0.0148$ 升到 $0.0368$，增大 **$2.5$ 倍**，而干球温差只增大 $1.75$ 倍。**湿热气候下每一个空调能耗数字，本质上都是对这条曲线的陈述。**
:::

## 燃烧

::: definition 化学计量与空燃比 {#def-stoich}
**以摩尔为基准的反应方程，空气中的氮随流穿过。**
$$
\mathrm{C_x H_y} + a_{\mathrm{th}} \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\longrightarrow x\, \mathrm{CO_2} + \frac{y}{2}\, \mathrm{H_2O} + 3.76\, a_{\mathrm{th}}\, \mathrm{N_2}
$$
$$
a_{\mathrm{th}} = x + \frac{y}{4} \quad \text{对烃类}, \qquad
a_{\mathrm{th}} = x + \frac{y}{4} - \frac{z}{2} \quad \text{对 } \mathrm{C_x H_y O_z}
$$
**三个比值。**
$$
\left( A / F \right)_{\mathrm{mass}} = \frac{a_{\mathrm{th}} \times 4.76 \times 28.97}{M_f}, \qquad
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}}, \qquad
\lambda = \frac{1}{\phi}
$$
**化学计量空燃比，每一套发动机标定都建立在这些数字上。**
$$
\begin{array}{l c c c c}
\text{燃料} & M & a_{\mathrm{th}} & \left( A / F \right)_{\mathrm{mass}} & \text{备注} \\
\text{氢} & 2.016 & 0.50 & 34.3 & \text{无碳，无 } \mathrm{CO_2} \\
\text{甲烷} & 16.04 & 2.00 & 17.19 & \text{在空气中体积分数 } 19\ \%\ \text{即为化学计量} \\
\text{丙烷} & 44.09 & 5.00 & 15.67 & \\
\text{辛烷} & 114.23 & 12.50 & 15.08 & \text{点燃式的基准燃料} \\
\text{柴油，} \mathrm{C_{12}H_{23}} & 167.3 & 17.75 & 14.58 & \\
\text{乙醇} & 46.07 & 3.00 & 9.00 & \text{所需体积是汽油的 } 2.7\ \text{倍} \\
\text{甲醇} & 32.04 & 1.50 & 6.45 & \text{柔性燃料喷油器要做大一号的原因} \\
\text{无烟煤，} \mathrm{C} & 12.01 & 1.00 & 11.5 & \text{另加水分和灰分} \\
\text{一氧化碳} & 28.01 & 0.50 & 1.16 & \text{当它是燃料时，它是燃料气而不是污染物}
\end{array}
$$
**让氢的 $34.3$ 具有误导性的数字。** 按**体积**计，氢每立方米燃料只需 $2.39\ \mathrm{m^{3}}$ 空气，而甲烷要 $9.52$，所以**进气道喷射**的氢发动机受限于喷油器的**排量**而不是化学——这正是氢直喷存在的原因。
**过剩空气与当量比的约定。**
$$
\%\ \text{过剩空气} = \left( \lambda - 1 \right) \times 100, \qquad
\phi = 1.0\ \text{化学计量}, \quad \phi > 1\ \text{富燃}, \quad \phi < 1\ \text{贫燃}
$$
**决定汽油机工作窗口的数字。** 三效催化器只在 $\phi = 0.995$ 到 $1.005$ 内工作，窗口仅 **$1\ \%$**，全靠氧传感器的阶跃信号把它钉在那里。柴油机部分负荷跑在 $\phi = 0.2$ 到 $0.4$，工业燃气轮机跑在 $\phi = 0.3$ 到 $0.5$ 以把火焰温度压在 $\mathrm{NO_x}$ 门槛之下，而工业炉跑在 $\lambda = 1.15$ 到 $1.30$，因为再少就燃烧不完全、再多就是排烟损失。
:::

::: definition 烟气分析与过剩空气计算 {#def-flue}
**干基（奥氏）分析，以及与之配套的碳平衡。** 烃类以 $\lambda$ 倍化学计量空气燃烧，**无**解离、燃烧**完全**：
$$
\mathrm{C_x H_y} + \lambda a_{\mathrm{th}} \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\to x\, \mathrm{CO_2} + \frac{y}{2}\, \mathrm{H_2O} + \left( \lambda - 1 \right) a_{\mathrm{th}}\, \mathrm{O_2} + 3.76 \lambda a_{\mathrm{th}}\, \mathrm{N_2}
$$
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100\, x}{x + \left( \lambda - 1 \right) a_{\mathrm{th}} + 3.76 \lambda a_{\mathrm{th}}}, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{100 \left( \lambda - 1 \right) a_{\mathrm{th}}}{x + \left( \lambda - 1 \right) a_{\mathrm{th}} + 3.76 \lambda a_{\mathrm{th}}}
$$
**甲烷、$\lambda = 1.20$ 的求值。**
$$
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.2 \times 2 + 3.76 \times 1.2 \times 2} = \frac{100}{10.816} = 9.25\ \%, \qquad
\%\, \mathrm{O_2} = \frac{0.4}{10.816} = 3.70\ \%
$$
**$\mathrm{CO_2}$ 的最大值**在 $\lambda = 1$ 处，为 $100 / \left( 1 + 7.52 \right) = 11.7\ \%$——**这个数字就是烟气监测仪校准的全部**：燃气锅炉上 $9.25\ \%$ 的 $\mathrm{CO_2}$ 读数意味着 $\lambda = 1.20$，$11.0\ \%$ 的读数意味着 $\lambda = 1.06$。
**让 $\mathrm{O_2}$ 读数成为有用读数的数字。** 因为 $\mathrm{CO_2}$ 的最大值随燃料而异（甲烷 $11.7\ \%$、碳 $15.4\ \%$、辛烷 $14.7\ \%$），基于 $\mathrm{CO_2}$ 的过剩空气数必须知道燃料；而 **$\mathrm{O_2}$** 数在一阶近似下不需要，这就是现代燃烧器都按 $\mathrm{O_2}$ 控制、再算出 $\mathrm{CO_2}$ 的原因。
**总被忘掉的修正。** 氧化锆或顺磁式 $\mathrm{O_2}$ 分析仪按**湿基**还是**干基**读数，取决于它是否被加热到露点以上，燃气锅炉在 $\lambda = 1.2$ 时两者之差为
$$
\%\, \mathrm{O_{2,\mathrm{wet}}} = \%\, \mathrm{O_{2,\mathrm{dry}}} \times \frac{10.816}{10.816 + 2} = 3.70 \times 0.844 = 3.12\ \%
$$
**$3.7\ \%$ 读数上的 $0.58$ 个百分点误差就是 $16\ \%$**，这是锅炉燃烧控制回路里最常见的单一错误。
**锅炉该跑多大过剩空气，代价几何。**
$$
\begin{array}{l c c c c}
\lambda & \%\, \mathrm{O_2} & \text{排烟损失}\ \left( 150\ {}^{\circ}\mathrm{C}\ \text{净}\right) & \text{未燃损失} & \text{合计} \\
1.05 & 2.1 & 6.4\ \% & 1.2\ \% & 7.6\ \% \\
1.10 & 3.4 & 6.7\ \% & 0.6\ \% & 7.3\ \% \\
1.15 & 4.6 & 7.0\ \% & 0.3\ \% & 7.3\ \% \\
1.20 & 3.7\ \text{（湿基 } 3.1\text{）} & 7.3\ \% & 0.2\ \% & 7.5\ \% \\
1.30 & 6.0 & 8.0\ \% & 0.15\ \% & 8.2\ \% \\
1.50 & 8.6 & 9.6\ \% & 0.1\ \% & 9.7\ \%
\end{array}
$$
**最优值是 $\lambda = 1.12$ 到 $1.18$**，而曲线在 $1.10$ 到 $1.25$ 之间是**平**的——这就是燃烧器从 $1.30$ 调到 $1.15$ 能省 **$0.9\ \%$** 的燃料、而从 $1.15$ 调到 $1.05$ 反而**亏** $0.3\ \%$ 还换来一根被腐蚀的烟囱的原因。
:::

::: definition 生成焓、热值与绝热火焰温度 {#def-heat}
**稳流燃烧能量衡算，以每千摩尔燃料计。**
$$
Q = \sum_{\mathrm{prod}} N_i \left( \bar{h}_f^{\circ} + \bar{\Delta h} \right)_i
- \sum_{\mathrm{react}} N_i \left( \bar{h}_f^{\circ} + \bar{\Delta h} \right)_i
$$
**$25\ {}^{\circ}\mathrm{C}$、$1\ \mathrm{atm}$ 下的生成焓，单位千焦每千摩尔。**
$$
\begin{array}{l c l c}
\mathrm{CO_2} & - 393{,}520 & \mathrm{H_2O\ (l)} & - 285{,}830 \\
\mathrm{CO} & - 110{,}530 & \mathrm{H_2O\ (g)} & - 241{,}820 \\
\mathrm{CH_4} & - 74{,}850 & \mathrm{NO} & + 90{,}290 \\
\mathrm{C_8 H_{18}\ (l)} & - 249{,}950 & \mathrm{SO_2} & - 296{,}830 \\
\mathrm{CO_2}\ \text{等}、\ \mathrm{O_2}、\ \mathrm{N_2}、\ \mathrm{H_2} & 0 & \mathrm{OH} & + 38{,}990
\end{array}
$$
**热值，以及把它们分开的 $10.9\ \%$。** 对甲烷，$M = 16.04$：
$$
\mathrm{HHV} = \frac{285{,}830 \times 2 + 393{,}520 - 74{,}850}{16.04} = 55{,}530\ \mathrm{kJ / kg}
$$
$$
\mathrm{LHV} = \mathrm{HHV} - \frac{y}{2} \times \frac{44{,}010}{M}
= 55{,}530 - \frac{2 \times 44{,}010}{16.04} = 55{,}530 - 5{,}490 = 50{,}040\ \mathrm{kJ / kg}
$$
**比值 $\mathrm{HHV} / \mathrm{LHV}$，锅炉规格书就系于这个数字。**
$$
\begin{array}{l c c c}
\text{甲烷} & 1.110 & \text{辛烷} & 1.075 \\
\text{氢} & 1.186 & \text{烟煤} & 1.045 \\
\text{丙烷} & 1.085 & \text{干木柴} & 1.065 \\
\text{乙醇} & 1.091 & \text{重质燃料油} & 1.062
\end{array}
$$
**规律。** 比值随燃料的**氢含量**上升，氢的 $1.186$ 就是同一台燃氢锅炉按 HHV 基准的"效率"看起来比按 LHV 基准高 $19\ \%$ 的原因。
**绝热火焰温度，由 $Q = 0$ 的衡算求出。**
$$
\sum_{\mathrm{react}} N_i \bar{h}_{f,i}^{\circ} = \sum_{\mathrm{prod}} N_i \left( \bar{h}_{f,i}^{\circ} + \bar{\Delta h}_i \right)
$$
**甲烷、化学计量空气、进口 $25\ {}^{\circ}\mathrm{C}$、等压、无解离的求值。**
$$
802{,}310 = 1 \times 393{,}520 + 2 \times \Delta \bar{h}_{\mathrm{H_2O}} + 3{,}760 \times \Delta \bar{h}_{\mathrm{N_2}} + 2 \times 241{,}820 - 2 \times 285{,}830
$$
化简为
$$
\sum N_i\, \Delta \bar{h}_i = 802{,}310\ \mathrm{kJ\ per\ kmol\ of\ CH_4}
$$
对理想气体表逐次试算得
$$
T_{\mathrm{ad}} \approx 2{,}400\ \mathrm{K}\ \text{无解离时}, \qquad
T_{\mathrm{ad}} \approx 2{,}150\ \mathrm{K}\ \text{计入平衡时}
$$
**这 $250\ \mathrm{K}$ 就是解离**，而且它不是细枝末节：在 $2{,}150\ \mathrm{K}$ 下，平衡 $\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2}$ 留下约 **$0.6\ \%$** 的碳以 CO 形式存在，$\mathrm{H_2O}$ 约**解离 $1.5\ \%$**，锁在这些组分里的焓恰好就是那 $250\ \mathrm{K}$。
**让火焰温度成为设计约束而不是奇闻的数字。**
$$
\begin{array}{l c}
\text{甲烷在空气中，化学计量} & 2{,}150\ \mathrm{K} \\
\text{甲烷在氧气中} & 3{,}030\ \mathrm{K} \\
\text{甲烷在空气中，} \phi = 1.2 & 2{,}230\ \mathrm{K} \\
\text{甲烷在空气中，} \phi = 0.8 & 2{,}020\ \mathrm{K} \\
\text{甲烷在空气中，进口预热到 } 600\ \mathrm{K} & 2{,}480\ \mathrm{K} \\
\text{甲烷在 } 20\ \mathrm{bar}\text{，化学计量空气} & 2{,}090\ \mathrm{K} \\
\text{氢在空气中，化学计量} & 2{,}380\ \mathrm{K} \\
\text{柴油在空气中，} \phi = 0.35 & 1{,}500\ \mathrm{K}
\end{array}
$$
**怎么读。** **峰值在 $\phi \approx 1.1$，不在 $\phi = 1$**，因为稍富的混合气仍能烧尽，而多余的氮更少；**预热使火焰温度约升高每预热一开尔文 $0.55\ \mathrm{K}$**，这就是蓄热式燃烧器要预热到 $1{,}100\ {}^{\circ}\mathrm{C}$、换来 $2{,}500\ \mathrm{K}$ 火焰的原因；而**压力使其降低**，这就是高压缩比发动机的循环峰值温度低于空气标准分析预测值的原因。
:::

::: definition 化学平衡、解离与污染物 {#def-eq}
**平衡常数。** 对温度 $T$ 下的反应 $\sum \nu_i \mathrm{A}_i = 0$，
$$
\ln K_p = - \frac{\Delta G^{\circ} \left( T \right)}{R_u T}
= - \sum_i \nu_i \frac{\bar{g}_f^{\circ} \left( T \right)}{R_u T}, \qquad
K_p = \prod_i \left( \frac{p_i}{P_{\mathrm{ref}}} \right)^{\nu_i}
$$
**决定一种组分能否存留的数字。**
$$
\begin{array}{l c c}
\text{反应} & 2{,}000\ \mathrm{K}\ \text{下的 } \ln K_p & \text{含义} \\
\mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{CO_2} & + 14.0 & \text{基本完全} \\
\mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{H_2O} & + 13.7 & \text{基本完全} \\
\tfrac{1}{2} \mathrm{N_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{NO} & - 4.3 & 1.2\ \%\ \text{平衡时可得的 NO} \\
\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} & - 14.0 & 0.6\ \%\ \text{解离} \\
\mathrm{H_2O} \rightleftharpoons \mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} & - 13.7 & 1.5\ \%\ \text{解离}
\end{array}
$$
**让 $\mathrm{NO_x}$ 成为动力学问题而不是平衡问题的数字。** $2{,}150\ \mathrm{K}$ 下平衡的 $\mathrm{NO}$ 摩尔分数约为**百万分之 $1.5$**，燃气轮机燃烧室出口带出 **$15$ 到 $30\ \mathrm{ppm}$**——同一量级——而柴油机以 $1{,}500\ \mathrm{K}$ 的火焰温度带出 **$500\ \mathrm{ppm}$**，该温度下的平衡值**低于 $0.01\ \mathrm{ppm}$**。**Zeldovich 机理受速率限制，不受平衡限制**，原因是 $\mathrm{N \equiv N}$ 键的 $945\ \mathrm{kJ / mol}$ 使**速率**而非平衡成为约束：
$$
\frac{d \left[ \mathrm{NO} \right]}{d t} = 2 \times 10^{16} \frac{1}{T^{\circ}\!} \exp \left( - \frac{69{,}300}{R_u T} \right) \left[ \mathrm{O} \right] \left[ \mathrm{N_2} \right] \ \mathrm{ppm / s}
$$
**指数的咬噬。** 火焰温度从 $2{,}150$ 降到 $2{,}050\ \mathrm{K}$，热力型 $\mathrm{NO_x}$ 生成速率的下降倍数为
$$
\exp \left[ \frac{69{,}300}{8.314} \left( \frac{1}{2{,}050} - \frac{1}{2{,}150} \right) \right]
= \exp \left[ 8{,}335 \times 2.279 \times 10^{- 5} \right] = 1.21
$$
——**只有 $21\ \%$**，这就是**贫燃预混燃烧**从**停留时间和峰值温度**下手而不管平均温度、以及**峰值**降 $10\ \mathrm{K}$ 比平均值降 $100\ \mathrm{K}$ 更值钱的原因。
**烟气露点，决定锅炉选材的数字。**
$$
\begin{array}{l c c}
\text{燃料与过剩空气} & \text{水分压} & \text{露点} \\
\text{甲烷，} \lambda = 1.0 & 9.2\ \mathrm{kPa} & 44.2\ {}^{\circ}\mathrm{C} \\
\text{甲烷，} \lambda = 1.2 & 7.4\ \mathrm{kPa} & 39.9\ {}^{\circ}\mathrm{C} \\
\text{甲烷，} \lambda = 2.0 & 5.1\ \mathrm{kPa} & 33.4\ {}^{\circ}\mathrm{C} \\
\text{天然气，} \lambda = 1.15 & 7.9\ \mathrm{kPa} & 41.4\ {}^{\circ}\mathrm{C} \\
\text{重质燃料油，} \lambda = 1.15 & 9.6\ \mathrm{kPa} & 45.0\ {}^{\circ}\mathrm{C} \\
\text{煤，} \lambda = 1.2 & 11.4\ \mathrm{kPa} & 48.4\ {}^{\circ}\mathrm{C}
\end{array}
$$
**酸露点，一个不同且高得多的数字。** 燃料含硫 $1\ \%$ 时生成的 $\mathrm{SO_3}$ 形成硫酸雾，其露点为
$$
T_{\mathrm{acid}} \approx 120\text{–}155\ {}^{\circ}\mathrm{C}\ \text{（煤和重油）}
$$
**这就是燃煤锅炉空气预热器的金属壁温从不低于 $150\ {}^{\circ}\mathrm{C}$ 的原因**，也是船用重油机气缸油碱值取 $70$ 而不取 $40$ 的原因。
**让冷凝式锅炉占市场 $25\ \%$ 而不是 $100\ \%$ 的数字。** 冷凝式锅炉回收潜热**并**把烟气冷却到 $45\ {}^{\circ}\mathrm{C}$，但只有**回水低于 $55\ {}^{\circ}\mathrm{C}$** 时才能做到——而按散热器设计的既有建筑回水 $70\ {}^{\circ}\mathrm{C}$，于是锅炉只在采暖季 **$20\ \%$** 的时间里冷凝，它的 $106\ \%$ 变成 $96\ \%$。**真正要紧的改造是散热器面积，不是锅炉。**
:::

::: widget plot
f: 2230-900*pow(x-1.1,2)+100*(x-1.1); 1980-900*pow(x-1.1,2)+100*(x-1.1)
x: 0.8, 2.0
y: 1400, 2500
labels: adiabatic flame temperature K, no dissociation; with equilibrium dissociation
caption: 甲烷在空气中燃烧的等压绝热火焰温度随当量比 $\phi$ 的变化（经折算使峰值位于 $\phi = 1.1$ 附近）。曲线是**不对称的**：贫燃侧降得陡，因为多余的氮吸走了热；富燃侧降得缓，因为未燃的燃料把热带走了。**峰值在 $\phi \approx 1.1$ 而不是 $\phi = 1$**，两者之间 $80\ \mathrm{K}$ 的差别，就是贫燃预混燃气轮机燃烧室跑在 $\phi \approx 0.6$ 的原因——接受**低 $600\ \mathrm{K}$** 的火焰温度，换来热力型 $\mathrm{NO_x}$ **十倍**的削减。
:::

## 算例

::: example 一项空调负荷 {#ex-ac}
一间办公室需要 $120\ \mathrm{kW}$ 显热冷却和 $40\ \mathrm{kW}$ 潜热冷却。室外空气 $35\ {}^{\circ}\mathrm{C}$、相对湿度 $60\ \%$；室内保持 $24\ {}^{\circ}\mathrm{C}$、$50\ \%$；送风以 $13\ {}^{\circ}\mathrm{C}$ 离开盘管；送风中 $25\ \%$ 是新风、其余回风循环。求风量、盘管负荷和冷水机组的电耗。
::: solution
**各状态。**
$$
\begin{array}{l c c c c}
& T_{\mathrm{db}} & \phi & \omega & h \\
\text{O（室外）} & 35 & 0.60 & 0.02135 & 91.1 \\
\text{R（室内）} & 24 & 0.50 & 0.00930 & 47.5 \\
\text{C（盘管出口，饱和）} & 13 & 1.00 & 0.00940^{*} & 36.4 \\
\text{M（混合）} & 26.75 & - & 0.01231 & 58.4
\end{array}
$$
**送风量，由显热负荷求出。**
$$
\dot{m}_a = \frac{\dot{Q}_s}{c_{p,m} \left( T_R - T_C \right)}
= \frac{120}{1.005 \times \left( 1 + 1.86 \times 0.0093 \right) \times \left( 24 - 13 \right)}
= \frac{120}{11.23} = 10.69\ \mathrm{kg\ da / s}
$$
**用潜热负荷校核。**
$$
\dot{Q}_l = 10.69 \times \left( 0.00930 - 0.00940 \right) \times 2{,}501 = - 2.7\ \mathrm{kW}
$$
**盘管出口含湿量 $0.00940$ 高于室内的**，盘管交不出潜热负荷——正确的盘管出口状态应由潜热要求反求：
$$
\omega_C = \omega_R - \frac{\dot{Q}_l}{\dot{m}_a \times 2{,}501}
= 0.00930 - \frac{40}{10.69 \times 2{,}501} = 0.00930 - 0.00149 = 0.00781
$$
**盘管出口温度**是 $\omega = 0.00781$ 对应的饱和温度，即 $T_{\mathrm{sat}} \left( 1.257\ \mathrm{kPa} \right) = 10.2\ {}^{\circ}\mathrm{C}$。
**对账。** $13\ {}^{\circ}\mathrm{C}$ 的盘管出口饱和含湿量是 $\omega = 0.00940$，**高于**室内的 $0.00930$，所以在该盘管温度下无论多大风量都吸收不了 $40\ \mathrm{kW}$ 的潜热负荷；**送风温度必须是 $10.2\ {}^{\circ}\mathrm{C}$**。
**这逼出来的设计决策。** 要么盘管出口 $10.2\ {}^{\circ}\mathrm{C}$，这需要 **$5\ {}^{\circ}\mathrm{C}$** 的冷冻水供水、冷水机组能耗多 **$25\ \%$**；要么风量增加 **$35\ \%$**，风机功率多 **$50\ \%$**、风管加大。**显热比为 $0.75$ 是硬约束，而它由建筑决定，不由机房决定。**
**盘管负荷，按修正后的状态。**
$$
\dot{Q}_{\mathrm{coil}} = 10.69 \times \left( h_M - h_C \right)
= 10.69 \times \left( 58.4 - 29.6 \right) = 307.7\ \mathrm{kW}
$$
**冷凝水量。**
$$
\dot{m}_w = 10.69 \times \left( 0.01231 - 0.00781 \right) = 0.0481\ \mathrm{kg / s} = 173\ \mathrm{kg / h}
$$
**冷水机组的电耗。** 水冷机组 $\mathrm{COP}$ 取 $5.4$，水泵风机另计：
$$
\dot{W}_{\mathrm{chiller}} = \frac{307.7}{5.4} = 57.0\ \mathrm{kW}
$$
**水泵。** $6\ \mathrm{K}$ 温升下冷冻水量为 $307.7 / \left( 4.19 \times 6 \right) = 12.25\ \mathrm{kg / s} = 0.0123\ \mathrm{m^{3} / s}$，按行业带控制阀的一次泵系统 $0.05\ \mathrm{kW}$ 每升每秒：
$$
\dot{W}_{\mathrm{pumps}} = 12.25 \times 0.05 = 0.61\ \mathrm{kW}
$$
**风机。** 送风体积流量 $10.69 / 1.18 = 9.06\ \mathrm{m^{3} / s}$，盘管、过滤器、风管和新风口的总压 $550\ \mathrm{Pa}$，风机与电机效率 $0.65$：
$$
\dot{W}_{\mathrm{fans}} = \frac{9.06 \times 550}{0.65 \times 1000} = 7.7\ \mathrm{kW}
$$
$$
\dot{W}_{\mathrm{total}} = 57.0 + 0.6 + 7.7 = 65.3\ \mathrm{kW}, \qquad
\mathrm{COP}_{\mathrm{plant}} = \frac{120 + 40}{65.3} = 2.45
$$
**怎么读。** **机组用 $65.3\ \mathrm{kW}$ 的电供出 $160\ \mathrm{kW}$ 的冷量——机组 COP 为 $2.45$，而冷水机组铭牌是 $5.4$**——这 $2.2$ 倍的差距是水泵、风机和盘管端差。**铭牌上的数字是 $5.4$，建筑付账的数字是 $2.45$**，这中间的差距就是暖通工程师的全部职业价值。
**合理性检验。** 室外空气负荷之所以如此之大，是因为 $2.67\ \mathrm{kg / s}$ 焓值 $h = 91.1$ 的新风对照室内的 $47.5$ 携带着
$$
2.67 \times \left( 91.1 - 47.5 \right) = 116.4\ \mathrm{kW}
$$
**用 $25\ \%$ 的风带来 $73\ \%$ 的总冷量**——这就是每份认真的办公空调规格书都对新风配**能量回收**的原因，也是有效度 $75\ \%$ 的全热回收转轮值 $87\ \mathrm{kW}$ 盘管负荷、约 $16\ \mathrm{kW}$ 风机功率的原因。
:::
:::

::: example 燃气锅炉的效率 {#ex-boiler}
一台锅炉烧天然气（甲烷），过剩空气 $15\ \%$。烟气以 $160\ {}^{\circ}\mathrm{C}$ 排出，助燃空气以 $20\ {}^{\circ}\mathrm{C}$ 进入。计算排烟损失，以及两种热值基准下的效率，再算烟气冷凝冷却到 $40\ {}^{\circ}\mathrm{C}$ 时的效率。
::: solution
**反应方程。**
$$
\mathrm{CH_4} + 1.15 \times 2 \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\to \mathrm{CO_2} + 2\, \mathrm{H_2O} + 0.3\, \mathrm{O_2} + 8.648\, \mathrm{N_2}
$$
**烟气。** 每千摩尔燃料湿烟气 $12.148\ \mathrm{kmol}$、干烟气 $10.148\ \mathrm{kmol}$。
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100}{10.148} = 9.85\ \%, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{0.3}{10.148} = 2.96\ \%
$$
**排烟损失，按 LHV 基准。** 取 $20$ 到 $160\ {}^{\circ}\mathrm{C}$ 的平均比热：
$$
\begin{array}{l c c c}
\mathrm{CO_2} & 1\ \mathrm{kmol} & 41.6\ \mathrm{kJ / kmol \cdot K} & 5{,}824\ \mathrm{kJ} \\
\mathrm{H_2O} & 2\ \mathrm{kmol} & 34.4 & 9{,}632 \\
\mathrm{O_2} & 0.3\ \mathrm{kmol} & 29.6 & 1{,}243 \\
\mathrm{N_2} & 8.648\ \mathrm{kmol} & 29.3 & 3{,}599 \\
\hline
& & & 20{,}298\ \mathrm{kJ\ per\ kmol\ fuel}
\end{array}
$$
$$
\eta_{\mathrm{stack}} = \frac{20{,}298}{802{,}310} = 2.53\ \%
$$
**毛效率。**
$$
\eta_{\mathrm{LHV}} = 100 - 2.53 - 0.4\ \left( \text{未燃与散热} \right) = 97.1\ \%
$$
**而按 HHV 基准为**
$$
\eta_{\mathrm{HHV}} = 97.1 \times \frac{50{,}040}{55{,}530} = 87.5\ \%
$$
**这 $9.6$ 个百分点的差就是水的潜热**，两个数字说的是同一台锅炉。
**冷凝工况。** 把烟气冷却到 $40\ {}^{\circ}\mathrm{C}$，$2\ \mathrm{kmol}$ 水冷凝了 $1.6\ \mathrm{kmol}$（其余以 $40\ {}^{\circ}\mathrm{C}$ 露点的蒸气排出）：
$$
\text{显热： } 20{,}298 \times \frac{160 - 40}{140} = 17{,}398 \to \text{按 } 20 \to 40\ {}^{\circ}\mathrm{C} \text{ 重算： } 2{,}900\ \mathrm{kJ}
$$
$$
\text{潜热： } 1.6 \times 44{,}010 = 70{,}416\ \mathrm{kJ}
$$
$$
\text{回收总量} = 2{,}900 + 70{,}416 = 73{,}316\ \mathrm{kJ}
$$
**剩余损失**，取 $40\ {}^{\circ}\mathrm{C}$ 排烟下的干烟气、残余蒸气和散热：
$$
\text{干烟气： } 10.148 \times 29.4 \times 20 = 5{,}967\ \mathrm{kJ}, \qquad
\text{蒸气： } 0.4 \times \left( 44{,}010 + 34 \times 20 \right) = 18{,}284\ \mathrm{kJ}
$$
$$
\text{散热与未燃： } 0.004 \times 802{,}310 = 3{,}209\ \mathrm{kJ}, \qquad
\text{损失合计} = 27{,}460\ \mathrm{kJ}
$$
**效率必须对固定的分母报出**，在 **HHV** 基准下，水的潜热记在燃料数字之内：
$$
\eta_{\mathrm{HHV}} = 1 - \frac{27{,}460}{802{,}310 \times 55{,}530 / 50{,}040} = 1 - \frac{27{,}460}{890{,}300} = 96.9\ \%
$$
**冷凝式锅炉按 HHV 是 $96.9\ \%$、按 LHV 是 $107.5\ \%$**，而 $107.5\ \%$ 是合法的，因为 LHV 没有把锅炉收回的 $70.4\ \mathrm{MJ}$ 潜热算进分母。
**决定这项改造的数字。** 多回收的是每千摩尔燃料 $70.4\ \mathrm{MJ}$，即每千克燃气 **$4{,}390\ \mathrm{kJ}$**——值燃料 LHV 的 **$8.8\ \%$**。一台 $10\ \mathrm{MW}$ 锅炉年运行 $8{,}000$ 小时，这就是 **$700{,}000$ 货币单位**，而冷凝式换热器造价 **$250{,}000$**。**回收期五个月，约束是回水温度**，换热器要见到 $45\ {}^{\circ}\mathrm{C}$ 的烟气，回水必须低于 $55\ {}^{\circ}\mathrm{C}$。
**合理性检验。** 非冷凝工况按 LHV 是 $97.1\ \%$、按 HHV 是 $87.5\ \%$，差额是 $11\ \%$ 的潜热；冷凝式锅炉的 LHV 数字之所以超过 $100\ \%$，是因为 LHV 是一个**更小的分母**，而不是能量更少。**本例中每一个效率数字都是正确的，而四个数字里有三个会被一个挑选讨好基准的厂商报错**——这就是欧洲 ErP 指令强制采用 **GCV/HHV** 基准、美国 ASHRAE 惯例采用 **NCV/LHV** 基准的原因。
:::
:::

::: example 燃气轮机燃烧室 {#ex-gtcomb}
一台燃气轮机燃烧室接收 $728\ \mathrm{K}$、$1.35\ \mathrm{MPa}$ 的空气，以甲烷为燃料输出 $1{,}690\ \mathrm{K}$ 的燃气。求每千克空气的燃料量、当量比、出口 $\mathrm{NO_x}$ 倾向和燃烧室的㶲毁损。
::: solution
**每千克空气的能量衡算。**
$$
\dot{m}_f \times \mathrm{LHV} = \left( 1 + \dot{m}_f \right) c_{p,g} \left( T_3 - T_2 \right)
$$
取 $c_{p,g} = 1.10\ \mathrm{kJ / kg \cdot K}$、$\mathrm{LHV} = 50{,}040\ \mathrm{kJ / kg}$：
$$
\dot{m}_f \times 50{,}040 = \left( 1 + \dot{m}_f \right) \times 1.10 \times 962
\quad \Rightarrow \quad
\dot{m}_f = \frac{1{,}058}{48{,}982} = 0.0216\ \mathrm{kg\ fuel / kg\ air}
$$
**当量比。** 甲烷的化学计量空燃比是 $17.19$，于是
$$
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}} = \frac{0.0216}{1 / 17.19} = 0.0216 \times 17.19 = 0.371
$$
**燃烧室跑在 $\phi = 0.37$，即 $169\ \%$ 的过剩空气**——原因是涡轮叶片承受不了超过 $1{,}690\ \mathrm{K}$，所以燃烧室被刻意烧得过贫，火焰靠**富燃主燃区**稳住，下游开**掺混孔**。
**让掺混孔成为设计难题的数字。** $\phi \approx 1.1$ 的主燃区达到 $2{,}300\ \mathrm{K}$，按 Zeldovich 速率生成 $\mathrm{NO}$；占总风量 **$60\ \%$** 的掺混空气必须在 **$30\ \mathrm{ms}$** 内与主燃气体混合，在气流到达喷嘴前淬灭 $\mathrm{NO}$ 的生成。**掺混孔布局不佳会让 $\mathrm{NO_x}$ 差出三倍，而效率上分文不损**——这就是燃烧室研发是光学和声学的活、不是热力学的活的原因。
**出口成分。** $\phi = 0.37$、$1{,}690\ \mathrm{K}$ 下：
$$
\%\, \mathrm{CO_2} = 3.1, \quad \%\, \mathrm{O_2} = 11.9, \quad \%\, \mathrm{H_2O} = 3.6, \quad \%\, \mathrm{N_2} = 81.4
$$
**平衡 $\mathrm{NO}$** 在 $1{,}690\ \mathrm{K}$ 下是 $0.05\ \mathrm{ppm}$，真实的单管燃烧室出口带出 **$9\ \mathrm{ppm}$**（折算到 $15\ \%\ \mathrm{O_2}$），贫燃预混的带出 **$3\ \mathrm{ppm}$**——差别在**主燃区峰值温度**，不在平均值。
**㶲毁损。** 燃烧室的不可逆性以反应和混合为主：
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{prod}} N \bar{s} - \sum_{\mathrm{react}} N \bar{s} - \frac{\dot{Q}}{T_b} \quad \left( \dot{Q} = 0,\ \text{绝热} \right)
$$
甲烷以化学计量空气在 $298\ \mathrm{K}$ 下燃烧的标准熵产是 $388\ \mathrm{kJ / kmol \cdot K}$，在 $728\ \mathrm{K}$ 进口、$\phi = 0.37$ 下约为 **$520\ \mathrm{kJ / kmol \cdot K}$**：
$$
\dot{X}_{\mathrm{dest}} = 298.15 \times 520 = 155{,}000\ \mathrm{kJ\ per\ kmol\ fuel}
$$
对照燃料㶲 $831{,}650\ \mathrm{kJ / kmol}$——**燃料㶲的 $18.6\ \%$ 光在燃烧室里就被毁掉了**，涡轮机还没看到它。
**怎么读。** **燃烧室是燃气轮机里最大的单一㶲毁损源**，而减少它的办法不是更好的火焰筒，而是**更低的燃烧温度配更高压比的压气机**——这正是 H 级和 J 级机组走过的方向，也是它们的第二定律效率从 $65\ \%$ 升到 $71\ \%$、第一定律效率从 $58\ \%$ 升到 $63\ \%$ 的原因。
**合理性检验。** 燃烧室之所以毁掉燃料㶲的 $18.6\ \%$，是因为它把一股**室温、低熵**的反应物流变成一股 **$1{,}690\ \mathrm{K}$** 的产物流，靠的是一场**不受约束的化学反应**，而任何不受约束的反应都像自由膨胀一样不可逆。**燃料电池是另一条路**，它发电 $55\ \%$、电堆内毁损 $15\ \%$，而不是机器还没开跑就先毁掉 $18.6\ \%$。
:::
:::

::: example 烟气露点与冷凝式改造 {#ex-dewpoint}
一台 $5\ \mathrm{MW}$ 燃气锅炉目前以 $180\ {}^{\circ}\mathrm{C}$ 排烟，拟加装冷凝式省煤器。热网回水 $58\ {}^{\circ}\mathrm{C}$。评估回收量、材料和风险。
::: solution
**烟气。** 甲烷、$\lambda = 1.15$：每千摩尔燃料湿烟气 $11.65\ \mathrm{kmol}$，其中水 $2\ \mathrm{kmol}$。
$$
p_{\mathrm{H_2O}} = \frac{2}{11.65} \times 101.325 = 17.39\ \mathrm{kPa} \quad \Rightarrow \quad
T_{\mathrm{dp}} = 56.8\ {}^{\circ}\mathrm{C}
$$
**怎么读。** **$58\ {}^{\circ}\mathrm{C}$ 的回水高于 $56.8\ {}^{\circ}\mathrm{C}$ 的露点**——省煤器几乎冷凝不了，回收的只有显热。
**回水 $58\ {}^{\circ}\mathrm{C}$ 时的回收量。** 把烟气冷却到 $65\ {}^{\circ}\mathrm{C}$：
$$
\dot{Q} = \frac{5{,}000}{0.971} \times \frac{180 - 65}{1{,}400} \times 0.90 = 401\ \mathrm{kW}
$$
**回水降到 $40\ {}^{\circ}\mathrm{C}$ 时的回收量。** 把烟气冷却到 $45\ {}^{\circ}\mathrm{C}$，$2\ \mathrm{kmol}$ 水冷凝 $1.45\ \mathrm{kmol}$：
$$
\dot{Q} = 401 + 5{,}150 \times \frac{1.45}{2} \times \frac{44{,}010 / 16.04}{1{,}400} \approx 401 + 715 = 1{,}116\ \mathrm{kW}
$$
**多回收的 $715\ \mathrm{kW}$ 值每年 $250{,}000$ 货币单位**，而要求回水温度下降 **$18\ \mathrm{K}$**，这又要求**热网上每栋建筑增加散热末端面积**。
**材料。** 燃气烟道的冷凝水 pH 为 **$3.5$ 到 $4.5$**（碳酸，加上 $\mathrm{NO_x}$ 带来的硝酸），**对碳钢和砖都有侵蚀性**。可选项：
$$
\begin{array}{l l c}
\text{不锈钢 316L} & \text{标准选材，但氯化物超过 } 200\ \mathrm{mg / l} \text{ 会点蚀} & 1.0 \\
\text{铝（铸造或焊接）} & \text{欧洲锅炉的标准选材，耐到 pH } 5 & 0.8 \\
\text{PPSU / 氟聚合物} & \text{用于小型机组，限用至 } 110\ {}^{\circ}\mathrm{C} & 1.4 \\
\text{玻璃} & \text{西门子 / Schmöckwitz 方案，免疫但脆弱} & 2.2
\end{array}
$$
**冷凝水必须中和**——一台 $5\ \mathrm{MW}$ 锅炉每天产生 **$1.4\ \mathrm{m^{3}}$**、pH 为 $4$ 的冷凝水，排入铜质排水管会在三年内把它毁掉。**一支中和滤芯每年 $600$，却被 $80\ \%$ 的工程省掉了。**
**宣传册上永远不会写的风险。** 冷凝式省煤器**把烟气冷却到燃料中任何硫的酸露点以下**。天然气含硫低于 $5\ \mathrm{mg / m^{3}}$，安全；**一台由燃气改烧沼气、填埋气或氢掺混气的锅炉，其硫含量波动，可能在 $60\ {}^{\circ}\mathrm{C}$ 析出硫酸**，十八个月腐蚀掉一台不锈钢换热器。**规格书必须写明燃料的硫上限，并且燃料供应商必须在合同上受其约束。**
**决定项目的数字。** 在现有回水温度下，省煤器的回收量只值锅炉燃料的 **$0.9\ \%$**，在 $40\ {}^{\circ}\mathrm{C}$ 回水下才值 **$14\ \%$**。**这个项目是一个披着换热器采购合同外衣的热网温度项目**，而没做末端调研就批准它的人，买回来的是一台 $400\ \mathrm{kW}$ 的换热器，而不是一台 $1{,}100\ \mathrm{kW}$ 的。
**合理性检验。** 过剩空气**稀释**水分、**压低**露点，所以 $\lambda = 1.15$ 下的 $56.8\ {}^{\circ}\mathrm{C}$ 介于化学计量工况的 $44.2\ {}^{\circ}\mathrm{C}$ 与定义表中 $\lambda = 1.2$ 行的 $39.9\ {}^{\circ}\mathrm{C}$ 之间——而那一行之所以更低，是因为它把水按**干基**成分折算了。**露点必须按湿基成分计算**，两种约定之间 $17\ \mathrm{K}$ 的差距，恰恰就是本课开头那条警告所描述的错误。
:::
:::

::: history
**对混合物的第一个定量研究**是 **Dalton** 在 **1801–1803** 年完成的，当时他正在测量雪面上水蒸气的压力，并发现大气中总是含有水汽；他的分压定律与"露点是空气的属性、而不是被它润湿的表面的属性"这一发现发表在同一篇论文里。**Gay-Lussac** 的化合体积定律（**1808**）和 **Avogadro** 的假说（**1811**）提供了摩尔的概念，而 **Cannizzaro** **1858** 年的小册子最终让化学界承认 Avogadro 四十七年来一直是对的。**焓湿图**是 **Carrier** 的 **1911** 年之作——那篇论文开创了空调工业；Carrier 当时是 Buffalo Forge 的工程师而非学者，他向美国机械工程师学会提交的是一张图而不是一个理论；**他印出的湿球差表是手算的，准确到 $0.1\ {}^{\circ}\mathrm{F}$**。**Lavoisier 和 Laplace** 在 **1780** 年测出了第一个燃烧焓，而**标准生成焓的约定**由 **G. N. Lewis 和 Merle Randall** 在他们 **1923** 年的《Thermodynamics》一书中确立——那本书还引入了*活度*一词和逸度。**绝热火焰温度**由 **Büringaer** 在 **1889** 年、**Mahle** 在 **1915** 年算出，而**让解离变得可算的平衡常数**来自 **Nernst** **1906** 年的热力学第三定律——这条链条从柏林一个低温量热实验，一直通到汽车尾气里的 $\mathrm{NO_x}$。**Zeldovich 机理**对热力型一氧化氮的描述出自 **Yakov Zeldovich 和合作者 1946–1947 年**的工作，是在**苏联核计划的爆轰物理**背景下完成的，发表在一份没有任何西方燃烧工程师阅读的期刊上，直到 **1970** 年才被译成英文；**这一机理在洁净空气法规需要它之前二十五年就已被知晓**，是应用热力学史上最令人尴尬的事实之一。
:::

## 后续内容

混合物与燃烧是 [[thermodynamics/power-cycles]] 的布雷顿与朗肯数字之下、[[thermodynamics/exergy]] 的化学㶲数字之下的化学层，是 [[heat-transfer]] 每一道炉子问题的边界条件，是 [[propulsion]] 的喷管和 [[aerodynamics]] 高温试验段的入口气体，也是 [[manufacturing]] 的干燥器和 [[energy-systems]] 的锅炉选型所依据的烟气与湿度数据的来源。

::: summary
- 混合物的性质是摩尔分数加权平均，气体常数是 $R_u / \sum y_i M_i$，而每个组分的熵都带一项别的性质都没有的 $-R_u \ln y_i$。
- $\omega = 0.622\, p_v / (P - p_v)$，相对湿度用干球温度下的 $p_{\mathrm{sat}}$，露点是水蒸气分压力下的 $T_{\mathrm{sat}}$——三个不同的温度，两个独立参数。
- 冷却盘管的潜热负荷决定其出口温度，盘管出口 $13\ {}^{\circ}\mathrm{C}$ 时 $3 : 1$ 的显热潜热比是达不到的。
- 奥氏分析是干基的，甲烷的 $\mathrm{CO_2}$ 最大值是 $11.7\ \%$，氧分析仪湿基/干基之差是读数的 $16\ \%$。
- 甲烷的 HHV 与 LHV 相差 $11\ \%$，氢相差 $19\ \%$，每个效率数字都必须写明基准。
- 绝热火焰温度在 $\phi \approx 1.1$ 处达峰值，比无解离值低 $250\ \mathrm{K}$，它是 $\mathrm{NO_x}$ 的约束而不是效率的约束。
- $\phi = 0.37$ 的燃气轮机燃烧室在涡轮机开始工作前就毁掉燃料㶲的 $18.6\ \%$，是全机最大的毁损源。
- 冷凝式省煤器的价值由热网回水温度决定，而不是由换热器决定。
:::

::: quiz
一台燃气锅炉的干烟气分析显示二氧化碳份额非常接近甲烷的 $11.7\ \%$ 最大值。由此可知什么？
- [ ] 过剩空气很大，排烟损失很高
- [x] 过剩空气几乎为零，所以一氧化碳和未燃碳氢很高，烟囱有酸腐蚀之虞
- [ ] 锅炉处于最优效率
- [ ] 助燃空气被预热的
::: solution
$11.7\ \%$ 这个数字是**化学计量**下的最大值，读数接近它意味着 $\lambda \approx 1.0$。真实锅炉跑在 $\lambda = 1.12$ 到 $1.18$，此时干基 $\mathrm{CO_2}$ 为 $9.3$ 到 $10.1\ \%$，因为在化学计量比下混合永远不完美，**$1$ 到 $2\ \%$ 的燃料以一氧化碳和未燃碳氢排出**——这项损失大于省下的排烟损失——同时燃气机组的烟气露点升到 $44\ {}^{\circ}\mathrm{C}$，酸露点也随之上升。**最优是随过剩空气上升的排烟损失与随之下降的未燃损失之间的折中**，两条曲线在 $\lambda = 1.12$ 到 $1.18$ 之间交出一个平坦的极小值。
:::
:::

## 习题

::: exercise 混合物 {level=1 check="0.287"}
求 $M = 28.97$ 的干空气的气体常数，以千焦每千克开尔文计。
::: solution
$R = 8.31446 / 28.97 = 0.287\ \mathrm{kJ / kg \cdot K}$。
:::
:::

::: exercise 湿度 {level=1 check="0.01336"}
求 $30\ {}^{\circ}\mathrm{C}$、相对湿度 $50\ \%$、$101.325\ \mathrm{kPa}$ 下空气的含湿量，$p_{\mathrm{sat}} = 4.247\ \mathrm{kPa}$。
::: solution
$\omega = 0.622 \times 2.1235 / 99.20 = 0.01336\ \mathrm{kg / kg\ da}$。
:::
:::

::: exercise 空燃比 {level=1 check="17.19"}
求甲烷的化学计量质量空燃比。
::: solution
$2 \times 4.76 \times 28.97 / 16.04 = 17.19$。
:::
:::

::: exercise 热值 {level=1 check="1.110"}
求甲烷高位发热量与低位发热量之比。
::: solution
$55{,}530 / 50{,}040 = 1.110$。
:::
:::

::: exercise 二氧化碳 {level=1 check="11.7"}
求甲烷烟气的干基二氧化碳百分比最大值。
::: solution
$100 / (1 + 7.52) = 11.7\ \%$，在化学计量比下。
:::
:::

::: exercise 混合风 {level=2}
$3\ \mathrm{kg / s}$、$\omega = 0.02135$ 的新风与 $9\ \mathrm{kg / s}$、$\omega = 0.00930$ 的回风混合。求混合风的含湿量。
::: solution
$$
\omega_M = \frac{3 \times 0.02135 + 9 \times 0.00930}{12} = \frac{0.06405 + 0.08370}{12} = 0.01231\ \mathrm{kg / kg\ da}
$$
**合理性检验。** 混合状态落在焓湿图上两状态连成的直线上，**从回风到新风全程的四分之一处**，而这个几何表述就是混合准则的全部——这就是焓湿图把等 $\omega$ 线画成直线、工程师拿一把尺就能给混合箱定尺寸的原因。
:::
:::

::: exercise 烟气 {level=2}
一台锅炉的干烟气分析在甲烷工况下读出 $10.2\ \%\ \mathrm{CO_2}$ 和 $2.1\ \%\ \mathrm{O_2}$。求过剩空气比，并判断该分析是否自洽。
::: solution
对甲烷，$\mathrm{C_x H_y}$ 中 $x = 1$，$a_{\mathrm{th}} = 2$：
$$
\frac{\%\, \mathrm{CO_2}}{\%\, \mathrm{O_2}} = \frac{x}{\left( \lambda - 1 \right) a_{\mathrm{th}}} = \frac{1}{2 \left( \lambda - 1 \right)} = \frac{10.2}{2.1} = 4.857
$$
$$
\lambda - 1 = \frac{1}{2 \times 4.857} = 0.103 \quad \Rightarrow \quad \lambda = 1.103
$$
**校核。** 在 $\lambda = 1.103$ 下，干基分析应为
$$
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.103 \times 2 + 3.76 \times 1.103 \times 2} = \frac{100}{10.32} = 9.69\ \%
$$
而读数是 $10.2\ \%$。**该分析并不自洽**——就 $\mathrm{O_2}$ 而言 $\mathrm{CO_2}$ 偏高——常见原因是烟道漏风（漏风加入 $\mathrm{O_2}$ 并稀释 $\mathrm{CO_2}$，会把读数推向**相反**方向）、$\mathrm{CO_2}$ 测量池校准失准，或者燃料**并非**纯甲烷。
**合理性检验。** 天然气是 $85$ 到 $97\ \%$ 的甲烷加乙烷丙烷，后者的 $\mathrm{CO_2}$ 最大值更高（碳为 $15.4\ \%$），所以真实燃气在相同 $\mathrm{O_2}$ 下给出的 $\mathrm{CO_2}$ 略**高于**纯甲烷值——这正是本例偏差的方向，也是锅炉燃烧控制器应当输入燃气的**沃伯指数和成分**、而不是假定甲烷的原因。
:::
:::

::: exercise 推导 {level=3}
由绝热饱和能量衡算导出湿球温度关系式，证明空气—水系统的湿球温度与热力学湿球温度相差在 $0.5\ \mathrm{K}$ 以内，并导出路易斯关系式。
::: solution
**绝热饱和器。** 含湿量为 $\omega_1$、温度为 $T_1$ 的空气流过处于 $T_2$ 的补水槽；气流以 $\omega_2$、$T_2$ 的饱和状态离开，并以 $\dot{m}_w = \dot{m}_a \left( \omega_2 - \omega_1 \right)$ 的速率补入 $T_2$ 的水。无换热、无做功，每千克干空气：
$$
h_1 + \left( \omega_2 - \omega_1 \right) h_f \left( T_2 \right) = h_2
$$
$$
c_p \left( T_1 - T_2 \right) + \omega_1 c_{p,v} \left( T_1 - T_2 \right) = \left( \omega_2 - \omega_1 \right) \left[ h_g \left( T_2 \right) - h_f \left( T_2 \right) \right]
$$
$$
\boxed{ \omega_2 - \omega_1 = \frac{ \left( c_p + \omega_1 c_{p,v} \right) \left( T_1 - T_2 \right) }{ h_{fg} \left( T_2 \right) } }
$$
**湿球温度计。** 处于通风气流中的温度计在 $T_w$ 达到平衡，此时对流得热等于蒸发失热：
$$
h_c \left( T_1 - T_w \right) = h_D \left( \omega_w - \omega_1 \right) h_{fg} \left( T_w \right)
\quad \Rightarrow \quad
\omega_1 = \omega_w - \frac{h_c}{h_D h_{fg}} \left( T_1 - T_w \right)
$$
**路易斯关系式。** 对空气—水蒸气，换热与传质系数之比为
$$
\mathrm{Le} = \frac{h_c}{h_D \rho c_p} = \left( \frac{\mathrm{Sc}}{\mathrm{Pr}} \right)^{2 / 3} = \left( \frac{0.61}{0.71} \right)^{2 / 3} = 0.90^{2 / 3} = 0.934
$$
于是 $h_c / \left( h_D c_{p,m} \right) \approx 1$，湿球线是一条**类焓**量的等值线，
$$
\omega_1 = \omega_w - \frac{c_{p,m}}{h_{fg} \left( T_w \right)} \left( T_1 - T_w \right)
$$
**其形式与绝热饱和结果完全相同。** 两式对比即得两者的重合：**空气—水系统的湿球比 $h_c / \left( h_D c_{p,m} \right)$ 与 1 相差 $6\ \%$**，由此造成的湿球温度与绝热饱和温度之差**在 $0$ 到 $50\ {}^{\circ}\mathrm{C}$ 之间小于 $0.3\ \mathrm{K}$**。
**求值。** 对 $30\ {}^{\circ}\mathrm{C}$、$50\ \%$ 的状态，求解
$$
\omega_1 = 0.01336, \qquad
\omega_{\mathrm{sat}} \left( T_w \right) = 0.01336 + \frac{1.030}{2{,}440} \left( T_w - 30 \right)
$$
逐次试算：$T_w = 22\ {}^{\circ}\mathrm{C}$ 给出 $\omega_{\mathrm{sat}} = 0.01661$，而要求值是 $0.01336 + 1.030 \times \left( - 8 \right) / 2{,}440 = 0.01399$——**太高**，所以 $T_w$ 更低；$T_w = 21.5$ 给出 $0.01587$ 对 $0.01378$；$T_w = 20.5$ 给出 $0.01430$ 对 $0.01336$。**解为 $T_w \approx 20.2\ {}^{\circ}\mathrm{C}$**，而 ASHRAE 焓湿图对同一状态给出 $22.0\ {}^{\circ}\mathrm{C}$。
**这 $1.8\ \mathrm{K}$ 的偏差来自 $c_{p,m} / h_{fg}$ 的线性化**，而必须使用精确关系式的原因是湿球差只有 $8\ \mathrm{K}$，$1.8\ \mathrm{K}$ 的误差就是它的 **$22\ \%$**。**图是对的，手算公式只是一级近似**，这句话本该印在每一张焓湿图上。
**合理性检验。** 路易斯数对空气—水接近 1、对其他蒸气则不然，是因为水蒸气在空气中的热扩散率与质扩散率恰好彼此相差 $10\ \%$ 以内；而这是一份**运气**，因为湿球温度计是全世界用得最多的湿度仪表，它的校准全赖于此。**对丙酮、乙醇或苯，湿球比是 $0.5$ 到 $0.6$，湿球温度不等于绝热饱和温度**——这就是溶剂型涂料的喷雾干燥机不能用湿球温度计控制的原因。
:::
:::

::: exercise 设计 {level=3}
为一台 $60\ \mathrm{MW_{th}}$ 的工业蒸汽锅炉确定燃烧、排放、热回收和仪表的基础方案，该锅炉烧天然气、沼气和氢气的可变混合气，许可限值为 $3\ \%\ \mathrm{O_2}$ 下 $30\ \mathrm{mg / Nm^{3}}$ 的 $\mathrm{NO_x}$。
::: solution
**燃料及其后果。**
$$
\begin{array}{l c c c c}
\text{燃料} & \mathrm{LHV}\ (\mathrm{MJ / Nm^{3}}) & \left( A / F \right)_{\mathrm{vol}} & \mathrm{CO_2}\ \text{最大值}\ \% & T_{\mathrm{flame}} \\
\text{天然气} & 35.9 & 9.52 & 11.7 & 2{,}150\ \mathrm{K} \\
\text{沼气，} 65\ \%\ \mathrm{CH_4} & 23.3 & 6.20 & 10.4 & 2{,}100\ \mathrm{K} \\
\text{氢} & 10.8 & 2.39 & - & 2{,}380\ \mathrm{K} \\
\text{混合气，} 70\ \%\ \text{天然气} + 20\ \%\ \text{沼气} + 10\ \%\ \mathrm{H_2} & 30.6 & 8.16 & 11.0 & 2{,}180\ \mathrm{K}
\end{array}
$$
**怎么读。** **空气需求在整个燃料范围内变化 $30\ \%$**，所以燃烧器的风门必须能在体积气量 **$4 : 1$** 的变化范围内保持 $\lambda = 1.15$——固定孔板的燃气阀组做不到，**按质量流量控制、密度补偿**的燃气阀组做得到。
**氢气的四个后果。**
$$
\begin{array}{l l}
\text{火焰速度} & \text{急剧上升，预混燃烧器可能回火；燃烧器必须按氢份额定级} \\
\text{火焰辐射} & \text{氢火焰暗淡发蓝，火焰探测器的紫外元件必须有热电偶后备} \\
\text{烟气中的水} & \text{上升，露点随之上升，省煤器材质必须复核} \\
\text{热力型 } \mathrm{NO_x} & \text{随火焰温度上升，许可限值才是约束性条件}
\end{array}
$$
**$\mathrm{NO_x}$ 基础。** $3\ \%\ \mathrm{O_2}$ 下的 $30\ \mathrm{mg / Nm^{3}}$ 即 $14.8\ \mathrm{ppm}$，常规贫燃预混燃气燃烧器能做到 **$20$ 到 $30\ \mathrm{ppm}$**——所以限值要求
$$
\begin{array}{l c}
\text{超贫预混加分级配风} & 12\text{–}18\ \mathrm{ppm} \\
\text{烟气再循环 } 15\ \% & 8\text{–}12\ \mathrm{ppm} \\
\text{选择性催化还原（二级）} & 3\text{–}5\ \mathrm{ppm}
\end{array}
$$
**推荐预混加 $15\ \%$ 烟气再循环**，可达 $10\ \mathrm{ppm}$，代价是锅炉出力的 $8\ \%$ 作为再循环烟气风机的功率、排烟温度升高 $60\ \mathrm{K}$。
**热回收。**
$$
\begin{array}{l c c}
\text{回收方案} & \text{排烟温度} & \text{增益} \\
\text{常规省煤器} & 150\ {}^{\circ}\mathrm{C} & 6.5\ \% \\
\text{冷凝式省煤器，} 45\ {}^{\circ}\mathrm{C}\ \text{回水} & 45\ {}^{\circ}\mathrm{C} & 15.5\ \% \\
\text{冷凝式加空气预热器} & 40\ {}^{\circ}\mathrm{C} & 17.8\ \%
\end{array}
$$
**仪表。**
$$
\begin{array}{l l l}
\text{燃气流量} & \text{超声波，在线密度与沃伯指数} & \lambda\ \text{控制依赖它} \\
\text{燃气成分} & \text{在线色谱或由沃伯指数折算} & \text{氢份额必须测知，不能假定} \\
\text{烟气 } \mathrm{O_2} & 0.1\ \%\ \text{氧化锆，加热到露点以上} & \text{湿基/干基之差是 } 16\ \% \\
\text{烟气 } \mathrm{NO_x} & \text{带 } \mathrm{NO_2}\ \text{转换器的认证分析仪} & \text{许可以总 } \mathrm{NO_x}\ \text{计} \\
\text{烟气温度} & \text{冗余配置，在省煤器出口} & \text{低限报警保护酸露点}
\end{array}
$$
**保护买方的四个条款。** **"燃烧器必须燃料灵活，在沃伯指数 $35$ 到 $55\ \mathrm{MJ / Nm^{3}}$ 的整个范围内、氢体积份额高达 $20\ \%$ 时予以保证。"** **"$\mathrm{NO_x}$ 保证须在 $3\ \%\ \mathrm{O_2}$ 下给出，并在沃伯指数的最低值和最高值下验证。"** **"冷凝式省煤器的材质须按烟气硫含量最高 $30\ \mathrm{mg / Nm^{3}}$、冷凝水 pH $3.5$ 选定，并包含中和装置。"** **"控制系统必须由实测的燃气密度和成分计算空气设定值，而不是用固定比值。"**
**设计点评。** 一般规律是：**多燃料锅炉是一个带压力容器的测量与控制项目**；而按纯热输出购买、用纯甲烷测试的锅炉，在第二年烧上波动的沼气时就会许可超标。
:::
:::
