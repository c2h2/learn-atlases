热力学第一定律只有一句话：**能量守恒，而系统所含能量的变化等于越过其边界的量。** 这句话里所有困难的部分都在后半句，因为越过边界的量不是性质、不是状态函数，而且取决于路径、边界和时钟。

闭口系统——**控制质量**——是学习这一定律的地方，因为没有物质以物质的形式越过边界，剩下的两种穿越——热量和功——可以被分开抓住。把闭口系统的衡算做对，控制体的版本只是多一项；把它做错，下游的每一个循环、每一个效率、每一份保证书都会继承这个错误。

::: warning 七个会一路混进答案里的能量衡算错误
**对一个带移动边界的系统套用 $\Delta U = Q - W$，却忘记 $W$ 包括一切。** $P\,dV$ 功、搅拌器功、轴功、弹簧功、电功和拉伸表面膜的功都越过同一个边界，都带同一个符号。一个先积分 $P\,dV$、再把 $-5\ \mathrm{kJ}$ 的搅拌项带错符号加进去的计算，犯的是一个错误，产出的是两个错误。 **在适用范围之外使用 $\Delta U = m c_v \Delta T$。** 它对**理想气体**、对**不可压缩的固体或液体**是精确的；对真实气体是**错的**，在两相穹顶内更是**灾难性地错**——那里 $\Delta T = 0$ 而 $\Delta U$ 是 $2{,}000\ \mathrm{kJ / kg}$。 **对真实物质的定压过程使用 $\Delta H = m c_p \Delta T$，然后又写 $Q = \Delta U$。** 对定压的闭口系统，$Q = \Delta H$ **只有当**唯一的功是 $P\,dV$ 时才成立；这两个陈述是同一个陈述，两个都写就是重复计数。 **不作校核就丢掉 $\Delta KE$ 和 $\Delta PE$。** 对气缸里的气体它们可以忽略，而对涡轮机、喷嘴或抽水蓄能电站它们是**全部答案**：$100\ \mathrm{m / s}$ 是 $5\ \mathrm{kJ / kg}$ 的动能，它是汽轮机焓降的 $1.25\ \%$，却是喷嘴用途的 $100\ \%$。 **以为 $W = \int P\,dV$ 里的 $P$ 是系统压力。** 功是**对抗外界**做的，正确的被积函数是**活塞内表面**上的压力。在快速膨胀中两者相差 $10$ 到 $30\ \%$；而在向真空的自由膨胀中，系统压力是 $200\ \mathrm{kPa}$ 而功是**零**。 **在符号约定之间骑墙。** $Q_{\mathrm{in}} - W_{\mathrm{out}} = \Delta E$ 和 $\Delta E = Q_{\mathrm{net,in}} + W_{\mathrm{net,in}}$ 都是对的，区别在于每一个功项的符号。选定一个，写在纸页顶端，绝不在同一个解答里混用。 **忘记循环会回到起点。** 在一个循环中 $\Delta U = \Delta KE = \Delta PE = 0$，所以 $\oint \delta Q = \oint \delta W$ **精确成立**——而一个净功不等于净热的循环计算，有的是算术错误，不是物理洞见。
:::

## 衡算式及其各项

