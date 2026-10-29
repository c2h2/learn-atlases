[[information-retrieval/vector-space]] 的 tf–idf 权重好用，却是试出来的：为什么是 $N/\mathrm{df}$ 的对数？为什么是 tf 的对数？文档长度应当如何掺进来？检索系统对相关性并不确定——它看见的是词，不是用户的需求——而刻画不确定性的自然语言是概率。若能对每篇文档估出用户判其相关的概率，正确的排序便一目了然：概率最大者排最前。本章顺着这条思路，从一条原理推到实践中在用的公式。

我们从**概率排序原理**出发，证明它在什么意义上是最优的。拿二元的词项出现情形使它变得可算，得到**二元独立模型**，其词项权重——**Robertson–Spärck Jones 权重**——解释了 idf。经 2-Poisson 卓越性（eliteness）模型引入词频、再对其形状作近似，得到 **BM25**，带两个参数 $k_1$（tf 饱和）与 $b$（长度归一化）——数十年后的今天，它仍是标准的初排函数。最后是**语言建模**方法：按文档的语言模型生成查询的可能性给文档打分；配上我们给出贝叶斯推导的 **Dirichlet 平滑**，它会自发产生类 idf 加权与长度归一化，无须旁人指点。所有分数都是逐词项贡献之和，所以 [[information-retrieval/vector-space]] 的 WAND 与 MaxScore 算法原样适用。用到的概率知识止于 [Maths Atlas: conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability) 的水平。

## 概率排序原理

设 $R \in \set{0, 1}$ 是固定用户与信息需求之下“文档与查询相关”这一随机变量。检索系统至多能从它观察到的 $d$ 与 $q$ 的特征，为每篇文档估计 $\Prob(R = 1 \mid d, q)$。

