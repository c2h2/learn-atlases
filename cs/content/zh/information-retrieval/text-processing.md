一位读者在一座数字图书馆的搜索框里输入 `rabbits`，这座图书馆收藏着刘易斯·卡罗尔（Carroll）的《爱丽丝梦游仙境》（*Alice's Adventures in Wonderland*）。全书从头到尾没有出现字符串 `rabbits`。它出现的是 `Rabbit`（首字母大写，因为那是白兔 White Rabbit）、`rabbit-hole`、`Rabbit's`，并且在一处出现了全大写的 `RABBIT`。一个逐字节比较的程序什么也找不到；而一位翻书的读者第一页就能找到白兔。在能够进行任何巧妙的排序（ranking）之前，搜索引擎必须先决定文本的**单元**是什么，以及两个单元什么时候算作同一个。这就是本章的主题。

我们将跟随一个文档从字节走到**词项**（term），词项正是索引所依据的单元。首先把字节解码为字符并规范化，使看上去完全相同的字符串比较相等；然后把字符流切分成**词元**（token），再经大小写折叠、停用词处理和**词干提取**把词元映射为词项，主算法是 Porter 词干提取器。这些步骤中的每一步都在查全率与查准率之间做交换，而且每一步都可能出人意料。本章后半部分度量产出结果：词项的频次服从**齐普夫定律**（Zipf's law），词表则按 **Heaps 定律**增长。我们把这两条定律拟合到公版书《爱丽丝》的全文上，并推导出影响其后每一章的结论——停用词为什么在索引中占据这么多空间，词表为什么有一半的词只出现一次，以及我们应当预期一本多大的词典。由词项搭建的数据结构——倒排索引——是 [[information-retrieval/inverted-indexes]] 的主题。

## 文档、字符与编码

::: definition 文档、文档集与信息需求 {#def-collection}
**文档**是检索系统返回的单元：依应用而定，可以是一个网页、一封电子邮件、一个段落、一个章节或一本书。**文档集**（或**语料库**）是系统要搜索的文档集合 $D = \set{d_1, \dots, d_N}$，$N = \abs{D}$。**信息需求**是用户想知道的东西；**查询**是用户对它的表达尝试，通常是几个词。一个文档**相关**，是指它满足信息需求——而不只是包含查询词。
:::

单元的选择很要紧。把《爱丽丝》当作一个文档建索引，则每个提到白兔的查询都会返回整本书；按 $12$ 个章节或大约 $800$ 个段落分别建索引，系统就能指出回答问题的那一段。网页搜索引擎按页建索引；邮件搜索按邮件建索引，但可能把附件另当别论；问答系统常常按几百词一段建索引。后续各章都假定单元已经选定。

### 从字节到字符

文件是一串字节。要把它当作文本读，我们需要它的**字符编码**。今天网络上几乎所有文本都用 **UTF-8**，它把每个 Unicode 码位编码为 $1$ 到 $4$ 个字节，并保持 ASCII 不变；较早的文档用 Latin-1、Windows-1252、Shift-JIS、GB 2312 等等，有时在头部声明（HTTP 的 `Content-Type`、HTML 的 `<meta charset>`），有时根本没有声明，这时只能靠字节统计去猜编码。猜错了，`café` 就变成了 `cafÃ©`，这份文档从此无法用它自己的词被找到。文档的结构也要紧：HTML 标记、脚本和导航菜单必须剥掉，或者当作单独的**字段**（标题、各级标题、正文、锚文本）处理，因为标题里的一个词比页脚里的一个词更能说明一个页面讲什么。字段将在 [[information-retrieval/probabilistic-retrieval]] 中再谈。

即便正确解码，同一个可见字符串在 Unicode 文本中也有多种表示。字母 é 既可以是一个码位（U+00E9，"LATIN SMALL LETTER E WITH ACUTE"），也可以是两个（U+0065 `e` 后跟 U+0301，一个组合尖音符）。连字 ﬁ（U+FB01）看起来像 `fi`；东亚文本常用的全角 Ａ（U+FF21）看起来像 `A`；① 是一个带圈数字一。

::: definition Unicode 规范化 {#def-normalisation}
Unicode 标准（附件 15）定义了**规范等价**——两个序列表示同一个抽象字符，例如预组合的 é 与 `e` + 组合尖音符——以及更弱的**相容等价**，它进一步把连字、全角形式、带圈数字之类的格式变体也视为相同。规范化形式 **NFC** 与 **NFD** 把一个字符串替换为其规范组合形式或规范分解形式；**NFKC** 与 **NFKD** 则对相容等价做同样的事。两个字符串规范等价，当且仅当它们的 NFC 形式相等。
:::

::: example 先规范化再比较 {#ex-unicode}
用 Python 演示 `café` 的两种编码作为字符串互不相等、规范化之后却相同，并看看 NFKC 与大小写折叠对一些棘手的字符串做了什么。
::: solution
```python
import unicodedata as u
a, b = "café", "café"          # 预组合 é，以及 e + 组合尖音符
print(a == b, len(a), len(b), u.normalize("NFC", b) == a)
print(u.normalize("NFKC", "ﬁnance"), "Straße".lower(), "Straße".casefold(),
      u.normalize("NFKC", "①"), u.normalize("NFKC", "ＡＢ"))
```
```text
False 4 5 True
finance straße strasse 1 AB
```
两个字符串看起来完全一样，却有 $4$ 个和 $5$ 个码位，在把两者都化入 NFC 之前比较不相等。NFKC 把连字变成 `fi`，把带圈的 $1$ 变成 `1`，把全角字母变成 ASCII。Python 的 `lower` 对德语 ß 无动于衷，而 `casefold`——Unicode 为不区分大小写匹配设计的**大小写折叠**——把它映射为 `ss`，于是 `Straße` 能与 `STRASSE` 匹配。索引器对文档和查询施加*同样*的规范化；选哪一种形式是设计决策，但对搜索而言，常见选择是 NFKC 加上大小写折叠。
:::
:::

## 分词

::: definition 词元、词型与词项 {#def-token}
**分词**把一个字符序列切分成**词元**，即被当作单元对待的字符序列实例（这里大致就是词）。**词型**是具有同一字符序列的所有词元组成的类。**词项**是写入索引词典的（可能经过规范化的）词型。文档集的**词表** $V$ 是它的词项集合，在不致混淆时我们也把 $V$ 的大小写作 $V$。文档集中词元的总数写作 $T$。
:::

句子 "the cat sat on the mat" 有 $6$ 个词元、$5$ 个词型（`the` 出现了两次）。`The` 与 `the` 是否算同一个词项取决于规范化，下面讨论。对英语来说，最直截了当的分词器——凡非字母处一律切开——已是一个不错的起点；本章用来处理《爱丽丝》的那个则保留词内撇号，使 `don't` 与 `Alice's` 保持完整：

```python
import re
from collections import Counter

