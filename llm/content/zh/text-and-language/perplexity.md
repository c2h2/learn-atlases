语言模型有多好？可以让人们给它的输出打分，或者在下游任务上测试它，后续课程对这两样都有讨论（[[evaluation]]）。但语言模型首先是文本上的一个概率分布，而评测一个分布有一个直接、便宜、客观的办法：给它没见过的文本，度量它给出了多少概率。一个觉得真实文本不出所料的模型，就对产生文本的过程学到了一些东西。这一个数——以每词元比特或纳特计的**交叉熵**、**困惑度**或**每字节比特数**——从 Jelinek 1970 年代的语音识别器到今天大模型的训练曲线，一直是语言建模的主要标尺。

本章为序列定义这些量，证明留出交叉熵从上方界定文本信源的熵（而最直接的样本内估计量偏偏偏向另一侧），说明如何在词元、字符与字节之间换算，以便公平比较使用不同分词器的模型，在《白鲸记》上评测[[text-and-language/ngram-models]]的 $n$ 元模型，并准确地说明香农（Shannon）1951 年那个关于英语熵的著名实验做了什么、发现了什么。信息论的定义——熵、交叉熵、KL散度与吉布斯（Gibbs）不等式——在[[math-for-ml/information-theory]]；这里把它们用到整段文本上。

## 留出文本的似然 {#sec-likelihood}

语言模型 $q$ 由链式法则给文本 $x_1, \dots, x_N$（词元序列，含终止符号）赋予概率：$q(x_{1:N}) = \prod_{t=1}^{N}q(x_t\mid x_{<t})$。任何稍有长度的文本，这个概率都小到天文数字，并且随 $N$ 缩小，所以我们按长度归一、再取对数。

