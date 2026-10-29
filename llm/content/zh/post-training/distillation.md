大模型的推理服务昂贵；小模型便宜，却更弱。**知识蒸馏（knowledge distillation）**训练小模型——**学生（student）**——去模仿大模型——**教师（teacher）**——训出的学生往往远好于只用原始数据训练的同一个模型。原因在于，教师的输出比标签携带的信息多得多：不仅有“答案是 *Paris*”，还有每一个其他候选有多可信。对语言模型而言，这一思想已经发展成一整套实践。学生的训练数据可以是教师的完整下一词元分布、教师生成的序列，或者由教师撰写的大规模指令、解释与推理轨迹合成数据集——这是得到能力不俗的小模型最便宜的路径。同样的实践还引出了一个经典蒸馏中并不存在的问题：当模型一代又一代地用模型写出的文本训练时会发生什么？

本章从 Hinton、Vinyals 与 Dean（2015）的软目标讲起，推导他们的损失为何要乘以 $T^2$，以及它在高温下如何化为匹配 logits。然后转向序列模型：词级与**序列级蒸馏**（Kim 与 Rush，2016）、前向 KL 与反向 KL 的选择，以及在线策略蒸馏。接着综述后训练中的**合成数据（synthetic data）**——指令生成、解释轨迹、对推理做拒绝采样——并给出模仿究竟能迁移什么、不能迁移什么的证据。最后讨论**模型崩溃（model collapse）**：递归重拟合在两个简单模型中丢失多样性的证明、一个模拟实验，以及已发表的发现与随之而来的种种保留意见。

## 软目标 {#sec-soft}

用 one-hot 标签训练的分类器会把全部概率放在正确类别上。但一个训练充分的网络在*错误*类别上的概率是有信息量的：一张数字 2 的图像，网络认为它略微像 3、一点也不像 7，这就向学生透露了任务结构的某些东西。Hinton 等把这种信息称为**暗知识**（dark knowledge）。在温度 $1$ 下它几乎不可见——错误类别只得到极小的概率；把 softmax 的温度调高，它就显露出来。