::: definition 概率排序原理 {#def-prp}
**概率排序原理**（probability ranking principle，PRP）主张：系统应按文档的相关概率 $\Prob(R = 1 \mid d, q)$ 从大到小排序，其中概率由可得数据尽可能准确地估计。
:::

::: theorem PRP 的最优性 {#thm-prp}
设每篇文档 $d$ 以概率 $p_d = \Prob(R = 1 \mid d, q)$ 相关，一篇文档的相关与否不影响另一篇对用户的价值，且用户检视排序的前 $k$ 篇文档，某个 $k$ 未知。则对每个 $k$，按 $p_d$ 从大到小排序在所有排序中最大化前 $k$ 篇中相关文档的期望个数——从而也最大化前 $k$ 名的期望查准率。此外，若检回一篇不相关文档损失 $c_1$、漏掉一篇相关文档损失 $c_0$，则期望损失最小的检回集合恰是 $p_d > c_1/(c_0 + c_1)$ 的那些文档，它们构成 PRP 排序的一个前段。
:::

::: proof
对排序 $\pi$，设 $X_i$ 表示“排名 $i$ 处的文档相关”的示性变量。由期望的线性性，前 $k$ 篇中相关文档的期望个数为 $\E[\sum_{i \le k} X_i] = \sum_{i \le k} p_{\pi(i)}$。这是诸 $p_d$ 中 $k$ 个数之和，而取最大的 $k$ 个时和最大；按递减次序排序对每个 $k$ 同时做到这一点。除以 $k$ 即得前 $k$ 名的期望查准率。

关于损失：检回 $d$ 带来期望损失 $c_1(1 - p_d)$，不检回它带来 $c_0 p_d$，不同文档的损失可加。所以每篇文档恰在 $c_1(1 - p_d) < c_0 p_d$ 时该被检回，即 $p_d > c_1/(c_0 + c_1)$。满足条件的文档由 $p_d$ 最大的那些组成，是 PRP 排序的一个前缀。
:::

证明很短，其假设值得细读。它假设概率是*已知的*，而真实系统只在估计；只要估计保序就够——我们从不真要算概率，只要一个**保序等价**的分数，一个以同样方式排定文档的函数。它假设文档是**独立**评判的：相关文档的第二份拷贝和第一份一样值钱。对想要*多样*结果的用户——歧义查询 `jaguar` 的几种解释，或新闻搜索里的几种立场——假设失效，严格按概率排序会给出十条近乎雷同的结果。多样化方法以及 [[information-retrieval/web-search]] 的近重复检测处理的正是要害。而且它优化的是固定 $k$ 下的期望查准率，在 [[information-retrieval/evaluation]] 的众多度量里这只是一种。

## 二元独立模型

要估计 $\Prob(R = 1 \mid d, q)$ 就需要文档的模型。最简单的模型把文档表示为二元向量 $\vec x = (x_1, \dots, x_V)$，其中 $x_t = 1$ 表示词项 $t$ 出现在文档中。

::: definition 二元独立模型 {#def-bim}
**二元独立模型**（binary independence model，BIM）有三条假设：(1) 文档是词项出现情形的二元向量 $\vec x$；(2) **条件独立**：给定相关性，词项独立出现，故对 $r = 0, 1$ 有 $\Prob(\vec x \mid R = r, q) = \prod_t \Prob(x_t \mid R = r, q)$；(3) 不在查询中的词项，在相关与非相关文档中出现得一样频繁。记
$$
p_t = \Prob(x_t = 1 \mid R = 1, q), \qquad u_t = \Prob(x_t = 1 \mid R = 0, q)
$$
为词项 $t$ 出现在相关文档、非相关文档中的概率。
:::

::: theorem BIM 的检索状态值 {#thm-bim}
在 BIM 之下，按 $\Prob(R = 1 \mid \vec x, q)$ 排序等价于按**检索状态值**
$$
\mathrm{RSV}(d) = \sum_{t \in q,\ x_t = 1} c_t, \qquad c_t = \log \frac{p_t\,(1 - u_t)}{u_t\,(1 - p_t)}.
$$ {#eq-rsv}
:::

::: proof
概率与其几率 $O = P/(1 - P)$ 一一对应且同序，所以可按几率排序，并由贝叶斯（Bayes）定理
$$
O(R \mid \vec x, q) = \frac{\Prob(R = 1 \mid \vec x, q)}{\Prob(R = 0 \mid \vec x, q)} = \frac{\Prob(R = 1 \mid q)}{\Prob(R = 0 \mid q)} \cdot \frac{\Prob(\vec x \mid R = 1, q)}{\Prob(\vec x \mid R = 0, q)}.
$$
第一个因子与文档无关，可以丢掉。由条件独立，第二个因子是全体词项上 $\Prob(x_t \mid R=1, q)/\Prob(x_t \mid R=0, q)$ 的连乘，而由假设 (3)，每个不在查询中的词项因子都等于 $1$。对查询词项，$x_t = 1$ 时因子为 $p_t/u_t$，$x_t = 0$ 时为 $(1 - p_t)/(1 - u_t)$。于是
$$
O(R \mid \vec x, q) \propto \prod_{t \in q,\ x_t = 1} \frac{p_t}{u_t} \prod_{t \in q,\ x_t = 0} \frac{1 - p_t}{1 - u_t} = \prod_{t \in q,\ x_t = 1} \frac{p_t (1 - u_t)}{u_t (1 - p_t)} \cdot \prod_{t \in q} \frac{1 - p_t}{1 - u_t},
$$
其中对每个在查询中出现的词项乘除了一次 $(1 - p_t)/(1 - u_t)$。最后一个连乘遍历所有查询词项，对每篇文档都一样。取对数保序，剩下 [[#eq-rsv]]。
:::

权重 $c_t$ 是一个**对数几率比**：$t$ 出现在相关文档中的几率除以出现在非相关文档中的几率，再取对数。两类文档中出现可能性相同的词项权重为 $0$；预示相关性的词项得正权重。

### 估计权重

若用户已判定过一些文档——设已知 $R$ 篇相关，其中 $r_t$ 篇含词项 $t$；总共 $N$ 篇文档，其中 $n_t = \mathrm{df}_t$ 篇含 $t$——自然的估计是 $p_t \approx r_t/R$、$u_t \approx (n_t - r_t)/(N - R)$。给每个计数加 $\tfrac12$ 以避免零与无穷权重，得 **Robertson–Spärck Jones 权重**
$$
w^{\mathrm{RSJ}}_t = \log \frac{(r_t + 0.5)\,/\,(R - r_t + 0.5)}{(n_t - r_t + 0.5)\,/\,(N - n_t - R + r_t + 0.5)}.
$$ {#eq-rsj}

**毫无相关性信息**时（$R = r_t = 0$），权重化为
$$
w^{\mathrm{RSJ}}_t = \log \frac{N - n_t + 0.5}{n_t + 0.5},
$$ {#eq-rsj-idf}
$n_t \ll N$ 时约等于 $\log(N/n_t)$——逆文档频率。BIM 于是*解释*了 idf：它是这样情形下的对数几率比——假定查询词项在相关文档中出现与否各半（$p_t = 0.5$，互相抵消），而它在非相关文档中的概率用全集中（大多非相关的）出现频率来估。这一推导归功于克罗夫特（Croft）与哈珀（Harper）（1979）以及罗伯逊（Robertson），让斯帕克·琼斯（Spärck Jones）经验性的 idf 有了理论根基。

::: example 有反馈与无反馈的词项权重 {#ex-rsj}
文集有 $N = 1\,000$ 篇文档；某词项出现在 $n_t = 100$ 篇中。用户已判定 $R = 20$ 篇文档相关，其中 $15$ 篇含该词项。用与不用这一信息分别计算 RSJ 权重（自然对数）。
::: solution
有反馈时，[[#eq-rsj]] 给出
$$
w = \ln \frac{15.5 / 5.5}{85.5 / (1000 - 100 - 20 + 15 + 0.5)} = \ln \frac{2.818}{85.5/895.5} = \ln(2.818 \times 10.474) = \ln 29.52 = 3.385.
$$
无反馈时，[[#eq-rsj-idf]] 给出 $\ln(900.5/100.5) = \ln 8.96 = 2.193$。该词项在相关文档中出现了 $75\%$，全集中却只有 $10\%$，反馈带来的证据把它的权重抬升一半以上。同一公式若拿初次检索的头几篇文档代替判定文档，就是伪相关反馈的概率形式。
:::
:::

::: warning 常见词的 idf 为负
$n_t > N/2$ 时公式 [[#eq-rsj-idf]] **为负**：出现在大多数文档中的词项，被当作*不利于*相关的证据。《爱丽丝》的 $800$ 个段落里，`the` 出现在 $643$ 段，得 $\ln(157.5/643.5) = -1.407$，于是一个含 `the` 的段落比一个其他条件相同却不含 `the` 的段落得分更低。这是模型按其设计运转——在其假设之下，这种词项的出现更是非相关文档的典型特征——但它让用户吃惊，也会撑坏假定贡献非负的算法，比如 WAND（[[information-retrieval/vector-space#thm-wand]]）。所以许多实现把权重钳制在一个小的正数上，或像 Lucene 那样用 $\log\bigl(1 + (N - n_t + 0.5)/(n_t + 0.5)\bigr)$；对《爱丽丝》里的 `the`，这给出 $0.219$。
:::

## 从二元出现到词频：BM25

BIM 不理一个词项出现了多少次。斯蒂文·哈特（Harter）（1975）提出：一个词项的出现次数由文档对它是否**卓越**（elite）——真的在讲这个词项所指的概念——支配；给定卓越，词频服从泊松分布，且卓越文档的均值高于非卓越文档。

::: definition 2-Poisson 模型 {#def-2poisson}
对固定词项，每篇文档要么**卓越**（$E$）要么不卓越（$\bar E$）。给定卓越，$\mathrm{tf} \sim \mathrm{Poisson}(\lambda_1)$；给定不卓越，$\mathrm{tf} \sim \mathrm{Poisson}(\lambda_0)$，$\lambda_1 > \lambda_0$。相关性只通过卓越性影响词频：$\pi_1 = \Prob(E \mid R = 1)$、$\pi_0 = \Prob(E \mid R = 0)$，且 $\pi_1 > \pi_0$。**词频权重**是观察到 $\mathrm{tf}$ 对观察到 $0$ 的对数几率比：
$$
w(\mathrm{tf}) = \log \frac{\Prob(\mathrm{tf} \mid R = 1)\,\Prob(0 \mid R = 0)}{\Prob(\mathrm{tf} \mid R = 0)\,\Prob(0 \mid R = 1)}.
$$
:::

这个权重是把 $c_t$ 从“出现对不出现”推广到“出现 $\mathrm{tf}$ 次对不出现”；按 [[#thm-bim]] 的论证，以词频代二元特征，文档的得分就是查询词项上 $w(\mathrm{tf}_{t,d})$ 之和。

::: proposition 2-Poisson 权重的形状 {#prop-saturation}
在 2-Poisson 模型之下，$w(0) = 0$，$w(\mathrm{tf})$ 关于 $\mathrm{tf}$ 严格递增，且有界：
$$
\lim_{\mathrm{tf} \to \infty} w(\mathrm{tf}) = \log \frac{\pi_1}{\pi_0} + \log \frac{\Prob(0 \mid R = 0)}{\Prob(0 \mid R = 1)}.
$$
:::

::: proof
记 $P_\lambda(n) = e^{-\lambda}\lambda^n/n!$。由模型，$\Prob(n \mid R = r) = \pi_r P_{\lambda_1}(n) + (1 - \pi_r) P_{\lambda_0}(n)$。把 $\Prob(n \mid R=1)/\Prob(n \mid R=0)$ 的分子分母同除 $P_{\lambda_0}(n)$，并令 $x = P_{\lambda_1}(n)/P_{\lambda_0}(n) = e^{-(\lambda_1 - \lambda_0)}(\lambda_1/\lambda_0)^n$：
$$
\frac{\Prob(n \mid R = 1)}{\Prob(n \mid R = 0)} = \frac{\pi_1 x + (1 - \pi_1)}{\pi_0 x + (1 - \pi_0)} =: g(x).
$$
因 $\lambda_1 > \lambda_0$，$x$ 关于 $n$ 严格递增且趋于无穷。$g$ 是线性函数之商，导数 $g'(x) = \frac{\pi_1(1 - \pi_0) - \pi_0(1 - \pi_1)}{(\pi_0 x + 1 - \pi_0)^2} = \frac{\pi_1 - \pi_0}{(\pi_0 x + 1 - \pi_0)^2} > 0$，故 $g$ 严格递增，且 $x \to \infty$ 时 $g(x) \to \pi_1/\pi_0$。而 $w(n) = \log g(x(n)) - \log g(x(0))$，第二项是常数 $\log[\Prob(0 \mid R=1)/\Prob(0 \mid R=0)]$。于是 $w(0) = 0$，$w$ 严格递增，其极限为 $\log(\pi_1/\pi_0) - \log g(x(0))$，即所声称的值。
:::

所以词项的贡献应随 tf 上升而**饱和**：头几次出现提供了文档对该词项卓越的大部分证据，其后的出现越加越少。渐近线恰似卓越性本身的 BIM 权重。原始 tf（无界）与 $1 + \log\mathrm{tf}$（无界，只是长得慢）都搞错了这一点。

::: widget plot
f: ln((p*exp(-a)*a^x + (1-p)*exp(-c)*c^x)/(r*exp(-a)*a^x + (1-r)*exp(-c)*c^x)) - ln((p*exp(-a) + (1-p)*exp(-c))/(r*exp(-a) + (1-r)*exp(-c))); 2.2*x/(1.2 + x)
sliders: a=2:0.5:10; c=0.1:0.1:1.5; p=0.3:0.05:0.95; r=0.02:0.02:0.4
x: 0, 15
y: 0, 5
labels: w(\mathrm{tf})\ \text{（2-Poisson）}; \frac{(k_1+1)\,\mathrm{tf}}{k_1+\mathrm{tf}},\ k_1 = 1.2
caption: [[#prop-saturation]] 的 2-Poisson 词项权重（$a = \lambda_1$、$c = \lambda_0$、$p = \pi_1$、$r = \pi_0$；阶乘相消，故按连续 tf 画线）与 BM25 的简单饱和函数并列。拖动参数：精确权重总是从 $0$ 出发、上升、然后趋平，但形状与天花板会变。BM25 只保留形状，用一个参数 $k_1$，天花板则交给 idf 权重。
:::

::: example 2-Poisson 权重的数值 {#ex-2poisson}
取 $\lambda_1 = 4$（卓越文档平均用该词四次），$\lambda_0 = 0.5$，$\pi_1 = 0.6$，$\pi_0 = 0.1$。对小 tf 计算 $w(\mathrm{tf})$ 及其极限。
::: solution
先算 $\Prob(0 \mid R = 1) = 0.6e^{-4} + 0.4e^{-0.5} = 0.2536$、$\Prob(0 \mid R = 0) = 0.1e^{-4} + 0.9e^{-0.5} = 0.5477$。按定义（自然对数）对 $\mathrm{tf} = 0, 1, \dots, 8$ 求值得
$$
0,\ 0.242,\ 1.125,\ 2.145,\ 2.497,\ 2.553,\ 2.561,\ 2.562,\ 2.562,
$$
而 [[#prop-saturation]] 的极限为 $\ln(0.6/0.1) + \ln(0.5477/0.2536) = 1.792 + 0.770 = 2.562$。这里的曲线呈 S 形：第一次出现是弱证据，因为非卓越文档（泊松均值 $0.5$）也会产生单次出现；第二、三次出现携带大部分证据；约五次之后文档几乎必定卓越，再多的出现什么也不添。BM25 的 $\mathrm{tf}/(k_1 + \mathrm{tf})$ 从起点就是凹的，丢掉了开头的 S 形——这一简化被证明在实践中无害。
:::
:::

精确的 2-Poisson 权重每个词项要四个未知参数，没有相关性判定就无法可靠估计。斯蒂文·罗伯逊（Robertson）与斯蒂夫·沃克（Walker）（1994）把它换成一个具有同样定性行为——零处为零、递增、饱和——而只有一个全局参数的函数：
$$
\frac{\mathrm{tf}}{k_1 + \mathrm{tf}}, \qquad\text{缩放为}\qquad \frac{(k_1 + 1)\,\mathrm{tf}}{k_1 + \mathrm{tf}},
$$
它在 $\mathrm{tf} = 1$ 处为 $1$，趋于 $k_1 + 1$。$k_1$ 小则饱和快（$k_1 = 0$ 时只算出现与否，如 BIM）；$k_1$ 大则逼近原始 tf。

### 文档长度

长文档里每个词项的出现都更多，要么因为它覆盖的主题多（**范围**假说：它更可能相关），要么因为它啰嗦（**冗长**假说：计数被虚抬，应当缩下去）。BM25 取混合立场：用参数 $b \in [0, 1]$ 部分地按文档长度归一化 tf。

::: definition BM25 {#def-bm25}
对查询 $q$ 与含 $\mathrm{dl}_d$ 个标记的文档 $d$，平均文档长度为 $\mathrm{avgdl}$，**BM25** 分数为
$$
\mathrm{BM25}(q, d) = \sum_{t \in q} w_t \cdot \frac{(k_1 + 1)\, \mathrm{tf}_{t,d}}{K_d + \mathrm{tf}_{t,d}}, \qquad K_d = k_1 \Bigl( (1 - b) + b \,\frac{\mathrm{dl}_d}{\mathrm{avgdl}} \Bigr),
$$ {#eq-bm25}
其中 $w_t$ 是 RSJ 权重 [[#eq-rsj-idf]]（有相关性信息时用 [[#eq-rsj]]）。典型参数取 $k_1 \in [1.2, 2]$、$b = 0.75$。查询中重复的词项可用第三个饱和因子 $(k_3 + 1)\mathrm{qtf}/(k_3 + \mathrm{qtf})$ 加权。
:::

$b = 0$ 时无长度归一化；$b = 1$ 时，tf 在饱和之前被实际除以相对长度 $\mathrm{dl}_d/\mathrm{avgdl}$。对长度恰为平均的文档，无论 $b$ 是多少都有 $K_d = k_1$。（这个名字的意思不过是 Best Match 25：伦敦城市大学（City University London）的 Okapi 系统试过的系列加权函数中的第 25 号。）

::: widget plot
f: (k+1)*x/(k*((1-b) + b*L) + x)
sliders: k=0:0.1:3; b=0:0.05:1; L=0.25:0.25:4
x: 0, 20
y: 0, 4
labels: \frac{(k_1+1)\,\mathrm{tf}}{K + \mathrm{tf}},\ K = k_1\bigl((1-b) + b L\bigr)
caption: BM25 的词频因子关于 tf 的函数，其中 $k = k_1$，长度归一化权重 $b$，相对文档长度 $L = \mathrm{dl}/\mathrm{avgdl}$。取 $L = 1$ 改变 $k_1$，看饱和速度怎么变；再固定 $k_1 = 1.2$、$b = 0.75$，把 $L$ 从 $0.25$ 移到 $4$：在长度四倍于平均的文档里，一个词要出现得多得多才能挣到同样的权重。$b = 0$ 时 $L$ 不起作用。
:::

::: example 手算 BM25 {#ex-bm25}
《爱丽丝》的 $800$ 个段落平均长度 $\mathrm{avgdl} = 33.3$ 个标记。RSJ 权重（自然对数，[[#eq-rsj-idf]]）为：`mock` $2.617$，`turtle` $2.657$，`soup` $4.321$。段落 $516$ 有 $12$ 个标记，三个词项各出现一次；段落 $593$ 有 $40$ 个标记，`mock` 与 `turtle` 各一次，`soup` 没有。对查询 `mock turtle soup`、$k_1 = 1.2$、$b = 0.75$ 计算两者的 BM25 分数。
::: solution
*段落 516。* $K = 1.2\,(0.25 + 0.75 \times 12/33.3) = 1.2 \times 0.520 = 0.624$。每个词项 $\mathrm{tf} = 1$，因子为 $2.2 \times 1/(0.624 + 1) = 1.354$。分数为 $1.354 \times (2.617 + 2.657 + 4.321) = 1.354 \times 9.595 = 12.997$。

*段落 593。* $K = 1.2\,(0.25 + 0.75 \times 40/33.3) = 1.381$，因子 $2.2/2.381 = 0.924$，分数为 $0.924 \times (2.617 + 2.657) = 4.874$。

短段落两线皆胜：它含罕见词 `soup`，而其短小把每个匹配词项的因子从 $0.924$ 抬到 $1.354$。下面的程序打印 `12.9969` 与 `4.8736`。
:::
:::

下面是在《爱丽丝》上运行的 BM25，连同后文的查询似然模型，以便比较三种排序：

```python
import re, math, heapq
from collections import Counter

docs = [Counter(tokenize(p)) for p in paras]          # 前文那 800 个段落
N = len(docs)
dl = [sum(c.values()) for c in docs]                  # 每篇文档的标记数
avgdl = sum(dl) / N
df = Counter(t for c in docs for t in c)

def bm25_idf(t):                                      # 无相关性信息时的 RSJ 权重
    return math.log((N - df[t] + 0.5) / (df[t] + 0.5))

def bm25(q, d, k1=1.2, b=0.75):
    K = k1 * ((1 - b) + b * dl[d] / avgdl)
    return sum(bm25_idf(t) * docs[d][t] * (k1 + 1) / (K + docs[d][t])
               for t in set(tokenize(q)) if docs[d][t] > 0)

def top(score, q, k=5, **kw):
    return heapq.nlargest(k, ((score(q, d, **kw), d) for d in range(N)))
```
```text
BM25 k1=1.2 b=0.75
   10.637 doc 516 len  12: `It's the thing Mock Turtle Soup is made
    8.370 doc 593 len  40: So they began solemnly dancing round and round
    8.213 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
    7.539 doc 585 len  13: `Turn a somersault in the sea!' cried the
    7.284 doc 637 len  19: `But about his toes?' the Mock Turtle persisted.
BM25 k1=1.2 b=0
    9.106 doc 593 len  40: So they began solemnly dancing round and round
    8.657 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
    7.660 doc 516 len  12: `It's the thing Mock Turtle Soup is made
    7.548 doc 604 len  51: `You're wrong about the crumbs,' said the Mock
    6.459 doc 480 len  94: `When I'M a Duchess,' she said to herself,
```

查询为 `the mock turtle sang about soup`。与余弦 tf–idf 相比——它的前五名里有四个一句话段落——BM25 把段落 $593$（"…while the Mock Turtle sang this, very slowly and sadly"）提了上来——罕见词 `sang` 的权重为 $5.77$——还有索要歌曲《Turtle Soup》的段落 $646$。取 $b = 0$ 去掉长度归一化，$604$（$51$ 个标记）、$480$（$94$ 个）等较长段落随之上移。`the` 的负权重按段落长短给每个分数扣去一个小量。

BM25 的参数应在带有相关性判定、文集同类查询上调节；默认值是合理的出发点，不是最优。其扩展 **BM25F**（Robertson, Zaragoza and Taylor, 2004）处理带字段（标题、正文、锚文本）的文档：先对每个词项跨字段加权求和——每个字段各自作长度归一化——*再*饱和；若改为把各字段的 BM25 分数相加，词项会在每个字段各自饱和，多字段中的匹配会被过度奖赏。

::: quiz
BM25 取 $k_1 = 1.2$、$b = 0.75$，某查询词项在一篇长度恰为平均值的文档中出现两次。它的 tf 因子 $(k_1+1)\mathrm{tf}/(K + \mathrm{tf})$ 是多少？
- [ ] $2$
- [x] $4.4/3.2 = 1.375$
- [ ] $2.2$
- [ ] 取决于 $b$
::: solution
对平均长度的文档，$K = k_1((1 - b) + b) = k_1 = 1.2$，与 $b$ 无关。于是因子为 $2.2 \times 2/(1.2 + 2) = 4.4/3.2 = 1.375$。出现一次得 $1$，两次得 $1.375$，无穷多次趋近 $2.2$：第二次出现只添第一次权重的 $37.5\%$。
:::
:::

## 检索的语言模型

杰伊·庞特（Ponte）与布鲁斯·克罗夫特（Croft）（1998）提出另一种概率视角。不直接建模相关性，而是设想每篇文档 $d$ 由一个**语言模型** $\theta_d$ 生成——词项上的概率分布——并按查询由同一模型生成的概率给文档排序，即 $\Prob(q \mid \theta_d)$——**查询似然**模型。一段讲假海龟的文字，其语言模型里 `mock`、`turtle`、`soup` 的概率都高，于是它也多半生成了含这些词的查询。（语言模型本身，从 $n$-gram 到 transformer，是 [LLM Atlas](/learn/llm/lesson.php?c=text-and-language&l=ngram-models) 的主题；这里只需要一元模型。）

::: definition 一元模型的查询似然 {#def-ql}
**一元语言模型**（unigram language model）$\theta$ 给每个词项一个概率 $\theta_t$，$\sum_t \theta_t = 1$，并独立抽取词项生成查询 $q = t_1 t_2 \dots t_{\abs q}$：$\Prob(q \mid \theta) = \prod_{i} \theta_{t_i}$。文档的**查询似然分数**为 $\log \Prob(q \mid \theta_d) = \sum_{i} \log \theta_{d, t_i}$，其中 $\theta_d$ 由 $d$ 估计。
:::

**最大似然估计**是 $\theta_{d,t} = \mathrm{tf}_{t,d}/\mathrm{dl}_d$，即文档标记中 $t$ 的占比。它有个致命缺陷：只要缺*任何*一个查询词项，文档概率就是 $0$，查询似然成了严格的布尔 AND。一篇文档的文字只是其主题语言的一个小样本；假海龟的段落里没有 `soup`，不意味着它的作者绝不会用这个词。估计必须**平滑**——把一部分概率从见过的词项挪给没见过的——借助**文集模型** $\Prob(t \mid C) = \mathrm{cf}_t / \abs{C}$，其中 $\mathrm{cf}_t$ 是 $t$ 在文集中的出现总数，$\abs C$ 是标记总数。

- **Jelinek–Mercer** 平滑以固定权重 $\lambda \in (0, 1)$ 作插值：$\theta_{d,t} = (1 - \lambda)\, \mathrm{tf}_{t,d}/\mathrm{dl}_d + \lambda\, \Prob(t \mid C)$。
- **Dirichlet** 平滑加上 $\mu$ 个按文集分布的“伪标记”：$\theta_{d,t} = \dfrac{\mathrm{tf}_{t,d} + \mu\, \Prob(t \mid C)}{\mathrm{dl}_d + \mu}$。

Dirichlet 平滑有自然的贝叶斯正当性。

::: theorem Dirichlet 平滑是后验均值 {#thm-dirichlet}
设文档模型 $\theta_d$ 服从参数为 $\alpha_t = \mu\,\Prob(t \mid C)$ 的 Dirichlet 先验，文档是从 $\theta_d$ 独立抽取的 $\mathrm{dl}_d$ 次，计数为 $\mathrm{tf}_{t,d}$。则 $\theta_d$ 的后验分布是参数为 $\alpha_t + \mathrm{tf}_{t,d}$ 的 Dirichlet 分布，其均值为
$$
\E[\theta_{d,t} \mid d] = \frac{\mathrm{tf}_{t,d} + \mu\, \Prob(t \mid C)}{\mathrm{dl}_d + \mu}.
$$
:::

::: proof
参数为 $\alpha$ 的 Dirichlet 密度在概率单纯形上正比于 $\prod_t \theta_t^{\alpha_t - 1}$，文档计数的似然正比于 $\prod_t \theta_t^{\mathrm{tf}_t}$（多项式系数与 $\theta$ 无关）。由贝叶斯定理，后验正比于二者之积 $\prod_t \theta_t^{\alpha_t + \mathrm{tf}_t - 1}$，即参数 $\alpha_t + \mathrm{tf}_t$ 的未归一化 Dirichlet 密度。参数为 $\beta_t$ 的 Dirichlet 分布的均值是 $\beta_t / \sum_s \beta_s$。这里 $\sum_s (\alpha_s + \mathrm{tf}_s) = \mu \sum_s \Prob(s \mid C) + \mathrm{dl}_d = \mu + \mathrm{dl}_d$，即得公式。
:::

先验的作用相当于在读文档之前已经见过 $\mu$ 个文集语言的标记。短文档由先验主导；长文档由自己的计数主导——恰是应有的行为，长文档是更大、更可靠的样本。与 Jelinek–Mercer 不同，平滑的量随文档长度而变。Chengxiang Zhai（Zhai）与约翰·拉斐蒂（Lafferty）对平滑方法的研究（2001）发现 Dirichlet 平滑对短（标题）查询尤其有效，新闻文集上好的 $\mu$ 常在 $2\,000$ 上下；最佳 $\mu$ 随典型文档长度增长，《爱丽丝》的短段落用 $\mu = 100$。

### tf、idf 与长度在哪里？

查询似然与 tf–idf 长得毫不相像，行为却相像。

::: proposition 保序等价形式 {#prop-ql-rank}
在 Dirichlet 平滑下，按 $\log\Prob(q \mid \theta_d)$ 排序等价于按
$$
\sum_{t \in q,\ \mathrm{tf}_{t,d} > 0} \log\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu\, \Prob(t \mid C)}\Bigr) \;+\; \abs{q} \log \frac{\mu}{\mathrm{dl}_d + \mu}
$$
排序，其中和式对查询词项按它在查询中出现的次数计。
:::

::: proof
记 $p_t = \Prob(t \mid C)$。把每个平滑概率因式分解为
$$
\frac{\mathrm{tf}_{t,d} + \mu p_t}{\mathrm{dl}_d + \mu} = \frac{\mu p_t}{\mathrm{dl}_d + \mu}\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu p_t}\Bigr).
$$
取对数并对查询的词项求和，
$$
\log \Prob(q \mid \theta_d) = \sum_{t \in q} \log\Bigl(1 + \frac{\mathrm{tf}_{t,d}}{\mu p_t}\Bigr) + \sum_{t \in q}\log p_t + \abs{q}\log\frac{\mu}{\mathrm{dl}_d + \mu}.
$$
中间的和与文档无关，可以丢掉。第一个和里 $\mathrm{tf}_{t,d} = 0$ 的项贡献 $\log 1 = 0$。
:::

第一个和就是个类 tf–idf 的权重：随 $\mathrm{tf}_{t,d}$ 增长（对数地，一种饱和），$p_t$ 小时——即词项在文集中罕见时——变大：idf 的作用，无人手工放进去。第二项是**长度惩罚**：等长文档相同，长文档更低，因为长文档把概率摊给更多词项。而且分数是匹配词项上逐词贡献之和加一个逐文档常数，所以倒排索引处理与动态剪枝（对长度项留神一些）照样适用。

::: example 手算平滑 {#ex-dirichlet}
《爱丽丝》的段落集 $\abs{C} = 26\,643$ 个标记，`mock` 共出现 $56$ 次，`soup` $18$ 次。取 $\mu = 100$，计算 `mock` 与 `soup` 的 Dirichlet 平滑概率，以及段落 $516$（$12$ 个标记，两词各一次）与段落 $593$（$40$ 个标记，`mock` 一次、无 `soup`）对查询 `mock soup` 的对数似然。
::: solution
文集概率：$\Prob(\texttt{mock} \mid C) = 56/26\,643 = 0.002102$，$\Prob(\texttt{soup} \mid C) = 18/26\,643 = 0.000676$，于是 $\mu\Prob(\cdot \mid C)$ 为 $0.2102$ 与 $0.0676$。

段落 $516$：$\theta_{\texttt{mock}} = (1 + 0.2102)/112 = 0.010805$，$\theta_{\texttt{soup}} = (1 + 0.0676)/112 = 0.009532$；对数似然（自然对数）为 $-4.528 - 4.653 = -9.181$。

段落 $593$：$\theta_{\texttt{mock}} = 1.2102/140 = 0.008644$，$\theta_{\texttt{soup}} = 0.0676/140 = 0.000483$——小，但不为零；对数似然为 $-4.751 - 7.636 = -12.387$。

于是 $516$ 以 $3.206$ 的优势排在 $593$ 前。[[#prop-ql-rank]] 的保序等价形式给出 $516$ 为 $\ln(1 + 1/0.2102) + \ln(1 + 1/0.0676) + 2\ln(100/112) = 4.284$，$593$ 为 $\ln(1 + 1/0.2102) + 2\ln(100/140) = 1.078$——差值同样是 $3.206$。缺 `soup` 让段落 $593$ 丢掉罕见词应得的 $\ln(1 + 1/0.0676) = 2.76$ 这一大笔贡献。
:::
:::

对算例查询，Dirichlet 模型（$\mu = 100$）把段落 $593$、$516$、$646$、$604$、$585$ 排在最前，与 BM25 十分相似：

```text
Dirichlet mu=100
  -30.896 doc 593 len  40: So they began solemnly dancing round and round
  -31.696 doc 516 len  12: `It's the thing Mock Turtle Soup is made
  -32.348 doc 646 len  38: `Oh, a song, please, if the Mock Turtle
  -32.670 doc 604 len  51: `You're wrong about the crumbs,' said the Mock
  -33.166 doc 585 len  13: `Turn a somersault in the sea!' cried the
```

语言建模框架自然地延伸。相关反馈变成对一个更好的*查询*模型的估计，如拉年科（Lavrenko）与克罗夫特（Croft）（2001）的**相关模型**及其变体 RM3——强大的伪相关反馈基线。按查询模型与文档模型之间的库尔贝克–莱布勒（Kullback–Leibler）散度排序，把查询似然推广开去。翻译模型允许文档生成它并不包含的查询词项，迈向 [[information-retrieval/dense-retrieval]] 的语义匹配。

::: history
M. E. 马伦（Maron）与 J. L. 孔斯（Kuhns）在 “On relevance, probabilistic indexing and information retrieval”（*Journal of the ACM*，1960）中提出按相关概率排序。斯蒂文·罗伯逊（Robertson）与卡伦·斯帕克·琼斯（Spärck Jones）在 “Relevance weighting of search terms”（*Journal of the American Society for Information Science*，1976）中导出二元独立模型的相关性权重，罗伯逊 1977 年陈述并分析了概率排序原理。斯蒂文·哈特（Harter）的词项出现 2-Poisson 模型发表于 1975 年。罗伯逊与斯蒂夫·沃克（Walker）的 “Some simple effective approximations to the 2-Poisson model for probabilistic weighted retrieval”（SIGIR 1994）给出饱和与长度归一化近似，同年伦敦城市大学的 Okapi 团队在 TREC-3 中用上 BM25。杰伊·庞特（Ponte）与布鲁斯·克罗夫特（Croft）在 SIGIR 1998 提出语言建模方法，Chengxiang Zhai（Zhai）与约翰·拉斐蒂（Lafferty）对平滑的研究（SIGIR 2001；期刊版 2004）确立了 Dirichlet 平滑。罗伯逊与雨果·萨拉戈萨（Zaragoza）的专著 “The probabilistic relevance framework: BM25 and beyond”（2009）是该理论最完备的阐述。
:::

## 后续内容

BM25 与 Dirichlet 平滑的查询似然，是每一种新排序方法都要与之比较的标准基线，实践中也是多数多级排序器的初排：它们在倒排索引上配 WAND 或 MaxScore 跑得快（[[information-retrieval/vector-space]]），不需要训练数据，跨文集稳健。一个排序是否胜过另一个，由 [[information-retrieval/evaluation]] 的评测方法裁定。BM25 的跨字段分数、查询似然分数、邻近特征与 PageRank（[[information-retrieval/web-search]]）等链接质量分，成为 [[information-retrieval/learning-to-rank]] 中学习排序器的输入特征；学习词权重的神经模型——学习式稀疏检索——保留 BM25 的倒排索引形态、只换掉权重（[[information-retrieval/dense-retrieval]]）。

::: summary
- **概率排序原理**（[[#def-prp]]）按 $\Prob(R = 1 \mid d, q)$ 排序；相关性判定独立时，它在每个截断处最大化期望查准率（[[#thm-prp]]），但无视冗余与多样性。
- **二元独立模型**（[[#def-bim]]）给出匹配查询词项上对数几率比之和（[[#thm-bim]]）；毫无相关性信息时，Robertson–Spärck Jones 权重化为 idf，$\log\frac{N - n_t + 0.5}{n_t + 0.5}$（[[#eq-rsj-idf]]），对出现于一半以上文档的词项为负。
- **2-Poisson** 卓越性模型（[[#def-2poisson]]）蕴含词频权重递增且**饱和**（[[#prop-saturation]]）。
- **BM25**（[[#def-bm25]]）以 $(k_1 + 1)\mathrm{tf}/(K + \mathrm{tf})$ 近似该形状，用 $b$ 部分归一化长度；典型值 $k_1 \approx 1.2$–$2$、$b \approx 0.75$，需调参。
- **查询似然**（[[#def-ql]]）按 $\Prob(q \mid \theta_d)$ 排序；平滑必不可少，而 **Dirichlet** 平滑是以文集模型为中心的 Dirichlet 先验下的后验均值（[[#thm-dirichlet]]）。
- 平滑后的分数保序等价于一个类 idf 的和加一个长度惩罚（[[#prop-ql-rank]]）：tf、idf 与长度归一化从模型中自然涌现。
- 这些分数都是逐词项贡献之和，倒排索引查询处理与安全剪枝原样适用。
:::

## 习题

::: exercise 一个 RSJ 权重 {level=1 check="ln(9.5/1.5)"}
文集有 $N = 10$ 篇文档，某词项出现在其中 $1$ 篇里。毫无相关性信息时，它的 RSJ 权重 [[#eq-rsj-idf]]（自然对数）是多少？（填入权重。）
::: solution
$\ln\frac{10 - 1 + 0.5}{1 + 0.5} = \ln\frac{9.5}{1.5} = \ln 6.33 \approx 1.846$，接近 $\ln(N/n_t) = \ln 10 = 2.303$ 但因 $0.5$ 修正而偏小——小计数时修正影响最大。
:::
:::

::: exercise 一个 BM25 因子 {level=1 check="2.2*3/(1.2*(0.25 + 0.75*2) + 3)"}
$k_1 = 1.2$、$b = 0.75$，对长度两倍于平均的文档中 $\mathrm{tf} = 3$ 计算 BM25 的 tf 因子 $(k_1+1)\mathrm{tf}/(K + \mathrm{tf})$。（填入因子。）
::: solution
$K = 1.2 \times (0.25 + 0.75 \times 2) = 1.2 \times 1.75 = 2.1$，因子为 $2.2 \times 3 / (2.1 + 3) = 6.6/5.1 \approx 1.294$。若在平均长度的文档（$K = 1.2$）中则是 $6.6/4.2 = 1.571$。
:::
:::

::: exercise 期望查准率 {level=1 check="2.1"}
五篇文档的相关概率为 $0.9, 0.2, 0.7, 0.5, 0.4$。PRP 排序前 $3$ 名中相关文档的期望个数是多少？（填入期望。）
::: solution
PRP 排序为 $0.9, 0.7, 0.5, 0.4, 0.2$，由期望的线性性，前三名平均含 $0.9 + 0.7 + 0.5 = 2.1$ 篇相关文档，前 $3$ 名的期望查准率为 $0.7$。任取其他三篇文档之和都更小（[[#thm-prp]]）。
:::
:::

::: exercise 去掉第三条假设的 BIM {level=2}
[[#thm-bim]] 的证明在哪里用到了“非查询词项 $p_t = u_t$”的假设？去掉它，检索状态值会长什么样？为何实践中算不出来？
::: solution
它用在一开始丢掉的、不在查询中的词项因子上：$p_t = u_t$ 时每个这样的因子都等于 $1$。没有它，RSV 变成对文档**所有**词项求和的 $\sum_{t:\, x_t = 1} c_t$（再加常数），$c_t$ 是每个词项的对数几率比。文档的每个词都会按其多么典型地属于相关文档，或正或负地贡献分数。但对新查询，系统除了查询本身对（哪些文档）相关一无所知，非查询词项的 $p_t$ 没有反馈就无从估计——而一旦有了反馈，查询扩展恰恰由此而生：估计出的 $c_t$ 大的词项被加进查询。
:::
:::

::: exercise BM25 参数的极限 {level=2}
证明：$k_1 \to 0$ 的 BM25 保序等价于带 RSJ 权重的 BIM；而 $b = 1$、$k_1 \to \infty$ 时，词频因子除以 $k_1 + 1$ 再乘 $k_1$ 趋于 $\mathrm{tf}_{t,d} \cdot \mathrm{avgdl}/\mathrm{dl}_d$。
::: solution
$k_1 \to 0$ 时 $K_d \to 0$，$\mathrm{tf} > 0$ 时 $(k_1 + 1)\mathrm{tf}/(K_d + \mathrm{tf}) \to \mathrm{tf}/\mathrm{tf} = 1$（$\mathrm{tf} = 0$ 时为 $0$）。分数化为 $\sum_{t \in q,\, \mathrm{tf} > 0} w_t$，正是带 RSJ 权重的 BIM 的 [[#eq-rsv]]。$b = 1$ 时 $K_d = k_1 \mathrm{dl}_d/\mathrm{avgdl}$；于是
$$
\frac{k_1}{k_1 + 1}\cdot\frac{(k_1 + 1)\mathrm{tf}}{k_1 \mathrm{dl}_d/\mathrm{avgdl} + \mathrm{tf}} = \frac{\mathrm{tf}}{\mathrm{dl}_d/\mathrm{avgdl} + \mathrm{tf}/k_1} \to \frac{\mathrm{tf}\cdot\mathrm{avgdl}}{\mathrm{dl}_d}.
$$
所以 $k_1$ 大配完全归一化，逼近的是除以相对长度的原始 tf——毫无饱和。BM25 在二元的“出现与否”与按长度归一化的原始 tf 之间插值。
:::
:::

::: exercise Jelinek–Mercer 没有这种长度惩罚 {level=2}
对 Jelinek–Mercer 平滑 $\theta_{d,t} = (1-\lambda)\mathrm{tf}_{t,d}/\mathrm{dl}_d + \lambda p_t$ 导出 [[#prop-ql-rank]] 的对应式。与 Dirichlet 情形比较文档长度进入的方式。
::: solution
因式分解 $\theta_{d,t} = \lambda p_t\bigl(1 + \frac{(1-\lambda)\,\mathrm{tf}_{t,d}}{\lambda\, p_t\, \mathrm{dl}_d}\bigr)$。对查询词项取对数求和，丢掉与文档无关的 $\sum_t \log(\lambda p_t)$，保序等价的分数是
$$
\sum_{t \in q,\ \mathrm{tf}_{t,d} > 0} \log\Bigl(1 + \frac{1 - \lambda}{\lambda}\cdot\frac{\mathrm{tf}_{t,d}/\mathrm{dl}_d}{p_t}\Bigr).
$$
没有单独的逐文档长度项：长度只通过每个匹配词项权重内部的相对频率 $\mathrm{tf}/\mathrm{dl}$ 进入，所以一个查询词项都不匹配的文档无论长短都得 $0$，平滑权重对长短文档一视同仁。Dirichlet 情形中，项 $\abs q\log(\mu/(\mathrm{dl}_d + \mu))$ 直接惩罚长文档，逐词项权重 $\mathrm{tf}/(\mu p_t)$ 用的是原始计数，长文档从重复的词项中挣得更多。两种模型因此以不同方式归一化长度，这也是 Dirichlet 平滑在文档长短参差的文集上表现更好的原因之一。
:::
:::

::: exercise 信息完备的 RSJ {level=3}
设相关性完全已知：$N$ 篇文档中 $R$ 篇相关。证明：出现在每篇相关文档、且不出现在任何非相关文档中的词项，在同 $R$ 与 $N$ 的词项中取得最大可能的 RSJ 权重，并对 $R = 10$、$N = 1000$、$n_t = 10$ 算出它。此处 $0.5$ 修正为何必不可少？
::: solution
权重 [[#eq-rsj]] 关于 $r_t$ 递增、关于 $n_t - r_t$ 递减（相关文档中出现得多抬高分子几率，非相关中出现得多抬高分母几率）。固定 $R$ 时对 $r_t \le R$ 的最大值在 $r_t = R$，而 $n_t - r_t \ge 0$ 的最小值是 $0$。取 $r_t = n_t = R = 10$：
$$
w = \ln\frac{10.5/0.5}{0.5/(1000 - 10 - 10 + 10 + 0.5)} = \ln\frac{21}{0.5/990.5} = \ln(21 \times 1981) = \ln 41\,601 \approx 10.64.
$$
没有 $0.5$ 修正，分子几率 $r_t/(R - r_t) = 10/0$ 与分母几率 $0/990$ 给出 $\infty/0$：无穷权重，会把任何含该词项的文档排到任何不含它的文档之上，罔顾其他一切证据。修正可像拉普拉斯（Laplace）的继承规律那样用带先验的贝叶斯估计正当化，它使权重保持有限。
:::
:::

::: exercise 实现带相关反馈的 BM25 {level=3}
扩展 `bm25` 函数：给定判为相关的 docID 集合 `rel` 时改用权重 [[#eq-rsj]] 而非 [[#eq-rsj-idf]]。用 `rel = {516, 593, 646}` 跑查询 `turtle`，比较有无反馈时 `turtle` 的权重。一个出现在*所有*已判定文档中的词项，权重会怎样？
::: solution
```python
def rsj(t, rel):
    R = len(rel)
    r = sum(1 for d in rel if docs[d][t] > 0)       # 含 t 的判定相关文档数
    n = df[t]
    return math.log(((r + 0.5) / (R - r + 0.5)) / ((n - r + 0.5) / (N - n - R + r + 0.5)))

def bm25_fb(q, d, rel, k1=1.2, b=0.75):
    K = k1 * ((1 - b) + b * dl[d] / avgdl)
    return sum(rsj(t, rel) * docs[d][t] * (k1 + 1) / (K + docs[d][t])
               for t in set(tokenize(q)) if docs[d][t] > 0)

print(round(bm25_idf("turtle"), 3), round(rsj("turtle", {516, 593, 646}), 3))
```
```text
2.657 4.662
```
三个判定段落都含 `turtle`，故 $r = R = 3$，权重从 $\ln(748.5/52.5) = 2.657$ 升到 $\ln\frac{3.5/0.5}{49.5/748.5} = \ln(7 \times 15.12) = 4.662$。出现在每篇判定文档中的词项，分子几率 $(R + 0.5)/0.5 = 2R + 1$ 随判定数量增长；这是模型能看见的最强证据，所以反馈词项按这类权重从大到小加进查询。只有三个判定时估计噪声很大，实用系统会把它与无反馈权重结合使用。
:::
:::

::: exercise 排序中的并列与 PRP {level=2}
两篇文档是精确重复，相关概率都是 $0.8$；第三篇不同的文档概率 $0.7$。按 PRP 排序。再设用户只要找到一篇相关文档就满意并停止阅读。假设两篇重复要么都相关要么都不相关，第三篇与它们独立，哪个前 $2$ 列表使用户至少找到一篇相关文档的概率最大？
::: solution
PRP 把两篇重复排在前（$0.8, 0.8$），然后是第三篇（$0.7$）。对只需要一篇相关文档的用户，前两名全是重复时成功概率 $0.8$（它们相关就一起相关，不相关就一起不相关）。取一篇重复加第三篇，除非双双失败都成功：$1 - 0.2 \times 0.3 = 0.94$。所以对这个用户，PRP 的列表更差。PRP 的最优性（[[#thm-prp]]）假设一篇文档的价值不依赖于同列展示的其他文档，重复恰恰违反这一点；按概率排序之外，还需要多样化与去重。
:::
:::
