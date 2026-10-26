这是合二为一的两课，连接它们的事实是两课都在**数原子**。第一课说，理想气体混合物表现得好像每个组分单独占满整个容器，于是混合物的性质就是各组分已有性质按摩尔分数的加权平均。第二课说，原子在反应前后守恒，于是火焰就是**一个带放热的质量衡算**，关于它的一切——温度、露点、污染物、㶲——都由这个衡算和这份热推出。

两者之所以属于热力学课而不属于化学课，是因为工程师在每一根管道里遇到混合物、在每一座炉子里遇到燃烧，而这两种情况下难的都不是物理，而是**记账的纪律**：写明基准、把水放在方程的正确一侧、绝不在同一行里混用质量基准和摩尔基准。

::: warning 七种能熬过电厂调试的混合物与燃烧错误
**在同一方程中混用质量基准与摩尔基准。** 摩尔分数给出气体常数、反应计量和化学平衡；质量分数给出以千克计的热容和燃料的热值。用**摩尔**分数乘以按**质量**计的热容，结果会错上组分摩尔质量与混合物摩尔质量之比——对湿空气中的水蒸气是 $18.015 / 28.97 = 0.622$——即 **$38\ \%$** 的误差，而这个比值正是每个湿空气公式里的系数 $0.622$。**对水用表压而不是分压力。** 相对湿度是 $\phi = p_v / p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)$，其中 $p_{\mathrm{sat}}$ 在**干球**温度下取值；**露点**是按**水蒸气分压力**对应的饱和温度。拿干球的饱和压力去查露点，会把 $30\ {}^{\circ}\mathrm{C}$、$50\ \%$ 湿度的空气报成 $30\ {}^{\circ}\mathrm{C}$ 而不是 $18\ {}^{\circ}\mathrm{C}$。**忘了烟气里的水。** 烧甲烷**每摩尔燃料生成两摩尔水**，按化学计量水占湿烟气体积的 $19\ \%$，过剩空气 $15\ \%$ 时占 $17\ \%$。露点计算若忘了它——或用了干基成分——就会漏掉约 $56\ {}^{\circ}\mathrm{C}$ 的露点，以及随之而来、腐蚀无防护烟道的冷凝。**把奥氏分析当成含水的分析。** 奥氏分析的样品在室温下、在水面上采集和测量，水蒸气已经冷凝析出，所以该分析是**干基**的：$\mathrm{CO_2} + \mathrm{O_2} + \mathrm{CO} + \mathrm{N_2}$ 之和按构造就是 $100\ \%$。把干基分析当湿基用、或反过来，过剩空气都会算错。**以为绝热火焰温度是燃料的属性。** 它取决于氧化剂、当量比、压力、进口温度和解离程度。甲烷在空气中按化学计量比燃烧约得 $2{,}225\ \mathrm{K}$（$1{,}950\ {}^{\circ}\mathrm{C}$）；在**氧气**中约 $3{,}050\ \mathrm{K}$；在 $\phi = 1.2$ 时约 $2{,}135\ \mathrm{K}$；反应物预热到 $600\ {}^{\circ}\mathrm{C}$ 时约 $2{,}490\ \mathrm{K}$；而在 $20\ \mathrm{bar}$ 下约**高** $50\ \mathrm{K}$，因为压力抑制了 $\mathrm{CO_2}$ 和 $\mathrm{H_2O}$ 的解离。**配平时把氩混进氮气。** 标准燃烧分析把空气当作 $21\ \%\ \mathrm{O_2}$ 和 $79\ \%\ \mathrm{N_2}$，即每摩尔氧对应 $3.76\ \mathrm{mol\ N_2}$，并使用 $M_{\mathrm{air}} = 28.97$、$R_{\mathrm{air}} = 0.287$。在化学计量里用 $3.76$、气体常数却用 $28.97$，就自相矛盾了 **$0.4\ \%$**——这很小；但在一处用**真实**成分 $79\ \%\ \mathrm{N_2}$、$0.93\ \%\ \mathrm{Ar}$、在另一处又用 $3.76$ 约定，就犯下了一个怎么校核都查不出来的错误。**把高位发热量当成可用能量。** HHV 把产物中水的潜热记了账，而这份潜热只有把烟气冷凝到露点**以下**才收得回来——而水的潜热占甲烷 HHV 的 **$9.9\ \%$**（占 LHV 的 $11\ \%$）。按 LHV 基准 $106\ \%$ 的冷凝式锅炉"效率"，按 HHV 基准就是 $95.5\ \%$，而且是个**正确**的数字；一份不写明基准的规格书就算不上一份规格书。
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
**让混合物成为热力学问题而不只是记账问题的数字**：电厂里的每一个混合过程——空气混入燃料、燃料混入空气、排气混入大气——都带着这个量级的熵产，不过在火焰中，混合项比反应和气体内部传热产生的熵小得多。
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
需迭代求解或从焓湿图上查读；常见室内条件下的一条粗略准则是：**湿球温度大约位于从露点到干球的三分之一处**。
**算一个状态：干球 $30\ {}^{\circ}\mathrm{C}$，相对湿度 $50\ \%$，$101.325\ \mathrm{kPa}$。**
$$
p_{\mathrm{sat}} \left( 30 \right) = 4.247\ \mathrm{kPa}, \qquad p_v = 0.50 \times 4.247 = 2.124\ \mathrm{kPa}
$$
$$
\omega = 0.622 \times \frac{2.124}{101.325 - 2.124} = 0.01331\ \mathrm{kg / kg\ da}
$$
$$
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( 2.124 \right) = 18.4\ {}^{\circ}\mathrm{C}, \qquad
h = 1.005 \times 30 + 0.01331 \left( 2{,}501 + 55.8 \right) = 30.15 + 34.03 = 64.2\ \mathrm{kJ / kg\ da}
$$
**湿球温度是 $22.0\ {}^{\circ}\mathrm{C}$**，三个温度——$30.0$、$22.0$、$18.4$——就是描述该状态的三个数字，而**其中只有两个是独立的**。
**决定盘管尺寸的数字。** 把 $1\ \mathrm{kg / s}$ 的这种空气在 $101.325\ \mathrm{kPa}$ 下冷却到 $12\ {}^{\circ}\mathrm{C}$，此处 $\omega_{\mathrm{sat}} \left( 12 \right) = 0.00873$：
$$
\dot{Q} = 1 \times \left( 64.2 - h_2 \right), \qquad
h_2 = 1.005 \times 12 + 0.00873 \left( 2{,}501 + 22.3 \right) = 12.06 + 22.01 = 34.1
$$
$$
\dot{Q} = 30.1\ \mathrm{kW}, \qquad
\dot{m}_{\mathrm{cond}} = 1 \times \left( 0.01331 - 0.00873 \right) = 4.58\ \mathrm{g / s} = 16.5\ \mathrm{kg / h}
$$
**显热与潜热的拆分。** 显热部分是 $\left( 1.005 + 1.86 \times 0.01331 \right) \times 18 = 18.5\ \mathrm{kW}$，潜热是 $11.6\ \mathrm{kW}$——**潜热占 $38\ \%$**，这个数字使冷却盘管的**表面温度**、而不只是面积，成为设计约束；这也是为什么只把数据中心冷却到干球 $24\ {}^{\circ}\mathrm{C}$ 比冷却到 $24\ {}^{\circ}\mathrm{C}$ **并且**除湿所需的盘管更小。
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
**让蒸发冷却成为设计决策而不是花招的数字。** 直接蒸发冷却沿**等湿球温度**线进行，所以 $35\ {}^{\circ}\mathrm{C}$、$20\ \%$ 湿度的空气（$\omega = 0.00699$，$T_{\mathrm{wb}} = 18.9\ {}^{\circ}\mathrm{C}$）可以冷却到
$$
T_{\mathrm{out}} = 18.9 + \left( 1 - \eta_{\mathrm{evap}} \right) \left( 35 - 18.9 \right)
$$
取蒸发效率 $85\ \%$，得 $21.3\ {}^{\circ}\mathrm{C}$——**用一台风机和一台水泵的功率换来 $13.7\ \mathrm{K}$ 的降温**，只是蒸气压缩式机组所需压缩机功率的一小部分。**代价是水**：$1\ \mathrm{kg / s}$ 的空气约蒸发 $0.0057\ \mathrm{kg / s}$ 的水，每 $\mathrm{MW}$ 冷量每天约用 **$36\ \mathrm{m^{3}}$ 水**，而且只在空气干燥时有效——这就是蒸发冷却在亚利桑那和海湾地区很常见、在新加坡却毫无用处的原因。
**间接级：不加水的冷却。** **间接**蒸发冷却器让送风流过一台换热器，换热器另一侧由向二次风蒸发来冷却，于是送风在**等 $\omega$** 下被冷却到
$$
T_{\mathrm{supply}} = T_{\mathrm{wb}} + \left( 1 - \eta_{\mathrm{IE}} \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right)
$$
取 $\eta_{\mathrm{IE}} = 0.75$、湿球差 $16.1\ \mathrm{K}$，得 $22.9\ {}^{\circ}\mathrm{C}$、$\omega = 0.00699$——**干爽**的冷空气；其后再接一个直接级，可以把空气进一步冷却到原湿球温度以下。
**给冷却塔定罪的数字。** 冷却塔是一种蒸发冷却器，其**目的是水而不是空气**：在 $7\ \mathrm{K}$ 的供回水温差和 $4\ \mathrm{K}$ 的接近端差下排 $1\ \mathrm{MW}$ 热，蒸发量为
$$
\dot{m}_{\mathrm{evap}} = \frac{1{,}000}{2{,}400} = 0.417\ \mathrm{kg / s} = 36\ \mathrm{m^{3} / day\ per\ MW}
$$
再加上排污和漂失。**一座 $1{,}000\ \mathrm{MW_e}$、排热约 $1{,}700\ \mathrm{MW}$ 的蒸汽电厂每小时约蒸发 $2{,}500\ \mathrm{m^{3}}$ 水**——相当于一座几十万人口城市的生活用水——而缺水地区采用干式冷却，原因是**水**，不是碳。
:::

