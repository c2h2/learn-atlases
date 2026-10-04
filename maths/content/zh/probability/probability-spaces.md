一个房间里有23个人。其中有两人生日相同的可能性是否大于一半？大多数人的直觉回答是否定的：可能的生日有365个，而人只有23个。这种直觉是错的。有人生日相同的概率约为$0.507$；如果有50个人，这个概率约为$0.970$。像这样直觉不可靠、而仔细推理却能给出确定答案的问题，正是概率论的用武之地。

要对随机性进行严谨的推理，我们需要一种精确的语言。“事件”究竟是什么？赋予它一个概率是什么意思？这些数又必须遵守哪些规则？本章用安德烈·柯尔莫哥洛夫（Andrey Kolmogorov）于1933年提出的框架来回答这些问题，整个现代概率论都建立在这一框架之上。一个**概率空间**由三部分组成：所有可能结果的集合、一族事件，以及为每个事件指定一个概率的规则。我们将从三条简短的公理出发，推导出关于补集和并集的熟悉法则、容斥公式和概率的连续性，然后把它们用于结果等可能的问题，生日问题就是其中之一。

## 结果与事件 {#outcomes-events}

**随机试验**是指结果无法事先确定的任何过程：抛一枚硬币，掷两颗骰子，测量一只灯泡的寿命，询问一位随机选出的选民将如何投票。我们并不试图预测结果，而是列出**可能**发生的一切。

