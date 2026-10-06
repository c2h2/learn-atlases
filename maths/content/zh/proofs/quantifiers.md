比较下面两个关于实数的句子，它们所用的词完全相同，只是次序不同：

1. 对每个实数$x$，存在实数$y$，使得$y > x$。
2. 存在实数$y$，使得对每个实数$x$，$y > x$。

第一句是真的：无论你说出哪个$x$，$y = x + 1$都比它大。第二句是假的：它断言存在一个比每个实数都大的数，而这样的数并不存在（它必须比它自己还大）。两句唯一的区别在于“对每个”与“存在”的次序。

分析学的定义中充满了这样的说法。称数列$(a_n)$收敛于$L$，是指**对每个**$\eps > 0$，**存在**$N$，使得**对所有**$n \ge N$，$\abs{a_n - L} < \eps$。要运用这样的定义，或者要证明一个数列**不**收敛，你必须能够不假思索地阅读、变换和否定含有多个量词的命题。[[proofs/propositional-logic|上一章]]的主题——命题逻辑——把命题当作不可分割的单元；本章则深入命题内部，考察它们所谈论的对象。

## 谓词

像“$n$是素数”这样的句子不是命题：它在$n = 7$时为真，在$n = 8$时为假。一旦我们说明指的是哪个$n$，它就成为一个命题。

