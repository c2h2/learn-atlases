便携炉烧掉几克甲烷，锅里的水就开了。冷敷袋一拧，同样的小袋却变得冰凉，因为里面溶解的盐吸收热量而不是放出热量。这两件事都是[[general-chemistry-1/stoichiometry]]中配平过的那类化学变化，而且都伴随着能量的转移。热化学就是这种转移的账本：一个反应放出或吸收多少热，这些热如何在热力学能与膨胀功之间分配，以及当你关心的反应根本无法在量热计中进行时，如何得到这个数值。

这本账底下有一个结构性的事实。热和功取决于途径；热力学能则不然。本章其余的一切——焓、盖斯定律、生成焓表——都是把这一事实应用于化学家实际进行反应的方式，而那通常是在敞口容器中、恒压下进行的。

## 热、功与热力学能

::: definition 体系、热与功 {#def-heat-work}
**体系**是所研究的样品；**环境**是其余的一切。物质不跨越边界的体系是**封闭**体系，物质跨越边界的是**敞开**体系，物质和能量都不跨越边界的是**隔离**体系。**热**$q$是由于温度差而转移的能量。**功**$w$是通过其他任何有组织的方式转移的能量。在本课程中，功几乎总是**膨胀功**，$w = -p_\mathrm{ex}\Delta V$，其中$p_\mathrm{ex}$是体系所反抗的外压，$\Delta V = V_\mathrm{f} - V_\mathrm{i}$。符号约定采用 IUPAC 约定，整个图谱都使用它：能量进入体系时$q$和$w$为正。
:::

在带活塞的气缸中加热气体，同时发生两件事。能量以热的形式沿温度梯度进入，又因活塞移动而以功的形式离开。这两个量都不是气体“具有”的性质。问移走火焰之后热存放在哪里，这个问题没有答案：热已经变成了热力学能，或者又以功的形式离开了。体系确实具有的是它的**热力学能**$U$，即其分子动能与势能之和，从一个任意的零点算起。在化学中只有变化量$\Delta U$是可观测的。

::: proposition 热力学第一定律 {#prop-first-law}
对于封闭体系，
$$
\Delta U = q + w .
$$
热力学能是**状态函数**：两个状态之间的$\Delta U$只取决于这两个状态，而与途径无关。热和功是**途径函数**。沿任何循环，$\oint \mathrm{d}U = 0$，而净热和净功不必各自为零。
:::

理想气体这一特例经常用到。对于一定量的理想气体，$U$只取决于温度——这是焦耳的结论，[[general-chemistry-1/gases]]从分子角度讨论过——所以等温变化有$\Delta U = 0$，因而$q = -w$。向真空的自由膨胀有$p_\mathrm{ex} = 0$，因此$w = 0$，从而$q = 0$：气体扩散开来，而不必发生任何热的过程。

::: example 反抗恒定外压的膨胀 {#ex-work}
一个封闭样品吸收$q = +1.50\ \mathrm{kJ}$，并反抗恒定的$p_\mathrm{ex} = 1.50\ \mathrm{bar}$从$2.00\ \mathrm{L}$膨胀到$8.00\ \mathrm{L}$。求$w$、$\Delta U$，并预先求出焓变。
::: solution
压力恒定且只做膨胀功，所以
$$
w = -p_\mathrm{ex}\Delta V = -(1.50\ \mathrm{bar})(6.00\ \mathrm{L}) = -9.00\ \mathrm{L\,bar}.
$$
换算$1\ \mathrm{L\,bar} = 100\ \mathrm{J}$是准确的，因为$1\ \mathrm{bar} = 10^{5}\ \mathrm{Pa}$，$1\ \mathrm{L} = 10^{-3}\ \mathrm{m^{3}}$。因此$w = -0.900\ \mathrm{kJ}$：体系对环境做功。第一定律给出
$$
\Delta U = q + w = 1.50 + (-0.900) = +0.600\ \mathrm{kJ}.
$$
恒压下，热等于下一节推导的焓变，所以$\Delta H = q = +1.50\ \mathrm{kJ}$。检验：$\Delta H = \Delta U + p\Delta V = 0.600 + 0.900 = 1.50\ \mathrm{kJ}$。三个不同的数描述同一个过程，而如果气体走的是另一条途径，只有$\Delta U$会保持不变。
:::
:::

::: warning 热不是性质，符号也不是可有可无的 {#warn-heat}
本章有两种主要错误。第一种是把热当作储存在物体中的物质——十八世纪的热质图像。体系具有热力学能、焓、温度和压力。它没有“含热量”，“产物的热”也不是一个有意义的说法。第二种是不声不响地引入另一种符号约定。工程教材常写作$\Delta U = q - w$，其中$w$是体系*对外*所做的功。他们的$w$是我们的$w$的相反数。在一个计算中混用两种约定，会使关于过程是储存能量还是消耗能量的每一个结论都颠倒过来。本图谱取$w$为*环境对*体系所做的功，所以压缩有$w > 0$，推动活塞的膨胀有$w < 0$。
:::

## 焓

大多数反应不是在密封的弹式容器中进行的。它们在烧杯、烧瓶和炉子中进行，与大气相通，所以压力恒定，而体积是多少就是多少。在这种安排下测得的热不是$\Delta U$，因为体系要消耗一些能量把大气推开，或者在大气向内推时获得一些能量。与恒压热相符的量是焓。

::: definition 焓 {#def-enthalpy}
**焓**是状态函数
$$
H \equiv U + pV .
$$
它是状态函数，因为$U$、$p$和$V$都是。与$U$同理，它的绝对值是任意的；化学中使用的是$\Delta H$。
:::

::: proposition 恒压热 {#prop-qp}
对于恒压下、除膨胀功外不做其他功的封闭体系，
$$
\Delta H = q_p .
$$
恒容且不做任何功时，$\Delta U = q_V$。因此，在敞口容器中生成气体的反应，只要气体的量发生变化，就有$q_p \ne q_V$。
:::

::: proof
恒压下$\Delta(pV) = p\Delta V$，所以
$$
\Delta H = \Delta U + p\Delta V .
$$
第一定律给出$\Delta U = q + w$，而唯一的功是$w = -p_\mathrm{ex}\Delta V$。与恒定外压处于力学平衡意味着$p_\mathrm{ex} = p$，即体系的压力，所以$w = -p\Delta V$，且
$$
\Delta H = q_p - p\Delta V + p\Delta V = q_p .
$$
恒容时$\Delta V = 0$，所以$w = 0$，$\Delta U = q_V$。一旦做了其他种类的功，这一论证就不成立：在电化学电池中电功是额外的，恒压热不再等于$\Delta H$。
:::

对于这样的反应——每种固体和液体的体积与气体体积相比可以忽略、且气体为理想气体——两个量热学量之间的实用关系随即可得。

::: proposition 反应的焓与热力学能 {#prop-hu}
在恒温下，
$$
\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT ,
$$
其中$\Delta n_\mathrm{g}$是气体物质的量的变化，以按所写方程式每摩尔反应的气体摩尔数计（产物减反应物）。这里$R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$。凝聚相对$\Delta n_\mathrm{g}$没有贡献。
:::

::: proof
$\Delta H = \Delta U + \Delta(pV)$。对于理想气体$pV = nRT$，恒温下$\Delta(nRT) = \Delta n\, RT$。与气体相比略去固体和液体的$pV$，剩下$\Delta(pV) = \Delta n_\mathrm{g}\, RT$。
:::

在$298.15\ \mathrm{K}$下，$RT = 2.479\ \mathrm{kJ\,mol^{-1}}$。因此每生成一摩尔气体，$\Delta_\mathrm{r} H$就比$\Delta_\mathrm{r} U$正约$2.5\ \mathrm{kJ}$——与数百千焦的燃烧相比很小，但对于焓变本身只有几千焦的反应则是决定性的。

::: example 恒压加热氮气 {#ex-nitrogen}
把$2.00\ \mathrm{mol}$ $\mathrm{N_2}$（视为理想气体，近似摩尔热容$C_{p,\mathrm{m}} = 29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$）在恒压下从$300.0\ \mathrm{K}$加热到$450.0\ \mathrm{K}$。求$q$、$w$、$\Delta H$和$\Delta U$。
::: solution
压力恒定且只做膨胀功，所以$q = q_p = \Delta H$：
$$
\Delta H = n\, C_{p,\mathrm{m}}\, \Delta T = (2.00\ \mathrm{mol})(29.1\ \mathrm{J\,K^{-1}\,mol^{-1}})(150.0\ \mathrm{K}) = 8.73\times 10^{3}\ \mathrm{J} = 8.73\ \mathrm{kJ}.
$$
对于恒压下的理想气体，功仅由温度变化决定，
$$
w = -nR\Delta T = -(2.00)(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(150.0\ \mathrm{K}) = -2.49\times 10^{3}\ \mathrm{J} = -2.49\ \mathrm{kJ}.
$$
第一定律给出$\Delta U = q + w = 8.73 - 2.49 = 6.24\ \mathrm{kJ}$。等价地，$\Delta U = \Delta H - nR\Delta T$，这是把[[#prop-hu]]用于一个物理变化：按反应的意义$\Delta n_\mathrm{g} = 0$，但由于$T$改变了，$\Delta(nRT) = nR\Delta T$。气体吸收了$8.73\ \mathrm{kJ}$热，其中$6.24\ \mathrm{kJ}$储存为热力学能，$2.49\ \mathrm{kJ}$用于推开大气。$C_{p,\mathrm{m}}$给到一位小数，所以答案给到百分之一千焦。
:::
:::

## 量热法

测量$q$是一门不让热散失到房间里的技艺，但账目本身很简单。

::: definition 热容与量热法 {#def-heat-capacity}
样品的**热容**$C$是沿指定途径使其温度升高一开尔文所需的热：恒压下$C_p = \mathrm{d}H/\mathrm{d}T$，恒容下$C_V = \mathrm{d}U/\mathrm{d}T$。**比热容**$c$是每克的热容，**摩尔热容**$C_\mathrm{m}$是每摩尔的热容。当温度变化小到可以把$c$视为常数时，
$$
q = mc\,\Delta T = n C_\mathrm{m}\,\Delta T .
$$
**量热计**是热容已知、用来测量这一温度变化的容器。与大气相通的咖啡杯量热计测量$q_p$。弹式量热计是恒容的密封钢制容器，测量$q_V$。
:::

室温附近液态水的比热容为$4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$。由此有两个推论。水是一支迟钝的温度计：很大的能量变化隐藏在很小的温升之中，这正是生物体系和量热计都使用水的原因。而且，在知道质量以及容器本身的热容之前，温升的数值毫无意义。

::: widget plot
f: 25 + 1000*x/(m*4.184)
x: 0, 8
y: 20, 70
sliders: m=100:50:200:10
labels: T/^\circ\mathrm{C}
caption: $m$克液态水（比热容$4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$）从$25\,^\circ\mathrm{C}$开始，在恒压下加入$x$千焦后的温度。斜率为$1/(mc)$。样品越重，温升越小：量热法就是反过来读这条直线，从测得的温升求出引起它的热。
:::

在真实的实验中，吸收热的不只是溶液，还有量热计。若$C_\mathrm{cal}$为器件的热容，则当整个装置与房间绝热时，
$$
q_\mathrm{rxn} + q_\mathrm{contents} + q_\mathrm{cal} = 0
$$
因为此时反应、内容物和器件一起构成隔离体系，它们的能量变化之和为零。忽略$C_\mathrm{cal}$会使$|q_\mathrm{rxn}|$偏小。学生用咖啡杯量热计得到的结果因此系统性地略为偏低，如实的实验报告应当指出这一点。

::: example 咖啡杯中的中和反应 {#ex-cup}
把$50.0\ \mathrm{cm^{3}}$ $1.00\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl(aq)}$与$50.0\ \mathrm{cm^{3}}$ $1.00\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH(aq)}$（均为$21.50\,^\circ\mathrm{C}$）在咖啡杯量热计中混合。温度升至$28.20\,^\circ\mathrm{C}$。取溶液密度为$1.00\ \mathrm{g\,cm^{-3}}$，比热容与水相同，为$4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$，忽略杯子。求下列反应的$\Delta H$：
$$
\mathrm{H^{+}(aq)} + \mathrm{OH^{-}(aq)} \rightarrow \mathrm{H_2O(l)} .
$$
::: solution
溶液质量为$100.0\ \mathrm{g}$，$\Delta T = 6.70\ \mathrm{K}$。溶液获得的热为
$$
q_\mathrm{sol} = (100.0\ \mathrm{g})(4.184\ \mathrm{J\,g^{-1}\,K^{-1}})(6.70\ \mathrm{K}) = 2.803\times 10^{3}\ \mathrm{J} = 2.803\ \mathrm{kJ}.
$$
这些热由反应提供，所以$q_\mathrm{rxn} = -2.803\ \mathrm{kJ}$。每份溶液含$0.0500\ \mathrm{mol}$试剂，化学计量比为一比一，所以生成$0.0500\ \mathrm{mol}$水。压力恒定，
$$
\Delta H = \frac{-2.803\ \mathrm{kJ}}{0.0500\ \mathrm{mol}} = -56.1\ \mathrm{kJ\,mol^{-1}}.
$$
温升$6.70$有三位有效数字，它限制了结果。公认的标准值约为$-55.8\ \mathrm{kJ\,mol^{-1}}$；差别来自忽略的杯子热容、对溶液性质的假设以及普通的温度计误差。符号就是化学：强酸被强碱中和是放热的，烧杯变热。
:::
:::

当反应必须被强制进行时，例如燃烧，弹式量热计是合适的工具。弹式量热计给出$\Delta U$，而[[#prop-hu]]把它换算为表中给出的焓。甲烷的燃烧
$$
\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)} ,
$$
有$\Delta n_\mathrm{g} = 1 - 3 = -2$。每摩尔反应消失两摩尔气体，所以在$298.15\ \mathrm{K}$下
$$
\Delta n_\mathrm{g}\, RT = -2(8.314)(298.15)\times 10^{-3}\ \mathrm{kJ\,mol^{-1}} = -4.958\ \mathrm{kJ\,mol^{-1}}.
$$
约$-890\ \mathrm{kJ\,mol^{-1}}$的燃烧焓对应的热力学能变化要少负约$5\ \mathrm{kJ\,mol^{-1}}$。弹式量热的完整计算是本章末的一道习题；接下来介绍生成焓表的途径，$-890$通常就是这样得到的。

## 盖斯定律

许多焓无法按所写方程式直接测量。碳在有限的氧中燃烧生成$\mathrm{CO}$和$\mathrm{CO_2}$的混合物，所以一氧化碳的生成不是一个干净的量热反应。金刚石转变为石墨又太慢。解决办法在于$H$是状态函数，所以一条途径的焓只取决于其两端。

::: proposition 盖斯定律 {#prop-hess}
一个反应的标准焓变等于从相同反应物出发、到达相同产物的任何一系列反应的标准焓变之和。把某一步反转，其$\Delta H$变号。把某一步乘以一个因子，$\Delta H$也乘以该因子。这一定律之所以成立，是因为$H$是状态函数，而不是因为热有什么特殊性质。
:::

::: proof
设处于指定状态$R$的反应物变为处于指定状态$P$的产物。沿直接途径，$\Delta H = H_P - H_R$。沿途径$R \to I \to P$，
$$
\Delta H = (H_I - H_R) + (H_P - H_I) = H_P - H_R .
$$
中间态约去了。同样的约去适用于任意多步，所以同一对终态之间的每条途径都有相同的$\Delta H$。如果粗心，出问题的是“同一对终态”这个说法：相态、同素异形体和温度都是状态的一部分。液态水与气态水不能互换，石墨也不是金刚石。
:::

::: example 一氧化碳的生成焓 {#ex-co}
已知$298.15\ \mathrm{K}$下的近似教科书数据
$$
\begin{align*}
\mathrm{C(graphite)} + \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -393.5\ \mathrm{kJ\,mol^{-1}} , \\
\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -283.0\ \mathrm{kJ\,mol^{-1}}
\end{align*}
$$
求$\mathrm{C(graphite)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO(g)}$的$\Delta H^\circ$。
::: solution
目标反应是第一个反应减去第二个反应。减去一个反应就是加上它的逆反应：
$$
\Delta H^\circ = -393.5 - (-283.0) = -110.5\ \mathrm{kJ\,mol^{-1}}.
$$
一氧化碳的能量低于其单质，但不如二氧化碳低得多。这就是$\mathrm{CO}$能燃烧的原因，也是缺少空气的炉子会产生一种本身仍是燃料的有毒气体的原因。$-110.5\ \mathrm{kJ\,mol^{-1}}$就是$\mathrm{CO(g)}$的标准摩尔生成焓，下一节将给出其严格定义。对于所给数据，这一算术是准确的；两个输入都给到一位小数，结果也是。
:::
:::

::: history 从冰量热计到“焓”这个名称 {#hist-thermo}
拉瓦锡（Lavoisier）与拉普拉斯（Laplace）在 1783 年的《论热》（*Mémoire sur la chaleur*）中用冰量热计测量燃烧热，并论证分解反应的热等于相应生成反应的热而符号相反——这是盖斯定律的一个特例，早了半个世纪。盖斯（Germain Hess）于 1840 年在圣彼得堡根据一系列热化学测量提出了热量总和恒定的普遍定律。焦耳（James Joule）在 1840 年代的桨轮实验表明，一定量的功产生一定量的热，因此两者属于同一条守恒定律；第一定律就是这一证明，写作$\Delta U = q + w$。吉布斯（J. Willard Gibbs）在《论非均相物质的平衡》（*On the Equilibrium of Heterogeneous Substances*，1876–1878）中系统地使用了组合$U + pV$，称之为恒压热函数。卡末林·昂内斯（Heike Kamerlingh Onnes）于 1909 年为这个函数取名为焓。本章所用的数据表是冰量热计的后代，由吉布斯的状态函数组织起来。
:::

## 标准摩尔生成焓

一旦给每种化合物赋予一个数——由单质生成它的焓，盖斯定律就成了一台机器。

::: definition 标准摩尔生成焓 {#def-formation}
物质的**标准摩尔生成焓**$\Delta_\mathrm{f} H^\circ$是在所关心的温度下（表中几乎总是$298.15\ \mathrm{K}$）、标准压力$p^\circ = 1\ \mathrm{bar}$下，由处于标准状态的单质生成一摩尔该物质时的焓变。按定义，处于标准状态的单质$\Delta_\mathrm{f} H^\circ = 0$：碳取石墨而非金刚石；$\mathrm{O_2(g)}$和$\mathrm{H_2(g)}$；$\mathrm{Br_2(l)}$而非其蒸气；硫取正交硫，而非单斜硫，也非$\mathrm{S(g)}$。水合离子的生成焓由附加约定$\Delta_\mathrm{f} H^\circ(\mathrm{H^{+}, aq}) = 0$确定。
:::

本课使用的数值是$298.15\ \mathrm{K}$下的近似教科书值，单位为$\mathrm{kJ\,mol^{-1}}$，下面每道题都使用同一组数据：

| 物质 | $\Delta_\mathrm{f} H^\circ$ |
|---|---|
| $\mathrm{CO_2(g)}$ | $-393.5$ |
| $\mathrm{H_2O(l)}$ | $-285.8$ |
| $\mathrm{H_2O(g)}$ | $-241.8$ |
| $\mathrm{CH_4(g)}$ | $-74.8$ |
| $\mathrm{CO(g)}$ | $-110.5$ |

水的这一对数据是对“状态”概念的检验。汽化$\mathrm{H_2O(l)} \rightarrow \mathrm{H_2O(g)}$在$298.15\ \mathrm{K}$下有
$$
\Delta H^\circ = -241.8 - (-285.8) = +44.0\ \mathrm{kJ\,mol^{-1}}
$$
在每摩尔四十千焦的层面上，不注明相态而说“水的焓”毫无意义，而这个数比许多要求你信任的反应焓还大。一氧化碳这一项恰好是[[#ex-co]]的结果：$-393.5 - (-283.0) = -110.5$。这三个数是用三种方式写出的同一个事实，这正是状态函数所保证的。

::: proposition 由生成焓求反应焓 {#prop-from-formation}
对于用化学计量数$\nu_i$（产物为正，反应物为负）写出的反应，
$$
\Delta_\mathrm{r} H^\circ = \sum_i \nu_i\, \Delta_\mathrm{f} H^\circ(i) .
$$
等价地，对产物求$\nu\,\Delta_\mathrm{f} H^\circ$之和，再减去对反应物的同样的和。这一关系是把盖斯定律用于这样一条途径：先把反应物拆成单质，再由这些单质构建产物。处于标准状态的单质贡献为零，可以略去。
:::

::: example 甲烷的燃烧 {#ex-methane}
利用上表，求甲烷燃烧生成液态水的$\Delta_\mathrm{r} H^\circ$，以及$10.00\ \mathrm{g}$甲烷（$M = 16.04\ \mathrm{g\,mol^{-1}}$）如此燃烧时的焓变。
::: solution
$$
\begin{align*}
\Delta_\mathrm{r} H^\circ &= \Delta_\mathrm{f} H^\circ(\mathrm{CO_2}) + 2\,\Delta_\mathrm{f} H^\circ(\mathrm{H_2O, l}) - \Delta_\mathrm{f} H^\circ(\mathrm{CH_4}) \\
&= -393.5 + 2(-285.8) - (-74.8) \\
&= -393.5 - 571.6 + 74.8 = -890.3\ \mathrm{kJ\,mol^{-1}}.
\end{align*}
$$
甲烷的物质的量为$n = 10.00/16.04 = 0.6234\ \mathrm{mol}$，所以体系的焓变为
$$
\Delta H = (0.6234\ \mathrm{mol})(-890.3\ \mathrm{kJ\,mol^{-1}}) = -555.0\ \mathrm{kJ}.
$$
若燃烧在恒压下进行，环境得到$555.0\ \mathrm{kJ}$热。氧的生成焓为零，不出现在式中。如果生成的水是气态，两摩尔水中的每一摩尔贡献的将是$-241.8$而不是$-285.8$，$\Delta_\mathrm{r} H^\circ$将少负$2\times 44.0 = 88.0\ \mathrm{kJ\,mol^{-1}}$，即$-802.3\ \mathrm{kJ\,mol^{-1}}$。与回收液态水的冷凝器相比，把水蒸气送上烟囱的烟道浪费了这$88\ \mathrm{kJ}$。摩尔质量和$10.00\ \mathrm{g}$都支持四位有效数字，$-555.0$用足了这四位。
:::
:::

有两个温度容易混淆。表中的$298.15\ \mathrm{K}$是计算生成焓时的温度，而不是火焰的温度。火焰要热得多；这里算出的焓变是这样一个反应热：仿佛反应物在$298.15\ \mathrm{K}$下供给，产物在$298.15\ \mathrm{K}$下移出。把产物冷却回$298.15\ \mathrm{K}$也是$\Delta_\mathrm{r} H^\circ$的一部分。基尔霍夫定律在热容已知时把$\Delta_\mathrm{r} H$从一个温度校正到另一个温度，它是一道习题的内容；在几十开尔文的范围内，校正量是一两千焦，而不是几十千焦。

::: quiz
某反应$\Delta_\mathrm{r} H^\circ = -200\ \mathrm{kJ\,mol^{-1}}$，$\Delta n_\mathrm{g} = 0$。下列哪种说法正确？
- [x] 恒压下每摩尔反应$q_p = -200\ \mathrm{kJ}$，并且由于没有生成或消耗气体，$\Delta_\mathrm{r} U^\circ$几乎相同。
- [ ] 该反应在恒容下放出$200\ \mathrm{kJ}$热，在恒压下吸收$200\ \mathrm{kJ}$热。
- [ ] $\Delta_\mathrm{r} H^\circ$是储存在产物中的热，它与方程式中是否为每种物质注明相态无关。
- [ ] 焓变取决于反应是一步进行还是两步进行。
::: solution
由于$\Delta n_\mathrm{g} = 0$，[[#prop-hu]]给出$\Delta_\mathrm{r} H \approx \Delta_\mathrm{r} U$，且恒压下$q_p = \Delta H$。热并不储存在产物中：$\Delta H$是状态之间的差。盖斯定律说途径无关紧要。相态则是要紧的，这就是第三种说法错了两次的原因。
:::
:::

## 后续内容

焓是热的账本。它并不说明反应是否会发生。硝酸铵的溶解是吸热的，却是自发的；甲烷的燃烧是放热的，一旦点燃便自发进行；金刚石转变为石墨是放热的，却慢得无法测量。缺少的因素是熵，而组合$\Delta H - T\Delta S$就是[[general-chemistry-2/entropy-free-energy]]中的吉布斯自由能。同样的生成焓将在那里与熵并列出现，并在[[bonding-structure/ionic-bonding]]的玻恩-哈伯循环中再次出现：在那里，无法直接测量的晶格焓正是依据盖斯定律由一些可测量的步骤构建出来的。把$-890.3\ \mathrm{kJ\,mol^{-1}}$按燃料质量缩放的化学计量数，就是[[general-chemistry-1/stoichiometry]]中的物质的量之比。[[#prop-hu]]背后的$pV$功和理想气体定律属于[[general-chemistry-1/gases]]。

::: summary
- $\Delta U = q + w$，其中$w$是环境对体系所做的功。$U$是状态函数；$q$和$w$不是。
- $H = U + pV$；恒压且只做膨胀功时，$\Delta H = q_p$。恒容且不做功时，$\Delta U = q_V$。
- 对于理想气体反应，$\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT$。在$298.15\ \mathrm{K}$下，每生成一摩尔气体增加约$2.5\ \mathrm{kJ\,mol^{-1}}$。
- 咖啡杯量热计测量$q_p$；弹式量热计测量$q_V$。忽略容器的热容会低估$|q|$。
- 盖斯定律就是$H$与途径无关。反转一步则$\Delta H$变号；按比例放大一步则$\Delta H$按同一比例放大。相态是状态的一部分。
- 处于标准状态的单质$\Delta_\mathrm{f} H^\circ = 0$，$\Delta_\mathrm{r} H^\circ$是生成焓按化学计量数的加和。本课的数值是一套自洽的近似教科书数据。
- 按这套数据，液态水与气态水相差$44.0\ \mathrm{kJ\,mol^{-1}}$。没有注明相态的焓还不能算一个数。
:::

## 习题

::: exercise 绝热压缩中的符号 {level=1}
在一个绝热良好的气缸中用活塞压缩气体，气体温度升高。给出$q$、$w$和$\Delta U$的符号，并说明：如果去掉绝热层，并且压缩足够缓慢，使气体保持在室温，三者中哪一个会改变。
::: solution
气缸是绝热的，所以按绝热壁的定义$q = 0$。活塞压缩气体，所以环境对体系做功，$w > 0$。第一定律于是迫使$\Delta U = w > 0$，这就是温度升高的原因（对于理想气体，$U$只取决于$T$）。如果器壁导热且压缩是等温的，则对理想气体$\Delta U = 0$，$w$仍为正，因此$q = -w < 0$：压缩产生的热必须散发到房间里，否则气体就会变热。改变的是$q$的符号，$\Delta U$也随之改变。在两种安排中功都保持为正。
:::
:::

::: exercise 更小的咖啡杯 {level=1 check="-43.5"}
某反应在质量为$80.0\ \mathrm{g}$、比热容为$4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$的溶液中进行。温度升高$5.20\ \mathrm{K}$。反应进度为$0.0400\ \mathrm{mol}$，压力恒定，忽略量热计本身的热容。输入$\Delta H$，单位$\mathrm{kJ\,mol^{-1}}$。
::: solution
$$
q_\mathrm{sol} = (80.0)(4.184)(5.20) = 1.741\times 10^{3}\ \mathrm{J} = 1.741\ \mathrm{kJ},
$$
所以$q_\mathrm{rxn} = -1.741\ \mathrm{kJ}$，且
$$
\Delta H = \frac{-1.741\ \mathrm{kJ}}{0.0400\ \mathrm{mol}} = -43.5\ \mathrm{kJ\,mol^{-1}}.
$$
三位有效数字：$5.20$和$0.0400$都是三位，$80.0$不支持第四位。忽略杯子意味着真实的$|\Delta H|$略大一些。
:::
:::

::: exercise 由数据表求甲烷的燃烧焓 {level=1 check="-890.3"}
利用$\Delta_\mathrm{f} H^\circ(\mathrm{CO_2, g}) = -393.5$、$\Delta_\mathrm{f} H^\circ(\mathrm{H_2O, l}) = -285.8$和$\Delta_\mathrm{f} H^\circ(\mathrm{CH_4, g}) = -74.8\ \mathrm{kJ\,mol^{-1}}$，计算$\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$的$\Delta_\mathrm{r} H^\circ$。以$\mathrm{kJ\,mol^{-1}}$为单位输入数值。
::: solution
$$
\Delta_\mathrm{r} H^\circ = -393.5 + 2(-285.8) - (-74.8) = -890.3\ \mathrm{kJ\,mol^{-1}}.
$$
氧是处于标准状态的单质，没有贡献。这个数与[[#ex-methane]]相同；这道习题单独练习这一运算，因为此后每次查表都要重复它。
:::
:::

::: exercise 用差值求一氧化碳 {level=2 check="-110.5"}
只给出
$$
\begin{align*}
\mathrm{C(graphite)} + \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -393.5\ \mathrm{kJ\,mol^{-1}}, \\
\mathrm{CO(g)} + \tfrac12 \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -283.0\ \mathrm{kJ\,mol^{-1}}.
\end{align*}
$$
输入由石墨和氧生成一摩尔$\mathrm{CO(g)}$的$\Delta H^\circ$，单位$\mathrm{kJ\,mol^{-1}}$。
::: solution
$\mathrm{CO}$的生成是第一个反应减去第二个反应：
$$
\Delta H^\circ = -393.5 - (-283.0) = -110.5\ \mathrm{kJ\,mol^{-1}}.
$$
反转第二步使符号翻转，一旦凑出目标方程式，这就是盖斯定律的全部内容。结果就是本课所用教科书数据中的$\Delta_\mathrm{f} H^\circ(\mathrm{CO, g})$。
:::
:::

::: exercise 称量样品放出的热 {level=2 check="-555.0"}
甲烷燃烧生成$\mathrm{CO_2(g)}$和$\mathrm{H_2O(l)}$，$\Delta_\mathrm{r} H^\circ = -890.3\ \mathrm{kJ\,mol^{-1}}$。野营炉在恒压下燃烧$10.00\ \mathrm{g}$ $\mathrm{CH_4}$（$M = 16.04\ \mathrm{g\,mol^{-1}}$）。输入体系的焓变，单位$\mathrm{kJ}$。
::: solution
$$
n = \frac{10.00}{16.04} = 0.6234\ \mathrm{mol}, \qquad \Delta H = (0.6234)(-890.3) = -555.0\ \mathrm{kJ}.
$$
体系失去$555.0\ \mathrm{kJ}$；锅得到这些热，减去被风带走的部分。按物质的量缩放，就是把普通的化学计量应用于每摩尔的焓。
:::
:::

::: exercise 铝的比热容 {level=2 check="0.900"}
把一块$100.0\,^\circ\mathrm{C}$、质量$50.0\ \mathrm{g}$的铝投入$100.0\ \mathrm{g}$、$20.0\,^\circ\mathrm{C}$的水中。最终温度为$27.77\,^\circ\mathrm{C}$。取$c(\mathrm{H_2O}) = 4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$，忽略容器。输入铝的比热容，单位$\mathrm{J\,g^{-1}\,K^{-1}}$。
::: solution
水升温$7.77\ \mathrm{K}$，金属降温$72.23\ \mathrm{K}$。水获得的热等于金属失去的热：
$$
q_\mathrm{w} = (100.0)(4.184)(7.77) = 3.251\times 10^{3}\ \mathrm{J}.
$$
$$
c(\mathrm{Al}) = \frac{3.251\times 10^{3}\ \mathrm{J}}{(50.0\ \mathrm{g})(72.23\ \mathrm{K})} = 0.900\ \mathrm{J\,g^{-1}\,K^{-1}}.
$$
铝的比热容比水小好几倍，这就是一块质量不大的热金属无法把一烧杯水烧开的原因。温度$27.77\,^\circ\mathrm{C}$是特意选取的，使算术结果恰好为$0.900$；读数精确到$0.1\,^\circ\mathrm{C}$的实验室温度计不足以支持最后一位。
:::
:::

::: exercise 甲烷的弹式量热结果 {level=3 check="-890.2"}
在热容为$12.50\ \mathrm{kJ\,K^{-1}}$的弹式量热计中燃烧$0.802\ \mathrm{g}$甲烷（$M = 16.04\ \mathrm{g\,mol^{-1}}$）。温度升高$3.541\ \mathrm{K}$。反应为$\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$，热校正在$298.15\ \mathrm{K}$下进行，$R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$。输入$\Delta_\mathrm{c} H$，单位$\mathrm{kJ\,mol^{-1}}$。
::: solution
燃烧的物质的量为$0.802/16.04 = 0.05000\ \mathrm{mol}$。量热弹获得
$$
q_\mathrm{cal} = (12.50\ \mathrm{kJ\,K^{-1}})(3.541\ \mathrm{K}) = 44.2625\ \mathrm{kJ},
$$
所以反应的恒容热为$-44.2625\ \mathrm{kJ}$，且
$$
\Delta_\mathrm{c} U = \frac{-44.2625\ \mathrm{kJ}}{0.05000\ \mathrm{mol}} = -885.25\ \mathrm{kJ\,mol^{-1}},
$$
保留一位小数为$-885.3\ \mathrm{kJ\,mol^{-1}}$。这里$\Delta n_\mathrm{g} = 1 - 3 = -2$，且
$$
\Delta n_\mathrm{g}\, RT = -2(8.314)(298.15)\times 10^{-3} = -4.958\ \mathrm{kJ\,mol^{-1}}.
$$
于是由[[#prop-hu]]得$\Delta_\mathrm{c} H = -885.25 + (-4.958) = -890.2\ \mathrm{kJ\,mol^{-1}}$。[[#ex-methane]]中由生成焓表得到的值为$-890.3\ \mathrm{kJ\,mol^{-1}}$。两者在由$3.541\ \mathrm{K}$修约所决定的$0.1\ \mathrm{kJ\,mol^{-1}}$内一致。弹式量热计从不直接给出焓；$\Delta n_\mathrm{g}\, RT$这一步是测量的一部分，而不是当答案看起来“足够接近”时就可以跳过的校正。
:::
:::

::: exercise 由表中的焓求$\Delta U$ {level=3 check="-885.3"}
取$298.15\ \mathrm{K}$下甲烷燃烧生成液态水的$\Delta_\mathrm{r} H^\circ = -890.3\ \mathrm{kJ\,mol^{-1}}$。由[[#prop-hu]]推导$\Delta_\mathrm{r} U^\circ$并计算其值。输入$\Delta_\mathrm{r} U^\circ$，单位$\mathrm{kJ\,mol^{-1}}$。
::: solution
定义式$H = U + pV$限于恒温下的理想气体并略去凝聚相体积后，为$\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT$，所以
$$
\Delta_\mathrm{r} U^\circ = \Delta_\mathrm{r} H^\circ - \Delta n_\mathrm{g}\, RT.
$$
代入$\Delta n_\mathrm{g} = -2$和$RT = (8.314)(298.15) = 2.479\ \mathrm{kJ\,mol^{-1}}$，
$$
\Delta_\mathrm{r} U^\circ = -890.3 - (-2)(2.479) = -890.3 + 4.958 = -885.3\ \mathrm{kJ\,mol^{-1}}.
$$
焓是两者中更负的那个，因为三摩尔气体变为一摩尔时环境对体系做功：这份输入的功是$\Delta U$的一部分，却不是恒压热的一部分。这与弹式量热习题测得的$-885.3\ \mathrm{kJ\,mol^{-1}}$相同。
:::
:::

::: exercise 生成水的基尔霍夫校正 {level=3 check="-284.2"}
对于$\mathrm{H_2(g)} + \tfrac12\mathrm{O_2(g)} \rightarrow \mathrm{H_2O(l)}$，$\Delta_\mathrm{r} H^\circ(298.15\ \mathrm{K}) = -285.8\ \mathrm{kJ\,mol^{-1}}$。取近似恒定的摩尔热容$C_{p,\mathrm{m}}(\mathrm{H_2}) = 28.8$、$C_{p,\mathrm{m}}(\mathrm{O_2}) = 29.4$和$C_{p,\mathrm{m}}(\mathrm{H_2O, l}) = 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$。估算$348.15\ \mathrm{K}$下的$\Delta_\mathrm{r} H^\circ$。以$\mathrm{kJ\,mol^{-1}}$为单位输入。
::: hint
若$\Delta_\mathrm{r} C_p$为常数，则$\Delta_\mathrm{r} H(T_2) = \Delta_\mathrm{r} H(T_1) + \Delta_\mathrm{r} C_p\,(T_2 - T_1)$。用与$\Delta_\mathrm{r} H$相同的化学计量符号构建$\Delta_\mathrm{r} C_p$。
:::
::: solution
$$
\Delta_\mathrm{r} C_p = 75.3 - 28.8 - \tfrac12(29.4) = 75.3 - 28.8 - 14.7 = 31.8\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
在$\Delta T = 50.00\ \mathrm{K}$范围内，
$$
\Delta_\mathrm{r} C_p\,\Delta T = (31.8\times 10^{-3})(50.00) = 1.59\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r} H^\circ(348.15\ \mathrm{K}) = -285.8 + 1.59 = -284.2\ \mathrm{kJ\,mol^{-1}}.
$$
这一校正是真实的，在这个区间内也很小：产物与反应物的热容大部分相互抵消，剩下的部分在五十度范围内使$286\ \mathrm{kJ}$的焓改变约百分之零点五。这就是$298.15\ \mathrm{K}$的数据表在邻近温度下仍可使用的原因；也是当某种反应物在区间内发生相变时这一近似失效的原因——此时$C_p$甚至不再近似恒定，相变焓必须手工加入。
:::
:::
