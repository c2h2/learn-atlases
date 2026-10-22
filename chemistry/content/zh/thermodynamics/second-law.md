第一定律负责记账，却不指明哪些交易是可能的。蒸汽机从炉子吸热，把其中一部分变成功，剩下的倒进冷凝器；第一定律只坚持这三笔账必须平衡。它对一台逆向机器同样满意——那台机器从海洋吸热、把它完全变成功、此外别无所求——而那台机器从未被造出来。船周围的海水蕴含着比这条船所能用出的多得多的热能，却没有任何机器曾靠它运行，因为缺失的那份许可根本无关能量，而关乎*方向*：热自发地从热的流向冷的，气体互相混合而不自动分层，而一台循环工作的热机需要两个热源，绝不是一个。热力学第二定律就是那份许可的名字，而熵是表达这一点的记账量。

第一门课程从化学一侧遇见过第二定律——$\Delta S_\mathrm{univ} > 0$ 作为自发性判据、查表的熵、以及在其上建起的吉布斯自由能（[[general-chemistry-2/entropy-free-energy|熵与自由能]]）。本章走另一条更深的路：热机的分析。它迫使熵存在，给出热力学温标，导出克劳修斯不等式，最终抵达玻尔兹曼的 $S = k_\mathrm{B} \ln W$ 与第三定律。全章假定的热与功的记账法见[[thermodynamics/first-law|热力学第一定律]]，符号约定也相同：$\Delta U = q + w$，其中 $w$ 是**外界对体系做的功**，所以对外界做功的热机有 $w < 0$。

## 为什么第一定律不够

::: definition 热机、制冷机与效率 {#def-engine}
**热机**是按循环工作的装置——不断回到初态——在与温度不同的两个以上热源交换热的同时输出净功。对循环的工作介质，一个循环后 $\Delta U = 0$，按我们的符号约定有 $q_\mathrm{h} + q_\mathrm{c} + w = 0$，其中 $q_\mathrm{h} > 0$ 是从温度 $T_\mathrm{h}$ 的热源吸收的热，$q_\mathrm{c} < 0$ 是排给温度 $T_\mathrm{c}$ 的冷源的热。**效率**是吸收的热中被输出为功的份额，
$$
\eta \equiv \frac{-w}{q_\mathrm{h}} = \frac{q_\mathrm{h} + q_\mathrm{c}}{q_\mathrm{h}} = 1 + \frac{q_\mathrm{c}}{q_\mathrm{h}} .
$$
**制冷机**（或热泵）是靠功 $w > 0$ 驱动、把热从冷处搬到热处的装置；其性能用**性能系数** $\varepsilon = -q_\mathrm{c}/w$ 衡量，即每耗一单位功所移走的热。
:::

两条干脆的不可能性陈述，概括了第二定律关于这类机器所说的一切。

::: proposition 开尔文–普朗克表述与克劳修斯表述 {#prop-equivalence}
**开尔文–普朗克表述**：没有循环装置能从单一热源吸热并将其完全变为功；任何热机都必须向更冷的物体排出一些热，故恒有 $\eta < 1$。
**克劳修斯表述**：没有循环装置能不消耗功而把热从低温物体传给高温物体；$\varepsilon = \infty$ 的制冷机不存在。
两个表述彼此等价：违反其一，就允许造出一台违反另一条的机器。
:::

::: proof
假设存在一台*完美*热机 $P$：它从高温热源取 $q$，向外界输出功 $q$，而不排出任何热（违反开尔文–普朗克表述）。用这份功驱动任意一台普通制冷机 $R$：$R$ 从低温热源取 $|q_\mathrm{c}|$，向高温热源排入 $|q_\mathrm{c}| + q$。把 $P$ 与 $R$ 耦合：功相互抵消；高温热源给 $P$ 提供 $q$、从 $R$ 收到 $|q_\mathrm{c}| + q$，净得 $|q_\mathrm{c}|$；低温热源失去 $|q_\mathrm{c}|$；外界没有留下任何功。热从冷传到了热而没有其他影响——违反克劳修斯表述。
反过来，假设存在一台*完美*制冷机 $D$：不消耗功而把 $|q_\mathrm{c}|$ 从冷源搬到热源（违反克劳修斯表述）。把它与任意一台普通热机 $E$ 耦合，规模调到 $E$ 恰好向冷源排出 $|q_\mathrm{c}|$：$E$ 从高温热源取 $q_\mathrm{h}$，输出功 $q_\mathrm{h} - |q_\mathrm{c}| > 0$，而 $D$ 把 $|q_\mathrm{c}|$ 送回高温热源。复合装置从**单一**热源（高温那个）取走 $q_\mathrm{h} - |q_\mathrm{c}|$，并把它完全变为功，违反开尔文–普朗克表述。两个不可能互相蕴含，所以两个表述共存亡。
:::

::: warning 单个过程可以把热完全变为功 {#warn-cycle}
开尔文–普朗克表述禁止的是一个把单一热源的热完全变为功的**循环**——它并不禁止某个把热完全变为功的单个过程。理想气体的可逆等温膨胀吸收热、把每一焦耳都变成了功：$\Delta U = 0$ 且 $-w = q$；诀窍在于气体没有回来，而把活塞复位要把这份功连本带利花回去。反过来，把功完全变为热在任何方向都**不**被禁止：摩擦、焦耳的桨轮、水浴里的电阻丝都在自发地做到。第二定律的这种不对称性，用"你不能把热变成功"来说法是严重变形的；被禁止的是**只与单一热源交换热的循环装置**的完全转化。
:::

::: quiz
下列哪一条是热力学第二定律的正确表述？
- [x] 没有循环热机能把单一热源的热完全变为功。
- [ ] 没有任何过程能把热完全变为功。
- [ ] 任何体系的熵总是增加。
- [ ] 热绝不能从冷流向热。
::: solution
只有第一条按原样正确。单个等温膨胀确实把热完全变为功；只要环境赚回更多，体系的熵尽可以减少（水结冰）；制冷机天天把热从冷搬到热——代价是功。第二定律禁止的是每一项的*无补偿的循环*版本。
:::
:::

## 卡诺循环

热机不可能完美，但必须多么不完美？1824 年卡诺（Carnot）用一个理想化的循环回答了这个问题，而它至今仍是所有热机——真实的或想象的——的基准。

::: definition 卡诺循环 {#def-carnot}
某物质的**卡诺循环**是由四步组成的可逆循环：(A→B) 在温度 $T_\mathrm{h}$ 下的可逆等温膨胀；(B→C) 可逆**绝热**膨胀，其间温度降到 $T_\mathrm{c}$；(C→D) 在 $T_\mathrm{c}$ 下的可逆等温压缩；(D→A) 可逆绝热压缩回到 $T_\mathrm{h}$。倒着走，它就是**卡诺制冷机**。因为每一步都可逆，循环可以沿任一方向进行，且不在任何地方留下熵。
:::

::: proposition 卡诺热机的效率 {#prop-carnot-eff}
对卡诺循环，无论工作介质是什么，
$$
\eta_\text{Carnot} = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}},
$$
而对一摩尔摩尔热容为 $C_{V,\mathrm{m}}$、$C_{p,\mathrm{m}}$（满足 $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R$）的理想气体，四步携带
$$
q_{AB} = RT_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
w_{AB} = -RT_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
q_{BC} = 0, \qquad
w_{BC} = C_{V,\mathrm{m}}(T_\mathrm{c} - T_\mathrm{h}),
$$
$$
q_{CD} = RT_\mathrm{c}\ln\frac{V_\mathrm{D}}{V_\mathrm{C}} = -RT_\mathrm{c}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
q_{DA} = 0, \qquad
w_{DA} = C_{V,\mathrm{m}}(T_\mathrm{h} - T_\mathrm{c}),
$$
绝热线的体积比由 $T V^{\gamma-1} = \text{常数}$、$\gamma = C_{p,\mathrm{m}}/C_{V,\mathrm{m}}$ 决定。
:::

::: proof
取一摩尔理想气体。等温线 A→B 上能量不变（焦耳定律），故 $\Delta U = 0$，$q_{AB} = -w_{AB} = RT_\mathrm{h}\ln(V_\mathrm{B}/V_\mathrm{A}) > 0$。绝热线 B→C 上，$q = 0$，$w_{BC} = \Delta U = C_{V,\mathrm{m}}(T_\mathrm{c} - T_\mathrm{h}) < 0$：气体靠花自己的能量做功而变冷。等温线 C→D 上，$q_{CD} = RT_\mathrm{c}\ln(V_\mathrm{D}/V_\mathrm{C})$，因 $V_\mathrm{D} < V_\mathrm{C}$ 而为负。绝热线 D→A 上，$w_{DA} = C_{V,\mathrm{m}}(T_\mathrm{h} - T_\mathrm{c})$，恰好抵消 $w_{BC}$。剩下的是把各体积联系起来。对理想气体的可逆绝热线，$\mathrm{d}U = -p\,\mathrm{d}V$ 给出 $C_{V,\mathrm{m}}\,\mathrm{d}T = -(RT/V)\,\mathrm{d}V$，即 $\mathrm{d}\ln T = -(R/C_{V,\mathrm{m}})\,\mathrm{d}\ln V = -(1-\gamma)\,\mathrm{d}\ln V$，所以沿每条绝热线 $T V^{\gamma-1}$ 为常数：
$$
T_\mathrm{h} V_\mathrm{B}^{\gamma-1} = T_\mathrm{c} V_\mathrm{C}^{\gamma-1}, \qquad
T_\mathrm{h} V_\mathrm{A}^{\gamma-1} = T_\mathrm{c} V_\mathrm{D}^{\gamma-1}.
$$
两式相除，$(V_\mathrm{C}/V_\mathrm{B})^{\gamma-1} = (V_\mathrm{D}/V_\mathrm{A})^{\gamma-1}$，故 $V_\mathrm{C}/V_\mathrm{B} = V_\mathrm{D}/V_\mathrm{A}$，从而 $V_\mathrm{D}/V_\mathrm{C} = V_\mathrm{A}/V_\mathrm{B}$。于是净吸热为
$$
q_\text{净} = R T_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}} + R T_\mathrm{c}\ln\frac{V_\mathrm{A}}{V_\mathrm{B}} = R\left(T_\mathrm{h} - T_\mathrm{c}\right)\ln\frac{V_\mathrm{B}}{V_\mathrm{A}},
$$
而 $q_{AB} = RT_\mathrm{h}\ln(V_\mathrm{B}/V_\mathrm{A})$，所以
$$
\eta = \frac{q_\text{净}}{q_{AB}} = \frac{T_\mathrm{h} - T_\mathrm{c}}{T_\mathrm{h}} = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}} . \qquad \blacksquare
$$
排出的热服从那个优雅的比值 $q_{CD}/q_{AB} = -T_\mathrm{c}/T_\mathrm{h}$：两条等温线按温度成正比地交换热，完全不涉及气体本身——下一个结果将证明这一点。
:::