text = open("alice.txt", encoding="utf-8").read()
text = text[text.index("CHAPTER I"):]          # 去掉书名页与古登堡计划说明
tokens = re.findall(r"[a-z]+(?:'[a-z]+)?", text.lower())
freq = Counter(tokens)
print(len(tokens), len(freq))
print(freq.most_common(8))
```
```text
26682 2630
[('the', 1642), ('and', 872), ('to', 729), ('a', 632), ('she', 541), ('it', 530), ('of', 514), ('said', 462)]
```

这里 `alice.txt` 是该书的古登堡计划（Project Gutenberg）纯文本版（公版书）；本章的每一个计数都是在它上面运行这几行得来的。按这个分词器，《爱丽丝》有 $T = 26\,682$ 个词元和 $2\,630$ 个词型。改一改正则表达式，两个数字都会变：在撇号处切开的分词器会把最常见的缩略式 `don't`（出现 $61$ 次）切成 `don` 和 `t`，还会从 `I'll`、`I've` 和 `Alice's` 里造出 `ll`、`ve`、`s` 这些"词"。

### 棘手的情形

简单规则会在平常的文本上碰壁：

- **撇号。** `O'Neill`、`don't`、`Alice's`、`rock 'n' roll`，还有古登堡版的引号——它用一个反引号和一个撇号（`` `and what is the use of a book,' ``）——闭引号不能粘在 `book` 上。
- **连字符。** `rabbit-hole` 是一个词项还是两个；`co-operate` 与 `cooperate` 大概应该匹配；印刷行末的连字符通常是排版的产物。
- **词元内部的标点。** `C++`、`C#`、`.NET`、`3.14`、`1,000,000`、`U.S.A.`、`e-mail`、`user@example.org`、`https://example.org/a?b=c`、`10:30`、`2026-10-27`。面向技术文本或网页文本的分词器会先识别这些模式再切分，因为搜索 `C++` 的用户不想要每一篇含字母 C 的文档。
- **大小写。** `Apple`（公司）与 `apple`、`US` 与 `us`、`Bush` 与 `bush` 意义不同，但大多数用户输入小写，所以大多数引擎还是照样折叠大小写、接受这一点损失。
- **没有空格的语言。** 中文和日文文本词间没有空格，德语、芬兰语、荷兰语则把复合词写成一个词（`Lebensversicherungsgesellschaft`，人寿保险公司）。系统要么用词典或统计模型做**分词**，要么对重叠的字符 $n$-gram 建索引（对中文通常取相邻两字），接受一些误匹配。

