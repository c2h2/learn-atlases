一旦有一个问题被证明不可解，别的问题便很快跟着倒下。证明停机问题不可判定（[[theory-of-computation/decidability#thm-halt]]）时，我们并没有再对角化一次；我们说明停机问题的判定器可以变成接受问题的判定器，而后者不可能存在。这一招——把一个问题**归约**到另一个问题——是可计算性理论的主要技术，也是其后复杂性理论的主要技术（[[complexity]]），其中问题之间的归约定义了 $\mathsf{NP}$ 完全性。

本章把归约精确化为**映射归约**，并用它证明一系列不可判定性结果。其中几个是关于图灵机的：一台机器是否接受任何东西，它的语言是否正则，两台机器是否等价。随后的**赖斯（Rice）定理**一揽子解决所有这类问题：程序所识别语言的*每一个*非平凡性质都不可判定。最后我们抛开机器。**波斯特（Post）对应问题**是一个关于骨牌的游戏，通篇不提任何机器，却不可判定——而经由它，关于上下文无关文法的自然问题——例如一台文法是否二义——也不可判定。

## 映射归约

::: definition 可计算函数 {#def-computable}
函数 $f\colon \Sigma^* \to \Sigma^*$ 称为**可计算的**，若存在一台图灵机，在任何输入 $w$ 上都停机，且磁带上恰好是 $f(w)$。
:::

对编码对象的一切常规变换都是可计算的：给旧机器添状态造出新机器，把两台自动机合成乘积自动机，把文法化成范式。按丘奇–图灵论题，"可计算"就是"存在一个算法能算出它且永远终止"。

::: definition 映射归约 {#def-mapping-reduction}
语言 $A$ **映射归约可**到语言 $B$，记作 $A \le_m B$，若存在可计算函数 $f$，使得对每个 $w$，

$$
w \in A \iff f(w) \in B.
$$ {#eq-reduction}

函数 $f$ 称为从 $A$ 到 $B$ 的一个**归约**。
:::

归约把每一个"$w$ 属于 $A$ 吗？"的问句翻译成答案相同的"$f(w)$ 属于 $B$ 吗？"的问句。"当且仅当"的两个方向都不可偏废：是实例必须变成是实例，**并且**否实例必须变成否实例。$f$ 不必是单射或满射，而且它在不知道答案的情况下被算出。

::: widget mapping
domain: w1; w2; w3; w4
codomain: y1; y2; y3; y4; y5
map: w1>y2; w2>y4; w3>y1; w4>y4
editable: false
caption: 用箭头图表示一次归约。设 $w_1, w_3 \in A$ 而 $w_2, w_4 \notin A$；那么 $f$ 是从 $A$ 到 $B$ 的归约，恰好当 $y_2, y_1 \in B$ 且 $y_4 \notin B$——$y_3$ 与 $y_5$ 如何都无所谓。正如读数的显示，这个 $f$ 既非单射也非满射，这没有妨碍：归约只需保住答案。但它必须能在*不知道*答案的情况下被计算出来。
:::

::: theorem 归约传递可判定性 {#thm-reduction}
设 $A \le_m B$。则：

1. 若 $B$ 可判定，$A$ 也可判定；若 $A$ 不可判定，$B$ 也不可判定；
2. 若 $B$ 图灵可识别，$A$ 也可识别；若 $A$ 不图灵可识别，$B$ 也不图灵可识别；
3. 用同一个函数有 $\overline{A} \le_m \overline{B}$；
4. 若还有 $B \le_m C$，则 $A \le_m C$。
:::

::: proof
设 $f$ 为归约。(1) 与 (2)：若 $M$ 判定（识别）$B$，则机器"在输入 $w$ 上算出 $f(w)$，在它上面运行 $M$"判定（识别）$A$，因为由 [[#eq-reduction]]，$M$ 接受 $f(w)$ 当且仅当 $f(w) \in B$ 当且仅当 $w \in A$；$M$ 停机它便停机。后半句都是逆否命题。(3)：[[#eq-reduction]] 等价于 $w \notin A \iff f(w) \notin B$。(4)：若 $g$ 把 $B$ 归约到 $C$，则 $g \circ f$ 可计算（先后运行两台机器），且 $w \in A \iff f(w) \in B \iff g(f(w)) \in C$。
:::

注意方向。要证明新问题 $B$ 不可判定，应把一个*已知的*不可判定问题 $A$ 归约**到** $B$：说明 $B$ 至少和 $A$ 一样难。把 $B$ 归约到一个不可判定问题，对 $B$ 什么也说明不了。

::: example 接受归约到停机 {#ex-atm-halt}
给出从 $A_{\mathsf{TM}}$ 到 $\mathit{HALT}_{\mathsf{TM}}$ 的一个映射归约。
::: solution
在输入 $\langle M, w\rangle$ 上，输出 $\langle M', w\rangle$，其中

> $M'$ = "在输入 $x$ 上：在 $x$ 上运行 $M$。$M$ 接受则**接受**。$M$ 拒绝则永远**循环**。"

$M'$ 由 $M$ 改动而来：把每个进入 $q_{\text{rej}}$ 的转移改为进入一个新状态，该状态永远右移——对编码的一次简单、可计算的改动。$M$ 接受 $w$ 则 $M'$ 在 $w$ 上停机。$M$ 拒绝 $w$ 则 $M'$ 循环；$M$ 在 $w$ 上循环则 $M'$ 也循环。故 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M', w\rangle \in \mathit{HALT}_{\mathsf{TM}}$。（不构成合法编码的串映到某个固定的、不属于 $\mathit{HALT}_{\mathsf{TM}}$ 的串。）这就给出 [[theory-of-computation/decidability#thm-halt]] 的第二个证明。
:::
:::

## 关于机器的不可判定问题

::: theorem 空性不可判定 {#thm-etm}
$E_{\mathsf{TM}} = \{\langle M\rangle : M \text{ 是 TM 且 } L(M) = \emptyset\}$ 不可判定，甚至不图灵可识别。
:::

::: proof
我们证明 $A_{\mathsf{TM}} \le_m \overline{E_{\mathsf{TM}}}$。给定 $\langle M, w\rangle$，输出 $\langle M_1\rangle$，其中

> $M_1$ = "在输入 $x$ 上：若 $x \ne w$，**拒绝**。若 $x = w$，在 $w$ 上运行 $M$，$M$ 接受则**接受**。"

（$w$ 被内建在 $M_1$ 的状态里，所以由 $\langle M, w\rangle$ 造出它是可计算的。）$M$ 接受 $w$ 时 $L(M_1)$ 是 $\{w\}$，否则是 $\emptyset$。故 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff L(M_1) \ne \emptyset \iff \langle M_1\rangle \in \overline{E_{\mathsf{TM}}}$。

由 [[#thm-reduction]] (1)，$\overline{E_{\mathsf{TM}}}$ 不可判定，于是 $E_{\mathsf{TM}}$ 也不可判定（可判定语言对补封闭）。由 [[#thm-reduction]] (3)，$\overline{A_{\mathsf{TM}}} \le_m E_{\mathsf{TM}}$；而 $\overline{A_{\mathsf{TM}}}$ 不可识别（[[theory-of-computation/decidability#cor-atm-complement]]），由 (2)，$E_{\mathsf{TM}}$ 也不可信。
:::

它的补 $\overline{E_{\mathsf{TM}}}$ 则*可*识别，用交错模拟（[[theory-of-computation/decidability#ex-co-re]]）。

::: theorem 正则性不可判定 {#thm-regular-tm}
$\mathit{REGULAR}_{\mathsf{TM}} = \{\langle M\rangle : L(M) \text{ 是正则的}\}$ 不可判定。
:::

::: proof
我们把 $A_{\mathsf{TM}}$ 归约到它。给定 $\langle M, w\rangle$，输出 $\langle M_2\rangle$：

> $M_2$ = "在输入 $x$ 上：若 $x = 0^n1^n$（某个 $n$），**接受**。否则在 $w$ 上运行 $M$，$M$ 接受 $w$ 则接受 $x$。"

$M$ 接受 $w$ 时，$M_2$ 接受一切串：$L(M_2) = \Sigma^*$，正则。否则 $M_2$ 恰接受诸串 $0^n1^n$：$L(M_2) = \{0^n1^n\}$，不正则。故 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M_2 \rangle \in \mathit{REGULAR}_{\mathsf{TM}}$。
:::

这一构造从不*运行* $M_2$：归约只是写出它的描述。$M_2$ 是否在某些输入上循环无关紧要；要紧的是它的语言，而两种情形下我们都认识它。

::: theorem 等价问题既不可识别也不余可识别 {#thm-eqtm}
$EQ_{\mathsf{TM}} = \{\langle M_1, M_2\rangle : L(M_1) = L(M_2)\}$ 既不图灵可识别、也不余图灵可识别。
:::

::: proof
*$A_{\mathsf{TM}} \le_m \overline{EQ_{\mathsf{TM}}}$。*给定 $\langle M, w\rangle$，输出 $\langle R, N\rangle$：$R$ 拒绝一切输入，$N$ = "对任何输入，在 $w$ 上运行 $M$，它接受则接受"。则 $L(R) = \emptyset$，而 $M$ 接受 $w$ 时 $L(N) = \Sigma^*$，否则 $L(N) = \emptyset$。于是 $M$ 接受 $w$ 当且仅当 $L(R) \ne L(N)$。由 (3)，$\overline{A_{\mathsf{TM}}} \le_m EQ_{\mathsf{TM}}$，故 $EQ_{\mathsf{TM}}$ 不可识别。

*$A_{\mathsf{TM}} \le_m EQ_{\mathsf{TM}}$。*输出 $\langle Y, N\rangle$：$Y$ 接受一切输入，$N$ 同上——$M$ 接受 $w$ 当且仅当 $L(Y) = L(N)$。由 (3)，$\overline{A_{\mathsf{TM}}} \le_m \overline{EQ_{\mathsf{TM}}}$，故 $\overline{EQ_{\mathsf{TM}}}$ 不可识别，即 $EQ_{\mathsf{TM}}$ 不余可识别。
:::

::: example 这个程序会打印 hello 吗 {#ex-hello}
证明不存在这样的算法：对任意不带参数的 Python 函数 `f`，判定调用 `f()` 是否会打印出一行 `hello`。
::: solution
把 Python 程序的停机问题（由丘奇–图灵论题与 [[theory-of-computation/decidability#thm-halt]] 知不可判定）归约到它。给定程序 `p` 和输入 `x`，造一个函数：先丢弃输出运行 `p` 于 `x`，然后打印 `hello`：

```python
import contextlib, io

def make_f(p, x):
    """构造 f，使得 f() 打印 'hello' 当且仅当 p 在 x 上停机."""
    def f():
        with contextlib.redirect_stdout(io.StringIO()):   # 丢弃 p 自己的输出
            p(x)
        print("hello")                                    # 当且仅当 p(x) 返回才走到这里
    return f

def collatz(n):                  # 所有有人试过的 n 都停机
    while n != 1:
        print(n)
        n = 3 * n + 1 if n % 2 else n // 2

make_f(collatz, 27)()
```

```console
$ python3 hello.py
hello
```

`collatz(27)` 打印的那 111 个数被吞掉了，而 `hello` 在它返回后出现一次。若 `p` 永远运行，`f()` 永远走不到它的 `print`，`p` 打印的一切也都看不到。于是 `f()` 打印 `hello` 当且仅当 `p` 在 `x` 上停机；而由 `p` 和 `x` 的源码造出 `f` 的源码是一次简单、可计算的文本变换。因此"hello 问题"的判定器将能判定停机问题。（严密的版本还得阻止 `p` 撤销重定向，沙箱可以做到；要点在于这次归约只是一次普通的程序变换。）同样的论证适用于"是否会向这个文件写入"、"是否会打开网络连接"、"是否会除以零"——这正是此类检查在实践中只能是近似的原因。
:::
:::

程序等价问题因此超出了连识别器的"半判定"都够不着的地步——两个方向都是。这就是编译器证明一项优化保持行为时采用按构造保证、一次性对所有程序成立的做法，而不是逐个检查它所编译的每个程序的原因。

::: quiz
一个学生想证明 $\mathit{FIN}_{\mathsf{TM}} = \{\langle M\rangle : L(M) \text{ 是有穷的}\}$ 不可判定。哪些做法是对的？
- [ ] 给出可计算函数 $f$，使 $\langle M\rangle \in \mathit{FIN}_{\mathsf{TM}} \iff f(\langle M\rangle) \in A_{\mathsf{TM}}$。
- [x] 给出可计算函数 $f$，使 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff f(\langle M, w\rangle) \notin \mathit{FIN}_{\mathsf{TM}}$。
- [x] 套用赖斯定理。
::: solution
第一条是把 $\mathit{FIN}_{\mathsf{TM}}$ 归约*到* $A_{\mathsf{TM}}$，那只能说明它不比一个不可判定问题更难——毫无信息。第二条是从 $A_{\mathsf{TM}}$ 到 $\overline{\mathit{FIN}_{\mathsf{TM}}}$ 的归约（例如 $f(\langle M, w\rangle) = \langle N\rangle$，其中 $M$ 接受 $w$ 时 $N$ 接受一切，否则什么都不接受），它证明 $\overline{\mathit{FIN}_{\mathsf{TM}}}$ 不可判定，从而 $\mathit{FIN}_{\mathsf{TM}}$ 也不可判定。有穷性是语言的一个非平凡性质，赖斯定理直接适用。
:::
:::

## 赖斯定理

上面的诸归约共享一个模式：从 $\langle M, w\rangle$ 造一台机器，其*语言*按 $M$ 是否接受 $w$ 恰为两个固定语言之一。亨利·戈登·赖斯（Henry Gordon Rice）看出，这对语言的任何性质都行得通。

::: definition 可识别语言的性质 {#def-property}
图灵可识别语言的一个**性质**是若干可识别语言的集合 $P$；语言 $L$ **具有**该性质指 $L \in P$。若某个可识别语言具有 $P$ 而某个可识别语言不具有 $P$，则称 $P$ **非平凡**。记 $L_P = \{\langle M\rangle : M \text{ 是 TM 且 } L(M) \in P\}$。
:::

因为 $P$ 是*语言*的集合，$\langle M\rangle \in L_P$ 与否只取决于 $L(M)$：若 $L(M_1) = L(M_2)$，则 $\langle M_1\rangle \in L_P \iff \langle M_2\rangle \in L_P$。这类性质称为**语义**性质（关乎程序做什么），以别于代码本身的**语法**性质。

::: theorem 赖斯定理 {#thm-rice}
对图灵可识别语言的每个非平凡性质 $P$，$L_P$ 不可判定。
:::

::: proof
先设 $\emptyset \notin P$。因 $P$ 非平凡，存在可识别语言 $L(T) \in P$；取定这样的机器 $T$。我们证明 $A_{\mathsf{TM}} \le_m L_P$。给定 $\langle M, w\rangle$，输出 $\langle M_w\rangle$：

> $M_w$ = "在输入 $x$ 上：在 $w$ 上运行 $M$。若 $M$ 接受 $w$，在 $x$ 上运行 $T$，$T$ 接受则**接受**。"

$M$ 接受 $w$ 时，$M_w$ 恰接受 $T$ 接受的串：$L(M_w) = L(T) \in P$。$M$ 不接受 $w$ 时，$M_w$ 什么都不接受（第一阶段就拒绝或循环）：$L(M_w) = \emptyset \notin P$。映射 $\langle M, w\rangle \mapsto \langle M_w\rangle$ 可计算（$T$ 固定且内建）。于是 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M_w\rangle \in L_P$，由 [[#thm-reduction]]，$L_P$ 不可判定。

若 $\emptyset \in P$，把论证用于互补性质 $\overline{P}$（不在 $P$ 中的可识别语言），它非平凡且不含 $\emptyset$：$L_{\overline{P}}$ 不可判定。而在合法编码之中 $L_{\overline P}$ 恰是 $L_P$ 的补，故 $L_P$ 也不可判定。
:::

赖斯定理一挥之间便了断了一大家族问题。下面每一条都不可判定，因为它们都是 $L(M)$ 的非平凡性质：

- $L(M)$ 为空？有穷？无穷？等于 $\Sigma^*$？
- $L(M)$ 正则？上下文无关？可判定？
- $M$ 接受串 $\texttt{hello}$？接受某个回文串？恰好接受 $17$ 个串？

::: warning 赖斯定理说的是语言，不是机器
对于不由其语言决定的*机器*性质，定理什么也没有说。"$M$ 至多有 $5$ 个状态吗？""$M$ 在输入 $\varepsilon$ 上的前 $100$ 步内会写下符号 $x$ 吗？"都可判定——前者查看 $\langle M\rangle$，后者模拟 $100$ 步。另有一些机器性质不可判定、却不归赖斯定理管："$M$ 在输入 $\varepsilon$ 上会左移读头吗？"其实*可判定*（只右移的机器在输入之后只见空白，故其行为在 $\lvert Q\rvert$ 步后重复），而"$M$ 会进入状态 $q_7$ 吗？"的不可判定性靠停机问题的直接归约，不靠赖斯定理。定理也不禁止能回答*部分*实例的工具：静态分析器靠回答"是"、"否"或"不知道"、或靠近似来立足——宁可误报也不漏报真缺陷，或者宁可漏报也不误报。
:::

::: example 运用赖斯定理，以及它何时不适用 {#ex-rice}
判断下列语言哪些可判定：(a) $\{\langle M\rangle : L(M) \text{ 至少含两个串}\}$；(b) $\{\langle M\rangle : M \text{ 有偶数个状态}\}$；(c) $\{\langle M\rangle : L(M) = L(M)^R\}$；(d) $\{\langle M\rangle : L(M) \text{ 是可识别的}\}$。
::: solution
(a) 由赖斯定理不可判定："至少含两个串"只依赖 $L(M)$；$\Sigma^*$ 具有而 $\emptyset$ 不具有。
(b) 可判定：数一数编码里的状态即可。这是机器的性质、不是语言的性质——语言相同的两台机器状态数可以不同。
(c) 由赖斯定理不可判定："对翻转封闭"是语言的性质；$\Sigma^*$ 具有而 $\{01\}$ 不具有。
(d) 可判定——而且是平凡的：每个 $L(M)$ 都可识别，性质平凡，于是该语言是全体合法编码的集合，可判定。赖斯定理要求非平凡性。
:::
:::

## 波斯特对应问题

到目前为止，每个不可判定问题都关于机器。埃米尔·波斯特（Emil Post）发现了一个看起来像拼图的问题。

::: definition 波斯特对应问题 {#def-pcp}
一个 **PCP 实例**是一张有穷的**骨牌**清单 $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$，每张牌在字母表 $\Sigma$ 上有上行串 $t_i$ 与下行串 $b_i$。一个**匹配**是一列非空的（允许重复的）下标 $i_1, i_2, \dots, i_\ell$，使得

$$
t_{i_1} t_{i_2} \cdots t_{i_\ell} = b_{i_1} b_{i_2} \cdots b_{i_\ell}.
$$

$\mathit{PCP} = \{\langle P\rangle : P \text{ 是有匹配的 PCP 实例}\}$。
:::

::: example 寻找匹配 {#ex-pcp}
为实例 $\left[\frac{b}{ca}\right], \left[\frac{a}{ab}\right], \left[\frac{ca}{a}\right], \left[\frac{abc}{c}\right]$ 找出一个匹配，并说明 $\left[\frac{ab}{a}\right], \left[\frac{ba}{bab}\right]$ 为何没有。
::: solution
序列 $2, 1, 3, 2, 4$ 给出上行 $a \cdot b \cdot ca \cdot a \cdot abc = abcaaabc$、下行 $ab \cdot ca \cdot a \cdot ab \cdot c = abcaaabc$：一个匹配。它可以靠系统地尝试序列找到，其间只保留一行是另一行前缀的那些序列（否则再怎么延长都不可能匹配）。下面是这个搜索，广度优先：

```python
from collections import deque

def pcp(dominoes, max_len=12):
    """广度优先搜索找出的最短匹配；在 max_len 张牌内找不到则返回 None。

    状态记录“悬出部分”：较长一行中尚未匹配的部分，以及它属于哪一行（上或下）。"""
    start = ("", "top")
    queue, seen = deque([(start, [])]), {start}
    while queue:
        (over, side), seq = queue.popleft()
        if len(seq) == max_len:
            continue
        for i, (t, b) in enumerate(dominoes, 1):
            top, bot = (over + t, b) if side == "top" else (t, over + b)
            if top.startswith(bot):
                state = (top[len(bot):], "top")
            elif bot.startswith(top):
                state = (bot[len(top):], "bottom")
            else:
                continue                     # 两行冲突：死路
            if state[0] == "":
                return seq + [i]             # 两行相等：一个匹配
            if state not in seen:
                seen.add(state); queue.append((state, seq + [i]))
    return None

D = [("b", "ca"), ("a", "ab"), ("ca", "a"), ("abc", "c")]
m = pcp(D)
print(m)
print("".join(D[i - 1][0] for i in m))
print("".join(D[i - 1][1] for i in m))
print(pcp([("ab", "a"), ("ba", "bab")]))   # 此实例不存在匹配
```

```console
$ python3 pcp.py
[2, 1, 3, 2, 4]
abcaaabc
abcaaabc
None
```

第二个实例中搜索把候选耗尽——而不仅是耗尽了预算。匹配的第一张牌必须两行在各自长度内一致：$\left[\frac{ab}{a}\right]$ 留下上行悬出 $b$，$\left[\frac{ba}{bab}\right]$ 留下下行悬出 $b$。从上行悬出 $b$ 出发，接任一牌得到 $bab$ 对 $a$ 或 $bba$ 对 $bab$，冲突；从下行悬出 $b$ 出发，两行 $ab$ 对 $ba$ 或 $ba$ 对 $bbab$，也冲突。每条分支都死去，所以没有匹配。
:::
:::

上面的搜索若去掉长度上限，就是 $\mathit{PCP}$ 的一个识别器：匹配存在，广度优先搜索必能找到。可当匹配不存在时，搜索通常会永远进行下去，因为悬出部分可以一直增长。这是无法避免的：

::: theorem 波斯特定理 {#thm-pcp}
$\mathit{PCP}$ 不可判定。
:::

::: proof
证明的思路是把图灵机的一段接受计算编码成一个匹配。先对一个变体证明结论，再消去变体。

*修改版 PCP。*$\mathit{MPCP}$ 是那些**从第一张牌开始**存在匹配的实例的集合。我们证明 $A_{\mathsf{TM}} \le_m \mathit{MPCP}$。可设 $M$ 从不试图从最左格左移（改造 $M$，先标记第一格），并设在输入 $\varepsilon$ 上初始格局写作 $q_0\sqcup$。给定 $\langle M, w\rangle$，$w = w_1 \cdots w_n$，实例 $P'$ 由下面的骨牌组成，其中 $\#$ 是新的分隔符：

1. 第一张牌 $\left[\frac{\#}{\#\,q_0w_1\cdots w_n\#}\right]$；
2. 对每个 $q \ne q_{\text{rej}}$、$a \in \Gamma$，若 $\delta(q, a) = (r, b, R)$：$\left[\frac{qa}{br}\right]$；
3. 对每个 $q \ne q_{\text{rej}}$、$a, c \in \Gamma$，若 $\delta(q, a) = (r, b, L)$：$\left[\frac{cqa}{rcb}\right]$；
4. 对每个 $a \in \Gamma$：$\left[\frac{a}{a}\right]$；
5. $\left[\frac{\#}{\#}\right]$ 与 $\left[\frac{\#}{\sqcup\#}\right]$；
6. 对每个 $a \in \Gamma$：$\left[\frac{a\,q_{\text{acc}}}{q_{\text{acc}}}\right]$ 与 $\left[\frac{q_{\text{acc}}\,a}{q_{\text{acc}}}\right]$；
7. $\left[\frac{q_{\text{acc}}\#\#}{\#}\right]$。

把匹配从左到右搭建来想象。下行总比上行多写出一个格局。要延长上行、让它照抄下行写出的格局，必须动用第 2–5 类骨牌，它们的下行于是写出*下一个*格局：第 4 类照抄带符号；与读头及其邻格相匹配的那一张第 2 或第 3 类骨牌施行 $M$ 的转移；第 5 类牌终结该格局（第二种形态在读头进入新区域时补一个空白）。于是任何以第一张牌开头的部分匹配都形如

$$
\text{上行: } \#C_1\#C_2\#\cdots\#C_{j}\#, \qquad \text{下行: } \#C_1\#C_2\#\cdots\#C_j\#C_{j+1}\#,
$$

其中 $C_1, C_2, \dots$ 是 $M$ 在 $w$ 上的计算——下行永远领先一个格局，而只要状态不是 $q_{\text{acc}}$，上行就永远追不上，因为只有第 6、7 类骨牌的上行比下行长。$M$ 接受 $w$ 时，某个 $C_j$ 含有 $q_{\text{acc}}$；此时第 6 类骨牌让 $q_{\text{acc}}$ 在每个格局里"吃掉"一个邻符号，上行便可追平，第 7 类牌在两行相等处收尾：一个匹配。反之，匹配必须使用第 7 类牌（否则下行永远更长），因而 $q_{\text{acc}}$ 必须出现，因而被编码的格局序列是 $M$ 在 $w$ 上的一段接受计算。（拒绝或循环的计算产生不了匹配：$q_{\text{rej}}$ 没有对应的骨牌，而无穷计算让上行永远追不上。）故 $\langle M, w\rangle \in A_{\mathsf{TM}} \iff P' \in \mathit{MPCP}$。

*从 MPCP 到 PCP。*对串 $u = u_1 \cdots u_m$，记 $\star u = {*}u_1{*}u_2 \cdots {*}u_m$，$u\star = u_1{*}u_2{*} \cdots u_m{*}$，$\star u \star = {*}u_1{*} \cdots {*}u_m{*}$，其中 $*$ 是新符号。由 MPCP 实例 $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$ 造 PCP 实例

$$
\left[\frac{\star t_1}{\star b_1 \star}\right],\ \left[\frac{\star t_1}{b_1 \star}\right],\ \left[\frac{\star t_2}{b_2 \star}\right],\ \dots,\ \left[\frac{\star t_k}{b_k \star}\right],\ \left[\frac{{*}\diamond}{\diamond}\right]
$$

其中 $\diamond$ 又是一个新符号。在任何匹配中，第一张牌必须上下行以相同符号开头；只有 $\left[\frac{\star t_1}{\star b_1 \star}\right]$ 合格（其余各牌的下行以 $\Sigma$ 的符号或 $\diamond$ 开头，上行都以 $*$ 开头）。下行开头多出的那个 $*$，随后由穿插的星号逐符号补偿；最后一张牌必须是 $\left[\frac{*\diamond}{\diamond}\right]$，以消化下行的最后一个 $*$。去掉星号，就得到一个从第 $1$ 张牌开始的 MPCP 匹配；反之，任何从第 $1$ 张牌开始的 MPCP 匹配也如此变成一个 PCP 匹配。故 $\mathit{MPCP} \le_m \mathit{PCP}$，由传递性 $A_{\mathsf{TM}} \le_m \mathit{PCP}$。
:::

这个证明表明骨牌能够模拟计算：匹配就是接受计算的历史。同样的思想——**计算历史**——编码进文法或其它组合对象，还能得到许多进一步的不可判定性结果。

## 关于文法的不可判定问题

在 [[theory-of-computation/context-free-grammars]] 中我们说过，二义性无法被算法检出。PCP 证明了这一点。

::: theorem CFG 的二义性不可判定 {#thm-ambig}
$\mathit{AMBIG}_{\mathsf{CFG}} = \{\langle G\rangle : G \text{ 是二义的 CFG}\}$ 不可判定。对 CFG $G, H$，$\{\langle G, H\rangle : L(G) \cap L(H) \ne \emptyset\}$ 也不可判定。
:::

::: proof
我们归约 $\mathit{PCP}$。给定 $\Sigma$ 上的实例 $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$，引入新的**下标符号** $a_1, \dots, a_k$ 以及文法

$$
G_T\colon\ T \to t_i\,T\,a_i \mid t_i\,a_i \quad (1 \le i \le k), \qquad G_B\colon\ B \to b_i\,B\,a_i \mid b_i\,a_i \quad (1 \le i \le k).
$$

$G_T$ 恰好生成非空下标序列对应的串 $t_{i_1} \cdots t_{i_\ell}\, a_{i_\ell} \cdots a_{i_1}$，而下标后缀逆序读出的正是该序列、从而唯一决定推导；故 $G_T$ 无二义，$G_B$ 亦然。一个串同时属于两个语言，当且仅当它对某个下标序列有 $t_{i_1}\cdots t_{i_\ell}a_{i_\ell}\cdots a_{i_1} = b_{i_1}\cdots b_{i_\ell}a_{i_\ell}\cdots a_{i_1}$（后缀必须相同），即当且仅当 $i_1, \dots, i_\ell$ 是一个匹配。故 $P \in \mathit{PCP} \iff L(G_T) \cap L(G_B) \ne \emptyset$，第二个断言得证。

至于二义性，令 $G$ 的开始变量为 $S$，规则为 $S \to T \mid B$ 再并上 $G_T$ 与 $G_B$ 的规则。一个串在 $G$ 中有两棵语法分析树，当且仅当它既可经 $T$ 又可经 $B$ 推出（$G_T$、$G_B$ 各自都无二义），当且仅当它属于 $L(G_T) \cap L(G_B)$，当且仅当实例有匹配。映射 $P \mapsto \langle G\rangle$ 可计算，故 $\mathit{PCP} \le_m \mathit{AMBIG}_{\mathsf{CFG}}$。
:::

更直接地利用计算历史可证明 $\mathit{ALL}_{\mathsf{CFG}} = \{\langle G\rangle : L(G) = \Sigma^*\}$ 不可判定。*证明概要。*把 $M$ 在 $w$ 上的一段接受计算写成 $\#C_1\#C_2^R\#C_3\#C_4^R\#\cdots$，每隔一个格局翻转一次。*不是*接受历史的串——开头错、结尾错、或某对 $C_i, C_{i+1}$ 不满足一步转移——构成上下文无关语言，因为 PDA 可以猜出出错的位置，把 $C_i$ 与翻转后的 $C_{i+1}$ 拿到栈上比较。这条语言的文法可由 $\langle M, w\rangle$ 算出，它生成一切串当且仅当 $M$ 在 $w$ 上没有接受计算。于是 $EQ_{\mathsf{CFG}}$ 也不可判定：$\mathit{ALL}_{\mathsf{CFG}}$ 是与固定的 $\Sigma^*$ 文法求等价的特例。

::: widget graph
nodes: ATM@0,2; HALT@2,3.4; ETM@2,2.6; REG@2,1.8; EQTM@2,1; MPCP@4,1; PCP@6,1; INT@8,1.8; AMBIG@8,0.2
edges: ATM>HALT; ATM>ETM; ATM>REG; ATM>EQTM; ATM>MPCP; MPCP>PCP; PCP>INT; PCP>AMBIG
algorithm: topo
start: ATM
caption: 本章的诸归约。箭头 $A \to B$ 表示 $A \le_m B$（对 $E_{\mathsf{TM}}$，归约的目标是它的补），于是不可判定性沿箭头从 $A_{\mathsf{TM}}$ 流出——后者已用对角化直接证明不可判定。INT 是 CFG 对的交问题，AMBIG 是二义性问题。逐步演示拓扑排序：它按"每个问题的不可判定性都由排在它前面的问题推出"的顺序列出诸问题。
:::

::: quiz
下列哪些是可判定的？
- [ ] 给定 CFG $G$，问 $G$ 是否二义。
- [x] 给定处于乔姆斯基范式的 CFG $G$ 和串 $w$，问 $w$ 是否有两棵语法分析树。
- [ ] 给定两台 CFG，问它们是否生成同一语言。
- [x] 给定一个每张牌都满足 $\lvert t_i\rvert = \lvert b_i\rvert$ 的 PCP 实例，问是否存在匹配。
::: solution
CFG 的二义性与等价性不可判定（[[#thm-ambig]] 与上面的证明概要）。对 CNF 文法和固定串 $w$，CYK 的计数版本（[[theory-of-computation/context-free-grammars]] 的一道习题）能算出语法分析树的棵数：可判定。若每张牌的上下行等长，则匹配存在当且仅当某张单牌满足 $t_i = b_i$：匹配中两行逐牌比较，所以第一张牌就必须有 $t_{i_1} = b_{i_1}$。
:::
:::

::: history
埃米尔·波斯特（Emil Post）在 "Recursively enumerable sets of positive integers and their decision problems"（1944）中定义了可归约性的概念，并提出是否存在严格比停机问题容易的不可判定可识别问题（"波斯特问题"）；理查德·弗里德伯格（Richard Friedberg，1957）与阿尔伯特·穆奇尼克（Albert Muchnik，1956）各自独立地作出了回答。艾伦·图灵（Alan Turing）在 1939 年关于序数逻辑的博士论文中引入预言机机器，它们是图灵可归约性的基础。波斯特对应问题发表于 "A variant of a recursively unsolvable problem"（*Bulletin of the AMS*，1946）。亨利·戈登·赖斯（Henry Gordon Rice）在 "Classes of recursively enumerable sets and their decision problems"（*Transactions of the AMS*，1953）中证明了他的定理，源自其 1951 年在雪城大学的博士论文。二义性的不可判定性由于 1962 年由大卫·康托尔（David Cantor）与罗伯特·弗洛伊德（Robert Floyd）分别证明；上下文无关文法的交空性与等价性的不可判定性由巴尔-希勒尔（Bar-Hillel）、珀尔斯（Perles）与沙米尔（Shamir）（1961）证明。迈克尔·西普瑟（Michael Sipser）的教科书（初版 1997，第三版 2012）使本章采用的计算历史证明广为流传。
:::

## 后续内容

映射归约在 [[complexity]] 中带着资源限制重新登场：从 $A$ 到 $B$ 的**多项式时间**归约说明 $B$ 至少和 $A$ 一样难（差多项式因子），库克（Cook）与卡普（Karp）的定理正是用这种归约证明 $\mathit{SAT}$ 和成千上万个其它问题是 $\mathsf{NP}$ 完全的。这里证明的极限也塑造着实践：静态分析与验证（[[compilers]]、[[programming-languages]]、[[software-engineering]]）依靠可判定的近似、受限的语言或人提供的证明来工作，因为对任意程序的语义问题求精确答案是不可能的。

::: summary
- 若可计算函数 $f$ 把 $A$ 的"是"实例映成 $B$ 的"是"实例、"否"实例映成"否"实例，则 $A \le_m B$（[[#def-mapping-reduction]]）。可判定性与可识别性从 $B$ 传给 $A$；不可判定性从 $A$ 传给 $B$（[[#thm-reduction]]）。
- 要证 $B$ 不可判定，把一个已知的不可判定问题归约**到** $B$。
- $E_{\mathsf{TM}}$ 不可判定且不可识别（[[#thm-etm]]）；$\mathit{REGULAR}_{\mathsf{TM}}$ 不可判定（[[#thm-regular-tm]]）；$EQ_{\mathsf{TM}}$ 既不可识别也不余可识别（[[#thm-eqtm]]）。
- **赖斯定理**（[[#thm-rice]]）：TM 的*语言*的每个非平凡性质都不可判定。机器代码的性质则可能可判定。
- **波斯特对应问题**不可判定（[[#thm-pcp]]）：骨牌能编码接受计算的历史。
- 经由 PCP 与计算历史，上下文无关文法的二义性、交空性、通用性、等价性都不可判定（[[#thm-ambig]]）。
:::

## 习题

::: exercise 归约的方向 {level=1}
对一切语言 $A, B$，判断下列命题的真假：(a) 若 $A \le_m B$ 且 $A$ 可判定，则 $B$ 可判定；(b) 若 $A \le_m B$ 且 $B$ 正则，则 $A$ 可判定；(c) $A \le_m \overline{A}$。
::: solution
(a) 假：每个可判定的 $A$（$\emptyset$ 与 $\Sigma^*$ 除外）都归约到 $A_{\mathsf{TM}}$——先判定 $w \in A$，再把 $w$ 映到一个固定的"是"实例或固定的"否"实例——而 $A_{\mathsf{TM}}$ 不可判定。(b) 真：正则语言可判定，故由 [[#thm-reduction]]，$A$ 可判定。（$A$ 未必正则：归约可以做任何计算。）(c) 一般不真：若 $A_{\mathsf{TM}} \le_m \overline{A_{\mathsf{TM}}}$，则由 (3) 也有 $\overline{A_{\mathsf{TM}}} \le_m A_{\mathsf{TM}}$，而 $A_{\mathsf{TM}}$ 可识别，由 (2) $\overline{A_{\mathsf{TM}}}$ 也将可识别——但它不可识别。
:::
:::

::: exercise 最短匹配 {level=1 check="4"}
为 PCP 实例 $\left[\frac{a}{baa}\right], \left[\frac{ab}{aa}\right], \left[\frac{bba}{bb}\right]$ 找出一个匹配。最短的匹配用几张牌？（输入数字。）
::: solution
匹配的第一张牌必须上下行在各自长度内一致；只有 $\left[\frac{bba}{bb}\right]$（第 3 张）合格，留下上行悬出 $a$。接第 2 张得上行 $bbaab$、下行 $bbaa$，悬出 $b$；再接第 3 张得上行 $bbaabbba$、下行 $bbaabb$，悬出 $ba$；再接第 1 张，得上下行都是 $bbaabbbaa$。故 $3, 2, 3, 1$ 是一个匹配，用了 $4$ 张牌。[[#ex-pcp]] 的广度优先搜索找出同一个序列，并确认没有更短的匹配，因为它按长度依次探索序列。
:::
:::

::: exercise 靠不靠赖斯定理？ {level=1}
下列哪些靠赖斯定理不可判定，哪些可判定，哪些因其它原因不可判定？(a) $\{\langle M\rangle : \varepsilon \in L(M)\}$；(b) $\{\langle M\rangle : M \text{ 在输入 } \varepsilon \text{ 上运行时会进入指定状态 } q_\star\}$（机器的编码中标记了一个状态为 $q_\star$）；(c) $\{\langle M\rangle : L(M) \text{ 是上下文无关的}\}$；(d) $\{\langle M\rangle : M \text{ 在 } \varepsilon \text{ 上于 } \lvert\langle M\rangle\rvert \text{ 步内停机}\}$。
::: solution
(a) 赖斯定理：只依赖 $L(M)$；非平凡。不可判定。
(b) 不是 $L(M)$ 的性质——语言相同的两台机器在是否经过 $q_\star$ 上可能不同——赖斯定理不适用。它的不可判定性由 $\mathit{HALT}_{\mathsf{TM}}$ 的归约证明：给定 $\langle M, w\rangle$，造 $M'$：擦除输入，写下 $w$，在 $w$ 上运行 $M$，当且仅当 $M$ 停机时进入一个标记为 $q_\star$ 的新状态（$M$ 每个进入 $q_{\text{acc}}$ 或 $q_{\text{rej}}$ 的转移都改道到 $q_\star$）。于是 $M'$ 在 $\varepsilon$ 上进入 $q_\star$ 当且仅当 $M$ 在 $w$ 上停机。
(c) 赖斯定理：不可判定。
(d) 可判定：算出 $\lvert\langle M\rangle\rvert$，模拟那么步。
:::
:::

::: exercise 全性 {level=2}
用从 $\mathit{HALT}_{\mathsf{TM}}$ 出发的映射归约证明 $\mathit{TOTAL}_{\mathsf{TM}} = \{\langle M\rangle : M \text{ 在每个输入上都停机}\}$ 不可判定。赖斯定理覆盖它吗？
::: solution
给定 $\langle M, w\rangle$，输出 $\langle M'\rangle$，其中 $M'$ = "对任何输入 $x$，擦除它，在 $w$ 上运行 $M$，$M$ 停机则接受"。$M$ 在 $w$ 上停机时 $M'$ 在每个输入上都停机；否则 $M'$ 在任何输入上都不停机。故 $\langle M, w\rangle \in \mathit{HALT}_{\mathsf{TM}} \iff \langle M'\rangle \in \mathit{TOTAL}_{\mathsf{TM}}$。赖斯定理不能直接适用，因为"在每个输入上都停机"不是 $L(M)$ 的性质：一台拒绝一切的机器和一台循环一切的机器语言都是 $\emptyset$，但只有前者是全的。（事实上它既不可识别也不余可识别。）
:::
:::

::: exercise LBA 的计算历史 {level=2}
对线性有界自动机（从不离开输入各格的 TM），接受性是可判定的（[[theory-of-computation/decidability]] 最后一题）。用计算历史解释为什么空性 $E_{\mathsf{LBA}} = \{\langle M\rangle : M \text{ 是 LBA 且 } L(M) = \emptyset\}$ 仍然不可判定。
::: solution
把 $A_{\mathsf{TM}}$ 归约到 $\overline{E_{\mathsf{LBA}}}$。给定 $\langle M, w\rangle$，造一台 LBA $B$：它接受输入 $x$ 当且仅当 $x$ 是 $M$ 在 $w$ 上的一段**接受计算历史**：$x = \#C_1\#C_2\#\cdots\#C_\ell\#$，其中 $C_1$ 是 $M$ 在 $w$ 上的初始格局，每个 $C_{i+1}$ 由 $C_i$ 经一步转移得到，且 $C_\ell$ 是接受格局。$B$ 在 $x$ 的格子之内完成检验：把 $C_1$ 与 $w$ 对照（$w$ 内建在状态里），检查 $C_\ell$ 含 $q_{\text{acc}}$，并对每个 $i$ 在 $C_i$ 与 $C_{i+1}$ 之间来回移动、给对应的格做标记，检验除读头附近外两处一致，而在读头附近服从 $M$ 的转移。不需要额外空间。于是 $L(B) \ne \emptyset$ 当且仅当 $M$ 在 $w$ 上有接受计算，当且仅当 $M$ 接受 $w$。故 $E_{\mathsf{LBA}}$ 不可判定，尽管 LBA 的接受性可判定：历史就是输入，LBA 从不需要去搜寻它。
:::
:::

::: exercise CFG 的交 {level=2}
把 [[#thm-ambig]] 的文法 $G_T, G_B$ 用到 [[#ex-pcp]] 的实例上，写出一个属于 $L(G_T) \cap L(G_B)$ 的串。
::: solution
匹配 $2, 1, 3, 2, 4$ 给出上行串 $abcaaabc$、下行串 $abcaaabc$；再把下标符号按使用的逆序附加：$a_4a_2a_3a_1a_2$。于是 $abcaaabc\,a_4a_2a_3a_1a_2$ 同属两个语言。在 $G_T$ 中：$T \Rightarrow t_2Ta_2 \Rightarrow t_2t_1Ta_1a_2 \Rightarrow t_2t_1t_3Ta_3a_1a_2 \Rightarrow t_2t_1t_3t_2Ta_2a_3a_1a_2 \Rightarrow t_2t_1t_3t_2t_4a_4a_2a_3a_1a_2$，$G_B$ 中把 $t$ 换成 $b$ 同理。对应的文法 $S \to T \mid B$ 让这个串拥有两棵语法分析树。
:::
:::

::: exercise 单字母表 PCP {level=3}
证明单字母表 $\{a\}$ 上的 PCP 是可判定的。
::: solution
只有一个字母时，骨牌 $\left[\frac{a^{p_i}}{a^{q_i}}\right]$ 只通过其差 $d_i = p_i - q_i$ 起作用，而一个序列是匹配当且仅当序列中诸 $d_i$ 之和为 $0$（顺序无关紧要）。若某个 $d_i = 0$，单这张牌就是匹配。若所有 $d_i > 0$ 或所有 $d_i < 0$，无匹配。否则存在 $d_i > 0$ 与 $d_j < 0$：把第 $i$ 张用 $\lvert d_j\rvert$ 次、第 $j$ 张用 $d_i$ 次，和为 $d_i\lvert d_j\rvert + d_j d_i = 0$，是一个匹配。于是匹配存在当且仅当某个 $d_i = 0$ 或诸 $d_i$ 不全同号——一个简单检验。
:::
:::

::: exercise 不可判定问题之间的归约 {level=3}
证明 $\overline{A_{\mathsf{TM}}}$ 不映射归约到 $A_{\mathsf{TM}}$；但若把 $A_{\mathsf{TM}}$ 的判定器当作子程序（一个**预言机**）使用，就能判定 $\overline{A_{\mathsf{TM}}}$。这说明映射归约与图灵归约有何区别？
::: solution
若 $\overline{A_{\mathsf{TM}}} \le_m A_{\mathsf{TM}}$，则由 $A_{\mathsf{TM}}$ 可识别和 [[#thm-reduction]] (2)，$\overline{A_{\mathsf{TM}}}$ 也将可识别——与 [[theory-of-computation/decidability#cor-atm-complement]] 矛盾。但有了 $A_{\mathsf{TM}}$ 的预言机，机器"在输入 $x$ 上问预言机 $x \in A_{\mathsf{TM}}$ 是否成立，并给出相反的答案"就判定 $\overline{A_{\mathsf{TM}}}$。**图灵归约**（$A \le_T B$：$A$ 可由带 $B$ 的预言机的机器判定）可以问许多个问题并对答案作后处理，比如取反；映射归约只问恰好一个问题，且必须原样交回答案。图灵归约传递可判定性、却不传递可识别性；映射归约两者都传递，这就是它能把一个问题和它的补区分开的原因，也是它是可识别性结果的正确工具的原因。
:::
:::