::: widget plot
f: 0.622*(0.5*0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.5*0.61094*exp(17.27*x/(237.3+x))); 0.622*(0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.61094*exp(17.27*x/(237.3+x)))
x: -10, 45
y: 0, 0.07
labels: humidity ratio at 50 per cent RH; humidity ratio at saturation
caption: $101.325\ \mathrm{kPa}$ 下湿空气含湿量随干球温度的变化，分别取相对湿度 $50\ \%$ 和饱和，饱和压力用 Magnus 关联式 $p_{\mathrm{sat}} = 0.61094 \exp \left[ 17.27\, T / \left( 237.3 + T \right) \right]$ 千帕计算，$T$ 以摄氏度计。两条曲线**指数式地发散**，而这个发散正是冷却盘管潜热负荷随室外空气湿度急剧上升的全部原因：在 $20$ 到 $35\ {}^{\circ}\mathrm{C}$ 之间，饱和含湿量从 $0.0147$ 升到 $0.0366$，温度只升高 $15\ \mathrm{K}$，含湿量却增大到 **$2.5$ 倍**。**湿热气候下每一个空调能耗数字，本质上都是对这条曲线的陈述。**
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
\text{氢} & 2.016 & 0.50 & 34.2 & \text{无碳，无 } \mathrm{CO_2} \\
\text{甲烷} & 16.04 & 2.00 & 17.19 & \text{在空气中体积分数 } 9.5\ \%\ \text{即为化学计量} \\
\text{丙烷} & 44.09 & 5.00 & 15.64 & \\
\text{辛烷} & 114.23 & 12.50 & 15.09 & \text{点燃式的基准燃料} \\
\text{柴油，} \mathrm{C_{12}H_{23}} & 167.3 & 17.75 & 14.63 & \\
\text{乙醇} & 46.07 & 3.00 & 8.98 & \text{每千克空气所需燃料体积约为汽油的 } 1.6\ \text{倍} \\
\text{甲醇} & 32.04 & 1.50 & 6.46 & \text{柔性燃料喷油器要做大一号的原因} \\
\text{碳，} \mathrm{C} & 12.01 & 1.00 & 11.5 & \text{煤还另含水分、灰分和氢} \\
\text{一氧化碳} & 28.01 & 0.50 & 2.46 & \text{当它是燃料时，它是燃料气而不是污染物}
\end{array}
$$
**让氢的 $34.2$ 具有误导性的数字。** 按**体积**计，氢每立方米燃料只需 $2.38\ \mathrm{m^{3}}$ 空气，而甲烷要 $9.52$，所以在化学计量混合气中氢占 $1 / 3.38 = 30\ \%$ 的体积：**进气道喷射**的氢发动机用燃料挤掉了近三分之一的进气，损失了功率密度——这是氢直喷存在的原因之一。
**过剩空气与当量比的约定。**
$$
\%\ \text{过剩空气} = \left( \lambda - 1 \right) \times 100, \qquad
\phi = 1.0\ \text{化学计量}, \quad \phi > 1\ \text{富燃}, \quad \phi < 1\ \text{贫燃}
$$
**决定汽油机工作窗口的数字。** 三效催化器只在 $\phi = 1$ 附近约 $\pm 0.5\ \%$ 的窗口内工作，全靠氧传感器的阶跃信号把它钉在那里。柴油机部分负荷跑在 $\phi = 0.2$ 到 $0.4$，工业燃气轮机跑在 $\phi = 0.3$ 到 $0.5$ 以把火焰温度压在 $\mathrm{NO_x}$ 门槛之下，而工业炉跑在 $\lambda = 1.15$ 到 $1.30$，因为再少就燃烧不完全、再多就是排烟损失。
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
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.2 \times 2 + 3.76 \times 1.2 \times 2} = \frac{100}{10.424} = 9.59\ \%, \qquad
\%\, \mathrm{O_2} = \frac{40}{10.424} = 3.84\ \%
$$
**$\mathrm{CO_2}$ 的最大值**在 $\lambda = 1$ 处，为 $100 / \left( 1 + 7.52 \right) = 11.7\ \%$——**这个数字就是烟气监测仪校准的全部**：燃甲烷锅炉上 $9.59\ \%$ 的 $\mathrm{CO_2}$ 读数意味着 $\lambda = 1.20$，$11.0\ \%$ 的读数意味着 $\lambda = 1.06$。
**让 $\mathrm{O_2}$ 读数成为有用读数的数字。** 因为 $\mathrm{CO_2}$ 的最大值随燃料而异（甲烷 $11.7\ \%$、辛烷 $14.5\ \%$、碳 $21.0\ \%$），基于 $\mathrm{CO_2}$ 的过剩空气数必须知道燃料；而 **$\mathrm{O_2}$** 数在一阶近似下不需要，这就是现代燃烧器都按 $\mathrm{O_2}$ 控制、再算出 $\mathrm{CO_2}$ 的原因。
**总被忘掉的修正。** 氧化锆或顺磁式 $\mathrm{O_2}$ 分析仪按**湿基**还是**干基**读数，取决于它是否被加热到露点以上，燃气锅炉在 $\lambda = 1.2$ 时两者之差为
$$
\%\, \mathrm{O_{2,\mathrm{wet}}} = \%\, \mathrm{O_{2,\mathrm{dry}}} \times \frac{10.424}{10.424 + 2} = 3.84 \times 0.839 = 3.22\ \%
$$
**$3.8\ \%$ 读数上的 $0.62$ 个百分点误差就是 $16\ \%$**，混淆两种基准是锅炉燃烧控制回路里的常见错误。
**锅炉该跑多大过剩空气，代价几何。**
$$
\begin{array}{l c c c c}
\lambda & \%\, \mathrm{O_{2,dry}} & \text{排烟损失}\ \left( \text{高于空气 } 150\ \mathrm{K} \right) & \text{未燃损失（示意）} & \text{合计} \\
1.05 & 1.1 & 6.4\ \% & 1.2\ \% & 7.6\ \% \\
1.10 & 2.1 & 6.7\ \% & 0.6\ \% & 7.3\ \% \\
1.15 & 3.0 & 6.9\ \% & 0.3\ \% & 7.2\ \% \\
1.20 & 3.8\ \text{（湿基 } 3.2\text{）} & 7.2\ \% & 0.2\ \% & 7.4\ \% \\
1.30 & 5.3 & 7.7\ \% & 0.15\ \% & 7.9\ \% \\
1.50 & 7.6 & 8.8\ \% & 0.1\ \% & 8.9\ \%
\end{array}
$$
**最优值是 $\lambda = 1.10$ 到 $1.15$**，而曲线在约 $1.05$ 到 $1.25$ 之间是**平**的——这就是燃烧器从 $1.30$ 调到 $1.15$ 约能省 **$0.7\ \%$** 的燃料、而从 $1.15$ 调到 $1.05$ 反而因未燃损失**亏**约 $0.4\ \%$ 的原因。
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
\mathrm{O_2}、\ \mathrm{N_2}、\ \mathrm{H_2}、\ \mathrm{C\ (s)} & 0 & \mathrm{OH} & + 38{,}990
\end{array}
$$
**热值，以及把它们分开的 $11\ \%$。** 对甲烷，$M = 16.04$：
$$
\mathrm{HHV} = \frac{285{,}830 \times 2 + 393{,}520 - 74{,}850}{16.04} = \frac{890{,}330}{16.04} = 55{,}510\ \mathrm{kJ / kg}
$$
$$
\mathrm{LHV} = \mathrm{HHV} - \frac{y}{2} \times \frac{44{,}010}{M}
= 55{,}510 - \frac{2 \times 44{,}010}{16.04} = 55{,}510 - 5{,}490 = 50{,}020\ \mathrm{kJ / kg}
$$
**比值 $\mathrm{HHV} / \mathrm{LHV}$，锅炉规格书就系于这个数字。**
$$
\begin{array}{l c c c}
\text{甲烷} & 1.110 & \text{辛烷} & 1.075 \\
\text{氢} & 1.183 & \text{烟煤} & \approx 1.04 \\
\text{丙烷} & 1.086 & \text{干木柴} & \approx 1.08 \\
\text{乙醇} & 1.107 & \text{重质燃料油} & \approx 1.06
\end{array}
$$
**规律。** 比值随燃料的**氢含量**上升，氢的 $1.183$ 就是同一台燃氢锅炉按 LHV 基准的"效率"看起来比按 HHV 基准高 $18\ \%$ 的原因。
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
T_{\mathrm{ad}} \approx 2{,}330\ \mathrm{K}\ \text{无解离时}, \qquad
T_{\mathrm{ad}} \approx 2{,}225\ \mathrm{K}\ \text{计入平衡时}
$$
**这 $100\ \mathrm{K}$ 就是解离**，而且它不是细枝末节：在 $2{,}225\ \mathrm{K}$ 下，平衡留下约 **$9\ \%$** 的碳以 CO 形式存在、约 **$2\ \%$** 的氢以 $\mathrm{H_2}$ 形式存在，另有一些 OH、O、H 和 NO，锁在这些组分里的焓就是那 $100\ \mathrm{K}$。
**让火焰温度成为设计约束而不是奇闻的数字。**
$$
\begin{array}{l c}
\text{甲烷在空气中，化学计量} & 2{,}225\ \mathrm{K} \\
\text{甲烷在氧气中} & 3{,}050\ \mathrm{K} \\
\text{甲烷在空气中，} \phi = 1.2 & 2{,}135\ \mathrm{K} \\
\text{甲烷在空气中，} \phi = 0.8 & 2{,}000\ \mathrm{K} \\
\text{甲烷在空气中，进口预热到 } 600\ \mathrm{K} & 2{,}370\ \mathrm{K} \\
\text{甲烷在 } 20\ \mathrm{bar}\text{，化学计量空气} & 2{,}280\ \mathrm{K} \\
\text{氢在空气中，化学计量} & 2{,}380\ \mathrm{K} \\
\text{甲烷在空气中，} \phi = 0.35 & 1{,}170\ \mathrm{K}
\end{array}
$$
（除注明外，均为 $298\ \mathrm{K}$、$1\ \mathrm{atm}$ 反应物的平衡值。）**怎么读。** **峰值在 $\phi \approx 1.05$，不在 $\phi = 1$**，因为稍富时产物的热容更小、解离也更少；**每预热一开尔文，火焰温度约升高 $0.5\ \mathrm{K}$**，这就是空气预热到 $1{,}100\ {}^{\circ}\mathrm{C}$ 的蓄热式燃烧器火焰接近 $2{,}700\ \mathrm{K}$ 的原因；而**压力使其略为升高**，因为它抑制了解离。
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
\mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{CO_2} & + 6.63 & \text{大部分完成} \\
\mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{H_2O} & + 8.15 & \text{大部分完成} \\
\tfrac{1}{2} \mathrm{N_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{NO} & - 3.97 & \text{约 } 650\ \mathrm{ppm\ NO} \\
\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} & - 6.63 & 3\ \%\ \text{解离} \\
\mathrm{H_2O} \rightleftharpoons \mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} & - 8.15 & 0.7\ \%\ \text{解离}
\end{array}
$$
（$\ln K_p$ 取 $2{,}000\ \mathrm{K}$ 下的值；"含义"一栏指化学计量甲烷—空气产物保持在 $2{,}000\ \mathrm{K}$、$1\ \mathrm{atm}$ 时的情形。）
**让 $\mathrm{NO_x}$ 成为动力学问题而不是平衡问题的数字。** 化学计量甲烷—空气产物在 $2{,}225\ \mathrm{K}$ 火焰温度下的平衡 $\mathrm{NO}$ 约为 **$1{,}900\ \mathrm{ppm}$**，$\phi = 0.8$ 时约 $3{,}000\ \mathrm{ppm}$——而贫燃预混燃气轮机燃烧室出口只有 **$10$ 到 $25\ \mathrm{ppm}$**，柴油机为几百 ppm。**Zeldovich 机理受速率限制，不受平衡限制**：$\mathrm{N \equiv N}$ 键的 $945\ \mathrm{kJ / mol}$ 使第一步 $\mathrm{O} + \mathrm{N_2} \to \mathrm{NO} + \mathrm{N}$ 慢到在燃气处于火焰温度的几毫秒内 NO 远达不到平衡，而燃气一冷却，已生成的 NO 就被冻结。初始生成速率约为
$$
\frac{d \left[ \mathrm{NO} \right]}{d t} = \frac{6 \times 10^{16}}{T^{1/2}} \exp \left( - \frac{69{,}090}{T} \right) \left[ \mathrm{O_2} \right]_e^{1/2} \left[ \mathrm{N_2} \right]_e \quad \mathrm{mol / cm^{3} \cdot s}
$$
其中 $T$ 以开尔文计，浓度以 $\mathrm{mol / cm^{3}}$ 计。
**指数的咬噬。** 火焰温度从 $2{,}150$ 降到 $2{,}050\ \mathrm{K}$，在浓度不变时该速率的下降倍数为
$$
\sqrt{\frac{2{,}150}{2{,}050}}\, \exp \left[ 69{,}090 \left( \frac{1}{2{,}050} - \frac{1}{2{,}150} \right) \right]
= 1.024 \times \exp \left( 1.568 \right) = 4.9
$$
——**约五倍**，这就是**贫燃预混燃烧**针对**峰值温度**及其停留时间下手、以及**峰值**降几十开尔文比平均值降得更多还值钱的原因。
**烟气露点，决定锅炉选材的数字。**
$$
\begin{array}{l c c}
\text{燃料与过剩空气} & \text{水分压} & \text{露点} \\
\text{甲烷，} \lambda = 1.0 & 19.3\ \mathrm{kPa} & 59.2\ {}^{\circ}\mathrm{C} \\
\text{甲烷，} \lambda = 1.2 & 16.3\ \mathrm{kPa} & 55.7\ {}^{\circ}\mathrm{C} \\
\text{甲烷，} \lambda = 2.0 & 10.1\ \mathrm{kPa} & 46.0\ {}^{\circ}\mathrm{C} \\
\text{天然气，} \lambda = 1.15 & 16.7\ \mathrm{kPa} & 56.2\ {}^{\circ}\mathrm{C} \\
\text{重质燃料油，} \lambda = 1.15 & 10.0\ \mathrm{kPa} & 45.8\ {}^{\circ}\mathrm{C} \\
\text{烟煤（含水 } 8\ \%\text{），} \lambda = 1.2 & 6.7\ \mathrm{kPa} & 38.2\ {}^{\circ}\mathrm{C}
\end{array}
$$
**酸露点，一个不同且高得多的数字。** 燃料含硫 $1\ \%$ 时生成的 $\mathrm{SO_3}$ 形成硫酸雾，其露点为
$$
T_{\mathrm{acid}} \approx 120\text{–}155\ {}^{\circ}\mathrm{C}\ \text{（煤和重油）}
$$
**这就是燃煤或燃油锅炉的烟气不冷却到约 $130$ 至 $150\ {}^{\circ}\mathrm{C}$ 以下的原因**，也是燃高硫重油的船用发动机需要高碱值气缸油来中和酸的原因。
**限制冷凝式锅炉的数字。** 冷凝式锅炉回收潜热**并**把烟气冷却到 $45\ {}^{\circ}\mathrm{C}$，但只有**回水低于约 $55\ {}^{\circ}\mathrm{C}$ 的露点**时才能做到——而按 $80 / 70\ {}^{\circ}\mathrm{C}$ 散热器设计的既有建筑在采暖季的大部分时间回水都高于它，于是锅炉只在部分时间冷凝，其季节效率比样本上的 $106\ \%$（LHV）低好几个百分点。**真正要紧的改造是散热器面积，不是锅炉。**
:::

