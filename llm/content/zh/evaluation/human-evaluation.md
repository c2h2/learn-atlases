我们对语言模型的许多期待——有用的解释、写得好的故事、可靠的建议、安全的拒绝——都没有标准答案。这类输出的最终裁决是人，而**人类评测**（human evaluation）正是自动指标与大模型评审据以校准的参照。它同时也昂贵、缓慢而嘈杂：人们彼此之间有分歧，换一天会与自己有分歧，若更仔细地核查也会与自己原本的结论有分歧。从人类判断中得出有用的数字，本身就是一个测量问题，在心理测量学与棋手段位评定中都有悠久的历史。

本章先讲人类评测的设计——该问什么、用什么量表、为什么**成对偏好**（pairwise preference）通常胜过绝对评分——再讲如何度量评定者是否一致，推导 **Cohen's κ** 并与 **Krippendorff's α** 一起计算出来。随后用 **Bradley–Terry** 模型把偏好化为评分，把 **Elo** 更新推导为在其似然上的一步随机梯度，用纯 Python 拟合两者并附上**自助法**置信区间，最后审视规模最大的公开语言模型人类评测 **Chatbot Arena**（Chiang 等，2024）：它如何运作、其背后的统计选择、以及它受到的批评与其组织者的回应。[[post-training/reward-models]] 的奖励模型用的正是同一套机制；这里的焦点是测量。

## 设计一次人类评测 {#sec-design}

