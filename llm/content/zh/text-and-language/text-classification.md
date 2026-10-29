这封电子邮件是不是垃圾邮件？这条影评是正面还是负面？这篇新闻报道的是体育、商业还是政治？这位顾客是想取消订单还是改单？这段文字是谁写的？每个问题都是给定一段文本，要求从一个固定集合中选出一个标签，而这类**文本分类**任务合起来是自然语言处理部署最广的应用。它们也是观察以下事情的最简单场景：文本如何变成特征，一个语言模型如何变成一个决策，以及如何判断一个分类器是不是真的管用。

本章在**词袋**特征上搭建两个经典分类器——生成式的**朴素贝叶斯**与判别式的**逻辑（softmax）回归**——证明两者对词频计数都是线性的，在三部公版小说的段落上训练它们，并用精确率、召回率、$F_1$、置信区间和配对显著性检验来评测。随后说明词嵌入（[[text-and-language/word-embeddings]]）与神经网络如何扩展同一套配方，一直讲到微调 Transformer 与提示语言模型，并以文本分类器的失败方式收尾：否定、领域漂移与捷径特征。

## 任务 {#sec-task}

::: definition 文本分类 {#def-textclf}
一个**文本分类**任务有一个文档（字符串）集合 $\mathcal{X}$ 与一个有限的**类别**集合 $\mathcal{Y} = \{1, \dots, K\}$。**分类器**是一个函数 $h\colon\mathcal{X}\to\mathcal{Y}$，通常由条件分布 $p(y\mid x)$ 的模型按 $h(x) = \arg\max_yp(y\mid x)$ 得到。它从有标注的样本 $(x_1, y_1), \dots, (x_n, y_n)$ 学出，并在留出的样本上评判。当 $K = 2$ 时任务是**二分类**的；在**多标签**分类中一个文档可以带多个标签，通常的做法是每个标签配一个二元分类器。
:::

常见的任务有**情感分析**（正面、负面，有时加中性或星级评分）、**主题分类**（新闻类别、论文的学科代码）、对话系统中的**意图识别**（*book a flight*、*cancel*、*ask for help*）、**垃圾邮件与辱骂内容过滤**、**语言识别**与**作者归属**。标准基准包括 IMDb 影评数据集（Maas 等，2011；$50{,}000$ 条标为正、负面的影评）、Stanford Sentiment Treebank（Socher 等，2013）与 AG News（Zhang、Zhao 与 LeCun，2015；四个新闻类别）。一般的方法论——特征、模型、损失、验证——与[[ml-fundamentals/learning-problem]]相同；文本特有的部分是文档如何变成向量。

## 词袋特征 {#sec-bow}

::: definition 词袋与 tf–idf {#def-bow}
固定一个词表 $\mathcal{V} = \{w_1, \dots, w_V\}$。文档 $x$ 的**词袋**表示是向量 $\mathbf{x}\in\R^V$，其中 $x_j = $ $w_j$ 在 $x$ 中出现的次数（**二元**特征则取示性函数 $\mathbf{1}[w_j\in x]$）。词序被丢弃。**tf–idf** 加权把每个计数乘以**逆文档频率** $\operatorname{idf}(w) = \log\frac{n}{\operatorname{df}(w)}$，其中 $n$ 是训练文档数，$\operatorname{df}(w)$ 是包含 $w$ 的文档数，于是每篇文档都出现的词权重为 $0$。
:::

::: example 手工计算 tf–idf {#ex-tfidf}
一个文集有三篇文档：$d_1$ = *the whale the sea*，$d_2$ = *the ship*，$d_3$ = *the whale*。计算每个词的 idf（自然对数），以及 $d_1$ 在词表（*the*、*whale*、*sea*、*ship*）上的 tf–idf 向量。
::: solution
*the* 在三篇文档中都有：$\operatorname{idf} = \ln(3/3) = 0$。*whale* 在两篇中：$\ln(3/2) = 0.405$。*sea* 与 *ship* 各在一篇中：$\ln3 = 1.099$。$d_1$ 的计数是 $(2, 1, 1, 0)$，所以它的 tf–idf 向量是 $(0, 0.405, 1.099, 0)$。文档中最常见的词消失了，而文集中最罕见的词承担最大的权重。
:::
:::

词袋向量维度极高而极稀疏：词表有 $50{,}000$ 个词，一篇文档却只有 $200$ 个词。这个表示丢掉了顺序——*dog bites man* 与 *man bites dog* 一模一样——但对许多分类任务，出现了哪些词本身就是大部分证据，顺序还能靠添加**二元组**特征部分找回（把 *not good* 当作单个特征）。这个表示就是[[ml-fundamentals/representations]]中的 one-hot 特征映射在整篇文档上求和。

## 朴素贝叶斯 {#sec-nb}

生成式分类器为每个类别的文档如何产生建模，再用贝叶斯（Bayes）定理把模型反转。朴素贝叶斯用的是世上最简单的语言模型——[[text-and-language/ngram-models]]的一元模型，每个类别配一个。

::: definition 多项式朴素贝叶斯 {#def-nb}
**多项式朴素贝叶斯**模型假设类别 $y$ 的一篇文档是从一个类别专有的一元分布 $\theta_y$（定义在 $\mathcal{V}$ 上）独立抽出的一串词例：

$$
p(y\mid x)\ \propto\ \pi_y\prod_{t=1}^{T}\theta_{y, x_t} = \pi_y\prod_{j=1}^{V}\theta_{y, j}^{\,x_j},
$$

其中 $\pi_y$ 是类别先验，$x_j$ 是第 $j$ 个词的计数。参数用计数估计，加一平滑：$\hat\pi_y = n_y/n$ 且 $\hat\theta_{y, j} = \big(c_y(w_j) + 1\big)/\big(\sum_ic_y(w_i) + V\big)$，其中 $c_y(w)$ 是 $w$ 在类别 $y$ 的训练文档中出现的次数。$\mathcal{V}$ 之外的词被忽略。
:::

所谓"朴素"的假设——给定类别后词与词独立——显然是错的（给定任何主题，*San* 与 *Francisco* 都不独立），而且它把模型的概率校准得很糟：来自相关词的证据被反复计数，后验被推向 $0$ 或 $1$。但分类只需要 arg max，而决策规则原来是线性的。

::: proposition 朴素贝叶斯是线性分类器 {#prop-nb-linear}
对两个类别，朴素贝叶斯的对数几率是词袋向量的仿射函数：

$$
\log\frac{p(y = 1\mid x)}{p(y = 0\mid x)} = \underbrace{\log\frac{\pi_1}{\pi_0}}_{b} + \sum_{j=1}^{V}x_j\underbrace{\log\frac{\theta_{1, j}}{\theta_{0, j}}}_{w_j} = b + \mathbf{w}\cdot\mathbf{x},
$$

所以分类器恰在 $\mathbf{w}\cdot\mathbf{x} + b > 0$ 时预测类别 $1$。对 $K$ 个类别，$\arg\max_y\big(\log\pi_y + \mathbf{x}\cdot\log\boldsymbol\theta_y\big)$ 是一个线性多类分类器。
:::

::: proof
对每个类别把模型取对数：$\log p(y\mid x) = \log\pi_y + \sum_jx_j\log\theta_{y, j} - \log Z(x)$，其中 $Z(x)$ 是归一化常数，对每个类别都相同。把 $y = 1$ 与 $y = 0$ 的式子相减消去 $\log Z(x)$，即得公式。$K$ 类情形同理，只是不必相减。
:::

每个词按出现次数贡献一个固定的权重，即它在两个类别下概率之比的对数。两个类别里一样常见的词权重接近 $0$；主要出现在一个类别里的词带一个符号相应的大权重。

::: example 手工计算朴素贝叶斯 {#ex-nb}
在四条极短的影评上训练朴素贝叶斯——正面：*great food*、*great fun*；负面：*bad food*、*not great*——然后对 *not great* 与 *great food* 分类。
::: solution
词表是 $\{\textit{great}, \textit{food}, \textit{fun}, \textit{bad}, \textit{not}\}$，$V = 5$，先验各为 $\tfrac12$。每个类别各有 $4$ 个词例：正面 *great* $2$、*food* $1$、*fun* $1$；负面 *bad* $1$、*food* $1$、*not* $1$、*great* $1$。加一平滑下分母是 $4 + 5 = 9$。

*not great*：正面 $\tfrac12\cdot\tfrac{0+1}{9}\cdot\tfrac{2+1}{9} = \tfrac{1}{54}$；负面 $\tfrac12\cdot\tfrac{1+1}{9}\cdot\tfrac{1+1}{9} = \tfrac{2}{81}$。归一化后，$p(\text{neg}\mid\textit{not great}) = \frac{2/81}{1/54 + 2/81} = \frac47 = 0.571$：判为负面，但只是勉强——*great* 仍在为正面说话。

*great food*：正面 $\tfrac12\cdot\tfrac39\cdot\tfrac29 = \tfrac{1}{27}$；负面 $\tfrac12\cdot\tfrac29\cdot\tfrac29 = \tfrac{2}{81}$；$p(\text{pos}) = \frac{1/27}{1/27 + 2/81} = 0.6$。在线性形式下，$w_{\textit{great}} = \log\frac{3/9}{2/9} = \log1.5$，$w_{\textit{food}} = \log1 = 0$，而 $w_{\textit{not}} = \log\frac{1/9}{2/9} = -\log2$；否定词只是作为一个权重为负的词来计数。
:::
:::

## 逻辑回归与 softmax 回归 {#sec-logreg}

判别式分类器直接为 $p(y\mid x)$ 建模。在词袋特征上，**逻辑回归**（[[ml-fundamentals/logistic-regression]]）设 $p(y = 1\mid x) = \sigma(\mathbf{w}\cdot\mathbf{x} + b)$，**softmax 回归**对 $K$ 个类别设 $p(y\mid x) = \operatorname{softmax}(W\mathbf{x} + \mathbf{b})_y$。参数通过最小化交叉熵损失加 $L_2$ 惩罚来拟合，

$$
\mathcal{L}(W, \mathbf{b}) = -\frac1n\sum_{i=1}^{n}\log p(y_i\mid x_i) + \frac{\lambda}{2}\norm{W}_F^2,\qquad\frac{\partial\mathcal{L}}{\partial\mathbf{w}_k} = \frac1n\sum_{i=1}^{n}\big(p(k\mid x_i) - \mathbf{1}[y_i = k]\big)\mathbf{x}_i + \lambda\mathbf{w}_k,
$$

其梯度就是我们熟悉的"预测减目标，再乘输入"（[[ml-fundamentals/logistic-regression]]）。损失是凸的，所以梯度下降能找到全局极小；对稀疏的 $\mathbf{x}_i$，每个样本只触及它所含词语的权重。

朴素贝叶斯与逻辑回归的决策规则形式完全相同，都是 $\arg\max_y(\mathbf{w}_y\cdot\mathbf{x} + b_y)$。区别在权重如何选定：朴素贝叶斯假装词相互独立，只用每个词自己的计数来定它的权重；逻辑回归则联合拟合所有权重来最大化条件似然，于是相关的词共享功劳。Ng 与 Jordan（2002）比较了这类生成式–判别式配对，在理论与经验上都发现判别式模型的渐近误差更低，而生成式模型用更少的训练样本就能逼近它的（较高的）渐近误差——所以小训练集上朴素贝叶斯常常获胜，大训练集上逻辑回归占优。Wang 与 Manning（2012）把两者结合：拿朴素贝叶斯的对数计数比当特征喂给判别式分类器，这是情感分析的一个强基线。

::: widget plot
f: 1/(1+exp(-(a*x+c)))
x: -6, 6
y: 0, 1
sliders: a=1:0.1:5:0.1; c=0:-4:4:0.1
labels: $p(y = 1\mid x) = \sigma(a\,s + c)$
caption: 线性文本分类器通过逻辑函数把得分 $s = \mathbf{w}\cdot\mathbf{x}$（横轴）变成概率。权重尺度 $a$ 决定模型每单位证据有多大信心，偏置 $c$ 平移决策边界 $p = 0.5$。朴素贝叶斯把相关的词当作独立的证据来数，行为就像一个 $a$ 过大的模型：它的判断也许不错，概率却过于自信。
:::

## 这段文字是谁写的？ {#sec-experiment}

作为一个真实实验，下面在 Project Gutenberg 的三部公版小说之间做作者归属：赫尔曼·梅尔维尔（Herman Melville）的《白鲸记》（*Moby-Dick*，电子书 #2701）、简·奥斯汀（Jane Austen）的《傲慢与偏见》（*Pride and Prejudice*，#1342，插图版，其图注已被过滤掉）与玛丽·雪莱（Mary Shelley）的《弗兰肯斯坦》（*Frankenstein*，#84）。每个文档是一段至少 $20$ 个词的段落；每位作者抽 $400$ 段，$900$ 段用于训练，$300$ 段用于测试。朴素贝叶斯用计数，softmax 回归用二元特征；最后几行对两个分类器的错误跑一个配对显著性检验。

```python
import re, math, random, collections

def paragraphs(path):
    raw = open(path, encoding="utf-8").read()
    text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
    out = []
    for p in re.split(r"\n\s*\n", text):
        if "[Illustration" in p or "]" in p:          # drop illustration captions (Pride and Prejudice)
            continue
        words = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*", p.lower())
        if len(words) >= 20:
            out.append(words)
    return out

books = {"Melville": "pg2701.txt", "Austen": "pg1342.txt", "Shelley": "pg84.txt"}
rng = random.Random(0)
docs = []
for label, path in books.items():
    ps = paragraphs(path)
    print(f"{label:<8} {len(ps)} paragraphs of >= 20 words")
    docs += [(p, label) for p in rng.sample(ps, 400)]  # 400 per author
rng.shuffle(docs)
train, test = docs[:900], docs[900:]
labels = sorted(books)

# ---- multinomial naive Bayes, add-one smoothing ----
vocab = {w for p, _ in train for w in p}
count = {y: collections.Counter() for y in labels}
for p, y in train:
    count[y].update(p)
total = {y: sum(count[y].values()) for y in labels}
prior = collections.Counter(y for _, y in train)
def nb_predict(p):
    def logpost(y):
        s = math.log(prior[y] / len(train))
        for w in p:
            if w in vocab:
                s += math.log((count[y][w] + 1) / (total[y] + len(vocab)))
        return s
    return max(labels, key=logpost)

# ---- softmax regression on binary bag-of-words features, L2, full-batch gradient descent ----
feats = lambda p: set(w for w in p if w in vocab)
F = [feats(p) for p, _ in train]
W = {y: collections.defaultdict(float) for y in labels}
b = {y: 0.0 for y in labels}
lr, lam = 1.0, 1e-4
def probs(f):
    z = {y: b[y] + sum(W[y][w] for w in f) for y in labels}
    m = max(z.values())
    e = {y: math.exp(z[y] - m) for y in labels}
    s = sum(e.values())
    return {y: e[y] / s for y in labels}
for epoch in range(100):
    grad = {y: collections.defaultdict(float) for y in labels}
    gb = {y: 0.0 for y in labels}
    for f, (_, t) in zip(F, train):
        p = probs(f)
        for y in labels:
            g = (p[y] - (y == t)) / len(train)        # d loss / d score_y
            gb[y] += g
            for w in f:
                grad[y][w] += g
    for y in labels:
        for w in set(W[y]) | set(grad[y]):
            W[y][w] -= lr * (grad[y][w] + lam * W[y][w])
        b[y] -= lr * gb[y]
lr_predict = lambda p: max(labels, key=lambda y: probs(feats(p))[y])

def report(name, predict):
    pairs = [(predict(p), y) for p, y in test]
    acc = sum(a == y for a, y in pairs) / len(pairs)
    f1s = []
    for c in labels:
        tp = sum(a == c and y == c for a, y in pairs)
        fp = sum(a == c and y != c for a, y in pairs)
        fn = sum(a != c and y == c for a, y in pairs)
        prec, rec = tp / (tp + fp), tp / (tp + fn)
        f1s.append(2 * prec * rec / (prec + rec))
    print(f"{name:<20} accuracy {acc:.3f}  macro-F1 {sum(f1s) / len(f1s):.3f}  "
          + "  ".join(f"{c} F1 {f:.3f}" for c, f in zip(labels, f1s)))
report("naive Bayes", nb_predict)
report("softmax regression", lr_predict)
for y in labels:
    top = sorted(W[y].items(), key=lambda kv: -kv[1])[:6]
    print(f"top features for {y}:", ", ".join(w for w, _ in top))

# ---- McNemar's exact test on the discordant test paragraphs ----
nb_ok = [nb_predict(p) == y for p, y in test]
lr_ok = [lr_predict(p) == y for p, y in test]
n10 = sum(a and not c for a, c in zip(nb_ok, lr_ok))   # NB right, LR wrong
n01 = sum(c and not a for a, c in zip(nb_ok, lr_ok))   # LR right, NB wrong
n = n10 + n01
p = min(1.0, 2 * sum(math.comb(n, i) for i in range(min(n10, n01) + 1)) / 2 ** n)
print(f"discordant: NB-only correct {n10}, LR-only correct {n01}; exact two-sided p = {p:.4f}")
```

```text
Melville 1974 paragraphs of >= 20 words
Austen   1562 paragraphs of >= 20 words
Shelley  689 paragraphs of >= 20 words
naive Bayes          accuracy 0.957  macro-F1 0.956  Austen F1 0.964  Melville F1 0.974  Shelley F1 0.930
softmax regression   accuracy 0.913  macro-F1 0.912  Austen F1 0.929  Melville F1 0.915  Shelley F1 0.892
top features for Austen: she, mr, her, elizabeth, be, miss
top features for Melville: whale, now, ship, though, all, ahab
top features for Shelley: my, me, i, which, father, justine
discordant: NB-only correct 15, LR-only correct 2; exact two-sided p = 0.0023
```

两个分类器只凭词表就能十段里认对九段以上的作者，而且这里朴素贝叶斯更强（准确率 $0.957$ 对 $0.913$）——训练集很小，正如 Ng 与 Jordan 的分析所预言，而且 softmax 模型只做了 $100$ 步整批梯度下降。权重最高的特征显示了模型在用什么：代词与功能词（奥斯汀笔下的 *she*、*her*、*be*，雪莱的第一人称叙述者 *my*、*me*、*i*）、主题词（*whale*、*ship*）和人物名字（*Elizabeth*、*Ahab*、*Justine*）。功能词是经典的文体学证据；人物名字则是一种**捷径**，换到同一批作者的其他书上测就会失效。

## 评测分类器 {#sec-evaluation}

准确率是正确预测所占的比例。类别不平衡时它会误导人——若 $1\%$ 的邮件是垃圾邮件，一个从不拦截任何东西的垃圾邮件过滤器准确率就有 $99\%$——所以要用按类别的度量（[[ml-fundamentals/evaluation-metrics]]）。

::: definition 精确率、召回率与 $F_1$ {#def-f1}
对类别 $c$，令 $\mathrm{TP}$ 为预测为 $c$ 且确实是 $c$ 的测试文档数，$\mathrm{FP}$ 为预测为 $c$ 但并非 $c$ 的文档数，$\mathrm{FN}$ 为类别 $c$ 的文档中被预测成别的类别的文档数。则

$$
\text{精确率} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FP}},\qquad\text{召回率} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FN}},\qquad F_1 = \frac{2\cdot\text{精确率}\cdot\text{召回率}}{\text{精确率} + \text{召回率}}.
$$

**宏平均** $F_1$ 是各类别 $F_1$ 分的未加权平均；**微平均** $F_1$ 则先把所有类别的计数合并（对单标签多类分类，它等于准确率）。
:::

$F_1$ 是精确率与召回率的调和平均，因而由两者中较小的一方主导：分类器不能靠牺牲一个去抬高另一个来拿高分。

::: example 精确率、召回率与 $F_1$ {#ex-f1}
一个垃圾邮件过滤器在一个测试集上拦截了 $50$ 封邮件，其中 $40$ 封是垃圾邮件；测试集共有 $60$ 封垃圾邮件。计算垃圾邮件类别的精确率、召回率与 $F_1$。
::: solution
$\mathrm{TP} = 40$，$\mathrm{FP} = 10$，$\mathrm{FN} = 60 - 40 = 20$。精确率 $40/50 = 0.8$，召回率 $40/60 = 0.667$，$F_1 = \frac{2\cdot0.8\cdot0.667}{0.8 + 0.667} = 0.727$——低于算术平均 $0.733$，且更接近较小的那个值。
:::
:::

::: widget plot
f: 2*P*x/(P+x); (P+x)/2
x: 0, 1
y: 0, 1
sliders: P=0.9:0.05:1:0.01
labels: $F_1$ at precision $P$, against recall; arithmetic mean
caption: 固定精确率 $P$（滑块）时，$F_1$ 作为召回率（横轴）的函数，与精确率和召回率的算术平均相对照。$P = 0.9$、召回率 $0.1$ 时，算术平均是 $0.5$，而 $F_1$ 只有 $0.18$：调和平均不肯奖励一个几乎什么也没找到的分类器。
:::

测试分数只是有限样本给出的一个估计，而测试集只有几百篇文档时，其不确定性很大。把 $n$ 次测试预测当作独立试验，准确率 $\hat a$ 的正态近似 $95\%$ 置信区间是 $\hat a\pm1.96\sqrt{\hat a(1 - \hat a)/n}$：$\hat a = 0.957$、$n = 300$ 时是 $\pm0.023$。要在*同一个测试集上*比较两个分类器，不能只看区间是否重叠；错误是配对的，**McNemar 检验**只看两个分类器答案不一致的文档。在两者准确率相同的零假设下，每个不一致的文档偏向任何一边的可能性相等，所以偏向其中一方的文档数服从 $\operatorname{Binomial}(n_{01} + n_{10}, \tfrac12)$。上面的实验中，$15$ 段只有朴素贝叶斯判对，$2$ 段只有 softmax 回归判对，得到精确的双侧 $p = 0.0023$：这个差别不太可能出于偶然——至少是在这个测试集上、对这组训练选择而言。评测模型的统计见[[evaluation/evaluation-statistics]]。

::: widget plot
f: 1.96*sqrt(p*(1-p)/x)
x: 50, 5000
y: 0, 0.15
sliders: p=0.9:0.5:0.99:0.01
labels: half-width of the 95% interval for accuracy $p$ on $n$ test documents
caption: 测试准确率的正态近似置信区间半宽 $1.96\sqrt{p(1-p)/n}$ 随测试集大小 $n$ 的变化。$300$ 篇文档、准确率 $0.9$ 时它是 $\pm0.034$；要把它减半需要四倍的文档。小测试集上分类器之间一两个百分点的差距常常只是噪声。
:::

::: quiz
一个测试集 $95\%$ 是类别 A、$5\%$ 是类别 B，一个分类器对每篇文档都预测 A。哪些说法正确？
- [x] 它的准确率是 $0.95$
- [x] 它对类别 B 的召回率是 $0$
- [ ] 它的宏平均 $F_1$ 是 $0.95$
- [ ] 它对类别 A 的精确率是 $1$
::: solution
准确率是 $0.95$。对 B 没有真正例，召回率是 $0$（B 的 $F_1$ 也是 $0$，把 $0/0$ 型的精确率记作 $0$）。对 A，精确率是 $0.95$（每篇文档都预测 A，其中 $95\%$ 预测正确），召回率是 $1$，故 $F_1 = 0.974$；宏平均是 $(0.974 + 0)/2 = 0.487$，这一下就把准确率掩盖住的无用分类器暴露出来了。
:::
:::

## 词嵌入与神经分类器 {#sec-neural}

词袋分类器对标注训练数据里没出现过的词一无所知：如果 *superb* 从未出现在训练影评里，它就毫无权重，无论它和 *excellent* 有多相似。在未标注文本上训练的词嵌入提供这份知识。

最简单的嵌入分类器把文档各词的向量取平均，再对平均值套一个线性分类器。**fastText**（Joulin、Grave、Bojanowski 与 Mikolov，2017）训练的正是这个模型——嵌入与分类器一起训练，外加词二元组特征——在若干主题与情感基准上追平了慢得多的神经分类器，而在 CPU 上训练只需几秒到几分钟。

::: proposition 取平均的分类器是受约束的词袋分类器 {#prop-average}
设 $E\in\R^{V\times d}$ 的行为词嵌入，对一篇 $T$ 个词例、词袋向量为 $\mathbf{x}$ 的文档以 $\mathbf{u}\cdot\bar{\mathbf{e}}$ 打分，其中 $\bar{\mathbf{e}} = \frac1T\sum_tE_{x_t}$ 是它的平均嵌入，$\mathbf{u}\in\R^d$。则得分等于 $\frac1T(E\mathbf{u})\cdot\mathbf{x}$：一个在长度归一化的计数上的词袋线性分类器，其权重向量 $E\mathbf{u}$ 落在 $E$ 的 $d$ 维列空间中。
:::

::: proof
$\sum_tE_{x_t} = E\T\mathbf{x}$，因为每个词 $j$ 每出现一次就贡献它的行 $E_j$ 一次，共 $x_j$ 次。于是 $\mathbf{u}\cdot\bar{\mathbf{e}} = \frac1T\mathbf{u}\cdot E\T\mathbf{x} = \frac1T(E\mathbf{u})\cdot\mathbf{x}$。向量 $E\mathbf{u}$ 是 $E$ 的 $d$ 个列的线性组合。
:::

::: example 一个从未带标注出现过的词 {#ex-average}
二维嵌入由未标注文本学出：*excellent* $(1, 0.2)$、*superb* $(0.9, 0.3)$、*awful* $(-1, 0.1)$、*film* $(0, 1)$。一个只在含 *excellent* 与 *awful* 的文档上训练的情感分类器学到了 $\mathbf{u} = (2, 0)$、偏置 $0$。它给 *superb* 什么权重？给文档 *superb film* 多大的正面概率？
::: solution
由[[#prop-average]]，一个词的权重是它的嵌入与 $\mathbf{u}$ 的内积：*superb* 得 $0.9\cdot2 + 0.3\cdot0 = 1.8$，接近 *excellent* 的 $2$，尽管没有任何带标注的文档含它；*film* 得 $0$。*superb film* 的平均嵌入是 $(0.45, 0.65)$，得分为 $0.45\cdot2 = 0.9$，而 $p(\text{pos}) = \sigma(0.9) = 0.711$。在同一份标注数据上训练的词袋分类器给 *superb* 的权重是 $0$，给这篇文档的概率是 $0.5$。
:::
:::

这个命题把优点与局限都解释清楚了。每个词的权重是 $\mathbf{E}_j\cdot\mathbf{u}$，所以嵌入相近的词权重也相近——*superb* 从 *excellent* 继承了正的权重，即使它从未被标注。但模型对计数仍是线性的，仍然无视顺序。**卷积**分类器（Kim，2014）把学到的滤波器作用在连续嵌入的窗口上，能检测 *not good* 这类短语；循环网络（[[sequence-models/recurrent-networks]]）则读整个序列。

大约自 2018 年起，主流做法是**从预训练语言模型迁移**：ULMFiT（Howard 与 Ruder，2018）微调一个预训练的循环语言模型来做分类，BERT（Devlin 等，2019）微调一个预训练 Transformer 编码器，在它对一个特殊分类词元的表示上加一个 softmax 层。微调 Transformer 在标准基准上刷新了最优水平。大语言模型也可以在完全不针对任务训练的情况下做分类：给它一条指令，再在提示里附上几个有标注的例子（[[prompting-rag/in-context-learning]]）；或者让它产出句子嵌入，再配一个轻量分类器（[[prompting-rag/text-embeddings]]）。2026 年的今天，哪种做法更可取取决于标注数据的数量、成本与延迟预算，以及对校准和可审计性的要求；一个 tf–idf 逻辑回归仍然是快速、透明的基线，任何新系统都该同它比较。

## 文本分类器如何失败 {#sec-failures}

**否定与组合。** *Not good* 是负面，*not bad* 略有正面意味，*not only good but excellent* 则强烈正面。词袋只把 *not* 当作又一个词，如[[#ex-nb]]所见。Pang、Lee 与 Vaithyanathan（2002）在机器学习做情感分类的一项早期研究中，把否定词后面的词标上记号（*not good* → *not NOT_good*）；句子结构模型与上下文表示能好得多地处理组合，但否定仍是探测失败的标准手段。

**领域漂移。** 在影评上训练、到厨房电器评论上测试的分类器会丢失准确率：*unpredictable* 对情节是夸奖，对烤面包机却是抱怨。标签本身也在漂移——什么算垃圾邮件、什么算辱骂信息，随时间在变。

**捷径与标注伪迹。** 模型学到的是训练数据里能区分标签的任何东西，包括与预期任务无关的特征：上面实验里的人物名字、按某种特定方式收集的垃圾邮件数据里 URL 的存在，以及众包自然语言推理数据中，标注者写矛盾句时爱用的 *not*、*nobody* 一类词——它们让一个只读假设句的分类器就能远超随机地猜中标签（Gururangan 等，2018；Poliak 等，2018）。在与训练同源的数据上测试准确率高，并不能说明模型解决了任务。

::: warning 好的测试分数不等于能用的分类器
与训练数据取自同一文集的测试集，度量的是在那个文集上的表现。在信任一个文本分类器之前，先看它权重最高的特征或它的错误，在它将来要用的那个场景的数据上测它，并在要紧的子群（方言、语言、主题）上分开检查表现——平均准确率很高的分类器，仍可能对一小部分输入系统性地失败。标签也是有噪声的：标注者在 $10\%$ 的样本上都达不成一致时，这份数据上超过约 $90\%$ 的准确率就不能照面值解读。
:::

::: history
Maron（1961）提出了一种概率化、近似朴素贝叶斯的方法，把文档索引到学科类别。Mosteller 与 Wallace（1963、1964）通过对 *upon*、*whilst*、*by* 这类功能词使用率的贝叶斯分析，把十二篇作者存疑的《联邦党人文集》（*Federalist Papers*）文章归于 James Madison 名下——这是作者归属研究与贝叶斯统计实践的奠基之作。Salton 的 SMART 系统（20 世纪 60–70 年代）引入了向量空间的文档表示与词项加权，Spärck Jones（1972）提出了逆文档频率。Joachims（1998）证明在 tf–idf 特征上使用支持向量机做文本分类效果很好，Sahami、Dumais、Heckerman 与 Horvitz（1998）把朴素贝叶斯用于垃圾邮件过滤，Pang、Lee 与 Vaithyanathan（2002）把机器学习带进情感分析。Kim（2014）把卷积网络用在词嵌入上，Joulin 等（2017）发布了 fastText，Howard 与 Ruder（2018）和 Devlin 等（2019）确立了微调预训练语言模型的标准方法地位。
:::

::: summary
- 文本分类把一篇文档映射到 $K$ 个标签之一：情感、主题、意图、垃圾邮件、语言、作者。
- 词袋特征数词而不管顺序；tf–idf 压低所有文档共有的词的权重；二元组特征能找回一部分顺序。
- 多项式朴素贝叶斯是一个类别条件的一元语言模型；它的对数几率对词频计数是线性的，每个词的权重为 $\log(\theta_{1, j}/\theta_{0, j})$。逻辑回归与 softmax 回归有同样的线性形式，但用最小化交叉熵来联合拟合权重。
- 在梅尔维尔、奥斯汀与雪莱的段落上，两者的准确率都超过 $90\%$；由于训练集较小，朴素贝叶斯更强（$0.957$ 对 $0.913$；McNemar $p = 0.0023$），它用的是功能词、主题词和人物名字。
- 类别不平衡时用精确率、召回率、$F_1$ 与宏平均，报告置信区间，并在同一测试集上用配对检验比较分类器。
- 对嵌入取平均得到一个词袋分类器，其权重在相似的词上平滑变化；卷积、循环，尤其是微调的预训练 Transformer（以及提示语言模型）能捕捉组合性。
- 否定、领域漂移、捷径特征与标签噪声是典型的失败方式；要在要紧的数据与子群上测试。
:::

## 习题

::: exercise 词袋向量 {level=1 check="2"}
词表为（*the*、*cat*、*sat*、*on*、*mat*），写出 *the cat sat on the mat* 的词袋向量与它的二元版本。*the* 的计数特征是多少？
::: solution
计数 $(2, 1, 1, 1, 1)$，二元 $(1, 1, 1, 1, 1)$。*the* 的计数是 $2$。
:::
:::

::: exercise 一个 idf 权重 {level=1 check="ln(1000/10)"}
一个文集有 $1{,}000$ 篇文档，词 *harpoon* 出现在其中 $10$ 篇里。用自然对数计算它的 idf，再算一个出现在每一篇文档中的词的 idf。
::: solution
$\ln(1000/10) = \ln100 = 4.605$。每篇文档都有的词 $\operatorname{idf} = \ln1 = 0$，会被 tf–idf 忽略掉。
:::
:::

::: exercise 精确率与召回率 {level=1 check="40/60"}
在[[#ex-f1]]中，垃圾邮件过滤器的召回率是多少？它漏掉了多少封垃圾邮件？
::: solution
召回率 $40/60 = 0.667$；$60$ 封垃圾邮件中漏掉 $20$ 封。
:::
:::

::: exercise 一个朴素贝叶斯权重 {level=2 check="ln(1.5)"}
在[[#ex-nb]]中，计算线性权重 $w_{\textit{great}} = \ln(\theta_{\text{pos}, \textit{great}}/\theta_{\text{neg}, \textit{great}})$，并用线性形式重新计算 $p(\text{pos}\mid\textit{great food})$。
::: solution
$\theta_{\text{pos}, \textit{great}} = 3/9$、$\theta_{\text{neg}, \textit{great}} = 2/9$，故 $w_{\textit{great}} = \ln1.5 = 0.405$。$w_{\textit{food}} = \ln\frac{2/9}{2/9} = 0$，$b = \ln1 = 0$。对数几率是 $0.405$，所以 $p = \sigma(0.405) = 1.5/2.5 = 0.6$，与先前一致。
:::
:::

::: exercise 一个置信区间 {level=2 check="1.96*sqrt(0.913*0.087/300)"}
softmax 回归在 $300$ 个测试段落上的准确率是 $0.913$。计算正态近似 $95\%$ 置信区间的半宽，并解释为什么它与朴素贝叶斯的区间（$0.957\pm0.023$）重叠，本身并不能说明两个分类器一样好。
::: solution
$1.96\sqrt{0.913\cdot0.087/300} = 0.032$，所以区间是 $[0.881, 0.945]$；朴素贝叶斯的是 $[0.934, 0.980]$，两者在 $[0.934, 0.945]$ 上重叠。区间重叠不是对差别的检验：两个准确率是在同样的文档上测得的，错误高度相关（大多数段落对两个模型都容易）。McNemar 检验只用那 $17$ 个不一致的段落，就发现差别显著。
:::
:::

::: exercise 手工计算 McNemar {level=2 check="2*(1+15+105)/2^15"}
两个分类器在 $15$ 个测试文档上有分歧：分类器 A 在其中 $13$ 个上正确，B 在 $2$ 个上正确。计算精确的双侧 McNemar $p$ 值。
::: solution
零假设下，B 赢下的不一致文档数服从 $\operatorname{Binomial}(15, \tfrac12)$。$\Prob(\le2) = \big(\binom{15}{0} + \binom{15}{1} + \binom{15}{2}\big)/2^{15} = (1 + 15 + 105)/32{,}768 = 0.00369$；双侧检验要乘以 $2$，得 $p = 0.0074$。
:::
:::

::: exercise 二元特征下的朴素贝叶斯仍是线性的 {level=2}
在**伯努利朴素贝叶斯**中，词 $j$ 在类别 $y$ 的文档中以概率 $\phi_{y, j}$ 独立出现，未出现的词同样算证据。证明对数几率对二元词袋向量仍是仿射的，并指出权重与偏置。
::: solution
$\log p(x\mid y) = \sum_j\big(x_j\log\phi_{y, j} + (1 - x_j)\log(1 - \phi_{y, j})\big)$。对数几率是 $\log\frac{\pi_1}{\pi_0} + \sum_j\log\frac{1 - \phi_{1, j}}{1 - \phi_{0, j}} + \sum_jx_j\Big(\log\frac{\phi_{1, j}}{\phi_{0, j}} - \log\frac{1 - \phi_{1, j}}{1 - \phi_{0, j}}\Big)$。所以权重是 $w_j = \log\frac{\phi_{1, j}(1 - \phi_{0, j})}{\phi_{0, j}(1 - \phi_{1, j})}$（一个对数优势比），偏置收下先验和"全部未出现"那一项。与多项式模型不同，未出现的词通过偏置起作用。
:::
:::

::: exercise 朴素贝叶斯的校准 {level=3}
一篇文档由词 *excellent* 重复 $m$ 次构成，$\log(\theta_{1, \textit{excellent}}/\theta_{0, \textit{excellent}}) = 1$，先验相等。计算朴素贝叶斯下 $m = 1, 3, 10$ 时的 $p(y = 1\mid x)$。再假设实际上这些重复完全相关——这篇文档并不比一次出现更提供信息。这对朴素贝叶斯的概率说明什么？可以怎样重新校准？
::: solution
对数几率是 $m$，所以 $p = \sigma(m)$：$0.731$、$0.953$ 与 $0.99995$。如果这些重复提供的信息不比一次出现更多，正确的后验就应始终是 $0.731$；朴素贝叶斯把相关的证据反复计数，变得过于自信，而真实文档（词有重复、有相关）让它变的也正是这个。它对文档的排序可以仍然是好的。重新校准是在留出数据上拟合一个从朴素贝叶斯得分到概率的单调映射——例如 Platt 缩放（Platt scaling），$p = \sigma(a\,s + c)$，其中 $a$ 与 $c$ 在得分 $s$ 上用逻辑回归拟合（即[[#sec-logreg]]里 $a < 1$ 的那个组件），或保序回归。
:::
:::

::: exercise 一个否定特征 {level=3}
实现 Pang 等的否定标记预处理（对 *not*、*no* 或 *never* 之后的每个词加上前缀 `NOT_`，直到下一个标点），把它作用在[[#ex-nb]]的训练数据上，手工重新训练朴素贝叶斯，再给 *not great* 分类。然后解释一个该启发式失败的情形。
::: solution
```python
import re
def mark_negation(text):
    out, neg = [], False
    for tok in re.findall(r"\w+|[.,;:!?]", text.lower()):
        if tok in ".,;:!?":
            neg = False; out.append(tok)
        elif tok in ("not", "no", "never"):
            neg = True; out.append(tok)
        else:
            out.append("NOT_" + tok if neg else tok)
    return out
print(mark_negation("not great"), mark_negation("great food, not bad at all"))
```

```text
['not', 'NOT_great'] ['great', 'food', ',', 'not', 'NOT_bad', 'NOT_at', 'NOT_all']
```

训练影评变成正面 *great food*、*great fun*；负面 *bad food*、*not NOT_great*。词表现在是 $\{\textit{great}, \textit{food}, \textit{fun}, \textit{bad}, \textit{not}, \textit{NOT\_great}\}$，$V = 6$，每个类别 $4$ 个词例，分母是 $10$。对 *not great* → *not NOT_great*：正面 $\tfrac12\cdot\tfrac1{10}\cdot\tfrac1{10} = 0.005$；负面 $\tfrac12\cdot\tfrac2{10}\cdot\tfrac2{10} = 0.02$；$p(\text{neg}) = 0.8$，比 $0.571$ 高，因为 *great* 的正面证据没了。当否定并不约束后面的词时，这个启发式就会失败——*not only good but excellent* 会标出 *NOT_good*、*NOT_but*、*NOT_excellent*，把夸奖变成表面上的批评——而且它漏掉不用这些词表达的否定（*hardly*、*fails to*、*lacks*）。
:::
:::

::: exercise tf–idf 最近邻 {level=3}
解释为什么用余弦相似度比较文档时，tf–idf 向量通常比原始计数更好用，拿《白鲸记》《傲慢与偏见》《弗兰肯斯坦》的段落作例。两篇只共享 *the*、*and*、*of* 的段落，余弦相似度会怎样？
::: solution
原始计数向量被最常见的词主导，而那些词是功能词，三部书的每一篇段落里都有（[[text-and-language/text-as-data#prop-coverage]]：前 $100$ 个词形覆盖一半词例）。于是两篇毫不相干的段落仅仅因为都含大量 *the*、*and*、*of*，就有很大的余弦相似度。几乎每篇文档都有的词 idf 接近 $0$，所以 tf–idf 移除了这块共同的质量，留下有区分力的词（*whale*、*Elizabeth*、*creature*），它们的重叠才真正提示相关的内容。只共享 *the*、*and*、*of* 的两篇段落，用计数算余弦相当可观，用 tf–idf 算则接近 $0$。（作者归属则相反：功能词的使用率是有信息量的，这就是为什么要训练分类器，而不是依赖不加权的相似度。）
:::
:::
