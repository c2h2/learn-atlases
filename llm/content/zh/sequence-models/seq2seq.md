许多语言任务做的是把一个序列映射成另一个长度不同的序列：法文句子对英文句子，文档对它的摘要，问题对答案，录音对它的光盘文本。2014 年之前，机器翻译由基于短语的统计系统完成，这样的系统把许多分别训练的部分拼装起来——词对齐、短语表、调序模型、$n$ 元语言模型——再联合调参。**序列到序列**（seq2seq）或**编码器-解码器**模型用端到端训练的单个神经网络取代了整条流水线：一个循环**编码器**把源句读成一个向量，一个作为条件语言模型的循环**解码器**据此一次一个词元地写出目标句。

本章把模型定义为条件语言模型，说明用最大似然训练它恰好就是**教师强制**，用纯 Python 实现一个小型编码器-解码器并做梯度检查，然后分析它的两个固有力弱：编码器与解码器之间的**固定大小瓶颈**——[[sequence-models/attention-mechanism]]正是来拆它的——以及**暴露偏差**，即在真实前缀上训练、却从模型自己的输出生成的那种错位。如何把训练好的模型变成一句输出——贪心解码与束搜索——是[[sequence-models/decoding-basics]]的主题。

## 条件语言模型 {#sec-conditional}

把源端记作 $\mathbf{x} = (x_1, \dots, x_S)$，目标端记作 $\mathbf{y} = (y_1, \dots, y_n)$，词元分别取自词表 $\mathcal{V}_{\text{src}}$ 和 $\mathcal{V}_{\text{tgt}}$。在目标词表里加一个序列起始词元 $\langle\text{bos}\rangle$ 和一个序列结束词元 $\langle\text{eos}\rangle$，并总是以 $y_{n+1} = \langle\text{eos}\rangle$ 结束目标。

