[[data-structures/stacks-queues]] 中的括号匹配检查器把输入串从左到右读一遍，并借助一个栈：遇到左括号就压栈，遇到右括号就弹栈，结束时栈为空则接受。它的控制部分是有限的——“正在读”、“已拒绝”——全部无界内存都在栈里，而栈只能访问栈顶。有限自动机干不了这件事（[[theory-of-computation/non-regular-languages]]），但有限自动机*加上一个栈*可以。

这个组合就是**下推自动机**。它与上下文无关文法的关系，恰如有限自动机与正则表达式之间的关系：本章的中心定理是，一个语言是上下文无关的当且仅当某个下推自动机识别它。一个方向给出一种分析方法——下推自动机能模拟最左推导，这是一切自顶向下分析器背后的思想。另一个方向说明栈恰好是文法所需要的全部内存。然后，与正则语言一样，我们找到它的极限：一条**上下文无关语言的泵引理**证明 $\{a^nb^nc^n\}$ 和 $\{ww\}$ 不是上下文无关的，而上下文无关语言对交和补原来并不封闭。

## 下推自动机

**下推自动机**（PDA）有一个有限状态集，把输入从左到右读一遍，并配有一个定义在它自己的**栈字母表** $\Gamma$ 上、大小无界的栈。一步移动中，它可以读一个输入符号或不读，弹出栈顶符号或不弹，压入一个符号或不压，并改变状态。PDA 默认是非确定的——而且与有限自动机不同，这一点是要紧的。

