桌上的一杯热咖啡会自己凉下来；热量从不会从房间里流回去把它重新烧开。划着的火柴烧成灰烬和烟，等多久也不会把木头复原。然而硝酸铵却会自己在冷水里溶解，而且溶解时烧杯变冷。如果"体系总是趋向更低的能量"是那条规律，第三个观察就不可能发生：$\mathrm{NH_4NO_3(s)}$ 的溶解从环境吸收 $28.1\ \mathrm{kJ\,mol^{-1}}$ 的热，可它是自发的。能量不是故事的全部。本章补上缺失的另一半——熵——以及把两者合到一起的记账工具，吉布斯自由能；真正决定一个反应能否进行、进行到什么程度、在什么温度上改变态度的，正是它。

本章是整个课程的枢纽。[[general-chemistry-2/chemical-equilibrium|化学平衡]]告诉我们反应*停在*哪里，用一个可以查表却无法预测的常数 $K$ 来表述。在这里我们将看到，$K$ 并不是每个反应各自独立的事实：它是由同一个能量 $\Delta_\mathrm{r}G^\circ$ 经一个公式算出的数。下一章的电化学电池，不过是同一份自由能戴上了电压表；而[[general-chemistry-2/liquids-solutions|液体与溶液]]的相行为，从头到尾也都是自由能。

## 自发变化，以及为什么单凭能量无法裁决

