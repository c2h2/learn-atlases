[[sequence-models/seq2seq]]的编码器-解码器把整个源句压进一个向量，再让解码器把它拆开。人类译员做的却是另一件事：写下译文的每个词时，都会回头看源句中与之对应的部分。**注意力**赋予解码器这种能力：在每个输出步骤，它把自己当前的状态与每个编码器状态比较，把比较结果变成源位置上的一个概率分布，再读出编码器状态的加权平均——为每个输出词重新计算一个上下文向量。源句没有任何东西需要被遗忘，因为编码器的全部状态都被保留；解码器学到的是*该往哪儿看*。

Bahdanau、Cho 和 Bengio（2015）为翻译引入了注意力，Luong、Pham 和 Manning（2015）又对其加以完善。它移除了瓶颈，使翻译质量几乎与句长无关，并顺带产出可检查的源词与目标词之间的软**对齐**。两年之后，Vaswani 等人（2017）完全用注意力构建了模型——Transformer——而那个模型的词汇（查询、键、值、缩放点积）在这里已经出现。本章推导加性注意力与乘性注意力，手算它们，说明注意力为什么缩短梯度路径，实现一个带梯度检查的注意力编码器-解码器，最后把注意力看作软性的字典查找——[[transformers/self-attention]]将其发展为自注意力。

## 编码器状态上的注意力 {#sec-attention}

