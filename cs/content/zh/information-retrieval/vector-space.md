在《爱丽丝》的 $800$ 个段落上做布尔检索，输入 `the mock turtle sang about soup`，你就得二选一。当合取，查询一无所获：`sang` 只出现在两个段落里，而那两个段落都没提 soup。当析取，它匹配 $654$ 个段落——每个含 `the` 的段落——毫无次序可言。用户想要的两样都不是：他想要的是一份最短清单，装着匹配查询*最好*的那些段落，唱《Beautiful Soup》（美味的汤）的假海龟排在最前，而仅仅含 `the` 的段落根本不在其上。

**排序检索**用每个文档的一个**分数**取代 [[information-retrieval/inverted-indexes]] 那种集合式答案，返回前 $k$ 条。本章发展给分的经典做法——**向量空间模型**：文档与查询是词权重向量，一个词项的权重随它在文档中的频次（**tf**）增长、随它在文档集中的稀有度（**idf**）增长，分数则是查询与文档之间夹角的**余弦**。我们导出 tf–idf，证明让余弦排序得以成立的几何事实，也看到它的主要弱点——对文档长度的处理。后半章谈速度：只有前 $10$ 条要紧时，给每个文档算分是浪费，而 **MaxScore** 与 **WAND** 算法可以不改答案——这一点可证明——跳过绝大多数无缘前 $k$ 的文档。[[information-retrieval/probabilistic-retrieval]] 的概率模型日后会用 BM25 取代 tf–idf，却原封不动地保留本章的查询处理机制。

## 词加权

### 词频

第一个念头是数匹配：按文档含多少个查询词项给它记分。这忽略了每个词项出现的*频率*。提到假海龟五次的段落，比比一提的段落更是讲假海龟的。

