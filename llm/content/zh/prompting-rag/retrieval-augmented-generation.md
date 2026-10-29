语言模型所知道的，只是截至数据采集日期的训练数据里的内容，而且是压缩过的、不可靠的形式。它不知道今天上午的新闻、公司的内部手册或它从未见过的一份合同的内容，而被问到这些时，它照样可能对答如流。**检索增强生成**（RAG）用一个动作同时解决这三个问题：在模型回答之前，先到文档集合里检索与问题相关的段落，把它们放进提示，并要求模型依据它们回答——并说明每个论断由哪一段支撑。

想法很简单，最小系统一页代码就能写完。要让它工作得好却并不容易：回答的质量以检回的段落为上限；段落必须经过切分、排序并安放，模型才会真正使用它们；还必须说服模型依靠它们而不是依靠自己的记忆。本章先从 RAG 作为概率模型的原始形式讲起，推出检索器如何经由生成器来训练，然后搭建实用流水线——分块、检索、重排序、构造提示与引用——连同它特有的种种失败。嵌入与检索见 [[prompting-rag/text-embeddings]] 与 [[prompting-rag/vector-search]]；如何测量 RAG 系统是 [[prompting-rag/rag-evaluation]] 的主题。

## 参数化记忆与非参数化记忆 {#sec-memory}

Lewis 等人（2020）把语言模型的权重称为**参数化记忆**，把可检索的文档集合称为**非参数记忆**。两者性质互补。

| | 参数化（权重） | 非参数（索引） |
|---|---|---|
| 更新 | 重新训练或微调 | 增删文档 |
| 出处 | 无：事实无法追溯到来源 | 每个段落都有来源 |
| 容量 | 由模型规模固定 | 随集合增长 |
| 访问 | 快、隐式、每次前向传播都在 | 每次查询一次显式检索 |
| 失败方式 | 自信地回忆出错误的东西 | 检回错误的段落 |

RAG 把两者结合：索引提供事实与出处，模型提供语言、推理以及把多个段落整合成回答的能力。

