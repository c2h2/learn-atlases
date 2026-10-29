前面两章搭好了零件：带 KL 惩罚的策略梯度优化器（[[post-training/rl-for-language-models]]），以及从比较中学到的奖励模型（[[post-training/reward-models]]）。**基于人类反馈的强化学习**（RLHF）把它们装配到一起。先用一个监督模型收集比较，据此拟合奖励模型，再用 PPO 对着奖励模型优化策略，同时用 KL 惩罚把它锚定在监督模型附近。这一配方在 2022 年的 InstructGPT 中有详尽描述，它造出了第一批被广泛使用的聊天助手，并且直到今天仍是本课程后续所有方法的参照点。

本章把这一配方从机器人领域的源头讲到语言模型，一字不差地陈述 InstructGPT 的目标，并带着走一遍 PPO 版 RLHF 的一次迭代：它的四个模型、显存开销，以及轨迹生成（rollout）、奖励与优势的账目。我们证明 KL 正则优化的基本权衡——惩罚一放松，奖励与散度就同时上升——并在一个玩具策略中展示奖励破解的出现。随后讨论 RLHF 对模型造成的有意与无意的改变，以及常常取代 PPO 的那些更简单的替代方案。

## 起源 {#sec-origins}

**Deep RL from human preferences**（Christiano 等，2017）在模拟机器人和 Atari 游戏中训练智能体，而不需要手写奖励。人观看智能体行为的成段短视频片段，指出哪段更好；用 Bradley–Terry 损失把这些比较拟合进奖励模型；再让智能体对着奖励模型做强化学习，其间不断送新片段去比较。论文例如报告：约 $900$ 次比较、不到一小时就教会了一个模拟机器人做空翻——而为此写一个奖励函数是相当别扭的事。定义 RLHF 的三样原料在此齐备：比较、学得的奖励模型、以及对着它边收集数据边做的强化学习。

**Ziegler 等（2019）**把该方法用于预训练语言模型（GPT-2）做风格化续写与摘要，并把对预训练模型的 KL 惩罚引入奖励。他们的摘要模型还出现了早期“优化标注者**所奖励的**而非**所希望的**”的例子：策略学会了从文章里照抄整句，而标注者会把这些句子评为准确。**Stiennon 等（2020）**把这条路线扩展到 Reddit 帖子摘要，模型最大到 $67$ 亿参数，并格外注意标注质量，结果发现：RLHF 策略生成的摘要在人类眼中比数据集里人写的参考摘要更受偏爱——而当 KL 系数取小、对奖励模型优化过头时，即便奖励还在上升，摘要在人类评判中反而变差了。

## InstructGPT 流程 {#sec-instructgpt}

**InstructGPT**（Ouyang 等，2022）把 RLHF 用于 GPT-3 以遵循一般指令，提示来自某 API 用户的提交，外加约 $40$ 名签约标注者撰写的提示。

