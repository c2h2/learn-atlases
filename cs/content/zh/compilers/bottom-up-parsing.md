自顶向下的语法分析器必须在*看到*一个构造之前，就决定对它使用哪条产生式：在语句开头面对 `id` 时，它就已经要知道这是赋值还是调用。上一章说明了如何改写文法使这种过早的抉择成为可能，以及这样做的代价——消除左递归、提取左公因子、朝反方向倾斜的语法分析树。**自底向上**语法分析反其道而行之。它一边读入单词符号、把它们留在栈上，一边直到某条文法规则的完整右部出现在栈顶时，才决定用左部把它替换掉。把抉择推迟到证据全部到齐，使自底向上语法分析器的能力严格强于自顶向下的：它们直接处理左递归文法，接受每一个 LL(1) 文法以及更多，而且仍以线性时间运行。

代价是语法分析器的抉择——何时继续读入、何时归约、用哪条产生式归约——对人来说不再一目了然，所以这类语法分析器几乎总是由一个程序根据文法生成为一张表。本章说明如何做到。核心思想出自高德纳（Knuth）（1965 年）：一个正确的语法分析器所能出现的栈构成一个*正则语言*，可由一台由"项目"——带标记位置的产生式——构造的有限自动机识别。我们构造那台自动机（LR(0)），带着向前查看符号以三种渐趋精确的方式使用它（SLR、LR(1)、LALR(1)），用一个简短的 Python 程序算出一切，并与 GNU Bison 比较。

## 移进-归约分析

