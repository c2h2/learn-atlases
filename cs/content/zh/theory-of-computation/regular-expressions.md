输入 `grep -E '^[A-Z][a-z]+ [0-9]{4}$' notes.txt`，计算机就打印出每个由一个大写开头的单词、一个空格和一个四位数构成的行。这个模式是一个**正则表达式**：对一个串集的紧凑的代数描述。正则表达式是几乎每位程序员每天都在用的少数几件理论计算机科学成果之一——在编辑器里、在 `grep` 与 `sed` 里、在输入校验里、在日志分析里、在编译器的词法分析器里。

到目前为止，我们用**识别**语言的机器来描述语言。正则表达式则用三种运算——并、连接、星——从单个符号出发**建造**语言。本章证明一个惊人的事实，**克莱尼定理**：两种描述能力完全相同。每个正则表达式都能转换成有限自动机（我们给出汤普森构造法，快速正则引擎用的正是它），每个有限自动机也能转换成正则表达式（一次消去一个状态）。因此正则语言这一类别是稳健的：无论用 DFA、NFA 还是表达式定义，它都是同一个。

本章最后一部分是实践性的。程序语言的"正则表达式"长出了许多特性——反向引用、环视——把它们带出正则语言之外；而最常见的实现技术回溯，能在看似无害的模式上耗时指数。懂得理论，你就知道哪些模式是安全的、为什么。

## 语法与含义

正则表达式是在字母表 $\Sigma$ 之外添上若干特殊符号的串，归纳定义；它的含义是一个语言。

