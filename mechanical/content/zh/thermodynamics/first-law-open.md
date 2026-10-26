控制体是一块有流体穿流而过的空间，第一定律用到它身上就多出一项、多出一层微妙。多出的项是流动的物质携带着越过边界的能量；微妙之处在于流动的物质必须**把自己推进去**，而推的功出现在一个直到记账需要它之前谁也没有定义过的性质里。

这个性质就是**焓**，$h = u + P v$，而"它是一个性质、不是一种能量形式"这句话，是本学科里被最不动声色地误解着的一句话。$P v$ 是**流动功**，一个单位质量的物质对身后物质做的功，它只在物质流动时存在——这就是为什么闭口系统从不用 $h$ 来记它的传热，而管道总是非用不可。

::: warning 七个长得像算术错误的控制体错误
**在该用 $h$ 的地方用了 $u$。** 每一条越过控制体边界的流股都携带 $u$ **加上**流动功 $P v$，二者之和就是 $h$。用 $u$ 写的稳定流动能量平衡差了 $P v$，而 $3\ \mathrm{MPa}$、$300\ {}^{\circ}\mathrm{C}$ 的蒸气的 $P v = 3000 \times 0.08114 = 243\ \mathrm{kJ / kg}$——是焓的 **$8\ \%$**，比题目里大多数传热量还大。 **在喷嘴里丢掉动能项。** $5\ \mathrm{kJ / kg}$ 是一个涡轮级的焓降的 $1\ \%$，却是喷嘴用途的 **$100\ \%$**，规则是：**凡是速度变化超过约 $70\ \mathrm{m / s}$ 的地方都保留 $V^{2} / 2$**，这包括每一个喷嘴、扩压器、引射器、文丘里管和孔板流量计。 **在不是节流的设备里假设 $h$ 不变。** $h_1 = h_2$ 对**阀门、孔板、多孔塞或毛细管**成立——即无功、传热可忽略、也没有刻意改变速度的设备。它对涡轮机、压气机、泵、喷嘴是**错的**，而且令初学者意外的是，对一根保温良好但很长的管道也是错的，因为摩擦对流体做真实的功。 **忘记泵的水温升高是真实的。** 效率 $80\ \%$ 的泵向给水输入 $7.6\ \mathrm{kJ / kg}$ 的功，其中不可逆的 $1.5\ \mathrm{kJ / kg}$ 把 $c = 4.18$ 的水加热 $0.36\ \mathrm{K}$，循环计算必须把这部分加热记在泵头上而不是省煤器头上。 **对充灌问题使用稳定流动方程。** 充气的储罐是**非稳态**的：里面的质量在变，正确的方程是 $m_2 u_2 - m_1 u_1 = m_i h_i - m_e h_e + Q - W$，其中入流带来的是**焓**，罐内气体储存的是**热力学能**。其结果是：一只真空罐由管路充灌后终温是 $\gamma T_i$，而不是 $T_i$。 **用进口压力去定出口焓。** 在等熵涡轮机或压气机里，出口状态由出口**压力**处的 $s_2 = s_1$ 求出，而效率施加在**焓差**上而不是施加在压力上。一个把压比乘以效率来折减的计算，犯的是范畴错误。 **算了能量却忘了质量。** 每一道稳定流动题都是**两个**方程，而质量守恒 $\sum \dot{m}_{\mathrm{in}} = \sum \dot{m}_{\mathrm{out}}$、$\dot{m} = A V / v$，正是那个决定速度、管径和未知数个数的方程。一个只有一个方程两个未知数的解法，不是找到了一个近似，而是忘了一条守恒。
:::

## 稳定流动能量方程

