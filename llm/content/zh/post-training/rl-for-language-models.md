监督微调向模型展示该说什么（[[post-training/instruction-tuning]]）。强化学习（reinforcement learning，RL）则告诉它做得有多好。模型生成一个回复，某样东西为这个回复打分——一个在人类偏好上训练的奖励模型、一个单元测试、一道数学答案的检查——参数便朝让高分回复更可能出现的方向移动。SFT 之后，这一做法有两条吸引人的性质：信号可以表达*质量*而非模仿，而模型从自己的样本中学习，包括它自己的错误。

本章搭建本课程其余部分要用到的数学。它把生成看作词元层面的马尔可夫决策过程，等价地也看作整个回复层面的老虎机；**证明策略梯度定理**，由此得到 REINFORCE 估计量；说明**基线**为何能在不引入偏差的情况下大幅降低方差，并求出最好的常数基线；引入价值函数与**广义优势估计**；从重要度采样出发推导 **PPO** 的截断目标并解释其设计；最后定义让微调后的模型不偏离起点太远的 **KL 正则目标**。一般理论的标准参考书是 Sutton 与 Barto（2018）；这里的一切都专门化到语言模型。

## 生成即决策过程 {#sec-mdp}

参数为 $\theta$ 的语言模型是一个**策略**：给定提示 $\mathbf{x}$ 与已经生成的词元，它输出下一个词元上的分布。生成一个回复是一串决策，奖励在回复完成时到来。

