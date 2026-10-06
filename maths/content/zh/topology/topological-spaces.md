在[[real-analysis/metric-spaces]]一章中，你已经见过一个值得注意的事实：度量空间之间的映射$f$连续，当且仅当每个开集的原像都是开集。ε-δ定义连同其中所有的距离，都可以换成一个只涉及开集的命题。收敛（$x_n\to x$是指每个包含$x$的开集都包含该序列除有限多项以外的所有项）、闭集、闭包和边界也都是如此。距离在**产生**开集时是必需的，但此后就不再起任何作用。

另一个观察也指向同一方向。在平面上，我们可以用多种方式度量距离——欧几里得距离$d_2$、“出租车”距离$d_1(x, y) = \abs{x_1 - y_1} + \abs{x_2 - y_2}$，或最大值距离$d_\infty(x, y) = \max(\abs{x_1 - y_1}, \abs{x_2 - y_2})$。这些度量对几乎每一对点之间的距离都给出不同的值，但它们产生的开集完全相同，因而连续函数相同，收敛序列也相同。对于连续性问题而言，它们的共同之处才是**真正的**结构。

拓扑学认真对待了这一启示。**拓扑空间**是一个集合连同选定的一族称为开集的子集，这族子集满足三条简单的公理；其中根本不涉及距离。本章给出定义和一批例子——有些是熟悉的，有些则很奇特——学习如何用**基**来简洁地描述拓扑，并建立闭集、闭包、内部、边界和聚点这一套术语。在这个过程中我们会看到，来自度量空间的直觉有些依然成立，有些则会失效；而这正是初次接触拓扑学时最需要学习的东西。

## 拓扑

度量空间中开集的哪些性质应当保留为公理？在度量空间中，任意多个开集的并是开集，两个（从而有限多个）开集的交也是开集，但无穷多个开集的交未必是开集：在$\R$中，

$$
\bigcap_{n=1}^\infty\Big(-\frac1n, \frac1n\Big) = \set{0},
$$

它不是开集。再加上$\emptyset$和整个空间都是开集这两个平凡的事实，就得到了下面的公理。

