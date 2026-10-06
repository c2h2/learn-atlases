Differentiation turns the polynomial $5 - x + 4x^2 + 2x^3$ into $-1 + 8x + 6x^2$. Rotation turns a vector in the plane into another vector. Transposition turns a matrix into a matrix, and evaluation at $x = 3$ turns a polynomial into a number. None of these is multiplication of a column by a matrix, yet all of them share the two properties that made matrix–vector multiplication so tractable: they respect sums and scalar multiples. The derivative of a sum is the sum of the derivatives; rotating $2\mathbf{v}$ gives twice the rotation of $\mathbf{v}$.

Functions with these two properties are called **linear maps**, and they are the real subject of linear algebra — vector spaces are merely the stage on which they act. This chapter introduces their two key subspaces, the **kernel** and the **image**, and proves the **rank–nullity theorem**, which balances one against the other. Then we show that, once bases are chosen, every linear map between finite-dimensional spaces *is* a matrix, and we work out what happens to the matrix when the bases change. That last question leads to the notion of **similar** matrices, which drives the rest of the course.

## Linear maps

::: definition Linear map {#def-linear-map}
Let $V$ and $W$ be vector spaces over the same field $\F$. A function $T\colon V\to W$ is a **linear map** (or **linear transformation**) if for all $u, v\in V$ and $a\in\F$

$$
T(u + v) = T(u) + T(v) \qquad\text{and}\qquad T(av) = a\,T(v).
$$

A linear map from $V$ to itself is called a **linear operator** on $V$. The set of all linear maps from $V$ to $W$ is denoted $\mathcal{L}(V, W)$.
:::

We often write $Tv$ for $T(v)$. Two consequences are used constantly. Taking $a = 0$ gives $T(0) = T(0\cdot 0) = 0\cdot T(0) = 0$: **a linear map sends $0$ to $0$**. And by induction on the number of terms,

$$
T(a_1v_1 + \dots + a_kv_k) = a_1T(v_1) + \dots + a_kT(v_k):
$$ {#eq-preserve-comb}

a linear map carries linear combinations to linear combinations with the same weights. Here are the basic examples.

- **Matrix maps.** For an $m\times n$ matrix $A$, the map $T_A\colon\F^n\to\F^m$, $T_A(\mathbf{x}) = A\mathbf{x}$, is linear by [[linear-algebra/linear-systems#eq-linear]].
- **Differentiation** $D\colon\mathcal{P}_n(\R)\to\mathcal{P}_{n}(\R)$, $Dp = p'$, and **integration** $p\mapsto\int_0^x p(t)\,dt$, by the sum and constant-multiple rules of calculus.
- **Transposition** $M_{m\times n}(\F)\to M_{n\times m}(\F)$, the **trace** $M_n(\F)\to\F$, and **evaluation** $\mathcal{P}_n(\F)\to\F$, $p\mapsto p(3)$.
- The **zero map** $v\mapsto 0$ and the **identity** $\id_V\colon v\mapsto v$.
- Rotations of the plane about the origin, reflections in lines through the origin, and projections onto such lines (see below).

Non-examples are just as instructive: a **translation** $\mathbf{x}\mapsto\mathbf{x} + \mathbf{b}$ with $\mathbf{b}\neq\mathbf{0}$ is not linear, since it moves the origin; nor are $x\mapsto x^2$ on $\R$ (since $(2x)^2 \neq 2x^2$) or $(x, y)\mapsto xy$ on $\R^2$.

::: example Checking linearity {#ex-check-linear}
Show that $T\colon\mathcal{P}_2(\R)\to\R^2$, $T(p) = \bigl(p(0), p'(1)\bigr)$, is linear, and that $S\colon\R^2\to\R^2$, $S(x,y) = (x + y, xy)$, is not.
::: solution
For polynomials $p, q$ and a scalar $a$, the rules $(p + q)(0) = p(0) + q(0)$ and $(p + q)' = p' + q'$ give

$$
T(p + q) = \bigl(p(0) + q(0),\ p'(1) + q'(1)\bigr) = T(p) + T(q), \qquad T(ap) = \bigl(ap(0),\ ap'(1)\bigr) = aT(p).
$$

So $T$ is linear. For $S$, one counterexample suffices: $S(1,1) = (2, 1)$, but $S(2,2) = (4, 4) \neq 2S(1,1) = (4, 2)$. (Note that $S(0,0) = (0,0)$; sending $0$ to $0$ is necessary for linearity but not sufficient.)
:::
:::

::: quiz
Which of the following maps are linear? (Select all that apply.)
- [x] $T\colon\R^2\to\R^2$, $T(x, y) = (2x - y,\ 3y)$
- [ ] $T\colon\R^2\to\R^2$, $T(x, y) = (x + 1,\ y)$
- [x] $T\colon\mathcal{P}(\R)\to\mathcal{P}(\R)$, $T(p) = p'' + x\,p$
- [ ] $T\colon M_2(\R)\to M_2(\R)$, $T(A) = A\T A$
::: solution
The first is the matrix map of $\begin{pmatrix}2&-1\\0&3\end{pmatrix}$. The second sends $(0,0)$ to $(1,0)$, so it is not linear. The third is linear: $(p + q)'' + x(p + q) = (p'' + xp) + (q'' + xq)$ and similarly for scalar multiples (multiplying by the fixed polynomial $x$ is linear). The fourth is not: $T(2A) = 4A\T A\neq 2T(A)$ unless $A\T A = O$.
:::
:::

A linear map is completely determined by what it does to a basis, and on a basis it can do anything at all.

::: theorem Linear maps and bases {#thm-basis-determines}
Let $v_1, \dots, v_n$ be a basis of $V$ and let $w_1, \dots, w_n$ be any vectors in $W$. There is exactly one linear map $T\colon V\to W$ with $T(v_j) = w_j$ for $j = 1, \dots, n$.
:::

::: proof
*Existence.* Every $v\in V$ can be written uniquely as $v = a_1v_1 + \dots + a_nv_n$ ([[linear-algebra/basis-dimension#thm-coordinates]]), so we may define $T(v) = a_1w_1 + \dots + a_nw_n$. Then $T(v_j) = w_j$. If also $u = \sum b_jv_j$, then $u + v = \sum(a_j + b_j)v_j$, so $T(u + v) = \sum(a_j + b_j)w_j = T(u) + T(v)$; similarly $T(cv) = \sum ca_jw_j = cT(v)$. So $T$ is linear.

*Uniqueness.* If $T'$ is linear with $T'(v_j) = w_j$, then by [[#eq-preserve-comb]], $T'(\sum a_jv_j) = \sum a_jw_j = T(\sum a_jv_j)$ for every vector, so $T' = T$.
:::

Applied to the standard basis of $\F^n$ this says that **every linear map $T\colon\F^n\to\F^m$ is a matrix map**: $T(\mathbf{x}) = A\mathbf{x}$ for the **standard matrix**

$$
A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & \cdots & T(\mathbf{e}_n)\end{pmatrix},
$$

since $T(\mathbf{x}) = T(\sum x_j\mathbf{e}_j) = \sum x_jT(\mathbf{e}_j) = A\mathbf{x}$. For instance, rotation by an angle $\theta$ sends $\mathbf{e}_1 = (1,0)$ to $(\cos\theta, \sin\theta)$ and $\mathbf{e}_2 = (0,1)$ to $(-\sin\theta, \cos\theta)$, so its standard matrix is

$$
R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}.
$$ {#eq-rotation}

::: widget transform2d
matrix: 0.866,-0.5; 0.5,0.866
caption: Rotation by $30^\circ$, with matrix $R_{\pi/6}$ (entries rounded). Linearity is visible in the picture: the origin stays fixed, lines go to lines, and evenly spaced parallel grid lines stay evenly spaced and parallel. The two columns of the matrix are exactly where $\mathbf{e}_1$ and $\mathbf{e}_2$ land — and by [[#thm-basis-determines]] those two images determine the whole map. Edit the entries to build your own map from the images of $\mathbf{e}_1$ and $\mathbf{e}_2$.
:::

## Kernel and image

::: definition Kernel and image {#def-kernel-image}
The **kernel** (or null space) of a linear map $T\colon V\to W$ and its **image** (or range) are

$$
\ker T = \set{v\in V : T(v) = 0}\subseteq V, \qquad \Img T = \set{T(v) : v\in V}\subseteq W.
$$
:::

For a matrix map $T_A$, the kernel is the null space $\operatorname{Nul}(A)$ and the image is the column space $\operatorname{Col}(A)$. For differentiation $D$ on $\mathcal{P}_n(\R)$, the kernel consists of the constant polynomials and the image is $\mathcal{P}_{n-1}(\R)$.

::: proposition Kernels, images and injectivity {#prop-kernel}
Let $T\colon V\to W$ be linear. Then $\ker T$ is a subspace of $V$ and $\Img T$ is a subspace of $W$. Moreover $T$ is injective (one-to-one) if and only if $\ker T = \{0\}$.
:::

::: proof
$T(0) = 0$, so $0\in\ker T$ and $0 \in\Img T$. If $T(u) = T(v) = 0$, then $T(au + bv) = aT(u) + bT(v) = 0$; so $\ker T$ is a subspace by [[linear-algebra/vector-spaces#thm-subspace-test]]. If $w = T(u)$ and $w' = T(v)$ are in the image, so is $aw + bw' = T(au + bv)$; so $\Img T$ is a subspace.

If $T$ is injective and $T(v) = 0 = T(0)$, then $v = 0$; so $\ker T = \{0\}$. Conversely, suppose $\ker T = \{0\}$ and $T(u) = T(v)$. Then $T(u - v) = T(u) - T(v) = 0$, so $u - v\in\ker T$, hence $u = v$.
:::

The criterion "injective iff trivial kernel" is a great labour-saver: instead of comparing all pairs of inputs, we only need to know which inputs go to $0$. It is the abstract form of [[linear-algebra/linear-systems#thm-structure]]: the solutions of $T(v) = w$, if there are any, form a translate $v_0 + \ker T$ of the kernel, so a solution, when one exists, is unique exactly when $\ker T = \{0\}$.

::: widget projection
u: 2,1
v: 1,2
mode: projection
caption: Orthogonal projection onto the line $L$ through $\mathbf{u}$ is a linear map $P$ of the plane. Drag $\mathbf{v}$ and watch $P\mathbf{v}$, its shadow on $L$. The image of $P$ is the line $L$; its kernel is the perpendicular line through the origin — drag $\mathbf{v}$ there and its projection shrinks to $\mathbf{0}$. One dimension is kept and one is lost: $2 = 1 + 1$.
:::

The central theorem of this chapter says that the dimensions of the kernel and the image always add up to the dimension of the domain: whatever $T$ fails to "see" in the kernel is exactly what is missing from the image.

::: theorem Rank–nullity theorem {#thm-rank-nullity}
Let $V$ be finite-dimensional and $T\colon V\to W$ linear. Then $\Img T$ is finite-dimensional and

$$
\dim V = \dim\ker T + \dim\Img T.
$$ {#eq-rank-nullity}
:::

::: proof
The kernel is a subspace of $V$, so it is finite-dimensional ([[linear-algebra/basis-dimension#thm-dim-facts]]); let $u_1, \dots, u_k$ be a basis of it. Extend this to a basis $u_1, \dots, u_k, v_1, \dots, v_r$ of $V$, so that $\dim V = k + r$. We show that $T(v_1), \dots, T(v_r)$ is a basis of $\Img T$; then $\dim\Img T = r$ and the formula follows.

*Spanning.* Every element of $\Img T$ is $T(v)$ for some $v = \sum a_iu_i + \sum b_jv_j$, and

$$
T(v) = \textstyle\sum a_iT(u_i) + \sum b_jT(v_j) = \sum b_jT(v_j),
$$

because $T(u_i) = 0$. So $T(v_1), \dots, T(v_r)$ span $\Img T$.

*Independence.* Suppose $\sum b_jT(v_j) = 0$. Then $T(\sum b_jv_j) = 0$, so $\sum b_jv_j\in\ker T$, and we can write $\sum b_jv_j = \sum c_iu_i$ for some scalars $c_i$. Then $\sum c_iu_i - \sum b_jv_j = 0$ is a relation among the vectors of a basis of $V$, so all $b_j$ (and $c_i$) are $0$.
:::

The numbers in [[#eq-rank-nullity]] have names: $\dim\Img T$ is the **rank** of $T$ and $\dim\ker T$ its **nullity**. For a matrix map, rank–nullity is the equation $\rank A + \dim\operatorname{Nul}(A) = n$ of [[linear-algebra/basis-dimension#thm-rank]], but the proof above never mentions matrices or pivots. Three consequences follow at once.

::: corollary Counting dimensions {#cor-counting}
Let $V$ and $W$ be finite-dimensional and $T\colon V\to W$ linear.

1. If $\dim V > \dim W$, then $T$ is not injective.
2. If $\dim V < \dim W$, then $T$ is not surjective.
3. If $\dim V = \dim W$, then $T$ is injective if and only if it is surjective (and then it is bijective).
:::

::: proof
1. $\dim\ker T = \dim V - \dim\Img T\ge\dim V - \dim W > 0$, so $\ker T\neq\{0\}$.
2. $\dim\Img T = \dim V - \dim\ker T\le\dim V < \dim W$, so $\Img T\neq W$.
3. $T$ is injective iff $\dim\ker T = 0$ iff $\dim\Img T = \dim V = \dim W$ iff $\Img T = W$ (a subspace of full dimension is everything, by [[linear-algebra/basis-dimension#thm-dim-facts]]).
:::

Part 3 is a remarkable "uniqueness implies existence" principle, which the next example puts to work.

::: example Interpolation by rank–nullity {#ex-interpolation}
Let $x_0, x_1, \dots, x_n$ be distinct real numbers. Prove that for any values $y_0, \dots, y_n$ there is exactly one polynomial $p$ of degree at most $n$ with $p(x_i) = y_i$ for all $i$.
::: solution
Consider the evaluation map

$$
E\colon\mathcal{P}_n(\R)\to\R^{n+1}, \qquad E(p) = \bigl(p(x_0), p(x_1), \dots, p(x_n)\bigr).
$$

It is linear, by the same argument as in [[#ex-check-linear]]. If $E(p) = \mathbf{0}$, then $p$ has the $n + 1$ distinct roots $x_0, \dots, x_n$; a non-zero polynomial of degree at most $n$ has at most $n$ roots, so $p = 0$. Thus $\ker E = \{0\}$ and $E$ is injective (**uniqueness**). Both spaces have dimension $n + 1$, so by [[#cor-counting]] $E$ is also surjective (**existence**): every list $(y_0, \dots, y_n)$ is $E(p)$ for exactly one $p$.

We never had to solve a system of equations. For $n = 2$ and the points $1, 2, 3$ this is the parabola of [[linear-algebra/linear-systems#ex-parabola]], whose uniqueness we there established by elimination.
:::
:::

::: example Kernel and image of a derivative map {#ex-kernel-image}
Find the kernel and image of $T\colon\mathcal{P}_2(\R)\to\R^2$, $T(p) = \bigl(p(0), p'(1)\bigr)$, and verify rank–nullity.
::: solution
Write $p = a + bx + cx^2$. Then $p(0) = a$ and $p'(1) = b + 2c$, so $T(p) = (a, b + 2c)$. The kernel consists of those $p$ with $a = 0$ and $b = -2c$: these are the multiples of $x^2 - 2x$, so $\ker T = \Span(x^2 - 2x)$ has dimension $1$. The image contains $T(1) = (1, 0)$ and $T(x) = (0, 1)$, so it is all of $\R^2$, of dimension $2$. Rank–nullity: $\dim\mathcal{P}_2 = 3 = 1 + 2$. (Check: for $p = x^2 - 2x$, $p(0) = 0$ and $p'(1) = 2 - 2 = 0$.)
:::
:::

::: quiz
$T\colon\R^5\to\R^3$ is linear. Which statements must be true? (Select all that apply.)
- [x] $T$ is not injective.
- [x] $\dim\ker T\ge 2$.
- [ ] $T$ is surjective.
- [x] If $\dim\Img T = 3$, then $\dim\ker T = 2$.
::: solution
By rank–nullity, $\dim\ker T = 5 - \dim\Img T\ge 5 - 3 = 2$, so the kernel is non-trivial and $T$ is not injective; if the image has dimension $3$, the kernel has dimension exactly $2$. But $T$ need not be surjective — the zero map is linear and has image $\{\mathbf{0}\}$.
:::
:::

## Isomorphisms

::: definition Isomorphism {#def-isomorphism}
A linear map $T\colon V\to W$ that is bijective is an **isomorphism**. If an isomorphism $V\to W$ exists, $V$ and $W$ are **isomorphic**, written $V\cong W$.
:::

The inverse function $T^{-1}\colon W\to V$ of an isomorphism is automatically linear: given $w, w'\in W$, put $v = T^{-1}w$ and $v' = T^{-1}w'$; then $T(av + bv') = aw + bw'$, so $T^{-1}(aw + bw') = av + bv' = aT^{-1}w + bT^{-1}w'$. Isomorphic spaces are the same space with the elements renamed: every statement about vectors, spans, independence or dimension in one translates into the same statement in the other.

::: theorem Classification of finite-dimensional spaces {#thm-isomorphic}
Two finite-dimensional vector spaces over $\F$ are isomorphic if and only if they have the same dimension. In particular every $n$-dimensional space is isomorphic to $\F^n$.
:::

::: proof
If $T\colon V\to W$ is an isomorphism, then $\ker T = \{0\}$ and $\Img T = W$, so rank–nullity gives $\dim V = 0 + \dim W$. Conversely, let $\mathcal{B} = (v_1, \dots, v_n)$ be a basis of $V$. The **coordinate map** $v\mapsto[v]_{\mathcal{B}}$ is linear by [[linear-algebra/basis-dimension#eq-coord-linear]], injective because only $0$ has coordinates $\mathbf{0}$, and surjective because every column $(a_1, \dots, a_n)$ is the coordinate vector of $\sum a_jv_j$. So $V\cong\F^n$. If also $\dim W = n$, then $W\cong\F^n$ too, and composing one isomorphism with the inverse of the other gives $V\cong W$.
:::

Thus $\mathcal{P}_3(\R)$, $M_2(\R)$ and $\R^4$ are all "the same" $4$-dimensional real vector space. But the isomorphism depends on a choice of basis, and much of the art of linear algebra lies in choosing the basis well.

## The matrix of a linear map

Coordinates turn vectors into columns; they also turn linear maps into matrices.

::: definition Matrix of a linear map {#def-matrix-of-map}
Let $T\colon V\to W$ be linear, let $\mathcal{B} = (v_1, \dots, v_n)$ be a basis of $V$ and $\mathcal{C} = (w_1, \dots, w_m)$ a basis of $W$. The **matrix of $T$ relative to $\mathcal{B}$ and $\mathcal{C}$** is the $m\times n$ matrix

$$
[T]_{\mathcal{C}\leftarrow\mathcal{B}} = \begin{pmatrix}[T(v_1)]_{\mathcal{C}} & [T(v_2)]_{\mathcal{C}} & \cdots & [T(v_n)]_{\mathcal{C}}\end{pmatrix},
$$

whose $j$-th column holds the $\mathcal{C}$-coordinates of the image of the $j$-th basis vector. For an operator on $V$ with $\mathcal{C} = \mathcal{B}$ we write simply $[T]_{\mathcal{B}}$.
:::

::: theorem The matrix does the work of the map {#thm-matrix-of-map}
With the notation of [[#def-matrix-of-map]], for every $v\in V$

$$
[T(v)]_{\mathcal{C}} = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\,[v]_{\mathcal{B}}.
$$

If moreover $S\colon W\to U$ is linear and $\mathcal{D}$ is a basis of $U$, then

$$
[S\circ T]_{\mathcal{D}\leftarrow\mathcal{B}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}\,[T]_{\mathcal{C}\leftarrow\mathcal{B}}.
$$ {#eq-composition}
:::

::: proof
Let $v = \sum a_jv_j$, so $[v]_{\mathcal{B}} = (a_1, \dots, a_n)$. By linearity of $T$ and of coordinates,

$$
[T(v)]_{\mathcal{C}} = \Bigl[\textstyle\sum_j a_jT(v_j)\Bigr]_{\mathcal{C}} = \sum_j a_j[T(v_j)]_{\mathcal{C}} = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\,[v]_{\mathcal{B}},
$$

the last step being the definition of a matrix–vector product (a combination of the columns). For the composition, apply the first part twice: $[S(T(v))]_{\mathcal{D}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}[T(v)]_{\mathcal{C}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}[T]_{\mathcal{C}\leftarrow\mathcal{B}}[v]_{\mathcal{B}}$. Taking $v = v_j$, so that $[v]_{\mathcal{B}} = \mathbf{e}_j$, shows that the $j$-th columns of the two sides of [[#eq-composition]] agree.
:::

So matrix multiplication *is* composition of linear maps, now in complete generality — this is the deeper reason behind [[linear-algebra/matrices#def-product]].

::: example The matrix of differentiation {#ex-diff-matrix}
Find the matrix of $D\colon\mathcal{P}_3(\R)\to\mathcal{P}_2(\R)$, $Dp = p'$, relative to the bases $\mathcal{B} = (1, x, x^2, x^3)$ and $\mathcal{C} = (1, x, x^2)$, and use it to differentiate $p = 5 - x + 4x^2 + 2x^3$.
::: solution
The images of the basis vectors are $D1 = 0$, $Dx = 1$, $Dx^2 = 2x$, $Dx^3 = 3x^2$, with $\mathcal{C}$-coordinates $(0,0,0)$, $(1,0,0)$, $(0,2,0)$, $(0,0,3)$. These are the columns:

$$
[D]_{\mathcal{C}\leftarrow\mathcal{B}} = \begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\end{pmatrix}.
$$

Now $[p]_{\mathcal{B}} = (5, -1, 4, 2)$, and

$$
\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\end{pmatrix}\begin{pmatrix}5\\-1\\4\\2\end{pmatrix} = \begin{pmatrix}-1\\8\\6\end{pmatrix},
$$

so $p' = -1 + 8x + 6x^2$, as expected. The matrix has rank $3$ and a $1$-dimensional null space spanned by $(1, 0, 0, 0)$ — the constant polynomials — in agreement with rank–nullity: $4 = 1 + 3$.
:::
:::

## Change of basis and similarity

The matrix of a map depends on the bases. To compare the matrices for different bases, we first compare the coordinates.

Let $\mathcal{B} = (v_1, \dots, v_n)$ and $\mathcal{B}'$ be two bases of $V$. The **change-of-coordinates matrix** from $\mathcal{B}'$ to $\mathcal{B}$ is the matrix of the identity map,

$$
P_{\mathcal{B}\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}\leftarrow\mathcal{B}'}, \qquad\text{so that}\qquad [v]_{\mathcal{B}} = P_{\mathcal{B}\leftarrow\mathcal{B}'}[v]_{\mathcal{B}'}\quad\text{for all } v.
$$

Its columns are the $\mathcal{B}$-coordinates of the vectors of $\mathcal{B}'$. By [[#eq-composition]], $P_{\mathcal{B}'\leftarrow\mathcal{B}}P_{\mathcal{B}\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}'\leftarrow\mathcal{B}'} = I$, so the two change-of-coordinates matrices are inverse to each other. When $V = \F^n$ and $\mathcal{B}$ is the standard basis $\mathcal{E}$, the matrix $P_{\mathcal{E}\leftarrow\mathcal{B}'}$ simply has the vectors of $\mathcal{B}'$ as its columns.

::: theorem Change of basis {#thm-change-basis}
Let $T$ be a linear operator on a finite-dimensional space $V$, let $\mathcal{B}$ and $\mathcal{B}'$ be bases of $V$, and put $P = P_{\mathcal{B}\leftarrow\mathcal{B}'}$. Then

$$
[T]_{\mathcal{B}'} = P^{-1}\,[T]_{\mathcal{B}}\,P.
$$ {#eq-change-basis}
:::

::: proof
Since $T = \id\circ T\circ\id$, applying [[#eq-composition]] twice gives

$$
[T]_{\mathcal{B}'\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}'\leftarrow\mathcal{B}}\,[T]_{\mathcal{B}\leftarrow\mathcal{B}}\,[\id]_{\mathcal{B}\leftarrow\mathcal{B}'} = P^{-1}[T]_{\mathcal{B}}P.
$$
:::

Read [[#eq-change-basis]] from right to left: $P$ converts $\mathcal{B}'$-coordinates into $\mathcal{B}$-coordinates, $[T]_{\mathcal{B}}$ applies $T$, and $P^{-1}$ converts back.

::: definition Similar matrices {#def-similar}
Two $n\times n$ matrices $A$ and $B$ are **similar** if $B = P^{-1}AP$ for some invertible matrix $P$.
:::

By [[#thm-change-basis]], the matrices of one operator relative to different bases are similar; conversely, if $B = P^{-1}AP$, then $A$ and $B$ are the matrices of the operator $\mathbf{x}\mapsto A\mathbf{x}$ relative to the standard basis and to the basis formed by the columns of $P$. Quantities that depend only on the operator, not on the basis, must therefore be the same for similar matrices. The rank is one (it is $\dim\Img T$); the trace is another, since $\tr(P^{-1}AP) = \tr(APP^{-1}) = \tr A$ by the identity $\tr(XY) = \tr(YX)$ of [[linear-algebra/matrices#exr-trace]]. The determinant and the eigenvalues ([[linear-algebra/determinants]], [[linear-algebra/eigenvalues]]) are the most important similarity invariants of all.

::: example A reflection made simple {#ex-reflection}
Find the standard matrix of the reflection $T$ of $\R^2$ in the line $y = 2x$.
::: solution
In the standard basis the answer is not obvious, so choose a basis adapted to the geometry: $\mathbf{v}_1 = (1, 2)$ along the line and $\mathbf{v}_2 = (-2, 1)$ perpendicular to it. The reflection fixes $\mathbf{v}_1$ and reverses $\mathbf{v}_2$: $T\mathbf{v}_1 = \mathbf{v}_1$ and $T\mathbf{v}_2 = -\mathbf{v}_2$. So relative to $\mathcal{B}' = (\mathbf{v}_1, \mathbf{v}_2)$,

$$
[T]_{\mathcal{B}'} = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

With $P = P_{\mathcal{E}\leftarrow\mathcal{B}'} = \begin{pmatrix}1&-2\\2&1\end{pmatrix}$ and $P^{-1} = \frac15\begin{pmatrix}1&2\\-2&1\end{pmatrix}$ (by [[linear-algebra/matrices#eq-inv2]]), the change-of-basis formula [[#eq-change-basis]] rearranges to $[T]_{\mathcal{E}} = P[T]_{\mathcal{B}'}P^{-1}$:

$$
[T]_{\mathcal{E}} = \begin{pmatrix}1&-2\\2&1\end{pmatrix}\begin{pmatrix}1&0\\0&-1\end{pmatrix}\cdot\frac15\begin{pmatrix}1&2\\-2&1\end{pmatrix} = \frac15\begin{pmatrix}1&2\\2&-1\end{pmatrix}\begin{pmatrix}1&2\\-2&1\end{pmatrix} = \frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}.
$$

*Check:* $\frac15(-3 + 8,\ 4 + 6) = (1, 2)$, so $\mathbf{v}_1$ is fixed, and $\frac15(6 + 4,\ -8 + 3) = (2, -1) = -\mathbf{v}_2$. The trace is $0$ in both bases, as it must be.
:::
:::

::: widget transform2d
matrix: -0.6,0.8; 0.8,0.6
eigen: true
caption: The reflection of [[#ex-reflection]], with matrix $\frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}$. In the standard basis it looks complicated, but two directions are special: vectors along $(1,2)$ are left unchanged and vectors along $(-2,1)$ are reversed. In the basis made of these two vectors, the matrix is simply $\operatorname{diag}(1,-1)$. Finding such adapted bases is the goal of [[linear-algebra/eigenvalues]].
:::

::: warning Which way does P go?
The most common error with change of basis is using $P$ where $P^{-1}$ is needed. Fix the meaning of $P$ by what it does to coordinates: $P_{\mathcal{B}\leftarrow\mathcal{B}'}$ *takes $\mathcal{B}'$-coordinates and returns $\mathcal{B}$-coordinates*, and its columns are the new basis vectors written in the old basis. Then check the formula by tracking a vector through it, as in the remark after [[#thm-change-basis]], or test it on one basis vector as in the check of [[#ex-reflection]].
:::

::: quiz
Suppose $B = P^{-1}AP$ with $P$ invertible. Which of the following must hold? (Select all that apply.)
- [x] $\tr B = \tr A$
- [x] $\rank B = \rank A$
- [ ] $B = A$
- [x] $B^2 = P^{-1}A^2P$
::: solution
Trace and rank are similarity invariants, as explained above. For powers, $B^2 = (P^{-1}AP)(P^{-1}AP) = P^{-1}A(PP^{-1})AP = P^{-1}A^2P$ — the same operator applied twice, in the new basis. But similar matrices are usually different: the reflection of [[#ex-reflection]] has the similar matrices $\frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}$ and $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$.
:::
:::

::: history
Linear maps between abstract vector spaces were defined by Giuseppe Peano in his *Calcolo geometrico* (1888), where he also observed that the linear maps from one space to another themselves form a vector space. The ideas proved their worth in analysis. Ivar Fredholm (1903) showed that for an important class of integral equations, uniqueness of solutions implies existence — an infinite-dimensional relative of part 3 of [[#cor-counting]], now called the Fredholm alternative — and David Hilbert's school developed linear operators on spaces of functions. Stefan Banach's *Théorie des opérations linéaires* (1932) founded the general theory of linear maps between infinite-dimensional normed spaces, known today as functional analysis.
:::

## Where this leads

Change of basis raises the central question of the next chapters: given an operator, can we choose a basis in which its matrix is as simple as possible — ideally diagonal, as for the reflection above? The determinant ([[linear-algebra/determinants]]) gives a similarity invariant that detects invertibility, and eigenvectors ([[linear-algebra/eigenvalues]]) are exactly the basis vectors that make a matrix diagonal. When that is impossible, the Jordan form ([[linear-algebra/jordan-form]]) is the best substitute. Linear maps appear everywhere: the derivative of a function of several variables is a linear map ([[multivariable/partial-derivatives]]), linear differential operators act on function spaces ([[ode/second-order-linear]]), and group homomorphisms are the analogue of linear maps in [[abstract-algebra/homomorphisms]].

::: summary
- A linear map preserves sums and scalar multiples, hence all linear combinations; it sends $0$ to $0$ ([[#def-linear-map]]).
- A linear map is determined by the images of a basis, which can be prescribed freely ([[#thm-basis-determines]]); every linear map $\F^n\to\F^m$ is $\mathbf{x}\mapsto A\mathbf{x}$ with columns $T(\mathbf{e}_j)$.
- $\ker T$ and $\Img T$ are subspaces, and $T$ is injective iff $\ker T = \{0\}$ ([[#prop-kernel]]).
- Rank–nullity: $\dim V = \dim\ker T + \dim\Img T$ ([[#thm-rank-nullity]]); between spaces of equal finite dimension, injective $\iff$ surjective.
- Finite-dimensional spaces are isomorphic iff they have the same dimension; coordinates give $V\cong\F^n$.
- $[T]_{\mathcal{C}\leftarrow\mathcal{B}}$ has columns $[T(v_j)]_{\mathcal{C}}$; it satisfies $[Tv]_{\mathcal{C}} = [T][v]_{\mathcal{B}}$, and composition corresponds to matrix multiplication.
- Changing basis replaces $[T]_{\mathcal{B}}$ by the similar matrix $P^{-1}[T]_{\mathcal{B}}P$ ([[#thm-change-basis]]); trace and rank are similarity invariants.
:::

## Exercises

::: exercise Linear or not? {level=1}
Which of these maps are linear? (a) $T\colon\R^3\to\R^2$, $T(x,y,z) = (x - 2y + z,\ 3y - z)$; (b) $T\colon\R^2\to\R$, $T(x,y) = \abs{x} + \abs{y}$; (c) $T\colon\mathcal{P}_2\to\mathcal{P}_3$, $T(p) = x\,p(x)$; (d) $T\colon M_2(\R)\to\R$, $T(A) = a_{11}a_{22}$.
::: solution
(a) Linear: it is the matrix map of $\begin{pmatrix}1&-2&1\\0&3&-1\end{pmatrix}$. (b) Not linear: $T(-1, 0) = 1\neq -T(1,0) = -1$. (c) Linear: $x(p + q) = xp + xq$ and $x(ap) = a(xp)$. (d) Not linear: $T(2I) = 4\neq 2T(I) = 2$.
:::
:::

::: exercise A standard matrix {level=1}
Find the standard matrix of the linear map $T\colon\R^2\to\R^2$ that reflects in the $x$-axis and then rotates by $90^\circ$ anticlockwise. Is it a rotation or a reflection?
::: solution
Reflection in the $x$-axis has matrix $F = \begin{pmatrix}1&0\\0&-1\end{pmatrix}$ and rotation by $90^\circ$ has matrix $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ (from [[#eq-rotation]]). Doing $F$ first, $T = R\circ F$ has matrix $RF = \begin{pmatrix}0&1\\1&0\end{pmatrix}$. This swaps $\mathbf{e}_1$ and $\mathbf{e}_2$: it is the reflection in the line $y = x$ (it fixes $(1,1)$ and reverses $(1,-1)$).
:::
:::

::: exercise Counting a kernel {level=1 check="3"}
A linear map $T\colon\R^6\to\R^4$ has a $3$-dimensional kernel. What is the dimension of its image? Is $T$ surjective?
::: solution
By rank–nullity, $\dim\Img T = 6 - 3 = 3$. The image is a $3$-dimensional subspace of $\R^4$, so $T$ is not surjective.
:::
:::

::: exercise An invertible differential operator {level=2}
Let $T\colon\mathcal{P}_2(\R)\to\mathcal{P}_2(\R)$, $T(p) = p' + p$. Find $[T]_{\mathcal{B}}$ for $\mathcal{B} = (1, x, x^2)$, show that $T$ is invertible, and find the polynomial $p$ with $p' + p = x^2$.
::: solution
$T(1) = 1$, $T(x) = 1 + x$, $T(x^2) = 2x + x^2$, so

$$
[T]_{\mathcal{B}} = \begin{pmatrix}1&1&0\\0&1&2\\0&0&1\end{pmatrix}.
$$

This is upper triangular with non-zero diagonal, so it is invertible (three pivots); hence $T$ is an isomorphism. To solve $T(p) = x^2$, solve $[T]_{\mathcal{B}}\mathbf{a} = (0, 0, 1)$ by back substitution: $a_3 = 1$, $a_2 + 2a_3 = 0$ gives $a_2 = -2$, $a_1 + a_2 = 0$ gives $a_1 = 2$. So $p = 2 - 2x + x^2$. *Check:* $p' + p = (2x - 2) + (x^2 - 2x + 2) = x^2$.
:::
:::

::: exercise Symmetric and skew parts {level=2 check="1"}
Let $T\colon M_2(\R)\to M_2(\R)$, $T(A) = A - A\T$. Find $\ker T$ and $\Img T$, and their dimensions. What is $\dim\Img T$?
::: solution
$T(A) = O$ iff $A = A\T$, so $\ker T$ is the space of symmetric $2\times 2$ matrices, of dimension $3$. For $A = \begin{pmatrix}a&b\\c&d\end{pmatrix}$, $T(A) = \begin{pmatrix}0&b-c\\c-b&0\end{pmatrix} = (b - c)\begin{pmatrix}0&1\\-1&0\end{pmatrix}$, so $\Img T$ is the $1$-dimensional space of skew-symmetric $2\times 2$ matrices. Rank–nullity checks: $4 = 3 + 1$.
:::
:::

::: exercise Projection onto a line {level=2}
Use a basis adapted to the geometry, as in [[#ex-reflection]], to find the standard matrix of the orthogonal projection of $\R^2$ onto the line $y = x$. Find its kernel and image.
::: solution
With $\mathbf{v}_1 = (1,1)$ on the line and $\mathbf{v}_2 = (1,-1)$ perpendicular to it, the projection satisfies $P\mathbf{v}_1 = \mathbf{v}_1$ and $P\mathbf{v}_2 = \mathbf{0}$, so its matrix in this basis is $\operatorname{diag}(1, 0)$. With $Q = \begin{pmatrix}1&1\\1&-1\end{pmatrix}$ and $Q^{-1} = \frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}$,

$$
[P]_{\mathcal{E}} = Q\begin{pmatrix}1&0\\0&0\end{pmatrix}Q^{-1} = \begin{pmatrix}1&0\\1&0\end{pmatrix}\cdot\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix} = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

The image is the line $y = x$ and the kernel is the line $y = -x$.
:::
:::

::: exercise Diagonal in a good basis {level=2}
Let $A = \begin{pmatrix}4&-2\\1&1\end{pmatrix}$ and $\mathcal{B} = \bigl((2,1), (1,1)\bigr)$. Compute the matrix of $\mathbf{x}\mapsto A\mathbf{x}$ relative to $\mathcal{B}$.
::: solution
With $P = \begin{pmatrix}2&1\\1&1\end{pmatrix}$ (columns the basis vectors) and $P^{-1} = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}$,

$$
P^{-1}AP = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}\begin{pmatrix}6&2\\3&2\end{pmatrix} = \begin{pmatrix}3&0\\0&2\end{pmatrix}.
$$

So the map is diagonal in this basis: $A(2,1) = (6,3) = 3(2,1)$ and $A(1,1) = (2,2) = 2(1,1)$. The basis vectors are eigenvectors, a notion studied in [[linear-algebra/eigenvalues]].
:::
:::

::: exercise Projections split the space {level=3 #exr-projection}
Let $T\colon V\to V$ be linear with $T\circ T = T$ (a **projection**). Prove that $V = \ker T\oplus\Img T$.
::: hint
Write $v = (v - Tv) + Tv$.
:::
::: solution
For any $v\in V$, $v = (v - Tv) + Tv$. The second term is in $\Img T$, and the first is in $\ker T$ because $T(v - Tv) = Tv - T^2v = Tv - Tv = 0$. So $V = \ker T + \Img T$. If $w\in\ker T\cap\Img T$, write $w = Tu$; then $0 = Tw = T^2u = Tu = w$. So $\ker T\cap\Img T = \{0\}$, and the sum is direct by [[linear-algebra/vector-spaces#prop-direct-sum]].
:::
:::

::: exercise Kernel equal to image {level=3}
Prove that there is no linear map $T\colon\R^3\to\R^3$ with $\ker T = \Img T$, and give an example of a linear map $T\colon\R^2\to\R^2$ with $\ker T = \Img T$.
::: solution
If $\ker T = \Img T$, then rank–nullity gives $3 = \dim\ker T + \dim\Img T = 2\dim\ker T$, which is impossible since $3$ is odd. In $\R^2$, take $T(x, y) = (y, 0)$, with matrix $\begin{pmatrix}0&1\\0&0\end{pmatrix}$: its kernel is $\set{(x, 0)}$ (the $x$-axis), and its image is also the $x$-axis. Note that $T\circ T = 0$, which is necessary whenever $\Img T\subseteq\ker T$.
:::
:::

::: exercise The space of linear maps {level=3}
Show that $\mathcal{L}(V, W)$ is a vector space under the operations $(S + T)(v) = S(v) + T(v)$ and $(aT)(v) = aT(v)$, and that if $\dim V = n$ and $\dim W = m$ then $\dim\mathcal{L}(V, W) = mn$.
::: solution
$S + T$ and $aT$ are linear (for instance $(S + T)(u + v) = Su + Sv + Tu + Tv = (S+T)u + (S+T)v$), and the vector space axioms hold because they hold pointwise in $W$; the zero vector is the zero map. Fix bases $\mathcal{B}$ of $V$ and $\mathcal{C}$ of $W$ and consider $\Phi\colon\mathcal{L}(V, W)\to M_{m\times n}(\F)$, $\Phi(T) = [T]_{\mathcal{C}\leftarrow\mathcal{B}}$. It is linear, since the columns of $[S + T]$ and $[aT]$ are $[Sv_j + Tv_j]_{\mathcal{C}} = [Sv_j]_{\mathcal{C}} + [Tv_j]_{\mathcal{C}}$ and $a[Tv_j]_{\mathcal{C}}$. It is injective, because $[T] = O$ means $T(v_j) = 0$ for every basis vector, so $T = 0$ by [[#thm-basis-determines]]. It is surjective, because by the same theorem any matrix $M$ is $[T]$ for the linear map with $T(v_j) = \sum_i m_{ij}w_i$. So $\Phi$ is an isomorphism and $\dim\mathcal{L}(V,W) = \dim M_{m\times n}(\F) = mn$.
:::
:::
