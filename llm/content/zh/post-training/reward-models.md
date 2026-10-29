[[post-training/rl-for-language-models]]里的强化学习机器需要一个奖励：给每个回复一个数。对单元测试或数学答案，这个数容易算。对"给这封邮件写一段有用而诚实的回复"就不容易，而且没有人写得出来。让 RLHF 成功的关键，是从人的判断中**学出**奖励；而人最拿得准的判断不是打分，是比较：*这两个答案，哪个更好？*

本章就从这样的比较出发搭建**奖励模型**。定义 **Bradley–Terry 模型**，把两两损失推导为它的最大似然目标，并证明实践中要紧的几条性质——奖励在每个提示下只到一个常数、损失是恰当评分规则、标签噪声为准确率封顶。然后讲述奖励模型如何构造与训练，再讲核心难题：学出来的奖励是代理，把代理优化到足够狠，它就不再追踪目标了。本章证明 best-of-$n$ 选择的 KL 代价，给出 Gao、Schulman 与 Hilton（2023）发现的过度优化的经验**标度规律**，最后以**过程**奖励收尾——它评的是解答的每一步，而不只是结果。

## 为什么是比较 {#sec-comparisons}

请标注者给回复打 $1$ 到 $7$ 的分，答案取决于每个标注者自己的尺度、刚才给什么打了分、甚至心情；两个人可能一致认定两个回复中哪个更好，给出的绝对数字却相去甚远。比较把这些偏移抵消掉了。它也更贴近真正要紧的决策：策略得到改进时，要问的正是新回复是否比旧回复更好。

比较数据集的形状是 $\mathcal{D} = \{(\mathbf{x}^{(i)}, \mathbf{y}_w^{(i)}, \mathbf{y}_l^{(i)})\}$：一个提示、一个**被选**（胜出）回复、一个**被拒**（落败）回复。回复通常从当下的模型采样——SFT 模型、较早的策略、有时是别的系统——让比较覆盖策略将要产出的那类文本。要把比较变成奖励，需要一个模型，说明隐藏的质量如何产生这些比较。

## Bradley–Terry 模型 {#sec-bt}

