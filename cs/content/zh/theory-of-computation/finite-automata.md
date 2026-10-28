车站的闸机要么**上锁**，要么**未上锁**。向上了锁的闸机投一枚币，它就解锁；推一下已解锁的闸机，它放你通过并重新上锁；推上了锁的闸机，什么也不会发生。这就是整台机器：两个状态、两种可能的输入，以及一条说明哪个状态跟着哪个状态的规则。它不记得已经过去多少人、也不记得吞了多少枚币——只记得自己处于两个状态中的哪一个。

具有固定、有穷内存量的机器在计算中无处不在。编译器的词法分析器逐字符读入程序，并判定每个标识符、数与关键字在何处结束。网络协议实现随报文到达在 `LISTEN`、`SYN-RECEIVED`、`ESTABLISHED` 等状态之间移动。文本编辑器的搜索框、自动售货机的控制器、解码串行线路的逻辑、Web 表单的输入校验：它们各自读入一个符号流，并以有穷内存对其作出某种判定。本章建立所有这些机器的数学模型——**有限自动机**，并开始本课程的核心计划：**确切地**说出某种计算模型能与不能做什么。

我们从串与语言开始，它们是整门课程的词汇。然后精确定义确定有限自动机，证明特定的自动机确实做到我们所声称的事，通过问"机器必须记住什么"来学会设计它们，最后以第一批结构性定理收尾：有限自动机识别的语言对补、并、交封闭，而且关于它们的基本问题可以由算法回答。

## 串与语言

本课程的一切都关于**串**：机器的输入是串，程序是串，甚至"这个程序会停机吗"这类问题也将被表述为关于串集的问题。全文使用 [Maths Atlas：集合](/learn/maths/lesson.php?c=proofs&l=sets) 中的集合记号。

