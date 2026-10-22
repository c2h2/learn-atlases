第一门课程把"它会不会发生"这个问题化归为一个数：算出 $\Delta G$，读它的符号（[[general-chemistry-2/entropy-free-energy|熵与自由能]]）。这条规则管用，而且会继续管用——可它把多得可疑的结构藏进了一个字母 $G$ 里。为什么一个差 $H - TS$——焓与熵这两个如此不同的量之差——竟是裁决一切的东西？改变温度，或把体系挤压到一万巴，$G$ 会变成什么样？而此后每一章都当作呼吸的空气来使用的*化学势*，究竟是什么？本章用一个工具回答这三个问题：仔细地对 $G$ 求微分，然后读它交出来的东西。

这个工具是恰当微分的微积分，而回报是一小组恒等式——基本方程、四条麦克斯韦关系式、吉布斯-亥姆霍兹方程——它们合起来生成了物理化学的大部分。记账约定与[[thermodynamics/first-law|热力学第一定律]]相同：$\Delta U = q + w$，其中 $w$ 是**外界对体系做的功**，且 $p^\circ = 1\ \mathrm{bar}$；熵 $S$ 与判据 $\mathrm{d}G \le 0$ 来自[[thermodynamics/second-law|热力学第二定律]]。新的是论证的层次：我们不再逐个反应地计算 $\Delta G$，而是一劳永逸地算出 $\mathrm{d}G$ *必须*包含什么，然后让推论自行落到[[thermodynamics/phase-equilibria|相平衡]]、[[thermodynamics/mixtures|混合物]]、[[thermodynamics/reaction-equilibrium|化学平衡]]与[[thermodynamics/ions-in-solution|溶液中的离子]]。

## 恰当微分，以及作为状态函数的代价

热力学无情地区分体系*拥有*的量与过程*做出*的事。热力学能、焓与熵是态的性质；热与功属于途径。这一区分的数学名字是恰当性。

::: definition 恰当微分 {#def-exact}
微分形式 $\delta F = M\,\mathrm{d}x + N\,\mathrm{d}y$ 称为**恰当**的，如果存在函数 $F(x, y)$ 使 $\mathrm{d}F = M\,\mathrm{d}x + N\,\mathrm{d}y$；等价地，如果它两点之间的积分与路径无关，或沿任一循环 $\oint \delta F = 0$。对连续的 $M$ 与 $N$，判别法只有一个方程：$\delta F$ 恰当当且仅当
$$
\left(\frac{\partial M}{\partial y}\right)_x = \left(\frac{\partial N}{\partial x}\right)_y .
$$
微分恰当的量是**状态函数**。第一定律发现 $\mathrm{d}U$ 恰当而 $\delta q$、$\delta w$ 不恰当；第二定律的发现是 $\delta q_\mathrm{rev}/T$ 恰当，并把它积分命名为 $S$。
:::

恰当性还有第二副面孔，它驱动着整章：若 $\mathrm{d}F$ 恰当，则求导的次序无关紧要，$\partial^2 F/\partial x\,\partial y = \partial^2 F/\partial y\,\partial x$。每一条麦克斯韦关系式都是这句话的化装。在把这句话花掉之前，我们先需要三条在状态方程约束下处理偏导数的日常规则。

::: proposition 倒数法则、链式法则与循环法则 {#prop-partial-rules}
对于被一个状态方程拴在一起的简单体系的变量，
$$
\left(\frac{\partial x}{\partial y}\right)_z = \frac{1}{\left(\partial y/\partial x\right)_z}
\qquad\text{(reciprocal)},
\qquad
\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial w}\right)_z = \left(\frac{\partial x}{\partial w}\right)_z
\qquad\text{(chain)},
$$
$$
\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial z}\right)_x\left(\frac{\partial z}{\partial x}\right)_y = -1
\qquad\text{(cyclic)}.
$$
:::

::: proof
把 $x$ 写成 $x = x(y, z)$，于是 $\mathrm{d}x = (\partial x/\partial y)_z\,\mathrm{d}y + (\partial x/\partial z)_y\,\mathrm{d}z$。保持 $x$ 不变（$\mathrm{d}x = 0$）并除以 $\mathrm{d}z$，得 $0 = (\partial x/\partial y)_z (\partial y/\partial z)_x + (\partial x/\partial z)_y$，故 $(\partial x/\partial y)_z = -(\partial x/\partial z)_y / (\partial y/\partial z)_x$。两边乘以 $(\partial y/\partial z)_x (\partial z/\partial x)_y$，并用倒数法则 $(\partial x/\partial z)_y (\partial z/\partial x)_y = 1$——倒数法则本身由比较恒 $z$ 下的 $\mathrm{d}x = (\partial x/\partial y)_z\,\mathrm{d}y$ 与它的反函数立得——循环法则即告成立。链式法则就是一元链式法则，只是把 $z$ 当作乘客捎带一路。
:::

