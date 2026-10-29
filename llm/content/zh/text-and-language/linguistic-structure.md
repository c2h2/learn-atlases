本课程到目前为止的一切，都把文本当作一串带有统计规律的符号。语言学家的描述方式不同：词由更小的有意义单位构成；句子有一种在字符串上看不出来的层次结构；意义则按照这一结构由各部分的意义组合而成。几十年来，自然语言处理把这种结构显式地写出来——为每一个层次配备单独的程序：形态分析器、词性标注器、句法分析器、命名实体识别器——串成一条流水线。大模型什么都不显式写出，却能够产出合乎语法的文本，让动词与相距很远的主语保持一致，并化解许多歧义。理解它们必定以某种方式捕捉的这种结构，理解曾经显式捕捉过它的经典算法，无论对于构建系统，还是对于追问语言模型究竟学到了什么，都是有益的。

本章概览语言结构的各个层次，以及附着其上的经典任务与算法：**形态学**及其与分词的关系、用隐马尔可夫模型与 Viterbi 算法完成的**词性标注**、作为序列标注的**命名实体识别**、**句法**——由 CKY 算法分析的成分语法，以及依存树——还有从词义到语义角色的**语义学**。最后介绍探针（probing）研究关于这种结构在神经语言模型内部情形的发现。关于各个层次更完整的语言学讨论，见中文图谱中关于[形态学](/learn/chinese/lesson.php?c=linguistics&l=morphology)、[句法学](/learn/chinese/lesson.php?c=linguistics&l=syntax)、[语义学](/learn/chinese/lesson.php?c=linguistics&l=semantics)与[语用学](/learn/chinese/lesson.php?c=linguistics&l=pragmatics)的课，它们以中英文的例句讲解普通语言学。

## 结构的层次 {#sec-levels}

语言学传统上区分如下层次：

- **语音学与音系学**：说话的语音，以及组织这些语音的系统（就书面语而言，还有正字法）。
- **形态学**：词的内部结构——*un-happi-ness*。
- **句法**：词如何组合成短语和句子——*the old man* 是一个单位，是 *the old man saw the boat* 中 *saw* 的主语。
- **语义学**：意义——词的意义（*bank* 有多个义项），以及按成分组合而成的句子的意义。
- **语用学**与**篇章**：语境中的意义——说话人说 *Can you pass the salt?* 意图何在、*it* 在不同句子之间指称什么。

每一层次都以自己的方式充满歧义，而消除一个层次的歧义往往需要另一个层次的信息。经典自然语言处理系统为各层次分别建模；神经模型则从原始文本中把它们联合地学出来——这正是它们效果更好的一大原因。

## 形态学 {#sec-morphology}