::: definition 拓扑 {#def-topology}
集合$X$上的一个**拓扑**是$X$的一族子集$\tau$，满足

1. $\emptyset\in\tau$且$X\in\tau$；
2. $\tau$中任意一族集合的并属于$\tau$；
3. $\tau$中任意两个（从而任意有限多个）集合的交属于$\tau$。

有序对$(X, \tau)$称为**拓扑空间**，$\tau$的成员称为它的**开集**。点$x$的**开邻域**是指包含$x$的开集。
:::

当拓扑在上下文中很明确时，我们就简单地说“空间$X$”。同一个集合上可以有许多拓扑，选取哪一个是一个实实在在的决定。

::: example 拓扑的初步目录 {#ex-catalogue}
验证下列每一个都是拓扑。

1. 任意集合$X$上的**离散拓扑**：每个子集都是开集。
2. **平凡拓扑**（也称密着拓扑）：只有$\emptyset$和$X$是开集。
3. 无限集$X$上的**余有限拓扑**：若$U = \emptyset$或$X\setminus U$是有限集，则称集合$U$为开集。
4. **谢尔宾斯基（Sierpiński）空间**：$X = \set{0, 1}$，$\tau = \set{\emptyset, \set1, \set{0,1}}$。
::: solution
(1)和(2)：$X$的幂集和集族$\set{\emptyset, X}$显然对并和有限交封闭。

(3) 按定义$\emptyset$是开集；$X$是开集，因为$X\setminus X = \emptyset$是有限集。设$U_\alpha$（$\alpha\in A$）都是开集，则要么它们全是空集（这时它们的并也是空集），要么有某个$U_\beta\neq\emptyset$；在后一情形，由德摩根（De Morgan）律

$$
X\setminus\bigcup_\alpha U_\alpha = \bigcap_\alpha(X\setminus U_\alpha)\subseteq X\setminus U_\beta,
$$

它是有限集，所以这个并是开集。若$U$和$V$都是非空开集，则$X\setminus(U\cap V) = (X\setminus U)\cup(X\setminus V)$是两个有限集的并，因而有限；若其中之一是空集，则$U\cap V$也是空集。所以$U\cap V$是开集。

(4) 这里只有三个集合，它们的任意并与交仍是其中之一：例如$\set1\cup\set{0,1} = \set{0,1}$，$\set1\cap\set{0,1} = \set1$。
:::
:::

最重要的例子，正是促成这一定义的那个例子。

::: proposition 度量拓扑 {#prop-metric}
设$(X, d)$是度量空间。若对每个$x\in U$都存在$r > 0$，使得$B(x, r) = \set{y : d(x, y) < r}\subseteq U$，则称$U\subseteq X$为开集。这些开集构成一个拓扑，称为**度量拓扑**，并且每个开球都是开集。
:::

::: proof
$\emptyset$是开集（条件空泛地成立）；$X$是开集，因为每个球都含于$X$。若$x\in\bigcup_\alpha U_\alpha$，则对某个$\beta$有$x\in U_\beta$，而含于$U_\beta$的以$x$为中心的球也含于这个并。若$x\in U\cap V$，取$r_1, r_2$使得$B(x, r_1)\subseteq U$，$B(x, r_2)\subseteq V$，则$B(x, \min(r_1, r_2))\subseteq U\cap V$。最后，若$y\in B(x, r)$，令$s = r - d(x, y) > 0$；对$z\in B(y, s)$，由三角不等式得$d(x, z) \le d(x, y) + d(y, z) < d(x, y) + s = r$，所以$B(y, s)\subseteq B(x, r)$，从而这个球是开集。
:::

若一个拓扑空间的拓扑以这种方式来自某个度量，则称它是**可度量化的**。不同的度量可能给出同一个拓扑，这时称它们是**拓扑等价的**。例如，只要存在常数$c, C > 0$使得$c\,d(x, y)\le d'(x, y)\le C\,d(x, y)$，就会出现这种情况，因为这时以$x$为中心的每个$d$-球都包含一个以$x$为中心的$d'$-球，反之亦然。在$\R^2$上有$d_\infty\le d_2\le d_1\le 2d_\infty$，所以引言中的三个度量都给出$\R^2$的**标准拓扑**。

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: 出租车度量$d_1$（菱形）、欧几里得度量$d_2$（圆盘）和最大值度量$d_\infty$（正方形）的单位球。每个球都包含另外两种球以同一点为中心的缩小版，所以如果一个集合在它的每一点周围都包含某一种小球，那么它也包含另外两种小球：这三个度量有相同的开集。改变半径和中心，确认这种嵌套关系始终成立。
:::

离散拓扑是可度量化的——取**离散度量**：当$x\neq y$时$d(x, y) = 1$；在这个度量下，$B(x, 1) = \set x$是开集。至少含两个点的集合上的平凡拓扑是不可度量化的：在度量空间中，两个不同的点$x\neq y$有不相交的开邻域$B(x, r)$和$B(y, r)$，其中$r = d(x, y)/2$；而在平凡拓扑中，唯一的非空开集是$X$。我们将在[[topology/quotient-spaces]]一章中再回到这一**豪斯多夫性质**。

同一集合上的两个拓扑可以进行比较。若$\tau_1\subseteq\tau_2$，就说$\tau_2$**更细**（它的开集更多），$\tau_1$**更粗**。离散拓扑是所有拓扑中最细的，平凡拓扑是最粗的；在$\R$上，余有限拓扑比标准拓扑粗，因为补集有限的集合是若干开区间的并。有些拓扑之间根本无法比较。

::: quiz
设$X = \set{a, b, c}$。下列集族中哪一个是$X$上的拓扑？
- [ ] $\set{\emptyset, \set a, \set b, X}$
- [x] $\set{\emptyset, \set a, \set{a, b}, X}$
- [ ] $\set{\emptyset, \set{a, b}, \set{b, c}, X}$
- [ ] $\set{\set a, \set{a, b}, X}$
::: solution
第二个集族包含$\emptyset$和$X$，并且其成员的任意并与交仍是其成员（这些集合构成一条链）。第一个不是拓扑，因为缺少$\set a\cup\set b = \set{a, b}$；第三个不是，因为缺少$\set{a,b}\cap\set{b,c} = \set b$；第四个不是，因为缺少$\emptyset$。
:::
:::

## 基

把所有开集一一列出很少是可行的；对于$\R$，我们这样描述它的拓扑：开区间是开集，而开集就是开区间的并。这一思想的一般形式就是基。

::: definition 基 {#def-basis}
集合$X$上的一个**基**是$X$的一族子集$\mathcal B$（其成员称为**基元素**），满足

1. 每个$x\in X$至少属于一个基元素；
2. 若$x\in B_1\cap B_2$，其中$B_1, B_2\in\mathcal B$，则存在$B_3\in\mathcal B$使得$x\in B_3\subseteq B_1\cap B_2$。

**由$\mathcal B$生成的拓扑**由这样的集合$U\subseteq X$组成：对每个$x\in U$，都存在$B\in\mathcal B$使得$x\in B\subseteq U$。
:::

::: theorem 由基生成的拓扑 {#thm-basis}
若$\mathcal B$是$X$上的基，则由它生成的集族$\tau$是$X$上的拓扑，并且$\tau$恰好由$\mathcal B$的各个子族的并组成（空子族的并为$\emptyset$）。
:::

::: proof
**$\tau$是拓扑。**$\emptyset\in\tau$（条件空泛地成立），由条件(1)得$X\in\tau$。若对所有$\alpha$有$U_\alpha\in\tau$，且$x\in\bigcup U_\alpha$，则对某个$\beta$有$x\in U_\beta$，于是存在基元素$B$使得$x\in B\subseteq U_\beta\subseteq\bigcup U_\alpha$；因此这个并属于$\tau$。若$U, V\in\tau$且$x\in U\cap V$，取$B_1, B_2\in\mathcal B$使得$x\in B_1\subseteq U$，$x\in B_2\subseteq V$；由条件(2)，存在$B_3\in\mathcal B$使得$x\in B_3\subseteq B_1\cap B_2\subseteq U\cap V$。所以$U\cap V\in\tau$。

**刻画。**每个基元素$B$都属于$\tau$（对$x\in B$，取$B$本身即可），所以由关于并的公理，基元素的任意并都属于$\tau$。反之，若$U\in\tau$，对每个$x\in U$取基元素$B_x$使得$x\in B_x\subseteq U$，则$U = \bigcup_{x\in U}B_x$。
:::

::: example 直线和平面上的基 {#ex-bases}
(a) 开区间$(a, b)$构成一个基，它生成$\R$的标准拓扑；端点为**有理数**的开区间也是如此。(b) 度量空间中的开球构成度量拓扑的一个基；对于$\R^2$的标准拓扑，开矩形$(a, b)\times(c, d)$也构成一个基。(c) 半开区间$[a, b)$构成$\R$上的一个基；它生成的拓扑称为**下限拓扑**，赋予这个拓扑的$\R$记作$\R_\ell$（称为**索根弗里（Sorgenfrey）直线**）。证明$\R_\ell$严格细于标准拓扑。
::: solution
(a) 两个开区间的交是开区间或空集，所以取$B_3 = B_1\cap B_2$即知条件(2)成立；按照$\R$作为度量空间时开集的定义本身，生成的拓扑就是标准拓扑。对于有理端点的情形：若$x\in(a, b)$，取有理数$p, q$使得$a < p < x < q < b$，则$x\in(p, q)\subseteq(a, b)$，所以每个开集仍是这种区间的并。

(b) 若$x\in B(y_1, r_1)\cap B(y_2, r_2)$，则[[#prop-metric]]的证明表明，以$x$为中心的某个小球同时含于这两个球中。对于矩形：开矩形的交仍是开矩形，并且以$x$为中心的每个开圆盘都包含一个以$x$为中心的开正方形，反之亦然。

(c) $[a, b)\cap[c, d) = [\max(a, c), \min(b, d))$仍具有这种形式，或者是空集，所以这是一个基。每个开区间在$\R_\ell$中都是开集，因为$(a, b) = \bigcup_{n}[a + \frac1n, b)$（对满足$a + \frac1n < b$的$n$取并）。因此，每个标准开集作为开区间的并，在$\R_\ell$中都是开集：下限拓扑更细。它严格更细，因为$[0, 1)$在$\R_\ell$中是开集，在标准拓扑中却不是——没有一个包含$0$的开区间能含于$[0,1)$。
:::
:::

(a)中的可数基值得注意：具有可数基的空间称为**第二可数的**，这一性质以后会很有用。与之相反，索根弗里直线没有可数基（[[#exr-sorgenfrey]]）——这只是它作为反例的宝贵来源的诸多表现之一。

## 闭集、闭包与内部

::: definition 闭集 {#def-closed}
若拓扑空间$X$的子集$C$的补集$X\setminus C$是开集，则称$C$是**闭的**，或称$C$为闭集。
:::

由德摩根律，$X\setminus\bigcup_\alpha U_\alpha = \bigcap_\alpha(X\setminus U_\alpha)$，$X\setminus(U\cap V) = (X\setminus U)\cup(X\setminus V)$，所以关于开集的公理可以转化为关于闭集的公理。

::: proposition 闭集的性质 {#prop-closed}
在任意拓扑空间$X$中：$\emptyset$和$X$是闭集；任意一族闭集的交是闭集；有限多个闭集的并是闭集。
:::

::: proof
$X\setminus\emptyset = X$与$X\setminus X = \emptyset$都是开集。若各$C_\alpha$都是闭集，则$X\setminus\bigcap C_\alpha = \bigcup(X\setminus C_\alpha)$是开集的并，因而是开集。若$C, D$是闭集，则$X\setminus(C\cup D) = (X\setminus C)\cap(X\setminus D)$是两个开集的交，因而是开集；有限多个的情形用归纳法即可。
:::

::: widget venn
sets: 2
expr: (A | B)'
labels: A; B
caption: 阴影部分是$A\cup B$的补集。输入`A' & B'`，验证它是同一个区域：$(A\cup B)' = A'\cap B'$。取补集时，德摩根律把并和交互换；正因为如此，闭集对**任意交**和**有限并**封闭，而开集对任意并和有限交封闭。
:::

“闭”并不是“开”的反面。在$\R$中，区间$[0,1)$既不是开集也不是闭集，而$\emptyset$和$\R$则既是开集又是闭集；在离散空间中，每个集合都既开又闭。既开又闭的集合——**开闭集**——将是[[topology/connectedness]]一章的主题。

::: definition 内部、闭包、边界 {#def-closure}
设$A$是拓扑空间$X$的子集。

1. $A$的**内部**$\operatorname{int}A$是含于$A$的所有开集的并——即$A$的最大开子集。
2. $A$的**闭包**$\overline A$是包含$A$的所有闭集的交——即包含$A$的最小闭集。
3. $A$的**边界**是$\partial A = \overline A\setminus\operatorname{int}A$。
4. 若$\overline A = X$，则称$A$在$X$中**稠密**。
:::

由公理，$\operatorname{int}A$是开集，$\overline A$是闭集；$A$是开集当且仅当$A = \operatorname{int}A$，$A$是闭集当且仅当$A = \overline A$。实际计算闭包时，用的是下面的判别准则。

::: theorem 闭包中的点 {#thm-closure}
设$A\subseteq X$，$x\in X$。则$x\in\overline A$当且仅当每个包含$x$的开集都与$A$相交。若$\mathcal B$是该拓扑的一个基，则只需检验包含$x$的基元素。
:::

::: proof
我们证明与之等价的命题：$x\notin\overline A$当且仅当存在某个包含$x$的开集与$A$不相交。若$x\notin\overline A$，则$U = X\setminus\overline A$是开集，包含$x$，且与$A\subseteq\overline A$不相交。反之，若$U$是开集，$x\in U$且$U\cap A = \emptyset$，则$X\setminus U$是包含$A$的闭集，所以$\overline A\subseteq X\setminus U$，从而$x\notin\overline A$。关于基的结论：每个包含$x$的开集都包含一个包含$x$的基元素，所以若所有这样的基元素都与$A$相交，则所有包含$x$的开集也都与$A$相交；反过来的结论是显然的，因为基元素都是开集。
:::

::: definition 聚点 {#def-limit-point}
若每个包含$x$的开集都与$A$交于某个**异于$x$的**点，则称点$x\in X$是$A$的**聚点**（或称极限点）。$A$的聚点全体记作$A'$。
:::

::: theorem 闭包与聚点 {#thm-closure-limit}
对每个$A\subseteq X$，有$\overline A = A\cup A'$。因此，$A$是闭集当且仅当它包含它的所有聚点。
:::

::: proof
由[[#thm-closure]]，$A$的每个聚点都属于$\overline A$，又$A\subseteq\overline A$，所以$A\cup A'\subseteq\overline A$。反之，设$x\in\overline A$且$x\notin A$。由[[#thm-closure]]，每个包含$x$的开集$U$都与$A$相交，而由于$x\notin A$，$U\cap A$中的点都异于$x$；所以$x\in A'$。因此$\overline A\subseteq A\cup A'$。最后，$A$是闭集当且仅当$A = \overline A = A\cup A'$，当且仅当$A'\subseteq A$。
:::

::: example 在三种拓扑中计算闭包 {#ex-closures}
(a) 在$\R$（标准拓扑）中，设$A = (0, 1]\cup\set2$。求$\operatorname{int}A$、$\overline A$、$\partial A$和$A'$。对$\Q$做同样的事。(b) 在$\R_\ell$中，求$(0, 1)$的闭包。(c) 在$\R$的余有限拓扑中，求一个无限集的闭包。
::: solution
(a) $(0, 1)$中的每一点都有一个包含它的区间含于$A$，而每个包含$1$或$2$的区间都含有$A$以外的点；所以$\operatorname{int}A = (0, 1)$。由[[#thm-closure]]，$0\in\overline A$（每个包含$0$的区间都与$(0,1]$相交），而$[0, 1]\cup\set2$以外的每一点都有一个包含它且与$A$不相交的区间；所以$\overline A = [0,1]\cup\set2$，$\partial A = \set{0, 1, 2}$。聚点集为$A' = [0, 1]$：孤立点$2$属于$A$，但不是聚点，因为$(1.5, 2.5)$与$A$只交于$2$。对于$\Q$：每个开区间都既含有理数又含无理数，所以$\overline\Q = \R$（$\Q$是稠密的），$\operatorname{int}\Q = \emptyset$，$\partial\Q = \R$；又因为每个包含实数$x$的区间都含有异于$x$的有理数，所以$\Q' = \R$。

(b) 利用半开区间构成的基。对点$x < 0$，$[x, 0)$与$(0,1)$不相交；对点$x\ge1$，$[x, x + 1)$与$(0,1)$不相交；但每个$[0, b)$都与$(0, 1)$相交。所以$(0, 1)$在$\R_\ell$中的闭包是$[0, 1)$，而不是$[0, 1]$：点$1$只能“从左侧逼近”，而$\R_\ell$的拓扑只能察觉从右侧的逼近。

(c) 设$A\subseteq\R$是无限集。非空开集$U$的补集有限，所以它不可能与无限集$A$不相交。由[[#thm-closure]]，每一点都属于$\overline A$：$\overline A = \R$。余有限拓扑的闭集恰好就是有限集和$\R$本身。
:::
:::

::: quiz
在索根弗里直线$\R_\ell$中，$[0, 1)$的闭包是什么？
- [ ] $[0, 1]$
- [x] $[0, 1)$
- [ ] $(0, 1)$
- [ ] $\R$
::: solution
$[0,1)$在$\R_\ell$中是闭集：它的补集$(-\infty, 0)\cup[1,\infty)$是形如$[a, b)$的基元素的并——例如$(-\infty,0) = \bigcup_n[-n, 0)$，$[1,\infty) = \bigcup_n[1, n)$。所以它的闭包就是它自身。特别地，$[0, 1)$在$\R_\ell$中是开闭集，这已经显示出索根弗里直线与实直线有多么不同。
:::
:::

::: warning 球的闭包未必是闭球
在$\R^n$中，开球$B(x, r)$的闭包是闭球$\set{y : d(x, y)\le r}$，人们很容易以为在任何度量空间中都是如此。对于离散度量，这就不成立了：$B(x, 1) = \set x$本身已经是闭集，所以它的闭包是$\set x$，而“闭球”$\set{y : d(x, y)\le1}$却是整个空间。总是成立的是$\overline{B(x,r)}\subseteq\set{y : d(x, y)\le r}$，因为右端是闭集。更一般地，从$\R^2$的图形得来的关于闭包的直觉，都必须用定义来检验。
:::

## 没有度量的收敛

::: definition 收敛序列 {#def-convergence}
设$(x_n)$是拓扑空间$X$中的序列，$x\in X$。若对每个包含$x$的开集$U$，都存在$N$，使得对所有$n\ge N$有$x_n\in U$，则称$(x_n)$**收敛**于$x$。
:::

在度量空间中，这就是我们熟悉的定义，因为只需检验球$B(x, \eps)$。然而在一般空间中，序列的表现可能很奇怪。

::: example 有许多极限的序列 {#ex-many-limits}
(a) 在平凡拓扑空间中，每个序列都收敛于每一点。(b) 在$\R$的余有限拓扑中，序列$x_n = n$收敛于每一个实数。
::: solution
(a) 包含给定点$x$的唯一开集是$X$，它包含序列的每一项。(b) 设$x\in\R$，$U$是包含$x$的开集。则$\R\setminus U$是有限集，所以它只含整数$1, 2, 3, \dots$中的有限多个，而所有大于其中最大者的$x_n = n$都属于$U$。因此对每个$x$都有$x_n\to x$。
:::
:::

在度量空间中极限是唯一的，因为不同的点有不相交的邻域；而无限集上的余有限拓扑根本没有不相交的非空开集。这就是[[topology/quotient-spaces]]一章中研究的分离性质。第二个警告：在度量空间中，$x\in\overline A$当且仅当$A$中有某个序列收敛于$x$；但在一般拓扑空间中，仅靠序列不足以确定闭包（见[[#exr-cocountable]]）。在度量空间中，以及更一般地，在每一点都有可数多个足以用来检验的邻域的空间中，序列确实能够确定闭包。

::: application 扎里斯基拓扑
与度量拓扑相去甚远的拓扑在代数几何中处于核心地位。在$\C^n$上，若一个集合是某一族多项式的公共零点集，就规定它是闭集。这些闭集满足[[#prop-closed]]（乘积$pq$的零点集是各自零点集的并，一族多项式的零点集是它们各自零点集的交），所以它们的补集构成一个拓扑，称为**扎里斯基（Zariski）拓扑**。在$\C$上，非零多项式只有有限多个零点，所以$\C$上的扎里斯基拓扑恰好就是余有限拓扑。这个拓扑虽然非常粗，却恰好携带了研究多项式方程的解所需要的信息；其背后的代数见[[abstract-algebra/polynomials]]。
:::

::: history
带有“邻近”概念的抽象空间这一思想，是在1900年前后从分析学中发展出来的。莫里斯·弗雷歇（Maurice Fréchet）在1906年的博士论文中引入了度量空间；弗里杰什·里斯（Frigyes Riesz）在1907—1909年间研究了用聚点定义的抽象空间。费利克斯·豪斯多夫（Felix Hausdorff）的《集合论基础》（*Grundzüge der Mengenlehre*，1914）首次给出了拓扑空间的一般定义，所用的邻域公理中包含了如今以他命名的分离性质。卡齐米日·库拉托夫斯基（Kazimierz Kuratowski）在1922年用闭包运算的性质刻画了拓扑。今天所用的开集公理去掉了豪斯多夫的分离公理，它在20世纪20年代和30年代成为标准，这主要归功于帕维尔·亚历山德罗夫（Pavel Alexandrov）以及后来布尔巴基（Bourbaki）学派的工作。
:::

## 后续内容

以开集为基本概念，我们现在可以为任意拓扑空间之间的映射定义连续性，并以子空间和积空间的方式由旧空间构造新空间（[[topology/continuous-maps]]）。本章的开集和闭集是[[topology/connectedness]]与[[topology/compactness]]这两大性质的原材料；非豪斯多夫空间中序列的奇怪表现，促使我们引入[[topology/quotient-spaces]]中的分离公理；索根弗里直线和余有限拓扑将作为反例反复出现。测度论中的σ-代数（[[measure-theory/sigma-algebras]]）也是以同样的精神公理化的（只是用补集和可数并代替了任意并和有限交）；而[[real-analysis/metric-spaces]]则成为一个特例。

::: summary
- $X$上的拓扑是包含$\emptyset$和$X$、并且对任意并和有限交封闭的一族子集（[[#def-topology]]）；它的成员就是开集。
- 每个度量都给出一个拓扑；拓扑等价的度量（例如$\R^2$上的$d_1, d_2, d_\infty$）给出同一个拓扑。离散拓扑、平凡拓扑、余有限拓扑、下限拓扑以及谢尔宾斯基空间都是标准的例子。
- 基生成一个拓扑，其开集就是基元素的并（[[#thm-basis]]）；开区间生成$\R$的拓扑，半开区间$[a,b)$生成更细的索根弗里拓扑。
- 闭集是开集的补集：它们对任意交和有限并封闭。“闭”并不是“开”的反面。
- $x\in\overline A$当且仅当每个包含$x$的开集（或基元素）都与$A$相交；$\overline A = A\cup A'$，所以一个集合是闭集当且仅当它包含它的所有聚点。
- 在一般空间中，序列可能收敛于许多点，也不一定能确定闭包；豪斯多夫分离性质能恢复极限的唯一性，而在度量空间中序列确实能确定闭包。
:::

## 习题

::: exercise 两点集上的拓扑 {level=1 check="4"}
集合$X = \set{a, b}$上有多少个不同的拓扑？把它们列出来。
::: solution
每个拓扑都包含$\emptyset$和$X$，而$\set a$和$\set b$各自可以属于、也可以不属于这个拓扑。四种选择都满足公理（$\set a$与$\set b$的并是$X$，交是$\emptyset$）：平凡拓扑$\set{\emptyset, X}$，两个谢尔宾斯基拓扑$\set{\emptyset, \set a, X}$和$\set{\emptyset,\set b, X}$，以及离散拓扑。所以共有$4$个。
:::
:::

::: exercise 它是拓扑吗？ {level=1}
在$X = \set{1, 2, 3, 4}$上，判断$\tau_1 = \set{\emptyset, \set1, \set{2, 3}, \set{1, 2, 3}, X}$和$\tau_2 = \set{\emptyset, \set1, \set2, \set{1, 3}, X}$是否为拓扑。
::: solution
$\tau_1$是拓扑：$\set1\cup\set{2,3} = \set{1,2,3}\in\tau_1$，$\set1\cap\set{2,3} = \emptyset$，而其余的并与交都只涉及$\emptyset$、$X$或彼此包含的集合。$\tau_2$不是拓扑：$\set1\cup\set2 = \set{1,2}\notin\tau_2$（另外$\set2\cup\set{1,3} = \set{1,2,3}\notin\tau_2$）。
:::
:::

::: exercise 数一数边界点 {level=1 check="3"}
设$A = [0, 1)\cup\set3\subseteq\R$（标准拓扑）。求$\operatorname{int}A$、$\overline A$和$\partial A$。$\partial A$有多少个点？
::: solution
$\operatorname{int}A = (0, 1)$：不存在包含点$0$且含于$A$的区间，对点$3$也是如此。由[[#thm-closure]]，$\overline A = [0, 1]\cup\set3$。所以$\partial A = \overline A\setminus\operatorname{int}A = \set{0, 1, 3}$，它有$3$个点。
:::
:::

::: exercise 可数基 {#exr-countable-basis level=2}
证明：$p, q\in\Q$的开区间$(p, q)$构成$\R$上标准拓扑的一个可数基；中心为有理点（两个坐标都是有理数）、半径为有理数的开圆盘构成$\R^2$的一个可数基。
::: solution
有理数对$(p, q)$的全体是可数的，所以这样的区间只有可数多个；它们构成生成标准拓扑的基，这已在[[#ex-bases]](a)中证明。对于$\R^2$：设$U$是开集，$x\in U$，且$B(x, r)\subseteq U$。取一个坐标都是有理数的点$c$，使得$d(c, x) < r/3$，再取有理数$s$，使得$r/3 < s < 2r/3$。则由$d(x, c) < r/3 < s$知$x\in B(c, s)$；又对$y\in B(c, s)$有$d(y, x)\le d(y, c) + d(c, x) < 2r/3 + r/3 = r$，故$B(c, s)\subseteq B(x, r)$。所以每个开集都是这种圆盘的并（它们构成基，因为它们都是开集并具有这一性质），而这样的圆盘只有可数多个。
:::
:::

::: exercise 并与交的闭包 {level=2}
证明$\overline{A\cup B} = \overline A\cup\overline B$和$\overline{A\cap B}\subseteq\overline A\cap\overline B$，并在$\R$中举一个包含关系严格成立的例子。
::: solution
$\overline A\cup\overline B$是闭集（有限多个闭集的并）且包含$A\cup B$，所以它包含$\overline{A\cup B}$。反之，由$A\subseteq A\cup B$可得$\overline A\subseteq\overline{A\cup B}$（闭包是单调的：每个包含$A\cup B$的闭集都包含$A$），对$B$也同样如此。关于交：由$A\cap B\subseteq A$得$\overline{A\cap B}\subseteq\overline A$，同理也有$\overline{A\cap B}\subseteq\overline B$。例子：$A = \Q$与$B = \R\setminus\Q$满足$\overline{A\cap B} = \overline\emptyset = \emptyset$，而$\overline A\cap\overline B = \R\cap\R = \R$。
:::
:::

::: exercise 内部与闭包的对偶性 {level=2}
证明：对空间$X$的每个子集$A$，有$X\setminus\overline A = \operatorname{int}(X\setminus A)$。由此推出：$A$稠密当且仅当它的补集的内部是空集；并且$\partial A = \overline A\cap\overline{X\setminus A}$。
::: solution
开集$U$满足$U\subseteq X\setminus A$，当且仅当$X\setminus U$是包含$A$的闭集。在左边对所有这样的$U$取并，对应于在右边对所有这样的$X\setminus U$取交，所以$\operatorname{int}(X\setminus A) = X\setminus\bigcap\set{C\text{ 为闭集} : C\supseteq A} = X\setminus\overline A$。因此$\overline A = X$当且仅当$\operatorname{int}(X\setminus A) = \emptyset$。把这一等式用于$X\setminus A$，得$\operatorname{int}A = X\setminus\overline{X\setminus A}$，所以$\partial A = \overline A\setminus\operatorname{int}A = \overline A\cap\overline{X\setminus A}$。
:::
:::

::: exercise 稠密集 {#exr-dense level=2}
证明：$D\subseteq X$稠密当且仅当$D$与$X$的每个非空开子集相交。证明$\Q$在索根弗里直线$\R_\ell$中稠密，并证明在无限集上的余有限拓扑中，每个无限子集都是稠密的。
::: solution
由[[#thm-closure]]，$\overline D = X$当且仅当每一点$x$都具有如下性质：每个包含$x$的开集都与$D$相交；这又当且仅当每个非空开集（它含有某个点）都与$D$相交。在$\R_\ell$中，每个非空开集都包含一个基区间$[a, b)$（$a < b$），而这个区间含有有理数；所以$\Q$是稠密的。在余有限拓扑中，非空开集的补集有限，因而它与每个无限集都相交（[[#ex-closures]](c)）。
:::
:::

::: exercise 三点集上的拓扑 {level=3 check="29"}
证明三点集$X = \set{a, b, c}$上恰有$29$个拓扑。
::: hint
按开的单点集的个数分类计数，并记住开集的交是开集。
:::
::: solution
每个拓扑都包含$\emptyset$和$X$；问题在于六个非空真子集（三个单点集和三个两点集）中哪些是开集。我们按开的单点集的个数来计数。

**没有开的单点集。**两个不同的两点集交于一个单点集，于是这个单点集会是开集；所以至多有一个两点集是开集。这就给出平凡拓扑以及三个拓扑$\set{\emptyset, D, X}$（$D$为两点集）：共$4$个拓扑。

**恰有一个开的单点集**，设为$\set a$（$3$种选法）。两点集$\set{b, c}$不能与$\set{a,b}$或$\set{a, c}$同时为开集，因为它们的交$\set b$或$\set c$会成为另一个开的单点集；而$\set{a, b}\cap\set{a, c} = \set a$是允许的。开的两点集可能构成的族为$\emptyset$、$\set{\set{a,b}}$、$\set{\set{a,c}}$、$\set{\set{a,b},\set{a,c}}$和$\set{\set{b,c}}$，每一种都给出一个拓扑（像$\set a\cup\set{b,c} = X$这样的并不会造成问题）。所以每种选法对应$5$个拓扑：共$15$个。

**恰有两个开的单点集**，设为$\set a$和$\set b$（$3$种选法）。这时$\set{a, b}$是开集。两点集$\set{a, c}$和$\set{b,c}$不能都是开集，因为它们的交$\set c$会成为第三个开的单点集；只取其中一个则是允许的（$\set{a,c}\cup\set b = X$，$\set{a,c}\cap\set b = \emptyset$）。所以每种选法对应$3$个拓扑：共$9$个。

**三个单点集都是开集。**这时每个子集都是开集：即离散拓扑，$1$个。

总计$4 + 15 + 9 + 1 = 29$。（计算机搜索证实了这一结果；在四点集上已经有$355$个拓扑。）
:::
:::

::: exercise 索根弗里直线不是第二可数的 {#exr-sorgenfrey level=3}
证明：$\R_\ell$没有可数基，尽管它有一个可数的稠密子集。
::: hint
给定一个基$\mathcal B$，对每个$x$取一个元素$B_x\in\mathcal B$，使得$x\in B_x\subseteq[x, x + 1)$。
:::
::: solution
设$\mathcal B$是$\R_\ell$的任意一个基。对每个$x\in\R$，集合$[x, x+1)$是包含$x$的开集，所以存在$B_x\in\mathcal B$使得$x\in B_x\subseteq[x, x+1)$。于是$x$是$B_x$的最小元。若$x\neq y$，则$B_x\neq B_y$，因为它们的最小元不同。所以$x\mapsto B_x$是从$\R$到$\mathcal B$的单射，从而$\mathcal B$不可数。另一方面，$\Q$可数且在$\R_\ell$中稠密（[[#exr-dense]]）。在度量空间中，可数稠密子集总能给出一个可数基（以其中的点为中心、以有理数为半径的球，与[[#exr-countable-basis]]一样），所以这也说明$\R_\ell$不可度量化。
:::
:::

::: exercise 序列不能确定闭包 {#exr-cocountable level=3}
$\R$上的**余可数拓扑**由$\emptyset$和所有补集可数的集合组成。证明它是一个拓扑；在这个拓扑中，一个序列收敛仅当它最终为常数；并且$0$属于$A = \R\setminus\set0$的闭包，尽管$A$中没有序列收敛于$0$。
::: solution
**拓扑。**与余有限拓扑的情形（[[#ex-catalogue]]）相同，只需用到：可数集的子集是可数的，有限多个可数集的并也是可数的。**序列。**设$x_n\to x$。集合$C = \set{x_n : x_n\neq x}$是可数的，所以$U = \R\setminus C$是包含$x$的开集。因此当$n\ge N$时$x_n\in U$，这意味着当$n\ge N$时$x_n = x$。**闭包。**非空开集的补集可数，所以它不可数，从而与$A$相交；特别地，每个包含$0$的开集都与$A$相交，由[[#thm-closure]]得$0\in\overline A$。但$A$中收敛于$0$的序列必须从某项起都等于$0\notin A$，这是不可能的。
:::
:::
