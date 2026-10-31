理想气体是热力学起航的地方，也是统计力学必须证明自己功力的地方。[[thermodynamics/kinetic-theory]] 里的分子动理论把稀薄气体的压强解释为动量流，并与实验定律 $PV = Nk_BT$ 比对，读出 $\tfrac12m\langle v^2\rangle = \tfrac32k_BT$。这里不从实验拿任何东西。我们对箱中的原子求 [[statistical-mechanics/canonical]] 的正则配分函数，*推导*出物态方程、能量、速率分布，以及最惊人的——绝对熵，那个热力学只能从接近绝对零度起积分热容去测量的数字。

这个熵——**萨库尔-特特罗德（Sackur–Tetrode）方程**——含有普朗克常量。纯经典的计算做不出它：经典相空间没有天然的体积单位，所以经典熵只能定到一个相加常数。它还含一个因子 $1/N!$，经典力学提供不了，而它的缺失会引出**吉布斯佯谬**：两块相同气体之间的隔板一撤，熵反而增加。两种原料都来自量子力学，而且是在气体其余行为都经典的极限里。所以这一章是一座桥：用量子态来为经典统计正名；它以一条判据收尾，告诉我们桥何时塌陷、[[statistical-mechanics/quantum-statistics]] 何时登场。

## 从量子态到相空间 {#phase-space}

把一个质量为 $m$ 的原子放进边长 $L$、体积 $V = L^3$ 的立方箱，除器壁外没有内部结构、没有受力。[[quantum-1/piecewise-potentials]] 的定态推广到三维后由三个正整数标记，能量为