::: definition 词袋与词频 {#def-tf}
在**词袋**模型中，一个文档只用每个词项在其中的出现次数来表示，不顾次序。**词频** $\mathrm{tf}_{t,d}$ 是词项 $t$ 在文档 $d$ 中的出现次数。**对数词频权重**为
$$
\mathrm{wf}_{t,d} = \begin{cases} 1 + \log_{10} \mathrm{tf}_{t,d} & \text{当 } \mathrm{tf}_{t,d} > 0,\\ 0 & \text{否则。}\end{cases}
$$ {#eq-logtf}
:::

词袋忘了 "the Queen sentenced the Knave"（王后审判了无赖）与 "the Knave sentenced the Queen"（无赖审判了王后）意思不同，但对检索依然出奇地好用，因为一个文档*讲什么*，主要由它用哪些词、用得多勤决定。需要位置时，另有位置索引（[[information-retrieval/inverted-indexes#def-positional]]）。

为什么取对数？相关性不随重复线性增长：`turtle` 出现 $20$ 次的段落，比出现 $2$ 次的更讲乌龟，却不止十倍。按 [[#eq-logtf]]，$\mathrm{tf} = 1, 2, 10, 100$ 的权重是 $1, 1.3, 2, 3$。每多一次出现都不如前一次要紧——这种**收益递减**，BM25 后来借**饱和**（saturation）更精细地内置了进去（[[information-retrieval/probabilistic-retrieval]]）。

::: widget plot
f: x; 1 + log10(x); 2.2*x/(1.2 + x)
x: 1, 30
y: 0, 8
labels: \text{原始 tf}; 1+\log_{10}\mathrm{tf}; \text{饱和函数 } \frac{(k+1)\,\mathrm{tf}}{k+\mathrm{tf}},\ k=1.2
caption: 把词频变成权重的三种做法。原始计数会让一个反复出现的词压倒分数；对数无上界但增长缓慢；BM25 所用的饱和函数趋向天花板 $k + 1 = 2.2$。从图上读出：一个词的第十次出现，在三种做法下各增加了多少。
:::

### 逆文档频率

原始计数还忽略了一个词项有多*有信息量*。每个段落都含 `the`，它在段落里的频次对相关性什么也不说；`sang` 只出现在两个段落里，含它的段落很可能就是讲唱歌的。卡伦·斯帕克·琼斯（Karen Spärck Jones）1972 年论证：一个词项对检索的价值，随含它的文档数上升而下降，并提议按该数的倒数的对数给它加权。

::: definition 逆文档频率 {#def-idf}
在含 $N$ 个文档的文档集中，词项 $t$ 出现在 $\mathrm{df}_t$ 个文档中，$t$ 的**逆文档频率**为
$$
\mathrm{idf}_t = \log_{10} \frac{N}{\mathrm{df}_t}.
$$ {#eq-idf}
:::

每个文档都含的词项 $\mathrm{idf} = 0$；百万文档中只在一个文档里出现的词项 $\mathrm{idf} = 6$。在《爱丽丝》的 $800$ 个段落中：

```text
the 643 0.095
mock 54 1.171
turtle 52 1.187
sang 2 2.602
about 84 0.979
soup 10 1.903
```

（词项、文档频率、idf）。对数的底只是给所有权重统一缩放，不影响排序。一种解释是信息量的：随机取一个文档，它含 $t$ 的概率是 $\mathrm{df}_t / N$，于是 $\mathrm{idf}_t = -\log_{10} \Prob(t \in d)$ 度量在一个文档里看见 $t$ 有多令人意外。一个更精确的正当性，在明确假设之下，来自 [[information-retrieval/probabilistic-retrieval]] 的概率模型：那里一个类 idf 的权重，是词项出现在相关文档与非相关文档中的对数几率。

::: widget plot
f: log10(N/x)
sliders: N=100:100:10000
x: 1, 1000
y: 0, 4
labels: \mathrm{idf} = \log_{10}(N/\mathrm{df})
caption: $N$ 个文档的文档集上，逆文档频率随文档频率的变化。权重在罕见词中间陡降、在常见词中间趋平：$\mathrm{df} = 1$ 到 $\mathrm{df} = 10$ 就跌掉整整一个单位，$100$ 到 $1000$ 也是如此。拖动 $N$ 增大，每条曲线整体上移因子的 $\log_{10}$，差不变——排序因而不变。
:::

::: definition tf–idf 权重 {#def-tfidf}
词项 $t$ 在文档 $d$ 中的 **tf–idf 权重**为
$$
w_{t,d} = \mathrm{wf}_{t,d} \cdot \mathrm{idf}_t = \bigl(1 + \log_{10} \mathrm{tf}_{t,d}\bigr) \log_{10} \frac{N}{\mathrm{df}_t} \quad (\mathrm{tf}_{t,d} > 0),
$$
$t$ 不在 $d$ 中时为 $0$。它在 $t$ 于 $d$ 中频繁出现、而在文档集中罕见时最大。
:::

变体很多——用原始 tf 取代对数 tf，idf 用 $\log((N - \mathrm{df}_t)/\mathrm{df}_t)$ 或 $\log(1 + N/\mathrm{df}_t)$，归一化方式各异——杰拉德·萨尔顿（Salton）小组的 SMART 系统给它们定了三字母记法：tf 分量、df 分量、归一化。常见的字母有 `n`（natural：原始 tf，或不加 idf）、`l`（logarithmic：对数 tf）、`t`（idf）与 `c`（cosine：余弦归一化）。一个方案写作 `ddd.qqq`，文档权重在前、查询权重在后。标准例 `lnc.ltc` 用对数 tf（不含 idf）加余弦归一化加权文档，用对数 tf 乘 idf 加余弦归一化加权查询；下文就用它。文档权重不含 idf，意味着文档集增长、idf 漂移时，文档向量无须改变。

## 向量空间模型

::: definition 向量空间模型 {#def-vsm}
固定词表 $t_1, \dots, t_V$。文档 $d$ 用其词权重组成的向量 $\vec{d} = (w_{t_1,d}, \dots, w_{t_V,d}) \in \R^V$ 表示，查询 $q$ 用按同样方式算出的向量 $\vec{q}$（按它自己的加权方案）表示。查询与文档的**余弦相似度**为
$$
\cos(\vec q, \vec d) = \frac{\vec q \cdot \vec d}{\norm{\vec q}\,\norm{\vec d}} = \frac{\sum_{t} q_t\, d_t}{\sqrt{\sum_t q_t^2}\,\sqrt{\sum_t d_t^2}},
$$ {#eq-cosine}
文档按余弦相似度从大到小排序。
:::

向量住在每个词项一维的空间里——几百万维——但每个文档向量都是**稀疏**的，只有文档含有的词项对应非零分量，查询向量也只有寥寥几个非零分量。因此点积只需扫过查询词项，而这正是倒排索引让变便宜的事。（内积、范数与夹角见 [Maths Atlas: inner products](/learn/maths/lesson.php?c=linear-algebra&l=inner-products)。）

为什么用余弦，而不是点积或欧氏距离？设想把一个文档接在自身的一份拷贝后面。它的向量加倍，$\vec{d}' = 2\vec{d}$，内容却相同。它与任何查询的点积跟着加倍，于是长文档只因为长就赢了；欧氏距离 $\norm{\vec q - \vec d'}$ 也变了。余弦只依赖方向：$\cos(\vec q, 2\vec d) = \cos(\vec q, \vec d)$。

::: proposition 余弦、归一化与欧氏距离 {#prop-cosine}
设 $\hat u = \vec u/\norm{\vec u}$ 表示非零向量 $\vec u$ 方向上的单位向量。则
1. $\cos(\vec q, \vec d) = \hat q \cdot \hat d$，且对一切 $\lambda > 0$ 有 $\cos(\vec q, \lambda \vec d) = \cos(\vec q, \vec d)$；
2. 若所有权重非负，则 $0 \le \cos(\vec q, \vec d) \le 1$，且 $\cos = 1$ 恰当 $\vec d$ 是 $\vec q$ 的正数倍；
3. $\norm{\hat q - \hat d}^2 = 2 - 2\cos(\vec q, \vec d)$，所以按余弦从大到小排序，等同于把归一化向量按到 $\hat q$ 的欧氏距离从小到大排序。
:::

::: proof
(1) 把 [[#eq-cosine]] 的分子分母同除 $\norm{\vec q}\norm{\vec d}$ 得 $\hat q \cdot \hat d$；把 $\vec d$ 换成 $\lambda\vec d$ 使分子分母同乘 $\lambda$。(2) 权重非负时点积的每一项都非负，故 $\cos \ge 0$；柯西-施瓦茨（Cauchy–Schwarz）不等式 $\abs{\vec q \cdot \vec d} \le \norm{\vec q}\norm{\vec d}$ 给出 $\cos \le 1$，等号恰当两向量平行，而在权重非负、点积为正时这意味着 $\vec d = \lambda \vec q$、$\lambda > 0$。(3) 展开得 $\norm{\hat q - \hat d}^2 = \hat q\cdot\hat q - 2\,\hat q\cdot\hat d + \hat d\cdot\hat d = 1 - 2\cos + 1$。由于 $2 - 2c$ 关于 $c$ 递减，余弦越大距离越小。
:::

第 3 条把排序检索与**最近邻搜索**连了起来：最好的文档，就是离归一化查询最近的那些归一化向量。配上稀疏的 tf–idf 向量，倒排索引能精确地算出这个；换成几百维的稠密学习型向量，它就成了 [[information-retrieval/dense-retrieval]] 的近似最近邻问题。

::: example 手算余弦分数 {#ex-cosine}
一个文档集有四篇文档：$d_1$ = "rabbit hole rabbit rabbit"、$d_2$ = "queen rabbit garden"、$d_3$ = "queen queen tarts"、$d_4$ = "garden party tea"。用 `lnc.ltc` 方案为查询 `rabbit queen` 给它们排序。
::: solution
*文档频率与 idf*（$N = 4$）：`rabbit`、`queen`、`garden` 各出现在 $2$ 篇文档中，$\mathrm{idf} = \log_{10} 2 = 0.301$；`hole`、`tarts`、`party`、`tea` 各出现一次，$\mathrm{idf} = \log_{10} 4 = 0.602$。

*查询*（`ltc`）：两个词项 $\mathrm{tf} = 1$，权重各 $1 \times 0.301$；归一化后，在 (`rabbit`, `queen`) 上 $\hat q = (0.707, 0.707)$。

*文档*（`lnc`：对数 tf，不含 idf，归一化）：
- $d_1$：`rabbit` $\mathrm{tf} = 3$，权重 $1 + \log_{10} 3 = 1.477$；`hole` 权重 $1$。长度 $\sqrt{1.477^2 + 1} = 1.784$，故 $\hat d_1$ 的 `rabbit` 为 $0.828$、`hole` 为 $0.561$。
- $d_2$：三个权重为 $1$ 的词项，各 $1/\sqrt{3} = 0.577$。
- $d_3$：`queen` $1 + \log_{10} 2 = 1.301$，`tarts` $1$；长度 $1.641$，得 $0.793$ 与 $0.609$。
- $d_4$：没有查询词项。

*分数*（只有查询词项有贡献）：$\cos(q, d_1) = 0.707 \times 0.828 = 0.586$；$\cos(q, d_2) = 0.707 \times 0.577 + 0.707 \times 0.577 = 0.816$；$\cos(q, d_3) = 0.707 \times 0.793 = 0.561$；$\cos(q, d_4) = 0$。排序为 $d_2, d_1, d_3, d_4$：两个查询词项都有的文档取胜，而把 `rabbit` 重复三次的 $d_1$ 险胜把 `queen` 重复两次的 $d_3$。计算同一组权重的短小 Python 程序打印 `cos 0.5855`、`0.8165`、`0.5606` 与 `0.0`。
:::
:::

### 给《爱丽丝》排序

同样在 $800$ 个段落上算一遍，倒排索引的条目带有词频：

```python
import re, math, heapq
from collections import Counter, defaultdict

tokenize = lambda s: re.findall(r"[a-z]+(?:'[a-z]+)?", s.lower())
N = len(paras)                                   # 前文那 800 个段落
postings = defaultdict(list)                     # 词项 -> [(docID, tf)]，docID 递增
for d, p in enumerate(paras):
    for t, tf in sorted(Counter(tokenize(p)).items()):
        postings[t].append((d, tf))
idf = {t: math.log10(N / len(pl)) for t, pl in postings.items()}
norm = [0.0] * N                                 # 每个文档向量的欧氏长度
for t, pl in postings.items():
    for d, tf in pl:
        norm[d] += (1 + math.log10(tf)) ** 2
norm = [math.sqrt(x) for x in norm]

def weight(t, d, tf):                            # lnc：对数 tf，无 idf，余弦归一化
    return (1 + math.log10(tf)) / norm[d]

def query_vector(q):                             # ltc：对数 tf 乘 idf，余弦归一化
    w = {t: (1 + math.log10(tf)) * idf[t] for t, tf in Counter(tokenize(q)).items() if t in idf}
    length = math.sqrt(sum(x * x for x in w.values()))
    return {t: x / length for t, x in w.items()}
```

打分随后走过每个查询词项的倒排列表，把各项贡献累加进每个文档的一个**累加器**：

```python
def taat(q, k=5):                                # 逐词处理（TAAT），带累加器
    qv, acc = query_vector(q), defaultdict(float)
    for t, qw in qv.items():
        for d, tf in postings[t]:
            acc[d] += qw * weight(t, d, tf)
    return heapq.nlargest(k, ((s, d) for d, s in acc.items())), len(acc)

top, n_acc = taat("the mock turtle sang about soup")
```
```text
accumulators 654
0.341 doc 516: `It's the thing Mock Turtle Soup is made from,' ...
0.266 doc 544: `And washing?' said the Mock Turtle. ...
0.266 doc 538: `You did,' said the Mock Turtle. ...
0.258 doc 585: `Turn a somersault in the sea!' cried the Mock ...
0.247 doc 623: `Explain all that,' said the Mock Turtle. ...
```

头名是王后解释假海龟来历的那一段（"It's the thing Mock Turtle Soup is made from"），是个合理的答案。可接下来四段全是一句话的短段，只含 `mock` 和 `turtle` 而几乎不含别的：余弦归一化除以文档长度，于是含两个查询词项的极短段落余弦很大。《Beautiful Soup》的两节诗——用户多半想要的内容——只排到第 $28$ 与第 $42$ 位：它们重复 `soup`，却从不点名 Mock Turtle，而引出那首诗的段落（"Oh, a song, please, if the Mock Turtle would be so kind"）排第 $10$。

### 文档长度与轴点归一化

这是一个系统性效应。阿米特·辛哈尔（Singhal）、克里斯·巴克利（Buckley）与曼达尔·米特拉（Mitra）（1996）在 TREC 文档集上比较了两件事：一篇给定长度的文档被余弦归一化的 tf–idf 检回的概率，和它真正相关的概率：短文档被检回得比其占相关文档的份额更多，长文档则更少。长文档更可能切合一个主题，道理很简单——它们覆盖得多。他们的补救是**轴点长度归一化**：改为除以
$$
(1 - s)\cdot \mathit{pivot} + s \cdot \norm{\vec d}
$$
而不是除以 $\norm{\vec d}$，其中 $\mathit{pivot}$ 是平均文档长度，**斜率** $s < 1$ 在训练查询上调好，使归一化有所偏倚：短于平均的文档多罚一点，长于平均的少罚一点。同一个想法——用一个参数在"不归一化"与"完全归一化"之间插值的文档长度归一化——就是 BM25 里的 $b$（[[information-retrieval/probabilistic-retrieval]]）。

::: warning 向量空间模型是启发式，不是相关性理论
线性代数里没有任何一条定理说，相关性就是 tf–idf 向量间夹角的余弦。模型把词项当作正交维度，于是 `rabbit` 与 `rabbits`（不做词干提取时）或 `car` 与 `automobile` 的互不相干，一如 `rabbit` 与 `tax`；它没有词项相依、次序、意义的概念；它的加权公式全凭实验找出。它的成功是经验的：几十年的评测里，调校良好的 tf–idf 配长度归一化一直是强健的基线。别从这几何里读出更多——对"某种加权变体才是'正确'"这类断言，在拿查询与相关性判定检验之前，保持怀疑（[[information-retrieval/evaluation]]）。
:::

### 相关反馈

向量的图景暗示了一条改进查询的路：把它朝用户标记为相关的文档挪过去。**Rocchio 算法**（1971）把 $\vec q$ 换成
$$
\vec q\,' = \alpha \vec q + \frac{\beta}{\abs{D_r}} \sum_{\vec d \in D_r} \vec d - \frac{\gamma}{\abs{D_{n}}} \sum_{\vec d \in D_{n}} \vec d,
$$
其中 $D_r$、$D_n$ 是判为相关与非相关的文档，典型权重如 $\alpha = 1$、$\beta = 0.75$、$\gamma = 0.15$，负分量置零。新查询含有用户从未敲过的词项——对 `mock turtle` 来说，也许是从相关段落里来的 `soup`、`gryphon`、`lobster`。用户很少给出显式反馈，于是**伪相关反馈**干脆假定第一次查询的头几条结果相关，用它们最强的词项扩展查询。它在许多测试文档集上提高了平均效果，可当头几条结果跑题时，它也会严重漂移。

::: example 一轮 Rocchio 反馈 {#ex-rocchio}
在 [[#ex-cosine]] 的文档集上，用户发出 `rabbit queen`，判 $d_2$ 相关、$d_1$ 不相关。为简便取原始词频向量，$\alpha = 1$、$\beta = 0.75$、$\gamma = 0.15$，算出修改后的查询。
::: solution
在词项 (`rabbit`, `queen`, `garden`, `hole`) 上：$\vec q = (1, 1, 0, 0)$，$\vec d_2 = (1, 1, 1, 0)$，$\vec d_1 = (3, 0, 0, 1)$。于是
$$
\vec q\,' = (1, 1, 0, 0) + 0.75\,(1, 1, 1, 0) - 0.15\,(3, 0, 0, 1) = (1.3,\ 1.75,\ 0.75,\ -0.15),
$$
把负分量截掉得 $(1.3, 1.75, 0.75, 0)$。新查询从相关文档里得到了词项 `garden`，而 `queen` 如今压过 `rabbit`，因为不相关的文档满是兔子。用 $\vec q\,'$ 重新排序，把 $d_4$（"garden party tea"）的分数从零抬到正值——反馈能检回与原查询一个词都不共享的文档，这是它的长处；反馈错了，这也是它的危险。
:::
:::

::: quiz
一篇文档是文档 $d$ 接上它自身的拷贝。对用**原始**词频的 tf–idf 向量取余弦时，它对某查询的得分与 $d$ 的得分相比如何？换成对数 tf 权重呢？
- [x] 原始 tf：相同。对数 tf：一般不同。
- [ ] 原始 tf：加倍。对数 tf：相同。
- [ ] 两种情况都相同。
- [ ] 两种情况都加倍。
::: solution
原始 tf 下每个权重加倍，向量即 $2\vec d$，余弦不变（[[#prop-cosine]]）。对数 tf 下，权重 $1 + \log_{10}\mathrm{tf}$ 变成 $1 + \log_{10} 2\mathrm{tf} = 1.301 + \log_{10}\mathrm{tf}$，这不是原值的固定倍数——$\mathrm{tf} = 1$ 的词涨 $30\%$，$\mathrm{tf} = 10$ 的词涨 $15\%$——方向变了，余弦随之改变，通常只变一点。
:::
:::

## 高效地算出前 $k$ 条

查询的回答方式：对所有至少含一个查询词项的文档算分，返回最好的 $k$ 个。两种遍历次序皆可。

- **逐词处理**（term-at-a-time，TAAT）：一条接一条地处理倒排列表，把每个词项的贡献加进每篇文档的累加器，如上面的 `taat`。简单，每条列表顺序读取；可累加器可能多达数百万——这里 $800$ 个段落里有 $654$ 个，因为 `the` 几乎碰到所有段落。
- **逐文档处理**（document-at-a-time，DAAT）：给每个查询词项的列表各开一个游标，同步前进，像多路归并，一篇文档的分数算完再算下一篇。它只需要当前的前 $k$ 条，用一个堆装；也正是可以跳过的遍历次序。

::: algorithm 用小顶堆选前 $k$ 条 {#alg-topk}
维护一个至多装 $k$ 个二元对 $(\mathit{score}, d)$ 的小顶堆 $H$。对每篇已算分的文档 $d$、分数 $s$：若 $\abs{H} < k$，插入 $(s, d)$；否则，若 $s > \min H$，用 $(s, d)$ 替换堆顶。结束时把 $H$ 按分数从大到小排定。$\theta = \min H$（$\abs{H} = k$ 时；此前 $\theta = 0$）称为**阈值**：文档必须得分超过 $\theta$ 才能进入前 $k$。
:::

::: proposition 前 $k$ 选择的代价 {#prop-topk-heap}
用 [[#alg-topk]] 从 $n$ 篇已算分文档中选出前 $k$，耗时 $O(n \log k)$、空间 $O(k)$；把所有分数排序则是 $O(n \log n)$。阈值 $\theta$ 永不下降。
:::

::: proof
每篇文档至多引起一次堆插入或替换，代价 $O(\log k)$（[[data-structures/heaps]]），或至多一次与堆顶的比较；最后排序花 $O(k \log k)$。堆至多装 $k$ 项。堆满之后，堆顶只可能被更大的分数替换，替换后的新堆顶是新分数与其余 $k - 1$ 项中较小的那个，而后者都不小于旧堆顶；故 $\theta$ 永不下降。
:::

因为 $\theta$ 只增不减，一篇不可能得超过*当前* $\theta$ 分的文档永远进不了前 $k$——这就是安全剪枝的根基。

## 安全的动态剪枝：MaxScore 与 WAND

设分数是逐词项非负贡献之和，$s(d) = \sum_{t \in q} c_t(d)$，$t \notin d$ 时 $c_t(d) = 0$。预先算好归一化权重的余弦满足这一点，$c_t(d) = \hat q_t\, \hat d_t$；BM25 与语言模型分数也满足。给每个词项预先算出一个**上界**
$$
U_t = \max_{d} c_t(d),
$$
存进词典。算例查询的各词项上界是

```text
the     df=643 upper bound 0.015
about   df= 84 upper bound 0.092
sang    df=  2 upper bound 0.127
turtle  df= 52 upper bound 0.129
mock    df= 54 upper bound 0.156
soup    df= 10 upper bound 0.165
```

`the` 至多给任何分数添上 $0.015$。一旦阈值超过 $0.015$，*只*含 `the` 的段落就再也不可能进前 $k$，那条最长列表里的条目可以根本不算分。

### MaxScore

霍华德·特特尔（Turtle）与詹姆斯·弗洛德（Flood）的 **MaxScore**（1995）把查询词项按上界递增排好 $U_{t_1} \le \dots \le U_{t_m}$，把满足 $U_{t_1} + \dots + U_{t_j} \le \theta$ 的最短前缀 $t_1, \dots, t_j$ 称为**非必需**词项。只含非必需词项的文档至多得 $\theta$ 分，所以只从**必需**列表 $t_{j+1}, \dots, t_m$ 生成候选；对每个候选，探测（按其 docID 跳到）非必需列表，而一旦部分分数加上未探测词项的上界落到 $\theta$ 或以下，就停止算分。随着 $\theta$ 增大，越来越多的词项变为非必需，被生成的文档越来越少。算例中，只要 $\theta > 0.015 + 0.092 = 0.107$，`the` 与 `about` 就都成了非必需，那条 $643$ 条目的 `the` 列表只被探测、不再遍历。

::: example 一次 MaxScore 追踪 {#ex-maxscore}
取 $k = 1$，在下面 [[#ex-wand]] 的三条列表上运行 MaxScore（$U_B = 1 \le U_A = 2 \le U_C = 3$）：先从必需列表给候选算分，再按上界从大到小探测非必需列表，一旦部分分数加上未探测词项的上界不超过 $\theta$ 即停。
::: solution
一个小小的实现为每个候选打印一行：

```text
theta=0.0: essential BAC, candidate 1, probed -, score 1.0
theta=1.0: essential AC, candidate 3, probed B, score 3.0
theta=3.0: essential C, candidate 6, probed AB, score 5.5
theta=5.5: essential C, candidate 9, probed -, score 1.0
```

起初每个词项都是必需，文档 $1$ 得 $1$ 分。此时 $\theta = 1 \ge U_B$，$B$ 变为非必需，候选只来自 $A$ 与 $C$：只含 $B$ 的文档 $2$ 根本不会被生成。候选 $3$ 从 $A$ 得 $2$ 分，探测 $B$ 添 $1$ 分。$\theta = 3 \ge U_B + U_A$ 后只有 $C$ 是必需，它的列表只有两个条目：候选 $6$（先得 $3$ 分，探测 $A$ 添 $1.5$、$B$ 添 $1$）和候选 $9$——它的部分分数 $1$ 加上 $U_A + U_B = 3$ 不超过 $5.5$，于是一个列表都不必为它探测。MaxScore 摸过 $4$ 个候选后找到了文档 $6$，而文档 $5$、$7$、$8$ 自始至终没当过候选。
:::
:::

### WAND

安德烈·布罗德（Broder）、戴维·卡梅尔（Carmel）、迈克尔·赫尔斯科维奇（Herscovici）、阿娅·索费尔（Soffer）与杰森·齐恩（Zien）的 **WAND**（"weak AND"，2003）把同样的决策从逐词项改成了逐文档。

::: algorithm WAND {#alg-wand}
每个查询词项保留一个游标，指向它当前的条目，外加带阈值 $\theta$ 的前 $k$ 堆。
1. 把游标按当前 docID 排序（已耗尽的排最后）。
2. 找**枢轴**：按此次序，累计上界 $U_t$ 首次超过 $\theta$ 的那个游标。若不存在，停机。
3. 设 $p$ 为枢轴的 docID。若第一个游标也在 $p$（即枢轴之前的所有游标都在 $p$），就对 $p$ 完整算分：把所有位于 $p$ 的游标的 $c_t(p)$ 相加，把结果交给堆，并把位于 $p$ 的每个游标推进到下一条条目。
4. 否则，把某个位于 $p$ 之前的游标（例如第一个）推进到第一条 $\ge p$ 的条目，可用跳跃搜索（[[information-retrieval/inverted-indexes#alg-gallop]]）或跳跃指针。
5. 回到第 1 步。
:::

::: theorem WAND 是安全的 {#thm-wand}
只要每个贡献满足 $0 \le c_t(d) \le U_t$，WAND 返回的前 $k$ 个分数与穷举求值相同（阈值处的并列判给更早算分的文档）。
:::

::: proof
一篇文档要么被完整算分并交给堆，要么在某游标跳过它时被略过。我们证明：被跳过的文档 $d$ 在被跳过的那一刻满足 $s(d) \le \theta$。由于 $\theta$ 永不下降（[[#prop-topk-heap]]）、文档只有以超过 $\theta$ 的分数才能进堆，被跳过的文档此后进不了前 $k$。

考虑枢轴 docID 为 $p$、阈值为 $\theta$ 的一轮，以及尚未算分、$d < p$ 的文档 $d$。$d$ 能含哪些词项？游标从不越过一篇文档而不把它算分或依本论证将其跳过，所以凡游标当前指向 $d$ 之后的词项，其列表中仍在前方的部分不含 $d$——而后方的部分只含已处理过的文档。于是 $d$ 只能含那些游标指向 docID $\le d < p$ 的词项。在排序中，这些游标都严格位于枢轴之前（枢轴及其后的游标都在 docID $\ge p$ 处）。由枢轴的取法，严格在它之前的游标上界之和不超过 $\theta$。因此 $s(d) \le \sum_{t \text{ 在枢轴之前}} U_t \le \theta$。

第 4 步把游标从 $p$ 之下的 docID 移到第一条 $\ge p$ 的条目，它跳过的文档都 $< p$，全在此论证覆盖之内。第 3 步对 $p$ 恰好算分：含 $p$ 的每个词项的游标都在 $p$——枢轴之前的游标在 $p$（第一个在，且次序是排好的），而枢轴之后 docID $\ne p$ 的游标在 $p$ 之外，按同样的推理不含 $p$。最后，当枢轴不存在时，所有未耗尽游标的上界之和不超过 $\theta$，而剩下的每篇文档只能含这些词项，所以谁也无法进入前 $k$。
:::

::: example 一次 WAND 追踪 {#ex-wand}
三个词项的贡献（docID: 贡献）为 $A$: $1{:}1.0,\ 3{:}2.0,\ 6{:}1.5,\ 8{:}0.5$；$B$: $2{:}1,\ 3{:}1,\ 5{:}1,\ 6{:}1,\ 7{:}1,\ 8{:}1$；$C$: $6{:}3.0,\ 9{:}1.0$。用 WAND 找出 $k = 1$ 的最佳文档，记下每一步。
::: solution
上界为 $U_A = 2$、$U_B = 1$、$U_C = 3$。每行按 docID 列出排好序的游标、阈值与动作；一个实现 [[#alg-wand]] 的短程序打印：

```text
A@1 B@2 C@6            theta=0.0: pivot A, doc 1: score 1.0
B@2 A@3 C@6            theta=1.0: pivot A at doc 3; move B to 3
A@3 B@3 C@6            theta=1.0: pivot A, doc 3: score 3.0
B@5 A@6 C@6            theta=3.0: pivot C at doc 6; move B to 6
A@6 B@6 C@6            theta=3.0: pivot C, doc 6: score 5.5
B@7 A@8 C@9            theta=5.5: pivot C at doc 9; move B to inf
A@8 C@9 B@inf          theta=5.5: no pivot, stop
```

第 2 行：$B$ 单独的上界（$1$）不超过 $\theta = 1$，但 $B$ 加 $A$（$3$）超过了，于是枢轴是文档 $3$ 处的 $A$，文档 $2$（只含 $B$，至多 $1$ 分）被跳过。第 4 行：$U_B + U_A = 3$ 不超过 $\theta = 3$，于是只含 $B$ 的文档 $5$ 被跳过，枢轴移到 $6$ 处的 $C$。第 6 行：$\theta = 5.5$ 时，三个上界之和 $6 > 5.5$，枢轴是 $9$ 处的 $C$；文档 $7$、$8$（至多 $U_B + U_A = 3$ 分）被跳过。第 7 行：剩下的游标 $A$ 与 $C$ 上界之和为 $5 \le 5.5$，搜索停止，$9$ 没有算分。答案是得 $5.5$ 分的文档 $6$；九个含查询词项的文档中只算了 $3$ 个的分。
:::
:::

在《爱丽丝》的查询 `the mock turtle sang about soup` 上，在同样的倒排列表上实现的 WAND（$k = 5$）把 $654$ 个含查询词项的段落完整算了 $125$ 个的分，返回的正是穷举逐词处理的五个结果——程序检查了两个清单相等：

```text
fully scored 125 of 800 documents
[(0.341, 516), (0.266, 544), (0.266, 538), (0.258, 585), (0.247, 623)]
True
```

文档集越大、列表长短越悬殊，节省越多，因为低权重词的长列表被大步跳过。WAND 与 MaxScore 的软肋在于单一的全局上界 $U_t$ 太松：某一个 `the` 占篇幅很大的段落，就给所有段落定了界。**Block-Max WAND**（Shuai Ding 与托尔斯滕·苏埃尔（Suel），2011）在压缩列表的块目录里为每 $128$ 条条目这样的块存下最大贡献（[[information-retrieval/index-compression]]），用这些局部上界跳过整块；截至 2026 年，Lucene 等开源引擎的前 $k$ 处理用的正是 WAND 与 MaxScore 的块最大变体。

::: quiz
WAND 中，按 docID 排好序的游标位于 $B@4$、$A@9$、$C@12$，上界 $U_B = 2$、$U_A = 1$、$U_C = 5$，$\theta = 2.5$。接下来发生什么？
- [ ] 对文档 $4$ 完整算分。
- [x] 枢轴是文档 $9$ 处的 $A$，游标 $B$ 被推进到第一条 $\ge 9$ 的条目。
- [ ] 枢轴是 $12$ 处的 $C$，$B$ 与 $A$ 都推进到 $12$。
- [ ] 算法停止，因为 $U_B < \theta$。
::: solution
上界的累加和先是 $U_B = 2 \le 2.5$，随后 $U_B + U_A = 3 > 2.5$，于是枢轴是 $A$ 的游标，在文档 $9$。第一个游标（$4$ 处的 $B$）不在 $9$，所以第 4 步把 $B$ 推进到第一条 $\ge 9$ 的条目。文档 $4$ 到 $8$ 在查询词项中只可能含 $B$，至多 $U_B = 2 \le \theta$ 分，可以放心跳过。停止是错的：三个游标的上界之和为 $8 > \theta$。
:::
:::

## 更快，但不安全：非精确前 $k$

连安全剪枝都嫌慢时，引擎就放弃精确性。**冠军列表**为每个词项只保留该词权重最高的 $r$ 篇文档，只对查询词项各自冠军列表的并算分。**按影响排序**的索引把每条倒排列表按贡献从大到小（而非按 docID）存放，查询处理于是可以先读每个词的高影响条目，剩余影响小到无关紧要时提前停止（Anh 与 Moffat 在 21 世纪初发展了这类方法）；代价是按 docID 的求交与间隙压缩不再直接适用。**分层索引**把"最好"的文档（按某种与查询无关的质量分，如 [[information-retrieval/web-search]] 的 PageRank）放进第一层，只有第一层给不出 $k$ 条好结果时才去问更低的层。大型引擎还**分阶段**排序：一个便宜函数（BM25 配 WAND）选出几百或几千个候选，昂贵的模型——学习排序器（[[information-retrieval/learning-to-rank]]）与神经重排器（[[information-retrieval/dense-retrieval]]）——只对这些候选重新排序。一条捷径可否接受是经验问题：在测试查询上度量效果的损失（[[information-retrieval/evaluation]]）。

::: history
汉斯·彼得·卢恩（Luhn）在 1957 年提出，一个词在文档中的频次度量它的重要程度；杰拉德·萨尔顿（Salton）先年在哈佛、后在康奈尔从 20 世纪 60 年代初建立起 SMART 检索系统，成果收入《SMART 检索系统：自动文档处理实验》（*The SMART Retrieval System: Experiments in Automatic Document Processing*，1971），J. J. Rocchio 的相关反馈方法也载于该卷。卡伦·斯帕克·琼斯（Spärck Jones）的 "A statistical interpretation of term specificity and its application in retrieval"（*Journal of Documentation*，1972）提出了逆文档频率。萨尔顿、安德鲁·王（Wong）与 Chung-Shu Yang 在 "A vector space model for automatic indexing"（*Communications of the ACM*，1975）中描述了向量空间模型；萨尔顿与克里斯·巴克利（Buckley）的 "Term-weighting approaches in automatic text retrieval"（1988）比较了数百种加权组合。辛哈尔、巴克利与米特拉的 "Pivoted document length normalization" 发表于 SIGIR 1996。效率方面，霍华德·特特尔与詹姆斯·弗洛德 1995 年描述了 MaxScore，布罗德等人在 CIKM 2003 给出 WAND，Shuai Ding 与苏埃尔的 Block-Max WAND 发表于 SIGIR 2011。
:::

## 后续内容

向量空间模型是"这篇文档有多相关？"的第一个答案。[[information-retrieval/probabilistic-retrieval]] 从概率论导出另一个答案——概率排序原理、二元独立模型、BM25 与语言模型——结果既为 idf 辩了护，又解释了 tf 与长度归一化应当如何相互作用。[[information-retrieval/evaluation]] 让"更好的排序"变得可度量。本章的查询处理算法适用于一切"逐词贡献之和"的分数，BM25 包括在内，原样可用。而那幅几何图景——文档是向量，相关即邻近——则在 [[information-retrieval/dense-retrieval]] 中以稠密形态回归：那里的向量是学出来的，只有几百个稠密维度，而非几百万个稀疏维度。

::: summary
- 排序检索给文档打分并返回前 $k$，避免了布尔查询非全即无的行为。
- 词权重把**词频**（通常以 $1 + \log \mathrm{tf}$ 衰减，[[#def-tf]]）与**逆文档频率** $\log(N/\mathrm{df})$（[[#def-idf]]）相乘：**tf–idf**（[[#def-tfidf]]）。
- **向量空间模型**（[[#def-vsm]]）按查询向量与文档向量的余弦排序；余弦无视向量长度，对单位向量则与欧氏距离等价（[[#prop-cosine]]）。
- 余弦归一化偏爱短文档；**轴点归一化**用一个斜率参数矫正，这个想法被 BM25 继承。
- Rocchio 的**相关反馈**把查询移向相关文档；伪相关反馈假定头几条结果相关。
- 配前 $k$ **小顶堆**（[[#alg-topk]]）的**逐文档**求值花 $O(n \log k)$，并给出不降的阈值 $\theta$（[[#prop-topk-heap]]）。
- **MaxScore** 与 **WAND**（[[#alg-wand]]）用逐词上界跳过不可能超过 $\theta$ 的文档，且可证明不改前 $k$（[[#thm-wand]]）；块最大变体把界收紧到每块。
:::

## 习题

::: exercise 一个 idf 值 {level=1 check="2"}
一个文档集有 $N = 1\,000\,000$ 篇文档，某词项出现在其中 $10\,000$ 篇里。以 $10$ 为底，它的 idf 是多少？（填入 idf。）
::: solution
$\log_{10}(10^6 / 10^4) = \log_{10} 100 = 2$。
:::
:::

::: exercise 一个 tf–idf 权重 {level=1 check="(1 + log10(20)) * log10(800/52)"}
在《爱丽丝》的段落中（$N = 800$），`turtle` 出现在 $52$ 个段落里。它在一个出现 $20$ 次的段落中的 tf–idf 权重（[[#def-tfidf]]）是多少？（填入权重。）
::: solution
$\mathrm{wf} = 1 + \log_{10} 20 = 2.301$，$\mathrm{idf} = \log_{10}(800/52) = 1.187$，故 $w = 2.301 \times 1.187 \approx 2.731$。
:::
:::

::: exercise 两篇短文档的余弦 {level=1 check="1/2"}
用原始词频、不加 idf，计算 "rabbit rabbit queen" 与 "rabbit queen queen" 的余弦相似度。再计算 "rabbit queen" 与 "rabbit tarts" 的。（填入第二个余弦。）
::: solution
第一对：在 (`rabbit`, `queen`) 上的向量 $(2, 1)$ 与 $(1, 2)$；点积 $4$，长度都是 $\sqrt{5}$，余弦 $4/5 = 0.8$。第二对：在 (`rabbit`, `queen`, `tarts`) 上的向量 $(1, 1, 0)$ 与 $(1, 0, 1)$；点积 $1$，长度都是 $\sqrt 2$，余弦 $1/2$。
:::
:::

::: exercise 不归一化的点积 {level=2}
举例说明：用 tf–idf 权重按未归一化的点积 $\vec q\cdot\vec d$ 排序，可能把一篇又长又离题的文档排到又短又切题的前面。再证明：用原始 tf 时，把文档接上自身不可能提高余弦；用对数 tf 时则可能。
::: solution
查询 `rabbit`（一个词项，查询权重 $1$）。一篇切题短笺 "rabbit hole" 有 $\mathrm{tf}_{\text{rabbit}} = 1$；一篇一万词、顺带提到 "rabbit" $5$ 次的长法律文书有 $\mathrm{tf} = 5$。用对数 tf 权重，点积分别是 $1 \cdot \mathrm{idf}$ 与 $(1 + \log_{10} 5)\mathrm{idf} = 1.7\,\mathrm{idf}$，长文档赢。可它的余弦要除以它的长度——因几千个别的词项而巨大——于是按余弦是短笺赢。第二部分：原始 tf 下，拼接使每个权重加倍，由 [[#prop-cosine]] 余弦不变。对数 tf 下，权重 $1 + \log\mathrm{tf}$ 变成 $1 + \log 2 + \log\mathrm{tf}$；只出现一次的词相对涨得比高频词多，方向朝罕见词的"平坦"向量移动，与由这类词构成的查询的余弦便略微升高。
:::
:::

::: exercise SMART 记法 {level=2}
改用 `ltc.ltc` 方案（文档权重也含 idf）重算 [[#ex-cosine]]。排序变了吗？
::: solution
文档权重现在是归一化前的 $(1 + \log_{10}\mathrm{tf})\cdot\mathrm{idf}$。$d_1$：`rabbit` $1.477 \times 0.301 = 0.445$，`hole` $1 \times 0.602 = 0.602$；长度 $0.749$；归一化的 `rabbit` 为 $0.594$。$d_2$：`queen`、`rabbit`、`garden` 各 $0.301$；归一化后各 $0.577$。$d_3$：`queen` $1.301 \times 0.301 = 0.392$，`tarts` $0.602$；长度 $0.718$；归一化的 `queen` 为 $0.545$。分数：$d_1$: $0.707 \times 0.594 = 0.420$；$d_2$: $0.816$；$d_3$: $0.707 \times 0.545 = 0.385$。次序 $d_2, d_1, d_3$ 不变，但 $d_1$ 与 $d_3$ 掉了下来，因为它们的非查询词项 `hole` 和 `tarts` 更罕见，如今在归一化中占了更重的分量。
:::
:::

::: exercise MaxScore 的划分 {level=2}
对算例查询、用上文列出的上界，$\theta = 0.25$ 时哪些词项是非必需的？还必须遍历哪些列表来生成候选？
::: solution
按上界排序：`the` $0.015$、`about` $0.092$、`sang` $0.127$、`turtle` $0.129$、`mock` $0.156$、`soup` $0.165$。前缀和：$0.015$、$0.107$、$0.234$、$0.363, \dots$。和不超过 $0.25$ 的最长前缀是 `the`、`about`、`sang`（和 $0.234$）。这三个是非必需的：只含它们其中几个的段落至多得 $0.234 < 0.25$ 分。候选来自 `turtle`、`mock`、`soup` 的列表（至多 $52 + 54 + 10$ 条条目），三个非必需列表只为这些候选而探测。
:::
:::

::: exercise 堆的阈值 {level=2 check="5"}
$k = 3$ 的前 $k$ 选择用 [[#alg-topk]] 依次处理分数为 $5, 1, 4, 2, 8, 3, 7$ 的文档。最终阈值 $\theta$ 是多少？（填入 $\theta$。）堆满之后发生了几次堆替换？
::: solution
$5, 1, 4$ 之后堆为 $\set{1, 4, 5}$、$\theta = 1$。接着 $2 > 1$：替换，堆 $\set{2, 4, 5}$，$\theta = 2$。$8 > 2$：替换，$\set{4, 5, 8}$，$\theta = 4$。$3 \le 4$：不变。$7 > 4$：替换，$\set{5, 7, 8}$，$\theta = 5$。最终阈值为 $5$，其间替换 $3$ 次，前 $3$ 名是 $8, 7, 5$。阈值取过的值是 $1, 2, 4, 4, 5$——正如 [[#prop-topk-heap]] 所言，永不下降。
:::
:::

::: exercise 更紧界下的 WAND {level=3}
证明：若把全局界 $U_t$ 换成任意满足"$U'_t \ge c_t(d)$ 对每个仍处在 $t$ 的游标前方的文档 $d$ 成立"的值 $U'_t$，WAND 依然安全；并解释这如何正当化 Block-Max WAND——在那里，一个游标所用的界是其当前块内的最大贡献。为什么 Block-Max WAND 必须在*枢轴*文档所在的各列表的所有块上检查块界，而不只是游标当前所在块的界？
::: solution
[[#thm-wand]] 的证明只用到：被跳过的文档 $d$ 对每个游标在枢轴之前的词项 $t$ 满足 $c_t(d) \le U_t$，而 $d$ 处在（或恰在）那些游标的前方。任何对游标前方文档成立的界同样可用，论证逐字照搬即得 $U'_t$ 的版本。在 Block-Max WAND 中，游标的当前块覆盖从游标到该块末尾 docID 的文档，块最大值给这些文档的 $c_t(d)$ 定了界——可定不了后续块中文档的界。被跳过的文档 $d < p$ 可能落在某个游标当前块的末端之外，那里块最大值什么都没说。所以 Block-Max WAND 先用全局界找枢轴（对所有文档安全），再对候选 $p$ 检查每条列表中*包含 $p$ 的那一块*的最大值；若其和不超过 $\theta$，它就能跳过 $p$（以及直到最近块边界的一切）而不解压任何块。只拿游标当前块的界来定界，定的是错误文档的界。
:::
:::

::: exercise 实现逐文档算分 {level=3}
写一个函数 `daat(q, k)`，按 docID 次序给文档算分：每个查询词项一个游标依次推进（不剪枝），配一个前 $k$ 堆，返回与 `taat` 相同的结果。以列表长 $L_1, \dots, L_m$ 和 $k$ 表达，它的时间复杂度是多少？
::: solution
```python
def daat(q, k=5):
    qv = query_vector(q)
    lists = [(qv[t], postings[t]) for t in qv]
    pos = [0] * len(lists)
    heap = []
    while True:
        d = min((pl[i][0] for (_, pl), i in zip(lists, pos) if i < len(pl)), default=None)
        if d is None:
            return sorted(heap, reverse=True)
        s = 0.0
        for j, ((qw, pl), i) in enumerate(zip(lists, pos)):
            if i < len(pl) and pl[i][0] == d:          # 这个词项出现在 d 中
                s += qw * weight(None, d, pl[i][1]); pos[j] += 1
        if len(heap) < k: heapq.heappush(heap, (s, d))
        elif s > heap[0][0]: heapq.heapreplace(heap, (s, d))
```
每轮找到最小的当前 docID（$O(m)$），给那篇文档算分并把位于它的游标推进。并集中每个不同文档一轮，至多 $\sum_i L_i$ 轮，故时间为 $O(m \sum_i L_i + n\log k)$，$n$ 为不同文档个数；把游标放进以 docID 为键的堆可把 $m$ 因子降为 $\log m$。上面的 `weight` 函数忽略它的第一个参数，传 `None` 无害；在算例查询上 `daat(...) == taat(...)[0]` 成立。（两次相加次序不同，浮点求和的最后一位可能不同，原则上会调换两篇得分几乎并列的文档；比较分数时留容差可避免误报。）
:::
:::
