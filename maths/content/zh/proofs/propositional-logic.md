先来看一个大多数人都会答错的谜题。桌上放着四张卡片，每张卡片的一面写着一个字母，另一面写着一个数，朝上的一面分别是

$$
\boxed{\;\text{A}\;}\qquad\boxed{\;\text{K}\;}\qquad\boxed{\;4\;}\qquad\boxed{\;7\;}
$$

有人断言：“如果一张卡片的一面是元音字母，那么它的另一面是偶数。”要判断这一断言对这四张卡片是否成立，必须翻开哪几张卡片？

大多数人会选A和4，或者只选A。正确答案是**A和7**，原因将在“[[#converse-contrapositive]]”一节中说明。这个谜题是心理学家彼得·沃森（Peter Wason）在1966年设计的，它表明我们对“如果”一词的日常直觉并不可靠。

数学承受不起这种不可靠。证明是一串命题，其中每一个都由前面的命题推出；要检验这样一条链，我们必须确切地知道“非”“且”“或”“如果……那么”这些词的含义。本章用真值表把这些词的含义精确化，学习判断两个命题何时表达同一件事，找出哪些论证形式是有效的，并证明少数几个联结词就足以表达所有的逻辑组合。下一章（[[proofs/quantifiers]]）将加入“对所有”和“存在”；两者合在一起，构成了此后每一门课程所使用的语言。

## 命题

::: definition 命题 {#def-proposition}
**命题**（或称**陈述**）是一个或真或假、但不能既真又假的陈述句。若它为真，则它的**真值**为T；若它为假，则它的真值为F。
:::

例如，“$7$是素数”是一个真命题，“$2 + 2 = 5$”是一个假命题。“每个大于$2$的偶数都是两个素数之和”（1742年提出的哥德巴赫（Goldbach）猜想）是一个命题，尽管没有人知道它是否为真：是不是命题，取决于它是否**具有**真值，而不取决于我们是否知道这个真值。另一方面，“$7$是素数吗？”和“设$x = 3$”都不是命题；“$x^2 > 4$”也不是命题，它对某些$x$为真，对另一些$x$为假——它是一个**谓词**，这是[[proofs/quantifiers]]一章的主题。“这句话是假的”同样不是命题：如果它为真，它就为假；反之亦然。这类自我指涉的句子（**说谎者悖论**）被排除在外。

**命题逻辑**研究复合命题的真值如何依赖于其各组成部分的真值，而不管这些部分说的是什么。我们用字母$p, q, r, \dots$表示任意的命题，称它们为**命题变元**；再用下面定义的联结词，由它们构造出像$(p \land q) \Rightarrow \neg r$这样的**公式**。

## 联结词与真值表

组合命题有五种基本方式。每一种都由一张**真值表**来定义，表中列出了在各组成部分真值的每一种组合下复合命题的真值。

::: definition 逻辑联结词 {#def-connectives}
设$p$和$q$为命题。

- **否定**$\neg p$（“非$p$”）在$p$为假时为真，在$p$为真时为假。
- **合取**$p \land q$（“$p$且$q$”）在$p$和$q$都为真时为真，其他情况下为假。
- **析取**$p \lor q$（“$p$或$q$”）在$p$、$q$中至少有一个为真时为真，在两者都为假时为假。
- **蕴涵**（或**条件式**）$p \Rightarrow q$（“如果$p$，那么$q$”）在$p$为真而$q$为假时为假，其他情况下为真。这里$p$称为**假设**（或前件），$q$称为**结论**（或后件）。
- **双条件**$p \Leftrightarrow q$（“$p$当且仅当$q$”）在$p$和$q$的真值相同时为真，其他情况下为假。

列成表格就是：

| $p$ | $q$ | $\neg p$ | $p \land q$ | $p \lor q$ | $p \Rightarrow q$ | $p \Leftrightarrow q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |
:::

下面谈谈这些联结词与日常语言是如何对应的。

- **合取。**“$7$是素数，**但**$9$不是”在逻辑上是一个合取；“但”“虽然”之类的词带有一种转折的意味，逻辑对此不予考虑。
- **析取。**在数学中，“或”总是**可兼的**：“$n$是偶数或$n$是$3$的倍数”在$n = 6$时为真。日常用语中的“或”有时指**异或**（不可兼的或），比如套餐里的“汤或沙拉”，我们把它记作$p \oplus q$：当$p, q$中恰有一个为真时它为真。数学家想表达“恰有一个”时，会明确地说出来。
- **双条件。**“当且仅当”（if and only if）在英文中常缩写为**iff**。命题$p \Leftrightarrow q$是说$p$与$q$同真同假。
- **蕴涵**是其中最微妙的一个，下面专门用一节来讨论。

为了省略括号，我们约定：$\neg$的结合力最强，其次是$\land$和$\lor$，再次是$\Rightarrow$和$\Leftrightarrow$。因此$\neg p \land q$表示$(\neg p)\land q$，$p \land q \Rightarrow r$表示$(p\land q)\Rightarrow r$。像$p \land q \lor r$这样的混合写法有歧义，我们总是给它加上括号。

### 复合公式的真值表

要求出一个复合公式的真值表，就列出其变元真值的所有组合，然后从最内层的部分开始逐层向外计算，每个子公式占一列。含$n$个变元的公式需要$2^n$行，因为每个变元独立地取两个值之一（[[discrete/counting]]一章中的乘法原理）；按照惯例，第一个变元每$2^{n-1}$行交替一次，最后一个变元每一行都交替。

::: example 用基本联结词表示异或 {#ex-xor}
构造$(p \lor q) \land \neg(p \land q)$的真值表，并用文字描述它何时为真。
::: solution
从内向外，为每个子公式添加一列：

| $p$ | $q$ | $p \lor q$ | $p \land q$ | $\neg(p \land q)$ | $(p\lor q)\land\neg(p\land q)$ |
|---|---|---|---|---|---|
| T | T | T | T | F | F |
| T | F | T | F | T | T |
| F | T | T | F | T | T |
| F | F | F | F | T | F |

该公式恰好在$p$、$q$中一个为真、另一个为假时为真：它表达的是异或$p \oplus q$，即“$p$或$q$，但不同时成立”，其中$\neg(p\land q)$表达的就是“但不同时成立”。
:::
:::

::: widget truthtable
formula: (p | q) & ~(p & q)
compare: p xor q
caption: 表格逐列构造出这个公式，再把它与$p \oplus q$比较：两者的最后一列在每一行都一致，所以这两个公式逻辑等价。把第一个公式改成$p \lor q$，就会看到第一行成为唯一不一致的一行——可兼的“或”与不可兼的“或”之间的全部差别就在这一行。
:::

### 把自然语言译成符号

运用逻辑时，很大一部分工作是翻译：为每个简单命题选定一个变元，再找出其中的联结词。

::: example 雨和伞 {#ex-translate}
设$p$表示“下雨了”，$q$表示“我带伞”，$r$表示“我被淋湿”。把下列句子译成符号：

1. 如果下雨了而我没带伞，那么我会被淋湿。
2. 仅当下雨时，我才会被淋湿。
3. 带伞是不被淋湿的充分条件。
4. 除非下雨，否则我不会被淋湿。
::: solution
1. 假设是合取“下雨且没带伞”：$(p \land \neg q) \Rightarrow r$。
2. “$A$仅当$B$”的意思是：没有$B$，$A$就不可能发生；只要$A$为真，$B$就为真。所以这句话是$r \Rightarrow p$。（它**不是**$p \Rightarrow r$：这句话并没有说下雨会使我淋湿。）
3. “$A$是$B$的充分条件”的意思是$A \Rightarrow B$，所以这句话是$q \Rightarrow \neg r$。
4. “除非$B$，否则$A$”的意思是“如果非$B$，那么$A$”。这里$A$是“我不会被淋湿”，于是得到$\neg p \Rightarrow \neg r$。我们将在[[#thm-contrapositive]]中看到，它与第2句逻辑等价：两句不同的话，同一个逻辑内容。
:::
:::

## 蕴涵的含义

为什么$p$为假时$p \Rightarrow q$应当为**真**？考虑一个我们当然希望算作真命题的命题：

$$
\text{对每个整数 } n:\quad \text{如果 } n \text{ 能被 } 4 \text{ 整除}, \text{ 那么 } n \text{ 是偶数。}
$$

用具体的整数来检验它。当$n = 8$时，假设和结论都为真（T, T行）。当$n = 6$时，假设为假而结论为真（F, T行）。当$n = 3$时，两者都为假（F, F行）。如果$n = 6$和$n = 3$时的蕴涵为假，那么我们这个完全正确的命题就成了假命题。唯一能够否定一个蕴涵的行是“假设为真、结论为假”——而没有哪个整数能被$4$整除却不是偶数。$\Rightarrow$的真值表是由数学家对含变量的“如果……那么”的用法所决定的，我们别无选择。

另一种理解方式：$p \Rightarrow q$是一个**承诺**。“如果你做完这份习题，我就请你喝咖啡”这个承诺，只有在你做完了而我却没有请客时才算被违背。如果你没做完，那么无论我怎么做，承诺都没有被违背。

当$p$为假时，称$p \Rightarrow q$**空真**。例如，“如果$2 + 2 = 5$，那么月亮是奶酪做的”是真的。这听起来很奇怪，只是因为在日常对话中“如果……那么”暗示着某种因果联系；而逻辑上的蕴涵只断言“$p$真且$q$假”这种组合不会出现。

在日常语言中，$p \Rightarrow q$有许多种说法，你应当能够识别所有这些说法：

| 日常语言 | 符号 |
|---|---|
| 如果$p$，那么$q$；$p$蕴涵$q$；$q$，如果$p$；每当$p$时，$q$ | $p \Rightarrow q$ |
| $p$仅当$q$ | $p \Rightarrow q$ |
| $p$是$q$的充分条件；$q$是$p$的必要条件 | $p \Rightarrow q$ |
| 除非$q$，否则非$p$（如果非$q$，那么非$p$） | $\neg q \Rightarrow \neg p$，等价地，$p \Rightarrow q$ |
| $p$当且仅当$q$；$p$是$q$的充分必要条件 | $p \Leftrightarrow q$ |

“仅当”这个说法最容易引起麻烦。“$p$仅当$q$”是说：只有在$q$为真时，$p$才可能为真；所以如果$p$为真，$q$必定为真。这就是$p \Rightarrow q$，与“如果$p$，那么$q$”相同——一个“仅”字把“当”（if）的方向颠倒了过来。

::: quiz
当$p$和$q$取什么真值时，命题“$p$仅当$q$”为假？
- [ ] $p$为假且$q$为真
- [x] $p$为真且$q$为假
- [ ] $p$和$q$都为假
- [ ] 它永远不会为假
::: solution
“$p$仅当$q$”的意思是$p \Rightarrow q$，它恰好在假设$p$为真而结论$q$为假的那一行为假。在其他各行它都为真（当$p$为假时是空真）。
:::
:::

## 逻辑等价与逻辑定律

有些公式不论其变元的真值如何选取都为真。另一些公式则用不同的说法表达同一件事。这两种想法在证明中都处于核心地位。

::: definition 重言式与矛盾式 {#def-tautology}
如果一个公式在其变元的每一种真值指派下都为真，就称它为**重言式**（永真式）；如果它在每一种指派下都为假，就称它为**矛盾式**（永假式）。既不是重言式也不是矛盾式的公式称为**可能式**。
:::

公式$p \lor \neg p$是重言式（即**排中律**：每个命题或者为真，或者为假），$p \land \neg p$是矛盾式。公式$p \Rightarrow q$是可能式。

::: definition 逻辑等价 {#def-equivalent}
如果两个公式$P$和$Q$在其变元的每一种真值指派下都取相同的真值，就称它们**逻辑等价**，记作$P \equiv Q$。等价地说，$P \equiv Q$意味着$P \Leftrightarrow Q$是重言式。
:::

注意$\equiv$不是联结词：$P \Leftrightarrow Q$是一个公式，它的真假取决于变元；而$P \equiv Q$是一个**关于**两个公式的论断。等价的命题在任何论证中都可以互相替换，所以可以把一个难证的命题换成一个与之等价、较容易的命题——这是[[proofs/proof-techniques]]一章中若干方法的基础。

最有用的一对等价式告诉我们如何否定“且”和“或”。

::: theorem 德摩根（De Morgan）律 {#thm-de-morgan}
对所有命题$p$和$q$，

$$
\neg(p \land q) \equiv \neg p \lor \neg q \qquad\text{以及}\qquad \neg(p \lor q) \equiv \neg p \land \neg q.
$$
:::

::: proof
我们比较真值表，四种指派各占一行：

| $p$ | $q$ | $\neg(p\land q)$ | $\neg p \lor \neg q$ | $\neg(p\lor q)$ | $\neg p \land \neg q$ |
|---|---|---|---|---|---|
| T | T | F | F | F | F |
| T | F | T | T | F | F |
| F | T | T | T | F | F |
| F | F | T | T | T | T |

第三列与第四列在每一行都一致，第五列与第六列也是如此。因此两个等价式都成立。
:::

用文字来说：“并非两者都成立”意味着“至少有一个不成立”，而“两者都不”意味着“每一个都不成立”。“$x > 0$且$y > 0$”的否定是“$x \le 0$或$y \le 0$”——**而不是**“$x \le 0$且$y \le 0$”。

::: widget truthtable
formula: ~(p & q)
compare: ~p | ~q
caption: 最后两列在全部四行中都一致：这就是德摩根律。现在把第二个公式改成看似合理、实则错误的$\neg p \land \neg q$（输入 ~p & ~q），找出这条“定律”不成立的那些行。
:::

德摩根律只是一长串标准等价式中的一部分。下表中，$\top$表示任一重言式，$\bot$表示任一矛盾式。

::: theorem 命题逻辑的定律 {#thm-laws}
对所有命题$p$、$q$、$r$：

| 定律 | 等价式 |
|---|---|
| 交换律 | $p \land q \equiv q \land p$，$\quad p \lor q \equiv q \lor p$ |
| 结合律 | $(p \land q) \land r \equiv p \land (q \land r)$，$\quad (p \lor q) \lor r \equiv p \lor (q \lor r)$ |
| 分配律 | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$，$\quad p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ |
| 同一律 | $p \land \top \equiv p$，$\quad p \lor \bot \equiv p$ |
| 支配律 | $p \lor \top \equiv \top$，$\quad p \land \bot \equiv \bot$ |
| 幂等律 | $p \land p \equiv p$，$\quad p \lor p \equiv p$ |
| 双重否定律 | $\neg\neg p \equiv p$ |
| 互补律 | $p \lor \neg p \equiv \top$，$\quad p \land \neg p \equiv \bot$ |
| 吸收律 | $p \land (p \lor q) \equiv p$，$\quad p \lor (p \land q) \equiv p$ |
| 蕴涵律 | $p \Rightarrow q \equiv \neg p \lor q$ |
| 双条件律 | $p \Leftrightarrow q \equiv (p \Rightarrow q) \land (q \Rightarrow p)$ |
:::

::: proof
每条定律都可以用至多八行的真值表来验证。一个更快的方法是按某个变元的取值分情况讨论，它还能解释这些定律**为什么**成立。我们用其中不太显然的几条来说明。

*分配律（第一种形式）*。若$p$为假，则$p \land (q\lor r)$和$(p\land q)\lor(p\land r)$都为假。若$p$为真，则$p \land (q \lor r)$的值等于$q \lor r$的值，而$(p\land q)\lor(p\land r)$的值也等于$q \lor r$的值。两边在所有情况下都一致。第二种形式的证明与此相同：若$p$为真，则两边都为真；若$p$为假，则两边的值都等于$q \land r$的值。

*吸收律*。若$p$为真，则$p \lor q$为真，所以$p \land (p\lor q)$为真；若$p$为假，则$p \land (p \lor q)$为假。无论哪种情况，它的值都等于$p$的值。类似地，若$p$为真，则$p \lor (p\land q)$为真；若$p$为假，则$p\land q$为假，$p\lor(p\land q)$也为假。

*蕴涵律*。$\neg p \lor q$仅当$\neg p$和$q$都为假时为假，也就是$p$为真而$q$为假时——这恰好是$p \Rightarrow q$为假的那一行。

*双条件律*。$(p \Rightarrow q)\land(q\Rightarrow p)$恰好在其中一个蕴涵不成立时为假，也就是$p, q$中一个为真、另一个为假时——这恰好是$p \Leftrightarrow q$为假的情形。

其余各条定律可以直接由联结词的定义得出。
:::

::: remark 用等价式做代数运算
我们可以像使用代数恒等式那样用这些定律进行计算。在任何等价式中，都可以用公式**代入**变元（由德摩根律得$\neg\bigl((a \lor b) \land c\bigr) \equiv \neg(a\lor b) \lor \neg c$）；把公式的某一部分**替换**为与之等价的公式，所得的公式与原公式等价，因为整体的真值只取决于各部分的真值。由结合律，可以不加括号地写$p \land q \land r$。
:::

::: example 化简公式 {#ex-simplify}
证明$\neg\bigl(p \lor (\neg p \land q)\bigr) \equiv \neg p \land \neg q$。
::: solution
我们每次运用一条定律，并注明所用的定律：

$$
\begin{aligned}
\neg\bigl(p \lor (\neg p \land q)\bigr) &\equiv \neg p \land \neg(\neg p \land q) && \text{德摩根律}\\
&\equiv \neg p \land (\neg\neg p \lor \neg q) && \text{德摩根律}\\
&\equiv \neg p \land (p \lor \neg q) && \text{双重否定律}\\
&\equiv (\neg p \land p) \lor (\neg p \land \neg q) && \text{分配律}\\
&\equiv \bot \lor (\neg p \land \neg q) && \text{互补律（及交换律）}\\
&\equiv \neg p \land \neg q && \text{交换律、同一律。}
\end{aligned}
$$

用真值表也可以验证这一点，但这种逐条运用定律的推导，对变元多到无法列表的公式同样适用。
:::
:::

::: example 否定一个蕴涵 {#ex-negate-implication}
求一个与$\neg(p \Rightarrow q)$等价且不含$\Rightarrow$的公式，并用它否定“如果$n$是素数，那么$n$是奇数”。
::: solution
由蕴涵律、德摩根律和双重否定律，

$$
\neg(p \Rightarrow q) \equiv \neg(\neg p \lor q) \equiv \neg\neg p \land \neg q \equiv p \land \neg q.
$$

这与真值表相符：一个蕴涵恰好在假设为真而结论为假时为假。所以“如果$n$是素数，那么$n$是奇数”的否定是“$n$是素数且$n$是偶数”。当$n = 2$时这个否定为真，所以该蕴涵在$n = 2$时为假；正是$n$的这一个值使得一般性论断“每个素数都是奇数”为假。
:::
:::

::: warning 蕴涵的否定不是蕴涵
人们很容易把“如果$p$，那么$q$”否定成“如果$p$，那么非$q$”，或者“如果非$p$，那么非$q$”。两者都是错的。$p\Rightarrow q$的否定是合取$p \land \neg q$：要驳倒一个蕴涵，必须举出一种假设成立**并且**结论不成立的情形。检查$p$ = F的行：在这样的行中$p \Rightarrow q$为真，所以它的否定必须为假——而$p\land\neg q$确实为假，$p\Rightarrow\neg q$却为真。
:::

::: quiz
下列哪个命题是“如果天晴，那么我们去海滩”的否定？
- [ ] 如果天不晴，那么我们不去海滩。
- [ ] 如果天晴，那么我们不去海滩。
- [x] 天晴，并且我们不去海滩。
- [ ] 天不晴，并且我们去海滩。
::: solution
$\neg(p \Rightarrow q) \equiv p \land \neg q$：恰好在天晴而我们待在家里时，承诺被违背。否定命题必须在原命题为真时为假。在一个阴天、我们待在家里时，原命题（空）真——前两个选项此时也都为真，所以它们都不是原命题的否定。最后一个选项在天晴而我们待在家里的那天为假，而那天原命题也为假。
:::
:::

## 逆命题与逆否命题 {#converse-contrapositive}

每个蕴涵都有三个“亲属”，把它们混为一谈是数学中最常见的逻辑错误之一。

::: definition 逆命题、逆否命题与否命题 {#def-converse}
对于蕴涵$p \Rightarrow q$：

- 它的**逆命题**是$q \Rightarrow p$；
- 它的**逆否命题**是$\neg q \Rightarrow \neg p$；
- 它的**否命题**是$\neg p \Rightarrow \neg q$。
:::

::: theorem 蕴涵与其逆否命题等价 {#thm-contrapositive}
对所有命题$p$和$q$：

1. $p \Rightarrow q \equiv \neg q \Rightarrow \neg p$；
2. $q \Rightarrow p \equiv \neg p \Rightarrow \neg q$（逆命题与否命题等价）；
3. $p \Rightarrow q$与它的逆命题$q \Rightarrow p$**不**逻辑等价。
:::

::: proof
1. 利用[[#thm-laws]]中的定律，

$$
\neg q \Rightarrow \neg p \;\equiv\; \neg\neg q \lor \neg p \;\equiv\; q \lor \neg p \;\equiv\; \neg p \lor q \;\equiv\; p \Rightarrow q,
$$

这里依次用到了蕴涵律、双重否定律、交换律，最后再次用到蕴涵律。

2. 这就是把第1条中$p$与$q$的角色互换。

3. 要证明两个公式**不**等价，只需一个使它们取值不同的指派。取$p$为假、$q$为真：此时$p \Rightarrow q$为真，而$q \Rightarrow p$为假。
:::

::: widget truthtable
formula: p -> q
compare: ~q -> ~p
caption: 蕴涵与其逆否命题的真值表完全相同。把第二个公式换成逆命题$q \Rightarrow p$（输入 q -> p），两张表就有两行不一致；再试试否命题 ~p -> ~q，它与逆命题处处一致。
:::

现在可以彻底解决本章开头的卡片谜题了。对每张卡片，规则说的是$V \Rightarrow E$，其中$V$表示“这张卡片上有元音字母”，$E$表示“这张卡片上有偶数”。一张卡片只有在$V$为真而$E$为假时才可能违反规则。A卡片的$V$为真，所以必须查看$E$。K卡片的$V$为假，所以规则对它空真。4卡片的$E$为真，无论$V$如何，$V \Rightarrow E$都为真。7卡片的$E$为假；由逆否命题$\neg E \Rightarrow \neg V$，只有当它的字母是辅音字母时它才遵守规则，所以必须检查它。翻开4的人检验的是逆命题$E \Rightarrow V$，而规则从未断言过这一点。

::: example 逆命题、逆否命题与否命题 {#ex-converse}
写出命题“如果整数$n$是$6$的倍数，那么$n$是偶数”的逆命题、逆否命题和否命题，并判断其中哪些对每个整数$n$都成立。
::: solution
- **原命题：**如果$n$是$6$的倍数，那么$n$是偶数。真：若$n = 6k$，则$n = 2(3k)$。
- **逆命题：**如果$n$是偶数，那么$n$是$6$的倍数。假：$n = 2$是偶数，但不是$6$的倍数。
- **逆否命题：**如果$n$是奇数，那么$n$不是$6$的倍数。真，由[[#thm-contrapositive]]这是必然的：它与原命题等价。
- **否命题：**如果$n$不是$6$的倍数，那么$n$是奇数。假（$n = 4$），这也是必然的，因为它与为假的逆命题等价。

注意，要驳倒一个“对每个$n$”的论断，一个反例就够了；而为真的论断则需要一个涵盖每个$n$的论证。
:::
:::

### 必要条件与充分条件

当$p \Rightarrow q$成立时，称$p$是$q$的**充分条件**（知道$p$就足以推出$q$），$q$是$p$的**必要条件**（没有$q$就没有$p$——这正是逆否命题）。当$p \Rightarrow q$和$q \Rightarrow p$都成立时，称$p$是$q$的**充分必要条件**，由双条件律，$p \Leftrightarrow q$。许多定理都具有这种形式，它们的证明通常分为两半，每个方向各一半。例如，对整数$n$，“$n^2$是偶数”是“$n$是偶数”的充分必要条件；我们将在[[proofs/proof-techniques]]一章中证明这两个方向。

::: quiz
对实数$x$，条件“$x > 2$”是“$x^2 > 4$”的____。
- [x] 充分但不必要条件
- [ ] 必要但不充分条件
- [ ] 充分必要条件
- [ ] 既不充分也不必要条件
::: solution
若$x > 2$，则$x^2 > 4$，所以该条件是充分的。它不是必要的：$x = -3$满足$x^2 > 4$，却不满足$x > 2$。充分必要条件是$\abs{x} > 2$。
:::
:::

::: warning 误证了逆命题
要求证明“如果$p$，那么$q$”时，一个常见的错误是假定$q$而推出$p$——这证明的是逆命题，是另一个命题。在开始任何证明之前，先清楚地写下你可以假定什么（假设）以及你必须得到什么（结论）。
:::

## 有效论证

数学论证从前提得出结论。逻辑无法告诉我们前提是否为真，但能告诉我们结论是否由前提**推出**。

::: definition 有效论证 {#def-valid}
一个**论证**由公式$P_1, \dots, P_k$（称为**前提**）和一个公式$C$（称为**结论**）组成。如果每一个使所有前提都为真的真值指派都使$C$为真，就称这个论证是**有效的**；等价地说，如果

$$
(P_1 \land P_2 \land \dots \land P_k) \Rightarrow C
$$

是重言式。这时我们记作$P_1, \dots, P_k \;\therefore\; C$。
:::

有效性是论证的**形式**的性质。“如果猪会飞，那么$2$是奇数；猪会飞；所以$2$是奇数”是有效的，尽管其结论为假：有效性只保证**真的前提**导出真的结论。前提确实为真的有效论证称为**可靠的**，而证明应当是一条由可靠的步骤构成的链。

::: theorem 推理规则 {#thm-inference}
以下论证形式都是有效的：

1. **肯定前件式**（modus ponens）：$\;p,\; p \Rightarrow q \;\therefore\; q$。
2. **否定后件式**（modus tollens）：$\;\neg q,\; p \Rightarrow q \;\therefore\; \neg p$。
3. **假言三段论：**$\;p \Rightarrow q,\; q \Rightarrow r \;\therefore\; p \Rightarrow r$。
4. **析取三段论：**$\;p \lor q,\; \neg p \;\therefore\; q$。
5. **分情况证明：**$\;p \lor q,\; p \Rightarrow r,\; q \Rightarrow r \;\therefore\; r$。
:::

::: proof
对每一种形式，我们考虑任意一个使所有前提都为真的指派，并证明它使结论为真。

1. 若$p$为真且$p \Rightarrow q$为真，则$q$不可能为假，因为“$p$真、$q$假”是使$p\Rightarrow q$为假的唯一一行。所以$q$为真。
2. 若$\neg q$为真，则$q$为假。如果$p$为真，那么$p \Rightarrow q$将为假；所以$p$为假，$\neg p$为真。
3. 设$p\Rightarrow q$和$q \Rightarrow r$都为真。结论$p \Rightarrow r$只有在$p$为真而$r$为假时才可能不成立。但这时对$p$和$p\Rightarrow q$运用肯定前件式可知$q$为真，再对$q$和$q\Rightarrow r$运用肯定前件式可知$r$为真——这与$r$为假矛盾。所以$p \Rightarrow r$为真。
4. 若$\neg p$为真，则$p$为假；由于$p \lor q$为真，$q$必定为真。
5. 由于$p\lor q$为真，$p$为真或$q$为真。若$p$为真，则与$p\Rightarrow r$一起运用肯定前件式得到$r$；若$q$为真，则与$q \Rightarrow r$一起运用肯定前件式得到$r$。无论哪种情况，$r$都为真。
:::

有两种无效的形式太常见了，以至于各有专名。**肯定后件**——“$q$，$p\Rightarrow q$，所以$p$”——是无效的：指派$p$假、$q$真使两个前提都为真而结论为假。**否定前件**——“$\neg p$，$p\Rightarrow q$，所以$\neg q$”——出于同样的原因也是无效的，同一个指派就说明了这一点。

::: widget truthtable
formula: ((p -> q) & (q -> r)) -> (p -> r)
caption: 最后一列在全部八行中都是T，所以这个公式是重言式——这恰好就是说假言三段论是有效的。现在输入 ((p -> q) & q) -> p（肯定后件）：它不再是重言式，$p$假、$q$真的那一行就是反例。
:::

::: example 检验一个论证 {#ex-argument}
下面的论证有效吗？“如果程序编译通过，那么测试会运行。如果测试运行并且通过，那么我们就部署。程序编译通过了，但我们没有部署。所以测试没有通过。”
::: solution
设$c$表示“程序编译通过”，$t$表示“测试运行”，$s$表示“测试通过”，$d$表示“我们部署”。前提为

$$
c \Rightarrow t, \qquad (t \land s) \Rightarrow d, \qquad c, \qquad \neg d,
$$

结论为$\neg s$。我们不必写一张$16$行的表，而是把推理规则串联起来：

1. 由$c$和$c\Rightarrow t$，肯定前件式给出$t$。
2. 由$\neg d$和$(t\land s)\Rightarrow d$，否定后件式给出$\neg(t \land s)$，由德摩根律，它就是$\neg t \lor \neg s$。
3. 由$\neg t \lor \neg s$和$t$（即$\neg\neg t$），析取三段论给出$\neg s$。

每一步都有效，所以这个论证是有效的。
:::
:::

::: example 骑士与无赖 {#ex-knights}
在某个岛上，每个居民要么是总说真话的**骑士**，要么是总说假话的**无赖**。你遇到了两个居民$A$和$B$。$A$说：“我们两人中至少有一个是无赖。”$A$和$B$各是什么人？
::: solution
设$a$表示“$A$是骑士”，$b$表示“$B$是骑士”。$A$的话是$\neg a \lor \neg b$。骑士说的话为真，无赖说的话为假，所以$A$的话恰好在$A$是骑士时为真：这一情形由$a \Leftrightarrow (\neg a \lor \neg b)$描述。我们来找使它成立的行：

| $a$ | $b$ | $\neg a \lor \neg b$ | $a \Leftrightarrow (\neg a \lor \neg b)$ |
|---|---|---|---|
| T | T | F | F |
| T | F | T | T |
| F | T | T | F |
| F | F | T | F |

恰有一行是相容的：$A$是骑士，$B$是无赖。也可以直接推理：如果$A$是无赖，他的话就为假，于是两人都不是无赖——这是荒谬的。所以$A$是骑士，而他所说的真话使得$B$是无赖。
:::
:::

## 范式与功能完备性

含$n$个变元的真值表是一个函数，它给$2^n$行中的每一行指定T或F。由于每一行都可以独立地取两个值中的任何一个，这样的**真值函数**共有$2^{2^n}$个：两个变元的有$16$个，三个变元的有$256$个。而我们只有五个联结词。是否每个真值函数都能写成一个公式？

::: definition 范式 {#def-dnf}
**文字**是指一个命题变元或它的否定。如果一个公式是一个或多个由文字构成的合取式的析取，例如$(p \land \neg q) \lor (\neg p \land q \land r)$，就称它是**析取范式**（DNF）。如果一个公式是一个或多个由文字构成的析取式的合取，例如$(p \lor q) \land (\neg p \lor \neg r)$，就称它是**合取范式**（CNF）。
:::

::: theorem 每个真值函数都有析取范式公式 {#thm-dnf}
设$f$是变元$p_1, \dots, p_n$的任一真值函数。则存在一个只用$\neg$、$\land$和$\lor$的析取范式公式，其真值表为$f$。
:::

::: proof
如果$f$在每一行都取值F，那么公式$p_1 \land \neg p_1$（只含一个合取式的析取范式）具有相同的真值表。否则，对$f$取值T的每一行$R$，构造合取式

$$
m_R = \ell_1 \land \ell_2 \land \dots \land \ell_n, \qquad \text{其中 } \ell_i = \begin{cases} p_i & \text{若 } p_i \text{ 在行 } R \text{ 中为 T},\\ \neg p_i & \text{若 } p_i \text{ 在行 } R \text{ 中为 F}.\end{cases}
$$

每个文字$\ell_i$在行$R$中都为真，所以$m_R$在行$R$中为真。在任何其他行$S$中，某个变元$p_i$的值与它在$R$中的值不同，所以$\ell_i$在$S$中为假，$m_R$也为假。因此$m_R$在行$R$中为真，在其他各行都为假。

设$D$是$m_R$对所有使$f$为T的行$R$所作的析取。在这样的一行中，有一个析取项（即$m_R$）为真，所以$D$为真。在使$f$为F的一行中，每个析取项$m_R$都来自另外的行，因而为假，所以$D$为假。因此$D$的真值表就是$f$。
:::

合取式$m_R$称为**极小项**。把定理应用于$\neg f$，再运用德摩根律，就能把$\neg f$的析取范式化为$f$的合取范式，所以每个真值函数也都有合取范式公式。

::: example 多数函数 {#ex-majority}
三个变元的多数函数恰好在$p, q, r$中至少有两个为真时为真。求它的一个公式，并加以化简。
::: solution
多数函数在四行中为T：TTT、TTF、TFT和FTT。[[#thm-dnf]]的证明中的构造给出

$$
(p \land q \land r) \lor (p \land q \land \neg r) \lor (p \land \neg q \land r) \lor (\neg p \land q \land r).
$$

为了化简，用幂等律把第一个极小项写三遍（因为$m \equiv m \lor m \lor m$），并让每一份分别与其余各项之一配对。例如，由分配律、互补律和同一律，

$$
(p\land q\land r)\lor(p\land q\land\neg r) \equiv (p\land q)\land(r\lor\neg r) \equiv (p\land q)\land\top \equiv p\land q.
$$

其余两对以同样的方式给出$p\land r$和$q\land r$，所以

$$
\operatorname{maj}(p,q,r) \equiv (p\land q)\lor(p\land r)\lor(q\land r),
$$

它说的是“其中某两个为真”——这正是定义。
:::
:::

如果每个真值函数都能只用某个联结词集合中的联结词表示出来，就称这个集合是**功能完备的**。[[#thm-dnf]]表明$\{\neg, \land, \lor\}$是功能完备的，而我们还能做得更好。

::: corollary 两个联结词就够了 {#cor-complete}
集合$\{\neg, \land\}$和$\{\neg, \lor\}$都是功能完备的。
:::

::: proof
由[[#thm-dnf]]，每个真值函数都能由一个使用$\neg$、$\land$和$\lor$的公式表示。由德摩根律和双重否定律，$p \lor q \equiv \neg(\neg p \land \neg q)$，所以每个$\lor$都能替换成只用$\neg$和$\land$的表达式；逐个替换它的各次出现，公式保持等价。类似地，利用$p \land q \equiv \neg(\neg p \lor \neg q)$可以消去$\land$，改用$\neg$和$\lor$。
:::

事实上，一个联结词就够了：**与非**（NAND）联结词$p \uparrow q = \neg(p\land q)$单独就是功能完备的（见习题）。不过，并非每个集合都是完备的；$\{\land, \lor\}$就不是，因为只用$\land$和$\lor$由$p$和$q$构造出的公式在$p$和$q$都为真时总是为真，所以它永远无法表示$\neg p$。

::: application 电路与可满足性
克劳德·香农（Claude Shannon）在1937年的硕士论文中证明了开关电路服从命题逻辑的定律：串联的开关相当于$\land$，并联的开关相当于$\lor$。芯片上的逻辑门计算$\neg$、$\land$、$\lor$和与非（NAND），正是由于与非的功能完备性，芯片才能只用同一种门的许多副本搭建起来。一个更难的问题是**可满足性**：给定的公式是否在**某个**指派下为真？真值表需要$2^n$行，当$n = 100$时约为$1.3 \times 10^{30}$行；可满足性问题是第一个被证明为NP完全的问题（斯蒂芬·库克（Stephen Cook），1971年）。即便如此，现代的SAT求解器能够处理含有数百万个变元的工业级公式，并被用于验证硬件和软件。
:::

::: history
亚里士多德（Aristotle）的三段论（公元前4世纪）处理的是“凡人皆有死”这类命题；斯多葛学派的逻辑学家，尤其是公元前3世纪的克吕西波（Chrysippus），分析了用“且”“或”“如果”构成的复合命题。对“如果”的真值函数式解释是由辩证家菲洛（Philo the Dialectician）在公元前300年左右提出的；当时关于条件句的争论如此热烈，以至于诗人卡利马科斯（Callimachus）开玩笑说，连屋顶上的乌鸦都在讨论这个问题。1847年，逻辑成为了代数：这一年，乔治·布尔（George Boole）的《逻辑的数学分析》（*The Mathematical Analysis of Logic*）和奥古斯塔斯·德摩根（Augustus De Morgan）的《形式逻辑》（*Formal Logic*）相继问世；以德摩根命名的定律其实早已为中世纪的逻辑学家所知。1921年，埃米尔·波斯特（Emil Post）和路德维希·维特根斯坦（Ludwig Wittgenstein）都使用了现代形式的真值表；同一年，波斯特还证明了每个重言式都可以由一小组公理推导出来。
:::

## 后续内容

数学命题通常谈论的是**对象**——“$n$是偶数”“对每个$\eps > 0$，存在$\delta > 0$”——因此[[proofs/quantifiers]]一章将引入谓词以及量词“对所有”和“存在”；德摩根律将在那里以否定含量词命题的规则的形式再次出现。在[[proofs/proof-techniques]]一章中，等价式$p \Rightarrow q \equiv \neg q \Rightarrow \neg p$和$\neg(p \Rightarrow q) \equiv p \land \neg q$分别成为逆否证法和反证法。联结词$\land$、$\lor$、$\neg$对应于[[proofs/sets]]一章中集合的交、并、补，也对应于[[probability/probability-spaces]]一章中事件的“且”“或”“非”。以$\oplus$为加法、$\land$为乘法，真值构成[[abstract-algebra/rings]]一章意义下的环。

::: summary
- 命题具有确定的真值。联结词$\neg$、$\land$、$\lor$、$\Rightarrow$、$\Leftrightarrow$由真值表定义；含$n$个变元的公式的真值表有$2^n$行。
- “或”是可兼的。$p\Rightarrow q$仅当$p$为真而$q$为假时为假（当$p$为假时空真）；“$p$仅当$q$”“$p$是$q$的充分条件”和“$q$是$p$的必要条件”都表示$p \Rightarrow q$。
- $P \equiv Q$表示两个公式在每一行都一致。逻辑定律（[[#thm-laws]]），特别是德摩根律$\neg(p\land q)\equiv\neg p\lor\neg q$和$\neg(p\lor q)\equiv\neg p\land\neg q$，使我们能用代数方法化简公式。
- 蕴涵与它的逆否命题$\neg q\Rightarrow\neg p$等价，但与它的逆命题$q \Rightarrow p$不等价。它的否定是$p \land \neg q$，而不是另一个蕴涵。
- 如果每一个使前提都为真的指派都使结论为真，那么论证就是有效的。肯定前件式、否定后件式、假言三段论、析取三段论和分情况证明都是有效的；肯定后件和否定前件则不是。
- 每个真值函数都能写成析取范式（[[#thm-dnf]]），所以$\{\neg,\land,\lor\}$——甚至$\{\neg,\land\}$或单独的与非——都是功能完备的。
:::

## 习题

::: exercise 双条件 {level=1}
写出$p \Leftrightarrow q$和$(p \Rightarrow q)\land(q\Rightarrow p)$的真值表，并验证它们逻辑等价。
::: solution
| $p$ | $q$ | $p\Rightarrow q$ | $q \Rightarrow p$ | $(p\Rightarrow q)\land(q\Rightarrow p)$ | $p\Leftrightarrow q$ |
|---|---|---|---|---|---|
| T | T | T | T | T | T |
| T | F | F | T | F | F |
| F | T | T | F | F | F |
| F | F | T | T | T | T |

最后两列在每一行都一致，所以这两个公式逻辑等价。这就是为什么“$p$当且仅当$q$”的证明通常分成$p \Rightarrow q$和$q \Rightarrow p$两个方向。
:::
:::

::: exercise 翻译 {level=1}
设$p$表示“函数$f$可微”，$q$表示“$f$连续”，$r$表示“$f$有界”。用符号写出：

1. $f$连续但不可微。
2. $f$连续仅当它有界。
3. 可微是连续的充分条件。
4. 除非$f$连续，否则它无界。
::: solution
1. “但”是合取：$q \land \neg p$。
2. “$A$仅当$B$”就是$A \Rightarrow B$：$q \Rightarrow r$。
3. “$A$是$B$的充分条件”就是$A \Rightarrow B$：$p \Rightarrow q$。
4. “除非$B$，否则$A$”就是“如果非$B$，那么$A$”：$\neg q \Rightarrow \neg r$，由[[#thm-contrapositive]]，它等价于$r \Rightarrow q$。
:::
:::

::: exercise 数一数行数 {level=1 check="5"}
在$(p \lor q) \Rightarrow r$的真值表的八行中，它在多少行中为真？
::: solution
该蕴涵恰好在$p \lor q$为真且$r$为假时为假。析取$p\lor q$在$(p,q)$的$4$种取法中的$3$种下为真，而$r$必须为F，所以该公式在$3$行中为假，在其余$8 - 3 = 5$行中为真。
:::
:::

::: exercise 输出律 {level=2}
利用[[#thm-laws]]中的定律（而不是真值表），证明$p \Rightarrow (q \Rightarrow r) \equiv (p \land q) \Rightarrow r$。
::: solution
$$
\begin{aligned}
p \Rightarrow (q \Rightarrow r) &\equiv \neg p \lor (\neg q \lor r) && \text{蕴涵律（两次）}\\
&\equiv (\neg p \lor \neg q) \lor r && \text{结合律}\\
&\equiv \neg(p \land q) \lor r && \text{德摩根律}\\
&\equiv (p \land q) \Rightarrow r && \text{蕴涵律。}
\end{aligned}
$$

这个等价式经常用到：要证明“如果$p$，那么（如果$q$，那么$r$）”，我们假定$p$和$q$都成立，然后推出$r$。
:::
:::

::: exercise 有效与否？ {level=2}
判断下列每个论证是否有效。对有效的论证，指出所用的规则；对无效的论证，给出一个说明其无效的真值指派。

1. 如果我复习，我就能通过考试。如果我通过考试，我就高兴。我不高兴。所以我没有复习。
2. 如果$f$可微，那么$f$连续。$f$不可微。所以$f$不连续。
::: solution
1. 设$r$、$p$、$h$分别表示“我复习”“我通过考试”“我高兴”。由$r \Rightarrow p$和$p\Rightarrow h$，假言三段论给出$r \Rightarrow h$；再结合$\neg h$，否定后件式给出$\neg r$。**有效。**
2. 设$d$ = “$f$可微”，$c$ = “$f$连续”，论证的形式为$d \Rightarrow c,\ \neg d \;\therefore\; \neg c$：这是否定前件。**无效**：当$d$为假、$c$为真时，两个前提都为真而结论为假。一个具体的例子是$f(x) = \abs{x}$，它在$0$处连续但不可微。
:::
:::

::: exercise 两个岛民 {level=2}
在[[#ex-knights]]的岛上，$A$说“$B$是骑士”，$B$说“$A$和我是不同类型的人”。判断$A$和$B$各是什么人。
::: hint
为每个说话者各写出一个双条件式，然后检验四行。
:::
::: solution
$a$、$b$的含义同前，$A$的话给出$a \Leftrightarrow b$，$B$的话“$a$与$b$的值不同”给出$b \Leftrightarrow (a \oplus b)$。

- 若$b$为真，则$B$的话为真，所以$a$与$b$不同，$a$为假。但这样$A$就是一个无赖，而他的话“$B$是骑士”却为真——这不可能。
- 所以$b$为假。于是$A$的话“$B$是骑士”为假，所以$A$是无赖：$a$为假。检验$B$：$B$说两人类型不同，但两人都是无赖，所以这句话为假——这与$B$是无赖相符。

两人都是无赖。
:::
:::

::: exercise 对称的联结词 {level=2 check="8"}
如果对所有真值都有$f(p,q) = f(q,p)$，就称二元真值函数$f(p,q)$是**对称的**。$16$个二元真值函数中有多少个是对称的？
::: solution
对称性只施加了一个条件$f(\mathrm{T},\mathrm{F}) = f(\mathrm{F},\mathrm{T})$（交换$p$与$q$时，TT行和FF行不变）。所以一个对称函数由三个可自由选择的值决定——它在TT上的值、在FF上的值，以及在TF和FT上的公共值——共有$2^3 = 8$个。例如$\land$、$\lor$、$\Leftrightarrow$、$\oplus$、与非（NAND）、或非（NOR）以及两个常值函数；$\Rightarrow$不是对称的。
:::
:::

::: exercise 只用与非就够了 {level=3}
定义$p \uparrow q = \neg(p \land q)$。证明$\{\uparrow\}$是功能完备的。
::: hint
由[[#cor-complete]]，只需仅用$\uparrow$表示出$\neg p$和$p \land q$。
:::
::: solution
由幂等律，$p \uparrow p = \neg(p \land p) \equiv \neg p$。再利用双重否定律，

$$
(p\uparrow q)\uparrow(p\uparrow q) \equiv \neg(p \uparrow q) = \neg\neg(p\land q) \equiv p \land q.
$$

所以$\neg$和$\land$都能只用$\uparrow$表示。对任一真值函数，[[#cor-complete]]给出一个只用$\neg$和$\land$表示它的公式；把每个$\neg A$替换为$A \uparrow A$，把每个$A\land B$替换为$(A\uparrow B)\uparrow(A\uparrow B)$（从最内层的子公式开始逐层向外替换），就得到一个只用$\uparrow$的等价公式。因此$\{\uparrow\}$是功能完备的。（顺便一提，$p \lor q \equiv (p\uparrow p)\uparrow(q\uparrow q)$。）
:::
:::

::: exercise 一个不完备的集合 {level=3}
证明$\{\land, \lor, \Rightarrow\}$不是功能完备的。
::: hint
当每个变元都为真时，这样的公式的真值是什么？
:::
::: solution
断言：由变元只用$\land$、$\lor$和$\Rightarrow$构造出的每个公式，在使每个变元都为真的指派下都为真。单独一个变元在这个指派下为真。如果$A$和$B$是在这个指派下为真的公式，那么$A \land B$、$A \lor B$和$A \Rightarrow B$也是如此（每个联结词在输入为T, T时都给出T）。每个公式都是由变元经过有限多步这样的构造得到的，所以从变元出发逐步向上推（严格地说，是对联结词的个数用归纳法，见[[proofs/induction]]），每个这样的公式在全真指派下都为真。

真值函数$\neg p$在$p$为真时为假，所以没有一个由这些联结词构成的公式能表示它。因此这个集合不是功能完备的。
:::
:::
