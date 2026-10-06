希腊几何中有三个问题，两千年来抵挡住了一切尝试：只用直尺和圆规，作一个立方体，使其体积是给定立方体的两倍；三等分任意角；作一个正方形，使其面积等于给定圆的面积。第四个问题来自文艺复兴时期的代数，同样难以攻克：像二次方程的求根公式那样，找出一个由系数经四则运算和开$n$次方构成的五次多项式求根公式。这四个问题最终都在19世纪得到了解决——答案都是否定的——而起决定作用的工具，正是本章所要建立的。

第一个思想是：把包含较小的域$F$的域$K$看作$F$上的**向量空间**，并用它的维数——**次数**$[K : F]$——来度量它。在域塔中次数相乘，单是这个简单的事实就足以解决那些经典作图问题。第二个思想归功于伽罗瓦（Galois）：研究域扩张的对称群。**伽罗瓦理论基本定理**把关于域的问题转化为关于有限群的问题，再由$A_5$的单性（[[abstract-algebra/group-actions#thm-a5-simple]]）即可证明某些五次方程不能用根式求解。在此过程中，我们还将对所有有限域进行分类。

本章始终以特征为$0$的域（例如$\C$的子域）和有限域为主要例子；定理的叙述保证对这些域是正确的。

## 域扩张与次数

::: definition 扩张与次数 {#def-degree}
若$F$是域$K$的子域，则称$K$为$F$的**扩张**，记作$K/F$。这时$K$是$F$上的向量空间（$K$中的元素相加，并用$F$中的标量去乘），扩张的**次数**就是它的维数

$$
[K : F] = \dim_F K .
$$

若$[K : F] < \infty$，则称该扩张为**有限扩张**。
:::

例如$[\C : \R] = 2$，基为$1, i$。域$\Q(\sqrt 2) = \set{a + b\sqrt2 : a, b \in \Q}$满足$[\Q(\sqrt2) : \Q] = 2$，基为$1, \sqrt 2$。[[abstract-algebra/polynomials#ex-finite-fields]]中的域$\F_8$满足$[\F_8 : \F_2] = 3$。另一方面，$[\R : \Q] = \infty$，因为可数域$\Q$上的有限维向量空间是可数的（见[[proofs/cardinality]]）。

对$\alpha_1, \dots, \alpha_n \in K$，我们用$F(\alpha_1, \dots, \alpha_n)$表示$K$中包含$F$和各$\alpha_i$的最小子域，即在$F$上**添加**这些元素所得的域。子域上的向量空间引出了这门学科中最有用的公式（关于基，见[[linear-algebra/basis-dimension]]）。

::: theorem 塔律 {#thm-tower-law}
设$F \subseteq K \subseteq L$都是域。若$a_1, \dots, a_m$是$K$在$F$上的基，$b_1, \dots, b_n$是$L$在$K$上的基，则$mn$个乘积$a_ib_j$构成$L$在$F$上的基。因此

$$
[L : F] = [L : K]\,[K : F] .
$$ {#eq-tower}

（按照显然的约定，当某个次数为无穷时，这个公式也成立。）
:::

::: proof
**张成。**设$c \in L$。由于各$b_j$在$K$上张成$L$，$c = \sum_j k_jb_j$，其中$k_j \in K$；而每个$k_j = \sum_i f_{ij}a_i$，其中$f_{ij} \in F$。所以$c = \sum_{i,j} f_{ij}\,a_ib_j$。

**线性无关。**设$\sum_{i,j} f_{ij}a_ib_j = 0$，其中$f_{ij} \in F$。把各项合并为$\sum_j\bigl(\sum_i f_{ij}a_i\bigr)b_j = 0$。系数$\sum_i f_{ij}a_i$属于$K$，而各$b_j$在$K$上线性无关，所以每个$\sum_i f_{ij}a_i = 0$。各$a_i$在$F$上线性无关，所以每个$f_{ij} = 0$。

若$L/K$或$K/F$是无限扩张，则$L$包含一个在$F$上线性无关的无限集（如上取乘积，或者直接取$K$的基），所以也有$[L:F] = \infty$。
:::

一个直接推论：若$[K : F]$是素数，则不存在严格介于$F$与$K$之间的域，因为两步扩张的次数之积必须是一个素数。

## 代数元与单扩张

::: definition 代数元与超越元 {#def-algebraic}
设$K/F$是扩张。若存在非零的$f \in F[x]$使$f(\alpha) = 0$，则称元素$\alpha \in K$在$F$上是**代数的**；否则称$\alpha$是**超越的**。
:::

$\sqrt 2$、$i$、$\sqrt[3]{2}$、$e^{2\pi i/n}$和$\sqrt2 + \sqrt3$在$\Q$上都是代数的。数$e$和$\pi$在$\Q$上是超越的（埃尔米特（Hermite），1873年；林德曼（Lindemann），1882年）；这些证明要用到分析，超出了本课程的范围。

::: definition 极小多项式 {#def-minimal-polynomial}
若$\alpha$在$F$上是代数的，则它的**极小多项式**$m_\alpha \in F[x]$是满足$m_\alpha(\alpha) = 0$的次数最小的首一多项式。$\alpha$在$F$上的**次数**是$\deg m_\alpha$。
:::

::: proposition 极小多项式的性质 {#prop-minimal}
设$\alpha$在$F$上是代数的，则$m_\alpha$在$F$上不可约；多项式$f \in F[x]$满足$f(\alpha) = 0$当且仅当$m_\alpha \mid f$；并且任何满足$p(\alpha) = 0$的首一不可约多项式$p \in F[x]$都等于$m_\alpha$。
:::

::: proof
集合$I = \set{f \in F[x] : f(\alpha) = 0}$是求值同态$F[x] \to K$，$f \mapsto f(\alpha)$的核，因而是理想；由于$\alpha$是代数的，它不是零理想。由[[abstract-algebra/polynomials#thm-fx-pid]]，它由一个次数最小的非零元生成，把这个元素化为首一后就是$m_\alpha$；所以$f(\alpha) = 0 \iff m_\alpha \mid f$。若$m_\alpha = gh$，其中两个因式的次数都更小，则在域$K$中$g(\alpha)h(\alpha) = 0$，所以$g(\alpha) = 0$或$h(\alpha) = 0$，这与极小性矛盾。最后，若$p$是首一不可约多项式且$p(\alpha) = 0$，则$m_\alpha \mid p$，由不可约性得$p = m_\alpha$。
:::

::: theorem 单代数扩张 {#thm-simple-extension}
设$\alpha$在$F$上是代数的，其极小多项式$m_\alpha$的次数为$n$。则

$$
F(\alpha) \cong F[x]/(m_\alpha), \qquad\text{并且}\qquad 1, \alpha, \alpha^2, \dots, \alpha^{n-1} \text{ 是 } F(\alpha) \text{ 在 } F \text{ 上的基} .
$$

特别地，$[F(\alpha) : F] = \deg m_\alpha$。
:::

::: proof
求值映射$F[x] \to K$，$f \mapsto f(\alpha)$，是环同态，由[[#prop-minimal]]，其核为$(m_\alpha)$。它的像是$F[\alpha] = \set{f(\alpha) : f \in F[x]}$。由第一同构定理（[[abstract-algebra/rings#thm-first-iso-rings]]），$F[\alpha] \cong F[x]/(m_\alpha)$，而由于$m_\alpha$不可约，它是域（[[abstract-algebra/polynomials#thm-quotient-field]]）。所以$F[\alpha]$是$K$中包含$F$和$\alpha$的子域；而任何这样的子域都包含$\alpha$的所有多项式表达式，即包含$F[\alpha]$。因此$F(\alpha) = F[\alpha] \cong F[x]/(m_\alpha)$。关于基的结论，就是把[[abstract-algebra/polynomials#thm-quotient-field]]中对$F[x]/(m_\alpha)$的描述经同构$x + (m_\alpha) \mapsto \alpha$搬运过来。
:::

所以要求$\alpha$的次数，只需找一个以$\alpha$为根的首一不可约多项式。例如，$[\Q(\sqrt[3]2) : \Q] = 3$，因为$x^3 - 2$不可约（对$2$应用艾森斯坦判别法）；对$\zeta_p = e^{2\pi i/p}$有$[\Q(\zeta_p) : \Q] = p - 1$，因为分圆多项式$\Phi_p$不可约（[[abstract-algebra/polynomials#ex-eisenstein]]）。这个定理还表明，$F(\alpha)$中的逆元是$\alpha$的多项式：在$\Q(\sqrt[3]2)$中，记$a = \sqrt[3]2$，则$(1 + a)(1 - a + a^2) = 1 + a^3 = 3$，所以

$$
\frac{1}{1 + \sqrt[3]2} = \frac{1 - \sqrt[3]2 + \sqrt[3]4}{3} .
$$

::: example 一个四次域 {#ex-q-sqrt2-sqrt3}
证明$[\Q(\sqrt2, \sqrt3) : \Q] = 4$，$\Q(\sqrt 2, \sqrt 3) = \Q(\sqrt2 + \sqrt3)$，并求$\gamma = \sqrt 2 + \sqrt 3$的极小多项式。
::: solution
首先，$\sqrt3 \notin \Q(\sqrt2)$：若$\sqrt 3 = a + b\sqrt2$，其中$a, b \in \Q$，两边平方得$3 = a^2 + 2b^2 + 2ab\sqrt2$，所以$ab = 0$（因为$\sqrt 2$是无理数）；$b = 0$给出$a^2 = 3$，$a = 0$给出$2b^2 = 3$，二者在$\Q$中都不可能。所以$x^2 - 3$在$\Q(\sqrt2)$上不可约，$[\Q(\sqrt2,\sqrt3) : \Q(\sqrt 2)] = 2$。由塔律，

$$
[\Q(\sqrt2, \sqrt3) : \Q] = 2 \cdot 2 = 4,
$$

基为$1, \sqrt2, \sqrt3, \sqrt6$（由基$1, \sqrt 2$与$1, \sqrt3$中元素的乘积组成）。

显然$\gamma \in \Q(\sqrt2, \sqrt3)$。反过来，$\gamma^3 = 11\sqrt2 + 9\sqrt3$，所以$\gamma^3 - 9\gamma = 2\sqrt2$，$\gamma^3 - 11\gamma = -2\sqrt3$；因此$\sqrt2, \sqrt3 \in \Q(\gamma)$，两个域相等。于是$\deg m_\gamma = [\Q(\gamma) : \Q] = 4$。由于$\gamma^2 = 5 + 2\sqrt6$，得$(\gamma^2 - 5)^2 = 24$，即$\gamma^4 - 10\gamma^2 + 1 = 0$。这个首一四次多项式以$\gamma$为根，次数也恰好合适，所以$m_\gamma = x^4 - 10x^2 + 1$（它自动是不可约的）。
:::
:::

::: proposition 有限扩张是代数扩张 {#prop-finite-algebraic}
若$[K : F] = n$有限，则每个$\alpha \in K$在$F$上都是代数的，且其次数整除$n$。因此，若$\alpha$和$\beta$在$F$上是代数的，则$\alpha \pm \beta$、$\alpha\beta$和$\alpha/\beta$（$\beta \neq 0$）也是代数的：代数数构成一个域。
:::

::: proof
$n$维空间$K$中的$n + 1$个元素$1, \alpha, \dots, \alpha^n$在$F$上线性相关，由此得到一个以$\alpha$为根的非零多项式。由塔律，$[K:F] = [K : F(\alpha)]\,[F(\alpha) : F]$，所以$\deg m_\alpha = [F(\alpha):F]$整除$n$。至于第二个结论，$[F(\alpha, \beta) : F] = [F(\alpha)(\beta) : F(\alpha)]\,[F(\alpha) : F]$是有限的，因为$\beta$在$F(\alpha)$上是代数的，且次数至多为$\deg m_\beta$。所以$F(\alpha, \beta)$中的每个元素，包括$\alpha \pm \beta$、$\alpha\beta$和$\alpha/\beta$，都是代数的。
:::

## 尺规作图

从平面$\C$中的点$0$和$1$出发。直尺可以画出过两个已作出的点的直线；圆规可以画出以一个已作出的点为圆心、过另一个已作出的点的圆；新的点是这些直线和圆的交点。如果一个复数能经有限步作出，就称它是**可构造的**。可构造数的和、积、商以及平方根都可以作出，所以可构造数构成一个对开平方封闭的域。关键的事实是一个逆向的结论。

::: theorem 可构造数的次数是2的幂 {#thm-constructible}
若$\alpha$是可构造的，则$[\Q(\alpha) : \Q]$是$2$的幂。
:::

::: proof
（证明概要。）假设到目前为止作出的所有点的实部和虚部都属于某个域$K \subseteq \R$。过两个这样的点的直线有方程$ax + by = c$，其系数属于$K$；圆有方程$x^2 + y^2 + dx + ey + f = 0$，其系数也属于$K$。求两条直线的交点只需要$K$中的算术运算；求直线与圆的交点，或两个圆的交点（把两个方程相减就得到一条直线），需要解$K$上的一个二次方程，所以新的坐标属于$K(\sqrt{\delta})$，其中$\delta \in K$，这是一个次数为$1$或$2$的扩张。因此，任何可构造点的坐标都属于某个域塔$\Q = K_0 \subseteq K_1 \subseteq \dots \subseteq K_r$的顶端域$K_r$，其中每个$[K_{i+1} : K_i] \le 2$，而$\alpha$属于$K_r(i)$。由塔律，$[K_r(i) : \Q]$是$2$的幂，而$[\Q(\alpha) : \Q]$整除它（[[#prop-finite-algebraic]]），所以它也是$2$的幂。
:::

::: corollary 经典作图问题不可能解决 {#cor-classical}
用尺规不可能 (a) 倍立方，(b) 三等分$60^\circ$角，(c) 化圆为方。
:::

::: proof
(a) 把单位立方体的体积加倍需要作出$\sqrt[3]2$，而它在$\Q$上的次数为$3$。(b) 三等分$60^\circ$角需要作出$\cos 20^\circ$。由$\cos 3\theta = 4\cos^3\theta - 3\cos\theta$，取$\theta = 20^\circ$，可知$c = \cos 20^\circ$满足$4c^3 - 3c = \frac12$，所以$y = 2c$是$y^3 - 3y - 1$的根，而这个多项式在$\Q$上不可约（[[abstract-algebra/polynomials#ex-cubic]]）。所以$[\Q(c) : \Q] = 3$。在这两种情形下，$3$都不是$2$的幂。(c) 把单位圆化为正方形需要作出$\sqrt\pi$；如果它是可构造的，那么$\pi$就是代数数，这与林德曼定理矛盾。
:::

由于$60^\circ$角本身是可构造的（它是等边三角形的内角），所以“三等分任意角”是不可能的。当然，有些角（例如$90^\circ$角）是可以三等分的。

::: quiz
从$0$和$1$出发，下列哪些数可以用尺规作出？（选出所有正确的选项。）
- [x] $\sqrt 2 + \sqrt 3$
- [ ] $\sqrt[3]{2}$
- [x] $\sqrt[4]{2}$
- [ ] $\cos 20^\circ$
::: solution
可构造数的平方根是可构造的，和也是可构造的；因此$\sqrt2 + \sqrt3$和$\sqrt[4]2 = \sqrt{\sqrt 2}$都是可构造的（二者的次数都是$4 = 2^2$）。$\sqrt[3]2$和$\cos 20^\circ$在$\Q$上的次数为$3$，不是$2$的幂。注意[[#thm-constructible]]的逆命题：次数是$2$的幂是可构造的必要条件，但一般不是充分条件。
:::
:::

## 分裂域与有限域

::: definition 分裂域 {#def-splitting-field}
设$f \in F[x]$的次数为$n \ge 1$。如果$f$在$K[x]$中分解为$c(x - \alpha_1)\cdots(x - \alpha_n)$，并且$K = F(\alpha_1, \dots, \alpha_n)$，则称扩张$K/F$为$f$在$F$上的**分裂域**。
:::

分裂域是**存在**的：由克罗内克定理（[[abstract-algebra/polynomials#thm-kronecker]]），添加$f$的一个根$\alpha_1$，提出因式$x - \alpha_1$，然后重复这一过程；各步扩张的次数至多为$n, n-1, \dots$，所以$[K : F] \le n!$。分裂域还是**在同构意义下唯一**的：$f$在$F$上的任意两个分裂域之间存在一个固定$F$的同构（对$[K:F]$用归纳法证明，利用[[#thm-simple-extension]]逐个根地延拓同构；见Dummit & Foote的§13.4）。对于$\C$的子域，分裂域就是由所有复根生成的子域。

::: example x³ − 2的分裂域 {#ex-x3-2}
求$x^3 - 2$在$\Q$上的分裂域$K$及其次数。
::: solution
根为$\alpha_1 = \sqrt[3]2$，$\alpha_2 = \sqrt[3]2\,\omega$，$\alpha_3 = \sqrt[3]2\,\omega^2$，其中$\omega = e^{2\pi i/3} = \frac{-1 + \sqrt{-3}}2$。所以$K = \Q(\sqrt[3]2, \omega)$（它包含$\omega = \alpha_2/\alpha_1$；反过来，$\sqrt[3]2$和$\omega$生成全部三个根）。现在$[\Q(\sqrt[3]2) : \Q] = 3$；而$\omega \notin \Q(\sqrt[3]2) \subseteq \R$，同时$\omega$是$x^2 + x + 1$的根，所以$[K : \Q(\sqrt[3]2)] = 2$。由塔律，$[K : \Q] = 6$。
:::
:::

::: widget complexplane
mode: roots
n: 3
z: 2,0
caption: $2$的三个立方根构成一个以$0$为中心的等边三角形：一个实根$\sqrt[3]2$和两个共轭复根$\sqrt[3]2\,\omega^{\pm1}$。域$\Q(\sqrt[3]2)$位于$\R$之内，所以只包含其中一个根；再添加$\omega$使次数加倍，就得到次数为$6$的分裂域。
:::

分裂域还可以用来对有限域进行分类。有限域$F$的特征是某个素数$p$（[[abstract-algebra/rings#prop-char-domain]]），所以它包含素域$\F_p = \set{0, 1, \dots, p - 1}$；若$[F : \F_p] = n$，则$\abs F = p^n$。在特征$p$中，二项式系数$\binom pk$（$0 < k < p$）都为零，所以$(a + b)^p = a^p + b^p$：**弗罗贝尼乌斯（Frobenius）映射**$a \mapsto a^p$是环同态。它是单射，因为在域中由$a^p = 0$可推出$a = 0$；所以当$F$有限时它是双射。

::: theorem 有限域的乘法群是循环群 {#thm-cyclic-mult}
若$F$是有$q$个元素的有限域，则$F^\times$是$q - 1$阶循环群。
:::

::: proof
令$N = q - 1$。对每个$d \mid N$，设$\psi(d)$为$F^\times$中$d$阶元的个数；由拉格朗日定理，每个元素的阶都整除$N$，所以$\sum_{d\mid N}\psi(d) = N$。若$\psi(d) \ge 1$且$a$的阶为$d$，则$a$的$d$个互不相同的幂都是$x^d - 1$的根，而$x^d - 1$在域$F$中至多有$d$个根（[[abstract-algebra/polynomials#cor-root-count]]）；所以每个$d$阶元都属于$\langle a\rangle$，而其中的$d$阶元恰有$\varphi(d)$个（[[abstract-algebra/subgroups#thm-order-of-power]]）。因此对所有$d$有$\psi(d) \le \varphi(d)$，并且

$$
N = \sum_{d\mid N}\psi(d) \le \sum_{d\mid N}\varphi(d) = N
$$

（最后一个等号由[[abstract-algebra/subgroups#eq-phi-sum]]得到）。等号成立迫使$\psi(N) = \varphi(N) \ge 1$：存在$N$阶元。
:::

对$F = \F_p$，这就是说模每个素数都存在**原根**，这是[[number-theory/primitive-roots]]的核心定理；对于$\F_8$和$\F_9$，我们已在[[abstract-algebra/polynomials#ex-finite-fields]]中明确地找到了生成元。

::: theorem 有限域的分类 {#thm-finite-fields}
对每个素数$p$和每个$n \ge 1$，存在一个有$q = p^n$个元素的域，并且任意两个这样的域都同构。它是$x^q - x$在$\F_p$上的分裂域，它的元素恰好是$x^q - x$的$q$个根。每个有限域的阶都是素数幂。
:::

::: proof
**存在性。**设$K$是$f = x^q - x$在$\F_p$上的分裂域，$R \subseteq K$是$f$的根的集合。这些根互不相同：若$(x - a)^2$整除$f$，则$a$也是形式导数$f' = qx^{q-1} - 1 = -1$（因为在$K$中$q = 0$）的根，但$f'$没有根。所以$\abs R = q$。此外，$R$是子域：若$a^q = a$，$b^q = b$，则$(a - b)^q = a^q - b^q = a - b$（把弗罗贝尼乌斯映射作用$n$次），$(ab)^q = ab$，且$(a^{-1})^q = a^{-1}$。由于$R$是包含所有根的域，$K = R$恰有$q$个元素。

**唯一性。**若$F$是任意一个有$q$个元素的域，则对$a \in F^\times$有$a^{q-1} = 1$（拉格朗日定理），从而对所有$a \in F$有$a^q = a$。于是$x^q - x$以$F$的$q$个元素为根，并在$F$上分裂，而$F$由这些根生成：$F$是$x^q - x$在$\F_p$上的分裂域。而分裂域在同构意义下是唯一的。
:::

有$p^n$个元素的域记作$\F_{p^n}$或$\mathrm{GF}(p^n)$（“伽罗瓦域”）。可以证明，$\F_{p^m}$（在同构意义下）是$\F_{p^n}$的子域，当且仅当$m \mid n$（[[#exr-9-10]]）。

## 伽罗瓦群

域扩张的对称就是它的固定基域的自同构。

::: definition 伽罗瓦群 {#def-galois-group}
设$K/F$是扩张。$K$的**$F$-自同构**是指满足对所有$a \in F$有$\sigma(a) = a$的域自同构$\sigma\colon K \to K$。它们在复合运算下构成一个群$\Aut(K/F)$。若有限扩张$K/F$满足$\abs{\Aut(K/F)} = [K : F]$，则称它是**伽罗瓦扩张**；这时它的自同构群称为**伽罗瓦群**$\operatorname{Gal}(K/F)$。
:::

基本的观察是：若$\sigma \in \Aut(K/F)$，$f \in F[x]$，则$\sigma(f(\alpha)) = f(\sigma(\alpha))$，因为$\sigma$保持和与积，并且固定系数。所以**$\sigma$把$f$的根映为$f$的根**。若$K = F(\alpha_1, \dots, \alpha_n)$由$f$的根生成，则一个自同构由它如何置换这些根所决定，从而$\Aut(K/F)$同构于$S_n$的一个子群。

::: proposition 至多[K:F]个自同构 {#prop-aut-bound}
若$K = F(\alpha)$，其中$\alpha$是$n$次代数元，则$\abs{\Aut(K/F)}$等于$m_\alpha$在$K$中互不相同的根的个数；特别地，$\abs{\Aut(K/F)} \le [K:F]$。
:::

::: proof
$F$-自同构$\sigma$由$\sigma(\alpha)$决定，因为$K$的每个元素都是$\alpha$的系数属于$F$的多项式；并且$\sigma(\alpha)$必须是$m_\alpha$在$K$中的根。反过来，对$m_\alpha$的每个根$\beta \in K$，[[#thm-simple-extension]]中的同构$F(\alpha) \cong F[x]/(m_\alpha) \cong F(\beta)$给出一个满足$\alpha \mapsto \beta$的$F$-同态$K \to K$；它是单射，而有限维空间$K$到自身的单射线性映射必是满射。所以自同构与$m_\alpha$在$K$中的根一一对应，而这样的根至多有$n = [K : F]$个。
:::

（事实上，对每个有限扩张都有$\abs{\Aut(K/F)} \le [K:F]$；而对于$\C$的子域，每个有限扩张都是单扩张——这就是本原元定理。）在特征$0$的情形以及对于有限域，有限扩张是伽罗瓦扩张，**当且仅当它是$F$上某个多项式的分裂域**（斯图尔特（Stewart）《伽罗瓦理论》（*Galois Theory*）第11—12章）。

::: example 四个伽罗瓦群 {#ex-galois-groups}
计算：(a) $\operatorname{Gal}(\C/\R)$；(b) $\operatorname{Gal}(\Q(\sqrt2, \sqrt 3)/\Q)$；(c) $x^3 - 2$在$\Q$上的伽罗瓦群；(d) $\Aut(\Q(\sqrt[3]2)/\Q)$。
::: solution
(a) $\C = \R(i)$，而$m_i = x^2 + 1$在$\C$中有两个根$\pm i$，所以有两个自同构，即恒等映射和复共轭：$\operatorname{Gal}(\C/\R) \cong \Z_2$。

(b) 自同构把$\sqrt 2 \mapsto \pm\sqrt 2$，$\sqrt 3 \mapsto \pm\sqrt3$（它们分别是$x^2 - 2$和$x^2 - 3$的根），并由这些选择决定，所以至多有$4$个。这个域是$(x^2-2)(x^2-3)$的分裂域，所以它是$4$次伽罗瓦扩张，四种选择都会出现。每个自同构的阶至多为$2$，所以这个群是$V_4 = \set{\id, \sigma, \tau, \sigma\tau}$，其中$\sigma$把$\sqrt 2$变号而固定$\sqrt3$，$\tau$固定$\sqrt 2$而把$\sqrt 3$变号。

(c) 分裂域$K = \Q(\sqrt[3]2, \omega)$的次数为$6$（[[#ex-x3-2]]），并且是伽罗瓦扩张，所以$\abs{\operatorname{Gal}(K/\Q)} = 6$。每个自同构都置换三个根$\alpha_1, \alpha_2, \alpha_3$，并由这个置换决定，所以$\operatorname{Gal}(K/\Q)$是$S_3$的一个$6$阶子群：它就是整个$S_3$。

(d) $\Q(\sqrt[3]2)$的自同构把$\sqrt[3]2$映为$x^3 - 2$**在这个域中**的根；这个域是实的，所以这样的根只有$\sqrt[3]2$本身。因此$\Aut(\Q(\sqrt[3]2)/\Q)$是平凡群，尽管扩张次数为$3$：这个扩张**不是**伽罗瓦扩张。它不是分裂域——它包含$x^3 - 2$的一个根，却不包含其余的根。
:::
:::

另外还有两类重要的例子。对有限域，$\operatorname{Gal}(\F_{p^n}/\F_p)$是**由弗罗贝尼乌斯映射$\phi(a) = a^p$生成的$n$阶循环群**：事实上$\phi^k(a) = a^{p^k}$，而$\phi^k = \id$意味着每个元素都是$x^{p^k} - x$的根，这要求$p^k \ge p^n$；所以$\phi$的阶为$n = [\F_{p^n} : \F_p]$。对单位根，$\operatorname{Gal}(\Q(\zeta_n)/\Q) \cong U(n)$，其中每个$k \in U(n)$对应把$\zeta_n \mapsto \zeta_n^k$的自同构$\sigma_k$（这要用到分圆多项式$\Phi_n$的不可约性；$n$为素数的情形已在[[abstract-algebra/polynomials#ex-eisenstein]]中证明）。

::: quiz
设$K$是$(x^2 - 2)(x^2 - 5)$的分裂域，$\abs{\operatorname{Gal}(K/\Q)}$等于多少？
- [ ] $2$
- [x] $4$
- [ ] $6$
- [ ] $24$
::: solution
$K = \Q(\sqrt 2, \sqrt 5)$。与[[#ex-q-sqrt2-sqrt3]]一样，$\sqrt 5 \notin \Q(\sqrt 2)$，所以$[K:\Q] = 4$。分裂域是伽罗瓦扩张，所以这个群的阶为$4$；它是$V_4$，由$\sqrt2$的变号和$\sqrt5$的变号生成。
:::
:::

## 伽罗瓦理论基本定理

对$\operatorname{Gal}(K/F)$的子群$H$，它的**固定域**是$K^H = \set{a \in K : \sigma(a) = a \text{ 对所有 } \sigma \in H}$；它是介于$F$与$K$之间的域。反过来，每个中间域$E$决定了由逐点固定$E$的自同构组成的子群$\operatorname{Gal}(K/E)$。

::: theorem 伽罗瓦理论基本定理 {#thm-ftgt}
设$K/F$是有限伽罗瓦扩张（例如特征为$0$的域上某个多项式的分裂域），$G = \operatorname{Gal}(K/F)$。则

$$
H \longmapsto K^H, \qquad E \longmapsto \operatorname{Gal}(K/E)
$$

是子群$H \le G$与中间域$F \subseteq E \subseteq K$之间互逆的、反转包含关系的双射。此外：

1. $[K : K^H] = \abs H$，$[K^H : F] = [G : H]$；
2. 对每个中间域$E$，扩张$K/E$是伽罗瓦扩张；
3. $E/F$是伽罗瓦扩张当且仅当$\operatorname{Gal}(K/E)$是$G$的正规子群，并且此时$\operatorname{Gal}(E/F) \cong G/\operatorname{Gal}(K/E)$。
:::

::: proof
（证明概要。）需要补充的关键工具是**阿廷（Artin）引理**：若$H$是域$K$的一个有限自同构群，则$[K : K^H] \le \abs H$。（可以证明$K$中任意$\abs H + 1$个元素在$K^H$上线性相关，方法是在$K$上解一个线性方程组，再对$H$取平均。）

给定$H \le G$：显然$H \subseteq \Aut(K/K^H)$，所以利用关于自同构个数的一般上界和阿廷引理，得$\abs{H} \le \abs{\Aut(K/K^H)} \le [K : K^H] \le \abs H$。因此各处等号都成立：$\operatorname{Gal}(K/K^H) = H$且$[K : K^H] = \abs H$，进而由塔律，$[K^H : F] = [K:F]/[K:K^H] = \abs G/\abs H$。给定中间域$E$：若$K$是$f$在$F$上的分裂域，则它也是$f$在$E$上的分裂域，所以$K/E$是伽罗瓦扩张，$\abs{\operatorname{Gal}(K/E)} = [K : E]$，并且$E \subseteq K^{\operatorname{Gal}(K/E)}$，而$[K : K^{\operatorname{Gal}(K/E)}] = \abs{\operatorname{Gal}(K/E)} = [K : E]$，这迫使$K^{\operatorname{Gal}(K/E)} = E$。所以这两个映射互逆，而且显然都反转包含关系。

关于第3部分：$\sigma(E)$也是中间域，并且$\operatorname{Gal}(K/\sigma(E)) = \sigma\operatorname{Gal}(K/E)\sigma^{-1}$。所以$\operatorname{Gal}(K/E)$是正规子群，当且仅当对所有$\sigma \in G$有$\sigma(E) = E$；此时限制映射$\sigma \mapsto \sigma|_E$是一个同态$G \to \Aut(E/F)$，其核为$\operatorname{Gal}(K/E)$；结合第1部分进行计数可知，它是到一个$[E:F]$阶群上的满同态，所以由第一同构定理，$E/F$是伽罗瓦扩张，且$\operatorname{Gal}(E/F) \cong G/\operatorname{Gal}(K/E)$。完整的证明见斯图尔特《伽罗瓦理论》第12章，或Dummit & Foote的§14.2。
:::

::: example ℚ(√2, √3)的伽罗瓦对应 {#ex-correspondence-v4}
求出介于$\Q$与$K = \Q(\sqrt2, \sqrt3)$之间的所有域。
::: solution
由[[#ex-galois-groups]]，$G = \set{\id, \sigma, \tau, \sigma\tau} \cong V_4$，它的子群是$\set{\id}$、三个$2$阶子群以及$G$。$2$阶子群的固定域在$\Q$上的次数为$[G : H] = 2$：

- $\langle\sigma\rangle$固定$\sqrt 3$，所以$K^{\langle\sigma\rangle} = \Q(\sqrt 3)$；
- $\langle\tau\rangle$固定$\sqrt 2$，所以$K^{\langle\tau\rangle} = \Q(\sqrt 2)$；
- $\sigma\tau$把$\sqrt 2$和$\sqrt 3$都变号，所以它固定$\sqrt6 = \sqrt2\sqrt3$，从而$K^{\langle\sigma\tau\rangle} = \Q(\sqrt 6)$。

所以中间域恰好是$\Q$、$\Q(\sqrt2)$、$\Q(\sqrt3)$、$\Q(\sqrt6)$和$K$——不存在其他中间域，而如果没有这个定理，这一点是很难证明的。阿贝尔群$V_4$的所有子群都是正规的，相应地，每个二次域在$\Q$上都是伽罗瓦扩张。
:::
:::

::: example x³ − 2的伽罗瓦对应 {#ex-correspondence-s3}
求出介于$\Q$与$x^3 - 2$的分裂域$K = \Q(\sqrt[3]2, \omega)$之间的所有域，并判断其中哪些在$\Q$上是伽罗瓦扩张。
::: solution
$G \cong S_3$，它作用在根$\alpha_1 = \sqrt[3]2$，$\alpha_2 = \sqrt[3]2\,\omega$，$\alpha_3 = \sqrt[3]2\,\omega^2$上。它的子群是$\set{e}$、$\langle(2\ 3)\rangle$、$\langle(1\ 3)\rangle$、$\langle(1\ 2)\rangle$、$A_3$和$S_3$。

- $\langle (2\ 3)\rangle$固定$\alpha_1$，所以它的固定域包含$\Q(\alpha_1)$，而后者的次数为$3 = [S_3 : \langle(2\ 3)\rangle]$；因此$K^{\langle(2\ 3)\rangle} = \Q(\sqrt[3]2)$。同理，$\langle (1\ 3)\rangle$和$\langle(1\ 2)\rangle$的固定域分别为$\Q(\alpha_2)$和$\Q(\alpha_3)$。
- $3$-轮换$\sigma = (1\ 2\ 3)$把$\omega = \alpha_2/\alpha_1$映为$\alpha_3/\alpha_2 = \omega$，所以$A_3$固定$\omega$；由于$[S_3 : A_3] = 2 = [\Q(\omega) : \Q]$，$K^{A_3} = \Q(\omega) = \Q(\sqrt{-3})$。

所以恰有四个真中间域：三个共轭的三次域$\Q(\alpha_i)$和一个二次域$\Q(\omega)$。$S_3$的正规子群是$\set e$、$A_3$、$S_3$，所以在这四个真中间域中，只有$\Q(\omega)$在$\Q$上是伽罗瓦扩张——它是$x^2 + x + 1$的分裂域——并且$\operatorname{Gal}(\Q(\omega)/\Q) \cong S_3/A_3 \cong \Z_2$。三次域不是伽罗瓦扩张，这与[[#ex-galois-groups]](d)相符。
:::
:::

::: widget graph
nodes: K@0,3; Q(a1)@-2,1.85; Q(a2)@-0.7,1.85; Q(a3)@0.6,1.85; Q(w)@2,1.15; Q@0,0
edges: K-Q(a1):2; K-Q(a2):2; K-Q(a3):2; K-Q(w):3; Q(a1)-Q:3; Q(a2)-Q:3; Q(a3)-Q:3; Q(w)-Q:2
caption: 介于$\Q$与$K = \Q(\sqrt[3]2, \omega)$之间的域所成的格，图中$a_i = \alpha_i$，$w = \omega$。较大的域画在较高处，每条边上标出相应扩张的次数：三次域$\Q(\alpha_i)$下方的次数为$3$，上方的次数为$2$；二次域$\Q(\omega)$下方的次数为$2$，上方的次数为$3$。把这幅图上下颠倒，它就变成$S_3$的子群格，边上的数随之变为指数：$K \leftrightarrow \set{e}$，$\Q(\alpha_1) \leftrightarrow \langle(2\ 3)\rangle$，$\Q(\omega) \leftrightarrow A_3$，$\Q \leftrightarrow S_3$。（图下信息栏中的“各顶点的度”是图论概念，指与顶点相连的边数，不是扩张的次数。）
:::

::: warning 固定域反转包含关系
越大的子群，固定域越**小**：整个群只固定$F$，而平凡子群固定整个$K$。此外，固定域在$F$上的次数是**指数**$[G:H]$，而不是阶$\abs H$。在[[#ex-correspondence-s3]]中，$2$阶子群对应于在$\Q$上次数为$3$的域。
:::

## 根式可解性与五次方程

如果多项式$f \in \Q[x]$的根位于从$\Q$出发、依次添加$n$次方根所得的域中，则称$f$是**根式可解**的；这里的域由一个域塔$\Q = K_0 \subseteq K_1 \subseteq \dots \subseteq K_r$给出，其中$K_{i+1} = K_i(a_i)$且$a_i^{n_i} \in K_i$。二次、三次和四次方程的求根公式表明，每个次数不超过$4$的多项式都是根式可解的。

如果有限群$G$有一个子群链$\set{e} = G_0 \trianglelefteq G_1 \trianglelefteq \dots \trianglelefteq G_r = G$，其中每个子群都是下一个子群的正规子群，并且每个商群$G_{i+1}/G_i$都是阿贝尔群，则称$G$是**可解**的。阿贝尔群是可解的；$S_3$（借助$\set{e} \trianglelefteq A_3 \trianglelefteq S_3$）和$S_4$（借助$\set e \trianglelefteq V \trianglelefteq A_4 \trianglelefteq S_4$，各商群依次为$V_4$、$\Z_3$、$\Z_2$）也是可解的。但$S_5$不是：可解群的子群是可解的，而非阿贝尔单群$A_5 \le S_5$没有这样的链，因为它的正规子群只有$\set e$和$A_5$，而$A_5/\set{e}$不是阿贝尔群。

::: theorem 伽罗瓦判别准则 {#thm-galois-criterion}
多项式$f \in \Q[x]$根式可解，当且仅当它的分裂域在$\Q$上的伽罗瓦群是可解群。
:::

::: proof
（必要性的证明思路。）先添加适当的单位根之后，每一步$K_{i+1} = K_i(a_i)$（$a_i^{n_i} \in K_i$）都是伽罗瓦群为**阿贝尔群**（实际上是循环群）的伽罗瓦扩张。转到伽罗瓦闭包并应用基本定理，域塔就变成一个商群均为阿贝尔群的正规子群链；由于可解群的商群是可解的，$f$的伽罗瓦群是可解的。逆命题则是反过来使用同一套对应关系。见斯图尔特《伽罗瓦理论》第14—15章。
:::

::: theorem 一个不可解的五次方程 {#thm-quintic}
多项式$f = x^5 - 6x + 3$在$\Q$上不是根式可解的。因此，一般的$5$次方程的根不存在用根式表示的公式。
:::

::: proof
设$K$是$f$的分裂域，$G = \operatorname{Gal}(K/\Q) \le S_5$，这里把$G$看作五个根的置换。

**$G$包含一个$5$-轮换。**对$3$应用艾森斯坦判别法可知$f$不可约。若$\alpha$是一个根，则由塔律，$[\Q(\alpha) : \Q] = 5$整除$[K : \Q] = \abs{G}$，所以由柯西（Cauchy）定理（[[abstract-algebra/group-actions#thm-cauchy]]），$G$有$5$阶元；而在$S_5$中，$5$阶元就是$5$-轮换。

**$G$包含一个对换。**$f'(x) = 5x^4 - 6$只在$\pm t$处为零，其中$t = (6/5)^{1/4} \approx 1.047$。由于$f(t) = t(t^4 - 6) + 3 = 3 - 4.8\,t < 0$，$f(-t) = 3 + 4.8\,t > 0$，而当$x \to \pm\infty$时$f \to \pm\infty$，所以$f$恰有三个实根（由罗尔定理，因为$f'$有两个实零点，所以至多有三个；由介值定理，至少有三个）。另外两个根是互为共轭的非实复数。复共轭把$K$映到自身（它置换这些根），固定三个实根而交换另外两个：它是$G$中的一个对换。

**所以$G = S_5$。**在$S_p$（$p$为素数）中，一个$p$-轮换和一个对换生成$S_p$：给根重新编号，使这个对换为$(1\ 2)$，而$5$-轮换的某个幂把$1$映为$2$，所以（对其余的根重新编号后）$G$包含$(1\ 2\ 3\ 4\ 5)$；由[[abstract-algebra/permutation-groups#exr-3-8]]，这两个置换生成$S_5$。由于$S_5$不可解，由[[#thm-galois-criterion]]，$f$不是根式可解的。特别地，一个一般的五次方程求根公式会把这个$f$的根用根式表示出来。
:::

::: widget plot
f: x^5 - 6x + 3
x: -2.2, 2.2
y: -12, 12
caption: $x^5 - 6x + 3$的图像恰好与横轴相交三次（在$-1.671$、$0.506$和$1.402$附近）；其余两个根是一对共轭复数。因此复共轭在这些根上的作用是一个对换，它与一个$5$-轮换一起生成整个$S_5$——这就是这个五次方程没有根式解的原因。
:::

::: application 纠错码与密码学
有限域是数字世界的算术。里德-所罗门（Reed–Solomon）码用于CD、DVD、QR码以及深空通信，它把数据块看作$\F_{2^8}$上的多项式，并通过多项式运算来纠正错误。AES分组密码的字节代换是通过在$\F_{256} = \F_2[x]/(x^8 + x^4 + x^3 + x + 1)$中求逆来实现的，而椭圆曲线密码学则在大的有限域上进行（[[number-theory/cryptography]]）。
:::

::: history
一般五次方程不能用根式求解，这一结论由保罗·鲁菲尼（Paolo Ruffini）于1799年在一个有漏洞的冗长证明中提出，并由尼尔斯·亨里克·阿贝尔（Niels Henrik Abel）于1824年完整地证明。埃瓦里斯特·伽罗瓦（Évariste Galois）大约在1830年从事这方面的研究，1832年死于决斗，年仅二十岁；他用我们今天所说的伽罗瓦群给出了判别准则，他的论文由约瑟夫·刘维尔（Joseph Liouville）于1846年发表。伽罗瓦还引入了以他的名字命名的有限域。1837年，皮埃尔·旺策尔（Pierre Wantzel）发表了倍立方和三等分角不可能性的证明；费迪南德·冯·林德曼（Ferdinand von Lindemann）对$\pi$是超越数的证明（1882年）解决了化圆为方问题。本章所用的借助域扩张、次数和固定域的现代表述，在很大程度上归功于理查德·戴德金（Richard Dedekind），尤其是埃米尔·阿廷（Emil Artin），他的讲义（1942年出版）塑造了今天讲授伽罗瓦理论的方式。
:::

## 后续内容

伽罗瓦理论通向现代数学的许多领域。代数数论研究$\Q$的有限扩张及其整数环，在那里，[[abstract-algebra/rings]]中遇到的唯一因子分解的失效由理想来弥补；分圆域的伽罗瓦群引出了推广[[number-theory/quadratic-reciprocity]]的各种互反律。有限域是编码理论和[[number-theory/cryptography]]中密码学的基础。而子群与中间对象之间存在对应这一思想，在拓扑学中再次出现：覆叠空间对应于基本群的子群（[[topology/fundamental-group]]）。

::: summary
- 扩张$K/F$是$F$上的向量空间；它的**次数**是$[K:F] = \dim_F K$，并且在域塔中次数相乘：$[L:F] = [L:K][K:F]$（[[#thm-tower-law]]）。
- 代数元$\alpha$有不可约的极小多项式$m_\alpha$；$F(\alpha) \cong F[x]/(m_\alpha)$，基为$1, \alpha, \dots, \alpha^{n-1}$，所以$[F(\alpha):F] = \deg m_\alpha$。
- 可构造数的次数是$2$的幂；由于$\sqrt[3]2$和$\cos 20^\circ$的次数为$3$，立方体不能加倍，$60^\circ$角也不能三等分。
- 分裂域存在且唯一；每个素数幂阶的域恰有一个，即$\F_{p^n}$，并且它的乘法群是循环群。
- $\operatorname{Gal}(K/F)$置换$F$上多项式的根；当$\abs{\operatorname{Gal}} = [K:F]$时$K/F$是伽罗瓦扩张，例如特征$0$中的分裂域。例子：$\Q(\sqrt2,\sqrt3)$对应$V_4$，$x^3 - 2$对应$S_3$，有限域对应循环群。
- **基本定理**：子群$H$ ↔ 中间域$K^H$，反转包含关系，且$[K^H:F] = [G:H]$；正规子群 ↔ 伽罗瓦子扩张。
- $f$根式可解当且仅当它的伽罗瓦群可解；$x^5 - 6x + 3$的伽罗瓦群是$S_5$，它不可解，所以五次方程没有一般的求根公式。
:::

## 习题

::: exercise 用塔律求次数 {level=1 check="6"}
求$[\Q(\sqrt 5, \sqrt[3]2) : \Q]$。
::: solution
$[\Q(\sqrt5) : \Q] = 2$，$[\Q(\sqrt[3]2):\Q] = 3$，由塔律，二者都整除$n = [\Q(\sqrt5, \sqrt[3]2):\Q]$，所以$6 \mid n$。另一方面，$[\Q(\sqrt5,\sqrt[3]2) : \Q(\sqrt[3]2)] \le 2$（因为$\sqrt5$是$x^2 - 5$的根），所以$n \le 6$。因此$n = 6$。
:::
:::

::: exercise 分圆域的次数 {level=1 check="4"}
设$\zeta_5 = e^{2\pi i/5}$，$[\Q(\zeta_5) : \Q]$是多少？
::: solution
$\zeta_5$的极小多项式是不可约的分圆多项式$\Phi_5 = x^4 + x^3 + x^2 + x + 1$（[[abstract-algebra/polynomials#ex-eisenstein]]），所以次数为$4$。
:::
:::

::: exercise 𝔽₆₄的子域 {level=1 check="4"}
$\F_{64}$有多少个子域？（利用以下事实：$\F_{2^m}$是$\F_{2^n}$的子域当且仅当$m \mid n$，并且对每个这样的阶，$\F_{64}$恰有一个该阶的子域。）
::: solution
$64 = 2^6$，所以子域是满足$m \mid 6$的$\F_{2^m}$：$\F_2$、$\F_4$、$\F_8$和$\F_{64}$——共四个子域。（注意$\F_{16}$和$\F_{32}$**不是**$\F_{64}$的子域。）这也可以由伽罗瓦对应得出：$\operatorname{Gal}(\F_{64}/\F_2) \cong \Z_6$有四个子群。
:::
:::

::: exercise 一个极小多项式 {level=2}
求$\beta = i + \sqrt 2$在$\Q$上的极小多项式以及次数$[\Q(\beta) : \Q]$。
::: solution
$\beta - \sqrt2 = i$，所以$(\beta - \sqrt 2)^2 = -1$，即$\beta^2 + 3 = 2\sqrt2\,\beta$。两边平方得$(\beta^2 + 3)^2 = 8\beta^2$，即$\beta^4 - 2\beta^2 + 9 = 0$。与[[#ex-q-sqrt2-sqrt3]]一样，$\Q(\beta) = \Q(i, \sqrt 2)$（可以求出$\sqrt 2 = (\beta^2 + 3)/(2\beta)$，进而求出$i = \beta - \sqrt2$），并且由于$i \notin \Q(\sqrt 2) \subseteq \R$，$[\Q(i, \sqrt2) : \Q] = 4$。所以$\deg m_\beta = 4$，$m_\beta = x^4 - 2x^2 + 9$。
:::
:::

::: exercise 正九边形 {level=2}
证明正$9$边形不能用尺规作出。
::: hint
作出正九边形等价于作出$\cos 40^\circ$。利用$\cos 3\theta = 4\cos^3\theta - 3\cos\theta$。
:::
::: solution
取$\theta = 40^\circ$，则$\cos 3\theta = \cos 120^\circ = -\frac12$，所以$c = \cos 40^\circ$满足$4c^3 - 3c + \frac12 = 0$，而$y = 2c$满足$y^3 - 3y + 1 = 0$。由有理根定理，可能的有理根只有$\pm1$，代入分别得到$-1$和$3$；所以这个三次多项式不可约，$[\Q(c) : \Q] = 3$，不是$2$的幂。由[[#thm-constructible]]，$\cos 40^\circ$不是可构造的，所以正$9$边形也不能作出。
:::
:::

::: exercise 域ℚ(i, √2) {level=2}
确定$\operatorname{Gal}(\Q(i, \sqrt2)/\Q)$以及所有中间域。
::: solution
$K = \Q(i, \sqrt 2)$是$(x^2+1)(x^2-2)$的分裂域，次数为$4$（同[[#exr-9-4]]）。它的自同构由$i \mapsto \pm i$和$\sqrt2 \mapsto \pm\sqrt2$决定，共有四个自同构，每个的阶至多为$2$：$G \cong V_4$。设$\sigma$固定$\sqrt 2$而把$i$变号（即复共轭），$\tau$固定$i$而把$\sqrt2$变号。则$K^{\langle\sigma\rangle} = \Q(\sqrt 2)$，$K^{\langle\tau\rangle} = \Q(i)$，而$\sigma\tau$固定$i\sqrt 2 = \sqrt{-2}$，所以$K^{\langle\sigma\tau\rangle} = \Q(\sqrt{-2})$。中间域为$\Q$、$\Q(i)$、$\Q(\sqrt 2)$、$\Q(\sqrt{-2})$和$K$。
:::
:::

::: exercise 素数次扩张 {level=2}
设$[K : F] = p$是素数。证明对每个$\alpha \in K \setminus F$都有$K = F(\alpha)$。
::: solution
对$\alpha \in K \setminus F$，有$F \subsetneq F(\alpha) \subseteq K$。由塔律，$[F(\alpha) : F]$整除$p$；又因为$\alpha \notin F$，它不等于$1$。所以$[F(\alpha) : F] = p = [K:F]$，从而$[K : F(\alpha)] = 1$，即$K = F(\alpha)$。
:::
:::

::: exercise 乘法群的有限子群 {level=3}
设$F$是任意域，$G$是$F^\times$的有限子群。证明$G$是循环群。由此推出任何域中的$n$次单位根构成循环群。
::: solution
把[[#thm-cyclic-mult]]的证明中的$F^\times$换成$G$，重复那个证明即可。令$N = \abs G$，设$\psi(d)$为$G$中$d$阶元的个数；由拉格朗日定理，$\sum_{d\mid N}\psi(d) = N$。若$a \in G$的阶为$d$，则它的$d$个幂是$x^d - 1$的互不相同的根，而$x^d - 1$在$F$中至多有$d$个根，所以所有$d$阶元都属于$\langle a\rangle$，从而$\psi(d) = \varphi(d)$；否则$\psi(d) = 0$。于是$N = \sum\psi(d) \le \sum\varphi(d) = N$迫使$\psi(N) = \varphi(N) \ge 1$，所以$G$是循环群。$F$中的$n$次单位根构成$F^\times$的一个有限子群（对乘积和逆封闭，并且至多有$n$个元素），因而是循环群。
:::
:::

::: exercise 另一个不可解的五次方程 {level=3}
证明$x^5 - 4x + 2$在$\Q$上不是根式可解的。
::: solution
仿照[[#thm-quintic]]的证明。对$2$应用艾森斯坦判别法（$2 \nmid 1$；$2 \mid -4, 2$；$4 \nmid 2$）可知这个多项式不可约，所以它的伽罗瓦群$G \le S_5$的阶能被$5$整除，从而包含一个$5$-轮换。导数$5x^4 - 4$在$\pm t$处为零，其中$t = (4/5)^{1/4} \approx 0.946$，并且$f(t) = t(t^4 - 4) + 2 = 2 - 3.2t < 0$，$f(-t) = 2 + 3.2t > 0$；再结合在$\pm\infty$处$f \to \pm\infty$，可知它恰有三个实根（在$-1.519$、$0.508$、$1.244$附近）。于是复共轭是$G$中的一个对换，所以$G = S_5$，而$S_5$不可解；由伽罗瓦判别准则，这个多项式不是根式可解的。
:::
:::

::: exercise 有限域的子域 {level=3}
证明$\F_{p^n}$包含一个有$p^m$个元素的子域，当且仅当$m \mid n$。
::: hint
“仅当”部分用塔律；“当”部分则证明：当$m \mid n$时，$x^{p^m} - x$整除$x^{p^n} - x$。
:::
::: solution
若$E \subseteq \F_{p^n}$有$p^m$个元素，则$\F_p \subseteq E \subseteq \F_{p^n}$，由塔律得$n = [\F_{p^n}:\F_p] = [\F_{p^n} : E]\cdot m$，所以$m \mid n$。反过来，设$n = mk$。则$p^m - 1$整除$p^n - 1 = (p^m)^k - 1$，而当$d \mid e$时多项式$x^d - 1$整除$x^e - 1$；所以$x^{p^m - 1} - 1$整除$x^{p^n - 1} - 1$，两边乘以$x$，得$x^{p^m} - x$整除$x^{p^n} - x$。后者在$\F_{p^n}$上分解为互不相同的一次因式之积（[[#thm-finite-fields]]），所以$x^{p^m} - x$在$\F_{p^n}$中恰有$p^m$个根。这些根组成的集合$E$对减法、乘法和求逆封闭（由[[#thm-finite-fields]]的证明中关于弗罗贝尼乌斯映射的论证），所以它是一个有$p^m$个元素的子域。
:::
:::