设编码器产出状态 $\mathbf{h}_1, \dots, \mathbf{h}_S\in\R^{d_h}$——通常来自双向 RNN，这样 $\mathbf{h}_s$ 就在全句上下文之中描述源词 $s$（[[sequence-models/recurrent-networks#sec-variants]]）。设 $\mathbf{s}\in\R^{d_s}$ 为解码器在必须选择下一个词时的状态。

::: definition 注意力 {#def-attention}
给定**查询** $\mathbf{s}$ 和由向量 $\mathbf{h}_1, \dots, \mathbf{h}_S$ 组成的**记忆**，带打分函数 $a$ 的**注意力**机制计算

$$
e_j = a(\mathbf{s}, \mathbf{h}_j),\qquad
\alpha_j = \frac{\exp e_j}{\sum_{k=1}^S\exp e_k},\qquad
\mathbf{c} = \sum_{j=1}^S\alpha_j\mathbf{h}_j .
$$ {#eq-attention}

$e_j$ 称为**分数**（或能量），$\alpha_j$ 称为**注意力权重**，$\mathbf{c}$ 称为**上下文向量**。在编码器-解码器中，查询是第 $t$ 步的解码器状态，所以每一步有自己的权重 $\alpha_{tj}$ 和上下文 $\mathbf{c}_t$；矩阵 $(\alpha_{tj})$ 就是**对齐**矩阵。
:::

权重非负且和为 $1$，所以 $\mathbf{c}$ 是编码器状态的凸组合——它们凸包内的一点。若某个分数远大于其他分数，$\alpha$ 就近似 one-hot，$\mathbf{c}$ 近乎复制某一个编码器状态（对某个词的“硬”注意力）；若分数相近，$\mathbf{c}$ 就是平均。[[#eq-attention]]中的一切都可微，于是打分函数、编码器和解码器一起用反向传播训练，不需要“该注意哪里”的监督。

### 加性注意力 {#sec-additive}

::: definition 加性（Bahdanau）注意力 {#def-additive}
**加性注意力**用一个单隐层网络给查询 $\mathbf{s}\in\R^{d_s}$ 与记忆向量 $\mathbf{h}\in\R^{d_h}$ 打分，

$$
a(\mathbf{s}, \mathbf{h}) = \mathbf{v}^\top\tanh\big(W\mathbf{s} + U\mathbf{h}\big),
$$ {#eq-additive}

参数为 $W\in\R^{d_a\times d_s}$、$U\in\R^{d_a\times d_h}$ 和 $\mathbf{v}\in\R^{d_a}$。在 Bahdanau 等人的解码器中，第 $t$ 步的查询是*上一个*解码器状态 $\mathbf{s}_{t-1}$，上下文进入循环和输出：

$$
\mathbf{s}_t = f(\mathbf{s}_{t-1}, E[y_{t-1}], \mathbf{c}_t),\qquad p(y_t\mid y_{<t}, \mathbf{x}) = g(\mathbf{s}_t, E[y_{t-1}], \mathbf{c}_t).
$$
:::

乘积 $U\mathbf{h}_j$ 不依赖解码器步，所以每个源句只计算一次；此后每步的代价是 $W\mathbf{s}$ 的 $O(d_ad_s)$ 加上打分的 $O(Sd_a)$。Bahdanau 等人使用双向 GRU 编码器（每个方向 $1{,}000$ 个单元）和 $1{,}000$ 单元的 GRU 解码器，在英→法数据上训练。他们在最长 $50$ 词的句子上训练，在整个测试集上达到 $26.75$ BLEU，而同尺寸无注意力的编码器-解码器只有 $17.82$；而且——论文中那张决定性的图——它的质量在长句上不再崩塌。

::: example 手算加性注意力 {#ex-additive}
设 $d_s = d_h = d_a = 2$、$W = I$、$U = \begin{pmatrix}0.5 & -0.5\\ 1 & 0\end{pmatrix}$、$\mathbf{v} = (1, -1)$，查询 $\mathbf{s} = (0.2, 0.4)$，三个编码器状态 $\mathbf{h}_1 = (1, 0)$、$\mathbf{h}_2 = (0, 1)$、$\mathbf{h}_3 = (1, 1)$。计算分数、权重和上下文。
::: solution
$W\mathbf{s} = (0.2, 0.4)$。接着 $U\mathbf{h}_1 = (0.5, 1)$、$U\mathbf{h}_2 = (-0.5, 0)$、$U\mathbf{h}_3 = (0, 1)$，于是预激活为 $(0.7, 1.4)$、$(-0.3, 0.4)$、$(0.2, 1.4)$。施加 tanh：$(0.6044, 0.8854)$、$(-0.2913, 0.3799)$、$(0.1974, 0.8854)$。分数 $e_j = \mathbf{v}^\top(\cdot)$ 即第一分量减第二分量：$e = (-0.2810, -0.6713, -0.6880)$。softmax：$\alpha = (0.4269, 0.2889, 0.2842)$。上下文：$\mathbf{c} = 0.4269(1, 0) + 0.2889(0, 1) + 0.2842(1, 1) = (0.7111, 0.5731)$。分数很接近，所以权重摊得很开；训练会在更锐利的对齐有利时把 $\mathbf{v}$、$W$、$U$ 变大。
:::
:::

### 乘性注意力 {#sec-multiplicative}

Luong、Pham 和 Manning（2015）简化了架构并比较了若干打分函数。他们的解码器先照常用 $\mathbf{s}_{t-1}$ 和 $y_{t-1}$ 更新状态 $\mathbf{s}_t$，然后以*当前*状态作查询，并在 softmax 之前把上下文与它在“注意力”层中合并。

::: definition 乘性（Luong）注意力 {#def-multiplicative}
以当前解码器状态 $\mathbf{s}_t$ 为查询，**Luong 注意力**使用下列打分之一

$$
a(\mathbf{s}_t, \mathbf{h}_j) = \begin{cases}\mathbf{s}_t^\top\mathbf{h}_j & \text{点积}\\ \mathbf{s}_t^\top W_a\mathbf{h}_j & \text{一般（双线性）}\\ \mathbf{v}^\top\tanh\big(W_a[\mathbf{s}_t; \mathbf{h}_j]\big) & \text{拼接}\end{cases}
$$ {#eq-luong}

并由**注意力隐状态** $\tilde{\mathbf{s}}_t = \tanh\big(W_c[\mathbf{c}_t; \mathbf{s}_t]\big)$ 经 $p(y_t\mid y_{<t}, \mathbf{x}) = \operatorname{softmax}(W_y\tilde{\mathbf{s}}_t)$ 给出预测。
:::

点积打分不需要参数，并要求 $d_s = d_h$；一般打分允许不同尺寸并学习相似度；拼接本质上就是加性注意力。把所有源位置一次性写成矩阵形式，一般打分为 $\mathbf{s}_t^\top W_aH^\top$，其中 $H\in\R^{S\times d_h}$ 是把编码器状态堆叠起来的矩阵——一次矩阵-向量乘法，这就是乘性注意力在为矩阵乘法设计的硬件上更快的原因。Luong 等人还引入了**输入馈送**（把 $\tilde{\mathbf{s}}_{t-1}$ 拼到下一个解码器输入上，使解码器知道自己先前注意过什么）和**局部注意力**：只关注预测中心附近的源位置窗口，权重乘以高斯函数。用局部注意力和集成，他们在 WMT'15 英→德上报告了 $25.9$ BLEU，比可比的无注意力系统提高 $5$ BLEU。

::: example 手算点积注意力 {#ex-dot}
用点积打分，查询 $\mathbf{s} = (1, 0)$，编码器状态 $\mathbf{h}_1 = (1, 1)$、$\mathbf{h}_2 = (0, 1)$、$\mathbf{h}_3 = (-1, 0.5)$，计算权重和上下文。若把查询加倍，权重会怎样？
::: solution
分数 $e = (1, 0, -1)$；softmax $\alpha = (0.6652, 0.2447, 0.0900)$。上下文 $\mathbf{c} = 0.6652(1, 1) + 0.2447(0, 1) + 0.0900(-1, 0.5) = (0.5752, 0.9550)$。查询加倍使每个分数加倍，$e = (2, 0, -2)$，这相当于把温度减半（[[sequence-models/decoding-basics#def-temperature]]）：$\alpha = (0.867, 0.117, 0.016)$，锐利得多。用点积打分时，查询的**范数**决定注意力有多尖峰——这就是 Transformer 把分数除以 $\sqrt{d_k}$ 的原因（[[transformers/self-attention#prop-variance]]），因为随机 $d$ 维向量的点积的方差随 $d$ 增长。
:::
:::

::: widget plot
f: exp(-b*(x-m)^2)/sum(exp(-b*(k-m)^2), k, 1, 8)
x: 1, 8
y: 0, 1
sliders: m=4:1:8:0.1; b=1:0:6:0.05
points: 1,0; 2,0; 3,0; 4,0; 5,0; 6,0; 7,0; 8,0
caption: 当分数为 $e_j = -b(j - m)^2$ 时在 $S = 8$ 个源位置上的注意力权重：一个“偏爱”位置 $m$、锐度为 $b$ 的查询（在标出的整数位置处读曲线，那里的权重和为 $1$）。$b = 0$ 时每个位置都得 $1/8$，上下文就是简单平均；$b$ 增大时权重集中到最近的位置，逼近硬注意力。Luong 等人的局部注意力正是把基于内容的权重乘以围绕预测位置 $m$ 的、形状完全如此的高斯函数。
:::

## 注意力为什么有帮助 {#sec-why}

注意力改变两件事：什么信息到达解码器，以及梯度如何到达编码器。

::: proposition 经过注意力的梯度 {#prop-attn-grad}
对[[#eq-attention]]，记 $\bar{\mathbf{c}} = \partial\mathcal{L}/\partial\mathbf{c}$，

$$
\frac{\partial\mathcal{L}}{\partial e_j} = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\mathbf{c}\big),\qquad
\frac{\partial\mathcal{L}}{\partial\mathbf{h}_j} = \alpha_j\,\bar{\mathbf{c}} + \frac{\partial\mathcal{L}}{\partial e_j}\,\frac{\partial a(\mathbf{s}, \mathbf{h}_j)}{\partial\mathbf{h}_j} .
$$ {#eq-attn-grad}

特别地，每个编码器状态都通过一条长度为 $1$ 的路径，从上下文直接收到梯度 $\alpha_j\bar{\mathbf{c}}$。
:::

::: proof
$\mathbf{c} = \sum_j\alpha_j\mathbf{h}_j$ 以两种方式依赖 $\mathbf{h}_j$：直接地，系数为 $\alpha_j$；以及通过分数 $e_j$，它改变所有权值。对权重，$\partial\mathcal{L}/\partial\alpha_j = \bar{\mathbf{c}}^\top\mathbf{h}_j$，而 softmax 的雅可比 $\partial\alpha_i/\partial e_j = \alpha_i(\delta_{ij} - \alpha_j)$（[[transformers/self-attention#prop-softmax-jacobian]]）给出 $\partial\mathcal{L}/\partial e_j = \sum_i\bar{\mathbf{c}}^\top\mathbf{h}_i\,\alpha_i(\delta_{ij} - \alpha_j) = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \sum_i\alpha_i\bar{\mathbf{c}}^\top\mathbf{h}_i\big) = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\mathbf{c}\big)$。由扇出法则（[[neural-networks/backpropagation#thm-backprop]]），$\mathbf{h}_j$ 上的梯度是直接项 $\alpha_j\bar{\mathbf{c}}$ 与经由分数的项之和。
:::

分数梯度有清晰的解读：当位置 $j$ 的状态 $\mathbf{h}_j$ 比当前上下文更沿着损失希望上下文移动的方向 $\bar{\mathbf{c}}$ 对齐时，位置 $j$ 的分数就上升。而直接项正是为学习移除瓶颈的那一项。没有注意力时，目标位置 $t$ 处的损失要经过剩下的 $S - j$ 个编码器步骤和 $t$ 个解码器步骤才能到达源位置 $j$——一条长度 $S - j + t$ 的雅可比乘积，它会几何消失（[[sequence-models/recurrent-networks#prop-jacobian]]）。有了注意力，路径长度是常数，与两个词相隔多远无关。

::: widget graph
nodes: e1@0,0; e2@1,0; e3@2,0; e4@3,0; d1@0.5,2; d2@1.5,2; d3@2.5,2
edges: e1>e2; e2>e3; e3>e4; e4>d1; d1>d2; d2>d3; e1>d1; e2>d1; e3>d1; e4>d1; e1>d2; e2>d2; e3>d2; e4>d2; e1>d3; e2>d3; e3>d3; e4>d3
algorithm: bfs
start: e1
caption: 带注意力的编码器-解码器中从第一个源位置 $e_1$ 出发的路径：沿编码器和解码器的循环边，以及从每个编码器状态到每个解码器步骤的注意力边。从 $e_1$ 出发的广度优先搜索以距离 $1$ 到达每个解码器状态。若没有注意力边（想象把它们删掉），$e_1$ 要经过 $e_2, e_3, e_4, d_1, d_2$ 走六步才能到达 $d_3$——梯度正是在这条路径上消失的。
:::

::: quiz
在带注意力的编码器-解码器中，解码器在第 $t$ 步关注 $S$ 个编码器状态。哪句话是正确的？
- [ ] 上下文向量 $\mathbf{c}_t$ 对每个解码器步骤都相同。
- [ ] 注意力权重用词对齐的监督来训练。
- [x] 上下文是编码器状态的凸组合，且每个编码器状态都收到一个与其权重成正比的直接梯度。
- [ ] 注意力使解码器不依赖它先前的状态。
::: solution
$\mathbf{c}_t = \sum_j\alpha_{tj}\mathbf{h}_j$，权重非负、和为 $1$，每步都由解码器的状态重新计算；由[[#prop-attn-grad]]，状态 $\mathbf{h}_j$ 直接收到 $\alpha_{tj}\bar{\mathbf{c}}_t$。权重只从翻译损失中学习（可以用对齐监督，但原始模型没有用），解码器仍是循环的。
:::
:::

::: example 注意力的代价 {#ex-cost}
源和目标各 $50$ 个词元，$d_h = 2{,}000$（双向），把查询投影到 $\R^{2000}$ 后用点积式打分，数一数一个句子的打分和上下文需要多少次乘加。它随长度如何增长？
::: solution
$T = 50$ 个解码器步骤每步计算 $S = 50$ 个分数、每个分数 $d_h = 2{,}000$ 次乘加，外加一个上下文再要 $S\cdot d_h$ 次：$2STd_h = 2\cdot50\cdot50\cdot2{,}000 = 10^7$ 次乘加，另有查询投影 $Td_sd_h = 50\cdot1{,}000\cdot2{,}000 = 10^8$。注意力部分随长度二次增长，$O(STd_h)$；对句子来说它只占循环单元 $O((S + T)d^2)$ 的一小部分，但对几千词元的文档它就占主导了——这正是[[transformers/attention-complexity]]分析的代价。
:::
:::

## 带注意力的编码器-解码器 {#sec-code}

下面的清单给[[sequence-models/seq2seq#sec-code]]的倒序模型加上 Luong 式点积注意力：解码器状态 $\mathbf{s}_t$ 查询编码器状态，预测由 $\tilde{\mathbf{s}}_t = \tanh(W_c[\mathbf{c}_t; \mathbf{s}_t] + \mathbf{b}_c)$ 给出。反向传播实现[[#eq-attn-grad]]，把逐位置的梯度 `d_enc` 送进编码器的 BPTT，并与差分核对。训练照旧——同样的数据、种子、学习率和步数。

```python
import math, random

SYM = "abcd"; BOS, EOS = 4, 5; V = 6
H = 24
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
def dot(a, b): return sum(x * y for x, y in zip(a, b))
P = {"Ee": mat(H, V, 0.5), "Ue": mat(H, H, 1 / math.sqrt(H)), "be": [0.0] * H,
     "Ed": mat(H, V, 0.5), "Ud": mat(H, H, 1 / math.sqrt(H)), "bd": [0.0] * H,
     "Wc": mat(H, 2 * H, 1 / math.sqrt(2 * H)), "bc": [0.0] * H,     # 注意力层
     "Wy": mat(V, H, 0.1), "by": [0.0] * V}

def cell(E, U, b, h, x):
    return [math.tanh(e[x] + u + bb) for e, u, bb in zip(E, mv(U, h), b)]
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def attend(s, hs):
    """Dot-product attention of decoder state s (H,) over encoder states hs (S, H)."""
    alpha = softmax([dot(s, h) for h in hs])                  # (S,)
    c = [sum(a * h[j] for a, h in zip(alpha, hs)) for j in range(H)]   # (H,)
    return alpha, c

def step_out(P, s, hs):
    alpha, c, o, z = attend(s, hs)
    o = [math.tanh(v + b) for v, b in zip(mv(P["Wc"], c + s), P["bc"])]  # (H,)
    z = [u + b for u, b in zip(mv(P["Wy"], o), P["by"])]
    return alpha, c, o, z

def loss_grad(P, src, tgt):
    he = [[0.0] * H]
    for x in src: he.append(cell(P["Ee"], P["Ue"], P["be"], he[-1], x))
    enc = he[1:]                                               # (S, H) 记忆
    din, dout = [BOS] + tgt, tgt + [EOS]
    hd, cache, loss = [he[-1]], [], 0.0
    for x, y in zip(din, dout):
        hd.append(cell(P["Ed"], P["Ud"], P["bd"], hd[-1], x))
        alpha, c, o, z = step_out(P, hd[-1], enc)
        p = softmax(z); loss -= math.log(p[y]); cache.append((alpha, c, o, p))
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    d_enc = [[0.0] * H for _ in enc]                           # 传入编码器状态的梯度
    ds_out = []                                                # 传入解码器状态的梯度
    for t, ((alpha, c, o, p), y) in enumerate(zip(cache, dout)):
        s = hd[t + 1]
        dz = p[:]; dz[y] -= 1
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Wy"][k][j] += dz[k] * o[j]
        do = [sum(P["Wy"][k][j] * dz[k] for k in range(V)) for j in range(H)]
        da = [d * (1 - v * v) for d, v in zip(do, o)]
        cs = c + s
        for i in range(H):
            G["bc"][i] += da[i]
            for j in range(2 * H): G["Wc"][i][j] += da[i] * cs[j]
        dcs = [sum(P["Wc"][i][j] * da[i] for i in range(H)) for j in range(2 * H)]
        dc, ds = dcs[:H], dcs[H:]
        dalpha = [dot(dc, h) for h in enc]
        m = dot(alpha, dalpha)
        de = [a * (g - m) for a, g in zip(alpha, dalpha)]      # softmax 反向
        for si, h in enumerate(enc):
            for j in range(H):
                d_enc[si][j] += alpha[si] * dc[j] + de[si] * s[j]
                ds[j] += de[si] * h[j]
        ds_out.append(ds)
    def back(E, U, b, hs, xs, dh_out, dh, gE, gU, gb):
        for t in range(len(xs), 0, -1):
            if dh_out: dh = [a + c for a, c in zip(dh, dh_out[t - 1])]
            da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
            for i in range(H):
                gb[i] += da[i]; gE[i][xs[t - 1]] += da[i]
                for j in range(H): gU[i][j] += da[i] * hs[t - 1][j]
            dh = [sum(U[i][j] * da[i] for i in range(H)) for j in range(H)]
        return dh
    dh0 = back(P["Ed"], P["Ud"], P["bd"], hd, din, ds_out, [0.0] * H, G["Ed"], G["Ud"], G["bd"])
    back(P["Ee"], P["Ue"], P["be"], he, src, d_enc, dh0, G["Ee"], G["Ue"], G["be"])
    return loss, G

def greedy(P, src, max_len=12, show=False):
    h, enc = [0.0] * H, []
    for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x); enc.append(h)
    out, x = [], BOS
    for _ in range(max_len):
        h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
        alpha, c, o, z = step_out(P, h, enc)
        x = max(range(V), key=lambda k: z[k])
        if show: print("  ", "<eos>" if x == EOS else SYM[x], " ".join(f"{a:.2f}" for a in alpha))
        if x == EOS: break
        out.append(x)
    return out

def example(r):
    src = [r.randrange(4) for _ in range(r.randint(2, 5))]
    return src, src[::-1]

src, tgt = example(rng)
L, G = loss_grad(P, src, tgt)
for k, i, j in [("Ue", 1, 2), ("Ee", 0, src[0]), ("Wc", 3, 30), ("Ud", 2, 7)]:
    o = P[k][i][j]; P[k][i][j] = o + 1e-5; a = loss_grad(P, src, tgt)[0]
    P[k][i][j] = o - 1e-5; b = loss_grad(P, src, tgt)[0]; P[k][i][j] = o
    print(f"{k}[{i}][{j}]  backprop {G[k][i][j]: .8f}  numeric {(a - b) / 2e-5: .8f}")

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
r = random.Random(7)
for n in range(2, 9):
    ok = sum(greedy(P, s) == s[::-1] for s in ([r.randrange(4) for _ in range(n)] for _ in range(200)))
    print(f"length {n}: free-running sequence accuracy {ok / 200:.3f}")
print("attention weights for source 'abcd' (one row per output token):")
greedy(P, [0, 1, 2, 3], show=True)
```

输出（约两分钟）：

```
Ue[1][2]  backprop -0.00519286  numeric -0.00519286
Ee[0][2]  backprop -0.13625324  numeric -0.13625324
Wc[3][30]  backprop -0.07880990  numeric -0.07880990
Ud[2][7]  backprop  0.05131455  numeric  0.05131455
length 2: free-running sequence accuracy 1.000
length 3: free-running sequence accuracy 1.000
length 4: free-running sequence accuracy 1.000
length 5: free-running sequence accuracy 1.000
length 6: free-running sequence accuracy 0.295
length 7: free-running sequence accuracy 0.000
length 8: free-running sequence accuracy 0.000
attention weights for source 'abcd' (one row per output token):
   d 0.00 0.00 0.03 0.97
   c 0.00 0.04 0.94 0.01
   b 0.09 0.82 0.09 0.00
   a 0.91 0.09 0.01 0.00
   <eos> 0.88 0.11 0.00 0.01
```

梯度检查覆盖编码器、解码器和注意力层。与无注意力的模型（其长度 $4$ 和 $5$ 的得分为 $0.970$ 和 $0.965$）相比，注意力模型在所有训练过的长度上都完美，而打印出的权重说明了原因：模型在毫无监督的情况下发现了倒序的**副对角对齐**——第一个输出以权重 $0.97$ 关注最后一个输入，第二个关注第三个，如此下去。在没见过的长度 $6$ 上它有 $30\%$ 的时间是对的而不是 $1.5\%$，但在长度 $7$ 和 $8$ 上仍然失败：注意力移除了解码器*能读什么*的瓶颈，但驱动查询的循环状态数来只数到过五。基于内容的注意力除了编码器写进状态的东西之外对位置一无所知，这个主题会在[[transformers/positional-encoding]]的位置编码中再现。

::: warning 注意力权重解释了模型的决定
对齐图很生动，而且对翻译来说常与语言学家的词对齐吻合。但注意力权重说的是一个向量对一个加权平均贡献了多少，不是模型为什么产生它的输出。Jain 和 Wallace（2019）表明，对文本分类器，常常可以换成相当不同的注意力分布而不改变预测；Wiegreffe 和 Pinter（2019）回应说这并不使注意力失去意义，并提出了更严格的检验。编码器状态 $\mathbf{h}_j$ 混合了全句的信息（它来自双向 RNN），所以“关注词 $j$”不等于“只用词 $j$”。要把注意力图当作证据之一，对照干预来检验（[[interpretability]]）。
:::

## 注意力作为软性的字典查找 {#sec-lookup}

Python 字典把查询映射到与匹配键相联的值。注意力是可微的版本：把查询与*每个*键比较，返回按各键匹配程度加权的值的混合。在[[#eq-attention]]中编码器状态同时充当键和值；把两种角色分开，就是从 RNN 注意力迈向 Transformer 的一步。

::: definition 查询-键-值注意力 {#def-qkv}
给定查询 $\mathbf{q}\in\R^{d_k}$、键 $\mathbf{k}_1, \dots, \mathbf{k}_S\in\R^{d_k}$ 和值 $\mathbf{v}_1, \dots, \mathbf{v}_S\in\R^{d_v}$，**缩放点积注意力**返回

$$
\operatorname{attn}(\mathbf{q}, K, V) = \sum_{j=1}^S\operatorname{softmax}_j\Big(\frac{\mathbf{q}^\top\mathbf{k}_j}{\sqrt{d_k}}\Big)\,\mathbf{v}_j .
$$ {#eq-qkv}

Luong 的一般打分是 $\mathbf{q} = \mathbf{s}_t$、$\mathbf{k}_j = W_a\mathbf{h}_j$、$\mathbf{v}_j = \mathbf{h}_j$ 的情形（没有缩放）。把查询、键、值算成同一序列的学习线性映射 $Q = XW_Q$、$K = XW_K$、$V = XW_V$，就得到**自注意力**。
:::

查找的图景解释了设计。键决定*是否*取回某个条目，值决定取回的*是什么*，所以两者未必是同一个向量。若某个键比其他键匹配得好得多，softmax 就逼近硬查找；若几个键都匹配，它们的值就被混合。按 $\sqrt{d_k}$ 缩放使分数的方差与维数无关，从而 softmax 在初始化时既不饱和也不平坦（[[transformers/self-attention#sec-scaling]]）。

这个查找有更早的统计学前身。**Nadaraya–Watson 核回归**（Nadaraya，1964；Watson，1964）从训练对 $(\mathbf{k}_j, \mathbf{v}_j)$ 出发，用响应的加权平均预测点 $\mathbf{q}$ 处的响应，权重由度量接近程度的核 $K$ 给出：$\hat f(\mathbf{q}) = \sum_jK(\mathbf{q}, \mathbf{k}_j)\mathbf{v}_j/\sum_iK(\mathbf{q}, \mathbf{k}_i)$。取 $K(\mathbf{q}, \mathbf{k}) = \exp(\mathbf{q}^\top\mathbf{k}/\sqrt{d_k})$，它就*是*[[#eq-qkv]]；区别在于注意力中的查询、键和值本身也是学出来的。

::: proposition 高斯核与点积 {#prop-kernel}
若所有键有相同的范数 $\lVert\mathbf{k}_j\rVert = r$，则用高斯核 $K(\mathbf{q}, \mathbf{k}) = \exp\big(-\lVert\mathbf{q} - \mathbf{k}\rVert^2/(2\sigma^2)\big)$ 的 Nadaraya–Watson 回归给出的权重，与分数为 $\mathbf{q}^\top\mathbf{k}_j/\sigma^2$ 的点积注意力相同。
:::

::: proof
$-\lVert\mathbf{q} - \mathbf{k}_j\rVert^2/(2\sigma^2) = \big(-\lVert\mathbf{q}\rVert^2 - r^2 + 2\mathbf{q}^\top\mathbf{k}_j\big)/(2\sigma^2)$。前两项对每个 $j$ 都相同，而给所有分数加同一个常数会在归一化中抵消（softmax 平移不变）。剩下的是 $\mathbf{q}^\top\mathbf{k}_j/\sigma^2$。
:::

所以点积注意力是一层伪装的平滑核，带宽 $\sigma^2$ 扮演着温度的角色；Transformer 的 $\sqrt{d_k}$ 是一种带宽选择。当键的范数不同时，点积还偏爱长的键，这是高斯核不会做的。

2015 年到 2017 年间，注意力远远超出了翻译，常常以别的名字出现。**Show, attend and tell**（Xu 等人，2015）在生成图片描述时对图像卷积特征图的各个区域做注意力。**Listen, attend and spell**（Chan 等人，2016）和 Chorowski 等人（2015）在语音识别中对音频帧做注意力。**指针网络**（Vinyals、Fortunato 和 Jaitly，2015）把注意力分布本身当作输出——指向某个输入位置——来求解组合优化问题；pointer-generator 网络（See、Liu 和 Manning，2017）在摘要中把生成一个词与从源句复制一个词混合起来。记忆网络（Weston、Chopra 和 Bordes，2015）和神经图灵机（Graves、Wayne 和 Danihelka，2014）用注意力从外部记忆中读取。若干模型在*单个*序列内部使用注意力——Cheng、Dong 和 Lapata（2016）的 LSTM-network、Parikh 等人（2016）的可分解注意力模型、Lin 等人（2017）的结构化自注意力句子嵌入——随后 Vaswani 等人（2017）把循环彻底去掉了。

::: example 从 RNN 注意力到自注意力 {#ex-self}
一个 $S = 6$ 个词元的句子有编码器状态 $H\in\R^{6\times512}$。(a) 对 $\mathbf{s}_t\in\R^{512}$，写出 Luong 一般注意力在一个解码器步骤中各量的形状。(b) 现在让每个*编码器*位置以 $Q = HW_Q$、$K = HW_K$、$V = HW_V$、$W_\bullet\in\R^{512\times64}$ 查询其他所有位置。给出 $Q$、$K$、$V$、分数矩阵和输出的形状，以及参数个数。
::: solution
(a) $W_aH^\top$ 是 $(512\times512)(512\times6) = 512\times6$；分数 $\mathbf{s}_t^\top W_aH^\top$ 是 $1\times6$；权重 $1\times6$；上下文 $\alpha H$ 是 $1\times512$。参数：$W_a$ 中 $512^2 = 262{,}144$ 个。
(b) $Q, K, V$ 各为 $6\times64$；分数 $QK^\top/\sqrt{64}$ 是 $6\times6$，每个查询词元一行；逐行 softmax 后输出 $\operatorname{softmax}(QK^\top/8)V$ 是 $6\times64$，是由所有其他词元算出的每个词元的新表示。参数：$3\cdot512\cdot64 = 98{,}304$。(b) 中没有循环：六行一次性全部算出，这正是 Transformer 训练快的原因（[[transformers/self-attention]]）。
:::
:::

::: history
软的、可微的注意力有先驱：Alex Graves 的手写合成网络（2013）对要书写的文本使用一个学习到的软窗口，而让网络选择看哪里的想法可追溯到 1980、90 年代关于视觉注意力的工作。Dzmitry Bahdanau、Kyunghyun Cho 和 Yoshua Bengio 的《通过联合学习对齐与翻译实现神经机器翻译》（"Neural machine translation by jointly learning to align and translate"，2014 年 9 月挂出，ICLR 2015）把注意力引入编码器-解码器；当时 Bahdanau 是 Bengio 在蒙特利尔实验室的实习生。Minh-Thang Luong、Hieu Pham 和 Christopher Manning 的《基于注意力的神经机器翻译的有效方法》（"Effective approaches to attention-based neural machine translation"，EMNLP 2015）引入了带乘性打分的全局与局部注意力。两年之内，基于注意力的 LSTM 编码器-解码器已进入工业翻译系统（Wu 等人，2016），而《注意力就是你所需要的一切》（"Attention is all you need"，Vaswani 等人，NeurIPS 2017）表明没有循环的注意力就够了。
:::

::: summary
- **注意力**计算查询与每个记忆向量之间的分数 $e_j = a(\mathbf{s}, \mathbf{h}_j)$、权重 $\alpha = \operatorname{softmax}(e)$ 和上下文 $\mathbf{c} = \sum_j\alpha_j\mathbf{h}_j$——为每个输出步骤准备一个新的编码器状态凸组合。
- **加性**（Bahdanau）打分 $\mathbf{v}^\top\tanh(W\mathbf{s} + U\mathbf{h})$ 用上一个解码器状态；**乘性**（Luong）打分 $\mathbf{s}^\top\mathbf{h}$ 或 $\mathbf{s}^\top W_a\mathbf{h}$ 用当前状态，作为矩阵乘积更便宜。
- 注意力移除固定大小的瓶颈，并给每个编码器状态一个直接梯度 $\alpha_j\bar{\mathbf{c}}$；翻译质量在长句上不再崩塌。
- 权重构成一个软的**对齐**，无需监督地学出；它们是关于模型的证据，不是对模型的解释。
- 分开**查询、键和值**并按 $\sqrt{d_k}$ 缩放，得到缩放点积注意力；把它用在单个序列内部就是自注意力，Transformer 的核心。
:::

## 习题

::: exercise 由分数到权重 {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
三个编码器状态的分数为 $e = (2, 1, 0)$。第一个状态的权重是多少？
::: solution
$\alpha_1 = e^2/(e^2 + e + 1) = 7.389/11.107 = 0.665$。
:::
:::

::: exercise 上下文向量 {level=1 check="0.6*1+0.3*0+0.1*(-2)"}
权重为 $(0.6, 0.3, 0.1)$，标量编码器状态 $h = (1, 0, -2)$，上下文是多少？
::: solution
$c = 0.6\cdot1 + 0.3\cdot0 + 0.1\cdot(-2) = 0.4$。
:::
:::

::: exercise 加性注意力与一般注意力的参数 {level=1 check="1000*1000+1000*2000+1000"}
解码器状态大小 $d_s = 1{,}000$、编码器状态大小 $d_h = 2{,}000$、$d_a = 1{,}000$，加性注意力[[#eq-additive]]有多少个参数？Luong 的一般打分有多少个？
::: solution
加性：$W$ 是 $1{,}000\times1{,}000$，$U$ 是 $1{,}000\times2{,}000$，$\mathbf{v}$ 有 $1{,}000$ 个分量：$1{,}000{,}000 + 2{,}000{,}000 + 1{,}000 = 3{,}001{,}000$。一般：$W_a$ 是 $1{,}000\times2{,}000 = 2{,}000{,}000$。
:::
:::

::: exercise 均匀注意力 {level=2}
证明若所有分数相等，上下文是编码器状态的均值，且对每个分数的梯度是 $\frac1S\bar{\mathbf{c}}^\top(\mathbf{h}_j - \bar{\mathbf{h}})$，其中 $\bar{\mathbf{h}}$ 是均值。解释这个结果在初始化时对训练意味着什么。
::: solution
分数相等给出 $\alpha_j = 1/S$，所以 $\mathbf{c} = \frac1S\sum_j\mathbf{h}_j = \bar{\mathbf{h}}$。由[[#eq-attn-grad]]，$\partial\mathcal{L}/\partial e_j = \frac1S(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\bar{\mathbf{h}}) = \frac1S\bar{\mathbf{c}}^\top(\mathbf{h}_j - \bar{\mathbf{h}})$。初始化时注意力接近均匀；梯度会提高那些状态沿着损失希望上下文移动的方向偏离平均值的位置的分数。看起来像平均的位置往哪边都不会被推，所以对齐是从编码器状态之间的差异学来的。
:::
:::

::: exercise 点积注意力与范数 {level=2}
用点积打分，证明把所有编码器状态乘以 $\lambda > 0$ 会改变注意力权重，而把分数换成余弦相似度 $\mathbf{s}^\top\mathbf{h}_j/(\lVert\mathbf{s}\rVert\lVert\mathbf{h}_j\rVert)$ 则对重新缩放不变，但每个分数被限制在 $[-1, 1]$ 内。为什么这个界限是个问题？通常如何补救？
::: solution
每个 $\mathbf{h}_j$ 乘以 $\lambda$ 使每个分数乘以 $\lambda$，对 softmax 来说相当于温度 $1/\lambda$：$\lambda > 1$ 时权重变锐利，$\lambda < 1$ 时变平坦（它们的次序不变）。余弦分数对 $\mathbf{s}$ 或 $\mathbf{h}_j$ 的任何正缩放都不变，但落在 $[-1, 1]$ 内，于是两个权重的最大可能比是 $e^{2}\approx7.4$：无论某个位置匹配得多么明显，注意力都无法变尖。通常的补救是使用学习（或固定）的温度 $\operatorname{softmax}(g\cos(\mathbf{s}, \mathbf{h}_j))$，带缩放因子 $g$，一些归一化注意力的变体就是这么做的。
:::
:::

::: exercise 有无注意力的路径长度 {level=2 check="5-1+4"}
源有 $S = 5$ 个词元，解码器在目标第 $t = 4$ 步。每个循环步骤算一条边、上下文算一条边，在无注意力模型中（上下文是最后一个编码器状态，由它初始化解码器）源词元 $1$ 与解码器状态 $\mathbf{s}_4$ 之间隔着多少步？有注意力时呢？
::: solution
无注意力：从 $\mathbf{h}_1$ 到 $\mathbf{h}_5$ 是 $4$ 个编码器步骤；$\mathbf{h}_5$ 初始化 $\mathbf{s}_0$，从 $\mathbf{s}_0$ 到 $\mathbf{s}_4$ 是 $4$ 个解码器步骤：$(S - 1) + t = 8$。有注意力时，$\mathbf{h}_1$ 直接进入 $\mathbf{c}_4$，而 $\mathbf{c}_4$ 馈入 $\mathbf{s}_4$（Bahdanau）或第 $4$ 步的预测（Luong）：一步。
:::
:::

::: exercise 注意力中的 softmax 雅可比 {level=2}
对[[#ex-dot]]的权重 $\alpha = (0.6652, 0.2447, 0.0900)$，计算雅可比 $\partial\alpha/\partial e$ 并验证每行之和为零。为什么必须如此？
::: solution
$J_{ij} = \alpha_i(\delta_{ij} - \alpha_j)$。第一行：$(0.6652\cdot0.3348, -0.6652\cdot0.2447, -0.6652\cdot0.0900) = (0.2227, -0.1628, -0.0599)$。第二行：$(-0.1628, 0.2447\cdot0.7553, -0.0220) = (-0.1628, 0.1848, -0.0220)$。第三行：$(-0.0599, -0.0220, 0.0900\cdot0.9100) = (-0.0599, -0.0220, 0.0819)$。每行之和为 $0$（舍入误差内）。必须如此，因为给每个分数加同一个常数不改变 softmax，所以沿方向 $(1, 1, 1)$ 的导数为零：$J\mathbf{1} = \mathbf{0}$。矩阵还是对称的。
:::
:::

::: exercise 硬注意力 {level=3}
**硬注意力**不用平均 $\sum_j\alpha_j\mathbf{h}_j$，而是采样一个位置 $j\sim\alpha$ 并用 $\mathbf{c} = \mathbf{h}_j$。证明 $\E[\mathbf{c}]$ 等于软上下文，解释为什么采样的 $\mathbf{c}$ 对分数不可导，并导出分数函数（REINFORCE）估计量 $\nabla_e\E_{j\sim\alpha}[\mathcal{L}(\mathbf{h}_j)] = \E_{j\sim\alpha}\big[\mathcal{L}(\mathbf{h}_j)\nabla_e\log\alpha_j\big]$，其中 $\partial\log\alpha_j/\partial e_i = \delta_{ij} - \alpha_i$。
::: solution
$\E[\mathbf{c}] = \sum_j\alpha_j\mathbf{h}_j$，即软上下文。对一次固定的抽样（比如把一个均匀随机数与累积权重比较来选 $j$），采样的 $\mathbf{c}$ 是分数的分段常值函数，在一个 $\mathbf{h}_j$ 与另一个之间跳变；它的导数在有定义处为零，也不携带信息。改为对期望求导：$\nabla_e\sum_j\alpha_j\mathcal{L}(\mathbf{h}_j) = \sum_j\mathcal{L}(\mathbf{h}_j)\nabla_e\alpha_j = \sum_j\alpha_j\mathcal{L}(\mathbf{h}_j)\nabla_e\log\alpha_j$，用到 $\nabla\alpha_j = \alpha_j\nabla\log\alpha_j$；这是在 $\alpha$ 下的一个期望，用抽样来估计。由 $\log\alpha_j = e_j - \log\sum_ke^{e_k}$ 得 $\partial\log\alpha_j/\partial e_i = \delta_{ij} - \alpha_i$。这个估计量无偏但方差大，这就是 Xu 等人（2015）的硬注意力描述生成模型需要基线、而软注意力成为标准的原因。
:::
:::

::: exercise 键-值分离的注意力 {level=3}
修改清单中的 `attend`，使用分开学习的键和值：$\mathbf{k}_j = W_K\mathbf{h}_j$、$\mathbf{v}_j = W_V\mathbf{h}_j$，$W_K, W_V\in\R^{H\times H}$，分数 $\mathbf{s}^\top\mathbf{k}_j/\sqrt H$，上下文 $\sum_j\alpha_j\mathbf{v}_j$。导出对 $W_K$ 和 $W_V$ 的梯度，并说明反向传播中哪几行要改。
::: solution
记 $\bar{\mathbf{c}}$ 为上下文梯度（清单中的 `dc`），$\bar e_j = \alpha_j(\bar{\mathbf{c}}^\top\mathbf{v}_j - \bar{\mathbf{c}}^\top\mathbf{c})$ 为分数梯度（`de`，现在用 `dalpha = [dot(dc, v) for v in values]` 计算）。由 $\mathbf{c} = \sum_j\alpha_jW_V\mathbf{h}_j$ 得 $\partial\mathcal{L}/\partial W_V = \sum_j\alpha_j\bar{\mathbf{c}}\mathbf{h}_j^\top$。由 $e_j = \mathbf{s}^\top W_K\mathbf{h}_j/\sqrt H$ 得 $\partial\mathcal{L}/\partial W_K = \sum_j\bar e_j\,\mathbf{s}\mathbf{h}_j^\top/\sqrt H$。传入输入的梯度变为 $\partial\mathcal{L}/\partial\mathbf{h}_j = \alpha_jW_V^\top\bar{\mathbf{c}} + \bar e_jW_K^\top\mathbf{s}/\sqrt H$（替换 `alpha[si] * dc[j] + de[si] * s[j]`）和 $\partial\mathcal{L}/\partial\mathbf{s}\mathrel{+}=\sum_j\bar e_j\mathbf{k}_j/\sqrt H$（替换 `de[si] * h[j]`）。把这些量沿解码器步骤求和，并对每个新矩阵的一个条目做差分检查，即可验证推导。
:::
:::