::: example 理想气体的循环法则 {#ex-cyclic-rule}
$1\ \mathrm{mol}$ 理想气体在 $300\ \mathrm{K}$、$V = 24.94\ \mathrm{L}$ 下压强为 $p = 1.000\ \mathrm{bar}$。在此状态计算循环法则的三个偏导数，并验证其乘积。
::: solution
$$
\left(\frac{\partial p}{\partial T}\right)_V = \frac{nR}{V} = \frac{8.314}{0.02494\ \mathrm{m^3}} = 333\ \mathrm{J\,m^{-3}\,K^{-1}} = 333\ \mathrm{Pa\,K^{-1}},
$$
$$
\left(\frac{\partial T}{\partial V}\right)_p = \frac{p}{nR} = \frac{1.000\times 10^{5}}{8.314} = 1.203\times 10^{4}\ \mathrm{K\,m^{-3}},
\qquad
\left(\frac{\partial V}{\partial p}\right)_T = -\frac{nRT}{p^2} = -\frac{V}{p} = -2.494\times 10^{-7}\ \mathrm{m^3\,Pa^{-1}} .
$$
乘积为 $333 \times 1.203\times 10^{4} \times \left(-2.494\times 10^{-7}\right) = -1.000$。每个因子都是个别扭的数字；它们的乘积却恰好是 $-1$。这正是该法则的实用价值：它让你用一个测不了的偏导数去换两个测得了的，而且它是任何候选状态方程都必须通过的一致性检验。
:::
:::

从本章往后，每个势都是状态函数，所以它们的微分全都恰当——而恰当性不同于第一、第二定律，是一条不花分毫实验成本的信息来源。

## 四个势与其基本方程

熵是孤立体系的天然坐标，可是没有人在烧瓶里固定熵。化学家控制的是温度、压强与量——而势正是成对地为此种交换设计的。把一个变量换成它的共轭斜率是勒让德变换；我们不在构造上多花笔墨，只注意每个新势都由 $U$ 加或减一对共轭量的乘积（$pV$ 或 $TS$）而成。

::: definition 四个热力学势 {#def-potentials}
封闭简单体系的**热力学势**是热力学能 $U$、焓 $H = U + pV$、**亥姆霍兹自由能** $A = U - TS$ 与**吉布斯自由能** $G = H - TS = U + pV - TS$。四个都是状态函数，且各有其**自然变量**：$U(S, V)$、$H(S, p)$、$A(T, V)$、$G(T, p)$。知道一个势作为其自然变量的函数，就等于知道*一切*——其他任何热力学性质都可由求导得到。
:::

::: proposition 基本方程 {#prop-fundamental}
对组成固定、只做膨胀功的封闭体系，四个势满足
$$
\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V, \qquad
\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p,
$$
$$
\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V, \qquad
\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p .
$$
:::

::: proof
取两个相邻的平衡态。因为 $U$ 是状态函数，$\Delta U$ 可沿任意路径计算，那就选一条可逆的：$\mathrm{d}U = \delta q_\mathrm{rev} + \delta w_\mathrm{rev} = T\,\mathrm{d}S - p\,\mathrm{d}V$，即第一定律配上第二定律的 $\delta q_\mathrm{rev} = T\,\mathrm{d}S$ 与膨胀功 $\delta w_\mathrm{rev} = -p\,\mathrm{d}V$。其余三个由定义求微分立得：$\mathrm{d}H = \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p = T\,\mathrm{d}S + V\,\mathrm{d}p$；$\mathrm{d}A = \mathrm{d}U - T\,\mathrm{d}S - S\,\mathrm{d}T = -S\,\mathrm{d}T - p\,\mathrm{d}V$；以及 $\mathrm{d}G = \mathrm{d}H - T\,\mathrm{d}S - S\,\mathrm{d}T = -S\,\mathrm{d}T + V\,\mathrm{d}p$。
:::

把系数读成导数。仅由 $\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p$ 就有

$$
\left(\frac{\partial G}{\partial T}\right)_p = -S, \qquad
\left(\frac{\partial G}{\partial p}\right)_T = V,
$$

而这两行将占据本章的最后三分之一。这些方程同时指定了哪个势充当判据，因为每个势都在其自然变量被固定的条件下取极小。

::: proposition 由势得到的自发性判据 {#prop-natural}
对与温度 $T$ 的热浴、压强 $p$ 的环境接触且只交换膨胀功的封闭体系：
$$
\text{constant } T, p: \quad \mathrm{d}G \le 0; \qquad
\text{constant } T, V: \quad \mathrm{d}A \le 0,
$$
平衡时取等号。自发方向是降低与约束相匹配的那个势的方向，平衡即其极小。
:::

::: proof
[[thermodynamics/second-law|第二定律]]的克劳修斯不等式说，与温度为 $T$ 的热浴接触的体系满足 $\delta q \le T\,\mathrm{d}S$，故第一定律给出 $\mathrm{d}U = \delta q - p\,\mathrm{d}V \le T\,\mathrm{d}S - p\,\mathrm{d}V$。在恒 $T$ 恒 $p$ 下，$G = U + pV - TS$ 的微分是 $\mathrm{d}G = \mathrm{d}U + p\,\mathrm{d}V - T\,\mathrm{d}S \le 0$；在恒 $T$ 恒 $V$ 下，$A = U - TS$ 的微分是 $\mathrm{d}A = \mathrm{d}U - T\,\mathrm{d}S \le 0$。两个势都不可能跌破各自的平衡值，否则逆向变化会把它降得更低；极小即平衡。
:::

::: warning 基本方程不是全部 {#warn-natural}
四行整洁的公式诱把你把它们当作普适的。它们不是：每一行描述的都是**组成固定的封闭体系**，且**只交换膨胀功**；而判据 $\mathrm{d}G \le 0$、$\mathrm{d}A \le 0$ 分别只属于恒 $T, p$ 与恒 $T, V$。把体系打开——让水蒸发、让反应进行、让一摩尔离子穿过膜——每个方程就都缺一项 $\sum_i \mu_i\,\mathrm{d}n_i$；那一项就是本章最后一节。让体系输出电功，像原电池那样（[[electrochemistry/cell-thermodynamics]]），又会多出一个功项。而密封刚性容器里的反应最小化的是 $A$，不是 $G$——在错误的约束下用错误的势，是热力学考试里资历最老的错误。
:::

::: widget plot
f: hm - sm*x/1000
x: 0, 1500
y: -450, 50
sliders: hm=-200:-500:100:10; sm=150:0:400:5
labels: G_\mathrm{m} \text{ / } \mathrm{kJ\,mol^{-1}}
caption: 某假想物质的摩尔吉布斯自由能 $G_\mathrm{m} = H_\mathrm{m} - T S_\mathrm{m}$ 对温度作图（滑块：$H_\mathrm{m}$，单位 $\mathrm{kJ\,mol^{-1}}$；$S_\mathrm{m}$，单位 $\mathrm{J\,K^{-1}\,mol^{-1}}$）。$S_\mathrm{m}$ 恒定时图线是斜率为 $-S_\mathrm{m}$ 的直线：熵就是 $G$ 随温度下降的速率。真实物质是这样一串线段，一段比一段陡，因为 $S_\mathrm{m}$ 在每个相变处向上跳一截——这些折点正是[[thermodynamics/phase-equilibria|下一章]]赖以生存的东西。
:::

::: quiz
一只密封、刚性、导热的钢制容器装着反应性气体混合物；环境温度恒定。混合物趋近平衡的过程中，被最小化的是哪个量？
- [x] 亥姆霍兹自由能 $A$：约束是恒 $T$（导热壁、热浴）与恒 $V$（刚性容器）。
- [ ] 吉布斯自由能 $G$：它永远是被最小化的量。
- [ ] 气体混合物的熵。
- [ ] 热力学能 $U$：反应释放能量。
::: solution
约束挑选势，而这里的约束是 $T$ 与 $V$，所以 $A$ 降到极小。$G$ 只在恒 $T$ 恒 $p$ 下取极小——而容器反应时压强在变。体系自身的熵尽可以减少（环境赚得更多），$U$ 也不取极小：热流向热浴，被最小化的是 $U - TS$，用能量换熵。
:::
:::

## 麦克斯韦关系式

因为每条基本方程都是恰当微分，其系数的交叉导数必须相等。把这招用四次，得到四条力量不成比例的恒等式。

::: proposition 麦克斯韦关系式 {#prop-maxwell}
对封闭简单体系，
$$
\left(\frac{\partial T}{\partial V}\right)_S = -\left(\frac{\partial p}{\partial S}\right)_V, \qquad
\left(\frac{\partial T}{\partial p}\right)_S = \left(\frac{\partial V}{\partial S}\right)_p,
$$
$$
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V, \qquad
\left(\frac{\partial S}{\partial p}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_p .
$$
:::

::: proof
对每个势依次使用交叉导数相等。对 $A(T, V)$：$\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V$ 给出 $\left(\partial(-S)/\partial V\right)_T = \left(\partial(-p)/\partial T\right)_V$，即 $(\partial S/\partial V)_T = (\partial p/\partial T)_V$。对 $G(T, p)$：$\left(\partial(-S)/\partial p\right)_T = \left(\partial V/\partial T\right)_p$ 给出 $(\partial S/\partial p)_T = -(\partial V/\partial T)_p$。剩下两条由 $U(S, V)$ 与 $H(S, p)$ 完全同样地得到。
:::

麦克斯韦关系式的要点永远是同一笔交易：它把熵的偏导数——不可测量，因为你无法把传感器接到 $S$ 上——换成 $p$、$V$、$T$ 的偏导数，而后者由膨胀计与压力计提供。任何物质的熵都能只用一支温度计和一个活塞测绘出来。三个算例展示这台机器如何工作。

::: proposition 能量压强 {#prop-energy-pressure}
$$
\left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p .
$$
对理想气体右端为零——焦耳定律，此处仅由状态方程导出。对范德瓦尔斯气体，$p = nRT/(V - nb) - a(n/V)^2$，它等于 $a(n/V)^2 > 0$：实际气体的热力学能随体积上升，因为膨胀让分子爬出彼此的吸引势阱。
:::

::: proof
由 $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$，在恒温下除以 $\mathrm{d}V$：$(\partial U/\partial V)_T = T(\partial S/\partial V)_T - p$。第三条麦克斯韦关系式把 $(\partial S/\partial V)_T$ 换成 $(\partial p/\partial T)_V$，即得结果。对理想气体 $(\partial p/\partial T)_V = nR/V = p/T$，右端为 $p - p = 0$。对范德瓦尔斯气体 $(\partial p/\partial T)_V = nR/(V - nb)$，故 $T(\partial p/\partial T)_V - p = a(n/V)^2$。
:::

::: example $\mathrm{CO_2}$ 内部的结合有多强？ {#ex-energy-pressure}
$298.15\ \mathrm{K}$、$1.00\ \mathrm{bar}$ 的二氧化碳近乎理想，$V_\mathrm{m} = 24.79\ \mathrm{L\,mol^{-1}}$；范德瓦尔斯参数 $a = 3.640\ \mathrm{L^2\,bar\,mol^{-2}}$（CRC）。估算能量压强 $\left(\partial U_\mathrm{m}/\partial V_\mathrm{m}\right)_T$，以及恒温下把摩尔体积加倍所需的能量。
::: solution
$$
\left(\frac{\partial U_\mathrm{m}}{\partial V_\mathrm{m}}\right)_T = \frac{a}{V_\mathrm{m}^2}
= \frac{3.640\ \mathrm{L^2\,bar\,mol^{-2}}}{\left(24.79\ \mathrm{L\,mol^{-1}}\right)^2}
= 5.92\times 10^{-3}\ \mathrm{bar} = 592\ \mathrm{Pa}.
$$
帕斯卡就是每立方米焦耳，所以气体每造出一立方米的摩尔体积，热力学能就增加 $592\ \mathrm{J}$。体积加倍的代价是 $\Delta U_\mathrm{m} = a\left(1/V_\mathrm{i} - 1/V_\mathrm{f}\right) = a/2V_\mathrm{i} = 7.3\ \mathrm{J\,mol^{-1}}$，膨胀到无限稀释则是 $14.7\ \mathrm{J\,mol^{-1}}$——与 $RT\ln 2 = 1.7\ \mathrm{kJ\,mol^{-1}}$ 的自由能相比可以忽略，这就是焦耳定律对稀薄气体如此好用的原因。在液体密度下，$V_\mathrm{m} \approx 0.05\ \mathrm{L\,mol^{-1}}$，同一公式给出约 $1500\ \mathrm{bar}$：在液体内部，膨胀的能量代价与压强本身不相上下，焦耳定律彻底失效。
:::
:::

::: proposition 焓压强，以及与焦耳-汤姆孙的联系 {#prop-enthalpy-pressure}
$$
\left(\frac{\partial H}{\partial p}\right)_T = V - T\left(\frac{\partial V}{\partial T}\right)_p = V\left(1 - \alpha T\right),
\qquad
\mu_\mathrm{JT} = \left(\frac{\partial T}{\partial p}\right)_H = -\frac{V\left(1 - \alpha T\right)}{C_{p,\mathrm{m}}},
$$
其中 $\alpha = (1/V)(\partial V/\partial T)_p$ 为热膨胀系数。理想气体有 $\alpha T = 1$，两个系数都为零；物质恰在 $\alpha T > 1$ 处节流降温。
:::

::: proof
由 $\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p$，$(\partial H/\partial p)_T = T(\partial S/\partial p)_T + V$；第四条麦克斯韦关系式把 $(\partial S/\partial p)_T$ 换成 $-(\partial V/\partial T)_p$，得第一个公式。第二个就是 [[thermodynamics/heat-capacity-adiabatic]] 中的焦耳-汤姆孙系数的改写：沿等焓线，$0 = \mathrm{d}H = C_{p,\mathrm{m}}\,\mathrm{d}T + (\partial H/\partial p)_T\,\mathrm{d}p$，故 $\mu_\mathrm{JT} = -(\partial H/\partial p)_T/C_{p,\mathrm{m}}$。
:::

::: example 挤压水：液体的焓压强 {#ex-hp-water}
$298.15\ \mathrm{K}$ 的液态水：$V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$，$\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$（CRC）。求 $(\partial H_\mathrm{m}/\partial p)_T$ 与焦耳-汤姆孙系数，并说明水节流通过阀门时会发生什么。
::: solution
$\alpha T = 2.57\times 10^{-4} \times 298.15 = 0.0766$，所以
$$
\left(\frac{\partial H_\mathrm{m}}{\partial p}\right)_T = V_\mathrm{m}\left(1 - \alpha T\right)
= 18.07 \times 0.9234\ \mathrm{cm^3\,mol^{-1}} = 16.7\ \mathrm{cm^3\,mol^{-1}},
$$
$$
\mu_\mathrm{JT} = -\frac{16.7\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}}{75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= -2.2\times 10^{-7}\ \mathrm{K\,Pa^{-1}} = -0.022\ \mathrm{K\,bar^{-1}} .
$$
水节流时*升温*，每巴约两百分之一度。液体（以及高于自身转化温度的气体）处在 $\alpha T < 1$ 的区域，把分子推近所加的能量快过其吸引势能所能偿付的部分；低于转化温度的气体处在 $\alpha T > 1$ 区域而降温——这个符号变化正是林德液化机吃的饭。
:::
:::

::: proposition 熵对压强与体积 {#prop-sp}
第三、第四条麦克斯韦关系式读作
$$
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V, \qquad
\left(\frac{\partial S}{\partial p}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_p = -\alpha V .
$$
对理想气体，第一条给出 $(\partial S/\partial V)_T = nR/V$，故 $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i})$——[[thermodynamics/second-law|第二定律一章]]的等温膨胀熵，如今由恰当性而非构造的路径导出。对拉伸的橡胶，类似的关系是 $(\partial S/\partial L)_T = -(\partial f/\partial T)_L$，其中 $f$ 为张力：橡胶有 $(\partial f/\partial T)_L > 0$，所以拉伸*降低*它的熵，而挂了重物的橡皮筋受热会收缩——戈夫-焦耳（Gough–Joule）效应，一台由聚合物对无序的渴望造成的热机。
:::

::: example 压缩水：熵对压强 {#ex-sp-water}
估算 $298.15\ \mathrm{K}$ 的液态水从 $1.00\ \mathrm{bar}$ 压缩到 $1000\ \mathrm{bar}$ 的摩尔熵变，取 $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$、$V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ 为常数。结果小吗？
::: solution
$\Delta S_\mathrm{m} \approx -\alpha V_\mathrm{m}\,\Delta p = -2.57\times 10^{-4} \times 18.07\times 10^{-6}\ \mathrm{m^3} \times 9.99\times 10^{7}\ \mathrm{Pa} = -0.46\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
与 $\Delta_\mathrm{vap}S = 109\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 相比，一千巴几乎碰不动液体的熵——分子已经贴身而坐，压缩时无处可去。但小不等于零：在 $300\ \mathrm{K}$，项 $T\Delta S$ 为 $140\ \mathrm{J\,mol^{-1}}$，而对压强敏感的*反应*会放大这根杠杆。蛋白质展开的 $\Delta V \approx -40\ \mathrm{cm^3\,mol^{-1}}$，故 $(\partial \Delta G/\partial p)_T = \Delta V$ 使展开自由能每千巴移动约 $-4\ \mathrm{kJ\,mol^{-1}}$——足以在其他一切都没变的压强下使蛋白质变性，这既是深海生物学的麻烦，也是工业超高压灭菌的原理。
:::
:::

::: quiz
你想仅凭状态方程计算实际气体的 $\left(\partial U/\partial V\right)_T$。需要哪条麦克斯韦关系式？
- [x] $\left(\partial S/\partial V\right)_T = \left(\partial p/\partial T\right)_V$，因为 $\left(\partial U/\partial V\right)_T = T\left(\partial S/\partial V\right)_T - p$。
- [ ] $\left(\partial S/\partial p\right)_T = -\left(\partial V/\partial T\right)_p$，因为 $U$ 不含 $p$。
- [ ] $\left(\partial T/\partial V\right)_S = -\left(\partial p/\partial S\right)_V$，因为 $U$ 以 $S$ 为自然变量。
- [ ] 都不需要：对任何气体 $\left(\partial U/\partial V\right)_T = 0$。
::: solution
在恒温下把 $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ 除以 $\mathrm{d}V$，剩下 $(\partial S/\partial V)_T$，而只有第三条关系式把它换成状态方程的导数 $(\partial p/\partial T)_V$。第四条处理的是 $(\partial H/\partial p)_T$；前两条保持熵不变，很少用到；最后那个选项是焦耳定律，只对理想气体成立——能量压强这个概念的全部意义，就在于实际气体通不过它。
:::
:::

## 温度依赖：$(\partial G/\partial T)_p = -S$ 与吉布斯-亥姆霍兹方程

$G$ 对温度的斜率是 $-S$，所以一切物质的 $G$ 都随 $T$ 上升而下降，且熵越大降得越快。蒸气的 $S_\mathrm{m}$ 是液体的两到三倍，下坡最陡——所以 $\mu$ 对 $T$ 的蒸气线必在某处与液体线相交，而在交点处两相共享同一个化学势、共存。交点以下液体稳定，以上蒸气稳定。这一个斜率论证就是[[thermodynamics/phase-equilibria|下一章]]由之生长的种子；这里我们把斜率用成定量的。

::: proposition 吉布斯-亥姆霍兹方程 {#prop-gh}
对恒温压下的任何物质或任何变化（反应、相变、溶解），
$$
\left(\frac{\partial (G/T)}{\partial T}\right)_p = -\frac{H}{T^2},
\qquad
\left(\frac{\partial (\Delta G/T)}{\partial T}\right)_p = -\frac{\Delta H}{T^2},
$$
若 $\Delta H$ 在区间内恒定，则
$$
\frac{\Delta G(T_2)}{T_2} = \frac{\Delta G(T_1)}{T_1} + \Delta H\left(\frac{1}{T_2} - \frac{1}{T_1}\right).
$$
:::

::: proof
在恒压下对 $T$ 微分 $G/T = (H - TS)/T$，并用 $(\partial G/\partial T)_p = -S$：
$$
\left(\frac{\partial (G/T)}{\partial T}\right)_p = \frac{1}{T}\left(\frac{\partial G}{\partial T}\right)_p - \frac{G}{T^2}
= -\frac{S}{T} - \frac{H - TS}{T^2} = -\frac{H}{T^2}.
$$
对终态与初态分别写出此式再相减，即得 $\Delta$ 版本。取 $\Delta H$ 为常数积分，并用 $\int T^{-2}\,\mathrm{d}T = -1/T$，即得双温度公式。
:::

::: example $500\ \mathrm{K}$ 下的氨合成 {#ex-nh3-gh}
对 $\tfrac{1}{2}\,\mathrm{N_2(g)} + \tfrac{3}{2}\,\mathrm{H_2(g)} \rightarrow \mathrm{NH_3(g)}$，取 $\Delta_\mathrm{f}H^\circ = -45.9\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{f}G^\circ(298.15\ \mathrm{K}) = -16.45\ \mathrm{kJ\,mol^{-1}}$（NIST-JANAF）。用吉布斯-亥姆霍兹方程估算 $500\ \mathrm{K}$ 的 $\Delta_\mathrm{f}G^\circ$，并求该温度的 $K$。
::: solution
$$
\frac{\Delta_\mathrm{f}G^\circ(500)}{500}
= \frac{-16\,450}{298.15} + \left(-45\,900\right)\left(\frac{1}{500} - \frac{1}{298.15}\right)
= -55.17 + 62.15 = 6.98\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
故 $\Delta_\mathrm{f}G^\circ(500\ \mathrm{K}) = 500 \times 6.98 = +3.49\ \mathrm{kJ\,mol^{-1}}$，而
$$
K = \exp\!\left(-\frac{3490}{8.314 \times 500}\right) = e^{-0.839} = 0.43 .
$$
符号翻过来了：$500\ \mathrm{K}$ 下标准态的氨不再占优，因为 $\Delta_\mathrm{r}G$ 的斜率是 $-\Delta_\mathrm{r}S = +99\ \mathrm{J\,K^{-1}\,mol^{-1}}$——这个反应消灭气体摩尔数，升温要它为此付账。哈伯法接受每程 $K < 1$，靠压强补偿，压强从 [[general-chemistry-2/chemical-equilibrium|平衡一章]]的 $RT\ln Q$ 项进来。把 $\Delta H$ 当常数与基尔霍夫定律是同一个近似；跨几百开尔文它精确到零点几 $\mathrm{kJ\,mol^{-1}}$，而在任何参与物的相变附近失效。
:::
:::

::: warning 每个 $G$ 都随 $T$ 下降；$\Delta G$ 却可能上升 {#warn-gt-slope}
对一切物质 $(\partial G_\mathrm{m}/\partial T)_p = -S_\mathrm{m} < 0$，于是有些学生由此断定反应会随升温变得越来越自发。$\Delta_\mathrm{r}G$ 对 $T$ 的斜率不是 $-S$ 而是 $-\Delta_\mathrm{r}S$，而后者可以为正：$\mathrm{CaCO_3}$ 分解的 $\Delta_\mathrm{r}S > 0$，升温推动反应正向进行；氨合成的 $\Delta_\mathrm{r}S < 0$，升温把它推回去。要紧的是斜率之*差*，不是斜率本身——与热化学里干活的是 $\Delta H$ 而非 $H$，是同一个道理。
:::

::: widget plot
f: -sl*(x-373.15)/1000 ; -sv*(x-373.15)/1000
x: 250, 500
y: -30, 30
sliders: sl=70:40:120:1; sv=189:120:260:1
labels: \mu_\mathrm{l}(T); \mu_\mathrm{g}(T)
caption: 液态水与水蒸气的化学势对温度作图，以二者在 $373.15\ \mathrm{K}$ 的共同值为零点（滑块：两相的摩尔熵，单位 $\mathrm{J\,K^{-1}\,mol^{-1}}$，默认 $S_\mathrm{m}(\mathrm{l}) = 70$、$S_\mathrm{m}(\mathrm{g}) = 189$）。两条线在 $373.15\ \mathrm{K}$ 穿过同一点——相变处两相共享同一个 $\mu$——但蒸气线的下降快了近三倍，因为 $S_\mathrm{m}(\mathrm{g}) \gg S_\mathrm{m}(\mathrm{l})$。交点以下液体的 $\mu$ 更低、液相稳定；交点以上轮到蒸气。拖动滑块试试：交点纹丝不动，因为 $\mu$ 在 $T_\mathrm{tr}$ 处相等正是相变的定义；只有下降的陡度——错误的那一相失去稳定的速度——会响应。
:::

## 压强依赖：$(\partial G/\partial p)_T = V$

::: proposition $G$ 的压强依赖 {#prop-gp}
对组成固定的封闭体系，$\left(\partial G/\partial p\right)_T = V$，故沿等温线 $\Delta G = \int V\,\mathrm{d}p$。对 $1\ \mathrm{mol}$ 理想气体，
$$
G_\mathrm{m}(p_2) - G_\mathrm{m}(p_1) = RT\ln\frac{p_2}{p_1},
$$
而对 $V_\mathrm{m}$ 近乎恒定的凝聚相，
$$
\Delta G_\mathrm{m} \approx V_\mathrm{m}\,\Delta p .
$$
:::

::: proof
恒温下 $\mathrm{d}G = V\,\mathrm{d}p$；对气体代入 $V_\mathrm{m} = RT/p$ 积分，对凝聚相取 $V_\mathrm{m} \approx$ 常数。两个结果在常压下相差三个数量级：$298.15\ \mathrm{K}$、$1\ \mathrm{bar}$ 时，斜率 $(\partial G_\mathrm{m}/\partial p)_T$ 对气体是 $2.48\ \mathrm{kJ\,mol^{-1}\,bar^{-1}}$，对液态水只有 $0.0018\ \mathrm{kJ\,mol^{-1}\,bar^{-1}}$——挤压气体时有地方可去，挤压液体没有。
:::

::: example 金刚石、石墨，以及压垮天平的压强 {#ex-diamond-graphite}
$298.15\ \mathrm{K}$ 下，相对石墨有 $\Delta_\mathrm{f}G^\circ[\mathrm{C,\,diamond}] = +2.90\ \mathrm{kJ\,mol^{-1}}$（NIST-JANAF），密度分别为 $3.515$ 与 $2.267\ \mathrm{g\,cm^{-3}}$（CRC）。问 $298.15\ \mathrm{K}$ 下压强多大时金刚石成为碳的稳定形态，并说明钻戒为何能在地表长存。
::: solution
摩尔体积为：金刚石 $V_\mathrm{m} = 12.011/3.515 = 3.417\ \mathrm{cm^3\,mol^{-1}}$，石墨 $12.011/2.267 = 5.298\ \mathrm{cm^3\,mol^{-1}}$，故 $\Delta V_\mathrm{m} = -1.881\ \mathrm{cm^3\,mol^{-1}} = -1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}$。两相在此尺度上近乎不可压缩，
$$
\Delta G(p) = \Delta G^\circ + \Delta V_\mathrm{m}\left(p - p^\circ\right),
$$
在 $p = 2900 / 1.881\times 10^{-6} = 1.54\times 10^{9}\ \mathrm{Pa} = 1.54\ \mathrm{GPa} \approx 15\ \mathrm{kbar}$ 处为零。
金刚石是碳的高压形态：几个 $\mathrm{GPa}$ 的地幔压强下它是稳定相——这就是金刚石随金伯利岩管从数千米深处被带上来的原因。地表处 $\Delta G = +2.9\ \mathrm{kJ\,mol^{-1}}$，金刚石热力学上不稳定却在动力学上永生：把 $\mathrm{sp^3}$ 成键的碳重排成石墨片层的活化势垒，任何戒指在室温下都付不起。教训就在斜率本身：$(\partial \Delta G/\partial p)_T = \Delta V$，所以压强永远偏向更致密的相——与冰刀下融化冰的杠杆同根，见[[thermodynamics/phase-equilibria]]。
:::
:::

::: widget plot
f: 8.314*t*log(x)/1000
x: 0.01, 10
y: -12, 12
sliders: t=298:200:600:10
labels: G_\mathrm{m}(p) - \mu^\circ \text{ / } \mathrm{kJ\,mol^{-1}}
caption: $1\ \mathrm{mol}$ 理想气体的 $G_\mathrm{m}(p) - \mu^\circ = RT\ln(p/p^\circ)$（滑块：温度，单位 K）。斜率是 $V_\mathrm{m} = RT/p$：低压下巨大，高压下平缓，气体越热整条曲线越陡。$p \rightarrow 0$ 时对数式的下坠，正是气体向真空膨胀获得 $RT\ln(V_\mathrm{f}/V_\mathrm{i})$ 自由能的原因——[[thermodynamics/second-law|第二定律一章]]的膨胀熵，换上了吉布斯自由能的衣裳——而曲线在任意 $p$ 处的高度，就是下一节的化学势。
:::

## 化学势

到此为止的每个方程都带着一个沉默的假设：组成固定。让某种物质的量改变——水在蒸发、盐在溶解、反应在进行、离子在穿膜——$G$ 就获得一种新的敏感性，它重要到必须有一个名字。

::: definition 化学势 {#def-mu}
物种 $i$ 的**化学势**是
$$
\mu_i = \left(\frac{\partial G}{\partial n_i}\right)_{T, p, n_{j \ne i}} :
$$
在温度、压强及所有其他物种的量都固定的条件下，向体系加入一摩尔 $i$ 时吉布斯自由能的增长率。它的单位是 $\mathrm{J\,mol^{-1}}$，而且是一个**偏摩尔**性质：在混合物中，它属于混合物的组成，而不属于纯物质。
:::

::: proposition 含组成的基本方程 {#prop-mu-fund}
对开放体系、或组成因反应而改变的封闭体系，
$$
\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V + \sum_i \mu_i\,\mathrm{d}n_i, \qquad
\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \sum_i \mu_i\,\mathrm{d}n_i,
$$
$\mathrm{d}H$ 与 $\mathrm{d}A$ 同理。吉布斯自由能是和式 $G = \sum_i n_i \mu_i$；对纯物质，
$$
\mu = G_\mathrm{m}, \qquad \mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p .
$$
:::

::: proof
$G$ 是广度量：在固定 $T$ 与 $p$ 下把所有量加倍，$G$ 也加倍，所以 $G$ 对诸 $n_i$ 是一次齐次函数，由欧拉定理得 $G = \sum_i n_i\left(\partial G/\partial n_i\right)_{T,p,n'} = \sum_i n_i \mu_i$。对纯物质 $G = n\mu$，故 $\mu = G/n = G_\mathrm{m}$。微分 $G = n\mu$ 并与 $\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \mu\,\mathrm{d}n$ 比较，得 $n\,\mathrm{d}\mu = -S\,\mathrm{d}T + V\,\mathrm{d}p$；除以 $n$ 即得摩尔基本方程。四个方程多出来的项，是改变组成那笔不做功的自由能开销；丢掉对 $n_i$ 的依赖就回到[[#prop-fundamental]]。
:::

::: proposition 理想气体的化学势 {#prop-mu-ideal}
对温度 $T$、压强 $p$ 下的 $1\ \mathrm{mol}$ 理想气体，标准态为 $p^\circ = 1\ \mathrm{bar}$，
$$
\mu(\mathrm{g}, T, p) = \mu^\circ(T) + RT\ln\frac{p}{p^\circ}.
$$
:::

::: proof
恒温下积分摩尔基本方程 $\mathrm{d}\mu = V_\mathrm{m}\,\mathrm{d}p$，取 $V_\mathrm{m} = RT/p$：$\mu(p) - \mu(p^\circ) = RT\ln(p/p^\circ)$，而 $\mu(p^\circ) \equiv \mu^\circ(T)$。（$\mu^\circ$ 的温度依赖是 $-S_\mathrm{m}$，即上一节的斜率。）对数式的全部内涵——它为什么与混合熵里的对数是同一个对数——在[[thermodynamics/mixtures]]中展开。
:::

::: warning $\mu = \mu^\circ + RT\ln(p/p^\circ)$ 里的三个陷阱 {#warn-mu-ideal}
第一，对数是**理想气体**的性质。对液体或固体，$\mu$ 在整个实验室压强范围内只移动 $V_\mathrm{m}\Delta p$；在溶液中，对数的宗量变成**活度**，把这个宗量弄对是[[thermodynamics/mixtures]]与[[thermodynamics/ions-in-solution]]的主题。第二，$\mu^\circ$ 是温度与所选标准态的函数——它不是"你那个条件下的化学势"，而可测量的只有 $\mu$ 之差。第三，$\mu = G_\mathrm{m}$ 只对**纯**物质成立：在混合物中 $\mu_i$ 是偏摩尔吉布斯自由能，一般不同于纯 $i$ 的摩尔吉布斯自由能，而这个差恰恰就是混合所做的事。
:::

::: proposition 相平衡条件 {#prop-phase-eq}
封闭体系中恒温恒压下、同一纯物质的两相 $\alpha$ 与 $\beta$ 平衡，当且仅当
$$
\mu^\alpha = \mu^\beta .
$$
若 $\mu^\alpha < \mu^\beta$，$\beta$ 相自发转变为 $\alpha$ 相；在任意 $T$ 与 $p$ 下，稳定相是化学势较低的那一个。
:::

::: proof
让 $\mathrm{d}n$ 摩尔在恒温恒压下从 $\beta$ 移到 $\alpha$。只有两相时，$\mathrm{d}G = \mu^\alpha \mathrm{d}n - \mu^\beta \mathrm{d}n = (\mu^\alpha - \mu^\beta)\,\mathrm{d}n$，而自发性判据 $\mathrm{d}G \le 0$ 说转移朝 $\mu$ 较低的方向进行。平衡时两个方向都不自发，故 $\mu^\alpha - \mu^\beta = 0$；若两者有任何差值，单方向的转移就会降低 $G$，体系就不在平衡。
:::

::: example 稀薄的氩便宜多少？ {#ex-mu-argon}
求 $298.15\ \mathrm{K}$、$0.010\ \mathrm{bar}$ 下氩气的 $\mu - \mu^\circ$，以 $\mathrm{kJ\,mol^{-1}}$ 与每个原子计。
::: solution
$$
\mu - \mu^\circ = RT\ln\frac{p}{p^\circ}
= 8.314 \times 298.15 \times \ln 0.010
= -11.4\ \mathrm{kJ\,mol^{-1}} .
$$
每个原子合 $11.4/96.485 = 0.118\ \mathrm{eV}$——约 $4.6\,k_\mathrm{B}T$。稀薄氩气的吉布斯自由能比标准态氩气*便宜* $11.4\ \mathrm{kJ\,mol^{-1}}$，所以把一摩尔从 $0.010\ \mathrm{bar}$ 压回 $1\ \mathrm{bar}$ 至少要花这么多功，真空泵也必须付出它。同一个数字说明大气不会自发自我浓缩：$\mu$ 随 $p$ 上升，所以物质从高压流向低压，永不回头——下面那则警告里的方向规则，最简单的版本。
:::
:::

::: warning 物质从高 $\mu$ 流向低 $\mu$——而不是从高浓度流向低浓度 {#warn-mu-direction}
热从热流向冷；物质对应的诚实类比不是"从高浓度到低浓度"，而是*从化学势高到化学势低*，这个区别不是迂腐。把淡水倒进膜一侧的糖水溶液上，水会流**进**溶液——流进水更稀的那一侧——因为 $\mu$ 中的混合项 $RT\ln x$ 使那里水的化学势更低。渗透、蒸馏、萃取、沉淀、腐蚀与水泥的凝结，全都是关于 $\mu$ 递减方向的陈述；"顺浓度梯度"只是混合物理想、$\mu$ 恰随浓度上升的特例。当你听到某种物质"沿浓度梯度移动"，在脑子里把它翻译成"沿化学势梯度移动"——翻译免费，而且只有这个版本能活着走进[[thermodynamics/mixtures]]。
:::

::: history 从康涅狄格科学院到实验室 {#hist-gibbs}
约西亚·威拉德·吉布斯（Gibbs）分两步建成了本章。1873 年，在康涅狄格科学院的院刊上，他给出了用曲面思考的、物质热力学性质的几何表示；1876 与 1878 年，在同一份默默无闻的刊物上，*On the Equilibrium of Heterogeneous Substances* 引入了化学势、相律与 $\mu^\alpha = \mu^\beta$ 的平衡条件——物理化学史上影响最深的一对论文，起初几乎无人能懂。詹姆斯·克拉克·麦克斯韦（Maxwell）早在 1871 年的《热论》里就造了 *thermodynamic* 这个词，并且已经把克劳修斯（Clausius）的第二定律改写成恰当微分的语言；他立刻认出吉布斯的工作，于十九世纪七十年代中期把吉布斯的曲面做成了石膏模型，并写下让世人读得懂的评述。赫尔曼·冯·亥姆霍兹（Helmholtz）从另一头抵达同一片领地：联系 $G/T$、$H$ 与温度、如今带着两人名字的那个关系，亥姆霍兹于 1873 年在一篇关于原电池电动势的论文中、吉布斯在同一年各自独立得到；亥姆霍兹 1882 年论化学过程热力学的论文随后引入 $A = U - TS$ 作为等温变化的自由能，即第一门课程继承的最大功解释。化学家真正使用的词汇——自由能作为工作用量、化学势作为"逸出趋势"——由吉尔伯特·路易斯（Lewis）与梅尔·兰德尔（Randall）在 1923 年的教科书里定下，距康涅狄格科学院几乎无人阅读地印出那些数学，已过去五十年。
:::

## 后续内容

本章的斜率论证就是[[thermodynamics/phase-equilibria]]的全部内容：克拉佩龙方程是把 $\mu^\alpha = \mu^\beta$ 沿共存线微分，而那张折线状的 $G_\mathrm{m}(T)$ 图是化了装的相图。[[thermodynamics/mixtures]]从混合熵导出化学势里的对数，把它提升为活度与逸度，并解释溶液为何打破理想规则。[[thermodynamics/reaction-equilibrium]]把反应判据改写成 $\Delta_\mathrm{r}G = \sum_i \nu_i \mu_i$，并在其中找到平衡常数——[[general-chemistry-2/chemical-equilibrium|平衡一章]]的范特霍夫方程是穿上反应外衣的吉布斯-亥姆霍兹方程，而[[thermodynamics/ions-in-solution]]把同一个 $\mu$ 带进电化学，那里[[electrochemistry/cell-thermodynamics|电池的电动势]]是化学势之差除以法拉第常数。$\mu$ 的分子含义——对数为什么在数状态——属于[[statistical-thermodynamics/thermodynamic-functions]]与[[statistical-thermodynamics/canonical-ensemble]]，建立在[[statistical-thermodynamics/partition-function|配分函数]]之上。而第一门课程的 $\Delta_\mathrm{r}G^\circ = -RT\ln K$（[[general-chemistry-2/entropy-free-energy|熵与自由能]]），正等着被看作 $\sum_i \nu_i \mu_i$ 的一行。

::: summary
- 四个势 $U(S,V)$、$H(S,p)$、$A(T,V)$、$G(T,p)$ 携带恰当微分——基本方程——其系数是导数：$(\partial G/\partial T)_p = -S$、$(\partial G/\partial p)_T = V$，依此类推。
- 基本方程的恰当性给出四条麦克斯韦关系式，用可测的 $pVT$ 偏导数换掉熵的偏导数：$(\partial S/\partial V)_T = (\partial p/\partial T)_V$、$(\partial S/\partial p)_T = -(\partial V/\partial T)_p$，以及恒熵的那两条。
- 能量压强 $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$ 对理想气体为零、对范德瓦尔斯气体等于 $a(n/V)^2$；焓压强 $(\partial H/\partial p)_T = V(1 - \alpha T)$ 决定焦耳-汤姆孙系数。
- $G$ 以速率 $S$ 随 $T$ 下降，$\Delta G$ 以速率 $-\Delta S$ 移动；吉布斯-亥姆霍兹方程 $(\partial(\Delta G/T)/\partial T)_p = -\Delta H/T^2$ 把 $\Delta G$ 带到新温度。
- $G$ 以速率 $V$ 随 $p$ 上升：理想气体是 $RT\ln(p_2/p_1)$，凝聚相是 $V_\mathrm{m}\Delta p$——这就是压强在 $1.5\ \mathrm{GPa}$ 附近翻转石墨与金刚石、却几乎碰不动液体的原因。
- 化学势 $\mu_i = (\partial G/\partial n_i)_{T,p,n'}$ 用 $\sum_i \mu_i\,\mathrm{d}n_i$ 扩展每条基本方程；纯物质有 $\mu = G_\mathrm{m}$，理想气体有 $\mu = \mu^\circ + RT\ln(p/p^\circ)$。
- 相平衡即 $\mu^\alpha = \mu^\beta$；物质从高 $\mu$ 流向低 $\mu$，这是渗透、蒸馏以及此后每一章之下的规则。
:::

## 练习

::: exercise 二氧化碳的能量压强 {level=1 check="592"}
用范德瓦尔斯能量压强 $\left(\partial U_\mathrm{m}/\partial V_\mathrm{m}\right)_T = a/V_\mathrm{m}^2$，取 $a = 3.640\ \mathrm{L^2\,bar\,mol^{-2}}$（CRC），计算 $298.15\ \mathrm{K}$、$1.00\ \mathrm{bar}$ 下 $\mathrm{CO_2}$ 的该值，把气体当作理想气体处理。（以 $\mathrm{Pa}$ 为单位填入数值。）
::: solution
在 $1.00\ \mathrm{bar}$、$298.15\ \mathrm{K}$ 下，$V_\mathrm{m} = RT/p = 24.79\ \mathrm{L\,mol^{-1}}$，故
$$
\left(\frac{\partial U_\mathrm{m}}{\partial V_\mathrm{m}}\right)_T = \frac{3.640}{24.79^2}\ \mathrm{bar}
= 5.92\times 10^{-3}\ \mathrm{bar} = 592\ \mathrm{Pa}.
$$
六百帕，对一百万帕的压强：常温常压下 $\mathrm{CO_2}$ 的分子在膨胀中几乎感觉不到彼此，焦耳定律近乎完美。
:::
:::

::: exercise 压缩液态水 {level=1 check="0.902"}
取 $298.15\ \mathrm{K}$ 液态水的 $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ 为常数，计算从 $1.00$ 压缩到 $500\ \mathrm{bar}$ 的 $\Delta G_\mathrm{m}$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位填入数值。）
::: solution
$\Delta G_\mathrm{m} = V_\mathrm{m}\,\Delta p = 18.07\times 10^{-6}\ \mathrm{m^3\,mol^{-1}} \times 4.99\times 10^{7}\ \mathrm{Pa} = 902\ \mathrm{J\,mol^{-1}} = 0.902\ \mathrm{kJ\,mol^{-1}}$。
五百巴——液压机的压强——只把液体的吉布斯自由能推动不到一千焦每摩尔，而同样大小的压强变化作用在气体上会推动 $RT\ln 500 = 15.4\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 稀薄气体的化学势 {level=1 check="-11.4"}
计算 $298.15\ \mathrm{K}$、$0.010\ \mathrm{bar}$ 下理想气体的 $\mu - \mu^\circ$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位填入数值。）
::: solution
$\mu - \mu^\circ = RT\ln(p/p^\circ) = 8.314 \times 298.15 \times \ln 0.010 = -11.4\ \mathrm{kJ\,mol^{-1}}$。
$p$ 低于 $p^\circ$ 时对数为负：低于一巴的气体化学势低于其标准态，这就是它自发膨胀进真空的原因。
:::
:::

::: exercise 汽化的吉布斯-亥姆霍兹方程 {level=2 check="1.09"}
对水，$\Delta_\mathrm{vap}H = 40.65\ \mathrm{kJ\,mol^{-1}}$（$373.15\ \mathrm{K}$），该处 $\Delta_\mathrm{vap}G = 0$。用吉布斯-亥姆霍兹方程、取 $\Delta H$ 恒定，估算 $363.15\ \mathrm{K}$ 的 $\Delta_\mathrm{vap}G$，并解释符号。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位填入数值。）
::: solution
$$
\frac{\Delta_\mathrm{vap}G(363.15)}{363.15} = 0 + 40\,650\left(\frac{1}{363.15} - \frac{1}{373.15}\right) = 40\,650 \times 7.38\times 10^{-5} = 3.00\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
故 $\Delta_\mathrm{vap}G = 363.15 \times 3.00 = +1.09\ \mathrm{kJ\,mol^{-1}}$。为正：沸点以下液态水是稳定相，汽化在标准意义上非自发——十度的亏欠值约值一千焦，即十分之一个 $RT$，这就是少量过热或一粒灰尘就能把它翻盘的原因。
:::
:::

::: exercise 液态水的焓压强 {level=2 check="16.7"}
已知 $298.15\ \mathrm{K}$ 下 $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$、$\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$，计算液态水的 $\left(\partial H_\mathrm{m}/\partial p\right)_T$。（以 $\mathrm{cm^3\,mol^{-1}}$ 为单位填入数值。）
::: solution
$\alpha T = 0.0766$，故 $\left(\partial H_\mathrm{m}/\partial p\right)_T = V_\mathrm{m}(1 - \alpha T) = 18.07 \times 0.9234 = 16.7\ \mathrm{cm^3\,mol^{-1}}$。
为正，所以 $\mu_\mathrm{JT} = -16.7\times 10^{-6}/75.3 = -0.022\ \mathrm{K\,bar^{-1}} < 0$：节流使水升温。液体的焓随压强上升，因为推入的功 $pV_\mathrm{m}$ 超过了微小的结构弛豫（$\alpha T < 1$）。
:::
:::

::: exercise 压缩水的熵 {level=2 check="-0.464"}
用 $\left(\partial S_\mathrm{m}/\partial p\right)_T = -\alpha V_\mathrm{m}$，取 $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$、$V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ 为常数，估算 $298.15\ \mathrm{K}$ 液态水从 $1.00$ 压缩到 $1000\ \mathrm{bar}$ 的 $\Delta S_\mathrm{m}$。（以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 为单位填入数值。）
::: solution
$\Delta S_\mathrm{m} = -\alpha V_\mathrm{m}\,\Delta p = -2.57\times 10^{-4} \times 18.07\times 10^{-6} \times 9.99\times 10^{7} = -0.464\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
一千巴从一摩尔水里取走的熵不到半焦每开——只有 $\Delta_\mathrm{vap}S$ 的千分之一。压强对液体的有序化作用极其温和；要把熵移动几十个 $\mathrm{J\,K^{-1}\,mol^{-1}}$，靠的是相变，不是活塞。
:::
:::

::: exercise 从恰当性到范德瓦尔斯气体的熵 {level=3 check="-27.0"}
由 $\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V$ 的恰当性导出麦克斯韦关系式 $\left(\partial S/\partial V\right)_T = \left(\partial p/\partial T\right)_V$，再在恒温下积分，证明范德瓦尔斯气体在恒温变化中满足 $\Delta S_\mathrm{m} = R\ln\!\left[(V_{\mathrm{m},\mathrm{f}} - b)/(V_{\mathrm{m},\mathrm{i}} - b)\right]$。用 $b = 0.0427\ \mathrm{L\,mol^{-1}}$（CRC）计算 $298.15\ \mathrm{K}$ 下把 $1\ \mathrm{mol}$ $\mathrm{CO_2}$ 从 $24.79$ 压缩到 $1.000\ \mathrm{L\,mol^{-1}}$ 的 $\Delta S_\mathrm{m}$，并与理想气体值比较。（以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 为单位填入 $\Delta S_\mathrm{m}$。）
::: solution
$\mathrm{d}A$ 的恰当性要求 $\left(\partial(-S)/\partial V\right)_T = \left(\partial(-p)/\partial T\right)_V$，即 $(\partial S/\partial V)_T = (\partial p/\partial T)_V$。对范德瓦尔斯气体 $p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^2$，故 $(\partial p/\partial T)_{V_\mathrm{m}} = R/(V_\mathrm{m} - b)$，于是
$$
\Delta S_\mathrm{m} = \int_{V_{\mathrm{m},\mathrm{i}}}^{V_{\mathrm{m},\mathrm{f}}} \frac{R}{V_\mathrm{m} - b}\,\mathrm{d}V_\mathrm{m}
= R\ln\frac{V_{\mathrm{m},\mathrm{f}} - b}{V_{\mathrm{m},\mathrm{i}} - b}.
$$
数值上，$\Delta S_\mathrm{m} = 8.314 \times \ln\frac{1.000 - 0.0427}{24.79 - 0.0427} = 8.314 \times \ln 0.03868 = -27.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$，而理想气体为 $R\ln(1/24.79) = -26.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$。$b$ 修正使熵损失略大，因为分子自身体积已经吃掉了部分自由体积：气体可损失的余地比理想计算假设的更小。注意 $a$ 始终没有出场——吸引项移动的是*能量*（能量压强），而不是等温线的熵。
:::
:::

::: exercise 金刚石压锤，热力学地看 {level=3 check="1.54"}
用 $\Delta_\mathrm{f}G^\circ[\mathrm{C,\,diamond}] = +2.90\ \mathrm{kJ\,mol^{-1}}$ 与摩尔体积 $3.417$（金刚石）、$5.298\ \mathrm{cm^3\,mol^{-1}}$（石墨），计算 $298.15\ \mathrm{K}$ 下石墨 $\rightarrow$ 金刚石的 $\Delta G$ 归零所需的压强，两相均视为不可压缩。（以 $\mathrm{GPa}$ 为单位填入数值。）
::: solution
$\Delta V_\mathrm{m} = 3.417 - 5.298 = -1.881\ \mathrm{cm^3\,mol^{-1}} = -1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}$，而 $\Delta G(p) = \Delta G^\circ + \Delta V_\mathrm{m}(p - p^\circ)$ 在
$$
p = \frac{2900\ \mathrm{J\,mol^{-1}}}{1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}} = 1.54\times 10^{9}\ \mathrm{Pa} = 1.54\ \mathrm{GPa}
$$
处为零。
约 $15\ \mathrm{kbar}$ 以上金刚石是稳定形态——地球地幔制造它、人造金刚石压机跑在五六千巴的原因即在此。地表的钻戒只是动力学上的亚稳：$\Delta G = -2.9\ \mathrm{kJ\,mol^{-1}}$ 驱动着石墨化，却什么也没发生，因为势垒高不可攀。热力学决定目的地；动力学决定能否抵达——而在这里它决定永远抵达不了。
:::
:::