自底向上的语法分析器从叶结点开始搭建语法分析树。就推导而言，它把一条**最右**推导倒过来走：每一步把右部的一次出现替换为其左部（一次**归约**），直到只剩开始符号。考察 [[compilers/top-down-parsing#eq-lr-grammar]] 的左递归表达式文法，自底向上语法分析器原样就能处理它：

$$
E \to E + T \mid T \qquad T \to T * F \mid F \qquad F \to (\,E\,) \mid \mathrm{id}
$$

`id * id + id` 的一条最右推导是

$$
\begin{aligned}
E &\Rightarrow E + T \Rightarrow E + F \Rightarrow E + \mathrm{id} \Rightarrow T + \mathrm{id} \Rightarrow T * F + \mathrm{id} \\
&\Rightarrow T * \mathrm{id} + \mathrm{id} \Rightarrow F * \mathrm{id} + \mathrm{id} \Rightarrow \mathrm{id} * \mathrm{id} + \mathrm{id},
\end{aligned}
$$

而自底向上的语法分析器从右到左把它倒推出来：先把第一个 `id` 归约为 $F$，再把 $F$ 归约为 $T$，如此下去。

::: definition 句柄 {#def-handle}
设 $S \Rightarrow^*_{\mathrm{rm}} \alpha A w \Rightarrow_{\mathrm{rm}} \alpha\beta w$ 是某条最右推导中的一步，其中 $w$ 是终结符串。位于 $\alpha$ 紧其后处的那条产生式 $A \to \beta$ 称为右句型 $\alpha\beta w$ 的一个**句柄**。若右句型的一个前缀没有越过其句柄的右端，则称该前缀为**活前缀**。
:::

由于推导是最右的，句柄右边的一切都是终结符。这正是栈够用的原因：**移进-归约语法分析器**把未读输入左边的部分 $\alpha\beta$ 保存在栈上，它有四种动作：

- **移进**：把下一个输入单词符号压入栈；
- 用 $A \to \beta$ **归约**：栈顶是 $\beta$；把它弹出并压入 $A$；
- **接受**：栈上放着开始符号且输入已耗尽；
- **错误**。

栈上始终是一个活前缀，而语法分析器恰在句柄位于栈顶时归约。自底向上分析的全部问题，就是判断*栈顶何时是一个句柄*——若是，是哪一个。可能出两种毛病：**移进-归约冲突**是语法分析器无法决定该归约还是该继续移进；**归约-归约冲突**是无法在两条产生式之间作抉择。

::: example 手工句柄剪枝 {#ex-handles}
用移进-归约步骤分析 `id * id + id`，并在每次归约时指出句柄。
::: solution
| 栈 | 输入 | 动作 |
|---|---|---|
| | `id * id + id $` | 移进 |
| `id` | `* id + id $` | 归约 $F \to \mathrm{id}$ |
| $F$ | `* id + id $` | 归约 $T \to F$ |
| $T$ | `* id + id $` | 移进——而不是归约 $E \to T$！ |
| $T\ *$ | `id + id $` | 移进 |
| $T * \mathrm{id}$ | `+ id $` | 归约 $F \to \mathrm{id}$ |
| $T * F$ | `+ id $` | 归约 $T \to T * F$ |
| $T$ | `+ id $` | 归约 $E \to T$ |
| $E$ | `+ id $` | 移进 |
| $E\ +$ | `id $` | 移进 |
| $E + \mathrm{id}$ | `$` | 归约 $F \to \mathrm{id}$ |
| $E + F$ | `$` | 归约 $T \to F$ |
| $E + T$ | `$` | 归约 $E \to E + T$ |
| $E$ | `$` | 接受 |

第四行显出难点。$T$ 是一条右部（$E \to T$），但它不是句柄：归约会得到 $E\ *\ \mathrm{id} + \mathrm{id}$，这不是右句型，因为没有哪个句型能让 $E$ 后跟 $*$。正确的抉择取决于下一个单词符号：`*` 之前移进，`+` 之前归约。把归约自下而上读出来，正是上面那条最右推导。
:::
:::

## LR(0) 项目与特征自动机

语法分析器怎能不每一步重新扫描栈，就知道栈顶是不是句柄？高德纳的洞见是：随着栈的增长，跟踪语法分析器*位于哪条产生式的哪个位置*。

::: definition LR(0) 项目 {#def-item}
文法的一个 **LR(0) 项目**是在其右部某处加了一个点的产生式：对产生式 $A \to \alpha\beta$，形如 $A \to \alpha \cdot \beta$。这个项目的含义是："我们可能正在识别 $A \to \alpha\beta$ 的中途，已见到 $\alpha$，正期待 $\beta$。"点位于末尾的项目 $A \to \alpha\cdot$ 称为**完整的**。产生式 $A \to X_1 \cdots X_k$ 有 $k + 1$ 个项目；$A \to \varepsilon$ 只有一个项目 $A \to \cdot$。
:::

我们用新的开始符号 $S'$ 和产生式 $S' \to S$ 把文法**拓广**，于是接受就是输入耗尽时按 $S' \to S$ 归约。项目集上的两种操作构造出自动机。

- **闭包。** 若项目集 $I$ 中有 $A \to \alpha \cdot B\beta$ 且 $B$ 是非终结符，那么语法分析器在期待一个 $B$ 时，可能处于 $B$ 的任何一条产生式的开头；所以对每条 $B \to \gamma$ 添加 $B \to \cdot\gamma$，并反复执行。
- **转移（goto）。** $\mathrm{goto}(I, X)$ 是 $\set{A \to \alpha X \cdot \beta : A \to \alpha \cdot X\beta \in I}$ 的闭包：在每个期待 $X$ 的项目中把点移过 $X$。

::: algorithm LR(0) 项目集规范族的构造 {#alg-lr0}
1. $I_0 \gets \mathrm{closure}(\set{S' \to \cdot S})$；$C \gets [I_0]$。
2. 对 $C$ 中的每个集合 $I$（包括沿途新加入的集合）和每个文法符号 $X$：令 $J = \mathrm{goto}(I, X)$；若 $J \ne \emptyset$，新则加入 $C$，并记录转移 $I \xrightarrow{X} J$。
3. $C$ 中的集合是 **LR(0) 自动机**的状态，转移是它的边——这是一台以文法符号为输入字母表的 DFA，开始状态是 $I_0$。
:::

用 Python 实现，项目表示成二元组（产生式编号、点的位置），并沿用 [[compilers/top-down-parsing]] 的 `grammar` 与 `first_follow`：

```python
from ll1 import grammar, first_follow

def augment(prods):
    return [("S'", [prods[0][0]])] + prods          # 产生式 0：S' -> S

def closure0(prods, items):                         # 项目 = (产生式编号, 点的位置)
    items, work = set(items), list(items)
    while work:
        p, d = work.pop(); rhs = prods[p][1]
        if d < len(rhs):
            for q, (lhs, _) in enumerate(prods):
                if lhs == rhs[d] and (q, 0) not in items:
                    items.add((q, 0)); work.append((q, 0))
    return frozenset(items)

def goto(prods, I, X, close):
    return close(prods, {(it[0], it[1] + 1) + it[2:] for it in I
                         if it[1] < len(prods[it[0]][1]) and prods[it[0]][1][it[1]] == X})

def collection(prods, start, close):
    states, edges, work = [start], {}, [start]
    symbols = {x for _, rhs in prods for x in rhs}
    while work:
        I = work.pop(0)
        for X in sorted(symbols):
            J = goto(prods, I, X, close)
            if not J: continue
            if J not in states: states.append(J); work.append(J)
            edges[states.index(I), X] = states.index(J)
    return states, edges
```

（`goto` 与 `collection` 的写法对下一节的 LR(1) 项目不作任何改动也能用，那种项目多带一个分量；`it[2:]` 把它原样传下去。）

::: example 表达式文法的 LR(0) 自动机 {#ex-lr0-states}
为表达式文法构造规范族。
::: solution
把拓广后的产生式编号为 $0{:}\ S' \to E$、$1{:}\ E \to E+T$、$2{:}\ E \to T$、$3{:}\ T \to T*F$、$4{:}\ T \to F$、$5{:}\ F \to (E)$、$6{:}\ F \to \mathrm{id}$，程序找到十二个状态（状态内的项目按产生式列出）：

```text
0 S' -> . E; E -> . E + T; E -> . T; T -> . T * F; T -> . F; F -> . ( E ); F -> . id   goto: {'(': 1, 'E': 2, 'F': 3, 'T': 4, 'id': 5}
1 E -> . E + T; E -> . T; T -> . T * F; T -> . F; F -> . ( E ); F -> ( . E ); F -> . id   goto: {'(': 1, 'E': 6, 'F': 3, 'T': 4, 'id': 5}
2 S' -> E .; E -> E . + T   goto: {'+': 7}
3 T -> F .   goto: {}
4 E -> T .; T -> T . * F   goto: {'*': 8}
5 F -> id .   goto: {}
6 E -> E . + T; F -> ( E . )   goto: {')': 9, '+': 7}
7 E -> E + . T; T -> . T * F; T -> . F; F -> . ( E ); F -> . id   goto: {'(': 1, 'F': 3, 'T': 10, 'id': 5}
8 T -> T * . F; F -> . ( E ); F -> . id   goto: {'(': 1, 'F': 11, 'id': 5}
9 F -> ( E ) .   goto: {}
10 E -> E + T .; T -> T . * F   goto: {'*': 8}
11 T -> T * F .   goto: {}
```

从状态 0 沿 `T` 走：期待 $T$ 的项目是 $E \to \cdot T$ 和 $T \to \cdot T * F$；把点移过去得到 $E \to T\cdot$ 和 $T \to T \cdot * F$，而两者都没有把点放在非终结符之前，闭包不再添加什么——这就是状态 4。状态 4 正是 [[#ex-handles]] 中那个难点的形式版本：它含一个完整项目（按 $E \to T$ 归约）和一个期待 `*` 的项目（移进）。
:::
:::

::: widget graph
nodes: I0@0,2; I1@2,4; I2@2,0; I3@4,3; I4@2,2; I5@4,4; I6@4,5; I7@4,0; I8@6,2; I9@6,5; I10@6,0; I11@8,2
edges: I0>I1; I0>I2; I0>I3; I0>I4; I0>I5; I1>I1; I1>I6; I1>I3; I1>I4; I1>I5; I2>I7; I4>I8; I6>I9; I6>I7; I7>I1; I7>I3; I7>I10; I7>I5; I8>I1; I8>I11; I8>I5; I10>I8
algorithm: bfs
start: I0
caption: [[#ex-lr0-states]] 中表达式文法的 LR(0) 自动机（省去边标签：例如 $I_0 \to I_4$ 标 $T$，$I_4 \to I_8$ 标 `*`，$I_2 \to I_7$ 标 `+`）。从 $I_0$ 作广度优先搜索：一个状态的 BFS 深度就是引向它的最短活前缀的长度——$I_4$ 由单符号前缀 $T$ 到达，$I_{11}$ 需要三个符号，例如 $T * F$。状态 $I_3, I_5, I_9, I_{11}$ 没有出边：每个只含一个完整项目，到达其中一个就意味着"现在归约"。
:::

这台自动机是一台 DFA，其输入字母表是*文法符号*的集合。它的意义就是 LR 分析背后的那条定理。

::: definition 有效项目 {#def-valid}
若存在最右推导 $S' \Rightarrow^*_{\mathrm{rm}} \alpha A w \Rightarrow_{\mathrm{rm}} \alpha\beta_1\beta_2 w$ 使得 $\gamma = \alpha\beta_1$，则称项目 $A \to \beta_1 \cdot \beta_2$ 对活前缀 $\gamma$ **有效**。
:::

::: theorem 高德纳关于活前缀的定理 {#thm-viable}
对每个文法符号串 $\gamma$，LR(0) 自动机存在一条从 $I_0$ 出发读完 $\gamma$ 的跑，当且仅当 $\gamma$ 是活前缀；且此时到达的状态恰为对 $\gamma$ 有效的那些项目的集合。特别地，一个上下文无关文法的活前缀全体构成一个正则语言。
:::

::: proof
我们证明：$\gamma$ 到达的状态（若存在）等于 $V(\gamma)$，即对 $\gamma$ 有效的项目集；且跑存在当且仅当 $V(\gamma) \ne \emptyset$。由于每个活前缀至少有一个有效项目（取自它出现于其中的那步推导），而含有效项目的前缀按定义就是活前缀，这就得出定理。对 $\lvert \gamma \rvert$ 归纳。

*基础*，$\gamma = \varepsilon$。对 $\varepsilon$ 有效的项目，是出自推导 $S' \Rightarrow^*_{\mathrm{rm}} A w$ 的那些 $A \to \cdot\beta$；它们是 $S' \to \cdot S$，并且递归地，每当 $A \to \cdot B\eta$ 有效时就有 $B \to \cdot\delta$（把推导延伸下去：重写 $B$，再把 $\eta$ 推出终结符——这可行，因为我们假定每个符号都能推出某个终结符串）。这恰好就是 $\mathrm{closure}(\set{S' \to \cdot S}) = I_0$。

*归纳步。*设 $\gamma = \gamma' X$，并设结论对 $\gamma'$ 成立。首先，点不在开头的项目 $A \to \beta_1 X \cdot \beta_2$ 对 $\gamma' X$ 有效，当且仅当 $A \to \beta_1 \cdot X\beta_2$ 对 $\gamma'$ 有效——同一条推导就同时见证两者。其次，项目 $B \to \cdot\delta$ 对 $\gamma$ 有效，当且仅当它由闭包规则从 $\gamma$ 的一个点位于 $B$ 之前的有效项目得到：若 $S' \Rightarrow^*_{\mathrm{rm}} \gamma B w \Rightarrow \gamma\delta w$，考察引入这个 $B$ 出现的那一步；它出自 $\gamma$ 的某个点位于 $B$ 之前的有效项目 $C \to \mu \cdot B\nu$（其间 $\nu$ 被推出终结符，而这是最右推导允许的，因为 $\nu$ 在右边）；反之，闭包规则按此构造只会添加有效的项目。于是 $V(\gamma' X) = \mathrm{closure}(\set{A \to \beta_1 X\cdot\beta_2 : A \to \beta_1\cdot X\beta_2 \in V(\gamma')}) = \mathrm{goto}(V(\gamma'), X)$，由归纳假设，这正是对 $\gamma'$ 到达的状态施加 $\mathrm{goto}$。而恰当这个集合为空时，自动机没有相应的转移。
:::

于是语法分析器根本不必查看它的栈：它在栈符号上跑这台自动机，状态就告诉它哪些项目有效。状态中的完整项目 $A \to \beta\cdot$ 表示"栈顶的 $\beta$ 可能是 $A \to \beta$ 的句柄"；项目 $A \to \alpha \cdot a\beta$ 表示"移进 $a$ 之后栈仍是活前缀"。更好的是，语法分析器甚至不必在每次归约之后重新跑自动机：它把读完每个栈符号之后到达的*状态*与栈符号一起存放在栈上，于是弹出 $\lvert\beta\rvert$ 个表项之后，露出的状态就是 $\alpha$ 到达的状态，再沿 $A$ 作一次 goto 转移便得到新状态。

## LR 分析表：LR(0) 与 SLR(1)

::: definition LR 分析表 {#def-lr-table}
一张 **LR 表**由两部分组成。$\mathrm{ACTION}[s, a]$ 对状态 $s$ 和终结符或 $\$$，取值为移进 $t$、归约 $p$、接受或错误。$\mathrm{GOTO}[s, A]$ 对非终结符 $A$，是从 $s$ 沿 $A$ 到达的状态。由自动机读出：若 $A \to \alpha \cdot a\beta \in I_s$ 且 $a$ 是终结符，则 $\mathrm{ACTION}[s, a] = $ 移进 $\mathrm{goto}(s, a)$；若 $S' \to S \cdot \in I_s$，则 $\mathrm{ACTION}[s, \$] = $ 接受；若 $I_s$ 中有一个完整项目 $A \to \beta \cdot$（$A \ne S'$），则对**向前查看集** $\mathrm{LA}(s, A \to \beta)$ 中的每个 $a$，$\mathrm{ACTION}[s, a] = $ 归约 $A \to \beta$。若没有哪个 ACTION 表项收到两个不同的动作，则文法属于该向前查看集取法所对应的文法类。
:::

- **LR(0)**：$\mathrm{LA}$ 是全体终结符的集合——只要有完整项目就归约，不看输入。很少文法是 LR(0) 的；表达式文法就不是，障碍在状态 4 和 10。
- **SLR(1)**（"简单 LR"，DeRemer 1971）：$\mathrm{LA}(s, A \to \beta) = \mathrm{FOLLOW}(A)$。只有在下一个单词符号于*某个*句型中能紧跟 $A$ 之后时，才归约出 $A$。

```python
def lr_table(prods, states, edges, lookahead):
    """lookahead(状态, 项目) -> 应在其上归约的终结符集合。"""
    nts = {a for a, _ in prods}
    action, conflicts = {}, []
    def put(s, t, act):
        old = action.setdefault((s, t), act)
        if old != act: conflicts.append((s, t, old, act))
    for s, I in enumerate(states):
        for it in sorted({it[:2] for it in I}):     # 每个核心项目只处理一次
            p, d = it; rhs = prods[p][1]
            if d < len(rhs) and rhs[d] not in nts:
                put(s, rhs[d], ("shift", edges[s, rhs[d]]))
            elif p == 0:                            # S' -> S .：输入末尾接受
                put(s, "$", ("accept",))
            elif d == len(rhs):
                for t in sorted(lookahead(s, it)):
                    put(s, t, ("reduce", p))
    return action, conflicts

def lr0_slr(prods, slr=True):
    prods = augment(prods)
    terms = {x for _, rhs in prods for x in rhs} - {a for a, _ in prods} | {"$"}
    follow = first_follow(prods)[2]
    states, edges = collection(prods, closure0(prods, {(0, 0)}), closure0)
    la = (lambda s, it: follow[prods[it[0]][0]]) if slr else (lambda s, it: terms)
    action, conflicts = lr_table(prods, states, edges, la)
    return prods, states, edges, action, conflicts
```

对表达式文法，LR(0) 表有两个冲突：`(4, '*', ('reduce', 2), ('shift', 8))` 和 `(10, '*', ('reduce', 1), ('shift', 8))`；而 SLR 表没有冲突：$\mathrm{FOLLOW}(E) = \set{+, ), \$}$ 不含 `*`，所以在状态 4 语法分析器只在 `+`、`)` 和 `$` 上按 $E \to T$ 归约，在 `*` 上移进。这正是我们手工发现的规则。

驱动程序对每种 LR 表都相同。它的栈存放状态；文法符号只是为追踪输出而保留。

```python
def lr_parse(prods, edges, action, tokens, trace=False):
    stack, toks, pos = [0], tokens + ["$"], 0      # 状态栈（文法符号隐含其中）
    syms = []                                       # 文法符号，仅供追踪显示
    while True:
        s, a = stack[-1], toks[pos]
        act = action.get((s, a))
        if trace: print(f"{' '.join(map(str, stack)):<14}{' '.join(syms):<14}{' '.join(toks[pos:]):<20}", end="")
        if act is None: raise SyntaxError(f"unexpected {a} in state {s}")
        if act[0] == "shift":
            stack.append(act[1]); syms.append(a); pos += 1
            if trace: print("shift", act[1])
        elif act[0] == "reduce":
            lhs, rhs = prods[act[1]]
            if rhs: del stack[-len(rhs):]; del syms[-len(rhs):]
            stack.append(edges[stack[-1], lhs]); syms.append(lhs)
            if trace: print(f"reduce {lhs} -> {' '.join(rhs)}")
        else:
            if trace: print("accept")
            return True
```

::: example 一次 SLR 分析 {#ex-slr-trace}
用 SLR 语法分析器分析 `id * id + id`，再分析出错的 `id + * id`。
::: solution
```text
0                           id * id + id $      shift 5
0 5           id            * id + id $         reduce F -> id
0 3           F             * id + id $         reduce T -> F
0 4           T             * id + id $         shift 8
0 4 8         T *           id + id $           shift 5
0 4 8 5       T * id        + id $              reduce F -> id
0 4 8 11      T * F         + id $              reduce T -> T * F
0 4           T             + id $              reduce E -> T
0 2           E             + id $              shift 7
0 2 7         E +           id $                shift 5
0 2 7 5       E + id        $                   reduce F -> id
0 2 7 3       E + F         $                   reduce T -> F
0 2 7 10      E + T         $                   reduce E -> E + T
0 2           E             $                   accept
```

动作序列与 [[#ex-handles]] 完全一致，只是每个抉择都由一次查表作出。看 $T \to T * F$ 这次归约：语法分析器弹出三个状态（`4 8 11`），露出状态 0，而 $\mathrm{GOTO}[0, T] = 4$。对 `id + * id`，语法分析器以 `SyntaxError: unexpected * in state 7` 停下：状态 7 在 `+` 之后期待一个项的开始。
:::
:::

::: theorem LR 分析的正确性与线性时间 {#thm-lr-correct}
若一张文法的 ACTION 表没有冲突（对上述任何一种向前查看取法，或下文的 LR(1)），那么对每个输入 $w$，驱动程序接受当且仅当 $w \in L(G)$，它作出的归约按顺序正是 $w$ 的最右推导的逆，且它只执行 $O(\lvert w \rvert)$ 步动作。
:::

::: proof
*可靠性。*由 [[#thm-viable]]，状态栈始终对应某个文法符号活前缀 $\gamma$，而不变式是：$\gamma$ 后接未读输入所得的串，能由此前已作出的归约*逆着*推出来：一次归约把栈顶的一条右部替换为其左部，所以若 $\gamma' A x$ 是最右推导可达的右句型，则归约之前的那个格局也是。接受意味着栈上是 $S$、输入为空，于是把归约倒过来读就构成 $w$ 的一条最右推导。

*完备性。*设 $w \in L(G)$。它的最右推导在每个时刻都定出正确的动作：若句柄在栈顶，就按它归约；否则移进。前一种情形，句柄对应的完整项目对当前栈有效，所以它在状态之中，而下一个单词符号在向前查看集里（FOLLOW 集、或 LR(1) 的向前查看集，含有所有实际可能紧随其后的单词符号）；后一种情形，某个点恰在下一个单词符号之前的项目是有效的。由于表没有冲突，正确的动作是*唯一*的动作，于是由归纳法，语法分析器紧随这条推导。

*线性时间。*每个移进消耗一个单词符号，故共 $\lvert w \rvert$ 个移进。无冲突的文法是无二义的（语法分析器的抉择全被定死），因而没有圈 $A \Rightarrow^+ A$；而对没有这种圈的文法，语法分析树的内部结点数至多是叶子数加一的常数 $c_G$ 倍，所以归约只有 $O(\lvert w \rvert)$ 次。（含 $\varepsilon$-产生式的文法可以有空子树，但在无圈的语法分析树中，每串嵌套的空子树大小有界。）对出错的输入，语法分析器在第一个错误表项处停下；它走出的步数从不超出一段最长正确前缀所需的步数加上有界多次归约。
:::

## LR(1) 与 LALR(1)

SLR 使用 FOLLOW 集，而 FOLLOW 集把非终结符出现的各种上下文混在一起：只要 $A$ 在*某处*能后跟 `=`，SLR 就认为在*每一处* `=` 之前都可以归约出 $A$。这一招不够用的经典文法刻画的是 C 的赋值：`=` 的左边是*左值*（这里记作 $L$：一个变量或解引用的指针），右边是*右值* $R$：

$$
S \to L = R \mid R \qquad L \to * R \mid \mathrm{id} \qquad R \to L
$$ {#eq-lvalue}

::: example 一个 SLR 冲突 {#ex-slr-conflict}
找出 [[#eq-lvalue]] 的 SLR 冲突，并说明它为何是虚假的。
::: solution
LR(0) 自动机有十个状态；状态 2 从开始状态沿 $L$ 到达，其中含

```text
2 S -> L . = R; R -> L .
```

第一个项目说在 `=` 上移进。第二个是完整的，而 SLR 在 $\mathrm{FOLLOW}(R)$ 上按 $R \to L$ 归约。我们的程序算得 $\mathrm{FOLLOW}(R) = \set{=, \$}$：$R$ 能后跟 `=`，因为 $S \Rightarrow L = R \Rightarrow {*}R = R$，其中第一个 $R$ 后跟 `=`。于是表中有冲突 `(2, '=', ('shift', 8), ('reduce', 5))`（产生式 5 是 $R \to L$）。

可在状态 2，我们刚刚在一条语句的*最开头*读到一个 $L$。把它归约成 $R$，语句就以 $R$ 开头，而开头的 $R$ 只能就是整条语句（$S \to R$），其后是 `$`，绝不是 `=`。FOLLOW 集把在别处（`*` 之后）跟在 $R$ 后的那个 `=` 也掺了进来。在 `=` 之前作这次归约在这里绝不可能正确；文法是无二义的，这个冲突只是 SLR 粗糙的向前查看造成的假象。
:::
:::

解决之道是把向前查看符装进项目里面。

::: definition LR(1) 项目 {#def-lr1-item}
一个 **LR(1) 项目**是一个二元组 $[A \to \alpha \cdot \beta,\ a]$：一个 LR(0) 项目（称为其**核心**）加上一个作为**向前查看符**的终结符或 $\$$ $a$。若存在最右推导 $S' \Rightarrow^*_{\mathrm{rm}} \delta A w \Rightarrow_{\mathrm{rm}} \delta\alpha\beta w$ 使得 $\gamma = \delta\alpha$ 且 $a$ 是 $w\$$ 的首符号，则该项目对活前缀 $\gamma$ 有效。闭包规则变为：若 $[A \to \alpha \cdot B\beta,\ a]$ 在集合中，则对每条产生式 $B \to \gamma$ 和每个 $b \in \mathrm{FIRST}(\beta a)$ 添加 $[B \to \cdot\gamma,\ b]$。在规范的 **LR(1)** 表中，完整项目 $[A \to \alpha\cdot,\ a]$ 表示只在 $a$ 上归约。
:::

闭包新增项目的向前查看符，是 $B$ *在这一特定上下文*中能后跟的东西：$\beta$ 的首符号；或者，若 $\beta$ 可消失，则是那个期待 $B$ 的项目的向前查看符 $a$。改变的只有闭包；`goto`、规范族的构造和建表程序都原样复用：

```python
def closure1(prods, items):                         # 项目 = (产生式编号, 点的位置, 向前查看符)
    nullable, first, _, first_seq = first_follow(prods)
    items, work = set(items), list(items)
    while work:
        p, d, a = work.pop(); rhs = prods[p][1]
        if d < len(rhs) and rhs[d] in first:        # 点在非终结符 B 之前
            f, nul = first_seq(rhs[d + 1:])
            for b in f | ({a} if nul else set()):   # 向前查看符：FIRST(beta a)
                for q, (lhs, _) in enumerate(prods):
                    if lhs == rhs[d] and (q, 0, b) not in items:
                        items.add((q, 0, b)); work.append((q, 0, b))
    return frozenset(items)

def lr1(prods, lalr=False):
    prods = augment(prods)
    states, edges = collection(prods, closure1(prods, {(0, 0, "$")}), closure1)
    if lalr:                                        # 合并核心相同的状态
        core = lambda I: frozenset((p, d) for p, d, _ in I)
        cores = []
        for I in states:
            if core(I) not in cores: cores.append(core(I))
        merged = [frozenset().union(*(I for I in states if core(I) == c)) for c in cores]
        edges = {(cores.index(core(states[s])), X): cores.index(core(states[t]))
                 for (s, X), t in edges.items()}
        states = merged
    la = lambda s, it: {a for p, d, a in states[s] if (p, d) == it[:2]}
    action, conflicts = lr_table(prods, states, edges, la)
    return prods, states, edges, action, conflicts
```

规范的 LR(1) 是这些方法中能力最强的——一个文法是 LR(1) 的，恰好当它能带一个单词符号的向前查看、以自底向上的方式确定地分析——但它的状态可能远多于 LR(0)，因为项目相同、向前查看不同的状态会被分开。**LALR(1)**（"向前查看 LR"，DeRemer 1969）是 Yacc 与 Bison 采用的折中：把核心相同的 LR(1) 状态合并，向前查看符取并集。合并后的自动机恰好就是 LR(0) 自动机的那些状态——LR(1) 状态的核心恰是 LR(0) 状态——但向前查看集通常比 FOLLOW 精确得多。

::: example LALR(1) 化解左值冲突 {#ex-lalr}
计算 [[#eq-lvalue]] 的 LALR(1) 状态及其向前查看集，并检查状态 2。
::: solution
程序输出如下（逗号之后是向前查看符，`$/=` 表示 $\set{\$, =}$）：

```text
0 S' -> . S, $; S -> . L = R, $; S -> . R, $; L -> . * R, $/=; L -> . id, $/=; R -> . L, $
1 L -> . * R, $/=; L -> * . R, $/=; L -> . id, $/=; R -> . L, $/=
2 S -> L . = R, $; R -> L ., $
3 S -> R ., $
4 S' -> S ., $
5 L -> id ., $/=
6 R -> L ., $/=
7 L -> * R ., $/=
8 S -> L = . R, $; L -> . * R, $; L -> . id, $; R -> . L, $
9 S -> L = R ., $
```

在状态 0，$S \to \cdot R$ 的向前查看符是 $\$$，闭包于是给 $R \to \cdot L$ 以向前查看符 $\mathrm{FIRST}(\varepsilon\,\$) = \set{\$}$。移过 $L$ 之后，状态 2 含 $[R \to L\cdot,\ \$]$：只在 $\$$ 之前归约。`=` 上的移进不再冲突，`lr1(LR, lalr=True)` 报告没有冲突。规范 LR(1) 自动机有 14 个状态（它为"在 `=` 之前"和"在末尾"两种上下文分别保留 $L \to \mathrm{id}\cdot$ 及其同类的副本）；LALR 把它们重新并回 10 个 LR(0) 状态。
:::
:::

合并损失的信息从不会像 SLR 那么多，但也可能有所损失。

::: theorem 合并核心不会引入移进-归约冲突 {#thm-lalr-merge}
若一个文法是 LR(1) 的，它的 LALR(1) 表可能有归约-归约冲突，但绝没有移进-归约冲突。
:::

::: proof
设合并后的状态 $M$ 在 $a$ 上有移进-归约冲突：它含一个完整项目 $[A \to \alpha\cdot,\ a]$ 和某个 $b$ 对应的一个项目 $[B \to \beta \cdot a\gamma,\ b]$。那个完整项目来自某个核心为 $M$ 之核心的 LR(1) 状态 $I$。由于并入 $M$ 的所有 LR(1) 状态核心相同，$I$ 中也含一个核心为 $B \to \beta \cdot a \gamma$ 的项目（带某个向前查看符）。移进动作只依赖核心，所以 $I$ 在 $a$ 上移进，同时又在 $a$ 上按 $A \to \alpha$ 归约：冲突在 $I$ 中本来就有，文法本就不是 LR(1) 的。归约-归约冲突则可能出现，因为来自不同 LR(1) 状态、*不同*完整项目的向前查看符被合到了一起。
:::

::: example 是 LR(1) 而非 LALR(1) {#ex-not-lalr}
证明 $S \to a\,A\,d \mid b\,B\,d \mid a\,B\,e \mid b\,A\,e$、$A \to c$、$B \to c$ 是 LR(1) 的但不是 LALR(1) 的。
::: solution
读完 `a c` 之后，LR(1) 语法分析器处于状态 $\set{[A \to c\cdot,\ d],\ [B \to c\cdot,\ e]}$——$a$ 之后，$A$ 必须后跟 $d$、$B$ 必须后跟 $e$——而读完 `b c` 之后处于 $\set{[A \to c\cdot,\ e],\ [B \to c\cdot,\ d]}$。每个状态都没有冲突，程序找到 14 个 LR(1) 状态、没有冲突：

```text
6 A -> c ., d; B -> c ., e
9 A -> c ., e; B -> c ., d
```

这两个状态核心相同，都是 $\set{A \to c\cdot, B \to c\cdot}$，于是 LALR 把它们并成一个状态，其中两个归约的向前查看符都是 $\set{d, e}$：两个归约-归约冲突，一个在 $d$、一个在 $e$——而 LALR 自动机有 13 个状态。SLR 也以同样的方式失败。GNU Bison 3.8.2 默认使用 LALR(1)，结果一致：`warning: 2 reduce/reduce conflicts`；改用 `-Dlr.type=canonical-lr`（或 `ielr`，一种只拆分确实需要拆分的状态的算法），警告消失。
:::
:::

四种方法构成一个层次。我们的程序对本章四个文法的结果：

| 文法 | LR(0) | SLR(1) | LALR(1) | LR(1) |
|---|---|---|---|---|
| 表达式文法 | 12 状态，2 冲突 | 12 状态，无冲突 | 12 状态，无冲突 | 22 状态，无冲突 |
| 左值文法 [[#eq-lvalue]] | 10，1 | 10，1 | 10，无 | 14，无 |
| [[#ex-not-lalr]] | 13，6 | 13，2 | 13，2 | 14，无 |
| $E \to E+E \mid E*E \mid \mathrm{id}$ | 7，4 | 7，4 | 7，4 | 7，4 |

每个 LR(0) 文法都是 SLR(1) 的，每个 SLR(1) 文法都是 LALR(1) 的，每个 LALR(1) 文法都是 LR(1) 的，上面的例子表明每个包含都是严格的。每个 LL(1) 文法也都是 LR(1) 的——自底向上的语法分析器知道自顶向下语法分析器知道的一切，而且知道得更多——但不一定是 LALR(1) 的。最后一行是二义文法，不加辅助信息任何方法都无法分析。

::: quiz
一个 LALR(1) 语法分析器的某状态含有项目 $[A \to x\,\cdot,\ \set{a, b}]$ 和 $[B \to x \cdot y,\ \set{a}]$，其中 $y$ 是终结符。下列说法哪个正确？
- [ ] $a$ 上有移进-归约冲突。
- [ ] $a$ 上有归约-归约冲突。
- [x] 没有冲突：在 $a$ 或 $b$ 上归约，在 $y$ 上移进。
- [ ] 语法分析器无法归约，因为第二个项目的向前查看符含有 $a$。
::: solution
移进-归约冲突需要一个完整项目，其向前查看符中含有某个项目*点在它之前*的那个终结符。这里 $B \to x \cdot y$ 的点在 $y$ 之前，所以该状态在 $y$ 上移进；那个项目的向前查看符 $\set{a}$ 要等到 $B \to xy\cdot$ 完整之后才起作用。完整项目在 $a$ 和 $b$ 上归约。终结符各不相同，没有冲突。
:::
:::

## 二义性、优先级与语法分析器生成器

文法作者常常宁可用二义但易读的 $E \to E + E \mid E * E \mid \mathrm{id}$，而不用分层文法，另行为运算符声明优先级与结合性。Bison 报告冲突，并按声明裁决：

```console
$ cat amb.y
%token ID
%%
e : e '+' e | e '*' e | ID ;
$ bison amb.y
amb.y: warning: 4 shift/reduce conflicts [-Wconflicts-sr]
$ cat prec.y
%token ID
%left '+'
%left '*'
%%
e : e '+' e | e '*' e | ID ;
$ bison prec.y && echo no conflicts
no conflicts
```

规则是：每条产生式取得其最后一个终结符的优先级，每个单词符号取得其声明的优先级（越靠后的 `%left` 行结合越紧）。在"按产生式 $p$ 归约"与"移进单词符号 $t$"的移进-归约冲突中，若 $p$ 的优先级高于 $t$ 则归约，低于则移进；相等时，`%left` 归约、`%right` 移进。未决的移进-归约冲突默认移进（这为悬挂 `else` 实现了"最近的 `if`"规则：对 `if`-`then`-`else` 文法 Bison 报告 `1 shift/reduce conflict`，而默认裁决正是正确的），归约-归约冲突默认取排在前面的产生式。

::: example 用优先级裁决冲突 {#ex-prec}
在 `lr_table` 之上实现优先级规则，并用二义文法分析 `id + id * id + id`。
::: solution
```python
PREC = {"+": (1, "left"), "*": (2, "left")}       # 相当于 %left '+'  %left '*'
def resolve(prods, action, conflicts):
    for s, t, a1, a2 in conflicts:
        shift, red = (a1, a2) if a1[0] == "shift" else (a2, a1)
        if shift[0] != "shift" or red[0] != "reduce": continue   # 归约-归约冲突留而不决
        ops = [x for x in prods[red[1]][1] if x in PREC]
        if not ops or t not in PREC: continue
        p_rule, (p_tok, assoc) = PREC[ops[-1]][0], PREC[t]       # 产生式取其最后一个运算符的优先级
        action[s, t] = red if p_rule > p_tok or (p_rule == p_tok and assoc == "left") else shift
    return action
AMB = grammar("E -> E + E | E * E | id")
prods, states, edges, action, conflicts = lr0_slr(AMB)
action = resolve(prods, action, conflicts)
lr_parse(prods, edges, action, "id + id * id + id".split(), trace=True)
```

```text
0                           id + id * id + id $ shift 2
0 2           id            + id * id + id $    reduce E -> id
0 1           E             + id * id + id $    shift 4
0 1 4         E +           id * id + id $      shift 2
0 1 4 2       E + id        * id + id $         reduce E -> id
0 1 4 6       E + E         * id + id $         shift 3
0 1 4 6 3     E + E *       id + id $           shift 2
0 1 4 6 3 2   E + E * id    + id $              reduce E -> id
0 1 4 6 3 5   E + E * E     + id $              reduce E -> E * E
0 1 4 6       E + E         + id $              reduce E -> E + E
0 1           E             + id $              shift 4
0 1 4         E +           id $                shift 2
0 1 4 2       E + id        $                   reduce E -> id
0 1 4 6       E + E         $                   reduce E -> E + E
0 1           E             $                   accept
```

在状态 6（栈上是 $E + E$）面对 `*`：产生式 $E \to E + E$ 优先级为 1，`*` 为 2，于是语法分析器移进——乘法结合更紧。在同一状态面对 `+`：优先级相等且为 `%left`，于是归约：`(a + b*c) + d`。这张表只有 7 个状态，而分层文法要 12 个；语法分析器也不再作 $T \to F$ 这类单符归约——这是语法分析器生成器鼓励这种写法的原因之一。
:::
:::

::: warning 没有冲突不等于文法就是我想要的
优先级声明只是让冲突闭嘴，并不检验裁决是否出于你的本意。放错位置的一行 `%left`、一次不曾留意的默认移进，都会造出一个接受正确语言、却搭建错误语法树的语法分析器，而生成器一言不发。反过来说，冲突报告也不是二义性的证明：文法可能无二义却不是 LALR(1) 的（[[#ex-not-lalr]]）。要读冲突报告（Bison 的 `-Wcounterexamples` 会打印一个能以两种方式分析的输入），逐个冲突有意识地裁决，并检验语法树而不只是接受与否。
:::

### 生成还是手写？

许多语言实现使用 LR 语法分析器生成器——PostgreSQL 的 SQL 语法分析器和 PHP 的都是 Bison 文法，OCaml 程序员用 Menhir——语法经常变动的小型领域专用语言也是如此。生成的 LR 语法分析器便于检验文法无二义，也便于安全地修改文法。它的弱点是错误信息（表项只会说 "error in state 7"）以及难以应付真实语言中依赖上下文的边角情形。这正是各大 C、C++、Go、Rust 和 JavaScript 编译器都采用手写递归下降（[[compilers/top-down-parsing]]）的原因，也是 CPython 在 Python 3.9（2020 年）用带记忆回溯的 PEG 语法分析器替换其 LL(1) 生成器的原因。对二义或需要任意长向前查看的文法，**GLR** 分析（Tomita，1985 年；Bison 的 `%glr-parser`）一旦遇到冲突就并行地跑多套 LR 栈，而 **Earley** 分析以三次时间处理任何上下文无关文法（对多数 LR 文法是线性的）。

::: history
高德纳（Knuth）在 "On the translation of languages from left to right"（*Information and Control*，1965 年）中引入了 LR($k$) 分析，证明 LR($k$) 文法恰是那些带 $k$ 个向前查看符号、能自底向上确定地分析的文法，并证明活前缀构成正则语言。他的规范表对当时的机器来说太大。Frank DeRemer 的 MIT 博士论文 "Practical translators for LR($k$) languages"（1969 年）引入了 LALR，他的论文 "Simple LR($k$) grammars"（*Communications of the ACM*，1971 年）引入了 SLR；DeRemer 与 Thomas Pennello 在 1982 年发表了高效计算 LALR 向前查看集的算法。Stephen C. Johnson 的 Yacc（"Yet Another Compiler-Compiler"，贝尔实验室，1975 年）把 LALR 语法分析器生成连同处理二义文法的优先级声明一起变成了每个 Unix 系统的标配；GNU Bison（1985 年起，Robert Corbett，后有 Richard Stallman 等人）是其自由软件的继承者。Masaru Tomita 的 GLR（1985 年）以及 Joel Denny 与 Brian Malloy 的 IELR(1)（2010 年）扩展了 LR 方法的适用范围。
:::

## 后续内容

语法分析器的真正任务不是接受或拒绝，而是为编译器的其余部分搭一棵树。在 LR 语法分析器中，每次归约正是为刚识别的产生式建树结点的自然时刻——Yacc 与 Bison 正是为此给每条产生式附上一个动作。[[compilers/semantic-analysis]] 为 Mini 定义抽象语法树，用递归下降语法分析器把它构造出来，并检查作用域与类型错误。

::: summary
- 自底向上的语法分析器通过**移进**单词符号和**归约**句柄，把一条最右推导倒过来执行（[[#def-handle]]）；它的栈上始终是一个活前缀。
- **LR(0) 项目**（[[#def-item]]）与闭包/转移构造（[[#alg-lr0]]）给出一台以文法符号为输入的 DFA，它识别活前缀，并指出每个活前缀上哪些项目有效（[[#thm-viable]]，高德纳）。
- LR 表用向前查看集决定归约：全体终结符（LR(0)）、**FOLLOW** 集（SLR）、逐项目的向前查看符（规范 **LR(1)**），或按相同核心合并的 LR(1) 向前查看符（**LALR(1)**）。无冲突的表给出线性时间的语法分析器，输出倒过来的最右推导（[[#thm-lr-correct]]）。
- LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)，且每个包含都是严格的：左值文法是 LALR(1) 的而非 SLR(1) 的，[[#ex-not-lalr]] 是 LR(1) 的而非 LALR(1) 的。LALR 合并只会添归约-归约冲突（[[#thm-lalr-merge]]）。
- LALR 的状态数与 LR(0) 自动机相同（表达式文法是 12 个，而 LR(1) 要 22 个），并且是 Yacc 与 Bison 的默认方法。
- 二义的表达式文法靠**优先级与结合性**声明变成确定的；默认裁决（移进、取最先列出的产生式）处理了悬挂 `else`。务必检查每种裁决实际做了什么。
:::

## 习题

::: exercise 数一数项目 {level=1 check="20"}
增广表达式文法（$S' \to E$、$E \to E+T \mid T$、$T \to T*F \mid F$、$F \to (E) \mid \mathrm{id}$）共有多少个 LR(0) 项目？（填入数字。）
::: solution
右部含 $k$ 个符号的产生式有 $k + 1$ 个项目：$S' \to E$：2；$E \to E + T$：4；$E \to T$：2；$T \to T * F$：4；$T \to F$：2；$F \to (E)$：4；$F \to \mathrm{id}$：2。共 $20$ 个。LR(0) 自动机的 12 个状态都是这 20 个项目的子集。
:::
:::

::: exercise 数一数归约 {level=1 check="6"}
表达式文法的 SLR 语法分析器在输入 `( id )` 上作多少次归约？（填入数字；最后的接受不计。）
::: solution
`id` 依次归约为 $F$、$T$、$E$（三次归约：$F \to \mathrm{id}$、$T \to F$、$E \to T$）；移进 `)` 之后，语法分析器按 $F \to (E)$ 归约，再归约 $T \to F$ 和 $E \to T$。共 $6$ 次归约，除 $S'$ 外语法分析树的每个内部结点恰一次。
:::
:::

::: exercise 找句柄 {level=1}
对表达式文法的右句型 (a) $E + T * \mathrm{id}$ 和 (b) $T * (E)$，指出句柄以及归约句柄后得到的句型。
::: solution
(a) 句柄是最后位置处的 $F \to \mathrm{id}$；归约得 $E + T * F$。（不是 $E \to E + T$：把 $E + T$ 归约为 $E$ 会得到 $E * \mathrm{id}$，那不是右句型，因为 `*` 从不出现在 $E$ 之后。）下一步句柄是 $T \to T * F$，得 $E + T$。(b) 句柄是 $F \to (E)$；归约得 $T * F$，其句柄是 $T \to T * F$。
:::
:::

::: exercise SLR 表的表项 {level=2}
对文法 $S \to A\,a \mid b\,A\,c \mid d\,c \mid b\,d\,a$、$A \to d$（一个标准例子），构造 LR(0) 自动机直到求出 $b\,d$ 到达的状态，并判定该文法是否为 SLR(1)、是否为 LALR(1)。
::: solution
从开始状态沿 $b$ 到达 $\set{S \to b \cdot A c,\ S \to b \cdot d a,\ A \to \cdot d}$；再沿 $d$ 到达 $\set{S \to b d \cdot a,\ A \to d \cdot}$。SLR 在 $\mathrm{FOLLOW}(A) = \set{a, c}$（出自 $S \to A a$ 和 $S \to b A c$）上按 $A \to d$ 归约，而另一个项目在 $a$ 上移进：移进-归约冲突，所以文法不是 SLR(1) 的。从开始状态沿 $d$ 到达的状态 $\set{S \to d \cdot c,\ A \to d\cdot}$ 还有第二个 SLR 冲突，在 $c$ 上。改用 LR(1) 向前查看符后，$b$ 之后项目 $A \to \cdot d$ 的向前查看符是 $c$（出自 $S \to b \cdot A c$），于是在 $b\,d$ 到达的状态中归约只在 $c$ 上进行，而在 $d$ 到达的状态中只在 $a$ 上进行（出自 $S \to \cdot A a$）：没有冲突。这两个状态核心不同，LALR 合并不改变什么，所以文法是 LALR(1) 的。`lr0_slr` 报告两个冲突 `(4, 'c', …)` 和 `(7, 'a', …)`；`lr1(…, lalr=True)` 一个也不报。
:::
:::

::: exercise 悬挂 else 的自底向上分析 {level=2}
Bison 对 `s : IF B THEN s | IF B THEN s ELSE s | OTHER ;` 报告一个移进-归约冲突。指出涉及的状态与项目，说明 Bison 的默认裁决取哪一种，并说明它把每个 `else` 挂到最近的 `if` 上。
::: solution
冲突在 `IF B THEN s` 之后到达的状态，其中含 $s \to \mathrm{IF}\ B\ \mathrm{THEN}\ s\,\cdot$（完整项目：可归约，且向前查看符中有 $\mathrm{ELSE}$，因为不带 `else` 的 `if` 可以嵌套在带 `else` 的外层 `if` 之中）和 $s \to \mathrm{IF}\ B\ \mathrm{THEN}\ s \cdot \mathrm{ELSE}\ s$（在 `ELSE` 上移进）。Bison 对未决移进-归约冲突的默认是移进。对 `if b then if b then other else other`，当栈上是 `IF B THEN IF B THEN s` 而语法分析器看到 `ELSE` 时，移进会继续分析*内层*语句，于是 `else` 成为内层 `if` 的一部分；内层的 `if-then-else` 随后归约为 $s$，之后才轮到外层 `if-then` 归约。这正是"最近的 `if`"规则。用 `%precedence THEN` 和 `%precedence ELSE`（ELSE 结合更紧）或 Bison 的 `%expect 1` 可以消去这条警告，而不改变行为。
:::
:::

::: exercise 手工处理优先级 {level=2}
二义文法 $E \to E + E \mid E * E \mid \mathrm{id}$ 有四个移进-归约冲突，分别在状态 5（栈 $E * E$）和 6（栈 $E + E$），各在 `+` 和 `*` 上。对这四个冲突，逐一说明先 `%left '+'` 后 `%left '*'` 的声明各作何裁决及其原因；再说明若声明改为 `%right '+'` 和 `%left '*'` 会有什么变化，以及 `a + b + c` 的语法树变成什么样。
::: solution
状态 5，产生式 $E \to E * E$（取 `*` 的优先级 2）。面对 `*`：优先级相等、左结合：归约，于是 `a * b * c` 是 `(a*b)*c`。面对 `+`：产生式 2 > 单词符号 1：归约，于是 `a * b + c` 是 `(a*b) + c`。状态 6，产生式 $E \to E + E$（优先级 1）。面对 `*`：产生式 1 < 单词符号 2：移进，于是 `a + b * c` 是 `a + (b*c)`。面对 `+`：相等、左结合：归约，`(a+b)+c`。改用 `%right '+'` 后，唯一的变化在状态 6 面对 `+`：优先级相等而结合性为右，于是移进，`a + b + c` 分析为 `a + (b + c)`。接受的语言不变；变的只是语法树。
:::
:::

::: exercise LR 而非 LL {level=3}
(a) 证明文法 $S \to A \mid B$、$A \to a\,A \mid c$、$B \to a\,B \mid d$ 是 LR(0) 的，但对任何 $k$ 都不是 LL($k$) 的。(b) 用一段话解释为什么自底向上的语法分析器等得起，而自顶向下的等不起。
::: solution
(a) 语言是 $a^*c \cup a^*d$。*不是 LL($k$)：* 自顶向下的语法分析器展开 $S$ 时就必须在第一个单词符号处选定 $S \to A$ 还是 $S \to B$，但对任何 $k$，输入 $a^k c$ 与 $a^k d$ 的前 $k$ 个单词符号相同而需要不同的选择（`ll1_table` 对 $k = 1$ 在 $M[S, a]$ 处报告冲突）。*是 LR(0)：* LR(0) 自动机从不必过早抉择。从开始状态沿 $a$ 进入一个同时含 $A \to a \cdot A$ 和 $B \to a \cdot B$ 的状态（连同闭包 $A \to \cdot aA \mid \cdot c$、$B \to \cdot aB \mid \cdot d$），再遇 $a$ 则停留在该状态；沿 $c$ 到达 $A \to c\cdot$，沿 $d$ 到达 $B \to d\cdot$。每个含完整项目的状态都别无所有，所以没有冲突：`lr0_slr(…, slr=False)` 找到 9 个状态、没有冲突。读过 $c$ 或 $d$ 之后，语法分析器反复按 $A \to aA$（或 $B \to aB$）归约，最后按 $S \to A$（或 $S \to B$）归约。

(b) 自顶向下的语法分析器在*开始*某个子树时就得选定产生式，所以必须凭有界的向前查看预测整棵子树的形状。自底向上的语法分析器则在子树*完成*时才选定产生式；在那之前，它在 LR 自动机的一个状态里让所有相容的项目并存（这里是 $A \to a\cdot A$ 与 $B \to a\cdot B$ 同处一态），这是对无界多的左文的有限摘要。这就是 LR($k$) 严格强于 LL($k$) 的原因。
:::
:::

::: exercise 活前缀性质 {level=3}
证明规范 LR(1) 语法分析器从不移进一个不可能延续已读输入的单词符号：若它移进了第 $i$ 个单词符号，则前 $i$ 个单词符号是 $L(G)$ 中某个句子的前缀。证明 SLR 或 LALR 语法分析器的移进也有同样性质，但可能在检测到错误之前多作一些*归约*；用表达式文法给出一个例子。
::: solution
*规范 LR(1)。*设栈上是活前缀 $\gamma$（带着对它有效的状态），语法分析器移进 $a$。移进表项之所以存在，是因为状态中有某个项目 $[A \to \alpha \cdot a\beta,\ b]$，它因此对 $\gamma$ 有效：存在最右推导 $S' \Rightarrow^* \delta A w \Rightarrow \delta\alpha a\beta w$ 且 $\gamma = \delta\alpha$。每个符号都能推出终结符串，于是 $\gamma a \beta w$ 能推出某个句子 $x a y$，其中 $\gamma \Rightarrow^* x$；而由 [[#thm-lr-correct]] 的可靠性不变式，$\gamma$ 推出的恰是已读入的那些单词符号。所以已读入的单词符号再加上 $a$，是一个句子的前缀。至于归约：LR(1) 只在向前查看符为 $a$ 的完整项目有效时才在 $a$ 上归约，这同样意味着 $a$ 可能紧随其后；所以规范 LR(1) 语法分析器在输入不再成为任何句子前缀的第一个单词符号处、在作任何归约之前，就能检测出错误。

*SLR/LALR。*移进表项只依赖核心，而核心就是 LR(0) 的有效项目，所以上面对移进的论证照用。但它们的归约向前查看集是 LR(1) 向前查看集的超集，所以可能在一个此处并不能紧随其后的单词符号上归约，要等到归约后到达的状态才发现错误。例：SLR 语法分析器读 `( id $`（缺一个 `)`）：移进 `(` 和 `id` 之后，它在 $\$$ 上（$\$$ 在 FOLLOW 集中）依次按 $F \to \mathrm{id}$、$T \to F$、$E \to T$ 归约，到达状态 6，而 $\mathrm{ACTION}[6, \$]$ 是错误（`unexpected $ in state 6`）。没有移进任何错误的单词符号，却作了三次无用的归约——无害，但影响错误信息，因为语法分析器是在状态 6 报错误，而不是紧接着 `id`。用 `lr1` 构造的规范 LR(1) 语法分析器在移进 `id` 之后立即停下，报 `unexpected $ in state 10`：它对括号内的 `id` 所到的状态只带向前查看符 `)`、`+`、`*`。
:::
:::
