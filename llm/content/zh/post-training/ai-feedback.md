到目前为止的每一种方法都离不开人：写示范（[[post-training/instruction-tuning]]）、为奖励模型比较回复（[[post-training/reward-models]]）、或提供 DPO 的偏好对（[[post-training/preference-optimisation]]）。人类反馈慢而贵，因人而异，为有害内容收集时令人不快，而且当回复太长或太专业、来不及核查时会变得不可靠。既然语言模型自己就能阅读、比较和批评文本，一个显然的想法是让模型提供一部分反馈。**AI 反馈**（AI feedback）就是这么做的：模型在指令或成文原则的指导下，为训练另一个模型——或它自己——的数据打标签。

本章照着两篇源头论文，仔细描述这两项开创性方法。**宪法式 AI**（Constitutional AI，Bai 等，2022b）从一小组用自然语言写成的原则出发训练无害助手，用 AI 生成的批评、修订与偏好标签取代人工的有害性标签。**RLAIF**（Lee 等，2023）就强化学习把 AI 偏好标签与人类偏好标签正面对比。之后把模型当作**评审**来谈：已记录的评审模型偏差，一个"交换回复次序即可在简单模型下消除位置偏差"的证明，以及标签噪声对奖励模型的影响。最后是自改进循环，以及用模型监督模型的限度。

## 来自模型的反馈 {#sec-definitions}