::: widget plot
f: 4833.7*pow(x,6) - 40361.2*pow(x,5) + 135994.6*pow(x,4) - 234504.2*pow(x,3) + 215024.2*pow(x,2) - 97439.2*x + 18664.9
x: 0.6, 2.0
y: 1400, 2400
labels: adiabatic flame temperature K, with equilibrium dissociation
caption: 甲烷在空气中从 $298\ \mathrm{K}$、$1\ \mathrm{atm}$ 燃烧、计入平衡解离的等压绝热火焰温度随当量比 $\phi$ 的变化（对平衡计算结果的多项式拟合，误差约 $15\ \mathrm{K}$ 以内）。曲线在贫燃侧陡升，因为多余的空气吸走了热；在 $\phi \approx 1.05$ 处达到约 $2{,}230\ \mathrm{K}$ 的峰值；在富燃侧下降，因为部分燃料能量以 CO 和 $\mathrm{H_2}$ 的形式未被释放。**贫燃预混燃气轮机燃烧室跑在 $\phi \approx 0.6$ 附近**——接受比峰值低约 **$550\ \mathrm{K}$** 的火焰，把热力型 $\mathrm{NO_x}$ 削减几个数量级。
:::

## 算例

::: example 一项空调负荷 {#ex-ac}
一间办公室需要 $120\ \mathrm{kW}$ 显热冷却和 $40\ \mathrm{kW}$ 潜热冷却。室外空气 $35\ {}^{\circ}\mathrm{C}$、相对湿度 $60\ \%$；室内保持 $24\ {}^{\circ}\mathrm{C}$、$50\ \%$；送风以 $13\ {}^{\circ}\mathrm{C}$ 离开盘管；送风中 $25\ \%$ 是新风、其余回风循环。求风量、盘管负荷和冷水机组的电耗。
::: solution
**各状态。**
$$
\begin{array}{l c c c c}
& T_{\mathrm{db}} & \phi & \omega & h \\
\text{O（室外）} & 35 & 0.60 & 0.02145 & 90.2 \\
\text{R（室内）} & 24 & 0.50 & 0.00930 & 47.8 \\
\text{C（盘管出口，饱和）} & 13 & 1.00 & 0.00933 & 36.6 \\
\text{M（混合）} & 26.75 & - & 0.01234 & 58.4
\end{array}
$$
**送风量，由显热负荷求出。**
$$
\dot{m}_a = \frac{\dot{Q}_s}{c_{p,m} \left( T_R - T_C \right)}
= \frac{120}{\left( 1.005 + 1.86 \times 0.0093 \right) \times \left( 24 - 13 \right)}
= \frac{120}{11.25} = 10.67\ \mathrm{kg\ da / s}
$$
**用潜热负荷校核。**
$$
\dot{Q}_l = 10.67 \times \left( 0.00930 - 0.00933 \right) \times 2{,}501 = - 0.9\ \mathrm{kW}
$$
**盘管出口含湿量 $0.00933$ 高于室内的**，所以以 $13\ {}^{\circ}\mathrm{C}$ 饱和状态离开的盘管无论多大风量都吸收不了潜热负荷——所需的送风含湿量由潜热要求反求：
$$
\omega_C = \omega_R - \frac{\dot{Q}_l}{\dot{m}_a \times 2{,}501}
= 0.00930 - \frac{40}{10.67 \times 2{,}501} = 0.00930 - 0.00150 = 0.00780
$$
**盘管出口温度**是 $\omega = 0.00780$ 对应的饱和温度，即 $T_{\mathrm{sat}} \left( 1.255\ \mathrm{kPa} \right) = 10.3\ {}^{\circ}\mathrm{C}$。
**这逼出来的设计决策。** 盘管必须把空气冷却到 $10.3\ {}^{\circ}\mathrm{C}$ 才能除湿，这需要约 $5\ {}^{\circ}\mathrm{C}$ 的冷冻水供水；随后要么以 $10.3\ {}^{\circ}\mathrm{C}$ 送风、相应减小风量，要么再热到 $13\ {}^{\circ}\mathrm{C}$——约 $29\ \mathrm{kW}$，应当取自回收的冷凝器热量而不是新增能量。**显热比为 $0.75$ 是硬约束，而它由建筑决定，不由机房决定。** 本例以下保持 $10.67\ \mathrm{kg / s}$ 送风加再热。
**盘管负荷，按修正后的状态**（$10.3\ {}^{\circ}\mathrm{C}$ 饱和，$h_C = 30.0$）。
$$
\dot{Q}_{\mathrm{coil}} = 10.67 \times \left( h_M - h_C \right)
= 10.67 \times \left( 58.4 - 30.0 \right) = 302.6\ \mathrm{kW}
$$
**冷凝水量。**
$$
\dot{m}_w = 10.67 \times \left( 0.01234 - 0.00780 \right) = 0.0484\ \mathrm{kg / s} = 174\ \mathrm{kg / h}
$$
**冷水机组的电耗。** 水冷机组 $\mathrm{COP}$ 取 $5.4$，水泵风机另计：
$$
\dot{W}_{\mathrm{chiller}} = \frac{302.6}{5.4} = 56.0\ \mathrm{kW}
$$
**水泵。** $6\ \mathrm{K}$ 温升下冷冻水量为 $302.6 / \left( 4.19 \times 6 \right) = 12.04\ \mathrm{kg / s} = 0.0120\ \mathrm{m^{3} / s}$，取水泵扬程 $250\ \mathrm{kPa}$、泵与电机效率 $0.70$：
$$
\dot{W}_{\mathrm{pumps}} = \frac{0.0120 \times 250}{0.70} = 4.3\ \mathrm{kW}
$$
**风机。** 送风体积流量 $10.67 / 1.18 = 9.04\ \mathrm{m^{3} / s}$，盘管、过滤器、风管和新风口的总压 $550\ \mathrm{Pa}$，风机与电机效率 $0.65$：
$$
\dot{W}_{\mathrm{fans}} = \frac{9.04 \times 550}{0.65 \times 1000} = 7.7\ \mathrm{kW}
$$
$$
\dot{W}_{\mathrm{total}} = 56.0 + 4.3 + 7.7 = 68.0\ \mathrm{kW}, \qquad
\mathrm{COP}_{\mathrm{plant}} = \frac{120 + 40}{68.0} = 2.35
$$
**怎么读。** **机组用 $68.0\ \mathrm{kW}$ 的电供出 $160\ \mathrm{kW}$ 的室内冷量——机组 COP 为 $2.35$，而冷水机组铭牌是 $5.4$**——这 $2.3$ 倍差距的大部分在于盘管要除去 $303\ \mathrm{kW}$ 才能向室内交出 $160\ \mathrm{kW}$，其余是水泵和风机。**铭牌上的数字是 $5.4$，建筑付账的数字是 $2.35$。**
**合理性检验。** 室外空气负荷之所以大，是因为 $2.67\ \mathrm{kg / s}$ 焓值 $h = 90.2$ 的新风对照室内的 $47.8$ 携带着
$$
2.67 \times \left( 90.2 - 47.8 \right) = 113.2\ \mathrm{kW}
$$
**用 $25\ \%$ 的风带来盘管负荷的 $37\ \%$**——这就是办公空调规格书常对新风配**能量回收**的原因：有效度 $75\ \%$ 的全热回收转轮约值 **$85\ \mathrm{kW}$** 盘管负荷，代价是多一些风机压头。
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
**烟气。** 每千摩尔燃料湿烟气 $11.948\ \mathrm{kmol}$、干烟气 $9.948\ \mathrm{kmol}$。
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100}{9.948} = 10.05\ \%, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{30}{9.948} = 3.02\ \%
$$
**排烟损失，按 LHV 基准。** 取 $20$ 到 $160\ {}^{\circ}\mathrm{C}$ 的平均比热：
$$
\begin{array}{l c c c}
\mathrm{CO_2} & 1\ \mathrm{kmol} & 39.8\ \mathrm{kJ / kmol \cdot K} & 5{,}573\ \mathrm{kJ} \\
\mathrm{H_2O} & 2\ \mathrm{kmol} & 34.0 & 9{,}522 \\
\mathrm{O_2} & 0.3\ \mathrm{kmol} & 29.8 & 1{,}253 \\
\mathrm{N_2} & 8.648\ \mathrm{kmol} & 29.2 & 35{,}388 \\
\hline
& & & 51{,}737\ \mathrm{kJ\ per\ kmol\ fuel}
\end{array}
$$
$$
\eta_{\mathrm{stack}} = \frac{51{,}737}{802{,}310} = 6.45\ \%
$$
**毛效率。**
$$
\eta_{\mathrm{LHV}} = 100 - 6.45 - 0.4\ \left( \text{未燃与散热} \right) = 93.2\ \%
$$
**而按 HHV 基准为**
$$
\eta_{\mathrm{HHV}} = 93.2 \times \frac{50{,}020}{55{,}510} = 83.9\ \%
$$
**这 $9.3$ 个百分点的差就是水的潜热**，两个数字说的是同一台锅炉。
**冷凝工况。** 在 $40\ {}^{\circ}\mathrm{C}$ 下烟气只能容纳 $p_{\mathrm{sat}} = 7.38\ \mathrm{kPa}$ 的水蒸气，于是对 $9.948\ \mathrm{kmol}$ 干烟气，剩余蒸气为
$$
n_v = 9.948 \times \frac{7.38}{101.325 - 7.38} = 0.78\ \mathrm{kmol}, \qquad
\text{冷凝量} = 2 - 0.78 = 1.22\ \mathrm{kmol}
$$
**$40\ {}^{\circ}\mathrm{C}$ 排烟时的损失**，按 LHV 基准（以水蒸气为参考），相对 $20\ {}^{\circ}\mathrm{C}$ 的空气：
$$
\text{显热：干烟气及全部水按蒸气计，} 20 \to 40\ {}^{\circ}\mathrm{C}: 7{,}298\ \mathrm{kJ}, \qquad
\text{散热与未燃： } 0.004 \times 802{,}310 = 3{,}209\ \mathrm{kJ}
$$
$$
\text{回收的潜热： } 1.22 \times 44{,}010 = 53{,}602\ \mathrm{kJ}
$$
$$
\eta_{\mathrm{LHV}} = 1 - \frac{7{,}298 + 3{,}209 - 53{,}602}{802{,}310} = 1 + \frac{43{,}095}{802{,}310} = 105.4\ \%
$$
**而按 HHV 基准**，水的潜热记在燃料数字之内：
$$
\eta_{\mathrm{HHV}} = 105.4 \times \frac{50{,}020}{55{,}510} = 95.0\ \%
$$
**冷凝式锅炉按 HHV 是 $95.0\ \%$、按 LHV 是 $105.4\ \%$**，而 $105.4\ \%$ 是合法的，因为 LHV 没有把锅炉收回的 $53.6\ \mathrm{MJ}$ 潜热算进分母。
**决定这项改造的数字。** 多回收的是 $105.4 - 93.2 = 12.2$ 个 LHV 百分点，即每千克燃气约 **$6{,}100\ \mathrm{kJ}$**，同样供热下燃料减少 $1 - 93.2 / 105.4 = 11.6\ \%$。一台 $10\ \mathrm{MW}$ 锅炉年运行 $8{,}000$ 小时，每年约省 **$10{,}000\ \mathrm{MWh}$** 燃气。**约束是回水温度**，它必须远低于 $56\ {}^{\circ}\mathrm{C}$ 的露点，换热器才能冷凝出大量的水。
**合理性检验。** 非冷凝工况按 LHV 是 $93.2\ \%$、按 HHV 是 $83.9\ \%$，差额来自 $11\ \%$ 的潜热；冷凝式锅炉的 LHV 数字之所以超过 $100\ \%$，是因为 LHV 是一个**更小的分母**，而不是能量被创造出来。**本例中每一个效率数字都是正确的，而不写基准的数字毫无意义**——欧洲生态设计规则和美国 AFUE 评级都用高位（HHV）基准，而许多欧洲产品样本报的是低位（LHV）。
:::
:::

