熵是工程中唯一一个由**不等式**定义、与热容同单位、没有力学类比、且恰好被一类过程守恒的物性——而那一类过程永不会发生。

它的定义很短：$ds = \delta q_{\mathrm{rev}} / T$。其余全是记账。定义之所以用**可逆**传热，是因为不可逆路径的 $\delta q / T$ 不是物性差；而我们之所以需要物性差，是因为它让第二定律可以被**计数**，而不只是被断言：$\Delta S_{\mathrm{universe}} \ge 0$ 是一个算术陈述，而算术正是本课的主题。

::: warning 七种能通过第一定律检验的熵错误
**沿实际路径计算 $\Delta S$。** 熵是物性，两态之间的 $\Delta S$ 对任何路径都相同——但它必须沿可逆路径**计算**，因为 $\delta q / T$ 只在那里可积。从状态 1 到状态 2 的不可逆绝热膨胀，尽管 $q = 0$ 却有 $\Delta S \ne 0$，计算必须用一条可逆路径从 $1 \to 2$，比如一条等温线加一条等容线。**对闭口系统写 $\Delta S = \int \delta Q / T$ 并称之为熵变。** 那个积分是**随热传递的熵**，而熵变还要**加上**熵产：$\Delta S = \int \delta Q / T + S_{\mathrm{gen}}$。混淆两者是本学科最常见的单个错误，它会让每个真实过程看起来都在毁灭熵。**把理想气体等熵关系式用于真实气体。** $P v^k = $ 常数只对**比热为常数**的理想气体精确成立，$10\ \mathrm{MPa}$、$400\ {}^{\circ}\mathrm{C}$ 的蒸汽偏离它之多，足以把涡轮机出口干度弄错 $0.05$——相当于末级寿命的 $5\ \%$。**请查表。** **丢掉 $- R \ln \left( P_2 / P_1 \right)$ 项。** $\Delta s = c_p \ln \left( T_2 / T_1 \right) - R \ln \left( P_2 / P_1 \right)$ 的两项常常**异号而量级相近**，丢掉第二项会把 $- 0.02$ 的 $\Delta s$ 变成 $+ 0.30$，把一个没有产生任何熵的过程报成在产生熵。**除以系统温度而非边界温度。** 熵传递是 $\delta Q / T_{\mathrm{boundary}}$，当 $800\ \mathrm{K}$ 的气体向 $500\ \mathrm{K}$ 的壁放热时，两种取法相差 $60\ \%$，而这个差额**就是**熵产。**把熵当作“无序”。** 这个词什么忙也帮不上，在混合问题上误导人，而且在最要紧的情形上直接失效：**$0\ \mathrm{K}$ 的完美晶体**熵为零，而**拉伸下的橡皮筋**比松弛时熵更低。熵是**可及微观状态数**的计数，而这个计数才是温度计测到的东西。**以为 $\Delta S_{\mathrm{system}} \ge 0$。** 冰箱内部、制冰格里的水和一切结晶中的熔体都有**负**的熵变，而第二定律由别处更大的正熵变满足。不等式适用于**宇宙**，或适用于系统加上被点名的环境，此外一概不适用。
:::

## 物性及其记账

::: definition 定义与熵平衡 {#def-entropy}
**定义。**
$$
d S \equiv \left( \frac{\delta Q}{T} \right)_{\mathrm{rev}}, \qquad
\Delta S_{12} = \int_1^2 \left( \frac{\delta Q}{T} \right)_{\mathrm{rev}}
$$
**克劳修斯不等式**，对一切循环成立：
$$
\oint \frac{\delta Q}{T} \le 0, \qquad \text{等号成立当且仅当可逆}
$$
**闭口系统的熵平衡。**
$$
\boxed{ \Delta S_{\mathrm{sys}} = \underbrace{\int \frac{\delta Q}{T_{\mathrm{boundary}}}}_{\text{随热传递}} + \underbrace{S_{\mathrm{gen}}}_{\ge 0} }
$$
**控制体的熵平衡。**
$$
\frac{d S_{\mathrm{CV}}}{d t} = \sum \frac{\dot{Q}_j}{T_j} + \sum_{\mathrm{in}} \dot{m} s - \sum_{\mathrm{out}} \dot{m} s + \dot{S}_{\mathrm{gen}}
$$
**稳定流动形式，即实际使用的那一个。**
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{out}} \dot{m} s - \sum_{\mathrm{in}} \dot{m} s - \sum \frac{\dot{Q}_j}{T_j} \ \ge 0
$$
**宇宙。** $\Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{surr}} = S_{\mathrm{gen}} \ge 0$，而**环境**必须点名：对温度为 $T_0$、吸入 $Q_0$ 的热源，$\Delta S_{\mathrm{surr}} = Q_0 / T_0$。
**单位，以及它为何让人别扭。** $\mathrm{kJ / kg \cdot K}$，与比热相同，因为 $d s = c\, d T / T$ 是把热容对温度对数积分。**熵差就是一个热容乘一个对数**，这个数的含义尽在于此。
:::

