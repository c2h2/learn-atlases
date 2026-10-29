用户问 `how do I repair a punctured bicycle tyre`，文集里最好的一页标题是 "Fixing a flat on your bike"，而且通篇没有 *repair*、*punctured*、*bicycle*、*tyre* 这几个词。到此为止的每个排序函数——布尔匹配、tf–idf、BM25、查询似然——都按文档所含的查询词项给文档打分，这一页得零分。这就是**词汇不匹配**（vocabulary mismatch）问题，与这个领域同岁：词干提取（[[information-retrieval/text-processing]]）管得了 `repair`/`repairs`，管不了 `repair`/`fix`；查询扩展与相关反馈（[[information-retrieval/vector-space]]）只在头几条结果本来就好时才帮得上忙。需要的是一种表示：*意义*相近的文本彼此靠近，不论它们用了什么词。

**稠密检索**（dense retrieval）把查询与文档表示为几百个实数组成的向量——**嵌入**（embedding）——由神经网络产出，网络的训练使查询的向量落在与它相关的文档向量附近，检索则通过**最近邻搜索**完成。本章只谈这个话题中属于信息检索的部分。编码网络如何工作、如何预训练是 LLM 图谱的主题（[text embeddings](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings)、[transformers](/learn/llm/lesson.php?c=transformers&l=self-attention)），所以学到的表示我们只简要引入——双编码器架构与训练它的对比损失——而把力气花在之后发生的事上：把最大内积搜索归约为最近邻搜索，让百万向量的检索变快的**近似最近邻**索引（倒排文件索引、乘积量化与基于图的搜索，每个都在合成数据上实现并测量），稠密与词法检索的结合，交叉编码器重排，以及评测。章末讲面向语言模型的检索。

## 嵌入与双编码器

