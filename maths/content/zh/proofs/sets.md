哪些整数能写成$4a + 6b$（$a$和$b$为整数）的形式？做几次试验——$4\cdot 1 + 6\cdot 0 = 4$，$4\cdot(-1) + 6\cdot 1 = 2$，$4\cdot(-3) + 6\cdot 2 = 0$，$4\cdot 2 + 6\cdot 1 = 14$——答案似乎是“恰好是全体偶数”。要**证明**这一点，我们必须说明两个数的总体——形如$4a+6b$的数与偶数——是同一个总体。这就要求精确地说明什么是总体，以及两个总体相等是什么意思。这正是集合论的任务。

集合是现代数学的基本素材。数系$\N$、$\Z$、$\Q$和$\R$都是集合；区间是实数的集合；方程的解构成一个集合；函数（[[proofs/functions]]）是一种特殊的有序对集合；向量空间、群和概率空间都是带有附加结构的集合。本章介绍集合的记号，并、交、补等运算，以及证明两个集合相等的标准方法——证明两个方向的包含关系。贯穿始终、真正起作用的是[[proofs/propositional-logic]]和[[proofs/quantifiers]]两章中的逻辑：关于集合的每个命题都可以展开为关于元素的命题。

## 集合与元素

非正式地说，**集合**是一些对象汇集而成的整体，这些对象称为它的**元素**或**成员**。我们用$x \in A$表示“$x$是$A$的元素”，用$x \notin A$表示它的否定。关于集合，最重要的一个事实是：集合由它的元素决定，而且只由它的元素决定。

