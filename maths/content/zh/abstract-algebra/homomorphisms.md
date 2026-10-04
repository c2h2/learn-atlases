置换的符号、矩阵的行列式、整数除以$12$的余数，这三者有一个共同之处。它们都是取一个群中的元素，产生另一个（通常小得多的）群中的元素，并且都与运算相容：乘积的符号等于符号的乘积，乘积的行列式等于行列式的乘积，和的余数等于余数的和（模$12$）。这样的映射称为**同态**。与同构不同，同态可能丢失信息——许多置换的符号都是$+1$——而丢失的信息由一个子群来度量，这个子群就是**核**。

把观点反过来，就得到代数学的核心构造之一。时钟算术就是从整数出发、规定$12$的倍数为零所得到的结果。同样，从任意群$G$和一个合适的子群$N$出发，通过“规定$N$中的元素都是平凡的”，可以构造出一个新的群$G/N$。使这一构造行得通的子群就是**正规**子群，而**第一同构定理**（又称同态基本定理）把这一切联系在一起：同态的像恰好就是$G$关于其核的商群。

## 同态

::: definition 同态 {#def-homomorphism}
从群$G$到群$H$的**同态**是一个映射$\varphi\colon G \to H$，满足

$$
\varphi(ab) = \varphi(a)\varphi(b) \qquad\text{对所有 } a, b \in G .
$$

**同构**（[[abstract-algebra/groups#def-isomorphism]]）就是双射的同态。从$G$到自身的同构称为**自同构**；$G$的全体自同构在映射的复合下构成一个群$\Aut(G)$。
:::

这个定义看起来与同构的定义一样，但去掉双射的要求后，就容许了种类繁多的映射。下面是需要记住的例子；在每个例子中，同态性质都是一个熟悉的恒等式。

1. **行列式**：$\det\colon \mathrm{GL}_n(\R) \to \R^\times$，因为$\det(AB) = \det A\det B$。
2. **符号**：$\sgn\colon S_n \to \set{1, -1}$，由[[abstract-algebra/permutation-groups#thm-sign]]。
3. **指数映射**：$\exp\colon (\C, +) \to \C^\times$，$z \mapsto e^z$，因为$e^{z+w} = e^ze^w$。
4. **模$n$约化**：$\Z \to \Z_n$，$k \mapsto k \bmod n$，因为$j + k$的余数等于两个余数之和再模$n$约化。
5. **阿贝尔群中的幂**：若$G$是阿贝尔群，则$x \mapsto x^n$是同态$G \to G$，因为$(xy)^n = x^ny^n$。例如$\C^\times$上的$z \mapsto z^n$。
6. **共轭**：对固定的$g \in G$，$c_g(x) = gxg^{-1}$是$G$的自同构，因为$gxyg^{-1} = (gxg^{-1})(gyg^{-1})$，其逆为$c_{g^{-1}}$。这种形式的自同构称为**内**自同构。
7. **投影**$G \times H \to G$，$(g, h) \mapsto g$，以及**平凡同态**$x \mapsto e_H$。

::: proposition 基本性质 {#prop-hom-props}
设$\varphi\colon G \to H$是同态，$a \in G$。则：

1. $\varphi(e_G) = e_H$，$\varphi(a^{-1}) = \varphi(a)^{-1}$，并且对所有$n \in \Z$有$\varphi(a^n) = \varphi(a)^n$；
2. 若$a$的阶有限，则$\ord(\varphi(a))$整除$\ord(a)$；
3. 若$K \le G$，则$\varphi(K) \le H$；若$L \le H$，则$\varphi^{-1}(L) = \set{g \in G: \varphi(g) \in L} \le G$；
4. 若$\psi\colon H \to M$是另一个同态，则$\psi\circ\varphi$是同态。
:::

::: proof
1. [[abstract-algebra/groups#prop-iso-props]]中对同构给出的证明只用到了同态性质：由$\varphi(e)\varphi(e) = \varphi(e)$，利用消去律得$\varphi(e) = e$；然后$\varphi(a)\varphi(a^{-1}) = \varphi(e) = e$；幂的情形用归纳法即得。

2. 若$\ord(a) = n$，则$\varphi(a)^n = \varphi(a^n) = \varphi(e) = e$，所以由[[abstract-algebra/subgroups#thm-order-divides]]，$\ord(\varphi(a)) \mid n$。

3. $\varphi(K)$含有$\varphi(e) = e$，并且对$x, y \in K$有$\varphi(x)\varphi(y)^{-1} = \varphi(xy^{-1}) \in \varphi(K)$，所以可以应用一步判别法。对于原像：$e \in \varphi^{-1}(L)$，并且若$\varphi(x), \varphi(y) \in L$，则$\varphi(xy^{-1}) = \varphi(x)\varphi(y)^{-1} \in L$。

4. $\psi(\varphi(ab)) = \psi(\varphi(a)\varphi(b)) = \psi(\varphi(a))\psi(\varphi(b))$。
:::

特别地，**像**$\Img\varphi = \varphi(G)$是$H$的子群。

::: definition 核 {#def-kernel}
同态$\varphi\colon G \to H$的**核**为

$$
\ker\varphi = \set{g \in G : \varphi(g) = e_H} .
$$
:::

核是$G$的子群：它是子群$\set{e_H}$的原像。上面各例的核分别为：$\ker\det = \mathrm{SL}_n(\R)$；$\ker\sgn = A_n$；$\ker\exp = 2\pi i\Z$（因为$e^z = 1$当且仅当$z \in 2\pi i \Z$）；$\ker(\Z \to \Z_n) = n\Z$；$\ker(z \mapsto z^n) = \mu_n$，即全体$n$次单位根；以及$\ker c_g = \set{e}$。

::: theorem 核与纤维 {#thm-kernel-fibres}
设$\varphi\colon G \to H$是同态，其核为$K$。对$a, b \in G$，

$$
\varphi(a) = \varphi(b) \iff a^{-1}b \in K \iff aK = bK .
$$

所以映到$\varphi(a)$的元素之集恰好是陪集$aK$，并且$\varphi$是单射当且仅当$K = \set{e}$。
:::

::: proof
$\varphi(a) = \varphi(b) \iff \varphi(a)^{-1}\varphi(b) = e \iff \varphi(a^{-1}b) = e \iff a^{-1}b \in K$，而由[[abstract-algebra/lagrange#lem-cosets]]，$a^{-1}b \in K \iff aK = bK$。若$K = \set{e}$，则由$\varphi(a) = \varphi(b)$可推出$a^{-1}b = e$，所以$a = b$。反之，若$\varphi$是单射，则只有$e$映到$e_H$。
:::

所以同态把其核的每个陪集压缩成一个点，而决不会把两个不同的陪集合并在一起。这是后面一切内容的关键。

::: widget mapping
domain: 0; 1; 2; 3; 4; 5
codomain: 0; 1; 2
map: 0>0; 1>1; 2>2; 3>0; 4>1; 5>2
editable: false
caption: 用箭头图表示的同态$\Z_6 \to \Z_3$，$k \mapsto k \bmod 3$。核为$\set{0, 3}$，映到$\Z_3$中每一点的元素构成核的一个陪集：$\set{0,3}$、$\set{1, 4}$、$\set{2, 5}$。每个纤维的大小都相同，都等于$\abs{\ker\varphi} = 2$，并且$6 = 2 \times 3$。
:::

::: example 从 Z₁₂ 到 Z₃₀ 的同态 {#ex-homs-z12-z30}
求所有同态$\varphi\colon \Z_{12} \to \Z_{30}$，以及它们的像和核。
::: solution
由于$\Z_{12} = \langle 1\rangle$，同态由$x = \varphi(1)$决定：此时$\varphi(k) = kx \bmod 30$。并非每个$x$都可以。元素$1$的阶为$12$，所以由[[#prop-hom-props]]，$x$的阶必须整除$12$，即$12x \equiv 0 \pmod{30}$。反之，若$30 \mid 12x$，则$\varphi(k) = kx \bmod 30$是良定义的（把$k$换成$k + 12$，$kx$就改变$12x$，这是$30$的倍数），而且显然是同态。而$30 \mid 12x \iff 5 \mid 2x \iff 5 \mid x$，所以

$$
x \in \set{0, 5, 10, 15, 20, 25}:
$$

共六个同态。对$x = 10$，像为$\langle 10\rangle = \set{0, 10, 20}$，阶为$3$；核为$\set{k : 10k \equiv 0 \pmod{30}} = \set{0, 3, 6, 9}$，阶为$4$。对$x = 5$，像$\langle 5\rangle$的阶为$6$，核$\set{0, 6}$的阶为$2$；对$x = 15$，像的阶为$2$，核的阶为$6$。在每种情形下都有$\abs{\ker\varphi}\cdot\abs{\Img\varphi} = 12$，下面的第一同构定理将解释这一事实。
:::
:::

::: quiz
下列哪些映射是同态？（选出所有正确选项。）
- [x] $\Z \to \Z$, $x \mapsto 3x$
- [ ] $\Z \to \Z$, $x \mapsto x + 1$
- [x] $\R^\times \to \R^\times$, $x \mapsto x^2$
- [ ] $\mathrm{GL}_2(\R) \to \mathrm{GL}_2(\R)$, $A \mapsto A^2$
::: solution
$3(x + y) = 3x + 3y$；又因为$\R^\times$是阿贝尔群，所以$(xy)^2 = x^2y^2$。映射$x \mapsto x + 1$不是同态，因为同态必须把$0$映到$0$。对矩阵而言，$(AB)^2 = ABAB$，只要$AB \neq BA$，它就与$A^2B^2$不同，所以平方运算不是非阿贝尔群$\mathrm{GL}_2(\R)$上的同态。
:::
:::

## 正规子群

核具有一般子群所没有的性质。若$\varphi(n) = e$，则对每个$g \in G$，

$$
\varphi(gng^{-1}) = \varphi(g)\,e\,\varphi(g)^{-1} = e,
$$

所以核对于用$G$中任意元素作共轭是封闭的。

::: definition 正规子群 {#def-normal}
若对所有$g \in G$和$n \in N$都有$gng^{-1} \in N$，则称$G$的子群$N$是**正规**子群，记作$N \trianglelefteq G$。等价地说，对所有$g \in G$有$gNg^{-1} \subseteq N$，其中$gNg^{-1} = \set{gng^{-1} : n \in N}$。
:::

::: theorem 正规性的刻画 {#thm-normal-test}
对子群$N \le G$，下列条件等价：

1. 对所有$g \in G$，$gNg^{-1} \subseteq N$；
2. 对所有$g \in G$，$gNg^{-1} = N$；
3. 对所有$g \in G$，$gN = Ng$（每个左陪集都是右陪集）。
:::

::: proof
(1) ⇒ (2)：给定$g$，对$g^{-1}$应用(1)：$g^{-1}Ng \subseteq N$。于是每个$n \in N$都可以写成$n = g(g^{-1}ng)g^{-1}$，其中$g^{-1}ng \in N$，这说明$N \subseteq gNg^{-1}$。结合(1)，得$gNg^{-1} = N$。

(2) ⇒ (3)：用$g$右乘$gNg^{-1} = N$，得$gN = Ng$。（用$g$右乘一个集合的每个元素是一个双射，所以这样做是合理的。）

(3) ⇒ (1)：对$n \in N$，$gn \in gN = Ng$，所以对某个$n' \in N$有$gn = n'g$，从而$gng^{-1} = n' \in N$。
:::

::: theorem 核是正规子群 {#thm-kernel-normal}
每个同态$\varphi\colon G \to H$的核都是$G$的正规子群。
:::

::: proof
核是子群，而[[#def-normal]]之前的计算表明，对$n \in \ker\varphi$，$g \in G$有$gng^{-1} \in \ker\varphi$。
:::

正规子群很常见：

- **阿贝尔**群的每个子群都是正规子群，因为$gng^{-1} = n$。
- 每个**指数为$2$**的子群都是正规子群：它的左陪集和右陪集都是“$N$和其余部分”（[[abstract-algebra/lagrange#exr-4-8]]）。所以$A_n \trianglelefteq S_n$，旋转子群$\langle r\rangle \trianglelefteq D_n$。
- **中心**$Z(G)$是正规子群，中心的每个子群也是，因为中心的元素与所有元素可交换。例如$\langle r^2 \rangle = Z(D_4)$在$D_4$中正规。
- 核：$\mathrm{SL}_n(\R) \trianglelefteq \mathrm{GL}_n(\R)$，$n\Z \trianglelefteq \Z$，$\mu_n \trianglelefteq \C^\times$。
- 在$S_4$中，子群$V = \set{e, (1\ 2)(3\ 4), (1\ 3)(2\ 4), (1\ 4)(2\ 3)}$是正规子群，因为共轭保持轮换型（[[abstract-algebra/permutation-groups#prop-conjugation]]），而$V$由单位元和**全部**双对换组成。

::: example 检验正规性 {#ex-normality}
(a) 证明$H = \set{e, (1\ 2)}$在$S_3$中不正规。(b) 证明$\set{e, s}$在$D_4$中不正规。(c) 设$K = \set{e, (1\ 2)(3\ 4)}$。证明$K \trianglelefteq V$且$V \trianglelefteq A_4$，但$K$在$A_4$中不正规。
::: solution
(a) 用$(1\ 3)$作共轭，并利用[[abstract-algebra/permutation-groups#prop-conjugation]]：$(1\ 3)(1\ 2)(1\ 3)^{-1} = (3\ 2) \notin H$。（这与[[abstract-algebra/lagrange#ex-s3-cosets]]一致，那里$(1\ 3)H \neq H(1\ 3)$。）

(b) $rsr^{-1} = r(sr^{-1}) = r(rs) = r^2s \notin \set{e, s}$，这里用到了[[abstract-algebra/permutation-groups#eq-dihedral-relations]]中的$sr^{-1} = rs$。

(c) $V \cong V_4$是阿贝尔群，所以$K \trianglelefteq V$；而$V \trianglelefteq A_4$，因为$V$甚至在$S_4$中都是正规的。但用$3$-轮换$(1\ 2\ 3) \in A_4$作共轭，得

$$
(1\ 2\ 3)\,(1\ 2)(3\ 4)\,(1\ 2\ 3)^{-1} = (2\ 3)(1\ 4) \notin K .
$$

所以**正规性不具有传递性**：由$K \trianglelefteq V \trianglelefteq A_4$推不出$K \trianglelefteq A_4$。
:::
:::

::: warning gN = Ng 并不意味着 gn = ng
正规性说的是**集合**$gN$等于**集合**$Ng$；它**并没有**说$g$与$N$的每个元素可交换。在$S_3$中，子群$A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$是正规的，然而$(1\ 2)(1\ 2\ 3) = (2\ 3)$，而$(1\ 2\ 3)(1\ 2) = (1\ 3)$。真正成立的是$(1\ 2)(1\ 2\ 3)(1\ 2)^{-1} = (1\ 3\ 2) \in A_3$：共轭把$N$的元素在$N$**内部**挪动。
:::

::: example 四元数群 {#ex-q8}
**四元数群**$Q_8 = \set{\pm1, \pm i, \pm j, \pm k}$的乘法就是哈密顿（Hamilton）四元数的乘法：$-1$属于中心，$(-1)^2 = 1$，并且

$$
i^2 = j^2 = k^2 = ijk = -1, \qquad ij = k = -ji,\quad jk = i = -kj,\quad ki = j = -ik .
$$

证明$Q_8$不是阿贝尔群，但$Q_8$的每个子群都是正规子群。
::: solution
由于$ij = k \ne -k = ji$，它不是阿贝尔群。它的元素$\pm i, \pm j, \pm k$的阶为$4$，$-1$的阶为$2$，所以它的子群为：$\set{1}$；$\set{\pm1}$；$\langle i\rangle = \set{\pm1, \pm i}$、$\langle j\rangle$、$\langle k\rangle$；以及$Q_8$（一个子群若含有$i, j, k$中的两个（不计符号），就含有它们的乘积，从而含有所有元素）。子群$\langle i\rangle, \langle j\rangle, \langle k\rangle$的指数为$2$，所以是正规的；$\set{\pm 1} = Z(Q_8)$包含于中心，所以是正规的；而$\set{1}$和$Q_8$总是正规的。所以尽管这个群不是阿贝尔群，它的全部六个子群都是正规的。
:::
:::

::: widget cayley
group: Q8
highlight: -1
mode: table
caption: $Q_8$的凯莱（Cayley）表，其中中心$\set{1, -1}$及其陪集$\set{\pm i}$、$\set{\pm j}$、$\set{\pm k}$分别着色。这个表不是对称的（$ij = k$，但$ji = -k$），然而由于$\set{\pm 1}$是正规的，每个乘积的颜色只取决于因子的颜色；四种颜色相乘的方式与克莱因（Klein）四元群一样，这预示了$Q_8/\set{\pm1} \cong V_4$。
:::

::: quiz
$S_3$的哪些子群是正规子群？（选出所有正确选项。）
- [x] $\set{e}$
- [ ] $\set{e, (1\ 2)}$
- [x] $A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$
- [x] $S_3$
::: solution
与在任何群中一样，$\set{e}$和$S_3$是正规的。$A_3$的指数为$2$（它也是$\sgn$的核）。子群$\set{e, (1\ 2)}$不是正规的：用$(1\ 3)$作共轭得到$(2\ 3)$。另外两个$2$阶子群的情形相同，所以$S_3$恰有三个正规子群。
:::
:::

## 商群

正规性的回报在于：正规子群的陪集本身可以相乘。

::: theorem 商群 {#thm-quotient-group}
设$N \trianglelefteq G$，$G/N$为$N$在$G$中的左陪集之集。则

$$
(aN)(bN) = (ab)N
$$

是良定义的运算，它使$G/N$成为一个群，称为$G$关于$N$的**商群**（或因子群）。它的单位元是$N = eN$，$aN$的逆元是$a^{-1}N$，并且$\abs{G/N} = [G : N]$。**自然映射**$\pi\colon G \to G/N$，$\pi(a) = aN$，是核为$N$的满同态。

反之，若$N \le G$且法则$(aN)(bN) = abN$是良定义的，则$N$是正规子群。
:::

::: proof
**良定义。**这个法则是用代表元来叙述的，所以必须验证结果与所用的代表元无关。设$aN = a'N$，$bN = b'N$，于是$a' = an_1$，$b' = bn_2$，其中$n_1, n_2 \in N$。则

$$
a'b' = an_1bn_2 = ab\,(b^{-1}n_1b)\,n_2 .
$$

由正规性，$b^{-1}n_1b \in N$，所以$a'b' \in abN$，从而$a'b'N = abN$。

**群公理。**结合律是继承来的：$(aN\,bN)\,cN = (ab)cN = a(bc)N = aN\,(bN\,cN)$。单位元是$eN$，因为$eN\,aN = aN = aN\,eN$；并且$a^{-1}N\,aN = eN = aN\,a^{-1}N$。元素的个数就是陪集的个数$[G:N]$。

**自然映射**按运算的定义本身就是同态：$\pi(ab) = abN = \pi(a)\pi(b)$；它是满射；并且$\pi(a) = N$当且仅当$a \in N$，所以$\ker\pi = N$。

**逆命题。**设该运算是良定义的，$g \in G$，$n \in N$。由于$nN = eN$，由良定义性得$(nN)(g^{-1}N) = (eN)(g^{-1}N)$，即$ng^{-1}N = g^{-1}N$。由[[abstract-algebra/lagrange#lem-cosets]]，$(g^{-1})^{-1}(ng^{-1}) = gng^{-1} \in N$。所以$N$是正规子群。
:::

把[[#thm-kernel-normal]]与这个定理结合起来：$G$的正规子群**恰好**就是以$G$为定义域的同态的核。

在加法记号下，商群仍写作$G/N$，运算为$(a + N) + (b + N) = (a + b) + N$。原型是$\Z/n\Z$，它的元素是剩余类$k + n\Z$，它的加法就是余数的加法。映射$k + n\Z \mapsto k \bmod n$是同构$\Z/n\Z \cong \Z_n$，在以后各章中，我们不加区别地使用这两种记号。

::: example 计算商群 {#ex-quotients}
确定下列商群：(a) $D_4/\langle r^2\rangle$；(b) $\Z_{12}/\langle 4\rangle$；(c) $Q_8/\set{\pm 1}$；(d) $S_n/A_n$。
::: solution
(a) $N = \langle r^2\rangle = \set{e, r^2}$包含于中心，因而是正规的，且$\abs{D_4/N} = 8/2 = 4$。陪集为$N$、$rN = \set{r, r^3}$、$sN = \set{s, r^2s}$和$rsN = \set{rs, r^3s}$。每个非单位陪集的平方都是单位陪集：$(rN)^2 = r^2N = N$，$(sN)^2 = s^2N = N$，$(rsN)^2 = (rs)^2N = N$。每个元素的平方都是单位元的$4$阶群是$V_4$（[[abstract-algebra/groups#ex-small-groups]]），所以$D_4/\langle r^2\rangle \cong V_4$。

(b) $N = \set{0, 4, 8}$，$\Z_{12}/N$有$4$个元素。陪集$1 + N$的阶为$4$：$2(1 + N) = 2 + N$和$3(1 + N) = 3 + N$都不等于$N$，而$4(1 + N) = 4 + N = N$。所以商群是循环群：$\Z_{12}/\langle 4\rangle \cong \Z_4$。

(c) $\set{\pm1} = Z(Q_8)$是正规的，商群的阶为$4$。陪集为$\set{\pm1}$、$\set{\pm i}$、$\set{\pm j}$、$\set{\pm k}$，并且$(\pm i)^2 = -1 \in \set{\pm 1}$，$j$和$k$的情形也一样。所以同样地，每个元素的平方都是单位元，$Q_8/\set{\pm1} \cong V_4$。

(d) $A_n$的指数为$2$，所以$S_n/A_n$的阶为$2$，同构于$\Z_2$：两个陪集就是“偶”和“奇”，它们像符号一样相乘。
:::
:::

::: widget cayley
group: D
n: 4
highlight: r^2
mode: table
caption: $D_4$的凯莱表，其中正规子群$N = \set{e, r^2}$及其陪集分别着色。由于$N$是正规的，乘积的颜色只取决于因子的颜色：着色后的表可以压缩成一个$4\times4$的表，它就是$D_4/N \cong V_4$的凯莱表。请与[[abstract-algebra/lagrange]]一章中的非正规子群$\set{e, s}$比较，那里不会发生这样的压缩。
:::

::: warning 商群不是子群
$G/N$是一个新的群，它的元素是**集合**（陪集），它不是$G$的子群。它甚至未必同构于$G$的任何子群：例如$Q_8/\set{\pm1} \cong V_4$，但$Q_8$只有一个$2$阶元，所以它不含$V_4$的副本。此外，只有当$N$是正规子群时$G/N$才有意义：对$S_3$中的$H = \set{e, (1\ 2)}$，陪集$(1\ 3)H$与$(1\ 3)H$的“乘积”将依赖于所选的代表元。
:::

## 第一同构定理

我们已经看到两种方式，可以得到定义在$G$上、以正规子群$N$为核的同态：一是给定的核为$N$的同态，二是自然映射$G \to G/N$。第一同构定理说，两者是一回事。

::: theorem 第一同构定理 {#thm-first-iso}
设$\varphi\colon G \to H$是同态，其核为$K$。则$K \trianglelefteq G$，并且

$$
G/K \cong \Img\varphi, \qquad aK \mapsto \varphi(a).
$$ {#eq-first-iso}
:::

::: proof
由[[#thm-kernel-normal]]，$K$是正规子群。定义$\bar\varphi\colon G/K \to \Img\varphi$为$\bar\varphi(aK) = \varphi(a)$。由[[#thm-kernel-fibres]]，

$$
aK = bK \iff \varphi(a) = \varphi(b):
$$

从左往右读，说明$\bar\varphi$是**良定义的**（相等的陪集给出相等的值）；从右往左读，说明它是**单射**。它是到$\Img\varphi$上的**满射**，因为每个$\varphi(a)$都等于$\bar\varphi(aK)$。最后，它是**同态**：$\bar\varphi(aK\,bK) = \bar\varphi(abK) = \varphi(ab) = \varphi(a)\varphi(b) = \bar\varphi(aK)\bar\varphi(bK)$。所以$\bar\varphi$是同构。
:::

这个定理常常被概括为：$\varphi$可以分解为$G \xrightarrow{\pi} G/K \xrightarrow{\bar\varphi} H$，即一个满射后接一个单射。对有限群，它给出一个计数法则：$\abs{G} = \abs{\ker\varphi}\cdot\abs{\Img\varphi}$，所以$\abs{\Img\varphi}$同时整除$\abs{G}$和$\abs{H}$。这解释了[[#ex-homs-z12-z30]]中的那些数。

::: example 第一同构定理的应用 {#ex-first-iso}
证明：(a) $\mathrm{GL}_n(\R)/\mathrm{SL}_n(\R) \cong \R^\times$；(b) $\R/\Z \cong \mathbb{T}$（圆周群$\set{z : \abs{z} = 1}$）；(c) $\C^\times/\mu_n \cong \C^\times$。
::: solution
在每种情形中，都找一个具有所需核的满同态。

(a) $\det\colon\mathrm{GL}_n(\R) \to \R^\times$的核为$\mathrm{SL}_n(\R)$，并且它是满射，因为$\det\diag(t, 1, \dots, 1) = t$。所以$\mathrm{GL}_n(\R)/\mathrm{SL}_n(\R) \cong \R^\times$：$\mathrm{SL}_n$的一个陪集就是“行列式取某个给定值的全体矩阵”。

(b) $\varphi(x) = e^{2\pi i x}$是同态$(\R, +) \to \mathbb{T}$，因为$e^{2\pi i(x+y)} = e^{2\pi ix}e^{2\pi i y}$。它是满射（圆周上的每个点都形如$e^{i\theta}$），并且$e^{2\pi i x} = 1$当且仅当$x \in \Z$。所以$\R/\Z \cong \mathbb{T}$：把实数轴缠绕到圆周上，就把相差一个整数的数等同起来了。

(c) $\varphi(z) = z^n$是同态$\C^\times \to \C^\times$（这个群是阿贝尔群），其核为$\mu_n$。它是满射，因为每个非零复数都有$n$次方根（[[complex-analysis/complex-numbers]]）。所以$\C^\times/\mu_n \cong \C^\times$——一个群的商群可以同构于这个群本身。
:::
:::

::: quiz
满同态$\varphi\colon G \to H$满足$\abs{G} = 24$，$\abs{H} = 6$。$\abs{\ker\varphi}$等于多少？
- [ ] $6$
- [x] $4$
- [ ] $18$
- [ ] 无法确定
::: solution
由第一同构定理，$G/\ker\varphi \cong H$，所以$\abs{G}/\abs{\ker\varphi} = \abs{H}$，从而$\abs{\ker\varphi} = 24/6 = 4$。
:::
:::

## 第二同构定理与第三同构定理

另外两个定理描述商群与子群之间的相互关系。两者的证明方法都是写出一个同态，然后应用第一同构定理。

::: theorem 第二同构定理 {#thm-second-iso}
设$H \le G$，$N \trianglelefteq G$。则$HN = \set{hn : h \in H, n \in N}$是$G$的子群，$N \trianglelefteq HN$，$H \cap N \trianglelefteq H$，并且

$$
H/(H \cap N) \cong HN/N .
$$
:::

::: proof
**$HN$是子群。**它含有$e$。对$h_1n_1, h_2n_2 \in HN$，

$$
(h_1n_1)(h_2n_2) = h_1h_2\,(h_2^{-1}n_1h_2)\,n_2 \in HN, \qquad (h_1n_1)^{-1} = n_1^{-1}h_1^{-1} = h_1^{-1}\,(h_1n_1^{-1}h_1^{-1}) \in HN,
$$

其中括号内的因子用到了$N$的正规性。$N$在$HN$中正规，因为它在整个$G$中正规。

**同构。**定义$\psi\colon H \to HN/N$为$\psi(h) = hN$。它是自然映射$G \to G/N$的限制，所以是同态。它是满射：$HN/N$的一般元素为$hnN = hN = \psi(h)$。它的核为$\set{h \in H : hN = N} = H \cap N$。由第一同构定理，$H \cap N$在$H$中正规，并且$H/(H\cap N) \cong HN/N$。
:::

::: example ℤ 中的第二同构定理 {#ex-second-iso-z}
对$\Z$中的$H = m\Z$和$N = n\Z$（$m, n \ge 1$）应用第二同构定理，并由此推出$\gcd(m, n)\cdot\lcm(m, n) = mn$。
::: solution
在加法记号下，$HN$就是$m\Z + n\Z = \set{mx + ny}$，由裴蜀（Bézout）等式（[[number-theory/divisibility#thm-bezout]]），它等于$d\Z$，其中$d = \gcd(m, n)$。而$m\Z \cap n\Z$是公倍数之集，即$l\Z$，其中$l = \lcm(m, n)$。定理给出

$$
m\Z/l\Z \cong d\Z/n\Z .
$$

计算元素个数：$m\Z/l\Z$由$l\Z$在$m\Z$中的陪集组成，共有$l/m$个（即$0, m, 2m, \dots, l - m$分别加上$l\Z$）；类似地，$\abs{d\Z/n\Z} = n/d$。所以$l/m = n/d$，即$dl = mn$。
:::
:::

::: theorem 第三同构定理 {#thm-third-iso}
设$N$和$K$是$G$的正规子群，且$N \subseteq K$。则$K/N \trianglelefteq G/N$，并且

$$
(G/N)/(K/N) \cong G/K .
$$
:::

::: proof
定义$\theta\colon G/N \to G/K$为$\theta(gN) = gK$。它是良定义的：若$gN = g'N$，则$g^{-1}g' \in N \subseteq K$，所以$gK = g'K$。它是同态：$\theta(gN\,hN) = ghK = gK\,hK$；并且它是满射。它的核为$\set{gN : gK = K} = \set{gN : g \in K} = K/N$。由第一同构定理即得两个结论。
:::

用文字来说就是：“分两步取商与一次取商的结果相同”。例如，$\Z/12\Z$模去$4\Z$的像得到$\Z/4\Z$，这与[[#ex-quotients]](b)一致。最后一个定理描述了商群的全部子群。

::: theorem 对应定理 {#thm-correspondence}
设$N \trianglelefteq G$，$\pi\colon G \to G/N$为自然映射。则$K \mapsto K/N = \pi(K)$是双射

$$
\set{\text{子群 } K \text{ 含于 } G \text{ 且满足 } N \subseteq K} \longleftrightarrow \set{\text{含于 } G/N \text{ 的子群}},
$$

其逆为$L \mapsto \pi^{-1}(L)$。它保持包含关系和指数（$[G:K] = [G/N : K/N]$），并且$K \trianglelefteq G$当且仅当$K/N \trianglelefteq G/N$。
:::

::: proof
由[[#prop-hom-props]]，两个映射都把子群映为子群，并且$\pi^{-1}(L)$包含$N = \pi^{-1}(\set{N})$。由于$\pi$是满射，对每个$L \le G/N$有$\pi(\pi^{-1}(L)) = L$。若$N \subseteq K \le G$，则$\pi^{-1}(\pi(K)) = KN$（即所在陪集与$K$相交的那些元素），而由于$N \subseteq K$，$KN = K$。所以这两个映射是互逆的双射。两者显然都保持包含关系。至于指数，$K/N$在$G/N$中的陪集就是各个集合$\pi(gK)$，而$gK \mapsto \pi(gK)$是陪集之间的双射（因为$gK = g'K \iff g^{-1}g' \in K \iff \pi(g)^{-1}\pi(g') \in K/N$）。至于正规性：若$K \trianglelefteq G$，则$\pi(g)\pi(k)\pi(g)^{-1} = \pi(gkg^{-1}) \in \pi(K)$；反之，若$K/N \trianglelefteq G/N$，则$K = \pi^{-1}(K/N)$是复合映射$G \to G/N \to (G/N)/(K/N)$的核，因而是正规的。
:::

例如，$\Z_{12} \cong \Z/12\Z$的子群对应于$\Z$中包含$12\Z$的子群，即满足$d \mid 12$的$d\Z$——这就重新得到了[[abstract-algebra/subgroups#ex-z12-lattice]]中求出的六个子群。

## 单群与阿贝尔化

如果群$G \neq \set{e}$的正规子群只有$\set{e}$和$G$本身，就称它是**单群**。单群不能拆分成一个正规子群和一个商群，所以它们是组装出所有有限群的“原子”——若尔当-赫尔德（Jordan–Hölder）定理使这一说法变得精确。由[[abstract-algebra/subgroups#exr-2-9]]以及阿贝尔群的所有子群都正规这一事实，阿贝尔单群恰好是素数阶循环群$\Z_p$。非阿贝尔单群要稀少得多：最小的是$60$阶群$A_5$，它的单性将在[[abstract-algebra/group-actions]]一章中证明。以单群为定义域的同态或者是单射，或者是平凡的，因为它的核是正规子群。

在另一个极端，我们可以度量一个群离阿贝尔群有多远。$a, b$的**换位子**是$[a, b] = aba^{-1}b^{-1}$，它等于$e$当且仅当$ab = ba$。**换位子群**$G'$是由所有换位子生成的子群。它是正规子群，因为$g[a,b]g^{-1} = [gag^{-1}, gbg^{-1}]$仍是换位子；并且对$N \trianglelefteq G$，

$$
G/N \text{ 是阿贝尔群} \iff abN = baN \text{ 对所有 } a, b \iff a^{-1}b^{-1}ab \in N \text{ 对所有 } a, b \iff G' \subseteq N .
$$

所以$G/G'$（称为**阿贝尔化**）是$G$的最大阿贝尔商群。对$S_3$，$S_3' = A_3$，其阿贝尔化为$\Z_2$（[[#exr-5-9]]对一般情形证明了$S_n' = A_n$）。

::: history
埃瓦里斯特·伽罗瓦（Évariste Galois）在他1831年的论文和1832年的信中，区分了把群分解为左陪集和分解为右陪集这两种分解，并注意到使两者重合的子群——用现代术语说就是正规子群——的特殊作用；他认识到，方程的可解性取决于能否找到由这样的子群构成的一个链。卡米耶·若尔当（Camille Jordan）的《置换论》（*Traité des substitutions*，1870）研究了正规子群的合成群列；奥托·赫尔德（Otto Hölder）于1889年明确地引入了商群，并完成了若尔当-赫尔德定理。本章所给出的这种简洁的一般形式的同构定理与埃米·诺特（Emmy Noether）的名字联系在一起，她在20世纪20年代对带算子的群、环和模统一地表述了这些定理。
:::

## 后续内容

从现在起，商群会被不断地使用。在[[abstract-algebra/group-actions]]一章中，群在集合上的作用给出一个到对称群的同态，其核是一个正规子群；这是证明某些阶的群不是单群的主要工具。在[[abstract-algebra/rings]]一章中，同样的模式——核、商、同构定理——对环再次出现，只是用理想代替了正规子群。而在[[abstract-algebra/fields-galois]]一章中，多项式方程的根式可解性变成了一个关于商群均为阿贝尔群的正规子群链的命题。

::: summary
- **同态**满足$\varphi(ab) = \varphi(a)\varphi(b)$；它保持单位元、逆元和幂，并且$\ord\varphi(a)$整除$\ord a$。
- **核**是正规子群，$\varphi$的纤维就是核的陪集，并且$\varphi$是单射当且仅当$\ker\varphi = \set{e}$。
- $N$是**正规**子群当且仅当对所有$g$有$gNg^{-1} \subseteq N$，也当且仅当对所有$g$有$gN = Ng$。阿贝尔群的子群、指数为$2$的子群、中心的子群以及核都是正规子群；正规性不具有传递性。
- 对$N \trianglelefteq G$，陪集构成**商群**$G/N$，运算为$(aN)(bN) = abN$；正规性恰好就是使这一运算良定义的条件。
- **第一同构定理**：$G/\ker\varphi \cong \Img\varphi$；因此对有限群$G$有$\abs{G} = \abs{\ker\varphi}\abs{\Img\varphi}$。
- **第二同构定理**：$H/(H\cap N) \cong HN/N$。**第三同构定理**：$(G/N)/(K/N) \cong G/K$。**对应定理**：$G/N$的子群 ↔ $G$中包含$N$的子群。
- 单群没有非平凡的真正规子群；$G/G'$是最大的阿贝尔商群。
:::

## 习题

::: exercise 从 Z₈ 到 Z₄ 的约化 {level=1 check="2"}
证明$\varphi\colon \Z_8 \to \Z_4$，$\varphi(k) = k \bmod 4$是同态。$\abs{\ker\varphi}$等于多少？
::: solution
由于$4 \mid 8$，模$4$约化与模$8$加法相容：若$j + k = q\cdot 8 + r$，则$r \equiv j + k \pmod 4$，所以$\varphi(j +_8 k) = \varphi(j) +_4 \varphi(k)$。核为$\set{0, 4}$，阶为$2$；由于$\varphi$是满射，这与$8 = 2 \cdot 4$相符。
:::
:::

::: exercise 用第一同构定理计数 {level=1 check="6"}
同态$\varphi\colon G \to H$是满射，$\abs{G} = 24$，$\abs{\ker\varphi} = 4$。$\abs{H}$等于多少？
::: solution
$H = \Img\varphi \cong G/\ker\varphi$，其阶为$24/4 = 6$。
:::
:::

::: exercise 从 Z₈ 到 Z₁₂ 的同态 {level=1 check="4"}
共有多少个同态$\Z_8 \to \Z_{12}$？
::: solution
同态由$x = \varphi(1)$决定，它必须满足$8x \equiv 0 \pmod{12}$，即$12 \mid 8x$，即$3 \mid 2x$，即$3 \mid x$。所以$x \in \set{0, 3, 6, 9}$，并且与[[#ex-homs-z12-z30]]中一样，每个这样的$x$都给出一个良定义的同态。共有$4$个同态。
:::
:::

::: exercise 幂落在正规子群中 {level=2}
设$N \trianglelefteq G$，且$[G : N] = m$有限。证明对每个$g \in G$有$g^m \in N$。
::: solution
商群$G/N$是$m$阶群，所以由[[abstract-algebra/lagrange#cor-element-order]]，对每个$g$有$(gN)^m = N$。而$(gN)^m = g^mN$，$g^mN = N$意味着$g^m \in N$。
:::
:::

::: exercise 不存在到 V₄ 上的满射 {level=2}
证明不存在从$\Z_{16}$到$\Z_2 \times \Z_2$上的满同态。
::: solution
循环群$\langle a\rangle$的像是由$\varphi(a)$生成的循环群，因为$\varphi(a^k) = \varphi(a)^k$。但$\Z_2\times\Z_2$不是循环群（[[abstract-algebra/subgroups#thm-cyclic-product]]）。所以从$\Z_{16}$出发的同态的像都不可能是$\Z_2\times\Z_2$。
:::
:::

::: exercise Zₙ 的自同构 {level=2}
证明$\Aut(\Z_n) \cong U(n)$。
::: hint
自同构由$1$的像决定，而这个像必须是生成元。
:::
::: solution
$\Z_n$的自同构$\alpha$由$k = \alpha(1)$决定，因为$\alpha(m) = mk$。由于$\alpha$是满射，$k$必须生成$\Z_n$，所以$\gcd(k, n) = 1$（[[abstract-algebra/subgroups#thm-order-of-power]]），即$k \in U(n)$。反之，对$k \in U(n)$，映射$\alpha_k(m) = mk \bmod n$是同态（与[[#ex-homs-z12-z30]]中一样），并且是单射，因为在$\gcd(k, n) = 1$时，由$mk \equiv 0 \pmod n$可推出$n \mid m$；而有限集到自身的单射是双射。所以$k \mapsto \alpha_k$是双射$U(n) \to \Aut(\Z_n)$。它是同态：$\alpha_k(\alpha_l(m)) = mlk$，所以$\alpha_k\circ\alpha_l = \alpha_{kl}$。因此$\Aut(\Z_n) \cong U(n)$；例如$\Aut(\Z_8) \cong U(8) \cong V_4$。
:::
:::

::: exercise 给定阶的唯一子群是正规子群 {level=2}
设$H$是$G$的唯一的$k$阶子群。证明$H \trianglelefteq G$。
::: solution
对$g \in G$，$gHg^{-1}$是$H$在自同构$c_g$下的像，所以它是子群；而$x \mapsto gxg^{-1}$是双射$H \to gHg^{-1}$，所以$\abs{gHg^{-1}} = k$。由唯一性，对每个$g$都有$gHg^{-1} = H$，所以$H$是正规子群。
:::
:::

::: exercise 若 G/Z(G) 是循环群 {level=3}
证明：若$G/Z(G)$是循环群，则$G$是阿贝尔群。由此推出$G/Z(G)$决不可能是非平凡的循环群。
::: solution
记$Z = Z(G)$，并设$G/Z = \langle gZ\rangle$。对某个$k$，每个陪集都可以写成$g^kZ$，所以$G$的每个元素都形如$g^kz$，其中$z \in Z$。对两个元素$a = g^jz$和$b = g^kw$（$z, w \in Z$），

$$
ab = g^jzg^kw = g^jg^k zw = g^{j+k}zw = g^kg^j wz = g^kw\,g^jz = ba,
$$

这是因为$z$和$w$与所有元素可交换，而$g$的各次幂彼此可交换。所以$G$是阿贝尔群。但这样一来$Z(G) = G$，$G/Z(G)$是平凡群。因此$G/Z(G)$决不会是阶大于$1$的循环群。（例：$D_4/Z(D_4) \cong V_4$不是循环群，它也必然不是。）
:::
:::

::: exercise Sₙ 的换位子群 {level=3}
证明当$n \ge 2$时，$S_n$的换位子群是$A_n$。
::: hint
利用符号证明$S_n' \subseteq A_n$，再证明每个$3$-轮换都是换位子。
:::
::: solution
$S_n/A_n \cong \Z_2$是阿贝尔群，所以由上一节的判别准则，$S_n' \subseteq A_n$（等价地，$\sgn[a,b] = \sgn(a)\sgn(b)\sgn(a)^{-1}\sgn(b)^{-1} = 1$）。当$n = 2$时，两边都是平凡群。当$n \ge 3$时，对互不相同的$a, b, c$，

$$
[(a\ b), (a\ c)] = (a\ b)(a\ c)(a\ b)^{-1}(a\ c)^{-1} = \bigl((a\ b)(a\ c)\bigr)^2 = (a\ c\ b)^2 = (a\ b\ c),
$$

这里用到了[[abstract-algebra/permutation-groups#exr-3-7]]中的$(a\ b)(a\ c) = (a\ c\ b)$。所以每个$3$-轮换都属于$S_n'$。由于$3$-轮换生成$A_n$（同一习题），$A_n \subseteq S_n'$。因此$S_n' = A_n$。
:::
:::

::: exercise 群 ℚ/ℤ {level=3}
证明$\Q/\Z$的每个元素的阶都有限，并且对每个$n \ge 1$，$\Q/\Z$恰有一个$n$阶子群，它是循环群。
::: solution
每个元素都形如$\frac ab + \Z$，其中$b \ge 1$，而$b\left(\frac ab + \Z\right) = a + \Z = \Z$，所以它的阶有限（且整除$b$）。陪集$\frac1n + \Z$的阶恰为$n$，因为只有当$n \mid k$时才有$\frac kn \in \Z$；所以$\langle \frac1n + \Z\rangle = \set{\frac kn + \Z : 0 \le k < n}$是一个$n$阶循环子群。反之，设$H$是一个$n$阶子群。每个元素$x + \Z \in H$的阶都整除$n$（拉格朗日定理），所以$nx \in \Z$，即对某个整数$k$有$x = \frac kn$。于是$H \subseteq \set{\frac kn + \Z}$，而后者恰好含$n$个元素；由于$\abs{H} = n$，两者相等。所以$n$阶子群是唯一的，并且是循环群。
:::
:::