::: definition 谓词 {#def-predicate}
**谓词**（或**开语句**）$P(x)$是一个含有变元$x$的句子，每当用一个指定集合$D$中的元素替换$x$时，它就成为一个命题；集合$D$称为**论域**（或个体域）。更一般地，谓词$P(x_1, \dots, x_k)$可以含有多个变元，每个变元有各自的论域。$P(x)$的**真值集**是使$P(a)$为真的元素$a \in D$构成的集合。
:::

例如，取论域为$\Z$：

- $P(n)$：“$n$是偶数”在$n = 4$时为真，在$n = 7$时为假；它的真值集是全体偶数构成的集合。
- $Q(x, y)$：“$x < y$”是一个含两个变元的谓词；$Q(2, 5)$为真，$Q(5, 2)$为假。
- $R(x)$：“$x^2 - 5x + 6 = 0$”的真值集为$\set{2, 3}$。

在本课程中，$\N = \set{1, 2, 3, \dots}$表示正整数集，$\N_0 = \set{0, 1, 2, \dots}$；对于是否有$0 \in \N$，不同的书约定不同，所以务必核实所用的约定。

把谓词变成命题有两种方式。一种是代入一个值。另一种是说明它对变元的**多少个**值成立——对所有值，还是至少对一个值。

## 两种量词

::: definition 全称量词与存在量词 {#def-quantifiers}
设$P(x)$是论域为$D$的谓词。

- **全称命题**$\forall x \in D,\ P(x)$读作“对$D$中所有$x$，$P(x)$”；若对每个$a \in D$，$P(a)$都为真，则它为真，否则为假。
- **存在命题**$\exists x \in D,\ P(x)$读作“存在$D$中的$x$，使得$P(x)$”；若至少对一个$a \in D$，$P(a)$为真，则它为真，否则为假。

符号$\forall$和$\exists$分别称为**全称量词**和**存在量词**。
:::

如果论域是有限的，比如$D = \set{a_1, \dots, a_n}$，那么量词不过是长长的合取和析取：

$$
\forall x \in D,\ P(x) \;\equiv\; P(a_1) \land P(a_2) \land \dots \land P(a_n), \qquad \exists x \in D,\ P(x) \;\equiv\; P(a_1) \lor P(a_2) \lor \dots \lor P(a_n).
$$

对无限的论域，这样的展开是不可能的，这正是量词真正新颖之处。

::: remark 空论域
如果$D = \varnothing$，那么无论$P$是什么，$\exists x \in D,\ P(x)$都为假（没有任何东西可以充当见证），而$\forall x \in D,\ P(x)$为**真**：$D$中没有使$P$不成立的元素。这是空真的量词形式。“这个房间里的每只独角兽都是紫色的”是真的，因为对每个$x$，$\forall x\,(x \text{ 是这个房间里的独角兽} \Rightarrow x \text{ 是紫色的})$中的假设都为假。空真并不是一种诡辩；正是它使得“$\varnothing$的每个元素都属于$A$”这样的命题——从而$\varnothing \subseteq A$——对每个集合$A$都成立（[[proofs/sets]]）。
:::

$\forall x \in D,\ P(x)$中的变元$x$是**约束的**：这个命题谈论的是$P$和$D$，而不是某个特定的$x$，把$x$改名为$t$不会改变任何东西——正如$\int_0^1 x^2\,dx = \int_0^1 t^2\,dt$。没有被量词约束的变元是**自由的**，含有自由变元的命题仍然是一个谓词。

::: example 论域很重要 {#ex-domain}
判断下列各命题的真假。

1. $\forall x \in \R,\ x^2 \ge 0$。
2. $\exists x \in \R,\ x^2 = 2$。
3. $\exists x \in \Q,\ x^2 = 2$。
4. $\forall n \in \N,\ n^2 \ge n$。
5. $\forall n \in \Z,\ n^2 > n$。
::: solution
1. 真：实数的平方从不为负。
2. 真：$x = \sqrt 2$就是一个见证。
3. 假：$\sqrt 2$是无理数（[[proofs/proof-techniques#thm-sqrt2]]），所以没有哪个有理数的平方等于$2$。命题2和命题3只有论域不同。
4. 真：对$n \ge 1$，把$n \ge 1$两边乘以$n > 0$，得$n^2 \ge n$。
5. 假：$n = 0$给出$0 > 0$，这是假的。（$n = 1$也是如此。）一个反例就足以使全称命题为假。
:::
:::

### 受限量词与翻译

变元常常在一个很大的论域中取值，但命题只涉及具有某种性质的元素。“每个大于$2$的素数都是奇数”是对大于$2$的素数进行量化；用论域$\N$来写，它就是

$$
\forall n \in \N,\ \bigl( (n \text{ 是素数} \land n > 2) \Rightarrow n \text{ 是奇数} \bigr).
$$

类似地，“某个素数是偶数”就是$\exists n \in \N,\ (n \text{ 是素数} \land n \text{ 是偶数})$。这个模式值得记住：**全称量词与蕴涵搭配，存在量词与合取搭配**。我们把这类命题简写为$\forall n > 2,\ \dots$或$\exists p \text{ 为素数},\ \dots$，但这些简写的含义就是展开后的形式。

::: warning ∃与∧搭配，而不是与⇒搭配
把“某个素数是偶数”写成$\exists n \in \N,\ (n \text{ 是素数} \Rightarrow n \text{ 是偶数})$是一个典型的错误。对每个不是素数的$n$，这个蕴涵都（空）真，所以$n = 4$、$n = 9$……都是这个命题的见证，而它对素数根本什么也没说。同样，“每个素数都是奇数”**不是**$\forall n,\ (n \text{ 是素数} \land n \text{ 是奇数})$，后者断言每个自然数都是奇素数。
:::

::: example 译成符号 {#ex-translate-q}
用符号写出下列各命题。

1. 每个正实数都有平方根。
2. 有某个整数不是整数的平方。
3. 没有奇数能被$4$整除。
4. 函数$f\colon \R \to \R$有界。
::: solution
1. $\forall x \in \R,\ \bigl(x > 0 \Rightarrow \exists y \in \R,\ y^2 = x\bigr)$，或者用受限量词写成$\forall x > 0\ \exists y \in \R,\ y^2 = x$。
2. $\exists n \in \Z\ \forall m \in \Z,\ m^2 \neq n$。（“不是任何整数的平方”是关于$m$的全称命题。）
3. “没有$A$是$B$”的意思是“每个$A$都不是$B$”：$\forall n \in \Z,\ (n \text{ 为奇数} \Rightarrow 4 \nmid n)$。等价地，$\neg\,\exists n \in \Z,\ (n \text{ 为奇数} \land 4 \mid n)$。
4. 有界是指有同一个界$M$对每个输入都适用：$\exists M \in \R\ \forall x \in \R,\ \abs{f(x)} \le M$。
:::
:::

含有多个量词的命题从左向右阅读，每个量词管辖它右边的全部内容。在$\forall x\ \exists y\ \forall z,\ P(x,y,z)$中，$y$的选取可以依赖于$x$，但不能依赖于$z$。

::: example 含嵌套量词的命题 {#ex-nested}
用符号写出：(a) 素数有无穷多个；(b) 任意两个不同的实数之间都有一个有理数；(c) 方程$x^2 = a$对每个$a \ge 0$都有实数解，但并非对每个实数$a$都有实数解。
::: solution
(a) “无穷多个”不是量词，所以我们换一种说法：无论我们说出多大的数，总有一个比它大的素数。

$$
\forall n \in \N\ \exists p \in \N,\ (p > n \land p \text{ 是素数}).
$$

(b) “任意两个不同的”是指所有满足$x \neq y$的数对$x, y$；我们可以适当命名，使得$x < y$：

$$
\forall x \in \R\ \forall y \in \R,\ \bigl(x < y \Rightarrow \exists q \in \Q,\ x < q < y\bigr).
$$

(c) 这是两个命题的合取，其中第二个命题被否定：

$$
\bigl(\forall a \ge 0\ \exists x \in \R,\ x^2 = a\bigr) \land \neg\bigl(\forall a \in \R\ \exists x \in \R,\ x^2 = a\bigr).
$$

由下面的[[#thm-negation]]，第二部分等价于$\exists a \in \R\ \forall x \in \R,\ x^2 \neq a$——$a = -1$就是一个见证。
:::
:::

### 隐含的量词

数学中的日常表述常常不把量词说出来；阅读数学的一项工作，就是把它们补回去。

- “如果$x > 2$，那么$x^2 > 4$”的意思是$\forall x \in \R,\ (x > 2 \Rightarrow x^2 > 4)$。含自由变元的条件句几乎总是按全称的意思来理解。
- “$(x+1)^2 = x^2 + 2x + 1$”是一个**恒等式**，即关于所有$x$的全称命题；而“解方程$x^2 = 2x + 3$”要求的是一个谓词的真值集，“$x^2 = 2x + 3$有解”则是存在命题。
- “$[a,b]$上的一个连续函数是有界的”指的是**每个**这样的函数，尽管句中说的是“一个”。
- “对任意$\eps > 0$”的意思是“对所有$\eps > 0$”。但“如果任何一个$x$使$f(x) = 0$，那么……”就有歧义，既可以理解为“对所有$x$”，也可以理解为“对某个$x$”。写明“对所有”或“对某个”，问题就消失了。

书写数学时，要把每个量词都明确写出；阅读数学时，要先找出隐含的量词，再着手证明。

有些命题断言**恰有一个**对象具有某种性质。

::: definition 唯一存在 {#def-unique}
$\exists!\, x \in D,\ P(x)$读作“$D$中存在唯一的$x$，使得$P(x)$”，它的意思是

$$
\exists x \in D,\ \Bigl(P(x) \land \forall y \in D,\ \bigl(P(y) \Rightarrow y = x\bigr)\Bigr).
$$
:::

因此，唯一存在性的证明分两部分：**存在性**（找到一个满足$P(x)$的$x$）和**唯一性**（证明任意两个具有性质$P$的对象相等）。例如，$\exists!\, x \in \R,\ 3x - 7 = 2$：数$x = 3$满足要求；而若$3a - 7 = 2$且$3b - 7 = 2$，则$3a = 3b$，所以$a = b$。

## 含量词命题的否定

要证明一个全称命题为假，只需一个反例：“并非每个素数都是奇数”与“某个素数不是奇数”是一回事。要证明一个存在命题为假，则必须排除每一个候选者：“不存在满足$x^2 = 2$的有理数$x$”与“每个有理数$x$都满足$x^2 \neq 2$”是一回事。这些就是德摩根律的量词版本。

::: theorem 量词的否定 {#thm-negation}
对论域为$D$的任一谓词$P(x)$，

$$
\neg\bigl(\forall x \in D,\ P(x)\bigr) \;\equiv\; \exists x \in D,\ \neg P(x), \qquad \neg\bigl(\exists x \in D,\ P(x)\bigr) \;\equiv\; \forall x \in D,\ \neg P(x).
$$
:::

::: proof
先证第一个：$\forall x \in D,\ P(x)$为假，恰好是指并非对每个$a \in D$都有$P(a)$成立，也就是至少存在一个$a \in D$使$P(a)$为假。这恰好是说$\exists x \in D,\ \neg P(x)$为真。所以两边在完全相同的情形下为真。

对第二个，把第一个应用于谓词$\neg P(x)$：$\neg\bigl(\forall x,\ \neg P(x)\bigr) \equiv \exists x,\ \neg\neg P(x) \equiv \exists x,\ P(x)$。两边同时取否定，得到$\forall x,\ \neg P(x) \equiv \neg\bigl(\exists x,\ P(x)\bigr)$。
:::

当$D = \set{a_1, \dots, a_n}$有限时，这个定理恰好就是把德摩根律[[proofs/propositional-logic#thm-de-morgan]]应用于$P(a_1)\land\dots\land P(a_n)$和$P(a_1) \lor \dots \lor P(a_n)$。

对含有多个量词的命题，我们反复运用这个定理。否定号从左向右移动，**每经过一个量词就把它翻转**（$\forall \leftrightarrow \exists$），直到抵达末尾的谓词，然后用命题逻辑的规则对谓词取否定：$\neg(p \Rightarrow q) \equiv p \land \neg q$、德摩根律，以及$\neg(x < y) \equiv x \ge y$之类的事实。例如，

$$
\neg\bigl(\forall x\ \exists y\ \forall z,\ P(x,y,z)\bigr) \equiv \exists x\ \neg\bigl(\exists y\ \forall z,\ P\bigr) \equiv \exists x\ \forall y\ \neg\bigl(\forall z,\ P\bigr) \equiv \exists x\ \forall y\ \exists z,\ \neg P(x,y,z).
$$

::: warning 不要否定限制条件
“$\forall \eps > 0,\ Q(\eps)$”的否定是“$\exists \eps > 0,\ \neg Q(\eps)$”——限制条件$\eps > 0$保持不变。限制条件是论域的一部分，而不是断言的一部分：$\forall \eps > 0,\ Q(\eps)$是$\forall \eps\,(\eps > 0 \Rightarrow Q(\eps))$的简写，其否定为$\exists \eps\,(\eps > 0 \land \neg Q(\eps))$。写成“$\exists \eps \le 0$”是一个常见的错误。
:::

::: example 无界函数 {#ex-unbounded}
写出$f\colon\R\to\R$**无界**的含义，并证明$f(x) = x^3$无界。
::: solution
由[[#ex-translate-q]]，$f$有界是指$\exists M \in \R\ \forall x \in \R,\ \abs{f(x)} \le M$。用[[#thm-negation]]取否定，得

$$
f \text{ 无界} \iff \forall M \in \R\ \exists x \in \R,\ \abs{f(x)} > M.
$$

所以我们必须证明：对**每个**$M$，都能**找到**满足$\abs{x^3} > M$的$x$。设$M \in \R$是任意的，令$x = \abs{M} + 1$。则$x \ge 1$，所以$x^3 \ge x$，并且

$$
\abs{f(x)} = x^3 \ge x = \abs{M} + 1 > M.
$$

由于$M$是任意的，$f$无界。注意我们找到的$x$依赖于$M$，这是次序“$\forall M\ \exists x$”所允许的。
:::
:::

::: example 一个不收敛的数列 {#ex-diverge}
如果$\forall \eps > 0\ \exists N \in \N\ \forall n \ge N,\ \abs{a_n - L} < \eps$，就称数列$(a_n)$**收敛**于$L$。写出它的否定，并证明$a_n = (-1)^n$不收敛于任何实数$L$。
::: solution
把否定号依次推过三个量词，得

$$
(a_n) \text{ 不收敛于 } L \iff \exists \eps > 0\ \forall N \in \N\ \exists n \ge N,\ \abs{a_n - L} \ge \eps.
$$

用文字来说：存在一个容差$\eps$，使得无论从数列的多远处开始，后面总有某一项与$L$的距离至少为$\eps$。

设$L \in \R$是任意的；我们取$\eps = 1$来证明这个否定命题。设$N \in \N$。项$a_N$和$a_{N+1}$按某种顺序分别是$1$和$-1$，由三角不等式，

$$
\abs{1 - L} + \abs{-1 - L} \ge \abs{(1 - L) - (-1 - L)} = 2,
$$

所以$\abs{1 - L}$和$\abs{-1 - L}$中至少有一个$\ge 1$。因此$n = N$和$n = N+1$中有一个满足$n \ge N$且$\abs{a_n - L} \ge 1$。由于$N$是任意的，$(a_n)$不收敛于$L$；又由于$L$是任意的，它不收敛于任何实数。
:::
:::

::: quiz
“班上每个学生都至少通过了一门考试”的否定是什么？
- [ ] 班上每个学生都至少有一门考试没有通过。
- [ ] 班上没有学生通过任何一门考试。
- [x] 班上有某个学生每门考试都没有通过。
- [ ] 班上有某个学生至少有一门考试没有通过。
::: solution
用符号表示，原命题是$\forall s\ \exists e,\ \text{通过}(s, e)$。它的否定是$\exists s\ \forall e,\ \neg\text{通过}(s,e)$：有某个学生每门考试都没有通过。两个量词都翻转了。第二个选项否定得太多了（它是“某个学生通过了某门考试”的否定）；第一个选项一个量词也没有翻转，最后一个选项只翻转了一个。
:::
:::

## 量词的次序

同类的量词可以自由交换：$\forall x\ \forall y,\ P(x,y)$和$\forall y\ \forall x,\ P(x,y)$都是说$P$对每一对元素成立；类似地，两个存在量词也可以交换次序。不同类的量词则不然，正如本章开头的例子所表明的。

::: theorem 交换∃与∀ {#thm-order}
对任一谓词$P(x, y)$，其中$x \in A$，$y \in B$，

$$
\exists y \in B\ \forall x \in A,\ P(x,y) \quad\Longrightarrow\quad \forall x \in A\ \exists y \in B,\ P(x,y),
$$

但反方向的蕴涵一般不成立。
:::

::: proof
设$\exists y\ \forall x,\ P(x,y)$为真，选取$b \in B$，使得$P(x, b)$对每个$x \in A$都成立。为证明右边，设$x \in A$是任意的。则$y = b$满足$P(x, y)$。所以对每个$x$都有合适的$y$——而且每次都是同一个。

关于反方向，取$A = B = \R$，令$P(x, y)$为“$y > x$”。右边$\forall x\ \exists y,\ y > x$为真（取$y = x + 1$）。左边$\exists y\ \forall x,\ y > x$为假：它的否定$\forall y\ \exists x,\ y \le x$为真，因为对任意$y$，可以取$x = y$。
:::

区别在于**依赖性**。在$\forall x\ \exists y$中，$y$可以在$x$**之后**选取，并且可以随$x$的改变而改变——实际上$y$是$x$的函数。在$\exists y\ \forall x$中，必须在$x$**之前**选定一个$y$，并且它必须同时对所有$x$都适用。“每个人都有母亲”是$\forall x\ \exists y$；“某人是所有人的母亲”是$\exists y\ \forall x$。

::: widget relation
set: 1; 2; 3; 4
pairs: 1,2; 2,3; 3,4; 4,1
view: quantifiers
name: P
caption: 有限集上的谓词$P(x,y)$就是一个关系：当$P(x,y)$成立时，矩阵第$x$行第$y$列的元素为$1$。这里每一行都含有一个$1$，所以$\forall x\,\exists y,\ P(x,y)$为真；但没有哪一列是满的，所以$\exists y\,\forall x,\ P(x,y)$为假。点击元素，把某一整列（比如第$1$列）填满，两个命题就都为真了。为什么只要有一列是满的，“$\forall x\,\exists y$”就不可能为假？这就是[[#thm-order]]。
:::

::: example 关于整数的四个命题 {#ex-order}
判断下列命题中哪些为真。

1. $\forall x \in \Z\ \exists y \in \Z,\ x + y = 0$。
2. $\exists y \in \Z\ \forall x \in \Z,\ x + y = 0$。
3. $\exists x \in \Z\ \forall y \in \Z,\ xy = 0$。
4. $\forall x \in \Z\ \exists y \in \Z,\ xy = 1$。
::: solution
1. 真。设$x \in \Z$，取依赖于$x$的$y = -x$；则$x + y = 0$。
2. 假。它的否定是$\forall y\ \exists x,\ x + y \neq 0$。对任意给定的$y \in \Z$，取$x = 1 - y$；则$x + y = 1 \neq 0$。
3. 真。取$x = 0$：则对每个$y$都有$xy = 0$。一个$x$对所有$y$都适用。
4. 假。它的否定是$\exists x\ \forall y,\ xy \neq 1$。取$x = 2$：若$2y = 1$，则$y = \tfrac12 \notin \Z$，所以对所有$y \in \Z$都有$2y \neq 1$。（如果$x$的论域取$\Q \setminus \set{0}$，$y$的论域取$\Q$，这个命题就成为真的：取$y = 1/x$。）
:::
:::

::: quiz
下列哪个命题表示$f\colon\R\to\R$有上界？
- [ ] $\forall x \in \R\ \exists M \in \R,\ f(x) \le M$
- [x] $\exists M \in \R\ \forall x \in \R,\ f(x) \le M$
- [ ] $\forall M \in \R\ \exists x \in \R,\ f(x) \le M$
- [ ] $\exists x \in \R\ \forall M \in \R,\ f(x) \le M$
::: solution
界是对每个$x$都适用的同一个数$M$，所以$\exists M$必须放在最前面。第一个选项对**每个**函数都成立（给定$x$，取$M = f(x)$），所以它什么也没说。第三个选项是说对每个$M$，都有某个函数值$f(x)$不超过$M$，这意味着$f$**无下界**。最后一个选项对每个函数都为假，因为$M = f(x) - 1$不满足要求。
:::
:::

## 量词与联结词

量词与$\land$、$\lor$如何相互作用？有些组合满足分配律，有些则不满足，而不满足的情形与定律本身一样富有启发性。

::: theorem 量词的分配 {#thm-distribute}
对论域为$D$的谓词$P(x)$和$Q(x)$：

1. $\forall x,\ \bigl(P(x) \land Q(x)\bigr) \;\equiv\; \bigl(\forall x,\ P(x)\bigr) \land \bigl(\forall x,\ Q(x)\bigr)$；
2. $\exists x,\ \bigl(P(x) \lor Q(x)\bigr) \;\equiv\; \bigl(\exists x,\ P(x)\bigr) \lor \bigl(\exists x,\ Q(x)\bigr)$；
3. $\bigl(\forall x,\ P(x)\bigr) \lor \bigl(\forall x,\ Q(x)\bigr) \;\Rightarrow\; \forall x,\ \bigl(P(x) \lor Q(x)\bigr)$，但反之不然。
:::

::: proof
1. 如果$P(a) \land Q(a)$对每个$a$都成立，那么特别地，$P(a)$对每个$a$成立，$Q(a)$也对每个$a$成立。反之，如果$P(a)$对所有$a$成立，$Q(a)$也对所有$a$成立，那么对每个$a$两者都成立。

2. 把第1条应用于$\neg P$和$\neg Q$，对两边取否定，并利用[[#thm-negation]]：$\neg\forall x\,(\neg P \land \neg Q) \equiv \exists x\, \neg(\neg P \land \neg Q) \equiv \exists x\,(P \lor Q)$，而$\neg\bigl(\forall x\, \neg P \land \forall x\, \neg Q\bigr) \equiv \exists x\, P \lor \exists x\, Q$。

3. 设$P(a)$对每个$a$都成立。则$P(a) \lor Q(a)$对每个$a$都成立。如果$Q(a)$对每个$a$都成立，结论同样成立。为说明反之不成立，令$D = \Z$，$P(x)$：“$x$是偶数”，$Q(x)$：“$x$是奇数”。每个整数都是偶数或奇数，所以右边为真；但“每个整数都是偶数”和“每个整数都是奇数”都不成立，所以左边为假。
:::

第3条中的例子值得记住：“每个整数都是偶数或奇数”与“每个整数都是偶数，或者每个整数都是奇数”不是一回事。对偶地，$\exists x\,(P \land Q)$蕴涵$(\exists x\, P) \land (\exists x\, Q)$，但反之不然（见习题）。

## 证明含量词的命题

命题的逻辑形式告诉你它的证明必须如何开头。

- **要证明$\forall x \in D,\ P(x)$**，先写“设$x \in D$”（$x$是一个**任意的**元素，除了它属于$D$之外，对它不作任何假定），然后证明$P(x)$。由于没有用到$x$的任何特殊之处，这个论证对每个元素都适用。
- **要证明$\exists x \in D,\ P(x)$**，就找出一个具体的元素——一个**见证**——并验证它具有性质$P$。（有时不必给出见证也能证明存在性；见[[proofs/proof-techniques]]。）
- **要否证$\forall x,\ P(x)$**，就证明$\exists x,\ \neg P(x)$：给出一个**反例**。
- **要否证$\exists x,\ P(x)$**，就证明$\forall x,\ \neg P(x)$。

嵌套的量词按从左到右的顺序处理。形如$\forall \eps > 0\ \exists N\ \forall n \ge N,\ \dots$的命题这样证明：“设$\eps > 0$。令$N = \dots$（一个关于$\eps$的表达式）。设$n \ge N$。则……”。

::: example 一个ε–N证明 {#ex-eps-n}
证明数列$a_n = \dfrac{n}{n+1}$收敛于$1$。
::: solution
我们必须证明$\forall \eps > 0\ \exists N \in \N\ \forall n \ge N,\ \abs{a_n - 1} < \eps$。

*草稿*。$\abs{a_n - 1} = \abs{\frac{n - (n+1)}{n+1}} = \frac{1}{n+1}$，只要$n + 1 > 1/\eps$，它就小于$\eps$。任何$N > 1/\eps$都可以。

*证明*。设$\eps > 0$。由实数的阿基米德性质（[[real-analysis/real-numbers]]），存在自然数$N$，使得$N > 1/\eps$。设$n \ge N$。则

$$
\abs{a_n - 1} = \frac{1}{n+1} < \frac{1}{n} \le \frac{1}{N} < \eps.
$$

因此$a_n \to 1$。我们选取的$N$依赖于$\eps$，这是次序$\forall\eps\ \exists N$所允许的；它不依赖于$n$，因为$n$是在此之后才引入的。
:::
:::

::: widget sequence
a: n/(n+1)
N: 40
limit: 1
epsilon: 0.08
caption: 带状区域以极限$1$为中心、半宽为$\eps$，图中标出了第一个使此后各项都留在带内的$N$。当$\eps = 0.08$时，$N = 12$，因为$\frac{1}{n+1} < 0.08$当且仅当$n > 11.5$。缩小$\eps$：所需的$N$随之增大。$N$依赖于$\eps$，这恰好是次序“$\forall \eps\ \exists N$”所允许的。
:::

::: application 连续与一致连续
函数$f$在集合$D$上**连续**是指

$$
\forall x \in D\ \forall \eps > 0\ \exists \delta > 0\ \forall y \in D,\ \bigl(\abs{x - y} < \delta \Rightarrow \abs{f(x) - f(y)} < \eps\bigr),
$$

而$f$在$D$上**一致连续**是指

$$
\forall \eps > 0\ \exists \delta > 0\ \forall x \in D\ \forall y \in D,\ \bigl(\abs{x - y} < \delta \Rightarrow \abs{f(x) - f(y)} < \eps\bigr).
$$

两者唯一的区别在于$\forall x$所处的位置。在前者中，$\delta$既可以依赖于$\eps$，也可以依赖于点$x$；在后者中，同一个$\delta$必须对每个点都适用。由[[#thm-order]]，一致连续蕴涵连续。反之不成立：$f(x) = 1/x$在$(0, 1)$上连续，但对给定的$\eps$，在点$x$处适用的$\delta$随着$x \to 0$而缩小到$0$，所以没有一个$\delta$能对所有点都适用。同样的量词交换也区分了函数的逐点收敛与一致收敛，这一区别是[[real-analysis/uniform-convergence]]一章的核心。
:::

::: widget limit
f: 1/x
a: 0.2
L: 5
epsilon: 0.5
x: 0, 1
y: 0, 10
caption: $1/x$在点$a = 0.2$处、容差为$\eps = 0.5$时的连续性：适用的最大$\delta$非常小，约为$0.018$（它等于$a^2\eps/(1 + a\eps)$）。在$a = 1$处，同样的$\eps$允许$\delta = 1/3$。当$a$趋于$0$时，容许的$\delta$趋于$0$，这就是$1/x$在$(0,1)$上连续但不一致连续的原因。
:::

::: quiz
下列哪一种是证明“$\forall x \in \R\ \exists y \in \R,\ x < y^2$”的正确开头？
- [ ] 令$y = x + 1$。则对每个$x$……
- [x] 设$x \in \R$是任意的。令$y = \abs{x} + 1$。则……
- [ ] 取$x = 0$，$y = 1$；则$0 < 1$，所以命题成立。
- [ ] 设$x, y \in \R$是任意的。则……
::: solution
命题以$\forall x$开头，所以我们先固定一个任意的$x$；然后，由于$\exists y$，我们选取一个$y$，它可以依赖于$x$。取$y = \abs{x}+1$，得$y^2 \ge y > \abs{x} \ge x$（因为$y \ge 1$）。第一个选项在$x$出现之前就选取了$y$；第三个选项只检验了一种情形，这对每个$x$什么也证明不了；最后一个选项把$y$当作任意的，这就成了关于$y$的一个（错误的）全称论断。
:::
:::

::: history
亚里士多德（Aristotle）的逻辑中已经有四种带量词的句子——“所有$S$都是$P$”“没有$S$是$P$”“有些$S$是$P$”和“有些$S$不是$P$”——传统的**对当方阵**记载了“所有$S$都是$P$”与“有些$S$不是$P$”互为否定，这是[[#thm-negation]]的一种早期形式。但亚里士多德的逻辑无法处理像“每个数都有比它大的数”这样的嵌套量词。现代理论始于戈特洛布·弗雷格（Gottlob Frege）的《概念文字》（*Begriffsschrift*，1879年），它引入了被量化的变元，能够表达任意层次的命题；查尔斯·桑德斯·皮尔斯（Charles Sanders Peirce）和他的学生奥斯卡·霍华德·米切尔（Oscar Howard Mitchell）在19世纪80年代初独立地发展了量词。记号出现得更晚：朱塞佩·皮亚诺（Giuseppe Peano）在1897年引入反写的E表示“存在”，格哈德·根岑（Gerhard Gentzen）在1935年仿照它引入了倒写的A，即$\forall$。与此同时，卡尔·魏尔斯特拉斯（Karl Weierstrass）19世纪60年代在柏林讲课时所讲授的ε–δ定义已经表明，分析学中有多少内容在于把量词按正确的次序排列。
:::

## 后续内容

从现在起，量词将无处不在。集合用谓词来描述，如$\set{x \in \R : x^2 < 2}$（[[proofs/sets]]）；函数是单射，是指$\forall a, b,\ (f(a) = f(b) \Rightarrow a = b)$，是满射，是指$\forall y\ \exists x,\ f(x) = y$（[[proofs/functions]]）。上一节的证明策略将在[[proofs/proof-techniques]]一章中进一步发展，而[[calculus-1/limits]]、[[real-analysis/sequences]]和[[real-analysis/continuity]]各章中的ε–δ定义和ε–$N$定义，则是运用嵌套量词的主要练兵场。形式化的谓词逻辑，包括量词的公理以及哥德尔（Gödel）的完备性定理和不完备性定理，是数理逻辑的研究内容。

::: summary
- 当$x$取论域中的某个值时，或者当它被量化时，谓词$P(x)$就成为命题：$\forall x \in D,\ P(x)$（若$P$对每个元素都成立则为真）或$\exists x \in D,\ P(x)$（若$P$至少对一个元素成立则为真）。
- 受限量词展开为$\forall x\,(x \in A \Rightarrow \dots)$和$\exists x\,(x \in A \land \dots)$：$\forall$与$\Rightarrow$搭配，$\exists$与$\land$搭配。
- 否定把每个量词翻转，并否定谓词：$\neg\forall x\, P \equiv \exists x\,\neg P$，$\neg\exists x\, P \equiv \forall x\, \neg P$（[[#thm-negation]]）。$\eps > 0$之类的限制条件不取否定。
- 不同类量词的次序很重要：$\exists y\,\forall x$蕴涵$\forall x\,\exists y$，反之不然（[[#thm-order]]）。在$\forall x\,\exists y$中，$y$可以依赖于$x$。
- $\forall$对$\land$可分配，$\exists$对$\lor$可分配；但“每个整数都是偶数或奇数”不等于“每个整数都是偶数，或者每个整数都是奇数”。
- 要证明$\forall x$：取任意的$x$。要证明$\exists x$：给出一个见证。要否证$\forall x$：给出一个反例。$\exists!$需要证明存在性和唯一性。
:::

## 习题

::: exercise 真还是假？ {level=1}
判断下列各命题是否为真，并说明理由。

1. $\forall x \in \R,\ x^2 + 1 > 0$。
2. $\exists n \in \N,\ n^2 = 2n$。
3. $\forall n \in \N,\ n^2 \ge 2n - 1$。
4. $\exists x \in \R,\ x^2 < 0$。
::: solution
1. 真：$x^2 \ge 0$，所以$x^2 + 1 \ge 1 > 0$。
2. 真：$n = 2$是一个见证（$4 = 4$）。
3. 真：对每个$n$，$n^2 - 2n + 1 = (n-1)^2 \ge 0$。
4. 假：由[[#thm-negation]]，我们需要证明$\forall x \in \R,\ x^2 \ge 0$，而这是成立的。
:::
:::

::: exercise 否定 {level=1}
写出下列各命题的否定，并把$\neg$一直移到最里面；再指出每一对命题中哪一个为真。

1. $\forall x \in \R\ \exists y \in \R,\ x + y = 0$。
2. $\exists n \in \Z,\ (n > 0 \land n^2 < n)$。
3. $\forall x \in \R,\ (x > 1 \Rightarrow x^2 > x)$。
::: solution
1. $\exists x \in \R\ \forall y \in \R,\ x + y \neq 0$。原命题为真（$y = -x$），所以其否定为假。
2. $\forall n \in \Z,\ (n \le 0 \lor n^2 \ge n)$。否定为真：若$n \ge 1$，则$n^2 \ge n$。所以原命题为假。
3. $\exists x \in \R,\ (x > 1 \land x^2 \le x)$。原命题为真（若$x > 1$，则$x^2 = x \cdot x > x$），所以其否定为假。
:::
:::

::: exercise 递增函数 {level=1}
如果由$x < y$总能推出$f(x) \le f(y)$，就称函数$f\colon \R\to\R$是**递增的**。用符号写出这个定义及其否定。利用这个否定证明$f(x) = x^2$不是递增的。
::: solution
递增：$\forall x \in \R\ \forall y \in \R,\ \bigl(x < y \Rightarrow f(x) \le f(y)\bigr)$。否定：$\exists x \in \R\ \exists y \in \R,\ \bigl(x < y \land f(x) > f(y)\bigr)$。对$f(x) = x^2$，取$x = -2$，$y = 0$：则$x < y$，且$f(x) = 4 > 0 = f(y)$。
:::
:::

::: exercise 一个真值集 {level=1 check="5"}
在满足$1 \le n \le 20$的整数$n$中，有多少个满足$\exists m \in \Z,\ n = m^2 + 1$？
::: solution
当$m$取遍所有整数时，$m^2 + 1$取值$1, 2, 5, 10, 17, 26, \dots$（分别对应$m = 0, \pm1, \pm2, \pm3, \pm4, \pm5, \dots$）。其中介于$1$和$20$之间的是$1, 2, 5, 10, 17$：共$5$个。
:::
:::

::: exercise 整除与量词次序 {level=2}
在论域$\N$上，令$P(x, y)$为“$x$整除$y$”。下列哪些为真？

1. $\forall x\ \exists y,\ P(x,y)$
2. $\exists y\ \forall x,\ P(x,y)$
3. $\exists x\ \forall y,\ P(x,y)$
4. $\forall y\ \exists x,\ P(x,y)$
::: solution
1. 真：每个$x$都整除$y = x$（或$2x$，……）。
2. 假：没有一个正整数$y$能被每个正整数整除，因为$y + 1 > y$不整除$y$。（形式地说，取$x = y+1$，否定命题$\forall y\ \exists x,\ x \nmid y$成立。）
3. 真：$x = 1$整除每个$y$。
4. 真：取$x = 1$（或$x = y$）。

命题1和命题2说明了[[#thm-order]]：交换量词可以把一个真命题变成假命题。
:::
:::

::: exercise 唯一存在 {level=2}
只用$\exists$、$\forall$、$=$和联结词表示$\exists!\, x,\ P(x)$，然后对你的公式取否定，并用文字解释这个否定。
::: solution
由[[#def-unique]]，$\exists!\,x,\ P(x)$就是$\exists x\,\bigl(P(x) \land \forall y\,(P(y) \Rightarrow y = x)\bigr)$。它的否定是

$$
\forall x\,\bigl(\neg P(x) \lor \exists y\,(P(y) \land y \neq x)\bigr), \quad\text{等价地}\quad \forall x\,\bigl(P(x) \Rightarrow \exists y\,(P(y) \land y \neq x)\bigr).
$$

用文字来说：每个具有性质$P$的对象，都另有一个**不同的**对象也具有性质$P$。这恰好在没有对象具有性质$P$，或者至少有两个对象具有性质$P$时发生——这正是“恰有一个”不成立的两种方式。
:::
:::

::: exercise ∃对∧不满足分配律 {level=2}
证明$\exists x\,\bigl(P(x)\land Q(x)\bigr) \Rightarrow \bigl(\exists x\, P(x)\bigr) \land \bigl(\exists x\, Q(x)\bigr)$，并举例说明反方向的蕴涵不成立。
::: solution
如果某个$a$满足$P(a) \land Q(a)$，那么$a$既是$\exists x\, P(x)$的见证，也是$\exists x\, Q(x)$的见证。关于反方向，取论域$\Z$，令$P(x)$：“$x$是偶数”，$Q(x)$：“$x$是奇数”。存在偶数，也存在奇数，所以右边为真；但没有整数既是偶数又是奇数，所以左边为假。
:::
:::

::: exercise 另一个发散数列 {level=2}
利用[[#ex-diverge]]中否定后的定义，证明数列$a_n = n$不收敛于任何实数$L$。
::: hint
取$\eps = 1$。给定$N$，选取一个远大于$\abs{L}$的$n \ge N$。
:::
::: solution
设$L \in \R$；我们取$\eps = 1$来证明$\exists \eps > 0\ \forall N\ \exists n \ge N,\ \abs{n - L} \ge \eps$。设$N \in \N$。选取自然数$n \ge \max(N, \abs{L} + 1)$，由阿基米德性质，这样的$n$存在。则$n \ge N$，并且

$$
\abs{n - L} \ge n - \abs{L} \ge 1 = \eps.
$$

所以$(a_n)$不收敛于$L$；由于$L$是任意的，它根本不收敛。
:::
:::

::: exercise 分析学中次序很重要 {level=3}
证明命题
$$
\forall \eps > 0\ \exists \delta > 0\ \forall x \in \R,\ \bigl(\abs{x} < \delta \Rightarrow \abs{3x} < \eps\bigr)
$$
为真，而命题
$$
\exists \delta > 0\ \forall \eps > 0\ \forall x \in \R,\ \bigl(\abs{x} < \delta \Rightarrow \abs{3x} < \eps\bigr)
$$
为假。
::: hint
对第二个命题，写出它的否定：对每个$\delta$，你都必须找到一个$\eps$和一个$x$。
:::
::: solution
*第一个命题*。设$\eps > 0$，令$\delta = \eps/3$。若$\abs{x} < \delta$，则$\abs{3x} = 3\abs{x} < 3\delta = \eps$。

*第二个命题*。它的否定是$\forall \delta > 0\ \exists \eps > 0\ \exists x \in \R,\ \bigl(\abs{x} < \delta \land \abs{3x} \ge \eps\bigr)$。设$\delta > 0$。令$x = \delta/2$，$\eps = 3\delta/2$。则$\abs{x} = \delta/2 < \delta$，且$\abs{3x} = 3\delta/2 = \eps$，所以$\abs{3x} \ge \eps$。否定命题为真，所以第二个命题为假。（第二个命题是说，$0$周围的某个固定区间被$x \mapsto 3x$映入**每个**区间$(-\eps, \eps)$，也就是映入$\set{0}$。）
:::
:::

::: exercise 一个不一致连续的函数 {level=3}
利用上文“应用”中的定义，写出$f$在$\R$上**不**一致连续的含义，并证明$f(x) = x^2$在$\R$上不一致连续。
::: hint
取$\eps = 1$。对给定的$\delta$，取两点$x$和$x + \delta/2$，其中$x$很大。
:::
::: solution
对定义取否定，得

$$
\exists \eps > 0\ \forall \delta > 0\ \exists x, y \in \R,\ \bigl(\abs{x - y} < \delta \land \abs{f(x) - f(y)} \ge \eps\bigr).
$$

取$\eps = 1$，并设$\delta > 0$。令$x = 1/\delta$，$y = x + \delta/2$。则$\abs{x - y} = \delta/2 < \delta$，并且

$$
\abs{y^2 - x^2} = (y - x)(y + x) = \frac{\delta}{2}\left(\frac{2}{\delta} + \frac{\delta}{2}\right) = 1 + \frac{\delta^2}{4} \ge 1 = \eps.
$$

所以$f$在$\R$上不一致连续：无论$\delta$多么小，在足够远处，总有两个相距小于$\delta$的点，它们的平方相差至少为$1$。（与此相反，在像$[0, 1]$这样的有界区间上，$x^2$**是**一致连续的；见[[real-analysis/continuity]]。）
:::
:::
