[[statistical-mechanics/microcanonical]] 的微正则系综描述一个与世隔绝、能量固定的系统。我们测量的东西几乎没有一样是这样。烧瓶里的气体、实验台上的晶体、溶液中的分子：每一个都在与外界交换能量，被保持在某个温度上，而不是保持在某个能量上。它的能量在涨落。问题变成：在温度 $T$ 下，系统处于能量为 $E_s$ 的某个特定微观状态 $s$ 的概率是多少？

答案是**玻尔兹曼因子** $e^{-E_s/k_BT}$，它是统计物理里使用最多的公式。我们从微正则基本假设出发把它推导出来，把外界当作一个巨大的热库。它的归一化求和——**配分函数** $Z$——原来包含着全部热力学：能量、熵、自由能、压强、热容全是 $\ln Z$ 的导数。有了它，我们证明 [[thermodynamics/kinetic-theory]] 只好假设的能量均分定理，看清它对量子化的运动为什么会失效，并算出温度固定的系统其能量涨落到底有多大。

全文之中 $\beta = 1/k_BT$。它是自然变量：$\beta$ 就是上一章那个 $\partial(\ln\Omega)/\partial U$，两个相互接触的系统共享的量。

## 系统与热库 {#reservoir}

考虑一个小系统 S 与一个巨大的系统 R——**热库**——热接触，整个复合体孤立，总能量为 $U_0$。"小"只是说 S 持有的能量占比可以忽略；S 仍可以是宏观的。我们要求 S 处于某个特定微观状态 $s$（能量 $E_s$）的概率。