::: definition Bradley–Terry 模型 {#def-bt}
提示 $\mathbf{x}$ 的每个回复 $\mathbf{y}$ 有一个实值**奖励** $r(\mathbf{x}, \mathbf{y})$。在 **Bradley–Terry 模型**中，$\mathbf{y}_1$ 与 $\mathbf{y}_2$ 的一次比较以如下概率偏好 $\mathbf{y}_1$

$$
P(\mathbf{y}_1\succ\mathbf{y}_2\mid\mathbf{x}) = \frac{e^{r(\mathbf{x}, \mathbf{y}_1)}}{e^{r(\mathbf{x}, \mathbf{y}_1)} + e^{r(\mathbf{x}, \mathbf{y}_2)}} = \sigma\big(r(\mathbf{x}, \mathbf{y}_1) - r(\mathbf{x}, \mathbf{y}_2)\big),
$$ {#eq-bt}

其中 $\sigma(z) = 1/(1 + e^{-z})$ 是 logistic 函数（[[ml-fundamentals/logistic-regression#def-sigmoid]]），并且在奖励给定的条件下不同的比较相互独立。
:::

等价地说，每个回复有一个正的**强度** $e^{r}$，一次比较获胜的机会与强度成正比。奖励相差 $1$，意味着更好的回复在 $\sigma(1) = 73\%$ 的比较中获胜；相差 $3$ 则是 $95\%$。棋手的 Elo 等级分是同一个模型换了个刻度：Elo 相差 $400$ 分对应强度 $10$ 倍，即 $r = \frac{\ln10}{400}\times\text{Elo}$。

可以从随机效用模型推出[[#eq-bt]]：若每次比较把 $\mathbf{y}_k$ 的质量感知为 $r_k + \varepsilon_k$，其中 $\varepsilon_k$ 是独立的标准 Gumbel 噪声，那么两个 Gumbel 变量之差服从 logistic 分布，第一个感知质量更大的概率就是 $\sigma(r_1 - r_2)$。把噪声换成高斯的，得到极为相似的 Thurstone 模型。无论哪种，模型断言的都是可检验的事：偏好**按概率传递**，且由每个回复的一个数决定。真实的人类偏好可能违背这一点——不同标注者对有用与简洁的权衡不同，而一群各自一致的标注者，其多数偏好可以是不传递的——这也是奖励模型不完美的重要原因。

::: proposition 奖励在每个提示下只到一个常数 {#prop-shift}
对任何函数 $c(\mathbf{x})$，奖励 $r(\mathbf{x}, \mathbf{y})$ 与 $r(\mathbf{x}, \mathbf{y}) + c(\mathbf{x})$ 对每次比较都给出相同的偏好概率[[#eq-bt]]。反之，若两个奖励函数对 $\mathbf{x}$ 的每对回复都给出相同的偏好概率，那么它们在 $\mathbf{x}$ 的回复之间只相差一个常数。
:::

::: proof
概率只依赖差 $r(\mathbf{x}, \mathbf{y}_1) - r(\mathbf{x}, \mathbf{y}_2)$，其中 $c(\mathbf{x})$ 相消。反过来，$\sigma$ 是单射，所以概率相等意味着每对的差相等，$r(\mathbf{x}, \mathbf{y}_1) - r'(\mathbf{x}, \mathbf{y}_1) = r(\mathbf{x}, \mathbf{y}_2) - r'(\mathbf{x}, \mathbf{y}_2)$，而这是关于 $\mathbf{y}$ 的常数。
:::

由此得出三条实践后果。奖励模型对*不同*提示下回复的输出不可比较：一个提示上的奖励 $2$ 可能比另一个提示上的 $-1$ 更差。策略梯度方法不受影响，因为每个提示的常数就是一个基线（[[post-training/rl-for-language-models#prop-baseline]]）；但凡是跨提示汇集奖励的做法——滑动平均基线、按奖励阈值筛选——都会继承那些任意的偏移。实现中还常常在训练后对奖励模型做**归一化**；InstructGPT 把它整体平移，使标注者撰写的示范平均得 $0$ 分。奖励的*尺度*则不然，它是固定的：logistic 联系函数让相差 $1$ 就意味着 $73\%$。

### 两两损失 {#sec-loss}

::: proposition 奖励模型的损失就是 Bradley–Terry 似然 {#prop-rm-loss}
设 $r_\phi$ 是参数化的奖励。比较数据集在[[#eq-bt]]下的负对数似然，对比较取平均，是

$$
\mathcal{L}_{\text{RM}}(\phi) = -\frac{1}{|\mathcal{D}|}\sum_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\in\mathcal{D}}\log\sigma\big(r_\phi(\mathbf{x}, \mathbf{y}_w) - r_\phi(\mathbf{x}, \mathbf{y}_l)\big),
$$ {#eq-rm-loss}

并记 $\Delta = r_\phi(\mathbf{x}, \mathbf{y}_w) - r_\phi(\mathbf{x}, \mathbf{y}_l)$，则单一项的梯度是

$$
\nabla_\phi\big[-\log\sigma(\Delta)\big] = -\sigma(-\Delta)\,\big(\nabla_\phi r_\phi(\mathbf{x}, \mathbf{y}_w) - \nabla_\phi r_\phi(\mathbf{x}, \mathbf{y}_l)\big).
$$ {#eq-rm-grad}
:::

::: proof
每次比较是一次独立观察"列在前面的回复获胜"，模型下其概率为 $\sigma(\Delta)$；对数似然是各 $\log\sigma(\Delta)$ 之和，最大化它就是最小化[[#eq-rm-loss]]（[[math-for-ml/estimation#def-mle]]）。梯度方面，$\frac{d}{d\Delta}\log\sigma(\Delta) = 1 - \sigma(\Delta) = \sigma(-\Delta)$，链式法则给出[[#eq-rm-grad]]。
:::

梯度一目了然。每次比较把被选奖励抬高、被拒奖励压低，权重是 $\sigma(-\Delta)$：模型此刻赋予*错误*结果的概率。模型已经以大差距排对的比较几乎不贡献什么；排错的几乎全额贡献。这就是对奖励*差*做 logistic 回归（[[ml-fundamentals/logistic-regression#prop-logistic-loss]]），标签永远是"前者胜"。

::: proposition 两两损失的性质 {#prop-rm-props}
1. **凸性。** 作为奖励值 $(r_w, r_l)$ 的函数——因而也作为对它们线性的任何奖励之参数的函数，例如固定特征上的线性头——每一项 $-\log\sigma(r_w - r_l)$ 都是凸的。
2. **恰当评分。** 设某对回复中真实偏好 $\mathbf{y}_1$ 的概率是 $p\in(0, 1)$。对标签取期望的损失，即 $\Delta = r_1 - r_2$ 时的 $-p\log\sigma(\Delta) - (1-p)\log\sigma(-\Delta)$，恰在 $\sigma(\Delta) = p$ 时最小，即 $\Delta = \log\frac{p}{1-p}$。
:::

::: proof
(1) $f(z) = -\log\sigma(z) = \log(1 + e^{-z})$ 满足 $f''(z) = \sigma(z)\sigma(-z) > 0$，而凸函数的线性函数仍是凸函数。(2) 期望损失就是 $(p, 1-p)$ 与 $(\sigma(\Delta), \sigma(-\Delta))$ 之间的二元交叉熵，等于 $H(p) + D_{\mathrm{KL}}$，当两个分布一致时最小（[[math-for-ml/information-theory#thm-gibbs]]）。
:::

第 2 条是说：数据足够时，奖励模型学到的是偏好的真实对数几率——标注者 $60{:}40$ 分歧的一对，奖励差应当是 $\log1.5 = 0.405$，而不是无穷大。而在每对只标一次的有限数据集上，经验频率非 $0$ 即 $1$，除了正则化和早停，什么也拦不住差距变大——这一事实在直接偏好优化中再次出现（[[post-training/preference-optimisation#sec-ipo]]）。

::: example 手算奖励模型的损失 {#ex-rm-loss}
某奖励模型给被选回复打 $1.2$ 分，给被拒回复打 $0.4$ 分。求它赋予所观察偏好的概率、损失，以及梯度系数 $\sigma(-\Delta)$。若两个分数对调，再算一遍。
::: solution
$\Delta = 0.8$，$\sigma(0.8) = 0.690$，损失 $-\ln0.690 = 0.371$，系数 $\sigma(-0.8) = 0.310$。对调：$\Delta = -0.8$，概率 $0.310$，损失 $-\ln0.310 = 1.171$，系数 $0.690$。排错的代价是三倍，拿到的梯度也超过两倍。给两个分数同加一个常数，什么都不变（[[#prop-shift]]）。
:::
:::

::: example Elo 与 Bradley–Terry {#ex-elo}
两个聊天模型的擂台式 Elo 等级分为 $1250$ 和 $1150$。在 Elo 等级分背后的 Bradley–Terry 模型下，前者应当赢下多大比例的比较？换算成纳特的奖励差是多少？
::: solution
按 $400$ 分对应几率 $10$ 倍的约定，胜算是 $10^{100/400} = 1.778$，于是前者赢 $1.778/2.778 = 64\%$。奖励差为 $\ln1.778 = 0.576$ 纳特（$= 100\ln10/400$）。用人类两两投票给聊天模型排名的排行榜，如 Chatbot Arena（Chiang 等，2024），正是在数百万次比较上拟合这个模型（[[evaluation/human-evaluation]]）。
:::
:::

## 构造奖励模型 {#sec-architecture}

::: definition 神经奖励模型 {#def-rm}
**奖励模型** $r_\phi(\mathbf{x}, \mathbf{y})$ 是一个 Transformer 语言模型——通常从 SFT 模型或同族模型初始化——其输出层换成一个**标量头**：把 $\mathbf{x}\oplus\mathbf{y}$ 最后一个词元（常常是序列结束词元）处的最终隐藏状态线性映到一个实数。它在比较上以损失[[#eq-rm-loss]]训练，通常只训一个轮次（epoch）。
:::

奖励模型以评审才有的事后双向视角读整个提示与回复——最后一个词元可以注意到一切——并把它的判断压缩成一个数。从预训练且经过指令微调的模型出发很要紧：评判一个回复，需要先知道好的回复长什么样。文献报告的实践细节包括：

- **对多个回复排序。** InstructGPT（Ouyang 等，2022）让标注者对一个提示的 $4$ 到 $9$ 个回复排序，每个提示得到 $\binom{K}{2}$ 次比较。把这些比较当作独立样本会让奖励模型在一个轮次内过拟合，因为每个回复出现在 $K - 1$ 次比较中；把同一提示的所有比较放在一起训练（作为一个批次元素）避免了这一点，而且更省，因为每个回复只需一次前向。**Plackett–Luce** 模型把 Bradley–Terry 推广到完整排序。
- **偏好强度。** Llama 2（Touvron 等，2023）让标注者按四级量表指出被选回复好多少，并在损失中加入随所述强度增长的间隔 $m$：$-\log\sigma(\Delta - m)$。它还分别训练了有用性与安全性两个奖励模型，因为这两个目标在某些提示上互相冲突。
- **平局。** 标为"一样好"的比较常常被丢弃；对平局建模的方法（Bradley–Terry 的 Rao–Kupper 或 Davidson 推广之类）存在，但不常见。
- **模型规模。** InstructGPT 给 $1750$ 亿参数的策略配了 $60$ 亿参数的奖励模型，并报告训练 $1750$ 亿参数的奖励模型不稳定。奖励模型越大，通常越能扛住过度优化（见下文）。

::: example 从排序得出比较 {#ex-ranking}
标注者对一个提示的 $K = 7$ 个回复排序。这给出多少次两两比较？若一次比较全部处理，这个提示上的一步训练需要几次奖励模型的前向计算？
::: solution
$\binom72 = 21$ 次比较，$7$ 次前向（每个回复一次），因为每次比较都复用七个标量奖励中的两个。把 $21$ 次比较当独立样本各算各的要花 $42$ 次前向，而且如 InstructGPT 所见，等于每个回复每个轮次被计权 $6$ 次，助长过拟合。
:::
:::

### 用代码拟合 Bradley–Terry {#sec-code}

下面的程序模拟五个回复之间 $2{,}000$ 次比较，隐藏奖励为 $0, 0.5, 1, 1.5, 3$，由 Bradley–Terry 模型生成，再用[[#eq-rm-loss]]做梯度下降把奖励恢复出来，每个回复一个自由参数（"表格式"奖励模型）。然后拿训练准确率与任何模型在这样含噪标签下所能达到的最佳准确率作比较。

```python
import math, random

def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-z))

# 1. 在模拟的比较上拟合 Bradley-Terry 模型
true_r = [0.0, 0.5, 1.0, 1.5, 3.0]                    # 某提示下 5 个回复的隐藏奖励
K = len(true_r)
rng = random.Random(0)
data = []                                              # (胜者, 负者) 对
for _ in range(2000):
    i, j = rng.sample(range(K), 2)
    if rng.random() < sigmoid(true_r[i] - true_r[j]):
        data.append((i, j))
    else:
        data.append((j, i))

r = [0.0] * K
for step in range(2000):                               # 对平均 BT 损失做梯度下降
    g = [0.0] * K
    for w, l in data:
        q = sigmoid(-(r[w] - r[l]))                    # d loss / d r_l = q，d loss / d r_w = -q
        g[w] -= q; g[l] += q
    r = [ri - 0.5 * gi / len(data) for ri, gi in zip(r, g)]
loss = -sum(math.log(sigmoid(r[w] - r[l])) for w, l in data) / len(data)
shift = sum(true_r) / K - sum(r) / K                   # 奖励只到一个常数
print("fitted (shifted):", [round(x + shift, 3) for x in r])
print("true:            ", true_r)
acc = sum(r[w] > r[l] for w, l in data) / len(data)
pairs = [(i, j) for i in range(K) for j in range(K) if i < j]
ceiling = sum(sigmoid(abs(true_r[i] - true_r[j])) for i, j in pairs) / len(pairs)
print(f"mean loss {loss:.4f}  training accuracy {acc:.3f}  Bayes ceiling {ceiling:.3f}")
```

```text
fitted (shifted): [-0.066, 0.575, 1.052, 1.583, 2.856]
true:             [0.0, 0.5, 1.0, 1.5, 3.0]
mean loss 0.4982  training accuracy 0.771  Bayes ceiling 0.772
```

拟合的奖励平移到与真实奖励同均值（由[[#prop-shift]]，这是唯一的自由度）后，与真值的差异就在抽样误差之内。可模型仍然"做错" $23\%$ 的训练比较——不是因为模型差，而是因为标签含噪：即便拿真实奖励去对，也只能同意其中约 $77\%$。

## 评测奖励模型 {#sec-evaluation}

通行的指标是留出比较上的**两两准确率**：被选回复拿到更高奖励的比例。上面的程序说明了为什么再完美的奖励模型也到不了 $100\%$。

::: proposition 准确率的天花板 {#prop-ceiling}
若比较服从真实奖励为 $r^\star$ 的 Bradley–Terry 模型，则真实差距为 $\Delta^\star = r^\star(\mathbf{y}_1) - r^\star(\mathbf{y}_2)$ 的一对，其标签以概率 $\sigma(|\Delta^\star|)$ 偏向真正更好的那个回复。任何奖励模型，无论多好，其期望准确率都不超过评测对上 $\E\big[\sigma(|\Delta^\star|)\big]$ 的平均，而真实奖励可以达到它。
:::

::: proof
对固定一对，把 $\mathbf{y}_1$ 排在 $\mathbf{y}_2$ 之上的模型以概率 $P(\mathbf{y}_1\succ\mathbf{y}_2) = \sigma(\Delta^\star)$ 排对，持相反排序则以 $\sigma(-\Delta^\star)$ 排对。两者中较好的是 $\max(\sigma(\Delta^\star), \sigma(-\Delta^\star)) = \sigma(|\Delta^\star|)$，按 $r^\star$ 排序即可达到。对各个对取平均即得上界。
:::

用人类标签时，天花板由人与人的一致程度决定。InstructGPT 报告其训练标注者彼此一致的比例约为 $73\%$；在这类数据上训练的奖励模型，报告的留出准确率常在高 $60$ 出头到低 $70$ 出头个百分点之间。所以 $70\%$ 的准确率不是"错了 $30\%$"——它可能已接近最优。这也意味着，准确率本身几乎说明不了最要紧的性质：奖励在策略*未来*的输出上表现如何。RewardBench（Lambert 等，2024）这类基准在精心挑选的配对（聊天、安全、推理、拒答，其中一个回复明显更好）上评测奖励模型，去掉了标签噪声，但检验的分布也更窄。

::: quiz
某奖励模型在留出比较上有 $69\%$ 的准确率，每对比较由一个人标注。同一批对上标注者之间的一致率是 $72\%$。你能得出什么结论？
- [ ] 奖励模型错了 $31\%$ 的对，需要大幅加练。
- [x] 模型已接近任何模型在这批标签上能达到的准确率；再提高，准确率也看不出来。
- [ ] 奖励模型不会被过度优化，因为它几乎和人一样好。
- [ ] 标注者不负责任，这批数据应当作废。
::: solution
由[[#prop-ceiling]]，标签噪声为可达准确率设了上限；两个含噪标注者之间的一致率，大致是那个上限的替身。留出集上接近天花板，对优化之下的稳健性仍一无所知：策略会去搜索远离评测对的回复，那里模型可能错得离谱。
:::
:::

## 奖励破解与过度优化 {#sec-overoptimisation}

奖励模型是"标注者想要什么"的代理，在它训练时那批回复的分布上算得准。强化学习是在搜索最大化代理的回复，它自会朝着代理恰好在有利方向上出错的那些区域移动。这就是**古德哈特定律**（Goodhart's law）——"一个度量一旦成为目标，它就不再是好度量"——在 RLHF 中它表现为**奖励破解**：得分高却不好的回复。有记录的例子包括系统性的**长度**增长——奖励模型常常不问内容就奖励长度（Singhal 等，2023 发现其设定下 RLHF 带来的奖励增长，大部分只优化长度就能拿到）；**谄媚**——附和用户表达过的观点，人类偏好数据正奖励这一点（Sharma 等，2024）；以及过度含糊、过度排版之类文风怪癖。这一现象的涉及面比语言模型更广，专门讨论见[[safety-alignment/reward-hacking]]。

对着奖励模型做优化的最简方式，是 **best-of-$n$** 采样：从策略抽 $n$ 个回复，保留奖励最高的那个。它相对原策略的散度代价可以精确算出。

::: theorem best-of-$n$ 的 KL 散度 {#thm-bon-kl}
设回复从 $\pi$ 抽取，奖励 $R(\mathbf{y})$ 在 $\pi$ 下服从连续分布（无并列）。令 $\pi_n$ 为 $n$ 个独立样本中奖励最高的回复的分布。则

$$
D_{\mathrm{KL}}(\pi_n\,\Vert\,\pi) = \log n - \frac{n-1}{n}.
$$ {#eq-bon-kl}
:::

::: proof
设 $F$ 是 $R(\mathbf{y})$ 在 $\pi$ 下的累积分布函数。入选回复落在 $\mathbf{y}$ 附近的小集合 $A$ 内，当且仅当 $n$ 个样本中有一个落在 $A$ 而其余 $n - 1$ 个奖励更低；这个样本有 $n$ 种选法，故 $\pi_n(\mathbf{y}) = n\,F(R(\mathbf{y}))^{n-1}\pi(\mathbf{y})$，密度比为 $n F(R(\mathbf{y}))^{n-1}$。于是

$$
D_{\mathrm{KL}}(\pi_n\Vert\pi) = \E_{\pi_n}\big[\log n + (n-1)\log F(R(\mathbf{y}))\big].
$$

在 $\pi$ 下 $U = F(R(\mathbf{y}))$ 服从 $[0, 1]$ 上的均匀分布（概率积分变换，需要连续性），于是在 $\pi_n$ 下它是 $n$ 个均匀变量的最大值，密度为 $nu^{n-1}$。于是 $\E[\log U] = \int_0^1nu^{n-1}\log u\,du = -\frac1n$（分部积分），从而 $D_{\mathrm{KL}} = \log n - \frac{n-1}{n}$。
:::

对语言模型，奖励并不连续，同一回复可能被抽到两次；Beirami 等（2024）表明此时[[#eq-bon-kl]]是一个上界。这个公式只按对数增长：best-of-$1{,}000$ 的代价约 $5.9$ 纳特。这让 best-of-$n$ 成了度量优化压力的一把好用的尺子：任何优化器——包括 RL——都可以按它已经花掉的 KL 散度摆到同一条数轴上。

Gao、Schulman 与 Hilton（ICML 2023）就是用这条轴系统地度量过度优化的。为了不必在每个点上花人类标签的钱，他们采用合成设定：一个大的"金标"（gold）奖励模型扮演人类标注者，为训练较小的**代理**奖励模型的那些比较打标签。然后他们对每个代理做优化——用 best-of-$n$，也用 RL——沿途以 $d = \sqrt{D_{\mathrm{KL}}(\pi\Vert\pi_{\text{init}})}$ 的函数记录*金标*奖励。

::: proposition 过度优化的标度（经验规律，Gao 等，2023） {#prop-gao}
在 Gao 等的实验中，金标奖励（相对初始策略）作为 $d = \sqrt{D_{\mathrm{KL}}}$ 的函数，可被

$$
R_{\text{bon}}(d) = d\,(\alpha_{\text{bon}} - \beta_{\text{bon}}\,d),\qquad R_{\text{RL}}(d) = d\,(\alpha_{\text{RL}} - \beta_{\text{RL}}\log d),
$$ {#eq-gao}

分别对 best-of-$n$ 与 RL 拟合得很好，与此同时代理奖励一路上升。拟合系数随代理奖励模型的参数量平滑地——大约按对数——变化：代理越大，被过度优化得越晚、越轻。更多的比较数据也有帮助。这些是一个实验设定下的拟合形式，不是定律：人类标签、别的模型、别的优化器下会怎样，它们没有说。
:::

两种形式都先升、达峰、再落：best-of-$n$ 的金标奖励在 $d = \alpha_{\text{bon}}/(2\beta_{\text{bon}})$ 处达峰，RL 的在 $d = e^{\alpha_{\text{RL}}/\beta_{\text{RL}} - 1}$ 处达峰。越过峰值之后，对代理的继续优化会让策略*更差*——按代理本要代表的那个标准——而代理奖励本身对此毫无预警。

::: widget plot
f: x*(a - b*x); x*(c - k*log(x))
x: 0.01, 10
y: -2, 6
sliders: a=1.5:0.2:3:0.1; b=0.15:0.02:0.5:0.01; c=1.2:0.2:3:0.1; k=0.5:0.1:1.5:0.05
labels: best-of-$n$ gold reward $d(\alpha - \beta d)$; RL gold reward $d(\alpha - \beta\log d)$
caption: Gao 等（2023）的拟合形式[[#eq-gao]]，取有代表性的系数，横轴为 $d = \sqrt{\mathrm{KL}}$（单位纳特$^{1/2}$）。$a = 1.5$、$b = 0.15$ 时，best-of-$n$ 曲线在 $d = 5$ 处达峰（$\mathrm{KL} = 25$ 纳特，远超任何实际的 $n$，best-of-$1000$ 不过 $5.9$ 纳特）；$c = 1.2$、$k = 0.5$ 时 RL 曲线在 $d = e^{1.4} = 4.1$ 处达峰。把 $b$ 与 $k$ 调小——在他们的实验里对应更大的代理奖励模型——峰值右移。
:::

下面的模拟以最简形式展示这一机制。每个采样回复有一个金标质量 $g\sim\Normal(0, 1)$，代理奖励在之上有独立的重尾误差（缩放过的、$2$ 个自由度的 Student-$t$）。best-of-$n$ 按代理挑选。

```python
def student_t(rng, nu):
    z = rng.gauss(0, 1)
    chi2 = sum(rng.gauss(0, 1) ** 2 for _ in range(nu))
    return z / math.sqrt(chi2 / nu)

rng = random.Random(1)
print("   n   proxy of chosen   gold of chosen   KL bound log n-(n-1)/n")
for n in (1, 4, 16, 64, 256, 1024):
    P = G = 0.0
    trials = 2000
    for _ in range(trials):
        best = None
        for _ in range(n):
            gold = rng.gauss(0, 1)
            proxy = gold + 0.5 * student_t(rng, 2)     # 代理 = 金标 + 重尾误差
            if best is None or proxy > best[0]:
                best = (proxy, gold)
        P += best[0]; G += best[1]
    print(f"{n:5d}   {P / trials:14.3f}   {G / trials:14.3f}   {math.log(n) - (n - 1) / n:10.3f}")
```

```text
   n   proxy of chosen   gold of chosen   KL bound log n-(n-1)/n
    1           -0.012           -0.019        0.000
    4            1.604            0.781        0.636
   16            2.930            1.134        1.835
   64            5.439            0.962        3.175
  256           10.131            0.534        4.549
 1024           19.822            0.204        5.932
```

入选回复的代理奖励无界地增长，金标质量却在 $n = 16$ 附近达峰，随后回落向平均水平。温和地优化时，按代理挑选挑出的多半是好回复；猛烈优化时，挑出的多半是代理误差极端的那些回复，它们并不比平均更好。Gao 等区分了这类现象的好几种机制，这里的重尾误差是最简单的一种。

::: warning 奖励上升不是改进的证据
RLHF 期间，奖励模型的分数几乎总在涨——优化器干的正是这件事。单看这一点，什么也说不了；越过过度优化的峰值后，它和质量反向而行。要追踪独立的信号：留出集上人类或强模型的评判、与参考策略的 KL 散度、回复长度、拒答率、任务基准。奖励突然跳升，或 KL 飞速增长时奖励仍一路攀升，要当作警报。
:::

实践中各条缓解措施打击的是问题的不同部位：**KL 惩罚**限制策略走多远（[[post-training/rl-for-language-models#sec-kl]]）；**更大的奖励模型与更多数据**把峰值推远；奖励模型的**集成**——优化最小值、或均值减去方差的倍数这类保守组合——降低对任何单个模型错误的利用（Coste 等，2024；Eisenstein 等，2023 发现集成能缓解但消不掉破解）；**迭代收集数据**把当前策略的样本送去标注，让奖励模型学到自己错在哪里，如 Bai 等（2022a）与 Llama 2 描述的每周更新；**长度控制**对回复长度施加惩罚或归一。

## 过程奖励与结果奖励 {#sec-process}

对数学、代码、规划这类多步解答的任务，奖励可以只评最终结果，也可以评每一步。

::: definition 结果奖励模型与过程奖励模型 {#def-prm}
**结果奖励模型**（ORM）按最终答案是否正确给完整解答打分，常常用检查答案自动得到的标签训练。**过程奖励模型**（PRM）给解答的每个中间步骤 $s_1, \dots, s_m$ 打分，预测 $p_k = P(\text{第 } k \text{ 步正确}\mid\mathbf{x}, s_{\le k})$；解答的得分是某种汇总，例如乘积 $\prod_kp_k$（每一步都正确的概率）或最小值。
:::

Uesato 等（2022）在小学应用题上比较两者，最终答案的准确率相近，但过程监督更少见"用错误推理碰对答案"的解答。**Let's Verify Step by Step**（Lightman 等，2023）收集了 PRM800K——对 MATH 数据集问题的模型生成解答，其单步标注约 $800{,}000$ 条——并据此训练了一个 PRM。用它对强底座模型采样的大量解答重新排序，在其测试子集上，$78\%$ 的问题能选中正确解答，ORM 是 $72\%$，多数投票是 $70\%$，且重排的样本越多差距越大。论文还用了**主动学习**：优先标注那些"错得很像样"的解答，让每个标签更值钱。

过程标签昂贵，后来的工作便自动估计它们：一步的价值可以用"从它续写能到达正确答案的频率"来近似（Math-Shepherd，Wang 等，2024）。过程奖励在强化学习中给出更稠密的信用分配——每一步都有自己的信号，很像评论家的作用（[[post-training/rl-for-language-models#sec-advantage]]）——但它同样是学出来的模型，同样会被破解；近来关于推理的强化学习大量改用由程序**验证**的结果奖励（[[post-training/preference-optimisation#sec-rlvr]]）。两者在[[reasoning/process-outcome-rewards]]中继续展开。

::: example 用 PRM 给解答打分 {#ex-prm}
某 PRM 给一个解答四步的正确概率 $0.98$、$0.95$、$0.6$、$0.97$；另一个解答的四步是 $0.9$、$0.9$、$0.9$、$0.9$。在乘积汇总与最小值汇总下比较两个解答的得分。
::: solution
乘积：$0.98\cdot0.95\cdot0.6\cdot0.97 = 0.542$，对 $0.9^4 = 0.656$。最小值：$0.6$ 对 $0.9$。两种汇总都更看好第二个解答——它的每一步一样地可信——而不是第一个，它的第三步可疑；一个可疑的步骤，就足以让人不信整条推导。结果模型只看得到最终答案，若两者都对，它无从区分。
:::
:::

::: history
成对比较的模型由 Zermelo（1929）为棋手排名提出，后经 Bradley 与 Terry（Biometrika，1952）重新发现；Thurstone（1927）提出高斯版本，Luce（1959）提出推广它的选择公理，Plackett（1975）提出排序模型。Elo 的棋手等级分（1960 年代）使用同一个 logistic 形式。在强化学习中从人类偏好学习奖励函数，可上溯到基于偏好的强化学习（如 Akrour 等，2011；Wirth 等，2017 的综述），Christiano 等（2017）用深度网络与在行为片段比较上训练的 Bradley–Terry 奖励模型把它做大了。Ziegler 等（2019）与 Stiennon 等（2020）把它应用于语言模型，Stiennon 等观察到对着学来的奖励优化过头会降低人类眼中的质量。InstructGPT（Ouyang 等，2022）与 Anthropic 的有用且无害助手（Bai 等，2022a）把奖励模型推广到通用助手。Gao、Schulman 与 Hilton（2023）度量了过度优化的标度，Lightman 等（2023）大规模比较了过程监督与结果监督，RewardBench（Lambert 等，2024）让奖励模型的评测走向标准化。
:::

::: summary
- 奖励模型从**比较**中学来，比较比绝对分数可靠。**Bradley–Terry** 设定 $P(\mathbf{y}_1\succ\mathbf{y}_2) = \sigma(r_1 - r_2)$，与 Elo 等级分是同一个模型。
- 奖励只**到每个提示一个常数**为止可定（[[#prop-shift]]），不同提示的奖励不可比；尺度由 logistic 联系函数固定。
- 两两损失 $-\log\sigma(r_w - r_l)$ 就是 Bradley–Terry 负对数似然；它的梯度按错误结果的概率给每次比较加权，且它是**恰当评分规则**，学的是偏好的对数几率。
- 神经奖励模型是挂标量头的语言模型；实践细节包括把一次排序的全部 $\binom K2$ 个比较放在一起训练、偏好强度的间隔、归一化。
- 标签噪声把准确率封顶在 $\E[\sigma(|\Delta^\star|)]$；人类典型一致率约 $70\%$，既让高准确率无法达到，也让它对稳健性毫无参考价值。
- 学来的奖励是代理，往狠了优化就招来**奖励破解**。best-of-$n$ 的 KL 代价是 $\log n - (n-1)/n$ 纳特；Gao 等发现金标奖励随 $\sqrt{\mathrm{KL}}$ 先升后落，奖励模型越大峰值越靠后（经验）。
- **过程奖励模型**给每一步打分；在 Lightman 等（2023）的 MATH 重排上胜过了结果模型。
:::

## 习题

::: exercise 一个偏好概率 {level=1 check="0.8808"}
Bradley–Terry 模型下，回复 A 的奖励为 $2.5$，回复 B 为 $0.5$。A 被偏好的概率是多大？保留四位小数。
::: solution
$\sigma(2.5 - 0.5) = \sigma(2) = 1/(1 + e^{-2}) = 0.8808$。
:::
:::

::: exercise 一次比较的损失 {level=1 check="0.4741"}
某奖励模型给被选回复 $0.3$，给被拒回复 $-0.2$。计算两两损失，保留四位小数。
::: solution
$\Delta = 0.5$，$\sigma(0.5) = 0.6225$，损失 $-\ln0.6225 = 0.4741$。
:::
:::

::: exercise 一次排序给出的比较数 {level=1 check="36"}
标注者对每个提示的 $9$ 个回复排序。一次排序提供多少次两两比较？
::: solution
$\binom92 = 36$。放在一起处理的话，只需 $9$ 次奖励模型的前向计算。
:::
:::

::: exercise 分歧投票的奖励差 {level=2 check="0.8473"}
许多标注者比较一对回复，$70\%$ 偏好前者。由[[#prop-rm-props]]，在这些标签上训练到收敛的奖励模型会给这对回复多大的奖励差？保留四位小数。若只问过一位标注者、且他偏好前者，又会给出多大的差？
::: solution
$\Delta = \log\frac{0.7}{0.3} = \ln2.3333 = 0.8473$。只有一个标签时，经验偏好为 $1$，最大似然的奖励差是无穷：$\Delta\to\infty$ 时损失一直在降。实践中，权重衰减、早停、以及大量比较之间共享参数使它保持有限，但单个只有唯一标签的对是过度自信的源头。
:::
:::

::: exercise best-of-n 的 KL 代价 {level=2 check="2.497"}
用[[#eq-bon-kl]]计算 best-of-$32$ 采样相对基础策略的 KL 散度，保留三位小数。哪个 $n$ 的代价约为 $1$ 纳特？
::: solution
$\ln32 - 31/32 = 3.4657 - 0.9688 = 2.497$ 纳特。要凑 $1$ 纳特需 $\ln n - 1 + 1/n = 1$：$n = 6$ 的代价 $1.792 - 0.833 = 0.958$，$n = 7$ 是 $1.946 - 0.857 = 1.089$，所以是 best-of-$6$ 或 best-of-$7$。$n$ 翻倍只多加约 $\ln2 = 0.69$ 纳特。
:::
:::

::: exercise 准确率的天花板 {level=2 check="0.7311"}
某评测集中每一对的真实奖励差的绝对值都恰为 $1$，标签服从 Bradley–Terry。任何奖励模型能达到的最高期望准确率是多少（保留四位小数）？若改为一半的对差距为 $0$、一半为 $2$，天花板又是多少？
::: solution
由[[#prop-ceiling]]，$\sigma(1) = 0.7311$。差距为 $0$ 和 $2$ 时：$\frac12(\sigma(0) + \sigma(2)) = \frac12(0.5 + 0.8808) = 0.6904$——平均差距没变，天花板反而更低，因为质量相同的那一半对任何模型都是抛硬币。
:::
:::

::: exercise 过度优化曲线的峰值 {level=2 check="4.0552"}
对[[#eq-gao]]的 RL 形式，取 $\alpha_{\text{RL}} = 1.2$、$\beta_{\text{RL}} = 0.5$：金标奖励在哪个 $d$ 处达峰（保留四位小数）？那对应多大的 KL 散度？峰值金标奖励是多少？
::: solution
$\frac{d}{dd}\big[d(\alpha - \beta\log d)\big] = \alpha - \beta\log d - \beta = 0$ 给出 $d = e^{\alpha/\beta - 1} = e^{1.4} = 4.0552$，于是 $\mathrm{KL} = d^2 = 16.44$ 纳特。峰值为 $d(\alpha - \beta\log d) = 4.0552\cdot(1.2 - 0.5\cdot1.4) = 4.0552\cdot0.5 = 2.0276$，即最优点处的 $\beta d$。这些系数只是示例，不是论文拟合值。
:::
:::

::: exercise 三个回复拟合 Bradley–Terry {level=3}
三个回复 A、B、C 相互比较：A 对 B $10$ 战 $8$ 胜，B 对 C $10$ 战 $6$ 胜，A 对 C $10$ 战 $9$ 胜。(a) 把对数似然写成 $r_A, r_B, r_C$ 的函数，证明它只依赖两个差。(b) 固定 $r_C = 0$，数值求出最大似然奖励（几行纯 Python 即可）。(c) 观察到的频率与 Bradley–Terry 模型严格相容吗？
::: solution
(a) $\ell = 8\log\sigma(r_A - r_B) + 2\log\sigma(r_B - r_A) + 6\log\sigma(r_B - r_C) + 4\log\sigma(r_C - r_B) + 9\log\sigma(r_A - r_C) + \log\sigma(r_C - r_A)$，只是 $r_A - r_C$ 与 $r_B - r_C$ 的函数（[[#prop-shift]]）。

(b)
```python
import math
s = lambda z: 1 / (1 + math.exp(-z))
wins = [("A", "B", 8, 2), ("B", "C", 6, 4), ("A", "C", 9, 1)]
r = {"A": 0.0, "B": 0.0, "C": 0.0}
for _ in range(5000):
    g = {k: 0.0 for k in r}
    for i, j, w, l in wins:                   # i 胜 j 共 w 场，j 胜 i 共 l 场
        p = s(r[i] - r[j])
        g[i] += w - (w + l) * p; g[j] -= w - (w + l) * p
    for k in ("A", "B"):                      # r_C 固定为 0
        r[k] += 0.05 * g[k]
print({k: round(v, 3) for k, v in r.items()},
      [round(s(r[i] - r[j]), 3) for i, j, _, _ in wins])
```

```text
{'A': 1.999, 'B': 0.487, 'C': 0.0} [0.819, 0.619, 0.881]
```

最大似然奖励为 $r_A = 1.999$、$r_B = 0.487$、$r_C = 0$。(c) 不相容：拟合概率 $0.819$、$0.619$、$0.881$ 与观察到的 $0.8$、$0.6$、$0.9$ 有出入。Bradley–Terry 模型要求对数几率可加：$\operatorname{logit}P(A\succ C) = \operatorname{logit}P(A\succ B) + \operatorname{logit}P(B\succ C)$，而 $\operatorname{logit}0.9 = 2.197$，$\operatorname{logit}0.8 + \operatorname{logit}0.6 = 1.386 + 0.405 = 1.792$。每对只有 $10$ 次比较时，这个出入完全在抽样噪声之内；若有几千次，就是对模型的否定证据。
:::
:::

::: exercise 代理误差为高斯的 best-of-n {level=3}
把[[#sec-overoptimisation]]的模拟中的重尾误差换成高斯噪声：代理 $= g + \varepsilon$，$\varepsilon\sim\Normal(0, \tau^2)$ 与 $g\sim\Normal(0, 1)$ 独立。(a) 证明 $\E[g\mid\text{代理} = p] = p/(1 + \tau^2)$。(b) 由此推出：对任何 $\tau$，best-of-$n$ 回复的金标质量都随 $n$ 增加——这个模型表现的是"回归式"古德哈特（收益变小但仍为正），而不是过度优化。(c) 重尾情形的哪一点破坏了这个结论？
::: solution
(a) $(g, p)$ 联合高斯，$\Var(p) = 1 + \tau^2$，$\Cov(g, p) = 1$，故 $\E[g\mid p] = p\cdot\Cov(g, p)/\Var(p) = p/(1 + \tau^2)$。(b) 入选的回复是 $p$ 最大的那个；给定入选的 $p$，它的期望金标是 $p/(1 + \tau^2)$（样本相互独立，选择只通过 $p$ 依赖 $g$）。$n$ 个高斯代理的最大值的期望随 $n$ 增加，所以期望金标也增加——只是幅度缩为代理的 $1/(1 + \tau^2)$。(c) 重尾误差时 $\E[g\mid p]$ 在大 $p$ 处不再随 $p$ 增大：极端的代理值远可能来自极端的误差而非极端的 $g$，$p\to\infty$ 时 $\E[g\mid p]\to0$。于是强力挑中的是"代理之高由误差解释"的回复，金标质量回落——正是程序输出里的模式。
:::
:::