::: definition 检索增强生成流水线 {#def-rag}
一个**检索增强生成**系统由以下部分组成：

- 离线建好的**索引**：文档被切成**块**，每块表示成可检索的形式（一个嵌入、一个稀疏词项向量，或两者都有），连同出处一起存储；
- 一个**检索器**：对查询 $x$，按分数 $s(x, z)$ 返回前 $k$ 个块 $z_1, \dots, z_k$；
- 可选的一个**重排序器**：用更准但更贵的模型对检回的块重新排序；
- 一个**生成器**：一个语言模型，收到包含查询与所选块的提示，产出回答 $y$，通常带有对所使用块的引用。
:::

::: widget graph
nodes: docs@0,2; chunk@1,2; embed@2,2; index@3,2; query@2,0; retrieve@4,1; rerank@5,1; prompt@6,1; generate@7,1; answer@8,1
edges: docs>chunk; chunk>embed; embed>index; index>retrieve; query>retrieve; retrieve>rerank; rerank>prompt; query>prompt; prompt>generate; generate>answer
algorithm: topo
start: docs
caption: RAG 流水线作为依赖图。上一行离线运行，每个文档一次：分块、嵌入、建索引。其余部分每次查询运行：检索候选、重排序、用查询与最好的块构造提示、生成带引用的回答。这里逐步演示的拓扑序，就是各阶段可以运行的一个顺序。每个阶段都可能独立出错，这正是 [[prompting-rag/rag-evaluation]] 要分别测量它们的原因。
:::

## 作为潜变量模型的 RAG {#sec-model}

Lewis 等人把检回的文档当作**潜变量**：模型不知道哪个段落是对的，于是对检回的段落平均，以检索器的信念为权重。检索器给出段落上的分布，

$$
p_\eta(z\mid x) = \frac{\exp s_\eta(x, z)}{\sum_{z'\in\operatorname{top-}k(x)}\exp s_\eta(x, z')},
$$ {#eq-retriever}

其中 $s_\eta(x, z)$ 是 DPR 的稠密检索分数（[[prompting-rag/text-embeddings#sec-architectures]]），生成器 $p_\theta(y_i\mid x, z, y_{<i})$ 是以查询与单个段落为条件的序列到序列模型。

::: definition RAG-Sequence 与 RAG-Token {#def-rag-models}
**RAG-Sequence** 对整个输出使用同一个段落，在序列的层面求边际：

$$
p(y\mid x) = \sum_{z}p_\eta(z\mid x)\prod_{i}p_\theta(y_i\mid x, z, y_{<i}).
$$

**RAG-Token** 可以为每个输出词元使用不同的段落，在每一步求边际：

$$
p(y\mid x) = \prod_{i}\sum_{z}p_\eta(z\mid x)\,p_\theta(y_i\mid x, z, y_{<i}).
$$

两者中，求和都对检回的前 $k$ 个段落进行。
:::

::: example 两个段落、两个词元 {#ex-rag-models}
检索器给两个段落概率 $0.7$ 与 $0.3$。给定段落 $z_1$，生成器给回答的第一个词元概率 $0.9$、第二个 $0.2$；给定 $z_2$，第一个 $0.4$、第二个 $0.9$。计算两个模型下的 $p(y\mid x)$。
::: solution
RAG-Sequence：$0.7\cdot0.9\cdot0.2 + 0.3\cdot0.4\cdot0.9 = 0.126 + 0.108 = 0.234$。RAG-Token：$(0.7\cdot0.9 + 0.3\cdot0.4)(0.7\cdot0.2 + 0.3\cdot0.9) = 0.75\cdot0.41 = 0.3075$。RAG-Token 给这个回答更多概率，因为它可以把第一个词元"取自"支持它的 $z_1$、第二个取自 $z_2$；RAG-Sequence 必须用同一个段落解释整个回答，而哪个段落都不能同时很好地支持两个词元。RAG-Token 适合综合多个段落事实的回答；RAG-Sequence 让每个回答可以归到单一来源。
:::
:::

Lewis 等人的系统里，检索器是 DPR，生成器是 BART-large，索引是 2018 年 12 月的维基百科转储，切成 $2100$ 万个 $100$ 词的段落，用内积检索。查询编码器与生成器在问答对上联合微调，目标是最大化 $\log p(y\mid x)$；文档编码器保持固定，这样训练期间就不必重建索引。这些模型在当时三个开放域问答基准上创下最优成绩；作者还表明，把索引换成更新的维基百科转储，模型关于世界各国领导人的回答也随之改变——无需重新训练就更新了知识。

### 通过生成器训练检索器

没有"哪个段落正确"的标签，检索器怎么能学会哪些段落有用？靠边际似然。REALM（Guu et al., 2020）正是用这一点在掩码语言模型预训练中训练检索器：对某个查询来说，以它作条件能让被掩词元更好预测的段落就是"好"段落。

::: proposition 边际似然的梯度 {#prop-realm}
设候选集上 $p(z\mid x) = \operatorname{softmax}_z s(x, z)$，且 $p(y\mid x) = \sum_z p(z\mid x)\,p(y\mid x, z)$。则

$$
\nabla\log p(y\mid x) = \sum_{z}\big[p(z\mid x, y) - p(z\mid x)\big]\nabla s(x, z) + \sum_z p(z\mid x, y)\,\nabla\log p(y\mid x, z),
$$ {#eq-realm}

其中 $p(z\mid x, y) = p(z\mid x)p(y\mid x, z)/p(y\mid x)$ 是给定回答后段落上的后验。第一个和式就是检索器的梯度：它抬高每个后验超过先验的段落的分数——解释回答比检索器预期更好的段落——并压低其余的。
:::

::: proof
由恒等式 $\nabla\log f = \nabla f/f$，

$$
\nabla\log p(y\mid x) = \sum_z\frac{p(z\mid x)p(y\mid x, z)}{p(y\mid x)}\Big[\nabla\log p(z\mid x) + \nabla\log p(y\mid x, z)\Big] = \sum_z p(z\mid x, y)\Big[\nabla\log p(z\mid x) + \nabla\log p(y\mid x, z)\Big].
$$

对 softmax，$\log p(z\mid x) = s(x, z) - \log\sum_{z'}e^{s(x, z')}$，所以 $\nabla\log p(z\mid x) = \nabla s(x, z) - \sum_{z'}p(z'\mid x)\nabla s(x, z')$。对和为一的 $p(z\mid x, y)$ 求和，得 $\sum_z p(z\mid x, y)\nabla s(x, z) - \sum_{z'}p(z'\mid x)\nabla s(x, z')$，即 [[#eq-realm]] 的第一个和式。
:::

::: example 哪个段落得到功劳？ {#ex-realm}
三个候选段落的检索分数为 $(2, 1, 0)$，它们使目标回答出现的程度为 $p(y\mid x, z) = (0.1, 0.8, 0.1)$。计算检索器梯度的系数 $p(z\mid x, y) - p(z\mid x)$。
::: solution
先验是 $\operatorname{softmax}(2, 1, 0) = (0.665, 0.245, 0.090)$。边际为 $0.665\cdot0.1 + 0.245\cdot0.8 + 0.090\cdot0.1 = 0.271$，故后验为 $(0.0665, 0.196, 0.009)/0.271 = (0.245, 0.722, 0.033)$。系数是 $(-0.420, +0.477, -0.057)$：第二个段落——检索器只把它排到第二、但它其实最能解释回答——分数被抬高，排名第一却帮不上忙的段落被压低。在许多样本上重复这一过程，检索器就学会按有用程度给段落排序。
:::
:::

REALM 还得处理文档编码器变化导致索引过期的问题：每隔几百个训练步异步地重新嵌入整个语料库。后续系统探索了检索的其他摆放方式。Fusion-in-Decoder（Izacard 与 Grave, 2021）把每个检回的段落与查询分开编码，让解码器一次性注意它们全部，从而很好地扩展到 $100$ 个段落。RETRO（Borgeaud et al., 2022）在预训练中为输入的分块从一个 $2$ 万亿词元的数据库里检索近邻；其作者报告在一个语言建模基准上达到与参数量约大 $25$ 倍的模型相当的表现。Atlas（Izacard et al., 2023）表明联合训练的检索器与生成器能从少量示例中学到知识密集型任务。不过 2026 年建立在通用大模型之上的多数 RAG 系统，两个组件都不做端到端训练：现成的检索器与冻结的指令微调模型由一条提示连接，工程重心转移到流水线上。

## 分块 {#sec-chunking}

文档太长，无法整个嵌入或整个放进提示，于是被切成**块**。这个选择比看上去重要：块是被检索、被打分、被展示给模型的单位，所以它应当大到足以承载一个自足的信息片段，又小到足够具体。

::: proposition 有重叠时的块数 {#prop-chunks}
把长度为 $L$ 个词元的文本切成宽 $c$ 个词元、起点相隔 $c - o$ 个词元的窗口（重叠 $o < c$），并允许最后一个窗口短一些，会得到

$$
n = \Big\lceil\frac{L - c}{c - o}\Big\rceil + 1 \qquad (L > c)
$$

个块，存储的词元数约是文本本身的 $c/(c - o)$ 倍。
:::

::: proof
窗口 $j$ 从 $j(c - o)$ 开始，$j = 0, 1, \dots$，而窗口必须覆盖文本，所以需要最小的 $J$ 使 $J(c - o) + c\ge L$，即 $J = \lceil(L - c)/(c - o)\rceil$，窗口 $0, \dots, J$ 共 $J + 1$ 个。除两端附近外，每个词元大约落在 $c/(c - o)$ 个窗口里，因为每隔 $c - o$ 个词元就有一个长度为 $c$ 的窗口开始。
:::

::: example 给一份报告分块 {#ex-chunks}
一份 $10{,}000$ 词元的报告切成 $512$ 词元的块、重叠 $64$ 个词元。有多少个块？索引里的文本比报告大多少？
::: solution
$\lceil(10{,}000 - 512)/448\rceil + 1 = \lceil21.18\rceil + 1 = 23$ 个块。重叠让每个词元约被存 $512/448 = 1.14$ 次，文本多 $14\%$——这是确保在块边界被切断的句子至少在一个块里完整出现的代价。
:::
:::

::: widget plot
f: (L - x)/(x - o) + 1
x: 100, 2000
y: 0, 120
sliders: L=10000:2000:50000:1000; o=64:0:90:2
labels: number of chunks $n$ against chunk size $c$
points: 512,22.18
caption: [[#prop-chunks]] 中的块数（未向上取整）对块长 $c$ 的曲线，文档长 $L$ 个词元、重叠 $o$；标注的点是 [[#ex-chunks]]，向上取整为 $23$。小块具体但数量多，且可能丢上下文（"它"、"上述"）；大块保留上下文，却用无关内容稀释嵌入、很快填满提示。当 $o$ 相对 $c$ 很小时，增大重叠只会让块数略微变多。
:::

固定窗口无视结构。更好的切分器尊重结构——小节、段落、句子、表格行、代码里的函数——并给每块附上**元数据**：文档标题、小节标题、日期与访问权限。一块写着 *The limit is 500 euros* 的内容，不知道它出自差旅政策就毫无用处；在嵌入前把标题与小节标题拼到块前面（有时再配上模型写的周边文档摘要），就把这层上下文补了回来。许多系统还会为精确检索索引小块，但把周围更大的整段交给模型。没有普遍最好的块长；它取决于文档、嵌入模型的训练方式与问题本身，应当通过测量检索质量（[[prompting-rag/rag-evaluation]]）来确定。

## 检索与重排序 {#sec-retrieval}

第一阶段检索器必须在整个集合上保持快，为**召回率**调优：相关段落应当在前 $50$ 或 $100$ 名之内的某处。标准做法是稠密检索、BM25，或两者用倒数排名融合合并（[[prompting-rag/vector-search#def-rrf]]）。第二阶段在短列表上为**精确率**调优：**交叉编码器重排序器**（[[prompting-rag/text-embeddings#def-bi-cross]]）把查询与每个候选放在一起读并重新打分，最好的几个交给模型。Nogueira 与 Cho（2019）表明这样用 BERT 重排 BM25 候选能带来大幅提升；ColBERT（Khattab 与 Zaharia, 2020）这类后期交互模型把每个查询词元嵌入与每个文档词元嵌入相比较，成本与精度介于双编码器与交叉编码器之间。大模型本身也可以被提示去做重排序，代价更高。

当用户的问题不是好的搜索查询时，若干查询侧技术会有帮助：

- **查询改写**：让模型把一轮对话（"那外包人员呢？"）变成一个自足的查询，或把多部分的问题拆成几个。
- **假设文档嵌入**（HyDE；Gao et al., 2023）：让模型写一个看似合理、可能错误的回答，用它的嵌入去检索——它比问题本身更像相关段落。
- 多跳问题的**迭代检索**：检索、推理，带着学到的信息再检索（例如 Trivedi et al., 2023，把检索与思维链步骤交错）。智能体（[[agents/agent-loops]]）把这一点推广为把搜索当工具。
- **多样性**：近似重复的块浪费上下文；最大边际相关性（见习题）在相关与冗余之间权衡。
- **过滤**：按元数据限定——日期、产品、语言，以及至关重要的用户访问权限——让模型永远看不到用户无权阅读的文档。

## 构造提示与引用来源 {#sec-prompt}

通过重排序的块进入提示，此时 [[prompting-rag/prompt-design]] 的教训直接适用：把来源用分隔符界定并编号，指示模型只依据它们回答并引用它们，告诉它当来源中不含答案时该怎么办，并留心 [[prompting-rag/prompt-design#sec-position]] 的位置效应，把最强的块放在开头或结尾。

::: example 上下文的预算 {#ex-budget}
一个模型有 $8192$ 词元的上下文。系统指令占 $500$ 词元，问题 $100$ 个，为回答预留 $800$ 个。装得下多少个 $512$ 词元的块？
::: solution
还剩 $8192 - 500 - 100 - 800 = 6792$ 个词元，$6792/512 = 13.3$，装得下 $13$ 个块。换成 $128{,}000$ 词元的上下文，预算大约允许 $240$ 个块，但多不等于自动更好：无关的块会分散模型的注意力，而且每次调用都多付延迟与钱，所以块的数目应当由测量过的回答质量决定，而不是由容量决定。
:::
:::

下面这段代码用纯 Python 搭出一条虽小却完整的检索流水线：带重叠的词窗口分块、块上的 BM25 检索（[[prompting-rag/vector-search#def-bm25]]）、一个带编号、注明出处来源的提示，以及对回答中引用的一个粗糙检查。

```python
import math, re
DOCS = {
  "handbook.txt": "Staff may work from home on up to two days per week. Requests for more "
                  "remote days need written approval from a line manager. The office opens at "
                  "8 am and closes at 7 pm on weekdays.",
  "it-policy.txt": "Laptops must be encrypted. Passwords are rotated every 90 days. Lost "
                   "devices must be reported to the IT desk within 24 hours.",
  "travel.txt": "Train travel is reimbursed in second class. Flights need approval from a "
                "line manager when the fare exceeds 500 euros.",
}
def tokenize(s): return re.findall(r"[a-z0-9]+", s.lower())

def chunk(text, size=12, overlap=4):            # 固定大小、带重叠的词窗口
    w = text.split(); out = []
    for start in range(0, max(len(w) - overlap, 1), size - overlap):
        out.append(" ".join(w[start:start + size]))
    return out

chunks = [(src, i, c) for src, t in DOCS.items() for i, c in enumerate(chunk(t))]
toks = [tokenize(c) for _, _, c in chunks]
N = len(chunks); avgdl = sum(map(len, toks)) / N
def bm25(q, j, k1=1.2, b=0.75):
    K = k1 * (1 - b + b * len(toks[j]) / avgdl); s = 0.0
    for t in set(tokenize(q)):
        n = sum(t in d for d in toks); tf = toks[j].count(t)
        if tf: s += math.log(1 + (N - n + 0.5) / (n + 0.5)) * tf * (k1 + 1) / (tf + K)
    return s

def build_prompt(question, k=3):
    top = sorted(range(N), key=lambda j: -bm25(question, j))[:k]
    sources = "\n".join(f"[{n}] ({chunks[j][0]}#{chunks[j][1]}) {chunks[j][2]}"
                        for n, j in enumerate(top, 1))
    return ("Answer the question using only the numbered sources. Cite sources as [n] "
            "after each claim. If the sources do not contain the answer, say so.\n\n"
            f"Sources:\n{sources}\n\nQuestion: {question}\nAnswer:"), top

print(f"{N} chunks from {len(DOCS)} documents")
prompt, top = build_prompt("How many days per week can I work from home?")
print(prompt)

def check_citations(answer, top, min_overlap=0.5):  # 粗糙的词面支持检查
    for sent in re.split(r"(?<=[.!?])\s+", answer.strip()):
        cited = [int(n) for n in re.findall(r"\[(\d+)\]", sent)]
        words = set(tokenize(re.sub(r"\[\d+\]", "", sent)))
        if not cited:
            print("  NO CITATION :", sent); continue
        for n in cited:
            if not 1 <= n <= len(top):
                print(f"  BAD SOURCE [{n}]:", sent); continue
            src = set(toks[top[n - 1]])
            frac = len(words & src) / len(words)
            print(f"  [{n}] overlap {frac:.2f}", "ok  " if frac >= min_overlap else "WEAK", ":", sent)

check_citations("You may work from home up to two days per week [1]. "
                "More remote days need written approval [2]. "
                "Approval is usually granted within a week [3]. Managers decide [4].", top)
```

```text
10 chunks from 3 documents
Answer the question using only the numbered sources. Cite sources as [n] after each claim. If the sources do not contain the answer, say so.

Sources:
[1] (handbook.txt#0) Staff may work from home on up to two days per week.
[2] (handbook.txt#1) two days per week. Requests for more remote days need written approval
[3] (handbook.txt#2) days need written approval from a line manager. The office opens at

Question: How many days per week can I work from home?
Answer:
  [1] overlap 0.91 ok   : You may work from home up to two days per week [1].
  [2] overlap 1.00 ok   : More remote days need written approval [2].
  [3] overlap 0.29 WEAK : Approval is usually granted within a week [3].
  BAD SOURCE [4]: Managers decide [4].
```

交给检查器的这个回答是模型输出的替身。它的头两个论断有所引来源的支持；第三个引用了一个真实但不这么说的来源——一个乔装成带引用论断的编造细节——第四个引用了一个并不存在的来源。词面重叠对生产环境来说太过粗糙（它漏掉换言表达，还会被否定骗过）；真实系统用蕴含模型或大模型评审来检查支持关系（[[prompting-rag/rag-evaluation]]）。另请注意，这些小区块把员工手册切在了句子中间：块 $2$ 单看并没有说必须由*谁*批准，这正是 [[#sec-chunking]] 的上下文问题。

引用让 RAG 的回答可以被核查，但引用并不自动诚实。Liu、Zhang 与 Liang（2023）审计了四个生成式搜索引擎，发现平均只有约一半的生成句子能被其引用完全支持，而引用真正支持其所附句子的比例约为四分之三；ALCE（Gao et al., 2023）这样的基准系统地测量引用质量。[[prompting-rag/hallucination]] 讨论模型为什么会添加无支持的细节，以及如何减少这一行为。

::: warning 检索到了，不等于模型用了这些来源
把正确的段落放进提示，并不能保证回答遵循它。当段落与模型学到的东西矛盾时，模型可能更信任自己的参数化记忆——对众所周知的事实尤其如此——也可能把两者混在一起；它还可能过度信任一个错误或过时的检回段落。关于知识冲突的研究（例如 Longpre et al., 2021；Xie et al., 2024）发现两种行为都存在，取决于模型与段落令人信服的程度。要明确指示模型，用与其很可能持有的先验相矛盾的段落测试它，并保持索引常新：RAG 系统的正确性超不出它的文档。
:::

::: quiz
某个 RAG 系统回答关于现行育儿假政策的问题时答错了。正确的政策文档就在索引里。应当先检查什么？
- [ ] 换用更大的生成器模型。
- [x] 检查正确的块是否出现在这道题检回（并重排序后）的块里。
- [ ] 调高温度，让模型探索更多回答。
- [ ] 从提示中删掉引用指令。
::: solution
生成器不可能用一个它从未看到的段落。如果正确的块没被检回，问题在分块、查询或检索器；如果检回了回答仍然错，就去看它在提示中的位置、相互冲突的块（一份旧政策？），以及指令。分别测量检索与生成，是 [[prompting-rag/rag-evaluation]] 的第一法则。
:::
:::

## 失败模式与设计选择 {#sec-failures}

多数 RAG 失败可以归入几类，每类有各自的对策。

| 失败 | 症状 | 常见对策 |
|---|---|---|
| 检索漏检 | 正确的文档存在，但没有检回 | 混合检索、更好的分块、查询改写、微调嵌入 |
| 排序失误 | 检回了，但排得太低没被用上 | 重排序、更多块、按相关性把重要的排到两端 |
| 块缺上下文 | 块里没有主语或条件 | 结构感知分块、块内加标题与小节名、父级整段 |
| 来源冲突或过时 | 新旧版本同时被检回 | 元数据过滤、去重、提示中标注日期 |
| 无支持生成 | 回答添加来源中没有的细节 | 引用指令、校验、拒答（[[prompting-rag/hallucination]]） |
| 无法回答的问题 | 来源保持沉默时编造答案 | 显式的"未找到"选项、测量拒答率 |

两个更宏观的设计选择反复出现。**RAG 还是长上下文？** 到 2026 年，有些模型已能接受一百万词元，而对一个小型、稳定的集合，把所有东西塞进提示可能更简单。Li et al.（2024）这类比较发现，预算足够时长上下文模型在某些基准上可以追平甚至超过 RAG，而 RAG 每次查询要便宜得多；位置效应与干扰也随上下文变长而加重。检索能扩展到任何上下文装不下的集合，能逐文档强制访问控制，还提供出处。**RAG 还是微调？** 微调教给模型格式、风格与技能；它不适合添加会变动的事实，也不给出出处。两者互补：可以微调模型以更好地使用检索到的上下文，例如学会引用与拒答（Asai et al., 2024 训练模型自己决定何时检索、并批判自己如何使用段落）。

::: history
基于检索文本的开放域问答比神经网络更早：TREC 问答评测从 1999 年开始举办，IBM 的 Watson 把搜索与答案打分结合起来，于 2011 年在 **Jeopardy!** 节目中获胜。Chen et al.（2017）用 TF–IDF 检索器与维基百科上的神经阅读器搭出 DrQA；Lee、Chang 与 Toutanova（2019）仅凭问答对训练检索器（ORQA）。2020 年，REALM（Guu et al.）在预训练中训练检索器，DPR（Karpukhin et al.）让稠密检索成为标准做法，Lewis et al. 则为检索增强生成命名，并给出了 RAG-Sequence 与 RAG-Token。Fusion-in-Decoder（Izacard 与 Grave, 2021）、RETRO（Borgeaud et al., 2022）与 Atlas（Izacard et al., 2023）探索了各种架构。2022–2023 年起，用提示把检索接到指令微调大模型上，成为面向私有与最新文档问答的主流模式，其后的工作涉及引用（Gao et al., 2023）、自适应检索（Asai et al., 2024）与智能体式搜索。
:::

::: summary
- RAG 把模型的参数化记忆与可检索的非参数索引配对：文档离线分块、建索引；每次查询检回最好的块，重排序后连同"依据它们回答并引用它们"的指令放进提示。
- Lewis et al.（2020）把检回的段落当作潜变量：RAG-Sequence 对整个回答在段落上求边际，RAG-Token 在每个词元处求边际。
- 检索器可以通过生成器训练：边际似然的梯度抬高后验超过先验的段落的分数（REALM）。
- 块的大小与结构决定了能检回什么；块长 $c$、重叠 $o$ 的分块使存储量变为 $c/(c - o)$ 倍；标题与小节名可以找回丢失的上下文。
- 快速、面向召回率的第一阶段（稠密、BM25 或混合），再加精确的交叉编码器重排序器，是检索的标配设计；查询改写、HyDE 与迭代检索能应付难查询。
- 引用让回答可校验，但常常不完整或有错；要校验支持关系，并给模型一条"来源里没有"的路。
- 逐阶段诊断失败：漏检、排序、块上下文、来源冲突、无支持生成、无法回答的问题。
:::

## 习题

::: exercise 数块数 {level=1 check="13"}
一份 $5000$ 词元的文档切成 $500$ 词元的块、重叠 $100$ 个词元。有多少个块？
::: solution
$\lceil(5000 - 500)/400\rceil + 1 = \lceil11.25\rceil + 1 = 13$。
:::
:::

::: exercise 更大的上下文预算 {level=1 check="35"}
一个模型有 $16{,}384$ 词元的上下文；指令与问题共占 $1384$ 个词元，为回答预留 $1000$ 个。装得下多少个 $400$ 词元的块？
::: solution
$16{,}384 - 1384 - 1000 = 14{,}000$ 个词元，$14{,}000/400 = 35$ 个块，正好。
:::
:::

::: exercise 手算 RAG-Sequence {level=1 check="0.29"}
两个段落的检索概率各为 $0.5$。给定 $z_1$，生成器给回答两个词元的概率为 $0.8$ 与 $0.5$；给定 $z_2$，为 $0.2$ 与 $0.9$。计算 RAG-Sequence 下的 $p(y\mid x)$。
::: solution
$0.5\cdot0.8\cdot0.5 + 0.5\cdot0.2\cdot0.9 = 0.2 + 0.09 = 0.29$。
:::
:::

::: exercise 手算 RAG-Token {level=1 check="0.35"}
用上一题的数字，计算 RAG-Token 下的 $p(y\mid x)$。
::: solution
$(0.5\cdot0.8 + 0.5\cdot0.2)(0.5\cdot0.5 + 0.5\cdot0.9) = 0.5\cdot0.7 = 0.35$，高于 RAG-Sequence 的 $0.29$，因为每个词元都可以倚靠支持它的那个段落。
:::
:::

::: exercise 重叠的存储开销 {level=1 check="1.143"}
$512$ 词元的块用 $64$ 个词元的重叠，索引里存储的文本量变为多少倍（保留三位小数）？
::: solution
$c/(c - o) = 512/448 = 1.143$。
:::
:::

::: exercise 一个检索器梯度 {level=2 check="0.477"}
在 [[#ex-realm]] 中验证第二个段落的系数 $p(z_2\mid x, y) - p(z_2\mid x)$，保留三位小数。若三个段落解释回答的程度相同，系数会是什么？
::: solution
$p(z_2\mid x) = e/(e^2 + e + 1) = 0.2447$；边际为 $0.2713$，故 $p(z_2\mid x, y) = 0.2447\cdot0.8/0.2713 = 0.7216$，系数为 $0.7216 - 0.2447 = 0.477$。若 $p(y\mid x, z)$ 对所有段落都一样，后验等于先验，每个系数都为零：回答没有提供哪个段落更好的证据，检索器不会被改变。
:::
:::

::: exercise 两个 RAG 模型何时一致 {level=2}
证明当 (a) 只检回一个段落，或 (b) 生成器的分布不依赖段落时，RAG-Sequence 与 RAG-Token 给出相同的 $p(y\mid x)$。输出只有一个词元时它们会不同吗？
::: solution
(a) 只有一个段落时 $p(z\mid x) = 1$，两个公式都化为 $\prod_ip_\theta(y_i\mid x, z, y_{<i})$。(b) 若对一切 $z$ 都有 $p_\theta(y_i\mid x, z, y_{<i}) = g_i$，RAG-Sequence 给出 $\sum_zp(z\mid x)\prod_ig_i = \prod_ig_i$，RAG-Token 给出 $\prod_i\sum_zp(z\mid x)g_i = \prod_ig_i$。输出只有一个词元时两个公式完全相同，$\sum_zp(z\mid x)p_\theta(y_1\mid x, z)$，所以反例不存在：只有当输出至少两个词元、且不同词元分别被不同段落最好地支持时，两者才会不同，正如 [[#ex-rag-models]]。
:::
:::

::: exercise 诊断一条流水线 {level=2}
用户反馈：一个面向产品说明书的 RAG 助手，常常对答案明明在规格表里的问题回答"说明书里没有说"。在流水线的不同阶段各提出一个假设，并给出相应的检验方法。
::: solution
(1) *分块/抽取*：表格被拉平成丢失行列结构的文本，或被切到不同块里，数值与其表头分离。检验：检查几本受影响说明书的块；试用表格感知的抽取，把每行连同其表头写出。(2) *检索*：数字密集的行的嵌入与自然语言问题匹配得差，精确的型号还会被漏掉。检验：在这类问题的带标签集合上，分别用稠密、BM25 与混合检索测量正确的块是否出现在前 $k$。(3) *生成*：块检回了，但模型读不出线性化表格里的数值，或拒答指令太强。检验：把金标准块直接给模型，测量其准确率；变换表格格式（Markdown 表格、每行一项）与拒答措辞。每个检验都隔离一个阶段。
:::
:::

::: exercise 最大边际相关性 {level=3}
**最大边际相关性**（MMR；Carbonell 与 Goldstein, 1998）一次选一个块，每次取使 $\lambda\,\mathrm{sim}(q, d) - (1 - \lambda)\max_{d'\in S}\mathrm{sim}(d, d')$ 最大的候选 $d$，其中 $S$ 是已选集合。用纯 Python 在一个候选集上实现它——该集合含某个段落的三个近似重复副本和另外两个相关段落——并比较 $\lambda = 1$、$0.7$ 与 $0.5$。
::: solution
```python
import math, random
rng = random.Random(3)
def unit(v): n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
def cos(a, b): return sum(x*y for x, y in zip(a, b))
q = unit([1, 1, 0, 0])
base = {"A": [1, 0.3, 0, 0], "B": [0.2, 1, 0.3, 0], "C": [0.6, 0.6, 0, 0.8]}
cands = {}
for name, v in base.items():                       # A 有三个近似重复副本
    for r in range(3 if name == "A" else 1):
        cands[f"{name}{r}"] = unit([x + rng.gauss(0, 0.03) for x in v])

def mmr(q, cands, k, lam):
    chosen, rest = [], dict(cands)
    while rest and len(chosen) < k:
        def score(n):
            red = max((cos(cands[n], cands[c]) for c in chosen), default=0.0)
            return lam * cos(q, cands[n]) - (1 - lam) * red
        best = max(rest, key=score); chosen.append(best); del rest[best]
    return chosen

print({n: round(cos(q, v), 3) for n, v in cands.items()})
print("lambda=1.0:", mmr(q, cands, 3, 1.0))
print("lambda=0.7:", mmr(q, cands, 3, 0.7))
print("lambda=0.5:", mmr(q, cands, 3, 0.5))
```

```text
{'A0': 0.895, 'A1': 0.877, 'A2': 0.889, 'B0': 0.811, 'C0': 0.704}
lambda=1.0: ['A0', 'A2', 'A1']
lambda=0.7: ['A0', 'B0', 'A2']
lambda=0.5: ['A0', 'B0', 'C0']
```

$\lambda = 1$ 时，MMR 就是按相关性排序，三个位置全被段落 A 的副本占据，而副本除第一个外毫无新意。$\lambda = 0.7$ 时，冗余惩罚把 B 带了进来；$\lambda = 0.5$ 时，三个位置装了三个不同的段落。合适的 $\lambda$ 是一种权衡：调得太低，真正相关但彼此相似的段落（一个流程的两部分）会被丢掉。在建索引时对近似重复的块去重，不花查询时成本就能消去最常见的一种情形。
:::
:::

::: exercise 访问控制 {level=3}
一家公司为 RAG 助手索引了全部文档，但每位员工只能阅读其中一部分。解释为什么在生成**之后**过滤（检查答案里有没有机密内容）是不够的；说明访问控制必须在何处强制实施；并说明它与近似向量检索如何相互影响。
::: solution
机密块一旦进入提示，模型就可能改写、摘要它，或把它与其他信息合起来输出，没有任何输出过滤器能可靠识别每一次这样的泄漏；回答还可能暴露文档的存在。所以访问控制必须在检索处强制实施：每个块带着其文档的权限，检索器只返回请求用户有权阅读的块——生成器永远看不到别的。在近似检索下，只在前 $k$ 个检回结果上过滤可能留下太少的结果（若最近邻大多被禁），所以系统要么在检索时内建过滤（支持过滤检索的索引，或按权限组建独立索引），要么先检回多得多的候选再过滤；两种做法下都必须测量过滤后检索的召回率。权限还必须与源系统保持同步，因为被收回访问权的文档必须及时从索引里消失。
:::
:::
