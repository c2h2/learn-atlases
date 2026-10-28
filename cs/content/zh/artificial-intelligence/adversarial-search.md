在 [[artificial-intelligence/search]] 的搜索问题里，只有智能体自己决定会发生什么。博弈中却不是：我们每走一步，对手就回一步，专挑对我们最不利的着法。"解"不再可能是一个着法序列，因为我们不知道对手会怎么走；它必须是一条**策略**，规定在对手可能把我们引到的每个局面里该做什么。自诞生之日起，博弈就是 AI 的试验场——图灵（Turing）与香农（Shannon）在 1950 年前后都在纸上写过国际象棋程序——因为博弈容易表述、难以走好，还自带无可争议的性能度量。

本章研究二人、轮流、**零和**、**完全信息**的博弈，例如国际象棋、国际跳棋、围棋、井字棋与四子棋。我们定义博弈的**极小化极大值**，证明它是每个玩家所能保证的东西，并用深度优先搜索计算它。**α–β 剪枝**在跳过不可能起作用的分支的同时算出同一个值；我们证明它的正确性，并沿着高德纳（Knuth）与穆尔（Moore）的工作说明：着法排序完美时它只考察约叶子数的平方根个叶子，从而同样时间能深搜一倍。实际的程序在固定深度截断搜索并施加一个**评估函数**。最后，**蒙特卡洛树搜索**用随机模拟对局取代评估函数，并用老虎机理论中的 UCB1 规则引导搜索——这一方法与学出的评估相结合，彻底改变了电脑围棋。

## 博弈与极小化极大