$$
\varepsilon_{n_x n_y n_z} = \frac{h^2}{8mL^2}\left(n_x^2 + n_y^2 + n_z^2\right), \qquad n_x, n_y, n_z = 1, 2, 3, \dots
$$ {#eq-box}

因为能量是求和，单粒子配分函数沿三个方向因子化：

$$
Z_1 = \sum_{n_x, n_y, n_z}e^{-\beta\varepsilon} = \left(\sum_{n=1}^\infty e^{-a n^2}\right)^3, \qquad a = \frac{\beta h^2}{8mL^2}.
$$

对任何宏观的箱，$a$ 小得离谱。$300\,\mathrm{K}$ 的氦原子在边长 $1\,\mathrm{cm}$ 的箱中，$a$ 约为 $2\times10^{-17}$。求和相邻两项之差于是几乎没有，求和以极好的精度就是一个积分。

::: definition 热德布罗意波长 {#def-lambda}
质量为 $m$ 的粒子在温度 $T$ 下的**热波长**为

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}}.
$$ {#eq-lambda}
:::

差一个量为一的因子，$\lambda$ 就是典型热动量 $p \sim \sqrt{mk_BT}$ 的粒子的德布罗意波长 $h/p$。它是一个量子长度；它定出气体粒子"意识到"自己是波的长度尺度。

::: theorem 平动配分函数 {#thm-z1}
体积 $V$ 的箱中一个无内部结构的粒子，在 $\lambda$ 远小于箱的极限下，

$$
Z_1 = \frac{V}{\lambda^3}.
$$ {#eq-z1}
:::

::: proof
$a$ 小时，把求和换成积分，并把下限延到 $0$：

$$
\sum_{n=1}^\infty e^{-an^2} \approx \int_0^\infty e^{-an^2}\,\dd n = \frac12\sqrt{\frac{\pi}{a}}.
$$

误差绝对值接近 $\tfrac12$（$n = 0$ 项缺的那一半），$a \ll 1$ 时与 $\tfrac12\sqrt{\pi/a}$ 相比可以忽略。代入 $a = \beta h^2/(8mL^2)$，

$$
\frac12\sqrt{\frac{\pi\cdot8mL^2}{\beta h^2}} = L\,\frac{\sqrt{2\pi mk_BT}}{h} = \frac{L}{\lambda}.
$$

立方得 $Z_1 = L^3/\lambda^3 = V/\lambda^3$。结果不依赖箱是不是立方；任何形状都给出体积，误差是相对 $\lambda/L$ 量级的表面修正。
:::

::: example 这个积分有多好？ {#ex-sum-integral}
对 $a = 0.1$ 与 $a = 0.01$ 比较 $\sum_{n\ge1}e^{-an^2}$ 与 $\tfrac12\sqrt{\pi/a}$，并求 $300\,\mathrm{K}$ 下氦的热波长。
::: solution
数值求和：$\sum_{n\ge1}e^{-0.1n^2} = 2.3025$，而 $\tfrac12\sqrt{\pi/0.1} = 2.8025$。$a = 0.01$ 时和为 $8.3623$，积分为 $8.8623$。两种情形差都是小数点后四位 $0.5000$：求和等于 $\tfrac12\sqrt{\pi/a} - \tfrac12$，误差对 $1/a$ 指数小。相对误差 $\tfrac12\big/\tfrac12\sqrt{\pi/a} = \sqrt{a/\pi}$，真实的箱里 $a \sim 10^{-17}$，它约 $\sim10^{-9}$。

对氦，$m = 4.002602\,\mathrm{u} = 6.6465\times10^{-27}\,\mathrm{kg}$，

$$
\lambda = \frac{6.62607015\times10^{-34}}{\sqrt{2\pi\times6.6465\times10^{-27}\times1.380649\times10^{-23}\times300}}\,\mathrm{m} = 5.04\times10^{-11}\,\mathrm{m},
$$

约 $50\,\mathrm{pm}$，比原子本身还小。氩在室温下重十倍，$\lambda = 16\,\mathrm{pm}$。于是 $V = 1\,\mathrm{cm^3}$ 时 $Z_1 = V/\lambda^3$ 量级为 $10^{25}$：热学上可及的单粒子态有那么多。
:::
:::

同一个结果有一个经典读法。经典的单粒子配分函数是位置与动量上的积分，

$$
Z_1 = \frac{1}{h^3}\int e^{-\beta H(\mathbf r, \mathbf p)}\,\dd^3r\,\dd^3p,
$$ {#eq-phase-space}

其中 $H = p^2/2m$。位置积分给出 $V$，每个动量分量给出 $\sqrt{2\pi mk_BT}$，所以右边是 $V(2\pi mk_BT)^{3/2}/h^3 = V/\lambda^3$，恰为 [[#eq-z1]]。两个算法相对照，定下了规则：**一个量子态占据相空间中 $h^3$ 的体积**（一般地，$f$ 个自由度对应 $h^f$）。经典统计力学有那个积分却没有 $h^3$，因而对熵中的相加常数视而不见。量子计数把它补上。同一条规则配上任何哈密顿量，正是 [[statistical-mechanics/canonical]] 能量均分定理里把 $e^{-\beta H}$ 当相空间密度使用的依据。

::: example 谐振子的相空间规则 {#ex-osc-phase-space}
对谐振子 $H = p^2/2m + \tfrac12m\omega^2x^2$ 计算 [[#eq-phase-space]] 的一维形式 $Z_1 = h^{-1}\int e^{-\beta H}\,\dd x\,\dd p$，并与 [[statistical-mechanics/canonical]] 的量子配分函数 $1/[2\sinh(\beta\hbar\omega/2)]$ 比较。
::: solution
这个积分是两个高斯的乘积：

$$
Z_1^{\mathrm{cl}} = \frac1h\int_{-\infty}^\infty e^{-\beta p^2/2m}\,\dd p\int_{-\infty}^\infty e^{-\beta m\omega^2x^2/2}\,\dd x = \frac1h\sqrt{\frac{2\pi m}{\beta}}\sqrt{\frac{2\pi}{\beta m\omega^2}} = \frac{2\pi}{h\beta\omega} = \frac{k_BT}{\hbar\omega}.
$$

量子结果在 $\beta\hbar\omega \ll 1$ 下是 $1/[2\sinh(\beta\hbar\omega/2)] \approx 1/(\beta\hbar\omega) = k_BT/\hbar\omega$，相同。$k_BT = 10\,\hbar\omega$ 时两者为 $10.000$ 对 $9.996$。所以"相空间中每份面积 $h$ 一个态"这条规则并不只对自由粒子特殊：对束缚系统它也重现量子求和的高温极限。这就是半经典的陈述——$(x, p)$ 平面上每个量子态占据面积 $h$——玻尔-索末菲（Bohr–Sommerfeld）条件 $\oint p\,\dd x = nh$ 在 1916 年已经表达了它。低温下经典积分继续数着量子谐振子并不拥有的态，一致便失效，正如萨库尔-特特罗德熵曾经失效的那样。
:::
:::

## 多粒子：因子 $1/N!$ {#identical}

现在把 $N$ 个全同原子放进箱子，仍不相互作用。若原子可分辨，[[statistical-mechanics/canonical#prop-factor]] 会给出 $Z = Z_1^N$。但原子并非如此。$Z_1^N$ 中"原子 $1$ 在态 $a$、原子 $2$ 在态 $b$"的那一项，与"原子 $1$ 在 $b$、原子 $2$ 在 $a$"的那一项是两个不同的项；可量子力学上它们是同一个态：一个原子在 $a$，一个在 $b$。每个 $N$ 粒子态——其中 $N$ 个原子占据*不同*的单粒子态——在 $Z_1^N$ 里出现 $N!$ 次，每个置换一次。

::: proposition 经典理想气体 {#prop-z-gas}
若热学上可及的单粒子态数远大于 $N$，以至于两个原子占据同一态的概率可以忽略，则

$$
Z_N = \frac{Z_1^N}{N!} = \frac{1}{N!}\left(\frac{V}{\lambda^3}\right)^N.
$$ {#eq-zn}

条件是

$$
n\lambda^3 \ll 1, \qquad n = \frac{N}{V}.
$$ {#eq-classical-condition}
:::

::: proof
展开 $Z_1^N = \sum_{s_1, \dots, s_N}e^{-\beta(\varepsilon_{s_1} + \dots + \varepsilon_{s_N})}$。$s_i$ 两两互异的项，每个物理态恰好代表 $N!$ 次，除以 $N!$ 便数对了。有两个以上 $s_i$ 相等的项，除法会把它们数错。估计它们的权重：在约 $Z_1 = V/\lambda^3$ 个可及态中随机给 $N$ 个粒子指派态。重合对的期望数目约为 $N^2/(2Z_1) = \tfrac12N\,n\lambda^3$，于是卷进重合的粒子比例是 $n\lambda^3$ 量级。所以这处错数对 $\ln Z$——一个 $N$ 量级的量——的改动为 $N\,n\lambda^3$ 量级：相对误差 $n\lambda^3$ 量级，[[#eq-classical-condition]] 成立时可忽略。这是概略论证；[[statistical-mechanics/quantum-statistics]] 里的精确处理证实，$\ln Z$ 的领头修正是相对 $n\lambda^3$ 量级，且玻色子与费米子符号相反。
:::

$n\lambda^3$ 是边长 $\lambda$ 的立方体内的粒子数。它小时，粒子的波包很少重叠，气体是**非简并**的，或者说经典的。它接近 $1$ 时气体**简并**，而粒子是玻色子还是费米子将改变一切。

::: example 气体什么时候是经典的？ {#ex-degeneracy}
对下列情形计算 $n\lambda^3$：(a) $300\,\mathrm{K}$、$1\,\mathrm{atm}$ 的氮气；(b) 沸点 $4.2\,\mathrm{K}$ 的液氦-4，质量密度 $0.125\,\mathrm{g/cm^3}$；(c) $300\,\mathrm{K}$ 铜中的导电电子，$n = 8.47\times10^{28}\,\mathrm{m^{-3}}$。
::: solution
(a) 数密度 $n = P/k_BT = 101325/(1.380649\times10^{-23}\times300) = 2.45\times10^{25}\,\mathrm{m^{-3}}$。以 $m = 28.0134\,\mathrm{u}$，[[#eq-lambda]] 给出 $\lambda = 1.90\times10^{-11}\,\mathrm{m}$，$n\lambda^3 = 1.7\times10^{-7}$。空气是经典的，还差七个数量级。

(b) 这里 $n = 125\,\mathrm{kg/m^3}/(4.0026\,\mathrm{u}) = 1.88\times10^{28}\,\mathrm{m^{-3}}$，$4.2\,\mathrm{K}$ 下 $\lambda = 4.25\times10^{-10}\,\mathrm{m}$，于是 $n\lambda^3 = 1.45$。理想气体公式连近似都谈不上。液氦在 $2.17\,\mathrm{K}$ 变超流，这一现象与玻色-爱因斯坦凝聚有关。

(c) 对电子，$m = 9.109\times10^{-31}\,\mathrm{kg}$，比氦小 $7000$ 倍的质量给出 $300\,\mathrm{K}$ 下 $\lambda = 4.3\times10^{-9}\,\mathrm{m}$，$n\lambda^3 = 6.8\times10^{3}$。金属中的电子气在室温下高度简并。把它当经典处理，正是德鲁德（Drude）1900 年的模型算不对电子热容的错误所在；费米-狄拉克处理在 [[statistical-mechanics/bose-fermi]]。
:::
:::

## 理想气体的热力学 {#thermo}

有了 [[#eq-zn]] 和斯特林近似 $\ln N! \approx N\ln N - N$，自由能为

$$
F = -k_BT\ln Z_N = -Nk_BT\left[\ln\frac{V}{N\lambda^3} + 1\right].
$$ {#eq-f-gas}

体积只通过 $V/N$——每个粒子的体积——进来，这就是 $F$ 广延的原因。分母里那个 $N$ 是 $\ln N!$ 造出来的。

::: theorem 从配分函数看理想气体 {#thm-ideal-gas}
$N$ 个无内部结构粒子的经典理想气体满足

$$
PV = Nk_BT, \qquad U = \tfrac32Nk_BT, \qquad \mu = k_BT\ln(n\lambda^3).
$$ {#eq-ideal}
:::

::: proof
由 [[statistical-mechanics/canonical#thm-free-energy]]，$P = -\partial F/\partial V$，固定 $T$ 与 $N$。[[#eq-f-gas]] 里只有 $\ln V$ 依赖 $V$，所以 $P = Nk_BT/V$。

能量：$\ln Z_N = N\ln V - 3N\ln\lambda - \ln N!$，而 $\lambda \propto \beta^{1/2}$，所以 $\ln Z_N = \tfrac32N\ln(1/\beta) + (\text{与 }\beta\text{ 无关的项})$。于是 $U = -\partial\ln Z_N/\partial\beta = \tfrac32N/\beta = \tfrac32Nk_BT$。

化学势 $\mu = (\partial F/\partial N)_{T,V}$。对 [[#eq-f-gas]] 求导，

$$
\mu = -k_BT\left[\ln\frac{V}{N\lambda^3} + 1\right] - Nk_BT\left(-\frac1N\right) = -k_BT\ln\frac{V}{N\lambda^3} = k_BT\ln(n\lambda^3).
$$
:::

理想气体定律——[[thermodynamics/temperature]] 把它当作热力学温度的操作性定义——如今成了一条定理，其中的 $T$ 是统计温度 $1/T = \partial S/\partial U$。两个温度一致。能量是三个二次项的均分值。化学势是新面孔：经典区 $n\lambda^3 \ll 1$ 里它大而负，比零低出许多个 $k_BT$。气体被压缩或被冷却、走向简并时，$\mu$ 上升趋零，而量子分布正是在那个区里分道扬镳。

::: theorem 萨库尔-特特罗德方程 {#thm-sackur-tetrode}
经典单原子理想气体的熵为

$$
S = Nk_B\left[\ln\left(\frac{V}{N\lambda^3}\right) + \frac52\right] = Nk_B\left[\ln\left(\frac{V}{N}\left(\frac{4\pi mU}{3Nh^2}\right)^{3/2}\right) + \frac52\right].
$$ {#eq-sackur-tetrode}
:::

::: proof
由 [[statistical-mechanics/canonical#thm-free-energy]]，$S = (U - F)/T$。以 $U = \tfrac32Nk_BT$ 与 [[#eq-f-gas]]，

$$
S = \frac{1}{T}\left(\tfrac32Nk_BT + Nk_BT\left[\ln\frac{V}{N\lambda^3} + 1\right]\right) = Nk_B\left[\ln\frac{V}{N\lambda^3} + \frac52\right].
$$

第二形式：$k_BT = 2U/(3N)$，所以 $2\pi mk_BT = 4\pi mU/(3N)$，$\lambda^{-3} = (4\pi mU/3Nh^2)^{3/2}$。
:::

第二个形式就是微正则熵 $S(U, V, N)$，由它得 $1/T = \partial S/\partial U = \tfrac32Nk_B/U$、$P/T = \partial S/\partial V = Nk_B/V$，与 [[statistical-mechanics/microcanonical]] 相容。它对 $V$ 与 $T$ 的依赖，$Nk_B[\ln V + \tfrac32\ln T] + \text{const}$，就是 [[thermodynamics/entropy]] 的熵变公式，如今常数也被定了出来。

::: example 氩的绝对熵 {#ex-argon}
用 [[#eq-sackur-tetrode]] 计算 $298.15\,\mathrm{K}$、$1\,\mathrm{bar}$ 下氩气的摩尔熵，并与量热值 $154.8\,\mathrm{J/(mol\cdot K)}$ 比较。
::: solution
每个原子的体积 $V/N = k_BT/P = 1.380649\times10^{-23}\times298.15/10^5 = 4.1164\times10^{-26}\,\mathrm{m^3}$。以 $m = 39.948\,\mathrm{u} = 6.6335\times10^{-26}\,\mathrm{kg}$，

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}} = 1.5997\times10^{-11}\,\mathrm{m}, \qquad \lambda^3 = 4.0936\times10^{-33}\,\mathrm{m^3}.
$$

于是 $V/(N\lambda^3) = 1.0056\times10^7$，其对数为 $16.124$。每摩尔，

$$
S_m = R\,(16.124 + 2.5) = 8.314462618\times18.624\,\mathrm{J/(mol\cdot K)} = 154.8\,\mathrm{J/(mol\cdot K)}.
$$

与量热熵的一致达四位有效数字——量热熵是把 $C_P/T$ 从几开尔文起、穿过氩的熔化与沸腾积分、再加上潜热项得到的。对其它惰性气体在 $298.15\,\mathrm{K}$、$1\,\mathrm{bar}$ 下同样计算得

| 气体 | He | Ne | Ar | Kr | Xe |
|---|---|---|---|---|---|
| 由 [[#eq-sackur-tetrode]] 算的 $S_m$（J/(mol·K)） | $126.15$ | $146.33$ | $154.85$ | $164.09$ | $169.69$ |

与表列标准熵在所给精度内一致。通往绝对熵的两条独立道路——一条经由固体与液体的热测量，一条经由数气体的量子态——彼此相符。这是早期的确认之一：确认 $h$ 属于气体的描述，确认第三定律正确。
:::
:::

[[#eq-ideal]] 里的化学势可以用同一批数字算出来。$298.15\,\mathrm{K}$、$1\,\mathrm{bar}$ 的氩，$n\lambda^3 = 1/(1.0056\times10^7) = 9.94\times10^{-8}$，于是 $\mu = k_BT\ln(9.94\times10^{-8}) = -16.12\,k_BT = -0.414\,\mathrm{eV}$。它是加入一个原子的自由能代价；它为负，是因为往稀薄气体里加一个原子打开的微观状态远多于它花掉的能量。化学家把同一个量写成 $\mu = \mu^\circ + k_BT\ln(P/P^\circ)$，把 $\lambda$ 收进 $\mu^\circ$。

::: widget plot
f: 18.624 + 2.5*ln(x/298.15); 0
x: 0.05, 300
y: -5, 25
labels: 1 bar 下氩的萨库尔-特特罗德 S/R; 零
caption: $1\,\mathrm{bar}$ 下氩的萨库尔-特特罗德摩尔熵，以 $R$ 为单位，对开尔文温度作图。$298\,\mathrm{K}$ 处是 $18.6$，即 $154.8\,\mathrm{J/(mol\cdot K)}$。向左缘移动：曲线按 $\tfrac52\ln T$ 下降，在 $0.17\,\mathrm{K}$ 附近穿过零——对一个计数来说这是不可能的结果。约 $0.47\,\mathrm{K}$ 处公式早已离开自己的适用区（那里 $n\lambda^3$ 达到 $1$），而真实的氩早已在 $87\,\mathrm{K}$ 凝聚。
:::

::: warning 经典熵在低温失灵
定密度下 $T \to 0$ 时 $\lambda \to \infty$、$V/(N\lambda^3) \to 0$，[[#eq-sackur-tetrode]] 奔向 $-\infty$。对一个计数来说负熵不可能：$\Omega \ge 1$。公式在自己的区里没错，错的是被拿到区外使用。早在 $S$ 变负之前，$n\lambda^3$ 就已达到 $1$，[[#prop-z-gas]] 不再适用。本章每一条理想气体结果都带着假设 $n\lambda^3 \ll 1$。
:::

::: quiz
温度不变时，经典理想气体的体积加倍，$N$ 固定。按 [[#eq-sackur-tetrode]]，熵改变多少？
- [ ] 改变 $Nk_B\ln2 + \tfrac52Nk_B$。
- [x] 改变 $Nk_B\ln2$。
- [ ] 改变 $\tfrac32Nk_B\ln2$。
- [ ] 完全不变，因为 $T$ 固定。
::: solution
变的只有 $\ln(V/N\lambda^3)$，而 $\lambda$ 只依赖 $T$。所以 $\Delta S = Nk_B\ln(2V/V) = Nk_B\ln2$，与 [[thermodynamics/entropy]] 的自由膨胀和可逆等温线相同。$\tfrac52$ 是常数，任何差里都相消；$\tfrac32Nk_B\ln2$ 是固定 $V$ 下把 $T$ 加倍的改变。
:::
:::

## 吉布斯佯谬 {#gibbs}

一块隔板把箱子分成两个体积各为 $V$ 的半边，每边各有 $N$ 个原子，温度与压强相同。撤去隔板。若两边是*不同*的气体，比如氦与氩，每种气体都不可逆地膨胀到两倍体积，熵上升。若两边是*同种*气体，没有任何可观察的事发生：把隔板装回去就恢复初态，所以过程可逆，$\Delta S$ 必须为零。

::: proposition 混合熵 {#prop-mixing}
体积同为 $V$、温度相同的 $N$ 个 A 气体原子与 $N$ 个 B 气体原子之间的隔板撤去时，

$$
\Delta S = 2Nk_B\ln2 \quad\text{若 A 与 B 为不同气体}, \qquad \Delta S = 0 \quad\text{若为同种气体}.
$$ {#eq-mixing}
:::

::: proof
不同气体：气体是理想的、互不作用，所以混合后配分函数是"$N$ 个 A 原子在 $2V$ 中"与"$N$ 个 B 原子在 $2V$ 中"两个配分函数的乘积，熵是两者萨库尔-特特罗德熵的和。对每种气体，[[#eq-sackur-tetrode]] 中唯一的改变是固定 $N$ 与 $T$ 下 $V \to 2V$，增加 $Nk_B\ln2$。合计 $2Nk_B\ln2$。

同种气体：混合前熵为 $2S(N, V)$；混合后为 $S(2N, 2V)$，即体积 $2V$ 中 $2N$ 个全同原子的熵。[[#eq-sackur-tetrode]] 只通过 $V/N$ 依赖 $V$ 与 $N$，而 $V/N$ 未变；前置因子 $N$ 加倍。所以 $S(2N, 2V) = 2S(N, V)$，$\Delta S = 0$。
:::

现在假设我们忘掉了 $1/N!$，用了 $Z = Z_1^N$。那么 $F$ 里含的会是 $\ln V$ 而不是 $\ln(V/N)$，熵会是 $S' = Nk_B[\ln(V/\lambda^3) + \tfrac32]$，而撤去同种气体之间的隔板会给出

$$
S'(2N, 2V) - 2S'(N, V) = 2Nk_B\ln(2V) - 2Nk_B\ln V = 2Nk_B\ln2 > 0.
$$

这就是**吉布斯佯谬**：一种把全同原子当可分辨来数的计数，预言了某种气体与它自己混合的混合熵，也预言了一个不广延的熵。吉布斯在 1870 年代就看到，补救之道是把只差全同粒子一个置换的态数为一个，那就是 $1/N!$。经典力学给不出理由：经典粒子沿轨道运动，原则上可以贴标签。量子力学给得出：全同粒子根本没有任何标签，一个态由每个单粒子态上占据多少个粒子指定，而不是由哪些粒子指定。

::: remark 佯谬说的是知识吗？
混合熵随两种气体变得全同而从 $2Nk_B\ln2$ 跳到 $0$；它不随两种气体越来越像而连续缩小。这个不连续使许多作者不安。化解之道是：熵依赖我们能分辨哪些宏观状态。若没有任何实验能把气体 A 与气体 B 分开，那么对热力学来说它们就是同种气体，从它们的"混合"里榨不出功。若有实验能把它们区分开——哪怕只是质量上微小的差别——那么半透膜原则上就能可逆地把它们分开，并提取 $T\Delta S = 2Nk_BT\ln2$ 的功。杰恩斯（Jaynes）1992 年的文章《吉布斯佯谬》（*The Gibbs paradox*）是一篇清楚的新讨论。
:::

::: example 分离空气 {#ex-air}
把空气建模为 $1.00\,\mathrm{mol}$ 氧气与 $4.00\,\mathrm{mol}$ 氮气，都理想，$298\,\mathrm{K}$、$1\,\mathrm{atm}$。求混合熵，以及把混合物在同温同压下分离回纯气体所需的最小功。
::: solution
混合前，每种气体以共同的压强待在各自的体积里，体积正比于物质的量：$V_{\mathrm{O_2}} = \tfrac15V$、$V_{\mathrm{N_2}} = \tfrac45V$。混合后各占 $V$。与 [[#prop-mixing]] 的证明一样，每种气体都像独处时一样，获得 $n_iR\ln(V/V_i) = -n_iR\ln x_i$，摩尔分数 $x_{\mathrm{O_2}} = 0.2$、$x_{\mathrm{N_2}} = 0.8$。于是

$$
\Delta S = -R\bigl[1.00\ln0.2 + 4.00\ln0.8\bigr] = 8.314462618\times(1.6094 + 0.8926) = 20.80\,\mathrm{J/K}.
$$

一般公式是 $\Delta S = -R\sum_in_i\ln x_i$；等量两种气体时回到每摩尔各 $2R\ln2$。

分离是逆过程。温度不变、外界作温度为 $T$ 的热库时，最小功是气体亥姆霍兹自由能的增量。理想气体的能量在温度固定时不变，所以分离使 $F = U - TS$ 升高 $T\Delta S_{\mathrm{mix}}$，$W_{\min} = 298\times20.80 = 6.20\times10^3\,\mathrm{J}$，五摩尔空气约 $6\,\mathrm{kJ}$。真实的空气分离厂要用掉好几倍。全同气体之间最小功为零，理当如此：没有东西可分。
:::
:::

## 麦克斯韦-玻尔兹曼分布 {#maxwell}

分子速度分布由对单个分子使用玻尔兹曼因子得到，测量用 [[#eq-phase-space]] 的相空间测度。分子位置在 $\dd^3r$、动量在 $\dd^3p$ 内的概率正比于 $e^{-\beta p^2/2m}\,\dd^3r\,\dd^3p$。对位置积分、换元到速度 $\mathbf p = m\mathbf v$：

::: theorem 麦克斯韦-玻尔兹曼分布 {#thm-maxwell}
温度 $T$ 的经典理想气体中，分子速度的概率密度为

$$
f(\mathbf v) = \left(\frac{m}{2\pi k_BT}\right)^{3/2}\exp\left(-\frac{mv^2}{2k_BT}\right),
$$ {#eq-mb-velocity}

而速率 $v = \lvert\mathbf v\rvert$ 的概率密度为

$$
F(v) = 4\pi\left(\frac{m}{2\pi k_BT}\right)^{3/2}v^2\exp\left(-\frac{mv^2}{2k_BT}\right).
$$ {#eq-mb-speed}
:::

::: proof
速度空间的密度正比于 $e^{-\beta mv^2/2} = \prod_{i=x,y,z}e^{-\beta mv_i^2/2}$。每个因子的积分是 $\sqrt{2\pi k_BT/m}$，所以归一化常数是 $(m/2\pi k_BT)^{3/2}$，即 [[#eq-mb-velocity]]。密度只依赖 $v$，所以速率落在 $[v, v + \dd v]$ 的概率是 $f$ 乘球壳体积 $4\pi v^2\,\dd v$，即得 [[#eq-mb-speed]]。
:::

推导摆明了麦克斯韦 1860 年的论证假设了什么、玻尔兹曼后来的工作证成了什么：三个速度分量独立，因为能量是三项之和；每一项是高斯的，因为每一项是二次的。分子间相互作用不改变结果，只要势能只依赖位置：那时因子 $e^{-\beta H}$ 劈成动量部分与位置部分，动量部分是同一个高斯。麦克斯韦分布不仅在理想气体里成立，在液体与稠密气体里也成立。

[[thermodynamics/kinetic-theory]] 里导出过的三个特征速率为

$$
v_p = \sqrt{\frac{2k_BT}{m}}, \qquad \langle v\rangle = \sqrt{\frac{8k_BT}{\pi m}}, \qquad v_{\mathrm{rms}} = \sqrt{\frac{3k_BT}{m}},
$$

之比 $1 : 1.128 : 1.225$。[[#eq-mb-speed]] 添上的是尾巴：比给定速率更快的分子比例。以 $x = v/v_p$，对 [[#eq-mb-speed]] 分部积分得

$$
\Prob(\text{速率} > v) = 1 - \erf(x) + \frac{2x}{\sqrt\pi}e^{-x^2}.
$$ {#eq-tail}

::: widget plot
f: 4*pi*(M/(2000*pi*8.314462618*T))^1.5*x^2*exp(-M*x^2/(2000*8.314462618*T))
x: 0, 3000
y: 0, 0.004
sliders: T=300:20:2000:10; M=28:2:132:1
caption: 麦克斯韦-玻尔兹曼速率分布 $F(v)$，单位 $(\mathrm{m/s})^{-1}$，对以 $\mathrm{m/s}$ 计的速率作图，摩尔质量 $M$ 以 $\mathrm{g/mol}$ 计。打开时是 $300\,\mathrm{K}$ 的氮气，峰在 $422\,\mathrm{m/s}$。调高 $T$，看峰右移并压低，面积保持为一。$M = 4$ 看氦：$300\,\mathrm{K}$ 下曲线漫过 $3000\,\mathrm{m/s}$。$M = 132$ 看氙：挤进 $500\,\mathrm{m/s}$ 以内。要紧的只有比值 $T/M$。
:::

::: example 氮气的快尾巴 {#ex-tail}
求 $300\,\mathrm{K}$ 下氮分子的最概然速率、平均速率与方均根速率，以及速率超过 $1000\,\mathrm{m/s}$ 的分子比例。
::: solution
$m = 28.0134\,\mathrm{u} = 4.6517\times10^{-26}\,\mathrm{kg}$，$k_BT = 4.1419\times10^{-21}\,\mathrm{J}$，

$$
v_p = \sqrt{\frac{2\times4.1419\times10^{-21}}{4.6517\times10^{-26}}} = 422\,\mathrm{m/s},\qquad \langle v\rangle = 476\,\mathrm{m/s},\qquad v_{\mathrm{rms}} = 517\,\mathrm{m/s}.
$$

尾巴：$x = 1000/422.0 = 2.370$。$\erf(2.370) = 0.99920$，$2x e^{-x^2}/\sqrt\pi = 2.674\times e^{-5.615} = 2.674\times0.003641 = 0.009737$，于是 [[#eq-tail]] 给出

$$
\Prob(v > 1000\,\mathrm{m/s}) = 1 - 0.99920 + 0.00974 = 0.0105.
$$

大约一百个分子里就有一个跑得比 $1\,\mathrm{km/s}$ 快。$2.37$ 倍最概然速率处，高斯因子是 $e^{-5.6}$；五倍处会是 $e^{-25}$。需要快分子的过程的速率——比如有活化能的化学反应——由这条尾巴控制，这就是它们对温度如此陡的原因。
:::
:::

::: application 地球为什么丢掉了它的氢
大气顶部的散层温度在 $1000\,\mathrm{K}$ 上下，碰撞稀少，所以向上运动、速度快过逃逸速度 $11.2\,\mathrm{km/s}$ 的分子就离开。由 [[#eq-tail]]，$1000\,\mathrm{K}$ 下速率超过逃逸速度的氢原子比例为 $1.6\times10^{-3}$；氦为 $5\times10^{-13}$；氧分子约 $10^{-104}$。麦克斯韦分布不断补充，$10^{-3}$ 的比例会在地质学上极短的时间内倒空一颗行星的氢，而氧被永远留住。这种热逃逸叫**金斯（Jeans）逃逸**，以詹姆斯·金斯（James Jeans）命名，他 1916 年分析了它。
:::

## 有内部结构的分子 {#internal}

分子除平动态外还有转动、振动与电子态。若内部能量与质心运动无关——对稀薄气体是极好的近似——单分子配分函数因子化：

$$
Z_1 = \frac{V}{\lambda^3}\,z_{\mathrm{int}}(T), \qquad Z_N = \frac{1}{N!}\left(\frac{V}{\lambda^3}\right)^N z_{\mathrm{int}}^N,
$$

其中 $\lambda$ 由总质量构成。因为 $z_{\mathrm{int}}$ 不依赖 $V$，压强仍是 $Nk_BT/V$：理想气体定律不关心内部结构。内部配分函数向 $F$ 添加 $-Nk_BT\ln z_{\mathrm{int}}$，并向 $U$、$S$、$C_V$ 作贡献。室温下转动对转动常数为 $B$、对称数为 $\sigma$ 的线性分子给出 $z_{\mathrm{rot}} \approx k_BT/(\sigma hcB)$，并向能量贡献一份 $k_BT$；振动如 [[statistical-mechanics/canonical]] 里算过的那样，大体冻结。化学图谱在 [分子配分函数](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=partition-function) 里把这些因子、以及由此得到的热容与熵逐一算清，并在 [由分子数据求平衡常数](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=equilibrium-from-molecules) 里用它们计算平衡常数。

::: quiz
双原子分子的理想气体与原子的理想气体处于相同的 $T$、$V$、$N$。哪些量对两种气体必然相同？
- [x] 压强。
- [ ] 内能。
- [x] 若分子质量与原子质量相等，速率的麦克斯韦分布。
- [ ] 熵。
::: solution
压强是 $-\partial F/\partial V$，而内部配分函数不依赖 $V$，所以两种气体都有 $P = Nk_BT/V$。速率分布只依赖 $m$ 与 $T$，因为质心运动与内部运动因子化。能量与熵对分子有额外的内部贡献：$U$ 至少从转动多得 $Nk_BT$，$S$ 多得 $Nk_B(\ln z_{\mathrm{rot}} + 1)$。
:::
:::

::: history 麦克斯韦、吉布斯、萨库尔与特特罗德
詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）1860 年从"三个速度分量统计独立、分布只依赖速率"的假设导出了速度分布；玻尔兹曼自 1868 年起从碰撞动力学把它导出，并推广到外场中的分子。吉布斯在《关于多相物质的平衡》（*On the Equilibrium of Heterogeneous Substances*，1875–1878）里讨论了混合熵，并在 1902 年的书中区分了"类"（generic）相与"特"（specific）相——前者交换全同粒子给出同一个态；数"类"相就是因子 $1/N!$。奥托·萨库尔（Otto Sackur）1911 年与雨果·特特罗德（Hugo Tetrode）1912 年各自独立地把相空间切成体积 $h^3$ 的胞，算出单原子气体的绝对熵，并说明结果与汞的饱和蒸气压数据相符。在一个没有辐射的问题里动用普朗克常量，这用的是整整十多年后量子力学才解释"胞为什么是那个大小"的常量，堪称壮举。
:::

## 后续内容 {#leads}

经典气体是某个更大东西的 $n\lambda^3 \ll 1$ 极限。[[statistical-mechanics/quantum-statistics]] 撤掉"没有两个粒子共享一个态"的假设，直接数占据数，使用巨正则系综；麦克斯韦-玻尔兹曼分布作为玻色-爱因斯坦分布与费米-狄拉克分布的公共极限重新出现，本章的化学势 $\mu = k_BT\ln(n\lambda^3)$ 就是那座桥。[[statistical-mechanics/bose-fermi]] 随后研究 $n\lambda^3$ 到一甚至更大时发生什么：金属与白矮星中的电子，以及玻色-爱因斯坦凝聚体。气体分子间的相互作用——把气体变成液体的那种——是 [[statistical-mechanics/phase-transitions]] 的起点；对化学家，也是 [相互作用的分子：实际气体与液体](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=real-gases-liquids) 的起点。

::: summary
- 体积 $V$ 的箱中的自由粒子有 $Z_1 = V/\lambda^3$，热波长 $\lambda = h/\sqrt{2\pi mk_BT}$；等价地，相空间每 $h^3$ 一个量子态。
- $n\lambda^3 \ll 1$ 的 $N$ 个全同粒子：$Z_N = Z_1^N/N!$。$1/N!$ 去掉全同粒子的置换；没有它熵不广延（吉布斯佯谬）。
- 由 $F = -Nk_BT[\ln(V/N\lambda^3) + 1]$ 推出 $PV = Nk_BT$、$U = \tfrac32Nk_BT$ 与 $\mu = k_BT\ln(n\lambda^3)$——经典区里 $\mu$ 大而负。
- 萨库尔-特特罗德熵 $S = Nk_B[\ln(V/N\lambda^3) + \tfrac52]$ 给出与量热相符的单原子气体绝对熵，如 $298.15\,\mathrm{K}$、$1\,\mathrm{bar}$ 的氩为 $154.8\,\mathrm{J/(mol\cdot K)}$。
- 等 $T$ 等 $P$ 下两种不同理想气体各 $N$ 个原子之间的隔板撤去，$\Delta S = 2Nk_B\ln2$；两边同种气体则得零。
- 麦克斯韦-玻尔兹曼分布由玻尔兹曼因子导出；速率超过 $v$ 的尾巴比例为 $1 - \erf(x) + 2xe^{-x^2}/\sqrt\pi$，其中 $x = v/v_p$。
- $n\lambda^3$ 接近 $1$ 时经典公式失效：液氦、金属中的电子、超冷原子气体。
:::

## 习题 {#exercises}

::: exercise 氦的热波长 {level=1 check="50.4"}
求氦-4 原子（质量 $4.002602\,\mathrm{u}$）在 $300\,\mathrm{K}$ 下的热波长，以皮米计，取三位有效数字。用 $1\,\mathrm{u} = 1.66053906660\times10^{-27}\,\mathrm{kg}$。
::: solution
质量 $m = 4.002602\times1.66053906660\times10^{-27} = 6.6465\times10^{-27}\,\mathrm{kg}$，

$$
2\pi mk_BT = 2\pi\times6.6465\times10^{-27}\times1.380649\times10^{-23}\times300 = 1.7297\times10^{-46}\,\mathrm{kg^2\,m^2/s^2}.
$$

其平方根为 $1.3152\times10^{-23}\,\mathrm{kg\,m/s}$，所以 $\lambda = 6.62607015\times10^{-34}/1.3152\times10^{-23} = 5.04\times10^{-11}\,\mathrm{m} = 50.4\,\mathrm{pm}$。
:::
:::

::: exercise 空气是经典的吗？ {level=1 check="1.69e-7"}
求 $300\,\mathrm{K}$、$101325\,\mathrm{Pa}$ 下氮气（$m = 28.0134\,\mathrm{u}$）的 $n\lambda^3$，取三位有效数字。
::: solution
数密度 $n = P/k_BT = 101325/(4.1419\times10^{-21}) = 2.446\times10^{25}\,\mathrm{m^{-3}}$。以 $m = 4.6517\times10^{-26}\,\mathrm{kg}$，

$$
\lambda = \frac{6.62607015\times10^{-34}}{\sqrt{2\pi\times4.6517\times10^{-26}\times4.1419\times10^{-21}}} = 1.904\times10^{-11}\,\mathrm{m},
$$

于是 $\lambda^3 = 6.906\times10^{-33}\,\mathrm{m^3}$，$n\lambda^3 = 1.69\times10^{-7}$。判据 [[#eq-classical-condition]] 以很大的余量成立。
:::
:::

::: exercise 混合氦与氩 {level=1 check="11.53"}
一摩尔氦与一摩尔氩，同温同压，被隔板隔开。撤去隔板。求熵变，以 $\mathrm{J/K}$ 计，取四位有效数字。
::: solution
这就是 [[#prop-mixing]]，每种气体 $N = N_A$。每种气体在温度不变下体积加倍，获得 $R\ln2$：

$$
\Delta S = 2R\ln2 = 2\times8.314462618\times0.693147 = 11.53\,\mathrm{J/K}.
$$

原子的质量不参与；参与的事实只有一个：它们是不同气体。
:::
:::

::: exercise 氖的绝对熵 {level=2 check="146.3"}
用萨库尔-特特罗德方程计算 $298.15\,\mathrm{K}$、$1.00\times10^5\,\mathrm{Pa}$ 下氖（$m = 20.1797\,\mathrm{u}$）的摩尔熵，以 $\mathrm{J/(mol\cdot K)}$ 计，取四位有效数字。
::: solution
每个原子的体积 $k_BT/P = 4.1164\times10^{-26}\,\mathrm{m^3}$，与氩相同。质量 $m = 3.3510\times10^{-26}\,\mathrm{kg}$，于是

$$
\lambda = \frac{h}{\sqrt{2\pi mk_BT}} = 2.2507\times10^{-11}\,\mathrm{m}, \qquad \lambda^3 = 1.1401\times10^{-32}\,\mathrm{m^3}.
$$

于是 $V/(N\lambda^3) = 3.610\times10^6$，对数为 $15.099$，

$$
S_m = R(15.099 + 2.5) = 8.314462618\times17.599 = 146.3\,\mathrm{J/(mol\cdot K)}.
$$

表列值为 $146.33\,\mathrm{J/(mol\cdot K)}$。同 $T$ 同 $P$ 下氖的熵比氩低，因为它更轻：$\lambda$ 更大，可及的动量态更少。差为 $\tfrac32R\ln(m_{\mathrm{Ar}}/m_{\mathrm{Ne}}) = 8.52\,\mathrm{J/(mol\cdot K)}$。
:::
:::

::: exercise 定容加热 {level=2 check="8.645"}
一摩尔单原子理想气体在体积不变下从 $300\,\mathrm{K}$ 加热到 $600\,\mathrm{K}$。用 [[#eq-sackur-tetrode]] 求 $\Delta S$，以 $\mathrm{J/K}$ 计，取四位有效数字，并用 $\int C_V\,\dd T/T$ 校核答案。
::: solution
[[#eq-sackur-tetrode]] 里只有 $\lambda$ 依赖 $T$，且 $\lambda^{-3} \propto T^{3/2}$。于是

$$
\Delta S = Nk_B\ln\frac{\lambda(300)^3}{\lambda(600)^3} = R\ln\left(\frac{600}{300}\right)^{3/2} = \tfrac32R\ln2 = 8.645\,\mathrm{J/K}.
$$

热力学一侧：$C_V = \tfrac32R$，$\int_{300}^{600}C_V\,\dd T/T = \tfrac32R\ln2$，相同。统计公式与克劳修斯定义在每个差上一致；统计公式还额外定出了绝对值。
:::
:::

::: exercise 超过逃逸速度的氢 {level=2 check="1.65e-3"}
用 [[#eq-tail]] 求 $1000\,\mathrm{K}$ 的气体中，氢原子（$m = 1.00784\,\mathrm{u}$）速率超过 $11.2\,\mathrm{km/s}$ 的比例，取三位有效数字。
::: solution
最概然速率 $v_p = \sqrt{2k_BT/m} = \sqrt{2\times1.380649\times10^{-20}/1.6736\times10^{-27}} = 4062\,\mathrm{m/s}$。于是 $x = 11200/4062 = 2.757$，$x^2 = 7.602$。误差函数 $\erf(2.757) = 0.999904$，所以 $1 - \erf(x) = 9.6\times10^{-5}$，而

$$
\frac{2x}{\sqrt\pi}e^{-x^2} = 3.111\times4.99\times10^{-4} = 1.553\times10^{-3}.
$$

比例为 $9.6\times10^{-5} + 1.553\times10^{-3} = 1.65\times10^{-3}$。第二项占主导：深入尾巴处，$\Prob(v > v_0)$ 像 $(2x/\sqrt\pi)e^{-x^2}$。
:::
:::

::: exercise 定量化后的佯谬 {level=3}
设 $1/N!$ 被省略，$Z' = Z_1^N$、$Z_1 = V/\lambda^3$。求由此得到的熵 $S'(T, V, N)$，证明 $S'(T, 2V, 2N) \neq 2S'(T, V, N)$ 并算出差。然后证明正确的熵 [[#eq-sackur-tetrode]] 对每个 $\alpha > 0$ 满足 $S(T, \alpha V, \alpha N) = \alpha S(T, V, N)$，并指出推导中是哪一步负责。
::: hint
对 $Z'$，$F' = -Nk_BT\ln(V/\lambda^3)$ 而 $U$ 不变。算 $S' = (U - F')/T$。
:::
::: solution
没有 $1/N!$ 时 $\ln Z' = N\ln(V/\lambda^3)$。能量只依赖 $\beta$ 依赖关系，而它未变，所以 $U = \tfrac32Nk_BT$，且

$$
S' = \frac{U - F'}{T} = Nk_B\left[\ln\frac{V}{\lambda^3} + \frac32\right].
$$

于是

$$
S'(T, 2V, 2N) - 2S'(T, V, N) = 2Nk_B\left[\ln\frac{2V}{\lambda^3} + \frac32\right] - 2Nk_B\left[\ln\frac{V}{\lambda^3} + \frac32\right] = 2Nk_B\ln2 \neq 0.
$$

所以 $S'$ 不广延，而且它预言全同气体之间有 $2Nk_B\ln2$ 这个冒牌的混合熵。

对正确的熵，$V/N$ 在 $V \to \alpha V$、$N \to \alpha N$ 下不变，而 $\lambda$ 只依赖 $T$：

$$
S(T, \alpha V, \alpha N) = \alpha Nk_B\left[\ln\frac{\alpha V}{\alpha N\lambda^3} + \frac52\right] = \alpha S(T, V, N).
$$

负责的一步是 [[#eq-f-gas]] 里的 $\ln N! \approx N\ln N - N$：$-N\ln N$ 项把 $N\ln V$ 变成 $N\ln(V/N)$，$+N$ 项把 $\tfrac32$ 变成 $\tfrac52$。没有 $1/N!$，熵会比应有值多长 $Nk_B\ln N$，而这一份不与 $N$ 成正比。
:::
:::

::: exercise 二维气体 {level=3}
吸附在面积为 $A$ 的平坦表面上的原子可沿表面自由运动而不能离开，形成二维理想气体。导出配分函数、关于铺展压 $\Pi = -(\partial F/\partial A)_{T,N}$ 的物态方程、能量与熵，并陈述结果成立的条件。
::: hint
把 [[#thm-z1]] 用两个方向而非三个重复一遍。相空间规则现在是每 $h^2$ 一个态。
:::
::: solution
二维运动下箱的求和有两个因子，每个 $L/\lambda$，所以 $Z_1 = A/\lambda^2$，$\lambda = h/\sqrt{2\pi mk_BT}$ 不变。$N\lambda^2/A \ll 1$ 的 $N$ 个全同原子：$Z_N = (A/\lambda^2)^N/N!$，且

$$
F = -Nk_BT\left[\ln\frac{A}{N\lambda^2} + 1\right].
$$

铺展压 $\Pi = -\partial F/\partial A = Nk_BT/A$，二维理想气体定律。由 $\lambda^{-2} \propto \beta^{-1}$，$\ln Z_N = N\ln(1/\beta) + \text{const}$，$U = Nk_BT$：每个原子两个二次项，能量均分的要求。熵为

$$
S = \frac{U - F}{T} = Nk_B\left[\ln\frac{A}{N\lambda^2} + 2\right],
$$

二维的萨库尔-特特罗德方程。它与 $(A, N)$ 广延的原因与先前相同。成立条件是 $(N/A)\lambda^2 \ll 1$：每面积 $\lambda^2$ 上原子很少。模型略去了与表面的束缚；束缚贡献因子 $e^{\beta\varepsilon_b}$ 和每个原子一份振动配分函数，它们给 $Z_1$ 乘的是与 $A$ 无关的量，所以改变 $U$、$S$、$\mu$，但不改变 $\Pi$。
:::
:::