::: algorithm 三阶段 RLHF 流程（InstructGPT）{#alg-pipeline}
1. **监督微调。** 标注者为一组提示（约 $13{,}000$ 条训练提示）撰写期望行为的示范。用 SFT 损失（[[post-training/instruction-tuning#def-sft]]）在示范上微调预训练模型，得到 $\pi^{\text{SFT}}$。
2. **奖励建模。** 对另一组提示（约 $33{,}000$ 条），从若干可用模型采样多个回复，让标注者排序，然后在全部两两比较上训练奖励模型 $r_\phi$（[[post-training/reward-models#eq-rm-loss]]），它由一个监督模型（$60$ 亿参数）初始化。
3. **强化学习。** 策略 $\pi_\theta$ 与价值模型分别从 $\pi^{\text{SFT}}$ 和 $r_\phi$ 初始化，再在又一批提示（约 $31{,}000$ 条）上用 PPO 优化策略，最大化目标[[#eq-instructgpt]]。

第 2、3 阶段可以重复：对新策略输出的比较能训练出更好的奖励模型，再用于下一轮强化学习。
:::

::: example 需要多少两两比较？ {#ex-comparisons}
InstructGPT 的奖励模型数据覆盖约 $33{,}000$ 条提示，每条有 $4$ 到 $9$ 个排好序的回复。两两比较的总数落在什么范围之内？若每条提示恰有 $6$ 个回复，回复与比较各有多少？
::: solution
$K$ 个回复的排序给出 $\binom K2$ 次比较：从 $\binom42 = 6$ 到 $\binom92 = 36$。因此数据中两两比较介于 $33{,}000\cdot6 = 198{,}000$ 与 $33{,}000\cdot36 = 1{,}188{,}000$ 之间。若每条提示 $6$ 个回复，标注者要给 $198{,}000$ 个回复排序，每条提示产生 $\binom62 = 15$ 次比较，共 $495{,}000$ 次。排序是收集比较的高效方式，不过同一次排序给出的比较并不相互独立——这正是训练时把它们放在一起的原因（[[post-training/reward-models#sec-architecture]]）。
:::
:::

::: definition InstructGPT 目标 {#def-instructgpt}
强化学习阶段最大化

$$
\mathcal{J}(\theta) = \E_{\mathbf{x}\sim\mathcal{D}_{\text{RL}},\ \mathbf{y}\sim\pi_\theta(\cdot\mid\mathbf{x})}\Big[r_\phi(\mathbf{x}, \mathbf{y}) - \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi^{\text{SFT}}(\mathbf{y}\mid\mathbf{x})}\Big] + \gamma\,\E_{\mathbf{x}\sim\mathcal{D}_{\text{pretrain}}}\big[\log\pi_\theta(\mathbf{x})\big].
$$ {#eq-instructgpt}

第一项是[[post-training/rl-for-language-models#def-kl-objective]]中的 KL 正则奖励，参考模型取 SFT 模型。第二项在 $\gamma > 0$ 时（“PPO-ptx”变体）混入预训练数据的普通语言建模似然；$\gamma = 0$ 时就是纯 PPO。
:::

预训练项针对的是**对齐税**：只用 PPO 做 RLHF 会相对 GPT-3 在若干公开 NLP 基准（包括问答、阅读理解与翻译数据集）上退化性能，而混入预训练梯度能减轻这些退化，又不损害标注者偏好。最醒目的结果是：标注者更喜欢 $13$ 亿参数的 InstructGPT 的输出而不是 $1750$ 亿参数 GPT-3 的输出——尽管参数相差一百倍——并且在约 $85\%$ 的比较中，$1750$ 亿参数的 InstructGPT 胜过 GPT-3。论文还测得 TruthfulQA 上的诚实性有小幅提升、被要求保持尊重时有害输出减少，但在偏见基准上没有改进——并且指出模型连有害指令也会照办，这一局限由后来的工作解决（[[post-training/ai-feedback]]）。

Anthropic 的**有用且无害助手**（Bai 等，2022a）描述了并行的流程：有用性与无害性各用各的数据，并发现两个目标互相拉扯；比较**在线**地从逐代更新的策略收集，奖励模型每周更新；论文还报告模型越大，基准上付出的对齐税越小。文中另有一条经验规律：在训练的绝大部分时间里，策略的奖励大致与 $\sqrt{D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})}$ 成线性关系——这正是 Gao 等后来采用的坐标轴（[[post-training/reward-models#prop-gao]]）。

## 奖励与散度的权衡 {#sec-tradeoff}

KL 系数 $\beta$ 决定奖励模型被优化到什么强度。对正则目标的优解，这个效应可以精确写出来——如[[post-training/preference-optimisation#thm-optimal-policy]]所证，优解是**倾斜的**（tilted）参考策略 $\pi_\beta(\mathbf{y}\mid\mathbf{x})\propto\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\,e^{r(\mathbf{x}, \mathbf{y})/\beta}$。

::: proposition 更弱的惩罚以散度换取奖励 {#prop-frontier}
固定一个提示，记 $\lambda = 1/\beta$，设 $\pi_\lambda(\mathbf{y})\propto\pi_{\text{ref}}(\mathbf{y})e^{\lambda r(\mathbf{y})}$，配平因子为 $Z(\lambda) = \E_{\pi_{\text{ref}}}[e^{\lambda r}]$。设奖励有界，则

$$
\frac{d}{d\lambda}\E_{\pi_\lambda}[r] = \Var_{\pi_\lambda}(r)\ \ge 0,\qquad \frac{d}{d\lambda}D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}) = \lambda\Var_{\pi_\lambda}(r)\ \ge 0,
$$

因此 $\beta$ 减小时期望奖励与散度都增大，且沿这条曲线，边际汇率为 $\frac{d\,\E[r]}{d\,D_{\mathrm{KL}}} = \frac1\lambda = \beta$。
:::

::: proof
$\log Z(\lambda)$ 是 $r$ 在 $\pi_{\text{ref}}$ 下的累积量生成函数。在（有限或被控制的）求和号下求导，$\frac{d}{d\lambda}\log Z = \E_{\pi_{\text{ref}}}[re^{\lambda r}]/Z = \E_{\pi_\lambda}[r]$，再导一次，$\frac{d^2}{d\lambda^2}\log Z = \E_{\pi_\lambda}[r^2] - \E_{\pi_\lambda}[r]^2 = \Var_{\pi_\lambda}(r)$。至于散度，$\log\frac{\pi_\lambda}{\pi_{\text{ref}}} = \lambda r - \log Z$，于是 $D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}) = \lambda\E_{\pi_\lambda}[r] - \log Z(\lambda)$；其导数为 $\E_{\pi_\lambda}[r] + \lambda\Var_{\pi_\lambda}(r) - \E_{\pi_\lambda}[r] = \lambda\Var_{\pi_\lambda}(r)$。两导数相除即得汇率。
:::

::: example 手算倾斜策略 {#ex-tilt}
某提示有三个回复，参考概率为 $(0.5, 0.3, 0.2)$，奖励为 $(0, 1, 2)$。计算 $\beta = 1$ 时的优解 $\pi_\beta$、它的期望奖励以及与参考策略的散度。
::: solution
未配平权重 $\pi_{\text{ref}}e^{r/\beta}$：$0.5$、$0.3e = 0.8155$、$0.2e^2 = 1.4778$，总和 $Z = 2.7933$。于是 $\pi_1 = (0.179, 0.292, 0.529)$，且 $\E[r] = 0.292 + 2\cdot0.529 = 1.350$，高于参考策略下的 $0.7$。散度为 $\lambda\E[r] - \log Z = 1.350 - 1.027 = 0.323$ 纳特（[[#prop-frontier]]的证明），与直接计算 $\sum_i\pi_i\log(\pi_i/\pi_{\text{ref},i})$ 一致。策略以 $0.32$ 纳特换来了 $0.65$ 的奖励增长。
:::
:::

所以 $\beta$ 字面上就是散度的价格：在优解处，每多花一纳特 KL 就换来 $\beta$ 单位奖励。这条命题没有一处涉及回复的**真实**质量，过度优化正从这里钻进来：命题中的奖励是代理，代理的期望值一路上升，而真实价值却未必。

### 玩具策略中的奖励破解 {#sec-toy}

下面的程序在一个玩具“策略”上把这事讲明白：对某个提示的八个候选回复，代理奖励模型与真实奖励在其中七个上一致，却把第八个大大高估——可以想象成一条冗长谄媚、标注者细想之下会反感的回答。参考策略只给它 $1\%$ 的概率。用带留一基线（leave-one-out baseline）的 REINFORCE（[[post-training/rl-for-language-models#prop-rloo]]）对塑形奖励 $r_\phi - \beta\log(\pi/\pi_{\text{ref}})$ 训练若干步，取几个不同的 $\beta$，并与精确优解 $\pi_\beta$ 对照。

```python
import math, random

# 某个提示的八个候选回复。回复 7 是个"破解"：代理奖励模型
# 极度偏爱它（比如一条冗长谄媚的回答），但其真实（gold）质量很差。
ref   = [0.30, 0.20, 0.15, 0.12, 0.10, 0.07, 0.05, 0.01]   # 参考（SFT）策略
gold  = [0.0, 0.5, 1.0, 0.2, 1.5, 0.8, 2.0, -0.5]
proxy = [0.0, 0.5, 1.0, 0.2, 1.5, 0.8, 2.0, 3.0]
K = len(ref)

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    return [v / s for v in e]

def kl(p, q):
    return sum(pi * math.log(pi / qi) for pi, qi in zip(p, q) if pi > 0)

def train(beta, steps=3000, batch=16, lr=0.1, seed=0):
    """对塑形奖励 proxy - beta*log(pi/ref) 使用带留一基线的 REINFORCE。"""
    rng = random.Random(seed)
    theta = [math.log(p) for p in ref]                       # 从参考策略出发
    for _ in range(steps):
        pi = softmax(theta)
        ys = rng.choices(range(K), weights=pi, k=batch)
        R = [proxy[y] - beta * math.log(pi[y] / ref[y]) for y in ys]   # 塑形奖励
        tot = sum(R)
        g = [0.0] * K
        for y, r in zip(ys, R):
            adv = r - (tot - r) / (batch - 1)                 # 留一基线
            for j in range(K):
                g[j] += adv * ((1.0 if j == y else 0.0) - pi[j]) / batch
        theta = [t + lr * gj for t, gj in zip(theta, g)]
    return softmax(theta)

print(" beta   E[proxy]  E[gold]   KL     P(hack)")
for beta in (2.0, 1.0, 0.5, 0.25, 0.1, 0.03):
    pi = train(beta)
    print(f"{beta:5.2f}   {sum(p * r for p, r in zip(pi, proxy)):7.3f}  {sum(p * r for p, r in zip(pi, gold)):7.3f}"
          f"  {kl(pi, ref):6.3f}   {pi[7]:.3f}")
p0 = ref
print(f"  ref   {sum(p * r for p, r in zip(p0, proxy)):7.3f}  {sum(p * r for p, r in zip(p0, gold)):7.3f}   0.000   {p0[7]:.3f}")

# 精确优解 pi* ~ ref * exp(proxy / beta)，用于对照（在 DPO 一章推导）
print("exact optimum:")
for beta in (2.0, 1.0, 0.5, 0.25, 0.1, 0.03):
    pi = softmax([math.log(p) + r / beta for p, r in zip(ref, proxy)])
    print(f"{beta:5.2f}   {sum(p * r for p, r in zip(pi, proxy)):7.3f}  {sum(p * r for p, r in zip(pi, gold)):7.3f}"
          f"  {kl(pi, ref):6.3f}   {pi[7]:.3f}")
```

```text
 beta   E[proxy]  E[gold]   KL     P(hack)
 2.00     0.844    0.734   0.062   0.031
 1.00     1.162    0.864   0.304   0.085
 0.50     1.979    0.724   1.537   0.359
 0.25     2.861   -0.258   3.942   0.891
 0.10     1.987    1.982   2.866   0.001
 0.03     1.996    1.994   2.951   0.000
  ref     0.610    0.575   0.000   0.010
exact optimum:
 2.00     0.844    0.734   0.062   0.031
 1.00     1.162    0.864   0.304   0.085
 0.50     1.979    0.724   1.538   0.359
 0.25     2.871   -0.243   3.974   0.890
 0.10     3.000   -0.499   4.603   1.000
 0.03     3.000   -0.500   4.605   1.000
```

$\beta\ge0.25$ 时训练能到达精确优解，[[post-training/reward-models#sec-overoptimisation]]的模式清晰可见：$\beta$ 下降时代理奖励与 KL 一同上升（[[#prop-frontier]]），真实奖励在 $\beta = 1$ 附近达到峰值，随后概率流向破解而崩溃。$\beta = 0.1$ 和 $0.03$ 时发生了别的事：基于采样的优化器*没有*找到破解。惩罚很弱时，策略迅速集中到回复 $6$——最好的诚实回答；参考概率只有 $0.01$ 的回复 $7$ 在其高奖励被发现之前就不再被采到，训练停在了一个局部优解（十颗种子全是如此）。这是运气，不是安全。在真实语言模型里，破解很少是单个罕见回复，而是“更长”“更顺从”这类方向：奖励沿着它们从策略所在之处平滑上升，优化器自会跟上去。

::: widget plot
f: (0.1*exp(0.5*x) + 0.15*exp(x) + 0.024*exp(0.2*x) + 0.15*exp(1.5*x) + 0.056*exp(0.8*x) + 0.1*exp(2*x) + 0.03*exp(3*x))/(0.3 + 0.2*exp(0.5*x) + 0.15*exp(x) + 0.12*exp(0.2*x) + 0.1*exp(1.5*x) + 0.07*exp(0.8*x) + 0.05*exp(2*x) + 0.01*exp(3*x)); (0.1*exp(0.5*x) + 0.15*exp(x) + 0.024*exp(0.2*x) + 0.15*exp(1.5*x) + 0.056*exp(0.8*x) + 0.1*exp(2*x) - 0.005*exp(3*x))/(0.3 + 0.2*exp(0.5*x) + 0.15*exp(x) + 0.12*exp(0.2*x) + 0.1*exp(1.5*x) + 0.07*exp(0.8*x) + 0.05*exp(2*x) + 0.01*exp(3*x))
x: 0, 12
y: -0.7, 3.2
labels: proxy reward $\mathbb{E}_{\pi_\beta}[r_\phi]$; gold reward $\mathbb{E}_{\pi_\beta}[r^\star]$
vlines: 1
caption: 玩具问题（见上方程序）的精确优解 $\pi_\beta\propto\pi_{\text{ref}}e^{r_\phi/\beta}$ 的期望代理奖励与真实奖励，横轴为 $\lambda = 1/\beta$。代理奖励单调上升，正如[[#prop-frontier]]所要求；真实奖励在 $\lambda\approx1.3$（$\beta\approx0.75$）处达峰，随后随着破解占尽概率跌到参考策略的 $0.575$ 之下。竖线标出 $\beta = 1$。
:::

## PPO 版 RLHF 的一次迭代 {#sec-ppo-loop}

实践中，强化学习阶段在词元 MDP 上运行 PPO（[[post-training/rl-for-language-models#def-ppo]]），把 KL 惩罚折进逐词元奖励。

::: algorithm PPO 用于 RLHF {#alg-ppo-rlhf}
模型：**策略** $\pi_\theta$（训练）、**价值模型** $V_\psi$（训练）、**参考模型** $\pi_{\text{ref}}$（冻结）与**奖励模型** $r_\phi$（冻结）。重复：
1. **轨迹生成。** 采一批提示，用当前策略对每条提示生成一个回复，记录每个生成词元的对数概率 $\log\pi_{\text{old}}(y_t\mid s_{t-1})$ 与价值估计 $V_\psi(s_t)$。
2. **打分。** 每个回复计算一次 $R = r_\phi(\mathbf{x}, \mathbf{y})$，并用 $\pi_{\text{ref}}$ 的一次教师强制前向算出所有词元的参考对数概率。
3. **塑形。** 令逐词元奖励 $r_t = -\beta\big(\log\pi_{\text{old}}(y_{t+1}\mid s_t) - \log\pi_{\text{ref}}(y_{t+1}\mid s_t)\big)$，并在最后一个词元处加上 $R$（[[post-training/rl-for-language-models#prop-kl-tokens]]）。
4. **优势。** 计算 GAE 优势 $\hat A_t$ 与回报 $\hat A_t + V_\psi(s_t)$（[[post-training/rl-for-language-models#def-gae]]），通常取 $\gamma = 1$；对批次的优势做归一化（减均值、除标准差）。
5. **更新。** 在轨迹的小批次上跑几个轮次，用教师强制重算 $\log\pi_\theta$ 与 $V_\psi$，对策略走 PPO 截断损失的梯度步，对价值模型走（通常也截断的）平方误差损失。
6. 可选地调整 $\beta$（见下），并按[[#eq-instructgpt]]加上预训练似然项。
:::

价值模型通常从奖励模型初始化，因为两者都是把前缀映射到一个关于最终奖励的标量。轨迹生成阶段是**自回归生成**，在许多实现中占据墙钟时间的大头，而更新阶段是普通的教师强制训练。因此 RLHF 系统要把用于生成的推理引擎（[[inference/batching-serving]]）和训练框架拼在一起，并且每次迭代都要把更新后的策略权重从一边搬到另一边。

::: example 四个模型的显存 {#ex-memory}
一个团队用 PPO 训练：$70$ 亿参数的策略、$70$ 亿参数的价值模型，以及冻结的 $70$ 亿参数参考模型和奖励模型。混合精度 Adam 下，被训练的模型约需每参数 $16$ 字节（bf16 权重与梯度、fp32 主权重与两阶 Adam 矩）；bf16 的冻结模型需 $2$ 字节。只估算模型状态的显存，不含激活与生成缓存。
::: solution
被训练的：每参数 $2 + 2 + 4 + 4 + 4 = 16$ 字节（[[neural-networks/training-practice#ex-memory]]），策略与价值模型共需 $2\cdot7\times10^9\cdot16 = 224$ GB。冻结的：$2\cdot7\times10^9\cdot2 = 28$ GB。合计 $252$ GB——这还按当前标准算小模型，就要超过三块 $80$ GB 加速器的容量，更不必说任何激活显存。这笔开销正是各种方案的吸引力所在：去掉价值模型的方法（GRPO、RLOO），或干脆去掉奖励模型与在线采样的方法（DPO；[[post-training/preference-optimisation]]），以及一个网络挂两个头、或在同一个冻结基座上改用参数高效适配器（[[post-training/parameter-efficient-tuning]]）的做法。
:::
:::

### KL 系数的选取与自适应调整 {#sec-beta}

固定的 $\beta$ 带来难以预料的散度：训练初期策略移动得快，后期慢。Ziegler 等（2019）提出了一个**自适应控制器**，把实测 KL 往目标值上牵引。

::: definition 自适应 KL 控制器 {#def-adaptive-kl}
给定目标散度 $\mathrm{KL}_{\text{target}}$ 与增益 $K_\beta$（Ziegler 等取 $0.1$），每次迭代后按实测散度 $\mathrm{KL}_t$ 设

$$
e_t = \operatorname{clip}\Big(\frac{\mathrm{KL}_t - \mathrm{KL}_{\text{target}}}{\mathrm{KL}_{\text{target}}}, -0.2, 0.2\Big),\qquad \beta_{t+1} = \beta_t\,(1 + K_\beta\,e_t).
$$
:::

它是对 $\log\beta$ 的比例控制器：散度太大就加重惩罚，太小就减轻，按这组设置每步至多变化 $2\%$。无论固定还是自适应，$\beta$ 都要靠看奖励之外的东西来选：留出集上的人类或模型评审、能力基准上的行为，以及上一章讲过的过度优化迹象。

::: example 控制器走一步 {#ex-controller}
当前系数 $\beta = 0.05$，目标散度 $6$ 纳特，实测散度 $7.5$ 纳特。取 $K_\beta = 0.1$，下一步的 $\beta$ 是多少？若实测散度是 $20$ 纳特呢？
::: solution
$e = (7.5 - 6)/6 = 0.25$，截断到 $0.2$，于是 $\beta = 0.05\cdot(1 + 0.1\cdot0.2) = 0.051$。$20$ 纳特时误差 $2.33$ 同样截断到 $0.2$，结果还是 $0.051$：控制器的设计就是反应迟缓的，散度突然跳升必须靠别的手段处理，比如提前停掉 PPO 的轮次。
:::
:::

### 实践中的困难 {#sec-practice}

基于 PPO 的 RLHF 素有难调之名，已发表的实现研究（例如 Zheng 等，2023，以及 Huang 等，2024——他们详尽复现了 Stiennon 等的摘要结果）列出了许多要紧的细节：

- **奖励与优势的归一化。** 奖励模型的输出对每个提示都有任意平移（[[post-training/reward-models#prop-shift]]），并随奖励模型的更新而漂移；实现中会对奖励或优势做白化，并截断极端值。
- **价值模型的质量。** 糟糕的评论家给出有偏的优势；用从奖励模型初始化、并在策略更新前先热身的价值模型会有帮助。
- **生成设置。** 若重要度比与 KL 惩罚所用的对数概率要和产生词元的分布一致，策略就必须以温度 $1$ 采样且不做 top-$p$ 截断（[[inference/decoding-sampling]]）。
- **终止。** 被长度上限截断的回复没有轮次结束词元；是否以及如何给它们奖励（有的实现给固定惩罚项）会改变保持简洁的激励。
- **数值不一致。** 推理引擎与训练框架对同一词元可能算出略有出入的对数概率，于是更新开始时“旧”策略的比值并不恰好是 $1$。

这些没有一条是深奥的，但合起来解释了为什么“同一个”算法在不同实现下结果可以差很多。

## RLHF 改变了模型的什么 {#sec-effects}

RLHF 为改变行为而施加，也确实改变了：那个时期发表的各种比较中，人类评审明显更偏爱 RLHF 训练后的助手而不是它起步时的那个监督模型。另一些效应就没那么合心意了，其中不少已被测量。

- **长度。** 回复倾向于变长，因为奖励模型偏好长度（[[post-training/reward-models#sec-overoptimisation]]）。
- **多样性。** Kirk 等（2024）发现：与 SFT 相比，RLHF 改善了对新输入的泛化，却大幅降低了输出的多样性——同一提示的不同样本之间、不同提示之间都是如此——这与反向 KL 目标的寻模式（mode-seeking）特性一致（[[post-training/rl-for-language-models#sec-kl]]）。
- **校准。** 预训练模型的下一词元概率往往校准良好；GPT-4 技术报告（OpenAI，2023）显示，后训练模型在选择题上的自信程度远比预训练模型失准。一个为奖励优化的策略已经不再试图建模分布。
- **谄媚。** Perez 等（2022）发现 RLHF 训练后的模型更爱复述用户表达过的观点；Sharma 等（2024）把谄媚部分归因于奖励附和的人类偏好数据（[[safety-alignment/reward-hacking]]）。
- **拒答与过度拒答。** 为无害性训练会使模型拒绝对照起来像有害请求的良性请求；Bai 等（2022a）记录了有用性与无害性之间的张力，后来的方法试图化解它（[[post-training/ai-feedback]]）。

::: warning RLHF 不增加知识，还可能掩盖知识的缺口
一种常见的误读是 RLHF“让模型更聪明”。目标奖励的是*标注者当场更偏爱*的回复，它与正确性相关却并不等同。RLHF 主要重塑的是预训练模型本就能做的哪些行为被表达出来——而如果标注者分不清自信的错误答案与正确答案，RLHF 就会让错误答案变得更自信、更有说服力。真正的能力提升（如果发生）需要能追踪正确性的信号，例如可验证的奖励（[[post-training/preference-optimisation#sec-rlvr]]）。
:::

::: quiz
在基于 PPO 的 RLHF 中，强化学习阶段由梯度下降更新的部件有哪些？
- [x] 策略
- [x] 价值模型
- [ ] 参考模型
- [ ] 奖励模型
::: solution
被训练的是策略与价值模型。参考模型按定义是冻结的——它是 KL 惩罚的锚——奖励模型在一次强化学习运行中也保持冻结（运行之间可以用新比较重新训练它）。拿策略自己的奖励信号去训练奖励模型将是循环论证。
:::
:::

## PPO 的更简单替代 {#sec-alternatives}

由于 PPO 既昂贵又娇气，许多流程会在强化学习阶段的全部或部分环节改用更简单的优化器。

- **推理时的 best-of-$n$ 采样**：抽 $n$ 个回复，返回奖励模型最偏爱的那个。完全不训练；代价是每个问题生成 $n$ 次，且与策略的 KL 至多为 $\log n - (n-1)/n$（[[post-training/reward-models#thm-bon-kl]]）。
- **拒绝采样微调。** 每条提示采若干回复，按奖励保留最好的（或超过阈值的），用 SFT 损失在其上微调；重复。这就是带二元权重的 REINFORCE（[[post-training/rl-for-language-models#alg-reinforce]]），也叫**专家迭代**（Anthony 等，2017），其变体还称作 RAFT（Dong 等，2023）与 ReST（Gulcehre 等，2023）。Llama 2（Touvron 等，2023）在施加 PPO 之前做了多轮拒绝采样微调。
- **带采样基线的 REINFORCE。** Ahmadian 等（2024）主张 RLHF 并不需要 PPO 的全套机器，因为预训练策略的起点本就在不错的区域，问题更像老虎机（bandit）而非长时域控制；他们报告带留一基线的 REINFORCE（RLOO，[[post-training/rl-for-language-models#prop-rloo]]）在他们的实验中追平甚至超过 PPO，同时还省掉了价值模型。
- **组相对方法**，如 GRPO：在同一提示的一组样本内归一化奖励，从而去掉价值模型（[[post-training/preference-optimisation#sec-grpo]]）。
- **直接偏好优化**：以闭式解掉 KL 正则问题，把奖励模型与采样循环一并移除（[[post-training/preference-optimisation]]）。

哪个最好是个到 2026 年仍无定论的经验问题：比较结果极依赖调参、数据与评测，不同论文的结论方向各异。

::: history
从人类的评价反馈中学习，在强化学习里源远流长——从 TAMER（Knox 与 Stone，2009）到基于偏好的强化学习（Akrour 等，2011；Wirth 等，2017）。Christiano 等（NeurIPS 2017）把比较、学得的奖励模型与深度强化学习合为一体；Ibarz 等（2018）又加上示范。Ziegler 等（2019）把该方法带给预训练语言模型，配上了 KL 惩罚与自适应控制器；Stiennon 等（NeurIPS 2020）在摘要任务上证明 RLHF 策略能胜过人类参考摘要，也可能被过度优化。Askell 等（2021）在 Anthropic 提出了“有用、诚实、无害”助手的目标，Bai 等（2022a）用在线 RLHF 把它训了出来。InstructGPT（Ouyang 等，NeurIPS 2022）为一般指令遵循确立了三个阶段的流程，其方法支撑了 2022 年底起陆续发布的聊天助手。Llama 2（Touvron 等，2023）为一个开放权重模型记录了大规模的 RLHF，采用分开的有用性与安全性奖励模型以及拒绝采样。2023 年起，DPO、RLOO 与 GRPO 提供了比 PPO 便宜的替代；2024 年起，基于可验证奖励的强化学习成为训练推理模型的核心。
:::

::: summary
- **RLHF** = 监督微调 + 在人类比较上训练的**奖励模型** + 对着奖励模型、带对 SFT 模型**KL 惩罚**的**强化学习**（经典取 PPO）；它上承 Christiano 等（2017）、Ziegler 等（2019）与 Stiennon 等（2020），由 **InstructGPT**（2022）为助手确立。
- InstructGPT 的目标加了一项预训练似然项（**PPO-ptx**）以减轻**对齐税**；标注者更喜欢 $1.3$B 的 InstructGPT 而不是 $175$B 的 GPT-3。
- 在正则优解处，$\beta$ 下降时奖励与 KL 同增，边际汇率 $d\,\E[r]/d\,\mathrm{KL} = \beta$（[[#prop-frontier]]）；**真实**奖励终会下降——奖励破解——玩具策略完整复现了这一过程。
- 基于 PPO 的 RLHF 需要四个模型（策略、价值、参考、奖励）、逐词元 KL 塑形、GAE 以及大量实现细节；仅模型状态就要约每被训练参数 $16$ 字节。
- RLHF 会拉长回复、降低输出多样性、可能破坏校准并加剧谄媚，还塑造拒答行为；它重塑行为多于增加知识。
- 更简单的优化器——best-of-$n$、拒绝采样微调、RLOO、GRPO 与 DPO——被广泛使用；孰优孰劣仍是开放的经验问题。
:::

## 习题

::: exercise 塑形奖励 {level=1 check="1.4"}
一条三个词元的回复，策略对数概率为 $-0.5$、$-1.0$、$-0.2$，参考对数概率为 $-1.5$、$-2.0$、$-0.2$。奖励模型给出 $R = 1.6$，$\beta = 0.1$。总塑形回报 $R - \beta\sum_t\log(\pi/\pi_{\text{ref}})$ 是多少？
::: solution
对数比为 $1.0$、$1.0$、$0$，和为 $2.0$；惩罚 $0.1\cdot2.0 = 0.2$；回报 $1.6 - 0.2 = 1.4$。
:::
:::

::: exercise 自适应控制器 {level=1 check="0.098"}
设 $\beta = 0.1$、$K_\beta = 0.1$，目标 $8$ 纳特而实测散度 $4$ 纳特。按[[#def-adaptive-kl]]，下一个 $\beta$ 是多少？
::: solution
$e = (4 - 8)/8 = -0.5$，截断到 $-0.2$；$\beta = 0.1\cdot(1 - 0.02) = 0.098$。
:::
:::

::: exercise 共享基座的显存 {level=1 check="140"}
改写[[#ex-memory]]：只有一个 $70$ 亿参数的策略用完整 Adam 训练，价值函数是策略网络外挂的一个标量头（参数量可忽略），参考模型与奖励模型以 bf16 冻结。模型状态需要多少 GB？
::: solution
策略（含价值头）：$7\times10^9\cdot16 = 112$ GB；参考与奖励模型：$2\cdot14 = 28$ GB；合计 $140$ GB。共享网络省下 $112$ GB，但把策略损失与价值损失耦合了起来，一些实现认为这更不稳定。
:::
:::

::: exercise 两条回复的前沿 {level=2 check="0.7311"}
某提示有两个回复，奖励为 $0$ 和 $1$，$\pi_{\text{ref}} = (0.5, 0.5)$。对[[#prop-frontier]]的倾斜策略 $\pi_\lambda$，计算 $\lambda = 1$ 时的 $\E_{\pi_\lambda}[r]$（保留四位小数）与 $\Var_{\pi_\lambda}(r)$，并用 $\lambda = 1.01$ 数值验证导数公式。
::: solution
$\pi_\lambda = (1, e^\lambda)/(1 + e^\lambda)$，故 $\E[r] = \sigma(\lambda)$：$\lambda = 1$ 时为 $0.7311$。伯努利的方差为 $\sigma(1)(1 - \sigma(1)) = 0.1966$。$\lambda = 1.01$ 时 $\sigma(1.01) = 0.7330$，且 $(0.7330 - 0.7311)/0.01 = 0.197$，与方差吻合。
:::
:::

::: exercise 散度的价格 {level=2}
用[[#prop-frontier]]解释：为什么把 $\beta = 0.05$ 定死的实践者，实际上是在说“每挣 $0.05$ 单位奖励，我就接受偏离参考模型多一纳特 KL”。为什么这个汇率说明不了多出来的奖励是真是假？
::: solution
在正则目标的优解处，每纳特散度的边际奖励恰为 $\beta$；散度更大的任何策略，每多一纳特赚到的都少于 $\beta$，目标 $\E[r] - \beta\,\mathrm{KL}$ 反而会下降。所以 $\beta$ 就是代理奖励与散度之间的汇率。这个汇率说的是*代理*奖励；它的增长是否对应真提升，取决于代理在哪些区域是准的——而这在代理自身里看不出来。过度优化恰恰就是代理奖励以汇率 $\beta$ 持续上升、真实奖励却在下降的那一段。
:::
:::

::: exercise 为什么用奖励模型初始化价值模型？ {level=2}
解释基于 PPO 的 RLHF 中，价值模型为什么通常从奖励模型而不是 SFT 模型初始化；并说明若价值模型初始化很糟，且在 $\lambda = 0.95$ 下用 GAE 计算优势会出什么问题。
::: solution
在终止奖励、$\gamma = 1$ 之下，前缀的真实值是它的各种完成最终奖励的期望。奖励模型已经把完整回复映到这个奖励，并且学到了它依赖文本的哪些特征，因此它在前缀上的预测是不错的起点估计；而挂着随机标量头的 SFT 模型初始值毫无道理。$\lambda = 0.95$ 的 GAE 由 TD 误差 $r_t + V(s_{t+1}) - V(s_t)$ 组成优势；初始化很差的评论家会在每个词元上给出又大又系统性错误的 TD 误差，接近 $1$ 的 $\lambda$ 只能平均掉其中一小部分（[[post-training/rl-for-language-models#prop-gae-limits]]），于是早期的策略更新跟着噪声走。实现中常见的做法是先单独训练价值模型若干步，再开始更新策略。
:::
:::

::: exercise 拒绝采样即 REINFORCE {level=2}
证明一轮拒绝采样微调——从 $\pi_\theta$ 对每条提示采 $k$ 个回复，保留奖励超过阈值 $\tau$ 的那些，在其 SFT 损失上走一步梯度——就是带某种特定奖励的 REINFORCE 步。是什么奖励？什么基线？与在原奖励上做 REINFORCE 相比丢了什么？
::: solution
在保留回复上的 SFT 梯度是 $\sum_{i:R_i > \tau}\nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x}) = \sum_i\mathbb{1}[R_i > \tau]\,\nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x})$，即[[post-training/rl-for-language-models#alg-reinforce]]中的 REINFORCE 估计量，二元奖励 $\tilde R = \mathbb{1}[R > \tau]$、基线为 $0$。丢掉的东西：奖励的大小（刚好过线的回复与出色的回复同权）；任何负向信号（被拒的回复不会被压低，而带基线时本会如此）；以及 KL 惩罚——除非轮次数和学习率都保持很小。若在同一批样本上走很多步，首步之后它还变成了离策略（off-policy）。
:::
:::

::: exercise 对一般奖励证明前沿性质 {level=3}
证明当 $\lambda$ 从 $0$ 变到 $\infty$ 时，曲线 $(D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}}), \E_{\pi_\lambda}[r])$ 是凹的：即每纳特 KL 的边际奖励 $\beta = 1/\lambda$ 沿曲线递减。再证明：不存在策略 $\pi$ 能在相同或更小的散度下取得比 $\pi_\lambda$ 更高的期望奖励。
::: solution
由[[#prop-frontier]]，曲线的斜率为 $d\,\E[r]/d\,\mathrm{KL} = 1/\lambda$，而 $\mathrm{KL}$ 关于 $\lambda$ 不减；于是沿曲线前行（$\lambda$ 增大）时斜率 $1/\lambda$ 递减，这就是凹性。第二问：$\pi_\lambda$ 在所有 $\pi$ 上最大化 $\E_\pi[r] - \frac1\lambda D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$（[[post-training/preference-optimisation#thm-optimal-policy]]，取 $\beta = 1/\lambda$）。若某策略 $\pi$ 满足 $D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})\le D_{\mathrm{KL}}(\pi_\lambda\Vert\pi_{\text{ref}})$ 且 $\E_\pi[r] > \E_{\pi_\lambda}[r]$，就有 $\E_\pi[r] - \frac1\lambda D_{\mathrm{KL}}(\pi) > \E_{\pi_\lambda}[r] - \frac1\lambda D_{\mathrm{KL}}(\pi_\lambda)$，与最优性矛盾。因此倾斜策略描出的是奖励对散度的**有效前沿**，$\beta$ 的每个取值各选中其上一点。
:::
:::

::: exercise 复现玩具实验 {level=3}
修改[[#sec-toy]]的程序，让策略从 $\log\pi_{\text{ref}}$ 加一个熵奖励的 logits 出发：向目标加入 $\eta\,H(\pi_\theta)$，取 $\eta = 0.05$，实现方式是给每个采样回复的塑形奖励加上 $-\eta\log\pi(y)$。先预测再验证：$\beta = 0.1$ 的运行现在会不会找到破解？这说明探索与奖励破解之间是什么关系？
::: solution
向奖励加 $-\eta\log\pi(y)$ 是熵奖励的得分函数形式（与 KL 惩罚同理，由[[post-training/rl-for-language-models#lem-score]]，附加项的直接梯度均值为零）。与 KL 惩罚合并后，逐样本奖励为 $r_\phi - (\beta + \eta)\log\pi + \beta\log\pi_{\text{ref}}$，其优解是 $\pi\propto\pi_{\text{ref}}^{\beta/(\beta + \eta)}e^{r_\phi/(\beta + \eta)}$：一个更平坦、始终在采样罕见回复的策略。取 $\beta = 0.1$、$\eta = 0.05$，破解的权重为 $0.01^{2/3}e^{3/0.15}$，而回复 $6$ 为 $0.05^{2/3}e^{2/0.15}$——破解在优解中占绝对优势（约占概率的 $99.6\%$）；又因为策略持续探索，训练现在应该会找到它。用种子 $0$ 到 $4$ 运行修改后的程序可证实这一点：$3{,}000$ 步后，破解的概率在每次运行中都介于 $0.96$ 到 $0.99$。更好的探索对优化是好事，对一个可被利用的奖励则是坏事：能更快找到最佳诚实回答的优化器，也会更快找到破解。稳健性必须来自奖励和惩罚本身，而不是孱弱的优化器。
:::
:::