::: definition 两条 $T ds$ 方程 {#def-tds}
对简单可压缩物质的内部可逆过程联立第一、第二定律：
$$
\boxed{ T\, ds = du + P\, dv }, \qquad
\boxed{ T\, ds = dh - v\, dP }
$$
**为什么它们是本学科最有用的方程。** 它们**不**含任何关于过程、路径或理想气体行为的假设——它们联系的是**物性**，所以对任何物质、经任何过程（可逆与否）到达的任意两个相邻平衡态都成立。
**理想气体的积分。**
$$
s_2 - s_1 = c_v^{\mathrm{avg}} \ln \frac{T_2}{T_1} + R \ln \frac{v_2}{v_1}
= c_p^{\mathrm{avg}} \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1}
$$
**说明第二项为何要紧的数。** 空气从 $100\ \mathrm{kPa}$、$300\ \mathrm{K}$ 等熵压缩到 $800\ \mathrm{kPa}$、$543\ \mathrm{K}$：
$$
\Delta s = 1.005 \ln \frac{543}{300} - 0.287 \ln 8 = 0.5953 - 0.5953 = 0
$$
**丢掉压力项会得到 $+ 0.595\ \mathrm{kJ / kg \cdot K}$**，把一个等熵压缩报成产生了 $0.595\ \mathrm{kJ / kg \cdot K}$ 的熵——**相对误差无穷大**。
**不可压缩物质的积分。**
$$
s_2 - s_1 = c \ln \frac{T_2}{T_1}
$$
**评估。** $100\ \mathrm{kg}$ 水从 $20$ 加热到 $80\ {}^{\circ}\mathrm{C}$：
$$
\Delta S = 100 \times 4.18 \times \ln \frac{353.15}{293.15} = 418 \times 0.1863 = 77.9\ \mathrm{kJ / K}
$$
**相变。** 在定 $T$ 定 $P$ 下，
$$
s_{fg} = \frac{h_{fg}}{T_{\mathrm{sat}}}, \qquad s = s_f + x\, s_{fg}
$$
**让穹顶成为一张图的数。** 水在 $100\ {}^{\circ}\mathrm{C}$：$s_{fg} = 2{,}256.5 / 373.15 = 6.047\ \mathrm{kJ / kg \cdot K}$；在 $10\ \mathrm{kPa}$：$s_{fg} = 2{,}392.1 / 318.93 = 7.499$。**穹顶在低压端更高**，这就是凝汽器的等温线是一条长水平线、而高压锅炉的等温线很短的原因——也是 $T$–$s$ 图上**湿蒸汽区是个三角形而不是半圆**的原因。
:::

