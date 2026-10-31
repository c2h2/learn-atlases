化学家最希望从模拟中得到的量是自由能：反应的平衡常数、药物的结合亲和力、化合物的溶解度、构象体的布居、溶液中势垒的高度。自由能不是任何可以按构型逐个计算的平均；它是整个玻尔兹曼分布的性质，$A = -k_\mathrm{B}T\ln Q$（[[statistical-thermodynamics/canonical-ensemble]]），而配分函数$Q$是在整个构型空间上的积分——$N$个原子就是$3N$维。本课建立使这些量变得可算的两个思想。其一，**蒙特卡洛**（Monte Carlo）方法按玻尔兹曼分布产生构型而从不计算$Q$，从而可以用简单的平均估计系综平均值。其二，**自由能方法**——微扰、热力学积分及其近亲——通过一条每一步都能被良好采样的路径把两个态连接起来，计算自由能*差*，而自由能差毕竟也是平均。课程最后讲述克服[[computational-chemistry/molecular-dynamics]]中时间尺度问题的增强采样方法。

## 为什么简单采样会失败

正则系综中性质$A$的构型平均为
$$
\langle A\rangle = \frac{\int A(\mathbf{r}^{N})\,e^{-\beta U(\mathbf{r}^{N})}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U(\mathbf{r}^{N})}\,\mathrm{d}\mathbf{r}^{N}}, \qquad \beta = \frac{1}{k_\mathrm{B}T}.
$$ {#eq-canonical-average}
网格上的数值求积毫无希望：$100$个原子的每个坐标取十个点就是$10^{300}$次求值。蒙特卡洛积分——在随机点求被积函数并取平均——的误差按$n^{-1/2}$下降，*无论积分维数多大*，这在原则上使高维积分变得可处理。

::: widget montecarlo
mode: integral
f: exp(-x^2)
a: 0
b: 3
n: 1000
caption: 由均匀分布的随机点对$\int_0^{3}e^{-x^{2}}\,\mathrm{d}x = 0.8862$（本质上是$\sqrt\pi/2$）作的蒙特卡洛估计。误差按$1/\sqrt n$缩小——$n$变为四倍则误差减半——而且这个速率与积分的维数无关。但大多数均匀选取的点落在被积函数极小的地方；在玻尔兹曼因子几乎处处可以忽略的$3N$维中，均匀采样几乎永远不会命中重要区域。
:::

稠密液体的均匀采样之所以失败，是因为几乎每个随机构型都含有相互重叠的原子，使得$e^{-\beta U} \approx 0$。起作用的构型空间部分小得难以置信。需要的是**重要性采样**：从一开始就按与$e^{-\beta U}$成正比的概率产生构型，使[[#eq-canonical-average]]成为对样本的简单平均。

## 梅特罗波利斯算法

梅特罗波利斯（Metropolis）、罗森布卢斯（Rosenbluth）夫妇与泰勒（Teller）夫妇1953年证明了如何在不知道归一化常数的情况下做到这一点：在构型空间中构造一个平稳分布为玻尔兹曼分布的随机游走（马尔可夫链）。

::: algorithm 梅特罗波利斯蒙特卡洛 {#alg-metropolis}
1. 从能量为$U_\mathrm{o}$的构型$\mathbf{r}_\mathrm{o}$（"旧"）出发。
2. 由对称的随机移动提出一个试探构型$\mathbf{r}_\mathrm{n}$——例如，把随机选出的一个粒子沿一个在边长$2\delta$的立方体内均匀选取的矢量平移——并计算$\Delta U = U_\mathrm{n} - U_\mathrm{o}$。
3. 以下列概率接受该移动
$$
P_\mathrm{acc} = \min\left(1, e^{-\beta\Delta U}\right):
$$
能量下降时总是接受；能量上升时，抽取一个$[0, 1)$上的均匀随机数$\xi$，若$\xi < e^{-\beta\Delta U}$则接受。
4. 若移动被拒绝，则在平均中*再次*计入旧构型。
5. 重复。经过一段平衡化之后，对构型序列平均任意性质。
:::

::: proposition 细致平衡与梅特罗波利斯判据 {#prop-detailed-balance}
转移概率为$\pi(\mathrm{o}\to\mathrm{n}) = \alpha(\mathrm{o}\to\mathrm{n})P_\mathrm{acc}(\mathrm{o}\to\mathrm{n})$的马尔可夫链，若满足**细致平衡**，
$$
\mathcal N(\mathrm{o})\,\pi(\mathrm{o}\to\mathrm{n}) = \mathcal N(\mathrm{n})\,\pi(\mathrm{n}\to\mathrm{o}),
$$
则分布$\mathcal N(\mathbf{r})$在其下保持不变。对对称的提议分布，$\alpha(\mathrm{o}\to\mathrm{n}) = \alpha(\mathrm{n}\to\mathrm{o})$，梅特罗波利斯接受规则对$\mathcal N \propto e^{-\beta U}$满足细致平衡。若该链还是各态历经的（每个构型都可达），其分布收敛到玻尔兹曼分布。
:::

::: proof
对细致平衡条件关于一切$\mathrm{o}$求和，得$\sum_\mathrm{o}\mathcal N(\mathrm{o})\pi(\mathrm{o}\to\mathrm{n}) = \mathcal N(\mathrm{n})\sum_\mathrm{o}\pi(\mathrm{n}\to\mathrm{o}) = \mathcal N(\mathrm{n})$，因为离开$\mathrm{n}$（包括停留）的概率之和为一：$\mathcal N$是平稳的。对对称的$\alpha$，细致平衡要求$P_\mathrm{acc}(\mathrm{o}\to\mathrm{n})/P_\mathrm{acc}(\mathrm{n}\to\mathrm{o}) = \mathcal N(\mathrm{n})/\mathcal N(\mathrm{o}) = e^{-\beta(U_\mathrm{n} - U_\mathrm{o})}$。设$U_\mathrm{n} > U_\mathrm{o}$：梅特罗波利斯规则给出$P_\mathrm{acc}(\mathrm{o}\to\mathrm{n}) = e^{-\beta\Delta U}$与$P_\mathrm{acc}(\mathrm{n}\to\mathrm{o}) = 1$，其比值恰为所要求的$e^{-\beta\Delta U}$；$U_\mathrm{n} < U_\mathrm{o}$的情形对称。式中只出现玻尔兹曼因子的*比值*，因此从不需要$Q$。
:::

被拒绝的移动要重新计入旧构型，这条规则不是细节：省略它会破坏细致平衡，使每个平均都带偏差。

::: example 梅特罗波利斯接受率 {#ex-metropolis-acc}
在$300\ \mathrm{K}$下，一次试探移动使能量升高$2.0\ \mathrm{kJ\,mol^{-1}}$。接受概率是多少？若抽到的随机数为$\xi = 0.31$，该移动是否被接受？若$\Delta U = 10\ \mathrm{kJ\,mol^{-1}}$又如何？
::: solution
$RT = 8.3145\times10^{-3} \times 300 = 2.494\ \mathrm{kJ\,mol^{-1}}$，故$P_\mathrm{acc} = e^{-2.0/2.494} = e^{-0.802} = 0.449$。由于$\xi = 0.31 < 0.449$，移动被接受。对$\Delta U = 10\ \mathrm{kJ\,mol^{-1}}$，$P_\mathrm{acc} = e^{-4.01} = 0.018$：平均每五十次尝试约有一次被接受——模拟正是以这种方式，恰好按各自的玻尔兹曼权重访问更高能量的构型。
:::
:::

::: example 步长的选取 {#ex-step-size}
一维谐振子，$\beta U = x^{2}/2$（因此$\langle x^{2}\rangle$严格等于$1$），用梅特罗波利斯移动$x \to x + \delta(2\xi - 1)$采样$2\times10^{5}$步。每个步长各运行一次，结果为：

| $\delta$ | 接受率 | $\langle x^{2}\rangle$ |
|---|---|---|
| $0.5$ | $0.90$ | $0.9999$ |
| $2.5$ | $0.56$ | $0.9948$ |
| $10$ | $0.16$ | $0.9937$ |

哪个步长最好？为什么高接受率不是目标？
::: solution
三个估计与$1$的差都在统计误差之内，这是细致平衡对任何$\delta$都保证的；不同的是效率。$\delta = 0.5$时几乎每个移动都被接受，但每个移动只让游走者挪动一点点，相继样本强烈相关，游走探索分布的速度很慢。$\delta = 10$时大多数移动落在$e^{-\beta U}$极小的远处而被拒绝，游走者原地不动。每步的去相关在中等$\delta$（这里约为$2.5$，与分布的宽度相当）时最大，接受率大约在$30$–$60\ \%$。常被引用的"接受率瞄准$50\ \%$"只是经验法则；正确的判据是单位机时的统计误差，用分块平均来估计。
:::
:::

蒙特卡洛相对分子动力学有优点：不需求力，允许非物理的移动（交换粒子身份、在**巨正则**系综中插入与删除粒子、整体旋转侧链、在构象体之间翻转），而且系综严格是正则的。但它不给出动力学；对大的柔性分子，单个原子的移动会破坏成键几何，其效率不如MD。两者用于不同目的，且都产生玻尔兹曼分布的样本，下文自由能方法在其上运作。

## 自由能微扰

考虑同一系统的两个态0和1，势能分别为$U_0$与$U_1$——例如有电荷与无电荷的溶质，或结合位点中的配体A与配体B。亥姆霍兹自由能差为$\Delta A = A_1 - A_0 = -k_\mathrm{B}T\ln(Q_1/Q_0)$，而配分函数之比*可以*写成平均。

::: proposition 兹万齐格（Zwanzig）方程（自由能微扰） {#prop-zwanzig}
$$
\Delta A = A_1 - A_0 = -k_\mathrm{B}T\ln\left\langle e^{-\beta(U_1 - U_0)}\right\rangle_0 ,
$$
其中$\langle\cdots\rangle_0$是对用$U_0$采样的构型作正则平均。该恒等式是严格的；对有限样本，只有当在态0中充分采样了态1中重要的构型时它才收敛。
:::

::: proof
若质量不变，$Q_0$与$Q_1$的动能贡献相同，故只需考虑构型积分。乘以并除以$e^{-\beta U_0}$：
$$
\frac{Q_1}{Q_0} = \frac{\int e^{-\beta U_1}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}} = \frac{\int e^{-\beta(U_1 - U_0)}e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}}{\int e^{-\beta U_0}\,\mathrm{d}\mathbf{r}^{N}} = \left\langle e^{-\beta\Delta U}\right\rangle_0 ,
$$
其中$\Delta U = U_1 - U_0$。取$-k_\mathrm{B}T\ln$即得结果。
:::

指数平均由*低*$\Delta U$的构型主导，而这些构型在态0中可能很稀有。若在态0中采样的$\Delta U$分布是高斯的，均值为$\langle\Delta U\rangle_0$、方差为$\sigma^{2}$，则该平均可精确求出（它是高斯分布的矩母函数），得到**二阶累积量**公式
$$
\Delta A = \langle\Delta U\rangle_0 - \frac{\beta\sigma^{2}}{2} .
$$ {#eq-cumulant}
自由能差比平均能量变化低出一个量，该量随分布的宽度增大。式[[#eq-cumulant]]也显示了危险：主导指数平均的构型位于$\langle\Delta U\rangle_0 - \beta\sigma^{2}$附近，即深入低能尾部$\beta\sigma$个标准差之处。若$\beta\sigma$超过约$2$，这些构型几乎永不被采样，FEP收敛极慢。实用规则是把大微扰拆成小的**窗口**$\lambda = 0, \lambda_1, \lambda_2, \dots, 1$，使每个窗口中$\beta\sigma \lesssim 1$–$2$，再把各窗口的自由能相加。

::: example 高斯微扰 {#ex-fep-gauss}
在$300\ \mathrm{K}$下对态0的模拟中，发现能量差$\Delta U = U_1 - U_0$服从高斯分布，均值$10.0\ \mathrm{kJ\,mol^{-1}}$，标准差$3.0\ \mathrm{kJ\,mol^{-1}}$。估计$\Delta A$，并说明单个窗口是否足够。
::: solution
由$\beta = 1/2.494\ \mathrm{mol\,kJ^{-1}}$，
$$
\Delta A = 10.0 - \frac{(3.0)^{2}}{2 \times 2.494} = 10.0 - 1.80 = 8.2\ \mathrm{kJ\,mol^{-1}}.
$$
这里$\beta\sigma = 1.2$，主导构型位于$\Delta U \approx 10.0 - 3.6 = 6.4\ \mathrm{kJ\,mol^{-1}}$，即均值以下$1.2$个标准差，约有$10\ \%$的时间被采样到：单个窗口可以接受。若$\sigma = 10\ \mathrm{kJ\,mol^{-1}}$，主导区域将深入尾部四个标准差，每$30\,000$个构型才采样到一次，估计将不可靠。
:::
:::

::: widget plot
f: exp(-(x - m)^2/(2*s^2)); exp(-(x - m + s^2/2.494)^2/(2*s^2))
x: -20, 30
y: 0, 1.1
sliders: m=10:-5:20:0.1; s=3:0.5:10:0.1
labels: P_0(\Delta U)\ \text{（采样所得）}; P_0(\Delta U)\,e^{-\beta\Delta U}\ \text{（平均真正需要的）}
caption: 在态0中采样的$\Delta U$分布（单位$\mathrm{kJ\,mol^{-1}}$），以及同一分布乘以$300\ \mathrm{K}$下的$e^{-\beta\Delta U}$后的形状（两者均缩放至单位高度）。对高斯分布，加权分布向左平移$\beta\sigma^{2}$。$\sigma = 3$时两者重叠良好，FEP收敛；增大$\sigma$，加权分布移向模拟几乎从不到访的区域——这就是重叠问题，用中间窗口解决。
:::

由于FEP计算的每个方向只对一个端态采样，同时计算正向（$0 \to 1$）与反向（$1 \to 0$）估计是好做法；二者相差过大（**滞后**）说明重叠不佳。贝内特（Bennett）的**接受比**方法（BAR，1976）及其多态推广（MBAR）以最优方式组合正反向数据，给出最小方差估计；它们就是当今的标准分析方法。

## 热力学积分

另一条路是定义一个在两个态之间插值的混合势$U(\lambda)$，例如线性插值$U(\lambda) = (1 - \lambda)U_0 + \lambda U_1$，再对$\lambda$求自由能的导数。

::: proposition 热力学积分 {#prop-ti}
对光滑依赖耦合参数$\lambda$的势$U(\lambda)$，
$$
\frac{\partial A}{\partial\lambda} = \left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda, \qquad
\Delta A = \int_0^{1}\left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda\mathrm{d}\lambda ,
$$
其中$\langle\cdots\rangle_\lambda$是用势$U(\lambda)$作正则平均。
:::

::: proof
$A(\lambda) = -k_\mathrm{B}T\ln Q(\lambda)$，其中$Q(\lambda) \propto \int e^{-\beta U(\lambda)}\,\mathrm{d}\mathbf{r}^{N}$。在积分号下求导，
$$
\frac{\partial A}{\partial\lambda} = -\frac{k_\mathrm{B}T}{Q}\frac{\partial Q}{\partial\lambda} = -\frac{k_\mathrm{B}T}{Q}\int\left(-\beta\frac{\partial U}{\partial\lambda}\right)e^{-\beta U}\,\mathrm{d}\mathbf{r}^{N}\cdot\frac{Q}{\int e^{-\beta U}\,\mathrm{d}\mathbf{r}^{N}} = \left\langle\frac{\partial U}{\partial\lambda}\right\rangle_\lambda ,
$$
再从$0$积分到$1$即得$\Delta A$。
:::

热力学积分（TI）把FEP的指数平均换成每个$\lambda$处的普通平均，收敛更平稳，代价是对$\lambda$作数值求积。若$U(\lambda)$选取合理，其被积函数通常光滑。当让原子出现或消失（"炼金术"变化）时，伦纳德-琼斯项的线性标度会使被积函数在原子几乎不存在的端点附近发散——别的原子可以与它重叠——须用**软核**势消除奇异性。

::: example 由五个窗口做热力学积分 {#ex-ti}
在五个$\lambda$值下的模拟给出：$\lambda = 0$、$0.25$、$0.5$、$0.75$与$1$处$\langle\partial U/\partial\lambda\rangle_\lambda$依次为$40.0$、$22.5$、$10.1$、$2.8$与$-1.5\ \mathrm{kJ\,mol^{-1}}$。用梯形公式与辛普森公式估计$\Delta A$。
::: solution
步长$0.25$的梯形公式：
$$
\Delta A \approx 0.25\left[\tfrac{1}{2}(40.0) + 22.5 + 10.1 + 2.8 + \tfrac{1}{2}(-1.5)\right] = 0.25 \times 54.65 = 13.7\ \mathrm{kJ\,mol^{-1}}.
$$
辛普森公式：$\Delta A \approx \tfrac{0.25}{3}\left[40.0 + 4(22.5) + 2(10.1) + 4(2.8) - 1.5\right] = \tfrac{0.25}{3} \times 159.9 = 13.3\ \mathrm{kJ\,mol^{-1}}$。两个求积相差$0.3\ \mathrm{kJ\,mol^{-1}}$，因为被积函数强烈弯曲；曲率大的地方需要更多的$\lambda$点（或在$\lambda$上使用高斯求积）。两者之差是求积误差的直接度量，须与各窗口的统计误差合并。
:::
:::

## 炼金术循环与结合自由能

自由能是态函数，因此一个物理过程的自由能可以沿一条非物理的路径计算。这正是使相对结合与溶剂化自由能变得可算的**热力学循环**的基础。要比较两个配体L与L′与蛋白P结合的强弱，原则上可以分别模拟每一次结合事件；实际上是把L"突变"为L′两次——一次结合在蛋白上，一次游离在溶液中：
$$
\begin{array}{ccc}
\mathrm{P} + \mathrm{L} & \xrightarrow{\ \Delta G_\mathrm{bind}(\mathrm{L})\ } & \mathrm{PL} \\
\Big\downarrow\,\Delta G_\mathrm{solv} & & \Big\downarrow\,\Delta G_\mathrm{complex} \\
\mathrm{P} + \mathrm{L}' & \xrightarrow{\ \Delta G_\mathrm{bind}(\mathrm{L}')\ } & \mathrm{PL}'
\end{array}
$$
沿闭合循环自由能变化之和为零，故
$$
\Delta\Delta G_\mathrm{bind} = \Delta G_\mathrm{bind}(\mathrm{L}') - \Delta G_\mathrm{bind}(\mathrm{L}) = \Delta G_\mathrm{complex} - \Delta G_\mathrm{solv} .
$$ {#eq-cycle}
两条竖直边都是炼金术的FEP或TI计算，当L与L′只差几个原子时收敛良好。力场误差与蛋白重排采样不足在两条边之间部分抵消。运行良好的相对结合计算对实验的均方根误差约达$4\ \mathrm{kJ\,mol^{-1}}$，如今在药物发现中常规用于给待合成的化合物排定优先级。

::: example 一个相对结合自由能 {#ex-rbfe}
把配体由L（含一个氢）突变为L′（含一个氯），在结合位点中的自由能代价为$\Delta G_\mathrm{complex} = +5.2\ \mathrm{kJ\,mol^{-1}}$，在水中为$\Delta G_\mathrm{solv} = +8.0\ \mathrm{kJ\,mol^{-1}}$，温度$298\ \mathrm{K}$。哪个配体结合更强？解离常数相差多少倍？
::: solution
由[[#eq-cycle]]，$\Delta\Delta G_\mathrm{bind} = 5.2 - 8.0 = -2.8\ \mathrm{kJ\,mol^{-1}}$：含氯配体结合更强。由于$\Delta G_\mathrm{bind} = RT\ln K_\mathrm{d}$（$K_\mathrm{d}$相对于标准浓度），$K_\mathrm{d}(\mathrm{L})/K_\mathrm{d}(\mathrm{L}') = e^{2.8/2.479} = 3.1$。每条边$\pm 1\ \mathrm{kJ\,mol^{-1}}$的典型统计不确定度使该倍数介于约$1.7$与$5.5$之间：自由能计算能有用地给化合物排序，但不能给出精确的亲和力。
:::
:::

**绝对**结合自由能（把配体从蛋白和水中完全解除耦合）与**溶剂化**自由能（把溶质从溶剂和真空中解除耦合）使用同样的机制，只是微扰更大，需要约束和标准态校正。小分子的水合自由能是力场的标准基准（[[computational-chemistry/molecular-mechanics]]）；优秀的固定电荷力场误差约为$4$–$6\ \mathrm{kJ\,mol^{-1}}$。

## 平均力势与增强采样

我们常想要的自由能不是某个态的自由能，而是*沿一个坐标*$\xi$的自由能——两个离子间的距离、一个扭转角、配体沿解离路径的位置、一个反应坐标。

::: definition 平均力势 {#def-pmf}
沿集体变量$\xi(\mathbf{r}^{N})$的**平均力势**（potential of mean force, PMF）或自由能剖面为
$$
W(\xi) = -k_\mathrm{B}T\ln P(\xi) + \text{常数},
$$
其中$P(\xi)$是$\xi$的平衡概率密度。其负梯度是$\xi$方向上对其他所有自由度取平均后的力。对液体中两个粒子间的距离$r$，$W(r) = -k_\mathrm{B}T\ln g(r)$，其中$g(r)$是径向分布函数。
:::

::: example 由$g(r)$求平均力势 {#ex-pmf}
$298\ \mathrm{K}$水的氧-氧径向分布函数在$0.28\ \mathrm{nm}$附近有第一个极大$g = 3.0$，在$0.33\ \mathrm{nm}$附近有第一个极小$g = 0.8$。计算这两点相对于大间距的PMF，以及离开第一溶剂壳的自由能势垒。
::: solution
$W = -RT\ln g$，其中$RT = 2.479\ \mathrm{kJ\,mol^{-1}}$：极大处$W = -2.479\ln 3.0 = -2.72\ \mathrm{kJ\,mol^{-1}}$；极小处$W = -2.479\ln 0.8 = +0.55\ \mathrm{kJ\,mol^{-1}}$。从$W$的第一壳极小到分界面的势垒为$0.55 + 2.72 = 3.3\ \mathrm{kJ\,mol^{-1}}$，只比$RT$大一点：近邻在皮秒时间尺度上交换。PMF比氢键能（约$20\ \mathrm{kJ\,mol^{-1}}$）浅得多，因为破坏一个氢键能让其他氢键形成，而且熵也被包含在内。
:::
:::

对高势垒，无偏模拟很少造访势垒顶部，$P(\xi)$在那里无法估计。**增强采样**方法加上偏置把体系推过去：

- **伞形采样**（托里与瓦洛，1977）运行一系列模拟，每一个都在$\xi$上依次取的中心点施加谐波约束$w_i(\xi) = \tfrac{1}{2}k(\xi - \xi_i)^{2}$。每个窗口把一个窄区域采样得很好；有偏直方图经**加权直方图分析法**（WHAM）或MBAR去偏并拼接。各窗口必须重叠。
- **元动力学**（莱奥与帕里内洛，2002）沿轨迹在$\xi$空间投放小的排斥高斯函数，逐渐填平自由能阱，直到体系自由扩散；累积的偏置近似于$-W(\xi)$。良好调温元动力学让高斯函数随时间缩小以保证收敛。
- **副本交换**（平行回火）在温度梯上运行若干副本，并用梅特罗波利斯判据周期性地在相邻副本之间交换构型，使被加热越过势垒的构型回到目标温度。它不需要选择集体变量。
- **非平衡功**：贾尔津斯基（Jarzynski）等式（1997），$e^{-\beta\Delta A} = \langle e^{-\beta W}\rangle$，把从态0到态1反复快速、不可逆拉伸所做的功$W$与平衡自由能差联系起来。平均又是指数型的，由稀有的低功轨迹主导。

::: warning 集体变量必须抓住慢运动 {#warn-cv}
伞形采样与元动力学只加速沿所选集体变量的运动。若另一个慢自由度——侧链旋转、进入袋中的水分子、环的皱褶——与过程耦合却未被纳入，模拟可以沿有偏坐标越过而不必让隐藏坐标达到平衡，产生光滑但错误的PMF，正反向运行之间出现滞后。检查收敛的办法是双向运行、把模拟延长到剖面不再改变，并观察正交自由度。分块平均给出小误差棒的自由能剖面，在采样不完全时仍可能是错的；统计误差度量的是精密度，不是准确度。
:::

::: quiz
热力学积分与自由能微扰通过平均计算自由能*差*。为什么单次长模拟不能以简单平均给出*绝对*自由能$A = -k_\mathrm{B}T\ln Q$？
- [ ] 因为$Q$依赖于粒子的质量。
- [x] 因为$Q$是$e^{-\beta U}$在整个构型空间上的积分，而玻尔兹曼采样只访问其值大的区域；那将需要$\langle e^{+\beta U}\rangle$，它由从未被采样的高能构型主导。
- [ ] 因为蒙特卡洛不采样正则系综。
- [ ] 因为绝对自由能在经典力学中没有定义。
::: solution
形式上$1/Q \propto \langle e^{+\beta U}\rangle$，这个平均由能量极高的构型主导——恰是玻尔兹曼采样不去访问的——所以永不收敛。相似态之间的差避免了这一点，因为比值的被积函数由两个态共享的构型主导。
:::
:::

## 后续内容

本课的采样方法把[[computational-chemistry/molecular-mechanics]]的力场与[[computational-chemistry/molecular-dynamics]]的轨迹变成可测的热力学：溶剂化自由能、分配系数、$\mathrm{p}K_\mathrm{a}$位移与结合亲和力。连续介质溶剂化模型（[[computational-chemistry/solvation-qmmm]]）是这里显式计算的溶剂化自由能的廉价近似，而QM/MM自由能模拟把炼金术与伞形采样方法和量子力学能量结合，计算酶中的反应势垒。结合自由能直接连接[[medicinal-chemistry/drug-binding]]。

::: history
梅特罗波利斯（Nicholas Metropolis）、罗森布卢斯夫妇（Arianna and Marshall Rosenbluth）与泰勒夫妇（Augusta and Edward Teller）1953年发表了梅特罗波利斯算法——那是洛斯阿拉莫斯的MANIAC计算机上对硬圆盘的一项研究。柯克伍德1935年建立了热力学积分，兹万齐格1954年建立了微扰公式。贝内特（Charles Bennett）的接受比方法发表于1976年，托里（Glenn Torrie）与瓦洛（John Valleau）1977年引入伞形采样。溶剂化与结合的自由能微扰计算由约根森（William Jorgensen）以及科尔曼（Peter Kollman）与麦卡蒙（Andrew McCammon）在20世纪80年代开创。库马尔（Shankar Kumar）与合作者1992年为自由能剖面提出WHAM，贾尔津斯基（Christopher Jarzynski）1997年证明了他的非平衡等式，杉田（Yuji Sugita）与冈田（Yuko Okamoto）1999年引入副本交换分子动力学，莱奥（Alessandro Laio）与帕里内洛在2002年提出元动力学。肖茨（Michael Shirts）与科德拉（John Chodera）的MBAR（2008）如今是标准估计量。
:::

::: summary
- $3N$维构型积分需要蒙特卡洛；均匀采样会失败，因此用重要性采样产生玻尔兹曼分布的构型。
- 梅特罗波利斯规则$P_\mathrm{acc} = \min(1, e^{-\beta\Delta U})$无需知道$Q$就满足细致平衡；被拒绝的移动重新计入旧态，步长为效率而调，不求接受率最大。
- 自由能微扰：$\Delta A = -k_\mathrm{B}T\ln\langle e^{-\beta\Delta U}\rangle_0$；对高斯$\Delta U$，$\Delta A = \langle\Delta U\rangle - \beta\sigma^{2}/2$；大微扰需要重叠良好的窗口，用BAR/MBAR分析。
- 热力学积分：$\Delta A = \int_0^{1}\langle\partial U/\partial\lambda\rangle_\lambda\,\mathrm{d}\lambda$，让原子出现时使用软核势。
- 热力学循环给出相对结合自由能$\Delta G_\mathrm{complex} - \Delta G_\mathrm{solv}$，典型精度约$4\ \mathrm{kJ\,mol^{-1}}$。
- PMF为$W(\xi) = -k_\mathrm{B}T\ln P(\xi)$；伞形采样、元动力学、副本交换与非平衡功方法能克服势垒，但只限于它们所处理的慢坐标。
:::

## 习题

::: exercise 一个接受概率 {level=1 check="0.449"}
$300\ \mathrm{K}$下一个试探移动使能量升高$2.0\ \mathrm{kJ\,mol^{-1}}$。梅特罗波利斯接受概率是多少？（保留三位有效数字输入。）
::: solution
$e^{-2.0/2.494} = e^{-0.802} = 0.449$（[[#ex-metropolis-acc]]）。
:::
:::

::: exercise 蒙特卡洛误差 {level=1 check="40000"}
由$10\,000$个独立样本得到的蒙特卡洛估计的标准误差为$0.020$。要把误差降到$0.010$需要多少个样本？（输入样本数。）
::: solution
误差按$n^{-1/2}$标度，减半需要四倍样本：$40\,000$。对相关样本（来自马尔可夫链），独立样本的有效数目因统计低效度而更小，需要更多步。
:::
:::

::: exercise 由$\Delta\Delta G$求选择性 {level=1 check="3.09"}
一个相对结合计算在$298.15\ \mathrm{K}$给出$\Delta\Delta G_\mathrm{bind} = -2.8\ \mathrm{kJ\,mol^{-1}}$。第二个配体的解离常数小多少倍？（保留三位有效数字输入倍数。）
::: solution
$e^{2.8/(8.31446\times10^{-3} \times 298.15)} = e^{1.1295} = 3.09$。
:::
:::

::: exercise 二阶累积量估计 {level=2 check="8.20"}
在$300\ \mathrm{K}$的态0中，$\Delta U$服从高斯分布，均值$10.0\ \mathrm{kJ\,mol^{-1}}$，标准差$3.0\ \mathrm{kJ\,mol^{-1}}$。由[[#eq-cumulant]]计算$\Delta A$。（以$\mathrm{kJ\,mol^{-1}}$为单位、保留三位有效数字输入。）
::: solution
$\Delta A = 10.0 - 9.0/(2 \times 2.4943) = 10.0 - 1.804 = 8.20\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 热力学积分 {level=2 check="13.7"}
用[[#ex-ti]]的五窗口数据：$\lambda = 0, 0.25, 0.5, 0.75, 1$处$\langle\partial U/\partial\lambda\rangle = 40.0, 22.5, 10.1, 2.8, -1.5\ \mathrm{kJ\,mol^{-1}}$——用梯形公式计算$\Delta A$。（以$\mathrm{kJ\,mol^{-1}}$为单位、保留三位有效数字输入。）
::: solution
$0.25[20.0 + 22.5 + 10.1 + 2.8 - 0.75] = 0.25 \times 54.65 = 13.7\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 平均力势 {level=2 check="-2.72"}
$298.15\ \mathrm{K}$下径向分布函数的第一个峰高为$g = 3.0$。该处的平均力势是多少（相对于大间距）？（以$\mathrm{kJ\,mol^{-1}}$为单位输入。）
::: solution
$W = -RT\ln g = -2.479 \times \ln 3.0 = -2.479 \times 1.0986 = -2.72\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 推导累积量公式 {level=3 check="-1.80"}
证明：若$\Delta U$在态0中服从均值$\mu$、方差$\sigma^{2}$的高斯分布，则$\langle e^{-\beta\Delta U}\rangle_0 = e^{-\beta\mu + \beta^{2}\sigma^{2}/2}$，并由此导出[[#eq-cumulant]]。对$300\ \mathrm{K}$下$\mu = 10.0$、$\sigma = 3.0\ \mathrm{kJ\,mol^{-1}}$，$\Delta A - \langle\Delta U\rangle_0$是多少？（以$\mathrm{kJ\,mol^{-1}}$为单位输入。）
::: solution
$\langle e^{-\beta x}\rangle = (2\pi\sigma^{2})^{-1/2}\int e^{-\beta x - (x - \mu)^{2}/2\sigma^{2}}\,\mathrm{d}x$。配方，$-\beta x - (x - \mu)^{2}/2\sigma^{2} = -(x - \mu + \beta\sigma^{2})^{2}/2\sigma^{2} - \beta\mu + \beta^{2}\sigma^{2}/2$，高斯积分给出$e^{-\beta\mu + \beta^{2}\sigma^{2}/2}$。于是$\Delta A = -\beta^{-1}(-\beta\mu + \beta^{2}\sigma^{2}/2) = \mu - \beta\sigma^{2}/2$。配方结果还显示被积函数在$x = \mu - \beta\sigma^{2}$处取峰值——这就是重叠问题。数值上$\Delta A - \mu = -\beta\sigma^{2}/2 = -9.0/(2 \times 2.494) = -1.80\ \mathrm{kJ\,mol^{-1}}$。由延森不等式$\langle e^{-\beta\Delta U}\rangle \geq e^{-\beta\langle\Delta U\rangle}$，对任何分布（不仅高斯分布）都有$\Delta A \leq \langle\Delta U\rangle_0$。
:::
:::

::: exercise 由五次拉伸用贾尔津斯基等式 {level=3 check="11.0"}
五次非平衡拉伸模拟在$298.15\ \mathrm{K}$下要求的功为$12.0$、$9.5$、$11.0$、$15.0$与$10.5\ \mathrm{kJ\,mol^{-1}}$。由贾尔津斯基等式估计$\Delta A$，并与平均功比较。为什么样本少时估计有偏？（以$\mathrm{kJ\,mol^{-1}}$为单位、保留三位有效数字输入$\Delta A$。）
::: solution
由$RT = 2.4790\ \mathrm{kJ\,mol^{-1}}$，$e^{-W/RT} = 0.00790, 0.02166, 0.01183, 0.00236, 0.01447$；平均为$0.01164$，$\Delta A = -2.479\ln 0.01165 = 11.0\ \mathrm{kJ\,mol^{-1}}$，低于平均功$11.6\ \mathrm{kJ\,mol^{-1}}$（热力学第二定律要求$\langle W\rangle \geq \Delta A$；差额是耗散掉的功）。指数平均由最低的功主导，样本少时那些本可把平均进一步拉低的极稀有低功轨迹通常缺失，因此有限样本的贾尔津斯基估计向*上*偏。除非耗散相对$k_\mathrm{B}T$很小，否则这种偏差随拉伸次数增多只缓慢缩小。
:::
:::
