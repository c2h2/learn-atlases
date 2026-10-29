嵌入模型（[[prompting-rag/text-embeddings]]）把文档集合中的每个段落变成一个向量，把查询也变成一个。检索于是成了一个几何问题：存储的向量中，哪些离查询向量最近？只有一千个段落时，答案就是一个循环。面对一亿个 $768$ 维的段落，这个循环每次查询要读 $300$ GB 内存，而必须在毫秒之内作答的搜索引擎负担不起。

本章讲如何快速回答这个问题。先从精确检索讲起，并证明对归一化向量而言，三种常用相似度——余弦、点积与欧氏距离——给出的排序完全相同。随后搭建**近似最近邻**（ANN）索引的几个主要家族：只搜索最有希望的若干簇的倒排文件、把向量压缩到几字节的乘积量化，以及在向量数据库中占主导地位的 HNSW 图。一个纯 Python 实验测量召回率与工作量之间的权衡。最后一部分回到词语：手工计算的 BM25 排序函数，以及用倒数排名融合结合关键词排序与向量排序的**混合检索**。计算机科学图谱把索引这一侧讲得更深——[倒排索引](/learn/cs/lesson.php?c=information-retrieval&l=inverted-indexes)、[BM25 与概率检索](/learn/cs/lesson.php?c=information-retrieval&l=probabilistic-retrieval)、[稠密检索](/learn/cs/lesson.php?c=information-retrieval&l=dense-retrieval)——其中还有 IVF、乘积量化与图搜索的自有实现，本章链接过去而不重复其内容。

## 精确检索与相似度的选择 {#sec-exact}

