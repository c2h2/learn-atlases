大量采样完整解答再挑最好的做法，把每次尝试都当作彼此独立的：第一步就出错的解答照样被写到底，开头大好的解答一写完就被弃之不顾。人类解题者要经济得多：试一个想法，判断它有没有希望，把有希望的做下去，卡住时再退回。这就是**搜索**：借助对每个部分解有多大希望的评估，对部分解构成的树进行显式探索。

本章把推理当作在步骤上的搜索。它给出搜索问题的形式化，介绍思维树（tree of thoughts，Yao 等，2023）、由过程奖励模型引导的步骤级束搜索，以及带 UCT 规则的蒙特卡洛树搜索——其探索项由一个集中不等式导出。它还按发表时的原貌，把这些方法放回令搜索声名大噪的对弈与定理证明系统之中——AlphaGo、AlphaZero、AlphaProof。一个在玩具算术谜题 24 点游戏上的完整实现，在验证器不完美、提议步骤数大致相等的条件下比较了采样、束搜索与树搜索。本章以一个由强化学习推理的成功所引发的疑问收尾：当模型写出一条带回溯的长思维链时，显式搜索还有必要吗，还是搜索已经被学会了？

## 把推理看作搜索问题 {#sec-problem}

::: definition 推理步骤上的搜索 {#def-search}
对输入 $x$ 的一个**推理搜索问题**由以下部分构成：**状态** $s = (x, s_1,\dots,s_t)$，即输入后面跟着到当前为止的步骤；一个**提议分布** $\pi(s_{t+1}\mid s)$，即一个生成候选下一步的语言模型；一个识别完整解答的**终止检验**；对终止状态（在其存在时）的**结果检验** $o(s)\in\{0,1\}$；以及对非终止状态的**价值估计** $\hat v(s)$——一个过程奖励模型、一个学来的价值函数，或模型自身的判断。一个**搜索算法**决定扩展哪些状态（向 $\pi$ 询问子节点）以及何时停止；其代价按模型调用数或生成词元数计。
:::

这个定义区分了三个角色，而单个模型可以身兼数职。**提议**就是生成。**评估**是对希望的判断；[[reasoning/process-outcome-rewards#prop-orm-value]] 表明，在前缀上训练的结果模型学到的恰恰是一个价值 $\hat v(s)\approx\Prob_\pi(\text{成功}\mid s)$，而 PRM 则是对步骤正确性的一种相关判断。**检验**是精确的，只在结尾才有，而且只对可验证的任务才有。带最终检验的独立采样用到了提议与检验，却不涉及评估；搜索加入了评估，于是能在解答完成*之前*重新分配力气。

### 评估能换来什么 {#sec-why-eval}

考虑完美评估器的极端情形：若 $s$ 仍能被正确地补全则 $\hat v(s) = 1$，否则为 $0$。那么，一个对当前状态提议 $k$ 个子节点、并走向任一价值为 $1$ 的子节点的贪心搜索，永远不会走入死路——但若 $k$ 个提议中没有一个是可解的，它仍会失败。

::: proposition 带完美评估器的贪心搜索 {#prop-greedy}
设某个解答有 $D$ 步，且在深度 $d$，从任一可解状态出发的提议中有比例 $f_d$ 本身可解，各提议之间相互独立。每步提议 $k$ 个子节点、并走向一个可解子节点（由完美评估器识别）的贪心搜索，成功概率为

$$
\prod_{d=1}^{D}\big(1 - (1 - f_d)^k\big),
$$ {#eq-greedy}

共用 $kD$ 个提议；而 $n$ 次独立 rollout（每步一个提议）以概率 $1 - \big(1 - \prod_d f_d\big)^n$ 成功，用 $nD$ 个提议。
:::

::: proof
在每个深度，只要 $k$ 个独立提议中至少有一个可解，搜索就继续，概率为 $1 - (1-f_d)^k$；由各深度相互独立的假设，加上完美评估器总能在可解子节点存在时把它挑出来，概率相乘即可。单次 rollout 成功要求其 $D$ 个提议每一个都可解，概率为 $\prod_d f_d$；$n$ 次独立 rollout 除非全部失败便算成功。
:::

对比的是一串接近 $1$ 的数的乘积与一串小数的乘积。取 $f_d = 0.2$、$D = 3$、$k = 5$，贪心搜索用 $15$ 个提议以 $(1 - 0.8^5)^3 = 0.304$ 的概率成功；一次 rollout 以 $0.2^3 = 0.008$ 的概率成功，五次 rollout（同样是 $15$ 个提议）为 $0.039$。评估把长链的指数衰减（[[reasoning/chain-of-thought#sec-compound]]）转化为逐步的检验。麻烦在于真实的评估器并不完美，本章余下部分讲的就是各种算法如何应对这一点。

::: widget plot
f: (1 - (1 - f)^x)^D; 1 - (1 - f^D)^(x)
x: 1, 30
y: 0, 1
sliders: f=0.2:0.05:0.6:0.01; D=3:1:10:1
labels: 带完美评估器的贪心搜索，每步 $k$ 个提议; $k$ 次独立 rollout
caption: 成功概率随每步提议数 $k$ 的变化（[[#prop-greedy]]），针对 $D$ 步的解答，其中有比例 $f$ 的提议能保持问题可解。为做公平的预算比较，rollout 曲线取 $k$ 次各 $D$ 步的 rollout，与搜索同为 $kD$ 个提议。增大 $D$：搜索平缓退化，独立采样则崩溃，因为 $f^D$ 变得极小。真实评估器会犯错，故搜索曲线是一个上界。
:::

## 思维树 {#sec-tot}

Yao 等（2023）提出了**思维树**（tree of thoughts，ToT）：在其中，语言模型同时扮演提议者与评估者。一个*思维*是一段连贯的中间步骤——一个方程、计划的一行、纵横填字的一个词。ToT 有四个组成部分：把问题分解为思维；一个**思维生成器**，独立采样候选思维，或在一次提示里让模型提出若干个；一个**状态评估器**，提示模型为状态打分（例如判断到达目标*肯定*、*可能*还是*不可能*），或在多个状态间投票；以及一个搜索算法——广度优先（每个深度保留最好的 $b$ 个状态），或深度优先、当评估器否定某个状态时回溯。

它们最有名的任务是 **24 点游戏**：给定四个数，用 $+$、$-$、$\times$、$\div$ 把它们组合成 $24$，每个数恰好用一次。在 $100$ 道难题上，GPT-4 用标准的输入–输出提示解出 $7.3\%$，用思维链 $4.0\%$，对 $100$ 条链做自洽性则 $9.0\%$；广度 $b = 1$ 的思维树解出 $45\%$，$b = 5$ 时 $74\%$。每个思维是一个算术步骤；评估器是同一个模型，被询问剩下的数是否仍能到达 $24$，每个状态采样三次；被判定失败的状态会被剪枝。ToT 还在迷你纵横填字和一项创意写作任务上改进了结果，代价是比单条思维链多出许多的模型调用——代价本身是 [[reasoning/test-time-scaling]] 的主题。

::: example 手玩一次 24 点搜索 {#ex-24}
用 $b = 2$ 的广度优先搜索求解 $(4, 7, 8, 8)$，拿你自己的判断当评估器。
::: solution
深度 $1$：一些提议如 $8/8 = 1$，留下 $(1, 4, 7)$；$8 - 4 = 4$，留下 $(4, 7, 8)$；$7 + 8 = 15$，留下 $(4, 8, 15)$；$4\times8 = 32$，留下 $(7, 8, 32)$。评估：$(1, 4, 7)$——能到达 $24$ 吗？$(7 - 1)\times4 = 24$：*肯定*。$(4, 7, 8)$：$(7 - 4)\times8 = 24$：*肯定*。保留这两个。从 $(1, 4, 7)$ 出发的深度 $2$：$7 - 1 = 6$，留下 $(4, 6)$，*肯定*，因为 $4\times6 = 24$。深度 $3$：$4\times6 = 24$。解为 $4\times(7 - 8/8) = 24$；另一个保留的状态给出 $(7 - (8 - 4))\times8 = 24$。评估器做了大部分工作：若没有它，大约 $36$ 种可能的第一步都得各自展开。
:::
:::

## 步骤级束搜索 {#sec-beam}

对词元做束搜索会保留概率最高的 $B$ 个部分序列（[[sequence-models/decoding-basics]]）。对*步骤*做束搜索则保留**价值估计**最高的 $B$ 个部分解——通常取自 PRM——并为每个状态生成 $k$ 个候选下一步。

::: algorithm 带价值模型的步骤级束搜索 {#alg-beam}
**输入：**问题 $x$，提议模型 $\pi$，价值模型 $\hat v$，束宽 $B$，每个状态的提议数 $k$，最大深度 $D$。
1. 置前沿 $\mathcal F\leftarrow\{(x)\}$。
2. 对 $d = 1,\dots,D$：
3. 对每个状态 $s\in\mathcal F$，从 $\pi(\cdot\mid s)$ 采样 $k$ 个下一步，至多得到 $B k$ 个子节点。
4. 把已是完整解答的子节点移入已完成候选集合。
5. 置 $\mathcal F$ 为其余子节点中 $\hat v$ 最大的 $B$ 个；若为空则停止。
6. 返回得分最高的已完成候选（或在它们之间投票）。
:::

::: proposition 束搜索的代价 {#prop-beam-cost}
若没有状态在深度 $D$ 之前变为终止状态，步骤级束搜索生成 $k + (D-1)Bk$ 个步骤，并评估同样数量的状态。$n$ 个 $D$ 步解答的独立采样生成 $nD$ 个步骤；代价相等时，$n = \big(k + (D-1)Bk\big)/D$。
:::

::: proof
第一次扩展只有 $1$ 个状态，生成 $k$ 个子节点；其余 $D - 1$ 个深度各扩展 $B$ 个状态、每个生成 $k$ 个子节点。每个生成的子节点都被评估一次。
:::

::: example 同等预算的比较 {#ex-budget}
一道数学解答约有 $D = 10$ 步、每步 $60$ 个词元。束搜索取 $B = 4$、$k = 8$，且 PRM 评估一步的代价与生成一步相当。束搜索生成多少词元？同样的生成预算能买到多少份完整样本？PRM 又添了什么？
::: solution
由 [[#prop-beam-cost]]，$8 + 9\cdot32 = 296$ 步，即 $296\cdot60 = 17{,}760$ 个生成词元。同样的预算能买 $296/10\approx30$ 份完整解答，供 best-of-$N$ 或投票使用。束搜索期间 PRM 给 $296$ 个部分状态打分；而用同一个 PRM 的 best-of-$30$ 只给 $30$ 个已完成的解答打分（若对步分数做聚合，则是它们全部 $300$ 个前缀），因此评估代价相近。所以这个比较是 $30$ 次独立尝试对阵一次搜索——搜索的 $296$ 步集中在每个深度最有希望的 $4$ 个前缀上——谁胜谁负取决于题目难度与 PRM 的可靠程度。
:::
:::

Snell 等（2024）在 MATH 基准上，于相同生成预算下比较了 best-of-$N$、步骤级束搜索与超前搜索，三者都由同一个 PRM 引导。束搜索在小预算与较难题目上表现更好；在简单题与大预算上，best-of-$N$ 赶上甚至反超，作者认为原因是束搜索过度优化了 PRM——朝着 PRM 喜欢的步骤走，而这些步骤并不总是正确的。这正是 [[reasoning/process-outcome-rewards#sec-uses]] 中过度优化现象的搜索版本：算法对不完美的评估器优化得越狠，评估器的错误就越要紧。

## 蒙特卡洛树搜索 {#sec-mcts}

束搜索是武断的：一个状态一旦掉出束中就再也得不到回访。**蒙特卡洛树搜索**（MCTS）为每个访问过的状态保存统计量，并不断回访这棵树，在两个目标之间平衡：**利用**看起来好的状态，**探索**试得太少、无从判断的状态。

::: algorithm 蒙特卡洛树搜索 {#alg-mcts}
每个节点 $s$ 保存访问次数 $N(s)$ 与总价值 $W(s)$，均值 $Q(s) = W(s)/N(s)$。按迭代预算重复下列步骤：
1. **选择。**从根出发，反复走到由选择规则（下面讲 UCT）选出的子节点，直到抵达一个尚未扩展的节点。
2. **扩展。**向提议模型询问该节点的 $k$ 个子节点。
3. **评估。**估计该节点的价值：用 **rollout**（用 $\pi$ 把解答补全并检验结果）、用价值模型 $\hat v$，若节点是终止状态则用精确检验。
4. **回传。**对从根到该节点路径上的每个节点，把 $1$ 加到 $N$、把价值加到 $W$。

最后返回根节点中被访问最多的子节点（用于逐步行动），或找到的最佳终止状态。
:::

### UCT 规则 {#sec-uct}

选择规则来自**多臂老虎机**理论。在一个被访问 $N$ 次的节点上，对访问了 $n_j$ 次、均值价值为 $\bar X_j$ 的子节点，按最大化下式来选择：

$$
\bar X_j + c\sqrt{\frac{\ln N}{n_j}},
$$ {#eq-uct}

即**树上置信上界**（upper confidence bound applied to trees，UCT；Kocsis 与 Szepesvári，2006），它基于 Auer、Cesa-Bianchi 与 Fischer（2002）的 UCB1 规则——后者取 $c = \sqrt2$。第一项负责利用；第二项是**探索加成**，对于相对于父节点访问很少的子节点很大，而且对每个未被选中的子节点都会——缓慢地——增长，因此没有哪个子节点会被永远冷落。

::: proposition 探索加成是一个置信界 {#prop-ucb}
设 $X_1,\dots,X_n$ 是 $[0,1]$ 上均值为 $\mu$ 的独立取值，$\bar X_n$ 为它们的平均。对任意 $t\ge1$，

$$
\Prob\Big(\mu > \bar X_n + \sqrt{\tfrac{2\ln t}{n}}\Big)\le t^{-4}.
$$

因此取 $c = \sqrt2$、$t = N$ 时，子节点的 UCT 索引以至少 $1 - N^{-4}$ 的概率是该子节点真实均值的*上*界。
:::

::: proof
$[0,1]$ 上独立变量的霍夫丁（Hoeffding）不等式断言：对 $\varepsilon > 0$，$\Prob(\mu - \bar X_n\ge\varepsilon)\le\exp(-2n\varepsilon^2)$。取 $\varepsilon = \sqrt{2\ln t/n}$：则 $2n\varepsilon^2 = 4\ln t$，界为 $e^{-4\ln t} = t^{-4}$。
:::

选择置信上界最大的子节点，体现的是**面对不确定性的乐观**：选某个子节点，或因其均值高（利用），或因其界宽（探索），两种情形下选择它不是有利就是有信息量。对老虎机问题，Auer 等证明了 UCB1 对每个次优臂的期望拉动次数只随总拉动次数对数增长；Kocsis 与 Szepesvári 证明了 UCT 在根节点处的估计收敛到最优值。在推理树中，这些取值并非独立同分布——节点下方的策略会随树的生长而改变——所以这些保证是动机而非证明，常数 $c$ 在实践中需要调节。

::: example 手算 UCT {#ex-uct}
一个节点已被访问 $N = 10$ 次。它的三个子节点的（总价值，访问次数）为 $(3, 4)$、$(1, 1)$、$(4, 5)$。取 $c = 1$，UCT 选哪个子节点？
::: solution
$\ln10 = 2.3026$。子节点 1：$0.75 + \sqrt{2.3026/4} = 0.75 + 0.759 = 1.509$。子节点 2：$1.0 + \sqrt{2.3026} = 1 + 1.517 = 2.517$。子节点 3：$0.8 + \sqrt{2.3026/5} = 0.8 + 0.679 = 1.479$。UCT 选子节点 2：它唯一的一次访问得到了价值 $1$，而只有一次观测时它的界很宽。若那次访问纯属走运，接下来几次访问就会拉低它的均值、缩小它的加成，注意力随之回到其他子节点。
:::
:::

### 先验：PUCT {#sec-puct}

当策略网络为子节点给出先验概率 $P(s, a)$ 时，AlphaGo 与 AlphaZero 使用一个常被称为 **PUCT** 的变体，它把探索项按先验缩放：

$$
a^* = \arg\max_a\ Q(s, a) + c_{\text{puct}}\,P(s, a)\,\frac{\sqrt{\sum_b N(s, b)}}{1 + N(s, a)}.
$$ {#eq-puct}

先验高而尚未访问的子节点会被先尝试，探索加成像 $1/n$（而非 $1/\sqrt n$）那样衰减。对语言模型，$P(s,a)$ 自然是模型给出该提议步骤的概率（在 $k$ 个提议上适当归一化），而 $Q$ 来自价值模型或 PRM。

::: example 手算 PUCT {#ex-puct}
在一个总访问数为 $100$ 的节点处，三个子节点的 $(Q, P, N) = (0.5, 0.6, 60)$、$(0.6, 0.3, 30)$、$(0.2, 0.1, 10)$。取 $c_{\text{puct}} = 1.5$，会选中哪个？
::: solution
$\sqrt{100} = 10$。子节点 1：$0.5 + 1.5\cdot0.6\cdot10/61 = 0.5 + 0.148 = 0.648$。子节点 2：$0.6 + 1.5\cdot0.3\cdot10/31 = 0.6 + 0.145 = 0.745$。子节点 3：$0.2 + 1.5\cdot0.1\cdot10/11 = 0.2 + 0.136 = 0.336$。选中子节点 2：它的价值最高，而它的探索加成与子节点 1 几乎相当，因为它被访问的次数只有后者的一半。先验偏向子节点 1，因此它早期得到了许多访问；随着证据积累，$Q$ 占据主导。
:::
:::

::: widget plot
f: c*sqrt(log(N)/x); c*0.3*sqrt(N)/(1 + x)
x: 1, 100
y: 0, 3
sliders: c=1.4:0.2:3:0.1; N=200:10:2000:10
labels: UCT 加成 $c\sqrt{\ln N/n}$; PUCT 加成 $cP\sqrt N/(1+n)$（$P = 0.3$）
caption: 探索加成随子节点访问次数 $n$ 的变化，父节点有 $N$ 次访问。UCT 加成像 $1/\sqrt n$ 那样衰减、像 $\sqrt{\ln N}$ 那样增长；[[#eq-puct]] 的 PUCT 加成像 $1/n$ 那样衰减、却像 $\sqrt N$ 那样增长，并按子节点的先验概率 $P$ 缩放。增大 $N$：UCT 加成几乎不变，而 PUCT 随着父节点计数的增长，迫使很少访问的子节点得到回访。
:::

## 对弈与定理证明中的搜索 {#sec-alpha}

MCTS 因对弈而成名。Coulom（2006）提出了这个名称并将其用于围棋，Kocsis 与 Szepesvári（2006）提出了 UCT 规则。**AlphaGo**（Silver 等，2016）把 MCTS 与一个在人类棋局上并经自我对弈训练的策略网络、以及一个价值网络相结合，于 2016 年 3 月击败了李世石（Lee Sedol）。**AlphaGo Zero**（2017）与 **AlphaZero**（Silver 等，2018）仅凭自我对弈学习，采用 PUCT 选择，由单个网络同时输出策略与价值，在围棋、国际象棋与将棋上达到超越人类的水平。它们的训练循环是专家迭代的一种形式（[[reasoning/verifiable-rewards#alg-star]]）：搜索是专家，它的访问计数成为策略的训练目标，对局结果训练价值。

同样的模式被带进了数学。**AlphaGeometry**（Trinh 等，2024）把一个提议辅助线构造的语言模型与一个符号演绎引擎配对，在一个往届奥赛题基准上解出 $30$ 道几何题中的 $25$ 道。2024 年 7 月 Google DeepMind 宣布，**AlphaProof**——在 Lean 证明助手中用强化学习搭配 AlphaZero 风格的搜索来证明命题——与 AlphaGeometry 2 一起，在题目被人工形式化之后，解出了 2024 年国际数学奥林匹克六题中的四题、总分 $28$（满分 $42$）——银牌标准——有的题目计算长达三天；一篇详实的报道于 2025 年见于《Nature》。在 2025 年奥赛上，Google DeepMind 与 OpenAI 分别宣布，一个在时限内写出自然语言证明的通用推理模型达到了金牌标准（$42$ 分得 $35$ 分），其中前者的成绩由竞赛协调员评定。这些只是关于特定系统在特定日期的宣布与报道；它们表明的是到 2025 年搜索、形式验证与长推理在竞赛数学上所能达到的高度，而非一种普遍能力。

对形式数学之外的语言模型，MCTS 风格的方法包括 RAP（Hao 等，2023），它把模型同时用作世界模型与奖励估计器；以及 rStar-Math（Guan 等，2025），它通过若干轮带过程偏好模型的 MCTS 训练小模型。相比之下，DeepSeek-R1 报告把 MCTS 列入其规模化尝试中不成功之列（[[reasoning/verifiable-rewards#sec-r1]]）：词元级生成的分支因子比棋盘游戏大得多，而要训练一个准确到足以引导搜索的价值模型被证明很难。

::: warning 搜索的好坏不超过它的评估器
搜索把力气花在评估器指向之处。一个噪声大的价值模型会让束搜索自信满满地钻进错误分支，而有系统性盲点的价值模型会被搜索*利用*，恰如奖励模型被强化学习利用（[[reasoning/process-outcome-rewards#def-hacking]]）。有精确的最终检验时，搜索只可能找不到解，而不会返回错误的解；没有它时，一个“找到”高价值解的搜索，不过是找到了它的评估器喜欢的东西。务必报告评估器，并用独立检验测量最终准确率。
:::

## 数值实验室：24 点 {#sec-code}

下面的清单用分数精确实现了 24 点游戏。一个随机的“提议模型”均匀地任选一个合法步骤。一个充当学习式 PRM 的替身会报告某状态能否仍然到达 $24$——该答案由暴力穷举精确算出——但会以概率 $\varepsilon$ **翻转答案**。所有方法都对最终状态做精确检验，一如在可验证任务上。比较在提议步骤数大致相等的条件下进行。

```python
import math, random
from fractions import Fraction as F
from functools import lru_cache
from itertools import combinations_with_replacement
rng = random.Random(6)

def children(state):
    """一步之内可达的所有状态：用 + - * / 合并两个数。"""
    out = []
    for i in range(len(state)):
        for j in range(i + 1, len(state)):
            a, b = state[i], state[j]
            rest = state[:i] + state[i + 1:j] + state[j + 1:]
            vals = {a + b, a - b, b - a, a * b}
            if b: vals.add(a / b)
            if a: vals.add(b / a)
            out += [tuple(sorted(rest + (v,))) for v in vals]
    return out

@lru_cache(maxsize=None)
def solvable(state):                       # 精确预言机（仅用于构造带噪声的验证器）
    if len(state) == 1:
        return state[0] == 24
    return any(solvable(c) for c in children(state))

def verifier(state, eps):                  # 学习式 PRM 的替身：会翻转标签的预言机
    v = solvable(state)
    if rng.random() < eps:
        v = not v
    return v + 0.01 * rng.random()         # 小的随机扰动以打破平局

puzzles = [tuple(F(x) for x in p) for p in combinations_with_replacement(range(1, 14), 4)]
puzzles = [p for p in puzzles if solvable(p)]
print(f"{len(puzzles)} of 1820 four-number puzzles from 1..13 are solvable")
test = rng.sample(puzzles, 200)

def sampling(p, n):                        # n 次独立随机 rollout，最后做精确检验
    calls = 0
    for _ in range(n):
        s = p
        while len(s) > 1:
            s = rng.choice(children(s)); calls += 1
        if s[0] == 24:
            return True, calls
    return False, calls

def beam(p, width, k, eps):                # 按验证器分数保留最好的 width 个状态
    frontier, calls = [p], 0
    while len(frontier[0]) > 1:
        cand = []
        for s in frontier:
            cs = children(s)
            for c in rng.sample(cs, min(k, len(cs))):
                calls += 1
                cand.append((verifier(c, eps), c))
        if len(cand[0][1]) == 1:           # 最后一步：对每个提议做精确检验
            return any(c[0] == 24 for _, c in cand), calls
        cand.sort(key=lambda t: -t[0])
        frontier = [c for _, c in cand[:width]]

def mcts(p, iters, eps, k=5, c_uct=1.0):  # UCT；叶子由验证器打分，终止状态精确检验
    N, W, kids, calls = {}, {}, {}, 0
    for _ in range(iters):
        path, s = [p], p
        while s in kids:                   # 选择：按 UCT 规则下降
            parent = s
            fresh = [c for c in kids[parent] if c not in N]
            s = fresh[0] if fresh else max(kids[parent], key=lambda c:
                    W[c] / N[c] + c_uct * math.sqrt(math.log(N[parent]) / N[c]))
            path.append(s)
        if len(s) == 1:                    # 终止状态：精确检验
            if s[0] == 24:
                return True, calls
            value = 0.0
        else:                              # 扩展：模型提议 k 个下一步
            cs = children(s)
            kids[s] = rng.sample(cs, min(k, len(cs))); calls += len(kids[s])
            if len(s) == 2 and any(c[0] == 24 for c in kids[s]):
                return True, calls         # 提议的最后一步会被精确检验
            value = min(1.0, verifier(s, eps))
        for node in path:                  # 回传
            N[node] = N.get(node, 0) + 1
            W[node] = W.get(node, 0.0) + value
    return False, calls

def run(name, f):
    wins = calls = 0
    for p in test:
        ok, c = f(p); wins += ok; calls += c
    print(f"{name:34s} success {wins / len(test):.3f}   proposals per puzzle {calls / len(test):6.1f}")

run("sampling, n = 1", lambda p: sampling(p, 1))
run("sampling, n = 12", lambda p: sampling(p, 12))
run("sampling, n = 40", lambda p: sampling(p, 40))
for eps in [0.0, 0.1, 0.2, 0.3]:
    run(f"beam 3 x 5, verifier error {eps}", lambda p: beam(p, 3, 5, eps))
for eps in [0.0, 0.2, 0.3]:
    run(f"MCTS 20 iterations, error {eps}", lambda p: mcts(p, 20, eps))
```

```text
1362 of 1820 four-number puzzles from 1..13 are solvable
sampling, n = 1                    success 0.010   proposals per puzzle    3.0
sampling, n = 12                   success 0.095   proposals per puzzle   34.1
sampling, n = 40                   success 0.195   proposals per puzzle  107.6
beam 3 x 5, verifier error 0.0     success 0.380   proposals per puzzle   34.7
beam 3 x 5, verifier error 0.1     success 0.340   proposals per puzzle   34.8
beam 3 x 5, verifier error 0.2     success 0.265   proposals per puzzle   34.7
beam 3 x 5, verifier error 0.3     success 0.145   proposals per puzzle   34.7
MCTS 20 iterations, error 0.0      success 0.360   proposals per puzzle   81.8
MCTS 20 iterations, error 0.2      success 0.270   proposals per puzzle   85.1
MCTS 20 iterations, error 0.3      success 0.295   proposals per puzzle   84.5
```

一个随机步骤只有 $1\%$ 的概率到达 $24$，独立采样爬升得很慢：$12$ 次 rollout（$34$ 个提议）解出 $9.5\%$，$40$ 次 rollout 解出 $19.5\%$。同样 $35$ 个提议的束搜索在完美验证器下解出 $38\%$——不是 $100\%$，因为从大约 $36$ 种可能的第一步里采 $5$ 个经常一个可解的都遇不上，正如 [[#prop-greedy]] 所预言——并随验证器犯错而稳步退化：在 $30\%$ 错误率下，它只比随机采样好一点。MCTS 在这里用了更多提议，但对验证器错误明显更鲁棒，因为它不断回访状态并对它们的价值取平均，而不是丢弃它们；几个百分点的差异在 $200$ 道题的采样误差（约 $0.03$）之内。真实系统面对的是同样的取舍，只是它们的提议模型是学来的、远胜于随机，而评估器是学来的、远非预言机。

::: quiz
一个搜索用 PRM 剪掉部分解的分支，并用精确检验器检验最终答案。哪些说法正确？（多选。）
- [x] 如果 PRM 误剪了所有可解的分支，搜索会找不到解，但不会返回错误的解。
- [ ] 有了完美的 PRM，束搜索在有解时总能找到解。
- [x] UCT 的探索项会让搜索回访那些 PRM 打分低、但很少被访问的状态。
- [ ] UCT 的探索加成随父节点的访问次数线性增长。
::: solution
有了精确的最终检验，错误的答案永远不会被返回。完美的 PRM 仍然需要提议模型在它的 $k$ 个提议中提出一个好步骤（[[#prop-greedy]]）。UCT 的加成 $c\sqrt{\ln N/n}$ 只随父节点计数按 $\sqrt{\ln N}$ 增长，但足以回访很少尝试的子节点。
:::
:::

## 搜索已经被学会了吗？ {#sec-learned}

用强化学习训练的推理模型（[[reasoning/verifiable-rewards]]）会写出很长的链：尝试一个思路、检验它、放弃它、再试另一个——这是搜索的可见痕迹，被写进单个序列。两条工作线索表明搜索确实可以这样学会。Gandhi 等（2024）在《Stream of Search》中，用语言模型在 Countdown 算术游戏的搜索过程序列化轨迹上训练——其中包括错误与回溯——发现它们比只在最优解上训练的模型解出更多问题，并随强化学习进一步改进。Lehnert 等（2024）在迷宫与推箱子（Sokoban）谜题的 A* 搜索执行轨迹上训练 Transformer，再把它们微调为用比 A* 自身更少的搜索步数找出最优计划。

显式搜索与学来的搜索各有互补的长处。学来的搜索运行起来便宜——一个序列，无需调度——且能适应问题，但它是串行的，受上下文长度所限，且难以并行。显式搜索可以分摊到许多并行调用上，可以在每个节点使用精确检验器，并给出诸如绝不返回未经检验的答案之类的保证；它需要一个不错的评估器和一个经工程定义的“步骤”概念。截至 2026 年，两者都在使用：在长的串行推理之上做并行采样与投票，在已发表的评测中很常见；而在存在形式检验器的地方——如定理证明——显式树搜索仍是核心。

::: history
启发式搜索与人工智能同龄：Newell、Shaw 与 Simon 的 Logic Theorist（1956）就在搜索证明，Hart、Nilsson 与 Raphael（1968）提出了 A*。带置信上界的老虎机算法由 Lai 与 Robbins（1985）以及 Auer、Cesa-Bianchi 与 Fischer（2002）作了分析。Coulom（2006）为蒙特卡洛树搜索命名，Kocsis 与 Szepesvári（2006）提出了 UCT。AlphaGo（2016）、AlphaGo Zero（2017）与 AlphaZero（2018）把 MCTS 与深度网络相结合。对语言模型，Xie 等（2023）用自我评估引导束搜索，Yao 等（2023）提出了思维树，Hao 等（2023）把模型当作世界模型来应用 MCTS。Trinh 等（2024）发表了 AlphaGeometry；AlphaProof 于 2024 年 7 月公布。Gandhi 等（2024）与 Lehnert 等（2024）在搜索轨迹上训练模型，Snell 等（2024）在相同算力下比较了 PRM 引导的搜索与 best-of-$N$。
:::

::: summary
- 对推理做**搜索**，把提议（一个语言模型）、评估（PRM、价值模型或自我判断）与检验（精确，在结尾）分开。
- 有了完美评估器，贪心搜索以概率 $\prod_d(1 - (1-f_d)^k)$ 成功，而单次 rollout 为 $\prod_d f_d$：评估把随步数而来的指数衰减变成了逐步检验。
- **思维树**让模型同时做提议者与评估者，配广度优先或深度优先搜索；在 24 点上，它把 GPT-4 从 $4\%$（思维链）提高到 $74\%$。
- **步骤级束搜索**代价为 $k + (D-1)Bk$ 个提议；在 PRM 引导下，它在小预算与难题上帮助最大，但也可能过度优化 PRM。
- **MCTS** 用 **UCT** 选择子节点，$\bar X_j + c\sqrt{\ln N/n_j}$，其加成是一个霍夫丁置信界（$c = \sqrt2$ 时，至多有 $N^{-4}$ 的概率被越过）；**PUCT** 加入先验，$Q + cP\sqrt N/(1+n)$，如 AlphaZero 中所用。
- 搜索在对弈与形式数学中大获成功（AlphaGo、AlphaZero、AlphaProof，按已发表的报道）；对自然语言推理，长长的强化学习思维链部分地把搜索内化，而在存在精确检验器的地方，显式搜索仍然有价值。
:::

## 习题

::: exercise 一个 UCT 分数 {level=1 check="1.4846"}
一个子节点在 $10$ 次访问后总价值为 $6$；它的父节点有 $50$ 次访问。取 $c = \sqrt2$，计算它的 UCT 索引，保留四位小数。
::: solution
$0.6 + \sqrt2\sqrt{\ln50/10} = 0.6 + 1.41421\cdot\sqrt{0.39120} = 0.6 + 1.41421\cdot0.62546 = 0.6 + 0.8845 = 1.4846$（保留四位小数；未舍入的值为 $1.48454$）。
:::
:::

::: exercise 束搜索的预算 {level=1 check="35"}
$B = 3$、$k = 5$ 的步骤级束搜索运行 $D = 3$ 步。由 [[#prop-beam-cost]]，它提议多少个步骤？
::: solution
$k + (D-1)Bk = 5 + 2\cdot15 = 35$，与清单里的 $34.7$ 吻合（当某个状态的合法步骤不足 $5$ 个时会更少）。
:::
:::

::: exercise 一个置信半径 {level=1 check="0.6786"}
对 $t = 100$、$n = 20$，计算 [[#prop-ucb]] 的半径 $\sqrt{2\ln t/n}$，保留四位小数，并给出真实均值超过置信上界这一事件的概率上界。
::: solution
$\sqrt{2\cdot4.60517/20} = \sqrt{0.46052} = 0.6786$。概率至多 $100^{-4} = 10^{-8}$。
:::
:::

::: exercise 带完美评估器的贪心搜索 {level=2 check="0.3039"}
每步 $f_d = 0.2$、$D = 3$、$k = 5$，计算 [[#eq-greedy]] 的成功概率，保留四位小数，并与 $15$ 次独立 rollout 比较——对后者，每一步让问题保持可解的概率都是 $0.2$。
::: solution
$(1 - 0.8^5)^3 = (1 - 0.32768)^3 = 0.67232^3 = 0.3039$。十五次 rollout 会用 $45$ 个提议、以 $1 - (1 - 0.008)^{15} = 0.113$ 成功；五次 rollout——与搜索同样多的 $15$ 个提议——给出 $0.039$。同样代价下，搜索的成功概率约为其八倍。
:::
:::

::: exercise 24 点树的规模 {level=2 check="3888"}
数一数四个数的 24 点树中的步骤序列数目：把每个无序数对以及六种运算（$a+b$、$a-b$、$b-a$、$a\times b$、$a/b$、$b/a$）各当作一个独立步骤，忽略重复与除以零。
::: solution
四个数时有 $\binom42 = 6$ 个数对、$6$ 种运算：$36$ 个第一步。三个数时 $\binom32\cdot6 = 18$；两个数时 $6$。完整序列数为 $36\cdot18\cdot6 = 3888$。对计算机而言，穷举在这里轻而易举，这正是 24 点是检验*模型*搜索的好题目的原因：模型应该不需要接近 $3888$ 次调用。
:::
:::

::: exercise PUCT 与 UCT {level=2}
在 [[#ex-puct]] 中，改用 UCT（$c = 1$，忽略先验）重新计算选择，并解释差异。然后解释为什么 AlphaZero 的加成像 $1/(1+n)$ 而非 $1/\sqrt n$ 那样衰减。
::: solution
UCT 取 $N = 100$：$\ln100 = 4.605$。子节点 1：$0.5 + \sqrt{4.605/60} = 0.5 + 0.277 = 0.777$。子节点 2：$0.6 + \sqrt{4.605/30} = 0.6 + 0.392 = 0.992$。子节点 3：$0.2 + \sqrt{4.605/10} = 0.2 + 0.679 = 0.879$。UCT 同样选子节点 2，但把子节点 3 排到第二，因为没有先验时，它很少的访问换来了很大的加成；PUCT 则把它排在最后，因为先验说它不太可能是好的。先验很强时，PUCT 衰减更快的加成会把访问集中到策略偏爱的子节点上，并在它们的价值已知后停止探索；让搜索在该宽的地方保持宽的，是先验而不是 $\sqrt{\ln N}$ 的增长。$1/(1+n)$ 这一形式是 AlphaGo 与 AlphaZero 中经实验验证的设计选择，不是 [[#prop-ucb]] 那类界的结果。
:::
:::

::: exercise 搜索何时胜过采样？ {level=2}
用 [[#prop-greedy]]，设 $D$ 步、所有 $f_d = f$，比较贪心搜索（每步 $k$ 个提议）与 $k$ 次独立 rollout——两者代价相同。证明在 $f$ 很小（且 $kf$ 也很小）时，两者成功概率之比约为 $k^{D-1}$。这对长问题意味着什么？
::: solution
$f$ 很小时 $1 - (1-f)^k\approx kf$，于是贪心搜索的成功概率约为 $(kf)^D$；$k$ 次 rollout 的成功概率约为 $kf^D$。比值为 $(kf)^D/(kf^D) = k^{D-1}$。（更仔细地说，当 $kf$ 不小时，搜索成功率为 $(1-(1-f)^k)^D$，随 $k$ 增大趋于 $1$，而采样停留在 $kf^D$ 附近。）所以评估的优势随步数 $D$ 指数增长：对长问题，每步只要比随机猜测强一点的评估器就价值巨大——只要它的错误不是系统性的，正如清单所展示的。
:::
:::

::: exercise 带回溯的深度优先搜索 {level=3}
为 24 点写一个深度优先搜索：对每个状态提议 $k = 6$ 个随机子节点，按带噪声验证器的分数依次访问它们，当某个状态的子节点用完就回溯，预算为 $40$ 个提议。使用清单中的函数，在同样这 $200$ 道题上报告 $\varepsilon = 0$ 与 $\varepsilon = 0.2$ 时的成功率。
::: solution
```python
def dfs(p, k, eps, budget):
    calls = 0
    def visit(s):
        nonlocal calls
        cs = children(s)
        props = rng.sample(cs, min(k, len(cs)))
        calls += len(props)
        if len(s) == 2:
            return any(c[0] == 24 for c in props)
        for c in sorted(props, key=lambda c: -verifier(c, eps)):
            if calls >= budget:
                return False
            if verifier(c, eps) >= 0.5 and visit(c):   # 跳过判定为无望的状态
                return True
        return False
    return visit(p), calls

for eps in [0.0, 0.2]:
    run(f"DFS k = 6, error {eps}", lambda p: dfs(p, 6, eps, 40))
```

把这段接在清单后面，会打印：

```text
DFS k = 6, error 0.0               success 0.455   proposals per puzzle   14.0
DFS k = 6, error 0.2               success 0.450   proposals per puzzle   23.2
```

在完美验证器下，DFS 平均用 $14$ 个提议解出 $45.5\%$ 的题——比用 $35$ 个提议的束搜索更好——因为它一旦成功就停下，在被判无望的分支上不花分毫。在 $20\%$ 验证器错误下，它的成功率几乎不变（$45\%$，在采样误差之内），却要花 $23$ 个提议：回溯能从假阳性中恢复，代价是预算。（决定要不要下探时会再次查询验证器，所以它的噪声每个状态被采样两次，正如一个在正温度下采样的学习式模型一样。）
:::
:::

::: exercise 显式的还是学来的？ {level=3}
一个团队要解两类竞赛题：一类领域有精确检验器（Lean 证明），另一类没有（自然语言的物理推导）。对每一类，用本章和 [[reasoning/verifiable-rewards]] 的结果，论证该投资带价值模型的显式树搜索、长思维链的强化学习，还是两者都做。
::: solution
有精确检验器时，显式搜索很有吸引力：每个终止节点都可验证，所以搜索绝不会返回错误的证明；失败的分支能提供训练数据；AlphaZero/专家迭代的循环可直接套用（AlphaProof 即如此）。长思维链的强化学习也是可行的，因为检验器提供奖励，而且两者能自然结合——学来的策略提议步骤，搜索负责验证。没有检验器时，显式搜索受限于它的评估器：学习式价值模型或 PRM 会被强搜索过度优化（[[#sec-beam]]），而且没有任何东西保证返回的推导是对的。更稳妥的投资是在奖励*确实*可验证的领域（数学与代码）训练策略，迁移到新领域，配适度规模的采样与投票或一个生成式验证器，并以人工评估判断最终质量。两种情形下都应在相同算力下报告结果，因为搜索与长链消耗推理算力的方式不同（[[reasoning/test-time-scaling]]）。
:::
:::
