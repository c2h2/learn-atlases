网页搜索引擎并不是只靠 BM25 排序的。对每个候选文档，它可以分别计算标题、正文、URL 和锚文本上的 BM25；一个查询似然分数；查询词是否彼此挨得近；文档的 PageRank 与它在站点内的深度；它的新鲜度和最近一次修改的时间；它的语言和阅读难度；一个垃圾分数；用户在相似查询下点过它多少次、停留多久。一百个甚至更多这样的**特征**稀松平常。它们该怎么组合？手工给一百个数定权重、每改一处都拿测试查询去检验，是行不通的——而这恰恰是机器学习擅长的那类问题。**排序学习**（learning to rank）在训练数据上拟合一个打分函数，使排序在 [[information-retrieval/evaluation]] 的度量上得高分。

本章只处理这个问题中排序专有的部分；监督学习的一般机制——损失函数、梯度下降、泛化与过拟合、神经网络与 boosted 树——是 LLM 图谱的主题，见 [ML fundamentals](/learn/llm/lesson.php?c=ml-fundamentals&l=learning-problem) 与 [neural networks](/learn/llm/lesson.php?c=neural-networks&l=backpropagation)，这里直接使用、不加推导。我们先建立问题及其三大类方法：**逐点法**（pointwise，预测每个文档的等级）、**逐对法**（pairwise，预测两个文档中哪个更好，如 RankNet 与 RankSVM）与**逐表法**（listwise，优化整张表的度量，如 LambdaRank 与 LambdaMART——许多生产级排序器背后的方法）。我们导出 RankNet 的梯度，解释 nDCG 为什么不能直接用梯度下降优化、LambdaRank 如何绕过这一点，并在一个合成数据集上运行三种方法。最后一部分讲从**点击**学习：点击很多，却有偏——不管放什么，用户都爱点靠前的。我们给**位置偏置**建模，证明**逆倾向加权**能把它消去，并用模拟演示这一纠正。

## 排序学习问题