::: example 燃气轮机燃烧室 {#ex-gtcomb}
一台燃气轮机燃烧室接收 $728\ \mathrm{K}$、$1.35\ \mathrm{MPa}$ 的空气，以甲烷为燃料输出 $1{,}690\ \mathrm{K}$ 的燃气。求每千克空气的燃料量、当量比、出口 $\mathrm{NO_x}$ 倾向和燃烧室的㶲毁损。
::: solution
**每千克空气的能量衡算。**
$$
\dot{m}_f \times \mathrm{LHV} = \left( 1 + \dot{m}_f \right) c_{p,g} \left( T_3 - T_2 \right)
$$
取燃气在 $728$ 到 $1{,}690\ \mathrm{K}$ 间的平均比热 $c_{p,g} = 1.26\ \mathrm{kJ / kg \cdot K}$、$\mathrm{LHV} = 50{,}020\ \mathrm{kJ / kg}$：
$$
\dot{m}_f \times 50{,}020 = \left( 1 + \dot{m}_f \right) \times 1.26 \times 962
\quad \Rightarrow \quad
\dot{m}_f = \frac{1{,}212}{48{,}808} = 0.0248\ \mathrm{kg\ fuel / kg\ air}
$$
（燃料以 $298\ \mathrm{K}$ 进入的平衡计算给出 $0.0250$。）
**当量比。** 甲烷的化学计量空燃比是 $17.19$，于是
$$
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}} = \frac{0.0248}{1 / 17.19} = 0.0248 \times 17.19 = 0.43
$$
**燃烧室总体跑在 $\phi = 0.43$，即 $133\ \%$ 的过剩空气**——因为涡轮承受不了更热的燃气，所以燃烧室总体上是贫燃的：常规燃烧室里火焰在接近化学计量的**主燃区**燃烧、下游再加入**掺混空气**；干式低 $\mathrm{NO_x}$ 燃烧室则把大部分空气与燃料预混后贫燃。
**让掺混区成为设计难题的数字。** 接近化学计量的主燃区在这样的预热下可达约 $2{,}500\ \mathrm{K}$，按 Zeldovich 速率生成 $\mathrm{NO}$，所以掺混空气必须迅速——在几毫秒内——混入以停止生成。**混合方式可以让 $\mathrm{NO_x}$ 差出数倍，而效率几乎不受影响**——这就是燃烧室研发主要是气动、混合与声学问题，而不是热力学问题的原因。
**出口成分。** $\phi = 0.43$ 时，每千摩尔甲烷的产物为 $1\ \mathrm{CO_2} + 2\ \mathrm{H_2O} + 2.67\ \mathrm{O_2} + 17.5\ \mathrm{N_2}$，即
$$
\%\, \mathrm{CO_2} = 4.3, \quad \%\, \mathrm{O_2} = 11.4, \quad \%\, \mathrm{H_2O} = 8.6, \quad \%\, \mathrm{N_2} = 75.6
$$
**平衡 $\mathrm{NO}$** 在 $1{,}690\ \mathrm{K}$、这种富氧燃气中约为 $2{,}000\ \mathrm{ppm}$，而现代干式低 $\mathrm{NO_x}$ 燃烧室出口只有约 **$9$ 到 $25\ \mathrm{ppm}$**（折算到 $15\ \%\ \mathrm{O_2}$）——决定它的是动力学而不是平衡，是**峰值火焰温度**和停留时间。
**㶲毁损。** 燃烧室的不可逆性以反应和混合为主：
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{prod}} N \bar{s} - \sum_{\mathrm{react}} N \bar{s} - \frac{\dot{Q}}{T_b} \quad \left( \dot{Q} = 0,\ \text{绝热} \right)
$$
甲烷以化学计量空气从 $298\ \mathrm{K}$ 绝热燃烧，每千摩尔燃料的熵产约为 $790\ \mathrm{kJ / K}$；空气为 $728\ \mathrm{K}$、$1.35\ \mathrm{MPa}$、$\phi = 0.43$ 时约为 **$780\ \mathrm{kJ / K}$**（平衡计算）：
$$
\dot{X}_{\mathrm{dest}} = 298.15 \times 782 = 233{,}000\ \mathrm{kJ\ per\ kmol\ fuel}
$$
对照燃料㶲 $831{,}650\ \mathrm{kJ / kmol}$——**燃料㶲的 $28\ \%$ 光在燃烧室里就被毁掉了**，涡轮机还没看到它。
**怎么读。** **燃烧室是燃气轮机里最大的单一㶲毁损源**，而减少它的办法不是更好的火焰筒，而是**更热的反应物和更热的产物**——更高的压气机出口温度和更高的燃烧温度，这正是历代燃气轮机走过的方向——或者干脆不燃烧燃料。
**合理性检验。** 燃烧室之所以毁掉超过四分之一的燃料㶲，是因为它靠一场**不受约束的化学反应**释放化学能，并把它降格为不到 $1{,}700\ \mathrm{K}$ 的热，而任何不受约束的过程都像自由膨胀一样不可逆。**燃料电池是另一条路**：它把一部分化学能直接变成电，高温燃料电池的发电效率可达约 $60\ \%$。
:::
:::

