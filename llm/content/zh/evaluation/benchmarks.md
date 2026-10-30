一个**基准**（benchmark）是一个打包成可复用形式的评测：固定的题目集、参考答案或测试，以及一个计分规则，公开发布，以便任何人都能运行它并比较结果。基准是这个领域记分的方式，语言模型史的很大一段可以讲成一连串基准的更替：它们被提出时很难、被广泛采用，然后**饱和**——被解到无法再区分最好的模型的地步。主要基准有哪些、里面是什么、如何计分，是读懂任何技术报告所必需的；而了解它们的局限，才是相信一份报告的前提。

本章综述塑造了这一领域的基准，从 GLUE（2018）到人类的最后考试（Humanity's Last Exam，2025），按测量对象分组：语言理解、知识、推理与数学、代码、软件工程、指令遵循与多语言能力。随后详述各种**形式**——由对数似然或生成打分的选择题及其归一化选择；用精确匹配与词元 F1 打分的短答案；用单元测试与 pass@$k$ 打分的代码；以及需要评审的开放式任务。最后讲基准的**生命周期**：饱和曲线的简单模型、为什么基准饱和得比过去更快、以及每一代新基准为抵抗饱和做了什么。下文引用的分数是所引论文当时报告的数字，仅用于说明难度；并非当前排名。

## 简史 {#sec-history}

### 语言理解：GLUE 与 SuperGLUE {#sec-glue}

**通用语言理解评估**（General Language Understanding Evaluation，GLUE；Wang 等，2018）把九项既有的英语任务——单句分类（可接受性、情感）、句对相似性与释义、自然语言推理——合并为一个分数，配有公开排行榜与私有测试集。它是为"先预训练、再微调"的时代设计的（[[sequence-models/contextual-embeddings]]）：每个模型都在每个任务的训练集上微调。GLUE 报告的人类基线为 $87.1$；不到一年多，微调后的预训练 Transformer 就超过了它。同一团队发布了 **SuperGLUE**（Wang 等，2019）：八项更难的任务，包括共指、因果推理与多句阅读理解，人类基线为 $89.8$；不到两年也被超越。这两个基准确立了本章会不断回到的一种模式：精心构建的基准、一条人类基线、以及一个比其作者预期闭合得更快的差距。

### 知识：MMLU 及其后继者 {#sec-mmlu}

