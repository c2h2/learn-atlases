关于一个网络，最便宜的问题有两类。**这一层里存在什么信息？**——训练一个小分类器，一个*探针*（probe），从激活上读出一个属性，以此作答。**哪些输入对这个输出重要？**——一种给每个输入记下相应功劳份额的*归因*（attribution）方法，以此作答。两类方法在语言模型上都被广泛使用，都很容易运行，也都很可能被过度解读。探针可能是因为自己学会了任务才成功的；对一个显然重要的输入，归因可能给零；而注意力权重——最诱人的那种归因——回答的问题与人们常常要问它的问题并不相同。

本章把这两大家族连同它们的陷阱展开。它定义线性探针、Hewitt 与 Liang（2019）的**对照任务**（control task）与**选择性**（selectivity），以及信息"可解码"与"被使用"之间的区分。然后处理基于梯度的归因——显著性、梯度×输入——及其在饱和下的失效，并从公理出发推导**积分梯度**（integrated gradients；Sundararajan、Taly 与 Yan，2017），证明完备性性质。它陈述刻画**夏普利值**（Shapley value）与 SHAP 的公理，在两种方法意见相左的例子上作比较，并回顾"注意力是否解释"的争论。最后介绍 **logit 透镜**（logit lens）与**校准透镜**（tuned lens）——用模型自己的输出词表读出其中间预测的探针——由此引出 [[interpretability/residual-stream]] 的残差流视角。

## 探针 {#sec-probes}

设模型把输入序列映到激活，而 $\mathbf{h}\in\R^d$ 是某个位置某一层上的激活——比如说，一个残差流向量。再设每个位置都带有一个我们所关心属性的标签 $y$：词性、句子是否为真、词在句法树中的深度。