::: definition AI 反馈 {#def-ai-feedback}
**AI 反馈**指由一个语言模型 $J$——**反馈模型**或**评审**（judge）——而非人来产生、用于训练模型 $\pi_\theta$ 的任何训练信号。常见的形式有：**偏好标签**，$J$ 在两个回复中选定更好的那个（或对每个选项给出的概率）；量表上的**评分**；**批评**，对回复缺陷的自由文本描述；以及**修订**，由 $J$ 写出的改进回复。评审由写明标准的提示引导——常常是一组成文**原则**——它可以就是策略本身、策略的早期版本，或另一个模型。
:::

::: definition 从 AI 反馈中学习强化学习（RLAIF） {#def-rlaif}
**RLAIF** 是把[[post-training/rlhf#alg-pipeline]]的 RLHF 流程中第 2 阶段的人类比较全部或部分换成 AI 偏好标签；奖励模型在这些标签上训练，策略再对着它优化。**直接 RLAIF** 不要奖励模型，在强化学习过程中由评审给每个采样到的回复打分。
:::

AI 反馈并没有把人请出流程，而是把人挪了位置。人不再标注成千上万的样本，而是撰写原则与提示、挑选评审模型、抽查它给出的标签。这是不是划算，取决于评审能否比标注者更一致、更便宜地执行原则，也取决于它的错误是不是策略钻得动的错误。

## 宪法式 AI {#sec-cai}

Anthropic 的 Bai 等（2022b）要训练的助手，无害而不推诿——面对敏感请求，说明自己反对的理由，而不是生硬拒答——且不使用人工的有害性标签。无害性的唯一人工监督是一部**宪法**：一小组用自然语言写成的短原则，例如指示选择有害性更低、更不违背伦理、更不可能助长非法活动的那个回复。*有用性*仍然使用人类标签。方法分两个阶段。

::: algorithm 宪法式 AI：监督阶段（SL-CAI） {#alg-cai-sl}
从一个**仅有用性**模型出发——它只在有用性数据上做过 RLHF，倾向于服从有害请求。
1. 用设计来引出有害行为的**红队**（red-teaming）提示喂它，采一个回复。
2. 接上一段**批评请求**，由随机抽取的一条宪法原则构成，要模型指出其回复有害、不道德或别处不妥的地方；采出批评。
3. 接上一段**修订请求**，要模型改写回复、去掉指出的问题；采出修订。
4. 可选：再随机抽别的原则，重复第 2–3 步。
5. 在最终的修订文本上做 SFT 微调一个预训练模型（并混入对无害提示的普通有用回复，以保持有用性）。
:::

提示的上下文里放了少量批评与修订的少样本例子来示范格式。Bai 等发现：轮次越多，修订文本的有害性逐级下降；对小模型来说，先批评再修订比直接修订帮助更大。监督阶段把回复的分布挪进一个合理的区域；第二个阶段用强化学习继续打磨。

::: algorithm 宪法式 AI：强化学习阶段（RL-CAI） {#alg-cai-rl}
1. 对红队提示，从 SL-CAI 模型采回复**对**。
2. 把每一对以选择题形式呈给**反馈模型**——哪个回复更符合随机抽取的一条宪法原则——记录它赋给两个选项的归一化概率。这些软标签就是 AI 的无害性偏好。
3. 用这些 AI 无害性比较与*人类*有用性比较的混合数据训练一个**偏好模型**（奖励模型）。
4. 像 RLHF 那样，用强化学习让 SL-CAI 模型对着偏好模型做优化。
:::

论文还试过给反馈模型加**思维链**提示：让它先逐步推理再选择。对较大的模型，这与人类无害性判断的一致性提高了，但概率变得非常自信；作者把思维链标签截断到 $40$–$60\%$ 区间，免得一个自信的判断左右整个训练、把策略推向极端。

Bai 等报告：与在人工无害性标签上做 RLHF 的模型相比，众包工人评判 RL-CAI 模型更无害，有用性相当，而且推诿少得多——它们倾向于回应并解释，而不是拒绝。他们也注意到，RL-CAI 模型优化过头时，反对会显得"说教"或千篇一律——这是对 AI 反馈本身的过度优化。作者把这一方法定位为迈向**可扩展监督**的一步——用 AI 协助监督 AI（[[safety-alignment/scalable-oversight]]）——并强调宪法把训练目标所持的价值观摆到了明处、可以编辑，只是由谁来选定这些价值，仍是留白。

::: example 从选项概率得出软标签 {#ex-soft-labels}
问反馈模型回复 (A) 与 (B) 哪个害处更小，它对答案词元 "A" 与 "B" 的对数概率是 $-0.3$ 与 $-1.5$。CAI 流程为这一对产生什么软标签？若反馈模型先做思维链推理、给 (A) 判了 $0.97$，截断后的标签是多少？
::: solution
对两个选项归一化：$P(\text{A}) = e^{-0.3}/(e^{-0.3} + e^{-1.5}) = \sigma(1.2) = 0.769$。偏好模型以目标 $0.769$（"A 更好"）的交叉熵训练，由[[post-training/reward-models#prop-rm-props]]，该损失在奖励差 $\operatorname{logit}0.769 = 1.2$ 处最小。若用思维链并截断到 $[0.4, 0.6]$，标签变为 $0.6$，对应的差距只有 $\operatorname{logit}0.6 = 0.405$。
:::
:::

## RLAIF 对 RLHF {#sec-rlaif}

宪法式 AI 把 AI 的无害性标签与人类的有用性标签混在一起。Lee 等（2023）问了一个更直接的问题：让 AI 标签完全取代人类标签，在其上做强化学习，效果可比吗？他们在三项任务——Reddit 帖子摘要、有用对话、无害对话——上用现成的大语言模型 PaLM 2 做标注者，在同一批提示上比较 RLAIF 与 RLHF 训练出的策略。

他们报告的结论如下。摘要任务上，人类评审比 SFT 基线更偏爱 RLAIF 输出的比例约为 $71\%$，偏爱 RLHF 输出的约为 $73\%$，作者认为这一差距不具统计显著性；正面对比时，RLAIF 与 RLHF 被选中的次数差不多。无害对话上，被评为无害的回复比例以 RLAIF 最高（$88\%$），RLHF 次之（$76\%$），SFT 最低（$64\%$）。即便 AI 标注者与策略同尺寸，RLAIF 依然有效——一种自我改进。**直接 RLAIF**——在强化学习期间让语言模型给回复按 1 到 10 打分、而不训练奖励模型——在他们的实验中胜过标准的两步版本，代价是每个样本多一次评审调用。标注技术方面：详细指令与思维链推理提高了与人类标签的一致性，少样本例子没有一致的助益，位置偏差则可通过两种次序都查询再平均来削弱——下节的主题。他们估计 AI 标注的花费不足人工标注的十分之一。

这些是特定任务、模型与评测下的结果；它们说明当评审称职、标准明确时，AI 偏好可以顶替人类偏好——而不是任何时候都可以。

## 模型做评审 {#sec-judges}

AI 反馈与基于模型的评测（[[evaluation/model-judges]]）依赖同一种能力：让模型读候选回复并作出评判。Zheng 等（2023）用 MT-Bench 与 Chatbot Arena 系统研究了这一点，发现强评审模型（当时是 GPT-4）与人类偏好的一致性超过 $80\%$，差不多就是人与人的水平。他们还记录了一批偏差，后来的工作证实并扩展了它们：

- **位置偏差。** 评审偏爱处在某个位置的回复，通常是第一个；Wang 等（2023）表明只把次序对调，就可能改变它对两个系统的高下排序。
- **冗长偏差。** 评审偏爱更长的回复，哪怕多出来的长度毫无信息量；Dubois 等（2024）做出的 AlpacaEval 长度控制版本，用回归剔除了长度之差。
- **自我偏好。** 评审给自己的输出——或同族模型的输出——打更高的分；Panickssery 等（2024）发现这与模型认出自己输出的能力相关。
- **能力上限。** 评审无法可靠地批改自己都做不出的数学或编程答案；参考答案或运行执行会有帮助。
- **对风格与权威的敏感。** 自信的语气、排版格式、回复里自称正确的断言，都能左右评审。

有些偏差可以靠设计除掉，有些不能。位置偏差有一个干净的解法。

::: proposition 交换次序消除恒定位置偏差 {#prop-swap}
设一个评审比较 $\mathbf{y}_1$ 与 $\mathbf{y}_2$ 时：$\mathbf{y}_1$ 在前，它以概率 $\sigma(\Delta + b)$ 偏爱排前的回复；$\mathbf{y}_2$ 在前，它以概率 $\sigma(-\Delta + b)$ 偏爱排前的回复。其中 $\Delta$ 是评审眼中的真实质量差距，$b$ 是位置偏差。记两种次序下它选中 $\mathbf{y}_1$ 的概率为 $p_{12}$ 与 $p_{21}$，则

$$
\tfrac12\big(\operatorname{logit}p_{12} + \operatorname{logit}p_{21}\big) = \Delta,\qquad \tfrac12\big(\operatorname{logit}p_{12} - \operatorname{logit}p_{21}\big) = b,
$$

即对两种次序的对数几率取平均恰好恢复 $\Delta$，而它们的差衡量偏差。若改为对概率取平均，得 $\frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$：相对 $\frac12$ 的方向与 $\Delta$ 一致，但被朝 $\frac12$ 收缩了。
:::

::: proof
$p_{12} = \sigma(\Delta + b)$，且 $p_{21} = 1 - \sigma(-\Delta + b) = \sigma(\Delta - b)$，因为 $1 - \sigma(z) = \sigma(-z)$。logit 是 $\sigma$ 的反函数，所以 $\operatorname{logit}p_{12} = \Delta + b$、$\operatorname{logit}p_{21} = \Delta - b$；二者半和、半差恰为 $\Delta$ 与 $b$。至于概率平均：$g(\Delta) = \frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$ 递增且 $g(0) = \frac12(\sigma(b) + \sigma(-b)) = \frac12$，于是 $g(\Delta) > \frac12$ 当且仅当 $\Delta > 0$；且当 $b\ne0$ 时 $\lvert g(\Delta) - \frac12\rvert < \lvert\sigma(\Delta) - \frac12\rvert$，因为 $\sigma$ 在 $[0, \infty)$ 上是凹的，把 $\Delta\pm b$ 两处的取值平均会把它压低。
:::

::: widget plot
f: 1/(1 + exp(-(x + b))); 1/(1 + exp(-(x - b))); 0.5*(1/(1 + exp(-(x + b))) + 1/(1 + exp(-(x - b)))); 1/(1 + exp(-x))
x: -5, 5
y: 0, 1
sliders: b=0.8:0:3:0.1
labels: $\mathbf{y}_1$ shown first; $\mathbf{y}_1$ shown second; average of the two probabilities; unbiased $\sigma(\Delta)$
hlines: 0.5
caption: [[#prop-swap]]模型下带位置偏差的评审：选中 $\mathbf{y}_1$ 的概率作为质量差 $\Delta$ 的函数，分别在它排前（左移 $b$）与排后（右移）两种情形。$\Delta = 0$ 时裁决只取决于次序。两个概率的平均恰好在正确的位置穿过 $\frac12$，但曲线比无偏的那条更平；改为平均对数几率则精确恢复无偏曲线。
:::

这条命题依赖一个模型：偏差是对数几率上的恒定平移。冗长偏差性质不同：它依赖回复本身，于是两种次序里都在，对调也留。要处理它，只能控制长度、用指令约束评审，或让奖励明确地惩罚这一点。

### 模拟评审 {#sec-code}

下面的程序模拟 $20{,}000$ 次比较，回复的质量与长度各自独立随机。评审有位置偏差 $b = 0.8$、冗长权重 $v = 0.5$；模拟的人类只按质量标注，噪声水平相同。程序统计每种标注方案选中真正更好回复的次数。

```python
import math, random

def sig(z):
    return 1 / (1 + math.exp(-z))

def logit(p):
    return math.log(p / (1 - p))

def judge(q_first, q_second, len_first, len_second, b=0.8, v=0.5, k=2.0):
    """模拟评审偏爱"排在前面"的回复的概率。
    b: 偏向首个位置的位置偏差；v: 长度的权重；k: 锐度。"""
    return sig(k * ((q_first - q_second) + v * (len_first - len_second)) + b)

rng = random.Random(0)
N = 20000
stats = {"one order, sampled": 0, "one order, thresholded": 0, "average of both orders": 0, "human label": 0}
flips = 0
for _ in range(N):
    qa, qb = rng.gauss(0, 1), rng.gauss(0, 1)        # 真实质量
    la, lb = rng.gauss(0, 1), rng.gauss(0, 1)        # 标准化长度，与质量独立
    better_a = qa > qb
    p_ab = judge(qa, qb, la, lb)                     # A 在前：P(评审选 A)
    p_ba = 1 - judge(qb, qa, lb, la)                 # B 在前：P(评审选 A)
    pick1 = rng.random() < p_ab                      # 采样一次的裁决，A 总在前
    pick2 = 0.5 * (logit(p_ab) + logit(p_ba)) > 0    # 去偏：平均对数几率
    human = rng.random() < sig(2 * (qa - qb))        # 一个含噪的人类标签
    stats["one order, sampled"] += pick1 == better_a
    stats["one order, thresholded"] += (p_ab > 0.5) == better_a
    stats["average of both orders"] += pick2 == better_a
    stats["human label"] += human == better_a
    flips += (p_ab > 0.5) != (p_ba > 0.5)            # 交换次序后裁决翻转
for name, c in stats.items():
    print(f"agreement with the truly better response, {name:22s} {c / N:.3f}")
print(f"verdicts that flip when the order is swapped: {flips / N:.3f}")

# 长度偏差在交换次序后仍在：质量相同的对，A 长出一个标准差
p_ab = judge(0, 0, 1, 0); p_ba = 1 - judge(0, 0, 0, 1)
print(f"equal quality, A longer: debiased P(A) = {sig(0.5 * (logit(p_ab) + logit(p_ba))):.3f}")
```

```text
agreement with the truly better response, one order, sampled     0.775
agreement with the truly better response, one order, thresholded 0.832
agreement with the truly better response, average of both orders 0.852
agreement with the truly better response, human label            0.826
verdicts that flip when the order is swapped: 0.201
equal quality, A longer: debiased P(A) = 0.731
```

评审五分之一的裁决在交换次序后改变。两种次序都查询、再平均对数几率，消除了位置偏差，在这里得到最高的——甚至比单个采样的人类标签还高，因为用的是评审的概率而不是单次含噪的抽取。冗长偏差却留了下来：质量相同的两个回复，更长的那个去偏之后仍有 $73\%$ 的概率被偏爱。在这些标签上训练的奖励模型会学会奖励长度，对着它优化的策略会学着写得更长（[[post-training/reward-models#sec-overoptimisation]]）。

::: example 给一对回复去偏 {#ex-debias}
某评审在 A 排在前面时以概率 $0.8$ 选中 A，在 A 排在后面时以概率 $0.4$ 选中 A。按[[#prop-swap]]的模型，估计位置偏差与去偏后对 A 的偏好。
::: solution
$\operatorname{logit}0.8 = \ln4 = 1.386$，$\operatorname{logit}0.4 = \ln(2/3) = -0.405$。去偏对数几率 $\frac12(1.386 - 0.405) = 0.490$，于是 $P(\text{A}\succ\text{B}) = \sigma(0.490) = 0.620$。位置偏差 $b = \frac12(1.386 + 0.405) = 0.896$，偏向第一个位置。若平均概率会得 $0.6$，稍平一些，与命题的预言一致。
:::
:::

### 标签噪声与奖励模型 {#sec-noise}

即便无偏的评审也会犯错。若这些错误与内容无关，它们的危害没有看上去那么大。

::: proposition 对称标签噪声压缩差距但保住排序 {#prop-noise}
设真实偏好服从差距为 $\Delta$ 的 Bradley–Terry 模型，每个标签以概率 $\varepsilon < \frac12$ 独立翻转。观察到的偏好概率是

$$
p_{\text{obs}} = \varepsilon + (1 - 2\varepsilon)\,\sigma(\Delta),
$$

而在大量这种标签上训练到收敛的奖励模型学到的差距 $\Delta' = \operatorname{logit}p_{\text{obs}}$ 与 $\Delta$ 同号，是 $\Delta$ 的严格增函数，$\Delta\ne0$ 时满足 $\lvert\Delta'\rvert < \lvert\Delta\rvert$，且对一切 $\Delta$ 有 $\lvert\Delta'\rvert < \operatorname{logit}(1 - \varepsilon)$。
:::

::: proof
标签说"$\mathbf{y}_1$ 胜"，当且仅当真实结果是胜而未翻转，或结果是负而翻转了：$p_{\text{obs}} = (1-\varepsilon)\sigma(\Delta) + \varepsilon(1 - \sigma(\Delta)) = \varepsilon + (1 - 2\varepsilon)\sigma(\Delta)$。由[[post-training/reward-models#prop-rm-props]]，收敛后的差距是 $\operatorname{logit}p_{\text{obs}}$。因为 $1 - 2\varepsilon > 0$，$p_{\text{obs}}$ 是 $\sigma(\Delta)$ 的严格增仿射函数，把 $\frac12$ 映到 $\frac12$，所以符号与顺序都保住；$\Delta\ne0$ 时它严格落在 $\sigma(\Delta)$ 与 $\frac12$ 之间，且落在 $(\varepsilon, 1 - \varepsilon)$ 内——两个界都由此起出。
:::

因此一致的噪声只是把奖励非线性地重新缩放并封住范围，而 KL 正则的优化器还能靠调 $\beta$ 吸收其中一部分。随内容而变的噪声——评审对长回复错得更多、对某种语言错得更多、对长得像自己的回复错得更多——则真的会改变排序，才是要紧的那一种。

::: widget plot
f: n + (1 - 2*n)/(1 + exp(-x)); 1/(1 + exp(-x))
x: -6, 6
y: 0, 1
sliders: n=0.2:0:0.45:0.01
labels: observed preference with flip rate $\varepsilon$; noise-free $\sigma(\Delta)$
caption: 每个标签以概率 $\varepsilon$（滑块 $n$）翻转时，观察到的偏好概率对真实奖励差距 $\Delta$ 的曲线（[[#prop-noise]]）。形状与中心不变，只是被挤进 $(\varepsilon, 1 - \varepsilon)$：在这种标签上训练的奖励模型给回复排序的次序不变，差距却更小、且有上限。
:::

::: example 被压缩的间隔 {#ex-noise}
两个回复的真实奖励差为 $2$。某评审随机翻转 $20\%$ 的标签。在大量这种标签上训练的奖励模型会学到多大的差距？
::: solution
$\sigma(2) = 0.8808$；$p_{\text{obs}} = 0.2 + 0.6\cdot0.8808 = 0.7285$；$\Delta' = \ln(0.7285/0.2715) = 0.987$。学到的差距不到真实差距的一半；而且无论两个回复差得多开，任何差距都超不过 $\operatorname{logit}0.8 = 1.386$。
:::
:::

::: quiz
一个团队用强模型给奖励模型标注偏好对，每对都按两种次序查询并平均对数几率。哪些问题仍然存在？
- [ ] 恒定的位置偏差
- [x] 对较长回复的偏爱
- [x] 对评审自己文风的偏爱
- [x] 在评审自己解不出的题目上出错
::: solution
对调次序再平均，消掉的是只依赖位置的偏差（[[#prop-swap]]）。依赖回复内容的偏差——长度、文风、与自己相似——在两种次序里都存在，消不掉，能力上限同样如此。得另寻对策：长度控制、参考答案、运行执行、多个评审、以及对抽样做人工审计。
:::
:::

## 自我改进与合成偏好 {#sec-self}

模型会评审之后，策略与评审就不必是两个模型，循环也可以一遍遍做下去。

- **AI 标注的偏好数据集。** UltraFeedback（Cui 等，2023）收集一批模型对约 $64{,}000$ 条提示的回答，请强模型按有用、诚实、真实、遵循指令四项评分。Zephyr（Tunstall 等，2023）用这批数据以 DPO（"蒸馏 DPO"）训练了一个 $70$ 亿参数的模型，是最早证明"在 AI 标注的偏好上做 DPO 就能廉价造出能打聊天模型"的工作之一。
- **自我奖励语言模型。** Yuan 等（2024）让模型生成回复、用评审提示给自己打分、按自己的分数构造偏好对、再用 DPO 训练自己，如此迭代数轮；他们报告在其基准上，模型的回复与它的评审三轮下来都在进步。风险在于：模型作为评审的偏差会强化它作为策略的偏差，没有外部制衡。
- **批评模型。** 模型可以不报裁决，而给出供人核查的批评。McAleese 等（2024）训练模型批评代码，报告有人类评审借助它找到的 bug 多于独自评审——AI 反馈用来加强而非取代人类监督。
- **规范。** 后来的工作让模型在训练期间明确针对成文规范进行推理，由评审模型检查对规范的遵从作为奖励（例如审议式对齐，Guan 等，2024），并用宪法生成的合成数据训练输入与输出分类器来防御越狱（Sharma 等，2025；见[[safety-alignment/robustness-jailbreaks]]）。

::: warning AI 反馈仍是代理——而且与策略相关
人们容易以为，一个"和人不相上下"的评审能让奖励破解消失。并不能：对着 AI 评审优化的策略，会像找到奖励模型的盲区一样找到评审的盲区（[[post-training/reward-models#sec-overoptimisation]]），而评审若与策略出自同一个模型家族，两者的盲区很可能是共享的，谁也不觉得谁有问题。在固定测试集上与人类一致，不代表在"被训练来最大化评审评分"的策略的输出上也一致。保留一些独立的人类评估；使用不同家族的评审；留意系统性的漂移，例如长度渐增、奉承渐多。
:::

### 谁的原则？ {#sec-values}

宪法把训练信号里的价值观摆到明处，这是相对于千万次零散标注决定所隐含的价值观的一个优点：它可以公布、可以讨论、可以修订。但它没有裁定该写下哪些价值。原则的选取、措辞、提示里的示例、评审模型的挑选，都在塑造结果，不同的开发者与社群会做出不同的选择。用公众意见来起草宪法的实验（Huang 等，2024，"集体宪法式 AI"）是一种回应；把采用了哪些原则、如何采用写成文档，是另一种。这些问题连着公平与 AI 系统的治理（[[llm-society]]），也连着对齐问题本身（[[safety-alignment/alignment-problem]]）。

::: example AI 标注的算力 {#ex-label-cost}
一个团队用 $700$ 亿参数的评审模型标注 $100{,}000$ 对偏好，每对按两种次序查询。每次查询有 $1{,}500$ 个输入词元（指令、提示、两个回复）与 $300$ 个输出词元（一小段思维链和一个裁决）。按每词元 $2N$ FLOPs 估算算力，并与在同样这些对上用一个 $70$ 亿参数模型训练一个轮次的奖励模型比较（每词元 $6N$ FLOPs，每对 $1{,}200$ 个词元，两个回复都算）。
::: solution
评审：$10^5\cdot2\cdot1800\cdot2\cdot7\times10^{10} = 5.04\times10^{19}$ FLOPs。奖励模型：$10^5\cdot1200\cdot6\cdot7\times10^9 = 5.04\times10^{18}$ FLOPs。标注比训练贵十倍——相对预训练不算什么，而且不占人工时间，人工时间才是稀缺资源。为消位置偏差把查询翻倍，花费也翻倍；去掉思维链大约能省六分之一。
:::
:::

::: history
用模型评价文本有先例：BLEU（Papineni 等，2002）这类自动指标，BERTScore（Zhang 等，2020）这类学出来的指标。在难以直接评价的任务上用 AI 系统帮助人类监督 AI 系统——**可扩展监督**——的设想，在辩论（Irving、Christiano 与 Amodei，2018）、迭代放大（Christiano 等，2018）与递归奖励建模（Leike 等，2018）的工作中发展起来。Askell 等（2021）提出了有用、诚实、无害助手的目标。宪法式 AI（Bai 等，2022b）用原则引导的 AI 反馈取代人工的无害性标签；RLAIF（Lee 等，2023；发表于 ICML 2024）把 AI 与人类的偏好标签正面对比。2023 年，Zheng 等刻画了语言模型评审及其偏差，UltraFeedback（Cui 等）与 Zephyr（Tunstall 等）让 AI 标注的偏好成了开放后训练的标准原料；2024 年，自我奖励模型（Yuan 等）、批评模型（McAleese 等）与集体宪法（Huang 等）从不同方向把这一想法向前推进。
:::

::: summary
- **AI 反馈**让模型做评审、标注者、批评者或修订者；**RLAIF** 用 AI 偏好取代 RLHF 中的人类比较，**直接 RLAIF** 在强化学习期间调用评审。
- **宪法式 AI** 的监督阶段按随机抽取的成文原则批评并修订有害回复、再在修订文本上微调；强化学习阶段把 AI 无害性偏好作为软标签，与人类有用性标签混合。报告称它训出的助手比在人工有害标签上做 RLHF 的更无害、更少推诿。
- Lee 等（2023）在其实验中发现：摘要上 RLAIF 与 RLHF 相当，无害性上更好，标注成本低十倍以上。
- 模型评审有**位置**、**冗长**、**自我偏好**偏差与能力上限。对两种次序的对数几率取平均可精确消除恒定位置偏差（[[#prop-swap]]）；依赖内容的偏差消不掉。
- 对称标签噪声压缩并封顶奖励差距，但保住排序（[[#prop-noise]]）；依赖内容的噪声则不保。
- AI 反馈仍是代理，常与策略自身的盲区相关；宪法把价值观摆上明处，却没有决定那是谁的价值。
:::

## 习题

::: exercise 一个软标签 {level=1 check="0.8176"}
某反馈模型对选项 "A" 与 "B" 的对数概率为 $-0.2$ 与 $-1.7$。对两个选项归一化后，"A 更好"的软标签是多少？保留四位小数。
::: solution
$\sigma(-0.2 + 1.7) = \sigma(1.5) = 0.8176$。
:::
:::

::: exercise 截断 {level=1 check="0.4055"}
截断到 $[0.4, 0.6]$ 之后，在一个截断标签上训练到收敛的奖励模型至多能学到多大的奖励差？保留四位小数。
::: solution
极端标签是 $0.6$，交叉熵在 $\operatorname{logit}0.6 = \ln1.5 = 0.4055$ 处最小（[[post-training/reward-models#prop-rm-props]]）。截断限制任何一个自信判断所能起的作用。
:::
:::

::: exercise 估计位置偏差 {level=1 check="0.752"}
某评审在 A 排前时以概率 $0.75$ 选中 A，在 A 排后时以 $0.6$ 选中 A。按[[#prop-swap]]的模型，估计选中 A 的去偏对数几率 $\Delta$（保留三位小数），并求位置偏差 $b$。
::: solution
$\operatorname{logit}0.75 = \ln3 = 1.0986$，$\operatorname{logit}0.6 = \ln1.5 = 0.4055$。于是 $\Delta = \frac12(1.0986 + 0.4055) = 0.752$，去偏后对 A 的偏好为 $\sigma(0.752) = 0.680$；$b = \frac12(1.0986 - 0.4055) = 0.347$，偏向第一个位置。
:::
:::

::: exercise 含噪标签 {level=2 check="0.6"}
按[[#prop-noise]]，真实差距 $\Delta = 0$ 的一对，对任何 $\varepsilon$ 观察偏好概率是多少？若真实差距极大、$\varepsilon = 0.4$，$p_{\text{obs}}$ 趋于何值？（把这个极限作为答案。）
::: solution
$\Delta = 0$ 时 $p_{\text{obs}} = \varepsilon + (1-2\varepsilon)/2 = \frac12$。$\Delta\to\infty$ 时 $\sigma(\Delta)\to1$，$p_{\text{obs}}\to\varepsilon + 1 - 2\varepsilon = 1 - \varepsilon = 0.6$。就算两个回复差异无穷大，也只有 $60\%$ 的情形能区分出来，奖励模型学到的差距至多 $\operatorname{logit}0.6 = 0.405$。
:::
:::

::: exercise RLAIF 的数字 {level=2}
Lee 等（2023）报告：摘要任务上，人类评审比 SFT 更偏爱 RLAIF 的比例为 $71\%$，比 SFT 更偏爱 RLHF 的为 $73\%$。设每个数字基于 $1{,}000$ 次独立比较。用正态近似判断：两个胜率之间两个百分点的差距，能从抽样噪声里分辨出来吗？在断定 RLAIF 与 RLHF 一样好之前，你还想知道什么？
::: solution
每个胜率的标准误约为 $\sqrt{0.72\cdot0.28/1000} = 0.0142$；两个独立胜率之差的标准误为 $\sqrt2\cdot0.0142 = 0.020$，所以 $0.02$ 的差距是一个标准误——按常规水平分辨不出来（论文同样报告无显著差异）。要断定二者等价，还应想知道：正面对比的置信区间（等价性要证明，不能从"不显著"里推出来）；评审者是否与评审模型共享偏差（长度、文风）；在其他任务、以及评审力不从心的更难题上表现如何；以及对 AI 训练出的奖励模型做更强的优化后，结果还稳不稳。
:::
:::

::: exercise 平均概率与平均对数几率 {level=2 check="0.5749"}
取 $\Delta = 0.5$、位置偏差 $b = 1.5$，计算概率平均 $\frac12(\sigma(\Delta + b) + \sigma(\Delta - b))$（保留四位小数），并与无偏的 $\sigma(\Delta)$ 以及平均对数几率的结果比较。
::: solution
$\sigma(2) = 0.8808$，$\sigma(-1) = 0.2689$，概率平均为 $0.5749$。无偏值是 $\sigma(0.5) = 0.6225$。对数几率平均为 $\frac12\big((\Delta + b) + (\Delta - b)\big) = 0.5$，映回去恰为 $\sigma(0.5) = 0.6225$。概率平均方向正确，却被朝 $\frac12$ 收缩；偏差越大，缩得越狠（[[#prop-swap]]）。
:::
:::

::: exercise 批评循环 {level=2}
为[[#alg-cai-sl]]的一次批评—修订轮写出提示的要点，针对一条询问"如何未经授权接入邻居的 Wi-Fi"的红队请求。好的修订应是什么样？方法为什么在*修订*上训练，而不是在批评上训练？
::: solution
上下文里有用户的请求和仅有用性模型的回复（它可能照办）。批评请求：从宪法取一条原则，措辞为"指出上面回复中有害、不道德或违法的具体方面"。修订请求：改写回复，在去除有害内容的同时尽可能保持有用。好的修订是：拒绝给出未经授权访问网络的操作步骤，简短说明原因（未经授权访问他人网络，在许多地方属于违法，也侵犯隐私），并给出正当途径——直接询问邻居、使用公共网络、联系网络服务商、或把自己的网络配置好。方法训练的是修订，因为目标是产出好的*回复*的策略；批评只是让修订变好的脚手架，部署时模型应当直接作答，而不是先自我批评。
:::
:::

::: exercise 自我奖励循环中的自我偏好 {level=3}
某模型评审自己回复的对。把它每对的判断建模为对数几率 $\Delta + s(\ell_1 - \ell_2)$ 的 Bradley–Terry 模型，其中 $\Delta$ 是真实质量差，$\ell_i\in\{0, 1\}$ 表示回复 $i$ 是否带有模型偏爱的一种文风特征，$s > 0$ 是该偏爱的强度。(a) 若用它自己的标签做一轮 DPO，论证该特征的出现频率上升。(b) 解释第二轮以训练后的模型为评审时，$s$ 为何可能进一步增大。(c) 提出两个能发现这种漂移的检查。
::: solution
(a) 带着这种偏差的标签上做 DPO，会朝评审的奖励 $r = q + s\ell$ 的最优策略收敛（[[post-training/preference-optimisation#thm-optimal-policy]]），该策略把带特征回复的概率相对不带的乘上 $e^{s/\beta}$，其余条件相同；特征频率上升。(b) 下一轮评审就是训练后的模型。若它对特征的偏爱与其产出、见到该特征的频率相关——比如经由识别自己的文风，如 Panickssery 等在自我偏好上的发现——那么更常用该特征的策略，也可能成为更偏爱该特征的评审，$s$ 随之增长，循环把与质量无关的特征一路放大。整个循环里没有任何环节独立度量 $\Delta$。(c) 一是逐轮统计该特征（以及长度）的出现频率；二是在特征数量配平的固定留出集上，用模型判断与独立评审或人类标签的一致性，逐轮直接估计 $s$。
:::
:::

::: exercise 实现去偏标注 {level=3}
把[[#sec-code]]的程序扩展成给 Bradley–Terry 奖励模型标注数据：每对产生软标签 $\sigma\big(\frac12(\operatorname{logit}p_{12} + \operatorname{logit}p_{21})\big)$。在特征（质量、长度）上用软标签交叉熵做梯度下降，拟合线性奖励 $r = w_qq + w_\ell\ell$，并在运行之前预测拟合比值 $w_\ell/w_q$。
::: solution
由[[#prop-swap]]，去偏对数几率恰为 $k\big((q_1 - q_2) + v(\ell_1 - \ell_2)\big)$，而软标签交叉熵是恰当评分规则，所以拟合权重应收敛到 $w_q = k = 2$、$w_\ell = kv = 1$，比值 $v = 0.5$：位置偏差消失了，奖励模型却原样继承了评审对冗长的偏爱。

```python
import math, random
sig = lambda z: 1 / (1 + math.exp(-z))
logit = lambda p: math.log(p / (1 - p))
judge = lambda q1, q2, l1, l2: sig(2.0 * ((q1 - q2) + 0.5 * (l1 - l2)) + 0.8)
rng = random.Random(0)
data = []
for _ in range(5000):
    q1, q2, l1, l2 = (rng.gauss(0, 1) for _ in range(4))
    p12, p21 = judge(q1, q2, l1, l2), 1 - judge(q2, q1, l2, l1)
    data.append((q1 - q2, l1 - l2, sig(0.5 * (logit(p12) + logit(p21)))))
wq = wl = 0.0
for _ in range(500):
    gq = gl = 0.0
    for dq, dl, y in data:
        err = sig(wq * dq + wl * dl) - y          # 软标签交叉熵的梯度
        gq += err * dq; gl += err * dl
    wq -= 1.0 * gq / len(data); wl -= 1.0 * gl / len(data)
print(round(wq, 3), round(wl, 3), round(wl / wq, 3))
```

```text
2.0 1.0 0.5
```

拟合找回 $w_q = 2$、$w_\ell = 1$：去偏去掉了位置偏好，却没有去掉长度偏好——奖励模型如今按质量一半的权重把它编码了进去。
:::
:::