::: definition 二人零和博弈 {#def-game}
一个**博弈**（二人、确定、轮流、完全信息）由以下部分构成：状态集与初始状态 $s_0$；一个指明轮到谁走的函数 $\mathrm{ToMove}(s) \in \{\mathrm{MAX}, \mathrm{MIN}\}$；动作 $\mathrm{Actions}(s)$ 与转移模型 $\mathrm{Result}(s, a)$；**终局检验** $\mathrm{IsTerminal}(s)$；以及**效用函数** $\mathrm{Utility}(s)$，给出终局状态 $s$ 处 MAX 的所得。博弈是**零和**的：MIN 的所得是 $-\mathrm{Utility}(s)$，所以 MIN 希望效用越小越好。我们假设每盘对局都在有限步内到达终局。
:::

对国际象棋，白方（MAX）胜、和、负的效用分别为 $+1$、$0$、$-1$。**博弈树**为从 $s_0$ 出发的每个着法序列设一个结点；它的叶子是终局状态。井字棋的博弈树有 $549{,}946$ 个结点（下文数出）。对国际象棋，香农（1950）估计约有 $10^{120}$ 盘可能的对局、约 $10^{43}$ 个局面。

::: definition 极小化极大值 {#def-minimax}
状态 $s$ 的**极小化极大值**递归定义如下：
$$
\mathrm{Minimax}(s) = \begin{cases}
\mathrm{Utility}(s) & \text{若 } s \text{ 为终局，}\\
\max_{a \in \mathrm{Actions}(s)} \mathrm{Minimax}(\mathrm{Result}(s, a)) & \text{若 } \mathrm{ToMove}(s) = \mathrm{MAX}，\\
\min_{a \in \mathrm{Actions}(s)} \mathrm{Minimax}(\mathrm{Result}(s, a)) & \text{若 } \mathrm{ToMove}(s) = \mathrm{MIN}。
\end{cases}
$$
:::

递归是良定义的，因为每盘对局都有限：按结点在博弈树中的高度自底向上定义即可。MAX 的一个**策略**在每个 MAX 结点处选定一个动作；**极小化极大策略**选取达到最大值的动作。

::: theorem 极小化极大值即博弈值 {#thm-minimax}
对每个极小化极大值为 $v$ 的状态 $s$：(1) MAX 有一个策略，无论 MIN 怎么做，都能从 $s$ 保证至少 $v$ 的效用；(2) MIN 有一个策略，无论 MAX 怎么做，都能保证至多 $v$ 的效用。两者都可由极小化极大策略达成。于是，面对走极小化极大策略的 MIN，MAX 的任何策略都得不到超过 $v$ 的结果。
:::

::: proof
对 $s$ 的高度 $h$（从 $s$ 出发的最长对局长度）归纳。$h = 0$ 时 $s$ 是终局，无论谁做什么都效用为 $v$。设 $h > 0$ 且两条断言对一切更矮的状态成立；每个后继 $\mathrm{Result}(s, a)$ 都更矮。若轮到 MAX，取 $a^*$ 达到最大值，故 $\mathrm{Minimax}(\mathrm{Result}(s, a^*)) = v$。MAX 走 $a^*$，然后由归纳假设 (1) 有一个从那里保证至少 $v$ 的策略；这证明了 (1)。对 (2)，无论 MAX 走哪个动作 $a$，$\mathrm{Minimax}(\mathrm{Result}(s, a)) \le v$，由归纳假设 (2)，MIN 在 $\mathrm{Result}(s, a)$ 处有一个把 MAX 压制到至多该值的策略；把这些策略（每个 $a$ 一个）拼起来，就得到 $s$ 处保证至多 $v$ 的 MIN 策略。轮到 MIN 的情形对称。最后一句由 (2) 得出。
:::

所以极小化极大值就是双方**最优对局**的结果。井字棋的它是 $0$——和棋——国际象棋的则无人知晓。1913 年，恩斯特·策梅洛（Ernst Zermelo）在本质上就国际象棋证明了这一定理：或者白方能强制取胜，或者黑方能，或者双方都至少能强制求和。

极小化极大在对手最优时最优。面对会犯错的对手，别的策略在期望上可能更好——例如下一些极小化极大策略（在等值的着法之间不偏不倚）不会特意去设的圈套——但最坏情况下没有策略能做得更好。

### 极小化极大算法

定义本身就是一段深度优先递归：

::: algorithm 极小化极大搜索 {#alg-minimax}
```text
MINIMAX(s)
1  if IS-TERMINAL(s): return UTILITY(s)
2  if TO-MOVE(s) = MAX: return max over a in ACTIONS(s) of MINIMAX(RESULT(s, a))
3  else:                return min over a in ACTIONS(s) of MINIMAX(RESULT(s, a))
```
在根处，MAX 走这样一个动作 $a$：它的子结点取值最大。
:::

它走遍整棵博弈树：分支因子 $b$、最大深度 $m$ 时，时间 $O(b^m)$，空间 $O(bm)$（若着法逐个生成则为 $O(m)$）。

::: example 求解井字棋 {#ex-tictactoe}
算出井字棋的极小化极大值，并数一数算法访问的结点数。
::: solution
棋盘是一个九个字符的串，`X`、`O` 或 `.`，按行阅读顺序排列；X（MAX）先行。

```python
import math
LINES = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]

def utility(b):           # X 三连 +1，O 三连 -1，棋盘下满为 0
    for i, j, k in LINES:
        if b[i] != "." and b[i] == b[j] == b[k]:
            return 1 if b[i] == "X" else -1
    return 0 if "." not in b else None        # None：未终局

def children(b):
    p = "X" if b.count("X") == b.count("O") else "O"
    return [b[:i] + p + b[i+1:] for i in range(9) if b[i] == "."]

nodes = 0
def minimax(b):
    global nodes; nodes += 1
    u = utility(b)
    if u is not None: return u
    vals = [minimax(c) for c in children(b)]
    return max(vals) if b.count("X") == b.count("O") else min(vals)

print("minimax value", minimax("." * 9), "nodes", nodes)
```

```console
$ python3 ttt.py
minimax value 0 nodes 549946
alpha-beta value 0 nodes 18297
```

（第二行来自下一节的 α–β 函数，它被加在同一个文件里。）值为 $0$：双方最佳时井字棋是和棋。博弈树有 $549{,}946$ 个结点，其中 $255{,}168$ 个是终局——不同的完整对局数。不同的合法*局面*却只有 $5478$ 个，所以一个记住自己已评估过的局面的搜索（**置换表**）做的功大约少一百倍。
:::
:::

## α–β 剪枝

极小化极大要考察每个叶子。然而一个叶子常常无法影响根处的值。考虑一个 MAX 根，它的三个 MIN 子结点的叶子分别为 $(5, 9, 6)$、$(3, 8, 7)$ 与 $(9, 4, 6)$。第一个 MIN 结点的值是 $5$。第二个结点处，第一个叶子是 $3$：这个 MIN 结点的值至多 $3$，而 MAX 已经能拿到 $5$，绝不会选它——剩下的叶子 $8$ 与 $7$ 无关紧要。第三个结点处，叶子 $9$ 与 $4$ 之后值至多 $4 < 5$，叶子 $6$ 无关紧要。根的值是 $5$，由九个叶子中的六个求得。

α–β 搜索通过向下传递两个界限把这件事系统化：
- $\alpha$：通往当前结点的路径上 MAX 已经确保的最佳值（初始为 $-\infty$）；
- $\beta$：该路径上 MIN 已经确保的最佳值（最低者）（初始为 $+\infty$）。

已知其值落在窗口 $(\alpha, \beta)$ 之外的结点无法影响根，其剩余子结点被跳过。

::: algorithm α–β 搜索 {#alg-alphabeta}
```text
ALPHA-BETA(s, α, β)
1  if IS-TERMINAL(s): return UTILITY(s)
2  if TO-MOVE(s) = MAX
3      v ← −∞
4      for each a in ACTIONS(s)
5          v ← max(v, ALPHA-BETA(RESULT(s, a), α, β))
6          if v ≥ β: return v                ▷ β 截断：MIN 会避开 s
7          α ← max(α, v)
8      return v
9  else                                       ▷ 轮到 MIN，对称
10     v ← +∞
11     for each a in ACTIONS(s)
12         v ← min(v, ALPHA-BETA(RESULT(s, a), α, β))
13         if v ≤ α: return v                ▷ α 截断：MAX 会避开 s
14         β ← min(β, v)
15     return v
```
根处的调用是 $\mathrm{ALPHA\text{-}BETA}(s_0, -\infty, +\infty)$。
:::

α–β 在可能提前停下的内部结点返回什么？不一定是极小化极大值——但总足以判定那个值要不要紧。

::: theorem α–β 的正确性 {#thm-alphabeta}
设 $\alpha < \beta$，$v = \mathrm{ALPHA\text{-}BETA}(s, \alpha, \beta)$，$m = \mathrm{Minimax}(s)$。则
1. 若 $\alpha < m < \beta$，则 $v = m$；
2. 若 $m \le \alpha$，则 $m \le v \le \alpha$；
3. 若 $m \ge \beta$，则 $\beta \le v \le m$。

特别地 $\mathrm{ALPHA\text{-}BETA}(s_0, -\infty, +\infty) = \mathrm{Minimax}(s_0)$。
:::

::: proof
对 $s$ 的高度归纳。$s$ 为终局时 $v = m$，三条都成立。

设 $s$ 处轮到 MAX，按考察顺序的子结点为 $c_1, \dots, c_k$，极小化极大值为 $m_1, \dots, m_k$（故 $m = \max_i m_i$），返回值为 $v_1, v_2, \dots$。只要还没有发生截断，子结点 $c_i$ 就以窗口 $(\alpha_i, \beta)$ 被搜索，其中 $\alpha_1 = \alpha$、$\alpha_{i+1} = \max(\alpha_i, v_i)$，由第 5 行与第 7 行。$c_i$ 的归纳假设给出：

- (a) 若 $m_i < \beta$，则 $v_i < \beta$ 且 $\max(v_i, \alpha_i) = \max(m_i, \alpha_i)$，并且 $v_i \ge m_i$（若 $\alpha_i < m_i$ 则 $v_i = m_i$；若 $m_i \le \alpha_i$ 则 $m_i \le v_i \le \alpha_i$）；
- (b) 若 $m_i \ge \beta$，则 $\beta \le v_i \le m_i$。

*情形 $m < \beta$。*每个 $m_i < \beta$，故由 (a) 没有 $v_i$ 能达到 $\beta$，不发生截断，结点返回 $v = \max_i v_i$。反复使用 (a)，$\alpha_{i+1} = \max(\alpha_i, v_i) = \max(\alpha_i, m_i)$，所以 $\alpha_{k+1} = \max(\alpha, m)$；另一方面 $\alpha_{k+1} = \max(\alpha, v_1, \dots, v_k) = \max(\alpha, v)$。于是 $\max(\alpha, v) = \max(\alpha, m)$。若 $\alpha < m$，这迫使 $v = m$：第 1 条。若 $m \le \alpha$，它给出 $v \le \alpha$，而由 (a) $v = \max_i v_i \ge \max_i m_i = m$：第 2 条。

*情形 $m \ge \beta$。*设 $j$ 是第一个满足 $m_j \ge \beta$ 的子结点。它之前的子结点由 (a) 返回低于 $\beta$ 的值，所以在 $c_j$ 之前不发生截断；由 (b)，$v_j \ge \beta$，于是第 6 行触发，结点返回 $\max(v_1, \dots, v_j) = v_j$（前面的值都低于 $\beta \le v_j$）。由 (b)，$\beta \le v_j \le m_j \le m$：第 3 条。

MIN 的情形对称（交换 $\max$ 与 $\min$、$\alpha$ 与 $\beta$ 的角色）。在根处，$\alpha = -\infty < m < +\infty = \beta$，故第 1 条适用。
:::

这个定理有一个实用解读：若我们只想知道值是否超过某个阈值 $t$，就用**空窗口** $(t - 1, t)$ 调用 α–β（对整数效用而言）；结果告诉我们值在 $t$ 的哪一边，而这样的搜索剪掉的枝多得多。采用**主要变例搜索**或 **MTD(f)** 的程序就是由空窗口搜索搭建的。

```python
def alphabeta(b, alpha=-math.inf, beta=math.inf):     # 棋盘函数同上
    global nodes; nodes += 1
    u = utility(b)
    if u is not None: return u
    if b.count("X") == b.count("O"):                   # 轮到 MAX
        v = -math.inf
        for c in children(b):
            v = max(v, alphabeta(c, alpha, beta))
            if v >= beta: return v                     # β 截断
            alpha = max(alpha, v)
    else:                                              # 轮到 MIN
        v = math.inf
        for c in children(b):
            v = min(v, alphabeta(c, alpha, beta))
            if v <= alpha: return v                    # α 截断
            beta = min(beta, v)
    return v
```

在井字棋上，它访问 $18{,}297$ 个结点而不是 $549{,}946$ 个——相差三十倍——并返回同一个值 $0$，[[#ex-tictactoe]] 的输出可见。

::: example α–β 的执行轨迹 {#ex-alphabeta-trace}
在 MAX 根、MIN 子结点为 $A = (5, 9, 6)$、$B = (3, 8, 7)$、$C = (9, 4, 6)$ 的树上追踪 α–β，给出每个 MIN 结点处的窗口与被剪掉的叶子。然后重排各子结点，使考察的叶子数最少。
::: solution
| 步 | 结点 | 窗口 $(\alpha, \beta)$ | 已见叶子 | 返回值 | 在根处的效果 |
|---|---|---|---|---|---|
| 1 | $A$ | $(-\infty, \infty)$ | $5, 9, 6$ | $5$ | $\alpha \gets 5$ |
| 2 | $B$ | $(5, \infty)$ | $3$——随后 $3 \le \alpha$：截断 | $3$ | 无 |
| 3 | $C$ | $(5, \infty)$ | $9, 4$——随后 $4 \le \alpha$：截断 | $4$ | 无 |

根返回 $\max(5, 3, 4) = 5$。共考察六个叶子。注意 $B$ 与 $C$ 的返回值并不是它们的极小化极大值（$3$ 和 $4$）：由 [[#thm-alphabeta]]（第 2 条），它们只是不超过 $\alpha = 5$ 的上界，而这正是根所需要的全部。

最好的排序是每个结点处最好的着法最先走：根处取值最大的子结点（$A$，值 $5$），每个 MIN 结点里最低的叶子在前。把次序排成 $A = (5, 6, 9)$，其次 $C = (4, 6, 9)$，再 $B = (3, 7, 8)$：$A$ 三个叶子都要看（它的值必须精确确立），而 $C$ 与 $B$ 各被自己的第一个叶子推翻。五个叶子——即 $b = 3$、$d = 2$ 时的 $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1 = 3 + 3 - 1$，[[#thm-knuth-moore]] 的下界。
:::
:::

::: quiz
α–β 搜索中，一个 MIN 结点以窗口 $(\alpha, \beta) = (4, 10)$ 被搜索，返回 $2$。关于它的极小化极大值 $m$ 你能断定什么？

- [ ] $m = 2$。
- [x] $m \le 2$。
- [ ] $2 \le m \le 4$。
- [ ] 什么也定不了，因为搜索被截断了。
::: solution
由于 $2 \le \alpha = 4$，[[#thm-alphabeta]] 的第 2 条适用：$m \le v \le \alpha$，故 $m \le 2$。（MIN 结点的运行值只会随着子结点的考察而下降，所以截断值 $2$ 是其极小化极大值的一个上界。）确切的值可能更小——它的有些子结点从未被考察——但对已经有 $4$ 在手 MAX 无关紧要。
:::
:::

### α–β 能省多少？

节省完全取决于考察着法的顺序。若最好的着法总是先试，其余着法就会被尽可能快地推翻。

::: theorem Knuth–Moore：最小树 {#thm-knuth-moore}
在分支因子 $b$、深度 $d$ 的正则博弈树中，任何对所有叶子赋值的情形都确定根之极小化极大值的算法，必在某个赋值上至少考察
$$
L(b, d) = b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1
$$
个叶子；更确切地说，对每个赋值它都必须考察一个包含该值之"证明"的叶子集合，其中最小的恰含 $L(b, d)$ 个叶子。着法排序完美的 α–β 恰好考察 $L(b, d)$ 个叶子。
:::

::: proof
*界的证明。*要确信 $\mathrm{Minimax}(s_0) \ge v$，只需知道一棵 MAX **策略子树**：这棵子树在每个 MAX 结点处含一个选定的孩子、在每个 MIN 结点处含*全部*孩子，且其中每个叶子都不低于 $v$。反过来，若考察过的叶子中不含这样一棵叶子全 $\ge v$ 的子树，对手就可以把未考察的叶子调低，使值小于 $v$（若对每个 MAX 策略，其子树中总有某个叶子未考察或 $< v$，就把未考察的叶子设为 $-\infty$；那么每个 MAX 策略都会被某个 MIN 的应手压制在 $v$ 之下，由 [[#thm-minimax]]，值低于 $v$）。于是任何确知值 $v$ 的算法，都已考察了某棵叶子全 $\ge v$ 的 MAX 策略子树的全部叶子，同样也考察了某棵叶子全 $\le v$ 的 MIN 策略子树（MIN 结点一个孩子、MAX 结点全部孩子）的全部叶子。

*数目。*MAX 策略子树中一条根到叶的路径上，MAX 层贡献因子 $1$，MIN 层贡献因子 $b$。根是 MAX 层，所以叶子上方的 $d$ 层里，$\lceil d/2\rceil$ 层是 MAX 层、$\lfloor d/2\rfloor$ 层是 MIN 层：该子树有 $b^{\lfloor d/2\rfloor}$ 个叶子。MIN 策略子树有 $b^{\lceil d/2\rceil}$ 个叶子。MAX 策略子树与 MIN 策略子树恰共享一个叶子：从根出发，公共部分在 MAX 结点处必须跟随 MAX 的唯一选择、在 MIN 结点处必须跟随 MIN 的唯一选择，这确定了一条唯一的路径。所以考察集合至少有 $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1$ 个叶子。

*α–β 达到它。*排序完美时，称一个结点为 **1 型**，若它是根或某个 1 型结点的第一个孩子；称它为 **2 型**，若它是某个 1 型结点的非第一个孩子，或某个 3 型结点的任何孩子；称它为 **3 型**，若它是某个 2 型结点的第一个孩子。高德纳与穆尔用归纳法证明：α–β 搜索 1 型与 3 型结点的所有孩子，而 2 型结点只搜索第一个孩子（第一个孩子就推翻了这个着法——它已经达到引发截断的界限）。这恰是主要变例的 MAX 策略子树与 MIN 策略子树的并，共 $L(b, d)$ 个叶子。我们宁可在下文用实验核对这个数目，也不重述那段归纳。
:::

$b = 35$、$d = 10$（国际象棋的粗略模型）时，$L \approx 2 \cdot 35^5 \approx 1.05 \times 10^{8}$，对比 $35^{10} \approx 2.8 \times 10^{15}$：排序好的 α–β 同样时间能比极小化极大深搜约**一倍**，因为 $L(b, d) \approx 2b^{d/2}$，有效分支因子从 $b$ 降到 $\sqrt b$。

::: example 随机树上的着法排序 {#ex-ordering}
生成叶值为随机数的正则树（固定种子，每行 $20$ 棵树），统计 α–β 在最坏优先、随机与最优优先排序下考察的叶子数。与 $L(b, d)$ 比较。
::: solution
```python
import math, random

def make_tree(b, d, rng):            # 嵌套列表；叶子是互异的随机值
    return rng.random() if d == 0 else [make_tree(b, d - 1, rng) for _ in range(b)]

def minimax(t, maxing):
    if not isinstance(t, list): return t
    vals = [minimax(c, not maxing) for c in t]
    return max(vals) if maxing else min(vals)

def reorder(t, maxing, best_first):  # 把走方最好（或最坏）的着法排在最前
    if not isinstance(t, list): return t
    kids = [reorder(c, not maxing, best_first) for c in t]
    kids.sort(key=lambda c: minimax(c, not maxing), reverse=(maxing == best_first))
    return kids
```

用上面算法中的 `alphabeta`（统计叶子数），程序打印：

```console
$ python3 ordering.py
 b  d   b^d    worst   random    best   b^ceil(d/2)+b^floor(d/2)-1
 2  6     64       62       40      15       15
 3  5    243      230      115      35       35
 4  6   4096     3554      891     127      127
 5  6  15625    13228     2506     249      249
 8  4   4096     3896     1014     127      127
10  4  10000     9511     1837     199      199
```

最优优先排序在每种情形都恰好达到 $L(b, d)$，证实了 [[#thm-knuth-moore]]；最坏优先排序几乎什么也剪不掉。随机排序居中：$b = 4$、$d = 6$ 时它考察 $891 \approx 3.1^6$ 个叶子，有效分支因子约 $b^{0.8}$。（若叶子值是独立的连续随机变量且 $d \to \infty$，珀尔（Pearl）1982 年证明了 α–β 的有效分支因子趋于 $\xi_b/(1 - \xi_b)$，其中 $\xi_b$ 是 $x^b + x - 1 = 0$ 的正根：$b = 4$ 时为 $2.63$，$b = 10$ 时为 $5.06$——略低于中等 $b$ 时常被引用的 $b^{3/4}$。）
:::
:::

::: widget plot
f: x*log10(b); (x/2)*log10(b) + log10(2); (3*x/4)*log10(b)
x: 1, 20
sliders: b=2:1:40
labels: \log_{10} b^d \text{（极小化极大）}; \log_{10} 2b^{d/2} \text{（最优排序）}; \log_{10} b^{3d/4}
caption: 搜索的叶子数（对数尺度）随深度 $d$ 的变化：极小化极大、排序完美的 α–β，以及随机排序的经验法则 $b^{3d/4}$。把滑块拨到 $b = 35$（类似国际象棋）：在 $10^{8}$ 个叶子的预算下，极小化极大搜到深度 $5$，排序完美的 α–β 搜到深度 $10$。好的着法排序抵得上一台快一千倍的计算机。
:::

实用中，程序靠一些廉价花招逼近完美排序：它们用**迭代加深**（[[artificial-intelligence/search#thm-ids]]）进行搜索，先试上一深度处最好的着法；先试吃子；记住在其他地方同深度造成截断的**杀手着法**；并给每个着法记一个**历史**分。**置换表**——已搜索局面连同其值与界限的哈希表——避免重复搜索由不同着法次序到达的局面。

::: warning 剪枝返回的是界限，不是值
实现 α–β 时的一个常见错误，是把截断结点返回的值当作该结点的极小化极大值存入置换表或报告给用户。由 [[#thm-alphabeta]]，它只是一个上界（$\alpha$ 截断之后）或一个下界（$\beta$ 截断之后）。置换表必须记录自己持有哪一类值——精确值、下界还是上界——并且只有当它对新的窗口有效时才使用。同样，α–β 保证选出一个*最好*的根着法，但它报告的*其他*根着法的值只是界限；要给所有着法排序，必须用完整窗口逐一搜索。
:::

## 不完美的实时决策

即使剪枝完美，国际象棋也无法搜到底。沿用香农（1950）的思路，程序在某个深度截断搜索，并对那里的局面估值。

- **评估函数** $\mathrm{Eval}(s)$ 估计非终局状态的效用。经典做法是**特征**的**加权线性函数** $\mathrm{Eval}(s) = w_1 f_1(s) + \dots + w_n f_n(s)$，特征如子力（兵 $1$、马与象 $3$、车 $5$、后 $9$）、机动性、王的安全与兵形。它应当在终局状态与效用一致，要快，且与实际取胜机会强相关。
- **截断检验** $\mathrm{IsCutoff}(s, \text{深度})$ 取代终局检验：达到深度上限时返回 $\mathrm{Eval}(s)$。迭代加深让程序能在时间用完时停下，走出已完成的最深一次搜索中的最好着法。
- **静态搜索**沿"动荡"着法（吃子、将军）越过深度上限继续搜索，直到局面安静下来，因为在子力交换的中间估值毫无意义。
- **地平线效应**指用拖延着法把不可避免的失子推到深度上限之外，使搜索看不见它。静态搜索与**奇异延伸**（一个着法明显好于其他着法时搜得更深）可缓解它。
- **前向剪枝**不完整搜索就丢弃看起来坏的着法——束搜索、后置着法削减、空着法裁剪。它不保证保持极小化极大值，但实用中能让程序搜得深得多。

对确定性极小化极大而言，重要的只是评估值的*顺序*：$\mathrm{Eval}$ 的任何严格递增变换都给出同样的选择。

### 机会博弈

双陆棋中，骰子的点数在树上添加**机会节点**。机会节点的**期望极小化极大**值是其各子结点值的按概率加权平均：
$$
\mathrm{ExpectiMinimax}(s) = \sum_{r} P(r)\, \mathrm{ExpectiMinimax}(\mathrm{Result}(s, r))
$$
对结果为 $r$ 的机会节点 $s$ 成立，玩家节点处照旧取 $\max$ 或 $\min$。此时评估函数的*尺度*也要紧了，光有顺序不够：单调变换会改变哪个着法的期望最高。效用有界时，机会节点上仍可作 α–β 式的剪枝，但效果差得多，而额外的分支（双陆棋两枚骰子有 21 种不同点数）限制了搜索深度；强大的双陆棋程序靠的是浅层搜索配上极好的学出的评估函数。

## 蒙特卡洛树搜索

围棋上，评估函数的思路失败了几十年：分支因子约 $250$，没有任何简单的特征组合能预测谁会赢。**蒙特卡洛树搜索**（MCTS）用**模拟对局**估计局面的价值：用快速的（通常随机的）着法把对局走到底许多次，再对结果取平均。若天真地只这么办，模拟对局会浪费在无望的着法上。MCTS 非对称地生长搜索树，把模拟对局花在刀刃上。

::: algorithm 蒙特卡洛树搜索 {#alg-mcts}
重复以下四步直到时间用完，然后走访问次数最多的根着法：
1. **选择。** 从根出发，反复按平衡利用与探索的**树策略**走向某个子结点，直到到达一个还有未尝试着法的结点（或终局结点）。
2. **扩展。** 为一个未尝试的着法添加一个子结点。
3. **模拟。** 从新结点出发，用快速的**模拟策略**（例如均匀随机着法）把对局走到底。
4. **回传。** 更新路径上每个结点的统计量：访问次数 $N$ 加一，并把结果（从走进该结点的走方的视角）加到其累计回报 $W$ 中。
:::

树策略是要害。MCTS 把每个结点处的选择当作一个**多臂老虎机**：面对 $k$ 台赔付率未知的老虎机，赌徒想赢钱最多，就得在打迄今赔付最好的那台（利用）与试赔付率尚不确定的其他台（探索）之间权衡。**UCB1** 规则（奥尔（Auer）、切萨-比安基（Cesa-Bianchi）与菲舍尔（Fischer），2002）打的是使**置信上界**
$$
\mathrm{UCB1}(i) = \frac{W_i}{N_i} + c\sqrt{\frac{\ln N}{N_i}},
$$ {#eq-ucb1}
最大的臂，其中 $W_i/N_i$ 是臂 $i$ 迄今的平均回报，$N_i$ 是它的被玩次数，$N = \sum_i N_i$，$c$ 是常数（原始分析中取 $\sqrt 2$，适用于 $[0, 1]$ 内的回报）。第二项对很少尝试的臂很大，随臂被玩而缩小；它随 $N$ 增长缓慢，于是每个臂都会被尝试无穷多次，但次优的臂只被玩对数次。

::: theorem UCB1 与 UCT（只陈述，不证明） {#thm-uct}
1. *（奥尔、切萨-比安基与菲舍尔，2002。）* 对回报在 $[0, 1]$ 内的 $k$ 臂老虎机，取 $c = \sqrt 2$ 的 UCB1 在前 $n$ 次玩耍中，平均把每个次优臂 $i$ 玩 $O(\ln n / \Delta_i^2)$ 次，其中 $\Delta_i$ 是最佳均值与臂 $i$ 均值之差。它的期望**遗憾值**——与总是打最佳臂相比损失的回报——是 $O(\log n)$，这在常数因子意义下是最优的。
2. *（科奇什（Kocsis）与塞派什瓦里（Szepesvári），2006。）* 以 UCB1 为树策略的 MCTS 称为 **UCT**（把置信上界用于树），配适当的探索常数，在有限博弈树上：访问次数最多的根着法次优的概率随迭代次数增长收敛于 $0$，且根处的估计值收敛到极小化极大值。
:::

对第 1 部分的第一个直观想法：玩了 $n$ 次之后，被玩 $N_i$ 次的臂的真实均值与其样本均值相差超过 $\sqrt{2\ln n/N_i}$ 的概率至多约 $n^{-4}$（霍夫丁（Hoeffding）不等式），所以置信上界在很高概率上是一个乐观估计，而一个臂只有当它的乐观估计打得过最佳臂时才会被玩——约 $8\ln n/\Delta_i^2$ 次。UCT 的分析更难，因为内部结点的赔付会随其下的树变化而漂移。

::: quiz
MCTS 迭代许多轮之后，智能体应该走哪个根着法？

- [ ] UCB1 值最高的着法。
- [x] 访问次数最多的着法。
- [ ] 最后一次模拟对局获胜的着法。
- [ ] 访问次数最少的着法，因为它最不确定。
::: solution
UCB1 值里含探索奖励，那是用来收集信息的，不是用来挑最终着法的；一个很少被试的着法可能仅仅因为不确定就有很高的 UCB1 值。访问次数是一个稳健的选择：UCB1 把大多数访问送给估计值最高的着法，所以访问次数最多的着法就是长时间以来看上去最好的那个，由 [[#thm-uct]]，它在极限意义下就是极小化极大的选择。（选*平均*回报最高的也常见，但很少被访问的着法的平均值噪声很大。）
:::
:::

::: example 一个井字棋局面上的 UCT {#ex-uct}
局面 `XOX / ... / ..O` 轮到 X 走（格子按行阅读顺序编号 $0$–$8$，故 X 在 $0$ 与 $2$，O 在 $1$ 与 $8$）。用 $c = \sqrt 2$ 与随机模拟对局运行 UCT，把它对各着法的偏好与五个着法的极小化极大值作比较。
::: solution
```python
import math, random
from ttt import utility, children, minimax

def to_move(b): return "X" if b.count("X") == b.count("O") else "O"

class Node:
    def __init__(self, board, parent=None):
        self.board, self.parent = board, parent
        self.kids = []; self.untried = children(board) if utility(board) is None else []
        self.n = 0; self.w = 0.0            # 访问次数；走进本结点的走方的总回报

def uct(root_board, iterations, c=math.sqrt(2), seed=0):
    rng = random.Random(seed); root = Node(root_board)
    for _ in range(iterations):
        node = root
        while not node.untried and node.kids:                          # 1. 选择（UCB1）
            node = max(node.kids, key=lambda k: k.w / k.n + c * math.sqrt(math.log(node.n) / k.n))
        if node.untried:                                               # 2. 扩展
            b = node.untried.pop(rng.randrange(len(node.untried)))
            node.kids.append(Node(b, node)); node = node.kids[-1]
        b = node.board                                                 # 3. 模拟（随机对局）
        while utility(b) is None:
            b = rng.choice(children(b))
        u = utility(b)                                                 # +1 为 X 胜，-1 为 O 胜，0 为和
        while node:                                                    # 4. 回传
            mover = "O" if to_move(node.board) == "X" else "X"         # 谁走了走进 node 的着法
            node.n += 1; node.w += (1 + (u if mover == "X" else -u)) / 2   # 回报在 [0, 1] 内
            node = node.parent
    return root
```

对每个根着法打印其访问次数与平均回报（种子 $1$）：

```console
$ python3 mcts.py
minimax value of each move: {3: 0, 4: 0, 5: -1, 6: 1, 7: 0}
100 iterations: (square, visits, mean reward) [(3, 16, 0.59), (4, 20, 0.65), (5, 12, 0.46), (6, 33, 0.83), (7, 19, 0.66)]
1000 iterations: (square, visits, mean reward) [(3, 50, 0.54), (4, 56, 0.56), (5, 32, 0.41), (6, 798, 0.94), (7, 64, 0.6)]
10000 iterations: (square, visits, mean reward) [(3, 75, 0.53), (4, 80, 0.55), (5, 42, 0.37), (6, 9699, 0.99), (7, 104, 0.61)]
```

唯一获胜的着法是 6 号格（左下角），它同时造出两个威胁（第 $0, 3, 6$ 列与 $2, 4, 6$ 对角线）；5 号格会输。$100$ 次迭代后，UCT 已经访问 6 号格最多；$10{,}000$ 次后，它把 $97\%$ 的力气花在那里，而该着法的平均回报趋近 $1$，即它的极小化极大值——因为其下的树在生长，对手的应手趋近最优。其余着法收到的访问次数仍在缓慢增长——那就是 [[#eq-ucb1]] 的对数探索。它们的平均值在 $0.55$–$0.6$ 上下，并*不是*它们的极小化极大值（和棋是 $0$，即回报 $0.5$）：它们仍在一定程度上由随机模拟对局估计，而随机模拟对局会高估对阵随机对手时的有利局面。MCTS 对没有深入探索的着法的估计是有偏的；可靠的只有访问次数最多的着法这一选择。
:::
:::

::: widget plot
f: c*sqrt(ln(1000)/x); c*sqrt(ln(10000)/x)
x: 1, 200
y: 0, 3
sliders: c=0.2:0.1:3
labels: N = 1000; N = 10000
caption: UCB1 的探索奖励 $c\sqrt{\ln N/N_i}$ 作为一个臂被访问次数 $N_i$ 的函数，取总数 $N$ 的两个值。访问很少的着法获得很大的奖励，因此终会被再次尝试；把 $N$ 乘以十，奖励只略有提高。改变 $c$：$c$ 小则贪婪利用，可能永远发现不了好棋；$c$ 大则访问几乎均匀摊开。
:::

MCTS 不需要评估函数——只需要规则就能把一局走完——这使它成为博弈、规划以及一切带模拟器的场合的通用方法。它的弱点是：在只有精确着法序列表效用的"战术"局面里，随机模拟对局可能严重误导。现代程序用**学出来的**网络取代随机模拟对局与均匀探索：一个估计谁会赢的价值网络，和一个给着法先验概率的策略网络。这一组合就是强化学习（[[artificial-intelligence/reinforcement-learning]]）；神经网络在 [LLM Atlas](/learn/llm/course.php?c=neural-networks) 中讲授。

::: history
恩斯特·策梅洛（Ernst Zermelo）1913 年关于国际象棋的论文包含对策论的第一个定理，约翰·冯·诺依曼（John von Neumann）1928 年证明了零和博弈的极小化极大定理。克劳德·香农（Claude Shannon）的 "Programming a computer for playing chess"（1950）提出了带评估函数的深度受限极小化极大，阿兰·图灵（Alan Turing）在几乎同一时期用手算模拟过一个国际象棋程序。阿瑟·塞缪尔（Arthur Samuel）的国际跳棋程序（1959）通过自我对局学出了它的评估函数。α–β 剪枝在 1950 年代末被多次独立发现（其发明常归于约翰·麦卡锡（John McCarthy）等人），唐纳德·高德纳（Donald Knuth）与罗纳德·穆尔（Ronald Moore）的 "An analysis of alpha–beta pruning"（*Artificial Intelligence*，1975）证明了它的正确性与最小树下界；朱迪亚·珀尔（Judea Pearl）于 1982 年确定了它在随机树上的分支因子。1997 年，IBM 的「深蓝」（Deep Blue）在六局比赛中击败国际象棋世界冠军加里·卡斯帕罗夫（Garry Kasparov）。乔纳森·谢弗（Jonathan Schaeffer）的团队在 2007 年证明国际跳棋在完美对局下是和棋。雷米·库隆（Rémi Coulom）在 2006 年造出了"蒙特卡洛树搜索"一词，莱文特·科奇什（Levente Kocsis）与乔鲍·塞派什瓦里（Csaba Szepesvári）的 "Bandit based Monte-Carlo planning"（2006）提出了 UCT，其基础是彼得·奥尔（Peter Auer）、尼科洛·切萨-比安基（Nicolò Cesa-Bianchi）与保罗·费舍尔（Paul Fischer）（2002）的 UCB1 分析。DeepMind 的 AlphaGo 把 MCTS 与深度网络结合，于 2016 年 3 月以 4–1 击败围棋棋手李世石（Lee Sedol）；AlphaZero（2017–18）仅靠自我对局就学会了国际象棋、将棋与围棋。
:::

## 实际应用

截至 2026 年，最强的国际象棋引擎把 α–β 搜索（配激进的前向剪枝与庞大的置换表）同小型神经网络算出的评估函数结合起来；另一些则按 AlphaZero 的方式，用大网络引导 MCTS 风格的搜索。两者都远远超出人类水平，它们的评估被日常用来分析人类对局。小的博弈已被**完全求解**：四子棋（先手必胜，1988）与国际跳棋（和棋，2007），手段是搜索加上由逆推分析算出的残局库。对通用博弈、规划以及许多带模拟器的序贯决策问题，MCTS 是标准的基线。隐藏信息博弈（扑克）的理论需要别的工具——用反事实遗憾最小化计算均衡——超出本课程的范围。

## 后续内容

极小化极大递推是一个二人问题的贝尔曼方程；若只剩一家、对手换成为机会，它就成为马尔可夫决策过程的期望极大递推（[[artificial-intelligence/decision-making]]）。UCB1 对探索与利用的平衡将在 [[artificial-intelligence/reinforcement-learning]] 中重现，那里学出的价值函数取代评估函数的位置。判定广义博弈的胜负往往是 $\mathsf{PSPACE}$ 完全的——量词交替，如 $\mathit{TQBF}$（[[complexity/space-complexity#thm-tqbf]]），恰对应着法交替——这就是精确解只存在于小博弈的原因。

::: summary
- 二人零和完全信息博弈（[[#def-game]]）有一个**极小化极大值**（[[#def-minimax]]），它是每个玩家对抗任何对手都能保证的（[[#thm-minimax]]）；极小化极大搜索以 $O(b^m)$ 时间算出它。
- **α–β** 沿树传递窗口 $(\alpha, \beta)$，一旦某结点的值确定落在窗外就停止搜索它；它在根处返回精确的极小化极大值，其余结点返回界限（[[#thm-alphabeta]]）。
- 着法排序完美时 α–β 考察 $b^{\lceil d/2\rceil} + b^{\lfloor d/2\rfloor} - 1$ 个叶子，这是可能的最小值（[[#thm-knuth-moore]]）——因此能深搜一倍；随机排序约为 $b^{3d/4}$；迭代加深、杀手着法与置换表向最好情形逼近。
- 实际的程序截断搜索并施加**评估函数**，用静态搜索对付地平线效应；有机会节点时用**期望极小化极大**取平均，此时评估的尺度也要紧。
- **MCTS** 从随机模拟对局长出一棵非对称的树，按 **UCB1**（[[#eq-ucb1]]）选择子结点；UCT 收敛到极小化极大的选择（[[#thm-uct]]），且不需要评估函数。
:::

## 习题

::: exercise 手算极小化极大 {level=1 check="6"}
一个 MAX 根有三个 MIN 子结点，叶子分别为 $(7, 6, 9)$、$(8, 2, 4)$ 与 $(6, 10, 11)$。根的极小化极大值是多少？（输入该值。）
::: solution
三个 MIN 子结点的值为 $\min(7, 6, 9) = 6$、$\min(8, 2, 4) = 2$ 与 $\min(6, 10, 11) = 6$。根的值为 $\max(6, 2, 6) = 6$；MAX 可走第一个或第三个着法。
:::
:::

::: exercise 被剪的叶子 {level=1 check="3"}
在上一题的树（叶子 $(7, 6, 9)$、$(8, 2, 4)$、$(6, 10, 11)$）上运行 α–β，子结点从左到右考察。有多少个叶子*没有*被考察？（输入被剪叶子的数目。）
::: solution
第一个孩子：三个叶子全看，值 $6$，于是 $\alpha = 6$。第二个孩子：叶子 $8$（$v = 8$，不 $\le 6$），叶子 $2$（$v = 2 \le 6$：截断），于是叶子 $4$ 被剪。第三个孩子：叶子 $6$ 给出 $v = 6 \le \alpha = 6$：截断，于是 $10$ 与 $11$ 被剪。共剪去三个叶子（考察六个）。注意等号处的截断：与 $\alpha$ 相等的值无法改善 MAX 的选择。
:::
:::

::: exercise 最小树 {level=1 check="1999"}
$b = 10$、$d = 6$ 的正则树中，着法排序完美的 α–β 考察多少个叶子？（输入叶子数。）
::: solution
$L(10, 6) = 10^{3} + 10^{3} - 1 = 1999$，对比极小化极大的 $10^6$。奇数深度时，例如 $d = 5$，$L = 10^3 + 10^2 - 1 = 1099$。
:::
:::

::: exercise 期望极小化极大与尺度 {level=2}
MAX 在两个着法之间选择。着法 $L$ 通向一个机会节点，结果值 $2$ 与 $3$ 各以概率 $1/2$ 出现；着法 $R$ 通向一个机会节点，结果 $0$ 与 $4$ 各以概率 $1/2$ 出现。(a) 期望极小化极大选哪个着法？(b) 对叶值施加保序变换 $x \mapsto x^2$。现在选哪个着法？(c) 为什么确定性的博弈中不会发生这样的事？
::: solution
(a) $L$ 的值 $(2 + 3)/2 = 2.5$，$R$ 的值 $(0 + 4)/2 = 2$，期望极小化极大选 $L$。(b) 平方后：$L$ 得 $(4 + 9)/2 = 6.5$，$R$ 得 $(0 + 16)/2 = 8$：现在选 $R$，尽管变换保持了每对叶子的大小顺序。可见选择依赖于评估的尺度，而不仅是顺序。(c) 极小化极大只用 $\max$ 与 $\min$，它们与任何严格递增函数 $\phi$ 可交换：$\max(\phi(x), \phi(y)) = \phi(\max(x, y))$。于是对叶子的任何单调变换，所选着法不变。而平均与非线性的 $\phi$ 不可交换。所以在机会博弈中，评估函数必须是期望效用的正的*线性*变换（例如获胜的概率）。
:::
:::

::: exercise 手算 UCB1 {level=2 check="2"}
一个老虎机的三个臂在 $N = 20$ 次后的统计：臂 1 玩了 $10$ 次，总回报 $6$；臂 2 玩了 $4$ 次，总回报 $2$；臂 3 玩了 $6$ 次，总回报 $4$。取 $c = \sqrt 2$ 的 UCB1 接下来打哪个臂？（输入臂号。）
::: solution
$\ln 20 \approx 2.996$，奖励为 $\sqrt{2 \cdot 2.996/N_i} = \sqrt{5.991/N_i}$。臂 1：$0.6 + \sqrt{0.599} = 0.6 + 0.774 = 1.374$。臂 2：$0.5 + \sqrt{1.498} = 0.5 + 1.224 = 1.724$。臂 3：$0.667 + \sqrt{0.999} = 0.667 + 0.999 = 1.666$。臂 2 的置信上界最高，尽管它的平均回报最低：它被试得最少。
:::
:::

::: exercise 负极大形式的 α–β {level=2}
零和博弈中 $\min(x, y) = -\max(-x, -y)$，所以若价值总从走方的视角取值，两家玩家可以同等对待。把 α–β 写成这种**负极大**形式，并说明递归进入子结点时窗口发生了什么。
::: solution
设 $\mathrm{Utility}_p(s)$ 为 $s$ 处走方的效用。

```python
def negamax(s, alpha, beta):
    """对走方而言 s 的值；alpha < beta 是该走方的窗口。"""
    if is_terminal(s):
        return utility_for_player_to_move(s)
    v = -math.inf
    for c in successors(s):
        v = max(v, -negamax(c, -beta, -alpha))   # 孩子的值取负即得我们的值
        if v >= beta:
            return v                              # 截断：对手会避开 s
        alpha = max(alpha, v)
    return v
```

子结点对它那方的价值是我们这一方价值的相反数，所以我们的窗口 $(\alpha, \beta)$ 对子结点变为 $(-\beta, -\alpha)$：我们已经确保的（$\alpha$）变成对手的上限，反之亦然。单个截断检验 $v \ge \beta$ 起了 [[#alg-alphabeta]] 两个截断的作用。几乎所有博弈程序都这样写。
:::
:::

::: exercise 奇数深度的最好情形 {level=3}
(a) 对 $b = 2$、$d = 3$ 手工验证 [[#thm-knuth-moore]]：画一棵排序完美的树，标出考察的 $L(2, 3) = 2^2 + 2^1 - 1 = 5$ 个叶子。(b) 证明正则树的 MAX 策略子树与 MIN 策略子树总是恰好相交于一个叶子，并推出没有算法能用少于 $L(b, d)$ 个叶子认证根的值。
::: solution
(a) 取 MAX 根 $r$，MIN 子结点 $u_1, u_2$；每个 $u_i$ 有 MAX 子结点 $w_{i1}, w_{i2}$；每个 $w_{ij}$ 有两个叶子。排序完美是指：$u_1$ 是 $r$ 的较好孩子；每个 MIN 结点处值较低的孩子在前；每个 MAX 结点 $w$ 处较大的叶子在前。$w_{11}$ 以窗口 $(-\infty, \infty)$ 被搜索，两个叶子都要看（主要变例上的结点必须确立精确值）：$2$ 个叶子。在 $u_1$ 处，第二个孩子 $w_{12}$ 以窗口 $(-\infty, \beta)$ 搜索，$\beta = \mathrm{val}(w_{11})$；它的第一个叶子就是它的值，该值至少 $\beta$，因为 $w_{11}$ 是 $u_1$ 的较好（较低）孩子，所以引起截断：$1$ 个叶子。于是 $u_1$ 花费 $3$ 个叶子，并在根处确立 $\alpha = \mathrm{val}(u_1)$。在 $u_2$ 处，窗口是 $(\alpha, \infty)$，第一个孩子 $w_{21}$ 的值 $\mathrm{val}(u_2) \le \alpha$；它是 $\beta = \infty$ 的 MAX 结点，不可能截断，所以它的两个叶子都要看，此后 $u_2$ 的运行值 $\le \alpha$，$u_2$ 被截断而无需看 $w_{22}$：$2$ 个叶子。共 $2 + 1 + 2 = 5$。

(b) MAX 策略子树中每个 MAX 结点一个孩子、每个 MIN 结点全部孩子；MIN 策略子树反之。同属两者的叶子所在的根到叶路径，在每个 MAX 结点处必须跟随 MAX 子树的唯一孩子（它在 MAX 子树里，而那里只有那个孩子），在每个 MIN 结点处必须跟随 MIN 子树的唯一孩子。这唯一地确定了这条路径，而这条路径在两个子树中确实都存在（每个子树在另一个只有一个孩子的结点处拥有全部孩子）。所以交集恰为一个叶子。由 [[#thm-knuth-moore]] 证明中的对手论证，认证的算法必须考察某棵 MAX 策略子树与某棵 MIN 策略子树的全部叶子；并集有 $b^{\lfloor d/2\rfloor} + b^{\lceil d/2\rceil} - 1$ 个叶子。
:::
:::

::: exercise 一种基于模拟对局的评估 {level=3}
(a) [[#ex-uct]] 中和棋着法的平均回报停在 $0.55$–$0.6$ 附近，高于和棋的值 $0.5$。解释为什么随机模拟对局会高估那些局面中 X 的机会，而获胜着法的估计却仍收敛到 $1$。(b) 修改程序，对每个根着法统计*纯*随机模拟对局（不用树）中 X 获胜的比例，每个着法 $10{,}000$ 次、固定种子。"选随机模拟平均值最好的着法"在这里会选对吗？
::: solution
(a) 在和棋局面中，O 只有找到特定的防守着法才能守住和局；随机的 O 常常做不到，所以从这些局面出发的随机模拟对局中 X 的获胜频率高于最优对局所允许的水平。不过在 UCT 树内部，靠近根的结点被扩展，O 在那里的应手从 O 的视角按 UCB1 选择，所以对 UCT 深入探索的那个着法，树策略逼近极小化极大对局，估计趋于真实值。很少被访问的着法只有浅树，其估计被随机模拟对局主导。

(b) 一种做法：

```python
import random
from ttt import utility, children

def playout_mean(board, n, rng):
    total = 0
    for _ in range(n):
        b = board
        while utility(b) is None:
            b = rng.choice(children(b))
        total += (1 + utility(b)) / 2        # X 的回报，在 [0, 1] 内
    return total / n

rng = random.Random(0)
start = "XOX" "..." "..O"
for b in children(start):
    square = next(i for i in range(9) if b[i] != start[i])
    print(square, round(playout_mean(b, 10_000, rng), 3))
```

```console
$ python3 flat.py
3 0.59
4 0.668
5 0.419
6 0.83
7 0.666
```

这里平面的蒙特卡洛确实把获胜的 6 号格排在第一。但请注意和棋着法 $4$ 与 $7$ 得 $0.67$，明显高于和棋着法 $3$（$0.59$），而且这个排名是随机对手的产物：在唯一的好着法要求精确后续的局面里，平面蒙特卡洛可能偏好一个赢随机对局、却输给高手的着法。UCT 纠正了这一点，因为它深入搜索之处的树策略变得像极小化极大。
:::
:::
