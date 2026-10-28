词法分析器已把正文 `a + b * c` 变成单词符号 `ID PLUS ID TIMES ID`。现在编译器必须找出它们的结构：`b * c` 是一个整体，它的值与 `a` 相加，而不是相反。这就是**语法分析**：给定一个上下文无关文法（[[theory-of-computation/context-free-grammars]]）和一串单词符号，求出该串的语法分析树，或报告它不存在。

CYK（[[theory-of-computation/context-free-grammars#alg-cyk]]）这样的通用算法能配任意文法分析，但要花三次方时间，对处理成百万单词符号的编译器而言慢得离谱。编译器转而使用受限文法类中的文法，它们可以**以线性时间、一遍从左到右、不回溯地**分析。这样的文法有两大家族。本章的主角——**自顶向下**语法分析器——从根往下搭树，每一步凭下一个单词符号预测该用哪条规则。**自底向上**语法分析器（[[compilers/bottom-up-parsing]]）则从叶子往上搭。[[compilers/compiler-structure]] 里的那个小编译器已经包含一个自顶向下语法分析器，用每条文法规则一个函数的形式手写而成；这里我们要弄清楚：这样的语法分析器何时可行、它需要的信息（FIRST 集与 FOLLOW 集）如何计算、如何把它变成一张表，以及不合规的文法该拿它怎么办。

## 递归下降

考察带标准优先级分层的算术表达式文法（[[theory-of-computation/context-free-grammars#eq-expr-grammar]]）：

$$
\begin{aligned}
E &\to E + T \mid T \\
T &\to T * F \mid F \\
F &\to (\,E\,) \mid \mathrm{id}
\end{aligned}
$$ {#eq-lr-grammar}

**递归下降**语法分析器为每个非终结符配一个过程；$A$ 的过程消耗输入中可由 $A$ 推出的那段前缀。对 $F$ 这很容易：下一个单词符号若是 `(`，消耗它、调用 $E$、再期待 `)`；若是 `id`，消耗它；否则报告错误。下一个单词符号决定了产生式。对 $E$ 则彻底失灵：$E$ 的过程得开口便是“要分析 $E + T$，先分析一个 $E$”，于是自己不消耗任何东西地无穷递归下去。

::: definition 左递归 {#def-left-rec}
若非终结符 $A$ 满足 $A \Rightarrow^+ A\alpha$ 对某个串 $\alpha$ 成立，则称 $A$ 是**左递归**的：存在一条从 $A$ 出发、一步以上的推导，产生以 $A$ 开头的句型。若存在形如 $A \to A\alpha$ 的产生式，则称其为**直接**左递归。
:::

左递归不是文法的毛病——左递归规则正是表达左结合运算符的自然写法——但它对自顶向下分析是致命的。补救之道是改写文法。

::: algorithm 消除直接左递归 {#alg-left-rec}
设 $A$ 的产生式为 $A \to A\alpha_1 \mid \dots \mid A\alpha_m \mid \beta_1 \mid \dots \mid \beta_n$，其中没有 $\beta_j$ 以 $A$ 开头，且没有 $\alpha_i$ 为空。把它们替换为
1. $A \to \beta_1 A' \mid \dots \mid \beta_n A'$，
2. $A' \to \alpha_1 A' \mid \dots \mid \alpha_m A' \mid \varepsilon$，

其中 $A'$ 是新的非终结符。
:::

两个版本生成同样的串：原版中 $A$ 推出 $\beta_j$ 后跟任意一串 $\alpha$，$A \Rightarrow A\alpha_{i_k} \Rightarrow \dots \Rightarrow \beta_j \alpha_{i_1} \cdots \alpha_{i_k}$；新文法中 $A$ 推出 $\beta_j A'$，而 $A'$ 恰好推出那些序列 $\alpha_{i_1}\cdots\alpha_{i_k}$。（间接左递归 $A \Rightarrow B\alpha \Rightarrow A\beta\alpha$ 可先代入产生式把它化为直接左递归再消除；Aho、Lam、Sethi 和 Ullman 给出了通用算法。）应用到 [[#eq-lr-grammar]]：

$$
\begin{aligned}
E &\to T\,E' & E' &\to +\,T\,E' \mid \varepsilon \\
T &\to F\,T' & T' &\to *\,F\,T' \mid \varepsilon \\
F &\to (\,E\,) \mid \mathrm{id}
\end{aligned}
$$ {#eq-ll-grammar}

这个文法可以自顶向下分析了，但注意代价：`a - b - c` 在新文法下的语法分析树向*右*倾斜（$E'$ 装着表达式的剩余部分），尽管减法是按左结合的。因此针对变换后文法的语法分析器并不照原样搭语法分析树，而是直接搭出想要的语法树。惯用手法正是小编译器里的那一个：把 $E \to T\,E'$ 连同 $E' \to +\,T\,E' \mid \varepsilon$ 实现成一个*循环*——“分析一个 $T$；只要下一个单词符号是 `+`，就消耗它、再分析一个 $T$，并与已有的部分结合”。循环搭出左倾的树。扩展 BNF 把它写成 $E \to T\,(+\,T)^*$，说的正是这件事。

第二个障碍是同一非终结符的两条产生式开头相同：

$$
S \to \mathrm{id} = E\ ; \;\mid\; \mathrm{id}\ (\ E\ )\ ;
$$

赋值和调用都以标识符开头，语法分析器必须在见到 `id` 时就作选择，却无从选择。**提取左公因子**把抉择推迟到分歧真正出现的地方：$S \to \mathrm{id}\ R$，$R \to {=}\ E\ ; \mid (\ E\ )\ ;$ —— `id` 之后的下一个单词符号（`=` 或 `(`）就作出了决定。

## 用 FIRST 与 FOLLOW 作预测

要弄清一个单词符号的前瞻何时够用，就得知道每条产生式能推出哪些以哪个单词符号开头的串。若 $A$ 后面的单词符号属于可开始 $\alpha$ 的单词符号集，而不属于 $A$ 任何其他产生式的相应集合，语法分析器就该用 $A \to \alpha$。能推出空串的产生式还需要第二个集合：可能*出现在* $A$ 后面的单词符号。

::: definition 可为空、FIRST 与 FOLLOW {#def-first-follow}
设 $G = (V, \Sigma, R, S)$ 是上下文无关文法，并添加结束标记 $\$ \notin \Sigma$。对文法符号串 $\alpha$：
- 若 $\alpha \Rightarrow^* \varepsilon$，则称 $\alpha$ **可为空**；
- $\mathrm{FIRST}(\alpha) = \set{a \in \Sigma : \alpha \Rightarrow^* a\beta \text{ 对某个 } \beta}$，即能开头推出自 $\alpha$ 的串的终结符集合。

对非终结符 $A$，
- $\mathrm{FOLLOW}(A) = \set{a \in \Sigma \cup \set{\$} : S\$ \Rightarrow^* \beta A a \gamma \text{ 对某个 } \beta, \gamma}$，即在某个句型中能紧接 $A$ 之后出现的终结符集合（$\$ \in \mathrm{FOLLOW}(S)$）。
:::

这些集合由推导定义，而推导有无穷多条，但它们满足简单的方程：

1. 终结符不可为空，且 $\mathrm{FIRST}(a) = \set{a}$；$\varepsilon$ 可为空，且 $\mathrm{FIRST}(\varepsilon) = \emptyset$。
2. $X_1 \cdots X_k$ 可为空当且仅当每个 $X_i$ 都可为空；$\mathrm{FIRST}(X_1 \cdots X_k) = \mathrm{FIRST}(X_1) \cup \dots \cup \mathrm{FIRST}(X_j)$，其中 $X_j$ 是第一个不可为空的符号（若全都可为空则 $j = k$）。
3. 非终结符 $A$ 可为空当且仅当某条产生式 $A \to \alpha$ 的 $\alpha$ 可为空，且 $\mathrm{FIRST}(A) = \bigcup_{A \to \alpha} \mathrm{FIRST}(\alpha)$。
4. $\$ \in \mathrm{FOLLOW}(S)$；且对每条产生式 $A \to \alpha B \beta$：$\mathrm{FIRST}(\beta) \subseteq \mathrm{FOLLOW}(B)$，并且若 $\beta$ 可为空，则 $\mathrm{FOLLOW}(A) \subseteq \mathrm{FOLLOW}(B)$。

这些方程是递归的（$\mathrm{FIRST}(E)$ 用 $\mathrm{FIRST}(T)$ 定义，而后者可能又提到 $\mathrm{FIRST}(E)$），所以我们用迭代来解：全部置空起步，反复应用规则直到不再变化。

```python
def grammar(text):
    """'A -> x B | ε' 形式的行 -> (A, [符号]) 的列表；左端第一个是开始符号。"""
    prods = []
    for line in text.strip().split("\n"):
        lhs, rhs = line.split("->")
        for alt in rhs.split("|"):
            prods.append((lhs.strip(), [s for s in alt.split() if s != "ε"]))
    return prods

def first_follow(prods):
    nts = {a for a, _ in prods}
    nullable, first = set(), {a: set() for a in nts}
    follow = {a: set() for a in nts}
    follow[prods[0][0]].add("$")
    def first_seq(seq):                 # 符号串的 FIRST，以及它是否可为空？
        out = set()
        for x in seq:
            if x not in nts: out.add(x); return out, False
            out |= first[x]
            if x not in nullable: return out, False
        return out, True
    changed = True
    while changed:                      # 迭代到最小不动点
        changed = False
        for a, rhs in prods:
            f, nul = first_seq(rhs)
            if nul and a not in nullable: nullable.add(a); changed = True
            if not f <= first[a]: first[a] |= f; changed = True
            for i, x in enumerate(rhs):
                if x in nts:
                    f, nul = first_seq(rhs[i + 1:])
                    new = f | (follow[a] if nul else set())
                    if not new <= follow[x]: follow[x] |= new; changed = True
    return nullable, first, follow, first_seq
```

::: theorem 迭代算出可为空、FIRST 与 FOLLOW {#thm-ff-fixpoint}
`first_follow` 至多在 `while` 循环 $1 + \lvert V\rvert(1 + \lvert\Sigma\rvert + \lvert \Sigma\rvert + 1)$ 轮后终止，且终止时它给出的集合恰好就是 [[#def-first-follow]] 中的那些。
:::

::: proof
*终止性。*各集合只增不减，而不停下的每一轮都至少向其中某个集合添一个元素。可为空的非终结符至多 $\lvert V\rvert$ 个，FIRST 集的元素至多 $\lvert V\rvert \lvert \Sigma \rvert$ 个，FOLLOW 集的元素至多 $\lvert V\rvert(\lvert\Sigma\rvert + 1)$ 个；再多一轮便能发现再无变化。

*可靠性：加入的都是对的。*按元素加入的先后次序归纳：每次加入都由一条产生式和已在场的元素作证，而后者由归纳假设是正确的；上面第 1–4 条规则都是定义的合法推论。例如，若 $A \to \alpha B \beta$、$\beta$ 可为空且 $a \in \mathrm{FOLLOW}(A)$，则 $S\$ \Rightarrow^* \gamma A a \delta \Rightarrow \gamma \alpha B \beta a \delta \Rightarrow^* \gamma\alpha B a \delta$，故 $a \in \mathrm{FOLLOW}(B)$。

*完备性：对的都是加入了的。*我们示范证明：若 $A \Rightarrow^n a\beta$，则 $a$ 终会进入 `first[A]`，对最左推导的长度 $n$ 归纳。其第一步用到某条 $A \to X_1 \cdots X_k$，而 $a$ 出自某个 $X_j$，其中 $X_1, \dots, X_{j-1}$ 推出 $\varepsilon$ 且 $X_j \Rightarrow^{<n} a\beta'$（或 $X_j = a$）。由归纳假设（可为空的情形同理证明，FIRST 亦然），最终集合记录了 $X_1, \dots, X_{j-1}$ 可为空且 $a \in$ `first[X_j]`；于是在不再起变化的最后一轮，`first_seq` 对这条产生式返回的集合含 $a$，故 $a$ 必已在 `first[A]` 中。可为空与 FOLLOW 用对推导归纳的同样方式处理：终止时各集合满足每一条方程，而由推导定义的集合恰是满足这些方程的*最小*集合。
:::

这次迭代是我们遇到的第一个贯穿全课的模式：一组定义在有限集合上的递归方程，从最小的可能值出发、反复应用方程直到到达**不动点**。[[compilers/dataflow-optimisation]] 会为程序分析发展出一般理论——格、单调函数以及终止性保证。

::: example 表达式文法的 FIRST 与 FOLLOW {#ex-ff}
对 [[#eq-ll-grammar]] 计算可为空、FIRST 与 FOLLOW。
::: solution
*可为空：*$E'$ 和 $T'$（各有一条 $\varepsilon$-产生式）；$E$、$T$、$F$ 不可为空，因为它们的每条产生式都以不可为空的符号开头。

*FIRST：*$\mathrm{FIRST}(F) = \set{(, \mathrm{id}}$。$T \to F T'$ 且 $F$ 不可为空，故 $\mathrm{FIRST}(T) = \mathrm{FIRST}(F)$；同理 $\mathrm{FIRST}(E) = \mathrm{FIRST}(T) = \set{(, \mathrm{id}}$。$\mathrm{FIRST}(E') = \set{+}$，$\mathrm{FIRST}(T') = \set{*}$。

*FOLLOW：*$\$ \in \mathrm{FOLLOW}(E)$，而 $F \to (E)$ 把 $)$ 放进去：$\mathrm{FOLLOW}(E) = \set{), \$}$。$E \to T E'$，$E'$ 在末尾：$\mathrm{FOLLOW}(E') \supseteq \mathrm{FOLLOW}(E)$，而 $E' \to +TE'$ 不添新东西，故 $\mathrm{FOLLOW}(E') = \set{), \$}$。$T$ 后面跟着 $E'$：$\mathrm{FIRST}(E') = \set{+}$，又因 $E'$ 可为空还并入 $\mathrm{FOLLOW}(E)$ 与 $\mathrm{FOLLOW}(E')$：$\mathrm{FOLLOW}(T) = \set{+, ), \$}$，且 $\mathrm{FOLLOW}(T') = \mathrm{FOLLOW}(T)$。$F$ 后面跟着 $T'$：$\mathrm{FOLLOW}(F) = \set{*} \cup \mathrm{FOLLOW}(T) = \set{*, +, ), \$}$。程序的结果一致：

```text
E   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')']
E'  nullable=True  FIRST=['+'] FOLLOW=['$', ')']
T   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')', '+']
T'  nullable=True  FIRST=['*'] FOLLOW=['$', ')', '+']
F   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')', '*', '+']
```
:::
:::

## LL(1) 文法与分析表

::: definition LL(1) 分析表与 LL(1) 文法 {#def-ll1}
文法的 **LL(1) 表** $M$ 每行对应一个非终结符，每列对应一个终结符或 $\$$。对每条产生式 $A \to \alpha$，把它放进每个 $a \in \mathrm{FIRST}(\alpha)$ 处的 $M[A, a]$；并且，若 $\alpha$ 可为空，也放进每个 $a \in \mathrm{FOLLOW}(A)$。若没有任何表项收到两条产生式，则文法是 **LL(1)** 的。（“LL(1)”：输入从**L**（左）往右读，产生**L**（最左）推导，带 **1** 个向前查看符号。）
:::

等价地说，$G$ 是 LL(1) 的当且仅当对任意两条不同的产生式 $A \to \alpha$ 和 $A \to \beta$：(i) $\mathrm{FIRST}(\alpha) \cap \mathrm{FIRST}(\beta) = \emptyset$；(ii) $\alpha$、$\beta$ 中至多一个可为空；(iii) 若 $\beta$ 可为空，则 $\mathrm{FIRST}(\alpha) \cap \mathrm{FOLLOW}(A) = \emptyset$。每个条件堵住表项被填两次的一条路子。

```python
def ll1_table(prods):
    nullable, first, follow, first_seq = first_follow(prods)
    table, conflicts = {}, []
    for i, (a, rhs) in enumerate(prods):
        f, nul = first_seq(rhs)
        for t in f | (follow[a] if nul else set()):
            if (a, t) in table:
                conflicts.append((a, t, table[a, t], i))
            table.setdefault((a, t), i)
    return table, conflicts
```

对 [[#eq-ll-grammar]]，把产生式编号为 $0{:}\ E \to TE'$、$1{:}\ E' \to +TE'$、$2{:}\ E' \to \varepsilon$、$3{:}\ T \to FT'$、$4{:}\ T' \to *FT'$、$5{:}\ T' \to \varepsilon$、$6{:}\ F \to (E)$、$7{:}\ F \to \mathrm{id}$，程序报告没有冲突，分析表如下（– 表示错误表项）：

| | `id` | `+` | `*` | `(` | `)` | `$` |
|---|---|---|---|---|---|---|
| $E$ | 0 | – | – | 0 | – | – |
| $E'$ | – | 1 | – | – | 2 | 2 |
| $T$ | 3 | – | – | 3 | – | – |
| $T'$ | – | 5 | 4 | – | 5 | 5 |
| $F$ | 7 | – | – | 6 | – | – |

ε-产生式由 FOLLOW 安放：当下一个单词符号是 `+`、`)` 或 `$`——能紧跟在一个 term 之后的单词符号——时选用 $T' \to \varepsilon$，语法分析器就这样知道一个乘积已经到头。

一张表可以驱动一个毫无递归的语法分析器：把已预测、尚未匹配的句型部分放在一张显式栈上。这就是一台确定下推自动机，事实上就是 [[theory-of-computation/pushdown-automata#thm-cfg-to-pda]] 的那一台，只不过把它的猜测换成了查表。

::: algorithm 表驱动 LL(1) 分析 {#alg-ll1}
栈 $\gets [\$, S]$（栈顶在右）；输入末尾接 $\$$。反复执行，$X$ 为栈顶、$a$ 为当前单词符号：
1. 若 $X$ 是终结符或 $\$$：若 $X = a$，弹栈并前进（$X = \$$ 时接受）；否则报告错误。
2. 若 $X$ 是非终结符：若 $M[X, a]$ 放着 $X \to Y_1 \cdots Y_k$，弹出 $X$，压入 $Y_k, \dots, Y_1$（使 $Y_1$ 在栈顶）并输出这条产生式；否则报告错误。
:::

```python
def ll1_parse(prods, tokens, trace=False):
    table, _ = ll1_table(prods)
    nts = {a for a, _ in prods}
    stack, toks, pos, out = ["$", prods[0][0]], tokens + ["$"], 0, []
    while stack:
        top, look = stack[-1], toks[pos]
        if trace: print(f"{' '.join(stack):<22}{' '.join(toks[pos:]):<22}", end="")
        if top not in nts:              # 终结符或 $：必须与输入匹配
            if top != look: raise SyntaxError(f"expected {top}, found {look}")
            stack.pop(); pos += 1
            if trace: print("match", look if look != "$" else "(accept)")
        elif (top, look) in table:      # 按预测的产生式展开
            i = table[top, look]; a, rhs = prods[i]
            stack.pop(); stack.extend(reversed(rhs)); out.append(i)
            if trace: print(a, "->", " ".join(rhs) or "ε")
        else:
            raise SyntaxError(f"unexpected {look} while expanding {top}")
    return out                          # 最左推导，以产生式编号表示
```

::: example 追踪 LL(1) 语法分析器 {#ex-ll1-trace}
用上表分析 `id + id * id`，逐步显示栈、剩余输入和动作。
::: solution
```text
$ E                   id + id * id $        E -> T E'
$ E' T                id + id * id $        T -> F T'
$ E' T' F             id + id * id $        F -> id
$ E' T' id            id + id * id $        match id
$ E' T'               + id * id $           T' -> ε
$ E'                  + id * id $           E' -> + T E'
$ E' T +              + id * id $           match +
$ E' T                id * id $             T -> F T'
$ E' T' F             id * id $             F -> id
$ E' T' id            id * id $             match id
$ E' T'               * id $                T' -> * F T'
$ E' T' F *           * id $                match *
$ E' T' F             id $                  F -> id
$ E' T' id            id $                  match id
$ E' T'               $                     T' -> ε
$ E'                  $                     E' -> ε
$                     $                     match (accept)
```

自上而下读这些展开，便得到最左推导 $E \Rightarrow TE' \Rightarrow FT'E' \Rightarrow \mathrm{id}\,T'E' \Rightarrow \mathrm{id}\,E' \Rightarrow \mathrm{id} + TE' \Rightarrow \cdots$。两个瞬间显出前瞻的用处：第 5 行，$T'$ 面对 `+`，而 `+` 在 $\mathrm{FOLLOW}(T')$ 中，于是第一个 term 结束；第 11 行，$T'$ 面对 `*`，于是第二个 term 继续。5 个单词符号，语法分析器走了 17 步。对 `id + * id`，它停在 `SyntaxError: unexpected * while expanding T`——这是输入再也不可能成为任何表达式开头的最早时刻。
:::
:::

::: widget graph
nodes: E@3,0; T1@1,1; Ep1@5,1; F1@0,2; Tp1@2,2; plus@4,2; T2@5,2; Ep2@6,2; id1@0,3; F2@4,3; Tp2@6,3; id2@4,4; times@5,4; F3@6,4; Tp3@7,4; id3@6,5
edges: E>T1; E>Ep1; T1>F1; T1>Tp1; F1>id1; Ep1>plus; Ep1>T2; Ep1>Ep2; T2>F2; T2>Tp2; F2>id2; Tp2>times; Tp2>F3; Tp2>Tp3; F3>id3
algorithm: dfs
start: E
caption: [[#ex-ll1-trace]] 的追踪所搭的语法分析树（`Ep` 是 $E'$，`Tp` 是 $T'$；叶结点 `Tp1`、`Ep2` 和 `Tp3` 推出 $\varepsilon$）。逐步演示深度优先搜索：内部顶点被*发现*的次序，就是 LL(1) 语法分析器展开它们的次序——自顶向下的语法分析器按先序搭树，每个顶点在看到其下方任何输入之前就要作决定。注意树如何向右倾斜：`+` 的第二个运算对象挂在 $E'$ 之下，这正是实用语法分析器直接搭语法树而不搭这种语法分析树的原因。
:::

::: theorem LL(1) 分析的正确性 {#thm-ll1-correct}
设 $G$ 是 LL(1) 文法。则对每个输入 $w$，[[#alg-ll1]] 终止；它接受当且仅当 $w \in L(G)$，且此时它输出的产生式序列就是 $w$ 的最左推导。
:::

::: proof
*不变式。*每一步，设 $u$ 为已匹配的输入前缀，$\gamma$ 为栈自顶向下去掉 $\$$ 的读法。则按已输出的产生式（依其顺序）有 $S \Rightarrow^*_{\mathrm{lm}} u\gamma$。初始 $u = \varepsilon$、$\gamma = S$。匹配步把 $\gamma$ 开头的终结符挪到 $u$ 的末尾；展开步把 $\gamma$ 的最左符号——由于 $u$ 全由终结符组成，它就是 $u\gamma$ 的最左非终结符——替换为一条右部，这正是一步最左推导。所以不变式成立；而若语法分析器接受，则 $u = w$、$\gamma = \varepsilon$ 且 $S \Rightarrow^*_{\mathrm{lm}} w$。

*完备性。*设 $w \in L(G)$，其最左推导为 $S = \alpha_0 \Rightarrow \alpha_1 \Rightarrow \dots \Rightarrow \alpha_n = w$。我们证明语法分析器紧随其后。设语法分析器处于某状态，$u\gamma = \alpha_i$，其中 $u$ 是 $w$ 的前缀（初始如此）。若 $\gamma$ 以终结符开头，它就是 $w$ 的下一个符号（因为 $\alpha_i \Rightarrow^* w$ 只重写非终结符），语法分析器于是匹配。若 $\gamma = A\gamma'$，推导的下一步用某条 $A \to \beta$，且 $w = u x$ 满足 $\beta\gamma' \Rightarrow^* x$。设 $a$ 是 $x\$$ 的首符号。要么 $a \in \mathrm{FIRST}(\beta)$，要么 $\beta \Rightarrow^* \varepsilon$ 且 $a$ 出自 $\gamma'$ 或就是 $\$$，此时 $a \in \mathrm{FOLLOW}(A)$。无论如何 $A \to \beta$ 都在 $M[A, a]$ 里——又因为 $G$ 是 LL(1)，那里*只有*这一条产生式。所以语法分析器走出的正是推导的那一步。由归纳它复现整条推导并接受。

*终止性。*每个匹配步消耗一个单词符号，故只需证明语法分析器不可能连续作无穷多次展开。反设在最后一次匹配之后如此。这些展开在栈上那一刻有限个符号之下搭建语法分析树结点，于是某个符号之下搭了无穷多结点；每个结点至多 $r$ 个孩子（$r$ 为最长的右部），由柯尼希（König）引理存在一条非终结符的无穷路径 $X_0, X_1, X_2, \dots$，每个都是前一个的孩子。由于没有匹配任何终结符，$X_{i+1}$ 左边的每个兄弟都已被完全展开成 $\varepsilon$：$X_i \to \alpha X_{i+1}\beta$ 且 $\alpha$ 可为空。路径上某个非终结符 $A$ 重复出现，得到 $A \Rightarrow^+ \alpha' A \beta' \Rightarrow^* A\beta'$，即 $A$ 左递归——由 [[#thm-ll1-unamb]]（其证明不依赖终止性），LL(1) 文法中不可能。
:::

::: theorem LL(1) 文法无二义且不左递归 {#thm-ll1-unamb}
每个非终结符从 $S$ 可达且至少推出一个终结符串的 LL(1) 文法是无二义的，且没有左递归的非终结符。
:::

::: proof
*无二义。*上面完备性的论证表明，对每个 $w \in L(G)$，*每条* $w$ 的最左推导都是这台确定语法分析器所跟随的那条。所以 $w$ 只有一条最左推导，即只有一棵语法分析树。

*不左递归。*反设 $A \Rightarrow^+ A\alpha$。所有符号都是有用的，故存在终结符串使 $S \Rightarrow^* uA\beta$、$\beta \Rightarrow^* v$、$A \Rightarrow^* x$ 且 $\alpha \Rightarrow^* y$。于是对每个 $k \ge 0$，
$$
S \Rightarrow^* uA\beta \Rightarrow^+ uA\alpha^k\beta \Rightarrow^* u\,x\,y^k\,v ,
$$
而这条最左推导里，$u$ 之后的那个 $A$ 的产生式在产出 $u$ 后第一个终结符之前被重写了至少 $k$ 次，始终待在最前端。若 $x = y = \varepsilon$，串 $uv$ 便有两棵不同的语法分析树（分别取 $k = 0$ 和 $k = 1$），与无二义矛盾。否则 $u$ 后的第一个终结符对所有 $k \ge 1$ 是同一个符号 $a$（$x$ 的首符号，或 $x = \varepsilon$ 时取 $y$ 的）。由唯一性，上面这条推导*就是*语法分析器在输入 $u x y^k v$ 上跟随的那条，所以匹配完 $u$ 之后，语法分析器栈上有 $A\beta$、前瞻符号是 $a$，至少要作 $k$ 次展开才轮到下一次匹配。但语法分析器是确定的：从那个格局到下一次匹配的动作只依赖栈和 $a$，不依赖 $k$，而且只有有限多次（它确实走到了匹配，因为它接受）。取 $k$ 超过那个数便得矛盾。
:::

因此二义文法 $E \to E + E \mid E * E \mid \mathrm{id}$ 不是 LL(1) 的，左递归的 [[#eq-lr-grammar]] 也不是：我们的程序对后者报告四个冲突，$(E, \mathrm{id})$、$(E, ()$、$(T, \mathrm{id})$ 和 $(T, ()$，每个都在左递归产生式与另一条之间。

::: quiz
对文法 $S \to \mathrm{id} = E\,; \mid \mathrm{id}\,(\,E\,)\,;$，其中 $E \to \mathrm{id} \mid \mathrm{num}$，LL(1) 表有多少个表项被重复定义？什么办法能修好它？
- [ ] 没有；该文法已是 LL(1)
- [x] 一个，$M[S, \mathrm{id}]$；对 $S$ 提取左公因子为 $S \to \mathrm{id}\,R$
- [ ] 两个，$M[S, \mathrm{id}]$ 和 $M[E, \mathrm{id}]$；消除左递归
- [ ] 文法是二义的，任何变换都无法使它成为 LL(1)
::: solution
两条 $S$-产生式的 $\mathrm{FIRST}$ 都是 $\set{\mathrm{id}}$，所以在 $M[S, \mathrm{id}]$ 处相撞；$E$ 的产生式以不同单词符号开头。文法既无二义也不左递归，只是需要两个向前查看符号。提取左公因子为 $S \to \mathrm{id}\ R$、$R \to {=}\ E\,; \mid (\ E\ )\,;$ 便得到 LL(1) 文法——程序在变换前报告 `[('S', 'id', 0, 1)]`，变换后报告 `[]`。
:::
:::

### 悬挂 else

有些冲突无法靠变换消除，因为语言按所述方式本身就是二义的。经典例子是可选的 `else`：

$$
S \to \mathbf{if}\ E\ \mathbf{then}\ S\ S' \mid \mathrm{other} \qquad S' \to \mathbf{else}\ S \mid \varepsilon \qquad E \to b
$$

在 `if b then if b then other else other` 中，`else` 可以归属任一 `if`。分析表一览无余：$\mathbf{else} \in \mathrm{FIRST}(\mathbf{else}\ S)$，且 $\mathbf{else} \in \mathrm{FOLLOW}(S')$（因为一个 $S'$ 可以在内层语句的末尾结束，而该语句后面跟着外层的 `else`），于是 $M[S', \mathbf{else}]$ 同时装着两条产生式。我们的程序恰好报告一个冲突：`("S'", 'else', 2, 3)`。凡带这一构造的语言都以同样的方式裁决：`else` 归属最近未配对的 `if`。在语法分析器里这意味着：在该冲突表项处选 $S' \to \mathbf{else}\ S$。得到的语法分析器是确定的，且实现了这条规则。（确实存在不靠冲突编码这条规则的文法——把语句分成“已配对”与“未配对”两类——但它笨拙，而且也不是 LL(1)。Go、Rust、Swift 等语言以强制使用花括号来回避这个问题。）

::: example 裁决悬挂 else {#ex-dangling}
为上面的 `if` 文法构造 LL(1) 语法分析器，冲突处偏向 $S' \to \mathbf{else}\ S$，然后在 `if b then if b then other else other` 上追踪它。`else` 挂到了哪个 `if` 上？
::: solution
`ll1_table` 在冲突表项处保留最先录入的产生式，也就是 $S' \to \mathbf{else}\ S$（它在文法中排得靠前），所以 `ll1_parse` 原样实现了这一裁决：

```text
$ S                   if b then if b then other else other $  S -> if E then S S'
$ S' S then E if      if b then if b then other else other $  match if
$ S' S then E         b then if b then other else other $     E -> b
$ S' S then b         b then if b then other else other $     match b
$ S' S then           then if b then other else other $       match then
$ S' S                if b then other else other $            S -> if E then S S'
$ S' S' S then E if   if b then other else other $            match if
$ S' S' S then E      b then other else other $               E -> b
$ S' S' S then b      b then other else other $               match b
$ S' S' S then        then other else other $                 match then
$ S' S' S             other else other $                      S -> other
$ S' S' other         other else other $                      match other
$ S' S'               else other $                            S' -> else S
$ S' S else           else other $                            match else
$ S' S                other $                                 S -> other
$ S' other            other $                                 match other
$ S'                  $                                       S' -> ε
$                     $                                       match (accept)
```

关键的一行是 $S'$ 面对 `else` 而栈上*有两个* $S'$ 符号的那一行：上面那个属于内层的 `if`（它后入栈），语法分析器用 $S' \to \mathbf{else}\ S$ 展开它。所以 `else` 挂到内层 `if` 上，正如“最近 `if`”规则的要求；外层 `if` 的 $S'$ 后来面对 `$`，推出 $\varepsilon$。倘若我们偏向 $S' \to \varepsilon$，内层的 $S'$ 就会消失，外层的那个将拿走 `else`——那便是另一种读法。
:::
:::

## 递归下降实务

生产级编译器很少使用 LL(1) 表。GCC 的 C 与 C++ 前端以及 Clang 的都是**手写递归下降语法分析器**，Go、Rust、Swift、TypeScript 以及多数 JavaScript 引擎的也一样。（GCC 在 2004 年的 3.4 版把手写语法分析器换掉了 Bison 生成的 C++ 语法分析器，又在 2006 年的 4.1 版换掉了 C 语法分析器。）FIRST 集与 FOLLOW 集其实还在，只是变成了决定接下来分析什么的 `if` 和 `switch` 语句；而手写代码有三大好处：在某个构造需要时可以用更多前瞻或语义信息，可以产出出色的错误信息并优雅地从错误中恢复，而且它是谁都能调试的普通代码。

表达式用这样一种技术来分析：一个函数加一张优先级表便处理全部双目运算符，而不必每个优先级一层文法。Mini 有十三个双目运算符、六个优先级层；若用分层文法就要六个互相递归的函数。

::: algorithm 优先级爬升 {#alg-precedence}
`expr(p)` 分析最长的表达式，其顶层双目运算符的优先级全都至少为 $p$：
1. $\mathit{left} \gets$ `unary()`（一个运算对象，可能带前缀运算符）。
2. 当下一个单词符号是双目运算符 $\mathit{op}$ 且 $\mathrm{prec}(\mathit{op}) \ge p$：
    1. 消耗 $\mathit{op}$；
    2. 左结合的 $\mathit{op}$ 取 $\mathit{right} \gets$ `expr(prec(op) + 1)`（右结合的取 `expr(prec(op))`）；
    3. $\mathit{left} \gets (\mathit{op}, \mathit{left}, \mathit{right})$。
3. 返回 $\mathit{left}$。整个表达式即 `expr(1)`。
:::

以 $\mathrm{prec}(\mathit{op}) + 1$ 作递归调用，会停在下一个优先级相等或更低的运算符处，后者再由外一层的循环接手——这正是 `8 - 3 - 2` 分组为 `(8 - 3) - 2` 的缘由。对 Mini（其词法分析器就是 [[compilers/lexical-analysis#ex-scan-mini]] 的那个）：

```python
BINARY = {"||": 1, "&&": 2, "==": 3, "!=": 3, "<": 4, "<=": 4, ">": 4, ">=": 4,
          "+": 5, "-": 5, "*": 6, "/": 6, "%": 6}     # 全部左结合

class Parser:
    def __init__(self, text):
        self.toks = list(scan(DFA, text))
        self.toks.append(("EOF", "end of input", self.toks[-1][2] if self.toks else 1))
        self.pos = 0
    def peek(self): return self.toks[self.pos][1] if self.toks[self.pos][0] == "OP" else None
    def next(self): self.pos += 1; return self.toks[self.pos - 1]
    def expect(self, lexeme):
        kind, lex, line = self.next()
        if lex != lexeme: raise SyntaxError(f"line {line}: expected {lexeme!r}, found {lex!r}")

    def expr(self, min_prec=1):        # 优先级爬升
        left = self.unary()
        while (op := self.peek()) in BINARY and BINARY[op] >= min_prec:
            self.next()
            right = self.expr(BINARY[op] + 1)   # +1：左结合
            left = (op, left, right)
        return left
```

运算对象是数、`true` 和 `false`、变量、调用 `f(a, b)` 和带括号的表达式，前面可带一元 `-` 或 `!`。变量与调用之间的抉择靠查看标识符*后面*的单词符号——多一个向前查看符号，手写语法分析器毫不费力就拿到了。

```python
    def unary(self):
        if self.peek() in ("-", "!"):
            op = self.next()[1]; return (op, self.unary())
        return self.primary()
    def primary(self):
        kind, lex, line = self.next()
        if kind == "NUM": return int(lex)
        if kind in ("TRUE", "FALSE"): return kind == "TRUE"
        if kind == "ID":
            if self.peek() != "(": return lex
            self.next(); args = []
            while self.peek() != ")":
                args.append(self.expr())
                if self.peek() != ")": self.expect(",")
            self.next(); return ("call", lex, args)
        if lex == "(":
            e = self.expr(); self.expect(")"); return e
        raise SyntaxError(f"line {line}: unexpected {lex!r}")
```

::: example 优先级爬升的现场 {#ex-climb}
分析 `a + b * c - d`、`x < y + 1 && !done || f(a, b - 1) == 0`、`8 - 3 - 2`、`-(a + b) * c` 和有错的 `(a + b * c`。
::: solution
```text
('-', ('+', 'a', ('*', 'b', 'c')), 'd')
('||', ('&&', ('<', 'x', ('+', 'y', 1)), ('!', 'done')), ('==', ('call', 'f', ['a', ('-', 'b', 1)]), 0))
('-', ('-', 8, 3), 2)
('*', ('-', ('+', 'a', 'b')), 'c')
SyntaxError: line 1: expected ')', found 'end of input'
```

跟着第一个走一遍。`expr(1)` 读入 `a`，看到 `+`（优先级 5），为右运算对象调用 `expr(6)`。那次调用读入 `b`，看到 `*`（优先级 $6 \ge 6$），调用 `expr(7)` 返回 `c`，搭出 `b * c`，然后看到优先级 $5 < 6$ 的 `-`，返回。回到外层，树是 `a + (b * c)`；循环看到 `-`（优先级 $5 \ge 1$），用 `expr(6)` 分析 `d`，搭出 `(a + b*c) - d`。第二个表达式里，比较结合得比 `&&` 紧，`&&` 又比 `||` 紧，与 C 一致。错误报在语法分析器知道出了问题的那个最早的单词符号处。
:::
:::

::: warning 优先级不等于求值顺序
常见的误读是认为优先级规定了先算什么。不是：它规定表达式如何*分组*成树。在 `f() + g() * h()` 中，分组是 `f() + (g() * h())`，但 C 并不说 `f` 在 `g` 和 `h` 之前还是之后被调用——编译器可以自己选——而 Java 和 Python 要求从左到右。结合性说的也是分组而非时序。求值顺序是语言语义的另一条规则，稍后由代码生成器实现（[[compilers/compiler-structure#thm-gen-correct]] 对运算对象选了从右到左）。
:::

### 错误恢复

在第一个语法错误处就停下的编译器让人恼火；在第一个错误之后接着报告一百个假错误的编译器更糟。最简单的稳健策略是**恐慌模式恢复**：某个构造的过程检测到错误时，先报告它，然后跳过单词符号，直到找到一个属于**同步集**的单词符号——通常取该构造 FOLLOW 中的单词符号以及开启新语句或闭合块的单词符号（`;`、`}`）——之后装作该构造已被分析过一样继续。对 C 风格语言的语句，跳到下一个 `;` 或 `}` 效果很好：语法分析器在下一条语句处重新同步，此后它报告的错误多半是真的。手写语法分析器还会为常见失误加专门的修补（“表达式后缺少 `;`”——插上一个继续分析），这也是编译器作者偏爱手写的原因之一。

::: widget graph
nodes: E@0,0; T@2,0; F@4,0; A@0,2; B@2,2
edges: E>E; E>T; T>T; T>F; A>B; B>A
algorithm: topo
caption: 两个文法的**左角图**：边 $X \to Y$ 表示某条产生式 $X \to \alpha Y \beta$ 的 $\alpha$ 可为空，于是 $Y$ 可以出现在 $X$ 所推之串的最左端。上：左递归文法 [[#eq-lr-grammar]]，其中 $E \to E+T \mid T$ 和 $T \to T*F \mid F$ 在 $E$ 和 $T$ 处各给出一个圈。下：$A \to B\,a \mid c$、$B \to A\,b \mid d$，其左递归是间接的。一个非终结符左递归，恰好当它位于此图的一个圈上。运行拓扑排序：它卡住了，因为每个剩下的顶点要么在圈上、要么依赖于某个圈。对变换后的文法 [[#eq-ll-grammar]]，图只剩边 $E \to T \to F$，排序成功——这也正是 FIRST 集能够一遍算完的次序。
:::

::: history
递归下降与用文法编译同龄：Peter Lucas 在 1961 年描述了 ALGOL 60 的一个递归下降语法分析器，Edgar Irons 的语法制导 ALGOL 编译器（1961 年）与 Melvin Conway 的可分割转换图编译器的设计（1963 年）探索了相关思想。Philip Lewis 与 Richard Stearns 在“Syntax-directed transduction”（*Journal of the ACM*，1968 年）中定义了 LL($k$) 文法，高德纳（Knuth）的“Top-down syntax analysis”（1971 年）发展了其理论。Niklaus Wirth 的 Pascal 编译器（自 1970 年起）把手写递归下降定为“为便于分析而设计的语言”的标准。Vaughan Pratt 的“Top down operator precedence”（POPL 1973）引入了运算符驱动的语法分析，它以优先级爬升的形式（Keith Clarke 1986 年描述）支撑着今天多数手写语法分析器的表达式部分。Terence Parr 的 ANTLR 生成器（自 1989 年）让生成的 LL 语法分析器重新广泛使用；其 LL(*)（2011 年）与 ALL(*)（2014 年，与 Sam Harwell、Kathleen Fisher 合作）策略能以任意长前瞻在产生式之间作抉择。
:::

## 后续内容

LL(1) 分析在一个构造的*开头*、凭一个单词符号决定用哪条产生式。[[compilers/bottom-up-parsing]] 把决定推迟到*末尾*，即整个右部都已见过之后；这直接处理左递归文法，覆盖严格更大的文法类，代价是语法分析器要生成而非手写。[[compilers/semantic-analysis]] 为 Mini 的递归下降语法分析器补上语句与函数，并从中构建抽象语法树。

::: summary
- 自顶向下的语法分析器从根搭语法分析树，凭下一个单词符号选定每条产生式。递归下降为每个非终结符配一个过程。
- **左递归**使自顶向下分析打转；可把 $A \to A\alpha \mid \beta$ 改写成 $A \to \beta A'$、$A' \to \alpha A' \mid \varepsilon$ 来消除（[[#alg-left-rec]]），或实现成一个循环。**提取左公因子**把抉择推迟到各分支出现分歧之处。
- **可为空**、**FIRST** 与 **FOLLOW**（[[#def-first-follow]]）是递归集合方程的最小解，用迭代到不动点来算（[[#thm-ff-fixpoint]]）。
- 文法是 **LL(1)** 的，如果由 FIRST（可为空的产生式再加 FOLLOW）填出的分析表没有冲突（[[#def-ll1]]）；该表驱动一个线性时间语法分析器，输出最左推导（[[#alg-ll1]]、[[#thm-ll1-correct]]）。
- LL(1) 文法无二义且不左递归（[[#thm-ll1-unamb]]）；悬挂 else 冲突通过偏向 `else` 产生式来裁决。
- 真实编译器用手写递归下降，表达式用**优先级爬升**（[[#alg-precedence]]），并在同步单词符号处作恐慌模式恢复。优先级决定分组，不决定求值顺序。
:::

## 习题

::: exercise 手算 FIRST 与 FOLLOW {level=1}
对文法 $S \to A\,B\,c$、$A \to a\,A \mid \varepsilon$、$B \to b \mid \varepsilon$，计算每个非终结符的可为空、FIRST 与 FOLLOW，并给出 LL(1) 表。该文法是 LL(1) 的吗？
::: solution
可为空：$A$、$B$（$S$ 不可为空，因为有 $c$）。$\mathrm{FIRST}(A) = \set{a}$，$\mathrm{FIRST}(B) = \set{b}$，$\mathrm{FIRST}(S) = \set{a, b, c}$（$A$ 和 $B$ 都可能消失）。$\mathrm{FOLLOW}(S) = \set{\$}$，$\mathrm{FOLLOW}(A) = \mathrm{FIRST}(Bc) = \set{b, c}$，$\mathrm{FOLLOW}(B) = \set{c}$。表：$M[S, a] = M[S, b] = M[S, c] = S \to ABc$；$M[A, a] = A \to aA$；$M[A, b] = M[A, c] = A \to \varepsilon$；$M[B, b] = B \to b$；$M[B, c] = B \to \varepsilon$。没有表项被填两次，所以文法是 LL(1) 的。`first_follow` 给出相同的集合。
:::
:::

::: exercise 数分析表的表项 {level=1 check="13"}
[[#eq-ll-grammar]] 的 LL(1) 表中有多少个表项放着产生式（不是错误表项）？（填入数字。）
::: solution
看表：$E$ 行 2 个，$E'$ 行 3 个，$T$ 行 2 个，$T'$ 行 4 个，$F$ 行 2 个，$5 \times 6 = 30$ 个表项中共 $13$ 个。其余 17 个是错误，这就是分析表要压缩存储的原因。
:::
:::

::: exercise 消除左递归 {level=1}
用 [[#alg-left-rec]] 消除 $A \to A\,a \mid A\,b \mid c \mid d$ 的左递归，并检查两个文法都生成 $(c \mid d)(a \mid b)^*$。然后把相应的递归下降过程写成一个搭左倾树的循环。
::: solution
$A \to c\,A' \mid d\,A'$，$A' \to a\,A' \mid b\,A' \mid \varepsilon$。原文法中，每条推导都先把左递归产生式用若干次、再以 $c$ 或 $d$ 收尾，产出 $(c \mid d)$ 后跟一串 $a$ 和 $b$；新文法中 $A'$ 恰好生成 $(a \mid b)^*$。过程：

```python
def A():
    tok = advance()
    if tok not in ("c", "d"): raise SyntaxError(tok)
    tree = tok
    while peek() in ("a", "b"):
        tree = (tree, advance())      # 左倾：((c, a), b)
    return tree
```
:::
:::

::: exercise 是不是 LL(1)？ {level=2}
判定每个文法是否为 LL(1)；对每个冲突给出表项和两条产生式，若可行，把文法变换成同一语言的 LL(1) 文法。(a) $S \to a\,S\,b \mid a\,b$。(b) $S \to A\,a \mid b$、$A \to b\,A \mid \varepsilon$。(c) $L \to L\,,\,\mathrm{id} \mid \mathrm{id}$。
::: solution
(a) 两条产生式都以 $a$ 开头：冲突在 $M[S, a]$。提取左公因子：$S \to a\,R$、$R \to S\,b \mid b$。此时 $\mathrm{FIRST}(Sb) = \set{a}$、$\mathrm{FIRST}(b) = \set{b}$：LL(1)。

(b) $\mathrm{FIRST}(Aa) = \set{a, b}$（因为 $A$ 可为空）而 $\mathrm{FIRST}(b) = \set{b}$：冲突在 $M[S, b]$。（$A$ 自己没问题：$\mathrm{FOLLOW}(A) = \set{a}$ 与 $\mathrm{FIRST}(bA)$ 不相交。）语言是 $\set{b^k a : k \ge 0} \cup \set{b}$。它的 LL(1) 文法：$S \to a \mid b\,R$、$R \to \varepsilon \mid a \mid b\,P$、$P \to b\,P \mid a$ —— 第一个 $b$ 之后，要么停，要么读一个 $a$，要么再读若干个必须以 $a$ 收尾的 $b$。由于 $\mathrm{FOLLOW}(R) = \set{\$}$，三条 $R$-产生式分别由 $\$$、$a$、$b$ 选定；`ll1_table` 对原文法报告一个冲突 `[('S', 'b', 0, 1)]`，对这个文法一个也没有。

(c) 左递归：冲突在 $M[L, \mathrm{id}]$。消除它：$L \to \mathrm{id}\,L'$、$L' \to ,\,\mathrm{id}\,L' \mid \varepsilon$，且 $\mathrm{FOLLOW}(L') = \mathrm{FOLLOW}(L)$，它（当 $L$ 是开始符号时）是 $\set{\$}$，与 $\set{,}$ 不相交：LL(1)。
:::
:::

::: exercise 一个右结合运算符 {level=2}
给优先级爬升语法分析器添加乘方运算符 `^`，比 `*` 结合更紧、右结合，使 `2 ^ 3 ^ 2` 表示 `2 ^ (3 ^ 2)`。另外，请说明 `-2 ^ 2` 应当如何分析并给出理由，让你的语法分析器照此实现。
::: solution
给 `^` 优先级 7 并标记为右结合；在循环中对它改用 `BINARY[op]` 而不是 `BINARY[op] + 1` 作递归参数：

```python
RIGHT = {"^"}
...
            right = self.expr(BINARY[op] + (0 if op in RIGHT else 1))
```

（并在词法分析器的运算符模式里加上 `^`）。优先级 $7$ 配上递归调用 `expr(7)`，内层调用便会接受又一个 `^`，于是 `2 ^ 3 ^ 2` 给出 `('^', 2, ('^', 3, 2))`。数学上 $-2^2 = -4$：乘方比一元负号结合得更紧。在我们的语法分析器里，`unary` 先解析 `-`、再调用 `unary()`，所以它会给出 `(-2) ^ 2`。要遵循数学惯例，就让 `unary` 用 `self.expr(7)` 分析它的运算对象（只含 `^` 的表达式）：`-2 ^ 2` 于是成为 `('-', ('^', 2, 2))`。Python 作的是同样选择：`-2 ** 2 == -4`。
:::
:::

::: exercise 恐慌模式恢复 {level=2}
Mini 的语句分析器能处理 `let x = e;`、`x = e;` 和 `return e;`。写一个 `statements()` 过程：当某条语句内部抛出 `SyntaxError` 时，记录消息，跳过单词符号直到并包括下一个 `;`（或直到 `}` 或输入末尾），然后继续。对输入 `let x = 1 +; y = (2; return x;` 会报告几个错误？检查恢复不会跳过合法的语句。
::: solution
```python
def statements(self):
    stmts, errors = [], []
    while self.toks[self.pos][0] != "EOF" and self.peek() != "}":
        try:
            stmts.append(self.statement())
        except SyntaxError as e:
            errors.append(str(e))
            while self.toks[self.pos][0] != "EOF" and self.peek() not in (";", "}"):
                self.pos += 1                 # 跳到同步单词符号
            if self.peek() == ";": self.pos += 1
    return stmts, errors
```

这里有个坑。若语法分析器完全照正文原样，输出是

```text
([('return', 'x')], ["line 1: unexpected ';'"])
```

——一个错误，而语句 `y = (2;` 已悄然蒸发。原因：`primary` 在抛出异常*之前*（调用 `next` 时）已经*消耗*了肇事的 `;`，于是恢复循环跳到了*下一个* `;`，吞掉了整整一条语句。`expect` 有同样的毛病。检测错误的代码必须把肇事的单词符号留在输入里：

```python
def expect(self, lexeme):
    kind, lex, line = self.toks[self.pos]
    if lex != lexeme: raise SyntaxError(f"line {line}: expected {lexeme!r}, found {lex!r}")
    self.pos += 1
```

并把 `primary` 的最后改写成 `self.pos -= 1; raise SyntaxError(…)`。现在语法分析器报告两个错误，各自在正确的位置，并且仍然解析出第三条语句：

```text
([('return', 'x')], ["line 1: unexpected ';'", "line 1: expected ')', found ';'"])
```

同步单词符号取自 FOLLOW(statement) 和语句终止符。
:::
:::

::: exercise FIRST/FOLLOW 迭代的终止轮数 {level=3}
(a) 证明最坏情形下 `first_follow` 的 `while` 循环需要随文法规模增长的轮数：对每个 $n$，构造一个文法，使产生式按给定顺序处理时它至少要 $n$ 轮。(b) 说明当左角图（见插图）无环时，如何对非终结符单遍计算 FIRST；一般情形如何借助强连通分量在线性时间内完成。
::: solution
(a) 取 $A_1 \to A_2$、$A_2 \to A_3$、…、$A_{n-1} \to A_n$、$A_n \to a$，按此顺序列出。第 1 轮只有 $A_n$ 收到 $a$（处理它的产生式时，前面的都已带着空集合处理过了）。第 2 轮 $A_{n-1}$ 收到它，依此类推：$A_1$ 在第 $n$ 轮才拿到 $a$，第 $n + 1$ 轮才发现再无变化。（若按相反次序处理产生式，只需两轮——次序要紧，这一点我们在 [[compilers/dataflow-optimisation]] 的工作列表处还会回来。）

(b) $\mathrm{FIRST}(X)$ 是 $X$ 的各产生式左角处的终结符之并，再加上每条左角边 $X \to Y$ 对应的 $\mathrm{FIRST}(Y)$。图无环时，按逆拓扑序处理非终结符（汇点先算）：轮到 $X$ 时，它需要的所有 $\mathrm{FIRST}(Y)$ 都已定稿，一遍足矣。一般地，同一个强连通分量里的所有非终结符有相同的 FIRST 集（每个都是其他成员的左角），所以先求强连通分量（Tarjan 算法或 Kosaraju 算法），给每个分量赋其成员左角处直接出现的终结符之并，再沿分量的无环图按逆拓扑序传播。集合以位向量存储时，总时间为 $O((\lvert V\rvert + \lvert R\rvert)\,\lvert \Sigma \rvert / w)$，$w$ 为字长。同样的方法可算 FOLLOW，改用规则 4 的图（当 $\mathrm{FOLLOW}(A) \subseteq \mathrm{FOLLOW}(B)$ 时连 $A \to B$）。
:::
:::

::: exercise 优先级爬升的正确性 {level=3}
考虑由运算对象 $x$ 和优先级取自 $\set{1, \dots, m}$ 的左结合双目运算符构成的表达式。对每个优先级为 $p$（$1 \le p \le m$）的运算符 $\mathit{op}$ 定义分层文法 $E_p \to E_p \mathbin{\mathit{op}} E_{p+1} \mid E_{p+1}$，且 $E_{m+1} \to x$。证明：对每个合法表达式的输入和每个 $p$，从一个 $E_p$ 开始的位置发起的调用 `expr(p)` 恰好消耗可由 $E_p$ 推出的最长前缀，并返回该前缀的（唯一的）语法分析树所给出的语法树。
::: solution
对 $m + 1 - p$ 归纳，其内再对消耗前缀的长度归纳。

*情形 $p = m + 1$*。`expr(m+1)` 读一个运算对象便停，因为没有优先级 $\ge m+1$ 的运算符。可由 $E_{m+1}$ 推出的最长前缀就是这一个运算对象。正确。

*情形 $p \le m$*。可由 $E_p$ 推出的串是序列 $u_0\ \mathit{op}_1\ u_1 \cdots \mathit{op}_k\ u_k$，其中每个 $u_i$ 可由 $E_{p+1}$ 推出，每个 $\mathit{op}_i$ 的优先级恰为 $p$；其树（出自左递归规则）为 $((u_0\ \mathit{op}_1\ u_1)\ \mathit{op}_2\ u_2)\cdots$。现在看 `expr(p)`。它先读一个运算对象 $x_0$，然后在循环里消耗任意一个优先级 $q \ge p$ 的运算符 $\mathit{op}$，并用 `expr(q+1)` 跟进。我们断言：当循环见到优先级 $> p$ 的运算符就继续跑完之后，所搭的树是可由 $E_{p+1}$ 推出的最长前缀的树：事实上，阈值为 $p$ 的同一个循环，只要它见到的运算符优先级 $\ge p+1$，行为就与 `expr(p+1)` 完全一致（代码相同，且递归调用 `expr(q+1)` 不依赖阈值）——于是由对 $p + 1$ 的归纳假设，它消耗了最长的 $E_{p+1}$-前缀 $u_0$ 并搭好了它的树。下一个单词符号此时要么不是运算符，要么是优先级 $\le p$ 的运算符。若其优先级 $< p$ 或它不是运算符，`expr(p)` 返回 $u_0$，而 $u_0$ 此时就是最长的 $E_p$-前缀（$k = 0$）。若它是优先级恰为 $p$ 的运算符 $\mathit{op}_1$，循环消耗它并调用 `expr(p+1)`，由假设消耗最长的 $E_{p+1}$-前缀 $u_1$ 并返回其树；循环搭出 $(u_0\ \mathit{op}_1\ u_1)$ 并继续，此后这棵树充当 `left`——从这里同一段论证可再套用一次，因为 `left` 扮演着 $u_0$ 的角色，而下一个运算符的优先级 $\le p$（否则 `expr(p+1)` 早已把它消耗掉）。过程在下一个单词符号不是优先级 $\ge p$ 的运算符时结束，此时恰好搭出 $u_0\ \mathit{op}_1 \cdots \mathit{op}_k\ u_k$——最长的 $E_p$-前缀——的左倾树。终止性由每次迭代都消耗单词符号得出。
:::
:::
