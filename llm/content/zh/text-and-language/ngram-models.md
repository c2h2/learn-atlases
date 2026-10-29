**语言模型（language model）**给每一段文本赋予一个概率。这听起来像个奇怪的目标，但语言技术几乎每一个应用都需要它：语音识别系统要判断听到的是 *recognise speech* 还是 *wreck a nice beach*，翻译系统要在几个输出中选出更流畅的一个，输入法要猜下一个词，大语言模型则靠反复询问哪个词元最可能接在后面来生成文本。本章构造最古老的一族语言模型——**$n$ 元模型（$n$-gram models）**，它用前面的 $n - 1$ 个词，通过计数来估计一个词的概率。

这些模型简单到可以手工训练，而它们的失败也很有教益。计数给一切未见过的东西零概率，而[[text-and-language/text-as-data#prop-hapax]]告诉我们：可能发生的事大多从未被见过。补救办法——**平滑（smoothing）**——让统计语言建模研究了二十年，最终收束于 **Kneser–Ney 平滑**；它的核心思想——正确的回退分布数的是语境，而不是出现次数——将在下文推导。神经语言模型（[[sequence-models]]）用学到的表示取代了计数，但解的是同一个估计问题，本章的词汇、记号与评测方法原样沿用。评测本身——困惑度——是[[text-and-language/perplexity]]的主题。

## 链式法则与句尾 {#sec-chain}

把一个句子看作来自词表 $\mathcal{V}$ 的词元序列 $w_1, \dots, w_T$（这里是词；在现代模型中是子词词元，见[[text-and-language/tokenisation]]）。由概率的链式法则（[[math-for-ml/probability]]），任何联合分布都可以分解为

$$
P(w_1, \dots, w_T) = P(w_1)\,P(w_2\mid w_1)\,P(w_3\mid w_1, w_2)\cdots P(w_T\mid w_1, \dots, w_{T-1}) = \prod_{t=1}^{T}P(w_t\mid w_{<t}).
$$ {#eq-chain}

这是一个恒等式，不是假设；它说的是，文本模型与下一词元预测器是同一回事。有两个细节使它成为*句子*的模型，而不是固定长度序列的模型：起始符号 `<s>` 放在 $w_1$ 之前，使每个词元——包括第一个——都有历史；以及终止符号 `</s>`，句子结束时模型像预测任何其他词元一样预测它。

::: definition 语言模型 {#def-lm}
设 $\mathcal{V}$ 为有限词表，`</s>` $\notin\mathcal{V}$。**（句子级）语言模型**是有限词元序列集合 $\mathcal{V}^*$ 上的一个概率分布 $P$。它通常经由**条件下一词元分布**$\mathcal{V}\cup\{\texttt{</s>}\}$ 上的 $P(\cdot\mid h)$（每个历史 $h\in\mathcal{V}^*$ 一个）给出：

$$
P(w_1, \dots, w_T) = \Big(\prod_{t=1}^{T}P(w_t\mid w_{<t})\Big)\,P(\texttt{</s>}\mid w_{1:T}).
$$ {#eq-lm}
:::

::: proposition 终止符号使其成为分布 {#prop-eos}
给定 $\mathcal{V}\cup\{\texttt{</s>}\}$ 上的条件分布 $P(\cdot\mid h)$，按下面的方式生成句子：从 $P(\cdot\mid\text{已有的词元})$ 中一次抽一个词元，直到抽出 `</s>`。则[[#eq-lm]]中的数就是各个句子的概率，且

$$
\sum_{\mathbf{w}\in\mathcal{V}^*}P(\mathbf{w}) = \Prob(\text{生成在有限次抽取后停止})\le1,
$$

当且仅当生成以概率 $1$ 停止时取等号。若没有终止符号，所有长度、所有序列的乘积[[#eq-chain]]加起来将是无穷大。
:::

::: proof
生成过程恰好产生句子 $\mathbf{w} = w_{1:T}$，当它依次抽出 $w_1, \dots, w_T$ 然后再抽出 `</s>`，按逐次抽取的乘法法则，其概率即[[#eq-lm]]。不同的句子是互斥事件，所以长度不超过 $L$ 的全部句子之和就是生成在 $L + 1$ 次抽取内停止的概率；令 $L\to\infty$ 并用概率的连续性，全和就是生成最终会停止的概率。若没有 `</s>`，固定长度 $T$ 的所有序列的链式法则乘积对每个 $T$ 都求和为 $1$，于是对所有长度求和发散。
:::

这个条件并非空话：一个几乎从不预测 `</s>` 的模型，会把大部分概率放在无限长的"句子"上。对下文基于计数的模型来说，只要训练中见过的每个词都能到达 `</s>`，条件就自动成立（习题 10 计算句子的期望长度）。

## 马尔可夫假设与 $n$ 元模型 {#sec-markov}

对每一种可能的历史都给出一个分布 $P(w_t\mid w_{<t})$ 是无法估计的：真实句子的历史几乎个个都是唯一的。安德烈·马尔可夫（Andrey Markov）的想法——他于 1913 年把它用在普希金（Pushkin）作品的字母上——是忘掉历史中除最近一部分以外的所有内容。

::: definition $n$ 元模型 {#def-ngram}
**$n$ 元组（$n$-gram）**是 $n$ 个连续词元组成的序列。**$n$ 元语言模型**作出阶数为 $n - 1$ 的**马尔可夫假设（Markov assumption）**：

$$
P(w_t\mid w_{<t}) = P(w_t\mid w_{t-n+1:t-1}),
$$

其中句首的历史用 $n - 1$ 个起始符号 `<s>` 补齐。$n = 1, 2, 3$ 的模型分别称为**一元模型（unigram）**、**二元模型（bigram）**与**三元模型（trigram）**。该模型由至多 $\lvert\mathcal{V}\rvert^{n-1}$ 个历史各自对应的、$\mathcal{V}\cup\{\texttt{</s>}\}$ 上的一个分布指定。
:::

二元模型是以词为状态的马尔可夫链，三元模型是以词对为状态的马尔可夫链。这个假设是假的——*the keys to the cabinet …* 中选 *was* 还是 *were* 取决于往前第五个位置的词——采用它，是因为它把一个不可能的估计问题变成了一个只是很难的问题。

## 计数估计 {#sec-mle}

用 $c(\cdot)$ 表示训练语料中的计数：$c(v\,w)$ 是 $w$ 跟在 $v$ 后面的次数，$c(v) = \sum_wc(v\,w)$ 是 $v$ 作为历史出现的次数（`<s>` 计入，`</s>` 不计入）。

::: proposition 极大似然 $n$ 元估计 {#prop-ngram-mle}
在全部二元模型中，训练语料的似然在

$$
P_{\text{MLE}}(w\mid v) = \frac{c(v\,w)}{c(v)}
$$ {#eq-bigram-mle}

处最大，其中 $v$ 取遍所有 $c(v) > 0$ 的历史；对 $n$ 元模型同样有：对每个由 $n - 1$ 个词元组成的历史 $h$，$P_{\text{MLE}}(w\mid h) = c(h\,w)/c(h)$。
:::

::: proof
由[[#eq-lm]]和马尔可夫假设，语料的对数似然是对所有预测位置（包括每个 `</s>`）求和的 $\sum_{t}\log P(w_t\mid w_{t-1})$。按历史归项，

$$
\log L = \sum_v\sum_wc(v\,w)\log P(w\mid v).
$$

不同历史的参数出现在不同的项里，且各自受各自的约束（对每个 $v$ 有 $\sum_wP(w\mid v) = 1$），所以每个历史可以单独优化。固定 $v$，令$\hat p_v(w) = c(v\,w)/c(v)$，则$\sum_wc(v\,w)\log P(w\mid v) = c(v)\sum_w\hat p_v(w)\log P(w\mid v)$，它等于交叉熵$H(\hat p_v, P(\cdot\mid v))$ 的$-c(v)$ 倍。由 Gibbs 不等式（[[math-for-ml/information-theory]]），交叉熵恰在$P(\cdot\mid v) = \hat p_v$ 时最小。更长的历史同理。
:::

::: example 手工训练二元模型 {#ex-bigram}
在四个句子 *the cat sat on the mat*、*the dog sat on the cat*、*the cat ran*、*the dog ran on the mat* 上训练一个二元模型。计算 *the cat sat on the mat*、*the cat ran on the mat*（不在语料中）以及 *the mat ran* 的概率。
::: solution
加上 `<s>` 与 `</s>` 后，历史计数为 $c(\texttt{<s>}) = 4$、$c(\textit{the}) = 7$、$c(\textit{cat}) = 3$、$c(\textit{on}) = 3$，*dog*、*sat*、*ran*、*mat* 各为 $2$。二元计数给出

| 历史 | 下一词元分布 |
|---|---|
| `<s>` | *the* $1$ |
| *the* | *cat* $3/7$，*dog* $2/7$，*mat* $2/7$ |
| *cat* | *sat* $1/3$，*ran* $1/3$，`</s>` $1/3$ |
| *dog* | *sat* $1/2$，*ran* $1/2$ |
| *sat* | *on* $1$ |
| *ran* | *on* $1/2$，`</s>` $1/2$ |
| *on* | *the* $1$ |
| *mat* | `</s>` $1$ |

于是

$$
\begin{aligned}
P(\textit{the cat sat on the mat}) &= 1\cdot\tfrac37\cdot\tfrac13\cdot1\cdot1\cdot\tfrac27\cdot1 = \tfrac{2}{49}\approx0.041,\\
P(\textit{the cat ran on the mat}) &= 1\cdot\tfrac37\cdot\tfrac13\cdot\tfrac12\cdot1\cdot\tfrac27\cdot1 = \tfrac{1}{49}\approx0.020,
\end{aligned}
$$

而 $P(\textit{the mat ran}) = 0$，因为二元组 *mat ran* 从未出现。模型会泛化——把语料中出现过的二元组重新组合，就能给不在语料中的句子分配概率——但凡是含有未见二元组的句子，无论多么合理，它都给零概率。
:::
:::

这个例子中的二元模型是一条马尔可夫链，从它生成文本就是一次随机游走。下图中，`</s>` 有一条指回 *the* 的箭头，使游走能一句接一句地生成。

::: widget markov
matrix: 0,3/7,2/7,2/7,0,0,0,0; 0,0,0,0,1/3,1/3,0,1/3; 0,0,0,0,1/2,1/2,0,0; 0,0,0,0,0,0,0,1; 0,0,0,0,0,0,1,0; 0,0,0,0,0,0,1/2,1/2; 1,0,0,0,0,0,0,0; 1,0,0,0,0,0,0,0
states: the; cat; dog; mat; sat; ran; on; </s>
start: 0
steps: 30
caption: [[#ex-bigram]]的二元模型，视作词上的马尔可夫链（起始符号与`</s>`合并，`</s>`总是转移到 *the*）。一次游走能生成 *the dog ran on the cat* 这样的句子。平稳分布给出生成文本中每个词的长期占比；*the* 是最频繁的状态，正如它在语料库中一样。
:::

在真实语料上，同样的计数产出的文本局部像样、全局却漫无目的。下面是《白鲸记》（*Moby-Dick*，Project Gutenberg 电子书 #2701，同[[text-and-language/text-as-data#sec-zipf]]）的三元模型：把整本书当作一条小写的词与标点流，用前 $90\%$ 训练：

```python
import re, random, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
cut = int(0.9 * len(tokens))
train, test = tokens[:cut], tokens[cut:]
print(len(tokens), "tokens;", len(train), "train,", len(test), "test")

def ngrams(seq, n):
    return [tuple(seq[i:i + n]) for i in range(len(seq) - n + 1)]

for n in (1, 2, 3, 4):
    seen = set(ngrams(train, n))
    t = ngrams(test, n)
    unseen = sum(1 for g in t if g not in seen)
    print(f"n = {n}: {len(seen):>7} distinct in train; {unseen / len(t):.1%} of test {n}-grams unseen")

# a trigram model: for each pair of previous tokens, the list of observed next tokens
nxt = collections.defaultdict(list)
for a, b, c in ngrams(train, 3):
    nxt[a, b].append(c)                # sampling uniformly from this list = sampling from the MLE

rng = random.Random(0)
for start in [("call", "me"), ("the", "whale")]:
    out = list(start)
    while len(out) < 40:
        out.append(rng.choice(nxt[out[-2], out[-1]]))
    print(" ".join(out))
```

```text
250966 tokens; 225869 train, 25097 test
n = 1:   16729 distinct in train; 2.9% of test 1-grams unseen
n = 2:  102851 distinct in train; 35.8% of test 2-grams unseen
n = 3:  185796 distinct in train; 77.2% of test 3-grams unseen
n = 4:  216413 distinct in train; 94.9% of test 4-grams unseen
call me a green simple boy , how few vast as the anak of the spell in which a noah’s flood is not down in his descent , fell into the boats ! luff ! cried stationary elijah , hailing
the whale hunt . he is of a place as any mountain spring , the end . no , thought i , the other like red men , is to be cæsar . was there ever such another bunger in
```

生成文本里每连续三个词元都曾在原书中出现过，结果有梅尔维尔（Melville）的词表和节奏，却没有意义。真正值得受教的是上面打印的计数。测试集中只有 $2.9\%$ 的词是新词，但 $35.8\%$ 的测试二元组、$77.2\%$ 的三元组和 $94.9\%$ 的四元组在训练文本中从未出现。极大似然三元模型把《白鲸记》最后 $10\%$ 的概率置为零，因为它的大部分三元组都未见过——而这已经用了将近二十五万个词元。更多的数据帮助很慢：$\lvert\mathcal{V}\rvert\approx17{,}000$ 时有 $17{,}000^3\approx4.9\times10^{12}$ 个可能的三元组。

::: warning 零不是小概率
一个未见的 $n$ 元组就能让整段测试文本的概率为零、对数似然为 $-\infty$，所以未平滑的极大似然 $n$ 元模型在新文本上的困惑度是无穷大。人们很想把零换成 $10^{-10}$ 这样的小常数；但那样分布就不再归一，模型之间的比较也失去意义（模型只要把常数调大就能"改进"）。下文的每种平滑方法都从已见事件手中拿出概率质量分给未见事件，同时保持每个 $P(\cdot\mid h)$ 仍是一个分布。
:::

## 加 $k$ 平滑 {#sec-addk}

最朴素的补救是假装每个可能的下一词元都比实际多见过 $k$ 次。

::: definition 加 $k$（拉普拉斯）平滑 {#def-addk}
设 $k > 0$，下一词元词表大小为 $V$（含 `</s>`），**加 $k$** 估计为

$$
P_{+k}(w\mid h) = \frac{c(h\,w) + k}{c(h) + kV}.
$$ {#eq-addk}

$k = 1$ 时就是**拉普拉斯的接续规则**（"加一平滑"）。
:::

::: proposition 加 $k$ 是后验均值 {#prop-addk}
固定历史 $h$，设 $\boldsymbol{\theta} = P(\cdot\mid h)$ 未知，在概率单纯形上取对称狄利克雷先验 $\operatorname{Dir}(k, \dots, k)$。给定计数 $c(h\,w)$，后验分布为 $\operatorname{Dir}\big(c(h\,w_1) + k, \dots, c(h\,w_V) + k\big)$，其均值恰为加 $k$ 估计[[#eq-addk]]。
:::

::: proof
狄利克雷密度正比于 $\prod_w\theta_w^{k-1}$，观测到的接续的似然为 $\prod_w\theta_w^{c(h\,w)}$。两者之积 $\prod_w\theta_w^{c(h\,w) + k - 1}$ 正比于上述狄利克雷密度，故那就是后验分布。$\operatorname{Dir}(\alpha_1, \dots, \alpha_V)$ 的均值为 $\alpha_w/\sum_u\alpha_u$；这里 $\sum_u\alpha_u = c(h) + kV$。
:::

这个结论既解释了加 $k$ 的可取之处，也解释了它的弱点。它是有原理依据的，但它的先验是说：在没有数据之前，每个历史后面每个词都等可能——而 $V$ 动辄几万，$kV$ 个伪计数会把除最常见历史以外的真实计数整个淹没。

::: example 加一挪走了多少质量 {#ex-add-one}
在[[#ex-bigram]]中（$V = 8$ 个可能的下一词元），计算 $P_{+1}(\textit{cat}\mid\textit{the})$ 与 $P_{+1}(\textit{sat}\mid\textit{the})$，以及加一分给 *the* 那五个从未见过的接续的总概率。
::: solution
$c(\textit{the}) = 7$，分母为 $7 + 8 = 15$。$P_{+1}(\textit{cat}\mid\textit{the}) = (3 + 1)/15 = 0.267$，低于极大似然的 $3/7 = 0.429$；$P_{+1}(\textit{sat}\mid\textit{the}) = 1/15 = 0.067$。五个未见接续分走 $5/15 = 1/3$ 的概率，而 *the* 出现七次、后面只跟过三个不同的词。换成 $17{,}000$ 个词形的真实词表，一个见过 $7$ 次的历史会把 $17{,}007$ 份中的 $17{,}000 - 3$ 份给未见的词——几乎是全部。
:::
:::

::: widget plot
f: (3+x)/(7+8*x); x/(7+8*x)
x: 0, 2
y: 0, 0.5
labels: $P_{+k}(\text{cat}\mid\text{the})$, seen 3 times; $P_{+k}(\text{sat}\mid\text{the})$, unseen
caption: 玩具语料上的加 $k$ 平滑估计随 $k$（横轴）的变化。$k = 0$ 时即极大似然（$3/7$ 与 $0$）；$k$ 增大时，每个接续都趋向均匀的 $1/8$。对语言而言，小的 $k$（例如 $0.01$–$0.1$）在留出数据上调优后远比 $k = 1$ 好用，但没有一个统一的 $k$ 能同时适合高频与低频的历史。
:::

**Good–Turing 估计**（Good，1953，功劳归于艾伦·图灵）对"未见事件该分走多少质量"给出了更好的答案。其核心估计是：大小为 $N$ 的样本中所有未见事件的总概率约为 $N_1/N$，其中 $N_1$ 是恰好出现过一次的事件词形数——过去新词形的出现率预测未来的出现率。对《白鲸记》的词来说就是 $7{,}650/216{,}625 = 3.5\%$（习题 7）。Good–Turing 把每个计数 $r$ 调整为 $r^* = (r + 1)N_{r+1}/N_r$；它对小的 $r$ 很准，对大的 $r$ 噪声很大（那里 $N_r$ 飘忽不定），曾被用在 Katz（1987）的回退模型内部。

## 回退与插值 {#sec-interpolation}

对未见过的三元组 $u\,v\,w$ 来说，比均匀先验更有信息量的是二元组 $v\,w$，再退一步是一元 $w$。组合各阶次的方式有两种。

- **回退**（back-off；Katz，1987）：使用计数为正的阶次最高的估计，但先打折留出一些质量，把剩下的质量给低一阶的分布（在高阶次未见的那些词上重新归一）。
- **插值**（interpolation；Jelinek 与 Mercer，1980）：始终混合所有阶次，

$$
P_{\text{interp}}(w\mid u\,v) = \lambda_3P_{\text{MLE}}(w\mid u\,v) + \lambda_2P_{\text{MLE}}(w\mid v) + \lambda_1P_{\text{MLE}}(w),\qquad\lambda_1 + \lambda_2 + \lambda_3 = 1,
$$

权重 $\lambda_i\ge0$（可以依赖历史的计数）在留出数据上拟合，例如用 EM。

::: example 插值一个二元模型和一个一元模型 {#ex-interp}
在[[#ex-bigram]]的语料上，用 $\lambda_2 = 0.7$、$\lambda_1 = 0.3$ 插值二元极大似然与一元极大似然。计算 $P(\textit{cat}\mid\textit{the})$ 与 $P(\textit{on}\mid\textit{the})$。
::: solution
一元模型由 $21$ 个词和 $4$ 个终止符号估计，共 $25$ 个被预测的词元；*cat* 与 *on* 各出现 $3$ 次，故 $P_{\text{MLE}}(\textit{cat}) = P_{\text{MLE}}(\textit{on}) = 3/25 = 0.12$。于是

$$
P(\textit{cat}\mid\textit{the}) = 0.7\cdot\tfrac37 + 0.3\cdot0.12 = 0.300 + 0.036 = 0.336,\qquad P(\textit{on}\mid\textit{the}) = 0.7\cdot0 + 0.3\cdot0.12 = 0.036.
$$

未见的二元组 *the on* 如今有概率 $0.036$——对一个在英语里从不跟在 *the* 后面的词来说这相当不少，因为一元模型只知道 *on* 很常见。下面的 Kneser–Ney 在这个微小语料上给它 $0.046$，但在大语料上会系统性地纠正这个问题。
:::
:::

分布的凸组合仍是分布，所以插值不需要重新归一；而一元项保证训练中出现过的每个词在任何语境下都有正概率。剩下的问题是：从观测计数里该拿出多少，以及低阶分布应当是什么。Kneser–Ney 平滑对两者都给出了答案。

## Kneser–Ney 平滑 {#sec-kn}

**绝对折扣**（absolute discounting；Ney、Essen 与 Kneser，1994）从每个正计数中减去固定的$d\in(0, 1]$。动机是经验性的：Church 与 Gale（1991）在一个大语料库的两半上比较二元组计数，发现前半部分见过$r\ge2$次的二元组，在后半部分平均出现约$r - 0.75$次。拿出的质量交给一个低阶分布。Kneser 与 Ney（1995）观察到：通常的一元分布是错误的低阶分布。

他们的例子是 *Francisco*：一个相当常见的词，却几乎总是跟在 *San* 后面。低阶分布只在那个二元组**没有**被见过时才用得上，也就是说，用于 *San* 以外的历史——而在那些语境里，*Francisco* 无论总体多常见都极不可能出现。《白鲸记》里有一个完美的实例：*dick* 出现$83$ 次，每次都跟在 *moby* 后面。低阶该度量的不是$w$ 出现的频率，而是**它出现在多少个不同的语境里**。

::: definition 内插 Kneser–Ney（二元） {#def-kn}
令$N_{1+}(\bullet\,w) = \lvert\{v : c(v\,w) > 0\}\rvert$为先于$w$ 出现的不同词的个数，$N_{1+}(v\,\bullet) = \lvert\{w : c(v\,w) > 0\}\rvert$为跟在$v$ 后面的不同词的个数，$N_{1+}(\bullet\,\bullet)$为不同二元组词形的个数。**接续概率**为

$$
P_{\text{cont}}(w) = \frac{N_{1+}(\bullet\,w)}{N_{1+}(\bullet\,\bullet)},
$$

折扣为$d\in(0, 1]$ 的**内插 Kneser–Ney** 估计为

$$
P_{\text{KN}}(w\mid v) = \frac{\max\big(c(v\,w) - d,\ 0\big)}{c(v)} + \lambda(v)\,P_{\text{cont}}(w),\qquad\lambda(v) = \frac{d\,N_{1+}(v\,\bullet)}{c(v)}.
$$ {#eq-kn}

更高阶时定义是递归的：最高阶像上面那样使用折扣后的计数，每一低阶使用同一个公式，但用**接续计数**$N_{1+}(\bullet\,h\,w)$ 代替计数$c(h\,w)$，一直递推到接续一元分布。
:::

::: proposition Kneser–Ney 是分布 {#prop-kn}
对每个$c(v) > 0$ 的历史$v$ 和每个$d\in(0, 1]$，$P_{\text{KN}}(w\mid v)$ 非负且对$w$ 求和为 $1$。每个满足$N_{1+}(\bullet\,w) > 0$ 的词在任何历史之后都有正概率。
:::

::: proof
非负性是显然的。每个正计数都至少为$1\ge d$，所以$v$ 之后见过的那$N_{1+}(v\,\bullet)$ 个词满足$\max(c(v\,w) - d, 0) = c(v\,w) - d$，其余的词为$0$。于是

$$
\sum_w\frac{\max(c(v\,w) - d, 0)}{c(v)} = \frac{c(v) - d\,N_{1+}(v\,\bullet)}{c(v)} = 1 - \lambda(v).
$$

又因为$\sum_wN_{1+}(\bullet\,w) = N_{1+}(\bullet\,\bullet)$（每个二元组词形恰在它的第二个词处被数一次），$\sum_wP_{\text{cont}}(w) = 1$，第二项贡献$\lambda(v)$。总和为 $1$。最后，$v$ 至少有一个后继，故$\lambda(v) > 0$，于是只要$w$ 至少有一个前身，就有$\lambda(v)P_{\text{cont}}(w) > 0$。
:::

折扣为$v$ 的每个不同接续恰好留出$d$，所以后面跟着许多不同词的历史（*the*）给低阶很大的权重，而总是跟着同一个词的历史（*moby*）几乎不给：$\lambda(v)$ 度量一个历史有多"开放"。

::: example 手工计算 Kneser–Ney {#ex-kn}
在[[#ex-bigram]]的语料上取$d = 0.75$，计算$P_{\text{KN}}(\textit{cat}\mid\textit{the})$ 与$P_{\text{KN}}(\textit{on}\mid\textit{the})$。
::: solution
不同二元组词形共$N_{1+}(\bullet\,\bullet) = 14$ 个（数[[#ex-bigram]]中表格的行：$1 + 3 + 3 + 2 + 1 + 2 + 1 + 1$）。*cat* 只跟在 *the* 后面，故$N_{1+}(\bullet\,\textit{cat}) = 1$，$P_{\text{cont}}(\textit{cat}) = 1/14$；*on* 跟在 *sat* 与 *ran* 后面，故$P_{\text{cont}}(\textit{on}) = 2/14$。*the* 作为历史出现$7$ 次、有$3$ 个不同后继，故$\lambda(\textit{the}) = 0.75\cdot3/7 = 9/28$。于是

$$
P_{\text{KN}}(\textit{cat}\mid\textit{the}) = \frac{3 - 0.75}{7} + \frac{9}{28}\cdot\frac1{14} = \frac{126 + 9}{392} = \frac{135}{392}\approx0.344,
\qquad
P_{\text{KN}}(\textit{on}\mid\textit{the}) = 0 + \frac{9}{28}\cdot\frac{2}{14} = \frac{9}{196}\approx0.046.
$$

未见的 *the on* 拿到了一个小的正概率，而 *cat* 保住了它极大似然值 $0.429$ 的大部分。
:::
:::

在《白鲸记》上，两种低阶分布的差别可以直接看到：

```python
import re, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())

big = collections.Counter(zip(tokens, tokens[1:]))      # c(v w)
hist = collections.Counter(tokens[:-1])                 # c(v) as a history
follow = collections.Counter(v for v, w in big)         # N1+(v .): distinct successors
cont = collections.Counter(w for v, w in big)           # N1+(. w): distinct predecessors
n_types = len(big)                                      # N1+(. .)
d = 0.75
uni = collections.Counter(tokens)
N = len(tokens)

def p_kn(w, v):
    """Interpolated Kneser-Ney bigram probability P(w | v)."""
    lam = d * follow[v] / hist[v]
    return max(big[v, w] - d, 0) / hist[v] + lam * cont[w] / n_types

def p_abs(w, v):
    """Absolute discounting interpolated with the ordinary unigram distribution."""
    lam = d * follow[v] / hist[v]
    return max(big[v, w] - d, 0) / hist[v] + lam * uni[w] / N

for v, w in [("moby", "dick"), ("the", "dick"), ("the", "whale"), ("white", "whale")]:
    print(f"P({w:>5} | {v:>5}):  MLE {big[v, w] / hist[v]:.3e}  abs. disc. {p_abs(w, v):.3e}"
          f"  Kneser-Ney {p_kn(w, v):.3e}")
vocab = set(tokens)
print("sum over w of P_KN(w | the) =", round(sum(p_kn(w, "the") for w in vocab), 10))
```

```text
P( dick |  moby):  MLE 9.765e-01  abs. disc. 9.677e-01  Kneser-Ney 9.676e-01
P( dick |   the):  MLE 0.000e+00  abs. disc. 7.026e-05  Kneser-Ney 1.906e-06
P(whale |   the):  MLE 2.484e-02  abs. disc. 2.572e-02  Kneser-Ney 2.516e-02
P(whale | white):  MLE 3.345e-01  abs. disc. 3.333e-01  Kneser-Ney 3.324e-01
sum over w of P_KN(w | the) = 1.0
```

对见过的二元组，三种估计彼此接近：折扣几乎不动大计数。差别在没见过的二元组上：在 *the* 之后，配一元分布的绝对折扣给 *dick* 的概率比 Kneser–Ney 给的大$37$ 倍，因为 *dick* 很常见——可它恰恰只在 *moby* 之后出现，而那正是低阶分布不会上场的那种语境。Kneser–Ney 按"在$111{,}428$ 个二元组词形里只在一个语境后出现过"来给 *dick* 定概率。

::: intuition 为什么接续计数是对的
内插模型中的低阶分布回答的是这样的问题："在这个确切历史没有告诉我们太多的语境里，接下来什么最可能？"一个词出现在新历史之后的可能性，用它出现在过多少个不同历史之后来预测，比用它的原始频率更好：*whale* 在《白鲸记》里跟在不同词后面共$199$ 次，*dick* 只有一次。Kneser 与 Ney 推导接续分布的方式，是要求平滑后模型的二元边缘分布与观测到的一元频率一致；后来的工作（Teh，2006）表明，内插 Kneser–Ney 是对分层 Pitman–Yor 过程（一种幂律行为与齐普夫定律（Zipf's law）吻合的贝叶斯模型）中的推断的一种近似。
:::

Chen 与 Goodman 的实证研究（1998 年技术报告；1999 年期刊版）在多个语料和训练集规模上、以留出交叉熵为标准比较了当时的各种平滑方法，发现内插 Kneser–Ney 始终最好。他们提出了**修正 Kneser–Ney**：对计数$1$、$2$、$\ge3$ 使用三个折扣$d_1$、$d_2$、$d_{3+}$，由计数之计数$N_1, \dots, N_4$ 估计。直到神经模型接管之前，它都是标准的 $n$ 元方法。在网页规模上，Brants 等（2007）发现，一种不做归一的粗糙方案"笨拙回退"（stupid back-off）在机器翻译上与 Kneser–Ney 一样好——只要训练词数达到万亿：数据足够多时，平滑方法的选择就不太重要了。

::: quiz
在内插 Kneser–Ney 二元模型中，哪种历史给接续分布的权重$\lambda(v)$ 最大？
- [ ] 高频、后面永远跟着同一个词的历史
- [x] 见过几次、每次后面都不同词的历史
- [ ] 见过很多次、但后面只有少数几个不同词的历史
- [ ] 所有历史得到相同的权重$d$
::: solution
$\lambda(v) = d\,N_{1+}(v\,\bullet)/c(v)$。若$v$ 的每次出现后面都跟着不同的词，则$N_{1+}(v\,\bullet) = c(v)$，$\lambda(v) = d$，恰为最大可能值：这个历史没有透露任何偏好的接续，模型便倚仗低阶分布。后面永远跟着同一个词的历史有$\lambda = d/c(v)$，$c(v)$ 大时很小。
:::
:::

## $n$ 元模型做不到的事 {#sec-limits}

即便平滑做到完美，$n$ 元模型仍有两个结构性局限。它的上下文至多$n - 1$ 个词元，而增大$n$ 会让计数更稀疏——上面清单里，$95\%$ 的测试四元组都没见过。它也没有相似性的概念：见过 *the cat sat on the mat*，除通过共享的 $n$ 元组外，它对 *the dog sat on the rug* 一无所知，因为 *cat* 与 *dog* 是互不相干的符号。Bengio 等（2003）针对第二个局限，给每个词学一个向量，用前面各词的向量经神经网络预测下一个词，让相似的词共享统计强度；[[text-and-language/word-embeddings]]研究这类向量，[[sequence-models]]研究去掉固定上下文窗口的网络。不过在 2010 年代中期之前，大型 Kneser–Ney 模型正是生产环境中语音识别与机器翻译所用的语言模型，直到今天（2026 年）它仍是强而廉价的基线，也是数据过滤的有用工具。

::: application 神经模型时代的 $n$ 元统计
$n$ 元计数在现代流程内部存活下来。预训练数据靠比较长 $n$ 元组集合去重（例如借助 MinHash），一些网页数据过滤器用一个在高质量文本上训练的小 Kneser–Ney 模型给文档打分，保留困惑度低的文档（[[pretraining/training-data]]）。基准被训练数据污染的问题，常通过搜寻重叠的$13$ 元组或类似手段来检测（[[evaluation/contamination]]）。而"infini-gram"式的索引（Liu 等，2024）能在数万亿词元上按需计算任意长$n$ 的 $n$ 元组计数，作为分析语言模型见过什么数据的工具。
:::

::: history
马尔可夫（1913）在《叶甫盖尼·奥涅金》（*Eugene Onegin*）前$20{,}000$ 个字母中统计元音–辅音转移，这是马尔可夫链的首次应用。香农（Shannon，1948）用字母与词的 $n$ 元组统计生成"英语近似文本"，又于 1951 年借助人工预测估计英语的熵。古德（Good，1953）发表了他在布莱切利园与图灵一起发展的频率估计。Jelinek 及其 IBM 同事在 1970、80 年代把三元模型建进语音识别，Jelinek 与 Mercer（1980）引入留出权重的插值；Katz（1987）引入回退。Ney、Essen 与 Kneser（1994）提出绝对折扣，Kneser 与 Ney（1995）提出接续分布；Chen 与 Goodman（1998、1999）比较各方法并提出修正 Kneser–Ney。Brants 等（2007）为翻译在两万亿词元的网页文本上训练 $n$ 元模型，Bengio 等（2003）提出神经概率语言模型，开启了向神经方法的转变。
:::

::: summary
- 由链式法则，语言模型就是下一词元预测器；`<s>` 与 `</s>` 使其成为有限句子上的分布——只要生成以概率 $1$ 停止。
- $n$ 元模型以前$n - 1$ 个词元为条件；其极大似然估计是$c(h\,w)/c(h)$，按历史逐个用 Gibbs 不等式证明。
- 计数是稀疏的：在《白鲸记》上，$36\%$ 的测试二元组与$77\%$ 的测试三元组未曾出现，未平滑模型对新文本给零概率。
- 加 $k$ 是狄利克雷先验下的后验均值，但平滑过头；Good–Turing 以$N_1/N$ 估计未见质量；插值与回退组合各阶次。
- 内插 Kneser–Ney 从每个见过的计数中减去折扣$d$，按接续概率$N_{1+}(\bullet\,w)/N_{1+}(\bullet\,\bullet)$——一个词出现在多少语境中——重新分配，且是合法分布。修正 Kneser–Ney 在 Chen 与 Goodman 的比较中是最佳的 $n$ 元方法。
- $n$ 元模型上下文短而固定、没有词相似性的概念，这两点正是神经语言模型消除的局限。
:::

## 习题

::: exercise 一个二元概率 {level=1 check="2/7"}
在[[#ex-bigram]]中，$P_{\text{MLE}}(\textit{dog}\mid\textit{the})$ 是多少？
::: solution
*the* 作为历史出现$7$ 次，其后 *dog* 出现两次：$2/7$。
:::
:::

::: exercise 一个句子概率 {level=1 check="1/14"}
在[[#ex-bigram]]的模型中，计算 *the dog ran* 的二元概率，包含终止符号。
::: solution
$P(\textit{the}\mid\texttt{<s>})P(\textit{dog}\mid\textit{the})P(\textit{ran}\mid\textit{dog})P(\texttt{</s>}\mid\textit{ran}) = 1\cdot\tfrac27\cdot\tfrac12\cdot\tfrac12 = \tfrac1{14}$。
:::
:::

::: exercise 未见二元组的加一平滑 {level=1 check="1/15"}
用加一平滑、$V = 8$ 个可能的下一词元，计算[[#ex-bigram]]语料上的$P_{+1}(\textit{the}\mid\textit{the})$。
::: solution
$c(\textit{the the}) = 0$，$c(\textit{the}) = 7$，故$P_{+1} = (0 + 1)/(7 + 8) = 1/15$。
:::
:::

::: exercise 数一数可能的 $n$ 元组 {level=2 check="17000^3"}
词表有$17{,}000$ 个词形，可能的三元组有多少个？与《白鲸记》训练部分观测到的$185{,}796$ 个不同三元组比较。
::: solution
$17{,}000^3 = 4.913\times10^{12}$。全书只用掉其中约$1.9\times10^{5}$ 个，占比$4\times10^{-8}$。多数可能的三元组不合语法，但即使合理的那些，其数目也远超任何语料所能展示的量。
:::
:::

::: exercise Kneser–Ney 下的未见二元组 {level=2 check="9/196"}
在[[#ex-kn]]中验证$P_{\text{KN}}(\textit{on}\mid\textit{the}) = 9/196$，并计算$P_{\text{KN}}(\texttt{</s>}\mid\textit{on})$。
::: solution
*the on* 未见，只剩插值项：$\lambda(\textit{the})P_{\text{cont}}(\textit{on}) = \tfrac{9}{28}\cdot\tfrac{2}{14} = \tfrac{9}{196}$。再看 *on*：$c(\textit{on}) = 3$，后继只有一个（*the*），故$\lambda(\textit{on}) = 0.75/3 = 1/4$；`</s>` 跟在 *cat*、*mat*、*ran* 后面，故$P_{\text{cont}}(\texttt{</s>}) = 3/14$。于是$P_{\text{KN}}(\texttt{</s>}\mid\textit{on}) = \tfrac14\cdot\tfrac3{14} = \tfrac3{56}\approx0.054$。
:::
:::

::: exercise 加 $k$ 的极限 {level=2}
证明对固定历史$h$，加 $k$ 估计[[#eq-addk]]在$k\to\infty$ 时趋于均匀分布、在$k\to0$ 时趋于极大似然；并证明固定$k$ 时，若计数按比例增长，$c(h\,w) = N\hat p(w)$，$N\to\infty$，它趋于极大似然。把$kV$ 解释为伪观测次数。
::: solution
分子分母同除以$k$：$\big(c(h\,w)/k + 1\big)/\big(c(h)/k + V\big)\to1/V$（$k\to\infty$）。$k\to0$ 时表达式即$c(h\,w)/c(h)$。取$c(h\,w) = N\hat p(w)$、$c(h) = N$：$(N\hat p(w) + k)/(N + kV)\to\hat p(w)$。该估计是一个加权平均，$\frac{N}{N + kV}\hat p(w) + \frac{kV}{N + kV}\cdot\frac1V$：数据计$N$ 次，均匀先验计作$kV$ 次虚拟观测，所以在$N\gg kV$ 之前先验占主导——$V = 17{,}000$、$k = 1$ 时，一个历史要见过几万次才算数。
:::
:::

::: exercise Good–Turing 的缺失质量 {level=2 check="7650/216625"}
《白鲸记》（[[text-and-language/text-as-data#sec-zipf]]）有$N = 216{,}625$ 个词例，其中$7{,}650$ 个词形只出现一次。估计文本续写的下一个词是此前未见词形的概率。用留一法论证这个估计。
::: solution
$N_1/N = 7{,}650/216{,}625 = 0.0353$。留一法：随机拿走一个词例，问它的词形是否在文本别处出现。当且仅当拿走的是出现过一次的词形（hapax legomenon）时别处没有，这恰以概率$N_1/N$ 发生。每个词例充当一次"下一个词"，故$N_1/N$ 估计新词未被见过的概率。
:::
:::

::: exercise 用拉格朗日乘子求二元极大似然 {level=3}
用拉格朗日乘数法最大化$\sum_wc(v\,w)\log\theta_w$、约束为$\sum_w\theta_w = 1$，由此推导[[#eq-bigram-mle]]，并解释$c(v\,w) = 0$ 的词为何得到$\theta_w = 0$。
::: solution
拉格朗日函数为$\sum_wc(v\,w)\log\theta_w - \mu\big(\sum_w\theta_w - 1\big)$。对$c(v\,w) > 0$ 的词令导数为零得$c(v\,w)/\theta_w = \mu$，即$\theta_w = c(v\,w)/\mu$。计数为零的词，目标函数不依赖$\theta_w$，约束却要为它付出代价，故最大值取$\theta_w = 0$（边界最大值）。求和得$\sum_wc(v\,w)/\mu = 1$，即$\mu = c(v)$，$\theta_w = c(v\,w)/c(v)$。目标函数是凹的，故此驻点是全局最大值。未见词得零，正是平滑要解决的问题：似然本身没有理由为未观测之事预留质量。
:::
:::

::: exercise 一个 Kneser–Ney 语言模型 {level=3}
在[[#ex-bigram]]的语料上实现**三元**的内插 Kneser–Ney：三元层用折扣后的计数$c(u\,v\,w)$，二元层用接续计数$N_{1+}(\bullet\,v\,w)$ 并带自己的折扣，一元层用$P_{\text{cont}}$。数值验证对每个见过的历史都有$\sum_wP_{\text{KN}}(w\mid u\,v) = 1$。
::: solution
```python
import collections
corpus = ["the cat sat on the mat", "the dog sat on the cat", "the cat ran", "the dog ran on the mat"]
sents = [["<s>", "<s>"] + s.split() + ["</s>"] for s in corpus]
tri = collections.Counter((a, b, c) for s in sents for a, b, c in zip(s, s[1:], s[2:]))
V = sorted({w for s in sents for w in s[2:]})
d = 0.75

# bigram level from continuation counts N1+(. v w)
cont_bi = collections.Counter((b, c) for a, b, c in tri)
cont_uni = collections.Counter(c for b, c in cont_bi)            # N1+(. . w) via bigram types

def p_uni(w):
    return cont_uni[w] / sum(cont_uni.values())

def p_bi(w, v):
    tot = sum(n for (b, c), n in cont_bi.items() if b == v)
    if tot == 0:
        return p_uni(w)
    types = sum(1 for (b, c) in cont_bi if b == v)
    return max(cont_bi[v, w] - d, 0) / tot + d * types / tot * p_uni(w)

def p_tri(w, u, v):
    tot = sum(n for (a, b, c), n in tri.items() if (a, b) == (u, v))
    types = sum(1 for (a, b, c) in tri if (a, b) == (u, v))
    return max(tri[u, v, w] - d, 0) / tot + d * types / tot * p_bi(w, v)

for (u, v) in sorted({(a, b) for a, b, c in tri}):
    print(u, v, round(sum(p_tri(w, u, v) for w in V), 12))
print(p_tri("mat", "on", "the"), p_tri("dog", "on", "the"))
```

```text
<s> <s> 1.0
<s> the 1.0
cat ran 1.0
cat sat 1.0
dog ran 1.0
dog sat 1.0
on the 1.0
ran on 1.0
sat on 1.0
the cat 1.0
the dog 1.0
the mat 1.0
0.4680059523809524 0.05133928571428571
```

训练中出现过的每个历史都给出和为 $1$ 的分布。最后一行显示$P_{\text{KN}}(\textit{mat}\mid\textit{on the}) = 0.468$（这个三元组见过两次，而 *on the* 共出现三次）与$P_{\text{KN}}(\textit{dog}\mid\textit{on the}) = 0.051$（*on the* 之后未见，由低阶分布补上）。每一层求和为 $1$ 的原因见[[#prop-kn]]：折扣计数之和为$1 - \lambda$，而低阶分布本身已归一，得到权重$\lambda$。递归自底向上保持归一性。
:::
:::

::: exercise 句子的期望长度 {level=3 check="21/4"}
对[[#ex-bigram]]的二元模型，设$E_x$ 为链进入状态$x$ 后到 `</s>` 为止生成的期望词数（计入$x$）。列出线性方程组，解出$E_{\textit{the}}$——生成句子的期望长度——并与训练句子的平均长度比较。
::: solution
$E_{\textit{mat}} = 1$，$E_{\textit{on}} = 1 + E_{\textit{the}}$，$E_{\textit{sat}} = 1 + E_{\textit{on}} = 2 + E_{\textit{the}}$，$E_{\textit{ran}} = 1 + \tfrac12E_{\textit{on}} = \tfrac32 + \tfrac12E_{\textit{the}}$，$E_{\textit{cat}} = 1 + \tfrac13E_{\textit{sat}} + \tfrac13E_{\textit{ran}}$，$E_{\textit{dog}} = 1 + \tfrac12E_{\textit{sat}} + \tfrac12E_{\textit{ran}}$，以及$E_{\textit{the}} = 1 + \tfrac37E_{\textit{cat}} + \tfrac27E_{\textit{dog}} + \tfrac27E_{\textit{mat}}$。记$T = E_{\textit{the}}$：$E_{\textit{cat}} = \tfrac{13}{6} + \tfrac12T$，$E_{\textit{dog}} = \tfrac{11}{4} + \tfrac34T$，故$T = 1 + \tfrac{13}{14} + \tfrac{3}{14}T + \tfrac{11}{14} + \tfrac{3}{14}T + \tfrac27$，即$\tfrac{8}{14}T = 3$，$T = \tfrac{21}{4} = 5.25$。训练句子长度为$6, 6, 3, 6$，平均也是$21/4$。这并非巧合：对极大似然二元模型，每句计数$c(w)/S$ 满足与期望访问次数相同的平衡方程（$c(w)$ 等于以$w$ 结尾的各二元组计数之和），而对被 `</s>` 吸收的链，这些方程有唯一解。
:::
:::