::: definition 排序学习 {#def-ltr}
训练数据由查询 $q_1, \dots, q_m$ 组成；对每个查询 $q$，有候选文档 $d_1, \dots, d_{n_q}$，各带**特征向量** $\vec x_{q,i} = \phi(q, d_i) \in \R^p$ 与相关性标签 $y_{q,i}$（等级，或从点击导出的偏好）。**排序函数** $f\colon \R^p \to \R$ 给每个候选一个分数 $s_i = f(\vec x_{q,i})$，文档按分数从大到小排序。目标是从一个模型类——线性函数、boosted 回归树、神经网络——中选出 $f$，使它在*新*查询上产生的排序在 nDCG@$k$ 这类度量上得高分。
:::

有三条性质使它不同于普通的回归或分类。要紧的只是分数在一个查询之内的**次序**，而不是数值。分数只在查询**内部**比较：一篇文档的标签意思是"对这个查询相关"，一个简单查询的等级 $2$ 未必等于一个困难查询的等级 $2$。而真正要紧的度量给排序表的**头部**很大的权重，所以第 $50$ 名的错误几乎免费，第 $1$ 名的错误代价高昂。

特征通常是三类。**查询–文档**特征：每个字段的 BM25 与语言模型分数（[[information-retrieval/probabilistic-retrieval]]）、命中词项的计数、命中的邻近程度、嵌入的余弦相似度（[[information-retrieval/dense-retrieval]]）。**文档**特征，与查询无关：PageRank（[[information-retrieval/web-search]]）、URL 长度、垃圾与质量分数、新鲜度。**查询**特征：长度、类型（导航式或信息式）、频率。查询特征自己变不了查询内的次序，但它们与其他特征相互作用——新闻查询要紧新鲜度，导航式查询要紧 PageRank。特征通常按查询归一化（例如把每个查询的候选缩放到 $[0, 1]$），学出的权重才在不同查询之间含义相同。

学习出的排序器通常是级联的**最后**一级。便宜的初排（带动态剪枝的 BM25，[[information-retrieval/vector-space]]）检回几百或几千个候选；学习模型每个文档可能耗微秒到毫秒，只对这些候选重排。

### 一个合成数据集

为了比较方法，我们生成真相已知的数据。$40$ 个训练查询和 $20$ 个测试查询，每个有 $20$ 个候选、三个标准化特征："BM25" 特征、"PageRank" 特征和一个纯噪声特征。一个隐藏的有用度 $z = 1.0 \cdot \mathrm{bm25} + 0.6 \cdot \mathrm{pr} + \varepsilon$，带标准差 $0.7$ 的高斯噪声 $\varepsilon$，决定等级：在每个查询内，$z$ 高于第 $95$ 百分位的候选得等级 $3$，高于第 $80$ 百分位得 $2$，高于中位数得 $1$，其余 $0$。

```python
import math, random

rng = random.Random(42)
def make_query(n=20):                          # 合成查询：特征与分级标签
    docs = []
    for _ in range(n):
        bm25, pr, junk = rng.gauss(0, 1), rng.gauss(0, 1), rng.gauss(0, 1)
        z = 1.0 * bm25 + 0.6 * pr + rng.gauss(0, 0.7)            # 隐藏的"真实"有用度
        docs.append(([bm25, pr, junk], z))
    zs = sorted(z for _, z in docs)
    cut = [zs[int(n * q)] for q in (0.5, 0.8, 0.95)]             # 按分位数定等级 0..3
    return [(x, sum(z >= c for c in cut)) for x, z in docs]
train = [make_query() for _ in range(40)]
test = [make_query() for _ in range(20)]
```

下面所有模型都是线性的，$f(\vec x) = \vec w \cdot \vec x$，都在测试查询上用平均 nDCG@5 评估（增益 $2^g - 1$、折扣 $\log_2(i + 1)$，同 [[information-retrieval/evaluation#def-ndcg]]）。

## 逐点方法

最简单的做法无视排序结构：把每个（查询，文档）对当作独立的样本，拟合 $f$ 去预测它的等级——用最小二乘回归、用序数回归，或按等级分类。任何回归方法都能用，模型的分数用来给文档排序。

::: example 逐点回归为什么会误导 {#ex-pointwise}
查询 $q_1$（简单）有两个候选，BM25 特征为 $8$ 和 $6$、等级为 $3$ 和 $2$。查询 $q_2$（困难）有两个候选，BM25 特征为 $2$ 和 $1$、等级为 $3$ 和 $0$。过原点拟合一条一特征的最小二乘直线 $\hat y = wx$，讨论之。
::: solution
过原点的最小二乘给出 $w = \sum xy/\sum x^2 = (24 + 12 + 6 + 0)/(64 + 36 + 4 + 1) = 42/105 = 0.4$。预测是 $q_1$ 的 $3.2, 2.4$ 与 $q_2$ 的 $0.8, 0.4$。两个查询都排对了，排序是完美的——可平方误差却主要由 $q_2$ 的最佳文档主导，它的真实等级是 $3$、预测只有 $0.8$。模型把力气花在跨查询匹配绝对等级上，而排序并不需要这个：给一个查询的所有分数加上任何查询内的常数，排序纹丝不动，回归损失却不答应。换到更丰富的模型里，这份用错了地方的力气就要拿要紧处的精度来赔。逐点方法还给每个文档同样的权重，度量却看重头几条。
:::
:::

在合成数据上，用随机梯度下降对特征回归等级，得到

```text
  pointwise regression   w = [ 0.492,  0.355,  0.111]  nDCG@5 = 0.7790
```

比最好的单个特征好（只用 BM25：$0.7436$），但它给噪声特征 $0.11$ 的权重，离真实权重的 $0.8384$ 还差得远。

## 逐对方法

排序讲的是次序，那就直接学次序：对每个查询，等级不同的每对文档给出一个训练样本"$d_i$ 应排在 $d_j$ 之上"，写作 $i \succ j$。

::: definition RankNet 损失 {#def-ranknet}
对分数为 $s_i, s_j$ 的一对 $i \succ j$，**RankNet**（伯吉斯（Burges）等人，2005）把"$i$ 应排在 $j$ 之上"的概率建模为 $P_{ij} = \sigma(s_i - s_j)$，其中 $\sigma(z) = 1/(1 + e^{-z})$ 是逻辑函数，并最小化交叉熵损失
$$
C_{ij} = -\log P_{ij} = \log\bigl(1 + e^{-(s_i - s_j)}\bigr)
$$ {#eq-ranknet}
对一切训练查询的所有这样的对求和。
:::

$s_i \gg s_j$ 时损失很小；一对被错得离谱时，损失随 $s_j - s_i$ 线性增长。它是**排错对数**的一个**代理**（surrogate）——那才是我们想最小化的东西，却不可微。

::: proposition 逻辑损失给逐对误差设界 {#prop-pair-bound}
对每一对，$\mathbf 1[s_i \le s_j] \le C_{ij}/\ln 2$。从而排错的对数（并列算错）至多为 $\frac{1}{\ln 2}\sum_{i \succ j} C_{ij}$。
:::

::: proof
设 $z = s_i - s_j$。若 $z \le 0$，则 $e^{-z} \ge 1$，于是 $C_{ij} = \ln(1 + e^{-z}) \ge \ln 2$，$C_{ij}/\ln 2 \ge 1$。若 $z > 0$，示性函数为 $0$ 而 $C_{ij} > 0$。对所有对求和即得第二条。
:::

排序正确的对的占比，就是二元等级查询下的 **ROC 曲线下面积**，又与预测排序和理想排序之间的肯德尔（Kendall）$\tau$ 密切相关；逐对方法因而是在优化一种秩相关。训练需要梯度。

::: proposition RankNet 的梯度 {#prop-ranknet-grad}
记 $\rho_{ij} = \sigma(s_j - s_i) = 1/(1 + e^{s_i - s_j})$，则
$$
\frac{\partial C_{ij}}{\partial s_i} = -\rho_{ij}, \qquad \frac{\partial C_{ij}}{\partial s_j} = \rho_{ij},
$$
而对带参数 $\vec w$ 的模型，$\nabla_{\vec w} C_{ij} = -\rho_{ij}\bigl(\nabla_{\vec w} s_i - \nabla_{\vec w} s_j\bigr)$；线性模型下 $\nabla_{\vec w} C_{ij} = -\rho_{ij}(\vec x_i - \vec x_j)$。
:::

::: proof
设 $z = s_i - s_j$。则 $\frac{d}{dz}\ln(1 + e^{-z}) = \frac{-e^{-z}}{1 + e^{-z}} = -\frac{1}{e^{z} + 1} = -\sigma(-z)$，而 $\partial z/\partial s_i = 1$、$\partial z/\partial s_j = -1$。链式法则给出参数梯度；$s = \vec w\cdot\vec x$ 时 $\nabla_{\vec w} s = \vec x$。
:::

所以每一对都把该赢的文档往上推、该输的往下压，力气为 $\rho_{ij}$：排错的对上它接近 $1$，已经拉开的对上它接近 $0$。把这些推力按文档加总——文档 $i$ 受到 $\lambda_i = \sum_{j: i \succ j}\rho_{ij} - \sum_{j: j \succ i}\rho_{ji}$——就是每个分数上的"力"；伯吉斯（Burges）注意到这一分解使模型的梯度每个文档只需一次反向传播、而不是每对一次，对神经排序器是大节省。

::: example 一步 RankNet {#ex-ranknet-step}
线性模型 $\vec w = (1, 0)$ 给特征 $\vec x_i = (0.5, 1)$ 与 $\vec x_j = (1, 0)$ 的两个文档打分，其中 $i \succ j$。算出损失、其梯度，以及学习率 $0.5$ 一步梯度下降的效果。
::: solution
$s_i = 0.5$、$s_j = 1$：这一对排错了。$C_{ij} = \ln(1 + e^{-(0.5 - 1)}) = \ln(1 + e^{0.5}) = 0.974$，$\rho_{ij} = 1/(1 + e^{-0.5}) = 0.622$。梯度是 $-\rho_{ij}(\vec x_i - \vec x_j) = -0.622\,(-0.5, 1) = (0.311, -0.622)$，于是 $\vec w \gets \vec w - 0.5\nabla C$ 给出 $\vec w = (0.844, 0.311)$。现在 $s_i = 0.422 + 0.311 = 0.733$、$s_j = 0.844$：仍排错，但更近了（差从 $-0.5$ 变成 $-0.111$），损失降到 $\ln(1 + e^{0.111}) = 0.750$。这一步抬高了第二个特征的权重，对 $i$ 有利。
:::
:::

下面的梯度下降图画的是一个两个权重的线性排序器在三个训练对上的 RankNet 损失（带一个小惩罚 $0.05\norm{\vec w}^2$ 使极小点有限）。

::: widget gradientdescent
f: ln(1 + exp(-(x + 0.5*y))) + ln(1 + exp(-(0.5*x - y))) + ln(1 + exp(-(-0.3*x + y))) + 0.05*(x^2 + y^2)
start: -2.5, -2
rate: 0.8
steps: 40
x: -3, 4
y: -3, 3
caption: 线性排序器 $s = w_1 x_1 + w_2 x_2$ 在三个对上的 RankNet 训练，三对的特征差 $\vec x_i - \vec x_j$ 分别为 $(1, 0.5)$、$(0.5, -1)$、$(-0.3, 1)$；横轴是 $w_1$，纵轴是 $w_2$。损失是凸的，从任何起点梯度下降都到达同一个极小点。第二、三对把 $w_2$ 往相反方向拉——没有任何线性排序器能把三对都以大边距排对——最优解把两边摆平。试试更大的学习率，看振荡。
:::

**RankSVM**（约阿希姆斯（Joachims），2002）是同一思想换成合页损失（hinge loss）$\max(0, 1 - (s_i - s_j))$ 加二次正则，在差向量 $\vec x_i - \vec x_j$ 上作为支持向量机求解。约阿希姆斯用它从点击日志提取的偏好做训练，这在下文讨论。

合成数据上的线性 RankNet：

```text
  RankNet (linear)       w = [ 2.020,  1.458,  0.026]  nDCG@5 = 0.8323
```

权重的尺度对排序无所谓（只有方向要紧），而它们的比值 $1.458/2.020 = 0.72$ 接近真值 $0.6$；噪声特征几乎被忽略。测试 nDCG@5 的 $0.8323$ 离真实权重的 $0.8384$ 很近。

## 逐表方法

逐对损失对所有排错的对一视同仁，nDCG 却不：把排名 $1$ 和 $2$ 的文档对调，nDCG 的变化远大于对调 $41$ 和 $42$；等级 $3$ 和 $0$ 的一对，也比等级 $1$ 和 $0$ 的一对要紧得多。为什么不干脆优化 nDCG 本身？

::: proposition 排序度量几乎处处梯度为零 {#prop-flat}
设 $M(s_1, \dots, s_n)$ 是任何只通过分数诱导的排序依赖分数的度量（nDCG、AP、$P@k$、倒数排名）。则 $M$ 在 $\R^n$ 中任何没有两个分数相等的开区域上是常数。从而它关于分数的梯度在有定义处全为零，而在两个分数并列处不连续。
:::

::: proof
在一切 $s_i$ 互不相同的连通区域内，任何分数不经过相等就无法越过另一个，所以文档的次序——连带 $M$——处处相同。在开集上为常数的函数在那里导数为零。使某个 $s_i = s_j$ 的点集是有限个超平面的并，测度为零；跨过一张超平面就是对调两篇文档，只要被换的两篇等级不同，$M$ 就跳变。
:::

因此直接在 nDCG 上做梯度下降是不可能的。逐表方法要么优化整张表的某个光滑代理——**ListNet**（曹（Cao）等人，2007）把分数变成"哪个文档排第一"的概率分布 $\mathrm{softmax}(s)_i = e^{s_i}/\sum_j e^{s_j}$，最小化它与按等级算出的同一分布的交叉熵——要么像 LambdaRank 那样修改梯度。

::: algorithm LambdaRank {#alg-lambdarank}
对每个训练查询，按当前分数给它的文档排序。对每对 $i \succ j$（按等级），算出 [[#prop-ranknet-grad]] 的 RankNet 权重 $\rho_{ij}$，以及在当前排序中把 $i$ 与 $j$ 的位置对调将引起的 nDCG 变化量 $\abs{\Delta\mathrm{nDCG}_{ij}}$。在梯度步中用
$$
\lambda_{ij} = \rho_{ij}\,\abs{\Delta \mathrm{nDCG}_{ij}}
$$
代替 $\rho_{ij}$：以力气 $\lambda_{ij}$ 抬高 $s_i$、压低 $s_j$。
:::

这些 $\lambda$ 并不是什么显而易见的损失的梯度——人们想要的力气是被*直接定义*出来的——但伯吉斯（Burges）、拉格诺（Ragno）与勒（Le）（2006）经验地表明用它们训练能改进 nDCG，后来的工作（2018 年的 LambdaLoss 框架）把它们解释为某个度量加权损失上界的梯度。**LambdaMART**（伯吉斯（Burges），2010）把这些 $\lambda$ 用作 boosted 回归树（MART）的伪残差；它赢了 2010 年的 Yahoo! 排序学习挑战赛，带 lambda 梯度的 boosted 树此后一直是特征排序的标准做法之一。

::: example Lambda 权重 {#ex-lambda}
某查询四个文档的当前排序在排名 $1$ 到 $4$ 的等级为 $3, 0, 2, 1$。取增益 $2^g - 1$，分别计算对调排名 $2$ 与 $3$、对调排名 $1$ 与 $4$ 的 $\abs{\Delta\mathrm{nDCG}}$。
::: solution
对调排名 $a$、$b$ 上等级为 $g_a$、$g_b$ 的两篇文档，DCG 变化 $(2^{g_a} - 2^{g_b})\bigl(\frac{1}{\log_2(a+1)} - \frac{1}{\log_2(b+1)}\bigr)$，因为只有它们两项改变。等级 $3, 2, 1, 0$ 的理想 DCG@4 是 $7 + 3/\log_2 3 + 1/2 + 0 = 9.3928$。
- 排名 $2$ 与 $3$（等级 $0$ 与 $2$）：$\abs{(1 - 4)(0.6309 - 0.5)} = 0.3928$，故 $\abs{\Delta\mathrm{nDCG}} = 0.3928/9.3928 = 0.0418$。
- 排名 $1$ 与 $4$（等级 $3$ 与 $1$）：$\abs{(8 - 2)(1 - 0.4307)} = 3.4159$，故 $\abs{\Delta\mathrm{nDCG}} = 0.3637$。

第二对本来就排对了，它的 RankNet 权重 $\rho$ 很小；第一对是排错的。可当一个排对的对两个分数咬得很紧时，LambdaRank 仍会用力保住等级 $3$ 的文档在顶上，因为丢掉它的 nDCG 代价是九倍。
:::
:::

合成数据上的结果：

```text
  true weights           w = [ 1.000,  0.600,  0.000]  nDCG@5 = 0.8384
  BM25 feature only      w = [ 1.000,  0.000,  0.000]  nDCG@5 = 0.7436
  PageRank feature only  w = [ 0.000,  1.000,  0.000]  nDCG@5 = 0.4608
  pointwise regression   w = [ 0.492,  0.355,  0.111]  nDCG@5 = 0.7790
  RankNet (linear)       w = [ 2.020,  1.458,  0.026]  nDCG@5 = 0.8323
  LambdaRank (linear)    w = [ 1.704,  1.265, -0.064]  nDCG@5 = 0.8244
```

这里 LambdaRank 不比 RankNet 好。这不矛盾：数据由线性函数生成，两个逐对方法都几乎找回了正确方向，头重加权再无所图，而 $20$ 个测试查询上 $0.008$ 的差异完全落在噪声之内（要下任何断言，得先做 [[information-retrieval/evaluation]] 那样的配对检验）。逐表加权在模型拟合不动一切时才有回报——一个设定有偏或容量有限的模型（比如小树）必须选择在哪里犯错，$\lambda$ 会把错误从顶部引开。

::: warning 更好的训练损失不等于更好的排序器
上面每个数都是一个合成数据集上的**观察**，不是关于这些方法的定理。逐点、逐对、逐表方法的已发表比较，极度依赖数据集、特征、模型类与调参投入，许多报告过的增益在仔细重评之后缩水。两个具体的坑：拿测试查询调超参数，以及拿精心调过的新方法去比草草调过的基线。防护手段还是 [[information-retrieval/evaluation]] 那几条——训练、验证、测试查询分离；强悍的基线；按查询做的显著性检验；最后，还有真实用户的在线实验。
:::

## 从点击学习

相关性判定很贵：TREC 式的文集有几万条判定，商业引擎却每周要几百万条、覆盖所有语言和细分市场。点击免费且管饱。但点击不是判定。用户点他们**看到**的、点摘要里**看着**相关的，而头部结果被看到的次数远多于其余。排名 $1$ 的文档吸引许多点击，一部分就因为它在排名 $1$。

::: definition 位置点击模型 {#def-pbm}
在**位置模型**中，在排名 $k$ 看到文档 $d$ 的用户以概率 $\theta_k$ **查看**（examine）它，概率只依赖排名；若查看了，则以概率 $r_d$ 点击，概率只依赖文档（它的吸引力或相关性）。查看与点击决定相互独立，于是
$$
\Prob(\text{点击} \mid d \text{ 在排名 } k) = \theta_k\, r_d.
$$
**查看假设**是"文档只有被查看才可能被点击"这一假定。概率 $\theta_k$ 称为**倾向**（propensity）。
:::

另一种是**级联模型**（Craswell、佐特（Zoeter）、泰勒（Taylor）与拉姆齐（Ramsey），2008）：用户从头往下看，点第一个有吸引力的结果然后停下：排名 $k$ 处点击的概率是 $r_{d_k}\prod_{i<k}(1 - r_{d_i})$。它解释了为什么排名 $1$ 上一个好结果会减少它下面一切的点击；改进版把查看与级联行为合成动态贝叶斯网络的点击模型。

::: example 级联模型下的点击 {#ex-cascade}
三个结果的吸引力为 $r_1 = 0.3$、$r_2 = 0.5$、$r_3 = 0.2$。级联模型下，每个排名处发生点击、以及完全不点击的概率各是多少？
::: solution
排名 $1$：$0.3$。排名 $2$：$(1 - 0.3)(0.5) = 0.35$。排名 $3$：$(0.7)(0.5)(0.2) = 0.07$。无点击：$0.7 \times 0.5 \times 0.8 = 0.28$。四个概率之和为 $1$。第二个结果比第一个拿到的点击还多，尽管第一个排得更高，因为它更有吸引力；第三个——用户要否掉两个结果才看到它——无论质量如何都门庭冷落。
:::
:::

文档相关性的朴素估计——**点击率**（click-through rate，CTR）——点击除以展现——在这些模型下是有偏的：位置模型下它的期望是 $\theta_k r_d$，不是 $r_d$。拿从当前排序器收集来的 CTR 训练排序器，只会强化当前排序，不管它质量如何。

::: theorem 逆倾向加权是无偏的 {#thm-ips}
位置模型下，设文档 $d$ 在 $n$ 次展现中每次都在排名 $k$ 处展示，倾向 $\theta_k > 0$ 已知。用 $c_1, \dots, c_n \in \set{0, 1}$ 记录点击。则**逆倾向加权**估计
$$
\hat r_d = \frac{1}{n}\sum_{t=1}^{n} \frac{c_t}{\theta_k}
$$
满足 $\E[\hat r_d] = r_d$。更一般地，若第 $t$ 次展现把 $d$ 放在排名 $k_t$、$\theta_{k_t} > 0$，估计 $\frac1n\sum_t c_t/\theta_{k_t}$ 对 $r_d$ 无偏。
:::

::: proof
由模型，$\E[c_t] = \Prob(c_t = 1) = \theta_{k_t} r_d$。由期望的线性，
$$
\E[\hat r_d] = \frac{1}{n}\sum_{t=1}^n \frac{\E[c_t]}{\theta_{k_t}} = \frac1n\sum_{t=1}^n \frac{\theta_{k_t} r_d}{\theta_{k_t}} = r_d.
$$
:::

托尔斯滕·约阿希姆斯（Joachims）、阿迪特·斯瓦米纳森（Swaminathan）与托比亚斯·施纳贝尔（Schnabel）（2017）据此定义了**无偏排序学习**：把每个被点文档对排序损失的贡献加权 $1/\theta_k$，使损失在期望上等于真实相关性上的损失。$\theta_k$ 小时权重可以很大——估计量无偏，方差却高——实践中靠截断权重来控制。而倾向还必须估计出来，例如用**随机化**：对一小撮用户偶尔把排名 $1$ 的结果与排名 $k$ 的对调，能显示同一批文档的点击如何随位置变化。

用 $\theta_k = 1/k$ 做个模拟：文档 $d_1$（真实 $r = 0.2$）总在排名 $1$ 展示，$d_2$（真实 $r = 0.6$）在排名 $4$，共 $100\,000$ 次展现。

```python
import random
rng = random.Random(7)
theta = [1 / (k + 1) for k in range(10)]         # 排名 k+1 处的查看概率（位置偏置）
rel = {"d1": 0.2, "d2": 0.6}                     # 真实的"查看后点击"概率
n, clicks, ips = 100000, {"d1": 0, "d2": 0}, {"d1": 0.0, "d2": 0.0}
for _ in range(n):
    for d, rank in (("d1", 1), ("d2", 4)):
        if rng.random() < theta[rank - 1] and rng.random() < rel[d]:   # 先查看，再点击
            clicks[d] += 1
            ips[d] += 1 / theta[rank - 1]                              # 逆倾向权重
for d in ("d1", "d2"):
    print(f"{d}: CTR {clicks[d] / n:.4f}   IPS estimate {ips[d] / n:.4f}   true relevance {rel[d]}")
```
```text
d1: CTR 0.1993   IPS estimate 0.1993   true relevance 0.2
d2: CTR 0.1515   IPS estimate 0.6061   true relevance 0.6
```

按点击率看，当前排序像是对的——$d_1$ 拿的点击更多——尽管 $d_2$ 的相关性是它的三倍。IPS 估计在抽样误差内把两个相关性都恢复了。

::: widget plot
f: 1/x^eta; 0.6/x^eta
sliders: eta=0:0.1:2
x: 1, 10
y: 0, 1
labels: \theta_k = 1/k^{\eta}\ \text{（倾向）}; r = 0.6 \text{ 的文档的期望点击率}
caption: 一族位置偏置曲线 $\theta_k = k^{-\eta}$——常拟合给点击数据——以及它们在一个相关性 $0.6$ 的文档于各排名处蕴含的点击率。$\eta = 0$ 时无偏置，CTR 等于相关性；$\eta = 1$（模拟所用）时，排名 $4$ 的文档被查看的频率只有四分之一。逆倾向权重 $1/\theta_k = k^\eta$ 随排名增长很快，这就是排名靠后的文档的 IPS 估计噪声大的原因。
:::

::: quiz
位置模型下 $\theta_1 = 1$、$\theta_3 = 0.4$。排名 $1$ 的文档 X 的 CTR 为 $0.30$，排名 $3$ 的文档 Y 的 CTR 为 $0.16$。谁更相关？
- [ ] X，因为它的 CTR 更高
- [x] Y：它的估计相关性是 $0.16/0.4 = 0.40$，X 只有 $0.30$
- [ ] 两者一样相关
- [ ] 没有相关性判定就无从判断
::: solution
除以倾向，$\hat r_X = 0.30/1 = 0.30$、$\hat r_Y = 0.16/0.4 = 0.40$（[[#thm-ips]]）。Y 被点得少，只因为它被看得少。这一结论依赖模型正确、倾向估得准；假如用户还会跳过摘要寒酸的查询结果，那么估出来的"相关性"其实是摘要的吸引力，不是文档的相关性。
:::
:::

## 实践中

排序学习在 2000 年代末成为网页搜索的核心。公开的基准数据集——微软的 LETOR（2007）与 MSLR-WEB10K/30K、Yahoo! 排序学习挑战赛数据（2010）——为几万条查询提供了特征向量和分级判定，带 lambda 梯度的 boosted 树长期是其上最强的方法。约 2019 年起，构建在预训练语言模型上的**神经重排器**——一个把查询和文档放在一起读、输出相关性分数的 transformer，即**交叉编码器**——在许多基准上带来大幅的效力提升，但每个文档代价高昂，所以只用于头几十到一百个候选；它们在 [[information-retrieval/dense-retrieval]] 中引入，模型本身见 [LLM Atlas](/learn/llm/lesson.php?c=transformers&l=architecture-families)。在新鲜度、热度或个性化等特征必不可少、时延预算又吃紧的地方，基于特征的学习排序器依然重要。这些系统一律按 [[information-retrieval/evaluation]] 评估：留出的查询上离线 nDCG，然后在线交织或 A/B 测试。

从用户行为学习还提出超越精度的问题。拿点击训练的排序器学的是用户点什么，而那未必是准确的、安全的或公平的——耸动的结果招点击——反馈回路还会把现有排序和从中获利的提供者固化下来。因此引擎把行为信号与编辑判定、质量准则并用，并在相关性之外度量曝光与公平。

::: history
诺贝特·富尔（Fuhr）1989 年提出用多项式回归从相关性反馈学习检索函数；威廉·库珀（Cooper）、弗雷德里克·盖伊（Gey）与丹尼尔·达布尼（Dabney）1992 年用了逻辑回归。托尔斯滕·约阿希姆斯（Joachims）的 "Optimizing search engines using clickthrough data"（KDD 2002）提出用点击偏好训练的 RankSVM；约阿希姆斯、劳拉·格兰卡（Granka）等人的眼动追踪研究（2005）量出了位置对点击的偏置有多重。克里斯·伯吉斯（Burges）等人在微软提出 RankNet，载于 "Learning to rank using gradient descent"（ICML 2005），2006 年提出 LambdaRank，LambdaMART 见伯吉斯 2010 年的综述 "From RankNet to LambdaRank to LambdaMART"；曹哲（Cao）等人 2007 年提出 ListNet。尼克·克莱斯韦尔（Craswell）、奥诺·佐特（Zoeter）、迈克尔·泰勒（Taylor）与比尔·拉姆齐（Ramsey）在 WSDM 2008 提出级联模型。约阿希姆斯、斯瓦米纳森（Swaminathan）与施纳贝尔（Schnabel）的 "Unbiased learning-to-rank with biased feedback"（WSDM 2017）把逆倾向加权引入排序；罗德里戈·诺盖拉（Nogueira）与 Kyunghyun Cho 的 BERT 重排器（2019）开启了神经重排的时代。刘铁岩（Tie-Yan Liu）的综述 *Learning to Rank for Information Retrieval*（2009）把该领域整理成逐点、逐对、逐表三类。
:::

## 后续内容

学习排序器享用之前每一章的全部特征——BM25 与语言模型分数、位置索引来的邻近度、PageRank 与锚文本——并接受 [[information-retrieval/evaluation]] 的度量与检验评判。下一章 [[information-retrieval/dense-retrieval]] 把学习从最后一级挪到第一级：不再组合手工设计的特征，而是把查询与文档表示成稠密向量，用最近邻搜索检回，再用交叉编码器重排。机器学习的地基——逻辑回归、梯度下降、boosting、神经网络——在 [LLM Atlas](/learn/llm/lesson.php?c=ml-fundamentals&l=logistic-regression) 中展开。

::: summary
- **排序学习**（[[#def-ltr]]）在查询–文档对的特征上拟合打分函数，使新查询的排序在 nDCG 一类度量上得高分；要紧的只是查询内的次序，而头部最要紧。
- **逐点法**直接回归等级；简单，却把力气浪费在跨查询的尺度上，对各个排名一视同仁。
- **逐对法**从偏好学习：RankNet 的逻辑损失（[[#def-ranknet]]）给排错对数设上界（[[#prop-pair-bound]]），线性模型的梯度是 $-\rho_{ij}(\vec x_i - \vec x_j)$（[[#prop-ranknet-grad]]）；RankSVM 用合页损失。
- 排序度量对分数逐段为常数，梯度几乎处处为零（[[#prop-flat]]）；**LambdaRank**（[[#alg-lambdarank]]）把每对的推力按 $\abs{\Delta\mathrm{nDCG}}$ 加权，**LambdaMART** 把这套办法用在 boosted 树上。
- 点击受**位置**偏置；位置模型（[[#def-pbm]]）与级联模型刻画它，**逆倾向加权**给出无偏的相关性估计（[[#thm-ips]]），代价是方差和倾向需要估计。
- 一切比较都是经验的：在线性的合成问题上，逐对与逐表的线性排序器 nDCG@5 约 $0.83$，逐点回归 $0.78$，只用 BM25 $0.74$——是观察，不是定律。
:::

## 习题

::: exercise 一个 RankNet 概率 {level=1 check="1/(1 + exp(-1))"}
一对的分数为 $s_i = 2.5$、$s_j = 1.5$。RankNet 给 $i \succ j$ 多大的概率？（填入 $P_{ij}$。）
::: solution
$P_{ij} = \sigma(s_i - s_j) = \sigma(1) = 1/(1 + e^{-1}) \approx 0.731$。损失是 $-\ln 0.731 = 0.313$。
:::
:::

::: exercise 数对子 {level=1 check="35"}
某查询有 $10$ 个候选，等级为：一个 $3$，两个 $2$，三个 $1$，四个 $0$。它给逐对训练贡献多少个有序对 $i \succ j$（$i$ 的等级严格更高）？（填入对数。）
::: solution
来自不同等级组的每对文档给出一条偏好。组的大小为 $1, 2, 3, 4$：$1\cdot2 + 1\cdot3 + 1\cdot4 + 2\cdot3 + 2\cdot4 + 3\cdot4 = 2 + 3 + 4 + 6 + 8 + 12 = 35$。等价地，全部 $\binom{10}{2} = 45$ 对减去同组的 $\binom22 + \binom32 + \binom42 = 1 + 3 + 6 = 10$ 对。对数随候选数平方增长，这就是逐对训练通常抽样或对子按文档聚合的原因。
:::
:::

::: exercise 手算 IPS {level=1 check="0.5"}
一篇文档在倾向 $\theta_5 = 0.2$ 的排名 $5$ 展示，$500$ 次展现里得到 $50$ 次点击。它的 IPS 相关性估计是多少？（填入 $\hat r$。）
::: solution
$\hat r = \frac{1}{500}\sum_t c_t/\theta_5 = \frac{50}{500 \times 0.2} = 0.5$，而 CTR 只有 $0.1$。
:::
:::

::: exercise RankSVM 的损失 {level=2}
证明合页损失 $\max(0, 1 - z)$（$z = s_i - s_j$）也给逐对误差 $\mathbf 1[z \le 0]$ 设界，并与 RankNet 的梯度比较：对一个以边距 $z = 3$ 排对的对子。
::: solution
$z \le 0$ 时 $1 - z \ge 1$，合页损失至少 $1$，正是示性函数的值；$z > 0$ 时示性函数为 $0 \le$ 损失。$z = 3$ 时合页损失为 $0$、梯度为 $0$：分开超过边距 $1$ 的对子再也不使劲。RankNet 的梯度模为 $\rho = 1/(1 + e^{3}) = 0.047$：小而非零，每对都还在轻轻推。合页损失给出稀疏解（只有边距内的对子要紧，即支持向量），逻辑损失给出概率。
:::
:::

::: exercise DCG 的对调变化 {level=2}
证明：对调排名 $a < b$、等级 $g_a, g_b$ 的两篇文档，DCG 恰好变化 $(2^{g_b} - 2^{g_a})\bigl(\frac{1}{\log_2(a+1)} - \frac{1}{\log_2(b+1)}\bigr)$，并推出：DCG 增加当且仅当 $g_b > g_a$。
::: solution
DCG 是各排名处增益乘折扣的和，对调只改排名 $a$、$b$ 两项。之前：$(2^{g_a} - 1)D_a + (2^{g_b} - 1)D_b$，其中 $D_i = 1/\log_2(i+1)$。之后：$(2^{g_b} - 1)D_a + (2^{g_a} - 1)D_b$。之后减之前得 $(2^{g_b} - 2^{g_a})D_a - (2^{g_b} - 2^{g_a})D_b = (2^{g_b} - 2^{g_a})(D_a - D_b)$。$a < b$ 时 $D_a > D_b$，所以变化为正当且仅当 $2^{g_b} > 2^{g_a}$，即 $g_b > g_a$：把更好的文档往上挪总有好处。这正是 LambdaRank（[[#ex-lambda]]）用的量，每对 $O(1)$ 可算。
:::
:::

::: exercise 从对调实验估倾向 {level=2 check="0.4"}
位置模型下，引擎对随机 $1\%$ 的用户对调排名 $1$ 和 $3$ 的结果。常在排名 $1$ 的文档 X 那里 CTR 为 $0.30$，对调到排名 $3$ 后为 $0.12$。常在排名 $3$ 的文档 Y 那里 CTR 为 $0.10$，对调到排名 $1$ 后为 $0.25$。分别从两个文档估计 $\theta_3/\theta_1$（填入估计值），并解释对调为何使估计与相关性无关。
::: solution
X：$\theta_3 r_X / (\theta_1 r_X) = 0.12/0.30 = 0.4$。Y：$\theta_3 r_Y/(\theta_1 r_Y) = 0.10/0.25 = 0.4$。每个比值比较的都是*同一个*文档在两个排名处，相关性自己消掉了，剩下的就是倾向之比。让用户是否看到对调随机化，两组用户便可比，CTR 之差就纯由位置造成。归一化 $\theta_1 = 1$ 得 $\theta_3 = 0.4$。约阿希姆斯（Joachims）等人正是为估计倾向提议这种对调干预；代价是对调组的用户看到的排序稍差一些。
:::
:::

::: exercise ListNet 的梯度 {level=3}
ListNet 的头一模型中，预测分布为 $p_i = e^{s_i}/\sum_j e^{s_j}$，目标是由等级 $y_i$ 算出的 $t_i = e^{y_i}/\sum_j e^{y_j}$。证明交叉熵 $L = -\sum_i t_i \ln p_i$ 的梯度为 $\partial L/\partial s_i = p_i - t_i$，并解释其含义。
::: solution
$\ln p_i = s_i - \ln\sum_j e^{s_j}$，故 $\partial \ln p_i/\partial s_k = \mathbf 1[i = k] - p_k$。于是
$$
\frac{\partial L}{\partial s_k} = -\sum_i t_i\bigl(\mathbf 1[i = k] - p_k\bigr) = -t_k + p_k\sum_i t_i = p_k - t_k,
$$
用到 $\sum_i t_i = 1$。一个文档"排第一"的预测概率超过它的目标份额，分数就被压低，反之被抬高；两个分布一致时梯度恰为零。softmax 把质量聚在最高的分数上，损失便由排序头部主导——这是一种不必排序就能侧重头部的光滑办法。（同一梯度就是多项逻辑回归的梯度，见 [LLM Atlas](/learn/llm/lesson.php?c=ml-fundamentals&l=logistic-regression)。）
:::
:::

::: exercise IPS 的方差 {level=3}
位置模型下，证明 [[#thm-ips]] 中固定排名 $k$ 的 IPS 估计方差为 $\frac{r_d(1 - \theta_k r_d)}{n\,\theta_k}$。取 $r_d = 0.6$、$n = 100\,000$，比较 $\theta = 1$ 与 $\theta = 0.25$ 的标准差，并对照模拟检查。把权重截断在 $1/\theta_{\max}$ 有什么作用？
::: solution
每个 $c_t$ 是均值 $\theta_k r_d$ 的伯努利变量，故 $\Var[c_t/\theta_k] = \theta_k r_d(1 - \theta_k r_d)/\theta_k^2 = r_d(1 - \theta_k r_d)/\theta_k$，$n$ 项独立平均再除以 $n$。$\theta = 1$：$\sqrt{0.6 \times 0.4/10^5} = 0.0015$。$\theta = 0.25$：$\sqrt{0.6 \times 0.85/(0.25 \times 10^5)} = \sqrt{2.04 \times 10^{-5}} = 0.0045$，大三倍。模拟中 $d_2$ 的估计 $0.6061$ 离 $0.6$ 有 $1.4$ 个标准差，相称。截断是把 $1/\theta_k$ 换成 $\min(1/\theta_k, M)$；它压低方差，却让 $\theta_k < 1/M$ 的排名上的估计向下有偏——一个靠验证选的偏差–方差权衡。
:::
:::