::: definition 人类评测的协议 {#def-protocols}
人类评测向评定者呈现模型输出并记录一个判断。主要协议有：

- **绝对评分**：单独给每个输出在量表上打分——**李克特（Likert）量表**（例如 $1$ 到 $5$ 或 $1$ 到 $7$，各点标上从"很差"到"优秀"的标签），或一个二元判断（"它正确吗？"、"它遵循指令吗？"）；
- **成对偏好**：同一提示的两个输出并排呈现、次序随机，评定者选出更好的一个，可允许平局或带程度的偏好（"A 好得多" … "B 好得多"）；
- **排序**：给 $k > 2$ 个输出排出次序，这等价于 $\binom{k}{2}$ 个成对偏好；
- **错误标注**：评定者对照一套分类法标出具体错误（事实性错误、无依据的断言、有害内容），得到的是计数而非总体分数。

协议还规定评定者是谁（领域专家、受训标注者、众包工作者、最终用户）、**评分细则**（rubric）或指南、评定者能否看到模型的身份、以及每个条目由多少评定者评判。
:::

绝对评分易于收集、易于平均，却受制于**量表使用差异**：一个评定者的"4"是另一个的"3"，评定者在一个标注批次里会逐渐漂移，而最先看到的输出会锚定之后的分数。成对比较能消去其中大半，因为一个一贯严苛或宽松的评定者，对两个输出同样严苛或宽松。

::: proposition 成对判断消去评定者的偏移 {#prop-offset}
设评定者 $r$ 对输出 $y$ 的感知为 $u_r(y) = q(y) + b_r + \varepsilon$，其中 $q$ 是输出的质量，$b_r$ 是评定者特有的偏移，$\varepsilon$ 是服从某固定连续分布的独立噪声；又设绝对评分报告的是 $u_r(y)$，成对判断报告的是两个输出中谁的 $u_r$ 更大。则评定者 $r$ 偏好 $y_1$ 胜过 $y_2$ 的概率只取决于 $q(y_1) - q(y_2)$，而不取决于 $b_r$；而一个输出的平均绝对评分，则取决于恰好由哪些评定者给它打了分。
:::

::: proof
$u_r(y_1) - u_r(y_2) = q(y_1) - q(y_2) + (\varepsilon_1 - \varepsilon_2)$：偏移消去，且 $\varepsilon_1 - \varepsilon_2$ 的分布对所有评定者相同。绝对评分的均值是 $q(y) + \bar b + \bar\varepsilon$，其中 $\bar b$ 是被指派给 $y$ 的评定者的平均偏移；除非每个输出都由同一批评定者打分，它在不同输出之间是不同的。
:::

真实的量表使用不是常数平移——有的评定者用满整个量表，有的只用中间一段——但其中的道理是普遍的。成对偏好也更贴近通常真正要作的决定（"我们该用哪个模型？"），也是 RLHF 大多数偏好数据的格式。其代价是：它们不提供关于绝对质量的信息（两个都差的回答也能比出高下）；比较对数随系统数二次增长；而平局与近乎平局几乎不含信息。

好的协议设计由此前各章直接推出：在评分细则里定义构念（[[evaluation/evaluation-principles#def-validity]]）；随机化输出的呈现次序；隐藏模型身份；给评定者与任务相称的时间与资源（核查一条事实性断言比判断流畅性花得久）；加入**注意检查**（attention check）与已知答案的条目；并在一个子集上为每个条目收集多个判断，以度量一致性。

## 评定者之间的一致性 {#sec-agreement}

如果两名评定者评判同样的条目时经常分歧，那么单个评定者的判断就是嘈杂的测量，任何据其而作的模型比较都会继承这份噪声。一致性是人类评测的信度。最简单的度量——评定者一致的条目占比——本身会有误导，因为有些一致纯属偶然。

::: definition Cohen's κ {#def-kappa}
两名评定者把 $n$ 个条目中的每一个归入类别 $1, \dots, C$ 之一。记 $p_o$ 为他们一致的条目占比，$p_{A,c}$ 与 $p_{B,c}$ 为评定者 $A$、$B$ 归入类别 $c$ 的条目占比。**Cohen's κ**（Cohen，1960）为

$$
\kappa = \frac{p_o - p_e}{1 - p_e},\qquad p_e = \sum_{c=1}^Cp_{A,c}\,p_{B,c}.
$$ {#eq-kappa}
:::

::: proposition κ 度量什么 {#prop-kappa}
1. $p_e$ 是两名评定者的期望一致率：他们以观测到的边缘频率分配类别，且分配与彼此无关、与条目无关。
2. $\kappa$ 是相对随机的可能改进中已实现的比例：当且仅当两名评定者在每个条目上都一致时 $\kappa = 1$；观测一致率等于随机一致率时 $\kappa = 0$；两人比随机还更不一致时 $\kappa < 0$。
3. 给定边缘分布时，$\kappa$ 是 $p_o$ 的递增线性函数。
:::

::: proof
（1）若评定者 $A$ 以概率 $p_{A,c}$ 选类别 $c$、评定者 $B$ 独立地以 $p_{B,c}$ 选择，则两人在 $c$ 上一致的概率是 $p_{A,c}p_{B,c}$，在某个类别上一致的概率是 $\sum_cp_{A,c}p_{B,c} = p_e$。（2）可能的最大一致率是 $1$，故相对随机的可能改进是 $1 - p_e$，已实现的改进是 $p_o - p_e$；两者之比即 $\kappa$。它恰在 $p_o = 1$ 时等于 $1$（只要 $p_e < 1$），在 $p_o = p_e$ 时等于 $0$，在 $p_o < p_e$ 时为负。（3）$p_e$ 由边缘分布固定时，$\kappa = p_o/(1 - p_e) - p_e/(1 - p_e)$ 是 $p_o$ 的斜率为正的线性函数。
:::

::: example 从一张表算 κ {#ex-kappa}
两名标注者把 $100$ 个回复判为"好"或"差"。两人同判好的有 $45$ 个，同判差的有 $40$ 个；$A$ 判好而 $B$ 判差的有 $10$ 个，反之有 $5$ 个。计算 $p_o$、$p_e$ 与 κ。
::: solution
$p_o = (45 + 40)/100 = 0.85$。$A$ 判好的占 $55\%$，$B$ 占 $50\%$，故 $p_e = 0.55\cdot0.50 + 0.45\cdot0.50 = 0.5$。于是 $\kappa = (0.85 - 0.5)/(1 - 0.5) = 0.7$：评定者实现了相对随机可能改进的 $70\%$。
:::
:::

κ 依赖于边缘分布，其程度有时出人意料。当一个类别占绝对多数时，随机一致率很高，即便在多数条目上都一致的评定者也可能 κ 接近零——这就是 **κ 悖论**（Feinstein 与 Cicchetti，1990）。

::: example κ 悖论 {#ex-paradox}
两名评定者把 $100$ 个回复标为安全或不安全。每人标 $95$ 个为安全；两人在 $90$ 个回复上判断相同，而每人各自把 $5$ 个对方标为安全的回复标为不安全，于是他们在不安全回复上从不一致。计算 $p_o$ 与 κ。
::: solution
$p_o = 0.90$。$p_e = 0.95^2 + 0.05^2 = 0.905$。$\kappa = (0.90 - 0.905)/(1 - 0.905) = -0.053$。百分之九十的一致率，却在要紧的那个类别上比随机还差：评定者从未在**一个**不安全回复上达成一致。κ 不为所动是对的；教训是：类别稀有时要按类别报告一致性（或在平衡样本上报告），绝不要只报 $p_o$。
:::
:::

::: widget plot
f: (x - e)/(1 - e)
x: 0, 1
y: -1, 1
sliders: e=0.5:0:0.95:0.01
hlines: 0
labels: Cohen 的 $\kappa$ 随观测一致率 $p_o$
caption: κ 作为观测一致率的函数，随机一致率 $p_e$ 由滑块 $e$ 调节。平衡的二元类别（$p_e = 0.5$）下，$80\%$ 的一致给出 $\kappa = 0.6$；偏斜的类别（$p_e = 0.9$）下，同样的 $80\%$ 比随机还差。
:::

Cohen's κ 只适用于恰好两名对每个条目都打了分的评定者、且类别是名义的情形。**Krippendorff's α**（Krippendorff，1970；2004）通过选取取值之间的一种距离，把它推广到任意评定者人数、缺失评分与有序或间距量表。

::: definition Krippendorff's α（名义） {#def-alpha}
对每个由 $m_u\ge2$ 名评定者打分的条目（单元）$u$，由不同评定者给出的每个有序评分对 $(c, k)$ 向**巧合矩阵**（coincidence matrix）$o_{ck}$ 贡献 $1/(m_u - 1)$。令 $n_c = \sum_ko_{ck}$，$n = \sum_cn_c$（可配对的评分数）。则

$$
\alpha = 1 - \frac{D_o}{D_e},\qquad D_o = \frac1n\sum_{c\ne k}o_{ck},\qquad D_e = \frac{1}{n(n - 1)}\sum_{c\ne k}n_cn_k,
$$ {#eq-alpha}

即观测分歧，相对于把全部 $n$ 个评分随机配对时期望的分歧。对有序或间距数据，把指示量 $c\ne k$ 换成平方距离 $\delta^2_{ck}$。
:::

与 κ 一样，α 在完全一致时为 $1$、纯随机时为 $0$；与 κ 不同，它把双方评定者的边缘分布合并成一个期望分布，且分母里的 $n - 1$ 使它在小样本下略不那么乐观。Krippendorff 建议只依赖 $\alpha\ge0.8$ 的数据，对 $0.667\le\alpha < 0.8$ 只下试探性结论；常被引用的 κ 的分档（"$0.61$–$0.80$ 为'相当一致'"，Landis 与 Koch，1977）只是惯例，不是推导出的阈值。

```python
from collections import Counter
from itertools import permutations

# 三名标注者给 12 个回复评 "good" / "ok" / "bad"；None = 未评
ratings = {
    "A": ["good", "good", "ok", "bad", "good", "ok", "bad", "good", "ok", "good", "bad", "ok"],
    "B": ["good", "ok",   "ok", "bad", "good", "good", "bad", "good", "bad", "good", "bad", "ok"],
    "C": ["good", "good", "ok", "ok",  None,   "ok", "bad", "good", "ok", None,   "bad", "good"],
}

def cohen_kappa(x, y):
    pairs = [(a, b) for a, b in zip(x, y) if a is not None and b is not None]
    n = len(pairs)
    p_o = sum(a == b for a, b in pairs) / n                         # 观测一致率
    mx, my = Counter(a for a, _ in pairs), Counter(b for _, b in pairs)
    p_e = sum(mx[c] * my[c] for c in mx) / n ** 2                   # 随机一致率
    return p_o, p_e, (p_o - p_e) / (1 - p_e)

def krippendorff_alpha_nominal(table):
    """table: list of raters, each a list of values (None = missing) over the same units."""
    o = Counter()                                                   # 巧合矩阵
    for unit in zip(*table):
        vals = [v for v in unit if v is not None]
        m = len(vals)
        if m < 2:
            continue                                                # 不可配对的单元
        for i, j in permutations(range(m), 2):
            o[(vals[i], vals[j])] += 1 / (m - 1)
    n_c = Counter()
    for (c, k), w in o.items():
        n_c[c] += w
    n = sum(n_c.values())
    d_o = sum(w for (c, k), w in o.items() if c != k)               # 观测分歧
    d_e = sum(n_c[c] * n_c[k] for c in n_c for k in n_c if c != k) / (n - 1)
    return 1 - d_o / d_e

p_o, p_e, k = cohen_kappa(ratings["A"], ratings["B"])
print(f"A vs B: observed agreement {p_o:.3f}, chance {p_e:.3f}, Cohen's kappa {k:.3f}")
for r1, r2 in [("A", "C"), ("B", "C")]:
    print(f"{r1} vs {r2}: Cohen's kappa {cohen_kappa(ratings[r1], ratings[r2])[2]:.3f}")
print(f"Krippendorff's alpha (A, B): {krippendorff_alpha_nominal([ratings['A'], ratings['B']]):.3f}")
print(f"Krippendorff's alpha (all three, with missing): "
      f"{krippendorff_alpha_nominal(list(ratings.values())):.3f}")
```

```text
A vs B: observed agreement 0.750, chance 0.340, Cohen's kappa 0.621
A vs C: Cohen's kappa 0.697
B vs C: Cohen's kappa 0.265
Krippendorff's alpha (A, B): 0.635
Krippendorff's alpha (all three, with missing): 0.565
```

两个一致性度量在同一对评定者上很接近（$0.621$ 与 $0.635$）。逐对的 κ 显示评定者 B 与 C 的分歧远大于 A 与 C 的分歧，而 $0.565$ 的总体 α 把这一点藏了起来；逐对查看正是揪出误解了指南的评定者的办法。对语言模型的输出，中等一致性是常态：Ouyang 等（2022）报告其受训标注者在 InstructGPT 的成对比较上彼此一致约 $73\%$。这些分歧有些是噪声，有些则是偏好真实的多样性——人们对简洁、谨慎或详尽的看重程度各不相同——而把它平均掉，本身就是关于谁的偏好算数的一种选择（[[llm-society/bias-fairness]]）。

## 从偏好到评分 {#sec-bt}

对多个模型做一次成对评测，产出的是一张**对战**清单：模型 $i$ 对模型 $j$ 在某个提示上，以及谁赢了。要给模型排名，需要一个强度如何产生结果的模型。

::: definition Bradley–Terry 模型 {#def-bt}
每个模型 $i$ 有一个**强度** $\theta_i\in\R$，在 $i$ 与 $j$ 的一次比较中，

$$
\Prob(i\succ j) = \sigma(\theta_i - \theta_j) = \frac{1}{1 + e^{-(\theta_i - \theta_j)}},
$$ {#eq-bt}

且各次比较相互独立（Bradley 与 Terry，1952；Zermelo，1929）。可识别的只有差，故要施加一个诸如 $\sum_i\theta_i = 0$ 的约束。评分常以 **Elo 刻度** $R_i = R_0 + \frac{400}{\ln10}\theta_i$ 报告，其上相差 $400$ 分意味着 $10$ 比 $1$ 的胜算：$\Prob(i\succ j) = 1/(1 + 10^{-(R_i - R_j)/400})$。
:::

::: proposition Bradley–Terry 的似然 {#prop-bt-likelihood}
给定一组对战，其中 $i$ 胜 $j$ 的场数为 $w_{ij}$、两者相互比较的场数为 $n_{ij} = w_{ij} + w_{ji}$，对数似然

$$
\ell(\theta) = \sum_{i\ne j}w_{ij}\log\sigma(\theta_i - \theta_j)
$$

是凹的，其梯度为 $\partial\ell/\partial\theta_i = W_i - \sum_{j\ne i}n_{ij}\sigma(\theta_i - \theta_j)$，其中 $W_i$ 是 $i$ 的总胜场数。在极大值处，每个模型的期望胜场数等于其实际胜场数。若比较图连通，则极大值点在平移意义下唯一；且它存在（有限）当且仅当：把模型分成任意两个非空组，每组都有模型击败过另一组中的某个模型。
:::

::: proof
$\log\sigma(z)$ 的二阶导数是 $-\sigma(z)(1 - \sigma(z)) < 0$，故它是凹函数，而 $\theta$ 的线性函数的凹函数之和是凹的。求导：$\frac{d}{dz}\log\sigma(z) = 1 - \sigma(z)$；收集含 $\theta_i$ 的项（作为胜者取正号，作为败者取负号）得 $\sum_jw_{ij}(1 - \sigma(\theta_i - \theta_j)) - \sum_jw_{ji}\sigma(\theta_j - \theta_i)$，利用 $1 - \sigma(\theta_j - \theta_i) = \sigma(\theta_i - \theta_j)$ 即得 $W_i - \sum_jn_{ij}\sigma(\theta_i - \theta_j)$。令其为零便得到力矩条件。沿平移以外的任何方向，图的连通性使黑塞矩阵负定，这就给出唯一性。若某个组没有击败过组外的任何模型，则把其余各组的强度无上地增大就会增大 $\ell$，故不存在有限的极大值点；反之即 Zermelo（1929）与 Ford（1957）的定理。
:::

最大似然强度可用牛顿法算出；可用逻辑回归算（每场对战是一个数据点，特征在胜者对应的列取 $+1$、在败者对应的列取 $-1$）；也可用 Zermelo 的 **MM 算法**：以 $p_i = e^{\theta_i}$ 迭代 $p_i\leftarrow W_i\big/\sum_{j\ne i}n_{ij}/(p_i + p_j)$，且每一步都增大似然（Hunter，2004）。

### Elo 作为随机梯度上升 {#sec-elo}

**Elo** 系统（Elo，1978）用于棋手段位评定，它在每场比赛之后更新评分，而不是一次拟合全部。

::: definition Elo 更新 {#def-elo}
评分为 $R_i$ 与 $R_j$ 的两名选手赛前，$i$ 的期望得分是 $E_i = 1/(1 + 10^{(R_j - R_i)/400})$。赛后，结果 $S_i$ 胜取 $1$、和取 $\frac12$、负取 $0$，按

$$
R_i\leftarrow R_i + K(S_i - E_i),\qquad R_j\leftarrow R_j - K(S_i - E_i),
$$

更新，其中 **K 因子**（K-factor）$K$ 固定。
:::

::: proposition Elo 是对 Bradley–Terry 似然的 SGD {#prop-elo-sgd}
对一场分出胜负的比赛，Elo 更新正是在强度 $\theta = \frac{\ln10}{400}R$ 上、对该场比赛的 Bradley–Terry 对数似然作的一步随机梯度上升，学习率为 $\eta = K\ln10/400$。
:::

::: proof
$i$ 取胜的比赛的对数似然是 $\log\sigma(\theta_i - \theta_j)$，它在 $\theta_i$ 上的梯度是 $1 - \sigma(\theta_i - \theta_j)$，在 $\theta_j$ 上是其相反数。由 $\theta = \frac{\ln10}{400}R$，$\sigma(\theta_i - \theta_j) = 1/(1 + e^{-\ln10\,(R_i - R_j)/400}) = 1/(1 + 10^{(R_j - R_i)/400}) = E_i$。梯度步 $\theta_i\leftarrow\theta_i + \eta(1 - E_i)$ 换成 Elo 单位即 $R_i\leftarrow R_i + \frac{400}{\ln10}\eta(1 - E_i) = R_i + K(1 - E_i)$，正是 $S_i = 1$ 的 Elo 更新；$\theta_j$ 反向移动同样的量。$i$ 落败的情形同理，交换 $i$ 与 $j$ 即可。
:::

这条命题解释了 Elo 的行为。与任何固定学习率的 SGD 一样，它永不停歇：评分随最近的结果波动，波动幅度随 $K$ 增大。它还依赖比赛的**次序**——这对强度随时间变化的棋手是对的，对强度不变的固定模型检查点则是错的。对静态的一组模型，完整的最大似然拟合对称地用尽全部信息。

::: example 手工算一次 Elo 更新 {#ex-elo}
评分 $1500$ 的模型 A 击败了评分 $1600$ 的模型 B，$K = 32$。新的评分各是多少？Bradley–Terry 模型会认为 B 胜 A 的概率是多少？
::: solution
$E_A = 1/(1 + 10^{100/400}) = 1/(1 + 1.778) = 0.360$。A 涨 $32(1 - 0.360) = 20.5$ 分至 $1520.5$，B 跌到 $1579.5$。赛前 $\Prob(\text{B}\succ\text{A}) = 1 - 0.360 = 0.640$：$100$ 分的差距对应 $10^{1/4} = 1.78$ 比 $1$ 的胜算。
:::
:::

::: widget plot
f: 1/(1 + 10^(-x/400)); 1/(1 + 10^(-x/s))
x: -800, 800
y: 0, 1
sliders: s=400:100:800:10
hlines: 0.5
labels: Elo 刻度，胜算每乘 $10$ 对应 $400$ 分；另一刻度 $s$
caption: [[#def-bt]]在 Elo 刻度下的胜率随评分差的变化。相差 $100$ 分给出 $64\%$，$200$ 分给出 $76\%$，$400$ 分给出 $91\%$。刻度常数只是惯例：把所有评分同乘一个因子并相应改变 $s$，每个预测概率都不变。
:::

### 拟合带不确定度的评分 {#sec-fit}

下面的清单模拟五个已知强度的模型之间的 $3{,}000$ 场对战，用 MM 算法拟合 Bradley–Terry，通过有放回地重抽对战并重新拟合来附上**自助法**置信区间，并把结果与按两种不同次序运行的在线 Elo 作比较。

```python
import math, random

rng = random.Random(5)
models = ["m1", "m2", "m3", "m4", "m5"]
true = {"m1": 1.0, "m2": 0.6, "m3": 0.5, "m4": 0.0, "m5": -0.4}   # 真实强度（对数几率刻度）

# 模拟随机配对之间的 3000 场对战；平局在此被略去
battles = []
for _ in range(3000):
    i, j = rng.sample(models, 2)
    p = 1 / (1 + math.exp(-(true[i] - true[j])))
    battles.append((i, j) if rng.random() < p else (j, i))      # （胜者，败者）

def fit_bt(battles, iters=200):
    """Bradley-Terry MLE by the MM algorithm (Zermelo 1929; Hunter 2004).
    Returns log-strengths theta, centred to mean zero."""
    wins = {m: 0 for m in models}
    n = {(a, b): 0 for a in models for b in models}
    for w, l in battles:
        wins[w] += 1
        n[(w, l)] += 1
        n[(l, w)] += 1
    p = {m: 1.0 for m in models}
    for _ in range(iters):
        p = {i: wins[i] / sum(n[(i, j)] / (p[i] + p[j]) for j in models if j != i) for i in models}
        g = math.exp(sum(math.log(v) for v in p.values()) / len(p))   # 固定刻度
        p = {m: v / g for m, v in p.items()}
    return {m: math.log(v) for m, v in p.items()}

def elo_scale(theta, base=1000):
    return {m: base + 400 / math.log(10) * t for m, t in theta.items()}

def online_elo(battles, k=4, base=1000):
    r = {m: base for m in models}
    for w, l in battles:
        e = 1 / (1 + 10 ** ((r[l] - r[w]) / 400))               # 胜者的期望得分
        r[w] += k * (1 - e)
        r[l] -= k * (1 - e)
    return r

theta = fit_bt(battles)
elo = elo_scale(theta)
online = online_elo(battles)
reverse = online_elo(battles[::-1])                          # 同样的对战，相反的次序
# 自助法：有放回地重抽对战、重新拟合，取 2.5% 与 97.5% 分位数
boots = {m: [] for m in models}
for _ in range(200):
    sample = [battles[rng.randrange(len(battles))] for _ in battles]
    for m, v in elo_scale(fit_bt(sample, iters=100)).items():
        boots[m].append(v)
print("model  true(Elo)  BT fit   95% bootstrap CI    online Elo  (reversed)")
for m in models:
    lo, hi = sorted(boots[m])[4], sorted(boots[m])[194]
    t = 1000 + 400 / math.log(10) * (true[m] - sum(true.values()) / 5)
    print(f"{m:5s} {t:9.1f} {elo[m]:8.1f}   [{lo:7.1f}, {hi:7.1f}]   {online[m]:8.1f}  {reverse[m]:8.1f}")
```

```text
model  true(Elo)  BT fit   95% bootstrap CI    online Elo  (reversed)
m1       1114.7   1102.6   [ 1084.5,  1119.6]     1119.0    1073.1
m2       1045.2   1048.9   [ 1035.0,  1063.5]     1050.2    1046.0
m3       1027.8   1029.4   [ 1014.7,  1045.1]     1034.8    1024.4
m4        940.9    946.4   [  925.9,   963.2]      933.4     941.1
m5        871.4    872.7   [  858.4,   892.9]      862.6     915.4
```

最大似然拟合在各自的区间内找回了每一个真评分，而这些区间——每模型约 $1{,}200$ 场对战时约 $\pm15$ 到 $\pm20$ 分——对中间两个模型有重叠，它们的真评分只差 $17$ 分：这批数据确立不了它们的次序。在线 Elo 对同样的对战换个次序就给出不同的答案，对最高与最低的模型相差约 $50$ 分，因为 $K$ 小时它仍在从初值漂移，而 $K$ 大时它又会变成波动。自助法把每场对战当作独立的抽取；当许多对战共享提示或共享投票者时，改为按这些簇重抽能得到更诚实的区间（[[evaluation/evaluation-statistics]]）。

::: quiz
某排行榜显示模型 X 为 $1205$（$95\%$ 区间 $1195$–$1215$）、模型 Y 为 $1198$（$1188$–$1208$），两者都在同一批对战上以 Bradley–Terry 拟合。哪些结论是站得住的？
- [ ] X 优于 Y
- [x] 数据与 X、Y 被同等偏好相容
- [x] 若评分属实，X 将在约 $51\%$ 的比较中被偏好于 Y
- [ ] 更多投票到来时 Y 会反超 X
::: solution
区间大幅重叠，而 $7$ 分的差距对应 $\Prob(\text{X}\succ\text{Y}) = 1/(1 + 10^{-7/400}) = 0.510$：即便为真，差异也微乎其微。边缘区间重叠本身并不证明差异不显著（正确的检验要用**差值**的区间——自助法同样给得出），但这里没有任何东西支持把 X 排在 Y 之上。也没有任何东西能预言未来变动的方向。
:::
:::

## Chatbot Arena {#sec-arena}

**Chatbot Arena**（Chiang 等，2024）由 LMSYS 与加州大学伯克利分校的研究者于 2023 年创办，后来以 LMArena 的名义运营，把这套机制用到了大规模上。来访者写任意提示；平台选出的两个匿名模型并排作答；来访者给某个模型投票、投平局、或投"都很差"，随后模型身份揭晓（模型在回答里自曝身份之后投出的票会被丢弃）。论文成文时，平台已在一百多种语言中收集了超过 $240{,}000$ 张投票，此后更是收集了数百万张。

论文的统计选择正是本章的那些。评分是 Bradley–Terry 最大似然估计、以 Elo 刻度报告——排行榜最初用在线 Elo，后来改用完整拟合，正是因为[[#prop-elo-sgd]]的次序依赖让评分不稳定——置信区间则来自自助法与稳健（'三明治'）标准误。模型对按自适应方式采样，以比均匀采样更快地降低排名的不确定度。为验证众包的质量，作者把众包投票与专家投票在样本上作了比较，发现一致性可观却并不完美；又用主题模型说明用户的提示是多样的。由于所有比较都是成对的、所有提示都是用户新写的，Arena 对[[evaluation/contamination]]的污染有抵抗力，而且它测到了任何静态基准都测不到的东西：庞大的用户群体在他们真正写出的提示上偏好什么。

它所测的东西也正是它的主要局限。Arena 的投票者是自选的；其提示偏向这类来访者所问的内容（大量编程问题、许多简短问题）；一张投票反映的是几秒钟的阅读，而不是核查。于是偏好奖励的不只是实质，还有风格——长度、排版、自信、友好。组织者引入了**风格控制**（style control，2024）：在 Bradley–Terry 逻辑回归中加入协变量，它们是回复长度之差、以及 markdown 标题、列表与加粗使用之差，于是模型的评分估计的是**同等风格下**的强度；有些模型的评分在控制风格后变化明显。他们还按类别报告评分（编程、数学、难提示、各语言），因为一个总评分是在极不相同的任务上取的均值。

### 批评与回应 {#sec-critiques}

Arena 成为被广泛引用的排名之后，其方法论受到了审视。最详尽的批评是若干工业界与学术界研究者发表的**《排行榜幻觉》**（"The Leaderboard Illusion"，Singh 等，2025）。其主要论断是：

- **私有测试与选择性披露。** 一些提供商在发布之前就在平台上测试其模型的许多私有变体，并能选择公布哪一个结果；按[[evaluation/evaluation-principles#prop-winners-curse]]的胜者诅咒论证，从许多带噪评分中挑最好的公布，会使公布的分数虚高。例如，论文报告某提供商在一次重大发布之前的一段时间内测试了 $27$ 个私有变体，并以模拟展示了 best-of-$N$ 选择如何抬高期望评分。
- **数据不对称。** 少数大型提供商的模型比开源权重模型被采样进更多的对战，这使那些提供商获得平台更多的提示与偏好数据；作者认为在这类数据上训练会专门提升在 Arena 分布上的表现，并在自己的实验中估计出了由此而来的巨大相对增益。
- **撤除（deprecation）。** 许多模型随时间从采样中被移除，常常不另行通知；作者论证，当余下的比较图失衡时，这会带偏 Bradley–Terry 评分。

组织者公开回应。他们回应说：其允许提供商以匿名名字测试预发布模型的政策早已公布、对所有提供商开放；排行榜只收录公开可得的模型，其分数反映真实用户的投票；采样率反映提交模型的数量与受欢迎程度等因素，他们并公布了更多关于采样的数据；他们还就论文若干事实性论断与数字提出异议，同时介绍了其在政策与透明度上所作的改动。读者可以自行评估这两份文件；而一般的教训并不取决于是否裁决了每一个分歧。任何允许重复提交的排行榜都暴露在选择效应之下；数据接入权使其数据来源的那个分布占优；而采样、测试与撤除政策的透明度，决定了评分可信到什么程度。

::: example 评分上的选择效应 {#ex-selection}
某提供商测试真实强度相同的 $10$ 个私有变体，每个变体评分的标准误为 $5$ 个 Elo 分，并公布其中最好的。公布的评分平均比真值虚高多少？排行榜要如何消除这种偏差？
::: solution
按[[evaluation/evaluation-principles#prop-winners-curse]]，$10$ 个独立正态误差的最大值的期望是 $1.539$ 个标准差：$1.539\cdot5 = 7.7$ 分。补救办法：公布所有测试过的变体的评分；要求公布的模型在测试开始之前就已确定；或者在选定之后用新的对战为被选中的变体重新评分——正如上一章中在新题目上重新评测恰好消除了偏差那样。
:::
:::

::: warning 人类判断不是标准答案
把人类偏好当作万物据以测量的金标准，是很有诱惑的。它本身是一种带着自己偏差的测量。众包评定者无法可靠地把 GPT-3 写的故事与人写的区分开（Clark 等，2021），于是流畅性能冒充质量；Hosking 等（2024）发现，更自信的表达会被判为更合事实，而偏好分数对事实错误赋予的权重不足；评定者的时限又使长回复或技术回复难以核查。人类评测测的是评定者在给定条件下偏好什么——对某些目的（用户满意）恰如其分，对另一些目的（正确性、安全性）则是个代理。对后一类目的，要用专家，给他们时间与工具，问具体错误而非总体偏好，并度量一致性。
:::

::: history
把成对比较作为测量的基础，可追溯到 Thurstone 的《比较判断定律》（"law of comparative judgment"，1927）——它用正态噪声为感知之差建模。Zermelo（1929）提出用逻辑斯蒂模型从循环赛结果给棋手排名，并证明了存在性与唯一性的条件；Bradley 与 Terry（1952）在口味测试中重新发现了它，Ford（1957）与 Hunter（2004）分析了它的估计。Arpad Elo 的评分系统被美国国际象棋协会于 1960 年、国际棋联于 1970 年采用，并在其 1978 年的著作中作了阐述，使在线更新成为标准做法。评定者间一致性度量来自心理学与内容分析：Cohen's κ（1960）、Fleiss 的多评定者推广（1971）与 Krippendorff's α（1970 年起）。在 NLP 中，人类评测早在神经模型出现之前就是翻译与摘要的标准做法；对语言模型，偏好比较随 RLHF 变得核心（Christiano 等，2017；Stiennon 等，2020；Ouyang 等，2022），而 Chatbot Arena（2023；Chiang 等，2024）把众包的成对投票变成了公开排行榜。Singh 等（2025）对它的批评与其组织者的回应，把排行榜的统计问题带入了广泛的讨论。
:::

::: summary
- 人类评测使用绝对评分、**成对偏好**、排序或错误标注（[[#def-protocols]]）；成对判断消去评定者偏移（[[#prop-offset]]），是比较模型的通常格式。
- **Cohen's κ** $= (p_o - p_e)/(1 - p_e)$ 度量两名评定者超出随机的一致（[[#prop-kappa]]）；类别稀有时原始一致率虽高，κ 却可能很低。**Krippendorff's α** 把它推广到多名评定者、缺失数据与有序量表（[[#def-alpha]]）。
- **Bradley–Terry** 模型设定 $\Prob(i\succ j) = \sigma(\theta_i - \theta_j)$（[[#def-bt]]）；其对数似然是凹的，MLE 使期望胜场等于实际胜场（[[#prop-bt-likelihood]]）。**Elo** 刻度按每单位对数几率 $400/\ln10$ 分。
- **Elo 更新**是对 Bradley–Terry 似然的 SGD 步（[[#prop-elo-sgd]]）：依赖次序，永不收敛。对固定的模型，应拟合 MLE 并给出**自助法**区间。
- **Chatbot Arena** 用 Bradley–Terry、自助法区间、风格控制与分类评分，把在用户自己的提示上收集的匿名众包成对投票化为模型排名。批评者（Singh 等，2025）指出私有测试、数据不对称与模型撤除；组织者则对若干论断提出异议并援引已公布的政策。选择与透明度对任何排行榜都至关重要。
- 人类偏好本身是带偏差的测量——偏向流畅、自信与长度——并不是正确性与安全性的标准答案。
:::

## 习题

::: exercise 计算 κ {level=1 check="0.565"}
两名评定者在 $80\%$ 的二元判断上一致。评定者 A 有 $60\%$ 的时候说"是"，评定者 B 是 $70\%$。计算 Cohen's κ，保留三位小数。
::: solution
$p_e = 0.6\cdot0.7 + 0.4\cdot0.3 = 0.42 + 0.12 = 0.54$。$\kappa = (0.80 - 0.54)/(1 - 0.54) = 0.26/0.46 = 0.565$。
:::
:::

::: exercise Elo 刻度下的胜率 {level=1 check="0.640"}
在[[#def-bt]]的 Elo 刻度下，评分高 $100$ 分的模型赢下一次比较的概率是多少（保留三位小数）？
::: solution
$1/(1 + 10^{-100/400}) = 1/(1 + 0.5623) = 0.640$。
:::
:::

::: exercise 由胜率到评分差 {level=1 check="70.4"}
两个模型（不含其他模型）之间的 $100$ 次比较中，模型 A 赢 $60$ 次。Elo 刻度下的最大似然评分差是多少（保留一位小数）？
::: solution
只有两个模型时，[[#prop-bt-likelihood]]要求 $100\,\sigma(\theta_A - \theta_B) = 60$，故 $\theta_A - \theta_B = \operatorname{logit}0.6 = \ln1.5 = 0.405$。换成 Elo 刻度：$\frac{400}{\ln10}\cdot0.405 = 400\log_{10}1.5 = 70.4$ 分。
:::
:::

::: exercise 一次 Elo 更新 {level=2 check="1520.48"}
评分 $1500$ 的模型 A 击败评分 $1600$ 的模型 B，$K = 32$。给出 A 的新评分（保留两位小数），并说出 B 丢掉多少分。
::: solution
$E_A = 1/(1 + 10^{0.25}) = 0.35994$，故 A 涨 $32\cdot0.64006 = 20.48$ 分至 $1520.48$；B 丢掉同样的 $20.48$ 分。每次更新都守恒总评分。
:::
:::

::: exercise 手工算 Krippendorff's α {level=2 check="0.6349"}
两名评定者标注 $12$ 个条目（无缺失）。两人在 $3$ 个条目上分歧。在两人合计的 $24$ 个标签中，"good" 出现 $10$ 次、"ok" $7$ 次、"bad" $7$ 次。由[[#eq-alpha]]计算名义 α，保留四位小数。
::: solution
每个单元 $m_u = 2$，故每个分歧贡献两个权重为 $1$ 的有序非对角对：$\sum_{c\ne k}o_{ck} = 6$，且 $n = 24$。$\sum_{c\ne k}n_cn_k = 24^2 - (10^2 + 7^2 + 7^2) = 576 - 198 = 378$。于是 $D_o = 6/24 = 0.25$、$D_e = 378/(24\cdot23) = 0.6848$，故 $\alpha = 1 - 0.25/0.6848 = 0.6349$——正是[[#sec-agreement]]清单中评定者 A 与 B 的值。
:::
:::

::: exercise 带程度的偏好 {level=2}
某协议在五档量表上记录偏好（"A 好得多"、"A 更好"、"平局"、"B 更好"、"B 好得多"）。提出两种把它们用于 Bradley–Terry 拟合的办法，并讨论各自假设了什么。
::: solution
（1）归并为胜、负、平，平局记为双方各半个胜场（等价地取软标签 $\frac12$），并把"好得多"与"更好"同等看待：做法简单，但丢掉了程度信息，并假设平局对两个方向的信息量相同。（2）在交叉熵 $-\sum[y\log\sigma(\theta_i - \theta_j) + (1 - y)\log\sigma(\theta_j - \theta_i)]$ 中使用软标签，例如 $1, 0.75, 0.5, 0.25, 0$：用上了程度，但假设所选数字是校准过的概率，而评定者对量表的使用未必支持这一假设。替代做法是显式地建模平局（Rao 与 Kupper，1967；Davidson，1970），或使用在类别之间带待估阈值的有序逻辑斯蒂模型——它从数据中学习"好得多"与"更好"之间的换算。
:::
:::

::: exercise best-of-$N$ 的代价 {level=2 check="7.69"}
沿用[[#ex-selection]]，若每个变体评分的标准误为 $5$ 分、公布 $10$ 个中最好的，用 $e_{10} = 1.539$，期望虚高多少个 Elo 分（保留两位小数）？
::: solution
$1.539\cdot5 = 7.69$ 分（示例中四舍五入为 $7.7$）。$20$ 个变体时 $e_{20} = 1.867$，虚高 $9.3$ 分；它像 $\sqrt{2\ln N}$ 一样增长得很慢，但只要 $N > 1$ 就从不为零。
:::
:::

::: exercise 当 MLE 不存在时 {level=3}
三个模型比赛：A 胜 B $5$ 次、负 $0$ 次；B 胜 C $3$ 次、负 $2$ 次；A 与 C 从未交手。证明 Bradley–Terry 的 MLE 不存在，说明 MM 或梯度拟合在这份数据上会做什么，并提出两种补救。
::: solution
取划分 $\{A\}$ 对 $\{B, C\}$：A 从未输给过另一组中的任何模型，故由[[#prop-bt-likelihood]]不存在有限的极大值点。具体地，$\ell = 5\log\sigma(\theta_A - \theta_B) + 3\log\sigma(\theta_B - \theta_C) + 2\log\sigma(\theta_C - \theta_B)$；固定 $\theta_B, \theta_C$ 而令 $\theta_A\to\infty$ 时第一项趋于 $0$ 而增大，其余项不含 $\theta_A$，故上确界被逼近却永达不到。梯度或 MM 拟合会把 $\theta_A$ 不断推高（速度缓慢，因为梯度 $5(1 - \sigma)$ 在衰减），而报告的评分取决于何时停手。补救：（1）加一个弱先验，例如高斯惩罚 $-\lambda\sum_i\theta_i^2$，使目标严格凹、存在有限的极大值点——即 MAP 估计（[[math-for-ml/estimation]]）；（2）加伪计数，例如让每一对对一个参照模型各记半胜半负，效果相同；并且无论如何都要为 A 收集更多比较，因为五场比赛确立不了它究竟强多少。
:::
:::

::: exercise κ 的自助法区间 {level=3}
写一个函数，通过有放回地重抽条目，为 Cohen's κ 计算 $95\%$ 自助法置信区间，并以种子 $0$、$2{,}000$ 次重抽应用于[[#sec-agreement]]清单中的评定者 A 与 B。这个区间对从 $12$ 个条目估出的 κ 说明了什么？
::: solution
```python
import random
from collections import Counter

A = ["good", "good", "ok", "bad", "good", "ok", "bad", "good", "ok", "good", "bad", "ok"]
B = ["good", "ok",   "ok", "bad", "good", "good", "bad", "good", "bad", "good", "bad", "ok"]

def kappa(pairs):
    n = len(pairs)
    p_o = sum(a == b for a, b in pairs) / n
    ma, mb = Counter(a for a, _ in pairs), Counter(b for _, b in pairs)
    p_e = sum(ma[c] * mb[c] for c in ma) / n ** 2
    return (p_o - p_e) / (1 - p_e) if p_e < 1 else 1.0

rng = random.Random(0)
pairs = list(zip(A, B))
boot = sorted(kappa([rng.choice(pairs) for _ in pairs]) for _ in range(2000))
print(f"kappa = {kappa(pairs):.3f}, 95% bootstrap interval [{boot[49]:.3f}, {boot[1949]:.3f}]")
```

```text
kappa = 0.621, 95% bootstrap interval [0.178, 1.000]
```

区间非常宽：$12$ 个条目时，数据与从很弱到近乎完美的一致都相容，所以点估计 $0.621$ 本身说明不了什么。一致性研究需要很多条目——通常至少上百个——并应报告区间。（若某次重抽中两名评定者都只用同一个类别，则 $p_e = 1$；函数对这种情形返回 $1$，这个约定在这里无关紧要。）
:::
:::