当模型只靠提示就能用起来之后（[[prompting-rag/in-context-learning]]），评测从微调任务转向对模型所知内容的**少样本**或**零样本**测试。**MMLU**（大规模多任务语言理解，Massive Multitask Language Understanding；Hendrycks 等，2021）收集了约 $16{,}000$ 道四选一的选择题，覆盖 $57$ 个学科，从初等数学到职业法律与医学，难度从高中到专业级。发表时，最大的 GPT-3 模型得分约 $44\%$（随机水平为 $25\%$），作者估计专家级准确率约为 $90\%$。MMLU 此后数年成为被引用最多的知识基准，而它的衰落体现了本课程的每一个主题：分数挤在顶部附近、各实现互不一致（[[evaluation/evaluation-principles#sec-pipeline]]）、题目在网上流传（[[evaluation/contamination]]）、以及一项审计（Gema 等，2024）估计其题目中有百分之几存在错误——错误的答案键、含混或无法回答的题目——个别学科的错误率高得多，于是其有效上限低于 $100\%$。后继者包括 **MMLU-Pro**（Wang 等，2024；十个选项、更侧重推理的题目）与多语言版本。

### 广度：BIG-bench 与 HELM {#sec-breadth}

2022 年的两项工作追求的是广度而非单一分数。**BIG-bench**（Srivastava 等，2022）汇集了 $400$ 余位作者贡献的 $204$ 项任务，从逻辑演绎、算术到凭 emoji 猜电影，并刻意收录了当时被认为超出模型能力的任务；它被用来研究能力如何随规模变化（[[pretraining/in-training-evaluation]]）。**BIG-Bench Hard**（Suzgun 等，2022）从中选出模型尚未胜过平均人类评审的 $23$ 项任务，并表明思维链提示（[[reasoning/chain-of-thought]]）能把其中许多项抬到人类之上。**HELM**（语言模型整体评估，Holistic Evaluation of Language Models；Liang 等，2022）走的是通向广度的另一条路：由一个团队用标准化协议在大量模型上运行，几十个场景、七个指标——准确率、校准、稳健性、公平性、偏见、毒性与效率——并以完整矩阵发表。

### 数学与推理 {#sec-math}

**GSM8K**（Cobbe 等，2021）包含约 $8{,}500$ 道小学应用题，需要两到八步算术，测试集约 $1{,}300$ 道；最终答案是整数，按精确匹配计分。**MATH**（Hendrycks 等，2021）包含 $12{,}500$ 道数学竞赛题（AMC、AIME 等），分七个学科、五个难度级别，答案以 LaTeX 书写、必须按等价性比较；其测试集的 $500$ 题子集 **MATH-500**（Lightman 等，2023 引入）常被用来代替完整测试集报告。当两者都饱和之后，报告转向了近期的竞赛题（例如美国数学邀请赛（American Invitational Mathematics Examination），其题目每年全新）与研究级题集。**GPQA**（Rein 等，2023）针对的是另一个问题——非专家能搜到答案的题目，对在网络数据上训练的模型来说太容易——它包含 $448$ 道由领域专家撰写并校验的生物、物理、化学选择题。相关专业拥有或正在攻读博士学位的专家达到 $65\%$（若剔除他们事后承认的失误则为 $74\%$），而拥有不受限的网络访问、每题用时超过半小时的熟练非专业人士只达到 $34\%$：这些题目是"搜不到答案的"（"Google-proof"）。其 **Diamond** 子集包含 $198$ 道题——专家意见一致而非专业人士答不上来——是最常被报告的。

### 代码与软件工程 {#sec-code-benchmarks}

**HumanEval**（Chen 等，2021）有 $164$ 道手写的 Python 编程题，每题是一个带文档字符串的函数签名与隐藏的单元测试；解答通过全部测试才算对。它按**执行**而非文本相似度计分，是重要的一步，因为看起来对而实际错的代码得零分。**MBPP**（Austin 等，2021）是类似的约 $1{,}000$ 道更简单题目的集合。两者测的都是自包含的函数；**SWE-bench**（Jimenez 等，2023）则在真实仓库中测软件工程。它的 $2{,}294$ 道题中，每一题都是 $12$ 个流行 Python 项目之一的一个 GitHub issue，仓库停在修复前的那次提交；模型必须产出一个补丁，若真正的修复使其通过的那些测试（"fail-to-pass"）现在通过、且此前通过的测试没有坏，该题即被解决。原论文中最强的模型只解决了约 $2\%$。由于有些题目 issue 描述不充分、或测试拒掉了有效的解法，2024 年发布了由人工标注者筛查的 $500$ 题子集 **SWE-bench Verified**，并成为通用参照；这类任务通常由带工具的智能体尝试（[[agents]]）。

### 指令与语言 {#sec-instructions}

**IFEval**（Zhou 等，2023）用约 $500$ 条含有**可验证**约束的提示测量指令遵循——"用不到 $100$ 词回答"、"把关键词 *x* 包含两次"、"不要用逗号"——由代码检查，因此不需要评审。多语言基准包括 **XNLI**（Conneau 等，2018；$15$ 种语言的推理）、**MGSM**（Shi 等，2022；$250$ 道 GSM8K 题翻译成十种类型学上各异的语言）、**FLORES-200**（NLLB 团队，2022；$200$ 种语言之间的翻译）、**Belebele**（Bandarkar 等，2023；$120$ 余种语言变体的阅读理解）与 **Global-MMLU**（Singh 等，2024），后者把 MMLU 翻译成 $42$ 种语言，并标注了哪些题目依赖文化特定（往往是西方）的知识——这提醒我们，翻译一个基准并不能使它文化中立。

### 前沿知识：人类的最后考试 {#sec-hle}

**人类的最后考试**（Humanity's Last Exam，HLE；Phan 等，2025）由 AI 安全中心（Center for AI Safety）与 Scale AI 组织，从一百多个学科的上千名学科专家处收集题目，其中许多是数学题；发布集有 $2{,}500$ 道题，一些是选择题、一些是短精确答案题，约 $14\%$ 需要图片。候选题先对若干前沿模型试测，模型答对的题在专家审查之前就被剔除。发布时，作者报告他们测试的所有模型准确率都很低，并且**校准误差**很高：模型自报的置信度远高于其实际准确率。使这类基准变难的对抗式筛选有一个值得理解的统计副作用，[[#ex-filter-bias]] 对其作了量化：用于筛选的那些模型的分数被构造性地压低，因此这些模型与其他模型的早期比较是有偏的。

::: warning 基准名称不是测量
"MATH"、"SWE-bench" 或 "MMLU" 可以指不同的题目集（完整测试集、MATH-500、Verified、Lite）、修订过题目的不同版本、以及不同的协议（零样本或五样本、有无思维链、有无智能体脚手架）。推理模型再加一个变量：思考词元的预算或采样次数。同一个基准名下的两个数字，只有在子集、版本与协议一致时才可比较。报告没有写明这些时，那个数字就无法与任何其他数字并排。
:::

## 形式与计分 {#sec-formats}

基准的形式决定了什么算答案、如何计分。四种形式覆盖了几乎全部基准。

::: definition 基准的形式 {#def-formats}
- **选择题**：题目列出 $K$ 个选项，恰有一个正确。按**对数似然**打分（比较模型对每个选项的概率，[[pretraining/in-training-evaluation]]）或按**生成**打分（模型写出所选答案，再做抽取）。
- **短答案**：模型写出简短答案——一个数、一个名字、一个表达式——经归一化后与一个或多个参考答案按**精确匹配**、**词元 F1** 或等价性检查比较。
- **执行式**：答案是程序或补丁，通过运行测试计分；**pass@$k$** 是 $k$ 个样本中至少一个通过的概率。
- **开放式**：自由形式的回答（文章、建议、对话），由人类评审（[[evaluation/human-evaluation]]）或模型评审（[[evaluation/model-judges]]）打分，可依据评分细则或参考答案。
:::

### 按对数似然做选择题 {#sec-loglik}

对语境 $c$ 与候选答案串 $a_1, \dots, a_K$，似然打分取 $\arg\max_k\ell(a_k)$，其中分数 $\ell$ 由词元对数概率算出。预训练课程定义了不归一化、按词元与按字符归一化这些选项，以及带字母与**完形填空式**两种表述。下面两个事实解释了它们的行为。

::: proposition 似然打分中的长度与表面形式 {#prop-length}
设 $a$ 的词元为 $a_1, \dots, a_L$，对数似然 $\log p(a\mid c) = \sum_{t=1}^L\log p(a_t\mid c, a_{<t})$。

1. 若 $a$ 的每个词元的条件概率都不超过 $q < 1$，则 $\log p(a\mid c)\le L\log q$：未归一化的分数至少随长度线性下降。按词元的分数 $\frac1L\log p(a\mid c)$ 是词元概率几何平均的对数，没有这一惩罚。
2. 设模型的概率可分解为 $p(a\mid c) = g(a)\,h(a, c)$，其中 $g(a)$ 刻画串 $a$ 与题目无关的常见程度（它的**表面形式**），$h$ 刻画它对 $c$ 的作答好坏。则**逐点互信息**（pointwise mutual information）分数

$$
\ell_{\text{PMI}}(a) = \log p(a\mid c) - \log p(a\mid c_0),
$$ {#eq-pmi}

其中 $c_0$ 是诸如 "Answer:" 这样的中性语境；该分数等于 $\log h(a, c) - \log h(a, c_0)$：不依赖 $g$。
:::

::: proof
(1) 求和的每一项都不超过 $\log q < 0$，共 $L$ 项。按词元的分数是 $\log\big(\prod_tp(a_t\mid\cdot)\big)^{1/L}$，即几何平均的对数。(2) 把分解代入两项，得 $\log g(a) + \log h(a, c) - \log g(a) - \log h(a, c_0)$；表面形式项相消。
:::

(2) 中的分解是一个模型，并非关于语言模型的事实，但它刻画了 Holtzman 等（2021）称为**表面形式竞争**（surface form competition）的真实现象：概率质量被分给表达同一答案的不同串（"dog"、"Dog"、"a dog"、"puppy"），常见的串不管对错都分得更多。GPT-3 论文（Brown 等，2020）在一些选择题基准上用的正是 [[#eq-pmi]] 的分数，把每个补全的条件概率除以它在 "Answer:" 之后的概率。每种归一化各适合一些基准而不适合另一些；重要的做法是报告用了哪一种。

::: example 归一化会改变答案 {#ex-pmi}
对一道正确答案为 "Canberra" 的题，模型在题目语境下与在中性提示 "Answer:" 之后给出如下对数概率。原始打分会选哪个选项？PMI 打分会选哪个？

| 选项 | $\log p(a\mid c)$ | $\log p(a\mid c_0)$ |
|---|---|---|
| Sydney | $-1.2$ | $-5.0$ |
| Canberra | $-1.5$ | $-7.5$ |
| Melbourne | $-2.5$ | $-5.8$ |
::: solution
原始打分：Sydney（$-1.2$）最高。PMI：Sydney $-1.2 + 5.0 = 3.8$；Canberra $-1.5 + 7.5 = 6.0$；Melbourne $-2.5 + 5.8 = 3.3$，于是 Canberra 胜出。模型给 Sydney 高分，部分因为 "Sydney" 在任何语境下都是常见串；PMI 去掉这个先验，问的是*题目*把每个选项的概率抬高了多远。换一个基准，效果就可能反过来，所以归一化是协议的一部分。
:::
:::

### 按生成做选择题 {#sec-mc-generation}

指令微调后的模型通常被要求写出所选答案（"Answer with the letter of the correct option"），而且常常先推理再作答。这让形式对模型更自然、允许思维链，但把抽取问题带了回来（[[evaluation/evaluation-principles#prop-extraction]]），并使分数暴露于**选项顺序**与**字母**偏差：模型可能抛开内容偏爱某些字母或位置（Zheng 等，2024 测量了这种"选择偏差"，并提议用打乱选项来去偏）。对选项的若干循环置换取平均，或报告其散布，都能以成比例的代价控制住它。

### 短答案：精确匹配与 F1 {#sec-em-f1}

对抽取式问答，SQuAD（Rajpurkar 等，2016）引入了两个至今仍为标准的分数，二者都在**归一化**之后计算：转小写、去掉标点与冠词 *a*、*an*、*the*、合并空白。

::: definition 精确匹配与词元 F1 {#def-em-f1}
对预测 $\hat y$ 与参考答案 $y^{(1)}, \dots, y^{(r)}$，记 $\operatorname{norm}$ 为上述归一化，**精确匹配**为 $\max_j\mathbf{1}[\operatorname{norm}\hat y = \operatorname{norm}y^{(j)}]$。把归一化后的串看作词元多重集 $P$（预测）与 $G$（参考），$\lvert P\cap G\rvert$ 按重数计共享词元，则**精确率**为 $\lvert P\cap G\rvert/\lvert P\rvert$，**召回率**为 $\lvert P\cap G\rvert/\lvert G\rvert$，**词元 F1** 是二者的调和平均，对全部参考答案取最大。
:::

```python
import re, string
from collections import Counter

def normalise(s):
    """SQuAD-style: lower case, drop punctuation and the articles a/an/the, collapse spaces."""
    s = s.lower()
    s = "".join(ch for ch in s if ch not in set(string.punctuation))
    s = re.sub(r"\b(a|an|the)\b", " ", s)
    return " ".join(s.split())

def exact_match(pred, golds):
    return max(float(normalise(pred) == normalise(g)) for g in golds)

def f1(pred, golds):
    def one(p, g):
        p, g = normalise(p).split(), normalise(g).split()
        common = sum((Counter(p) & Counter(g)).values())
        if common == 0:
            return 0.0
        prec, rec = common / len(p), common / len(g)
        return 2 * prec * rec / (prec + rec)
    return max(one(pred, g) for g in golds)          # 对全部参考答案取最佳匹配

golds = ["Denver Broncos", "the Broncos"]
for pred in ["Denver Broncos", "The Broncos!", "the Denver Broncos football team",
             "Broncos", "Carolina Panthers"]:
    print(f"{pred!r:36s} EM = {exact_match(pred, golds):.0f}  F1 = {f1(pred, golds):.3f}")
```

```text
'Denver Broncos'                     EM = 1  F1 = 1.000
'The Broncos!'                       EM = 1  F1 = 1.000
'the Denver Broncos football team'   EM = 0  F1 = 0.667
'Broncos'                            EM = 1  F1 = 1.000
'Carolina Panthers'                  EM = 0  F1 = 0.000
```

冗长但正确的答案能从 F1 得到部分学分、从精确匹配得不到分；"Broncos" 去掉冠词后与第二条参考完全一致。词元 F1 是为抽取式短跨度设计的；对聊天模型的长答案，它会奖励照抄词面、惩罚正确的改述，这也是如今这类答案交由评审打分而不再做匹配的原因之一。

### 代码：执行与 pass@$k$ {#sec-passk}

当模型能采样许多程序时，自然的问题是：$k$ 次尝试里有多大概率得到一个正确的。Chen 等（2021）给出了无偏估计：每题抽 $n\ge k$ 个样本，数出通过的 $c$ 个，计算

$$
\widehat{\text{pass@}k} = 1 - \binom{n - c}{k}\Big/\binom{n}{k},
$$ {#eq-passk}

即 $n$ 个样本中随机取的 $k$ 个至少含一个正确样本的概率，再对题目平均。该估计量、它的推导及其与多数投票的关系见 [[reasoning/self-consistency]]。有两点告诫是基准特有的。其一，$k > 1$ 的 pass@$k$ 假定了有人或有东西能分辨 $k$ 个样本里哪个是对的；它测的是**覆盖率**，不是用户拿到手的东西。其二，测试就是计分规则，而弱的测试会接受错误的程序：EvalPlus（Liu 等，2023）给 HumanEval 与 MBPP 加了大量测试，发现测得的通过率明显下降。

::: example 小基准能细到什么程度？ {#ex-granularity}
HumanEval 有 $164$ 题，GPQA Diamond 有 $198$ 题。在两者上每题各值多少个百分点？HumanEval 上 $80\%$、GPQA Diamond 上 $50\%$ 的分数的二项标准误差各是多少？
::: solution
每题：HumanEval 上 $100/164 = 0.61$ 个百分点，GPQA Diamond 上 $100/198 = 0.51$ 个。标准误差：$\sqrt{0.8\cdot0.2/164} = 0.031$，约 $3.1$ 个百分点；$\sqrt{0.5\cdot0.5/198} = 0.036$，约 $3.6$ 个。在任一基准上，单次运行得出的两三分之差都远在抽样噪声范围之内；[[evaluation/evaluation-statistics]] 会说明配对与重复采样如何让比较变得更锐利。
:::
:::

::: widget distribution
dist: binomial
params: n=164, p=0.8
a: 126
b: 136
normal: true
caption: 一个模型独立地以 $0.8$ 的概率解出 HumanEval 的每一题，它能解出题数的分布：约 $131\pm5$。$126$ 到 $136$ 之间的阴影带——即 $76.8\%$ 到 $82.9\%$ 的分数——约含四分之三的概率。改变 $n$，看看一个基准要有多少道题，一分之差才看得出来。
:::

::: quiz
一篇论文报告其模型"在 MATH 上得 $85$ 分"。要把它与另一模型报告的 $83$ 作比较，你需要哪些信息？
- [x] 用的是完整测试集还是 MATH-500 子集
- [x] 答案是按数学等价还是按字符串精确匹配校验
- [x] 分数是单次贪心采样、多次采样的平均、还是多数投票
- [ ] 模型的参数量
::: solution
前三项界定了被估计的对象（[[evaluation/evaluation-principles#def-evaluation]]）：题目集、计分规则与协议。任何一项都能让分数移动两分以上。参数量因别的原因有趣，但不影响这个数字的含义。即便三者都对齐，$500$ 题上的两分差也接近噪声水平。
:::
:::

## 基准的生命周期 {#sec-lifecycle}

基准会老化。Kiela 等（2021）画出从知名基准问世到模型追平其人类基线所经历的时间——MNIST、Switchboard、ImageNet、SQuAD、GLUE 等——发现它已从许多年缩短到一年左右。此后这一模式在 MMLU、GSM8K、HumanEval 等基准上不断重演：先是一段贴近随机水平的时期，然后快速上升，最后在上限附近进入平台。

::: definition 饱和 {#def-saturation}
当可获得的最佳分数接近基准的**上限**——在其题目的错误与含混之下能达到的最高分，常以人类专家基线或审计来估计——使得强模型之间的剩余差距与抽样噪声和标注错误相当时，该基准即**饱和**。对最佳分数随时间 $t$ 的变化，一个有用的描述性模型是 logistic **饱和曲线**

$$
s(t) = s_0 + (s_1 - s_0)\,\sigma\!\left(\frac{t - t_0}{\tau}\right),
$$ {#eq-saturation}

其中下限 $s_0$（随机水平）、上限 $s_1$、中点 $t_0$、时间尺度 $\tau$。它是经验描述，不是定律。
:::

::: proposition 饱和曲线的宽度与分辨率 {#prop-saturation}
在[[#eq-saturation]]下，从走完下限到上限之间全程的 $\alpha$ 处推进到 $1 - \alpha$ 处所需的时间为

$$
\Delta t = 2\tau\ln\frac{1 - \alpha}{\alpha},
$$

即从 $10\%$ 到 $90\%$ 为 $2\tau\ln9\approx4.39\,\tau$。进展速率 $s'(t) = (s_1 - s_0)\,\sigma(1 - \sigma)/\tau$ 在 $t_0$ 处最大，等于 $(s_1 - s_0)/(4\tau)$，并在两端降为零：在下限附近与上限附近，底层能力的大幅变化只会引起分数的小幅变化。
:::

::: proof
走过的比例是 $\sigma(u)$，其中 $u = (t - t_0)/\tau$。解 $\sigma(u) = \alpha$ 得 $u = \ln\frac{\alpha}{1 - \alpha}$，解 $\sigma(u) = 1 - \alpha$ 得 $u = \ln\frac{1 - \alpha}{\alpha}$；两者之差以 $\tau$ 为单位是 $2\ln\frac{1-\alpha}{\alpha}$。求导得 $s'(t) = (s_1 - s_0)\sigma'(u)/\tau$，其中 $\sigma' = \sigma(1 - \sigma)$，在 $u = 0$ 处取最大值（$\frac14$），当 $u\to\pm\infty$ 时趋于 $0$。
:::

::: example 预测基准的寿命 {#ex-lifetime}
一个四选一基准的估计上限为 $0.90$，报告的最佳分数一年内从 $0.35$ 升到 $0.60$。假设[[#eq-saturation]]成立、下限为 $0.25$，估计 $\tau$，以及最佳分数走到距上限 $90\%$ 处的时刻。
::: solution
跨度为 $0.65$。两个分数分别走完 $0.10/0.65 = 0.154$ 与 $0.35/0.65 = 0.538$，对应 logit 为 $\ln(0.154/0.846) = -1.705$ 与 $\ln(0.538/0.462) = 0.154$。比例的 logit 即 $(t - t_0)/\tau$，它在一年内上升了 $1.859$：$\tau = 1/1.859 = 0.538$ 年。以首次观察为起点按年计量 $t$，由 $0.154 = (1 - t_0)/\tau$ 得 $t_0 = 0.917$。$90\%$ 处的 logit 为 $\ln9 = 2.197$，到达时刻为 $t = 0.917 + 2.197\cdot0.538 = 2.10$ 年，此时分数为 $0.25 + 0.9\cdot0.65 = 0.835$。下限与上限已知时，两点恰好确定一条 logistic 曲线，所以这一外推的可信度完全取决于所设的形状与上限；它是规划用的估计，不是预言。
:::
:::

这条命题的后半部分，解释了为什么饱和的基准还没到 $100\%$ 就不再携带信息：在平坦的上尾，分数几乎不随能力变化，而有限题目与标注错误带来的噪声却不会缩小。底部同样的形状解释了某些基准上的"涌现"：平稳增长的能力可以表现出一个先趴在随机水平、随后陡然上升的分数（[[pretraining/in-training-evaluation]]）。

::: widget plot
f: 0.25 + (c - 0.25)/(1 + exp(-(x - m)/s)); (c - 0.25)*(1/(1 + exp(-(x - m)/s)))*(1 - 1/(1 + exp(-(x - m)/s)))/s
x: 2018, 2028
y: 0, 1
sliders: m=2022:2019:2026:0.1; s=0.7:0.2:2:0.05; c=0.92:0.6:1:0.01
labels: 最佳得分 $s(t)$；每年进展速率 $s'(t)$
hlines: 0.25
caption: 四选一基准（下限 $0.25$）按[[#def-saturation]]的饱和曲线，中点 $m$、时间尺度 $s$（以年计）、上限 $c$。进展速率在中点处最高，在下限与上限附近都消失。当 $s = 0.7$ 年时，从走完 $10\%$ 爬到 $90\%$ 约需三年。
:::

清单对一个**合成的**最佳分数史——由已知参数加噪声生成，充当真实基准的"最佳公开分数"——做最小二乘拟合，并估计它何时走到上限的 $90\%$ 处。

```python
import math, random

def curve(t, t0, tau, floor=0.25, ceil=0.92):
    """Best score on a 4-option benchmark at time t (years): logistic from chance to ceiling."""
    return floor + (ceil - floor) / (1 + math.exp(-(t - t0) / tau))

rng = random.Random(3)
# 每半年一个合成的"最佳公开分数"，由 t0 = 2022.0、tau = 0.7 生成
years = [2019 + 0.5 * i for i in range(13)]
best = [min(0.92, curve(t, 2022.0, 0.7) + rng.gauss(0, 0.015)) for t in years]

# 用网格搜索对 (t0, tau) 做最小二乘拟合，上下限固定
fit = min(((sum((curve(t, a, b) - s) ** 2 for t, s in zip(years, best)), a, b)
           for a in [2020 + 0.01 * i for i in range(401)]
           for b in [0.2 + 0.01 * j for j in range(181)]))
sse, t0, tau = fit
print(f"fitted t0 = {t0:.2f}, tau = {tau:.2f} years, rmse = {math.sqrt(sse / len(years)):.4f}")
w = 2 * tau * math.log(9)
print(f"10% -> 90% of the way from chance to ceiling takes {w:.2f} years")
print(f"90% point reached at t = {t0 + tau * math.log(9):.2f}")
for t, s in zip(years, best):
    print(f"{t:7.1f}  observed {s:.3f}  fitted {curve(t, t0, tau):.3f}")
```

```text
fitted t0 = 2021.96, tau = 0.69 years, rmse = 0.0114
10% -> 90% of the way from chance to ceiling takes 3.03 years
90% point reached at t = 2023.48
 2019.0  observed 0.261  fitted 0.259
 2019.5  observed 0.287  fitted 0.268
 2020.0  observed 0.272  fitted 0.287
 2020.5  observed 0.335  fitted 0.322
 2021.0  observed 0.376  fitted 0.383
 2021.5  observed 0.466  fitted 0.477
 2022.0  observed 0.613  fitted 0.595
 2022.5  observed 0.702  fitted 0.710
 2023.0  observed 0.790  fitted 0.798
 2023.5  observed 0.861  fitted 0.855
 2024.0  observed 0.901  fitted 0.887
 2024.5  observed 0.901  fitted 0.904
 2025.0  observed 0.920  fitted 0.912
```

拟合相当接近地找回了生成参数（$t_0 = 2022.0$、$\tau = 0.7$）。在真实数据上这类拟合很脆弱：上限未知，"最佳分数"混着模型、协议与污染，而曲线只在形状成立期间可以外推。它们的用处主要是在设计基准时，把预期的可用寿命讲明白。

### 基准为何饱和，新基准如何抵抗 {#sec-resist}

饱和有几个原因，每一代基准各回应了其中之一。

- **能力增长。** 模型确实在进步；按 2020 年的前沿水准定难度的基准，到 2025 年就变得容易。对策：更难的题目（MATH、GPQA、HLE）、需要长时间智能体工作的题目（SWE-bench），以及没有上限的开放尺度，例如任务长度（[[evaluation/capability-evaluations]]）。
- **数据污染。** 公开测试题混入训练数据。对策：私有或留出的测试集、金丝雀字符串、随时间注入新题的动态基准（[[evaluation/contamination]]）。
- **捷径解法。** 有些题靠表面线索就能解（Gururangan 等，2018 发现只看假设的分类器在推理数据集上就表现良好）。对策：对抗式采集，让标注者写出能难倒当前模型的题目（Adversarial NLI，Nie 等，2020；Dynabench，Kiela 等，2021）。
- **优化压力。** 人人都报告的基准，正是人人都为之调参的基准（[[evaluation/evaluation-principles#sec-goodhart]]）。对策：在许多基准上评测、轮换使用，并看重模型开发时未针对的基准上的结果。
- **上限效应。** 标注错误给可达分数封顶。对策：专家校验与审计（GPQA 的专家一致性、SWE-bench Verified）。

对抗式筛选是使基准变难的最直接办法，但有代价：靠丢弃某些模型能解的题目建起来的基准，按构造就对这些模型最难。就相对于筛选模型的进展而言，它的分数是有信息的；但在更新的模型被评测之前，把筛选模型纳入其中的比较是有偏的，下面的例子里会看到这一点。

::: example 筛选偏差 {#ex-filter-bias}
一个基准只保留模型 F 一次作答答错的题目。设候选题中一半对 F 是"简单"题（它成功概率 $0.9$），一半是"困难"题（概率 $0.1$）；第二个模型 G 有相同的逐题概率，但错误相互独立。F（重新作答一次）与 G 在保留题目上的期望准确率各是多少？
::: solution
简单题以 $0.1$ 的概率被保留、困难题以 $0.9$ 的概率被保留，所以保留集里 $0.05/(0.05 + 0.45) = 10\%$ 是简单题、$90\%$ 是困难题。F 重新作答的成功概率为 $0.1\cdot0.9 + 0.9\cdot0.1 = 0.18$；G 的作答也是，因为 G 的逐题概率相同。两者都从候选题池上的 $0.5$ 掉到 $0.18$，因为筛选挑出的是对这一*类*模型难的题。反过来，若 G 的难易与 F 无关（G 独立于 F、以相同概率觉得每题简单或困难），G 在保留集上仍是 $0.5$，于是在候选题池上势均力敌的两方中，G 会显得比 F 强得多。真实的筛选两种效应兼有；它的偏差压在筛选模型以及与它们相似的模型身上。
:::
:::

::: history
语言技术的共享基准可追溯到 DARPA 与 NIST 的语音识别与机器翻译评测（始于 1980 年代末）和文本检索会议（TREC，始于 1992 年）；宾州树库（Penn Treebank；Marcus 等，1993）定义了十年的解析研究，SQuAD（Rajpurkar 等，2016）则定义了阅读理解的早期神经网络时代。GLUE（Wang 等，2018）与 SuperGLUE（Wang 等，2019）把许多任务打包成单一排行榜，两年内即被超越。少样本时代带来了 MMLU（Hendrycks 等，2021）、GSM8K（Cobbe 等，2021）、MATH（Hendrycks 等，2021）与 HumanEval（Chen 等，2021）；2022 年带来了广度——BIG-bench（Srivastava 等）与 HELM（Liang 等）；2023 年带来了专家编写的题目（GPQA，Rein 等）与真实的软件工程（SWE-bench，Jimenez 等）。人类的最后考试（Phan 等，2025）汇集了经前沿模型筛选过的专家题目。贯穿这一切的，是记录这些假象的论文——标注捷径（Gururangan 等，2018）、测试太弱（Liu 等，2023）、标注错误（Gema 等，2024）——它们与基准本身同样重要。
:::

::: summary
- 基准把题目、参考答案与计分包裹起来供人复用。里程碑：理解——GLUE（2018）与 SuperGLUE（2019）；知识——MMLU（2021）；广度——BIG-bench 与 HELM（2022）；数学——GSM8K 与 MATH；代码——HumanEval（2021）；专家科学——GPQA（2023）；软件工程——SWE-bench（2023）；可验证指令——IFEval；语言——MGSM、Belebele 与 Global-MMLU；前沿知识——人类的最后考试（2025）。
- 形式：选择题可按**对数似然**（原始、按词元、按字符或 **PMI** 归一化，[[#prop-length]]）或按**生成**打分（伴随抽取与选项顺序偏差）；短答案在归一化后按**精确匹配**与**词元 F1**（[[#def-em-f1]]）；代码按**执行**与 pass@$k$（[[#eq-passk]]）；开放式任务交由评审。
- 基准名称框不住题目子集、版本或协议；只比较对齐了的数字。
- 小基准很粗糙：HumanEval 每题值 $0.61$ 个百分点，其在 $80\%$ 附近的标准误差约 $3$ 个百分点。
- 基准沿大致 logistic 的曲线**饱和**（[[#eq-saturation]]）；进展在中段最快、在上限附近不可见（[[#prop-saturation]]），到饱和的时间已缩短到一两年。
- 新基准用更难、经专家校验、执行式、留出或动态的题目抵抗饱和；对抗式筛选会针对筛选模型本身把分数压低（[[#ex-filter-bias]]）。
:::

## 习题

::: exercise 每题值多少 {level=1 check="0.610"}
HumanEval（$164$ 题）每题值多少个百分点？给出三位小数。
::: solution
$100/164 = 0.610$ 个百分点。
:::
:::

::: exercise 词元 F1 {level=1 check="0.667"}
参考答案是 "George Washington"，预测是 "The first president, George Washington"。按[[#def-em-f1]]计算精确匹配与词元 F1，精确到三位小数。
::: solution
归一化后的预测："first president george washington"（$4$ 个词元）；参考 "george washington"（$2$ 个词元）。精确匹配 $0$。共享词元 $2$ 个：精确率 $2/4 = 0.5$，召回率 $2/2 = 1$，F1 $= 2\cdot0.5\cdot1/1.5 = 0.667$。
:::
:::

::: exercise GPQA Diamond 上的标准误差 {level=1 check="3.55"}
GPQA Diamond（$198$ 题）上 $50\%$ 的分数的二项标准误差是多少个百分点？精确到两位小数。
::: solution
$100\sqrt{0.25/198} = 100\cdot0.03553 = 3.55$ 个百分点。
:::
:::

::: exercise pass@5 {level=2 check="0.9167"}
某题抽了 $n = 10$ 个样本，$c = 3$ 个通过测试。按[[#eq-passk]]计算 pass@$5$ 的估计，精确到四位小数，并与朴素估计 $1 - (1 - 0.3)^5$ 比较。
::: solution
$\binom{7}{5} = 21$、$\binom{10}{5} = 252$，故 $\widehat{\text{pass@}5} = 1 - 21/252 = 0.9167$。朴素代入 $1 - 0.7^5 = 0.8319$ 把样本当作从成功率恰为 $0.3$ 的分布中有放回抽出；无偏估计数的则是实际样本的子集。
:::
:::

::: exercise 从一成到九成 {level=2 check="2.197"}
某基准的最佳分数服从[[#eq-saturation]]，时间尺度 $\tau = 0.5$ 年。从随机水平走到上限的 $10\%$ 处推进到 $90\%$ 处需要多少年（三位小数）？从 $25\%$ 到 $75\%$ 呢？
::: solution
由[[#prop-saturation]]，$2\cdot0.5\cdot\ln9 = \ln9 = 2.197$ 年。从 $25\%$ 到 $75\%$：$2\cdot0.5\cdot\ln3 = 1.099$ 年——时间正好一半，因为 $\ln3 = \frac12\ln9$。
:::
:::

::: exercise 手算 PMI {level=2}
模型对某题的三个选项 "yes"、"no"、"it depends" 给出条件对数概率 $-0.7$、$-1.0$、$-3.0$，在中性提示 "Answer:" 之后给出 $-1.5$、$-2.5$、$-6.5$。原始打分、按词元打分（三个选项分别有 $1$、$1$、$2$ 个词元）与 PMI 打分各选哪个？PMI 的选择对题目的作用说明了什么？
::: solution
原始打分选 "yes"（$-0.7$）。按词元：$-0.7$、$-1.0$、$-1.5$，选 "yes"。PMI（[[#eq-pmi]]）：$0.8$、$1.5$、$3.5$，选 "it depends"。题目把 "it depends" 的概率抬高了 $e^{3.5}\approx33$ 倍，比任何选项都多，尽管这一说法绝对看来仍然不太可能出现，因为含糊其辞的长答案很罕见。哪条规则正确取决于基准：当正确答案是异常串时 PMI 有帮助，但它也可能过度奖励罕见选项。
:::
:::

::: exercise 饱和曲线中的猜测下限 {level=2 check="0.865"}
一个十选一基准的估计上限为 $0.95$。在[[#eq-saturation]]下、下限为 $1/10$，从下限到上限走完 $90\%$ 处是什么分数（三位小数）？为什么这比 $90\%$ 这样的固定分数是更好的"接近饱和"的定义？
::: solution
从下限到上限的跨度是 $0.95 - 0.1 = 0.85$，其 $90\%$ 是 $0.765$，故该点为 $0.1 + 0.765 = 0.865$。固定阈值忽视了两个端点：$0.90$ 的分数在四选一基准与十选一基准上占可达区间的比例不同；若标注错误把上限封在 $0.95$，那么 $0.90$ 已经走完 $\frac{0.90 - 0.1}{0.85} = 94\%$。以占上下限跨度的比例衡量进展，能让形式与错误率不同的基准互相可比。
:::
:::

::: exercise 对两个模型做筛选 {level=3 check="0.11"}
在[[#ex-filter-bias]]的设定下，现在只保留 F 与 G 各作答一次都答错的题目，其中 F 与 G 有相同的逐题概率（简单题 $0.9$、困难题 $0.1$）、作答相互独立。第三个模型 H 独立于 F 与 G 地觉得每题简单或困难，概率各 $\frac12$，成功概率分别为 $0.9$ 与 $0.1$。计算 F 在保留题目上重新作答一次的期望准确率（两位小数），以及 H 的。然后解释这如何推广。
::: solution
简单题以 $0.1^2 = 0.01$ 的概率被保留，困难题以 $0.9^2 = 0.81$；保留集中简单题占 $0.005/(0.005 + 0.405) = 1.22\%$。F 重新作答的准确率是 $0.0122\cdot0.9 + 0.9878\cdot0.1 = 0.1098\approx0.11$。H 的准确率不受筛选影响：$0.5\cdot0.9 + 0.5\cdot0.1 = 0.5$。对更多尝试次数或更多相似模型做筛选，会更强烈地把保留集集中到对该模型家族难的题目上。一般地，筛选过的基准测量的是*相对于筛选器的*难度；筛选模型（及与它们相关的模型）的分数被系统性压低，而在用未参与筛选的模型重新定标之前，与无关模型的比较会偏向后者。
:::
:::

::: exercise 实现似然打分 {level=3}
写一个函数，用四种规则——原始、按词元、按字符（UTF-8 字节）、PMI——从逐词元对数概率为选择题选项打分，并返回每种规则所选的选项。用[[#ex-pmi]]的选项测试它，把每个选项当作一个词元。然后说明：对一个给串赋予的概率与分词无关的模型，为什么前三种规则中只有按字节规则得到的分数不依赖分词器。
::: solution
```python
def choose(options):
    """options: {text: (cond_logprobs, uncond_logprobs)}, lists of per-token log-probs."""
    rules = {
        "raw":       lambda a, c, u: sum(c),
        "per token": lambda a, c, u: sum(c) / len(c),
        "per byte":  lambda a, c, u: sum(c) / len(a.encode("utf-8")),
        "PMI":       lambda a, c, u: sum(c) - sum(u),
    }
    return {name: max(options, key=lambda a: r(a, *options[a])) for name, r in rules.items()}

opts = {"Sydney": ([-1.2], [-5.0]), "Canberra": ([-1.5], [-7.5]), "Melbourne": ([-2.5], [-5.8])}
print(choose(opts))
```

```text
{'raw': 'Sydney', 'per token': 'Sydney', 'per byte': 'Canberra', 'PMI': 'Canberra'}
```

按字节：Sydney 得 $-1.2/6 = -0.200$，Canberra 得 $-1.5/8 = -0.1875$，Melbourne 得 $-2.5/9 = -0.278$，于是计入长度之后较长的正确名字胜出；按词元则不然，因为这里每个选项都只有一个词元。关于分词独立性：词元对数概率之和是 $\log p(a\mid c)$，即该*串*的对数概率，与如何分词无关（对给串赋予一致概率的模型而言）。原始分数只依赖串本身，但惩罚长度；除以词元数会让分数取决于分词器如何切分这个串，于是分词器不同的两个模型被归一化的方式不同；除以字节数用的是串自身的性质，得到的按字节对数似然（每字节比特数的相反数乘以 $\ln2$，[[text-and-language/perplexity]]）在不同分词器之间可比。
:::
:::