::: definition 集合相等 {#def-set-equality}
两个集合$A$与$B$**相等**，记作$A = B$，是指它们的元素完全相同：

$$
A = B \quad\text{是指}\quad \forall x\ \bigl(x \in A \Leftrightarrow x \in B\bigr).
$$
:::

因此，元素列出的顺序以及是否有重复都无关紧要：$\set{1,2,3} = \set{3,1,2} = \set{1,1,2,3}$，因为这几个集合的元素相同，都是$1$、$2$和$3$。

描述集合常用的方法有两种。

- **列举法**把元素逐一列在花括号内：$\set{2,3,5,7}$。当规律一目了然时，可以使用省略号，例如$\set{1,2,\dots,100}$或$\set{2,4,6,\dots}$。
- **描述法**通过性质来刻画元素。若$A$是集合，$P(x)$是谓词，则$\set{x \in A : P(x)}$是由$A$中使$P(x)$为真的那些元素组成的集合；例如$\set{n \in \Z : n^2 < 10} = \set{-3,-2,-1,0,1,2,3}$。它的一种变形是汇集一个表达式的所有取值：$\set{n^2 : n \in \Z} = \set{0,1,4,9,\dots}$是完全平方数的集合，而$\set{4a+6b : a,b\in\Z}$就是开头问题中的集合。（有些书用竖线，写成$\set{x\in A \mid P(x)}$，含义相同。）

我们使用标准的数集

$$
\N = \set{1,2,3,\dots},\qquad \N_0 = \set{0,1,2,\dots},\qquad \Z,\qquad \Q,\qquad \R,\qquad \C,
$$

以及**区间**，如$[a,b] = \set{x\in\R : a \le x \le b}$、$(a,b) = \set{x \in \R : a < x < b}$和$[a,\infty) = \set{x\in\R : x\ge a}$，还有简写$[n] = \set{1,2,\dots,n}$。关于是否有$0 \in \N$，各种约定不尽相同；在本课程中$0$不属于$\N$，需要把$0$包括进来时，我们写$\N_0$。（注意：我国国家标准GB 3102.11和中小学教材规定$0 \in \N$，并用$\N^*$或$\N_+$表示正整数集；本课程沿用国际上许多大学教材的约定。）

不含任何元素的集合称为**空集**，记作$\varnothing$。空集只有一个：如果$E$和$E'$都没有元素，那么对每个$x$，$x \in E \Leftrightarrow x\in E'$都成立（两边都为假），所以由[[#def-set-equality]]，$E = E'$。空集随处可见——例如作为$x^2 = -1$的实数解的集合，或者作为两个没有公共元素的集合的交集。

集合的元素本身也可以是集合。集合$\set{\varnothing}$**不是**空集：它恰有一个元素，即$\varnothing$。可以把$\varnothing$想象成一个空袋子，而把$\set{\varnothing}$想象成装着一个空袋子的袋子。类似地，$\set{1,\set{1}}$有两个元素：数$1$和集合$\set{1}$。对有限集$A$，我们用$\abs{A}$表示$A$的元素个数；于是$\abs{\varnothing} = 0$，$\abs{\set{\varnothing}} = 1$，$\abs{\set{1,\set{1}}} = 2$。无限集的大小是[[proofs/cardinality]]一章的主题。

::: quiz
集合$\set{\varnothing,\ \set{\varnothing},\ \set{1,2},\ \set{2,1}}$有多少个元素？
- [ ] $0$
- [ ] $2$
- [x] $3$
- [ ] $4$
::: solution
集合$\set{1,2}$与$\set{2,1}$的元素相同，所以它们相等，只算一次。其余的元素$\varnothing$和$\set{\varnothing}$彼此不同（一个没有元素，另一个有一个元素），也都不同于$\set{1,2}$。所以这个集合就是$\set{\varnothing, \set{\varnothing}, \set{1,2}}$，有三个元素。注意这里$\varnothing$算作一个元素：“空”是$\varnothing$**自身的**元素的性质，当$\varnothing$位于另一个集合之中时，这并不是忽略它的理由。
:::
:::

## 子集与双向包含 {#subsets}

::: definition 子集 {#def-subset}
设$A$和$B$是集合。如果$A$的每个元素都是$B$的元素，就称$A$是$B$的**子集**，记作$A \subseteq B$：

$$
A \subseteq B \quad\text{是指}\quad \forall x\ \bigl(x\in A \Rightarrow x \in B\bigr).
$$

若$A \subseteq B$且$A \ne B$，则称$A$是$B$的**真子集**，记作$A \subsetneq B$。
:::

例如$\N \subseteq \Z \subseteq \Q \subseteq \R$，并且这三个包含关系都是真包含。有的作者用符号$\subset$表示$\subseteq$，有的作者则用它表示$\subsetneq$，所以我们避免使用这个符号。

要证明$A \subseteq B$，就按照定义的形式进行：**任取$x \in A$**，推出$x \in B$。要否定它，只需找到$A$中不属于$B$的一个元素——即一个反例，这正是量词的否定规则（[[proofs/quantifiers#thm-negation]]）所要求的。

::: theorem 包含关系的基本性质 {#thm-subset-props}
对任意集合$A$、$B$和$C$：

1. $\varnothing \subseteq A$；
2. $A \subseteq A$；
3. 若$A \subseteq B$且$B \subseteq C$，则$A \subseteq C$；
4. $A = B$当且仅当$A \subseteq B$且$B \subseteq A$。
:::

::: proof
1. 我们要证明对每个$x$都有$x \in \varnothing \Rightarrow x \in A$。对每个$x$，前提$x \in\varnothing$都为假，所以这个蕴涵式为真（空真）。
2. 对每个$x$，蕴涵式$x \in A \Rightarrow x \in A$都为真。
3. 设$x \in A$。由于$A \subseteq B$，有$x \in B$；又由于$B\subseteq C$，有$x\in C$。因为$x$是$A$中的任意元素，这就证明了$A \subseteq C$。
4. 双条件式$x\in A \Leftrightarrow x\in B$等价于$x\in A \Rightarrow x\in B$与$x\in B \Rightarrow x \in A$的合取。因此，“对每个$x$，$x\in A \Leftrightarrow x\in B$”成立，当且仅当“对每个$x$，$x \in A \Rightarrow x\in B$”与“对每个$x$，$x\in B\Rightarrow x\in A$”都成立，也就是当且仅当$A\subseteq B$且$B \subseteq A$。
:::

第4条是这门学问的主力工具。要证明两个集合相等，我们通常证明**双向包含**：先证$A\subseteq B$，再证$B \subseteq A$，每次都从一个任意元素出发。

::: example 开头的问题 {#ex-4a6b}
证明$\set{4a + 6b : a, b\in\Z} = \set{2k : k\in\Z}$。
::: solution
把左边的集合记为$S$，右边的集合（偶数集）记为$E$。

*$S \subseteq E$*。设$x\in S$，则对某些整数$a$和$b$有$x = 4a+6b$，所以$x = 2(2a+3b)$，其中$2a+3b\in\Z$。因此$x \in E$。

*$E \subseteq S$*。设$x \in E$，不妨设$x = 2k$，$k\in\Z$。我们需要找到整数$a, b$使$4a + 6b = 2k$。由于$4\cdot(-1) + 6 \cdot 1 = 2$，两边乘以$k$得$4(-k) + 6k = 2k$。所以取$a = -k$，$b = k$，就有$x = 4a + 6b$，从而$x\in S$。

由[[#thm-subset-props]]的第4条，$S = E$。
:::
:::

这个证明的两半性质不同。前一半是计算；后一半需要一个想法（把$2$本身写成所需的形式）。这很典型：一个方向的包含往往是例行公事，实质内容则在另一个方向。一般的问题——哪些整数能写成$ma + nb$的形式——将引出[[number-theory/divisibility]]一章中的裴蜀（Bézout）等式。

::: example 解不等式就是证明集合相等 {#ex-inequality}
证明$\set{x\in\R : x^2 < x} = (0,1)$。
::: solution
这里用一串等价关系一次证明两个方向的包含。对实数$x$，

$$
x^2 < x \iff x^2 - x < 0 \iff x(x-1) < 0 \iff 0 < x < 1.
$$

最后一步成立，是因为两个实数之积为负当且仅当两个因子异号；由于$x - 1 < x$，唯一的可能是$x - 1 < 0 < x$。所以$x$属于左边的集合当且仅当$x\in(0,1)$，由[[#def-set-equality]]，两个集合相等。
:::
:::

::: example 2的倍数与3的倍数 {#ex-six}
对$d \in \N$，记$d\Z = \set{dk : k \in \Z}$为$d$的倍数组成的集合。证明$2\Z \cap 3\Z = 6\Z$。
::: solution
*$6\Z \subseteq 2\Z\cap 3\Z$*。若$x = 6k$，则$x = 2(3k)\in 2\Z$且$x = 3(2k) \in 3\Z$。

*$2\Z\cap 3\Z \subseteq 6\Z$*。设$x \in 2\Z\cap3\Z$，不妨设$x = 2a$且$x = 3b$，其中$a,b\in\Z$。技巧在于写出$x = 3x - 2x$，并在两项中分别使用$x$的**不同**表示：

$$
x = 3x - 2x = 3(2a) - 2(3b) = 6a - 6b = 6(a-b),
$$

所以$x\in 6\Z$。同样的想法表明，只要某个组合$um + vn$等于$1$，就有$m\Z \cap n\Z = mn\Z$；而这种情形恰好发生在$m$与$n$没有大于$1$的公因数的时候（[[number-theory/divisibility]]）。没有这个条件，结论就不成立：$2\Z \cap 4\Z = 4\Z \neq 8\Z$。
:::
:::

::: warning ∈ 不是 ⊆
符号$\in$与$\subseteq$联系的是不同种类的对象。“$x \in A$”是说$x$是$A$的元素之一；“$S \subseteq A$”是说$S$的每个元素都是$A$的元素。对$A = \set{1,2}$，有$1\in A$和$\set{1} \subseteq A$，但$\set{1}\notin A$（$A$的元素是数，不是集合），而“$1 \subseteq A$”没有意义（数不是集合）。两者也可能同时成立：对$B = \set{1,\set{1}}$，$\set{1} \in B$与$\set{1}\subseteq B$都成立。写下其中任何一个符号之前，先问问自己：左边的对象是一个元素，还是由元素组成的总体？
:::

## 集合的运算

在大多数讨论中，所涉及的集合都是某个固定的**全集**$U$的子集——例如讨论区间时取$U = \R$。在$U$内，可以按如下方式组合集合。

::: definition 并、交、差与补 {#def-operations}
设$A$和$B$是全集$U$的子集。

- **并集**为$A\cup B = \set{x : x\in A \text{ 或 } x\in B}$。
- **交集**为$A \cap B = \set{x : x\in A \text{ 且 } x\in B}$。
- **差集**为$A\setminus B = \set{x : x\in A \text{ 且 } x\notin B}$。
- **补集**为$A^c = U\setminus A = \set{x \in U : x \notin A}$。
- **对称差**为$A \mathbin{\triangle} B = (A\setminus B) \cup (B \setminus A)$，即恰属于$A$与$B$二者之一的元素组成的集合。

若$A \cap B = \varnothing$，则称$A$与$B$**不相交**。
:::

并集中的“或”是可兼的：同时属于$A$和$B$的元素也属于$A \cup B$。与其他运算不同，补集依赖于全集：在$U = \Z$中，$\N$的补集是$\set{0,-1,-2,\dots}$；但当$U = \R$时，它包含$\tfrac12$和$\pi$。

::: example 有限集的计算 {#ex-compute}
设$U = [10]$，$A = \set{1,2,3,4,5,6}$，$B = \set{2,4,6,8,10}$，$C = \set{3,6,9}$。计算$A\cap B$、$A \cup C$、$A \setminus B$、$B^c$、$A \mathbin{\triangle} B$和$(A\cup B)^c \cap C$。
::: solution
逐个元素地检查：

- $A \cap B = \set{2,4,6}$，即$A$中的偶数元素；
- $A\cup C = \set{1,2,3,4,5,6,9}$；
- $A\setminus B = \set{1,3,5}$；
- $B^c = \set{1,3,5,7,9}$；
- $A\mathbin{\triangle} B = (A\setminus B) \cup (B\setminus A) = \set{1,3,5} \cup \set{8,10} = \set{1,3,5,8,10}$；
- $A\cup B = \set{1,2,3,4,5,6,8,10}$，所以$(A\cup B)^c = \set{7,9}$，$(A\cup B)^c\cap C = \set{9}$。

验证最后一个答案：$9$是$C$中唯一既不属于$A$、又不是偶数的元素。
:::
:::

图示很有帮助。在**维恩图**（Venn diagram）中，全集用一个矩形表示，每个集合是矩形内的一个区域。两个相交的圆把矩形分成四个区域，三个圆则分成八个区域——对每个集合“在内”或“在外”的每一种组合，各对应一个区域。

::: widget venn
sets: 2
expr: (A - B) | (B - A)
labels: A; B
caption: 阴影区域是对称差$A \mathbin{\triangle} B$。输入其他表达式——试试`A & B`、`A - B`和`A'`——然后比较`(A | B)'`与`A' & B'`。后两者的阴影区域相同：这就是下面将要证明的德摩根（De Morgan）律。
:::

每种集合运算都是一个乔装打扮的逻辑联结词。对$U$的元素$x$展开定义：

| 关于集合的命题 | 关于元素$x$的命题 |
|---|---|
| $x \in A \cup B$ | $(x\in A) \lor (x \in B)$ |
| $x\in A\cap B$ | $(x\in A)\land(x\in B)$ |
| $x\in A^c$ | $\neg(x\in A)$ |
| $x\in A\setminus B$ | $(x\in A) \land \neg(x\in B)$ |
| $x \in A\mathbin{\triangle}B$ | $x\in A$与$x \in B$中恰有一个成立 |
| $A \subseteq B$ | $\forall x\ \bigl((x\in A) \Rightarrow (x\in B)\bigr)$ |
| $A = B$ | $\forall x\ \bigl((x\in A)\Leftrightarrow(x\in B)\bigr)$ |

正是这部“词典”，使得集合代数看起来与命题代数一模一样。

## 集合代数

::: theorem 集合代数的运算律 {#thm-set-laws}
设$A$、$B$和$C$是全集$U$的子集，则：

1. （交换律）$A\cup B = B\cup A$，$A\cap B = B\cap A$；
2. （结合律）$A\cup(B\cup C) = (A\cup B)\cup C$，$A\cap(B\cap C) = (A\cap B)\cap C$；
3. （分配律）$A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$，$A\cup(B\cap C) = (A\cup B)\cap(A\cup C)$；
4. （同一律与零律）$A \cup\varnothing = A$，$A\cap U = A$，$A\cap\varnothing = \varnothing$，$A \cup U = U$；
5. （补律）$A\cup A^c = U$，$A\cap A^c = \varnothing$，$(A^c)^c = A$；
6. （幂等律）$A\cup A = A$，$A \cap A = A$；
7. （吸收律）$A\cup(A\cap B) = A$，$A\cap(A\cup B) = A$。
:::

::: proof
每条运算律都是命题逻辑的一条定律，应用于任意$x \in U$所对应的命题$p = (x\in A)$、$q = (x\in B)$和$r = (x\in C)$。我们完整地证明第一条分配律；其余各条的证明方法完全相同。设$x\in U$，则

$$
\begin{aligned}
x\in A\cap(B\cup C) &\iff x\in A \ \land\ (x\in B \lor x\in C)\\
&\iff (x\in A\land x\in B) \ \lor\ (x\in A \land x\in C)\\
&\iff x\in A\cap B \ \lor\ x\in A\cap C\\
&\iff x\in (A\cap B)\cup(A\cap C).
\end{aligned}
$$

第二步是命题逻辑的分配律$p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$；其他各步都只是定义。由于$x$是任意的，这两个集合的元素相同。

对于吸收律，$x\in A\cup(A\cap B)$即$p\lor(p\land q)$，而$p \lor (p\land q)\equiv p$：若$p$为真，则两边都为真；若$p$为假，则两边都为假。所以$x \in A\cup(A\cap B) \iff x\in A$。其余各律以同样的方式分别对应于逻辑中的交换律、结合律、同一律、补律和幂等律。
:::

这类运算律也可以用双向包含的“追踪元素”方式来证明，而不必援引任何逻辑定律。下面对最重要的一对运算律这样做。

::: theorem 集合的德摩根律 {#thm-set-de-morgan}
对任意集合$A$、$B$和$C$，

$$
C\setminus(A\cup B) = (C\setminus A)\cap(C\setminus B) \qquad\text{以及}\qquad C\setminus(A\cap B) = (C\setminus A)\cup(C\setminus B).
$$

特别地，对全集$U$的子集，有$(A\cup B)^c = A^c\cap B^c$和$(A\cap B)^c = A^c\cup B^c$。
:::

::: proof
*第一式，$\subseteq$*。设$x\in C\setminus(A\cup B)$，则$x\in C$且$x\notin A\cup B$。如果$x$属于$A$，它就会属于$A\cup B$，所以$x\notin A$；同理$x\notin B$。因此$x\in C\setminus A$且$x\in C\setminus B$，所以$x\in(C\setminus A)\cap(C\setminus B)$。

*第一式，$\supseteq$*。设$x\in (C\setminus A)\cap(C\setminus B)$，则$x\in C$，$x\notin A$且$x\notin B$。$A\cup B$的每个元素都属于$A$或属于$B$，所以$x\notin A\cup B$，从而$x\in C\setminus(A\cup B)$。

*第二式，$\subseteq$*。设$x\in C\setminus(A\cap B)$，于是$x\in C$且$x\notin A\cap B$。那么$x \notin A$或$x\notin B$，因为如果$x \in A$与$x \in B$都成立，$x$就会属于$A\cap B$。在前一种情形下$x\in C\setminus A$，在后一种情形下$x\in C\setminus B$；无论哪种情形，都有$x\in(C\setminus A)\cup(C\setminus B)$。

*第二式，$\supseteq$*。设$x\in(C\setminus A)\cup(C\setminus B)$。若$x\in C\setminus A$，则$x\in C$且$x\notin A$，所以$x \notin A\cap B$；若$x\in C\setminus B$，同理可得。无论哪种情形，都有$x\in C \setminus (A\cap B)$。

取$C = U$，即得关于补集的结论。
:::

这个证明就是命题的德摩根律$\neg(p\lor q)\equiv \neg p\land\neg q$与$\neg(p\land q) \equiv \neg p\lor\neg q$（[[proofs/propositional-logic#thm-de-morgan]]）逐个元素写出来的形式。用文字来说：要位于并集之外，必须位于每一块之外；而要位于交集之外，只需位于某一块之外。

::: widget venn
sets: 3
expr: A & (B | C)
labels: A; B; C
caption: 区域$A \cap (B \cup C)$。现在输入`(A & B) | (A & C)`——正如分配律所说，得到的是同一个区域。再比较`A | (B & C)`与`(A | B) & (A | C)`。然后检验一条错误的“运算律”，把`A - (B - C)`与`(A - B) - C`对比：两个区域不同，两者相差部分中的任何一点都给出一个反例。
:::

运算律一经证明，就可以像中学代数那样以代数方式组合使用。

::: example 用运算律化简 {#ex-simplify}
证明对$U$的任意子集$A$和$B$，有$(A\cup B)\cap(A\cup B^c) = A$。
::: solution
依次使用第二条分配律（从右往左读）、补律和同一律，得

$$
(A\cup B)\cap(A\cup B^c) = A\cup(B\cap B^c) = A\cup\varnothing = A.
$$

每一步都以[[#thm-set-laws]]中的某一条为依据，因此无需追踪元素。
:::
:::

下面的结果汇集了表达“一个集合包含于另一个集合”的几种说法；每一种都在某些场合下最为方便。

::: proposition 包含关系的等价形式 {#prop-subset-equiv}
对$U$的子集$A$和$B$，下列命题等价：

1. $A\subseteq B$；
2. $A\cap B = A$；
3. $A\cup B = B$；
4. $A\setminus B = \varnothing$；
5. $B^c\subseteq A^c$。
:::

::: proof
我们先证明1 ⇒ 2 ⇒ 3 ⇒ 1，再证明1 ⇔ 4和1 ⇔ 5。

*1 ⇒ 2*。$A\cap B\subseteq A$总是成立。反过来，若$x\in A$，则由1知$x\in B$，所以$x\in A\cap B$。因此$A\cap B = A$。

*2 ⇒ 3*。$B\subseteq A\cup B$总是成立。反过来，设$x\in A\cup B$；那么或者$x\in B$，或者$x\in A = A\cap B$，后者同样给出$x\in B$。所以$A\cup B = B$。

*3 ⇒ 1*。若$x\in A$，则$x\in A\cup B = B$。

*1 ⇔ 4*。$A\setminus B\neq\varnothing$是说存在某个$x$满足$x\in A$且$x\notin B$，这恰好是1的否定。

*1 ⇔ 5*。对每个$x \in U$，蕴涵式$x\in A\Rightarrow x\in B$等价于它的逆否命题$x\notin B\Rightarrow x\notin A$（[[proofs/propositional-logic#thm-contrapositive]]），也就是等价于$x\in B^c\Rightarrow x\in A^c$。
:::

### 否定一个恒等式

只要有一个元素属于一边而不属于另一边，所提出的恒等式就不成立，所以一个小小的例子就足以驳倒它。

::: example 差运算不满足结合律 {#ex-not-assoc}
对任意集合$A$、$B$、$C$，是否都有$A\setminus(B\setminus C) = (A\setminus B)\setminus C$？
::: solution
否。取$A = B = C = \set{1}$，则$B\setminus C = \varnothing$，所以$A\setminus(B\setminus C) = \set{1}$；但$A\setminus B = \varnothing$，所以$(A\setminus B)\setminus C = \varnothing$。两边不相等。

不过，有一个方向的包含总是成立的：$(A\setminus B)\setminus C \subseteq A\setminus(B\setminus C)$。事实上，若$x\in(A\setminus B)\setminus C$，则$x\in A$且$x\notin B$；既然$x\notin B$，当然有$x\notin B\setminus C$，所以$x\in A\setminus(B\setminus C)$。这个反例说明了反向包含在哪里失效：$A\cap B\cap C$的元素（如上面的$1$）属于左边而不属于右边。（事实上$A\setminus(B\setminus C) = (A\setminus B)\cup(A\cap C)$，你可以用下面注记中的方法证明它。）
:::
:::

::: remark 隶属表
对于只涉及有限个集合以及运算$\cup$、$\cap$、$\setminus$和${}^c$的恒等式，有一种机械的检验方法。相对于$k$个集合而言，$U$的元素$x$具有$2^k$种**隶属模式**之一（对每个集合，属于或不属于），而$x$是否属于由这些集合构造出来的集合，只取决于它的隶属模式。因此，一个恒等式成立当且仅当两边对每种模式都一致——也就是恰好当相应的命题公式逻辑等价时，而这可以用真值表来判定（[[proofs/propositional-logic]]）。这才是维恩图中各个区域真正代表的东西：每个区域就是一种隶属模式。图不是证明，但一张完整的模式表是证明。
:::

下面把这种方法用于对称差。

::: proposition 对称差的性质 {#prop-symmetric-difference}
对$U$的任意子集$A$、$B$、$C$：

1. $A\mathbin{\triangle} B = B\mathbin{\triangle} A$；
2. $(A\mathbin{\triangle} B)\mathbin{\triangle} C = A\mathbin{\triangle}(B\mathbin{\triangle} C)$；
3. $A\mathbin{\triangle}\varnothing = A$，$A\mathbin{\triangle} A = \varnothing$。
:::

::: proof
按定义，$x \in A\mathbin{\triangle} B$当且仅当$x$恰属于$A$与$B$二者之一，这个条件关于$A$和$B$是对称的。若$B = \varnothing$，“恰属于其一”就是“属于$A$”，所以$A \mathbin{\triangle}\varnothing = A$；若$B = A$，则没有元素恰属于二者之一，所以$A\mathbin{\triangle} A = \varnothing$。为证结合律，我们把全部八种隶属模式列成表，用$1$表示“属于”，用$0$表示“不属于”：

| $A$ | $B$ | $C$ | $A\mathbin{\triangle} B$ | $(A\mathbin{\triangle} B)\mathbin{\triangle} C$ | $B\mathbin{\triangle} C$ | $A\mathbin{\triangle}(B\mathbin{\triangle} C)$ |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 | 1 |
| 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |

第五列与第七列在每一行都相同，所以这两个集合相等。（两者都由恰好属于$A$、$B$、$C$中奇数个集合的元素组成。）
:::

::: quiz
对$U$的任意子集$A$和$B$，下列哪一项等于$(A\cap B^c)^c$？
- [ ] $A^c\cap B$
- [x] $A^c\cup B$
- [ ] $A\cup B^c$
- [ ] $(A\cup B)^c$
::: solution
由德摩根律（[[#thm-set-de-morgan]]）以及$(B^c)^c = B$，得$(A\cap B^c)^c = A^c\cup (B^c)^c = A^c\cup B$。用逻辑的语言来说，$\neg(p\land\neg q) \equiv \neg p\lor q$，它等价于$p\Rightarrow q$。与此一致，$(A\cap B^c)^c = U$成立当且仅当$A\cap B^c = A \setminus B = \varnothing$，即当且仅当$A \subseteq B$（[[#prop-subset-equiv]]）。
:::
:::

## 幂集

::: definition 幂集 {#def-power-set}
集合$A$的**幂集**是$A$的所有子集组成的集合：

$$
\mathcal{P}(A) = \set{S : S\subseteq A}.
$$

于是$S\in\mathcal{P}(A)$当且仅当$S\subseteq A$。
:::

例如，$\mathcal P(\set{a,b,c})$有八个元素：

$$
\varnothing,\quad \set{a},\quad \set{b},\quad \set{c},\quad \set{a,b},\quad \set{a,c},\quad \set{b,c},\quad \set{a,b,c}.
$$

$\varnothing$和$A$本身总属于$\mathcal{P}(A)$。即使是空集也有子集：$\mathcal{P}(\varnothing) = \set{\varnothing}$，它有一个元素；而$\mathcal{P}(\mathcal{P}(\varnothing)) = \mathcal{P}(\set{\varnothing}) = \set{\varnothing, \set{\varnothing}}$有两个元素。个数$8$、$1$和$2$都是$2$的幂，这并非偶然。

::: theorem 幂集的大小 {#thm-power-set-size}
若$A$是有限集且$\abs{A} = n$，则$\abs{\mathcal{P}(A)} = 2^n$。
:::

::: proof
对$n \ge 0$用数学归纳法（[[proofs/induction#cor-induction-n0]]）。

*归纳基础*。若$n = 0$，则$A = \varnothing$，它唯一的子集是$\varnothing$，所以$\abs{\mathcal{P}(A)} = 1 = 2^0$。

*归纳步骤*。设$n \ge 0$，假设每个含$n$个元素的集合都恰有$2^n$个子集，并设$\abs{A} = n+1$。取一个元素$a\in A$，令$A' = A\setminus\set{a}$，于是$\abs{A'} = n$。把$A$的子集分成两个不相交的类。

- 不含$a$的子集恰好是$A'$的子集；由归纳假设，这样的子集共有$2^n$个。
- 含$a$的子集形如$S = T\cup\set{a}$，其中$T = S\setminus\set{a}\subseteq A'$。反过来，对每个$T \subseteq A'$，$T \cup\set{a}$都是这样的子集，而且不同的$T$给出不同的$T\cup \set{a}$，因为去掉$a$就能还原出$T$。所以这一类子集与$A'$的子集一一对应，也有$2^n$个。

因此$\abs{\mathcal{P}(A)} = 2^n + 2^n = 2^{n+1}$，归纳完成。
:::

::: intuition 把子集看作一串是/否选择
$\set{a_1,\dots,a_n}$的一个子集由$n$个相互独立的问题“$a_i$在不在其中？”的答案确定，每个问题有两种可能的答案。把答案记成由$1$（在）和$0$（不在）组成的字符串，就把子集与长度为$n$的二进制串对应起来；当$n = 3$时，串$101$代表$\set{a_1, a_3}$。这样的串共有$2^n$个——这正是[[discrete/counting]]中乘法原理的应用。这个串称为该子集的**特征向量**，计算机正是这样存储小集合的子集的：把它存为单个整数的各个二进制位。
:::

::: example 交集与并集的幂集 {#ex-power}
证明对任意集合$A$和$B$，有$\mathcal{P}(A\cap B) = \mathcal{P}(A)\cap\mathcal{P}(B)$。$\mathcal{P}(A\cup B) = \mathcal{P}(A)\cup\mathcal{P}(B)$是否成立？
::: solution
对任意集合$S$，

$$
S\in\mathcal{P}(A\cap B) \iff S\subseteq A\cap B \iff \bigl(S\subseteq A \text{ 且 } S\subseteq B\bigr) \iff S\in \mathcal{P}(A)\cap\mathcal{P}(B).
$$

中间一步值得验证一下。若$S\subseteq A\cap B$，则$S$的每个元素既属于$A$又属于$B$，所以$S\subseteq A$且$S \subseteq B$。反过来，若$S\subseteq A$且$S\subseteq B$，则每个$x \in S$都同时属于两者，因而属于$A\cap B$。所以第一个恒等式成立。

第二个等式一般不成立。取$A = \set{1}$，$B = \set{2}$，则集合$\set{1,2}$是$A\cup B$的子集，所以$\set{1,2}\in\mathcal{P}(A\cup B)$；但$\set{1,2}$既不是$A$的子集，也不是$B$的子集，所以$\set{1,2}\notin\mathcal{P}(A)\cup\mathcal{P}(B)$。一般只有一个方向的包含成立：若$S\subseteq A$或$S\subseteq B$，则$S\subseteq A\cup B$，所以$\mathcal{P}(A)\cup\mathcal{P}(B)\subseteq\mathcal{P}(A\cup B)$。计数可以看出它离相等有多远：这里$\mathcal{P}(A)\cup\mathcal{P}(B) = \set{\varnothing, \set1, \set2}$有$3$个元素，而$\mathcal{P}(A\cup B)$有$4$个。
:::
:::

## 有序对与笛卡儿积

集合不考虑顺序，但坐标要考虑顺序：平面上的点$(1,2)$不是点$(2,1)$。我们需要具有如下特征性质的**有序对**$(a,b)$：

$$
(a,b) = (c,d) \iff a = c \text{ 且 } b = d.
$$ {#eq-pair}

我们可以把有序对当作一个新的原始概念，但令人欣喜的是，仅用集合就足够了。

::: theorem 库拉托夫斯基（Kuratowski）有序对 {#thm-kuratowski}
定义$(a,b) = \set{\set{a},\set{a,b}}$，则$(a,b) = (c,d)$当且仅当$a = c$且$b = d$。
:::

::: proof {collapsed}
若$a = c$且$b = d$，则两个集合由相同的成分构成，因而相等。反过来，设$\set{\set{a},\set{a,b}} = \set{\set{c},\set{c,d}}$。

*情形$a = b$*。左边是$\set{\set{a}}$，只有一个元素。因此右边也只有一个元素，所以$\set{c} = \set{c,d}$，这迫使$d = c$。于是由$\set{\set{a}} = \set{\set{c}}$得$\set{a} = \set{c}$，所以$a = c$，并且$b = a = c = d$。

*情形$a\neq b$*。此时$\set{a}\ne\set{a,b}$，所以左边恰有两个元素，一个含一个元素，另一个含两个元素。右边也必须有一个含两个元素的成员，所以$c\ne d$。左边的单元素成员$\set{a}$必须等于右边的单元素成员$\set{c}$，所以$a = c$。于是两个二元素成员也必须相等：$\set{a,b} = \set{c,d} = \set{a,d}$。由于$b\in\set{a,d}$且$b\ne a$，得$b = d$。
:::

实际上没有人会把$(1,2)$想成$\set{\set1,\set{1,2}}$。这个定理的意义在于奠定基础：有序对——以及由有序对构造出来的函数和关系——不需要集合公理以外的任何公理。此后我们只会用到性质[[#eq-pair]]。

::: definition 笛卡儿积 {#def-cartesian-product}
集合$A$与$B$的**笛卡儿积**是第一个分量属于$A$、第二个分量属于$B$的所有有序对组成的集合：

$$
A\times B = \set{(a,b) : a\in A,\ b\in B}.
$$

更一般地，$A_1\times\cdots\times A_n$是满足每个$a_i\in A_i$的有序$n$元组$(a_1,\dots,a_n)$组成的集合，而$A^n = A\times\cdots\times A$（共$n$个因子）。
:::

平面$\R^2 = \R\times\R$是最基本的例子；这个名称是为了纪念勒内·笛卡儿（René Descartes）和他的坐标。棋盘上的方格构成$\set{a,b,\dots,h}\times[8]$，而矩形$[0,2]\times[0,1]$是区间的乘积。若$A$和$B$是有限集，则$\abs{A\times B} = \abs{A}\cdot\abs{B}$，因为$\abs A$个可能的第一分量中的每一个都可以与$\abs B$个可能的第二分量中的每一个搭配。注意一般$A\times B\neq B\times A$——对$A = \set1$和$B = \set2$，两者唯一的元素分别是$(1,2)$和$(2,1)$——还要注意$A\times\varnothing = \varnothing$，因为没有可取的第二分量。

::: example 交集的积与并集的积 {#ex-products}
证明$(A\times B)\cap(C\times D) = (A\cap C)\times(B\cap D)$，并说明对并集的相应结论不成立。
::: solution
两边都由有序对组成，因此设$(x,y)$是任一有序对。由[[#eq-pair]]和定义，

$$
\begin{aligned}
(x,y)\in(A\times B)\cap(C\times D) &\iff (x\in A\land y\in B)\land(x\in C\land y\in D)\\
&\iff (x\in A\land x\in C)\land(y\in B\land y\in D)\\
&\iff (x,y)\in (A\cap C)\times(B\cap D),
\end{aligned}
$$

其中中间一步只是把四个命题的合取重新排列。

对于并集，包含关系$(A\times B)\cup(C\times D)\subseteq (A\cup C)\times(B\cup D)$总成立，但等号可能不成立。取$A = B = [0,1]$，$C = D = [2,3]$。左边是平面上两个分离的单位正方形。右边是$([0,1]\cup[2,3])\times([0,1]\cup[2,3])$，它由四个正方形组成，例如包含点$(0, 2)$。但$(0,2)\notin [0,1]\times[0,1]$且$(0,2) \notin[2,3]\times[2,3]$。
:::
:::

## 带指标的集族

分析和概率论需要无穷多个集合的并与交。如果对**指标集**$I$中的每个$i$都给定了一个集合$A_i$，就称$(A_i)_{i\in I}$为一个**带指标的集族**。

::: definition 集族的并与交 {#def-indexed}
设$(A_i)_{i\in I}$是带指标的集族。它的**并**以及（当$I \ne \varnothing$时）它的**交**分别为

$$
\bigcup_{i\in I}A_i = \set{x : x\in A_i \text{ 对某个 } i\in I}, \qquad \bigcap_{i\in I}A_i = \set{x : x\in A_i \text{ 对每个 } i\in I}.
$$

当$I = \N$时，也写作$\bigcup_{n=1}^\infty A_n$和$\bigcap_{n=1}^\infty A_n$。如果只要$i\ne j$就有$A_i\cap A_j = \varnothing$，就称该集族**两两不相交**。
:::

现在量词登上了中心舞台：属于并集是一个存在命题，属于交集是一个全称命题。为什么对交要排除$I = \varnothing$？每个对象$x$都空真地满足“对每个$i\in\varnothing$，$x\in A_i$”，所以空集族的交将包含一切——而我们将在本章末尾看到，不存在包含一切的集合。（在固定的全集$U$内，约定空集族的交为$U$。）

::: example 收缩的区间与扩张的区间 {#ex-nested}
证明

$$
\bigcap_{n=1}^{\infty}\Bigl(-\frac1n,\frac1n\Bigr) = \set{0} \qquad\text{以及}\qquad \bigcup_{n=1}^{\infty}\Bigl[\frac1n,1\Bigr] = (0,1].
$$
::: solution
*交*。对每个$n$都有$-\frac1n < 0 < \frac1n$，所以$0$属于每个区间，从而$\set{0}\subseteq\bigcap_n(-\frac1n,\frac1n)$。反过来，设$x\neq 0$。由$\R$的阿基米德（Archimedes）性质（[[real-analysis/real-numbers]]），存在$n\in\N$使$n > 1/\abs{x}$，即$\abs{x} > \frac1n$。于是$x\notin(-\frac1n,\frac1n)$，所以$x$不在交集中。因此交集恰为$\set{0}$。

*并*。由于$\frac1n > 0$，每个区间$[\frac1n,1]$都包含于$(0,1]$，所以并集包含于$(0,1]$。反过来，设$x\in(0,1]$。取$n \in \N$使$n\ge 1/x$（再次用到阿基米德性质）；则$\frac1n\le x\le 1$，所以$x\in[\frac1n,1]$，从而$x$属于并集。

注意在$0$处发生了什么。并中的每个区间都与$0$保持一定距离，但合在一起它们可以任意接近$0$，却不包含$0$；而无穷多个**开**区间的交是单点集$\set 0$，它根本不包含任何开区间。这类现象正是[[topology/topological-spaces]]的出发点。
:::
:::

第三个例子同样富有启发性：$\bigcap_{n=1}^\infty [n,\infty) = \varnothing$，因为一旦$n > x$，实数$x$就不属于$[n,\infty)$。所以一列递减的非空集合的交可以是空集。对于**有界闭**区间，这种情况不会发生（$\R$的区间套性质），分析中许多存在性定理都以这一事实为基础。

::: quiz
$\displaystyle\bigcap_{n=1}^{\infty}\Bigl(0,\frac1n\Bigr)$等于什么？
- [ ] $\set{0}$
- [x] $\varnothing$
- [ ] $(0,1)$
- [ ] 没有定义，因为区间不断缩小
::: solution
数$0$不属于任何一个区间，因为这些区间在$0$处是开的。数$x > 0$在$n \ge 1/x$时不属于$(0,\frac1n)$，负数则不属于其中任何一个区间。所以没有实数属于每一个区间，交集是空集。对比[[#ex-nested]]，那里的区间$(-\frac1n,\frac1n)$都包含$0$。
:::
:::

德摩根律可以推广到任意集族，而此时它们的逻辑内涵——量词的否定——就一目了然了。

::: theorem 集族的德摩根律 {#thm-general-de-morgan}
设$(A_i)_{i\in I}$是由$U$的子集组成的集族，且$I\neq\varnothing$，则

$$
\Bigl(\bigcup_{i\in I}A_i\Bigr)^c = \bigcap_{i\in I}A_i^c \qquad\text{以及}\qquad \Bigl(\bigcap_{i\in I}A_i\Bigr)^c = \bigcup_{i\in I}A_i^c.
$$
:::

::: proof
对$x\in U$，由量词的否定规则（[[proofs/quantifiers#thm-negation]]）得

$$
\begin{aligned}
x\in\Bigl(\bigcup_{i\in I}A_i\Bigr)^c &\iff \neg\bigl(\exists i\in I : x\in A_i\bigr) \iff \forall i\in I : x\notin A_i \iff x\in\bigcap_{i\in I}A_i^c,\\
x\in\Bigl(\bigcap_{i\in I}A_i\Bigr)^c &\iff \neg\bigl(\forall i\in I : x\in A_i\bigr) \iff \exists i\in I : x\notin A_i \iff x\in\bigcup_{i\in I}A_i^c.
\end{aligned}
$$

由于$x$是任意的，两个恒等式都成立。
:::

::: application 数据库与搜索引擎中的集合
数据库查询语言建立在集合运算之上。在 SQL 中，`UNION`、`INTERSECT` 和 `EXCEPT` 分别按$\cup$、$\cap$和$\setminus$的方式合并两个查询的结果；`WHERE` 子句就是描述法；而连接（join）在概念上就是两个表的笛卡儿积，其中只保留相互匹配的行对。搜索引擎把每个词看作包含它的文档的集合，所以查询 *cats AND dogs NOT birds*（猫 AND 狗 NOT 鸟）要求的是$(C\cap D)\setminus B$，它通过合并文档编号的有序列表来计算。查询优化器正是利用[[#thm-set-laws]]中的运算律来改写查询，使其运行得更快。
:::

## 罗素悖论

按照我们的用法，描述法$\set{x\in A : P(x)}$总是从一个已有的集合$A$中划分出一个集合。为什么不允许$\set{x : P(x)}$，即具有性质$P$的**所有**对象组成的集合呢？因为这会导致矛盾。

::: theorem 罗素（Russell）悖论 {#thm-russell}
不存在这样的集合$R$：对每个集合$x$，都有$\ x\in R \iff x\notin x$。因此，不存在由所有集合组成的集合。
:::

::: proof
假设这样的集合$R$存在。由于条件对**每个**集合$x$都成立，它对$x = R$也成立：$R\in R \iff R\notin R$。一个与自身的否定等价的命题是矛盾式（若$R \in R$，则$R \notin R$；若$R \notin R$，则$R \in R$）。所以这样的$R$不存在。

现在假设存在一个包含所有集合的集合$V$。按允许的方式从$V$中划分出一个子集，$R = \set{x\in V : x\notin x}$就是一个集合，而且对每个集合$x$（它们都属于$V$），都有$x\in R\iff x\notin x$，而我们刚刚证明了这是不可能的。
:::

这个悖论并不涉及什么奇特的东西：性质“$x\notin x$”看起来无害，然而“具有这一性质的所有$x$组成的集合”却不可能存在。现代集合论采用的补救办法是：用一组公理准确地规定哪些构造能产生集合——配对、并、幂集、由性质划分出的子集，以及其他少数几种。标准的公理组是带选择公理的策梅洛-弗兰克尔（Zermelo–Fraenkel）公理，简记为**ZFC**。在日常的数学中，我们根本不会接近这些悖论，因为我们总是在已有的集合内构造集合（写$\set{x\in\R : x^2<2}$，而绝不说“满足$x^2 < 2$的所有$x$组成的集合”），而这也就是本课程所需要的全部谨慎。

::: history
集合论作为数学的一个分支，是由格奥尔格·康托尔（Georg Cantor）在19世纪70年代至90年代创立的，最初源于他关于三角级数唯一性的研究；他关于无限集的发现是[[proofs/cardinality]]一章的主题。这类图示比集合论本身更古老：莱昂哈德·欧拉（Leonhard Euler）在写于18世纪60年代初的《致一位德国公主的信》（*Letters to a German Princess*）中用相交的圆来解释逻辑命题，而约翰·维恩（John Venn）在1880年引入了以他的名字命名的系统化图示。属于符号可以追溯到朱塞佩·皮亚诺（Giuseppe Peano），他在1889年使用了希腊字母ε，即ἐστί（“是”）的首字母。1900年前后，人们发现不加限制地使用描述法会导致矛盾：伯特兰·罗素（Bertrand Russell）于1901年发现了他的悖论，并于1902年6月写信告诉戈特洛布·弗雷格（Gottlob Frege），这一悖论动摇了弗雷格为算术建立的逻辑基础。恩斯特·策梅洛（Ernst Zermelo）于1908年提出的公理，经亚伯拉罕·弗兰克尔（Abraham Fraenkel）和图拉尔夫·斯科伦（Thoralf Skolem）于1922年扩充，限制了集合的构造方式，至今仍是数学的标准基础。
:::

## 后续内容

本课程后面的一切内容都建立在集合之上。函数是有序对的集合（[[proofs/functions]]），关系是笛卡儿积的子集（[[proofs/relations]]），而比较无限集的大小则引出康托尔定理：$\mathcal{P}(A)$总是严格大于$A$（[[proofs/cardinality]]）——这是$2^n > n$在无限情形下的对应物。在计数中，二项式系数$\binom nk$是$[n]$的$k$元子集的个数（[[discrete/counting]]），而公式$\abs{A\cup B} = \abs A + \abs B - \abs{A\cap B}$发展为容斥原理（[[discrete/advanced-counting]]）。在概率论中，事件是样本空间的子集，“或”对应于并，“非”对应于补（[[probability/probability-spaces]]）；测度论需要可数并与可数交（[[measure-theory/sigma-algebras]]）；而拓扑学建立在对任意并和有限交封闭的开集族之上（[[topology/topological-spaces]]）。

::: summary
- 集合由它的元素决定：$A = B$是指两者的元素相同，因此顺序和重复都无关紧要。空集$\varnothing$恰有一个，并且$\set{\varnothing}\neq\varnothing$。
- $A\subseteq B$是指$A$的每个元素都属于$B$；证明它时任取$x\in A$。用双向包含证明$A = B$（[[#thm-subset-props]]）。切勿混淆$\in$与$\subseteq$。
- 并、交、补和差分别对应于“或”“且”“非”和“且非”；集合代数的运算律，包括德摩根律（[[#thm-set-de-morgan]]），都是逻辑定律应用于命题$x\in A$的结果。
- 只要有一个元素属于一边而不属于另一边，就否定了一个恒等式；隶属表可以判定有限个集合之间的恒等式。
- 幂集$\mathcal{P}(A)$是$A$的所有子集组成的集合；对有限集$A$，$\abs{\mathcal{P}(A)} = 2^{\abs A}$。
- 有序对满足：$(a,b) = (c,d)$当且仅当$a=c$且$b=d$；笛卡儿积$A\times B$是所有这样的有序对组成的集合，且$\abs{A\times B} = \abs A\,\abs B$。
- 集族的并与交分别是存在命题与全称命题；集族的德摩根律就是量词的否定规则。无穷交与无穷并可能出人意料：$\bigcap_n(-\frac1n,\frac1n) = \set0$。
- 不加限制地构造集合会导致罗素悖论；集合要在已有的集合内构造。
:::

## 习题

::: exercise 元素还是子集？ {level=1}
设$A = \set{1, \set{1}, \set{1,2}}$。下列哪些成立？(a) $1\in A$；(b) $\set1\in A$；(c) $\set1\subseteq A$；(d) $\set2\subseteq A$；(e) $\set{1,2}\in A$；(f) $\set{1,2}\subseteq A$；(g) $\varnothing\in A$；(h) $\varnothing\subseteq A$。
::: solution
$A$的元素是$1$、$\set1$和$\set{1,2}$。

(a) 成立。(b) 成立。(c) 成立，因为它唯一的元素$1$属于$A$。(d) 不成立，因为$2\notin A$。(e) 成立。(f) 不成立：$2\in\set{1,2}$，但$2\notin A$。(g) 不成立：$\varnothing$不是这三个元素之一。(h) 成立，对任何集合都是如此（[[#thm-subset-props]]）。
:::
:::

::: exercise 有限集的运算 {level=1}
设$U = [12]$，$A$是$U$中偶数组成的集合，$B$是$U$中$3$的倍数组成的集合。列出$A\cap B$、$A\cup B$、$A\setminus B$、$B\setminus A$、$(A\cup B)^c$和$A\mathbin{\triangle} B$。
::: solution
$A = \set{2,4,6,8,10,12}$，$B = \set{3,6,9,12}$。于是

- $A\cap B = \set{6,12}$（$6$的倍数）；
- $A\cup B = \set{2,3,4,6,8,9,10,12}$；
- $A\setminus B = \set{2,4,8,10}$，$B\setminus A = \set{3,9}$；
- $(A\cup B)^c = \set{1,5,7,11}$；
- $A\mathbin{\triangle} B = (A\setminus B)\cup(B\setminus A) = \set{2,3,4,8,9,10}$。
:::
:::

::: exercise 幂集的幂集 {level=1 check="16"}
列出$\mathcal{P}(\set{a,b})$的元素。$\mathcal{P}(\mathcal{P}(\set{a,b}))$有多少个元素？
::: solution
$\mathcal{P}(\set{a,b}) = \set{\varnothing, \set a, \set b, \set{a,b}}$，有$4$个元素。由[[#thm-power-set-size]]，它的幂集有$2^4 = 16$个元素。
:::
:::

::: exercise 把差表示为交 {level=2}
对$U$的子集$A$、$B$，证明$A\setminus B = A\cap B^c$。利用这一结果和[[#thm-set-laws]]中的运算律，证明$A\setminus(A\setminus B) = A\cap B$。
::: solution
对$x\in U$：$x\in A\setminus B \iff (x\in A \land x\notin B) \iff (x\in A\land x\in B^c) \iff x\in A\cap B^c$。

因此，利用德摩根律以及分配律、补律和同一律，

$$
A\setminus(A\setminus B) = A\cap(A\cap B^c)^c = A\cap(A^c\cup B) = (A\cap A^c)\cup(A\cap B) = \varnothing\cup(A\cap B) = A\cap B.
$$
:::
:::

::: exercise 追踪元素 {level=2}
用双向包含证明：对任意集合$A$、$B$、$C$，有$(A\cup B)\setminus C = (A\setminus C)\cup(B\setminus C)$。
::: solution
*$\subseteq$*。设$x\in(A\cup B)\setminus C$，则$x\notin C$，并且$x\in A$或$x\in B$。若$x\in A$，则$x\in A\setminus C$；若$x\in B$，则$x\in B\setminus C$。无论哪种情形，都有$x\in(A\setminus C)\cup(B\setminus C)$。

*$\supseteq$*。设$x\in(A\setminus C)\cup(B\setminus C)$。若$x\in A\setminus C$，则$x\in A\subseteq A\cup B$且$x\notin C$；若$x \in B\setminus C$，则$x\in B\subseteq A\cup B$且$x\notin C$。无论哪种情形，都有$x\in(A\cup B)\setminus C$。
:::
:::

::: exercise 证明或否定 {level=2}
对下面每个命题，或者证明它对任意集合$A$、$B$、$C$都成立，或者给出反例。
(a) $A\setminus(B\cup C) = (A\setminus B)\setminus C$。
(b) $A\cup(B\cap C) = (A\cup B)\cap C$。
(c) $A\mathbin{\triangle} B = (A\cup B)\setminus(A\cap B)$。
::: hint
先画出每一边的维恩图；它会告诉你应该寻找证明还是寻找反例。
:::
::: solution
(a) 成立。$x\in A\setminus(B\cup C) \iff x\in A \land \neg(x\in B\lor x\in C) \iff x\in A\land x\notin B\land x\notin C \iff x\in (A\setminus B)\setminus C$，中间一步用到了命题的德摩根律。

(b) 不成立。取$A = \set{1}$，$B = C = \varnothing$，则$A\cup(B\cap C) = \set{1}$，但$(A\cup B)\cap C = \varnothing$。

(c) 成立。若$x \in A\mathbin{\triangle}B$，则$x$恰属于$A$、$B$之一：所以$x\in A\cup B$且$x\notin A\cap B$。反过来，若$x\in A\cup B$且$x\notin A\cap B$，则$x$至少属于$A$、$B$之一，但不同时属于两者，所以恰属于其中之一，从而$x\in A\mathbin{\triangle} B$。
:::
:::

::: exercise 无穷并与无穷交 {level=2}
求出$\displaystyle\bigcup_{n=1}^\infty\Bigl[\frac1n,\,2-\frac1n\Bigr]$和$\displaystyle\bigcap_{n=1}^\infty\Bigl(-\frac1n,\,1+\frac1n\Bigr)$，并给出证明。
::: hint
画出前几个区间来猜出答案，然后仿照[[#ex-nested]]。
:::
::: solution
*并集为$(0,2)$*。由于$\frac1n > 0$且$2-\frac1n < 2$，每个区间都满足$[\frac1n, 2-\frac1n] \subseteq (0,2)$。反过来，设$0 < x < 2$。$x$与$2-x$都是正数，所以由阿基米德性质，存在$n\in\N$使$\frac1n\le\min(x,\,2-x)$。于是$\frac1n\le x$且$x\le 2-\frac1n$，所以$x$属于第$n$个区间。

*交集为$[0,1]$*。若$0\le x\le1$，则对每个$n$都有$-\frac1n<0\le x\le 1<1+\frac1n$。反过来，若$x<0$，取$n$使$\frac1n< -x$；则$x < -\frac1n$，所以$x$不属于第$n$个区间。若$x>1$，取$n$使$\frac1n < x-1$；则$x > 1+\frac1n$。所以$[0,1]$以外的任何点都不会属于每一个区间。
:::
:::

::: exercise 含奇数的子集 {level=2 check="992"}
$[10]$有多少个子集至少含有一个奇数？
::: hint
计算补集：完全不含奇数的子集。
:::
::: solution
一个子集不含奇数，当且仅当它是$\set{2,4,6,8,10}$的子集，这样的子集共有$2^5 = 32$个。$[10]$的其他子集（子集总共有$2^{10} = 1024$个）都至少含有一个奇数。答案是$1024 - 32 = 992$。
:::
:::

::: exercise 包含关系与幂集 {level=3}
证明$A\subseteq B$当且仅当$\mathcal{P}(A)\subseteq\mathcal{P}(B)$。
::: solution
（$\Rightarrow$）设$A\subseteq B$，并设$S\in\mathcal{P}(A)$。则$S\subseteq A$且$A\subseteq B$，所以由传递性（[[#thm-subset-props]]），$S\subseteq B$；即$S\in\mathcal{P}(B)$。

（$\Leftarrow$）设$\mathcal{P}(A)\subseteq\mathcal{P}(B)$。由于$A\subseteq A$，有$A\in\mathcal{P}(A)$，因此$A\in\mathcal{P}(B)$，这就是说$A\subseteq B$。
:::
:::

::: exercise 笛卡儿积何时可交换？ {level=3}
证明：若$A$和$B$是非空集合，且$A\times B = B\times A$，则$A = B$。举例说明“非空”这一条件不能去掉。
::: hint
要证明$A\subseteq B$，取$a \in A$，并把它与$B$的某个元素配成有序对。
:::
::: solution
设$a\in A$。由于$B\neq\varnothing$，可以取某个$b\in B$。于是$(a,b)\in A\times B = B\times A$，所以由[[#eq-pair]]，第一个分量$a$属于$B$。因此$A\subseteq B$。交换$A$与$B$的角色（利用$A\neq\varnothing$）得$B\subseteq A$，所以$A = B$。

去掉这个假设，结论就不成立：对$A = \varnothing$和$B = \set1$，有$A\times B = \varnothing = B\times A$，但$A\neq B$。
:::
:::

::: exercise 消去对称差 {level=3}
证明：若$A\mathbin{\triangle} C = B\mathbin{\triangle} C$，则$A = B$。
::: hint
把两边都与$C$作对称差，并利用[[#prop-symmetric-difference]]。
:::
::: solution
利用[[#prop-symmetric-difference]]中的性质（结合律、$C\mathbin{\triangle}C = \varnothing$以及$X\mathbin{\triangle}\varnothing = X$），

$$
A = A\mathbin{\triangle}\varnothing = A\mathbin{\triangle}(C\mathbin{\triangle} C) = (A\mathbin{\triangle} C)\mathbin{\triangle} C = (B\mathbin{\triangle} C)\mathbin{\triangle} C = B\mathbin{\triangle}(C\mathbin{\triangle}C) = B\mathbin{\triangle}\varnothing = B.
$$

（这些性质连同交换律一起表明，$U$的子集在$\mathbin{\triangle}$下构成一个群，单位元为$\varnothing$，每个集合都是自身的逆元；参见[[abstract-algebra/groups]]。）
:::
:::