::: example 烟气露点与冷凝式改造 {#ex-dewpoint}
一台 $5\ \mathrm{MW}$ 燃气锅炉目前以 $180\ {}^{\circ}\mathrm{C}$ 排烟，拟加装冷凝式省煤器。热网回水 $58\ {}^{\circ}\mathrm{C}$。评估回收量、材料和风险。
::: solution
**烟气。** 甲烷、$\lambda = 1.15$：每千摩尔燃料湿烟气 $11.948\ \mathrm{kmol}$，其中水 $2\ \mathrm{kmol}$。
$$
p_{\mathrm{H_2O}} = \frac{2}{11.948} \times 101.325 = 16.96\ \mathrm{kPa} \quad \Rightarrow \quad
T_{\mathrm{dp}} = 56.5\ {}^{\circ}\mathrm{C}
$$
**怎么读。** **$58\ {}^{\circ}\mathrm{C}$ 的回水高于 $56.5\ {}^{\circ}\mathrm{C}$ 的露点**——省煤器几乎冷凝不了，回收的只有显热。
**回水 $58\ {}^{\circ}\mathrm{C}$ 时的回收量。** 锅炉效率 $93.2\ \%$（LHV），耗燃料 $5{,}000 / 0.932 = 5{,}370\ \mathrm{kW}$，即 $5{,}370 / 802{,}310 = 0.00669\ \mathrm{kmol / s}$ 甲烷。把烟气（锅炉算例的产物，每千摩尔燃料约 $370\ \mathrm{kJ / K}$）从 $180$ 冷却到 $65\ {}^{\circ}\mathrm{C}$：
$$
\dot{Q} = 0.00669 \times 42{,}790 = 286\ \mathrm{kW}
$$
**回水降到 $40\ {}^{\circ}\mathrm{C}$ 时的回收量。** 把烟气进一步冷却到 $45\ {}^{\circ}\mathrm{C}$，此时烟气只能容纳 $1.04\ \mathrm{kmol}$ 蒸气，$2\ \mathrm{kmol}$ 水中冷凝 $0.96\ \mathrm{kmol}$：
$$
\dot{Q} = 286 + 0.00669 \times \left( 7{,}340 + 0.96 \times 44{,}010 \right) = 286 + 332 = 618\ \mathrm{kW}
$$
**多回收的 $332\ \mathrm{kW}$ 使省煤器的价值翻了一倍多**，而要求回水温度下降 **$18\ \mathrm{K}$**，这又要求**热网上的建筑增加散热末端面积**。
**材料。** 燃气烟道的冷凝水 pH 为 **$3.5$ 到 $4.5$**（碳酸，加上 $\mathrm{NO_x}$ 带来的硝酸），**对碳钢和砖都有侵蚀性**。可选项：
$$
\begin{array}{l l c}
\text{不锈钢 316L} & \text{标准选材，但氯化物超过 } 200\ \mathrm{mg / l} \text{ 会点蚀} & 1.0 \\
\text{铸造铝硅合金} & \text{家用冷凝锅炉常用；要求冷凝水 pH 高于约 } 4 & 0.8 \\
\text{聚合物（PP、PPSU、氟聚合物）} & \text{用于烟道部件和小型机组，受温度限制} & 1.4 \\
\text{玻璃或搪瓷管} & \text{耐酸但脆弱} & 2.2
\end{array}
$$
**冷凝水必须中和**——在 $40\ {}^{\circ}\mathrm{C}$ 回水下，这台 $5\ \mathrm{MW}$ 锅炉冷凝 $0.00669 \times 0.96 \times 18.0 = 0.116\ \mathrm{kg / s}$，每天约 **$10\ \mathrm{m^{3}}$** 酸性冷凝水，不得未经处理排入铜质或铸铁排水管。
**宣传册上永远不会写的风险。** 冷凝式省煤器**把烟气冷却到燃料中任何硫的酸露点以下**。管道天然气每立方米只含几毫克硫，主要来自加臭剂；**改烧硫含量波动的沼气或填埋气的锅炉可能析出硫酸**，连不锈钢换热器也会很快被腐蚀。**规格书必须写明燃料的硫上限，并且燃料供应商必须在合同上受其约束。**
**决定项目的数字。** 在现有回水温度下，省煤器的回收量约值锅炉燃料的 **$5\ \%$**（$286 / 5{,}370$），在 $40\ {}^{\circ}\mathrm{C}$ 回水下约值 **$11.5\ \%$**（$618 / 5{,}370$）。**这个项目是一个披着换热器采购合同外衣的热网温度项目**，而没做末端调研就批准它的人，买回来的是一台 $290\ \mathrm{kW}$ 的换热器，而不是一台 $620\ \mathrm{kW}$ 的。
**合理性检验。** 过剩空气**稀释**水分、**压低**露点，所以 $\lambda = 1.15$ 下的 $56.5\ {}^{\circ}\mathrm{C}$ 介于化学计量工况的 $59.2\ {}^{\circ}\mathrm{C}$ 与定义表中 $\lambda = 1.2$ 行的 $55.7\ {}^{\circ}\mathrm{C}$ 之间。**露点必须按湿基成分计算**：干基成分里根本没有水。
:::
:::

::: history
**分压定律**是 **John Dalton** 的，**1801** 年在他研究水蒸气与大气时提出，他同一时期关于蒸发和蒸汽压力的论文也讨论了露点。**Gay-Lussac** 的化合体积定律（**1808**）和 **Avogadro** 的假说（**1811**）提供了摩尔的概念，而 **Cannizzaro** **1858** 年的小册子最终让化学界承认 Avogadro 四十七年来一直是对的。工程师所用的**湿空气计算**始于 **Willis Carrier** 的论文《Rational Psychrometric Formulae》，他在 Buffalo Forge 公司任职期间于 **1911** 年提交给美国机械工程师学会，焓湿图即由此发展而来。**Lavoisier 和 Laplace** 在 **1782–1783** 年用他们的冰量热计测量了燃烧热和呼吸热；系统使用**标准生成焓和生成自由能**，很大程度上得益于 **G. N. Lewis 和 Merle Randall** **1923** 年的《Thermodynamics and the Free Energy of Chemical Substances》，该书也推广了 Lewis 提出的**逸度**（1901）和**活度**（1907）。**高温火焰与解离**由 **Mallard 和 Le Chatelier** 在 **1880 年代**做过实验研究，而 **Nernst** **1906** 年的热定理使平衡常数可以单由热数据算出。**Zeldovich 机理**对热力型一氧化氮的描述出自 **Yakov Zeldovich**，**1946** 年发表，源于他对燃烧和爆炸中氮氧化的研究；加入 $\mathrm{N} + \mathrm{OH}$ 一步的"扩展"机理由 **Lavoie、Heywood 和 Keck** 在 **1970** 年提出，恰逢发动机排放法规起步。
:::

## 后续内容

混合物与燃烧是 [[thermodynamics/power-cycles]] 的布雷顿与朗肯数字之下、[[thermodynamics/exergy]] 的化学㶲数字之下的化学层，是 [[heat-transfer]] 每一道炉子问题的边界条件，是 [[propulsion]] 的喷管和 [[aerodynamics]] 高温试验段的入口气体，也是 [[manufacturing]] 的干燥器和 [[energy-systems]] 的锅炉选型所依据的烟气与湿度数据的来源。

::: summary
- 混合物的性质是摩尔分数加权平均，气体常数是 $R_u / \sum y_i M_i$，而每个组分的熵都带一项别的性质都没有的 $-R_u \ln y_i$。
- $\omega = 0.622\, p_v / (P - p_v)$，相对湿度用干球温度下的 $p_{\mathrm{sat}}$，露点是水蒸气分压力下的 $T_{\mathrm{sat}}$——三个不同的温度，两个独立参数。
- 冷却盘管的潜热负荷决定其出口温度：$24\ {}^{\circ}\mathrm{C}$、$50\ \%$ 室内 $3 : 1$ 的显热潜热负荷需要盘管出口约 $10\ {}^{\circ}\mathrm{C}$，而不是 $13\ {}^{\circ}\mathrm{C}$。
- 奥氏分析是干基的，甲烷的 $\mathrm{CO_2}$ 最大值是 $11.7\ \%$，氧分析仪湿基/干基之差是读数的 $16\ \%$。
- 甲烷的 HHV 比 LHV 高 $11\ \%$，氢高 $18\ \%$，每个效率数字都必须写明基准。
- 甲烷在空气中的绝热火焰温度在 $\phi \approx 1.05$ 处达到约 $2{,}230\ \mathrm{K}$ 的峰值，比无解离值低约 $100\ \mathrm{K}$，它通过动力学成为 $\mathrm{NO_x}$ 的约束。
- $\phi \approx 0.43$ 的燃气轮机燃烧室在涡轮机开始工作前就毁掉燃料㶲的约 $28\ \%$，是全机最大的毁损源。
- 冷凝式省煤器的价值由热网回水温度决定，而不是由换热器决定。
:::

::: quiz
一台燃气锅炉的干烟气分析显示二氧化碳份额非常接近甲烷的 $11.7\ \%$ 最大值。由此可知什么？
- [ ] 过剩空气很大，排烟损失很高
- [x] 过剩空气几乎为零，所以一氧化碳和未燃碳氢很高，烟囱有酸腐蚀之虞
- [ ] 锅炉处于最优效率
- [ ] 助燃空气被预热的
::: solution
$11.7\ \%$ 这个数字是**化学计量**下的最大值，读数接近它意味着 $\lambda \approx 1.0$。真实燃气锅炉大约跑在 $\lambda = 1.10$ 到 $1.20$，此时干基 $\mathrm{CO_2}$ 为 $9.6$ 到 $10.6\ \%$，因为在化学计量比下混合永远不完美，**一部分燃料以一氧化碳和未燃碳氢排出**——这项损失大于省下的排烟损失——同时烟气露点升到约 $59\ {}^{\circ}\mathrm{C}$。**最优是随过剩空气上升的排烟损失与随之下降的未燃损失之间的折中**，两条曲线交出一个平坦的极小值。
:::
:::

## 习题

::: exercise 混合物 {level=1 check="0.287"}
求 $M = 28.97$ 的干空气的气体常数，以千焦每千克开尔文计。
::: solution
$R = 8.31446 / 28.97 = 0.287\ \mathrm{kJ / kg \cdot K}$。
:::
:::

::: exercise 湿度 {level=1 check="0.01331"}
求 $30\ {}^{\circ}\mathrm{C}$、相对湿度 $50\ \%$、$101.325\ \mathrm{kPa}$ 下空气的含湿量，$p_{\mathrm{sat}} = 4.247\ \mathrm{kPa}$。
::: solution
$\omega = 0.622 \times 2.1235 / 99.20 = 0.01331\ \mathrm{kg / kg\ da}$。
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
$55{,}510 / 50{,}020 = 1.110$。
:::
:::

::: exercise 二氧化碳 {level=1 check="11.7"}
求甲烷烟气的干基二氧化碳百分比最大值。
::: solution
$100 / (1 + 7.52) = 11.7\ \%$，在化学计量比下。
:::
:::

::: exercise 混合风 {level=2}
$3\ \mathrm{kg / s}$、$\omega = 0.02145$ 的新风与 $9\ \mathrm{kg / s}$、$\omega = 0.00930$ 的回风混合。求混合风的含湿量。
::: solution
$$
\omega_M = \frac{3 \times 0.02145 + 9 \times 0.00930}{12} = \frac{0.06435 + 0.08370}{12} = 0.01234\ \mathrm{kg / kg\ da}
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
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.103 \times 2 + 3.76 \times 1.103 \times 2} = \frac{100}{9.50} = 10.5\ \%, \qquad
\%\, \mathrm{O_2} = \frac{20.6}{9.50} = 2.2\ \%
$$
而读数是 $10.2\ \%$ 和 $2.1\ \%$。**该分析只是大致自洽**——就 $\mathrm{O_2}$ 而言 $\mathrm{CO_2}$ 约低 $0.3$ 个百分点。漏风解释不了它（用空气稀释会让两个读数沿同一条纯甲烷曲线移动）；常见原因是 $\mathrm{CO_2}$ 测量池校准失准、燃烧不完全（未测的 CO），或者燃料**并非**纯甲烷。
**合理性检验。** 天然气通常是 $85$ 到 $97\ \%$ 的甲烷，另含乙烷、丙烷和一些惰性气体；重烃提高 $\mathrm{CO_2}$ 最大值（典型天然气约 $12\ \%$，甲烷 $11.7\ \%$），燃气中的氮则降低它——这就是锅炉燃烧控制器应当输入燃气的**沃伯指数和成分**、而不是假定甲烷的原因。
:::
:::