::: definition 闭口系统的能量平衡 {#def-balance}
$$
E_2 - E_1 = Q - W, \qquad
E = U + \mathrm{KE} + \mathrm{PE} = m \left( u + \frac{V^{2}}{2} + g z \right)
$$
约定为**$Q$ 以进入系统为正**、**$W$ 以离开系统为正**。以速率形式，
$$
\frac{d E}{d t} = \dot{Q} - \dot{W}
$$
**三项，以及每一项何时可以丢掉。**
$$
\begin{array}{l l l}
\Delta U & \text{热、化学、核} & \text{对闭口系统永不丢掉} \\
\Delta \mathrm{KE} = \tfrac{1}{2} m \left( V_2^2 - V_1^2 \right) & \text{整体运动} & \text{系统始末静止时丢掉} \\
\Delta \mathrm{PE} = m g \left( z_2 - z_1 \right) & \text{高度} & \text{对气体，} \Delta z < 100\ \mathrm{m} \text{ 时丢掉}
\end{array}
$$
**为"丢掉"正名的数字。** 对 $1\ \mathrm{kg}$ 气体，举高 $10\ \mathrm{m}$ 花费 $0.098\ \mathrm{kJ}$，而典型的 $\Delta U$ 是 $100\ \mathrm{kJ}$——影响 **$0.1\ \%$**。对抽水蓄能电站里 $1\ \mathrm{kg}$ 的**水**，$100\ \mathrm{m}$ 是 $0.98\ \mathrm{kJ}$，而 $\Delta U$ 基本为零，所以势能是**全部**，热力学能一无所有。**丢掉与否是关于应用的陈述，不是关于该项的陈述。**
**循环形式。** 对循环，每绕一周 $\Delta E = 0$：
$$
\oint \delta Q = \oint \delta W \qquad \text{（能量守恒；第二定律会说这还不够）}
$$
**关于全微分的陈述。** $\delta Q$ 和 $\delta W$ 是非精确微分；$dU$、$dV$、$dS$ 是精确微分。其数学标志是：对热机 $\oint \delta Q \ne 0$，而 $\oint dU = 0$ 永远成立；这正是**性质**可以列表而**传递量**不能列表的原因。
:::

::: definition 功的几种方式 {#def-work}
$$
\begin{array}{l l l}
\text{边界功} & W_b = \displaystyle\int_{1}^{2} P_{\mathrm{int}}\, dV & \text{仅限准平衡} \\
\text{多变过程} & W_b = \dfrac{P_2 V_2 - P_1 V_1}{1 - n} = \dfrac{m R \left( T_2 - T_1 \right)}{1 - n},\ n \ne 1 & \\
\text{等温理想气体} & W_b = m R T \ln \left( V_2 / V_1 \right) = m R T \ln \left( P_1 / P_2 \right) & \\
\text{定压过程} & W_b = P \left( V_2 - V_1 \right) & \\
\text{定容过程} & W_b = 0 & \\
\text{弹簧加载活塞} & W_b = P_0 \left( V_2 - V_1 \right) + \tfrac{1}{2} k x^{2},\ x = \Delta V / A & \\
\text{轴功} & W = 2 \pi N T = \omega T & \\
\text{电功} & W = \displaystyle\int V I\, dt\text{ ；电阻加热器给出 } W = - V I \Delta t & \text{功输入，故 } W \text{ 为负} \\
\text{弹性杆} & W = \displaystyle\int F\, dx = \tfrac{1}{2} \frac{F^{2} L}{A E} & \\
\text{表面膜} & W = \sigma_s \Delta \mathcal{A} & \\
\text{搅拌器} & W = 2 \pi N T & \text{全部最终变成热力学能}
\end{array}
$$
**弹簧加载活塞，即一只真实安全阀的功。** 对面积为 $A$ 的活塞、预紧压力 $P_0$（大气压加活塞自重）和刚度为 $k$ 的弹簧，
$$
P \left( x \right) = P_0 + \frac{k x}{A}, \qquad V = A x, \qquad
W_b = \int_0^x \left( P_0 + \frac{k x'}{A} \right) A\, d x' = P_0 \Delta V + \frac{1}{2} k x^{2}
$$
而行程终了时的压力是 $P_0 + k x / A$。**弹簧储存 $\tfrac{1}{2} k x^{2}$ 并会把它交还**；$P_0 \Delta V$ 那部分是举高大气做的，一去不返。
**自由膨胀。** 一团压力为 $P_1$ 的气体向一个抽真空的绝热刚性容器膨胀。$V$ 固定，所以 $W = 0$；绝热，所以 $Q = 0$；刚性，所以 $\Delta KE = \Delta PE = 0$。因此
$$
\Delta U = 0, \qquad T_2 = T_1\ \text{（理想气体）}, \qquad P_2 = P_1 \frac{V_1}{V_1 + V_{\mathrm{vac}}}
$$
**而这个过程是不可逆的**——第一定律看不见这一点，第二定律会按 $T_0 S_{\mathrm{gen}} = m R T_0 \ln \left[ \left( V_1 + V_{\mathrm{vac}} \right) / V_1 \right]$ 给被毁掉的功定价。
:::

::: definition 比热容与两个能量差 {#def-cv}
$$
c_v \equiv \left( \frac{\partial u}{\partial T} \right)_v, \qquad c_p \equiv \left( \frac{\partial h}{\partial T} \right)_P, \qquad h \equiv u + P v
$$
**焦耳（Joule）的洞见，以及它为什么是定律而不是近似。** 对**理想气体**，$u$ 只是 $T$ 的函数——由焦耳 **1845** 年的自由膨胀测量（在盖-吕萨克 1807 年的实验之后）在实验上确立：气体向真空膨胀时温度的变化小于他的温度计的分辨率；由 $P = R T / v$ 下的 $\left( \partial u / \partial v \right)_T = T \left( \partial P / \partial T \right)_v - P = 0$ 在理论上确立。因此
$$
\boxed{ \Delta u = \int_{1}^{2} c_v \left( T \right) d T \quad \text{与} \quad \Delta h = \int_{1}^{2} c_p \left( T \right) d T \quad \text{对理想气体，沿任何过程} }
$$
而 $c_v$ 和 $c_p$ 下标里的 $v$ 和 $P$ 是**历史偶然**：它们命名的是热容被测量时所处的条件，而不是公式适用的过程。
**对不可压缩物质** $c_v = c_p \equiv c$，且
$$
\Delta u \approx c \Delta T, \qquad \Delta h \approx c \Delta T + v \Delta P
$$
**对真实物质**两者都不成立，$\Delta u$ 和 $\Delta h$ 要从表里查。
**对空气的三种精度等级。**
$$
\begin{array}{l c c c}
\text{方法} & \Delta h \left[ 300 \to 1{,}200\ \mathrm{K} \right] & \text{误差} & \text{适用} \\
\text{常数 } c_p = 1.005 & 904.5\ \mathrm{kJ / kg} & - 7.5\ \% & T \text{ 在 } \pm 100\ \mathrm{K} \text{ 以内} \\
\text{平均温度 } 750\ \mathrm{K} \text{ 下的 } c_p = 1.087 & 978.3\ \mathrm{kJ / kg} & + 0.1\ \% & T \text{ 在 } \pm 500\ \mathrm{K} \text{ 以内} \\
\text{空气表} & 977.6\ \mathrm{kJ / kg} & - & \text{范围超过 } 500\ \mathrm{K} \text{ 的一切场合}
\end{array}
$$
**动理论数值，它们解释了这张表。**
$$
\begin{array}{l c c c c}
\text{分子模型} & c_v / R & c_p / R & \gamma & \text{例} \\
\text{单原子} & 3 / 2 & 5 / 2 & 1.667 & \text{He、Ar、Ne} \\
\text{双原子，冷} & 5 / 2 & 7 / 2 & 1.400 & 300\ \mathrm{K} \text{ 的空气} \\
\text{双原子，热} & \to 7 / 2 & \to 9 / 2 & \to 1.29 & 2{,}000\ \mathrm{K} \text{ 以上的空气} \\
\text{非线性多原子} & 3 & 4 & 1.33 & \text{中等温度下的 } \text{H}_2\text{O、CO}_2
\end{array}
$$
**说明 $\gamma$ 为什么随温度下降的数字。** 空气的 $\gamma$ 在 $300\ \mathrm{K}$ 是 $1.400$，$600\ \mathrm{K}$ 是 $1.377$，$1{,}000\ \mathrm{K}$ 是 $1.337$，$1{,}500\ \mathrm{K}$ 是 $1.311$，$2{,}500\ \mathrm{K}$ 是 $1.290$，因为振动模态逐步解锁，每一个都吞掉能量而不升高温度。在 $2{,}400\ \mathrm{K}$ 的燃烧温度下仍取 $\gamma = 1.40$ 的奥托（Otto）循环计算会明显高估膨胀功，标准的补救办法是**变比热空气标准**假设——用的是表，不是常数 $\gamma$。
:::

::: definition 定容热与定压热 {#def-qp}
**定容、闭口系统、无功：**
$$
Q_v = \Delta U = m \left( u_2 - u_1 \right)
$$
**定压、闭口系统、只有 $P\,dV$ 功：**
$$
Q_P = \Delta U + P \Delta V = \Delta H = m \left( h_2 - h_1 \right)
$$
**两者不是二选一。** $Q_v$ 和 $Q_P$ 是**同一个** $\Delta U$ 加减功，而对理想气体，差值 $Q_P - Q_v = P \Delta V = m R \Delta T$ 恰恰就是 $c_p - c_v = R$ 的定义。
**使弹式量热计读数偏低的数字。** 煤在定容下燃烧给出 $Q_v$；同一批煤在炉子里燃烧给出 $Q_P$，两者之差是每摩尔燃料的 $\Delta n_g R T$——对碳到二氧化碳 $\Delta n_g = 0$，没有差别；但对氢到水蒸气 $\Delta n_g = - 0.5$，定压下放出的热比定容下多 $0.5\, \bar{R} T$，在 $298\ \mathrm{K}$ 下为 $1{,}240\ \mathrm{kJ / kmol}$，约为发热量的 **$0.5\ \%$**。更大的修正来自**生成水在弹内凝结**：每千克水 $2{,}442\ \mathrm{kJ}$ 的效应使高位与低位发热量相差约 **$11\ \%$**（甲烷）和 $7\ \%$（汽油）。
**相变情形，$\Delta T = 0$。** 把 $400\ \mathrm{kPa}$ 的 $2\ \mathrm{kg}$ 饱和水从 $x = 0.3$ 蒸发到 $x = 1$：
$$
Q = m \left( h_2 - h_1 \right) = 2 \times \left( 2{,}738.1 - 1{,}244.7 \right) = 2{,}987\ \mathrm{kJ}
$$
$$
W = P \Delta V = 400 \times 2 \times \left( 0.46242 - 0.13949 \right) = 258\ \mathrm{kJ}
$$
$$
\Delta U = m \left( u_2 - u_1 \right) = 2 \times \left( 2{,}553.1 - 1{,}188.9 \right) = 2{,}728\ \mathrm{kJ} = Q - W\ \checkmark
$$
**热量只有 $9\ \%$ 以膨胀功的形式离开，$91\ \%$ 留作热力学能**——而温度从未改变，正是这个事实把 $c \Delta T$ 模型一枪毙命。
:::

::: widget plot
f: ln(x); (1-pow(x,-0.4))/0.4
x: 1, 8
y: 0, 2.4
labels: isothermal W/mRT1; adiabatic W/mRT1
caption: 理想气体膨胀的可逆边界功，以 $m R T_1$ 归一化，对体积比 $V_2 / V_1$ 作图。等温曲线是 $\ln \left( V_2 / V_1 \right)$，绝热曲线是 $\left[ 1 - r^{1 - \gamma} \right] / \left( \gamma - 1 \right)$，取 $\gamma = 1.4$。在体积比 $8$ 处，等温膨胀比绝热膨胀多给出 **$47\ \%$** 的功，因为输入的热量维持了压力。同一种气体，体积上相同的始末状态，功却差 $1.47$ 倍——这就是为什么"膨胀功"这个词在路径被说明之前毫无意义。
:::


## 算例

::: example 弹簧加载的活塞 {#ex-spring}
面积 $A = 0.010\ \mathrm{m^{2}}$、质量 $100\ \mathrm{kg}$ 的活塞上放着一根刚度 $k = 10\ \mathrm{kN / m}$ 的线性弹簧，初始恰好接触。下方的气体处于 $100\ \mathrm{kPa}$、$0.005\ \mathrm{m^{3}}$；加热直到体积达到 $0.015\ \mathrm{m^{3}}$。求终压力、边界功以及对抗大气所做的功所占的比例。
::: solution
**预紧压力。** 使活塞对抗大气浮起所需的压力是
$$
P_0 = P_{\mathrm{atm}} + \frac{m g}{A} = 101.325 + \frac{100 \times 9.81}{0.010 \times 1000} = 101.325 + 98.1 = 199.4\ \mathrm{kPa}
$$
**初始状态并不在 $P_0$。** 气体压力是 $100\ \mathrm{kPa}$，所以活塞**压在限位挡块上**，在压力达到 $199.4\ \mathrm{kPa}$ 之前体积无法改变。
**第一阶段，定容。** 在 $V = 0.005\ \mathrm{m^{3}}$ 下 $100 \to 199.4\ \mathrm{kPa}$：
$$
W_1 = 0
$$
**第二阶段，弹簧被压缩。** 位移是
$$
x = \frac{\Delta V}{A} = \frac{0.010}{0.010} = 1.00\ \mathrm{m}
$$
终压力是
$$
P_3 = P_0 + \frac{k x}{A} = 199.4 + \frac{10 \times 1.00}{0.010} = 199.4 + 1{,}000 = 1{,}199.4\ \mathrm{kPa}
$$
**第二阶段的功。**
$$
W_2 = P_0 \Delta V + \frac{1}{2} k x^{2} = 199.4 \times 10 + 0.5 \times 10 \times 1.00^{2} = 1{,}994 + 5{,}000 = 6{,}994\ \mathrm{J} = 6.99\ \mathrm{kJ}
$$
**用梯形校核。**
$$
W_2 = \frac{P_2 + P_3}{2} \Delta V = \frac{199.4 + 1{,}199.4}{2} \times 0.010 = 6.99\ \mathrm{kJ}\ \checkmark
$$
**拆分。**
$$
\frac{P_0 \Delta V}{W_2} = \frac{1{,}994}{6{,}994} = 28.5\ \%\ \text{对抗预载}, \qquad
71.5\ \%\ \text{储存在弹簧里}
$$
**解释。** 对抗预载的 $28.5\ \%$ 中，$P_{\mathrm{atm}} \Delta V = 101.3 \times 0.010 = 1.01\ \mathrm{kJ}$（功的 $14.5\ \%$）用于推开大气，$0.98\ \mathrm{kJ}$（$14.0\ \%$）用于举起活塞；其余 $71.5\ \%$ 储存在弹簧里。弹簧和被举高的活塞会在回程交还它们那一份；对大气所做的功是永远不能成为有用功的部分，所以在计算膨胀的有用功时要把它扣除（见 [[thermodynamics/exergy]]）。
**若气体是空气、初温 $300\ \mathrm{K}$，温度是多少**——这是一个警示而不是结果。质量固定时，$T_3 = T_1 \left( P_3 V_3 \right) / \left( P_1 V_1 \right) = 300 \times \left( 1{,}199.4 \times 0.015 \right) / \left( 100 \times 0.005 \right) = 300 \times 36.0 \approx 10{,}800\ \mathrm{K}$。没有哪一份真实气体能被加热到这个温度：对着一根硬弹簧把体积增加到三倍，需要十二倍的压力升高，而理想气体定律把它变成了 $36$ 倍的温度升高。这组数字适合做干净的功计算，但真实设计会用更软的弹簧、更短的行程或更多的气体。
**合理性检验。** 初始压力 $100\ \mathrm{kPa}$ 低于 $P_0$，所以活塞在开始时必须**压在限位挡块上**。一个从 $100\ \mathrm{kPa}$ 起积分 $\int P\,dV$ 的解法，等于假设活塞在一个它根本浮不起来的压力下浮动，而它在这里仍得到 $6.99\ \mathrm{kJ}$，只是因为第一阶段体积变化为零。若换成一个第一阶段有体积变化的问题，这份运气就不灵了。
:::
:::

::: example 带限位挡块的活塞 {#ex-stops}
一带限位挡块的气缸在 $0.15\ \mathrm{m^{3}}$ 处限位，内装 $0.5\ \mathrm{kg}$、$200\ \mathrm{kPa}$、$0.10\ \mathrm{m^{3}}$ 的空气。顶起挡块需要 $400\ \mathrm{kPa}$。加热直到压力达到 $600\ \mathrm{kPa}$。求功、热量和总温升。
::: solution
**三个阶段。** 定容升压到 $400\ \mathrm{kPa}$；定压膨胀到 $0.15\ \mathrm{m^{3}}$；定容升压到 $600\ \mathrm{kPa}$。
**各温度。** $T_1 = P_1 V_1 / \left( m R \right) = 200 \times 0.10 / \left( 0.5 \times 0.287 \right) = 139.4\ \mathrm{K}$。
$$
T_2 = T_1 \frac{P_2}{P_1} = 278.7\ \mathrm{K}, \qquad
T_3 = T_2 \frac{V_3}{V_2} = 278.7 \times 1.5 = 418.1\ \mathrm{K}, \qquad
T_4 = T_3 \frac{P_4}{P_3} = 627.2\ \mathrm{K}
$$
**功。** 只有第二阶段做边界功：
$$
W = P \left( V_3 - V_2 \right) = 400 \times \left( 0.15 - 0.10 \right) = 20.0\ \mathrm{kJ}
$$
**热量。** 取 $c_v = 0.718$、$c_p = 1.005$：
$$
Q_{1 2} = m c_v \left( T_2 - T_1 \right) = 0.5 \times 0.718 \times 139.3 = 50.0\ \mathrm{kJ}
$$
$$
Q_{2 3} = m c_p \left( T_3 - T_2 \right) = 0.5 \times 1.005 \times 139.4 = 70.1\ \mathrm{kJ}
$$
$$
Q_{3 4} = m c_v \left( T_4 - T_3 \right) = 0.5 \times 0.718 \times 209.1 = 75.1\ \mathrm{kJ}
$$
$$
Q_{\mathrm{total}} = 195.2\ \mathrm{kJ}
$$
**用第一定律校核。**
$$
\Delta U = m c_v \left( T_4 - T_1 \right) = 0.5 \times 0.718 \times 487.8 = 175.1\ \mathrm{kJ}, \qquad
Q - W = 195.2 - 20.0 = 175.2\ \mathrm{kJ}\ \checkmark
$$
**要紧的数字。** 功是热量的 **$10\ \%$**，而且全部做在**中间**阶段。一个在挡块处被停住、而不是被允许顶起挡块的过程，需要同样 $175.1\ \mathrm{kJ}$ 的热力学能变化，却**不**输出任何功——这就是**奥托（Otto）**循环的定容燃烧与**狄塞尔（Diesel）**循环的定压燃烧之间的区别，被压缩进一个气缸里。
**$P$–V 图的教训。** 路径下的面积是 $20.0\ \mathrm{kJ}$，而从状态 1 到状态 4 的**直线**下的面积是 $\tfrac{1}{2} \left( 200 + 600 \right) \times 0.05 = 20.0\ \mathrm{kJ}$——碰巧相同，因为梯形和矩形在这里恰好一致。**不要拿这个当校核。**
**合理性检验。** 第二阶段出现 $c_p$、第一和第三阶段出现 $c_v$，原因不在于过程是定压或定容，而在于 $\Delta H = m c_p \Delta T$ 是定压段（那里 $Q = \Delta H$）最方便的记账方式；第二阶段的热力学能变化仍是 $m c_v \Delta T = 50.0\ \mathrm{kJ}$，剩下的 $20.1\ \mathrm{kJ}$ 就是功。
:::
:::

::: example 绝热容器中的搅拌器 {#ex-paddle}
一个绝热刚性 $2\ \mathrm{m^{3}}$ 容器装有 $200\ \mathrm{kPa}$、$300\ \mathrm{K}$ 的空气。外部电机驱动的搅拌器以 $100\ \mathrm{W}$ 运转 $30$ 分钟。求终温度和终压力，以及㶲（exergy）毁损量。
::: solution
**质量。**
$$
m = \frac{P_1 V}{R T_1} = \frac{200 \times 2}{0.287 \times 300} = 4.646\ \mathrm{kg}
$$
**能量输入。** 绝热、刚性，所以 $Q = 0$、$W_b = 0$；唯一的传递是轴功，方向**进入**系统：
$$
W_{\mathrm{sh}} = - \dot{W} \Delta t = - 0.100 \times 1{,}800 = - 180\ \mathrm{kJ}
$$
**衡算。** $\Delta U = Q - W = 0 - \left( - 180 \right) = + 180\ \mathrm{kJ}$。
$$
\Delta T = \frac{180}{m c_v} = \frac{180}{4.646 \times 0.718} = 54.0\ \mathrm{K}
$$
$$
T_2 = 354.0\ \mathrm{K} = 80.8\ {}^{\circ}\mathrm{C}, \qquad
P_2 = P_1 \frac{T_2}{T_1} = 200 \times 1.180 = 236.0\ \mathrm{kPa}
$$
**㶲毁损。** 功被完全转化成了温度从 $300$ 升到 $354\ \mathrm{K}$ 的热力学能，熵产为
$$
S_{\mathrm{gen}} = m \left( s_2 - s_1 \right) = m \left[ c_v \ln \frac{T_2}{T_1} + R \ln \frac{v_2}{v_1} \right] = 4.646 \times 0.718 \times \ln 1.180 = 0.552\ \mathrm{kJ / K}
$$
$$
X_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 293.15 \times 0.552 = 162\ \mathrm{kJ}
$$
**判决。** 输入的 $180\ \mathrm{kJ}$ **纯功**中，**$162\ \mathrm{kJ}$——$90\ \%$——已被毁掉**，只剩 $18\ \mathrm{kJ}$ 尚可回收。可回收的部分是一台可逆机在把空气冷却回环境温度的过程中所能提取的功，它之所以小，是因为温升小。
**这个例子说明的普遍规律。** **在温度 $T$ 下耗散进热力学能的功，保留约 $1 - T_0 / \bar{T}$ 的㶲份额**，对 $54\ \mathrm{K}$ 的温升就是 $1 - 293 / 327 = 10\ \%$。同样 $180\ \mathrm{kJ}$ 以电能形式充入电池则保留 $100\ \%$，以 $900\ \mathrm{K}$ 的热量形式给出则保留 $67\ \%$。
**决定一台真实机器尺寸的数字。** **制动测功器**吸收电机输出的方式恰恰就是这个：轴功变成空气、水或油的热力学能。它全部的设计难题就是那 $90\ \%$ 已变成低品位热、必须带走的热量，而它的全部铭牌参数是**冷却水流量**，不是转矩。
**合理性检验。** 答案之所以不是"加入了 $180\ \mathrm{kJ}$ 的热量"，是因为**根本没有加入热量**——容器是绝热的——而温度却升高了。温度变化和传热不是同一种现象，而这个例子是本学科中对 $\Delta T$ 关于 $Q$ 什么也说明不了这一点最干净的演示。
:::
:::

::: example 两个容器，一个抽真空 {#ex-free}
一个 $3\ \mathrm{m^{3}}$ 的容器装有 $500\ \mathrm{kPa}$、$350\ \mathrm{K}$ 的空气；它经一个阀门与一个抽真空的绝热 $5\ \mathrm{m^{3}}$ 容器相连。打开阀门。求终温度、终压力，以及本可以获得的功。
::: solution
**系统。** 两个容器整体。刚性，所以 $W = 0$；绝热，所以 $Q = 0$；没有质量越过边界，所以是闭口系统。
$$
\Delta U = 0 \quad \Rightarrow \quad T_2 = T_1 = 350\ \mathrm{K}\ \text{（理想气体）}
$$
**终压力。**
$$
m = \frac{500 \times 3}{0.287 \times 350} = 14.93\ \mathrm{kg}, \qquad
P_2 = \frac{m R T_2}{V_{\mathrm{tot}}} = \frac{500 \times 3}{8} = 187.5\ \mathrm{kPa}
$$
**本可以获得的功。** 在相同始末状态之间作可逆**等温**膨胀：
$$
W_{\mathrm{rev}} = m R T \ln \frac{V_2}{V_1} = 14.93 \times 0.287 \times 350 \times \ln \frac{8}{3} = 1{,}500.0 \times 0.9808 = 1{,}471\ \mathrm{kJ}
$$
**熵产与校核。**
$$
S_{\mathrm{gen}} = m R \ln \frac{V_2}{V_1} = 14.93 \times 0.287 \times 0.9808 = 4.204\ \mathrm{kJ / K}
$$
$$
X_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 293.15 \times 4.204 = 1{,}232\ \mathrm{kJ}
$$
**这两个数字不同，而原因很有教益。** $W_{\mathrm{rev}} = 1{,}471\ \mathrm{kJ}$ 是可逆**等温**膨胀的功，它需要一个 $350\ \mathrm{K}$ 的热源供热；$X_{\mathrm{dest}} = 1{,}232\ \mathrm{kJ}$ 是相对于 $293\ \mathrm{K}$ 的环境、**没有**热源时被毁掉的功。两者之差 $239\ \mathrm{kJ}$，正是在 $350\ \mathrm{K}$ 下取入的 $1{,}471\ \mathrm{kJ}$ 热量的㶲：
$$
1{,}471 \times \left( 1 - \frac{293.15}{350} \right) = 239\ \mathrm{kJ}\ \checkmark
$$
**判决。** **打开一只阀门就扔掉了 $1.23\ \mathrm{MJ}$ 的功**——足够把一辆一吨重的汽车举高 $125\ \mathrm{m}$。第一定律记下 $\Delta U = 0$，把它称作无事发生。
**规律。** **任何压力均衡、任何节流、任何混合和任何不受约束的膨胀，都按 $m R \ln \left( P_1 / P_2 \right)$ 的比例毁掉功**，而一座排放蒸汽、给储气罐排污或法兰泄漏的工厂正在毁掉的正好是这个。$8\ \mathrm{bar}$（表压）压缩空气管路上一个 $10\ \mathrm{mm}$ 的孔泄漏约 $0.11\ \mathrm{kg / s}$（壅塞流，流量系数 $0.65$），毁掉约 $20\ \mathrm{kW}$ 的功，即**每年 $175{,}000\ \mathrm{kWh}$**——这就是压缩空气泄漏检测能很快收回成本的原因。
**合理性检验。** $T$ 不变，是因为理想气体的热力学能只取决于温度而 $\Delta U = 0$；**真实**气体会轻微冷却——对这些压力下的空气只有零点几开尔文。与之相关的节流冷却，即**焦耳-汤姆逊效应**，是林德（Linde）空气液化机的工作原理。
:::
:::

::: history
**第一定律**与其说是被发现的，不如说是在十五年间从四个方向被汇聚出来的。**尤利乌斯·罗伯特·迈尔（Julius Robert Mayer）** 是驻爪哇的船医，他在 **1840**年注意到他的欧洲病人在热带静脉血比在国内更红——做同样的功消耗的氧更少——并从气体的比热比推算了热的当量功，**1842** 年发表；他的值约相当于 $3.6\ \mathrm{J / cal}$，偏低约 $15\ \%$，基本无人理会。**詹姆斯·普雷斯科特·焦耳（James Prescott Joule）** **1843** 年的第一个值来自电磁实验，为每英热单位 $838\ \mathrm{ft \cdot lbf}$（约 $4.5\ \mathrm{J / cal}$）；他从 **1845** 年开始用落重驱动、配极灵敏温度计的桨轮实验，到 **1850** 年得到 $772\ \mathrm{ft \cdot lbf}$（约 $4.16\ \mathrm{J / cal}$），并把测量一直重复到 **1878** 年。**赫尔曼·冯·亥姆霍兹（Hermann von Helmholtz）** 在 **1847** 年的《论力的守恒》（*Über die Erhaltung der Kraft*）中表述了普遍的能量守恒，用 *Kraft*（力）指我们今天所说的能量。热力学能 $U$ 和平衡式的现代形式出自**克劳修斯（Clausius）** **1850** 年及其后的工作；函数 $H = U + P V$ 以"定压热函数"的形式出现在**吉布斯（Gibbs）** **19 世纪 70 年代**的工作中，而**焓**这个名称是**海克·卡末林·昂内斯（Heike Kamerlingh Onnes）**在 20 世纪初创造的。**本课中的搅拌器实验**就是焦耳本人的实验，它的现代后裔是量热计的**电标定**：其中的"搅拌器"是一只 $10\ \Omega$ 电阻，"功"是对着约瑟夫森基准测量的 $V I \Delta t$——同一个实验，晚了一百八十年，精度高了几个数量级。
:::

## 后续内容

闭口系统的衡算在 [[thermodynamics/first-law-open]] 中变成稳定流动衡算；它所消耗的性质值来自 [[thermodynamics/pure-substances]]；第一定律不加的限制在 [[thermodynamics/second-law]] 中被加上，而最后两个算例中毁掉的功在 [[thermodynamics/exergy]] 中被定量。

::: summary
- 能量进减去出等于内部的变化；各项就是你画出的那条边界的穿越，每一种功都要算。
- $\Delta u = c_v \Delta T$ 和 $\Delta h = c_p \Delta T$ 对理想气体沿**任何**过程都成立——下标命名的是测量，不是路径。
- 边界功是 $\int P_{\text{内表面}}\,dV$，而自由膨胀中压力是 $500\ \mathrm{kPa}$、功是零。
- 弹簧加载活塞的功分为弹簧储存的能量、活塞的举升和对大气的推动；只有最后一项永远不能成为有用功。
- 定压的闭口系统交换 $Q = \Delta H$，而 $400\ \mathrm{kPa}$ 下水的蒸发把 $91\ \%$ 的热量变成热力学能、$9\ \%$ 变成膨胀功，温度却毫不改变。
- 在 $354\ \mathrm{K}$ 下把 $180\ \mathrm{kJ}$ 轴功耗散进热力学能，会毁掉其中 $90\ \%$。
- 在充气罐与真空罐之间打开一只阀门毁掉 $1.2\ \mathrm{MJ}$ 的功，而第一定律完全得到满足。
:::

::: quiz
刚性绝热容器中的气体被搅拌器搅动，温度升高。哪一句陈述是对的？
- [ ] 有热量传给气体
- [x] 越过边界的是功，没有热，而 $\Delta T$ 关于 $Q$ 什么也说明不了
- [ ] 容器是刚性的，所以 $\Delta U = 0$
- [ ] 温度升高证明过程是可逆的
::: solution
容器绝热，所以按定义 $Q = 0$；刚性，所以 $W_b = 0$；唯一的穿越是轴功，在算例中 $\Delta U = -W_{\mathrm{shaft}} = +180\ \mathrm{kJ}$。**温度变化是状态的变化，传热是路径量**，而搅拌器容器是本学科中对前者关于后者一无所知这一点最干净的演示。
:::
:::

## 习题

::: exercise 单位 {level=1 check="0"}
刚性容器中的气体被搅拌器搅动，同时被冷却使温度保持不变。给出边界功，以千焦计。
::: solution
$0$——刚性边界不做 $P\,dV$ 功。搅拌功与传热大小相等、方向相反。
:::
:::

::: exercise 迈耶关系 {level=1 check="0.287"}
给出空气的 $c_p - c_v$，以千焦每千克开尔文计。
::: solution
$0.287\ \mathrm{kJ / kg \cdot K}$——气体常数。
:::
:::

::: exercise 比热比 {level=1 check="1.667"}
给出单原子理想气体的比热比。
::: solution
$\gamma = (5/2)R/(3/2)R = 5/3 = 1.667$。
:::
:::

::: exercise 循环 {level=1 check="0"}
在一个完整的热力学循环中，$\Delta U$ 是多少？
::: solution
$0$——热力学能是点函数，循环回到起点，所以 $\oint \delta Q = \oint \delta W$。
:::
:::

::: exercise 自由膨胀 {level=1 check="187.5"}
$500\ \mathrm{kPa}$ 的 $3\ \mathrm{m^{3}}$ 空气向抽真空的 $5\ \mathrm{m^{3}}$ 膨胀。给出终压力，以千帕计。
::: solution
$P_2 = 500 \times 3 / 8 = 187.5\ \mathrm{kPa}$。
:::
:::

::: exercise 定压过程 {level=2}
$200\ \mathrm{kPa}$ 的 $0.3\ \mathrm{m^{3}}$ 空气在定压下被加热到 $0.5\ \mathrm{m^{3}}$。若空气从 $300\ \mathrm{K}$ 开始，给出边界功和传热量。
::: solution
$$
W = P \Delta V = 200 \times \left( 0.5 - 0.3 \right) = 40.0\ \mathrm{kJ}
$$
$$
T_2 = T_1 \frac{V_2}{V_1} = 300 \times \frac{5}{3} = 500\ \mathrm{K}, \qquad
m = \frac{P_1 V_1}{R T_1} = \frac{200 \times 0.3}{0.287 \times 300} = 0.6969\ \mathrm{kg}
$$
$$
Q = m c_p \Delta T = 0.6969 \times 1.005 \times 200 = 140.1\ \mathrm{kJ}
$$
**合理性检验。** $\Delta U = m c_v \Delta T = 0.6969 \times 0.718 \times 200 = 100.0\ \mathrm{kJ}$，而 $Q - W = 140.1 - 40.0 = 100.1\ \mathrm{kJ}$——衡算闭合。第二个校核是 $Q / \Delta U = c_p / c_v = \gamma = 1.40$，而 $140.1 / 100.0 = 1.401$。$\checkmark$
:::
:::

::: exercise 真实气体 {level=2}
$5\ \mathrm{MPa}$、$320\ \mathrm{K}$ 的二氧化碳在定容下被加热到 $400\ \mathrm{K}$。解释为什么用理想气体 $c_v = 0.657\ \mathrm{kJ / kg \cdot K}$ 的 $\Delta u = c_v \Delta T$ 是错的，并给出正确的做法。
::: solution
**为什么错。** $c_v = 0.657\ \mathrm{kJ / kg \cdot K}$ 是 $300\ \mathrm{K}$ 下的**理想气体**值（常被引用的 $0.846$ 是 $c_p$ 而不是 $c_v$），而对理想气体 $u$ 只取决于 $T$。在 $5\ \mathrm{MPa}$、$320\ \mathrm{K}$ 下，二氧化碳处于 $T_r = 1.05$、$P_r = 0.68$，那里 $Z \approx 0.77$，而 $\left( \partial u / \partial v \right)_T = T \left( \partial P / \partial T \right)_v - P$ 不为零：热力学能既取决于温度也取决于体积，这个密度下的比热也与理想气体的不同。
**正确的做法。** 在两个状态都从真实气体表或状态方程取 $u$：
$$
\Delta u = u \left( v, T_2 \right) - u \left( v, T_1 \right), \qquad v = v_1 = \frac{Z_1 R T_1}{P} = \frac{0.77 \times 0.1889 \times 320}{5000} = 0.00931\ \mathrm{m^{3} / kg}
$$
**误差的大小。** 常数 $c_v$ 估计给出 $0.657 \times 80 = 52.6\ \mathrm{kJ / kg}$，对理想气体 $c_v \left( T \right)$ 积分给出 $57.2\ \mathrm{kJ / kg}$。在相同比体积下由参考状态方程得到的真实值为 **$63.6\ \mathrm{kJ / kg}$**（压力升到 $7.06\ \mathrm{MPa}$）——常数 $c_v$ 计算**偏低 $17\ \%$**，因为真实流体在这个密度下的 $c_v$ 约为 $0.80\ \mathrm{kJ / kg \cdot K}$，而理想气体只有 $0.66$ 到 $0.72$。
**合理性检验。** 在固定密度下，分子间势能也随温度变化，所以在临界点附近真实 $c_v$ 超过理想气体值，$\Delta u$ 大于理想气体估计。这个修正越接近临界点越大，必须从状态方程取得，而不能靠猜。
:::
:::

::: exercise 推导 {level=3}
证明：对比热为常数的理想气体，在两个给定压力之间可逆绝热**稳流**压气机的输入功 $w = \int v\, dP$ 为 $w = c_p T_1 \left[ \left( P_2 / P_1 \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right]$（稳流形式在 [[thermodynamics/first-law-open]] 中推导），将它与闭口系的边界功比较，并导出可逆**等温**压缩的对应表达式。对空气从 $100\ \mathrm{kPa}$、$300\ \mathrm{K}$ 到 $900\ \mathrm{kPa}$ 计算两者，并求两级绝热压缩配完全中间冷却所能节省的功。
::: solution
**绝热情形。** $P v^{\gamma} = C$，所以
$$
w = \int_{1}^{2} v\, dP = \frac{\gamma}{\gamma - 1} \left( P_2 v_2 - P_1 v_1 \right) = \frac{\gamma R}{\gamma - 1} \left( T_2 - T_1 \right) = c_p \left( T_2 - T_1 \right)
$$
其中用了 $c_p = \gamma R / \left( \gamma - 1 \right)$；再代入 $T_2 = T_1 \left( P_2 / P_1 \right)^{\left( \gamma - 1 \right) / \gamma}$，
$$
\boxed{ w_{\mathrm{ad}} = c_p T_1 \left[ \left( \frac{P_2}{P_1} \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right] }
$$
**等温情形。**
$$
w_{\mathrm{iso}} = \int_{1}^{2} v\, dP = R T \ln \frac{P_2}{P_1} = R T_1 \ln \frac{v_1}{v_2}
$$
**数值计算。** $r = 9$，$T_1 = 300\ \mathrm{K}$，$c_p = 1.005$，$R = 0.287$，$\left( \gamma - 1 \right) / \gamma = 0.2857$：
$$
w_{\mathrm{ad}} = 1.005 \times 300 \times \left( 9^{0.2857} - 1 \right) = 301.5 \times 0.8734 = 263.3\ \mathrm{kJ / kg}
$$
$$
w_{\mathrm{iso}} = 0.287 \times 300 \times \ln 9 = 86.1 \times 2.1972 = 189.2\ \mathrm{kJ / kg}
$$
作为比较，同一绝热压缩的**闭口系**边界功为 $c_v \left( T_2 - T_1 \right) = w_{\mathrm{ad}} / \gamma = 188.1\ \mathrm{kJ / kg}$：稳流功比它大，多出的是把气体推入和推出所需的净流动功 $P_2 v_2 - P_1 v_1$。
**两级机器。** 中间冷却完全回到 $300\ \mathrm{K}$、各级压比相等为 $\sqrt{9} = 3$：
$$
w_{2\mathrm{st}} = 2 \times 301.5 \times \left( 3^{0.2857} - 1 \right) = 2 \times 301.5 \times 0.3687 = 222.3\ \mathrm{kJ / kg}
$$
**小结。**
$$
\begin{array}{l c c}
\text{方案} & w\ (\mathrm{kJ / kg}) & \text{相对等温} \\
\text{单级绝热} & 263.3 & \text{超 } 39\ \% \\
\text{两级中间冷却} & 222.3 & \text{超 } 17\ \% \\
\text{等温（理想）} & 189.2 & -
\end{array}
$$
**极限。** $N$ 级时比值为 $N \left( r^{\left( \gamma - 1 \right) / \gamma N} - 1 \right) / \ln r \to 1$（$N \to \infty$），所以**无穷多级完全中间冷却的压气机就是等温压气机**——而没人这样造的原因是：中间冷却器的造价超过了从两级到无穷大之间省下的那 $17\ \%$ 的功。
**起决定作用的数字。** 一台绝热效率 $75\ \%$ 的真实两级机器，单级耗功 $263.3 / 0.75 = 351\ \mathrm{kJ / kg}$，两级耗功 $222.3 / 0.75 = 296\ \mathrm{kJ / kg}$；$55\ \mathrm{kJ / kg}$ 的节省在 $1\ \mathrm{kg / s}$ 下就是 **$55\ \mathrm{kW}$**，连续运行每年约 $480\ \mathrm{MWh}$——按每千瓦时 $0.10$ 计约值每年 $48{,}000$，足以买下一大堆中间冷却器。
**合理性检验。** 排掉中间冷却器的热几乎没有代价，因为它在 $300$ 到 $320\ \mathrm{K}$ 下被排掉，其㶲含量只有其能量的约 $1 - 293 / 313 \approx 6\ \%$。
:::
:::

::: exercise 设计 {level=3}
为一台 $250\ \mathrm{kW}$ 闭式有机朗肯循环试验台的性能试验规定能量衡算、仪表和不确定度预算，其蒸发器、凝汽器、涡轮机和发电机均可单独接近。
::: solution
**四个边界与四个衡算。**
$$
\begin{array}{l l l}
\text{蒸发器} & \dot{Q}_E = \dot{m} \left( h_2 - h_1 \right) & \text{盐水侧交叉校核：} \dot{m}_b c_{p,b} \Delta T_b \\
\text{涡轮机} & \dot{W}_T = \dot{m} \left( h_3 - h_4 \right) & \text{轴制动测功器，再算发电机损失} \\
\text{凝汽器} & \dot{Q}_C = \dot{m} \left( h_4 - h_1 \right) & \text{冷却水交叉校核} \\
\text{循环} & \dot{W}_{\mathrm{net}} = \dot{Q}_E - \dot{Q}_C & \text{闭合性检验}
\end{array}
$$
**闭合判据。** 残差
$$
\varepsilon = \frac{\left| \dot{Q}_E - \dot{Q}_C - \dot{W}_{\mathrm{net}} \right|}{\dot{Q}_E}
$$
对这一尺寸的有机朗肯循环试验必须**低于 $1.5\ \%$**，而超过 $3\ \%$ 的残差意味着一处未装仪表的损失——通常是涡轮机壳体、发电机冷却风扇或泵密封。
**仪表及其造价。**
$$
\begin{array}{l l c l}
\text{工质流量} & \text{科里奥利质量流量计} & \pm 0.15\ \% & \text{主导项；涡街流量计只有 } \pm 1\ \% \\
\text{蒸发器 } P, T & 0.1\ \%\ \mathrm{FS}\text{ ，}\mathrm{Pt100}\ \pm 0.1\ \mathrm{K} & \Delta h \text{ 的 } \pm 0.4\ \% & h \text{ 差只有 } 120\ \mathrm{kJ / kg} \\
\text{涡轮机轴} & \text{在线扭矩传感器，0.05 级} & \pm 0.05\ \% & \text{或用标定过的发电机，} \pm 0.3\ \% \\
\text{冷却水} & \text{超声波，} \pm 0.5\ \%\text{ ，四线制铂电阻} & \dot{Q}_C \text{ 的 } \pm 0.6\ \% & \Delta T \text{ 是 } 6\ \mathrm{K}\text{ ，所以铂电阻须配对到 } \pm 0.02\ \mathrm{K} \\
\text{散热损失} & \text{保温至 } U < 0.5\ \mathrm{W / m^{2} K}\text{ ，用冷却曲线测定} & \pm 1\ \mathrm{kW} & \text{测一次，然后扣除}
\end{array}
$$
**不确定度预算。** 工质焓差取 $\pm 0.4\ \%$、流量取 $\pm 0.15\ \%$，
$$
u_{\dot{Q}_E} = \sqrt{0.15^{2} + 0.4^{2} + 0.4^{2}} = 0.58\ \%, \qquad
u_{\dot{W}} = 0.05\ \%
$$
而热效率的不确定度是
$$
u_\eta = \sqrt{0.58^{2} + 0.05^{2}} = 0.58\ \%\ \text{相对值}
$$
对一台效率 $12\ \%$ 的机器即 $\pm 0.07$ 个百分点——**足以认证一份保证书，也足以察觉 $1\ \%$ 的性能劣化。**
**总被忘掉的三样东西。** **泵的功率**，它是涡轮机功率的 $2$ 到 $4\ \%$，且与发电机输出取自同一条母线。**部分负荷下涡轮机的风阻**，零流量时是 $1$ 到 $2\ \mathrm{kW}$ 的损失，会让机械效率曲线在原点处显得不合物理。**工质物性包**，对硅氧烷或戊烷它是一份焓不确定度 $1$ 到 $2\ \%$ 的**关联式**，除非工质经过实测表征，否则它主导整个预算。
**拯救试验的一条注释。** **"试验对象至少应装设两条独立能量路径的仪表，且每一个数据点都应报告残差。"** 只报告效率的试验是无法审计的试验，而报告残差的试验可以被审计，因而可以被相信。
**设计点评。** 一般规律是：**性能试验是一份挂着一台机器的不确定度预算**，而选择仪表等级的一方就选择了答案——这就是为什么验收试验规范在试验台建成之前就点名规定仪表等级、闭合判据和残差报告。
:::
:::
