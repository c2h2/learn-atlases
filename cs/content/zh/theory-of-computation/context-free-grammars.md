怎样精确地描述哪些串是合法的算术表达式？有限自动机连检查括号是否配对都做不到（[[theory-of-computation/non-regular-languages]]）。然而用语言来描述却既容易又*递归*：表达式是一个数或一个变量，或由运算符连接的两个表达式，或加括号的表达式。**上下文无关文法**正是这样一条递归定义，只不过写成了重写规则的集合：

$$
E \to E + E \mid E \times E \mid (\,E\,) \mid a.
$$

读作“$E$ 可以被替换为 $E + E$，或 $E \times E$，或 $(E)$，或 $a$”。从 $E$ 出发不断重写，直到不再含有 $E$ 为止，产生的恰好是仅有操作数 $a$ 的一切合法表达式。

这类文法由语言学家诺姆·乔姆斯基（Chomsky）引入，用来描述句子结构，不出几年就被用来定义程序设计语言 ALGOL 60 的语法。今天，语言参考手册中的文法就是每个编译器的语法分析器所实现的规格说明（[[compilers]]），文法还刻画了文件格式、查询语言、配置语言和网络协议。本章定义文法及其语言，证明一个文法确实生成我们所声称的语言，研究**语法分析树**与**二义性**问题，把任何文法都化成简单的**乔姆斯基范式**，并用该范式得到 **CYK 算法**——它以立方时间判定任意上下文无关语言的成员关系。

## 文法与推导

