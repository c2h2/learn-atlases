假设我们要接受**从末尾数第三个符号**是 $1$ 的二进制串。从左到右读的确定自动机不知道末尾在哪里，所以它必须时刻记住最后三个符号——八种可能，而且我们将证明，八个状态确实少不了。但把这门语言讲给一个人听只需一句话："某处有一个 $1$，其后恰有两个符号"。若机器能**猜**到它到达了那个 $1$，然后只需检验后面恰有两个符号，那么四个状态就够了。

**非确定**自动机允许这样的猜测。每一步它可能有若干种走法，也可能一种都没有；只要**某个**选择序列通向接受状态，它就接受。这听起来像作弊——现实机器不会猜——但它是计算理论中最有成果的思想之一。非确定自动机常常比确定的小得多、也好设计得多；它们使正则语言对连接和星的封闭性几乎显然；而且它们总能被确定地模拟——记住机器**可能**处于的全部状态。这种模拟，**子集构造法**，就是本章的主定理。它的代价——状态数可能指数增长——是贯穿整个主题的第一个例子：非确定性买到了什么？对有限自动机，答案是"简洁而不增加能力"；对多项式时间的图灵机，它就是 [[complexity]] 中的 $\mathsf{P}$ 对 $\mathsf{NP}$ 问题。

## 非确定有限自动机

NFA 与 DFA 有两点不同。从一个状态、在一个符号上，它可以进入**某个**状态集（可以为空）中的任何状态。而且它可能有 **$\varepsilon$-转移**：不读任何输入就能走的转移。我们记 $\Sigma_\varepsilon = \Sigma \cup \{\varepsilon\}$，并用 $\mathcal{P}(Q)$ 表示 $Q$ 的幂集，即其全部子集的集合。