::: definition 语素 {#def-morpheme}
**语素**是具有意义或语法功能的最小语言单位。**自由**语素可以单独成词（*happy*、*book*）；**黏着**语素则不能（*un-*、*-ness*、*-s*）。黏着语素是**词缀**（前缀、后缀、中缀），附着于**词干**。**屈折**增加语法信息而不改变词的基本词类或意义（*book* → *books*、*walk* → *walked*）；**派生**构成一个新词，且往往属于新的词类（*happy* → *happiness*、*read* → *readable*）；**复合**把若干词干合在一起（*whaleboat*）。
:::

各种语言中形态承担的工作量差别极大。**孤立语**如普通话和越南语几乎没有屈折，语法关系主要靠词序和虚词表达。**黏着语**如土耳其语、芬兰语和日语，把许多词缀串成一串，每个词缀只负担一种功能：土耳其语 *evlerimizden*（"从我们的房子里"，from our houses）分析为 *ev-ler-imiz-den*，即 房子-复数-我们的-从格。**屈折语**如俄语、拉丁语和德语，则把好几种功能压进一个词缀：拉丁语词尾 *-ōrum* 同时标记属格与复数。英语大体是孤立语的，只带有一些屈折变化。丰富的形态会使词形数目成倍增长——一个芬兰语名词有十几个格，每个格又分单复数——这也是[[text-and-language/text-as-data]]中的词级词表对这类语言增长最快的原因之一。

::: example 把词切分为语素 {#ex-morphemes}
把 *unhappinesses*、*rewrites* 和 *whaleboats* 切分成语素，把每个语素标为自由或黏着，并指出哪些词缀是屈折的。与[[text-and-language/tokenisation#sec-byte-bpe]]中 *human beings* 的字节级 BPE 切分作一比较。
::: solution
*un-happi-ness-es*：自由词干 *happy*（加后缀前写作 *happi*）、表否定的派生前缀 *un-*、把形容词变成名词的派生后缀 *-ness*，以及表复数的屈折后缀 *-es*。*re-write-s*：表示"再一次"的派生前缀 *re-*、自由词干 *write*、第三人称单数现在时的屈折后缀 *-s*。*whale-boat-s*：两个自由词干构成的复合词，再加屈折后缀 *-s*。在《白鲸记》（*Moby-Dick*）上训练的 BPE 分词器把 *human beings* 切成 ` hum` `an` ` be` `ings`：*be-ings* 处的边界恰好与语素边界重合（词干 *be*、派生后缀 *-ing*、复数 *-s* 并成了一个片段），*hum-an* 处则不然。BPE 的边界跟着频率走，只有当高频后缀把它们推到语素边界上时，两者才重合。
:::
:::

有两种经典的规范化方法把词形归并到一个共同的基形上。**词干提取器**（stemmer）按规则剥去词缀：Porter 词干提取器（Porter, 1980）把 *connection*、*connected* 和 *connecting* 归约为 *connect*，却也把 *university* 和 *universe* 归约为 *univers*。**词形还原器**（lemmatiser）则借助词表和词的词性，把每个词形映到它的词典形式（*lemma*，原形）：*better* → *good*（形容词）、*saw* → *see*（动词）或 *saw*（名词）。两者都曾是一般的检索与分类任务的标准预处理步骤；子词分词和神经模型使大多数用途不再需要它们，不过针对形态丰富的语言、利用形态信息的分词仍在研究之中。

## 词性与词性标注 {#sec-pos}

词可以分为若干类——名词、动词、形容词、限定词、代词、介词——同类词在句法上表现一致。**通用依存**（Universal Dependencies，UD）项目定义了旨在适用于各语言的 $17$ 个通用词性标签（UPOS），其中包括 `NOUN`、`PROPN`（专有名词）、`VERB`、`AUX`（助动词）、`ADJ`、`ADV`、`ADP`（附置词：前置词或后置词）、`DET`、`PRON`、`NUM`、`CCONJ`、`PUNCT`；英语语料库也曾使用宾州树库（Penn Treebank）更细的 $45$ 个标签（`NN`、`NNS`、`VBD`、`VBZ` 等）。**词性标注**为句子的每个词元指定一个标签。它的难点在于歧义：*book* 在 *read the book* 中是名词，在 *book a table* 中是动词；而在经典例句 *time flies like an arrow* 中，除 *an* 之外的每个词都不止一个可能的标签。

经典的统计标注器是一个**隐马尔可夫模型**（HMM）：一条定义在标签上的马尔可夫链，每个标签发射一个词。

::: definition 隐马尔可夫模型词性标注器 {#def-hmm}
设标签集为$\mathcal{T}$（大小$K$）、词表为$\mathcal{V}$。**HMM 标注器**有**转移概率**$P(t_i\mid t_{i-1})$（标签上的二元模型，含起始符与终止符）和**发射概率**$P(w_i\mid t_i)$。它给带有标签$t_{1:T}$的句子$w_{1:T}$赋予联合概率

$$
P(w_{1:T}, t_{1:T}) = \Big(\prod_{i=1}^{T}P(t_i\mid t_{i-1})\,P(w_i\mid t_i)\Big)P(\texttt{</s>}\mid t_T),\qquad t_0 = \texttt{<s>},
$$ {#eq-hmm}

并用$\hat t_{1:T} = \arg\max_{t_{1:T}}P(w_{1:T}, t_{1:T})$为句子标注。给定带标注语料，这两个分布都可像[[text-and-language/ngram-models#prop-ngram-mle]]那样由计数估计，并配合平滑。
:::

标签是"隐藏"的：标注器只看得到词。标签序列共有$K^T$个——一个$20$词的句子就有$17^{20}\approx4\times10^{24}$个——但二元结构使得可以用动态规划精确地求最大值，正如[[text-and-language/tokenisation#prop-viterbi]]中 unigram 分词器所做的那样。

::: algorithm HMM 的 Viterbi 解码 {#alg-viterbi}
对每个位置$i = 1, \dots, T$和每个标签$t$，计算$\delta_i(t)$——以标签$t$结尾、解释$w_{1:i}$的标签序列的最大概率——以及一个回溯指针$\psi_i(t)$：

1. $\delta_1(t) = P(t\mid\texttt{<s>})\,P(w_1\mid t)$。
2. 对$i = 2, \dots, T$：$\delta_i(t) = \max_{s}\delta_{i-1}(s)\,P(t\mid s)\cdot P(w_i\mid t)$，而$\psi_i(t)$是使上式取最大的$s$。
3. $\hat t_T = \arg\max_t\delta_T(t)\,P(\texttt{</s>}\mid t)$；然后对$i = T, \dots, 2$令$\hat t_{i-1} = \psi_i(\hat t_i)$。

实践中用对数概率进行计算，以避免下溢。
:::

::: proposition Viterbi 的正确性与复杂度 {#prop-viterbi-hmm}
该算法返回使[[#eq-hmm]]取最大的标签序列，时间为$O(TK^2)$，存储为$O(TK)$。
:::

::: proof
对$i$归纳：$\delta_i(t)$是在$t_i = t$的所有标签序列$t_{1:i}$上对$\prod_{j\le i}P(t_j\mid t_{j-1})P(w_j\mid t_j)$取的最大值。$i = 1$时这就是定义。对$i > 1$，这样的序列由一个在位置$i - 1$处以某个标签$s$结尾的序列再接上$t$构成；其概率等于前缀的概率乘以$P(t\mid s)P(w_i\mid t)$，而后者只通过$s$依赖于前缀。由归纳假设，先对以$s$结尾的前缀取最大得到$\delta_{i-1}(s)$，再对$s$取最大就得到递推式。最后一步计入终止转移，再沿回溯指针走回去就重构出一个取到最大的序列。$TK$个值$\delta_i(t)$中每个都要对$K$个前驱取最大，故时间为$O(TK^2)$；存储$\delta$和$\psi$需要$O(TK)$。
:::

::: example 手工执行 Viterbi {#ex-viterbi-hmm}
一个两标签的 HMM 有 $P(N\mid\texttt{<s>}) = 0.7$、$P(V\mid\texttt{<s>}) = 0.3$、$P(N\mid N) = 0.4$、$P(V\mid N) = 0.6$、$P(N\mid V) = 0.7$、$P(V\mid V) = 0.3$，以及发射概率 $P(\textit{time}\mid N) = 0.1$、$P(\textit{time}\mid V) = 0.01$、$P(\textit{flies}\mid N) = 0.02$、$P(\textit{flies}\mid V) = 0.05$。忽略终止符，求 *time flies* 的最优标注。
::: solution
$\delta_1(N) = 0.7\cdot0.1 = 0.07$，$\delta_1(V) = 0.3\cdot0.01 = 0.003$。于是

$$
\begin{aligned}
\delta_2(N) &= \max(0.07\cdot0.4,\ 0.003\cdot0.7)\cdot0.02 = 0.028\cdot0.02 = 0.00056, & \psi_2(N) &= N,\\
\delta_2(V) &= \max(0.07\cdot0.6,\ 0.003\cdot0.3)\cdot0.05 = 0.042\cdot0.05 = 0.0021, & \psi_2(V) &= N.
\end{aligned}
$$

末尾较大的是$\delta_2(V)$，它的回溯指针是$N$：最优标注是 *time*/N *flies*/V，概率为$0.0021$。另一种标注 *time*/N *flies*/N（*flies* 取"一种昆虫"之义）的概率为$0.00056$，只有前者的四分之一。
:::
:::

下面是一个 HMM 标注器：在本课专用编写的十个标注句子上训练，采用加 $0.1$ 平滑，作用在包含歧义词 *book* 与 *flies* 以及未登录词 *bites* 的句子上：

```python
import math, collections

# a tiny tagged corpus written for this lesson (Universal Dependencies tags)
tagged = """the/DET dog/NOUN barks/VERB
a/DET cat/NOUN sleeps/VERB
the/DET old/ADJ man/NOUN books/VERB a/DET flight/NOUN
she/PRON reads/VERB the/DET book/NOUN
they/PRON book/VERB a/DET table/NOUN
the/DET book/NOUN is/AUX old/ADJ
time/NOUN flies/VERB
the/DET flies/NOUN bite/VERB
he/PRON saw/VERB the/DET old/ADJ dog/NOUN
the/DET man/NOUN reads/VERB a/DET book/NOUN"""
sents = [[tuple(t.split("/")) for t in line.split()] for line in tagged.splitlines()]

trans, emit, tagc = collections.Counter(), collections.Counter(), collections.Counter()
for s in sents:
    tags = ["<s>"] + [t for _, t in s] + ["</s>"]
    trans.update(zip(tags, tags[1:]))
    for w, t in s:
        emit[t, w] += 1; tagc[t] += 1
tags = sorted(tagc)
words = {w for s in sents for w, _ in s}
out_of = collections.Counter()
for (a, b), n in trans.items():
    out_of[a] += n                       # number of transitions leaving a

def p_trans(a, b):                       # add-0.1 smoothed transition probability
    return (trans[a, b] + 0.1) / (out_of[a] + 0.1 * (len(tags) + 1))
def p_emit(t, w):                        # add-0.1 smoothed emission probability
    return (emit[t, w] + 0.1) / (tagc[t] + 0.1 * (len(words) + 1))

def viterbi(ws):
    """best[i][t] = (log-prob of the best tag sequence for ws[:i+1] ending in t, back-pointer)"""
    best = [{t: (math.log(p_trans("<s>", t) * p_emit(t, ws[0])), None) for t in tags}]
    for w in ws[1:]:
        col = {}
        for t in tags:
            prev = max(tags, key=lambda s: best[-1][s][0] + math.log(p_trans(s, t)))
            col[t] = (best[-1][prev][0] + math.log(p_trans(prev, t) * p_emit(t, w)), prev)
        best.append(col)
    last = max(tags, key=lambda t: best[-1][t][0] + math.log(p_trans(t, "</s>")))
    path = [last]
    for col in reversed(best[1:]):
        path.append(col[path[-1]][1])
    return list(reversed(path))

for s in ["they book the flight", "the book flies", "she reads a old book", "the dog bites"]:
    ws = s.split()
    print(" ".join(f"{w}/{t}" for w, t in zip(ws, viterbi(ws))))
print("P(VERB | PRON) =", round(p_trans("PRON", "VERB"), 3), " P(NOUN | DET) =", round(p_trans("DET", "NOUN"), 3))
```

```text
they/PRON book/VERB the/DET flight/NOUN
the/DET book/NOUN flies/VERB
she/PRON reads/VERB a/DET old/ADJ book/NOUN
the/DET dog/NOUN bites/VERB
P(VERB | PRON) = 0.838  P(NOUN | DET) = 0.778
```

代词之后的 *book* 被标为动词，限定词之后的 *book* 被标为名词，名词之后的 *flies* 被标为动词；未见过的 *bites* 被标为 `VERB`，因为转移概率使得 `DET NOUN` 之后最可能的标签是动词，而它在每个标签下的平滑发射概率都很小。仅转移模型本身就携带了大量信息。标签的二元模型本身就是一条马尔可夫链：

::: widget markov
matrix: 0,0,0,3/5,1/10,3/10,0; 1/3,0,0,0,2/3,0,0; 0,1,0,0,0,0,0; 0,2/11,0,0,9/11,0,0; 5/12,0,1/12,0,0,0,1/2; 0,0,0,0,0,0,1; 4/9,0,0,5/9,0,0,0
states: start/end; ADJ; AUX; DET; NOUN; PRON; VERB
start: 0
steps: 25
caption: 清单中十个训练句子的极大似然标签转移，视作一条马尔可夫链（起始符与终止符合并为一个状态，于是游走一句接一句地产出标签序列）。一次游走会生成诸如 DET ADJ NOUN VERB DET NOUN 的"句子形状"；HMM 则沿途从每个标签发射一个词。
:::

在约一百万词带标注报纸文本上训练的 HMM 标注器，在英语上达到约 $96$–$97\%$ 的词元准确率；判别式序列模型——最大熵马尔可夫模型、**条件随机场**（conditional random fields；Lafferty、McCallum 与 Pereira, 2001）以及后来的神经标注器——把它提高到约 $97$–$98\%$，已接近标注员彼此意见相合的水平（Manning, 2011）。其余错误大多出在未登录词上，而 HMM 只知道词的身份，对它们处理得很差；判别式标注器会加入后缀、大小写等特征。

## 命名实体 {#sec-ner}

**命名实体识别**（NER）找出人名、机构名、地名及类似类别的名称的出现。由于一个名称可以跨越好几个词元，它被归结为采用特殊标签方案的序列标注。

::: definition BIO 标注 {#def-bio}
在 **BIO**（inside–outside–beginning）方案中，若一个词元开始一个类型$X$的实体，就给它`B-X`；若它延续这样一个实体，就给它`I-X`；若它在所有实体之外，就给它`O`。一串 BIO 标签决定一组**实体跨度**$(i, j, X)$。NER 在跨度这一级评测：预测的实体只有当边界和类型都与金标准实体完全一致时才算正确，精确率、召回率与$F_1$（[[text-and-language/text-classification#def-f1]]）都在实体上计算。
:::

*Captain Ahab of the Pequod sailed from Nantucket* 的标注是

| Captain | Ahab | of | the | Pequod | sailed | from | Nantucket |
|---|---|---|---|---|---|---|---|
| `B-PER` | `I-PER` | `O` | `O` | `B-MISC` | `O` | `O` | `B-LOC` |

共三个实体：一个人、一艘船（在 CoNLL-2003 的 `PER`、`ORG`、`LOC`、`MISC` 方案中属于杂类名称；Tjong Kim Sang 与 De Meulder, 2003）和一个地点。*Captain* 是否算名称的一部分，是标注规范作出的决定；这类决定的分歧限制了 NER 结果在不同数据集之间的可比性。作用在 BIO 标签上的条件随机场，以及后来带 CRF 输出层的神经序列标注器（Lample 等, 2016），是微调 Transformer 出现之前的标准 NER 模型。

## 句法：成分结构与上下文无关文法 {#sec-syntax}

句子 *the old man saw the boat* 不只是一串符号。它的词聚合成**成分**——*the old man* 和 *the boat* 是名词短语，*saw the boat* 是动词短语——这些成分可以作为单位被移动、被代词替换或参与并列。**成分语法**用改写规则描述这一层次结构。

::: definition 上下文无关文法与 PCFG {#def-pcfg}
**上下文无关文法**由非终结符（S、NP、VP……，并指定起始符号 S）、终结符（词）以及把非终结符改写为一串符号的规则$A\to\beta$组成。句子的**分析树**是这样一棵树：根为 S，叶子按顺序就是句子的各个词，且每个内部节点连同它的子女构成一条规则。若每条规则都形如$A\to B\,C$或$A\to w$，则称文法处于**乔姆斯基范式**。**概率上下文无关文法**（PCFG）给每条规则附上一个概率$P(A\to\beta)$，且对每个$A$满足$\sum_\beta P(A\to\beta) = 1$；一棵树的概率等于它用到的各条规则概率之积。
:::

::: example 从树库估计 PCFG {#ex-pcfg-mle}
在一个小树库中，非终结符 VP 共展开 $40$ 次：$24$ 次取 $\text{VP}\to\text{V NP}$，$10$ 次取 $\text{VP}\to\text{VP PP}$，$6$ 次取 $\text{VP}\to\text{V}$。写出极大似然的规则概率，并求子树 $[\text{VP}\ [\text{VP}\ \text{V NP}]\ \text{PP}]$ 的概率（不计 V、NP、PP 内部的规则）。
::: solution
与 $n$ 元模型一样，极大似然估计就是每种展开在同一个非终结符的全部展开中所占的比例：$P(\text{VP}\to\text{V NP}) = 24/40 = 0.6$，$P(\text{VP}\to\text{VP PP}) = 10/40 = 0.25$，$P(\text{VP}\to\text{V}) = 6/40 = 0.15$。这棵子树先用 $\text{VP}\to\text{VP PP}$，再用 $\text{VP}\to\text{V NP}$：$0.25\cdot0.6 = 0.15$。（严格地说，$\text{VP}\to\text{V}$ 不是乔姆斯基范式；CKY 实现会把这类一元规则先行转换或单独处理。）
:::
:::

最常见的句法歧义是**附着**歧义。在 *I saw the man with the telescope* 中，短语 *with the telescope* 既可以修饰 *saw*（我用望远镜看），也可以修饰 *the man*（那个人有望远镜）。歧义数目随句长爆炸式增长。

::: proposition 括号化方案的计数 {#prop-catalan}
给定$n$个叶子按固定的左右顺序，二叉树的数目是卡特兰数

$$
C_{n-1} = \frac{1}{n}\binom{2n - 2}{n - 1},
$$

除去常数因子后它按 $4^{n}/n^{3/2}$ 增长。因此一个$n$词的句子有$C_{n-1}$种可能的无标签二叉括号化方案。
:::

::: proof
设$b_n$为$n$个有先后顺序的叶子的二叉树数目，于是$b_1 = 1$。一棵有$n\ge2$个叶子的树，其根把叶子分成左子树（前$k$个叶子）与右子树（其余$n - k$个叶子），其中$1\le k\le n - 1$；两棵子树彼此独立，所以$b_n = \sum_{k=1}^{n-1}b_kb_{n-k}$。这正是卡特兰数的递推关系 $C_m = \sum_{i=0}^{m-1}C_iC_{m-1-i}$（$C_0 = 1$）平移一格：令$b_n = C_{n-1}$即满足它，因为$C_{n-1} = \sum_{i=0}^{n-2}C_iC_{n-2-i} = \sum_{k=1}^{n-1}b_kb_{n-k}$。封闭形式与渐近式$C_m\sim4^m/(m^{3/2}\sqrt\pi)$都是标准结果（经由生成函数$C(x) = (1 - \sqrt{1 - 4x})/(2x)$与斯特林公式）。
:::

一个七词的句子有$C_6 = 132$种括号化方案，一个二十词的句子有$C_{19} = 1{,}767{,}263{,}190$种。文法能排除掉其中绝大多数，但对长句，现实的文法仍会留下成百上千棵分析树，所以分析器既需要高效的搜索，也需要在若干分析树中偏好其一的办法——PCFG 的概率提供的正是后者。

::: widget plot
f: log10(4^(x-1)/((x-1)^1.5*sqrt(pi)))
x: 2, 30
y: 0, 16
points: 3,0.301; 5,1.146; 7,2.121; 10,3.687; 15,6.427; 20,9.247; 30,15.001
labels: $\log_{10}$ of the asymptotic approximation $4^{n-1}/((n-1)^{3/2}\sqrt\pi)$
caption: 对数坐标下$n$词句子的二叉括号化方案数$C_{n-1}$：精确值（点：$2, 14, 132, 4862, \dots$）与[[#prop-catalan]]的渐近公式（曲线），后者在$n$较小时略有高估。一个三十词的句子——在报纸文本里稀松平常——约有 $10^{15}$ 种括号化方案。
:::

::: algorithm CKY 句法分析（Cocke、Kasami、Younger） {#alg-cky}
**输入：**乔姆斯基范式的 PCFG 与句子 $w_1, \dots, w_n$。

1. 对每个$i$，对每条规则$A\to w_{i+1}$置$\pi[i, i+1, A] = P(A\to w_{i+1})$（下标数的是词与词之间的位置，从$0$到$n$）。
2. 对跨度长度$\ell = 2, \dots, n$，对每个满足$j = i + \ell\le n$的起点$i$，对每个满足$i < k < j$的分割点$k$以及每条规则$A\to B\,C$：置$\pi[i, j, A] = \max\big(\pi[i, j, A],\ P(A\to B\,C)\,\pi[i, k, B]\,\pi[k, j, C]\big)$，并记住取到最大的$(k, B, C)$。
3. 概率最大的分析，其概率为$\pi[0, n, S]$，可由记住的选择恢复出来。

把$\max$换成求和就得到**内点算法**（inside algorithm），它计算句子在该文法下的总概率。
:::

CKY 是定义在树上的 Viterbi 算法：一个跨度的最优分析由它两半的最优分析拼成，因此最优子结构与[[#prop-viterbi-hmm]]中一样成立。尽管分析树有指数多条，对$\lvert R\rvert$条二元规则它只需$O(n^3\lvert R\rvert)$时间——$O(n^2)$个跨度，每个跨度有$O(n)$个分割点。下面的清单填的是同一张分析表，但每个格子保留全部分析，以便展示歧义；真正的分析器每个非终结符只保留最好的一棵。

```python
import collections

# a probabilistic context-free grammar in Chomsky normal form
binary = {("S", "NP", "VP"): 1.0, ("VP", "V", "NP"): 0.6, ("VP", "VP", "PP"): 0.4,
          ("NP", "NP", "PP"): 0.2, ("NP", "Det", "N"): 0.5, ("PP", "P", "NP"): 1.0}
lexical = {("NP", "I"): 0.3, ("V", "saw"): 1.0, ("Det", "the"): 1.0,
           ("N", "man"): 0.6, ("N", "telescope"): 0.4, ("P", "with"): 1.0}

def cky(words):
    """chart[i, j][A] = list of (probability, tree) for every parse of words[i:j] rooted in A"""
    n = len(words)
    chart = collections.defaultdict(lambda: collections.defaultdict(list))
    for i, w in enumerate(words):
        for (A, word), p in lexical.items():
            if word == w:
                chart[i, i + 1][A].append((p, (A, w)))
    for span in range(2, n + 1):
        for i in range(n - span + 1):
            j = i + span
            for k in range(i + 1, j):                    # split point
                for (A, B, C), p in binary.items():
                    for pb, tb in chart[i, k][B]:
                        for pc, tc in chart[k, j][C]:
                            chart[i, j][A].append((p * pb * pc, (A, tb, tc)))
    return chart[0, n]["S"]

def show(t):
    return t[1] if isinstance(t[1], str) and len(t) == 2 else "[" + t[0] + " " + " ".join(show(c) for c in t[1:]) + "]"

parses = cky("I saw the man with the telescope".split())
total = sum(p for p, _ in parses)
for p, t in sorted(parses, reverse=True):
    print(f"P = {p:.6f} ({p / total:.3f} of total)  {show(t)}")
```

```text
P = 0.004320 (0.667 of total)  [S I [VP [VP saw [NP the man]] [PP with [NP the telescope]]]]
P = 0.002160 (0.333 of total)  [S I [VP saw [NP [NP the man] [PP with [NP the telescope]]]]]
```

（打印出的树里省去了前终结符标签。）该文法给 $\text{VP}\to\text{VP PP}$ 的概率是 $0.4$，给 $\text{NP}\to\text{NP PP}$ 的是 $0.2$，所以把介词短语挂到动词上比挂到名词上概率大一倍——不管句子里是什么词。这正是朴素 PCFG 的主要弱点：规则概率无视词语本身，而正确的附着却取决于词语（*with the telescope* 与 *with the hat* 就不同。**词汇化**文法（Collins, 1997；Charniak, 1997）把规则条件在中心词上，后来的神经分析器则用上下文表示给跨度打分，都解决了这个问题。在宾州树库（Marcus、Santorini 与 Marcinkiewicz, 1993）——约一百万词带树标注的《华尔街日报》（*Wall Street Journal*）文本——上，成分分析器的括号 $F_1$ 从 1990 年代末词汇化 PCFG 的约 $88$–$90\%$ 提高到了神经模型的 $95\%$ 以上。

## 句法：依存结构 {#sec-dependencies}

对句法的另一种描述把词直接连起来。在 *the old man saw the boat* 中，*man* 是 *saw* 的主语，*boat* 是它的宾语，*the* 和 *old* 依存于 *man*。

::: definition 依存树 {#def-dependency}
句子$w_1, \dots, w_n$的**依存树**是节点集$\{0, 1, \dots, n\}$上的一棵有向树，根为人工添加的节点$0$（ROOT），每个词恰有一条来自其**中心语**（head）的入弧，弧上标有语法关系（`nsubj`、`obj`、`det`、`amod`……）。把它画在句子上方时若任意两条弧都不交叉，则称它是**投射的**。
:::

对于 *the old man saw the boat*：ROOT → *saw* (`root`)、*saw* → *man* (`nsubj`)、*saw* → *boat* (`obj`)、*man* → *the* (`det`)、*man* → *old* (`amod`)、*boat* → *the* (`det`)。每个词恰有一个中心语，所以树恰有$n$条弧（习题 10）。

::: example 一棵非投射树 {#ex-nonprojective}
在 *A hearing is scheduled on the issue today* 中，短语 *on the issue* 修饰 *hearing*，*today* 修饰 *scheduled*，根是 *scheduled*。给各词编号$1$–$8$，判断这棵树是否投射。
::: solution
弧为 ROOT($0$) → *scheduled* ($4$)；*scheduled* → *hearing* ($2$，`nsubj`)、→ *is* ($3$，`aux`)、→ *today* ($8$，`obl`)；*hearing* → *A* ($1$，`det`)、→ *issue* ($7$，`nmod`)；*issue* → *on* ($5$，`case`)、→ *the* ($6$，`det`)。从 *hearing* ($2$) 到 *issue* ($7$) 的弧跨越位置$2$–$7$，ROOT ($0$) 到 *scheduled* ($4$) 的弧跨越$0$–$4$；由于$0 < 2 < 4 < 7$，两条弧交叉。这棵树不是投射的：修饰语与它的中心语被中间的动词隔开了。这样的树在英语中罕见，但在语序较自由的语言中很常见；只构造投射树的基于转移的分析器若不加以扩展就造不出它们。
:::
:::

依存树比成分树更自然地描写语序自由的语言；**通用依存**项目（de Marneffe、Nivre 及合作者）用一套跨语言一致的标签与关系方案标注树库，其发布版本已覆盖一百多种语言（2026 年时）。依存分析器或者**基于转移**：由分类器预测一系列移进、接弧动作来构树，如 Nivre 的弧标准系统；或者**基于图**：给所有可能的弧打分，再用最大生成树算法找出最优的树（McDonald 等, 2005）；两者的神经版本（Chen 与 Manning, 2014；Dozat 与 Manning, 2017）在英语上的标注弧准确率都已达到 $90\%$ 出头到中段。

::: quiz
关于 HMM 标注器和 CKY 分析器，下列说法哪些是正确的？
- [x] 两者都用动态规划，在指数多个结构上找到精确最优
- [x] 两者都依赖结构的得分是若干局部因子之积
- [ ] CKY 的运行时间与句长成正比
- [ ] HMM 标注器只有在采用三元的标签模型时，才能在选择当前标签时利用下一个词
::: solution
Viterbi 与 CKY 都利用了最优子结构，而它之所以成立，是因为概率可分解为转移与发射（HMM）或规则概率（PCFG）之积。CKY 关于$n$是三次方。而且 Viterbi 解码本来就用到了整个句子——位置$i$处最好的标签通过后面的$\delta$值和回溯指针依赖于后面的词——这与标签模型的阶数无关。
:::
:::

## 语义学 {#sec-semantics}

**词汇语义学**研究词的意义及意义之间的关系。最常见的词大多有多个义项：WordNet（Miller, 1995）是英语的词汇数据库，把词聚成同义词集（*synset*），集与集之间由上下位关系（*whale* 是一种 *cetacean*，*cetacean* 又是一种 *mammal*）、部分—整体关系（*fin* 是 *fish* 的一部分）等联系连接；动词 *run* 在其中列有几十个义项。**词义消歧**要在语境中为每次出现选定义项——对静态嵌入（[[text-and-language/word-embeddings]]）来说，一个词只有一个向量，这项任务做不到；上下文嵌入则隐式地做到了它。

**组合语义学**从各部分的意义及其组合方式来构建句子的意义——弗雷格（Frege）原则。形式语义学用逻辑表示意义：*every whale breathes* 写成 $\forall x\,(\textit{whale}(x)\to\textit{breathes}(x))$；这使推理变得精确，但要求分析正确、词表完备。一个更浅也更有稳健性的表示是**语义角色标注**，它识别谁对谁做了什么：在 *Ahab hunted the whale with a harpoon* 中，*Ahab* 是施事（PropBank 中的 `ARG0`；Palmer、Gildea 与 Kingsbury, 2005），*the whale* 是受事（`ARG1`），*with a harpoon* 是工具。句法变换之下语义角色保持不变——*the whale was hunted by Ahab* 只是换了一套句法，角色相同——这正是它们曾被用于问答与信息抽取的原因。

**语用学**关心字面之外的意义：含义（*some of the crew survived* 暗示并非所有人幸存）、预设、言语行为与指称。语言模型在对话中随时都要面对它；在评测模型是否"理解"了一条指令时，它一再成为困难之源。

::: warning 结构不会因为隐式存在就无关紧要
人们很容易下结论说：大模型训练时没有树也没有标签，语言结构对它们便无关紧要。事实并非如此：文法所描述的规律存在于文本之中，一个把文本预测得好的模型必定以某种形式捕捉了它们。发生变化的是：结构不再需要手工规定，也不再被强行压进单一的一种表示。反过来说，显式标注远未过时——树库和标注语料正是用来检验模型是否学会了特定结构的手段；对许多低资源语言来说，它们仍是现有最好的监督信号。
:::

## 神经语言模型内部的结构 {#sec-probing}

如果说语言模型捕捉了句法，它在哪里？**探针**（probing）训练一个小分类器，从模型的内部表示预测某种语言学性质——词性标签、依存关系、词在句法树中的深度——并把高准确率当作该性质可线性解码的证据。Tenney、Das 与 Pavlick（2019）发现，在 BERT 中，与词性标注相关的信息在较低层最易解码，句法分析在中间层，语义角色与共指在更高的一些层——大致正是经典流水线的顺序。Hewitt 与 Manning（2019）找到了上下文嵌入的一个线性变换，使得词与词之间距离的平方近似等于它们在依存树中的距离——一个"结构探针"。Hewitt 与 Liang（2019）提醒说，足够强的探针可以自己去学会这项任务，并主张与对照任务作比较；而且可解码并不表明模型*使用*了这些信息，检验这一点的是因果方法（[[interpretability/probing-attribution]]、[[interpretability/causal-interventions]]）。对语法知识的针对性评测——例如跨越插入从句的主谓一致（Linzen、Dupoux 与 Goldberg, 2016），以及 BLiMP（Warstadt 等, 2020）这样的最小对基准——则从行为上检验同一个问题。

::: application 今天的经典流水线
截至 2026 年，本章的各个任务在需要显式结构、又负担得起显式结构的场合仍在使用：为信息抽取和语料库语言学服务的分词、标注与依存分析库；为索引与匿名化服务的命名实体识别；为形态丰富语言的检索服务的词形还原；为语言学研究及模型评测服务的树库。也可以用提示让大模型直接给出标签和分析树，其准确率随语言和标注方案而异；大模型还常被用来生成银标准标注，再交由人工核查。
:::

::: history
波你尼（Pāṇini）的梵语文法（约公元前 4 世纪）是对形态与句法的精确的生成式描述。20 世纪的结构主义语言学家——其中有 Leonard Bloomfield 与 Zellig Harris——发展了切分与分布分析的方法；Noam Chomsky 的《句法结构》（*Syntactic Structures*，1957）提出了生成语法与形式文法的层级，Lucien Tesnière 的《结构句法要素》（*Éléments de syntaxe structurale*，1959）提出了依存语法。CKY 算法由 Cocke、Kasami（1965）与 Younger（1967）各自独立发现；Viterbi（1967）发表了他为卷积码设计的解码算法，Baum 及其合作者在 1960 年代末发展了隐马尔可夫模型的估计方法。Church（1988）与 DeRose（1988）造出了有影响的统计词性标注器。宾州树库（Marcus 等, 1993）使统计分析成为可能；Collins（1997）与 Charniak（1997）造出词汇化 PCFG 分析器，Lafferty 等（2001）引入条件随机场，CoNLL 评测任务（自 1999 年起）把短语组块、NER（2003）与依存分析（2006–07）标准化。通用依存项目始于 2014 年。神经标注器与分析器（Collobert 等, 2011；Chen 与 Manning, 2014）以及后来的预训练 Transformer，把这条流水线吸收进了自己内部。
:::

::: summary
- 语言结构分层次——音系、形态、句法、语义、语用——每一层都有歧义，每一层都曾由单独的模型负责。
- 语素是最小的有意义单位；屈折、派生与复合构词；语言从孤立语到黏着语、屈折语不等。只有当频率配合时，子词分词器才会切出近似语素的片段。
- 用 HMM 做词性标注，结合的是标签转移与词发射；Viterbi 解码以 $O(TK^2)$ 时间在 $K^T$ 个标签序列中找出最好的一个。NER 是用 BIO 标签做序列标注，以实体级 $F_1$ 评测。
- $n$ 词的句子有 $C_{n-1}$ 种二叉括号化方案；PCFG 把树的得分写成规则概率之积，CKY 以 $O(n^3\lvert R\rvert)$ 时间找到最优分析。朴素 PCFG 选择附着方式时不看词；词汇化与神经分析器会看。
- 依存树用一个带标签的关系把每个词连到它的中心语；通用依存为一百多种语言提供前后一致的树库。
- 语义学的范围从词义（WordNet、词义消歧）延伸到组合意义与语义角色。探针研究发现，神经语言模型的表示中有大量这类结构可以解码——但要注意：可解码不等于被使用。
:::

## 习题

::: exercise 括号化方案的计数 {level=1 check="14"}
五个词的句子有多少种二叉括号化方案？把三个词的情形全部列出来。
::: solution
$C_4 = \frac15\binom84 = 14$。三个词 $a\,b\,c$ 有 $C_2 = 2$ 种：$((a\,b)\,c)$ 和 $(a\,(b\,c))$。
:::
:::

::: exercise BIO 标签 {level=1 check="3"}
给 *Elizabeth Bennet met Mr Darcy at Netherfield Park* 写出 BIO 标签，类型取 `PER` 与 `LOC`，并把 *Mr* 视为名称的一部分。共有几个实体？
::: solution
*Elizabeth* `B-PER`、*Bennet* `I-PER`、*met* `O`、*Mr* `B-PER`、*Darcy* `I-PER`、*at* `O`、*Netherfield* `B-LOC`、*Park* `I-LOC`：三个实体，两个人、一个地点。
:::
:::

::: exercise 一个 Viterbi 值 {level=1 check="0.0021"}
在[[#ex-viterbi-hmm]]中，验证 $\delta_2(V)$，并计算标注 *time*/V *flies*/V 的概率。
::: solution
$\delta_2(V) = \max(0.07\cdot0.6, 0.003\cdot0.3)\cdot0.05 = 0.042\cdot0.05 = 0.0021$。标注 V V 的概率为 $0.3\cdot0.01\cdot0.3\cdot0.05 = 0.000045$，要小得多。
:::
:::

::: exercise 搜索空间的大小 {level=2 check="17^10"}
一个 $10$ 词的句子在 $17$ 个 UPOS 标签下有多少个标签序列？Viterbi 解码需要多少步基本运算（一个 $\delta$ 值与一个转移概率的乘积）？
::: solution
$17^{10} = 2.0\times10^{12}$ 个序列。Viterbi 要计算 $10\times17$ 个值 $\delta_i(t)$，每个都是对 $17$ 个前驱取最大：约 $10\cdot17^2 = 2{,}890$ 次乘法（实际略少，因为第一个位置没有前驱）。
:::
:::

::: exercise 一棵分析树的概率 {level=2 check="0.3*0.4*0.6*0.5*0.6*0.5*0.4"}
手工计算 *I saw the man with the telescope* 的动词附着分析在 CKY 清单中的文法下的概率，并与打印值核对。
::: solution
这棵树用到 $\text{S}\to\text{NP VP}$（$1$）、$\text{NP}\to I$（$0.3$）、$\text{VP}\to\text{VP PP}$（$0.4$）、$\text{VP}\to\text{V NP}$（$0.6$）、$\text{V}\to\textit{saw}$（$1$）、$\text{NP}\to\text{Det N}$ 两次（$0.5\cdot0.5$）、$\text{Det}\to\textit{the}$ 两次（$1$）、$\text{N}\to\textit{man}$（$0.6$）、$\text{N}\to\textit{telescope}$（$0.4$）、$\text{PP}\to\text{P NP}$ 与 $\text{P}\to\textit{with}$（$1$）。乘积为 $0.3\cdot0.4\cdot0.6\cdot0.5\cdot0.6\cdot0.5\cdot0.4 = 0.00432$，与打印值一致。名词附着分析把 $0.4$（VP → VP PP）换成 $0.2$（NP → NP PP），概率为 $0.00216$。
:::
:::

::: exercise 形态分析 {level=2}
芬兰语词 *taloissammekin* 意为"也在我们的房子里"（*talo* 义为"房子"），已知 *-i-* 标记复数、*-ssa* 标记内格（"在……里"）、*-mme* 表"我们的"、*-kin* 表"也"。请把它切分成语素，把语素分为屈折性的或其他，并说明这样的词对词级词表、以及对一个主要在英语上训练的 BPE 分词器意味着什么。
::: solution
*talo-i-ssa-mme-kin*：词干 *talo*、复数 *-i-*、内格 *-ssa*、第一人称复数领属 *-mme*，以及附缀 *-kin*（"也"）。复数、格与领属是屈折性的；*-kin* 是一个附缀小品词。由于每个名词都要与大量格、数、领属、附缀词尾组合，一个名词就有几百个词形，其中大多罕见，词级词表因此毫无办法。主要在英语上训练的 BPE 分词器几乎没学到芬兰语的合并，会把这样的词切成零碎随意的片段，产出很长的序列——这就是[[text-and-language/tokenisation#def-parity]]所说的溢价；而在足够多芬兰语上训练的分词器，则往往会把 *-ssa* 这类高频词尾学成词元。
:::
:::

::: exercise 实体级 $F_1$ {level=2 check="2/3"}
金标准标注有 $4$ 个实体。某系统预测 $5$ 个，其中 $3$ 个在跨度和类型上都与金标准完全一致；还有一个类型对了但多带了一个词。计算实体级精确率、召回率与 $F_1$。
::: solution
只有完全一致才算数：$\mathrm{TP} = 3$，精确率 $3/5 = 0.6$，召回率 $3/4 = 0.75$，$F_1 = 2\cdot0.6\cdot0.75/1.35 = 2/3 = 0.667$。那个差一点的预测既是假正例又是假负例，这就是实体级得分比词元准确率更严格的原因。
:::
:::

::: exercise HMM 的前向算法 {level=3}
改造[[#alg-viterbi]]以计算 $P(w_{1:T}) = \sum_{t_{1:T}}P(w_{1:T}, t_{1:T})$，再把它与清单中的标注器结合，求出最好的标注占句子 *they book the flight* 概率的比例。
::: solution
把取最大换成求和：$\alpha_1(t) = P(t\mid\texttt{<s>})P(w_1\mid t)$，$\alpha_i(t) = \sum_s\alpha_{i-1}(s)P(t\mid s)\cdot P(w_i\mid t)$，且 $P(w_{1:T}) = \sum_t\alpha_T(t)P(\texttt{</s>}\mid t)$；由分配律，[[#prop-viterbi-hmm]]的证明把最大全部换成求和即成立。接在清单后面：

```python
def forward(ws):
    """alpha[t] = P(ws[:i+1], tag_i = t), summed over all earlier tag sequences"""
    alpha = {t: p_trans("<s>", t) * p_emit(t, ws[0]) for t in tags}
    for w in ws[1:]:
        alpha = {t: sum(alpha[s] * p_trans(s, t) for s in tags) * p_emit(t, w) for t in tags}
    return sum(alpha[t] * p_trans(t, "</s>") for t in tags)

ws = "they book the flight".split()
total = forward(ws)
path = viterbi(ws)
p_best = p_trans("<s>", path[0]) * p_emit(path[0], ws[0])
for (a, b), w in zip(zip(path, path[1:]), ws[1:]):
    p_best *= p_trans(a, b) * p_emit(b, w)
p_best *= p_trans(path[-1], "</s>")
print(f"P(sentence) = {total:.4e};  P(best tagging) = {p_best:.4e};  share {p_best / total:.3f}")
```

```text
P(sentence) = 3.6603e-05;  P(best tagging) = 3.4507e-05;  share 0.943
```

最好的标注占了 $94\%$ 的概率：在这个小模型里，一旦 *they* 确定了 *book* 的标签，这个句子就几乎没有歧义了。用 EM 从未标注文本训练 HMM 时（Baum–Welch 算法），前向概率与后向概率给出每个转移与每次发射的期望计数。
:::
:::

::: exercise 卡特兰数 {level=3 check="132"}
用[[#prop-catalan]]的递推关系 $b_n = \sum_{k=1}^{n-1}b_kb_{n-k}$ 计算 $b_1, \dots, b_7$，并用封闭公式验证 $b_7 = C_6$。
::: solution
$b_1 = 1$，$b_2 = 1$，$b_3 = 2$，$b_4 = 1\cdot2 + 1\cdot1 + 2\cdot1 = 5$，$b_5 = 5 + 2 + 2 + 5 = 14$，$b_6 = 14 + 5 + 4 + 5 + 14 = 42$，$b_7 = 42 + 14 + 10 + 10 + 14 + 42 = 132$。封闭形式给出 $C_6 = \frac17\binom{12}{6} = \frac{924}{7} = 132$。可见 CKY 清单里那个七词的句子共有 $132$ 种二叉括号化方案，而文法恰好只允许打印出的那 $2$ 种。
:::
:::

::: exercise 依存树的弧 {level=3}
证明：$n$ 词句子的依存树恰有 $n$ 条弧，且可能的无标签依存树（不要求投射）共有 $(n + 1)^{n-1}$ 棵。$n = 3$ 时有多少棵？
::: solution
每个词恰有一条入弧，ROOT 一条也没有，所以恰有 $n$ 条弧——$n + 1$ 个节点的任何树都是如此。无标签依存树就是 $\{0, \dots, n\}$ 上完全图的生成树，以 $0$ 为根且所有弧都背离根；每棵无向生成树恰给出一种这样的定向。由凯莱公式，$m$ 个带标号节点的完全图有 $m^{m-2}$ 棵生成树；取 $m = n + 1$ 即得 $(n + 1)^{n-1}$。$n = 3$ 时，$4^2 = 16$ 棵。（基于图的分析器用 Chu–Liu–Edmonds 这类最大生成树形算法在这一空间上搜索。）
:::
:::