::: definition 上下文无关文法 {#def-cfg}
**上下文无关文法**（CFG）是一个 4 元组 $G = (V, \Sigma, R, S)$，其中

1. $V$ 是**变量**（或称**非终结符**）的有限集；
2. $\Sigma$ 是**终结符**的有限集，与 $V$ 不相交；
3. $R$ 是**规则**（或称**产生式**）的有限集，每条规则形如 $A \to \alpha$，其中 $A \in V$，$\alpha \in (V \cup \Sigma)^*$；
4. $S \in V$ 是**开始变量**。
:::

记号 $A \to \alpha_1 \mid \alpha_2$ 表示 $A \to \alpha_1$ 与 $A \to \alpha_2$ 两条规则。按约定，变量用大写字母，终结符用小写字母、数字和符号，希腊字母 $\alpha, \beta, \gamma$ 表示变量与终结符混排的串。

::: definition 文法的推导与语言 {#def-derivation}
若 $A \to \gamma$ 是一条规则，则对任意串 $\alpha, \beta \in (V \cup \Sigma)^*$，称 $\alpha A \beta$ **推出** $\alpha \gamma \beta$，记作 $\alpha A\beta \Rightarrow \alpha\gamma\beta$。记 $\alpha \Rightarrow^* \beta$ 表示 $\alpha = \beta$，或存在序列 $\alpha = \alpha_0 \Rightarrow \alpha_1 \Rightarrow \cdots \Rightarrow \alpha_k = \beta$；这样的序列称为一条**推导**，$k$ 是其长度。满足 $S \Rightarrow^* \alpha$ 的串 $\alpha$ 称为**句型**。**$G$ 生成的语言**是

$$
L(G) = \{ w \in \Sigma^* : S \Rightarrow^* w \}.
$$

若某个 CFG 生成的语言，则称该语言是**上下文无关的**。
:::

“上下文无关”说的是规则的形状：无论变量 $A$ 的左右是什么，都可以用 $A \to \gamma$ 重写它。（乔姆斯基的**上下文相关文法**的规则形如 $\alpha A\beta \to \alpha\gamma\beta$，只能在特定上下文中使用。）

::: example 三个文法 {#ex-three-grammars}
给出下列语言的文法：(a) $\{0^n1^n : n \ge 0\}$；(b) $\{a, b\}$ 上的回文串；(c) 括号平衡串。并从每个文法导出一个串。
::: solution
(a) $S \to 0S1 \mid \varepsilon$。$000111$ 的推导：$S \Rightarrow 0S1 \Rightarrow 00S11 \Rightarrow 000S111 \Rightarrow 000111$。

(b) $P \to aPa \mid bPb \mid a \mid b \mid \varepsilon$。每条规则在两端的同一位置添上同一个符号，或者以放入中间符号或不放任何东西来结束递归。$abbba$：$P \Rightarrow aPa \Rightarrow abPba \Rightarrow abbba$。

(c) $S \to (S)S \mid \varepsilon$：平衡串或者为空，或者由一个左括号、一个平衡串、与之配对的右括号、再加另一个平衡串组成。$(())()$：$S \Rightarrow (S)S \Rightarrow ((S)S)S \Rightarrow (()S)S \Rightarrow (())S \Rightarrow (())(S)S \Rightarrow (())()S \Rightarrow (())()$。

(a) 与 (c) 的语言都不是正则的，所以上下文无关语言严格包含某些非正则语言。
:::
:::

### 证明文法的正确性

文法是一种定义，写出来的文法多生成一点或少生成一点是很容易的。与自动机一样，正确性是一条双向的定理：凡生成的都具有该性质（**可靠性**，通常对推导归纳），凡具有该性质的都被生成（**完备性**，通常对串长归纳）。下面是括号文法的证明。用 $\#_($ 和 $\#_)$ 表示一个串中左右括号的数量。

::: definition 括号平衡串 {#def-balanced-cf}
若 $w \in \{(, )\}^*$ 满足 $\#_(w) = \#_)(w)$，且 $w$ 的每个前缀 $u$ 都满足 $\#_((u) \ge \#_)(u)$，则称 $w$ 是**平衡的**。
:::

::: theorem 括号文法的正确性 {#thm-brackets-grammar}
文法 $S \to (S)S \mid \varepsilon$ 恰好生成一切平衡串。
:::

::: proof
*可靠性。* 对推导长度归纳，证明凡满足 $S \Rightarrow^* w$ 的 $w \in \{(,)\}^*$ 都是平衡的。长度为 $1$ 的推导是 $S \Rightarrow \varepsilon$，而 $\varepsilon$ 是平衡的。更长的推导以 $S \Rightarrow (S)S$ 开始；两份 $S$ 随后分别推导出串 $u$ 和 $v$，各自的推导都更短（整条推导的步子被分给两者，因为两份 $S$ 从不互相干涉），于是 $w = (u)v$，且由归纳假设 $u$ 和 $v$ 平衡。于是 $w$ 满足 $\#_( = \#_)$；而对 $w$ 的前缀：前缀 $($ 的盈余为 $1$；前缀 $(u'$（$u'$ 为 $u$ 的前缀）的盈余为 $1 + (u' \text{ 的盈余}) \ge 1$；前缀 $(u)$ 的盈余为 $0$；前缀 $(u)v'$ 的盈余就是 $v'$ 的盈余，$\ge 0$。

*完备性。* 对 $\lvert w\rvert$ 作强归纳，证明每个平衡串 $w$ 都可推导。若 $w = \varepsilon$，用 $S \to \varepsilon$。否则 $w$ 以 $($ 开头，因为长度为 $1$ 的前缀的盈余必须 $\ge 0$。$w$ 的各前缀的盈余从 $1$ 开始，每读一个符号变化 $\pm 1$，最终回到 $0$；令 $(u)$ 为盈余回到 $0$ 的最短非空前缀，写 $w = (u)v$。在 $u$ 内部，$(u$ 的每个前缀的盈余都 $\ge 1$（此时还没有归零），故 $u$ 的每个前缀的盈余都 $\ge 0$，而 $u$ 的总盈余为 $0$：$u$ 平衡。而 $v$ 也平衡：$v$ 的前缀 $v'$ 与 $w$ 的前缀 $(u)v'$ 盈余相同，故 $\ge 0$，且总盈余为 $0$。两者都比 $w$ 短，故由归纳假设 $S \Rightarrow^* u$ 且 $S \Rightarrow^* v$，于是 $S \Rightarrow (S)S \Rightarrow^* (u)v = w$。
:::

这一论证与 [[data-structures/stacks-queues#thm-brackets]] 中证明基于栈的括号匹配检查器正确的论证完全一样——并非巧合，因为栈与上下文无关文法原来是等价的（[[theory-of-computation/pushdown-automata]]）。

### 正则语言是上下文无关的

::: theorem 每个正则语言都是上下文无关的 {#thm-regular-cf}
对每个 DFA $M = (Q, \Sigma, \delta, q_0, F)$，存在 CFG $G$ 使 $L(G) = L(M)$。
:::

::: proof
为每个状态 $q$ 取一个变量 $R_q$，开始变量 $R_{q_0}$；对每个 $q \in Q$ 和 $a \in \Sigma$ 放规则 $R_q \to a\,R_{\delta(q,a)}$；对每个 $q \in F$ 放规则 $R_q \to \varepsilon$。每个句型都形如 $w R_p$（或是终结符串），因为每条规则重写的都是末尾那唯一的变量。对 $\lvert w\rvert$ 归纳，$R_q \Rightarrow^* wR_p$ 当且仅当 $\hat\delta(q, w) = p$：每一步添加一个符号并转移到后继状态。终结符串 $w$ 可被推导，当且仅当存在带规则 $R_p \to \varepsilon$ 的某个 $p$ 使 $R_{q_0} \Rightarrow^* wR_p \Rightarrow w$，即当且仅当 $\hat\delta(q_0, w) \in F$。
:::

形如每条规则都是 $A \to aB$ 或 $A \to \varepsilon$ 的文法称为**右线性**，它们恰好生成正则语言。结合 [[#ex-three-grammars]] 便知正则语言是上下文无关语言的**真**子集。

## 语法分析树

推导记录了重写变量的先后次序，但对多数目的而言次序无关紧要：$E + E \Rightarrow a + E \Rightarrow a + a$ 与 $E + E \Rightarrow E + a \Rightarrow a + a$ 搭建的是同一个结构。**语法分析树**记录结构而忘掉次序。

::: definition 语法分析树 {#def-parse-tree}
文法 $G$ 的一棵**语法分析树**是一棵有序有根树，其中每个内部结点标以一个变量，每个叶结点标以一个终结符或 $\varepsilon$，并且对每个以 $A$ 为标号、子结点从左到右标号为 $X_1, \dots, X_k$ 的内部结点，$A \to X_1 \cdots X_k$ 是 $G$ 的一条规则（作为唯一子结点的 $\varepsilon$ 叶结点代表规则 $A \to \varepsilon$）。树的**生成元串**（yield）是把叶结点的标号从左到右连成的串。$w$ 的语法分析树指根标号为 $S$、生成元串为 $w$ 的语法分析树。
:::

每条推导 $S \Rightarrow^* w$ 都给出一棵语法分析树（先取一个根 $S$；每步展开一个叶结点），而每棵语法分析树都来自至少一条推导（按与树相容的任意次序展开内部结点）。在同一棵树的诸条推导中，恰有一条是**最左推导**——每步都重写最左边的变量。于是 $w$ 的语法分析树与 $w$ 的最左推导一一对应，讨论文法赋予 $w$ 的*结构*时用哪个都行。这个结构是要紧的：编译器把语法分析树变成抽象语法树并从中生成代码，所以树决定了程序的*含义*。

::: widget graph
nodes: E1@3,4; E2@0,3; +@2,3; E3@4.5,3; a1@0,2; E4@3,2; ×@4.5,2; E5@6,2; a2@3,1; a3@6,1
edges: E1-E2; E1-+; E1-E3; E2-a1; E3-E4; E3-×; E3-E5; E4-a2; E5-a3
algorithm: dfs
start: E1
caption: $a + a \times a$ 在文法 $E \to E + E \mid E \times E \mid (E) \mid a$ 下的一棵语法分析树，其中把 $E$ 和 $a$ 的各份复制编号，使各顶点名字互不相同。根使用 $E \to E + E$，而乘法位于加法的*下方*：这棵树表示 $a + (a \times a)$。从 $E_1$ 开始逐步演示深度优先搜索：顶点的发现次序恰好就是最左推导展开它们的次序，而叶结点按生成元串 $a, +, a, \times, a$ 的次序出现。
:::

## 二义性

::: definition 二义性 {#def-ambiguous}
若 $L(G)$ 中某个串有两棵不同的语法分析树（等价地，两条不同的最左推导），则文法 $G$ 是**二义的**。若一个上下文无关语言的每个文法都是二义的，则称它是**天然二义的**。
:::

引言中的表达式文法是二义的。串 $a + a \times a$ 除了图中那棵以 $E \to E + E$ 为根的树之外，还有第二棵树，它以 $E \to E \times E$ 为根，其左孩子推导出 $a + a$：

::: widget graph
nodes: E1@3,4; E2@1.5,3; ×@4,3; E3@6,3; E4@0,2; +@1.5,2; E5@3,2; a3@6,2; a1@0,1; a2@3,1
edges: E1-E2; E1-×; E1-E3; E2-E4; E2-+; E2-E5; E4-a1; E5-a2; E3-a3
algorithm: dfs
start: E1
caption: 同一串 $a + a \times a$ 的第二棵语法分析树，根为 $E \to E \times E$。它的生成元串不变——从左到右读叶结点——但它把串分组为 $(a + a) \times a$。用这棵树的编译器计算 $1 + 2 \times 3$ 会得到 $(1 + 2) \times 3 = 9$ 而不是 $7$。同一个串有两棵树：文法是二义的。
:::

对表达式的标准补救办法是把优先级和结合性做进文法里，每个优先级层用一个变量：

$$
\begin{aligned}
E &\to E + T \mid T \\
T &\to T \times F \mid F \\
F &\to (\,E\,) \mid a
\end{aligned}
$$ {#eq-expr-grammar}

$E$（表达式）是若干部 $T$（项）之和，$T$ 是若干因子 $F$ 之积，而 $F$ 是一个操作数或一个加括号的表达式。$\times$ 只能在 $T$ 内部引入，所以在 $a + a \times a$ 中乘法被压到加法之下。左递归（$E \to E + T$）使运算符左结合：$a + a + a$ 按 $(a + a) + a$ 分析。这个文法与二义文法生成同一语言且无二义；证明是一个归纳：$w$ 的任何语法分析树顶层的 $+$ 必是 $w$ 中未被括号括住的*最后一个* $+$，项内的 $\times$ 同理，于是分析的每一步都是被强制的。

::: example 分层文法中的最左推导 {#ex-leftmost}
给出 $a + a \times a$ 在 [[#eq-expr-grammar]] 中的最左推导，并解释为什么别无其他。
::: solution
$$
\begin{aligned}
E &\Rightarrow E + T \Rightarrow T + T \Rightarrow F + T \Rightarrow a + T \\
  &\Rightarrow a + T \times F \Rightarrow a + F \times F \Rightarrow a + a \times F \Rightarrow a + a \times a.
\end{aligned}
$$

第一步不可能用 $E \to T$：$T$ 只能推出未加括号的运算符全为 $\times$ 的串，而我们的串有一个未加括号的 $+$。所以用 $E \to E + T$，且产生的这个 $+$ 必须是串中唯一的 $+$，于是 $E$ 推导出 $a$，$T$ 推导出 $a \times a$。推导出 $a$ 的那个 $E$ 必须走 $E \to T \to F \to a$。推导出 $a \times a$ 的那个 $T$ 不能用 $T \to F$（$F$ 要么是 $a$，要么以左括号开头），所以它用 $T \to T \times F$，且所用的是最后一个 $\times$，其余部分随之确定。每一步都恰有一种可能，故最左推导唯一。
:::
:::

::: warning 二义性是文法的性质，且无法自动判定
二义文法常常可以换成同一语言的无二义文法，如上所示——所以二义性通常是文法的性质，而不是语言的性质。但并非总是如此：语言 $\{a^ib^jc^k : i = j \text{ 或 } j = k\}$ 是天然二义的，因为串 $a^nb^nc^n$ 可以“经由 $i = j$”也可以“经由 $j = k$”生成，而且可以证明任何文法都会让其中一些串有两棵树。更糟的是，不存在能判定给定 CFG 是否二义的算法——这是 [[theory-of-computation/reductions]] 中波斯特（Post）对应问题的一个推论。因此语法分析器生成器使用受限的、按构造就无二义的文法类（LL、LR），当文法落在这些类之外时便报告“冲突”。著名的**悬挂 else** 问题——在 `if c1 then if c2 then s1 else s2` 中，`else` 该配给哪个 `if`？——就是条件句自然文法中的一处二义，C、Java 以及 Python 的前辈语言用“`else` 配最近的未配对 `if`”这条规则解决了它。
:::

::: quiz
下列文法中哪些是二义的？
- [x] $S \to SS \mid (S) \mid \varepsilon$
- [ ] $S \to (S)S \mid \varepsilon$
- [x] $S \to aS \mid Sa \mid a$
- [ ] $S \to aSb \mid \varepsilon$
::: solution
在 $S \to SS \mid (S) \mid \varepsilon$ 中，串 $()()()$ 有一棵以 $S \to SS$ 为根、左孩子推导出 $()()$、右孩子推导出 $()$ 的树，还有一棵左孩子推导出 $()$、右孩子推导出 $()()$ 的树——两棵树（而 $\varepsilon$ 有无穷多棵，经由 $S \Rightarrow SS \Rightarrow S \Rightarrow \varepsilon$）。在 $S \to aS \mid Sa \mid a$ 中，串 $aa$ 有树 $S \to aS \to aa$ 和 $S \to Sa \to aa$。文法 $S \to (S)S \mid \varepsilon$ 无二义：在 [[#thm-brackets-grammar]] 的完备性证明中，分解 $w = (u)v$ 是被强制的（盈余第一次归零之处），于是分析的每一步都由之决定。$S \to aSb \mid \varepsilon$ 无二义，因为每个串 $a^nb^n$ 只有一条推导。
:::
:::

## 乔姆斯基范式

一般文法对算法来说不好用：规则可以很长，可以消去变量（$A \to \varepsilon$），还可以把一个变量改名成另一个变量（$A \to B$），于是短串的推导可以任意长。一种范式把这三个麻烦全部去掉。

::: definition 乔姆斯基范式 {#def-cnf}
一个 CFG 处于**乔姆斯基范式**（CNF），若每条规则都是下列形式之一

$$
A \to BC, \qquad A \to a, \qquad S \to \varepsilon,
$$

其中 $A, B, C$ 是变量，$B$ 与 $C$ 都不是开始变量 $S$，$a$ 是终结符，而规则 $S \to \varepsilon$ 只允许对开始变量使用。
:::

在 CNF 文法中，长度为 $n \ge 1$ 的串的任何推导都恰有 $2n - 1$ 步：$n - 1$ 次使用 $A \to BC$（每次使符号数加一，从 $1$ 增到 $n$），$n$ 次使用 $A \to a$（每次把一个变量变成一个终结符）。语法分析树是叶子上方的二叉树。正是这种规律性使 CYK 算法成为可能。

::: theorem 化为乔姆斯基范式 {#thm-cnf}
每个上下文无关语言都由一个处于乔姆斯基范式的文法生成。
:::

::: proof
设 $G = (V, \Sigma, R, S)$ 生成 $L$。我们分五步改造 $G$，每步都保持语言不变。

1. **新开始变量。** 添加新的开始变量 $S_0$ 和规则 $S_0 \to S$。现在开始变量从不出现在任何规则右部。语言不变。

2. **消去 $\varepsilon$-规则。** 能推导出 $\varepsilon$ 的变量称为**可空的**；反复执行“$A$ 有一条规则 $A \to \alpha$ 且 $\alpha$ 的每个符号都可空，则 $A$ 可空”直到再无变化，即可算出可空变量。对每条规则 $A \to \alpha$，把 $\alpha$ 中删去若干可空变量的一次出现所能得到的每个 $\alpha'$（只要 $\alpha' \ne \varepsilon$）都作为规则 $A \to \alpha'$ 加入。然后删去全部规则 $A \to \varepsilon$，并在 $S_0$ 可空时添加 $S_0 \to \varepsilon$。旧文法中任何非空串的推导都可以靠跳过那些最终推导出 $\varepsilon$ 的变量（使用缩短后的规则）来模仿；反过来，每条缩短后的规则都可以在旧文法中靠让被删去的变量推导出 $\varepsilon$ 来模仿。所以生成的非空串相同，而 $\varepsilon$ 被生成当且仅当它原本就被生成。

3. **消去单规则** $A \to B$。对每个 $A$，只用单规则计算满足 $A \Rightarrow^* B$ 的变量 $B$ 的集合（一次图搜索）。对每个这样的配对 $(A, B)$ 和每条非单规则 $B \to \beta$ 添加 $A \to \beta$；然后删去全部单规则。旧文法中的推导按“一截单规则链接一条非单规则”成组，每条链连同其末规则恰对应一条新规则，反之亦然。

4. **处理长规则中的终结符。** 对每个出现在长度至少为 $2$ 的右部中的终结符 $a$，添加新变量 $U_a$ 和规则 $U_a \to a$，并在这些右部中把 $a$ 换成 $U_a$。

5. **拆开长规则。** 把每条规则 $A \to B_1 B_2 \cdots B_k$（$k \ge 3$）替换为规则 $A \to B_1 C_1$、$C_1 \to B_2 C_2$、…、$C_{k-2} \to B_{k-1}B_k$，其中新变量 $C_i$ 在别处不使用。新变量只能在这条链中使用，故语言不变。

第 5 步之后，每条规则都是 $A \to BC$、$A \to a$ 或 $S_0 \to \varepsilon$：长度 $\ge 2$ 的规则只含变量（第 4 步）、长度恰为 $2$（第 5 步），且绝不含 $S_0$（第 1 步）；长度为 $1$ 的规则是终结符规则（第 3 步已消去单规则）；而唯一的 $\varepsilon$-规则是 $S_0 \to \varepsilon$（第 2 步）。第 4、5 步不会产生新的单规则或 $\varepsilon$-规则。
:::

步骤的顺序是要紧的：消去 $\varepsilon$-规则可能产生新的单规则（由 $C$ 可空的 $A \to BC$ 得到 $A \to B$），所以第 3 步要放在第 2 步之后。若一条长规则含有许多可空变量，第 2 步可能使文法规模指数增长；先做第 5 步（二元化）可以避免这一点，并使整个改造保持多项式。

::: example 化括号文法为乔姆斯基范式 {#ex-cnf}
把 $S \to (S)S \mid \varepsilon$ 化为乔姆斯基范式。
::: solution
*第 1 步。* $S_0 \to S$，$S \to (S)S \mid \varepsilon$。

*第 2 步。* $S$ 可空，故 $S_0$ 也可空。把 $(S)S$ 中 $S$ 的一次出现以各种方式删去，得到 $(S)S$、$()S$、$(S)$、$()$。于是 $S \to (S)S \mid ()S \mid (S) \mid ()$，而 $S_0 \to S \mid \varepsilon$。

*第 3 步。* 单规则 $S_0 \to S$ 换成 $S$ 的各规则的副本：$S_0 \to (S)S \mid ()S \mid (S) \mid () \mid \varepsilon$。

*第 4 步。* 新变量 $L \to ($ 和 $R \to )$：$S \to LSRS \mid LRS \mid LSR \mid LR$，$S_0$ 同理（外加 $S_0 \to \varepsilon$）。

*第 5 步。* $LSRS$ 化为 $L X_1$，配合 $X_1 \to S X_2$、$X_2 \to RS$；$LRS$ 化为 $L X_2$（复用 $X_2 \to RS$，无害，因为 $X_2$ 的意思恰好就是 “$RS$”）；$LSR$ 化为 $LX_4$，配合 $X_4 \to SR$。结果为

$$
\begin{aligned}
S_0 &\to LX_1 \mid LX_2 \mid LX_4 \mid LR \mid \varepsilon, &\qquad S &\to LX_1 \mid LX_2 \mid LX_4 \mid LR, \\
X_1 &\to SX_2, & X_2 &\to RS, \qquad X_4 \to SR, \\
L &\to (, & R &\to ).
\end{aligned}
$$
:::
:::

## CYK 算法

给定 CNF 文法 $G$ 和串 $w = a_1 \cdots a_n$，问 $w \in L(G)$？对一般文法盲试推导可能不终止，但在 CNF 下 $w$ 的任何推导都恰有 $2n - 1$ 步，所以穷举搜索会终止——以指数时间。**动态规划**（[[algorithms/dynamic-programming]]）要好得多。关键事实：若 $n \ge 2$ 且 $A \Rightarrow^* a_i \cdots a_j$，则第一步必是某条 $A \to BC$，其中对某个分点 $k$，$B$ 推出前缀 $a_i \cdots a_k$ 而 $C$ 推出其余 $a_{k+1} \cdots a_j$。于是我们对*每个*子串计算能推出它的变量集合，先算最短的子串。

::: algorithm Cocke–Younger–Kasami（CYK）算法 {#alg-cyk}
输入：CNF 文法 $G = (V, \Sigma, R, S)$ 和串 $w = a_1 \cdots a_n$。

1. 若 $n = 0$：接受当且仅当 $S \to \varepsilon$ 是规则。
2. 对 $i = 1, \dots, n$：$T[i, i] \gets \{A : A \to a_i \in R\}$。
3. 对 $\ell = 2, \dots, n$（子串长度），对 $i = 1, \dots, n - \ell + 1$，令 $j = i + \ell - 1$：
   1. $T[i, j] \gets \emptyset$。
   2. 对 $k = i, \dots, j - 1$ 和每条规则 $A \to BC$：若 $B \in T[i, k]$ 且 $C \in T[k+1, j]$，把 $A$ 加入 $T[i, j]$。
4. 接受当且仅当 $S \in T[1, n]$。
:::

::: theorem CYK 的正确性与代价 {#thm-cyk}
[[#alg-cyk]] 运行之后，$A \in T[i, j]$ 当且仅当 $A \Rightarrow^* a_i \cdots a_j$。于是该算法恰好接受 $L(G)$ 中的串。运行时间为 $O(n^3 \cdot \lvert R\rvert)$，空间为 $O(n^2 \lvert V\rvert)$。
:::

::: proof
对 $\ell = j - i + 1$ 归纳。$\ell = 1$：在 CNF 文法中，变量要推出单个终结符 $a$ 只能靠规则 $A \to a$（规则 $A \to BC$ 至少产生两个符号，因为除开始变量外没有变量能推出 $\varepsilon$，而开始变量不出现在任何右部）。故 $A \Rightarrow^* a_i$ 当且仅当 $A \to a_i \in R$ 当且仅当 $A \in T[i,i]$。

设 $\ell \ge 2$：若 $A \in T[i, j]$，则对某个 $k$ 和规则 $A \to BC$ 有 $B \in T[i,k]$、$C \in T[k+1, j]$，于是由归纳假设（两个子串都更短）$A \Rightarrow BC \Rightarrow^* a_i \cdots a_k\, a_{k+1} \cdots a_j$。反过来，若 $A \Rightarrow^* a_i \cdots a_j$ 且 $\ell \ge 2$，第一步不可能是 $A \to a$，故是某条 $A \to BC$；$B$ 与 $C$ 各推出一个非空串（两者都不是开始变量，故都推不出 $\varepsilon$），二者拼接得 $a_i \cdots a_j$，即设 $B \Rightarrow^* a_i \cdots a_k$、$C \Rightarrow^* a_{k+1}\cdots a_j$，其中 $i \le k < j$。由归纳假设 $B \in T[i,k]$ 且 $C \in T[k+1, j]$，于是第 3.2 步会把 $A$ 加入 $T[i,j]$——因为外层循环沿递增的 $\ell$ 进行，较短的子串表项此时早已定型。

对 $\ell, i, k$ 的三重循环共执行 $O(n^3)$ 次迭代，每次把全部规则逐一检查一遍。
:::

该算法是一个识别过程，但只要在每个表项里同时记录每个变量是*如何*得到的（规则和分点 $k$），我们就能重构一棵语法分析树——或者统计语法分析树的数目，从而对这个串检出二义性。下面是对 [[#ex-cnf]] 中括号文法的 CNF 直接实现的代码，子串按起点和长度编号：

```python
from itertools import product

# 括号平衡语言的乔姆斯基范式文法（开始符号 S0）
BINARY = {("L", "X1"): {"S", "S0"}, ("L", "X2"): {"S", "S0"}, ("L", "X4"): {"S", "S0"},
          ("L", "R"): {"S", "S0"}, ("S", "X2"): {"X1"}, ("R", "S"): {"X2"},
          ("S", "R"): {"X4"}}
TERMINAL = {"(": {"L"}, ")": {"R"}}
START, NULLABLE_START = "S0", True            # S0 -> epsilon 是一条规则

def cyk(w):
    n = len(w)
    if n == 0:
        return NULLABLE_START
    # T[i][l] = 能推出从 i 开始、长度为 l 的子串的变量
    T = [[set() for _ in range(n + 1)] for _ in range(n)]
    for i, c in enumerate(w):
        T[i][1] = set(TERMINAL.get(c, ()))
    for l in range(2, n + 1):                 # 子串长度
        for i in range(n - l + 1):            # 起始位置
            for k in range(1, l):             # 左半部分的长度
                for B, C in product(T[i][k], T[i + k][l - k]):
                    T[i][l] |= BINARY.get((B, C), set())
    for l in range(1, n + 1):                 # 打印整个表，短行在前
        print(l, [",".join(sorted(T[i][l])) or "-" for i in range(n - l + 1)])
    return START in T[0][n]

print(cyk("(())()"))
print(cyk("())("))
```

```console
$ python3 cyk.py
1 ['L', 'L', 'R', 'R', 'L', 'R']
2 ['-', 'S,S0', '-', '-', 'S,S0']
3 ['-', 'X4', '-', 'X2']
4 ['S,S0', '-', '-']
5 ['-', 'X1']
6 ['S,S0']
True
1 ['L', 'R', 'R', 'L']
2 ['S,S0', '-', '-']
3 ['X4', '-']
4 ['-']
False
```

字典 `BINARY` 把配对 $(B, C)$ 映到满足 $A \to BC$ 的变量 $A$ 的集合，于是内层循环对每个配对只需一次查表，而不用扫一遍全部规则。

::: example 读 CYK 表 {#ex-cyk-table}
就 $w = (())()$ 解释表在第 $\ell = 2$、$3$、$5$ 行的表项，并说明最后的 $S_0$ 是如何得到的。
::: solution
按程序的做法把位置从 $0$ 开始编号。第 $\ell = 2$ 行：位置 $1$ 处的子串是 $()$，由 $S \to LR$（以及 $S_0 \to LR$）推出；位置 $4$ 处的子串也是 $()$。其余长度为 $2$ 的子串，如 $(($ 和 $))$，什么变量都推不出。第 $\ell = 3$ 行：位置 $1$ 处，$())$ 拆成 $()\,\cdot\,)$，其中 $S \in T[1][2]$、$R \in T[3][1]$，故可用 $X_4 \to SR$。位置 $3$ 处，$)()$ 拆成 $)\,\cdot\,()$，有 $R$ 和 $S$，得到 $X_2 \to RS$。第 $\ell = 5$ 行、位置 $1$：$())()$ 拆成 $()\,\cdot\,)()$，有 $S$ 和 $X_2$，得到 $X_1 \to SX_2$。最后是第 $6$ 行：$(())()$ 拆成 $(\,\cdot\,())()$——即 $L \in T[0][1]$、$X_1 \in T[1][5]$——于是 $S_0 \to LX_1$ 可用：接受。它找到的分析是 $w = (\,u\,)\,v$，其中 $u = ()$、$v = ()$，恰为 [[#thm-brackets-grammar]] 中的分解。
:::
:::

立方时间对自然语言分析和某些程序分析问题是可以接受的，但对要解析数百万行代码的编译器而言太慢了。编译器使用受限文法类——递归下降分析器用 LL(1)，Yacc、Bison 等语法分析器生成器用 LALR(1) 和 LR(1)——它们可由确定性的下推自动机以线性时间解析。莱斯利·瓦利安特（Valiant）在 1975 年证明了一般 CFG 识别可以归约为布尔矩阵乘法，因而耗时 $O(n^{\omega})$，其中 $\omega < 2.38$ 是矩阵乘法的指数；目前还不知道对一切 CFG 都成立的线性时间算法。

::: quiz
在一个乔姆斯基范式文法中，长度为 $7$ 的串的任何推导需要多少步？
- [ ] $7$
- [ ] $12$
- [x] $13$
- [ ] 取决于文法。
::: solution
$2n - 1 = 13$：$6$ 次使用规则 $A \to BC$ 把句型从 $1$ 个符号长到 $7$ 个，$7$ 次使用规则 $A \to a$ 把每个变量变成终结符。
:::
:::

::: history
诺姆·乔姆斯基（Chomsky）在论文“Three models for the description of language”（1956）和专著 *Syntactic Structures*（1957）中定义了短语结构文法与文法类型的层级，并在论文“On certain formal properties of grammars”（1959）中引入了以他命名的范式。约翰·巴克斯（Backus）在 1959 年用类似记号定义了 IAL（ALGOL 58）的语法，彼得·诺尔（Naur）用它编写了《Report on the Algorithmic Language ALGOL 60》（1960）；高德纳（Knuth）后来提议了**巴克斯-诺尔范式**（Backus–Naur form）这个名称。耶霍舒亚·巴尔-希勒尔（Bar-Hillel）、米哈·珀尔斯（Perles）与埃利·沙米尔（Shamir）在 1961 年证明了上下文无关语言的基本封闭性与可判定性结果。三次方时间的成员判定算法由约翰·科克（Cocke）（1960 年代初提出，直到 1970 年科克与施瓦茨（Schwartz）的讲义才发表）、Tadao Kasami（1965）与丹尼尔·扬格（Younger）（1967）各自独立发现。二义性的不可判定性由大卫·坎特（Cantor）与罗伯特·弗洛伊德（Floyd）于 1962 年、乔姆斯基与马塞尔-保罗·许茨滕贝格（Schützenberger）于 1963 年各自独立证明。
:::

## 后续内容

[[theory-of-computation/pushdown-automata]] 给出上下文无关语言的机器模型——带栈的有限自动机——证明它与文法等价，并证明一条泵引理，表明 $\{a^nb^nc^n\}$ 不是上下文无关的。[[compilers]] 为受限文法类构造高效的分析器，[[programming-languages]] 在定义语义之前先用文法定义语法。二义性的不可判定性、CFG 等价问题的不可判定性，以及“CFG 是否生成所有串”的不可判定性，都在 [[theory-of-computation/reductions]] 中证明。

::: summary
- **上下文无关文法** $(V, \Sigma, R, S)$ 每次重写一个变量，与上下文无关；它的语言是能由 $S$ 推出的终结符串的集合（[[#def-cfg]]，[[#def-derivation]]）。
- 证明文法正确要分两个方向：**可靠性**靠对推导归纳，**完备性**靠对串长归纳（[[#thm-brackets-grammar]]）。
- 每个正则语言都是上下文无关的（由 DFA 得右线性文法，[[#thm-regular-cf]]）；$\{0^n1^n\}$ 和平衡括号串是上下文无关的但不是正则的。
- **语法分析树**与最左推导对应；若某个串有两棵，则文法是**二义的**（[[#def-ambiguous]]）。分层文法（[[#eq-expr-grammar]]）编码了优先级与结合性。有些语言是天然二义的，而二义性不可判定。
- 每个 CFL 都有一个处于**乔姆斯基范式**（$A \to BC$、$A \to a$、$S \to \varepsilon$）的文法，办法是引入新开始变量、消去 $\varepsilon$-规则与单规则、拆开长规则（[[#thm-cnf]]）。
- **CYK** 算法通过对子串作动态规划，在 $O(n^3\lvert R\rvert)$ 时间内判定 CNF 文法的成员关系（[[#thm-cyk]]）。
:::

## 习题

::: exercise 构造文法 {level=1}
给出下列语言的上下文无关文法：(a) $\{a^nb^{2n} : n \ge 0\}$；(b) $\{a^ib^j : i \le j\}$；(c) $\{w \in \{a,b\}^* : w = w^R \text{ 且 } \lvert w\rvert \text{ 为偶数}\}$。
::: solution
(a) $S \to aSbb \mid \varepsilon$。(b) $S \to aSb \mid Sb \mid \varepsilon$——或者无二义地写成 $S \to aSb \mid B$，$B \to bB \mid \varepsilon$。(c) $S \to aSa \mid bSb \mid \varepsilon$。
:::
:::

::: exercise CNF 中推导的步数 {level=1 check="11"}
$(())()$ 在 [[#ex-cnf]] 的 CNF 文法中的推导需要多少步？（填入数字。）
::: solution
串长为 $6$，所以 CNF 文法中任何推导都需 $2 \cdot 6 - 1 = 11$ 步：五条二元规则和六条终结符规则。沿 CYK 找到的分析的最左推导是

$$
\begin{aligned}
S_0 &\Rightarrow LX_1 \Rightarrow (X_1 \Rightarrow (SX_2 \Rightarrow (LRX_2 \Rightarrow ((RX_2 \Rightarrow (()X_2 \\
&\Rightarrow (()RS \Rightarrow (())S \Rightarrow (())LR \Rightarrow (())(R \Rightarrow (())(),
\end{aligned}
$$

恰为 $11$ 步：二元规则 $S_0 \to LX_1$、$X_1 \to SX_2$、$S \to LR$、$X_2 \to RS$、$S \to LR$，加上 $L \to ($ 与 $R \to )$ 各三次。
:::
:::

::: exercise 语法分析树与推导 {level=1}
在文法 $E \to E + E \mid E \times E \mid (E) \mid a$ 中，给出对应于图中两棵语法分析树的 $a + a \times a$ 的两条最左推导。
::: solution
以 $+$ 为根的树：$E \Rightarrow E + E \Rightarrow a + E \Rightarrow a + E \times E \Rightarrow a + a \times E \Rightarrow a + a \times a$。

以 $\times$ 为根的树：$E \Rightarrow E \times E \Rightarrow E + E \times E \Rightarrow a + E \times E \Rightarrow a + a \times E \Rightarrow a + a \times a$。

两者在第一步就不同，因而是同一串的不同最左推导。
:::
:::

::: exercise 可靠性与完备性 {level=2}
证明文法 $S \to aSb \mid Sb \mid \varepsilon$ 恰好生成 $\{a^ib^j : i \le j\}$，并说明它是二义的。
::: solution
*可靠性：* 对推导归纳，每个句型或为 $a^i S b^j$ 或为 $a^ib^j$，且都有 $i \le j$：起始的 $S$ 满足 $i = j = 0$；$aSb$ 使两者各加一；$Sb$ 使 $j$ 加一；$\varepsilon$ 消去 $S$。
*完备性：* 给定 $i \le j$ 的 $a^ib^j$，先用 $j - i$ 次 $S \to Sb$，再用 $i$ 次 $S \to aSb$，最后用 $S \to \varepsilon$：$S \Rightarrow^* Sb^{j-i} \Rightarrow^* a^iSb^ib^{j-i} \Rightarrow a^ib^j$。
*二义性：* $abb$ 有推导 $S \Rightarrow Sb \Rightarrow aSbb \Rightarrow abb$ 和 $S \Rightarrow aSb \Rightarrow aSbb \Rightarrow abb$，它们是不同的最左推导（第一步不同），故有两棵语法分析树。
:::
:::

::: exercise 化为 CNF {level=2}
把 $S \to aSb \mid ab$（语言 $\{a^nb^n : n \ge 1\}$）化为乔姆斯基范式，并对 $aabb$ 手工执行 CYK。
::: solution
新开始变量 $S_0 \to S$；没有 $\varepsilon$-规则；消去单规则：$S_0 \to aSb \mid ab$。终结符：$A \to a$，$B \to b$，得 $S \to ASB \mid AB$，$S_0 \to ASB \mid AB$。二元化：$S \to AY \mid AB$，$S_0 \to AY \mid AB$，$Y \to SB$。

对 $a\,a\,b\,b$ 执行 CYK（位置 $1$–$4$）：第 $1$ 行：$A, A, B, B$。第 $2$ 行：$T[1,2] = \emptyset$（$AA$），$T[2,3] = \{S, S_0\}$（$AB$），$T[3,4] = \emptyset$（$BB$）。第 $3$ 行：$T[1,3]$：拆分 $A \cdot \{S,S_0\}$（没有规则 $X \to AS$）和 $\emptyset \cdot B$：为空。$T[2,4]$：拆分 $A \cdot \emptyset$ 和 $\{S, S_0\} \cdot B$，得到 $Y \to SB$：$\{Y\}$。第 $4$ 行：$T[1,4]$：拆分 $A \cdot \{Y\}$ 给出 $S, S_0$；其余拆分一无所获。$S_0 \in T[1,4]$：接受。
:::
:::

::: exercise 封闭性 {level=2}
证明上下文无关语言对并、连接和闭包（star）封闭。（在 [[theory-of-computation/pushdown-automata]] 中我们将说明它们对交和补*不*封闭。）
::: solution
设 $G_1 = (V_1, \Sigma, R_1, S_1)$、$G_2 = (V_2, \Sigma, R_2, S_2)$ 且 $V_1 \cap V_2 = \emptyset$。*并：* 新开始变量 $S$，规则 $S \to S_1 \mid S_2$，再加上 $R_1 \cup R_2$。任何推导都以两条规则之一开始，此后只能使用那个文法的规则（变量集不相交），故语言为 $L(G_1) \cup L(G_2)$。*连接：* $S \to S_1S_2$；两个变量独立推导（上下文无关性），恰好得到 $L(G_1)L(G_2)$。*闭包：* $S \to SS_1 \mid \varepsilon$，加上 $R_1$。$S$ 的规则只能产生 $S \Rightarrow SS_1 \Rightarrow SS_1S_1 \Rightarrow \cdots \Rightarrow SS_1^k \Rightarrow S_1^k$（中间穿插各份 $S_1$ 内部的推导步，它们互不干涉），而每份 $S_1$ 都独立推出 $L(G_1)$ 中的一个串。所以 $S$ 恰好推出 $L(G_1)$ 中 $k \ge 0$ 个串的所有拼接，即 $L(G_1)^*$。
:::
:::

::: exercise 用 CYK 数语法分析树 {level=3}
修改 CYK 算法以统计 $w$ 的语法分析树数目（对 CNF 文法），并用它统计 $E \to E + E \mid a$ 的 CNF 版本中 $a + a + a + a$ 的语法分析树数目。$a(+a)^{k}$ 的数目构成什么数列？
::: solution
把布尔值换成计数 $N[i, j, A]$ 存储：若 $A \to a_i$ 是规则则 $N[i, i, A] = 1$，否则为 $0$；且 $N[i, j, A] = \sum_{k} \sum_{A \to BC} N[i, k, B]\,N[k+1, j, C]$。与 [[#thm-cyk]] 相同的归纳表明 $N[i,j,A]$ 就是以 $A$ 为根、生成元串为 $a_i \cdots a_j$ 的语法分析树数目，因为一棵树由它的根规则、分点和两棵子树唯一决定，而不同的选择给出不同的树。

$E \to E + E \mid a$ 的一个 CNF 版本：$E_0 \to EX \mid a$，$E \to EX \mid a$，$X \to PE$，$P \to +$，开始变量为 $E_0$。原文法中 $a(+a)^k$ 的一棵语法分析树是一棵含 $k$ 个内部结点（每个是一个 $+$）、$k + 1$ 个叶子的满二叉树，而 CNF 变换保持数目。这种树的数目是卡塔兰数 $C_k = \frac{1}{k+1}\binom{2k}{k}$：$1, 1, 2, 5, 14, 42, \dots$。对 $a + a + a + a$（$k = 3$）有 $C_3 = 5$ 棵语法分析树，即给四项之和加括号的五种方式。
:::
:::

::: exercise 可空变量 {level=3}
(a) 给出一个算法，在 $O(\lvert G\rvert^2)$ 时间内算出文法的全部可空变量，其中 $\lvert G\rvert$ 是规则总长度，并证明其正确性。(b) 用类似的**生成性**变量（能推出某个终结符串的变量）不动点计算，证明对 CFG 判定 $L(G) = \emptyset$ 是可判定的。
::: solution
(a) 初始置 $N = \emptyset$。反复执行：对每条规则 $A \to X_1\cdots X_k$，若每个 $X_i$ 都属于 $N$（$k = 0$ 时空真成立），就把 $A$ 加入 $N$。直到某轮不再新增为止。每轮代价 $O(\lvert G\rvert)$，而轮数至多 $\lvert V\rvert + 1 \le \lvert G\rvert$。*可靠性：* 对轮数归纳，每个加入的变量都能推出 $\varepsilon$，因为每个 $X_i$ 已经能。*完备性：* 对生成元串为 $\varepsilon$ 的语法分析树的高度归纳，其根终将被加入：根的规则的各个孩子是更短的此类树的根，故都属于 $N$，于是根在下一轮被加入。

(b) 把迭代条件改为“每个 $X_i$ 是终结符或属于 $N$”：它算出能推出某个终结符串的变量（证明相同，改用生成元串为终结符串的语法分析树）。$L(G) \ne \emptyset$ 当且仅当 $S$ 具有生成性。这正是 [[theory-of-computation/finite-automata#thm-emptiness]] 中 DFA 可达性检验的上下文无关类比。
:::
:::