::: definition 等熵过程与 $T$–$s$ 图 {#def-isentropic}
**理想气体、比热为常数、$s_2 = s_1$：**
$$
\frac{T_2}{T_1} = \left( \frac{v_1}{v_2} \right)^{k - 1} = \left( \frac{P_2}{P_1} \right)^{\left( k - 1 \right) / k}, \qquad
P v^{k} = \text{常数}
$$
**同一张 $T$–$s$ 图上的四条多变线，按陡峭程度排列。**
$$
\begin{array}{l l l}
s = \text{常数}\ \left(n = k \right) & \text{竖线} & \text{等熵} \\
P v = \text{常数}\ \left(n = 1 \right) & \text{较缓} & \text{对理想气体即等温} \\
v = \text{常数}\ \left(n \to \infty \right) & \text{比等熵更陡} & \text{等容} \\
P = \text{常数}\ \left(n = 0 \right) & \text{最平} & \text{等压}
\end{array}
$$
**这个排序是个好的考题。** 在 $T$–$s$ 图上，**等容线比等熵线陡，等熵线比等压线陡**，而斜率为
$$
\left( \frac{\partial T}{\partial s} \right)_v = \frac{T}{c_v}, \qquad
\left( \frac{\partial T}{\partial s} \right)_P = \frac{T}{c_p}, \qquad
\left( \frac{\partial T}{\partial s} \right)_{\mathrm{rev, adiab}} \to \infty
$$
**让斜率变得有用的数。** 空气在 $300\ \mathrm{K}$ 时，$\left( \partial T / \partial s \right)_v = 300 / 0.718 = 418\ \mathrm{K}$ 每 $\mathrm{kJ / kg \cdot K}$，$\left( \partial T / \partial s \right)_P = 300 / 1.005 = 299$。**定容下熵升 $1\ \mathrm{kJ / kg \cdot K}$ 要付出 $418\ \mathrm{K}$；定压下只付 $299\ \mathrm{K}$**——差额恰是流体在等压情形下做的 $P v$ 功。
**面积法则，即画这张图的理由。** 在 $T$–$s$ 图上：
$$
q_{\mathrm{rev}} = \int T\, ds = \text{路径下方的面积}, \qquad
w_{\mathrm{rev, adiab}} = - \int v\, dP = P \text{–} v \text{ 图上路径左侧的面积}
$$
**对循环设计的推论。** 循环的**净功**等于其**净热**，等于 **$T$–$s$ 图上包围的面积**——所以把循环变好意味着**包围更大的面积**，办法是抬高回路上沿、压低下沿或撑开两侧。发电史上每一次循环改进都是这三个动作之一，而 $T$–$s$ 图是唯一能在机器造出来之前看见这三个动作的地方。
:::

::: definition 熵在哪里产生、产生多少 {#def-gen}
$$
\begin{array}{l l l}
\text{过程} & S_{\mathrm{gen}} & \text{备注} \\
\text{热 } Q \text{ 跨过 } \Delta T & Q \left( 1 / T_c - 1 / T_h \right) & \text{恒为正} \\
\text{节流，理想气体} & m R \ln \left( P_1 / P_2 \right) & \text{等温，故 } \Delta T = 0 \\
\text{自由膨胀至 } n \text{ 倍体积} & m R \ln n & \text{无热无功，} \Delta U = 0 \\
\text{两种理想气体混合} & - m R \sum y_i \ln y_i & \text{混合熵} \\
\text{同种流体在 } T_1, T_2 \text{ 混合} & m c \ln \left[ \frac{T_1 + T_2}{2 \sqrt{T_1 T_2}} \right] & \text{仅当 } T_1 = T_2 \text{ 时为零} \\
\text{电功 } W \text{ 输入温度 } T \text{ 的物体} & W / T & \text{全部被毁损} \\
\text{摩擦功 } W \text{ 于温度 } T & W / T & \text{全部被毁损} \\
\text{燃烧} & \text{很大}\ \left( \sim 1.5\ \mathrm{kJ / kg \cdot K} \right) & \text{任何发动机里最大的单项损失}
\end{array}
$$
**传热情形的评估。** $100\ \mathrm{kJ}$ 从 $800\ \mathrm{K}$ 传到 $400\ \mathrm{K}$：
$$
S_{\mathrm{gen}} = 100 \left( \frac{1}{400} - \frac{1}{800} \right) = 100 \times 0.00125 = 0.125\ \mathrm{kJ / K}, \qquad
W_{\mathrm{dest}} = 300 \times 0.125 = 37.5\ \mathrm{kJ}
$$
**热之潜在功的 $37.5\ \%$ 仅由传热本身毁损**，任何机器还没看到它。把温差减半——$800$ 到 $600\ \mathrm{K}$——得 $100 \times \left( 1 / 600 - 1 / 800 \right) = 0.0417\ \mathrm{kJ / K}$、毁损 $12.5\ \mathrm{kJ}$，只有**三分之一**。
**混合情形的评估。** 两股空气，$2\ \mathrm{kg / s}$ 的 $400\ \mathrm{K}$ 与 $1\ \mathrm{kg / s}$ 的 $300\ \mathrm{K}$，同压，绝热：
$$
T_f = \frac{2 \times 400 + 1 \times 300}{3} = 366.7\ \mathrm{K}
$$
$$
\dot{S}_{\mathrm{gen}} = 2 c_p \ln \frac{366.7}{400} + 1 \times c_p \ln \frac{366.7}{300}
= 2 \times 1.005 \times \left( - 0.0870 \right) + 1.005 \times 0.2027 = 0.0314\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{dest}} = 293.15 \times 0.0314 = 0.98\ \mathrm{kW}
$$
**一个三通管件里毁损了 $1\ \mathrm{kW}$**，它混合 $3\ \mathrm{kg / s}$ 的空气。这等价于一台昼夜不停的 $1\ \mathrm{kW}$ 电热器，而没人察觉的原因是替代方案——**分层**风管——比 $1\ \mathrm{kW}$ 电费更贵。
**终结“免费供冷”争论的数。** 把 $1\ \mathrm{kg / s}$ 的 $35\ {}^{\circ}\mathrm{C}$ 室外空气混入 $4\ \mathrm{kg / s}$ 的 $24\ {}^{\circ}\mathrm{C}$ 送风，毁损为
$$
T_f = \frac{1 \times 308.15 + 4 \times 297.15}{5} = 299.35\ \mathrm{K}
$$
$$
\dot{S}_{\mathrm{gen}} = 1 \times 1.005 \ln \frac{299.35}{308.15} + 4 \times 1.005 \ln \frac{299.35}{297.15}
= - 0.0290 + 0.0296 = 0.0006\ \mathrm{kW / K}
$$
毁损功为 $293.15 \times 0.0006 = 0.18\ \mathrm{W}$——**可忽略**，这就是为什么混合对经济循环是正确答案、而对一股 $400\ \mathrm{K}$ 与一股 $300\ \mathrm{K}$ 的流股是错误答案。**规则是：混合毁损的功与温差的平方成正比**：小温差下 $\dot{S}_{\mathrm{gen}} \approx \dot{m} c_p \left( \Delta T \right)^{2} / \left( 8 T^{2} \right)$，$10\ \mathrm{K}$ 时是 $100\ \mathrm{K}$ 时数值的 $0.0004$，$10\ \mathrm{K}$ 时是 $0.04$。
:::

::: definition 熵、信息与热力学第三定律 {#def-third}
**统计定义。**
$$
S = k_B \ln \Omega, \qquad k_B = 1.380\,649 \times 10^{- 23}\ \mathrm{J / K}
$$
**让两个定义吻合的数。** 一摩尔理想气体占据两倍体积，其可及微观状态数乘以 $2^{N_A}$，于是
$$
\Delta S = k_B N_A \ln 2 = R \ln 2 = 5.763\ \mathrm{J / mol \cdot K}
$$
这**恰好**是等温膨胀的热力学结果 $\Delta S = R \ln \left( V_2 / V_1 \right)$。这一吻合是本学科最深刻的定量结果，由玻尔兹曼（Boltzmann）于 **1877** 年、吉布斯（Gibbs）于 **1902** 年从完全不同的方向各自得到。
**第三定律。** **完美结晶元素或化合物**的熵在 $0\ \mathrm{K}$ 为零，因此绝对熵存在且可列表：
$$
s \left( T, P \right) = \int_0^{T} \frac{c_P}{T}\, d T - \int_{P_0}^{P} \left( \frac{\partial v}{\partial T} \right)_P d P
$$
**说明第三定律不是奇闻的数。** $\mathrm{O_2}$ 在 $298.15\ \mathrm{K}$ 的标准摩尔熵是 $205.15\ \mathrm{J / mol \cdot K}$，[[thermodynamics/mixtures-combustion]] 里的每一个燃烧计算都用到它。没有第三定律，就只存在熵**差**，而化学平衡所需的**绝对**熵将无从获得——这就是能斯特（Nernst）**1906** 年的热定理对化学与第二定律本身同等重要的原因。
**对定律构成限定的残余熵。** 冰、一氧化碳和氧化亚氮在 $0\ \mathrm{K}$ 仍保留**构型**熵，因为它们的分子可以以多种能量相同的方式排列：
$$
S_{\mathrm{res}} = R \ln 2 = 5.76\ \mathrm{J / mol \cdot K}\ \text{对 CO}
$$
**被测量且吻合的数。** 对冰，残余熵为 $R \ln \left( 3 / 2 \right) = 3.37\ \mathrm{J / mol \cdot K}$，由**莱纳斯·鲍林（Linus Pauling）**于 **1935** 年通过计数氢键排列算出，并被量热实验在几个百分点内证实。**第三定律之所以成立，是因为完美晶体是一种理想化，而定律说的就是这个理想化。**
**与信息的联系。** $S = k_B \ln \Omega$ 使熵成为缺失信息的对数，而**兰道尔（Landauer）1961** 年的原理把这一联系操作化：在温度 $T$ 擦除一比特至少耗散
$$
k_B T \ln 2 = 2.87 \times 10^{- 21}\ \mathrm{J} \quad \text{在 } 300\ \mathrm{K}
$$
**使其成为工程问题的数。** 一台 $100\ \mathrm{TFLOP}$ 处理器在 $300\ \mathrm{K}$ 下每秒执行 $10^{14}$ 次不可逆比特操作，其**兰道尔下限**为
$$
10^{14} \times 2.87 \times 10^{- 21} = 0.29\ \mathrm{\mu W}
$$
而实际耗散为 **$10^{5}\ \mathrm{W}$**——相差 **$3 \times 10^{11}$** 倍。**第二定律不是计算的极限；器件物理才是**，而这个差距是信息物理中被引用最多、却最没用的一个数。
:::

::: widget plot
f: 1/x - 1; 0.3*(1/x - 1)
x: 0.40, 0.99
y: 0, 1.6
labels: entropy generated per kJ of heat; destroyed work per kJ at T0 over Th = 0.3
caption: 每千焦热量的熵产，热量自高温热源传向温度为其分数 $x$ 的低温热源，由 $S_{\mathrm{gen}} / Q = 1 / T_c - 1 / T_h$ 以归一化单位给出；下方曲线为同一量乘以 $T_0 / T_h = 0.3$，即**传热所毁损的热之潜在功的份额**。曲线随冷源远离而发散：$x = 0.5$ 时每单位热熵产 $1.0$、毁损潜在功的 $30\ \%$；$x = 0.9$ 时为 $0.11$ 与 $3.3\ \%$；$x = 0.99$ 时为 $0.0101$ 与 $0.3\ \%$。**世界上的每台换热器都是这条曲线上的一个点**，它所在的位置就是设计决策——向左移的代价是换热面积，向右移的代价是燃料。
:::

## 算例

::: example 换热器中的熵产 {#ex-hx}
$2\ \mathrm{kg / s}$ 的油（$c_p = 2.1\ \mathrm{kJ / kg \cdot K}$）从 $150\ {}^{\circ}\mathrm{C}$ 被 $1.5\ \mathrm{kg / s}$、$15\ {}^{\circ}\mathrm{C}$ 进水的逆流换热器冷却到 $60\ {}^{\circ}\mathrm{C}$。求水出口温度、熵产与毁损功。
::: solution
**能量衡算。**
$$
\dot{Q} = 2 \times 2.1 \times \left( 150 - 60 \right) = 378\ \mathrm{kW}
$$
$$
\Delta T_w = \frac{378}{1.5 \times 4.18} = 60.3\ \mathrm{K}, \qquad T_{w,\mathrm{out}} = 75.3\ {}^{\circ}\mathrm{C}
$$
**换热器物理上可行的检验。** 逆流下两端温差为热进端 $150 - 75.3 = 74.7\ \mathrm{K}$、热出端 $60 - 15 = 45\ \mathrm{K}$，故**最小温差为 $45\ \mathrm{K}$**，换热器远未夹点受限。注意热流出口 $60\ {}^{\circ}\mathrm{C}$ 低于冷流出口 $75.3\ {}^{\circ}\mathrm{C}$，这是逆流允许而顺流不允许的。
**熵变。**
$$
\dot{S}_{\mathrm{oil}} = 2 \times 2.1 \times \ln \frac{333.15}{423.15} = 4.2 \times \left( - 0.2339 \right) = - 0.982\ \mathrm{kW / K}
$$
$$
\dot{S}_{\mathrm{water}} = 1.5 \times 4.18 \times \ln \frac{348.45}{288.15} = 6.27 \times 0.1890 = 1.185\ \mathrm{kW / K}
$$
**熵产。**
$$
\dot{S}_{\mathrm{gen}} = 1.185 - 0.982 = 0.203\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{dest}} = 293.15 \times 0.203 = 59.5\ \mathrm{kW}
$$
**结论。** 换热器传递 $378\ \mathrm{kW}$，毁损 $59.5\ \mathrm{kW}$ 可做功的能量——占热流㶲输入的 **$15.7\ \%$**，对油而言热流㶲为
$$
\dot{X}_{\mathrm{oil}} = \dot{m} c_p \left[ \Delta T - T_0 \ln \frac{T_1}{T_2} \right]
= 4.2 \times \left[ 90 - 293.15 \times 0.2339 \right] = 4.2 \times 21.4 = 89.9\ \mathrm{kW}
$$
所以换热器毁损可用㶲的 $59.5 / 89.9 = 66\ \%$，只把 $34\ \%$ 交给水。**换热器是一台效率 $66\ \%$ 的㶲毁灭机**，而对 $45\ \mathrm{K}$ 温差来说这是个**好**数字。
**改进，标上价。** 把温差减半需**面积加倍**，熵产约减半至 $0.10\ \mathrm{kW / K}$，挽回 $29\ \mathrm{kW}$，按 $25\ \text{货币单位 / MWh}$ 折合约每年 **$80{,}000$ 货币单位**的燃料——而多出的换热器造价约 $120{,}000$。**投资回收期十八个月，且换热器仍未夹点受限**，这才是设计用心的正确次序。
**合理性检验。** 油的熵下降而水的熵上升更多，原因是同一份热在**高**温处从油取出、在**低**温处交给水，而 $Q / T$ 在低温处更大。全部熵产都在这个错配里，全部设计功夫都在缩小它。
:::
:::

::: example 节流与膨胀 {#ex-throttle-exp}
$4\ \mathrm{MPa}$、$400\ {}^{\circ}\mathrm{C}$ 的蒸汽膨胀到 $0.4\ \mathrm{MPa}$，先经节流阀，再经等熵涡轮机。比较出口状态、功与毁损功。
::: solution
**进口。** $h_1 = 3{,}213.6\ \mathrm{kJ / kg}$，$s_1 = 6.7690\ \mathrm{kJ / kg \cdot K}$。
**情形 1：节流阀。** $h_2 = h_1 = 3{,}213.6\ \mathrm{kJ / kg}$。$0.4\ \mathrm{MPa}$ 下 $h_g = 2{,}738.1$，故蒸汽**过热**，插值得
$$
T_2 \approx 200\ {}^{\circ}\mathrm{C}, \qquad s_2 \approx 7.9028\ \mathrm{kJ / kg \cdot K}
$$
$$
s_{\mathrm{gen}} = 7.9028 - 6.7690 = 1.1338\ \mathrm{kJ / kg \cdot K}, \qquad
w_{\mathrm{dest}} = 293.15 \times 1.1338 = 332\ \mathrm{kJ / kg}
$$
**情形 2：等熵涡轮机。** $s_2 = s_1 = 6.7690$。$0.4\ \mathrm{MPa}$ 下 $s_g = 6.8958$，故出口为**湿蒸汽**：
$$
x_2 = \frac{6.7690 - 1.7765}{5.1191} = 0.9751, \qquad
h_2 = 604.72 + 0.9751 \times 2{,}133.4 = 2{,}685.1\ \mathrm{kJ / kg}
$$
$$
w_T = 3{,}213.6 - 2{,}685.1 = 528.5\ \mathrm{kJ / kg}, \qquad s_{\mathrm{gen}} = 0
$$
**比较。**
$$
\begin{array}{l c c c}
& h_2 & T_2 & w\ \text{所得} \\
\text{节流阀} & 3{,}213.6 & 200\ {}^{\circ}\mathrm{C} & 0 \\
\text{等熵涡轮机} & 2{,}685.1 & 143.6\ {}^{\circ}\mathrm{C} & 528.5\ \mathrm{kJ / kg}
\end{array}
$$
**节流让蒸汽热 $56\ {}^{\circ}\mathrm{C}$、焓多 $528.5\ \mathrm{kJ / kg}$**——并为此毁损 $332\ \mathrm{kJ / kg}$ 可做功的能量。
**对账，即本例的要害。** 毁损功是 $332\ \mathrm{kJ / kg}$，可得功是 $528.5\ \mathrm{kJ / kg}$，两者**不相等**。差别在于涡轮机的功以 $0.4\ \mathrm{MPa}$ 的出口为基准度量，而节流的毁损以 $100\ \mathrm{kPa}$ 的**环境**为基准：
$$
\psi_1 - \psi_2 = \left( h_1 - h_2 \right) - T_0 \left( s_1 - s_2 \right) = 0 - 293.15 \times \left( - 1.1338 \right) = 332\ \mathrm{kJ / kg}
$$
**决定是否装涡轮机的那个数。** $528.5\ \mathrm{kJ / kg}$ 按例如 $20\ \mathrm{kg / s}$ 的蒸汽量算是 **$10.6\ \mathrm{MW}$** 轴功率，这样一台小型背压涡轮机造价约 $1.5\ \mathrm{MW}$、安装要十八个月。**节流阀不要钱，却每时每刻毁损 $6.6\ \mathrm{MW}$**，按 $60\ \text{货币单位 / MWh}$ 合**每年 $550$ 万货币单位**——而那么多工厂仍在节流，原因是毁损在热质平衡表上看不见，因为**能量**是完美守恒的。
**合理性检验。** 节流后的蒸汽比膨胀后的**更热**，是因为节流保住焓而涡轮机取走焓，而在过热区焓与温度同进退。节流出口过热而涡轮机出口带湿，是同一事实在 $h$–$s$ 图上的读法：从过热态出发的水平线仍是过热，垂直线则落进穹顶。
:::
:::

::: example 混合过程的熵与第二定律 {#ex-mix}
一个刚性绝热的 $0.5\ \mathrm{m^{3}}$ 罐被膜分成相等的两半，一侧是 $500\ \mathrm{K}$、$200\ \mathrm{kPa}$ 的空气，另一侧是 $300\ \mathrm{K}$、$100\ \mathrm{kPa}$。膜破了。求终态、熵产与毁损功。
::: solution
**质量。**
$$
m_A = \frac{200 \times 0.25}{0.287 \times 500} = 0.3484\ \mathrm{kg}, \qquad
m_B = \frac{100 \times 0.25}{0.287 \times 300} = 0.2892\ \mathrm{kg}
$$
**终温。** 刚性且绝热，故 $\Delta U = 0$：
$$
T_f = \frac{m_A T_A + m_B T_B}{m_A + m_B}
= \frac{0.3484 \times 500 + 0.2892 \times 300}{0.6376} = 409.4\ \mathrm{K}
$$
**终压。**
$$
P_f = \frac{\left( m_A + m_B \right) R T_f}{V} = \frac{0.6376 \times 0.287 \times 409.4}{0.5} = 149.9\ \mathrm{kPa}
$$
**熵变，对每份质量沿可逆路径计算。** 每份气体从各自初态 $\left( T, V \right)$ 到达终态 $\left( T_f, V_{\mathrm{each}} \right)$，此时各占据**整个** $0.5\ \mathrm{m^{3}}$：
$$
\Delta S_A = m_A \left[ c_v \ln \frac{T_f}{T_A} + R \ln \frac{V_f}{V_A} \right]
= 0.3484 \left[ 0.718 \ln \frac{409.4}{500} + 0.287 \ln 2 \right]
$$
$$
= 0.3484 \left[ - 0.1404 + 0.1990 \right] = 0.3484 \times 0.0586 = 0.0204\ \mathrm{kJ / K}
$$
$$
\Delta S_B = 0.2892 \left[ 0.718 \ln \frac{409.4}{300} + 0.287 \ln 2 \right]
= 0.2892 \left[ 0.2266 + 0.1990 \right] = 0.1233\ \mathrm{kJ / K}
$$
$$
S_{\mathrm{gen}} = 0.0204 + 0.1233 = 0.1437\ \mathrm{kJ / K}
$$
**毁损功。**
$$
W_{\mathrm{dest}} = 293.15 \times 0.1437 = 42.1\ \mathrm{kJ}
$$
**用独立路径校核。** 从一个假想状态出发——先把两份气体各自可逆地单独变到 $T_f$，再在恒温恒总压下混合——到达同一终态，得到同样的 $0.1437\ \mathrm{kJ / K}$——计算与路径无关，这正是重点。
**解读。** **两个量级相当的贡献**：温度均衡部分与压力均衡（混合）部分。分开算：
$$
\text{仅热混合} = m_A c_p \ln \frac{T_f}{T_A} + m_B c_p \ln \frac{T_f}{T_B} = 0.3484 \times 1.005 \times \left( - 0.1960 \right) + 0.2892 \times 1.005 \times 0.3165 = 0.0599
$$
$$
\text{压力与组分} = 0.1437 - 0.0599 = 0.0838\ \mathrm{kJ / K}
$$
**熵产的 $58\ \%$ 是压力均衡、$42\ \%$ 是温度均衡**——其要紧之处在于：“直接把两股混在一起”的设计师两笔账都付，而先把热股过一遍热机的设计师只付一笔。
**合理性检验。** 罐子绝热而 $S_{\mathrm{gen}}$ 为正，是因为保温阻止的是**传递**而非**产生**，这里的全部熵都是控制体内部两次不受约束的均衡产生的。计算对**两份**气体都用 $\ln \left( V_f / V_A \right) = \ln 2$，是因为每种理想气体都如入无人之境地膨胀充满全罐——**道尔顿（Dalton）定律用于熵**，而它之所以成立，正是**同种**气体的混合熵不是佯谬的原因。
:::
:::

::: example 由熵求等熵效率 {#ex-isen}
压气机里的空气从 $100\ \mathrm{kPa}$、$293\ \mathrm{K}$ 到 $700\ \mathrm{kPa}$、$560\ \mathrm{K}$。求等熵效率、熵产与第二定律效率。
::: solution
**熵变。**
$$
\Delta s = 1.005 \ln \frac{560}{293} - 0.287 \ln 7
= 1.005 \times 0.6490 - 0.287 \times 1.9459 = 0.6522 - 0.5585 = 0.0937\ \mathrm{kJ / kg \cdot K}
$$
**熵产。** 绝热，故 $s_{\mathrm{gen}} = \Delta s = 0.0937\ \mathrm{kJ / kg \cdot K}$，且
$$
w_{\mathrm{dest}} = 293.15 \times 0.0937 = 27.5\ \mathrm{kJ / kg}
$$
**等熵出口温度。**
$$
T_{2s} = 293 \times 7^{0.2857} = 293 \times 1.7160 = 502.8\ \mathrm{K}
$$
**效率。**
$$
\eta_C = \frac{h_{2s} - h_1}{h_2 - h_1} = \frac{1.005 \times \left( 502.8 - 293 \right)}{1.005 \times \left( 560 - 293 \right)} = \frac{210.7}{268.3} = 78.5\ \ \%
$$
**第二定律效率。** 输入功的㶲就是功本身，流股中**收回**的㶲是㶲增量：
$$
\Delta \psi = \Delta h - T_0 \Delta s = 268.3 - 293.15 \times 0.0937 = 268.3 - 27.5 = 240.8\ \mathrm{kJ / kg}
$$
$$
\eta_{\mathrm{II}} = \frac{\Delta \psi}{w_{\mathrm{in}}} = \frac{240.8}{268.3} = 89.7\ \ \%
$$
**两个效率并排看，这就是这一课。** $\eta_C = 78.5\ \%$ 而 $\eta_{\mathrm{II}} = 89.7\ \%$，**第二定律效率更高**。原因是等熵效率把压气机与一台**终止于不同状态的**可逆机器比较——$502.8\ \mathrm{K}$ 的等熵出口——而第二定律效率把它与**同一**出口状态的可逆到达比较。所以等熵效率**因压气机无法避免的升温而惩罚它**，第二定律效率则不会。
**说明差异要紧的数。** 对**涡轮机**，两个效率反向移动：一台膨胀进穹顶的汽轮机 $88\ \%$ 的等熵效率对应约 $93\ \%$ 的第二定律效率，这 $5$ 个点的差距就是涡轮机的性能担保书与其㶲审计对不上、必须向客户解释的原因。
**合理性检验。** $s_{\mathrm{gen}} = \Delta s$ 严格成立，是因为压气机绝热、没有随热传递的熵，平衡只剩两项。熵变**为正但很小**——升温单独贡献的 $\Delta s$ 达 $0.65$，而净的只有 $0.094$——是因为 $\Delta s$ 的两项几乎抵消，而这种近乎抵消正是一次高效压缩在 $h$–$s$ 图上的模样。
:::
:::

::: history
**鲁道夫·克劳修斯（Rudolf Clausius）**于 **1865** 年写下 $d S = \delta Q / T$，并从希腊语 *τροπή*（转动）造了 *Entropie* 一词，好让它“应当与 *Energie*（能量）一词相似”——这个刻意的近音词造成了一百年的混乱，而他自己在同一段里也承认这是个毛病。**统计解读**来自 **1877** 年的**玻尔兹曼（Boltzmann）**，他在维也纳中央公墓的墓碑上刻着 $S = k \log W$——按他本人要求，常数写作 $k$ 而非 $k_B$、写作 $W$ 而非 $\Omega$，这就是每本教科书里的符号其实是墓碑上的符号的原因。**吉布斯（Gibbs）**于 **1902** 年发表系综形式，**普朗克（Planck）**于 **1933** 年把常数补刻到玻尔兹曼墓上，距其导出已五十六年。**第三定律**是**瓦尔特·能斯特（Walther Nernst）1906** 年的成果，来自低温下化学反应不做功、自由能与焓彼此趋同的观察；**马克斯·普朗克（Max Planck）**于 **1911** 年给出其熵表述，而**G. N. 刘易斯（G. N. Lewis）**在 **1930 年代**测量不完善晶体的熵时发现的出入，由**莱纳斯·鲍林（Linus Pauling）**于 **1935** 年通过计数冰的氢键排列、预言 $R \ln (3/2)$ 的残余熵而解决——这是**关于分子的组合论证**先于量热测量而中靶的少数几次之一。**约西亚·威拉德·吉布斯（Josiah Willard Gibbs）**早在 **1875** 年就已注意到两种**全同**气体的混合熵必须为零，由此产生的**吉布斯佯谬**——两种气体只是*极其相似*而非全同时，熵为何发生不连续跳变——只能靠**量子全同性**解决，这就是第三定律与状态计数都在等同一种物理学的原因。**兰道尔（Landauer）1961** 年的原理与**贝内特（Bennett）1982** 年的演示，把圆圈画回到**西拉德（Szilárd）1929** 年的机器——第一台让一个**比特**做热功的机器。
:::

## 后续内容

熵是 [[thermodynamics/exergy]] 背后的机器，是 [[thermodynamics/power-cycles]] 每个循环的纵轴，是 [[thermodynamics/pure-substances]] 列表的那一列物性，也是让 [[thermodynamics/mixtures-combustion]] 的平衡可计算的那个绝对标度。

::: summary
- $ds = \delta q_{\mathrm{rev}} / T$ 定义了一个物性；即使实际路径不可逆，熵变也必须沿可逆路径**计算**。
- $\Delta S = \int \delta Q / T_{\mathrm{boundary}} + S_{\mathrm{gen}}$，两项分别是传递与产生——混淆它们会让真实过程看起来在毁灭熵。
- 两条 $T ds$ 方程对任何物质经任何路径到达的相邻平衡态都成立，这就是它们是本学科使用最多的方程的原因。
- $\Delta s = c_p \ln (T_2 / T_1) - R \ln (P_2 / P_1)$ 有两项异号，丢掉第二项就把等熵线变成了熵产线。
- 有限温差传热、节流、混合、自由膨胀、摩擦与电阻是熵产的六个来源，燃烧是最大的一个。
- 一台温差 $45\ \mathrm{K}$ 的换热器毁损它所传递㶲的三分之二，而这还是个好数字。
- $S = k_B \ln \Omega$ 与第三定律给出绝对熵，没有它们就算不出化学平衡。
:::

::: quiz
气体沿不可逆路径从状态 1 绝热膨胀到状态 2。哪个陈述正确？
- [ ] $\Delta s = 0$，因为没有热穿过边界
- [x] $\Delta s = s_{\mathrm{gen}} > 0$，且必须在相同两态之间沿可逆路径计算
- [ ] $\Delta s < 0$，因为过程不可逆
- [ ] $\Delta s$ 无法确定，因为 $\delta q / T$ 不可积
::: solution
熵平衡为 $\Delta s = \int \delta q / T_{\mathrm{boundary}} + s_{\mathrm{gen}} = 0 + s_{\mathrm{gen}}$，而过程不可逆，故 $s_{\mathrm{gen}} > 0$。熵是**物性**，所以差值由在两个端态之间求 $c_p \ln (T_2 / T_1) - R \ln (P_2 / P_1)$ 得到——一次可逆路径计算——结果就是熵产。这是本章考得最多的概念，而陷阱选项就是混淆**熵传递**与**熵变**的那个。
:::
:::

## 习题

::: exercise 单位 {level=1 check="6.047"}
用 $h_{fg} = 2256.5\ \mathrm{kJ / kg}$ 给出水在 $100\ \mathrm{C}$ 时的汽化熵，单位为千焦每千克开尔文。
::: solution
$s_{fg} = 2256.5 / 373.15 = 6.047\ \mathrm{kJ / kg \cdot K}$。
:::
:::

::: exercise 斜率 {level=1 check="299"}
给出 $300\ \mathrm{K}$、$c_p = 1.005$ 的空气的斜率 $(\partial T / \partial s)_P$，单位为开尔文每千焦每千克开尔文。
::: solution
$T / c_p = 300 / 1.005 = 299\ \mathrm{K}$。
:::
:::

::: exercise 自由膨胀 {level=1 check="0.199"}
给出 $R = 0.287$ 的理想气体自由膨胀至两倍体积时的比熵产，单位为千焦每千克开尔文。
::: solution
$s_{\mathrm{gen}} = R \ln 2 = 0.287 \times 0.6931 = 0.199\ \mathrm{kJ / kg \cdot K}$。
:::
:::

::: exercise 第三定律 {level=1 check="0"}
给出绝对零度下完美结晶元素的熵，单位为焦每摩尔开尔文。
::: solution
$0$——第三定律，绝对熵因此存在。
:::
:::

::: exercise 传热 {level=1 check="37.5"}
$100\ \mathrm{kJ}$ 从 $800\ \mathrm{K}$ 流向 $400\ \mathrm{K}$、环境为 $300\ \mathrm{K}$ 时，给出毁损功，单位为千焦。
::: solution
$S_{\mathrm{gen}} = 100 (1 / 400 - 1 / 800) = 0.125\ \mathrm{kJ / K}$，$W_{\mathrm{dest}} = 300 \times 0.125 = 37.5\ \mathrm{kJ}$。
:::
:::

::: exercise 加热 {level=2}
$c = 4.18$ 的液态水从 $20\ {}^{\circ}\mathrm{C}$ 加热到 $90\ {}^{\circ}\mathrm{C}$，给出熵变，单位为千焦每千克开尔文。
::: solution
$$
\Delta s = 4.18 \ln \frac{363.15}{293.15} = 4.18 \times 0.2144 = 0.896\ \mathrm{kJ / kg \cdot K}
$$
**合理性检验。** 这个数**小于** $c \ln \left( 90 / 20 \right) = 6.53$，后者是在对数里用摄氏温度的错误——差了 **$7.3$** 倍，也是作业里最常见的疏忽之一。**热力学里温度的每一个对数都取绝对温度**，理由是积分是 $\int c\, dT / T$，而不是 $\int c\, d\theta / \left( \theta + \text{某个东西} \right)$。
:::
:::

::: exercise 等熵 {level=2}
$100\ \mathrm{kPa}$、$300\ \mathrm{K}$ 的空气等熵压缩到 $900\ \mathrm{kPa}$。给出出口温度，以及 $k = 1.4$ 时的出口压力–体积比 $v_1 / v_2$。
::: solution
$$
T_2 = 300 \times 9^{0.2857} = 300 \times 1.8729 = 561.9\ \mathrm{K}
$$
$$
\frac{v_1}{v_2} = \left( \frac{P_2}{P_1} \right)^{1 / k} = 9^{1 / 1.4} = 4.888
$$
**合理性检验。** 校核为 $T_2 = 300 \times \left( v_1 / v_2 \right)^{k - 1} = 300 \times 4.888^{0.4} = 300 \times 1.873 = 561.9\ \mathrm{K}$，一致。**两个等熵关系式必须给出同一答案**，若不一致，就是指数写错了——把 $1 / k$ 写成 $k$ 会得到 $v_1 / v_2 = 2.17$、$T_2 = 466\ \mathrm{K}$。
:::
:::

::: exercise 推导 {level=3}
由第一、第二定律导出两条 $T ds$ 方程，然后求出同温同压下两种理想气体的混合熵，并证明当两种气体变得全同时它消失。
::: solution
**第一条 $T ds$ 方程。** 闭口系统、简单可压缩物质、内部可逆过程：
$$
\delta q_{\mathrm{rev}} = du + P\, dv \quad \text{（第一定律）}, \qquad
\delta q_{\mathrm{rev}} = T\, ds \quad \text{（定义）}
$$
$$
\boxed{ T\, ds = du + P\, dv }
$$
**第二条。** 由 $h = u + P v$，故 $dh = du + P\, dv + v\, dP$：
$$
T\, ds = dh - v\, dP
$$
**为什么它们具有普适性。** 两式只联系**物性**，所以虽然沿可逆路径导出，却对任意两个相邻平衡态成立，无论什么过程。这与使 $\Delta U = m c_v \Delta T$ 对理想气体在任何过程中都成立的逻辑相同。
**混合熵。** 两种理想气体，$n_1$ 与 $n_2$ 摩尔，同处 $T$ 与 $P$，混合成 $T$、$P$ 不变、摩尔分数为 $y_i$ 的终态混合物：
$$
\Delta S = - \left( n_1 + n_2 \right) R \sum_i y_i \ln y_i
$$
**推导。** 每种气体从自身体积 $V_i = y_i V$ 等温膨胀到整个 $V$，故
$$
\Delta S_i = n_i R \ln \frac{V}{V_i} = - n_i R \ln y_i
$$
求和即得结果。
**评估。** 把空气当作两种气体的等摩尔混合物：$\Delta S / \left( nR \right) = - \left( 0.5 \ln 0.5 + 0.5 \ln 0.5 \right) = 0.693$，故
$$
\Delta s = 0.693 \times 8.314 = 5.76\ \mathrm{J / mol \cdot K}, \qquad
w_{\mathrm{dest}} = 298.15 \times 5.76 = 1.72\ \mathrm{kJ / mol}
$$
**气体趋于全同的极限。** 对**任何**两种可区分的气体，公式在 $y_1 = y_2 = 0.5$ 处给出**有限**值，而在它们成为同一种气体的瞬间变为**零**。这个不连续就是**吉布斯佯谬**，其解决之道在于认识到混合熵说的是**可区分性**：若没有任何测量能区分两种气体，就不存在能把它们分开的**热力学**路径，$\ln y_i$ 各项便不可用。
**使佯谬具有物理性的数。** 对质量相差 $1\ \%$ 的两种同位素，每摩尔混合物的混合熵仍是 $R \ln 2$，分离功仍是 $1.72\ \mathrm{kJ / mol}$——这就是**同位素分离是热力学问题而非化学问题**的原因，也是重水每千克约值 **$300$ 货币单位**、而普通水不到一分钱的代价的原因。
**合理性检验。** $\Delta S$ 为正的理由，与它**不是**化学相似性的连续函数的理由，是同一个理由：熵数的是**可区分**的排列，而可区分性是一个是或否的问题。量子力学的解决——全同粒子具有对称化的波函数、配分函数中的 $N !$ 因子——就是**吉布斯修正**，没有它理想气体的熵就不是广延量。
:::
:::

::: exercise 设计 {level=3}
为一座 $120\ \mathrm{MW_e}$ 热电联产厂的第二定律审计，规定熵与㶲核算、仪表配置与报告要求。
::: solution
**边界与核算。**
$$
\begin{array}{l c c c c}
\text{部件} & \dot{E}_{\mathrm{in}} & \dot{E}_{\mathrm{out}} & \dot{X}_{\mathrm{dest}} & \eta_{\mathrm{II}} \\
\text{燃烧室} & 210.0 & 205.4 & 42.0 & - \\
\text{燃气轮机} & 205.4 & 168.0 & 12.6 & 89\ \% \\
\text{余热锅炉} & 118.0 & 96.0 & 21.0 & 81\ \% \\
\text{汽轮机} & 96.0 & 78.0 & 6.4 & 88\ \% \\
\text{热网} & 34.0 & 22.0 & 3.0 & 65\ \% \\
\text{烟囱} & 50.4 & - & 50.4 & - \\
\hline
\text{全厂} & 210.0\ \left( \mathrm{LHV} \right) & 120\ \mathrm{MW_e} + 34\ \mathrm{MW_{th}} & 135.4 & 57\ \%
\end{array}
$$
**解读。** **燃烧室与烟囱合计毁损全厂 $135\ \mathrm{MW}$ 毁损量中的 $92\ \mathrm{MW}$——$68\ \%$**——而两者都没有运动部件。花在蒸汽循环效率上的每一个小时，针对的是 $6.4\ \mathrm{MW}$，而 $92\ \mathrm{MW}$ 正躺在一团火焰和一条烟道里。
**审计依赖的四台仪表。**
$$
\begin{array}{l l l}
\text{燃料流量与组分} & \text{科里奥利流量计加在线色谱仪} & \text{LHV 进入每一个数字} \\
\text{烟气组分} & 0.2\ \%\ \mathrm{CO_2}、0.05\ \%\ \mathrm{O_2} & \text{烟囱㶲的 } 60\ \%\ \text{是水蒸气} \\
\text{蒸汽与水流量} & \text{孔板配 IF97 密度，} \pm 0.8\ \% & \\
\text{全部温度} & \text{四线制 PT100，} \pm 0.15\ \mathrm{K}\ \text{现场校准} & 1\ \mathrm{K} \text{ 误差即 } 0.4\ \mathrm{MW}\ \text{㶲}
\end{array}
$$
**三条报告规则。**
$$
\begin{array}{l l}
1 & \text{每个 } \dot{X}_{\mathrm{dest}} \text{ 定位到命名部件，表格总和与全厂总量闭合于 } 2\ \%\ \text{以内} \\
2 & \text{写明死态并报告其敏感性，因为 } 10\ \mathrm{K} \text{ 变化使烟囱项移动 } 6\ \% \\
3 & \text{烟气中水蒸气的潜热㶲单独报告，因为它占烟囱㶲的 } 40\ \%
\end{array}
$$
**按毁损㶲排序的五项改进。**
$$
\begin{array}{l c c}
\text{透平进口温度提高 } 50\ \mathrm{K} & & 6.0\ \mathrm{MW} \\
\text{用冷凝式省煤器把排烟温度降低 } 25\ \mathrm{K} & & 4.5\ \mathrm{MW} \\
\text{余热锅炉夹点从 } 12\ \text{降到 } 8\ \mathrm{K} & & 3.2\ \mathrm{MW} \\
\text{凝汽器压力降低 } 1\ \mathrm{kPa} & & 1.4\ \mathrm{MW} \\
\text{热网供水温度降低 } 5\ \mathrm{K} & & 1.1\ \mathrm{MW}
\end{array}
$$
**保护买方的条款。** **“审计报告须按部件报告毁损㶲，表格与全厂总量闭合于 $2\ \%$ 以内；须写明死态及其敏感性；须按毁损㶲而非节能量对改进排序。”**
**设计点评。** 一般规则是：**第一定律审计告诉你能量去了哪里，第二定律审计告诉你钱在哪里**，而在热平衡已被认为很好的厂里，两个答案相差一个数量级。
:::
:::
