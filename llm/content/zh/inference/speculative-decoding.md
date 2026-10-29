大模型的一个解码步要读遍全部权重才能产出一个词元，而其中的算术单元大多在闲置（[[inference/decoding-sampling#prop-phases]]）。在同一步里处理*多个*位置所需的时间几乎相同，因为无论有多少位置要用这些权重，它们都只被读取一次（[[inference/batching-serving#prop-linear-intensity]]）。预填充阶段就利用了这一点来处理提示词——它的词元全都已知。生成阶段却做不到，因为词元 $t + 1$ 依赖于词元 $t$——除非我们能廉价地猜出接下来的几个词元，再让大模型在一趟之内把所有猜测全部检查一遍。

**投机解码（speculative decoding）** 做的正是这件事。一个小的**草稿模型（draft model）** 提出 $\gamma$ 个词元；大的**目标模型（target model）** 在一次前向趟中为它们全部打分；一条精心设计的接受规则保留候选的一个前缀，并修正第一个被拒绝的词元。下面将要证明的惊人事实是：这条规则可以选得让生成文本**恰好服从目标模型的分布**——而不是它的某个近似。因此投机解码纯粹是速度上的优化：它改变的是词元到达的快慢，从不改变哪些词元更可能出现。

本章将证明这一点，推导接受率与目标模型每趟的期望词元数 $(1 - \alpha^{\gamma+1})/(1 - \alpha)$，把它变成一个带有最优草稿词元数的加速比公式，用纯 Python 模拟整个方案，然后综述各种变体——Medusa、EAGLE 这样的草稿头、树验证、前瞻解码（lookahead decoding）——并区分其中哪些保持分布不变、哪些不保持。

## 算法 {#sec-algorithm}

记目标模型为 $p(\cdot\mid x_{<t})$，草稿模型为 $q(\cdot\mid x_{<t})$。二者词表相同。当目标带有温度和截断采样时，$p$ 指经过这些变换之后的分布（[[inference/decoding-sampling#def-pipeline]]），$q$ 同理。

::: algorithm 投机采样（Leviathan、Kalman 与 Matias，2023；Chen 等，2023）{#alg-spec}
给定前缀 $x_{<t}$ 与草稿长度 $\gamma\ge1$：

1. **起草。** 对 $i = 1,\dots,\gamma$：采样 $\tilde x_i\sim q(\cdot\mid x_{<t}, \tilde x_{<i})$，并记录分布 $q_i$。
2. **打分。** 让目标模型在 $x_{<t}, \tilde x_1,\dots,\tilde x_\gamma$ 上运行一次，得到 $i = 1,\dots,\gamma + 1$ 的 $p_i = p(\cdot\mid x_{<t}, \tilde x_{<i})$。
3. **验证。** 对 $i = 1,\dots,\gamma$：抽取 $u\sim\mathrm{Uniform}(0, 1)$；若 $u < \min\big(1, p_i(\tilde x_i)/q_i(\tilde x_i)\big)$，则**接受** $\tilde x_i$ 并继续；否则**拒绝**它，从**残差分布（residual distribution）**

$$
r_i(x) = \frac{\max\big(0,\ p_i(x) - q_i(x)\big)}{\sum_{y}\max\big(0,\ p_i(y) - q_i(y)\big)},
$$ {#eq-residual}

中采样一个替换词元，把它接上，并停止。
4. **奖励。** 若全部 $\gamma$ 个草稿词元都被接受，则从 $p_{\gamma+1}$ 再采样一个词元接上。

每次迭代接上 $1$ 到 $\gamma + 1$ 个词元，代价是 $\gamma$ 次草稿步和一趟对 $\gamma + 1$ 个位置的目标模型计算。
:::

时间正是在第 2 步省下来的。在一趟里为 $\gamma + 1$ 个位置打分就像一次小型预填充：权重只读一次，而多出来的位置所用的算术，恰是一个访存受限的步骤本来就闲置下来的预算。被拒绝位置的 KV缓存会被丢弃（用分页缓存时，只需把块表截短即可，[[inference/kv-cache#def-paged]]）。

## 为什么分布被保持 {#sec-exactness}

::: theorem 投机采样是精确的 {#thm-exact}
设 $p$ 与 $q$ 是有限词表上的分布，且只要 $p(x) > 0$ 就有 $q(x) > 0$（或者在 $q = 0$ 处定义 $p/q = \infty$，这只对草稿从不提出的词元有影响）。抽取 $\tilde x\sim q$，以概率 $\min(1, p(\tilde x)/q(\tilde x))$ 接受它，否则输出从 $r(x)\propto\max(0, p(x) - q(x))$ 采出的样本。输出 $X$ 的分布就是 $p$。

由此，[[#alg-spec]]产生的序列在任意长度上都恰好服从从 $p$ 逐步采样（ancestral sampling）的分布。
:::

::: proof
设 $\beta = \sum_x\min\big(p(x), q(x)\big)$ 为接受的总概率。词元 $x$ 被提出且被接受的概率是 $q(x)\min\big(1, p(x)/q(x)\big) = \min\big(p(x), q(x)\big)$。被拒绝的概率是 $1 - \beta$，且

$$
1 - \beta = \sum_x\big(p(x) - \min(p(x), q(x))\big) = \sum_x\max\big(0, p(x) - q(x)\big),
$$

其中用到了 $\sum_xp(x) = 1$ 与 $p - \min(p, q) = \max(0, p - q)$。因此 $r$ 的归一化常数恰为 $1 - \beta$（若 $\beta = 1$，则 $p = q$，拒绝永远不会发生）。于是

$$
\Prob(X = x) = \min\big(p(x), q(x)\big) + (1 - \beta)\,\frac{\max\big(0, p(x) - q(x)\big)}{1 - \beta} = \min(p(x), q(x)) + \max(0, p(x) - q(x)) = p(x).
$$

对于序列，对已产生词元的个数作归纳。一次迭代产生的每个词元，或者来自第 $i$ 个位置的接受/拒绝步骤——该处的候选是在已接受词元的条件下从 $q_i$ 中抽出的，由第一部分，它在给定其之前一切时的条件分布就是 $p_i(\cdot\mid\text{之前的一切})$；或者来自奖励步骤，它直接从 $p_{\gamma+1}$ 采样。是否结束本次迭代的决定只依赖于已经产生的词元，而下一次迭代从已产生的前缀出发、带着新的随机性重新开始。因此每个词元在给定其之前全部词元时的条件分布都是 $p(\cdot\mid\text{之前的词元})$，这正是从 $p$ 逐步采样的定义，而前 $n$ 个词元的联合分布是 $\prod_tp(x_t\mid x_{<t})$。
:::

证明对草稿除了“它是一个分布”之外没有任何要求；再糟糕的草稿只拖累速度，不损害正确性。这条规则也是唯一自然的选择：它是 $q$ 与 $p$ 的最大耦合（maximal coupling），在保证 $p$ 的前提下尽可能多地接受。

::: example 手算接受规则 {#ex-rule}
目标模型对三个词元 A、B、C 给出 $p = (0.6, 0.3, 0.1)$，草稿模型给出 $q = (0.3, 0.5, 0.2)$。计算每个候选被接受的概率、总体接受率、残差分布，并验证输出的分布就是 $p$。
::: solution
接受概率 $\min(1, p/q)$：A 为 $\min(1, 2) = 1$，B 为 $0.6$，C 为 $0.5$。被提出且被接受的质量：A $0.3$，B $0.3$，C $0.1$；总和 $\beta = 0.7$。残差为 $\max(0, p - q) = (0.3, 0, 0)$，归一化为 $(1, 0, 0)$：一次拒绝总是给出 A。输出：A $0.3 + 0.3\cdot1 = 0.6$，B $0.3$，C $0.1$——恰好是 $p$。草稿高估了 B 和 C；拒绝把它在这两者上多出的质量，转换成它低估的、A 之上的质量。
:::
:::

当目标贪心解码时，$p$ 是集中在 argmax $x^*$ 上的点质量，规则化简为：当且仅当草稿词元等于 $x^*$ 时接受它，否则输出 $x^*$。于是贪心投机解码返回的恰好是目标的贪心输出——这一特例最早出现在分块并行解码（blockwise parallel decoding，Stern、Shazeer 与 Uszkoreit，2018）中。

## 每趟多少个词元？ {#sec-tokens}

::: proposition 接受率等于一减全变差 {#prop-alpha}
草稿词元被接受的概率 $\beta = \sum_x\min(p(x), q(x))$ 等于 $1 - \operatorname{TV}(p, q)$，其中 $\operatorname{TV}(p, q) = \tfrac12\sum_x\lvert p(x) - q(x)\rvert$。
:::

::: proof
$\min(a, b) = \tfrac12(a + b - \lvert a - b\rvert)$。对 $x$ 求和，$\sum_x\min(p, q) = \tfrac12(1 + 1 - \sum_x\lvert p - q\rvert) = 1 - \operatorname{TV}(p, q)$。
:::

一对草稿-目标的**接受率（acceptance rate）** $\alpha$ 是 $\beta$ 在生成过程中遇到的各上下文上的平均。它取决于任务与采样设置：低温时两个分布都变尖锐，若它们在最大概率词元上一致，$\alpha$ 就接近 $1$；高温时它们的尾部差异更大。

::: proposition 目标模型每趟的期望词元数 {#prop-expected}
若每个草稿词元独立地以概率 $\alpha < 1$ 被接受，则[[#alg-spec]]每次迭代接上的词元数期望为

$$
\E[\text{词元数}] = \sum_{k=0}^{\gamma}\alpha^k = \frac{1 - \alpha^{\gamma+1}}{1 - \alpha}.
$$ {#eq-expected}
:::

::: proof
一次迭代为第一次拒绝之前的每个被接受草稿多接上一个词元，再额外接上一个（拒绝处的残差样本，或一个都没被拒绝时的奖励词元）。设 $A$ 为被接受的草稿数，则迭代接上 $A + 1$ 个词元，其中 $A = \min(G, \gamma)$，$G$ 是在成功概率为 $\alpha$ 的独立试验中第一次失败之前的成功次数。对 $k = 1,\dots,\gamma$，$\Prob(A\ge k) = \alpha^k$（前 $k$ 个草稿全部被接受）。于是 $\E[A] = \sum_{k=1}^\gamma\Prob(A\ge k) = \sum_{k=1}^\gamma\alpha^k$，而由几何级数，$\E[A + 1] = \sum_{k=0}^\gamma\alpha^k = (1 - \alpha^{\gamma+1})/(1 - \alpha)$。
:::

当 $\gamma\to\infty$ 时期望趋于 $1/(1 - \alpha)$：取 $\alpha = 0.8$ 时，无论草稿多长，每趟至多 $5$ 个词元。长草稿收益递减，因为一个草稿词元只有在它之前的每个词元都被接受时才有用。

::: widget plot
f: (1-a^(x+1))/(1-a); 1/(1-a)
x: 0, 16
y: 0, 11
sliders: a=0.8:0.3:0.95:0.01
labels: expected tokens per target pass; limit $1/(1-\alpha)$
caption: 目标模型每趟期望词元数随草稿长度 $\gamma$ 的变化曲线，接受率 $\alpha$ 由滑块控制，来自[[#eq-expected]]。$\gamma = 0$（没有草稿）时每趟产出一个词元。曲线饱和于 $1/(1 - \alpha)$：$\alpha = 0.8$ 时为 $5$ 个词元，$\alpha = 0.9$ 时为 $10$ 个。好的草稿模型比一长串草稿更重要。
:::

## 加速比 {#sec-speedup}

每趟词元数还不等于速度：起草也要花时间。

::: proposition 投机解码的加速比 {#prop-speedup}
设目标的一个解码步耗时 $T$，在一趟目标计算中验证 $\gamma + 1$ 个位置同样耗时 $T$（访存受限情形），一次草稿步耗时 $cT$。在[[#prop-expected]]的假设下，相对于普通解码、期望意义下每单位时间词元数的加速比为

$$
S(\alpha, \gamma, c) = \frac{1 - \alpha^{\gamma+1}}{(1 - \alpha)(\gamma c + 1)}.
$$ {#eq-speedup}
:::

::: proof
一次迭代花费 $\gamma$ 次草稿步和一趟目标计算，共 $(\gamma c + 1)T$，期望产出 $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ 个词元。普通解码每 $T$ 时间产出 $1$ 个词元。二者每单位时间的期望词元数之比即 $S$。（严格地说，这是期望词元数与固定迭代成本之比；在假设下各迭代独立同分布，由更新报酬定理（renewal reward theorem），它就是长期速率。）
:::

::: example 选择草稿长度 {#ex-speedup}
某草稿模型的成本是目标一步的 $c = 0.05$，接受率 $\alpha = 0.8$。计算 $\gamma = 4$ 时的加速比，并找出最优的整数 $\gamma$。如果换成更弱但更便宜的模型、$\alpha = 0.6$ 且 $c = 0.2$，结果如何？
::: solution
$\gamma = 4$：$(1 - 0.8^5)/0.2 = (1 - 0.32768)/0.2 = 3.362$ 个词元每次迭代，成本 $1 + 4\cdot0.05 = 1.2$：$S = 2.80$。对 $\gamma = 1,\dots,12$ 逐一列出[[#eq-speedup]]：$1.71, 2.22, 2.57, 2.80, 2.95, 3.04, 3.08, 3.09, 3.08, 3.05, 3.00, 2.95$，最优为 $\gamma = 8$，$S = 3.09$——仅比 $\gamma = 6$ 好一点点。对 $\alpha = 0.6$、$c = 0.2$：$\gamma = 1, 2, 3$ 给出 $1.33, 1.40, 1.36$，故最优为 $\gamma = 2$，加速比仅 $1.4$。（尽管名叫“便宜”，$c = 0.2$ 并不便宜：速度只有目标五分之一的草稿模型会吃掉大部分收益。）
:::
:::

::: widget plot
f: (1-a^(x+1))/((1-a)*(x*c+1))
x: 0, 16
y: 0, 5
sliders: a=0.8:0.3:0.95:0.01; c=0.05:0.01:0.5:0.01
labels: speed-up $S(\alpha, \gamma, c)$
hlines: 1
caption: 加速比随草稿长度 $\gamma$ 的变化曲线（[[#eq-speedup]]），接受率 $\alpha$ 与相对草稿成本 $c$ 由滑块控制。每条曲线先升后降——当起草时间盖过收益时便开始下落；在 $S = 1$ 线以下，投机解码比朴素解码更慢。最优 $\gamma$ 随 $\alpha$ 增大而增大，随 $c$ 而缩小。
:::

::: example 以 $700$ 亿参数目标模型配 $80$ 亿参数草稿模型 {#ex-70b}
一个 $700$ 亿参数的目标模型以 bfloat16 运行在合计带宽 $6.7$ TB/s 的设备上，因此单个请求的一次解码步约需 $20.9$ ms（[[inference/decoding-sampling]]，习题）。一个同家族的 $80$ 亿参数草稿模型跑在同样的设备上。假设两者都纯粹访存受限，接受率为 $\alpha = 0.75$，验证 $\gamma + 1$ 个位置的开销等于一步目标计算。估计草稿成本比 $c$、最优 $\gamma$ 与最终的每秒词元数。
::: solution
草稿每步读取 $16$ GB，$16\times10^9/6.7\times10^{12} = 2.4$ ms，故 $c = 2.4/20.9 = 0.115$。对 $\gamma = 1,\dots,8$ 计算[[#eq-speedup]]：$1.57, 1.88, 2.03, 2.09, 2.09, 2.05, 2.00, 1.93$，故最优为 $\gamma = 4$（或 $5$），$S\approx2.09$。$\gamma = 4$ 时一次迭代耗时 $20.9(1 + 4\cdot0.115) = 30.5$ ms，产出 $(1 - 0.75^5)/0.25 = 3.05$ 个词元：约每秒 $100$ 个词元，而不是 $48$ 个。比目标小十倍的草稿仍然并不免费：起草占掉每次迭代的三分之一。
:::
:::

验证 $\gamma + 1$ 个位置只相当于一步目标计算——让整个方案成立的关键正是这个假设，而它只在目标访存受限期间成立。在跑大批次的服务器上，解码步逼近计算受限区域（[[inference/batching-serving#ex-roofline]]），此时每个序列为 $\gamma + 1$ 个位置打分要花多达 $\gamma + 1$ 倍的算术量。每个被拒绝的草稿词元就成了本可服务其他请求的浪费算力。因此投机解码对批小、对延迟敏感的服务帮助最大，高负载下的收益必须实测；服务系统通常在批次变大时调小 $\gamma$ 或直接关闭投机。

::: warning “投机解码以质量换速度”
标准算法根本不改变输出分布（[[#thm-exact]]）：糟糕的草稿模型损失的只是速度，绝非质量。只有改动接受规则——比如下文某些接受任何“说得通”的草稿词元的变体——或者通过一趟为多个位置打分带来的浮点效应（与批处理相同的最后一位差异，[[inference/decoding-sampling#sec-determinism]]），质量才可能改变。当某种方法宣称“不损失质量”的加速时，要检查它用的是精确规则还是放宽后的规则。
:::

## 实现 {#sec-code}

下面的清单在一个玩具目标模型——一个定义在 $6$ 个词元上、带随机 logits 的一阶马尔可夫链——上实现了[[#alg-spec]]，草稿模型的 logits 则是目标 logits 的衰减带噪复制。它通过比较前三个生成词元的经验分布与精确的目标概率来检验精确性，测量目标每趟词元数，并在接受率恒定的设定下验证[[#eq-expected]]。

```python
import math, random
V = 6
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
def sample(p, rng):
    u, acc = rng.random(), 0.0
    for i, v in enumerate(p):
        acc += v
        if u < acc: return i
    return len(p) - 1

# 玩具目标模型 p(x_t | x_{t-1})，以及一个更便宜、不完美的草稿 q(x_t | x_{t-1})
g = random.Random(42)
TL = [[g.gauss(0, 1.5) for _ in range(V)] for _ in range(V + 1)]   # 第 V 行 = 文本开头
DL = [[0.6 * t + g.gauss(0, 0.6) for t in row] for row in TL]
def p_target(prev): return softmax(TL[prev])
def q_draft(prev): return softmax(DL[prev])

def speculative_step(prefix, gamma, rng):
    """一次起草-验证迭代（Leviathan 等 2023；Chen 等 2023）。
    返回接上的词元：1 到 gamma + 1 个。"""
    drafts, qs, prev = [], [], prefix[-1]
    for _ in range(gamma):                                   # 1. 自回归地起草 gamma 个词元
        q = q_draft(prev); x = sample(q, rng)
        drafts.append(x); qs.append(q); prev = x
    out, prev = [], prefix[-1]
    for x, q in zip(drafts, qs):                             # 2. 目标为所有位置打分（一趟）
        p = p_target(prev)
        if rng.random() < min(1.0, p[x] / q[x]):             # 3. 以概率 min(1, p/q) 接受
            out.append(x); prev = x
        else:                                                # 4. 拒绝时，从残差分布采样
            r = [max(0.0, a - b) for a, b in zip(p, q)]; s = sum(r)
            out.append(sample([v / s for v in r], rng)); return out
    out.append(sample(p_target(prev), rng))                  # 5. 全部接受：一个奖励词元
    return out

def generate(n_tokens, gamma, rng):
    seq, iters = [V], 0
    while len(seq) - 1 < n_tokens:
        seq += speculative_step(seq, gamma, rng); iters += 1
    return seq[1:n_tokens + 1], iters

# (1) 输出分布等于目标分布：比较前三个词元的联合分布律
exact = {}
for a in range(V):
    for b in range(V):
        for c in range(V):
            exact[(a, b, c)] = p_target(V)[a] * p_target(a)[b] * p_target(b)[c]
rng = random.Random(0); N = 200000; counts = {}
for _ in range(N):
    s, _ = generate(3, 4, rng); counts[tuple(s)] = counts.get(tuple(s), 0) + 1
tv = 0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items())
print(f"TV(empirical speculative, exact target) over {V**3} triples: {tv:.4f}")
rng = random.Random(0); counts_q = {}
for _ in range(N):
    prev, s = V, []
    for _ in range(3): x = sample(q_draft(prev), rng); s.append(x); prev = x
    counts_q[tuple(s)] = counts_q.get(tuple(s), 0) + 1
print(f"TV(draft model alone, exact target):              "
      f"{0.5 * sum(abs(counts_q.get(k, 0) / N - v) for k, v in exact.items()):.4f}")
rng = random.Random(1); counts = {}
for _ in range(N):
    s = [sample(p_target(V), rng)]
    for _ in range(2): s.append(sample(p_target(s[-1]), rng))
    counts[tuple(s)] = counts.get(tuple(s), 0) + 1
print(f"TV(direct target sampling, exact target):         "
      f"{0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items()):.4f}")

# (2) 接受率 = 每个上下文下的 1 - TV(p, q)，以及每次迭代的词元数
alphas = [sum(min(a, b) for a, b in zip(p_target(c), q_draft(c))) for c in range(V + 1)]
print("acceptance rate per context:", " ".join(f"{a:.3f}" for a in alphas))
rng = random.Random(2)
for gamma in (1, 2, 4, 8):
    toks, iters = generate(100000, gamma, rng)
    print(f"gamma={gamma}: {len(toks) / iters:.3f} tokens per target pass")

# (3) 独立同分布接受（与上下文无关的 p 和 q）：验证 E[tokens] = (1 - a^(g+1)) / (1 - a)
p = softmax([2.0, 1.0, 0.5, 0.0, -1.0, -2.0]); q = softmax([1.5, 1.2, 0.3, 0.2, -0.5, -2.5])
a = sum(min(x, y) for x, y in zip(p, q))
def step_iid(gamma, rng):
    for k in range(gamma):
        x = sample(q, rng)
        if rng.random() >= min(1.0, p[x] / q[x]): return k + 1   # k 个被接受 + 1 个残差词元
    return gamma + 1
rng = random.Random(3)
for gamma in (1, 2, 4, 8):
    sim = sum(step_iid(gamma, rng) for _ in range(200000)) / 200000
    print(f"alpha={a:.4f} gamma={gamma}: simulated {sim:.3f}, formula {(1 - a ** (gamma + 1)) / (1 - a):.3f}")
```

Output:

```
TV(empirical speculative, exact target) over 216 triples: 0.0101
TV(draft model alone, exact target):              0.3688
TV(direct target sampling, exact target):         0.0100
acceptance rate per context: 0.836 0.789 0.825 0.599 0.802 0.749 0.817
gamma=1: 1.757 tokens per target pass
gamma=2: 2.333 tokens per target pass
gamma=4: 3.129 tokens per target pass
gamma=8: 3.854 tokens per target pass
alpha=0.8428 gamma=1: simulated 1.842, formula 1.843
alpha=0.8428 gamma=2: simulated 2.553, formula 2.553
alpha=0.8428 gamma=4: simulated 3.650, formula 3.656
alpha=0.8428 gamma=8: simulated 4.994, formula 4.996
```

投机样本的经验分布与精确目标分布的距离（全变差 $0.0101$）与 $200{,}000$ 个*直接*从目标抽出的样本（$0.0100$）不相上下：剩下的只是采样噪声。草稿单独的分布差得很远（$0.37$），但投机解码完全不继承它的偏差。在 $0.60$ 到 $0.84$ 之间随上下文而变的接受率下，四个草稿每趟目标计算产出 $3.13$ 个词元；接受率恒定时，模拟与[[#eq-expected]]在采样误差内吻合。

## 草稿从哪里来 {#sec-drafts}

草稿既要快，又要经常与目标一致。常用的来源有几种。

- **同家族的小模型**，共用分词器：最初的设定。Leviathan 等报告在 T5-XXL 上用 T5-small 作草稿取得 $2$–$3\times$ 的加速，Chen 等则在其实验设定下对一个 $700$ 亿参数的 Chinchilla 模型用 $40$ 亿参数的草稿取得 $2$–$2.5\times$。把草稿朝着目标做蒸馏能提高 $\alpha$（DistillSpec，Zhou 等，2024；[[post-training/distillation]]）。
- **目标模型本身，截短使用。** 用目标的一部分层起草——跳过某些层，或提前退出——不需要第二个模型，还能共享缓存（Draft & Verify，Zhang 等，2024；LayerSkip，Elhoushi 等，2024，后者训练模型使提前退出成为出色的草稿；对照[[inference/model-compression#sec-early-exit]]）。
- **检索与 $n$-gram。** 把最近几个词元在某早先出现位置之后的内容复制过来——来源可以是提示词本身，也可以是数据存储库——就是免费的草稿；当输出重复输入时（编辑代码、引用文档），它们经常是对的。多个开源推理引擎都提供这种“提示词直查”（prompt lookup）起草。

### 改变草稿器或验证器的变体

以下是已发表的变体，各自被其作者在某些特定模型上评估过；它们的区别在于是否精确保留目标分布。

::: definition 草稿头、树验证与前瞻解码 {#def-variants}
- **Medusa**（Cai 等，2024）给目标加上 $K$ 个额外输出头；第 $k$ 个头从当前隐状态预测往后第 $k + 1$ 个位置的词元。把各头的候选组合成一棵后续**树**，用一种注意力掩码在一趟中验证——树中每个候选只注意自己的祖先（**树注意力**，tree attention）。Medusa 提出了一条**典型接受（typical acceptance）**规则，接受目标概率足够高的候选；它更快，但不保持目标分布。换上精确规则就能保持。
- **EAGLE**（Li 等，2024）训练一个小型单层自回归草稿头，从目标的隐特征与已采词元预测目标的下一个*隐特征*，再经目标自己的输出层起草词元；它用[[#alg-spec]]的精确规则（推广到树）验证，因此分布被保持。后续版本根据草稿的置信度动态构建草稿树。
- **词元树验证**（SpecInfer，Miao 等，2024）用接受规则的、保持分布的多候选推广形式，验证来自一个或多个草稿的候选树。
- **前瞻解码（lookahead decoding）**（Fu 等，2024）不需要草稿模型：它运行**雅可比（Jacobi）迭代**——一次猜若干个未来词元、并行地重新预测全部词元、不断重复——收集这些迭代产生的 $n$-gram，并在同一趟中验证匹配的 $n$-gram。其发表形式针对贪心解码，此时它返回的恰是贪心输出。
:::

有些模型从训练之初就带有额外的**多词元预测（multi-token prediction）**头（Gloeckle 等，2024），之后可以拿来当草稿用；DeepSeek-V3 技术报告（2024）描述了这样使用它的多词元预测模块，并报告第二个词元的接受率很高。

::: quiz
某目标在温度 $1$ 下解码，草稿的接受率只有 $0.2$。与普通解码相比，输出的分布和速度会发生什么？
- [ ] 输出更服从草稿而非目标
- [x] 输出服从目标的分布；加速比很小甚至为负
- [ ] 输出是按 $0.2$ 与 $0.8$ 加权的草稿分布与目标分布的混合
- [ ] 算法会失败，因为残差分布没有定义
::: solution
[[#thm-exact]]对任意草稿都成立。$\alpha = 0.2$ 时每趟词元数至多 $1/(1 - 0.2) = 1.25$，再扣掉草稿步的成本，加速比多半低于 $1$（[[#prop-speedup]]）。只有当 $p = q$ 时残差才没有定义，而那时根本不会发生拒绝。
:::
:::

::: example 手算树验证 {#ex-tree}
某贪心目标的下一个词元是 $x^*$。一个草稿为下一个位置提出 $k$ 个互不相同的候选，从其分布中不放回地抽取；设 $x^*$ 的草稿概率为 $0.6$，并比较 $k = 1$ 与 $k = 3$ 的情形（草稿其余的质量摊薄在许多概率极小的词元上）。接着再估计：若候选改为草稿的前 $3$ 个词元，而 $x^*$ 在上下文层面上是草稿第一候选的概率为 $0.6$、是第二候选的概率为 $0.2$、是第三候选的概率为 $0.1$，那么第一个候选正确的概率是多少。
::: solution
单次抽样时，提出 $x^*$ 的概率是 $0.6$。取三个互不相同的样本、且剩余质量摊得很薄时，$x^*$ 名列其中的概率接近三次独立抽取的结果：$1 - 0.4^3 = 0.936$。用前 $3$ 名列表时，$x^*$ 位列候选之中的概率是 $0.6 + 0.2 + 0.1 = 0.9$。树提高了每个位置的接受率，代价是每趟要验证更多位置——只要目标访存受限，这仍然很便宜；各方法的差别在于如何在预算内为这棵树塑形。
:::
:::

::: application 部署系统中的投机解码
截至 2026 年，使用小草稿模型、草稿头或 $n$-gram 直查的投机解码已获各大开源推理引擎支持，并被写进若干模型家族已发表的技术报告。它的收益随工作负载而变：对可预测的文本（代码、结构化输出、翻译、编辑）、低温、小批次时最高；对高负载服务器上的高温创造性采样时最低。它可以与量化（[[inference/quantisation]]）叠加使用——目标模型的一份量化副本本身就是天然的草稿——也可以与[[inference/latency-cost]]的延迟–吞吐权衡叠加使用。
:::

::: history
Stern、Shazeer 与 Uszkoreit（NeurIPS 2018）提出了分块并行解码：用额外的头一次预测多个未来词元，并在贪心解码下保留模型认同的最长前缀。Leviathan、Kalman 与 Matias（Google；arXiv 2022，ICML 2023）以及各自独立完成的 Chen、Borgeaud、Irving、Lespiau、Sifre 与 Jumper（DeepMind，2023）把[[#alg-spec]]的接受规则推广到采样，并证明它保持目标分布；该规则正是最大耦合的拒绝采样方案，概率论中早已熟知。Miao 等人的 SpecInfer（ASPLOS 2024）验证词元树；Cai 等人的 Medusa（ICML 2024）、Li、Wei、Zhang 与 Zhang 的 EAGLE（ICML 2024）以及 Fu、Bailis、Stoica 与 Zhang 的前瞻解码（ICML 2024）则去掉或缩小了独立的草稿模型。
:::

::: summary
- **投机解码**用一个廉价模型起草 $\gamma$ 个词元，并在一趟目标计算中为它们全部打分；只要目标访存受限，这一趟的成本就约等于一个解码步。
- 以概率 $\min(1, p/q)$ 接受草稿词元、否则从 $\propto\max(0, p - q)$ 的残差中采样，得到的**恰好**是目标分布，对任意草稿都成立；贪心解码时得到的恰是贪心输出。
- 接受率为 $1 - \operatorname{TV}(p, q)$；在独立接受下，一趟产出 $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ 个词元，至多 $1/(1 - \alpha)$。
- 加速比 $\frac{1 - \alpha^{\gamma+1}}{(1 - \alpha)(\gamma c + 1)}$ 存在最优的 $\gamma$；大批次下验证不再免费，加速比随之缩小。
- 草稿的来源有小模型、目标自己的浅层、草稿头（Medusa、EAGLE）、$n$-gram 直查或雅可比迭代（前瞻解码）。精确的变体保持分布；放宽的接受规则（如典型接受）不保持。
:::

## 习题

::: exercise 接受率 {level=1 check="0.7"}
$p = (0.6, 0.3, 0.1)$、$q = (0.3, 0.5, 0.2)$ 时，草稿词元被接受的概率是多少？
::: solution
$\sum\min(p, q) = 0.3 + 0.3 + 0.1 = 0.7$。等价地，$\operatorname{TV} = \tfrac12(0.3 + 0.2 + 0.1) = 0.3$，$1 - 0.3 = 0.7$（[[#prop-alpha]]）。
:::
:::

::: exercise 每趟词元数 {level=1 check="2.533"}
接受率 $\alpha = 0.7$、草稿 $\gamma = 3$ 时，一趟目标计算平均产出多少词元？给出三位小数。
::: solution
$(1 - 0.7^4)/(1 - 0.7) = (1 - 0.2401)/0.3 = 2.533$。
:::
:::

::: exercise 一个加速比 {level=1 check="2.801"}
按[[#eq-speedup]]计算 $S(0.8, 4, 0.05)$，保留三位小数。
::: solution
$(1 - 0.8^5)/(0.2\cdot1.2) = 0.67232/0.24 = 2.801$。
:::
:::

::: exercise 最优草稿长度 {level=2 check="8"}
$\alpha = 0.8$、$c = 0.05$ 时，哪个整数 $\gamma$ 使 $S$ 最大？
::: solution
由[[#ex-speedup]]中的表，$\gamma = 7, 8, 9$ 处的 $S(\gamma)$ 为 $3.082, 3.092, 3.078$；最大值在 $\gamma = 8$。曲线在峰值附近很平，所以实践中常选一个更小的 $\gamma$，少在被拒绝的草稿上浪费些工作。
:::
:::

::: exercise 残差分布 {level=2}
$p = (0.5, 0.5)$、$q = (0.9, 0.1)$ 时，计算每个词元的接受概率、残差分布与输出分布。为什么残差把全部质量放在第二个词元上？
::: solution
第一个词元以概率 $\min(1, 0.5/0.9) = 0.556$ 被接受，第二个总是被接受。被提出且被接受的质量：$0.9\cdot0.556 = 0.5$ 与 $0.1$；$\beta = 0.6$。残差 $\max(0, p - q) = (0, 0.4)$，归一化为 $(0, 1)$。输出：第一个 $0.5$，第二个 $0.1 + 0.4\cdot1 = 0.5$，即 $p$。草稿高估了第一个词元，所以它的拒绝全部来自对第一个词元的提议，而要补回的质量恰好全在草稿低估的那个词元上。
:::
:::

::: exercise 贪心投机是精确的 {level=2}
证明当目标为贪心（$p$ 是集中在目标 logits 的 $\arg\max$ $x^*$ 上的点质量）时，[[#alg-spec]]输出的恰是目标的贪心序列，无论草稿是什么（包括贪心草稿，此时 $q$ 也是点质量）。
::: solution
$p = \delta_{x^*}$ 时，任何 $\tilde x\ne x^*$ 的草稿词元满足 $p(\tilde x) = 0$，以概率 $1$ 被拒绝；残差为 $\max(0, \delta_{x^*} - q)\propto\delta_{x^*}$，所以替换词元就是 $x^*$。等于 $x^*$ 的草稿词元满足 $p/q = 1/q(x^*)\ge1$，以概率 $1$ 被接受。奖励词元从集中在目标 argmax 上的点质量中采样。于是每个接上的词元都是在给定前文时目标的 argmax——也就是贪心序列。贪心草稿只是一个点质量 $q$；上述论证并不使用 $q$ 的形式。
:::
:::

::: exercise 长草稿的极限 {level=2}
证明固定 $c > 0$ 时，$\gamma\to\infty$ 则 $S(\alpha, \gamma, c)\to0$；而 $c = 0$ 时它递增趋于 $1/(1 - \alpha)$。解释这两个极限。
::: solution
分子 $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ 以 $1/(1 - \alpha)$ 为上界，而 $c > 0$ 时分母 $\gamma c + 1\to\infty$；故 $S\to0$：越来越长的草稿不断消耗时间，添上的却越来越少（每个额外的草稿词元只有在更早的词元全部被接受时才有用）。$c = 0$ 时 $S = \sum_{k=0}^\gamma\alpha^k$，关于 $\gamma$ 递增，极限为 $1/(1 - \alpha)$：即使草稿免费，也快不过接受连串（run）的平均长度。
:::
:::

::: exercise 大批次下的投机 {level=3}
设某服务器的解码步计算受限，即每个序列为 $\gamma + 1$ 个位置打分要花 $\gamma + 1$ 个正常步，且每个草稿词元的成本相对正常目标步为 $c$。推导加速比，并证明只要 $c\ge0$ 且 $\alpha < 1$，它对一切 $\gamma\ge1$ 都低于 $1$。
::: solution
一次迭代花费 $(\gamma + 1 + \gamma c)$ 个正常步，产出 $\sum_{k=0}^\gamma\alpha^k$ 个词元，故 $S = \sum_{k=0}^\gamma\alpha^k/(\gamma + 1 + \gamma c)$。由于 $\alpha^k\le1$ 且对 $k\ge1$ 严格小于，$\sum_{k=0}^\gamma\alpha^k < \gamma + 1\le\gamma + 1 + \gamma c$，于是 $S < 1$。在计算受限区域，每个被拒绝的位置都是从其他请求手里抢走的算术量，投机只能亏掉吞吐——尽管它仍可能以牺牲他人为代价压低单个请求的延迟。真实的服务器介于两种区域之间，这就是收益必须实测、$\gamma$ 要随负载调节的原因。
:::
:::

::: exercise 有损的接受规则 {level=3}
把 `speculative_step` 中的接受检验改为：“草稿词元的目标概率不小于 $\varepsilon = 0.1$ 就接受；否则从目标 $p$ 采样替换词元”——一条与典型接受精神相同的规则。用 $200{,}000$ 个带种子的样本、$\gamma = 4$，测量前两个生成词元的分布与精确目标分布之间的全变差。
::: solution
```python
def lossy_step(prefix, gamma, rng, eps=0.1):
    """有损规则：只要草稿词元的目标概率 >= eps 就接受。"""
    out, prev = [], prefix[-1]
    for _ in range(gamma):
        x = sample(q_draft(prev), rng)
        if p_target(prev)[x] >= eps: out.append(x); prev = x
        else: out.append(sample(p_target(prev), rng)); return out
    out.append(sample(p_target(prev), rng)); return out
exact = {}
for a in range(V):
    for b in range(V):
        exact[(a, b)] = p_target(V)[a] * p_target(a)[b]
rng = random.Random(0); N = 200000; counts = {}; iters = 0
for _ in range(N):
    seq = [V]
    while len(seq) < 3: seq += lossy_step(seq, 4, rng); iters += 1
    k = tuple(seq[1:3]); counts[k] = counts.get(k, 0) + 1
print(f"lossy acceptance: TV over pairs {0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items()):.4f}")
```

在本章清单的定义之后运行时，它打印

```
lossy acceptance: TV over pairs 0.1921
```

而精确规则只有约 $0.01$（采样噪声）。放宽后的规则会接受每个看上去合理的草稿词元，于是输出继承了草稿在这些合理词元之间的偏好：它更快（接受得更多），但采样出的是另一个分布，更接近草稿的分布。这是否有影响取决于应用——聊天中或可接受，评测中则不行，因为评测结果将不再描述目标模型。
:::
:::

::: exercise 独立抽出的候选 {level=3 check="0.936"}
某贪心目标的下一个词元草稿概率为 $0.6$。若验证器检查 $3$ 个从草稿中*独立*（有放回）抽出的候选，至少有一个等于目标词元的概率是多少？实际树方法为什么改用互不相同的候选？
::: solution
$1 - (1 - 0.6)^3 = 1 - 0.064 = 0.936$。独立抽取经常重复同一个词元（这里是概率最大的那个），把验证槽位浪费在重复上；抽取互不相同的候选，或取草稿的前几名词元（参见[[#ex-tree]]），能在同样的槽位数下覆盖草稿更多的质量。对采样（而非贪心）的目标，用多个候选保持分布需要一条多候选接受规则，如 SpecInfer 的规则，而不是简单地接受匹配的那个候选。
:::
:::
