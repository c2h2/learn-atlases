对$n$元模型来说，*cat* 与 *dog* 的相异程度不亚于 *cat* 与 *carburettor*：每个词都是各有自己计数的独立符号，对一词所知的一切都无法转移到另一个词上。然而每个说话人都明白 *cat* 与 *dog* 相似，并且能从 *I fed the ___ and took it to the vet* 这样的句子判断出空缺处是一种动物。这种直觉正是本章的出发点：出现在相似语境中的词有相似的意义，因此一个词可以用它的语境来表示，而语境可以压缩成一个由实数组成的短向量——**词嵌入**——在其中相似的词彼此靠近。

本章用两种最终被证明密切相关的方式构造嵌入。**基于计数**的方法把共现列成表、用**逐点互信息**重新加权，再用截断奇异值分解压缩这张表。**基于预测**的方法训练向量去预测语境：**word2vec**（Mikolov 等，2013）的 skip-gram 与负采样（下面将手工训练它），以及 **GloVe**（Pennington 等，2014）。Levy 与 Goldberg（2014）的定理表明，带负采样的 skip-gram 隐式地分解了一个平移后的 PMI 矩阵，从而把两者统一起来。本章最后讲嵌入空间的几何——相似度、类比——讲嵌入如何评测，以及它们透露了其训练文本中存在的哪些联想，包括社会刻板印象。嵌入是每个神经语言模型的输入层（[[transformers/self-attention]]），后续课程中的语境嵌入（[[sequence-models/contextual-embeddings]]）延伸的正是同一思想。

## 分布假说 {#sec-distributional}

Zellig Harris（1954）主张，语言单位的意义反映在它们的**分布**——它们出现的语境——之中，因此分布相似的词意义相似。J. R. Firth（1957）的说法令人难忘："观其伴，知其词"（You shall know a word by the company it keeps）。这一假说并不是意义的定义；它是一个经验性论断：分布相似性与语义相似性相关。意义之所以能从原始文本中学到，靠的正是它。

