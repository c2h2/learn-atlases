[[pretraining/pretraining-objectives]]中的训练目标说明模型**如何**从文本中学习，而训练数据决定它学到**什么**。塑造大语言模型的，更多是它的语料，而不是几乎任何架构选择：它覆盖哪些语言与主题、写作风格如何、重复哪些事实、又继承了哪些错误。构建这样的语料库主要是在不确定条件下做工程：必须收集、清洗、按质量过滤、去除重复，并对照评测集检查数万亿词元（token），而这些决策只能靠训练模型来验证，没有证明可依。

本章跟随一份文档，看它如何从网页走到训练批次。我们先介绍预训练文本的来源（网页爬取、代码、书籍、论文与精选来源）、施加于其上的启发式过滤、基于分类器与基于困惑度的过滤，然后讲**去重**——在那里我们推导 MinHash 对 Jaccard 相似度的估计、以及局部敏感哈希的碰撞概率$1-(1-s^r)^b$，并用纯 Python 实现两者。随后综述公开数据集及其规模，以及基准数据污染（contamination）问题与许可、同意、个人信息问题。清洗后的各个来源之间如何相互加权，是[[pretraining/data-mixtures]]的主题。

## 预训练文本的来源 {#sec-sources}

预训练语料库由一个极大而嘈杂的来源与若干更小、更干净的来源组合而成。

**网页爬取。** 大多数词元来自公共网络。非营利组织 **Common Crawl** 成立于 2007 年，自 2008 年起发布爬取数据，近年大约每月一次；每个快照包含数十亿个网页，既有原始 HTML（WARC 文件），也有抽取出的纯文本（WET 文件）。它是多数开放网页语料库的起点。爬取数据覆盖广但杂乱：导航菜单、cookie 提示、垃圾页面、机器生成的页面、几乎完全相同的副本与模板化的样板文本，在原始数据中占去大半。

**代码。** 公共源代码仓库提供编程语言、配置文件与技术性文字。代码数据通常按许可证与文件类型过滤，并施以激进的去重，因为 fork 与被内嵌的第三方库会把同一文件重复许多次。The Stack（Kocetkov 等，2022）与 The Stack v2（Lozhkov 等，2024）就是这样汇集的开放代码数据集，并提供供开发者选择退出（opt-out）的流程。

**精选来源。** 维基百科一类的百科全书、科学论文（例如 arXiv 与开放获取文献）、书籍（古腾堡计划的公版书是常见来源）、专利、法律与政府文件、问答论坛以及数学。与网页相比它们规模很小，但常常被赋予高于其词元占比的权重（[[pretraining/data-mixtures]]）。

**合成数据。** 越来越多的预训练文本由其他模型生成——改写过的网页、教科书式的讲解、练习题。它的用法与风险在[[pretraining/data-mixtures]]中讨论。