::: definition 双编码器稠密检索 {#def-biencoder}
**稠密检索器**由查询编码器 $E_Q$ 与文档编码器 $E_D$（常常是同一个网络）组成，把文本映到 $\R^d$ 中的向量，$d$ 通常在 $128$ 到 $4\,096$ 之间。相关性分数是内积
$$
s(q, d) = E_Q(q) \cdot E_D(d)
$$
（或余弦，即归一化向量的内积）。文档向量**离线**计算，每篇文档算一次，存进索引；查询时系统编码查询，返回分数最大的 $k$ 篇文档。查询与文档分开编码，故这一架构称为**双编码器**（bi-encoder，或称对偶编码器）。
:::

这些向量是**稠密**的：几乎每个坐标都非零，且没有任何坐标对应一个词。这与 [[information-retrieval/vector-space#def-vsm]] 的 tf–idf 向量正相反——那里每个词项一维、几乎全为零。稠密向量能把 "fix a flat" 与 "repair a puncture" 放在一起，因为编码器从海量文本中学到这两个短语用在相似的上下文里。这个想法比神经网络更老：**潜在语义索引**（latent semantic indexing；Deerwester 等人，1990）对词项–文档矩阵取截断奇异值分解，在几百个"概念"构成的空间里得到稠密的文档向量（[Maths Atlas: the SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd)）。神经编码器从 Sentence-BERT（赖默斯（Reimers）与古雷维奇（Gurevych），2019）与稠密段落检索（Dense Passage Retrieval，DPR；卡尔普京（Karpukhin）等人，2020）起步，使这一路线堪与 BM25 匹敌，继而在许多基准上胜出。

### 用对比损失训练

编码器在查询与相关段落构成的对 $(q, d^+)$ 上训练——来自问答数据集、点击日志，或从网上挖来的对（比如标题与正文）。对每一对，抽一组**负例** $d^-_1, \dots, d^-_{n-1}$，训练模型把正例挑出来。

::: definition 对比（InfoNCE）损失 {#def-infonce}
对查询 $q$，其正例为 $d_1 = d^+$、负例为 $d_2, \dots, d_n$，分数为 $s_j = s(q, d_j)$，**温度** $\tau > 0$，令 $p_j = e^{s_j/\tau}/\sum_{l=1}^n e^{s_l/\tau}$。**对比损失**为
$$
L = -\log p_1 = -\frac{s_1}{\tau} + \log\sum_{l=1}^{n} e^{s_l/\tau}.
$$
:::

::: proposition 对比损失的梯度 {#prop-infonce-grad}
$\dfrac{\partial L}{\partial s_j} = \dfrac{1}{\tau}\bigl(p_j - \mathbf 1[j = 1]\bigr)$。因此该损失以 $(1 - p_1)/\tau$ 的力气抬高正例分数、以 $p_j/\tau$ 的力气压低每个负例的分数：模型当前给高分的负例——**困难**（hard）负例——被推得最狠。
:::

::: proof
求导：$\partial(-s_1/\tau)/\partial s_j = -\mathbf 1[j = 1]/\tau$，而 $\partial \log\sum_l e^{s_l/\tau}/\partial s_j = \frac{e^{s_j/\tau}/\tau}{\sum_l e^{s_l/\tau}} = p_j/\tau$。相加即得结果。由于 $\sum_j p_j = 1$，负例上的力气之和恰等于正例上的力气。
:::

这正是 ListNet（[[information-retrieval/learning-to-rank]]）在只有一个相关文档时的 softmax 交叉熵，也是多项逻辑回归。梯度给出两条实操要点。**批内负例**：一批 $B$ 个查询–正例对里，其余 $B - 1$ 个查询的正例就充当负例，不花额外编码成本就得到许多负例。**困难负例**：随机负例太容易，很快 $p_j \approx 0$、什么也不贡献；用 BM25 或当前模型检回的负例更难、教得更多，可其中有些其实是从未被标过的相关文档，把它们推开反而害了模型。嵌入模型的训练配方——数据、负例、温度、模型规模的选择——变化很快；见 [LLM Atlas](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings) 的讨论。

::: example 手算对比损失 {#ex-infonce}
某查询的正例得分 $0.8$，三个负例得分 $0.5$、$0.3$、$0.1$（余弦相似度）。对 $\tau = 0.1$ 算出 $p_1$、损失与各力气，再对 $\tau = 0.05$ 算一遍。
::: solution
$\tau = 0.1$ 时指数为 $8, 5, 3, 1$，故 $p = (e^8, e^5, e^3, e^1)/(e^8 + e^5 + e^3 + e) = (0.9457, 0.0471, 0.0064, 0.0009)$，$L = -\ln 0.9457 = 0.0558$。正例上的力气是 $(1 - 0.9457)/0.1 = 0.54$，按 $0.47$、$0.06$、$0.01$ 分给三个负例：几乎全落在最难的那个负例——得分 $0.5$ 的那个——身上。$\tau = 0.05$ 时指数加倍，$p_1 = 0.9975$、$L = 0.0025$；损失几乎被满足了。更小的温度使分布变尖，正例与负例之间固定的边距因而更值钱；余弦分数常用的温度在 $0.01$ 到 $0.1$ 之间。
:::
:::

::: widget plot
f: 1/(1 + (n - 1)*exp(-x/t))
sliders: n=2:1:256; t=0.01:0.01:0.5
x: 0, 1
y: 0, 1
labels: p_{+}\ \text{，正例比每个负例高 } \Delta \text{ 时}
caption: 正例比得分相同的 $n - 1$ 个负例各高出 $\Delta$（横轴）时，对比损失分给正例的概率 $p_+ = 1/(1 + (n-1)e^{-\Delta/\tau})$。负例越多，同样的 $p_+$ 需要越大的边距；温度越小，小边距就够。把 $n$ 设为 $256$（大批次），比较 $\tau = 0.05$ 与 $\tau = 0.5$。
:::

## 从最大内积到最近邻

双编码器的检索是**最大内积搜索**（maximum inner-product search，MIPS）：给定 $\vec q$，找出使 $\vec q \cdot \vec x$ 最大的存储向量 $\vec x$。精确搜索要算全部 $N$ 个内积，每次查询 $\Theta(Nd)$ 次运算——$N = 10^8$ 个段落、$d = 768$ 时约 $10^{11}$ 次乘加，单台机器做交互式搜索远远不够快。近似方法多半是为欧氏距离下的**最近邻搜索**发展出来的，所以先把两个问题接起来。

若所有向量都归一化到单位长度，就无事可做：由 [[information-retrieval/vector-space#prop-cosine]]，$\norm{\vec q - \vec x}^2 = 2 - 2\,\vec q\cdot\vec x$，最大的内积就是最小的距离。许多嵌入模型正为此输出归一化向量。对未归一化的向量，一个简单增广就够。

::: theorem 把 MIPS 归约为最近邻搜索 {#thm-mips}
设每个存储向量满足 $\norm{\vec x} \le M$。把每个存储向量映到 $\vec x' = \bigl(\vec x,\ \sqrt{M^2 - \norm{\vec x}^2}\bigr) \in \R^{d+1}$，把查询映到 $\vec q' = (\vec q, 0)$。则
$$
\norm{\vec q' - \vec x'}^2 = \norm{\vec q}^2 + M^2 - 2\,\vec q\cdot\vec x,
$$
所以欧氏距离下离 $\vec q'$ 最近的存储向量，就是与 $\vec q$ 内积最大的那个。
:::

::: proof
增广后的每个存储向量满足 $\norm{\vec x'}^2 = \norm{\vec x}^2 + M^2 - \norm{\vec x}^2 = M^2$，且 $\vec q'\cdot\vec x' = \vec q\cdot\vec x + 0$。展开：$\norm{\vec q' - \vec x'}^2 = \norm{\vec q'}^2 - 2\vec q'\cdot\vec x' + \norm{\vec x'}^2 = \norm{\vec q}^2 - 2\vec q\cdot\vec x + M^2$。第一项与最后一项不依赖 $\vec x$，故距离最小化即 $\vec q\cdot\vec x$ 最大化。
:::

::: example 内积不等于距离 {#ex-mips}
存储向量为 $\vec x_1 = (3, 0)$、$\vec x_2 = (1, 1)$、$\vec x_3 = (0, 2)$，查询为 $\vec q = (1, 2)$。分别按内积、按朴素欧氏距离、以及按 [[#thm-mips]] 取 $M = 3$ 增广后的欧氏距离找最佳匹配。
::: solution
内积：$3$、$3$、$4$；最佳是 $\vec x_3$。平方距离 $\norm{\vec q - \vec x}^2$：$(1-3)^2 + 2^2 = 8$、$0 + 1 = 1$、$1 + 0 = 1$——$\vec x_2$ 与 $\vec x_3$ 并列，朴素的最近邻搜索可能给错答案。增广后：$\vec x_1' = (3, 0, 0)$、$\vec x_2' = (1, 1, \sqrt7)$、$\vec x_3' = (0, 2, \sqrt5)$，$\vec q' = (1, 2, 0)$；平方距离 $8$、$8$、$6$，正是 $\norm{\vec q}^2 + M^2 - 2\vec q\cdot\vec x = 14 - 2 \times (3, 3, 4)$。最近的是 $\vec x_3$，如所要求。
:::
:::

## 近似最近邻搜索

高维空间里的精确最近邻搜索不吃智能索引：$k$-d 树之类的树结构一旦 $d$ 超过几十个分量，就退化成几乎全表扫描；而下界结果表明，最坏情形下没有哪个精确方法能比扫描好多少。实用系统因此接受**近似**答案，以 **recall@$k$**（前 $k$ 查全率）度量：真正的 $k$ 个最近邻中，被方法返回的比例。主流的家族有三个，每个都拿查全率换时间和内存；第一个——用随机超平面哈希函数的**局部敏感哈希**——在 [[information-retrieval/web-search#thm-hyperplane]] 见过。另外两个是聚类和图。

测量用合成数据：$d = 16$ 维、围绕 $50$ 个随机聚类中心生成的 $N = 10\,000$ 个单位向量，外加 $50$ 个查询——每个是某个存储向量的微扰拷贝。每个查询的真实前 $10$ 名由穷举算出。真实的嵌入有几百维、向量有成百万，所以下面的数字是玩具问题上的**观察**，只展示权衡的形状，不是基准。

```python
import math, random, heapq
rng = random.Random(2026)
d, n, nq, k = 16, 10000, 50, 10
def unit(v):
    s = math.sqrt(sum(x * x for x in v)); return [x / s for x in v]
centres = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(50)]
data = [unit([c + rng.gauss(0, 0.6) for c in rng.choice(centres)]) for _ in range(n)]
queries = [unit([x + rng.gauss(0, 0.3) for x in rng.choice(data)]) for _ in range(nq)]
dot = lambda u, v: sum(a * b for a, b in zip(u, v))
def exact(q, k=k):
    return [i for _, i in heapq.nlargest(k, ((dot(q, x), i) for i, x in enumerate(data)))]
truth = [set(exact(q)) for q in queries]
```

### 倒排文件索引

::: algorithm IVF 搜索 {#alg-ivf}
**构建。**用 $k$-均值把存储向量聚成 $C$ 个单元格，得质心 $\vec c_1, \dots, \vec c_C$，把每个向量存进离它最近的质心的**倒排列表**。
**搜索。**对查询 $\vec q$，找出 $\vec q\cdot\vec c_j$ 最大的 $n_{\mathrm{probe}}$ 个质心，精确扫描这些单元格里的向量，返回最好的 $k$ 个。
:::

这是一种倒排索引（[[information-retrieval/inverted-indexes]]），只是"词项"换成了聚类质心。$C$ 个单元格大小大致相等时，一次查询大约花 $Cd$ 找质心、再花 $n_{\mathrm{probe}}(N/C)d$ 扫列表，在 $C \approx \sqrt{N n_{\mathrm{probe}}}$ 附近最小。出错发生在真正的邻居落在质心不属最近 $n_{\mathrm{probe}}$ 个的单元格里——通常是贴单元格边界的向量。取 $C = 100$ 个单元格：

```text
  nprobe= 1  recall@10=0.560  vectors scanned=  1.3%
  nprobe= 2  recall@10=0.732  vectors scanned=  2.3%
  nprobe= 4  recall@10=0.850  vectors scanned=  4.2%
  nprobe= 8  recall@10=0.946  vectors scanned=  8.3%
  nprobe=16  recall@10=0.990  vectors scanned= 16.2%
  nprobe=32  recall@10=1.000  vectors scanned= 32.3%
```

探测一个单元格只找到 $56\%$ 的真邻居；在 $100$ 个里探 $8$ 个找到 $95\%$，扫描的向量占 $8\%$。（单元格大小不均，所以扫描比例不是精确的 $n_{\mathrm{probe}}/C$。）参数 $n_{\mathrm{probe}}$ 是一个从"快而糙"到"慢而准"的旋钮，在查询时挑选。

### 乘积量化

内存是另一个约束。$10^8$ 个 $768$ 维 32 位浮点向量占 $307$ GB。**乘积量化**（product quantisation，PQ；热古（Jégou）、杜兹（Douze）与施密德（Schmid），2011）把每个向量压成几个字节。

::: definition 乘积量化 {#def-pq}
把 $\R^d$ 分成 $m$ 个维数 $d/m$ 的子空间，写 $\vec x = (\vec x^{(1)}, \dots, \vec x^{(m)})$。对每个子空间 $s$，用子向量上的 $k$-均值学一个含 $K$ 个质心的**码本** $\vec c^{(s)}_1, \dots, \vec c^{(s)}_K$。把 $\vec x$ 编码为它在每个子空间中最近质心的 $m$ 个下标 $\bigl(i_1, \dots, i_m\bigr)$，用 $m\log_2 K$ 位；向量由 $\tilde{\vec x} = (\vec c^{(1)}_{i_1}, \dots, \vec c^{(m)}_{i_m})$ 近似。
:::

近似点集有 $K^m$ 个点——$m = 8$、$K = 256$ 时是 $2^{64}$——而存储的质心只有 $mK$ 个。分数可以不解压直接算。

::: proposition 非对称距离计算 {#prop-adc}
对查询 $\vec q$ 与码为 $(i_1, \dots, i_m)$ 的编码向量，
$$
\vec q\cdot\tilde{\vec x} = \sum_{s=1}^{m} \vec q^{(s)}\cdot\vec c^{(s)}_{i_s}, \qquad \norm{\vec q - \tilde{\vec x}}^2 = \sum_{s=1}^{m}\norm{\vec q^{(s)} - \vec c^{(s)}_{i_s}}^2.
$$
预先算出 $mK$ 个值 $\vec q^{(s)}\cdot\vec c^{(s)}_i$ 的表（每次查询 $O(Kd)$）之后，给每个编码向量打分只需 $m$ 次查表加加法。
:::

::: proof
内积与平方欧氏范数都是对坐标求和，而坐标被划分到 $m$ 个子空间，于是二者都拆成对子空间的求和。表对每个子空间 $s$、每个质心 $i$ 各存一项，在每个子空间里算 $K$ 个长度 $d/m$ 的内积，总共 $Kd$ 次乘法。
:::

叫"非对称"，是因为查询精确使用、只有存储向量被量化。每个子空间 $K = 16$ 个质心（每个码 $4$ 位）、$m = 4, 8, 16$ 个子空间，在合成数据上用 PQ 给所有向量打分、再（可选）对最好的 $100$ 个精确重算：

```text
m= 4: 16 bits/vector (vs 512)  recall@10 PQ only 0.200  after re-ranking 100: 0.638
m= 8: 32 bits/vector (vs 512)  recall@10 PQ only 0.326  after re-ranking 100: 0.918
m=16: 64 bits/vector (vs 512)  recall@10 PQ only 0.632  after re-ranking 100: 1.000
```

PQ 分数本身很粗——量化误差与近邻之间的差距同量级——但足以圈住 $100$ 个候选、把真实前 $10$ 的大多数装进去，再由精确分数了断。每个向量 $8$ 字节而非 $64$ 字节时，这里重排后的查全率是完美的。生产系统把两个主意合起来用，即 **IVF-PQ**：用倒排文件挑单元格，单元格内放 PQ 码（常对残差 $\vec x - \vec c_j$ 编码，$\vec c_j$ 是单元格质心），再对一份短名单用另存的全向量精确重排。FAISS 库（约翰逊（Johnson）、杜兹（Douze）与热古（Jégou），2017）让这些方法随手可得，包括在 GPU 上。

::: example 估算向量索引的规模 {#ex-sizing}
$N = 10^8$ 个段落以 $d = 768$ 维嵌入。估计（a）32 位浮点向量的内存，(b) $m = 64$ 个子空间、$K = 256$ 的 PQ 码，(c) 用非对称距离让一次查询对照全部码打分的代价。
::: solution
(a) $10^8 \times 768 \times 4$ 字节 $= 3.07 \times 10^{11}$ 字节，约 $307$ GB（即 $286$ GiB）。(b) 每个向量 $64$ 个 8 位码、$64$ 字节：共 $6.4$ GB，压缩比 $48$；外加码本，$64 \times 256$ 个 12 维质心，约 $0.8$ MB。(c) 查表要 $Kd = 256 \times 768 \approx 2 \times 10^5$ 次乘法；打分则每个向量 $64$ 次查表加加法，共 $6.4 \times 10^9$ 次——单次查询仍然很大，这正是 PQ 要与只扫百分之几码的倒排文件合用的原因。
:::
:::

### 基于图的搜索

截至 2026 年，用得最多的 ANN 索引是**基于图的**：每个存储向量是一个结点，与它的一些近邻相连，查询靠沿图朝查询走来回答。

::: algorithm 邻近图上的贪心束搜索 {#alg-beam}
输入：存储向量上的图、入口结点 $e$、查询 $\vec q$、束宽 $\mathit{ef} \ge k$。
1. $\mathit{visited} \gets \set{e}$；待展开结点的最大优先队列 $F$ 与已见最好 $\mathit{ef}$ 个结点的有界集合 $B$，都用 $e$ 及它与 $\vec q$ 的相似度初始化。
2. 只要 $F$ 非空：从 $F$ 取出相似度最大的结点 $u$。若 $B$ 已满且 $u$ 的相似度小于 $B$ 中最差的结点，停止。否则，对 $u$ 的每个未访问邻居 $v$：标记已访问，算它的相似度；若 $B$ 未满或 $v$ 胜过 $B$ 中最差的，把 $v$ 插入 $F$ 和 $B$（$B$ 溢出时逐出其中最差的）。
3. 返回 $B$ 中最好的 $k$ 个结点。
:::

搜索只为访问过的结点算相似度——图好时，成百万个里只算几百个。质量取决于图。纯粹的 $k$ 最近邻图把每个结点只连到离它很近的结点，在聚簇数据上簇间连通很差，游走会卡在入口所在的那个簇里。**可导航小世界**（navigable small-world，NSW）图（马利科夫（Malkov）等人，2014）增量构建：每个新插入的向量连到已插入向量中离它最近的几个；最早插入的结点——趁图还稀疏时进来——拿到长程链接，让搜索能迅速穿越整个空间。在 $2\,000$ 个合成向量上，每个结点 $8$ 条链接（为简便，插入时的邻居由穷举搜索找出，真正的构建器用的是搜索算法本身），搜索从结点 $0$ 出发：

```text
k-NN graph              ef=10  recall@10=0.138  similarities=  67.4 of 2000
k-NN graph              ef=40  recall@10=0.490  similarities= 173.6 of 2000
k-NN graph              ef=80  recall@10=0.778  similarities= 293.8 of 2000
incremental (NSW) graph ef=10  recall@10=0.702  similarities= 154.9 of 2000
incremental (NSW) graph ef=40  recall@10=0.932  similarities= 253.9 of 2000
incremental (NSW) graph ef=80  recall@10=0.972  similarities= 365.9 of 2000
```

增量图在算了 $2\,000$ 个相似度里约 $250$ 个之后达到 $93\%$ 查全率；同样链接数的 $k$-NN 图，费同样的力气只到 $49\%$。**HNSW**（分层可导航小世界；马利科夫（Malkov）与亚舒宁（Yashunin），2016，期刊版 2020）加了一层等级：每个结点按概率指数递减地分到随机一层，上层结点少而链接长，搜索自顶向下贪心下降，像多维的跳表。它还用一个偏好方向多样的启发式修剪每个结点的邻居表。HNSW 以低时延给出高查全率，代价是全向量和图链接都住在内存里；基于磁盘的图索引和与量化的组合来接手更大的文集。

::: quiz
一个 IVF 索引在 $N = 10^7$ 个 $d$ 维向量上建了 $C = 1\,000$ 个单元格。$n_{\mathrm{probe}} = 10$ 时，一次查询大约扫描多少个向量？漏掉邻居的主因是什么？
- [ ] $10^7$；IVF 只省内存
- [x] 约 $10^5$；邻居落在质心不属离查询最近 $10$ 个的单元格里
- [ ] 约 $10$；返回的就是质心自己
- [ ] 约 $10^5$；存储向量的量化误差
::: solution
每个单元格约 $N/C = 10^4$ 个向量，$10$ 个单元格约 $10^5$ 个、文集的 $1\%$，外加 $1\,000$ 次质心比较。IVF 本身存的是精确向量，误差只来自单元格的选择：贴着单元格边界的真邻居可能被分给没被探测的单元格。量化误差要到 IVF 与 PQ 合用时才出现。
:::
:::

## 稠密与词法检索的结合

稠密检索替代不了词法匹配。嵌入擅长刻画主题相似，却可能漏掉硬性要求：一个产品编码、一个罕见的人名、一条具体的报错信息或一个数字。BEIR 基准（塔库尔（Thakur）等人，2021）在检索器没训练过的文集上测试它们，BM25 是强悍的基线，当时若干稠密模型在许多文集上反而不及它——提醒人：在一种查询上训练的模型未必迁移得了另一种。所以多数系统把两者结合起来。

**混合检索**并行跑 BM25 与稠密检索，再合并结果表。不同模型的分数尺度不可比，稳健的做法按排名合并。

::: definition 倒数排名融合 {#def-rrf}
给定来自不同系统的排序 $\pi_1, \dots, \pi_m$，**倒数排名融合**（reciprocal rank fusion；科马克（Cormack）、克拉克（Clarke）与比特赫尔（Büttcher），2009）按
$$
\mathrm{RRF}(d) = \sum_{i=1}^{m} \frac{1}{\kappa + \pi_i(d)},
$$
给每个文档打分，其中 $\pi_i(d)$ 是 $d$ 在第 $i$ 张表中的排名（不在表中的文档贡献 $0$），$\kappa$ 是常数，原论文取 $60$。
:::

::: example 融合两张排序表 {#ex-rrf}
BM25 返回 $d_1, d_2, d_3, d_4$，某稠密检索器返回 $d_3, d_1, d_5, d_6$。用 $\kappa = 60$ 的 RRF 融合。
::: solution
$d_1$：$\frac{1}{61} + \frac{1}{62} = 0.03252$。$d_3$：$\frac{1}{63} + \frac{1}{61} = 0.03227$。$d_2$：$\frac{1}{62} = 0.01613$。$d_5$：$\frac{1}{63} = 0.01587$。$d_4$ 与 $d_6$：各 $\frac{1}{64} = 0.01563$。融合后的排序是 $d_1, d_3, d_2, d_5$，然后并列的 $d_4$ 与 $d_6$。被两个系统同时找到的文档升到顶上；$\kappa = 60$ 时排名 $1$ 与 $2$ 之差很小，系统之间的一致比单个系统的头名更要紧。$\kappa$ 越小，越奖赏头部位置。
:::
:::

**学习型稀疏检索**通往同一个目标的另一条路。DeepCT、doc2query、SPLADE（福马尔（Formal）等人，2021）这类模型用神经网络给词项配权重——包括不出现在文档里、却很可能被搜的词项，比如维修页上的 `fix`——再把结果存进普通的倒排索引。查询处理于是就是 [[information-retrieval/vector-space]] 的 WAND 或 MaxScore，尽享词法检索的全部效率。

## 用交叉编码器重排

双编码器在见到查询之前，就得把整篇文档压进一个向量。**交叉编码器**把查询与文档*一起*读——作为一个输入喂给 transformer——输出一个相关性分数；查询的每个词都能关注文档的每个词。交叉编码器比同规模的双编码器准得多，也比它贵得多：什么也无法预先计算，每个（查询，文档）对都要一次完整的网络前向传播。所以它用来给初排检索器的前 $k$ 个候选——典型 $50$ 到 $1\,000$——**重排**，即 [[information-retrieval/learning-to-rank]] 的多级架构，最后一级是神经的。

两者之间是**后期交互**（late interaction）。ColBERT（哈塔卜（Khattab）与扎哈里亚（Zaharia），2020）给文档的每个*词元*存一个向量，按
$$
s(q, d) = \sum_{i \in q} \max_{j \in d} \vec q_i \cdot \vec d_j
$$
打分——对每个查询词元，取它在文档词元中的最佳匹配，再对查询词元求和——一个柔软的、学出来的词项匹配版本。它比单向量双编码器更准，比交叉编码器便宜得多，代价是每个文档要存几十到几百个向量，通常得压缩。

::: warning 相似不等于相关，也不等于真实
稠密检索器返回嵌入离查询最近的段落，而"近"反映的是训练数据教过的一切。*看着*像答案的段落——同主题、同词汇、语气笃定——不管是否真的回答了问题都得高分；一个前提有错的问题，会检回看似支持它的段落。否定是众知的软肋："drugs that do not interact with warfarin" 可能检回讲会相互作用的药的段落。嵌入还继承训练文本里的偏见。检索要用你自己查询上的相关性判定来评测（[[information-retrieval/evaluation]]），别凭几条样例的印象；检回的段落喂给语言模型时，最终答案也要评测。
:::

## 面向语言模型的检索

**检索增强生成**（retrieval-augmented generation，RAG；刘易斯（Lewis）等人，2020）让语言模型访问一个文集：每次用户请求，检回最相关的段落放进模型输入，模型便能从当前、具体、可引用的来源作答，而不只是背训练时记住的东西。本课程每一章都有份。文档切成几百个词元的段落（**切块**（chunking）的决定就是 [[information-retrieval/text-processing#def-collection]] 的检索单位选择）；段落按词法、稠密或两者一起索引；检索是混合的、带重排的；结果既按检索评判（相关段落进前 $k$ 了吗？）也按生成评判（答案受段落支持吗？）。生成一侧——模型如何使用检回的上下文、幻觉、引用与 RAG 系统的评测——在 [LLM Atlas](/learn/llm/lesson.php?c=prompting-rag&l=retrieval-augmented-generation) 中展开，向量数据库在 [LLM Atlas: vector search](/learn/llm/lesson.php?c=prompting-rag&l=vector-search)。

::: history
斯科特·德韦斯特（Deerwester）、苏珊·杜梅（Dumais）、乔治·弗纳斯（Furnas）、托马斯·兰道尔（Landauer）与理查德·哈什曼（Harshman）在 "Indexing by latent semantic analysis"（*Journal of the American Society for Information Science*，1990）中提出潜在语义索引。彼得·因迪克（Indyk）与拉吉夫·莫特瓦尼（Motwani）的局部敏感哈希（1998），以及埃尔韦·热古（Jégou）、马泰伊斯·杜兹（Douze）与科黛拉·施密德（Schmid）的 "Product quantization for nearest neighbor search"（*IEEE TPAMI*，2011）是近似搜索的里程碑；尤里·马利科夫（Malkov）与德米特里·亚舒宁（Yashunin）的 HNSW 于 2016 年以预印本亮相、2020 年登于 *IEEE TPAMI*；杰夫·约翰逊（Johnson）、杜兹与热古 2017 年发布 FAISS。戈登·科马克（Cormack）、查尔斯·克拉克（Clarke）与施特凡·比特赫尔（Büttcher）在 SIGIR 2009 提出倒数排名融合。神经时代，MS MARCO 段落排序数据集（阮（Nguyen）等人，2016）提供了大规模训练数据；尼尔斯·赖默斯（Reimers）与伊琳娜·古雷维奇（Gurevych）的 Sentence-BERT（2019）、罗德里戈·诺盖拉（Nogueira）与 Kyunghyun Cho 的 BERT 重排器（2019）、弗拉基米尔·卡尔普京（Karpukhin）等人的稠密段落检索（2020）、奥马尔·哈塔卜（Khattab）与马泰·扎哈里亚（Zaharia）的 ColBERT（2020）与帕特里克·刘易斯（Lewis）等人的检索增强生成（2020）奠定了各种架构；南丹·塔库尔（Thakur）等人的 BEIR 基准（2021）检验它们泛化得如何。
:::

## 后续内容

稠密检索为这门课从词的确切匹配到意义的学习匹配画上句号，可它几乎复用了之前每章的思想：检索单位与词元化的选择、倒排列表（如今装的是聚类）、压缩（如今压的是向量）、前 $k$ 选择与剪枝、作为强悍基线的概率打分、带判定与显著性检验的评测、用哈希去近似重复、多级排序。编码器本身、对比训练、向量数据库与面向语言模型的检索在 LLM Atlas 中继续（[text embeddings](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings)、[retrieval-augmented generation](/learn/llm/lesson.php?c=prompting-rag&l=retrieval-augmented-generation)）。把向量索引分发到多台机器上，引出 [[distributed-systems/distributed-storage]] 的划分问题；在 GPU 上跑 ANN 搜索，是 [[parallel-computing/gpu-programming]] 的一个应用。

::: summary
- **双编码器**（[[#def-biencoder]]）把查询与文档分别映到稠密向量、按内积打分；文档向量离线算好，检索成了最近邻搜索。它对付词汇不匹配。
- 编码器用**对比损失**（[[#def-infonce]]）训练，其梯度对得高分的负例推得最狠（[[#prop-infonce-grad]]）；批内负例与困难负例要紧，负例里混着的未标注正例会坏事。
- **MIPS** 加一个坐标即归约为欧氏最近邻搜索（[[#thm-mips]]）；单位向量下二者重合。
- **IVF**（[[#alg-ivf]]）只扫离查询最近的单元格；**乘积量化**（[[#def-pq]]）把向量压成几个字节、用查表打分（[[#prop-adc]]）；**图搜索**（[[#alg-beam]]）在 HNSW 这类可导航小世界图上只访问几百个结点。全都在 recall@$k$ 与时间、内存之间权衡，凭实验度量。
- 稠密与词法检索互补；**倒数排名融合**（[[#def-rrf]]）稳健地合并二者，学习型稀疏模型把神经词项权重放进倒排索引。
- **交叉编码器**重排一份短名单，准而贵；后期交互（ColBERT）是中间地带。
- 检索增强生成把整条流水线用于喂语言模型，必须既按检索、也按生成来评测。
:::

## 习题

::: exercise 穷举搜索的代价 {level=1 check="10^6 * 384"}
对 $10^6$ 个 384 维向量做穷举内积搜索，每次查询要多少次乘加？（填入数字。）
::: solution
每个存储向量一次长度 $384$ 的内积：$10^6 \times 384 = 3.84 \times 10^8$ 次乘加。单核 CPU 上 SIMD 有效速率 $10^{10}$ 每秒，约 $40$ ms——一百万个向量可以接受，十亿个就太慢。
:::
:::

::: exercise PQ 码的字节数 {level=1 check="96"}
768 维向量以 $m = 96$ 个子空间、每个 $K = 256$ 个质心作乘积量化。每个码占多少字节？（填入字节数。）
::: solution
每个子空间的下标要 $\log_2 256 = 8$ 位、一个字节，码共 $96$ 字节，对照浮点向量的 $768 \times 4 = 3\,072$ 字节：压缩 $32$ 倍。每个子空间的维数是 $768/96 = 8$。
:::
:::

::: exercise 三张表的 RRF {level=1}
三个系统把文档 $d$ 分别排在 $1$、$10$、（未出现）。文档 $e$ 排在 $3$、$3$、$3$。取 $\kappa = 60$，倒数排名融合后谁更高？
::: solution
$\mathrm{RRF}(d) = 1/61 + 1/70 = 0.01639 + 0.01429 = 0.03068$。$\mathrm{RRF}(e) = 3/63 = 0.04762$。被三个系统一致找到的 $e$，明显胜过被某一个系统排第一的 $d$。RRF 奖赏共识。
:::
:::

::: exercise 负例很多时的对比损失 {level=2}
某查询的正例得分 $0.6$，$n - 1$ 个负例各得 $0.4$，$\tau = 0.05$。计算 $n = 2$ 与 $n = 1024$ 时的 $p_+$。$1024$ 个候选时，多大的边距能让 $p_+ = 0.9$？
::: solution
$p_+ = 1/(1 + (n - 1)e^{-\Delta/\tau})$，$\Delta = 0.2$、$\Delta/\tau = 4$、$e^{-4} = 0.0183$。$n = 2$ 时 $p_+ = 1/1.0183 = 0.982$。$n = 1024$ 时 $p_+ = 1/(1 + 1023 \times 0.0183) = 1/19.74 = 0.0507$。要 $p_+ = 0.9$ 需 $(n-1)e^{-\Delta/\tau} = 1/9$，故 $\Delta = \tau\ln(9 \times 1023) = 0.05 \times 9.13 = 0.457$。负例多时模型必须把正例推开大得多的边距，这是大批次产出更好嵌入的原因之一。
:::
:::

::: exercise IVF 参数 {level=2 check="sqrt(10^8 * 16)"}
$N = 10^8$ 个向量的 IVF 索引、$n_{\mathrm{probe}} = 16$，每次查询的代价约为 $C + n_{\mathrm{probe}}N/C$ 次向量比较。哪个单元格数 $C$ 使它最小？（填入 $C$。）
::: solution
最小化 $f(C) = C + n_{\mathrm{probe}}N/C$：$f'(C) = 1 - n_{\mathrm{probe}}N/C^2 = 0$ 给出 $C = \sqrt{n_{\mathrm{probe}}N} = \sqrt{1.6 \times 10^9} = 40\,000$。代价是 $2C = 80\,000$ 次比较，文集的 $0.08\%$。实践中 $C$ 常取得比这个最优值更大，且质心自己也用一个小编索来搜，因为单元格大小不均，而固定 $n_{\mathrm{probe}}$ 下的查全率随单元格变细只改善到某个程度。
:::
:::

::: exercise 单位向量 {level=2}
证明单位向量 $\vec q$ 与 $\vec x$ 之下，按内积、按余弦、按欧氏距离排序给出同一个次序；再举例说明非单位向量下，按余弦与按内积排序可能不同。
::: solution
单位向量下余弦等于内积，而 $\norm{\vec q - \vec x}^2 = 2 - 2\,\vec q\cdot\vec x$ 是它的减函数（[[information-retrieval/vector-space#prop-cosine]]）。非单位向量取 $\vec q = (1, 0)$、$\vec x_1 = (1, 0)$、$\vec x_2 = (3, 3)$。内积：$1$ 与 $3$，$\vec x_2$ 排第一。余弦：$1$ 与 $3/(3\sqrt2) = 0.707$，$\vec x_1$ 排第一。以内积训练的模型可能拿向量长度编码点什么（热度或置信度），归一化会把它丢掉；相似度的选择必须与训练一致。
:::
:::

::: exercise k-NN 图为何失灵？ {level=3}
解释为什么在聚簇数据的纯 $k$ 最近邻图上做贪心搜索，即便束很大也可能找不到查询的邻居，而增量插入（NSW）为何有帮助。再提出两种别的补救。
::: solution
$k$-NN 图里每个结点只连它最近的 $k$ 个点，聚簇数据上它们都在自己簇内。簇间的边只出现在少数贴着簇边界的点上，有些簇甚至根本不与其他簇相连。贪心搜索朝与查询更相似的邻居走；起点在错误的簇里，只有借边界点才可能到达正确的簇，而一旦访问过的结点都到不了那里，它便停局部最优——加宽束能扩大搜索，却仍可能先把起始簇耗尽，$\mathit{ef} = 80$ 时查全率才 $0.78$ 便是明证。增量构建中，最早的结点插进近乎空的图，它们"最近"的已插入邻居远在天涯；这些长程边构成稀疏的骨架，贪心搜索借它几步就能跨簇，如小世界网络。别的补救：(1) 从多个入口出发，或从每个簇的质心出发（IVF 式的第一步）；(2) 显式加长程链接，例如随机边，或 HNSW 的等级——上层结点少、链接长；(3) 像 HNSW 那样按方向多样性修剪邻居表，保住几条指向簇外的链接。
:::
:::

::: exercise 实现乘积量化搜索 {level=3}
以本章清单里的 `build_pq` 和 `pq_scores` 函数为蓝本，写一个搜索 IVF 索引的函数，其列表存的是**残差** $\vec x - \vec c_j$ 的 PQ 码（$\vec c_j$ 是单元格质心），并解释同样的位数下，残差编码为什么比直接编码 $\vec x$ 更准。
::: solution
单元格 $j$ 中的向量，存 $\vec r = \vec x - \vec c_j$ 的 PQ 码。对查询，$\vec q\cdot\vec x = \vec q\cdot\vec c_j + \vec q\cdot\vec r \approx \vec q\cdot\vec c_j + \sum_s \vec q^{(s)}\cdot\vec c^{(s)}_{i_s}$，所以分数是单元格质心的分数加上用*同一张*表做的 PQ 查表（内积如此；欧氏距离的表则依赖单元格）。

```python
def ivf_pq_search(q, nprobe, cent, lists, books, m, sub, k=10):
    """lists[j]: (docID, 残差 x - cent[j] 的码) 的列表。"""
    table = [[dot(q[s * sub:(s + 1) * sub], c) for c in books[s]] for s in range(m)]
    cells = heapq.nlargest(nprobe, range(len(cent)), key=lambda j: dot(q, cent[j]))
    scored = ((dot(q, cent[j]) + sum(table[s][code[s]] for s in range(m)), doc)
              for j in cells for doc, code in lists[j])
    return [doc for _, doc in heapq.nlargest(k, scored)]
```

残差更准，是因为它们更小、也更像样：单元格质心削掉了每个向量大而单元格专属的部分，码本——在所有单元格的残差上训练——只需描述向量*绕着*质心的散布，其方差比向量本身小得多。同样 $K^m$ 个重构点铺在更小的区域上，量化误差就下降。热古、杜兹与施密德的 IVFADC 用的正是这一设计。
:::
:::