::: exercise 推导 {level=3}
由绝热饱和能量衡算导出湿球温度关系式，说明空气—水系统的湿球温度与热力学湿球温度为何几乎重合，并导出路易斯关系式。
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
\frac{h_c}{h_D \rho c_p} = \left( \frac{\mathrm{Sc}}{\mathrm{Pr}} \right)^{2 / 3} = \left( \frac{0.61}{0.71} \right)^{2 / 3} = 0.859^{2 / 3} = 0.90
$$
（此处 $h_D$ 是以 $\mathrm{m / s}$ 计的传质系数；左边是湿球比，$\mathrm{Sc} / \mathrm{Pr}$ 是路易斯数），
于是 $h_c / \left( h_D c_{p,m} \right) \approx 1$，湿球线是一条**类焓**量的等值线，
$$
\omega_1 = \omega_w - \frac{c_{p,m}}{h_{fg} \left( T_w \right)} \left( T_1 - T_w \right)
$$
**其形式与绝热饱和结果完全相同。** 两式对比即得两者的重合：**空气—水系统的湿球比接近 1**（由上面的类比约为 $0.9$，通风良好的温度计实测接近 $1$），所以在常见条件下湿球温度与绝热饱和温度只差零点几开尔文。
**求值。** 对 $30\ {}^{\circ}\mathrm{C}$、$50\ \%$ 的状态，取 $c_{p,m} = 1.005 + 1.86 \times 0.01331 = 1.030$、$22\ {}^{\circ}\mathrm{C}$ 附近 $h_{fg} \approx 2{,}449\ \mathrm{kJ / kg}$，求解
$$
\omega_{\mathrm{sat}} \left( T_w \right) = 0.01331 + \frac{1.030}{2{,}449} \left( 30 - T_w \right)
$$
逐次试算：$T_w = 22\ {}^{\circ}\mathrm{C}$ 给出 $\omega_{\mathrm{sat}} = 0.01667$，要求值是 $0.01331 + 1.030 \times 8 / 2{,}449 = 0.01668$；$T_w = 21.5$ 给出 $0.01616$ 对 $0.01689$，$T_w = 22.5$ 给出 $0.01720$ 对 $0.01647$。**解为 $T_w = 22.0\ {}^{\circ}\mathrm{C}$**，与焓湿图对同一状态给出的值相同。
**合理性检验。** 空气—水的湿球比接近 1，是因为空气的热扩散率与水蒸气在空气中的质扩散率彼此相差约 $15\ \%$ 以内，而这是一份**运气**：湿球温度计这一全世界用得最多的湿度仪表全赖于此。**对有机溶剂蒸气与空气，湿球比远大于 1**（约 $1.5$ 到 $2$），湿球温度与绝热饱和温度就明显不同了。
:::
:::

