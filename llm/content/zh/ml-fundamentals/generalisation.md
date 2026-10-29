模型只有在没见过的数据上也表现好才有用。[[ml-fundamentals/learning-problem]]把这一点说得精确——我们想要**风险**小，可测得到的只有**经验风险**——并且表明两者可以相差很远：查表能完美拟合任何训练集，却什么都预测不了。本章从三个方向谈它们之间的差距，即**泛化间隙**。实践的：怎样用留出数据诚实地估计风险，并借助验证与交叉验证用这些估计在模型之间做选择。统计的：一个拟合出的模型的期望测试误差如何分解成噪声、**偏差**与**方差**，以及灵活模型为何要以一个换另一个。理论的：当假设类足够小——按假设的个数、或按它的**VC维**——能保证间隙很小的经典界，以及这些界为何对今天的大模型几乎无所说——后者在经典图景未曾预料到的情形里泛化得很好（**双下降**与**良性过拟合**）。

本章的实验取[[ml-fundamentals/linear-regression]]的最小二乘拟合，并使用[[math-for-ml/estimation#prop-bias-variance]]中估计量的偏差-方差分解。一切界的基础是样本平均的集中性，它是大数定律的定量版本；背景见数学图谱的[极限定理](/learn/maths/lesson.php?c=probability&l=limit-theorems)一课。

## 训练、验证与测试数据 {#sec-splits}

估计一个模型的风险，唯一通行的办法是在完全没参与造出它的样例上度量它的损失。标准流程把可用数据分成三份。

::: definition 训练集、验证集与测试集 {#def-splits}
- **训练集**用来拟合模型的参数（用 ERM，通常带惩罚）。
- **验证集**（或开发集）用来做训练程序自己做不了的决定——模型类、多项式次数、惩罚强度、学习率、何时停——办法是比较候选者的验证误差。这类决定叫**超参数**。
- **测试集**只在最后用一次，估计最终选定的那一个模型的风险。

三个集合互不相交，且都来自同一分布的样本。典型比例是$60/20/20$或$80/10/10$，视数据多少而定。
:::

为什么要三份而不是两份？因为按验证误差选模型，本身就是一种拟合。若尝试一百组超参数设置并报告最好的验证误差，那个数是一百个含噪估计的最小值，因而向下偏——恰如 ERM 假设的训练误差那样（[[ml-fundamentals/learning-problem#prop-optimism]]）。没有掺入任何选择决定的测试集，能把估计恢复为无偏。它的精确度就是独立损失之平均的精确度：对 0–1 损失与$m$个测试样例，标准误为$\sqrt{R(1 - R)/m}$，所以$1{,}000$个测试样例可把接近$10\%$的错误率测准到约$\pm2$个百分点（95%置信），而比较两个模型需要[[ml-fundamentals/evaluation-metrics]]的配对分析。

::: warning 泄漏与测试集复用
任何关于测试集的信息，只要流入了训练或模型选择，测试估计就此作废。常见渠道：切分之前先用全体数据算出的统计量做特征标准化；切分两侧有重复或近似重复（同一位病人既在训练又在测试，同一个网页被抓取两次）；按测试得分在模型、提示或检查点之间做选择；对语言模型来说，还有基准问题出现在预训练语料里的情形（**数据污染**，[[evaluation/contamination]]）。有时间顺序的数据必须按时间切分而不可随机切分，否则就是拿未来的知识去评测模型对过去的表现。多年研究中反复去“瞄”公开测试集，会让整个研究领域慢慢地对它过拟合。
:::

### 交叉验证 {#sec-cv}

数据少的时候，留出一大块验证集代价高昂，而留得太小又使选择带噪。交叉验证让每个样例都身兼两职。

::: algorithm $k$折交叉验证 {#alg-cv}
输入：$n$个样例的数据集、带超参数$\lambda$的学习程序$A$、候选值$\lambda_1, \dots, \lambda_M$，以及$k\ge2$。

1. 把数据洗牌，分成大小（近乎）相同的$k$折$F_1, \dots, F_k$。
2. 对每个候选$\lambda$与每一折$j$：在除$F_j$外的所有折上以超参数$\lambda$训练$A$，计算它在$F_j$上的平均损失$e_j(\lambda)$。
3. 交叉验证估计为$\operatorname{CV}(\lambda) = \frac1n\sum_j\lvert F_j\rvert\,e_j(\lambda)$，即全部$n$个样例上的平均留出损失。
4. 选$\hat\lambda = \arg\min_\lambda\operatorname{CV}(\lambda)$，再以$\hat\lambda$在全体数据上重新训练。

$k = n$时就是**留一法**交叉验证（LOO）。
:::

每个样例恰被留出一次，所以每个样例都对误差估计有贡献，而每个模型都在数据的$(k - 1)/k$上训练。代价是$kM$次训练外加最后一次。常用$k = 5$或$10$：LOO对以$n - 1$个点训练的模型的风险几乎无偏，但可能昂贵且方差很大；$k$小则训练用的数据明显偏少，于是略微高估误差。交叉验证估计的是*程序*（“以$\lambda$拟合”）的表现，而不是某一个拟合出的模型的表现；如果又拿它去选$\lambda$，最小值$\operatorname{CV}(\hat\lambda)$就又变得乐观了，诚实的估计需要另备一个测试集，或做**嵌套**交叉验证——把整个选择程序在每个外层折的内部再跑一遍。

::: example 手算留一法 {#ex-loo}
对标签$2, 4, 9$与模型“预测训练均值”，计算训练均方误差与留一法估计。
::: solution
训练均值为$5$，训练 MSE 为$\frac13(9 + 1 + 16) = 26/3\approx8.67$。留出$2$，其余均值为$6.5$，误差$4.5^2 = 20.25$；留出$4$，均值$5.5$，误差$2.25$；留出$9$，均值$3$，误差$36$。LOO 估计为$58.5/3 = 19.5$，是训练误差的两倍多。一般地，对这个模型，每个 LOO 残差都是训练残差乘以$n/(n - 1)$，所以 LOO 误差是训练误差的$(n/(n - 1))^2$倍：这里是$2.25$倍，$n$很小时不可忽略，$n$大时便淡出。习题9给出任意最小二乘拟合的类似捷径。
:::
:::

## 欠拟合、过拟合与偏差-方差分解 {#sec-bias-variance}

给一条光滑曲线的$15$个带噪点拟合次数递增的多项式。直线跟不上曲线：它**欠拟合**，训练误差与测试误差都大。$13$次多项式几乎穿过每一个点，噪声也不例外：它**过拟合**，训练误差极小、测试误差很大。两者之间存在一个次数，既抓住曲线又不抓噪声。下面的分解对平方损失把这一点说精确。

固定输入$\mathbf{x}$，设$y = f(\mathbf{x}) + \varepsilon$，$\E\varepsilon = 0$，$\Var\varepsilon = \sigma^2$，噪声与训练数据独立。设$\hat f_S$为在随机训练集$S$上拟合的模型，并记$\bar f(\mathbf{x}) = \E_S[\hat f_S(\mathbf{x})]$为对训练集平均后的预测。

::: theorem 偏差-方差分解 {#thm-bias-variance}
在$\mathbf{x}$处，对训练集、又对新标签的噪声都取平均的期望平方误差为

$$
\E_{S, \varepsilon}\big[(y - \hat f_S(\mathbf{x}))^2\big] = \underbrace{\sigma^2}_{\text{噪声}} + \underbrace{\big(f(\mathbf{x}) - \bar f(\mathbf{x})\big)^2}_{\text{偏差}^2} + \underbrace{\E_S\big[(\hat f_S(\mathbf{x}) - \bar f(\mathbf{x}))^2\big]}_{\text{方差}}.
$$ {#eq-bias-variance}

对$\mathbf{x}$再取平均，期望风险有同样的分解。
:::

::: proof
记$y - \hat f_S = \varepsilon + (f - \bar f) + (\bar f - \hat f_S)$，一切都在固定的$\mathbf{x}$处。平方后得三个平方项与三个交叉项。含$\varepsilon$的交叉项取期望后消失，因为$\varepsilon$均值为零且与$S$独立。剩下的交叉项是$2(f - \bar f)\,\E_S[\bar f - \hat f_S] = 0$，因为$f - \bar f$是常数，而按定义$\E_S\hat f_S = \bar f$。留下的就是三个平方项，其期望分别为$\sigma^2$、$(f - \bar f)^2$与方差。
:::

三项的脾性各异。**噪声**是[[ml-fundamentals/learning-problem#prop-bayes]]的贝叶斯风险：任何模型都去不掉它。**偏差**度量*平均*拟合出的模型离真实有多远——模型类与拟合程序的系统误差，更多的数据治不了它。**方差**度量拟合出的模型换一个训练集变化多大——它对具体抽样的敏感，更多的数据能压低它。灵活的类偏差低、方差高；僵硬的类正好相反。正则化、平均（bagging）、增加数据，都是降方差的办法；更丰富的特征与更大的模型则降偏差。

下面的清单用暴力法估计这三项：$500$个训练集，每个$15$个点，输入取$[-1, 1]$上固定、均匀分布的点，标签为$\sin(\pi x)$加$\sigma = 0.3$的高斯噪声，对每个次数做多项式最小二乘拟合，并在$50$个测试输入上预测。

```python
import math, random

rng = random.Random(3)
f = lambda x: math.sin(math.pi * x)              # [-1, 1] 上的真实回归函数
sigma, n, trials = 0.3, 15, 500

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        p = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[p] = M[p], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def polyfit(xs, ys, deg):
    """Least squares on features 1, x, ..., x^deg via the normal equations."""
    Phi = [[x ** j for j in range(deg + 1)] for x in xs]
    G = [[sum(r[i] * r[j] for r in Phi) for j in range(deg + 1)] for i in range(deg + 1)]
    g = [sum(r[i] * y for r, y in zip(Phi, ys)) for i in range(deg + 1)]
    return solve(G, g)

peval = lambda c, x: sum(cj * x ** j for j, cj in enumerate(c))
xs = [-1 + 2 * i / (n - 1) for i in range(n)]                 # 固定设计，15 个点
grid = [-1 + 2 * (k + 0.5) / 50 for k in range(50)]          # 测试输入

print("deg  train_mse  test_mse  bias^2  variance  sum")
for deg in (0, 1, 3, 5, 7, 9, 11, 13):
    preds = [[] for _ in grid]
    tr = te = 0.0
    for _ in range(trials):
        ys = [f(x) + rng.gauss(0, sigma) for x in xs]
        c = polyfit(xs, ys, deg)
        tr += sum((peval(c, x) - y) ** 2 for x, y in zip(xs, ys)) / n / trials
        for k, x in enumerate(grid):
            preds[k].append(peval(c, x))
            te += (peval(c, x) - f(x) - rng.gauss(0, sigma)) ** 2 / len(grid) / trials
    bias2 = sum((sum(p) / trials - f(x)) ** 2 for p, x in zip(preds, grid)) / len(grid)
    var = sum(sum((v - sum(p) / trials) ** 2 for v in p) / trials for p in preds) / len(grid)
    print(f"{deg:3d}  {tr:9.3f}  {te:8.3f}  {bias2:6.3f}  {var:8.3f}  {bias2 + var + sigma**2:.3f}")
```

```text
deg  train_mse  test_mse  bias^2  variance  sum
  0      0.551     0.595   0.500     0.006  0.596
  1      0.324     0.310   0.207     0.012  0.309
  3      0.070     0.115   0.006     0.020  0.116
  5      0.053     0.121   0.000     0.032  0.122
  7      0.041     0.134   0.000     0.043  0.133
  9      0.031     0.159   0.000     0.067  0.157
 11      0.017     0.248   0.000     0.158  0.248
 13      0.006     3.919   0.002     3.829  3.920
```

最后一列是$\text{bias}^2 + \text{variance} + \sigma^2$（$\sigma^2 = 0.09$），它与模拟出的测试误差吻合，正如[[#thm-bias-variance]]所要求。训练误差随每加一次而下降。测试误差先随偏差下降而下降（次数$0$到$3$：三次多项式已经能把$\sin\pi x$逼近得很好），接着随方差增长而上升——起初很慢，到次数$13$便爆发：$14$个参数去追$15$个带噪的点，拟合出的多项式在点与点之间剧烈摆动。这里最好的次数是$3$。设定正确的模型，其训练误差在噪声水平*之下*，期望为$\sigma^2(n - p)/n$（[[ml-fundamentals/linear-regression]]，习题10）：次数$11$有$p = 12$，训练误差接近$0.09\cdot3/15 = 0.018$。

::: widget regression
points: -1,0.2; -0.7,-0.9; -0.4,-1.1; -0.1,-0.1; 0.2,0.5; 0.5,1.2; 0.8,0.4; 1,-0.3
degree: 3
residuals: true
x: -1.2, 1.2
y: -2.5, 2.5
caption: $\sin(\pi x)$的八个带噪点。挪动次数滑条：直线欠拟合；次数$3$贴合曲线；次数$7$穿过全部八个点（$R^2 = 1$），却在数据之间与数据之外远远荡开。把一个点轻轻拖动一下，看看高次拟合比三次拟合多挪了多少——这种敏感就是[[#thm-bias-variance]]里的方差项。
:::

::: example 近邻平均的偏差与方差 {#ex-knn}
要在$x_0 = 0$处预测，$k$-近邻回归器对离$0$最近的$k$个训练输入的标签取平均。输入为$\pm0.1, \pm0.2, \pm0.3, \pm0.4$，真值为$f(x) = x^2$，噪声$\sigma = 0.1$。对$k = 2, 4, 8$计算$0$处的 bias²、方差与期望平方误差。
::: solution
预测是$k$个标签的平均，故其方差为$\sigma^2/k = 0.01/k$；其均值是$f$在这些近邻上的平均，而$f(0) = 0$。

| $k$ | 近邻 | $f$ 的均值 | bias² | 方差 | 含噪声的总和 |
|---|---|---|---|---|---|
| $2$ | $\pm0.1$ | $0.01$ | $0.0001$ | $0.005$ | $0.0151$ |
| $4$ | $\pm0.1, \pm0.2$ | $0.025$ | $0.000625$ | $0.0025$ | $0.013125$ |
| $8$ | $\pm0.1, \dots, \pm0.4$ | $0.075$ | $0.005625$ | $0.00125$ | $0.016875$ |

平均的近邻越多，方差越小，但平均触及的地方离$x_0$越远，那里$f$变得不同，于是偏差增大；三者之中$k = 4$最好。近邻个数扮演的角色正如上面的多项式次数，只是方向相反：$k$小是灵活的一端。
:::
:::

## 经典泛化界 {#sec-bounds}

验证是事后度量间隙。学习理论则要求事先的保证：给定类的大小与样例数，间隙最大能有多大？基本工具是大数定律的一个尖锐形式。

::: theorem Hoeffding 不等式 {#thm-hoeffding}
设$Z_1, \dots, Z_n$是取值为$[0, 1]$内、均值为$\mu$的独立随机变量，记$\bar Z = \frac1n\sum_iZ_i$。则对一切$\epsilon > 0$，

$$
\Prob\big(\lvert\bar Z - \mu\rvert > \epsilon\big)\le2e^{-2n\epsilon^2}.
$$
:::

（Hoeffding，1963；证明见 Shalev-Shwartz 与 Ben-David，2014，附录 B。）对一个损失取值于$[0, 1]$的固定假设，取$Z_i = \ell(h(\mathbf{x}_i), y_i)$：除了以$2e^{-2n\epsilon^2}$这一随$n$指数衰减的概率，经验风险与风险之差在$\epsilon$之内。但 ERM 用的不是一个固定的假设——它挑看起来最好的那一个，要紧的恰恰是*这一个*的偏离。若假设类有限，联合界可把它们一次性全部处理。

::: theorem 有限类的一致收敛 {#thm-finite}
设$\mathcal{H}$有限，损失取值于$[0, 1]$，$S$为$n$个独立同分布样例。对每个$\delta\in(0, 1)$，以至少$1 - \delta$的概率（对$S$），每个$h\in\mathcal{H}$都满足

$$
\lvert R(h) - \hat R_S(h)\rvert\le\epsilon_n := \sqrt{\frac{\log(2\lvert\mathcal{H}\rvert/\delta)}{2n}}.
$$ {#eq-finite}

于是 ERM 假设以至少$1 - \delta$的概率满足$R(\hat h_S)\le\min_{h\in\mathcal{H}}R(h) + 2\epsilon_n$。
:::

::: proof
对每个固定的$h$，[[#thm-hoeffding]]给出$\Prob(\lvert R(h) - \hat R_S(h)\rvert > \epsilon)\le2e^{-2n\epsilon^2}$。*某个*$h$偏离超过$\epsilon$的概率至多是这些概率之和（联合界，$\Prob(\bigcup_hA_h)\le\sum_h\Prob(A_h)$），即至多$2\lvert\mathcal{H}\rvert e^{-2n\epsilon^2}$。令它等于$\delta$并解出$\epsilon$，即得$\epsilon_n$。在所有偏离都不超过$\epsilon_n$的事件上，设$h^\circ$为$R$在$\mathcal{H}$上的最小者，则

$$
R(\hat h_S)\le\hat R_S(\hat h_S) + \epsilon_n\le\hat R_S(h^\circ) + \epsilon_n\le R(h^\circ) + 2\epsilon_n,
$$

依次用到一致界、ERM 的定义、以及又一次一致界。
:::

[[#eq-finite]]有三点值得留意。间隙按$1/\sqrt n$缩小。类的大小只通过$\log\lvert\mathcal{H}\rvert$进来，所以类可以非常大而仍然可学：假设个数平方，只把对数加倍。而且这个界对*一切*分布都成立——这是它的力量，接下来也会看到，也是它的弱点。把它反过来就得到**样本复杂度**：$n\ge\log(2\lvert\mathcal{H}\rvert/\delta)/(2\epsilon^2)$个样例就足以让所有经验风险以概率$1 - \delta$达到$\epsilon$的精度。这正是 Valiant 的**概率近似正确**（PAC）学习（1984）的场景：一个类是 PAC 可学的，如果对所有$\epsilon$与$\delta$，某个算法都能从关于$1/\epsilon$与$1/\delta$多项式数个样例出发，以至少$1 - \delta$的概率（“概率地”）输出一个与最优假设相差不超过$\epsilon$的假设（“近似正确”）。

::: example 界的具体数值 {#ex-bound-numbers}
(a) 在[[ml-fundamentals/learning-problem]]的门限实验里，$\mathcal{H}$有$101$个门限，$n = 50$。取$\delta = 0.05$时[[#thm-finite]]保证什么？$n = 1000$呢？(b) 一个模型有$d$个实参数，每个存成$32$位。给$\log\lvert\mathcal{H}\rvert$一个上界，并求$d = 10^6$时使$\epsilon_n\le0.05$所需的$n$。
::: solution
(a) $\log(2\cdot101/0.05) = \log4040 = 8.30$，故$\epsilon_{50} = \sqrt{8.30/100} = 0.288$，$\epsilon_{1000} = \sqrt{8.30/2000} = 0.064$。$50$个样例时保证很弱（间隙可达$29$个百分点），$1000$个时才有用。

(b) 不同的参数设置至多$2^{32d}$个，故$\log\lvert\mathcal{H}\rvert\le32d\log2 = 22.2d$。$d = 10^6$时，$\epsilon_n\le0.05$要求$n\ge(2.22\times10^7 + \log40)/(2\cdot0.0025)\approx4.4\times10^9$个样例——远多于拥有一百万参数的模型通常的训练数据量，尽管这类模型常常泛化得很好。这个界成立但太松，因为它除了比特数，把数据与训练算法的一切信息都忽略掉了。
:::
:::

::: widget plot
f: sqrt((L*ln(10) + ln(2/q))/(2*x))
x: 10, 5000
y: 0, 0.6
sliders: L=2:0:9:1; q=0.05:0.01:0.3:0.01
labels: $\epsilon_n$ for $\lvert\mathcal{H}\rvert = 10^L$
caption: [[#thm-finite]]的一致偏差$\epsilon_n$随样本量$n$的图像，类含$10^L$个假设，失败概率$\delta = q$。类的规模每乘$10$，根号下只添$\log10$；要更高的置信度（更小的$\delta$）花得更少。占主导的是$1/\sqrt n$的衰减：间隙减半，数据要添四倍。
:::

### VC维 {#sec-vc}

多数有趣的类是无限的——线性分类器的权重是实数——但在有限样本上，无限的类也只能产生有限多种标注。数这些标注即可取代$\lvert\mathcal{H}\rvert$。

::: definition 打散、生长函数与 VC 维 {#def-vc}
设$\mathcal{H}$是$\mathcal{X}\to\{0, 1\}$的函数类。有限集$C = \{\mathbf{x}_1, \dots, \mathbf{x}_m\}\subseteq\mathcal{X}$被称为被$\mathcal{H}$**打散**，如果$C$的$2^m$种标注中的每一种都由某个$h\in\mathcal{H}$实现。**生长函数**$\Pi_{\mathcal{H}}(m)$是$\mathcal{H}$在任意$m$个点上能产生的不同标注数的最大值。**Vapnik–Chervonenkis（VC）维**$\operatorname{VC}(\mathcal{H})$是被打散集合的最大大小（若能打散任意大的集合则取无穷）。
:::

例。直线上的门限$[x > t]$能打散任何单点集，却打散不了任何两点集（“左点标$1$、右点标$0$”无法实现），所以其 VC 维是$1$。区间$[a\le x\le b]$能打散两点集、打散不了三点集（标注$1, 0, 1$无法实现）：VC 维$2$。$\R^d$中的线性分类器$[\mathbf{w}^\top\mathbf{x} + b > 0]$的 VC 维是$d + 1$（习题8处理$d = 2$的情形）。一个类可以参数很少而 VC 维无穷——$\{[\sin(\theta x) > 0]\colon\theta\in\R\}$只有一个参数，却能打散任意大的集合——所以 VC 维度量的是表达能力，不是参数个数。

关键的组合事实（**Sauer–Shelah 引理**；Vapnik 与 Chervonenkis，1971；Sauer，1972；Shelah，1972）是：若$\operatorname{VC}(\mathcal{H}) = d < \infty$，则当$m\ge d$时$\Pi_{\mathcal{H}}(m)\le\sum_{i=0}^d\binom mi\le(em/d)^d$：标注数只随$m$多项式增长，而不是像$2^m$那样。把[[#thm-finite]]那样的论证中的$\lvert\mathcal{H}\rvert$换成这个多项式（用“幽灵样本”对称化使之严格），便得到 VC 理论的核心结果。此处陈述而不证。

::: theorem VC 泛化界 {#thm-vc}
设$\mathcal{H}$是二元分类器类，$\operatorname{VC}(\mathcal{H}) = d < \infty$，使用 0–1 损失。则对$n > d$与$\delta\in(0, 1)$，以至少$1 - \delta$的概率（对大小为$n$的独立同分布样本），每个$h\in\mathcal{H}$都满足

$$
R(h)\le\hat R_S(h) + \sqrt{\frac{d\big(\log(2n/d) + 1\big) + \log(4/\delta)}{n}}.
$$ {#eq-vc}

此外（“统计学习基本定理”），$\mathcal{H}$是 PAC 可学的当且仅当其 VC 维有限；而且在分布上取最坏情形、相差常数因子之下，以概率$1 - \delta$逼近$\mathcal{H}$内最优风险到$\epsilon$所需的样例数为$(d + \log(1/\delta))/\epsilon^2$的量级。
:::

形式[[#eq-vc]]出自 Vapnik（1995），转引自 Burges（1998）；不同教材的常数略有出入；Shalev-Shwartz 与 Ben-David（2014，定理 6.8）证明了上下界匹配的基本定理。教训与有限类相同，只是$d\log n$取代$\log\lvert\mathcal{H}\rvert$：一旦$n$远大于 VC 维，间隙就小。

::: example 线性分类器的一个 VC 界 {#ex-vc}
一个$10$特征上的线性分类器在$n = 10{,}000$个样例上训练，训练误差为$0.08$。取$\delta = 0.05$时[[#eq-vc]]保证什么？
::: solution
$d = 11$。于是$d(\log(2n/d) + 1) = 11(\log1818.2 + 1) = 11\cdot8.506 = 93.6$，且$\log(4/0.05) = \log80 = 4.38$，故根号为$\sqrt{98.0/10{,}000} = 0.099$。以$95\%$的概率，风险不超过$0.08 + 0.099 = 0.179$。这没错，但$1{,}000$个样例的留出集能把风险钉到约$\pm0.017$：最坏情形的界远比测量宽松。
:::
:::

::: quiz
某分类器类的 VC 维为$3$。哪条陈述随之成立？
- [ ] 任何三点集都被该类打散
- [x] 存在一个三点集被打散，且没有四点集被打散
- [ ] 该类恰好有三个参数
- [ ] 在任何三个点的样本上，无论标签如何，ERM 假设的训练误差都为零
::: solution
由[[#def-vc]]，VC 维$3$意味着*某个*三点集被打散，且*没有*四点集被打散。特定的三点集未必被打散（平面上共线的三个点不被直线打散，而直线的 VC 维是$3$）。VC 维不是参数计数。最后一个选项要求*每个*三点集都被打散。
:::
:::

## 经典图景之外 {#sec-modern}

经典图景预测测试误差曲线呈 U 形：容量增长过模型拟合训练数据之点，方差应占上风、测试误差应增大。现代神经网络与这幅图景相左：它们的参数量远多于样例数，却常常被训练到训练误差近乎为零，而且泛化得很好。Zhang 等人（2017）把矛盾摆得尖锐：标准图像分类网络即使换上*随机标签*也能拟合 CIFAR-10 训练集，所以其有效容量大到使[[#thm-vc]]这类基于容量的界形同虚设——而用真标签时，同样的网络照样泛化。这是关于训练出来的网络的经验观察，截至2026年还没有关于它的完整理论；不过有两个现象和一个机制已有充分记录。

**双下降。** Belkin、Hsu、Ma 与 Mandal（2019）报告：把模型容量推*过*插值阈值——模型恰能精确拟合训练数据之点——测试误差在阈值处达到峰值之后可能**再次下降**，有时甚至低于经典区间的最佳值。他们在随机特征模型、决策树集成与神经网络中观察到这一现象；Nakkiran 等人（2020）把它作为宽度、训练时间与样本量的函数记录于深度网络；更早，在学习的统计物理中（例如 Krogh 与 Hertz，1992）以及 Advani 与 Saxe（2017）都见过类似的峰，Loog 等人（2020）梳理了这段前史。曲线的形状取决于噪声水平、正则化（调得好的惩罚常常能把峰抹掉）与具体场景；它是对观察到的曲线的描述，不是定律。

这个现象在线性回归里以最纯粹的形式出现，那里插值解有精确定义。$p > n$时，正规方程有无穷多个精确拟合数据的解。梯度下降会挑出其中特定的一个。

::: proposition 梯度下降找到极小范数插值 {#prop-min-norm}
设$X\in\R^{n\times p}$的秩为$n < p$。从$\mathbf{w}_0 = \mathbf{0}$出发、步长小到足以收敛的梯度下降，在最小二乘损失上收敛到**极小范数插值**$\mathbf{w}^\dagger = X^\top(XX^\top)^{-1}\mathbf{y}$，即$X\mathbf{w} = \mathbf{y}$的诸解中$\lVert\mathbf{w}\rVert$最小的那个。
:::

::: proof
每个梯度$\frac2nX^\top(X\mathbf{w}_t - \mathbf{y})$都是$X$的各行的组合，所以每次迭代都落在行空间$\mathcal{R} = \{X^\top\mathbf{a}\colon\mathbf{a}\in\R^n\}$里。在$\mathcal{R}$上黑塞矩阵正定（若$X^\top\mathbf{a}\ne\mathbf{0}$则$XX^\top\mathbf{a}\ne\mathbf{0}$，因为$\mathbf{a}^\top XX^\top\mathbf{a} = \lVert X^\top\mathbf{a}\rVert^2$），于是把[[ml-fundamentals/linear-regression#prop-gd]]的论证限制在$\mathcal{R}$上，即证得收敛到$\mathcal{R}$中唯一的极小点。$X$的秩为$n$，故最小损失为$0$，且恰由$X\mathbf{w} = \mathbf{y}$的解达到；$\mathbf{w}^\dagger$是其中落在$\mathcal{R}$里的解，所以就是极限。任何别的解形如$\mathbf{w}^\dagger + \mathbf{v}$，$X\mathbf{v} = \mathbf{0}$；这样的$\mathbf{v}$与每一行正交，从而与$\mathbf{w}^\dagger\in\mathcal{R}$正交，且$\lVert\mathbf{w}^\dagger + \mathbf{v}\rVert^2 = \lVert\mathbf{w}^\dagger\rVert^2 + \lVert\mathbf{v}\rVert^2\ge\lVert\mathbf{w}^\dagger\rVert^2$。
:::

这是一种**隐式偏差**：损失里并没有偏爱小权重的东西，算法里有。在一切插值解中，范数更小通常意味着函数更光滑、不那么狂野；而$p$超过$n$之后，有更多方向可以把拟合摊开，于是极小范数——以及方差——下降。下面的清单展示这个效应。数据有$D = 100$个高斯特征，每个都对标签有一点贡献（$\boldsymbol\beta = \mathbf{1}/\sqrt{100}$，噪声$\sigma = 0.5$），样例数$n = 40$。模型只用前$p$个特征，$p\le n$时以最小二乘拟合，$p > n$时取极小范数插值；对高斯输入，其期望测试误差恰为$\lVert\mathbf{w} - \boldsymbol\beta\rVert^2 + \sigma^2$，未用的特征按权重为零计。结果对$50$个数据集取平均。

```python
import math, random

rng = random.Random(5)
D, n, sigma, reps = 100, 40, 0.5, 50            # 共有 D 个特征；模型只用前 p 个
beta = [1 / math.sqrt(D)] * D                   # 每个特征都有一点用处；|beta| = 1

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        q = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[q] = M[q], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def min_norm_lstsq(X, y):
    """Least squares; for p > n the interpolating solution of smallest norm, X^T (X X^T)^-1 y."""
    n, p = len(X), len(X[0])
    if p <= n:
        G = [[sum(r[i] * r[j] for r in X) for j in range(p)] for i in range(p)]
        return solve(G, [sum(r[i] * v for r, v in zip(X, y)) for i in range(p)])
    K = [[sum(a * b for a, b in zip(ri, rj)) for rj in X] for ri in X]       # (n, n)
    alpha = solve(K, y)
    return [sum(alpha[i] * X[i][j] for i in range(n)) for j in range(p)]

print("  p   train_mse  test_mse")
for p in (5, 10, 20, 30, 35, 38, 40, 42, 45, 50, 60, 80, 100):
    tr = te = 0.0
    for _ in range(reps):
        X = [[rng.gauss(0, 1) for _ in range(D)] for _ in range(n)]
        y = [sum(a * b for a, b in zip(r, beta)) + rng.gauss(0, sigma) for r in X]
        w = min_norm_lstsq([r[:p] for r in X], y)
        tr += sum((sum(a * b for a, b in zip(r[:p], w)) - v) ** 2 for r, v in zip(X, y)) / n / reps
        # 高斯输入下的精确测试误差：|w - beta|^2 + sigma^2（未用的特征按 w_j = 0 计）
        te += (sum((wj - bj) ** 2 for wj, bj in zip(w + [0.0] * (D - p), beta)) + sigma ** 2) / reps
    print(f"{p:3d}  {tr:9.3f}  {te:8.2f}")
```

```text
  p   train_mse  test_mse
  5      1.025      1.35
 10      0.940      1.58
 20      0.528      2.21
 30      0.242      3.80
 35      0.110      7.03
 38      0.042     17.69
 40      0.000   4788.27
 42      0.000     25.44
 45      0.000     10.27
 50      0.000      3.60
 60      0.000      2.20
 80      0.000      1.28
100      0.000      1.02
```

在这个设定里根本看不到第一降——每个特征携带的信号都太少，往欠参数化的模型里添特征多半只添方差——于是测试误差一路上爬到插值阈值$p = n = 40$；那里$X$是方阵且几乎奇异，拟合把噪声按一个极小奇异值的倒数来放大；$p = 40$处的平均值被少数几次灾难性抽样左右。越过阈值后，训练误差恰为零，测试误差却稳步下落——到$p = 100$时为$1.02$，低于一切欠参数化模型，也低于“预测零”的$1.25$。习题10表明岭惩罚能把峰消去。

**良性过拟合。**第二个现象是：模型可以*精确*拟合带噪的训练标签，预测却仍几乎不比贝叶斯预测器差。对线性回归这已被证明：Bartlett、Long、Lugosi 与 Tsigler（2020）用特征协方差的谱刻画了极小范数插值的风险何时接近噪声水平——粗略地说，除了学到信号的少数重要方向之外，还必须有许多小方差方向，让噪声能在其中被无害地“吸收”。对深度网络，“插值带噪标签而不遭灭顶之灾”仍是经验观察，其部分理论（截至2026年）只在简化设定下成立。

对语言模型，经典的忧虑又换一个形态。一次大规模预训练里，多数词元只被看到一次或几次，所以每个新批次都是新鲜抽样，训练损失本身就是对风险的一个估计；损失、模型规模与数据之间的关系由经验的**缩放定律**（[[scaling/scaling-laws]]）描述，而不是由容量界描述。数据被重复许多遍、或模型在小数据集上微调时，经典意义的过拟合卷土重来——这正是本章与[[ml-fundamentals/regularisation]]的工具直接管用的场合。

::: history
用留出数据度量预测器，在统计学里由来说旧；交叉验证由 Mervyn Stone（1974）与 Seymour Geisser（1975）正式化，Allen 的 PRESS 统计量（1974）就是回归里的留一法。Hoeffding 于1963年发表了他的不等式。Vladimir Vapnik 与 Alexey Chervonenkis 提出了频率对概率的一致收敛以及以他们命名的维数（1968年俄文，1971年英文），其中的计数引理由 Norbert Sauer（1972）与 Saharon Shelah（1972）各自独立发现。Valiant 的 PAC 模型（1984）以及 Blumer、Ehrenfeucht、Haussler 与 Warmuth 的文章（1989）把可学习性与 VC 维联系起来。Stuart Geman、Elie Bienenstock 与 René Doursat（1992）把偏差-方差困境带进神经网络。现代的问题由 Zhang、Bengio、Hardt、Recht 与 Vinyals（2017），Belkin、Hsu、Ma 与 Mandal（2019），Nakkiran 等人（2020），以及 Bartlett、Long、Lugosi 与 Tsigler（2020）逐步鲜明起来。
:::

::: summary
- 在训练集上拟合，在验证集上（或用$k$折交叉验证）选超参数，最后在没动过的测试集上对最终风险估计一次；任何依某数据集而做的选择，都会把该数据集的误差估得偏低。
- 平方损失下，期望测试误差$=$噪声$+$ bias² $+$方差。僵硬的模型偏差高，灵活的模型方差高；最好的容量在两者之间取平衡。
- Hoeffding 不等式加联合界给出：有限类以概率$1 - \delta$对所有$h$同时有$\lvert R - \hat R\rvert\le\sqrt{\log(2\lvert\mathcal{H}\rvert/\delta)/(2n)}$；于是 ERM 与类内最优至多差$2\epsilon_n$。
- 无限的类用 VC 维取代$\log\lvert\mathcal{H}\rvert$：VC 维有限等价于 PAC 可学，样本复杂度为$(d + \log(1/\delta))/\epsilon^2$的量级。
- 过参数化模型不守 U 形曲线：**双下降**与**良性过拟合**在神经网络中有实证记录、在线性设定下有证明，其中梯度下降对极小范数插值的隐式偏差解释了大部分效应。
:::

## 习题

::: exercise 一个一致偏差 {level=1 check="sqrt(ln(2*1000/0.05)/(2*2000))"}
一个含$1000$个分类器的类在$n = 2000$个独立同分布样例上评估。取$\delta = 0.05$，[[#thm-finite]]给出的一致偏差$\epsilon_n$是多少？
::: solution
$\epsilon_n = \sqrt{\log(2\cdot1000/0.05)/(2\cdot2000)} = \sqrt{\log40{,}000/4000} = \sqrt{10.597/4000} = 0.0515$：以至少$0.95$的概率，一千个训练误差中的每一个与其风险之差都不超过约$5$个百分点。
:::
:::

::: exercise 一个样本量 {level=1 check="2120"}
对同样的$1000$个假设与$\delta = 0.05$，[[#thm-finite]]能保证$\epsilon_n\le0.05$的最小$n$是多少？
::: solution
需要$\log(2\lvert\mathcal{H}\rvert/\delta)/(2n)\le\epsilon^2$，即$n\ge\log(40{,}000)/(2\cdot0.0025) = 10.597/0.005 = 2119.4$，故$n = 2120$。
:::
:::

::: exercise 把误差加起来 {level=1 check="0.08"}
在某输入处，一个回归方法对训练集的预测偏差为$0.1$、方差为$0.02$，标签噪声的方差为$0.05$。它在该处的期望平方误差是多少？
::: solution
由[[#thm-bias-variance]]，$0.05 + 0.1^2 + 0.02 = 0.08$。
:::
:::

::: exercise 交叉验证的代价 {level=1 check="21"}
用五折交叉验证在惩罚$\lambda$的四个取值中选一个，最后在全体数据上再拟合一次。一共训练了多少个模型？
::: solution
$5$折乘$4$个取值得$20$次拟合，加上最后$1$次：$21$。
:::
:::

::: exercise 多重比较 {level=2 check="1-0.95^20"}
$20$个模型变体都不比基线好，却各自在$5\%$水平上用独立检验与基线比较。至少有一个变体显得显著更好或更坏的概率是多少？
::: solution
每次比较都以概率$0.05$误报，所以一次都不误报的概率是$0.95^{20}$，至少误报一次的概率是$1 - 0.95^{20}\approx0.642$。在同一份数据上从众多变体里挑最好看的，正是同一种效应，也是要保留一个最终、没动过的测试集的理由。
:::
:::

::: exercise 区间的 VC 维 {level=2 check="2"}
设$\mathcal{H}$由实轴上区间（含空区间）的示性函数$[a\le x\le b]$组成。证明$\operatorname{VC}(\mathcal{H}) = 2$。
::: solution
两点$x_1 < x_2$可被打散：空区间给出$(0, 0)$，围绕其中一点的小区间给出$(1, 0)$或$(0, 1)$，$[x_1, x_2]$给出$(1, 1)$。没有三点$x_1 < x_2 < x_3$可被打散：包含$x_1$与$x_3$的区间必包含$x_2$，所以标注$(1, 0, 1)$无法实现。故 VC 维为$2$。
:::
:::

::: exercise 一维岭回归：最好的惩罚 {level=2 check="4"}
设$y_i = \beta x_i + \varepsilon_i$，输入固定，$S = \sum_ix_i^2$，噪声独立同分布、方差$\sigma^2$。岭估计（无截距）为$\hat w_\lambda = \sum_ix_iy_i/(S + \lambda)$。计算它的偏差与方差，并证明均方误差$\E(\hat w_\lambda - \beta)^2$在$\lambda^* = \sigma^2/\beta^2$处最小。对$\sigma = 1$、$\beta = 0.5$求$\lambda^*$。
::: solution
$\hat w_\lambda = (S\beta + \sum_ix_i\varepsilon_i)/(S + \lambda)$，故偏差为$S\beta/(S + \lambda) - \beta = -\lambda\beta/(S + \lambda)$，方差为$\sigma^2S/(S + \lambda)^2$。MSE 为$M(\lambda) = (\lambda^2\beta^2 + \sigma^2S)/(S + \lambda)^2$。求导，$M'(\lambda)$的分子为$2\lambda\beta^2(S + \lambda) - 2(\lambda^2\beta^2 + \sigma^2S) = 2S(\lambda\beta^2 - \sigma^2)$，在$\lambda < \sigma^2/\beta^2$时为负、此后为正，故$\lambda^* = \sigma^2/\beta^2 = 1/0.25 = 4$。这正是[[ml-fundamentals/linear-regression#prop-ridge-map]]的先验方差$\tau^2 = \beta^2$时的 MAP 惩罚：最好的惩罚让先验与系数的实际大小相匹配。任何$\lambda\in(0, 2\lambda^*)$都胜过硬最小二乘（$\lambda = 0$）。
:::
:::

::: exercise 平面内的直线 {level=2 check="3"}
证明$\R^2$中的线性分类器$[w_1x_1 + w_2x_2 + b > 0]$能打散某个三点集，且打散不了任何四点集。它们的 VC 维是多少？
::: solution
取不共线的三点，即三角形的三个顶点。全部标$0$或全部标$1$，用一条远处的直线即可；只把一个顶点与另外两个标得不同，用一条把该角切下来的直线即可；两个$1$一个$0$的标注是这些标注的补，把$(\mathbf{w}, b)$变号便得。于是$8$种标注全部实现。四点：若有一点落在其余三点三角形的内部（或边上），把内点标$1$、三个顶点标$0$。标$0$的区域是一个半平面，是凸集；它包含三个顶点，因而包含整个三角形，也就包含内点——矛盾。若三点共线，把中间那点标得与两邻点不同；对连接它们的线段，同样的凸性论证成立。否则四点是一个凸四边形的四个顶点；把一条对角线的两端标$1$、另两点标$0$。标$1$的半平面包含第一条对角线，标$0$的半平面包含第二条，可两条对角线相交，于是两个不相交的半平面竟要共享一点——仍不可能。VC 维为$3 = d + 1$。
:::
:::

::: exercise 不重拟合的留一法 {level=3}
对设计矩阵$X$满秩的最小二乘与帽子矩阵$P$（[[ml-fundamentals/linear-regression#prop-projection]]），设$r_i$是样例$i$的训练残差，$h_{ii} = P_{ii}$是它的**杠杆值**。证明样例$i$在“去掉它重拟合”的模型下的残差为$r_i/(1 - h_{ii})$，从而 LOO 误差为$\frac1n\sum_i\big(r_i/(1 - h_{ii})\big)^2$。用[[#ex-loo]]核对。
::: solution
记$A = X^\top X$，$\mathbf{x} = \mathbf{x}_i$，$\boldsymbol\beta_{-i}$为去掉样例$i$的拟合：$(A - \mathbf{x}\mathbf{x}^\top)\boldsymbol\beta_{-i} = X^\top\mathbf{y} - y_i\mathbf{x}$。由 Sherman–Morrison 公式，$(A - \mathbf{x}\mathbf{x}^\top)^{-1} = A^{-1} + A^{-1}\mathbf{x}\mathbf{x}^\top A^{-1}/(1 - h)$，其中$h = \mathbf{x}^\top A^{-1}\mathbf{x} = h_{ii}$。于是$\mathbf{x}^\top(A - \mathbf{x}\mathbf{x}^\top)^{-1} = \mathbf{x}^\top A^{-1}\big(1 + h/(1 - h)\big) = \mathbf{x}^\top A^{-1}/(1 - h)$，故

$$
\mathbf{x}^\top\boldsymbol\beta_{-i} = \frac{\mathbf{x}^\top A^{-1}(X^\top\mathbf{y} - y_i\mathbf{x})}{1 - h} = \frac{\hat y_i - hy_i}{1 - h},
$$

且$y_i - \mathbf{x}^\top\boldsymbol\beta_{-i} = \big((1 - h)y_i - \hat y_i + hy_i\big)/(1 - h) = r_i/(1 - h)$。对[[#ex-loo]]的常数模型，$X$是一列全$1$，$P = \frac1n\mathbf{1}\mathbf{1}^\top$，$h_{ii} = 1/n$，于是每个 LOO 残差都是$r_i\cdot n/(n - 1)$：$-3\cdot1.5 = -4.5$、$-1.5$与$6$，与直接计算一致。杠杆值高的点（输入不寻常，$h_{ii}$接近$1$）的 LOO 残差远大于其训练残差。
:::
:::

::: exercise 正则化消峰 {level=3}
修改双下降清单，让`min_norm_lstsq`解惩罚为$\lambda$的岭回归：$p\le n$时在$X^\top X$的对角上加$\lambda$，$p > n$时在$XX^\top$的对角上加$\lambda$。解释后一种形式为何就是岭回归，并描述$\lambda = 5$时的测试误差曲线。
::: solution
$p > n$时用$\mathbf{w} = X^\top(XX^\top + \lambda I_n)^{-1}\mathbf{y}$。由推过恒等式$(X^\top X + \lambda I)^{-1}X^\top = X^\top(XX^\top + \lambda I)^{-1}$——它由$X^\top(XX^\top + \lambda I) = (X^\top X + \lambda I)X^\top$展开即得——它等于岭解$(X^\top X + \lambda I_p)^{-1}X^\top\mathbf{y}$。取$\lambda = 5$、同一随机种子，输出为

```text
  p   train_mse  test_mse
  5      1.028      1.31
 10      0.950      1.43
 20      0.559      1.63
 30      0.313      1.74
 35      0.212      1.73
 38      0.165      1.74
 40      0.138      1.71
 42      0.140      1.78
 45      0.115      1.72
 50      0.071      1.61
 60      0.037      1.45
 80      0.013      1.13
100      0.005      0.99
```

$p = n$处的峰不见了：惩罚把噪声的放大$1/s_{\min}$对每个奇异值$s$都控制在$s/(s^2 + \lambda)\le1/(2\sqrt\lambda)$以内，几乎奇异的$X$不再引爆。模型不再插值（训练误差保持为正），而$p = 100$处的误差与不加惩罚时大致相同。这与 Nakkiran、Venkat、Kakade 与 Ma（2021）的发现吻合：在这类设定中，最优调参的正则化能让测试误差关于模型规模单调。
:::
:::