::: definition 模型在文本上的交叉熵与困惑度 {#def-ppl}
模型 $q$ 在文本 $x_{1:N}$ 上的**交叉熵**（平均负对数似然，即**对数损失**）为

$$
\hat H(q; x_{1:N}) = -\frac1N\sum_{t=1}^{N}\log_2q(x_t\mid x_{<t})\quad\text{（每词元比特数）},
$$ {#eq-ce}

其**困惑度**为

$$
\operatorname{PPL}(q; x_{1:N}) = 2^{\hat H(q;\,x_{1:N})} = q(x_{1:N})^{-1/N} = \Big(\prod_{t=1}^{N}\frac{1}{q(x_t\mid x_{<t})}\Big)^{1/N}.
$$ {#eq-ppl}

改用自然对数时，交叉熵以纳特每词元计，且 $\operatorname{PPL} = e^{\hat H}$；困惑度在两种单位下相同。文本必须是**留出的**：不能用于拟合模型，也不能用于选择其超参数。
:::

困惑度有三种有用的解读。它是模型分给实际出现的那些词元的概率的**几何平均**的倒数。它是一个**有效分支因子**：一个模型若每一步都把概率均摊在 $K$ 个候选词元上（其中恰有一个正确），其困惑度恰为 $K$。还因为它是交叉熵的指数，损失上的常数级改进就是困惑度上的常数倍因子：每词元少 $0.1$ 比特，在任何水平上都对应困惑度低 $7\%$。

::: example 手工计算困惑度 {#ex-ppl-hand}
一个模型给留出文本的四个词元分别赋予概率 $\tfrac12$、$\tfrac14$、$\tfrac18$ 与 $\tfrac1{16}$。计算其交叉熵（比特与纳特）和困惑度。一个在 $9{,}243$ 个词元的词表上均匀的模型，困惑度是多少？
::: solution
意外度（surprisal）依次是 $1, 2, 3, 4$ 比特，于是 $\hat H = (1 + 2 + 3 + 4)/4 = 2.5$ 比特每词元，即 $2.5\ln2 = 1.733$ 纳特。困惑度是 $2^{2.5} = 5.66$，等价地 $(2\cdot4\cdot8\cdot16)^{1/4} = 1024^{1/4} = 5.66$。均匀模型给每个词元的概率都是 $1/9{,}243$，所以它的交叉熵是 $\log_29{,}243 = 13.17$ 比特、困惑度 $9{,}243$：一无所知时的困惑度就是词表大小。
:::
:::

## 交叉熵度量什么 {#sec-bound}

留出文本上的交叉熵低，为什么就意味着模型好？假设文本由某个随机信源 $P$ 产生——序列上的一个分布，我们并不知道它——模型是 $Q$。对数损失的期望恰如单步情形那样精确分解。

::: theorem 交叉熵界定信源的熵 {#thm-ce-bound}
设 $X_{1:N}$ 服从长度 $N$ 序列上的分布 $P$，$Q$ 是这类序列的任一模型（$Q(x_{1:N}) = \prod_tQ(x_t\mid x_{<t})$）。则

$$
\E_P\Big[-\frac1N\log Q(X_{1:N})\Big] = \frac1N\sum_{t=1}^{N}\E_P\big[-\log Q(X_t\mid X_{<t})\big] = \frac1NH(X_{1:N}) + \frac1N\operatorname{KL}(P\,\Vert\,Q)\ \ge\ \frac1NH(X_{1:N}),
$$

等号成立当且仅当 $Q = P$。此外 $\frac1NH(X_{1:N}) = \frac1N\sum_tH(X_t\mid X_{<t})$，即下一词元给定过去的平均条件熵。
:::

::: proof
第一个等号是链式法则 $\log Q(x_{1:N}) = \sum_t\log Q(x_t\mid x_{<t})$ 与期望的线性性。第二个等号：$-\log Q(x_{1:N}) = -\log P(x_{1:N}) + \log\frac{P(x_{1:N})}{Q(x_{1:N})}$；在 $P$ 下取期望得 $H(X_{1:N}) + \operatorname{KL}(P\,\Vert\,Q)$，其中两者都是对整条序列的联合分布而言。由吉布斯不等式，散度非负，且仅在 $Q = P$ 时为零。最后一句是熵的链式法则 $H(X_{1:N}) = \sum_tH(X_t\mid X_{<t})$，由对 $-\log P(x_{1:N}) = -\sum_t\log P(x_t\mid x_{<t})$ 取期望得到。
:::

::: example 分解的数值演示 {#ex-decomposition}
一个信源独立地发出词元，*a* 的概率为 $0.75$、*b* 的概率为 $0.25$。一个模型不管历史如何，每一步都给两者各 $\tfrac12$ 的预测。计算模型的期望每词元交叉熵、信源的每词元熵以及两者的散度（比特）。
::: solution
模型对每个词元的意外度都是 $1$ 比特，所以它的期望交叉熵是每词元 $1$ 比特。对独立词元，$H(X_{1:N}) = NH(X_1)$，其中 $H(X_1) = -0.75\log_20.75 - 0.25\log_20.25 = 0.811$ 比特。每词元散度为 $0.75\log_2\frac{0.75}{0.5} + 0.25\log_2\frac{0.25}{0.5} = 0.439 - 0.25 = 0.189$ 比特，而确实 $0.811 + 0.189 = 1$。在这个信源上，没有模型能平均低于每词元 $0.811$ 比特；均匀模型浪费了 $0.189$。它的困惑度是 $2$，而信源自己的困惑度是 $2^{0.811} = 1.75$。
:::
:::

于是模型的期望交叉熵等于信源的每词元熵，再加上模型失配的罚金，而任何模型都跑不赢信源本身。对长文本，观测到的交叉熵接近其期望：若信源**平稳且遍历**——统计性质不随时间改变，一段长样本具有代表性——那么香农–麦克米伦–Breiman 定理及其对交叉熵的推广（Algoet 与 Cover，1988；见 Cover 与 Thomas 第 16 章）说，对性质良好的模型 $Q$，$-\frac1N\log Q(X_{1:N})$ 以概率 $1$ 收敛到一个极限，该极限至少是**熵率** $\lim_N\frac1NH(X_{1:N})$。自然文本既不严格平稳也不严格遍历，这些结果刻画的是一个理想化；但它们为实践正了名：**留出交叉熵估计的是文本信源熵的一个上界，降低它就是离信源更近。**

这个界需要文本是留出的。拿模型自己的训练文本去评测它，不等式可能严重不成立，因为模型背下了样本而不是学到了信源。甚至连对熵最直接的估计量——计算样本经验分布的熵——也是有偏的。

::: proposition 代入式熵估计向下偏 {#prop-plugin}
设 $\hat p$ 是从有限集上的分布 $p$ 独立抽 $n$ 次得到的经验分布，则 $\E[H(\hat p)]\le H(p)$，且除非 $p$ 是单点分布，不等式严格。
:::

::: proof
每个 $\hat p(x)$ 都是期望为 $p(x)$ 的指示变量之和的平均，所以作为向量有 $\E[\hat p] = p$。熵是分布的凹函数：$H(\lambda p_1 + (1 - \lambda)p_2)\ge\lambda H(p_1) + (1 - \lambda)H(p_2)$，因为 $-t\log t$ 关于 $t$ 凹，而 $H$ 正是这类项之和。对凹函数用琴生（Jensen）不等式得 $\E[H(\hat p)]\le H(\E\hat p) = H(p)$。$-t\log t$ 严格凹，所以取等要求 $\hat p$ 几乎必然为常数，而这只有当 $p$ 是单点分布时才会发生。
:::

偏偏在语言所在的地方——长尾——这个偏最严重。对一个有数百万种可能 $n$ 元组的 $n$ 元分布，样本至多把大多数 $n$ 元组见到一次，经验分布于是显得比信源可预测得多。

## 《白鲸记》的字母：样本内与留出 {#sec-letters}

香农（1951）定义了 $F_N$——一个字母在给定它前面 $N - 1$ 个字母时的条件熵——并用已发表的字母、二元组与三元组频率表估计它。下面是《白鲸记》（Project Gutenberg 电子书 #2701）的同样这些量，文本已归约为香农那个由 $26$ 个字母加空格组成的 $27$ 符号字母表。样本内估计就是在整本书上用作代入式 $F_N = H(N\text{ 元组}) - H((N - 1)\text{ 元组})$：

```python
import re, math, collections, gzip, bz2, lzma

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]

# Shannon's 27-symbol alphabet: 26 letters and the space
s = re.sub(r"[^a-z]+", " ", text.lower()).strip()
print(len(s), "symbols;", len(set(s)), "distinct")

def block_entropy(s, n):                    # H of the empirical distribution of n-grams, in bits
    if n == 0:
        return 0.0
    c = collections.Counter(s[i:i + n] for i in range(len(s) - n + 1))
    tot = sum(c.values())
    return -sum(k / tot * math.log2(k / tot) for k in c.values())

print(f"F_0 = log2 27 = {math.log2(27):.2f}")
for n in range(1, 8):                       # F_n = H(n-grams) - H((n-1)-grams): next letter given n-1
    print(f"F_{n} = {block_entropy(s, n) - block_entropy(s, n - 1):.2f} bits/letter")

data = text.encode("utf-8")                 # general-purpose compressors on the full text
for name, f in [("gzip", gzip.compress), ("bz2", bz2.compress), ("lzma", lzma.compress)]:
    print(f"{name:<5} {8 * len(f(data)) / len(data):.2f} bits/byte")
```

```text
1174222 symbols; 27 distinct
F_0 = log2 27 = 4.75
F_1 = 4.09 bits/letter
F_2 = 3.32 bits/letter
F_3 = 2.72 bits/letter
F_4 = 2.18 bits/letter
F_5 = 1.82 bits/letter
F_6 = 1.53 bits/letter
F_7 = 1.25 bits/letter
gzip  3.24 bits/byte
bz2   2.48 bits/byte
lzma  2.65 bits/byte
```

$F_1 = 4.09$ 与 $F_2 = 3.32$ 同香农为他的 $27$ 字母表所得的 $4.03$ 与 $3.32$ 吻合得很好。但一路稳降到 $N = 7$ 时的 $1.25$ 比特，有一部分正是[[#prop-plugin]]造成的假象：$27^6\approx3.9\times10^{8}$ 种可能的六字母语境对大约一百万个字母来说，多数长语境只被见到一次或几次，而只见过一次的语境"预测"它的下一个字母是完美的。现在改在书的前 $90\%$ 上训练平滑的字母 $n$ 元模型，并在最后 $10\%$ 上测交叉熵：

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
s = re.sub(r"[^a-z]+", " ", text.lower()).strip()      # 27 symbols
cut = int(0.9 * len(s))
train, test = s[:cut], s[cut:]
k = 0.1                                                 # add-k smoothing over 27 symbols

for n in range(1, 9):                                   # order n: predict a letter from n-1 before it
    ctx = collections.Counter(train[i:i + n - 1] for i in range(len(train) - n + 1))
    full = collections.Counter(train[i:i + n] for i in range(len(train) - n + 1))
    bits = 0.0
    for i in range(n - 1, len(test)):
        h, g = test[i - n + 1:i], test[i - n + 1:i + 1]
        bits -= math.log2((full[g] + k) / (ctx[h] + 27 * k))
    print(f"n = {n}: held-out {bits / (len(test) - n + 1):.3f} bits/letter")
```

```text
n = 1: held-out 4.077 bits/letter
n = 2: held-out 3.299 bits/letter
n = 3: held-out 2.708 bits/letter
n = 4: held-out 2.224 bits/letter
n = 5: held-out 2.041 bits/letter
n = 6: held-out 2.136 bits/letter
n = 7: held-out 2.428 bits/letter
n = 8: held-out 2.815 bits/letter
```

短语境下，留出与样本内的数字彼此一致；长语境下两者分道扬镳。留出交叉熵在 $n = 5$ 处最低，为每字母 $2.04$ 比特，随后开始*上升*：在一百万个字母里，更长的语境被见到的次数太少，加 $k$ 估计靠不住，模型过拟合了。只有留出的数字才是[[#thm-ce-bound]]意义下诚实的上界。（通用的压缩器在含大写与标点的完整 UTF-8 文本上达到每字节 $2.5$–$3.2$ 比特；压缩器就是一个边读边建模的预测器，而且配上算术编码，任何预测模型都是压缩器——[[math-for-ml/information-theory]]。）

::: widget regression
points: 1,4.077; 2,3.299; 3,2.708; 4,2.224; 5,2.041; 6,2.136; 7,2.428; 8,2.815
degree: 2
x: 0, 9
y: 1, 4.5
caption: 《白鲸记》上加 $0.1$ 平滑的字母 $n$ 元模型的留出交叉熵（每字母比特数）随阶数 $n$ 的变化，数据来自上面的清单；作为参考拟合了一条二次曲线。更长的语境大约帮助到 $n = 5$，之后计数太稀疏，留出损失转而上升，而样本内估计仍在一路下降（$n = 7$ 时到 $1.25$ 比特）。更好的平滑（内插 Kneser–Ney）会把最低点压得更低、推得更靠右，但这种"语境与数据相互牵制"的形状是普遍规律。
:::

::: warning 样本内的数字只会给模型贴金
模型在训练它所用的数据上、或在用于调其超参数的数据上的损失，不是关于信源的任何东西的估计；它奖励的是记忆。要报告在训练与调参中完全未参与的文本上的留出交叉熵——并且核实它真的未参与：一段也出现在网络规模训练语料里的测试文本（一段引文、一份许可证、一部名著）实际上就是样本内。这个问题叫**数据污染**（contamination），是[[evaluation/contamination]]的主题。
:::

## 评测 $n$ 元模型 {#sec-eval-ngrams}

[[text-and-language/ngram-models]]的词级模型可以用同样的方式比较。这里需要一个封闭词表：训练中见过至少两次的词形全部保留，其余全部变成 `<unk>`，测试文本也施以同一映射。

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
cut = int(0.9 * len(tokens))
train, test = tokens[:cut], tokens[cut:]

# closed vocabulary: training types seen at least twice; everything else becomes <unk>
freq = collections.Counter(train)
vocab = {w for w, c in freq.items() if c >= 2} | {"<unk>"}
unk = lambda seq: [w if w in vocab else "<unk>" for w in seq]
chars = sum(len(w) + 1 for w in test)                             # test text joined by spaces
train, test = unk(train), unk(test)
V = len(vocab)
print(f"V = {V}, test tokens = {len(test)}, test <unk> rate = {test.count('<unk>') / len(test):.1%}")

uni = collections.Counter(train)
big = collections.Counter(zip(train, train[1:]))
tri = collections.Counter(zip(train, train[1:], train[2:]))
hist1 = collections.Counter(train[:-1])
hist2 = collections.Counter(zip(train[:-2], train[1:-1]))
d = 0.75

# Kneser-Ney statistics
cont_uni = collections.Counter(w for v, w in big)                 # N1+(. w)
n_bigram_types = len(big)
follow1 = collections.Counter(v for v, w in big)                  # N1+(v .)
cont_bi = collections.Counter((v, w) for u, v, w in tri)          # N1+(. v w)
cont_bi_tot = collections.Counter(v for u, v, w in tri)           # N1+(. v .)
cont_bi_follow = collections.Counter(v for (v, w) in cont_bi)     # N1+(v .) among continuation bigrams
follow2 = collections.Counter((u, v) for u, v, w in tri)          # N1+(u v .)

def p_uniform(w, h): return 1 / V
def p_unigram(w, h): return (uni[w] + 1) / (len(train) + V)
def p_add_k(w, h, k=0.01):
    v = h[-1]
    return (big[v, w] + k) / (hist1[v] + k * V)
def p_cont(w): return cont_uni[w] / n_bigram_types if cont_uni[w] else 1 / V
def p_kn2(w, h):
    v = h[-1]
    if hist1[v] == 0: return p_cont(w)
    return max(big[v, w] - d, 0) / hist1[v] + d * follow1[v] / hist1[v] * p_cont(w)
def p_kn2_lower(w, v):                                            # bigram level of the trigram model
    tot = cont_bi_tot[v]
    if tot == 0: return p_cont(w)
    return max(cont_bi[v, w] - d, 0) / tot + d * cont_bi_follow[v] / tot * p_cont(w)
def p_kn3(w, h):
    u, v = h
    if hist2[u, v] == 0: return p_kn2_lower(w, v)
    return (max(tri[u, v, w] - d, 0) / hist2[u, v]
            + d * follow2[u, v] / hist2[u, v] * p_kn2_lower(w, v))

for name, p in [("uniform", p_uniform), ("unigram add-1", p_unigram), ("bigram add-0.01", p_add_k),
                ("bigram Kneser-Ney", p_kn2), ("trigram Kneser-Ney", p_kn3)]:
    bits = -sum(math.log2(p(test[t], tuple(test[t - 2:t]))) for t in range(2, len(test)))
    n = len(test) - 2
    print(f"{name:<20} {bits / n:6.3f} bits/token  perplexity {2 ** (bits / n):8.1f}"
          f"  {bits / chars:5.3f} bits/char")
```

```text
V = 9243, test tokens = 25097, test <unk> rate = 4.9%
uniform              13.174 bits/token  perplexity   9243.0  2.743 bits/char
unigram add-1         8.848 bits/token  perplexity    460.9  1.842 bits/char
bigram add-0.01       8.767 bits/token  perplexity    435.7  1.825 bits/char
bigram Kneser-Ney     7.806 bits/token  perplexity    223.8  1.625 bits/char
trigram Kneser-Ney    7.796 bits/token  perplexity    222.2  1.623 bits/char
```

Kneser–Ney 把加 $k$ 的困惑度减了半，与 Chen 与 Goodman 的比较结果一致。三元模型对二元模型几乎没有改进：训练词元只有 $2\times10^{5}$ 个，测试三元组的 $77\%$ 未曾出现（[[text-and-language/ngram-models#sec-mle]]），三元层往往无事可贡献；在数亿词级的语料库上，三元及更高阶的 Kneser–Ney 模型则明显胜过二元模型。每字符比特数那一列是用同一个总比特除以原始测试文本的字符数（单词之间用单个空格）得到的；它*不是*完整的字符级度量，因为 $4.9\%$ 被映射为 `<unk>` 的测试词只是作为"某个罕见词"被预测的，没有为它们的拼写付出代价。

## 换算单位：词元、字符与字节 {#sec-units}

模型每词元的损失取决于词元是什么。要比较使用不同分词器的模型，需要一个绑定到文本本身的单位。

::: proposition 单位换算 {#prop-units}
设某模型给一段 $N_{\text{tok}}$ 个词元、$N_{\text{char}}$ 个字符、$N_{\text{byte}}$ 个 UTF-8 字节的文本共 $\log_2q = -B$ 比特的对数概率。则

$$
\text{每词元比特数} = \frac{B}{N_{\text{tok}}},\qquad \text{每字节比特数} = \frac{B}{N_{\text{byte}}} = \frac{\text{每词元比特数}}{N_{\text{byte}}/N_{\text{tok}}},\qquad \operatorname{PPL}_{\text{tok}} = 2^{B/N_{\text{tok}}} = \big(2^{B/N_{\text{byte}}}\big)^{N_{\text{byte}}/N_{\text{tok}}},
$$

对字符同理。若用纳特，除以 $\ln2$ 即化为比特。若两个用不同无损分词器的模型给同一段文本相同的概率，则不论各自的每词元损失如何，它们的每字节比特数相同。
:::

::: proof
这些量都是同一个总量 $B$ 除以不同的计数；困惑度恒等式就是 $2^{B/N_{\text{tok}}} = 2^{(B/N_{\text{byte}})\cdot(N_{\text{byte}}/N_{\text{tok}})}$。最后一句成立，是因为 $B$ 只依赖文本的概率，$N_{\text{byte}}$ 只依赖文本本身。
:::

::: example 比较使用不同分词器的模型 {#ex-compare}
模型 A 的分词器平均每词元 $4.2$ 字节，留出损失为每词元 $2.0$ 纳特；模型 B 的分词器平均每词元 $3.4$ 字节，在同一段文本上为每词元 $1.7$ 纳特。哪个模型给文本的概率更高？它们的困惑度各是多少？
::: solution
A：$2.0/\ln2 = 2.885$ 比特每词元，除以 $4.2$：每字节 $0.687$ 比特。B：$1.7/\ln2 = 2.453$ 比特每词元，除以 $3.4$：每字节 $0.721$ 比特。A 给文本的概率更高（$0.687 < 0.721$），尽管它的每词元损失与困惑度都更高（$e^{2.0} = 7.39$ 对 $e^{1.7} = 5.47$）。使用不同分词器的模型，其每词元困惑度不能直接比较。
:::
:::

::: widget plot
f: 2^(b*x)
x: 0.4, 1.6
y: 0, 120
sliders: b=4:1:8:0.1
labels: $\operatorname{PPL}_{\text{tok}} = 2^{b\cdot\text{bpb}}$
caption: 每字节比特数（横轴）给定时，若词元平均 $b$ 字节（滑块），隐含的每词元困惑度。在每字节 $0.8$ 比特处，四字节词元给出困惑度 $2^{3.2} = 9.2$，八字节词元给出 $2^{6.4} = 84$：同样的模型质量，词元更长时按每词元看就差了十倍。每字节比特数才是可比的量。
:::

比较使用不同分词器的语言模型时，首选的单位是**每字节比特数**；它是 Pile 基准（Gao 等，2020）的头条指标，也是字节级与免分词模型研究中的标准单位。字符级基准（如 text8 与 enwik8）常用每字符比特数；对 ASCII 文本，两者重合。还剩两个细微之处。其一，词级模型给一个字符串的概率，是解码出它的所有词元序列的概率之和，但评测只按分词器的规范切分计分，所以报告出的每字节比特数略微高估（习题 9）。其二，只有在同一段文本上、施加同样的规范化、并对文档边界和上下文采取同样的处理方式，比较才公平：一个在固定窗口上、不带任何前文评测的 Transformer，成绩会比用滑动窗口、让每个词元都有长历史评测的差。

::: warning 不可比的困惑度
只有测试文本、分词方式与词表全部相同时，困惑度才可比。一个封闭词表模型只要缩小词表就能降低困惑度：一个词表里只有 `<unk>` 的模型给每个词元概率一，困惑度为 $1$。例如 Penn Treebank 上的词级结果，历来都在其固定的 $10{,}000$ 词词表上报告。词表不同的时候，请换算成每字节比特数，并务必让未知词为其拼写付出代价。
:::

## 香农与英语的熵 {#sec-shannon}

香农的《印刷英语的预测与熵》（*Prediction and Entropy of Printed English*，发表于 Bell System Technical Journal，1951）问的是：英语究竟需要每字母多少比特。它用了两种方法，而它常常被引用错。

第一种方法用统计。从已发表的字母、二元组、三元组频率表以及词频率表出发，香农算出 $27$ 符号字母表（字母加空格）上的 $F_0 = \log_227 = 4.76$、$F_1 = 4.03$、$F_2 = 3.32$、$F_3 = 3.1$ 每字母比特，而由词频率模型得每字母 $2.62$ 比特（每词 $11.82$ 比特、每词 $4.5$ 个字母）。这些就是上一节的条件熵 $F_N$，由大表估计而来。

第二种方法把人当作模型。受试者被呈现一段文字（取自马隆（Dumas Malone）的《弗吉尼亚人杰斐逊》（*Jefferson the Virginian*））的前 $N - 1$ 个字母，并被要求猜下一个字母，猜错就接着猜直到猜对；记录所需的猜测次数，$N$ 取 $1$ 到 $15$ 以及 $N = 100$。既然一个精通语言的人会给可能的下一个字母按其概率排序，猜测次数的分布就能确定熵的界。香农证明：若 $q_i^N$ 是在有 $N - 1$ 个字母的语境下、正确字母恰为第 $i$ 次猜测的频率，则

$$
\sum_{i}i\,\big(q_i^N - q_{i+1}^N\big)\log_2i\ \le\ F_N\ \le\ -\sum_iq_i^N\log_2q_i^N.
$$

上界就是猜测次数分布的熵：给定一个排序方式始终如一的理想预测器，猜测次数决定了字母。在 $100$ 个字母的语境下，实验给出上界约 $1.3$、下界约 $0.6$ 每字母比特。香农自己的总结是：长程统计效应（作用范围可达 $100$ 个字母）把熵"降到每字母一比特左右"，对应大约 $75\%$ 的冗余度。

::: example 由猜字母实验得到的香农界 {#ex-shannon-bounds}
设在某个固定的语境长度下，受试者 $60\%$ 的时间第一次就猜中下一个字母，$20\%$ 第二次，$10\%$ 第三次，$10\%$ 第四次。计算 $F_N$ 的香农上界与下界。
::: solution
上界：猜测次数分布的熵，$-(0.6\log_20.6 + 0.2\log_20.2 + 2\cdot0.1\log_20.1) = 0.442 + 0.464 + 0.664 = 1.571$ 比特。下界，取 $q_5 = 0$：$\sum_ii(q_i - q_{i+1})\log_2i = 1\cdot0.4\cdot0 + 2\cdot0.1\cdot1 + 3\cdot0\cdot\log_23 + 4\cdot0.1\cdot2 = 0.2 + 0.8 = 1.0$ 比特。所以 $1.0\le F_N\le1.571$ 每字母比特。猜测分布有长尾时，两个界相距很远；香农在 $N = 100$ 时得到的 $0.6$–$1.3$ 区间正反映了同样的差距。
:::
:::

三点准确性的说明。这些估计针对的是不含大写、数字与标点的 $27$ 符号字母表，所以它们不是真实文本的每字节比特数。这些界依赖假设——受试者的行为像一个理想的排序器、一本书的少数几段文字具有代表性——而且样本很小。"每字母一比特左右"是一个区间，$0.6$ 到 $1.3$，不是一次测量。后来的工作改进了这一方法：Cover 与 King（1978）让受试者就下一个字母下注，得到每字符约 $1.3$ 比特的估计；Brown 等（1992）用在数亿词上训练的词三元组模型，得到印刷英语每字符 $1.75$ 比特的上界。今天评测大语言模型的方式，本质上仍是同一样东西：在留出的文本上，以每字节比特数计。

::: quiz
一个模型在测试集上报告每词元 $3.2$ 纳特。它的分词器平均每词元 $4$ 字节，文本是 ASCII。哪些说法正确？
- [x] 它的困惑度是 $e^{3.2}\approx24.5$
- [x] 它达到每字符约 $1.15$ 比特
- [ ] 它换算成比特制的困惑度是 $2^{3.2}\approx9.2$
- [ ] 只要另一个模型是每词元 $2.9$ 纳特，它就比那个模型差，不论那个模型的分词器
::: solution
$e^{3.2} = 24.5$；困惑度不依赖单位，算 $2^{3.2}$ 是把纳特和底数 $2$ 混为一谈。化成比特：$3.2/\ln2 = 4.617$ 比特每词元，$4.617/4 = 1.154$ 每字节比特，对 ASCII 而言就等于每字符比特数。另一个模型虽然每词元 $2.9$ 纳特，但每词元只有 $3$ 字节，它是每字节 $2.9/(3\ln2) = 1.39$ 比特，反而更差；每词元的数字跨分词器不可比。
:::
:::

::: history
困惑度由 Jelinek、Mercer、Bahl 与 Baker（1977）在 IBM 提出，用来度量语音识别任务的难度，含义是识别器实际面对的候选词数的有效值；IBM 小组在 1980 年代把留出困惑度变成了语言模型的标准准则。香农（1948）定义了熵，并用英语的 $n$ 元近似 illustrate 这一思想；其 1951 年的论文用统计与人工预测估计了英语的熵；Cover 与 King（1978）以及 Brown 等（1992）接着给出赌博式与模型式的估计。Algoet 与 Cover（1988）证明了与模型交叉熵相关的香农–麦克米伦–Breiman 定理的"三明治"形式。每字符比特数成了源自维基百科的字符级基准（Hutter 奖的 enwik8，2006）上的标准单位；每字节比特数则通行于 Pile（Gao 等，2020）这类混合领域语料库。
:::

::: summary
- 模型在留出文本上的交叉熵是 $-\frac1N\sum_t\log_2q(x_t\mid x_{<t})$ 比特每词元；困惑度是 $2$ 的这个次幂，即实际词元所获概率的几何平均的倒数，一个有效分支因子。均匀模型的困惑度是 $\lvert\mathcal{V}\rvert$。
- 期望交叉熵等于信源的每词元熵加上 $\frac1N\operatorname{KL}(P\,\Vert\,Q)$，所以留出交叉熵估计的是信源熵的一个上界。样本内估计向下偏（代入式熵，由琴生不等式），而且奖励记忆。
- 在《白鲸记》的字母上，平滑字母 $n$ 元模型的留出交叉熵在 $n = 5$ 处最低（每字母 $2.04$ 比特），此后回升，而样本内估计一路下降。在词上，内插 Kneser–Ney 把加 $k$ 的困惑度减半。
- 每词元损失依赖分词器；每字节（或每字符）比特数 $=$ 总比特 $/$ 字节数，跨分词器可比。只有文本、分词与词表全相同时，困惑度才可比。
- 香农（1951）由统计估计出 $F_1 = 4.03$、$F_2 = 3.32$、$F_3 = 3.1$ 每字母比特，由 $100$ 个字母语境下的人工预测得到约 $0.6$–$1.3$ 每字母比特的界——"每字母一比特左右"。
:::

## 习题

::: exercise 三个预测值的困惑度 {level=1 check="4"}
一个模型给文本的三个词元分别赋予概率 $\tfrac12$、$\tfrac14$ 与 $\tfrac18$。它的困惑度是多少？
::: solution
意外度是 $1, 2, 3$ 比特，平均 $2$ 比特，故 $\operatorname{PPL} = 2^2 = 4$；等价地 $(2\cdot4\cdot8)^{1/3} = 64^{1/3} = 4$。
:::
:::

::: exercise 一个均匀模型 {level=1 check="log2(9243)"}
对[[#sec-eval-ngrams]]清单中 $9{,}243$ 词元的词表上的均匀模型，其交叉熵是每词元多少比特？
::: solution
每词元 $\log_29{,}243 = 13.174$ 比特，与打印的一致；困惑度是 $9{,}243$。
:::
:::

::: exercise 比特化纳特 {level=1 check="7.806*ln(2)"}
二元 Kneser–Ney 模型的成绩是每词元 $7.806$ 比特。把它化成每词元纳特，并检验困惑度不变。
::: solution
$7.806\ln2 = 5.411$ 纳特。$e^{5.411} = 223.8 = 2^{7.806}$，与打印的一致。
:::
:::

::: exercise 每字节比特数 {level=2 check="2.2/(3.8*ln(2))"}
一个模型的留出损失是每词元 $2.2$ 纳特，其分词器在测试文本上每词元 $3.8$ 字节。计算它的每字节比特数。
::: solution
$2.2/\ln2 = 3.174$ 比特每词元；除以每词元 $3.8$ 字节，得每字节 $0.835$ 比特。
:::
:::

::: exercise 代入式估计的偏 {level=2 check="0.5"}
一枚均匀硬币抛两次，计算所得经验分布的熵（比特）。它的期望是多少？与真实熵比较。
::: solution
以概率 $\tfrac12$ 两次结果不同，$\hat p = (\tfrac12, \tfrac12)$，熵为 $1$ 比特；以概率 $\tfrac12$ 两次相同，熵为 $0$。期望是 $0.5$ 比特，只有真实值 $1$ 比特的一半——正是[[#prop-plugin]]的向下偏。
:::
:::

::: exercise 香农的词估计 {level=2 check="11.82/4.5"}
香农由词频率估计出每词 $11.82$ 比特，并取平均词长 $4.5$ 个字母。这给出每字母多少比特的估计？结果 $2.62$ 为什么低于 $F_3 = 3.1$？
::: solution
$11.82/4.5 = 2.627$ 每字母比特（香农报告 $2.62$）。词模型预测的是整个词，因此它实际上用到了词内超过两个字母的语境——它知道 *the* 里 *th* 之后通常是 *e*，也知道只有某些字母串才是词——而 $F_3$ 只利用前面两个字母。
:::
:::

::: exercise 混合平均起来不会比成分更差 {level=2}
对两个模型 $q_1$、$q_2$ 与 $\lambda\in[0, 1]$，令 $q = \lambda q_1 + (1 - \lambda)q_2$。证明在任意文本上，$q$ 的交叉熵至多为 $\lambda\hat H(q_1) + (1 - \lambda)\hat H(q_2)$，从而至多为两者中的较大者。用下面清单的 $\lambda$ 表格作演示：在《白鲸记》上对二元与一元模型作插值（前 $80\%$ 训练，接下来 $10\%$ 上选 $\lambda$，最后 $10\%$ 上测试）。

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
a, b = int(0.8 * len(tokens)), int(0.9 * len(tokens))
train, dev, test = tokens[:a], tokens[a:b], tokens[b:]
vocab = {w for w, c in collections.Counter(train).items() if c >= 2} | {"<unk>"}
unk = lambda seq: [w if w in vocab else "<unk>" for w in seq]
train, dev, test = unk(train), unk(dev), unk(test)
V = len(vocab)
uni = collections.Counter(train)
big = collections.Counter(zip(train, train[1:]))
hist = collections.Counter(train[:-1])

def bits_per_token(seq, lam):
    tot = 0.0
    for v, w in zip(seq, seq[1:]):
        p_bi = big[v, w] / hist[v] if hist[v] else 0.0
        p_uni = (uni[w] + 1) / (len(train) + V)
        tot -= math.log2(lam * p_bi + (1 - lam) * p_uni)
    return tot / (len(seq) - 1)

for lam in (0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 0.95):
    print(f"lambda = {lam:.2f}: dev {bits_per_token(dev, lam):.3f} bits/token")
best = min((bits_per_token(dev, l / 20), l / 20) for l in range(20))
print(f"best lambda on dev = {best[1]:.2f}; test {bits_per_token(test, best[1]):.3f} bits/token,"
      f" perplexity {2 ** bits_per_token(test, best[1]):.1f}")
```

```text
lambda = 0.00: dev 8.661 bits/token
lambda = 0.20: dev 8.056 bits/token
lambda = 0.40: dev 7.885 bits/token
lambda = 0.50: dev 7.853 bits/token
lambda = 0.60: dev 7.853 bits/token
lambda = 0.80: dev 7.987 bits/token
lambda = 0.95: dev 8.461 bits/token
best lambda on dev = 0.55; test 7.925 bits/token, perplexity 243.1
```
::: solution
$-\log_2$ 是凸函数，所以对每个词元 $-\log_2\big(\lambda q_1(x_t\mid\cdot) + (1 - \lambda)q_2(x_t\mid\cdot)\big)\le-\lambda\log_2q_1(x_t\mid\cdot) - (1 - \lambda)\log_2q_2(x_t\mid\cdot)$。对词元取平均就得所要证的不等式，而加权平均不超过最大值。混合可以比两个成分都好得多：纯二元极大似然（$\lambda = 1$）因为有未见的二元组而交叉熵无穷大，平滑一元为每词元 $8.661$ 比特，取 $\lambda = 0.55$（在开发集上选定，不在测试集上选）的混合在测试文本上达到每词元 $7.925$ 比特——接近[[#sec-eval-ngrams]]的 Kneser–Ney 二元模型但仍有不及，何况后者还用了更多数据训练。
:::
:::

::: exercise 缩小词表 {level=2}
一个词级模型把词表之外的每个词都映射为 `<unk>`。证明：把映射到 `<unk>` 的词集扩大，就能在不增进模型对语言的了解的情况下降低模型的困惑度；并给出两种能杜绝此事的结果报告方式。
::: solution
把一组词并入 `<unk>`，是把事件"词 $w_1$"、"词 $w_2$"、……换成它们的并，而并的概率不小于其中每一个事件的概率；分给实际词元的概率只会升高，困惑度只会下降。极端地，词表只含 `<unk>` 的模型困惑度为 $1$。补救办法：（1）像标准基准那样，只在词表与 `<unk>` 映射完全相同时比较模型；（2）让模型为未知词付出代价，例如用字符模型把未知词拼写出来，$q(w) = q(\texttt{<unk>})\,q_{\text{char}}(w)$，或者使用开放词表分词器（子词或字节），并报告原文的每字节比特数。
:::
:::

::: exercise 规范分词给出上界 {level=3}
词级模型 $q$ 与一个无损分词器按下式为字符串 $s$ 定义概率：$q(s) = \sum_{\mathbf{t}:\operatorname{dec}(\mathbf{t}) = s}q(\mathbf{t})$，其中含终止符号。证明 $-\log_2q(\operatorname{enc}(s))\ge-\log_2q(s)$，于是由规范编码算出的每字节比特数高估了模型真正的每字节比特数。高估何时为零？
::: solution
规范编码 $\operatorname{enc}(s)$ 是解码为 $s$ 的词元序列之一，而和式中各项非负，所以 $q(s)\ge q(\operatorname{enc}(s))$；取 $-\log_2$ 反向不等号。除以字节长度即得关于每字节比特数的结论。高估恰在模型把概率零分给 $s$ 的每一个非规范切分时为零。训练好的模型在非规范切分上的质量极小，因为它们训练时从未见过这些切分，所以这个差距通常很小；可以用抽样或给和式加界来测量（Cao 与 Rimell，2021 在这种意义上研究过这个差距）。
:::
:::

::: exercise 困惑度与有效分支因子 {level=3}
(a) 证明：若模型每一步都把概率均摊在一个含 $K_t$ 个候选词元、且包含正确词元的集合上，其困惑度就是各 $K_t$ 的几何平均。(b) 证明固定模型在一篇文本上的困惑度从不超过逆概率 $1/q(x_t\mid x_{<t})$ 的算术平均，并给出一个两词元的例子，使两者相差超过 $2$ 倍。
::: solution
(a) 每个正确的词元得到概率 $1/K_t$，故 $\operatorname{PPL} = \big(\prod_tK_t\big)^{1/N}$，即几何平均。(b) 正数的几何平均不超过其算术平均（均值不等式 AM–GM），故 $\operatorname{PPL} = \big(\prod_t1/q_t\big)^{1/N}\le\frac1N\sum_t1/q_t$。取 $q_1 = 1$、$q_2 = 1/100$：$\operatorname{PPL} = \sqrt{100} = 10$，而逆概率的算术平均是 $(1 + 100)/2 = 50.5$。与算术平均相比，困惑度受罕见、被预测得很差的词元支配的程度要轻一些——尽管每个被预测得很差的词元在交叉熵里仍付出它全部的意外度。
:::
:::