::: exercise 设计 {level=3}
为一台 $60\ \mathrm{MW_{th}}$ 的工业蒸汽锅炉确定燃烧、排放、热回收和仪表的基础方案，该锅炉烧天然气、沼气和氢气的可变混合气，许可限值为 $3\ \%\ \mathrm{O_2}$ 下 $30\ \mathrm{mg / Nm^{3}}$ 的 $\mathrm{NO_x}$。
::: solution
**燃料及其后果。**
$$
\begin{array}{l c c c c}
\text{燃料} & \mathrm{LHV}\ (\mathrm{MJ / Nm^{3}}) & \left( A / F \right)_{\mathrm{vol}} & \mathrm{CO_2}\ \text{最大值}\ \% & T_{\mathrm{flame}} \\
\text{天然气（按甲烷）} & 35.9 & 9.52 & 11.7 & 2{,}225\ \mathrm{K} \\
\text{沼气，} 65\ \%\ \mathrm{CH_4}\text{、}35\ \%\ \mathrm{CO_2} & 23.3 & 6.19 & 17.0 & 2{,}125\ \mathrm{K} \\
\text{氢} & 10.8 & 2.38 & - & 2{,}380\ \mathrm{K} \\
\text{混合气，} 70\ \%\ \text{天然气} + 20\ \%\ \text{沼气} + 10\ \%\ \mathrm{H_2} & 30.9 & 8.14 & 12.3 & 2{,}215\ \mathrm{K}
\end{array}
$$
（化学计量、$298\ \mathrm{K}$ 空气中的绝热火焰温度。）**怎么读。** **同样热量所需的燃气体积在整个燃料范围内相差 $3 : 1$ 以上**（$35.9 / 10.8$），而单位热量所需空气只差约 $17\ \%$，所以燃烧器的风门必须在很大的体积气量变化范围内保持 $\lambda = 1.15$——固定孔板的燃气阀组做不到，**按质量流量控制、密度补偿**的燃气阀组做得到。
**氢气的四个后果。**
$$
\begin{array}{l l}
\text{火焰速度} & \text{急剧上升，预混燃烧器可能回火；燃烧器必须按氢份额定级} \\
\text{火焰辐射} & \text{氢火焰暗淡发蓝，火焰探测器的紫外元件必须有热电偶后备} \\
\text{烟气中的水} & \text{上升，露点随之上升，省煤器材质必须复核} \\
\text{热力型 } \mathrm{NO_x} & \text{随火焰温度上升，许可限值才是约束性条件}
\end{array}
$$
**$\mathrm{NO_x}$ 基础。** $3\ \%\ \mathrm{O_2}$ 下的 $30\ \mathrm{mg / Nm^{3}}$，按 $\mathrm{NO_2}$ 计（每 ppm $2.05\ \mathrm{mg / Nm^{3}}$），即 $14.6\ \mathrm{ppm}$，常规贫燃预混燃气燃烧器能做到 **$20$ 到 $30\ \mathrm{ppm}$**——所以限值要求
$$
\begin{array}{l c}
\text{超贫预混加分级配风} & 12\text{–}18\ \mathrm{ppm} \\
\text{烟气再循环 } 15\ \% & 8\text{–}12\ \mathrm{ppm} \\
\text{选择性催化还原（二级）} & 3\text{–}5\ \mathrm{ppm}
\end{array}
$$
**推荐预混加 $15\ \%$ 烟气再循环**，可达约 $10\ \mathrm{ppm}$，代价是一台再循环风机的功率和少许效率损失。
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
**保护买方的四个条款。** **"燃烧器必须燃料灵活，在所列燃料从沼气到天然气的整个沃伯指数范围内、氢体积份额高达 $20\ \%$ 时予以保证。"** **"$\mathrm{NO_x}$ 保证须在 $3\ \%\ \mathrm{O_2}$ 下给出，并在沃伯指数的最低值和最高值下验证。"** **"冷凝式省煤器的材质须按烟气硫含量最高 $30\ \mathrm{mg / Nm^{3}}$、冷凝水 pH $3.5$ 选定，并包含中和装置。"** **"控制系统必须由实测的燃气密度和成分计算空气设定值，而不是用固定比值。"**
**设计点评。** 一般规律是：**多燃料锅炉是一个带压力容器的测量与控制项目**；而按纯热输出购买、用纯甲烷测试的锅炉，在第二年烧上波动的沼气时就会许可超标。
:::
:::
