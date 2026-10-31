[[statistical-mechanics/classical-gas]] 里的经典理想气体建立在一个假设之上：可及的单粒子态多到没有任何两个粒子会争抢同一个态。判据是 $n\lambda^3 \ll 1$，其中 $\lambda$ 是热波长。空气以七个数量级的余量满足它。铜线里的电子以四个数量级违反它，液氦违反它，热空腔里的光子、晶格的振动、中子星里的中子以及现代冷原子实验里的原子同样如此。在每一种情形里，因子 $1/N!$ 都不再是足够的修正，我们必须精确地数全同粒子的量子态。

一旦用对变量，计数本身很简单。全同气体的一次状态不是"哪个粒子在哪里"的清单，而是"每个单粒子态上*有多少*个粒子"的清单。对费米子，每个数非 $0$ 即 $1$；对玻色子，它是任意非负整数。诸数之和等于 $N$ 这一约束在正则系综里很别扭，所以我们把它放开：让气体与源之间既交换能量也交换粒子。这就是**巨正则系综**，在其中每个单粒子态都成为一个独立的系统。它的平均占据数是**费米-狄拉克**分布或**玻色-爱因斯坦**分布，经典的麦克斯韦-玻尔兹曼结果是它们的公共极限。本章推导这两个分布以及使用它们的机器；[[statistical-mechanics/bose-fermi]] 把它们用于辐射、金属、恒星与凝聚体。

## 全同粒子与占据数 {#occupation}

在量子力学里，全同粒子不只是相似：任何测量都分辨不出谁是谁，而多粒子波函数必须反映这一点。正如 [[quantum-2/identical-particles]] 所示，交换两个全同粒子的标签会把波函数乘以 $+1$ 或 $-1$，而适用哪个符号由粒子种类决定。