::: definition 非确定有限自动机 {#def-nfa}
一个**非确定有限自动机**（NFA）是一个 5 元组 $N = (Q, \Sigma, \delta, q_0, F)$，其中 $Q$、$\Sigma$、$q_0$ 与 $F$ 与 DFA 的相同，而转移函数是

$$
\delta\colon Q \times \Sigma_\varepsilon \to \mathcal{P}(Q).
$$

$N$ **接受** $w \in \Sigma^*$，若可把 $w$ 写成 $w = y_1 y_2 \cdots y_m$，每个 $y_i \in \Sigma_\varepsilon$，且存在状态 $r_0, r_1, \dots, r_m$ 使得

1. $r_0 = q_0$；
2. 对 $i = 1, \dots, m$ 有 $r_{i} \in \delta(r_{i-1}, y_i)$；
3. $r_m \in F$。

序列 $r_0, \dots, r_m$ 是一条**接受运行**（或接受**计算路径**）。$L(N)$ 是 $N$ 接受的串的集合。
:::

每个 DFA 都是伪装成 NFA 的机器：取 $\delta_N(q, a) = \{\delta(q, a)\}$、$\delta_N(q, \varepsilon) = \emptyset$ 即可。有意思的是反方向。

定义有三个值得强调的特点。首先，接受是**存在性的**：只要**至少一个**运行接受，$w$ 就被接受，不管有多少其他运行拒绝或卡死。其次，运行可以**死亡**：若 $\delta(r, a) = \emptyset$，则无路可走，该运行便不接受地终结。第三，$\varepsilon$-转移让机器能在符号之间改变状态，因此同一个串可以有长度 $m \ge \lvert w\rvert$ 不等的运行。

有两个理解计算的好图像。在**猜测**图像中，机器是一个幸运猜手：只要存在正确的选择，它总能猜对。在**并行**图像中，机器在每个分叉处分裂成若干份，各份同时运行，无路可走的一份消失，只要结束时有一份处于接受状态就接受输入。并行图像正是通向模拟的那一个：我们只需记住被某一份占据的状态的**集合**。

::: example 从末尾数第三个符号 {#ex-third}
给出 $L_3 = \{w \in \{0,1\}^* : \lvert w\rvert \ge 3 \text{ 且 } w \text{ 从末尾数第三个符号是 } 1\}$ 的一个 NFA，并找出它在 $0110$ 上的全部运行。
::: solution
状态 $0, 1, 2, 3$；开始 $0$；$F = \{3\}$。状态 $0$ 在两个符号上自环（"还不是"）；读 $1$ 时它还可以跳到状态 $1$（"就是它"）；状态 $1 \to 2 \to 3$ 在任意符号上前进，数剩下两个符号；状态 $3$ 无路可走：

| 状态 | 读 $0$ | 读 $1$ |
|---|---|---|
| $\to 0$ | $\{0\}$ | $\{0, 1\}$ |
| $1$ | $\{2\}$ | $\{2\}$ |
| $2$ | $\{3\}$ | $\{3\}$ |
| $3$（接受） | $\emptyset$ | $\emptyset$ |

在 $0110$ 上，每个运行都以 $0 \xrightarrow{0} 0$ 开始。在第一个 $1$（位置 $2$）处，运行可留在 $0$ 或跳到 $1$；跳得到 $0, 0, 1, 2, 3$，读完全部四个符号并停在 $3$：**接受**。在第二个 $1$（位置 $3$）跳得到 $0, 0, 0, 1, 2$：拒绝（停在 $2$）。从不跳得 $0,0,0,0,0$：拒绝。任何在结束前到达 $3$ 的运行都会死亡。一个接受运行已经足够，故 $0110 \in L(N)$，理所应当：它从末尾数的第三个符号正是位置 $2$ 的那个 $1$。
:::
:::

::: widget graph
nodes: q0@0,0; q1@2,0; q2@4,0; q3@6,0
edges: q0>q0:0; q0>q0:1; q0>q1:1; q1>q2:0; q1>q2:1; q2>q3:0; q2>q3:1
algorithm: none
caption: [[#ex-third]] 的四状态 NFA——$q_3$ 接受。离开 $q_0$ 的两条标记为 $1$ 的箭头正是非确定的选择：留下，或猜这个 $1$ 就是从末尾数第三个符号。沿所有可能的路径跟随输入 $0110$，确认恰有一条在最后一个符号后停在 $q_3$。与下面由它构造的八状态 DFA 比较。
:::

### $\varepsilon$-闭包

要系统地处理 $\varepsilon$-转移，我们需要"免费"可达的状态。

::: definition $\varepsilon$-闭包 {#def-eclosure}
对 NFA 的状态集 $S \subseteq Q$，其 **$\varepsilon$-闭包** $E(S)$ 是从 $S$ 的某个状态出发、沿零条或多条 $\varepsilon$-箭头可达的状态的集合。对集合 $S$ 与符号 $a \in \Sigma$，令

$$
\Delta(S, a) = E\Bigl(\,\bigcup_{q \in S} \delta(q, a)\Bigr),
$$

即从 $S$ 出发走一步 $a$-转移、再走任意多条 $\varepsilon$-转移可达的状态。
:::

$E(S)$ 可由从 $S$ 出发只沿 $\varepsilon$-箭头的图搜索求出，时间与状态数和 $\varepsilon$-箭头数之和成线性。注意 $S \subseteq E(S)$（零条转移）且 $E(E(S)) = E(S)$。

::: example 能被 2 或被 3 整除 {#ex-two-three}
在单字母字母表 $\{0\}$ 上，语言 $\{0^k : 2 \mid k \text{ 或 } 3 \mid k\}$ 是两个圈的并。为它造一个带 $\varepsilon$-转移的 NFA，并计算读入 $0^k$（$k = 0, \dots, 6$）之后可达的状态集。
::: solution
新的开始状态 $s$ 有 $\varepsilon$-转移通向 $a_0$ 与 $b_0$；$a_0 \to a_1 \to a_0$ 是 $2$-圈，$b_0 \to b_1 \to b_2 \to b_0$ 是在 $0$ 上的 $3$-圈；$F = \{a_0, b_0\}$。各运行集为：

| $k$ | 读完 $0^k$ 后的状态 | 接受？ |
|---|---|---|
| $0$ | $E(\{s\}) = \{s, a_0, b_0\}$ | 是 |
| $1$ | $\{a_1, b_1\}$ | 否 |
| $2$ | $\{a_0, b_2\}$ | 是 |
| $3$ | $\{a_1, b_0\}$ | 是 |
| $4$ | $\{a_0, b_1\}$ | 是 |
| $5$ | $\{a_1, b_2\}$ | 否 |
| $6$ | $\{a_0, b_0\}$ | 是 |

此后图形以周期 $6$ 重复。这台机器在开始时用 $\varepsilon$-转移**猜**它要检验两个条件中的哪一个，而状态集同时追踪两个猜测。
:::
:::

## 模拟 NFA

并行图像直接给出一个算法。记住某个运行可能处于的状态集 $S$；从 $S = E(\{q_0\})$ 开始；每读一个符号 $a$ 就把 $S$ 换成 $\Delta(S, a)$；最后接受当且仅当 $S \cap F \ne \emptyset$。

```python
EPS = ""                                     # ε-转移的标记

def closure(delta, states):
    """All states reachable from `states` by epsilon-moves alone."""
    stack, seen = list(states), set(states)
    while stack:
        q = stack.pop()
        for r in delta.get((q, EPS), ()):
            if r not in seen:
                seen.add(r)
                stack.append(r)
    return frozenset(seen)

def step(delta, states, a):
    moved = {r for q in states for r in delta.get((q, a), ())}
    return closure(delta, moved)

def accepts(delta, start, accept, w):
    current = closure(delta, {start})
    print(f"start   {sorted(current)}")
    for a in w:
        current = step(delta, current, a)
        print(f"read {a}  {sorted(current)}")
    return bool(current & accept)

# 从末尾数第三个符号是 1：猜位置，再数 2 个
N3 = {(0, "0"): {0}, (0, "1"): {0, 1},
      (1, "0"): {2}, (1, "1"): {2},
      (2, "0"): {3}, (2, "1"): {3}}
if __name__ == "__main__":
    print(accepts(N3, 0, {3}, "0110"))
```

```console
$ python3 nfa.py
start   [0]
read 0  [0]
read 1  [0, 1]
read 1  [0, 1, 2]
read 0  [0, 2, 3]
True
```

转移函数是从（状态，符号）到状态集的字典；缺键视为 $\emptyset$。每一步触碰当前集合中的每个状态和离开它的每条箭头，所以长 $n$ 的输入在 $O(n \cdot (\lvert Q\rvert + m))$ 时间处理完毕，其中 $m$ 是箭头数——比 DFA 的 $\Theta(n)$ 慢，但是多项式的，且无需预先构造任何东西。

这一模拟的正确性是下一个定理的核心。记 $R(w)$ 为这样的状态 $r$ 的集合：$N$ 在 $w$ 上的某个运行结束于 $r$——即 $w = y_1 \cdots y_m$，$y_i \in \Sigma_\varepsilon$，且有 $q_0 = r_0, r_1, \dots, r_m = r$ 满足 $r_i \in \delta(r_{i-1}, y_i)$。按定义，$N$ 接受 $w$ 当且仅当 $R(w) \cap F \ne \emptyset$。

::: lemma 可达集 {#lem-reach}
对每个 NFA，$R(\varepsilon) = E(\{q_0\})$，且对所有 $w \in \Sigma^*$、$a \in \Sigma$ 有 $R(wa) = \Delta(R(w), a)$。
:::

::: proof
在 $\varepsilon$ 上的运行只用 $\varepsilon$-转移，故其可能的终止状态恰为 $E(\{q_0\})$。

现在考察 $wa$ 上的运行，设 $wa = y_1 \cdots y_m$。设 $j$ 是最后一个取符号而非 $\varepsilon$ 的片段的下标（这样的下标存在，因为 $wa \ne \varepsilon$），于是 $y_1 \cdots y_{j-1}$ 拼出 $w$，$y_j = a$，而 $y_{j+1}, \dots, y_m$ 全是 $\varepsilon$。则 $r_{j-1} \in R(w)$（前 $j - 1$ 步是 $w$ 上的一个运行），$r_j \in \delta(r_{j-1}, a)$，且 $r_m$ 由 $r_j$ 经 $\varepsilon$-转移到达。于是 $r_m \in E\bigl(\bigcup_{q \in R(w)} \delta(q, a)\bigr) = \Delta(R(w), a)$。

反之，若 $r \in \Delta(R(w), a)$，则存在 $p \in R(w)$、$p' \in \delta(p, a)$ 及一条从 $p'$ 到 $r$ 的 $\varepsilon$-转移链。把一个结束于 $p$ 的 $w$ 上的运行、通向 $p'$ 的转移和那条链拼接起来，就得到 $wa$ 上一个结束于 $r$ 的运行。故 $R(wa) = \Delta(R(w), a)$。
:::

## 子集构造法

模拟除了当前集合 $S$ 之外不依赖输入，而集合只有有限多个——共 $2^{\lvert Q\rvert}$ 个。所以这一模拟**就是**一台以 NFA 状态集为状态的 DFA。

::: theorem 子集构造法（Rabin 与 Scott）{#thm-subset}
对每个 NFA $N = (Q, \Sigma, \delta, q_0, F)$，存在至多 $2^{\lvert Q\rvert}$ 个状态的 DFA $D$ 使 $L(D) = L(N)$。从而一个语言正则当且仅当某个 NFA 识别它。
:::

::: proof
定义 $D = (\mathcal{P}(Q), \Sigma, \delta_D, s_0, F_D)$ 为

$$
s_0 = E(\{q_0\}), \qquad \delta_D(S, a) = \Delta(S, a), \qquad F_D = \{ S \subseteq Q : S \cap F \ne \emptyset\}.
$$

$\delta_D$ 是从 $\mathcal{P}(Q) \times \Sigma$ 到 $\mathcal{P}(Q)$ 的全函数，故 $D$ 是有 $2^{\lvert Q\rvert}$ 个状态的 DFA。我们对 $\lvert w\rvert$ 归纳证明：对每个 $w$ 有 $\hat\delta_D(s_0, w) = R(w)$。$w = \varepsilon$ 时：由 [[#lem-reach]]，$\hat\delta_D(s_0, \varepsilon) = s_0 = E(\{q_0\}) = R(\varepsilon)$。$wa$ 时：$\hat\delta_D(s_0, wa) = \delta_D(\hat\delta_D(s_0, w), a) = \Delta(R(w), a) = R(wa)$，用到归纳假设与 [[#lem-reach]]。

于是 $D$ 接受 $w$ 当且仅当 $R(w) \in F_D$，当且仅当 $R(w) \cap F \ne \emptyset$，当且仅当 $N$ 接受 $w$。又因每个 DFA 都是 NFA，两个模型识别同一个语言类。
:::

实践中我们从不造出全部 $2^{\lvert Q\rvert}$ 个子集：从 $s_0$ 出发，只加入可达的那些子集，与图搜索完全一样。许多构造、以及大多数由正则表达式产生的 NFA，其可达子集远少于最坏情形。

::: algorithm 子集构造法：可达部分 {#alg-subset}
1. 令 $s_0 \gets E(\{q_0\})$；把 $s_0$ 放入工作表；表为空。
2. 当工作表非空：
   1. 取出一个集合 $S$。若 $S$ 在表中已有行，继续。
   2. 对每个 $a \in \Sigma$，计算 $T \gets \Delta(S, a)$，记录 $\delta_D(S, a) = T$，并把 $T$ 加入工作表。
3. DFA 的状态就是表的各行；其接受状态是那些满足 $S \cap F \ne \emptyset$ 的 $S$。
:::

```python
from nfa import closure, step, N3

def subset_construction(delta, start, accept, sigma):
    """Return the reachable part of the subset DFA as (table, start, finals)."""
    s0 = closure(delta, {start})
    table, todo = {}, [s0]
    while todo:
        S = todo.pop()
        if S in table:
            continue
        table[S] = {a: step(delta, S, a) for a in sigma}
        todo.extend(table[S].values())
    finals = {S for S in table if S & accept}
    return table, s0, finals

table, s0, finals = subset_construction(N3, 0, {3}, "01")
name = lambda S: "{" + ",".join(map(str, sorted(S))) + "}"
for S in sorted(table, key=lambda S: (len(S), sorted(S))):
    mark = "*" if S in finals else " "
    print(f"{mark} {name(S):10} 0 -> {name(table[S]['0']):10} 1 -> {name(table[S]['1'])}")
print(len(table), "reachable subsets of", 2 ** 4)
```

```console
$ python3 subset.py
  {0}        0 -> {0}        1 -> {0,1}
  {0,1}      0 -> {0,2}      1 -> {0,1,2}
  {0,2}      0 -> {0,3}      1 -> {0,1,3}
* {0,3}      0 -> {0}        1 -> {0,1}
  {0,1,2}    0 -> {0,2,3}    1 -> {0,1,2,3}
* {0,1,3}    0 -> {0,2}      1 -> {0,1,2}
* {0,2,3}    0 -> {0,3}      1 -> {0,1,3}
* {0,1,2,3}  0 -> {0,2,3}    1 -> {0,1,2,3}
8 reachable subsets of 16
```

::: example 读懂子集 DFA {#ex-subset-read}
解释刚才为 $L_3$ 算出的 DFA 的八个状态，并说明为什么 $\{0,1,2,3\}$ 的另外八个子集不可达。
::: solution
状态 $0$ 属于每个集合，因为 NFA 总能留在 $0$。此外，$1 \in S$ 当且仅当最后读入的符号是 $1$（NFA 在那个符号上跳了），$2 \in S$ 当且仅当倒数第二个符号是 $1$，$3 \in S$ 当且仅当倒数第三个是 $1$。所以集合 $S$ 恰好编码最后三个符号——$\{0, 2, 3\}$ 意为"最后三个符号是 $1, 1, 0$"——而它接受当且仅当 $3 \in S$，即当且仅当从末尾数第三个符号是 $1$。不含 $0$ 的八个子集从不出现，因为 $0$ 属于 $s_0$ 且 NFA 总能留在 $0$。子集构造法重新发现了"记住最后三个符号"的 DFA。
:::
:::

::: widget graph
nodes: 0@0,0; 01@2,0; 02@4,1.2; 012@4,-1.2; 03@6,1.2; 013@6,-1.2; 023@8,1.2; 0123@8,-1.2
edges: 0>0:0; 0>01:1; 01>02:0; 01>012:1; 02>03:0; 02>013:1; 03>0:0; 03>01:1; 012>023:0; 012>0123:1; 013>02:0; 013>012:1; 023>03:0; 023>013:1; 0123>023:0; 0123>0123:1
algorithm: bfs
start: 0
caption: 由 $L_3$ 的四状态 NFA 经子集构造得到的 DFA。顶点 $013$ 代表集合 $\{0, 1, 3\}$；接受状态是含 $3$ 的四个集合。从 $\{0\}$ 出发逐步演示广度优先搜索：它发现状态的方式与 [[#alg-subset]] 相同，并找出全部八个可达子集。每个状态对每个符号恰有一条箭头——非确定性已被吸收进集合。
:::

### 指数膨胀是真实的

$2^{\lvert Q\rvert}$ 究竟是构造的弱点，还是语言的事实？对 $L_3$ 答案是后者，且论证可以推广。

::: theorem 非确定性的简洁性 {#thm-blowup}
对 $k \ge 1$，设 $L_k$ 是 $\{0,1\}$ 上从末尾数第 $k$ 个符号是 $1$ 的串的集合。则 $L_k$ 可被 $k + 1$ 个状态的 NFA 识别，但识别 $L_k$ 的每个 DFA 至少有 $2^k$ 个状态。
:::

::: proof
NFA 是 [[#ex-third]] 的显然推广：状态 $0$ 在两个符号上自环，且读 $1$ 时还可进入状态 $1$；对 $1 \le i < k$，状态 $i \to i+1$ 在两个符号上；$F = \{k\}$。接受运行必须在某个 $1$ 处跳，然后恰好再读 $k - 1$ 个符号，故它恰好接受 $L_k$。

现在设 $D = (Q, \{0,1\}, \delta, q_0, F)$ 是 $L_k$ 的任意 DFA。我们证明 $2^k$ 个长度为 $k$ 的串把 $D$ 引到 $2^k$ 个不同状态。取两个不同的长 $k$ 串 $x \ne y$，设 $i$ 是二者不同的一个位置——设 $x_i = 1$ 而 $y_i = 0$。令 $z = 0^{i-1}$。在长为 $k + i - 1$ 的 $xz$ 中，从末尾数第 $k$ 个符号位于位置 $i$，即 $x_i = 1$；故 $xz \in L_k$。同理 $yz \notin L_k$。若 $\hat\delta(q_0, x) = \hat\delta(q_0, y)$，则由 [[theory-of-computation/finite-automata#lem-compose]] 有 $\hat\delta(q_0, xz) = \hat\delta(\hat\delta(q_0, x), z) = \hat\delta(\hat\delta(q_0, y), z) = \hat\delta(q_0, yz)$，于是 $D$ 会同时接受或同时拒绝二者——矛盾。故 $2^k$ 个串到达互不相同的状态，$\lvert Q\rvert \ge 2^k$。
:::

这一论证——找到许多必须通向不同状态的前缀，因为存在某个后续串能把它们区分开——就是**区分串**方法。它在 [[theory-of-computation/non-regular-languages]]（Myhill–Nerode 定理）中被严格化，那里还用它的证明某些语言需要**无穷**多个状态。

::: quiz
一个 NFA 有 $5$ 个状态。哪些命题必定为真？
- [x] 存在等价的、至多 $32$ 个状态的 DFA。
- [ ] 存在等价的、至多 $5$ 个状态的 DFA。
- [x] 它的语言是正则的。
- [ ] 交换接受与非接受状态后的 NFA 识别它的补。
::: solution
子集构造给出至多 $2^5 = 32$ 个状态，且该语言正则。$5$ 个状态的 DFA 未必存在：[[#thm-blowup]] 取 $k = 4$ 就给出一个 $5$ 状态 NFA，它的 DFA 需要 $16$ 个状态。交换 NFA 的接受状态一般不能得到补语言：一个既有一个接受运行又有一个拒绝运行的串会被两台机器都接受。（对 [[#ex-third]] 的 NFA，交换后状态 $0, 1, 2$ 接受，而由于每个串都有一个始终留在 $0$ 的运行，交换后的机器接受**一切**串。）
:::
:::

::: warning 非确定既不是随机也不是并行硬件
非确定自动机不掷硬币：接受由接受运行的**存在性**定义，而非由找到它的概率定义。它也不是固定处理器数的并行计算机：并行图像中"份"的数目可以多到状态数，而在 [[complexity]] 的图灵机情形更可以随输入指数增长。非确定性是一种**简洁地**指定语言的数学装置；要运行 NFA 你必须模拟它——像上文那样用状态集，或对选择回溯——而回溯可能需要指数时间，这正是 [[theory-of-computation/regular-expressions]] 中正则表达式匹配慢的根源。
:::

## 对正则运算的封闭性

有了 NFA，那些对 DFA 别扭的封闭性变得容易了。我们造用 $\varepsilon$-转移把机器粘在一起的 NFA。每种情形下，设 $N_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ 与 $N_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ 分别识别 $A_1$ 与 $A_2$，且 $Q_1 \cap Q_2 = \emptyset$（必要时给状态改名）。

::: theorem 对并封闭 {#thm-nfa-union}
$A_1 \cup A_2$ 正则。
:::

::: proof
添加新的开始状态 $q_0$，令 $\delta(q_0, \varepsilon) = \{q_1, q_2\}$；保留 $N_1$ 与 $N_2$ 的全部转移；令 $F = F_1 \cup F_2$。新机器的每个运行都以一条 $\varepsilon$-转移进入 $q_1$ 或 $q_2$ 开始，之后按 $N_1$ 或 $N_2$ 的运行继续，因为 $Q_1$ 与 $Q_2$ 之间没有箭头，也没有回到 $q_0$ 的箭头。于是它在 $w$ 上有接受运行当且仅当 $N_1$ 或 $N_2$ 有。
:::

与乘积构造相比，这个 NFA 有 $\lvert Q_1\rvert + \lvert Q_2\rvert + 1$ 个状态而不是 $\lvert Q_1\rvert \cdot \lvert Q_2\rvert$ 个；[[#ex-two-three]] 就是一个实例。

::: theorem 对连接封闭 {#thm-nfa-concat}
$A_1 A_2 = \{xy : x \in A_1, y \in A_2\}$ 正则。
:::

::: proof
保留两台机器；开始状态是 $q_1$，接受状态是 $F_2$；从每个 $f \in F_1$ 向 $q_2$ 加一条 $\varepsilon$-转移。若 $w = xy$，$x \in A_1$、$y \in A_2$，则 $N_1$ 在 $x$ 上的一个接受运行结束于某个 $f \in F_1$；沿新加的 $\varepsilon$-转移到 $q_2$，再接 $N_2$ 在 $y$ 上的一个接受运行。反之，任何接受运行都始于 $Q_1$ 而终于 $F_2 \subseteq Q_2$；从 $Q_1$ 进入 $Q_2$ 的箭头只有新加的 $\varepsilon$-转移，且没有返回的箭头，故运行恰好穿过一次，从某个 $f \in F_1$ 到 $q_2$。穿过之前的部分是 $N_1$ 在 $w$ 的某个前缀 $x$ 上的接受运行，之后的部分是 $N_2$ 在剩余部分 $y$ 上的接受运行。于是 $w = xy \in A_1A_2$。
:::

NFA **猜** $x$ 在哪里结束、$y$ 从哪里开始。$A_1 A_2$ 的 DFA 则必须同时追踪所有可能的切分点——而这正是子集构造法替我们自动做的事。

::: theorem 对星封闭 {#thm-nfa-star}
$A_1^*$ 正则。
:::

::: proof
添加一个**新的**开始状态 $q_0$，它也是接受状态，令 $\delta(q_0, \varepsilon) = \{q_1\}$；保留 $N_1$ 的转移；从每个 $f \in F_1$ 加一条 $\varepsilon$-转移回到 $q_1$；令 $F = F_1 \cup \{q_0\}$。

若 $w \in A_1^*$，则或者 $w = \varepsilon$，在 $q_0$ 接受；或者 $w = x_1 \cdots x_k$，$k \ge 1$，每个 $x_i \in A_1$：从 $q_0$ 到 $q_1$，在 $x_1$ 上运行 $N_1$ 到某个接受状态，跳回 $q_1$，在 $x_2$ 上运行，如此下去，停在 $F_1$。反之，考察 $w$ 的一个接受运行。若它从不离开 $q_0$，则 $w = \varepsilon$（没有箭头进入 $q_0$，而 $q_0$ 只有一条 $\varepsilon$-转移出）。否则它进入 $q_1$ 并停在 $F_1$；在每次使用新加的 $\varepsilon$-转移 $f \to q_1$ 处把它剪开。每一段都只用 $N_1$ 的转移从 $q_1$ 走到 $F_1$ 中一个状态，故它是 $N_1$ 在某个 $x_i \in A_1$ 上的接受运行，于是 $w = x_1 \cdots x_k \in A_1^*$。
:::

::: warning 为什么星构造需要新的开始状态
一个诱人的捷径是不加 $q_0$ 而把原来的开始状态 $q_1$ 设为接受。这确实接受了 $\varepsilon$——但它还接受了任何**返回** $q_1$ 而不经过 $F_1$ 的串，而那未必属于 $A_1^*$。例如，设 $N_1$ 有状态 $q_1, p$，转移 $q_1 \xrightarrow{a} p$、$p \xrightarrow{b} q_1$，$F_1 = \{p\}$，于是 $A_1 = a(ba)^*$。把 $q_1$ 设为接受（并加 $p \xrightarrow{\varepsilon} q_1$）就接受 $ab$，但 $ab \notin A_1^*$，因为 $A_1^*$ 的每个串要么为空、要么以 $a$ 结尾。新的开始状态没有入箭头，所以把它设为接受只增加了 $\varepsilon$。
:::

::: example 星构造的演练 {#ex-star}
设 $A = \{1, 01\}$，由如下 NFA 识别：状态 $p_0$（开始）、$p_1$、$p_2$（接受），转移 $p_0 \xrightarrow{1} p_2$、$p_0 \xrightarrow{0} p_1$、$p_1 \xrightarrow{1} p_2$。为 $A^*$ 造出 [[#thm-nfa-star]] 的 NFA，并在 $1011$ 与 $100$ 上模拟它。
::: solution
添加新的接受开始状态 $q_0$，带 $q_0 \xrightarrow{\varepsilon} p_0$，再加一条 $\varepsilon$-转移 $p_2 \xrightarrow{\varepsilon} p_0$；接受集为 $\{q_0, p_2\}$。各状态集为：

| 已读输入 | 状态集 | 接受？ |
|---|---|---|
| $\varepsilon$ | $E(\{q_0\}) = \{q_0, p_0\}$ | 是 |
| $1$ | $E(\{p_2\}) = \{p_2, p_0\}$ | 是 |
| $10$ | $\{p_1\}$ | 否 |
| $101$ | $\{p_2, p_0\}$ | 是 |
| $1011$ | $\{p_2, p_0\}$ | 是 |

于是 $1011 = 1 \cdot 01 \cdot 1$ 被接受。在 $100$ 上，读完 $10$ 后的集合是 $\{p_1\}$，而 $p_1$ 在 $0$ 上无转移，于是集合变成 $\emptyset$ 并保持为空：拒绝，正确，因为 $A^*$ 中每个 $0$ 后都跟着一个 $1$。一旦状态集为空，任何后续都无法被接受——$\emptyset$ 就是子集 DFA 的死状态。
:::
:::

连同 [[theory-of-computation/finite-automata#thm-union-intersection]] 中对补和交的封闭性，我们现在知道正则语言对一切布尔运算、连接、星以及逆（用上一章习题中的"箭头反转"构造）都封闭。下一章这三个 NFA 构造将变成一个把任意正则表达式变成自动机的算法。

::: quiz
$N$ 识别 $A$。在为 $AA$ 造的连接构造中我们需要 $N$ 的两个不交副本。若只用一个副本——从 $F$ 向 $q_0$ 加 $\varepsilon$-转移并保持 $F$ 为接受集——会出什么问题？
- [ ] 没有问题：结果识别 $AA$。
- [x] 结果识别 $A^+ = AA^*$，它可能比 $AA$ 大。
- [ ] 结果只识别 $A$。
::: solution
只用一个副本时，运行可以绕回 $q_0$ 任意多次，于是机器接受 $A$ 中一个或多个串的一切连接（这样的串都以 $F$ 中的运行结尾，而绕回允许更多的块）。那就是 $A^+$。只对特殊的 $A$ 它才与 $AA$ 重合；对 $A = \{a\}$，它接受 $a, aa, aaa, \dots$，而不只是 $aa$。
:::
:::

## 实践中

确定与非确定的模拟都在真实工具中使用，而选择是一次时间—空间折中。预先建好的 DFA 每个符号一次查表、$\Theta(n)$ 时间处理输入，但构造可能耗时指数。逐集合地模拟 NFA，对具有 $O(\lvert Q \rvert)$ 条箭头的 NFA（由正则表达式产生的就是这样）耗时 $O(n \cdot \lvert Q\rvert)$，且无需任何预计算。**惰性确定化**兼取两者：运行逐集合模拟，但缓存每个 DFA 状态、第一次算出转移就记下，于是常访问的集合只花一次查表，而只有可达的集合会被造出。截至 2026 年，保证线性时间的正则表达式引擎——如 RE2 与 Rust 的 `regex` crate——正是这样工作的，缓存设内存上限，缓存抖动时退回朴素的 NFA 模拟。

相比之下，词法分析器生成器在构建时完整运行子集构造并随后最小化结果（[[theory-of-computation/non-regular-languages]]），因为同一个单词符号 DFA 将在编译器读过的每个程序上运行。

::: history
迈克尔·拉宾（Michael Rabin）与达纳·斯科特（Dana Scott）在 "Finite automata and their decision problems"（1959）中引入了非确定有限自动机，证明了子集构造法，并由此证明非确定性不给有限自动机增加能力；该文还研究双向与带多磁带的自动机以及各种判定问题，二人因此获 1976 年图灵奖。说明 $2^n$ 界一般不能改进的例子是坊间常识（folklore）；其变体见于 Albert Meyer 与 Michael Fischer 关于自动机与文法"描述经济性"的工作（1971）以及 Frank Moore（1971）的工作。本文使用的 $\varepsilon$-转移因肯·汤普森（Ken Thompson）1968 年由正则表达式构造 NFA 的方法而成为标准；他在贝尔实验室的 QED 与 `ed` 编辑器中实现了它，直接模拟状态集。
:::

## 后续内容

[[theory-of-computation/regular-expressions]] 用本章的构造把正则表达式变成 NFA（汤普森构造），也把自动机变回正则表达式，从而证明克莱尼定理。在 [[theory-of-computation/pushdown-automata]] 中非确定性是本质性的：与这里不同，非确定下推自动机严格强于确定下推自动机。对图灵机，非确定性同样不增加能力（[[theory-of-computation/turing-machines]]），但它是否增加**速度**——每个能被非确定机器在多项式时间判定的语言能否被确定机器在多项式时间判定——则是 [[complexity]] 中的 $\mathsf{P}$ 对 $\mathsf{NP}$ 问题。

::: summary
- **NFA** 在一个符号上可以有多个转移或没有转移，还有不读输入的 $\varepsilon$-转移；只要**某个**运行停在接受状态就接受（[[#def-nfa]]）。
- 读完 $w$ 后可达的状态集由 $\Delta(S, a) = E\bigl(\bigcup_{q\in S}\delta(q,a)\bigr)$ 更新，从 $E(\{q_0\})$ 出发（[[#lem-reach]]）；对具有 $O(\lvert Q\rvert)$ 条箭头的 NFA 这给出 $O(n\lvert Q\rvert)$ 的模拟。
- **子集构造法**把 $n$ 状态的 NFA 变成至多 $2^n$ 个状态的等价 DFA，故 NFA 恰好识别正则语言（[[#thm-subset]]）。只造可达子集（[[#alg-subset]]）。
- 膨胀可能不可避免："从末尾数第 $k$ 个符号是 $1$"需要 $k + 1$ 个 NFA 状态、却要 $2^k$ 个 DFA 状态（[[#thm-blowup]]），证明方法是**区分串**。
- NFA 用 $\varepsilon$-转移证明对并、连接、星的封闭性（[[#thm-nfa-union]]、[[#thm-nfa-concat]]、[[#thm-nfa-star]]）；星构造需要一个新的接受开始状态。
- 对 NFA 取补，必须先将其确定化。
:::

## 习题

::: exercise NFA 的运行 {level=1}
对 [[#ex-third]] 的 NFA，列出读完 $10100$ 的每个前缀后到达的状态集，并判定该串是否被接受。
::: solution
开始 $\{0\}$。读 $1$：$\{0, 1\}$。读 $0$：$\{0, 2\}$。读 $1$：$\{0, 1, 3\}$。读 $0$：$\{0, 2\}$（状态 $3$ 无路可走，状态 $1$ 到 $2$）。读 $0$：$\{0, 3\}$。最终集合含 $3$，故 $10100$ 被接受；确实，它从末尾数第三个符号是位置 $3$ 的那个 $1$。
:::
:::

::: exercise 数子集状态 {level=1 check="7"}
对 [[#ex-two-three]] 的 $\varepsilon$-NFA（状态 $s, a_0, a_1, b_0, b_1, b_2$）施行子集构造。有多少个可达的 DFA 状态？（输入数字。）
::: solution
可达集合为 $\{s, a_0, b_0\}$（开始），然后 $\{a_1, b_1\}$、$\{a_0, b_2\}$、$\{a_1, b_0\}$、$\{a_0, b_1\}$、$\{a_1, b_2\}$、$\{a_0, b_0\}$，之后下一个集合又是 $\{a_1, b_1\}$。开始集含 $s$ 且再不会进入，故共有 $1 + 6 = 7$ 个可达状态。（由于 $\{s, a_0, b_0\}$ 与 $\{a_0, b_0\}$ 行为完全相同，最小 DFA 有 $6$ 个状态：一个数 $k \bmod 6$ 的圈。）
:::
:::

::: exercise 模式匹配的 NFA {level=1}
给出 $\{a, b\}$ 上 $4$ 个状态的 NFA，识别含 $aba$ 为子串的串，并用它说明为什么 NFA 比 DFA 更容易设计子串检测器。
::: solution
状态 $0, 1, 2, 3$：状态 $0$ 在 $a$ 与 $b$ 上自环；$0 \xrightarrow{a} 1 \xrightarrow{b} 2 \xrightarrow{a} 3$；状态 $3$ 在 $a$ 与 $b$ 上自环；$F = \{3\}$。机器猜出现从哪里开始，然后逐字母检验。DFA 则必须算清"失败"转移（例如，读完 $ab$ 后再读 $b$ 必须退回开始状态，而读完 $a$ 后再读 $a$ 必须留在"后缀为 $a$"的状态，因为新的 $a$ 可能开始一次出现），而这正是子集构造法自动完成的工作。
:::
:::

::: exercise $\varepsilon$-闭包 {level=2}
一个 NFA 有状态 $1$–$5$、$\varepsilon$-转移 $1 \to 2$、$2 \to 3$、$3 \to 1$、$4 \to 5$，以及在 $a$ 上的转移 $1 \xrightarrow{a} 4$、$3 \xrightarrow{a} 5$、$5 \xrightarrow{a} 2$。开始状态 $1$，$F = \{5\}$。计算 $E(\{1\})$、$\Delta(E(\{1\}), a)$，以及 $\Sigma = \{a\}$ 上完整的子集 DFA。它接受哪些串？
::: solution
$E(\{1\}) = \{1, 2, 3\}$（$\varepsilon$-圈）。读 $a$：$\delta(1, a) \cup \delta(2,a) \cup \delta(3,a) = \{4, 5\}$，其闭包为 $\{4, 5\}$。从 $\{4, 5\}$ 读 $a$：$\{2\}$，闭包 $\{1, 2, 3\}$。于是该 DFA 有两个可达状态，$\{1,2,3\} \xrightarrow{a} \{4,5\} \xrightarrow{a} \{1,2,3\}$，其中 $\{4,5\}$ 接受。它接受 $k$ 为奇数的 $a^k$。
:::
:::

::: exercise 运行会死亡的 NFA {level=2}
设 $N$ 是一个转移从不给出多于一个状态、且没有 $\varepsilon$-转移的 NFA（但允许 $\delta(q, a) = \emptyset$）。证明存在至多 $\lvert Q\rvert + 1$ 个状态的等价 DFA，并说明这为什么不与 [[#thm-blowup]] 矛盾。
::: solution
子集构造中每个可达子集至多含一个元素：$\{q_0\}$ 是单点集；$\Delta(\{q\}, a) = \delta(q, a)$ 至多一个元素；而 $\Delta(\emptyset, a) = \emptyset$。所以可达子集恰在 $\lvert Q\rvert$ 个单点集和 $\emptyset$ 之中，至多 $\lvert Q\rvert + 1$ 个状态；$\emptyset$ 是死状态。这样的 $N$ 不过是一个转移函数为部分函数的 DFA。[[#thm-blowup]] 针对的是真正有选择的 NFA——那里状态 $0$ 在 $1$ 上有两个后继——故没有矛盾：膨胀来自含多个元素的集合。
:::
:::

::: exercise 洗牌 {level=2}
两个等长串 $x = a_1 \cdots a_n$ 与 $y = b_1 \cdots b_n$ 的**完美洗牌**是 $a_1 b_1 a_2 b_2 \cdots a_n b_n$。证明：若 $A$ 与 $B$ 正则，则 $\{\text{洗牌}(x, y) : x \in A,\ y \in B,\ \lvert x\rvert = \lvert y\rvert\}$ 也正则。
::: solution
设 $M_A = (Q_A, \Sigma, \delta_A, p_0, F_A)$ 与 $M_B = (Q_B, \Sigma, \delta_B, r_0, F_B)$ 是 DFA。造一个状态为 $Q_A \times Q_B \times \{1, 2\}$ 的 DFA，第三个分量表示轮到谁：$\delta((p, r, 1), a) = (\delta_A(p, a), r, 2)$，$\delta((p, r, 2), a) = (p, \delta_B(r, a), 1)$。开始 $(p_0, r_0, 1)$；接受状态 $F_A \times F_B \times \{1\}$。归纳可知：读完 $a_1 b_1 \cdots a_k b_k$ 后机器处于 $(\hat\delta_A(p_0, a_1\cdots a_k), \hat\delta_B(r_0, b_1 \cdots b_k), 1)$，而读完奇数长度的前缀后处于第三个分量为 $2$ 的状态，那不是接受状态。故它恰好接受等长 $x \in A$、$y \in B$ 的洗牌。（这一题是确定的；当交织方式固定时不需要非确定性。）
:::
:::

::: exercise 取半 {level=3}
对语言 $A$，令 $\tfrac12 A = \{x : xy \in A \text{ 对某个长 } \lvert y\rvert = \lvert x\rvert \text{ 的 } y \text{ 成立}\}$，即 $A$ 中各串的前半部分。证明：若 $A$ 正则，则 $\tfrac12 A$ 也正则。
::: solution
设 $M = (Q, \Sigma, \delta, q_0, F)$ 是 $A$ 的 DFA。我们要在 $M$ 读完 $x$ 到达 $p = \hat\delta(q_0, x)$ 后，若存在**某个**长 $\lvert x\rvert$ 的串 $y$ 能从 $p$ 走到 $F$，就接受 $x$。让 $M$ 在 $x$ 上正向运行，同时"从 $F$ 反向"每读 $x$ 的一个符号退一步：令 $B_0 = F$，$B_{k+1} = \{q : \delta(q, a) \in B_k \text{ 对某个 } a \in \Sigma \text{ 成立}\}$，即存在某个长 $k+1$ 的串能走到 $F$ 的那些状态。这些集合不依赖 $x$，只依赖它的长度。

造一个状态为 $Q \times \mathcal{P}(Q)$ 的 DFA：开始 $(q_0, F)$，且 $\delta'((p, B), a) = (\delta(p, a), \mathrm{pre}(B))$，其中 $\mathrm{pre}(B) = \{q : \exists b \in \Sigma,\ \delta(q, b) \in B\}$。读完长 $k$ 的 $x$ 后它处于 $(\hat\delta(q_0, x), B_k)$。当且仅当 $p \in B$ 时接受。于是 $x$ 被接受当且仅当 $\hat\delta(q_0, x) \in B_{\lvert x\rvert}$，当且仅当某个长 $\lvert x\rvert$ 的 $y$ 从 $\hat\delta(q_0, x)$ 走到 $F$，当且仅当 $x \in \tfrac12 A$。机器有穷，故 $\tfrac12 A$ 正则。
:::
:::

::: exercise 更小的下界族 {level=3 check="16"}
(a) 用 [[#thm-blowup]] 的方法证明 $L_k$ 的每个 DFA 至少有 $2^k$ 个状态，**包括**这些状态每个都可达的要求（于是没有 DFA 能靠在不可达部分耍聪明来省状态）。(b) 证明 $2^k$ 个状态够用。(c) $L_4$ 的最小 DFA 有多少个状态？（输入数字。）
::: solution
(a) [[#thm-blowup]] 的证明指出了 $2^k$ 个串——全部长 $k$ 的串——它们通向两两不同的状态。那些状态按定义都可达（每个都被自己的串到达），所以 $L_k$ 的任何 DFA 至少有 $2^k$ 个可达状态。

(b) 令状态就是长 $k$ 的串，解释为"最后读到的 $k$ 个符号"，较短输入在左侧用 $0$ 补齐：开始状态 $0^k$，$\delta(a_1 a_2 \cdots a_k, b) = a_2 \cdots a_k b$，接受状态为 $a_1 = 1$ 者。补位 $0$ 永不被接受，这是正确的，因为长度小于 $k$ 的串不在 $L_k$ 中。归纳可知读完 $w$ 后的状态是 $0^k w$ 的最后 $k$ 个符号，故该 DFA 接受当且仅当 $0^kw$ 从末尾数第 $k$ 个符号是 $1$，当且仅当 $\lvert w\rvert \ge k$ 且 $w$ 从末尾数第 $k$ 个符号是 $1$。它有 $2^k$ 个状态。

(c) $k = 4$：由 (a) 至少 $2^4$，由 (b) 至多 $2^4$，故恰为 $16$。
:::
:::
