给瘪了的轮胎打气，气筒的筒壁会在手里很快热起来——这主要不是摩擦造成的，而是因为你压缩空气的速度太快，热来不及跑掉。让压缩空气从阀门里放出来，情况正相反：金属变冷，沾了水汽的阀门甚至可能冻住关死。这两个现象是同一套物理，而且都由每种物质的同一个数支配：它的热容。一度温度要花多少能量，决定了反应瓶会热到什么程度、膨胀的气体会冷到什么程度、节流的气体是降温还是升温，也决定了一个反应在 $1000\ \mathrm{K}$ 与 $298\ \mathrm{K}$ 放出的热相差多少。

本章把[[thermodynamics/first-law|上一章建立的热力学第一定律]]变成趁手的工具。三个观念撑起整章。第一，焓 $H = U + pV$ 是恒压变化的热，而热容是告诉我们 $U$ 与 $H$ 如何随温度移动的导数。第二，由于反应物与产物的热容不同，反应焓会随温度移动——基尔霍夫定律。第三，当完全没有热流动时，温度的变化就变成力学的：膨胀本身付出能量，这笔记账给出绝热线、热机的功，以及把空气液化的焦耳-汤姆孙效应。[[general-chemistry-1/thermochemistry|热化学]]的普通化学课程给了词汇；在这里它变成定量的。

## 焓：恒压的热

大多数化学是在敞口容器里、在大气压下做的，不是在刚性钢弹里。在那样的条件下，体系反应时会膨胀或收缩，把世界推开或任它推回来，测得的热不是 $\Delta U$。合适的状态函数早已藏在第一定律里。

