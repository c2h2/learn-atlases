[[artificial-intelligence/decision-making]] 的算法从**模型**出发计算最优策略：转移概率 $P(s' \mid s, a)$ 与奖励 $R(s, a, s')$。很多时候没人写得出了这个模型。机器人夹爪抓住某件特定物体时打滑的概率是多少？顾客点击某条特定推荐的概率是多少？围棋中某一步导致胜局的概率又是多少？智能体*能*做的是行动并观察结果。**强化学习**（RL）就是要从这样的经验中学会好好行动：智能体看到的是状态与**奖励**，永远看不到模型，必须通过反复试错去发现哪些动作会——也许要晚得多——带来高回报。

有两个困难把强化学习与 [LLM Atlas](/learn/llm/course.php?c=ml-fundamentals) 的监督学习区分开来。没有老师告诉你哪个动作是对的，只有一个标量奖励，而且常常延迟——这就是**信用分配**问题。而数据取决于智能体自己的行为：想了解一个动作就必须去试它，代价是不做当前看来最好的事——**探索–利用**两难。本章展开经典的答案。我们从采样的回报估计值（**蒙特卡洛**），也从由一步自举目标估计（**时序差分学习**）；不用模型、用 **Q 学习**学最优动作值，其收敛性倚赖上一章的压缩性质；以最纯粹的形式研究探索——**多臂老虎机**；并看看**函数近似**与**策略梯度**如何把这些思想带到大问题上——以及保证在哪里止步。

## 从经验学习值