::: definition 玻色子与费米子 {#def-bosons-fermions}
**玻色子**是这样一种粒子：它的多粒子态在交换其中任意两个粒子时对称；**费米子**的态则反对称。按照相对论量子场论的自旋–统计定理，自旋为整数的粒子（光子、当作粒子处理的声子、$^4$He 原子、$^{87}$Rb 原子）是玻色子，自旋为半整数的粒子（电子、质子、中子、$^3$He 原子）是费米子。
:::

对无相互作用粒子，取一组单粒子态 $k = 1, 2, 3, \dots$，能量为 $\varepsilon_k$；我们沿 Kittel 与 Kroemer 的称呼把它们叫作**轨道**，以免与整个气体的态混淆。由这些轨道构成的对称或反对称 $N$ 粒子态由**占据数** $n_k$（每个轨道上的粒子数）完全指定，因为（反）对称化没有留下任何别的选择。对费米子，两个粒子在同一轨道上的反对称态恒等地为零：这就是**泡利不相容原理**，$n_k \in \{0, 1\}$。对玻色子，$n_k \in \{0, 1, 2, \dots\}$。两种情形下都有

$$
N = \sum_kn_k, \qquad E = \sum_kn_k\varepsilon_k.
$$ {#eq-occupation}

::: example 两个粒子，三个轨道 {#ex-two-three}
两个粒子占据三个等能量轨道。数出两粒子态的数目，设粒子 (a) 可分辨；(b) 是全同玻色子；(c) 是全同费米子。在温度足够高、各态等概率时，分别求两个粒子在同一轨道上的概率。
::: solution
(a) 每个粒子独立地挑一个轨道：$3^2 = 9$ 个态。其中 $3$ 个态两个粒子在同一轨道上，概率为 $3/9 = \tfrac13$。

(b) 玻色子的态是一组和为 $2$ 的占据数 $(n_1, n_2, n_3)$。按 [[statistical-mechanics/microcanonical]] 的点与竖线计数，$\binom{2 + 3 - 1}{2} = 6$：三个双占态 $(2,0,0)$、$(0,2,0)$、$(0,0,2)$，以及三个 $(1,1,0)$、$(1,0,1)$、$(0,1,1)$。双占概率为 $3/6 = \tfrac12$。

(c) 对费米子每个 $n_k$ 非 $0$ 即 $1$，所以只剩下 $(1,1,0)$、$(1,0,1)$、$(0,1,1)$ 三个态：$\binom32 = 3$ 个态，双占概率为 $0$。

与可分辨粒子相比，玻色子*更*可能共享同一轨道，费米子则被完全禁止这样做。带 $1/N!$ 的经典计数 $9/2! = 4.5$ 连整数都不是，与两者都不符。它只在双占罕见时才对，这要求轨道数远多于粒子数：那正是 [[statistical-mechanics/classical-gas]] 的条件 $n\lambda^3 \ll 1$。玻色子抱团、费米子互斥的倾向不是力，而是计数本身的推论。
:::
:::

在正则系综里，理想量子气体的配分函数是对所有满足 $\sum n_k = N$ 的集合 $\{n_k\}$ 求和。这条约束把各轨道耦合起来，破坏了让经典计算变得容易的因子化。补救的办法是让 $N$ 变动。

## 巨正则系综 {#grand}

让系统同时与源交换能量和粒子，二者整体孤立，总能量 $U_0$、总粒子数 $N_0$。系统的一个微观状态 $s$ 现在有能量 $E_s$ 和粒子数 $N_s$。

::: theorem 吉布斯分布 {#thm-gibbs}
与温度为 $T$、化学势为 $\mu$ 的源处于平衡的系统，处在能量为 $E_s$、粒子数为 $N_s$ 的微观状态 $s$ 的概率为

$$
p_s = \frac{e^{-\beta(E_s - \mu N_s)}}{\mathcal Z}, \qquad \mathcal Z = \sum_se^{-\beta(E_s - \mu N_s)}.
$$ {#eq-gibbs}

归一化求和 $\mathcal Z(T, V, \mu)$ 称为**巨配分函数**，指数因子称为**吉布斯因子**。
:::

::: proof
与 [[statistical-mechanics/canonical]] 中玻尔兹曼分布的推导一样，$p_s$ 正比于系统处于 $s$ 时源的相容微观状态数：

$$
p_s \propto \Omega_R(U_0 - E_s, N_0 - N_s) = \exp\left[\frac{S_R(U_0 - E_s, N_0 - N_s)}{k_B}\right].
$$

对小量 $E_s$ 与 $N_s$ 展开到一阶：

$$
S_R(U_0 - E_s, N_0 - N_s) \approx S_R(U_0, N_0) - E_s\pdv{S_R}{U} - N_s\pdv{S_R}{N}.
$$

由 [[statistical-mechanics/microcanonical]] 中的定义，$\partial S_R/\partial U = 1/T$、$\partial S_R/\partial N = -\mu/T$，即源的温度与化学势。于是 $p_s \propto e^{-(E_s - \mu N_s)/k_BT}$。被略去的二阶项之所以小，理由与之前相同：一个大的源交出一点能量或几个粒子时，它的 $T$ 与 $\mu$ 几乎不变。归一化即得 [[#eq-gibbs]]。
:::

巨配分函数扮演的正是当年 $Z$ 的角色。引入逸度 $z = e^{\beta\mu}$，$\mathcal Z = \sum_Nz^NZ_N$ 是关于 $z$ 的幂级数，其系数就是正则配分函数。

::: theorem 由巨配分函数到热力学 {#thm-grand-potential}
定义**巨势** $\Phi = -k_BT\ln\mathcal Z$。则

$$
\langle N\rangle = -\pdv{\Phi}{\mu} = k_BT\pdv{\ln\mathcal Z}{\mu}, \qquad S = -\pdv{\Phi}{T}, \qquad \Phi = U - TS - \mu\langle N\rangle = -PV.
$$ {#eq-grand}

粒子数涨落为 $\langle N^2\rangle - \langle N\rangle^2 = k_BT\,\partial\langle N\rangle/\partial\mu$。
:::

::: proof
在固定 $T$ 下对 $\mu$ 微分 $\ln\mathcal Z$，每一项都带下一个 $\beta N_s$，于是 $k_BT\,\partial\ln\mathcal Z/\partial\mu = \sum_sN_sp_s = \langle N\rangle$。再微分一次得方差，与 [[statistical-mechanics/canonical]] 中能量涨落结果的证明完全一样。

熵方面，用吉布斯形式 $S = -k_B\sum p_s\ln p_s$，其中 $\ln p_s = -\beta(E_s - \mu N_s) - \ln\mathcal Z$：

$$
S = k_B\beta(U - \mu\langle N\rangle) + k_B\ln\mathcal Z = \frac{U - \mu\langle N\rangle - \Phi}{T},
$$

所以 $\Phi = U - TS - \mu\langle N\rangle$。在固定 $\mu$ 下对 $T$ 微分 $\Phi = -k_BT\ln\mathcal Z$，与 $F$ 的同样步骤给出 $-\partial\Phi/\partial T = S$。

最后，$\Phi(T, V, \mu)$ 是广延量，而它唯一的广延自变量是 $V$，故 $\Phi = V\phi(T, \mu)$。它对体积的导数是 $-P$，理由与 $F$ 相同（能量 $E_s$ 依赖 $V$），于是 $\phi = -P$，$\Phi = -PV$。
:::

关系式 $PV = k_BT\ln\mathcal Z$ 是求量子气体物态方程最省力的路。与正则情形一样，对宏观系统巨正则系综与其余系综一致，因为 $N$ 的相对涨落是 $1/\sqrt N$ 量级。例外照旧是接近相变的系统，而下一章的玻色-爱因斯坦凝聚体正是一例。

::: example 经典气体，用巨正则算 {#ex-classical-grand}
用 $Z_N = Z_1^N/N!$、$Z_1 = V/\lambda^3$，计算经典理想气体的 $\mathcal Z$，重新得到化学势与物态方程。并证明一个开放体积内的粒子数作泊松涨落。
::: solution
这个级数是一个指数：

$$
\mathcal Z = \sum_{N=0}^\infty\frac{(zZ_1)^N}{N!} = \exp(zZ_1) = \exp\left(\frac{e^{\beta\mu}V}{\lambda^3}\right).
$$

于是 $\ln\mathcal Z = e^{\beta\mu}V/\lambda^3$，由 [[#eq-grand]] 得 $\langle N\rangle = k_BT\,\partial\ln\mathcal Z/\partial\mu = e^{\beta\mu}V/\lambda^3$。反解得 $\mu = k_BT\ln(n\lambda^3)$，即 [[statistical-mechanics/classical-gas]] 的结果。物态方程是 $PV = k_BT\ln\mathcal Z = k_BT\langle N\rangle$，理想气体定律。

粒子数恰为 $N$ 的概率是 $(zZ_1)^N/(N!\,\mathcal Z) = \langle N\rangle^Ne^{-\langle N\rangle}/N!$：泊松分布。它的方差等于均值，这一点也从涨落公式直接得出：$k_BT\,\partial\langle N\rangle/\partial\mu = \langle N\rangle$。常温常压下，一立方微米空气平均含 $2.4\times10^7$ 个分子，标准差 $\sqrt{\langle N\rangle} \approx 4900$，相对涨落 $2\times10^{-4}$。更小尺度上的密度涨落会散射光；正是这种涨落的瑞利（Rayleigh）散射让天空呈蓝色。
:::
:::

## 两种分布 {#distributions}

对全同粒子的理想气体，微观状态就是一组占据数，而且由 [[#eq-occupation]]，吉布斯因子是轨道上的乘积：

$$
e^{-\beta(E - \mu N)} = \prod_ke^{-\beta(\varepsilon_k - \mu)n_k}.
$$

如今 $n_k$ 不再受约束，对一切集合 $\{n_k\}$ 的求和因子化，$\mathcal Z = \prod_k\mathcal Z_k$，每个轨道一个因子。每个轨道都是一个与气体其余部分交换粒子的独立系统，其余部分是它的源。

::: theorem 费米-狄拉克分布与玻色-爱因斯坦分布 {#thm-distributions}
温度为 $T$、化学势为 $\mu$ 的全同粒子理想气体中，能量为 $\varepsilon$ 的轨道的平均占据数为

$$
\bar n_{\mathrm{FD}}(\varepsilon) = \frac{1}{e^{(\varepsilon - \mu)/k_BT} + 1}\quad\text{(费米子)}, \qquad \bar n_{\mathrm{BE}}(\varepsilon) = \frac{1}{e^{(\varepsilon - \mu)/k_BT} - 1}\quad\text{(玻色子)}.
$$ {#eq-distributions}

对玻色子，化学势必须低于最低轨道能量，$\mu < \varepsilon_0$。巨势为 $\Phi = \mp k_BT\sum_k\ln\bigl(1 \pm e^{-\beta(\varepsilon_k - \mu)}\bigr)$，上面符号对应费米子。
:::

::: proof
对一个轨道，令 $x = e^{-\beta(\varepsilon - \mu)}$。

费米子：$n \in \{0, 1\}$，故 $\mathcal Z_k = 1 + x$，且

$$
\bar n = \frac{0\cdot1 + 1\cdot x}{1 + x} = \frac{1}{x^{-1} + 1} = \frac{1}{e^{\beta(\varepsilon - \mu)} + 1}.
$$

玻色子：$n = 0, 1, 2, \dots$，故 $\mathcal Z_k = \sum_nx^n = 1/(1 - x)$，它仅当 $x < 1$、即 $\varepsilon > \mu$ 时收敛。这对每个轨道都必须成立，所以 $\mu$ 低于最低轨道。于是

$$
\bar n = \frac{\sum_nnx^n}{\sum_nx^n} = x\deriv{}{x}\ln\frac{1}{1 - x} = \frac{x}{1 - x} = \frac{1}{e^{\beta(\varepsilon - \mu)} - 1}.
$$

巨势为 $-k_BT\sum_k\ln\mathcal Z_k$，费米子有 $\ln\mathcal Z_k = \ln(1 + x)$，玻色子有 $-\ln(1 - x)$，如所述。
:::

两个公式只差一个符号，而这个符号就是一种金属与一种超流体之间的全部差别。对费米子，$0 \le \bar n \le 1$，恰是不相容原理所要求的；$\varepsilon = \mu$ 处恰好 $\bar n = \tfrac12$；低温下分布是一个台阶：$\mu$ 以下的轨道全满，$\mu$ 以上全空，台阶边缘在几个 $k_BT$ 内被抹平。对玻色子，$\bar n$ 可以任意大，且当 $\varepsilon$ 从上方趋近 $\mu$ 时发散。

::: widget plot
f: 1/(exp(x)+1); 1/(exp(x)-1); exp(-x)
x: -3, 5
y: 0, 2.5
labels: 费米-狄拉克; 玻色-爱因斯坦; 麦克斯韦-玻尔兹曼
caption: 一个轨道的平均占据数对 $x = (\varepsilon - \mu)/k_BT$ 作图。$x \gtrsim 3$ 时三条曲线无法区分：占据数很小，统计无关紧要。向 $x = 0$ 靠近：玻色-爱因斯坦曲线冲天而起，费米-狄拉克曲线过 $\tfrac12$ 点，玻尔兹曼曲线过 $1$。负 $x$ 区只有费米子允许，那里费米-狄拉克占据趋于 $1$，从不超过 $1$。
:::

::: example 室温下的费米台阶 {#ex-fermi-step}
$300\,\mathrm{K}$ 金属中的导电电子服从费米-狄拉克分布，$\mu$ 比带底高好几个电子伏。求比 $\mu$ 高 $0.100\,\mathrm{eV}$ 与低 $0.100\,\mathrm{eV}$ 的轨道占据，以及占据从 $0.9$ 降到 $0.1$ 跨越的能量范围。
::: solution
$300\,\mathrm{K}$ 下 $k_BT = 0.025852\,\mathrm{eV}$，所以 $0.100\,\mathrm{eV}$ 是 $3.868\,k_BT$。$\mu$ 之上，

$$
\bar n = \frac{1}{e^{3.868} + 1} = \frac{1}{47.86 + 1} = 0.0205.
$$

$\mu$ 之下，$\bar n = 1/(e^{-3.868} + 1) = 0.9795 = 1 - 0.0205$。分布关于 $\mu$ 对称，其含义是 $\bar n(\mu + \delta) = 1 - \bar n(\mu - \delta)$：比 $\mu$ 高 $\delta$ 的轨道被占据的概率，等于比 $\mu$ 低 $\delta$ 的轨道空着的概率。

在 $e^{x} + 1 = 1/0.9$ 处占据为 $0.9$，故 $x = \ln(1/9) = -2.197$；在 $x = \ln9 = 2.197$ 处占据为 $0.1$。台阶宽度为 $2\ln9\,k_BT = 4.39\,k_BT = 0.114\,\mathrm{eV}$。在铜中，正如我们将在 [[statistical-mechanics/bose-fermi]] 看到的，$\mu$ 约 $7\,\mathrm{eV}$，所以只有占据能量范围最外面 $1.6\%$ 里的电子才受到温度的影响。这就是金属电子热容如此之小的原因。
:::
:::

占据的涨落可由 [[#thm-grand-potential]] 的涨落公式用于单个轨道得出，它们同样带着那个符号：

$$
\langle n^2\rangle - \bar n^2 = k_BT\pdv{\bar n}{\mu} = \bar n(1 \mp \bar n),
$$ {#eq-occupation-fluct}

上面符号对应费米子。全满或全空的费米子轨道没有涨落。$\bar n$ 很大的玻色子轨道，其涨落是 $\bar n$ 本身的量级，大于泊松值 $\sqrt{\bar n}$：这就是热光的超额噪声，1956 年由汉伯里·布朗（Hanbury Brown）与特维斯（Twiss）测得。

::: quiz
$(\varepsilon - \mu)/k_BT$ 取哪个值时，玻色-爱因斯坦占据恰为 $1$？
- [ ] $0$
- [x] $\ln 2$
- [ ] $1$
- [ ] 不存在这样的值，因为玻色子的占据数总是很大。
::: solution
令 $1/(e^{x} - 1) = 1$ 得 $e^{x} = 2$，故 $x = \ln2 \approx 0.693$。在同一个 $x$ 处，费米-狄拉克占据是 $1/3$，麦克斯韦-玻尔兹曼值是 $\tfrac12$。玻色子的占据只在 $\varepsilon - \mu$ 远小于 $k_BT$ 时才大。
:::
:::

## 经典极限 {#classical-limit}

若对每个轨道都有 $e^{\beta(\varepsilon - \mu)} \gg 1$，则 [[#eq-distributions]] 中的 $\pm1$ 可以忽略，两个分布都化为

$$
\bar n(\varepsilon) \approx e^{-\beta(\varepsilon - \mu)},
$$ {#eq-mb-occupation}

即**麦克斯韦-玻尔兹曼**占据。此时轨道很少被占据，$\bar n \ll 1$，两个粒子共享一个态时会怎样发生的问题根本不会出现。

::: proposition 经典极限 {#prop-classical-limit}
对内部简并度为 $g$（例如自旋 $\tfrac12$ 时 $g = 2$）的粒子理想气体，[[#eq-mb-occupation]] 成立的条件是 $e^{\beta\mu} \ll 1$，等价地 $n\lambda^3/g \ll 1$。在那一极限下 $\mu = k_BT\ln(n\lambda^3/g)$，巨势化为 $Z_N = (gZ_1)^N/N!$ 的经典气体的巨势。
:::

::: proof
把能量从最低轨道量起，于是 $\varepsilon \ge 0$。$e^{-\beta(\varepsilon - \mu)}$ 的最大值是 $e^{\beta\mu}$，所以每个轨道都有 $\bar n \ll 1$ 当且仅当 $e^{\beta\mu} \ll 1$。此时对每个轨道都有 $\ln(1 \pm x) \approx \pm x$，其中 $x = e^{-\beta(\varepsilon_k - \mu)}$，于是 [[#thm-distributions]] 的巨势化为

$$
\Phi \approx -k_BT\sum_ke^{-\beta(\varepsilon_k - \mu)} = -k_BT\,e^{\beta\mu}\,gZ_1,
$$

其中 $gZ_1 = gV/\lambda^3$ 是对轨道的求和，包含 $g$ 个内部状态。这就是 $\mathcal Z = \exp(e^{\beta\mu}gZ_1)$ 的 $-k_BT\ln\mathcal Z$，而 [[#ex-classical-grand]] 已表明那正是 $Z_N = (gZ_1)^N/N!$ 的经典气体的巨配分函数。于是 $\langle N\rangle = e^{\beta\mu}gV/\lambda^3$，即 $e^{\beta\mu} = n\lambda^3/g$，而条件 $e^{\beta\mu} \ll 1$ 就是 $n\lambda^3/g \ll 1$。
:::

至此，上一章开始的论证闭合了：$1/N!$ 是精确量子计数的经典极限，而 $n\lambda^3$ 度量一个气体离该极限有多远。第一个修正（在下面的一道习题里推导）改变压强：

$$
\frac{PV}{Nk_BT} = 1 \pm \frac{n\lambda^3}{4\sqrt2\,g} + O\bigl((n\lambda^3)^2\bigr),
$$ {#eq-virial}

上面符号对应费米子。费米子比经典粒子推得更狠，因为不相容原理把它们彼此推开；玻色子推得更轻，因为它们抱团。这一修正起的作用像一种有效斥力或有效引力，尽管粒子之间并不相互作用。

一阶公式有多好？$z$ 与 $n\lambda^3$ 之间的精确关系在最后一道习题里导出，是一对容易数值求和的幂级数。

::: example 化学势逼近简并 {#ex-near-degeneracy}
对 $g = 1$ 的理想气体，用精确级数

$$
n\lambda^3 = \sum_{j\ge1}(\mp1)^{j+1}\frac{z^j}{j^{3/2}}, \qquad \frac{P\lambda^3}{k_BT} = \sum_{j\ge1}(\mp1)^{j+1}\frac{z^j}{j^{5/2}},
$$

求玻色子与费米子在 $n\lambda^3 = 0.1$ 和 $n\lambda^3 = 0.5$ 时的逸度 $z = e^{\beta\mu}$ 与比值 $PV/Nk_BT$，并与经典值 $z = n\lambda^3$、$PV/Nk_BT = 1$ 比较。
::: solution
在 $0 < z < 1$ 上用二分法解第一个级数得 $z$，再代入第二个求值。几行 python，求和到各项可忽略为止，给出：

| $n\lambda^3$ | 统计 | $z$ | $\mu/k_BT = \ln z$ | $PV/Nk_BT$ | 一阶 [[#eq-virial]] |
|---|---|---|---|---|---|
| $0.1$ | 经典 | $0.1000$ | $-2.303$ | $1$ | $1$ |
| $0.1$ | 玻色 | $0.0965$ | $-2.338$ | $0.9823$ | $0.9823$ |
| $0.1$ | 费米 | $0.1036$ | $-2.267$ | $1.0176$ | $1.0177$ |
| $0.5$ | 经典 | $0.5000$ | $-0.693$ | $1$ | $1$ |
| $0.5$ | 玻色 | $0.4185$ | $-0.871$ | $0.9108$ | $0.9116$ |
| $0.5$ | 费米 | $0.5960$ | $-0.518$ | $1.0876$ | $1.0884$ |

$n\lambda^3 = 0.1$ 时一阶修正精确到四位有效数字；$0.5$ 时误差仍不到 $0.1\%$。玻色子维持同样密度所需的逸度比经典粒子小，因为平均每个轨道装得下它们中更多个；费米子则需要更大的。玻色逸度不能超过 $1$，而 $z = 1$ 处的玻色级数是 $\zeta(\tfrac32) = 2.612$，一个最大密度。超出之后发生什么，就是玻色-爱因斯坦凝聚，见 [[statistical-mechanics/bose-fermi]]。
:::
:::

::: widget plot
f: sum(x^k/k^1.5, k, 1, 200); sum((-1)^(k+1)*x^k/k^1.5, k, 1, 200); x
x: 0, 1
y: 0, 2.7
labels: 玻色; 费米; 经典
caption: 三种统计下密度 $n\lambda^3/g$ 对逸度 $z = e^{\mu/k_BT}$ 作图。$z = 0$ 附近三条曲线重合，这就是经典极限。往右看：同样密度下玻色曲线要的 $z$ 最小，费米曲线要的 $z$ 最大。玻色曲线在 $z = 1$ 处陡升到 $\zeta(3/2) = 2.612$ 且不能再往前（画出的级数截到 200 项，故终点略低）。费米曲线在现实中越过 $z = 1$ 继续延伸；这一级数形式只覆盖 $z \le 1$。
:::

::: warning 量子修正不是相互作用
修正 [[#eq-virial]] 存在于粒子之间没有任何力的气体中。切不可把它与真实分子间力产生的第二位力系数混淆：氦在几开尔文时后者大小相当、作用方向却相反。真实气体里两者都有贡献。同样，金属中电子周围的"交换空穴"是一种统计效应，不是库仑效应，尽管两者都存在、都降低能量。
:::

## 态密度 {#dos}

对宏观容器，轨道密集到对它们的求和可以化成对能量的积分。积分里的权重是单位能量的轨道数。

::: theorem 自由粒子的态密度 {#thm-dos}
体积 $V$ 的容器中，质量为 $m$、内部简并度为 $g$ 的非相对论粒子，能量在 $\varepsilon$ 与 $\varepsilon + \dd\varepsilon$ 之间的轨道数为 $D(\varepsilon)\,\dd\varepsilon$，其中

$$
D(\varepsilon) = \frac{gV}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\varepsilon^{1/2}.
$$ {#eq-dos}

对光子，$\varepsilon = \hbar ck$，$g = 2$ 个偏振，$D(\varepsilon) = V\varepsilon^2/(\pi^2\hbar^3c^3)$。
:::

::: proof
在边长 $L$ 的立方箱上用周期性边界条件，它给出与硬壁相同体块计数，但更简单。轨道是平面波 $e^{i\mathbf k\cdot\mathbf r}$，$\mathbf k = (2\pi/L)(n_x, n_y, n_z)$，$n_i$ 为整数，所以每个允许的 $\mathbf k$ 占据 $\mathbf k$ 空间中 $(2\pi/L)^3 = (2\pi)^3/V$ 的体积。$\lvert\mathbf k\rvert < k$ 的轨道数是 $g$ 倍球体积除以每点体积：

$$
\mathcal N(k) = g\,\frac{\tfrac43\pi k^3}{(2\pi)^3/V} = \frac{gVk^3}{6\pi^2}.
$$

自由粒子 $\varepsilon = \hbar^2k^2/2m$，故 $k = (2m\varepsilon)^{1/2}/\hbar$，$\mathcal N(\varepsilon) = (gV/6\pi^2)(2m\varepsilon/\hbar^2)^{3/2}$。对 $\varepsilon$ 求导即得 [[#eq-dos]]。

对光子，$k = \varepsilon/\hbar c$、$g = 2$，故 $\mathcal N = V\varepsilon^3/(3\pi^2\hbar^3c^3)$，其导数是 $V\varepsilon^2/(\pi^2\hbar^3c^3)$。
:::

有了 $D(\varepsilon)$，理想量子气体的粒子数与能量为

$$
N = \int_0^\infty D(\varepsilon)\,\bar n(\varepsilon)\,\dd\varepsilon, \qquad U = \int_0^\infty\varepsilon\,D(\varepsilon)\,\bar n(\varepsilon)\,\dd\varepsilon.
$$ {#eq-n-u-integrals}

给定 $N$、$V$、$T$，第一个方程定出 $\mu$；再由第二个给出 $U$。[[statistical-mechanics/bose-fermi]] 里的每一个计算都是这个形状。

::: example 数电子轨道 {#ex-count-orbitals}
体积 $1.00\,\mathrm{cm^3}$ 的箱中，动能低于 $1.00\,\mathrm{eV}$ 的电子轨道（含两个自旋态）有多少个？
::: solution
由 [[#thm-dos]] 的证明，取 $g = 2$，

$$
\mathcal N(\varepsilon) = \frac{2V}{6\pi^2}\left(\frac{2m\varepsilon}{\hbar^2}\right)^{3/2} = \frac{V(2m\varepsilon)^{3/2}}{3\pi^2\hbar^3}.
$$

取 $m = 9.1093837\times10^{-31}\,\mathrm{kg}$、$\varepsilon = 1.602176634\times10^{-19}\,\mathrm{J}$，$(2m\varepsilon)^{1/2} = 5.402\times10^{-25}\,\mathrm{kg\,m/s}$，其立方为 $1.577\times10^{-73}$。再取 $\hbar^3 = 1.173\times10^{-102}$、$V = 10^{-6}\,\mathrm{m^3}$，

$$
\mathcal N = \frac{10^{-6}\times1.577\times10^{-73}}{3\pi^2\times1.173\times10^{-102}} = 4.54\times10^{21}.
$$

这已经很多，但同样一立方厘米的铜有 $8.5\times10^{22}$ 个导电电子，是它的十九倍。每个轨道至多一个电子，所以即使在绝对零度，其中大多数也必须待在远高于 $1\,\mathrm{eV}$ 的能量上。这就是简并费米气体，下一章将其定量。
:::
:::

有一个有用的恒等式，对任何幂律色散的理想气体都成立，无论哪种统计。

::: proposition 压强与能量 {#prop-pv-u}
对服从费米-狄拉克、玻色-爱因斯坦或麦克斯韦-玻尔兹曼统计的非相对论粒子（$\varepsilon \propto k^2$）理想气体，$PV = \tfrac23U$。对无质量粒子（$\varepsilon \propto k$），如光子，$PV = \tfrac13U$。
:::

证明是把 $\Phi = -PV$ 写成对 $D(\varepsilon)$ 的积分后分部积分，留作习题。对经典气体，$PV = \tfrac23\cdot\tfrac32Nk_BT$ 就是理想气体定律。对简并电子气，它给出一个在 $T = 0$ 仍存续的压强；对辐射，它给出辐射压 $u/3$。

::: remark 不守恒的粒子
空腔中的光子和晶体中的声子被器壁或非谐相互作用随意产生和湮灭，它们的数目不受任何条件固定。于是在固定 $T$、$V$ 下，粒子数自行调整以最小化自由能，而这要求 $(\partial F/\partial N)_{T,V} = \mu = 0$。它们的占据因此就是 $\mu = 0$ 的玻色-爱因斯坦分布，$\bar n = 1/(e^{\beta\varepsilon} - 1)$，即 [[statistical-mechanics/canonical]] 中对一个谐振子求得的普朗克分布。两种描述一致：频率为 $\omega$ 的一个电磁模式就是一个谐振子，而"模式中 $n$ 个光子"是它的第 $n$ 个激发态。
:::

::: quiz
下列哪些理想气体可以用 $\mu = 0$ 的玻色-爱因斯坦分布处理？
- [x] 温度 $T$ 的空腔中的黑体光子。
- [ ] 密闭囚禁中稀薄的 $^{87}$Rb 原子气体。
- [x] 温度 $T$ 的晶体中的声子。
- [ ] 金属中的导电电子。
::: solution
光子与声子不守恒，其化学势为零。密闭囚禁中的铷原子守恒，$\mu$ 由粒子数定出且为负（只在凝聚时才趋近零）。电子是费米子，需要费米-狄拉克分布，$\mu$ 在费米能附近。
:::
:::

::: example 玻色统计对光何时要紧 {#ex-photon-occupation}
求每个模式的平均光子数 $\bar n = 1/(e^{hc/\lambda k_BT} - 1)$：(a) 绿色光 $\lambda = 500\,\mathrm{nm}$，处于太阳表面温度 $5772\,\mathrm{K}$ 的热平衡；(b) 同一波长在 $300\,\mathrm{K}$；(c) 波长 $10\,\mathrm{cm}$ 的微波在 $300\,\mathrm{K}$。
::: solution
组合 $hc/k_B = 1.4388\times10^{-2}\,\mathrm{m\,K}$ 直接给出 $x = hc/\lambda k_BT$。

(a) $x = 1.4388\times10^{-2}/(5.00\times10^{-7}\times5772) = 4.985$，$\bar n = 1/(e^{4.985} - 1) = 6.9\times10^{-3}$。即便是源头处的阳光，可见光频段每个模式也不到百分之一一个光子：占据很小，玻尔兹曼统计给出的答案几乎相同。

(b) $x = 95.9$，$\bar n = e^{-95.9} \approx 2\times10^{-42}$。室温物体不发可见光。

(c) $x = 1.4388\times10^{-2}/(0.100\times300) = 4.80\times10^{-4}$，$\bar n \approx 1/x = 2085$。这里每个模式装着数千个光子，经典的瑞利-金斯极限适用，场表现得像经典波，每个模式带着 $k_BT$ 的热噪声，这就是无线电工程里的约翰逊-奈奎斯特（Johnson–Nyquist）噪声。

同一种光子气体，短波像"经典粒子"，长波像"经典波"。玻色-爱因斯坦统计在两者之间插值，它的 $-1$ 正是让 $hc/\lambda \sim k_BT$ 处发生过渡的东西。
:::
:::

::: remark 复合粒子
一个原子是玻色子还是费米子，取决于它所含费米子的总数，因为交换两个原子就是同时交换它们的全部组分。质子、中子与电子总数为偶数的原子是玻色子；奇数则是费米子。于是 $^4$He（2 + 2 + 2 = 6）与 $^{87}$Rb（37 + 50 + 37 = 124）是玻色子，而 $^3$He（2 + 1 + 2 = 5）与 $^6$Li（3 + 3 + 3 = 9）是费米子。只要内部结构不被分辨——也就是原子彼此靠得不近于自身线度——这条规则就成立，稀薄气体正是这种情形。
:::

::: application 朗缪尔（Langmuir）吸附
具有 $M$ 个独立结合位的表面，每个位至多结合一个能量为 $\varepsilon_b$ 的分子，与化学势为 $\mu$ 的气体接触，就是一组能量为 $-\varepsilon_b$ 的费米-狄拉克"轨道"，无论分子是不是费米子：这里的排斥是几何的。被占位比例为 $\theta = 1/(e^{-\beta(\varepsilon_b + \mu)} + 1)$。对气体用 $e^{\beta\mu} = n\lambda^3 \propto P$，它就化为 $\theta = KP/(1 + KP)$，表面化学的朗缪尔等温线，其中 $K$ 可由分子数据算出。化学图谱从化学家的一面发展量子统计，包括氢的正仲形式，见[量子统计](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=quantum-statistics)。
:::

::: history 玻色、爱因斯坦、费米与狄拉克
1924 年，在达卡的萨蒂延德拉·纳特·玻色（Satyendra Nath Bose）给爱因斯坦寄去一份普朗克辐射定律的推导：它把相空间格元里的光子当作不可分辨的来计数，完全不依赖经典电动力学。爱因斯坦把它译成德文，刊登在《Zeitschrift für Physik》（1924）上，随后又在 1924 与 1925 年的论文里把同样的计数用于原子气体，后一篇预言了凝聚。沃尔夫冈·泡利（Wolfgang Pauli）1925 年陈述了原子中电子的不相容原理。恩里科·费米（Enrico Fermi）在 1926 年初把它用于理想气体，得到带 $+1$ 的分布；保罗·狄拉克（Paul Dirac）在 1926 年晚些时候独立地把两种统计与对称和反对称波函数联系起来，维尔纳·海森堡（Werner Heisenberg）同年也做到了这一点。狄拉克 1945 年为两类粒子命名玻色子与费米子。自旋–统计联系由马库斯·菲耶尔茨（Markus Fierz）1939 年与泡利 1940 年对自由场证明。
:::

## 后续内容 {#leads}

现在万事俱备，可以计算了。[[statistical-mechanics/bose-fermi]] 在四个范围内计算 [[#eq-n-u-integrals]] 的积分：$\mu = 0$ 的光子，给出普朗克定律与斯特藩-玻尔兹曼常数；声子，给出德拜热容；简并电子气，以金属与白矮星为例；以及会凝聚的理想玻色气体。在 [[condensed-matter/free-electrons]] 里，费米-狄拉克分布是输运的出发点；在 [[condensed-matter/semiconductors]] 里，它给出载流子密度。巨正则系综还将在 [[statistical-mechanics/phase-transitions]] 里回来：格点上粒子的格点气体，原来就是换了装束的伊辛模型。

::: summary
- 全同粒子要么是玻色子（对称态，整数自旋），要么是费米子（反对称，半整数自旋）。理想气体的状态是一组占据数 $n_k$，费米子的 $n_k \in \{0, 1\}$。
- 巨正则系综以 $e^{-\beta(E - \mu N)}$ 给微观状态加权；$\Phi = -k_BT\ln\mathcal Z = -PV$，且 $\langle N\rangle = -\partial\Phi/\partial\mu$。
- 对理想气体，$\mathcal Z$ 沿轨道因子化，给出费米子的 $\bar n = 1/(e^{\beta(\varepsilon - \mu)} + 1)$ 与玻色子的 $1/(e^{\beta(\varepsilon - \mu)} - 1)$，玻色子的 $\mu$ 低于最低轨道。
- 当 $e^{\beta\mu} \ll 1$，即 $n\lambda^3/g \ll 1$ 时，两者都化为麦克斯韦-玻尔兹曼占据 $e^{-\beta(\varepsilon - \mu)}$，并恢复出 $Z_N = (gZ_1)^N/N!$。
- 压强的第一个量子修正是 $\pm n\lambda^3/(4\sqrt2g)$，对费米子抬高、对玻色子压低，其中没有任何力的参与。
- 自由粒子的态密度为 $D(\varepsilon) = (gV/4\pi^2)(2m/\hbar^2)^{3/2}\varepsilon^{1/2}$；$N$ 与 $U$ 是 $D\bar n$ 与 $\varepsilon D\bar n$ 的积分。
- 对任何理想非相对论气体 $PV = \tfrac23U$；对光子 $PV = \tfrac13U$。
:::

## 习题 {#exercises}

::: exercise 两个玻色子，四个轨道 {level=1 check="10"}
两个全同玻色子放在四个轨道里。不同的两粒子态有多少个？若粒子是费米子呢？
::: solution
对玻色子数和为 $2$ 的占据数组 $(n_1, \dots, n_4)$：用点与竖线计数，$\binom{2 + 4 - 1}{2} = \binom52 = 10$。它们是 $4$ 个双占态与 $\binom42 = 6$ 个两个不同轨道各占一个的态。对费米子，只允许 $6$ 个两两单占的组。
:::
:::

::: exercise 费米能之上的一个占据 {level=1 check="0.0205"}
求 $300\,\mathrm{K}$ 下比化学势高 $0.100\,\mathrm{eV}$ 的轨道的费米-狄拉克占据，取三位有效数字。
::: solution
与 [[#ex-fermi-step]] 相同，$(\varepsilon - \mu)/k_BT = 0.100/0.025852 = 3.868$，于是

$$
\bar n = \frac{1}{e^{3.868} + 1} = 0.0205.
$$

麦克斯韦-玻尔兹曼值 $e^{-3.868} = 0.0209$ 只高 $2\%$：离 $\mu$ 这个距离上，统计几乎无关紧要。
:::
:::

::: exercise 拥挤的玻色轨道 {level=1 check="1/(exp(0.1)-1)"}
求 $\varepsilon - \mu = 0.1\,k_BT$ 的轨道的玻色-爱因斯坦占据及其标准差。
::: solution
由 [[#eq-distributions]]，

$$
\bar n = \frac{1}{e^{0.1} - 1} = 9.51.
$$

由 [[#eq-occupation-fluct]]，方差为 $\bar n(1 + \bar n) = 9.51\times10.51 = 99.9$，故标准差为 $10.0$，比均值还大。同样均值的泊松变量标准差只是 $3.08$。
:::
:::

::: exercise 沸点附近的氦蒸气 {level=2 check="0.976"}
把 $4.20\,\mathrm{K}$、$101325\,\mathrm{Pa}$ 下的氦-4 气体（$g = 1$，$m = 4.002602\,\mathrm{u}$）当作理想玻色气体。求 $n\lambda^3$ 以及 [[#eq-virial]] 预言的比值 $PV/Nk_BT$，取三位有效数字。
::: solution
数密度 $n = P/k_BT = 101325/(1.380649\times10^{-23}\times4.20) = 1.747\times10^{27}\,\mathrm{m^{-3}}$（在这一阶用理想气体定律取 $n$ 是自洽的）。热波长 $\lambda = h/\sqrt{2\pi mk_BT} = 4.258\times10^{-10}\,\mathrm{m}$，故 $\lambda^3 = 7.720\times10^{-29}\,\mathrm{m^3}$，$n\lambda^3 = 0.135$。玻色子取下面符号，

$$
\frac{PV}{Nk_BT} = 1 - \frac{0.135}{4\sqrt2} = 1 - 0.0238 = 0.976.
$$

量子修正使压强降低 $2.4\%$。沸点上真实氦气偏离理想行为的幅度比这更大，因为范德瓦尔斯吸引力贡献了同号、数量级相当的修正。
:::
:::

::: exercise 小体积内的粒子数涨落 {level=2 check="2.02e-4"}
$300\,\mathrm{K}$、$101325\,\mathrm{Pa}$ 的空气当作经典理想气体。求边长 $1.00\,\mu\mathrm{m}$ 的开放立方内分子数的相对标准差，取三位有效数字。
::: solution
平均粒子数 $\langle N\rangle = PV/k_BT = 101325\times10^{-18}/(4.1419\times10^{-21}) = 2.446\times10^{7}$。由 [[#ex-classical-grand]] 分布是泊松的，所以标准差为 $\sqrt{\langle N\rangle}$，相对涨落为

$$
\frac{1}{\sqrt{\langle N\rangle}} = \frac{1}{\sqrt{2.446\times10^7}} = 2.02\times10^{-4}.
$$
:::
:::

::: exercise 立方箱中的轨道 {level=2 check="4.54e21"}
用 [[#thm-dos]] 的态密度，把电子在 $1.00\,\mathrm{cm^3}$ 中的 $D(\varepsilon)$ 从 $0$ 积到 $1.00\,\mathrm{eV}$，校核 [[#ex-count-orbitals]] 的计数，并给出三位有效数字的结果。
::: solution
取 $g = 2$，

$$
\int_0^{\varepsilon_1}D(\varepsilon)\,\dd\varepsilon = \frac{2V}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\cdot\frac23\varepsilon_1^{3/2} = \frac{V}{3\pi^2}\left(\frac{2m\varepsilon_1}{\hbar^2}\right)^{3/2},
$$

正是那道例子里用的公式。数值上 $2m\varepsilon_1/\hbar^2 = 2.624\times10^{19}\,\mathrm{m^{-2}}$，其 $3/2$ 次幂为 $1.344\times10^{29}\,\mathrm{m^{-3}}$，除以 $3\pi^2 = 29.61$、乘以 $V = 10^{-6}\,\mathrm{m^3}$，得 $4.54\times10^{21}$。
:::
:::

::: exercise 理想气体的压强与能量 {level=3}
证明 [[#prop-pv-u]]。设 $D(\varepsilon) = CV\varepsilon^{\alpha}$（$C$ 与 $\alpha > -1$ 为某常数），证明费米-狄拉克、玻色-爱因斯坦与麦克斯韦-玻尔兹曼统计同样给出 $PV = U/(\alpha + 1)$。由此推出陈述中的两个结论。
::: hint
写出 $PV = -\Phi = \pm k_BT\int_0^\infty D(\varepsilon)\ln(1 \pm e^{-\beta(\varepsilon - \mu)})\,\dd\varepsilon$ 并分部积分：把 $\varepsilon^\alpha$ 积出去，对数求导。
:::
::: solution
由 [[#thm-distributions]] 与 [[#thm-grand-potential]]，上面符号对应费米子，

$$
PV = -\Phi = \pm k_BT\int_0^\infty CV\varepsilon^\alpha\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\,\dd\varepsilon.
$$

用 $\dd(\varepsilon^{\alpha+1}/(\alpha+1))$ 分部积分：

$$
PV = \pm k_BT\,CV\left[\frac{\varepsilon^{\alpha+1}}{\alpha+1}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\right]_0^\infty \mp k_BT\,CV\int_0^\infty\frac{\varepsilon^{\alpha+1}}{\alpha+1}\deriv{}{\varepsilon}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr)\,\dd\varepsilon.
$$

边界项为零：$\varepsilon = 0$ 处因为 $\alpha + 1 > 0$；$\varepsilon \to \infty$ 处因为对数按 $e^{-\beta\varepsilon}$ 衰减。（对玻色子我们需要 $\mu < 0$，对数在 $\varepsilon = 0$ 处才有限。）导数为

$$
\deriv{}{\varepsilon}\ln\bigl(1 \pm e^{-\beta(\varepsilon - \mu)}\bigr) = \frac{\mp\beta e^{-\beta(\varepsilon - \mu)}}{1 \pm e^{-\beta(\varepsilon - \mu)}} = \frac{\mp\beta}{e^{\beta(\varepsilon - \mu)} \pm 1} = \mp\beta\,\bar n(\varepsilon).
$$

代入，符号合为 $+$，且 $k_BT\beta = 1$：

$$
PV = \frac{1}{\alpha + 1}\int_0^\infty\varepsilon\,CV\varepsilon^\alpha\,\bar n(\varepsilon)\,\dd\varepsilon = \frac{U}{\alpha + 1}.
$$

对麦克斯韦-玻尔兹曼统计，$\ln(1 \pm x) \to \pm x$，同样步骤适用，$\bar n = e^{-\beta(\varepsilon - \mu)}$。非相对论粒子 $D \propto \varepsilon^{1/2}$，即 $\alpha = \tfrac12$，得 $PV = \tfrac23U$。光子 $D \propto \varepsilon^2$，即 $\alpha = 2$，得 $PV = \tfrac13U$。
:::
:::

::: exercise 第一个量子修正 {level=3}
对简并度为 $g$、$D(\varepsilon)$ 如 [[#eq-dos]] 的理想气体，证明

$$
\frac{N\lambda^3}{gV} = \sum_{j=1}^\infty(\mp1)^{j+1}\frac{z^j}{j^{3/2}}, \qquad \frac{P\lambda^3}{gk_BT} = \sum_{j=1}^\infty(\mp1)^{j+1}\frac{z^j}{j^{5/2}},
$$

其中 $z = e^{\beta\mu} < 1$，上面符号对应费米子。在一阶消去 $z$，导出 [[#eq-virial]]。
::: hint
把 $\bar n = ze^{-\beta\varepsilon}/(1 \pm ze^{-\beta\varepsilon})$ 按 $ze^{-\beta\varepsilon}$ 展开成几何级数，并用 $\int_0^\infty\varepsilon^{1/2}e^{-j\beta\varepsilon}\,\dd\varepsilon = \Gamma(\tfrac32)(j\beta)^{-3/2}$，其中 $\Gamma(\tfrac32) = \sqrt\pi/2$。压强用 $PV = \tfrac23U$。
:::
::: solution
记 $y = ze^{-\beta\varepsilon} < 1$。则 $\bar n = y/(1 \pm y) = \sum_{j\ge1}(\mp1)^{j+1}y^j$。取 $D(\varepsilon) = A\varepsilon^{1/2}$，$A = (gV/4\pi^2)(2m/\hbar^2)^{3/2}$，

$$
N = A\sum_j(\mp1)^{j+1}z^j\int_0^\infty\varepsilon^{1/2}e^{-j\beta\varepsilon}\,\dd\varepsilon = A\,\frac{\sqrt\pi}{2}(k_BT)^{3/2}\sum_j(\mp1)^{j+1}\frac{z^j}{j^{3/2}}.
$$

如今 $A(\sqrt\pi/2)(k_BT)^{3/2} = (gV/4\pi^2)(2mk_BT/\hbar^2)^{3/2}(\sqrt\pi/2)$。利用 $\hbar = h/2\pi$，$(2mk_BT/\hbar^2)^{3/2} = (2\pi)^3(2mk_BT)^{3/2}/h^3$，前置因子化为 $gV(2\pi)^3\sqrt\pi(2mk_BT)^{3/2}/(8\pi^2h^3) = gV(2\pi mk_BT)^{3/2}/h^3 = gV/\lambda^3$。这就是第一个级数。

能量方面，同样步骤换用 $\varepsilon^{3/2}$ 与 $\Gamma(\tfrac52) = \tfrac32\Gamma(\tfrac32)$，得 $U = \tfrac32k_BT(gV/\lambda^3)\sum(\mp1)^{j+1}z^j/j^{5/2}$，再由 $PV = \tfrac23U$ 得第二个级数。

到一阶，记 $y_0 = N\lambda^3/(gV) = n\lambda^3/g$，

$$
y_0 = z \mp \frac{z^2}{2^{3/2}}, \qquad\text{于是}\qquad z = y_0 \pm \frac{y_0^2}{2^{3/2}} + O(y_0^3).
$$

从而

$$
\frac{PV}{Nk_BT} = \frac{z \mp z^2/2^{5/2}}{z \mp z^2/2^{3/2}} = 1 \mp z\left(\frac{1}{2^{5/2}} - \frac{1}{2^{3/2}}\right) + O(z^2) = 1 \pm \frac{z}{2^{5/2}} + O(z^2),
$$

因为 $2^{-5/2} - 2^{-3/2} = -2^{-5/2}$。在这一阶把 $z$ 换成 $y_0$，并用 $2^{5/2} = 4\sqrt2$，

$$
\frac{PV}{Nk_BT} = 1 \pm \frac{n\lambda^3}{4\sqrt2\,g} + O\bigl((n\lambda^3)^2\bigr),
$$

上面符号是升高，对应费米子。这正是 [[#eq-virial]]。
:::
:::