::: definition 焓 {#def-enthalpy}
体系的**焓**为
$$
H \equiv U + pV .
$$
因为 $U$、$p$、$V$ 都是状态函数，$H$ 也是。对只做膨胀功的封闭体系，在恒定外压下，
$$
\Delta H = q_\mathrm{p} :
$$
恒压过程的焓变等于吸收的热。
:::

::: proof
恒压且只有 $pV$ 功时，第一定律给出 $\Delta U = q_\mathrm{p} - p\,\Delta V$。移项并在两边加上 $p\,\Delta V$，
$$
q_\mathrm{p} = \Delta U + p\,\Delta V = \Delta U + \Delta(pV) = \Delta(U + pV) = \Delta H ,
$$
中间一步用了恒压。焓的定义不只是记号上的花招：$H$ 是这样一个能量——假如体系不得不随身携带的 $pV$（顶着大气保持自身体积的能量）被算作储存能量的一部分，体系拥有的就是它。它确实被算进去了，这正是咖啡杯量热计测 $\Delta H$ 而氧弹量热计测 $\Delta U$ 的原因。
:::

反应改变体积主要靠其中的气体，而理想气体在恒温下 $pV = nRT$。于是两个量热学量之差总可以算出来。

::: proposition $\Delta_\mathrm{r}H$ 与 $\Delta_\mathrm{r}U$ 的关系 {#prop-dh-du}
对温度 $T$ 下的反应，
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + \Delta(pV) ,
$$
其中 $\Delta(pV)$ 按所写反应方程式求值。把所有气体当作理想气体并忽略液体与固体的摩尔体积，
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas} ,
$$
$\Delta n_\mathrm{gas}$ 为每摩尔反应生成的气体摩尔数减去消耗的气体摩尔数。
:::

::: proof
对每种物质都有 $H - U = pV$，所以 $\Delta_\mathrm{r}H - \Delta_\mathrm{r}U = \Delta(pV)$ 对产物减反应物求和。常压下凝聚相的 $pV_\mathrm{m} \approx 10^{-2}\ \mathrm{kJ\,mol^{-1}}$，与反应能量相比可以忽略；理想气体则 $pV_\mathrm{m} = RT$。因此只有气态物种有贡献，每摩尔各带 $RT$，总和就是 $RT\,\Delta n_\mathrm{gas}$。
:::

::: example 甲烷的燃烧：$\Delta_\mathrm{c}H$ 对 $\Delta_\mathrm{c}U$ {#ex-methane-du}
$298.15\ \mathrm{K}$ 下标准燃烧 $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$ 的 $\Delta_\mathrm{c}H^\circ = -890.4\ \mathrm{kJ\,mol^{-1}}$（CRC/NIST-JANAF 数值）。求 $\Delta_\mathrm{c}U^\circ$，并说明差额去了哪里。
::: solution
三摩尔气体消失（消耗 $1 + 2$，生成 $1$），故 $\Delta n_\mathrm{gas} = -2$，
$$
\Delta_\mathrm{c}U^\circ = \Delta_\mathrm{c}H^\circ - RT\,\Delta n_\mathrm{gas}
= -890.4 + 2 \times \frac{8.314 \times 298.15}{1000}\ \mathrm{kJ\,mol^{-1}}
= -890.4 + 4.96 = -885.4\ \mathrm{kJ\,mol^{-1}} .
$$
内能的下降比焓*少*，因为产物占的体积比反应物小：大气向内压拢，对体系做 $+4.96\ \mathrm{kJ\,mol^{-1}}$ 的功，这份能量抵掉了以热损失的那部分能量的一部分。若水以蒸气离开，则 $\Delta n_\mathrm{gas} = 0$，两个量相等（对气态水 $\Delta_\mathrm{c}H^\circ = -802.3\ \mathrm{kJ\,mol^{-1}}$）。务必标明聚集状态：它同时改变这两个数。
:::
:::

## 热容：一度温度的代价

::: definition 热容、$C_V$ 与 $C_p$ {#def-heat-capacity}
物体的**热容** $C$ 是把它的温度升高一开尔文所需的热，$C = \lim_{\Delta T \to 0} \delta q/\Delta T$；它取决于路径，因为热是路径函数。有两条路径重要到各得一个名字和一个下标：
$$
C_V \equiv \left(\frac{\partial U}{\partial T}\right)_V , \qquad
C_p \equiv \left(\frac{\partial H}{\partial T}\right)_p ,
$$
即**定容热容**与**定压热容**；摩尔值记作 $C_{V,\mathrm{m}}$ 与 $C_{p,\mathrm{m}}$，单位为 $\mathrm{J\,K^{-1}\,mol^{-1}}$。这两个等式由恒容下的 $\mathrm{d}U = \delta q - p\,\mathrm{d}V$ 与恒压下的 $\mathrm{d}H = \delta q + V\,\mathrm{d}p$ 立即可得。热容本身随温度变化；数据表（NIST-JANAF、CRC）若无特别说明均在 $298.15\ \mathrm{K}$ 给出。
:::

$298.15\ \mathrm{K}$ 的一些代表值（取自 NIST-JANAF）：氩的 $C_{p,\mathrm{m}} = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$\mathrm{N_2}$ 为 $29.12$，$\mathrm{O_2}$ 为 $29.38$，$\mathrm{H_2}$ 为 $28.84$，$\mathrm{CO_2}$ 为 $37.13$，水蒸气为 $33.58$，液态水为 $75.3$，铜为 $24.44$。有两个规律很醒目。一切气体都落在 $3R$ 或 $\tfrac{5}{2}R$ 附近——即均分值，经典统计力学给每个二次能量项分配 $\tfrac{1}{2}R$：三个平动项给一切气体的 $C_{V,\mathrm{m}}$ 贡献 $\tfrac{3}{2}R$，再加两个转动项给双原子分子 $\tfrac{5}{2}R$，而振动项只在高温才启动，因为其能级间距在室温下超过 $k_\mathrm{B}T$（[[statistical-thermodynamics/boltzmann-distribution]]、[[statistical-thermodynamics/partition-function]]）。另一个规律是：凝聚相遵循自己的规则——铜的 $24.44$ 基本上就是固体在高温下趋近的杜隆-珀蒂值 $3R$，而液态水的 $75.3$ 大得反常，因为加热它还要拉伸并破坏氢键——这就是水成为极有效冷却剂的原因（[[general-chemistry-2/liquids-solutions]]）。

::: proposition 迈耶关系 {#prop-mayer}
对固定量的**理想气体**，无论什么路径，
$$
C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R , \qquad \gamma \equiv \frac{C_{p,\mathrm{m}}}{C_{V,\mathrm{m}}} > 1 .
$$
单原子理想气体 $C_{V,\mathrm{m}} = \tfrac{3}{2}R$、$C_{p,\mathrm{m}} = \tfrac{5}{2}R$、$\gamma = 5/3$；振动冻结的双原子气体 $C_{V,\mathrm{m}} = \tfrac{5}{2}R$、$C_{p,\mathrm{m}} = \tfrac{7}{2}R$、$\gamma = 7/5$。
:::

::: proof
理想气体 $H_\mathrm{m} = U_\mathrm{m} + pV_\mathrm{m} = U_\mathrm{m} + RT$。焦耳定律 $(\partial U/\partial V)_T = 0$ 说 $U_\mathrm{m}$ 只依赖温度，所以对 $T$ 求导得 $\mathrm{d}H_\mathrm{m}/\mathrm{d}T = \mathrm{d}U_\mathrm{m}/\mathrm{d}T + R$。而对理想气体，沿*任何*路径都有 $C_{p,\mathrm{m}} = \mathrm{d}H_\mathrm{m}/\mathrm{d}T$、$C_{V,\mathrm{m}} = \mathrm{d}U_\mathrm{m}/\mathrm{d}T$，因为 $H$ 与 $U$ 只是 $T$ 的函数。故 $C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R$。这个关系是尤利乌斯·罗伯特·迈耶（Mayer）于 1842 年从气体的比热推出来的，当时第一定律尚未被普遍接受——这是史上最了不起的热力学记账之一。
:::

迈耶关系是理想气体的结果。对真实物质，$C_p$ 与 $C_V$ 之差是一个漂亮的一般公式，它表明 $C_p$ 为什么*总是*更大。

::: proposition $C_p$ 与 $C_V$ 的一般关系 {#prop-cp-cv-general}
对处于平衡的任何封闭简单体系，
$$
C_p - C_V = T V \frac{\alpha^2}{\kappa_T} ,
$$
其中 $\alpha = (1/V)(\partial V/\partial T)_p$ 为热膨胀系数，$\kappa_T = -(1/V)(\partial V/\partial p)_T$ 为等温压缩系数。对任何稳定物质，右端各因子都非负（$\kappa_T > 0$ 即力学稳定性），故恒有 $C_p \ge C_V$，仅当 $\alpha = 0$ 时取等号——比如水在 $4\,^\circ\mathrm{C}$ 附近，那里它达到密度极大。
:::

::: proof
写出 $C_p - C_V = (\partial H/\partial T)_p - (\partial U/\partial T)_V$，并把 $(\partial H/\partial T)_p = (\partial U/\partial T)_p + p(\partial V/\partial T)_p$ 展开，因为恒压下 $H = U + pV$。导数 $(\partial U/\partial T)_p$ 与 $(\partial U/\partial T)_V$ 不同，因为恒压加热同时改变体积，而 $U$ 通过分子间力对体积作出响应：$(\partial U/\partial T)_p = (\partial U/\partial T)_V + (\partial U/\partial V)_T (\partial V/\partial T)_p$。于是
$$
C_p - C_V = \left[\left(\frac{\partial U}{\partial V}\right)_T + p\right]\left(\frac{\partial V}{\partial T}\right)_p .
$$
能量-压强关系 $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$（[[thermodynamics/first-law]] 中麦克斯韦关系的一道练习）把 $p$ 消掉，留下 $C_p - C_V = T(\partial p/\partial T)_V (\partial V/\partial T)_p$。最后 $(\partial V/\partial T)_p = V\alpha$，而循环关系把 $(\partial p/\partial T)_V$ 变成 $\alpha/\kappa_T$，即得结果。对理想气体 $\alpha = 1/T$、$\kappa_T = 1/p$，故 $TV\alpha^2/\kappa_T = pV/T = nR$：迈耶关系是一般公式的理想气体投影。
:::

对凝聚相，这个差很小：取 $\alpha = 49.2\times10^{-6}\ \mathrm{K^{-1}}$、$\kappa_T = 7.3\times10^{-7}\ \mathrm{bar^{-1}}$、$V_\mathrm{m} = 7.11\ \mathrm{cm^3\,mol^{-1}}$，铜在 $298\ \mathrm{K}$ 给出 $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = 0.70\ \mathrm{J\,K^{-1}\,mol^{-1}}$，液态水约 $0.5$——而气体是 $R = 8.314$。液体和固体几乎不能膨胀，所以恒压加热它们几乎不多花功；气体则为此花掉整整一摩尔 $R$。

::: example 恒压与恒容下加热氮气 {#ex-n2-heating}
$2.00\ \mathrm{mol}$ 的 $\mathrm{N_2}$ 从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$，(a) 在刚性容器中；(b) 在无摩擦活塞下恒压进行。取 $C_{p,\mathrm{m}} = 29.1$、$C_{V,\mathrm{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$。求两条路径的 $q$、$\Delta U$ 与 $\Delta H$。
::: solution
**(a) 恒容。** $q = \Delta U = nC_{V,\mathrm{m}}\Delta T = 2.00 \times 20.8 \times 100 = 4.16\ \mathrm{kJ}$，且 $w = 0$。$\Delta H = \Delta U + \Delta(pV) = \Delta U + nR\,\Delta T = 4.16 + 1.66 = 5.82\ \mathrm{kJ}$——尽管没有在恒压下加热的过程，焓的改变却与 (b) *相同*，因为 $H$ 是状态函数，两条路径都终于 $400\ \mathrm{K}$。

**(b) 恒压。** $q = \Delta H = nC_{p,\mathrm{m}}\Delta T = 2.00 \times 29.1 \times 100 = 5.82\ \mathrm{kJ}$，而 $\Delta U = q + w = 5.82 - 1.66 = 4.16\ \mathrm{kJ}$，与 (a) 的 $\Delta U$ 相同——气体是理想的，两条路径都终于 $400\ \mathrm{K}$。(b) 中多出的 $1.66\ \mathrm{kJ}$ 热恰好是气体顶起活塞花掉的膨胀功 $nR\,\Delta T = 2.00 \times 8.314 \times 100 = 1.66\ \mathrm{kJ}$。迈耶关系，现金付清。
:::
:::

::: quiz
一摩尔理想气体从 $300\ \mathrm{K}$ 加热到 $330\ \mathrm{K}$，一次恒容，一次恒压。恒压那次比恒容那次多吸收的热是
- [x] $R\,\Delta T \approx 250\ \mathrm{J}$，即气体做的膨胀功 $p\,\Delta V = nR\,\Delta T$。
- [ ] 零，因为两次的 $\Delta T$ 相同。
- [ ] 负的，因为 $C_{V,\mathrm{m}} > C_{p,\mathrm{m}}$。
- [ ] 等于 $C_{p,\mathrm{m}}\Delta T$，即恒压那次吸收的全部热。
::: solution
恒容那次吸热 $C_{V,\mathrm{m}}\Delta T$，恒压那次吸热 $C_{p,\mathrm{m}}\Delta T$；差为 $(C_{p,\mathrm{m}} - C_{V,\mathrm{m}})\Delta T = R\,\Delta T = 8.314 \times 30 = 249\ \mathrm{J}$。物理上，两次把 $U$ 抬高同样多（理想气体，同样的 $\Delta T$），而恒压那次还必须额外提供膨胀功。
:::
:::

## 基尔霍夫定律：反应焓随温度移动

数据表的反应焓都在 $298.15\ \mathrm{K}$，但熔炉、发动机和催化转化器都在高温下运行。修正并不神秘：就是反应物与产物热容之差。

::: proposition 基尔霍夫定律 {#prop-kirchhoff}
对固定标准态下的反应，
$$
\frac{\mathrm{d}\,\Delta_\mathrm{r}H^\circ}{\mathrm{d}T} = \Delta_\mathrm{r}C_p^\circ , \qquad
\Delta_\mathrm{r}C_p^\circ = \sum_\text{products} \nu_i C_{p,\mathrm{m},i} - \sum_\text{reactants} \nu_i C_{p,\mathrm{m},i} ,
$$
因而在 $\Delta_\mathrm{r}C_p^\circ$ 大致恒定的区间内，
$$
\Delta_\mathrm{r}H^\circ(T_2) = \Delta_\mathrm{r}H^\circ(T_1) + \Delta_\mathrm{r}C_p^\circ\,(T_2 - T_1) .
$$
:::

::: proof
$\Delta_\mathrm{r}H^\circ(T) = \sum_i \nu_i H_{\mathrm{m},i}^\circ(T)$ 是状态函数之和，所以逐项求导：$\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \sum_i \nu_i\, \mathrm{d}H_{\mathrm{m},i}^\circ/\mathrm{d}T = \sum_i \nu_i C_{p,\mathrm{m},i}^\circ$，这正是 $\Delta_\mathrm{r}C_p^\circ$ 的定义。积分即得移动量。图像是：把反应物从 $T_1$ 加热到 $T_2$，在 $T_2$ 反应，再把产物冷回 $T_1$；"把反应物加热上去"与"把产物冷却下来"之间的能量不平衡恰好是 $\Delta_\mathrm{r}C_p^\circ(T_2 - T_1)$。
:::

::: example 一氧化碳在 $500\ \mathrm{K}$ 的燃烧 {#ex-kirchhoff-co}
对 $\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$，$\Delta_\mathrm{r}H^\circ(298.15\ \mathrm{K}) = -283.0\ \mathrm{kJ\,mol^{-1}}$（由 $\Delta_\mathrm{f}H^\circ$：$-393.5 + 110.5$）。用 $C_{p,\mathrm{m}}$ 值 $37.13$（$\mathrm{CO_2}$）、$29.14$（$\mathrm{CO}$）、$29.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$（$\mathrm{O_2}$；NIST-JANAF，$298.15\ \mathrm{K}$），估算 $500\ \mathrm{K}$ 的 $\Delta_\mathrm{r}H^\circ$。
::: solution
$$
\Delta_\mathrm{r}C_p^\circ = 37.13 - 29.14 - \tfrac{1}{2}(29.38) = -6.70\ \mathrm{J\,K^{-1}\,mol^{-1}} ,
$$
$$
\Delta_\mathrm{r}H^\circ(500) = -283.0 + \frac{(-6.70)(500 - 298.15)}{1000}
= -283.0 - 1.35 = -284.4\ \mathrm{kJ\,mol^{-1}} .
$$
产物二氧化碳的热容比反应物大，所以加热它比加热它的来处更贵，反应在 $500\ \mathrm{K}$ 比在 $298\ \mathrm{K}$ 多放出*一点*热。若改用每个 $C_{p,\mathrm{m}}$ 的温度依赖（NIST-JANAF 数据表）而不取常数，得 $-284.1\ \mathrm{kJ\,mol^{-1}}$——$\Delta_\mathrm{r}C_p$ 取常数的捷径在几百开尔文内准确到千分之几，只在有参与者发生相变处失效，那里热容实际上发生跳跃。
:::
:::

::: widget plot
f: -283 + dCp*(x-298.15)/1000
x: 200, 800
y: -300, -260
sliders: dCp=-7:-60:60:1
labels: \Delta_r H^\circ \text{ / } \mathrm{kJ\,mol^{-1}}
vlines: 500
caption: 一行画出的基尔霍夫定律：例题中一氧化碳燃烧的 $\Delta_r H^\circ(T) = \Delta_r H^\circ(298.15\ \mathrm{K}) + \Delta_r C_p^\circ (T - 298.15)$，$\Delta_r C_p^\circ$ 由滑块设定（单位 $\mathrm{J\,K^{-1}\,mol^{-1}}$）。斜率*就是*热容差：正的 $\Delta_r C_p$ 使放热反应随温度升高放热变少，负的则放热变多。把 $\Delta_r C_p$ 滑到大的正值，看直线穿过零——一个反应可以在室温与火焰温度之间改变放热的符号。
:::

## 可逆绝热膨胀

::: definition 绝热过程 {#def-adiabatic}
若没有热穿过器壁，过程称为**绝热**的，$q = 0$；此时第一定律坍缩为 $\Delta U = w$。绝热*不*意味着等温：没有热可用，体系做的任何功都必须从自身能量里出，于是温度的变化变成力学的。过程绝热或者因为隔热，或者因为快——气筒里的压缩、发动机气缸里废气的膨胀、大气中空气团的上升（它按干绝热直减率降温，原因正是下面推导的那条）——都近似绝热，因为它们发生得比热流动更快。
:::

::: proposition 理想气体的可逆绝热线 {#prop-adiabat}
对固定量、热容恒定的理想气体的可逆绝热膨胀或压缩，
$$
pV^{\gamma} = \text{const}, \qquad
TV^{\gamma-1} = \text{const}, \qquad
p^{1-\gamma}T^{\gamma} = \text{const},
$$
其中 $\gamma = C_{p,\mathrm{m}}/C_{V,\mathrm{m}}$，且功为
$$
w = \Delta U = nC_{V,\mathrm{m}}\,(T_\mathrm{f} - T_\mathrm{i}) .
$$
:::

::: proof
可逆变化有 $\delta w = -p\,\mathrm{d}V$，绝热时 $\mathrm{d}U = -p\,\mathrm{d}V$。理想气体沿任何路径都有 $\mathrm{d}U = nC_{V,\mathrm{m}}\,\mathrm{d}T$，故
$$
nC_{V,\mathrm{m}}\,\mathrm{d}T = -\frac{nRT}{V}\,\mathrm{d}V
\quad\Longrightarrow\quad
C_{V,\mathrm{m}}\frac{\mathrm{d}T}{T} = -R\,\frac{\mathrm{d}V}{V}.
$$
从初态积分到末态，把 $C_{V,\mathrm{m}}$ 当常数，并用 $R = C_{p,\mathrm{m}} - C_{V,\mathrm{m}}$：$\ln(T_\mathrm{f}/T_\mathrm{i}) = -(R/C_{V,\mathrm{m}})\ln(V_\mathrm{f}/V_\mathrm{i}) = (1-\gamma)\ln(V_\mathrm{f}/V_\mathrm{i})$，即 $TV^{\gamma-1} = \text{const}$。把 $T$ 换成 $pV/nR$ 得 $pV^\gamma = \text{const}$，消去 $V$ 得 $p^{1-\gamma}T^\gamma = \text{const}$。功由 $q = 0$ 时的 $\Delta U = q + w$ 立得。
:::

因为 $\gamma > 1$，绝热线 $pV^\gamma = \text{const}$ 在 $pV$ 图上比等温线 $pV = \text{const}$ 降得更陡：绝热膨胀既做功又丢温度，所以压强塌得更快。其后果就是每份考卷都要问的那个比较。

::: example 双原子气体的可逆绝热膨胀 {#ex-adiabatic-expansion}
一摩尔理想双原子气体（$C_{V,\mathrm{m}} = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$\gamma = 7/5$）在 $300\ \mathrm{K}$、$V_\mathrm{i} = 10.0\ \mathrm{L}$ 下可逆绝热膨胀到 $V_\mathrm{f} = 20.0\ \mathrm{L}$。求 $T_\mathrm{f}$、$p_\mathrm{f}$ 与 $w$，并与同两体积间的可逆*等温*膨胀比较。
::: solution
$$
T_\mathrm{f} = 300 \times \left(\frac{10.0}{20.0}\right)^{2/7} = 300 \times 0.7579 = 227.4\ \mathrm{K},
$$
$$
p_\mathrm{f} = \frac{nRT_\mathrm{f}}{V_\mathrm{f}} = \frac{8.314 \times 227.4}{20.0\ \mathrm{L}} = 94.6\ \mathrm{kPa} = 0.946\ \mathrm{bar},
$$
而等温膨胀到同一体积是 $1.25\ \mathrm{bar}$——绝热线更陡，如图所示。功为
$$
w = \Delta U = 20.79 \times (227.4 - 300)\ \mathrm{J} = -1.51\ \mathrm{kJ},
$$
大小上小于等温的 $-nRT\ln 2 = -1.73\ \mathrm{kJ}$：冷却的气体推不动像被热浴保持在 $300\ \mathrm{K}$ 的气体那样猛。那 $1.51\ \mathrm{kJ}$ 的每一焦耳都来自气体自身的内能——这就是雷暴中上升的空气团、离开汽轮机的蒸汽、你气筒筒壁里的气体，在既无加热也无冷却时温度都改变的原因。
:::
:::

::: widget plot
f: 24.94/x ; 24.94*10^g/x^g
x: 2, 22
y: 0, 14
sliders: g=1.4:1.1:1.7:0.05
labels: \text{等温线 } pV = \text{常数}; \text{绝热线 } pV^{\gamma} = \text{常数}
caption: 一摩尔理想气体在 $300\ \mathrm{K}$ 从 $10.0\ \mathrm{L}$ 出发的 $pV$ 图：等温线（平缓）与过同一点的可逆绝热线（陡峭），$\gamma$ 由滑块设定。把 $\gamma$ 滑大，绝热线掉得更快——绝热线越陡，意味着气体每膨胀一份冷却越多，因为它更多的热容被锁在 $pV$ 项里。每条曲线在两个体积之间围下的面积是该路径的功；膨胀时绝热线围的面积总是更小，因为它一路下落。
:::

::: widget plot
f: 300*10^(g-1)/x^(g-1)
x: 2, 22
y: 100, 320
sliders: g=1.4:1.1:1.7:0.05
labels: T \text{ / K}
caption: 一摩尔理想气体从 $10.0\ \mathrm{L}$、$300\ \mathrm{K}$ 可逆绝热膨胀的温度随体积变化：$T = T_\mathrm{i}(V_\mathrm{i}/V)^{\gamma-1}$，$\gamma$ 在滑块上。$\gamma = 7/5$、体积加倍时气体落到 $227\ \mathrm{K}$，如例题所示；单原子气体（$\gamma = 5/3$，指数 $2/3$）冷得更狠，到 $189\ \mathrm{K}$，因为同样的膨胀功从更小的热容里扣除；而 $\gamma \to 1$ 的极限就是等温线 $T = 300\ \mathrm{K}$——完全不冷。
:::

::: warning $pV^\gamma = \text{const}$ 不是绝热过程的普遍规律 {#warn-adiabat}
三条绝热线方程只对热容恒定的**固定量理想气体**的**可逆**绝热变化成立。三种失效要分清：(i) 向真空的**自由膨胀**绝热且不做功，故 $\Delta U = 0$，理想气体的温度分毫不变——$pV^\gamma$ 会给出别的预言，但它根本不适用；(ii) **不可逆**绝热膨胀在相同的终压之间会到达*不同的、更热的*终态（下一个例题）；(iii) 对真实气体和大温度区间，$\gamma$ 本身随温度移动。方程只在推导它们的条件内使用，其余一切场合用第一定律 $\Delta U = w$。
:::

## 不可逆绝热变化：不讲究的气体

对抗恒定外压的不可逆绝热膨胀仍服从 $\Delta U = w$，但 $pV^\gamma$ 不再描述路径。终态要直接解第一定律：由 $w = -p_\mathrm{ex}(V_\mathrm{f} - V_\mathrm{i})$ 与 $V_\mathrm{f} = nRT_\mathrm{f}/p_\mathrm{ex}$，一摩尔理想气体满足
$$
C_{V,\mathrm{m}}(T_\mathrm{f} - T_\mathrm{i}) = -R T_\mathrm{f} + R T_\mathrm{i}\,\frac{p_\mathrm{ex}}{p_\mathrm{i}} ,
$$
这是关于 $T_\mathrm{f}$ 的线性方程——不见任何指数。

::: example 不可逆与可逆绝热膨胀 {#ex-irreversible-adiabatic}
一摩尔理想双原子气体（$C_{V,\mathrm{m}} = \tfrac{5}{2}R$）在 $300\ \mathrm{K}$、$10.0\ \mathrm{bar}$ 下绝热膨胀，对抗恒定 $p_\mathrm{ex} = 1.00\ \mathrm{bar}$ 直到停止。求 $T_\mathrm{f}$ 与 $w$，并与膨胀到同一终压的可逆绝热膨胀比较。
::: solution
初始体积 $V_\mathrm{i} = RT_\mathrm{i}/p_\mathrm{i} = 2.494\ \mathrm{L}$。由 $p_\mathrm{ex}V_\mathrm{f} = RT_\mathrm{f}$（以 $\mathrm{L\,bar}$ 计：$R = 0.08314$），
$$
20.79\,(T_\mathrm{f} - 300) = -\left(8.314\,T_\mathrm{f} - 249.4\right)
\quad\Longrightarrow\quad
29.10\,T_\mathrm{f} = 6485
\quad\Longrightarrow\quad
T_\mathrm{f} = 222.9\ \mathrm{K},
$$
故 $w = \Delta U = 20.79 \times (222.9 - 300) = -1.60\ \mathrm{kJ}$。可逆膨胀到 $1.00\ \mathrm{bar}$ 到达 $T_\mathrm{f} = 300 \times (1.00/10.0)^{2/7} = 155.4\ \mathrm{K}$，做 $w = -3.01\ \mathrm{kJ}$——功几乎多一倍，终温低 $67\ \mathrm{K}$。不可逆的气体把做功潜力的一部分仅仅花在*跟自己湍流搏斗*上：被不可逆性毁掉的功以内能的形式回到气体里，使气体保持较热。同一个第一定律，同一个终压，终温却大不同——路径函数与状态函数，又一次，在一次计算里。
:::
:::

::: quiz
一摩尔理想气体从同一初态绝热膨胀到同一终压 $p_\mathrm{ex}$，一次可逆，一次对抗恒定的 $p_\mathrm{ex}$。哪一次终温更高，为什么？
- [x] 不可逆那次：被不可逆性毁掉的功以内能形式留在气体里。
- [ ] 可逆那次：它做的功更多，而功给气体加热。
- [ ] 两次终温相同：绝热由 $pV^\gamma$ 定出 $T_\mathrm{f}$。
- [ ] 不知道 $\gamma$ 就无法判断。
::: solution
两次都有 $w = \Delta U = C_V\Delta T < 0$，但可逆路径做*更多*的功（$|w|$ 更大），损失更多内能，终温更低。$pV^\gamma$ 只适用于可逆那次——第三个选项正是上面警告设下的陷阱。$\gamma$ 决定数值，不决定次序。
:::
:::

## 节流：焦耳-汤姆孙效应

还有一种不靠热也不靠有用功改变气体温度的办法：把气体强行推过多孔塞或半开的阀门，从高压侧到低压侧，整套装置隔热。这叫**节流**，它既不是自由膨胀也不是热机——它有自己的名字和自己的系数。

::: proposition 节流是等焓的 {#prop-throttling}
当流体以恒定流量流过一个绝热的限流件，动能与势能变化可忽略时，焓不变：$H_\mathrm{f} = H_\mathrm{i}$，即两侧的 $H_\mathrm{m}$ 相等。
:::

::: proof
把一摩尔流体推入压强 $p_\mathrm{i}$ 的上游：上游流体对它做 $+p_\mathrm{i}V_\mathrm{m,i}$ 的功。把一摩尔流体推入下游对抗 $p_\mathrm{f}$：流体做 $p_\mathrm{f}V_\mathrm{m,f}$ 的功，即对流体流做的功为 $w = p_\mathrm{i}V_\mathrm{m,i} - p_\mathrm{f}V_\mathrm{m,f}$。由 $q = 0$，这一摩尔的第一定律给出 $U_\mathrm{m,f} - U_\mathrm{m,i} = p_\mathrm{i}V_\mathrm{m,i} - p_\mathrm{f}V_\mathrm{m,f}$，整理得 $U_\mathrm{m,f} + p_\mathrm{f}V_\mathrm{m,f} = U_\mathrm{m,i} + p_\mathrm{i}V_\mathrm{m,i}$——即 $H_\mathrm{m,f} = H_\mathrm{m,i}$。节流是焓的天然主场：$pV$ 项正是推入与推出的功。
:::

::: definition 焦耳-汤姆孙系数 {#def-jt-coefficient}
**焦耳-汤姆孙系数**是等焓线上温度对压强的变化率，
$$
\mu_\mathrm{JT} \equiv \left(\frac{\partial T}{\partial p}\right)_H .
$$
节流总是降低 $p$，故 $\mu_\mathrm{JT} > 0$ 的气体节流时**降温**，$\mu_\mathrm{JT} < 0$ 的气体**升温**。系数的单位是 $\mathrm{K\,bar^{-1}}$ 或 $\mathrm{K\,atm^{-1}}$。
:::

::: proposition 焦耳-汤姆孙系数 {#prop-mu-formula}
对任何单相流体，
$$
\mu_\mathrm{JT} = \frac{T\left(\partial V_\mathrm{m}/\partial T\right)_p - V_\mathrm{m}}{C_{p,\mathrm{m}}}
= \frac{V_\mathrm{m}\left(\alpha T - 1\right)}{C_{p,\mathrm{m}}} .
$$
理想气体 $\mu_\mathrm{JT} = 0$，严格为零：节流改变的只有压强。真实气体在 $\alpha T > 1$ 时降温，在 $\alpha T < 1$ 时升温；边界 $\alpha T = 1$ 是**转化条件**，满足它的 $(p, T)$ 点构成的轨迹是转化曲线，其最高温度即最高转化温度 $T_\mathrm{i}$。
:::

::: proof
把 $H_\mathrm{m}$ 取作 $T$ 与 $p$ 的函数：$\mathrm{d}H_\mathrm{m} = C_{p,\mathrm{m}}\,\mathrm{d}T + (\partial H_\mathrm{m}/\partial p)_T\,\mathrm{d}p$。焓对压强的系数是 $(\partial H_\mathrm{m}/\partial p)_T = V_\mathrm{m} - T(\partial V_\mathrm{m}/\partial T)_p$（由 $\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p$ 与麦克斯韦关系 $(\partial S/\partial p)_T = -(\partial V/\partial T)_p$）。令 $\mathrm{d}H_\mathrm{m} = 0$ 并解出 $\mathrm{d}T/\mathrm{d}p$ 即得公式。对理想气体 $V_\mathrm{m} = RT/p$，故 $(\partial V_\mathrm{m}/\partial T)_p = R/p = V_\mathrm{m}/T$，分子为零——焦耳的观察，焓的表述：被节流的气体没有降温的办法，因为它的能量不依赖分子彼此相距多远。
:::

对稀薄真实气体，范德华方程给出低压估计 $\mu_\mathrm{JT} \approx \left(2a/RT - b\right)/C_{p,\mathrm{m}}$，在 $T < 2a/Rb$ 时为正，所以模型预言最高转化温度 $T_\mathrm{i} = 2a/Rb$。这些数值在数量级上正确、在细节上错误——范德华把 $T_\mathrm{i}$ 高估了百分之几十——但定性图像是稳健的，工程正建在这张图上：氢的 $T_\mathrm{i} \approx 200\ \mathrm{K}$、氦 $\approx 40\ \mathrm{K}$（实测），而氮、氧、二氧化碳则是几百开尔文。室温落在普通气体转化曲线*之下*，落在 $\mathrm{H_2}$ 与氦的*之上*：在 $298\ \mathrm{K}$ 节流氮气，它降温；在 $298\ \mathrm{K}$ 节流氢气或氦气，它们**升温**，因为在那个温度，分子有限尺寸（$b$ 项，膨胀时升温）压过了分子间吸引（$a$ 项，降温）。

::: example 估算氮气的焦耳-汤姆孙系数 {#ex-jt-n2}
用范德华估计式，取 $a = 1.39\ \mathrm{L^2\,bar\,mol^{-2}}$、$b = 0.0391\ \mathrm{L\,mol^{-1}}$、$C_{p,\mathrm{m}} = 29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$，估算 $\mathrm{N_2}$ 在 $298\ \mathrm{K}$、$1\ \mathrm{bar}$ 的 $\mu_\mathrm{JT}$。
::: solution
$$
\frac{2a}{RT} = \frac{2 \times 1.39}{0.08314 \times 298.15} = 0.112\ \mathrm{L\,mol^{-1}},
\qquad
\frac{2a}{RT} - b = 0.112 - 0.039 = 0.073\ \mathrm{L\,mol^{-1}},
$$
$$
\mu_\mathrm{JT} \approx \frac{0.073\ \mathrm{L\,mol^{-1}}}{29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= \frac{7.3 \times 10^{-5}\ \mathrm{m^3\,mol^{-1}}}{29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= 2.5 \times 10^{-6}\ \mathrm{K\,Pa^{-1}} = 0.25\ \mathrm{K\,bar^{-1}} .
$$
为正，所以室温的氮气节流降温；按这个（低压）估计每巴降约四分之一度；$1\ \mathrm{bar}$ 附近的实测值在 $1\ \mathrm{K\,bar^{-1}}$ 量级且随压强增大——这正是林德液化机吃的饭。单位换算是全部的诀窍：$\mathrm{L\,bar} = 100\ \mathrm{J}$，所以摩尔体积除以摩尔热容就是温度对压强的斜率。
:::
:::

::: warning 节流不是做功的膨胀，而且不一定降温 {#warn-jt}
一个块里装两个误解。第一，$\mu_\mathrm{JT} > 0$ *不是*气体的通性：室温的氢和氦节流升温，任何气体在自己的转化温度之上都升温——氢的液化之所以先用液态空气预冷，原因即在此。第二，节流*不是*可逆绝热膨胀：不提取功，熵增加，过程是等焓而非等熵。同一个压降若走涡轮机（输出功，近似等熵）比走阀门（无处做功，等焓）降温多得多——这就是现代气体液化机混用涡轮与阀门的原因，也是第一定律里的"绝热"从不告诉你在*哪条*绝热路径上的原因。
:::

::: history 从迈耶的比值到液态空气 {#hist-heat-capacity}
尤利乌斯·罗伯特·迈耶（Mayer）于 1842 年仅仅依据气体的比热、在第一定律被接受之前多年，就推断出 $C_p$ 超出 $C_V$ 的部分量度膨胀的功——以他名字命名的这个关系。詹姆斯·普雷斯科特·焦耳（Joule）在 1840 年代确立了热的热功当量，并以自由膨胀实验确立了稀薄气体 $(\partial U/\partial V)_T$ 的近零性。鲁道夫·克劳修斯（Clausius）在 1850 与 1860 年代把热容关系安放在现代热力学的地基上。1852 年，焦耳与威廉·汤姆孙（Thomson，即后来的开尔文勋爵）提议把气体强行推过限流件，以检验真实气体在等焓下降温还是升温；随之而来的是十年难缠的仪器，效应直到 1859 年才报告——焦耳-汤姆孙效应，低温实验物理的基石。卡尔·冯·林德（Linde）于 1895 年把它变成工业：以他名字命名的蓄热式逆流换热器，把空气一遍遍节流，而流出的冷气体把流入的热气体预冷；林德循环至今仍生产世界上大部分氧气、氮气和氩气，而氢和氦仍要求预冷到各自转化温度之下才能节流液化，恰如系数所预言。
:::

## 后续内容

热容是之后每一章的温度导数那一半。基尔霍夫定律是[[general-chemistry-2/chemical-equilibrium|平衡]]中范特霍夫方程的双胞胎——对 $\Delta_\mathrm{r}G^\circ = -RT\ln K$ 求导并用基尔霍夫定律就得到 $K$ 如何随 $T$ 移动——两者都在[[statistical-thermodynamics/thermodynamic-functions]]中由配分函数重新导出。可逆绝热线 $TV^{\gamma-1} = \text{const}$ 到了[[thermodynamics/second-law]]里变成"可逆绝热变化是*等熵*的"这一陈述，那正是第二定律给它的定义。焓与 $\mu_\mathrm{JT}$ 会重返[[thermodynamics/phase-equilibria]]（蒸气压曲线、制冷循环）、[[thermodynamics/mixtures]]（过量热容探测分子间力）与[[thermodynamics/reaction-equilibrium]]（溶解物种的 $\Delta_\mathrm{r}C_p$ 主宰室温附近的生物化学）。这一切的分子解读——$C_V$ 为什么是那个值、$\alpha T$ 为什么穿过一——住在 [[statistical-thermodynamics/boltzmann-distribution]] 与 [[statistical-thermodynamics/real-gases-liquids]] 里。连[[electrochemistry/cell-thermodynamics|电化学]]的电池电压，其温度依赖也继承自这些同样的热容。

::: summary
- 焓 $H = U + pV$ 是恒压的热：只做膨胀功的封闭体系有 $\Delta H = q_\mathrm{p}$；理想气体反应有 $\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas}$。
- $C_{V,\mathrm{m}} = (\partial U/\partial T)_V$、$C_{p,\mathrm{m}} = (\partial H/\partial T)_p$；理想气体 $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R$（迈耶），一般地 $C_p - C_V = TV\alpha^2/\kappa_T \ge 0$。
- 均分定理解释气体值（$C_{V,\mathrm{m}}$ 的 $\tfrac{3}{2}R$、$\tfrac{5}{2}R$）；振动在高温启动。
- 基尔霍夫定律：$\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \Delta_\mathrm{r}C_p^\circ$；$\Delta_\mathrm{r}C_p$ 恒定时反应焓随温度线性漂移。
- 理想气体的可逆绝热线满足 $pV^\gamma$、$TV^{\gamma-1}$、$p^{1-\gamma}T^\gamma$ = 常数，且 $w = \Delta U = C_V\Delta T$；绝热线比等温线陡，不可逆绝热膨胀的终温比可逆的高。
- 节流等焓；$\mu_\mathrm{JT} = (T\alpha - 1)V_\mathrm{m}/C_{p,\mathrm{m}}$ 对理想气体为零，在转化温度以下为正、以上为负。
- 氢与氦在室温节流升温，因为 $298\ \mathrm{K}$ 超过它们的转化温度；林德液化利用的正是普通气体相反的符号。
:::

## 练习

::: exercise 恒压下加热氩气 {level=1 check="6.24"}
三摩尔氩气（视为理想单原子气体）在恒压下从 $300\ \mathrm{K}$ 加热到 $400\ \mathrm{K}$。取 $C_{V,\mathrm{m}} = \tfrac{3}{2}R$。吸收多少热？（以 $\mathrm{kJ}$ 为单位输入 $q$。）
::: solution
恒压下 $q = nC_{p,\mathrm{m}}\Delta T$，其中 $C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$：
$$
q = 3.00 \times 20.79 \times 100 = 6236\ \mathrm{J} = 6.24\ \mathrm{kJ}.
$$
其中 $nC_{V,\mathrm{m}}\Delta T = 3.74\ \mathrm{kJ}$ 升高温度，$nR\Delta T = 2.49\ \mathrm{kJ}$ 是膨胀功。
:::
:::

::: exercise 从氧弹到烧瓶 {level=1 check="-101.4"}
对 $500\ \mathrm{K}$ 的 $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightarrow 2\,\mathrm{NH_3(g)}$，氧弹量热计给出 $\Delta_\mathrm{r}U = -93.1\ \mathrm{kJ\,mol^{-1}}$。求同温的 $\Delta_\mathrm{r}H$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入。）
::: solution
$\Delta n_\mathrm{gas} = 2 - 4 = -2$，故
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas}
= -93.1 + \frac{8.314 \times 500 \times (-2)}{1000}
= -93.1 - 8.3 = -101.4\ \mathrm{kJ\,mol^{-1}} .
$$
四摩尔气体变两摩尔：大气对体系做功，恒压热在大小上超过恒容热。
:::
:::

::: exercise 单原子气体的绝热压缩 {level=1 check="871"}
一摩尔氩（$\gamma = 5/3$）在 $298\ \mathrm{K}$ 下可逆绝热压缩到初始体积的五分之一。终温是多少？（以 $\mathrm{K}$ 为单位输入 $T_\mathrm{f}$。）
::: solution
$TV^{\gamma-1} = \text{const}$，$\gamma - 1 = 2/3$：
$$
T_\mathrm{f} = 298 \times 5^{2/3} = 298 \times 2.924 = 871\ \mathrm{K}.
$$
不散热地压缩到五分之一体积，温度升高 $5^{2/3} \approx 2.9$ 倍——同样的算术让柴油机热到不需要火花塞就能点燃燃料。
:::
:::

::: exercise 一氧化碳的基尔霍夫移动 {level=2 check="-284.4"}
对 $\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$，$\Delta_\mathrm{r}H^\circ(298.15\ \mathrm{K}) = -283.0\ \mathrm{kJ\,mol^{-1}}$；由 NIST-JANAF 的 $298.15\ \mathrm{K}$ 值，$C_{p,\mathrm{m}}$：$\mathrm{CO_2}\ 37.13$、$\mathrm{CO}\ 29.14$、$\mathrm{O_2}\ 29.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$。设热容恒定，估算 $500\ \mathrm{K}$ 的 $\Delta_\mathrm{r}H^\circ$。（以 $\mathrm{kJ\,mol^{-1}}$ 为单位输入。）
::: solution
$\Delta_\mathrm{r}C_p^\circ = 37.13 - 29.14 - 14.69 = -6.70\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故
$$
\Delta_\mathrm{r}H^\circ(500) = -283.0 + (-6.70 \times 10^{-3})(500 - 298.15) = -283.0 - 1.35 = -284.4\ \mathrm{kJ\,mol^{-1}} .
$$
:::
:::

::: exercise 不可逆绝热膨胀 {level=2 check="223"}
一摩尔理想双原子气体（$C_{V,\mathrm{m}} = \tfrac{5}{2}R$）在 $300\ \mathrm{K}$、$10.0\ \mathrm{bar}$ 下绝热膨胀，对抗 $1.00\ \mathrm{bar}$ 的恒定外压直到力学平衡。求终温。（以 $\mathrm{K}$ 为单位输入 $T_\mathrm{f}$，三位有效数字。）
::: solution
由 $q = 0$：$C_{V,\mathrm{m}}(T_\mathrm{f} - T_\mathrm{i}) = -p_\mathrm{ex}(V_\mathrm{f} - V_\mathrm{i})$，且终态的 $p_\mathrm{ex}V = RT$ 给出线性方程
$$
20.79\,(T_\mathrm{f} - 300) = -\left(8.314\,T_\mathrm{f} - 8.314 \times 300/10.0\right),
$$
$$
29.10\,T_\mathrm{f} = 6236 + 249.4 = 6485
\quad\Longrightarrow\quad
T_\mathrm{f} = 223\ \mathrm{K}.
$$
可逆膨胀到同压会到达 $155\ \mathrm{K}$；这 $67\ \mathrm{K}$ 的差额，就是湍流毁掉的功的温度等价物。
:::
:::

::: exercise 可逆绝热线的功 {level=2 check="-1.51"}
一摩尔理想双原子气体在 $300\ \mathrm{K}$、$10.0\ \mathrm{L}$ 下可逆绝热膨胀到 $20.0\ \mathrm{L}$。取 $C_{V,\mathrm{m}} = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$。计算功。（以 $\mathrm{kJ}$ 为单位输入 $w$。）
::: solution
$T_\mathrm{f} = 300(10.0/20.0)^{2/7} = 227.4\ \mathrm{K}$，由 $q = 0$，
$$
w = \Delta U = 20.79 \times (227.4 - 300) = -1510\ \mathrm{J} = -1.51\ \mathrm{kJ}.
$$
气体对环境做 $1.51\ \mathrm{kJ}$ 的功，全部拿自己的内能付账。
:::
:::

::: exercise 推导一般的 $C_p - C_V$ 关系 {level=3}
从 $C_p$ 与 $C_V$ 的定义和能量-压强关系 $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$ 出发，推导 $C_p - C_V = TV\alpha^2/\kappa_T$。用 $\alpha = 49.2\times10^{-6}\ \mathrm{K^{-1}}$、$\kappa_T = 7.3\times10^{-7}\ \mathrm{bar^{-1}}$、$V_\mathrm{m} = 7.11\ \mathrm{cm^3\,mol^{-1}}$ 计算铜在 $298\ \mathrm{K}$ 的值，并解释结果为什么远小于 $R$。
::: solution
$C_p - C_V = (\partial H/\partial T)_p - (\partial U/\partial T)_V$。由 $H = U + pV$，$(\partial H/\partial T)_p = (\partial U/\partial T)_p + p(\partial V/\partial T)_p$，再展开 $(\partial U/\partial T)_p = (\partial U/\partial T)_V + (\partial U/\partial V)_T(\partial V/\partial T)_p$，
$$
C_p - C_V = \left[\left(\frac{\partial U}{\partial V}\right)_T + p\right]\left(\frac{\partial V}{\partial T}\right)_p
= T\left(\frac{\partial p}{\partial T}\right)_V\left(\frac{\partial V}{\partial T}\right)_p ,
$$
能量-压强关系把 $p$ 消掉。现在 $(\partial V/\partial T)_p = V\alpha$，循环关系给出 $(\partial p/\partial T)_V = -(\partial V/\partial T)_p / (\partial V/\partial p)_T = \alpha/\kappa_T$。故 $C_p - C_V = TV\alpha^2/\kappa_T$。对铜：
$$
C_{p,\mathrm{m}} - C_{V,\mathrm{m}}
= \frac{298 \times 7.11\times10^{-6}\ \mathrm{m^3} \times (49.2\times10^{-6})^2}{7.3\times10^{-12}\ \mathrm{Pa^{-1}}}
= 0.70\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
小，是因为固体几乎不膨胀（$\alpha$ 极小）又难压缩（$\kappa_T$ 极小，但比值上 $\alpha^2$ 占优）：恒压加热固体几乎不多花功，不像气体要花掉整整一个 $R$。
:::
:::

::: exercise 氢的转化温度 {level=3 check="226"}
范德华方程预言最高焦耳-汤姆孙转化温度 $T_\mathrm{i} = 2a/Rb$。用氢的 $a = 0.250\ \mathrm{L^2\,bar\,mol^{-2}}$、$b = 0.0266\ \mathrm{L\,mol^{-1}}$ 计算 $T_\mathrm{i}$，并解释为什么在 $298\ \mathrm{K}$ 节流氢气会升温、液化机对此必须怎么办。（以 $\mathrm{K}$ 为单位输入 $T_\mathrm{i}$。）
::: solution
$$
T_\mathrm{i} = \frac{2a}{Rb}
= \frac{2 \times 0.250\ \mathrm{L^2\,bar\,mol^{-2}}}{0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}} \times 0.0266\ \mathrm{L\,mol^{-1}}}
= \frac{0.500}{0.002212}\ \mathrm{K} = 226\ \mathrm{K}.
$$
（实测约 $200\ \mathrm{K}$；范德华高估了，但结论不受影响。）由于 $298\ \mathrm{K} > T_\mathrm{i}$，氢处在自己转化曲线之上：斥力尺寸项占优，$\mu_\mathrm{JT} < 0$，节流*升温*。因此氢的液化机必须先预冷到 $T_\mathrm{i}$ 以下——用 $77\ \mathrm{K}$ 的液氮浴，或用一串焦耳-汤姆孙膨胀机级联——然后节流才能开始液化。氦的 $T_\mathrm{i} \approx 40\ \mathrm{K}$，需要液氢或闭式循环预冷；这一个不等式，就是最轻的两种气体也最难装成液态瓶的原因。
:::
:::