::: theorem 玻尔兹曼分布 {#thm-boltzmann}
与温度为 $T$ 的热库处于热平衡的系统，出现在能量为 $E_s$ 的微观状态 $s$ 上的概率为

$$
p_s = \frac{e^{-\beta E_s}}{Z}, \qquad Z = \sum_s e^{-\beta E_s}, \qquad \beta = \frac{1}{k_BT}.
$$ {#eq-boltzmann}

求和跑遍微观状态，不是能级。
:::

::: proof
S 一旦固定在微观状态 $s$，热库就有能量 $U_0 - E_s$，可以处于它的 $\Omega_R(U_0 - E_s)$ 个微观状态中的任何一个。复合系统孤立，所以由基本假设，这对系统的每个微观状态等概率。S 在 $s$ 时这对系统的微观状态数是 $1\times\Omega_R(U_0 - E_s)$，于是

$$
p_s \propto \Omega_R(U_0 - E_s) = \exp\left[\frac{S_R(U_0 - E_s)}{k_B}\right].
$$

把热库的熵按 $E_s$ 的幂展开——$E_s$ 与 $U_0$ 相比微乎其微：

$$
S_R(U_0 - E_s) = S_R(U_0) - E_s\pdv{S_R}{U} + \frac{E_s^2}{2}\frac{\partial^2 S_R}{\partial U^2} - \dots
$$

一阶导数是 $1/T$，热库的温度——[[statistical-mechanics/microcanonical]] 里的定义。二阶导数是 $\partial(1/T)/\partial U = -1/(T^2C_R)$，$C_R$ 是热库的热容。二阶项与一阶项之比为 $E_s/(TC_R)$ 量级：热库若交出 $E_s$ 会降的温度，除以 $T$。热库足够大时，这个比值可以任意小，展开可以在线性项之后截断。于是

$$
p_s \propto e^{S_R(U_0)/k_B}\,e^{-E_s/k_BT}.
$$

第一个因子不依赖 $s$。按 $\sum_s p_s = 1$ 归一化就得 [[#eq-boltzmann]]。
:::

注意证明没有用到什么：除了一列能量之外，没有用到 S 的任何性质。S 可以是一个原子、一个分子、一个磁偶极子、一升气体。热库只通过它的温度进来。按 [[#eq-boltzmann]] 分布的 S 的复制品全体构成**正则系综**。

若干微观状态分享同一能量时，它们的概率相加。能级 $E_j$ 有**简并度** $g_j$（那么多微观状态）时，该能级的概率为

$$
P(E_j) = \frac{g_j\,e^{-\beta E_j}}{Z}, \qquad Z = \sum_j g_j\,e^{-\beta E_j}.
$$ {#eq-levels}

::: warning 是态，不是能级
玻尔兹曼因子给每个*微观状态*加权。简并度为 $g$ 的能级拿到 $g$ 份权重。忘掉简并度会把占据数算错：转动能级（$g = 2J+1$）、原子能级（氢含自旋 $g = 2n^2$）、固体中的电子都如此。两个微观状态的概率之比是 $e^{-\beta(E_2 - E_1)}$；两个能级的概率之比是 $(g_2/g_1)e^{-\beta(E_2 - E_1)}$。
:::

::: example 太阳里被激发的氢 {#ex-sun}
太阳光球层的温度在 $5800\,\mathrm{K}$ 上下。氢的 $n = 2$ 能级比基态高 $\Delta E = 10.20\,\mathrm{eV}$；计入自旋，简并度为 $g_1 = 2$、$g_2 = 8$。求 $n = 2$ 上的原子数与 $n = 1$ 上的原子数之比。
::: solution
$5800\,\mathrm{K}$ 时

$$
k_BT = \frac{1.380649\times10^{-23}\times5800}{1.602176634\times10^{-19}}\,\mathrm{eV} = 0.4998\,\mathrm{eV}.
$$

由 [[#eq-levels]]，比值中配分函数相消：

$$
\frac{N_2}{N_1} = \frac{g_2}{g_1}\,e^{-\Delta E/k_BT} = 4\,e^{-10.20/0.4998} = 4\,e^{-20.41} = 5.5\times10^{-9}.
$$

大约十亿个原子里有五个处在第一激发态。然而从 $n = 2$ 起步的巴耳末（Balmer）吸收线在太阳光谱里依然显眼，因为氢实在太多。要紧的是指数：比基态高出 $10$ 倍 $k_BT$ 的能级被压低到 $e^{-10} \approx 4.5\times10^{-5}$，高出 $20$ 倍的压低到 $2\times10^{-9}$。塞西莉亚·佩恩（Cecilia Payne）在 1925 年的博士论文里论证"恒星主要是氢"，用的正是这套推理，再加上萨哈（Saha）的电离方程。
:::
:::

## 配分函数 {#partition}

归一化求和 $Z(\beta)$ 起初只是作为方便引进的。它远不只是方便。

::: definition 配分函数 {#def-z}
具有能量为 $E_s$ 的微观状态 $s$ 的系统，其**正则配分函数**为

$$
Z(T, V, N) = \sum_s e^{-E_s/k_BT}.
$$ {#eq-z}

它经由 $\beta$ 依赖 $T$，经由能级 $E_s$ 依赖 $V$ 与 $N$。
:::

$Z$ 无量纲，并且粗略地说，数的是热学上可及的微观状态数：$E_s - E_0 \lesssim k_BT$ 的态每个大约贡献 $1$，高出很多的态几乎不贡献。$T \to 0$ 时 $Z \to g_0e^{-\beta E_0}$，即基态项。德语名 *Zustandssumme*（"对状态求和"）就是字母 $Z$ 的来历。

::: theorem 从配分函数求能量 {#thm-energy}
正则系综中系统的平均能量为

$$
U = \langle E\rangle = -\pdv{\ln Z}{\beta}.
$$ {#eq-u}
:::

::: proof
把 $Z = \sum_s e^{-\beta E_s}$ 逐项求导：$\partial Z/\partial\beta = -\sum_s E_se^{-\beta E_s}$。于是

$$
-\pdv{\ln Z}{\beta} = -\frac{1}{Z}\pdv{Z}{\beta} = \sum_s E_s\frac{e^{-\beta E_s}}{Z} = \sum_s E_sp_s = \langle E\rangle.
$$
:::

### 自由能与熵

对固定的 $T$、$V$、$N$，自然的热力学势是 [[thermodynamics/potentials]] 的亥姆霍兹自由能 $F = U - TS$，其微分为 $\dd F = -S\,\dd T - P\,\dd V + \mu\,\dd N$。配分函数直接把它交出来。

::: theorem 从配分函数求自由能 {#thm-free-energy}
定义 $F = -k_BT\ln Z$。则

$$
F = U - TS, \qquad S = -\left(\pdv{F}{T}\right)_{V, N} = -k_B\sum_s p_s\ln p_s, \qquad P = -\left(\pdv{F}{V}\right)_{T, N}.
$$ {#eq-f}

对宏观系统，以 $N$ 的首阶计，这个 $S$ 与同一平均能量下孤立系统的玻尔兹曼熵 $k_B\ln\Omega(U)$ 一致。
:::

::: proof
熵。由 $p_s = e^{-\beta E_s}/Z$，$\ln p_s = -\beta E_s - \ln Z$，所以

$$
-k_B\sum_s p_s\ln p_s = k_B\beta\sum_s p_sE_s + k_B\ln Z\sum_s p_s = \frac{U}{T} + k_B\ln Z = \frac{U - F}{T}.
$$

于是量 $S = -k_B\sum p_s\ln p_s$ 满足 $F = U - TS$。现在固定 $V$ 与 $N$ 对 $F = -k_BT\ln Z$ 关于 $T$ 求导，用 $\partial\beta/\partial T = -1/(k_BT^2)$ 与 [[#eq-u]]：

$$
-\pdv{F}{T} = k_B\ln Z + k_BT\pdv{\ln Z}{\beta}\pdv{\beta}{T} = k_B\ln Z + \frac{U}{T} = S.
$$

压强。每个能量都依赖 $V$；缓慢改变体积使系统留在同一个量子态（绝热定理），态 $s$ 中外界对它做的功为 $(\partial E_s/\partial V)\,\dd V$。平均压强因此是 $P = \langle-\partial E_s/\partial V\rangle$，而

$$
-\pdv{F}{V} = k_BT\frac{1}{Z}\pdv{Z}{V} = k_BT\frac{1}{Z}\sum_s(-\beta)\pdv{E_s}{V}e^{-\beta E_s} = \sum_s p_s\left(-\pdv{E_s}{V}\right) = P.
$$

与 $k_B\ln\Omega$ 一致，概略。把态按能量分组，$Z = \int\Omega(E)e^{-\beta E}\,\dd E/\delta E$。对宏观系统，$\Omega(E)$ 像 $e^{N\cdot(\text{某量})}$ 那样增长，$e^{-\beta E}$ 像 $e^{-N\cdot(\text{某量})}$ 那样衰减，所以被积函数在 $\partial\ln\Omega/\partial E = \beta$ 的能量 $U$ 处有一个尖锐的极大，宽度为单粒子能量的 $\sqrt N$ 量级（在 [[#thm-fluctuations]] 中算过）。于是 $\ln Z = \ln\Omega(U) - \beta U + O(\ln N)$，从而 $F = U - Tk_B\ln\Omega(U) + O(\ln N)$。前两项都是 $N$ 量级；修正项不是。与 $F = U - TS$ 比较得首阶意义下 $S = k_B\ln\Omega(U)$。细节见帕斯里亚（Pathria）与比尔（Beale）第 3 章。
:::

公式 $S = -k_B\sum_s p_s\ln p_s$ 是**吉布斯熵**。对微正则分布——$\Omega$ 个态上 $p_s = 1/\Omega$——它精确地回到 $k_B\ln\Omega$。除去常数与对数的底，它也是香农（Shannon）的信息度量（1948）：熵就是"系统究竟占据哪个微观状态"这件事上缺失的信息。

::: intuition 一整个热力学装在一个函数里
$Z(T, V, N)$ 一旦知道，每个平衡性质都由求导跟上：$F = -k_BT\ln Z$，然后 $S$、$P$、$\mu$ 从 $F$ 的偏导数，$U = F + TS$，以及 $C_V = \partial U/\partial T$。物理在能级里；剩下的全是微积分。一个常用技巧是把能量零点取在基态：所有 $E_s$ 平移常数 $E_0$ 只把 $Z$ 乘上 $e^{-\beta E_0}$、把 $F$ 与 $U$ 平移 $E_0$，$S$、$P$、$C_V$ 岿然不动。
:::

### 独立的子系统

系统由互不作用的部件组成时，它的能量是求和，它的配分函数是乘积。

::: proposition 因子化 {#prop-factor}
若系统由两个独立部分组成，微观状态为 $(a, b)$，能量 $E_{a,b} = E_a + E_b$，则 $Z = Z_1Z_2$。对 $N$ 个独立、可分辨、彼此全同的子系统，$Z = z^N$，其中 $z$ 是单个子系统的配分函数，且 $F = -Nk_BT\ln z$。
:::

::: proof
和的指数是乘积，所以对所有配对 $(a, b)$ 的求和因子化：

$$
Z = \sum_a\sum_b e^{-\beta(E_a + E_b)} = \left(\sum_a e^{-\beta E_a}\right)\left(\sum_b e^{-\beta E_b}\right) = Z_1Z_2.
$$

对 $N$ 个全同独立子系统归纳即得 $z^N$——前提是"先数子系统 $1$ 的状态、再数子系统 $2$ 的状态……"恰好把每个微观状态数一遍。子系统可分辨时这一前提成立，例如按它们在晶体中的位置分辨。
:::

这个前提要紧。对 $N$ 个全同的气体原子，交换原子不产生新的微观状态，$z^N$ 多计了。经典极限下的修正 $Z = z^N/N!$，就是 [[statistical-mechanics/classical-gas]] 的主题。

::: example 二能级系统 {#ex-two-level}
$N$ 个可分辨的独立子系统，每一个都有一个能量为 $0$ 的基态和一个能量为 $\Delta$ 的激发态。求平均能量与热容，并找出热容的极大值位置。
::: solution
单个子系统 $z = 1 + e^{-\beta\Delta}$。由 [[#prop-factor]]，$\ln Z = N\ln(1 + e^{-\beta\Delta})$，由 [[#eq-u]] 得

$$
U = -N\pdv{}{\beta}\ln(1 + e^{-\beta\Delta}) = \frac{N\Delta\,e^{-\beta\Delta}}{1 + e^{-\beta\Delta}} = \frac{N\Delta}{e^{\beta\Delta} + 1}.
$$

被激发的子系统比例 $1/(e^{\beta\Delta} + 1)$ 从 $T = 0$ 处的 $0$ 升向 $T \to \infty$ 时的 $\tfrac12$，在正温度下永不超过一半。取 $x = \beta\Delta = \Delta/k_BT$，$\dd x/\dd T = -x/T$，

$$
C = \deriv{U}{T} = Nk_B\,\frac{x^2e^{x}}{(e^{x} + 1)^2}.
$$ {#eq-schottky}

这就是**肖特基（Schottky）反常**。它在低温消失（指数式地——激发任何子系统都要付出因子 $e^{-x}$），在高温也消失（像 $x^2/4$——两个能级一旦平分占据，就再没有地方放更多的能量）。极大在 $\dd C/\dd x = 0$ 处。对 $\ln C = 2\ln x + x - 2\ln(1 + e^x)$ 求导得 $2/x + 1 - 2e^x/(1 + e^x) = 0$，化简为

$$
x\tanh\frac{x}{2} = 2.
$$

用二分法数值求根得 $x = 2.399$，即 $k_BT = 0.417\,\Delta$，此时 $C = 0.439\,Nk_B$。实测热容上若叠在平滑的晶格贡献之上出现这样一个鼓包，正是二能级系统的签名：晶场中的磁性离子，或玻璃中的隧穿缺陷。
:::
:::

::: widget plot
f: 1/(1+exp(1/x)); exp(1/x)/(x^2*(1+exp(1/x))^2)
x: 0.02, 3
y: 0, 0.55
labels: 激发态比例; C/(N k_B)
caption: 算过例题的二能级系统，对 $x = k_BT/\Delta$ 作图。激发态比例爬向 $\tfrac12$ 却到不了。热容在 $k_BT \approx 0.42\,\Delta$ 处达峰——那是激发态比例变化最快的地方——两侧都衰减为零。把光标放在 $x = 0.42$ 附近可读峰值 $0.44$；再看 $x = 3$：两能级几乎等占据，$C$ 已落到约 $0.03$。
:::

::: example 正则系综中的顺磁体 {#ex-paramagnet}
对 [[statistical-mechanics/microcanonical]] 的二态顺磁体——场 $B$ 中 $N$ 个磁矩为 $\mu$ 的可分辨偶极子——作正则处理。求磁化强度与熵，并用熵解释绝热去磁：一种盐在 $1.00\,\mathrm{K}$、$1.00\,\mathrm{T}$ 场中被绝热隔离，场被缓慢降到 $0.0100\,\mathrm{T}$。若偶极子是理想的，末态温度是多少？
::: solution
一个偶极子有两个能量 $\mp\mu B$，所以 $z = e^{\beta\mu B} + e^{-\beta\mu B} = 2\cosh y$，其中 $y = \beta\mu B$。同向态的概率是 $e^{y}/(2\cosh y)$，沿场方向的平均磁矩是 $\mu\tanh y$，于是

$$
M = N\mu\tanh\frac{\mu B}{k_BT},
$$

上一章的结果，这次不用斯特林公式就得到了。自由能为 $F = -Nk_BT\ln(2\cosh y)$。固定 $B$ 对 $T$ 求导（$\partial y/\partial T = -y/T$）：

$$
S = -\pdv{F}{T} = Nk_B\bigl[\ln(2\cosh y) - y\tanh y\bigr].
$$

$y \to 0$（场弱或温度高）时 $S \to Nk_B\ln2$：每个微观状态都可及。$y \to \infty$ 时 $\ln(2\cosh y) \to y$、$\tanh y \to 1$，所以 $S \to 0$：全部偶极子取向一致。

要紧的特征是：$S$ 依赖 $B$ 与 $T$ 只通过比值 $y = \mu B/k_BT$。盐被绝热隔离时的缓慢改变是可逆绝热的，所以保持 $S$ 不变，从而 $y$ 不变，从而 $B/T$ 不变。场降 $100$ 倍，温度也降 $100$ 倍：

$$
T_{\mathrm{f}} = T_{\mathrm{i}}\,\frac{B_{\mathrm{f}}}{B_{\mathrm{i}}} = 1.00\,\mathrm{K}\times\frac{0.0100}{1.00} = 0.0100\,\mathrm{K}.
$$

真实的盐里偶极子相互作用，效果像一个 $0.01$ 到 $0.1\,\mathrm{T}$ 量级的内场，为可达温度设了下限；而且晶格振动必须足够冷，冷到持有可以忽略的熵。在这些限度之内，人类最初就是这样达到远低于 $1\,\mathrm{K}$ 的温度的：这方法由彼得·德拜（Peter Debye）与威廉·吉奥克（William Giauque）在 1926 年各自独立提出，1933 年由吉奥克与邓肯·麦克杜格尔（Duncan MacDougall）实现。核磁偶极子弱一千倍，把这方法带进微开尔文。
:::
:::

::: example 再看爱因斯坦固体 {#ex-oscillator}
求能级为 $E_n = (n + \tfrac12)\hbar\omega$ 的量子谐振子的配分函数与平均能量，并与 [[statistical-mechanics/microcanonical]] 的微正则结果比较。
::: solution
以 $\varepsilon = \hbar\omega$，这是一个几何级数：

$$
z = \sum_{n=0}^\infty e^{-\beta\varepsilon(n + 1/2)} = e^{-\beta\varepsilon/2}\sum_{n=0}^\infty\left(e^{-\beta\varepsilon}\right)^n = \frac{e^{-\beta\varepsilon/2}}{1 - e^{-\beta\varepsilon}} = \frac{1}{2\sinh(\beta\varepsilon/2)}.
$$

于是 $\ln z = -\beta\varepsilon/2 - \ln(1 - e^{-\beta\varepsilon})$，且

$$
\langle E\rangle = -\pdv{\ln z}{\beta} = \frac{\varepsilon}{2} + \frac{\varepsilon\,e^{-\beta\varepsilon}}{1 - e^{-\beta\varepsilon}} = \frac{\varepsilon}{2} + \frac{\varepsilon}{e^{\beta\varepsilon} - 1}.
$$ {#eq-osc-e}

平均量子数 $\langle n\rangle = 1/(e^{\beta\varepsilon} - 1)$ 是**普朗克分布**，光子与声子的版本会在 [[statistical-mechanics/bose-fermi]] 里再次出现。对 $N$ 个可分辨振子，[[#prop-factor]] 给出 $Z = z^N$、$U = N\langle E\rangle$；除去零点项 $N\varepsilon/2$，它正是微正则结果 $U = N\varepsilon/(e^{\varepsilon/k_BT} - 1)$。两个系综一致——[[#thm-free-energy]] 说 $N$ 大时必须一致——但正则算法只花三行，另一条路要用组合恒等式和斯特林公式。

自由能为 $F = N\varepsilon/2 + Nk_BT\ln(1 - e^{-\beta\varepsilon})$。作为对 [[#eq-f]] 的校核，它对温度的导数给出 $S = Nk_B[\beta\varepsilon\langle n\rangle - \ln(1 - e^{-\beta\varepsilon})]$：$T \to 0$ 时消失（只剩一个态，基态），高温下按 $Nk_B[\ln(k_BT/\varepsilon) + 1]$ 增长，与 [[statistical-mechanics/microcanonical]] 相符。
:::
:::

::: quiz
一个系统有两个能量为 $0$ 的微观状态和四个能量为 $\varepsilon$ 的微观状态。温度很高（$k_BT \gg \varepsilon$）时，它有多大比例的时间处在能量为 $\varepsilon$ 的状态之一？
- [ ] $\tfrac12$
- [x] $\tfrac23$
- [ ] $\tfrac15$
- [ ] 趋于 $1$：高温偏爱高能。
::: solution
能级的概率正比于 $g_je^{-\beta E_j}$，即 $2$ 与 $4e^{-\beta\varepsilon}$。$\beta\varepsilon \to 0$ 时指数趋于 $1$，概率趋于 $2/6$ 与 $4/6$。无限高温下每个*微观状态*等概率，而上方能级的微观状态多一倍。正温度从不颠倒"按微观状态计"的占据数；只有负温度——如 [[statistical-mechanics/microcanonical]]——才做得到。
:::
:::

## 能量均分 {#equipartition}

经典力学用连续的坐标与动量描述系统，它的"对状态求和"变成相空间上的积分。精确的规则——连同使积分无量纲的普朗克常量因子——在 [[statistical-mechanics/classical-gas]] 里证成。求平均时归一化会相消，我们只需要：相空间中的概率密度正比于 $e^{-\beta H}$，其中 $H$ 是经典能量（哈密顿量）。

::: theorem 能量均分 {#thm-equipartition}
经典系统在温度 $T$ 下处于正则平衡，哈密顿量 $H = a\xi^2 + H'(\text{其余变量})$，其中 $\xi$ 是跑遍 $(-\infty, \infty)$ 的某个坐标或动量，$a > 0$ 不依赖 $\xi$，$H'$ 不依赖 $\xi$。则

$$
\langle a\xi^2\rangle = \tfrac12 k_BT.
$$ {#eq-equipartition}

于是，能量是 $f$ 个这样的二次项之和的经典系统，平均能量 $U = \tfrac{f}{2}k_BT$，热容 $C = \tfrac{f}{2}k_B$。
:::

::: proof
把相空间变量写成 $\xi$ 与 $\mathbf y$（其余一切）。正则平均为

$$
\langle a\xi^2\rangle = \frac{\int a\xi^2\,e^{-\beta a\xi^2}e^{-\beta H'(\mathbf y)}\,\dd\xi\,\dd\mathbf y}{\int e^{-\beta a\xi^2}e^{-\beta H'(\mathbf y)}\,\dd\xi\,\dd\mathbf y}.
$$

分子分母里的 $\mathbf y$ 积分相同，相消。（假设 $a$ 不依赖 $\xi$ 就够了；若 $a$ 依赖 $\mathbf y$，就先固定 $\mathbf y$ 做 $\xi$ 积分，得到 $\tfrac12k_BT$，再对一个常数关于 $\mathbf y$ 取平均。）剩下的是

$$
\langle a\xi^2\rangle = \frac{\int_{-\infty}^\infty a\xi^2e^{-\beta a\xi^2}\,\dd\xi}{\int_{-\infty}^\infty e^{-\beta a\xi^2}\,\dd\xi} = -\pdv{}{\beta}\ln\int_{-\infty}^\infty e^{-\beta a\xi^2}\,\dd\xi.
$$

高斯积分 $\int e^{-\beta a\xi^2}\,\dd\xi = \sqrt{\pi/(\beta a)}$，其对数为 $-\tfrac12\ln\beta + (\text{与 }\beta\text{ 无关的项})$。它对 $\beta$ 的导数是 $-1/(2\beta)$，所以

$$
\langle a\xi^2\rangle = \frac{1}{2\beta} = \tfrac12k_BT.
$$

$f$ 个这样的贡献相加得 $U = \tfrac{f}{2}k_BT$，再求导得 $C$。
:::

每个二次项都拿到同样的份额，无论系数多大：轻的原子与重的原子平均动能相同，硬的弹簧与软的弹簧平均势能相同。熟悉的计数随之而来。

| 系统 | 每粒子二次项 | 每摩尔 $C_V$ |
|---|---|---|
| 单原子气体 | $3$（平动） | $\tfrac32R$ |
| 刚性双原子气体 | $3 + 2$（平动、两个转动） | $\tfrac52R$ |
| 双原子含振动 | $3 + 2 + 2$ | $\tfrac72R$ |
| 晶体（杜隆-珀蒂） | $6$（三个动能、三个势能） | $3R$ |

::: example 悬臂梁的热噪声 {#ex-cantilever}
原子力显微镜的悬臂梁在 $300\,\mathrm{K}$ 下的表现像一根刚度 $\kappa = 0.100\,\mathrm{N/m}$ 的弹簧。求其尖端的方均根热位移。
::: solution
势能 $\tfrac12\kappa x^2$ 是坐标 $x$ 的二次项，$a = \kappa/2$。由 [[#thm-equipartition]]，$\langle\tfrac12\kappa x^2\rangle = \tfrac12k_BT$，所以

$$
x_{\mathrm{rms}} = \sqrt{\frac{k_BT}{\kappa}} = \sqrt{\frac{1.380649\times10^{-23}\times300}{0.100}}\,\mathrm{m} = 2.04\times10^{-10}\,\mathrm{m}.
$$

尖端抖动约 $0.2\,\mathrm{nm}$，与一个原子的直径相当。这非但不是麻烦，反而被用来标定悬臂梁：测 $\langle x^2\rangle$，反解 $\kappa = k_BT/\langle x^2\rangle$。经典结果之所以成立，是因为悬臂梁的共振频率为数十千赫兹，$\hbar\omega \sim 10^{-29}\,\mathrm{J}$，与 $k_BT = 4.1\times10^{-21}\,\mathrm{J}$ 相比完全微不足道。
:::
:::

### 能量均分失效时

定理立足于经典力学，其中 $\xi$ 连续变化。对量子谐振子，[[#eq-osc-e]] 给出高于基态的平均能量为 $\varepsilon/(e^{\beta\varepsilon} - 1)$。$k_BT \gg \varepsilon$ 时它展开为 $k_BT - \varepsilon/2 + \varepsilon^2/(12k_BT) + \dots$；再加上零点能 $\varepsilon/2$，总平均能量趋近 $k_BT$——两个二次项的经典值。$k_BT \ll \varepsilon$ 时它指数式地小，这个模式**被冻结**：对热容毫无贡献。

::: widget plot
f: 1/(exp(1/x)-1); x - 0.5
x: 0.01, 2.5
y: 0, 2.2
labels: 量子谐振子; 经典渐近线
caption: 量子谐振子高于基态的平均热能 $\langle n\rangle\varepsilon$，以 $\varepsilon$ 为单位，对 $k_BT/\varepsilon$ 作图。直线是高温渐近线 $k_BT - \varepsilon/2$；加上零点能，它就是经典的均分值。$k_BT \approx \varepsilon$ 以上两条曲线重合。$k_BT \approx 0.2\,\varepsilon$ 以下谐振子被冻结：它的能量、因而它的热容，几乎为零。
:::

所以能量均分对某个自由度成立，只有当它的能级间距远小于 $k_BT$。对氮分子，振动量子对应约 $2330\,\mathrm{cm^{-1}}$ 的波数，即温度 $hc\tilde\nu/k_B \approx 3350\,\mathrm{K}$；室温下振动受激的分子比例为 $e^{-3350/300} \approx 1.4\times10^{-5}$，空气的 $C_V = \tfrac52R$ 而不是 $\tfrac72R$。氮的转动间距只有几开尔文，所以转动在室温下完全经典。电子激发高好几个电子伏，从不参与。经典理论解释不了这些"缺席"的自由度——这正是开尔文（Kelvin）1900 年在英国皇家研究所（Royal Institution）的讲演里挂在十九世纪物理学上空的"两朵乌云"之一。答案是量子化。分子的转动与振动配分函数及其热容，在化学图谱的章节 [分子配分函数](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=partition-function) 里详细算出。

::: example 一氧化碳的转动 {#ex-rotation}
刚性线性分子的转动能级为 $E_J = k_B\theta_{\mathrm{rot}}J(J+1)$，$J = 0, 1, 2, \dots$，每级简并度 $2J + 1$。一氧化碳的转动常数 $1.9313\,\mathrm{cm^{-1}}$ 给出 $\theta_{\mathrm{rot}} = hc\tilde B/k_B = 2.779\,\mathrm{K}$。在 $300\,\mathrm{K}$ 下计算转动配分函数，与经典值 $T/\theta_{\mathrm{rot}}$ 比较，并找出占据数最大的能级。
::: solution
把 $(2J + 1)e^{-J(J+1)\theta_{\mathrm{rot}}/T}$ 数值求和到项可忽略（$J \approx 60$ 即可），得 $z_{\mathrm{rot}} = 108.30$。经典值——对同一表达式关于 $J$ 积分——是 $T/\theta_{\mathrm{rot}} = 107.96$；欧拉-麦克劳林修正 $+\tfrac13$ 把它送到 $108.30$，五位一致。于是转动能 $-\partial\ln z_{\mathrm{rot}}/\partial\beta$ 同精度地为 $k_BT$：两个二次项，两个转动轴所应得的均分值。

由 [[#eq-levels]]，能级 $J$ 的占据正比于 $(2J + 1)e^{-J(J+1)\theta_{\mathrm{rot}}/T}$。简并度爬升，玻尔兹曼因子下降，于是有极大。把 $J$ 当连续量、令导数为零，得 $J_{\max} = \sqrt{T/2\theta_{\mathrm{rot}}} - \tfrac12 = 6.85$；在整数中占据最大的是 $J = 7$，持有 $8.2\%$ 的分子，而基级 $J = 0$ 只持有 $0.92\%$。这正是 CO 红外转动-振动谱中看到的强度包络，也是简并度与玻尔兹曼因子相争的一幅直白图像。经典极限之所以出色，是因为 $T/\theta_{\mathrm{rot}} \approx 108$；换成 $\theta_{\mathrm{rot}} = 85\,\mathrm{K}$ 的氢就不成了，而且还得扯上 $\mathrm H_2$ 的核自旋统计。
:::
:::

## 涨落 {#fluctuations}

正则系综中能量不固定。它到底变多大？

::: theorem 能量涨落 {#thm-fluctuations}
正则系综中能量的方差为

$$
\langle E^2\rangle - \langle E\rangle^2 = \frac{\partial^2\ln Z}{\partial\beta^2} = k_BT^2C_V,
$$ {#eq-fluct}

其中 $C_V = (\partial U/\partial T)_{V,N}$。特别地 $C_V \ge 0$。
:::

::: proof
由 $Z = \sum_s e^{-\beta E_s}$，$\partial^2Z/\partial\beta^2 = \sum_s E_s^2e^{-\beta E_s} = Z\langle E^2\rangle$。于是

$$
\frac{\partial^2\ln Z}{\partial\beta^2} = \pdv{}{\beta}\left(\frac{1}{Z}\pdv{Z}{\beta}\right) = \frac{1}{Z}\frac{\partial^2Z}{\partial\beta^2} - \left(\frac{1}{Z}\pdv{Z}{\beta}\right)^2 = \langle E^2\rangle - \langle E\rangle^2.
$$

另一方面，由 [[#eq-u]]，$\partial^2\ln Z/\partial\beta^2 = -\partial U/\partial\beta$，又 $\dd\beta = -\dd T/(k_BT^2)$，

$$
-\pdv{U}{\beta} = k_BT^2\pdv{U}{T} = k_BT^2C_V.
$$

方差非负，所以 $C_V \ge 0$。
:::

定理把涨落与响应拴在一起：固定 $T$ 下能量游荡多少，由 $T$ 改变时它会改变多少来定。这是**涨落-耗散**思想的第一次出场，爱因斯坦 1905 年就把类似想法用于布朗运动。

$U$ 与 $C_V$ 都正比于 $N$，所以标准差 $\Delta E = \sqrt{k_BT^2C_V}$ 按 $\sqrt N$ 增长，而*相对*涨落 $\Delta E/U$ 按 $1/\sqrt N$ 缩小。

::: example 气体的能量涨落 {#ex-gas-fluct}
求 $N$ 个原子组成的单原子理想气体在正则平衡下的相对能量涨落 $\Delta E/U$，并代入一摩尔求值。
::: solution
由能量均分，$U = \tfrac32Nk_BT$，$C_V = \tfrac32Nk_B$。由 [[#eq-fluct]]，

$$
\Delta E = \sqrt{k_BT^2\cdot\tfrac32Nk_B} = \sqrt{\tfrac32N}\,k_BT, \qquad \frac{\Delta E}{U} = \frac{\sqrt{3N/2}\,k_BT}{\tfrac32Nk_BT} = \sqrt{\frac{2}{3N}}.
$$

$N = N_A = 6.022\times10^{23}$ 时，$\Delta E/U = 1.05\times10^{-12}$。一摩尔气体被恒温固定住时，其能量的确定程度约达万亿分之一。单个原子 $N = 1$，涨落达到平均的 $82\%$，"温度 $T$ 下一个原子的能量"根本不是定义得干脆锐利的量。
:::
:::

这就是各系综彼此一致的原因。固定的 $T$ 下的宏观系统，其能量以万亿分之一的精度固定，统计上与处于该能量的孤立系统无法区分。选哪个系综只是计算方便的取舍，而正则系综几乎总是更方便的那个。例外有二：小系统；以及临界点附近的系统——那里 $C_V$ 无界增长，涨落在一切尺度上都巨大；那些留到 [[statistical-mechanics/phase-transitions]] 里见。

缩放律背后的图像，对理想气体一眼可见：把 $N$ 个原子的态按能量分组，态密度像 $E^{3N/2 - 1}$ 那样增长，乘以 $e^{-\beta E}$ 就得到 $E$ 的分布，其平均为 $\tfrac32Nk_BT$。下图以该平均为能量单位画出它。

::: widget plot
f: (x*exp(1-x))^(1.5*N)
x: 0, 3
y: 0, 1.1
sliders: N=1:1:300:1
caption: 固定温度下 $N$ 个单原子理想气体分子，总能量为平均值 $x$ 倍的相对概率（曲线是 $(xe^{1-x})^{3N/2}$，与精确态密度差一个 $x$ 的幂）。$N = 1$ 时，能量从几乎 $0$ 到平均的三倍都可能出现。把 $N$ 拖大：到 $N = 300$，半高全宽约 $0.057$，是定理给出标准差 $\sqrt{2/3N} = 0.047$ 的 $1.18$ 倍——正态分布正是这个比值。一摩尔气体的峰会窄到 $10^{-12}$。
:::

::: warning 平均能量不是最概然能量
对单个理想气体原子，能量分布 $\propto\sqrt E\,e^{-\beta E}$，平均 $\tfrac32k_BT$，极大却在 $\tfrac12k_BT$。对单个二能级系统，平均能量落在仅有的两个允许值之间，永远观察不到。热力学量的是平均，因为宏观测量对海量粒子取平均；对小系统，先问清你要哪个量。
:::

::: quiz
固定 $T$ 下的系统热容为 $C_V$。在相同温度下把系统加倍，相对能量涨落 $\Delta E/U$ 会怎样？
- [ ] 加倍。
- [ ] 不变。
- [x] 缩小 $\sqrt2$ 倍。
- [ ] 缩小 $2$ 倍。
::: solution
$U$ 与 $C_V$ 都加倍。$\Delta E = \sqrt{k_BT^2C_V}$ 增大 $\sqrt2$ 倍，所以 $\Delta E/U$ 变为 $\sqrt2/2 = 1/\sqrt2$。
:::
:::

::: application 同一个配分函数算出的化学
平衡常数、反应自由能、真实气体的热容、分子的绝对熵，化学里全都是从正则 $Z$ 算出来的——分子配分函数因子化成平动、转动、振动、电子四块。参见化学图谱的 [由配分函数出发的热力学函数](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=thermodynamic-functions) 与 [正则系综](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=canonical-ensemble)：它们从这里沿化学家的路一直走到 $\Delta G^\circ$ 的表格。
:::

::: history 吉布斯与系综
指数权重 $e^{-E/kT}$ 出现在玻尔兹曼 1868 与 1871 年的论文里：先用于外力场中气体里的分子，后用于热平衡中的一般力学系统；1871 年他还把能量均分——麦克斯韦 1860 年已为平动与转动建立——推广到一般二次能量。在耶鲁的约西亚·威拉德·吉布斯（Josiah Willard Gibbs）以《统计力学的基本原理》（*Elementary Principles in Statistical Mechanics*，1902）给这门学问定了现代形状。他引入"系综"一词表示一个系统的想象中复制品全体，命名了微正则、正则与巨正则三个系综，证明正则分布配以 $F = -kT\ln Z$ 可重现热力学，并算出了能量涨落。爱因斯坦不知道吉布斯的书，在 1902–1904 年的论文里独立重算了其中许多结果，包括 [[#eq-fluct]]；随后把它用于黑体辐射。
:::

## 后续内容 {#leads}

配分函数是本课程其余部分的引擎。在 [[statistical-mechanics/classical-gas]] 里，对箱中的原子求它：得到理想气体定律、萨库尔-特特罗德熵与麦克斯韦分布，并且不得不面对全同粒子问题。在 [[statistical-mechanics/quantum-statistics]] 里我们让粒子数也涨落——那是巨正则系综——它是玻色子与费米子的自然语言。在 [[statistical-mechanics/phase-transitions]] 里，相互作用自旋的配分函数不再能因子化，近似的与数值的办法接棒；Metropolis 算法不计算 $Z$ 也对玻尔兹曼分布抽样，如 [[computation/random-sampling]]。

::: summary
- 与温度 $T$ 的热库接触的系统处于微观状态 $s$ 的概率是 $e^{-\beta E_s}/Z$，其中 $\beta = 1/k_BT$。推导只用到热库的温度。
- 玻尔兹曼因子给微观状态加权；简并度为 $g$ 的能级带上因子 $g$。
- 配分函数 $Z = \sum_se^{-\beta E_s}$ 生成热力学：$U = -\partial\ln Z/\partial\beta$，$F = -k_BT\ln Z$，$S = -\partial F/\partial T = -k_B\sum p_s\ln p_s$，$P = -\partial F/\partial V$。
- 独立的可分辨子系统有 $Z = z^N$。全同粒子气体要多费心思。
- 经典能量均分：能量中每个二次项平均 $\tfrac12k_BT$。对能级间距 $\gtrsim k_BT$ 的模式它失效——它们被冻结。
- 能量涨落满足 $\langle\Delta E^2\rangle = k_BT^2C_V$；于是 $C_V \ge 0$ 且 $\Delta E/U \sim 1/\sqrt N$，这就是大系统上正则与微正则系综一致的原因。
- 二能级系统在 $C$ 上有一个肖特基峰，位于 $k_BT \approx 0.42\,\Delta$；谐振子给出普朗克分布 $\langle n\rangle = 1/(e^{\beta\hbar\omega} - 1)$。
:::

## 习题 {#exercises}

::: exercise 一个玻尔兹曼比 {level=1 check="0.145"}
两个非简并态能量相差 $0.0500\,\mathrm{eV}$。在 $300\,\mathrm{K}$ 下求上态概率与下态概率之比，取三位有效数字。
::: solution
$300\,\mathrm{K}$ 时，$k_BT = 1.380649\times10^{-23}\times300/1.602176634\times10^{-19}\,\mathrm{eV} = 0.025852\,\mathrm{eV}$。两个微观状态的概率之比为

$$
\frac{p_2}{p_1} = e^{-\Delta E/k_BT} = e^{-0.0500/0.025852} = e^{-1.934} = 0.145.
$$

任何概率之比里配分函数都相消。若系统只有这两个态，上态概率本身是 $0.145/1.145 = 0.126$。
:::
:::

::: exercise 三能级配分函数 {level=1 check="1+exp(-1)+exp(-2)"}
一个系统有三个非简并态，能量为 $0$、$\varepsilon$ 与 $2\varepsilon$。求 $k_BT = \varepsilon$ 时的配分函数。
::: solution
由 [[#def-z]]，$\beta\varepsilon = 1$，

$$
Z = e^{0} + e^{-1} + e^{-2} = 1 + e^{-1} + e^{-2} = 1.503.
$$

概率为 $1/Z = 0.665$、$e^{-1}/Z = 0.245$、$e^{-2}/Z = 0.090$。$Z \approx 1.5$ 是说：热学上可及的大约是一个半态。
:::
:::

::: exercise 二能级的平均能量 {level=1 check="1/(1+e)"}
对 [[#ex-two-level]] 的二能级系统，求 $k_BT = \Delta$ 时每个子系统的平均能量，以 $\Delta$ 为单位。
::: solution
由例题，$U/N = \Delta/(e^{\beta\Delta} + 1)$。$\beta\Delta = 1$ 时

$$
\frac{U}{N\Delta} = \frac{1}{e + 1} = 0.269.
$$

即便 $k_BT = \Delta$，也只有 $27\%$ 的子系统被激发，离高温极限的一半还差得远。
:::
:::

::: exercise 悬臂梁的标定 {level=2 check="204"}
对 [[#ex-cantilever]] 的悬臂梁，$\kappa = 0.100\,\mathrm{N/m}$、$300\,\mathrm{K}$，给出方均根位移，以皮米计，取三位有效数字。若同样温度下一次测得的方均根位移为 $350\,\mathrm{pm}$，实际刚度是多少？
::: solution
由能量均分 $x_{\mathrm{rms}} = \sqrt{k_BT/\kappa} = \sqrt{4.1419\times10^{-21}/0.100} = 2.035\times10^{-10}\,\mathrm{m}$，三位有效数字即 $204\,\mathrm{pm}$。

反解，$\kappa = k_BT/x_{\mathrm{rms}}^2 = 4.1419\times10^{-21}/(3.50\times10^{-10})^2 = 0.0338\,\mathrm{N/m}$。这方法只需要温度和测得的方差，不需要梁的几何与弹性模量。
:::
:::

::: exercise 定位肖特基峰 {level=2 check="2.399"}
证明热容 [[#eq-schottky]] 的极大在 $x\tanh(x/2) = 2$ 处，其中 $x = \Delta/k_BT$，并把根求到四位有效数字。
::: hint
对 $\ln C$ 而不是 $C$ 求导，并用 $1 - 2e^x/(1 + e^x) = -\tanh(x/2)$。
:::
::: solution
除去常数 $Nk_B$，$\ln C = 2\ln x + x - 2\ln(1 + e^x)$。令导数为零，

$$
\frac{2}{x} + 1 - \frac{2e^x}{1 + e^x} = 0.
$$

现在 $1 - 2e^x/(1 + e^x) = (1 - e^x)/(1 + e^x) = -\tanh(x/2)$，所以条件就是 $2/x = \tanh(x/2)$，即 $x\tanh(x/2) = 2$。函数 $g(x) = x\tanh(x/2) - 2$ 在 $x > 0$ 递增，$g(2) = -0.477$、$g(3) = 0.715$。在 $[2, 3]$ 上二分收敛到 $x = 2.39936$，四位有效数字即 $2.399$。峰在 $k_BT = \Delta/2.399 = 0.417\,\Delta$，峰高 $C = 0.439\,Nk_B$。
:::
:::

::: exercise 小额样品的涨落 {level=2 check="8.16e-11"}
一份单原子理想气体样品含 $N = 1.00\times10^{20}$ 个原子，被恒温固定。求相对能量涨落 $\Delta E/U$，取三位有效数字。
::: solution
由 [[#ex-gas-fluct]]，$\Delta E/U = \sqrt{2/(3N)}$。以 $N = 1.00\times10^{20}$，

$$
\frac{\Delta E}{U} = \sqrt{\frac{2}{3.00\times10^{20}}} = \sqrt{6.67\times10^{-21}} = 8.16\times10^{-11}.
$$

这样品在常温常压下约 $4\,\mathrm{cm^3}$，其能量的涨落却不到一百亿分之一。
:::
:::

::: exercise 推广的能量均分 {level=3}
设经典系统的哈密顿量 $H = a\lvert\xi\rvert^n + H'$，其中 $\xi$ 跑遍 $(-\infty, \infty)$，$a > 0$，$n > 0$，$a$ 与 $H'$ 都不依赖 $\xi$。证明 $\langle a\lvert\xi\rvert^n\rangle = k_BT/n$。由此推出 $z$ 跑遍 $[0, \infty)$ 时，等温大气中分子在平坦地面上方的平均重力势能 $mgz$，并校核 $n = 2$ 回到 [[#thm-equipartition]]。
::: hint
换元 $u = \beta a\lvert\xi\rvert^n$，证明 $\int e^{-\beta a\lvert\xi\rvert^n}\,\dd\xi$ 正比于 $\beta^{-1/n}$，再对它的对数关于 $\beta$ 求导。半直线情形同样处理。
:::
::: solution
与 [[#thm-equipartition]] 的证明一样，其余变量的积分相消，

$$
\langle a\lvert\xi\rvert^n\rangle = -\pdv{}{\beta}\ln I(\beta), \qquad I(\beta) = \int_{-\infty}^\infty e^{-\beta a\lvert\xi\rvert^n}\,\dd\xi.
$$

由对称性 $I = 2\int_0^\infty e^{-\beta a\xi^n}\,\dd\xi$。换元 $\xi = (\beta a)^{-1/n}t$，则 $\dd\xi = (\beta a)^{-1/n}\,\dd t$：

$$
I(\beta) = 2(\beta a)^{-1/n}\int_0^\infty e^{-t^n}\,\dd t = C\,\beta^{-1/n},
$$

其中 $C$ 不依赖 $\beta$（剩下的积分是 $\Gamma(1 + 1/n)$，$n > 0$ 时有限）。于是 $\ln I = \ln C - (1/n)\ln\beta$，得

$$
\langle a\lvert\xi\rvert^n\rangle = \frac{1}{n\beta} = \frac{k_BT}{n}.
$$

$n = 2$ 时这是 $\tfrac12k_BT$，即 [[#thm-equipartition]]。

对大气，唯一的变化是范围 $z \in [0, \infty)$：少了因子 $2$，而 $I \propto \beta^{-1/n}$ 依旧，此时 $n = 1$、$a = mg$。于是 $\langle mgz\rangle = k_BT$，恰为二次项份额的两倍。密度按 $e^{-mgz/k_BT}$ 下降——等温气压公式——平均高度 $k_BT/mg$，$298\,\mathrm{K}$ 的氮气约为 $9.0\,\mathrm{km}$。
:::
:::

::: exercise 吉布斯变分原理 {level=3}
对系统微观状态上的任意概率分布 $q_s$，定义 $F[q] = \sum_sq_sE_s + k_BT\sum_sq_s\ln q_s$。证明 $F[q] \ge -k_BT\ln Z$，且等号当且仅当 $q_s$ 是玻尔兹曼分布 $p_s = e^{-\beta E_s}/Z$ 时成立。解释这个结果。
::: hint
把 $E_s = -k_BT(\ln p_s + \ln Z)$ 写出，代入，并用 $\ln y \le y - 1$，其等号只在 $y = 1$ 成立。
:::
::: solution
由 $p_s = e^{-\beta E_s}/Z$，$E_s = -k_BT(\ln p_s + \ln Z)$。代入并用 $\sum_sq_s = 1$，

$$
F[q] = -k_BT\sum_sq_s\ln p_s - k_BT\ln Z + k_BT\sum_sq_s\ln q_s = -k_BT\ln Z + k_BT\sum_sq_s\ln\frac{q_s}{p_s}.
$$

剩下证明 $D = \sum_sq_s\ln(q_s/p_s) \ge 0$，且等号仅当 $q = p$。对 $y > 0$ 用 $\ln y \le y - 1$（等号仅 $y = 1$），对每个使 $q_s > 0$ 的 $s$ 取 $y = p_s/q_s$：

$$
-D = \sum_{q_s > 0}q_s\ln\frac{p_s}{q_s} \le \sum_{q_s > 0}q_s\left(\frac{p_s}{q_s} - 1\right) = \sum_{q_s > 0}p_s - 1 \le 0.
$$

所以 $D \ge 0$。第一步取等要求每个 $q_s > 0$ 处 $p_s = q_s$；第二步取等要求 $q_s > 0$ 的那些 $p_s$ 之和为 $1$，而每个 $p_s$ 都为正，故一切 $s$ 都有 $q_s > 0$。于是 $D = 0$ 当且仅当 $q = p$，从而 $F[q] \ge -k_BT\ln Z$，恰在玻尔兹曼分布处取等。

解释：若系统以概率 $q_s$ 占据各微观状态，它就将具有自由能 $U - TS$，其中 $S$ 取吉布斯熵——$F[q]$ 正是这个自由能。温度固定时，平衡就是使它最小的分布，是 [[thermodynamics/potentials]] 中热力学判据 $\dd F \le 0$ 的统计对应。这原理也是实用工具：选定一族试探的 $q$ 并最小化 $F[q]$，给出真实自由能的上界；[[statistical-mechanics/phase-transitions]] 里的平均场理论就是这样导出的。
:::
:::
