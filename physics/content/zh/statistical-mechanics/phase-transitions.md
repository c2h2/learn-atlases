本课程到此研究过的每一个系统都是理想的：粒子、自旋或模式之间没有相互作用，配分函数因子化，热力学函数对温度光滑。物质不是这样的。水在一个大气压下于 $373.12\,\mathrm{K}$ 沸腾，密度跳变约一千六百倍。铁在居里温度 $1043\,\mathrm{K}$ 以下是永磁铁，之上是顺磁体。二氧化碳在 $304.13\,\mathrm{K}$、$7.38\,\mathrm{MPa}$ 处有一个临界点，越过它，液与气的区别消失。这些就是**相变**，而相变由相互作用产生：一个水分子无法沸腾，一个铁原子也无法成为铁磁体。

我们遇到过的唯一理想气体相变——[[statistical-mechanics/bose-fermi]] 的玻色-爱因斯坦凝聚——已经表明：相变是热力学函数中的奇点，而奇点只在粒子数无穷的极限里出现。本章研究最简单的、有相变的相互作用模型：晶格上磁自旋的**伊辛模型**。一维里我们能精确求解，找不到相变。任意维度里我们用**平均场理论**近似求解，它预言一个相变，临界点附近有简单的幂律。这些幂律——**临界指数**——在二维和三维被证明是错的，而昂萨格（Onsager）的二维严格解显示错了多少。最后我们用 **Metropolis 算法**模拟这个模型——正是这个算法让相互作用系统的统计力学成了一门计算科学。

## 相与序参量 {#order}

相变分隔相图上系统性质迥然不同的两个区域。这种不同通常用一个在一个相中为零、在另一个相中不为零的来表述。