::: definition $k$ 最近邻检索 {#def-knn}
给定集合 $X = \{\mathbf{x}_1, \dots, \mathbf{x}_N\}\subset\R^{d}$、查询 $\mathbf{q}\in\R^{d}$ 与分数 $s(\mathbf{q}, \mathbf{x})$（越大越好），**$k$ 最近邻检索**返回分数最大的 $k$ 个向量的下标。常用的分数是**内积** $\mathbf{q}^\top\mathbf{x}$、**余弦** $\mathbf{q}^\top\mathbf{x}/(\lVert\mathbf{q}\rVert\lVert\mathbf{x}\rVert)$ 与**负欧氏距离** $-\lVert\mathbf{q} - \mathbf{x}\rVert$。当分数是不加归一化的内积时，该问题称为**最大内积检索**（MIPS）。
:::

暴力穷举的精确检索计算所有 $N$ 个分数，用一个堆保留最好的 $k$ 个，每次查询的成本是 $Nd$ 次乘加。它的三大优点是精确、更新容易、且是可完美并行的：在加速卡上，一批查询的分数就是一次矩阵乘。

::: example 暴力检索的代价 {#ex-brute}
一个集合有 $N = 10^7$ 个段落，嵌入为 $d = 768$ 维。这些向量用 32 位浮点占多少内存？一次查询需要多少次浮点运算？若 $500$ GB/s 的内存带宽是瓶颈，需要多长时间？
::: solution
内存：$10^7\cdot768\cdot4 = 3.07\times10^{10}$ 字节，约 $30.7$ GB。运算量：$2Nd = 1.54\times10^{10}$ 次浮点运算（每个坐标一次乘法一次加法）。每次查询必须读完整个 $30.7$ GB，按 $500$ GB/s 约需 $61$ ms——瓶颈是带宽而不是算术（[[math-for-ml/vectors-matrices#prop-flops]] 讨论了算术强度）。把 $64$ 个查询凑成一批只需读数据一次，这就是暴力检索在批量任务和小集合上很有竞争力、而对大集合做交互式检索需要索引的原因。
:::
:::

用哪种分数由嵌入模型的训练方式决定，但对归一化向量而言，这种选择无关紧要。

::: proposition 单位向量下三种相似度的等价性 {#prop-equivalence}
若 $\lVert\mathbf{q}\rVert = 1$ 且对所有 $i$ 有 $\lVert\mathbf{x}_i\rVert = 1$，则

$$
\lVert\mathbf{q} - \mathbf{x}_i\rVert^2 = 2 - 2\,\mathbf{q}^\top\mathbf{x}_i,
$$ {#eq-l2-dot}

因此按欧氏距离递增、按内积递减、按余弦递减排序给出同一顺序。若只归一化查询，内积与余弦也只有当所有 $\lVert\mathbf{x}_i\rVert$ 相等时才彼此一致。
:::

::: proof
展开：对单位向量 $\lVert\mathbf{q} - \mathbf{x}\rVert^2 = \lVert\mathbf{q}\rVert^2 - 2\mathbf{q}^\top\mathbf{x} + \lVert\mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$。映射 $t\mapsto\sqrt{2 - 2t}$ 在 $[-1, 1]$ 上严格递减，所以内积越大距离越小，两种顺序重合；对单位向量而言余弦**就是**内积。若 $\mathbf{x}_i$ 不归一化，$\mathbf{q}^\top\mathbf{x}_i = \lVert\mathbf{x}_i\rVert\cos\theta_i$，它只有当各范数相等时才对一切查询都按 $\cos\theta_i$ 的次序排列。
:::

::: widget plot
f: sqrt(2 - 2*cos(x))
x: 0, pi
y: 0, 2.1
piticks: true
labels: $\lVert\mathbf{q} - \mathbf{x}\rVert$ for unit vectors at angle $\theta$
points: 0.6435,0.6325
caption: 两个单位向量之间的欧氏距离对它们之间夹角的曲线，即 [[#eq-l2-dot]] 中的 $\sqrt{2 - 2\cos\theta}$。它随夹角严格递增，所以对归一化嵌入来说，距离最近、内积最大与余弦最大是同一回事。标注的点是余弦 $0.8$（$\theta = 0.644$），距离为 $0.632$。
:::

当索引只支持欧氏距离、模型却是为未归一化的内积训练的时候，一个简单的变换能把 MIPS 归约为最近邻检索。

::: proposition 将 MIPS 归约为欧氏检索 {#prop-mips}
设 $M\ge\max_i\lVert\mathbf{x}_i\rVert$。把每个存储向量映为 $\tilde{\mathbf{x}}_i = \big(\mathbf{x}_i,\ \sqrt{M^2 - \lVert\mathbf{x}_i\rVert^2}\big)\in\R^{d+1}$，把查询映为 $\tilde{\mathbf{q}} = (\mathbf{q}, 0)$。则 $\lVert\tilde{\mathbf{q}} - \tilde{\mathbf{x}}_i\rVert^2 = \lVert\mathbf{q}\rVert^2 + M^2 - 2\mathbf{q}^\top\mathbf{x}_i$，所以 $\tilde{\mathbf{q}}$ 的欧氏最近邻就是与 $\mathbf{q}$ 内积最大的向量。
:::

::: proof
每个 $\tilde{\mathbf{x}}_i$ 的平方范数为 $\lVert\mathbf{x}_i\rVert^2 + M^2 - \lVert\mathbf{x}_i\rVert^2 = M^2$，且由于 $\tilde{\mathbf{q}}$ 多出的坐标是 $0$，$\tilde{\mathbf{q}}^\top\tilde{\mathbf{x}}_i = \mathbf{q}^\top\mathbf{x}_i$。像前面一样展开得 $\lVert\tilde{\mathbf{q}} - \tilde{\mathbf{x}}_i\rVert^2 = \lVert\mathbf{q}\rVert^2 + M^2 - 2\mathbf{q}^\top\mathbf{x}_i$。前两项不依赖 $i$，所以最小化距离就是最大化内积。
:::

## 倒排文件 {#sec-ivf}

避免全量扫描的第一个想法是聚类。把集合划分成若干簇，每簇配一个代表性质心，查询就只需与质心最近的那几个簇里的向量比较。这与词语的倒排索引是同一个想法（[倒排索引](/learn/cs/lesson.php?c=information-retrieval&l=inverted-indexes)），只是用簇代替词条，因此沿用了同样的名字。

::: algorithm 倒排文件（IVF）索引 {#alg-ivf}
**构建。** 对（集合的样本）运行 $k$-means，得到 $n_{\text{list}}$ 个质心 $\mathbf{c}_1, \dots, \mathbf{c}_{n_{\text{list}}}$。把每个向量分配到最近的质心，对每个质心存下它那一列向量。

**检索**，参数为 $n_{\text{probe}}$。把 $\mathbf{q}$ 与所有质心比较；取最近的 $n_{\text{probe}}$ 个；对它们列表中的向量算精确分数；返回最好的 $k$ 个。
:::

若各簇均衡，一次查询的成本是 $n_{\text{list}}$ 次质心比较，加上约 $N\,n_{\text{probe}}/n_{\text{list}}$ 次向量比较。当 $n_{\text{list}}\approx\sqrt N$ 时，两项都约为 $\sqrt N\cdot n_{\text{probe}}$，所以 $10^6$ 个向量的集合每个探针只需几千次比较，而不是以一百万计。代价是准确性：一个真正的近邻若恰好落在未探测的簇里、只差半个簇的边界，就会被错过。近似索引的质量对照精确检索来衡量。

::: definition 近似索引的召回率 {#def-ann-recall}
对查询 $\mathbf{q}$，记 $T(\mathbf{q})$ 为精确的 top-$k$ 集合，$R(\mathbf{q})$ 为索引返回的集合。索引的**召回率 recall@$k$** 是对 $\lvert T(\mathbf{q})\cap R(\mathbf{q})\rvert/k$ 按查询取平均。（它衡量的是与精确检索的一致程度；结果对用户是否**相关**是另一个问题，见 [[prompting-rag/rag-evaluation]]。）
:::

下面的代码清单用纯 Python 在 $4000$ 个带簇结构的单位向量上搭起一个暴力搜索器和一个 IVF 索引，并对若干个 $n_{\text{probe}}$ 值测量 recall@$10$ 与被扫描的集合比例。

```python
import math, random
rng = random.Random(42)
N, d, k, nlist = 4000, 16, 10, 40

def unit(v):
    n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
def dot(a, b): return sum(x*y for x, y in zip(a, b))

# 带簇结构的单位向量：25 个主题，每个向量 = 主题方向 + 噪声
topics = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(25)]
def sample(): t = rng.choice(topics); return unit([a + rng.gauss(0, 0.7) for a in t])
X = [sample() for _ in range(N)]                       # N x d 数据库
Qs = [sample() for _ in range(50)]                     # 50 个查询

def brute_force(q, k):                                 # 按内积的精确 top-k
    return sorted(range(N), key=lambda i: -dot(q, X[i]))[:k]

# IVF：在单位球面上做 k-means（球面 k-means），再建倒排列表
cent = [X[i][:] for i in rng.sample(range(N), nlist)]
for it in range(8):
    assign = [max(range(nlist), key=lambda c: dot(x, cent[c])) for x in X]
    for c in range(nlist):
        members = [X[i] for i in range(N) if assign[i] == c]
        if members: cent[c] = unit([sum(col) for col in zip(*members)])
lists = [[] for _ in range(nlist)]
for i, c in enumerate(assign): lists[c].append(i)

def ivf_search(q, k, nprobe):
    probe = sorted(range(nlist), key=lambda c: -dot(q, cent[c]))[:nprobe]
    cand = [i for c in probe for i in lists[c]]
    return sorted(cand, key=lambda i: -dot(q, X[i]))[:k], len(cand)

truth = [set(brute_force(q, k)) for q in Qs]
print(f"N={N} d={d} nlist={nlist}  list sizes min {min(map(len, lists))} max {max(map(len, lists))}")
for nprobe in (1, 2, 4, 8, 16):
    rec = scanned = 0
    for q, t in zip(Qs, truth):
        res, n = ivf_search(q, k, nprobe)
        rec += len(t & set(res)) / k; scanned += n
    print(f"nprobe {nprobe:2d}: recall@{k} {rec/len(Qs):.3f}   vectors scanned {scanned/len(Qs)/N:6.1%}")
```

```text
N=4000 d=16 nlist=40  list sizes min 15 max 173
nprobe  1: recall@10 0.802   vectors scanned   3.1%
nprobe  2: recall@10 0.942   vectors scanned   5.3%
nprobe  4: recall@10 0.986   vectors scanned  10.2%
nprobe  8: recall@10 0.998   vectors scanned  20.2%
nprobe 16: recall@10 1.000   vectors scanned  39.9%
```

探测一个簇，扫描集合的 $3\%$ 就能找到 $80\%$ 的真近邻；探测四个簇，用十分之一的工作量找到 $98.6\%$。这条曲线上的每个点都是正当的工作点，选择哪一个，正是每个 ANN 索引通过 $n_{\text{probe}}$ 这类参数暴露出来的**召回率–延迟权衡**。输出里有两处值得注意。一是各簇不均衡（从 $15$ 到 $173$ 个向量）：$k$-means 跟着数据的簇走，所以每次查询的工作量取决于查询落在哪里。二是数据有簇结构；在毫无结构的随机向量上，同样的 $n_{\text{probe}}$ 下 IVF 差得多，一道习题会演示这一点。真实的嵌入按主题聚成簇，这就是 IVF 对它们有效的原因。

::: example IVF 索引的规模 {#ex-ivf-size}
$N = 10^7$ 个向量时，常用的经验法则是取 $n_{\text{list}}\approx4\sqrt N$。那是多少个簇？平均每簇多少个向量？$n_{\text{probe}} = 32$ 时一次查询做多少次比较？
::: solution
$4\sqrt{10^7}\approx12{,}650$ 个簇，平均每簇约 $790$ 个向量。一次查询与全部 $12{,}650$ 个质心比较，再与 $32\cdot790\approx25{,}300$ 个向量比较——约 $38{,}000$ 次比较而不是 $10^7$ 次，缩小 $260$ 倍。$n_{\text{probe}} = 32$ 时的召回率必须像代码清单那样在保留的查询上实测。
:::
:::

## 乘积量化 {#sec-pq}

IVF 省下的是时间不是内存：完整向量照存不误。**乘积量化**（PQ；Jégou、Douze 与 Schmid，2011）把向量压缩起来。

::: definition 乘积量化 {#def-pq}
把 $\R^{d}$ 分成 $m$ 个维数为 $d/m$ 的子空间，使 $\mathbf{x} = (\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(m)})$。对每个子空间 $j$，用 $k$-means 学一个由 $K$ 个质心 $\mathbf{c}^{(j)}_1, \dots, \mathbf{c}^{(j)}_K\in\R^{d/m}$ 组成的**码本**（典型取 $K = 256$）。用 $\mathbf{x}$ 在每个子空间中最近质心的 $m$ 个下标来编码它；其重构为 $\hat{\mathbf{x}} = (\mathbf{c}^{(1)}_{i_1}, \dots, \mathbf{c}^{(m)}_{i_m})$。当 $K = 256$ 时每个下标占一个字节，于是一个码占 $m$ 个字节。
:::

到压缩向量的距离不必解压就能算，因为平方欧氏距离可按子空间拆开：

$$
\lVert\mathbf{q} - \hat{\mathbf{x}}\rVert^2 = \sum_{j=1}^{m}\big\lVert\mathbf{q}^{(j)} - \mathbf{c}^{(j)}_{i_j}\big\rVert^2.
$$ {#eq-adc}

对每个查询，先算好一张 $m\times K$ 的距离表 $\lVert\mathbf{q}^{(j)} - \mathbf{c}^{(j)}_c\rVert^2$；此后到任何存储码字的距离就是 $m$ 次查表相加。这叫**非对称距离计算**：查询保持精确，只有数据库被量化。内积也按同样的方式按子空间拆开。

::: example 压缩一个集合 {#ex-pq}
$768$ 维向量用 $m = 96$ 个子空间、每个 $K = 256$ 个质心做乘积量化。码字多大？相对 32 位浮点的压缩倍数是多少？码本多大？算一次距离的成本是多少？
::: solution
每个码 $96$ 字节，而原来 $768\cdot4 = 3072$ 字节：小 $32$ 倍，于是 $10^7$ 个向量占 $0.96$ GB 而不是 $30.7$ GB。码本存 $96\cdot256$ 个 $8$ 维质心，共 $96\cdot256\cdot8\cdot4 = 786{,}432$ 字节，可忽略不计。每次查询建表花 $96\cdot256\cdot8\approx197{,}000$ 次乘加，只花一次；此后每个距离只需 $96$ 次查表与加法，而不是 $768$ 次乘加。
:::
:::

PQ 距离是近似的，所以系统先用 PQ 距离检回几百个候选，若有精确向量可调用（比如存在磁盘上）再**重排序**。把它与倒排文件结合——对相对簇质心的残差 $\mathbf{x} - \mathbf{c}$ 做量化——就得到 IVF-PQ，十亿级向量集合的主力方案；开源库 FAISS（Johnson、Douze 与 Jégou，2017）让这些方法得到了普及。更粗糙的压缩也很常见：对每个坐标做 8 位标量量化（体积四分之一）和二进制码（每个坐标一个比特，小 $32$ 倍），后者的距离是汉明距离。

## 图索引与 HNSW {#sec-hnsw}

另一个想法是把每个向量与它的部分近邻连起来，靠沿图行走搜索：从一个入口点出发，反复走向离查询最近的那个邻居，直到没有邻居更近为止。在一张建得好的图上，走几十步就能从任何地方到达查询的邻域。难点是建出这样的图：在上面贪心行走既不会卡在局部极小，也不走太多步。

**分层可导航小世界图**（HNSW；Malkov 与 Yashunin，arXiv 2016，IEEE TPAMI 2018 在线发表）用一层层类似跳表的结构同时解决这两个问题。每个向量都插入第 $0$ 层；随机的一小部分还插入第 $1$ 层，更小的部分插入第 $2$ 层，如此等等。上层稀疏，所以那里的链接很长，贪心行走几步就能横穿整个集合；下层稠密，行走可以在其中精化自己的位置。

::: definition HNSW {#def-hnsw}
每个插入的元素抽一个**层号** $\ell = \lfloor -\ln(U)\,m_L\rfloor$，其中 $U$ 在 $(0, 1]$ 上均匀分布、$m_L = 1/\ln M$，并把它插入第 $0, \dots, \ell$ 层。在每一层，它至多与 $M$ 个近邻相连（第 $0$ 层至多 $2M$ 个）：这些近邻是用大小为 $ef_{\text{construction}}$ 的候选列表在已建成的图上搜索得到的，并用偏向选取方向多样的邻居的启发式来挑选。**检索**从最高层的入口点出发，在每一层贪心地走向最近的元素并下降一层；到第 $0$ 层后运行最佳优先搜索，保留已发现的最好的 $ef_{\text{search}}\ge k$ 个候选，返回前 $k$ 个。
:::

::: proposition 层数的分布 {#prop-levels}
取 $m_L = 1/\ln M$ 时，一个元素到达第 $\ell$ 层或更高的概率是 $M^{-\ell}$。$N$ 个元素中，落在第 $\ge\ell$ 层的期望个数是 $NM^{-\ell}$，所以非空层数的期望约为 $\log_M N$。
:::

::: proof
$\lfloor -\ln(U)m_L\rfloor\ge\ell$ 当且仅当 $-\ln(U)m_L\ge\ell$，即 $U\le e^{-\ell/m_L} = e^{-\ell\ln M} = M^{-\ell}$，对均匀的 $U$ 而言概率就是 $M^{-\ell}$。由期望的线性性，$N$ 个元素对第 $\ell$ 层及以上贡献 $NM^{-\ell}$。一旦 $\ell > \log_MN$，它就小于 $1$。
:::

::: example 一百万向量索引的层 {#ex-hnsw}
一个 HNSW 索引存有 $N = 10^6$ 个向量，$M = 16$。第 $\ge1, 2, 3, 4, 5$ 层各期望有多少个向量？第 $0$ 层的链接用 $4$ 字节标识符要占多少内存？
::: solution
按 $NM^{-\ell}$：$62{,}500$、$3906$、$244$、$15$，以及大约 $1$ 个。所以索引约有 $5$ 层，$\log_{16}10^6 = 4.98$；检索会先在每一上层访问寥寥几个元素，然后才到第 $0$ 层做主要的功。第 $0$ 层每个元素至多 $2M = 32$ 条链接：$10^6\cdot32\cdot4 = 128$ MB，加在 $768$ 维向量的 $3$ GB 之上。HNSW 把两者都放在内存里，这是它的主要开销；基于磁盘的图索引与建立在压缩向量上的图面向更大的集合。
:::
:::

::: widget graph
nodes: e@0,2; a@2,3; b@4,2.6; c@1,1; f@3,1.2; g@5,1; h@2,0; q@4.5,0
edges: e-a:2.2; a-b:2; e-c:1.4; c-f:2; a-f:2.1; b-g:1.9; f-g:2; c-h:1.4; f-h:1.6; g-q:1.1; f-q:1.9
algorithm: dijkstra
start: e
caption: 二维平面上的一张小型邻近图，边权等于距离；$q$ 是离查询最近的元素。HNSW 检索贪心地行走：从入口点 $e$ 出发，走向离查询最近的邻居，这里是 $e\to c\to f\to q$，直到没有更近的邻居为止。这里逐步演示的 Dijkstra 算法穷尽地探索同一张图；贪心行走只访问少数几个节点，这正是图搜索快的原因——而高层的长程链接正是大图里步数保持很少的原因。
:::

这些参数摆出的是那个熟悉的权衡：更大的 $M$ 与 $ef_{\text{construction}}$ 建出更好的图，但更慢、更占内存；更大的 $ef_{\text{search}}$ 提高召回率，代价是延迟。在公开基准上（如 ANN-Benchmarks，Aumüller et al., 2020），内存内的搜索中，图索引在给定速度下给出数一数二的召回率。截至 2026 年，支持向量的多数向量数据库与搜索引擎都提供 HNSW，通常连同 IVF 与量化选项一起；哪种索引最好取决于集合规模、内存、更新速率和应用需要的召回率，应当实测。

::: warning 快速索引可能掩盖召回率问题
ANN 索引不动声色地用精确性换速度：无论发生什么，它都返回 $k$ 个结果，输出里没有任何东西说明真正的最近邻被错过了。每当改动参数、嵌入模型或集合时，都在真实查询的样本上对照暴力检索测量索引的召回率；也不要把它与结果的相关性混为一谈——在很差的嵌入上，即使召回率完美的索引，返回的仍是差结果。过滤（例如"只要 2025 年的文档"）与某些索引配合得很糟：若过滤在近似检索之后才套用，幸存的结果可能寥寥无几甚至一个不剩。
:::

::: quiz
对于单位归一化的嵌入，某系统把索引从内积检索换成欧氏距离检索。结果会怎样？
- [x] 什么都不变：由 [[#eq-l2-dot]]，两者对向量的排序完全相同。
- [ ] 顺序反转，因为距离取最小而内积取最大。
- [ ] 除非用不同的簇数重建索引，结果会变。
- [ ] 欧氏检索会先返回范数最大的向量。
::: solution
对单位向量，$\lVert\mathbf{q} - \mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$ 是内积的减函数，所以最小的距离恰好是最大的内积。（近似索引返回的集合仍可能略有不同，因为其内部结构不同；但精确答案是一样的。）
:::
:::

## 关键词检索：BM25 {#sec-bm25}

稠密嵌入并非总是最好的检索器。它们会错过真正要紧的精确匹配——产品编号、罕见的姓氏、一条错误消息——因为嵌入把含义摊在多个维上，把罕见的字符串当成噪声。关键词排序函数做精确的词匹配，且无需训练。应用最广的是 **BM25**（Robertson 与合作者在 1990 年代提出；Robertson 与 Zaragoza, 2009 有综述），它来自[计算机科学图谱](/learn/cs/lesson.php?c=information-retrieval&l=probabilistic-retrieval)中的相关性概率模型。

::: definition BM25 {#def-bm25}
查询 $q$ 与长度 $\mathrm{dl}_d$ 个词元的文档 $d$，集合共 $N$ 个文档、平均长度 $\mathrm{avgdl}$，词条 $t$ 在 $d$ 中出现 $\mathrm{tf}_{t,d}$ 次、共出现在 $n_t$ 个文档中，则

$$
\operatorname{BM25}(q, d) = \sum_{t\in q}\operatorname{idf}(t)\cdot\frac{(k_1 + 1)\,\mathrm{tf}_{t,d}}{\mathrm{tf}_{t,d} + k_1\big(1 - b + b\,\mathrm{dl}_d/\mathrm{avgdl}\big)},\qquad \operatorname{idf}(t) = \ln\!\Big(1 + \frac{N - n_t + 0.5}{n_t + 0.5}\Big),
$$ {#eq-bm25}

参数通常取 $k_1\in[1.2, 2]$、$b = 0.75$。（最初的 Robertson–Spärck Jones 权重 $\ln\frac{N - n_t + 0.5}{n_t + 0.5}$ 对出现在一半以上文档中的词条取负值；Lucene 与许多其他引擎采用的"$1 +$"形式避免了这一点。）
:::

那个分式会饱和：词条第一次出现贡献最大，往后的贡献递减，趋近极限 $k_1 + 1$，$k_1$ 决定趋近得多快；因子 $1 - b + b\,\mathrm{dl}/\mathrm{avgdl}$ 惩罚长文档——它们纯属偶然地含有更多词条——$b$ 决定惩罚得多重。

::: example 手算 BM25 {#ex-bm25}
五个文档：$d_1$ *the cat sat on the mat*（$6$ 个词元）、$d_2$ *the dog chased the cat*（$5$ 个）、$d_3$ *dogs and cats are pets*（$5$ 个）、$d_4$ *a mat for a dog*（$5$ 个）、$d_5$ *the cat and the other cat*（$6$ 个）。用 $k_1 = 1.2$、$b = 0.75$ 给查询 *cat mat* 排序。
::: solution
$N = 5$，$\mathrm{avgdl} = 27/5 = 5.4$。词 *cat* 出现在 $d_1$、$d_2$、$d_5$（$n = 3$），*mat* 出现在 $d_1$、$d_4$（$n = 2$）：

$$
\operatorname{idf}(\textit{cat}) = \ln\!\big(1 + \tfrac{2.5}{3.5}\big) = 0.539, \qquad \operatorname{idf}(\textit{mat}) = \ln\!\big(1 + \tfrac{3.5}{2.5}\big) = 0.875.
$$

长度因子 $K = 1.2(0.25 + 0.75\,\mathrm{dl}/5.4)$ 在 $6$ 个词元时为 $1.3$，在 $5$ 个词元时为 $1.133$。于是：

- $d_1$：$0.539\cdot\frac{2.2}{1 + 1.3} + 0.875\cdot\frac{2.2}{1 + 1.3} = 0.516 + 0.837 = 1.353$；
- $d_4$：$0.875\cdot\frac{2.2}{1 + 1.133} = 0.903$；
- $d_5$：$0.539\cdot\frac{2.2\cdot2}{2 + 1.3} = 0.719$；
- $d_2$：$0.539\cdot\frac{2.2}{1 + 1.133} = 0.556$；
- $d_3$：$0$。

排序是 $d_1, d_4, d_5, d_2, d_3$。更罕见的词 *mat* 比 *cat* 权重大；$d_5$ 里两次 *cat* 的得分不到一次的得分的两倍；而讲猫的 $d_3$ 得零分，因为 *cats* 不是词元 *cat*——这种词表错配，词干提取能修，稠密检索则天然能处理。
:::
:::

## 混合检索 {#sec-hybrid}

关键词检索与稠密检索的失败方式不同：BM25 错过换言表达，嵌入错过精确标识符与罕见词。两者结合往往胜过单独任何一种；在零样本检索基准 BEIR（Thakur et al., 2021）上，BM25 始终是一个强劲的基线，当时许多稠密检索器在其训练域之外都赢不了它。两种分数量纲不同——BM25 无上界，余弦落在 $[-1, 1]$——直接相加需要跨查询十分脆弱的归一化。**倒数排名融合**干脆绕开分数。

::: definition 倒数排名融合 {#def-rrf}
给定一组文档的若干排序 $r_1, \dots, r_m$，记 $r_j(d)$ 为 $d$ 在第 $j$ 个排序中的名次（从 $1$ 开始），**倒数排名融合**（RRF；Cormack、Clarke 与 Büttcher, 2009）的分数为

$$
\operatorname{RRF}(d) = \sum_{j=1}^{m}\frac{1}{k + r_j(d)},
$$

其中 $k$ 是常数，通常取 $k = 60$；未出现在第 $j$ 个排序中的文档对该排序不贡献。按 $\operatorname{RRF}(d)$ 从大到小返回文档。
:::

::: example 融合两个排序 {#ex-rrf}
对查询 *cat mat*，BM25 排 $d_1, d_4, d_5, d_2$（来自 [[#ex-bm25]]，去掉得零分的 $d_3$）。某个稠密检索器排 $d_3, d_1, d_2, d_5$。用 $k = 60$ 融合两者。
::: solution
$d_1$：$\frac1{61} + \frac1{62} = 0.03252$。$d_5$：$\frac1{63} + \frac1{64} = 0.03150$。$d_2$：$\frac1{64} + \frac1{63} = 0.03150$。$d_3$：$\frac1{61} = 0.01639$。$d_4$：$\frac1{62} = 0.01613$。融合后的次序是 $d_1$，接着并列的 $d_5$ 与 $d_2$，然后 $d_3$，最后 $d_4$。两个检索器都认为还不错的文档会升到最前面。较大的常数 $k$ 抹平了排第一的好处：在一个列表里排第 $1$（$0.0164$）并不比排第 $3$（$0.0159$）高多少，所以列表之间的一致比单个榜首位置更要紧。
:::
:::

还有别的组合：归一化分数的加权和、学习式融合，以及像 SPLADE（Formal et al., 2021）这样的**学习式稀疏检索**——它用一个 Transformer 产生一个带权词表词条的稀疏向量（包含原文中并未出现的关联词），可以用倒排索引检索。截至 2026 年，许多搜索引擎与向量数据库原生支持混合检索，默认融合方式通常是 RRF。

::: history
最近邻检索历史悠久：$k$-d 树（Bentley, 1975）在低维很好用，到高维就退化得接近线性扫描，即"维度灾难"。局部敏感哈希（Indyk 与 Motwani, 1998）给出了第一批有保证的次线性近似方法。Jégou、Douze 与 Schmid（2011）提出乘积量化与 IVF-ADC 索引，FAISS 库（Johnson、Douze 与 Jégou, 2017）让十亿级规模的 GPU 检索变得可行。基于图的搜索从可导航小世界图（Malkov et al., 2014）发展出 HNSW（Malkov 与 Yashunin, 2016），随后出现了基于磁盘的图索引（DiskANN，Subramanya et al., 2019）。Shrivastava 与 Li（2014）以及 Bachrach et al.（2014）给出了把 MIPS 归约为最近邻检索的方法。在词法一侧，逆文档频率可追溯到 Spärck Jones（1972），BM25 来自 Robertson 与合作者在 1990 年代的 Okapi 系统；Cormack、Clarke 与 Büttcher（2009）提出倒数排名融合，而稠密—稀疏混合自 2021 年前后起成为面向语言模型检索的标准做法。
:::

::: summary
- 精确的 $k$ 最近邻检索每次查询成本 $Nd$、受带宽限制；它精确而简单，对小集合与批量任务已经够用。
- 单位向量满足 $\lVert\mathbf{q} - \mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$，所以欧氏、内积与余弦三种排序重合；未归一化的 MIPS 通过追加一个坐标归约为欧氏检索。
- IVF 把集合聚类、探测最近的 $n_{\text{probe}}$ 个簇；召回率随 $n_{\text{probe}}$ 上升、速度随之下降，数据中的簇结构是它奏效的原因。
- 乘积量化每个向量只存 $m$ 个字节，距离靠查表计算；用精确向量重排序可以恢复精度。
- HNSW 建立分层的邻近图，层号的抽取使得到达第 $\ell$ 层的元素期望为 $NM^{-\ell}$，检索时从顶层贪心下降；它以内存为代价换来出色的召回率–速度权衡。
- 一定要对照暴力检索测量 ANN 索引的召回率；召回率不是相关性。
- BM25 按经饱和化、经长度归一化的词频乘以 idf 加权来排序；混合检索融合关键词排序与向量排序，最简单的方式是倒数排名融合。
:::

## 习题

::: exercise 精确检索的内存 {level=1 check="30.72"}
$10^7$ 个 $768$ 维的 32 位浮点向量占多少吉字节（$10^9$ 字节）？
::: solution
$10^7\cdot768\cdot4 = 3.072\times10^{10}$ 字节，即 $30.72$ GB。
:::
:::

::: exercise 由余弦求距离 {level=1 check="0.632"}
两个单位向量的余弦相似度为 $0.8$。它们的欧氏距离是多少（保留三位小数）？
::: solution
由 [[#eq-l2-dot]]，$\sqrt{2 - 2\cdot0.8} = \sqrt{0.4} = 0.632$。
:::
:::

::: exercise IVF 扫描的向量数 {level=1 check="80000"}
一个 IVF 索引把 $10^7$ 个向量均衡地放在 $1000$ 个簇中。$n_{\text{probe}} = 8$ 的一次查询大约要与多少个向量比较（不算质心）？
::: solution
每簇 $10^4$ 个向量，$8$ 簇共 $8\cdot10^4 = 80{,}000$ 个，占集合的 $0.8\%$。
:::
:::

::: exercise 一个 PQ 码 {level=1 check="64"}
$1024$ 维向量被乘积量化成 $64$ 个子向量、每个 $256$ 个质心。每个码多少字节？相对 32 位浮点的压缩倍数是多少？
::: solution
每个子向量一个字节：$64$ 字节，而原来是 $4096$ 字节——$64$ 倍。
:::
:::

::: exercise HNSW 的高层 {level=2 check="31250"}
一个 $M = 32$ 的 HNSW 索引存有 $10^6$ 个向量。第 $1$ 层及以上期望有多少个？索引大约有几层？
::: solution
由 [[#prop-levels]]，第 $\ge1$ 层 $10^6/32 = 31{,}250$ 个，$\ge2$ 层 $977$ 个，$\ge3$ 层 $31$ 个，$\ge4$ 层约 $1$ 个：大约 $4$ 层（$\log_{32}10^6 = 3.99$）。
:::
:::

::: exercise 又一个 BM25 分数 {level=2 check="1.806"}
在 [[#ex-bm25]] 的集合上计算 $\operatorname{BM25}(\textit{dog mat}, d_4)$，保留三位小数。对这个查询排名第二的是哪个文档？
::: solution
*dog* 出现在 $d_2$ 与 $d_4$（$n = 2$；$d_3$ 里的 *dogs* 不匹配），所以 $\operatorname{idf}(\textit{dog}) = \ln(1 + 3.5/2.5) = 0.875$，与 *mat* 相同。对 $d_4$（$5$ 个词元，$K = 1.133$）每个词贡献 $0.875\cdot2.2/2.133 = 0.903$，合计 $1.806$。第二是 $d_2$ 的 $0.903$（只有 *dog*），略微领先 $d_1$ 的 $0.837$（只有 *mat*，但文档更长）。
:::
:::

::: exercise 排名融合 {level=1 check="0.0307"}
某个文档在第一个检索器排第 $1$、在第二个排第 $10$。$k = 60$ 时它的 RRF 分数是多少（保留四位小数）？它能赢过一个在两个列表里都排第 $4$ 的文档吗？
::: solution
$\frac1{61} + \frac1{70} = 0.01639 + 0.01429 = 0.0307$。两边都排第 $4$ 的文档得 $2/64 = 0.03125$，略高：RRF 奖励始终如一的一致。
:::
:::

::: exercise 无结构数据上的 IVF {level=2}
改一下代码清单，让每个向量（对一个独立标准正态坐标的向量归一化）从单位球面上均匀抽取，而不是来自 $25$ 个主题。跑一遍，比较各 $n_{\text{probe}}$ 下的召回率，并解释其中的差别。
::: solution
把采样函数换成 `def sample(): return unit([rng.gauss(0, 1) for _ in range(d)])`。输出是

```text
N=4000 d=16 nlist=40  list sizes min 79 max 119
nprobe  1: recall@10 0.312   vectors scanned   2.5%
nprobe  2: recall@10 0.484   vectors scanned   5.0%
nprobe  4: recall@10 0.666   vectors scanned  10.0%
nprobe  8: recall@10 0.844   vectors scanned  19.9%
nprobe 16: recall@10 0.978   vectors scanned  39.8%
```

现在各簇均衡了，但同样的工作量下召回率低得多：单探针时只有 $31\%$ 而不是 $80\%$。均匀数据没有簇，于是各簇只是对球面的任意切分，而在 $16$ 维中，一个查询的最近邻散落在许多相邻的簇里。数据有簇时，查询和它的近邻通常落在同一个簇里。高维均匀数据是所有 ANN 方法的最坏情形；真实嵌入远非均匀，这就是索引在实践中有效的原因——但这也正是召回率必须在真实数据上测量的原因。
:::
:::

::: exercise 归一化很重要 {level=2}
在 $\R^2$ 中找出两个向量 $\mathbf{x}_1$、$\mathbf{x}_2$ 与一个单位查询 $\mathbf{q}$，使内积最大者与余弦最大者选中的向量不同，并说明欧氏距离最小者与两者中的哪一个一致。这对用未归一化内积训练的模型意味着什么？
::: solution
取 $\mathbf{q} = (1, 0)$、$\mathbf{x}_1 = (1, 0)$、$\mathbf{x}_2 = (3, 3)$。内积：$1$ 与 $3$，内积选 $\mathbf{x}_2$。余弦：$1$ 与 $0.707$，余弦选 $\mathbf{x}_1$。距离：$0$ 与 $\sqrt{4 + 9} = 3.61$，欧氏距离选 $\mathbf{x}_1$，此处与余弦一致。内积偏爱长向量；当模型用未归一化内积训练时，范数携带信息（例如热度或置信度），检索时再归一化会改变结果。
:::
:::

::: exercise 实际中的 MIPS 归约 {level=3}
对 $\mathbf{x}_1 = (1, 0)$、$\mathbf{x}_2 = (3, 3)$ 取 $M = \sqrt{18}$、查询 $\mathbf{q} = (1, 0)$，套用 [[#prop-mips]]。验证在变换后的向量上做欧氏检索返回的是内积的赢家。然后解释当范数相差悬殊时，这个变换为什么会拖累近似索引。
::: solution
$\tilde{\mathbf{x}}_1 = (1, 0, \sqrt{17})$，$\tilde{\mathbf{x}}_2 = (3, 3, 0)$，$\tilde{\mathbf{q}} = (1, 0, 0)$。平方距离：$0 + 0 + 17 = 17$ 与 $4 + 9 + 0 = 13$，所以欧氏检索返回 $\mathbf{x}_2$，即内积的赢家（$3 > 1$），与公式 $1 + 18 - 2\mathbf{q}^\top\mathbf{x}_i$ 的预测（$17$ 与 $13$）一致。当范数相差悬殊时，多数向量很短、追加坐标很大，于是它们挤在新坐标的"极点"附近，而查询没有这一坐标；所有距离都变得又大又接近（$\lVert\mathbf{q}\rVert^2 + M^2$ 占主导），聚类与建图所依赖的相对差异被压扁，近似索引随之丢失召回率。在训练时就归一化嵌入可避免这一麻烦。
:::
:::
