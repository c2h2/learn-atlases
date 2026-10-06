我们希望在实数轴上找到一个配得上**长度**这一名称的测度$\lambda$：它应当给每个区间指定其长度，$\lambda([a, b]) = b - a$；它应当是平移不变的，$\lambda(E + t) = \lambda(E)$；而且作为一个测度（[[measure-theory/sigma-algebras#def-measure]]），它应当是可数可加的。这样的测度是存在的——它就是**勒贝格测度**——但它的构造颇为精妙，原因我们将在本章末尾遇到：它不能定义在$\R$的**所有**子集上。

构造分三步。其中的思想与结果同样重要，因为同样的步骤可以构造出面积和体积的测度、序列空间上的概率测度以及许多其他测度。

1. 用可数个区间尽可能经济地覆盖$A$，由此对**每个**集合$A \subseteq \R$定义**外测度**$\lambda^*(A)$。这一步很容易；$\lambda^*$是单调的、可数次可加的，但不是可加的。
2. 挑选出那些能**可加地分割其他每一个集合**的集合——这就是卡拉泰奥多里（Carathéodory）条件。这些集合构成一个σ-代数，$\lambda^*$在其上是可数可加的。
3. 验证区间，从而所有博雷尔集，都在被选出的集合之中。

## 外测度

对开区间$I = (a, b)$，记其长度为$\ell(I) = b - a$。

::: definition 勒贝格外测度 {#def-outer-measure}
对$A \subseteq \R$，$A$的**勒贝格外测度**定义为

$$
\lambda^*(A) = \inf\set{\sum_{k=1}^\infty\ell(I_k) : I_1, I_2, \ldots \text{ 是开区间，且 } A \subseteq \bigcup_{k=1}^\infty I_k}.
$$

其值可以是$\infty$（当每个这样的和都发散时）。
:::

正是**可数**覆盖使这个定义威力强大。若用有限覆盖，得到的是较早的若尔当（Jordan）容量，在它之下，$[0, 1]$中有理数集的大小将是$1$（见[[#ex-rationals-measure]]）。用可数覆盖，有理数集就变得可以忽略不计了。

::: theorem 外测度的性质 {#thm-outer-properties}
1. $\lambda^*(\varnothing) = 0$，并且当$A \subseteq B$时，$\lambda^*(A) \le \lambda^*(B)$。
2. （**可数次可加性。**）对所有集合$A_n \subseteq \R$，$\lambda^*\bigl(\bigcup_{n=1}^\infty A_n\bigr) \le \sum_{n=1}^\infty\lambda^*(A_n)$。
3. （**平移不变性。**）对每个$t \in \R$，$\lambda^*(A + t) = \lambda^*(A)$，其中$A + t = \set{a + t : a \in A}$。
4. 每个可数集的外测度都为$0$。
:::

::: proof
(1) 对任意$\eps > 0$，空集可以被长度为$\eps/2^k$的区间覆盖。$B$的每个覆盖都是$A$的覆盖，所以$A$的下确界是在一个更大的族上取的，它不超过$B$的下确界。

(2) 不妨设每个$\lambda^*(A_n)$都有限。设$\eps > 0$。对每个$n$，取覆盖$A_n$的开区间$I_{n,k}$，使$\sum_k\ell(I_{n,k}) < \lambda^*(A_n) + \eps/2^n$。所有区间$I_{n,k}$合在一起构成$\bigcup_n A_n$的一个可数覆盖，所以

$$
\lambda^*\Bigl(\bigcup_n A_n\Bigr) \le \sum_{n,k}\ell(I_{n,k}) < \sum_n\Bigl(\lambda^*(A_n) + \frac{\eps}{2^n}\Bigr) = \sum_n\lambda^*(A_n) + \eps.
$$

（这里把所有区间$I_{n,k}$排成一个序列；由于各项非负，它们长度的每个有限部分和——从而整个和——都不超过$\sum_n\sum_k\ell(I_{n,k})$。）由于$\eps$是任意的，不等式得证。

(3) 区间$I_k$覆盖$A$当且仅当平移后的区间$I_k + t$覆盖$A + t$，而平移保持长度不变。

(4) 若$A = \set{a_1, a_2, \dots}$，用一个长度为$\eps/2^k$的区间覆盖$a_k$；总长度为$\eps$。
:::

::: widget cantor
mode: rationals
size: 8
caption: 沿着之字形路线走遍分数表，可以把正有理数排成$q_1, q_2, q_3, \dots$。用长度为$\eps/2^k$的开区间覆盖$q_k$，就以至多为$\eps$的总长度覆盖了每个正有理数——无论$\eps$多么小；改用序列$0, q_1, -q_1, q_2, -q_2, \dots$，同样的做法就覆盖了整个$\Q$。这就是为什么$\lambda^*(\Q) = 0$，尽管$\Q$是稠密的，与每个区间都相交。
:::

::: example 有理数集：可数覆盖与有限覆盖 {#ex-rationals-measure}
证明$\lambda^*(\Q\cap[0, 1]) = 0$，但任何覆盖$\Q\cap[0, 1]$的**有限**个开区间的总长度至少为$1$。
::: solution
**可数覆盖。**把$[0, 1]$中的有理数排成$q_1, q_2, \dots$，用长度为$\eps 2^{-k}$的区间$\bigl(q_k - \eps2^{-k-1}, q_k + \eps2^{-k-1}\bigr)$覆盖$q_k$。总长度为$\eps$，所以对每个$\eps > 0$都有$\lambda^*(\Q\cap[0,1]) \le \eps$。

**有限覆盖。**设开区间$I_1, \dots, I_m$覆盖$\Q\cap[0,1]$，其并为$U$。则$[0, 1]\setminus U$是有限个区间的并（有限个区间的补集与交都是区间的有限并），并且不含任何有理数。长度为正的区间都含有有理数，所以这些区间中的每一个都是单点：$[0, 1]\setminus U$是一个有限集$F$。由于各$I_k$本身就构成$U$的一个覆盖，而且$[0, 1] \subseteq U \cup F$，利用$\lambda^*([0, 1]) = 1$（在下面的[[#thm-outer-interval]]中证明）得

$$
1 = \lambda^*([0, 1]) \le \lambda^*(U) + \lambda^*(F) \le \sum_{k=1}^m\ell(I_k) + 0.
$$

所以有限覆盖看不出有理数集是小的；这就是为什么用有限覆盖定义的较早的若尔当容量根本无法度量$\Q\cap[0,1]$。
:::
:::

对这个定义的第一个真正考验，是它能否给区间以正确的值。不等式$\lambda^*([a, b]) \le b - a$很容易；反向不等式则需要用到紧性。

::: theorem 区间的外测度 {#thm-outer-interval}
对每个端点为$a \le b$的区间$I$（开区间、闭区间或半开区间），$\lambda^*(I) = b - a$。无界区间的外测度为无穷大。
:::

::: proof
**闭区间，上界。**对每个$\eps > 0$，单独一个区间$(a - \eps, b + \eps)$就覆盖了$[a, b]$，所以$\lambda^*([a, b]) \le b - a + 2\eps$，从而它$\le b - a$。

**闭区间，下界。**设$(I_k)$是$[a, b]$的任一由开区间构成的可数覆盖。由海涅-博雷尔（Heine–Borel）定理（[[real-analysis/metric-spaces#thm-heine-borel]]），其中有限个区间就已经覆盖了$[a, b]$；只需证明这有限个区间的总长度大于$b - a$。从中选一个包含$a$的区间$(a_1, b_1)$。若$b_1 \le b$，则$b_1 \in [a, b]$被这有限个区间中的另一个$(a_2, b_2)$覆盖，$a_2 < b_1 < b_2$。如此继续：只要$b_j \le b$，就从这个有限覆盖中再选一个包含$b_j$的区间$(a_{j+1}, b_{j+1})$。右端点严格递增，所以没有区间被选中两次，这一过程至多经过有限步就会停止，此时某个$b_m > b$。于是

$$
\sum_{j=1}^m (b_j - a_j) = b_m - a_1 + \sum_{j=1}^{m-1}(b_j - a_{j+1}) \ge b_m - a_1 > b - a,
$$

这是因为每个$a_{j+1} < b_j$，$b_m > b$且$a_1 < a$。所以每个覆盖的总长度都大于$b - a$，从而$\lambda^*([a, b]) \ge b - a$。

**其他区间。**若$I$的端点为$a < b$，则对充分小的$\eps > 0$，$[a + \eps, b - \eps] \subseteq I \subseteq [a, b]$，所以由单调性，$b - a - 2\eps \le \lambda^*(I) \le b - a$。无界区间对每个$n$都包含某个区间$[c, c + n]$，所以它的外测度对每个$n$都至少为$n$。
:::

结合性质4，这就给出了$[0, 1]$不可数的一个测度论证明：可数集的外测度为$0$，而$[0, 1]$的外测度为$1$（比较[[real-analysis/real-numbers#thm-r-uncountable]]）。

::: warning 外测度不是可加的
人们自然希望对互不相交的集合有$\lambda^*(A \cup B) = \lambda^*(A) + \lambda^*(B)$。对“合理”的集合确实如此，但一般并不成立：下面的[[#thm-vitali]]蕴含存在互不相交的集合$A$、$B$，使$\lambda^*(A \cup B) < \lambda^*(A) + \lambda^*(B)$（[[#exr-2-7]]）。外测度能度量每个集合，但它不是$\mathcal{P}(\R)$上的测度。我们必须把它限制在一个较小的集族上。
:::

## 卡拉泰奥多里条件

应该保留哪些集合？卡拉泰奥多里的回答是：恰好保留这样一些集合，它们把$\R$的每个集合切成两块，而两块的外测度相加恰好等于原集合的外测度。

::: definition 勒贝格可测集 {#def-caratheodory}
称集合$E \subseteq \R$是**勒贝格可测**的，如果对每个集合$A \subseteq \R$，都有

$$
\lambda^*(A) = \lambda^*(A \cap E) + \lambda^*(A \setminus E).
$$ {#eq-caratheodory}

勒贝格可测集的全体记为$\mathcal{L}$。
:::

[[#eq-caratheodory]]中的集合$A$是一个“试验集”，$E$必须通过每一次试验。由于$A = (A \cap E) \cup (A \setminus E)$，由次可加性，“$\le$”总是成立的；所以只要对每个满足$\lambda^*(A) < \infty$的$A$都有$\lambda^*(A) \ge \lambda^*(A\cap E) + \lambda^*(A \setminus E)$，$E$就是可测的。这个条件关于$E$及其补集是对称的。

::: intuition 为什么要用每个集合来检验？
设想用内、外两种逼近把区域$E$夹在中间，以此来定义它的面积。卡拉泰奥多里条件是这一想法的一个更巧妙的版本：如果$E$的边界足够“薄”，使得无论考察哪个集合$A$，沿$E$切开$A$都不会有任何损失，那么$E$就是可测的。像维塔利集那样以无可救药的不规则方式散布在每个区间中的集合，对某个$A$通不过检验：两块$A\cap E$和$A \setminus E$各自所需的覆盖，几乎和整个$A$的覆盖一样大。
:::

::: theorem 卡拉泰奥多里定理 {#thm-caratheodory}
$\mathcal{L}$是σ-代数，它包含每个外测度为$0$的集合，并且$\lambda^*$在$\mathcal{L}$上的限制是一个完备测度。
:::

::: proof
证明只用到[[#thm-outer-properties]]的性质1和性质2，所以它对任何外测度都适用。

**第1步：零测集与补集。**若$\lambda^*(Z) = 0$，则由单调性，对每个$A$都有$\lambda^*(A\cap Z) + \lambda^*(A\setminus Z) \le 0 + \lambda^*(A)$，所以$Z \in \mathcal{L}$。特别地，$\varnothing \in \mathcal{L}$。由于把$E$换成$E^c$时[[#eq-caratheodory]]不变，$\mathcal{L}$对取补集封闭，并且$\R = \varnothing^c \in \mathcal{L}$。

**第2步：有限并。**设$E, F \in \mathcal{L}$，$A \subseteq \R$。先对$A$应用$E$的可测条件，再对$A\setminus E$应用$F$的可测条件，得

$$
\lambda^*(A) = \lambda^*(A \cap E) + \lambda^*\bigl((A\setminus E)\cap F\bigr) + \lambda^*\bigl(A\setminus(E \cup F)\bigr) \ge \lambda^*\bigl(A \cap (E\cup F)\bigr) + \lambda^*\bigl(A \setminus(E\cup F)\bigr),
$$

这里用到了次可加性以及$(A\cap E)\cup\bigl((A\setminus E)\cap F\bigr) = A \cap(E \cup F)$。所以$E \cup F \in \mathcal{L}$；结合第1步，$\mathcal{L}$对有限并、有限交和差都封闭。

**第3步：在试验集上的可加性。**若$E_1, \dots, E_n \in \mathcal{L}$互不相交，$B_n = E_1\cup\cdots\cup E_n$，则对每个$A$，

$$
\lambda^*(A \cap B_n) = \sum_{k=1}^n\lambda^*(A\cap E_k).
$$ {#eq-additive-on-tests}

当$n = 1$时这是平凡的。对试验集$A \cap B_n$应用$E_n$的可测条件：由于各$E_k$互不相交，$A\cap B_n\cap E_n = A \cap E_n$，$(A\cap B_n)\setminus E_n = A \cap B_{n-1}$，所以$\lambda^*(A\cap B_n) = \lambda^*(A\cap E_n) + \lambda^*(A\cap B_{n-1})$，再用归纳法即可完成证明。

**第4步：可数并。**设$E_1, E_2, \ldots \in \mathcal{L}$，$E = \bigcup_k E_k$。把$E_k$换成$E_k\setminus(E_1\cup\cdots\cup E_{k-1})$（由第2步，它属于$\mathcal{L}$，并且并集不变），我们可以假设各$E_k$互不相交。令$B_n = E_1\cup\cdots\cup E_n \in \mathcal{L}$。对每个$A$，由[[#eq-additive-on-tests]]和单调性（$A \setminus B_n \supseteq A \setminus E$），

$$
\lambda^*(A) = \lambda^*(A\cap B_n) + \lambda^*(A\setminus B_n) \ge \sum_{k=1}^n\lambda^*(A\cap E_k) + \lambda^*(A\setminus E).
$$

令$n \to \infty$，再利用可数次可加性，得

$$
\lambda^*(A) \ge \sum_{k=1}^\infty\lambda^*(A\cap E_k) + \lambda^*(A\setminus E) \ge \lambda^*(A\cap E) + \lambda^*(A\setminus E).
$$ {#eq-countable-step}

所以$E \in \mathcal{L}$，从而$\mathcal{L}$是σ-代数。

**第5步：可数可加性与完备性。**在[[#eq-countable-step]]中取$A = E$，得$\lambda^*(E) \ge \sum_k\lambda^*(E_k)$，而次可加性给出反向不等式，所以对互不相交的$E_k \in \mathcal{L}$，$\lambda^*(\bigcup E_k) = \sum\lambda^*(E_k)$。最后，零测集的子集的外测度为$0$，因而由第1步属于$\mathcal{L}$：这个测度是完备的。
:::

::: quiz
关于勒贝格外测度$\lambda^*$，下列哪些说法是正确的？选出所有正确的选项。
- [x] $\lambda^*(A)$对每个子集$A \subseteq \R$都有定义。
- [ ] 对所有互不相交的$A, B$，$\lambda^*(A \cup B) = \lambda^*(A) + \lambda^*(B)$。
- [ ] 若$\lambda^*(A) = 0$，则$A$是可数集。
- [x] 满足$\lambda^*(A) = 0$的集合是勒贝格可测的。
::: solution
外测度对所有集合都有定义，而零测集能通过卡拉泰奥多里检验（[[#thm-caratheodory]]的证明的第1步）。对某些互不相交的集合对，可加性不成立（[[#exr-2-7]]）——这正是我们要限制到$\mathcal{L}$上的原因。零测集也可以是不可数的：下面的康托尔集就是一个例子。
:::
:::

## 勒贝格测度

如果$\mathcal{L}$只包含零测集及其补集，卡拉泰奥多里定理就毫无用处了。关键的验证是：半直线能通过检验。

::: theorem 博雷尔集是勒贝格可测的 {#thm-borel-measurable}
每个博雷尔集都是勒贝格可测的：$\mathcal{B}(\R) \subseteq \mathcal{L}$。
:::

::: proof
由[[measure-theory/sigma-algebras#thm-borel-generators]]，半直线$(c, \infty)$生成$\mathcal{B}(\R)$，而$\mathcal{L}$是σ-代数，所以只需证明$E = (c, \infty)$可测。设$A \subseteq \R$，$\lambda^*(A) < \infty$，并设$\eps > 0$。取覆盖$A$的开区间$I_k$，使$\sum_k\ell(I_k) < \lambda^*(A) + \eps$。每个$I_k$分成两个区间$I_k' = I_k \cap (c, \infty)$和$I_k'' = I_k \cap (-\infty, c]$（其中任一个都可能是空集），它们的长度之和为$\ell(I_k)$。各$I_k'$覆盖$A\cap E$，各$I_k''$覆盖$A \setminus E$。它们不全是开区间，但由[[#thm-outer-interval]]，每个区间的外测度都等于它的长度，所以由次可加性，

$$
\lambda^*(A \cap E) + \lambda^*(A\setminus E) \le \sum_k\lambda^*(I_k') + \sum_k\lambda^*(I_k'') = \sum_k\ell(I_k) < \lambda^*(A) + \eps.
$$

由于$\eps$是任意的，$E$满足[[#eq-caratheodory]]。
:::

::: definition 勒贝格测度 {#def-lebesgue-measure}
外测度$\lambda^*$在勒贝格可测集构成的σ-代数$\mathcal{L}$上的限制$\lambda$称为**勒贝格测度**。由[[#thm-caratheodory]]、[[#thm-outer-interval]]和[[#thm-borel-measurable]]，$(\R, \mathcal{L}, \lambda)$是完备测度空间，每个博雷尔集都可测，并且对每个区间$I$，$\lambda(I)$就是它的长度。
:::

勒贝格测度是平移不变的：由[[#thm-outer-properties]](3)，只要$E$通过卡拉泰奥多里检验，$E + t$也能通过，并且$\lambda(E + t) = \lambda(E)$。它是σ-有限的，因为$\R = \bigcup_n[-n, n]$。而且它是$\mathcal{B}(\R)$上唯一给区间以其长度的测度：两个这样的测度在每个$[-n, n]$内的区间$(a, b]$构成的π-系上相等，因而由[[measure-theory/sigma-algebras#thm-uniqueness]]，在$[-n, n]$的所有博雷尔子集上相等，从而由下连续性，处处相等。

::: example 开集 {#ex-open-sets}
证明每个开集$U \subseteq \R$都是可数个两两不相交的开区间的并，并由此推出$\lambda(U)$等于这些区间的长度之和。
::: solution
对$x \in U$，令$I_x$为所有满足$x \in J \subseteq U$的开区间$J$的并。有公共点的区间之并是区间，开集之并是开集，所以$I_x$是满足$x \in I_x \subseteq U$的最大开区间（可能无界）。若$I_x \cap I_y \ne \varnothing$，则$I_x \cup I_y$是$U$中包含$x$的开区间，所以由最大性，$I_x \cup I_y \subseteq I_x$；同理，它也$\subseteq I_y$：两者重合。所以互不相同的区间$I_x$两两不相交，并且它们的并是$U$。每个这样的区间都含有一个有理数，不相交的区间所含的有理数各不相同，所以这样的区间只有可数个。由可数可加性和[[#thm-outer-interval]]，$\lambda(U) = \sum\ell(I)$，求和取遍这些区间。例如，$U = \bigcup_{n\ge1}(n, n + 2^{-n})$是无界的，但测度为$1$。
:::
:::

::: example 测度很小的稠密开集 {#ex-open-dense}
给定$\eps > 0$，构造一个与每个区间都相交、但$\lambda(U) \le \eps$的开集$U \subseteq \R$。由此推出$K = [0, 1]\setminus U$是一个不含任何区间的闭集，且$\lambda(K) \ge 1 - \eps$。
::: solution
把有理数排成$q_1, q_2, \dots$，令$U = \bigcup_k\bigl(q_k - \eps2^{-k-1}, q_k + \eps 2^{-k-1}\bigr)$。它是开集，包含$\Q$，因而与每个区间都相交；由次可加性，$\lambda(U) \le \sum_k\eps2^{-k} = \eps$。集合$K = [0, 1]\cap U^c$是闭集；它不含任何长度为正的区间，因为每个这样的区间都含有一个有理数，而这个有理数属于$U$；并且$\lambda(K) = 1 - \lambda([0,1]\cap U) \ge 1 - \eps$。所以一个在拓扑意义下“瘦”的集合（内部为空的闭集）可以有很大的测度，而一个在拓扑意义下“大”的集合（稠密开集）可以有很小的测度。测度与拓扑度量的是不同的东西。
:::
:::

$\mathcal{L}$有多大？你能明确描述出来的每个集合都在其中；而且在一种精确的意义下，每个可测集都是一个博雷尔集，至多相差一个零测集：可测集可以从外部用开集逼近，从内部用闭集逼近。

::: theorem 勒贝格测度的正则性 {#thm-regularity}
对每个$A \subseteq \R$，$\lambda^*(A) = \inf\set{\lambda(U) : U \supseteq A,\ U \text{ 为开集}}$。此外，对$E \subseteq \R$，下列条件等价：

1. $E$勒贝格可测；
2. 对每个$\eps > 0$，存在开集$U \supseteq E$，使$\lambda^*(U \setminus E) < \eps$；
3. 对每个$\eps > 0$，存在闭集$F \subseteq E$，使$\lambda^*(E \setminus F) < \eps$；
4. $E = G \setminus Z$，其中$G$是某个$G_\delta$型集，$Z$是某个零测集。
:::

::: proof
**外正则性。**由单调性，对每个开集$U \supseteq A$，$\lambda^*(A) \le \lambda(U)$。反之，若$\lambda^*(A) < \infty$且$\eps > 0$，取覆盖$A$的开区间$I_k$，使$\sum\ell(I_k) < \lambda^*(A) + \eps$；它们的并$U$是开集，包含$A$，并且$\lambda(U) \le \sum\ell(I_k) < \lambda^*(A) + \eps$。

**(1) ⇒ (2)。**先设$\lambda(E) < \infty$。由外正则性，存在开集$U \supseteq E$，使$\lambda(U) < \lambda(E) + \eps$；由于$E$可测，$\lambda(U\setminus E) = \lambda(U) - \lambda(E) < \eps$。一般情形下，对$E_n = E \cap [-n, n]$和$\eps/2^n$应用这一结论，得到开集$U_n \supseteq E_n$，使$\lambda(U_n \setminus E_n) < \eps/2^n$；于是$U = \bigcup U_n$是开集，包含$E$，并且$U \setminus E \subseteq \bigcup_n(U_n \setminus E_n)$的测度小于$\eps$。

**(2) ⇒ (4)。**取开集$U_n \supseteq E$，使$\lambda^*(U_n\setminus E) < 1/n$，令$G = \bigcap_n U_n$，它是一个包含$E$的$G_\delta$型集。于是$Z = G \setminus E \subseteq U_n \setminus E$对每个$n$都满足$\lambda^*(Z) < 1/n$，所以$Z$是零测集，并且$E = G\setminus Z$。

**(4) ⇒ (1)。**$G$是博雷尔集，因而可测；由[[#thm-caratheodory]]，$Z$可测；所以$E = G \cap Z^c \in \mathcal{L}$。

**(1) ⇔ (3)。**$E$可测当且仅当$E^c$可测，而由(1) ⇔ (2)，后者成立当且仅当对每个$\eps$，存在开集$U \supseteq E^c$，使$\lambda^*(U \setminus E^c) < \eps$。令$F = U^c$：它是闭集，$F \subseteq E$，并且$E\setminus F = E \cap U = U \setminus E^c$。
:::

所以勒贝格可测集就是$G_\delta$型集去掉一个零测集，或者同样地，是$F_\sigma$型集添上一个零测集；勒贝格σ-代数是博雷尔σ-代数的**完备化**（[[measure-theory/sigma-algebras#exr-1-9]]）。把(3)中的闭集与$[-n, n]$相交，还可以证明$\lambda(E) = \sup\set{\lambda(K) : K \subseteq E \text{ 为紧集}}$（[[#exr-2-9]]）。

## 康托尔集

可数集的测度为零。是否存在**不可数**的零测集？最著名的例子是通过反复去掉中间三分之一构造出来的。

::: example 康托尔集 {#ex-cantor-set}
令$C_0 = [0, 1]$，从$C_n$的每个区间中去掉中间那个开的三分之一，得到$C_{n+1}$：$C_1 = [0, \tfrac13]\cup[\tfrac23, 1]$，$C_2 = [0, \tfrac19]\cup[\tfrac29, \tfrac13]\cup[\tfrac23, \tfrac79]\cup[\tfrac89, 1]$，依此类推。**康托尔集**是$C = \bigcap_n C_n$。证明$C$是紧的、不可数的，且勒贝格测度为$0$。
::: solution
**测度。**$C_n$是$2^n$个互不相交的闭区间的并，每个区间的长度为$3^{-n}$，所以$\lambda(C_n) = (2/3)^n$。这些集合是递减的，且$\lambda(C_0) = 1 < \infty$，所以由上连续性（[[measure-theory/sigma-algebras#thm-continuity-measure]]），$\lambda(C) = \lim(2/3)^n = 0$。等价地，被去掉的区间的总长度为$\sum_{n\ge1}2^{n-1}/3^n = 1$：就长度而言，一切都被去掉了。

**紧性。**$C$是闭集的交，因而是闭集，而且它是有界的。

**不可数性。**数$x \in [0, 1]$属于$C$，当且仅当它有一个只用数字$d_k \in \set{0, 2}$的三进制（以$3$为基数）展开$x = \sum_{k\ge1}d_k3^{-k}$：在第$k$步，去掉中间三分之一，就是去掉那些第$k$位数字必须为$1$的数。（像$\tfrac13 = 0.1000\ldots_3 = 0.0222\ldots_3$这样的点有一个符合要求的展开。）$\set{0, 2}^{\N}$中不同的数字序列给出不同的数，所以$C$与由$0$和$2$组成的全体无穷序列之集一一对应，而由康托尔对角线论证（[[proofs/cardinality]]），后者是不可数的。事实上，映射$\sum d_k3^{-k} \mapsto \sum(d_k/2)2^{-k}$把$C$**满射**地映到$[0, 1]$上，所以$C$的点与$[0,1]$的点一样多。
:::
:::

::: widget sequence
a: 2^(n-1)/3^n
mode: both
N: 30
limit: 1
caption: 构造康托尔集时被去掉的长度：第$n$步去掉$2^{n-1}$个长度为$3^{-n}$的区间。它们的部分和逐步增加到$1$，即$[0, 1]$的全长，所以剩下的康托尔集测度为$0$——尽管它仍然含有不可数多个点，其中包括$\tfrac14 = 0.0202\ldots_3$，它从来不是任何被去掉区间的端点。
:::

康托尔集解决了一个关于$\mathcal{L}$本身的问题。由于$\lambda(C) = 0$且勒贝格测度是完备的，$C$的**每个**子集都是勒贝格可测的。$C$具有$\R$的基数$\mathfrak{c}$，所以$\mathcal{L}$至少有$2^{\mathfrak{c}}$个成员；但博雷尔集只有$\mathfrak{c}$个。因此，**存在不是博雷尔集的勒贝格可测集**。（[[measure-theory/measurable-functions#ex-cantor-function]]给出了一个具体的例子：一个不可测集在由康托尔函数构造的同胚之下的原像。）

::: quiz
$[0, 1]$中无理数集的勒贝格测度是多少？
- [ ] $0$，因为无理数集不包含任何区间
- [x] $1$
- [ ] 没有定义，因为无理数集不可测
- [ ] $\tfrac12$
::: solution
$[0, 1]\cap\Q$是可数集，因而可测且测度为$0$，而$[0,1]$的测度为$1$。$[0, 1]$中的无理数构成可测集$[0,1]\setminus\Q$，其测度为$1 - 0 = 1$。一个集合可以不含任何区间却具有满测度；而且——正如康托尔集所表明的——一个集合可以不可数而测度为$0$。测度意义下的大小，与基数意义下或拓扑意义下的大小是不同的。
:::
:::

## 不可测集

$\R$的每个子集都是勒贝格可测的吗？如果是这样，勒贝格测度就是$\R$的所有子集上一个可数可加、平移不变、给$[0, 1]$指定长度$1$的测度。维塔利证明了这样的测度不存在。

::: theorem 维塔利定理 {#thm-vitali}
假定选择公理成立，则存在不是勒贝格可测的子集$V \subseteq [0, 1]$。更确切地说，定义在$\R$的所有子集上的可数可加、平移不变的测度，都不可能给$[0, 1]$一个有限的正测度。
:::

::: proof
若$x - y \in \Q$，就称$x, y \in [0, 1]$等价。这是一个等价关系（[[proofs/relations]]），其等价类就是集合$(x + \Q)\cap[0, 1]$。由选择公理，存在一个集合$V \subseteq [0, 1]$，它恰好含有每个等价类中的一个元素。设$q_1, q_2, \ldots$是$\Q\cap[-1, 1]$的一个枚举，令$V_k = V + q_k$。

**这些平移集互不相交。**若$v + q_j = w + q_k$，其中$v, w \in V$，则$v - w = q_k - q_j \in \Q$，所以$v$与$w$等价；由于$V$在每个等价类中只含一个元素，$v = w$，从而$q_j = q_k$，所以$j = k$。

**它们覆盖$[0, 1]$，并且包含于$[-1, 2]$。**若$x \in [0, 1]$，设$v \in V$是$x$所在等价类的代表元。则$x - v \in \Q$且$\abs{x - v} \le 1$，所以对某个$k$有$x - v = q_k$，从而$x \in V_k$。而且每个$V_k \subseteq [0,1] + [-1, 1] = [-1, 2]$。因此

$$
[0, 1] \subseteq \bigcup_{k=1}^\infty V_k \subseteq [-1, 2].
$$

现在设$\mu$是定义在一个包含$V$和所有区间的平移不变σ-代数上的平移不变测度，且$\mu([0, 1])$有限且为正（例如，如果$V$是勒贝格可测的，就可以取$\mu = \lambda$）。则所有$V_k$的测度都是$\mu(V)$，由可数可加性和单调性，

$$
\mu([0, 1]) \le \sum_{k=1}^\infty\mu(V) \le \mu([-1, 2]) \le 3\mu([0,1]).
$$

若$\mu(V) = 0$，则中间的和为$0$，与$\mu([0,1]) > 0$矛盾；若$\mu(V) > 0$，则这个和为$\infty$，与$\mu([-1,2]) < \infty$矛盾。所以这样的$\mu$不存在，特别地，$V \notin \mathcal{L}$。
:::

::: warning 不可测集在自然界中是找不到的
维塔利集不是构造出来的，而是**选**出来的：它用选择公理从不可数多个等价类中各挑出一个点。这是无法避免的：罗伯特·索洛韦（Robert Solovay）在1970年证明了，“$\R$的每个子集都勒贝格可测”与集合论的其他公理是相容的（假定不可达基数的存在是相容的）。实际上，由极限、并、交、连续函数之类的手段产生的每个集合都是博雷尔集，因而是可测的。不可测集解释了我们**为什么**需要σ-代数；它们并不妨碍分析学的展开。
:::

::: history
亨利·勒贝格（Henri Lebesgue）在1902年的博士论文《积分、长度与面积》（*Intégrale, longueur, aire*）中，以埃米尔·博雷尔（Émile Borel）1898年的测度为基础，定义了集合的测度：他用区间逼近来定义外测度和内测度，并把两者相等的集合称为可测集。朱塞佩·维塔利（Giuseppe Vitali）在1905年构造了他的不可测集。康斯坦丁·卡拉泰奥多里（Constantin Carathéodory）在1914年发现了本章所用的条件；它使构造不再依赖于内测度，并适用于任何外测度，如今大多数测度都是这样构造出来的。康托尔集出现在亨利·史密斯（Henry Smith）1875年的一篇论文中，格奥尔格·康托尔（Georg Cantor）在1883年研究了它。1970年，罗伯特·索洛韦（Robert Solovay）证明了：不用选择公理，就无法证明不可测集的存在。
:::

## 后续内容

有了勒贝格测度，我们就可以求积分了。[[measure-theory/measurable-functions]]一章刻画那些水平集可测的函数，[[measure-theory/lebesgue-integral]]一章则用简单函数（即可测集的示性函数的有限组合）从下方逼近$f$，以此定义$\int f\,d\lambda$。本章的构造可以立即推广：用矩形覆盖，就得到$\R^n$上的勒贝格测度（即[[multivariable/multiple-integrals]]一章中非正式地使用的面积和体积）；对递增且右连续的$F$，把$b - a$换成$F(b) - F(a)$，就得到满足$\mu_F((a, b]) = F(b) - F(a)$的勒贝格-斯蒂尔杰斯（Lebesgue–Stieltjes）测度$\mu_F$，其中$F$在$-\infty$处趋于$0$、在$+\infty$处趋于$1$的那些，恰好就是实随机变量的分布（[[probability/continuous-random-variables]]）；而卡拉泰奥多里定理还能构造出概率论所需要的、描述无穷多次抛掷硬币的测度。

::: summary
- 勒贝格外测度$\lambda^*(A)$是用开区间对$A$作可数覆盖时总长度的下确界（[[#def-outer-measure]]）。它对所有集合都有定义，具有单调性、可数次可加性和平移不变性；可数集的外测度为$0$。
- $\lambda^*([a, b]) = b - a$；证明需要用到海涅-博雷尔定理（[[#thm-outer-interval]]）。
- 卡拉泰奥多里条件挑选出对所有$A$都满足$\lambda^*(A) = \lambda^*(A\cap E) + \lambda^*(A\setminus E)$的集合$E$；它们构成一个σ-代数，$\lambda^*$在其上是完备测度（[[#thm-caratheodory]]）。
- 所有博雷尔集都可测；勒贝格测度给区间以其长度，是平移不变的，并且是博雷尔集上唯一具有这种性质的测度。
- 正则性：可测集可以从外部用开集逼近，从内部用闭集逼近；每个可测集都是一个$G_\delta$型集去掉一个零测集（[[#thm-regularity]]）。
- 康托尔集是紧的、不可数的零测集；它的子集表明，有些可测集不是博雷尔集。
- 在选择公理之下，维塔利集是不可测的：在$\R$的所有子集上无法定义平移不变且可数可加的长度（[[#thm-vitali]]）。
:::

## 习题

::: exercise 区间中的无理数 {level=1 check="2"}
求$[0, 2]$中无理数集的勒贝格测度。
::: solution
$\Q\cap[0, 2]$是可数集，所以它可测且测度为$0$（[[#thm-outer-properties]]和[[#thm-caratheodory]]）。$[0,2]$中的无理数构成$[0, 2]\setminus\Q$，所以它们的测度为$\lambda([0,2]) - 0 = 2$。
:::
:::

::: exercise 零测集是看不见的 {level=1}
设$\lambda^*(Z) = 0$。证明对每个$A \subseteq \R$，$\lambda^*(A \cup Z) = \lambda^*(A)$且$\lambda^*(A\setminus Z) = \lambda^*(A)$。
::: solution
由单调性和次可加性，$\lambda^*(A) \le \lambda^*(A \cup Z) \le \lambda^*(A) + \lambda^*(Z) = \lambda^*(A)$。至于第二个等式，$A \subseteq (A\setminus Z)\cup Z$，所以$\lambda^*(A) \le \lambda^*(A \setminus Z) + 0 \le \lambda^*(A)$，最后一步用到了单调性。
:::
:::

::: exercise 可数集 {level=1}
证明$\R$的每个可数子集都是勒贝格测度为$0$的博雷尔集，并证明每个满足$\lambda^*(A) = 0$的集合$A$都是勒贝格可测的。
::: solution
可数集是可数个单点集的并，而单点集是闭集，所以可数集是博雷尔集（一个$F_\sigma$型集）；由[[#thm-outer-properties]](4)，它的外测度为$0$，所以$\lambda(A) = 0$。由[[#thm-caratheodory]]的证明的第1步，任何外测度为$0$的集合都满足卡拉泰奥多里条件。
:::
:::

::: exercise 避开一个数字 {level=2 check="0"}
设$E$是$[0, 1]$中具有某个从不出现数字$7$的十进制展开的数所成之集。求$\lambda(E)$。
::: solution
设$E_n$是由具有某个前$n$位数字都不是$7$的十进制展开的$x \in [0, 1]$所成之集。它是$9^n$个长度为$10^{-n}$的闭区间之并（前$n$位数字的每种允许的选法对应一个区间），所以它是博雷尔集，且$\lambda(E_n) \le (9/10)^n$。由于对每个$n$都有$E \subseteq E_n$，由单调性得$\lambda^*(E) \le (9/10)^n \to 0$。所以$E$是零测集（因而可测），$\lambda(E) = 0$：几乎每个数都含有数字$7$——实际上，含有无穷多次。
:::
:::

::: exercise 伸缩 {level=2}
对$c \ne 0$和$A \subseteq \R$，令$cA = \set{ca : a \in A}$。证明$\lambda^*(cA) = \abs{c}\,\lambda^*(A)$，并证明只要$E$可测，$cE$就可测。
::: solution
开区间$I_k$覆盖$A$当且仅当区间$cI_k$覆盖$cA$，并且$\ell(cI_k) = \abs{c}\ell(I_k)$。所以$\lambda^*(cA)$定义中的和恰好是$\lambda^*(A)$定义中相应的和的$\abs c$倍，从而下确界满足$\lambda^*(cA) = \abs c\lambda^*(A)$。若$E$可测，$A$是任一集合，则对$c$和$1/c$分别使用这个公式，得

$$
\lambda^*(A\cap cE) + \lambda^*(A\setminus cE) = \abs c\bigl(\lambda^*(c^{-1}A\cap E) + \lambda^*(c^{-1}A\setminus E)\bigr) = \abs c\,\lambda^*(c^{-1}A) = \lambda^*(A),
$$

所以$cE$可测。
:::
:::

::: exercise 胖康托尔集 {level=2 check="1/2"}
从$[0, 1]$开始。在第$n = 1, 2, 3, \ldots$步，从剩下的$2^{n-1}$个闭区间的每一个的正中间去掉一个长度为$4^{-n}$的开区间。设$S$是最后剩下的集合。求$\lambda(S)$，并证明$S$不含任何长度为正的区间。
::: hint
先验证每个剩下的区间都足够长，能够进行下一次挖去：第$n$步之后，剩下的$2^n$个区间长度相等，且介于$2^{-(n+1)}$与$2^{-n}$之间。
:::
::: solution
第$n$步之后，剩下的$2^n$个区间长度都相同，记为$L_n$，它们的总长度为$1 - \sum_{k=1}^n2^{k-1}4^{-k} = \frac12 + 2^{-n-1}$，所以$L_n = \frac{1 + 2^{-n}}{2^{n+1}}$。由于$2^{-(n+1)} < L_n < 2^{-n}$，每个区间都比下一步要去掉的长度为$4^{-(n+1)}$的那一段更长，所以这个构造是可行的。去掉的总长度为$\sum_{n\ge1}2^{n-1}4^{-n} = \frac12$，所以由可数可加性，$\lambda(S) = 1 - \frac12 = \frac12$。$S$中所含的任何区间，对每个$n$都位于第$n$步的$2^n$个区间中的某一个之内，所以它的长度对每个$n$都至多为$L_n < 2^{-n}$，因而为$0$。所以$S$是一个测度为正的无处稠密闭集——在拓扑意义下“小”，在测度意义下却不小。
:::
:::

::: exercise 外测度不是可加的 {level=2}
利用[[#thm-vitali]]证明：存在互不相交的集合$B_1, B_2 \subseteq \R$，使$\lambda^*(B_1 \cup B_2) < \lambda^*(B_1) + \lambda^*(B_2)$。
::: solution
维塔利集$V$不可测，所以卡拉泰奥多里条件对它不成立：存在集合$A$，使$\lambda^*(A) \ne \lambda^*(A\cap V) + \lambda^*(A\setminus V)$。由于根据次可加性“$\le$”总是成立的，必有$\lambda^*(A) < \lambda^*(A\cap V) + \lambda^*(A\setminus V)$。令$B_1 = A \cap V$，$B_2 = A\setminus V$：它们互不相交，且$B_1 \cup B_2 = A$。
:::
:::

::: exercise 不可测集无处不在 {level=3}
设$E \in \mathcal{L}$，$\lambda(E) > 0$。证明$E$含有一个不是勒贝格可测的子集。
::: hint
先证明维塔利集的平移$V + q$的每个可测子集的测度都为$0$。再利用平移集$V + q$（$q \in \Q$）覆盖$\R$这一事实。
:::
::: solution
**$V$的可测子集是零测集。**若$F \subseteq V$可测，则平移集$F + q_k$（$q_k$取遍$\Q\cap[-1, 1]$的一个枚举）互不相交（与[[#thm-vitali]]的证明中一样），并且包含于$[-1, 2]$，所以$\sum_k\lambda(F) \le 3$，这迫使$\lambda(F) = 0$。由平移不变性，对任一平移$V + q$的可测子集，同样的结论成立。

**这些平移集覆盖$\R$。**每个实数$x$都模$\Q$等价于$[0, 1]$中的某个点（减去它的整数部分即可），从而等价于某个$v \in V$；所以$x \in V + q$，其中$q = x - v \in \Q$。因此$E = \bigcup_{q\in\Q}\bigl(E\cap(V + q)\bigr)$，这是一个可数并。

如果每个$E\cap(V+q)$都可测，那么由第一部分，它们都是零测集，从而$E$作为可数个零测集的并也是零测集——这与$\lambda(E) > 0$矛盾。所以某个$E \cap (V + q)$是$E$的不可测子集。
:::
:::

::: exercise 内正则性 {level=3}
设$E$勒贝格可测。证明$\lambda(E) = \sup\set{\lambda(K) : K \subseteq E,\ K \text{ 为紧集}}$。
::: solution
由单调性，对每个紧集$K \subseteq E$，$\lambda(K) \le \lambda(E)$，所以上确界至多为$\lambda(E)$。反过来，令$E_n = E \cap [-n, n]$，它们递增趋于$E$，所以由下连续性，$\lambda(E_n) \to \lambda(E)$。固定$n$和$\eps > 0$。由[[#thm-regularity]](3)，存在闭集$F \subseteq E_n$，使$\lambda(E_n\setminus F) < \eps$；$F$是有界闭集，因而是紧集（[[real-analysis/metric-spaces#thm-heine-borel]]），并且$\lambda(F) > \lambda(E_n) - \eps$。因此对每个$n$和$\eps$，上确界至少为$\lambda(E_n) - \eps$，从而至少为$\lim\lambda(E_n) = \lambda(E)$。（当$\lambda(E) = \infty$时，这一论证同样适用。）
:::
:::