::: definition 带温度的 softmax 与蒸馏损失 {#def-kd}
对 logits $\mathbf{z}\in\R^N$ 与**温度** $T > 0$，$p_i^{(T)} = \exp(z_i/T)/\sum_j\exp(z_j/T)$。设同一输入下教师的 logits 为 $\mathbf{v}$、学生的为 $\mathbf{z}$，软目标为 $\mathbf{q} = \operatorname{softmax}(\mathbf{v}/T)$，学生分布为 $\mathbf{p} = \operatorname{softmax}(\mathbf{z}/T)$。Hinton 等（2015）的**知识蒸馏损失**是

$$
\mathcal{L}_{\text{KD}} = (1 - \alpha)\,\mathrm{CE}\big(\mathbf{y}, \mathbf{p}^{(1)}\big) + \alpha\,T^2\,D_{\mathrm{KL}}\big(\mathbf{q}\,\Vert\,\mathbf{p}\big),
$$ {#eq-kd}

它以 $\alpha\in[0, 1]$ 为权重，把温度 $1$ 下对真实标签 $\mathbf{y}$ 的普通交叉熵，与温度 $T$ 下相对教师软目标的散度两项混合起来。测试时学生使用 $T = 1$。
:::

该散度与交叉熵 $-\sum_iq_i\log p_i$ 只差教师的熵一项，后者不依赖学生，因此两者梯度相同。抬高 $T$ 会把两个分布都压平，于是小概率之间的相对大小——哪些错误答案其实相当接近正确——便在损失中有了分量。

::: example 两个温度下的软目标 {#ex-soft}
教师对三个类别的 logits 为 $(5, 2, 1)$。计算它在 $T = 1$ 与 $T = 4$ 下的软目标。
::: solution
$T = 1$ 时：$e^5 : e^2 : e^1 = 148.4 : 7.39 : 2.72$，得 $(0.936, 0.047, 0.017)$。$T = 4$ 时：$e^{1.25} : e^{0.5} : e^{0.25} = 3.49 : 1.65 : 1.28$，得 $(0.543, 0.257, 0.200)$。$T = 1$ 时第二、第三类看起来同样无足轻重；$T = 4$ 时则看得出教师给第二类的评价明显高于第三类——这正是希望学生捕捉到的信息。
:::
:::

::: widget plot
f: exp(5/x)/(exp(5/x) + exp(2/x) + exp(1/x)); exp(2/x)/(exp(5/x) + exp(2/x) + exp(1/x)); exp(1/x)/(exp(5/x) + exp(2/x) + exp(1/x))
x: 0.3, 20
y: 0, 1
labels: class with logit $5$; class with logit $2$; class with logit $1$
vlines: 1; 4
caption: 温度 $T$ 逐渐增大时，logits $(5, 2, 1)$ 对应的教师软目标 $\operatorname{softmax}(\mathbf{v}/T)$。$T = 1$（左竖线）时几乎全部质量都在最高类上；$T = 4$（右竖线）时另外两类的排序清晰可见；$T\to\infty$ 时每个类别都趋于 $1/3$，目标携带的信息越来越少。Hinton 等依任务不同使用了大约 $2$ 到 $20$ 的温度。
:::

### 损失为何要按 $T^2$ 缩放 {#sec-t2}

::: proposition 蒸馏梯度及其高温极限 {#prop-kd-grad}
取[[#def-kd]]中的 $\mathbf{q}$ 与 $\mathbf{p}$，

$$
\frac{\partial}{\partial z_i}\Big(-\sum_jq_j\log p_j\Big) = \frac1T\,(p_i - q_i).
$$ {#eq-kd-grad}

若教师与学生的 logits 在 $N$ 个类别上均值为零，则当 $T\to\infty$ 时，

$$
\frac1T(p_i - q_i) = \frac{1}{NT^2}(z_i - v_i) + O(T^{-3}).
$$ {#eq-kd-limit}

因此软目标项的梯度按 $1/T^2$ 衰减；如[[#eq-kd]]那样把它乘以 $T^2$，其大小便大致与 $T$ 无关，而在高温极限下，蒸馏化为以平方误差 $\frac{1}{2N}\sum_i(z_i - v_i)^2$ 将学生 logits 对教师 logits 作回归。
:::

::: proof
softmax 交叉熵对其自身 logits 的梯度是预测分布减去目标（[[math-for-ml/gradients#prop-softmax-ce]]）。这里的 logits 是 $\mathbf{z}/T$，故链式法则多出一个因子 $1/T$：[[#eq-kd-grad]]。极限部分，展开 $e^{z_i/T} = 1 + z_i/T + O(T^{-2})$；由 $\sum_jz_j = 0$，分母为 $N + O(T^{-2})$，于是 $p_i = \frac1N(1 + z_i/T) + O(T^{-2})$，同理 $q_i = \frac1N(1 + v_i/T) + O(T^{-2})$。两式相减再除以 $T$ 即得[[#eq-kd-limit]]。右端恰为 $\frac{1}{2N}\sum_i(z_i - v_i)^2$ 的梯度乘以 $\frac{1}{T^2}$。
:::

这把蒸馏与它的前身联系起来：Buciluă、Caruana 与 Niculescu-Mizil（2006）用集成的输出训练单个模型来压缩集成，Ba 与 Caruana（2014）则通过对教师 logits 做回归来训练浅层学生。Hinton 等的温度在两者之间插值：$T$ 高时匹配 logits；$T$ 居中时忽略那些很负的 logits——它们可能是噪声，因为教师从未被训练去正确给出它们。

[[#sec-code]]中清单的第一部分用数值检验上面的结论：梯度范数从 $T = 1$ 到 $T = 50$ 大约缩小 $2{,}700$ 倍，而 $T^2$ 乘以它之后保持在 $0.54$ 到 $0.68$ 之间，并趋于匹配 logits 的值。

::: example 原论文中的结果 {#ex-mnist}
Hinton 等在 MNIST 手写数字上训练了一个大网络（测试错误 $67$ 个）和一个两隐层、每层 $800$ 个单元的小网络（用标签训练时测试错误 $146$ 个）。用 $T = 20$ 下大网络的软目标训练后，小网络犯 $74$ 个错误。蒸馏弥合了小网络与大网络之间差距的多大比例？
::: solution
差距为 $146 - 67 = 79$ 个错误；蒸馏消除了其中 $146 - 74 = 72$ 个，约 $91\%$。论文还报告：把数字 3 的全部样例从转移数据集中移除后，在调整一处偏置之后，蒸馏出的学生仍能把大多数测试的 3 分对——它完全凭教师在其他数字上的软概率学会了关于 3 的知识。
:::
:::

## 蒸馏序列模型 {#sec-sequence}

语言模型在每个位置都做一次预测，因此蒸馏既可以逐词元地匹配教师，也可以逐序列地匹配。

::: definition 词级与序列级蒸馏（Kim 与 Rush，2016）{#def-seqkd}
设 $p_T$ 与 $p_S$ 分别为教师与学生的自回归模型。**词级**（词元级）蒸馏在训练序列 $(\mathbf{x}, \mathbf{y})$ 上最小化逐位置交叉熵之和，每一项是给定真实前缀时教师与学生下一词元分布之间的交叉熵：

$$
\mathcal{L}_{\text{word}} = -\sum_t\sum_{w\in\mathcal{V}}p_T(w\mid\mathbf{x}, y_{<t})\log p_S(w\mid\mathbf{x}, y_{<t}).
$$

**序列级**蒸馏用教师整个序列分布的众数来近似该分布：把每个目标 $\mathbf{y}$ 换成教师的输出 $\hat{\mathbf{y}}$（来自束搜索或采样），再在 $(\mathbf{x}, \hat{\mathbf{y}})$ 上用普通 SFT 损失训练学生。
:::

词级蒸馏需要教师在每个位置的完整分布——每个词元 $|\mathcal{V}|$ 个数，通常截断到前几十个——而且训练期间必须运行教师，或把其输出存下来。序列级蒸馏只需要生成的文本，即便只能通过输出来访问教师也适用。Kim 与 Rush（2016）在神经机器翻译中发现序列级蒸馏尤其有效：学生不再需要束搜索就能表现良好（学生的贪心解码已接近束搜索），他们最好的学生比教师快约十倍而质量几乎无损；再经权重剪枝，参数减少 $13$ 倍，代价是 BLEU 下降 $0.4$。教师的输出比人工参考译文更简单、更一致——它们就是教师的众数——因而小模型更容易拟合。

由此看来，在模型生成的数据上做的指令微调大多就是序列级蒸馏：Alpaca 及其众多后继（[[post-training/instruction-tuning#sec-self-instruct]]）就是在教师的提示回复对上微调学生。完整的下一词元分布蒸馏则用于小模型的预训练：Gemma 2 报告（Gemma Team，2024）描述其较小模型的训练——用较大的教师的下一词元分布代替 one-hot 的下一词元来匹配，使用的词元数超过对学生而言计算最优的量。DeepSeek-R1 报告（DeepSeek-AI，2025）用 R1 生成的约 $800{,}000$ 条样本做 SFT，把推理能力蒸馏进其他家族的更小开放模型，并报告对一个 320 亿参数的基座模型，这比直接对小模型做大规模强化学习更有效。蒸馏出的学生也是投机解码（[[inference/speculative-decoding]]）的合格草稿模型；蒸馏与剪枝等其他模型收缩方法的比较见[[inference/model-compression]]。

### 前向还是反向 KL {#sec-kl-direction}

与 SFT 一样（[[post-training/instruction-tuning#prop-imitation]]），词级蒸馏在每个位置最小化**前向** KL $D_{\mathrm{KL}}(p_T\Vert p_S)$。一个太小而无法表示教师完整分布的学生于是被逼着去**覆盖**教师的所有模式，把概率放到教师不放概率的模式之间——就生成而言，这意味着产出教师的任何一种模式都不会产出的文本。**反向** KL $D_{\mathrm{KL}}(p_S\Vert p_T)$——强化学习目标所用的散度（[[post-training/rl-for-language-models#sec-kl]]）——惩罚学生把质量放到教师概率小的地方，因而更倾向于**锁定**某一个模式并把它拟合好。

::: example 前向与反向 KL 选不同的学生 {#ex-kl-direction}
教师对三个续写的分布为 $p_T = (0.49, 0.49, 0.02)$。学生只能是两个分布之一：尖锐的 $(0.9, 0.05, 0.05)$，或平坦的 $(\frac13, \frac13, \frac13)$。两个散度各偏好哪一个？
::: solution
前向：$D_{\mathrm{KL}}(p_T\Vert\text{尖锐}) = 0.49\ln\frac{0.49}{0.9} + 0.49\ln\frac{0.49}{0.05} + 0.02\ln\frac{0.02}{0.05} = 0.802$；$D_{\mathrm{KL}}(p_T\Vert\text{平坦}) = 0.321$。前向 KL 偏好平坦的学生：它覆盖了两个模式，却也给教师几乎不可能的第三个续写分了三分之一的概率。反向：$D_{\mathrm{KL}}(\text{尖锐}\Vert p_T) = 0.479$；$D_{\mathrm{KL}}(\text{平坦}\Vert p_T) = 0.681$。反向 KL 偏好尖锐的学生：它认准教师的某一个模式，几乎不会产出那个糟糕的续写。
:::
:::

Gu 等（2024，MiniLLM）用反向 KL 蒸馏语言模型，在学生自己的样本上用策略梯度优化，并报告其生成比用前向 KL 更精确。Agarwal 等（2024）提出**在线策略蒸馏**（generalised knowledge distillation，GKD）：学生生成序列，教师为其每个位置打分，学生在*自己*的前缀上最小化某个散度——前向、反向或二者混合。这消除了教师强制的训练–测试失配（[[pretraining/pretraining-objectives#sec-teacher-forcing]]）：学生学到的是教师在自己真正陷入的处境下会怎么做。在线策略蒸馏介于 SFT 与强化学习之间：教师的逐词元对数概率充当稠密奖励。

## 后训练中的合成数据 {#sec-synthetic}

用模型生成训练数据，如今在后训练的每个阶段都已司空见惯。主要模式如下，每种都有已发表的例子：

- **指令与回复。** Self-Instruct 与 Alpaca 生成了指令与回复（[[post-training/instruction-tuning#alg-self-instruct]]）；Evol-Instruct（Xu 等，2023，WizardLM）让模型把指令逐步改写得更为复杂；UltraChat（Ding 等，2023）让两个模型实例生成多轮对话。
- **解释。** Orca（Mukherjee 等，2023）用系统提示引出较强模型一步步的解释，以这些解释而非光秃的回复为训练数据训练较小的模型，并报告优于只模仿回复的结果。
- **过滤后的推理。** STaR（Zelikman 等，2022）让模型为问题生成理由，保留得出正确答案的那些，在其上微调，然后重复；带验证器的拒绝采样微调（[[post-training/rlhf#sec-alternatives]]）是同一思想。
- **偏好与反馈。** 由 AI 标注的偏好数据，如 UltraFeedback（[[post-training/ai-feedback#sec-self]]）。
- **预训练规模的改写**，见[[pretraining/data-mixtures#sec-synthetic]]。

质量控制往往才是最要紧的部分：去重、用评审模型或验证器过滤、对评估集去污染（[[evaluation/contamination]]），以及多样性检查。

::: warning 模仿学到风格比学到能力容易
Gudibande 等（2023）在某个强专有聊天模型的输出上微调开放模型，发现众包评审给模仿者的评分很高——它们听起来像教师——而针对性评估显示，它们在事实准确性与解题上的差距几乎没有缩小。学生可以从不大的数据集里学到教师的语气、格式与自信；而产出那些答案背后的知识与推理，则需要远更多的数据、强得多的学生，或两者兼备。评估蒸馏模型要看能力，而不是看它们有多像教师。
:::

另两点告诫与技术无关。一些模型服务商的服务条款限制用其输出训练竞品模型；合成数据还会继承教师的错误、偏见与盲区，在多个教师的输出上训练的学生可能把这些一并积累下来。数据来源与允许用途的问题见[[llm-society/copyright-provenance]]。

::: example 序列级蒸馏的成本 {#ex-cost}
一个团队用 700 亿参数的教师生成 $10^6$ 条、每条 $500$ 词元的回复，并在其上对 80 亿参数的学生微调 $2$ 个轮次。按每个生成词元 $2N$ FLOPs、每个训练词元 $6N$ FLOPs 计算，比较两项开销。若经验证器过滤后每 $4$ 条只保留 $1$ 条，生成开销如何变化？
::: solution
生成：$10^6\cdot500\cdot2\cdot7\times10^{10} = 7\times10^{19}$ FLOPs。训练：$10^6\cdot500\cdot2\cdot6\cdot8\times10^9 = 4.8\times10^{19}$ FLOPs。生成比训练更贵，而且生成每个 FLOP 的耗时也更慢，因为它受内存带宽限制（[[inference/latency-cost]]）。每 $4$ 条保留 $1$ 条意味着同样的训练集需要生成 $4\times10^6$ 条回复：$2.8\times10^{20}$ FLOPs，是训练开销的六倍。按质量过滤通常值得，但合成数据并不免费。
:::
:::

## 模型崩溃 {#sec-collapse}

如果一代模型的输出成为下一代模型的训练数据，如此往复，会发生什么？每一代拟合的都是来自上一代模型的有限样本。稀有事件可能不出现在有限样本里；从未见过它们的模型就不给它们概率；其样本于是也永远不含它们。两个简单模型可以把这件事说得严丝合缝。

::: proposition 高斯分布的递归重拟合丢失方差 {#prop-gaussian-collapse}
设 $\sigma_0^2 > 0$。每一代 $n$ 从 $\Normal(\mu_n, \sigma_n^2)$ 抽取 $M\ge2$ 个独立样本，并令 $\mu_{n+1}$、$\sigma_{n+1}^2$ 为其最大似然估计（样本均值，以及以 $M$ 为除数的方差）。则

$$
\E\big[\sigma_n^2\big] = \Big(1 - \frac1M\Big)^n\sigma_0^2\ \to\ 0.
$$
:::

::: proof
对高斯样本，给定 $\sigma_n$ 时最大似然方差满足 $M\sigma_{n+1}^2/\sigma_n^2\sim\chi^2_{M-1}$，故 $\E[\sigma_{n+1}^2\mid\sigma_n^2] = \frac{M-1}{M}\sigma_n^2$（[[math-for-ml/estimation#prop-gaussian-mle]]）。两边取期望并迭代即得公式。
:::

偏置 $\frac{M-1}{M}$ 是最大似然方差那个熟悉的偏置，逐代复利累积。改用无偏估计量能消除期望的衰减，却消不掉崩溃：此时 $\log\sigma_n^2$ 是一个带负漂移的随机游走（由琴生（Jensen）不等式，$\E[\log s^2] < \log\E[s^2]$），方差仍然以概率 $1$ 趋于零——这正是 Shumailov 等（2024）对这个模型给出的分析。

对类别分布——词表，或一组事实、风格或答案——对应的结论关于多样性。

::: proposition 类别分布的递归重拟合 {#prop-cat-collapse}
设 $\mathbf{p}_n$ 是 $K$ 个类别上的分布，$\mathbf{p}_{n+1}$ 是从 $\mathbf{p}_n$ 抽取的 $M$ 个独立样本的经验分布。则：
1. $\E[\mathbf{p}_{n+1}\mid\mathbf{p}_n] = \mathbf{p}_n$：每个概率都是鞅。
2. 若 $p_{n,k} = 0$，则对所有 $m > n$ 有 $p_{m,k} = 0$；给定 $\mathbf{p}_n$ 时，下一代期望丢失的类别数为 $\sum_{k:p_{n,k}>0}(1 - p_{n,k})^M$。
3. **Gini 多样性** $D(\mathbf{p}) = 1 - \sum_kp_k^2$（两次独立抽取结果不同的概率）的期望按几何速度衰减：$\E[D(\mathbf{p}_{n+1})\mid\mathbf{p}_n] = \big(1 - \frac1M\big)D(\mathbf{p}_n)$，故 $\E[D(\mathbf{p}_n)] = (1 - \frac1M)^nD(\mathbf{p}_0)\to0$。
:::

::: proof
类别 $k$ 的计数服从二项分布，$M p_{n+1,k}\sim\Bin(M, p_{n,k})$。(1) 其均值为 $Mp_{n,k}$。(2) 概率为 $0$ 的类别永不会被抽到；类别不出现在样本中的概率为 $(1 - p_{n,k})^M$，求和即得期望丢失数。(3) $\E[p_{n+1,k}^2] = \Var(p_{n+1,k}) + p_{n,k}^2 = \frac{p_{n,k}(1 - p_{n,k})}{M} + p_{n,k}^2$。对 $k$ 求和，$\E[\sum_kp_{n+1,k}^2] = \sum_kp_{n,k}^2 + \frac{1}{M}\big(1 - \sum_kp_{n,k}^2\big)$，故 $\E[1 - \sum_kp_{n+1,k}^2] = (1 - \frac1M)(1 - \sum_kp_{n,k}^2)$。
:::

第 1 条才是微妙之处：期望之下没有类别增减概率，因而没有向分布头部系统性的漂移。然而类别却一个接一个随机地消亡，一去不返，分布越来越集中：这就是群体遗传学中 Wright–Fisher 模型的**遗传漂变**（genetic drift），类别相当于等位基因。最终某个单一类别将吞掉全部质量。

::: widget plot
f: (1 - 1/m)^x
x: 0, 200
y: 0, 1
sliders: m=50:2:500:1
labels: expected diversity remaining $(1 - 1/M)^n$
caption: 经过 $n$ 代对上一代模型 $M$ 个样本的重拟合后，原始方差（高斯）或 Gini 多样性（类别分布）的期望保留比例（[[#prop-gaussian-collapse]]、[[#prop-cat-collapse]]），滑块 $m$ 即 $M$。多样性约在 $0.69M$ 代后减半：只要每一代只见到上一代模型的输出，更大的样本只会延缓崩溃，而不能阻止它。
:::

### 一个模拟实验：替换与累积 {#sec-code}

下面的清单先检验[[#prop-kd-grad]]，然后模拟一个类别型“语言模型”的递归训练：$K = 1{,}000$ 个类别，频率服从 Zipf 分布 $p_k\propto1/k$。第 $0$ 代拟合 $2{,}000$ 个真实样本；其后每一代从当前模型抽 $2{,}000$ 个样本并重拟合——要么只用这批样本（**替换**），要么用迄今的全部数据，真实与合成都算（**累积**），这两种制度正是 Gerstgrasser 等（2024）比较的两种。

```python
import math, random

def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) for v in z]; s = sum(e)
    return [x / s for x in e]

# 1. 软目标与蒸馏梯度的 T^2 缩放
v = [3.0, 0.5, -0.5, -1.0, -2.0]                  # 教师 logits（零均值）
z = [1.0, 1.0, -1.0, -0.5, -0.5]                  # 学生 logits（零均值）
N = len(v)
print(" T   soft targets q(T)                     |grad|      T^2*|grad|  T^2*|approx|")
for T in (1, 2, 5, 10, 20, 50):
    q, p = softmax(v, T), softmax(z, T)
    g = [(pi - qi) / T for pi, qi in zip(p, q)]               # d CE(q, p) / d z_i
    a = [(zi - vi) / (N * T * T) for zi, vi in zip(z, v)]     # 高温近似
    norm = math.sqrt(sum(x * x for x in g)); anorm = math.sqrt(sum(x * x for x in a))
    print(f"{T:2d}   {' '.join(f'{x:.3f}' for x in q):34s}  {norm:.6f}   {T * T * norm:.4f}      {T * T * anorm:.4f}")

# 2. 类别分布的模型崩溃：每一代都用它自己的样本重拟合
K, M, gens = 1000, 2000, 20
zipf = [1 / k for k in range(1, K + 1)]; Z = sum(zipf); p0 = [w / Z for w in zipf]
tail0 = sum(p0[100:]); H0 = -sum(x * math.log(x) for x in p0)
def refit(counts):
    n = sum(counts); return [c / n for c in counts]
for mode in ("replace", "accumulate"):
    rng = random.Random(0)
    model, pool = p0[:], [0] * K
    for _ in range(M):                                        # 第 0 代：真实数据
        pool[rng.choices(range(K), weights=p0)[0]] += 1
    model = refit(pool)
    report = []
    for g in range(1, gens + 1):
        sample = [0] * K
        for k in rng.choices(range(K), weights=model, k=M):
            sample[k] += 1
        if mode == "replace":
            pool = sample                                     # 只训练于最新的合成数据
        else:
            pool = [a + b for a, b in zip(pool, sample)]      # 保留全部真实与合成数据
        model = refit(pool)
        if g in (1, 5, 10, 20):
            alive = sum(1 for x in model if x > 0)
            tail = sum(model[100:])
            H = -sum(x * math.log(x) for x in model if x > 0)
            report.append(f"gen {g:2d}: {alive:3d} categories, tail mass {tail:.3f}, entropy {H:.3f} nats")
    print(f"{mode:10s} (true: {K} categories, tail mass {tail0:.3f}, entropy {H0:.3f})")
    print("   " + "\n   ".join(report))
```

```text
 T   soft targets q(T)                     |grad|      T^2*|grad|  T^2*|approx|
 1   0.879 0.072 0.027 0.016 0.006       0.594469   0.5945      0.5292
 2   0.596 0.171 0.104 0.081 0.049       0.170583   0.6823      0.5292
 5   0.342 0.208 0.170 0.154 0.126       0.024369   0.6092      0.5292
10   0.266 0.207 0.187 0.178 0.161       0.005689   0.5689      0.5292
20   0.232 0.204 0.194 0.190 0.180       0.001372   0.5486      0.5292
50   0.212 0.202 0.198 0.196 0.192       0.000215   0.5368      0.5292
replace    (true: 1000 categories, tail mass 0.307, entropy 5.191)
   gen  1: 397 categories, tail mass 0.318, entropy 4.889 nats
   gen  5: 231 categories, tail mass 0.291, entropy 4.540 nats
   gen 10: 159 categories, tail mass 0.291, entropy 4.277 nats
   gen 20:  95 categories, tail mass 0.255, entropy 3.814 nats
accumulate (true: 1000 categories, tail mass 0.307, entropy 5.191)
   gen  1: 512 categories, tail mass 0.314, entropy 4.974 nats
   gen  5: 512 categories, tail mass 0.309, entropy 4.935 nats
   gen 10: 512 categories, tail mass 0.309, entropy 4.923 nats
   gen 20: 512 categories, tail mass 0.308, entropy 4.916 nats
```

连第 $0$ 代都已丢掉近一半的 $1{,}000$ 个类别：从 Zipf 分布抽 $2{,}000$ 个样本会漏掉约 $500$ 个稀有类别——有限样本造成的尾部丢失。替换式之下，丢失层层叠加：$20$ 代后只剩 $95$ 个类别，熵从 $5.19$ 纳特跌到 $3.81$ 纳特；而尾部（排在第一百之后的类别）的总质量只有波动、没有明显趋势，正如[[#prop-cat-collapse]]第 1 条所预言——尾部的期望质量并不收缩，只是被更少、更大的幸存者接替。累积式之下，真实数据始终留在数据池中，见过的类别永远保留，模型稳定在与第 $0$ 代拟合相近的地方。

### 已发表研究的发现 {#sec-collapse-findings}

Shumailov 等（《自然》（Nature），2024）分析了这些机制，并在高斯混合、变分自编码器与语言模型上用实验演示了崩溃：一个 OPT-125m 模型在上一代模型生成的文本上递归微调后，在原始数据上的困惑度不断升高，自身典型的、低困惑度输出的概率不断增大，尾部最先丢失。他们区分了早期崩溃（尾部消失）与晚期崩溃（分布收敛到一个方差很小的分布），并报告每一代保留一定比例（某次实验中为 $10\%$）的原始数据能大幅减轻退化。相关工作在图像生成器上发现了类似的效应（Alemohammad 等，2024，“自我消耗”（self-consuming）的模型）。

这些保留意见与发现本身同等重要。实验中每一代都用合成数据替换真实数据；Gerstgrasser 等（2024）证明——线性模型是理论上、若干模型类型上是经验上——当合成数据与真实数据**累积**并存而非替换它们时，误差保持有界。实际流程很少只在某单一前代模型的未过滤样本上训练：它们用验证器和评审过滤、混合多个来源、保留人类撰写的材料，而按正确性过滤甚至能*增添*单靠采样得不到的信息（[[post-training/rlhf#sec-alternatives]]）。而且简单模型里的递归只是纯采样噪声，没有新鲜信号。这些结果确立的是**替换式的无过滤自训练会丢失多样性**；按实际发生的比例与过滤方式，网络上的合成文本会在多大程度上拖垮未来在网络抓取数据上训练的模型，到 2026 年仍是一个悬而未决的经验问题。

::: quiz
在模拟中，为什么“累积”那次运行从第 $0$ 代以后就不再丢失类别？
- [ ] 因为合成样本比真实样本更多样
- [x] 因为真实数据中出现过的每个类别都在数据池中永远保有非零计数
- [ ] 因为累积消除了每代拟合中的采样噪声
- [ ] 因为合并样本的 Gini 多样性总是增大
::: solution
数据池保留了真实样本，所以真实数据中出现过的类别始终有正计数，拟合出的模型就给它们正概率（[[#prop-cat-collapse]] 的第 2 条只适用于计数为零的类别）。每代仍有采样噪声，但它在数据池中的权重随池子增大而变小。最初的 $2{,}000$ 个真实样本漏掉的类别永远回不来了——真实数据无法用更多合成数据替代。
:::
:::

::: history
Buciluă、Caruana 与 Niculescu-Mizil（2006）用大型集成在无标签数据上的预测训练小模型，开创了模型压缩；Ba 与 Caruana（2014）匹配 logits；Hinton、Vinyals 与 Dean（NIPS 研讨会 2014，arXiv 2015）引入带温度的软目标，并提出“蒸馏”一词。FitNets（Romero 等，2015）匹配中间表征。Kim 与 Rush（EMNLP 2016）为翻译定义了序列级蒸馏；DistilBERT（Sanh 等，2019）、TinyBERT（Jiao 等，2020）与 MiniLM（Wang 等，2020）蒸馏了预训练 Transformer。合成指令数据自 2022–2023 年随 STaR、Self-Instruct、Alpaca、Evol-Instruct 与 Orca 流行开来，Gudibande 等（2023）则为模仿敲响了警钟。MiniLLM（Gu 等，2024）与 GKD（Agarwal 等，2024）把反向 KL 与在线策略蒸馏带入语言模型，Gemma 2（2024）与 DeepSeek-R1（2025）描述了预训练与推理中的大规模蒸馏。模型崩溃由 Shumailov 等（arXiv 2023、《自然》2024）与 Alemohammad 等（2024）分析，累积所扮演的角色见 Gerstgrasser 等（2024）；其底层的漂变就是群体遗传学中 Wright–Fisher 模型的漂变（Fisher，1930；Wright，1931）。
:::

::: summary
- **知识蒸馏**用教师的软目标 $\operatorname{softmax}(\mathbf{v}/T)$ 训练学生，揭示各个错误答案的相对可信度；损失由标签交叉熵与 $T^2$ 倍的、对软目标的 KL 两项混合而成。
- 软目标梯度是 $(p_i - q_i)/T$，按 $1/T^2$ 衰减；$T^2$ 因子保住了尺度，而在高温、零均值 logits 之下蒸馏化为**匹配 logits**（[[#prop-kd-grad]]）。
- 对语言模型，**词级**蒸馏匹配下一词元分布（前向 KL，模式覆盖），**序列级**蒸馏在教师输出上训练——这是大多数合成指令微调的基础。**反向 KL** 与**在线策略**蒸馏（MiniLLM、GKD）让学生锁定模式、在自己的前缀上学习。
- **合成数据**——指令、解释、过滤后的推理、AI 偏好——在后训练中已是常规；模仿迁移风格容易、迁移能力难，质量控制是主要工作。
- 递归重拟合丢失多样性：高斯方差按 $(1 - 1/M)^n$ 的期望速度衰减，类别的 Gini 多样性亦然，类别不可逆地一一消亡，尽管每个概率都是鞅。**模型崩溃**（Shumailov 等，2024）在合成数据**替换**真实数据时很严重，在合成数据与真实数据**累积**并存时则大体可以避免（Gerstgrasser 等，2024）。
:::

## 习题

::: exercise 软目标 {level=1 check="0.2689"}
教师对两个类别的 logits 为 $(2, 0)$。它在 $T = 2$ 下的 softmax 给第二个类别多大概率？保留四位小数。
::: solution
$\operatorname{softmax}((1, 0)) = (e/(1 + e), 1/(1 + e))$，所以第二个类别得到 $1/(1 + e) = \sigma(-1) = 0.2689$；而 $T = 1$ 时只有 $\sigma(-2) = 0.1192$。
:::
:::

::: exercise 软梯度的大小 {level=1 check="0.04"}
忽略[[#eq-kd-limit]]的 $O(T^{-3})$ 修正项，$T = 5$ 时的软目标梯度比 $T = 1$ 时小多少倍？倍数用小数表示。
::: solution
梯度按 $1/T^2$ 缩放，故倍数为 $1/25 = 0.04$。把软目标项乘以 $T^2 = 25$，就恢复了它与硬标签项的相对尺度。
:::
:::

::: exercise 递归重拟合后的方差 {level=1 check="0.9044"}
一个高斯分布被递归地以最大似然重拟合到上一次拟合的 $M = 100$ 个样本上，共 $n = 10$ 代。期望还剩下原始方差的多少？保留四位小数。
::: solution
由[[#prop-gaussian-collapse]]，$(1 - 1/100)^{10} = 0.99^{10} = 0.9044$。
:::
:::

::: exercise 一代丢失的类别数 {level=2 check="0.3677"}
一个分布有 $1{,}000$ 个等概率类别。用 $M = 1{,}000$ 个样本拟合模型。模型期望丢失多大比例的类别？保留四位小数。若 $M = 5{,}000$ 又会丢失多少？
::: solution
由[[#prop-cat-collapse]]，每个类别被漏掉的概率为 $(1 - 1/1000)^{1000} = 0.3677$，接近 $1/e = 0.3679$，所以模型一代就丢失约 $37\%$ 的类别。$M = 5{,}000$ 时：$(0.999)^{5000} = 0.0067$，不足 $1\%$。
:::
:::

::: exercise 匹配 logits {level=2 check="-0.2"}
教师 logits $(1, 0, -1)$ 与学生 logits $(0.4, -0.2, -0.2)$ 均为零均值。用[[#eq-kd-limit]]计算 $T\to\infty$ 极限下 $T^2$ 乘以对第一个学生 logit 的软目标梯度。梯度下降的一步会把该 logit 推向哪个方向？
::: solution
$T^2\cdot\frac{1}{NT^2}(z_1 - v_1) = \frac13(0.4 - 1) = -0.2$。梯度为负，故梯度下降抬高 $z_1$，朝教师的值 $1$ 去。另外两个分量是 $\frac13(-0.2 - 0) = -0.067$ 与 $\frac13(-0.2 + 1) = 0.267$；它们之和为零——零均值 logits 的梯度必须如此。
:::
:::

::: exercise 前向还是反向？ {level=2}
设教师为两个续写上的分布 $p_T = (0.6, 0.4)$，学生族为 $\{(q, 1-q)\}$。证明前向 KL 与反向 KL 都在 $q = 0.6$ 处取最小值。为什么只有当学生族无法表示教师时，两个散度的差别才要紧？
::: solution
两个散度都非负，且恰在两个分布相等时为零（[[math-for-ml/information-theory#thm-gibbs]]），而 $q = 0.6$ 令两者相等，故它同时最小化两个散度。两个散度的不同在于对*误差*的加权：在 $p_{T,i} > 0$ 处前向 KL 重罚 $q_i\to0$，在 $p_{T,i}\to0$ 处反向 KL 重罚 $q_i > 0$。学生能精确匹配教师时没有误差可加权，两者都选教师；不能时——如[[#ex-kl-direction]]——两者便选出不同的折中。
:::
:::

::: exercise 蒸馏数据的存储 {level=2 check="19"}
一个 70 亿参数的学生用教师的 top-$k$ 下一词元概率做词级蒸馏训练，每个位置存储（$k$ 个词元 id，$k$ 个概率），id 占 $4$ 字节、概率占 $2$ 字节。设 $k = 32$，数据集有 $10^8$ 个词元，必须存下多少 GB 的教师输出？答案取最接近的整数 GB。
::: solution
每个位置：$32\cdot(4 + 2) = 192$ 字节。$10^8$ 个位置共 $1.92\times10^{10}$ 字节，约 $19$ GB。若要存储 $128{,}000$ 词元词表上的完整分布、每个概率 $2$ 字节，则需要 $10^8\cdot2.56\times10^5 = 2.56\times10^{13}$ 字节，即 $25.6$ TB——这正是要采用 top-$k$ 截断、或让教师与学生并行运行的原因。
:::
:::

::: exercise Gini 多样性递推 {level=3}
对 $K = 10$ 个类别上的均匀分布、$M = 20$，用数值验证[[#prop-cat-collapse]]的第 3 条：计算 $D(\mathbf{p}_0)$ 与预测的 $\E[D(\mathbf{p}_5)]$，再用纯 Python 模拟 $10{,}000$ 条五代长的链来估计它。然后解释为什么 $(1 - 1/M)^n$ 也出现在[[#prop-gaussian-collapse]]中。
::: solution
$D(\mathbf{p}_0) = 1 - 10\cdot0.01 = 0.9$，预测值为 $0.9\cdot0.95^5 = 0.6964$。

```python
import random
rng = random.Random(0)
K, M, n, chains = 10, 20, 5, 10000
total = 0.0
for _ in range(chains):
    p = [1 / K] * K
    for _ in range(n):
        counts = [0] * K
        for k in rng.choices(range(K), weights=p, k=M):
            counts[k] += 1
        p = [c / M for c in counts]
    total += 1 - sum(x * x for x in p)
print(round(total / chains, 4), round(0.9 * (1 - 1 / M) ** n, 4))
```

```text
0.6943 0.6964
```

模拟均值 $0.6943$ 在蒙特卡洛误差内与预测一致。高斯情形出现同一个因子，是因为这两个量都是用 $M$ 个样本作代入（plug-in）估计得到的“概率加权的分散程度”：样本的代入方差，以及两次抽取结果不同的代入概率，都恰好按因子 $(M-1)/M$ 低估总体值，因为一个抽取值与自身比较不贡献任何分散度。对代入估计量逐代迭代，就把这个偏置滚成了复利。
:::
:::

::: exercise 作为强化学习的在线策略蒸馏 {level=3}
在采用反向 KL 的在线策略蒸馏中，学生 $p_S$ 采样 $\mathbf{y}$ 并最小化 $\E_{\mathbf{y}\sim p_S}\big[\log p_S(\mathbf{y}\mid\mathbf{x}) - \log p_T(\mathbf{y}\mid\mathbf{x})\big]$。证明这就是[[post-training/rl-for-language-models#def-kl-objective]]中取某个特定奖励与 $\beta$ 的 KL 正则强化学习目标，并用[[post-training/preference-optimisation#thm-optimal-policy]]找出它的最优解。若再以权重 $1$ 加入任务奖励 $R$，情形有何变化？
::: solution
最小化 $\E_{p_S}[\log p_S - \log p_T]$ 就是最大化 $\E_{p_S}[\log p_T(\mathbf{y}\mid\mathbf{x})] - \E_{p_S}[\log p_S(\mathbf{y}\mid\mathbf{x})]$，即奖励为 $r = \log p_T$ 的熵正则目标；等价地，它就是 $-D_{\mathrm{KL}}(p_S\Vert p_T)$，即奖励为 $0$、参考分布 $\pi_{\text{ref}} = p_T$、$\beta = 1$ 的 KL 正则目标。由定理，最优解为 $\pi^\star\propto p_Te^{0} = p_T$：学生理应变为教师，不出所料；逐词元的对数比 $\log p_T - \log p_S$ 充当稠密奖励（[[post-training/rl-for-language-models#prop-kl-tokens]]）。加入任务奖励后，目标为 $\E_{p_S}[R] - D_{\mathrm{KL}}(p_S\Vert p_T)$，其最优解是 $\pi^\star\propto p_Te^{R}$：教师在高分输出方向上倾斜——以教师为参考策略的 RLHF。
:::
:::
