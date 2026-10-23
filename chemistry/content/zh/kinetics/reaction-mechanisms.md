配平的化学方程式是一份摘要，不是路线图。$\mathrm{H_2(g) + Br_2(g) \rightarrow 2\,HBr(g)}$ 告诉你什么消失、什么出现，却对原子*如何*从这里到达那里只字未提。这种沉默不是符号体系的缺漏——而是本章的核心事实：大多数反应并不是一步完成的。它们沿着分子事件的序列行进，一次一个**基元步骤**，而你在烧瓶里测得的速率方程，正是这一序列的集体指纹。[[kinetics/rate-laws]] 讲了速率方程如何测量；本章建立反向运转的机器：从一组假定的基元步骤推出预测的速率方程，再折回来——从实测的速率方程（连同它的半级数和产物抑制）推出可能产生它的机理。承担几乎全部工作的两个近似——**稳态近似**与**前置平衡**——都是把你看不到的中间体从你能测得的速率方程中消去的手段；弄清每个近似何时合法、何时两者都不合法，才是本章真正的功夫。

## 基元步骤与反应分子数

::: definition 基元反应、反应分子数、中间体 {#def-elementary}
**基元反应**（或**基元步骤**）是一次单一的分子事件——一次碰撞、一次断键、一次重排——它恰好按所写的方式发生，不能再分解为更简单的化学事件。步骤中聚在一起的反应物实体的数目称为**反应分子数**：*单分子*（一个分子重排或碎裂）、*双分子*（两个分子碰撞并反应）、*三分子*（三个同时相遇）。**中间体**是在一个基元步骤中生成、又在后续步骤中被消耗的物种；它从总反应方程中消去，绝不出现在化学计量式中。**过渡态**不是中间体：它是势能面上的极大点，没有可测量的寿命，而中间体坐在极小点里，原则上可以被检测。**总反应**是各基元步骤之和，中间体互相抵消；这个和必须精确地重现所观察到的化学计量式。
:::

每个机理都必须先通过这笔记账检验：把各步相加，消去中间体，净方程必须就是你实际研究的那个反应。这个检验是必要的，却几乎从来不是充分的，因为对任何一个给定方程，都有上千个机理能通过它。真正缩小范围的是速率方程。

::: proposition 基元步骤的速率方程 {#prop-mass-action}
基元步骤的速率正比于反应实体浓度的乘积，每个实体的幂次取*该步骤中*的系数（古德贝格（Guldberg）与瓦格（Waage）的质量作用形式）：
$$
\mathrm{A \rightarrow products}: \; v = k[\mathrm{A}]; \qquad
\mathrm{A + B \rightarrow products}: \; v = k[\mathrm{A}][\mathrm{B}]; \qquad
\mathrm{2\,A \rightarrow products}: \; v = k[\mathrm{A}]^2 .
$$
对基元步骤而言，级数*就是*系数，因为这一步正是按所述的碰撞发生的。逆命题完全不成立：速率方程 $v = k[\mathrm{A}]^2$ 与一个基元双分子步骤相容，但也同样相容于一个两步机理——其慢步骤之前有一个把 A 储存进配合物的前置平衡。反应分子数属于某个步骤；级数是表观速率方程的性质；只有当你已经知道该步骤是基元反应时，两者才重合。
:::

三分子反应为什么如此罕见？双分子步骤只需要第一个分子到来时有一个伙伴在场；三分子步骤则要求*第三个*粒子在同一瞬间位于碰撞对体积之内。在 $\mathrm{298\ K}$、$1\ \mathrm{bar}$ 下，气体的数密度为 $2.4\times10^{25}\ \mathrm{m^{-3}}$，而碰撞配合物的体积——半径约 $0.4\ \mathrm{nm}$ 的球——为 $2.7\times10^{-28}\ \mathrm{m^3}$，所以第三个分子恰好在场的概率只有 $n \cdot \tfrac{4}{3}\pi r^3 \approx 0.007$，约一百五十次碰撞中才有一次。第三个粒子还必须在碰撞对约 $10^{-13}\ \mathrm{s}$ 的寿命内赶到，并带走多余的能量，否则这对组合就会立刻重新解体。因此真正的三分子步骤至少比双分子步骤稀有一千倍，而且实际上只在别无出路时才有名分：臭氧生成中的 $\mathrm{O\cdot + O_2 + M \rightarrow O_3 + M}$，以及 $\mathrm{H\cdot + H\cdot + M \rightarrow H_2 + M}$——后者的键能没有双分子通道可以释放。相比之下，*三级速率方程*却很常见——而且几乎总是一个不同故事的签名：一个快速的预结合先储存两个分子，随后才是双分子步骤，如你在 [[#ex-preeq]] 中将看到的 $\mathrm{2\,NO + O_2}$。

::: warning 机理只能被证伪，永远不能被证实 {#warn-mechanism}
一个假定的机理只有通过了三重检验才值得相信：(1) 各步之和重现观察到的化学计量式；(2) 它蕴含的速率方程在整个浓度、温度与转化率范围内都与实测的一致；(3) 它与每一个实际检测到的中间体相容，并与同位素标记、立体化学和捕获实验相容。即便通过全部三重检验，机理仍然只是当前最好的假说——*不同*的机理可以预测*同一个*速率方程，动力学无法区分它们。动力学做得最出色的是相反的事：一个预测方程与实验不符的机理，或它的中间体被认真搜寻而确实不存在的机理，就死了。绝不要写"速率方程证明了机理"；要写"与之一致"，并记住动力学所能支持的最强论断是*被证伪*。
:::

::: example 反应分子数与分步速率方程 {#ex-molecularity}
气相反应 $\mathrm{NO_2 + CO \rightarrow NO + CO_2}$ 在 $\mathrm{250\,^\circ C}$ 下为二级，$v = k[\mathrm{NO_2}]^2$，而对 CO 为*零级*。一个假定的机理是：步骤 1，$\mathrm{NO_2 + NO_2 \rightarrow NO_3 + NO}$，速率常数 $k_1$；步骤 2，$\mathrm{NO_3 + CO \rightarrow NO_2 + CO_2}$，速率常数 $k_2$，其中步骤 1 远慢于步骤 2。证明该机理与化学计量式相容，写出每一步的速率方程，并导出总速率方程。CO 为什么不在其中出现？
::: solution
**求和。**两式相加，$\mathrm{NO_3}$ 出现在两侧而消去（它是中间体），两侧再各消去一个 $\mathrm{NO_2}$，剩下 $\mathrm{NO_2 + CO \rightarrow NO + CO_2}$——正是观察到的计量式。**分步方程。**两步都是双分子，故由[[#prop-mass-action]]，$v_1 = k_1[\mathrm{NO_2}]^2$，$v_2 = k_2[\mathrm{NO_3}][\mathrm{CO}]$。**总速率。**NO 只在步骤 1 中生成，所以
$$
\frac{\mathrm{d}[\mathrm{NO}]}{\mathrm{d}t} = v_1 = k_1[\mathrm{NO_2}]^2,
$$
对 $\mathrm{NO_2}$ 为二级、与 CO 无关，与实验完全一致。**CO 为什么隐形。**因为步骤 2 很快，每个 $\mathrm{NO_3}$ 一生成就被扫走：稳态水平 $[\mathrm{NO_3}] = k_1[\mathrm{NO_2}]^2/(k_2[\mathrm{CO}])$ 微乎其微，CO 只进入这个观测不到的微小修正项。在瓶颈——步骤 1——放行之前，CO 无法影响速率。这就是决速步思想的第一次出场；而[[#warn-rds]] 将说明它必须多么小心地表述。
:::
:::

## 连串反应：A → B → C

含中间体的最简单机理是串联的两步 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$。它可以精确求解，而其解教会我们关于中间体与瓶颈的绝大部分知识。

::: proposition 连串一级反应的精确解 {#prop-consecutive}
对 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$，各步均为一级，$[\mathrm{A}]_0 = a$，$[\mathrm{B}]_0 = [\mathrm{C}]_0 = 0$：
$$
[\mathrm{A}] = a\,e^{-k_1 t}, \qquad
[\mathrm{B}] = \frac{a\,k_1}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right), \qquad
[\mathrm{C}] = a - [\mathrm{A}] - [\mathrm{B}].
$$ {#eq-consec}
中间体从零上升，经过**极大值**，极大点位于
$$
t_\text{max} = \frac{\ln\!\left(k_1/k_2\right)}{k_1 - k_2},
\qquad
[\mathrm{B}]_\text{max} = a\left(\frac{k_1}{k_2}\right)^{k_2/(k_2 - k_1)},
$$
而产物 $[\mathrm{C}]$ 的初始斜率为零：它在等 B 积累起来。[[#eq-consec]] 的曲线由下图勾出——[[kinetics/rate-laws]] 中没有任何积分速率方程图能把它线性化，这就是连串动力学靠曲线*形状*来识别的原因。
:::

::: proof 连串解与中间体极大值 {#proof-consecutive}
步骤 1 是普通的一级反应：$[\mathrm{A}] = ae^{-k_1t}$。步骤 2 以速率 $k_1[\mathrm{A}]$ 供给 B、以 $k_2[\mathrm{B}]$ 排走 B：
$$
\frac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t} = k_1 a\,e^{-k_1 t} - k_2[\mathrm{B}].
$$
这个线性方程用积分因子 $e^{k_2 t}$ 求解：
$$
\frac{\mathrm{d}}{\mathrm{d}t}\!\left([\mathrm{B}]\,e^{k_2 t}\right) = k_1 a\,e^{(k_2 - k_1)t}
\quad\Longrightarrow\quad
[\mathrm{B}]\,e^{k_2 t} = \frac{k_1 a}{k_2 - k_1}\,e^{(k_2 - k_1)t} + \text{const}.
$$
由 $[\mathrm{B}]_0 = 0$ 定出常数为 $-k_1 a/(k_2 - k_1)$，再除以 $e^{k_2 t}$ 即得[[#eq-consec]]。$[\mathrm{C}]$ 由质量守恒 $[\mathrm{A}] + [\mathrm{B}] + [\mathrm{C}] = a$ 得出。求极大值时令 $\mathrm{d}[\mathrm{B}]/\mathrm{d}t = 0$，即 $k_1 e^{-k_1 t} = k_2 e^{-k_2 t}$；取对数得 $t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2)$。代回时注意 $e^{-k_1 t_\text{max}} = (k_2/k_1)^{k_1/(k_1-k_2)}$ 且 $e^{-k_2 t_\text{max}} = (k_2/k_1)^{k_2/(k_1-k_2)}$，于是
$$
[\mathrm{B}]_\text{max} = \frac{a k_1}{k_2 - k_1}\left(\frac{k_2}{k_1}\right)^{\!k_2/(k_1-k_2)}\left[\frac{k_2}{k_1} - 1\right] = a\left(\frac{k_1}{k_2}\right)^{\!k_2/(k_2-k_1)}. \qquad\blacksquare
$$
:::

::: widget odesolver
f: 0.10*exp(-0.10*t) - 0.025*y
y0: 0
t: 0, 60
exact: 0.10/(0.10-0.025)*(exp(-0.025*t) - exp(-0.10*t))
h: 0.5
caption: [[#ex-consecutive]] 中连串反应的中间体 $[\mathrm{B}](t)$（$k_1 = 0.100\ \mathrm{s^{-1}}$、$k_2 = 0.025\ \mathrm{s^{-1}}$、$a = 1.00\ \mathrm{mol\,dm^{-3}}$）：数值求解 $y' = k_1 a\,e^{-k_1 t} - k_2 y$——欧拉法、休恩法、RK4 与[[#eq-consec]] 的精确曲线对照——步长 $h$ 可调。B 上升，在 $t_\text{max} = 18.5\ \mathrm{s}$ 处达峰，然后以*较慢*的速率常数 $k_2$ 衰减：中间体的后期行为不取决于它如何生成，而取决于它被销毁得多么慢。用大步长比较三种方法：数值曲线开始偏离精确解之处，就在峰附近。
:::

::: example 中间体何时达峰？ {#ex-consecutive}
在 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$ 中，$k_1 = 0.100\ \mathrm{s^{-1}}$，$k_2 = 0.0250\ \mathrm{s^{-1}}$，$a = 1.00\ \mathrm{mol\,dm^{-3}}$，求 $t_\text{max}$、$[\mathrm{B}]_\text{max}$，以及此时 A 与 C 的浓度。
::: solution
$$
t_\text{max} = \frac{\ln(0.100/0.0250)}{0.100 - 0.0250} = \frac{\ln 4.00}{0.0750} = \frac{1.386}{0.0750} = 18.5\ \mathrm{s},
$$
$$
[\mathrm{B}]_\text{max} = 1.00 \times \left(\frac{0.100}{0.0250}\right)^{0.0250/(0.0250-0.100)} = 4.00^{-1/3} = 0.630\ \mathrm{mol\,dm^{-3}}.
$$
在 $t = 18.5\ \mathrm{s}$ 时：$[\mathrm{A}] = e^{-(0.100)(18.5)} = e^{-1.848} = 0.157\ \mathrm{mol\,dm^{-3}}$，由质量守恒 $[\mathrm{C}] = 1.00 - 0.630 - 0.157 = 0.213\ \mathrm{mol\,dm^{-3}}$。

验算就是速率方程本身：在峰处，$\mathrm{d}[\mathrm{B}]/\mathrm{d}t = k_1[\mathrm{A}] - k_2[\mathrm{B}] = (0.100)(0.157) - (0.0250)(0.630) = 0.0157 - 0.0158 \approx 0$——流入等于流出，极大点处必须如此。这些数字揭示的不对称值得注意：B 达峰*晚*而*高*，因为它被消耗得比生成慢（$k_2 < k_1$）；在 A 早已过了第一个半衰期之后，仍有三分之二的样品滞留于中间体的势阱之中。
:::
:::

[[#prop-consecutive]] 的两个极限给出朴素的决速步直觉。若 $k_2 \gg k_1$，则任何时刻都有 $[\mathrm{B}] \approx (k_1/k_2)[\mathrm{A}]$：B 从不积累，C 以速率 $k_1[\mathrm{A}]$ 出现，*步骤 1 控制全局*。若 $k_1 \gg k_2$，B 先迅速堆积，然后按自己的、属于步骤 2 的时间尺度流走；初始爆发之后，*步骤 2 控制全局*。若 $k_1 \approx k_2$，两个说法都不成立。

::: warning 决速步属于某个区间 {#warn-rds}
精确地陈述这个概念：在某区间内，若表观速率常数正比于某一步的速率常数（形式地说，若灵敏度 $\mathrm{d}\ln k_\text{obs}/\mathrm{d}\ln k_i$ 对该步为 $1$、对其余各步为 $0$），则该步为**决速步**。对连串反应，$k_1 \ll k_2$ 时 $k_\text{obs} = k_1$，$k_1 \gg k_2$ 时 $k_\text{obs} = k_2$——*同一步*在一个区间里是决速步，在另一个区间里却无足轻重；而改变温度会以不同倍数移动 $k_1$ 与 $k_2$，可以把接力棒从一步交给下一步。当 $k_1 \approx k_2$ 时根本不存在决速步：两个速率常数都出现在 $t_\text{max}$ 里，谁也不占支配地位。"慢步骤就是瓶颈"是一条只在转折点之间才精确的经验法则；先把 $k_\text{obs}$ 写出来，*然后*再问哪一步拥有它。
:::

## 竞争反应：选择性、动力学控制与热力学控制

::: definition 竞争反应与选择性 {#def-parallel}
**竞争**（或**平行**）反应以不同通道消耗同一反应物：$\mathrm{A \xrightarrow{k_1} B}$ 与 $\mathrm{A \xrightarrow{k_2} C}$。速率相加，$-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = (k_1 + k_2)[\mathrm{A}]$，故 A 以两常数之和衰减，而产物之比由分支比决定：
$$
\frac{[\mathrm{B}]}{[\mathrm{C}]} = \frac{k_1}{k_2}, \qquad \text{A 生成 B 的分数} = \frac{k_1}{k_1 + k_2}.
$$
对*同级*的通道，该比与 $[\mathrm{A}]$ 和时间都无关；当级数不同时，$[\mathrm{A}]$ 本身就成为选择性的旋钮——随着反应物被稀释，一级通道会挤占二级通道。代入阿伦尼乌斯形式 $k_i = A_i e^{-E_{\mathrm{a},i}/RT}$，
$$
\frac{k_1}{k_2} = \frac{A_1}{A_2}\,e^{-(E_{\mathrm{a},1} - E_{\mathrm{a},2})/RT},
$$
所以温度越低，能垒较低的通道赢得越彻底；而升温总是在侵蚀活化能控制的选择性。
:::

由此引出产物控制的两种区间。若两个通道实际上**不可逆**——低温、短时间——产物比就是 $k_1/k_2$，主产物只是生成快的那一个：反应处于**动力学控制**之下。若各步**可逆**且有足够时间达到平衡，比值就变成平衡常数 $K = e^{-\Delta_\mathrm{r} G^\circ/RT}$，主产物是更稳定的那一个：**热力学控制**。同一对产物，靠选择温度和时间，可以按任一顺序拿到手。

::: example 动力学控制与热力学控制 {#ex-parallel}
反应物 A 生成 B 需 $E_{\mathrm{a},1} = 50.0\ \mathrm{kJ\,mol^{-1}}$，生成 C 需 $E_{\mathrm{a},2} = 60.0\ \mathrm{kJ\,mol^{-1}}$，指前因子相同。(a) 若两步都不回逆，$\mathrm{25\,^\circ C}$ 下 $[\mathrm{B}]/[\mathrm{C}]$ 是多少？(b) $\mathrm{527\,^\circ C}$ 下呢？(c) 若两步都可逆并在 $\mathrm{25\,^\circ C}$ 达到平衡，且 C 比 B 低 $15.0\ \mathrm{kJ\,mol^{-1}}$，比值又是多少？
::: solution
(a) 取 $T = 298.15\ \mathrm{K}$，
$$
\frac{[\mathrm{B}]}{[\mathrm{C}]} = \exp\!\left(\frac{E_{\mathrm{a},2} - E_{\mathrm{a},1}}{RT}\right) = \exp\!\left(\frac{10\,000}{8.314 \times 298.15}\right) = e^{4.036} = 56.5,
$$
B 占产物的 $56.5/57.5 = 98\ \%$：动力学控制，低能垒者胜。(b) $T = 800\ \mathrm{K}$ 时指数为 $10\,000/(8.314 \times 800) = 1.504$，比值为 $4.50$，B 只占 $82\ \%$——升温侵蚀选择性，与定义预言的完全一致。(c) 平衡时，
$$
\frac{[\mathrm{C}]}{[\mathrm{B}]} = \exp\!\left(\frac{15\,000}{8.314 \times 298.15}\right) = e^{6.05} = 425,
$$
此时更稳定的产物 C 占 $99.8\ \%$：热力学控制。这个例子就是"低温早淬灭"与"回流数小时"两种操作的全部哲学——你在选择由哪个比值来书写你的产物分布：是 $k_1/k_2$，还是 $K$。
:::
:::

::: widget plot
f: exp(dE*1000/(8.314*x))
x: 200, 1000
y: 0, 100
sliders: dE=10:2:20:1
labels: \text{选择性 } k_1/k_2
caption: 指前因子相同的两个竞争通道的活化能控制选择性 $k_1/k_2 = e^{\Delta E_\mathrm{a}/RT}$ 对温度的曲线，能垒差 $\Delta E_\mathrm{a}$ 以 $\mathrm{kJ\,mol^{-1}}$ 计、由滑块设定。每条曲线都随 $T$ 升高而陡降——你无法靠降温把势垒里没有的选择性"冻"出来，$2\ \mathrm{kJ\,mol^{-1}}$ 的差值在室温只换来约二倍的比值。这正是化学家追求*催化剂*——改变机理（从而改变能垒）——而不只是降低温度的原因。
:::

## 稳态近似

::: history
马克斯·**博登斯坦**（Bodenstein）——他在 [[general-chemistry-2/rates-intro]] 中已被提及的 1913 年对 $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ 的研究——提出：活泼中间体会达到一个恒定的小浓度，此时其生成速率等于销毁速率；他并由此从链机理导出了氢溴反应的速率方程——机理对化学计量的第一次伟大胜利。把该方法表述为方程组 $\mathrm{d}[\text{中间体}]/\mathrm{d}t = 0$ 的更锐利形式，则独立地归功于克里斯琴森（Christiansen，1919 年）以及 1920 年代的欣谢尔伍德（Hinshelwood）及其合作者，他们把它建成普遍的总反应理论。欣谢尔伍德与谢苗诺夫（Semyonov）因链反应动力学共获 1956 年诺贝尔化学奖。至于中间体本身，又过了整整一代人，直到诺里什（Norrish）与波特（Porter）在 1949 年开始用闪光轰击反应——闪光光解，二人因此共获 1967 年诺贝尔奖。博登斯坦的近似与波特的闪光是这个题目的两半：假设中间体存在的代数，与看见它的光。
:::

::: definition 稳态近似 {#def-ssa}
设中间体 $\mathrm{I}$ 以某速率 $v_\text{form}$ 生成，并经总速率常数为 $k_\mathrm{d}$ 的一级（或拟一级）过程销毁，即 $\mathrm{d}[\mathrm{I}]/\mathrm{d}t = v_\text{form} - k_\mathrm{d}[\mathrm{I}]$。则 $[\mathrm{I}]$ 按指数趋近**稳态值**
$$
[\mathrm{I}]_\text{ss} = \frac{v_\text{form}}{k_\mathrm{d}},
$$
**寿命**为 $\tau = 1/k_\mathrm{d}$，经过几个 $\tau$ 的诱导期后可设 $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$。近似成立的条件是 $k_\mathrm{d} \gg k_\text{obs}$：中间体的销毁远快于总反应改变其所在环境，于是它*活泼而短命*，以极低的准恒定水平存在。对稳定、积累的中间体，近似失效——寿命长的物种不处于稳态，它是一个还没反应完的产物。
:::

::: proof 氢溴反应的 $3/2$ 级速率方程 {#proof-bodenstein}
在 $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ 的最初阶段，在任何能起抑制作用的 HBr 存在之前，博登斯坦的链是
$$
\begin{aligned}
\mathrm{Br_2} &\xrightarrow{k_1} 2\,\mathrm{Br\cdot} && \text{引发}\\
\mathrm{Br\cdot + H_2} &\xrightarrow{k_2} \mathrm{HBr + H\cdot} && \text{传递}\\
\mathrm{H\cdot + Br_2} &\xrightarrow{k_3} \mathrm{HBr + Br\cdot} && \text{传递}\\
2\,\mathrm{Br\cdot} &\xrightarrow{k_5} \mathrm{Br_2} && \text{终止}
\end{aligned}
$$
对两个自由基中间体都应用[[#def-ssa]]。对 $\mathrm{H\cdot}$，生成与销毁平衡：
$$
k_2[\mathrm{Br\cdot}][\mathrm{H_2}] - k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 0.
$$ {#eq-hbr-h}
对 $\mathrm{Br\cdot}$，引发每次事件产生两个，终止销毁两个：
$$
2k_1[\mathrm{Br_2}] - 2k_5[\mathrm{Br\cdot}]^2 - k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 0,
$$
其中最后两项*由*[[#eq-hbr-h]]*而*相消——链在传递步骤之间搬运溴原子而不净消耗它们。剩下的是引发与终止的平衡，
$$
[\mathrm{Br\cdot}] = \left(\frac{k_1}{k_5}\right)^{\!1/2}[\mathrm{Br_2}]^{1/2},
$$
半级数由此诞生：自由基浓度追踪的是引发速率的*平方根*。HBr 在两个传递步骤中都有生成，而由[[#eq-hbr-h]]，两个步骤的速率相等，故
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 2k_2[\mathrm{Br\cdot}][\mathrm{H_2}] = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2} [\mathrm{H_2}][\mathrm{Br_2}]^{1/2}. \quad\blacksquare
$$
总级数 $1 + \tfrac12 = \tfrac32$，而任何地方都没有三分子步骤。再加上一条传递步骤 $\mathrm{H\cdot + HBr \xrightarrow{k_4} H_2 + Br\cdot}$——它把 H 原子偷回去——就得到博登斯坦的完整方程
$$
v = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]}, \qquad k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2},\quad k' = \frac{k_4}{k_3},
$$
它与整个转化率范围内的实验一致。半级数和分母中的产物项是链的指纹；没人能猜到它们，其实也不必猜——博登斯坦是从机理*预言*出这个形状的。
:::

::: widget slopefield
f: a - c*y
x: 0, 5
y: 0, 0.6
sliders: a=0.5:0.1:1.0:0.1; c=2:0.5:5:0.1
points: 0, 0; 0, 0.6
caption: 趋向稳态的过程 $y' = a - c\,y$：以恒定速率 $a$ 生成、以速率常数 $c$ 销毁的中间体，沿指数 $y = (a/c)\left(1 - e^{-ct}\right)$ 从任何初值奔向 $y_\text{ss} = a/c$，只需几个 $1/c$ 的时间。点击即可从新的初值发射轨线——包括从稳态*上方*出发的，场会把浓度拉回。在真实机理中 $a$ 并非常数，而是跟着缓慢下降的反应物走，于是轨线骑在运动的直线 $y = a/c$ 上：这就是稳态——一个被慢变量奴役的快变量。
:::

::: example 两步机理给出的复合速率方程 {#ex-ssa}
考察 $\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$，各步均为一级，$k_1 = 0.050\ \mathrm{s^{-1}}$，$k_{-1} = 500\ \mathrm{s^{-1}}$，$k_2 = 10\ \mathrm{s^{-1}}$。用稳态近似导出速率方程，并求 (a) $k_\text{obs}$，(b) 稳态比 $[\mathrm{I}]_\text{ss}/[\mathrm{A}]$，(c) I 的寿命及近似的成立性，(d) 前置平衡极限。
::: solution
$\mathrm{d}[\mathrm{I}]/\mathrm{d}t = k_1[\mathrm{A}] - k_{-1}[\mathrm{I}] - k_2[\mathrm{I}] \approx 0$ 给出 $[\mathrm{I}]_\text{ss} = k_1[\mathrm{A}]/(k_{-1} + k_2)$，于是
$$
v = k_2[\mathrm{I}]_\text{ss} = \frac{k_1 k_2}{k_{-1} + k_2}[\mathrm{A}].
$$
(a) $k_\text{obs} = (0.050 \times 10)/(500 + 10) = 9.8\times10^{-4}\ \mathrm{s^{-1}}$。(b) $[\mathrm{I}]_\text{ss}/[\mathrm{A}] = k_1/(k_{-1} + k_2) = 9.8\times10^{-5}$：中间体的浓度只有 A 的十万分之九点八——常规分析或光谱都不会注意到它，这正是机理需要这套代数的原因。(c) $\tau = 1/(k_{-1} + k_2) = 1/510 = 2.0\ \mathrm{ms}$；由于 $k_\text{obs}\,\tau = 2\times10^{-6} \ll 1$，在 A 发生可观变化之前，I 已经把自己的账目结清了上百万次——稳态极好。(d) 前置平衡值为 $K k_2 = (k_1/k_{-1})k_2 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$，只比精确的稳态结果高 $2\ \%$，因为 $k_{-1} \gg k_2$ 使这个机理恰好落在[[#prop-preeq]]的前置平衡区间内。
:::
:::

::: quiz
下列哪种描述最符合稳态近似适用得最好的中间体？
- [x] 活泼而短命：一生成即被销毁，所以经过短暂的诱导期后，其浓度极小且几乎恒定。
- [ ] 稳定而长寿：它积累于整个反应过程，浓度持续增长。
- [ ] 任何中间体、任何时候都适用——这个近似是恒等式，不是物理假设。
- [ ] 浓度高到可以用常规光谱方便测定的那一种。
::: solution
第一项。稳态意味着*平衡收支*，而非持久：生成与销毁都很快，水平很低，而 $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$ 只是因为那个小数值只随喂养它的反应物一样变化。稳定积累的物种（第二项）恰是失效情形——它的导数不小。第三项颠倒了逻辑：该近似是一个物理假设，带有[[#def-ssa]]中 $k_\mathrm{d} \gg k_\text{obs}$ 的定量检验。第四项的前提恰好相反：稳态浓度通常*低于*常规检出限，[[#ex-ssa]] 已经看到——如何真正看见中间体，见下文。
:::
:::

还有一个把握全局的有用方式，即**停留时间观点**。寿命 $\tau = [\mathrm{I}]_\text{ss}/v_\text{form}$ 是一个分子以 I 身份停留的平均时间：每个 A 在去往 P 的路上以 I 的身份做客 $\tau$ 秒，而稳态只是说，只要客人们不断到来又不断离开，访客的数量就恒定不变。在链反应中，同样的记账叫**链载体观点**：载体 $\mathrm{Br\cdot}$、$\mathrm{H\cdot}$ 以引发速率出生、在终止中死去，而生与死之间，每一个都把传递循环翻转许多遍。**链长**——传递速率除以引发速率——数的是这些翻转的次数，可达 $10^{4}$–$10^{6}$；而载体本身只处于稳定物种的百万分之几的水平。一个反应可以——在链化学中也确实常常——几乎完全由那些即使滴定也检不出的物种承担。

::: algorithm 稳态近似的操作手册 {#alg-ssa}
**输入：**一组带速率常数的假定基元步骤。**输出：**该机理蕴含的速率方程。**(1)** 列出中间体——在机理内部生成又被消耗的物种。**(2)** 对每个中间体写出 $\mathrm{d}[\mathrm{I}]/\mathrm{d}t$：每个生成 I 的步骤以 $+$ 进入，每个消耗它的步骤以 $-$ 进入，各项按[[#prop-mass-action]]的质量作用速率。**(3)** 令每个导数为零，解联立代数方程组得各 $[\mathrm{I}]_\text{ss}$。**(4)** 写出产物生成速率并代入 $[\mathrm{I}]_\text{ss}$；所有中间体必须消尽。**(5)** 检验结果：级数必须与实验一致；$k_{-1} \gg k_2$、高压、零转化率等极限必须化归你早已信任的方程；而蕴含的 $[\mathrm{I}]_\text{ss}$ 必须足够小，近似才能自洽。在第 (5) 步失败的机理已被证伪；通过的只是受到鼓励，而非得到证明（[[#warn-mechanism]]）。
:::

## 前置平衡近似

::: proposition 前置平衡近似及其与稳态的关系 {#prop-preeq}
设 $\mathrm{I}$ 可逆地生成、不可逆地消耗：$\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$。若中间体退回 A 的倾向远大于走向 P——$k_{-1} \gg k_2$——则[[#ex-ssa]]的稳态结果得以简化：
$$
[\mathrm{I}]_\text{ss} = \frac{k_1[\mathrm{A}]}{k_{-1} + k_2} \approx \frac{k_1}{k_{-1}}[\mathrm{A}] = K[\mathrm{A}],
\qquad
v = k_2 K\,[\mathrm{A}],
$$
第一步安坐于常数为 $K$ 的**前置平衡**之中，不为涓流般的抽取所动。因此前置平衡*不是一个新假设，而是稳态的 $k_{-1} \gg k_2$ 极限*，并可推广到任何快速可逆步骤：二聚体、氢键配合物、质子转移。由于 $k_\text{obs} = k_2 K$，表观阿伦尼乌斯参数发生合并：
$$
E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H, \qquad \ln k_\text{obs} = \ln(k_2^\circ K^\circ) - \frac{E_{\mathrm{a},2} + \Delta H}{R}\cdot\frac{1}{T},
$$
其中预结合放热时 $\Delta H < 0$。足够放热的前置平衡会使表观活化能——从而 $k_\text{obs}$——随温度*下降*：负活化能是真实存在的，那是机理在说话。
:::

::: example 前置平衡二聚：一氧化氮的氧化 {#ex-preeq}
反应 $\mathrm{2\,NO + O_2 \rightarrow 2\,NO_2}$ 为三级，$v = k_\text{obs}[\mathrm{NO}]^2[\mathrm{O_2}]$，且 $k_\text{obs}$ 随升温而*下降*。取机理 $\mathrm{2\,NO \rightleftharpoons N_2O_2}$ 为快速前置平衡，$K = 1.2\times10^{-2}\ \mathrm{dm^{3}\,mol^{-1}}$；$\mathrm{N_2O_2 + O_2 \xrightarrow{k_2} 2\,NO_2}$，$k_2 = 4.0\times10^{6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（两个数值都是室温量级的示例值）。(a) 导出速率方程并计算 $k_\text{obs}$。(b) 设二聚的 $\Delta H = -60\ \mathrm{kJ\,mol^{-1}}$、第二步的 $E_{\mathrm{a},2} = 20\ \mathrm{kJ\,mol^{-1}}$，求 $E_{\mathrm{a,app}}$ 以及 $k_\text{obs}$ 从 $300$ 到 $350\ \mathrm{K}$ 的变化倍数。
::: solution
(a) 前置平衡：$[\mathrm{N_2O_2}] = K[\mathrm{NO}]^2$，故
$$
v = k_2[\mathrm{N_2O_2}][\mathrm{O_2}] = k_2 K\,[\mathrm{NO}]^2[\mathrm{O_2}],
\qquad
k_\text{obs} = (4.0\times10^{6})(1.2\times10^{-2}) = 4.8\times10^{4}\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}}.
$$
三级，却没有三分子碰撞：两个 NO 分子在双分子事件之前已储存在二聚体中，而 $k_\text{obs}$ 的单位（$\mathrm{dm^{6}\,mol^{-2}\,s^{-1}}$，三级）来自把 $k_2$ 乘以平衡常数。(b) $E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H = 20 - 60 = -40\ \mathrm{kJ\,mol^{-1}}$，且
$$
\frac{k_\text{obs}(350)}{k_\text{obs}(300)} = \exp\!\left[\frac{-40\,000}{8.314}\left(\frac{1}{300} - \frac{1}{350}\right)\right] = e^{-2.29} = 0.10,
$$
升温 $50\ \mathrm{K}$ 反而*减慢*十倍：加热破坏二聚体的速度快过它加速消耗二聚体的那一步。真实的 NO 氧化确实随升温而减慢，这是它并非表面看起来那个基元三分子步骤的经典证据之一。
:::
:::

## 看见中间体

稳态使中间体变得微小——[[#ex-ssa]] 中 $[\mathrm{I}]_\text{ss}/[\mathrm{A}] = 10^{-4}$——而微小恰恰是常规分析看不见的。四种策略破解这种隐形，每一种都塑造了这门学科的历史。**化学捕获**：把反应淬灭进一种只与 I 不可逆反应、与其他一切都不反应的试剂，称量加合物。**基质隔离**：在几开尔文的氩基质中，扩散停止，中间体堆积起来，可以从容记录它们的红外光谱。**自旋捕获与 ESR**：自由基中间体被捕获为稳定的氮氧自由基，其电子顺磁共振谱给出鉴定——正是证明燃烧与聚合自由基链的方法。最后是**时间分辨**：若稳态水平太低，就制造一个*非*稳态——一道闪光或一脉冲反应物可以造出可测量的中间体爆发，再用探针光束看着它按自己的 $k_\mathrm{d}$ 衰减。这就是闪光光解，诺里什与波特 1949 年的发明，其激光后裔已到达飞秒量级；详见 [[kinetics/photochemistry]]——它是本章一切内容的实验另一半。

::: quiz
对 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$，$k_1 = 0.010\ \mathrm{s^{-1}}$，$k_2 = 100\ \mathrm{s^{-1}}$，哪一步是决速步？
- [x] 步骤 1：$k_\text{obs} = k_1$，因为每个生成的 B 都在 A 耗尽之前被消耗——$k_2$ 之大恰恰说明步骤 2 不可能是瓶颈。
- [ ] 步骤 2，因为 $k_2 = 100\ \mathrm{s^{-1}}$ 是较大的速率常数。
- [ ] 都不是：$k_1 \ll k_2$ 时两步平分控制权。
- [ ] 两步同样决速，因为它们发生在同一序列中。
::: solution
步骤 1。这里 $k_2 \gg k_1$，故任何时刻 $[\mathrm{B}] \approx (k_1/k_2)[\mathrm{A}] = 10^{-4}[\mathrm{A}]$，C 以速率 $k_1[\mathrm{A}]$ 出现：表观速率常数*就是* $k_1$，按[[#warn-rds]]的灵敏度判据，步骤 1 拥有速率。第二项犯了把*最大*常数当作瓶颈的经典错误——瓶颈是路径上*最慢*的那一步，而巨大的 $k_2$ 意味着步骤 2 瞬间清空车流。第三、四项描述的是转折点区间 $k_1 \approx k_2$，而本例不是。
:::
:::

## 后续内容

[[#proof-bodenstein]] 中的氢溴证明只是 [[kinetics/chain-reactions]] 的一点预告，在那里，链长、支化与燃烧的爆炸极限都由同一套稳态记账推出。本章把基元步骤的速率常数当作已知；[[kinetics/collision-theory]] 与 [[kinetics/transition-state-theory]] 追问的是*什么决定*它们——碰撞频率、能垒，以及把中间体的平坦极小换成可测活化熵的过渡态自由能。[[#prop-preeq]] 的前置平衡是每个催化循环的前半段，[[kinetics/homogeneous-catalysis]] 把稳态近似用到催化剂本身；[[kinetics/photochemistry]] 提供使中间体现身的闪光；而测量的一面——本章赖以糊口的 $k_\text{obs}$ 究竟如何取得——在 [[kinetics/rate-laws]]，其根基是 [[general-chemistry-2/rates-intro]]。

::: summary
- 基元步骤恰好按所写方式发生；它的级数就是它的系数。总反应是各步之和，中间体在其中消去。
- 三分子步骤很罕见（在 1 bar 下约一百五十次碰撞才有一个第三粒子在场）；三级*速率方程*则多来自储存两个分子的预平衡。
- 机理永远不能被证明，只能被证伪：预测速率方程与实验一致是必要条件，绝非充分条件。
- 连串反应 $\mathrm{A \rightarrow B \rightarrow C}$ 有精确解 $[\mathrm{B}] = a\,k_1(e^{-k_1 t} - e^{-k_2 t})/(k_2 - k_1)$；中间体在 $t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2)$ 处达峰，此时流入等于流出。
- 决速步依赖于区间：$k_1 \ll k_2$ 时 $k_\text{obs} = k_1$，$k_1 \gg k_2$ 时 $k_\text{obs} = k_2$，而在 $k_1 \approx k_2$ 附近没有任何单一步骤拥有速率。
- 竞争通道给出 $[\mathrm{B}]/[\mathrm{C}] = k_1/k_2$（动力学控制）；可逆通道平衡到 $K$（热力学控制）；升温侵蚀活化选择性。
- 稳态近似对活泼、短命的中间体（$k_\mathrm{d} \gg k_\text{obs}$）设 $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$，得出诸如博登斯坦 $\tfrac32$ 级 HBr 方程之类的复合速率方程——半级数与抑制项是链的指纹。
- 前置平衡是稳态的 $k_{-1} \gg k_2$ 极限；$k_\text{obs} = k_2 K$ 且 $E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H$，故放热的预结合可使活化能为负。
:::

## 练习

::: exercise 假想中的三分子步骤 {level=1 check="8"}
假设 $\mathrm{2\,NO + O_2 \rightarrow 2\,NO_2}$ 是单一的基元三分子步骤。若在恒定 $[\mathrm{O_2}]$ 下把 $[\mathrm{NO}]$ 加倍，速率将增大为几倍？（输入该倍数。）
::: solution
基元步骤服从[[#prop-mass-action]]：$v = k[\mathrm{NO}]^2[\mathrm{O_2}]$，故 $[\mathrm{NO}]$ 加倍使速率乘以 $2^2 = 8$。倍数为 8。（真实反应*确实*是三级——但[[#ex-preeq]] 表明它经由二聚前置平衡达到该方程，而非三体碰撞：单凭倍数 8 无法区分这两种机理。）
:::
:::

::: exercise 中间体的寿命 {level=1 check="0.004"}
中间体 I 经两个平行的一级过程销毁，$k_{-1} = 200\ \mathrm{s^{-1}}$，$k_2 = 50\ \mathrm{s^{-1}}$。它的平均寿命 $\tau$ 是多少？（以秒输入。）
::: solution
销毁速率常数相加，$k_\mathrm{d} = k_{-1} + k_2 = 250\ \mathrm{s^{-1}}$，故 $\tau = 1/k_\mathrm{d} = 1/250 = 0.004\ \mathrm{s}$，四毫秒。任何总速率常数远低于 $2.5\ \mathrm{s^{-1}}$ 的机理，都可以对 I 使用稳态近似。
:::
:::

::: exercise 分支分数 {level=1 check="0.8"}
来自 A 的两个竞争一级通道：$k_1 = 4.0\times10^{-2}\ \mathrm{s^{-1}}$（生成 B），$k_2 = 1.0\times10^{-2}\ \mathrm{s^{-1}}$（生成 C）。A 最终变成 B 的分数是多少？（输入该分数。）
::: solution
同级竞争通道的分支比与时间无关：生成 B 的分数 $= k_1/(k_1 + k_2) = 4.0/(4.0 + 1.0) = 0.80$。八成是 B，而且这个 $4 : 1$ 之比在反应的每一时刻都成立。
:::
:::

::: exercise 中间体的峰 {level=2 check="9.24"}
对 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$，$k_1 = 0.20\ \mathrm{s^{-1}}$，$k_2 = 0.050\ \mathrm{s^{-1}}$，$[\mathrm{B}]$ 在何时经过极大值？（以秒输入时间，保留三位有效数字。）
::: solution
$t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2) = \ln(4.0)/0.15 = 1.386/0.15 = 9.24\ \mathrm{s}$。那一刻流入 $k_1[\mathrm{A}]$ 等于流出 $k_2[\mathrm{B}]$——正是[[#ex-consecutive]]结尾用过的验算。
:::
:::

::: exercise 由能垒差定选择性 {level=2 check="56.5"}
两个竞争通道指前因子相同，活化能 $E_{\mathrm{a},1} = 45\ \mathrm{kJ\,mol^{-1}}$，$E_{\mathrm{a},2} = 55\ \mathrm{kJ\,mol^{-1}}$。$\mathrm{25\,^\circ C}$ 下 $k_1/k_2$ 是多少？（输入该比值。）
::: solution
$k_1/k_2 = \exp[(E_{\mathrm{a},2} - E_{\mathrm{a},1})/RT] = \exp[10\,000/(8.314 \times 298.15)] = e^{4.036} = 56.5$。仅仅 $10\ \mathrm{kJ\,mol^{-1}}$ 的能垒差——一个氢键的分量——在室温就带来五十倍的选择性；同一对通道在 $800\ \mathrm{K}$ 只给约 $4.5$ 倍（[[#ex-parallel]]）。
:::
:::

::: exercise 复合速率常数 {level=2 check="0.00381"}
对 $\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$，$k_1 = 0.080\ \mathrm{s^{-1}}$，$k_{-1} = 400\ \mathrm{s^{-1}}$，$k_2 = 20\ \mathrm{s^{-1}}$，求表观一级速率常数 $k_\text{obs}$。（以 $\mathrm{s^{-1}}$ 输入。）
::: solution
稳态给出 $k_\text{obs} = k_1 k_2/(k_{-1} + k_2) = (0.080 \times 20)/(420) = 3.81\times10^{-3}\ \mathrm{s^{-1}}$。前置平衡估计值 $K k_2 = (k_1/k_{-1})k_2 = 4.0\times10^{-3}$ 高了 $5\ \%$——误差的大小正是 $k_{-1} \gg k_2$ 距离精确成立还有多远的度量。
:::
:::

::: exercise 连串反应的产物 {level=3}
对 $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$，$[\mathrm{A}]_0 = a$，推导显式表达式
$$
[\mathrm{C}](t) = a\left[1 - \frac{k_2\,e^{-k_1 t} - k_1\,e^{-k_2 t}}{k_2 - k_1}\right],
$$
并证明当 $k_2 \rightarrow \infty$ 时中间体消失且 $[\mathrm{C}] \rightarrow a(1 - e^{-k_1 t})$：此时产物只按步骤 1 的速率生成。
::: solution
由质量守恒，$[\mathrm{C}] = a - [\mathrm{A}] - [\mathrm{B}] = a - a e^{-k_1 t} - \dfrac{a k_1}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right)$。合并 $e^{-k_1 t}$ 项：$-a e^{-k_1 t}\left(1 + \dfrac{k_1}{k_2 - k_1}\right) = -a e^{-k_1 t}\cdot\dfrac{k_2}{k_2 - k_1}$，于是
$$
[\mathrm{C}] = a - \frac{a}{k_2 - k_1}\left(k_2\,e^{-k_1 t} - k_1\,e^{-k_2 t}\right),
$$
即所给形式。当 $k_2 \to \infty$：$\dfrac{k_2 e^{-k_1 t} - k_1 e^{-k_2 t}}{k_2 - k_1} \to e^{-k_1 t}$（$e^{-k_2t}$ 项瞬间死去，前置因子趋于 1），得 $[\mathrm{C}] \to a(1 - e^{-k_1 t})$；而由[[#prop-consecutive]]，$[\mathrm{B}] \to a\,\frac{k_1}{k_2}e^{-k_1t} \to 0$。物理图像：被无限快消耗的中间体从不会积累，总速率就是步骤 1 的速率——这正是[[#warn-rds]]中 $k_2 \gg k_1$ 区间的封闭形式。
:::
:::

::: exercise 林德曼机理 {level=3}
单分子气相反应 $\mathrm{A \rightarrow P}$ 曾长期令人困惑：靠碰撞活化看起来却是双分子的。林德曼（Lindemann）机理为 $\mathrm{A + M \xrightarrow{k_1} A^* + M}$、$\mathrm{A^* \xrightarrow{k_2} P}$、$\mathrm{A^* + M \xrightarrow{k_{-1}} A + M}$，其中 $\mathrm{A^*}$ 是振动激发分子。对 $\mathrm{A^*}$ 应用稳态近似，导出 $v$ 与 $k_\text{obs} = v/[\mathrm{A}]$，并求出高压与低压两个极限。用中间体的停留时间观点解释：为什么低压下反应变为二级。
::: solution
$\mathrm{d}[\mathrm{A^*}]/\mathrm{d}t = k_1[\mathrm{A}][\mathrm{M}] - k_2[\mathrm{A^*}] - k_{-1}[\mathrm{A^*}][\mathrm{M}] \approx 0$，故
$$
[\mathrm{A^*}]_\text{ss} = \frac{k_1[\mathrm{A}][\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]},
\qquad
v = k_2[\mathrm{A^*}]_\text{ss} = \frac{k_1 k_2[\mathrm{A}][\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]},
\qquad
k_\text{obs} = \frac{k_1 k_2[\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]}.
$$
**高压**（$k_{-1}[\mathrm{M}] \gg k_2$）：$k_\text{obs} \to k_1 k_2/k_{-1}$，一级——碰撞在 $\mathrm{A^*}$ 反应之前把它灭活许多次，激发与去激发维持着 $\mathrm{A^*}$ 的类玻尔兹曼平衡布居，只有单分子步骤成为限制环节。**低压**（$k_{-1}[\mathrm{M}] \ll k_2$）：$k_\text{obs} \to k_1[\mathrm{M}]$，二级。停留时间观点：$\mathrm{A^*}$ 的寿命为 $\tau = 1/(k_2 + k_{-1}[\mathrm{M}])$。高压下 $\tau$ 由灭活碰撞决定，$\mathrm{A^*}$ 与 A 处于平衡；低压下一个激发分子反应的可能性远大于再次被碰撞，每个活化事件都走向产物，速率就是活化速率 $k_1[\mathrm{A}][\mathrm{M}]$——是双分子的，因为每次反应分子都必须由碰撞*制造*出来。$k_\text{obs}$ 随压强的实际下降（fall-off）介于这两个极限之间，正是该机理得到确认的证据。
:::
:::