::: example 一台卡诺热机的数字 {#ex-carnot-numbers}
一摩尔单原子理想气体（$C_{V,\mathrm{m}} = \tfrac{3}{2}R = 12.47\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$\gamma = 5/3$）在 $T_\mathrm{h} = 600\ \mathrm{K}$ 与 $T_\mathrm{c} = 300\ \mathrm{K}$ 之间运行卡诺循环，自 $V_\mathrm{A} = 10.0\ \mathrm{L}$ 出发并等温膨胀到 $V_\mathrm{B} = 20.0\ \mathrm{L}$。求每一步的热与功，以及每循环的净功。
::: solution
**A→B**，$600\ \mathrm{K}$ 等温：$q_{AB} = 8.314 \times 600 \times \ln 2 = +3.46\ \mathrm{kJ}$，$w_{AB} = -3.46\ \mathrm{kJ}$，$\Delta U = 0$。
**B→C**，绝热膨胀到 $300\ \mathrm{K}$：$q_{BC} = 0$，$w_{BC} = 12.47 \times (300 - 600) = -3.74\ \mathrm{kJ}$。体积比为 $T_\mathrm{h}^{3/2}/T_\mathrm{c}^{3/2} = 2^{3/2} = 2.83$，故 $V_\mathrm{C} = 20.0 \times 2.83 = 56.6\ \mathrm{L}$。
**C→D**，$300\ \mathrm{K}$ 等温压缩：$V_\mathrm{D} = V_\mathrm{A} \times 2.83 = 28.3\ \mathrm{L}$，故 $V_\mathrm{D}/V_\mathrm{C} = 1/2$，$q_{CD} = 8.314 \times 300 \times \ln\tfrac{1}{2} = -1.73\ \mathrm{kJ}$，$w_{CD} = +1.73\ \mathrm{kJ}$。
**D→A**，绝热压缩：$q_{DA} = 0$，$w_{DA} = +3.74\ \mathrm{kJ}$。
净功 $w = -3.46 - 3.74 + 1.73 + 3.74 = -1.73\ \mathrm{kJ}$（每摩尔每循环），而 $\eta = 1.73/3.46 = 0.500 = 1 - 300/600$，与命题的要求分毫不差。两条绝热线贡献的功大小相等、符号相反——它们只在两条等温线之间搬运能量——而**净**功等于 $p$–$V$ 图上回路的面积。
:::
:::

::: example 一台卡诺制冷机 {#ex-carnot-fridge}
一台卡诺制冷机把内部保持在 $T_\mathrm{c} = 270\ \mathrm{K}$，同时把热排进 $T_\mathrm{h} = 295\ \mathrm{K}$ 的厨房。要从内部移走 $500\ \mathrm{J}$ 的热需要输入多少功？它的性能系数是多少？
::: solution
对可逆制冷机，同样的热–温比成立，$|q_\mathrm{c}|/|q_\mathrm{h}| = T_\mathrm{c}/T_\mathrm{h}$，于是
$$
\varepsilon = \frac{|q_\mathrm{c}|}{w} = \frac{T_\mathrm{c}}{T_\mathrm{h} - T_\mathrm{c}} = \frac{270}{25} = 10.8,
\qquad
w = \frac{500\ \mathrm{J}}{10.8} = 46.3\ \mathrm{J}.
$$
厨房收到 $546\ \mathrm{J}$。注意 $\varepsilon \gg 1$：制冷机**不**受"移走的热不能超过所耗的功"的限制，因为功不是热的来源，只是它的泵。同一个分母上的 $T_\mathrm{h} - T_\mathrm{c}$ 也解释了为什么热泵在严冬里吃力、空调在滚烫的阁楼里吃力：温差一大，性能就崩塌。
:::
:::

::: widget plot
f: 1 - tc/x
x: 300, 1000
y: 0, 0.8
sliders: tc=300:240:900:10
labels: \eta
caption: 卡诺效率 $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$ 对高温热源温度 $T_\mathrm{h}$ 作图，冷源温度由滑块 $T_\mathrm{c}$ 设定。每一台真实热机——$T_\mathrm{h} \approx 900\ \mathrm{K}$ 的汽轮机、$800\ \mathrm{K}$ 上下的汽车发动机、$600\ \mathrm{K}$ 上下的核电站——都坐在自己那条曲线的*下方*，而差距属于工程学，不属于热力学。这条曲线解释了两条普遍的习惯：把锅炉烧到尽可能热（沿曲线往上爬），把冷凝器造到尽可能冷（把滑块拉低）。它还说明，寒冷气候里的电站在本质上就比同一座电站在热带里更高效。
:::

## 卡诺定理与热力学温标

公式 $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$ 是对理想气体导出的，可里面没有气体常数、没有热容、没有体积比。这不是代数的巧合。

::: theorem 卡诺定理 {#thm-carnot}
在 $T_\mathrm{h}$ 与 $T_\mathrm{c}$ 两热源之间工作的一切热机中，没有谁能比在同样两热源之间工作的可逆热机更高效。在同样两热源之间工作的所有可逆热机效率相同，无论其工作介质与构造如何。
:::

::: proof
设 $R$ 可逆、$I$ 为两热源之间的任意热机，并假设 $\eta_I > \eta_R$。把两台机器调规模（让一台每循环的次数与另一台相配），使它们每循环各输出同样的功 $-w$。于是 $I$ 从高温热源吸 $q_\mathrm{h}^{I} = -w/\eta_I$，排出 $q_\mathrm{c}^{I} = q_\mathrm{h}^{I} + w$；而 $R$ 吸 $q_\mathrm{h}^{R} = -w/\eta_R > q_\mathrm{h}^{I}$，排出 $q_\mathrm{c}^{R} = q_\mathrm{h}^{R} + w > q_\mathrm{c}^{I}$。现在把 $R$ *倒*过来当制冷机，由 $I$ 的功驱动。复合装置不交换净功；高温热源收到 $q_\mathrm{h}^{R} - q_\mathrm{h}^{I} > 0$，低温热源失去 $q_\mathrm{c}^{R} - q_\mathrm{c}^{I} > 0$：热从冷流到了热而没有补偿，违反克劳修斯表述。故 $\eta_I \le \eta_R$。若另一台可逆热机 $R'$ 有 $\eta_{R'} \ne \eta_R$，把论证沿两个方向各用一遍（$R$ 驱动倒转的 $R'$，再 $R'$ 驱动倒转的 $R$），得 $\eta_{R'} \le \eta_R \le \eta_{R'}$，故两效率相等。
:::

::: proposition 热力学温标 {#prop-kelvin-scale}
由卡诺定理，任何可逆热机的热比 $-q_\mathrm{c}/q_\mathrm{h}$ 只是两热源温度的普适函数 $f(T_\mathrm{h}, T_\mathrm{c})$。考察三个热源与一串可逆热机可知 $f$ 必须可分离，$f(T_1, T_2) = g(T_1)/g(T_2)$，$g$ 为单个普适函数。选取 $g(T) = T$ 就定义了**热力学（开尔文）温标**，在此温标上每台可逆热机满足
$$
\frac{q_\mathrm{c}}{q_\mathrm{h}} = -\frac{T_\mathrm{c}}{T_\mathrm{h}}
\qquad\text{故}\qquad
\eta = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}} .
$$
一个固定点——历史上是水的三相点 $273.16\ \mathrm{K}$，2019 年以来是固定的开尔文——定出单位。在此温标上，[[general-chemistry-1/gases|气体温度计]]的理想气体温标与之精确一致，因为上面算过的理想气体卡诺热机已经具有所需的形式。
:::

::: proof
取热源 $T_1 > T_2 > T_3$ 与可逆热机 $E_{12}$、$E_{23}$，安排成 $E_{12}$ 排给 $T_2$ 的热恰为 $E_{23}$ 从 $T_2$ 所取。复合机是 $T_1$ 与 $T_3$ 之间的可逆热机，故
$$
\frac{g(T_2)}{g(T_1)}\cdot\frac{g(T_3)}{g(T_2)} = \frac{q_{2}}{q_{1}}\cdot\frac{q_{3}}{q_{2}} = \frac{q_{3}}{q_{1}} = \frac{g(T_3)}{g(T_1)},
$$
这对中间温度 $T_2$ 的每个选择都相容，当且仅当该比值通过单个函数 $g$ 依赖于各温度。温度的任何单调重新定义只会重新标度 $g$，而 $g$ 在可测效率中全部约去，所以真正固定的只是 $g$ 的*选择*；$g(T) = T$ 是重现理想气体温标、并给出最简洁公式的那个选择。
:::

这是整个主题最深之点：温度——不依赖任何温度计定义的温度——是由理想机的行为*定义*的。开尔文勋爵在 1848 年正是用这个构造建立了"独立于任何物质属性"的温标，而绝对零度随之出现为不可达的极限 $T_\mathrm{c} \rightarrow 0$：在那一点上，假想的热机将排出零热。

::: history 从卡诺到玻尔兹曼 {#hist-second-law}
萨迪·卡诺（Carnot）二十八岁时于 1824 年发表了《关于火的动力的反思》（*Réflexions sur la puissance motrice du feu*），当时仍身处热质理论之内，却确立了热的动力与工作介质无关；此书几乎无人问津，1850 年由汤姆孙（Thomson）从湮没中救出。鲁道夫·克劳修斯（Clausius）1850 年重读此书，通过允许热质在转移中被*创造与消灭*，把它与焦耳（Joule）的热功相当性调和起来，并用文字表述了第二定律。威廉·汤姆孙（即开尔文勋爵，Thomson）于 1848 年建立了绝对热力学温标，并与詹姆斯·普雷斯科特·焦耳（Joule）一起测量了气体节流时的冷却（焦耳-汤姆孙效应，1852 年）。克劳修斯于 1865 年以希腊语的"转变"一词为新量命名为*熵*，并把热力学两条定律重述为：能量守恒，熵趋向极大。路德维希·玻尔兹曼（Boltzmann）于 1877 年给出熵的统计解释，马克斯·普朗克（Planck）在 1900 年前后定出了 $S = k \ln W$ 中的常数。瓦尔特·能斯特（Nernst）依据低温反应测量于 1906 年宣布了他的热定理；普朗克把它重述为第三定律；能斯特因这批工作获得 1920 年诺贝尔化学奖。
:::

## 克劳修斯不等式与作为状态函数的熵

::: theorem 克劳修斯不等式 {#thm-clausius}
对任何体系与温度 $T$ 的热源交换热的任何循环过程，
$$
\oint \frac{\delta q}{T} \le 0,
$$
当且仅当循环可逆时取等号。这里 $T$ 是*热源*在接触处的温度；对可逆循环它也是体系温度，区别随之消失。
:::

::: proof
先取只与两个热源交换热的循环：它是 $T_\mathrm{h}$ 与 $T_\mathrm{c}$ 之间的一台热机（或制冷机，或都不是），由卡诺定理 $\eta = 1 + q_\mathrm{c}/q_\mathrm{h} \le 1 - T_\mathrm{c}/T_\mathrm{h}$。整理（$q_\mathrm{h} > 0$）得 $q_\mathrm{h}/T_\mathrm{h} + q_\mathrm{c}/T_\mathrm{c} \le 0$，这正是此类循环的不等式。一般情形下，把与温度 $T_i$ 的每个热源接触处换成一台可逆的卡诺*耦合机*，它向体系在 $T_i$ 处交付同样一份 $\delta q_i$，但能量取自单一参考热源 $T_0$。耦合机既按循环又可逆地工作，满足 $(-\delta q_i)/T_i + \delta q_0^{(i)}/T_0 = 0$，故它从参考热源取走 $\delta q_0^{(i)} = \delta q_i\, T_0/T_i$。复合装置——体系加全部耦合机——从此只与 $T_0$ 的热源交换热，一个循环共吸热 $q_0 = T_0\oint \delta q/T$，而对其所做的功为 $w = -q_0$。只与单一热源交换热的循环装置不能向外界输出净功（开尔文–普朗克），故 $w \ge 0$，于是 $q_0 \le 0$，即 $\oint \delta q/T \le 0$。若循环可逆，则倒转的循环也必须满足不等式；两个方向夹逼，把积分挤成零。
:::

::: definition 作为状态函数的熵 {#def-entropy-state}
因为每个可逆循环都有 $\oint \delta q_\mathrm{rev}/T = 0$，积分 $\int_A^B \delta q_\mathrm{rev}/T$ 沿任何可逆路径都相同：它定义了一个**状态函数**，即**熵** $S$，满足
$$
\mathrm{d}S = \frac{\delta q_\mathrm{rev}}{T}, \qquad
\Delta S = S_\mathrm{B} - S_\mathrm{A} = \int_A^B \frac{\delta q_\mathrm{rev}}{T}.
$$
对*不可逆*过程，把克劳修斯不等式用于"不可逆 A→B、可逆 B→A"这个循环，得
$$
\Delta S \ge \int_A^B \frac{\delta q}{T},
$$
仅可逆路径取等号。熵的单位是 $\mathrm{J\,K^{-1}}$，是广度量；与能量不同，它不守恒——正是它的单调增长在裁决方向。
:::

::: proposition 熵增原理 {#prop-increase}
对任何过程，体系加环境（宇宙）的熵变满足
$$
\Delta S_\mathrm{univ} = \Delta S + \Delta S_\mathrm{surr} \ge 0,
$$
可逆过程取零，自发过程取正。$\Delta S_\mathrm{univ} < 0$ 的过程不可能发生。
:::

::: proof
把体系加环境取作孤立复合体。复合体的任何真实过程对整个复合体都是绝热的，$\delta q = 0$ 穿过其边界，故由定义中的不等式，$\Delta S_\mathrm{univ} \ge \int \delta q/T = 0$。可逆性是复合体经历平衡态、没有任何耗散的情形；此时取等号，因为把复合体倒着跑否则会产生负的总和。
:::

::: warning dS = δq/T 只沿可逆路径成立 {#warn-reversible-only}
本章最常见的技术性错误，是对不可逆过程写 $\Delta S = \int \delta q_\text{实际}/T$。这个公式是通过*可逆*热来定义 $S$ 的；对实际的不可逆路径，积分 $\int \delta q/T$ 严格*小于* $\Delta S$。要计算 $\Delta S$，你必须无视实际路径，在相同终末态之间发明任意一条可逆路径——可逆地加热、可逆地膨胀、必要时在稍有不同的温度下可逆地完成相变——再沿它积分 $\delta q_\mathrm{rev}/T$。熵是状态函数，恰恰保证了这个虚构是合法的：答案不取决于你发明哪条可逆路径。自由膨胀是微型示范：$q_\text{实际} = 0$，而 $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i}) > 0$，因为连接同样两态的可逆路径（等温膨胀）吸收了 $nRT\ln(V_\mathrm{f}/V_\mathrm{i})$。
:::

::: quiz
某体系经历一个不可逆循环（在若干自发、不受控的步骤后回到初态）。哪个必然成立？
- [x] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} < 0$，其中 $T_\mathrm{res}$ 是各接触处热源的温度。
- [ ] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} = 0$，因为体系回到初态。
- [ ] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} > 0$，因为熵被产生了。
- [ ] 符号取决于工作介质。
::: solution
克劳修斯不等式是关于循环的陈述，对不可逆循环是严格的：$\oint \delta q/T_\mathrm{res} < 0$。体系自身的熵变在一个循环上确实是零——它是状态函数——但*环境*被弄得更糟，而这正是严格不等号所记录的。等式 $\oint \delta q_\mathrm{rev}/T = 0$ 只对可逆循环成立。
:::
:::

## 熵变的计算

本章一切实用的东西都建立在一个方法上：把真实过程换成可逆过程再积分。三块积木承担几乎全部工作，它们把[[general-chemistry-2/entropy-free-energy|第一门课程]]的加热与相变公式精炼成一条精确的陈述。

::: proposition 理想气体、加热与相变的熵变 {#prop-ds-calc}
$n$ 摩尔物质在恒压下从 $T_1$ 加热到 $T_2$，$\delta q_\mathrm{rev} = n C_{p,\mathrm{m}}\,\mathrm{d}T$，故
$$
\Delta S = n\int_{T_1}^{T_2} \frac{C_{p,\mathrm{m}}}{T}\,\mathrm{d}T .
$$
对理想气体，沿"恒容加热、再等温膨胀"的可逆路径把加热与膨胀合并，得总公式
$$
\Delta S_\mathrm{m} = C_{V,\mathrm{m}} \ln\frac{T_2}{T_1} + R\ln\frac{V_2}{V_1}
= C_{p,\mathrm{m}} \ln\frac{T_2}{T_1} - R\ln\frac{p_2}{p_1},
$$
而对 $T_\mathrm{tr}$ 下的可逆相变，$\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T_\mathrm{tr}$。对理想气体的*可逆绝热*变化，公式给出 $\Delta S = 0$：绝热线即等熵线，而 $T V^{\gamma-1} = \text{常数}$ 恰是条件 $\mathrm{d}S = 0$。
:::

::: example 混合路径 {#ex-mixed-path}
一摩尔氩气（视为单原子，$C_{V,\mathrm{m}} = \tfrac{3}{2}R$）经由某种剧烈、不可逆的路线，从 $300\ \mathrm{K}$、$10.0\ \mathrm{L}$ 到 $400\ \mathrm{K}$、$20.0\ \mathrm{L}$。求 $\Delta S_\mathrm{m}$。
::: solution
路线无关紧要；沿"恒容加热到 $400\ \mathrm{K}$，再等温膨胀到 $20.0\ \mathrm{L}$"积分：
$$
\Delta S_\mathrm{m} = 12.47 \times \ln\frac{400}{300} + 8.314 \times \ln\frac{20.0}{10.0}
= 12.47 \times 0.2877 + 8.314 \times 0.6931 = 3.59 + 5.76 = 9.35\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
恒温膨胀的贡献大于加热，这是一条通则：体积项是对数乘以 $R \approx 8.3$，而适中的温度比给出的对数乘以 $C_{V,\mathrm{m}}$ 并不大。
:::
:::

::: proposition 理想气体的混合熵 {#prop-mixing}
$n_1$ 摩尔理想气体 1 与 $n_2$ 摩尔理想气体 2，各处于同样的 $T$ 与 $p$，在恒温恒压下混合成总量 $n = n_1 + n_2$、摩尔分数 $x_i = n_i/n$ 的混合物时，体系的熵增加
$$
\Delta_\mathrm{mix}S = -nR\sum_i x_i \ln x_i > 0,
$$
尽管没有热、没有功、没有能量变化。每种气体都从总体积 $V$ 等温膨胀到自己在 $x_i V$ 中的份额——它分不清"另一种气体在场"和"墙移动了"——所以其熵增加 $n_i R\ln(V/n_i \cdot n/V) = -n_i R\ln x_i$。
:::

::: example 两种理想气体的混合 {#ex-mixing}
$1.00\ \mathrm{mol}$ 的 $\mathrm{N_2}$ 与 $2.00\ \mathrm{mol}$ 的 $\mathrm{O_2}$，初始各在 $298\ \mathrm{K}$、$1\ \mathrm{bar}$，在恒温恒压下混合。求 $\Delta_\mathrm{mix}S$；若是同一种气体的两份样品做同样的实验，值又是多少？
::: solution
$x(\mathrm{N_2}) = 1/3$、$x(\mathrm{O_2}) = 2/3$，
$$
\Delta_\mathrm{mix}S = -3 \times 8.314 \left(\tfrac{1}{3}\ln\tfrac{1}{3} + \tfrac{2}{3}\ln\tfrac{2}{3}\right)
= -24.94 \times (-0.6365) = +15.9\ \mathrm{J\,K^{-1}}.
$$
对同一种气体的两份样品，抽去隔板不改变任何可测的东西：每种组分都没有向*新*体积膨胀，$\Delta_\mathrm{mix}S = 0$。气体只要*不同*，混合熵就从 $0$ 跳到 $15.9\ \mathrm{J\,K^{-1}}$——这就是吉布斯佯谬的一个数字版本，其解决在于：熵所数的是*全同*粒子的微观状态——见下面的统计一节与[[statistical-thermodynamics/partition-function|配分函数]]。
:::
:::

::: example 过冷水的凝固 {#ex-supercooled}
水在 $263.15\ \mathrm{K}$（$-10\,^\circ\mathrm{C}$）自发凝固，这是强不可逆过程。用 $273.15\ \mathrm{K}$ 的 $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$、$C_{p,\mathrm{m}}(\mathrm{l}) = 75.3$、$C_{p,\mathrm{m}}(\mathrm{s}) = 37.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$（数据取自 Atkins；热容视为与温度无关），计算每摩尔的 $\Delta S_\mathrm{sys}$、$\Delta S_\mathrm{surr}$ 与 $\Delta S_\mathrm{univ}$。
::: solution
**体系。**发明一条可逆路线：把液体加热到 $273.15\ \mathrm{K}$，在那里可逆地凝固，再把冰冷回 $263.15\ \mathrm{K}$：
$$
\Delta S_\mathrm{sys} = 75.3\ln\frac{273.15}{263.15} - \frac{6010}{273.15} + 37.7\ln\frac{263.15}{273.15}
= 2.81 - 22.00 - 1.41 = -20.6\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
**环境。**环境收到的是 $263.15\ \mathrm{K}$ 上*实际*的凝固热，即同一条构造路线的焓变：$\Delta H = 75.3(10) - 6010 + 37.7(-10) = -5634\ \mathrm{J\,mol^{-1}}$，故 $\Delta S_\mathrm{surr} = +5634/263.15 = +21.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
**宇宙。**$\Delta S_\mathrm{univ} = -20.6 + 21.4 = +0.8\ \mathrm{J\,K^{-1}\,mol^{-1}} > 0$：凝固是自发的，但只是勉强——$-10\,^\circ\mathrm{C}$ 的驱动力很小，这就是过冷水能一直撑到晶种到来的原因。体系在*损失*熵；第二定律照例由环境保住。
:::
:::

::: widget plot
f: q*(1/300 - 1/x)
x: 300, 1200
y: 0, 0.35
sliders: q=100:10:500:10
labels: \Delta S_\text{宇宙} \text{ / } \mathrm{J\,K^{-1}}
caption: 热 $q$（滑块，单位 J）经纯热传导从温度 $T_\mathrm{h} = x$ 的热源流到 $300\ \mathrm{K}$ 的热源时产生的熵：$\Delta S_\mathrm{univ} = q(1/T_\mathrm{c} - 1/T_\mathrm{h})$。只有当 $T_\mathrm{h} \to T_\mathrm{c}$ 时熵产生才消失——这就是为什么温度相差可观的两物体间的换热是不可挽回的浪费，也是为什么可逆热机在每一点都必须由*恰好*处于工作温度的热源供热。每一瓦沿有限温差导下去的热，都是被制造出来、并以损失的功付了账的熵。
:::

## 熵的统计定义

::: proposition 玻尔兹曼熵 {#prop-boltzmann}
一个宏观态的熵为
$$
S = k_\mathrm{B} \ln W,
$$
其中 $W$ 是与宏观约束相容的微观状态数——所有粒子的位置、动量与内部状态的彼此不同的排布数——$k_\mathrm{B} = 1.381\times 10^{-23}\ \mathrm{J\,K^{-1}}$。对数是强制的：熵相加而微观状态数相乘，独立体系有 $W_{AB} = W_A W_B$，而 $\ln$ 是把前者变成后者的唯一函数。
:::

与宏观定义的桥梁是定量的：对正则系综，$S = k_\mathrm{B}\ln W$ 精确重现 $\mathrm{d}S = \delta q_\mathrm{rev}/T$，热被认定为能量散布到更多微观状态上，温度则是 $W$ 不愿增长的惰性（$1/T = \partial S/\partial U$）。完整的构造是[[statistical-thermodynamics/boltzmann-distribution|玻尔兹曼分布]]与[[statistical-thermodynamics/canonical-ensemble|正则系综]]的课题；这里我们用它来*数数*。

::: example 数微观状态 {#ex-counting}
(a) 四个分子分布在盒子的两半中。微观状态总数是多少？"四个全在左半"对应多少个？该宏观态的概率是多少？(b) 用同样的逻辑求一摩尔分子从被限制在盒子一半中放到整个盒子时的熵增，并与热力学结果比较。(c) CO 分子晶体的每个分子可以指向两个方向之一，而能量代价（几乎）为零。求每摩尔的残余熵。
::: solution
(a) 每个分子有 $2$ 种选择，故 $W_\text{总} = 2^4 = 16$；全左宏观态有 $W = 1$，概率 $1/16$。
(b) 对 $N$ 个分子，全在一侧的宏观态在 $2^N$ 中占 $W = 1$，比例 $2^{-N}$——对阿伏加德罗常数而言是 $10^{-10^{22}}$，这不是"不太可能"，而是物理上不可观测。放开整个盒子的熵增是
$$
\Delta S = k_\mathrm{B}\ln 2^N = N k_\mathrm{B}\ln 2 = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
与 $V_\mathrm{f}/V_\mathrm{i} = 2$ 的热力学结果 $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i})$ 完全相同：熵的两个定义不仅相容，而且是同一个数。
(c) $W = 2^N$ 种取向一直保存到 $0\ \mathrm{K}$，所以晶体在基态仍保有**残余熵** $S_0 = N k_\mathrm{B}\ln 2 = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}}$。CO 的光谱学（第三定律）熵比量热学熵恰好大出几乎这么多。
:::
:::

::: widget plot
f: log(x)
x: 1, 1000000
y: 0, 14
labels: S / k_\mathrm{B}
caption: 玻尔兹曼熵 $S/k_\mathrm{B} = \ln W$ 对微观状态数 $W$（横轴，线性）作图。曲线平得惊人：把排布方式数乘以*一百万*，$S/k_\mathrm{B}$ 才增加 $\ln 10^6 = 13.8$——每个粒子不过几个 $10^{-23}\ \mathrm{J\,K^{-1}}$。宏观熵之所以庞大（每摩尔 $R\ln 2$ 就是 $5.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$），只因为 $N \sim 10^{23}$ 把这些微薄的贡献乘了起来；对数也解释了热力学为何对 $W$ 的细节不敏感，以及"无序"的比喻为何总在 $W$ 并非显然巨大时失灵。
:::

冰给出了最著名的计数。莱纳斯·鲍林（Pauling）1935 年论证：冰中每个氧以两个短、两个长的距离结合四个氢，但每对以氢键相连的氧共享其氢的方式有两种：平均每条键 $3/2$ 种选择，每摩尔 $W = (3/2)^N$，残余熵 $R\ln(3/2) = 3.37\ \mathrm{J\,K^{-1}\,mol^{-1}}$——与量热学差值在实验误差内吻合。一个在 $0\ \mathrm{K}$ 看起来井然有序的晶体携带着熵，因为*位置的有序不等于排布的有序*。

## 第三定律与绝对熵

::: proposition 热力学第三定律 {#prop-third-law}
**能斯特热定理**：凝聚相间任何等温过程的熵变在 $T \rightarrow 0$ 时趋于零。
**普朗克表述**：*完美晶体*在 $T = 0\ \mathrm{K}$ 时熵为零，$S(0) = 0$，因为晶体有唯一的基态，$W = 1$。
推论：每种物质都有绝对熵 $S_\mathrm{m}^\circ(T) = \int_0^T C_{p,\mathrm{m}}(T')/T'\,\mathrm{d}T' + \sum \Delta_\mathrm{tr}H/T_\mathrm{tr}$，列于数据表中（$p^\circ = 1\ \mathrm{bar}$）；因为 $T \rightarrow 0$ 时 $C_{p,\mathrm{m}} \propto T^3$（德拜），积分在下限收敛；而绝对零度不能被任何有限步骤达到（**不可达性表述**）。
:::

第三定律使[[general-chemistry-2/entropy-free-energy|第一门课程]]的熵表从约定变成绝对，也正是它使残余熵成为对该表述普朗克版本的*可测量*的违背：CO、$\mathrm{N_2O}$、冰这类物质冻结进取向无序的基态，$W > 1$，把 $S_0 > 0$ 一路带到最低温度。第三定律说的是完美晶体；完美做不到之处，残余熵就告诉你这件事。

::: example 液态水的第三定律熵 {#ex-third-law-water}
用第三定律拼出液态水的 $S_\mathrm{m}^\circ(298.15\ \mathrm{K})$。已知积分 $\int_0^{273.15} C_{p,\mathrm{m}}(\text{冰})/T\,\mathrm{d}T$（$10\ \mathrm{K}$ 以下作德拜 $T^3$ 外推）贡献 $41.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$（$273.15\ \mathrm{K}$），$C_{p,\mathrm{m}}(\mathrm{l}) = 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$（$273.15$–$298.15\ \mathrm{K}$）。
::: solution
$$
S_\mathrm{m}^\circ = 41.3 + \frac{6010}{273.15} + 75.3\ln\frac{298.15}{273.15}
= 41.3 + 22.0 + 6.6 = 69.9\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
与 NIST-JANAF 表列值 $S_\mathrm{m}^\circ(\mathrm{H_2O,\,l}) = 69.95\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 吻合。每一张表里的每一个标准熵都是这样建起来的——把晶体从 $0\ \mathrm{K}$ 加热、熔化、加热液体、汽化、加热气体——这就是为什么由表计算的 $\Delta_\mathrm{r}S^\circ$ 是关于微观状态的*绝对*陈述，而不像 $\Delta_\mathrm{f}H^\circ$ 那样是约定。
:::
:::

## 后续内容

熵是整个课程的枢纽。有了 $S$，[[general-chemistry-2/entropy-free-energy|第一门课程]]的吉布斯自由能与亥姆霍兹自由能就能从第一性原理算出，而它们完整的热力学机器——化学势、麦克斯韦关系、判据 $\mathrm{d}G \le 0$——是[[thermodynamics/free-energy|下一章]]。积分 $C_{p,\mathrm{m}}/T$ 所需的热容与卡诺循环用到的绝热线，在[[thermodynamics/heat-capacity-adiabatic|热容与绝热变化]]中处理；相变及其 $\Delta H/T_\mathrm{tr}$ 项在[[thermodynamics/phase-equilibria|相平衡]]中回归，反应熵在[[thermodynamics/reaction-equilibrium|化学平衡的热力学]]中回归。统计一侧——从配分函数证明 $S = k_\mathrm{B}\ln W$、对真实分子求值、并在正则系综中使用——是[[statistical-thermodynamics/partition-function|配分函数]]与[[statistical-thermodynamics/thermodynamic-functions|热力学函数]]的纲领。两条告诫随身带走：熵裁决*是否*，从不裁决*多快*——那是[[kinetics/rate-laws|化学动力学]]的事——而[[electrochemistry/cell-thermodynamics|电化学电池]]的电功，是同一套熵记账在恒温恒压下的做法。冰的氢键计数在[[general-chemistry-2/liquids-solutions|液体与溶液]]中重现，量热方法在[[general-chemistry-1/thermochemistry|热化学]]中重现。

::: summary
- 第一定律平衡能量，却允许不可能的过程；第二定律补上方向：没有循环热机能把单一热源的热完全变为功（开尔文–普朗克），热不消耗功就不从冷流向热（克劳修斯）。
- 卡诺循环——两条可逆等温线加两条可逆绝热线——的效率为 $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$，而卡诺定理使它成为两温度之间的*最高*效率，对一切工作介质皆然。
- 要求这个效率来定义温度，就得到热力学（开尔文）温标，独立于任何物质属性；在此温标上，一切可逆热机满足 $q_\mathrm{c}/q_\mathrm{h} = -T_\mathrm{c}/T_\mathrm{h}$。
- 克劳修斯不等式 $\oint \delta q/T \le 0$ 使 $\mathrm{d}S = \delta q_\mathrm{rev}/T$ 成为恰当微分：熵是状态函数，而 $\Delta S_\mathrm{univ} \ge 0$ 是自发性的判据。
- 沿任何可逆路径计算 $\Delta S$：$\int C_{p,\mathrm{m}}\,\mathrm{d}T/T$、$\Delta_\mathrm{tr}H/T_\mathrm{tr}$、$C_{V,\mathrm{m}}\ln(T_2/T_1) + R\ln(V_2/V_1)$、$\Delta_\mathrm{mix}S = -nR\sum x_i\ln x_i$；不可逆过程中即便 $\Delta S_\mathrm{sys} < 0$，也有 $\Delta S_\mathrm{univ} > 0$。
- 统计上 $S = k_\mathrm{B}\ln W$；对数把相乘的微观状态变成相加的熵，残余熵（CO 的 $R\ln 2$、冰的 $R\ln\tfrac{3}{2}$）量的是被冻结的无序。
- 第三定律为完美晶体定下 $0\ \mathrm{K}$ 时 $S = 0$，使表列绝对熵成为可能，并使绝对零度不可达。
:::

## 练习

::: exercise 卡诺效率 {level=1 check="0.400"}
一台卡诺热机在 $T_\mathrm{h} = 500\ \mathrm{K}$ 与 $T_\mathrm{c} = 300\ \mathrm{K}$ 之间工作。以小数输入其效率。
::: solution
$\eta = 1 - T_\mathrm{c}/T_\mathrm{h} = 1 - 300/500 = 0.400$，百分之四十——这是两热源之间*任何*热机的天花板，也是真实热机以它为参照评级、而不是以 $100\,\%$ 评级的原因。
:::
:::

::: exercise 加热的熵变 {level=1 check="14.0"}
两摩尔铜，$C_{p,\mathrm{m}} = 24.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$，从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$。以 $\mathrm{J\,K^{-1}}$ 为单位输入 $\Delta S$。
::: solution
$\Delta S = nC_{p,\mathrm{m}}\ln(T_2/T_1) = 2 \times 24.4 \times \ln(400/300) = 48.8 \times 0.2877 = 14.0\ \mathrm{J\,K^{-1}}$。
:::
:::

::: exercise 自由膨胀 {level=1 check="11.5"}
两摩尔理想气体向真空等温膨胀，体积加倍。以 $\mathrm{J\,K^{-1}}$ 为单位输入 $\Delta S$。
::: solution
无热、无功、$\Delta U = 0$——但熵是状态函数，故用可逆等温路径：$\Delta S = nR\ln 2 = 2 \times 8.314 \times 0.6931 = 11.5\ \mathrm{J\,K^{-1}}$。这全部是 $\Delta S_\mathrm{univ}$，因为环境分毫未变：自由膨胀是纯粹的熵产生。
:::
:::

::: exercise 卡诺热机的功 {level=2 check="1.50"}
一台卡诺热机在 $T_\mathrm{h} = 750\ \mathrm{K}$ 与 $T_\mathrm{c} = 300\ \mathrm{K}$ 之间工作，每循环从高温热源吸收 $2.50\ \mathrm{kJ}$。以 $\mathrm{kJ}$ 为单位输入每循环输出的功。
::: solution
$\eta = 1 - 300/750 = 0.600$，故 $-w = \eta q_\mathrm{h} = 0.600 \times 2.50 = 1.50\ \mathrm{kJ}$，而 $q_\mathrm{c} = -(2.50 - 1.50) = -1.00\ \mathrm{kJ}$ 被排出。热比检验了温度：$|q_\mathrm{c}|/q_\mathrm{h} = 0.400 = 300/750$。
:::
:::

::: exercise 混合路径的熵变 {level=2 check="24.3"}
两摩尔氩气（$C_{V,\mathrm{m}} = \tfrac{3}{2}R$）从 $300\ \mathrm{K}$、$20.0\ \mathrm{L}$ 到 $500\ \mathrm{K}$、$40.0\ \mathrm{L}$。以 $\mathrm{J\,K^{-1}}$ 为单位输入 $\Delta S$。
::: solution
$\Delta S = nC_{V,\mathrm{m}}\ln(T_2/T_1) + nR\ln(V_2/V_1) = 2 \times 12.47 \times \ln(5/3) + 2 \times 8.314 \times \ln 2 = 24.94 \times 0.5108 + 11.53 = 12.74 + 11.53 = 24.3\ \mathrm{J\,K^{-1}}$。
:::
:::

::: exercise 混合熵 {level=2 check="18.7"}
一摩尔氦与三摩尔氖，初始各在 $298\ \mathrm{K}$、$1\ \mathrm{bar}$，在恒温恒压下混合。以 $\mathrm{J\,K^{-1}}$ 为单位输入 $\Delta_\mathrm{mix}S$。
::: solution
$x(\mathrm{He}) = 0.250$、$x(\mathrm{Ne}) = 0.750$：
$$
\Delta_\mathrm{mix}S = -4 \times 8.314\,(0.250\ln 0.250 + 0.750\ln 0.750)
= -33.26 \times (-0.5623) = 18.7\ \mathrm{J\,K^{-1}}.
$$
$-\sum x\ln x$ 的最大值在等摩尔处，所以同样四摩尔按 $1:1$ 混合将给出 $4R\ln 2 = 23.1\ \mathrm{J\,K^{-1}}$——摩尔分数均衡时混合最划算。
:::
:::

::: exercise 从卡诺到克劳修斯 {level=3}
只使用卡诺定理（两热源之间的任何热机 $\eta \le 1 - T_\mathrm{c}/T_\mathrm{h}$）与可逆热机的热–温比 $q_\mathrm{c}/q_\mathrm{h} = -T_\mathrm{c}/T_\mathrm{h}$，证明在两热源之间工作的循环的克劳修斯不等式 $\oint \delta q/T \le 0$，并指出循环可逆时论证中哪一步失效。
::: solution
对 $T_\mathrm{h}$ 与 $T_\mathrm{c}$ 之间的任何热机，$\eta = 1 + q_\mathrm{c}/q_\mathrm{h} \le 1 - T_\mathrm{c}/T_\mathrm{h}$。整理得 $q_\mathrm{c}/q_\mathrm{h} \le -T_\mathrm{c}/T_\mathrm{h}$；因 $q_\mathrm{h} > 0$、$T_\mathrm{h} > 0$，交叉相乘后再除以 $T_\mathrm{c} > 0$ 得 $q_\mathrm{c}/T_\mathrm{c} \le -q_\mathrm{h}/T_\mathrm{h}$，即 $q_\mathrm{h}/T_\mathrm{h} + q_\mathrm{c}/T_\mathrm{c} \le 0$——这就是两热源循环的不等式。对可逆热机，这条不等式链从卡诺定理的等号出发（两热源之间的可逆热机按温标定义就达到 $1 - T_\mathrm{c}/T_\mathrm{h}$），故积分为零。对可逆循环失效的那一步是*严格*不等号：若一个所谓可逆循环有 $\oint \delta q/T < 0$，把它倒过来跑就得到另一个可逆循环的 $\oint \delta q/T > 0$，即一台效率高于卡诺的热机——所以可逆性逼出等号，而等号正是使 $\mathrm{d}S$ 恰当的东西。
:::
:::

::: exercise 两个物块：传导对热机 {level=3 check="1.44"}
两个相同的物块，热容各为 $C = 200\ \mathrm{J\,K^{-1}}$，初始分别在 $300\ \mathrm{K}$ 与 $400\ \mathrm{K}$。(a) 把它们放入绝热箱中热接触：求终温与 $\Delta S_\mathrm{univ}$。(b) 改为让一台可逆热机在两者之间运转直到共温：求该终温与输出的功。以 $\mathrm{kJ}$ 为单位输入功。
::: solution
(a) 能量守恒给出 $T_\mathrm{f} = (300 + 400)/2 = 350\ \mathrm{K}$，而
$$
\Delta S_\mathrm{univ} = C\ln\frac{350}{300} + C\ln\frac{350}{400}
= 200\ln\frac{49}{48} = 4.12\ \mathrm{J\,K^{-1}} > 0 .
$$
(b) 对可逆热机 $\Delta S_\mathrm{univ} = 0$：$C\ln(T_\mathrm{f}/300) + C\ln(T_\mathrm{f}/400) = 0$，故 $T_\mathrm{f}^2 = 300 \times 400$，$T_\mathrm{f} = 346.4\ \mathrm{K}$——几何平均，低于传导的算术平均。没有变成功而留在物块里的能量，就是
$$
W = C(300 + 400 - 2 \times 346.4) = 200 \times 7.18 = 1.44\ \mathrm{kJ}.
$$
这就是热传导的代价：让 $100\ \mathrm{K}$ 的温差不经热机自行跑平，就销毁了 $1.44\ \mathrm{kJ}$ 的功，制造了 $4.12\ \mathrm{J\,K^{-1}}$ 的熵。
:::
:::