::: example 贪心切分出岔 {#ex-maxmatch}
**最大匹配**启发式切分无空格字符串的方法是：从当前位置起反复取出以该位置开头的、词典中最长的词（找不到就退化为单字符）。用词典 $\set{\texttt{a}, \texttt{able}, \texttt{bled}, \texttt{down}, \texttt{here}, \texttt{led}, \texttt{own}, \texttt{tab}, \texttt{table}, \texttt{the}, \texttt{theta}, \texttt{there}}$ 切分 `thetabledownthere`。
::: solution
位置 $0$ 处能以该处开头的词典词是 `the` 和 `theta`；最长的是 `theta`。剩下 `bledownthere`，最长匹配是 `bled`；接着 `ownthere` 给出 `own`，最后剩下 `there`。

```python
def maxmatch(s, D):
    out, i = [], 0
    while i < len(s):
        for j in range(len(s), i, -1):         # 先试最长的候选
            if s[i:j] in D or j == i + 1:
                out.append(s[i:j]); i = j; break
    return out
D = {"the", "theta", "table", "tab", "bled", "led", "down", "own", "there", "here", "a", "able"}
print(maxmatch("thetabledownthere", D))
```
```text
['theta', 'bled', 'own', 'there']
```
预期的读法 `the table down there` 同样能切分成词典词的序列，但开头贪心选定的 `theta` 再也撤不回来。配上好的词典，最大匹配在中文上出人意料地好用；不过正是这类错误，使得现代分词器对整体切分打分，常常像 [[algorithms/dynamic-programming]] 那样在词位置上跑动态规划，并利用词的概率。
:::
:::

::: warning "按空格切开"不是分词器
按空白切分会把标点粘住（`book,'` 和 `book` 成了不同词型），对中文什么也切不开，还把 `New York` 当成两个不相干的词。分词依赖于语言、也依赖于领域：化学名称、程序代码、带 `#话题标签` 和 `@提及` 的推文、法律引证的规则各不相同。最要紧的一条：**查询必须与文档完全同样地分词。** 若索引保留 `C++` 而查询解析器丢掉 `+`，查询 `C++` 就变成搜索 `c`，一个看上去再完美不过的索引也会失灵。
:::

[LLM 图谱](/learn/llm/lesson.php?c=text-and-language&l=tokenisation) 中的语言模型使用另一类分词——**子词**单元，从数据中学习而来，例如字节对编码，它把罕见词拆成片段、不需要针对语言的规则。它们的设计目标是给模型一个固定而小巧的词表，而不是定义匹配的单元；经典搜索引擎仍然按词分词。

## 从词元到词项

用户眼里"同一个词"的两个词元，通常应当映射到同一个词项。这个意义上的**规范化**给词元建立**等价类**：大小写折叠把 `Rabbit`、`RABBIT` 与 `rabbit` 放进同一类；去掉句点把 `U.S.A.` 归入 `USA`；去掉变音符号把 `naïve` 归入 `naive`。每个类由一个代表命名，即词项。另一条路是**查询扩展**：在索引里保持词元彼此区分，把查询 `rabbit` 展开成 `rabbit OR Rabbit OR rabbits`。扩展更灵活——可以是非对称的（查询 `window` 可以匹配 `windows`，但查询 `Windows` 也许不该匹配 `window`）——但会让查询变慢。

### 停用词

英语中最高频的词——`the`、`and`、`to`、`a`、`of`——几乎出现在每个文档里，几乎不说明文档讲什么。**停用词表**就是这样一个词集，从文档和查询中都把它丢弃。在《爱丽丝》中，$25$ 个最高频词型占了全部词元的 $38.1\%$，所以一张 $25$ 词的停用词表能把索引缩小三分之一以上。

尽管如此，现代网页搜索引擎仍然保留停用词，理由有三。压缩（[[information-retrieval/index-compression]]）使它们冗长的倒排列表变得廉价，因为包含 `the` 的相邻文档之间的间隙极小。tf–idf、BM25 这类排序函数自动就给这类词几乎为零的权重（[[information-retrieval/vector-space]]）。而且有些查询*恰恰*全由停用词构成、或依赖停用词：`to be or not to be`，乐队 `The The`，`flights to London` 与 `flights from London` 之别。停用词表存活于较小的系统中，也作为查询期的一种优化而存在。

### 词干提取与词形还原

`rabbit` 与 `rabbits`，`begin`、`began`、`begins`、`beginning` 与 `begun` 是同一个词的不同形态。语言学区分**屈折**（数、时态：`rabbit`/`rabbits`、`walk`/`walked`）与**派生**，后者造出新词（`relate` → `relation` → `relational`）。

::: definition 词干提取与词形还原 {#def-stemming}
**词干提取器**通过基于规则的后缀删除与改写把词元映射为**词干**；词干不一定是词（`ponies` → `poni`）。**词形还原器**利用词表与形态分析（常常连同词性）把词元映射为它的**原形**（lemma），即词典形式（`began` → `begin`，`better` → `good`）。两者都是多对一映射，用来构成词元的等价类。
:::

英语中最著名的词干提取器是马丁·波特（Porter）1980 年的算法。它用一个词的辅音—元音模式来刻画这个词。

::: definition Porter 度量 {#def-porter-measure}
除 `a e i o u` 之外的字母是**辅音**，但 `y` 跟在辅音后时是元音。用 $C$ 表示一段极长的辅音连串、$V$ 表示一段极长的元音连串，每个词都有形式 $[C](VC)^m[V]$，方括号表示"可有可无"。数 $m$ 称为词的**度量**：元音连串后紧跟辅音连串的次数。
:::

例如 `tr`、`tree`、`by` 的 $m = 0$；`trouble`、`oats`、`ivy` 的 $m = 1$；`troubles`、`private`、`orrery` 的 $m = 2$。度量近似词尾之前的音节数，波特用它来避免从本就短小的词上剥后缀：`-ate` 从 `activate` 里删除，却不从 `plate` 里删。算法由五步规则组成，每条规则形如"（条件）$S_1 \to S_2$"：若词以后缀 $S_1$ 结尾，且其前面部分（候选词干）满足条件，就把 $S_1$ 替换为 $S_2$。在同一步内，只有 $S_1$ 匹配最长的那条规则生效。

::: algorithm Porter 词干提取器，第 1 步（复数与 -ed, -ing） {#alg-porter1}
设 $w$ 为小写的词；$*v*$ 表示"词干含元音"，$*d$ 表示"词干以重复辅音结尾"，$*o$ 表示"词干以辅音–元音–辅音结尾，末位不是 `w`、`x`、`y`"。
1. **第 1a 步。** 应用第一条匹配的规则：`sses` → `ss`；`ies` → `i`；`ss` → `ss`；`s` →（空）。
2. **第 1b 步。** 若 $w$ 以 `eed` 结尾：当词干满足 $m > 0$ 时替换为 `ee`，然后结束。否则，若 $w$ 以 `ed` 或 `ing` 结尾且词干满足 $*v*$，先删去后缀，然后：
   1. 若结果以 `at`、`bl` 或 `iz` 结尾，加 `e`；
   2. 否则若 $*d$ 且重复的字母不是 `l`、`s`、`z`，删去重复字母之一；
   3. 否则若 $m = 1$ 且 $*o$，加 `e`。
3. 第 1c 至 5 步（未列出）把含元的词干末尾的 `y` 变成 `i`，在 $m > 0$ 下把派生后缀如 `ational` → `ate`、`iveness` → `ive`，在 $m > 1$ 下删除 `-al`、`-ance`、`-ment` 等，并整理词尾的 `e` 与词尾的 `ll`。
:::

```python
def is_cons(w, i):                     # Porter 的辅音判别；辅音后的 y 是元音
    if w[i] in "aeiou": return False
    if w[i] == "y": return i == 0 or not is_cons(w, i - 1)
    return True

def measure(stem):                     # [C](VC)^m[V] 中的 m
    pattern = "".join("c" if is_cons(stem, i) else "v" for i in range(len(stem)))
    return pattern.count("vc")         # 每次元音到辅音的变化对应一个 VC

def has_vowel(stem):
    return any(not is_cons(stem, i) for i in range(len(stem)))

def cvc(w):                            # 以辅-元-辅结尾，末位不是 w、x、y
    return (len(w) >= 3 and is_cons(w, len(w) - 3) and not is_cons(w, len(w) - 2)
            and is_cons(w, len(w) - 1) and w[-1] not in "wxy")

def step1(w):
    for suf, rep in (("sses", "ss"), ("ies", "i"), ("ss", "ss"), ("s", "")):   # 第 1a 步
        if w.endswith(suf):
            w = w[: len(w) - len(suf)] + rep; break
    if w.endswith("eed"):                                                    # 第 1b 步
        if measure(w[:-3]) > 0: w = w[:-1]
        return w
    for suf in ("ed", "ing"):
        if w.endswith(suf) and has_vowel(w[: -len(suf)]):
            w = w[: -len(suf)]
            if w.endswith(("at", "bl", "iz")): return w + "e"
            if len(w) > 1 and w[-1] == w[-2] and is_cons(w, len(w) - 1) and w[-1] not in "lsz":
                return w[:-1]
            if measure(w) == 1 and cvc(w): return w + "e"
            return w
    return w
```

在波特论文中的例子上运行，可以复现他发表的结果：

```text
caresses->caress ponies->poni ties->ti caress->caress cats->cat feed->feed agreed->agree
plastered->plaster bled->bled motoring->motor sing->sing conflated->conflate
troubled->trouble sized->size hopping->hop tanned->tan falling->fall hissing->hiss
fizzed->fizz failing->fail filing->file
```

::: example 追踪第 1 步 {#ex-porter-trace}
对 `hopping`、`hoping`、`feed`、`bled` 与 `meetings` 应用第 1 步，给出生效的规则，以及在要紧处的度量。
::: solution
- `hopping`：第 1a 步无事发生。它以 `ing` 结尾，词干 `hopp` 含元音 `o`，删去 `ing`：`hopp`。它以重复辅音 `pp` 结尾（不是 `l`、`s`、`z`），删去一个：**`hop`**。
- `hoping`：删去 `ing`（词干 `hop` 含元音）得 `hop`。没有 `at`/`bl`/`iz`，没有重复辅音。`hop` 的度量是 $1$（模式 $cvc$，一个 $vc$），且以辅音–元音–辅音结尾、末位是 `p`，于是加 `e`：**`hope`**。这两条规则把 `hopping` 与 `hoping` 区分开来。
- `feed`：以 `eed` 结尾；词干 `f` 的 $m = 0$，所以什么都不做：**`feed`**。（`agreed` 的词干 `agr` 的 $m = 1$，变成 `agree`。）
- `bled`：以 `ed` 结尾，但词干 `bl` 没有元音，规则不生效：**`bled`**。若没有这个元音条件，`bled` 会变成非词 `bl`。
- `meetings`：第 1a 步删 `s` 得 `meeting`；第 1b 步删 `ing`（词干 `meet` 含元音）得 `meet`；`meet` 以 `e` 后的 `t` 结尾——不是重复辅音——且以元音–元音–辅音结尾，故 $*o$ 不成立：**`meet`**。
:::
:::

词干提取是粗糙的。Porter 把 `university` 与 `universe` 都映射为 `univers`，把 `organization` 与 `organ` 都映射为 `organ`（这类合并伤害查准率），却让 `alumnus` 与 `alumni`、`matrices` 与 `matrix` 彼此分立（这类失配伤害查全率）。它对检索质量的影响已被测量过许多次，效果有限：对英语，词干提取通常让平均水平好一点，主要体现在查全率上，却让某些查询糟很多。对芬兰语、匈牙利语、土耳其语这类形态丰富的语言，一个名词可有几百种形态，它的帮助就大得多。波特后来又写了专为词干提取器设计的 **Snowball** 语言；如今大多数开源搜索引擎用的正是几十种语言的 Snowball 词干提取器，其中包括修订过的英语提取器（"Porter2"）。词形还原更准确，但需要词典和词性标注，而在实验中，它对检索相对优秀词干提取器的优势很小。

::: quiz
下面哪一项是大多数网页搜索引擎*不*从索引中去除停用词的主要原因？
- [ ] 停用词很罕见，索引它们不费什么。
- [x] 有些查询离不开它们，而压缩与词加权让保留它们既便宜又无害。
- [ ] 词干提取已经把它们去掉了。
- [ ] 停用词的 idf 很高，对排序有利。
::: solution
停用词是*最*常见的词，所以它们的倒排列表很长；但倒排条目之间的间隙极小，压缩后每条大约一字节甚至更少，而加权方案给它们的权重接近零（它们的逆文档频率很低，不是很高）。像 `to be or not to be` 或 `flights to London` 这样的查询离不开它们，所以引擎保留它们并高效处理。
:::
:::

## 文本的统计

《爱丽丝》的 $26\,682$ 个词元在它的 $2\,630$ 个词型上是如何分布的？把词型按频次递减排序，给最高频者名次 $1$，再看名次与频次的乘积：

| 名次 $r$ | 词项 | 频次 $f_r$ | $r \cdot f_r$ |
|---:|---|---:|---:|
| $1$ | the | $1642$ | $1642$ |
| $2$ | and | $872$ | $1744$ |
| $3$ | to | $729$ | $2187$ |
| $5$ | she | $541$ | $2705$ |
| $10$ | alice | $386$ | $3860$ |
| $20$ | with | $180$ | $3600$ |
| $50$ | herself | $83$ | $4150$ |
| $100$ | never | $48$ | $4800$ |
| $200$ | anything | $20$ | $4000$ |
| $500$ | surprised | $7$ | $3500$ |
| $1000$ | pieces | $3$ | $3000$ |

（频次相同的词型按首次出现排序；低频处并列很多，那一段的名次多少有些任意。）频次跌落了近 $500$ 倍，乘积 $r f_r$ 却只在三倍范围之内波动。

::: definition 齐普夫定律 {#def-zipf}
若名次为 $r$ 的词项的频次近似为
$$
f_r \approx \frac{C}{r^{s}}
$$ {#eq-zipf}
对某个常数 $C$ 和指数 $s > 0$ 成立，则称该文档集服从**齐普夫定律**；经典形式取 $s = 1$，于是 $r \cdot f_r$ 大致是常数。等价地，$\log f_r \approx \log C - s \log r$：在双对数坐标上，频次对名次是一条斜率为 $-s$ 的直线。
:::

齐普夫定律是一条经验规律，不是定理：它是关于真实文本的**观察**，只在近似意义下成立，指数取决于文本和分词器。对点 $(\log_{10} r, \log_{10} f_r)$ 作最小二乘拟合（方法见 [Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression)）得到：

```python
import math
def fit(xs, ys):                       # 最小二乘直线 y = a + b x
    n = len(xs); mx = sum(xs) / n; my = sum(ys) / n
    b = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return my - b * mx, b

ranked = freq.most_common()
for lo, hi in ((1, len(ranked)), (10, 1000)):
    xs = [math.log10(r) for r in range(lo, hi + 1)]
    ys = [math.log10(ranked[r - 1][1]) for r in range(lo, hi + 1)]
    a, b = fit(xs, ys)
    print(f"Zipf fit ranks {lo}-{hi}: log10 f = {a:.3f} {b:+.3f} log10 r")
```
```text
Zipf fit ranks 1-2630: log10 f = 4.045 -1.210 log10 r
Zipf fit ranks 10-1000: log10 f = 3.884 -1.132 log10 r
```

全部名次的拟合指数为 $s \approx 1.21$，中间名次 $10$ 到 $1000$（定律拟合得最好的区段）为 $s \approx 1.13$。在头部，最高频的寥寥几个词比直线平缓（`the` 得出现得更频繁才落得直线上）；在尾部，频次 $1, 2, 3, \dots$ 的台阶和并列名次之间的任意次序都会扭曲拟合。在双对数轴上作最小二乘拟合在统计上也很粗糙——它给上千个罕见词型与高频词型同等的权重——更好的估计方法确实存在；但这是标准的初步观察。

::: widget regression
points: 0.00,3.22; 0.30,2.94; 0.70,2.73; 1.00,2.59; 1.30,2.26; 1.70,1.92; 2.00,1.68; 2.30,1.30; 2.70,0.85; 3.00,0.48; 3.30,0.00
degree: 1
x: -0.2, 3.6
y: -0.3, 3.6
caption: 《爱丽丝》中的齐普夫定律：名次 $1, 2, 5, 10, \dots, 1000, 2000$ 的频次的 $\log_{10}$ 对名次的 $\log_{10}$。最小二乘直线的斜率约为 $-1.2$。拖动前两个点（名次 $1$ 与 $2$），看看寥寥几个高频词对拟合指数的拉扯有多大；再看右边的点在直线下方发生弯折，那里每个词型只出现一两次。
:::

齐普夫定律为何成立仍有争议。齐普夫（Zipf）用说话人与听话人之间取得平衡的"最小努力原理"来解释它；西蒙（Simon）从一个"富者愈富"过程导出了它：新词以恒定速率出现，旧词按其历史使用量成比例地被复用；而米勒（Miller）观察到，就连一只猴子随机按键打出的文本（空格键也算一个键）也给出关于名次的幂律。我们不需要解释——只需要推论，它们从这一定律作为模型即可导出。

### 齐普夫定律的推论

::: proposition 频次谱 {#prop-spectrum}
设 $f_r = C/r$ 精确成立（$s = 1$ 的齐普夫定律），把名次当连续量处理。则恰好出现 $k$ 次的词型个数近似为
$$
V_k \approx \frac{C}{k(k+1)}.
$$
若最罕见的词型出现一次，则 $C \approx V$，恰好出现 $k$ 次的词型占比为 $1/(k(k+1))$：一半的词型出现一次，六分之一出现两次，十二分之一出现三次。
:::

::: proof
词型的频次至少为 $k$，恰当其名次满足 $C/r \ge k$，即 $r \le C/k$，所以大约有 $C/k$ 个词型的频次至少为 $k$。频次恰好为 $k$ 的词型，就是频次至少为 $k$ 但不至少为 $k + 1$ 的那些：
$$
V_k \approx \frac{C}{k} - \frac{C}{k+1} = \frac{C}{k(k+1)}.
$$
名次最大（$V$）的词型频次为 $C/V$；令其为 $1$ 得 $C = V$，于是 $V_k / V \approx 1/(k(k+1))$，对 $k = 1, 2, 3$ 分别是 $1/2$、$1/6$、$1/12$。
:::

在《爱丽丝》中，$2\,630$ 个词型里有 $1\,143$ 个（$43.5\%$）恰好出现一次——它们叫**偶见词**（hapax legomena，"仅一说者"）——出现两次的有 $409$ 个，预测值则为 $1\,315$ 和 $438$。预测粗略，因为真实指数大于 $1$，但定性结论站得住：任何文档集词表的一大块都由只见过一次的词组成——罕见的名字、拼错的词、数字、外语词——而搜索引擎必须把它们每一个都索引起来，因为用户偏偏要搜罕见的词，正是因其有区分力。

::: proposition 最高频词项的份额 {#prop-topk}
在 $s = 1$、词表大小为 $V$ 的齐普夫定律下，$k$ 个最高频词项占据全部词元的比例
$$
\frac{\sum_{r=1}^{k} C/r}{\sum_{r=1}^{V} C/r} = \frac{H_k}{H_V} \approx \frac{\ln k + 0.5772}{\ln V + 0.5772}
$$
其中 $H_n = 1 + \tfrac12 + \dots + \tfrac1n$ 是第 $n$ 个调和数。
:::

::: proof
名次为 $r$ 的词项有词元 $C/r$ 个，故头部 $k$ 个词项贡献 $C H_k$ 个词元，总量为 $C H_V$；常数相消。近似用到 $H_n = \ln n + \gamma + O(1/n)$，其中欧拉（Euler）常数 $\gamma \approx 0.5772$。
:::

::: example 前 100 个词覆盖多少？ {#ex-top100}
用 [[#prop-topk]] 预测《爱丽丝》中 $100$ 个最高频词型占词元的份额，并与实测值比较。
::: solution
$H_{100} = 5.1874$，$H_{2630} = 8.4521$，故预测为 $5.1874 / 8.4521 = 0.614$。实测：$100$ 个最高频词型占 $26\,682$ 个词元的 $59.2\%$。也就是说，大约 $100$ 个词——词表的 $3.8\%$——构成了正文的五分之三。因此索引未压缩时的大小由这几个词项的倒排条目主导：这正是停用词表曾经显得可取的原因，也是长而稠密列表的压缩（[[information-retrieval/index-compression]]）如此要紧的原因。
:::
:::

$H_V$ 的对数增长还有一个不那么显眼的推论：随着文档集增大、$V$ 增大，任一固定高频词集的份额会*缓慢下降*，因为越来越多的词元归了罕见词的长尾。

### Heaps 定律：词表增长多快

一个有 $T$ 个词元的文档集，应当预期有多少个不同词项？从头读《爱丽丝》，每读 $2\,000$ 个词元数一次不同词型：

| 已读词元 $T$ | $2000$ | $6000$ | $10\,000$ | $14\,000$ | $18\,000$ | $22\,000$ | $26\,682$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| 词型 $V(T)$ | $586$ | $1166$ | $1534$ | $1861$ | $2129$ | $2347$ | $2630$ |

词表不断增长——每一章都有新词出现，比如新角色的名字——但增长得越来越慢。

::: definition Heaps 定律 {#def-heaps}
若读入 $T$ 个词元后的词表大小近似为
$$
V(T) \approx K\, T^{\beta}
$$ {#eq-heaps}
对常数 $K > 0$ 和 $0 < \beta < 1$ 成立，则称该文档集服从 **Heaps 定律**（也称 Herdan 定律）。对英语文本，典型的取值是 $10 \le K \le 100$、$0.4 \le \beta \le 0.6$。与齐普夫定律一样，它是一条经验观察。
:::

取对数，$\log V = \log K + \beta \log T$，又是一条直线。对《爱丽丝》的 $14$ 个检查点（每 $2\,000$ 词元一个，外加结尾）作最小二乘拟合：

```text
Heaps fit: K = 7.79, beta = 0.572
```

即 $V(T) \approx 7.79\, T^{0.572}$；在全文长度上给出 $7.79 \times 26\,682^{0.572} \approx 2\,651$，与真值 $2\,630$ 很接近。

::: widget regression
points: 3.301,2.768; 3.602,2.949; 3.778,3.067; 3.903,3.130; 4.000,3.186; 4.079,3.236; 4.146,3.270; 4.204,3.299; 4.255,3.328; 4.301,3.348; 4.342,3.371; 4.380,3.395; 4.415,3.411; 4.426,3.420
degree: 1
x: 3.2, 4.5
y: 2.7, 3.5
caption: 《爱丽丝》中的 Heaps 定律：每 $2\,000$ 词元处的 $\log_{10} V$ 对 $\log_{10} T$。直线的斜率即指数 $\beta \approx 0.57$，截距为 $\log_{10} K \approx 0.89$。试试二次：点略微向下弯，这说明在短范围内单一幂律只是近似。
:::

::: example 给词典定规模 {#ex-heaps}
用对《爱丽丝》的拟合，估计一百万词元的同类文本的词表大小。再说明文本要增长多少倍词表才能翻倍。
::: solution
$V(10^6) \approx 7.79 \times (10^6)^{0.572} = 7.79 \times 10^{3.432} \approx 21\,000$ 个词项。词表翻倍需要 $K (cT)^\beta = 2 K T^\beta$，即 $c^\beta = 2$，$c = 2^{1/\beta} = 2^{1/0.572} \approx 3.36$：文本要增长三倍以上。把用 $27\,000$ 词元做出的拟合外推到一百万是有风险的——换一个作者或主题，新词会来得更快——但对系统设计要紧的两个结论是稳健的。词表永不停止增长（没有一本可以预先装下的现成词典），而且比文本本身增长慢得多，大致像平方根那样，所以即便极大文档集的词典与它的倒排列表相比也很小。一个 $10^{11}$ 词元的文档集，若 $K = 44$、$\beta = 0.49$——新闻报道文档集上报告的取值——大约有 $44 \times 10^{5.39} \approx 1100$ 万个词项。
:::
:::

::: quiz
一个 $10^8$ 词元的文档集服从 $\beta = 0.5$ 的 Heaps 定律。它增长到 $10^{10}$ 词元。词表增长几倍？
- [ ] $100$
- [x] $10$
- [ ] $2$
- [ ] 不增长：一种语言的词表是固定的。
::: solution
$V \propto T^{0.5}$，把 $T$ 乘 $100$ 就把 $V$ 乘 $100^{0.5} = 10$。真实文档集的词表不断增长——名字、数字、错别字、新词——只是比文本慢得多。
:::
:::

Heaps 定律与齐普夫定律有联系。若词元是按指数 $s > 1$ 的齐普夫分布独立抽出的，读入 $T$ 词元后的词表将按 $T^{1/s}$ 增长（[[#ex-heaps-zipf]]）。真实文本不是独立抽样的序列：词是**爆发式**出现的——`Gryphon` 一旦出现，就会在同一章里出现很多次——这在《爱丽丝》里看得见。把 $26\,682$ 个词元洗成一个随机次序（洗一次，固定种子）（使每一次抽取都独立于该书自己的词分布），头 $2\,000$ 个词元后的词表数从 $586$ 变成 $672$：在真实书里，一个词的第二次提及比随机所预言的来得早，早期新词到达得更慢。爆发式聚集将在 [[information-retrieval/probabilistic-retrieval]] 中再次出现，作为 BM25 饱和词频的动机。

::: widget plot
f: 10^4 / x^s; 4000 / x
sliders: s=0.6:0.05:1.6
x: 1, 100
y: 0, 5000
labels: C/r^{s},\ C = 10^4; 4000/r
caption: 普通（线性）坐标轴上的齐普夫曲线 $f_r = C/r^s$，$C = 10\,000$，与旁边 $C = 4000$、$s = 1$ 的经典曲线。在线性坐标上，幂律像一个尖角：寥寥几个名次承载着大部分质量，一条长尾上的名次各扛一小点。拖动 $s$ 增大——头部变尖、尾巴变薄；$s$ 接近 $0.6$ 时，尾巴握住大多数词元。
:::

::: history
词频的统计规律性最早由法国速记员让-巴蒂斯特·伊斯图普（Jean-Baptiste Estoup）在 1916 年和爱德华·康登（Edward Condon）在 1928 年注意到，但以哈佛语言学家乔治·金斯利·齐普夫（George Kingsley Zipf）命名，他在《语言的心理生物学》（*The Psycho-Biology of Language*，1935）与《人类行为与最小努力原理》（*Human Behavior and the Principle of Least Effort*，1949）中跨语言记录了这些规律。IBM 的汉斯·彼得·卢恩（Hans Peter Luhn）在《文献摘要的自动生成》（"The automatic creation of literature abstracts"，*IBM Journal of Research and Development*，1958）中利用词频论证：最能指示文档内容的词，既不是最频繁的，也不是最罕见的。古斯塔夫·赫尔丹（Gustav Herdan）在《型—例数学》（*Type–Token Mathematics*，1960）中描述了词表增长；哈罗德·赫普（Harold Heaps）在《信息检索：计算与理论方面》（*Information Retrieval: Computational and Theoretical Aspects*，1978）中给出了检索中使用的形式。朱莉·贝思·洛文斯（Julie Beth Lovins）1968 年发表了第一个英语词干提取器；马丁·波特的《一种后缀剥离算法》（"An algorithm for suffix stripping"，*Program*，1980）成为标准；波特的 Snowball 框架约在 2001 年跟进。Unicode 1.0 发布于 1991 年，肯·汤普森（Ken Thompson）与罗布·派克（Rob Pike）1992 年设计的 UTF-8 编码如今承载着网络上几乎全部文本。
:::

## 实践

Lucene（以及在其上构建的 Elasticsearch 与 OpenSearch）与 Tantivy 这类开源引擎，把文本处理表达为一条**分析链**：一个字符过滤器（剥 HTML、字符映射），一个分词器（常常是 Unicode 附件 29 的词边界规则，对大多数使用空格的语言大体够用），以及若干词元过滤器（转小写或大小写折叠、停用词、Snowball 词干提取器、同义词）。不同的字段走不同的链——标识符字段不做词干提取，标题字段也许会——查询对每个字段都施以同一条链。截至 2026 年，中、日、韩文的分析通常用基于词典或统计的分词器，或字符二元 $n$-gram。系统还会索引比词干更多的东西：许多系统同时保留精确词元，于是带引号的短语查询可以要求精确形态，而普通查询匹配词干。

设计原则是：每一步都是关于哪些词元等价的决策，而每个决策都在某些查询上赢得查全率、在另外一些查询上输掉查准率。度量净效果需要 [[information-retrieval/evaluation]] 的方法，用在系统实际收到的查询上。

## 后续内容

本章产出的词项将成为倒排索引（[[information-retrieval/inverted-indexes]]）的键——那个把每个词项映射到含它的文档的数据结构——可以用 [[data-structures/hash-tables]] 的哈希表或一个有序词典来构建。齐普夫定律解释那个索引的形状——几条庞大的倒排列表，外加数百万条极小的——Heaps 定律解释其词典大小；两者都用在 [[information-retrieval/index-compression]] 中。文档内的词频与文档集上的文档频率，则成为 [[information-retrieval/vector-space]] 与 [[information-retrieval/probabilistic-retrieval]] 中排序的原料。子词分词与词嵌入彻底绕开手写规则，在 [LLM 图谱](/learn/llm/lesson.php?c=text-and-language&l=word-embeddings) 中展开，并将在 [[information-retrieval/dense-retrieval]] 中回归。

::: summary
- 文本处理把字节变成**词项**：解码编码、Unicode 规范化（NFC 或 NFKC）并折叠大小写、分词，再按等价类把词元映射为词项（[[#def-normalisation]]、[[#def-token]]）。
- 分词依赖语言与领域：撇号、连字符、`C++`、URL、不分词的语言都需规则；文档与查询**必须**被完全同样地处理。
- 停用词表去掉高频词，但现代引擎保留它们，因为压缩与加权使它们廉价无害，且有些查询需要它们。
- Porter 等词干提取器（[[#alg-porter1]]）利用度量 $m$（[[#def-porter-measure]]）剥离后缀；它们用偶尔的查准率损失换来有限的查全率增益，在形态丰富的语言上帮助最大。
- **齐普夫定律** $f_r \approx C/r^s$（[[#def-zipf]]）近似拟合真实文本（《爱丽丝》中 $s \approx 1.1$–$1.2$）：少数词项主导词元（[[#prop-topk]]），约一半词型只出现一次（[[#prop-spectrum]]）。
- **Heaps 定律** $V \approx K T^\beta$（[[#def-heaps]]），$\beta \approx 0.4$–$0.6$：词表无界增长但亚线性（《爱丽丝》中 $\beta \approx 0.57$）。
- 两条定律都是指导系统设计的经验观察；它们不是定理，参数取决于文本与分词器。
:::

## 习题

::: exercise 词元与词型 {level=1 check="7"}
对 `The cat sat on the mat with the other cat.` 按非字母切分并折叠大小写。有多少个词型？（填入词型数。）
::: solution
词元是 `the cat sat on the mat with the other cat`：$10$ 个。词型是 `the`（$3$ 次）、`cat`（$2$ 次）、`sat`、`on`、`mat`、`with`、`other`：$7$ 个。若不折叠大小写，`The` 与 `the` 是不同词型，将是 $8$ 个。
:::
:::

::: exercise Porter 度量 {level=1 check="4"}
计算 `relational` 的 Porter 度量 $m$。（填入 $m$。）
::: solution
逐字母标注：r($c$) e($v$) l($c$) a($v$) t($c$) i($v$) o($v$) n($c$) a($v$) l($c$)。模式为 $cvcvcvvcvc$，分组为 $C(VC)(VC)(VC)(VC)$：元音到辅音的变化是 e→l、a→t、o→n、a→l，故 $m = 4$。运行上面程序清单中的 `measure("relational")` 打印 `4`。完整算法的第 2 步会按规则 $(m > 0)$ `ational` → `ate` 把 `relational` 变成 `relate`。
:::
:::

::: exercise 手做第 1 步 {level=1}
对 `rating`、`controlling`、`sky` 与 `yes` 应用 Porter 词干提取器的第 1 步（[[#alg-porter1]]）。解释每个结果。
::: solution
- `rating`：删 `ing`（词干 `rat` 含元音）得 `rat`。结果以 `at` 结尾，第一条子规则生效，加 `e`：`rate`。
- `controlling`：删 `ing` 得 `controll`；它以重复辅音结尾，但字母是 `l`，被排除在外，故保持 `controll`（第 5b 步稍后会删去一个 `l`，得 `control`）。
- `sky`：第 1 步没有规则适用（没有 `s`、`ed`、`ing`），`sky` 不变；$m = 0$，因为 `y` 在辅音 `k` 之后是元音，模式为 $ccv$。
- `yes`：第 1a 步删去词尾 `s`，得 `ye`——这提醒我们词干不一定是词，且极短的词会被过度提取。程序清单打印 `rate`、`controll`、`sky` 与 `ye`。
:::
:::

::: exercise 频次为四 {level=2 check="2630/20"}
用 [[#prop-spectrum]]，取 $C = V = 2630$，预测《爱丽丝》中恰好出现四次的词型个数。（原样填入预测值。）实际个数是 $149$；评论一下。
::: solution
$V_4 \approx V/(4 \cdot 5) = 2630/20 = 131.5$。实际计数 $149$ 更高；$k = 1$ 时预测偏高（$1315$ 对 $1143$）。两处偏差说的是同一件事：真实频次谱在最底部比 $s = 1$ 模型更平坦，所以出现一次的词型比模型少、出现几次的比模型多。换成一般指数 $s$，同样的论证给出 $V_k \propto k^{-1/s} - (k+1)^{-1/s}$。
:::
:::

::: exercise 词表翻倍 {level=2 check="2^(1/0.572)"}
在 Heaps 定律 $V = K T^{0.572}$ 下，词元数要增长几倍词表才能翻倍？（填入倍数。）
::: solution
由 $K(cT)^{0.572} = 2KT^{0.572}$ 得 $c^{0.572} = 2$，故 $c = 2^{1/0.572} \approx 3.36$。一般地，指数为 $\beta$ 时倍数是 $2^{1/\beta}$：$\beta = 1/2$ 时约为 $4$，$\beta$ 越小倍数越大。
:::
:::

::: exercise 前 25 个词 {level=2}
用 [[#prop-topk]] 预测《爱丽丝》（$V = 2630$）中 $25$ 个最高频词型占词元的份额。实测份额为 $38.1\%$。用拟合指数解释偏差的方向。
::: solution
$H_{25} = 3.8160$，$H_{2630} = 8.4521$，故预测为 $3.8160 / 8.4521 = 0.451$，即 $45\%$。实测的 $38.1\%$ 更低。在名单顶部，真实频次跌落得*比*按全范围拟合的直线*更缓*：`the` 得出现得多得多，$r f_r$ 才能是常数（比较名次 $1$ 处的 $r f_r = 1642$ 与更下面的约 $4000$）。所以头部扛着的质量份额低于纯幂律所给的。因此常用对头部拟合更好的模型，例如曼德尔布罗特（Mandelbrot）的 $f_r = C/(r + q)^s$（平移 $q > 0$）。
:::
:::

::: exercise 由齐普夫导出 Heaps {#ex-heaps-zipf level=3}
设每个词元从无界词表上的固定分布独立抽出，名次 $r$ 的词项概率为 $p_r = r^{-s}/\zeta(s)$，其中 $s > 1$，$\zeta(s) = \sum_{r \ge 1} r^{-s}$。证明 $T$ 个词元后的期望词表大小满足 $\E[V(T)] = \Theta(T^{1/s})$，从而这类模型预言出 $\beta = 1/s$ 的 Heaps 定律。与《爱丽丝》比较。
::: hint
$\E[V(T)] = \sum_r \bigl(1 - (1 - p_r)^T\bigr)$。在 $T p_r = 1$ 的名次 $r^*$ 处拆分求和。
:::
::: solution
词元 $T$ 个之后词项 $r$ 进入词表，除非 $T$ 次抽取全部错过它；由期望的线性性，$\E[V(T)] = \sum_{r \ge 1} \bigl(1 - (1 - p_r)^T\bigr)$。令 $r^* = (T/\zeta(s))^{1/s}$，即满足 $T p_r = 1$ 的名次。

*上界。* 每一项至多为 $1$，也至多为 $T p_r$（伯努利不等式 $(1 - p)^T \ge 1 - Tp$）。于是
$$
\E[V(T)] \le r^* + \sum_{r > r^*} T p_r \le r^* + \frac{T}{\zeta(s)} \int_{r^* - 1}^{\infty} x^{-s}\,dx = r^* + \frac{T}{\zeta(s)} \frac{(r^*-1)^{1-s}}{s - 1} = O(r^*),
$$
因为 $\frac{T}{\zeta(s)} (r^*)^{1 - s} = (r^*)^s (r^*)^{1-s} = r^*$。

*下界。* 对 $r \le r^*$ 有 $p_r \ge 1/T$，故 $(1 - p_r)^T \le (1 - 1/T)^T \le e^{-1}$，该项至少 $1 - e^{-1}$。于是 $\E[V(T)] \ge (1 - e^{-1}) \lfloor r^* \rfloor$。

合起来，$\E[V(T)] = \Theta(r^*) = \Theta(T^{1/s})$，即 $\beta = 1/s$ 的 Heaps 定律。对《爱丽丝》，$s \approx 1.13$–$1.21$ 将预言 $\beta \approx 0.83$–$0.88$，远高于实测的 $0.57$。模型失败，因为真实文本不是独立序列：它是爆发式的，其词表也不是从固定分布抽出的——一章会引入新角色与新话题。即便是洗过的那本书——它是对《爱丽丝》自身有限词表的独立抽取——拟合出的 $\beta$ 也只有约 $0.52$，因为 $2\,630$ 个词型的有限词表在被耗尽时必然把曲线压平。两条"定律"最好当作彼此独立的经验描述。
:::
:::

::: exercise 更好的分词器 {level=3}
写一个函数，把无空格字符串切分成词典词，使所用词的个数**最少**，无法切分时返回 `None`。在 [[#ex-maxmatch]] 的字符串与词典上运行它。设字符串长 $n$、词典中最长词长 $L$、查词典代价 $O(L)$，其运行时间是多少？
::: solution
设 $\mathit{best}[i]$ 为切分前 $i$ 个字符所需的最少词数。则 $\mathit{best}[0] = 0$ 且 $\mathit{best}[j] = \min\set{\mathit{best}[i] + 1 : j - L \le i < j,\ s[i:j] \in D}$；记住取到最小值的 $i$，就能倒读出切分。

```python
def segment(s, D):
    L = max(map(len, D))
    best, back = [0] + [None] * len(s), [None] * (len(s) + 1)
    for j in range(1, len(s) + 1):
        for i in range(max(0, j - L), j):
            if best[i] is not None and s[i:j] in D and (best[j] is None or best[i] + 1 < best[j]):
                best[j], back[j] = best[i] + 1, i
    if best[len(s)] is None:
        return None
    words, j = [], len(s)
    while j > 0:
        words.append(s[back[j]:j]); j = back[j]
    return words[::-1]

D = {"the", "theta", "table", "tab", "bled", "led", "down", "own", "there", "here", "a", "able"}
print(segment("thetabledownthere", D))
```
```text
['the', 'table', 'down', 'there']
```
`the table down there` 和 `theta bled own there` 都用 $4$ 个词，动态规划按它打破平局的方式（只在严格改进时替换 $\mathit{best}[j]$）返回前者。词数最少只是启发式；要在一般情况下偏好合理的读法，应最大化词概率的乘积，那只是同一个动态规划、每个词的代价换成 $-\log p(w)$。位置 $j$ 有 $n$ 个，每个至多试 $L$ 个切分点，每次测试切片并查一个至多长 $L$ 的字符串，故时间为 $O(nL^2)$。
:::
:::

::: exercise 码位 {level=1 check="5"}
字符串 `café` 的 NFD（分解）形式有多少个码位？（填入数目。）
::: solution
NFD 把 é 分解为 `e` 后跟 U+0301 COMBINING ACUTE ACCENT，于是 `café` 变成 `c`、`a`、`f`、`e`、U+0301：$5$ 个码位，尽管显示为 $4$ 个字符。这就是 [[#ex-unicode]] 里的字符串 `b`，其中 `len(b)` 打印了 `5`。
:::
:::

::: exercise 词干提取与评测 {level=2}
一个文档集收有关于宇宙（天文学）的文档，也收有关于大学的文档。就查准率与查全率说明 Porter 词干提取对查询 `universe expansion` 和 `university admissions` 的影响，并给出一种缓解办法。
::: solution
Porter 把 `universe` 与 `university` 都映射为 `univers`。对 `universe expansion`，讲大学扩张（新校区）的文档现在匹配第一个词项，于是无关文档可能被检回：**查准率下降**。查全率增益很小，因为 `universe` 没有什么值得合并的其他形态（`universes`）。对 `university admissions` 则反之。一种缓解办法是同时索引提取过与未提取过的形态，并给精确匹配更高权重；或改用不那么激进的词干提取器（只删屈折后缀的那种，例如复数 `s`）；或使用词形还原器，它把两个原形区分开。这些到底是否净有好处，必须在真实查询上度量（[[information-retrieval/evaluation]]）。
:::
:::