::: definition 探针 {#def-probe}
给定一层上属性 $y\in\{1,\dots,K\}$ 的**探针**是一个分类器 $g_\phi$，在模型冻结的条件下训练，从激活 $\mathbf{h}$ 预测 $y$。**线性探针**是多项 logistic 回归 $g_\phi(\mathbf{h}) = \operatorname{softmax}(W\mathbf{h} + \mathbf{b})$，其中 $W\in\R^{K\times d}$；它的**探针准确率**在留出的样本上度量。
:::

Alain 与 Bengio（2016）引入线性探针，是为了观察一个图像分类器的各个类逐层变得多么线性可分。在语言模型中，探针成了追问句法、语义与世界知识在哪里表征的主要工具（[[text-and-language/linguistic-structure]] 概述了早期发现：BERT 的较低层可解码词性，中间层是句法关系，更高处是共指）。更近的探针寻找与安全相关的性质：语句是否为真（Marks 与 Tegmark，2023，《真的几何》（*The Geometry of Truth*）），以及模型是否"知道"某个答案是错的。

两个问题立刻冒出来。*探针应当多强？*表达能力更强的探针会把在场的任何信息榨出更多，因而更好地估计那里到底有什么；但它也可能凭借与属性毫无关系的特征把任务本身学会。而*成功说明了什么？*可解码的信息可能从未被模型读取。

::: example 探针有多大？ {#ex-probe-size}
在一个 $d = 4096$ 的模型的残差流上，为一个 $45$ 个词性标签的任务训练线性探针，训练数据是 $50{,}000$ 个词元。它有多少个参数？这对解读为什么重要？
::: solution
$W$ 有 $45\times4096 = 184{,}320$ 个条目，$\mathbf{b}$ 有 $45$ 个：共 $184{,}365$ 个参数，平均每个训练词元超过三个。在 $4096$ 维中，$50{,}000$ 个处于一般位置的点可以被超平面以极多种方法分开，所以线性探针有能力拟合与线性结构关系很弱的标签——尤其是当激活辨认出词型（word type）、而标签可以从词型直接背下来时。单凭高准确率无法区分"这一层编码了词性"与"这一层编码了词的身份，而探针背下了哪些词是名词"。
:::
:::

### 对照任务与选择性 {#sec-control}

Hewitt 与 Liang（2019）对这一混淆提出了一个直接的检验。**对照任务**保留输入的结构，却把属性换成一个随机的属性——一个只能靠死记硬背学到的属性。

::: definition 对照任务与选择性 {#def-selectivity}
给定一个为词元分配标签的探针任务，**对照任务**为每个*词型*抽一个标签（与原来的标签分布相同），并给该词型的每个词元同样的标签。那些标签不携带任何语言学信息，所以探针只有在背下"词身份到标签"的映射时，才能在对照任务上表现好。探针的**选择性**为
$$
\text{选择性} = \text{任务上的准确率} - \text{对照任务上的准确率}.
$$
:::

一个任务准确率高、选择性也高的探针，是在从表征中读取属性；一个任务准确率高、选择性却低的探针可能只是在死记硬背。Hewitt 与 Liang 发现，在 ELMo 表征上使用多层感知机探针能取得很高的词性准确率，但选择性很低；而线性或秩受限的探针、或强正则化的 MLP，任务准确率几乎相同，选择性却高得多。他们还发现，dropout 这一标准正则化器并不可靠地提高选择性。他们建议报告选择性，并优先使用简单探针。

这个论证有一个反驳。Pimentel 等人（2020）从信息论出发论证：探针的目标——估计 $\mathbf{h}$ 中关于 $y$ 的信息量——恰恰要求用到手的*最好*的探针，因为 $\mathbf{h}$ 的任何确定性函数（包括模型自己后面的层）都不可能增加信息，所以较弱的探针只会低估它；按这一观点，真正的问题是比较，例如某一层比一个基线表征多携带多少信息。Voita 与 Titov（2020）提议度量给定表征下标签的**最小描述长度**，它奖励能从少量数据中学习的探针。一旦把问题说精确，两方立场就相容了：信息论式的探针估计*有什么在场*；简单而具选择性的探针则追问该属性是否以*容易取用*——通常是线性——的形式在场。

[[#sec-code]] 中的实验室在合成数据上复现了这一效应：$60$ 个词型，每个由一个随机向量加噪声表示，一个三分类属性弱弱地编码在词型向量里。

::: example 读选择性 {#ex-selectivity}
在 [[#sec-code]] 的模拟中，线性探针达到任务准确率 $0.817$、对照准确率 $0.588$；一个有 $64$ 个隐单元的 MLP 探针达到 $0.983$ 与 $0.963$。计算选择性并解读。
::: solution
线性：$0.817 - 0.588 = 0.229$。MLP：$0.983 - 0.963 = 0.021$。MLP 探针在任务上"更好"，好 $17$ 个百分点，可它在对照任务上也几乎同样好，而对照任务的标签对每个词型都是随机的：它的准确率反映的是它从向量辨认词型并背下标签的能力，不是属性的线性编码。线性探针较低的任务准确率伴随着可观的选择性。注意连线性探针的对照准确率也远高于瞎猜（$1/3$），因为 $16$ 维中的 $60$ 个随机词型向量部分线性可分——混淆在每个容量上都存在，必须测量它，而不是把它当作不存在。
:::
:::

### 可解码不等于被使用 {#sec-used}

探针表明信息可以被*探针*从 $\mathbf{h}$ 中读出。它没有表明模型读取了它。最干净的检验要动手干预。**失忆探针**（amnesic probing；Elazar 等人，2021）用迭代零空间投影把属性从表征中移除——反复训练一个线性探针、并把表征投影到其权重的零空间上（Ravfogel 等人，2020）——并度量模型的语言建模行为退化多少；一个可解码、移除后却什么都不改变的属性没有被使用，至少没有以线性方式被使用。另一些研究沿探针的方向平移表征，检查输出是否如预言般改变，这正是 [[interpretability/causal-interventions]] 的主题。在**没有标签**的情况下训练的探针是又一个变体：Burns 等人（2022）找到了满足一条逻辑一致性条件的方向（一个陈述与其否定应得到互补的概率），后续工作则争论这类方法找到的东西有多少是"真"、有多少是其他显著特征（Farquhar 等人，2023）。

::: warning 探针准确率不是模型单方面的性质
探针准确率依赖于探针的容量、训练集规模、标签分布、数据集（其中可能藏有捷径）与层。报告一个基线——同一个探针作用在随机初始化的模型上、作用在嵌入层上、作用在对照任务上——并把一个高数字当作信息*可用*的证据，而不是模型*使用*它的证据，也不是它存放在探针的那个方向、而非在探针数据集上与之相关的那个方向里的证据。
:::

## 基于梯度的归因 {#sec-gradients}

归因追问哪些输入对一个输出重要。设 $F\colon\R^n\to\R$ 是模型的一个标量输出——被预测词元的 logit 或对数概率——看作输入向量 $\mathbf{x}$ 的函数。对文本，$\mathbf{x}$ 是输入词元嵌入的拼接，而记给某个词元的归因，是它的嵌入各坐标归因之和。

::: definition 显著性与梯度×输入 {#def-saliency}
输入 $i$ 的**显著性**（saliency；Simonyan、Vedaldi 与 Zisserman，2014）是在 $\mathbf{x}$ 处取值的 $\lvert\partial F/\partial x_i\rvert$。**梯度×输入**（Shrikumar 等人，2016）把 $x_i\,\partial F/\partial x_i$ 记给输入 $i$。
:::

显著性度量敏感性：输入发生无穷小变化时输出会改变多少。梯度×输入按输入的大小对此作缩放，而对线性模型它是精确的。

::: proposition 线性模型的归因 {#prop-linear}
若 $F(\mathbf{x}) = \mathbf{w}\T\mathbf{x} + c$，则梯度×输入给输入 $i$ 记 $w_ix_i$，且 $\sum_i w_ix_i = F(\mathbf{x}) - F(\mathbf{0})$：归因恰好解释了输出与零输入处输出之差。
:::

::: proof
$\partial F/\partial x_i = w_i$ 处处成立，所以归因是 $w_ix_i$，且 $\sum_iw_ix_i = \mathbf{w}\T\mathbf{x} = F(\mathbf{x}) - c = F(\mathbf{x}) - F(\mathbf{0})$。
:::

神经网络不是线性的，而 [[interpretability/interpretability-goals#prop-local]] 的上界说明了梯度解释衰减得有多快。最尖锐的失效是**饱和**。考虑 $F(x_1, x_2) = 1 - \operatorname{ReLU}(1 - x_1 - x_2)$，Sundararajan 等人使用的例子。在 $\mathbf{x} = (1, 1)$ 处 $x_1 + x_2 = 2 > 1$，所以 $F$ 在 $\mathbf{x}$ 附近是常数（$F = 1$），两个梯度都是零。然而 $F(\mathbf{0}) = 0$：两个输入合起来把输出从 $0$ 带到了 $1$，可梯度却认为这一变化没有任何输入的贡献。饱和的非线性——sigmoid、接近 $1$ 的 softmax 概率、已经锁定某个词元的注意力模式——使这种情况很常见。

## 积分梯度 {#sec-ig}

Sundararajan、Taly 与 Yan（2017）提议不只盯着输入看，而是看从**基线** $\mathbf{x}'$——一个被当作不携带信息的输入，例如零嵌入或某个 padding 词元——到 $\mathbf{x}$ 的整条直线路径。

::: definition 积分梯度 {#def-ig}
设 $F$ 在从 $\mathbf{x}'$ 到 $\mathbf{x}$ 的线段上几乎处处可微。输入 $i$ 的**积分梯度**为
$$
\operatorname{IG}_i(\mathbf{x}) = (x_i - x'_i)\int_0^1\frac{\partial F}{\partial x_i}\bigl(\mathbf{x}' + t(\mathbf{x} - \mathbf{x}')\bigr)\,dt.
$$ {#eq-ig}
:::

他们用两条梯度类方法常常不满足的公理为方法辩护。**敏感性 (a)**：若 $\mathbf{x}$ 与 $\mathbf{x}'$ 只在一个特征上不同且 $F(\mathbf{x})\ne F(\mathbf{x}')$，该特征就必须拿到非零归因——那个饱和的例子正是梯度×输入对此的违背。**实现不变性**：计算同一函数的两个网络必须得到同样的归因——那些把修改后的梯度沿网络的各层传播的方法，例如分层相关传播与 DeepLIFT 的某些变体，可能违背它。积分梯度由函数本身定义，因此实现不变；而由于下面这条性质，它满足敏感性。

::: theorem 积分梯度的完备性 {#thm-completeness}
设 $\gamma(t) = \mathbf{x}' + t(\mathbf{x} - \mathbf{x}')$ 并设 $F\circ\gamma$ 在 $[0,1]$ 上绝对连续——例如 $F$ 连续可微，或沿 $\gamma$ 连续且分段连续可微、分段有限，比如 ReLU 网络沿一条一般线段。则
$$
\sum_{i=1}^n\operatorname{IG}_i(\mathbf{x}) = F(\mathbf{x}) - F(\mathbf{x}').
$$ {#eq-complete}
:::

::: proof
记 $\varphi(t) = F(\gamma(t))$。在 $F$ 于 $\gamma(t)$ 处可微的地方，链式法则给出 $\varphi'(t) = \nabla F(\gamma(t))\T\gamma'(t) = \sum_i\frac{\partial F}{\partial x_i}(\gamma(t))\,(x_i - x'_i)$，而由假设这对几乎每个 $t$ 成立。由于 $\varphi$ 绝对连续，勒贝格积分的微积分基本定理给出 $\varphi(1) - \varphi(0) = \int_0^1\varphi'(t)\,dt$。代入并把有限和与积分交换，
$$
F(\mathbf{x}) - F(\mathbf{x}') = \sum_i(x_i - x'_i)\int_0^1\frac{\partial F}{\partial x_i}(\gamma(t))\,dt = \sum_i\operatorname{IG}_i(\mathbf{x}).
$$
（分段的情形可以绕开测度论：在 $\varphi$ 连续可微的每个——有限个——小区间上用普通的微积分基本定理，再相加，并利用 $\varphi$ 在分段点处的连续性。）
:::

敏感性 (a) 随之而来：若 $\mathbf{x}$ 与 $\mathbf{x}'$ 只在特征 $i$ 上不同，和式中其他每一项都因 $x_j - x'_j = 0$ 为零，于是 $\operatorname{IG}_i = F(\mathbf{x}) - F(\mathbf{x}')\ne0$。

::: example 饱和单元的积分梯度 {#ex-ig-sat}
对 $F(x_1, x_2) = 1 - \operatorname{ReLU}(1 - x_1 - x_2)$ 在 $\mathbf{x} = (1,1)$、基线 $\mathbf{0}$ 下计算积分梯度，并检验完备性。
::: solution
沿 $\gamma(t) = (t, t)$，$x_1 + x_2 = 2t$。当 $t < \tfrac12$ 时，$F = 2t$ 且 $\partial F/\partial x_1 = 1$；当 $t > \tfrac12$ 时，$F = 1$ 且偏导为 $0$。于是 $\int_0^1\partial F/\partial x_1\,dt = \tfrac12$，$\operatorname{IG}_1 = (1 - 0)\cdot\tfrac12 = \tfrac12$；由对称性 $\operatorname{IG}_2 = \tfrac12$。和为 $1 = F(1,1) - F(0,0)$。梯度×输入给的是 $(0, 0)$。
:::
:::

实践中，积分用一个 $m$ 次梯度求值的黎曼和近似——Sundararajan 等人建议 $20$ 到 $300$ 步，并检验各归因之和与 $F(\mathbf{x}) - F(\mathbf{x}')$ 的差距在百分之几以内——所以积分梯度的代价约为 $m$ 次反向传播。

该图展示了这一定理背后的一维图景。单输入、sigmoid 输出时，积分梯度是导函数沿路径围出的面积，即使输入本身处的导数可以忽略，它仍等于 $F$ 的总改变量。

::: widget plot
f: k*exp(-k*(x-0.5))/(1+exp(-k*(x-0.5)))^2; 1/(1+exp(-k*(x-0.5)))
x: -0.25, 1.25
y: -0.1, 3
sliders: k=2:1:30
shade: 0, 1
labels: \frac{dF}{dx}; F(x)
caption: 一维情形下的积分梯度，$F(x) = \sigma(k(x - 0.5))$，基线为 $0$、输入为 $1$。导数下方的阴影面积等于 $F(1) - F(0)$（[[#thm-completeness]]）。把陡度 $k$ 调大：输入 $x = 1$ 处的导数变得可以忽略——梯度归因消失了——而阴影面积，即积分梯度的归因，趋于 $1$。
:::

### 基线是解释的一部分 {#sec-baseline}

积分梯度解释的是 $F(\mathbf{x}) - F(\mathbf{x}')$，所以 $\mathbf{x}'$ 的选择决定了所回答的问题。对图像，常用的基线是全黑图像，输入中的黑色像素于是拿到零归因，无论它多么重要；模糊、均匀噪声与平均嵌入等基线则给出不同的图（Sturmfels、Lundberg 与 Lee，2020，《可视化特征归因基线的影响》（*Visualizing the Impact of Feature Attribution Baselines*））。对文本，零向量不是任何词元的嵌入，从它出发的直线路径穿过的是真实输入不可能有的那些嵌入；padding 词元、mask 词元或平均嵌入是备选，各有各的解读。路径也重要：其他单调路径同样满足完备性，却给出别的归因，而 Sundararajan 等人证明，在一大类路径方法中，直线是唯一对称（交换两个角色相同的特征会交换其归因）的路径方法。

## 夏普利值 {#sec-shapley}

另一个想法来自合作博弈论。把 $n$ 个输入特征当作玩家，对联盟 $S\subseteq\{1,\dots,n\}$，设 $v(S)$ 为 $S$ 中的特征取实际值、其余特征"缺席"时的输出。夏普利（Shapley）值（Shapley，1953）把 $v(\{1,\dots,n\}) - v(\varnothing)$ 分给各个玩家。

::: definition 夏普利值 {#def-shapley}
对定义在 $N = \{1,\dots,n\}$ 的子集上的集函数 $v$，玩家 $i$ 的**夏普利值**为
$$
\phi_i(v) = \sum_{S\subseteq N\setminus\{i\}}\frac{\lvert S\rvert!\,(n - \lvert S\rvert - 1)!}{n!}\bigl(v(S\cup\{i\}) - v(S)\bigr),
$$ {#eq-shapley}
即玩家 $i$ 加入排在其前面的玩家时，其边际贡献在全部 $n!$ 种玩家排序上的平均。
:::

::: theorem 夏普利的刻画 {#thm-shapley}
夏普利值是满足下列对一切集函数 $v, w$ 的公理的唯一归因规则：
1. **有效性**：$\sum_i\phi_i(v) = v(N) - v(\varnothing)$。
2. **对称性**：若对既不包含 $i$ 也不包含 $j$ 的每个 $S$ 都有 $v(S\cup\{i\}) = v(S\cup\{j\})$，则 $\phi_i(v) = \phi_j(v)$。
3. **零玩家（哑元）**：若对每个 $S$ 都有 $v(S\cup\{i\}) = v(S)$，则 $\phi_i(v) = 0$。
4. **可加性**：$\phi_i(v + w) = \phi_i(v) + \phi_i(w)$。
:::

唯一性部分（Shapley，1953）的证明是把任意 $v$ 写成"一致博弈"（unanimity game）的组合，这里不复现。公式满足有效性，从排序形式一眼可见：对每个排序，边际贡献叠缩（telescope）成 $v(N) - v(\varnothing)$，对排序取平均保持这个和不变。有效性是完备性（[[#thm-completeness]]）的对应物。

Lundberg 与 Lee（2017）在 **SHAP** 之名下把若干归因方法统一为夏普利值的近似，把这些公理重述为*局部准确性*（有效性）、*缺失性*（输入中缺席的特征拿零）与*一致性*（若模型改动后某个特征的边际贡献从不减小，它的归因也不减小）。两个实际问题占主导。精确的夏普利值需要 $2^n$ 次 $v$ 的取值，所以 SHAP 用抽样估计（KernelSHAP 对抽到的联盟拟合一个加权线性回归）。而"缺席"必须定义：把缺席的特征换成基线、换成来自其边际分布的样本、或换成给定在场特征条件下来自其条件分布的样本，会得到不同的值，这一选择尚有争议（Janzing、Minorics 与 Blöbaum，2020 从因果角度主张干预版本；另一些人偏爱条件版本，因为它让输入留在数据分布上）。对文本，缺席通常用遮盖词元实现，这又一次制造不自然的输入。

::: example 积分梯度与夏普利值意见相左 {#ex-max}
设 $F(x_1, x_2) = \max(x_1, x_2)$，在 $\mathbf{x} = (1, 2)$ 处相对基线 $\mathbf{0}$（缺席的特征取值 $0$）作解释。计算两种归因。
::: solution
积分梯度：沿 $(t, 2t)$，第二个坐标总是更大，所以对所有 $t > 0$ 有 $\partial F/\partial x_1 = 0$、$\partial F/\partial x_2 = 1$；$\operatorname{IG} = (0, 2)$。夏普利：$v(\varnothing) = 0$，$v(\{1\}) = \max(1, 0) = 1$，$v(\{2\}) = 2$，$v(\{1,2\}) = 2$。于是 $\phi_1 = \tfrac12[(v(\{1\}) - v(\varnothing)) + (v(\{1,2\}) - v(\{2\}))] = \tfrac12(1 + 0) = 0.5$，$\phi_2 = \tfrac12[(2 - 0) + (2 - 1)] = 1.5$。两者之和都是 $2 = F(\mathbf{x}) - F(\mathbf{0})$，但回答的问题不同：积分梯度沿一条路径走，而在那条路径上 $x_1$ 从不重要；夏普利值对特征可能被"打开"的先后次序取平均，而 $x_1$ 抢在先时会给输出记上一笔。
:::
:::

两个答案都不错；它们形式化的是不同的功劳概念。两种有原则的方法在一个双输入函数上意见相左，这提醒我们：归因是一个*定义*，不是一回*测量*，选择应当跟着问题走。比较归因方法在语言模型上表现的研究发现，同一输入上各方法之间存在明显分歧（例如 Krishna 等人，2022，《可解释机器学习中的分歧问题》（*The Disagreement Problem in Explainable Machine Learning*）），而实践者自述是在它们之间临时地挑。

## 注意力是解释吗？ {#sec-attention}

注意力权重看起来像现成的归因：对每个输出位置，它是输入位置上的一个概率分布（[[transformers/multi-head-attention]]）。在带注意力层的循环模型——最初那场争论的战场——以及 Transformer 中，人们惯于把它们画成"模型看了哪里"的热力图。它们是否解释预测，在 2019 年的两篇论文里被正反两面地论证。

Jain 与 Wallace（2019）的《注意力不是解释》（*Attention is not Explanation*）研究了带注意力的 BiLSTM 分类器在文本分类、问答与推理任务上的表现。他们报告：注意力权重与基于梯度的、以及逐一剔除的特征重要性度量只有弱相关；而且对许多输入，他们可以构造出非常不同的注意力分布——包括把权重放到别的词元上的对抗性分布——而预测几乎不变。如果许多注意力模式给出同样的输出，那个被观察到的就不能是它的"那个"理由。

Wiegreffe 与 Pinter（2019）的《注意力不是不是解释》（*Attention is not not Explanation*）挑战这一结论。她们论证：那些对抗分布是对每个样本单独构造的，而非一个端到端训练的模型产出的，所以它们只说明别的选择*存在*，不说明模型本来会用到它们；而当她们训练一个对抗模型去产生远离原分布、却匹配预测的注意力时，这件事更难做到，所得权重在一项诊断检验中表现更差。她们还表明，某些任务几乎不需要注意力（一个均匀注意力的模型表现同样好），所以那里不该指望注意力权重有信息量；而注意力是不是"一个解释"取决于定义——它可以是一个可信的部分解释，而不必是唯一忠实的那一个。两篇文章都同意：不经检验，注意力权重不能当作忠实的解释。

对 Transformer 还有两点补充。第一，注意力权重说的是信息*从哪里*读出，不是读出了*什么*、有多重要：位置 $j$ 对头输出的贡献是 $\alpha_{ij}\,\mathbf{v}_j W_O$，若某位置的数值向量很小（常常是第一个词元，被当作"注意力汇聚"（attention sink）用），再大的权重贡献也小。Kobayashi 等人（2020）的《注意力不只是权重》（*Attention is Not Only a Weight*）表明，按变换后数值向量的范数加权，图景就大不相同。第二，第一层之后，一个位置的残差流已经混合了许多词元的信息，所以第 $5$ 层对位置 $j$ 的注意力不是对词元 $j$ 的注意力。**注意力展开**（attention rollout）与**注意力流**（attention flow；Abnar 与 Zuidema，2020）在简化假设下把注意力沿各层传播，以估计词元级的混合。[[interpretability/residual-stream]] 发展的视角把注意力模式当作一个计算的一个因子看待，另一个因子——OV 回路——决定搬动的是什么。

::: quiz
第 $1$ 层的一个注意力头在几乎每个位置都给提示的第一个词元 $0.7$ 的权重。能得出什么结论？
- [ ] 第一个词元是模型预测最重要的输入。
- [ ] 该头把第一个词元的身份复制到每个位置。
- [x] 不看该头写入什么，就无从谈论重要性：权重放在一个数值向量很小的位置上，对输出可能几乎没有贡献。
- [ ] 该头坏了，可以无碍地移除。
::: solution
注意力权重说的是头从哪里读。一个在没有值得注意的东西时就默认注意第一个词元的头——训练好的 Transformer 中常见的"注意力汇聚"模式——可能几乎什么都不写。它的贡献是 $\alpha\,\mathbf{v}W_O$，所以值-输出乘积的大小与方向才要紧；而要检验移除该头是否改变输出，做一次消融就知道了。
:::
:::

## 从中间层读出预测 {#sec-lens}

最后一类探针用模型自己的输出词表读残差流。在仅解码器 Transformer 中，最后一层的残差向量 $\mathbf{h}_L$ 经过最终归一化与解嵌入矩阵 $W_U\in\R^{d\times\lvert\mathcal{V}\rvert}$ 映到 logit：$\text{logits} = \operatorname{Norm}(\mathbf{h}_L)\,W_U$。由于每一层都加在同一个残差流上（[[transformers/transformer-block]]），中间向量 $\mathbf{h}_\ell$ 活在同一个空间里，人们可以直接解码它们。

::: definition logit 透镜与校准透镜 {#def-lens}
**logit 透镜**（logit lens；nostalgebraist，2020）用模型自己的输出头解码第 $\ell$ 层之后的残差流：$p_\ell = \operatorname{softmax}\bigl(\operatorname{Norm}(\mathbf{h}_\ell)\,W_U\bigr)$。**校准透镜**（tuned lens；Belrose 等人，2023）为每层插入一个训练出来的仿射映射：$p_\ell = \operatorname{softmax}\bigl(\operatorname{Norm}(A_\ell\mathbf{h}_\ell + \mathbf{b}_\ell)\,W_U\bigr)$，其中 $A_\ell, \mathbf{b}_\ell$（模型冻结）经过训练，以使模型最终输出分布 $p_L$ 到 $p_\ell$ 的 KL散度最小。
:::

nostalgebraist 的博客文章把 logit 透镜用于 GPT-2，发现中间层的预测常常是可解释的——一个合理的下一词元在中间层就已出现，并向输出不断变尖——这提示模型很早就形成一个猜测并不断打磨它，而不是一路用与词表无关的表征计算、直到最后才落地。这项技术是一个零参数的探针：它假设中间层与最后一层在同一个基下使用残差流。这一假设对某些模型不成立：Belrose 等人报告，logit 透镜在某些模型家族（例如 BLOOM 与某些 OPT 模型）上、以及通常在较早的层上，给出很差或莫名其妙的预测，而表征会漂移——后来的层改变了表达较早信息的基。校准透镜用每层一个仿射翻译器来纠正这种漂移；它的预测困惑度更低，按他们的因果检验也更忠实（对透镜重要的方向对模型也重要）。作者们还把潜在预测跨层的轨迹用作检测异常输入（例如某些提示注入）的特征。校准透镜是一个训练过的探针，所以 [[#sec-probes]] 的告诫对它适用：它的翻译器原则上可能自行添加计算，这正是它被限制为仿射映射、并作因果检验的原因。

::: example 手算一次 logit 透镜 {#ex-lens}
一个玩具模型有 $d = 2$，词表含三个词元，其解嵌入的列为 $\mathbf{u}_{\text{Paris}} = (1, 1)$、$\mathbf{u}_{\text{Lyon}} = (0, 1)$ 与 $\mathbf{u}_{\text{the}} = (1, -1)$。归一化之后，第 $6$ 层之后最后位置上的残差流是 $(1, 2)$。logit 透镜预测什么？
::: solution
logit 就是点积：Paris $1 + 2 = 3$，Lyon $0 + 2 = 2$，the $1 - 2 = -1$。softmax：$e^3 = 20.09$，$e^2 = 7.39$，$e^{-1} = 0.37$，总和 $27.84$，于是 $p = (0.721, 0.265, 0.013)$。透镜说到了第 $6$ 层，流已经偏向"Paris"。模型的最终各层会否保住这一预测、第 $6$ 层是否与输出使用同一个基，则是另外的问题——第二个正是校准透镜要纠正的。
:::
:::

## 一个数值实验室 {#sec-code}

第一个清单用纯 Python 的随机梯度下降，在一个任务与它的对照任务（[[#ex-selectivity]]）上训练线性与 MLP 探针。表征是合成的：每个词型有一个随机向量，每个词元再加噪声，一个三分类属性弱弱地编码在词型向量里。测试词元是同些词型的新词元，与 Hewitt 与 Liang 的设计相同。运行约需半分钟。

```python
import math, random
rng = random.Random(1)

# 60 个词型；每个词型有一个 d = 16 的随机向量；一个词元是其词型向量
# 加噪声。属性（3 类）沿每个类一个方向、以强度 0.6 加在词型向量上。
# 对照任务给每个词型（TYPE）一个随机标签。
D, TYPES, K, TOK = 16, 60, 3, 12
def randvec(): return [rng.gauss(0, 1) for _ in range(D)]
cls_dir = [randvec() for _ in range(K)]
label = [rng.randrange(K) for _ in range(TYPES)]            # 语言学任务
control = [rng.randrange(K) for _ in range(TYPES)]          # 对照任务
base = [[v + 0.6 * c for v, c in zip(randvec(), cls_dir[label[t]])] for t in range(TYPES)]
def token(t): return [v + rng.gauss(0, 0.5) for v in base[t]]
train = [(token(t), t) for t in range(TYPES) for _ in range(TOK)]   # 720 个词元
test = [(token(t), t) for t in range(TYPES) for _ in range(4)]      # 240 个新词元

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def train_probe(data, lab, hidden=0, epochs=60, lr=0.05):
    """softmax-regression probe; hidden > 0: one-hidden-layer ReLU MLP probe"""
    r = random.Random(2)
    if hidden:
        W1 = [[r.gauss(0, 1 / math.sqrt(D)) for _ in range(D)] for _ in range(hidden)]
        b1 = [0.0] * hidden
    n_in = hidden or D
    W = [[0.0] * n_in for _ in range(K)]; b = [0.0] * K       # (K, n_in), (K,)
    for _ in range(epochs):
        r.shuffle(data)
        for x, t in data:
            if hidden:
                pre = [sum(w * v for w, v in zip(row, x)) + bb for row, bb in zip(W1, b1)]
                h = [max(0.0, p) for p in pre]
            else:
                h = x
            p = softmax([sum(w * v for w, v in zip(row, h)) + bb for row, bb in zip(W, b)])
            g = [p[k] - (k == lab[t]) for k in range(K)]       # dLoss/dlogits
            if hidden:                                         # 反向传播进 W1
                gh = [sum(g[k] * W[k][j] for k in range(K)) * (pre[j] > 0) for j in range(hidden)]
                for j in range(hidden):
                    if gh[j]:
                        row = W1[j]
                        for i in range(D): row[i] -= lr * gh[j] * x[i]
                        b1[j] -= lr * gh[j]
            for k in range(K):
                row = W[k]
                for j in range(n_in): row[j] -= lr * g[k] * h[j]
                b[k] -= lr * g[k]
    def predict(x):
        h = [max(0.0, sum(w * v for w, v in zip(row, x)) + bb) for row, bb in zip(W1, b1)] if hidden else x
        z = [sum(w * v for w, v in zip(row, h)) + bb for row, bb in zip(W, b)]
        return z.index(max(z))
    return predict

def acc(pred, data, lab): return sum(pred(x) == lab[t] for x, t in data) / len(data)
for name, hidden in [("linear", 0), ("MLP-64", 64)]:
    a_task = acc(train_probe(list(train), label, hidden), test, label)
    a_ctrl = acc(train_probe(list(train), control, hidden), test, control)
    print(f"{name:7s} probe: task {a_task:.3f}  control {a_ctrl:.3f}  selectivity {a_task - a_ctrl:+.3f}")
```

```text
linear  probe: task 0.817  control 0.588  selectivity +0.229
MLP-64  probe: task 0.983  control 0.963  selectivity +0.021
```

第二个清单为三个函数计算梯度、梯度×输入、积分梯度（$1000$ 步的中点和）与精确夏普利值：[[#ex-ig-sat]] 的饱和单元、[[#ex-max]] 的最大值，以及一个带交互项的小型光滑"网络"，$F = \sigma(3x_1 + 2x_2x_3 - 1)$。

```python
import math, itertools

def f_sat(x): return 1 - max(0.0, 1 - x[0] - x[1])
def f_max(x): return max(x[0], x[1])
def f_net(x): return 1 / (1 + math.exp(-(3 * x[0] + 2 * x[1] * x[2] - 1)))

def grad(f, x, eps=1e-6):                    # 中心差分
    return [(f([v + eps * (i == j) for j, v in enumerate(x)])
             - f([v - eps * (i == j) for j, v in enumerate(x)])) / (2 * eps) for i in range(len(x))]

def integrated_gradients(f, x, base, m=1000):
    tot = [0.0] * len(x)
    for k in range(m):                       # [0, 1] 上的中点法则
        t = (k + 0.5) / m
        g = grad(f, [b + t * (v - b) for v, b in zip(x, base)])
        tot = [s + gi / m for s, gi in zip(tot, g)]
    return [(v - b) * s for v, b, s in zip(x, base, tot)]

def shapley(f, x, base):                     # 精确；缺席的特征取基线值
    n = len(x); phi = [0.0] * n
    for i in range(n):
        others = [j for j in range(n) if j != i]
        for r in range(n):
            for S in itertools.combinations(others, r):
                w = math.factorial(r) * math.factorial(n - r - 1) / math.factorial(n)
                with_i = [x[j] if (j in S or j == i) else base[j] for j in range(n)]
                without = [x[j] if j in S else base[j] for j in range(n)]
                phi[i] += w * (f(with_i) - f(without))
    return phi

for name, f, x in [("1-ReLU(1-x1-x2)", f_sat, [1.0, 1.0]), ("max(x1,x2)", f_max, [1.0, 2.0]),
                   ("sigmoid net", f_net, [1.0, 1.0, 1.0])]:
    base = [0.0] * len(x)
    g = grad(f, x); gxi = [gi * v for gi, v in zip(g, x)]
    ig = integrated_gradients(f, x, base); sh = shapley(f, x, base)
    r = lambda v: [round(u, 4) for u in v]
    print(f"{name}: f(x) - f(base) = {f(x) - f(base):.4f}")
    print("   gradient       ", r(g), " grad x input", r(gxi), " sum", round(sum(gxi), 4))
    print("   integrated grad", r(ig), " sum", round(sum(ig), 4))
    print("   Shapley        ", r(sh), " sum", round(sum(sh), 4))
```

```text
1-ReLU(1-x1-x2): f(x) - f(base) = 1.0000
   gradient        [0.0, 0.0]  grad x input [0.0, 0.0]  sum 0.0
   integrated grad [0.5, 0.5]  sum 1.0
   Shapley         [0.5, 0.5]  sum 1.0
max(x1,x2): f(x) - f(base) = 2.0000
   gradient        [0.0, 1.0]  grad x input [0.0, 2.0]  sum 2.0
   integrated grad [0.0, 2.0]  sum 2.0
   Shapley         [0.5, 1.5]  sum 2.0
sigmoid net: f(x) - f(base) = 0.7131
   gradient        [0.053, 0.0353, 0.0353]  grad x input [0.053, 0.0353, 0.0353]  sum 0.1236
   integrated grad [0.4791, 0.117, 0.117]  sum 0.7131
   Shapley         [0.4916, 0.1108, 0.1108]  sum 0.7131
```

积分梯度与夏普利值都满足完备性；梯度×输入不满足（对 sigmoid 网络，它只恢复了 $0.7131$ 的改变量中的 $0.1236$，因为 sigmoid 在输入处几乎饱和）。两个完备的方法在饱和单元上完全一致，在最大值上意见相左，在光滑网络上则几乎一致。

::: history
在隐藏层上训练线性分类器，早在对神经表征的早期研究中即已出现；Alain 与 Bengio（2016）把它们命名为探针，而 Adi 等人（2017）、Conneau 等人（2018）、Tenney 等人（2019）与 Hewitt 与 Manning（2019）使探针成为句子编码器与 BERT 的标准工具。Hewitt 与 Liang（2019）引入对照任务，Pimentel 等人（2020）与 Voita 与 Titov（2020）分别引入信息论探针与 MDL 探针，Ravfogel 等人（2020）与 Elazar 等人（2021）引入零空间投影与失忆探针；Belinkov（2022）综述了这一方法的前景与缺陷。梯度显著性由 Simonyan 等人（2014）引入；随后的分层相关传播（Bach 等人，2015）、DeepLIFT（Shrikumar 等人，2017）、积分梯度（Sundararajan 等人，2017）与 SHAP（Lundberg 与 Lee，2017），建立在夏普利值（1953）与 LIME（Ribeiro 等人，2016）之上。Adebayo 等人（2018）提出了可靠性检验。注意力之争始于 Jain 与 Wallace（2019）与 Wiegreffe 与 Pinter（2019）；Abnar 与 Zuidema（2020）与 Kobayashi 等人（2020）改进了基于注意力的归因。nostalgebraist 的 logit 透镜 2020 年出现在 LessWrong 上，Belrose 等人于 2023 年发表了校准透镜。Molnar 的《可解释机器学习》（*Interpretable Machine Learning*，第二版 2022）为实践者汇集了归因方法。
:::

::: summary
- **探针**从冻结的激活预测一个属性；探针准确率表明信息**可解码**，而非模型**使用**它。**对照任务**（对每个词型给随机标签）暴露死记硬背；**选择性** = 任务准确率 − 对照准确率，偏袒简单的线性探针（Hewitt 与 Liang, 2019）。信息论探针与 MDL 探针采取互补的立场。因果检验（失忆探针、干预）检验使用。
- **显著性**与**梯度×输入**便宜，但在**饱和**下失效；梯度×输入只对线性模型精确。
- **积分梯度**沿一条从基线出发的直线路径对梯度积分；它实现不变并满足**完备性** $\sum_i\operatorname{IG}_i = F(\mathbf{x}) - F(\mathbf{x}')$，证明沿路径用微积分基本定理。基线定义了问题。
- **夏普利值**是满足有效性、对称性、零玩家与可加性的唯一归因；SHAP 对其作近似，而"缺席"特征的定义很重要。有原则的方法可以在简单函数上意见相左。
- **注意力权重**说的是头从哪里读，不是它搬动什么、有多重要（Jain 与 Wallace, 2019；Wiegreffe 与 Pinter, 2019；Kobayashi 等人, 2020）。
- **logit 透镜**用输出头解码中间的残差流；**校准透镜**为每层加上一个训练出来的仿射翻译器，跨模型家族更可靠。
:::

## 习题

::: exercise 选择性 {level=1 check="0.15"}
一个探针在词性标注上达到 $0.92$ 的准确率，在对照任务上是 $0.77$。它的选择性是多少？第二个探针达到 $0.89$ 与 $0.45$。哪个是"这一层以可取用的形式编码词性"的更好证据？
::: solution
选择性 $0.92 - 0.77 = 0.15$；第二个探针的是 $0.89 - 0.45 = 0.44$。第二个探针的任务准确率略低而选择性高得多，是更好的证据：它的成功远不那么依赖背下词型。
:::
:::

::: exercise 线性模型的梯度×输入 {level=1}
对 $F(\mathbf{x}) = 2x_1 - 3x_2 + 0.5x_3 + 1$ 在 $\mathbf{x} = (1, 2, 4)$ 处，计算梯度×输入，以及基线为 $\mathbf{0}$ 的积分梯度，并验证完备性。
::: solution
梯度×输入：$(2, -6, 2)$。积分梯度：梯度是常数，所以 $\operatorname{IG}_i = x_iw_i$，数值相同。和为 $-2$，而 $F(\mathbf{x}) - F(\mathbf{0}) = (2 - 6 + 2 + 1) - 1 = -2$。
:::
:::

::: exercise 一次 logit 透镜 {level=1 check="0.5065"}
用 [[#ex-lens]] 的解嵌入，某个较早层之后的归一化残差流是 $(0.5, 0.5)$。计算 logit 透镜下"Paris"的概率，精确到小数点后四位。
::: solution
logit：Paris $0.5 + 0.5 = 1$，Lyon $0.5$，the $0.5 - 0.5 = 0$。softmax：$e^1 = 2.7183$，$e^{0.5} = 1.6487$，$e^0 = 1$，总和 $5.3670$，于是 $p(\text{Paris}) = 2.7183/5.3670 = 0.5065$：较早的层已把"Paris"排在第一，但信心远不如第 $6$ 层（$0.721$）。
:::
:::

::: exercise 手算积分梯度 {level=2 check="2/3"}
设 $F(x_1, x_2) = x_1^2x_2$。计算 $\mathbf{x} = (1, 1)$ 处、基线为 $\mathbf{0}$ 的 $\operatorname{IG}_1$ 与 $\operatorname{IG}_2$，验证完备性，并把 $\operatorname{IG}_1$ 作为答案。
::: solution
沿 $(t, t)$：$\partial F/\partial x_1 = 2x_1x_2 = 2t^2$，$\partial F/\partial x_2 = x_1^2 = t^2$。于是 $\operatorname{IG}_1 = \int_0^12t^2\,dt = 2/3$，$\operatorname{IG}_2 = \int_0^1t^2\,dt = 1/3$；和为 $1 = F(1,1) - F(0,0)$。平方的输入拿到双倍的功劳，正与它的指数相符。
:::
:::

::: exercise 乘积的夏普利值 {level=2}
计算 $F(x_1, x_2, x_3) = x_1x_2 + x_3$ 在 $\mathbf{x} = (2, 3, 1)$ 处、基线为 $\mathbf{0}$ 的夏普利值，并与积分梯度比较。
::: solution
$v(S)$：$v(\varnothing) = 0$，$v(\{1\}) = v(\{2\}) = 0$，$v(\{3\}) = 1$，$v(\{1,2\}) = 6$，$v(\{1,3\}) = v(\{2,3\}) = 1$，$v(N) = 7$。由可加性，把 $F$ 拆成 $x_1x_2$ 与 $x_3$。只含 $x_3$ 时，玩家 $3$ 拿 $1$、其余拿 $0$（零玩家）。对 $x_1x_2$，玩家 $1$ 与 $2$ 对称、玩家 $3$ 是零玩家，所以 $1, 2$ 各拿 $6/2 = 3$。于是 $\phi = (3, 3, 1)$，和为 $7$。积分梯度：沿 $(2t, 3t, t)$，$\partial F/\partial x_1 = x_2 = 3t$，所以 $\operatorname{IG}_1 = 2\int_0^13t\,dt = 3$；类似地 $\operatorname{IG}_2 = 3\int_0^12t\,dt = 3$，$\operatorname{IG}_3 = 1$。这里两种方法一致。
:::
:::

::: exercise 设计一个对照任务 {level=2}
你想在模型的残差流中探针每个词元是否处于引号之内。按 [[#def-selectivity]] 的意义设计一个对照任务，并解释为什么一个天真的对照（对每个*词元*给随机标签）不合适。
::: solution
给每个词型一个随机二值标签，其总体频率与"处于引号之内"相同，并把该词型的每个词元都标成它。在这个对照上成功的探针，靠的只能是辨认词的身份。对*词元*给随机标签根本学不会（那是噪声），所以无论探针容量多大，其得分都在瞎猜附近——这样的对照对死记硬背什么也测不出来。对照的要点，是它必须*能靠背词型学会、且只能这样学会*，以匹配它要暴露的那个混淆。由于是否处于引号内依赖上下文，一个有选择性的探针应当在任务上远好于在对照上。
:::
:::

::: exercise ReLU 网络的完备性 {level=3}
设 $F(\mathbf{x}) = \mathbf{c}\T\operatorname{ReLU}(W\mathbf{x} + \mathbf{b})$ 是一个单隐层 ReLU 网络。证明沿从 $\mathbf{x}'$ 到 $\mathbf{x}$ 的线段，函数 $t\mapsto F(\gamma(t))$ 连续且分段线性、至多有 $m$ 个分段点（$m$ 为隐单元个数），并给出积分梯度对线性段求和的封闭形式。为什么 $m$ 步的黎曼和一般不能精确算出它？
::: solution
隐单元 $j$ 的预激活 $z_j(t) = \mathbf{w}_j\T\gamma(t) + b_j$ 关于 $t$ 是仿射的；它至多变号一次，在 $t_j = -z_j(0)/(z_j(1) - z_j(0))$ 处（当它落在 $(0,1)$ 内时）。在相邻分段点之间，活跃单元集合 $A$ 固定，$F(\gamma(t)) = \sum_{j\in A}c_jz_j(t)$ 是仿射的，且 $\nabla F = \sum_{j\in A}c_j\mathbf{w}_j$ 是常数。连续性由 ReLU 连续保证。若分段点把 $[0,1]$ 分成区间 $I_1,\dots,I_r$（$r\le m + 1$），活跃集合为 $A_1,\dots,A_r$、长度为 $\lvert I_k\rvert$，则 $\operatorname{IG}_i = (x_i - x'_i)\sum_k\lvert I_k\rvert\sum_{j\in A_k}c_jW_{ji}$。完备性由每段上的微积分基本定理直接得出。黎曼和在固定的网格点上求梯度；长度不是网格间距整数倍的区间会被错误加权，所以只有当所有分段点都落在网格上时和式才精确——这就是为什么实际实现要检验完备性缺口、并不断增大步数直到它变小。
:::
:::

::: exercise 注意力权重与贡献 {level=3}
某个位置上的一个头以权重 $\alpha = (0.7, 0.2, 0.1)$ 注意三个较早的位置。该头若从这些位置写入，所写出的向量 $\mathbf{v}_jW_O$ 的范数分别为 $0.1$、$2.0$ 与 $1.5$。计算加权贡献 $\alpha_j\mathbf{v}_jW_O$ 的范数，并按它们给位置排序。这对注意力热力图说明什么？要确立哪个位置对输出重要，该做什么实验？
::: solution
范数 $0.7\times0.1 = 0.07$、$0.2\times2.0 = 0.40$、$0.1\times1.5 = 0.15$。按贡献的排序是位置 $2$，然后 $3$，然后 $1$——对头名位置而言与注意力的排序恰好相反。一张 $\alpha$ 的热力图会突出位置 $1$，而它贡献最少（注意力汇聚模式）。即便范数也不是对*输出*的重要性：一次大写入可能指向后来各层不予理会的一个方向。要确立重要性，就干预——对每个位置的贡献做修补或消融（或把它的注意力权重设为零并重新归一化）——并度量所关注 logit 的变化（[[interpretability/causal-interventions]]）；或者，若只要直接效应，把每个贡献投影到被预测词元的解嵌入方向上（[[interpretability/residual-stream]]）。
:::
:::

::: exercise 基线之问 {level=2}
一个情感模型在某条评论上给出 $F(\mathbf{x}) = 2.1$（"positive"的 logit），在等长的全 padding 输入上给出 $F(\mathbf{x}') = 0.3$。积分梯度给词"not"记 $+1.2$，给其余所有词合计记 $+0.6$。(a) 检验完备性。(b) 一位同事说："'not' 让这条评论变积极了"。解释为什么这个归因并不支持这种读法，并建议一个能更好分离"not"之效应的基线。
::: solution
(a) $1.2 + 0.6 = 1.8 = 2.1 - 0.3$，完备性成立。(b) 这个归因比较的是这条评论与一个全 padding 输入：它说的是，在从"无"到完整评论这条路径上，"not"的嵌入坐标解释了 logit 上升中的 $1.2$。这与"not"在评论的语境中推动积极并不是一回事——这条路径穿过"not"与其他词的微弱版本同时出现的非自然插值。能分离"not"的基线是同一条评论、把"not"换成一个中性词元（或删去它）：那时归因解释的是 $F(\text{评论}) - F(\text{去掉 not 的评论})$，那才是同事心中想问的反事实问题。最简单的办法，是直接比较两个输出。
:::
:::
