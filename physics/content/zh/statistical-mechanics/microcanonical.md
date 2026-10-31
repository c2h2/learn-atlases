把一块热砖贴上一块冷砖，然后等着。能量从热砖流向冷砖，直到两者温度一致，而它从不流回去恢复最初的那个温差。热力学把这记为第二定律，并把它写进 [[thermodynamics/entropy]] 里的那个态函数——熵。它没有说为什么。牛顿定律或薛定谔方程里没有任何东西偏爱时间的某一个方向，所以这个不对称必定来自别处。

统计力学把它安放在计数上。一块具有确定温度的砖可以处于数量巨大的微观排布之中，而两砖按各自大小成比例分享能量的那些排布，其数目比其他所有排布多出大到平常语言无从形容的倍数。能量之所以"向下"流，是因为系统向它敞开的排布之间漫游，不带任何偏好，而几乎全部排布都在下坡一侧。熵就是这些排布数目的对数。

这一章要为**孤立**系统——能量固定、体积固定、粒子数固定——把那句话讲精确。这个设定称为**微正则系综**。我们对两个模型系统精确计数：一个二态顺磁体和一个爱因斯坦固体；再把两个固体放进热接触，看最概然的能量分配如何浮现；最后从计数定义熵和温度。一切都用 $k_B = 1.380649\times10^{-23}\,\mathrm{J/K}$，玻尔兹曼（Boltzmann）常数——自 2019 年 SI 修订起它是精确值——以及 $R = N_A k_B = 8.314462618\,\mathrm{J/(mol\cdot K)}$ 来表达。实际使用的工具是 [[statistical-mechanics/canonical]] 的正则系综；这一章是为它打地基的地方。

## 微观状态与宏观状态 {#states}

**微观状态**是在理论所描述的最精细层次上对系统的完整指定。对一个量子系统，它是整个系统的一个特定能量本征态（一组定态基中的某一个）。对一堆硬币，它是每一枚分别编了号的硬币所显示的那一面。**宏观状态**是用几个整体量作出的指定：总能量、粒子数、体积、磁化强度。许多微观状态与同一个宏观状态相容。