::: definition 字母表、串与语言 {#def-strings}
**字母表**是一个有限非空集 $\Sigma$，其元素称为**符号**。$\Sigma$ 上的一个**串**（或**词**）是一个由符号 $a_i \in \Sigma$ 组成的有限序列 $w = a_1 a_2 \cdots a_n$；其**长度**为 $\lvert w\rvert = n$。长度为 $0$ 的唯一串是**空串** $\varepsilon$。$\Sigma$ 上所有串的集合记作 $\Sigma^*$，而 $\Sigma^n$ 是长度恰为 $n$ 的串的集合。$\Sigma$ 上的一个**语言**是任意子集 $L \subseteq \Sigma^*$。
:::

于是 $\{0, 1\}$ 是一个字母表，$0110$ 是其上一个长度为 $4$ 的串，而 $\{0,1\}^* = \{\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots\}$ 是无限的，尽管它的每个元素都有穷。语言可以是有限的（$\{\varepsilon, 01\}$）、为空的（$\emptyset$，它**不**同于 $\{\varepsilon\}$），或无限的（"所有含偶数个 $1$ 的二进制串"、"所有语法上合法的 Python 程序"）。

串上的基本运算是**连接**：若 $x = a_1\cdots a_m$ 且 $y = b_1 \cdots b_n$，则 $xy = a_1 \cdots a_m b_1 \cdots b_n$，长度为 $m + n$。连接满足结合律，$(xy)z = x(yz)$，且 $\varepsilon$ 是其单位元，$\varepsilon w = w\varepsilon = w$；它不满足交换律（$01 \ne 10$）。我们用 $w^k$ 表示 $w$ 与自身连接 $k$ 次（$w^0 = \varepsilon$），用 $w^R$ 表示 $w$ 的**逆串**。若 $w = xyz$，则称 $x$ 是 $w$ 的**前缀**、$z$ 是**后缀**、$y$ 是**子串**。

因为语言是集合，它们可以用 $\cup$、$\cap$ 和补集 $\overline{L} = \Sigma^* \setminus L$ 组合。另有三个运算由连接建造：

::: definition 语言上的运算 {#def-lang-ops}
对语言 $A, B \subseteq \Sigma^*$：

- **连接** $AB = \{xy : x \in A,\ y \in B\}$；
- **幂** $A^0 = \{\varepsilon\}$ 且 $A^{k+1} = A^k A$；
- **克林星（Kleene star）** $A^* = \bigcup_{k \ge 0} A^k$，即由 $A$ 中零个或多个串连接而成的所有串的集合。
:::

例如，若 $A = \{0, 11\}$，则 $A^2 = \{00, 011, 110, 1111\}$，而 $A^*$ 由一切可以切分成块 $0$ 与 $11$ 的串组成——恰是那些每个极大的 $1$ 游程长度均为偶数的二进制串。注意对每个 $A$ 都有 $\varepsilon \in A^*$，即便 $A = \emptyset$：$\emptyset^* = \{\varepsilon\}$。记号 $\Sigma^*$ 是 $A = \Sigma$ 的特例。

还有一个约定：我们按**短字典序**（shortlex，即**按长度字典序**）排列串——先短后长，同长度的按字典序排列——于是 $\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots$。与纯字典序不同，每个串只有有限个前驱，因此这个序把 $\Sigma^*$ 列为一个序列。在 [[theory-of-computation/decidability]] 中枚举语言时会需要它。

::: quiz
设 $A = \{\varepsilon, 1\}$，$B = \{0\}$。下列哪些串属于 $AB^*A$？
- [x] $\varepsilon$
- [x] $1001$
- [ ] $0110$
- [x] $000$
::: solution
$AB^*A$ 由一个可选的 $1$、接着任意多个 $0$、再接一个可选的 $1$ 组成：即串 $0^k$、$10^k$、$0^k1$ 与 $10^k1$（$k \ge 0$）。于是 $\varepsilon$（$k = 0$，两个可选部分均空）、$1001$ 与 $000$ 属于它，但 $0110$ 不属于：它以 $0$ 开头，所以第一个因子是 $\varepsilon$，而随后的 $0$ 之后至多只能再有一个 $1$。
:::
:::

## 确定有限自动机

有限自动机从左到右把输入读一遍，一次一个符号。每一时刻它处于有限多个**状态**之一；读入一个符号使它进入一个新状态，新状态完全由旧状态和该符号决定。输入读完时，若当前状态是指定的**接受**状态之一则**接受**，否则**拒绝**。没有别的记忆，无法回头，除了接受或拒绝之外也没有输出。

::: definition 确定有限自动机 {#def-dfa}
一个**确定有限自动机**（DFA）是一个 5 元组 $M = (Q, \Sigma, \delta, q_0, F)$，其中

1. $Q$ 是一个有限的**状态**集；
2. $\Sigma$ 是一个字母表；
3. $\delta\colon Q \times \Sigma \to Q$ 是**转移函数**；
4. $q_0 \in Q$ 是**开始状态**；
5. $F \subseteq Q$ 是**接受**（或**终止**）状态集。
:::

注意 $\delta$ 是一个**全**函数：对每个状态和每个符号恰有一个后继状态。这正是此处"确定的"一词的含义，而且对下文某些构造它至关重要。

我们把 DFA 画成一张**状态图**：一个有向图，每个状态一个顶点，从 $q$ 到 $\delta(q, a)$ 有一条带标记 $a$ 的箭头，一条无标记的箭头指向开始状态，每个接受状态画双圈。等价地，可以把 $\delta$ 写成一张表，每个状态一行、每个符号一列——这正是程序所用的表示。

要说明 DFA 对整个串做什么，我们把 $\delta$ 从符号扩充到串。

::: definition 扩展转移函数与 DFA 的语言 {#def-dfa-language}
对 DFA $M = (Q, \Sigma, \delta, q_0, F)$，**扩展转移函数** $\hat\delta\colon Q \times \Sigma^* \to Q$ 对串的长度递归定义：

$$
\hat\delta(q, \varepsilon) = q, \qquad \hat\delta(q, wa) = \delta\bigl(\hat\delta(q, w),\, a\bigr) \quad (w \in \Sigma^*,\ a \in \Sigma).
$$ {#eq-delta-hat}

$M$ **接受** $w$，若 $\hat\delta(q_0, w) \in F$；否则**拒绝**它。**$M$ 的语言**（$M$ **识别的**语言）是 $L(M) = \{ w \in \Sigma^* : \hat\delta(q_0, w) \in F\}$。若某个 DFA 识别一个语言，则称该语言是**正则的**。
:::

等价地，$M$ 接受 $w = a_1 \cdots a_n$，当存在状态序列 $r_0, r_1, \dots, r_n$ 使得 $r_0 = q_0$，对 $1 \le i \le n$ 有 $r_{i} = \delta(r_{i-1}, a_i)$，且 $r_n \in F$；这个序列就是 $M$ 在 $w$ 上的**运行**，且它唯一。一个 DFA 恰好识别一个语言——它所接受的**全部**串的集合。"$M$ 识别 $L$"意味着 $M$ 接受 $L$ 中的每个串**并且**拒绝其外的每个串；只接受 $L$ 的串还不够。

递归式 [[#eq-delta-hat]] 从串的右端逐个剥去符号。常常把串在任意处拆开更方便：

::: lemma 运行可复合 {#lem-compose}
对每个状态 $q$ 与所有串 $x, y \in \Sigma^*$，$\hat\delta(q, xy) = \hat\delta\bigl(\hat\delta(q, x), y\bigr)$。
:::

::: proof
对 $\lvert y\rvert$ 归纳（见 [Maths Atlas：归纳法](/learn/maths/lesson.php?c=proofs&l=induction)）。若 $y = \varepsilon$，两边都等于 $\hat\delta(q, x)$。否则 $y = za$，其中 $a \in \Sigma$；先由定义，再对 $z$ 用归纳假设，最后再由定义，得

$$
\hat\delta(q, xza) = \delta\bigl(\hat\delta(q, xz), a\bigr) = \delta\bigl(\hat\delta(\hat\delta(q, x), z), a\bigr) = \hat\delta\bigl(\hat\delta(q, x), za\bigr).
$$
:::

[[#lem-compose]] 正是"机器没有别的记忆"的形式化含义：一旦知道了读 $x$ 之后到达的状态，其余计算只依赖于那个状态，而不依赖于 $x$ 本身。

### 第一个例子：被 3 整除

设 $L_3$ 是把一个二进制串当作二进制记数法所表示的值能被 $3$ 整除的串的集合（允许前导零，且 $\varepsilon$ 视作 $0$）。于是 $\varepsilon, 0, 11, 110, 1001 \in L_3$，而 $1, 10, 1011 \notin L_3$。

一台内存有限的机器如何能对任意大的数判定这一点？从左往右读一个二进制记数法：若已读前缀的值为 $v$，下一个比特为 $b$，则新前缀的值为 $2v + b$。而 $2v + b$ 除以 $3$ 的余数只依赖于 $v \bmod 3$ 和 $b$。所以机器只需记住前缀的余数：三个状态。

::: example 判定被 3 整除的 DFA {#ex-mod3}
给出 $L_3$ 的一个 DFA，画出它的转移表，并在 $1001$ 与 $1011$ 上跟踪它。
::: solution
令 $Q = \{r_0, r_1, r_2\}$，$\Sigma = \{0,1\}$，开始状态 $r_0$，$F = \{r_0\}$，且 $\delta(r_i, b) = r_{(2i + b) \bmod 3}$：

| 状态 | 读 $0$ | 读 $1$ |
|---|---|---|
| $\to r_0$（接受） | $r_0$ | $r_1$ |
| $r_1$ | $r_2$ | $r_0$ |
| $r_2$ | $r_1$ | $r_2$ |

在 $1001$（值 $9$）上的运行是 $r_0 \xrightarrow{1} r_1 \xrightarrow{0} r_2 \xrightarrow{0} r_1 \xrightarrow{1} r_0$：接受。在 $1011$（值 $11$）上是 $r_0 \xrightarrow{1} r_1 \xrightarrow{0} r_2 \xrightarrow{1} r_2 \xrightarrow{1} r_2$：拒绝，而事实上 $11 = 3\cdot 3 + 2$——最终状态就是余数。
:::
:::

::: widget graph
nodes: r0@0,0; r1@2,0; r2@4,0
edges: r0>r0:0; r0>r1:1; r1>r0:1; r1>r2:0; r2>r1:0; r2>r2:1
algorithm: bfs
start: r0
caption: 被 $3$ 整除的 DFA，即 [[#ex-mod3]] 中的那台。箭头标记是输入符号 $0$ 与 $1$；$r_0$ 既是开始状态又是唯一的接受状态。对几个你自己想的二进制数沿箭头走几步（试试 $110$ 与 $1111$），验证你总是停在状态 $r_v$，其中 $v$ 是余数。从 $r_0$ 出发逐步演示广度优先搜索会表明每个状态都可达——同一种搜索可以判定一个 DFA 是否接受任何串（[[#thm-emptiness]]）。
:::

表和跟踪说服了我们，但 DFA 是一个数学对象，我们可以**证明**它识别 $L_3$。其诀窍——在整个课程中反复出现——是对每个状态（而不仅仅是接受性）证明一个更强的命题。

::: theorem 模 3 自动机的正确性 {#thm-mod3}
对 [[#ex-mod3]] 的 DFA 与每个 $w \in \{0,1\}^*$，$\hat\delta(r_0, w) = r_{v(w) \bmod 3}$，其中 $v(w)$ 是 $w$ 作为二进制记数法的值。从而该 DFA 识别 $L_3$。
:::

::: proof
对 $\lvert w \rvert$ 归纳。$w = \varepsilon$ 时，$\hat\delta(r_0, \varepsilon) = r_0$ 且 $v(\varepsilon) = 0$。$w = ub$ 时，$b \in \{0,1\}$，其值为 $v(ub) = 2v(u) + b$。由归纳假设 $\hat\delta(r_0, u) = r_i$，其中 $i = v(u) \bmod 3$，于是

$$
\hat\delta(r_0, ub) = \delta(r_i, b) = r_{(2i + b) \bmod 3} = r_{(2v(u) + b) \bmod 3} = r_{v(ub) \bmod 3},
$$

其中用到 $2i + b \equiv 2v(u) + b \pmod 3$。最后，$w$ 被接受当且仅当 $\hat\delta(r_0, w) = r_0$，当且仅当 $v(w) \equiv 0 \pmod 3$。
:::

### 模拟 DFA

DFA 也是一个程序，而且非常快：每个输入符号一次查表，长 $n$ 的输入耗时 $\Theta(n)$，除表之外内存是常数级的。下面是一个直接实现，把 $\delta$ 存成以（状态，符号）对为键的字典（[[programming-1/dictionaries-sets]]）：

```python
class DFA:
    def __init__(self, states, alphabet, delta, start, accept):
        self.states, self.alphabet = set(states), set(alphabet)
        self.delta, self.start, self.accept = delta, start, set(accept)
        for q in self.states:                    # 坚持要求一个完全的 DFA
            for a in self.alphabet:
                assert (q, a) in delta, f"missing transition from {q} on {a}"

    def run(self, w):
        q = self.start
        trace = [q]
        for a in w:
            q = self.delta[(q, a)]               # 每个符号一次查表
            trace.append(q)
        return q in self.accept, trace

# 值能被 3 整除的二进制数：状态 r = 值 mod 3
mod3 = DFA({0, 1, 2}, "01",
           {(r, a): (2 * r + int(a)) % 3 for r in range(3) for a in "01"},
           start=0, accept={0})

for w in ["", "0", "11", "110", "1001", "1011", "10010"]:
    ok, trace = mod3.run(w)
    print(f"{w!r:9} value {int(w or '0', 2):2}  states {trace}  accept={ok}")
```

```console
$ python3 dfa.py
''        value  0  states [0]  accept=True
'0'       value  0  states [0, 0]  accept=True
'11'      value  3  states [0, 1, 0]  accept=True
'110'     value  6  states [0, 1, 0, 0]  accept=True
'1001'    value  9  states [0, 1, 2, 1, 0]  accept=True
'1011'    value 11  states [0, 1, 2, 2, 2]  accept=False
'10010'   value 18  states [0, 1, 2, 1, 0, 0]  accept=True
```

生产环境的词法分析器做的正是同一件事：用按状态编号和字节值索引的二维数组，常常由对单词符号（token）的描述自动生成；我们如何在 [[theory-of-computation/regular-expressions]] 中看到这一点。

## 设计有限自动机

整除的例子展示了几乎适用于一切 DFA 设计的方法：**决定机器必须记住关于已读前缀的什么**，为该信息的每个可能取值设一个状态，再验证该信息能从一个符号更新到下一个符号。若你能找到有限多个前缀的"摘要"，使得 (i) $wa$ 的摘要由 $w$ 的摘要与 $a$ 决定，且 (ii) $w \in L$ 是否成立由 $w$ 的摘要决定，你就得到了一个 DFA。[[theory-of-computation/non-regular-languages]] 把这一直觉变成对正则语言的精确刻画——Myhill–Nerode 定理。

::: example 偶数个零、以 1 结尾 {#ex-design-parity}
在 $\{0,1\}$ 上为 (a) $E = $ 含偶数个 $0$ 的串，(b) $D = $ 以 $1$ 结尾的串设计 DFA。
::: solution
(a) 机器只需要已读 $0$ 的个数的奇偶性：状态 $e$（偶，开始，接受）与 $o$（奇）。读 $0$ 使二者互换，读 $1$ 保持状态不变：$\delta(e,0) = o$，$\delta(o,0) = e$，$\delta(e,1) = e$，$\delta(o,1) = o$。

(b) 机器只需要最后读到的符号（或根本没有）：状态 $n$（最后一个符号不是 $1$——包括空前缀；开始状态）与 $y$（最后一个符号是 $1$；接受）。从任一状态出发，$1$ 到 $y$，$0$ 到 $n$。

两种情形下，正确性的证明都是像 [[#thm-mod3]] 那样的归纳，其不变式为"状态记录奇偶性"或"状态记录最后一个符号是否为 $1$"。
:::
:::

要求更高的设计是**子串检测器**：接受包含给定模式的串。这里要记住的信息是**到目前为止已经匹配了模式的多少部分**——更确切地说，是已读输入中作为模式前缀的最长后缀。

::: example 包含 101 的串 {#ex-101}
为 $C = \{w \in \{0,1\}^* : w \text{ 含有子串 } 101\}$ 造一个 DFA，并在 $1001011$ 上跟踪它。
::: solution
令状态 $s_k$ 表示"输入中作为 $101$ 的前缀的最长后缀长度为 $k$"，$k = 0, 1, 2$；再令 $s_3$ 表示"已见到 $101$"（接受，且吸收：一旦见到，永远见到）。转移由这些含义直接得出：

| 状态 | 含义 | 读 $0$ | 读 $1$ |
|---|---|---|---|
| $\to s_0$ | 尚无进展 | $s_0$ | $s_1$ |
| $s_1$ | 后缀 $1$ | $s_2$ | $s_1$ |
| $s_2$ | 后缀 $10$ | $s_0$ | $s_3$ |
| $s_3$（接受） | 已见 $101$ | $s_3$ | $s_3$ |

棘手的是那些"失败"项。从 $s_1$（后缀 $1$）读 $1$ 得到后缀 $11$，其作为 $101$ 前缀的最长后缀是 $1$：留在 $s_1$，而不是回到 $s_0$。从 $s_2$（后缀 $10$）读 $0$ 得到 $100$，而 $100$ 的任何非空后缀都不是 $101$ 的开头：进入 $s_0$。

在 $1001011$ 上：$s_0 \xrightarrow{1} s_1 \xrightarrow{0} s_2 \xrightarrow{0} s_0 \xrightarrow{1} s_1 \xrightarrow{0} s_2 \xrightarrow{1} s_3 \xrightarrow{1} s_3$。接受：$101$ 出现在位置 $4$–$6$。
:::
:::

这一构造可推广到任何长度 $m$ 的模式 $p$：状态 $s_0, \dots, s_m$，失败转移由模式算出。这正是 Knuth–Morris–Pratt 字符串匹配算法背后的自动机；它在建好自动机后，用 $O(n + m)$ 时间在长 $n$ 的正文中找出 $p$ 的一切出现。

::: widget graph
nodes: s0@0,0; s1@2,0; s2@4,0; s3@6,0
edges: s0>s0:0; s0>s1:1; s1>s1:1; s1>s2:0; s2>s0:0; s2>s3:1; s3>s3:0; s3>s3:1
algorithm: none
caption: 模式 $101$ 的子串检测器（[[#ex-101]]）；$s_3$ 接受。沿箭头跟踪 $1001011$，再试不含 $101$ 的 $1100$ 与 $0110$，看看各自停在哪个状态。
:::

并非每个条件都能用有穷内存检验。要接受 $0$ 与 $1$ 个数相等的串，机器需要记住两个计数之差，它可以是任何整数；我们将在 [[theory-of-computation/non-regular-languages]] 证明没有 DFA 识别该语言。即使正则语言也可能需要许多状态：接受**从末尾数**第 $k$ 个符号是 $1$ 的串需要记住最后 $k$ 个符号，而我们将看到它的每个 DFA 都至少需要 $2^k$ 个状态——这一事实引出了 [[theory-of-computation/nondeterminism]] 的非确定自动机。

::: quiz
接受长度恰为 $2$ 的二进制串（在 $\Sigma = \{0,1\}$ 上）的最小 DFA 有多少个状态？
- [ ] $2$
- [ ] $3$
- [x] $4$
- [ ] $5$
::: solution
机器必须数读入的符号：$0$、$1$、$2$（接受）或"超过 $2$ 个"。最后一个是**死状态**（一个对每个符号都自环的非接受状态），而由于 $\delta$ 是全函数它是必需的：读完第三个符号后机器必须去**某个地方**，而且绝不能再接受。更少的状态不行：前缀 $\varepsilon$、$0$、$00$ 与 $000$ 必须通向四个不同状态，因为对每一对都存在某个后续串区分它们（例如 $\varepsilon$ 与 $0$ 可由接上 $00$ 区分：$00 \in L$ 而 $000 \notin L$）。
:::
:::

## 封闭性

现在我们把正则语言作为一个**类**来问它的行为。若 $A$ 与 $B$ 正则，$\overline{A}$、$A \cup B$、$A \cap B$ 正则吗？答案是肯定的，而证明是构造：从 $A$ 与 $B$ 的 DFA 出发造出新语言的 DFA。这类**封闭性**有两个方向的用处：由简单自动机构造复杂自动机；以及（在 [[theory-of-computation/non-regular-languages]] 中）帮助证明某些语言**不**正则。

::: theorem 对补运算封闭 {#thm-complement}
若 $A \subseteq \Sigma^*$ 正则，则 $\overline{A} = \Sigma^* \setminus A$ 也正则。
:::

::: proof
设 $M = (Q, \Sigma, \delta, q_0, F)$ 识别 $A$，令 $M' = (Q, \Sigma, \delta, q_0, Q \setminus F)$，它交换接受与非接受状态。两台机器在每个 $w$ 上有同样的唯一运行，都结束于 $\hat\delta(q_0, w)$。于是 $w \in L(M')$ 当且仅当 $\hat\delta(q_0, w) \notin F$，当且仅当 $w \notin A$。
:::

::: warning 取补集要求完全确定的自动机
证明用到两个事实：每个串都有运行（因为 $\delta$ 是全函数），且恰有一个运行（因为 $M$ 是确定的）。DFA 的图形常常省略死状态及其箭头以减少杂乱；若在这样的部分图上交换接受状态，那些从图上"掉下来"的串会被原机器与交换后的机器一同拒绝，结果就错了。先补上死状态。而对下一章的非确定自动机，交换接受状态根本不能得到语言的补——一个串可能既有接受的运行又有拒绝的运行。必须先转换成 DFA。
:::

对两个语言，我们同时运行两台机器。一对状态分别记住每台机器的状态；这就是**乘积构造**。

::: definition 乘积自动机 {#def-product}
设 $M_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ 与 $M_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ 是同一字母表上的 DFA。它们以 $F \subseteq Q_1 \times Q_2$ 为接受集的**乘积**是

$$
M = \bigl(Q_1 \times Q_2,\ \Sigma,\ \delta,\ (q_1, q_2),\ F\bigr), \qquad \delta\bigl((p, r), a\bigr) = \bigl(\delta_1(p, a), \delta_2(r, a)\bigr).
$$
:::

::: lemma 乘积运行 {#lem-product}
在乘积自动机中，对所有状态 $p \in Q_1$、$r \in Q_2$ 与串 $w$，有 $\hat\delta\bigl((p, r), w\bigr) = \bigl(\hat\delta_1(p, w), \hat\delta_2(r, w)\bigr)$。
:::

::: proof
对 $\lvert w\rvert$ 归纳。$w = \varepsilon$ 时两边都是 $(p, r)$。$w = ua$ 时，$\hat\delta((p,r), ua) = \delta\bigl(\hat\delta((p,r),u), a\bigr) = \delta\bigl((\hat\delta_1(p,u), \hat\delta_2(r,u)), a\bigr) = \bigl(\delta_1(\hat\delta_1(p,u),a), \delta_2(\hat\delta_2(r,u),a)\bigr) = \bigl(\hat\delta_1(p,ua), \hat\delta_2(r,ua)\bigr)$，第二步用到归纳假设。
:::

::: theorem 对并和交封闭 {#thm-union-intersection}
若 $A = L(M_1)$ 与 $B = L(M_2)$ 正则，则 $A \cap B$ 被取 $F = F_1 \times F_2$ 的乘积识别，$A \cup B$ 被取 $F = (F_1 \times Q_2) \cup (Q_1 \times F_2)$ 的乘积识别。二者都有 $\lvert Q_1\rvert \cdot \lvert Q_2\rvert$ 个状态。
:::

::: proof
由 [[#lem-product]]，乘积在 $w$ 上到达 $(\hat\delta_1(q_1, w), \hat\delta_2(q_2, w))$。该有序对属于 $F_1 \times F_2$ 当且仅当两个分量都是接受的，即当且仅当 $w \in A$ 且 $w \in B$。它属于 $(F_1 \times Q_2) \cup (Q_1 \times F_2)$ 当且仅当至少一个分量是接受的，即当且仅当 $w \in A \cup B$。
:::

同样的乘积取 $F = F_1 \times (Q_2 \setminus F_2)$ 识别差 $A \setminus B$；取 $F = \{(p, r) : p \in F_1 \text{ 异或 } r \in F_2\}$ 识别对称差 $A \mathbin{\triangle} B$。有限多个正则语言的任意布尔组合都是正则的。（也可由补和交借助 De Morgan 律推出并，$A \cup B = \overline{\overline{A} \cap \overline{B}}$。）对连接和星封闭同样是真命题，但用 DFA 证明它要困难得多；非确定性使它变得容易，见 [[theory-of-computation/nondeterminism]]。

::: example 一个乘积自动机 {#ex-product}
利用 [[#ex-design-parity]] 的 DFA，为 $E \cap D$（含偶数个 $0$ 且以 $1$ 结尾的串）造乘积 DFA。在 $0101$ 与 $0011$ 上跟踪它。
::: solution
状态是有序对 $(x, y)$，其中 $x \in \{e, o\}$（$0$ 的奇偶性），$y \in \{n, y\}$（输入是否以 $1$ 结尾）。开始 $(e, n)$；接受集 $\{(e, y)\}$。读 $0$ 翻转第一个分量并把第二个置为 $n$；读 $1$ 保持第一个并把第二个置为 $y$：

| 状态 | 读 $0$ | 读 $1$ |
|---|---|---|
| $\to (e,n)$ | $(o,n)$ | $(e,y)$ |
| $(e,y)$（接受） | $(o,n)$ | $(e,y)$ |
| $(o,n)$ | $(e,n)$ | $(o,y)$ |
| $(o,y)$ | $(e,n)$ | $(o,y)$ |

在 $0101$ 上：$(e,n) \xrightarrow{0} (o,n) \xrightarrow{1} (o,y) \xrightarrow{0} (e,n) \xrightarrow{1} (e,y)$：接受（两个 $0$，以 $1$ 结尾）。在 $0011$ 上：$(e,n) \to (o,n) \to (e,n) \to (e,y) \to (e,y)$：也接受。对并 $E \cup D$，保留此表，把 $(e, n)$、$(e, y)$、$(o, y)$ 设为接受。
:::
:::

::: widget graph
nodes: en@0,2; ey@3,2; on@0,0; oy@3,0
edges: en>on:0; en>ey:1; ey>on:0; ey>ey:1; on>en:0; on>oy:1; oy>en:0; oy>oy:1
algorithm: none
caption: [[#ex-product]] 的乘积自动机，状态 $xy$ 代表有序对 $(x, y)$：第一个字母是 $0$ 的奇偶性，第二个是最后一个符号是否为 $1$。对 $E \cap D$ 只有 $ey$ 接受。注意每条 $0$ 箭头都改变第一个字母，而每条 $1$ 箭头都不动它——乘积机器是两台相互独立的机器并排运行。
:::

## 可由算法回答的问题

因为 DFA 是有穷对象，关于它的**无穷**语言的许多问题都能由有穷计算判定。这是贯穿本课程末尾一大主题的第一次出现——那里我们会遇到任何算法都无法回答的关于程序的问题。

::: theorem DFA 的空性、有穷性与等价性可判定 {#thm-emptiness}
给定 $\Sigma$ 上的 DFA $M$、$M_1$、$M_2$：

1. $L(M) = \emptyset$ 是否成立可在 $O(\lvert Q\rvert \cdot \lvert\Sigma\rvert)$ 时间判定；
2. $L(M)$ 是否有穷可在同样时间界内判定；
3. $L(M_1) = L(M_2)$ 是否成立可在 $O(\lvert Q_1\rvert \lvert Q_2\rvert \lvert\Sigma\rvert)$ 时间判定。
:::

::: proof
(1) $L(M) \ne \emptyset$ 当且仅当状态图中某个接受状态从 $q_0$ 可达：若 $\hat\delta(q_0, w) \in F$，则 $w$ 上的运行是一条通往接受状态的路径；反之，从 $q_0$ 出发的任何路径上的标记拼出的串都会驱动 $M$ 沿该路径走。可达性由图（有 $\lvert Q\rvert$ 个顶点和 $\lvert Q\rvert\lvert\Sigma\rvert$ 条边）上的广度优先或深度优先搜索判定，时间为两者之和的线性倍数（[[data-structures/graph-representations]]、[[algorithms/graph-search]]）。

(2) 称一个状态**有用**，若它从 $q_0$ 可达且从它可达某个接受状态；这两个集合各由一次从 $q_0$ 出发的正向搜索和一次从 $F$ 出发的反向搜索求出。我们断言：$L(M)$ 无穷当且仅当限制在有用状态上的状态图含有圈。若存在经过有用状态 $q$ 的这样的圈，设 $x$ 从 $q_0$ 引到 $q$，圈上的标记为 $y \ne \varepsilon$，$z$ 从 $q$ 引到 $F$；则对每个 $k \ge 0$ 有 $xy^kz \in L(M)$，得到无穷多个串。若不存在这样的圈，则每条接受的运行只经过有用状态（其上的每个状态都从 $q_0$ 可达且可达 $F$），从不重复状态，因此长度小于 $\lvert Q\rvert$；这样的串只有有限多个。找圈用深度优先搜索，同样是线性的。

(3) $L(M_1) = L(M_2)$ 当且仅当对称差 $L(M_1) \mathbin{\triangle} L(M_2)$ 为空。造出带异或接受集的乘积（它有 $\lvert Q_1\rvert\lvert Q_2\rvert$ 个状态）并应用 (1)。只需造出从开始对可达的部分。
:::

第 (3) 部分是真正有用的算法。工具正是靠它检查一个手工优化过的词法分析器是否仍接受与其规格相同的单词符号；而第 (1) 部分的搜索在两台机器不一致时会自动产生一个**反例**——使两机器意见不同的最短串。

## 有限自动机的应用

DFA 模型是理想化的，但并非书斋里的东西。`lex` 及其后继工具生成的词法分析器就是编译成表的 DFA（[[compilers]]）。硬件设计者把控制器指定为**有限状态机**，它们被综合成触发器和逻辑门；Mealy 与 Moore 变体给每条转移或每个状态加上一个**输出**（[电气电子工程图谱](/learn/ee/)）。协议规格——包括 RFC 9293 中的 TCP 连接状态机——就是用状态图给出的（[[networks]]）。模型检验器验证一个系统（抽象成一个大型有限自动机）永远达不到坏状态。而你的编辑器里每次正则表达式搜索，都以某种形式在跑我们接下来两章要造的自动机。

每个场合的局限都是同一个：内存事先固定，与输入长度无关。$k$ 个状态的 DFA 对任意长度的输入至多记住 $\log_2 k$ 个比特。计数、配对括号、比较串的两半都超出它的能力；后面几章的下推自动机和图灵机会增加随输入增长的内存。

::: history
有限自动机有几个相互独立的起源。沃伦·麦卡洛克（Warren McCulloch）与沃尔特·皮茨（Walter Pitts）在 1943 年把理想化神经元网络建模为阈值逻辑。斯蒂芬·克莱尼（Stephen Kleene）研究这类神经网能表示哪些事件，于 1951 年在兰德公司（RAND）的一份备忘录中引入了正则事件（即我们的正则表达式），并证明了它与有限自动机的等价性；该备忘录 1956 年发表于克劳德·香农（Claude Shannon）与约翰·麦卡锡（John McCarthy）编辑的文集 *Automata Studies*。工程师们经由开关电路达到同一概念：戴维·霍夫曼（David Huffman）1954 年关于时序电路综合的论文、乔治·米利（George Mealy）1955 年的论文，以及爱德华·穆尔（Edward Moore）的 "Gedanken-experiments on sequential machines"（1956），后两者给出了两类带输出的机器。现代表述——5 元组、非确定性、子集构造与封闭性——出自迈克尔·拉宾（Michael Rabin）与达纳·斯科特（Dana Scott）的 "Finite automata and their decision problems"（*IBM Journal of Research and Development*，1959），二人因此获 1976 年图灵奖。
:::

## 后续内容

下一章 [[theory-of-computation/nondeterminism]] 允许自动机"猜"，并表明猜带来方便却不增加能力。随后 [[theory-of-computation/regular-expressions]] 证明正则表达式恰好刻画正则语言，而 [[theory-of-computation/non-regular-languages]] 证明有穷内存的极限，并为每个正则语言找出最小的 DFA。同一模式——精确的模型、组合机器的构造、以及关于模型不能做什么的定理——将在上下文无关语言和图灵机上重演。

::: summary
- **字母表**是有穷集；**语言**是其上有限串的集合。$\varepsilon$ 是空串且 $\emptyset \ne \{\varepsilon\}$。连接、幂与克林星造出新语言（[[#def-lang-ops]]）。
- **DFA** $(Q, \Sigma, \delta, q_0, F)$ 的转移函数是**全**的；当 $\hat\delta(q_0, w) \in F$ 时它接受 $w$（[[#def-dfa-language]]）。DFA 识别的语言是**正则语言**。
- 设计 DFA 的办法：决定对已读前缀需要哪种有限的摘要、且能逐符号更新；用描述**每个**状态的不变式作归纳来证明正确性（[[#thm-mod3]]）。
- DFA 每个符号一次查表，$\Theta(n)$ 时间运行。
- 正则语言对补封闭（交换**完全** DFA 的接受状态），并借助**乘积构造**对并、交、差封闭（[[#thm-union-intersection]]）。
- DFA 的空性、有穷性与等价性可由状态图或乘积上的图搜索判定（[[#thm-emptiness]]）。
:::

## 习题

::: exercise 数串 {level=1 check="6"}
[[#ex-mod3]] 的 DFA 接受多少个长度恰为 $4$ 的 $\{0,1\}$ 串？（输入数字。）
::: solution
由 [[#thm-mod3]]，它恰好接受值能被 $3$ 整除的串。长度为 $4$（允许前导零）的串取值 $0, 1, \dots, 15$，其中 $0, 3, 6, 9, 12, 15$ 是 $3$ 的倍数：串 $0000, 0011, 0110, 1001, 1100, 1111$。答案是 $6$。
:::
:::

::: exercise 语言的运算 {level=1}
设 $A = \{0, 01\}$，$B = \{\varepsilon, 1\}$。列出 $AB$、$BA$ 与 $A^2$ 的元素，并判定 $0101 \in A^*$ 与 $0110 \in A^*$ 是否成立。
::: solution
$AB = \{0, 01, 011\}$（注意 $0 \cdot 1 = 01 \cdot \varepsilon$，所以只有三个不同的串）。$BA = \{0, 01, 10, 101\}$。$A^2 = \{00, 001, 010, 0101\}$。$0101 = 01 \cdot 01 \in A^2 \subseteq A^*$。$0110 \notin A^*$：$A^*$ 中每个串都是块 $0$ 与 $01$ 的连接，故每个 $1$ 之前紧挨着一个 $0$；而在 $0110$ 中第二个 $1$ 前面是 $1$。
:::
:::

::: exercise 由文字描述给出 DFA {level=1}
在 $\{a, b\}$ 上给出 DFA（表或图），识别以相同符号开头和结尾的串（包括串 $a$ 与 $b$，但不包括 $\varepsilon$）。
::: solution
记住第一个符号和最后读到的符号。状态：$s$（开始，未读入任何符号）、$a_1$（首符号 $a$，末符号 $a$；接受）、$a_2$（首 $a$，末 $b$）、$b_1$（首 $b$，末 $b$；接受）、$b_2$（首 $b$，末 $a$）。转移：$s \xrightarrow{a} a_1$，$s \xrightarrow{b} b_1$；$a_1 \xrightarrow{a} a_1$，$a_1 \xrightarrow{b} a_2$，$a_2 \xrightarrow{a} a_1$，$a_2 \xrightarrow{b} a_2$；对称地 $b_1 \xrightarrow{b} b_1$，$b_1 \xrightarrow{a} b_2$，$b_2 \xrightarrow{b} b_1$，$b_2 \xrightarrow{a} b_2$。$F = \{a_1, b_1\}$；$s$ 不接受，故 $\varepsilon$ 被拒绝。五个状态。
:::
:::

::: exercise 乘积的规模 {level=2 check="15"}
$M_1$ 识别能被 $3$ 整除的二进制数（三个状态，[[#ex-mod3]]），$M_2$ 识别能被 $5$ 整除的二进制数（五个状态，$r_i \xrightarrow{b} r_{(2i+b) \bmod 5}$）。为 $L(M_1) \cap L(M_2)$ 造的乘积自动机有多少个状态，其中多少个从开始状态可达？是否存在状态更少的同语言 DFA？（输入可达状态数。）
::: solution
乘积有 $3 \cdot 5 = 15$ 个状态。从 $(i, j)$ 读 $b$ 到达 $((2i + b) \bmod 3, (2j + b) \bmod 5)$。由中国剩余定理，有序对 $(v \bmod 3, v \bmod 5)$ 决定 $v \bmod 15$，且每个有序对都由某个 $v \in \{0, \dots, 14\}$ 产生；该 $v$ 的二进制表示把乘积驱动到 $(v \bmod 3, v \bmod 5)$。故 $15$ 个状态全都可达。该语言是"能被 $15$ 整除"，由 $15$ 状态的 DFA $r_i \xrightarrow{b} r_{(2i + b) \bmod 15}$ 识别，它就是同一台机器换了状态名。不存在更小的 DFA：值为 $0, \dots, 14$ 的前缀两两可区分（对 $v \ne v'$，接上足够的比特使结果之一能被 $15$ 整除而另一个不能），这一技术在 [[theory-of-computation/non-regular-languages]] 中严格化。
:::
:::

::: exercise 子串检测器的正确性 {level=2}
对 [[#ex-101]] 的 DFA 陈述一个不变式，并归纳证明它识别 $C$。
::: solution
不变式：对每个 $w$，若 $w$ 含 $101$ 则 $\hat\delta(s_0, w) = s_3$；否则 $\hat\delta(s_0, w) = s_k$，其中 $k \in \{0,1,2\}$ 是 $w$ 的作为 $101$ 前缀的最长后缀的长度（即 $w$ 以 $10$ 结尾时 $k = 2$，$w$ 以 $1$ 结尾时 $k = 1$，其余 $k = 0$——注意"以 $10$ 结尾"与"以 $1$ 结尾"互斥）。

基础：$\varepsilon$ 不含 $101$，其满足条件的最长后缀是 $\varepsilon$，且 $\hat\delta(s_0, \varepsilon) = s_0$。归纳步：设不变式对 $w$ 成立，考察 $wa$。若 $w$ 含 $101$，则 $wa$ 也含，而 $s_3$ 在两个符号上自环。否则逐情形检查。若 $w$ 在 $s_0$（$w$ 既不以 $1$ 也不以 $10$ 结尾）：$w0$ 以 $0$ 结尾但不以 $10$ 结尾（因 $w$ 不以 $1$ 结尾），得 $s_0$；$w1$ 以 $1$ 结尾，得 $s_1$；二者都不含 $101$，因为那要求 $w$ 以 $10$ 结尾。若 $w$ 在 $s_1$（$w$ 以 $1$ 结尾）：$w0$ 以 $10$ 结尾，得 $s_2$；$w1$ 以 $11$ 结尾，即以 $1$ 而非 $10$ 结尾，得 $s_1$；二者都不含 $101$，因为 $w$ 不以 $10$ 结尾。若 $w$ 在 $s_2$（$w$ 以 $10$ 结尾）：$w1$ 以 $101$ 结尾，得 $s_3$，正确；$w0$ 以 $00$ 结尾，既不以 $1$ 也不以 $10$ 结尾，得 $s_0$。这与表一致。由于 $F = \{s_3\}$，该 DFA 恰好接受 $C$。
:::
:::

::: exercise 部分图形的补 {level=2}
一名学生画了一个 $\{0,1\}$ 上的自动机表示 $\{01\}$：状态 $p \xrightarrow{0} q \xrightarrow{1} r$，开始 $p$，接受 $\{r\}$，没有其他箭头。为得到 $\overline{\{01\}}$ 的 DFA，他把 $p$、$q$ 设为接受而 $r$ 不。他的机器错误地拒绝了哪些串？修正这一构造。
::: solution
按"缺箭头即拒绝"的约定来读，他的机器只接受 $\varepsilon$ 和 $0$——运行结束于 $p$ 或 $q$ 的串。除 $\varepsilon$、$0$、$01$ 外，每个串都属于 $\overline{\{01\}}$ 却从图上掉下来（它以 $1$ 开头，或在 $0$ 之后接 $0$，或在 $01$ 之后还有字符），因而被错误拒绝：例如 $1$、$00$ 与 $010$。修正：先补全 DFA——加一个死状态 $d$，令 $p \xrightarrow{1} d$、$q \xrightarrow{0} d$、$r \xrightarrow{0,1} d$、$d \xrightarrow{0,1} d$；然后再交换，把 $p$、$q$、$d$ 设为接受而 $r$ 不。
:::
:::

::: exercise 对逆运算封闭 {level=3}
证明：若 $L$ 正则，则 $L^R = \{w^R : w \in L\}$ 也正则。你可以使用 [[theory-of-computation/nondeterminism]] 的如下事实：若一个语言被允许多个开始状态的 DFA 识别（某个开始状态在 $w$ 上通向接受状态即接受 $w$），则该语言正则（且这类机器都可转换成通常的 DFA）。然后说明状态数的下界会改变很多：从开头数第三个符号是 $1$ 的语言有一个 $5$ 状态 DFA，而其逆需要更多。
::: solution
设 $M = (Q, \Sigma, \delta, q_0, F)$ 识别 $L$。造逆机器 $M^R$：同样的状态，$M$ 的每条箭头 $p \xrightarrow{a} q$ 在 $M^R$ 中是一条箭头 $q \xrightarrow{a} p$，开始状态集为 $F$，接受状态为 $q_0$。$M$ 中的路径 $q_0 = r_0 \xrightarrow{a_1} r_1 \cdots \xrightarrow{a_n} r_n \in F$ 恰是 $M^R$ 中从某个开始状态到接受状态的路径 $r_n \xrightarrow{a_n} \cdots \xrightarrow{a_1} r_0$，其标记为 $a_n \cdots a_1 = w^R$。故 $M^R$ 恰好接受 $L^R$。$M^R$ 可以是非确定的（在 $M$ 中一个状态可有多条以 $a$ 标记的入箭头，于是在 $M^R$ 中有多条出箭头，或没有），这正是我们需要所引事实的原因。

从开头数第三个符号是 $1$：状态 $t_0, t_1, t_2$ 数前两个符号，然后 $t_2 \xrightarrow{1} y$（接受，在两个符号上自环），$t_2 \xrightarrow{0} n$（死状态）：$5$ 个状态。其逆是"从末尾数第三个符号是 $1$"，对它的 DFA 必须记住最后三个符号；我们在 [[theory-of-computation/nondeterminism]] 中将证明它的任何 DFA 都需要 $2^3 = 8$ 个状态。
:::
:::

::: exercise 最短反例 {level=3}
给定 $\{0,1\}$ 上的两个 DFA：$M_1$ 接受含偶数个 $1$ 的串（状态 $E, O$），$M_2$ 接受 $1$ 的个数能被 $4$ 整除的串（状态 $c_0, c_1, c_2, c_3$，读 $1$ 使 $c_i$ 到 $c_{(i+1) \bmod 4}$，读 $0$ 自环）。执行 [[#thm-emptiness]] 的等价性检验：造出带异或接受集的乘积的可达部分，找出使二者不同的最短串。再用 Python 对以字典给出的 DFA 实现该检验，并在这对机器上运行。
::: solution
开始 $(E, c_0)$。读 $1$ 使两机器同时前进，读 $0$ 自环：可达有序对为 $(E, c_0) \to (O, c_1) \to (E, c_2) \to (O, c_3) \to (E, c_0)$，共四个状态。异或集包含恰有一台机器接受的那些：$(E, c_2)$（$M_1$ 接受而 $M_2$ 不接受）。它由 $11$ 到达，这就是两机器意见不同的最短串。

```python
from collections import deque

def counterexample(d1, s1, f1, d2, s2, f2, sigma):
    """Shortest string accepted by exactly one DFA, or None if equivalent."""
    start = (s1, s2)
    parent = {start: None}                   # BFS 树：状态 ->（前驱, 符号）
    queue = deque([start])
    while queue:
        p, r = queue.popleft()
        if (p in f1) != (r in f2):           # 到达异或接受集
            word, s = [], (p, r)
            while parent[s] is not None:
                s, a = parent[s]
                word.append(a)
            return "".join(reversed(word))
        for a in sigma:
            nxt = (d1[(p, a)], d2[(r, a)])
            if nxt not in parent:
                parent[nxt] = ((p, r), a)
                queue.append(nxt)
    return None

d1 = {("E", "0"): "E", ("E", "1"): "O", ("O", "0"): "O", ("O", "1"): "E"}
d2 = {(i, b): (i + int(b)) % 4 for i in range(4) for b in "01"}
print(counterexample(d1, "E", {"E"}, d2, 0, {0}, "01"))
print(counterexample(d1, "E", {"E"}, d1, "E", {"E"}, "01"))
```

```console
$ python3 equiv.py
11
None
```

广度优先搜索按距离递增的次序访问乘积状态，因此最先找到的异或状态给出最短反例，而父指针把它拼出来。运行时间为可达乘积规模的线性倍数。
:::
:::
