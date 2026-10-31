[[thermodynamics/entropy]] 中证明的恒等式，

$$
\dd U = T\,\dd S - P\,\dd V,
$$ {#eq-du}

把内能写成熵与体积的函数。那是它的自然变量：$T$ 与 $P$ 以导数形式出来，

$$
T = \left(\pdv{U}{S}\right)_{V}, \qquad P = -\left(\pdv{U}{V}\right)_{S}.
$$

实验室很少保持 $S$ 固定。它靠与热源接触保持温度固定，靠对着大气的活塞保持压强固定。本章的势，就是自然变量恰为仪器实际控制的那些变量的函数。它们由 $U$ 减去 $TS$、或加上 $PV$、或两者都做而得到。没有测量任何新东西。同样是那些平衡态，只是换用一个更方便的函数来标注。

符号约定仍是 [[thermodynamics/first-law]] 的那一个。第一定律是 $\Delta U = Q + W$，$W$ 是对系统做的功，准静态膨胀贡献 $W = -\int P\,\dd V$。下面四个微分都针对只有膨胀功这一种功的闭静水压系统。额外的功，无论是电功还是别的，都要添一项。章末的警告又说了一遍，因为把公式抄进新题目时，被忘掉最多的就是这个假设。

## 焓

在大气压下加热一个烧杯，你供给的热不是 $\Delta U$。系统受热膨胀，对大气做功，一部分热替那份功买了单。与热直接对上的组合是 $U + PV$。

::: definition 焓 {#def-enthalpy}
一个静水压系统的**焓**为

$$
H = U + PV.
$$ {#eq-h}

$H$ 是态函数，因为 $U$、$P$ 与 $V$ 都是。它的 SI 单位是焦耳。
:::

考虑一个过程：唯一的功是膨胀功，外压 $P$ 恒定，系统从同一压强下的平衡出发、到它结束。于是 $W = -P\,\Delta V$，所以

$$
\Delta U = Q - P\,\Delta V.
$$

整理得 $Q = \Delta U + P\,\Delta V$。在 $P$ 恒定时，右端就是 $\Delta(U + PV)$：

$$
Q_P = \Delta H.
$$ {#eq-qp}

下标记下了条件。[[#eq-qp]] 无论过程是否可逆都成立，只要功确是对那个恒定外压做的 $-P\,\Delta V$、且没有别的功。敞口容器里的反应、平衡蒸气压下的相变、理想气体的缓慢等压升温，全在它管辖之内。定容升温则不在：那里 $W = 0$、$Q_V = \Delta U$。

对理想气体，$PV = nRT$ 且 $U$ 只依赖 $T$，所以

$$
H = U + nRT
$$

也只依赖 $T$。取常数摩尔热容，$\Delta H = n C_{P,m}\,\Delta T$、$\Delta U = n C_{V,m}\,\Delta T$。两者之差是 $nR\,\Delta T$，正是等压路径上的 $-W$：定压下的热超出内能增量一份，就是对外界大气做的那份功——带负号是因为那份功在我们的约定下为负。单原子气体有 $C_{V,m} = \tfrac{3}{2} R$、$C_{P,m} = \tfrac{5}{2} R$。室温下的双原子气体，转动已激发、振动未激发，有 $C_{V,m} = \tfrac{5}{2} R$、$C_{P,m} = \tfrac{7}{2} R$。

::: example 定压加热单原子气体 {#ex-enthalpy}
两摩尔理想单原子气体在定压下从 $300\,\mathrm{K}$ 加热到 $360\,\mathrm{K}$。求 $\Delta H$、$\Delta U$ 以及对气体做的功。
::: solution
对理想气体，焓只依赖温度，且定压下由 [[#eq-qp]] 有 $Q = \Delta H$。取 $C_{P,m} = \tfrac{5}{2} R$、$R = 8.314462618\,\mathrm{J/(mol\cdot K)}$，

$$
\Delta H = n C_{P,m}\,\Delta T = 2.00\times\tfrac{5}{2}\times R\times 60.0.
$$

先算 $\tfrac{5}{2} R = 20.786156545\,\mathrm{J/(mol\cdot K)}$，再算 $n C_{P,m} = 41.57231309\,\mathrm{J/K}$，于是

$$
\Delta H = 41.57231309\times 60.0 = 2494.34\,\mathrm{J}.
$$

内能用 $C_{V,m} = \tfrac{3}{2} R$：

$$
\Delta U = 2.00\times\tfrac{3}{2}\times R\times 60.0 = 3 R\times 60.0 = 180\, R = 1496.60\,\mathrm{J}.
$$

第一定律接着给出对气体做的功，$W = \Delta U - Q = \Delta U - \Delta H$：

$$
W = 1496.60 - 2494.34 = -997.74\,\mathrm{J}.
$$

直接的等压公式同意这一结果。$W = -P\,\Delta V = -nR\,\Delta T = -2.00\times R\times 60.0 = -997.74\,\mathrm{J}$。气体膨胀，外界对它做负功。把 $Q$ 报成 $\Delta U$ 会漏掉这 $998\,\mathrm{J}$，说错炉子必须供给的热。
:::
:::

## 亥姆霍兹自由能

焓把变量 $V$ 换成了 $P$。温度仍不是 $H$ 的自变量：$H$ 的自然变量将是 $S$ 与 $P$。要把 $T$ 立为自变量，就减去乘积 $TS$。乘积法则随即把 [[#eq-du]] 里的 $T\,\dd S$ 项与 $\dd(TS)$ 的一部分相消，$T$ 作为你求导所对的那个变量存活下来。

::: definition 亥姆霍兹自由能 {#def-helmholtz}
**亥姆霍兹自由能（Helmholtz free energy）**为

$$
F = U - TS.
$$ {#eq-f}

$F$ 是态函数。它的 SI 单位是焦耳。"自由能"这个名字要放到下面的平衡判据之后再解读：固定温度下，$-\Delta F$ 是系统所能做的最大功。
:::

$F$ 是广延量，因为 $U$ 与 $S$ 是广延量而 $T$ 是强度量。固定每摩尔的 $T$ 与 $V$ 把样品加倍，$F$ 也加倍。本章只出现 $F$ 的差值，或从注明参考态算出的数值，因为 $S$ 本身只定到差一个常数。$S$ 里的常数会让 $F$ 平移 $-T$ 倍那个常数，但不影响单一温度下的 $\Delta F$。它会影响两个不同温度下 $F$ 的比较，而我们用不到那种比较。

固定温度下，[[#eq-f]] 的微分塌缩为 $\Delta F = \Delta U - T\,\Delta S$，只要端点是同一温度 $T$ 下的平衡态。与 $\Delta U = Q + W$ 以及 [[thermodynamics/entropy]] 的克劳修斯界 $Q \le T\,\Delta S$ 合并，这就是

$$
W \ge \Delta F,
$$ {#eq-w-f}

可逆路径上取等号。对系统做*的*功至少是 $\Delta F$。等价地，系统对外做*的*功至多是 $-\Delta F$。若 $\Delta F$ 为负，系统可以交付功；可逆路径交付得最多。若 $\Delta F$ 为正，即使最好的情形也必须对系统做功。[[#eq-w-f]] 就是 $F$ 被称为自由能的原因：$-\Delta F$ 是能量变化中可以自由以功的形式离开的那部分——在把熵的代价 $T\,\Delta S$ 付给维持恒温的热源之后。

这个界假设系统的初末温度等于热源温度，从而 $Q \le T\,\Delta S$ 里只有一个 $T$。它不假设体积恒定。定容下、只有膨胀功时 $W = 0$，[[#eq-w-f]] 变成 $0 \ge \Delta F$。固定 $T$ 与 $V$ 下的自发过程抬不高 $F$。那条判据与其余的一起在下面证明。这里的要点是记账：$F$ 把 $U$ 与 $TS$ 打包在一起，使第二定律对热的界变成对功的界。

## 吉布斯自由能

多数化学变化与相变既在定压也在定温下进行。在那里有界的函数，是在 $F$ 上再加 $PV$，或从 $H$ 中减去 $TS$。

::: definition 吉布斯自由能 {#def-gibbs}
**吉布斯自由能（Gibbs free energy）**为

$$
G = U - TS + PV = H - TS = F + PV.
$$ {#eq-g}

$G$ 是态函数。它的 SI 单位是焦耳。
:::

三个表达式作为平衡态上的函数完全相同。你微分哪一个，取决于你已经信任哪一个微分。对单一组元的纯物质，$G$ 对物质的量是广延的，所以

$$
G = n\mu,
$$

其中 $\mu$ 是每摩尔的吉布斯函数。$\mu$ 这个量是该物质的化学势。对 $\mu$ 的正式处理——包括混合物、反应，以及开系恒等式中的 $\mu\,\dd n$ 项——属于后面的课程。我们把 $G = n\mu$ 只当作纯理想气体摩尔吉布斯函数的名字来用，而且只用来读出 $\mu$ 如何依赖压强。这里不算任何反应。

::: quiz
一摩尔理想气体被等温压缩，压强从 $P$ 到 $2P$。哪句话是对的？
- [ ] $\Delta G = 0$，因为理想气体的每个等温过程都有 $\Delta U = 0$，而 $G$ 跟着 $U$ 走
- [ ] $\Delta U = RT\ln 2$ 且 $\Delta G = 0$
- [x] $\Delta U = 0$ 且 $\Delta G = RT\ln 2$
- [ ] $\Delta G = -RT\ln 2$，因为体积减小，而 $G$ 必须跟着 $V$ 走
::: solution
对理想气体，等温线有 $\Delta U = 0$、$\Delta H = 0$，因为 $U$ 与 $H$ 都只依赖 $T$。吉布斯函数却不是。固定 $T$ 时 $\dd G = V\,\dd P$，所以 $\Delta G = \int V\,\dd P = RT\ln(P_2/P_1) = RT\ln 2$，压缩时为正是自然的。$G = F + PV$ 里的体积项变了，$F$ 也变化同一分量，两个变化并不相消：理想气体等温线上 $\Delta(PV) = \Delta(nRT) = 0$，所以 $\Delta G = \Delta F = RT\ln 2$。
:::
:::

## 微分与自然变量

每个势都是态函数的复合，所以每个都有一个由 [[#eq-du]] 与乘积法则定下的微分。留在右端充当微分的那些变量，就是那个势的自然变量。

::: theorem 四个势的微分 {#thm-differentials}
对只有膨胀功的闭静水压系统，

$$
\begin{aligned}
\dd U &= T\,\dd S - P\,\dd V, \\
\dd H &= T\,\dd S + V\,\dd P, \\
\dd F &= -S\,\dd T - P\,\dd V, \\
\dd G &= -S\,\dd T + V\,\dd P.
\end{aligned}
$$ {#eq-four}

于是

$$
\begin{aligned}
T &= \left(\pdv{U}{S}\right)_{V} = \left(\pdv{H}{S}\right)_{P}, \\
P &= -\left(\pdv{U}{V}\right)_{S} = -\left(\pdv{F}{V}\right)_{T}, \\
S &= -\left(\pdv{F}{T}\right)_{V} = -\left(\pdv{G}{T}\right)_{P}, \\
V &= \left(\pdv{H}{P}\right)_{S} = \left(\pdv{G}{P}\right)_{T}.
\end{aligned}
$$ {#eq-derivatives}
:::

::: proof
第一行是 [[#eq-du]]，从 [[thermodynamics/entropy#thm-identity]] 携带而来。它是相邻平衡态之间的等式，不是不等式，也不是关于不可逆过程的真实热的断言。

焓：微分 [[#eq-h]]：$\dd H = \dd U + P\,\dd V + V\,\dd P$。代入 $\dd U = T\,\dd S - P\,\dd V$。两个 $P\,\dd V$ 项相消：

$$
\dd H = T\,\dd S - P\,\dd V + P\,\dd V + V\,\dd P = T\,\dd S + V\,\dd P.
$$

自然变量是 $S$ 与 $P$。固定 $S$，$\dd H = V\,\dd P$。固定 $P$，$\dd H = T\,\dd S$，这正是可逆等压陈述 $Q_P = \Delta H$ 用 $\text{đ}Q_{\mathrm{rev}} = T\,\dd S$ 写出的样子。

亥姆霍兹函数：微分 [[#eq-f]]：$\dd F = \dd U - T\,\dd S - S\,\dd T$。代入 [[#eq-du]]：

$$
\dd F = T\,\dd S - P\,\dd V - T\,\dd S - S\,\dd T = -S\,\dd T - P\,\dd V.
$$

自然变量是 $T$ 与 $V$。特别地，固定 $T$ 时，

$$
\dd F = -P\,\dd V,
$$ {#eq-df-isotherm}

所以可逆等温体积变化有 $W = \Delta F$，与 [[#eq-w-f]] 的取等一致。

吉布斯函数从 $G = H - TS$ 出发，一旦 $\dd H$ 已知这是最短的路线：

$$
\dd G = \dd H - T\,\dd S - S\,\dd T = T\,\dd S + V\,\dd P - T\,\dd S - S\,\dd T = -S\,\dd T + V\,\dd P.
$$

自然变量是 $T$ 与 $P$。固定 $T$ 时，

$$
\dd G = V\,\dd P.
$$ {#eq-dg-isotherm}

[[#eq-derivatives]] 的四行就是这些微分按偏导数来读。每个下标点名被保持固定的那个自然变量，它是陈述的一部分。$\left(\pdv{G}{P}\right)_{T} = V$ 与 $\left(\pdv{G}{P}\right)_{S}$ 不是同一个操作。
:::

这套模式是一次变量替换，常称为勒让德变换（Legendre transform）。你用一个广延自变量（$S$ 或 $V$）去换与它共轭的那个强度导数（$T$ 或 $P$），办法是减去或加上这对变量的乘积。当新变量正是实验保持固定的那一个，这笔交换就值得。当你只想要个新字母来表示同一个导数时，它不值得：$H$、$F$ 与 $G$ 挣得饭碗，靠的是把 $T$ 与 $P$ 搬进自变量清单，以及隔一节的那些不等式。

::: intuition 每次减去除去了什么
$U$ 对每次熵变、每次体积变都要收费。减去 $TS$ 抹掉熵的账，把温度留成你拧的旋钮。加上 $PV$ 抹掉 $\dd U$ 里的体积账，把压强留成旋钮。两样都做，剩下 $T$ 与 $P$，这就是为什么 $G$ 是恒温槽里一只敞口容器中台面实验的势。交换的代价是你必须知道 $S$，或者愿意计算那些 $S$ 中未知常数会相消的差。
:::

## 麦克斯韦关系

光滑函数的混合二阶偏导数相等。把这件事用于 $U(S, V)$、$H(S, P)$、$F(T, V)$ 与 $G(T, P)$，这个相等就是 $T$、$S$、$P$ 与 $V$ 之间的一组关系。它们有用，是因为有的导数难测、另一些不难。熵对体积的偏导数（定温下）不是常规实验操作。压强对温度的偏导数（定容下）则是物态方程里的现成一项。

::: theorem 麦克斯韦关系 {#thm-maxwell}
设势的二阶导数存在且连续，使混合偏导可交换次序。则

$$
\begin{aligned}
\left(\pdv{T}{V}\right)_{S} &= -\left(\pdv{P}{S}\right)_{V}, \\
\left(\pdv{T}{P}\right)_{S} &= \left(\pdv{V}{S}\right)_{P}, \\
\left(\pdv{S}{V}\right)_{T} &= \left(\pdv{P}{T}\right)_{V}, \\
\left(\pdv{S}{P}\right)_{T} &= -\left(\pdv{V}{T}\right)_{P}.
\end{aligned}
$$ {#eq-maxwell}
:::

::: proof
从 $\dd U = T\,\dd S - P\,\dd V$ 出发。$\dd S$ 的系数是 $T = \left(\pdv{U}{S}\right)_{V}$，$\dd V$ 的系数是 $-P = \left(\pdv{U}{V}\right)_{S}$。第一个对 $V$ 求导（固定 $S$），第二个对 $S$ 求导（固定 $V$）：

$$
\left(\pdv{T}{V}\right)_{S} = \frac{\partial^2 U}{\partial V\,\partial S}, \qquad -\left(\pdv{P}{S}\right)_{V} = \frac{\partial^2 U}{\partial S\,\partial V}.
$$

二阶导的连续性让两个混合偏导相等，这就是 [[#eq-maxwell]] 的第一行。

同样解读 $\dd G = -S\,\dd T + V\,\dd P$，得 $-S = \left(\pdv{G}{T}\right)_{P}$ 与 $V = \left(\pdv{G}{P}\right)_{T}$。把 $-S$ 的表达式对 $P$ 求导（固定 $T$），把 $V$ 的表达式对 $T$ 求导（固定 $P$）：

$$
-\left(\pdv{S}{P}\right)_{T} = \frac{\partial^2 G}{\partial P\,\partial T}, \qquad \left(\pdv{V}{T}\right)_{P} = \frac{\partial^2 G}{\partial T\,\partial P}.
$$

混合偏导相等整理成第四行，$\left(\pdv{S}{P}\right)_{T} = -\left(\pdv{V}{T}\right)_{P}$。

亥姆霍兹函数：$\dd F = -S\,\dd T - P\,\dd V$ 的系数是 $-S = \left(\pdv{F}{T}\right)_{V}$ 与 $-P = \left(\pdv{F}{V}\right)_{T}$。第一个对 $V$ 求导（固定 $T$），第二个对 $T$ 求导（固定 $V$）：

$$
\frac{\partial^2 F}{\partial V\,\partial T} = -\left(\pdv{S}{V}\right)_{T}, \qquad \frac{\partial^2 F}{\partial T\,\partial V} = -\left(\pdv{P}{T}\right)_{V}.
$$

混合偏导一致，负号相消，留下 $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$。

焓：$\dd H = T\,\dd S + V\,\dd P$ 的系数是 $T = \left(\pdv{H}{S}\right)_{P}$ 与 $V = \left(\pdv{H}{P}\right)_{S}$。第一个对 $P$ 求导（固定 $S$），第二个对 $S$ 求导（固定 $P$），得

$$
\left(\pdv{T}{P}\right)_{S} = \left(\pdv{V}{S}\right)_{P},
$$

这就是 [[#eq-maxwell]] 的第二行。
:::

四个关系不是彼此独立的物理。它们是同一件事——混合偏导相等——在四个函数上的读法。你只需要固定变量与实验相匹配的那一个。固定 $S$ 的导数是难办的那类，因为保持熵固定意味着一条可逆绝热线。下面用到的是固定 $T$ 的两个关系。

## 变化何时能自发进行

[[#eq-four]] 联系相邻的平衡态。它没有说一个约束一旦松开会朝哪个方向动。那个问题要用第二定律，而好用的包装是一个与 [[#eq-du]] 形状相同的不等式。

取一个闭系统，它能与恒温 $T$ 的外界交换热，能与恒压 $P$ 的外界交换膨胀功。不做别的功。第一定律写作 $\Delta U = Q + W = Q - P\,\Delta V$，$W$ 是对系统做的功。外界足够大，把热 $-Q$ 交给它不改变它的温度，所以外界的熵变是 $\Delta S_{\mathrm{surr}} = -Q/T$。系统加外界构成孤立的复合体。由 [[thermodynamics/entropy]] 的推论，复合体的熵不减少：

$$
\Delta S - \frac{Q}{T} \ge 0,
$$

其中 $\Delta S$ 是系统在其初末平衡态之间的熵变。于是 $Q \le T\,\Delta S$。代入第一定律：

$$
\Delta U \le T\,\Delta S - P\,\Delta V.
$$ {#eq-inequality}

这里 $T$ 与 $P$ 是外界的属性。在我们使用下面的判据时，它们在两个端点等于系统自己的温度与压强，但不可逆过程进行期间，系统完全可以没有单一的温度或压强。过程可逆时取等号：不产生熵，系统的温度匹配 $T$，压强匹配 $P$。恒等式 $\dd U = T\,\dd S - P\,\dd V$ 是另一件事。它用系统自己的 $T$ 与 $P$，它是等式，因为两边都由平衡态算出。[[#eq-inequality]] 是对过程的限制。把两者混为一谈，就是把一个可逆微分误读成变化的方向。

::: theorem 定温下的判据 {#thm-criteria}
考虑一个只有膨胀功的闭系统。让外界处于恒定温度 $T$，并在压强有定时处于恒定压强 $P$；让系统从平衡出发、到平衡结束，同一 $T$，并在相关处同一 $P$。

- 定温定容下，自发过程有 $\Delta F \le 0$。
- 定温定压下，自发过程有 $\Delta G \le 0$。

可逆过程取等号。定 $T$ 与 $V$ 下 $\Delta F > 0$、或定 $T$ 与 $P$ 下 $\Delta G > 0$ 的过程，不会自己发生。
:::

::: proof
从 [[#eq-inequality]] 出发。定容下 $\Delta V = 0$，所以 $\Delta U \le T\,\Delta S$，即 $\Delta U - T\,\Delta S \le 0$。端点同温 $T$，所以亥姆霍兹函数的变化是

$$
\Delta F = \Delta(U - TS) = \Delta U - T\,\Delta S,
$$

$S\,\Delta T$ 那块缺席，因为端点之间 $\Delta T = 0$。因此 $\Delta F \le 0$。

定温定压下，端点共用一个 $T$ 和一个 $P$，所以

$$
\Delta G = \Delta(U - TS + PV) = \Delta U - T\,\Delta S + P\,\Delta V.
$$

[[#eq-inequality]] 说右端至多零。因此 $\Delta G \le 0$。

若过程可逆，[[#eq-inequality]] 取等号，两个结论也随之取等。若定 $T$ 与 $V$ 下 $\Delta F > 0$，那条不等式将要求复合体的熵下降，而 [[thermodynamics/entropy]] 禁止这一点。把 $\Delta F$ 换成 $\Delta G$ 的同一句话覆盖定 $T$ 与 $P$。
:::

把固定变量读成外界强制实施的变量，而不是读成 $F$ 或 $G$ 守恒的断言。定 $T$ 与 $V$ 的可逆路径上，[[#eq-df-isotherm]] 给出 $\dd F = -P\,\dd V = 0$，所以 $F$ 不变：只有膨胀功而无处可膨胀时，可逆过程无事可做。$F$ 的自发下降是某个别的约束——一块隔板、一种催化剂、一个亚稳相——的不可逆释放，此后新的平衡落在更低的 $F$ 上。对没有这类约束的纯理想气体，固定 $T$ 与 $V$ 已经定住了态，我们没有可评判 $\Delta F$ 的过程。下一节的理想气体计算是两个不同体积或压强的态之间的差。它们等于从一态到另一态的可逆功。它们本身不是定 $V$ 下、也不是定 $P$ 下的自发过程。

配套的判据各值得一句话，因为它们解释了这些名字。定 $S$ 与 $V$ 下，[[#eq-inequality]] 配着可逆绝热线来想是用错了工具；正面的陈述是孤立系统的熵极大，即定 $U$ 与 $V$ 下的 $\Delta S \ge 0$。定 $S$ 与 $P$ 下，与导出 $\Delta G \le 0$ 同一风格的论证给出 $\Delta H \le 0$。那种情形我们用不到。实验室的情形是 $F$ 与 $G$。

[[#eq-w-f]] 是同一个界的功形式。端点定温下 $W \ge \Delta F$，所以对系统做的功不会比 $\Delta F$ 更小，系统对外做的功不会超过 $-\Delta F$。若此外压强保持固定、而我们又只要 $P\,\dd V$ 功以外的功，那份对系统做的额外功至少是 $\Delta G$。电功是常见例子，它恰好是我们的微分留下没写的那一项。在那一项补回来之前，不要把 $-\Delta G$ 当作电池能做的功来引用。

## 等温线上的理想气体

对理想气体，$U$ 与 $H$ 只依赖 $T$。等温线因此有 $\Delta U = 0$、$\Delta H = 0$。吉布斯函数与亥姆霍兹函数共享不了这份冷淡。它们的等温线是压强比的——或体积比的——对数，两个对数一致，因为 $PV = nRT$ 使 $\Delta(PV) = 0$ 每当 $T$ 固定、$n$ 固定。

::: proposition 理想气体的等温吉布斯与亥姆霍兹变化 {#prop-isotherm}
$n$ 摩尔理想气体等温地从压强 $P_1$ 变到压强 $P_2$，

$$
\Delta G = \Delta F = nRT\ln\frac{P_2}{P_1} = nRT\ln\frac{V_1}{V_2}.
$$ {#eq-delta-g}

若 $P^\circ$ 是固定的参考压强，$\mu^\circ(T)$ 表示 $\mu(T, P^\circ)$，则摩尔吉布斯函数为

$$
\mu(T, P) = \mu^\circ(T) + RT\ln\frac{P}{P^\circ}.
$$ {#eq-mu}
:::

::: proof
固定 $T$，[[#eq-dg-isotherm]] 给出 $\dd G = V\,\dd P$。代入理想气体定律 $V = nRT/P$，$T$ 恒定：

$$
\Delta G = \int_{P_1}^{P_2} \frac{nRT}{P}\,\dd P = nRT\ln\frac{P_2}{P_1}.
$$

同一个积分改用 $P = nRT/V$ 与固定 $T$ 下的 $\dd F = -P\,\dd V$，得

$$
\Delta F = -\int_{V_1}^{V_2} \frac{nRT}{V}\,\dd V = -nRT\ln\frac{V_2}{V_1} = nRT\ln\frac{V_1}{V_2}.
$$

等温线上 $P_2/P_1 = V_1/V_2$，所以两个对数是同一个数，且 $\Delta G = \Delta F$。由 $G = F + PV$ 与 $\Delta(PV) = \Delta(nRT) = 0$ 也能得出。

因为纯物质有 $G = n\mu$，$\Delta\mu = RT\ln(P_2/P_1)$。把态 $1$ 选作参考压强 $P^\circ$ 就产出 [[#eq-mu]]。函数 $\mu^\circ$ 只依赖温度，是因为压强已被固定在 $P^\circ$；计算压强的变化不需要它的显式形式。
:::

同一条等温线上的熵变是导数 $-(\partial G/\partial T)_P$，或是 [[thermodynamics/entropy]] 的直接结果：

$$
\Delta S = -nR\ln\frac{P_2}{P_1}.
$$

于是 $\Delta G = \Delta H - T\,\Delta S = -T\,\Delta S$，因为 $\Delta H = 0$，这就重新得到 [[#eq-delta-g]]。压缩（$P_2 > P_1$）降低气体的熵、抬高 $G$。可逆路径上排给热源的热是 $Q = T\,\Delta S = -nRT\ln(P_2/P_1)$，对气体做的功是这份热的相反数，因为 $\Delta U = 0$。所以可逆等温线上 $W = \Delta G$。这就是 $W \ge \Delta F$ 的取等，也是数 $RT\ln 2$ 背后那段计算。

::: example 一摩尔气体压强加倍 {#ex-gibbs-double}
一摩尔理想气体在 $300\,\mathrm{K}$ 下可逆等温地从压强 $P$ 变到 $2P$。求 $\Delta U$、$\Delta H$、$\Delta S$、$\Delta F$、$\Delta G$ 以及对气体做的功。取 $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$。
::: solution
温度不变、气体理想，所以 $\Delta U = 0$、$\Delta H = 0$。[[#eq-delta-g]] 取 $n = 1$、$P_2/P_1 = 2$ 给出

$$
\Delta G = \Delta F = RT\ln 2.
$$

用 $\ln 2 = 0.693147180560$ 与 $RT = 8.314462618\times 300 = 2494.3387854\,\mathrm{J/mol}$，

$$
\Delta G = 2494.3387854\times 0.693147180560 = 1728.94\,\mathrm{J},
$$

四舍五入为 $1729\,\mathrm{J}$。气体的熵变是

$$
\Delta S = -R\ln 2 = -5.76315\,\mathrm{J/K},
$$

三位小数为 $-5.763\,\mathrm{J/K}$。校核：$-T\,\Delta S = 300\times 5.763146 = 1728.94\,\mathrm{J}$，与 $\Delta G$ 吻合。

路径可逆且 $\Delta U = 0$，所以 $Q = -W$。对气体做的功等于 $\Delta F$：

$$
W = 1729\,\mathrm{J}, \qquad Q = -1729\,\mathrm{J}.
$$

压缩在这种符号约定下就该显示为对气体做正功。热源吸收 $1729\,\mathrm{J}$，熵上升 $5.763\,\mathrm{J/K}$，与气体的 $\Delta S$ 相消。宇宙收支相抵，因为这条等温线可逆。用不可逆压缩到达同样端点，会有同样的 $\Delta U$、$\Delta H$、$\Delta S$、$\Delta F$ 与 $\Delta G$——它们都是态函数——但 $W$ 更大、$|Q|$ 更小，宇宙会净得熵。
:::
:::

::: example 膨胀所能交付的功 {#ex-helmholtz-expand}
一摩尔 $300\,\mathrm{K}$ 的理想气体膨胀到体积加倍。求 $\Delta F$。比较同样端点之间可逆等温膨胀对气体做的功与自由膨胀对气体做的功。
::: solution
定温下体积加倍就是压强减半，所以 [[#eq-delta-g]] 给出

$$
\Delta F = nRT\ln\frac{V_1}{V_2} = RT\ln\frac{1}{2} = -RT\ln 2 = -1728.94\,\mathrm{J},
$$

即 $-1729\,\mathrm{J}$。可逆等温路径有 $W = \Delta F = -1729\,\mathrm{J}$：气体对外界做 $1729\,\mathrm{J}$ 的功。这就是它所能做的最多。[[#eq-w-f]] 说这个温度下这些端点之间所有别的路径都有 $W \ge \Delta F$，所以 $W$ 没那么负，气体对外做*的*功更小。

自由膨胀——如 [[thermodynamics/entropy]] 中——有 $W = 0$、$Q = 0$。零大于 $-1729\,\mathrm{J}$，所以不等式成立，而取出的功是分文没有。亥姆霍兹函数照样下降 $1729\,\mathrm{J}$，因为端点相同。$F$ 的下降量度的是你本可以拿到的功，不是这台具体装置收到的功。把这次机会花在自由膨胀上，产生的就不是功而是熵 $R\ln 2 = 5.763\,\mathrm{J/K}$。
:::
:::

## 一条麦克斯韦关系取回熵

[[#eq-maxwell]] 的第三行把物态方程变成熵的导数。对理想气体 $P = nRT/V$，所以定容下

$$
\left(\pdv{P}{T}\right)_{V} = \frac{nR}{V}.
$$

因此

$$
\left(\pdv{S}{V}\right)_{T} = \frac{nR}{V}.
$$ {#eq-dsdv}

恒温下积分。右端是 $nR\,\dd V/V$，于是

$$
\Delta S = nR\ln\frac{V_2}{V_1},
$$

这正是 [[thermodynamics/entropy]] 中理想气体熵的等温那一块。麦克斯韦关系没有要求重新诉诸 $\text{đ}Q_{\mathrm{rev}}$。它要求 $F$ 是二阶导数连续的态函数，加上理想气体定律。

同一个导数定住 $U$ 的体积依赖。由 [[#eq-du]]，固定 $T$ 下除以 $\dd V$，

$$
\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{S}{V}\right)_{T} - P.
$$ {#eq-internal-pressure}

这个系数有时称为内压力。它对理想气体为零，这就是焦耳的结果——先前它还是实验陈述，现在是一条麦克斯韦恒等式加 $PV = nRT$。

::: proposition 理想气体的内能 {#prop-ideal-u}
对理想气体，$\left(\pdv{U}{V}\right)_{T} = 0$。内能只是温度的函数。
:::

::: proof
把 [[#eq-dsdv]] 代入 [[#eq-internal-pressure]]：

$$
\left(\pdv{U}{V}\right)_{T} = T\cdot\frac{nR}{V} - P.
$$

理想气体定律说 $P = nRT/V$，所以右端是 $P - P = 0$。$U$ 对 $V$ 的导数在每个 $T$ 下都为零，意味着 $U$ 不依赖 $V$。物态方程已经把定容下的 $P$ 定成正比于 $T$，这正是让两项相消的东西。真实气体物态方程不同，内压力非零，能量依赖体积。
:::

::: example 由麦克斯韦关系求熵 {#ex-maxwell-s}
用 [[#eq-dsdv]]——不是沿路径的热——求一摩尔理想气体定温下体积加倍时的 $\Delta S$。先在初体积 $V = 0.0200\,\mathrm{m^3}$ 处计算导数以核对量纲，然后再积分。
::: solution
$n = 1$、$V = 0.0200\,\mathrm{m^3}$ 时，

$$
\left(\pdv{S}{V}\right)_{T} = \frac{R}{V} = \frac{8.314462618}{0.0200} = 415.723\,\mathrm{J/(K\cdot m^3)}.
$$

单位是每温度每体积的能量，正是 $\Delta S/\Delta V$ 的单位，所以这个导函数按量纲是 $V$ 上的熵密度。它不是常数。体积加倍把态移到 $V = 0.0400\,\mathrm{m^3}$，那里导数降到一半，$207.862\,\mathrm{J/(K\cdot m^3)}$。你不能拿 $415.723$ 乘 $\Delta V = 0.0200\,\mathrm{m^3}$ 就把乘积叫作 $\Delta S$：那会是 $8.314\,\mathrm{J/K}$，是 $R$，不是 $R\ln 2$。$R/V$ 的积分是一个对数：

$$
\Delta S = \int_{V}^{2V}\frac{R}{V'}\,\dd V' = R\ln 2 = 5.763\,\mathrm{J/K}.
$$

温度从未进入 [[#eq-dsdv]]。它进入可逆等温线上的热 $Q = T\Delta S$，又经 [[#ex-helmholtz-expand]] 进入 $\Delta F = -T\Delta S$。等温线上的熵与自由能，是同一个对数换了衣裳。
:::
:::

::: widget plot
f: ln(x)
x: 0.5, 3
caption: 横轴是压强比 P2/P1，曲线是它的自然对数。沿等温线，一摩尔的 ΔG 除以 RT 就是曲线的高度。比为 2 时高度是 ln 2，所以 300 K 下一摩尔的 ΔG = 1729 J。比为 1 时变化为零。比小于 1 时气体已膨胀，ΔG 为负。斜率向右变平，所以再倍一次压强让 G 增加的还是同一个加法台阶，不是更陡的台阶。
:::

图与等温熵用的是同一个对数，符号相反；重建 $\Delta G = -T\,\Delta S$ 时再多一个因子 $T$。把 $x$ 读成体积比而不是压强比，就翻一个号，给出 $\Delta F/(nRT)$。一条曲线在干两份活。

::: warning 态函数，以及只有膨胀功
$H$、$F$ 与 $G$ 是态函数。它们在两个平衡态之间的差不依赖路径，可逆与否都不。[[#eq-four]] 里的微分假设了一个只有膨胀功的静水压系统。加上电功、磁功、或拉伸表面的功，$\dd U$ 要添上那个额外项，$F$ 与 $G$ 的微分也随之改变。在那个更宽的设定下，$\left(\pdv{G}{P}\right)_{T} = V$ 不再是定 $T$ 下 $\dd G$ 的全部。不要把 [[#eq-four]] 搬进一道有转轴、电池或表面的题目，然后指望 $-\Delta G$ 是膨胀功。
:::

::: history 吉布斯，以及几年前的马休
约西亚·威拉德·吉布斯（Josiah Willard Gibbs）在《关于多相物质的平衡》（*On the Equilibrium of Heterogeneous Substances*）里建成了这些势的平衡理论，该文分两部分（1876 与 1878）发表于《康涅狄格科学院院刊》（*Transactions of the Connecticut Academy*）。这里称作 $F$ 与 $G$ 的函数出自他手，只是字母与名称是后来定的。赫尔曼·冯·亥姆霍兹（Hermann von Helmholtz）在 1882 年强调了 $U - TS$ 的自由能解读：恒温下可用于做功的那部分能量。弗朗索瓦·马休（François Massieu）1869 年的特性函数更早。它们是对熵而非对能量的勒让德变换，并生出导数之间的同样这些关系。有一句话足以记下：在吉布斯把它变成化学平衡的语言之前，用一个变量的共轭导函数去交换它的念头就已经在场了。
:::

从这里走到一个反应、或一次相变，那一步是在同一 $T$ 与 $P$ 下比较两个候选者的 $G$。[[#thm-criteria]] 允许的正是 $G$ 更低的那个候选者。对混合物算出这个比较需要每个组元的化学势，那正是引入 $\mu$ 时许诺的后续课程。$F$ 与 $G$ 的微观表达式——作为配分函数的对数——在 [[statistical-mechanics]] 中展开。那套推导不会改变这里证明过的任何微分。它提供的是显式函数，我们的导数一直写作 $S$、$P$ 与 $V$。

::: summary
- $H = U + PV$、$F = U - TS$、$G = U - TS + PV = H - TS$。三个都是态函数。只有膨胀功时，若端点压强就是那个恒定外压，则 $Q_P = \Delta H$。
- 自然微分是 $\dd H = T\,\dd S + V\,\dd P$、$\dd F = -S\,\dd T - P\,\dd V$、$\dd G = -S\,\dd T + V\,\dd P$，起点是 $\dd U = T\,\dd S - P\,\dd V$。
- 麦克斯韦关系由混合偏导相等得出。其中两条是 $\left(\pdv{T}{V}\right)_{S} = -\left(\pdv{P}{S}\right)_{V}$ 与 $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$。
- $T$ 与 $P$ 取外界的值时，$\Delta U \le T\,\Delta S - P\,\Delta V$。定 $T$ 与 $V$ 下，自发过程有 $\Delta F \le 0$。定 $T$ 与 $P$ 下，有 $\Delta G \le 0$。
- 定温下对系统做的功满足 $W \ge \Delta F$，可逆路径取等号。$-\Delta F$ 是系统所能做的最大功。
- 等温线上的理想气体有 $\Delta U = \Delta H = 0$、$\Delta G = \Delta F = nRT\ln(P_2/P_1)$。$300\,\mathrm{K}$ 的一摩尔，压强加倍，$\Delta G = 1729\,\mathrm{J}$。
- 一条麦克斯韦关系加 $PV = nRT$ 给出 $\left(\pdv{U}{V}\right)_{T} = 0$ 与 $\left(\pdv{S}{V}\right)_{T} = nR/V$。这些微分假设只有膨胀功。
:::

## 习题

::: exercise 焓减去内能 {#exr-hu level=1 check="3*8.314462618*250"}
三摩尔理想气体处于 $250\,\mathrm{K}$。求 $H - U$。
::: solution
由 [[#eq-h]] 与理想气体定律，

$$
H - U = PV = nRT = 3.00\times 8.314462618\times 250 = 6235.85\,\mathrm{J}.
$$

最接近的整数焦耳是 $6236\,\mathrm{J}$。不需要任何过程：$H - U$ 是态的一个属性。只要温度和气体的量是这些，任何压强下这个乘积都是 $nRT$。
:::
:::

::: exercise 压强增至三倍 {#exr-triple-p level=1 check="2*8.314462618*350*ln(3)"}
两摩尔理想气体维持在 $350\,\mathrm{K}$，压强增至三倍。求 $\Delta G$。
::: solution
路径可以取作可逆等温，也可以取任何端点相同的路径：$G$ 是态函数。[[#eq-delta-g]] 给出

$$
\Delta G = nRT\ln\frac{P_2}{P_1} = 2.00\times R\times 350\times\ln 3.
$$

用 $\ln 3 = 1.098612288668$，

$$
\Delta G = 700\, R\times 1.098612288668 = 5820.12383\times 1.098612288668 = 6394.06\,\mathrm{J}.
$$

最接近的整数焦耳，$\Delta G = 6394\,\mathrm{J}$。正号对应压缩。$\Delta U$ 与 $\Delta H$ 为零，也用不着。
:::
:::

::: exercise 热容之比 {#exr-gamma level=1 check="5/3"}
单原子理想气体 $C_{V,m} = \tfrac{3}{2} R$、$C_{P,m} = \tfrac{5}{2} R$。求气体的量固定时温度变化的比值 $\Delta H/\Delta U$。
::: solution
$H$ 与 $U$ 都只依赖温度，且

$$
\Delta H = n C_{P,m}\,\Delta T, \qquad \Delta U = n C_{V,m}\,\Delta T.
$$

$\Delta T \ne 0$ 时比值为

$$
\frac{\Delta H}{\Delta U} = \frac{C_{P,m}}{C_{V,m}} = \frac{5/2}{3/2} = \frac{5}{3}.
$$

气体的量和 $\Delta T$ 的大小都约掉了。结果就是单原子气体的 $\gamma$。它不是功，也不是 $\Delta G$。
:::
:::

::: exercise 体积加倍时的亥姆霍兹函数 {#exr-delta-f level=2 check="-8.314462618*300*ln(2)"}
一摩尔理想气体在 $300\,\mathrm{K}$ 下等温膨胀到体积加倍。求 $\Delta F$。
::: hint
定温下 $\dd F = -P\,\dd V$，而 $P\,\dd V = nRT\,\dd V/V$。
:::
::: solution
[[#eq-delta-g]] 取 $V_2/V_1 = 2$ 给出

$$
\Delta F = -nRT\ln 2 = -RT\ln 2 = -1728.94\,\mathrm{J},
$$

即 $-1729\,\mathrm{J}$。这也是 $\Delta G$，因为理想气体等温线有 $\Delta(PV) = 0$。对气体做的可逆功等于 $\Delta F$。同样两个体积之间的自由膨胀有同样的 $\Delta F$ 和不同的 $W$。
:::
:::

::: exercise 双原子气体的焓 {#exr-diatomic-h level=2 check="1.5*(7/2)*8.314462618*20"}
$1.50\,\mathrm{mol}$ 的 $C_{P,m} = \tfrac{7}{2} R$ 理想双原子气体在定压下升温 $20.0\,\mathrm{K}$。求 $\Delta H$。
::: solution
定压下——实际上对理想气体的任何温度变化也一样——$\Delta H = n C_{P,m}\,\Delta T$：

$$
\Delta H = 1.50\times\tfrac{7}{2}\times R\times 20.0 = 105\, R.
$$

由 $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$，

$$
\Delta H = 105\times 8.314462618 = 873.019\,\mathrm{J},
$$

一位小数为 $873.0\,\mathrm{J}$。由 [[#eq-qp]] 这也是吸收的热。内能的变化比它小 $nR\,\Delta T = 1.50\times R\times 20.0 = 249.434\,\mathrm{J}$，那个差就是 $-W$。
:::
:::

::: exercise 四倍压缩 {#exr-fourfold level=2 check="0.5*8.314462618*400*ln(4)"}
半摩尔理想气体在 $400\,\mathrm{K}$ 下等温压缩，压强从 $P$ 到 $4P$。求 $\Delta G$。$\Delta F$ 与 $\Delta G$ 有差别吗？
::: hint
用 [[#eq-delta-g]]。第二个问题，比较理想气体等温线上的 $G$ 与 $F$，那里 $PV = nRT$ 不变。
:::
::: solution
$$
\Delta G = nRT\ln 4 = 0.500\times R\times 400\times\ln 4 = 200\, R\ln 4.
$$

用 $\ln 4 = 2\ln 2 = 1.38629436112$，

$$
\Delta G = 1662.892524\times 1.38629436112 = 2305.26\,\mathrm{J}.
$$

最接近的整数焦耳，$\Delta G = 2305\,\mathrm{J}$。这条等温线上 $\Delta(PV) = \Delta(nRT) = 0$，所以 $\Delta F = \Delta G$。两者都对气体做的可逆功。气体的熵下降 $\Delta G/T = 2305.26/400 = 5.763\,\mathrm{J/K}$，也就是 $nR\ln 4 = \tfrac{1}{2} R\times 2\ln 2 = R\ln 2$。
:::
:::

::: exercise 由麦克斯韦关系求热容 {#exr-cp-cv level=3 check="2*8.314462618"}
从 $\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{P}{T}\right)_{V} - P$ 出发，证明这个导数对理想气体为零。推出广延热容满足 $C_P - C_V = nR$，并给出 $2.00\,\mathrm{mol}$ 理想气体的 $C_P - C_V$ 的值。
::: hint
写 $H = U + PV$，对 $T$ 求导（固定 $P$）。用链式法则经由 $T$ 与 $V$ 表示 $\left(\pdv{U}{T}\right)_{P}$。对理想气体，内压力项把 $P$ 抵消，且 $\left(\pdv{V}{T}\right)_{P} = nR/P$。
:::
::: solution
麦克斯韦关系 $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$ 把 [[#eq-du]] 变成

$$
\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{P}{T}\right)_{V} - P,
$$

这就是 [[#eq-internal-pressure]]。对理想气体 $\left(\pdv{P}{T}\right)_{V} = nR/V$、$P = nRT/V$，所以导数为零，如 [[#prop-ideal-u]]。于是 $U = U(T)$ 而已，广延热容 $C_V = \dd U/\dd T$ 至多是温度的函数。

现在 $H = U + PV$，所以定压下

$$
C_P = \left(\pdv{H}{T}\right)_{P} = \left(\pdv{U}{T}\right)_{P} + P\left(\pdv{V}{T}\right)_{P}.
$$

固定 $P$ 的链式法则，先用 $U = U(T, V)$、再特殊化到 $U = U(T)$，给出

$$
\left(\pdv{U}{T}\right)_{P} = \left(\pdv{U}{T}\right)_{V} + \left(\pdv{U}{V}\right)_{T}\left(\pdv{V}{T}\right)_{P} = C_V,
$$

第二项因为内压力为零而消失。因此

$$
C_P - C_V = P\left(\pdv{V}{T}\right)_{P}.
$$

对理想气体 $V = nRT/P$、$\left(\pdv{V}{T}\right)_{P} = nR/P$，所以 $P\cdot nR/P = nR$。故 $C_P - C_V = nR$。对 $2.00\,\mathrm{mol}$，

$$
C_P - C_V = 2R = 16.6289\,\mathrm{J/K}.
$$

四位数字是 $16.63\,\mathrm{J/K}$。只要气体保持理想，它就不依赖温度。每摩尔同样的论证给出 $C_{P,m} - C_{V,m} = R$。
:::
:::

::: exercise 一个未必能进行的过程 {#exr-spontaneous level=3 check="-200"}
一个闭系统定容地放在与 $400\,\mathrm{K}$ 热源接触的旁边。它在两个平衡态之间变化，两者都是 $400\,\mathrm{K}$，且 $\Delta U = 1200\,\mathrm{J}$、$\Delta S = 3.50\,\mathrm{J/K}$。膨胀是唯一可用的做功方式。求 $\Delta F$，并判断该过程能否自发发生。
::: hint
定温下 $\Delta F = \Delta U - T\,\Delta S$。把符号与 [[#thm-criteria]] 对照。定容加只做膨胀功使 $W = 0$，这可以拿来与 $W \ge \Delta F$ 相互校核，可作可不做。
:::
::: solution
端点共一个温度，所以

$$
\Delta F = \Delta U - T\,\Delta S = 1200 - 400\times 3.50 = 1200 - 1400 = -200\,\mathrm{J}.
$$

[[#thm-criteria]] 说定 $T$ 与 $V$ 下的过程在 $\Delta F \le 0$ 时可以自发发生。这里 $\Delta F = -200\,\mathrm{J}$，所以过程是被允许的，且不可逆：可逆的话应有 $\Delta F = 0$。系统与热源的复合体净得熵 $-\Delta F/T = 0.500\,\mathrm{J/K}$。

再校核功的界：体积固定又没有别的功，$W = 0$。不等式 $W \ge \Delta F$ 读作 $0 \ge -200\,\mathrm{J}$，成立。倘若 $\Delta F$ 算出来为正，同样的定容约束会让过程成为不可能：你没法对系统做 $F$ 的上升所要求的那份正功，因为体积动不了。
:::
:::
