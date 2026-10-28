银行两家分行的两名职员在同一时刻办理转账。职员 1 把 £100 从账户 A 转到账户 B；职员 2 给 A 加上一个月的利息。每个程序都是读出 A、计算、再把 A 写回。若数据库不巧把它们交错开来——两人都把 A 读成 £1000，职员 1 写出 £900，职员 2 写出 £1010——那笔 £100 的取款就凭空消失了。又若服务器在 £100 已离开 A、尚未到达 B 时崩溃，钱以另一种方式消失。凡是同时被多个程序使用、或可能崩溃的数据库，都面临这两个问题：**并发**与**故障**。

答案是**事务**：一列读写操作，系统执行它如同执行一个单一、不可分割的步骤，并与所有其他事务相互隔离。本章把"如同"讲得精确。我们定义调度与**可串行化**，证明冲突可串行化的优先图判别法，证明**两阶段锁**保证可串行化。随后认识实践中的折衷：死锁、幻象、SQL 的**隔离级别**，以及**多版本并发控制**连同**快照隔离**——我们要演示它著名的异常**写偏斜**。故障与恢复是 [[databases/recovery]] 的主题。

## 事务与 ACID

::: definition 事务与 ACID 性质 {#def-acid}
**事务**是一个程序发出的一列数据库操作，以**提交**（其效果应予保留）或**中止**（其效果应予撤销）告终。DBMS 保证：
- **原子性**：事务的全部效果或者都发生，或者都不发生；
- **一致性**：在一致数据库（满足所有完整性约束的数据库）上单独运行的事务，运行后数据库仍一致；
- **隔离性**：并发的事务彼此看不见对方的中间状态——每个事务都如同独自运行（用可串行化来表达）；
- **持久性**：事务一旦提交，其效果就在此后的任何崩溃中幸存下来。
:::

一致性有程序员的一份责任——一笔减 £100 却只加 £90 的转账，符合约束却仍然错误——而 DBMS 强制已声明的约束，并提供其余三条性质。原子性与持久性归恢复管理器负责（[[databases/recovery]]）；隔离性归**并发控制**管理器负责，即本章的主题。在 SQL 中，事务以 `BEGIN` 开始（或由第一条语句隐式开始），以 `COMMIT` 或 `ROLLBACK` 结束。

## 调度与可串行化

为推理并发，我们把事务 $T_i$ 抽象为它对数据库**数据项** $X$（行、页或表）的读 $r_i(X)$ 与写 $w_i(X)$，最后是 $c_i$（提交）或 $a_i$（中止）。程序内部的计算对数据库不可见，可以完全任意地依赖读到的值。

::: definition 调度 {#def-schedule}
事务 $T_1, \dots, T_n$ 的一个**调度**是一个包含它们全部操作的序列，其中每个 $T_i$ 的操作按 $T_i$ 自身的次序出现。若每个事务的操作都连续出现，则调度是**串行的**。若对每个初始数据库状态以及事务执行的每种计算，调度的效果都与同一批事务的某个串行调度相同，则称它是**可串行化的**。
:::

串行调度在假定意义下是正确的（每个事务单独运行时保持一致性），故可串行化的调度也是正确的。但这种一般意义的可串行化难以检验，因为它要对一切计算作量化。实用的概念只看冲突操作的先后。

::: definition 冲突与冲突可串行化 {#def-conflict}
两个操作若属于不同事务、访问同一数据项、且至少有一个是写，则称它们**冲突**。若一个调度能经过反复交换属于不同事务的相邻非冲突操作变成另一个调度，则两个调度**冲突等价**。若一个调度与某个串行调度冲突等价，则它是**冲突可串行化**的。
:::

冲突有三种：读—写、写—读、写—写；两次读从不冲突。交换相邻的非冲突操作不会改变任何被读到的值和最终状态：若它们碰的是不同数据项，则彼此无关；若都是读，则什么都不变。所以冲突可串行化的调度是可串行化的。判别法是一张图。

::: definition 优先图 {#def-precedence}
调度 $S$ 的**优先图**（串行化图）为每个已提交事务设一个顶点，并且每当 $T_i$ 的一个操作与 $S$ 中 $T_j$ 的*较晚*一个操作冲突时，设一条边 $T_i \to T_j$。
:::

::: theorem 冲突可串行化判别法 {#thm-precedence}
一个调度冲突可串行化，当且仅当它的优先图无环。此时图的每个拓扑序都是一个冲突等价串行调度的次序。
:::

::: proof
**必要性。** 交换相邻非冲突操作从不改变两个冲突操作之间的先后，故冲突等价的调度有相同的优先图。串行调度 $T_{\pi(1)}, \dots, T_{\pi(n)}$ 的图只有从该次序中较早的事务指向较晚事务的边，故无环。于是冲突可串行化的调度其图无环。

**充分性。** 设图无环，取一个拓扑序 $T_{\pi(1)}, \dots, T_{\pi(n)}$（[[algorithms/graph-search]]）。对 $n$ 归纳证明 $S$ 与该次序下的串行调度冲突等价。$T_1' = T_{\pi(1)}$ 没有入边。把它的操作从第一个到最后一个逐个取出，每一个都向前移动，越过排在前面的其他事务的操作。别的事务的每个这样的操作 $p$ 排在 $T_1'$ 的某操作 $q$ 之前；若二者冲突，就会有一条进入 $T_1'$ 的边。于是每次交换都是非冲突操作之间的交换，得到一个冲突等价的调度：$T_1'$ 后接其余事务的调度 $S'$。$S'$ 的优先图是 $S$ 的图去掉 $T_1'$，仍无环，拓扑序为 $T_{\pi(2)}, \dots$；由归纳假设，$S'$ 与该次序下的串行调度冲突等价。
:::

::: example 检验一个调度 {#ex-precedence}
$S = r_2(A)\; r_1(B)\; w_2(A)\; r_3(A)\; w_1(B)\; w_3(A)\; r_2(B)\; w_2(B)$ 冲突可串行化吗？$r_1(X)\; r_2(X)\; w_1(X)\; w_2(X)$ 呢？
::: solution
按先后列出 $S$ 中所有冲突对：
- 在 $A$ 上：$w_2(A)$ 在 $r_3(A)$ 与 $w_3(A)$ 之前，$r_2(A)$ 在 $w_3(A)$ 之前：边 $T_2 \to T_3$；
- 在 $B$ 上：$r_1(B)$ 在 $w_2(B)$ 之前，$w_1(B)$ 在 $r_2(B)$ 与 $w_2(B)$ 之前：边 $T_1 \to T_2$。

图 $T_1 \to T_2 \to T_3$ 无环，故 $S$ 冲突可串行化，等价于串行次序 $T_1, T_2, T_3$。检验：在 $S$ 中，$T_2$ 在 $T_1$ 写 $B$ 之后读 $B$，$T_3$ 在 $T_2$ 写 $A$ 之后读 $A$——与串行次序完全一致。

第二个调度中，$r_1(X)$ 在 $w_2(X)$ 之前（$T_1 \to T_2$），$r_2(X)$ 在 $w_1(X)$ 之前（$T_2 \to T_1$）：有环，故不冲突可串行化。它就是引言中的丢失更新：两者都读了 $X$，第二次写盖掉了第一次写。一段小程序可以同时算出两个答案：

```python
from itertools import combinations

def parse(s):
    """'r1(X) w2(X) ...' -> list of (op, txn, item)"""
    return [(t[0], int(t[1:t.index("(")]), t[t.index("(") + 1:-1]) for t in s.split()]

def precedence_graph(schedule):
    edges = set()
    for (i, a), (j, b) in combinations(enumerate(schedule), 2):   # a 在 b 之前
        if a[1] != b[1] and a[2] == b[2] and "w" in (a[0], b[0]):
            edges.add((a[1], b[1]))                                # 冲突：Ta -> Tb
    return edges

for s in ["r2(A) r1(B) w2(A) r3(A) w1(B) w3(A) r2(B) w2(B)", "r1(X) r2(X) w1(X) w2(X)"]:
    print(sorted(precedence_graph(parse(s))))
```

```console
$ python3 prec.py
[(1, 2), (2, 3)]
[(1, 2), (2, 1)]
```
:::
:::

::: widget graph
nodes: T1@0,1; T2@1,0; T3@2,1
edges: T1>T2; T2>T3; T3>T2
algorithm: topo
caption: 调度 $r_1(X)\,w_1(X)\,r_2(X)\,r_3(Y)\,w_2(Y)\,w_3(Y)$ 的优先图：在 $X$ 上有 $T_1 \to T_2$；在 $Y$ 上既有 $T_2 \to T_3$（$w_2(Y)$ 在 $w_3(Y)$ 之前），又有 $T_3 \to T_2$（$r_3(Y)$ 在 $w_2(Y)$ 之前）。逐步演示拓扑排序：它输出 $T_1$，随即卡在环 $T_2 \to T_3 \to T_2$ 上，所以该调度不冲突可串行化。从边表中删去边 T3>T2——仿佛 $T_3$ 是在 $T_2$ 写 $Y$ 之后才读 $Y$——排序便以 $T_1, T_2, T_3$ 成功完成。
:::

冲突可串行化是可串行化的充分条件而非必要条件。调度 $r_1(X)\; w_2(X)\; w_1(X)\; w_3(X)$ 在 $T_1$ 与 $T_2$ 之间有环，但它与 $T_1, T_2, T_3$ 效果相同：两者中 $T_1$ 都读到初始的 $X$，最终值两者都是 $T_3$ 写下的，因为 $T_3$ 的**盲写**（不先读就写）会盖掉此前的一切。这类调度是**视图可串行化**的。检验视图可串行性是 NP 完全问题（Papadimitriou，1979），这是各系统采用冲突可串行化的原因之一。

### 可恢复性

可串行化只考虑提交的事务。中止带来另一个问题：若 $T_2$ 读了 $T_1$ 写的值，而 $T_1$ 后来中止，$T_2$ 就见过一批从未存在过的数据。

::: definition 可恢复、无级联与严格调度 {#def-recoverable}
若 $T_j$ 读了某数据项、该项最近由 $T_i$ 写过，且 $T_i$ 届时尚未中止，则称 $T_j$ **读自** $T_i$。一个调度是
- **可恢复的**，若只要 $T_j$ 读自 $T_i$，$T_i$ 就在 $T_j$ 提交之前提交；
- **无级联的**（避免级联中止），若事务只读已提交事务写下的值；
- **严格的**，若在任何事务读或改写数据项 $X$ 之前，最后写 $X$ 的那个事务已经提交或中止。
:::

每个严格调度都无级联，每个无级联调度都可恢复。在 $w_1(X)\; r_2(X)\; c_2\; a_1$ 中，$T_2$ 基于一个正要被撤销的值做出了提交，而持久性禁止撤销 $T_2$：调度不可恢复。在 $w_1(X)\; r_2(X)\; a_1\; a_2$ 中，调度可恢复，但 $T_1$ 的中止迫使 $T_2$ 也中止——一次**级联中止**，长链条上代价高昂。严格调度让撤销变得简单：要中止 $T_1$，只需恢复它写过的数据项的前像，因为此后无人读过或改写它们（[[databases/recovery]]）。

## 基于锁的并发控制

**锁管理器**为各事务授予数据项上的锁。**共享**（S）锁允许读；**排他**（X）锁允许读写。多个事务可同时持有同一数据项的 S 锁，但一把 X 锁排斥其他一切锁：

| 已持有 \ 请求 | S | X |
|---|---|---|
| S | 允许 | 等待 |
| X | 等待 | 等待 |

光加锁还不够：一个事务锁住 $A$、写 $A$、解锁 $A$、稍后又锁 $B$，就会让别的事务看到 $A$ 已改而 $B$ 未改——正是我们想防止的交错。补救办法是给*何时*能释放锁立个规矩。

::: definition 两阶段锁 {#def-2pl}
若一个事务在释放任何锁之前已取得它需要的全部锁，则它遵循**两阶段锁**（2PL）：其生命有**扩张阶段**（只取锁，不放锁）与**收缩阶段**（只放锁，不取锁）。事务取得最后一把锁的时刻称为它的**锁定点**。**严格 2PL** 额外要求每把排他锁都持有到事务提交或中止为止。
:::

::: theorem 两阶段锁保证冲突可串行化 {#thm-2pl}
若每个事务都遵循 2PL，则锁管理器允许的每个调度都冲突可串行化，且锁定点的次序就是一个等价的串行次序。若每个事务都遵循严格 2PL，调度还是严格的。
:::

::: proof
设 $T_i \to T_j$ 是优先图中的一条边：$T_i$ 对数据项 $X$ 的操作 $p$ 先于 $T_j$ 对 $X$ 的冲突操作 $q$。既然冲突，二者所需的锁互不相容，所以 $T_i$ 必先释放它对 $X$ 的锁，$T_j$ 才能取得它对 $X$ 的锁。由 2PL，$T_i$ 在锁定点之前什么都不释放，$T_j$ 在锁定点之后什么都不取得。于是

$$
\mathrm{LP}(T_i) \;<\; \text{release}_i(X) \;<\; \text{acquire}_j(X) \;\le\; \mathrm{LP}(T_j).
$$

每条边都从较早的锁定点指向较晚的锁定点。环 $T_1 \to \dots \to T_k \to T_1$ 将给出 $\mathrm{LP}(T_1) < \mathrm{LP}(T_1)$，不可能；故图无环，按锁定点排出的次序就是拓扑序。由 [[#thm-precedence]]，调度按该次序冲突可串行化。

在严格 2PL 下，写过 $X$ 的事务把它的 X 锁持有到提交或中止为止，在此之前没有别的事务能读或写 $X$：调度是严格的。
:::

多数基于锁的系统实现的是严格 2PL，通常连共享锁也持有到底（**强两阶段锁**，rigorous 2PL），这使串行次序就是提交次序。锁是自动取得的：语句读一行时系统取 S 锁、写一行时取 X 锁，提交时全部释放。

::: example 严格 2PL 的运行 {#ex-2pl}
$T_1$ 把 £100 从 A 转到 B：$r_1(A)\, w_1(A)\, r_1(B)\, w_1(B)$。$T_2$ 计算总额 $A + B$：$r_2(A)\, r_2(B)$。设 $T_2$ 恰在 $T_1$ 写 A 之后开始，展示严格 2PL 如何把它们串行化。
::: solution
| 步骤 | $T_1$ | $T_2$ | 持有的锁 |
|---|---|---|---|
| 1 | X 锁 A，$r_1(A)$，$w_1(A)$ | | $T_1$：X(A) |
| 2 | | 请求 S 锁 A：**等待** | $T_1$：X(A) |
| 3 | X 锁 B，$r_1(B)$，$w_1(B)$ | （等待中） | $T_1$：X(A)、X(B) |
| 4 | 提交，释放全部锁 | | — |
| 5 | | S 锁 A，$r_2(A)$；S 锁 B，$r_2(B)$；提交 | $T_2$：S(A)、S(B) |

$T_2$ 看到的是转账之后的状态，总额正确。若不加锁，它可能在扣款之后、入账之前读 B，报出的总数少 £100。若是非严格的 2PL，$T_1$ 可以在取得 B 的锁（即锁定点）之后释放 A，$T_2$ 于是能提前读到 A——仍可串行化，但 $T_2$ 读了未提交的数据，$T_1$ 一中止就会级联到它。
:::
:::

### 死锁

加锁引入了**死锁**：$T_1$ 持有 X(A) 并请求 X(B)，$T_2$ 持有 X(B) 并请求 X(A)；彼此永远等待对方。**等待图**在 $T_i$ 等待 $T_j$ 持有的锁时设边 $T_i \to T_j$，死锁恰是图中的一个环。系统要么**检测**死锁——定期在等待图中找环并中止一个牺牲者，或者干脆让长时间等待超时——要么用时间戳来**预防**。每个事务开始得到一个时间戳，重启时保持不变；越早时间戳越小。当 $T_i$ 请求一把 $T_j$ 持有的锁时：

- **等待—死亡**（wait-die）：若 $T_i$ 较老则等待，否则 $T_i$ 中止（"死亡"）；
- **伤害—等待**（wound-wait）：若 $T_i$ 较老则 $T_j$ 中止（"被伤害"），否则 $T_i$ 等待。

::: example 三方死锁 {#ex-deadlock}
在严格 2PL 下，$T_1$ 持有 X(A) 并请求 X(B)；$T_2$ 持有 X(B) 并请求 S(C)；$T_3$ 持有 X(C) 并请求 S(A)。画出等待图；设时间戳为 $T_1 = 1$、$T_2 = 2$、$T_3 = 3$，说出检测法、wait-die 和 wound-wait 各会怎么做。
::: solution
$T_1$ 等 $T_2$（B），$T_2$ 等 $T_3$（C），$T_3$ 等 $T_1$（A）：环 $T_1 \to T_2 \to T_3 \to T_1$，死锁。**检测法**找到这个环并中止一个牺牲者——通常是做事最少或持锁最少的那个——比如 $T_3$，释放 C，于是 $T_2$ 得以推进，随后是 $T_1$。

用预防法则环根本形成不了；按给出的次序考察各请求。**Wait-die**：$T_1$（较老）向 $T_2$ 请求，等待；$T_2$（较老）向 $T_3$ 请求，等待；$T_3$（较幼）向 $T_1$ 请求，死亡，稍后带时间戳 $3$ 重启。**Wound-wait**：$T_1$ 向较幼的 $T_2$ 请求，伤害它——$T_2$ 中止并释放 B；$T_3$ 向较老的 $T_1$ 请求，等待。两种方案这里都只中止一个事务，但 wait-die 中止的是最幼的请求者，wound-wait 中止的是较幼的持有者。
:::
:::

::: widget graph
nodes: T1@0,0; T2@2,0; T3@1,1.5
edges: T1>T2; T2>T3; T3>T1
algorithm: topo
caption: [[#ex-deadlock]] 的等待图。逐步演示拓扑排序：没有事务的入度为零，排序一步都迈不出去，立刻报告该环——即死锁。死锁检测器做的正是这种找环搜索。删去边 T3>T1，仿佛 $T_3$ 不再等待 A：排序以 $T_1, T_2, T_3$ 成功，图无环，等待按相反次序解除——$T_3$ 先完成并释放 C，然后 $T_2$ 完成并释放 B，最后 $T_1$ 得以推进。
:::

::: proposition wait-die 与 wound-wait 预防死锁 {#prop-wait-die}
在 wait-die 下，以及在 wound-wait 下，等待图中永不含环，且每个事务终能提交。
:::

::: proof
wait-die 之下，事务只等待比它年轻的事务，故等待图的每条边都从较老指向较幼的事务；沿边走时间戳严格增大，所以无环。wound-wait 之下，事务只等待比它年长的事务，把次序反过来同样论证。至于推进：重启的事务保留原时间戳，故它终将成为最老的活跃事务。wait-die 下最老的事务永不中止（它只会等待）；wound-wait 下它永不等待、也永不受伤害。无论哪种，它都能运行到底，于是没有事务会饥饿。
:::

### 幻象

只锁事务读到的行还差一点。$T_1$ 两次运行 `SELECT COUNT(*) FROM Enrolled WHERE code = 'CS202'`；两次之间，$T_2$ 插入一条新的 CS202 选课记录并提交。$T_1$ 锁住了它读过的每一行，可那时新行还不存在，无锁可加：第二次的计数就不一样了。这个新行是一个**幻象**。防幻象要锁的是*条件*而不是行：原理上用**谓词锁**，实践上用 B+ 树区间 `code = 'CS202'` 上的**索引范围锁**（或 next-key 锁），它把插入该区间的动作挡住（[[databases/storage-indexing]]）。没有合适的索引时，就只得锁住整张表。

## 隔离级别

完全可串行化要牺牲并发性：事务要等锁，长报表会挡住更新。于是 SQL 让每个事务自选一个较弱的**隔离级别**，由 SQL 标准（自 SQL-92 起）用其排除的**现象**来定义。

::: definition 隔离现象 {#def-phenomena}
对事务 $T_1$ 与 $T_2$：
- **脏读**（P1）：$T_2$ 读了 $T_1$ 所写、而 $T_1$ 尚未提交或中止的数据项；
- **不可重复（模糊）读**（P2）：$T_1$ 读某数据项，$T_2$ 随后修改或删除它并提交，$T_1$ 再读将看到不同的值或读不到；
- **幻象**（P3）：$T_1$ 读取满足某条件的行集，$T_2$ 随后插入、删除或更新一些行使该集合改变，$T_1$ 重读将看到不同的集合。
:::

| 隔离级别 | 脏读 | 不可重复读 | 幻象 |
|---|---|---|---|
| READ UNCOMMITTED | 可能 | 可能 | 可能 |
| READ COMMITTED | 不可能 | 可能 | 可能 |
| REPEATABLE READ | 不可能 | 不可能 | 可能 |
| SERIALIZABLE | 不可能 | 不可能 | 不可能 |

标准还要求 SERIALIZABLE 保证可串行化的执行，这比排除三种现象更多。Hal Berenson、Phil Bernstein、Jim Gray、Jim Melton 与 Elizabeth O'Neil、Patrick O'Neil 在《对 ANSI SQL 隔离级别的批评》（"A critique of ANSI SQL isolation levels"，1995）中指出，这些现象的措辞本身含混，刻画不了这些级别：按宽泛的读法还必须禁止**脏写**（P0：覆写另一事务未提交的写），而且若干异常根本漏出了表格之外——特别是**丢失更新**（P4）、**读偏斜**（在不同时刻读相关数据项）与**写偏斜**（我们马上见到）。各级的基于锁的实现大致对应：READ COMMITTED = 短读的读锁，REPEATABLE READ = 行上的长读锁，SERIALIZABLE = 长读锁加谓词（范围）锁，而写锁总是长的。

::: quiz
$T_1$ 读账户 A 的余额，随后 $T_2$ 改动 A 的余额并提交，$T_1$ 再读 A 看到新值。对 $T_1$ 而言，能排除这一现象的最弱 SQL 隔离级别是哪个？
- [ ] READ UNCOMMITTED
- [ ] READ COMMITTED
- [x] REPEATABLE READ
- [ ] SERIALIZABLE
::: solution
这是不可重复读（P2）：$T_2$ 的写已提交，所以不是脏读，READ COMMITTED 允许它。REPEATABLE READ 禁止它。SERIALIZABLE 也禁止，但不是做到这一点的最弱级别。
:::
:::

## 多版本并发控制与快照隔离

加锁让读者与写者互相等待。**多版本并发控制**（MVCC）为每个数据项保留多个版本，各版本记下写下它的事务，读者因此可以领到一个较早的、已提交的版本，而不必等待写者。当今多数系统都采用它，包括 PostgreSQL、Oracle、MySQL 的 InnoDB 与 SQL Server（可选）。

::: definition 快照隔离 {#def-si}
在**快照隔离**（SI）下，每个事务 $T$ 从一个**快照**读：$T$ 开始时刻数据库的已提交状态（再加上 $T$ 自己的写）。$T$ 只有当没有"在 $T$ 开始之后提交、且写了 $T$ 也写过的事务项"的其他事务时才能提交（**先提交者胜**）；否则 $T$ 中止。
:::

SI 从不展示未提交的数据（无脏读），重复读看到同一快照（无不可重复读，也没有 P3 意义的幻象），丢失更新也不可能：两个都写 $X$ 的并发事务中，后提交的那个中止。读者从不等待写者，反之亦然。它看起来无所不包——但并不可串行化。

::: example 写偏斜 {#ex-write-skew}
医院要求 Alice 与 Bob 两位医生中至少一人在值班。两人都在值班，两人都感觉不适。每人运行一个事务："若至少两名医生在值班，就把自己从值班中撤下"。证明在快照隔离下两人可以都提交，结果无人值班。
::: solution
两个事务都从同一快照出发，其中值班的医生有两名。$T_1$ 读两行，看到 $2 \ge 2$，把 Alice 的行置 $0$。$T_2$ *在自己的快照里*读两行——还是 $2$——把 Bob 的行置 $0$。它们写的是*不同*的数据项，于是先提交者胜规则看不到冲突，两者都提交。最终状态无人值班，违反了每个事务都在检查的那条规则。

任何串行次序都产生不了这一结果：串行执行时，第二个事务会看到只剩一人值班而什么都不做。在调度 $r_1(A)\, r_1(B)\, r_2(A)\, r_2(B)\, w_1(A)\, w_2(B)\, c_1\, c_2$ 中，优先图有 $T_2 \to T_1$（$r_2(A)$ 在 $w_1(A)$ 之前）和 $T_1 \to T_2$（$r_1(B)$ 在 $w_2(B)$ 之前）：一个由两条**读写反依赖**边构成的环。一个带快照读与先提交者胜规则的小型多版本存储可以演示这一切，并能演示丢失更新是被防住的：

```python
class Store:
    """Multiversion store with snapshot isolation and first-committer-wins."""
    def __init__(self, data):
        self.versions = {k: [(0, v)] for k, v in data.items()}   # 数据项 -> [(commit_ts, value)]
        self.clock = 0
    def begin(self):
        return {"start": self.clock, "writes": {}}
    def read(self, tx, key):
        if key in tx["writes"]:
            return tx["writes"][key]                 # 读自己的写
        return max((ts, v) for ts, v in self.versions[key] if ts <= tx["start"])[1]
    def write(self, tx, key, value):
        tx["writes"][key] = value                    # 缓冲到提交为止
    def commit(self, tx):
        for key in tx["writes"]:                     # 先提交者胜
            if self.versions[key][-1][0] > tx["start"]:
                return f"abort: {key} was changed by a concurrent transaction"
        self.clock += 1
        for key, value in tx["writes"].items():
            self.versions[key].append((self.clock, value))
        return "commit"

db = Store({"alice": 1, "bob": 1})                   # 1 = 在值班
t1, t2 = db.begin(), db.begin()
if db.read(t1, "alice") + db.read(t1, "bob") >= 2:   # "还有别人在值班"
    db.write(t1, "alice", 0)
if db.read(t2, "alice") + db.read(t2, "bob") >= 2:
    db.write(t2, "bob", 0)
print(db.commit(t1), "|", db.commit(t2))
now = db.begin()
print("on call:", db.read(now, "alice") + db.read(now, "bob"))

acct = Store({"x": 100})                             # 丢失更新被防住
u1, u2 = acct.begin(), acct.begin()
acct.write(u1, "x", acct.read(u1, "x") + 10)
acct.write(u2, "x", acct.read(u2, "x") + 20)
print(acct.commit(u1), "|", acct.commit(u2))
```

```console
$ python3 si.py
commit | commit
on call: 0
commit | abort: x was changed by a concurrent transaction
```
:::
:::

写偏斜需要两个事务各读到对方所写、且写不相交的数据项。Alan Fekete、Elizabeth O'Neil、Patrick O'Neil 等人于 2005 年证明：每个不可串行化的 SI 执行都含有这种结构——依赖图中的一个环，环上有两条相邻的读写反依赖边。**可串行化快照隔离**（SSI；Michael Cahill、Uwe Röhm 与 Alan Fekete，2008）保留 SI 的好处，并在运行期追踪反依赖，出现两条相邻反依赖时中止事务。它可能把一些事务中止得没有必要，但绝不放过任何不可串行化的执行。应用也可以在普通 SI 下通过**使冲突具体化**来避免写偏斜：让两个事务都写同一行（比如一个按班次的计数器），或用 `SELECT … FOR UPDATE` 锁住它们要读的行。

### 真实系统的做法

标准给出四个级别的名称；各系统把它们映射到自己的机制上，于是*同一个名字*可能意味着不同的保证。按当前版本的文档（截至 2026 年；PostgreSQL 在本课程所用机器上不可用，故其行为出自文档陈述，未经演示）：

- **PostgreSQL** 使用 MVCC。默认级别是 READ COMMITTED，其中*每条语句*看到一个新快照。READ UNCOMMITTED 可以接受但表现为 READ COMMITTED：PostgreSQL 从不展示脏数据。REPEATABLE READ 就是快照隔离：整个事务看到同一个快照，P3 意义的幻象不可能发生（比标准要求的更强），但写偏斜可能；试图更新一行、而该行已被并发提交事务改过的事务，将因串行化错误而失败，必须重试。SERIALIZABLE（自版本 9.1，2011 年）是 SSI，真正可串行化；应用必须准备重试因串行化失败而被中止的事务。
- **SQLite** 对整个数据库一次只允许一个写者，从而给出可串行化的事务。在其预写日志（WAL）模式下，读者看到一个快照，从不阻塞写者。一个先读后写的事务，若另一事务在中间提交了更新的版本，则其写入会被拒绝——所以 [[#ex-write-skew]] 的写偏斜不可能发生：

```python
import sqlite3

def connect():
    con = sqlite3.connect("oncall.db", timeout=0, isolation_level=None)   # 由我们自己发出 BEGIN
    con.execute("PRAGMA journal_mode = WAL")    # 读者看到快照；一次一个写者
    return con

setup = connect()
setup.executescript("""DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor (name TEXT PRIMARY KEY, on_call INTEGER);
INSERT INTO Doctor VALUES ('Alice', 1), ('Bob', 1);""")

a, b = connect(), connect()
for con in (a, b):
    con.execute("BEGIN")                         # 延迟型：成为只读事务
    n = con.execute("SELECT COUNT(*) FROM Doctor WHERE on_call = 1").fetchone()[0]
    print("sees", n, "doctors on call")
a.execute("UPDATE Doctor SET on_call = 0 WHERE name = 'Alice'")
a.execute("COMMIT")
try:
    b.execute("UPDATE Doctor SET on_call = 0 WHERE name = 'Bob'")
    b.execute("COMMIT")
except sqlite3.OperationalError as e:
    print("second writer:", e, e.sqlite_errorname)
    b.execute("ROLLBACK")
print(setup.execute("SELECT * FROM Doctor").fetchall())
```

```console
$ python3 sqlite_skew.py
sees 2 doctors on call
sees 2 doctors on call
second writer: database is locked SQLITE_BUSY_SNAPSHOT
[('Alice', 0), ('Bob', 1)]
```

第二个事务的快照已经过期，于是 SQLite 以 `SQLITE_BUSY_SNAPSHOT` 拒绝它的写；应用必须回滚并重试，重试时它只会看到一人值班。这份简洁的代价是写者从不并发运行。

::: warning 各处的 "repeatable read" 与 "serializable" 含义并不相同
人们很容易假定：运行在 REPEATABLE READ 下、甚至被某个系统标成 SERIALIZABLE 的事务，其行为就像串行执行。这两种假定都不安全。标准的 REPEATABLE READ 允许幻象；PostgreSQL 的 REPEATABLE READ 禁止幻象却允许写偏斜，因此它相对基于锁的版本既不比它强也不比它弱（Berenson 等人证明了 SI 与锁式 REPEATABLE READ 互不可比）。有些系统历史上曾以 SERIALIZABLE 之名提供快照隔离（Oracle 的 SERIALIZABLE 级别就是快照隔离）。在依赖某个隔离级别来守住一条跨越多行的不变式——"至少一名医生值班"、"已订总数 ≤ 容量"——之前，请阅读该系统对该级别的文档，并对并发情形做测试。
:::

::: history
事务的概念在 IBM 的 System R 项目中发展成型。Kapali Eswaran、Jim Gray、Raymond Lorie 与 Irving Traiger 的《数据库系统中的一致性与谓词锁概念》（"The notions of consistency and predicate locks in a database system"，*Communications of the ACM*，1976）定义了可串行化，证明了两阶段锁保证它，并发现了幻象问题；Gray、Lorie、Putzolu 与 Traiger 的《锁的粒度与一致性程度》（"Granularity of locks and degrees of consistency"，1976）引入了层次锁，以及后来演变为 SQL 隔离级别的各档一致性程度。Christos Papadimitriou 的《并发数据库更新的可串行化》（"The serializability of concurrent database updates"，*JACM*，1979）给出了冲突可串行化与视图可串行化的理论。Rosenkrantz、Stearns 与 Lewis 于 1978 年提出 wait-die 与 wound-wait；David Reed（1978）以及 Philip Bernstein 与 Nathan Goodman（1983）发展了多版本并发控制。Theo Härder 与 Andreas Reuter 于 1983 年造出 ACID 这一缩写。Berenson 等人批评 ANSI 级别的文章定义了快照隔离与写偏斜，发表于 SIGMOD 1995；Cahill、Röhm 与 Fekete 的可串行化快照隔离（SIGMOD 2008）由 Dan Ports 与 Kevin Grittner 在 PostgreSQL 9.1 中实现（见他们 VLDB 2012 的论文）。Jim Gray 与 Andreas Reuter 的《事务处理：概念与技术》（*Transaction Processing: Concepts and Techniques*，1992）是该领域的经典巨著。
:::

## 后续内容

隔离只是 ACID 的一半；恢复管理器（[[databases/recovery]]）用日志补足原子性与持久性，它与加锁的配合——严格调度让撤销安全——正是严格 2PL 成为常态的原因。分布式数据库需要跨机器的事务，配以两阶段提交与共识协议（[[distributed-systems]]），以及复制数据上较弱的一致性模型，Kleppmann 的书对这条谱系有很好的梳理。操作系统中的并发——互斥锁、死锁、饥饿——是同一问题在更低层的再现（[[operating-systems]]），而等待图与优先图中的找环即图搜索（[[algorithms/graph-search]]）。

::: summary
- **事务**按 **ACID** 保证执行；并发控制提供隔离，恢复提供原子性与持久性。
- 调度**冲突可串行化**当且仅当其**优先图**无环（[[#thm-precedence]]）；拓扑序给出等价的串行调度。
- **可恢复**、**无级联**与**严格**调度控制中止造成的损害；严格调度让撤销变得简单。
- **两阶段锁**保证冲突可串行化，按锁定点定序（[[#thm-2pl]]）；**严格 2PL** 还保证严格性。锁会造成**死锁**，用检测或 wait-die / wound-wait 处置；**幻象**需要谓词锁或索引范围锁。
- SQL 的**隔离级别**由脏读、不可重复读与幻象定义，Berenson 等人（1995）已证明这一定义不完备。
- 采用 **MVCC** 的**快照隔离**让读者与写者各行其道、不必等待，并能防住丢失更新，但允许**写偏斜**；**SSI** 使它可串行化。
- 各系统把级别名映射到不同机制：PostgreSQL 的 REPEATABLE READ 是 SI，其 SERIALIZABLE 是 SSI；SQLite 把写者串行化。
:::

## 习题

::: exercise 调度计数 {level=1 check="10"}
$T_1$ 有 $2$ 个操作，$T_2$ 有 $3$ 个。$T_1$ 与 $T_2$ 共有多少个调度？其中多少个是串行的？（输入调度个数。）
::: solution
一个调度由"$5$ 个位置中哪 $2$ 个放 $T_1$ 的操作"决定（每个事务自身的次序是固定的）：$\binom{5}{2} = 10$ 个调度。其中 $2$ 个是串行的（$T_1 T_2$ 与 $T_2 T_1$）。
:::
:::

::: exercise 冲突计数 {level=1 check="3"}
$r_1(A)\; r_2(A)\; w_1(B)\; w_2(A)\; r_1(A)\; r_2(B)$ 含有多少对冲突操作？（输入数目。）
::: solution
来自不同事务、在同一数据项上、至少一个是写的对：在 $A$ 上，$(r_1(A), w_2(A))$ 与 $(w_2(A), r_1(A))$——$T_1$ 的第二读在 $w_2(A)$ 之后；$(r_2(A), \cdot)$ 只能与 $T_1$ 的读配对，而读读不冲突。在 $B$ 上，$(w_1(B), r_2(B))$。共 $3$ 对。优先图有 $T_1 \to T_2$（来自第一、三对）与 $T_2 \to T_1$（来自第二对）：有环，故调度不冲突可串行化——$T_1$ 在 $T_2$ 写 $A$ 的前后各读了一次 $A$。
:::
:::

::: exercise 给现象命名 {level=1}
说出下面各情形属于 [[#def-phenomena]] 中的哪个现象（或 Berenson 等人所说的哪种异常）：(a) $w_1(X)\; r_2(X)\; a_1$；(b) $T_1$ 数 `code = 'CS202'` 的行，$T_2$ 插入一条并提交，$T_1$ 再数；(c) $r_1(X)\; r_2(X)\; w_1(X)\; w_2(X)\; c_1\; c_2$。
::: solution
(a) 脏读：$T_2$ 读了一个从未提交的值。(b) 幻象：满足条件的行集改变了。(c) 丢失更新：$T_1$ 的写被 $T_2$ 覆写，而 $T_2$ 是在 $T_1$ 写之前读的 $X$；它既不是脏读，严格说也不是不可重复读——两个事务都没有读 $X$ 两次——这正是标准表格的漏洞之一。
:::
:::

::: exercise 丢失更新 {level=2 check="2"}
$T_1 = r_1(X)\, w_1(X)$，$T_2 = r_2(X)\, w_2(X)$。它们的 $6$ 个调度中有几个冲突可串行化？（输入数目。）
::: solution
非串行的调度都以某个事务的读开头、随后交错：$r_1 r_2 w_1 w_2$、$r_1 r_2 w_2 w_1$、$r_2 r_1 w_1 w_2$、$r_2 r_1 w_2 w_1$。每一个里，两次读都先于两次写，故 $r_1(X)$ 在 $w_2(X)$ 之前（$T_1 \to T_2$）且 $r_2(X)$ 在 $w_1(X)$ 之前（$T_2 \to T_1$）：有环。所以只有 $2$ 个串行调度冲突可串行化，一切交错都会丢一次更新。
:::
:::

::: exercise 这是 2PL 吗？ {level=2}
调度 $r_1(A)\; w_2(B)\; r_1(B)\; w_1(C)\; r_2(C)$（结尾各加提交）能由 2PL 产生吗？能由严格 2PL 产生吗？给出加锁解锁的步骤，或说明为何不能。
::: solution
优先图有 $T_2 \to T_1$（$w_2(B)$ 在 $r_1(B)$ 之前）与 $T_1 \to T_2$（$w_1(C)$ 在 $r_2(C)$ 之前）：有环。由 [[#thm-2pl]]，2PL 的执行产生不了非冲突可串行化的调度，所以两问的答案都是不能。具体地：$T_1$ 需要在 $T_2$ 释放 X(B) 之后取得 S(B)，故 $T_2$ 到 $r_1(B)$ 时须已进入收缩阶段；但 $T_2$ 之后还要取 S(C)，那是 $T_1$ 释放 X(C) 之后的事——收缩阶段取锁，为 2PL 所禁止。
:::
:::

::: exercise 可恢复性 {level=2}
把每个调度归类为：不可恢复、可恢复但非无级联、无级联但非严格、严格：(a) $w_1(X)\; r_2(X)\; c_2\; c_1$；(b) $w_1(X)\; r_2(X)\; c_1\; c_2$；(c) $w_1(X)\; w_2(X)\; c_1\; c_2$；(d) $w_1(X)\; c_1\; r_2(X)\; w_2(X)\; c_2$。
::: solution
(a) $T_2$ 读自 $T_1$ 且先提交：**不可恢复**。(b) $T_2$ 读了未提交数据但在 $T_1$ 之后提交：**可恢复，非无级联**。(c) 没有事务做读，故无级联；但 $T_2$ 在 $T_1$ 提交前覆写 $X$，故**无级联但非严格**——若 $T_1$ 中止，恢复它的前像会把 $T_2$ 的写一并抹掉。(d) $T_2$ 在 $T_1$ 提交之后才碰 $X$：**严格**。
:::
:::

::: exercise wait-die 与 wound-wait {level=2}
事务 $T_1, T_2, T_3$ 的时间戳为 $10, 20, 30$（小者较老）。$T_2$ 持有一把 $T_1$ 请求的锁，$T_3$ 持有一把 $T_2$ 请求的锁。在 wait-die 和 wound-wait 下各会发生什么？
::: solution
Wait-die（老者等待，幼者死亡）：$T_1$ 比 $T_2$ 老，故 $T_1$ 等待；$T_2$ 比 $T_3$ 老，故 $T_2$ 等待。两者都等待；没有死锁，因为等待都从老者指向幼者。Wound-wait（老者伤害，幼者等待）：两个请求都来自比持有者更老的事务，故两名持有者都被伤害。$T_1$ 的请求使 $T_2$ 中止，$T_1$ 拿到锁；若 $T_2$ 向 $T_3$ 的请求发生在先，则 $T_3$ 也中止（否则 $T_2$ 稍后带时间戳 $20$ 重启，再次请求时会伤害 $T_3$，除非 $T_3$ 已经结束）。谁都不用等待。Wound-wait 中止得更积极，但绝不让老事务等待。
:::
:::

::: exercise 视图可串行化但非冲突可串行化 {level=3}
证明 $S = r_1(X)\; w_2(X)\; w_1(X)\; w_3(X)$（都提交）是可串行化的——对每个初始状态与每种计算，它与 $T_1, T_2, T_3$ 效果相同——但不是冲突可串行化的。
::: solution
**非冲突可串行化**：$r_1(X)$ 在 $w_2(X)$ 之前给出 $T_1 \to T_2$；$w_2(X)$ 在 $w_1(X)$ 之前给出 $T_2 \to T_1$。由 [[#thm-precedence]]，有环即排除。

**可串行化**：把 $S$ 与串行调度 $T_1 T_2 T_3 = r_1(X)\, w_1(X)\, w_2(X)\, w_3(X)$ 比较。两者中唯一的读 $r_1(X)$ 都读 $X$ 的初始值，故 $T_1$ 算出相同的值；$T_2$ 与 $T_3$ 什么都不读，故它们写出的值是由固定输入决定的固定函数。$X$ 的最终值两者都是 $T_3$ 写的那个，因为 $w_3(X)$ 在两者中都是最后一次写。于是对一切初始状态与计算，每次读看到的值相同、最终状态相同。（$S$ 是**视图可串行化**的：与某个串行调度有相同的"读自"关系和相同的最终写。）
:::
:::

::: exercise wound-wait 的免饥饿性 {level=3}
严谨地证明：在 wound-wait 下每个事务终能提交，假设从不被中止的事务都在有限时间内完成，且任意有限时段内启动的事务只有有限多个。若重启的事务被赋予新时间戳，会出什么问题？
::: solution
考虑时间戳为 $t$（跨重启保持不变）的事务 $T$。时间戳小于 $t$ 的事务只有有限多个（它们启动更早，任意有限时段内只有有限多个），而其中每一个按时间戳次序归纳终会提交——最老的活跃事务不受伤害（只有更老的事务才伤害别人）、也从不等待更老者（不存在），故有限时间完成；然后次老者成为最老者，依此类推。等到所有比 $T$ 老的事务结束，$T$ 就是最老的活跃事务，不会被伤害，除比它年轻的事务外无人能令它等待——而对年轻事务它反伤之。于是 $T$ 得以完成。若重启的事务拿到全新的更大时间戳，它就可能被其间启动的一个个老事务反复伤害，以至饥饿。
:::
:::

::: exercise 使冲突具体化 {level=3}
把 [[#ex-write-skew]] 的值班例子扩充为在快照隔离下不可能发生写偏斜：添加一个两个事务都必须写的数据项，并用 `Store` 类演示两个事务之一如今会中止。为什么这样做有效？代价是什么？
::: solution
添加一个数据项 `shift`（排班表的版本计数器），凡改动值班状态的事务都必须给它加一：

```python
db = Store({"alice": 1, "bob": 1, "shift": 0})
t1, t2 = db.begin(), db.begin()
for t, me in ((t1, "alice"), (t2, "bob")):
    if db.read(t, "alice") + db.read(t, "bob") >= 2:
        db.write(t, me, 0)
        db.write(t, "shift", db.read(t, "shift") + 1)   # 两者现在写同一个数据项
print(db.commit(t1), "|", db.commit(t2))
```

```console
$ python3 si_fix.py
commit | abort: shift was changed by a concurrent transaction
```

两个事务都写 `shift`，于是先提交者胜规则使第二个中止；重试时它看到只剩一人值班，便什么都不做。原先使写偏斜得以发生的读写反依赖，被改写成了 SI 能够侦测的写—写冲突。代价是*一切*排班改动从此彼此冲突，哪怕毫不相干（医生很多时，十人值班期间两人同时下班也会撞车），并发性因此下降；SSI 自动达到同样的安全性，且无谓中止更少。
:::
:::
