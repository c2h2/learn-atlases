微分方程$y'' + y = 0$有解$\sin x$和$\cos x$。由于这个方程是线性的，任何组合$a\sin x + b\cos x$也都是解：若$y_1'' + y_1 = 0$且$y_2'' + y_2 = 0$，则$(ay_1 + by_2)'' + (ay_1 + by_2) = a(y_1'' + y_1) + b(y_2'' + y_2) = 0$。齐次线性方程组$A\mathbf{x} = \mathbf{0}$的解也完全如此（由[[linear-algebra/linear-systems#eq-linear]]，$A(a\mathbf{u} + b\mathbf{v}) = aA\mathbf{u} + bA\mathbf{v}$），多项式、矩阵、数列以及手机所处理的信号也是这样。在每种情形中，都有一些可以**相加**、可以**与数相乘**的对象，并且熟悉的算术规则成立。

分别为列向量、函数、多项式和矩阵各自发展一套理论未免太浪费了。我们转而把它们共有的规则列为公理，只从公理出发证明定理；这样，每个定理都立即适用于每个例子。带有满足这些规则的运算的集合称为**向量空间**，它的元素称为**向量**——即使它们是函数或矩阵。本章建立这套语言：向量空间、子空间、线性组合、张成空间和线性无关。下一章将用它来定义维数。

**记号。**从现在起，我们用斜体字母$u, v, w$表示一般向量空间中的元素，而粗体字母$\mathbf{x}, \mathbf{b}$仍用来表示$\R^n$或$\C^n$中的列向量。

## 向量空间的公理

标量，即用来与向量相乘的数，将是实数或复数。本章和下一章的所有内容对任何**域**$\F$都成立。域是这样一种数系：在其中可以按通常的规则进行加法、减法、乘法以及除以非零元素的运算，例如$\Q$、$\R$、$\C$或模素数的整数（见[[abstract-algebra/fields-galois]]）。愿意的读者总可以把$\F$理解为$\R$。

::: definition 向量空间 {#def-vector-space}
域$\F$上的**向量空间**是指一个集合$V$，连同一个**加法**和一个**数乘**：加法给每一对$u, v \in V$指定一个元素$u + v \in V$，数乘给每个$a\in\F$和$v \in V$指定一个元素$av\in V$，并且对所有$u, v, w \in V$和$a, b \in \F$满足：

1. $u + v = v + u$（交换律）；
2. $(u + v) + w = u + (v + w)$（结合律）；
3. 存在元素$0 \in V$（称为**零向量**），使得对所有$v\in V$有$v + 0 = v$；
4. 对每个$v\in V$，存在$w \in V$使得$v + w = 0$（加法逆元）；
5. $1v = v$；
6. $a(bv) = (ab)v$；
7. $a(u + v) = au + av$；
8. $(a + b)v = av + bv$。

当$\F = \R$时，称之为**实**向量空间；当$\F = \C$时，称之为**复**向量空间。
:::

$u + v$和$av$必须属于$V$，这一要求是定义的一部分：$V$对这两种运算是**封闭的**。下面是我们最常用的一些例子。

- $\F^n$：元素属于$\F$的列向量$(x_1, \dots, x_n)$，运算逐个元素进行。全部八条公理都归结为对每个元素应用$\F$中的算术规则。
- $M_{m\times n}(\F)$：元素属于$\F$的$m\times n$矩阵，运算如[[linear-algebra/matrices#def-matrix-ops]]所定义。
- $\mathcal{P}(\F)$：系数属于$\F$的全体多项式$a_0 + a_1x + \dots + a_dx^d$；以及对每个$n$，次数不超过$n$的多项式（包括零多项式）构成的集合$\mathcal{P}_n(\F)$；运算是多项式通常的加法和数乘。
- 对任意集合$X$，全体函数$f\colon X \to \F$构成的集合$\mathcal{F}(X, \F)$，运算是**逐点**定义的：$(f + g)(x) = f(x) + g(x)$，$(af)(x) = a\,f(x)$。零向量是恒等于$0$的函数。取$X = \{1, 2, 3, \dots\}$，就得到全体数列构成的空间。
- **零向量空间**$\{0\}$，其中$0 + 0 = 0$，$a0 = 0$。
- $\C$是$\C$上的向量空间，但也是$\R$上的向量空间（只用实数标量去乘复数）。这是两个不同的向量空间，计算维数时我们就会看到这一点。

公理完全没有说向量**是**什么，只说了它们如何组合。下面的例子表明这一点可以推进到多远。

::: example 一个奇特的向量空间 {#ex-strange}
设$V = \R_{>0}$是全体正实数，其“加法”为$u \oplus v = uv$（通常的乘法），“数乘”为$a \odot v = v^a$，其中$a\in\R$。证明$V$是实向量空间。它的零向量是什么？
::: solution
封闭性：若$u, v > 0$，则$uv > 0$且$v^a > 0$。现在对$u, v, w > 0$和$a, b\in\R$逐条验证公理。

1. $u\oplus v = uv = vu = v \oplus u$。2. $(u\oplus v)\oplus w = (uv)w = u(vw) = u\oplus(v\oplus w)$。
3. 数$1$满足$v\oplus 1 = v\cdot 1 = v$，所以$V$的零向量是数$1$。
4. 对给定的$v$，元素$w = 1/v$满足$v\oplus w = 1$，即等于零向量。
5. $1\odot v = v^1 = v$。6. $a\odot(b\odot v) = (v^b)^a = v^{ab} = (ab)\odot v$。
7. $a\odot(u\oplus v) = (uv)^a = u^av^a = (a\odot u)\oplus(a\odot v)$。
8. $(a + b)\odot v = v^{a+b} = v^av^b = (a\odot v)\oplus(b\odot v)$。

所以$V$是一个向量空间，它的零向量是数$1$。它并不像看上去那么奇特：对数把$\oplus$变为$+$，把$\odot$变为通常的乘法（$\ln(uv) = \ln u + \ln v$，$\ln v^a = a\ln v$），所以$V$是乔装改扮的$\R$——用[[linear-algebra/linear-maps]]中的语言来说，这是一个**同构**。
:::
:::

::: quiz
在[[#ex-strange]]的向量空间$V = \R_{>0}$中，向量$4$的加法逆元$-4$是什么？
- [ ] 数$-4$
- [x] 数$\tfrac14$
- [ ] 数$0$
- [ ] 不存在，因为$V$中没有负数
::: solution
$v$的加法逆元是使$v\oplus w$等于零向量的向量$w$，而$V$的零向量是数$1$。由于$4\oplus\tfrac14 = 4\cdot\tfrac14 = 1$，逆元是$\tfrac14$。数$-4$甚至不是$V$的元素，而$0$既不属于$V$，也不是$V$的零向量。与[[#prop-axioms]]相一致，$(-1)\odot 4 = 4^{-1} = \tfrac14$。
:::
:::

有些事实看起来显而易见，似乎无需证明，但它们并不在公理之列，必须从公理推导出来。这样的推导只需做一次，此后在任何向量空间中都不必再为它们操心。

::: proposition 公理的推论 {#prop-axioms}
在$\F$上的任何向量空间$V$中，对所有$v\in V$和$a \in \F$：

1. 零向量是唯一的，并且每个$v$恰有一个加法逆元，记作$-v$；
2. $0v = 0$（标量零乘任何向量都得零向量）；
3. $a0 = 0$；
4. $(-1)v = -v$；
5. 若$av = 0$，则$a = 0$或$v = 0$。
:::

::: proof
1. 若$0$和$0'$都是零向量，则$0 = 0 + 0' = 0' + 0 = 0'$，这里依次用到了关于$0'$的公理3、公理1和关于$0$的公理3。若$w$和$w'$都是$v$的加法逆元，则
   $w = w + 0 = w + (v + w') = (w + v) + w' = 0 + w' = w'$。
2. 由公理8，$0v = (0 + 0)v = 0v + 0v$。两边同加$-(0v)$并利用结合律，得$0 = 0v$。
3. 由公理7，$a0 = a(0 + 0) = a0 + a0$，两边同加$-(a0)$得$0 = a0$。
4. 由公理5、公理8和第2部分，$v + (-1)v = 1v + (-1)v = (1 + (-1))v = 0v = 0$。所以$(-1)v$是$v$的加法逆元，由唯一性，它就是$-v$。
5. 设$av = 0$且$a\neq 0$。那么利用公理5、公理6和第3部分，$v = 1v = (a^{-1}a)v = a^{-1}(av) = a^{-1}0 = 0$。
:::

我们把$u + (-v)$记作$u - v$。有了[[#prop-axioms]]，向量空间中的代数运算就会像你所预期的那样进行，只要你不把两个向量相乘，也不除以一个向量——一般的向量空间根本没有这样的运算。

## 子空间

实际中遇到的向量空间大多位于更大的向量空间之内：$y'' + y = 0$的解位于全体函数之中，$A\mathbf{x} = \mathbf{0}$的解位于$\F^n$之中。

::: definition 子空间 {#def-subspace}
向量空间$V$的**子空间**是指这样的子集$U \subseteq V$：在$V$的加法和数乘下，$U$本身也是一个向量空间。
:::

对每个候选子集都逐一验证八条公理会很繁琐。幸运的是，其中大部分公理都会自动继承下来。

::: theorem 子空间判别法 {#thm-subspace-test}
向量空间$V$的子集$U$是子空间，当且仅当

1. $0 \in U$；
2. $U$**对加法封闭**：$u, w \in U \implies u + w \in U$；
3. $U$**对数乘封闭**：$a\in\F,\ u\in U \implies au \in U$。
:::

::: proof
设三个条件都成立。条件2和3说明$V$的运算给出了$U$上的运算。公理1、2和5—8都是对$V$中**所有**向量都成立的恒等式，因此对$U$中的向量当然也成立。公理3成立，因为$0\in U$且$u + 0 = u$。对于公理4，若$u \in U$，则由条件3，$(-1)u\in U$，而由[[#prop-axioms]]，$(-1)u = -u$；所以$u$在$U$中有加法逆元。

反之，设$U$是子空间。条件2和3成立，因为$U$对它自己的运算（也就是$V$的运算）封闭。由$U$的公理3，存在$0_U \in U$使得$0_U + 0_U = 0_U$；两边同加$-0_U$（在$V$中计算）得$0_U = 0$。所以$0 \in U$。
:::

实际中通常先检验条件1：不含$0$的集合可以立即排除。条件2和3可以合并为一个要求：只要$u, w\in U$且$a, b\in\F$，就有$au + bw \in U$。

::: example 零空间及其他子空间 {#ex-subspaces}
证明下列集合都是子空间：(a) 齐次方程组的解集$\operatorname{Nul}(A) = \set{\mathbf{x}\in\F^n : A\mathbf{x} = \mathbf{0}}$，其中$A$是$m\times n$矩阵；(b) 满足$p(1) = 0$的多项式$p\in\mathcal{P}_3(\R)$构成的集合；(c) 在二次可微函数$\R \to \R$构成的空间中，$y'' + y = 0$的解集。
::: solution
(a) $A\mathbf{0} = \mathbf{0}$，所以$\mathbf{0}\in\operatorname{Nul}(A)$。若$A\mathbf{u} = A\mathbf{w} = \mathbf{0}$，则由[[linear-algebra/linear-systems#eq-linear]]，$A(\mathbf{u} + \mathbf{w}) = A\mathbf{u} + A\mathbf{w} = \mathbf{0}$，且$A(a\mathbf{u}) = aA\mathbf{u} = \mathbf{0}$。由[[#thm-subspace-test]]，$\operatorname{Nul}(A)$是$\F^n$的子空间，称为$A$的**零空间**。

(b) 零多项式在$1$处取值为零。若$p(1) = q(1) = 0$，则$(p + q)(1) = p(1) + q(1) = 0$，且$(ap)(1) = a\,p(1) = 0$。所以这是$\mathcal{P}_3(\R)$的子空间。

(c) 零函数满足$0'' + 0 = 0$，而引言中的计算表明，只要$y_1, y_2$是解，$ay_1 + by_2$就是解。所以解集是子空间。在每种情形中，关键都在于定义条件是**线性且齐次的**。
:::
:::

条件稍作改变，结论就不成立了。当$\mathbf{b} \neq \mathbf{0}$时，$A\mathbf{x} = \mathbf{b}$的解永远不构成子空间，因为$\mathbf{0}$不是解；满足$p(1) = 1$的多项式也不构成子空间；$y'' + y = 1$的解同样不构成子空间。封闭性还可能以更微妙的方式不成立。

::: example 不是子空间的集合 {#ex-not-subspaces}
判断$\R^2$的下列子集中哪些是子空间：(a) 直线$y = 2x + 1$；(b) 第一象限$Q = \set{(x,y) : x\ge0,\ y\ge0}$；(c) 两条坐标轴的并$X = \set{(x, y) : xy = 0}$；(d) 集合$H = \set{(x, y): xy \ge 0}$。
::: solution
(a) 这条直线不含$(0,0)$，所以不是子空间。

(b) $Q$含有$\mathbf{0}$且对加法封闭，但对数乘不封闭：$(1, 1)\in Q$，但$(-1)(1,1) = (-1,-1)\notin Q$。不是子空间。

(c) $X$含有$\mathbf{0}$且对数乘封闭（坐标轴上一点的倍数仍在同一条坐标轴上），但$(1, 0) + (0, 1) = (1,1)\notin X$。不是子空间。

(d) $H$是第一象限与第三象限（包括坐标轴）的并。它含有$\mathbf{0}$且对数乘封闭（$(ax)(ay) = a^2xy\ge 0$），但$(1, 2) + (-2, -1) = (-1, 1)\notin H$。不是子空间。

事实上，我们将在[[linear-algebra/basis-dimension]]中看到，$\R^2$的子空间只有$\{\mathbf{0}\}$、过原点的直线以及$\R^2$本身。
:::
:::

::: quiz
下列哪些是$2\times 2$实矩阵构成的向量空间$M_2(\R)$的子空间？（选出所有正确的选项。）
- [x] 对称矩阵，$A\T = A$。
- [ ] 可逆矩阵。
- [x] 迹$a_{11} + a_{22} = 0$的矩阵。
- [ ] 所有元素都$\ge 0$的矩阵。
::: solution
对称矩阵：$O\T = O$，$(A + B)\T = A\T + B\T = A + B$，$(cA)\T = cA$，所以是子空间。迹为零的矩阵：迹为零是一个线性齐次的条件（$\tr(A + B) = \tr A + \tr B$，$\tr(cA) = c\tr A$），所以是子空间。可逆矩阵不包含$O$（而且$I + (-I) = O$说明它们对加法不封闭）。非负矩阵对乘以$-1$不封闭。
:::
:::

可以由已有的子空间构造新的子空间。若$U$和$W$是$V$的子空间，则它们的**交**$U\cap W$与它们的**和**

$$
U + W = \set{u + w : u\in U,\ w\in W}
$$

都是子空间（验证三个条件即可；对于和，$(u + w) + (u' + w') = (u + u') + (w + w')$）。和是同时包含$U$和$W$的最小子空间。而**并**$U \cup W$通常不是子空间——[[#ex-not-subspaces]]中的两条坐标轴就是一个例子——[[#exr-union]]准确地指出了它何时是子空间。

::: definition 直和 {#def-direct-sum}
如果每个$v\in V$都能以**唯一一种**方式写成$v = u + w$，其中$u\in U$，$w \in W$，就称$V$是$U$与$W$的**直和**，记作$V = U\oplus W$。
:::

::: proposition 直和的判别准则 {#prop-direct-sum}
设$U$和$W$是$V$的子空间，且$U + W = V$。那么$V = U \oplus W$当且仅当$U\cap W = \{0\}$。
:::

::: proof
设$V = U\oplus W$且$v \in U\cap W$。那么$v = v + 0 = 0 + v$是把$v$写成（$U$中元素）$+$（$W$中元素）的两种方式，所以由唯一性，$v = 0$。反之，设$U \cap W = \{0\}$，且$v = u + w = u' + w'$，其中$u, u'\in U$，$w, w'\in W$。那么$u - u' = w' - w$；左边属于$U$，右边属于$W$，所以两者都属于$U \cap W = \{0\}$。因此$u = u'$，$w = w'$。
:::

例如，$\R^2$是任意两条不同的过原点直线的直和；每个方阵都能唯一地写成一个对称矩阵与一个反对称矩阵之和（[[#exr-sym-skew]]）。

## 线性组合与张成空间

::: definition 线性组合与张成空间 {#def-span}
向量$v_1, \dots, v_k\in V$的**线性组合**是指形如$a_1v_1 + \dots + a_kv_k$的向量，其中$a_1, \dots, a_k\in\F$。$v_1, \dots, v_k$的**张成空间**是它们的全体线性组合构成的集合，

$$
\Span(v_1, \dots, v_k) = \set{a_1v_1 + \dots + a_kv_k : a_1, \dots, a_k\in\F},
$$

并约定空组的张成空间是$\{0\}$。若$\Span(v_1,\dots,v_k) = V$，就说$v_1, \dots, v_k$**张成**$V$，或者说它们构成$V$的一个**张成组**。
:::

::: theorem 张成空间是最小的子空间 {#thm-span}
$\Span(v_1, \dots, v_k)$是$V$的一个包含每个$v_j$的子空间，并且它包含于$V$的每一个包含$v_1, \dots, v_k$全体的子空间之中。
:::

::: proof
取所有系数为零，可知$0 \in \Span(v_1,\dots,v_k)$。线性组合的和与倍数仍是线性组合：

$$
\textstyle\sum_j a_jv_j + \sum_j b_jv_j = \sum_j (a_j + b_j)v_j, \qquad c\sum_j a_jv_j = \sum_j (ca_j)v_j,
$$

所以由[[#thm-subspace-test]]，张成空间是子空间。它包含$v_j$（取$a_j = 1$，其余系数为$0$）。最后，包含$v_1, \dots, v_k$的子空间对加法和数乘封闭，所以它包含它们的每一个线性组合。
:::

张成空间提供了构造子空间的简单方法，我们在有限维情形中遇到的每个子空间都是张成空间。从几何上看，在$\R^3$中，一个非零向量的张成空间是一条过原点的直线，两个不平行向量的张成空间是一个过原点的平面。

对于以$\mathbf{a}_1, \dots, \mathbf{a}_n \in \F^m$为列的矩阵$A$，各列的张成空间称为**列空间**

$$
\operatorname{Col}(A) = \Span(\mathbf{a}_1, \dots, \mathbf{a}_n) = \set{A\mathbf{x} : \mathbf{x}\in\F^n}.
$$

由于$A\mathbf{x} = x_1\mathbf{a}_1 + \dots + x_n\mathbf{a}_n$，向量$\mathbf{b}$属于$\operatorname{Col}(A)$当且仅当方程组$A\mathbf{x} = \mathbf{b}$相容。因此，关于$\F^m$中张成空间的问题就是关于线性方程组的问题，高斯消元法可以回答它们。

::: example 它在张成空间中吗？ {#ex-in-span}
设$\mathbf{v}_1 = (1, 0, 1)$，$\mathbf{v}_2 = (1, 2, 3)$。判断$\mathbf{b} = (2, 1, 5)$和$\mathbf{c} = (3, 2, 5)$是否属于$\Span(\mathbf{v}_1, \mathbf{v}_2)$，并从几何上描述这个张成空间。
::: solution
$\mathbf{b} = x_1\mathbf{v}_1 + x_2\mathbf{v}_2$是一个增广矩阵为$[\,\mathbf{v}_1\ \mathbf{v}_2 \mid \mathbf{b}\,]$的方程组：

$$
\left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 1&3&5 \end{array}\right] \xrightarrow{R_3 - R_1} \left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 0&2&3 \end{array}\right] \xrightarrow{R_3 - R_2} \left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 0&0&2 \end{array}\right].
$$

最后一行是$0 = 2$：不相容，所以$\mathbf{b}\notin\Span(\mathbf{v}_1,\mathbf{v}_2)$。对$[\,\mathbf{v}_1\ \mathbf{v}_2\mid\mathbf{c}\,]$作同样的变换，最后一列变为$(3, 2, 0)$：相容，且$x_2 = 1$，$x_1 = 2$。确实，$2(1,0,1) + (1,2,3) = (3,2,5)$。

这个张成空间是一个过原点的平面。用一般的右端$(b_1, b_2, b_3)$进行消元，就能求出它的方程：最后一个元素变为$b_3 - b_1 - b_2$，所以张成空间是平面$b_1 + b_2 - b_3 = 0$。验证：$2 + 1 - 5 \neq 0$，而$3 + 2 - 5 = 0$。
:::
:::

::: widget transform2d
matrix: 1,3; 2,1
caption: $A$的各列是$\mathbf{e}_1$和$\mathbf{e}_2$的像，变换后的网格显示了各个组合$x_1\mathbf{a}_1 + x_2\mathbf{a}_2$，因此它铺满了$\operatorname{Col}(A)$。这里两列$(1,2)$和$(3,1)$张成整个平面。现在把第二列改为$(0.5, 1)$，即第一列的一半：网格塌缩到一条直线上，因为两个平行向量的张成空间只是一条直线。
:::

张成空间在每个向量空间中都有意义，而不仅仅在$\F^n$中。在函数空间中，$\Span(\sin x, \cos x)$恰好是$y'' + y = 0$的解集（这是[[ode/second-order-linear]]中的一个事实）；其中每个元素都是一个正弦型函数$a\sin x + b\cos x = R\sin(x + \varphi)$，振幅为$R = \sqrt{a^2 + b^2}$。

::: widget plot
f: a*sin(x) + b*cos(x)
x: -2pi, 2pi
y: -4, 4
sliders: a=1:-3:3:0.1; b=1:-3:3:0.1
piticks: true
labels: a\sin x + b\cos x
caption: 函数空间中的一个双参数向量族：$\sin x$与$\cos x$的张成空间。权$a, b$的每一种选取都给出一个周期为$2\pi$、振幅为$\sqrt{a^2+b^2}$的波。令$a = b = 0$就得到零向量——恒等于$0$的函数。
:::

## 线性无关

张成组中可能含有冗余。在$\Span(\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_1 + \mathbf{v}_2)$中，第三个向量没有增添任何东西。线性无关就是“没有冗余”的确切含义。

::: definition 线性无关 {#def-independent}
如果使下式成立的标量只有$a_1 = a_2 = \dots = a_k = 0$这一种选取，就称$V$中的向量组$v_1, \dots, v_k$**线性无关**：

$$
a_1v_1 + a_2v_2 + \dots + a_kv_k = 0
$$

否则称该向量组**线性相关**，而并非所有$a_j = 0$的等式$a_1v_1 + \dots + a_kv_k = 0$称为一个**线性相关关系**。空组是线性无关的。
:::

一些直接的推论：含有零向量的向量组线性相关（$1\cdot 0 = 0$）；含有重复向量的向量组线性相关（$v - v = 0$）；单个向量$v$线性无关当且仅当$v \neq 0$（由[[#prop-axioms]]的第5部分）；两个向量线性相关当且仅当其中一个是另一个的倍数。

对于$\F^m$中的向量，这个定义是关于一个齐次方程组的命题：$\mathbf{v}_1, \dots, \mathbf{v}_k$线性无关当且仅当$A\mathbf{x} = \mathbf{0}$只有平凡解，其中$A = (\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$；由[[linear-algebra/linear-systems#thm-exist-unique]]，这当且仅当**$A$的每一列都是主元列**时发生。

::: example 检验线性无关性 {#ex-independence}
(a) $(1,2,3)$、$(4,5,6)$、$(7,8,9)$是否线性无关？(b) 证明函数$e^x$、$e^{2x}$、$e^{3x}$在$\mathcal{F}(\R,\R)$中线性无关。
::: solution
(a) 对以这些向量为列的矩阵作行化简：

$$
\begin{pmatrix}1&4&7\\2&5&8\\3&6&9\end{pmatrix} \xrightarrow[R_3 - 3R_1]{R_2 - 2R_1} \begin{pmatrix}1&4&7\\0&-3&-6\\0&-6&-12\end{pmatrix} \xrightarrow{R_3 - 2R_2} \begin{pmatrix}1&4&7\\0&-3&-6\\0&0&0\end{pmatrix}.
$$

第3列不是主元列，所以这些向量线性相关。为求出一个相关关系，解$A\mathbf{x} = \mathbf{0}$：$x_3 = t$是自由变量，由$-3x_2 - 6t = 0$得$x_2 = -2t$，由$x_1 + 4x_2 + 7x_3 = 0$得$x_1 = t$。取$t = 1$：

$$
(1,2,3) - 2(4,5,6) + (7,8,9) = (0,0,0).
$$

(b) 设对**所有**$x\in\R$都有$ae^x + be^{2x} + ce^{3x} = 0$（函数空间的零向量是零函数，所以这个等式必须在每一点都成立）。除以$e^{3x}$：对所有$x$有$ae^{-2x} + be^{-x} + c = 0$。令$x\to\infty$得$c = 0$。于是$ae^{-2x} + be^{-x} = 0$；乘以$e^{x}$后再令$x\to\infty$，得$b = 0$，从而由$ae^{-2x} = 0$得$a = 0$。所以唯一的关系是平凡关系。
:::
:::

::: warning 函数的线性无关性涉及所有的点
要证明一些函数**线性相关**，需要找到一个在每一点都成立的关系，例如$\sin(x + 1) = \cos 1\,\sin x + \sin 1\,\cos x$，它说明$\sin x$、$\cos x$、$\sin(x+1)$线性相关。要证明它们**线性无关**，仅仅找到某个组合不为零的一个点是不够的；必须证明没有哪个非平凡组合处处为零。一个有用的技巧是：若$\sum a_jf_j = 0$处处成立，则它在你选定的任意一些点上都成立，从而得到关于各$a_j$的线性方程组；如果这个方程组只有平凡解，这些函数就线性无关。
:::

下面的引理是去除冗余的基本工具，也是维数理论的关键。

::: lemma 线性相关性引理 {#lem-dependence}
设$v_1, \dots, v_k$是$V$中线性相关的向量组。那么存在下标$j$，使得

$$
v_j\in\Span(v_1, \dots, v_{j-1}),
$$

并且从向量组中去掉$v_j$不改变它的张成空间。（当$j = 1$时，这是说$v_1 = 0$。）
:::

::: proof
选取一个并非所有$a_i = 0$的相关关系$a_1v_1 + \dots + a_kv_k = 0$，并令$j$是使$a_j \neq 0$的**最大**下标。那么$a_1v_1 + \dots + a_jv_j = 0$，除以$a_j$，得

$$
v_j = -\frac{a_1}{a_j}v_1 - \dots - \frac{a_{j-1}}{a_j}v_{j-1} \in \Span(v_1, \dots, v_{j-1}).
$$

对于第二个结论，用这个表达式代替$v_j$，就能把$v_1, \dots, v_k$的任何线性组合改写为其余向量的线性组合。所以去掉$v_j$后张成空间不变。
:::

::: theorem 向量过多必线性相关 {#thm-too-many}
$\F^m$中任何多于$m$个向量的向量组都线性相关。
:::

::: proof
设$\mathbf{v}_1, \dots, \mathbf{v}_k \in \F^m$，$k > m$，$A = (\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$。方程组$A\mathbf{x} = \mathbf{0}$有$m$个方程和$k > m$个未知数，所以由[[linear-algebra/linear-systems#thm-more-unknowns]]，它有非平凡解$\mathbf{x}$，而$x_1\mathbf{v}_1 + \dots + x_k\mathbf{v}_k = \mathbf{0}$就是一个相关关系。
:::

例如，平面上任意三个向量都线性相关。在[[linear-algebra/basis-dimension]]中，这个定理将发展为如下命题：在由$m$个向量张成的空间中，任意$m + 1$个向量都线性相关——维数概念正是建立在这一事实之上的。最后，线性无关恰恰就是使系数唯一的条件。

::: proposition 系数的唯一性 {#prop-unique-coeffs}
向量组$v_1, \dots, v_k$线性无关，当且仅当$\Span(v_1, \dots, v_k)$中的每个向量都只能以一种方式写成$v_1, \dots, v_k$的线性组合。
:::

::: proof
若$\sum a_jv_j = \sum b_jv_j$，则$\sum (a_j - b_j)v_j = 0$；由线性无关性，对所有$j$有$a_j = b_j$。反之，若表示法唯一，则由于$0 = \sum 0\,v_j$是$0$的一种表示，唯一的关系$\sum a_jv_j = 0$就是所有$a_j = 0$的那一个。
:::

::: quiz
向量$\mathbf{u}, \mathbf{v}, \mathbf{w}\in\R^3$满足$\mathbf{w} = \mathbf{u} + \mathbf{v}$。下列哪些说法必定成立？（选出所有正确的选项。）
- [x] $\mathbf{u}, \mathbf{v}, \mathbf{w}$线性相关。
- [x] $\Span(\mathbf{u}, \mathbf{v}, \mathbf{w}) = \Span(\mathbf{u}, \mathbf{v})$。
- [ ] $\Span(\mathbf{u}, \mathbf{v}, \mathbf{w})$是一个平面。
- [ ] $\mathbf{u}$和$\mathbf{v}$线性无关。
::: solution
$\mathbf{u} + \mathbf{v} - \mathbf{w} = \mathbf{0}$是一个相关关系，由[[#lem-dependence]]，去掉$\mathbf{w}$不改变张成空间。但没有什么能迫使$\mathbf{u}, \mathbf{v}$线性无关：若$\mathbf{v} = 2\mathbf{u} \neq \mathbf{0}$，张成空间是一条直线；若三个向量都是零，张成空间是$\{\mathbf{0}\}$。所以张成空间不一定是平面。
:::
:::

::: history
元素可以相加、可以伸缩，并带有线性无关和维数概念的空间，这一思想出现在赫尔曼·格拉斯曼（Hermann Grassmann）的《线性扩张论》（*Die lineale Ausdehnungslehre*，1844年）中。这部著作远远超前于它的时代，以至于几乎完全被忽视；1862年的修订版也没有好到哪里去。仰慕格拉斯曼的朱塞佩·皮亚诺（Giuseppe Peano）在《几何演算》（*Calcolo geometrico*，1888年）中把这些思想提炼为一份简短的公理清单——这是实向量空间的第一个公理化定义，基本上就是今天所用的定义。公理化的观点直到20世纪才成为标准，因为人们发现它对函数空间不可或缺：斯特凡·巴拿赫（Stefan Banach）在1920年完成、1922年发表的博士论文中给出了完备赋范向量空间的公理，这种空间如今称为巴拿赫空间，它是现代分析的基础。
:::

## 后续内容

有了子空间、张成空间和线性无关这些概念，[[linear-algebra/basis-dimension]]将把张成与线性无关结合成**基**的概念，证明一个空间的所有基都含有相同个数的向量——这个数就是空间的**维数**——并求出矩阵的零空间和列空间的基。[[linear-algebra/linear-maps]]研究向量空间之间保持运算的函数。$C[a,b]$这样的函数空间是无穷维向量空间，它们通过内积和范数获得的几何结构推动了傅里叶级数（[[pde/fourier-series]]）、[[measure-theory/lp-spaces]]中的$L^p$空间以及现代分析的大部分内容（[[real-analysis/metric-spaces]]）。把标量域换成环（见[[abstract-algebra/rings]]），就得到更一般的模论。

::: summary
- 向量空间是带有满足八条公理的加法和数乘的集合（[[#def-vector-space]]）；例子包括$\F^n$、矩阵、多项式以及带有逐点运算的函数。
- $0v = 0$、$(-1)v = -v$以及“$av = 0$蕴涵$a = 0$或$v = 0$”等熟悉的事实都可由公理推出（[[#prop-axioms]]）。
- 子集是子空间当且仅当它含有$0$并且对加法和数乘封闭（[[#thm-subspace-test]]）；齐次线性条件的解集是典型的例子。
- 全体线性组合构成的集合$\Span(v_1,\dots,v_k)$是包含各$v_j$的最小子空间；在$\F^m$中，$\mathbf{b}\in\Span(\mathbf{a}_1,\dots,\mathbf{a}_n)$当且仅当$A\mathbf{x} = \mathbf{b}$相容。
- 当只有平凡组合才给出$0$时，这些向量线性无关；在$\F^m$中，这当且仅当$(\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$的每一列都是主元列。
- 在线性相关的向量组中，某个向量属于它前面那些向量的张成空间，去掉它不改变张成空间（[[#lem-dependence]]）。
- $\F^m$中多于$m$个的向量总是线性相关（[[#thm-too-many]]）；线性无关等价于系数的唯一性。
:::

## 习题

::: exercise 是不是子空间？ {level=1}
下列哪些是$\R^3$的子空间？对每个答案说明理由。(a) $\set{(x,y,z) : x + 2y - z = 0}$；(b) $\set{(x,y,z) : x + 2y - z = 1}$；(c) $\set{(x,y,z): x = y^2}$；(d) $\set{(t, 2t, -t) : t\in\R}$。
::: solution
(a) 是：它是$A = (1\ \ 2\ {-1})$的零空间$\operatorname{Nul}(A)$，由[[#ex-subspaces]]，它是子空间。(b) 不是：$(0,0,0)$不满足方程。(c) 不是：$(1, 1, 0)$属于该集合，但$2(1,1,0) = (2,2,0)$不属于，因为$2 \neq 2^2$。(d) 是：它是$\Span\bigl((1,2,-1)\bigr)$，一条过原点的直线，由[[#thm-span]]，它是子空间。
:::
:::

::: exercise 待定参数 {level=1 check="4"}
$h$取何值时，$(1, h, 5)$属于$\Span\bigl((1,0,1), (1,2,3)\bigr)$？
::: solution
由[[#ex-in-span]]，这个张成空间是平面$b_1 + b_2 - b_3 = 0$。所以需要$1 + h - 5 = 0$，即$h = 4$。确实，$(1, 4, 5) = -(1,0,1) + 2(1,2,3)$。
:::
:::

::: exercise 求相关关系 {level=1}
证明$(1,1,0)$、$(0,1,1)$、$(1,0,-1)$线性相关，并求出一个相关关系。
::: solution
对以这些向量为列的矩阵作行化简：$\begin{pmatrix}1&0&1\\1&1&0\\0&1&-1\end{pmatrix} \xrightarrow{R_2 - R_1}\begin{pmatrix}1&0&1\\0&1&-1\\0&1&-1\end{pmatrix}\xrightarrow{R_3 - R_2}\begin{pmatrix}1&0&1\\0&1&-1\\0&0&0\end{pmatrix}$。第3列不是主元列，所以这些向量线性相关。取$x_3 = 1$，得$x_2 = 1$，$x_1 = -1$，从而$-(1,1,0) + (0,1,1) + (1,0,-1) = (0,0,0)$。
:::
:::

::: exercise 参数与线性无关性 {level=2 check="-1"}
求实数$k$的值，使向量$(1, k, 0)$、$(0, 1, k)$、$(k, 0, 1)$线性相关。
::: solution
对$A = \begin{pmatrix}1&0&k\\k&1&0\\0&k&1\end{pmatrix}$（各列为给定的向量）作行化简：$R_2 \to R_2 - kR_1$得$(0, 1, -k^2)$，再作$R_3 \to R_3 - kR_2$得$(0, 0, 1 + k^3)$。这些向量线性相关当且仅当第三列不是主元列，即$1 + k^3 = 0$。由于$1 + k^3 = (1 + k)(1 - k + k^2)$，且$1 - k + k^2 = (k - \frac12)^2 + \frac34 > 0$，唯一的实数解是$k = -1$。验证：$(1,-1,0) + (0,1,-1) + (-1,0,1) = \mathbf{0}$。
:::
:::

::: exercise 解空间 {level=2}
设$S$是满足$y'' - 3y' + 2y = 0$的二次可微函数$y\colon\R\to\R$构成的集合。证明：$S$是$\mathcal{F}(\R,\R)$的子空间；$e^x$和$e^{2x}$属于$S$；并且它们线性无关。
::: solution
零函数属于$S$。若$y_1, y_2\in S$且$a, b\in\R$，则由求导的线性性，

$$
(ay_1 + by_2)'' - 3(ay_1 + by_2)' + 2(ay_1 + by_2) = a(y_1'' - 3y_1' + 2y_1) + b(y_2'' - 3y_2' + 2y_2) = 0,
$$

所以$S$是子空间。对$y = e^{rx}$，有$y'' - 3y' + 2y = (r^2 - 3r + 2)e^{rx} = (r-1)(r-2)e^{rx}$，它在$r = 1$和$r = 2$时为零。若对所有$x$有$ae^x + be^{2x} = 0$，则令$x = 0$得$a + b = 0$，求导后再令$x = 0$得$a + 2b = 0$；因此$a = b = 0$。（之所以可以求导，是因为这个恒等式对所有$x$都成立。）
:::
:::

::: exercise 对称加反对称 {level=2 #exr-sym-skew}
设$\mathrm{Sym}$和$\mathrm{Skew}$分别是$M_n(\R)$中对称矩阵和反对称矩阵构成的集合。证明两者都是子空间，并且$M_n(\R) = \mathrm{Sym}\oplus\mathrm{Skew}$。
::: solution
两者都含有$O$，并且由于转置保持和与数乘，它们对运算封闭。每个$A$都可以分解为

$$
A = \tfrac12(A + A\T) + \tfrac12(A - A\T),
$$

其中第一项是对称的，第二项是反对称的（因为$(A\T)\T = A$）。所以$\mathrm{Sym} + \mathrm{Skew} = M_n(\R)$。若$B$既对称又反对称，则$B = B\T = -B$，所以$2B = O$，$B = O$。由[[#prop-direct-sum]]，这个和是直和。
:::
:::

::: exercise 有一条公理不成立 {level=2}
在$\R^2$上保留通常的加法，但把数乘定义为$c\odot(x, y) = (cx, 0)$。[[#def-vector-space]]的八条公理中哪些不成立？
::: solution
公理1—4只涉及加法，而加法没有改变，所以它们成立。公理6：$a\odot(b\odot(x,y)) = a\odot(bx, 0) = (abx, 0) = (ab)\odot(x,y)$，成立。公理7：$a\odot\bigl((x,y) + (x',y')\bigr) = (a(x + x'), 0) = (ax, 0) + (ax', 0)$，成立。公理8：$(a + b)\odot(x,y) = ((a+b)x, 0) = (ax,0) + (bx, 0)$，成立。公理5不成立：只要$y\neq 0$，就有$1\odot(x, y) = (x, 0) \neq (x, y)$。所以恰有一条公理不成立——这说明公理5不能由其他公理推出。
:::
:::

::: exercise 并集何时是子空间？ {level=3 #exr-union}
设$U$和$W$是$V$的子空间。证明：$U\cup W$是子空间当且仅当$U\subseteq W$或$W\subseteq U$。
::: hint
对于较难的方向，假设两者互不包含，取$u\in U\setminus W$和$w \in W\setminus U$，然后考虑$u + w$属于哪里。
:::
::: solution
若$U\subseteq W$，则$U\cup W = W$是子空间；$W\subseteq U$时同理。反之，设$U\cup W$是子空间，但$U, W$互不包含。选取$u\in U$使$u\notin W$，再选取$w\in W$使$w \notin U$。由于$U \cup W$对加法封闭，$u + w\in U\cup W$。若$u + w\in U$，则$w = (u + w) - u\in U$，矛盾。若$u + w\in W$，则$u = (u + w) - w\in W$，同样矛盾。因此这两个子空间中必有一个包含另一个。
:::
:::

::: exercise 扩充线性无关组 {level=3}
设$v_1, \dots, v_k$在$V$中线性无关，且$v\notin\Span(v_1,\dots,v_k)$。证明$v_1, \dots, v_k, v$线性无关。
::: solution
设$a_1v_1 + \dots + a_kv_k + bv = 0$。若$b\neq 0$，则$v = -\frac{1}{b}(a_1v_1 + \dots + a_kv_k)\in\Span(v_1,\dots,v_k)$，与假设矛盾。所以$b = 0$，于是由线性无关性，$a_1v_1 + \dots + a_kv_k = 0$迫使$a_1 = \dots = a_k = 0$。因此所有系数都为零。（等价地，也可以应用[[#lem-dependence]]：如果向量组$v_1,\dots,v_k,v$线性相关，引理给出的那个向量不可能在$v_1, \dots, v_k$之中，因为它们线性无关；它也不可能是$v$。）
:::
:::

::: exercise 正弦函数线性无关 {level=3}
证明：对每个$n\ge 1$，函数$\sin x, \sin 2x, \dots, \sin nx$在$\mathcal{F}(\R,\R)$中线性无关。
::: hint
利用以下事实：当$j\neq k$时$\displaystyle\int_0^{2\pi}\sin jx\,\sin kx\,dx = 0$，当$j = k$时积分$=\pi$；这可以由$2\sin A\sin B = \cos(A - B) - \cos(A + B)$推出。
:::
::: solution
先计算积分：对正整数$j, k$，

$$
\int_0^{2\pi}\sin jx\,\sin kx\,dx = \frac12\int_0^{2\pi}\bigl(\cos (j-k)x - \cos (j+k)x\bigr)\,dx,
$$

而对每个整数$m\neq 0$，$\int_0^{2\pi}\cos mx\,dx$等于$0$；对$m = 0$，它等于$2\pi$。所以当$j \neq k$时积分为$0$，当$j = k$时积分为$\frac12\cdot 2\pi = \pi$。现在设对所有$x$有$a_1\sin x + \dots + a_n\sin nx = 0$。乘以$\sin kx$并在$[0, 2\pi]$上积分：除第$k$项外，每一项的积分都是$0$，所以$\pi a_k = 0$，$a_k = 0$。这对每个$k$都成立，所以这些函数线性无关。（这是我们第一次瞥见函数空间中的正交性——它是[[linear-algebra/inner-products]]的主题，也是傅里叶级数的基础。）
:::
:::