::: definition 正则表达式 {#def-regex}
字母表 $\Sigma$ 上的**正则表达式**及其描述的语言 $L(R)$ 归纳定义如下：

1. $\emptyset$ 是正则表达式，$L(\emptyset) = \emptyset$；
2. $\varepsilon$ 是正则表达式，$L(\varepsilon) = \{\varepsilon\}$；
3. 每个 $a \in \Sigma$ 是正则表达式，$L(a) = \{a\}$；
4. 若 $R_1$ 与 $R_2$ 是正则表达式，则下列也是正则表达式
   - $(R_1 \mid R_2)$，$L(R_1 \mid R_2) = L(R_1) \cup L(R_2)$（**并**，也写作 $R_1 \cup R_2$ 或 $R_1 + R_2$），
   - $(R_1 R_2)$，$L(R_1R_2) = L(R_1)\,L(R_2)$（**连接**），
   - $(R_1^*)$，$L(R_1^*) = L(R_1)^*$（**星**）。

此外没有别的正则表达式。
:::

这些运算就是 [[theory-of-computation/finite-automata#def-lang-ops]] 中的运算。为省去括号，星的结合最紧，其次是连接，再次是并：$01^* \mid 1$ 的意思是 $\bigl(0(1^*)\bigr) \mid 1$。我们还使用缩写 $R^+ = RR^*$（一个或多个）、$R? = R \mid \varepsilon$（可选）、$R^k$ 表示 $k$ 份复制，并用 $\Sigma$ 表示全体符号的并。

::: example 读正则表达式 {#ex-read-regex}
用语言描述 (a) $(0 \mid 1)^*01$，(b) $1^*(01^+)^*$，(c) $(0 \mid 1)(0 \mid 1)\bigl((0 \mid 1)(0\mid1)\bigr)^*$，(d) $0^*\emptyset$，(e) $\emptyset^*$。
::: solution
(a) 一切以 $01$ 结尾的二进制串：任意内容，后接 $01$。

(b) 每个 $0$ 之后紧跟着至少一个 $1$ 的串——也就是说，没有两个连续的 $0$、也不以 $0$ 结尾的串。前缀 $1^*$ 允许开头的 $1$；每个块 $01^+$ 贡献一个 $0$ 加一个或多个 $1$。

(c) 长度为非零偶数的串：两个符号，然后是成对的符号。

(d) $\emptyset$：与空语言连接得到空语言，因为 $AB$ 需要从每个因子各取一个串。

(e) $\{\varepsilon\}$：任何语言的星都包含 $\varepsilon$（零个因子），而无串可用时再无别的东西。
:::
:::

不同的表达式可以描述同一语言：$(0 \mid 1)^*$、$(0^*1^*)^*$ 与 $\bigl(\varepsilon \mid 0 \mid 1\bigr)^*$ 都描述 $\{0,1\}^*$。若 $L(R) = L(S)$，则称两个表达式**等价**，$R \equiv S$。以下几条等价律被不断用到：

| 定律 | 陈述 |
|---|---|
| 并 | $R \mid S \equiv S \mid R$，$\ (R\mid S)\mid T \equiv R \mid (S \mid T)$，$\ R \mid R \equiv R$，$\ R \mid \emptyset \equiv R$ |
| 连接 | $(RS)T \equiv R(ST)$，$\ \varepsilon R \equiv R\varepsilon \equiv R$，$\ \emptyset R \equiv R \emptyset \equiv \emptyset$ |
| 分配律 | $R(S \mid T) \equiv RS \mid RT$，$\ (S \mid T)R \equiv SR \mid TR$ |
| 星 | $(R^*)^* \equiv R^*$，$\ \varepsilon \mid RR^* \equiv R^*$，$\ (R \mid S)^* \equiv (R^*S^*)^*$，$\ \emptyset^* \equiv \varepsilon$ |

每条都通过证明两边描述同一集合来验证；例如 $R(S \mid T) \equiv RS \mid RT$，因为若 $x \in L(R)$ 而 $y \in L(S) \cup L(T)$，则串 $xy$ 属于 $L(R)L(S)$ 或 $L(R)L(T)$。连接**不**交换（$01 \not\equiv 10$），星对连接或并也不分配：$(01)^* \not\equiv 0^*1^*$ 且 $(0 \mid 1)^* \not\equiv 0^* \mid 1^*$。我们将看到正则表达式的等价性是可判定的——都转换成 DFA 再比较（[[theory-of-computation/finite-automata#thm-emptiness]]）——尽管不存在任何形如上面的有穷定律表，能单凭代数证明一切等价。

::: quiz
哪些表达式描述至少含一个 $1$ 的二进制串的集合？
- [x] $(0\mid1)^*1(0\mid1)^*$
- [x] $0^*1(0\mid1)^*$
- [ ] $0^*1^*(0\mid1)^*$
- [x] $(0\mid1)^*10^*$
::: solution
第一个说"某个 $1$，前后随意"。第二个挑出**第一个** $1$，第四个挑出**最后一个** $1$；二者描述同一集合。第三个接受 $\varepsilon$ 与 $000$，因为 $1^*$ 可以为空：它描述一切串。
:::
:::

## 从正则表达式到自动机

正则表达式的归纳定义暗示了自动机的归纳构造：每个基础情形一个自动机，再把 $R_1$ 与 $R_2$ 的自动机合并成 $R_1 \mid R_2$、$R_1R_2$ 与 $R_1^*$ 的自动机的方法。[[theory-of-computation/nondeterminism]] 的 NFA 构造正是我们所需要的。肯·汤普森（Ken Thompson）的版本让每台中间机器都保持一种方便形状：恰有一个开始状态且没有入箭头，恰有一个接受状态且没有出箭头。

::: theorem 汤普森构造法 {#thm-thompson}
对每个正则表达式 $R$，存在 NFA $N_R$ 使 $L(N_R) = L(R)$。而且 $N_R$ 可以取为：一个没有入箭头的开始状态，一个没有出箭头的接受状态，至多 $2\lvert R\rvert$ 个状态、至多 $4\lvert R\rvert$ 条箭头，其中 $\lvert R\rvert$ 是 $R$ 中符号与运算符的个数。每个状态至多有两条出箭头。
:::

::: proof
对 $R$ 作结构归纳，构造以 $s$ 为开始状态、$f$ 为接受状态的 $N_R$。

**基础情形。** $\emptyset$：两个状态 $s, f$，没有箭头。$\varepsilon$：一条箭头 $s \xrightarrow{\varepsilon} f$。$a \in \Sigma$：一条箭头 $s \xrightarrow{a} f$。各有 $2$ 个状态、至多一条箭头，且显然识别正确的语言。

**并。** 给定 $N_1$（状态 $s_1 \to f_1$）与 $N_2$（$s_2 \to f_2$），状态不交，添加新的 $s, f$ 及箭头 $s \xrightarrow{\varepsilon} s_1$、$s \xrightarrow{\varepsilon} s_2$、$f_1 \xrightarrow{\varepsilon} f$、$f_2 \xrightarrow{\varepsilon} f$。从 $s$ 到 $f$ 的运行恰经过两台机器中的一台：第一步进入 $N_1$ 或 $N_2$，不能在其间穿越（没有那样的箭头），且只能经 $f_1$ 或 $f_2$ 离开。故 $L = L(N_1) \cup L(N_2)$。

**连接。** 添加箭头 $f_1 \xrightarrow{\varepsilon} s_2$，开始状态 $s_1$，接受状态 $f_2$。如同 [[theory-of-computation/nondeterminism#thm-nfa-concat]]，每条接受运行恰在新箭头处从 $N_1$ 穿到 $N_2$ 一次，且此前是 $N_1$ 的一条接受运行；故 $L = L(N_1)L(N_2)$。（由于 $f_1$ 本没有出箭头而 $s_2$ 本没有入箭头，形状得以保持。）

**星。** 添加新的 $s, f$ 及箭头 $s \xrightarrow{\varepsilon} s_1$、$s \xrightarrow{\varepsilon} f$、$f_1 \xrightarrow{\varepsilon} s_1$、$f_1 \xrightarrow{\varepsilon} f$。从 $s$ 到 $f$ 的运行或直走 $s \to f$（读入 $\varepsilon$），或进入 $N_1$，从 $s_1$ 到 $f_1$ 往返 $k \ge 1$ 次、其间回到 $s_1$，最后经 $f$ 离开。每次通过读入一个 $L(N_1)$ 中的串，因为通过段内部只用到 $N_1$ 的箭头，而 $s_1$ 没有属于 $N_1$ 的入箭头。故 $L = L(N_1)^*$。与 [[theory-of-computation/nondeterminism#thm-nfa-star]] 中的构造不同，新的开始状态不是接受的；箭头 $s \to f$ 起那个作用，而由于 $s$ 没有入箭头，那则警示中描述的问题不可能出现。

**计数。** 每个基础情形和每个运算符至多加 $2$ 个状态、至多加 $4$ 条箭头，故总数分别不超过 $2\lvert R\rvert$ 与 $4\lvert R\rvert$。每个状态至多有两条出箭头：一条带符号的，或至多两条 $\varepsilon$-箭头。
:::

该构造关于 $R$ 的规模是线性的，而得到的 NFA 可用状态集模拟（[[theory-of-computation/nondeterminism#lem-reach]]）。于是把长 $n$ 的输入与 $R$ 匹配最坏耗时 $O(n \cdot \lvert R\rvert)$——这是对每个模式都成立的保证。

::: example 对 $(0 \mid 1)^*01$ 的汤普森构造 {#ex-thompson}
造出 $(0 \mid 1)^*01$ 的汤普森 NFA，数它的状态，并说出读完 $1$ 后模拟占据哪些状态。
::: solution
给各部件编号。星内部的原子 $0$ 与 $1$ 给出 $1 \xrightarrow{0} 2$ 与 $3 \xrightarrow{1} 4$。并添加 $5, 6$ 及 $5 \xrightarrow{\varepsilon} 1$、$5 \xrightarrow{\varepsilon} 3$、$2 \xrightarrow{\varepsilon} 6$、$4 \xrightarrow{\varepsilon} 6$。星添加 $7, 8$ 及 $7 \xrightarrow{\varepsilon} 5$、$7 \xrightarrow{\varepsilon} 8$、$6 \xrightarrow{\varepsilon} 5$、$6 \xrightarrow{\varepsilon} 8$。最后的原子是 $9 \xrightarrow{0} 10$ 与 $11 \xrightarrow{1} 12$，由 $8 \xrightarrow{\varepsilon} 9$ 与 $10 \xrightarrow{\varepsilon} 11$ 接起。开始 $7$，接受 $12$：**12 个状态**，$\lvert R\rvert = 8$（符号 $0, 1, 0, 1$ 与运算符 $\mid$、$^*$ 和两个连接）。

最初集合是 $E(\{7\}) = \{7, 5, 1, 3, 8, 9\}$：机器随时准备读循环内的任一符号，或开始末尾的 $01$。读 $1$：只有 $3 \xrightarrow{1} 4$ 可用，得 $\{4\}$，其闭包为 $\{4, 6, 5, 1, 3, 8, 9\}$。接受状态 $12$ 不在其中。再读一个 $0$ 后集合含 $10$ 与 $11$（这个 $0$ 可能开启末尾的 $01$），而读 $01$ 后含 $12$。
:::
:::

下面是把这个构造写成程序：一个对单字符表达式（含 `|`、`*` 和括号）的递归下降解析器，边走边产生汤普森部件，再接上状态集模拟。空替代（如 `a(|b)c` 中的）代表 $\varepsilon$。

```python
import itertools

def thompson(rx):
    """Build an NFA for rx (symbols, |, *, parentheses); return (edges, start, end)."""
    edges, pos = [], 0                       # 边：(from, label, to)；标记 "" = ε
    new = itertools.count().__next__         # new() 返回一个新状态编号
    def frag(label):                         # 两个新状态由一条边相连
        s, e = new(), new(); edges.append((s, label, e)); return s, e
    def eps(p, q): edges.append((p, "", q))
    def alt():
        nonlocal pos
        s1, e1 = cat()
        while pos < len(rx) and rx[pos] == "|":
            pos += 1
            (s2, e2), s, e = cat(), new(), new()
            eps(s, s1); eps(s, s2); eps(e1, e); eps(e2, e); s1, e1 = s, e
        return s1, e1
    def cat():
        s, e = frag("")                      # 空连接 = ε
        while pos < len(rx) and rx[pos] not in "|)":
            s2, e2 = star(); eps(e, s2); e = e2
        return s, e
    def star():
        nonlocal pos
        if rx[pos] == "(":
            pos += 1; s1, e1 = alt(); pos += 1           # 跳过 ')'
        else:
            s1, e1 = frag(rx[pos]); pos += 1
        while pos < len(rx) and rx[pos] == "*":
            pos += 1; s, e = new(), new()
            eps(s, s1); eps(s, e); eps(e1, s1); eps(e1, e); s1, e1 = s, e
        return s1, e1
    s, e = alt()
    return edges, s, e
```

解析器的三个函数对应三个优先级层次：`alt` 处理 `|`，`cat` 处理连接，`star` 处理一个原子后跟任意多个 `*`。（为简单起见，`cat` 让每个连接都以一条 $\varepsilon$-箭头开头，这只多花几个状态，其余不变。）匹配器维护一个状态集，与 [[theory-of-computation/nondeterminism]] 完全一致：

```python
def matches(rx, w):
    edges, start, end = thompson(rx)
    def close(S):                            # 用图搜索求 ε-闭包
        todo = list(S)
        while todo:
            q = todo.pop()
            for p, a, r in edges:
                if p == q and a == "" and r not in S:
                    S.add(r); todo.append(r)
        return S
    S = close({start})
    for c in w:                              # 每个符号一步状态集转移
        S = close({r for p, a, r in edges if p in S and a == c})
    return end in S

for rx, w in [("(0|1)*01", "11001"), ("(0|1)*01", "0110"), ("(ab|a)*", "abaab"),
              ("(ab|a)*", "abba"), ("a(|b)c", "ac"), ("a(|b)c", "abc"), ("a(|b)c", "abbc")]:
    print(f"{rx:10} {w:6} {matches(rx, w)}")
```

```console
$ python3 thompson.py
(0|1)*01   11001  True
(0|1)*01   0110   False
(ab|a)*    abaab  True
(ab|a)*    abba   False
a(|b)c     ac     True
a(|b)c     abc    True
a(|b)c     abbc   False
```

这里的闭包对每个状态都要扫一遍整个边表，是平方复杂度的；真正的实现会把每个状态的出箭头存成邻接表（[[data-structures/graph-representations]]），从而达到 $O(n \cdot \lvert R\rvert)$ 界。

::: widget graph
nodes: A@0,0; B@3,0; C@6,0
edges: A>A:1; A>B:0; B>B:0; B>C:1; C>B:0; C>A:1
algorithm: none
caption: $(0 \mid 1)^*01$ 的最小 DFA：先对 [[#ex-thompson]] 的汤普森 NFA 施行子集构造，再合并等价状态即得。$A$ 是开始状态（"尚无进展"），$B$ 表示"输入以 $0$ 结尾"，$C$（接受）表示"输入以 $01$ 结尾"。十二状态的 NFA 变成了三个状态。沿箭头跟踪 $11001$ 与 $0110$，与程序的输出对照。
:::

## 从自动机到正则表达式

反方向我们把自动机拆开。思路是允许箭头用正则表达式而非单个符号标记，并一次消去一个状态、同时重标剩余箭头，使语言不变。当只剩一个开始状态和一个接受状态、由一条箭头相连时，那条箭头的标记就是答案。

::: definition 广义 NFA {#def-gnfa}
**广义 NFA**（GNFA）是一条箭头以正则表达式标记的有限自动机，满足：

1. 有一个开始状态 $s$，它有到其余每个状态的箭头，且没有进入它的箭头；
2. 有唯一的接受状态 $f \ne s$，它有来自其余每个状态的箭头，且没有从它出去的箭头；
3. 对每对状态 $p, r$（$p \ne f$ 且 $r \ne s$，允许 $p = r$）恰有一条箭头 $p \to r$，其标记为 $R(p, r)$。

GNFA 接受 $w$，若 $w = w_1 w_2 \cdots w_k$ 且存在状态序列 $s = r_0, r_1, \dots, r_k = f$，使得对每个 $i$ 有 $w_i \in L(R(r_{i-1}, r_i))$。
:::

任何 NFA $N$（特别地，任何 DFA）都可转换成识别同样语言的 GNFA：添加新的开始状态 $s$ 及箭头 $s \xrightarrow{\varepsilon} q_0$；添加新的接受状态 $f$ 及从每个原接受状态 $q$ 出发的箭头 $q \xrightarrow{\varepsilon} f$；把同一对状态之间的多条箭头并成一条、以其并为标记（$p \xrightarrow{a \mid b} r$）；凡条件 3 要求而缺失的箭头，添上标记为 $\emptyset$ 的箭头。标记为 $\emptyset$ 的箭头永不可用，故语言不变。

::: lemma 状态消去 {#lem-eliminate}
设 $G$ 是至少有三个状态的 GNFA，$q$ 是不同于 $s$ 与 $f$ 的状态。设 $G'$ 由删去 $q$、并对剩余状态每对满足 $p \ne f$、$r \ne s$ 的 $p, r$ 重标

$$
R'(p, r) = R(p, r) \;\bigm|\; R(p, q)\,R(q, q)^*\,R(q, r).
$$ {#eq-eliminate}

得到。则 $G'$ 是 GNFA 且 $L(G') = L(G)$。
:::

::: proof
$G'$ 满足三条条件，因为 $G$ 满足而只删去了 $q$。

$L(G) \subseteq L(G')$：取 $G$ 中 $w = w_1 \cdots w_k$ 的一条接受序列 $s = r_0, \dots, r_k = f$。序列中每个由连续的 $q$ 组成的极大块形如 $p, q, q, \dots, q, r$，$p, r \ne q$（$s$ 与 $f$ 都不是 $q$，故块两侧有包围）。沿这块读入的 $w$ 的部分是属于 $L(R(p,q))\,L(R(q,q))^*\,L(R(q,r))$ 的串，故属于 $L(R'(p, r))$。把每个块替换成单步 $p \to r$，得到 $G'$ 中 $w$ 的一条接受序列。两端都不是 $q$ 的步 $p \to r$ 仍然有效，因为 $L(R(p,r)) \subseteq L(R'(p,r))$。

$L(G') \subseteq L(G)$：取 $G'$ 的一条接受序列。每步 $p \to r$ 读入 $L(R'(p, r))$ 中的一个串，由 [[#eq-eliminate]]，它或属于 $L(R(p, r))$——$G$ 的一步——或形如 $x y_1 \cdots y_j z$，其中 $x \in L(R(p,q))$，每个 $y_i \in L(R(q,q))$，$z \in L(R(q, r))$，而 $G$ 沿 $p, q, \dots, q, r$ 读出它。相应地替换每一步，得到 $G$ 的一条接受序列。
:::

::: theorem 克莱尼定理 {#thm-kleene}
一个语言正则，当且仅当它被某个正则表达式描述。
:::

::: proof
若 $L = L(R)$，汤普森构造法（[[#thm-thompson]]）给出 $L$ 的 NFA，子集构造法（[[theory-of-computation/nondeterminism#thm-subset]]）再给出 DFA；故 $L$ 正则。

反之设 $L$ 被 DFA $M$ 识别。按上文所述把 $M$ 转换成语言相同的 GNFA $G$。只要 $G$ 还有多于两个状态，就用 [[#lem-eliminate]] 消去一个异于 $s$ 与 $f$ 的状态；每步保持语言不变且状态数减一。当只剩 $s$ 与 $f$ 时，条件 3 留下一条箭头 $s \to f$，而 $G$ 接受 $w$ 当且仅当 $w \in L(R(s, f))$。故 $L = L(R(s, f))$。
:::

::: algorithm 状态消去法 {#alg-eliminate}
1. 添加新的开始状态 $s$ 及 $s \xrightarrow{\varepsilon} q_0$，新的接受状态 $f$ 及每个 $q \in F$ 的 $q \xrightarrow{\varepsilon} f$。把平行箭头并为并；缺失的箭头视作 $\emptyset$。
2. 对每个原状态 $q$（任意次序）：
   1. 对拥有箭头 $p \to q$ 与 $q \to r$ 的其余状态的每对 $p, r$，把 $R(p, r)$ 替换为 $R(p, r) \mid R(p, q)R(q,q)^*R(q, r)$。
   2. 删去 $q$。
3. 返回 $s \to f$ 的标记，并用 $R \mid \emptyset \equiv R$、$\emptyset R \equiv \emptyset$、$\emptyset^* \equiv \varepsilon$ 与 $\varepsilon R \equiv R$ 化简。
:::

不同的消去次序给出不同的等价表达式，且结果规模可以严重依赖次序：最坏情形表达式的长度比自动机大指数倍，因为每次消去可把标记大约翻四倍。与另一个方向不同，这一方向一般不给出紧凑描述——自动机与表达式虽能力相等、简洁性却不相等，这是又一个迹象。

::: example 消去模 3 自动机的状态 {#ex-eliminate}
把 [[theory-of-computation/finite-automata#ex-mod3]] 中被 $3$ 整除的 DFA 转换成正则表达式。
::: solution
该 DFA 有 $r_0 \xrightarrow{0} r_0$、$r_0 \xrightarrow{1} r_1$、$r_1 \xrightarrow{0} r_2$、$r_1 \xrightarrow{1} r_0$、$r_2 \xrightarrow{0} r_1$、$r_2 \xrightarrow{1} r_2$，$r_0$ 既是开始又是接受。添加 $s \xrightarrow{\varepsilon} r_0$ 与 $r_0 \xrightarrow{\varepsilon} f$。

**消去 $r_2$。** 进入 $r_2$ 的箭头只来自 $r_1$（标记 $0$），出去的箭头只到 $r_1$（标记 $0$）；自环是 $1$。于是 $r_1$ 的新自环是 $\emptyset \mid 0\,1^*\,0 = 01^*0$；没有其他标记改变。

**消去 $r_1$。** 进：$r_0 \xrightarrow{1} r_1$；出：$r_1 \xrightarrow{1} r_0$；自环 $01^*0$。$r_0$ 的自环变为 $0 \mid 1(01^*0)^*1$。

**消去 $r_0$。** 进：$s \xrightarrow{\varepsilon} r_0$；出：$r_0 \xrightarrow{\varepsilon} f$；自环 $0 \mid 1(01^*0)^*1$。于是 $R(s, f) = \emptyset \mid \varepsilon\,\bigl(0 \mid 1(01^*0)^*1\bigr)^*\,\varepsilon$，化简得

$$
\bigl(0 \mid 1(01^*0)^*1\bigr)^*.
$$

可以把它读作对 DFA 各圈路的描述：从余数 $0$ 出发，或读一个 $0$ 留在原地，或读一个 $1$（去 $r_1$），用 $01^*0$ 在 $r_1$ 与 $r_2$ 之间徘徊任意多次，再读一个 $1$ 返回。用 Python 的 `re.fullmatch` 对一切长不超 $10$ 的串暴力核对，每个串都与 DFA 一致。
:::
:::

::: quiz
对"偶数个 $0$"的两状态 DFA（状态 $e$、$o$；$e$ 开始且接受；读 $0$ 交换两状态，读 $1$ 自环）消去状态 $o$，得到 $e$ 上哪个自环？
- [ ] $1 \mid 0$
- [x] $1 \mid 01^*0$
- [ ] $(01^*0)^*$
- [ ] $1^*01^*0$
::: solution
$e$ 的旧自环是 $1$。经过 $o$：以 $0$ 进，$o$ 处自环 $1^*$，以 $0$ 出，得 $01^*0$。新标记是并 $1 \mid 01^*0$，而消去 $e$ 后的最终表达式是 $(1 \mid 01^*0)^*$。
:::
:::

## 实践中的正则表达式

`grep`、Python 的 `re`、JavaScript、Java 与 Perl 的正则表达式在数学表达式之上扩展了种种便利：字符类（`[a-z]`、`\d`）、次数限定（`a{2,5}`）、锚点（`^`、`$`），以及缩写 `+` 与 `?`。这些都只是缩写——`[a-c]` 即 $a \mid b \mid c$，`a{2,3}` 即 $aa(a \mid \varepsilon)$——不会越出正则语言之外。另有两个特性会。

**反向引用。** 模式 `(a*)b\1` 匹配 $a^n b a^n$：`\1` 意为"第一个组匹配过的同一段文本"。语言 $\{a^nba^n : n \ge 0\}$ 不是正则的（[[theory-of-computation/non-regular-languages]]），而一般地带反向引用的匹配是 $\mathsf{NP}$-完全的。**环视**（`(?=…)`、`(?<=…)`）原则上可以翻译掉，但支持它的引擎与支持反向引用的一样，用回溯实现。

**回溯。** 程序语言中的多数引擎并不模拟状态集。它们一次一个、深度优先地探索 NFA 的各个选择，走不通就退回来——这很简单，支持反向引用，并报告模式是**怎样**匹配的（捕获组需要）。在多数输入上它很快。但当模式能以多种方式匹配同一段文本、而总体匹配又失败时，引擎在放弃前会尝试每一种方式。

::: example 指数回溯 {#ex-backtrack}
模式 $(a \mid aa)^*$ 能以多少种方式匹配串 $a^n$？这对一个被询问 $(a \mid aa)^*b$ 是否匹配 $a^n$ 的回溯引擎意味着什么？
::: solution
$(a \mid aa)^*$ 对 $a^n$ 的一种匹配，就是把 $n$ 写成若干部 $1$ 与 $2$ 的有序和的一种方式。设方式数为 $c_n$。第一部分是 $1$（还剩 $n-1$）或 $2$（还剩 $n - 2$），故 $c_n = c_{n-1} + c_{n-2}$，且 $c_0 = c_1 = 1$：斐波那契数列，$c_n = F_{n+1} \approx \varphi^{n+1}/\sqrt5$，其中 $\varphi = (1 + \sqrt5)/2 \approx 1.618$。由于 $a^n$ 不含 $b$，这些方式——以及一切更短的前缀匹配——最后都会失败，回溯引擎在报告"无匹配"之前会逐一尝试。在一台机器上用 Python 3.14 的 `re` 模块观察：

```python
import re, time
pat = re.compile(r"(a|aa)*b")
for n in range(20, 31, 2):
    t = time.perf_counter()
    pat.fullmatch("a" * n)                   # 没有 'b'：每种切分都会被尝试
    print(n, f"{time.perf_counter() - t:.3f} s")
```

```console
$ python3 redos.py
20 0.002 s
22 0.004 s
24 0.010 s
26 0.026 s
28 0.065 s
30 0.172 s
```

$n$ 每增加 $2$，时间大约乘以 $2.6 \approx \varphi^2$，与预言一致；$n = 50$ 就要花上几小时。而上面的汤普森模拟用与 $n$ 成正比的时间就能回答同一个问题，因为其状态集的元素从不超过十几个。
:::
:::

::: widget plot
f: ((1+sqrt(5))/2)^(x+1)/sqrt(5); 12*x
x: 0, 30
y: 0, 2000
labels: \text{回溯： } F_{n+1}; \text{状态集模拟： } 12n
caption: 回溯引擎匹配 $(a \mid aa)^*$ 对 $a^n$ 可能要尝试的方式数按斐波那契数列增长，而状态集模拟每个符号做的工作量有界（这里约 $12$ 步，每个 NFA 状态一步）。两条曲线在 $n = 10$ 与 $n = 11$ 之间相交；到 $n = 30$，指数曲线早已冲出画面。
:::

::: warning "regex" 未必是正则表达式，也未必快
两个误解会造成真实的缺陷。其一，带反向引用的模式不是本章意义下的正则表达式，本章的一切结论都不适用于它。其二，即便是一个真正正则的模式，在回溯引擎中也可能耗时指数，[[#ex-backtrack]] 就是一例。嵌套或重叠量词的模式——$(a^+)^+$、$(a \mid a)^*$、$(\backslash w^+\backslash s?)^*$——作用在攻击者可控制的输入上，曾造成 Web 服务瘫痪（**正则表达式拒绝服务**，ReDoS）。防御手段：对不可信输入使用有线性时间保证的引擎（截至 2026 年的 RE2、Go 的 `regexp`、Rust 的 `regex`）；改写模式使每个串只能以一种方式匹配；并在引擎支持处设置匹配超时。
:::

## 实践中：词法分析器与搜索工具

本章与上一章的构造构成每条词法分析器生成流水线都在使用的流程：为单词符号写正则表达式（标识符是 $\texttt{[a-zA-Z\_][a-zA-Z0-9\_]*}$，如此等等），以并组合，每个附一个标签说明是哪个单词符号；汤普森构造给出 NFA；子集构造给出 DFA；最小化（[[theory-of-computation/non-regular-languages]]）把它缩小；最后把 DFA 以表的形式发出。运行时词法分析器读入字符、沿表转移，并使用**最长匹配**规则——只要还可能有更长的单词符号就继续读，然后退回到最后一个接受状态——平局按规则次序打破，于是 `if` 是关键字而不是标识符。[[compilers]] 完整展开这一流程。

`grep` 之类的搜索工具面临另一种折中：模式随每次搜索改变，预先构造完整 DFA 的代价可能超过节省。GNU `grep` 与 RE2 惰性构造 DFA 状态，如 [[theory-of-computation/nondeterminism]] 末尾所述。

::: history
斯蒂芬·克莱尼（Stephen Kleene）在 1951 年兰德公司（RAND）一份关于麦卡洛克-皮茨神经网可表示事件的备忘录中引入了正则表达式——他称之为**正则事件**——该文 1956 年以 "Representation of events in nerve nets and finite automata" 发表于 *Automata Studies*；它与有限自动机的等价性，即我们的 [[#thm-kleene]]，出自他手。罗伯特·麦克诺顿（Robert McNaughton）与 Hisao Yamada 在 1960 年的论文 "Regular expressions and state graphs for automata" 中给出了双向转换；亚努什·布热佐夫斯基（Janusz Brzozowski）1964 年引入了正则表达式的导数。肯·汤普森（Ken Thompson）的 "Regular expression search algorithm"（*Communications of the ACM*，1968）描述了 [[#thm-thompson]] 的 NFA 构造与状态集模拟，编译成 IBM 7094 机器码用于 QED 编辑器；同样的思想于 1970 年代初进入贝尔实验室的 `ed` 与 `grep`。带反向引用的回溯实现经亨利·斯宾塞（Henry Spencer）被广泛复制的库（1986）与 Perl 流传。拉斯·考克斯（Russ Cox）2007 年的系列文章重燃了对汤普森线性时间方法的兴趣，并催生了 RE2。
:::

## 后续内容

[[theory-of-computation/non-regular-languages]] 证明前三章一切内容的极限：诸如 $\{0^n1^n\}$ 与配对的括号这样的语言，任何正则表达式都无法描述。要描述它们，我们需要描述本身带有递归——[[theory-of-computation/context-free-grammars]] 的上下文无关文法，它们还在单词符号层次之外描述程序语言的语法。

::: summary
- **正则表达式**（[[#def-regex]]）由 $\emptyset$、$\varepsilon$ 与单个符号经并、连接、星建造语言；星的结合最紧，其次是连接，再次是并。
- **汤普森构造法**（[[#thm-thompson]]）把规模 $m$ 的表达式变成至多 $2m$ 个状态的 NFA，用状态集模拟得到 $O(nm)$ 的匹配。
- **状态消去法**（[[#lem-eliminate]]、[[#alg-eliminate]]）把任意自动机变成表达式：把经过被消状态 $q$ 的路径替换为 $R(p,q)R(q,q)^*R(q,r)$。
- **克莱尼定理**（[[#thm-kleene]]）：正则表达式、NFA 与 DFA 描述恰好相同的语言，即正则语言。
- 表达式可以比自动机大指数倍；表达式的等价性可经 DFA 判定。
- 实用 "regex" 增加了反向引用（非正则，匹配是 $\mathsf{NP}$-完全的），且通常由**回溯**实现——即便对正则模式也可能耗时指数。对不可信输入使用线性时间引擎。
:::

## 习题

::: exercise 写表达式 {level=1}
在 $\{0, 1\}$ 上写出正则表达式：(a) 恰有两个 $1$ 的串；(b) 不含 $11$ 的串；(c) 长度是 $3$ 的倍数的串；(d) 首尾符号相同的串。
::: solution
(a) $0^*10^*10^*$。(b) $(0 \mid 10)^*(\varepsilon \mid 1)$：除可能的最后一个外，每个 $1$ 后都跟着一个 $0$。(c) $\bigl((0\mid1)(0\mid1)(0\mid1)\bigr)^*$。(d) $0 \mid 1 \mid 0(0 \mid 1)^*0 \mid 1(0\mid 1)^*1$（单符号串首尾相同；$\varepsilon$ 除外）。
:::
:::

::: exercise 数匹配 {level=1 check="4"}
长度恰为 $4$ 的串中有多少个属于 $L\bigl((0 \mid 1)^*01\bigr)$？（输入数字。）
::: solution
长 $4$ 的串属于该语言当且仅当其最后两个符号是 $01$；前两个符号任意，故有 $2^2 = 4$ 个这样的串：$0001, 0101, 1001, 1101$。
:::
:::

::: exercise 汤普森构造法的规模 {level=1 check="12"}
用 [[#thm-thompson]] 证明中的构造（每个符号给 $2$ 个状态，并与星各加 $2$ 个状态，连接不加），$(0 \mid 1)^*01$ 的 NFA 有多少个状态？（输入数字。）
::: solution
四个符号给 $4 \times 2 = 8$ 个状态；并加 $2$ 个，星加 $2$ 个；两个连接不加。共 $12$ 个，与 [[#ex-thompson]] 一致。
:::
:::

::: exercise 定律与非法则 {level=2}
证明或反驳：(a) $(R \mid S)^* \equiv (R^*S^*)^*$；(b) $(RS)^* \equiv R^*S^*$；(c) $R^*R^* \equiv R^*$；(d) $(R \mid S)^* \equiv R^* \mid S^*$。
::: solution
(a) 真。$\supseteq$：$L(R^*S^*)$ 的每个串都是来自 $L(R) \cup L(S)$ 的串的连接，故属于 $L((R\mid S)^*)$，这样的串的任意连接亦然。$\subseteq$：串接 $x_1 \cdots x_k$，每个 $x_i \in L(R) \cup L(S)$，是 $k$ 个 $L(R^*S^*)$ 中串的串接，因为每个 $x_i$ 都属于 $L(R^*)L(S^*)$（取 $x_i\varepsilon$ 或 $\varepsilon x_i$）。
(b) 假：$R = 0$、$S = 1$ 时 $(01)^* \ni 0101$，但 $0101 \notin L(0^*1^*)$。
(c) 真：$\supseteq$ 取第二个因子为 $\varepsilon$ 即可；$\subseteq$ 因为 $j$ 个块串接 $k$ 个块得到 $j + k$ 个块。
(d) 假：$R = 0$、$S = 1$：$01 \in L((0 \mid 1)^*)$ 但 $01 \notin L(0^*) \cup L(1^*)$。
:::
:::

::: exercise 状态消去 {level=2}
用 [[#alg-eliminate]] 求 $\{a, b\}$ 上 DFA 的正则表达式：状态 $1$（开始）、$2$（接受），转移 $1 \xrightarrow{a} 1$、$1 \xrightarrow{b} 2$、$2 \xrightarrow{a} 2$、$2 \xrightarrow{b} 1$，先消状态 $1$ 再消状态 $2$。它是什么语言？
::: solution
添加 $s \xrightarrow{\varepsilon} 1$ 与 $2 \xrightarrow{\varepsilon} f$。消去 $1$（自环 $a$）：入箭头来自 $s$（$\varepsilon$）与来自 $2$（$b$）；出到 $2$（$b$）。新标记：$R(s, 2) = \emptyset \mid \varepsilon a^* b = a^*b$，而 $2$ 的自环变为 $a \mid b a^* b$。消去 $2$：$R(s, f) = a^*b\,(a \mid ba^*b)^*$。该语言是含奇数个 $b$ 的串：DFA 追踪 $b$ 的奇偶性，状态 $2$ 表示奇。
:::
:::

::: exercise 给 `thompson` 加上 `?` 和 `+` {level=2}
扩展 `thompson` 函数，使之在 `*` 之外还接受后缀运算符 `?`（可选）与 `+`（一个或多个）。用 `ab?c` 对 `ac`、`abc`、`abbc`，以及 `(ab)+` 对 `""`、`ab`、`abab`、`aba` 测试。
::: solution
在 `star` 的循环里接受 `*+?` 中任一，并添加相应的 $\varepsilon$-箭头：对 `?` 保留 $s \to s_1$、$s \to e$ 与 $e_1 \to e$，省去回路 $e_1 \to s_1$；对 `+` 保留 $s \to s_1$、回路 $e_1 \to s_1$ 与 $e_1 \to e$，省去旁路 $s \to e$。

```python
        while pos < len(rx) and rx[pos] in "*+?":
            op = rx[pos]; pos += 1; s, e = new(), new()
            eps(s, s1); eps(e1, e)
            if op != "+": eps(s, e)          # 可以跳过操作数
            if op != "?": eps(e1, s1)        # 可以重复操作数
            s1, e1 = s, e
```

其余一切不变。`matches` 照旧：

```console
$ python3 thompson2.py
ab?c       ac     True
ab?c       abc    True
ab?c       abbc   False
(ab)+             False
(ab)+      ab     True
(ab)+      abab   True
(ab)+      aba    False
```
:::
:::

::: exercise Arden 引理 {level=3}
设 $A, B$ 为满足 $\varepsilon \notin A$ 的语言。证明 $X = A^*B$ 是满足 $X = AX \cup B$ 的**唯一**语言。用它求解方程 $X_e = 1X_e \cup 0X_o \cup \{\varepsilon\}$、$X_o = 1X_o \cup 0X_e$，其中 $X_q$ 是偶数个 $0$ 的 DFA 从状态 $q$ 出发接受的串的集合，并与上面的小测验比较。
::: solution
**$A^*B$ 是一个解：** $A(A^*B) \cup B = (AA^* \cup \{\varepsilon\})B = A^*B$。

**唯一性：** 设 $X$ 为任一解。把方程展开 $k$ 次得 $X = A^{k+1}X \cup A^kB \cup \dots \cup AB \cup B$，对每个 $k$ 成立；故 $A^*B \subseteq X$。反之取 $w \in X$，$\lvert w\rvert = n$，展开 $n$ 次：$w \in A^{n+1}X$ 或对某个 $i \le n$ 有 $w \in A^iB$。$A^{n+1}X$ 的每个串长度至少 $n+1$，因为 $A$ 的每个串非空。故 $w \in A^iB \subseteq A^*B$。

**方程：** 由第二个方程，取 $A = 1$、$B = 0X_e$，得 $X_o = 1^*0X_e$。代入，$X_e = 1X_e \cup 01^*0X_e \cup \{\varepsilon\} = (1 \mid 01^*0)X_e \cup \{\varepsilon\}$，由 Arden 引理得 $X_e = (1 \mid 01^*0)^*$，与状态消去法得到的表达式相同。（条件 $\varepsilon \notin A$ 不可少：取 $A = \{\varepsilon\}$，每个 $X \supseteq B$ 都是解。）
:::
:::

::: exercise 数回溯路径 {level=3 check="89"}
$(a \mid aa)^*$ 能以多少种方式匹配 $a^{10}$——也就是说，有多少个选择 $a$ 或 $aa$ 的序列恰好拼出 $a^{10}$？证明你的递归式，并解释为什么同一模式的汤普森模拟在 $a^n$ 上只需 $O(n)$ 步，尽管匹配路径的数目是指数的。（输入方式数。）
::: solution
设方式数为 $c_n$。第一块是 $a$ 或 $aa$，剩下 $a^{n-1}$ 或 $a^{n-2}$，不同的首块给出不同的序列，故对 $n \ge 2$ 有 $c_n = c_{n-1} + c_{n-2}$，且 $c_0 = 1$（空序列）、$c_1 = 1$。于是 $c_2 = 2$，$c_3 = 3$，$c_4 = 5$，$c_5 = 8$，$c_6 = 13$，$c_7 = 21$，$c_8 = 34$，$c_9 = 55$，$c_{10} = 89$。

状态集模拟不逐条跟踪路径。每个符号之后它只记录**哪些状态**可能是某条路径所在，而该模式的汤普森 NFA 只有常数多个状态（约十几个），所以无论多少条路径通向每个状态，每步代价都是 $O(1)$。同一位置到达同一状态的不同路径被合并——这正是回溯引擎丢弃又重算的信息。
:::
:::