智能体与一个 MDP 交互：它知道状态与动作，却不知道 $P$ 与 $R$。一个**回合**是序列 $s_0, a_0, r_1, s_1, a_1, r_2, \dots$，在终止状态结束（或无限进行下去）；从时刻 $t$ 每次访问某状态出发，观察到的**回报**是 $G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + \cdots$。由 [[artificial-intelligence/decision-making#def-value]]，当智能体遵循 $\pi$ 时 $U^\pi(s) = \E[G_t \mid s_t = s]$。

第一项任务是**预测**（或**策略评估**）：从遵循某个固定策略 $\pi$ 生成的回合中估计 $U^\pi$。可选的思路有三条。

- **基于模型（自适应动态规划）。**通过计数转移来估计 $P$ 与 $R$，再解所估模型的贝尔曼方程。数据效率高，但需要存储并求解一个模型，对巨大的状态空间行不通。
- **蒙特卡洛。**用访问 $s$ 之后观察到的回报的平均值估计 $U^\pi(s)$。每个回报都是 $U^\pi(s)$ 的无偏样本，故由大数定律平均值收敛。不需要模型，不需要贝尔曼方程——但智能体必须等到回合结束，而且回报的方差很高，因为它们是许多随机奖励之和。
- **时序差分。**每一步之后都更新，朝一个由下一个奖励与下一状态取值的*当前估计*构成的目标移动。

所有无模型方法都用**增量式平均**。若 $\bar x_n$ 是 $x_1, \dots, x_n$ 的平均值，则
$$
\bar x_n = \bar x_{n-1} + \frac{1}{n}\,(x_n - \bar x_{n-1}),
$$ {#eq-incremental-mean}
展开即可验证：$n\bar x_n = (n - 1)\bar x_{n-1} + x_n$。"估计 $\gets$ 估计 $+ \alpha\,(\text{目标} - \text{估计})$"的一般形式带着**步长**（学习率）$\alpha$，是后面一切算法的更新规则。取 $\alpha = 1/n$ 时它精确计算样本均值；取常数 $\alpha$ 时它计算一个遗忘旧数据的指数加权平均——环境变化时有用，但估计永不停止波动。

::: definition 时序差分学习，TD(0) {#def-td}
在被评估的策略 $\pi$ 下，每次带奖励 $r$ 的转移 $s \to s'$ 之后，**TD(0)** 更新
$$
U(s) \gets U(s) + \alpha\,\bigl(r + \gamma\,U(s') - U(s)\bigr).
$$ {#eq-td}
量 $\delta = r + \gamma U(s') - U(s)$ 是**时序差分误差**，$r + \gamma U(s')$ 是 **TD 目标**。（若 $s'$ 是终止状态，$U(s')$ 取其固定的终止值。）
:::

TD 学习**自举**（bootstrap）：它在目标中使用自己的估计 $U(s')$。估计还错的时候这会引入偏差，但目标只依赖一次随机转移而非整个回合，方差因此低得多，而且智能体在回合之中就能学习。为什么这是正确的目标？

::: proposition TD 的不动点是策略的值 {#prop-td-fixed-point}
对固定策略 $\pi$，状态 $s$ 中的期望 TD 误差
$$
\E[\delta \mid s] = \sum_{s'} P(s' \mid s, \pi(s))\,\bigl[R(s, \pi(s), s') + \gamma U(s')\bigr] - U(s) = (B^\pi U)(s) - U(s),
$$
在每个状态都为零当且仅当 $U = U^\pi$。于是期望的 TD 更新是从 $U$ 朝 $B^\pi U$ 迈出 $\alpha$ 的一步，而 $U^\pi$ 是其唯一平衡点。
:::

::: proof
第一个等式是对下一状态取期望的定义。$B^\pi U = U$ 当且仅当 $U = U^\pi$，因为 $B^\pi$ 是以 $U^\pi$ 为唯一不动点的 $\gamma$-压缩（[[artificial-intelligence/decision-making#thm-contraction]] 用于策略算子）。期望更新 $U(s) + \alpha\,((B^\pi U)(s) - U(s))$ 因此恰在 $U^\pi$ 处改变量为零。
:::

随机版本也收敛，条件是步长满足贯穿整个 RL 的常见要求。

::: theorem TD(0) 的收敛性（陈述略去证明） {#thm-td}
对有限 MDP 与固定策略，若每个状态被无穷次访问，且对状态 $s$ 的第 $n$ 次更新所用步长 $\alpha_n(s)$ 满足**罗宾斯–蒙罗条件**（Robbins–Monro）
$$
\sum_n \alpha_n(s) = \infty, \qquad \sum_n \alpha_n(s)^2 < \infty,
$$ {#eq-robbins-monro}
则 TD(0) 以概率 $1$ 收敛到 $U^\pi$（萨顿（Sutton），1988；戴安（Dayan），1992；贾科拉（Jaakkola）、约旦（Jordan）与辛格（Singh），1994）。
:::

第一个条件使步子大到足以克服任何初始误差；第二个条件使步子小到足以把噪声平均掉。$\alpha_n = 1/n$ 两者皆满足；常数 $\alpha$ 违反第二条，故估计只收敛到 $U^\pi$ 的一个邻域，邻域大小随 $\alpha$ 缩小。

::: example 在网格世界上运行 TD(0) {#ex-td}
用 $\alpha = 0.05$ 的 TD(0) 评估 [[artificial-intelligence/decision-making#ex-grid]] 网格世界的最优策略，回合从左下角出发，并与精确值比较。
::: solution
智能体与一个只提供采样后继状态与奖励的模拟器交互：

```python
import random
from mdp import states, terminal, transitions, MOVES, STEP, GAMMA, value_iteration, greedy

def sample_step(s, a, rng):
    """环境：智能体只看到抽到的后继状态与奖励，看不到模型。"""
    r, acc = rng.random(), 0.0
    for p, t in transitions(s, a):
        acc += p
        if r < acc: return t, STEP
    return t, STEP

def td0(pi, episodes, alpha, rng, start=(2, 0)):
    """TD(0)：从采样的回合评估固定策略 pi。"""
    U = {s: (terminal[s] if s in terminal else 0.0) for s in states}
    for _ in range(episodes):
        s = start
        while s not in terminal:
            t, r = sample_step(s, pi[s], rng)
            U[s] += alpha * (r + GAMMA * U[t] - U[s])     # 朝一步目标移动
            s = t
    return U
```

种子取 $1989$：

```console
$ python3 rl.py
TD(0),    10 episodes: U(start) = -0.019  (true 0.296), max error 0.614
TD(0),   100 episodes: U(start) = 0.096  (true 0.296), max error 0.320
TD(0),  1000 episodes: U(start) = 0.319  (true 0.296), max error 0.110
TD(0), 10000 episodes: U(start) = 0.319  (true 0.296), max error 0.083
```

信息从目标出发，每次访问只倒流一步：$10$ 个回合后起点状态的值仍停在初始的 $0$ 减每步代价附近，只有几百个回合之后目标奖励才传播到那里。步长恒定时估计此后就在真值附近波动而无法落定——从 $1000$ 到 $10{,}000$ 回合，误差在起点处停留在 $0.02$ 附近、在最差状态处停留在 $0.08$ 附近——恰如罗宾斯–蒙罗条件所预言。递减的步长或取平均会消除波动，代价是适应变慢。最优策略从这个起点很少访问的状态，比如 $(2, 3)$，估得最差。
:::
:::

## 学会行动：Q 学习

预测不够：我们要最优策略，而没有模型时值函数 $U$ 并不能告诉我们要选哪个动作——选 $\arg\max_a \sum_{s'} P(s' \mid s, a)[\dots]$ 需要 $P$。补救办法是直接学**动作值** $Q(s, a)$；于是贪心动作就是 $\arg\max_a Q(s, a)$，无需模型。最优动作值满足 $Q$ 的贝尔曼最优方程：
$$
Q^*(s, a) = \sum_{s'} P(s' \mid s, a)\,\Bigl[R(s, a, s') + \gamma \max_{a'} Q^*(s', a')\Bigr].
$$ {#eq-bellman-q}

::: algorithm Q 学习 {#alg-q-learning}
任意初始化 $Q(s, a)$（对终止状态，$\max_{a'} Q(s', a')$ 换成终止值）。对每个回合的每一步：
1. 在状态 $s$，由 $Q$ 导出的探索策略选一个动作 $a$（例如 $\varepsilon$-贪心：以概率 $\varepsilon$ 均匀随机选，否则选 $\arg\max_a Q(s, a)$）。
2. 执行 $a$；观察奖励 $r$ 与后继状态 $s'$。
3. 更新
$$
Q(s, a) \gets Q(s, a) + \alpha\,\Bigl(r + \gamma \max_{a'} Q(s', a') - Q(s, a)\Bigr),
$$ {#eq-q-update}
并令 $s \gets s'$。
:::

更新对下一个动作取最大值，不管智能体实际会执行哪个动作：Q 学习是**异策略**（off-policy）的——它一边遵循一个不同的、探索性的策略，一边学习贪心（最优）策略的值。其期望更新把 $Q$ 推向 $\mathcal{B}Q$，其中
$$
(\mathcal{B}Q)(s, a) = \sum_{s'} P(s' \mid s, a)\Bigl[R(s, a, s') + \gamma \max_{a'} Q(s', a')\Bigr]
$$
是 Q 函数上的贝尔曼最优算子。

::: lemma Q-贝尔曼算子是压缩映射 {#lem-q-contraction}
对 Q 函数 $Q_1$、$Q_2$，$\max_{s, a} \lvert (\mathcal{B}Q_1)(s, a) - (\mathcal{B}Q_2)(s, a)\rvert \le \gamma \max_{s, a} \lvert Q_1(s, a) - Q_2(s, a)\rvert$。因此 $Q^*$ 是其唯一不动点。
:::

::: proof
对每个 $(s, a)$，奖励相消，且
$$
\lvert (\mathcal{B}Q_1)(s, a) - (\mathcal{B}Q_2)(s, a)\rvert \le \gamma \sum_{s'} P(s' \mid s, a)\, \bigl\lvert \max_{a'} Q_1(s', a') - \max_{a'} Q_2(s', a')\bigr\rvert \le \gamma \max_{s', a'} \lvert Q_1(s', a') - Q_2(s', a')\rvert,
$$
其中如 [[artificial-intelligence/decision-making#thm-contraction]] 那样使用 $\lvert \max f - \max g\rvert \le \max \lvert f - g\rvert$，并用 $\sum_{s'} P = 1$。不动点的唯一性同前，而 [[#eq-bellman-q]] 说明 $Q^*$ 是一个不动点。
:::

::: theorem Q 学习的收敛性（陈述） {#thm-q-learning}
*（沃特金斯（Watkins），1989；沃特金斯与戴安（Dayan），1992。）*在有限 MDP 中，若每个状态–动作对被无穷次更新，且步长对每一对都满足罗宾斯–蒙罗条件 [[#eq-robbins-monro]]，则表格型 Q 学习以概率 $1$ 收敛到 $Q^*$，无论经验是由哪个探索策略产生的。
:::

其证明把 [[#eq-q-update]] 视为不动点迭代 $Q \gets \mathcal{B}Q$ 的随机近似：更新等于期望更新加上有界方差的零均值噪声；[[#lem-q-contraction]] 的压缩把期望迭代拉向 $Q^*$；步长条件让噪声被平均掉。请注意定理*没有*说什么：它不给速率，且要求每一对被无穷次尝试——探索策略绝不能完全停止探索。**探索无限且在极限下贪心**（GLIE）的策略——例如 $\varepsilon_t \to 0$ 缓慢的 $\varepsilon$-贪心，如每个状态取 $\varepsilon_t = 1/t$——既满足该条件，又收敛到最优行动。

::: example 在网格世界上运行 Q 学习 {#ex-q-learning}
用 $\varepsilon = 0.1$ 与步长 $1/N(s, a)$（该对到目前为止被更新的次数）在网格世界上运行 Q 学习，并把它的贪心策略与最优策略比较。
::: solution
```python
def q_learning(episodes, rng, eps=0.1, start=(2, 0)):
    """表格型 Q 学习：ε-贪心探索，步长 1/N(s, a)。"""
    Q = {(s, a): 0.0 for s in states if s not in terminal for a in MOVES}
    N = {k: 0 for k in Q}
    value = lambda t: terminal[t] if t in terminal else max(Q[(t, b)] for b in MOVES)
    for _ in range(episodes):
        s = start
        while s not in terminal:
            if rng.random() < eps: a = rng.choice(list(MOVES))
            else: a = max(MOVES, key=lambda b: Q[(s, b)])
            t, r = sample_step(s, a, rng)
            N[(s, a)] += 1
            Q[(s, a)] += (r + GAMMA * value(t) - Q[(s, a)]) / N[(s, a)]   # 异策略目标：max
            s = t
    return Q
```

```console
$ python3 rl.py
Q-learning,    100 episodes: max_a Q(start) = 0.026, greedy policy differs from optimal in 1 states [(2, 0)]
Q-learning,   1000 episodes: max_a Q(start) = 0.099, greedy policy differs from optimal in 1 states [(2, 0)]
Q-learning,  10000 episodes: max_a Q(start) = 0.258, greedy policy differs from optimal in 0 states []
Q-learning, 100000 episodes: max_a Q(start) = 0.285, greedy policy differs from optimal in 0 states []
```

$10{,}000$ 个回合后贪心策略已在每个状态最优，尽管起点的值（$0.258$）仍明显低于真值 $0.296$；$100{,}000$ 个回合后为 $0.285$。教训有二。*策略*远早于*值*被学到——重要的只是动作的排序（对比 [[artificial-intelligence/decision-making]] 中关于贪心策略的习题）。而 $\alpha = 1/N$ 虽满足收敛条件，在 $\gamma$ 接近 $1$ 时却慢：早期的目标由糟糕的估计构成，用 $1/N$ 的权重去平均它们、遗忘得很慢。实际实现用更大的、缓慢衰减的步长。
:::
:::

一个近亲是 **SARSA**（state–action–reward–state–action），它把 $\max_{a'} Q(s', a')$ 换成智能体下一步实际执行的动作 $a'$ 的 $Q(s', a')$。它是**同策略**（on-policy）的：学的是它所遵循的探索策略的值，这在探索有危险的地方就有区别。悬崖旁边，Q 学习学到最优的贴崖小路，然后因为自己的 $\varepsilon$-随机移动偶尔坠崖；SARSA 则学到：既然自己要探索，一条离崖边更远的路更好。

::: quiz
一个智能体运行 Q 学习，同时永远遵循一个均匀随机选动作的策略。假设步长合适，它学到了什么？

- [x] $Q^*$，最优动作值。
- [ ] 均匀随机策略的动作值。
- [ ] 什么有用的都学不到，因为它从不利用所学。
- [ ] 只有最终切换到贪心策略才学得 $Q^*$。
::: solution
Q 学习是异策略的：其目标 $r + \gamma \max_{a'} Q(s', a')$ 评估贪心策略，与实际执行的动作无关。均匀随机的行为策略（在所有状态可达的有限 MDP 中）会无穷次访问每个状态–动作对，故由 [[#thm-q-learning]]，$Q$ 收敛到 $Q^*$。当然，学习期间智能体的*奖励*很糟——学得好与赚得好是不同的目标。同样的行为下 SARSA 学到的将是随机策略的值。
:::
:::

## 探索与老虎机

智能体应如何在探索与利用之间权衡？没有状态时问题最清晰：**$k$ 臂老虎机**有 $k$ 个动作（臂）；拉臂 $i$ 给出均值 $\mu_i$ 未知的随机奖励。智能体想在 $T$ 次拉动中最大化总奖励，等价地最小化其**遗憾值**
$$
\mathrm{Regret}(T) = T\mu^* - \E\Bigl[\sum_{t=1}^T \mu_{a_t}\Bigr] = \sum_i \Delta_i\, \E[N_i(T)],
$$ {#eq-regret}
其中 $\mu^* = \max_i \mu_i$，$\Delta_i = \mu^* - \mu_i$ 是臂 $i$ 的**差距**，$N_i(T)$ 是它被拉动的次数。

- **贪心**——永远拉迄今平均最好的臂——在运气差的开局后可能锁死在次优臂上，再也不试最佳臂：线性遗憾。
- **$\varepsilon$-贪心**取固定 $\varepsilon$ 时永远以常数比例 $\varepsilon/k$ 的时间拉每个臂：同样是线性遗憾，$\approx \varepsilon\,T\,\bar\Delta$，$\bar\Delta$ 为平均差距——只是常数小。
- **UCB1**（[[artificial-intelligence/adversarial-search#eq-ucb1]]）拉置信上界 $\bar x_i + \sqrt{2\ln t/N_i}$ 最高的臂。由 [[artificial-intelligence/adversarial-search#thm-uct]]，每个次优臂被拉 $O(\ln T/\Delta_i^2)$ 次，故遗憾为 $O(\sum_i \ln T/\Delta_i)$：对数级。莱（Lai）与罗宾斯（Robbins）（1985）证明没有算法能在所有老虎机问题上做到比对数遗憾更好，故 UCB1 在常数因子意义下是最优的。

"面对不确定性时保持乐观"——就假定世界好到站得住脚的程度，并照此行动——是 UCB 背后的原则。它有效，是因为乐观会自我纠正：乐观的估计若错了，试一下就会暴露。**汤姆森采样**（Thompson sampling，1933）则改为按某个臂是最佳臂的后验概率去拉它——从各臂的后验中各抽一个均值，拉样本最大的那个臂——并取得类似的保证。

::: example 三种老虎机策略的遗憾 {#ex-bandit}
在均值为 $0.2, 0.4, 0.5, 0.6, 0.7$ 的伯努利老虎机上比较贪心、$\varepsilon$-贪心（$\varepsilon = 0.1$）与 UCB1，对时域 $T = 10^2, \dots, 10^5$ 把遗憾对 $20$ 次运行取平均。
::: solution
```python
import math, random

def run(policy, means, T, rng):
    """玩 T 步伯努利老虎机；返回相对永远玩最佳臂的遗憾。"""
    k = len(means); n = [0] * k; w = [0.0] * k; total = 0.0
    for t in range(1, T + 1):
        if t <= k: a = t - 1                                   # 每个臂先各玩一次
        elif policy == "greedy": a = max(range(k), key=lambda i: w[i] / n[i])
        elif policy == "eps": a = rng.randrange(k) if rng.random() < 0.1 else max(range(k), key=lambda i: w[i] / n[i])
        else: a = max(range(k), key=lambda i: w[i] / n[i] + math.sqrt(2 * math.log(t) / n[i]))   # UCB1
        r = 1.0 if rng.random() < means[a] else 0.0
        n[a] += 1; w[a] += r; total += means[a]
    return T * max(means) - total                              # 所选动作的期望遗憾
```

```console
$ python3 bandit.py
T =   100: regret  greedy    10.1   eps-greedy    10.1   UCB1    14.6
T =  1000: regret  greedy   101.6   eps-greedy    43.6   UCB1    80.9
T = 10000: regret  greedy   712.0   eps-greedy   266.7   UCB1   228.7
T = 100000: regret  greedy  7004.6   eps-greedy  2241.0   UCB1   392.4
```

贪心的遗憾随 $T$ 每十倍增长也翻十倍：在某些运行中它永远锁死在了一个较差的臂上。$\varepsilon$-贪心的遗憾长期同样线性增长，约每步 $0.1 \cdot 0.24 = 0.024$（随机一个臂的平均差距是 $0.24$），所以 $T = 10^5$ 时为 $2241$。UCB1 起初探索得更多——$T = 100$ 时它三者中最差——但其遗憾只按对数增长：从 $10^4$ 到 $10^5$ 增加不到一倍，而在 $10^5$ 处只有 $\varepsilon$-贪心的六分之一。哪种方法"最好"取决于时域，这就是渐近遗憾只是故事一部分的原因。
:::
:::

::: widget plot
f: 0.024*x; 163*ln(x)
x: 1, 100000
labels: \varepsilon\text{-贪心：} \approx 0.024\,T; \text{UCB1 界 } 8 \ln T \textstyle\sum_i 1/\Delta_i
caption: 例中老虎机的线性遗憾与对数遗憾。直线是 $\varepsilon$-贪心的长期遗憾 $\varepsilon\bar\Delta T$；曲线是 UCB1 界 $8\ln T\sum_i 1/\Delta_i \approx 163\ln T$（差距为 $0.5$、$0.3$、$0.2$、$0.1$）。界是松的——$T = 10^5$ 处实测的 UCB1 遗憾是 $392$ 而不是 $1900$——但形状是对的：时域足够长时，任何固定比例的随机探索都会输给随置信度缩小的探索。放大 $T$ 小的地方就能看到曲线的交点。
:::

在 MDP 中探索更难：一个动作的价值依赖于到达其他状态，而短视的探索规则可能永远到不了状态空间的远处。基于计数的**探索奖励**（给奖励加上 $c/\sqrt{N(s, a)}$）、乐观初始值与后验采样把老虎机的思想推广开来，R-max、UCRL 等算法则对有限 MDP 配有样本复杂度或多项式遗憾界。

::: warning 奖励就是规格说明
强化学习智能体优化的是拿到的奖励，而不是设计者的本意。容易度量的奖励常常是糟糕的代理：赛车游戏里按积分计酬的智能体可能学会永远绕圈吃奖励而不去跑完比赛；清洁机器人若因"看不见灰尘"受奖，可能学会盖住自己的摄像头。这种**奖励作弊**（reward hacking）或**规则博弈**（specification gaming）不是学习算法的缺陷——算法恰恰在尽职——毛病出在奖励上，它扮演的角色正是 [[artificial-intelligence/intelligent-agents#def-rational]] 中的性能度量。塑形奖励以加速学习同样危险：随意添加中间奖励会改变最优策略。**基于势**形式的塑形 $F(s, s') = \gamma\Phi(s') - \Phi(s)$ 是安全的：可证明它不改变最优策略（恩（Ng）、哈拉达（Harada）与罗素（Russell），1999）。
:::

## 大状态空间

对西洋双陆棋（$10^{20}$ 个状态）、围棋或带连续关节角的机器人来说，值表是不可能的。智能体必须**泛化**：用参数化的函数 $\hat U_{\mathbf{w}}(s)$ 表示 $U$ 或 $Q$——特征的线性组合 $\hat U_{\mathbf w}(s) = \mathbf w \cdot \boldsymbol\phi(s)$，或神经网络——并学习参数。

对预测，自然的目标是 $\hat U_{\mathbf w}$ 与目标之间均方误差。**半梯度 TD(0)** 把目标当作固定量，对 TD 误差平方取一步梯度：
$$
\mathbf w \gets \mathbf w + \alpha\,\bigl(r + \gamma\,\hat U_{\mathbf w}(s') - \hat U_{\mathbf w}(s)\bigr)\, \nabla_{\mathbf w} \hat U_{\mathbf w}(s),
$$ {#eq-semi-gradient}
对线性特征即 $\mathbf w \gets \mathbf w + \alpha\,\delta\,\boldsymbol\phi(s)$。线性特征、同策略采样与罗宾斯–蒙罗步长下，它收敛（齐齐克利斯（Tsitsiklis）与范罗伊（Van Roy），1997）——不是收敛到 $U^\pi$ 的最佳近似，而是收敛到一个邻近的不动点，其误差在最坏情形下与最佳可达误差至多差因子 $1/(1 - \gamma)$。带函数近似的 Q 学习用目标 $r + \gamma\max_{a'}\hat Q_{\mathbf w}(s', a')$ 以同样的方式更新 $\mathbf w$。

::: widget gradientdescent
f: (x - 1)^2 + 8*(y - 0.5)^2
start: -2, 2
rate: 0.05
steps: 40
caption: 在对误差平方取梯度步，学习线性值函数的权重 $(w_1, w_2) = (x, y)$，这里取一个极小点在 $(1, 0.5)$、一个方向比另一个方向陡八倍的二次碗。把学习率调高：超过 $\alpha = 1/8$ 后陡峭方向过冲，迭代发散——正是同一种不稳定性，使步长与特征缩放在 TD 学习中至关重要，那里目标还随权重改变而移动。
:::

保证很快就到头了。**函数近似**、**自举**与**异策略**学习的组合——"致命三要素"（deadly triad）——即便在存在精确线性表示的极小问题上也可能使权重发散到无穷（贝尔德（Baird）反例，1995）。因此深度强化学习系统加上稳定化装置：**经验回放**（从过去转移的回放缓冲区中学习，打破相关性）、**目标网络**（用一份缓慢更新的权重副本计算目标），以及细致的归一化。有了这些，深度 Q 网络学会了从屏幕像素玩数十款雅达利电子游戏（姆尼（Mnih）与合作者，2015）——这是经验上的成功，不是定理。

### 策略梯度方法

智能体也可以不学值再贪心行动，而是直接调整**参数化的策略** $\pi_{\boldsymbol\theta}(a \mid s)$ 以提高期望回报 $J(\boldsymbol\theta)$。这对连续动作与随机策略有效，那里 $\arg\max_a Q$ 很别扭。关键事实是：期望的梯度可以从样本估计。

::: theorem 似然比（REINFORCE）梯度 {#thm-policy-gradient}
对一步问题——智能体抽取 $a \sim \pi_{\boldsymbol\theta}(\cdot)$、收到均值为 $r(a)$ 的奖励——$J(\boldsymbol\theta) = \sum_a \pi_{\boldsymbol\theta}(a)\, r(a)$ 满足
$$
\nabla_{\boldsymbol\theta} J = \E_{a \sim \pi_{\boldsymbol\theta}}\bigl[r(a)\, \nabla_{\boldsymbol\theta} \ln \pi_{\boldsymbol\theta}(a)\bigr],
$$
且对任何常数 $b$（**基线**）同样有 $\nabla J = \E[(r(a) - b)\,\nabla \ln \pi_{\boldsymbol\theta}(a)]$。对 MDP 中的回合，把 $r(a)$ 换成每个动作之后的回报、把求和换成为回合的各时间步，结论同样成立（威廉姆斯（Williams），1992；萨顿与合作者，2000）。
:::

::: proof
（一步情形。）$\nabla J = \sum_a r(a)\, \nabla \pi_{\boldsymbol\theta}(a) = \sum_a \pi_{\boldsymbol\theta}(a)\, r(a)\, \frac{\nabla \pi_{\boldsymbol\theta}(a)}{\pi_{\boldsymbol\theta}(a)} = \E[r(a)\, \nabla \ln \pi_{\boldsymbol\theta}(a)]$，其中假设凡是 $r(a) \ne 0$ 处 $\pi_{\boldsymbol\theta}(a) > 0$。对基线，$\E[b\, \nabla \ln \pi_{\boldsymbol\theta}(a)] = b \sum_a \nabla \pi_{\boldsymbol\theta}(a) = b\, \nabla \sum_a \pi_{\boldsymbol\theta}(a) = b\, \nabla 1 = 0$。（多步情形的证明类似，利用马尔可夫性质说明动作不影响先于它的奖励。）
:::

::: example 手算一个策略梯度 {#ex-policy-gradient}
一个一步问题有两个动作：$a_1$ 得奖励 $1$，$a_2$ 得奖励 $0$。策略是带单个参数的 softmax：$\pi_\theta(a_1) = \sigma(\theta) = e^\theta/(e^\theta + 1)$，$\pi_\theta(a_2) = 1 - \sigma(\theta)$，当前 $\theta = 0$。直接计算 $\nabla J$，再用 [[#thm-policy-gradient]] 计算，并比较基线 $b = 0$ 与 $b = 0.5$ 时单样本估计的方差。
::: solution
直接算，$J(\theta) = \sigma(\theta)$ 且 $J'(0) = \sigma(0)(1 - \sigma(0)) = 0.25$。对似然比形式，$\theta = 0$ 处 $\frac{d}{d\theta}\ln\sigma(\theta) = 1 - \sigma(\theta) = 0.5$，$\frac{d}{d\theta}\ln(1 - \sigma(\theta)) = -\sigma(\theta) = -0.5$。每个动作的概率都是 $0.5$。

*基线 $0$。*单样本估计是 $r\,\nabla\ln\pi$：抽到 $a_1$ 时为 $1 \cdot 0.5 = 0.5$，抽到 $a_2$ 时为 $0 \cdot (-0.5) = 0$。其均值为 $0.25$，正确；方差为 $0.5 \cdot 0.25^2 + 0.5 \cdot 0.25^2 = 0.0625$。

*基线 $0.5$。*估计是 $(r - 0.5)\nabla\ln\pi$：$a_1$ 为 $0.5 \cdot 0.5 = 0.25$，$a_2$ 为 $(-0.5)(-0.5) = 0.25$。均值仍是 $0.25$，方差为 $0$：每个样本都给出精确的梯度。好的动作抬高自己的概率，坏的动作压低自己的概率，在这里恰是同一个步子。取平均值奖励作基线未必总是这么完美，但它是惯常的选择。
:::
:::

于是智能体可以抽一个动作、观察其奖励，并把 $\boldsymbol\theta$ 沿 $(r - b)\nabla\ln\pi_{\boldsymbol\theta}(a)$ 迈一步：表现好于基线的动作变得更可能。一个好的基线——比如学出来的值估计，即**演员–评论家**（actor–critic）方法——不改变期望梯度，却能极大地削减方差。策略梯度方法——包括信赖域与截断变体，如 PPO（2017）——是现代深度强化学习大部分工作的基础——也是用于微调语言模型的人类反馈强化学习的基础，后者在 LLM Atlas 中讲授（[语言模型的强化学习](/learn/llm/lesson.php?c=post-training&l=rl-for-language-models)、[RLHF](/learn/llm/lesson.php?c=post-training&l=rlhf)）。

::: quiz
为什么从 REINFORCE 更新的奖励中减去基线 $b$ 不会使梯度估计有偏？

- [ ] 因为基线是从数据中学出来的。
- [x] 因为 $\E[\nabla \ln \pi_{\boldsymbol\theta}(a)] = 0$：所有动作概率的梯度之和为零。
- [ ] 因为奖励总是正的。
- [ ] 它确实引入偏差，只是当 $\boldsymbol\theta$ 收敛时偏差消失。
::: solution
$\E[b\,\nabla\ln\pi_{\boldsymbol\theta}(a)] = b\sum_a\nabla\pi_{\boldsymbol\theta}(a) = b\,\nabla\sum_a\pi_{\boldsymbol\theta}(a) = 0$，如 [[#thm-policy-gradient]] 的证明所示：概率对每个 $\boldsymbol\theta$ 都总和为 $1$，所以其梯度之和为 $0$。基线可以依赖状态（但不能依赖动作）而不引入偏差；它只改变方差。
:::
:::

::: history
阿瑟·塞缪尔（Arthur Samuel）的跳棋程序（1959）让自己的评估函数向后续局面的值调整——一种早期的时序差分方法。理查德·贝尔曼（Richard Bellman）的《动态规划》（*Dynamic Programming*，1957）与罗纳德·霍华德（Ronald Howard）的策略迭代（1960）提供了 MDP 理论。威廉·汤姆森（William Thompson）于 1933 年为老虎机提出后验采样；赫伯特·罗宾斯（Herbert Robbins）与萨顿·蒙罗（Sutton Monro）于 1951 年引入随机逼近；莱（Lai）与罗宾斯于 1985 年证明了对数遗憾下界。安德鲁·巴托（Andrew Barto）、理查德·萨顿（Richard Sutton）与查尔斯·安德森（Charles Anderson）的演员–评论家架构出现于 1983 年；萨顿的《用时序差分方法学习预测》（"Learning to predict by the methods of temporal differences"，1988）将 TD 学习形式化。克里斯托弗·沃特金斯（Christopher Watkins）在其 1989 年剑桥博士论文中提出了 Q 学习，并与彼得·戴安（Peter Dayan）于 1992 年发表收敛证明；罗纳德·威廉姆斯（Ronald Williams）的 REINFORCE 也发表于 1992 年。杰拉尔德·泰索罗（Gerald Tesauro）的 TD-Gammon（1992–95）用自博弈加 TD 学习与神经网络把西洋双陆棋下到了世界级水平。彼得·奥尔（Peter Auer）、尼科洛·切萨-比安基（Nicolò Cesa-Bianchi）与保罗·菲舍尔（Paul Fischer）于 2002 年分析了 UCB1。弗拉基米尔·姆尼（Volodymyr Mnih）与合作者的深度 Q 网络（*Nature*，2015）从像素学会了雅达利游戏；DeepMind 的 AlphaGo（2016）与 AlphaZero（2017–18）把用强化学习训练的策略网络与价值网络同蒙特卡洛树搜索结合起来。萨顿与巴托的《强化学习：导论》（*Reinforcement Learning: An Introduction*，第二版 2018）是标准教科书。
:::

## 实际应用

截至 2026 年，强化学习用于博弈、机器人（常在仿真中训练策略再迁移到硬件）、资源管理与推荐，并且——最引人注目的是——大语言模型的后训练，其奖励来自学出来的人类偏好模型或对答案的自动验证器。这些应用是经验性的、变化很快；LLM Atlas 有专门讲述。本章的经典结果仍是根基：贝尔曼方程界定了被估计的对象，压缩与随机逼近解释了估计何时收敛，遗憾界量化了探索的代价。在理论给不出保证的地方——深度函数近似、异策略学习、稀疏奖励——强化学习系统对超参数与随机种子出了名地敏感，结果应当在许多个种子上报告。

## 后续内容

本章为课程从搜索到学习的弧线收束。用学出的模型作规划的强化学习智能体把它与 [[artificial-intelligence/search]] 和 [[artificial-intelligence/adversarial-search]] 结合（正如 AlphaZero 把 MCTS 与学出的网络结合）；部分可观测的强化学习需要 [[artificial-intelligence/probabilistic-reasoning]] 的信念状态。监督学习、神经网络及其优化——深度强化学习的函数近似器——在 LLM Atlas 中讲授，从[神经网络](/learn/llm/course.php?c=neural-networks)开始；用强化学习训练并对齐语言模型则在其[后训练](/learn/llm/course.php?c=post-training)课程中。

::: summary
- 强化学习无需模型，从奖励中学习行动。**蒙特卡洛**对完整回报取平均；**TD(0)**（[[#def-td]]）朝 $r + \gamma U(s')$ 更新，其期望更新以 $U^\pi$ 为唯一不动点（[[#prop-td-fixed-point]]）；取罗宾斯–蒙罗步长时它收敛（[[#thm-td]]）。
- **Q 学习**（[[#alg-q-learning]]）异策略地学习最优动作值；其期望更新是 Q-贝尔曼算子，一个 $\gamma$-压缩（[[#lem-q-contraction]]）；只要每一对被无穷次尝试且步长合适，它就收敛（[[#thm-q-learning]]）。SARSA 是它的同策略对应物。
- 探索很重要：贪心与固定-$\varepsilon$ 策略只有线性**遗憾**；**UCB1** 达到对数遗憾，在常数因子意义下最优（[[#ex-bandit]]）。
- 奖励就是规格说明；智能体会利用设计糟糕的奖励。
- **函数近似**跨状态泛化；线性特征的半梯度 TD 在同策略下收敛，但函数近似、自举与异策略学习合在一起可能发散。**策略梯度**沿 $\E[(r - b)\nabla\ln\pi]$ 前进（[[#thm-policy-gradient]]），是演员–评论家方法与语言模型强化学习的基础。
:::

## 习题

::: exercise 一次 TD 更新 {level=1 check="0.532"}
$\alpha = 0.1$、$\gamma = 0.9$，当前估计为 $U(s) = 0.5$、$U(s') = 0.8$。智能体从 $s$ 移到 $s'$，获得奖励 $r = 0.1$。新的 $U(s)$ 是多少？（输入值。）
::: solution
TD 误差为 $\delta = 0.1 + 0.9 \cdot 0.8 - 0.5 = 0.1 + 0.72 - 0.5 = 0.32$，故 $U(s) \gets 0.5 + 0.1 \cdot 0.32 = 0.532$。
:::
:::

::: exercise 一次 Q 学习更新 {level=1 check="1.4"}
$\alpha = 0.5$、$\gamma = 0.9$，$Q(s, a) = 1$，在 $s'$ 处 Q 值为 $Q(s', a_1) = 2$、$Q(s', a_2) = 0$。智能体在 $s$ 执行 $a$，获得 $r = 0$，落到 $s'$，然后（探索地）执行 $a_2$。Q 学习下新的 $Q(s, a)$ 是多少？（输入值。）
::: solution
Q 学习用 $s'$ 处的最大值，不管随后执行什么动作：目标 $0 + 0.9 \cdot 2 = 1.8$，故 $Q(s, a) \gets 1 + 0.5\,(1.8 - 1) = 1.4$。SARSA 会用 $Q(s', a_2) = 0$：目标 $0$，得 $1 + 0.5(0 - 1) = 0.5$。
:::
:::

::: exercise 步长序列 {level=1}
下列哪些步长序列满足罗宾斯–蒙罗条件 [[#eq-robbins-monro]]：(a) $\alpha_n = 1/n$；(b) $\alpha_n = 1/n^2$；(c) $\alpha_n = 1/\sqrt n$；(d) $\alpha_n = 0.01$；(e) $\alpha_n = 1/(n \ln(n + 1))$？
::: solution
(a) 满足：$\sum 1/n = \infty$，$\sum 1/n^2 < \infty$。(b) 不满足：$\sum 1/n^2 < \infty$，步子缩得太快，估计可能停在离目标之外。(c) 不满足：平方项之和 $\sum 1/n = \infty$，噪声永不被平均掉（尽管实践中常配合取平均使用这样的步长）。(d) 不满足：常数步长不满足第二条。(e) 满足：$\sum 1/(n\ln(n+1)) = \infty$（比较 $\int dx/(x\ln x) = \ln\ln x$），且 $\sum 1/(n\ln(n+1))^2 < \infty$。
:::
:::

::: exercise 蒙特卡洛对 TD {level=2 check="0.75"}
一个无折扣的回合制任务有状态 $A$ 与 $B$。观察到八个回合：一个是 $A, 0, B, 0$（从 $A$ 到 $B$ 奖励 $0$，再从 $B$ 到终止奖励 $0$）；六个是 $B, 1$（从 $B$ 到终止奖励 $1$）；一个是 $B, 0$。(a) 蒙特卡洛对 $U(A)$ 与 $U(B)$ 各估出多少？(b) TD 方法在这一固定数据批上收敛到什么（批处理 TD，等价于最大似然模型的值）？（输入批处理 TD 对 $U(A)$ 的估计。）
::: solution
(a) 蒙特卡洛对从每个状态观察到的回报取平均。$B$ 被访问八次，回报为 $0$（第一个回合）、$1$（六次）与 $0$（一次）：$U(B) = 6/8 = 0.75$。$A$ 被访问一次，回报 $0$：$U(A) = 0$。(b) 最大似然模型说：$A$ 总是以奖励 $0$ 转到 $B$，而 $B$ 以概率 $6/8$ 终止、奖励 $1$。它的值是 $U(B) = 0.75$、$U(A) = 0 + U(B) = 0.75$。批处理 TD 收敛到这些值，因为它的不动点就是所估模型贝尔曼方程的解。哪个更好？蒙特卡洛在观察到的数据上最小化误差；TD 利用马尔可夫结构，若过程真是马尔可夫的则泛化更好——$A$ 的估计 $0.75$ 比从单个回合得来的 $0$ 更合理。
:::
:::

::: exercise 增量式平均 {level=2}
(a) 证明 [[#eq-incremental-mean]]。(b) 证明常步长 $\alpha$ 下，$n$ 次更新后的估计为 $(1 - \alpha)^n x_0 + \sum_{i=1}^n \alpha(1 - \alpha)^{n-i} x_i$——一个指数加权平均——并且权重之和为 $1$。
::: solution
(a) $\bar x_n = \frac1n\sum_{i \le n} x_i = \frac1n\bigl((n - 1)\bar x_{n-1} + x_n\bigr) = \bar x_{n-1} + \frac1n(x_n - \bar x_{n-1})$。(b) 更新 $v_n = v_{n-1} + \alpha(x_n - v_{n-1}) = (1 - \alpha)v_{n-1} + \alpha x_n$ 用归纳展开得 $v_n = (1 - \alpha)^n v_0 + \sum_{i=1}^n \alpha(1 - \alpha)^{n-i} x_i$，其中 $v_0 = x_0$。权重之和为 $(1 - \alpha)^n + \alpha\sum_{j=0}^{n-1}(1 - \alpha)^j = (1 - \alpha)^n + \alpha \cdot \frac{1 - (1 - \alpha)^n}{\alpha} = 1$。最近的数据得权重 $\alpha$，$j$ 步之前的数据得 $\alpha(1-\alpha)^j$：估计追踪一个变化的目标，但对静止目标保持量级为 $\alpha$ 的方差。
:::
:::

::: exercise 贪心可能永远失败 {level=2}
一个两臂伯努利老虎机的均值为 $\mu_1 = 0.6$、$\mu_2 = 0.5$。贪心策略先各拉一次，此后永远拉平均较高的臂（平局归臂 2）。证明它以至少 $0.4 \cdot 0.5 = 0.2$ 的概率再也不拉臂 1，并推出其遗憾对 $T$ 是线性的。
::: solution
臂 1 的第一次拉动以概率 $0.4$ 得 $0$，臂 2 的拉动以概率 $0.5$ 得 $1$；两者独立，同时发生的概率为 $0.2$。于是臂 1 的平均为 $0$，臂 2 的平均为 $1$。臂 2 的平均是 $[0, 1]$ 内奖励的滑动平均，始终 $\ge 0$；而臂 1 因再不被拉，平均停在 $0$；平局归臂 2，贪心便永远拉臂 2。于是 $\E[N_1(T)] \le 1 + 0.8\,(T - 2)$，遗憾至少为 $0.2 \cdot 0.1 \cdot (T - 2)$，对 $T$ 线性。乐观初始值，或任何总概率不消失的探索，都能修复这一点。
:::
:::

::: exercise 实现 SARSA {level=3}
为网格世界实现 $\varepsilon = 0.1$、步长与 [[#ex-q-learning]] 相同的 SARSA，并在 $100{,}000$ 个回合之后把它学到的起点值与 Q 学习的比较。用同策略与异策略学习解释差异。
::: solution
```python
def sarsa(episodes, rng, eps=0.1, start=(2, 0)):
    Q = {(s, a): 0.0 for s in states if s not in terminal for a in MOVES}; N = {k: 0 for k in Q}
    choose = lambda s: rng.choice(list(MOVES)) if rng.random() < eps else max(MOVES, key=lambda b: Q[(s, b)])
    for _ in range(episodes):
        s = start; a = choose(s)
        while s not in terminal:
            t, r = sample_step(s, a, rng)
            if t in terminal: target, b = r + GAMMA * terminal[t], None
            else: b = choose(t); target = r + GAMMA * Q[(t, b)]     # 同策略：下一步实际执行的动作
            N[(s, a)] += 1; Q[(s, a)] += (target - Q[(s, a)]) / N[(s, a)]
            s, a = t, b
    return Q

Q = sarsa(100_000, random.Random(1989))
print(round(max(Q[((2, 0), b)] for b in MOVES), 3))
```

```console
$ python3 sarsa.py
0.206
```

SARSA 的估计（$0.206$）低于 Q 学习的（$0.285$），也低于最优值（$0.296$），并且在极限中仍保持更低：SARSA 估计的是它实际遵循的 $\varepsilon$-贪心策略的值，这个策略每十步就浪费一步作随机动作，还偶尔跌进楼梯口。Q 学习估计的是贪心策略的值，而它自己并不遵循贪心策略。若智能体在工作期间将持续探索，SARSA 的估计才是诚实的那个；若学习结束之后就不再探索，Q 学习的才是。
:::
:::

::: exercise 汤姆森采样 {level=3}
用独立的 $\mathrm{Beta}(1, 1)$ 先验为 [[#ex-bandit]] 的伯努利老虎机实现汤姆森采样（对每个臂抽 $\theta_i \sim \mathrm{Beta}(1 + \text{成功次数}_i, 1 + \text{失败次数}_i)$，拉样本最大的臂），并在 $T = 10^4$ 处把它的遗憾与 UCB1 的比较。Python 的 `random.betavariate` 从 beta 分布抽样。
::: solution
```python
def thompson(means, T, rng):
    k = len(means); s = [0] * k; f = [0] * k; total = 0.0
    for t in range(T):
        a = max(range(k), key=lambda i: rng.betavariate(1 + s[i], 1 + f[i]))
        if rng.random() < means[a]: s[a] += 1
        else: f[a] += 1
        total += means[a]
    return T * max(means) - total

rng = random.Random(1933)
print(round(sum(thompson([0.2, 0.4, 0.5, 0.6, 0.7], 10_000, rng) for _ in range(20)) / 20, 1))
```

```console
$ python3 thompson.py
39.1
```

汤姆森采样在 $T = 10^4$ 处的平均遗憾约 $39$，约为 [[#ex-bandit]] 中 UCB1 的 $229$ 的六分之一。两者都有对数遗憾，但这里汤姆森采样的常数更小：它按某个臂是最佳臂的后验概率的比例去探索该臂，对明显差的臂这个概率下降很快；而 UCB1 的奖励 $\sqrt{2\ln t/N_i}$ 是保守的最坏情形置信宽度。（先验也有影响；对伯努利臂取均匀先验是一个自然的选择。）
:::
:::
