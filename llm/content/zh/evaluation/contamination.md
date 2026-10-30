基准衡量的是模型在它没见过的题目上能做什么。语言模型用从网络采集的数万亿词元训练，而网络上就有基准：被上传到代码仓库的测试集、在论坛上连同答案一起讨论的题目、引用例题的论文，以及由那些本身在测试数据上训练过的模型生成的页面。当一道测试题、它的答案、或一个贴近的改述出现在训练数据中时，评测就部分地在度量**记忆化**，分数便高估了能力。这就是**测试集污染**，它在[[pretraining/training-data]]中作为数据流水线问题被引入；本章把它当作一个测量问题来处理。

本章定义污染的种类及其对分数的作用，并展示污染存在时如何估计干净分数。它用纯 Python 实现了经典的检测器——**$13$-gram 重叠**，即 GPT-3 分析中的做法——并推导它在改述之下失效得有多快。它介绍不访问训练数据时的检测方法：用 Min-K% Prob 做**成员推断**、能在统计上证明污染的**置换检验**、以及**金丝雀字符串**。随后转向污染与过拟合影响真实分数的证据——尤其是 **GSM1k** 研究——以及主要的补救办法：**动态与留出基准**，如 LiveBench 与 LiveCodeBench；它们也关乎基准消亡的另一条路径：饱和（[[evaluation/benchmarks#sec-lifecycle]]）。

## 污染的种类 {#sec-kinds}

::: definition 污染 {#def-contamination}
若决定某题答案的信息以该题特有的形式进入了模型的训练（预训练、微调或强化学习），则对该模型而言这道评测题被**污染**了。区分：

- **逐字输入污染**：题目出现了，但不带答案；
- **逐字输入–输出污染**：题目连同其答案或解法一起出现；
- **改述或翻译污染**：出现改写或翻译过的版本，带着答案；
- **间接污染**：题目经由其他模型的输出到达模型——由见过它的模型生成的合成训练数据，或从这样的模型蒸馏出的数据；
- **评测时污染**：具备搜索或检索能力的模型在评测过程中于网上找到了该题或其答案。

基准的**污染率** $c$ 是其题目中被污染题目的比例。一个相关但不同的问题是**分布过拟合**：训练数据在风格与模板上与某基准过于相似，以致模型没见过它的题目却学到了它的怪癖。
:::

只有输入的污染并非无害——见过一个问题很多次的模型可能更容易解析它，而 Magar 与 Schwartz（2022）发现，在某些任务上模型能够利用预训练期间见过的测试样例，即使没有标签——但最有害的种类把答案也一并奉上。污染还是个程度问题：在数万亿词元的爬取数据中见过一次的题目可能不留可测的痕迹，而被重复数百次的题目可能被逐字背诵（[[llm-society/privacy-memorisation]]）。

### 污染对分数的作用 {#sec-effect}

设每题 $i$ 有两个分数：该题不在模型训练数据中时模型本会取得的 $Y_i^0$，以及该题在其中时的 $Y_i^1$——用因果推断的语言说，这是**潜在结果**。二者只观测得到一个：污染题观测 $Y_i^1$，干净题观测 $Y_i^0$。

::: proposition 膨胀与干净子集估计 {#prop-inflation}
令 $D_i\in\{0, 1\}$ 指示污染，$c = \Prob(D = 1)$，观测分数 $Y_i = D_iY_i^1 + (1 - D_i)Y_i^0$。关心量是无污染分数 $\mu_0 = \E[Y^0]$。于是：

1. 总体分数对它的高估为
$$
\E[Y] - \mu_0 = c\,\big(\E[Y^1\mid D = 1] - \E[Y^0\mid D = 1]\big),
$$ {#eq-inflation}
即污染率乘以污染对受污染题目的平均收益。
2. 若污染与难度独立，$\E[Y^0\mid D = 1] = \E[Y^0\mid D = 0]$，则**干净子集分数** $\E[Y\mid D = 0]$ 等于 $\mu_0$，而脏减净之差 $\E[Y\mid D = 1] - \E[Y\mid D = 0]$ 等于平均收益。
3. 若受污染的题目系统性地更简单（或更难），脏减净之差便把污染的收益与难度差混在一起，而干净子集分数估计的只是恰好干净的那**类**题目上的分数。
:::

::: proof
(1) 由全期望，$\E[Y] = c\,\E[Y^1\mid D = 1] + (1 - c)\,\E[Y^0\mid D = 0]$，且 $\mu_0 = c\,\E[Y^0\mid D = 1] + (1 - c)\,\E[Y^0\mid D = 0]$；两式相减即得[[#eq-inflation]]。(2) 在独立之下，$\E[Y\mid D = 0] = \E[Y^0\mid D = 0] = \E[Y^0] = \mu_0$，且 $\E[Y\mid D = 1] - \E[Y\mid D = 0] = \E[Y^1\mid D = 1] - \E[Y^0\mid D = 1]$。(3) 一般地，$\E[Y\mid D = 1] - \E[Y\mid D = 0] = \big(\E[Y^1 - Y^0\mid D = 1]\big) + \big(\E[Y^0\mid D = 1] - \E[Y^0\mid D = 0]\big)$，即收益加上一个只在独立之下才为零的难度差。
:::

第 3 点不是学究气。泄漏到网上的题目往往是那些著名的、简单的或被反复讨论的题目；被 $n$-gram 重叠标记的题目往往偏长（可比对的 $n$-gram 更多）、且使用常见措辞。GPT-3 的作者（Brown 等，2020）为每个基准都报告了干净子集结果，他们注意到若干基准的脏子集与干净子集之间存在与污染无关的差异，因此一个很小的脏减净之差两边都不是强证据。

::: example 估计干净分数 {#ex-clean}
一个模型在某基准上总体得 $84\%$。一次重叠分析把 $30\%$ 的题目标为受污染，模型在这些题上得 $95\%$。它在干净子集上的分数是多少？[[#prop-inflation]]对膨胀说了什么？
::: solution
由 $0.84 = 0.3\cdot0.95 + 0.7\,s_{\text{clean}}$ 得 $s_{\text{clean}} = (0.84 - 0.285)/0.7 = 0.793$。若被标记的题目并不比其他题目更容易，则污染的收益是每道受污染题 $0.95 - 0.793 = 0.157$，总体分数被抬高 $0.3\cdot0.157 = 0.047$，约五个百分点。若被标记的题目本身也更简单——这说得通，因为流行的题目会泄漏——那么 $0.157$ 中有一部分是难度，膨胀就更小。无论哪种情形，诚实的报告都会给出这两个数字和检测方法。
:::
:::

::: widget plot
f: (1 - x)*a + x*(a + (1 - a)*m); a
x: 0, 1
y: 0, 1
sliders: a=0.6:0:1:0.01; m=0.8:0:1:0.01
labels: 观测分数；未污染分数 $\mu_0$
caption: 观测分数随污染率 $c$ 的变化：模型未受污染时每题准确率为 $a$，而在一道本来会答错的受污染题目上以概率 $m$ 回忆起答案。由[[#eq-inflation]]，膨胀为 $c(1 - a)m$：对弱模型与强记忆化最大。因此同一比例的污染会扭曲强弱不同的模型之间的比较。
:::

## 利用训练数据检测污染 {#sec-ngram}

当训练语料可得时——对开发者而言，或者对开放数据的模型而言对任何人都一样——可以直接搜索污染。标准方法寻找较长的共享词序列。

::: algorithm $n$-gram 重叠检测 {#alg-ngram}
1. **归一化与分词**每道基准题目与每篇训练文档：转小写、去标点、切成词（或用模型词元）。
2. 构建训练语料全部 $n$-gram（连续 $n$ 个词元的串）的集合——语料庞大，实践中用哈希集合、布隆过滤器或后缀数组。
3. 对每道题计算它的 $n$-gram 以及在训练集中找到的比例。
4. 若比例（或计数）超过阈值，把该题标为**脏**。GPT-3 分析用的是任意一次匹配即算——多数基准取 $n = 13$，短题基准取较短的 $n$；PaLM 分析（Chowdhery 等，2022）用的是至少 $70\%$ 的 $8$-gram。
5. 报告污染率以及脏、净子集上的分数；训练前可选地从训练数据中移除脏文档（**去污染**）。
:::

$n$ 的选择在假阳性与假阴性之间折衷。像 "how many apples does she have" 这样的短 $n$-gram 出现在许多互不相关的文档里；很长的则会漏掉有任何微小改动的题目。十三个词足够长，使不相关文本之间的偶然匹配在自然语言中很罕见；又足够短，能抓到部分复制。

```python
import re

def tokens(text):
    """Lower-case word tokens with punctuation removed, as in the GPT-3 contamination analysis."""
    return re.findall(r"[a-z0-9]+", text.lower())

def ngrams(toks, n):
    return {tuple(toks[i:i + n]) for i in range(len(toks) - n + 1)}

test_items = {
    "q1": "A baker makes 24 muffins in the morning and twice as many in the afternoon. "
          "She sells 50 muffins. How many muffins does she have left at the end of the day?",
    "q2": "Tom has 3 boxes with 12 pencils in each box. He gives 7 pencils to his sister "
          "and loses 4 more. How many pencils does Tom have now?",
    "q3": "A train travels 60 miles per hour for 2 hours and then 45 miles per hour for "
          "3 hours. What is the total distance the train travels?",
    "q4": "A garden has 8 rows of tomato plants with 15 plants in each row. If 10 plants "
          "die, how many tomato plants are left in the garden?",
}
training_docs = [
    # 逐字复制了 q1（连同其答案）的论坛帖子
    "Can someone help with my homework? A baker makes 24 muffins in the morning and twice "
    "as many in the afternoon. She sells 50 muffins. How many muffins does she have left at "
    "the end of the day? I got 22.",
    # q2 的改述：同一道题，措辞不同
    "Tom owns three boxes, each holding a dozen pencils. After giving seven to his sister "
    "and losing four, how many pencils remain?",
    # 只引用了 q3 一部分的页面
    "Speed problems: a train travels 60 miles per hour for 2 hours and then 45 miles per "
    "hour, so what is its average speed overall?",
    "The tomato is a plant in the nightshade family. Gardeners grow it in rows in the garden.",
]
n = 13
train = set()
for doc in training_docs:
    train |= ngrams(tokens(doc), n)

for name, text in test_items.items():
    grams = ngrams(tokens(text), n)
    hit = grams & train
    print(f"{name}: {len(tokens(text)):2d} tokens, {len(grams):2d} {n}-grams, "
          f"{len(hit):2d} found in training data ({len(hit) / len(grams):.0%}) -> "
          f"{'DIRTY' if hit else 'clean'}")
```

```text
q1: 32 tokens, 20 13-grams, 20 found in training data (100%) -> DIRTY
q2: 28 tokens, 16 13-grams,  0 found in training data (0%) -> clean
q3: 27 tokens, 15 13-grams,  4 found in training data (27%) -> DIRTY
q4: 27 tokens, 15 13-grams,  0 found in training data (0%) -> clean
```

检测器的表现与设计一致，也暴露出它的两种失效方式。q1 的逐字复制——连同答案——被抓到了。泄露了同一道题的 q2 的改述则被完全漏掉：没有一个 $13$-gram 在改写之后幸存。而 q3 被标记了，尽管那篇训练文档问的是一个*不同的*问题（平均速度而非总距离）、且不含答案：就真正要紧的目的而言，部分引用是一个假阳性。q4 与某篇训练文档共享个别单词（"tomato"、"rows"、"garden"）但不共享长序列，被正确地判为干净。

### 检测在改述之下失效多快 {#sec-paraphrase}

改述可以被粗略地建模为以概率 $r$ 独立地编辑题目的每个词元。一个 $n$-gram 只有在它的 $n$ 个词元都没被编辑时才幸存。

::: proposition 编辑之下 $n$-gram 的幸存 {#prop-survival}
一道 $L\ge n$ 个词元的题目被编辑，每个词元独立地以概率 $r$ 被编辑，且被编辑的词元绝不匹配。题目在训练副本中仍逐字存在的 $n$-gram 数 $S$ 满足

$$
\E[S] = (L - n + 1)(1 - r)^n,\qquad \Prob(\text{被检出}) = \Prob(S\ge1)\le\min\big(1, (L - n + 1)(1 - r)^n\big).
$$ {#eq-survival}
:::

::: proof
第 $j$ 个 $n$-gram 幸存，当且仅当它的 $n$ 个词元全都未被编辑，由独立性概率为 $(1 - r)^n$；对 $L - n + 1$ 个位置求指示变量之和，由期望的线性得 $\E[S]$。相互重叠的 $n$-gram 并不独立，但由马尔可夫不等式有 $\Prob(S\ge1)\le\E[S]$（等价地，对位置取联合界），而概率至多为 $1$。
:::

这个界显示出对 $n$ 的指数敏感性：在 $30\%$ 的编辑率下，一道 $40$ 词元的题目有 $\E[S] = 28\cdot0.7^{13} = 0.27$ 个幸存的 $13$-gram，因此被检出的概率至多 $27\%$。至于至少一个串幸存的精确概率——通过对当前未编辑词元串的长度做动态规划计算——还要更低。

```python
def p_detect(L, n, r):
    """Exact probability that an item of L tokens, each edited independently with
    probability r, still contains a run of n unedited tokens (one surviving n-gram)."""
    # 状态：当前未编辑词元串的长度（0..n-1）；一旦达到 n 即进入吸收态
    probs = [1.0] + [0.0] * (n - 1)
    found = 0.0
    for _ in range(L):
        new = [0.0] * n
        for run, p in enumerate(probs):
            new[0] += p * r                      # 该词元被编辑：串归零
            if run + 1 == n:
                found += p * (1 - r)             # 串补足：该 n-gram 幸存
            else:
                new[run + 1] += p * (1 - r)
        probs = new
    return found

L = 40
for n in (8, 13):
    for r in (0.05, 0.1, 0.2, 0.3):
        bound = min(1.0, (L - n + 1) * (1 - r) ** n)
        print(f"n = {n:2d}, edit rate {r:.2f}: P(detect) = {p_detect(L, n, r):.3f}, "
              f"expected surviving n-grams {(L - n + 1) * (1 - r) ** n:6.2f}, bound {bound:.3f}")
```

```text
n =  8, edit rate 0.05: P(detect) = 1.000, expected surviving n-grams  21.89, bound 1.000
n =  8, edit rate 0.10: P(detect) = 0.990, expected surviving n-grams  14.21, bound 1.000
n =  8, edit rate 0.20: P(detect) = 0.839, expected surviving n-grams   5.54, bound 1.000
n =  8, edit rate 0.30: P(detect) = 0.510, expected surviving n-grams   1.90, bound 1.000
n = 13, edit rate 0.05: P(detect) = 0.962, expected surviving n-grams  14.37, bound 1.000
n = 13, edit rate 0.10: P(detect) = 0.791, expected surviving n-grams   7.12, bound 1.000
n = 13, edit rate 0.20: P(detect) = 0.332, expected surviving n-grams   1.54, bound 1.000
n = 13, edit rate 0.30: P(detect) = 0.087, expected surviving n-grams   0.27, bound 0.271
```

每五个词改一个，$13$-gram 检测器就只能在受污染的 $40$ 词元题目中找到三分之一；$8$-gram 检测器能找到大多数，代价是更多的偶然匹配。真实的改述不是独立编辑——它们重排从句、每隔几个词就改动——而真实模型从改述中得到的帮助可以并不比从复制中少。Yang 等（2023）直接展示了这一点：在改述或翻译过的测试集上微调模型会大幅抬升其基准分数，而 $n$-gram 去污染几乎检测不到这些改述过的题目；他们提出先用嵌入搜索、再用模型评审来找语义重复。

::: widget plot
f: clamp((L - n + 1)*(1 - x)^n, 0, 1)
x: 0, 0.6
y: 0, 1
sliders: n=13:5:25:1; L=40:25:120:1
labels: $\Prob(\text{被检出})$ 的联合界
caption: [[#prop-survival]]给出的上界：每个词元以概率 $r$（横轴）被编辑之后，$n$-gram 重叠仍能检出一道 $L$ 词元题目的概率。一旦 $r$ 超过 $1/n$ 的几倍，检测便崩塌：$n$ 越大意味着不相关文本之间的假匹配越少，但对改写的稳健性差得多。
:::

## 不访问训练数据的污染检测 {#sec-blackbox}

对多数商业模型和许多开放权重模型，训练数据并不公开。污染就只能从模型的行为推断。

### 成员推断：Min-K% Prob {#sec-mink}

**成员推断**检验根据模型的输出判定给定文本是否在其训练数据中。思路是训练会降低训练文本上的损失，于是它们在模型看来比可比的未见文本概率更高。原始损失是个糟糕的信号，因为有些文本本来就很好预测（常见短语、简单语言），见没见过都一样。

::: definition Min-K% Prob {#def-mink}
对文本 $x_1, \dots, x_T$ 与模型 $p_\theta$，计算词元对数概率 $\ell_t = \log p_\theta(x_t\mid x_{<t})$，取最小的 $\lceil kT\rceil$ 个（最不可能的词元）构成集合 $\mathcal{M}$，定义

$$
\text{Min-}k\%(x) = \frac{1}{\lvert\mathcal{M}\rvert}\sum_{t\in\mathcal{M}}\ell_t.
$$

若 $\text{Min-}k\%(x)$ 超过某个阈值，就预测该文本是训练成员。提出该方法的 Shi 等（2024）使用 $k = 20\%$，并在 **WikiMIA** 上评估——一组关于模型训练截止之前（成员）与之后（非成员）的事件的维基百科段落。
:::

其道理是：未见过的文本通常含有少数概率极低的**离群词元**——一个不常见的名字、一个具体的数字——而在训练中见过的文本，这些词元的概率已被推高。只对最差的词元取平均，就把注意力集中在它们身上，而略过了每个模型都预测得很好的大量容易词元。

::: example 计算 Min-K% Prob {#ex-mink}
一段 $10$ 词元的段落，词元对数概率为 $-0.1, -0.3, -2.5, -0.2, -4.0, -0.05, -1.2, -0.4, -3.1, -0.6$。计算它的平均对数概率与 Min-$20\%$ Prob。
::: solution
平均值为 $-12.45/10 = -1.245$。最低的 $20\%$（$2$ 个词元）是 $-4.0$ 与 $-3.1$，故 Min-$20\%$ 为 $-3.55$。模型记住过的段落，其两个最难词元通常会远为接近零，且它的 Min-$20\%$ 的上升会比平均值多，因为平均值被几乎不变的容易词元主导。
:::
:::

针对大语言模型的成员推断比早期结果表明的更难。Duan 等（2024）在训练于 Pile 的模型上评估了若干方法（包括 Min-K% Prob），成员与非成员取自*同一*分布，结果发现多数设置下表现只略好于随机；他们把 WikiMIA 这类基准上的表面成功很大程度上归因于成员与非成员之间的**分布偏移**（非成员关乎更晚的事件，在内容与措辞上都不同）。由于基准的题目与可比的未见题目之间没有日期可作区分，这对污染问题很要紧：成员分数只是关于特定题目的提示性证据，在题目被见过很多次时最强，而很少算得上证明。

### 逐字污染的置换检验 {#sec-permutation}

Oren 等（2023）找到一种仅凭对数概率就为某类污染取得*可证明*证据的办法。基准作为文件分发，其中题目按固定的**规范顺序**排列。若模型训练过这个文件，它可能学会了这个顺序：第 $17$ 题倾向于跟在第 $16$ 题之后。若没有训练过，规范顺序并不比其他顺序更可能。

::: proposition 一个可交换性检验 {#prop-permutation}
令 $X = (x_1, \dots, x_m)$ 为按规范顺序排列的基准，并设原假设 $H_0$ 成立：规范顺序在模型看来是可交换的——对每个置换 $\sigma$，序列 $X_\sigma = (x_{\sigma(1)}, \dots, x_{\sigma(m)})$ 在模型之下的对数概率分布与 $X$ 相同。抽 $B$ 个随机置换，计算 $L_0 = \log p_\theta(X)$ 与 $L_b = \log p_\theta(X_{\sigma_b})$（$b = 1, \dots, B$），令

$$
\hat p = \frac{1 + \#\{b : L_b\ge L_0\}}{B + 1}.
$$

则在 $H_0$ 之下，对每个 $\alpha\in(0, 1)$ 有 $\Prob(\hat p\le\alpha)\le\alpha$：$\hat p$ 是一个有效的 $p$ 值。
:::

::: proof
在 $H_0$ 之下，$B + 1$ 个值 $L_0, L_1, \dots, L_B$ 可交换：对模型而言，规范顺序不过是又一个均匀随机的排列。$L_0$ 在其中的秩（平局算作不利于 $L_0$）因此至少与在 $\{1, \dots, B + 1\}$ 上均匀分布时一样可能偏大。$\hat p\le\alpha$ 要求至多 $\alpha(B + 1) - 1$ 个 $L_b$ 达到 $L_0$，即 $L_0$ 位于前 $\lfloor\alpha(B + 1)\rfloor$ 个值之中，其概率至多 $\lfloor\alpha(B + 1)\rfloor/(B + 1)\le\alpha$。
:::

小的 $p$ 值证明了模型偏好规范顺序——这是它见过基准文件、或以该顺序见过其派生物的有力证据。该检验没有超出其声称水平的假阳性（给定可交换性——若题目自有自然顺序，例如难度递增，可交换性可能不成立），但有假阴性：题目被打乱过、散落在各网页上、或只见过几次的模型不会露出马脚。Oren 等把基准切成多个分片使检验可行，并报告了一些基准在部分开放模型中的污染证据，但不是多数。

### 金丝雀字符串与激发 {#sec-canaries}

基准作者可以预先让检测更容易。BIG-bench 的作者（Srivastava 等，2022）在基准的每个文件里放入一条**金丝雀字符串**——一句固定文本，要求不要把该数据用于训练，附带一个唯一的随机标识符（GUID）。开发者可以过滤掉任何含有金丝雀的文档；而如果模型在被提示标识符的开头时能够补全它，那它几乎肯定训练过含有该标识符的文件。GPT-4 技术报告（OpenAI，2023）提到 BIG-bench 的部分内容被无意间混入了训练集。金丝雀只有在基准连同金丝雀被完整地复制、且开发者据此过滤时才起作用。

相关的做法是要求模型从开头复述一道测试题，或在给定基准名称与划分时生成一道题（Golchin 与 Surdeanu，2023）。逐字或近似逐字的复述是污染的证据；复述失败并不是没有污染的证据，因为模型可以从它复述不出来的数据中获益。

::: quiz
关于污染检测，哪些说法是正确的？
- [x] $13$-gram 重叠会漏掉答案以改述形式泄漏的题目
- [x] 在可交换性成立之下，置换检验无需访问训练数据就能控制假阳性率
- [ ] Min-K% Prob 分数低，证明该题目不在训练数据中
- [x] 即使匹配的那篇文档并未揭示答案，基准题目也可能被 $n$-gram 重叠标记
::: solution
改述会击穿精确的 $n$-gram 匹配（[[#prop-survival]]），而部分引用会产生不泄漏答案的标记，如清单所示。置换检验在其原假设之下是有效的检验（[[#prop-permutation]]）。成员分数噪声很大，在成员与非成员同分布时往往接近随机（Duan 等，2024）；低分数不能证明不存在。
:::
:::

## 过拟合的证据：GSM1k {#sec-gsm1k}

检测办法识别的是特定的受污染题目。另一个问题是：某个基准上发表的分数是否**总体上**被抬高了，无论原因是什么——污染、改述过的泄漏、还是训练了与基准过于相似以致学到其怪癖的数据。最干净的检验是**从同一分布构造一个新测试集**，看分数是否保得住。

Zhang 等（2024）对 GSM8K 做了这件事。他们委托制作了 **GSM1k**：$1{,}250$ 道新的小学数学题，由人类标注者在没有语言模型帮助下编写，设计上匹配 GSM8K 的风格、难度分布（以解题步数与人类解出率衡量）与答案格式，并保守秘密以避免污染。然后他们在两者之上评测了许多开放与闭源模型。他们报告的发现是这些。一些模型家族在几乎所有尺寸上都在 GSM1k 上相对 GSM8K 出现准确率下降——对 GSM8K 系统性过拟合的证据——幅度达数个百分点；许多其他模型，包括他们测试的前沿模型，下降很少或没有。他们还发现，模型生成 GSM8K 测试样例的每字符对数似然（一种成员式信号）与其 GSM8K–GSM1k 差距的大小之间存在正相关，与污染部分是成因相吻合，同时指出这解释不了全部变异，因此很可能还涉及其他形式的过拟合。这项研究是*一些*已报告的 GSM8K 分数高估了相应能力的证据，而非所有分数都如此的证据，其结论只适用于研究覆盖的那些模型与那段时间。

::: example 差距是真实的吗 {#ex-gap}
一个模型在 $1{,}319$ 题的 GSM8K 测试集上得 $80\%$，在 $1{,}250$ 题的 GSM1k 上得 $72\%$。把两个分数当作独立的二项比例，$8$ 个百分点的差距是否超出抽样噪声？结论系于哪个假设？
::: solution
之差的标准误：$\sqrt{0.8\cdot0.2/1319 + 0.72\cdot0.28/1250} = \sqrt{0.000121 + 0.000161} = 0.0168$。差距为 $0.08/0.0168 = 4.8$ 个标准误，远超噪声。然而这个检验只表明两个题目集*对这一模型*不同；要把差距归因于过拟合，就需要两个集合对一个未受污染的模型同样难。这正是 GSM1k 要匹配难度、并用人类解出率加以验证的原因，也是有信息量的量是**相对其他模型**的差距的原因：若多数模型在两个集合上得分相同而少数模型下降，那下降关乎那些模型，不关乎集合。
:::
:::

::: warning 没检测到污染不等于没有污染
一份写着"我们检查了污染，发现很少"的报告，通常意思只是某个检测器在某个阈值之下发现了很少与基准文本的精确重叠。它不覆盖改述与翻译（[[#prop-survival]]）、与题目分开张贴的解答、由见过基准的模型产出的合成数据、或以基准风格写成的微调数据。反过来，被标记的重叠也不能证明分数被抬高了（[[#prop-inflation]]）。读污染声明时，要看它的方法和覆盖面，并更看重模型训练之后创建的留出题目上的结果。
:::

## 动态与留出基准 {#sec-dynamic}

检测只是补丁；结构性的补救是在模型不可能见过的题目上评测。有两种设计能做到这一点，而且由于题目池可以随模型进步而更新，两者也同时应对饱和。

::: definition 留出基准与动态基准 {#def-dynamic}
**留出**（私有）基准对测试题目保密，至多发布一个小的公开样本；评测由维护者运行，维护者能看到模型的输出，但不公布题目。**动态**基准随时间加入新题目，每题都标有它的**发布日期**；模型在其训练数据截止之后发布的题目上评测——这些题目不可能在其训练数据中——分数在匹配的时间窗口上比较。
:::

**LiveBench**（White 等，2024）定期发布新问题，取自近期来源——新发布的数学竞赛、最近的 arXiv 论文与新闻报道、新数据集——覆盖数学、代码、推理、数据分析、语言与指令遵循，并对照客观的标准答案自动计分，避开人类或模型评审。**LiveCodeBench**（Jain 等，2024）持续从竞赛编程网站（LeetCode、AtCoder 与 Codeforces）收集编程题及其发布日期，在选定时间窗口的题目上评测代码生成与相关技能，如自我修复与预测代码输出。其作者报告，一些模型在其训练截止之后发布的题目上的表现较之前的题目明显下降，这正是污染的签名（或者是早期题目更容易的签名——匹配窗口的比较可以控制这一点）。

留出集包括基准维护者与评测机构保管的私有测试划分、为一次性研究编写的题目集（如 GSM1k）、以及竞赛的私有题集。它们的弱点恰是长处的镜像：没有维护者，结果就无法独立复现；维护者必须可信；而许多开发者通过维护者的接口反复使用的留出集，会通过分数本身泄漏信息——这是 Dwork 等（2015）分析过、并提出用给答案加噪声或限制查询次数来加以限制的一种自适应过拟合。

动态基准有自己的代价。新题目在主题上、可能还有难度上与旧题目不同，因此不同时间窗口上的分数不能直接比较；模型的分数取决于它在哪个窗口上评测；而稳定产出高质量、可验证的题目代价高昂。匹配窗口——只在两个模型的截止都之后的题目上比较两个模型——可以处理前两点。

::: example 时间切分分析 {#ex-timesplit}
一个训练截止在第 $0$ 个月末的模型，解出第 $-6$ 到 $0$ 月发布的 $500$ 道编程题中的 $46\%$，解出第 $1$ 到 $6$ 月发布的 $400$ 道题中的 $31\%$。第二个模型截止在第 $6$ 个月，在同样两个集合上解出 $40\%$ 与 $39\%$。这些数字说明了什么？
::: solution
对第一个模型，截止之后的下降是 $15$ 个百分点；对第二个模型——其截止在两个窗口之后——两个窗口看起来同样难（$40\%$ 对 $39\%$）。所以靠后的窗口并非本身更难，而第一个模型的下降最有可能源于它见过（或见过讨论）靠前的题目。要公平比较两个模型，只能使用两个截止都之后的窗口——第 $1$ 到 $6$ 月对第二个模型并不合格，因此需要第 $6$ 月之后的又一个窗口。在靠前的窗口上，第一个模型显得比第二个好 $6$ 个百分点；这个比较是被污染的。
:::
:::

### 污染、饱和与基准的一生 {#sec-life}

污染与饱和彼此加强。随着基准走红，它的题目在网上被复制、讨论与解答，污染便随时间增长；随着分数上升，剩下的是最难与最含糊的题目，标签误差占据主导。基准在生命早期最有信息量，随年龄增长在两方面都失去效度。给基准建设者的好习惯如下：发布带金丝雀的题目，并采用难以爬取的格式（有些基准以加密或口令保护的归档分发测试集）；保留一个私有划分；给每道题标日期；计划更新；并在天花板到达时公布基准的退役程序。对读者，对应的习惯是面对任何分数都问：这个基准多大年纪了？题目在模型训练之前公开过吗？结果在训练之后编写的题目上还成立吗？

::: history
对训练集中存在测试数据的担忧与大规模预训练同龄。GPT-2 报告（Radford 等，2019）测量了 WebText 与常用测试集之间的 $8$-gram 重叠；GPT-3 报告（Brown 等，2020）把 $13$-gram 污染分析与干净子集结果做成了模型报告的标准部分——并承认一个缺陷使某些重叠留在了训练数据里。Dodge 等（2021）记录了 C4 语料中的基准数据。BIG-bench（Srivastava 等，2022）引入了金丝雀字符串。2023 年，Sainz 等警告污染威胁着 NLP 评测的大部分内容，Golchin 与 Surdeanu 提议从模型中激发测试题，Oren 等给出了可证明的黑盒检验，Yang 等表明改述过的测试数据能躲过 $n$-gram 去污染。Shi 等（2024）提出 Min-K% Prob，Duan 等（2024）质疑成员推断在大模型上究竟有多灵，Zhang 等（2024）建造 GSM1k 来直接测量过拟合。LiveBench 与 LiveCodeBench（2024）则把带日期、可更新的题目做成了默认答案。
:::

::: summary
- 当题目特有的信息进入训练时，该题被**污染**：逐字（带或不带答案）、改述、翻译、经由其他模型输出的间接污染、或评测时经由搜索的污染（[[#def-contamination]]）。
- 污染把分数抬高 $c$ 乘以对受污染题目的平均收益（[[#eq-inflation]]）；干净子集分数只在受污染题目与干净题目同样难时才无偏（[[#prop-inflation]]）。
- **$n$-gram 重叠**（GPT-3 分析中的 $13$-gram）需要训练数据；它抓得到复制与部分引用、漏掉改述，编辑之下的检出概率按 $(L - n + 1)(1 - r)^n$ 跌落（[[#prop-survival]]）。
- 没有训练数据时：**Min-K% Prob** 对最不可能的词元取平均（[[#def-mink]]），但在同分布数据上常常接近随机；**置换检验**为"学过基准的规范顺序"给出有效的 $p$ 值（[[#prop-permutation]]）；**金丝雀**与激发能检测复制。
- **GSM1k** 发现一些模型家族相对 GSM8K 出现与过拟合吻合的准确率下降，另一些几乎没有。
- **留出**与**动态**基准（LiveBench、LiveCodeBench）在模型不可能见过的题目上评测；在匹配的时间窗口上比较模型。
:::

## 习题

::: exercise 数匹配 {level=1 check="0.271"}
一道基准题目有 $60$ 个词元，某篇训练文档逐字含有它的连续 $25$ 个词元。该题的 $13$-gram 有多大比例出现在文档中（保留三位小数）？
::: solution
该题有 $60 - 13 + 1 = 48$ 个 $13$-gram；共享串包含其中 $25 - 13 + 1 = 13$ 个。比例为 $13/48 = 0.271$。
:::
:::

::: exercise 干净子集分数 {level=1 check="0.65"}
一个模型总体得 $70\%$。五分之一的题目被标记为受污染，模型在这些题上得 $90\%$。它的干净子集分数是多少？
::: solution
$0.70 = 0.2\cdot0.90 + 0.8\,s$，故 $s = (0.70 - 0.18)/0.8 = 0.65$。
:::
:::

::: exercise 置换 $p$ 值 {level=1 check="0.02"}
对一个基准，给 $199$ 个随机置换计算了对数概率，其中 $3$ 个不低于规范顺序。[[#prop-permutation]]的 $p$ 值是多少？
::: solution
$\hat p = (1 + 3)/(199 + 1) = 0.02$。规范顺序在 $200$ 个之中排名第四；在原假设之下，这至多有 $0.02$ 的概率发生。
:::
:::

::: exercise 检测概率的界 {level=2 check="0.428"}
用[[#eq-survival]]，给出一道 $30$ 词元的题目在每个词元独立地以概率 $0.25$ 被编辑后仍被 $13$-gram 检测器检出的概率的上界。保留三位小数。
::: solution
$(30 - 13 + 1)\cdot0.75^{13} = 18\cdot0.02376 = 0.428$。至多 $43\%$ 这样的题目会被抓到。
:::
:::

::: exercise 手算 Min-K% {level=2 check="-2.5"}
一段 $15$ 词元的文本，词元对数概率为 $-0.2, -0.1, -1.8, -0.4, -0.3, -3.3, -0.2, -0.6, -2.4, -0.1, -0.5, -0.9, -0.3, -0.2, -0.7$。计算 Min-$20\%$ Prob。
::: solution
$15$ 的 $20\%$ 是 $3$ 个词元；最低的三个是 $-3.3$、$-2.4$ 与 $-1.8$，均值为 $-7.5/3 = -2.5$。全部词元的均值是 $-12.0/15 = -0.8$；Min-$20\%$ 只看三个出人意料的词元，而在本文本上训练提升最多的正是它们。
:::
:::

::: exercise 强模型与弱模型的膨胀 {level=2}
两个模型每题的未污染准确率分别为 $0.9$ 与 $0.5$。两者都见过基准的 $20\%$，且在一道本来会答错的受污染题目上都以 $0.8$ 的概率回忆起答案。用[[#sec-effect]]中图形的模型，计算两个观测分数与观测差距。这对比较意味着什么？
::: solution
膨胀为 $c(1 - a)m$：强模型是 $0.2\cdot0.1\cdot0.8 = 0.016$，弱模型是 $0.2\cdot0.5\cdot0.8 = 0.08$。观测分数为 $0.916$ 与 $0.58$；差距从 $0.40$ 缩到 $0.336$。污染对弱模型帮助更大，因为它们有更多答错的题可以纠正，所以同等的污染会压缩差异；不均等的污染则可能逆转差异。比较只在两个模型都干净的题目上才安全。
:::
:::

::: exercise 设计一个动态基准 {level=2}
你在为新闻问答构建一个动态基准。列出使分数 (a) 不受污染、(b) 在截止不同的模型之间可比、(c) 可自动评分所需要的设计决策，并指出一项仍然存在的弱点。
::: solution
(a) 只针对指定日期之后的事件出题；每题标注创作日期；保留私有储备；在一个窗口关闭之前不公布答案。(b) 按时间窗口报告分数，只在两个截止都之后的窗口上比较模型；长期保持出题流程与难度目标不变；加入锚点题目（所有模型都作答）以检测难度漂移。(c) 使用答案短而可验证的问题（人名、数字、日期）与归一化匹配（[[evaluation/benchmarks#def-em-f1]]），避开评审。剩下的弱点：带网络搜索的模型可以去查答案（评测时污染），因此协议必须固定工具访问；近期新闻的题目偏袒截止更晚的模型，把新近与能力混为一谈；难度仍可能在窗口之间漂移。
:::
:::

::: exercise 小情形的精确检测概率 {level=3 check="0.5"}
对一道 $L = 4$ 词元的题目、一个 $2$-gram 检测器、编辑率 $r = \frac12$，通过计数编辑模式精确计算至少一个 $2$-gram 幸存的概率。与[[#eq-survival]]的界比较。
::: solution
$16$ 种编辑模式等可能。当没有两个相邻词元都未被编辑时检测失败：以 $1$ 记未编辑，长度 $4$、不含 "$11$" 的模式数为 $F_6 = 8$（斐波那契计数：$0000$、$0001$、$0010$、$0100$、$1000$、$0101$、$1010$、$1001$）。故 $\Prob(\text{被检出}) = 1 - 8/16 = 0.5$。界为 $(4 - 2 + 1)(1/2)^2 = 0.75$：有效但松，因为相互重叠的 $2$-gram 会一起幸存（若 $x_2x_3$ 幸存，$x_1x_2$ 就与它共享一个词元），所以期望计数高估了"至少一个"的概率。
:::
:::

::: exercise 最长公共串 {level=3}
利用词元位置上的动态规划，把[[#sec-ngram]]的检测器扩展为对每道题报告它与任一训练文档共享的连续词元串的长度。把最长公共串不少于题目长度 $50\%$ 的题目标记出来，并在清单的四道题目上把这条规则与"任意 $13$-gram"比较。
::: solution
```python
import re

def tokens(text):
    return re.findall(r"[a-z0-9]+", text.lower())

def longest_common_run(a, b):
    """Length of the longest common contiguous token sequence of lists a and b."""
    best, prev = 0, [0] * (len(b) + 1)
    for i in range(1, len(a) + 1):
        cur = [0] * (len(b) + 1)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1] + 1
                best = max(best, cur[j])
        prev = cur
    return best

items = {
    "q1": "A baker makes 24 muffins in the morning and twice as many in the afternoon. "
          "She sells 50 muffins. How many muffins does she have left at the end of the day?",
    "q2": "Tom has 3 boxes with 12 pencils in each box. He gives 7 pencils to his sister "
          "and loses 4 more. How many pencils does Tom have now?",
    "q3": "A train travels 60 miles per hour for 2 hours and then 45 miles per hour for "
          "3 hours. What is the total distance the train travels?",
    "q4": "A garden has 8 rows of tomato plants with 15 plants in each row. If 10 plants "
          "die, how many tomato plants are left in the garden?",
}
docs = [
    "Can someone help with my homework? A baker makes 24 muffins in the morning and twice "
    "as many in the afternoon. She sells 50 muffins. How many muffins does she have left at "
    "the end of the day? I got 22.",
    "Tom owns three boxes, each holding a dozen pencils. After giving seven to his sister "
    "and losing four, how many pencils remain?",
    "Speed problems: a train travels 60 miles per hour for 2 hours and then 45 miles per "
    "hour, so what is its average speed overall?",
    "The tomato is a plant in the nightshade family. Gardeners grow it in rows in the garden.",
]
for name, text in items.items():
    t = tokens(text)
    run = max(longest_common_run(t, tokens(d)) for d in docs)
    print(f"{name}: longest shared run {run:2d} of {len(t)} tokens "
          f"({run / len(t):.0%}) -> {'DIRTY' if run >= 0.5 * len(t) else 'clean'}")
```

```text
q1: longest shared run 32 of 32 tokens (100%) -> DIRTY
q2: longest shared run  4 of 28 tokens (14%) -> clean
q3: longest shared run 16 of 27 tokens (59%) -> DIRTY
q4: longest shared run  3 of 27 tokens (11%) -> clean
```

这条按比例算的规则在这里与 $13$-gram 规则一致：它仍然标出 q3 的部分引用（长为 $16$ 词元的串，即题目的第一句），也仍然漏掉 q2 的改述——其最长公共串只有 $4$ 个词元（"to his sister and"）。改阈值是在两种错误之间交换；两条基于表面匹配的规则都无法检测出 q2 的*题目*泄漏了。那需要语义匹配——嵌入或评审——如 Yang 等（2023）所提议的。
:::
:::