::: definition 马尔可夫决策过程 {#def-mdp}
一个回合式（episodic）**马尔可夫决策过程**（MDP）由状态集 $\mathcal{S}$、动作集 $\mathcal{A}$、初始状态分布 $\rho_0$、转移概率 $P(s_{t+1}\mid s_t, a_t)$、奖励函数 $r(s_t, a_t)$ 和折扣因子 $\gamma\in[0, 1]$ 组成。**策略** $\pi_\theta(a\mid s)$ 在每个状态给出动作上的分布。**轨迹** $\tau = (s_0, a_0, r_0, s_1, a_1, r_1, \dots, s_{T})$ 按 $s_0\sim\rho_0$、$a_t\sim\pi_\theta(\cdot\mid s_t)$、$s_{t+1}\sim P(\cdot\mid s_t, a_t)$ 生成，直到进入终止状态。从第 $t$ 步起的**回报**是 $G_t = \sum_{k\ge t}\gamma^{k-t}r_k$，目标是期望回报 $J(\theta) = \E_{\tau\sim\pi_\theta}[G_0]$。
:::

::: definition 语言模型的词元级 MDP {#def-token-mdp}
对语言模型而言，第 $t$ 步的**状态**是提示与已生成的词元，$s_t = (\mathbf{x}, y_1, \dots, y_t)$，其中 $s_0 = \mathbf{x}$ 从提示的分布中抽取。**动作**是下一个词元 $a_t = y_{t+1}\in\mathcal{V}$，策略就是模型的下一词元分布 $\pi_\theta(y_{t+1}\mid\mathbf{x}, y_{\le t})$。转移是**确定的**：下一个状态就是当前状态接上这个词元。回合在生成轮次结束词元或达到长度上限时结束。奖励通常是**稀疏的**：除最后一步外 $r_t = 0$，最后一步处 $r_{T-1} = R(\mathbf{x}, \mathbf{y})$ 给整个回复打分；折扣通常取 $\gamma = 1$。
:::

同一个问题可以在更高一层来看。既然唯一的随机性来自策略，而奖励只依赖完成的回复，整个回复 $\mathbf{y}$ 就可以当作一个动作。

::: definition 序列级（老虎机）视角 {#def-bandit}
在**序列级**视角中，提示 $\mathbf{x}$ 是上下文，整个回复 $\mathbf{y}$ 是一次从 $\pi_\theta(\mathbf{y}\mid\mathbf{x}) = \prod_t\pi_\theta(y_t\mid\mathbf{x}, y_{<t})$ 抽出的动作，奖励 $R(\mathbf{x}, \mathbf{y})$ 立即收到。这是一个动作空间大得离谱的**上下文老虎机**（contextual bandit），目标是

$$
J(\theta) = \E_{\mathbf{x}\sim\mathcal{D}}\,\E_{\mathbf{y}\sim\pi_\theta(\cdot\mid\mathbf{x})}\big[R(\mathbf{x}, \mathbf{y})\big].
$$ {#eq-objective}
:::

两种视角描述的是同一个优化问题；不同之处在于信用如何分配。老虎机视角给一个回复的每个词元同样的信号——"这个回复挣到了 $R$"。词元视角允许**评论家**（critic）在每个前缀处估计从这里看前景如何，从而指出哪些词元帮了忙。使用学出来的价值函数的方法（[[post-training/rlhf]] 中的 PPO）需要词元视角；比较整个回复的方法（带采样基线的 REINFORCE、[[post-training/preference-optimisation#sec-grpo]] 中的 GRPO）用老虎机视角。

::: example 涉及的规模 {#ex-sizes}
一个词表大小为 $|\mathcal{V}| = 128{,}000$ 词元的策略生成最长 $512$ 词元的回复。词元 MDP 的每个状态有多少个动作？不同的回复——即老虎机的动作——有多少个（写成十的幂）？
::: solution
每个状态有 $128{,}000$ 个动作。恰好 $512$ 词元的回复有 $128{,}000^{512} = 10^{512\log_{10}128000} = 10^{512\cdot5.107} \approx 10^{2615}$ 个。没有任何方法能枚举它们；下面的一切都靠样本来做，用到的事实是：策略既能**采样**一个回复，也能对给定回复**求值** $\log\pi_\theta(\mathbf{y}\mid\mathbf{x})$ 及其梯度——靠一次教师强制的前向加一次反向即可。
:::
:::

## 策略梯度定理 {#sec-pg}

要用梯度上升最大化 $J$，就需要 $\nabla_\theta J$。困难在于 $\theta$ 是从被平均的分布进入的，而不是从奖励进入的，而奖励甚至可能根本不可导（单元测试要么通过要么失败）。**对数求导技巧**把梯度搬进期望内部。

::: lemma 得分函数的期望为零 {#lem-score}
对有限或可数集上的任何分布族 $\pi_\theta$，只要 $\pi_\theta(a) > 0$ 且关于 $\theta$ 可导，

$$
\E_{a\sim\pi_\theta}\big[\nabla_\theta\log\pi_\theta(a)\big] = \mathbf{0}.
$$
:::

::: proof
$\E[\nabla\log\pi_\theta(a)] = \sum_a\pi_\theta(a)\frac{\nabla\pi_\theta(a)}{\pi_\theta(a)} = \nabla\sum_a\pi_\theta(a) = \nabla1 = \mathbf{0}$，其中交换了求和与梯度（有限和，或可数情形用控制收敛定理）。
:::

::: theorem 策略梯度定理（回合式形式） {#thm-pg}
对时域有限、策略可导的回合式 MDP，

$$
\nabla_\theta J(\theta) = \E_{\tau\sim\pi_\theta}\Big[\sum_{t=0}^{T-1}\nabla_\theta\log\pi_\theta(a_t\mid s_t)\,G_t\Big],
$$ {#eq-pg}

其中 $G_t$ 是从第 $t$ 步起的回报（**未来回报**，reward-to-go）。在语言模型的序列级视角下，它写作

$$
\nabla_\theta J(\theta) = \E_{\mathbf{x}}\,\E_{\mathbf{y}\sim\pi_\theta}\big[R(\mathbf{x}, \mathbf{y})\,\nabla_\theta\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\big],\qquad \nabla_\theta\log\pi_\theta(\mathbf{y}\mid\mathbf{x}) = \sum_t\nabla_\theta\log\pi_\theta(y_t\mid\mathbf{x}, y_{<t}).
$$ {#eq-pg-seq}
:::

::: proof
一条轨迹的概率是 $p_\theta(\tau) = \rho_0(s_0)\prod_t\pi_\theta(a_t\mid s_t)P(s_{t+1}\mid s_t, a_t)$。只有策略的因子依赖 $\theta$，于是

$$
\nabla_\theta\log p_\theta(\tau) = \sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t).
$$

于是，注意到 $G_0 = \sum_k\gamma^kr_k$ 是 $\tau$ 的函数、给定 $\tau$ 后不依赖 $\theta$，

$$
\nabla J = \sum_\tau\nabla p_\theta(\tau)\,G_0(\tau) = \sum_\tau p_\theta(\tau)\nabla\log p_\theta(\tau)\,G_0(\tau) = \E\Big[\sum_t\nabla\log\pi_\theta(a_t\mid s_t)\,G_0\Big].
$$

这已经是一个合法的梯度公式。要把 $G_0$ 换成 $G_t$，在第 $t$ 项中把 $G_0 = \sum_{k<t}\gamma^kr_k + \gamma^tG_t$ 拆开。$k < t$ 的奖励 $r_k$ 由截至 $s_t$ 的历史决定；对这段历史 $h_t$ 取条件，并对分布 $\pi_\theta(\cdot\mid s_t)$ 应用[[#lem-score]]，

$$
\E\big[r_k\nabla\log\pi_\theta(a_t\mid s_t)\big] = \E\Big[r_k\,\E\big[\nabla\log\pi_\theta(a_t\mid s_t)\,\big\vert\,h_t\big]\Big] = 0,
$$

所以过去的奖励在期望下什么也不贡献，可以丢掉。取语言模型常用的 $\gamma = 1$，剩下的因子就是 $G_t$；若 $\gamma < 1$，推导给出的是 $\gamma^tG_t$，实践中约定俗成地把因子 $\gamma^t$ 丢掉。对只有单个终止奖励的语言模型，每个 $t$ 都有 $G_t = R$，而由链式法则轨迹的对数概率是 $\log\pi_\theta(\mathbf{y}\mid\mathbf{x})$，于是得到[[#eq-pg-seq]]。
:::

该定理把梯度变成了一个能用采样估计的期望：生成回复、给它们打分，再按各自的奖励给每个回复的对数概率梯度加权。这就是 Williams 的 **REINFORCE** 算法（1992）。

::: algorithm 语言模型上的 REINFORCE {#alg-reinforce}
重复：
1. 抽一批提示 $\mathbf{x}_1, \dots, \mathbf{x}_B$，对每个提示抽一个回复 $\mathbf{y}_i\sim\pi_\theta(\cdot\mid\mathbf{x}_i)$。
2. 给每个回复打分：$R_i = R(\mathbf{x}_i, \mathbf{y}_i)$。
3. 计算 $\hat g = \frac1B\sum_i(R_i - b_i)\nabla_\theta\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x}_i)$：把"损失" $-\frac1B\sum_i(R_i - b_i)\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x}_i)$ 反向传播，其中系数 $R_i - b_i$ 当作常数处理，$b_i$ 是基线（见下文；$b_i = 0$ 就是纯 REINFORCE）。
4. 更新 $\theta\leftarrow\theta + \eta\,\hat g$（或走一步 Adam）。
:::

第 3 步显示了它与监督学习的联系：REINFORCE 损失就是模型在自己样本上的交叉熵，每一项按它有多好来加权。当 $R_i\in\{0, 1\}$ 且 $b_i = 0$ 时，它就是只在成功样本上做的 SFT——拒绝采样微调与专家迭代背后的思想（[[post-training/rlhf#sec-alternatives]]）。

## 基线与方差 {#sec-baselines}

[[#eq-pg-seq]] 中的估计量无偏但很噪。噪声有一个简单的来源：如果所有奖励都是正的，每个采样到的回复都会被抬高，信息只藏在抬得高低的*差异*里。**基线**去掉公共的部分。

::: proposition 基线不给梯度带来偏差 {#prop-baseline}
设 $b(\mathbf{x})$ 是任何依赖提示但不依赖所采样回复的函数。则

$$
\E_{\mathbf{y}\sim\pi_\theta}\big[(R(\mathbf{x}, \mathbf{y}) - b(\mathbf{x}))\nabla_\theta\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\big] = \E_{\mathbf{y}\sim\pi_\theta}\big[R(\mathbf{x}, \mathbf{y})\nabla_\theta\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\big].
$$

更一般地，在词元 MDP 中，基线 $b(s_t)$ 可以依赖状态 $s_t$，但不能依赖动作 $a_t$。
:::

::: proof
$\E[b(\mathbf{x})\nabla\log\pi_\theta(\mathbf{y}\mid\mathbf{x})] = b(\mathbf{x})\,\E[\nabla\log\pi_\theta(\mathbf{y}\mid\mathbf{x})] = \mathbf{0}$，由[[#lem-score]]。对依赖状态的基线，对 $s_t$ 取条件，再把同一条引理用到 $\pi_\theta(\cdot\mid s_t)$ 上。
:::

方差对基线的依赖却很大。记 $\mathbf{g}(\mathbf{y}) = \nabla\log\pi_\theta(\mathbf{y}\mid\mathbf{x})$，用总方差 $\E\lVert(R - b)\mathbf{g}\rVert^2 - \lVert\nabla J\rVert^2$ 来度量单样本估计量 $(R - b)\mathbf{g}$ 的噪声。

::: proposition 最好的常数基线 {#prop-best-baseline}
在常数基线中，使 $(R - b)\mathbf{g}$ 的总方差最小的为

$$
b^\star = \frac{\E\big[R\,\lVert\mathbf{g}\rVert^2\big]}{\E\big[\lVert\mathbf{g}\rVert^2\big]},
$$ {#eq-best-baseline}

即奖励的加权平均。若各回复的 $\lVert\mathbf{g}\rVert^2$ 大致相同，则 $b^\star\approx\E[R]$。
:::

::: proof
均值 $\nabla J$ 不依赖 $b$（[[#prop-baseline]]），所以只需最小化 $f(b) = \E[(R - b)^2\lVert\mathbf{g}\rVert^2] = \E[R^2\lVert\mathbf{g}\rVert^2] - 2b\,\E[R\lVert\mathbf{g}\rVert^2] + b^2\E[\lVert\mathbf{g}\rVert^2]$，它是 $b$ 的凸二次函数。令 $f'(b) = 0$ 即得[[#eq-best-baseline]]。
:::

实践中基线是估计出来的：近期奖励的滑动平均；同一提示下模型贪心回复的奖励（**自临界序列训练**，Rennie 等，2017）；同一提示其他样本的平均奖励；或者一个学出来的价值函数——那是下一节的内容。带采样的版本有个微妙之处值得一说。

::: proposition 留一基线是无偏的 {#prop-rloo}
从 $\pi_\theta(\cdot\mid\mathbf{x})$ 独立抽出 $k\ge2$ 个回复 $\mathbf{y}_1, \dots, \mathbf{y}_k$，令 $b_i = \frac{1}{k-1}\sum_{j\ne i}R(\mathbf{x}, \mathbf{y}_j)$。则 $\frac1k\sum_i(R_i - b_i)\nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x})$ 是 $\nabla_\theta\E_{\mathbf{y}}[R]$ 的无偏估计量。反之，若 $b_i$ 取包含 $\mathbf{y}_i$ 在内全部 $k$ 个样本的均值，则该估计量等于留一估计量的 $\frac{k-1}{k}$ 倍，其期望被缩放了因子 $\frac{k-1}{k}$。
:::

::: proof
$b_i$ 是其他样本的函数，而其他样本与 $\mathbf{y}_i$ 独立；对这些样本取条件，$b_i$ 就是一个常数，[[#prop-baseline]] 适用。第二个结论：$R_i - \frac1k\sum_jR_j = \frac{k-1}{k}\big(R_i - \frac1{k-1}\sum_{j\ne i}R_j\big)$。
:::

这个估计量就是 **RLOO**（REINFORCE leave-one-out；Kool 等，2019 提出，Ahmadian 等，2024 用于 RLHF）。包含该样本在内的均值（例如 GRPO 的用法）给出的梯度只被一个已知的正常数重新缩放，所以方向是无偏的。

::: widget plot
f: 0.75*(2.1875 + (12.75 - x)^2) - 0.546875
x: 0, 20
y: 0, 130
points: 0,123.016; 12.75,1.094
labels: total variance of $(R - b)\,\nabla\log\pi$
caption: 下方程序那个四臂老虎机在均匀策略下，单样本策略梯度估计的总方差随常数基线 $b$ 的变化。不加基线（$b = 0$）时方差是 $123.0$；取 $b = \E[R] = 12.75$ 时是 $1.09$，缩小一百倍，而估计量的均值对一切 $b$ 都相同。这里每个动作都有 $\lVert\mathbf{g}\rVert^2 = 0.75$，因此[[#prop-best-baseline]]的最佳基线恰好就是 $\E[R]$。
:::

### 一个老虎机实验 {#sec-code}

下面的程序在一个四臂老虎机上把这件事做具体——四个"回复"，奖励分别为 $11$、$12$、$13$、$15$——策略是它们上的 softmax。对 softmax 策略 $\pi = \operatorname{softmax}(\boldsymbol\theta)$，$\nabla_{\boldsymbol\theta}\log\pi(a) = \mathbf{e}_a - \boldsymbol\pi$（[[math-for-ml/gradients#prop-softmax-ce]]）。第一部分在均匀策略下估计单样本梯度的均值与方差；第二部分在 $50$ 个种子上各训练 $200$ 步，分别用与不用滑动平均基线。

```python
import math, random

rewards = [11.0, 12.0, 13.0, 15.0]        # K = 4 个"回复"各自的奖励；注意这个偏移
K = len(rewards)

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    return [v / s for v in e]

def expected(p):
    return sum(pi * r for pi, r in zip(p, rewards))

def grad_estimate(theta, a, b):
    """softmax 策略的策略梯度估计 (R - b) * grad_theta log pi(a)；形状 (K,)。"""
    p = softmax(theta)
    return [(rewards[a] - b) * ((1.0 if j == a else 0.0) - p[j]) for j in range(K)]

# 1. 均匀策略下单样本估计量的偏差与方差
theta = [0.0] * K
p = softmax(theta)
print("exact gradient:", [round(p[j] * (rewards[j] - expected(p)), 4) for j in range(K)])
for name, b in (("no baseline", 0.0), ("b = E[R]", expected(p))):
    rng = random.Random(0)
    S = [grad_estimate(theta, rng.choices(range(K), weights=p)[0], b) for _ in range(100000)]
    mean = [sum(s[j] for s in S) / len(S) for j in range(K)]
    var = sum(sum((s[j] - mean[j]) ** 2 for s in S) / len(S) for j in range(K))
    print(f"{name:12s} mean {[round(m, 3) for m in mean]}  total variance {var:.2f}")

# 2. 训练：200 步，学习率 0.02，在 50 个种子上取平均
for name in ("no baseline", "running mean"):
    finals = []
    for seed in range(50):
        rng = random.Random(seed)
        theta, avg = [0.0] * K, 0.0
        for step in range(200):
            p = softmax(theta)
            a = rng.choices(range(K), weights=p)[0]
            b = avg if name == "running mean" else 0.0
            g = grad_estimate(theta, a, b)
            theta = [t + 0.02 * gj for t, gj in zip(theta, g)]
            avg += 0.1 * (rewards[a] - avg)
        finals.append(expected(softmax(theta)))
    m = sum(finals) / len(finals)
    sd = math.sqrt(sum((f - m) ** 2 for f in finals) / (len(finals) - 1))
    worst = min(finals)
    print(f"{name:12s} final E[R] mean {m:.3f}  sd {sd:.3f}  worst {worst:.3f}")
```

```text
exact gradient: [-0.4375, -0.1875, 0.0625, 0.5625]
no baseline  mean [-0.421, -0.199, 0.043, 0.578]  total variance 123.02
b = E[R]     mean [-0.44, -0.187, 0.062, 0.565]  total variance 1.10
no baseline  final E[R] mean 13.933  sd 1.043  worst 11.937
running mean final E[R] mean 14.569  sd 0.158  worst 13.890
```

两个估计量的平均都等于精确梯度 $\pi_j(r_j - \E[R])$，但不加基线时方差大 $112$ 倍，因为每个样本都被至少 $11$ 的奖励抬高，有用的信号只是那点小小的差距。训练时，用基线的运行结束在更接近最优值 $\E[R] = 15$ 的地方，而且稳定得多；不用基线，有些运行被一个走运的早期样本带偏，漂向更差的臂。奖励模型的奖励带有任意偏移（[[post-training/reward-models#prop-shift]]），所以这不是编造出来的问题。

## 价值函数与优势 {#sec-advantage}

每个状态最好的基线，粗略地说，就是从该状态出发的期望回报。这引出价值函数。

::: definition 价值、动作价值与优势 {#def-value}
对策略 $\pi$，**状态价值函数**是 $V^\pi(s) = \E_\pi[G_t\mid s_t = s]$，**动作价值函数**是 $Q^\pi(s, a) = \E_\pi[G_t\mid s_t = s, a_t = a]$，**优势**是 $A^\pi(s, a) = Q^\pi(s, a) - V^\pi(s)$：动作 $a$ 比策略在状态 $s$ 的平均动作好多少。由于 $V^\pi(s) = \E_{a\sim\pi}[Q^\pi(s, a)]$，优势在策略下的均值为零。
:::

把[[#eq-pg]]中的 $G_t$ 换成 $G_t - V^\pi(s_t)$ 是一个依赖状态的基线，因而无偏；又因为 $\E[G_t\mid s_t, a_t] = Q^\pi(s_t, a_t)$，梯度可以写成 $\E\big[\sum_t\nabla\log\pi_\theta(a_t\mid s_t)A^\pi(s_t, a_t)\big]$。在**演员–评论家**（actor–critic）方法中，策略（演员）用优势来训练，优势借助学出来的近似 $V_\phi\approx V^\pi$（评论家）来估计，评论家自己则靠向实测回报做回归来训练。对语言模型，评论家通常是模型的一个副本，外挂一个标量输出头，在每个前缀处预测这个回复最终会得到的奖励。

如何把 $V_\phi$ 变成优势估计，是一个权衡。一步**时序差分（TD）误差**

$$
\delta_t = r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t)
$$ {#eq-td}

方差很低——它只涉及一个奖励——但只要 $V_\phi$ 有错就有偏。蒙特卡洛估计 $G_t - V_\phi(s_t)$ 无偏，却带着剩下整个回合的方差。Schulman 等（2016）在两者之间做了插值。

::: definition 广义优势估计（GAE） {#def-gae}
对 $\lambda\in[0, 1]$，长度为 $T$ 的回合中第 $t$ 步优势的 **GAE** 估计是 TD 误差的指数加权和

$$
\hat A_t^{\text{GAE}(\gamma, \lambda)} = \sum_{l=0}^{T-1-t}(\gamma\lambda)^l\,\delta_{t+l},
$$ {#eq-gae}

终止状态处取 $V_\phi(s_T) = 0$。它从后往前一趟即可算出：$\hat A_{T-1} = \delta_{T-1}$，$\hat A_t = \delta_t + \gamma\lambda\hat A_{t+1}$。
:::

::: proposition GAE 的两端 {#prop-gae-limits}
$\lambda = 0$ 时 $\hat A_t = \delta_t$，即一步 TD 误差。$\lambda = 1$ 时 $\hat A_t = \sum_{l\ge0}\gamma^lr_{t+l} - V_\phi(s_t) = G_t - V_\phi(s_t)$，即蒙特卡洛回报减去基线，无论 $V_\phi$ 是什么。
:::

::: proof
$\lambda = 0$ 只留下 $l = 0$ 一项。$\lambda = 1$ 时和式逐项相消：

$$
\sum_{l=0}^{T-1-t}\gamma^l\big(r_{t+l} + \gamma V_\phi(s_{t+l+1}) - V_\phi(s_{t+l})\big) = \sum_l\gamma^lr_{t+l} + \gamma^{T-t}V_\phi(s_T) - V_\phi(s_t),
$$

因为每个 $\gamma^{l+1}V_\phi(s_{t+l+1})$ 都与下一项的 $-\gamma^{l+1}V_\phi(s_{t+l+1})$ 相消，且 $V_\phi(s_T) = 0$。
:::

所以 $\lambda$ 在偏差（小 $\lambda$ 时来自不完善的评论家）与方差（大 $\lambda$ 时）之间做权衡。在 RLHF 实现中，$\gamma = 1$、$\lambda$ 接近 $1$（例如 $0.95$）是常见的选择。

::: example 手算 GAE {#ex-gae}
一条三个词元的回复得到终止奖励 $R = 1$，故 $r_0 = r_1 = 0$，$r_2 = 1$。评论家预测 $V(s_0) = 0.5$、$V(s_1) = 0.4$、$V(s_2) = 0.8$，结尾 $V(s_3) = 0$。取 $\gamma = 1$、$\lambda = 0.9$，计算 TD 误差与 GAE 优势。
::: solution
$\delta_0 = 0 + 0.4 - 0.5 = -0.1$，$\delta_1 = 0 + 0.8 - 0.4 = 0.4$，$\delta_2 = 1 + 0 - 0.8 = 0.2$。从后往前：$\hat A_2 = 0.2$；$\hat A_1 = 0.4 + 0.9\cdot0.2 = 0.58$；$\hat A_0 = -0.1 + 0.9\cdot0.58 = 0.422$。评论家认为第二个词元把前景抬升得最多（从 $0.4$ 到 $0.8$），GAE 相应地把功劳记到它头上。若 $\lambda = 1$，每个优势都会是 $1 - V(s_t)$：$0.5$、$0.6$、$0.2$，正如[[#prop-gae-limits]]所述。
:::
:::

## 近端策略优化 {#sec-ppo}

生成回复是语言模型强化学习里最贵的部分：每个样本都要花一次完整的自回归生成。每个样本批次只走一步梯度就把它们扔掉，太浪费。复用样本需要修正它们出自较旧策略这一事实。

设 $\pi_{\text{old}}$ 是生成该批次的策略。对任意 $\theta$，重要度采样给出**代理目标**

$$
L^{\text{IS}}(\theta) = \E_{(s, a)\sim\pi_{\text{old}}}\big[\rho_\theta(s, a)\,\hat A(s, a)\big],\qquad \rho_\theta(s, a) = \frac{\pi_\theta(a\mid s)}{\pi_{\text{old}}(a\mid s)},
$$ {#eq-surrogate}

它在 $\theta = \theta_{\text{old}}$ 处的梯度就是策略梯度，因为 $\nabla\rho_\theta = \rho_\theta\nabla\log\pi_\theta$ 且此处 $\rho = 1$。离开 $\theta_{\text{old}}$ 之后，只要策略没有走远，代理目标对真实改进的近似才算好：状态仍按 $\pi_{\text{old}}$ 分布，优势也是为 $\pi_{\text{old}}$ 估计的。放任最大化 $L^{\text{IS}}$ 会钻它误差的空子，把少数样本上的 $\rho$ 推到极端。**TRPO**（Schulman 等，2015）在新旧策略 KL 散度的约束下最大化它，用二阶方法求解。**PPO**（Schulman 等，2017）用截断这个一阶方法得到了类似的效果。

::: definition PPO 截断目标 {#def-ppo}
对截断参数 $\varepsilon > 0$（Schulman 等，2017 取 $0.2$），

$$
L^{\text{CLIP}}(\theta) = \E_{(s, a)\sim\pi_{\text{old}}}\Big[\min\big(\rho_\theta\hat A,\ \operatorname{clip}(\rho_\theta, 1-\varepsilon, 1+\varepsilon)\,\hat A\big)\Big].
$$ {#eq-ppo}

**PPO** 用 $\pi_{\text{old}}$ 收集一个批次，估计优势（例如用 GAE），然后在 $L^{\text{CLIP}}$ 上做若干个轮次的小批量梯度上升——通常还配上评论家的平方误差损失，有时再加一项熵奖励——之后收集新批次。
:::

::: proposition 截断在做什么 {#prop-clip}
对单个优势为 $\hat A$、比值为 $\rho$ 的样本：
1. $L^{\text{CLIP}}\le\rho\hat A$：截断目标是重要度采样目标的**悲观**（下）界，在 $\rho\in[1-\varepsilon, 1+\varepsilon]$ 内取等。
2. 若 $\hat A > 0$，该项等于 $\min(\rho, 1+\varepsilon)\hat A$：把 $\rho$ 推过 $1+\varepsilon$ 不再带来额外收益，那里梯度为零。若 $\hat A < 0$，它等于 $\max(\rho, 1-\varepsilon)\hat A$：把 $\rho$ 压到 $1-\varepsilon$ 以下不再有收益。
3. 若策略朝*错误*的方向移动了——$\hat A > 0$ 而 $\rho < 1-\varepsilon$，或 $\hat A < 0$ 而 $\rho > 1+\varepsilon$——该项等于 $\rho\hat A$，其梯度不被截断，因而这一步会把它纠正回来。
:::

::: proof
$\hat A > 0$ 时，乘以 $\hat A$ 保持顺序，所以 $\min(\rho\hat A, \operatorname{clip}(\rho)\hat A) = \hat A\min(\rho, \operatorname{clip}(\rho))$。当 $\rho\le1+\varepsilon$ 时，$\operatorname{clip}(\rho)\ge\rho$（它等于 $\rho$，或把 $\rho$ 抬到 $1-\varepsilon$），于是最小值是 $\rho$；当 $\rho > 1+\varepsilon$ 时最小值是 $1+\varepsilon$。所以该项为 $\hat A\min(\rho, 1+\varepsilon)$：它 $\le\rho\hat A$，在 $1+\varepsilon$ 之外是平的，在 $1-\varepsilon$ 以下等于 $\rho\hat A$。$\hat A < 0$ 时乘法翻转顺序：最小值变成 $\hat A\max(\rho, \operatorname{clip}(\rho)) = \hat A\max(\rho, 1-\varepsilon)$，与第一种情形对称。
:::

截断消除了在一个批次内把任何一个概率比值推离 $1$ 太远的动机，这正是同一批样本上多轮更新在实践中安全的原因。它是一个启发式：并不约束相邻策略之间的 KL 散度，实现中通常还会另外监控这个散度，一旦增长过大就提前终止轮次。

::: widget plot
f: min(x*A, clamp(x, 1 - c, 1 + c)*A); x*A
x: 0, 2
y: -2.5, 2.5
sliders: A=1:-2:2:0.1; c=0.2:0.05:0.5:0.05
labels: clipped objective $L^{\mathrm{CLIP}}$; unclipped $\rho\hat A$
vlines: 1
caption: 单个样本的 PPO 目标作为概率比值 $\rho = \pi_\theta/\pi_{\text{old}}$ 的函数，优势为 $\hat A$，截断参数为 $\varepsilon$（滑块 $c$）。$\hat A > 0$ 时，目标随 $\rho$ 上升到 $1+\varepsilon$，此后变平；$\hat A < 0$ 时（把 $A$ 拖到零以下）在 $1-\varepsilon$ 以下是平的。在策略朝优势反方向移动的那一侧，截断与未截断的曲线重合，因此梯度会拉回来。
:::

::: example 截断后的项 {#ex-clip}
取 $\varepsilon = 0.2$，计算下列情形下 PPO 项的值，并判断它对 $\rho$ 的梯度是否非零：(a) $\rho = 1.1$，$\hat A = 2$；(b) $\rho = 1.5$，$\hat A = 2$；(c) $\rho = 0.6$，$\hat A = 2$；(d) $\rho = 0.6$，$\hat A = -1$。
::: solution
(a) $\rho$ 在区间内：$\min(2.2, 2.2) = 2.2$，梯度 $\hat A = 2$。(b) $\min(3.0, 1.2\cdot2) = 2.4$：被截断，梯度为零——这个样本已经被抬得足够高了。(c) $\min(1.2, 0.8\cdot2) = 1.2$：未截断（$\rho\hat A$ 更小），梯度 $2$，把 $\rho$ 往上推。(d) $\min(-0.6, 0.8\cdot(-1)) = -0.8$：被截断，梯度为零——这个坏样本已经被压得足够低了。
:::
:::

## KL 正则目标 {#sec-kl}

面对开放式的文本，奖励函数永远是不完美的：在有限比较集上训练的奖励模型、有偏差的评审模型、有漏洞的测试集。对着它们往死里优化的策略，会找到得分高却并不好的回复——**奖励破解**（[[post-training/reward-models#sec-overoptimisation]]）。标准的防护是惩罚策略离开可信的**参考策略** $\pi_{\text{ref}}$，参考策略通常取 SFT 模型。

::: definition KL 正则奖励目标 {#def-kl-objective}
对奖励 $R$、参考策略 $\pi_{\text{ref}}$ 和系数 $\beta > 0$，

$$
J_\beta(\pi) = \E_{\mathbf{x}\sim\mathcal{D}}\Big[\E_{\mathbf{y}\sim\pi(\cdot\mid\mathbf{x})}\big[R(\mathbf{x}, \mathbf{y})\big] - \beta\,D_{\mathrm{KL}}\big(\pi(\cdot\mid\mathbf{x})\,\Vert\,\pi_{\text{ref}}(\cdot\mid\mathbf{x})\big)\Big].
$$ {#eq-kl-objective}

等价地，$J_\beta(\pi) = \E_{\mathbf{x}}\E_{\mathbf{y}\sim\pi}\big[R(\mathbf{x}, \mathbf{y}) - \beta\log\frac{\pi(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}\big]$：奖励减去 $\beta$ 倍的对数比，在策略自己的样本上取平均。
:::

这里的散度是**反向** KL，$D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$，即在被训练的策略下取期望。它惩罚策略把概率放到参考策略几乎不放的地方，却不惩罚它忽略参考分布的一部分——所以策略可能集中到参考策略认为合理的高奖励回复上（**寻模式**，mode seeking），与 SFT 的前向 KL 趋势相反（[[post-training/instruction-tuning#prop-imitation]]）。[[#eq-kl-objective]]的最大元有闭式解 $\pi^\star\propto\pi_{\text{ref}}\,e^{R/\beta}$，见[[post-training/preference-optimisation#thm-optimal-policy]]的推导：$\beta$ 是一个温度，决定奖励可以把参考策略倾斜多远。

要用词元层面的机器优化 $J_\beta$，必须把序列级的 KL 拆到词元上。

::: proposition KL 惩罚即逐词元奖励 {#prop-kl-tokens}
对自回归的 $\pi$ 与 $\pi_{\text{ref}}$，

$$
D_{\mathrm{KL}}\big(\pi(\cdot\mid\mathbf{x})\,\Vert\,\pi_{\text{ref}}(\cdot\mid\mathbf{x})\big) = \E_{\mathbf{y}\sim\pi}\Big[\sum_t\log\frac{\pi(y_t\mid\mathbf{x}, y_{<t})}{\pi_{\text{ref}}(y_t\mid\mathbf{x}, y_{<t})}\Big] = \E_{\mathbf{y}\sim\pi}\Big[\sum_tD_{\mathrm{KL}}\big(\pi(\cdot\mid s_t)\,\Vert\,\pi_{\text{ref}}(\cdot\mid s_t)\big)\Big].
$$

于是 $J_\beta$ 就是词元 MDP 的期望回报，其逐词元奖励为 $r_t = -\beta\log\frac{\pi(y_{t+1}\mid s_t)}{\pi_{\text{ref}}(y_{t+1}\mid s_t)}$，最后一步再加上 $R(\mathbf{x}, \mathbf{y})$。此外，策略梯度可以把这些惩罚当作普通奖励：

$$
\nabla_\theta J_\beta = \E_{\mathbf{x}}\E_{\mathbf{y}\sim\pi_\theta}\Big[\nabla_\theta\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\Big(R(\mathbf{x}, \mathbf{y}) - \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}\Big)\Big].
$$ {#eq-kl-gradient}
:::

::: proof
由链式法则，$\log\frac{\pi(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})} = \sum_t\log\frac{\pi(y_t\mid\cdot)}{\pi_{\text{ref}}(y_t\mid\cdot)}$；在 $\pi$ 下取期望即得第一个等号。第二个等号：对第 $t$ 项以前缀 $s_{t-1}$ 为条件取期望——对 $y_t\sim\pi(\cdot\mid s_{t-1})$ 取对数比的期望，恰是逐步的散度。至于梯度，记 $f_\theta(\mathbf{y}) = R - \beta\log(\pi_\theta/\pi_{\text{ref}})$，它既通过抽样分布、也直接依赖 $\theta$。于是 $\nabla\E_{\pi_\theta}[f_\theta] = \E[\nabla\log\pi_\theta\,f_\theta] + \E[\nabla f_\theta]$，而由[[#lem-score]]，$\E[\nabla f_\theta] = -\beta\,\E[\nabla\log\pi_\theta(\mathbf{y}\mid\mathbf{x})] = \mathbf{0}$。
:::

KL 的单样本估计 $\log(\pi/\pi_{\text{ref}})$ 无偏但很噪，单个样本上甚至可以是负数，尽管散度本身不会。因此实现中有时改用别的估计量：对 $y\sim\pi$，令 $u = \pi_{\text{ref}}(y)/\pi(y)$，则 $(u - 1) - \log u$ 也是 $D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ 的无偏估计（因为 $\E_\pi[u] = 1$），且永不为负，因为 $\log u\le u - 1$；它常被称为 "k3" 估计量，出自 Schulman（2020）的一篇笔记，GRPO 用的就是它（[[post-training/preference-optimisation#sec-grpo]]）。

::: warning KL 惩罚不是安全保证
KL 项让回复的*分布*平均而言接近参考策略；它并不阻止少数回复发生剧变，也对训练分布之外的提示只字未提。平均 KL 很小，可能掩盖重要罕见提示上的巨大改变；而一个行为不良的参考模型，也会把策略锚定在那种行为上。把 $\beta$ 当作"对一个不完美的奖励该优化多狠"的旋钮，而不是"模型行为改变了多少"的上界——后者必须实测（[[evaluation/evaluation-principles]]）。
:::

::: example 单样本 KL 估计 {#ex-kl}
一条四个词元的回复，各词元在策略下的对数概率为 $-0.2$、$-1.0$、$-0.5$、$-0.1$，在参考下为 $-0.4$、$-1.1$、$-0.9$、$-0.1$。它的奖励为 $R = 2.0$，$\beta = 0.1$。计算逐词元 KL 惩罚、塑形后的总回报，以及第二个词元的 "k3" 估计。
::: solution
对数比 $\log\pi - \log\pi_{\text{ref}}$：$0.2$、$0.1$、$0.4$、$0.0$，总和 $0.7$。逐词元奖励 $-\beta$ 乘这些数：$-0.02$、$-0.01$、$-0.04$、$0$，最后一步再加 $R = 2$，回报为 $2 - 0.07 = 1.93$。第二个词元的 $u = \pi_{\text{ref}}/\pi = e^{-0.1} = 0.9048$，$(u - 1) - \log u = -0.0952 + 0.1 = 0.0048$，比对数比 $0.1$ 小——两个估计量在期望上相等，逐样本却不相等。
:::
:::

::: quiz
在对语言模型的词元 MDP（只有单个终止奖励，$\gamma = 1$）中，哪些说法正确？
- [x] 未来回报 $G_t$ 在每个词元 $t$ 处都等于终止奖励 $R$。
- [x] 减去一个依赖提示但不依赖回复的基线，策略梯度仍然无偏。
- [ ] 用同一个回复自己的奖励算出的基线能保持估计量无偏。
- [ ] PPO 的截断保证相邻策略之间的 KL 散度始终低于 $\varepsilon$。
::: solution
只有终止奖励且没有折扣时，每个未来回报都是 $R$。依赖提示的基线由[[#prop-baseline]]保证无偏。用到样本自身奖励的基线与样本相关，会让估计量有偏（含自身均值会把它缩 $(k-1)/k$，[[#prop-rloo]]）。截断只是消除了把比值推出 $[1-\varepsilon, 1+\varepsilon]$ 的动机，什么都不曾约束住；KL 要另设监控。
:::
:::

::: history
策略梯度路线可追溯到 Williams（1992），其 REINFORCE 算法引入了带基线的似然比估计量；一般 MDP 配函数逼近的策略梯度定理由 Sutton、McAllester、Singh 与 Mansour（2000）证明，Konda 与 Tsitsiklis（2000）分析了演员–评论家方法。Kakade 与 Langford（2002）研究了保守的策略更新，引出 TRPO（Schulman 等，ICML 2015）、广义优势估计（Schulman 等，ICLR 2016）与 PPO（Schulman 等，2017）。异步演员–评论家（Mnih 等，2016）让学出来的基线在深度强化学习中流行开来。文本方面，Ranzato 等（2016）用 REINFORCE 配 BLEU 奖励训练序列模型，Bahdanau 等（2017）用了演员–评论家，Rennie 等（2017）提出自临界训练、以贪心输出为基线。Ziegler 等（2019）把带 KL 惩罚的 PPO 配上学出来的奖励用于预训练语言模型，成为 RLHF 的模板（[[post-training/rlhf]]）；Ahmadian 等（2024）则主张对 RLHF 而言，带留一基线的更简单的 REINFORCE 式方法已经够用。
:::

::: summary
- 生成是一个**词元级 MDP**：转移确定、奖励通常只有终止一处；等价地，它是一个动作等于整个回复的**上下文老虎机**。
- **策略梯度定理** $\nabla J = \E[\sum_t\nabla\log\pi_\theta(a_t\mid s_t)G_t]$ 由对数求导技巧与得分函数的零均值（[[#lem-score]]、[[#thm-pg]]）推出；**REINFORCE** 用样本估计它。
- 不依赖所采动作的**基线**让梯度保持无偏，却能大幅压缩方差；最好的常数基线是奖励的加权平均，**留一**样本基线严格无偏。
- **优势**把动作与策略的平均动作相比较；**GAE** 以权重 $\lambda$ 混合 TD 误差，从一步 TD（$\lambda = 0$）到蒙特卡洛（$\lambda = 1$）。
- **PPO** 用重要度比值复用样本并截断到 $[1-\varepsilon, 1+\varepsilon]$，这个悲观界消除了批次内大幅改换策略的动机。
- **KL 正则目标** $\E[R] - \beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ 限制奖励破解；其惩罚可拆成逐词元的对数比奖励，在梯度中可当作普通奖励处理。
:::

## 习题

::: exercise 一步 REINFORCE 更新 {level=1 check="0.75"}
三个回复（编号 $0$、$1$、$2$）上的 softmax 策略概率为 $(0.5, 0.25, 0.25)$。抽到回复 $1$，得到奖励 $R = 1$，基线 $b = 0$。估计量 $(R - b)\nabla_{\boldsymbol\theta}\log\pi(1)$ 在 logit $\theta_1$ 上的分量是多少？另外两个分量呢？
::: solution
对 softmax 策略 $\nabla_{\boldsymbol\theta}\log\pi(a) = \mathbf{e}_a - \boldsymbol\pi$，所以估计量为 $1\cdot(0 - 0.5,\ 1 - 0.25,\ 0 - 0.25) = (-0.5, 0.75, -0.25)$。$\theta_1$ 的分量是 $0.75$。各分量之和为零，每个 softmax 得分函数都是如此：给所有 logit 加同一个常数不改变策略。
:::
:::

::: exercise PPO 的项 {level=1 check="2.4"}
$\varepsilon = 0.2$，某样本的优势 $\hat A = 2$、概率比 $\rho = 1.5$。它对 $L^{\text{CLIP}}$ 的贡献是多少？
::: solution
$\min(1.5\cdot2,\ \operatorname{clip}(1.5, 0.8, 1.2)\cdot2) = \min(3, 2.4) = 2.4$。该项被截断，对 $\theta$ 的梯度为零（[[#prop-clip]]）。
:::
:::

::: exercise KL 惩罚求和 {level=1 check="0.035"}
一条五个词元的回复，各位置的 $\log\pi(y_t\mid s_{t-1}) - \log\pi_{\text{ref}}(y_t\mid s_{t-1})$ 依次为 $0.1$、$-0.05$、$0.2$、$0.0$、$0.1$。取 $\beta = 0.1$，从奖励中减去的总 KL 惩罚 $\beta\sum_t\log(\pi/\pi_{\text{ref}})$ 是多少？
::: solution
$\sum = 0.35$，惩罚为 $0.1\cdot0.35 = 0.035$。有一个词元的对数比为负：单样本估计逐词元可以为负，尽管期望散度非负（[[#prop-kl-tokens]]）。
:::
:::

::: exercise 没有基线的方差 {level=2 check="123.0156"}
对[[#sec-code]]的老虎机（奖励 $11, 12, 13, 15$，均匀 softmax 策略），精确计算单样本估计量 $R\,(\mathbf{e}_a - \boldsymbol\pi)$ 的总方差（保留四位小数）。再对 $b = \E[R]$ 重算一遍。
::: solution
均匀策略下每个 $a$ 都有 $\lVert\mathbf{e}_a - \boldsymbol\pi\rVert^2 = (3/4)^2 + 3(1/4)^2 = 0.75$。于是 $\E\lVert R\mathbf{g}\rVert^2 = 0.75\,\E[R^2] = 0.75\cdot(121 + 144 + 169 + 225)/4 = 0.75\cdot164.75 = 123.5625$。精确梯度为 $\pi_j(r_j - 12.75) = (-0.4375, -0.1875, 0.0625, 0.5625)$，平方范数 $0.546875$。总方差 $123.5625 - 0.546875 = 123.0156$。取 $b = 12.75$：$0.75\,\E[(R - 12.75)^2] = 0.75\cdot2.1875 = 1.640625$，减去 $0.546875$，得 $1.0938$——与模拟得到的 $123.02$ 和 $1.10$ 吻合。
:::
:::

::: exercise GAE {level=2 check="0.15"}
把[[#ex-gae]]改用 $\lambda = 0.5$ 重做，给出 $\hat A_0$。对第一个词元的优势，$\lambda = 0.5$ 与 $\lambda = 0.9$ 哪个估计更依赖评论家？
::: solution
TD 误差不变：$\delta_0 = -0.1$、$\delta_1 = 0.4$、$\delta_2 = 0.2$。从后往前：$\hat A_2 = 0.2$，$\hat A_1 = 0.4 + 0.5\cdot0.2 = 0.5$，$\hat A_0 = -0.1 + 0.5\cdot0.5 = 0.15$；直接算，$\delta_0 + 0.5\delta_1 + 0.25\delta_2 = -0.1 + 0.2 + 0.05 = 0.15$。$\lambda$ 越小越依赖评论家：它把靠后的 TD 误差衰减得更快，从而更多倚仗评论家的一步判断 $V(s_1) - V(s_0)$；而 $\lambda = 1$ 只用到实测奖励本身，$1 - V(s_0) = 0.5$。
:::
:::

::: exercise 区间之外的负优势 {level=2 check="-0.8"}
$\varepsilon = 0.2$，某样本 $\hat A = -1$、$\rho = 0.6$。计算它的 PPO 项及其对 $\rho$ 的梯度。再对 $\rho = 1.4$ 做同样的事。
::: solution
$\rho = 0.6$：$\min(-0.6, 0.8\cdot(-1)) = -0.8$，关于 $\rho$ 是常数，梯度为 $0$——这个坏回复已经被压得足够低了。$\rho = 1.4$：$\min(-1.4, 1.2\cdot(-1)) = -1.4 = \rho\hat A$，梯度 $\hat A = -1$：策略走错了方向，未截断的梯度把 $\rho$ 压回去（[[#prop-clip]]，第 3 种情形）。
:::
:::

::: exercise 留一的无偏性 {level=2}
对 $k = 2$ 详细证明[[#prop-rloo]]：写出估计量，对 $\mathbf{y}_2$ 取条件，说明第一项的期望是 $\nabla\E[R]/2$。再证明：若用均值 $\frac12(R_1 + R_2)$ 同时作两个样本的基线，所得估计量恰为留一估计量的一半。
::: solution
估计量为 $\frac12[(R_1 - R_2)\mathbf{g}_1 + (R_2 - R_1)\mathbf{g}_2]$，其中 $\mathbf{g}_i = \nabla\log\pi_\theta(\mathbf{y}_i\mid\mathbf{x})$。第一项：$\E[(R_1 - R_2)\mathbf{g}_1] = \E[R_1\mathbf{g}_1] - \E_{\mathbf{y}_2}\big[R_2\,\E_{\mathbf{y}_1}[\mathbf{g}_1]\big] = \nabla\E[R] - 0$，用到独立性与[[#lem-score]]；第二项同理，故估计量的均值为 $\frac12(\nabla\E R + \nabla\E R) = \nabla\E R$。用共享均值时，$R_1 - \frac12(R_1 + R_2) = \frac12(R_1 - R_2)$，样本 $2$ 类似，于是估计量恰为留一估计量的一半：方向无偏，被缩放了 $\frac{k-1}{k} = \frac12$。另注意 $k = 2$ 时两个回复拿到的优势大小相等、符号相反——一次成对比较，正如偏好学习中所做的那样。
:::
:::

::: exercise 非均匀策略的最佳基线 {level=3 check="12.75"}
两个回复上的 softmax 策略 $\boldsymbol\pi = (0.75, 0.25)$，奖励 $R = (12, 13)$。(a) 对每个回复计算 $\lVert\mathbf{g}\rVert^2$，其中 $\mathbf{g} = \mathbf{e}_a - \boldsymbol\pi$。(b) 计算[[#eq-best-baseline]]的最佳常数基线 $b^\star$，并与 $\E[R]$ 比较。(c) 证明两个动作时在 $b^\star$ 处总方差为零，并解释原因。
::: solution
(a) $a = 0$：$\mathbf{g} = (0.25, -0.25)$，$\lVert\mathbf{g}\rVert^2 = 0.125$；$a = 1$：$\mathbf{g} = (-0.75, 0.75)$，$\lVert\mathbf{g}\rVert^2 = 1.125$。(b) $\E[\lVert\mathbf{g}\rVert^2] = 0.75\cdot0.125 + 0.25\cdot1.125 = 0.375$，$\E[R\lVert\mathbf{g}\rVert^2] = 0.75\cdot12\cdot0.125 + 0.25\cdot13\cdot1.125 = 1.125 + 3.65625 = 4.78125$，故 $b^\star = 4.78125/0.375 = 12.75$。它大于 $\E[R] = 0.75\cdot12 + 0.25\cdot13 = 12.25$，因为罕见的回复有更大的得分范数，得到更多权重。(c) 两个估计量分别为 $(12 - b)(0.25, -0.25)$ 与 $(13 - b)(-0.75, 0.75)$；$b = 12.75$ 时二者都等于 $(-0.1875, 0.1875)$，恰是精确梯度 $\big(\pi_0(r_0 - \E R), \pi_1(r_1 - \E R)\big)$。估计量是常数，方差自然为零。两个动作时每个得分向量都是 $(1, -1)$ 的倍数，所以一个标量基线就能让所有样本彼此一致。
:::
:::

::: exercise 带 KL 惩罚的未来回报 {level=3}
在词元 MDP 中，对 $t < T - 1$ 取逐词元奖励 $r_t = -\beta\log(\pi_\theta/\pi_{\text{ref}})(y_{t+1}\mid s_t)$，$r_{T-1} = R - \beta\log(\pi_\theta/\pi_{\text{ref}})(y_T\mid s_{T-1})$。写出 $\gamma = 1$ 时的未来回报 $G_t$。借助[[#thm-pg]]的证明解释：为什么用 $G_t$ 给 $\nabla\log\pi_\theta(y_{t+1}\mid s_t)$ 加权的梯度估计量，比用总回报 $G_0$ 加权的方差更低，而两者都无偏。哪些词元的惩罚会影响第一个词元的更新，哪些影响最后一个词元？
::: solution
$G_t = R - \beta\sum_{k\ge t}\log(\pi_\theta/\pi_{\text{ref}})(y_{k+1}\mid s_k)$：终止奖励减去从 $t$ 起各词元的惩罚。总回报 $G_0$ 多加了 $t$ 之前词元的惩罚，而那些惩罚在 $t$ 处动作之前就由历史决定了；按[[#thm-pg]]的证明，它们与 $\nabla\log\pi_\theta(y_{t+1}\mid s_t)$ 的乘积期望为零，把它们丢掉既保持估计量无偏，又去掉了只添方差、不带信号的项。第一个词元的更新被每个词元的惩罚加权（它的未来回报就是整个回报）；最后一个词元只被自己的惩罚和 $R$ 影响。直观地说：一个词元只能为发生在它之后的事负责。
:::
:::
