经过六章复杂性理论，我们手里已有许多复杂性类，却只有寥寥几个分离结果。我们不知道 $\mathsf{P} \ne \mathsf{NP}$ 是否成立，不知道 $\mathsf{NP} \ne \mathsf{PSPACE}$ 是否成立，甚至不知道 $\mathsf{L} \ne \mathsf{P}$ 是否成立。有什么东西是*可证明*困难的吗？有没有哪个问题能在 $n^3$ 时间内求解、却无法在 $n^2$ 时间内求解？

有的。**层次定理**表明，只要界是"合理的"函数，更多的时间或更多的空间总能允许一台机器判定更多的语言。它们的证明使用对角化——正是在 [[theory-of-computation/decidability#thm-atm]] 中证明停机问题不可判定的那个方法——只不过现在配上了时钟。它们给出了我们第一批无条件的分离：$\mathsf{P} \ne \mathsf{EXP}$ 与 $\mathsf{NL} \ne \mathsf{PSPACE}$。本章第二部分将解释为什么同一技术无法解决 $\mathsf{P}$ 对 $\mathsf{NP}$ 的问题：对角化是**相对化**的，而存在某些其中 $\mathsf{P} = \mathsf{NP}$ 的"预言机世界"，也存在另一些其中 $\mathsf{P} \ne \mathsf{NP}$ 的世界。第三部分则把恰位于 $\mathsf{NP}$ 之上的那些问题——由有界多次交替量词定义的问题——组织成**多项式层次**。

## 可构造函数

一台要"运行 $t(n)$ 步"的机器必须能够算出这有多长。

::: definition 时间可构造函数与空间可构造函数 {#def-constructible}
若某台图灵机能从输入 $1^n$ 出发、在 $O(t(n))$ 时间内算出 $t(n)$ 的二进制表示，则满足 $t(n) \ge n$ 的函数 $t\colon \N \to \N$ 称为**时间可构造**的。若某台图灵机能从 $1^n$ 出发、在 $O(f(n))$ 空间内算出 $f(n)$ 的二进制表示，则满足 $f(n) \ge \log n$ 的函数 $f(n)$ 称为**空间可构造**的。
:::

我们通常遇到的函数都是可构造的：$n \log n$、$n^k$、$2^n$、$n^{\log n}$（时间）；$\log n$、$\log^2 n$、$n^k$（空间）。可构造性排除了病态的界，而且确实是必要的（[[#warn-gap]]）。

## 空间层次定理

::: theorem 空间层次定理 {#thm-space-hierarchy}
对每个空间可构造函数 $f$，存在语言 $A$，它可在 $O(f(n))$ 空间内判定，却不能在任何 $o(f(n))$ 空间内判定。
:::

想法是：构造一台机器 $D$，它以机器 $M$ 的描述为输入，在 $f(n)$ 空间内对同一个输入模拟 $M$ 并反着干。若 $M$ 用的空间少于 $D$ 允许的，$D$ 就与 $M$ 的判定相反，于是 $M$ 判定不了 $L(D)$。有两个技术细节需要小心：$M$ 的描述可能相对于我们希望击败的空间来说很长，这靠对输入做**填充**解决；$M$ 可能死循环，这靠一个步数计数器解决。

::: proof
$D$ = "对长度 $n$ 的输入 $w$：

1. 计算 $f(n)$（空间可构造性），划出 $f(n)$ 个工作格。若后面任何阶段试图使用更多格子，**拒绝**。
2. 若 $w$ 不是 $\langle M\rangle 1 0^k$ 的形式（$M$ 是一台带只读输入带的图灵机，$k \ge 0$），**拒绝**。
3. 在被划出的格子内模拟 $M$ 在 $w$ 上的运行，把 $M$ 工作带的每个符号编码成一个格子块，并用一个 $2f(n)$ 位的二进制计数器数模拟的步数。若计数器溢出（步数超过 $2^{2f(n)}$），**拒绝**。
4. 若 $M$ 接受，**拒绝**。若 $M$ 拒绝，**接受**。"

*$D$ 使用 $O(f(n))$ 空间：* 第 1 步由可构造性保证，第 3–4 步被限制在划出的格子与计数器内。$D$ 总是停机。令 $A = L(D)$。

*没有机器能在 $o(f(n))$ 空间内判定 $A$。* 反设某台 $M$ 能以 $g(n) = o(f(n))$ 空间判定它。编码 $M$ 的符号花费一个常数因子 $c_M$（块大小，只依赖于 $M$），而 $M$ 作为一台从不重复格局的判定器，在 $\lvert Q\rvert\,n\,g(n)\,\lvert\Gamma\rvert^{g(n)} = 2^{\log n + O(g(n))}$ 步内停机（[[complexity/space-complexity#lem-configs]]）。由于 $g = o(f)$ 且 $f(n) \ge \log n$，对所有充分大的 $n$ 有 $c_M g(n) \le f(n)$ 且 $\log n + O(g(n)) \le 2f(n)$。取 $k$ 充分大，使 $w = \langle M\rangle 1 0^k$ 有这样的长度 $n$。在 $w$ 上，$D$ 对 $M$ 的模拟放得进划出的空间、并在计数器溢出之前完成，于是 $D$ 接受 $w$ 当且仅当 $M$ 拒绝 $w$。故 $L(M) \ne A$，矛盾。
:::

填充 $1 0^k$ 起着对角线的作用：每台机器 $M$ 都出现在无穷多个输入 $\langle M\rangle 1 0^k$（对一切 $k$）上，而在足够长的那些输入上，$D$ 有足够空间击败它。后缀以 $1$ 开头，是为了能唯一地恢复出 $\langle M\rangle$。

::: corollary 空间层次定理的推论 {#cor-space-hierarchy}
1. 对所有有理数 $0 \le a < b$，$\mathsf{SPACE}(n^a) \subsetneq \mathsf{SPACE}(n^b)$（其中 $n^0$ 理解为 $\log n$）。
2. $\mathsf{NL} \subsetneq \mathsf{PSPACE}$ 且 $\mathsf{L} \subsetneq \mathsf{PSPACE}$。
3. $\mathsf{PSPACE} \subsetneq \mathsf{EXPSPACE} = \bigcup_k \mathsf{SPACE}(2^{n^k})$。
:::

::: proof
(1) $n^b$ 空间可构造且 $n^a = o(n^b)$。(2) 由萨维奇（Savitch）定理（[[complexity/space-complexity#thm-savitch]]），$\mathsf{NL} \subseteq \mathsf{SPACE}(\log^2 n)$，且 $\log^2 n = o(n)$，所以取 $f(n) = n$ 的定理给出一个属于 $\mathsf{SPACE}(n) \subseteq \mathsf{PSPACE}$、却不属于 $\mathsf{SPACE}(\log^2 n) \supseteq \mathsf{NL} \supseteq \mathsf{L}$ 的语言。(3) $\mathsf{PSPACE}$ 中的每个语言都属于某个 $\mathsf{SPACE}(n^k)$，且 $n^k = o(2^n)$。取 $f(n) = 2^n$ 的定理给出一个属于 $\mathsf{SPACE}(2^n) \subseteq \mathsf{EXPSPACE}$、却不属于任何 $g = o(2^n)$ 的 $\mathsf{SPACE}(g)$ 的语言，故不属于 $\mathsf{PSPACE}$。
:::

第 (2) 部分对于链 $\mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE}$ 有一个惊人的推论：三个包含关系中至少有一个是严格的，但截至 2026 年没有人知道是哪一个。

## 时间层次定理

对时间，论证是同样的，只是模拟的开销更大。带固定条数带子的机器必须模拟带*任意*条带子的机器，而已知的最好通用模拟带有对数级的开销。

::: lemma 高效通用模拟 {#lem-hennie-stearns}
存在一台双带图灵机 $U$，给定 $\langle M\rangle$ 与 $w$，它能用 $C_M\, t \log t$ 步模拟多带图灵机 $M$ 在 $w$ 上的 $t$ 步，其中 $C_M$ 只依赖于 $M$（亨尼（Hennie）与斯特恩斯（Stearns），1966）。
:::

我们不加证明地使用它。（一个更简单的模拟——像 [[theory-of-computation/turing-machines#thm-multitape]] 那样把 $M$ 的所有带子放到一条带上——开销是 $t^2$，那样只能得到一个更弱的定理。）

::: theorem 时间层次定理 {#thm-time-hierarchy}
对每个时间可构造函数 $t$，存在语言 $A$，它可在 $O(t(n))$ 时间内判定，却不能在任何 $o(t(n)/\log t(n))$ 时间内判定。
:::

::: proof
$D$ = "对长度 $n$ 的输入 $w$：

1. 计算 $t(n)$ 并把它写在一条单独的时钟带上（时间为 $O(t(n))$，由可构造性）。此后 $D$ 的每一步把时钟减一；当时钟减到 $0$ 时，**拒绝**。（二进制计数器减一的摊还代价是每步 $O(1)$ 次移动。）
2. 若 $w$ 不是 $\langle M\rangle 1 0^k$ 的形式，**拒绝**。
3. 用 [[#lem-hennie-stearns]] 的 $U$ 模拟 $M$ 在 $w$ 上的运行。若模拟在时钟耗尽之前完成：$M$ 接受则**拒绝**；$M$ 拒绝则**接受**。"

由于时钟的存在，$D$ 在 $O(t(n))$ 时间内运行。令 $A = L(D)$。反设某台机器 $M$ 以时间 $g(n) = o(t(n)/\log t(n))$ 判定 $A$。$D$ 模拟 $M$ 在长度 $n$ 的输入上至多花费 $C_M\, g(n) \log g(n) \le C_M\, g(n) \log t(n)$ 步（可不妨设 $g \le t$），这是 $o(t(n))$；于是对所有充分大的 $n$，模拟能在时钟的 $t(n)$ 步之内完成——再扣除第 2 步的 $O(n)$ 步。取 $w = \langle M\rangle 1 0^k$ 且 $k$ 充分大，$D$ 接受 $w$ 当且仅当 $M$ 拒绝 $w$——矛盾。
:::

::: corollary 时间层次定理的推论 {#cor-time-hierarchy}
1. 对所有有理数 $1 \le a < b$，$\mathsf{TIME}(n^a) \subsetneq \mathsf{TIME}(n^b)$。
2. $\mathsf{P} \subsetneq \mathsf{EXP}$。
3. 每个 $\mathsf{EXP}$ 完全问题（在多项式时间归约之下）都在 $\mathsf{P}$ 之外。
:::

::: proof
(1) $n^a = o(n^b/\log n^b)$。(2) $\mathsf{P} \subseteq \mathsf{TIME}(2^n)$，而取 $t(n) = 2^{2n}$ 的定理给出一个属于 $\mathsf{TIME}(2^{2n}) \subseteq \mathsf{EXP}$、却不属于 $\mathsf{TIME}(o(2^{2n}/2n)) \supseteq \mathsf{TIME}(2^n)$ 的语言。(3) 若某个 $\mathsf{EXP}$ 完全问题 $B$ 属于 $\mathsf{P}$，则 $\mathsf{EXP}$ 中每个语言都归约到它、从而属于 $\mathsf{P}$，与 (2) 矛盾。
:::

于是 [[complexity/space-complexity]] 中那些 $\mathsf{EXP}$ 完全的广义国际象棋与围棋局面是**可证明地**不能在多项式时间内求解的——这是关于自然问题的少数无条件下界之一。该定理对非确定性时间也成立，证明要更微妙，因为一台非确定性机器不能简单地"反着干"另一台（那需要取 $\mathsf{NTIME}$ 计算的补）：对 $1 \le a < b$ 有 $\mathsf{NTIME}(n^a) \subsetneq \mathsf{NTIME}(n^b)$（库克（Cook），1972；西弗拉斯（Seiferas）、费希尔（Fischer）与迈耶（Meyer），1978；扎克（Žák），1983）。于是 $\mathsf{NP} \subsetneq \mathsf{NEXP}$。

::: widget cantor
mode: diagonal
size: 8
caption: 两个层次定理背后的对角论证。把第 $i$ 行读作机器 $M_i$ 在输入 $w_1, w_2, \dots$ 上的行为（接受 $= 1$）。机器 $D$ 被构造成在 $w_i$ 上与 $M_i$ 不同——翻转的对角线——所以 $D$ 不在列表之中。在层次定理里，列表只包含使用比 $D$ *更少*时间或空间的机器，而 $D$ 付得起计算对角元素的代价，因为它被允许多用一点资源；填充保证每台机器都有无穷多个"对角"输入，其中有些足够长，使 $D$ 能模拟它。
:::

::: example 哪些分离能推出？ {#ex-hierarchy}
下列各条中，哪些能由 [[#thm-time-hierarchy]] 或 [[#thm-space-hierarchy]] 推出？(a) $\mathsf{TIME}(n^2) \subsetneq \mathsf{TIME}(n^2 \log^2 n)$；(b) $\mathsf{TIME}(n \log n) \subsetneq \mathsf{TIME}(n \log^2 n)$；(c) $\mathsf{SPACE}(\log n) \subsetneq \mathsf{SPACE}(\log n \cdot \log\log n)$；(d) $\mathsf{P} \subsetneq \mathsf{PSPACE}$。
::: solution
(a) 能：取 $t(n) = n^2\log^2 n$，则 $t/\log t = n^2\log^2 n/(2\log n + 2\log\log n) = \Theta(n^2 \log n)$，而 $n^2 = o(n^2 \log n)$。(b) 不能由该定理推出：取 $t(n) = n\log^2 n$，则 $t/\log t = \Theta(n\log n)$，而 $n\log n$ 不是 $o(n\log n)$。（时间层次定理中的对数因子恰好差在这里；对某些机器模型有更强的结果，但定理的陈述本身不能解决这一情形。）(c) 能：$\log n = o(\log n\log\log n)$，而空间定理没有对数损失。(d) 不能：层次定理比较的是同一种资源的两个界。$\mathsf{P}$ 对 $\mathsf{PSPACE}$ 是时间对空间的比较，仍是未决问题。
:::
:::

::: warning 层次定理要求可构造的界 {#warn-gap}
人们容易把层次定理读成"任何更大的界都带来更多能力"。对任意的界这是错的。博罗金（Borodin）的**空隙定理**（gap theorem，1972）说：对每个满足 $g(x) \ge x$ 的可计算函数 $g$，存在一个可计算的界 $t$，使 $\mathsf{TIME}(t(n)) = \mathsf{TIME}(g(t(n)))$——例如，对某个（增长极快、不可构造的）$t$ 有 $\mathsf{TIME}(t) = \mathsf{TIME}(2^{t})$。这样构造出的 $t$ 被选得使任何机器在长度 $n$ 的输入上都不在 $t(n)$ 与 $2^{t(n)}$ 步之间停机。可构造性排除了这一现象，因为机器此时能够"瞄准"这个界。
:::

## 预言机与相对化

对角化证明了 $\mathsf{P} \ne \mathsf{EXP}$。一个更巧妙的对角化能否证明 $\mathsf{P} \ne \mathsf{NP}$？贝克（Baker）、吉尔（Gill）与索洛韦（Solovay）的定理说不行——至少，凡是像层次定理的证明那样工作的证明都不行。

::: definition 预言机机器 {#def-oracle}
**预言机图灵机** $M^B$ 多出一条**查询带**和三个特殊状态 $q_?$、$q_{\text{yes}}$、$q_{\text{no}}$。当 $M$ 带着查询带上的串 $x$ 进入 $q_?$ 时，它一步之后：若 $x \in B$ 则移至 $q_{\text{yes}}$，否则移至 $q_{\text{no}}$。$\mathsf{P}^B$ 与 $\mathsf{NP}^B$ 分别是由多项式时间的确定性、非确定性预言机机器（预言机为 $B$）判定的语言类。对类 $\mathcal{C}$，$\mathsf{P}^{\mathcal{C}} = \bigcup_{B \in \mathcal{C}} \mathsf{P}^B$，$\mathsf{NP}^{\mathcal{C}}$ 同理。
:::

预言机相当于一个免费调用 $B$ 的子程序。例如 $\mathsf{P}^{\mathit{SAT}}$ 包含 $\mathsf{NP}$ 与 $\mathsf{coNP}$（向预言机问一次，必要时把答案取反）。层次定理的证明是**相对化**的：若给所有机器——$D$、$M$ 以及模拟器——同一个预言机，证明原封不动地成立，因为模拟一台预言机机器只要把它的查询转达出去即可。于是对每个预言机 $B$，$\mathsf{P}^B \ne \mathsf{EXP}^B$。

::: theorem 贝克–吉尔–索洛韦定理 {#thm-bgs}
存在预言机 $A$ 使 $\mathsf{P}^A = \mathsf{NP}^A$，也存在预言机 $B$ 使 $\mathsf{P}^B \ne \mathsf{NP}^B$。
:::

::: proof
*预言机 $A = \mathit{TQBF}$。* 我们有
$$
\mathsf{NP}^{\mathit{TQBF}} \subseteq \mathsf{NPSPACE} = \mathsf{PSPACE} \subseteq \mathsf{P}^{\mathit{TQBF}} \subseteq \mathsf{NP}^{\mathit{TQBF}}.
$$
第一个包含成立，是因为多项式时间的非确定性机器的查询串长度是多项式的，而一台多项式空间的机器可以亲自对每个查询求值公式来回答它（[[complexity/space-complexity#thm-tqbf]]）；等号是萨维奇定理；第三个包含成立，是因为每个 $\mathsf{PSPACE}$ 语言都在多项式时间内归约到 $\mathit{TQBF}$，于是一台多项式时间的机器可以先算出这个归约、再提一次查询。于是这四个类全部相等。

*构造 $B$。* 对任意预言机 $B$ 令
$$
L_B = \{1^n : B \text{ 包含某个长度为 } n \text{ 的串}\}.
$$
$L_B \in \mathsf{NP}^B$：在输入 $1^n$ 上，猜一个长度 $n$ 的串 $x$ 并向预言机查询它。我们将构造 $B \subseteq \{0, 1\}^*$，使 $L_B \notin \mathsf{P}^B$。设 $M_1, M_2, \dots$ 列出所有确定性预言机机器，每台 $M_i$ 都配一个在 $n^i$ 步后将其停止的时钟；每台多项式时间的预言机机器都等价于某台 $M_i$，且对一切预言机成立（取 $i$ 使其运行时间对 $n \ge 2$ 不超过 $n^i$）。我们按长度一段一段地决定 $B$ 的隶属关系；在第 $i$ 阶段，我们保证 $M_i^B$ 判定不了 $L_B$。

*第 $i$ 阶段。* 到此为止，对一切长度小于某个 $\ell$ 的串，是否属于 $B$ 已经决定，且尚无更长的串被放入 $B$。取 $n \ge \ell$ 使 $2^n > n^i$。在 $1^n$ 上运行 $M_i$：对每个查询 $x$，若 $\lvert x\rvert < \ell$ 就按已经做过的决定回答，否则回答"否"——并宣布所有这些长度 $\ge \ell$ 的被查询串都在 $B$ 之外。$M_i$ 在 $n^i$ 步内停机。

- 若 $M_i$ 接受 $1^n$，就不把任何长度 $n$ 的串放进 $B$。于是 $1^n \notin L_B$，但 $M_i$ 接受它。
- 若 $M_i$ 拒绝 $1^n$，它查询的串至多 $n^i < 2^n$ 个，于是存在某个长度 $n$ 的串 $y$ 未被查询；把 $y$ 放入 $B$。于是 $1^n \in L_B$，但 $M_i$ 拒绝它。

两种情形下，都把长度小于 $\max(n + 1, m)$ 的一切其余未决串——其中 $m$ 大于 $M_i$ 查询过的每个串的长度——宣布在 $B$ 之外，并取 $\ell = \max(n + 1, m)$ 继续。后续阶段从不改变长度小于 $\ell$ 的串的隶属关系，而本阶段唯一加入的串 $y$ 未被查询过；所以 $M_i$ 在 $1^n$ 上关于最终预言机 $B$ 的运行恰是我们模拟的那次运行。于是每台 $M_i^B$ 都在 $1^n$ 上出错，故 $L_B \notin \mathsf{P}^B$。
:::

::: example 构造的一个阶段 {#ex-bgs-stage}
假设 $M_3$ 是预言机机器"在输入 $1^n$ 上查询 $0^n$ 和 $1^n$；当且仅当至少一个回答为'是'时接受"（它远在 $n^3$ 步之内完成），且第 $3$ 阶段开始时 $\ell = 5$。执行这一阶段。
::: solution
我们需要 $n \ge 5$ 且 $2^n > n^3$。$n = 5$ 不行（$32 < 125$），$n = 9$ 也不行（$512 < 729$）；最小的取法是 $n = 10$（$1024 > 1000$）。在 $1^{10}$ 上运行 $M_3$：它查询 $0^{10}$ 和 $1^{10}$，两者长度都 $\ge \ell$ 且未决，于是都回答"否"并宣布在 $B$ 之外；$M_3$ 拒绝。既然它拒绝了，就把它没有查询过的某个长度 $10$ 的串放入 $B$，比如 $0^9 1$。于是 $B$ 含有一个长度 $10$ 的串，$1^{10} \in L_B$，但 $M_3^B$（它的两个查询在最终的 $B$ 之下仍然得到"否"）拒绝 $1^{10}$。宣布长度 $5$ 到 $10$ 的所有其他串在 $B$ 之外，取 $\ell = 11$ 继续。一台查询了长度 $n$ 的*每个*串的机器是骗不过去的；这正是为什么要选 $n$ 满足 $2^n > n^i$——串的个数多于多项式时间机器所能问过的个数。
:::
:::

其中的教益就是**相对化障碍**：任何对每个预言机都同样有效的证明技术都不可能解决 $\mathsf{P}$ 对 $\mathsf{NP}$，因为答案在不同的预言机下不同。纯粹的对角化与模拟论证都是相对化的，所以要把 $\mathsf{P}$ 与 $\mathsf{NP}$ 分开，必须以预言机模型所不允许的方式考察计算的内部。后来的两个障碍又排除了另外几大系列技术：**自然证明**（natural proofs，拉兹博罗夫（Razborov）与鲁迪奇（Rudich），1997）——在强伪随机函数存在的前提下，它限制了用于电路的组合下界方法；以及**代数化**（algebrisation，阿伦森（Aaronson）与维格德森（Wigderson），2009）——它涵盖了 $\mathsf{IP} = \mathsf{PSPACE}$ 这类结果背后的代数方法。任何 $\mathsf{P} \ne \mathsf{NP}$ 的证明都必须同时避开这三个障碍。

::: quiz
下列哪些说法是真的？
- [x] 对每个预言机 $B$，$\mathsf{P}^B \ne \mathsf{EXP}^B$。
- [ ] 由于存在使 $\mathsf{P}^A = \mathsf{NP}^A$ 的预言机 $A$，$\mathsf{P} = \mathsf{NP}$ 就与所有已知事实相容，所以 $\mathsf{P} = \mathsf{NP}$ 很可能是真的。
- [x] $\mathsf{P} \ne \mathsf{NP}$ 的证明不能只由一个相对化的模拟加对角化的论证构成。
- [x] $\mathsf{NP} \subseteq \mathsf{P}^{\mathit{SAT}}$。
::: solution
时间层次定理的证明是相对化的，这给出第一条。预言机结果对真实问题的走向什么也没说——两种答案都有相应的预言机——所以第二条是不相干的推论。第三条就是相对化障碍。第四条：一台多项式时间的机器可以向 $\mathit{SAT}$ 预言机询问其输入的库克–列文公式。
:::
:::

## 多项式层次

一些自然问题似乎恰好位于 $\mathsf{NP}$ 与 $\mathsf{coNP}$ 之上。一个布尔公式 $\varphi$ 是否**极小**——不存在比它更短的等价公式？"属于"该问题的判据是：*对每个*更短的公式 $\psi$，*存在*一个赋值使 $\psi$ 与 $\varphi$ 不同。这是一个 $\forall\exists$ 语句，无论 $\mathsf{NP}$ 证书还是 $\mathsf{coNP}$ 证书似乎都无法刻画它。

::: definition 多项式层次 {#def-ph}
对 $k \ge 1$，若存在多项式 $p$ 与多项式时间算法 $V$ 使得
$$
w \in L \iff \exists y_1\, \forall y_2\, \exists y_3 \cdots Q_k y_k\ \ V \text{ 接受 } \langle w, y_1, \dots, y_k\rangle,
$$ {#eq-sigma-k}
其中每个 $y_i$ 遍历长度至多 $p(\lvert w\rvert)$ 的串、$k$ 个量词交替出现且以 $\exists$ 开头（$Q_k$ 当 $k$ 为奇数时是 $\exists$，为偶数时是 $\forall$），则称语言 $L$ 属于 $\mathbf{\Sigma}_k^{\mathsf{p}}$。$\mathbf{\Pi}_k^{\mathsf{p}}$ 用同样的方式定义，只是量词以 $\forall$ 开头；等价地 $\Pi_k^{\mathsf{p}} = \{L : \overline{L} \in \Sigma_k^{\mathsf{p}}\}$。规定 $\Sigma_0^{\mathsf{p}} = \Pi_0^{\mathsf{p}} = \mathsf{P}$。**多项式层次**是 $\mathsf{PH} = \bigcup_k \Sigma_k^{\mathsf{p}}$。
:::

于是 $\Sigma_1^{\mathsf{p}} = \mathsf{NP}$ 且 $\Pi_1^{\mathsf{p}} = \mathsf{coNP}$（[[complexity/np#def-conp]]）。$\mathit{MIN\text{-}FORMULA}$ 属于 $\Pi_2^{\mathsf{p}}$；问题"给定 DNF 公式 $\varphi$ 与 $k$，是否存在一个规模至多 $k$、与 $\varphi$ 等价的 DNF 公式？"是 $\Sigma_2^{\mathsf{p}}$ 完全的（乌曼斯（Umans），2001）。标准的完全问题是量词交替次数有界的量化公式：$\Sigma_k\mathit{SAT}$——即公式 $\exists \vec x_1\, \forall \vec x_2 \cdots Q_k \vec x_k\ \psi$ 为真——对每个 $k$ 都是 $\Sigma_k^{\mathsf{p}}$ 完全的（斯托克迈尔（Stockmeyer）与拉斯霍尔（Wrathall），1976）——这是 [[complexity/space-complexity#thm-tqbf]] 的有界交替版本。

::: theorem 多项式层次的结构 {#thm-ph}
1. $\Sigma_k^{\mathsf{p}} \cup \Pi_k^{\mathsf{p}} \subseteq \Sigma_{k+1}^{\mathsf{p}} \cap \Pi_{k+1}^{\mathsf{p}}$。
2. $\mathsf{PH} \subseteq \mathsf{PSPACE}$。
3. $\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$，且一般地 $\Sigma_{k+1}^{\mathsf{p}} = \mathsf{NP}^{\Sigma_k^{\mathsf{p}}}$。
:::

::: proof
(1) 在量词块的最前或最后添加一个 $V$ 会忽略的哑量词变元。

(2) 给定 [[#eq-sigma-k]]，一台多项式空间的机器递归地求值这些量词：对 $\exists y_1$，它对所有长度至多 $p(n)$ 的串 $y_1$ 循环，每个都复用同一份空间，如此下去，如同 $\mathit{TQBF}$ 的求值。深度是常数 $k$，每层存一个长度 $p(n)$ 的串。

(3) 我们证明 $\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$；一般情形是同样的论证升高一层。*($\subseteq$)* 设 $w \in L \iff \exists y\, \forall z\ V(w, y, z)$。语言 $C = \{\langle w, y\rangle : \exists z\ \lnot V(w, y, z)\}$ 属于 $\mathsf{NP}$。一台以 $C$ 为预言机的预言机机器猜 $y$，询问 $\langle w, y\rangle \in C$ 是否成立，当且仅当回答为"否"时接受。*($\supseteq$)* 设 $N$ 是带预言机 $C \in \mathsf{NP}$ 的多项式时间非确定性机器，$V_C$ 是 $C$ 的验证器。则 $w \in L(N^C)$ 当且仅当存在 $N$ 的一个选择序列 $r$、对它各次查询的回答 $a_1, \dots, a_q$、以及对回答"是"的那些查询的证书 $c_i$，使得：$N$ 在 $w$ 上以选择 $r$ 与回答 $a$ 的运行接受且提出查询 $x_1, \dots, x_q$；只要 $a_i = $ 是，$V_C$ 就接受 $\langle x_i, c_i\rangle$；并且**对所有**串 $c'_j$，只要 $a_j = $ 否，$V_C$ 就拒绝 $\langle x_j, c'_j\rangle$。这是一个含量词串长度为多项式、检验为多项式时间的 $\exists\forall$ 语句：$L \in \Sigma_2^{\mathsf{p}}$。
:::

::: example 带 NP 预言机的 NP 机器 {#ex-min-formula}
证明 $\mathit{MIN\text{-}FORMULA}$ 的补——即存在严格更短的等价公式的那些公式 $\varphi$——属于 $\mathsf{NP}^{\mathit{SAT}}$，并写出对应的 $\Sigma_2^{\mathsf{p}}$ 定义。
::: solution
预言机机器在输入 $\varphi$ 上：非确定性地猜一个同变元集上、满足 $\lvert\psi\rvert < \lvert\varphi\rvert$ 的公式 $\psi$；构造公式 $\psi \oplus \varphi$（恰在两者取值不同处为真，规模 $O(\lvert\varphi\rvert)$）；问 $\mathit{SAT}$ 预言机它是否可满足；当且仅当回答为**否**、即 $\psi$ 与 $\varphi$ 处处相同时接受。猜测是那个 $\exists$，而预言机一步回答了 $\forall$ 问题"它们在每个赋值上都一致吗？"。写成量词公式：$\varphi \notin \mathit{MIN\text{-}FORMULA} \iff \exists \psi\ (\lvert\psi\rvert < \lvert\varphi\rvert)\ \forall a\ \psi(a) = \varphi(a)$，一个 $\Sigma_2^{\mathsf{p}}$ 语句。没有预言机时，检验猜出的 $\psi$ 是一个 $\mathsf{coNP}$ 问题，没有人知道它有多项式时间的验证器。
:::
:::

::: theorem 层次的坍缩 {#thm-ph-collapse}
若对某个 $k \ge 1$ 有 $\Sigma_k^{\mathsf{p}} = \Pi_k^{\mathsf{p}}$，则 $\mathsf{PH} = \Sigma_k^{\mathsf{p}}$。特别地，若 $\mathsf{P} = \mathsf{NP}$ 则 $\mathsf{PH} = \mathsf{P}$；若 $\mathsf{NP} = \mathsf{coNP}$ 则 $\mathsf{PH} = \mathsf{NP}$。
:::

::: proof
我们证明 $\Sigma_{k+1}^{\mathsf{p}} \subseteq \Sigma_k^{\mathsf{p}}$；于是补类 $\Pi_{k+1}^{\mathsf{p}}$ 含于 $\Pi_k^{\mathsf{p}} = \Sigma_k^{\mathsf{p}}$，从而第 $k + 1$ 层等于第 $k$ 层，再由归纳每一更高层也如此。设 $L \in \Sigma_{k+1}^{\mathsf{p}}$：$w \in L \iff \exists y_1\ [\langle w, y_1\rangle \in L']$，其中 $L'$ 由剩下的 $k$ 个量词 $\forall y_2 \cdots$ 定义，故 $L' \in \Pi_k^{\mathsf{p}}$。由假设 $L' \in \Sigma_k^{\mathsf{p}}$：$\langle w, y_1\rangle \in L' \iff \exists z_1\, \forall z_2 \cdots\ V'(\dots)$。于是
$$
w \in L \iff \exists (y_1, z_1)\ \forall z_2 \cdots\ V'(\langle w, y_1\rangle, z_1, z_2, \dots),
$$
即把相邻的两个存在量词合并为一个对有序对的量词。这是 $k$ 个以 $\exists$ 开头的交替量词，所以 $L \in \Sigma_k^{\mathsf{p}}$。特殊情形：$\mathsf{P} = \mathsf{NP}$ 给出 $\Sigma_1^{\mathsf{p}} = \mathsf{NP} = \mathsf{P}$，它对补运算封闭，故 $\Sigma_1^{\mathsf{p}} = \Pi_1^{\mathsf{p}}$ 且 $\mathsf{PH} = \mathsf{NP} = \mathsf{P}$；$\mathsf{NP} = \mathsf{coNP}$ 是 $k = 1$ 的情形。
:::

人们普遍相信该层次是**无限的**——它的所有层两两不同——而"否则多项式层次就会坍缩"已成为一种标准的证据形式。例如，卡普–利普顿（Karp–Lipton）定理（1980）说，若 $\mathit{SAT}$ 有多项式规模的电路，则 $\mathsf{PH} = \Sigma_2^{\mathsf{p}}$；这被当作 $\mathsf{NP}$ 完全问题没有小电路的证据（[[complexity/randomised-complexity]]）。截至 2026 年，$\mathsf{PH}$ 是否无限尚不可知，甚至 $\mathsf{P} \ne \mathsf{PH}$ 也未知——后者与 $\mathsf{P} \ne \mathsf{NP}$ 等价。$\mathsf{PH} = \mathsf{PSPACE}$ 是否成立也未决；若成立，层次就会坍缩，因为 $\mathsf{PSPACE}$ 有一个完全问题，而它必须落在某一层固定的 $\Sigma_k^{\mathsf{p}}$ 之中。

::: example 把问题放入层次 {#ex-ph}
把每个问题放到你能论证的 $\mathsf{PH}$ 的最低层。(a) 给定图 $G$ 与 $k$，$G$ 的最大团的大小是否**恰好**为 $k$？(b) 给定一个变量分为两组、含 $x, y$ 的公式 $\varphi(x, y)$，是否存在 $x$ 使 $\varphi(x, y)$ 对所有 $y$ 成立？(c) 给定公式 $\varphi$ 与 $k$，是否存在一个规模至多 $k$、与 $\varphi$ 等价的公式？
::: solution
(a) "存在大小为 $k$ 的团"属于 $\mathsf{NP}$，"不存在大小为 $(k+1)$ 的团"属于 $\mathsf{coNP}$；两者的交属于类 $\mathsf{DP} = \{L_1 \cap L_2 : L_1 \in \mathsf{NP}, L_2 \in \mathsf{coNP}\}$，它位于 $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ 之内（也在 $\mathsf{P}^{\mathsf{NP}}$ 之内：两次预言机查询）。写成量词：$\exists S\, \forall T$（$S$ 是一个大小为 $k$ 的团，且 $T$ 不是一个大小为 $(k+1)$ 的团）—— $\Sigma_2^{\mathsf{p}}$。
(b) $\exists x\, \forall y\ \varphi(x, y)$：这就是 $\Sigma_2\mathit{SAT}$ 本身，$\Sigma_2^{\mathsf{p}}$ 完全的。
(c) $\exists \psi\ (\lvert\psi\rvert \le k)\ \forall a\ \psi(a) = \varphi(a)$：属于 $\Sigma_2^{\mathsf{p}}$。（正文中的问题"$\varphi$ 是否极小"是 $\forall\exists$，即互补形式，属于 $\Pi_2^{\mathsf{p}}$。）
:::
:::

::: history
尤里斯·哈特尼斯（Juris Hartmanis）与理查德·斯特恩斯（Richard Stearns）在 "On the computational complexity of algorithms"（1965）中证明了时间层次定理；同年，理查德·斯特恩斯、尤里斯·哈特尼斯与菲利普·刘易斯（Philip Lewis）证明了空间层次定理；弗雷德里克·亨尼（Frederick Hennie）与斯特恩斯的双带模拟（1966）把时间版本锐化成本文给出的形式。史蒂芬·库克（Stephen Cook）于 1972 年证明了非确定性时间层次定理，后经乔尔·西弗拉斯（Joel Seiferas）、迈克尔·费希尔（Michael Fischer）与阿尔伯特·迈耶（Albert Meyer）（1978）以及斯坦尼斯拉夫·扎克（Stanislav Žák）（1983）精化。艾伦·博罗金（Allan Borodin）的空隙定理发表于 1972 年。西奥多·贝克（Theodore Baker）、约翰·吉尔（John Gill）与罗伯特·索洛韦（Robert Solovay）于 1975 年发表了 "Relativizations of the P =? NP question"。阿尔伯特·迈耶与拉里·斯托克迈尔（Larry Stockmeyer）于 1972 年定义了多项式层次，斯托克迈尔与塞利娅·拉斯霍尔（Celia Wrathall）在 1976 年发展了它。亚历山大·拉兹博罗夫（Alexander Razborov）与史蒂文·鲁迪奇（Steven Rudich）的自然证明障碍于 1994 年提出、1997 年发表（2007 年获哥德尔奖）；斯科特·阿伦森（Scott Aaronson）与阿维·维格德森（Avi Wigderson）的代数化障碍于 2008 年提出、2009 年发表。
:::

## 后续内容

随机化计算在 [[complexity/randomised-complexity]] 中恰好落在多项式层次内部：$\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$，可用与上面类似的量词论证证明。层次定理也是**精细复杂性**的出发点：在 [[complexity/coping-with-hardness]] 的强指数时间假设这类猜想之下，它追问 $\mathsf{P}$ 内部的精确指数（编辑距离能在 $n^{2 - \varepsilon}$ 时间内求解吗？）。

::: summary
- **可构造**的界能在界自身之内算出（[[#def-constructible]]）；一切常用函数都可构造，而没有可构造性时空隙定理成立（[[#warn-gap]]）。
- **空间层次**：对空间可构造的 $f$，$\mathsf{SPACE}(o(f)) \subsetneq \mathsf{SPACE}(f)$（[[#thm-space-hierarchy]]）；配合萨维奇定理得 $\mathsf{NL} \subsetneq \mathsf{PSPACE}$。
- **时间层次**：对时间可构造的 $t$，$\mathsf{TIME}(o(t/\log t)) \subsetneq \mathsf{TIME}(t)$（[[#thm-time-hierarchy]]）；于是 $\mathsf{P} \subsetneq \mathsf{EXP}$，且 $\mathsf{EXP}$ 完全问题可证明不属于 $\mathsf{P}$。
- 两个证明都是带时钟、带填充输入的对角化；它们都是相对化的。**贝克–吉尔–索洛韦**：对 $A = \mathit{TQBF}$ 有 $\mathsf{P}^A = \mathsf{NP}^A$，而对某个构造出的 $B$ 有 $\mathsf{P}^B \ne \mathsf{NP}^B$（[[#thm-bgs]]），所以相对化的技术无法解决 $\mathsf{P}$ 对 $\mathsf{NP}$。
- **多项式层次**：$\Sigma_k^{\mathsf{p}}$ 由 $k$ 个交替的、多项式有界的量词定义（[[#def-ph]]）；$\Sigma_1^{\mathsf{p}} = \mathsf{NP}$，$\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$，且 $\mathsf{PH} \subseteq \mathsf{PSPACE}$（[[#thm-ph]]）。
- 若 $\Sigma_k^{\mathsf{p}} = \Pi_k^{\mathsf{p}}$，层次坍缩到第 $k$ 层（[[#thm-ph-collapse]]）；人们相信它是无限的，截至 2026 年这仍是未决问题。
:::

## 习题

::: exercise 数一数分离 {level=1 check="2"}
对下列各对，[[#thm-time-hierarchy]] 能证明 $\mathsf{TIME}(f) \subsetneq \mathsf{TIME}(g)$ 的有几对：(i) $f = n$，$g = n^{1.5}$；(ii) $f = n^2$，$g = n^2 \log n$；(iii) $f = 2^n$，$g = 2^{2n}$；(iv) $f = n \log n$，$g = n \log^2 n$？（填写数字。）
::: solution
定理需要 $f = o(g/\log g)$。(i) $g/\log g = n^{1.5}/(1.5\log n)$，且 $n = o(n^{1.5}/\log n)$：能。(ii) $g/\log g = n^2\log n/(2\log n + \log\log n) = \Theta(n^2)$：$n^2$ 不是 $o(n^2)$，不能。(iii) $g/\log g = 2^{2n}/(2n)$，且 $2^n = o(2^{2n}/n)$：能。(iv) $g/\log g = \Theta(n\log n)$：不能。共两对。
:::
:::

::: exercise 严格包含在哪里？ {level=1}
解释为什么 $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE}$ 中至少有一个包含是严格的，以及为什么该论证没有告诉我们是哪一个。
::: solution
由 [[#cor-space-hierarchy]]，$\mathsf{L} \subsetneq \mathsf{PSPACE}$。若四个包含全是等号，则 $\mathsf{L}$ 将等于 $\mathsf{PSPACE}$。这个论证是对这条链的计数论证：它证明了两端不同，但要分开任何具体的一对（比如 $\mathsf{P}$ 与 $\mathsf{PSPACE}$）就需要比较时间与空间、或确定性与非确定性，而这正是层次定理做不到的。
:::
:::

::: exercise 层次的各层 {level=1}
给出每个问题已知所属的 $\mathsf{PH}$ 的最低层：(a) $\mathit{TAUT}$；(b) 给定 $\psi$，"公式 $\exists x\, \forall y\, \exists z\ \psi$ 是否为真？"；(c) $\mathit{TQBF}$；(d) $\mathit{PATH}$。
::: solution
(a) $\Pi_1^{\mathsf{p}} = \mathsf{coNP}$。(b) $\Sigma_3^{\mathsf{p}}$（以 $\exists$ 开头的三个交替量词块）。(c) $\mathit{TQBF}$ 的交替次数无界；它是 $\mathsf{PSPACE}$ 完全的，只有当 $\mathsf{PH} = \mathsf{PSPACE}$ 时它才属于 $\mathsf{PH}$，而那将使层次坍缩。(d) $\Sigma_0^{\mathsf{p}} = \mathsf{P}$（事实上在 $\mathsf{NL}$ 中）。
:::
:::

::: exercise 若 P = NP {level=2}
对 $k$ 归纳直接证明：若 $\mathsf{P} = \mathsf{NP}$，则对每个 $k$ 都有 $\Sigma_k^{\mathsf{p}} = \mathsf{P}$。
::: solution
$k = 0$ 按定义成立。设 $\Sigma_k^{\mathsf{p}} = \mathsf{P}$，于是 $\Pi_k^{\mathsf{p}} = \mathsf{P}$ 也成立（$\mathsf{P}$ 在补运算下封闭）。对 $L \in \Sigma_{k+1}^{\mathsf{p}}$，$w \in L \iff \exists y\ [\langle w, y\rangle \in L']$，其中 $L' \in \Pi_k^{\mathsf{p}} = \mathsf{P}$ 且 $\lvert y\rvert \le p(\lvert w\rvert)$。于是 $L$ 有多项式时间的验证器"判定 $\langle w, y\rangle \in L'$"，故 $L \in \mathsf{NP} = \mathsf{P}$。所以 $\Sigma_{k+1}^{\mathsf{p}} = \mathsf{P}$。
:::
:::

::: exercise 带 NP 预言机的 P {level=2}
证明 $\mathsf{P}^{\mathsf{NP}}$ 在补运算下封闭、包含 $\mathsf{NP} \cup \mathsf{coNP}$，且 $\mathsf{P}^{\mathsf{NP}} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$。
::: solution
交换一台确定性预言机机器的接受状态与拒绝状态，就用同一个预言机判定了补语言。对 $L \in \mathsf{NP}$，$L \le_p \mathit{SAT}$，于是机器先算归约、再提一次查询；对 $\mathsf{coNP}$，把答案取反。$\mathsf{P}^{\mathsf{NP}} \subseteq \mathsf{NP}^{\mathsf{NP}} = \Sigma_2^{\mathsf{p}}$（一台确定性机器是一种特殊的非确定性机器）；由补运算下的封闭性，$\mathsf{P}^{\mathsf{NP}} \subseteq \mathrm{co}\Sigma_2^{\mathsf{p}} = \Pi_2^{\mathsf{p}}$ 也成立。
:::
:::

::: exercise 一个有界停机问题 {level=2}
令 $\mathit{BH}_{\exp} = \{\langle M, w, t\rangle : M$ 在 $t$ 步内接受 $w\}$，其中 $t$ 以**二进制**书写。证明它是 $\mathsf{EXP}$ 完全的，并推出它不属于 $\mathsf{P}$。
::: solution
*属于 $\mathsf{EXP}$：* 在 $w$ 上模拟 $M$ 共 $t \le 2^{\lvert t\rvert}$ 步；用高效模拟，时间关于 $t$ 与 $\lvert\langle M\rangle\rvert$ 是多项式的，即关于输入长度 $n$ 为 $2^{O(n)}$。*难度：* 若 $A \in \mathsf{EXP}$ 由 $M_A$ 以时间 $2^{n^k}$ 判定，把 $w$ 映为 $\langle M_A, w, 2^{\lvert w\rvert^k}\rangle$；数 $2^{\lvert w\rvert^k}$ 有 $\lvert w\rvert^k + 1$ 位，所以该映射可在多项式时间内计算。由 [[#cor-time-hierarchy]] (3)，$\mathit{BH}_{\exp} \notin \mathsf{P}$。（对照 [[complexity/np-completeness]] 中的一元版本：它对非确定性机器是 $\mathsf{NP}$ 完全的，对确定性机器则是 $\mathsf{P}$ 完全的。）
:::
:::

::: exercise 对数之下的空间层次 {level=3}
为什么 [[#thm-space-hierarchy]] 要求 $f(n) \ge \log n$？证明 $\mathsf{SPACE}(1)$ 恰是正则语言类，并讨论 $\mathsf{SPACE}(1) \subsetneq \mathsf{SPACE}(\log n)$ 是否成立。
::: solution
证明把格局数成 $2^{O(f(n))}$，这要求把输入读头位置（$\log n$ 位）吸收进 $O(f(n))$；当 $f(n) < \log n$ 时，机器甚至存不下一个输入位置，而第 3 步的步数计数器就需要约 $\log n$ 位。事实上 $\mathsf{SPACE}(o(\log\log n))$ 就等于 $\mathsf{SPACE}(1)$（斯特恩斯、哈特尼斯与刘易斯，1965），所以在 $\log\log n$ 之下存在真正的空隙。$\mathsf{SPACE}(1)$：工作格数为常数的机器只有常数多个工作格局，可以并入状态；于是得到一台双向有限自动机，而双向 DFA 识别的恰是正则语言（拉宾（Rabin）–斯科特（Scott）、谢泼德森（Shepherdson），1959）。由于 $\{0^k1^k\} \in \mathsf{L}$（[[complexity/space-complexity#ex-sat-space]]）不是正则的，$\mathsf{SPACE}(1) \subsetneq \mathsf{SPACE}(\log n)$，尽管层次定理本身在这一层并不适用。
:::
:::

::: exercise 使 P = NP = PSPACE 的预言机 {level=3}
令 $A = \mathit{TQBF}$。证明同样有 $\mathsf{PSPACE}^A = \mathsf{P}^A$，并解释为什么这意味着相对化的证明也无法证明 $\mathsf{P} \ne \mathsf{PSPACE}$。空间层次定理是否相对化？这与前面相容吗？
::: solution
一台以 $\mathit{TQBF}$ 为预言机的多项式空间机器提出的查询长度是多项式的，而它每一个都能用多项式空间亲自回答；于是由 [[#thm-bgs]] 的证明，$\mathsf{PSPACE}^A = \mathsf{PSPACE} = \mathsf{P}^A$。因此任何 $\mathsf{P} \ne \mathsf{PSPACE}$ 的相对化证明也会证明 $\mathsf{P}^A \ne \mathsf{PSPACE}^A$，而后者是假的。若预言机机器的查询带计入空间（一个标准约定），空间层次定理就是相对化的，于是 $\mathsf{L}^A \subsetneq \mathsf{PSPACE}^A$。这是相容的：当 $A = \mathit{TQBF}$ 时，$\mathsf{L}^A$ 是一个很小的类（对数空间的机器只能写短的查询），而 $\mathsf{P}^A = \mathsf{PSPACE}^A$；层次定理由始至终分离的是空间与空间，从不分离时间与空间。
:::
:::
