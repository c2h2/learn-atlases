每个程序员都盼望有这样一种工具：看一眼程序，就能说出它会不会陷入死循环。编译器警告不可达代码，静态检查器标记可疑循环，形式化验证工具证明精心书写的函数会终止。但没有任何工具能对*每一个*程序做到这一点：不存在这样的算法，能接受任意程序及其输入，正确判定程序是否会停机。这不是当前技术的局限。这是一条定理，艾伦·图灵（Alan Turing）于 1936 年证明，其证明是数学中最漂亮的论证之一。

既然丘奇–图灵论题（[[theory-of-computation/turing-machines#def-church-turing]]）把算法等同于图灵机，"这个问题存在算法吗"一类的追问就成了精确的数学问题："这个语言可判定吗？"本章先说明关于自动机和文法的许多自然问题*确实*可判定——这正是前面各章的工具能够被实现的原因。然后用一个计数论证说明不可判定语言必定存在，并用**对角化**说明其中某个具体而重要的语言——图灵机的接受问题——不可判定。由此得到停机问题的不可判定性，以及第一个连可识别都算不上的语言。

## 问题即语言

**判定问题**是对输入对象提出的、答案非"是"即"否"的问题："这台 DFA 接受这个串吗？""这张图连通吗？""这个程序会停机吗？"利用编码（[[theory-of-computation/turing-machines]]），每个判定问题都化为"答案是'是'的那些实例的编码"构成的语言。例如

$$
A_{\mathsf{DFA}} = \{\langle B, w\rangle : B \text{ 是接受串 } w \text{ 的 DFA}\}.
$$

这个语言的判定器恰好就是该问题的一个算法。判定器必须拒绝根本不构成合法编码的串；对合理的编码，检查合法性总是容易的，此后不再赘述。

## 关于自动机与文法的可判定问题

前面各章的构造都是算法，所以相应的问题都可判定。

::: theorem 正则语言类的可判定问题 {#thm-dec-regular}
下列语言都可判定：

1. $A_{\mathsf{DFA}} = \{\langle B, w\rangle : B \text{ 是接受 } w \text{ 的 DFA}\}$；
2. $A_{\mathsf{NFA}} = \{\langle B, w\rangle : B \text{ 是接受 } w \text{ 的 NFA}\}$；
3. $A_{\mathsf{REX}} = \{\langle R, w\rangle : R \text{ 是正则表达式且 } w \in L(R)\}$；
4. $E_{\mathsf{DFA}} = \{\langle A\rangle : A \text{ 是 DFA 且 } L(A) = \emptyset\}$；
5. $EQ_{\mathsf{DFA}} = \{\langle A, B\rangle : A, B \text{ 是 DFA 且 } L(A) = L(B)\}$。
:::

::: proof
(1) 在 $w$ 上模拟 $B$：在工作磁带上记录当前状态，对 $w$ 的每个符号在编码出的转移表中查一步转移。$\lvert w\rvert$ 步后，当且仅当状态是接受状态时接受。模拟总会结束。
(2) 用子集构造法（[[theory-of-computation/nondeterminism#thm-subset]]）把 $B$ 化成 DFA，再运行 (1) 的判定器——或者直接模拟状态集。
(3) 用汤普森构造（[[theory-of-computation/regular-expressions#thm-thompson]]）把 $R$ 化成 NFA，再运行 (2) 的判定器。
(4) 标记开始状态；反复把每个有箭头从已标记状态射入的状态标记上，直到不再变化；当且仅当没有接受状态被标记时接受（[[theory-of-computation/finite-automata#thm-emptiness]]）。
(5) 为对称差 $L(A) \mathbin{\triangle} L(B)$ 造乘积 DFA $C$（[[theory-of-computation/finite-automata#thm-union-intersection]]），在 $\langle C\rangle$ 上运行 (4) 的判定器；$L(A) = L(B)$ 当且仅当 $L(C) = \emptyset$。
:::

每个证明都把前面某个判定器当子程序用——这个模式我们很快要反过头来证明**不可**判定性。

::: theorem 上下文无关语言类的可判定问题 {#thm-dec-cfg}
下列都可判定：

1. $A_{\mathsf{CFG}} = \{\langle G, w\rangle : G \text{ 是生成 } w \text{ 的 CFG}\}$；
2. $E_{\mathsf{CFG}} = \{\langle G\rangle : G \text{ 是 CFG 且 } L(G) = \emptyset\}$。

从而每个上下文无关语言都可判定。
:::

::: proof
(1) 把 $G$ 化成乔姆斯基范式（[[theory-of-computation/context-free-grammars#thm-cnf]]），运行 CYK（[[theory-of-computation/context-free-grammars#thm-cyk]]）；或者，列出恰含 $2\lvert w\rvert - 1$ 步的一切推导（有穷多个），$w = \varepsilon$ 的情形改用检查规则 $S \to \varepsilon$ 来处理。直接搜索 $G$ 的推导行不通：长度没有上界，搜索可能永远结束不了。

(2) 标记每个终结符。反复把每个具有形如 $A \to X_1 \cdots X_k$（所有 $X_i$ 均已标记）规则的变量 $A$ 标记上，直到不再变化。当且仅当开始变量未被标记时接受。被标记的变量恰是那些能推导出某个终结串的变量（一个方向对迭代轮数归纳，另一个方向对语法分析树的高度归纳），故 $L(G) \ne \emptyset$ 当且仅当 $S$ 被标记。

最后，若 $L$ 上下文无关，取定它的一条文法 $G$。机器"在输入 $w$ 上，对 $\langle G, w\rangle$ 运行 $A_{\mathsf{CFG}}$ 的判定器"就判定 $L$。
:::

::: example 跑一遍文法的空性检验 {#ex-ecfg}
对规则为 $S \to AB \mid C$，$A \to aA$，$B \to b \mid BA$，$C \to cC \mid c$ 的文法施行 $E_{\mathsf{CFG}}$ 的判定器。哪些变量能生成终结串？$L(G)$ 为空吗？$L(G)$ 是什么？
::: solution
先标记终结符 $a, b, c$。第一遍：$B \to b$ 标记 $B$；$C \to c$ 标记 $C$。第二遍：$S \to C$ 标记 $S$；$A$ 唯一的规则 $A \to aA$ 需要 $A$ 自己，$S \to AB$ 也需要 $A$。第三遍：没有新标记。于是 $B$、$C$、$S$ 能生成终结串，$A$ 不能——从 $A$ 出发的任何推导都永远拖着一个 $A$。$S$ 被标记，故 $L(G) \ne \emptyset$，判定器拒绝 $\langle G\rangle$。规则 $S \to AB$ 是废规则，$B \to BA$ 也是；语言就是 $L(C) = \{c^n : n \ge 1\}$。
:::
:::

有一个自然问题，这个套路失灵了。$EQ_{\mathsf{CFG}}$——两台文法生成同一语言吗？——不能像 $EQ_{\mathsf{DFA}}$ 那样处理，因为上下文无关语言对补和交不封闭（[[theory-of-computation/pushdown-automata#thm-cf-nonclosure]]）。事实上它不可判定（[[theory-of-computation/reductions]]）。

迄今遇到的各个类构成一个层级：

$$
\text{正则} \subsetneq \text{上下文无关} \subsetneq \text{可判定} \subsetneq \text{图灵可识别} \subsetneq \text{全体语言}.
$$

前两个包含关系由 $\{0^n1^n\}$ 与 $\{a^nb^nc^n\}$ 知为真包含。本章其余部分证明后两个也是真包含。

::: quiz
按已有结果，下列问题中哪些可判定？
- [x] 给定 DFA $A$，问 $L(A) = \Sigma^*$？
- [x] 给定 CFG $G$ 和正则表达式 $R$，问 $L(G) \cap L(R) = \emptyset$？
- [x] 给定 CFG $G$，问 $G$ 至少生成一个长为 $10$ 的串？
- [ ] 给定两台 CFG $G$ 和 $H$，问 $L(G) = L(H)$？
::: solution
$L(A) = \Sigma^*$ 当且仅当补 DFA（交换接受状态）语言为空：可判定。$L(G) \cap L(R)$ 由 [[theory-of-computation/pushdown-automata#thm-cf-regular]] 是上下文无关的，且该构造是有效的，于是用 $E_{\mathsf{CFG}}$ 检验空性。第三问：与正则语言 $\Sigma^{10}$ 求交再检验非空（或对长为 $10$ 的有穷多个串逐一运行 CYK）。第四问 $EQ_{\mathsf{CFG}}$ 不可判定，我们将在 [[theory-of-computation/reductions]] 中证明。
:::
:::

## 语言比机器多

一个计数论证说明存在不可判定——甚至不可识别——的语言，却不给出任何一个的具体例子。它要用到可数集与不可数集的概念（[Maths Atlas：基数](/learn/maths/lesson.php?c=proofs&l=cardinality)）。

::: theorem 有些语言不是图灵可识别的 {#thm-counting}
对任何字母表 $\Sigma$，$\Sigma$ 上图灵机的集合是可数的，而 $\Sigma$ 上语言的集合是不可数的。从而存在没有任何图灵机识别的语言。
:::

::: proof
*机器是可数的。*每台 TM 都有编码 $\langle M\rangle$，固定字母表上的一个有穷串，不同的机器（除状态改名外）有不同的编码。有穷字母表上有穷串的全体是可数的：按短字典序列出即可。于是机器可列为 $M_1, M_2, M_3, \dots$（必要时重复）。

*语言是不可数的。*按短字典序把 $\Sigma^*$ 列为 $s_1, s_2, s_3, \dots$。语言 $L$ 对应它的**特征序列** $\chi_L$：一个无穷 0-1 序列，其第 $i$ 位为 $1$ 当且仅当 $s_i \in L$；这是语言全体与无穷 0-1 序列之间的双射。康托尔（Cantor）的对角论证说明无穷 0-1 序列不能列尽：任给一个表 $x_1, x_2, \dots$，令 $y_i = 1 - (x_i)_i$，则 $y$ 与每个 $x_i$ 都在第 $i$ 位不同，故 $y$ 不在表中。

每台机器只识别一个语言，而机器只有可数台，所以可识别的语言只有可数个；其余不可数多个语言都不可识别。
:::

::: widget cantor
mode: diagonal
size: 8
caption: 康托尔的对角论证。每一行是一个无穷 0-1 序列——不妨把第 $i$ 行想成第 $i$ 台图灵机所识别语言的特征序列，第 $j$ 列对应串 $s_j$。把对角线上的元素取反，得到的一行与第 $i$ 行在第 $i$ 列不同，于是它是某个语言的特征序列，而该语言不被表中任何机器识别。$A_{\mathsf{TM}}$ 不可判定的证明用的是同一条对角线，只不过把序列换成了机器。
:::

## 接受问题不可判定

计数告诉我们不可识别语言存在，却没说它们是哪个。现在我们来找一个具体的、而且自然的不可判定问题：给定的机器会接受给定的输入吗？

$$
A_{\mathsf{TM}} = \{\langle M, w\rangle : M \text{ 是 TM 且 } M \text{ 接受 } w\}.
$$

::: proposition $A_{\mathsf{TM}}$ 是图灵可识别的 {#prop-atm-recognisable}
[[theory-of-computation/turing-machines#thm-utm]] 的通用机器 $U$ 识别 $A_{\mathsf{TM}}$。
:::

::: proof
在输入 $\langle M, w\rangle$ 上，$U$ 在 $w$ 上模拟 $M$：$M$ 接受则接受，$M$ 拒绝则拒绝。$M$ 接受 $w$ 时 $U$ 接受；否则 $U$ 拒绝或永远运行。故 $L(U) = A_{\mathsf{TM}}$。
:::

$U$ 恰在 $M$ 于 $w$ 上循环时循环。若能识别出这种情形，就能把 $U$ 改造成判定器。但我们做不到。

::: theorem 图灵定理 {#thm-atm}
$A_{\mathsf{TM}}$ 不可判定。
:::

::: proof
反设 $A_{\mathsf{TM}}$ 的某个判定器 $H$ 存在：

$$
H(\langle M, w\rangle) = \begin{cases} \text{accept} & \text{若 } M \text{ 接受 } w, \\ \text{reject} & \text{若 } M \text{ 不接受 } w. \end{cases}
$$

把 $H$ 作为子程序嵌入新机器 $D$，它以某台机器的描述为输入，做那台机器在自己的描述上所做之事的**反面**：

> $D$ = "在输入 $\langle M\rangle$ 上，其中 $M$ 是一台 TM：在 $\langle M, \langle M\rangle\rangle$ 上运行 $H$。$H$ 接受则**拒绝**；$H$ 拒绝则**接受**。"

$D$ 总会停机，因为 $H$ 会。现在让 $D$ 跑自己的描述 $\langle D\rangle$：

$$
D(\langle D\rangle) = \begin{cases} \text{accept} & \text{若 } D \text{ 不接受 } \langle D\rangle, \\ \text{reject} & \text{若 } D \text{ 接受 } \langle D\rangle. \end{cases}
$$

若 $D$ 接受 $\langle D\rangle$，由定义它拒绝 $\langle D\rangle$；若它不接受 $\langle D\rangle$，它又接受 $\langle D\rangle$。两头都不可能。故 $D$ 不存在，因而 $H$ 也不存在。
:::

对角线在哪里？列出所有机器 $M_1, M_2, \dots$，排一张无穷表，第 $i$ 行第 $j$ 列记录 $M_i$ 是否接受 $\langle M_j\rangle$。$H$ 本可算出每个表项。$D$ 的构造正是要在整条对角线上唱反调：在输入 $\langle M_i\rangle$ 上做得与表项 $(i, i)$ 相反。于是 $D$ 与每一行都不同——可 $D$ 是一台机器，所以它必是某一行 $M_k$，而它在第 $k$ 列就得跟自己不同。

::: example 对角表 {#ex-diagonal-table}
设某个机器表中最前四台机器在最前四台机器的描述上的行为如下（"acc"=接受；"—"=拒绝或循环）：

| | $\langle M_1\rangle$ | $\langle M_2\rangle$ | $\langle M_3\rangle$ | $\langle M_4\rangle$ |
|---|---|---|---|---|
| $M_1$ | acc | — | acc | — |
| $M_2$ | acc | acc | acc | acc |
| $M_3$ | — | — | — | acc |
| $M_4$ | acc | — | acc | — |

$D$ 在这四个输入上各做什么？为什么 $D$ 不是 $M_1, \dots, M_4$ 中的任何一个？
::: solution
$D$ 把对角线 $(\text{acc}, \text{acc}, \text{—}, \text{—})$ 逐条反转：它拒绝 $\langle M_1\rangle$，拒绝 $\langle M_2\rangle$，接受 $\langle M_3\rangle$，接受 $\langle M_4\rangle$。它的一行是 $(\text{—}, \text{—}, \text{acc}, \text{acc})$，对每个 $i$ 都在第 $i$ 列与第 $i$ 行不同。它在别处也与第 $1$ 行不同，但对角线保证它与*每一*行都有差异，无论表多长。若有 $H$ 则 $D$ 将是一台图灵机，于是 $D = M_k$（某个 $k$），而它在第 $k$ 列的表项就必须既是对角元又是对角元的反面。
:::
:::

### 一个打败一切停机检查器的程序

这个论证在有用的意义下是构造性的：给定任何自称的停机检查器，它都能产出一个让该检查器出错的具体程序。在 Python 里，函数是值，整个构造只需几行。真正的"停机判定器"我们跑不了——它不存在——但我们可以拿几个像模像样的候选者来经受这个构造，看它们一个个败下阵来：

```python
import inspect, threading

def contrary(halts):
    """造出与 `halts` 对它的预测唱反调的程序."""
    def d():
        if halts(d):
            while True:                      # 预测它会停机：就永远循环
                pass
        return "halted"                      # 预测它循环：立刻返回停机
    return d

def observe(f, seconds=0.5):
    """在后台线程中运行 f，报告时限内观察到的情形."""
    t = threading.Thread(target=f, daemon=True)
    t.start(); t.join(seconds)
    return "still running" if t.is_alive() else "halted"

candidates = {
    "always yes": lambda f: True,
    "always no": lambda f: False,
    "no 'while' in source": lambda f: "while" not in inspect.getsource(f),
}
for name, h in candidates.items():
    d = contrary(h)
    print(f"{name:22} predicts {'halts' if h(d) else 'loops':6}  observed: {observe(d)}")
```

```console
$ python3 diagonal.py
always yes             predicts halts   observed: still running
always no              predicts loops   observed: halted
no 'while' in source   predicts loops   observed: halted
```

"半秒后仍在运行"当然只是一种观察；但在这里我们能从代码上看出 `d` 正处于一个永不退出的 `while True` 循环中。候选者再聪明，`contrary` 也能造出一个让它判断错误的程序——只要候选者总能返回答案。有的候选者有时永远运行（例如模拟其参数的那种），它逃脱矛盾的唯一办法，恰恰是它自己不是判定器。

## 停机问题

$A_{\mathsf{TM}}$ 问的是接受。程序员关心的问题则是停机：

$$
\mathit{HALT}_{\mathsf{TM}} = \{\langle M, w\rangle : M \text{ 是 TM 且 } M \text{ 在输入 } w \text{ 上停机}\}.
$$

::: theorem 停机问题的不可判定性 {#thm-halt}
$\mathit{HALT}_{\mathsf{TM}}$ 不可判定。它是图灵可识别的。
:::

::: proof
*可识别：*在 $w$ 上模拟 $M$，它停机（不论以接受还是拒绝停机）就接受。

*不可判定：*反设 $\mathit{HALT}_{\mathsf{TM}}$ 的判定器 $R$ 存在。那么下面这台机器 $S$ 就能判定 $A_{\mathsf{TM}}$：

> $S$ = "在输入 $\langle M, w\rangle$ 上：在 $\langle M, w\rangle$ 上运行 $R$。$R$ 拒绝则**拒绝**（$M$ 在 $w$ 上循环，故不接受）。$R$ 接受则在 $w$ 上模拟 $M$ 直到它停机——它必会停机——$M$ 接受则**接受**，拒绝则**拒绝**。"

$S$ 总会停机，且恰在 $M$ 接受 $w$ 时接受。这与 [[#thm-atm]] 矛盾，故 $R$ 不存在。
:::

::: example 有界接受是可判定的 {#ex-bounded}
证明 $A_{\mathsf{TM}}^{(k)} = \{\langle M, w, 1^k\rangle : M \text{ 在 } k \text{ 步内接受 } w\}$ 可判定，并说明为什么它对判定 $A_{\mathsf{TM}}$ 帮不上忙。
::: solution
判定器：用通用机器在 $w$ 上模拟 $M$ 至多 $k$ 步，$M$ 此时已接受则接受。模拟总会结束，至多 $k$ 个模拟步。要用它判定 $A_{\mathsf{TM}}$，就需要对每个 $\langle M, w\rangle$ 给出一个界 $k$，使得 $M$ 若接受 $w$ 就必在 $k$ 步内完成。若存在可计算函数 $f$ 给出这样的界 $f(\langle M, w\rangle)$，那么"模拟 $f(\langle M, w\rangle)$ 步"就判定 $A_{\mathsf{TM}}$，与 [[#thm-atm]] 矛盾。所以不存在以 $\langle M, w\rangle$ 为变量、能给接受运行的时间立界的可计算函数。[[theory-of-computation/turing-machines]] 习题中的忙海狸函数是最著名的例证：它比每个可计算函数增长得都快。
:::
:::

这个证明没有重演对角论证。它表明 $\mathit{HALT}_{\mathsf{TM}}$ 的判定器可以被*用来*判定 $A_{\mathsf{TM}}$，于是前一个问题至少和后一样难。这就是一次**归约**，即下一章的主要工具。

::: warning 停机定理说了什么、没说什么
它说的是：不存在对*所有*对 $\langle M, w\rangle$ 都能答对的*单一*算法。它并没有说我们永远无法判断*某个特定*程序是否停机：对我们写的大多数程序都能判断，而停机检查器（例如 2026 年的证明助手 Coq/Rocq、Agda 和 Lean 中的那些）能自动证明大类函数的终止性。这类工具中的任何一个，都必须在某些程序上答"不知道"或者永远运行。定理也与运行时间无关：运行了十亿步还没停机的程序之后仍可能停机，而任何固定超时都不可能对一切程序正确。它也不是图灵机的怪癖：按丘奇–图灵论题，它对每种程序设计语言、每台计算机都成立。
:::

## 可识别、余可识别、可判定

若 $\overline{L}$ 图灵可识别，则称 $L$ 是**余图灵可识别**的。可判定语言两者皆是；反过来也对：

::: theorem 可判定 = 可识别且余可识别 {#thm-co-re}
语言 $L$ 可判定，当且仅当 $L$ 与 $\overline{L}$ 都图灵可识别。
:::

::: proof
（$\Rightarrow$）$L$ 的判定器识别 $L$；交换其接受与拒绝状态，得 $\overline{L}$ 的判定器，从而也是识别器。

（$\Leftarrow$）设 $M_1$ 识别 $L$，$M_2$ 识别 $\overline{L}$。在输入 $w$ 上**并行**运行 $M_1$ 与 $M_2$——用两条磁带，交替各走一步——直到其中一台接受。每个 $w$ 属于 $L$ 或 $\overline{L}$，故两台机器中必有一台终会接受。$M_1$ 接受则接受；$M_2$ 接受则拒绝。这台机器总会停机，且恰接受 $L$。
:::

::: corollary $\overline{A_{\mathsf{TM}}}$ 不是图灵可识别的 {#cor-atm-complement}
$A_{\mathsf{TM}}$ 的补集——使 $M$ 不接受 $w$ 的对 $\langle M, w\rangle$（连同不构成合法编码的串）——不是图灵可识别的。
:::

::: proof
$A_{\mathsf{TM}}$ 可识别（[[#prop-atm-recognisable]]）。若 $\overline{A_{\mathsf{TM}}}$ 也可识别，则由 [[#thm-co-re]]，$A_{\mathsf{TM}}$ 可判定，与 [[#thm-atm]] 矛盾。
:::

于是包含关系"可判定 $\subsetneq$ 可识别 $\subsetneq$ 全体语言"两处都是真包含，见证分别是 $A_{\mathsf{TM}}$ 与 $\overline{A_{\mathsf{TM}}}$。直观地说：若 $M$ 接受 $w$，存在有限证书（那段接受计算），机器靠模拟就能找到它；若 $M$ 不接受 $w$ 是因为在循环，再多的有穷模拟也无法证实这一点。

::: example 一个可识别语言和它的补 {#ex-co-re}
设 $E_{\mathsf{TM}}^{\ne} = \{\langle M\rangle : L(M) \ne \emptyset\}$。证明它图灵可识别，并说明同一个想法为什么识别不了 $\{\langle M\rangle : L(M) = \emptyset\}$。
::: solution
识别器：在输入 $\langle M\rangle$ 上，对 $i = 1, 2, 3, \dots$，在短字典序的前 $i$ 个串 $s_1, \dots, s_i$ 上各运行 $M$ 至多 $i$ 步，这些运行中任一接受就接受。这就是 [[theory-of-computation/turing-machines#thm-enumerator]] 的交错模拟。若 $M$ 接受某个 $s_j$、比如用了 $t$ 步，则识别器在第 $\max(j, t)$ 轮接受。若 $L(M) = \emptyset$，它永远运行。

至于补集，我们必须确认*没有*任何串会被接受——无穷多个串，每个都可能需要无界时间——而搜索的任何有穷阶段都给不出证书。事实上 $\{\langle M\rangle : L(M) = \emptyset\}$ 不可识别（见 [[theory-of-computation/reductions]]）；由 [[#thm-co-re]]，既然它的补可识别，它也必然不可判定。
:::
:::

::: widget cantor
mode: pairing
size: 8
caption: 用图画表现交错模拟。第 $i$ 行是输入 $s_i$，第 $t$ 列是"运行 $t$ 步"。之字形顺序在有限步之后访问每个对 $(i, t)$，所以沿它走的识别器能找到每一段接受计算——尽管有些运行（有些行）永不结束。[[#ex-co-re]] 中 $E_{\mathsf{TM}}^{\ne}$ 就是这样被识别的，枚举器列出可识别语言也是这个办法。
:::

::: quiz
下列哪些命题为真？
- [x] 若 $L$ 可识别但不可判定，则 $\overline{L}$ 不可识别。
- [ ] 若 $L$ 不可判定，则 $\overline{L}$ 不可识别。
- [x] $\mathit{HALT}_{\mathsf{TM}}$ 是可识别的。
- [ ] 每个语言要么可识别、要么余可识别。
::: solution
第一条是 [[#thm-co-re]] 的逆否形式。第二条对 $L = \overline{A_{\mathsf{TM}}}$ 不成立：它不可判定，但它的补 $A_{\mathsf{TM}}$ 可识别。$\mathit{HALT}_{\mathsf{TM}}$ 由模拟被识别。最后一条不成立：计数表明语言有不可数个，而可识别或余可识别的只有可数个；[[theory-of-computation/reductions]] 给出显式例子 $EQ_{\mathsf{TM}}$。
:::
:::

::: history
格奥尔格·康托尔（Georg Cantor）于 1891 年引入对角论证，证明实数不可数。库尔特·哥德尔（Kurt Gödel）在他不完备性定理（1931）中使用了相关的自指：任何相容的、可有效公理化的算术理论都包含它无法证明的真命题。艾伦·图灵（Alan Turing）1936 年的 "On computable numbers" 把对角化移植到机器上，证明没有机器能判定任意机器是否会打印某个给定符号，并由此推出希尔伯特的 *Entscheidungsproblem* 无解；丘奇（Church）用 $\lambda$ 演算得到同样结论。以*停机*问题为表述的现代形式出自后来的作者——马丁·戴维斯（Martin Davis）的教科书 *Computability and Unsolvability*（1958）使这一名称广为流传。有限自动机的判定程序来自拉宾（Rabin）与斯科特（Scott）（1959），上下文无关文法的判定程序来自巴尔-希勒尔（Bar-Hillel）、珀尔斯（Perles）与沙米尔（Shamir）（1961）。1970 年，尤里·马蒂亚塞维奇（Yuri Matiyasevich）在马丁·戴维斯（Martin Davis）、希拉里·普特南（Hilary Putnam）与朱莉娅·罗宾逊（Julia Robinson）工作的基础上完成证明：希尔伯特第十问题——整系数多项式方程是否有整数解——不可判定。
:::

## 后续内容

$\mathit{HALT}_{\mathsf{TM}}$ 不可判定的证明，是用一个问题的判定器去造另一个问题的判定器。[[theory-of-computation/reductions]] 把这一招提炼成方法——**映射归约**——并用它证明图灵机的空性、等价性、正则性不可判定，程序的每个非平凡性质都不可判定（**赖斯（Rice）定理**），以及一些通篇不提机器的问题，如波斯特对应问题、上下文无关文法的二义性与等价性。给判定器可使用的资源设限，便通向 [[complexity]]。

::: summary
- **判定问题**是由"是"实例的编码构成的语言；它的算法就是判定器（[[theory-of-computation/turing-machines#def-recognisable]]）。
- DFA、NFA、正则表达式的接受、空性、等价问题可判定（[[#thm-dec-regular]]）；CFG 的接受与空性可判定，故每个 CFL 可判定（[[#thm-dec-cfg]]）。CFG 的等价性不然。
- 机器只有可数台，语言却有不可数个，故有些语言不可识别（[[#thm-counting]]）。
- $A_{\mathsf{TM}}$ 可识别（由通用机器）但**不可判定**（[[#thm-atm]]），证明靠对角化：判定器 $H$ 会造出一台在 $\langle D\rangle$ 上自我矛盾的机器 $D$。
- **停机问题**不可判定（[[#thm-halt]]）：它的判定器将能判定 $A_{\mathsf{TM}}$。
- $L$ 可判定当且仅当 $L$ 与 $\overline{L}$ 都可识别（[[#thm-co-re]]）；故 $\overline{A_{\mathsf{TM}}}$ 不可识别。
:::

## 习题

::: exercise 可判定吗？ {level=1}
证明下列各问题可判定：(a) $\{\langle A\rangle : A \text{ 是 DFA 且 } L(A) \text{ 无穷}\}$；(b) $\{\langle A\rangle : A \text{ 是接受某个回文串的 DFA}\}$。(b) 为什么单靠 DFA 的算法不够？
::: solution
(a) 用 [[theory-of-computation/finite-automata#thm-emptiness]] 的圈检验即可判定：$L(A)$ 无穷当且仅当某条圈位于从开始状态到某接受状态的路径上。

(b) 也可判定，但 DFA 方法本身不够，因为回文串不正则。回文串构成上下文无关语言，故 $L(A) \cap \mathrm{PAL}$ 上下文无关，且可由 $A$ 和 $\mathrm{PAL}$ 的一条文法构造出它的文法（[[theory-of-computation/pushdown-automata#thm-cf-regular]]）；再用 $E_{\mathsf{CFG}}$ 检验非空（[[#thm-dec-cfg]]）。
:::
:::

::: exercise 数机器 {level=1 check="65536"}
数一数恰有 $2$ 个非停机状态 $q_1, q_2$、带字母表 $\{0, 1\}$（$0$ 为空白）、外加两个停机状态 $q_{\text{acc}}, q_{\text{rej}}$ 的图灵机：一台机器由它在 $4$ 对（状态，符号）上的转移函数决定，每对映到（新状态，写入符号，方向）。（输入转移函数的个数。）
::: solution
$2 \times 2 = 4$ 对（状态，符号）中的每一对都映到一个三元组：新状态取自 $q_1, q_2, q_{\text{acc}}, q_{\text{rej}}$（$4$ 种选择），写入符号是 $0$ 或 $1$（$2$ 种），方向是 $L$ 或 $R$（$2$ 种）。每对有 $16$ 种可能取值，四对独立选取，故共有 $16^4 = 65{,}536$ 个转移函数。其中许多行为完全相同（比如只在从未到达的状态的转移上有所不同的两台机器），但每一个都是 [[#thm-counting]] 中可数清单里不同的元素。
:::
:::

::: exercise 一个自指论证 {level=1}
有学生声称："我能判定一个 C 程序是否停机：编译它，设一小时的超时跑一遍，没跑完就说它*循环*。"给出两条理由，说明这不是停机问题的判定器。
::: solution
第一，程序可能在一小时之后才停机，而该学生会误判为*循环*；任何固定超时对一切程序都不可能对，因为对任何界限，都存在恰在界限之后停机的程序（比如一个数到很大数的循环）。第二，对角构造直接让它出局：用 `contrary` 依该学生的方法造出的程序——"拿这套测试来测我自己；它说*停机*我就循环；否则我就停机"——需要一个多小时才得到答案*循环*，然后就停机了，于是被误判。这套方法只是一个半边的可靠*半*检验：程序在一小时内跑完，则它必停机。
:::
:::

::: exercise 封闭性与可识别性 {level=2}
用一台交替走步的 2 带机器证明：若 $L_1$ 与 $L_2$ 可识别，则 $L_1 \cup L_2$ 可识别；若 $L$ 可识别且 $\overline{L}$ 可识别，则 $L$ 可判定。
::: solution
*并：*在输入 $w$ 上并行运行识别器 $M_1$ 与 $M_2$，交替各走单步（两条工作磁带，各存一份 $w$ 的副本），任一接受就立刻接受。若 $w \in L_1 \cup L_2$，其中一台在它自己的有限步内接受，从而在有限步交替之内接受。若不属于，则两台都不接受，机器永不接受。（先让 $M_1$ 跑完会在 $M_1$ 于某个属于 $L_2$ 的串上循环时失效。）

*可判定性：*这就是 [[#thm-co-re]]：$L$ 的识别器与 $\overline{L}$ 的识别器的并行运行总会结束，因为每个串必属于这两个语言之一。
:::
:::

::: exercise 空输入上的停机 {level=2}
证明 $\mathit{HALT}_\varepsilon = \{\langle M\rangle : M \text{ 在输入 } \varepsilon \text{ 上停机}\}$ 不可判定——方法是说明它的判定器如何判定 $\mathit{HALT}_{\mathsf{TM}}$。
::: solution
给定 $\langle M, w\rangle$，造机器 $M_w$ = "擦去输入，在磁带上写下 $w$，回到左端，然后运行 $M$"。$M_w$ 在 $\varepsilon$（事实上在每个输入）上停机当且仅当 $M$ 在 $w$ 上停机。这一构造是把 $\langle M, w\rangle$ 变成 $\langle M_w\rangle$ 的简单可计算变换（添上写出 $w$ 所需的 $\lvert w\rvert + O(1)$ 个状态）。于是"在输入 $\langle M, w\rangle$ 上，造出 $\langle M_w\rangle$，对它运行 $\mathit{HALT}_\varepsilon$ 的判定器"将判定 $\mathit{HALT}_{\mathsf{TM}}$，与 [[#thm-halt]] 矛盾。这是一次映射归约，[[theory-of-computation/reductions]] 中给出其形式化。
:::
:::

::: exercise 两者都不是的语言 {level=2}
证明 $J = \{0x : x \in A_{\mathsf{TM}}\} \cup \{1x : x \notin A_{\mathsf{TM}}\}$ 既不图灵可识别、也不余图灵可识别。
::: solution
*$J$ 不可识别。*若有 $M$ 识别 $J$，那么"在输入 $x$ 上，在 $1x$ 上运行 $M$"就识别 $\overline{A_{\mathsf{TM}}}$，因为 $1x \in J$ 当且仅当 $x \notin A_{\mathsf{TM}}$。这与 [[#cor-atm-complement]] 矛盾。

*$\overline{J}$ 不可识别。*$\overline{J} = \{0x : x \notin A_{\mathsf{TM}}\} \cup \{1x : x \in A_{\mathsf{TM}}\} \cup \{\varepsilon\}$。若有 $M'$ 识别它，那么"在输入 $x$ 上，在 $0x$ 上运行 $M'$"又识别了 $\overline{A_{\mathsf{TM}}}$。矛盾。

于是 $J$ 处在可识别语言与余可识别语言之外：它把一个问题和它的补并肩编在一起，也就同时继承了两者的难度。
:::
:::

::: exercise 对判定器对角化 {level=3}
设 $M_1, M_2, \dots$ 是全体图灵机的一个枚举（按编码的短字典序），$s_1, s_2, \dots$ 是按短字典序排列的串。定义 $L_{\text{diag}} = \{s_i : M_i \text{ 不接受 } s_i\}$。(a) 证明 $L_{\text{diag}}$ 不图灵可识别。(b) 它余可识别吗？(c) 设 $\mathrm{DEC} = \{\langle M\rangle : M \text{ 是判定器}\}$。证明不存在这样一个可识别的判定器集合，它对每个可判定语言都含有一个判定器——也就是说，判定器无法被有效地列出。（提示：对角化。）
::: solution
(a) 若 $M_k$ 识别 $L_{\text{diag}}$，则 $s_k \in L_{\text{diag}}$ 当且仅当 $M_k$ 接受 $s_k$（因为 $M_k$ 识别它）当且仅当 $s_k \notin L_{\text{diag}}$（按定义）。矛盾。

(b) 是的。它的补是 $\{s_i : M_i \text{ 接受 } s_i\}$，可用如下机器识别：在输入 $s$ 上找满足 $s = s_i$ 的 $i$，算出 $\langle M_i\rangle$（按短字典序枚举编码并数合法的那些），再用通用机器在 $s_i$ 上模拟 $M_i$。

(c) 反设枚举器 $E$ 列出判定器 $D_1, D_2, \dots$，且每个可判定语言都有其中某个判定器判定它。定义 $L = \{s_i : D_i \text{ 拒绝 } s_i\}$。$L$ 可判定：在输入 $s = s_i$ 上运行 $E$ 直到打印 $D_i$，在 $s_i$ 上运行 $D_i$（会停机），给出相反的答案。于是某个 $D_k$ 判定 $L$。但那样 $s_k \in L$ 当且仅当 $D_k$ 拒绝 $s_k$ 当且仅当 $s_k \notin L$——矛盾。故这样的枚举不存在；特别地，$\mathrm{DEC}$ 本身不可识别（它的识别器可以用交错模拟改造成这样一个枚举器）。
:::
:::

::: exercise 有界内存程序的停机 {level=3}
**线性有界自动机**（LBA）是读头从不离开存放输入的各格的 TM（端标记不妨越过）。通过给格局数立上界，证明 $A_{\mathsf{LBA}} = \{\langle M, w\rangle : M \text{ 是 LBA 且接受 } w\}$ 可判定。这为什么不与 [[#thm-atm]] 矛盾？同样的论证为什么说明：在内存固定的计算机上，程序的停机问题"原则上"可判定、实际上却毫无用处？
::: solution
拥有 $q$ 个状态、$g$ 个带符号的 LBA 在长 $n$ 的输入上至多有 $q \cdot n \cdot g^n$ 个格局（状态、读头位置、磁带内容）。若它运行超过这么多步，必有格局重复；而机器是确定的，于是将永远重复下去：它循环了。所以判定器在 $w$ 上模拟 $M$ 共 $qng^n$ 步；$M$ 已接受则接受；否则（拒绝或仍在运行、因而循环）拒绝。这总会停机。

它与 [[#thm-atm]] 不矛盾，因为 LBA 只是受限类：由 $A_{\mathsf{LBA}}$ 的判定器造出的对角机器 $D$ 需要的空间超出 LBA 所能用的，故 $D$ 本身不是 LBA，矛盾无从发生。

拥有 $m$ 位内存（含寄存器和磁盘）的计算机是有 $2^m$ 个格局的有限状态机，其停机问题可由同样的圈论证判定。但取 $m = 8 \cdot 2^{30}$（一 GiB），界 $2^m$ 已天文数字地超出任何可行计算；实践中的工具都当内存无界来对待真实程序——这正是对程序而言相关定理是停机问题不可判定性的原因。
:::
:::