::: definition 多重度 {#def-multiplicity}
一个宏观状态的**多重度** $\Omega$ 是与它相容的微观状态的数目。对能量为 $U$、体积为 $V$、粒子数为 $N$ 的孤立系统，我们写 $\Omega(U, V, N)$；能级离散时，$\Omega$ 数的是能量恰为 $U$ 的定态；能级密集时，数的是窄窗 $[U, U+\delta U]$ 内的状态。
:::

窗口的宽度 $\delta U$ 看起来是个任意的选择。它确实是任意的，而且无关紧要：我们将看到 $\ln\Omega$ 的量级是 $N$，而把 $\delta U$ 改变任何一个不是 $N$ 的指数大的因子，只把 $\ln\Omega$ 移动量级为 $\ln N$ 的一点。对 $N \sim 10^{23}$，这点移动看不见。

### 二态顺磁体

最简单的带非平凡计数的模型，是 $N$ 个独立磁偶极子的集合，每一个沿外加磁场 $B$ 只能指向上或下。可以想象盐里的电子自旋，或晶体里的核自旋。磁矩为 $\mu$ 的偶极子，与场同向（向上）时能量为 $-\mu B$，反向（向下）时为 $+\mu B$。若 $N_\uparrow$ 个偶极子向上，$N_\downarrow = N - N_\uparrow$ 个向下，则能量为

$$
U = \mu B\,(N_\downarrow - N_\uparrow) = \mu B\,(N - 2N_\uparrow),
$$ {#eq-para-u}

而磁化强度——沿场方向的总磁矩——为 $M = \mu(N_\uparrow - N_\downarrow)$。偶极子固定在晶格格点上，所以可以按位置分辨。一个微观状态列出哪些格点向上。指定 $U$ 就指定了 $N_\uparrow$，而从 $N$ 个格点中选出 $N_\uparrow$ 个向上的方式数是一个二项式系数：

$$
\Omega(N, N_\uparrow) = \binom{N}{N_\uparrow} = \frac{N!}{N_\uparrow!\,(N - N_\uparrow)!}.
$$ {#eq-para-omega}

对一切 $N_\uparrow$ 求和得 $2^N$，即微观状态的总数，正如二项式定理要求的。

::: example 一百个自旋 {#ex-hundred}
一个顺磁体在零场中有 $N = 100$ 个偶极子，于是每个微观状态能量相同，而且由下面陈述的假设，全部 $2^{100}$ 个微观状态等概率。求宏观状态 $N_\uparrow = 50$ 与 $N_\uparrow = 60$ 的多重度，以及 $N_\uparrow$ 落在 $40$ 到 $60$（含端点）之间的概率。
::: solution
由 [[#eq-para-omega]]，

$$
\Omega(100, 50) = \binom{100}{50} = 1.0089\times10^{29}, \qquad \Omega(100, 60) = \binom{100}{60} = 1.3746\times10^{28}.
$$

微观状态总数为 $2^{100} = 1.2677\times10^{30}$。单个最概然的宏观状态——恰好一半向上——的概率是 $1.0089\times10^{29}/1.2677\times10^{30} = 0.0796$：不到十二分之一。$N = 100$ 时，没有一个宏观状态单独是可能的。多十个向上自旋，多重度就缩小为 $0.136$ 倍，约七分之一。

带状区间 $40 \le N_\uparrow \le 60$ 的概率是 21 个二项式系数之和除以 $2^{100}$，一个小程序算得

$$
\Prob(40 \le N_\uparrow \le 60) = \frac{1}{2^{100}}\sum_{j=40}^{60}\binom{100}{j} = 0.9648.
$$

所以比例 $N_\uparrow/N$ 落在二分之一上下 $0.1$ 以内的概率是 $96\%$。与逻辑上可能的整个区间 $0$ 到 $1$ 相比，这条带已经很窄，而且随 $N$ 增大还会更窄——这就是下面那张图的主题。
:::
:::

$N$ 大时，二项分布接近高斯分布。比例 $x = N_\uparrow/N$ 的均值为 $\frac12$，标准差为 $1/(2\sqrt N)$，$x$ 的概率密度正比于 $\exp[-2N(x - \tfrac12)^2]$。图中画的就是这条曲线，缩放得使峰值为 $1$。

::: widget plot
f: exp(-2*N*(x-0.5)^2)
x: 0, 1
y: 0, 1.1
sliders: N=20:4:4000:4
caption: 零场中 $N$ 个偶极子里向上比例为 $x$ 这一结果的相对概率。从 $N = 20$ 开始：这时 $0.3$ 到 $0.7$ 之间的比例都完全说得通。把 $N$ 拖到 $4000$：峰像 $1/\sqrt N$ 那样收窄，半宽约 $0.01$。若是 $N = 10^{23}$，峰宽将窄于 $10^{-11}$，比例取二分之一能精确到小数点后十一位。
:::

### 爱因斯坦固体

爱因斯坦（Einstein）1907 年的晶体模型把每个原子当作三个独立的量子谐振子，沿三个直角坐标方向各一个，角频率 $\omega$ 全都相同。由 [[quantum-1/harmonic-oscillator]]，每个谐振子的能级为 $(n + \tfrac12)\hbar\omega$，$n = 0, 1, 2, \dots$。把能量从基态算起，把能量子记作 $\varepsilon = \hbar\omega$，则一个振子的状态就是它所携带的量子数 $n$。$N_{\mathrm{atoms}}$ 个原子组成的固体是 $N = 3N_{\mathrm{atoms}}$ 个谐振子的集合。振子可分辨，因为每个都拴在确定的格点和方向上。

宏观状态固定量子总数 $q$，于是 $U = q\varepsilon$。微观状态是一个和为 $q$ 的非负整数列表 $(n_1, n_2, \dots, n_N)$。

::: theorem 爱因斯坦固体的多重度 {#thm-einstein-omega}
把 $q$ 个全同量子分给 $N$ 个可分辨谐振子的方式数为

$$
\Omega(N, q) = \binom{q + N - 1}{q} = \frac{(q + N - 1)!}{q!\,(N - 1)!}.
$$ {#eq-einstein-omega}
:::

::: proof
把一个微观状态表示成一排 $q$ 个点和 $N - 1$ 道竖线。第一道竖线之前的点属于振子 $1$，第一、二道竖线之间的点属于振子 $2$，依此类推；最后一道竖线之后的点属于振子 $N$。例如 $N = 4$、$q = 5$ 时，排 $\bullet\bullet\,|\,\,|\,\bullet\bullet\bullet\,|$ 表示 $(n_1, n_2, n_3, n_4) = (2, 0, 3, 0)$。

每个和为 $q$ 的非负整数列表恰好给出这样一排，每排 $q$ 个点和 $N - 1$ 道竖线也恰好给出一个列表，所以这是一种双射。一排共有 $q + N - 1$ 个位置，选定其中放点的 $q$ 个位置就定下了整排。因此排数是 $\binom{q+N-1}{q}$。
:::

量子全同的意思是：只有各 $n_i$ 才要紧，"哪个"量子在振子 $3$ 里这种说法没有意义。振子则可分辨。把这两句话搅在一起，是这门学问里大多数计数错误的根源，而在 [[statistical-mechanics/quantum-statistics]] 里它会变本加厉地回来。

::: example 三个谐振子、四个量子 {#ex-three-four}
把 $N = 3$ 个谐振子、$q = 4$ 个量子的爱因斯坦固体的微观状态按类型列出，并与 [[#eq-einstein-omega]] 校核计数。
::: solution
微观状态是满足 $n_1 + n_2 + n_3 = 4$ 的 $(n_1, n_2, n_3)$。按占据数的多重集合分组。

- $\{4, 0, 0\}$：一个振子独占全部量子。选哪个振子有 $3$ 种选法。
- $\{3, 1, 0\}$：三个数两两不同，共 $3! = 6$ 种排列。
- $\{2, 2, 0\}$：选定哪个振子为空，$3$ 种。
- $\{2, 1, 1\}$：选定哪个振子持两个量子，$3$ 种。

总数为 $3 + 6 + 3 + 3 = 15$。公式给出 $\binom{4 + 3 - 1}{4} = \binom{6}{4} = 15$，完全一致。注意"平均主义"的分布 $\{2,1,1\}$ 与 $\{3,1,0\}$ 合计占 $15$ 个态中的 $9$ 个，而最偏的一档只占 $3$ 个。这种倾向在这里还很温和，到 $N$ 很大时就会压倒一切。
:::
:::

## 基本假设 {#postulate}

计数还不是物理。要把多重度变成概率，我们需要一条关于孤立系统如何在它的微观状态之间分布的假设。

::: axiom 统计力学基本假设 {#ax-postulate}
处于平衡的孤立系统，出现在其每一个可及微观状态上的可能性相同。这里的"可及"，指与固定的能量、体积、粒子数相容，并且与一切实际施加的其他约束相容。
:::

由此立得：一个宏观状态的概率正比于它的多重度：

$$
\Prob(\text{宏观状态}) = \frac{\Omega(\text{宏观状态})}{\Omega_{\mathrm{total}}}.
$$ {#eq-prob-macro}

基本假设是一条假设，不是定理。支持它的论据之一来自动力学：若系统的轨迹遍历一切可及微观状态，并在每个附近停留相同的时间（**各态历经假说**），则时间平均就等于对微观状态取等权平均。证明现实系统各态历经很困难，目前还基本悬而未决。第二个论据出于无知：既然没有任何理由偏向某个微观状态，等权重就是偏差最小的指派。第三个论据对物理学来说是决定性的：在理论被应用到的一切系统上，其预言都与实验相符。我们把基本假设作为出发点，用它的后果来评判它。

::: remark 量子力学中的微观状态
对量子系统，"可及微观状态"指窗口 $[U, U + \delta U]$ 内的能量本征态的一组基。每个基态概率相等，说的就是密度算符正比于到该能量壳层的投影算符。计数不依赖取壳层的哪一组基，因为子空间的维数不依赖。
:::

## 两个热接触中的固体 {#contact}

现在回到引子里的问题。取两个爱因斯坦固体 A 和 B，振子数分别为 $N_A$ 和 $N_B$，量子 $\varepsilon$ 相同。把这对固体与其余一切隔绝，只让它们经由弱接触缓慢交换能量，使得每个固体仍有自己定义良好的能级。量子总数 $q = q_A + q_B$ 固定。这对固体的宏观状态就是分配 $(q_A, q_B)$；又因为这对固体的一个微观状态是 A 的一个微观状态配上 B 的一个微观状态，多重度相乘：

$$
\Omega_{\mathrm{total}}(q_A) = \Omega_A(N_A, q_A)\,\Omega_B(N_B, q - q_A).
$$ {#eq-product}

::: example 两个极小的固体 {#ex-tiny}
取 $N_A = N_B = 3$，$q = 6$。对每个 $q_A$ 列出 $\Omega_A$、$\Omega_B$ 及其乘积，并求每个宏观状态的概率。
::: solution
对三个谐振子，[[#eq-einstein-omega]] 给出 $\Omega(3, q) = \binom{q+2}{2} = (q+2)(q+1)/2$，所以 $q = 0, \dots, 6$ 时 $\Omega = 1, 3, 6, 10, 15, 21, 28$。

| $q_A$ | $\Omega_A$ | $q_B$ | $\Omega_B$ | $\Omega_A\Omega_B$ | 概率 |
|---|---|---|---|---|---|
| $0$ | $1$ | $6$ | $28$ | $28$ | $0.061$ |
| $1$ | $3$ | $5$ | $21$ | $63$ | $0.136$ |
| $2$ | $6$ | $4$ | $15$ | $90$ | $0.195$ |
| $3$ | $10$ | $3$ | $10$ | $100$ | $0.216$ |
| $4$ | $15$ | $2$ | $6$ | $90$ | $0.195$ |
| $5$ | $21$ | $1$ | $3$ | $63$ | $0.136$ |
| $6$ | $28$ | $0$ | $1$ | $28$ | $0.061$ |

各乘积之和为 $462$，恰是 $\binom{11}{6}$，即一个六个谐振子持有六个量子的单一固体的多重度。理当如此：复合系统正是那个固体。均分 $q_A = 3$ 是最概然宏观状态，概率 $100/462 = 0.216$，但每个宏观状态都有可观的概率。若 A 起初独占全部六个量子，一旦接触，它只在 $6\%$ 的时间里还留着它们。能量确实从"热"的那个固体流出，但对六个振子而言，这股流只是涨落很大的统计倾向。
:::
:::

把规模放大。对 $N_A = N_B = 300$、$q = 200$，精确整数运算（python 的 `math.comb`）给出总计 $\Omega_{\mathrm{total}} = \binom{799}{200} = 5.79\times10^{193}$。最概然分配是 $q_A = 100$， 对称性所暗示的那样——但其概率也只有 $0.049$。变了的是**宽度**：$q_A$ 的标准差是 $8.2$ 个量子，于是 $q_A$ 落在 $90$ 到 $110$ 之间的概率是 $0.80$。固体 B 独占全部能量（$q_A = 0$）的概率是 $5.2\times10^{-50}$。即使自宇宙大爆炸以来以每秒十亿次的频率对这对固体抽样，也还见不到这个宏观状态。

宽度相对均值按 $1/\sqrt N$ 缩放。对 $N \sim 10^{23}$ 个振子，相对宽度是 $\sim 10^{-11}$，能量的分配在量热器能达到的任何精度下都是最概然的那个。这就是热平衡。这样读来，第二定律是一条关于压倒性概率的陈述：一个宏观系统走向——并停留——在多重度最大的宏观状态附近。

### 斯特林近似

宏观的计数需要给巨大数字的阶乘取对数。

::: lemma 斯特林（Stirling）近似 {#lem-stirling}
对大的 $n$，

$$
\ln n! = n\ln n - n + \tfrac12\ln(2\pi n) + O(1/n).
$$ {#eq-stirling}

在统计力学里前两项通常够用：$\ln n! \approx n\ln n - n$，相对误差量级为 $(\ln n)/n$。
:::

::: proof
我们证明两项形式。由于 $\ln x$ 递增，$\ln k$ 介于 $\ln x$ 在 $[k-1, k]$ 上与在 $[k, k+1]$ 上的两个积分之间。对 $k = 1, \dots, n$ 求和，

$$
\int_0^n \ln x\,\dd x \le \sum_{k=1}^n \ln k = \ln n! \le \int_1^{n+1} \ln x\,\dd x.
$$

由 $\int \ln x\,\dd x = x\ln x - x$，左边是 $n\ln n - n$，右边是 $(n+1)\ln(n+1) - n$。两个界之差为 $(n+1)\ln(n+1) - n\ln n = \ln n + O(1)$，与 $n\ln n$ 相比很小。所以 $\ln n! = n\ln n - n + O(\ln n)$。更精细的项 $\frac12\ln(2\pi n)$ 来自欧拉-麦克劳林（Euler–Maclaurin）公式，或对 $n! = \int_0^\infty x^n e^{-x}\,\dd x$ 施以拉普拉斯（Laplace）方法；见渐近分析的任一教材，或 Schroeder 的附录 B。
:::

$n = 100$ 时，$\ln 100! = 363.739$，两项公式给出 $360.517$，三项公式给出 $363.739$。两项公式在这里差 $0.9\%$；到 $n = 10^{23}$，其相对误差约 $10^{-22}$。

当 $q$ 与 $N$ 都很大时，把引理用于 [[#eq-einstein-omega]]，并把 $q + N - 1$ 换成 $q + N$：

$$
\ln\Omega(N, q) \approx (q + N)\ln(q + N) - q\ln q - N\ln N.
$$ {#eq-einstein-lnomega}

在**高温极限** $q \gg N$——每个振子多个量子——下，写 $\ln(q + N) = \ln q + \ln(1 + N/q) \approx \ln q + N/q$。于是 $\ln\Omega \approx N\ln(q/N) + N$，即

$$
\Omega(N, q) \approx \left(\frac{e\,q}{N}\right)^{N} \qquad (q \gg N).
$$ {#eq-einstein-high}

对两个这样接触的固体，$\Omega_{\mathrm{total}} \propto q_A^{N_A}(q - q_A)^{N_B}$。其对数在 $N_A/q_A = N_B/q_B$ 处取极大：每个振子的量子数相等。对数在该极大附近作二阶展开，得到一条相对 $q$ 宽为 $1/\sqrt N$ 量级的高斯曲线，正是我们在数值上见过的缩放。

## 熵 {#entropy}

多重度巨大无比，而且系统合并时它们相乘。它们的对数每个粒子的量级平平常常，而且相加。玻尔兹曼对熵的认定就是这个对数。

::: definition 玻尔兹曼熵 {#def-entropy}
处于多重度为 $\Omega$ 的宏观状态的孤立系统的**熵**为

$$
S = k_B \ln\Omega.
$$ {#eq-boltzmann}
:::

三条性质使这成为正确的定义。

1. **可加性。** 两个弱耦合系统，$\Omega_{AB} = \Omega_A\Omega_B$，所以 $S_{AB} = S_A + S_B$。熵是广延量，热力学正是这样要求的。
2. **第二定律。** 最概然的宏观状态是 $\Omega$ 最大——亦即 $S$ 最大——的那个。从约束中释放出来的孤立系统向它演化，此后在它附近涨落，对大 $N$ 而言涨落量微不足道。孤立系统的总熵不减少，除了概率为 $e^{-\Delta S/k_B}$ 量级的涨落。
3. **与克劳修斯一致。** 我们将证明 $\partial S/\partial U = 1/T$，其中 $T$ 是热力学温度，于是 [[#eq-boltzmann]] 与 [[thermodynamics/entropy]] 中由可逆热定义出的熵有相同的微分。两个定义至多差一个相加常数，而计数把这个常数定了下来：$\Omega = 1$ 时 $S = 0$。

因子 $k_B$ 只是定单位，使 $S$ 的单位为每开尔文焦耳、$T$ 的单位为开尔文。许多作者使用**无量纲熵** $\sigma = S/k_B = \ln\Omega$，并用能量作温度的单位。

::: example 一百个自旋与一摩尔的熵 {#ex-entropy-numbers}
求 [[#ex-hundred]] 中 $N_\uparrow = 50$ 宏观状态的 $S/k_B$，以及零场中一摩尔二态偶极子在全部 $2^N$ 个微观状态都可及时的熵。
::: solution
对一百个自旋，$S/k_B = \ln(1.0089\times10^{29}) = 66.78$。若把 $2^{100}$ 个微观状态全部数进去，上限是 $100\ln 2 = 69.31$。单个最概然宏观状态已经带有最大对数值的 $96\%$，尽管它只带有 $8\%$ 的概率。对数饶恕巨大的因子；这就是为什么 $N$ 大时，最概然宏观状态与"全部可及状态"给出同样的热力学。

对零场中的一摩尔，每个微观状态能量相同，所以 $\Omega = 2^{N_A}$ 且

$$
S = k_B\ln 2^{N_A} = N_A k_B \ln 2 = R\ln 2 = 5.763\,\mathrm{J/K}.
$$

这个 $R\ln2$ 是可测的。在强磁场中把一个顺磁盐冷却到每个偶极子基本都取向，此时自旋系统 $\Omega = 1$、$S = 0$；然后缓慢撤去磁场：每摩尔自旋-$\frac12$ 离子恢复出的自旋熵是 $R\ln 2$。这份熵就是绝热去磁的工作物质，它是达到毫开尔文温度的标准方法。
:::
:::

::: warning 没数过之前，熵不是"无序度"
整洁的房间和凌乱的房间各只是一个微观状态。把熵叫作"无序度"只在一种情况下有帮助："无序度"的意思是"与许多微观状态相容的宏观状态"，可那时这个词就不再添加任何内容。有些系统——例如高密度下结晶的硬球——看起来更有序的排布反而有多重得多的多重度。去算 $\Omega$，或从热量算 $S$，让数字说话。
:::

## 温度 {#temperature}

回到两个交换能量的系统，现在带一般的 $\Omega_A(U_A)$ 和 $\Omega_B(U_B)$，总能量 $U = U_A + U_B$ 固定。最概然的分配使 $S_A(U_A) + S_B(U - U_A)$ 最大。

::: theorem 热平衡 {#thm-equilibrium}
熵为 $S_A(U_A)$ 与 $S_B(U_B)$ 的两个系统，体积与粒子数固定，在 $U_A + U_B$ 固定下交换能量。在最概然分配处，

$$
\pdv{S_A}{U_A} = \pdv{S_B}{U_B}.
$$ {#eq-equal-slopes}

若两个斜率不同，能量从斜率较小的系统流向斜率较大的系统时，总熵增加。
:::

::: proof
把总熵看作 $U_A$ 的函数：$S(U_A) = S_A(U_A) + S_B(U - U_A)$。在内点极大处其导数为零：

$$
\deriv{S}{U_A} = \pdv{S_A}{U_A} - \pdv{S_B}{U_B} = 0,
$$

其中负号来自 $\dd U_B = -\dd U_A$。这就是 [[#eq-equal-slopes]]。

至于第二句：设一小份能量 $\dd U_A$ 进入 A。总熵的改变为

$$
\dd S = \left(\pdv{S_A}{U_A} - \pdv{S_B}{U_B}\right)\dd U_A.
$$

若 $\partial S_A/\partial U_A > \partial S_B/\partial U_B$，则 $\dd U_A > 0$ 时 $\dd S > 0$：流入 A——斜率较大的那个系统——的能量使总熵增加。由 [[#ax-postulate]] 与 [[#eq-prob-macro]]，熵较大的宏观状态以因子 $e^{\dd S/k_B}$ 更概然，系统就朝那个方向演化。
:::

斜率的共同值，就是两个热平衡的系统所共享的东西；能量从斜率较小的系统流向斜率较大的系统。温度必然是这个斜率的减函数，而能重现热力学温度的选择是它的倒数。

::: definition 温度 {#def-temperature}
系统的**温度**定义为

$$
\frac{1}{T} = \left(\pdv{S}{U}\right)_{V, N}.
$$ {#eq-temperature}
:::

按这个定义，[[#thm-equilibrium]] 说：热接触的系统达到相等的温度，且当两个温度都为正时，热从 $T$ 高处流向 $T$ 低处。要确认 [[#eq-temperature]] 就是开尔文温度、而不是它的某个别的函数，就拿一个我们早已知道其温标的系统来算 $T$。高温下的爱因斯坦固体必须服从 [[thermodynamics/kinetic-theory]] 的杜隆-珀蒂（Dulong–Petit）定律，理想气体必须服从 $PV = Nk_BT$；气体留到 [[statistical-mechanics/classical-gas]] 里算。

::: example 从多重度求爱因斯坦固体 {#ex-einstein-t}
用 [[#eq-einstein-lnomega]] 求 $N$ 个振子、量子为 $\varepsilon$ 的爱因斯坦固体的能量 $U(T)$ 与热容 $C = \dd U/\dd T$。证明高温下 $U = Nk_BT$，并算出 $k_BT = \varepsilon$ 处的 $C$。
::: solution
以 $U = q\varepsilon$ 与 $S = k_B\ln\Omega$，

$$
\frac{1}{T} = \pdv{S}{U} = \frac{k_B}{\varepsilon}\pdv{\ln\Omega}{q} = \frac{k_B}{\varepsilon}\bigl[\ln(q + N) + 1 - \ln q - 1\bigr] = \frac{k_B}{\varepsilon}\ln\frac{q + N}{q}.
$$

解出 $q$。取指数：$1 + N/q = e^{\varepsilon/k_BT}$，于是

$$
U = q\varepsilon = \frac{N\varepsilon}{e^{\varepsilon/k_BT} - 1}.
$$ {#eq-einstein-u}

高温下 $\varepsilon/k_BT \ll 1$：展开 $e^{x} - 1 \approx x$ 得 $U \approx N\varepsilon\cdot k_BT/\varepsilon = Nk_BT$：每个振子一份 $k_BT$，即含两个二次项的一维谐振子的均分值。对 $N = 3N_{\mathrm{atoms}}$，这就是 $C = 3N_{\mathrm{atoms}}k_B$，即每摩尔 $3R$——杜隆-珀蒂定律。我们的 $T$ 就是开尔文温度。

对 [[#eq-einstein-u]] 以 $x = \varepsilon/k_BT$ 求导，此时 $\dd x/\dd T = -x/T$：

$$
C = \deriv{U}{T} = N k_B\,\frac{x^2 e^{x}}{(e^{x} - 1)^2}.
$$ {#eq-einstein-c}

$k_BT = \varepsilon$ 时 $x = 1$，$C/(Nk_B) = e/(e - 1)^2 = 2.718/2.952 = 0.921$。热能只有一个量子大时，热容已比经典值低 $8\%$；$T \to 0$ 时它按 $x^2e^{-x}$ 指数式下降。这个下降就是爱因斯坦对"金刚石为什么在室温下热容很小"的解释：它的键刚硬，$\varepsilon$ 大。
:::
:::

::: widget plot
f: exp(1/x)/(x^2*(exp(1/x)-1)^2); 1
x: 0.02, 2
y: 0, 1.1
labels: 爱因斯坦固体; 经典值
caption: 爱因斯坦固体的热容 $C/(Nk_B)$，对 $x = k_BT/\varepsilon$ 作图。$x = 1$ 处曲线在 $0.92$；要到 $x \gtrsim 2$ 才够得着经典那条线。沿曲线往 $x = 0$ 看：$x \approx 0.1$ 以下它紧贴横轴，因为哪怕只激发一个量子也要花掉 $e^{-\varepsilon/k_BT}$ 这样一个玻尔兹曼因子。真实固体在低温下落得慢些，像 $T^3$，那要由 [[statistical-mechanics/bose-fermi]] 的德拜（Debye）模型解释。
:::

::: quiz
两个 $\varepsilon$ 相同的爱因斯坦固体彼此接触。固体 A 有 $N_A = 1000$ 个振子、$q_A = 1000$ 个量子；固体 B 有 $N_B = 2000$ 个振子、$q_B = 1000$ 个量子。高温近似下，能量往哪个方向流？
- [x] 从 A 到 B：A 每个振子的量子多，温度因此更高。
- [ ] 从 B 到 A：B 是更大的固体。
- [ ] 哪个方向都不流：两个固体持有同样多的量子。
- [ ] 取决于未给定的 $\varepsilon$。
::: solution
高温形式 [[#eq-einstein-high]] 给出 $S = Nk_B[\ln(q/N) + 1]$，于是 $1/T = \partial S/\partial U = Nk_B/(q\varepsilon)$，$k_BT = \varepsilon\,q/N$。固体 A 每个振子一个量子，B 每个振子半个，所以 $T_A = 2T_B$，能量从 A 流向 B，直到每个振子的量子数相等：$q_A = 2000/3$，$q_B = 4000/3$。总能量相等不等于温度相等。对精确的 [[#eq-einstein-u]] 答案相同，因为无论 $\varepsilon$ 为何，$q/N$ 都是 $T$ 的增函数。
:::
:::

### 顺磁体：磁化强度与负温度

现在轮到顺磁体。对 [[#eq-para-omega]] 用斯特林近似，

$$
\frac{S}{k_B} = N\ln N - N_\uparrow\ln N_\uparrow - N_\downarrow\ln N_\downarrow.
$$

由 [[#eq-para-u]]，$\dd U = -2\mu B\,\dd N_\uparrow$，而 $\partial(S/k_B)/\partial N_\uparrow = \ln(N_\downarrow/N_\uparrow)$（把 $N_\downarrow = N - N_\uparrow$ 代入后求导）。于是

$$
\frac{1}{T} = \pdv{S}{U} = -\frac{k_B}{2\mu B}\ln\frac{N_\downarrow}{N_\uparrow} = \frac{k_B}{2\mu B}\ln\frac{N_\uparrow}{N_\downarrow}.
$$

所以 $N_\uparrow/N_\downarrow = e^{2\mu B/k_BT}$。结合 $N_\uparrow + N_\downarrow = N$，

$$
\frac{N_\uparrow}{N} = \frac{e^{\mu B/k_BT}}{2\cosh(\mu B/k_BT)}, \qquad M = \mu(N_\uparrow - N_\downarrow) = N\mu\tanh\frac{\mu B}{k_BT}.
$$ {#eq-para-m}

高温下 $\tanh y \approx y$，$M \approx N\mu^2B/(k_BT)$：磁化强度正比于 $B/T$，这就是**居里（Curie）定律**（皮埃尔·居里，1895）。低温下 $M \to N\mu$，饱和。

::: example 实验室磁场中的电子自旋 {#ex-spins}
对电子自旋，取 $\mu$ 为玻尔磁子 $\mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$。在 $1.00\,\mathrm{T}$ 的磁场中，求 $300\,\mathrm{K}$ 与 $1.00\,\mathrm{K}$ 下沿场取向的自旋比例。
::: solution
无量纲比为 $y = \mu B/k_BT$。$300\,\mathrm{K}$ 时

$$
y = \frac{9.2740\times10^{-24}\times1.00}{1.380649\times10^{-23}\times300} = 2.239\times10^{-3},
$$

[[#eq-para-m]] 给出 $N_\uparrow/N = e^{y}/(2\cosh y) = 0.50112$。净取向的自旋大约一千个里只有一个；磁化强度是饱和值的 $\tanh y = 0.22\%$，居里定律非常好。$1.00\,\mathrm{K}$ 时 $y = 0.6717$，

$$
\frac{N_\uparrow}{N} = \frac{e^{0.6717}}{2\cosh 0.6717} = 0.793,
$$

于是 $M/(N\mu) = \tanh 0.6717 = 0.586$。要逼近饱和需要 $\mu B \gg k_BT$：数特斯拉的场，接近 $1\,\mathrm{K}$ 的温度。
:::
:::

若给顺磁体的能量**超过**其最大值的一半，$U > 0$，于是 $N_\uparrow < N_\downarrow$，就会发生新事。$1/T$ 的公式此时给出负数。向这种态添加能量反而*减少*它的多重度，因为它把系统推向所有偶极子都反向的那唯一一个微观状态。熵 $S(U)$ 从 $U = -N\mu B$ 处的 $0$ 升到 $U = 0$ 处的极大 $Nk_B\ln2$，再在 $U = +N\mu B$ 处落回 $0$；斜率 $1/T$ 从 $+\infty$ 经 $0$ 走到 $-\infty$。

因此**负温度**不比绝对零度更冷。它比任何正温度都更热：由 [[#thm-equilibrium]]，斜率 $\partial S/\partial U$ 为负的系统会把能量交给任何斜率为正的系统，因为那样两个熵都上升。按"热"从低到高排，标度是 $+0, \dots, +\infty, -\infty, \dots, -0$。负温度要求能谱上界有限，所以它出现在与晶格隔绝的自旋系统里，绝不出现在气体里——气体的动能无上界。1951 年，爱德华·珀塞尔（Edward Purcell）与罗伯特·庞德（Robert Pound）让作用于氟化锂晶体核自旋的磁场反向得比自旋跟得上的速度更快，做出了一个负温度态。

### 压强、化学势与热力学恒等式

能量不是两个系统唯一能交换的东西。若一块可动隔板让它们交换体积，把 [[#thm-equilibrium]] 的同一论证用于 $S_A(V_A) + S_B(V - V_A)$，得平衡时 $\partial S/\partial V$ 相等。若透壁让它们交换粒子，$\partial S/\partial N$ 必须相等。把压强与化学势定义为

$$
P = T\left(\pdv{S}{V}\right)_{U, N}, \qquad \mu = -T\left(\pdv{S}{N}\right)_{U, V},
$$ {#eq-p-mu}

再与 [[#eq-temperature]] 合并，$S(U, V, N)$ 的全微分为

$$
\dd S = \frac{1}{T}\,\dd U + \frac{P}{T}\,\dd V - \frac{\mu}{T}\,\dd N, \qquad\text{即}\qquad \dd U = T\,\dd S - P\,\dd V + \mu\,\dd N.
$$ {#eq-identity}

这就是 [[thermodynamics/entropy]] 的热力学恒等式，添上了粒子项，如今由计数导出。$\mu$ 定义里的负号，选得使粒子从 $\mu$ 高处流向 $\mu$ 低处，正如热从 $T$ 高处流向 $T$ 低处。[[#eq-p-mu]] 里的 $P$ 就是力学压强，这留到 [[statistical-mechanics/classical-gas]] 里对理想气体校核。

::: quiz
某系统有 $S(U) = a\,U^{1/2}$，$a > 0$ 为常数。关于它的温度，哪句话正确？
- [ ] $T$ 与 $U$ 无关。
- [x] $T = 2U^{1/2}/a$，故 $U \propto T^2$。
- [ ] $T = aU^{-1/2}/2$，故 $U \propto T^{-2}$。
- [ ] 温度为负。
::: solution
由 [[#eq-temperature]]，$1/T = \dd S/\dd U = \tfrac12 aU^{-1/2}$，所以 $T = 2U^{1/2}/a$，$U = a^2T^2/4$。热容 $C = a^2T/2$ 正比于 $T$——那是金属中电子的低温行为，[[statistical-mechanics/bose-fermi]] 里会遇到。因为 $S$ 随 $U$ 增加，温度是正的。
:::
:::

::: application 化学家用的是同一套计数
晶体的残余熵是 $T = 0$ 处的多重度。固态一氧化碳凝固时每个分子随机取两种取向之一，留下大约 $R\ln2 = 5.76\,\mathrm{J/(mol\cdot K)}$ 的熵——否则热力学第三定律不会答应；实测残余熵略小于此。计数的化学一面——分子能级及其中间的玻尔兹曼分布——在化学图谱的章节 [玻尔兹曼分布](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=boltzmann-distribution) 里展开。
:::

::: history 玻尔兹曼、普朗克与墓碑上的公式
路德维希·玻尔兹曼（Ludwig Boltzmann）1872 年的论文引入了他的动理方程与 H 定理——一个证明：稀薄气体速率分布的某个特定泛函在碰撞下只能减少。约瑟夫·洛施密特（Josef Loschmidt）的质疑（可逆性，1876）以及后来恩斯特·策梅洛（Ernst Zermelo）的质疑（回归，1896）表明，这样的定理不可能由可逆力学单独推出。玻尔兹曼 1877 年的答复就是本章采用的概率解读：他把能量分成小份，数出与给定分布相容的气体的"复杂态"（complexions）数目，并把熵认定为这个数目的对数。他本人从没把公式写成 $S = k\log W$ 的形式。写的人是马克斯·普朗克（Max Planck），在 1900–1901 年关于黑体辐射的工作里；他还在那里引入了常量 $k$ 并估计了它的值。$S = k \log W$ 刻在玻尔兹曼位于维也纳中央公墓的墓碑上。爱因斯坦的模型固体发表于 1907 年：把能量量子化用于一个实物体的头一次，也是解释热容为什么在低温下降的头一次。
:::

## 后续内容 {#leads}

在固定能量下计数干净却笨拙：我们关心的多数系统并不孤立，而把能量钉死连理想气体都变得别扭。[[statistical-mechanics/canonical]] 把一个小系统放进与一个大热库的热接触，把本章的结果用于热库，导出玻尔兹曼因子 $e^{-E/k_BT}$。从此以后，多重度换成了配分函数，计算成了求和而不是计数。[[statistical-mechanics/classical-gas]] 数箱中运动粒子的状态，找到单原子气体的绝对熵。可分辨与不可分辨之辨——在这里以振子与量子一对的面目出现——将成为 [[statistical-mechanics/quantum-statistics]] 的全部主题。相互作用的偶极子不像本章的这些独立偶极子，能够自发有序化；那就是 [[statistical-mechanics/phase-transitions]]。

::: summary
- 微观状态是完整的微观指定；宏观状态只固定几个整体量。多重度 $\Omega$ 数的是一个宏观状态的微观状态。
- $N$ 个二态偶极子：$\Omega = \binom{N}{N_\uparrow}$。$N$ 个振子共享 $q$ 个量子：$\Omega = \binom{q+N-1}{q}$，由星棒法（stars and bars）。
- 基本假设：处于平衡的孤立系统出现在每个可及微观状态上的可能性相同。于是宏观状态的概率正比于多重度。
- $N$ 大时，一个宏观变量的分布尖锐成峰，相对宽度量级为 $1/\sqrt N$。平衡是多重度最大的宏观状态；第二定律是压倒性概率的陈述。
- 熵是 $S = k_B\ln\Omega$。它可加，与克劳修斯熵一致，且 $\Omega = 1$ 时 $S = 0$。
- 温度由 $1/T = (\partial S/\partial U)_{V,N}$ 定义；接触的系统达到相同的 $T$，能量从 $T$ 高处流向 $T$ 低处。压强与化学势来自 $\partial S/\partial V$ 与 $\partial S/\partial N$，给出 $\dd U = T\,\dd S - P\,\dd V + \mu\,\dd N$。
- 爱因斯坦固体有 $U = N\varepsilon/(e^{\varepsilon/k_BT} - 1)$，高 $T$ 下趋于 $Nk_BT$。顺磁体有 $M = N\mu\tanh(\mu B/k_BT)$：高 $T$ 下是居里定律，$U > 0$ 时温度取负。
:::

## 习题 {#exercises}

::: exercise 十枚硬币 {level=1 check="210"}
十枚可分辨的硬币被抛掷。恰有四个正面的微观状态有多少个？
::: solution
一个微观状态是每枚硬币所显面的一个列表。固定四个正面后，微观状态由十枚中哪四枚出正面决定，所以

$$
\Omega = \binom{10}{4} = \frac{10\cdot9\cdot8\cdot7}{4\cdot3\cdot2\cdot1} = \frac{5040}{24} = 210.
$$

在总共 $2^{10} = 1024$ 个微观状态中，恰有四个正面的概率是 $210/1024 = 0.205$。
:::
:::

::: exercise 一个小的爱因斯坦固体 {level=1 check="56"}
一个爱因斯坦固体有 $N = 4$ 个振子、$q = 5$ 个量子。求它的多重度。
::: solution
由 [[#thm-einstein-omega]]，

$$
\Omega(4, 5) = \binom{5 + 4 - 1}{5} = \binom{8}{5} = \binom{8}{3} = \frac{8\cdot7\cdot6}{6} = 56.
$$

用星与棒的语言：每排有 $5$ 个点、$3$ 道棒，一共八个符号，选定棒所在的三个位置就定下了整排。
:::
:::

::: exercise 一摩尔自由自旋的熵 {level=1 check="5.763"}
一摩尔自旋-$\tfrac12$ 离子位于零场中，每个离子有两个能量相同的态。求自旋系统的熵，以 $\mathrm{J/K}$ 计，取四位有效数字。
::: solution
$2^{N_A}$ 个微观状态全部可及且能量相同，所以 $\Omega = 2^{N_A}$ 且

$$
S = k_B\ln 2^{N_A} = N_Ak_B\ln 2 = R\ln 2 = 8.314462618\times0.693147 = 5.763\,\mathrm{J/K}.
$$

答案不依赖磁矩 $\mu$ 的大小；它是纯粹的计数。
:::
:::

::: exercise 最概然的分配 {level=2 check="50/231"}
对 [[#ex-tiny]] 的两个固体（$N_A = N_B = 3$，$q = 6$），求量子恰好均分（$q_A = 3$）的精确概率，写成最简分数。
::: solution
宏观状态 $q_A = 3$ 有 $\Omega_A\Omega_B = \binom{5}{2}\binom{5}{2} = 10\times10 = 100$ 个微观状态。这对的微观状态总数是六个振子持六个量子的多重度 $\binom{11}{6} = 462$。由 [[#eq-prob-macro]]，

$$
\Prob(q_A = 3) = \frac{100}{462} = \frac{50}{231} = 0.216.
$$

最概然的宏观状态概率仍不到四分之一，因为六个振子远谈不上热力学极限。
:::
:::

::: exercise 数出来的温度 {level=2 check="502"}
一个爱因斯坦固体的量子为 $\varepsilon = 0.0300\,\mathrm{eV}$，平均每个振子持有一个量子（$q = N$，两者都大）。求它的温度，以开尔文计，取三位有效数字。用 $1\,\mathrm{eV} = 1.602176634\times10^{-19}\,\mathrm{J}$。
::: solution
由 [[#ex-einstein-t]]，$1/T = (k_B/\varepsilon)\ln[(q + N)/q]$。$q = N$ 时对数是 $\ln 2$，所以

$$
T = \frac{\varepsilon}{k_B\ln 2} = \frac{0.0300\times1.602176634\times10^{-19}}{1.380649\times10^{-23}\times0.693147} = 502\,\mathrm{K}.
$$

等价地，[[#eq-einstein-u]] 中令 $U/N = \varepsilon$ 要求 $e^{\varepsilon/k_BT} - 1 = 1$，即 $\varepsilon/k_BT = \ln 2$。经典估计 $k_BT = U/N = \varepsilon$ 会给出 $348\,\mathrm{K}$，它是错的，因为固体不在高温区。
:::
:::

::: exercise 低温下的取向 {level=2 check="0.793"}
电子自旋 $\mu = \mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$ 处于 $1.00\,\mathrm{T}$ 的场中、$1.00\,\mathrm{K}$ 下。求沿场取向的自旋比例 $N_\uparrow/N$，取三位有效数字。再求使该比例为 $0.600$ 的温度。
::: solution
比为 $y = \mu B/k_BT = 9.2740\times10^{-24}/1.380649\times10^{-23} = 0.6717$。由 [[#eq-para-m]]，

$$
\frac{N_\uparrow}{N} = \frac{e^{y}}{e^{y} + e^{-y}} = \frac{1}{1 + e^{-2y}} = \frac{1}{1 + e^{-1.3434}} = \frac{1}{1 + 0.2610} = 0.793.
$$

要比例为 $0.600$：$1 + e^{-2y} = 1/0.6$，于是 $e^{-2y} = 2/3$，$y = \tfrac12\ln1.5 = 0.2027$。从而 $T = \mu_BB/(k_By) = 0.6717\,\mathrm{K}/0.2027 = 3.31\,\mathrm{K}$。
:::
:::

::: exercise 广延性与高温固体 {level=3}
从 [[#eq-einstein-lnomega]] 出发，证明极限 $q \gg N$ 下爱因斯坦固体的熵为 $S = Nk_B[\ln(U/N\varepsilon) + 1]$。证明这个 $S$ 是广延的——广延的意思是 $N$ 与 $U$ 一起加倍时 $S$ 加倍——并由它导出 $U = Nk_BT$。然后证明精确的 [[#eq-einstein-lnomega]] 也是广延的。
::: hint
证广延性时直接算 $S(2N, 2U)$。在 [[#eq-einstein-lnomega]] 里把 $q$ 与 $N$ 换成 $\lambda q$ 与 $\lambda N$，收集 $\ln\lambda$ 的项。
:::
::: solution
$q \gg N$ 时写 $\ln(q + N) = \ln q + \ln(1 + N/q)$，用 $\ln(1 + z) = z + O(z^2)$：

$$
(q + N)\ln(q + N) = (q + N)\ln q + (q + N)\frac{N}{q} + \dots = (q + N)\ln q + N + O\!\left(\frac{N^2}{q}\right).
$$

减去 $q\ln q + N\ln N$ 后剩 $\ln\Omega = N\ln q - N\ln N + N = N[\ln(q/N) + 1]$，误差为相对 $N/q$ 量级的项。以 $q = U/\varepsilon$ 代入，

$$
S = k_B\ln\Omega = Nk_B\left[\ln\frac{U}{N\varepsilon} + 1\right].
$$

广延性：把 $N \to 2N$、$U \to 2U$，比值 $U/N$ 不变，于是方括号不变而前置因子加倍：$S(2N, 2U) = 2S(N, U)$。对任意因子 $\lambda$ 同样成立。

温度：$1/T = \partial S/\partial U = Nk_B/U$，所以 $U = Nk_BT$，与 [[#eq-einstein-u]] 的高温极限一致。

对精确的斯特林形式，令 $q \to \lambda q$、$N \to \lambda N$：

$$
\begin{aligned}
\ln\Omega(\lambda N, \lambda q) &= \lambda(q + N)[\ln\lambda + \ln(q + N)] - \lambda q[\ln\lambda + \ln q] - \lambda N[\ln\lambda + \ln N] \\
&= \lambda\bigl[(q + N)\ln(q + N) - q\ln q - N\ln N\bigr] + \lambda\ln\lambda\,\bigl[(q + N) - q - N\bigr] \\
&= \lambda\ln\Omega(N, q).
\end{aligned}
$$

[[#eq-einstein-lnomega]] 的系数加起来为零，正是使 $\ln\lambda$ 项精确相消的原因。所以熵的斯特林形式在 $(N, U)$ 中是一次齐次：它在一切温度下广延，不只在高温度。
:::
:::

::: exercise 负温度更热 {level=3}
$N$ 个偶极子的顺磁体具有能量 $U$，$0 < U < N\mu B$。由它的熵的斯特林形式证明其温度为负。把它与一个处于正温度的爱因斯坦固体作热接触。证明能量从顺磁体流入固体，并求顺磁体的能量从上侧趋于 $0$ 时它的温度的极限。
::: hint
用 [[#eq-para-u]] 把 $N_\uparrow$ 与 $N_\downarrow$ 写成 $U$ 的函数，并使用正文推出的 $1/T = (k_B/2\mu B)\ln(N_\uparrow/N_\downarrow)$。判断流向时用 [[#thm-equilibrium]] 的第二部分。
:::
::: solution
由 [[#eq-para-u]]，$N_\uparrow = (N - U/\mu B)/2$，$N_\downarrow = (N + U/\mu B)/2$。$U > 0$ 时 $N_\uparrow < N_\downarrow$，所以 $\ln(N_\uparrow/N_\downarrow) < 0$ 且

$$
\frac{1}{T_P} = \frac{k_B}{2\mu B}\ln\frac{N\mu B - U}{N\mu B + U} < 0.
$$

顺磁体的温度 $T_P$ 为负。

让顺磁体作系统 A、固体作系统 B，$1/T_B > 0$。由 [[#thm-equilibrium]]，能量 $\dd U_A$ 进入顺磁体时总熵改变 $\dd S = (1/T_P - 1/T_B)\,\dd U_A$。括号是负数减正数，所以为负。于是 $\dd S > 0$ 当且仅当 $\dd U_A < 0$：更概然的宏观状态是顺磁体把能量交给了固体的那些。能量从负温度系统流向正温度系统，无论那个正温度是多少。在这个意义上，负温度比一切正温度都更热。

$U \to 0^+$ 时 $N_\uparrow/N_\downarrow \to 1$，$1/T_P \to 0^-$，所以 $T_P \to -\infty$。$U = 0$ 处熵取极大 $Nk_B\ln2$，$1/T = 0$；从下侧趋近则 $T \to +\infty$。$+\infty$ 与 $-\infty$ 两个温度描述同一个态，而自然变量 $1/T$ 平滑地穿过零。
:::
:::