::: definition 样本空间与事件 {#def-sample-space}
试验的**样本空间**是一个集合$\Omega$，它的元素称为**结果**（也称样本点），用来描述试验可能出现的结果，并且试验的每一次实施都恰好产生一个结果$\omega \in \Omega$。**事件**是一个子集$A \subseteq \Omega$。若结果$\omega$属于$A$，就称事件$A$**发生**。
:::

下面是一些例子，按样本空间从小到大的顺序排列：

- 抛一次硬币：$\Omega = \{H, T\}$（$H$表示正面，$T$表示反面）。
- 掷一颗红骰子和一颗蓝骰子：$\Omega = \{(i, j) : 1 \le i, j \le 6\}$，共有$36$个结果。事件“点数之和为$7$”就是$\{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\}$。
- 反复抛硬币直到第一次出现正面，并记录抛掷的次数：$\Omega = \{1, 2, 3, \ldots\}$，这是一个可数无限集。
- 以小时为单位测量一只灯泡的寿命：$\Omega = [0, \infty)$，这是一个不可数集。

选择$\Omega$是建模的一部分。对于两颗骰子，我们也可以取$\Omega = \{2, 3, \ldots, 12\}$，即所有可能的点数和；但这种较粗的描述会丢失信息（我们无法再问红骰子是否掷出了六点），而且我们将会看到，它的各个结果并不是等可能的。好的样本空间应当记录足够多的细节，使我们关心的每个事件是否发生都能确定下来。

由于事件就是集合，集合论中的运算（[[proofs/sets]]）就成为事件之间的逻辑运算：

| 集合记号 | 对事件而言的含义 |
|---|---|
| $\Omega$ | 必然事件 |
| $\varnothing$ | 不可能事件 |
| $A^c = \Omega \setminus A$ | $A$不发生 |
| $A \cup B$ | $A$或$B$发生（或两者都发生） |
| $A \cap B$ | $A$与$B$都发生 |
| $A \setminus B = A \cap B^c$ | $A$发生但$B$不发生 |
| $A \subseteq B$ | 只要$A$发生，$B$就发生 |
| $A \cap B = \varnothing$ | $A$与$B$**互斥**（不相交） |

对无穷多个事件也是如此：$\bigcup_n A_n$是“至少有一个$A_n$发生”这一事件，$\bigcap_n A_n$是“所有$A_n$都发生”这一事件。德摩根（De Morgan）律$\bigl(\bigcup_n A_n\bigr)^c = \bigcap_n A_n^c$与$\bigl(\bigcap_n A_n\bigr)^c = \bigcup_n A_n^c$说的是：“并非至少有一个发生”就是“一个也不发生”，“并非全都发生”就是“至少有一个不发生”。这两条定律经常用到，因为一个复杂事件的补往往要简单得多。

::: widget venn
sets: 2
expr: (A | B)'
caption: 阴影区域是$(A \cup B)^c$，即事件“$A$与$B$都不发生”。输入`A' & B'`，阴影仍是同一区域：这就是德摩根律。再试试`(A - B) | (B - A)`，即“$A$与$B$中恰有一个发生”这一事件。你也可以点击各个区域给它们加上阴影，图形会找出与之相符的表达式。
:::

::: quiz
下列哪些表示事件“$A$与$B$中恰有一个发生”？（正确答案可能不止一个。）
- [x] $(A \cap B^c) \cup (A^c \cap B)$
- [ ] $A \cup B$
- [x] $(A \cup B) \setminus (A \cap B)$
- [ ] $A^c \cup B^c$
::: solution
“恰有一个”的意思是“$A$发生而$B$不发生，或$B$发生而$A$不发生”，这就是第一个集合。等价地说，它是“至少有一个发生，但并非两个都发生”，即第三个集合。并集$A\cup B$还包含两者都发生的结果；而$A^c \cup B^c = (A\cap B)^c$的意思是“并非两者都发生”，其中包括两者都不发生的结果。
:::
:::

## 柯尔莫哥洛夫公理 {#axioms}

概率应当具有哪些性质？设想把一个试验重复$N$次，并数出事件$A$发生的次数$N_A$。**相对频率**$N_A/N$介于$0$与$1$之间；对必然事件$\Omega$，它等于$1$；如果$A$与$B$互斥，那么$N_{A \cup B} = N_A + N_B$，所以相对频率是可加的。不管概率“是”什么，它都应当具有这些性质。柯尔莫哥洛夫（Kolmogorov）的想法是把这些性质取作公理，并把可加性从两个事件加强到由可数个事件组成的序列。

不过，我们首先必须确定$\Omega$的哪些子集算作事件。当$\Omega$有限或可数时，我们可以允许每个子集都是事件，而且我们也正是这样做的。当$\Omega$不可数时，例如区间$[0,1]$，结果表明不可能相容地给每个子集都指定一个“类似长度”的概率（经典的反例是维塔利（Vitali）集，见[[measure-theory/lebesgue-measure]]一章中的讨论）。解决的办法是只考虑一族子集，它对一切实际用途都足够大，并且对我们所需的运算封闭。

::: definition 事件域（σ-代数） {#def-sigma-algebra}
若由$\Omega$的子集构成的集族$\mathcal{F}$满足下列条件，则称$\mathcal{F}$为$\Omega$上的**σ-代数**：

1. $\Omega \in \mathcal{F}$；
2. 若$A \in \mathcal{F}$，则$A^c \in \mathcal{F}$；
3. 若$A_1, A_2, \ldots \in \mathcal{F}$，则$\bigcup_{n=1}^\infty A_n \in \mathcal{F}$。

在概率论中，$\mathcal{F}$的成员就是**事件**，$\mathcal{F}$也称为**事件域**。
:::

由此立即得到几条封闭性质。由于$\Omega \in \mathcal{F}$，它的补集$\varnothing$也属于$\mathcal{F}$。在(3)中对$n > k$取$A_n = \varnothing$，可知有限并$A_1 \cup \dots \cup A_k$是事件。由德摩根律，$\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c$，所以可数交也是事件，$A \setminus B = A \cap B^c$同样是事件。简而言之：由可数个事件经通常的运算构造出来的任何集合仍是事件。对有限或可数的$\Omega$，**幂集**$2^\Omega$（全体子集）是一个σ-代数，我们用的就是它。

::: definition 概率测度与概率空间 {#def-prob-space}
设$\mathcal{F}$是$\Omega$上的σ-代数。$(\Omega, \mathcal{F})$上的**概率测度**是满足下列**柯尔莫哥洛夫公理**的函数$\Prob\colon \mathcal{F} \to \R$：

1. （非负性）对每个$A \in \mathcal{F}$，$\Prob(A) \ge 0$；
2. （规范性）$\Prob(\Omega) = 1$；
3. （可数可加性）若$A_1, A_2, \ldots \in \mathcal{F}$两两不相交，即当$i \neq j$时$A_i \cap A_j = \varnothing$，则

$$
\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \sum_{n=1}^\infty \Prob(A_n).
$$ {#eq-countable-additivity}

三元组$(\Omega, \mathcal{F}, \Prob)$称为**概率空间**。
:::

::: remark 公理没有告诉我们什么
公理并没有告诉我们概率**意味着**什么。概率可以是长期频率（骰子掷出六点的机会），可以是对称性的推论（在一副洗匀的牌中，52张牌中的每一张位于最上面的可能性都相同），也可以是信念程度（某个特定被告有罪的概率）。公理是所有这些解释都必须遵守的规则，由公理发展出来的数学对它们全都适用。“信念程度”这一解释是[[statistics/bayesian]]的基础。
:::

构造概率空间最简单的方法是给每个结果赋予一个权重。

::: proposition 离散概率空间 {#prop-discrete}
设$\Omega$有限或可数无限，$p\colon \Omega \to [0, \infty)$满足$\sum_{\omega \in \Omega} p(\omega) = 1$。则

$$
\Prob(A) = \sum_{\omega \in A} p(\omega) \qquad (A \subseteq \Omega)
$$ {#eq-discrete}

定义了$(\Omega, 2^\Omega)$上的一个概率测度。反之，$(\Omega, 2^\Omega)$上的每个概率测度都具有这种形式，其中$p(\omega) = \Prob(\{\omega\})$。
:::

::: proof
[[#eq-discrete]]中的和的各项都非负，所以这些和有确定的意义（可能是无穷级数），并且其值与求和顺序无关（[[calculus-2/series]]）。显然$\Prob(A) \ge 0$且$\Prob(\Omega) = 1$。若$A_1, A_2, \ldots$两两不相交，则它们的并中的每个$\omega$恰好属于一个$A_n$；而非负项级数可以分组并逐组求和，所以

$$
\Prob\Bigl(\bigcup_n A_n\Bigr) = \sum_{\omega \in \bigcup_n A_n} p(\omega) = \sum_{n} \sum_{\omega \in A_n} p(\omega) = \sum_n \Prob(A_n).
$$

再证逆命题。设$\Prob$是$(\Omega, 2^\Omega)$上的任一概率测度，令$p(\omega) = \Prob(\{\omega\}) \ge 0$。每个$A \subseteq \Omega$都是单点集$\{\omega\}$（$\omega \in A$）的可数不交并，所以由可数可加性得$\Prob(A) = \sum_{\omega\in A} p(\omega)$；取$A = \Omega$即知各权重之和为$1$。
:::

例如，一颗灌了铅的骰子，六点出现的概率为$\tfrac14$，其余每一面出现的概率为$\tfrac{3}{20}$，这是一个合理的模型，因为$5 \cdot \tfrac{3}{20} + \tfrac14 = 1$；掷出偶数点的概率为$\tfrac{3}{20} + \tfrac{3}{20} + \tfrac{1}{4} = \tfrac{11}{20}$。

## 公理的推论 {#consequences}

关于概率的其他一切都由这三条公理推出。第一批推论包括你从中学起大概就一直在用的那些法则；现在的要点在于，它们都是**定理**。

::: theorem 基本性质 {#thm-basic}
设$(\Omega, \mathcal{F}, \Prob)$是概率空间，$A, B \in \mathcal{F}$。则

1. $\Prob(\varnothing) = 0$；
2. （有限可加性）若$A_1, \ldots, A_k$是两两不相交的事件，则$\Prob(A_1 \cup \dots \cup A_k) = \Prob(A_1) + \dots + \Prob(A_k)$；
3. （补集法则）$\Prob(A^c) = 1 - \Prob(A)$；
4. （单调性）若$A \subseteq B$，则$\Prob(B \setminus A) = \Prob(B) - \Prob(A)$，从而$\Prob(A) \le \Prob(B)$；
5. $0 \le \Prob(A) \le 1$；
6. （加法公式）$\Prob(A \cup B) = \Prob(A) + \Prob(B) - \Prob(A \cap B)$。
:::

::: proof
(1) 集合$A_n = \varnothing$（$n \ge 1$）两两不相交，其并为$\varnothing$，所以由可数可加性得$\Prob(\varnothing) = \sum_{n=1}^\infty \Prob(\varnothing)$。如果$\Prob(\varnothing)$为正，右端将为无穷大，所以$\Prob(\varnothing) = 0$。

(2) 对$n > k$令$A_n = \varnothing$。序列$A_1, A_2, \ldots$两两不相交，其并为$A_1 \cup \dots \cup A_k$，所以由可数可加性和(1)，这个并的概率为$\sum_{n=1}^k \Prob(A_n) + 0$。

(3) $\Omega = A \cup A^c$是不交并，所以由(2)得$1 = \Prob(\Omega) = \Prob(A) + \Prob(A^c)$。

(4) 若$A \subseteq B$，则$B = A \cup (B \setminus A)$是不交并，所以$\Prob(B) = \Prob(A) + \Prob(B \setminus A)$。移项即得所述公式；又因为$\Prob(B\setminus A) \ge 0$，所以$\Prob(A) \le \Prob(B)$。

(5) $\Prob(A) \ge 0$是公理，而由(4)得$\Prob(A) \le \Prob(\Omega) = 1$。

(6) 写出$A \cup B = A \cup \bigl(B \setminus (A \cap B)\bigr)$，这是一个不交并。先由(2)，再对$A \cap B \subseteq B$应用(4)，得

$$
\Prob(A \cup B) = \Prob(A) + \Prob\bigl(B \setminus (A\cap B)\bigr) = \Prob(A) + \Prob(B) - \Prob(A \cap B).
$$
:::

加法公式纠正了重复计数：$A \cap B$中的结果在$\Prob(A)$中计了一次，在$\Prob(B)$中又计了一次，所以要减去一份。

::: warning 把相互重叠的事件的概率直接相加
“掷两次骰子，至少出现一次六点的机会是$\tfrac16 + \tfrac16 = \tfrac13$”这种说法是错误的，因为事件“第一次掷出六点”与“第二次掷出六点”并不互斥。在$36$个等可能的结果下，加法公式给出$\tfrac{6}{36} + \tfrac{6}{36} - \tfrac{1}{36} = \tfrac{11}{36}$。补集法则能更快地得到同样的答案：没有六点的结果有$5^2 = 25$个，所以所求概率为$1 - \tfrac{25}{36} = \tfrac{11}{36}$。如果推广到掷六次，这种错误的推理会断言一定会出现六点。
:::

即使无法精确计算一个并的概率，我们也能给出它的上界。

::: theorem 布尔（Boole）不等式（并集界） {#thm-union-bound}
对任意事件$A_1, A_2, \ldots$，

$$
\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) \le \sum_{n=1}^\infty \Prob(A_n).
$$

对有限个事件，同样的结论成立。
:::

::: proof
去掉已经计入的部分，使事件变得互不相交：令$B_1 = A_1$，并对$n \ge 2$令$B_n = A_n \setminus (A_1 \cup \dots \cup A_{n-1})$。每个$B_n$都是事件，且$B_n \subseteq A_n$。各$B_n$两两不相交，因为$B_n$中的结果不属于任何排在它前面的$A_k$，从而也不属于任何排在它前面的$B_k$。并且$\bigcup_n B_n = \bigcup_n A_n$：若$\omega$属于某个$A_n$，取$n$为这样的指标中**最小**的一个，则$\omega \in B_n$。由可数可加性和单调性，

$$
\Prob\Bigl(\bigcup_n A_n\Bigr) = \Prob\Bigl(\bigcup_n B_n\Bigr) = \sum_n \Prob(B_n) \le \sum_n \Prob(A_n).
$$

对有限个事件，在最后一个事件之后取$A_n = \varnothing$即可。
:::

并集界虽然粗糙，却非常有用：如果一台机器的$100$个部件中每一个发生故障的概率都不超过$10^{-4}$，那么**无论**各故障之间有怎样的相依关系，至少有一个部件发生故障的概率都不超过$100 \cdot 10^{-4} = 0.01$。

为了得到精确的公式，我们把加法公式推广到更多的事件。对三个事件，$\Prob(A\cup B\cup C)$的求法是：把三个单个事件的概率相加，减去三个两两交的概率（每个都被计了两次），再加回三重交的概率（它此时已被加了三次、又减了三次）。一般地，有：

::: theorem 容斥原理 {#thm-inclusion-exclusion}
对事件$A_1, \ldots, A_n$，

$$
\Prob\Bigl(\bigcup_{i=1}^n A_i\Bigr) = \sum_{k=1}^n (-1)^{k+1} S_k, \qquad S_k = \sum_{1 \le i_1 < i_2 < \dots < i_k \le n} \Prob(A_{i_1} \cap A_{i_2} \cap \dots \cap A_{i_k}).
$$ {#eq-incl-excl}

因此$S_1$是单个事件的概率之和，$S_2$是对所有两两组合求和，依此类推，并且符号正负交替。
:::

::: proof
对$n$用数学归纳法。$n = 1$时无须证明，$n = 2$就是加法公式（[[#thm-basic]]）。设公式对任意$n$个事件成立，并设$A_1, \ldots, A_{n+1}$是事件。令$U = A_1 \cup \dots \cup A_n$。由加法公式，

$$
\Prob(U \cup A_{n+1}) = \Prob(U) + \Prob(A_{n+1}) - \Prob(U \cap A_{n+1}).
$$

而$U \cap A_{n+1} = \bigcup_{i=1}^n (A_i \cap A_{n+1})$是$n$个事件的并，所以由归纳假设，

$$
\Prob(U \cap A_{n+1}) = \sum_{k=1}^n (-1)^{k+1} \sum_{i_1 < \dots < i_k \le n} \Prob(A_{i_1} \cap \dots \cap A_{i_k} \cap A_{n+1}).
$$

考虑事件$A_1, \ldots, A_{n+1}$中任意$j$个的交。如果它不涉及$A_{n+1}$，那么它出现在$\Prob(U)$的展开式中（再次用到归纳假设），符号为$(-1)^{j+1}$。如果它涉及$A_{n+1}$且$j = 1$，那么它就是$\Prob(A_{n+1})$这一项，符号为$+1$。如果它涉及$A_{n+1}$且$j \ge 2$，那么它是上式中$k = j-1$的某一项，而$\Prob(U\cap A_{n+1})$前面的负号使它的符号变为$-(-1)^{j} = (-1)^{j+1}$。所以每个由$j$个事件构成的交都恰好出现一次，符号为$(-1)^{j+1}$，这正是$n+1$个事件的公式。
:::

::: quiz
事件$A$和$B$满足$\Prob(A) = 0.7$，$\Prob(B) = 0.6$。在没有其他信息的情况下，关于$\Prob(A \cap B)$能得出什么结论？
- [ ] 它等于$0.42$。
- [x] 它介于$0.3$与$0.6$之间。
- [ ] 它至多为$0.3$。
- [ ] 什么也得不出：$[0, 0.6]$中的任何值都有可能。
::: solution
由加法公式，$\Prob(A\cap B) = \Prob(A) + \Prob(B) - \Prob(A \cup B) \ge 0.7 + 0.6 - 1 = 0.3$，因为$\Prob(A\cup B) \le 1$。又$A \cap B \subseteq B$，所以$\Prob(A\cap B) \le 0.6$。两个极端值都可能取到（例如$B \subseteq A$时取$0.6$）。值$0.42 = 0.7 \times 0.6$要求这两个事件**相互独立**；这个概念我们将在[[probability/conditional-probability]]一章中遇到，而这里没有任何条件保证它成立。
:::
:::

最后一条基本性质把概率与极限联系起来。正是在这里，可数可加性（而不仅仅是有限可加性）才真正起作用。

::: theorem 概率的连续性 {#thm-continuity}
1. 若$A_1 \subseteq A_2 \subseteq A_3 \subseteq \cdots$是事件，则$\displaystyle\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \lim_{n\to\infty} \Prob(A_n)$。
2. 若$A_1 \supseteq A_2 \supseteq A_3 \supseteq \cdots$是事件，则$\displaystyle\Prob\Bigl(\bigcap_{n=1}^\infty A_n\Bigr) = \lim_{n\to\infty} \Prob(A_n)$。
:::

::: proof
(1) 令$B_1 = A_1$，并对$n \ge 2$令$B_n = A_n \setminus A_{n-1}$，即在第$n$步“新”加入的结果。各$B_n$两两不相交，$A_n = B_1 \cup \dots \cup B_n$，并且$\bigcup_n A_n = \bigcup_n B_n$。先由可数可加性，再由有限可加性，得

$$
\Prob\Bigl(\bigcup_{n} A_n\Bigr) = \sum_{k=1}^\infty \Prob(B_k) = \lim_{n\to\infty} \sum_{k=1}^n \Prob(B_k) = \lim_{n\to\infty} \Prob(A_n).
$$

(2) 补集$A_n^c$是递增的，并且由德摩根律，$\bigl(\bigcap_n A_n\bigr)^c = \bigcup_n A_n^c$。由第(1)部分和补集法则，

$$
\Prob\Bigl(\bigcap_n A_n\Bigr) = 1 - \Prob\Bigl(\bigcup_n A_n^c\Bigr) = 1 - \lim_{n\to\infty}\bigl(1 - \Prob(A_n)\bigr) = \lim_{n\to\infty} \Prob(A_n).
$$
:::

::: example 均匀硬币终将出现正面 {#ex-eventually-heads}
反复抛掷一枚均匀硬币。证明它**永远**不出现正面的概率为$0$。
::: solution
设$T_n$为“前$n$次抛掷全是反面”这一事件。在$n$次抛掷的$2^n$个等可能序列中，恰有一个全是反面，所以$\Prob(T_n) = 2^{-n}$。这些事件是递减的：$T_1 \supseteq T_2 \supseteq \cdots$，因为如果前$n+1$次都是反面，那么前$n$次也都是反面。“永不出现正面”就是“每个$T_n$都发生”这一事件，即$\bigcap_n T_n$。由[[#thm-continuity]]，

$$
\Prob(\text{永不出现正面}) = \lim_{n\to\infty} 2^{-n} = 0.
$$

注意“永不出现正面”并不是**不可能**事件（全是反面的序列是有意义的）；它只是概率为零而已。
:::
:::

## 等可能结果 {#equally-likely}

最古老的一类概率模型是每个结果都等可能的模型。当$\Omega$有限时，在[[#prop-discrete]]中取常数权重$p(\omega) = 1/\lvert\Omega\rvert$，就得到下面的结论。

::: corollary 古典概率 {#cor-classical}
若$\Omega$有限且所有结果都等可能，则对每个事件$A$，

$$
\Prob(A) = \frac{\lvert A\rvert}{\lvert\Omega\rvert} = \frac{A \text{ 中的结果数}}{\text{结果总数}}.
$$
:::

于是计算概率就变成了计数问题，[[discrete/counting]]一章中的工具都可以派上用场：乘法原理，从$n$个对象中有序地选取$k$个的$n!/(n-k)!$种方法，以及无序选取的$\binom{n}{k}$种方法。

::: example 两颗骰子的点数和 {#ex-two-dice}
掷两颗均匀的骰子。求点数和为$7$的概率，以及点数和为$8$的概率。
::: solution
使用$36$个有序结果$(i, j)$，对均匀骰子而言它们是等可能的。点数和为$7$来自$(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$，所以$\Prob(\text{点数和为 } 7) = \tfrac{6}{36} = \tfrac16$。点数和为$8$来自$(2,6), (3,5), (4,4), (5,3), (6,2)$，所以$\Prob(\text{点数和为 }8) = \tfrac{5}{36}$。一般地，得到点数和$2, 3, \ldots, 12$的方法数为

| 点数和 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 方法数 | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

所以这十一个可能的点数和远非等可能。
:::
:::

::: example 德·梅雷骑士的两种赌法 {#ex-de-mere}
一位17世纪的赌徒以一赔一的赔率押注：(a) 掷一颗骰子四次，至少出现一次六点；(b) 掷一对骰子$24$次，至少出现一次双六。他推断这两种赌法同样有利，因为$4/6 = 24/36$。计算这两个概率。
::: solution
(a) 样本空间为$\{1,\ldots,6\}^4$，有$6^4 = 1296$个等可能的结果。其补事件“没有六点”由只用到$1, \ldots, 5$的$5^4 = 625$个序列组成。因此

$$
\Prob(\text{至少出现一次六点}) = 1 - \frac{5^4}{6^4} = \frac{671}{1296} \approx 0.5177.
$$

(b) 现在样本空间是由$24$个有序对组成的序列的集合，有$36^{24}$个等可能的结果，其中有$35^{24}$个不含双六。所以

$$
\Prob(\text{至少出现一次双六}) = 1 - \Bigl(\frac{35}{36}\Bigr)^{24} \approx 0.4914.
$$

第一种赌法对赌徒有利，第二种则略为不利。比例论证之所以失败，是因为它把“至少一次”的概率当作与尝试次数成正比，这正是上面警示中所说的把相互重叠的事件的概率直接相加的错误。
:::
:::

::: example 葫芦 {#ex-full-house}
从一副洗匀的$52$张标准扑克牌中发出一手$5$张牌。得到**葫芦**（full house，即三张同一点数的牌加上另一点数的两张牌，例如三张K和两张7）的概率是多少？
::: solution
全部$\binom{52}{5} = 2\,598\,960$手牌都是等可能的。用乘法原理来数葫芦的个数：选定三张组的点数（$13$种方法），从该点数的四种花色中选出三种（$\binom43 = 4$种），为对子选定另一个点数（$12$种方法），再从它的四种花色中选出两种（$\binom42 = 6$种）。这样得到$13 \cdot 4 \cdot 12 \cdot 6 = 3744$手牌，所以

$$
\Prob(\text{葫芦}) = \frac{3744}{2\,598\,960} \approx 0.00144,
$$

大约每$694$手牌中有一手。注意三张组和对子的点数是**有序**选取的：三张K带一对7与三张7带一对K是不同的牌，这就是为什么我们乘的是$13 \cdot 12$而不是$\binom{13}{2}$。
:::
:::

现在可以解决本章开头的问题了。

::: example 生日问题 {#ex-birthday}
假设生日等可能地落在$365$天中的每一天（忽略2月29日）。求$n$个人中至少有两人生日相同的概率。
::: solution
按顺序记录这$n$个人的生日：$\Omega$是由$365$天组成的长度为$n$的序列的集合，所以$\lvert\Omega\rvert = 365^n$，所有序列都等可能。设$A$为“有两人生日相同”这一事件。它的补事件$A^c$即“所有人的生日都不同”，由没有重复的序列组成，这样的序列共有$365 \cdot 364 \cdots (365 - n + 1)$个。因此

$$
\Prob(A) = 1 - \frac{365 \cdot 364 \cdots (365-n+1)}{365^n} = 1 - \prod_{k=0}^{n-1}\Bigl(1 - \frac{k}{365}\Bigr).
$$

当$n = 22$时，这个概率为$0.4757$；当$n = 23$时，它为$0.5073$。所以$23$是使“有人生日相同”的可能性大于一半的最小人数。一旦我们去数**两人组**，这种意外感就消失了：$23$个人构成$\binom{23}{2} = 253$个两人组，而每一组都是一次出现巧合的机会。
:::
:::

::: widget plot
f: 1 - prod((365 - k)/365, k, 0, floor(x) - 1)
x: 1, 80
y: 0, 1
hlines: 0.5
vlines: 23
labels: P(\text{有人生日相同})
caption: $n$个人中至少有两人生日相同的概率，作为$n$的函数。它在$n = 23$处越过$\tfrac12$，从$n = 57$起超过$0.99$。把鼠标悬停在曲线上即可读出数值：上升最陡的一段在$10$人到$40$人之间。
:::

::: warning “等可能”是一个假设，而非默认
公式$\lvert A\rvert/\lvert\Omega\rvert$只有在各结果确实等可能时才成立，而这是关于试验本身的事实，与我们选择怎样列出结果无关。在1754年的《百科全书》（*Encyclopédie*）中，让·勒朗·达朗贝尔（Jean le Rond d'Alembert）论证说，抛两次硬币至少出现一次正面的概率是$\tfrac23$，他把结果列为“第一次就是正面”“先反面后正面”“两次都是反面”。这三个结果并不是等可能的：第一个的概率为$\tfrac12$。使用四个等可能的有序结果$HH, HT, TH, TT$，便得到正确答案$\tfrac34$。同样，两颗骰子的十一个点数和不是等可能的，而$36$个有序对是等可能的。
:::

::: quiz
抛三枚均匀硬币。一位朋友论证说：“正面的个数是$0$、$1$、$2$或$3$，所以恰好出现一个正面的概率是$\tfrac14$。”正确的概率是多少？
- [ ] $\tfrac14$
- [ ] $\tfrac13$
- [x] $\tfrac38$
- [ ] $\tfrac12$
::: solution
$8$个有序结果$HHH, HHT, \ldots, TTT$是等可能的，其中恰有三个（$HTT$、$THT$、$TTH$）只含一个正面。所以概率为$\tfrac38$。正面的四种可能**个数**并不是等可能的：它们的概率分别为$\tfrac18, \tfrac38, \tfrac38, \tfrac18$。
:::
:::

容斥原理与计数方法结合起来，威力就很大了。下一个例子是概率论的经典问题之一，皮埃尔·雷蒙·德·蒙莫尔（Pierre Rémond de Montmort）在1708年研究过它。

::: example 配对问题 {#ex-matching}
一位秘书把$n$封信随机地装进$n$个写好地址的信封，使得全部$n!$种装法都是等可能的。没有一封信装进正确信封的概率是多少？当$n \to \infty$时会怎样？
::: solution
设$A_i$为“第$i$封信装进了正确的信封”这一事件。我们要求的是$1 - \Prob(A_1 \cup \dots \cup A_n)$。对任意$k$个不同的指标$i_1 < \dots < i_k$，使第$i_1, \ldots, i_k$封信都装对的装法，就是其余$n - k$封信的装法，所以

$$
\Prob(A_{i_1} \cap \dots \cap A_{i_k}) = \frac{(n-k)!}{n!}.
$$

指标的选法有$\binom{n}{k}$种，所以$S_k = \binom{n}{k}\dfrac{(n-k)!}{n!} = \dfrac{1}{k!}$。由[[#thm-inclusion-exclusion]]，

$$
\Prob(\text{没有一封信装对}) = 1 - \sum_{k=1}^n \frac{(-1)^{k+1}}{k!} = \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

当$n = 4$时，它等于$1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} = \tfrac38$。当$n \to \infty$时，这个和收敛于指数级数$\sum_k (-1)^k/k! = e^{-1} \approx 0.3679$（[[calculus-2/taylor-series]]）。早在$n = 7$时，答案就与$e^{-1}$在小数点后四位上一致：对十封信和对一千万封信而言，没有一封信配对正确的机会基本相同。
:::
:::

## 无限样本空间 {#infinite}

公理中没有任何一条要求$\Omega$有限。当$\Omega$可数无限时，[[#prop-discrete]]仍然适用：任何总和为$1$的非负权重都定义一个概率测度。当$\Omega$不可数时，单个结果的概率不再能决定一切，取而代之的是区间或区域的概率。

::: example 等待第一次正面 {#ex-first-head}
抛掷一枚均匀硬币，直到第一次出现正面为止。令$\Omega = \{1, 2, 3, \ldots\}$记录所需的抛掷次数。第一次正面出现在第$n$次，当且仅当前$n$次的结果为$T\cdots TH$，这是$2^n$个等可能序列中的一个，所以我们取$p(n) = 2^{-n}$。验证这是一个概率测度，并求第一次正面出现在第偶数次抛掷的概率。
::: solution
这些权重都是正的，构成一个几何级数，其和为$\sum_{n\ge1} 2^{-n} = \frac{1/2}{1 - 1/2} = 1$，所以[[#prop-discrete]]适用。（和恰好为$1$，这与[[#ex-eventually-heads]]一致：没有剩下任何概率留给“永不出现”。）事件“在第偶数次”是$\{2, 4, 6, \ldots\}$，所以

$$
\Prob(\text{偶数次}) = \sum_{k=1}^\infty 2^{-2k} = \sum_{k=1}^\infty 4^{-k} = \frac{1/4}{1 - 1/4} = \frac13.
$$

因此第奇数次的概率为$\tfrac23$：单是第一次抛掷就已贡献了$\tfrac12$。
:::
:::

对于不可数样本空间，考虑从$\Omega = [0, 1]$中“均匀随机地”选取一个点。自然的要求是：点落在一个区间中的概率等于该区间的长度：

$$
\Prob([a, b]) = b - a \qquad (0 \le a \le b \le 1).
$$ {#eq-uniform}

存在一个具有这一性质、定义在包含所有区间的σ-代数（**博雷尔集**）上的概率测度，这是一个真正的定理：它就是[[measure-theory/lebesgue-measure]]一章中勒贝格测度的构造。承认这一点，由单调性可知单个点的概率为零：$\{x\} \subseteq [x - \eps, x + \eps]$，所以对每个$\eps > 0$都有$\Prob(\{x\}) \le 2\eps$。这与可数可加性并不矛盾，因为$[0,1]$是不可数的，而可加性对不可数并没有任何断言。由此推出，每个可数集（例如$[0,1]$中有理数的集合）的概率都为零。

::: warning 概率为零并不意味着不可能
对于$[0,1]$中的均匀随机点$X$，每个特定值的概率都是$0$，然而总有某个值会出现。“$\Prob(A) = 0$”的意思是：就概率而言$A$可以忽略不计，而不是$A$不可能发生；同样，$\Prob(A) = 1$的意思是$A$**几乎必然**发生，而不是$A$必然发生。这一区别在有限模型中无关紧要，因为在那里我们需要的唯一概率为零的事件就是$\varnothing$；但在连续模型中它至关重要。
:::

同样的想法用在二维情形，就得到**几何概率**：如果从平面区域$R$中均匀地选取一个点，那么它落在$A \subseteq R$中的概率为$\operatorname{area}(A)/\operatorname{area}(R)$。

::: example 约好吃午饭 {#ex-meeting}
两个朋友各自在12:00到13:00之间的某个随机时刻到达一家咖啡馆，每人都会等对方$15$分钟，等不到就离开。假设两人到达时刻构成的数对在所有可能情况组成的正方形上均匀分布，他们相遇的概率是多少？
::: solution
以中午之后经过的小时数计时，则到达时刻$(x, y)$是单位正方形$[0,1]^2$中的一个均匀随机点。两人相遇当且仅当$\lvert x - y\rvert \le \tfrac14$。补区域由两个直角三角形$y > x + \tfrac14$和$x > y + \tfrac14$组成，每个三角形的两条直角边长都是$\tfrac34$，因而面积为$\tfrac12\bigl(\tfrac34\bigr)^2 = \tfrac{9}{32}$。因此

$$
\Prob(\text{相遇}) = 1 - 2 \cdot \frac{9}{32} = \frac{7}{16} = 0.4375.
$$
:::
:::

几何概率还提供了一种用模拟来**估计**面积的方法，这正是蒙特卡罗（Monte Carlo）方法背后的思想。单位正方形中的均匀随机点落在四分之一圆盘$x^2 + y^2 \le 1$内的概率为$\pi/4$，所以落在其中的随机点所占的比例就是$\pi/4$的一个估计。

::: widget montecarlo
mode: pi
n: 1000
caption: 每个点都是单位正方形中的一个均匀随机点；落在四分之一圆内的点所占的比例是$\Prob(\text{落在圆内}) = \pi/4$的估计，所以它的四倍就是$\pi$的估计。增大$n$并重新运行几次：估计值的分散程度会减小，但减小得很慢——要多得到一位正确数字，大约需要$100$倍的点数。原因在于[[probability/limit-theorems]]一章中的$1/\sqrt{n}$律。
:::

::: remark 贝特朗悖论
“在圆中随机地取一条弦”并没有确定一个概率空间。约瑟夫·贝特朗（Joseph Bertrand）在他的《概率计算》（*Calcul des probabilités*，1889）中问：随机弦比圆内接等边三角形的边更长的概率是多少？他得到了三个不同的答案：如果在圆周上均匀地选取弦的两个端点，答案是$\tfrac13$；如果在一条随机半径上取一个均匀随机点作为弦的中点，答案是$\tfrac12$；如果在圆盘内均匀地选取弦的中点，答案是$\tfrac14$。每个答案对于它自己的模型都是正确的。由此得到的教训是：在样本空间和概率测度确定之前，“随机”二字没有意义。
:::

::: history
机会游戏由来已久，但关于它们的数学却并不古老。吉罗拉莫·卡尔达诺（Gerolamo Cardano）在《论赌博游戏》（*Liber de ludo aleae*）中分析了骰子，这本书约写于1564年，直到1663年才出版。人们通常把这门学科的诞生定在1654年：那一年，布莱兹·帕斯卡（Blaise Pascal）与皮埃尔·德·费马（Pierre de Fermat）通信讨论了赌徒安托万·贡博（Antoine Gombaud）——即德·梅雷骑士（Chevalier de Méré）——向帕斯卡提出的一些问题，其中包括如何分配一场中断了的赌局的赌注（即“点数问题”）。克里斯蒂安·惠更斯（Christiaan Huygens）写出了第一部印行的专著《论赌博中的计算》（*De ratiociniis in ludo aleae*，1657），而雅各布·伯努利（Jacob Bernoulli）的《猜度术》（*Ars Conjectandi*，在他去世后于1713年出版）则远远超出了赌博的范围。皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）的《概率的分析理论》（*Théorie analytique des probabilités*，1812）使古典定义——有利情形数除以等可能情形数——成为标准定义。贝特朗悖论之类的悖论表明这个定义是不够的；1900年，戴维·希尔伯特（David Hilbert）把概率论的公理化列入了他的第六问题。答案出现在安德烈·柯尔莫哥洛夫（Andrey Kolmogorov）的《概率论基本概念》（*Grundbegriffe der Wahrscheinlichkeitsrechnung*，1933）中，这部著作使用本章的公理，把概率论建立在博雷尔（Borel）和勒贝格（Lebesgue）的测度论之上。
:::

## 后续内容 {#where-next}

概率空间是其他一切内容展开的舞台。在[[probability/conditional-probability]]一章中，我们将学习获得部分信息后概率如何变化，由此引出贝叶斯定理和独立性的概念。附着在结果上的数值量，例如两颗骰子的点数和或直到出现正面所需的抛掷次数，称为**随机变量**，从[[probability/discrete-random-variables]]一章起开始研究。本章中测度论的一面——σ-代数、勒贝格测度的构造以及关于概率测度的积分——将在[[measure-theory/sigma-algebras]]和[[measure-theory/lebesgue-integral]]两章中全面展开。

::: summary
- 概率空间$(\Omega, \mathcal{F}, \Prob)$由结果组成的样本空间、由事件组成的σ-代数以及满足柯尔莫哥洛夫公理的概率测度构成；这些公理是：非负性、$\Prob(\Omega) = 1$和可数可加性（[[#def-prob-space]]）。
- 事件就是集合；“或”“且”“非”分别对应并、交、补，德摩根律可以在它们之间相互转换。
- 在可数样本空间上，概率测度就是一组总和为$1$的非负权重（[[#prop-discrete]]）。
- 公理的推论：$\Prob(A^c) = 1 - \Prob(A)$，单调性，$\Prob(A\cup B) = \Prob(A) + \Prob(B) - \Prob(A\cap B)$，并集界以及容斥原理。
- 概率沿递增和递减的事件序列是连续的（[[#thm-continuity]]）。
- 当结果有限且等可能时，$\Prob(A) = \lvert A\rvert/\lvert\Omega\rvert$，求概率归结为计数——但等可能性必须有根据。补事件往往更容易计数（“至少一个”与“一个也没有”）。
- 在连续模型中，单个结果的概率为$0$；概率为零并不意味着不可能。
:::

## 习题

::: exercise 三枚硬币 {level=1 check="3/8"}
抛三枚均匀硬币。求恰好出现两个正面的概率。
::: solution
在$8$个等可能的结果中，$HHT$、$HTH$和$THH$恰有两个正面，所以概率为$\tfrac38$。
:::
:::

::: exercise 两个事件中恰有一个发生 {level=1 check="1/2"}
事件$A$和$B$满足$\Prob(A) = 0.6$，$\Prob(B) = 0.5$，$\Prob(A \cap B) = 0.3$。求$A$与$B$中恰有一个发生的概率。
::: solution
由加法公式，$\Prob(A\cup B) = 0.6 + 0.5 - 0.3 = 0.8$。“恰有一个”就是$(A\cup B) \setminus (A \cap B)$，而$A\cap B \subseteq A \cup B$，所以由单调性（[[#thm-basic]]），其概率为$0.8 - 0.3 = 0.5$。
:::
:::

::: exercise 较大的点数和 {level=1 check="1/6"}
掷两颗均匀的骰子。求点数和至少为$10$的概率。
::: solution
在$36$个等可能的有序结果中，点数和为$10$、$11$、$12$的共有$3 + 2 + 1 = 6$个，所以概率为$\tfrac{6}{36} = \tfrac16$。
:::
:::

::: exercise 委员会 {level=2 check="5/6"}
从$6$名女性和$4$名男性中随机选出一个$3$人委员会。求委员会中至少有一名男性的概率。
::: hint
对补事件计数。
:::
::: solution
全部$\binom{10}{3} = 120$种委员会都是等可能的。补事件“没有男性”意味着三人都是女性：共$\binom63 = 20$种委员会。因此$\Prob(\text{至少有一名男性}) = 1 - \tfrac{20}{120} = \tfrac56$。
:::
:::

::: exercise 四条 {level=2 check="1/4165"}
求一手$5$张扑克牌中含有四张同点数牌的概率。
::: solution
选定这四张牌的点数（$13$种方法）；该点数的四张牌就全在这手牌中，第五张牌是其余$48$张中的任意一张。所以在$\binom{52}{5} = 2\,598\,960$手牌中，这样的牌有$13 \cdot 48 = 624$手，概率为$\tfrac{624}{2\,598\,960} = \tfrac{1}{4165} \approx 0.00024$。
:::
:::

::: exercise 与你同一天生日 {level=2 check="253"}
在[[#ex-birthday]]的假设下，其他人的人数$n$最少为多少，才能使其中至少有一人与**你**生日相同的概率超过$\tfrac12$？
::: hint
对固定的某一天，避开这一天的$n$人生日序列共有$364^n$个。
:::
::: solution
在其他$n$个人的$365^n$个等可能的生日序列中，有$364^n$个避开了你的生日。所以我们需要$1 - (364/365)^n > \tfrac12$，即$n \ln(365/364) > \ln 2$，或者

$$
n > \frac{\ln 2}{\ln(365/364)} \approx 252.65.
$$

因此$n = 253$（此时概率为$0.5005$，而$n = 252$时为$0.4991$）。这大约是生日问题答案的十一倍：在生日问题中，$\binom{n}{2}$个两人组中的任何一组都可能生日相同；而这里只有包含你的$n$个两人组才算数。
:::
:::

::: exercise 被2、3或5整除 {level=2 check="0.734"}
从$1, 2, \ldots, 1000$中均匀随机地选取一个整数。求它至少能被$2$、$3$、$5$中的一个整除的概率。
::: solution
设$A_2$、$A_3$、$A_5$分别为能被$2$、$3$、$5$整除的事件。$\{1, \ldots, 1000\}$中$m$的倍数有$\lfloor 1000/m\rfloor$个；能被这些素数中的两个或三个整除，就是能被它们的乘积整除。由容斥原理（[[#thm-inclusion-exclusion]]），所求个数为

$$
500 + 333 + 200 - 166 - 100 - 66 + 33 = 734,
$$

这里用到了$\lfloor 1000/6\rfloor = 166$，$\lfloor 1000/10\rfloor = 100$，$\lfloor 1000/15\rfloor = 66$和$\lfloor 1000/30\rfloor = 33$。所求概率为$\tfrac{734}{1000} = 0.734$。
:::
:::

::: exercise 邦费罗尼（Bonferroni）不等式 {level=3}
证明：对任意事件$A_1, \ldots, A_n$，

$$
\Prob(A_1 \cap A_2 \cap \dots \cap A_n) \ge 1 - \sum_{i=1}^n \Prob(A_i^c).
$$

由此推出：如果$20$个命题中的每一个为真的概率都至少是$0.995$，那么这$20$个命题同时为真的概率至少是$0.9$。
::: hint
对补事件应用并集界。
:::
::: solution
由德摩根律，$(A_1\cap\dots\cap A_n)^c = A_1^c \cup \dots \cup A_n^c$。由补集法则和并集界（[[#thm-union-bound]]），

$$
\Prob\Bigl(\bigcap_{i} A_i\Bigr) = 1 - \Prob\Bigl(\bigcup_i A_i^c\Bigr) \ge 1 - \sum_{i=1}^n \Prob(A_i^c).
$$

在这个应用中，每个$\Prob(A_i^c) \le 0.005$，所以$20$个命题全部成立的概率至少为$1 - 20 \times 0.005 = 0.9$。这里不需要对命题之间的关系作任何假设。这正是多重检验中邦费罗尼校正（[[statistics/hypothesis-testing#thm-bonferroni]]）背后的思想。
:::
:::

::: exercise 整数上不存在均匀分布 {level=3}
设$\N = \{1, 2, 3, \ldots\}$。证明$(\N, 2^{\N})$上不存在使所有单点集$\{n\}$的概率都相同的概率测度。（因此“均匀随机地选取一个正整数”是没有意义的。）
::: solution
假设对每个$n$都有$\Prob(\{n\}) = c$。这些单点集两两不相交，其并为$\N$，所以由可数可加性得

$$
1 = \Prob(\N) = \sum_{n=1}^\infty \Prob(\{n\}) = \sum_{n=1}^\infty c.
$$

若$c = 0$，右端为$0$；若$c > 0$，右端发散到$\infty$。两者都不等于$1$，矛盾。（仅凭有限可加性不能排除这样的“测度”；可数可加性则可以。）
:::
:::

::: exercise 折断木棍 {level=3 check="1/4"}
把一根长为$1$的木棍在两点处折断，两个断点构成的数对$(x, y)$是单位正方形中的均匀随机点。求折成的三段能构成三角形的概率。
::: hint
三个长度能构成三角形，当且仅当每一个都小于总长的一半。分别处理$x < y$和$x > y$两种情形，并画出相应的区域。
:::
::: solution
和为$1$的三个正长度能构成一个（非退化的）三角形，当且仅当每一个都小于$\tfrac12$：三角不等式$a < b + c$等价于$a < 1 - a$，即$a < \tfrac12$。若$x < y$，三段的长度分别为$x$、$y - x$和$1 - y$，条件为

$$
x < \tfrac12, \qquad y - x < \tfrac12, \qquad y > \tfrac12 .
$$

在三角形$\{0 < x < y < 1\}$（面积为$\tfrac12$）中，这些条件截出以$(0, \tfrac12)$、$(\tfrac12, \tfrac12)$和$(\tfrac12, 1)$为顶点的三角形，其面积为$\tfrac18$。由对称性，$x > y$的情形又贡献$\tfrac18$，而事件$x = y$的概率为零。因此所求概率为$\tfrac18 + \tfrac18 = \tfrac14$。
:::
:::

::: exercise 上连续性的直接证明 {level=3}
在[[#thm-continuity]]中，第(2)部分是由第(1)部分推出的。试给出一个直接证明：设$A_1 \supseteq A_2 \supseteq \cdots$，$A = \bigcap_n A_n$，证明$A_1 \setminus A$是集合$A_k \setminus A_{k+1}$（$k \ge 1$）的不交并，并由此证明$\Prob(A) = \lim_n \Prob(A_n)$。
::: solution
若$\omega \in A_1 \setminus A$，则$\omega$并不属于每一个$A_n$；设$m$是使$\omega \notin A_{m+1}$的最小指标。则$\omega \in A_m$（由$m$的最小性，$A_1, \ldots, A_m$都包含$\omega$），所以$\omega \in A_m \setminus A_{m+1}$。反之，每个$A_k \setminus A_{k+1}$都包含于$A_1$，且与$A_{k+1} \supseteq A$不相交，所以它包含于$A_1 \setminus A$。各集合$A_k \setminus A_{k+1}$两两不相交：若$j < k$，则$A_k \subseteq A_{j+1}$，所以$A_k\setminus A_{k+1}$包含于$A_{j+1}$，而$A_{j+1}$与$A_j \setminus A_{j+1}$不相交。由可数可加性和[[#thm-basic]]的第(4)条，

$$
\Prob(A_1) - \Prob(A) = \sum_{k=1}^\infty \bigl(\Prob(A_k) - \Prob(A_{k+1})\bigr) = \lim_{n\to\infty} \bigl(\Prob(A_1) - \Prob(A_{n+1})\bigr),
$$

这是因为部分和可以裂项相消。消去$\Prob(A_1)$即得$\Prob(A) = \lim_n \Prob(A_{n+1}) = \lim_n \Prob(A_n)$。
:::
:::
