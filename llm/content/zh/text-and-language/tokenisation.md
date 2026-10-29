神经语言模型的输入层每个符号占一行、输出层每个符号给出一个概率，所以在学到任何东西之前，必须先把符号的列表定下来。整词是最显然的选择，也是最糟糕的选择：[[text-and-language/text-as-data]]表明，词表永远不会封闭——一部小说里一半的词形只出现一次，而且新的词形还在不断出现。字符或字节是相反的选择：一套极小、封闭的字母表，但序列长五倍，而且模型还得耗费容量去重新发现 *t*、*h*、*e* 能拼成一个词。现代模型折中于两者之间，使用从数据中学到的**子词分词器**：高频词保持完整，罕见词则由若干片段拼成。

本章介绍目前在用的三种子词算法——**字节对编码**（BPE）、**WordPiece** 与 **unigram 语言模型**——手工并在 Python 中运行 BPE，在一部真实的小说上训练字节级 BPE 分词器，然后考察分词给语言模型使用者带来的种种后果：在拼写与算术上的奇怪失误、对空格与大写的敏感、以及不同语言之间开销的巨大差异。

## 什么是分词器 {#sec-tokeniser}

::: definition 分词器 {#def-tokeniser}
**分词器**由一个有限的**词表**$\mathcal{V}$（其中每个**词元**对应$\{0, \dots, \lvert\mathcal{V}\rvert - 1\}$中的一个整数 id，并代表一个字符串（或字节串）），连同两张映射组成：

- **编码器**$\operatorname{enc}$，把字符串映为 id 的有限序列；以及
- **解码器**$\operatorname{dec}$，把 id 序列映回字符串，通常就是把这些词元所代表的字符串拼接起来。

若对每个字符串$s$都有$\operatorname{dec}(\operatorname{enc}(s)) = s$，则称分词器是**无损**的；若$\operatorname{enc}$对每个字符串都有定义（不存在词表外输入），则称它是**完备**的。实践中编码器是一条流水线：**规范化**（例如 NFKC，[[text-and-language/text-as-data#def-normal-forms]]）、**预切分**（把文本切成词元不得跨越的块，例如在空格处切开），以及真正的**模型**，它把每一块切分成词元。
:::

在分词器之上训练的语言模型给出 id 序列上的一个分布$p_\theta(x_1, \dots, x_T) = \prod_tp_\theta(x_t\mid x_{<t})$，而分词器把它变成文本上的分布。三种经典的选择体现了其中的权衡。

- **词级**：在空格和标点处切分，保留频率最高的 $V$ 个词，其余映射为特殊词元 `<unk>`。没有 `<unk>` 就不完备，有了 `<unk>` 就无损不存。序列很短（英语大约一个词一个词元）。
- **字符级**：每个码位一个词元。无损且几乎完备，但 Unicode 已分配了约 $155{,}000$ 个字符，于是要么词表很大，要么罕见字符变成 `<unk>`。序列很长，英语含空格大约每个词五六个词元。
- **字节级**：每个 UTF-8 字节一个词元，$\lvert\mathcal{V}\rvert = 256$。对一切可能的输入都无损且完备。序列与 UTF-8 编码等长——而且，由[[text-and-language/text-as-data#prop-utf8]]，许多非拉丁文字的序列比英语长两三倍。

序列长度之所以要紧，是因为 Transformer 的开销随它增长（注意力是平方复杂度，[[transformers/attention-complexity]]），也因为词元一变短，固定的上下文窗口能装下的文本就变少。词表大小之所以要紧，是因为嵌入矩阵与输出矩阵各有 $\lvert\mathcal{V}\rvert\times d_{\text{model}}$ 个参数，还因为每个词元的嵌入只能从该词元自己的出现中学到。子词分词器在两头各让出一点，换得两头各多得许多。

## 字节对编码 {#sec-bpe}

字节对编码起源于一种数据压缩方法：Gage（1994）反复把文件里出现最频繁的相邻字节对替换成一个其他场合不用的字节值。Sennrich、Haddow 与 Birch（2016）把它变成了一种为神经机器翻译学习子词词表的方法：从字符出发，反复把出现最频繁的相邻符号对**合并**成一个新符号。

::: algorithm BPE 训练（Sennrich 等，2016）{#alg-bpe}
**输入：**一个已预切分为词并带频率$c(w)$的语料库；合并次数$m$。

1. 把每个词写成它的字符序列再加一个词尾标记 `</w>`。初始词表就是这些字符（连同该标记）的集合。
2. 重复 $m$ 次：
   1. 在整个语料上统计每个相邻符号对$(a, b)$的出现次数，出现在词$w$中的每一次计$c(w)$。
   2. 选出出现次数最多的符号对（并列时按固定规则取舍）。
   3. 把新符号$ab$加入词表，记录这次合并$(a, b)$，并把语料中每个后接$b$的$a$替换为$ab$，每个词都从左到右扫描。

**输出：**合并的有序列表。要**编码**一个新词，先把它拆成字符和 `</w>`，再按学到的顺序依次应用这些合并。
:::

::: example 手工运行 BPE {#ex-bpe-hand}
在 Sennrich 等人的语料上训练 BPE：*low*（$5$ 次）、*lower*（$2$ 次）、*newest*（$6$ 次）、*widest*（$3$ 次）。求前五次合并，以及不在语料中的词 *lowest* 的切分。并列时按字母序取舍。
::: solution
最初各词为 `l o w </w>`（×5）、`l o w e r </w>`（×2）、`n e w e s t </w>`（×6）与 `w i d e s t </w>`（×3），共 $5\cdot4 + 2\cdot6 + 6\cdot7 + 3\cdot7 = 95$ 个符号。符号对计数：

| 符号对 | 次数 | 符号对 | 次数 |
|---|---|---|---|
| `e s` | $6 + 3 = 9$ | `s t` | $9$ |
| `t </w>` | $9$ | `l o`、`o w` | 各 $7$ |
| `w e` | $2 + 6 = 8$ | `n e`、`e w` | 各 $6$ |
| `w </w>` | $5$ | `i d`、`d e`、`w i` | 各 $3$ |
| `e r`、`r </w>` | 各 $2$ | | |

第 1 次合并是 `e s`（次数 $9$；在次数同为 $9$ 的符号对中它按字母序最靠前）。于是 *newest* 变为 `n e w es t </w>`，*widest* 变为 `w i d es t </w>`，而 `es t` 的次数为 $9$：第 2 次合并是 `es t`，第 3 次是 `est </w>`，次数同样是 $9$。接着是 `l o`（$7$）和 `lo w`（$7$）：第 4、5 次合并。五次合并之后语料为 `low </w>`（×5）、`low e r </w>`（×2）、`n e w est</w>`（×6）、`w i d est</w>`（×3）：$95 - (9 + 9 + 9 + 7 + 7) = 54$ 个符号。

编码 *lowest*：`l o w e s t </w>` →（第 1 次合并）`l o w es t </w>` →（第 2 次）`l o w est </w>` →（第 3 次）`l o w est</w>` →（第 4 次）`lo w est</w>` →（第 5 次）`low est</w>`。未见过的词被切成两个有意义的片段——词干与后缀——它们是从别的词那里学来的。
:::
:::

同样的过程用 Python 写出——[[#alg-bpe]]的直接照写，运行十次合并：

```python
import collections

def pair_counts(vocab):
    """vocab: {tuple of symbols: word frequency} -> Counter of adjacent symbol pairs"""
    pairs = collections.Counter()
    for word, freq in vocab.items():
        for a, b in zip(word, word[1:]):
            pairs[a, b] += freq
    return pairs

def merge(vocab, pair):
    """Replace every occurrence of the adjacent pair (a, b) by the symbol a+b."""
    a, b = pair
    out = {}
    for word, freq in vocab.items():
        new, i = [], 0
        while i < len(word):
            if i + 1 < len(word) and word[i] == a and word[i + 1] == b:
                new.append(a + b); i += 2
            else:
                new.append(word[i]); i += 1
        out[tuple(new)] = freq
    return out

def train_bpe(word_freqs, num_merges):
    vocab = {tuple(w) + ("</w>",): f for w, f in word_freqs.items()}
    merges = []
    for _ in range(num_merges):
        pairs = pair_counts(vocab)
        if not pairs:
            break
        best = max(sorted(pairs), key=lambda p: pairs[p])   # most frequent; ties: alphabetical
        merges.append((best, pairs[best]))
        vocab = merge(vocab, best)
    return merges, vocab

def encode(word, merges):
    """Apply the learned merges, in the order learned, to a new word."""
    symbols = {tuple(word) + ("</w>",): 1}
    for pair, _ in merges:
        symbols = merge(symbols, pair)
    return list(next(iter(symbols)))

corpus = {"low": 5, "lower": 2, "newest": 6, "widest": 3}
merges, vocab = train_bpe(corpus, 10)
for k, (pair, count) in enumerate(merges, 1):
    print(f"merge {k:>2}: {pair[0]!r:>8} + {pair[1]!r:<7} (count {count})")
print(vocab)
for w in ["lowest", "newer", "wider", "slow"]:
    print(w, "->", encode(w, merges))
```

```text
merge  1:      'e' + 's'     (count 9)
merge  2:     'es' + 't'     (count 9)
merge  3:    'est' + '</w>'  (count 9)
merge  4:      'l' + 'o'     (count 7)
merge  5:     'lo' + 'w'     (count 7)
merge  6:      'e' + 'w'     (count 6)
merge  7:     'ew' + 'est</w>' (count 6)
merge  8:      'n' + 'ewest</w>' (count 6)
merge  9:    'low' + '</w>'  (count 5)
merge 10:      'd' + 'est</w>' (count 3)
{('low</w>',): 5, ('low', 'e', 'r', '</w>'): 2, ('newest</w>',): 6, ('w', 'i', 'dest</w>'): 3}
lowest -> ['low', 'est</w>']
newer -> ['n', 'ew', 'e', 'r', '</w>']
wider -> ['w', 'i', 'd', 'e', 'r', '</w>']
slow -> ['s', 'low</w>']
```

十次合并后，高频词 *low* 和 *newest* 已是单个词元，而罕见的 *lower* 是 `low e r </w>`。新词 *slow* 无需任何未知符号就能编码，作 `s` + `low</w>`。还应注意：结果依赖并列取舍规则（第 6–8 次合并次数同为 $6$），而且合并可能产出没有语言学意义的片段，如 `ew`：BPE 优化的是频率，不是词法。

::: proposition BPE 的性质 {#prop-bpe}
设对一个初始切分含 $L_0$ 个符号的语料库，用 $m$ 次合并训练 BPE 分词器。

1. 词表至多有 $\lvert\mathcal{V}_0\rvert + m$ 个符号，其中 $\mathcal{V}_0$ 是初始字母表。
2. 若选中的符号对满足 $a\ne b$，则这次合并使语料中的符号数恰好减少该符号对的次数那么多。于是经过 $m$ 次这样的合并后，语料含 $L_0 - \sum_{k=1}^{m}n_k$ 个符号，其中 $n_k$ 是第 $k$ 次被合并符号对的次数；而每次合并都是使语料缩短最多的贪心选择。
3. 编码是无损的——一个词的各词元拼接起来就是这个词——并且对每个字符都属于 $\mathcal{V}_0$ 的词都是完备的。
:::

::: proof
（1）每次合并至多新增一个符号。（若合并所得的串已经存在，则一个也不新增，例如 `a bc` 与 `ab c` 都被合并的情形；此时两次合并得到同一个串。）

（2）若$a\ne b$，词中$(a, b)$的两次出现不可能重叠：要重叠就需要某个符号既是一次出现中的$b$、又是下一次出现中的$a$，那就有$a = b$。因此从左到右的扫描会替换掉每一个被计入的出现，而每次替换把两个符号变成一个。按重数$c(w)$在整个语料上求和，长度恰好减少该符号对的次数那么多。贪心结论随之成立：在所有可能的合并中，次数最大的那个使语料缩短最多。（若$a = b$，如 `a a a`，把重叠的对也计入得 $2$，但只能替换一次，所以减少量可能小于计数；习题 9。）

（3）合并把两个相邻符号换成它们的拼接，所以一个词的全部符号拼接成的串永不改变；它一开始就是这个词本身。编码一个字符全在 $\mathcal{V}_0$ 中的词时，起点是合法的符号，而每次合并产出的都是词表符号，故输出全由词元组成。
:::

命题说明 BPE 是一个**贪心压缩器**：每一步都让训练语料缩短到一次合并所能达到的极限。它并不全局最优——挑选最优的 $m$ 次合并序列是一个难得多的组合问题——而且早先的贪心选择会约束后来的选择。经验上，用更多数据或更多合并训练会得到更长的词元，但收益递减，下一节将对此作定量测量。

## 字节级 BPE {#sec-byte-bpe}

从字符出发做 BPE，字母表 $\mathcal{V}_0$ 仍然是开放的：训练时没见过的表情符号或汉字会变成 `<unk>`。Radford 等人（2019）为 GPT-2 改用 $256$ 个字节值作起点。任何字符串都是字节序列，于是分词器完备，根本不需要未知词元，而合并学到多字节字符，恰如学到多字母的词。GPT-2 的词表有 $50{,}257$ 个词元：$256$ 个字节、$50{,}000$ 次合并，外加一个特殊的文本结束词元。为了不让合并以无益的方式跨越词边界（把 "dog." 和 "dog!" 变成两个词元），GPT-2 先用一个正则表达式把文本切成字母串、数字串和其他符号串，每串保留自己的前导空格；合并从不跨越这些块。

下面是以《白鲸记》（*Moby-Dick*，Project Gutenberg 电子书 #2701，即[[text-and-language/text-as-data#sec-zipf]]所用文本）的字节训练的字节级 BPE，预切分模式取了 GPT-2 所用模式的简化版；其后是对《世界人权宣言》第一条第一句的英语、法语、俄语和中文官方文本分别分词。

```python
import re, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]

# GPT-2-style pre-tokenisation: letters, digits, other symbols; a word keeps its leading space
PAT = re.compile(r" ?[^\W\d_]+| ?\d+| ?[^\s\w]+|\s+(?!\S)|\s+")
chunks = collections.Counter(PAT.findall(text))
words = {tuple(c.encode("utf-8")): f for c, f in chunks.items()}   # symbols: ints 0..255
print("pre-tokens:", sum(chunks.values()), " distinct:", len(chunks),
      " bytes:", sum(len(w) * f for w, f in words.items()))

def pair_counts(words):
    pairs = collections.Counter()
    for w, f in words.items():
        for a, b in zip(w, w[1:]):
            pairs[a, b] += f
    return pairs

def merge(words, pair, new):
    out = {}
    for w, f in words.items():
        s, i = [], 0
        while i < len(w):
            if i + 1 < len(w) and (w[i], w[i + 1]) == pair:
                s.append(new); i += 2
            else:
                s.append(w[i]); i += 1
        out[tuple(s)] = f
    return out

token_bytes = {i: bytes([i]) for i in range(256)}         # token id -> its bytes
merges = []
for step in range(1000):                                   # about a minute and a half in CPython
    pairs = pair_counts(words)
    best = max(pairs, key=lambda p: (pairs[p], p))         # most frequent; ties by larger ids
    new = 256 + step
    token_bytes[new] = token_bytes[best[0]] + token_bytes[best[1]]
    merges.append(best)
    words = merge(words, best, new)
    if step < 6 or (step + 1) in (100, 300, 1000):
        n = sum(len(w) * f for w, f in words.items())
        print(f"merge {step + 1:>4}: {token_bytes[new]!r:<15} tokens in corpus {n}")

rank = {pair: 256 + k for k, pair in enumerate(merges)}
def encode(s):
    ids = []
    for chunk in PAT.findall(s):
        w = list(chunk.encode("utf-8"))
        while len(w) > 1:                                  # apply the earliest-learned merge
            cands = [(rank[p], i) for i, p in enumerate(zip(w, w[1:])) if p in rank]
            if not cands:
                break
            r, i = min(cands)
            w[i:i + 2] = [r]
        ids += w
    return ids

show = lambda ids: [token_bytes[i].decode("utf-8", "replace") for i in ids]
udhr = {   # Universal Declaration of Human Rights, Article 1, first sentence
    "English": "All human beings are born free and equal in dignity and rights.",
    "French":  "Tous les êtres humains naissent libres et égaux en dignité et en droits.",
    "Russian": "Все люди рождаются свободными и равными в своем достоинстве и правах.",
    "Chinese": "人人生而自由，在尊严和权利上一律平等。",
}
for lang, s in udhr.items():
    ids = encode(s)
    assert b"".join(token_bytes[i] for i in ids) == s.encode("utf-8")   # lossless
    print(f"{lang:<8} chars {len(s):>3}  bytes {len(s.encode()):>4}  tokens {len(ids):>4}")
print(show(encode(udhr["English"])))
for s in [" whale", " Whale", "whale", " WHALE", " strawberry", " 1851"]:
    print(repr(s), show(encode(s)))
```

```text
pre-tokens: 283958  distinct: 24002  bytes: 1233772
merge    1: b' t'           tokens in corpus 1202661
merge    2: b'he'           tokens in corpus 1176426
merge    3: b' a'           tokens in corpus 1155974
merge    4: b'in'           tokens in corpus 1136486
merge    5: b' the'         tokens in corpus 1120156
merge    6: b' s'           tokens in corpus 1105402
merge  100: b'\xe2\x80\x9d' tokens in corpus 723194
merge  300: b'our'          tokens in corpus 577122
merge 1000: b'ought'        tokens in corpus 452949
English  chars  63  bytes   63  tokens   23
French   chars  72  bytes   75  tokens   41
Russian  chars  69  bytes  127  tokens  127
Chinese  chars  19  bytes   57  tokens   57
['A', 'll', ' hum', 'an', ' be', 'ings', ' are', ' b', 'orn', ' f', 'ree', ' and', ' e', 'qu', 'al', ' in', ' d', 'ign', 'ity', ' and', ' right', 's', '.']
' whale' [' whale']
' Whale' [' Whale']
'whale' ['whale']
' WHALE' [' W', 'HA', 'L', 'E']
' strawberry' [' st', 'raw', 'ber', 'ry']
' 1851' [' 1', '8', '5', '1']
```

有几处值得注意。第 5 次合并由 ` t` 和 `he` 造出 ` the`——这是对合并结果的再合并。第 100 次合并造出三字节右双引号 `”`（E2 80 9D）：字节级 BPE 只有当多字节字符足够频繁时才学得会。$1{,}000$ 次合并后，语料从 $1{,}233{,}772$ 字节缩到 $452{,}949$ 个词元，每个词元 $2.72$ 字节；词表为 $50{,}000$–$250{,}000$ 个词元、在多得多的文本上训练的生产级分词器，在英语上大约达到每个词元四个字节（2026 年时），[[text-and-language/perplexity]]的换算就采用这个数字。

::: widget regression
points: 1,1.167; 2,1.706; 2.301,1.967; 2.477,2.138; 2.602,2.272; 2.699,2.383; 2.778,2.473; 2.845,2.549; 2.903,2.614; 2.954,2.672; 3,2.724
degree: 1
x: 0.8, 3.2
y: 1, 3
caption: 字节级 BPE 在《白鲸记》（*Moby-Dick*）上达到的压缩：训练语料中每个词元的字节数对合并次数（$10$ 到 $1000$，与上面清单同一次运行）的 $\log_{10}$。在这一范围内，合并次数每增加十倍，每个词元大约多换得一个字节；随着合并触及越来越罕见的符号对，曲线逐渐下弯。试试把度数取为 $2$，可以看到收益递减。
:::

## WordPiece {#sec-wordpiece}

WordPiece 由 Schuster 与 Nakajima（2012）为日语和韩语语音搜索提出，被 Google 的神经机器翻译系统采用（Wu 等，2016），又因 BERT（Devlin 等，2019）而广为人知，BERT 的英语词表约含 $30{,}000$ 个 WordPiece 词元。Google 没有发布训练代码；下面的描述依照开源的重实现（尤其是 Hugging Face 的实现），它们与 BPE 有两处不同。

::: definition WordPiece {#def-wordpiece}
词的写法是：首字符在前，其余每个字符都加上表示词内部的标记前缀 `##`（于是 *low* 写作 `l ##o ##w`）。训练时每一步都合并**得分**最高的相邻符号对$(a, b)$，

$$
\operatorname{score}(a, b) = \frac{c(ab)}{c(a)\,c(b)},
$$ {#eq-wordpiece}

其中$c(ab)$是该符号对相邻出现的次数，$c(a)$、$c(b)$是这两个符号各自的出现次数。对一个词的编码采用**贪心最长匹配优先**：先取作为该词前缀的最长词表词元，再取作为剩余部分前缀的最长 `##` 词元，如此继续；若某一步没有任何词元能匹配，整个词就变成 `[UNK]`。
:::

得分用两个组成部分的计数去除符号对的计数，因此它偏好那些拆开来看很少各自独立出现的符号对：它就是观测到的符号对概率$c(ab)/N$与独立情形所预测的概率$c(a)c(b)/N^2$之比再除以常数$N$——对这个比值取对数，正是[[text-and-language/word-embeddings]]中的**逐点互信息**。把$a$与$b$合并为一个符号，会使符号序列的一元模型的似然增加，增加量随这一比值增大，这正是该准则最初的动机。

::: example 同一语料上 WordPiece 与 BPE 的对比 {#ex-wordpiece}
把[[#ex-bpe-hand]]的语料写成 WordPiece 形式，计算符号对 `##e ##s`、`##s ##t`、`l ##o` 与 `w ##i` 的得分。WordPiece 会先合并哪个符号对？
::: solution
符号计数（每次出现按词频加权）为：`##e` $= 5\cdot0 + 2 + 2\cdot6 + 3 = 17$（*lower* 中一个、*newest* 中两个、*widest* 中一个），`##s` $= 9$，`##t` $= 9$，`l` $= 7$，`##o` $= 7$，`w` $= 3$，`##i` $= 3$。符号对计数依次为 $9$、$9$、$7$、$3$。得分为：

$$
\tfrac{9}{17\cdot9} = 0.059,\qquad \tfrac{9}{9\cdot9} = 0.111,\qquad \tfrac{7}{7\cdot7} = 0.143,\qquad \tfrac{3}{3\cdot3} = 0.333.
$$

WordPiece 先合并 `w ##i`（`##i ##d` 得分同为 $1/3$，也会被先合并），尽管它只出现 $3$ 次：*w* 与 *i* 从不出现在 *widest* 以外且相连的地方。BPE 先合并 `e s`，因为它是次数最多的符号对。WordPiece 偏好结合紧密的符号对，BPE 偏好频繁的符号对。
:::
:::

## unigram 语言模型 {#sec-unigram}

BPE 和 WordPiece 自底向上构造词表，切分也是确定性的。Kudo（2018）提出了相反的做法：从一个大词表出发，把切分看作概率问题，再做剪枝。

::: definition unigram 语言模型分词器 {#def-unigram}
**unigram 分词器**有一个词表$\mathcal{V}$，每个词元带一个概率$p(t)$，满足$\sum_{t\in\mathcal{V}}p(t) = 1$。字符串$x$的一个**切分**是一个词元序列$\mathbf{t} = (t_1, \dots, t_k)$，其拼接为$x$；记$S(x)$为所有切分构成的集合。模型赋予

$$
P(\mathbf{t}) = \prod_{i=1}^{k}p(t_i),\qquad P(x) = \sum_{\mathbf{t}\in S(x)}P(\mathbf{t}).
$$ {#eq-unigram}

编码器返回概率最大的切分$\mathbf{t}^* = \arg\max_{\mathbf{t}\in S(x)}P(\mathbf{t})$。
:::

切分的个数随$x$的长度指数增长（一个长度为$n$、所有子串都在词表中的字符串有$2^{n-1}$个切分），但最优切分可以用动态规划找到。

::: proposition Viterbi 切分 {#prop-viterbi}
对$i = 0, 1, \dots, n$，记$B(i)$为前缀$x_{1:i}$的切分中对数概率的最大值（规定$B(0) = 0$，若无可行切分则$B(i) = -\infty$）。于是

$$
B(i) = \max_{\substack{0\le j < i\\ x_{j+1:i}\in\mathcal{V}}}\Big(B(j) + \log p(x_{j+1:i})\Big),
$$

而只要在每个$i$处记住取到最大值的$j$，就能回溯出$\mathbf{t}^*$。若词元至多含$\ell$个字符，整个计算只需$O(n\ell)$次词表查询。
:::

::: proof
$x_{1:i}$的任一切分都有最后一个词元$x_{j+1:i}$，其中某个$j < i$，其前是$x_{1:j}$的一个切分。由[[#eq-unigram]]，它的对数概率等于那个更短切分的对数概率加上$\log p(x_{j+1:i})$。固定$j$时，当更短的切分取最优时该值最大，即为$B(j) + \log p(x_{j+1:i})$；再对$j$取最大就得到递推式。（最优子结构成立，因为得分是逐词元相加的。）每个$i$至多检查$\ell$个$j$，故共$O(n\ell)$步。把$\max$换成概率求和就得到**前向算法**，它用同样的时间算出$P(x)$（习题 8）。
:::

::: example 一个 Viterbi 切分 {#ex-viterbi}
某个 unigram 词表除其他词元外还含 `l`（0.04）、`o`（0.05）、`w`（0.04）、`e`（0.08）、`s`（0.06）、`t`（0.07）、`lo`（0.02）、`low`（0.05）、`we`（0.01）、`est`（0.04）、`west`（0.005）与 `st`（0.03）。求 *lowest* 概率最大的切分，以及它占$P(\textit{lowest})$的比例。
::: solution
```python
import math
p = {"l": 0.04, "o": 0.05, "w": 0.04, "e": 0.08, "s": 0.06, "t": 0.07,
     "lo": 0.02, "low": 0.05, "we": 0.01, "est": 0.04, "west": 0.005, "st": 0.03}

def viterbi(x, p):
    """best[i] = (log-prob, segmentation) of the best segmentation of x[:i]"""
    best = [(0.0, [])] + [(-math.inf, None)] * len(x)
    for i in range(1, len(x) + 1):
        for j in range(max(0, i - 4), i):            # pieces are at most 4 characters long
            piece = x[j:i]
            if piece in p and best[j][1] is not None:
                score = best[j][0] + math.log(p[piece])
                if score > best[i][0]:
                    best[i] = (score, best[j][1] + [piece])
    return best[-1]

def all_segmentations(x, p):
    if not x:
        yield []; return
    for k in range(1, len(x) + 1):
        if x[:k] in p:
            for rest in all_segmentations(x[k:], p):
                yield [x[:k]] + rest

logp, seg = viterbi("lowest", p)
print("Viterbi:", seg, "P =", f"{math.exp(logp):.3g}")
segs = sorted(all_segmentations("lowest", p), key=lambda s: -math.prod(p[t] for t in s))
total = sum(math.prod(p[t] for t in s) for s in segs)
print(len(segs), "segmentations; P(x) =", f"{total:.4g}")
for s in segs[:5]:
    q = math.prod(p[t] for t in s)
    print(f"{' + '.join(s):<22} {q:.3g}   posterior {q / total:.3f}")
```

```text
Viterbi: ['low', 'est'] P = 0.002
15 segmentations; P(x) = 0.002292
low + est              0.002   posterior 0.873
low + e + st           0.00012   posterior 0.052
lo + west              0.0001   posterior 0.044
lo + w + est           3.2e-05   posterior 0.014
low + e + s + t        1.68e-05   posterior 0.007
```

最优切分是 `low + est`，概率为 $0.05\cdot0.04 = 0.002$，占到摊在 $15$ 个切分上的总概率 $P(\textit{lowest}) = 0.002292$ 的 $87\%$。切分出的词元越多，相乘的小于一的概率就越多，所以 unigram 模型天生偏好又少又长的词元。
:::
:::

**训练** unigram 分词器时交替进行两个步骤，起点是一个大的种子词表（例如语料中所有频繁的子串）。**EM 步**通过最大化语料似然 $\sum_wc(w)\log P(w)$ 来拟合概率$p(t)$，其中每个词元被使用的期望次数用前向–后向算法在所有切分上算出。**剪枝步**对每个词元计算若将它删去似然会下降多少，删去损失最小的那些词元（Kudo 每轮保留最好的 $80\%$），并始终保留单个字符，使任何字符串都仍可切分。两步反复进行，直到词表达到目标规模。

由于模型是概率的，它还可以**采样**切分，而不必总用最优的那个。Kudo 的**子词正则化**在训练时按正比于$P(\mathbf{t})^{\alpha}$的概率抽取$\mathbf{t}$，于是模型有时把 *lowest* 看作 `low + est`，有时看作 `low + e + st`；这相当于数据增广，在他的实验中提高了翻译质量。BPE-dropout（Provilkov 等，2020）对 BPE 随机跳过某些合并，也能达到类似效果。

::: widget plot
f: 1/(1+0.06^x+0.05^x+0.016^x+0.0084^x+0.005^x+0.003^x+0.0016^x+0.00096^x+0.00042^x+0.0003^x+0.000134^x+0.000096^x+0.000042^x+0.0000134^x); 0.05^x/(1+0.06^x+0.05^x+0.016^x+0.0084^x+0.005^x+0.003^x+0.0016^x+0.00096^x+0.00042^x+0.0003^x+0.000134^x+0.000096^x+0.000042^x+0.0000134^x)
x: 0, 2
y: 0, 1
labels: $P(\text{low + est})$; $P(\text{lo + west})$
caption: 用[[#ex-viterbi]]的词表对 *lowest* 做子词正则化：当按正比于 $P(\mathbf{t})^{\alpha}$ 的概率抽取切分时，抽中最优切分（`low + est`）与第三好的切分（`lo + west`）的概率随 $\alpha$ 的变化。$\alpha = 0$ 时 $15$ 个切分等可能；$\alpha = 1$ 时就是模型自己的后验分布（取 $0.873$）；$\alpha$ 增大时，采样趋近确定的 Viterbi 切分。
:::

## SentencePiece {#sec-sentencepiece}

上面三种算法都假定先预切分出词，通常在空格处切——而中文或日文没有这样的空格，而且这样切还丢失空格信息。**SentencePiece**（Kudo 与 Richardson，2018）是一个把 BPE 和 unigram 模型直接作用在原始文本上的库。它把输入看作含空格的 Unicode 字符序列，把每个空格换成可见符号 `▁`（U+2581），学出诸如 `▁the` 的词元，于是解码就是精确拼接再把 `▁` 换回空格。它默认施加基于 NFKC 的规范化，还有一个可选的**字节回退**，用词表外字符的 UTF-8 字节表示它们，使分词器完备。T5 和 ALBERT 用的就是 SentencePiece unigram 模型；最早的 Llama 模型用的是带字节回退的 SentencePiece BPE；GPT 系列与许多开放模型则用 GPT-2 风格的字节级 BPE（配合 OpenAI 的 `tiktoken` 等库）。其技术报告显示，公开模型的词表大小从约 $32{,}000$（初代 Llama，2023）到超过 $250{,}000$（Gemma）不等（2026 年时）。

::: quiz
下列分词器中，哪些能在没有未知词元的情况下编码任意字符串，包括训练时未见的表情符号和文字？
- [ ] 只含出现频率最高的 $50{,}000$ 个词的词级分词器
- [ ] 在训练语料上建立字符级基础词表的 WordPiece
- [x] 字节级 BPE
- [x] 带字节回退的 SentencePiece unigram
::: solution
字节级 BPE 以全部 $256$ 个字节值起步，字节回退赋予 SentencePiece 同样的保证；任何字符串都是字节序列。词级分词器会把未见过的词映射为 `<unk>`，而字符级 WordPiece 词表无法编码训练中从未出现过的字符。
:::
:::

## 分词的副作用 {#sec-artefacts}

分词器在训练之前就定好，在模型的接口中又看不见它，所以它的影响会以令人困惑的行为形式浮现。

**拼写与计数。**在上面清单里，*strawberry* 是四个词元 ` st`、`raw`、`ber`、`ry`；生产级分词器可能只用一个或两个。模型收到的是 id 而不是字母，所以"*strawberry* 里有几个 *r*？"这类问题问的是词元内部的拼写，而模型只能从把单词逐字母拼写出来的数据中间接地学到它。这类任务、以及单词倒写或押韵上的错误，部分是分词造成的，并非推理能力的失败——尽管模型也能学会绕开它们。

**大小写与空格。**` whale`、` Whale` 和 `whale` 是三个互不相干的词元，` WHALE` 更是四个。模型必须分别学会它们是同一个词。末尾带空格的提示会使下一个词天然的那个词元（含前导空格）不可用，这会明显改变后续的生成。

**数字。**` 1851` 在这里被切成 ` 1` `8` `5` `1`；别的分词器会把年份等常见数字学成单个词元，于是 $1851$ 是一个词元而 $1852$ 是两个。这样算术就得作用在切法不一致的数字片段上。为使数位位置一致，有的分词器把数字逐个拆成单个数字（PaLM，2022；Llama，2023），有的则按至多三位一组切开。

**训练不足的词元。**一个词元可能在分词器的训练数据中很常见，却在模型的训练数据中几乎不出现，于是它的嵌入几乎没有被训练过。Rumbelow 与 Watkins（2023）在 GPT-2 和 GPT-3 的词表中发现了这样一些使模型行为失常的词元（最出名的一个 ` SolidGoldMagikarp` 是一位 Reddit 用户的名字）；Land 与 Bartolo（2024）给出了在开放模型中检测训练不足词元的方法。

::: warning 词元不是词，词元数不是文本长度
人们很容易把"128,000 词元的上下文"或"每百万词元 $\$x$"读成关于词的说法，但它们不是：每个词占多少词元，取决于分词器、语言和文本种类（代码、数字、罕见人名）。对英语散文，当前分词器常用的经验法则是"一个词元大约四个字符、四分之三个词"，但对别的语言这个说法可能差上几倍。同理，使用不同分词器的模型，其每词元损失与困惑度也不可比（[[text-and-language/perplexity]]）。
:::

## 多语言差异 {#sec-disparity}

上面清单用只在英语上训练的分词器对同一句话的四个语言版本分词。英语需要 $23$ 个词元，法语 $41$，中文 $57$——每个字节一个、每个字符三个——俄语 $127$，也是每个字节一个：《白鲸记》中没有出现过任何西里尔字母对，所以没有任何涉及西里尔字母的合并被学到。

::: definition 分词对等性 {#def-parity}
给定分词器$\tau$和一对平行文本——语言$A$的文本$x_A$及其在语言$B$中的译文$x_B$——$A$相对$B$的**分词溢价**（对等比）是$\lvert\tau(x_A)\rvert/\lvert\tau(x_B)\rvert$，即二者词元数之比，在平行语料上取平均。比值接近$1$表示分词器对两种语言一视同仁。
:::

真实的分词器在多语言数据上训练，比上面那个只见过英语的分词器好得多，但它们继承了训练数据的不均衡。Petrov、La Malfa、Torr 与 Bibi（2023）在 FLORES-200 平行语料上度量了广泛使用的模型的分词器，发现同样的内容在某些语言中所需的词元可能比英语多出许多倍——他们报告的最坏情形约为 $15$ 倍——低资源语言和非拉丁文字受害最深，即便对字节级和字符级分词器也不例外。由于商用模型按词元计费、上下文窗口又按词元计长，这些语言的使用者要多付钱、上下文里装不下那么多文本、等响应的时间也更长；而且模型每个句子能从中学习的文本（按词元计）也更少。提出的缓解办法包括用更均衡的数据训练分词器、采用更大的词表、以及为对等性设计的分词器；Petrov 等人主张最后一种。

::: example 溢价的代价 {#ex-parity}
利用上面清单中的计数，计算法语、中文、俄语相对英语的分词溢价，并与英语比较：一个 $2{,}048$ 词元的上下文能装下多少份俄语句子。
::: solution
法语 $41/23 = 1.78$，中文 $57/23 = 2.48$，俄语 $127/23 = 5.52$。$2{,}048$ 词元的上下文能装下 $\lfloor2048/23\rfloor = 89$ 份英语句子，却只能装下 $\lfloor2048/127\rfloor = 16$ 份俄语句子。这些数字夸大了真实多语言分词器的处境，但机制是一样的——合并只在训练数据存在的地方被学到。
:::
:::

::: example 嵌入的参数 {#ex-embedding-params}
GPT-2 small 有 $\lvert\mathcal{V}\rvert = 50{,}257$、$d_{\text{model}} = 768$，输入嵌入矩阵与输出层共享。这个矩阵有多少个参数？占模型约 $124$ 百万个参数的多大比例？若词表为 $256{,}000$ 呢？
::: solution
$50{,}257\times768 = 38{,}597{,}376$，约为 $124$ 百万的 $31\%$。词表为 $256{,}000$ 时矩阵将有 $196.6$ 百万个参数，超过模型其余部分。对小模型来说，词表在参数预算中占很大份额；对有数十亿参数的模型来说占比很小——较大的模型倾向用较大的词表，这是原因之一。
:::
:::

::: history
Gage 的字节对编码（1994）本是一种压缩算法。为日语和韩语语音识别做词切分，促使 Schuster 与 Nakajima（2012）提出 WordPiece。Sennrich、Haddow 与 Birch 的《用子词单元对稀有词做神经机器翻译》（*Neural Machine Translation of Rare Words with Subword Units*，ACL 2016）让 BPE 成为给翻译模型提供开放词表的标准做法；Wu 等（2016）则在 Google 的生产级翻译系统中使用了 WordPiece。Kudo（2018）提出 unigram 分词器与子词正则化；Kudo 与 Richardson（2018）发布了 SentencePiece。Radford 等（2019）在 GPT-2 中使用字节级 BPE，这一设计经预切分方面的改进后为后来许多模型沿用。不经分词、直接在字节或字符上运作的模型，如 CANINE（Clark 等，2022）与 ByT5（Xue 等，2022），以及更晚的把字节聚合成变长块的字节级架构，仍是活跃的研究方向（2026 年时）。
:::

::: summary
- 分词器把文本映为固定词表中 id 的序列；它应当无损且完备。整词给出短序列但词表开放；字节给出 $256$ 个符号的封闭词表但序列很长；子词是折中。
- BPE 从字符（或字节）出发，贪心地合并出现最频繁的相邻符号对；每次满足 $a\ne b$ 的合并使训练语料缩短该符号对的次数那么多。编码新词时按学到的顺序依次应用合并即可。
- WordPiece 合并 $c(ab)/(c(a)c(b))$ 最高的符号对，编码用贪心最长匹配；unigram 模型给词元配上概率，用 Viterbi 动态规划编码，用 EM 与剪枝训练，并允许采样切分。
- 字节级 BPE（GPT-2：$256 + 50{,}000 + 1$ 个词元）与带字节回退的 SentencePiece 都不需要未知词元。
- 分词解释了在拼写、计数与算术上的奇怪失误、对空格与大小写的敏感，以及训练不足的"故障"词元。
- 同样的内容在某些语言中可能要多花许多倍的词元（Petrov 等，2023），影响价格、上下文与质量。
:::

## 习题

::: exercise 数符号 {level=1 check="95"}
[[#ex-bpe-hand]]的语料在任何合并之前共有多少个符号（字符与词尾标记，按重数计）？
::: solution
*low*：含 `</w>` 共 $4$ 个符号，乘 $5$ 得 $20$；*lower*：$6\times2 = 12$；*newest*：$7\times6 = 42$；*widest*：$7\times3 = 21$。共 $95$ 个。
:::
:::

::: exercise 三次合并之后 {level=1 check="68"}
前三次合并（`e s`、`es t`、`est </w>`）之后该语料还有多少个符号？
::: solution
每次合并涉及的两个符号不同，故由[[#prop-bpe]]，每次减少的长度等于它的次数 $9$：$95 - 27 = 68$。直接数：*low* $20$，*lower* $12$，*newest* 写作 `n e w est</w>` 为 $4\times6 = 24$，*widest* 写作 `w i d est</w>` 为 $4\times3 = 12$；$20 + 12 + 24 + 12 = 68$。
:::
:::

::: exercise 编码一个新词 {level=1 check="5"}
利用 BPE 清单打印的十次合并，编码 *slower*。它有几个词元（`</w>` 或作为词元的一部分、或自成一个词元，由合并决定）？
::: solution
`s l o w e r </w>`：第 1–3 次合并不适用（没有 `e s`）；第 4 次得 `lo`，第 5 次得 `low`；第 9 次需要 `low </w>`，而它并不出现。结果：`s`、`low`、`e`、`r`、`</w>`——$5$ 个词元。
:::
:::

::: exercise WordPiece 的一个得分 {level=2 check="1/17"}
在[[#ex-wordpiece]]中，计算 `##e ##s` 的 WordPiece 得分，并解释 BPE 与 WordPiece 为何对这个符号对的排序如此不同。
::: solution
$c(\texttt{\#\#e\ \#\#s}) = 9$，$c(\texttt{\#\#e}) = 17$，$c(\texttt{\#\#s}) = 9$，故得分为 $9/(17\cdot9) = 1/17 = 0.059$。BPE 把它排第一，因为 $9$ 是符号对计数的最大值；WordPiece 把它排得靠后，因为 `##e` 很常见、出现在许多别的符号对中，`##e` 后接 `##s` 并不比随机情形常见多少。
:::
:::

::: exercise 切分的概率 {level=2 check="0.02*0.005"}
用[[#ex-viterbi]]的词表计算 $P(\texttt{lo + west})$。Viterbi 对 *lowest* 的切分为何不是同样只用两个词元的 `lo + west`？
::: solution
$P = p(\texttt{lo})\,p(\texttt{west}) = 0.02\cdot0.005 = 0.0001$，而 $P(\texttt{low + est}) = 0.05\cdot0.04 = 0.002$，大二十倍。两者都是两个词元；unigram 模型偏好每个词元各自概率都更大的切分，而 `west` 在这个词表里是个罕见词元。
:::
:::

::: exercise 分词溢价 {level=2 check="127/23"}
由字节级 BPE 清单，计算俄语句子的分词溢价（相对英语）。解释它为何等于俄语句子的 UTF-8 长度与英语词元数之比。
::: solution
$127/23 = 5.52$。分词器没有学到任何涉及西里尔字节的合并（《白鲸记》中没有西里尔字母），而俄语词前的空格后跟的是西里尔字节，所以含前导空格的合并也永远用不上。每个字节都是自己的词元，俄语计数等于它的 UTF-8 长度 $127$ 字节（$69$ 个字符：$58$ 个西里尔字母每个两字节，$10$ 个空格和 1 个句号每个一字节，$116 + 11 = 127$）。
:::
:::

::: exercise 字节级的界 {level=2 check="4*20"}
一个字符串含 $20$ 个码位。字节级 BPE 分词器最多能把它切成多少个词元？何时达到？对一个词表包含整个字符串的分词器，最少可能是多少个词元？
::: solution
每个码位至多占 $4$ 个 UTF-8 字节，每个字节至少是一个词元，故至多 $80$ 个词元；当 $20$ 个码位全在 BMP 之外（例如表情符号）、且没有任何合并适用时达到。若整个字符串本身是一个词表词元、预切分又不把它切开，一个词元就够。
:::
:::

::: exercise 前向算法 {level=3 check="0.00229193168"}
修改[[#prop-viterbi]]的 Viterbi 递推以计算 $P(x) = \sum_{\mathbf{t}\in S(x)}P(\mathbf{t})$，实现它，并验证它在不枚举 $15$ 个切分的情况下给出[[#ex-viterbi]]的 $P(\textit{lowest})$。
::: solution
令 $\alpha(i) = \sum_{\mathbf{t}\in S(x_{1:i})}P(\mathbf{t})$，并取 $\alpha(0) = 1$。按最后一个词元拆开，$\alpha(i) = \sum_{j<i,\ x_{j+1:i}\in\mathcal{V}}\alpha(j)\,p(x_{j+1:i})$，因为概率是乘积，而$x_{1:j}$的切分之和可以提出来。

```python
p = {"l": 0.04, "o": 0.05, "w": 0.04, "e": 0.08, "s": 0.06, "t": 0.07,
     "lo": 0.02, "low": 0.05, "we": 0.01, "est": 0.04, "west": 0.005, "st": 0.03}
def forward(x, p, maxlen=4):
    alpha = [1.0] + [0.0] * len(x)          # alpha[i] = P(x[:i]) summed over segmentations
    for i in range(1, len(x) + 1):
        for j in range(max(0, i - maxlen), i):
            alpha[i] += alpha[j] * p.get(x[j:i], 0.0)
    return alpha
a = forward("lowest", p)
print([f"{v:.4g}" for v in a])
print(a[-1])
```

```text
['1', '0.04', '0.022', '0.05088', '0.00429', '0.0002574', '0.002292']
0.00229193168
```

$P(\textit{lowest}) = 0.00229193$，与枚举所得一致。在 EM 训练中，这一前向过程配上对应的后向过程，能在$O(n\ell)$时间内给出每个词元的期望使用次数，而不必在指数多个切分上求和。
:::
:::

::: exercise 合并省下的符号少于其计数时 {level=3}
(a) 证明：若 BPE 以滑动窗口方式对每个词统计符号对，则词 `a a a` 中的符号对 `a a` 被计两次，却只能合并一次。(b) 对 `a a a a`，从左到右的合并得到什么？相比计数它省下了多少个符号？(c) 解释为什么[[#prop-bpe]]的第 2 条对每个满足 $a\ne b$ 的符号对仍然成立。
::: solution
(a) 窗口是位置 $(1, 2)$ 和 $(2, 3)$，都是 `a a`：计数为 $2$。合并第一个窗口就用掉了中间的 `a`，所以只能替换一次：得到 `aa a`，省下 $1$ 个符号而不是 $2$ 个。(b) `a a a a` 的计数为 $3$；从左到右的扫描合并位置 $(1, 2)$ 与 $(3, 4)$，得到 `aa aa`，省下 $2$ 个，比计数少一个。(c) 当$a\ne b$时，$(a, b)$的各次出现不能共享符号，因为共享的符号必须既是$b$（前一次出现的后元）又是$a$（后一次出现的前元）。所以被计数的各次出现互不相交，全部会被替换。实现要么容忍重复符号的这种小出入，要么只统计不重叠的出现。
:::
:::

::: exercise 一个不最优的贪心分词器 {level=3}
WordPiece 用贪心最长匹配编码。构造一个词表和一个词，使得虽然存在由词表词元组成的切分，贪心最长匹配编码却失败（输出 `[UNK]`）。这对 WordPiece 编码与 unigram 模型的 Viterbi 编码之别说明了什么？
::: solution
取词表 $\{\texttt{a}, \texttt{ab}, \texttt{\#\#bc}, \texttt{\#\#d}\}$ 与词 *abcd*。贪心最长匹配取 `ab`（比 `a` 长），剩下 *cd*；没有 `##` 词元是 *cd* 的前缀，于是编码器放弃，整个词输出 `[UNK]`。然而 `a ##bc ##d` 是一个合法切分。贪心匹配不向前看就锁定了最长的首词元。[[#prop-viterbi]]的 Viterbi 递推对每个前缀都考虑所有可能的最后一个词元，所以只要存在切分它就一定能找到，并且找出其中在其得分下概率最大的一个。（实际的 WordPiece 词表同时含每个单字符的普通形式和 `##` 形式，所以这种失败在实践中很少见；但贪心编码仍可能比必要地多用词元。）
:::
:::