::: definition 自发过程 {#def-spontaneous}
**自发过程**指一旦开始就会自行进行下去的过程，其进行不需要外界持续地对它做功（在孤立或环境条件固定的设定下）。**非自发**过程则指其逆过程自发的过程。自发性对*快慢*什么也不说：金刚石变成石墨在室温下是自发的，却要花费地质年代的时间；反应的速率是[[general-chemistry-2/rates-intro|化学动力学]]这个独立的课题。
:::

十九世纪的期望是：自发化学变化总是放热的——体系像石头落向更低引力势能那样落向更低的焓。[[general-chemistry-1/thermochemistry|上一门课程]]的热化学给出了热的记账法，同时也给出了反例。冰在 $0\,^\circ\mathrm{C}$ 以上吸热熔化。水会蒸发。硝酸铵和许多其他盐类吸热溶解。甚至一些强放热的反应，比如由 $\mathrm{N_2}$ 和 $\mathrm{O_2}$ 生成 $\mathrm{NO(g)}$，在室温下也只进行到极小的程度。焓是决定自发性两件事中的一件，而不是唯一那件。

::: warning 放热不等于自发 {#warn-exothermic}
"$\Delta H < 0$ 故自发"这条规则的四种彼此独立的失效方式值得记清楚，因为每一种都会出现在考卷上：(i) **吸热而自发**的过程——熔点以上的熔化、蒸发、$\mathrm{NH_4NO_3}$ 的溶解；(ii) **放热而非自发**的过程——$\mathrm{N_2 + O_2 \rightarrow 2\,NO}$ 是吸热的，但它的逆反应放热，在室温下却仍然不走，因为平衡压倒性地偏向 $\mathrm{N_2}$ 一边；(iii) 由**混合**驱动的过程，比如两种气体相互扩散，其中根本没有热参与；(iv) 只在**某个温度之上或之下**才自发的过程，这是任何只含焓的规则连表述都办不到的。$\Delta H$ 的符号是一种倾向，不是判据。
:::

::: example 一个吸热却自发的过程 {#ex-nh4no3}
对 $298.15\ \mathrm{K}$ 下的溶解 $\mathrm{NH_4NO_3(s)} \rightarrow \mathrm{NH_4^+(aq)} + \mathrm{NO_3^-(aq)}$，标准数据表（NIST-JANAF/CRC 数值）给出 $\Delta_\mathrm{sol}H^\circ = +28.1\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{sol}G^\circ = -4.2\ \mathrm{kJ\,mol^{-1}}$。求溶解的熵变，并用一句话解释吸热过程为何能够自发。
::: solution
恒温下 $\Delta G = \Delta H - T\Delta S$，故
$$
\Delta_\mathrm{sol}S^\circ = \frac{\Delta_\mathrm{sol}H^\circ - \Delta_\mathrm{sol}G^\circ}{T}
= \frac{28.1 - (-4.2)\ \mathrm{kJ\,mol^{-1}}}{298.15\ \mathrm{K}}
= \frac{32.3\times 10^{3}\ \mathrm{J\,mol^{-1}}}{298.15\ \mathrm{K}} = +108\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
溶解之所以自发，是因为熵的增加——离子在溶液中获得了平动自由度，体系与环境合起来的无序度增大——足以抵消吸收的热而有余：$T\Delta S = 32.3\ \mathrm{kJ\,mol^{-1}} > \Delta H$。吸收的热让环境损失了熵，但体系赚回的比这更多。
:::
:::

## 熵与热力学第二定律

补救的办法是**热力学第二定律**，它引入一个新的状态函数，其总量（体系加环境）的改变永不减少。

::: proposition 热力学第二定律 {#prop-second-law}
对宇宙（体系加环境）的任何自发变化，
$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} + \Delta S_\mathrm{surr} > 0,
$$
平衡时取等号。过程正向自发，当且仅当 $\Delta S_\mathrm{univ} > 0$；$\Delta S_\mathrm{univ} < 0$ 时不可能发生；$\Delta S_\mathrm{univ} = 0$ 时处于平衡。
:::

熵是什么？宏观上，它通过可逆热来定义。

::: definition 熵的宏观定义 {#def-entropy-classical}
**熵** $S$ 是由 $\mathrm{d}S = \delta q_\mathrm{rev}/T$ 定义的状态函数：两态之间的熵变为 $\Delta S = \int_\mathrm{rev} \delta q/T$，沿连接两态的*任一*可逆路径计算。热本身不是状态函数，但热除以温度再沿可逆路径积分却是——这正是定义的内容。可逆过程 $\Delta S_\mathrm{univ} = 0$；不可逆（自发）过程 $\Delta S_\mathrm{univ} > 0$。
:::

::: definition 熵的统计定义 {#def-entropy-boltzmann}
**玻尔兹曼熵**把 $S$ 与分子细节联系起来：
$$
S = k_\mathrm{B} \ln W,
$$
其中 $k_\mathrm{B} = 1.381\times 10^{-23}\ \mathrm{J\,K^{-1}}$ 为玻尔兹曼常数，$W$ 是与所观察的宏观态相容的微观排列数（微观状态数）——即把总能量分配到所有粒子身上的方式数。微观状态数越多的宏观态熵越高；体系向微观状态数更多的宏观态演化，只是因为那些状态在概率上占压倒性的多数。
:::

统计图像不借助任何机器就把熵的"为什么"讲得明明白白。两个被活塞隔开的理想气体：对 $N \sim 10^{23}$ 个分子而言，所有分子恰好都在一侧的微观状态占比是 $(1/2)^N \sim 10^{-3\times 10^{22}}$——不是"不太可能"，而是*宇宙年龄之内不可能*。气体混合，是因为混合的宏观态几乎占有全部微观状态。同一套计数也解释了热为什么从热流向冷：把固定的总能量摊到更多种排布方式上意味着更多微观状态，而热物体交出 $\delta q$ 损失的微观状态比冷物体得到的少，因为 $\delta q/T$ 在低温处更大。最后这句话，正是 $\Delta S = \delta q/T$ 这个宏观表述的统计读法。

::: history 从克劳修斯到玻尔兹曼再到吉布斯 {#hist-entropy}
鲁道夫·克劳修斯（Clausius）于 1865 年确认了量 $\int \delta q/T$，将它命名为*熵*，并写下"宇宙的熵趋向极大"。路德维希·玻尔兹曼（Boltzmann）于 1877 年给出统计解释 $S = k \log W$；马克斯·普朗克（Planck）在 1900 年定出常数 $k$ 之后，这个公式被刻在了他维也纳墓地的墓碑上。瓦尔特·能斯特（Nernst）于 1906 年宣布了他的热定理——凝聚相间任何等温过程的熵变在绝对零度消失——普朗克把它重述为**热力学第三定律**：完美晶体在 $0\ \mathrm{K}$ 时 $S = 0$，从而给熵一个绝对的零点，使 $S^\circ$ 数据表成为可能。约西亚·威拉德·吉布斯（Gibbs）在 1876 年的《论多相物质的平衡》中完成了整个综合；吉尔伯特·路易斯（Lewis）与梅尔文·兰德尔（Randall）1923 年的教科书让"自由能"成为化学工作者的日常词汇。
:::

::: warning "无序"是比喻，不是定义 {#warn-disorder}
教科书把 $S = k_\mathrm{B}\ln W$ 简化为"熵是无序度"，而这个简写一旦被当作定义就会误导人。熵是*给定能量的排布方式数*，而能量的散布可以在肉眼看来井然有序的态中增大 $W$：$0\ \mathrm{K}$ 的 CO 晶体有残余熵，因为分子可以指向两个方向；液晶在光学上有序却是流体；而过冷溶液"有序地"分层的驱动力来自*环境*的熵，这正是比喻所掩盖的东西。把比喻当作气体膨胀与混合的记忆辅助即可，一旦需要真正的预测就把它丢掉——计数或数据表从不含糊。
:::

要为真实过程计算 $\Delta S$ 就需要数值，第三定律提供了它们：绝对熵 $S^\circ$ 已列入数据表（标准态为 $p^\circ = 1\ \mathrm{bar}$，溶质为 $1\ \mathrm{mol\,dm^{-3}}$），完美晶体在 $0\ \mathrm{K}$ 时 $S = 0$。两块积木就能生成它们全部。

::: proposition 加热与相变的熵变 {#prop-entropy-change}
恒压下把物质从 $T_1$ 可逆加热到 $T_2$ 给出
$$
\Delta S = \int_{T_1}^{T_2} \frac{C_p}{T}\,\mathrm{d}T \approx C_p \ln\frac{T_2}{T_1}
$$
（$C_p$ 恒定）；而在相变温度 $T_\mathrm{tr}$ 下的可逆相变给出
$$
\Delta_\mathrm{tr}S = \frac{\Delta_\mathrm{tr}H}{T_\mathrm{tr}},
$$
因为在相变温度两相平衡，$\Delta S_\mathrm{univ} = 0$，体系的熵增恰好等于吸收的热除以 $T$。
:::

::: example 水的熵账 {#ex-water-entropy}
用数据表数值：$\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$（$273.15\ \mathrm{K}$）、$\Delta_\mathrm{vap}H = 40.65\ \mathrm{kJ\,mol^{-1}}$（$373.15\ \mathrm{K}$）、$C_{p,\mathrm{m}}(\mathrm{l}) \approx 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$，求 (a) $0\,^\circ\mathrm{C}$ 冰的熔化、(b) $100\,^\circ\mathrm{C}$ 水的汽化、(c) 液体从 $0$ 加热到 $100\,^\circ\mathrm{C}$ 的熵变。
::: solution
(a) $\Delta_\mathrm{fus}S = 6010/273.15 = 22.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
(b) $\Delta_\mathrm{vap}S = 40\,650/373.15 = 108.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
(c) $\Delta S = 75.3 \times \ln(373.15/273.15) = 75.3 \times 0.3120 = 23.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
注意其中的规律：汽化占大头，因为它带来约千倍的体积膨胀和巨大的微观状态数增益；熔化小得多，因为液体已经足够稠密。多数液体的 $\Delta_\mathrm{vap}S$ 在 $85$–$106\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 附近（亨利·特劳顿（Trouton）的经验规则，属经验规律）；水的 $109$ 高于这个范围，因为汽化水时除了结构还破坏了氢键。
:::
:::

::: example 由数据表求反应熵：氨 {#ex-haber-entropy}
对 $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$，用数据表的标准熵 $S^\circ(\mathrm{N_2}) = 191.6$、$S^\circ(\mathrm{H_2}) = 130.7$、$S^\circ(\mathrm{NH_3}) = 192.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 计算 $\Delta_\mathrm{r}S^\circ$，并与化学直觉核对。
::: solution
$$
\Delta_\mathrm{r}S^\circ = 2(192.8) - \left[191.6 + 3(130.7)\right]
= 385.6 - 583.7 = -198.1\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
强烈为负，正如预期：四摩尔气体变成两摩尔，气体分子变少意味着能量分配的方式大大减少。有一条经验规则值得用来做数量级核对——$\Delta_\mathrm{r}S^\circ$ 主要由气体摩尔数的变化决定，每生成一摩尔气体约 $+140$ 到 $+160\ \mathrm{J\,K^{-1}\,mol^{-1}}$——但权威永远是数据表。
:::
:::

::: quiz
对每一个自发过程，哪个量保证为正？
- [x] $\Delta S_\mathrm{univ}$，体系加环境的熵变。
- [ ] $\Delta S_\mathrm{sys}$，体系的熵变。
- [ ] $\Delta H_\mathrm{sys}$，体系的焓变。
- [ ] 体系熵变减去环境熵变。
::: solution
只有第二定律的总和 $\Delta S_\mathrm{univ}$ 保证为正。$0\,^\circ\mathrm{C}$ 以下的水结冰是自发的，而*体系*在损失熵；环境赚回的更多。放热过程的 $\Delta H < 0$ 而非 $>0$，且自发性根本不能确定 $\Delta H$ 的符号。
:::
:::

## 自由能：恒温恒压下的判据

在实验室里追踪环境是笨拙的，因为我们控制的是温度和压强，而不是宇宙。诀窍是把第二定律改写成只关于体系的陈述。若体系向温度 $T$ 的环境放出热 $\delta q_\mathrm{sys} = -\delta q_\mathrm{surr}$，则 $\Delta S_\mathrm{surr} = -\Delta H_\mathrm{sys}/T$（恒压下体系放出的热就是 $-\Delta H_\mathrm{sys}$），于是

$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \frac{\Delta H_\mathrm{sys}}{T}
= -\frac{1}{T}\left(\Delta H_\mathrm{sys} - T\Delta S_\mathrm{sys}\right).
$$

方括号里的组合正是我们需要的新状态函数。

::: definition 吉布斯自由能与亥姆霍兹自由能 {#def-gibbs}
**吉布斯自由能**定义为 $G \equiv H - TS$，**亥姆霍兹自由能**定义为 $A \equiv U - TS$。两者都是状态函数。恒温过程有 $\Delta G = \Delta H - T\Delta S$、$\Delta A = \Delta U - T\Delta S$。
:::

::: proposition 吉布斯判据 {#prop-gibbs-criterion}
对恒温恒压、且不能做非膨胀功的过程，
$$
\Delta G < 0 \iff \text{自发}, \qquad
\Delta G = 0 \iff \text{平衡}, \qquad
\Delta G > 0 \iff \text{非自发}.
$$
恒温恒容下类似的判据用 $\Delta A$。
:::

::: proof
恒温恒压下，环境只交换 $pV$ 功和热，故 $\Delta S_\mathrm{surr} = -\Delta H_\mathrm{sys}/T$，且
$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \frac{\Delta H_\mathrm{sys}}{T}
= -\frac{\Delta H_\mathrm{sys} - T\Delta S_\mathrm{sys}}{T}
= -\frac{\Delta G_\mathrm{sys}}{T},
$$
最后一步用了恒温下 $G \equiv H - TS$。由于 $T > 0$，且按第二定律自发变化有 $\Delta S_\mathrm{univ} > 0$，故 $\Delta G_\mathrm{sys} < 0$；平衡时取等号。恒容时用 $\Delta U$ 完全同样地导出亥姆霍兹形式。
:::

"自由能"这个名字是字面意义上的：$\Delta G$ 是恒温恒压下过程所能输出的最大非膨胀功——电池所能做的最大电功，这正是[[general-chemistry-2/electrochemistry-intro|下一章]]测量的东西。负的 $\Delta G$ 不是速度的承诺；它只说热力学上过程愿意走。

::: example 冰什么时候熔化？ {#ex-ice-melting}
取 $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{fus}S = 22.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$（在这一小区间内视为与温度无关），计算 $283.15\ \mathrm{K}$（$10\,^\circ\mathrm{C}$）与 $263.15\ \mathrm{K}$（$-10\,^\circ\mathrm{C}$）的 $\Delta G_\mathrm{fus}$ 并解释。
::: solution
$283.15\ \mathrm{K}$ 时：$\Delta G = 6010 - 283.15 \times 22.0 = 6010 - 6229 = -219\ \mathrm{J\,mol^{-1}} < 0$：冰在 $0\,^\circ\mathrm{C}$ 以上自发熔化。
$263.15\ \mathrm{K}$ 时：$\Delta G = 6010 - 263.15 \times 22.0 = +219\ \mathrm{J\,mol^{-1}} > 0$：$0\,^\circ\mathrm{C}$ 以下熔化非自发，凝固自发。
转变点在 $T = \Delta H/\Delta S = 6010/22.0 = 273\ \mathrm{K}$——正是熔点本身。这是一切实相变和许多反应的普遍形状：$\Delta H$ 与 $\Delta S$ 同号，温度来选赢家。
:::
:::

::: widget plot
f: dH - dS*x/1000
x: 0, 2000
y: -250, 300
sliders: dH=178:0:300:1; dS=161:-400:400:1
labels: \Delta_r G \text{ / } \mathrm{kJ\,mol^{-1}}
vlines: 1106
caption: 一个焓变与熵变皆为正的反应（滑块设定其值，单位分别为 $\mathrm{kJ\,mol^{-1}}$ 与 $\mathrm{J\,K^{-1}\,mol^{-1}}$）的吉布斯自由能变 $\Delta_r G = \Delta_r H - T\Delta_r S$ 随温度的变化——即下面例题中的碳酸钙分解。直线在 $T = \Delta_r H/\Delta_r S$ 处穿过零：其下反应非自发，其上自发。把 $\Delta S$ 滑到负值，可看到一条永不过零的线：$\Delta H > 0$ 而 $\Delta S < 0$ 的反应在任何温度都非自发。
:::

## 反应自由能：$\Delta G^\circ$、$\Delta G$ 与变化方向

正如生成焓让我们能算任何 $\Delta_\mathrm{r}H^\circ$，**标准生成吉布斯自由能** $\Delta_\mathrm{f}G^\circ$ 让我们能算任何 $\Delta_\mathrm{r}G^\circ$：由处于参考状态的单质生成一摩尔化合物时的自由能变，一切处于标准态（$p^\circ = 1\ \mathrm{bar}$；溶质 $1\ \mathrm{mol\,dm^{-3}}$），并定义单质的 $\Delta_\mathrm{f}G^\circ = 0$。

::: definition 标准反应吉布斯自由能 {#def-drg}
$\Delta_\mathrm{r}G^\circ = \sum_\text{products} \nu_i\, \Delta_\mathrm{f}G^\circ_i - \sum_\text{reactants} \nu_i\, \Delta_\mathrm{f}G^\circ_i$；同样可由 $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$ 用数据表的 $\Delta_\mathrm{f}H^\circ$ 与 $S^\circ$ 算出。两条路线必须一致；数据表之间的出入至多出现在末位数字上。
:::

关键在于，$\Delta_\mathrm{r}G^\circ$ 是*纯的、标准态的反应物与纯的、标准态的产物之间*的自由能变——不是混合物趋近平衡时沿实际路径的改变。真正的驱动力取决于组成：

::: proposition 反应方向判据 {#prop-dg-q}
对反应商为 $Q$（用活度：压强除以 $p^\circ$，浓度除以 $c^\circ$）的反应，
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT \ln Q .
$$
当 $\Delta_\mathrm{r}G < 0$ 即 $Q < K$ 时反应正向自发——这与[[general-chemistry-2/chemical-equilibrium|平衡章]]反应商的方向规则一致，如今又配上了定量的驱动力。
:::

::: example 标准不等于自发 {#ex-n2o4-direction}
对 $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$，数据表的 $\Delta_\mathrm{f}G^\circ$（$97.89$ 与 $51.31\ \mathrm{kJ\,mol^{-1}}$）给出 $298.15\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ = +4.73\ \mathrm{kJ\,mol^{-1}}$。一瓶中 $p(\mathrm{N_2O_4}) = 1.00\ \mathrm{bar}$、$p(\mathrm{NO_2}) = 0.10\ \mathrm{bar}$。反应朝哪个方向走？
::: solution
$$
Q = \frac{\left[p(\mathrm{NO_2})/p^\circ\right]^2}{p(\mathrm{N_2O_4})/p^\circ} = \frac{0.10^2}{1.00} = 0.010,
$$
$$
\Delta_\mathrm{r}G = 4.73 + \frac{8.314 \times 298.15 \times \ln 0.010}{1000}
= 4.73 - 11.4 = -6.7\ \mathrm{kJ\,mol^{-1}}.
$$
正向，尽管 $\Delta_\mathrm{r}G^\circ > 0$：混合远离平衡且 $\mathrm{NO_2}$ 很稀，$RT\ln Q$ 项——混合与膨胀的自由能——占了上风。正的 $\Delta_\mathrm{r}G^\circ$ 只意味着*标准态*的纯 $\mathrm{N_2O_4}$ 不会完全变成标准态的纯 $\mathrm{NO_2}$；它并不禁止反应在稀混合物中进行。
:::
:::

::: warning $\Delta G^\circ$ 不是反应的方向 {#warn-dg-vs-dg0}
本章最常见的错误，是把 $\Delta_\mathrm{r}G^\circ$ 的符号读成给定混合物的走向。$\Delta_\mathrm{r}G^\circ$ 预言的是平衡的*位置*（$K$），不是从任意起始混合物的变化方向——那是 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$。$\Delta_\mathrm{r}G^\circ = +100\ \mathrm{kJ\,mol^{-1}}$ 的反应只要 $Q$ 足够小就会猛烈正向进行；$\Delta_\mathrm{r}G^\circ = -100\ \mathrm{kJ\,mol^{-1}}$ 的反应若产物远超平衡量就会倒退。还要记住：催化剂既不改变 $\Delta G$ 也不改变 $\Delta G^\circ$——它同等地降低两个方向的势垒，加快到达平衡而不移动平衡。
:::

## 通往平衡的桥梁：$\Delta_\mathrm{r}G^\circ = -RT\ln K$

::: proposition 核心关系 {#prop-dg-k}
反应的标准吉布斯自由能变与平衡常数由下式相连：
$$
\Delta_\mathrm{r}G^\circ = -RT \ln K
\qquad\Longleftrightarrow\qquad
K = e^{-\Delta_\mathrm{r}G^\circ/RT}.
$$
$298\ \mathrm{K}$ 下 $\Delta_\mathrm{r}G^\circ = -RT\ln 10 \approx -5.7\ \mathrm{kJ\,mol^{-1}}$ 的反应有 $K = 10$；每再负 $5.7\ \mathrm{kJ\,mol^{-1}}$，$K$ 就乘以十。
:::

::: proof
平衡时体系无路可走：$\Delta_\mathrm{r}G = 0$ 且 $Q = K$。代入 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ 得 $0 = \Delta_\mathrm{r}G^\circ + RT\ln K$，即所求关系。（更深的内涵——[[general-chemistry-2/chemical-equilibrium|质量作用]]动力学里出现的同一个 $K$ 也出现在这里——在于两者表达的都是 $\Delta S_\mathrm{univ} = 0$ 这一条件；统计力学从分子配分函数出发证明这一点，见 [[statistical-thermodynamics/equilibrium-from-molecules]]。）
:::

::: example 为什么空气不是一氧化氮 {#ex-no-k}
对 $\mathrm{N_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO(g)}$，$\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = 86.6\ \mathrm{kJ\,mol^{-1}}$，故 $298.15\ \mathrm{K}$ 时 $\Delta_\mathrm{r}G^\circ = +173.2\ \mathrm{kJ\,mol^{-1}}$。计算 $K$ 并解释。
::: solution
$$
K = \exp\!\left(-\frac{173.2\times 10^{3}}{8.314 \times 298.15}\right)
= e^{-69.8} = 4.5 \times 10^{-31}.
$$
室温下 $\mathrm{N_2}$ 与 $\mathrm{O_2}$ 的平衡混合物中 $\mathrm{NO}$ 的占比是 $10^{-30}$ 量级：空气对氧化在热力学上是稳定的，这就是我们能活着的原因。同一关系也解释了内燃机为什么会造出 $\mathrm{NO}$：$2400\ \mathrm{K}$ 时指数只有 $-173.2\times10^3/(8.314\times2400) = -8.7$，$K \approx 2\times10^{-4}$——虽小，却不再为零，而炽热气体冷却太快，来不及重新平衡，组成就被冻结了。
:::
:::

::: proposition 温度依赖与转变温度 {#prop-crossover}
若 $\Delta_\mathrm{r}H^\circ$ 与 $\Delta_\mathrm{r}S^\circ$ 在某温度区间内大致恒定，则 $\Delta_\mathrm{r}G^\circ(T) \approx \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$，且
$$
\ln K = -\frac{\Delta_\mathrm{r}H^\circ}{R}\cdot\frac{1}{T} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
$\ln K$ 对 $1/T$ 作图（范特霍夫图）是斜率为 $-\Delta_\mathrm{r}H^\circ/R$ 的直线；$\Delta_\mathrm{r}H^\circ$ 与 $\Delta_\mathrm{r}S^\circ$ 同号的反应在 $T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$ 处改变自发性。
:::

::: proof
把 $\Delta_\mathrm{r}G^\circ = -RT\ln K$ 与 $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$ 结合并除以 $-RT$：
$$
\ln K = -\frac{\Delta_\mathrm{r}G^\circ}{RT} = -\frac{\Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ}{RT}
= -\frac{\Delta_\mathrm{r}H^\circ}{RT} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
范特霍夫直线随之而来；转变点也随而来，因为 $\Delta_\mathrm{r}G^\circ = 0$（即 $K = 1$）恰在 $T = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$。"$\Delta H$、$\Delta S$ 与温度无关"这个假设，与小温区量热学里让计算变简单的是同一个近似，在反应物或产物的相变附近会失效。
:::

::: example 煅烧石灰石：转变温度的计算 {#ex-caco3}
对 $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$，数据表给出 $\Delta_\mathrm{r}H^\circ = +178.3\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = +160.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$（由 $\Delta_\mathrm{f}H^\circ$：$-635.1 - 393.5 + 1206.9$；由 $S^\circ$：$39.8 + 213.8 - 92.9$）。求转变温度、$298.15\ \mathrm{K}$ 与 $1200\ \mathrm{K}$ 的平衡 $\mathrm{CO_2}$ 压。
::: solution
转变点：$T^* = 178.3\times10^{3}/160.7 = 1110\ \mathrm{K}$（$837\,^\circ\mathrm{C}$）。$298.15\ \mathrm{K}$ 时，
$$
\Delta_\mathrm{r}G^\circ = 178.3 - 298.15 \times 0.1607 = 130.4\ \mathrm{kJ\,mol^{-1}},
\qquad
K = e^{-52.6} = 1.4 \times 10^{-23}.
$$
因为两固相皆纯，$K = p(\mathrm{CO_2})/p^\circ$：室温下的石灰石处在 $10^{-23}\ \mathrm{bar}$ 的平衡二氧化碳压之下——其稳定已超出任何实际意义。$1200\ \mathrm{K}$ 时，$\Delta_\mathrm{r}G^\circ = 178.3 - 1200\times0.1607 = -14.5\ \mathrm{kJ\,mol^{-1}}$，$K = e^{1.46} = 4.3$：超过 $T^*$ 后分解能以四个多 bar 把 $\mathrm{CO_2}$ 排出，这就是石灰窑要烧得滚烫并敞口排气的原因。同一组数字也解释了逆过程——$T^*$ 以下石灰的碳化。
:::
:::

::: widget plot
f: -dH*1000/(8.314*x) + dS/8.314
x: 250, 2000
y: -60, 60
sliders: dH=178:0:300:1; dS=161:-400:400:1
labels: \ln K
vlines: 1110
caption: 范特霍夫直线 $\ln K = -\Delta_\mathrm{r}H^\circ/(RT) + \Delta_\mathrm{r}S^\circ/R$ 对温度作图（滑块设定 $\Delta_\mathrm{r}H^\circ$（$\mathrm{kJ\,mol^{-1}}$）与 $\Delta_\mathrm{r}S^\circ$（$\mathrm{J\,K^{-1}\,mol^{-1}}$））。曲线在转变温度 $T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$ 处穿过 $\ln K = 0$；对图中所示的石灰石数值是 $1110\ \mathrm{K}$。对 $T$ 的弯曲只是表象——直线是对 $1/T$ 而言的——而放热反应（$\Delta_\mathrm{r}H^\circ < 0$）表现为 $K$ 随温度*减小*，勒夏特列对热的规则如今成了方程。
:::

::: widget contour
f: dH - y*x/1000
x: 200, 2000
y: -400, 400
sliders: dH=178:0:300:1
constraint: dH - y*x/1000
gradient: false
caption: 固定 $\Delta_r H$（滑块，$\mathrm{kJ\,mol^{-1}}$）时，$\Delta_r G = \Delta_r H - T\Delta_r S$ 的符号分布（颜色）随温度 $T$（横轴，K）与熵变 $\Delta_r S$（纵轴，$\mathrm{J\,K^{-1}\,mol^{-1}}$）的图像。画出的约束线 $\Delta_r G = 0$ 就是双曲线 $T = \Delta_r H/\Delta_r S$：转变轨迹。线下方反应自发，上方非自发；大的正 $\Delta_r S$ 使几乎任何吸热反应在高温下自发，大的负 $\Delta_r S$ 则一律禁止。
:::

有一个推论值得单独陈述，因为它是自然界和工业界推动吸能反应的方式：**自由能可以相加**。若反应 1 的 $\Delta_\mathrm{r}G^\circ = +100\ \mathrm{kJ\,mol^{-1}}$，与之共享中间体的反应 2 为 $-130\ \mathrm{kJ\,mol^{-1}}$，则总反应为 $-30\ \mathrm{kJ\,mol^{-1}}$，就可以被推动。活细胞为每一步吸能反应付出代价的方式是把它与 ATP 水解（细胞条件下 $\Delta_\mathrm{r}G \approx -31\ \mathrm{kJ\,mol^{-1}}$）偶联；高炉为还原铁矿石付出的代价是烧碳。

::: example 偶联：碳是通用还原剂 {#ex-boudouard}
对 $\mathrm{C(s)} + \mathrm{CO_2(g)} \rightarrow 2\,\mathrm{CO(g)}$，用 $\Delta_\mathrm{f}G^\circ(\mathrm{CO}) = -137.2$、$\Delta_\mathrm{f}G^\circ(\mathrm{CO_2}) = -394.4$、$\Delta_\mathrm{f}H^\circ(\mathrm{CO}) = -110.5$、$\Delta_\mathrm{f}H^\circ(\mathrm{CO_2}) = -393.5\ \mathrm{kJ\,mol^{-1}}$ 及 $S^\circ$：$\mathrm{C(s)}\ 5.7$、$\mathrm{CO_2}\ 213.8$、$\mathrm{CO}\ 197.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$。计算 $298.15\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ$ 与转变温度，并解释为什么炽热的碳几乎能还原一切。
::: solution
$\Delta_\mathrm{r}G^\circ(298) = 2(-137.2) + 394.4 = +120.0\ \mathrm{kJ\,mol^{-1}}$：室温非自发。
$\Delta_\mathrm{r}H^\circ = 2(-110.5) + 393.5 = +172.5\ \mathrm{kJ\,mol^{-1}}$，$\Delta_\mathrm{r}S^\circ = 2(197.7) - 5.7 - 213.8 = +175.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故 $T^* = 172.5\times10^{3}/175.9 = 981\ \mathrm{K}$。约 $700\,^\circ\mathrm{C}$ 以上，凡自身分解线在 $\Delta_\mathrm{r}G$-$T$ 图（埃林汉姆图——同样两条线，按氧化物生成来画）上排在碳线之下的金属氧化物，都会被碳还原，因为氧化物分解（吸能，$\Delta G$ 小）与本反应（$981\ \mathrm{K}$ 以上放能）之和为放能。这一个转变温度，就是铁用焦炭而不用别的什么冶炼的原因。
:::
:::

::: quiz
某反应在 $298\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ = +12.0\ \mathrm{kJ\,mol^{-1}}$。下列说法哪个正确？
- [x] $K < 1$：平衡时标准态混合物偏向反应物，但从纯反应物出发，反应仍会进行到中途。
- [ ] 该反应在任何条件下都不能发生。
- [ ] $K > 1$：正号意味着产物占优。
- [ ] 该反应必然非常慢。
::: solution
$K = e^{-12\,000/(8.314\times298.15)} = e^{-4.84} = 0.0079 < 1$：标准态平衡偏向反应物，但从纯反应物出发时 $Q = 0$、$\Delta_\mathrm{r}G < 0$，直到 $Q$ 升到 $K$——反应进行到中途，一切平衡皆如此。热力学对速率什么也不说，所以"不能发生"与"很慢"都推不出来。
:::
:::

## 后续内容

关系 $\Delta_\mathrm{r}G^\circ = -RT\ln K$ 把平衡章的 $K$ 值表变成一张连续的自由能面；同一个 $\Delta_\mathrm{r}G$ 用电学方法测量就是[[general-chemistry-2/electrochemistry-intro|电化学]]的电池电势。$S = k_\mathrm{B}\ln W$ 的分子含义见 [[statistical-thermodynamics/boltzmann-distribution]]；$G$、化学势与相律的完整热力学处理见 [[thermodynamics/second-law]]、[[thermodynamics/free-energy]] 与 [[thermodynamics/reaction-equilibrium]]。这里假设的热与功的记账法是[[general-chemistry-1/thermochemistry|热化学]]；[[general-chemistry-2/acids-bases|酸]]、[[general-chemistry-2/buffers-titrations|缓冲溶液]]与[[general-chemistry-2/solubility-equilibria|难溶盐]]的平衡都是同一个 $\Delta_\mathrm{r}G^\circ$ 的具体取值。

::: summary
- 自发性由 $\Delta S_\mathrm{univ} > 0$ 裁决，而不是 $\Delta H$；吸热过程可以自发，因为必须增大的是宇宙的熵而非体系的熵。
- 熵是 $S = k_\mathrm{B}\ln W$，微观状态数的对数；第三定律定出其零点，使 $S^\circ$ 数据表成为绝对值。
- 恒温恒压下判据化为 $\Delta G = \Delta H - T\Delta S < 0$；$\Delta G = 0$ 即平衡，$\Delta G$ 是最大非膨胀功。
- $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ 给出从任意混合物出发的方向；单凭 $\Delta_\mathrm{r}G^\circ$ 只给平衡位置，从不给方向或速率。
- $\Delta_\mathrm{r}G^\circ = -RT\ln K$：$298\ \mathrm{K}$ 下每 $-5.7\ \mathrm{kJ\,mol^{-1}}$，$K$ 乘以十。
- $\ln K$ 对 $1/T$ 成直线，斜率 $-\Delta_\mathrm{r}H^\circ/R$；$\Delta H$ 与 $\Delta S$ 同号的反应在 $T^* = \Delta H/\Delta S$ 处切换自发性。
- 自由能可以相加，所以吸能反应靠与放能反应偶联来驱动——细胞里是 ATP，高炉里是碳。
:::

## 练习

::: exercise 预测熵的符号 {level=1}
预测下列各过程 $\Delta_\mathrm{r}S^\circ$ 的符号：(a) 碘的升华；(b) $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightarrow 2\,\mathrm{NH_3(g)}$；(c) $\mathrm{CaO(s)} + \mathrm{CO_2(g)} \rightarrow \mathrm{CaCO_3(s)}$；(d) $\mathrm{NaCl(s)}$ 溶于水。哪个符号最难判断，为什么？
::: solution
(a) 正——出现一摩尔气体，而气体的熵远大于一切。(b) 负——四摩尔气体变两摩尔。(c) 负——消耗一摩尔气体。(d) 最难：晶格被拆散（熵增），但水在离子周围变得有序（熵减）；数据表的答案是正而不大（$\mathrm{NaCl}$ 为 $+72\ \mathrm{J\,K^{-1}\,mol^{-1}}$），有些盐（如 $\mathrm{CaF_2}$）甚至为负。数气体的摩尔数对 (a)–(c) 是可靠的规则，对 (d) 毫无用处。
:::
:::

::: exercise 由数据表求反应熵 {level=1 check="-188.0"}
对 $2\,\mathrm{SO_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{SO_3(g)}$，用 $S^\circ(\mathrm{SO_2}) = 248.2$、$S^\circ(\mathrm{O_2}) = 205.2$、$S^\circ(\mathrm{SO_3}) = 256.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$。以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 为单位输入 $\Delta_\mathrm{r}S^\circ$。
::: solution
$\Delta_\mathrm{r}S^\circ = 2(256.8) - [2(248.2) + 205.2] = 513.6 - 701.6 = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$。三摩尔气体变两摩尔，符号吻合。
:::
:::

::: exercise 燃烧的自由能 {level=1 check="-817.9"}
用 $\Delta_\mathrm{f}G^\circ$：$\mathrm{CH_4(g)}\ -50.7$、$\mathrm{CO_2(g)}\ -394.4$、$\mathrm{H_2O(l)}\ -237.1\ \mathrm{kJ\,mol^{-1}}$，计算 $298.15\ \mathrm{K}$ 下 $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$ 的 $\Delta_\mathrm{r}G^\circ$。以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入。
::: solution
$\Delta_\mathrm{r}G^\circ = (-394.4) + 2(-237.1) - (-50.7) - 0 = -817.9\ \mathrm{kJ\,mol^{-1}}$。燃料电池从一摩尔甲烷所能提取的最大电功是 $817.9\ \mathrm{kJ}$——比燃烧它放出的 $890\ \mathrm{kJ}$ 热少，因为 $\Delta_\mathrm{r}S^\circ = (\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ)/T = -243\ \mathrm{J\,K^{-1}\,mol^{-1}} < 0$：即便是理想燃料电池，为了做通熵的账也必须排出 $T|\Delta S| = 72.5\ \mathrm{kJ}$ 的废热，而烧掉气体则把它们全部排出。
:::
:::

::: exercise 三氧化硫生成的转变温度 {level=2 check="1052"}
对 $2\,\mathrm{SO_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{SO_3(g)}$，$\Delta_\mathrm{r}H^\circ = -197.8\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$。计算 $298.15\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ$ 及其上变为非自发的温度。以 K 为单位输入该温度。
::: solution
$\Delta_\mathrm{r}G^\circ(298) = -197.8 - 298.15(-0.1880) = -197.8 + 56.1 = -141.7\ \mathrm{kJ\,mol^{-1}}$：室温自发。两号皆负，故转变点为 $T^* = 197.8\times10^{3}/188.0 = 1052\ \mathrm{K}$；其上失去一摩尔气体的熵代价压过焓的收益，$\mathrm{SO_3}$ 分解。因此接触法取 $700$–$750\ \mathrm{K}$ 的折中：远低于 $T^*$ 以保证好的 $K$，又足够热以让催化剂给出可接受的速率。
:::
:::

::: exercise 由自由能求平衡常数 {level=2 check="3190"}
某反应在 $298.15\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ = -20.0\ \mathrm{kJ\,mol^{-1}}$。计算 $K$。以三位有效数字输入 $K$。
::: solution
$K = \exp\!\left(\dfrac{20\,000}{8.314 \times 298.15}\right) = e^{8.07} = 3.19 \times 10^{3}$。注意其中的杠杆：区区 $-20\ \mathrm{kJ\,mol^{-1}}$ 就是一千倍的产物偏好；"每十倍约 $-5.7\ \mathrm{kJ\,mol^{-1}}$"的经验规则给出 $20/5.7 \approx 3.5$ 个数量级，数量级正确。
:::
:::

::: exercise 从混合物看方向 {level=2 check="-64.4"}
对 $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$，$298.15\ \mathrm{K}$ 时 $\Delta_\mathrm{r}G^\circ = -32.9\ \mathrm{kJ\,mol^{-1}}$。某反应器中 $p(\mathrm{N_2}) = 10\ \mathrm{bar}$、$p(\mathrm{H_2}) = 30\ \mathrm{bar}$、$p(\mathrm{NH_3}) = 5\ \mathrm{bar}$。计算 $\Delta_\mathrm{r}G$ 并指出反应走向。以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入 $\Delta_\mathrm{r}G$。
::: solution
$Q = \dfrac{5^2}{10 \times 30^4} = 3.09 \times 10^{-6}$，故
$\Delta_\mathrm{r}G = -32.9 + 8.314\times298.15\times\ln(3.09\times10^{-6})/1000 = -32.9 - 31.5 = -64.4\ \mathrm{kJ\,mol^{-1}}$。
强烈正向：贫氨反应物的高压混合把 $RT\ln Q$ 推到很负。这就是哈伯法要不断送入压缩的新鲜 $\mathrm{N_2}$ 与 $\mathrm{H_2}$ 并移走氨的原因——让 $Q$ 保持在 $K$ 之下，$\Delta_\mathrm{r}G$ 就保持为负，流动就持续下去。
:::
:::

::: exercise 石灰窑，定量地 {level=3}
对 $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$，取 $\Delta_\mathrm{r}H^\circ = +178.3\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = +160.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 且与温度无关。(a) 求转变温度。(b) 求 $298.15\ \mathrm{K}$ 与 $1200\ \mathrm{K}$ 的平衡 $\mathrm{CO_2}$ 压。(c) 一窑向大气敞开，其中 $p(\mathrm{CO_2}) \approx 4\times10^{-4}\ \mathrm{bar}$：分解在*那里*于什么温度变为自发？
::: solution
(a) $T^* = 178.3\times10^{3}/160.7 = 1110\ \mathrm{K}$。
(b) $298.15\ \mathrm{K}$ 时 $\Delta_\mathrm{r}G^\circ = 130.4\ \mathrm{kJ\,mol^{-1}}$，$K = e^{-52.6} = 1.4\times10^{-23}$；固相皆纯，故 $K = p(\mathrm{CO_2})/p^\circ$，即 $p_\mathrm{eq} = 1.4\times10^{-23}\ \mathrm{bar}$。$1200\ \mathrm{K}$ 时 $\Delta_\mathrm{r}G^\circ = -14.5\ \mathrm{kJ\,mol^{-1}}$，$p_\mathrm{eq} = 4.3\ \mathrm{bar}$。
(c) 分解自发当 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q < 0$，其中 $Q = p(\mathrm{CO_2})/p^\circ = 4\times10^{-4}$。因 $\ln(4\times10^{-4}) = -7.82$，
$$
\Delta_\mathrm{r}G = \left[178.3 - 0.1607\,T\right] + 8.314\times10^{-3}\,T\times(-7.82) = 178.3 - 0.2257\,T,
$$
在 $T = 178.3/0.2257 = 790\ \mathrm{K}$ 处归零。在空气中，分解早在约 $790\ \mathrm{K}$（$517\,^\circ\mathrm{C}$）就变为自发，远低于把 $\mathrm{CO_2}$ 顶着一个 bar 排出所需的 $1110\ \mathrm{K}$：窑的敞口排气本身就是一次勒夏特列操作，如今由 $RT\ln Q$ 项给出了定量表述。
:::
:::

::: exercise 推导核心关系 {level=3}
从环境的 $\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \Delta H_\mathrm{sys}/T$ 与定义 $G = H - TS$ 出发，只利用混合熵 $\Delta_\mathrm{mix}S = -nR\sum_i x_i \ln x_i$ 作用于"把每种反应物与产物从标准态压缩到其分压"，推导理想气体混合物的 $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$，再由此导出 $\Delta_\mathrm{r}G^\circ = -RT\ln K$。
::: solution
一摩尔理想气体从标准压 $p^\circ$ 变到分压 $p_i$，熵变为 $R\ln(p^\circ/p_i)$（向更大体积的膨胀），故自由能变为 $\Delta G_i = RT\ln(p_i/p^\circ)$（理想气体恒温无焓变）。按化学计量系数对产物减反应物求和，
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\sum_i \nu_i \ln\frac{p_i}{p^\circ}
= \Delta_\mathrm{r}G^\circ + RT\ln Q, \qquad
Q = \prod_i \left(\frac{p_i}{p^\circ}\right)^{\nu_i}.
$$
平衡时 $\Delta_\mathrm{r}G = 0$ 且 $Q = K$，故 $\Delta_\mathrm{r}G^\circ = -RT\ln K$。能量学与平衡之间整座桥梁就是一行混合熵——这也正是 $Q$ 以幂之积出现的原因：熵可加，所以它的对数相乘。
:::
:::

::: exercise 偶联与埃林汉姆逻辑 {level=3 check="981"}
对 $\mathrm{C(s)} + \mathrm{CO_2(g)} \rightarrow 2\,\mathrm{CO(g)}$，用 $\Delta_\mathrm{f}H^\circ(\mathrm{CO}) = -110.5$、$\Delta_\mathrm{f}H^\circ(\mathrm{CO_2}) = -393.5\ \mathrm{kJ\,mol^{-1}}$；$\Delta_\mathrm{f}G^\circ(\mathrm{CO}) = -137.2$、$\Delta_\mathrm{f}G^\circ(\mathrm{CO_2}) = -394.4\ \mathrm{kJ\,mol^{-1}}$；$S^\circ(\mathrm{C}) = 5.7$、$S^\circ(\mathrm{CO_2}) = 213.8$、$S^\circ(\mathrm{CO}) = 197.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$。计算 $298.15\ \mathrm{K}$ 的 $\Delta_\mathrm{r}G^\circ$ 与转变温度。以 K 为单位输入转变温度。
::: solution
$\Delta_\mathrm{r}G^\circ(298) = 2(-137.2) + 394.4 = +120.0\ \mathrm{kJ\,mol^{-1}}$；$\Delta_\mathrm{r}H^\circ = +172.5\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{r}S^\circ = +175.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故 $T^* = 172.5\times10^{3}/175.9 = 981\ \mathrm{K}$。$981\ \mathrm{K}$ 以上，$\mathrm{C/CO}$ 线在埃林汉姆图上落到几乎每条金属氧化物线之下，这就是"把氧化物的分解与这个反应偶联起来"的图形形式：两个 $\Delta_\mathrm{r}G$ 之和为负，氧化物被还原。其下则只有偶联最强的还原手段（$\mathrm{Al_2O_3}$ 的电解，铝是教科书案例）才管用——铝之所以是电气化时代才有的金属，原因即在此。
:::
:::