::: definition 质量流量与连续方程 {#def-mass}
$$
\dot{m} = \rho A V = \frac{A V}{v}, \qquad
\sum \dot{m}_{\mathrm{in}} = \sum \dot{m}_{\mathrm{out}}\ \text{（稳态）}
$$
**让管径计算一步到位的形式。** 对单股流，
$$
A = \frac{\dot{m} v}{V} \qquad \Longleftrightarrow \qquad D = \sqrt{\frac{4 \dot{m} v}{\pi V}}
$$
**行业惯用的流速，以及它们的代价。**
$$
\begin{array}{l c l}
10\ \mathrm{bar} \text{ 的饱和蒸汽} & 30\text{--}50\ \mathrm{m / s} & v = 0.194\ \mathrm{m^{3} / kg}\text{ ，管径很大} \\
100\ \mathrm{bar}\ 500\ {}^{\circ}\mathrm{C} \text{ 的过热蒸汽} & 40\text{--}60\ \mathrm{m / s} & v = 0.033\text{ ，流通面积只有六分之一} \\
8\ \mathrm{bar} \text{ 的压缩空气} & 6\text{--}15\ \mathrm{m / s} & \text{速度决定了 } 3\ \%\text{ 压降准则} \\
\text{冷却水} & 1.5\text{--}3\ \mathrm{m / s} & \text{超过 } 3\ \mathrm{m / s} \text{ 管子开始冲蚀} \\
\text{饱和凝结水} & 0.6\text{--}1.2\ \mathrm{m / s} & \text{空化与水锤} \\
\text{燃气轮机排气} & 150\text{--}200\ \mathrm{m / s} & \text{管道按压降而非造价定尺寸}
\end{array}
$$
**决定蒸汽主管尺寸的数字。** $10\ \mathrm{bar}$、$300\ {}^{\circ}\mathrm{C}$（$v = 0.2579$）的蒸汽 $60\ \mathrm{kg / s}$，取 $40\ \mathrm{m / s}$：
$$
A = \frac{60 \times 0.2579}{40} = 0.3869\ \mathrm{m^{2}}, \qquad D = 702\ \mathrm{mm}
$$
而取 $25\ \mathrm{m / s}$ 时同样的任务需要 $D = 888\ \mathrm{mm}$——直径大 **$26\ \%$**，在压力等级固定（壁厚与直径成正比）时，管子的钢材最多要多 **$60\ \%$**。因此流速是**一个由热力工程师做出的投资决策**。
:::

::: definition 流动功与稳定流动能量方程 {#def-sfee}
**流动功。** 把一体积为 $\mathcal{V}$ 的流体段以压力 $P$ 推过边界，花费
$$
w_{\mathrm{flow}} = P \mathcal{V} = P v \quad \left[ \mathrm{kJ / kg} \right]
$$
**流动流股的能量。**
$$
\theta \equiv h + \frac{V^{2}}{2} + g z = u + P v + \frac{V^{2}}{2} + g z
$$
**稳定流动能量方程。**
$$
\boxed{ \dot{Q} - \dot{W} = \sum_{\mathrm{out}} \dot{m} \left( h + \frac{V^{2}}{2} + g z \right) - \sum_{\mathrm{in}} \dot{m} \left( h + \frac{V^{2}}{2} + g z \right) }
$$
**四个简化，按它们通常被论证成立的顺序。**
$$
\begin{array}{l l l}
\text{绝热} & \dot{Q} = 0 & \text{涡轮机、压气机、喷嘴、泵、保温良好的换热器} \\
\text{无轴功} & \dot{W} = 0 & \text{节流件、管道、换热器、混合室} \\
\text{动能可忽略} & \Delta \left( V^{2} / 2 \right) \approx 0 & \text{换热器、容器、等截面短管} \\
\text{位能可忽略} & g \Delta z \approx 0 & g \Delta z = 0.098\ \mathrm{kJ / kg}\ \text{每} 10\ \mathrm{m}\text{ ，对气体永远可忽略}
\end{array}
$$
**为丢掉 $g \Delta z$ 正名的数字。** 每升高 $10\ \mathrm{m}$，$g \Delta z = 9.81 \times 10 = 98\ \mathrm{J / kg} = 0.098\ \mathrm{kJ / kg}$，而蒸汽的焓降是 $1{,}200\ \mathrm{kJ / kg}$——**$0.008\ \%$**。例外是**水电站压力钢管**、**烟囱**和**蒸馏塔**，那里高度**就是**机器本身。
**人人都栽在里面的例外。** 一座 **$100\ \mathrm{m}$** 高的自然通风冷却塔或烟道，靠的是**密度差**而不是气体的势能，抽力是 $\Delta \rho g H$：$1.2$ 对 $0.95\ \mathrm{kg / m^{3}}$、高 $100\ \mathrm{m}$ 时是 $245\ \mathrm{Pa}$——刚好驱动锅炉的烟气，别的什么也驱动不了。
:::

::: definition 六种设备 {#def-devices}
$$
\begin{array}{l l l l}
\text{设备} & \text{假设} & \text{衡算} & \text{用途} \\
\text{喷嘴} & \dot{Q} = \dot{W} = 0,\ \Delta z = 0 & V_2 = \sqrt{V_1^{2} + 2 \left( h_1 - h_2 \right)} & \text{焓变动能} \\
\text{扩压器} & \text{同上，反向} & V_2 < V_1,\ P_2 > P_1 & \text{动能变压} \\
\text{节流件} & \dot{Q} = \dot{W} = \Delta ke = 0 & h_1 = h_2 & \text{降压而不做功} \\
\text{涡轮机} & \dot{Q} \approx 0 & \dot{W} = \dot{m} \left( h_1 - h_2 \right) & \text{输出功} \\
\text{压气机} & \dot{Q} \approx 0 & \dot{W} = \dot{m} \left( h_2 - h_1 \right) & \text{输入功} \\
\text{泵} & \text{不可压缩} & w = v \Delta P & \text{提高液体压力} \\
\text{换热器} & \dot{W} = \Delta ke = \Delta z = 0 & \dot{m}_c \Delta h_c = - \dot{m}_h \Delta h_h & \text{传递热量} \\
\text{混合室} & \dot{Q} = \dot{W} = 0 & \sum \dot{m}_{\mathrm{in}} h_{\mathrm{in}} = \dot{m}_{\mathrm{out}} h_{\mathrm{out}} & \text{汇合流股}
\end{array}
$$
**喷嘴出口速度，保留进口项。**
$$
V_2 = \sqrt{V_1^{2} + 2 \left( h_1 - h_2 \right)} \qquad \left[ \mathrm{m / s} \right]\ h\ \text{以}\ \mathrm{J / kg}\ \text{代入}
$$
**说明为什么保留进口项的数字。** 汽轮机第一级喷嘴，$h_1 - h_2 = 200\ \mathrm{kJ / kg}$、$V_1 = 150\ \mathrm{m / s}$：
$$
V_2 = \sqrt{150^{2} + 2 \times 200{,}000} = \sqrt{22{,}500 + 400{,}000} = 650\ \mathrm{m / s}
$$
对比 $\sqrt{400{,}000} = 632\ \mathrm{m / s}$——丢掉 $V_1$ 会错 **$2.8\ \%$**，而叶片速度和本级比功同样错 $2.8\ \%$。
**喷嘴效率。**
$$
\eta_N = \frac{h_1 - h_2}{h_1 - h_{2s}}, \qquad V_{2,\mathrm{actual}} = \sqrt{2 \eta_N \left( h_1 - h_{2s} \right)}
$$
**泵的功，精确式与近似式。** 对不可压缩液体，
$$
w_{\mathrm{rev}} = \int v\, dP = v \Delta P, \qquad
\Delta T_{\mathrm{pump}} = \frac{w \left( 1 - \eta_p \right)}{c} \ \text{（不可逆部分）}
$$
**对锅炉给水泵的计算：** $v = 0.001010\ \mathrm{m^{3} / kg}$，$\Delta P = 6\ \mathrm{MPa}$，$\eta_p = 0.80$：
$$
w = \frac{0.001010 \times 6000}{0.80} = 7.58\ \mathrm{kJ / kg}, \qquad
\Delta T = \frac{7.58 \times 0.20}{4.18} = 0.36\ \mathrm{K}
$$
**这 $0.36\ \mathrm{K}$ 不是舍入误差。** 在一座 $1{,}000\ \mathrm{MW}$ 的电厂里，给水泵吸收的功率约为 $25\ \mathrm{MW}$ 量级，即电厂出力的 $2.5\ \%$。它全部进入给水的焓，其中不可逆的五分之一，约 $5\ \mathrm{MW}$，表现为温升。若把泵的这部分加热记到给水加热器或省煤器头上，它们的热平衡就错了这么多。
:::

::: definition 叶轮机械效率 {#def-eff}
$$
\eta_T = \frac{\text{实际功}}{\text{等熵功}} = \frac{h_1 - h_2}{h_1 - h_{2s}}, \qquad
\eta_C = \frac{\text{等熵功}}{\text{实际功}} = \frac{h_{2s} - h_1}{h_2 - h_1}
$$
**不等号的方向就是两者的全部区别。** 涡轮机的实际功**小于**等熵功，所以 $\eta_T$ 是实际比理想；压气机的实际功**大于**等熵功，所以 $\eta_C$ 是理想比实际。**两者都小于 1，而没有一个等于同样两个数之比。**
**说明效率为什么施加在焓上而不是压力上的数字。** 空气从 $100\ \mathrm{kPa}$、$300\ \mathrm{K}$ 压到 $800\ \mathrm{kPa}$，$\eta_C = 0.82$：
$$
T_{2s} = 300 \times 8^{0.2857} = 543.4\ \mathrm{K}, \qquad
\Delta h_s = 1.005 \times 243.4 = 244.6\ \mathrm{kJ / kg}
$$
$$
\Delta h = \frac{244.6}{0.82} = 298.3\ \mathrm{kJ / kg}, \qquad
T_2 = 300 + \frac{298.3}{1.005} = 596.8\ \mathrm{K}
$$
**错误的方法**——把压比折减成 $1 + 0.82 \times 7 = 6.74$——给出 $T_2 = 300 \times 6.74^{0.2857} = 517\ \mathrm{K}$，错了 **$79\ \mathrm{K}$** 和 $80\ \mathrm{kJ / kg}$。
**你会遇到的各种效率，以及它们的含义。**
$$
\begin{array}{l c l}
\text{大型汽轮机，整机} & 0.85\text{--}0.92 & \text{末级最差} \\
\text{涡轮级，最佳压比} & 0.88\text{--}0.93 & \text{偏离设计点时急剧下降} \\
\text{离心式压气机} & 0.70\text{--}0.80 & \text{皮实，工况范围宽} \\
\text{轴流式压气机，现代} & 0.88\text{--}0.92 & \text{航空发动机里八到十级} \\
\text{活塞式压气机，多级} & 0.75\text{--}0.88 & \text{余隙与气阀损失} \\
\text{离心泵} & 0.60\text{--}0.80 & \text{在设计流量下最优} \\
\text{锅炉给水泵} & 0.78\text{--}0.86 & \text{即上文那 } 0.36\ \mathrm{K} \\
\text{喷嘴} & 0.92\text{--}0.97 & \text{收缩段；扩张段是风险所在}
\end{array}
$$
**机械效率与发电机效率相乘。**
$$
\eta_{\mathrm{overall}} = \eta_{\mathrm{isentropic}} \times \eta_{\mathrm{mech}} \times \eta_{\mathrm{generator}}, \qquad
0.90 \times 0.985 \times 0.985 = 0.873
$$
**决定一份技术规格书的数字。** 涡轮机厂商报 $90\ \%$ 的**等熵**效率，而把它读成**轴**效率的买方，会把电出力高估 **$3\ \%$**——对一台 $100\ \mathrm{MW}$ 的机组就是 **$3\ \mathrm{MW}$**。
:::

::: definition 非稳态流动：充灌与放空 {#def-unsteady}
**普遍形式的均流衡算。** 对每一瞬间内容物空间均匀、流股稳定的控制体：
$$
\underbrace{\left( m_2 u_2 - m_1 u_1 \right)}_{\text{储存}} = Q - W + \sum m_i h_i - \sum m_e h_e
$$
**令人意外的项。** 进入的质量带来**焓** $h_i = u_i + P_i v_i$，而罐子储存**热力学能** $u_2$，因为进入的质量必须被它身后的质量**推**进控制体。
**真空罐。** $m_1 = 0$，$Q = 0$，$W = 0$，刚性故无边界功：
$$
m_2 u_2 = m_2 h_i \quad \Rightarrow \quad u_2 = h_i \quad \Rightarrow \quad c_v T_2 = c_p T_i
$$
$$
\boxed{ T_2 = \gamma T_i }
$$
**$300\ \mathrm{K}$ 管路的空气把一只真空绝热罐充到 $420\ \mathrm{K}$——$147\ {}^{\circ}\mathrm{C}$。** 随后它在定容下冷却回 $300\ \mathrm{K}$，压力按 $\gamma$ 的倒数跌落：
$$
\frac{P_{\mathrm{final}}}{P_{\mathrm{supply}}} = \frac{T_0}{\gamma T_0} = \frac{1}{1.4} = 0.714
$$
**使这成为一个真实工程问题的数字。** 一只 $200\ \mathrm{L}$ 的气瓶由 $200\ \mathrm{bar}$ 的管路充到 $200\ \mathrm{bar}$，放一夜后早上读数为 **$143\ \mathrm{bar}$**。压缩机没坏，也没有漏气：**充气时气体是热的。** 不作修正的充气站会少交付 **$29\ \%$**，而每一个水肺、潜水和呼吸空气规范都因此写有一条**静置**条款。
**由非真空状态充灌的罐。** 刚性、绝热、气源温度 $T_i$：
$$
m_2 c_v T_2 = m_1 c_v T_1 + \left( m_2 - m_1 \right) c_p T_i
\quad \Rightarrow \quad
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2} \ \ \left( T_1 = T_i \right)
$$
**数值计算。** 从 $100$ 充到 $800\ \mathrm{kPa}$，$T_i = 300\ \mathrm{K}$：
$$
T_2 = 300 \times \frac{100 + 1.4 \times 700}{800} = 300 \times 1.350 = 405\ \mathrm{K}, \qquad
P_{\mathrm{after\ soak}} = 800 \times \frac{300}{405} = 593\ \mathrm{kPa}
$$
**放空情形。** 向大气排放的储罐会**对离开的气体做功**，若排放快到足以视为绝热，留在罐里的气体就**可逆地膨胀**并冷却：
$$
T_2 = T_1 \left( \frac{P_2}{P_1} \right)^{\left( \gamma - 1 \right) / \gamma}, \qquad
m_2 = m_1 \left( \frac{P_2}{P_1} \right)^{1 / \gamma}
$$
**对储罐可用含量的要紧数字。** $800\ \mathrm{kPa}$、$300\ \mathrm{K}$ 的 $1\ \mathrm{m^{3}}$ 储罐存有 $m_1 = 9.29\ \mathrm{kg}$。**等温**放空到 $100\ \mathrm{kPa}$ 可得 $8.13\ \mathrm{kg}$；**绝热可逆**放空则剩下
$$
m_2 = 9.29 \times \left( \frac{100}{800} \right)^{1 / 1.4} = 9.29 \times 0.2264 = 2.10\ \mathrm{kg}
$$
所以输出 **$7.19\ \mathrm{kg}$** 对比 $8.13\ \mathrm{kg}$——**少 $12\ \%$**，因为气体是冷着离开的，罐里存的质量没有全部出来。**实用规则是：储罐的可用空气取等温数字再减去 $10$ 到 $15\ \%$**，而每一个忽视这一点的压缩空气系统都把储罐选小了。
:::

::: widget plot
f: 420-12000/x; 300
x: 100, 900
y: 250, 450
labels: fill temperature K; supply temperature K
caption: 绝热刚性罐由 $300\ \mathrm{K}$ 管路绝热充灌后罐内空气的终温，对终了绝对压力作图，取自 $T_2 = T_i \left[ P_1 + \gamma \left( P_2 - P_1 \right) \right] / P_2$，$P_1 = 100\ \mathrm{kPa}$。罐从大气压开始，所以最先入罐的气体被加热得最厉害，最后入罐的最轻；当初压可忽略时温度渐近于 $\gamma T_i = 420\ \mathrm{K}$。**这条曲线上的每一个点都是一只早上会读数偏低的罐**，而比值 $T_2 / T_i$ 就是一块未加修正的充气压力表把交付质量夸大的份额。
:::

## 算例

::: example 一台汽轮机 {#ex-turbine}
蒸汽以 $60\ \mathrm{m / s}$ 的速度、$60\ \mathrm{m}$ 的高程进入一台绝热涡轮机，进口为 $6\ \mathrm{MPa}$、$600\ {}^{\circ}\mathrm{C}$，出口为 $10\ \mathrm{kPa}$、干度 $0.90$、速度 $120\ \mathrm{m / s}$、高程 $0\ \mathrm{m}$。质量流量为 $5\ \mathrm{kg / s}$。求功率和等熵效率。
::: solution
**各状态。** 进口 $6\ \mathrm{MPa}$、$600\ {}^{\circ}\mathrm{C}$：
$$
h_1 = 3{,}658.8\ \mathrm{kJ / kg}, \qquad s_1 = 7.1693\ \mathrm{kJ / kg \cdot K}
$$
出口 $10\ \mathrm{kPa}$、$x = 0.90$：
$$
h_2 = h_f + x h_{fg} = 191.81 + 0.90 \times 2{,}392.1 = 2{,}344.7\ \mathrm{kJ / kg}
$$
**能量平衡，一项不漏。**
$$
\dot{W} = \dot{Q} - \dot{m} \left[ \left( h_2 - h_1 \right) + \frac{V_2^{2} - V_1^{2}}{2} + g \left( z_2 - z_1 \right) \right]
$$
$$
\Delta h = 2{,}344.7 - 3{,}658.8 = - 1{,}314.1\ \mathrm{kJ / kg}
$$
$$
\Delta ke = \frac{120^{2} - 60^{2}}{2 \times 1000} = \frac{14{,}400 - 3{,}600}{2000} = 5.4\ \mathrm{kJ / kg}
$$
$$
g \Delta z = 9.81 \times \left( - 60 \right) = - 588.6\ \mathrm{J / kg} = - 0.59\ \mathrm{kJ / kg}
$$
$$
\dot{W} = - 5 \times \left( - 1{,}314.1 + 5.4 - 0.59 \right) = - 5 \times \left( - 1{,}309.3 \right) = 6{,}546\ \mathrm{kW}
$$
**修正项的大小。** 动能项是 $5.4 / 1{,}314 = 0.41\ \%$，使功率少 $27\ \mathrm{kW}$；位能项 $0.04\ \%$，使功率多 $3\ \mathrm{kW}$——净 **$24\ \mathrm{kW}$**，即 $0.37\ \%$。可行性研究里丢掉它们，性能试验里保留它们。
**等熵效率。** $10\ \mathrm{kPa}$ 下：$s_f = 0.6492$，$s_{fg} = 7.4996$。
$$
x_{2s} = \frac{7.1693 - 0.6492}{7.4996} = 0.8694, \qquad
h_{2s} = 191.81 + 0.8694 \times 2{,}392.1 = 2{,}271.5\ \mathrm{kJ / kg}
$$
$$
\eta_T = \frac{h_1 - h_2}{h_1 - h_{2s}} = \frac{1{,}314.1}{1{,}387.3} = 0.947
$$
**湿度。** 实际出口干度 $0.90$，等熵干度 $0.869$——不可逆性**蒸发**了 $3\ \%$ 的水分，这违反直觉却是正确的：饱和温度下的熵产在定压下增加了焓，而在穹顶内这意味着更干的蒸汽。
**末级问题。** 末级后缘 $10\ \%$ 的含水量已在**许用限值**上；超过 $12\ \%$，叶尖的水滴冲蚀就成为寿命的限制机制，设计对策是一次**再热**，用一道额外的锅炉受热面把出口干度提到 $0.95$。
**校核。** 熵产：
$$
s_2 = 0.6492 + 0.90 \times 7.4996 = 7.3988\ \mathrm{kJ / kg \cdot K}, \qquad
\dot{S}_{\mathrm{gen}} = 5 \times \left( 7.3988 - 7.1693 \right) = 1.148\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = T_0 \dot{S}_{\mathrm{gen}} = 293.15 \times 1.148 = 336\ \mathrm{kW}
$$
对比未发出的功 $1{,}387.3 - 1{,}314.1 = 73.2\ \mathrm{kJ / kg} \times 5 = 366\ \mathrm{kW}$。两者相差一个因子 $T_0 / T_{\mathrm{sat}} = 293.15 / 318.96 = 0.919$：在穹顶内 $h_2 - h_{2s} = T_{\mathrm{sat}} \left( s_2 - s_{2s} \right)$，所以少发的功是按排汽温度给熵产定价，而㶲毁损是按 $T_0$ 定价。多出的焓在 $46\ {}^{\circ}\mathrm{C}$ 下离开，相对 $20\ {}^{\circ}\mathrm{C}$ 的环境仍带有少许㶲——这一区别由㶲一章精确化。
**合理性检验。** 出口在 $x = 0.90$ 而不是 $x = 1$，是因为膨胀线穿过了饱和线。$94.7\ \%$ 的等熵效率对一台 $6.5\ \mathrm{MW}$ 的机器来说偏高——小型涡轮机通常只有 $75$ 到 $85\ \%$，$90\ \%$ 以上属于大型电站机组，因为叶型损失和漏失损失对短叶片的影响更重——所以本例给定的出口干度是偏乐观的。
:::
:::

::: example 节流量热计 {#ex-throttle}
$4\ \mathrm{MPa}$ 的湿蒸汽经节流降到 $20\ \mathrm{kPa}$，那里温度读数为 $120\ {}^{\circ}\mathrm{C}$。求上游干度，并解释为什么这台仪器对很湿的蒸汽不起作用。
::: solution
**模型。** 节流件绝热、不做功，且管径相同时进出口动能项相等：
$$
h_1 = h_2
$$
**下游状态。** $20\ \mathrm{kPa}$ 下 $T_{\mathrm{sat}} = 60.06\ {}^{\circ}\mathrm{C}$，$120\ {}^{\circ}\mathrm{C}$ 是 $60\ \mathrm{K}$ 的过热度，所以这个状态用普通温度计就能测。在过热表 $100$ 与 $150\ {}^{\circ}\mathrm{C}$ 之间插值：
$$
h_2 \approx 2{,}686.2 + \frac{120 - 100}{150 - 100} \times \left( 2{,}782.3 - 2{,}686.2 \right) = 2{,}686.2 + 38.4 = 2{,}724.6\ \mathrm{kJ / kg}
$$
**上游干度。** $4\ \mathrm{MPa}$ 下：$h_f = 1{,}087.5$，$h_{fg} = 1{,}713.3$。
$$
x_1 = \frac{h_1 - h_f}{h_{fg}} = \frac{2{,}724.6 - 1{,}087.5}{1{,}713.3} = 0.9555
$$
**为什么对湿蒸汽失效。** 节流必须把状态送进**过热**区，温度才有意义。仍能以过热态到达 $20\ \mathrm{kPa}$ 的最低上游干度，是把 $x = h_{g} \left( 20\ \mathrm{kPa} \right)$ 映射回去：
$$
x_{\min} = \frac{h_{g, 20\ \mathrm{kPa}} - h_{f, 4\ \mathrm{MPa}}}{h_{fg, 4\ \mathrm{MPa}}} = \frac{2{,}608.9 - 1{,}087.5}{1{,}713.3} = 0.888
$$
**所以节流量热计在 $4\ \mathrm{MPa}$ 下测不出低于 $0.89$ 的干度。** 低于此，蒸汽离开阀门时**仍是湿的**，无论干度多少其温度都是 $T_{\mathrm{sat}} (20\ \mathrm{kPa}) = 60\ {}^{\circ}\mathrm{C}$，仪器什么也读不出来。
**补救办法及其代价。** **过热式量热计**在阀门与温度计之间加装一个小电加热器，提供足以保证 $20\ \mathrm{K}$ 过热度的热量：
$$
\dot{Q}_{\mathrm{heater}} = \dot{m} \left( h_{g, 20\ \mathrm{kPa}} + c_p \times 20 - h_2 \right)
$$
对 $0.02\ \mathrm{kg / s}$ 的样品、$x_1 = 0.70$，$h_2 = 1{,}087.5 + 0.70 \times 1{,}713.3 = 2{,}286.8$，取 $c_p \approx 1.94\ \mathrm{kJ / kg \cdot K}$，热负荷是 $0.02 \times \left( 2{,}608.9 + 38.8 - 2{,}286.8 \right) = 7.2\ \mathrm{kW}$——为测量 $10\ \mathrm{MW}$ 的流量用一只 **$7.2\ \mathrm{kW}$** 的加热器，侵入仅 **$0.07\ \%$**，这就是这台仪器能工作的原因。
**说明为什么非要选节流的数字。** 压降是 $3{,}980\ \mathrm{kPa}$，被毁掉的功是
$$
s_1 = s_f + x_1 s_{fg} = 2.7968 + 0.9555 \times 3.2728 = 5.924\ \mathrm{kJ / kg \cdot K}, \qquad
s_2 = 8.2266\ \mathrm{kJ / kg \cdot K}
$$
$$
s_{\mathrm{gen}} = 2.303\ \mathrm{kJ / kg \cdot K}, \qquad
x_{\mathrm{dest}} = 293.15 \times 2.303 = 675\ \mathrm{kJ / kg}
$$
**为测一个干度毁掉了 $675\ \mathrm{kJ / kg}$ 的功**——这就是为什么量热计的取样管只有 $2\ \mathrm{mm}$ 内径，毁掉的功按每 $1\ \mathrm{g / s}$ 计只有 $675\ \mathrm{W}$，没人介意。
**合理性检验。** 守恒的是 $h$ 而不是 $u$，因为流体在两端都做流动功；而湿蒸汽节流时温度**下降**、理想气体节流时温度不变，是因为在穹顶内焓固定而压力下降，温度只能跟着饱和线降。$4\ \mathrm{MPa}$ 的湿蒸汽节流后以 $60\ {}^{\circ}\mathrm{C}$ 而不是 $250\ {}^{\circ}\mathrm{C}$ 离开，而期待相反结果的技师会误读下游的温度计。
:::
:::

::: example 混合室 {#ex-mix}
$1\ \mathrm{MPa}$、$300\ {}^{\circ}\mathrm{C}$ 的蒸汽 $2\ \mathrm{kg / s}$ 与 $1\ \mathrm{MPa}$、$20\ {}^{\circ}\mathrm{C}$ 的液态水绝热混合，产出 $1\ \mathrm{MPa}$ 的饱和蒸气。求水流量和熵产。
::: solution
**各状态。**
$$
\begin{array}{l l c c}
1 & \text{过热蒸汽，} 1\ \mathrm{MPa},\ 300\ {}^{\circ}\mathrm{C} & h_1 = 3{,}051.6 & s_1 = 7.1246 \\
2 & \text{液态水，} 1\ \mathrm{MPa},\ 20\ {}^{\circ}\mathrm{C} & h_2 \approx h_f @ 20 + v_f \Delta P = 83.91 + 1.0 = 84.9 & s_2 \approx 0.2965 \\
3 & \text{饱和蒸气，} 1\ \mathrm{MPa} & h_3 = 2{,}777.1 & s_3 = 6.5850
\end{array}
$$
**质量守恒。** $\dot{m}_3 = \dot{m}_1 + \dot{m}_2$。
**能量平衡。** 绝热、无功、动能可忽略：
$$
\dot{m}_1 h_1 + \dot{m}_2 h_2 = \left( \dot{m}_1 + \dot{m}_2 \right) h_3
$$
$$
\dot{m}_2 = \dot{m}_1 \, \frac{h_1 - h_3}{h_3 - h_2} = 2 \times \frac{3{,}051.6 - 2{,}777.1}{2{,}777.1 - 84.9} = 2 \times \frac{274.5}{2{,}692.2} = 0.204\ \mathrm{kg / s}
$$
**解释。** 所需的水只有蒸汽的 **$10\ \%$**，因为水的任务是冷凝掉过热度，而过热度只有 $274\ \mathrm{kJ / kg}$，水却有 $2{,}692\ \mathrm{kJ / kg}$ 的蒸发能力。
**熵产。**
$$
\dot{S}_{\mathrm{gen}} = \dot{m}_3 s_3 - \dot{m}_1 s_1 - \dot{m}_2 s_2
= 2.204 \times 6.5850 - 2 \times 7.1246 - 0.204 \times 0.2965
$$
$$
= 14.513 - 14.249 - 0.060 = 0.203\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = 293.15 \times 0.203 = 59.5\ \mathrm{kW}
$$
**判决。** 混合在一台没有运动部件、产出恰恰是工厂想要的产品的设备里毁掉了 **$60\ \mathrm{kW}$** 的功。**有用的**产出——减温后的蒸汽——比 $60\ \mathrm{kW}$ 的损失功更值钱，所以这台设备并不浪费；但那 $60\ \mathrm{kW}$ 是一个无法可逆地完成的过程的代价。
**它教给的设计规则。** **喷水减温是电厂里最便宜的热力学，也是㶲毁损最重的。** $274\ \mathrm{kJ / kg}$ 的过热度，代价是一只喷水阀和 $0.2\ \mathrm{kg / s}$ 的水，却毁掉 $60\ \mathrm{kW}$；而一台用来发出这个差值的**产汽式**减温器将是一台造价六位数的 $60\ \mathrm{kW}$ 机器。这笔账毫无悬念。
**雾化要求。** 水必须**雾化到 $100\ \mu\mathrm{m}$ 以下**，并在温度探头前留**至少 $30$ 倍管径的直管段**，否则水滴打在管壁上，探头读到的是壁膜水的饱和温度，控制回路就会振荡。这就是减温器机械设计的全部，而它不出现在任何一本热力学教科书里。
**合理性检验。** $h_2$ 之所以带一个 $v_f \Delta P$ 修正，是因为水在 $1\ \mathrm{MPa}$ 下，而表里的 $h_f$ 对应 $20\ {}^{\circ}\mathrm{C}$ 饱和、$2.34\ \mathrm{kPa}$；修正是 $1.0\ \mathrm{kJ / kg}$，使 $\dot{m}_2$ 改变 $0.04\ \%$。这里把它算进去而可行性估算里不算，正是用心的正确次序。
:::
:::

::: example 给潜水气瓶充气 {#ex-fill}
一只 $12\ \mathrm{L}$ 的绝热气瓶由巨大的 $300\ \mathrm{K}$ 空气储气库 充灌到压力表读数为 $200\ \mathrm{bar}$。求终温度和终压力，以及实际交付的质量相对压力表指示的差距。
::: solution
**模型。** 刚性、绝热、无功、均流。气瓶起始于 $1\ \mathrm{bar}$、$300\ \mathrm{K}$。
$$
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2}
= 300 \times \frac{1 + 1.4 \times 199}{200} = 300 \times 1.398 = 419\ \mathrm{K} = 146\ {}^{\circ}\mathrm{C}
$$
**压力表暗示的质量。** 在 $300\ \mathrm{K}$ 下读数 $200\ \mathrm{bar}$ 的压力表本应意味着
$$
m_{\mathrm{implied}} = \frac{20{,}000 \times 0.012}{0.287 \times 300} = 2.787\ \mathrm{kg}
$$
**实际在罐里的质量（趁热）。**
$$
m_{\mathrm{actual}} = \frac{20{,}000 \times 0.012}{0.287 \times 419} = 1.994\ \mathrm{kg}
$$
**静置之后。** 回到 $300\ \mathrm{K}$ 时压力跌到
$$
P_3 = 200 \times \frac{300}{419} = 143.1\ \mathrm{bar}
$$
而质量仍是 $1.994\ \mathrm{kg}$——**压力表读到 $200\ \mathrm{bar}$，只是因为气体是热的。**
**相对顾客预期的交付质量。** 买"$12\ \mathrm{L}$ 气瓶 $200\ \mathrm{bar}$"的潜水员预期 $2.787\ \mathrm{kg}$，而如果充气站趁热读表就停泵，他只拿到 $1.994\ \mathrm{kg}$——**短了 $28\ \%$**。
**三种补救办法，全都写进了标准。**
$$
\begin{array}{l l l}
\text{慢充} & \text{限制充速 } \Delta P < 10\ \mathrm{bar / min} & \text{气体靠传热保持在 } 300\ \mathrm{K} \text{ 附近} \\
\text{水槽} & \text{充气时将气瓶浸入水槽} & \text{充气近乎等温} \\
\text{静置补充} & \text{充气，等 } 30\ \mathrm{min}\text{ ，补满} & \text{标准潜水站规程}
\end{array}
$$
**使慢充规则定量化的数字。** 忽略瓶壁自身热容的集总热时间常数：自然对流系数 $10\ \mathrm{W / m^{2} K}$、面积 $0.15\ \mathrm{m^{2}}$、气体热容 $m c_v \approx 2 \times 718\ \mathrm{J / K}$，时间常数为
$$
\tau = \frac{m c_v}{h A} = \frac{1{,}436}{10 \times 0.15} = 957\ \mathrm{s} = 16\ \mathrm{min}
$$
所以远短于 $\tau$——几分钟——的充气本质上是绝热的，持续数个 $\tau$ 的充气接近等温。在这个模型里，$90$ 秒充满的 $12\ \mathrm{L}$ 气瓶接近 $419\ \mathrm{K}$；实际上钢制瓶壁吸收了大部分热量，气体终温更低，这就是实测充气温度低于绝热值的原因。
**真正关乎的安全条款。** 一只趁热充到 $200\ \mathrm{bar}$ 的气瓶被留在 $50\ {}^{\circ}\mathrm{C}$ 的太阳下，会达到
$$
P = 200 \times \frac{323}{419} = 154\ \mathrm{bar}\ \text{（从充气温度冷却）} \quad \text{随后} \quad P = 143.1 \times \frac{323}{300} = 154\ \mathrm{bar}
$$
所以对于趁热充满的气瓶，太阳不是危险源，因为气体已冷却到低于充气压力。**危险在于冷态充到工作压力、随后又受热的气瓶**：$20\ {}^{\circ}\mathrm{C}$ 下的 $200\ \mathrm{bar}$ 在 $50\ {}^{\circ}\mathrm{C}$ 时变成 $200 \times 323 / 293 = 220\ \mathrm{bar}$，充气站规程正因此按气体温度限制充气压力。
**合理性检验。** 温度之比是 $\gamma$，因为进入的气体带来焓 $c_p T_i$，储存的气体持有热力学能 $c_v T_2$。同一个热容之比也出现在声速和等熵指数里。
:::
:::

::: history
作为工作对象的**控制体**并不在卡诺（Carnot）那里，他抓住的是气缸里一团固定的空气；它随着 **19 世纪 80、90 年代**的**蒸汽轮机**工程师变得不可或缺——他们必须对一台物质持续穿流的机器做平衡。**组合 $u + P v$** 以"定压热函数"的形式出现在**吉布斯（Gibbs）**的《论非均相物质的平衡》（**1875–78**）中；**焓**（enthalpy）这个名称取自希腊语 *thalpein*（加热），由**海克·卡末林·昂内斯（Heike Kamerlingh Onnes）**在 20 世纪初创造，**1922** 年由**阿尔弗雷德·波特（Alfred W. Porter）**引入英语工程文献，逐渐取代了"总热"和"热含量"。**理查德·莫利尔（Richard Mollier）** **1904** 年的蒸汽焓–熵图，早已使这个量成为涡轮机设计的工作变量。**蒸汽轮机**出自**查尔斯·帕森斯（Charles Parsons）**（反动式，**1884** 年）和**古斯塔夫·德·拉瓦尔（Gustaf de Laval）**（冲动式，配有以他命名的缩放喷嘴，开发于 **19 世纪 80 年代**末），而 $V = \sqrt{2 \Delta h}$ 正是这种喷嘴的设计方程。**雷诺输运定理**——这些平衡式由之导出的普遍陈述——出自**奥斯本·雷诺兹（Osborne Reynolds）**（**1903** 年）。
:::

## 后续内容

稳定流动平衡是 [[thermodynamics/power-cycles]] 以及 [[machine-design]] 与 [[manufacturing]] 中每一台设备的主力方程；它消费的焓列在 [[thermodynamics/pure-substances]] 的表里；这里引入的等熵效率将在 [[thermodynamics/entropy]] 中由熵重新导出，而最后三个算例中毁掉的功是 [[thermodynamics/exergy]] 的主题。

::: summary
- 流动流股携带 $h + V^2/2 + gz$；$h$ 里的 $Pv$ 是流动功，而用 $u$ 写的稳定流动平衡差了 $Pv$。
- 凡速度变化超过约 $70\ \mathrm{m/s}$ 之处保留动能项，而 $g \Delta z$ 除非高度就是机器否则丢掉。
- $h_1 = h_2$ 是节流件的模型而不是管道的模型，而节流量热计在 $4\ \mathrm{MPa}$ 下测不出低于 $0.89$ 的干度。
- 涡轮机的效率是实际功比等熵功，压气机的效率是其倒数；两者都施加在焓差上，绝不施加在压比上。
- 给水泵的功全部进入给水；其中不可逆的部分表现为温升（$6\ \mathrm{MPa}$ 的泵为 $0.36\ \mathrm{K}$），这部分属于泵而不属于省煤器。
- 真空绝热罐充到 $\gamma T_i$；已有部分气体的罐充到 $T_i [P_1 + \gamma (P_2 - P_1)] / P_2$，而按趁热读到的压力停止充气，交付的气体比表读数所示少多达 $29\ \%$。
- 一台没有运动部件的混合室可以在完全照工厂要求办事的同时毁掉 $60\ \mathrm{kW}$ 的功。
:::

::: quiz
一只绝热刚性罐由稳态管路充灌到压力相等。为什么罐内气体最终比气源更热？
- [ ] 入射气流动量带来的压缩加热
- [x] 进入的质量携带着流动功 $Pv$ 而来，它在罐内转化为热力学能
- [ ] 阀门里的摩擦产生了热
- [ ] 不会更热；温度会拉平
::: solution
均流衡算储存**热力学能**，而入流带来**焓**，差额 $Pv$ 总得去一个地方。对真空罐它全部留下：$u_2 = h_i$，所以 $T_2 = \gamma T_i$。真实阀门里也确有一部分功耗散在阀门本身，但那是二阶效应——$120\ \mathrm{K}$ 的温升是流动功，这就是按趁热读到的压力停止充气、交付气体比表读数所示少多达 $29\ \%$ 的原因。
:::
:::

## 习题

::: exercise 流动功 {level=1 check="243"}
给出 $3\ \mathrm{MPa}$、$v = 0.08114\ \mathrm{m^{3} / kg}$ 的蒸汽的流动功，以千焦每千克计。
::: solution
$P v = 3000 \times 0.08114 = 243\ \mathrm{kJ / kg}$。
:::
:::

::: exercise 位能 {level=1 check="0.098"}
给出升高 $10\ \mathrm{m}$ 的比位能变化，以千焦每千克计。
::: solution
$g \Delta z = 9.81 \times 10 = 98\ \mathrm{J / kg} = 0.098\ \mathrm{kJ / kg}$。
:::
:::

::: exercise 动能 {level=1 check="5"}
给出以 $100\ \mathrm{m / s}$ 运动的流股的动能，以千焦每千克计。
::: solution
$V^2 / 2 = 10{,}000 / 2 = 5{,}000\ \mathrm{J / kg} = 5\ \mathrm{kJ / kg}$。
:::
:::

::: exercise 真空罐 {level=1 check="420"}
$300\ \mathrm{K}$ 的空气充入一只真空绝热罐。给出终温度，以开尔文计。
::: solution
$T_2 = \gamma T_i = 1.4 \times 300 = 420\ \mathrm{K}$。
:::
:::

::: exercise 节流 {level=1 check="0"}
对一个绝热、无功、进出口管径相同的节流件，给出 $h_2 - h_1$，以千焦每千克计。
::: solution
$0$——节流守恒焓。
:::
:::

::: exercise 喷嘴 {level=2}
蒸汽以 $2\ \mathrm{MPa}$、$350\ {}^{\circ}\mathrm{C}$、$V_1 = 55\ \mathrm{m / s}$ 进入喷嘴，在 $0.4\ \mathrm{MPa}$ 处离开，该处 $h_{2s} = 2{,}764.6\ \mathrm{kJ / kg}$；$h_1 = 3{,}137.7\ \mathrm{kJ / kg}$，$\eta_N = 0.94$。给出出口速度；并对 $\dot{m} = 3\ \mathrm{kg / s}$、$v_2 = 0.4908\ \mathrm{m^{3} / kg}$，给出出口面积。
::: solution
$$
V_2 = \sqrt{V_1^2 + 2 \eta_N \left( h_1 - h_{2s} \right)} = \sqrt{55^2 + 2 \times 0.94 \times 373{,}100} = \sqrt{3{,}025 + 701{,}428} = 839\ \mathrm{m / s}
$$
$$
A_2 = \frac{\dot{m} v_2}{V_2} = \frac{3 \times 0.4908}{839} = 1.755 \times 10^{- 3}\ \mathrm{m^{2}} = 17.5\ \mathrm{cm^{2}}, \qquad D_2 = 47\ \mathrm{mm}
$$
**合理性检验。** $3\ \mathrm{kg / s}$ 蒸汽只要 $47\ \mathrm{mm}$ 的出口，很小，原因就是速度：若取主管的 $40\ \mathrm{m / s}$，同样的流量在进口状态（$v_1 = 0.1386\ \mathrm{m^{3} / kg}$）下需要 $115\ \mathrm{mm}$ 的管子。**喷嘴的任务是把密度与速度的乘积做大。** 压比 $0.4 / 2 = 0.2$ 远低于蒸汽约 $0.55$ 的临界压比，所以出口是超声速的——$839\ \mathrm{m / s}$ 对比出口状态（$165\ {}^{\circ}\mathrm{C}$）约 $507\ \mathrm{m / s}$ 的声速，马赫数 $1.66$。因此这只喷嘴必须是**缩放（拉瓦尔）喷嘴**，它**已阻塞**，其质量流量由喉部而不是下游压力决定。
:::
:::

::: exercise 压气机 {level=2}
空气在 $0.4\ \mathrm{kg / s}$ 下由 $100\ \mathrm{kPa}$、$293\ \mathrm{K}$ 绝热压缩到 $600\ \mathrm{kPa}$，等熵效率 $0.80$。给出排气温度、功率和熵产。
::: solution
$$
T_{2s} = 293 \times 6^{0.2857} = 293 \times 1.6685 = 488.9\ \mathrm{K}, \qquad
\Delta h_s = 1.005 \times 195.9 = 196.9\ \mathrm{kJ / kg}
$$
$$
\Delta h = \frac{196.9}{0.80} = 246.1\ \mathrm{kJ / kg}, \qquad
T_2 = 293 + \frac{246.1}{1.005} = 537.9\ \mathrm{K} = 264.7\ {}^{\circ}\mathrm{C}
$$
$$
\dot{W} = 0.4 \times 246.1 = 98.4\ \mathrm{kW}
$$
$$
\dot{S}_{\mathrm{gen}} = \dot{m} \left( c_p \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1} \right)
= 0.4 \times \left( 1.005 \ln 1.836 - 0.287 \ln 6 \right) = 0.4 \times \left( 0.6105 - 0.5142 \right) = 0.0385\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = 293.15 \times 0.0385 = 11.3\ \mathrm{kW}
$$
**合理性检验。** 能量平衡精确闭合：$98.4\ \mathrm{kW}$ 轴功率全部表现为焓升，因为 $\Delta \dot H = 0.4 \times 246.1 = 98.4\ \mathrm{kW}$，而它无处可去。所以这 $11.3\ \mathrm{kW}$ **不是一项独立的损失**，而是已交付㶲中被毁掉的那部分——校核在于 $\dot W_{\mathrm{in}} - \Delta \dot H = 0$，而输入的 $98.4\ \mathrm{kW}$ 中有 $T_0 \dot S_{\mathrm{gen}} = 11.3\ \mathrm{kW}$ 不再具有做功能力。
:::
:::

::: exercise 推导 {level=3}
推导真空绝热罐的 $T_2 = \gamma T_i$ 和普遍充灌关系 $m_2 c_v T_2 = m_1 c_v T_1 + \left( m_2 - m_1 \right) c_p T_i$，然后求出绝热放空储罐的可用空气份额，并证明只有当储罐质量足够大时它才趋于等温值。
::: solution
**均流衡算。** 刚性、绝热、无轴功的控制体：
$$
\frac{d \left( m u \right)}{d t} = \dot{m}_i h_i
$$
$h_i$ 为常数，从状态 1 积分到状态 2：
$$
\boxed{ m_2 u_2 - m_1 u_1 = \left( m_2 - m_1 \right) h_i }
$$
**真空情形。** $m_1 = 0$，所以 $u_2 = h_i$，结合 $u = c_v T$、$h = c_p T$：
$$
c_v T_2 = c_p T_i \quad \Rightarrow \quad T_2 = \gamma T_i .
$$
**一般情形。** 由 $m = P V / \left( R T \right)$ 且 $T_1 = T_i$：
$$
\frac{P_2 V}{R} c_v T_2 \cdot \frac{1}{T_2} T_2 = \frac{P_1 V}{R} c_v T_i + \left( \frac{P_2 V}{R T_2} - \frac{P_1 V}{R T_i} \right) c_p T_i
$$
整理得
$$
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2} .
$$
**极限。** $P_1 \to 0$ 给出 $T_2 \to \gamma T_i$；$P_1 \to P_2$ 给出 $T_2 \to T_i$，理所应当。
**绝热放空。** 此时留在罐里的气体可逆膨胀，所以 $T \propto P^{\left( \gamma - 1 \right) / \gamma}$，
$$
m \left( P \right) = \frac{P V}{R T} = \frac{P V}{R T_1} \left( \frac{P}{P_1} \right)^{- \left( \gamma - 1 \right) / \gamma}
= m_1 \left( \frac{P}{P_1} \right)^{1 / \gamma}
$$
**可用份额。** 从 $P_1$ 放空到 $P_0$：
$$
f_{\mathrm{ad}} = 1 - \left( \frac{P_0}{P_1} \right)^{1 / \gamma}, \qquad
f_{\mathrm{iso}} = 1 - \frac{P_0}{P_1}
$$
**数值计算。** $P_1 = 800\ \mathrm{kPa}$，$P_0 = 101.3\ \mathrm{kPa}$：
$$
f_{\mathrm{ad}} = 1 - 0.1266^{0.714} = 1 - 0.2285 = 0.771, \qquad
f_{\mathrm{iso}} = 1 - 0.1266 = 0.873
$$
**比值，以及储罐自身质量为什么要紧。** 比值为 $0.771 / 0.873 = 0.883$，所以绝热储罐**少给 $12\ \%$**。但真实的储罐是**钢**的，而钢是一个热库：钢与空气的质量比为 $180 / 9.29 = 19.4$，钢的比热 $0.46$ 对比空气的 $c_v = 0.718$，钢的热容是空气的 $19.4 \times 0.46 / 0.718 = 12.4$ 倍，所以气体保持在接近等温，
$$
n_{\mathrm{eff}} \approx \frac{\gamma + 12.4}{1 + 12.4} = \frac{13.8}{13.4} = 1.030, \qquad
f = 1 - 0.1266^{1 / 1.030} = 0.866
$$
即等温值的 **$99\ \%$**。
**设计结论。** **钢制储罐是等温的；复合材料或保温很薄的储罐不是。** 碳纤维气瓶的瓶壁质量相对于其中空气少得多，瓶壁导热又差，它介于两个极限之间，放气越快越接近绝热——趋向绝热情形 **$12\ \%$ 的短缺**。这是一个关于压力容器选材的事实，对任何快速放气的压缩空气储能都要紧。
**合理性检验。** 两个极限之所以有差别，是因为留在罐里的气体对离开的气体做了功，而在绝热放空中这个功取自气体自身的热力学能，使它又冷又稠。钢把能量还了回来，所以整个效应是一个穿着热力学问题外衣的传热问题。
:::
:::

::: exercise 设计 {level=3}
为一座带燃气轮机、余热锅炉和区域供热热水回路的 $40\ \mathrm{MW}$ 工业热电联产电厂规定能量与质量平衡、仪表和闭合性检验。
::: solution
**边界与平衡。**
$$
\begin{array}{l l l}
\text{燃气轮机} & \dot{W} = \dot{m}_{\mathrm{fuel}} \mathrm{LHV} - \dot{m}_g \left( h_4 - h_0 \right) - \dot{Q}_{\mathrm{loss}} & \text{轴功率，排气焓} \\
\text{余热锅炉} & \dot{m}_g \left( h_4 - h_5 \right) = \dot{m}_{\mathrm{steam}} \Delta h_{\mathrm{water}} & \text{夹点、端差、烟囱} \\
\text{供热回路} & \dot{Q}_H = \dot{m}_w c_p \Delta T_w & \text{回水温度决定效率} \\
\text{全厂} & \eta_{\mathrm{total}} = \frac{\dot{W} + \dot{Q}_H}{\dot{m}_{\mathrm{fuel}} \mathrm{LHV}} & \text{顾客唯一会读的数字}
\end{array}
$$
**保证点的数值。**
$$
\begin{array}{l c r}
\text{燃料} & 2.95\ \mathrm{kg / s}\ \text{天然气，LHV } 49.8\ \mathrm{MJ / kg} & 146.9\ \mathrm{MW} \\
\text{轴功率} & & 40.0\ \mathrm{MW}\ \left( 27.2\ \% \right) \\
\text{排气} & 180\ \mathrm{kg / s}\ \text{，从 } 540\ {}^{\circ}\mathrm{C}\ \text{到 } 120\ {}^{\circ}\mathrm{C}\text{ ，} c_p \approx 1.10 & 83.2\ \mathrm{MW} \\
\text{蒸汽，} 12\ \mathrm{bar}\text{ ，} 188\ {}^{\circ}\mathrm{C}\text{ ，给水 } 105\ {}^{\circ}\mathrm{C} & 21\ \mathrm{kg / s} & 49.2\ \mathrm{MW} \\
\text{热水} & 320\ \mathrm{kg / s}\ \text{，从 } 70\ {}^{\circ}\mathrm{C}\ \text{到 } 95\ {}^{\circ}\mathrm{C} & 33.5\ \mathrm{MW} \\
\text{烟囱与损失} & & 24.2\ \mathrm{MW}\ \left( 16.5\ \% \right) \\
\hline
\text{总利用率} & & 83.5\ \%
\end{array}
$$
**保证书赖以成立的五台仪表。**
$$
\begin{array}{l l l}
\text{燃料流量} & \text{超声波或科里奥利，} \pm 0.5\ \%\text{ ，配色谱仪定 LHV} & \text{LHV 的 } \pm 0.5\ \%\text{ 是最大单项不确定度} \\
\text{排气流量} & \text{孔板或网格法，} \pm 1.5\ \% & \text{余热锅炉热负荷的主导项} \\
\text{排气温度} & 4\ \text{点冗余热电偶，} \pm 2\ \mathrm{K} & 10\ \mathrm{K}\text{ 的误差就是 } 2.0\ \mathrm{MW}\text{ 的热负荷} \\
\text{蒸汽流量} & \text{孔板，密度由 IF97 给出，} \pm 1\ \% & \\
\text{水流量与 } \Delta T & \text{超声波 } \pm 0.5\ \%\text{ ，配对 PT100 } \pm 0.1\ \mathrm{K} & 25\ \mathrm{K}\text{ 的 } \Delta T\text{ 在 } \pm 0.15\ \mathrm{K}\text{ 下是 } \pm 0.6\ \%
\end{array}
$$
**闭合性检验。** 残差
$$
\varepsilon = \frac{\left| \dot{m}_{\mathrm{fuel}} \mathrm{LHV} - \dot{W} - \dot{Q}_{\mathrm{steam}} - \dot{Q}_{\mathrm{water}} - \dot{Q}_{\mathrm{stack}} \right|}{\dot{m}_{\mathrm{fuel}} \mathrm{LHV}}
$$
必须**低于 $2\ \%$**，而烟囱项要由**烟气分析**（$\mathrm{CO_2}$、$\mathrm{O_2}$、$\mathrm{CO}$、水分）和实测排烟温度算出，不能靠假设的过量空气。
**总出差错的三样东西。** **回水温度**，它由区域管网而不是电厂控制：回水 $80\ {}^{\circ}\mathrm{C}$ 而不是 $70\ {}^{\circ}\mathrm{C}$，会抬高排烟温度、损失数兆瓦的回收热，因为水再也不能把烟气冷却到那么低。**厂用电**，占出力 $1.5$ 到 $2.5\ \%$，从同一条母线取电。**气体成分**，其沃布（Wobbe）指数和 LHV 在一个燃气年内变化 $2\ \%$，必须连续取样而不是假设。
**保护买方的那条注释。** **"保证值应以扣除全部厂用电后的净电端为准，回水温度按 $70\ {}^{\circ}\mathrm{C}$ 计，且试验应在每一个负荷点报告能量平衡残差。"** 毛出力保证书加上假设的回水温度，在一座 $40\ \mathrm{MW}$ 的电厂里值**数兆瓦**，而这两条正是买方工程师必须最先读的条款。
**设计点评。** 一般规律是：**热电联产保证书是一个披着性能数字外衣的边界定义**，而锁定回水温度和厂用电扣除的一方，在机器建成之前就已经锁定了结果。
:::
:::