::: definition 共现矩阵 {#def-cooc}
固定一个**目标词**词表$\mathcal{V}$、一个**语境词**词表$\mathcal{C}$（通常两者是同一集合），以及两侧各$L$个词的**窗口**。**共现计数**$\#(w, c)$是语料中在$w$的一次出现的$L$个词范围内$c$出现的次数。元素为$M_{wc} = \#(w, c)$的矩阵$M\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{C}\rvert}$称为**共现矩阵**；第$w$行是$w$的**分布向量**。记$\#(w) = \sum_c\#(w, c)$，$\#(c) = \sum_w\#(w, c)$，$D = \sum_{w, c}\#(w, c)$。
:::

$M$的行可以用行向量夹角的余弦来比较。

::: definition 余弦相似度 {#def-cosine}
对非零向量$\mathbf{u}, \mathbf{v}\in\R^d$，**余弦相似度**为

$$
\cos(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}\,\norm{\mathbf{v}}}\in[-1, 1].
$$

指向同一方向的向量的余弦相似度为$1$，正交向量为$0$，并且把其中任一向量乘以正数不改变它。
:::

之所以用余弦而不是欧氏距离，是因为计数向量的长度主要反映词有多频繁，而不是词义是什么。

## 逐点互信息 {#sec-pmi}

原始计数被高频词支配：每个名词都会与 *the* 共现。要紧的是$w$与$c$共同出现是否**比随机情形更频繁**。

::: definition PMI 与 PPMI {#def-pmi}
用经验概率$P(w, c) = \#(w, c)/D$、$P(w) = \#(w)/D$与$P(c) = \#(c)/D$，$w$与$c$的**逐点互信息**为

$$
\operatorname{PMI}(w, c) = \log\frac{P(w, c)}{P(w)\,P(c)} = \log\frac{\#(w, c)\,D}{\#(w)\,\#(c)},
$$ {#eq-pmi}

**正 PMI**为$\operatorname{PPMI}(w, c) = \max\big(\operatorname{PMI}(w, c), 0\big)$，它同时把未见过的符号对的$-\infty$换成了$0$。
:::

当$w$与$c$的共现频率恰如独立性所预测的那样时PMI为$0$；两者相互吸引时为正，相互排斥时为负。它在$P(w, c)$下的期望就是[[math-for-ml/information-theory]]中的互信息。PPMI 舍弃负值，因为负值不可靠：要断定两个词的共现*少于*随机水平，需要极大的计数。Church 与 Hanks（1990）把 PMI 引入词典学，称之为"关联比"。

::: example 手工计算 PMI {#ex-pmi}
某小语料库与三个语境词的共现计数为

| | *pet* | *fur* | *drive* |
|---|---|---|---|
| *cat* | $8$ | $6$ | $0$ |
| *dog* | $10$ | $4$ | $1$ |
| *car* | $0$ | $0$ | $11$ |

以比特为单位计算$\operatorname{PMI}(\textit{cat}, \textit{pet})$与$\operatorname{PMI}(\textit{car}, \textit{drive})$、各个 PPMI 向量，以及 PPMI 变换前后 *cat* 与 *dog* 的余弦相似度。
::: solution
$D = 40$，$\#(\textit{cat}) = 14$，$\#(\textit{dog}) = 15$，$\#(\textit{car}) = 11$，$\#(\textit{pet}) = 18$，$\#(\textit{fur}) = 10$，$\#(\textit{drive}) = 12$。于是

$$
\operatorname{PMI}(\textit{cat}, \textit{pet}) = \log_2\frac{8\cdot40}{14\cdot18} = \log_21.270 = 0.345,\qquad \operatorname{PMI}(\textit{car}, \textit{drive}) = \log_2\frac{11\cdot40}{11\cdot12} = 1.737.
$$

算出全部九个元素并在$0$处截断，得 PPMI 向量 *cat* $(0.345, 0.778, 0)$、*dog* $(0.567, 0.093, 0)$ 与 *car* $(0, 0, 1.737)$（$\operatorname{PMI}(\textit{dog}, \textit{drive}) = \log_2\frac{1\cdot40}{15\cdot12} = -2.17$ 被截去）。*cat* 与 *dog* 的原始计数向量的余弦为 $0.961$；PPMI 向量的余弦为 $0.548$，因为 PPMI 强调了 *cat* 与 *fur* 的关联强于 *dog*。两种表示给出的 *cat* 与 *car* 的余弦都是 $0$。
:::
:::

PMI 有一个著名的偏差：它对罕见符号对最大。若$w$只出现一次、且就在$c$旁边，则$\operatorname{PMI}(w, c) = \log(D/\#(c))$，即该语境所能达到的最大值（习题 10）。Levy、Goldberg 与 Dagan（2015）给出的一个标准修正是：在归一化之前先把语境计数取$\alpha = 0.75$次幂，$P_\alpha(c) = \#(c)^{\alpha}/\sum_{c'}\#(c')^{\alpha}$，这提高了罕见语境的概率，从而降低了它们的 PMI。下面是用这一平滑得到的 PPMI 向量，取自《白鲸记》（*Moby-Dick*，Project Gutenberg 电子书 #2701）中出现至少$10$次的$2{,}201$个词，窗口为$\pm2$，并列出按余弦度量的每个词的最近邻：

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*", text.lower())
freq = collections.Counter(tokens)
keep = {w for w, c in freq.items() if c >= 10}          # words and contexts seen at least 10 times
window = 2

pair = collections.Counter()                             # #(w, c) within +-2 tokens
for i, w in enumerate(tokens):
    if w not in keep:
        continue
    for j in range(max(0, i - window), min(len(tokens), i + window + 1)):
        if j != i and tokens[j] in keep:
            pair[w, tokens[j]] += 1
nw, nc = collections.Counter(), collections.Counter()
for (w, c), n in pair.items():
    nw[w] += n; nc[c] += n
total = sum(pair.values())
alpha = 0.75                                             # context-distribution smoothing
zc = sum(v ** alpha for v in nc.values())

vec = collections.defaultdict(dict)                      # sparse PPMI vectors
for (w, c), n in pair.items():
    pmi = math.log((n / total) / ((nw[w] / total) * (nc[c] ** alpha / zc)))
    if pmi > 0:
        vec[w][c] = pmi
norm = {w: math.sqrt(sum(x * x for x in v.values())) for w, v in vec.items()}
print(len(keep), "words;", len(pair), "co-occurring pairs")

def cos(a, b):
    va, vb = vec[a], vec[b]
    if len(va) > len(vb): va, vb = vb, va
    return sum(x * vb.get(c, 0.0) for c, x in va.items()) / (norm[a] * norm[b])

for w in ["whale", "ship", "sea", "captain", "harpoon", "three", "thought"]:
    sims = sorted(((cos(w, u), u) for u in vec if u != w), reverse=True)[:5]
    print(f"{w:<8} ->", ", ".join(f"{u} {s:.2f}" for s, u in sims))
```

```text
2201 words; 194809 co-occurring pairs
whale    -> sperm 0.27, whales 0.24, fishery 0.23, porpoise 0.21, whale’s 0.21
ship     -> ships 0.22, her 0.21, pequod 0.20, nantucket 0.20, vessel 0.18
sea      -> prairie 0.19, west 0.19, on 0.18, rolling 0.18, were 0.17
captain  -> peleg 0.28, ahab 0.26, he 0.24, starbuck 0.21, bildad 0.21
harpoon  -> boat 0.18, corpse 0.17, ahab 0.16, peculiarities 0.16, arm 0.16
three    -> two 0.28, four 0.26, five 0.24, sixty 0.24, were 0.22
thought  -> i 0.25, that 0.22, seen 0.21, knew 0.20, doubt 0.19
```

仅凭二十五万词的文本、没有任何监督，最近邻的关系便清晰可辨：数字与数字聚到一起，船长们（*Peleg*、*Bildad*、*Ahab*、*Starbuck*）与 *captain* 聚到一起，*whale* 与 *sperm*、*whales*、*porpoise* 和 *fishery* 聚到一起。有些邻居是句法上的而非语义上的（*were*、*on*），有些则是一本书造成的偶然（在梅尔维尔（Melville）的一个比喻里，*sea* 是一片 *prairie*）。语料库越大，邻域就越干净。

## 截断 SVD 给出稠密向量 {#sec-svd}

PPMI 向量是稀疏的，长度等于语境词表的大小——几万甚至几十万个维度。把它们压缩到几百维既省空间，又*提高*相似度估计的质量，因为那些恰好不共享任何语境、但共享相关语境的词会被拉到一起。所用的工具是[[math-for-ml/matrix-decompositions]]中的奇异值分解。

::: definition SVD 嵌入 {#def-svd-emb}
设$M = U\Sigma V\T$是（PPMI）矩阵$M\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{C}\rvert}$的奇异值分解，奇异值按递减排列。词$w$的**秩$d$ SVD 嵌入**是$W = U_d\Sigma_d^{\,p}$的第$w$行，其中$U_d$由前$d$个左奇异向量组成，$\Sigma_d$是前$d$个奇异值，$p\in[0, 1]$是加权指数（经典取法是$p = 1$；对相似度任务$p = 0.5$或$0$常常效果更好）。潜在语义分析（Deerwester 等，1990）就是这样作用于词–文档矩阵的。
:::

由 Eckart–Young 定理，$U_d\Sigma_dV_d\T$是$M$在 Frobenius 范数下的最佳秩$d$近似。取$p = 1$时，嵌入之间的内积复现最佳近似的内积：$WW\T = U_d\Sigma_d^2U_d\T = M_dM_d\T$，其中$M_d = U_d\Sigma_dV_d\T$（习题 9）。因此 SVD 保留了共现的主模式，丢掉了其余部分——那多半是稀疏计数带来的噪声。

## word2vec：带负采样的 skip-gram {#sec-word2vec}

Mikolov、Chen、Corrado 与 Dean（2013）走了另一条路：训练向量去*预测*语境。在 **skip-gram** 模型中，每个词$w$有一个**目标向量**$\mathbf{w}\in\R^d$和一个**语境向量**$\mathbf{c}\in\R^d$，在目标词$w$附近看到语境词$c$的概率是词表上的 softmax：$p(c\mid w) = \exp(\mathbf{w}\cdot\mathbf{c})/\sum_{c'}\exp(\mathbf{w}\cdot\mathbf{c}')$。（**CBOW** 变体则用目标词语境向量的平均来预测目标词。）softmax 每次预测要花费$O(\lvert\mathcal{V}\rvert)$，于是第二篇论文（Mikolov、Sutskever、Chen、Corrado 与 Dean，2013）把它换成一个更便宜的二分类任务。

::: definition 带负采样的 skip-gram（SGNS）{#def-sgns}
对每个观测到的词对$(w, c)$——一个目标词与其窗口内的一个词——从噪声分布$P_n$独立抽取$k$个**负**语境$c_1, \dots, c_k$；$P_n$通常取一元分布的$3/4$次幂再归一化。对全体观测词对求和、用随机梯度上升最大化下式，就把向量训练得能分辨真实词对与噪声：

$$
\ell(w, c) = \log\sigma(\mathbf{w}\cdot\mathbf{c}) + \sum_{i=1}^{k}\log\sigma(-\mathbf{w}\cdot\mathbf{c}_i),\qquad\sigma(x) = \frac{1}{1 + e^{-x}},
$$ {#eq-sgns}

训练后的目标向量（有时与语境向量相加）就是嵌入。
:::

这个模型是一个特征是学出来的逻辑回归（[[ml-fundamentals/logistic-regression]]）：$\sigma(\mathbf{w}\cdot\mathbf{c})$就是"$(w, c)$ 是真实词对"的预测概率。梯度很简单。记正词对的$g = 1 - \sigma(\mathbf{w}\cdot\mathbf{c})$、负词对的$g_i = -\sigma(\mathbf{w}\cdot\mathbf{c}_i)$，

$$
\frac{\partial\ell}{\partial\mathbf{w}} = g\,\mathbf{c} + \sum_ig_i\,\mathbf{c}_i,\qquad\frac{\partial\ell}{\partial\mathbf{c}} = g\,\mathbf{w},\qquad\frac{\partial\ell}{\partial\mathbf{c}_i} = g_i\,\mathbf{w},
$$

于是每次更新只触及$k + 2$个向量（习题 5）。最初的实现还会对高频词**下采样**：以概率$1 - \sqrt{t/f(w)}$丢弃$w$的每次出现，其中阈值$t\approx10^{-5}$、$f(w)$是相对频率；这加快了训练，也改善了罕见词的效果。

::: example 下采样与噪声分布 {#ex-subsample}
(a) 阈值$t = 10^{-5}$时，下采样会丢弃相对频率$f = 0.05$（英语中 *the* 的频率大约如此）的词的多大比例的出现？$f = 10^{-4}$的词呢？(b) 一个二元词表的一元概率为$0.9$和$0.1$。噪声分布$P_n\propto P^{3/4}$给它们的概率是多少？
::: solution
(a) $1 - \sqrt{10^{-5}/0.05} = 1 - 0.0141 = 0.986$：*the* 的出现几乎$99\%$被丢弃，由此消除了大量无信息量的词对。$f = 10^{-4}$时：$1 - \sqrt{0.1} = 0.684$。$f\le t$的词永不丢弃。(b) $0.9^{0.75} = 0.924$、$0.1^{0.75} = 0.178$；归一化得$P_n = (0.839, 0.161)$。取$3/4$次幂把噪声的质量移向罕见词，于是它们被抽作负样本的次数高于只按频率应有的比例。
:::
:::

下面清单用纯 Python 在一个*合成*语料上训练 SGNS；语料由代码自己生成：八个人物词（*king*、*queen*、*prince*、*princess*、*man*、*woman*、*boy*、*girl*）各自出现在由三个隐藏属性——性别、身份、年龄——加上填充词所决定的词中间。用意在于观察方法如何找回我们明知存在的结构。训练大约需要半分钟。

```python
import math, random, collections

rng = random.Random(0)
# ---- a synthetic corpus: who someone is determines the words around them ----
people = {  # word: (gender, status, age)
    "king": ("m", "royal", "adult"), "queen": ("f", "royal", "adult"),
    "prince": ("m", "royal", "young"), "princess": ("f", "royal", "young"),
    "man": ("m", "common", "adult"), "woman": ("f", "common", "adult"),
    "boy": ("m", "common", "young"), "girl": ("f", "common", "young"),
}
words_for = {
    "m": ["he", "his", "him"], "f": ["she", "her", "hers"],
    "royal": ["crown", "throne", "palace", "court"], "common": ["house", "street", "market", "farm"],
    "adult": ["works", "rules", "married"], "young": ["plays", "learns", "school"],
}
filler = ["the", "a", "and", "in", "with", "to"]
corpus = []
for _ in range(3000):
    w = rng.choice(list(people))
    ctx = [rng.choice(words_for[f]) for f in people[w]] + [rng.choice(filler) for _ in range(2)]
    rng.shuffle(ctx)
    sent = ctx[:2] + [w] + ctx[2:]            # the person word sits in the middle of its context
    corpus.append(sent)
tokens = [t for s in corpus for t in s]
vocab = sorted(set(tokens))
idx = {w: i for i, w in enumerate(vocab)}
counts = collections.Counter(tokens)
print(len(tokens), "tokens,", len(vocab), "types")

# ---- skip-gram with negative sampling ----
d, k, window, lr, epochs = 16, 5, 2, 0.025, 10
W = [[(rng.random() - 0.5) / d for _ in range(d)] for _ in vocab]   # target vectors
C = [[0.0] * d for _ in vocab]                                       # context vectors
noise = [counts[w] ** 0.75 for w in vocab]                          # unigram^0.75 noise distribution

def sigmoid(x):
    return 1 / (1 + math.exp(-x)) if x > -30 else 0.0

for epoch in range(epochs):
    for s in corpus:
        for i, w in enumerate(s):
            for j in range(max(0, i - window), min(len(s), i + window + 1)):
                if j == i:
                    continue
                wi = idx[w]
                pairs = [(idx[s[j]], 1.0)] + [(n, 0.0) for n in rng.choices(range(len(vocab)), noise, k=k)]
                grad_w = [0.0] * d
                for c, label in pairs:
                    g = lr * (label - sigmoid(sum(a * b for a, b in zip(W[wi], C[c]))))
                    for t in range(d):
                        grad_w[t] += g * C[c][t]
                        C[c][t] += g * W[wi][t]
                for t in range(d):
                    W[wi][t] += grad_w[t]

def cos(u, v):
    return sum(a * b for a, b in zip(u, v)) / math.sqrt(sum(a * a for a in u) * sum(b * b for b in v))

def nearest(vec, exclude=(), n=3):
    sims = [(cos(vec, W[idx[w]]), w) for w in vocab if w not in exclude]
    return [(w, round(s, 3)) for s, w in sorted(sims, reverse=True)[:n]]

for w in ["king", "girl", "crown", "she"]:
    print(w, "->", nearest(W[idx[w]], exclude={w}))
for a, b, c in [("king", "man", "woman"), ("prince", "boy", "girl"), ("queen", "woman", "man"), ("man", "king", "princess")]:
    v = [x - y + z for x, y, z in zip(W[idx[a]], W[idx[b]], W[idx[c]])]
    print(f"{a} - {b} + {c} ->", nearest(v, exclude={a, b, c}, n=2))

# ---- Levy & Goldberg: at the optimum, w . c = log( #(w,c) / (k #(w) P_noise(c)) ) ----
pair = collections.Counter()
for s in corpus:
    for i, w in enumerate(s):
        for j in range(max(0, i - window), min(len(s), i + window + 1)):
            if j != i:
                pair[w, s[j]] += 1
tw = collections.Counter()
for (w, c), n in pair.items():
    tw[w] += n
Z = sum(noise)
xs, ys = [], []
for (w, c), n in pair.items():
    if n >= 20:
        xs.append(math.log(n / (k * tw[w] * noise[idx[c]] / Z)))
        ys.append(sum(a * b for a, b in zip(W[idx[w]], C[idx[c]])))
mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
r = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / math.sqrt(
    sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
print(f"{len(xs)} pairs seen >= 20 times: correlation {r:.3f}, mean shifted PMI {mx:.2f}, mean dot {my:.2f}")
```

```text
18000 tokens, 34 types
king -> [('queen', 0.579), ('man', 0.568), ('prince', 0.545)]
girl -> [('woman', 0.597), ('princess', 0.588), ('boy', 0.542)]
crown -> [('palace', 0.962), ('court', 0.957), ('throne', 0.955)]
she -> [('hers', 0.98), ('her', 0.977), ('he', 0.223)]
king - man + woman -> [('queen', 0.979), ('princess', 0.587)]
prince - boy + girl -> [('princess', 0.945), ('queen', 0.597)]
queen - woman + man -> [('king', 0.98), ('prince', 0.551)]
man - king + princess -> [('girl', 0.982), ('woman', 0.619)]
794 pairs seen >= 20 times: correlation 0.777, mean shifted PMI -1.36, mean dot -1.40
```

模型从未被告知性别、身份或年龄，但它的向量把这些编码了下来。*crown* 离其他王室语境词最近，*she* 离其他阴性代词最近。人物词彼此都相当相似（它们共享填充语境，并与若干别的词共享三个属性中的两个），而每个词离它最近的都是与它只在一个属性上不同的词。向量运算找回了隐藏结构：*king* $-$ *man* $+$ *woman* 离 *queen* 最近；而 *man* $-$ *king* $+$ *princess*——去掉"王室成年男性"、加上"王室年轻女性"——落在 *girl* 上。最后一行是在检验一个定理，我们现在就来谈它。

## SGNS 分解平移后的 PMI 矩阵 {#sec-levy-goldberg}

::: theorem SGNS 与 PMI（Levy 与 Goldberg，2014）{#thm-sgns-pmi}
考虑 SGNS 目标在一个语料上的期望$\sum_{(w, c)}\#(w, c)\,\log\sigma(\mathbf{w}\cdot\mathbf{c}) + k\sum_w\#(w)\,\E_{c_N\sim P_n}\big[\log\sigma(-\mathbf{w}\cdot\mathbf{c}_N)\big]$，并设维数足够大，使得每个内积$x_{wc} = \mathbf{w}\cdot\mathbf{c}$都可以独立选取。则使目标取最大值的解为

$$
x_{wc} = \log\frac{\#(w, c)}{k\,\#(w)\,P_n(c)}\quad\text{对每个满足 }\#(w, c) > 0\text{ 的词对}.
$$ {#eq-shifted-pmi}

当$P_n$取一元语境分布$\#(c)/D$时，这就是$x_{wc} = \operatorname{PMI}(w, c) - \log k$：目标矩阵与语境矩阵$W$和$C$分解了平移$\log k$之后的 PMI 矩阵，$WC\T = M^{\text{PMI}} - \log k$。
:::

::: proof
展开期望，目标中与一个词对$(w, c)$相关的项是

$$
\ell_{wc}(x) = \#(w, c)\log\sigma(x) + k\,\#(w)\,P_n(c)\log\sigma(-x),\qquad x = x_{wc},
$$

这是因为：对以$w$为目标词的$\#(w)$个词对中的每一个，在$k$次抽取的每一抽中，$c$都以概率$P_n(c)$被抽为$w$的负样本。记$A = \#(w, c) > 0$、$B = k\,\#(w)\,P_n(c) > 0$。利用$\frac{d}{dx}\log\sigma(x) = 1 - \sigma(x) = \sigma(-x)$与$\frac{d}{dx}\log\sigma(-x) = -\sigma(x)$，

$$
\ell_{wc}'(x) = A\,\sigma(-x) - B\,\sigma(x) = \frac{A - Be^{x}}{1 + e^{x}},
$$

该式在$e^{x} < A/B$时为正、在$e^{x} > A/B$时为负。于是$\ell_{wc}$恰在$x = \log(A/B)$处取最大值，此即[[#eq-shifted-pmi]]。在假设之下，每个$x_{wc}$都可以各自取到自己的最优值，所以这就使整个目标最大。取$P_n(c) = \#(c)/D$时，$\log\frac{A}{B} = \log\frac{\#(w, c)\,D}{\#(w)\,\#(c)} - \log k = \operatorname{PMI}(w, c) - \log k$。
:::

这一假设从来不会被精确满足——$d$只有几百，而 PMI 矩阵的秩以万计，且$\#(w, c) = 0$的词对会要求$x_{wc} = -\infty$——所以更贴切的说法是：SGNS 是平移 PMI 的一个*加权、低秩*分解，其权重强调高频词对。清单最后一行在合成语料上检验了定理：对至少出现$20$次的$794$个词对，学到的内积与[[#eq-shifted-pmi]]右端的关联度为$0.777$（右端用同样的平滑噪声分布计算），二者的均值也一致（$-1.40$ 对 $-1.36$）。剩下的差距，在$d = 16$、词表只有$34$个词的情形下，可由低秩约束与随机训练来解释。

::: widget plot
f: A*log(1/(1+exp(-x))) + B*log(1/(1+exp(x)))
x: -4, 6
sliders: A=30:1:100:1; B=10:1:100:1
labels: $\ell_{wc}(x) = A\log\sigma(x) + B\log\sigma(-x)$
caption: 单个词对的 SGNS 目标作为内积 $x = \mathbf{w}\cdot\mathbf{c}$ 的函数，其中 $A = \#(w, c)$ 为真实共现次数，$B = k\,\#(w)P_n(c)$ 为期望负样本抽取次数。最大值在 $x = \log(A/B)$ 处——即[[#thm-sgns-pmi]]中的平移 PMI：拖动滑块，峰值便移到 $\log A - \log B$。共现次数高于噪声预测（$A > B$）的词对需要正的内积。
:::

::: example 最优内积 {#ex-sgns-opt}
某目标词出现在$\#(w) = 200$个词对中，其中$\#(w, c) = 30$个的语境是$c$；噪声分布给$c$的概率$P_n(c) = 0.01$；$k = 5$。SGNS 追求的内积是多少？若$c$与$w$只共现过两次呢？
::: solution
$B = k\,\#(w)\,P_n(c) = 5\cdot200\cdot0.01 = 10$，即$w$处$c$的期望负样本抽取次数为$10$。$A = 30$时：$x = \ln(30/10) = \ln3 = 1.10$。$A = 2$时：$x = \ln0.2 = -1.61$；尽管$w$与$c$一同出现过，它们的共现却少于噪声的预测，模型便把两者的向量推开。
:::
:::

**GloVe**（Pennington、Socher 与 Manning，2014）把与矩阵分解的这种联系明确地表达出来。它的出发点是共现概率之比承载着意义——$P(\textit{solid}\mid\textit{ice})/P(\textit{solid}\mid\textit{steam})$很大，$P(\textit{gas}\mid\textit{ice})/P(\textit{gas}\mid\textit{steam})$很小，$P(\textit{water}\mid\cdot)$之比接近$1$——而向量之差应当表示这样的比值，于是就要用内积去拟合对数计数。记$X_{ij}$为共现计数，GloVe 最小化加权最小二乘目标

$$
J = \sum_{i, j:\,X_{ij} > 0}f(X_{ij})\big(\mathbf{w}_i\cdot\tilde{\mathbf{w}}_j + b_i + \tilde b_j - \log X_{ij}\big)^2,\qquad f(x) = \min\big(1, (x/x_{\max})^{\alpha}\big),
$$

论文中取$x_{\max} = 100$、$\alpha = 3/4$。偏置项吸收了$\log\#(w)$与$\log\#(c)$，于是内积建模的是剩下的部分——本质上就是 PMI——而权重$f$压低了罕见、噪声大的词对的权重，并给极高频词对的影响设了上限。只有非零元素会被访问，因此训练开销随不同的共现词对数（而非语料长度）增长。**fastText**（Bojanowski 等，2017）把 skip-gram 推广为：用词的各字符$n$元组的向量之和来表示该词，于是像 *whaleboats* 这样的罕见词和新词也能从自己的片段获得向量——这与[[text-and-language/tokenisation]]中的子词分词器思想相近。

## 嵌入空间的几何 {#sec-geometry}

Mikolov、Yih 与 Zweig（2013）观察到，词与词之间的关系对应着大致恒定的向量偏移：$\mathbf{v}_{\textit{king}} - \mathbf{v}_{\textit{man}} + \mathbf{v}_{\textit{woman}}$接近$\mathbf{v}_{\textit{queen}}$，$\mathbf{v}_{\textit{Paris}} - \mathbf{v}_{\textit{France}} + \mathbf{v}_{\textit{Italy}}$接近$\mathbf{v}_{\textit{Rome}}$。

::: definition 向量偏移类比（3CosAdd）{#def-analogy}
给定类比题"$a$ 之于 $a^*$，正如 $b$ 之于什么？"，**3CosAdd** 的答案是

$$
b^* = \arg\max_{x\in\mathcal{V}\setminus\{a, a^*, b\}}\cos\big(\mathbf{v}_x,\ \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b\big).
$$

对单位向量，它等于$\arg\max_x\big(\cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)\big)$（习题 8）：答案应当与$a^*$和$b$相似、与$a$不相似。
:::

偏移为何会是恒定的？如果 *man* 与 *woman* 之间对每个语境词的 PMI 变化，恰好与 *king* 与 *queen* 之间的变化大致相同——*she*、*her*、*pregnant* 这类语境得分增加，*he*、*his* 得分减少，其余不变——那么 PMI 矩阵的行就满足$M_{\textit{queen}} - M_{\textit{king}}\approx M_{\textit{woman}} - M_{\textit{man}}$，而任何线性分解都保持这一关系。清单中的合成语料正是为使其精确成立而构造的，这就是那里的类比奏效得如此干净的原因；在真实语料中，它只对某些关系近似成立。

::: widget projection
u: 3, 0
v: 1.5, 2
mode: projection
caption: 去掉一个方向。设 $\mathbf{u}$ 是嵌入空间中的一个方向（例如一个估计出的性别方向，如 Bolukbasi 等人的做法），$\mathbf{v}$ 是一个词向量。$\mathbf{v}$ 在 $\mathbf{u}$ 上的投影是这个词沿该方向的分量；正交部分则是对该词做"中性化"之后剩下的部分。拖动两个向量：$\mathbf{v}$ 与 $\mathbf{u}$ 的余弦等于投影长度除以 $\lVert\mathbf{v}\rVert$。
:::

::: warning 类比比看上去弱
那些著名的类比结果依赖于把题目中的三个词从候选答案中排除。若不排除，离$\mathbf{v}_{\textit{king}} - \mathbf{v}_{\textit{man}} + \mathbf{v}_{\textit{woman}}$最近的向量往往就是 *king* 本身，因为偏移相对于向量本身很小；Linzen（2016）以及 Nissim、van Noord 与 van der Goot（2020）表明，许多被报告出来的类比（包括一些被引作偏见证据的）取决于这一取舍，也取决于允许哪些候选。类比的准确率在不同关系类型之间也相差很大：形态关系和地理关系（复数、首都）远好于词汇–语义关系。请把单个引人注目的类比当作轶事，而不是测量。
:::

## 评测嵌入 {#sec-evaluation}

嵌入的评测有**内部评测**——用直接探询向量的任务——和**外部评测**——看使用它们的下游系统的表现（[[text-and-language/text-classification]]）。

- **词相似度。**WordSim-353（Finkelstein 等，2002）和 SimLex-999（Hill、Reichart 与 Korhonen，2015）等数据集给出词对的人工评分；得分是评分与余弦相似度之间的 Spearman 秩相关。SimLex-999 区分相似（*car*、*automobile*）与仅仅相关（*car*、*road*），而基于共现的向量把两者混为一谈。
- **类比。**Mikolov 等（2013）的 Google 类比集包含语义与句法两类共 $19{,}544$ 道题，以 3CosAdd 准确率计分。
- **下游任务。**标注、解析、分类等，把嵌入作为输入特征。

内部与外部得分常常不一致；而 Levy、Goldberg 与 Dagan（2015）发现，超参数——窗口大小、语境分布平滑、下采样、SVD 的加权指数——与在 SVD、SGNS、GloVe 之间的选择同等重要：配置相同时，各方法表现相当。静态嵌入每个词形给一个向量，所以 *bank*（河）与 *bank*（钱）共用一个向量；语言模型给出的语境嵌入（[[sequence-models/contextual-embeddings]]）每个词例给一个向量，作为特征已基本取代静态嵌入（2026 年时），不过静态向量在算力稀缺之处和用于研究语料库时仍然有用。

::: quiz
在[[#thm-sgns-pmi]]的假设下，取一元噪声、$k = 1$，哪些词对会得到负的内积$\mathbf{w}\cdot\mathbf{c}$？
- [ ] 所有满足 $\#(w, c) > 0$ 的词对
- [x] 共现次数低于独立性所预测的词对
- [ ] 涉及 *the* 这类高频词的词对
- [ ] 都没有：训练后向量的内积总是正的
::: solution
$k = 1$时最优值为$\mathbf{w}\cdot\mathbf{c} = \operatorname{PMI}(w, c)$，恰在$P(w, c) < P(w)P(c)$时为负。光看频率决定不了什么：PMI 对此作了校正。（$k > 1$时阈值会移动：只要$\operatorname{PMI} < \log k$，内积就是负的。）
:::
:::

## 嵌入与社会偏见 {#sec-bias}

嵌入编码共现统计量，因而也编码了训练文本中包含的一切联想，包括社会群体与职业或属性之间的联想。有两项研究使这变得可以测量。

Bolukbasi、Chang、Zou、Saligrama 与 Kalai（2016）在一篇题为 *Man is to Computer Programmer as Woman is to Homemaker?* 的论文中，研究了在 Google News 上训练的 word2vec 向量。他们把定义词对（*she* − *he*、*woman* − *man*……）之差的主成分估计为**性别方向**，发现职业词在它上面的投影与众包工作者评出的刻板印象相关，而且由该偏移生成的类比会得出刻板印象词对。他们提出**硬去偏**：把本应性别中立的词沿性别方向的分量去掉（*neutralise*，中性化——即上图中的正交部分），并使定义词对到它们的距离相等（*equalise*，均衡化）。Gonen 与 Goldberg（2019）后来表明，经过这一处理，偏见在很大程度上仍可复原——带性别刻板印象的词仍然聚在一起，并且能从去偏后的向量中被分类出来——所以这种投影只是藏起了联想的一种测量，并没有把它除去。

Caliskan、Bryson 与 Narayanan（2017）把心理学中的内隐联想测试（Implicit Association Test，IAT）改造为**词嵌入关联测试**（Word Embedding Association Test，WEAT）。

::: definition WEAT {#def-weat}
设$X$、$Y$是两个大小相同的**目标**词集，$A$、$B$是两个**属性**词集。对词$w$，令$s(w, A, B) = \operatorname{mean}_{a\in A}\cos(\mathbf{w}, \mathbf{a}) - \operatorname{mean}_{b\in B}\cos(\mathbf{w}, \mathbf{b})$为它与属性的差联想。**效应量**为

$$
d = \frac{\operatorname{mean}_{x\in X}s(x, A, B) - \operatorname{mean}_{y\in Y}s(y, A, B)}{\operatorname{std}_{w\in X\cup Y}s(w, A, B)},
$$

显著性由置换检验评估：把$X\cup Y$重新划分成两个等大小的集合，据此判断。
:::

在网页抓取语料上训练的 GloVe 向量上，Caliskan 等人复现了他们所检验的每一个经典 IAT 结果的方向——花草对昆虫配上令人愉快对令人不快的词、欧洲裔美国人名对非裔美国人名、男性名对女性名配事业词对家庭词等——效应量都很大；他们还发现职业词的性别联想与美国劳动统计中这些职业的女性占比相关。他们的结论是描述性的：文本统计量携带着人所特有的联想，从无害的到偏见的都有，在文本上训练的模型便会习得它们。

::: example 手工计算一个 WEAT 效应量 {#ex-weat}
在二维玩具空间中，设属性集为$A = \{(1, 0)\}$、$B = \{(0, 1)\}$，目标集为$X = \{(3, 1), (2, 1)\}$、$Y = \{(1, 2), (1, 3)\}$。用样本标准差计算效应量。
::: solution
$(3, 1)$与$(1, 0)$的余弦是$3/\sqrt{10} = 0.949$，与$(0, 1)$的余弦是$1/\sqrt{10} = 0.316$，故$s = 0.632$。$(2, 1)$：$s = (2 - 1)/\sqrt5 = 0.447$。由对称性，$(1, 2)$的$s = -0.447$，$(1, 3)$的$s = -0.632$。两组均值之差为$0.540 - (-0.540) = 1.080$。四个值$\pm0.447, \pm0.632$的均值为$0$，样本标准差为$\sqrt{(2\cdot0.2 + 2\cdot0.4)/3} = \sqrt{0.4} = 0.632$，故$d = 1.080/0.632 = 1.707$——按通行惯例属于"大"效应，因为目标点本来就是朝不同属性倾斜摆放的。
:::
:::

这些测量是带有已知局限的描述性工具。结果依赖词表的选取，而词表本身可能有歧义或带有文化特殊性；基于余弦的检验可能对词频敏感；嵌入空间中的联想也不一定在下游系统中转化为同样的行为。要不要以及怎样减轻这类联想取决于应用，众说纷纭；[[llm-society/bias-fairness]]讨论了大语言模型的相关问题。

::: history
Harris 的《分布结构》（*Distributional Structure*，1954）与 Firth 的《语言学理论大纲 1930–1955》（*A Synopsis of Linguistic Theory 1930–1955*，1957）提出了分布假说。Osgood 的语义差异量表（1957）与 Salton 用于信息检索的向量空间模型（1970 年代）用向量表示意义；潜在语义分析（Deerwester、Dumais、Furnas、Landauer 与 Harshman，1990）把 SVD 用于词–文档矩阵；Church 与 Hanks（1990）把 PMI 引入词联想研究。Bengio 等（2003）把词向量作为神经语言模型的一部分来学习；Collobert 与 Weston（2008）为多个 NLP 任务训练词向量。Mikolov 及其同事于 2013 年发布 word2vec，带来 CBOW、skip-gram、负采样与类比评测；Pennington、Socher 与 Manning 于 2014 年发表 GloVe；Levy 与 Goldberg 同年证明了与 PMI 的联系。Bojanowski、Grave、Joulin 与 Mikolov 的 fastText（2017）加入了子词信息。Bolukbasi 等（2016）与 Caliskan 等（2017）开创了对嵌入中社会偏见的定量研究。
:::

::: summary
- 分布假说（Harris 1954，Firth 1957）：出现在相似语境中的词有相似的意义。一个词用共现矩阵中它自己那一行来表示，用余弦相似度来比较。
- PMI $= \log\frac{P(w, c)}{P(w)P(c)}$ 度量超出随机的关联；PPMI 截去负值；语境分布平滑（$\alpha = 0.75$）减轻对罕见语境的偏差。截断 SVD 把 PPMI 压缩成稠密向量。
- word2vec 的 SGNS 训练目标向量与语境向量，以分辨观测词对与 $k$ 个噪声词对；每次更新触及 $k + 2$ 个向量。
- Levy 与 Goldberg：维数足够时，SGNS 的最优值是 $\mathbf{w}\cdot\mathbf{c} = \log\frac{\#(w, c)}{k\#(w)P_n(c)}$，一元噪声下即 PMI $-\log k$——基于预测与基于计数的嵌入密切相关。GloVe 用内积加偏置去拟合对数计数。
- 向量偏移能捕捉某些关系（3CosAdd 类比），但结果依赖对题目词的排除，且随关系类型而变。评测要用相似度相关、类比与下游任务；超参数与方法本身同等重要。
- 嵌入编码其训练文本中的联想，包括刻板印象：Bolukbasi 等（2016）测出性别方向并提出基于投影的去偏（Gonen 与 Goldberg 发现这只是表面功夫），Caliskan 等（2017）用 WEAT 复现了 IAT 结果。
:::

## 习题

::: exercise 余弦相似度 {level=1 check="11/sqrt(130)"}
计算共现向量$(2, 1)$与$(5, 1)$的余弦相似度。如果把第二个向量换成$(10, 2)$，结果会变吗？
::: solution
$(2, 1)\cdot(5, 1) = 11$，模长分别为$\sqrt5$与$\sqrt{26}$，余弦为$11/\sqrt{130} = 0.965$。把向量翻倍不改变它的方向，所以$(10, 2)$的余弦相同——频率大一倍、语境分布相同的词，相似度不变。
:::
:::

::: exercise 一个 PMI 值 {level=1 check="log2(400/270)"}
在[[#ex-pmi]]中，以比特为单位计算$\operatorname{PMI}(\textit{dog}, \textit{pet})$。
::: solution
$\operatorname{PMI} = \log_2\frac{10\cdot40}{15\cdot18} = \log_2\frac{400}{270} = \log_21.481 = 0.567$，与 *dog* 的 PPMI 向量一致。
:::
:::

::: exercise 最优内积 {level=1 check="ln(3)"}
用[[#thm-sgns-pmi]]，求$\#(w, c) = 30$、$\#(w) = 200$、$P_n(c) = 0.01$、$k = 5$时最优的$\mathbf{w}\cdot\mathbf{c}$，以纳特（nats）为单位。
::: solution
$\ln\frac{30}{5\cdot200\cdot0.01} = \ln3 = 1.099$，与[[#ex-sgns-opt]]相同。
:::
:::

::: exercise 大型嵌入表的参数 {level=2 check="3e6*300"}
Mikolov 等（2013）随论文发布的 word2vec 向量在 Google News 上训练，覆盖$3$百万个词和短语，$d = 300$。目标矩阵包含多少个数？用 32 位浮点数表示占多少字节？训练还需要语境矩阵：两个矩阵一共占多少内存？
::: solution
$3\times10^{6}\times300 = 9\times10^{8}$个数，float32 下$3.6\times10^{9}$字节（$3.6$ GB）。加上语境矩阵共$7.2$ GB。语境矩阵通常在训练后丢弃。
:::
:::

::: exercise SGNS 的梯度 {level=2}
对[[#eq-sgns]]分别关于$\mathbf{w}$、$\mathbf{c}$和每个$\mathbf{c}_i$求梯度，并对照代码清单中的更新行逐一验证。
::: solution
利用$\frac{d}{dx}\log\sigma(x) = 1 - \sigma(x)$、$\frac{d}{dx}\log\sigma(-x) = -\sigma(x)$以及穿过$x = \mathbf{w}\cdot\mathbf{c}$的链式法则（它关于$\mathbf{w}$的梯度是$\mathbf{c}$，关于$\mathbf{c}$的梯度是$\mathbf{w}$）：$\partial\ell/\partial\mathbf{c} = (1 - \sigma(\mathbf{w}\cdot\mathbf{c}))\mathbf{w}$，$\partial\ell/\partial\mathbf{c}_i = -\sigma(\mathbf{w}\cdot\mathbf{c}_i)\mathbf{w}$，以及$\partial\ell/\partial\mathbf{w} = (1 - \sigma(\mathbf{w}\cdot\mathbf{c}))\mathbf{c} - \sum_i\sigma(\mathbf{w}\cdot\mathbf{c}_i)\mathbf{c}_i$。代码清单中，`label - sigmoid(...)`对正词对是$1 - \sigma$，对负词对是$0 - \sigma$；`g`是该值乘以学习率；每个语境向量按`g * W[wi]`移动，目标向量的更新则累积`g * C[c]`（用的是该语境向量被自己更新之前的值），最后一次性施加。
:::
:::

::: exercise 中性化一个向量 {level=2 check="sqrt(5)"}
设单位向量$\mathbf{g} = (1, 0, 0)$是一个偏见方向，$\mathbf{v} = (2, 1, 2)$是一个词向量。计算中性化后的向量$\mathbf{v} - (\mathbf{v}\cdot\mathbf{g})\mathbf{g}$及其长度，以及$\mathbf{v}$与$\mathbf{g}$的夹角余弦在中性化前后各是多少。
::: solution
$\mathbf{v}\cdot\mathbf{g} = 2$，故中性化向量为$(0, 1, 2)$，长度为$\sqrt5 = 2.236$。之前$\cos(\mathbf{v}, \mathbf{g}) = 2/3$；之后为$0$。向量比原来短了，所以实现通常会随后把它重新归一化为单位长度。
:::
:::

::: exercise WEAT 统计量 {level=2 check="(3/sqrt(10)-1/sqrt(10)+2/sqrt(5)-1/sqrt(5))*2"}
Caliskan 等人的检验统计量是$S = \sum_{x\in X}s(x, A, B) - \sum_{y\in Y}s(y, A, B)$。计算[[#ex-weat]]中的$S$，并解释为什么用置换检验而不是正态近似来判断显著性。
::: solution
$S = (0.632 + 0.447) - (-0.447 - 0.632) = 2.159$，等价于$2\big(\tfrac{2}{\sqrt{10}} + \tfrac{1}{\sqrt5}\big)$。词集很小（常常只有$8$–$25$个词），且$s(w, A, B)$的值不是来自已知分布的独立抽样，所以零分布通过对$X\cup Y$的每一种（或许多随机一种）等大小重新划分重新计算$S$得到；$p$值是不少于观测$S$的比例。这里只有$4$个词，一共只有$\binom42 = 6$种划分，单侧$p$值最小只能是$1/6$——集合这样小，检验永远不可能显著。
:::
:::

::: exercise 单位向量的 3CosAdd {level=3}
证明对单位向量而言，在$\mathbf{v}_x$上最大化$\cos(\mathbf{v}_x, \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b)$等价于最大化$\cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)$。这说明某一项相似度过大时会怎样左右答案？Levy 与 Goldberg 提出了什么替代方案？
::: solution
由$\norm{\mathbf{v}_x} = 1$，对固定的目标向量$\mathbf{t} = \mathbf{v}_{a^*} - \mathbf{v}_a + \mathbf{v}_b$有$\cos(\mathbf{v}_x, \mathbf{t}) = \mathbf{v}_x\cdot\mathbf{t}/\norm{\mathbf{t}}$；因子$1/\norm{\mathbf{t}}$不依赖$x$，且因为全是单位向量，$\mathbf{v}_x\cdot\mathbf{t} = \cos(\mathbf{v}_x, \mathbf{v}_{a^*}) - \cos(\mathbf{v}_x, \mathbf{v}_a) + \cos(\mathbf{v}_x, \mathbf{v}_b)$。因此答案就是三个相似度的加和组合，一个与$b$（或$a^*$）极像的候选词即使与这层关系毫无关系也可能胜出——这就是必须排除$b$本身的原因。Levy 与 Goldberg（2014，"Linguistic regularities in sparse and explicit word representations"）提出了 **3CosMul**：$\arg\max_x\frac{\cos(\mathbf{v}_x, \mathbf{v}_{a^*})\cos(\mathbf{v}_x, \mathbf{v}_b)}{\cos(\mathbf{v}_x, \mathbf{v}_a) + \varepsilon}$（余弦先平移到$[0, 1]$），以乘法方式平衡各项，提高了准确率。
:::
:::

::: exercise SVD 嵌入保持内积 {level=3}
设$M = U\Sigma V\T$，$W = U_d\Sigma_d$。证明$WW\T = M_dM_d\T$，其中$M_d = U_d\Sigma_dV_d\T$，于是 SVD 嵌入的内积等于$M$的最佳秩$d$近似的行的内积。换成$W = U_d\Sigma_d^{1/2}$会有什么变化？
::: solution
$M_dM_d\T = U_d\Sigma_dV_d\T V_d\Sigma_dU_d\T = U_d\Sigma_d^2U_d\T$，因为$V_d\T V_d = I_d$（列标准正交）；而$WW\T = U_d\Sigma_d\Sigma_dU_d\T$与之相同。所以词$w$的嵌入与所有其他嵌入的内积，和$M_d$的第$w$行与其他行的内积一样——只是坐标从$\lvert\mathcal{C}\rvert$维变成了$d$维。取$W = U_d\Sigma_d^{1/2}$时，$WW\T = U_d\Sigma_dU_d\T$，头部奇异方向的主导地位被削弱；对称地可取$C = V_d\Sigma_d^{1/2}$，使$WC\T = M_d$恰成立——[[#thm-sgns-pmi]]正是以这种形式解读 SGNS 的。
:::
:::

::: exercise PMI 的罕见词偏差 {level=3 check="log2(40/12)"}
证明$\operatorname{PMI}(w, c)\le\min\big(-\log P(w), -\log P(c)\big)$，且当$w$只与$c$共同出现时后一个界取等。以比特为单位验证[[#ex-pmi]]中的$\operatorname{PMI}(\textit{car}, \textit{drive})$恰好达到这个界。
::: solution
$P(w, c)\le P(w)$且$P(w, c)\le P(c)$，故$\frac{P(w, c)}{P(w)P(c)}\le\frac1{P(c)}$且$\le\frac1{P(w)}$；两边取对数即可。若$w$的每次共现都是与$c$，则$P(w, c) = P(w)$，$\operatorname{PMI} = -\log P(c)$。对 *car*，全部$11$次共现都与 *drive*，故$\operatorname{PMI} = -\log_2(12/40) = \log_2(40/12) = 1.737$比特，恰为界。只见过一次的词挨着一个中等罕见的语境出现，得到的 PMI 就与一千次都挨着同一语境出现的词一样大——这正是需要语境分布平滑、需要设最低计数门槛的原因。
:::
:::