::: definition 条件语言模型 {#def-clm}
**条件语言模型**用链式法则给出目标序列在给定源下的概率，

$$
p_\theta(\mathbf{y}\mid\mathbf{x}) = \prod_{t=1}^{n+1}p_\theta(y_t\mid y_{<t}, \mathbf{x}),\qquad y_{n+1} = \langle\text{eos}\rangle .
$$ {#eq-clm}

生成 $\langle\text{eos}\rangle$ 就结束输出，所以模型自己决定输出长度；所有以 $\langle\text{eos}\rangle$ 收尾的有限序列的概率之和至多为 $1$。
:::

正是 $\langle\text{eos}\rangle$ 词元让[[#eq-clm]]成为定义在**所有**长度序列上的分布：没有它，这个乘积只能描述前缀。无条件语言模型（[[sequence-models/recurrent-networks#def-rnnlm]]）是源为空的特例。翻译模型、摘要器和语音识别器都是源不同的条件语言模型。

## 编码器-解码器 {#sec-encdec}

::: definition RNN 编码器-解码器 {#def-encdec}
一个 **RNN 编码器-解码器**由以下两部分组成：

- 一个**编码器** RNN，读入嵌入后的源端：$\mathbf{h}^{\text{enc}}_s = f_{\text{enc}}(\mathbf{h}^{\text{enc}}_{s-1}, E_{\text{src}}[x_s])$，$s = 1, \dots, S$，产出一个**上下文向量** $\mathbf{c} = \mathbf{h}^{\text{enc}}_S$（或它的某个函数）；
- 一个**解码器** RNN，由上下文初始化，$\mathbf{h}^{\text{dec}}_0 = \tanh(W_c\mathbf{c})$ 或直接取 $\mathbf{c}$，读入上一个目标词元：$\mathbf{h}^{\text{dec}}_t = f_{\text{dec}}(\mathbf{h}^{\text{dec}}_{t-1}, E_{\text{tgt}}[y_{t-1}])$，其中 $y_0 = \langle\text{bos}\rangle$，并预测

$$
p_\theta(y_t\mid y_{<t}, \mathbf{x}) = \operatorname{softmax}\big(W_y\mathbf{h}^{\text{dec}}_t + \mathbf{b}_y\big)_{y_t} .
$$ {#eq-decoder}

$f_{\text{enc}}$ 与 $f_{\text{dec}}$ 是循环单元——简单、LSTM 或 GRU（[[sequence-models/long-range-dependencies]]）——各有各的参数。
:::

2014 年，相隔不过数月出现了两个版本。Sutskever、Vinyals 和 Le 用四层 LSTM，只通过解码器的初始状态传上下文，与[[#def-encdec]]完全一致。Cho 等人用 GRU，把 $\mathbf{c}$ 喂给解码器的**每一个**步骤和输出层：$\mathbf{h}^{\text{dec}}_t = f_{\text{dec}}(\mathbf{h}^{\text{dec}}_{t-1}, E[y_{t-1}], \mathbf{c})$，$p(y_t\mid\dots) = g(\mathbf{h}^{\text{dec}}_t, E[y_{t-1}], \mathbf{c})$，这样解码器就不必把源句扛在自己的状态里。更早的 Kalchbrenner 和 Blunsom（2013）已经让一个循环解码器以源端的卷积编码为条件。

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; e1@0,1; e2@1,1; e3@2,1; c@3,1.5; d1@4,1; d2@5,1; d3@6,1; bos@4,0; y1@5,0; y2@6,0; o1@4,2; o2@5,2; o3@6,2
edges: x1>e1; x2>e2; x3>e3; e1>e2; e2>e3; e3>c; c>d1; bos>d1; d1>d2; y1>d2; d2>d3; y2>d3; d1>o1; d2>o2; d3>o3
algorithm: topo
start: x1
caption: 在三个词元的源和两个词元加 $\langle\text{eos}\rangle$ 的目标上展开的编码器-解码器。编码器状态 $e_s$ 读源；最后一个变成上下文 $c$，由它初始化解码器。每个解码器状态 $d_t$ 读入上一个目标词元（先是 $\langle\text{bos}\rangle$，然后 $y_1$、$y_2$），产生对下一个词元的输出分布 $o_t$，其中最后一个应把质量放到 $\langle\text{eos}\rangle$ 上。从源到输出的每一条路都穿过唯一的节点 $c$——这正是注意力要拆掉的瓶颈。
:::

Sutskever 等人有两个塑造了实践的观察。其一，只有把源**逆序**喂入，模型才训练得好：把 "a b c" 读成 "c b a"，第一个源词在展开图上就紧挨着第一个目标词，造出一些先优化的短程依赖；逆序让他们的单个模型在 WMT'14 英→法上从 $25.9$ BLEU 升到 $30.6$，测试困惑度从 $5.8$ 降到 $4.7$。其二，模型很大。每层 $1{,}000$ 个单元、$1{,}000$ 维嵌入、$160{,}000$ 词的源词表和 $80{,}000$ 词的目标词表，共 $384$ M参数，大头在嵌入和输出层（[[#ex-sutskever]]）。五个这样的模型组成集成达到 $34.8$ BLEU，超过了 $33.3$ 的基于短语的基线；用这些 LSTM 给基线的 $1{,}000$ 条最佳候选译文重排序，可到 $36.5$。

::: example 3.84 亿参数都花在哪里 {#ex-sutskever}
复原 Sutskever 等人模型的参数计数：一个编码器和一个解码器，各四层 $H = 1{,}000$ 的 LSTM、输入维度 $1{,}000$，源、目标各一张嵌入表，以及在目标词表上的 softmax。
::: solution
一个 $d = H = 1{,}000$ 的 LSTM 层有 $4\big(H(H + d) + H\big) = 4(2{,}000{,}000 + 1{,}000) = 8{,}004{,}000$ 个参数（[[sequence-models/long-range-dependencies#def-lstm]]）。八层：约 $64$ M——就是论文里那句“$64$M 个纯循环连接”。嵌入：$160{,}000\cdot1{,}000 + 80{,}000\cdot1{,}000 = 240$ M。输出层：$80{,}000\cdot1{,}000 = 80$ M。合计 $64 + 240 + 80 = 384$ M。模型的六分之五是查表和输出投影；真正为序列建模的部分只占六分之一。这就是词表规模在神经翻译中如此棘手、规模约 $30{,}000$ 个子词词表（Sennrich, Haddow and Birch, 2016）迅速被采纳的原因。
:::
:::

## 用最大似然训练 {#sec-training}

给定由配对 $(\mathbf{x}^{(m)}, \mathbf{y}^{(m)})$ 组成的平行语料，参数选取为使条件对数似然最大，等价于最小化

$$
\mathcal{L}(\theta) = -\sum_m\log p_\theta\big(\mathbf{y}^{(m)}\mid\mathbf{x}^{(m)}\big) .
$$ {#eq-mle}

::: definition 教师强制 {#def-teacher-forcing}
**教师强制**训练解码器时，在第 $t$ 步喂给它训练数据里的**参考**前一词元 $y_{t-1}$（$y_0 = \langle\text{bos}\rangle$），不管模型自己本来会预测什么；再把交叉熵损失 $-\log p_\theta(y_t\mid y_{<t}, \mathbf{x})$ 对 $t = 1, \dots, n + 1$ 求和。
:::

这个名字听起来像某种启发式，但其中没有任何近似。

::: proposition 教师强制就是最大似然 {#prop-tf-mle}
对形如[[#eq-clm]]的模型，一对 $(\mathbf{x}, \mathbf{y})$ 的教师强制损失恰等于 $-\log p_\theta(\mathbf{y}\mid\mathbf{x})$，于是它的梯度就是负对数似然[[#eq-mle]]的精确梯度。
:::

::: proof
对[[#eq-clm]]取对数得 $-\log p_\theta(\mathbf{y}\mid\mathbf{x}) = \sum_{t=1}^{n+1}-\log p_\theta(y_t\mid y_{<t}, \mathbf{x})$。第 $t$ 项是**给定参考前缀** $y_{<t}$ 的条件概率，而解码器读的恰恰就是那个前缀——教师强制喂给它的正是它。所以教师强制各步损失之和就是负对数似然本身，两边求导数即得相等的梯度。对语料的各对求和即得[[#eq-mle]]。
:::

因此教师强制不是什么迟早会被更原则的做法替代的训练技巧；对自回归模型而言，它**就是**最大似然。它还让训练高效：所有 $n + 1$ 个条件分布在一次对参考的遍历中全部算出，在 Transformer 解码器里更是沿位置并行计算（[[transformers/multi-head-attention]]）。梯度从每个输出损失穿过解码器、穿过上下文向量、穿过编码器一路流回——相当于在拼接成的图上做一次 BPTT。

::: example 手算一次教师强制损失 {#ex-tf-loss}
给定源 “ich bin müde” 和参考 “i am tired ⟨eos⟩”，解码器在教师强制下给参考词元的概率依次为 $0.6$、$0.5$、$0.2$、$0.9$。这对句子的损失、逐词元损失和困惑度各是多少？若模型自由运行会生成 “i am sleepy”，什么会变？
::: solution
$-\log p(\mathbf{y}\mid\mathbf{x}) = -(\ln0.6 + \ln0.5 + \ln0.2 + \ln0.9) = 0.5108 + 0.6931 + 1.6094 + 0.1054 = 2.9188$ 纳特。逐词元（四次预测，含 $\langle\text{eos}\rangle$）：$0.7297$；困惑度 $e^{0.7297} = 2.07$。什么都不变：无论模型会生成什么，损失都在参考前缀上计算。教师强制下，$\langle\text{eos}\rangle$ 的预测做在 “i am tired” 之后，哪怕模型自己永远产不出 “tired”——这正是[[#sec-exposure]]要讨论的鸿沟。
:::
:::

::: example 一个补齐的批次 {#ex-batch}
一个批次有三对，源长度为 $5, 3, 4$，目标长度为 $4, 6, 2$（不含 $\langle\text{eos}\rangle$）。源和目标都补齐到批次内最长。隐藏维度 $H = 512$、目标词表 $32{,}000$，给出编码器状态、解码器 logits、损失掩码的形状，真正损失项的个数，并说明每条源的上下文应取在哪里。
::: solution
源补到 $S = 5$：编码器状态构成 $(3, 5, 512)$ 张量。解码器输入是 $\langle\text{bos}\rangle y_1\dots y_n$、目标是 $y_1\dots y_n\langle\text{eos}\rangle$，所以解码长度为 $\max(n) + 1 = 7$：logits $(3, 7, 32{,}000)$，掩码 $(3, 7)$，三行分别在前 $5$、$7$、$3$ 个位置取 $1$。损失共 $21$ 个槽位、$5 + 7 + 3 = 15$ 个真实项；六个补齐槽乘以 $0$，求和损失除以 $15$（不是 $21$）得到逐词元平均。上下文必须取每条序列**真实**最后位置的编码器状态——第 $5$、$3$、$4$ 个位置——不能都取第 $5$ 个位置，否则较短序列的上下文已经读到了补齐词元。框架要么按长度收集这些状态，要么把批次“打包”使每条序列止于自己的长度。成批前按长度排序或分桶能减少浪费的槽位。
:::
:::

## 一个小型编码器-解码器 {#sec-code}

清单训练一个简单 RNN 编码器-解码器，把 $\{a, b, c, d\}$ 中 $2$ 到 $5$ 个符号的序列**倒序**。解码器从编码器的最后状态出发，有自己的嵌入表；输出层跨步共享。反向传播是穿过解码器的 BPTT，解码器在初始状态处的梯度再作为编码器最后状态的梯度传入编码器——编码器自己没有损失。训练之后，它测量下面会用到的两个数：教师强制下的逐词元准确率，以及贪心解码产出整条序列的准确率——后者把模型自己的预测喂回给自己。

```python
import math, random

SYM = "abcd"; BOS, EOS = 4, 5; V = 6          # 词元编号：a b c d <bos> <eos>
H = 24
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
P = {"Ee": mat(H, V, 0.5), "Ue": mat(H, H, 1 / math.sqrt(H)), "be": [0.0] * H,   # 编码器
     "Ed": mat(H, V, 0.5), "Ud": mat(H, H, 1 / math.sqrt(H)), "bd": [0.0] * H,   # 解码器
     "Wy": mat(V, H, 0.1), "by": [0.0] * V}

def cell(E, U, b, h, x):                       # tanh(U h + E[:, x] + b)，x 为词元编号
    return [math.tanh(e[x] + u + bb) for e, u, bb in zip(E, mv(U, h), b)]

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def loss_grad(P, src, tgt):
    """Teacher forcing: decoder inputs <bos> y1 .. yn, targets y1 .. yn <eos>."""
    he = [[0.0] * H]
    for x in src: he.append(cell(P["Ee"], P["Ue"], P["be"], he[-1], x))
    din, dout = [BOS] + tgt, tgt + [EOS]
    hd, ps, loss = [he[-1]], [], 0.0           # 解码器从编码器最后状态出发
    for x, y in zip(din, dout):
        hd.append(cell(P["Ed"], P["Ud"], P["bd"], hd[-1], x))
        p = softmax([u + b for u, b in zip(mv(P["Wy"], hd[-1]), P["by"])])
        ps.append(p); loss -= math.log(p[y])
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    def back(E, U, b, hs, xs, dh_out, dh, gE, gU, gb):
        """BPTT through one RNN. dh_out[t]: gradient into h_{t+1} from its output
        layer (or None); dh: gradient into the last state. Returns dL/dh_0."""
        for t in range(len(xs), 0, -1):
            if dh_out: dh = [a + c for a, c in zip(dh, dh_out[t - 1])]
            da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
            for i in range(H):
                gb[i] += da[i]; gE[i][xs[t - 1]] += da[i]
                for j in range(H): gU[i][j] += da[i] * hs[t - 1][j]
            dh = [sum(U[i][j] * da[i] for i in range(H)) for j in range(H)]
        return dh
    dh_out = []                                # 输出层传给解码器状态的梯度
    for t, (p, y) in enumerate(zip(ps, dout)):
        dz = p[:]; dz[y] -= 1
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Wy"][k][j] += dz[k] * hd[t + 1][j]
        dh_out.append([sum(P["Wy"][k][j] * dz[k] for k in range(V)) for j in range(H)])
    dh0 = back(P["Ed"], P["Ud"], P["bd"], hd, din, dh_out, [0.0] * H, G["Ed"], G["Ud"], G["bd"])
    back(P["Ee"], P["Ue"], P["be"], he, src, None, dh0, G["Ee"], G["Ue"], G["be"])
    return loss, G

def greedy(P, src, max_len=8):
    h = [0.0] * H
    for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x)
    out, x = [], BOS
    for _ in range(max_len):
        h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
        z = [u + b for u, b in zip(mv(P["Wy"], h), P["by"])]
        x = max(range(V), key=lambda k: z[k])
        if x == EOS: break
        out.append(x)                          # 把模型自己的预测喂回给自己
    return out

def example(r):
    src = [r.randrange(4) for _ in range(r.randint(2, 5))]
    return src, src[::-1]                      # 任务：把序列倒序

# 梯度检查
src, tgt = example(rng)
L, G = loss_grad(P, src, tgt)
for k, i, j in [("Ue", 1, 2), ("Ee", 0, src[0]), ("Ud", 3, 4), ("Wy", 2, 5)]:
    o = P[k][i][j]; P[k][i][j] = o + 1e-5; a = loss_grad(P, src, tgt)[0]
    P[k][i][j] = o - 1e-5; b = loss_grad(P, src, tgt)[0]; P[k][i][j] = o
    print(f"{k}[{i}][{j}]  bptt {G[k][i][j]: .8f}  numeric {(a - b) / 2e-5: .8f}")

def evaluate(P, n=300):
    r = random.Random(123); tok = tot = seq = 0
    for _ in range(n):
        src, tgt = example(r)
        h = [0.0] * H                          # 教师强制：输入真实前缀
        for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x)
        for x, y in zip([BOS] + tgt, tgt + [EOS]):
            h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
            z = [u + b for u, b in zip(mv(P["Wy"], h), P["by"])]
            tok += max(range(V), key=lambda k: z[k]) == y; tot += 1
        seq += greedy(P, src) == tgt
    return tok / tot, seq / n

lr = 0.05
for step in range(1, 20001):
    src, tgt = example(rng)
    L, G = loss_grad(P, src, tgt)
    n = math.sqrt(sum(g * g for v in G.values() for r in v for g in (r if isinstance(r, list) else [r])))
    c = min(1.0, 5.0 / n)
    for k in P:
        if isinstance(P[k][0], list):
            for r, gr in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * c * gr[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * c * G[k][j]
    if step % 5000 == 0:
        tf, fr = evaluate(P)
        print(f"step {step:5d}  teacher-forced token acc {tf:.3f}  free-running sequence acc {fr:.3f}")
for s in ["abc", "dacb", "abcda"]:
    print(s, "->", "".join(SYM[t] for t in greedy(P, [SYM.index(ch) for ch in s])))
r = random.Random(7)                           # 长度 6-8 在训练中从未出现
for n in range(2, 9):
    ok = 0
    for _ in range(200):
        src = [r.randrange(4) for _ in range(n)]
        ok += greedy(P, src, max_len=12) == src[::-1]
    print(f"length {n}: free-running sequence accuracy {ok / 200:.3f}")
```

输出（约五十秒）：

```
Ue[1][2]  bptt -0.03562848  numeric -0.03562848
Ee[0][3]  bptt -0.03736190  numeric -0.03736190
Ud[3][4]  bptt  0.05855906  numeric  0.05855906
Wy[2][5]  bptt -0.16718311  numeric -0.16718311
step  5000  teacher-forced token acc 0.980  free-running sequence acc 0.927
step 10000  teacher-forced token acc 0.997  free-running sequence acc 0.987
step 15000  teacher-forced token acc 0.998  free-running sequence acc 0.990
step 20000  teacher-forced token acc 0.997  free-running sequence acc 0.987
abc -> cba
dacb -> bcad
abcda -> adcba
length 2: free-running sequence accuracy 1.000
length 3: free-running sequence accuracy 1.000
length 4: free-running sequence accuracy 0.970
length 5: free-running sequence accuracy 0.965
length 6: free-running sequence accuracy 0.015
length 7: free-running sequence accuracy 0.000
length 8: free-running sequence accuracy 0.000
```

编码器（$U_e$、$E_e$）、解码器（$U_d$）和输出层的梯度检查全部通过，这证实误差确实经由上下文传到了编码器。模型在训练见过的长度上学会了任务。输出有两个值得注意的特点。自由运行的整序列准确率始终低于教师强制的逐词元准确率：第 $5{,}000$ 步，逐词元准确率 $0.980$、平均每序列 $4.5$ 次预测（含 $\langle\text{eos}\rangle$），若错误相互独立应得 $0.980^{4.5}\approx0.91$，与测得的 $0.927$ 接近。另一个特点是，模型**对更长的输入毫无泛化能力**：长度 $6$ 的源几乎全错。查看它的输出（清单里没有打印）会发现，长度 $6$ 的输入约有三分之二的输出恰含五个符号——它见过的最长长度。它把训练数据的长度分布连同任务一起学了进去。这种长度泛化对任何架构的神经序列模型至今仍是难题。

## 瓶颈 {#sec-bottleneck}

在[[#def-encdec]]中，解码器关于源所知的一切都必须通过上下文 $\mathbf{c}\in\R^H$。四个符号的倒序，$24$ 个数绰绰有余。对一个 50 词的句子，一个 $1{,}000$ 个数的向量必须编码出现了哪些词、按什么顺序、有什么句法关系，还要让解码器每一步都能从中取出正确的词。Cho 等人（2014b）测量了 RNN 编码器-解码器的 BLEU 随句长的变化，发现句子变长时翻译质量急剧下降；随后 Bahdanau、Cho 和 Bengio（2015）表明，加上注意力后这一下降基本消失。（Sutskever 等人报告他们那个大得多、输入逆序的 LSTM 在长句上没有明显退化——提醒我们效应的大小取决于模型。）

::: proposition 经过固定上下文的信息量 {#prop-bottleneck}
设上下文 $\mathbf{c}$ 取值于集合 $\mathcal{C}$。若解码器的输出是 $\mathbf{c}$ 的确定函数（贪心解码），则编码器-解码器至多能产生 $\lvert\mathcal{C}\rvert$ 个不同输出。特别地，一个由 $H$ 个 $b$ 位浮点数构成的上下文至多区分 $2^{bH}$ 个源，所以要能复现任一 $n$ 个符号、字母表大小为 $A$ 的序列，模型需要 $bH\ge n\log_2A$。
:::

::: proof
从 $\mathbf{h}^{\text{dec}}_0$ 起，解码器的计算是 $\mathbf{c}$ 的确定函数（每步输入是上一步的 argmax），所以输出形如 $F(\mathbf{c})$，$F$ 是固定函数，至多取 $\lvert\mathcal{C}\rvert$ 个值。$H$ 个数、每个 $b$ 位的向量至多有 $2^{bH}$ 个值。若 $A^n$ 个序列中的每一个都须对某个源生成，$F$ 至少要取 $A^n$ 个值，故 $2^{bH}\ge A^n$，即 $bH\ge n\log_2A$。
:::

这个计数界非常宽松——$1{,}000$ 个 32 位浮点数原则上可给 $2^{32{,}000}$ 个源编号——但它点出了要害：容量固定而输入在增长。实际的极限不是计数而是可学性：用梯度下降训练的光滑网络，无法像哈希函数那样使用上下文的精度。自然而然的补救是让解码器能查阅编码器的**全部**状态 $\mathbf{h}^{\text{enc}}_1, \dots, \mathbf{h}^{\text{enc}}_S$——一份随输入增长的内存。这就是注意力，[[sequence-models/attention-mechanism]]的主题。

::: quiz
Sutskever 等人把源句逆序，为什么有助于训练？
- [ ] 它把编码器要运行的步数减半。
- [ ] 它让编码器变成双向。
- [x] 它使开头的源词在展开图上紧挨开头的目标词，造出容易先学的短依赖。
- [ ] 逆序句子的困惑度更低。
::: solution
逆序之后第一个源词最后被读入，恰在解码器开始生成第一个目标词之前，于是开头的目标词依赖近期的编码器状态。对应词之间的平均距离没变，但现在有许多梯度下降可以首先抓住的短依赖——正如作者们论证的，这是优化效应。双向编码器或注意力更系统性地达到同样效果。
:::
:::

## 暴露偏差 {#sec-exposure}

教师强制在参考前缀上训练每个条件分布 $p_\theta(y_t\mid y_{<t}, \mathbf{x})$。测试时前缀是模型自己的输出。模型若在第 $t$ 步出错，之后每一步都条件在一个训练中从未出现过的前缀上，而模型毫无如何恢复的经验。Ranzato 等人（2016）称之为**暴露偏差**：训练期间，模型只暴露于前缀的数据分布，从不暴露于自己的分布。

一个简单模型能说明为什么这比逐词元准确率看起来的更要紧。它仿照的是 Ross 和 Bagnell（2010）对模仿学习的分析：只在专家状态上训练的策略，代价可能随时间跨度平方增长。

::: proposition 误差复利 {#prop-compounding}
设解码器在前缀仍正确时每一步以概率 $\varepsilon$ 独立出错；且一旦出过错便“脱离轨道”，之后每步必错（最坏情形）。则 $T$ 步中出错词元数的期望为

$$
\E[\text{错误数}] = \sum_{t=1}^{T}\big(1 - (1 - \varepsilon)^t\big) = T - \frac{(1 - \varepsilon)\big(1 - (1 - \varepsilon)^T\big)}{\varepsilon}\approx\frac{\varepsilon T(T + 1)}{2}\quad(\varepsilon T\ll1),
$$ {#eq-compounding}

而教师强制下每步都见正确前缀，只有 $\varepsilon T$。
:::

::: proof
第 $t$ 步开始时解码器仍在轨道上，当且仅当第 $1, \dots, t - 1$ 步全部正确，其概率为 $(1 - \varepsilon)^{t-1}$。第 $t$ 步出错，要么已经脱轨（概率 $1 - (1 - \varepsilon)^{t-1}$，此后必错），要么仍在轨道上且出错（概率 $(1 - \varepsilon)^{t-1}\varepsilon$）。相加得 $\Prob(\text{第 }t\text{ 步出错}) = 1 - (1 - \varepsilon)^{t-1}(1 - \varepsilon) = 1 - (1 - \varepsilon)^t$。由期望的线性对 $t$ 求和，再用等比级数 $\sum_{t=1}^T(1 - \varepsilon)^t = (1 - \varepsilon)\big(1 - (1 - \varepsilon)^T\big)/\varepsilon$，即得精确公式。$\varepsilon T$ 很小时 $(1 - \varepsilon)^t\approx1 - t\varepsilon$，每项约 $t\varepsilon$，总和约 $\varepsilon T(T + 1)/2$。教师强制下每步前缀正确，每步以概率 $\varepsilon$ 出错，期望为 $\varepsilon T$。
:::

::: widget plot
f: e*x; x - (1-e)*(1-(1-e)^x)/e
x: 0, 100
sliders: e=0.02:0.001:0.2:0.001
labels: \text{教师强制误差数 } \varepsilon T; free-running, off track after the first error
caption: [[#prop-compounding]]最坏情形模型下，长度 $T$ 的输出中错误词元的期望个数。教师强制下的逐词元准确率让误差数线性增长；一旦一个错误使模型脱轨，误差数起初按二次增长，然后逼近 $T$。真实模型能从许多错误中恢复，所以实情介于两条曲线之间，具体在哪里是个经验问题。
:::

最坏情形的假设是悲观的。真实模型常常能恢复：从一个不同但可接受的词开头的译文可以流畅地继续；清单里的倒序模型，教师强制与自由运行的准确率差距恰相当于错误相互独立时的水平，并没有二次膨胀。暴露偏差对训练好的模型究竟伤害多大曾有过争论；例如 He 等人（2021）发现，语言模型能从强加错误的大部分损害中恢复。这个问题连同采样取代 argmax，会再到[[sequence-models/decoding-basics]]中出现。

::: widget markov
matrix: 0.95,0.05; 0,1
states: on track; off track
start: 0
steps: 30
caption: [[#prop-compounding]]的模型视作 $\varepsilon = 0.05$ 的两状态马尔可夫链：每步从“在轨道上”以概率 $0.05$ 离开，且一去不返。$n$ 步后仍在轨道上的概率是 $0.95^n$——$20$ 步后为 $0.36$。试着修改转移矩阵让模型可以恢复（在左下角放一个正元素），看长期在轨道上的步数比例如何变为正。
:::

有人提出过若干补救办法。**调度采样**（scheduled sampling，Bengio, Vinyals, Jaitly and Shazeer, 2015）以训练中逐渐增大的概率，把解码器的输入从参考词元换成模型自己采样的预测；它在若干任务上有帮助，但 Huszár（2015）指出其目标不是恰当的评分规则——它的最优解一般不是真实分布。**序列级训练**直接优化整条生成序列的指标：Ranzato 等人（2016）用 REINFORCE 策略梯度直接优化 BLEU，Wiseman 和 Rush（2016）用束搜索损失训练，Shen 等人（2016）最小化模型采样下的期望风险。这些思想——按模型实际生成的东西来训练，并在序列级打分——正是当今语言模型强化学习微调（[[post-training]]）的先辈。

::: warning 教师强制只是对最大似然的近似
教师强制**就是**自回归模型的最大似然（[[#prop-tf-mle]]）；它不是一个更细心的训练方法会用“真正的梯度”替换掉的捷径。它没有做到的，是优化模型**在生成时**的表现。暴露偏差因此是训练目标（参考序列的似然）与模型用途（生成序列的质量）之间的错位，而不是梯度计算里的错误。补救办法改变的是目标，不是梯度计算。
:::

## 评测输出 {#sec-bleu}

困惑度衡量模型预测参考的水平，但一个翻译系统要按它输出的东西来评判。seq2seq 时代的标准自动指标是 **BLEU**（Papineni, Roukos, Ward and Zhu, 2002），它比较与一条或多条参考译文的 $n$ 元组重叠。

::: definition BLEU {#def-bleu}
给定候选 $\hat{\mathbf{y}}$ 和参考 $\mathbf{y}$，**修正 $n$ 元语法精度** $p_n$ 是 $\hat{\mathbf{y}}$ 中也出现在 $\mathbf{y}$ 里的 $n$ 元组的个数——每个至多按它在 $\mathbf{y}$ 中的出现次数计入（“截断”）——除以 $\hat{\mathbf{y}}$ 的 $n$ 元组总数。记候选长度 $c$、参考长度 $r$，**过短惩罚**在 $c > r$ 时为 $\mathrm{BP} = 1$，否则为 $e^{1 - r/c}$，且

$$
\mathrm{BLEU} = \mathrm{BP}\cdot\exp\Big(\frac14\sum_{n=1}^{4}\log p_n\Big).
$$

在测试语料上，先把截断计数、$n$ 元组总数和长度沿全部句子求和，再算精度与惩罚。BLEU 通常以乘以 $100$ 报告。
:::

::: example 单句的 BLEU {#ex-bleu}
参考：“the cat sat on the mat”。候选：“the cat sat on a mat”。计算 BLEU。
::: solution
候选的一元组：the、cat、sat、on、a、mat——六个里有五个出现在参考中，故 $p_1 = 5/6$。二元组：“the cat”、“cat sat”、“sat on” 匹配，“on a”、“a mat” 不匹配：$p_2 = 3/5$。三元组：“the cat sat”、“cat sat on” 匹配，共四个中两个：$p_3 = 2/4$。四元组：“the cat sat on” 匹配，共三个中一个：$p_4 = 1/3$。两句都是六个词，$\mathrm{BP} = 1$。于是 $\mathrm{BLEU} = (5/6\cdot3/5\cdot1/2\cdot1/3)^{1/4} = (1/12)^{1/4} = 0.537$，即 $53.7$。一个错词的代价很大，因为它破坏了每一个跨越它的 $n$ 元组。
:::
:::

在同类系统的层面，BLEU 与整个测试集上的人类判断相关，但它评判单句和同义改写都很糟糕，分数还依赖分词细节；Post（2018）提出了 SacreBLEU 工具使报告的数字可比。学习型指标与人工评测见[[evaluation]]。

::: history
2013 年之前，神经网络已被用于统计翻译系统的部件——用神经语言模型重排序、Schwenk 的连续空间模型。Nal Kalchbrenner 和 Phil Blunsom 的《循环连续翻译模型》（“Recurrent continuous translation models”，EMNLP 2013）以卷积得到的源表示为条件、用循环解码器生成译文。2014 年 Kyunghyun Cho 和同事们（《用 RNN 编码器-解码器学习短语表示以用于统计机器翻译》，“Learning phrase representations using RNN encoder–decoder for statistical machine translation”，EMNLP 2014）提出了 RNN 编码器-解码器和 GRU，把模型用于在基于短语的系统内部给短语对打分，并在同系列的另一篇论文里分析了它在长句上的弱点。Ilya Sutskever、Oriol Vinyals 和 Quoc Le（《用神经网络学习序列到序列》，“Sequence to sequence learning with neural networks”，NeurIPS 2014）证明，一个纯 LSTM 编码器-解码器在 1200 万句对上训练后，单打独斗就能胜过基于短语的系统。数月之内注意力随之而来（Bahdanau, Cho and Bengio，ICLR 2015），到 2016 年，谷歌神经机器翻译（Wu et al., 2016）等生产系统已是基于注意力的 LSTM 编码器-解码器。编码器-解码器的结构保留在最初的 Transformer 和 T5 这类模型中（[[transformers/architecture-families]]）。
:::

::: summary
- **条件语言模型**分解 $p(\mathbf{y}\mid\mathbf{x}) = \prod_tp(y_t\mid y_{<t}, \mathbf{x})$，以 $\langle\text{eos}\rangle$ 结束输出，因此自己选择输出长度。
- **RNN 编码器-解码器**把源读成一个上下文向量（编码器的最后状态），再由一个从它初始化的第二个 RNN 解码出目标（Sutskever 等人），或每一步都喂给它（Cho 等人）。
- **教师强制**在训练时喂参考前缀，恰是最大似然；梯度从解码器各步损失经上下文穿进编码器。
- 单个上下文向量是一个**瓶颈**，容量固定而输入增长；早期模型的质量在长句上下降，这催生了注意力。
- **暴露偏差**：测试时模型以自己的输出为条件；最坏情形模型中误差复利为 $O(\varepsilon T^2)$ 而非 $\varepsilon T$。调度采样与序列级训练通过改变目标来应对。
- **BLEU** 以截断的 $n$ 元组精度和过短惩罚给输出打分，在语料层面计算。
:::

## 习题

::: exercise 短输出的概率 {level=1 check="0.7*0.4*0.9"}
解码器在教师强制下给参考词元 “yes”、“please” 和 $\langle\text{eos}\rangle$ 的概率为 $0.7$、$0.4$、$0.9$。问 $p(\text{yes please}\mid\mathbf{x})$ 是多少？
::: solution
由[[#eq-clm]]，$p = 0.7\cdot0.4\cdot0.9 = 0.252$。$\langle\text{eos}\rangle$ 那一项是概率的一部分：它是输出在 “yes please” 之后**停下**而不是继续的概率。
:::
:::

::: exercise 为什么需要 ⟨eos⟩ {level=1}
解释为什么没有序列结束词元时，所有长度上所有序列的 $\prod_{t=1}^np(y_t\mid y_{<t}, \mathbf{x})$ 不能构成概率分布，以及 $\langle\text{eos}\rangle$ 如何修复。
::: solution
对每个固定长度 $n$，该长度全部 $\lvert\mathcal{V}\rvert^n$ 个序列的乘积之和为 $1$（先对 $y_n$ 求和，再对 $y_{n-1}$，依此类推）。再对一切长度 $n = 1, 2, \dots$ 求和，总数无穷，而且序列的概率也不告诉我们输出该不该停。有了 $\langle\text{eos}\rangle$，长度 $n$ 的序列概率为 $\prod_{t\le n}p(y_t\mid\dots)\cdot p(\langle\text{eos}\rangle\mid y_{\le n}, \mathbf{x})$，不同序列对应的事件“输出恰为 $y_1\dots y_n$”互不相容，概率之和至多 $1$（模型以概率 $1$ 停下时恰为 $1$）。
:::
:::

::: exercise 过短惩罚 {level=1 check="exp(1-7/6)"}
候选有 $6$ 个词，参考有 $7$ 个词。过短惩罚是多少？
::: solution
$c = 6\le r = 7$，故 $\mathrm{BP} = e^{1 - r/c} = e^{1 - 7/6} = e^{-1/6}\approx0.846$。没有这项惩罚，系统只输出有把握的那几个词就能刷出高精度。
:::
:::

::: exercise 单句 BLEU 可以是零 {level=2}
参考 “the cat sat on the mat”，候选 “the cat is on the mat”。计算 $p_1, \dots, p_4$ 和 BLEU。这对把 BLEU 用在单句上说明什么？工具包如何处理？
::: solution
一元组：the、cat、is、on、the、mat——“the” 在两边都出现两次，截断后的匹配为 the×2、cat、on、mat：$p_1 = 5/6$。二元组：“the cat”、“on the”、“the mat” 匹配，“cat is”、“is on” 不匹配：$p_2 = 3/5$。三元组：只有 “on the mat”：$p_3 = 1/4$。四元组：“the cat is on”、“cat is on the”、“is on the mat”——一个都没有：$p_4 = 0$。于是 $\log p_4 = -\infty$，BLEU $= 0$，尽管候选与参考只差一个词。所以句级 BLEU 很不稳定；它本来就是按语料统计设计的，语料上总会有四元组匹配。单句场景工具包会做**平滑**，例如给零精度加一个小计数（Chen and Cherry, 2014 比较了若干方法）。
:::
:::

::: exercise 误差复利 {level=2 check="20 - 0.95*(1-0.95^20)/0.05"}
在[[#prop-compounding]]的模型中取 $\varepsilon = 0.05$、$T = 20$，精确计算误差的期望个数，与教师强制以及小 $\varepsilon T$ 近似比较。
::: solution
$\E = 20 - 0.95(1 - 0.95^{20})/0.05 = 20 - 19\cdot(1 - 0.358486) = 20 - 12.1888 = 7.811$。教师强制给 $\varepsilon T = 1$。近似 $\varepsilon T(T + 1)/2 = 10.5$ 高估了，因为 $\varepsilon T = 1$ 并不小：精确值有饱和上限，因为它不可能超过 $T$。输出完全无错的概率是 $0.95^{20} = 0.358$。
:::
:::

::: exercise 双向编码器的上下文 {level=2}
许多 seq2seq 系统使用双向编码器（[[sequence-models/recurrent-networks#sec-variants]]）。若上下文由编码器的最终状态构成，该用哪些状态？为什么“拼接输出的最后位置”是个糟糕的选择？
::: solution
前向 RNN 在它的**最后**位置读完了整个句子：$\overrightarrow{\mathbf{h}}_S$；后向 RNN 在它的最后一步读完了整个句子，而那对应位置 $1$：$\overleftarrow{\mathbf{h}}_1$。上下文应把这两者结合，例如 $\mathbf{c} = [\overrightarrow{\mathbf{h}}_S; \overleftarrow{\mathbf{h}}_1]$，再经一个线性映射变成解码器的维度。位置 $S$ 的拼接输出 $[\overrightarrow{\mathbf{h}}_S; \overleftarrow{\mathbf{h}}_S]$ 里含一个只见过最后一个词元的后向状态，白白浪费半个上下文。
:::
:::

::: exercise 传给编码器的梯度 {level=2}
在清单中，编码器只通过 `dh0`——解码器在初始状态处的梯度——收到梯度。证明损失对上下的梯度 $\partial\mathcal{L}/\partial\mathbf{c}$ 是来自每个解码器步骤的贡献之和，并把第 $t$ 步的贡献写成雅可比的乘积。[[sequence-models/recurrent-networks#prop-jacobian]] 对靠后的目标词对编码器的影响意味着什么？
::: solution
上下文就是 $\mathbf{h}^{\text{dec}}_0$，损失是 $\sum_t\ell_t$，而 $\ell_t$ 依赖 $\mathbf{h}^{\text{dec}}_t$。由链式法则，$\partial\ell_t/\partial\mathbf{c} = \big(\prod_{s=1}^{t}D_sU_d\big)^{\!\top}W_y^\top\mathbf{g}_t$（$D_s$ 是解码器的 tanh 斜率，乘积按后来的步在左），$\partial\mathcal{L}/\partial\mathbf{c} = \sum_t\partial\ell_t/\partial\mathbf{c}$。第 $t$ 步的贡献含 $t$ 个雅可比因子，所以对靠后的目标词通常按几何速率更小：编码器主要是为头几个输出词元服务的。对倒序任务这恰与任务匹配（第一个输出是最后一个输入），但对长译文，这是另一种角度看出的瓶颈。
:::
:::

::: exercise 调度采样并不一致 {level=3}
考虑二元组序列构成的目标“分布”$\{aa, bb\}$，各带概率 $\frac12$，模型分解为 $q(y_1)q(y_2\mid y_1)$。（a）证明最大似然（教师强制）能恢复真实分布。（b）假设改为总是用 $y_1$**自己的**采样 $\hat y_1\sim q(y_1)$（与参考无关）替换 $y_1$ 来训练——调度采样的极限。证明此时最好的 $q(y_2\mid\hat y_1)$ 无论 $\hat y_1$ 是什么都是 $\frac12$–$\frac12$，且这样得到的模型把合计 $\frac12$ 的概率赋给不可能的序列 $ab$ 和 $ba$。
::: solution
(a) 教师强制把 $q(y_1)$ 拟合到数据的边缘分布（$\frac12$、$\frac12$），把 $q(y_2\mid y_1)$ 拟合到数据的条件分布，后者把全部质量放在 $y_2 = y_1$ 上。乘积在 $aa$ 和 $bb$ 上各为 $\frac12$：精确。（b）若条件词元 $\hat y_1$ 独立于参考从 $q$ 抽取，则目标 $y_2$（等于参考的 $y_1$）与 $\hat y_1$ 独立，以各 $\frac12$ 的概率取 $a$ 或 $b$。交叉熵 $\E[-\log q(y_2\mid\hat y_1)]$ 在每个 $\hat y_1$ 下都由 $q(y_2 = a\mid\hat y_1) = \frac12$ 最小化。于是拟合出的模型给每个二元组序列的概率都是 $\frac14$，包括 $ab$ 和 $ba$，二者合计 $\frac12$。用自己的预测训练摧毁了词元之间的依赖——这是 Huszár（2015）“调度采样的目标不被真实分布最小化”这一观察的小型版本。
:::
:::

::: exercise 上下文容量 {level=3 check="ceil(1000*8/log2(30000))"}
解码器要由 $H = 1{,}000$ 个各量化为 $8$ 位的数构成的上下文，经贪心解码复现词表 $30{,}000$ 上任意 $n$ 个词元的序列。用[[#prop-bottleneck]]，计数还排除不了的 $n$ 最大是多少？（给出第一个**被**排除的 $n$。）为什么这个答案实际上毫无意义？
::: solution
上下文有 $2^{8000}$ 个可能取值；需要的输出有 $30{,}000^n$ 个。一旦 $n\log_230{,}000 > 8{,}000$，计数就排除这个 $n$，即 $n > 8{,}000/14.873 = 537.9$，所以 $n\le537$ 排除不了，第一个被排除的是 $n = 538$。这个界在实践中无关紧要，因为梯度下降训练的网络不会把上下文当完美编码用：编码器必须把相似的源映成相似的上下文（它是光滑函数），解码器则要靠几次矩阵乘法读出它。没有注意力的真实编码器-解码器在几十个词的句子上下滑——那是远低于计数极限的可学性极限。
:::
:::