::: definition 序参量 {#def-order-parameter}
**序参量**是这样一种热力学量：在对称性更高（通常是高温）的相中为零，在对称性较低的相中不为零。对铁磁体，它是零外场下每个自旋的自发磁化强度 $m$；对临界点附近的液气转变，它是密度差 $\rho_{\mathrm{liquid}} - \rho_{\mathrm{gas}}$。
:::

若序参量随之熵与体积一起不连续地跳变、因而存在潜热，相变就是**一级**的：沸腾与熔化是一级的。若序参量在转变处连续地趋于零，它就是**连续的**（或二级的）：零场中处于居里点的铁磁体，以及恰好处在临界点的液气系统。泡利·埃伦费斯特（Paul Ehrenfest）1933 年的分类按自由能量低阶导数不连续给相变编号；现代用法保留"一级"，其余一律归入"连续"，因为真实的临界点处导数是发散而非跳变。

::: proposition 有限系统没有相变 {#prop-finite}
微观状态数目有限的系统，自由能 $F = -k_BT\ln Z$ 是 $T > 0$ 以及能量所依赖的任何参数的实解析函数。特别地，它的任何阶导数都没有不连续或奇点。
:::

::: proof
$Z = \sum_se^{-E_s/k_BT}$ 是有限多个指数函数之和，每一项都是 $T > 0$ 与参数的解析函数，所以 $Z$ 解析。每一项为正，故 $Z > 0$，且 $\ln Z$ 在 $Z$ 解析处解析。解析函数的乘积与复合仍解析，所以 $F = -k_BT\ln Z$ 解析。
:::

所以尖锐的相变需要**热力学极限**：密度固定、$N \to \infty$。每一个 $F/N$ 都解析，但 $F/N$ 的极限却可以非解析。$10^{23}$ 个粒子的真实样品是有限的，但它的相变"圆化"小到看不见。几百个自旋的模拟——如本章末尾——就不是了。

## 伊辛模型 {#ising}

1920 年威廉·伦次（Wilhelm Lenz）提出了这个模型，他的学生恩斯特·伊辛（Ernst Ising）1925 年求出了一维的解。它是近邻磁矩相互作用的最简单磁体模型。

::: definition 伊辛模型 {#def-ising}
$N$ 个格点的格子上，每个格点 $i$ 带一个自旋 $s_i = \pm1$。构型 $\{s_i\}$ 的能量为

$$
E\{s\} = -J\sum_{\langle ij\rangle}s_is_j - h\sum_is_i,
$$ {#eq-ising}

其中第一个求和遍历近邻对，每对计一次；$J$ 是**耦合常数**；$h$ 是以能量计的外加场（磁矩为 $\mu$ 时 $h = \mu B$）。$J > 0$ 时模型是**铁磁性**的：近邻同向使能量降低。每个格点的近邻数称为**配位数** $q$：链 $q = 2$，正方格子 $q = 4$，简单立方格子 $q = 6$。每个自旋的磁化强度为 $m = \langle s_i\rangle$。
:::

竞争发生在能量与熵之间。$T = 0$ 时自由能 $F = U - TS$ 就是能量，自旋全部向上或全部向下使其最小：这是 $m = \pm1$ 的有序相。高温下熵项取胜，自旋杂乱无章，$m = 0$。问题在于：从一种情形变到另一种情形是否发生在某个尖锐的温度上，以及如何发生。

::: remark 格点气体
同一个模型也描述流体。让格子的每个格点要么空着、要么被一个分子占据，近邻格点上的分子间有吸引 $-\varepsilon$。把占据数写成 $n_i = (1 + s_i)/2$，格点气体的能量连同分子的化学势就变成了 [[#eq-ising]]，其中 $J = \varepsilon/4$、$h$ 由 $\mu$ 决定。磁化强度成了密度，两个有序态成了液体和气体，居里点成了液气临界点。这是伊辛模型的重要性远超磁学的原因之一。
:::

### 一维链

::: theorem 伊辛链 {#thm-chain}
$N$ 个自旋的开链、耦合 $J$、零场，有

$$
Z = 2\,(2\cosh\beta J)^{N-1},
$$ {#eq-chain-z}

间距为 $r$ 的两自旋的自旋–自旋关联为 $\langle s_is_{i+r}\rangle = (\tanh\beta J)^r$。在每一个温度 $T > 0$，关联都指数衰减，关联长度为（以格距计）$\xi = -1/\ln\tanh(\beta J)$，自发磁化强度为零。链在任何 $T > 0$ 都没有相变。
:::

::: proof
能量为 $-J\sum_{i=1}^{N-1}s_is_{i+1}$。引入**键变量** $b_i = s_is_{i+1}$，$i = 1, \dots, N-1$。给定 $s_1$，键决定每一个自旋，$s_{i+1} = s_ib_i$，反之亦然，所以从 $(s_1, s_2, \dots, s_N)$ 到 $(s_1, b_1, \dots, b_{N-1})$ 的映射是 $\{\pm1\}^N$ 到自身的一个双射。新变量下能量为 $-J\sum b_i$，是独立项之和，且

$$
Z = \sum_{s_1 = \pm1}\,\prod_{i=1}^{N-1}\sum_{b_i = \pm1}e^{\beta Jb_i} = 2\,(2\cosh\beta J)^{N-1}.
$$

各键彼此独立，每个有 $\langle b\rangle = \tanh\beta J$。由于 $s_is_{i+r} = b_ib_{i+1}\cdots b_{i+r-1}$（中间每个自旋出现两次、平方为一），独立性给出 $\langle s_is_{i+r}\rangle = (\tanh\beta J)^r = e^{-r/\xi}$，其中 $\xi = -1/\ln\tanh\beta J$；因为 $\tanh\beta J < 1$，它对一切 $T > 0$ 有限。

磁化强度方面，零场的能量在全体自旋翻转下不变，所以有限链中 $\langle s_i\rangle = 0$。热力学极限下的自发磁化强度要求任意远的自旋保持关联，即 $r \to \infty$ 时 $\langle s_is_{i+r}\rangle \to m^2 > 0$；但关联趋于 $0$。每个自旋的自由能（极限下为 $-k_BT\ln(2\cosh\beta J)$）在 $T > 0$ 解析。
:::

这背后有一个简单的能量-熵论证。从全向上态出发，把所选某根键一侧的自旋全部翻转，会在键上产生一条**畴壁**，能量代价 $2J$，而这条键可以放在 $N - 1$ 个位置之一，熵增益 $k_B\ln(N - 1)$。长链的 $F = 2J - k_BT\ln(N - 1)$ 在任何 $T > 0$ 都是负的，所以畴壁不断增殖，摧毁长程序。二维中，线度 $\ell$ 的磁畴要花与周长成正比的能量 $\propto \ell$，而形状数同样按 $\ell$ 指数增长；鲁道夫·佩尔斯（Rudolf Peierls）1936 年证明，温度足够低时能量取胜，所以二维模型确实有序。

::: example 关联有多长？ {#ex-correlation}
对伊辛链，求 $k_BT = J$ 与 $k_BT = J/2$ 时的关联长度，以及 $k_BT = J$ 时相距五个格点的两自旋的关联。
::: solution
$\beta J = 1$ 时 $\tanh1 = 0.7616$，$\xi = -1/\ln0.7616 = 3.67$ 个格距。$r = 5$ 处的关联为 $0.7616^5 = 0.256$。

$\beta J = 2$ 时 $\tanh2 = 0.9640$，$\xi = -1/\ln0.9640 = 27.3$。温度减半，关联长度增加了七倍多。$\beta J$ 大时 $1 - \tanh\beta J \approx 2e^{-2\beta J}$，$\xi \approx \tfrac12e^{2\beta J}$：关联长度在 $T \to 0$ 时指数增长，但任何正温度下都有限。链在低温"几乎"有序——磁畴长约 $\xi$——但永有序。
:::
:::

## 平均场理论 {#mean-field}

二维或三维里，[[#eq-ising]] 的配分函数无法因子化，因为每个自旋都与近邻耦合。最简单的近似——本质上出自皮埃尔·外斯（Pierre Weiss，1907 年）——把每个自旋的近邻换成它们的平均。自旋 $s_i$ 于是感到外场 $h$ 加上 $q$ 个近邻给出的有效场 $J\sum_{j\in\mathrm{nb}(i)}s_j \approx qJm$。像 [[statistical-mechanics/canonical]] 里那样把它当作场 $h + qJm$ 中的独立自旋，它的平均值是 $\tanh[\beta(h + qJm)]$。而这个平均值就是 $m$ 本身，于是得到自洽条件。

借助 [[statistical-mechanics/canonical]] 习题中证明的吉布斯变分原理，这个近似可以更牢靠地站稳：真实自由能是 $\langle E\rangle - TS$ 对一切概率分布的极小。

::: theorem 伊辛模型的平均场理论 {#thm-mean-field}
把试探分布限制为自旋彼此独立、每个以概率 $(1 + m)/2$ 向上的那些。每个自旋的变分自由能为

$$
f(m) = -\tfrac12qJm^2 - hm - k_BT\,\sigma(m), \qquad \sigma(m) = -\frac{1+m}{2}\ln\frac{1+m}{2} - \frac{1-m}{2}\ln\frac{1-m}{2},
$$ {#eq-mf-free}

它的驻点满足

$$
m = \tanh\bigl[\beta(qJm + h)\bigr].
$$ {#eq-self-consistent}

$f$ 的极小是真实每个自旋自由能的上界。零场下，非零解存在当且仅当 $T < T_c$，其中

$$
k_BT_c = qJ.
$$ {#eq-mf-tc}
:::

::: proof
对 $\langle s_i\rangle = m$ 的独立自旋，两个不同自旋乘积的平均为 $\langle s_is_j\rangle = m^2$。近邻对有 $Nq/2$ 个，所以 $\langle E\rangle = -\tfrac12NqJm^2 - Nhm$。按吉布斯公式 $-k_B\sum p\ln p$，概率为 $(1 \pm m)/2$ 的 $N$ 个独立二态变量的熵是 $Nk_B\sigma(m)$。把 $\langle E\rangle - TS$ 除以 $N$ 即得 [[#eq-mf-free]]，变分原理说它不小于真实的每自旋自由能。

求导。由 $\sigma'(m) = -\tfrac12\ln\frac{1+m}{1-m} = -\operatorname{artanh}m$，

$$
f'(m) = -qJm - h + k_BT\operatorname{artanh}m = 0 \iff m = \tanh\bigl[\beta(qJm + h)\bigr].
$$

$h = 0$ 时 $m = 0$ 总是解。其余解是直线 $y = m$ 与曲线 $y = \tanh(\beta qJm)$ 的交点。曲线是奇函数，$m > 0$ 时上凸，原点处斜率为 $\beta qJ$，并随 $m \to \infty$ 趋于 $1$。若 $\beta qJ \le 1$，则一切 $m > 0$ 有 $\tanh(\beta qJm) < \beta qJm \le m$，没有正解。若 $\beta qJ > 1$，曲线出发于直线上方、终止于直线下方（因为 $\tanh < 1$），由连续性恰有一个正交点（由凸性知恰一个），以及它的负数。阈值是 $\beta qJ = 1$，即 $k_BT_c = qJ$。

$T_c$ 以下，$f''(0) = -qJ + k_BT < 0$，所以 $m = 0$ 是 $f$ 的局部极大，极小在非零解处。
:::

::: widget plot
f: x; tanh(x/t)
x: -2, 2
y: -1.2, 1.2
sliders: t=1.5:0.2:2:0.01
labels: m; tanh(m T_c/T)
caption: 零场下平均场方程的图解解，$t = T/T_c$。解就是直线与曲线的交点。从 $t = 1.5$ 开始：唯一的交点是 $m = 0$。把 $t$ 降过 $1$：两个新交点从原点浮现并连续外移，这就是连续相变。$t = 0.5$ 时它们在 $m = \pm0.958$，接近饱和。
:::

自洽方程有一个熟面孔：它是 [[statistical-mechanics/microcanonical]] 里顺磁体的 $m = \tanh(\beta\mu B)$，只是场里加上了自旋自己的贡献。正是这个反馈让有序得以自我维持。

::: widget plot
f: x^2/2 - t*ln(2*cosh(x/t))
x: -1.3, 1.3
y: -1.2, 0
sliders: t=1.2:0.2:1.6:0.01
caption: 零场下平均场自由能作为试探磁化强度的函数，以 $qJ$ 为单位。这就是驻点满足自洽方程的那个函数 $\tfrac12m^2 - t\ln[2\cosh(m/t)]$，其中 $t = T/T_c$；它的极小点与 [[#eq-mf-free]] 的一致。$t > 1$ 时只有一个位于 $m = 0$ 的极小。把 $t$ 拖到 $1$ 以下：底部先变平，然后裂成两个对称的势阱。系统选中其中一个，破掉能量关于上–下的对称性。
:::

### 平均场理论中的临界行为

$T_c$ 附近序参量很小，[[#eq-self-consistent]] 可以展开。用 $\tanh y = y - y^3/3 + O(y^5)$、记 $\tau = T/T_c$，零场下，

$$
m = \frac{m}{\tau} - \frac{m^3}{3\tau^3} + \dots \quad\Rightarrow\quad m^2 = 3\tau^2(1 - \tau) + \dots \quad\Rightarrow\quad m \approx \sqrt3\left(1 - \frac{T}{T_c}\right)^{1/2}.
$$ {#eq-mf-m}

磁化强度按距 $T_c$ 距离的平方根消失。另外三个量同样按幂律。

- **磁化率。** $T_c$ 以上，$m$ 小、$h$ 小时，[[#eq-self-consistent]] 给出 $m \approx \beta(qJm + h)$，所以 $\chi = \partial m/\partial h = \beta/(1 - \beta qJ) = 1/[k_B(T - T_c)]$。这就是**居里–外斯定律**：居里的 $1/T$ 平移到 $1/(T - T_c)$，在转变处发散。
- **临界等温线。** $T = T_c$ 时 $\beta qJ = 1$，展开给出 $m = m + \beta h - m^3/3$，于是 $m = (3h/k_BT_c)^{1/3}$。
- **热容。** $h = 0$ 时平均场的每自旋能量为 $-\tfrac12qJm^2$：$T_c$ 以上为 $0$，紧挨其下为 $-\tfrac32qJ(1 - T/T_c)$。求导得 $C/N$ 从 $T_c$ 正下方的 $\tfrac32k_B$ 跳到正上方的 $0$。

::: example 平均场对上答案 {#ex-mf-numbers}
求正方格子与简单立方格子上伊辛模型的平均场转变温度，以 $J/k_B$ 为单位，与正方格子的严格值 $k_BT_c/J = 2/\ln(1 + \sqrt2)$ 和立方格子的数值值 $4.5115$ 比较。再用 [[#eq-mf-m]] 求 $T = 0.9\,T_c$ 时的平均场磁化强度，并与精确值比较。
::: solution
由 [[#eq-mf-tc]]，$k_BT_c/J = q$：正方格子为 $4$，立方格子为 $6$。正方格子的严格值为 $2/\ln(2.41421) = 2/0.88137 = 2.2692$，平均场理论把 $T_c$ 高估了 $76\%$。立方格子高估 $6/4.5115 - 1 = 33\%$。维度越高，每个自旋的近邻越多、近邻的平均涨落越小，平均场就干得越好。而对链，它会错误地预言 $k_BT_c = 2J$ 处有相变——那里根本没有。

$T = 0.9\,T_c$ 时，从 $m = 1$ 迭代 $m \leftarrow \tanh(m/0.9)$：迭代收敛到 $m = 0.5254$。展开式 [[#eq-mf-m]] 给 $\sqrt{3\times0.81\times0.1} = 0.493$（带因子 $\tau^2$）或 $\sqrt{0.3} = 0.548$（不带）；两者误差都在 $6\%$ 以内，且 $T \to T_c$ 时符合变好。$T = 0.99\,T_c$ 处精确根为 $0.1725$，$\sqrt{0.03} = 0.1732$。
:::
:::

::: example 铁的一个耦合常数 {#ex-iron}
铁是体心立方，近邻数 $q = 8$，在 $1043\,\mathrm{K}$ 失去铁磁性。用平均场理论估计耦合常数 $J$，以开尔文和电子伏计，并说说这个估计值值多少。
::: solution
由 [[#eq-mf-tc]]，$J = k_BT_c/q = k_B\times1043\,\mathrm{K}/8$，故 $J/k_B = 130\,\mathrm{K}$，且

$$
J = 1.380649\times10^{-23}\times130.4\,\mathrm{J} = 1.80\times10^{-21}\,\mathrm{J} = 0.0112\,\mathrm{eV}.
$$

由于给定 $J$ 时平均场理论高估 $T_c$——三维格子大约高三分之一（见 [[#ex-mf-numbers]]）——要产生实测的 $T_c$，所需的耦合相应更大，约 $0.015\,\mathrm{eV}$。无论哪种估计，它都比化学键小约一百倍，而且不是两个近邻磁矩的磁偶极子–偶极子能量——那个还要小一千倍：耦合来自量子力学的交换相互作用，是泡利原理作用于电子波函数的结果。铁也不是伊辛磁体：它的磁矩可以指向任意方向，磁性电子是巡游的。这个估计给出交换能的量级，而不是精确的参数。
:::
:::

::: warning 平均场理论不是"理论"
平均场理论在二维和三维把相变的存在弄对了，在一维弄错了。它把临界温度弄错几十个百分点，把二维和三维的临界指数弄错。它恰恰忽略了临界点附近最要紧的东西：序参量在远超格距的距离上的关联涨落。它的预言只在四维及以上（或长程相互作用下）才精确。用它做第一张定性图像，并对 $T_c$ 附近的定量误差心中有数。
:::

::: quiz
平均场理论中，转变温度如何依赖格子？
- [ ] 只依赖 $J$，不依赖格子。
- [x] 与近邻数成正比。
- [ ] 与格子维数的平方成正比。
- [ ] 二维时为零。
::: solution
$k_BT_c = qJ$。自旋感受的有效场是 $qJm$，近邻越多场越强、$T_c$ 越高。维数只通过 $q$ 进来，这正是平均场理论看不出链（$q = 2$）不会有序的原因。
:::
:::

## 临界指数与普适性 {#exponents}

连续相变附近，热力学量的奇异部分按**约化温度** $t = (T - T_c)/T_c$ 的幂。指数定义如下

$$
m \propto (-t)^\beta \;(t < 0), \qquad \chi \propto \lvert t\rvert^{-\gamma}, \qquad C \propto \lvert t\rvert^{-\alpha}, \qquad m \propto h^{1/\delta}\;(t = 0), \qquad \xi \propto \lvert t\rvert^{-\nu},
$$ {#eq-exponents}

其中 $\xi$ 是关联长度。（指数 $\beta$ 不是 $1/k_BT$；记号相撞是惯例。）平均场理论给 $\beta = \tfrac12$、$\gamma = 1$、$\delta = 3$、$\alpha = 0$（跳变），对涨落的高斯处理给 $\nu = \tfrac12$。

::: theorem 昂萨格的解 {#thm-onsager}
零场、耦合常数 $J$ 的正方格子伊辛模型，热力学极限下每个自旋的自由能为

$$
-\beta f = \ln2 + \frac{1}{8\pi^2}\int_0^{2\pi}\!\!\int_0^{2\pi}\ln\Bigl[\cosh^2(2\beta J) - \sinh(2\beta J)\bigl(\cos\theta_1 + \cos\theta_2\bigr)\Bigr]\,\dd\theta_1\,\dd\theta_2.
$$

它只在由 $\sinh(2J/k_BT_c) = 1$ 给出的那一个温度 $T_c$ 非解析，即

$$
\frac{k_BT_c}{J} = \frac{2}{\ln(1 + \sqrt2)} = 2.269185\ldots,
$$ {#eq-onsager-tc}

该处比热对数发散，$C \sim -\ln\lvert T - T_c\rvert$。自发磁化强度（昂萨格 1948 年给出，杨振宁（C. N. Yang）1952 年证明）为

$$
m = \Bigl[1 - \sinh^{-4}(2\beta J)\Bigr]^{1/8} \quad (T < T_c),
$$ {#eq-yang}

$T_c$ 以上为零。
:::

证明很长；它用到转移矩阵——宽 $L$ 的条带上一个 $2^L\times2^L$ 的矩阵——并将其精确对角化。昂萨格 1944 年的原始论文用转移矩阵的代数；舒尔茨（Schultz）、马蒂森（Mattis）与利布（Lieb）（1964）更简单的费米子方法，见 Kardar 的 *Statistical Physics of Fields* 与 Baxter 的 *Exactly Solved Models in Statistical Mechanics*。$T_c$ 的位置更早就在 1941 年由亨德里克·克拉默斯（Hendrik Kramers）与格雷戈里·瓦尼埃（Gregory Wannier）定出：他们用一个把高温模型映到低温模型的对偶证明 $T_c$ 必是自对偶点，即 $\sinh(2\beta J) = 1$。

把 [[#eq-yang]] 在 $T_c$ 附近展开得 $m \propto (T_c - T)^{1/8}$：指数是 $\beta = \tfrac18$，不是 $\tfrac12$。磁化强度在 $T_c$ 以下的爬升远比平均场理论预言的陡峭。下表汇集各指数。

| 指数 | 平均场 | 二维伊辛（严格） | 三维伊辛（数值） | 液气（实验） |
|---|---|---|---|---|
| $\alpha$ | $0$（跳变） | $0$（对数） | $0.110$ | $0.11$ |
| $\beta$ | $1/2$ | $1/8$ | $0.326$ | $0.33$ |
| $\gamma$ | $1$ | $7/4$ | $1.237$ | $1.24$ |
| $\delta$ | $3$ | $15$ | $4.79$ | $4.8$ |
| $\nu$ | $1/2$ | $1$ | $0.630$ | $0.63$ |

后两列才是那件惊人的事。氙、二氧化碳或水的液气临界点，与单轴磁体的转变，在实验精度内具有与三维伊辛模型相同的指数。这就是**普适性**：临界点附近，关联长度远超一切微观长度，指数只依赖空间的维数和序参量的对称性（这里是单个实数、带对称性 $m \to -m$），而不依赖格子、相互作用或具体物质。解释是肯尼斯·威尔逊（Kenneth Wilson）的重整化群（1971）：它把改变尺度当作模型空间上的变换。这超出本课程，但 Sethna 与 Kardar 的书是好的入门。这些指数还满足**标度关系**，如 $\alpha + 2\beta + \gamma = 2$ 与 $\gamma = \beta(\delta - 1)$，表中每一列都成立：二维伊辛，$0 + \tfrac14 + \tfrac74 = 2$、$\tfrac18\times14 = \tfrac74$。

::: quiz
按严格解，二维伊辛模型的自发磁化强度在 $T_c$ 稍下方与平均场预言相比如何？
- [ ] 爬得更慢，因为 $\beta = 1/8$ 比 $1/2$ 小。
- [x] 爬得更陡，因为 $1 - T/T_c$ 很小时 $(1 - T/T_c)^{1/8}$ 远大于 $(1 - T/T_c)^{1/2}$。
- [ ] 两者一致，因为都是连续相变。
- [ ] 严格解的磁化强度不连续地跳变。
::: solution
对小的正数 $x$，$x^{1/8} \gg x^{1/2}$：$x = 10^{-4}$ 时 $x^{1/8} = 0.32$ 而 $x^{1/2} = 0.01$。指数越小，从零爬升越陡。相变仍是连续的；指数只描述序参量出现的快慢。
:::
:::

## 蒙特卡洛模拟 {#monte-carlo}

对多数相互作用系统，既没有严格解，平均场理论也够不上精确。一个 $20\times20$ 自旋伊辛模型的配分函数是 $2^{400} \approx 10^{120}$ 项的和，任何计算机都数不完。但求平均值不需要 $Z$，需要的是一份按玻尔兹曼概率抽出的构型样本。**Metropolis 算法**把这样一份样本做成随机游走的逐次状态，其一般理论见 [[computation/random-sampling]]。

::: algorithm 伊辛模型的 Metropolis 算法 {#alg-metropolis}
从任意构型开始。重复：

1. 均匀随机地选一个格点 $i$。
2. 计算翻转 $s_i$ 造成的能量改变 $\Delta E$。对 [[#eq-ising]]，$\Delta E = 2s_i\bigl(J\sum_{j\in\mathrm{nb}(i)}s_j + h\bigr)$，只涉及近邻。
3. 若 $\Delta E \le 0$，翻转自旋。否则以概率 $e^{-\beta\Delta E}$ 翻转：取 $[0, 1)$ 内的均匀随机数 $r$，若 $r < e^{-\beta\Delta E}$ 就翻转。

经过一段初始的**平衡化**时间后，按固定间隔记录观测量并取平均。$N$ 次尝试翻转构成一次**扫描**。
:::

::: theorem 细致平衡 {#thm-detailed-balance}
Metropolis 规则对玻尔兹曼分布 $p_a \propto e^{-\beta E_a}$ 满足**细致平衡**：凡相差一次自旋翻转的两个构型 $a$ 与 $b$，转移概率都满足 $p_aW(a \to b) = p_bW(b \to a)$。因此玻尔兹曼分布是游走的平稳分布；又因为任何构型都可由单次翻转从任何其它构型到达，沿游走的平均收敛到正则平均。
:::

::: proof
设 $a$ 与 $b$ 只差翻转格点 $i$，$E_b - E_a = \Delta E$，不失一般性地设 $\Delta E \ge 0$。提议这次翻转的概率两个方向都是 $1/N$。从 $a$ 看翻转是上坡，以概率 $e^{-\beta\Delta E}$ 被接受；从 $b$ 看是下坡，总被接受。于是

$$
p_aW(a \to b) = \frac{e^{-\beta E_a}}{Z}\cdot\frac1N\cdot e^{-\beta\Delta E} = \frac{e^{-\beta E_b}}{Z}\cdot\frac1N = p_bW(b \to a).
$$

为证平稳性，把细致平衡对一切 $a$ 求和：一步之内流入 $b$ 的概率是 $\sum_ap_aW(a \to b) = \sum_ap_bW(b \to a) = p_b$，因为离开 $b$ 去往一切去处（包括原地不动）的概率之和为 $1$。所以若某一步游走服从玻尔兹曼分布，下一步也服从。从任意初态收敛到该分布，是有限马尔可夫链的遍历定理：不可约（一切构型可达）且非周期（这里，被拒绝的行走正好使其能够原地停留）的链有唯一平稳分布并且收敛于它。
:::

这套构造的要害在于，出现的只有*比值* $p_b/p_a = e^{-\beta\Delta E}$，永远没有 $Z$。下面是一段用普通 python 写的完整模拟：$J = k_B = 1$，周期性边界，固定种子使输出可复现。

```python
import math
import random

def metropolis_ising(L, T, sweeps, equil, seed):
    """2D Ising model, J = 1, k_B = 1, periodic boundaries, no field."""
    rng = random.Random(seed)
    s = [[1] * L for _ in range(L)]          # 从全磁化状态开始
    # 仅有的两种上坡翻转 dE = 4 和 8 的接受概率
    w = {4: math.exp(-4 / T), 8: math.exp(-8 / T)}
    m_abs = 0.0
    e_sum = 0.0
    for sweep in range(equil + sweeps):
        for _ in range(L * L):
            i = rng.randrange(L)
            j = rng.randrange(L)
            nb = (s[(i + 1) % L][j] + s[(i - 1) % L][j]
                  + s[i][(j + 1) % L] + s[i][(j - 1) % L])
            dE = 2 * s[i][j] * nb
            if dE <= 0 or rng.random() < w[dE]:
                s[i][j] = -s[i][j]
        if sweep >= equil:
            M = sum(map(sum, s))
            E = -sum(s[i][j] * (s[(i + 1) % L][j] + s[i][(j + 1) % L])
                     for i in range(L) for j in range(L))
            m_abs += abs(M) / (L * L)
            e_sum += E / (L * L)
    return m_abs / sweeps, e_sum / sweeps

for T in (1.5, 2.0, 2.269, 2.5, 3.0):
    m, e = metropolis_ising(L=20, T=T, sweeps=2000, equil=500, seed=1953)
    print(f"T = {T:5.3f}   <|m|> = {m:.3f}   <E>/N = {e:.3f}")
```

在 $20\times20$ 格子上它几秒钟跑完，打印

```
T = 1.500   <|m|> = 0.986   <E>/N = -1.950
T = 2.000   <|m|> = 0.913   <E>/N = -1.746
T = 2.269   <|m|> = 0.744   <E>/N = -1.478
T = 2.500   <|m|> = 0.333   <E>/N = -1.123
T = 3.000   <|m|> = 0.130   <E>/N = -0.827
```

零场下能量改变只取 $0, \pm4, \pm8$，所以两个用得到的指数算一次就行。程序平均 $\lvert m\rvert$ 而不是 $m$，因为零场的有限系统终究会在向上态与向下态之间翻转，$\langle m\rangle$ 由对称性为零；$\langle\lvert m\rvert\rangle$ 是自发磁化强度在有限尺寸的替身。

::: example 读模拟结果 {#ex-reading-mc}
把模拟得到的磁化强度与严格结果 [[#eq-yang]] 以及平均场理论比较，并解释 $T_c$ 及其以上的数值。
::: solution
由 [[#eq-yang]]，$T = 1.5$ 时 $\sinh(2/1.5) = 1.7548$，$m = (1 - 1.7548^{-4})^{1/8} = 0.9865$；$T = 2.0$ 时 $\sinh1 = 1.1752$，$m = 0.9113$。模拟给出 $0.986$ 与 $0.913$，在一次短跑的统计精度内相符。平均场理论的 $T_c = 4$，会给出 $T = 1.5$ 时 $m = 0.990$（由 $m = \tanh(4m/1.5)$），略偏大；$T = 3.0$ 时它仍预言强有序 $m = 0.776$，而那里严格磁化强度为零。

$T = 2.269$ 基本上就是 $T_c$：严格无限格点的磁化强度为零，模拟却报 $0.744$。这是有限尺寸效应：$T_c$ 处关联长度超过 20 个格点的格子，$\langle\lvert m\rvert\rangle$ 只按 $L^{-\beta/\nu} = L^{-1/8}$ 随系统尺寸衰减，$L = 20$ 时即 $20^{-1/8} = 0.69$，正是这个大小。$T_c$ 以上的 $T = 2.5$ 与 $3.0$ 处 $\langle\lvert m\rvert\rangle$ 也不是零，理由更简单：关联长度有限时，$400$ 个自旋之和的典型大小是 $\sqrt{400\,\xi^2}$ 量级，故 $\lvert m\rvert \sim \xi/L$，随 $L$ 增大而缩小。把 $L$ 加倍，$T = 3.0$ 的值约减半。要从模拟精确确定 $T_c$ 需要若干尺寸并外推；宾德（Binder）累积量方法是标准工具。

能量也可以校核。$T_c$ 处无限格点每自旋的严格能量是 $-\sqrt2 = -1.414$，模拟的 $-1.478$ 与之差约 $4\%$，是有限尺寸误差与统计误差的组合，格子更大、跑得更久就缩小。远低于 $T_c$ 时能量收敛很快：$T = 1.5$ 处几乎每根键都得到满足，$E/N$ 接近基态值 $-2$。
:::
:::

::: application 走出伊辛模型的模拟
按 Metropolis 规则的蒙特卡洛抽样，或者按沃尔夫（Wolff）（1989）一类团簇算法——一次翻转整个关联畴，破解 $T_c$ 附近单次翻转的减速——如今是计算相互作用系统性质的标准手段：液体、聚合物、合金、夸克的格点规范理论，以及分子流体的吸附与相平衡。化学的一面，包括由分子间势计算真实气体与液体，见化学图谱的[相互作用的分子：实际气体与液体](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=real-gases-liquids)。
:::

::: history 从安德鲁斯到威尔逊
托马斯·安德鲁斯（Thomas Andrews）1869 年发现二氧化碳的临界点，约翰内斯·范德瓦尔斯（Johannes van der Waals）在 1873 年的博士论文里给出第一个理论；他的物态方程是平均场理论，带平均场指数。皮埃尔·居里 1895 年测出磁化率的温度依赖，皮埃尔·外斯 1907 年用正比于磁化强度的"分子场"解释了铁磁性。威廉·伦次 1920 年提出格子模型；恩斯特·伊辛在 1924 年的学位论文里解出一维链并于 1925 年发表，却得出该模型在任何维度都没有相变的错误结论。鲁道夫·佩尔斯 1936 年证明它在二维确实有序；克拉默斯与瓦尼埃 1941 年用对偶定出 $T_c$；拉斯·昂萨格（Lars Onsager）1944 年精确解出正方格子，杨振宁 1952 年导出自发磁化强度。列夫·朗道关于连续相变的一般理论始于 1937 年。尼古拉斯·米特罗波利斯（Nicholas Metropolis）、阿里安娜·罗森布鲁斯（Arianna Rosenbluth）与马歇尔·罗森布鲁斯（Marshall Rosenbluth）、奥古斯塔·特勒（Augusta Teller）与爱德华·特勒（Edward Teller）1953 年发表了 Metropolis 算法，出自洛斯阿拉莫斯 MANIAC 计算机上的工作。肯尼斯·威尔逊的重整化群（1971）解释了普适性，为他赢得 1982 年诺贝尔物理学奖。
:::

## 后续内容 {#leads}

伊辛模型是通往集体行为物理的大门。[[condensed-matter/magnetism-superconductivity]] 把平均场的思想用于真实磁体与超导体——后者的序参量是复数，转变属于另一个普适性类。平均场自由能的朗道展开 $f = f_0 + a(T - T_c)m^2 + bm^4$ 是液晶、超流体与早期宇宙理论的出发点。模拟方法在 [[computation/random-sampling]] 与 [[computation/many-particles]] 中继续发展。临界现象与重整化群的理论，自然的下一步是 Sethna 的 *Statistical Mechanics: Entropy, Order Parameters, and Complexity* 与 Kardar 的 *Statistical Physics of Fields*。

::: summary
- 相变是自由能的奇点，只在热力学极限出现；有限系统的 $F$ 解析。
- 序参量在对称相中为零。一级相变有跳变和潜热；连续相变的序参量连续地消失。
- 伊辛模型的能量为 $-J\sum_{\langle ij\rangle}s_is_j - h\sum_is_i$。一维链可精确求解，$Z = 2(2\cosh\beta J)^{N-1}$，关联长度有限，任何 $T > 0$ 都没有有序。
- 由变分原理导出的平均场理论给出 $m = \tanh[\beta(qJm + h)]$ 与 $k_BT_c = qJ$，指数 $\beta = \tfrac12$、$\gamma = 1$、$\delta = 3$，$C$ 有跳变。
- 昂萨格对正方格子的严格解给 $k_BT_c/J = 2/\ln(1 + \sqrt2) = 2.269$、$\beta = \tfrac18$；真实三维系统 $\beta \approx 0.326$。
- 普适性：临界指数只依赖维数与序参量对称性，所以液气临界点与三维伊辛模型共享指数。
- Metropolis 算法靠细致平衡只用能量差就对玻尔兹曼分布抽样；二十行 python 程序在远低于 $T_c$ 处很好地重现杨的磁化强度，并在 $T_c$ 附近显示有限尺寸效应。
:::

## 习题 {#exercises}

::: exercise 平均场的居里温度 {level=1 check="60"}
简单立方格子（$q = 6$）上的伊辛磁体有 $J/k_B = 10.0\,\mathrm{K}$。求它的平均场转变温度，以开尔文计。
::: solution
由 [[#eq-mf-tc]]，$T_c = qJ/k_B = 6\times10.0\,\mathrm{K} = 60\,\mathrm{K}$。立方格子的准确值 $4.5115\,J/k_B = 45.1\,\mathrm{K}$，低了四分之一。
:::
:::

::: exercise 昂萨格的临界温度 {level=1 check="2/ln(1+sqrt(2))"}
证明 $\sinh(2J/k_BT_c) = 1$ 给出 $k_BT_c/J = 2/\ln(1 + \sqrt2)$，并求其值。
::: solution
令 $x = 2J/k_BT_c$。则 $\sinh x = 1$，即 $e^x - e^{-x} = 2$。乘以 $e^x$，$e^{2x} - 2e^x - 1 = 0$，这是关于 $e^x$ 的二次方程，正根 $e^x = 1 + \sqrt2$。故 $x = \ln(1 + \sqrt2) = 0.881374$，

$$
\frac{k_BT_c}{J} = \frac{2}{\ln(1 + \sqrt2)} = 2.269185.
$$
:::
:::

::: exercise 链的关联 {level=1 check="tanh(1)^5"}
$k_BT = J$ 的伊辛链，求相距五个格点的自旋的关联 $\langle s_0s_5\rangle$。
::: solution
由 [[#thm-chain]]，$\langle s_0s_5\rangle = (\tanh\beta J)^5 = (\tanh1)^5 = 0.7616^5 = 0.256$，如 [[#ex-correlation]]。
:::
:::

::: exercise 解平均场方程 {level=2 check="0.5254"}
求 $m = \tanh(m/0.9)$ 的正根，取四位有效数字。这就是 $T = 0.9\,T_c$ 的平均场磁化强度。
::: hint
从 $m_0 = 1$ 出发的定点迭代 $m_{k+1} = \tanh(m_k/0.9)$ 收敛，因为右边在根处的斜率小于 $1$。
:::
::: solution
从 $m_0 = 1$ 迭代：$m_1 = \tanh(1.111) = 0.8045$，$m_2 = \tanh(0.8939) = 0.7133$，$m_3 = 0.6566$，如此缓缓下降。迭代几十次后序列稳定在 $m = 0.5254$。校核：$0.5254/0.9 = 0.5838$，$\tanh0.5838 = 0.5254$。$\tanh(m/0.9)$ 在根处的斜率为 $(1 - 0.5254^2)/0.9 = 0.804 < 1$，这就是迭代（缓慢）收敛的原因。在 $[0.1, 1]$ 上对 $g(m) = \tanh(m/0.9) - m$ 二分法给出同一个根。
:::
:::

::: exercise 严格磁化强度 {level=2 check="(1-sinh(1)^(-4))^(1/8)"}
用 [[#eq-yang]] 求正方格子伊辛模型在 $k_BT = 2J$ 的自发磁化强度。
::: solution
$\beta J = \tfrac12$ 时 $2\beta J = 1$、$\sinh1 = 1.17520$。于是 $\sinh^{-4}(1) = 1/1.90750 = 0.52425$，且

$$
m = (1 - \sinh^{-4}1)^{1/8} = (0.47575)^{1/8} = 0.9113.
$$

正文中的模拟在此温度给出 $0.913$。$T = 2J/k_B = T_c^{\mathrm{MF}}/2$ 处的平均场理论给出 $0.958$。
:::
:::

::: exercise 热容跳变 {level=2 check="1.5"}
零场平均场理论中，证明紧挨 $T_c$ 下方的每个自旋热容趋于 $\tfrac32k_B$，而其正上方为零。以 $k_B$ 为单位给出跳变。
::: solution
平均场的每自旋能量为 $\langle E\rangle/N = -\tfrac12qJm^2$。$T_c$ 以上 $m = 0$，能量恒定，故 $C = 0$。紧挨 $T_c$ 下方，展开式 [[#eq-mf-m]] 给 $m^2 = 3\tau^2(1 - \tau)$、$\tau = T/T_c$，于是

$$
\frac{\langle E\rangle}{N} = -\frac32qJ\tau^2(1 - \tau), \qquad \frac{C}{N} = \deriv{}{T}\frac{\langle E\rangle}{N} = -\frac{3qJ}{2T_c}(2\tau - 3\tau^2).
$$

$\tau \to 1^-$ 时 $2\tau - 3\tau^2 \to -1$，故 $C/N \to 3qJ/(2T_c) = \tfrac32k_B$，用到 $qJ = k_BT_c$。每个自旋的跳变为 $1.5\,k_B$。二维严格解取而代之的是对数发散：平均场漏掉了 $T_c$ 附近巨大的能量涨落——[[statistical-mechanics/canonical]] 把它同 $C$ 联系起来的那部分涨落。
:::
:::

::: exercise 磁场中的链 {level=3}
$N$ 个伊辛自旋的环（$s_{N+1} = s_1$），耦合 $J$、场 $h$，证明 $Z = \tr T^N$，其中**转移矩阵**为

$$
T = \begin{pmatrix}e^{\beta(J + h)} & e^{-\beta J}\\ e^{-\beta J} & e^{\beta(J - h)}\end{pmatrix}.
$$

求它的本征值、$N \to \infty$ 极限下每自旋的自由能，以及磁化强度 $m(h)$。证明一切 $T > 0$ 都有 $h \to 0$ 时 $m(h) \to 0$。
::: hint
写成 $e^{-\beta E} = \prod_iT_{s_is_{i+1}}$，其中 $T_{ss'} = \exp[\beta(Jss' + \tfrac12h(s + s'))]$，并用 $\tr T^N = \lambda_+^N + \lambda_-^N$。
:::
::: solution
把每个场项平摊到与该自旋相连的两根键上：$-\beta E = \sum_i\beta[Js_is_{i+1} + \tfrac12h(s_i + s_{i+1})]$，用到环的条件。于是 $e^{-\beta E} = \prod_iT_{s_is_{i+1}}$，$T_{ss'}$ 如提示所给，$s, s' = \pm1$ 的四个元素恰是题给的矩阵。对一切自旋求和就是绕环一圈的矩阵相乘，所以 $Z = \sum_{s_1}(T^N)_{s_1s_1} = \tr T^N$。

矩阵是实对称的，本征值满足 $\lambda^2 - 2e^{\beta J}\cosh(\beta h)\lambda + (e^{2\beta J} - e^{-2\beta J}) = 0$：

$$
\lambda_\pm = e^{\beta J}\cosh\beta h \pm\sqrt{e^{2\beta J}\sinh^2\beta h + e^{-2\beta J}}.
$$

于是 $Z = \lambda_+^N + \lambda_-^N$。由于 $\lambda_+ > \lvert\lambda_-\rvert$（根号为正），$\ln Z = N\ln\lambda_+ + \ln[1 + (\lambda_-/\lambda_+)^N]$，每自旋自由能趋于 $f = -k_BT\ln\lambda_+$。

磁化强度为 $m = -\partial f/\partial h = k_BT\,\partial\ln\lambda_+/\partial h$。把 $\lambda_+$ 写成 $e^{\beta J}(\cosh\beta h + R)$，其中 $R = \sqrt{\sinh^2\beta h + e^{-4\beta J}}$，即从根号里提出 $e^{\beta J}$ 的同一表达式。由 $\partial R/\partial h = \beta\sinh\beta h\cosh\beta h/R$，

$$
\pdv{\ln\lambda_+}{h} = \frac{\beta\sinh\beta h + \beta\sinh\beta h\cosh\beta h/R}{\cosh\beta h + R} = \frac{\beta\sinh\beta h\,(R + \cosh\beta h)}{R\,(\cosh\beta h + R)} = \frac{\beta\sinh\beta h}{R},
$$

因此

$$
m(h) = \frac{\sinh\beta h}{\sqrt{\sinh^2\beta h + e^{-4\beta J}}}.
$$

$T > 0$ 时 $e^{-4\beta J} > 0$，所以分母以 $e^{-2\beta J} > 0$ 为下界，$m(h)$ 是 $h$ 的光滑（解析）函数且 $m(0) = 0$。故 $h \to 0$ 时 $m \to 0$：任何正温度都没有自发磁化。只在 $T = 0$——那里 $e^{-4\beta J} = 0$——$m$ 才在 $h = 0$ 处从 $-1$ 跳到 $+1$。零场磁化率 $\chi = \partial m/\partial h|_0 = \beta e^{2\beta J}$ 在 $T > 0$ 有限，只在 $T \to 0$ 时发散。
:::
:::

::: exercise 转变以下的磁化率 {level=3}
平均场理论中，证明紧挨 $T_c$ 下方的零场磁化率为 $\chi = 1/[2k_B(T_c - T)]$，是 $T_c$ 上方同样距离处的一半。由此两侧指数同为 $\gamma = 1$，振幅比 $2$。
::: hint
对 [[#eq-self-consistent]] 关于 $h$ 在 $h = 0$ 求导，用 $\dd\tanh y/\dd y = 1 - \tanh^2y = 1 - m^2$，并代入 $m^2 \approx 3(1 - T/T_c)$。
:::
::: solution
对 $m = \tanh[\beta(qJm + h)]$ 关于 $h$ 求导：

$$
\chi = (1 - m^2)\,\beta\,(qJ\chi + 1) \quad\Rightarrow\quad \chi = \frac{\beta(1 - m^2)}{1 - \beta qJ(1 - m^2)}.
$$

$T_c$ 以上 $m = 0$，上式即 $\beta/(1 - T_c/T) = 1/[k_B(T - T_c)]$，居里–外斯定律。$T_c$ 以下记 $\tau = T/T_c$，由 [[#eq-mf-m]] 有 $m^2 = 3(1 - \tau) + O((1 - \tau)^2)$。于是 $\beta qJ = 1/\tau$，且

$$
1 - \frac{1 - m^2}{\tau} = \frac{\tau - 1 + m^2}{\tau} = \frac{-(1 - \tau) + 3(1 - \tau)}{\tau} + O((1 - \tau)^2) = \frac{2(1 - \tau)}{\tau} + O((1 - \tau)^2).
$$

分子 $\beta(1 - m^2) \to \beta$。所以 $\chi \approx \beta\tau/[2(1 - \tau)] = 1/[2k_BT_c(1 - \tau)] = 1/[2k_B(T_c - T)]$。两侧都有 $\chi \propto \lvert T - T_c\rvert^{-1}$，故 $\gamma = 1$，振幅比为 $1 : \tfrac12$。二维严格模型两侧也有同样的 $\gamma = \tfrac74$，但振幅比约为 $37.7$，不是 $2$。
:::
:::