::: definition 下推自动机 {#def-pda}
**下推自动机**是一个 6 元组 $P = (Q, \Sigma, \Gamma, \delta, q_0, F)$，其中 $Q$、$\Sigma$、$q_0$、$F$ 与 NFA 的相同，$\Gamma$ 是有限的**栈字母表**，转移函数为

$$
\delta\colon Q \times \Sigma_\varepsilon \times \Gamma_\varepsilon \to \mathcal{P}(Q \times \Gamma_\varepsilon).
$$

$(r, c) \in \delta(q, a, b)$ 的意思是：在状态 $q$、栈顶为 $b$（若 $b = \varepsilon$ 则不论栈是什么）时，读入 $a$（若 $a = \varepsilon$ 则不读输入），机器可以弹出 $b$、压入 $c$（$c = \varepsilon$ 即不压）并转移到状态 $r$。我们把它画成一条从 $q$ 到 $r$ 的弧，标号为 $a, b \to c$。

$P$ **接受** $w$，若 $w = y_1 \cdots y_m$，每个 $y_i \in \Sigma_\varepsilon$，且存在状态 $r_0, \dots, r_m$ 与栈内容 $s_0, \dots, s_m \in \Gamma^*$，使得 $r_0 = q_0$，$s_0 = \varepsilon$，$r_m \in F$，并且对每个 $i$，存在某个 $(r_{i}, c) \in \delta(r_{i-1}, y_i, b)$ 满足 $s_{i-1} = bt$、$s_{i} = ct$，其中 $t \in \Gamma^*$（栈顶写在前面）。$L(P)$ 是 $P$ 接受的串的集合。
:::

$P$ 的一个**格局**是三元组（状态、剩余输入、栈）。一次计算是一个格局序列，每个格局由前一个经过一次转移得到。注意接受按**终态**定义：结束时栈不必为空（但整个输入必须读完）。机器不能直接检验栈是否为空；常用技巧是先压入一个特殊的**底部标记** $\$$，于是看到栈顶是 $\$$ 就意味着“除此之外栈是空的”。

::: example $0^n1^n$ 的一个 PDA {#ex-pda-0n1n}
给出 $\{0^n1^n : n \ge 0\}$ 的一个 PDA，并演示它在 $0011$ 和 $001$ 上的计算。
::: solution
状态 $q_1$（开始，接受）、$q_2$、$q_3$、$q_4$（接受）；栈字母表 $\{0, \$\}$。转移：

- $q_1 \to q_2$：$\varepsilon, \varepsilon \to \$$（压入底部标记）；
- $q_2 \to q_2$：$0, \varepsilon \to 0$（每个 $0$ 都压栈）；
- $q_2 \to q_3$：$1, 0 \to \varepsilon$（第一个 $1$ 弹掉一个 $0$）；
- $q_3 \to q_3$：$1, 0 \to \varepsilon$（其后每个 $1$ 弹掉一个 $0$）；
- $q_3 \to q_4$：$\varepsilon, \$ \to \varepsilon$（所有 $0$ 都已配对）。

在 $0011$ 上的计算，格局写作（状态，剩余输入，栈且栈顶在左）：

$$
(q_1, 0011, \varepsilon) \vdash (q_2, 0011, \$) \vdash (q_2, 011, 0\$) \vdash (q_2, 11, 00\$) \vdash (q_3, 1, 0\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon).
$$

输入读完且 $q_4 \in F$：接受。在 $001$ 上，机器到达 $(q_3, \varepsilon, 0\$)$；向 $q_4$ 的移动需要栈顶是 $\$$，于是无移动可用，仅有的分支都终止于非接受状态 $q_2$ 或 $q_3$：拒绝。$1$ 之后再出现 $0$，在 $q_3$ 没有可用的转移，所以 $0101$ 之类的串也被拒绝。把 $q_1$ 设为接受状态，是为了让 $\varepsilon$ 被接受。
:::
:::

::: widget graph
nodes: q1@0,0; q2@2.5,0; q3@5,0; q4@7.5,0
edges: q1>q2; q2>q2; q2>q3; q3>q3; q3>q4
algorithm: bfs
start: q1
caption: [[#ex-pda-0n1n]] 中 PDA 的状态图，未画它的标号（图中放不下）：$q_1 \to q_2$ 是 $\varepsilon, \varepsilon \to \$$，$q_2$ 上的自环是 $0, \varepsilon \to 0$，$q_2 \to q_3$ 与 $q_3$ 上的自环是 $1, 0 \to \varepsilon$，$q_3 \to q_4$ 是 $\varepsilon, \$ \to \varepsilon$；$q_1$ 与 $q_4$ 接受。控制部分是一台识别 $0^*1^*$ 的四状态有限自动机——所有的计数都发生在栈上，而图上没有画出栈。
:::

非确定性让 PDA 可以“猜”。偶长回文串 $\{ww^R : w \in \{a, b\}^*\}$ 正需要它：机器必须把前半压栈、边匹配后半边弹栈，而输入中没有任何东西标记正中间的位置。

::: example 猜出正中间 {#ex-pda-wwr}
给出 $\{ww^R : w \in \{a,b\}^*\}$ 的一个 PDA，并在 $abba$ 上运行它。
::: solution
$q_1 \xrightarrow{\varepsilon, \varepsilon \to \$} q_2$；在 $q_2$ 把读到的每个符号都压栈（$a, \varepsilon \to a$ 与 $b, \varepsilon \to b$）；$q_2 \xrightarrow{\varepsilon, \varepsilon \to \varepsilon} q_3$ 猜“已经到达正中间”；在 $q_3$ 每读一个符号就弹掉一个与它相同的符号（$a, a \to \varepsilon$ 与 $b, b \to \varepsilon$）；$q_3 \xrightarrow{\varepsilon, \$ \to \varepsilon} q_4$，接受。

在 $abba$ 上，读完两个符号后猜的分支成功：$(q_2, abba, \$) \vdash (q_2, bba, a\$) \vdash (q_2, ba, ba\$) \vdash (q_3, ba, ba\$) \vdash (q_3, a, a\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon)$。在其他位置猜的分支失败：读完一个符号后猜，则下一个输入 $b$ 与栈顶 $a$ 不匹配。
:::
:::

PDA 可以用在格局图上的搜索来模拟。下面的程序做广度优先搜索；它对此机器会终止，因为除第一次以外的每次压栈都读一个输入符号，所以栈从不长过 $\lvert w\rvert + 1$ 个符号，格局总数有限。（一般的 PDA 可能在 $\varepsilon$-移动上无休止地压栈；一般的模拟器会先把它化成乔姆斯基范式文法，再运行 CYK，见 [[theory-of-computation/context-free-grammars#alg-cyk]]。）

```python
from collections import deque

# 转移：(状态, 输入符号或 "", 弹出符号或 "", 新状态, 压入符号或 "")
WWR = [("q1", "", "", "q2", "$"),                       # 标记栈底
       *[("q2", c, "", "q2", c) for c in "ab"],        # 前半：压栈
       ("q2", "", "", "q3", ""),                       # 猜正中间
       *[("q3", c, c, "q3", "") for c in "ab"],        # 后半：匹配并弹栈
       ("q3", "", "$", "q4", "")]                      # 触到栈底：接受

def accepts(delta, start, accept, w):
    """对格局（状态、位置、栈）做广度优先搜索."""
    first = (start, 0, "")                   # 栈用一个字符串表示，栈顶在末尾
    seen, queue = {first}, deque([first])
    while queue:
        q, i, stack = queue.popleft()
        if i == len(w) and q in accept:
            return True
        for (p, a, pop, r, push) in delta:
            if p != q or (a and (i == len(w) or w[i] != a)):
                continue                     # 状态不对，或输入不匹配
            if pop and not stack.endswith(pop):
                continue                     # 弹不出该符号
            new = (r, i + len(a), stack[:len(stack) - len(pop)] + push)
            if new not in seen:
                seen.add(new); queue.append(new)
    return False

for w in ["", "abba", "abab", "aabbaa", "aab"]:
    print(f"{w!r:9} {accepts(WWR, 'q1', {'q4'}, w)}")
```

```console
$ python3 pda.py
''        True
'abba'    True
'abab'    False
'aabbaa'  True
'aab'     False
```

## 文法与下推自动机等价

我们证明 PDA 恰好识别上下文无关语言。为方便起见，允许 PDA 一步转移压入整个串 $\gamma = c_1 \cdots c_k$，写作 $a, b \to \gamma$（最终 $c_1$ 在栈顶）。这只是一个缩写：用 $k$ 个新状态排成一条链，每个在 $\varepsilon$-移动上压一个符号，效果相同。

::: theorem 从文法到下推自动机 {#thm-cfg-to-pda}
对每个 CFG $G$，存在 PDA $P$ 使 $L(P) = L(G)$。
:::

::: proof
设 $G = (V, \Sigma, R, S)$。该 PDA 有三个主要状态 $q_{\text{start}}$、$q_{\text{loop}}$、$q_{\text{acc}}$（接受），栈字母表为 $V \cup \Sigma \cup \{\$\}$，转移为：

1. $q_{\text{start}} \to q_{\text{loop}}$：$\varepsilon, \varepsilon \to S\$$（先压 $\$$ 再压 $S$，使 $S$ 在栈顶）；
2. 对每条规则 $A \to \gamma$：$q_{\text{loop}} \to q_{\text{loop}}$：$\varepsilon, A \to \gamma$（**展开**：把栈顶的变量替换为一条规则右部，其首符号在栈顶）；
3. 对每个 $a \in \Sigma$：$q_{\text{loop}} \to q_{\text{loop}}$：$a, a \to \varepsilon$（**匹配**：栈顶的终结符必须等于下一个输入符号）；
4. $q_{\text{loop}} \to q_{\text{acc}}$：$\varepsilon, \$ \to \varepsilon$。

这个 PDA 执行一次最左推导，把当前句型中尚未与输入匹配的部分保存在栈上。我们分别证明两个包含关系。

*($\Leftarrow$，$L(G) \subseteq L(P)$。)* 设 $S = \beta_0 \Rightarrow \beta_1 \Rightarrow \cdots \Rightarrow \beta_k = w$ 是一条最左推导。每个 $\beta_j$ 都形如 $x_j A_j \gamma_j$，其中 $x_j \in \Sigma^*$，$A_j$ 是最左变量（$j < k$ 时）。对 $j$ 归纳，PDA 可以到达“已读入 $x_j$、栈上为 $A_j\gamma_j\$$”的格局：从那里，用第 $j+1$ 步所用的规则展开 $A_j$，就把右部放到栈顶；匹配掉如今位于下一个最左变量之前的那些终结符，恰好读入 $x_{j+1}$ 中超出 $x_j$ 的部分。到最后，$w$ 已全部读入，栈上只剩 $\$$，规则 4 接受。

*($\Rightarrow$，$L(P) \subseteq L(G)$。)* 对移动步数归纳：在 $q_{\text{loop}}$ 中每个可达格局（已读 $x$、栈上为 $\alpha\$$）都满足 $S \Rightarrow^* x\alpha$：初始时 $x = \varepsilon$ 且 $\alpha = S$；展开移动把 $\alpha = A\alpha''$ 换成 $\gamma\alpha''$，即多一步推导 $xA\alpha'' \Rightarrow x\gamma\alpha''$；匹配移动把 $(x, a\alpha'')$ 变成 $(xa, \alpha'')$，而 $x\alpha$ 不变。PDA 只有在读完整个 $w$ 且栈顶为 $\$$ 时才接受，即 $\alpha = \varepsilon$，故 $S \Rightarrow^* w$。
:::

这里构造的 PDA 是一台**非确定的自顶向下分析器**：它猜每个变量该用哪条规则。编译器中的递归下降分析器和 LL 分析器以确定性的方式走同样的步子，靠向前查看下一个输入单词符号来选择规则，这对专门设计的文法是可行的。

反过来，我们先把 PDA 化成方便的形式。每个 PDA 都可以在不改变语言的前提下改造成：

1. 只有一个接受状态 $q_{\text{acc}}$；
2. 接受之前把栈清空；
3. 每条转移要么压入一个符号，要么弹出一个符号，不多也不少，且不同时做两者。

（对 1 和 2：从旧的接受状态添加 $\varepsilon$-移动到一个新状态，该状态把栈全部弹光——靠一开始压在底下的底部标记来知道何时停——然后再移动到 $q_{\text{acc}}$。对 3：把一条既弹又压的转移用一条经过新状态的两条转移替代；把一条不弹不压的转移替换为压入一个哑符号再把它弹出。）

::: theorem 从下推自动机到文法 {#thm-pda-to-cfg}
对每个 PDA $P$，存在 CFG $G$ 使 $L(G) = L(P)$。于是，一个语言是上下文无关的当且仅当某个 PDA 识别它。
:::

::: proof
设 $P = (Q, \Sigma, \Gamma, \delta, q_0, \{q_{\text{acc}}\})$ 已具备上述三条性质。对每对状态 $p, q$ 引入一个变量 $A_{pq}$，希望它恰好生成那些能使 $P$ **从空栈的 $p$ 走到空栈的 $q$** 的串 $x$；这样的计算从任一栈 $t$ 之上出发，也把 $P$ 从 $p$ 带到 $q$ 并且原封不动地留下 $t$、从不弹到 $t$ 里面。规则为：

1. 对所有 $p, q, r, s \in Q$、$u \in \Gamma$ 和 $a, b \in \Sigma_\varepsilon$：若 $(r, u) \in \delta(p, a, \varepsilon)$ 且 $(q, \varepsilon) \in \delta(s, b, u)$，添加 $A_{pq} \to aA_{rs}b$；
2. 对所有 $p, q, r \in Q$：$A_{pq} \to A_{pr}A_{rq}$；
3. 对所有 $p \in Q$：$A_{pp} \to \varepsilon$。

开始变量是 $A_{q_0 q_{\text{acc}}}$。由于 $P$ 以空栈开始、接受前清空栈，$L(P)$ 就是使 $P$ 从空栈的 $q_0$ 走到空栈的 $q_{\text{acc}}$ 的串的集合。剩下要证明：$A_{pq} \Rightarrow^* x$ 当且仅当 $x$ 能使 $P$ 从空栈的 $p$ 走到空栈的 $q$。

*若 $A_{pq} \Rightarrow^* x$，则 $x$ 能做到这一点*——对推导步数归纳。一步：规则必是 $A_{pp} \to \varepsilon$，而空输入把 $p$ 带到 $p$。多步：若第一条规则是 $A_{pq} \to aA_{rs}b$，即 $x = ayb$ 且 $A_{rs} \Rightarrow^* y$，则 $P$ 可以读入 $a$、压入 $u$ 并到达 $r$；由归纳假设，读入 $y$ 可从 $r$ 到 $s$ 且不碰 $u$；再读入 $b$、弹出 $u$，到达 $q$ 且栈为空。若第一条规则是 $A_{pq} \to A_{pr}A_{rq}$，即 $x = yz$，则由归纳假设存在计算：在 $y$ 上从 $p$ 到 $r$、在 $z$ 上从 $r$ 到 $q$，两者都从空栈开始、到空栈结束；先后运行它们即可。

*若 $x$ 能做到这一点，则 $A_{pq} \Rightarrow^* x$*——对计算的移动步数归纳。零步：此时 $p = q$，$x = \varepsilon$，且 $A_{pp} \to \varepsilon$。否则第一步不可能是弹出（栈为空），由性质 3 它压入某个 $u$；而最后一步不可能是压入（结束时栈为空），故它弹出某个符号。分两种情形：

- 栈只在开始和结束时为空。则最先压入的符号 $u$ 一直在栈底，直到最后一步被弹出。设第一步读 $a$ 并到达 $r$，最后一步从状态 $s$ 读 $b$。输入 $x = ayb$，而 $y$ 使 $P$ 在 $u$ 始终位于栈底、不被触碰的条件下从 $r$ 走到 $s$——即在相对意义上“以空栈”从 $r$ 到 $s$，且少两步。由归纳假设 $A_{rs} \Rightarrow^* y$，规则 1 给出 $A_{pq} \Rightarrow aA_{rs}b \Rightarrow^* ayb$。
- 栈在某个中间时刻（状态 $r$）变空。则 $x = yz$，其中 $y$ 把 $p$ 带到 $r$、$z$ 把 $r$ 带到 $q$，两者都从空栈到空栈且步数都更少。由归纳假设 $A_{pr} \Rightarrow^* y$ 且 $A_{rq} \Rightarrow^* z$，规则 2 给出 $A_{pq} \Rightarrow A_{pr}A_{rq} \Rightarrow^* yz$。

与 [[#thm-cfg-to-pda]] 合并，PDA 与 CFG 刻画同一批语言。
:::

::: quiz
对一个有 $5$ 个状态的 PDA，[[#thm-pda-to-cfg]] 的构造产生的文法有多少个变量？
- [ ] $5$
- [ ] $10$
- [x] $25$
- [ ] $125$
::: solution
每一*有序*状态对一个变量 $A_{pq}$，故 $5^2 = 25$ 个。**规则**数目更多：仅规则 2 就对每个三元组 $(p, q, r)$ 贡献一条规则，这类规则就有 $125$ 条。
:::
:::

### 确定性下推自动机

若从每个格局至多只有一种移动可行，则称 PDA 是**确定的**（特别地，若某状态在某个栈顶上有 $\varepsilon$-移动，则它在同一栈顶上就没有读输入符号的移动）。确定性 PDA 识别的语言称为**确定性上下文无关语言**（DCFL），它是上下文无关语言的真子集。$\{0^n1^n\}$ 是确定性的（[[#ex-pda-0n1n]] 的机器从无选择）；偶长回文串 $\{ww^R\}$ 是上下文无关的，但可以证明不是确定性的，因为一台边读边必须作出承诺的机器无法知道正中间在哪里。与上下文无关语言不同，DCFL 对补运算封闭，且每个 DCFL 都有无二义文法。它们的重要性在于实用：高德纳的 LR(k) 文法（1965）恰好生成 DCFL（$k = 1$ 时已经足够），Yacc 与 Bison 产生的 LR 分析器就是线性时间解析的确定性 PDA（[[compilers]]）。

::: warning 非确定性对下推自动机是要紧的
对有限自动机，非确定性只带来简洁性、不带来能力（[[theory-of-computation/nondeterminism#thm-subset]]）。对下推自动机，它带来额外的能力：不存在子集构造，因为一组格局无法用单个栈表示——不同的分支需要不同的栈。所以“上下文无关”并不意味着“能以线性时间确定性解析”。一般 CFG 解析使用 CYK、Earley 算法或 GLR，最坏达三次方时间；线性时间解析需要确定性的文法类。
:::

## 上下文无关语言的泵引理

在一棵分析长串的语法分析树中，从根到叶必有一条长路径，而一条长路径必重复出现某个变量。两次出现之间的那部分子树可以被剪掉，也可以被复制粘贴；由于一个变量能推出的东西，另一个（同样的）变量也能推出，得到的仍是一棵合法的语法分析树。与正则情形不同，这里的重复一次泵出*两个*子串，分别位于被重复变量的两侧。

::: theorem 上下文无关语言的泵引理 {#thm-cf-pumping}
若 $L$ 是上下文无关语言，则存在数 $p \ge 1$（泵长度），使得每个满足 $\lvert s\rvert \ge p$ 的 $s \in L$ 都可写成 $s = uvxyz$，其中

1. $\lvert vy\rvert \ge 1$；
2. $\lvert vxy\rvert \le p$；并且
3. 对每个 $i \ge 0$，$uv^ixy^iz \in L$。
:::

::: proof
设 $G$ 是 $L$ 的乔姆斯基范式文法（[[theory-of-computation/context-free-grammars#thm-cnf]]），变量集为 $V$，取 $p = 2^{\lvert V\rvert}$。定义语法分析树的**高度**为从根到叶的最长路径上的边数。

*矮树的生成元串短。* 高度为 $h \ge 1$、生成非空串的语法分析树，其生成元串长度至多 $2^{h-1}$：对 $h$ 归纳，高度 $1$ 的树就是单条规则 $A \to a$，生成元串长 $1$；更高的树，其根规则 $A \to BC$ 的两棵子树高度至多 $h - 1$，故生成元串长至多 $2 \cdot 2^{h-2} = 2^{h-1}$。

现在设 $s \in L$ 且 $\lvert s\rvert \ge p$，任取 $s$ 的一棵语法分析树 $\tau$。由于 $\lvert s\rvert \ge 2^{\lvert V\rvert} > 2^{\lvert V\rvert - 1}$，$\tau$ 的高度至少为 $\lvert V\rvert + 1$。取一条最长的根到叶路径。它至少含 $\lvert V\rvert + 1$ 条边，于是至少含 $\lvert V\rvert + 2$ 个结点，其中只有最后一个（一片叶子）是终结符：即至少 $\lvert V\rvert + 1$ 个变量结点。在路径上**最低**的 $\lvert V\rvert + 1$ 个变量结点中，由鸽笼原理某个变量 $R$ 出现两次。设较高的那次出现是子树 $\tau_1$ 的根，较低的那次是 $\tau_2 \subseteq \tau_1$ 的根。令 $x$ 为 $\tau_2$ 的生成元串，$vxy$ 为 $\tau_1$ 的生成元串；则对适当的 $u, z$ 有 $s = uvxyz$。

*泵。* 把 $\tau_2$ 换成 $\tau_1$ 的一份副本，得到一棵合法的语法分析树（两个根都标着 $R$），生成元串为 $uv^2xy^2z$；重复进行，对每个 $i \ge 2$ 得 $uv^ixy^iz$。把 $\tau_1$ 换成 $\tau_2$，生成元串为 $uxz$，即 $i = 0$ 的情形。

*$\lvert vxy\rvert \le p$。* 从较高的 $R$ 到叶子的路径至多 $\lvert V\rvert + 1$ 条边，因为较高的 $R$ 位于最低的 $\lvert V\rvert + 1$ 个变量结点之中。由于我们选的是 $\tau$ 中的*最长*路径，$\tau_1$ 中不存在比它更长的路径（否则经过它的那条 $\tau$ 中的路径就更长）。于是 $\tau_1$ 的高度至多 $\lvert V\rvert + 1$，生成元串长至多 $2^{\lvert V\rvert} = p$。

*$\lvert vy\rvert \ge 1$。* 较高的 $R$ 有一个变量后代，故它的规则是某条 $R \to BC$，而 $\tau_2$ 位于 $B$ 或 $C$ 的子树之内。另一个孩子推出一个非空串（CNF 中只有开始变量能推出 $\varepsilon$，而它不出现在右部），该串是 $v$ 或 $y$ 的一部分。
:::

量词结构与 [[theory-of-computation/non-regular-languages#thm-pumping]] 相同：要证明 $L$ 不是上下文无关的，对每个 $p$ 选取满足 $\lvert s\rvert \ge p$ 的 $s \in L$，并证明*每个*满足 $\lvert vy\rvert \ge 1$、$\lvert vxy\rvert \le p$ 的拆分 $s = uvxyz$ 都存在某个 $i$ 使 $uv^ixy^iz \notin L$。新的困难在于 $v$ 与 $y$ 可以位于 $s$ 的不同部位，所以证明通常按宽度不超过 $p$ 的窗口 $vxy$ 落在何处来分情形。

::: widget graph
nodes: S@3,4; u@0,0; Rup@3,3; z@6,0; v@1.5,0; Rlow@3,2; y@4.5,0; x@3,0
edges: S-u; S-Rup; S-z; Rup-v; Rup-Rlow; Rup-y; Rlow-x
algorithm: dfs
start: S
caption: [[#thm-cf-pumping]] 论证的形态，示意画法：叶子代表子串 $u, v, x, y, z$，两个顶点 $R_{\text{up}}$ 与 $R_{\text{low}}$ 是同一条根到叶路径上变量 $R$ 的两次出现。较高的 $R$ 推出 $vxy$，较低的 $R$ 推出 $x$。把上面的子树嫁接到下面的位置，得 $uv^2xy^2z$；把下面的嫁接到上面的位置，得 $uxz$。叶子的深度优先次序就是串的次序 $u, v, x, y, z$。
:::

::: example $a^nb^nc^n$ 不是上下文无关的 {#ex-anbncn}
证明 $T = \{a^nb^nc^n : n \ge 0\}$ 不是上下文无关的。
::: solution
设 $T$ 上下文无关，泵长度为 $p$，取 $s = a^pb^pc^p$。任取满足 $\lvert vy\rvert \ge 1$、$\lvert vxy\rvert \le p$ 的拆分 $s = uvxyz$。因为窗口 $vxy$ 长至多 $p$，它不可能同时含 $a$ 和 $c$（最后一个 $a$ 与第一个 $c$ 之间隔着 $p$ 个 $b$）。分两种情形：

- $v$ 或 $y$ 含有两种不同符号。则 $uv^2xy^2z$ 中符号失序（例如出现 $b$ 在 $a$ 之前），不属于 $T$。
- $v$ 与 $y$ 各自由同一种符号重复而成。则两者合起来至多涉及三种符号中的两种，而 $\lvert vy\rvert \ge 1$，所以 $uv^2xy^2z$ 中一种或两种符号比第三种多——不在 $T$ 中。

无论哪种情形，取 $i = 2$ 泵后都离开 $T$：矛盾。
:::
:::

::: example $\{ww\}$ 不是上下文无关的 {#ex-ww}
证明 $W = \{ww : w \in \{0,1\}^*\}$ 不是上下文无关的。（与 $\{ww^R\}$ 对照，后者是上下文无关的。）
::: solution
设 $W$ 上下文无关，泵长度为 $p$；取 $s = 0^p1^p0^p1^p \in W$ 及任一合法拆分 $s = uvxyz$。向下泵：$s' = uxz$，长 $4p - \lvert vy\rvert$。若 $\lvert vy\rvert$ 为奇数，则 $s'$ 长为奇数，不在 $W$ 中。否则写 $\lvert vy\rvert = 2m$，$1 \le m \le p/2$；若 $s' = ww$，则 $\lvert w\rvert = 2p - m$。由 $\lvert vxy\rvert \le p$，分三种情形。

- *$vxy$ 落在前半* $0^p1^p$ 中。则 $s'$ 的后半——它的最后 $2p - m$ 个符号——是未动的 $0^p1^p$ 的一个后缀，以 $1$ 结尾；而前半以第三个块的前 $m$ 个符号收尾，那是 $0$。于是两半在最后一个符号上不同。
- *$vxy$ 落在后半中。* 对称地，$s'$ 的前半是 $0^p1^{p - m}$、以 $0$ 开头，而后半以第二个块的最后 $m$ 个符号开头，那是 $1$。
- *$vxy$ 跨越正中间。* 则它落在中间的 $1^p0^p$ 之内，且 $s' = 0^p1^{j}0^{k}1^p$，$j + k = 2p - 2m$。若 $s' = ww$，则 $w$ 以 $0^p$ 开始（前半以 $s'$ 的前 $2p - m \ge p$ 个符号开始）并以 $1^p$ 结束；于是 $\lvert w\rvert \ge 2p$，但 $\lvert w\rvert = 2p - m < 2p$。

每种情形下 $uxz \notin W$，与泵引理矛盾。
:::
:::

## 封闭性

[[theory-of-computation/context-free-grammars]] 中的文法构造说明上下文无关语言对并、连接和闭包封闭。正则语言的两条封闭性则失效。

::: theorem 对交与补不封闭 {#thm-cf-nonclosure}
上下文无关语言对交运算不封闭，对补运算也不封闭。
:::

::: proof
$A = \{a^nb^nc^m : n, m \ge 0\}$ 与 $B = \{a^mb^nc^n : n, m \ge 0\}$ 都是上下文无关的：$A$ 由 $S \to XC$、$X \to aXb \mid \varepsilon$、$C \to cC \mid \varepsilon$ 生成，$B$ 类似。但 $A \cap B = \{a^nb^nc^n\}$，由 [[#ex-anbncn]] 它不是上下文无关的。若该类对补封闭，则由于它对并封闭，由德摩根律（De Morgan）$A \cap B = \overline{\overline{A} \cup \overline{B}}$ 它对交也封闭——矛盾。
:::

::: theorem 与正则语言求交 {#thm-cf-regular}
若 $L$ 上下文无关而 $R$ 正则，则 $L \cap R$ 上下文无关。
:::

::: proof
设 $P = (Q_P, \Sigma, \Gamma, \delta_P, p_0, F_P)$ 是 $L$ 的一个 PDA，$M = (Q_M, \Sigma, \delta_M, m_0, F_M)$ 是 $R$ 的一个 DFA。构造一个 PDA：状态为 $Q_P \times Q_M$，栈不变，开始状态 $(p_0, m_0)$，接受状态 $F_P \times F_M$。对每条转移 $(p', c) \in \delta_P(p, a, b)$，它有转移 $\bigl((p', m'), c\bigr) \in \delta\bigl((p, m), a, b\bigr)$，其中若 $a \in \Sigma$ 则 $m' = \delta_M(m, a)$，若 $a = \varepsilon$ 则 $m' = m$。DFA 分量跟踪已读入的输入，PDA 分量和栈原封不动地运行，与乘积构造完全一样（[[theory-of-computation/finite-automata#def-product]]）；一个栈就够用，因为两台机器中只有一台用到它。对计算长度归纳，乘积读入 $x$ 后到达 $((p, m), \text{栈 } t)$ 当且仅当 $P$ 在 $x$ 上可到达 $(p, t)$ 且 $m = \hat\delta_M(m_0, x)$。所以它恰好接受 $L \cap R$。
:::

这是证明非上下文无关性的有用工具：$\{w \in \{a,b,c\}^* : \#_a(w) = \#_b(w) = \#_c(w)\}$ 不是上下文无关的，因为它与正则语言 $a^*b^*c^*$ 的交是 $\{a^nb^nc^n\}$。

::: quiz
下列哪些语言是上下文无关的？
- [x] $\{a^ib^jc^k : i = j \text{ 或 } j = k\}$
- [ ] $\{a^nb^nc^n : n \ge 0\}$
- [x] $\{a^nb^mc^md^n : m, n \ge 0\}$
- [ ] $\{a^nb^mc^nd^m : m, n \ge 0\}$
::: solution
第一个是 $\{a^nb^nc^k\}$ 与 $\{a^ib^nc^n\}$ 的并，两者都上下文无关。第三个是嵌套式的——$S \to aSd \mid X$，$X \to bXc \mid \varepsilon$——栈对付得了。第四个是*交叉*的：$a$ 要与 $c$ 配对、$b$ 要与 $d$ 配对，而栈按最近优先配对，无法把两种配对交错进行；用 $s = a^pb^pc^pd^p$ 作泵论证可证明它不是上下文无关的（宽度为 $p$ 的窗口至多碰到两个相邻的块，于是泵会破坏一对配对中的平衡）。
:::
:::

::: history
下推存储由安东尼·奥廷格（Oettinger）（1961）引入自动机理论——他研究它是为了机器翻译中的句法分析——马尔塞尔-保罗·许茨滕贝格（Schützenberger）也独立作了引入；下推自动机与上下文无关文法的等价性由诺姆·乔姆斯基（Chomsky）在“Context-free grammars and pushdown storage”（1962）、罗伯特·伊维（Evey）（1963）以及许茨滕贝格（Schützenberger）（1963）中确立。耶霍舒亚·巴尔-希勒尔（Bar-Hillel）、米哈·珀尔斯（Perles）与埃利·沙米尔（Shamir）在“On formal properties of simple phrase structure grammars”（1961）中证明了上下文无关语言的泵引理与不封闭性结果。西摩·金斯堡（Ginsburg）与希拉·格赖巴赫（Greibach）在 1966 年发展了确定性上下文无关语言理论，包括对补封闭；高德纳（Knuth）的“On the translation of languages from left to right”（1965）引入了 LR(k) 分析。威廉·奥格登（Ogden）在 1968 年强化了泵引理（奥格登引理），它可以证明例如某些语言是天然二义的。
:::

## 后续内容

两条泵引理以及它们的失效之处指向下一个模型。$\{a^nb^nc^n\}$ 和 $\{ww\}$ 对一个拥有普通内存的程序来说很容易：计数，或者比较两半。拥有*两个*栈、或者一条能双向读写磁带的机器可以做到这一点——而且，正如 [[theory-of-computation/turing-machines]] 所示，那样的机器就能做任何计算机能做的事。文法与栈机器的等价也是 [[compilers]] 中解析的基础；“这个 CFG 是否生成所有串？”一类问题的不可判定性在 [[theory-of-computation/reductions]] 中证明。

::: summary
- **下推自动机**是带栈的 NFA；一步移动读一个输入符号或 $\varepsilon$，至多各弹、压一个符号（[[#def-pda]]）。底部标记 $\$$ 让它能察觉空栈。
- **CFG → PDA**（[[#thm-cfg-to-pda]]）：一台非确定的自顶向下分析器，展开栈顶的变量、把终结符与输入匹配。
- **PDA → CFG**（[[#thm-pda-to-cfg]]）：变量 $A_{pq}$ 生成使 PDA 从 $p$ 到 $q$、两端皆空栈的输入。于是 PDA 恰好识别上下文无关语言。
- 与有限自动机不同，**确定性** PDA 弱于非确定的；DCFL（LR 文法）是编译器能以线性时间解析的语言。
- **CFL 泵引理**（[[#thm-cf-pumping]]）：每个长串 $s \in L$ 都可拆成 $uvxyz$，满足 $\lvert vy\rvert \ge 1$、$\lvert vxy\rvert \le p$，且对所有 $i \ge 0$ 有 $uv^ixy^iz \in L$；它证明 $\{a^nb^nc^n\}$ 和 $\{ww\}$ 不是上下文无关的。
- CFL 对并、连接、闭包以及**与正则语言求交**封闭（[[#thm-cf-regular]]），但对交和补不封闭（[[#thm-cf-nonclosure]]）。
:::

## 习题

::: exercise 追踪一个 PDA {level=1}
列出 [[#ex-pda-wwr]] 的 PDA 在 $aabbaa$ 上一次接受计算的全部格局，并解释读完一个符号后就猜正中间的分支为何死掉。
::: solution
$(q_1, aabbaa, \varepsilon) \vdash (q_2, aabbaa, \$) \vdash (q_2, abbaa, a\$) \vdash (q_2, bbaa, aa\$) \vdash (q_2, baa, baa\$) \vdash (q_3, baa, baa\$) \vdash (q_3, aa, aa\$) \vdash (q_3, a, a\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon)$。读完一个符号后猜，得 $(q_3, abbaa, a\$)$；下一个输入 $a$ 匹配并弹出，得 $(q_3, bbaa, \$)$；此时输入 $b$ 与栈顶 $\$$ 不匹配，而向 $q_4$ 的移动会留下未读的输入，所以该分支无法接受。
:::
:::

::: exercise 由 PDA 得到的文法规模 {level=1 check="64"}
一个处于 [[#thm-pda-to-cfg]] 所说规范形式的 PDA 有 $4$ 个状态。该构造产生多少条第 2 型规则（$A_{pq} \to A_{pr}A_{rq}$）？（填入数字。）
::: solution
每个有序状态三元组 $(p, q, r)$ 一条规则：$4^3 = 64$。
:::
:::

::: exercise 设计 PDA {level=1}
描述识别下列语言的 PDA：(a) $\{a^ib^j : i \le j \le 2i\}$；(b) $\{w \in \{a,b\}^* : \#_a(w) = \#_b(w)\}$。
::: solution
(a) 压入 $\$$；然后每个 $a$ 非确定地压入一个或两个标记 $X$；接着每个 $b$ 弹掉一个 $X$；输入读完后见到 $\$$ 即接受。若 $i$ 个 $a$ 压入 $k$ 个标记，则 $i \le k \le 2i$，而 $b$ 的个数必须恰为 $k$。

(b) 栈保存盈余：底部标记之上是一串 $A$（到目前为止 $a$ 比 $b$ 多）或一串 $B$。读 $a$：若栈顶是 $B$ 就弹掉它，否则压入 $A$。读 $b$：对称处理。结束时的栈顶是 $\$$ 就接受。除了对栈顶符号的检验——转移函数直接完成它——这是确定性的。
:::
:::

::: exercise 一个泵证明 {level=2}
证明 $\{a^{n^2} : n \ge 0\}$ 不是上下文无关的，并证明 $\{a^ib^jc^k : i < j < k\}$ 不是上下文无关的。
::: solution
*平方数。* 设泵长度为 $p$，取 $s = a^{p^2}$。任何拆分都满足 $1 \le \lvert vy\rvert \le \lvert vxy\rvert \le p$，且 $uv^2xy^2z = a^{p^2 + \lvert vy\rvert}$，而 $p^2 < p^2 + \lvert vy\rvert \le p^2 + p < (p+1)^2$，不是平方数。

*$i < j < k$。* 取 $s = a^pb^{p+1}c^{p+2}$。若 $v$ 或 $y$ 含有两种符号，向上泵破坏次序。否则 $v$ 与 $y$ 各落在一个块内，而由于窗口 $vxy$ 宽至多 $p$、$b$ 块却有 $p + 1$ 个符号，$vy$ 不可能同时含 $a$ 和 $c$。按 $vy$ 中所含符号分类：

- 含 $b$，可能还有 $a$，但不含 $c$：向上泵；$b$ 的个数至少变成 $p + 2 = k$，$j < k$ 被破坏；
- 含 $b$ 和 $c$：向下泵；$b$ 的个数至多变成 $p = i$，$i < j$ 被破坏；
- 只含 $a$：向上泵；$a$ 的个数至少变成 $p + 1 = j$，$i < j$ 被破坏；
- 只含 $c$：向下泵；$c$ 的个数至多变成 $p + 1 = j$，$j < k$ 被破坏。

每种情形都离开该语言。
:::
:::

::: exercise 与 DFA 作乘积 {level=2}
用 [[#thm-cf-regular]] 证明 $\{w \in \{a,b\}^* : \#_a(w) = 2\,\#_b(w) \text{ 且 } w \text{ 不含 } ba\}$ 是上下文无关的，而 $\{w \in \{a,b,c\}^* : \#_a(w) = \#_b(w) = \#_c(w)\}$ 不是。
::: solution
第一个语言是 $\{w : \#_a = 2\#_b\} \cap a^*b^* = \{a^{2n}b^n\}$；前一个因子是上下文无关的（一台在栈上保存带符号盈余的 PDA，如设计 PDA 那道习题所示，只是每个 $b$ 折成两个 $a$），而 $a^*b^*$ 是正则的，故由定理其交是上下文无关的。它也可以直接由 $S \to aaSb \mid \varepsilon$ 生成。

对第二个：若它上下文无关，则它与正则语言 $a^*b^*c^*$ 的交也上下文无关；而那个交是 $\{a^nb^nc^n\}$，由 [[#ex-anbncn]] 它不是上下文无关的。
:::
:::

::: exercise 文法对应的 PDA {level=2}
把 [[#thm-cfg-to-pda]] 应用于文法 $S \to aSb \mid \varepsilon$，列出它在 $aabb$ 上一次接受计算的格局。
::: solution
转移：压入 $S\$$；展开 $S \to aSb$ 或 $S \to \varepsilon$；匹配 $a$ 与 $b$；弹出 $\$$ 接受。格局（栈顶在左）：$(q_{\text{loop}}, aabb, S\$) \vdash (q_{\text{loop}}, aabb, aSb\$) \vdash (q_{\text{loop}}, abb, Sb\$) \vdash (q_{\text{loop}}, abb, aSbb\$) \vdash (q_{\text{loop}}, bb, Sbb\$) \vdash (q_{\text{loop}}, bb, bb\$) \vdash (q_{\text{loop}}, b, b\$) \vdash (q_{\text{loop}}, \varepsilon, \$) \vdash (q_{\text{acc}}, \varepsilon, \varepsilon)$。展开沿着最左推导 $S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aabb$ 进行。
:::
:::

::: exercise 一元上下文无关语言 {level=3}
证明单字母表 $\{a\}$ 上的每个上下文无关语言都是正则的。（提示：用泵引理证明长度集合最终周期，或者证明长度集合是若干等差数列的有限并。）
::: solution
设 $L \subseteq a^*$ 上下文无关，泵长度为 $p$，令 $N = \{n : a^n \in L\}$。对每个满足 $n \ge p$ 的 $n \in N$，存在 $d \in \{1, \dots, p\}$（取 $d = \lvert vy\rvert$）使得对所有 $k \ge 0$ 都有 $n + kd \in N$（向上泵）。令 $t = p!$，它是每个这样的 $d$ 的倍数；于是对每个满足 $n \ge p$ 的 $n \in N$，$n + t, n + 2t, \dots$ 全在 $N$ 中（作为 $d$ 的整数倍步长）。

对模 $t$ 的每个剩余类 $r$，考察 $N$ 中 $\ge p$ 且 $\equiv r \pmod t$ 的元素。若一个也没有，则什么也不需要做。否则设 $m_r$ 为最小者；由上一段，每个满足 $n \ge m_r$、$n \equiv r$ 的 $n$ 都属于 $N$。于是 $N \cap [p, \infty)$ 至多是 $t$ 个集合 $\{m_r + kt : k \ge 0\}$ 的并，而 $N \cap [0, p)$ 有限。每个集合 $\{a^{m + kt} : k \ge 0\} = a^m(a^t)^*$ 是正则的，正则语言的有限并是正则的，故 $L$ 正则。（同样的结论也可由帕里（Parikh）定理得出。）
:::
:::

::: exercise 交叉依赖 {level=3}
严格证明 $X = \{a^nb^mc^nd^m : m, n \ge 0\}$ 不是上下文无关的。然后解释：$X$ 中“交叉”的样式，对应在一种程序设计语言里检查每个函数调用的实参个数与该函数声明的形参个数相同——这对“该检查是否应放进语法分析器”意味着什么？
::: solution
设 $X$ 上下文无关，泵长度为 $p$，取 $s = a^pb^pc^pd^p$。考虑任一满足 $\lvert vy\rvert \ge 1$、$\lvert vxy\rvert \le p$ 的拆分。若 $v$ 或 $y$ 含两种不同符号，$uv^2xy^2z$ 失序。否则 $v$ 与 $y$ 各在一个块内，而由于窗口宽至多 $p$，$vxy$ 落在两个**相邻**块之内：$ab$、$bc$ 或 $cd$（或者只在一个块内）。取 $i = 2$ 泵会增大一个或两个相邻块的符号数。但配对的是 $(a, c)$ 与 $(b, d)$，它们从不相邻；于是某一对配对中总有一方所在的块增大而另一方不变，$uv^2xy^2z \notin X$。

在一个程序里，声明 `f(x1, ..., xn)` 之后在别处出现的调用 `f(e1, ..., en)`，当多个函数先交错声明再交错调用时，就呈现同样的交叉形状：实参个数必须越过中间的材料两两配对相等。由同类型的论证，这类约束一般不是上下文无关的，这正是编译器不试图在文法中强制它们的原因。语法分析器检查上下文无关的语法，而**语义分析**——符号表与类型检查（[[compilers]]）——在之后检查元数、先声明后使用以及类型。
:::
:::