::: definition 文档、语料库与词元预算 {#def-corpus}
**文档**是带有元数据（来源、URL、日期、语言、许可）的文本单位。**语料库**是文档的多重集；它在指定分词器下按**词元**计量，因为对英语而言，字节、词与词元的数量大约相差$4$到$5$倍（[[text-and-language/tokenisation]]）。一次训练的**词元预算**$D$是模型处理的词元数；若部分数据重复训练若干个**轮次（epoch）**，它可以超过语料库大小。
:::

本章引用的词元数一律按数据集作者报告的数字原样给出，并注明他们使用的分词器；不同数据集之间的数字不能直接比较。

## 从 HTML 到文本 {#sec-extraction}

第一步是把网页变成干净的文本。Common Crawl 的 WET 文件包含页面的全部可见文本，菜单和页脚也在其中，由它构建的语料库（例如 C4）便继承了这些样板文本。RefinedWeb、FineWeb 等后来的流水线则用 `trafilatura` 之类的工具从原始 HTML 抽取文本，力求只保留正文。Penedo 等（2024）发现：用这种方式从 HTML 抽取的文本训练出的模型，好于用同一批页面的 WET 文本训练的模型。

接下来是**语言识别**，通常使用快速的字符 n-gram 分类器，例如 fastText 的语言识别模型，只保留预测语言与置信度都通过阈值的文档。面向英语的语料库只保留英语；多语言语料库保留多种语言，并记录预测结果，以便日后在各语言之间配平（[[pretraining/data-mixtures]]）。

## 过滤 {#sec-filtering}

爬取数据的大部分，并不是希望模型去模仿的文本。过滤器以三大类手段把它们移除。

### 启发式过滤器 {#sec-heuristics}

基于规则的过滤器计算文档的简单统计量，并丢弃落在合理范围之外的文档。已发表的规则集包括：

- **C4**（Raffel 等，2020）：只保留以终止标点结尾、且至少含五个词的行；丢弃句子少于三个的页面、包含公开脏词表中单词的页面、含有字符串 *lorem ipsum* 或花括号（用以剔除代码）的页面，以及提到 JavaScript 的行；只保留语言检测器以不低于$0.99$的概率判定为英语的页面。
- **Gopher / MassiveText**（Rae 等，2021）：保留长度在$50$到$100{,}000$词之间、平均词长在$3$到$10$个字符之间的文档；丢弃井号或省略号符号数与词数之比超过$0.1$的文档、超过$90\%$的行以项目符号开头或超过$30\%$的行以省略号结尾的文档、含字母的词不足$80\%$的文档、以及常用英语词表（*the, be, to, of, and, that, have, with*）中出现不足两个词的文档；还丢弃重复的行、段落或 $n$ 元组过多的文档。

这些规则便宜、透明，但很粗糙：例如人们发现，C4 的脏词过滤器不成比例地移除了大量用非裔美国英语写成的文档以及涉及 LGBTQ+ 身份的文档（Dodge 等，2021）。

::: warning “干净”不等于“好”，而且每个过滤器都有偏见
一个移除垃圾信息的过滤器，也会移除一些碰巧长得像垃圾信息的正当文本：方言、非正式语域、列表和表格、非英语段落、诗歌、正文中的代码。以“与维基百科或书籍相似”为标准定义的过滤器，会偏袒这些来源本身过度代表的主题、风格与作者。这些效应在词元总数的汇总数字里是看不见的。在相信一个过滤器之前，既要看它保留下来的样本，也要看它删掉的样本，并测量它对你关心的群体与任务的下游评测有什么影响。
:::

### 质量分类器 {#sec-classifiers}

**质量分类器**是一个模型，训练它把与选定参考集相似的文档同随机爬取的文档区分开来，再用它的分数决定文档的去留或权重。

::: definition 质量分类器 {#def-quality-classifier}
设$R$为被视为高质量的参考文档集合，$U$为未过滤文档的一个样本。**质量分类器**是一个概率分类器$g(\text{文档})\in[0, 1]$，训练它预测文档属于$R$还是$U$。当$g$超过阈值时保留文档，或以随$g$增大而增大的概率保留文档。
:::

GPT-3（Brown 等，2020）在哈希后的词特征上训练了一个逻辑回归分类器，以 WebText、维基百科和书籍为正例、原始 Common Crawl 为负例；对每个文档，若从形状参数$\alpha = 9$的帕累托（Pareto，Lomax）分布中抽取的随机数超过$1 - g$就保留它。引入随机性是为了在多样性之下保留一些得分较低的文档。更新的流水线则用大语言模型给网页样本标注——例如让它为每个页面的教育价值评分——再训练一个小分类器在全部爬取数据上复现这些评分：FineWeb-Edu（Penedo 等，2024）用开放权重模型按$0$–$5$分制打分，保留得分不低于$3$的页面；DCLM（Li 等，2024）训练了一个 fastText 分类器，其正例是指令跟随与问答数据。两者都报告：用过滤后的数据训练出的模型，在知识与推理基准上都有明显提升。

::: example 基于帕累托的抽样 {#ex-pareto}
在 GPT-3 的方案中，分类器得分为$g$的文档当且仅当$X > 1 - g$时被保留，其中$X$服从$\Prob(X > x) = (1 + x)^{-\alpha}$的 Lomax 分布，$\alpha = 9$。计算$g = 1$、$0.5$与$0.1$的文档被保留的概率。
::: solution
$\Prob(\text{保留}) = (1 + 1 - g)^{-9} = (2 - g)^{-9}$。$g = 1$：$1^{-9} = 1$。$g = 0.5$：$1.5^{-9} = 0.026$。$g = 0.1$：$1.9^{-9} = 0.0031$。高分文档几乎总被保留；分类器认为五五开的文档大约$38$次存活$1$次；低分文档大约$300$次存活$1$次——所以这个过滤器是软的，但很陡。
:::
:::

::: widget plot
f: (2 - x)^(-a)
x: 0, 1
y: 0, 1
sliders: a=9:1:20:1
labels: $\Prob(\text{保留}) = (2-g)^{-\alpha}$
caption: 质量得分为$g$的文档通过[[#ex-pareto]]中基于帕累托的过滤器的概率，形状参数为$\alpha$（GPT-3 用$\alpha = 9$）。$\alpha$越大，过滤器越接近在$g = 1$处的硬阈值；$\alpha$越小，保留的低分文档越多，因而也更多样。
:::

### 困惑度过滤器 {#sec-perplexity-filters}

**困惑度过滤器**用在一个参考语料库上训练的小语言模型的困惑度（[[text-and-language/perplexity]]）给每个文档打分。看起来像参考语料的文档困惑度低。CCNet（Wenzek 等，2020）为每种语言在维基百科上训练一个$5$-gram 模型，按困惑度把爬取数据分成头部、中部、尾部三等份；最早的 LLaMA 模型（Touvron 等，2023）就使用了经 CCNet 处理的数据。困惑度过滤器与质量分类器有同样的偏见——偏好与参考语料相似的文本——此外还有一点：大量重复或高度模板化的文本也可能困惑度很低，因此它们要与重复过滤器配合使用。

## 去重 {#sec-dedup}

网页爬取满是重复：同一篇文章被许多网站转载、模板化的许可文本、由模板生成的产品页、镜像站点，以及同一页面先后多个快照。重复浪费算力，而且有害。Lee 等（2022）在 C4 中发现一句$61$个词的英语句子重复了超过$60{,}000$次；去重之后，他们的模型吐出背诵式训练文本的频率降低约十倍，并用更少的步数达到相同或更好的准确率。重复的文本更容易被记住（Carlini 等，2023），而训练集与测试集之间的重复会虚高评测分数。

::: definition 精确去重与近似重复检测 {#def-dedup}
**精确去重**移除规范化后文本完全相同的文档（或行、段落、子串），通常比较加密哈希来实现；**精确子串去重**移除任何较长的重复词元序列，可用后缀数组找到（Lee 等使用的阈值是$50$个词元）。**近似重复**检测移除与另一文档的相似度超过阈值的文档，相似度通常用它们**shingle**集合——即其词或字符 $n$ 元组的集合——的 Jaccard 相似度来度量。
:::

::: definition Jaccard 相似度 {#def-jaccard}
两个有限集合$A$与$B$（不同时为空）的**Jaccard 相似度**为

$$
J(A, B) = \frac{\lvert A\cap B\rvert}{\lvert A\cup B\rvert}\in[0, 1].
$$

对文档而言，$A$与$B$是它们的 shingle 集合；shingle 集合完全相同时$J = 1$，没有任何公共 $n$ 元组的文档$J = 0$。
:::

在网页规模上两两比较所有文档是不可能的：$10^9$个文档约构成$5\times10^{17}$对。**MinHash**（Broder，1997）把每个 shingle 集合压缩成一个短签名，签名的一致比例可估计 Jaccard 相似度；**局部敏感哈希**（LSH）再借助签名找出可能相似的文档对，而无需比较所有文档对。

### MinHash {#sec-minhash}

::: definition MinHash 签名 {#def-minhash}
设$\mathcal{U}$为全体 shingle 的宇宙，$\pi$为$\mathcal{U}$的一个随机置换（实践中用一个取值范围很大的随机哈希函数，取值撞车的概率可以忽略）。非空集合$A\subseteq\mathcal{U}$的**MinHash**为

$$
h_\pi(A) = \min_{a\in A}\pi(a).
$$

长度$K$的**签名**是$K$个独立置换给出的$\big(h_{\pi_1}(A), \dots, h_{\pi_K}(A)\big)$。
:::

::: theorem MinHash 碰撞概率 {#thm-minhash}
设$A$与$B$为非空集合，$\pi$为$\mathcal{U}$上的均匀随机置换，则

$$
\Prob\big(h_\pi(A) = h_\pi(B)\big) = J(A, B).
$$ {#eq-minhash}

因此，两个长度$K$的签名在一致位置上的比例$\hat J$是$J(A, B)$的无偏估计量，方差为$J(1-J)/K$。
:::

::: proof
考察$A\cup B$中被$\pi$映到最小值的那个元素$m$。因为$\pi$是均匀随机置换，$A\cup B$中每个元素都等可能成为这个$m$，概率为$1/\lvert A\cup B\rvert$。若$m\in A\cap B$，则$m$同时是两个集合的最小化元素，于是$h_\pi(A) = h_\pi(B) = \pi(m)$。若$m$只属于其中一个集合，比如$A$，则$h_\pi(A) = \pi(m)$而$h_\pi(B) > \pi(m)$，因为$B$的每个元素都在$A\cup B$中且被映到$\pi(m)$之上；于是两个 MinHash 不同。因此，两个 MinHash 一致当且仅当$m\in A\cap B$，其概率为$\lvert A\cap B\rvert/\lvert A\cup B\rvert$。对$K$个独立置换，一致性指示变量是独立的 Bernoulli$(J)$ 随机变量，故其均值$\hat J$的期望为$J$、方差为$J(1-J)/K$。
:::

取$K = 128$个哈希时，$\hat J$在$J = 0.8$处的标准差为$\sqrt{0.8\cdot0.2/128} = 0.035$，足以把近似重复与仅仅相关的文档区分开；而无论文档多长，它的签名都只是$128$个数。

### 局部敏感哈希 {#sec-lsh}

为了避免比较所有签名对，LSH 把每个签名切成$b$个**条带（band）**、每条含$r$个值（$K = br$），并对每个条带取哈希。若两个文档在至少一个条带的全部$r$个值上一致，它们就成为**候选对**。之后只对候选对作进一步检查（或直接合并）。

::: proposition 分条带碰撞概率 {#prop-banding}
设两个文档的 Jaccard 相似度为$s$，其签名在$b$个长为$r$的条带中使用$K = br$个独立哈希函数，则它们成为候选对的概率为

$$
P(s) = 1 - \big(1 - s^{r}\big)^{b}.
$$ {#eq-banding}

当$s$从$0$变到$1$时，$P$从$0$增到$1$，且上升最陡处在$s^\ast\approx(1/b)^{1/r}$附近。
:::

::: proof
由[[#thm-minhash]]，一个条带中每个位置以概率$s$一致，且相互独立，所以整个条带一致的概率是$s^r$，不一致的概率是$1 - s^r$。$b$个条带使用互不相交的哈希函数、相互独立，所以它们全部不一致的概率是$(1 - s^r)^b$，至少一个一致的概率是$1 - (1 - s^r)^b$。因为$s^r$递增，该函数也递增。再看阈值位置：$(1 - s^r)^b = 1/2$时$P(s) = 1/2$；$s^r$很小时$(1 - s^r)^b\approx e^{-bs^r}$，于是$s^r\approx(\ln2)/b$，它接近$1/b$，由此得到经验公式$s^\ast\approx(1/b)^{1/r}$。
:::

分条带把[[#eq-minhash]]的线性关系变成一条 S 形曲线：远低于阈值的文档对几乎不会被比较，远高于阈值的几乎总会被比较。增大$r$把阈值上移并使其变陡；增大$b$把阈值下移。

::: widget plot
f: 1 - (1 - x^r)^b; x
x: 0, 1
y: 0, 1
sliders: r=8:1:20:1; b=14:1:50:1
labels: $P(s) = 1-(1-s^r)^b$; one hash: $P = s$
caption: Jaccard 相似度为$s$的两个文档，在$b$个条带、每条$r$个 MinHash 的 LSH 下成为候选对的概率。默认值（$b = 14$、$r = 8$、共$112$个哈希）正是 FineWeb 报告使用的参数，其目标是约$0.75$的相似度。对角线对应单个 MinHash。调节$r$与$b$，就是在漏掉的重复（假阴性，阈值右侧）与浪费的比较（假阳性，阈值左侧）之间权衡。
:::

::: example 选择条带数与每带行数 {#ex-bands}
FineWeb 的去重使用了$112$个 MinHash，分成$b = 14$个条带、每条$r = 8$行。计算 Jaccard 相似度为$0.5$、$0.75$与$0.9$的文档成为候选对的概率，以及近似阈值$(1/b)^{1/r}$。
::: solution
$s = 0.75$：$s^8 = 0.1001$，$(1 - 0.1001)^{14} = 0.8999^{14} = 0.2284$，故$P = 0.772$。$s = 0.5$：$0.5^8 = 0.0039$，$P = 1 - 0.9961^{14} = 0.053$。$s = 0.9$：$0.9^8 = 0.4305$，$P = 1 - 0.5695^{14} = 0.9996$。阈值为$(1/14)^{1/8} = 0.719$。相似度$75\%$的文档对大约四次能抓到三次，相似度$90\%$的几乎总能抓到，相似度$50\%$的二十次才抓到一次。
:::
:::

::: example 为什么不比较所有文档对？ {#ex-pairs}
一个语料库有$N = 2\times10^9$个文档。两两比较需要多少个文档对？若把长度$K = 112$的 MinHash 签名哈希进$b = 14$个条带，需要计算并分组多少个条带哈希？
::: solution
所有文档对：$N(N-1)/2\approx2\times10^{18}$次比较——按每秒$10^9$次计算要$63$年。LSH 只需对每个文档的每个条带各做一次哈希，得到$14N = 2.8\times10^{10}$个条带键，再用排序或分布式 shuffle（洗牌）分组；只有共享同一个键的文档才会被比较，而对一个以互不相同文档为主的语料库，这些分组都很小。主要开销是对每个文档的 shingle 计算$112$个 MinHash，它与语料库大小成线性关系。
:::
:::

### 纯 Python 实现的 MinHash {#sec-code}

下面的程序对六个短文档做规范化，用哈希移除精确重复，计算它们字符$5$-gram shingle 的 Jaccard 相似度，用$61$位素数$P$上的$K = 32$个哈希函数$h(x) = (ax + c) \bmod P$构造 MinHash 签名，并以$b = 8$个条带、每条$r = 4$行运行 LSH。

```python
import hashlib, random, re
from collections import defaultdict
from itertools import combinations

docs = {
    "a": "The quick brown fox jumps over the lazy dog near the river bank today.",
    "b": "The quick brown fox jumped over the lazy dog near the river bank today!",
    "c": "the quick brown fox jumps over the lazy dog near the river bank today.",
    "d": "A slow green turtle walks under the busy bridge across the old town square.",
    "e": "The quick brown fox jumps over the lazy cat near the river bank yesterday.",
    "f": "Click here to subscribe to our newsletter for the latest deals and offers.",
}

def normalise(s):                                   # 转小写、去标点、压缩空格
    return " ".join(re.sub(r"[^a-z0-9 ]", " ", s.lower()).split())

# 1. 精确去重：对规范化后的文本取哈希
seen, exact_dups = {}, []
for k, s in docs.items():
    h = hashlib.sha1(normalise(s).encode()).hexdigest()
    if h in seen: exact_dups.append((seen[h], k))
    else: seen[h] = k
print("exact duplicates after normalisation:", exact_dups)

# 2. shingle 与真实的 Jaccard 相似度
def shingles(s, n=5):                               # 规范化文本的字符 5-gram
    t = normalise(s)
    return {t[i:i + n] for i in range(len(t) - n + 1)}
S = {k: shingles(s) for k, s in docs.items()}
def jaccard(A, B): return len(A & B) / len(A | B)

# 3. MinHash 签名：K = b * r 个哈希函数 h(x) = (a*x + c) mod P
P = (1 << 61) - 1
b, r = 8, 4
K = b * r
rng = random.Random(0)
coeffs = [(rng.randrange(1, P), rng.randrange(0, P)) for _ in range(K)]
def base(x): return int.from_bytes(hashlib.md5(x.encode()).digest()[:8], "little")
def signature(sh):
    xs = [base(x) for x in sh]
    return [min((a * x + c) % P for x in xs) for a, c in coeffs]
sig = {k: signature(v) for k, v in S.items()}

print("pair  Jaccard  MinHash estimate  P(candidate)")
for u, v in combinations(docs, 2):
    J = jaccard(S[u], S[v])
    est = sum(x == y for x, y in zip(sig[u], sig[v])) / K
    if J > 0.05:
        print(f"{u}-{v}   {J:.3f}    {est:.3f}            {1 - (1 - J ** r) ** b:.3f}")

# 4. LSH：在某个条带的全部 r 个值上一致的文档成为候选对
buckets = defaultdict(set)
for k, s in sig.items():
    for i in range(b):
        buckets[(i, tuple(s[i * r:(i + 1) * r]))].add(k)
cands = sorted({tuple(sorted(p)) for g in buckets.values() for p in combinations(g, 2)})
print("candidate pairs from LSH:", cands)
print("threshold (1/b)^(1/r) =", round((1 / b) ** (1 / r), 3))
```

```text
exact duplicates after normalisation: [('a', 'c')]
pair  Jaccard  MinHash estimate  P(candidate)
a-b   0.841    0.906            0.996
a-c   1.000    1.000            1.000
a-e   0.646    0.625            0.783
b-c   0.841    0.906            0.996
b-e   0.541    0.562            0.512
c-e   0.646    0.625            0.783
candidate pairs from LSH: [('a', 'b'), ('a', 'c'), ('b', 'c')]
threshold (1/b)^(1/r) = 0.595
```

文档 *a* 与 *c* 只在大小写上不同，所以规范化后的精确哈希就能抓住它们。文档 *b*（*jumped*、*!*）是近似重复，$J = 0.84$；由于只有$32$个哈希，MinHash 估计值$0.906$偏了约两个标准差（$\sqrt{0.84\cdot0.16/32} = 0.065$），这正是生产系统要用更多哈希的原因。文档 *e* 改了两个词，$J = 0.65$，恰好高于阈值$0.595$；它本应以$0.78$的概率成为候选对，而这个随机种子下恰好没有——这正是 S 形曲线所预言的那种假阴性。互不相关的文档（*d*、*f*）几乎没有公共 shingle，永远不会被比较。

还剩两个实际问题。**如何处置一个簇**：把候选对合并为连通分量（用并查集 union–find），每个分量只保留一个文档。**在什么粒度上操作**：文档、段落、行、子串都会重复。FineWeb 发现全局去重删得太多、以致剩下的较旧数据质量更低，于是改为对每个 Common Crawl 快照分别去重，而不跨全部快照去重；去重与过滤相互影响，本身就是一个被调优的超参数，而不是只有一种正确做法的操作。

::: quiz
两个文档的 Jaccard 相似度为$0.6$。使用$b = 20$个条带、每条$r = 5$行的 LSH，它们成为候选对的概率是多少（保留两位小数）？
- [ ] $0.08$
- [ ] $0.60$
- [x] $0.80$
- [ ] $0.99$
::: solution
$s^r = 0.6^5 = 0.0778$，$(1 - 0.0778)^{20} = 0.198$，由[[#prop-banding]]得$P = 0.80$。阈值$(1/20)^{1/5} = 0.55$恰在$0.6$下方，所以这对文档落在 S 形曲线的上升段上。
:::
:::

## 公开数据集 {#sec-datasets}

许多大模型是在不公开的数据上训练的，但一系列公开数据集记录了预训练语料库长什么样。下表中的规模均为作者报告的数字，并采用他们的分词器。

| 数据集 | 年份 | 内容 | 报告规模 |
|---|---|---|---|
| C4（Raffel 等） | 2019 | 来自单个 Common Crawl 快照（2019 年 4 月）的英文网页文本，启发式过滤 | 约$750$ GB；$1560$亿词元（Dodge 等，2021） |
| The Pile（Gao 等） | 2020 | $22$种来源：过滤后的网页、书籍、arXiv、PubMed、GitHub、Stack Exchange、法律文本、字幕…… | $825$ GiB；GPT-NeoX 分词器下约$3000$亿词元（Pythia 所用） |
| RefinedWeb（Penedo 等） | 2023 | 仅网页，来自 Common Crawl：HTML 抽取、启发式规则、大规模去重 | 约$5$万亿词元；发布$6000$亿 |
| Dolma（Soldaini 等） | 2024 | 网页、代码、社交媒体、科学论文、书籍、百科全书；为 OLMo 构建 | 约$3$万亿词元 |
| FineWeb（Penedo 等） | 2024 | $96$个 Common Crawl 快照（2013–2024），抽取、过滤、按快照 MinHash | $15$万亿 GPT-2 词元；FineWeb-Edu $1.3$万亿 |

这个演进过程显示出两个趋势：五年间语料库规模增长了两个数量级；而关于语料库如何构建的文档——以及表明哪些步骤真正有效的消融实验——本身就成了一种研究贡献。数据集也会被修订和撤回：有子集因内容或来源受到投诉而被移除，版本也各不相同，所以论文里“在数据集 X 上训练”这样的说法要连同版本和日期一起读。RedPajama（Together Computer，2023）与 DCLM（Li 等，2024；约$4$万亿词元的过滤基线）是另外两个开放例子。

::: example 过滤漏斗 {#ex-funnel}
一条示意性的流水线（数字为练习虚构，量级与网页语料库的报告相符）从$200$万亿词元抽取出的爬取文本开始：语言识别保留$45\%$，启发式过滤在其上保留$60\%$，去重保留$40\%$，质量分类器保留最高的$30\%$。还剩多少词元？占原始的几分之几？
::: solution
$200\cdot0.45 = 90$；$90\cdot0.6 = 54$；$54\cdot0.4 = 21.6$；$21.6\cdot0.3 = 6.48$万亿词元——占最初的$3.24\%$，因为$0.45\cdot0.6\cdot0.4\cdot0.3 = 0.0324$。这样的乘法漏斗解释了为什么即便是海量爬取，最后也只能剩下几万亿词元的高质量语料，也解释了每一步的严格程度如何在质量与“数据不够用”的风险之间做交换（[[pretraining/data-mixtures#sec-epochs]]）。
:::
:::

## 数据污染 {#sec-contamination}

网页爬取里含有评测基准的拷贝：发在论坛上的测试题、代码仓库里的解答、引用过例题的论文。在这些数据上训练过的模型可能见过答案。

::: definition 数据污染 {#def-contamination}
若某个评测样例本身、它的答案、或与其高度相近的改写出现在训练数据中，就称该样例被**污染**。一个基准的**污染率**是其样例中被污染的比例，通常通过在训练语料中搜索每个样例的长 $n$ 元组重叠来估计。
:::

GPT-3 的作者搜索了训练数据与基准之间$13$-gram 的重叠，尽可能在训练前删除了找到的部分，并报告在“干净”子集上的结果；后来的报告使用了$8$到$50$个词元的重叠标准。$n$-gram 匹配会漏掉改写和翻译，又会误报常见短语，所以只能给出一个估计；诚实的做法是报告所用方法、测得的重叠率以及干净子集上的结果。**去污染（decontamination）**会移除与已知基准重叠的训练文档；它保护的是你已经知道的那些基准。污染的测量及其对分数的影响在[[evaluation/contamination]]中讨论。

::: example 统计重叠的 n-gram {#ex-ngram-overlap}
一道基准题有$40$个词元，它包含多少个$13$-gram？某训练文档与它共享一段$20$个连续词元；该文档中出现了这道题的多少个$13$-gram？
::: solution
含$L$个词元的序列有$L - n + 1$个 $n$-gram：$40 - 13 + 1 = 28$。共享的$20$个词元一段含其中$20 - 13 + 1 = 8$个，所以这道题$13$-gram 中有$8/28 = 29\%$能匹配上——按“只要有一个匹配的$13$-gram 就标记”的规则，足以把这道题标出来。
:::
:::

## 许可、同意与个人信息 {#sec-rights}

预训练数据引出一些法律与伦理问题，对此，通情达理的人们、法院与立法机构都意见不一，而且截至 2026 年这些问题仍在发展之中。本节只陈述这些议题，并不给出结论。

**版权与许可。** 大量网页文本、代码与书籍内容受版权或有条件许可的保护。未经许可用这些材料训练模型是否合法——无论是依据美国的合理使用、欧盟、日本等地的文本与数据挖掘例外，还是其他法律原则——在多个司法辖区都是诉讼与政策辩论的对象，截至 2026 年尚无一般性的定论。开发者采取不同做法：有的只在公有领域或宽松许可的数据上训练（Common Pile，Kandpal 等，2025，是一例），有的向出版商购买数据许可，有的依赖法律例外。代码数据集通常按许可证过滤，并像 The Stack 一样提供退出机制。

**同意与退出。** 网站所有者可以通过 `robots.txt` 向爬虫表达偏好，一些用于 AI 训练的爬虫会表明身份，以便被屏蔽。Longpre 等（2024）测得：常用语料库所取材的域名上，这类限制增长得很快。爬取之后才设置的 robots.txt 偏好是否适用于更早的快照，以及“退出机制”而非“加入机制”是否是够格的标准，都存在争议。欧盟《人工智能法案》（AI Act）要求通用人工智能模型的提供者公布训练内容摘要，相关义务自 2025 年 8 月起适用。

**个人信息。** 爬取数据中含有姓名、邮箱地址、电话号码等个人数据，而模型能够复现被记住的训练文本：Carlini 等（2021）从 GPT-2 中原样抽取出了若干序列，其中包含个人联系方式。因此流水线会用模式匹配和分类器移除或掩蔽**个人可识别信息**（PII），会去重（这能减少记忆化），并过滤已知含有敏感数据的来源。PII 检测在两个方向上都不完善，而隐私法（例如欧盟 GDPR）在不同地方的适用方式也不相同。

**有害内容。** 针对辱骂、色情或仇恨内容的过滤能减少模型学会复现的东西，但也会删除识别和讨论这类内容所需的文本，而且带有上文讨论过的种种偏见。有些团队保留这类数据但加上标签，以便后续训练控制其影响。这里的取舍既是技术问题，也是价值判断（[[llm-society]]）。

::: history
香农（Shannon）1951 年的实验用一本书作为语料；布朗语料库（Brown Corpus，1961）与英国国家语料库（British National Corpus，1994）是精心抽样的百万词与一亿词文集。网页规模的文本随着 Google 2006 年发布一万亿词的 $n$-gram 集合而来，Common Crawl 则从 2008 年开始发布爬取数据。Broder（1997）在 DEC 为 AltaVista 搜索引擎寻找近似重复网页时提出了 MinHash，Indyk 与 Motwani（1998）则给出了局部敏感哈希的形式化定义。在语言模型方面，Radford 等（2019）从 Reddit 链接的页面构建了 WebText；Raffel 等（2019）发布了 C4；Wenzek 等（2020）用困惑度过滤构建了 CCNet；Gao 等（2020）汇集了 The Pile；Brown 等（2020）描述了 GPT-3 的分类器过滤与污染分析。Rae 等（2021）发表了 Gopher 的启发式规则，Dodge 等（2021）记录了 C4 及其偏见，Lee 等（2022）证明了去重的收益。RefinedWeb（2023）、Dolma（2024）、FineWeb（2024）与 DCLM（2024）让大规模网页语料库的构建成为一门有公开文档、有消融实验的研究课题。
:::

::: summary
- 预训练文本主要来自**网页爬取**（Common Crawl），外加代码、书籍、论文、百科全书等精选来源；规模一律以指定分词器下的词元数报告。
- 流水线从 HTML 抽取正文、识别语言、施加**启发式过滤**（长度、符号比例、重复度、停用词）、在参考集上训练出的**质量分类器**以及**困惑度过滤**；每个过滤器都有应予检查的偏见。
- **去重**用哈希移除精确拷贝、用 shingle 的 Jaccard 相似度移除近似重复；它减少记忆化并提高训练效率（Lee 等，2022）。
- **MinHash**在两个集合上一致的概率恰等于它们的 Jaccard 相似度；$b$个条带、每条$r$行的 **LSH** 使一对文档以概率$1-(1-s^r)^b$成为候选对，这是一条阈值在$(1/b)^{1/r}$附近的 S 形曲线。
- 公开语料库从 C4（$1560$亿词元，2019）增长到 FineWeb（$15$万亿，2024），构建流水线也记录得越来越清楚。
- 必须测量并报告评测数据的**污染**；**版权、同意与个人信息**提出开放的法律与伦理问题，流水线以许可选择、退出机制、PII 移除与文档记录来应对。
:::

## 习题

::: exercise 手算 Jaccard 相似度 {level=1 check="4/7"}
文档$A$的词$2$-gram 为$\{$*the cat*, *cat sat*, *sat on*, *on the*, *the mat*$\}$，文档$B$的$\{$*the cat*, *cat sat*, *sat on*, *on a*, *a mat*, *the mat*$\}$。计算$J(A, B)$。
::: solution
交集是$\{$*the cat*, *cat sat*, *sat on*, *the mat*$\}$，有$4$个元素。$A$有$5$个元素，$B$有$6$个，并集有$5 + 6 - 4 = 7$个，故$J = 4/7 = 0.571$。
:::
:::

::: exercise 候选概率 {level=1 check="0.772"}
用[[#eq-banding]]，取$b = 14$、$r = 8$，计算 Jaccard 相似度$0.75$的两个文档成为候选对的概率，保留三位小数。
::: solution
$0.75^8 = 0.10011$，$(1 - 0.10011)^{14} = 0.2284$，$P = 0.772$，与[[#ex-bands]]一致。
:::
:::

::: exercise 保留概率 {level=1 check="0.0260"}
在[[#ex-pareto]]中$\alpha = 9$的帕累托过滤器下，得分$g = 0.5$的文档被保留的概率是多少？保留四位小数。
::: solution
$(2 - 0.5)^{-9} = 1.5^{-9} = 1/38.44 = 0.0260$。
:::
:::

::: exercise 估计量的精度 {level=2 check="400"}
要使$J = 0.8$时$\hat J$的标准差不超过$0.02$，需要多少个 MinHash 函数$K$？给出最小的整数。
::: solution
由[[#thm-minhash]]，$\sqrt{J(1-J)/K}\le0.02$要求$K\ge0.16/0.0004 = 400$。取$K = 400$时标准差恰为$0.02$。
:::
:::

::: exercise 过滤漏斗 {level=2 check="6.48"}
重算[[#ex-funnel]]的漏斗，给出剩余词元数（单位：万亿）。若把去重这一步放松，改为保留$55\%$而不是$40\%$，还剩多少词元？
::: solution
$200\cdot0.45\cdot0.6\cdot0.4\cdot0.3 = 6.48$万亿。取$55\%$时：$200\cdot0.45\cdot0.6\cdot0.55\cdot0.3 = 8.91$万亿，多$37.5\%$，代价是更多近似重复。
:::
:::

::: exercise 调节 S 形曲线 {level=2 check="286"}
希望$s\ge0.85$的近似重复至少以$0.99$的概率被抓到，而$s\le0.5$的文档对成为候选对的概率至多$0.02$。试$(r, b) = (8, 16)$、$(10, 12)$与$(9, 14)$（都满足$K = br\le128$），说明没有一个能同时满足两个条件。然后在整数上作一次短搜索，找出能满足条件的最小哈希数$K = br$。
::: hint
固定$s$时，$P(s)$关于$b$递增、关于$r$递减；对每个$r$，找出满足第一个条件的最小$b$，再检验第二个条件。
:::
::: solution
$(8, 16)$：$P(0.85) = 1 - (1 - 0.85^8)^{16} = 0.994$，但$P(0.5) = 0.061$——假阳性太多。$(10, 12)$：$P(0.5) = 0.012$，但$P(0.85) = 0.928$——漏掉太多。$(9, 14)$：$P(0.85) = 0.975$，$P(0.5) = 0.027$——两个条件都不满足。一次搜索

```python
P = lambda s, r, b: 1 - (1 - s ** r) ** b
print(min((r * b, r, b) for r in range(1, 40) for b in range(1, 400)
          if P(0.85, r, b) >= 0.99 and P(0.5, r, b) <= 0.02))     # (286, 11, 26)
```

得到$r = 11$、$b = 26$、$K = 286$：$P(0.85) = 0.991$且$P(0.5) = 0.0126$。增大$r$减少假阳性，但会漏掉真正的重复；增大$b$作用相反；只有更多的哈希能让曲线更陡。实践中，只要每个候选对都通过计算精确 Jaccard 相似度来复核，假阳性就很便宜，因此更小的$K$、更低的阈值加上复核，往往更可取。
:::
:::

::: exercise 精确子串去重 {level=2}
Lee 等移除了每一段长度至少$50$个词元的重复子串。解释：为什么文档级哈希会漏掉一段出现在$10^5$篇各不相同文档中的样板段落？为什么对整篇文档做近似重复检测也可能漏掉它？后缀数组能提供什么？
::: solution
文档哈希各不相同，因为文档在别处不同，所以精确的文档去重看不到重复。若样板在每篇文档中只占一小部分，它们的 Jaccard 相似度就低，整篇文档上的 MinHash 也不会标记它们。把整个语料库拼接起来后建后缀数组，会把所有后缀排序，任何重复子串都表现为相邻后缀的公共前缀；排序后扫描相邻对，就能以与语料库大小大致成线性的时间找到每个出现两次以上、长度$\ge50$的子串。之后可以把样板从每篇文档中剪掉，而保留其余部分。
:::
:::

::: exercise 污染的计数 {level=2 check="8"}
在[[#ex-ngram-overlap]]中，与题目共享一段$20$个词元的训练文档里，出现了该题的多少个$13$-gram？
::: solution
$20$个词元的一段含$20 - 13 + 1 = 8$个十三元组，它们全都是这道题的$13$-gram。
:::
:::

::: exercise MinHash 的无偏性：一个模拟 {level=3}
写一个纯 Python 模拟，用真正的随机置换检验[[#thm-minhash]]：在$100$个元素的宇宙中取$A = \{0, \dots, 59\}$与$B = \{20, \dots, 99\}$，用`random.shuffle`（种子$0$）抽取$20{,}000$个随机置换，把一致频率与$J(A, B)$作比较。
::: solution
```python
import random
rng = random.Random(0)
A, B = set(range(60)), set(range(20, 100))
J = len(A & B) / len(A | B)
hits, N = 0, 20000
perm = list(range(100))
for _ in range(N):
    rng.shuffle(perm)                       # perm[x] 是元素 x 的名次
    hits += min(perm[a] for a in A) == min(perm[b] for b in B)
print(f"J = {J:.4f}, agreement frequency = {hits / N:.4f}, sd = {(J * (1 - J) / N) ** 0.5:.4f}")
```

```text
J = 0.4000, agreement frequency = 0.4002, sd = 0.0035
```

$\lvert A\cap B\rvert = 40$且$\lvert A\cup B\rvert = 100$，所以$J = 0.4$；模拟得到的频率与它相差不到一个标准差。
:::
:::

::: exercise 一个启发式过滤器 {level=3}
用纯 Python 实现一个带三条 Gopher 风格规则的函数 `keep(doc)`：词数在$50$到$100{,}000$之间；平均词长在$3$到$10$个字符之间；*the, be, to, of, and, that, have, with* 这组词中至少出现两个。把它用于 (a) [[pretraining/pretraining-objectives#sec-code]]中的狄更斯（Dickens）选段，(b) 字符串 `"BUY NOW!!! " * 20`，(c) 一个由 `"SKU-48213"` 这样的产品编码组成的$60$词列表。讨论一条规则会误删的某一种正当文本。
::: solution
```python
STOP = {"the", "be", "to", "of", "and", "that", "have", "with"}
def keep(doc):
    words = doc.split()
    if not 50 <= len(words) <= 100_000: return False, "length"
    mean = sum(map(len, words)) / len(words)
    if not 3 <= mean <= 10: return False, "mean word length"
    if len(STOP & {w.lower().strip(".,;:!?") for w in words}) < 2: return False, "stop words"
    return True, "ok"

dickens = ("it was the best of times, it was the worst of times, it was the age of wisdom, it was "
           "the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it "
           "was the season of light, it was the season of darkness, it was the spring of hope, it was "
           "the winter of despair, we had everything before us, we had nothing before us, we were all "
           "going direct to heaven, we were all going direct the other way")
print(keep(dickens), keep("BUY NOW!!! " * 20), keep(" ".join(f"SKU-{48213 + i}" for i in range(60))))
```

```text
(True, 'ok') (False, 'length') (False, 'stop words')
```

狄更斯选段（$85$个词）通过。垃圾广告串只有$40$个词，长度规则不通过（就算重复到$50$个词以上，也会因停用词而不通过）；产品编码列表通过长度规则（$60$个词，平均长$9$），但停用词规则不通过。会被误删的正当文本有：短诗或图片说明（不足$50$个词）、其他语言的文本（没有英语停用词——这类规则是语言专属的）、数据表格，以及代码。一套为英语散文设计的规则，会悄无声息地把它们全部删掉。
:::
:::
