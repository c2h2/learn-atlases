一辆配送机器人要穿过仓库地面去装卸区。最直接的路线经过一个楼梯口；机器人的轮子时不时打滑，而打滑的时机若不对，就会把它送下楼梯。绕远路安全但慢，而且机器人的电池电量也有它的价值。它该怎么办？不是简单地"走最短路径"——那无视了风险——也不是"绝不靠近楼梯"——那可能浪费得远超风险本身。一个理性智能体（[[artificial-intelligence/intelligent-agents#def-rational]]）用每个结果的*概率*去权衡它的*可欲程度*，而且这不能只做一次，要在每一步都做——因为下一个决策将取决于上一个决策把它带到了哪里。

本章提供两样原料。**效用论**说如何在不确定结果之间选择：给每个结果一个效用，选择**期望效用**最大的动作；冯·诺依曼（von Neumann）与摩根斯坦（Morgenstern）的一个著名定理表明，任何偏好满足几条一致性公理的智能体，其行为都恰似这么做了。我们用它来计算**信息价值**。然后**马尔可夫决策过程**（MDP）把单次决策推广为序贯决策。我们定义策略及其值，导出**贝尔曼方程**，并证明**值迭代**收敛——因为贝尔曼更新是一个**压缩映射**——带有告诉我们何时停下来的显式误差界；还证明**策略迭代**在有限步后以最优策略终止。这里的一切都是由已知模型精确计算的；[[artificial-intelligence/reinforcement-learning]] 将去掉这一假设。

## 效用与理性选择

一张**彩票** $L = [p_1, S_1; \dots; p_k, S_k]$ 是这样一种局面：结果 $S_i$ 以概率 $p_i$ 出现（$\sum p_i = 1$）；一个结果本身也可以是一张彩票。若智能体偏好 $A$ 胜于 $B$ 则记 $A \succ B$，若不偏不倚则记 $A \sim B$，两种情况之一成立则记 $A \succeq B$。

::: theorem 冯·诺依曼–摩根斯坦效用定理 {#thm-vnm}
设智能体对彩票的偏好满足：**可排序性**（对任何 $A$、$B$，$A \succ B$、$B \succ A$、$A \sim B$ 三者恰有一个成立）；**传递性**；**连续性**（若 $A \succ B \succ C$，则存在 $p$ 使 $[p, A; 1 - p, C] \sim B$）；**可替换性**（若 $A \sim B$，则 $[p, A; 1 - p, C] \sim [p, B; 1 - p, C]$）；**单调性**（若 $A \succ B$，则当且仅当 $p \ge q$ 时有 $[p, A; 1 - p, B] \succeq [q, A; 1 - q, B]$）；以及**可分解性**（复合彩票按概率法则化为简单彩票）。则存在结果上的一个**效用函数** $U$ 使得
$$
A \succeq B \iff \E U(A) \ge \E U(B), \qquad \text{其中 } \E U([p_1, S_1; \dots; p_k, S_k]) = \sum_i p_i\, U(S_i),
$$
且 $U$ 在正仿射变换 $U' = aU + b$、$a > 0$ 意义下唯一（冯·诺依曼与摩根斯坦，1944）。
:::

我们不证明这一定理；不过其构造很自然。取最好结果 $S^\top$ 与最坏结果 $S^\bot$，把 $U(S)$ 定义为使 $S \sim [p, S^\top; 1 - p, S^\bot]$ 的那个概率 $p$——由连续性它存在；于是公理迫使每张彩票都按期望定价。这些公理并非随意：例如违反传递性的智能体可以被当作**金钱泵**（money pump）来榨取——若它偏好 $A$ 胜于 $B$、$B$ 胜于 $C$、$C$ 胜于 $A$，它就会付一点钱把 $C$ 换成 $B$，再把 $B$ 换成 $A$，再把 $A$ 换成 $C$，如此永无止境。

于是理性智能体选择使**期望效用**最大的动作：
$$
\mathrm{EU}(a \mid e) = \sum_{s'} \Prob(\mathrm{Result}(a) = s' \mid a, e)\, U(s'), \qquad a^* = \operatorname*{arg\,max}_a \mathrm{EU}(a \mid e).
$$ {#eq-meu}
这就是**最大期望效用原理**（MEU）。它对效用*从何而来*只字不提——那是设计者、使用者或偏好征询（preference elicitation）的事——只说它们必须如何与概率结合。

效用不是钱。对大多数人来说，稳得的 £1,000 比 £0 与 £2,000 之间一次公平抛硬币更值钱，尽管两者的期望货币价值都是 £1,000：他们金钱的效用函数是**凹函数**，他们是**风险规避**的。一张彩票的**确定性等值**是与其效用相同的确定金额；期望货币价值与确定性等值之差是**风险溢价**，即智能体愿意付出来避免风险的金额——保险的基础。

::: example 确定性等值 {#ex-certainty-equivalent}
一个金钱效用为 $U(x) = \sqrt x$（单位为英镑）的智能体得到一张彩票：£0 或 £400，概率各 $1/2$。它的确定性等值与风险溢价各是多少？
::: solution
$\E U = \tfrac12 \sqrt0 + \tfrac12 \sqrt{400} = 10$。确定性等值 $c$ 满足 $\sqrt c = 10$，故 $c = £100$。期望货币价值是 £200，所以风险溢价是 £100：任何高于 £100 的确定金额，智能体都愿意拿彩票去换。线性效用 $U(x) = x$ 的智能体是**风险中性**的，对彩票的估价为 £200；凸效用（比如 $x^2$）的智能体则是风险追求的。
:::
:::

::: widget plot
f: sqrt(x); x/20
x: 0, 400
y: 0, 21
points: 0,0; 400,20; 100,10; 200,10
labels: U(x) = \sqrt{x}; \text{弦：彩票的期望效用}
caption: 一条凹的金钱效用曲线。弦连接例中彩票的两个结果（£0 与 £400）；它在均值 £200 处的高度就是期望效用 $10$。曲线在 £100 处就已达到 $10$，那正是确定性等值。$100$ 与 $200$ 之间的水平间隔是风险溢价——效用越弯曲，它越大。凹性恰是琴生不等式 $\E U(X) \le U(\E X)$。
:::

::: quiz
某智能体的效用函数是金钱 $x$ 的函数 $U(x)$。下列哪些效用函数在彩票之间的选择上与 $U$ 完全一致？

- [x] $3U(x) + 7$
- [ ] $U(x)^3$
- [ ] $e^{U(x)}$
- [x] $U(x)/2 - 1$
::: solution
由 [[#thm-vnm]]，效用函数在*正仿射*变换 $aU + b$（$a > 0$）意义下唯一，这种变换保持期望效用的大小顺序：$\E[aU + b] = a\,\E U + b$。$U^3$ 或 $e^U$ 这类非线性单调递增变换保持确定结果的排序，却不保持彩票的排序，因为 $\E[\phi(U)] \ne \phi(\E U)$；它们改变了智能体的风险态度。（在确定性的极小化极大搜索中，任何单调递增变换都无伤大雅——对比 [[artificial-intelligence/adversarial-search]] 中关于期望极小化极大的习题。）
:::
:::

### 信息价值

智能体常常可以在行动之前收集信息：做一次检测、查一次传感器、委托一份调查。信息只有可能改变决策时才有价值。

::: definition 完全信息的价值 {#def-vpi}
设 $E$ 是智能体在选择动作之前可以观察的一个随机变量，当前证据为 $e$。关于 $E$ 的**完全信息的价值**是
$$
\mathrm{VPI}_e(E) = \Bigl(\sum_{j} \Prob(E = e_j \mid e)\, \max_a \mathrm{EU}(a \mid e, E = e_j)\Bigr) - \max_a \mathrm{EU}(a \mid e),
$$
即观察 $E$ 之后再行动的期望效用，减去现在就行动的期望效用。
:::

::: theorem 信息在期望上不会有害 {#thm-vpi}
对每个 $E$ 与 $e$，$\mathrm{VPI}_e(E) \ge 0$，当每个 $E$ 的取值下最佳动作都相同时取等号。
:::

::: proof
设 $\alpha$ 是现在的最佳动作。由全期望公式，$\mathrm{EU}(\alpha \mid e) = \sum_j \Prob(e_j \mid e)\, \mathrm{EU}(\alpha \mid e, e_j)$。对每个 $j$，$\mathrm{EU}(\alpha \mid e, e_j) \le \max_a \mathrm{EU}(a \mid e, e_j)$。用权重 $\Prob(e_j \mid e)$ 求和即得 $\max_a \mathrm{EU}(a \mid e) \le \sum_j \Prob(e_j \mid e) \max_a \mathrm{EU}(a \mid e, e_j)$，即 $\mathrm{VPI} \ge 0$。若 $\alpha$ 对每个 $e_j$ 都最优，则每个不等式都取等号。
:::

这一定理说的是观察*之前*的*期望*价值；某个具体的观察从事后看可能让智能体更糟。而且只有免费时信息才值它的 VPI：当某信息的 VPI 超过其代价时理性智能体才去收集——**短视**策略，即每次索要净价值最高的那个观察，是一种常见且常常不错的近似。

::: example 该委托一份调查吗？ {#ex-vpi}
一家公司可以推出一款产品，也可以不推。若市场好（概率 $0.4$），推出赚 $100$；若市场差，推出亏 $40$；不推得 $0$（效用单位为 £10,000，风险中性）。一份完美市场调查的价值是多少？
::: solution
没有调查：$\mathrm{EU}(\text{推出}) = 0.4 \cdot 100 + 0.6 \cdot (-40) = 40 - 24 = 16$，而 $\mathrm{EU}(\text{不推出}) = 0$；于是公司推出产品，期望效用 $16$。有了调查：若报"好"（概率 $0.4$）就推出赚 $100$；若报"差"（概率 $0.6$）就不推得 $0$。期望效用 $0.4 \cdot 100 + 0.6 \cdot 0 = 40$。所以 $\mathrm{VPI} = 40 - 16 = 24$，即 £240,000：至多付这么多买一份完美的调查是值得的。价值完全来自市场差的情形，那里信息改变了决策；一份不完美的调查价值更低，用调查的错报率按同样方式计算即可（一次如 [[artificial-intelligence/probabilistic-reasoning]] 的贝叶斯网络计算）。
:::
:::

## 马尔可夫决策过程

现在让智能体反复行动。每次动作之后世界随机地移到一个新状态，智能体得到奖励；它的目标是使总奖励随时间最大化。

::: definition 马尔可夫决策过程 {#def-mdp}
一个**马尔可夫决策过程**由以下部分构成：有限状态集 $S$；每个状态上一个有限动作集 $A(s)$；一个**转移模型** $P(s' \mid s, a)$，即在 $s$ 中执行 $a$ 到达 $s'$ 的概率；一个**奖励函数** $R(s, a, s')$，绝对值不超过 $R_{\max}$；以及一个**折扣因子** $\gamma \in [0, 1)$。转移是**马尔可夫的**：只依赖当前状态与动作，不依赖历史。从时刻 $0$ 起的**回报**是折扣和 $\sum_{t \ge 0} \gamma^t R(s_t, a_t, s_{t+1})$。
:::

折扣意味着 $t$ 步之后的奖励只值现在的 $\gamma^t$——因为未来不确定，因为利率，或仅仅为了使无穷和有限：$\lvert \sum_t \gamma^t r_t\rvert \le R_{\max}/(1 - \gamma)$。**终止状态**（吸收的，此后再无奖励）模拟会结束的**回合**。由于每个动作的结果不确定，解不能是一个固定的动作序列；它是一个**策略** $\pi$，为每个状态规定一个动作 $\pi(s)$。

::: definition 策略的值、最优值 {#def-value}
策略 $\pi$ 在状态 $s$ 的**值**（或**效用**）是从 $s$ 出发、一路遵循 $\pi$ 的期望回报：
$$
U^\pi(s) = \E\Bigl[\sum_{t \ge 0} \gamma^t R(s_t, \pi(s_t), s_{t+1}) \Bigm| s_0 = s\Bigr].
$$
**最优值**为 $U^*(s) = \max_\pi U^\pi(s)$；若一个策略在每个状态都达到它，则称其为**最优**策略。
:::

对第一步作条件化即得**贝尔曼方程**。对固定策略，
$$
U^\pi(s) = \sum_{s'} P(s' \mid s, \pi(s))\, \bigl[R(s, \pi(s), s') + \gamma\, U^\pi(s')\bigr],
$$ {#eq-bellman-policy}
这是 $\lvert S\rvert$ 元线性方程组；对最优值，
$$
U^*(s) = \max_{a \in A(s)} \sum_{s'} P(s' \mid s, a)\, \bigl[R(s, a, s') + \gamma\, U^*(s')\bigr].
$$ {#eq-bellman}
内层的表达式是 **Q 值** $Q(s, a)$：在 $s$ 中执行 $a$、此后最优行动的期望回报。若知道 $U^*$，最优策略对它是**贪心**的：$\pi^*(s) = \arg\max_a Q(s, a)$。最优平稳确定性策略存在、且 $U^*$ 是 [[#eq-bellman]] 的唯一解，这由下文的压缩论证（再加上"依赖历史或随机的策略不可能更好"的标准论证）得出。这一递推与 [[artificial-intelligence/adversarial-search]] 的期望极小化极大递推相同，只是带机会结点、没有对手——但它在一张有圈的图上，所以无法自底向上求值。

::: example 一个网格世界 {#ex-grid}
一个机器人在 $3 \times 4$ 网格中移动（行自上而下为 $0$–$2$，列为 $0$–$3$），$(1, 1)$ 处有一堵墙，$(0, 3)$ 处有一个目标（终止，效用 $+1$），$(1, 3)$ 处有一个楼梯口（终止，$-1$）。动作 $N$、$S$、$E$、$W$ 以概率 $0.8$ 按意图方向移动，以概率 $0.1$ 向每个垂直方向打滑；撞上墙或边界则机器人留在原地。每步代价 $0.04$（奖励 $-0.04$），$\gamma = 0.9$。求最优值与最优策略。
::: solution
```python
GRID = ["...G",
        ".#.P",
        "...."]
STEP, GAMMA, SLIP = -0.04, 0.9, 0.1            # 每步奖励、折扣、向每侧打滑的概率
MOVES = {"N": (-1, 0), "S": (1, 0), "E": (0, 1), "W": (0, -1)}
SIDE = {"N": "EW", "S": "EW", "E": "NS", "W": "NS"}
states = [(r, c) for r in range(3) for c in range(4) if GRID[r][c] != "#"]
terminal = {(r, c): (1.0 if GRID[r][c] == "G" else -1.0) for r, c in states if GRID[r][c] in "GP"}

def move(s, d):
    r, c = s[0] + MOVES[d][0], s[1] + MOVES[d][1]
    return (r, c) if (r, c) in states else s    # 撞上墙或边界：留在原地

def transitions(s, a):
    """返回 (概率, 后继状态) 列表：意图方向 0.8，每侧 0.1。"""
    return [(1 - 2 * SLIP, move(s, a))] + [(SLIP, move(s, d)) for d in SIDE[a]]

def q_value(U, s, a):
    return sum(p * (STEP + GAMMA * U[t]) for p, t in transitions(s, a))

def value_iteration(eps=1e-4, trace=False):
    U = {s: 0.0 for s in states}; k = 0
    while True:
        new = {s: terminal[s] if s in terminal else max(q_value(U, s, a) for a in MOVES) for s in states}
        delta = max(abs(new[s] - U[s]) for s in states); U = new; k += 1
        if trace and k in (1, 2, 3, 5, 10, 20, 50): print(f"iteration {k:2d}: max change {delta:.6f}")
        if delta <= eps * (1 - GAMMA) / GAMMA:      # 误差界的停止规则
            return U, k
```

（终止状态的值就是它的效用；贪心策略和一个打印函数再多几行而已。）

```console
$ python3 mdp.py
iteration  1: max change 1.000000
iteration  2: max change 0.712800
iteration  3: max change 0.506736
iteration  5: max change 0.253244
iteration 10: max change 0.016783
converged after 19 iterations
 0.509E  0.650E  0.795E  1.000
 0.399N   ####  0.486N -1.000
 0.296N  0.254E  0.345N  0.130W
```

每格显示 $U^*$ 与贪心动作。从左下角出发，机器人先向北，然后沿顶行向东，远离楼梯口。两处选择颇有教益。在楼梯口旁边的 $(1, 2)$，机器人向*北*走——朝目标所在的行——而不是向东：向东的移动有 $0.8$ 的概率进入楼梯口。在正被楼梯口压着的 $(2, 3)$，它向*西*走——背离目标，尽管向北是最近的路：向北有 $0.8$ 的概率进入楼梯口。向西仍会以 $0.1$ 的概率打滑向北进入楼梯口；向南（撞边界，原地不动）毫无风险，但只有打滑向西时才有进展。$\gamma = 0.9$ 时，进展值这个小风险，低值 $0.130$ 正反映了这一点。（[[#ex-grid-q]] 要求算出四个 Q 值。）
:::
:::

## 值迭代

[[#eq-bellman]] 是一个含 $\lvert S\rvert$ 个非线性方程的方程组（因为有 $\max$）。**值迭代**用不动点迭代求解：从任意 $U_0$ 出发，反复作用右端。

::: definition 贝尔曼更新 {#def-bellman-operator}
**贝尔曼算子** $B$ 把值函数 $U\colon S \to \R$ 映为
$$
(BU)(s) = \max_{a \in A(s)} \sum_{s'} P(s' \mid s, a)\, \bigl[R(s, a, s') + \gamma\, U(s')\bigr].
$$
值迭代计算 $U_{k+1} = BU_k$。我们用**最大范数** $\lVert U - V\rVert = \max_s \lvert U(s) - V(s)\rVert$ 度量两个值函数之间的距离。
:::

::: theorem 贝尔曼算子是压缩映射 {#thm-contraction}
对所有值函数 $U$ 与 $V$，$\lVert BU - BV\rVert \le \gamma\, \lVert U - V\rVert$。因此 $B$ 有唯一不动点 $U^*$，值迭代从任何初始点出发都收敛于它，且 $\lVert U_k - U^*\rVert \le \gamma^k \lVert U_0 - U^*\rVert$。
:::

::: proof
首先，对有限集上任意两个函数 $f, g$，$\lvert \max_a f(a) - \max_a g(a)\rvert \le \max_a \lvert f(a) - g(a)\rvert$：若例如 $\max f \ge \max g$ 且 $\max f = f(a^*)$，则 $\max f - \max g \le f(a^*) - g(a^*) \le \max_a \lvert f(a) - g(a)\rvert$。在状态 $s$ 处取 $f(a)$ 与 $g(a)$ 为分别由 $U$ 与 $V$ 算出的 Q 值并应用它：
$$
\lvert (BU)(s) - (BV)(s)\rvert \le \max_a \Bigl\lvert \sum_{s'} P(s' \mid s, a)\, \gamma\, \bigl(U(s') - V(s')\bigr)\Bigr\rvert \le \gamma \max_a \sum_{s'} P(s' \mid s, a)\, \lVert U - V\rVert = \gamma\, \lVert U - V\rVert,
$$
因为奖励相消、概率之和为 $1$。对 $s$ 取最大值即证得压缩性。

*唯一性。*若 $U = BU$ 且 $V = BV$，则 $\lVert U - V\rVert = \lVert BU - BV\rVert \le \gamma \lVert U - V\rVert$，故 $(1 - \gamma)\lVert U - V\rVert \le 0$，从而 $U = V$。

*存在性与收敛性。*序列 $U_k = B^k U_0$ 满足 $\lVert U_{k+1} - U_k\rVert \le \gamma^k \lVert U_1 - U_0\rVert$，故对 $m > k$，$\lVert U_m - U_k\rVert \le \sum_{j=k}^{m-1} \gamma^j \lVert U_1 - U_0\rVert \le \frac{\gamma^k}{1 - \gamma} \lVert U_1 - U_0\rVert$：它在每个坐标上都是柯西列，故收敛到某个 $U^*$（空间 $\R^{\lvert S\rvert}$ 是完备的）。$B$ 连续（它就是压缩映射），所以 $BU^* = \lim B U_k = \lim U_{k+1} = U^*$。最后 $\lVert U_k - U^*\rVert = \lVert BU_{k-1} - BU^*\rVert \le \gamma \lVert U_{k-1} - U^*\rVert$，归纳即得收敛速度。这就是巴拿赫不动点定理在 $B$ 上的特化。
:::

这个不动点就是最优值：证明 $U^*$ 由对它的贪心策略达到（该策略的值满足 [[#eq-bellman-policy]]，其对策略算子的同一压缩论证保证解唯一），并且没有策略能更好（任何策略的值 $U^\pi$ 满足 $U^\pi = B^\pi U^\pi \le B U^\pi$，从 $U^\pi$ 出发迭代 $B$ 得到一个单调不减、收敛到 $U^*$ 的序列）。

需要多少轮迭代？从 $U_0 = 0$ 出发，初始误差不超过 $R_{\max}/(1 - \gamma)$，所以要达到误差 $\varepsilon$，只要 $\gamma^k R_{\max}/(1 - \gamma) \le \varepsilon$，即 $k \ge \log\bigl(R_{\max}/(\varepsilon(1 - \gamma))\bigr)/\log(1/\gamma)$。当 $\gamma \to 1$ 时 $\log(1/\gamma) \approx 1 - \gamma$，故迭代次数按 $1/(1 - \gamma)$ 增长。实践中我们不知道 $U^*$，而当相邻两次迭代足够接近时就停。

::: corollary 停止规则与策略损失 {#cor-vi-stopping}
(1) 若 $\lVert U_{k+1} - U_k\rVert \le \varepsilon(1 - \gamma)/\gamma$，则 $\lVert U_{k+1} - U^*\rVert \le \varepsilon$。(2) 若 $\lVert U - U^*\rVert \le \varepsilon$ 且 $\pi$ 对 $U$ 贪心，则 $\lVert U^\pi - U^*\rVert \le 2\gamma\varepsilon/(1 - \gamma)$。
:::

::: proof
(1) 由三角不等式与压缩性，
$\lVert U_{k+1} - U^*\rVert \le \lVert U_{k+2} - U_{k+1}\rVert + \lVert U_{k+2} - U^*\rVert$，继续展开叠合和，$\lVert U_{k+1} - U^*\rVert \le \sum_{j \ge 1} \lVert U_{k+j+1} - U_{k+j}\rVert \le \sum_{j \ge 1} \gamma^j \lVert U_{k+1} - U_k\rVert = \frac{\gamma}{1 - \gamma} \lVert U_{k+1} - U_k\rVert \le \varepsilon$。

(2) 设 $B^\pi$ 是 [[#eq-bellman-policy]] 中 $\pi$ 对应的算子（没有最大值）；它同样是 $\gamma$-压缩，不动点为 $U^\pi$。因 $\pi$ 对 $U$ 贪心，$B^\pi U = BU$。于是
$$
\lVert U^\pi - U^*\rVert = \lVert B^\pi U^\pi - B U^*\rVert \le \lVert B^\pi U^\pi - B^\pi U\rVert + \lVert BU - BU^*\rVert \le \gamma \lVert U^\pi - U\rVert + \gamma \lVert U - U^*\rVert,
$$
且 $\lVert U^\pi - U\rVert \le \lVert U^\pi - U^*\rVert + \varepsilon$。所以 $\lVert U^\pi - U^*\rVert \le \gamma \lVert U^\pi - U^*\rVert + 2\gamma\varepsilon$，整理即得结论。
:::

停止规则正是 [[#ex-grid]] 清单里的检验，取 $\varepsilon = 10^{-4}$：$19$ 轮迭代后各值与 $U^*$ 的差距已在 $10^{-4}$ 以内。贪心策略通常在值收敛之前很久就已最优——贪心策略只需要 Q 值的*排序*正确——这就引出了下一个算法。

::: widget plot
f: g^x; 2*g^x/(1-g)
x: 0, 100
y: 0, 2
sliders: g=0.5:0.01:0.99
labels: \gamma^k \text{（} k \text{ 次更新后的收缩因子）}; \text{对 } \lVert U_k - U^*\rVert \text{ 的界 } 2\gamma^k/(1-\gamma),\; R_{\max} = 1
caption: 值迭代收敛多快。第一条曲线是 $k$ 次贝尔曼更新后误差缩小到的因子 $\gamma^k$；第二条是奖励落在 $[-1, 1]$ 时从 $U_0 = 0$ 出发的最坏情形误差（在这一归一化下初始误差最大可达 $2/(1 - \gamma)$）。把 $\gamma$ 从 $0.9$ 拖向 $0.99$：达到给定精度所需的迭代次数按约 $1/(1 - \gamma)$ 增长。真实问题常常比界收敛得更快，网格世界就是如此。
:::

::: quiz
$\gamma = 0.9$ 的值迭代刚刚完成一次更新，没有任何值改变超过 $0.001$。关于当前的值 $U$ 你能保证什么？

- [ ] 它们恰为最优。
- [x] $\lVert U - U^*\rVert \le 0.009$。
- [ ] $\lVert U - U^*\rVert \le 0.001$。
- [ ] 什么也保证不了，因为界依赖初始值。
::: solution
由 [[#cor-vi-stopping]] (1)，$\lVert U_{k+1} - U^*\rVert \le \frac{\gamma}{1 - \gamma}\lVert U_{k+1} - U_k\rVert = 9 \cdot 0.001 = 0.009$。最后一次改变以因子 $\gamma/(1 - \gamma)$ 低估了剩余误差，因为未来的改变虽然几何缩小，累加起来却不少。这一保证不依赖 $U_0$。
:::
:::

::: warning 折扣是问题的一部分，不是数值技巧
人们容易把 $\gamma$ 当作为了"保险"而设到接近 $1$、或为加速算法而随意调整的收敛参数。但折扣因子改变的是哪个策略最优。在网格世界中，取 $\gamma = 0.5$ 时，楼梯口下方的机器人不再绕行：未来的奖励太不值钱，它宁愿撞墙——一边收每步代价一边避开风险——而不愿取得进展；那里最优策略从 $W$ 变成 $S$（起点的值跌到 $-0.062$）。同样，每步代价的大小会定性地改变最优行为：代价大时冒险走近路就值得了。$\gamma$ 与奖励要由你希望智能体优化什么来决定；然后才选算法。
:::

## 策略迭代

**策略迭代**交替进行两步：**策略评估**通过解线性方程组 [[#eq-bellman-policy]] 精确算出 $U^{\pi_i}$；**策略改进**使策略对之贪心。

::: algorithm 策略迭代 {#alg-policy-iteration}
1. 从任意策略 $\pi_0$ 出发。
2. 对 $i = 0, 1, 2, \dots$ 重复：
   1. *评估：*解 $U^{\pi_i}(s) = \sum_{s'} P(s' \mid s, \pi_i(s))\,[R(s, \pi_i(s), s') + \gamma U^{\pi_i}(s')]$，对一切 $s$。
   2. *改进：*对每个 $s$，令 $\pi_{i+1}(s) = \arg\max_a Q^{\pi_i}(s, a)$，其中 $Q^{\pi_i}(s, a) = \sum_{s'} P(s' \mid s, a)[R(s, a, s') + \gamma U^{\pi_i}(s')]$，当 $\pi_i(s)$ 属于最大值点时保持 $\pi_{i+1}(s) = \pi_i(s)$。
   3. 若 $\pi_{i+1} = \pi_i$，停止并返回 $\pi_i$。
:::

::: theorem 策略改进与终止 {#thm-policy-iteration}
(1) *（策略改进定理。）*若 $\pi'$ 对 $U^\pi$ 贪心，则对每个状态 $s$ 有 $U^{\pi'}(s) \ge U^\pi(s)$。(2) 若第 3 步中 $\pi' = \pi$，则 $\pi$ 最优。(3) 策略迭代至多 $\prod_s \lvert A(s)\rvert$ 轮后终止，且返回最优策略。
:::

::: proof
(1) 贪心性给出逐点成立 $B^{\pi'} U^\pi = B U^\pi \ge B^\pi U^\pi = U^\pi$。算子 $B^{\pi'}$ 是**单调**的：若逐点 $U \ge V$，则 $B^{\pi'} U \ge B^{\pi'} V$（其系数 $\gamma P$ 非负）。反复作用它，$U^\pi \le B^{\pi'} U^\pi \le (B^{\pi'})^2 U^\pi \le \cdots$，且由压缩性该序列收敛到 $B^{\pi'}$ 的不动点 $U^{\pi'}$。于是 $U^\pi \le U^{\pi'}$。

(2) 若改进步骤不改变 $\pi$，则 $\pi$ 对自己的值贪心：$U^\pi = B^\pi U^\pi = B U^\pi$。所以 $U^\pi$ 是 $B$ 的不动点，而由 [[#thm-contraction]] 不动点唯一：$U^\pi = U^*$。

(3) 若 $\pi_{i+1} \ne \pi_i$，则在某个状态新动作的 Q 值严格大于旧动作（由打破平局的规则），于是 $B^{\pi_{i+1}} U^{\pi_i} \ge U^{\pi_i}$ 且某处严格不等；(1) 的论证表明 $U^{\pi_{i+1}} \ge U^{\pi_i}$ 且在那个状态严格不等。因此没有策略会重复。确定性策略共有 $\prod_s \lvert A(s)\rvert$ 个，故算法必停，且由 (2) 以最优策略终止。
:::

(3) 的界是指数级的，但实践中策略迭代需要的迭代次数极少——即便大问题也常常不到十轮——每轮解一个 $O(\lvert S\rvert^3)$ 时间的线性方程组（或近似地，对 [[#eq-bellman-policy]] 扫几遍：**修正策略迭代**）。策略迭代在最坏情况下到底能需要多少轮曾是一个悬而未决的问题；对固定的折扣因子，它对状态数与动作数是强多项式的（叶荫宇（Ye），2011），而值迭代的运行时间依赖 $1/(1 - \gamma)$。

::: example 在网格世界上作策略迭代 {#ex-policy-iteration}
从策略"永远向西"出发，在 [[#ex-grid]] 上运行策略迭代，每个策略都精确评估。
::: solution
策略评估用高斯消元解一个 $11 \times 11$ 线性方程组（纯 Python，十几行）；改进就是贪心一步。

```python
def evaluate(pi):
    """精确解 U(s) = sum_s' P(s'|s,pi(s)) (STEP + GAMMA U(s'))，一个线性方程组。"""
    idx = {s: i for i, s in enumerate(states)}; n = len(states)
    A = [[0.0] * n for _ in range(n)]; b = [0.0] * n
    for s in states:
        i = idx[s]; A[i][i] = 1.0
        if s in terminal: b[i] = terminal[s]; continue
        for p, t in transitions(s, pi[s]):
            A[i][idx[t]] -= GAMMA * p; b[i] += p * STEP
    x = solve(A, b)                                 # 高斯消元
    return {s: x[idx[s]] for s in states}

def policy_iteration():
    pi = {s: "W" for s in states if s not in terminal}      # 一个很差的初始策略
    for k in range(1, 100):
        U = evaluate(pi); new = greedy(U)
        changed = sum(new[s] != pi[s] for s in pi)
        print(f"iteration {k}: U(start) = {U[(2, 0)]:.4f}, {changed} actions changed")
        if changed == 0: return pi, U
        pi = new
```

```console
$ python3 pi.py
iteration 1: U(start) = -0.4000, 7 actions changed
iteration 2: U(start) = -0.0566, 4 actions changed
iteration 3: U(start) = 0.2919, 2 actions changed
iteration 4: U(start) = 0.2965, 0 actions changed
 0.509E  0.650E  0.795E  1.000
 0.399N   ####  0.486N -1.000
 0.296N  0.254E  0.345N  0.130W
```

"永远向西"的策略永远到不了目标，所以从起点出发它会永远收每步代价：$U = -0.04/(1 - 0.9) = -0.4$。每次改进都抬高起点的值，正如 [[#thm-policy-iteration]] 所承诺；四次评估后策略稳定下来，与值迭代找到的策略相同，值也相同（现在是精确值，而不是 $10^{-4}$ 以内）。
:::
:::

## 超越完全可观测的 MDP

现实中的智能体很少知道状态。在**部分可观测 MDP**（POMDP）中，智能体通过传感器模型接收观测，如同隐马尔可夫模型，而最优决策依赖**信念状态**——由 [[artificial-intelligence/probabilistic-reasoning#thm-forward]] 的前向算法算出的状态上的分布。POMDP 是一个以信念为状态的 MDP：连续、高维的状态空间，精确求解一般不可行（有限时域 POMDP 是 $\mathsf{PSPACE}$ 完全的，无限时域的精确求解不可判定）；实用求解器采用基于点的近似或在线树搜索。**因子化 MDP** 像规划那样用变量描述状态，并用动态贝叶斯网络表示转移。而当转移模型与奖励未知时，智能体必须从经验中学习——强化学习。

::: history
丹尼尔·贝努利（Daniel Bernoulli）在 1738 年以"金钱的效用是对数的"解决了圣彼得堡悖论。约翰·冯·诺依曼（John von Neumann）与奥斯卡·摩根斯坦（Oskar Morgenstern）的《博弈论与经济行为》（*Theory of Games and Economic Behavior*，1944；效用公理见于第二版，1947）奠定了现代效用论，伦纳德·萨维奇（Leonard Savage）的《统计学基础》（*The Foundations of Statistics*，1954）把主观概率与效用结合起来。罗纳德·霍华德（Ronald Howard）的《动态规划与马尔可夫过程》（*Dynamic Programming and Markov Processes*，1960）引入了策略迭代，理查德·贝尔曼（Richard Bellman）的《动态规划》（*Dynamic Programming*，1957）则给出了最优性原理、贝尔曼方程与值迭代。霍华德还定义了信息价值（1966）。罗斯·沙赫特（Ross Shachter）的影响图算法（1986）与罗素–韦法尔德（Russell–Wefald）的元推理理论（1991）把决策论带进了 AI。罗纳德·威廉姆斯（Ronald Williams）与利蒙·贝尔德（Leemon Baird）在 1993 年给出了贪心策略的策略损失界，克里斯托斯·帕帕迪米特里欧（Christos Papadimitriou）与约翰·齐齐克利斯（John Tsitsiklis）在 1987 年证明了 POMDP 的难度。叶荫宇（Yinyu Ye）于 2011 年证明策略迭代对固定折扣因子是强多项式的。
:::

## 后续内容

值迭代与策略迭代需要模型 $P$ 与 $R$。[[artificial-intelligence/reinforcement-learning]] 改从采样的经验中估计值与策略，其核心算法——时序差分学习与 Q 学习——正是本章贝尔曼更新的随机近似；它们的收敛证明建立在同一个压缩性质之上。MDP 的多智能体版本是随机博弈，它把本章与 [[artificial-intelligence/adversarial-search]] 结合在一起。一般的动态规划在 [[algorithms/dynamic-programming]] 中。

::: summary
- 理性智能体最大化**期望效用**（[[#eq-meu]]）；**冯·诺依曼–摩根斯坦**公理蕴含一致的偏好可由效用函数表示，且在正仿射变换下唯一（[[#thm-vnm]]）。凹效用意味着风险规避。
- **完全信息的价值**在期望上绝不为负（[[#thm-vpi]]），且只有当信息可能改变决策时为正（[[#ex-vpi]]）。
- **MDP**（[[#def-mdp]]）有状态、动作、马尔可夫转移模型、奖励与折扣；解是**策略**，值满足**贝尔曼方程**（[[#eq-bellman-policy]]、[[#eq-bellman]]）。
- 贝尔曼更新在最大范数下是 **$\gamma$-压缩**（[[#thm-contraction]]）：值迭代几何收敛到唯一不动点 $U^*$；当改变量低于 $\varepsilon(1 - \gamma)/\gamma$ 时停止，则贪心策略的损失至多 $2\gamma\varepsilon/(1 - \gamma)$（[[#cor-vi-stopping]]）。
- **策略迭代**交替评估与贪心改进；值永不下降，并以最优策略终止（[[#thm-policy-iteration]]），通常只需寥寥数轮。
- 折扣与奖励定义了问题：改变它们就改变了最优策略。
:::

## 习题

::: exercise 期望效用 {level=1 check="16"}
在 [[#ex-vpi]] 中，不做调查而推出产品的期望效用是多少？（输入期望效用。）
::: solution
$0.4 \cdot 100 + 0.6 \cdot (-40) = 40 - 24 = 16$。不推出的期望效用为 $0$，所以公司推出。
:::
:::

::: exercise 一次贝尔曼更新 {level=1 check="0.68"}
在 [[#ex-grid]] 的网格世界中，值迭代从非终止状态的 $U_0 = 0$ 出发（终止状态取其效用 $+1$ 与 $-1$）。第一次更新后，目标旁边状态 $(0, 2)$ 中动作 $E$ 的 Q 值是多少？（输入 Q 值。）
::: solution
向东以概率 $0.8$ 到达目标；向北打滑撞上边界留在 $(0, 2)$（概率 $0.1$）；向南打滑到达 $(1, 2)$（概率 $0.1$）。两个非终止状态的 $U_0 = 0$，
$Q = 0.8\,(-0.04 + 0.9 \cdot 1) + 0.1\,(-0.04 + 0) + 0.1\,(-0.04 + 0) = 0.688 - 0.004 - 0.004 = 0.68$。
其余动作分别得 $0.05$（$N$ 与 $S$，只有打滑才能到目标）与 $-0.04$（$W$），故 $U_1(0, 2) = 0.68$。
:::
:::

::: exercise 确定性等值 {level=1 check="400"}
一个效用为 $U(x) = \sqrt x$ 的智能体面对一张付 £100 或 £900、概率各 $1/2$ 的彩票。它的确定性等值是多少英镑？（输入金额。）
::: solution
$\E U = \tfrac12(10 + 30) = 20$，故确定性等值为 $20^2 = 400$ 英镑，而期望货币价值为 £500：风险溢价 £100。
:::
:::

::: exercise 需要多少轮迭代？ {level=1 check="66"}
奖励落在 $[-1, 1]$，$\gamma = 0.9$。用 $\lVert U_k - U^*\rVert \le \gamma^k R_{\max}/(1 - \gamma)$（从 $U_0 = 0$ 起），保证误差不超过 $0.01$ 的最小的 $k$ 是多少？（输入 $k$。）
::: solution
需要 $0.9^k \cdot 10 \le 0.01$，即 $0.9^k \le 10^{-3}$，即 $k \ge \ln 1000 / \ln(1/0.9) = 6.9078/0.10536 = 65.56$。故 $k = 66$。（网格世界需要的迭代远少于此：它的回合在终止状态结束，所以有效时域很短。界是最坏情形。）
:::
:::

::: exercise 一份不完美的调查 {level=2 check="17.6"}
在 [[#ex-vpi]] 中，调查只有 $90\%$ 的准确率：以概率 $0.9$ 报告市场的真实状况，以概率 $0.1$ 报告错误状况。这份调查的期望价值是多少（看过调查再决策的期望效用减去 $16$）？（输入价值。）
::: solution
$\Prob(\text{报告好}) = 0.4 \cdot 0.9 + 0.6 \cdot 0.1 = 0.42$。给定"好"，推出的期望效用为 $(0.36 \cdot 100 - 0.06 \cdot 40)/0.42 = 33.6/0.42 = 80 > 0$：推出。$\Prob(\text{报告坏}) = 0.58$；给定"坏"，推出得 $(0.04 \cdot 100 - 0.54 \cdot 40)/0.58 = -17.6/0.58 < 0$：不推出，效用 $0$。有调查时的期望效用：$0.42 \cdot 80 + 0.58 \cdot 0 = 33.6$。调查的价值：$33.6 - 16 = 17.6$，必小于完美调查的 $24$。
:::
:::

::: exercise 评估一个策略 {level=2 check="9"}
一个 MDP 有状态 $A$ 与 $B$。在策略 $\pi$ 下，从 $A$ 以概率 $1$ 移到 $B$、奖励 $0$；从 $B$ 以概率 $1$ 留在 $B$、奖励 $1$。取 $\gamma = 0.9$，问 $U^\pi(A)$ 是多少？（输入值。）
::: solution
由 [[#eq-bellman-policy]]：$U(B) = 1 + 0.9\,U(B)$，故 $U(B) = 1/(1 - 0.9) = 10$，而 $U(A) = 0 + 0.9 \cdot 10 = 9$。
:::
:::

::: exercise 楼梯口下方的 Q 值 {#ex-grid-q level=2}
用 [[#ex-grid]] 打印的最优值，计算状态 $(2, 3)$ 的四个 Q 值，并解释为什么 $\gamma = 0.9$ 时 $W$ 最优而 $\gamma = 0.5$ 时 $S$ 最优。
::: solution
从 $(2, 3)$ 出发：$N$ 以概率 $0.8$ 到达楼梯口（$-1$），以各 $0.1$ 的概率打滑到 $(2, 2)$（$0.345$）或留在原地（$0.130$，向东是边界）；$S$ 以概率 $0.8$ 留在原地（边界），以各 $0.1$ 向西打滑到 $(2, 2)$ 或向东（原地不动）；$E$ 以概率 $0.8$ 留在原地，以各 $0.1$ 向北打滑进入楼梯口或向南（原地不动）；$W$ 以概率 $0.8$ 到达 $(2, 2)$，以各 $0.1$ 向北打滑进入楼梯口或向南（原地不动）。由 $Q = \sum p\,(-0.04 + 0.9\,U)$：
$Q(N) = 0.8(-0.94) + 0.1(0.2705) + 0.1(0.077) = -0.7173$；
$Q(S) = 0.9(0.077) + 0.1(0.2705) = 0.0963$；
$Q(E) = 0.9(0.077) + 0.1(-0.94) = -0.0247$；
$Q(W) = 0.8(0.2705) + 0.1(-0.94) + 0.1(0.077) = 0.1299$。
（这里 $-0.04 + 0.9 \cdot 0.345 = 0.2705$，$-0.04 + 0.9 \cdot 0.130 = 0.077$，用的是四位有效数字的值。）于是 $W$ 以约 $0.034$ 胜过 $S$：$10\%$ 的楼梯口风险花费 $0.1 \cdot (0.077 + 0.94) \approx 0.10$，而以概率 $0.8$ 而非 $0.1$ 到达 $(2, 2)$ 则赢得 $0.7 \cdot (0.2705 - 0.077) \approx 0.135$。取 $\gamma = 0.5$ 时每个未来值都被折扣得更狠，进展带来的收益缩到眼前风险之下，$S$——那个安全而无用的动作——反而最优。
:::
:::

::: exercise 贪心策略在有限时间变最优 {level=3}
设 $Q^*(s, a)$ 是某个有限 MDP 的最优 Q 值，并设存在一个状态含有非最优动作。令 $\Delta = \min \{ \max_b Q^*(s, b) - Q^*(s, a) : Q^*(s, a) < \max_b Q^*(s, b)\} > 0$。证明：若 $\lVert U_k - U^*\rVert < \Delta/(2\gamma)$，则对 $U_k$ 贪心的每个策略都是最优的。由此得出：值迭代在有限轮迭代后就找到最优策略，尽管它的值只在极限中收敛。
::: solution
设 $Q_k(s, a) = \sum_{s'} P(s' \mid s, a)[R(s, a, s') + \gamma U_k(s')]$。则对每个 $s$、$a$，$\lvert Q_k(s, a) - Q^*(s, a)\rvert \le \gamma \lVert U_k - U^*\rVert < \Delta/2$。若 $a$ 在 $s$ 处非最优而 $b$ 最优，则 $Q^*(s, b) - Q^*(s, a) \ge \Delta$，于是 $Q_k(s, b) - Q_k(s, a) > \Delta - \Delta/2 - \Delta/2 = 0$：非最优动作永远达不到 $Q_k$ 的最大值，贪心策略处处选最优动作。在每个状态都选最优动作（$\arg\max Q^*$）的策略是最优的，因为它的值满足 $B^\pi U^* = BU^* = U^*$，由 $B^\pi$ 不动点的唯一性得 $U^\pi = U^*$。又由 [[#thm-contraction]]，$\lVert U_k - U^*\rVert \le \gamma^k \lVert U_0 - U^*\rVert \to 0$，故对某个有限 $k_0$ 之后的所有 $k$ 条件都成立。（若每个状态的每个动作都最优，则每个策略都最优，无可证明。）
:::
:::

::: exercise 无折扣的值迭代 {level=3}
(a) 给出一个 $\gamma = 1$ 的 MDP，其中贝尔曼算子不是压缩映射、值迭代不收敛。(b) 解释为什么对每个策略都以概率 $1$ 到达终止状态的无折扣问题（随机最短路径问题），值迭代仍然收敛——至少对"从每个状态出发，每个策略都在 $n$ 步内以至少 $p > 0$ 的概率到达终止状态"的情形成立。
::: solution
(a) 单个状态 $s$，单个动作回到 $s$、奖励 $1$。则 $(BU)(s) = 1 + U(s)$，故 $U_k(s) = k$ 发散，且 $\lVert BU - BV\rVert = \lVert U - V\rVert$：不是压缩。（若奖励为 $0$，迭代点原地不动，但每个常数都是不动点——没有唯一性。）

(b) 考察 $n$ 重算子 $B^n$。两个在终止状态上取值相同的值函数（那里的值固定），其差别至多通过"尚未终止"的概率传导：对任何策略，$\lvert (B^\pi)^n U(s) - (B^\pi)^n V(s)\rvert \le \Prob(n \text{ 步后仍未终止}) \lVert U - V\rVert \le (1 - p)\lVert U - V\rVert$，而由 [[#thm-contraction]] 的最大值论证用于 $n$ 步前瞻，$B$ 同样成立。于是 $B^n$ 是 $(1 - p)$-压缩，子序列 $U_{kn}$ 几何收敛，中间各迭代点随之收敛。终止概率起着折扣的作用。（伯特卡斯（Bertsekas）与齐齐克利斯提出的随机最短路径问题一般理论，只需要不终止的策略代价无穷。）
:::
:::
