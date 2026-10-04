Everything so far — spans, bases, dimension, linear maps, eigenvalues — makes sense without any notion of length or angle. But much of what we want from vectors is geometric. How far is a point from a plane? Which vector in a subspace is closest to a given vector? What is the best approximation of $e^x$ by a quadratic polynomial on $[-1, 1]$? Such questions need a way of measuring, and in linear algebra the measuring instrument is the **inner product**, the abstract version of the dot product.

With an inner product come lengths, angles and, above all, **orthogonality**. Orthogonal bases are the best of all bases: coordinates relative to them are computed by a single inner product each, with no system of equations to solve. This chapter develops the geometry of inner product spaces, proves the Cauchy–Schwarz inequality, constructs orthogonal projections — which solve the closest-point problem — and gives the Gram–Schmidt process, which turns any basis into an orthogonal one and, in matrix form, yields the factorisation $A = QR$.

## Inner products and norms

The dot product of $\mathbf{u}, \mathbf{v}\in\R^n$ is $\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\T\mathbf{v} = u_1v_1 + \dots + u_nv_n$. In $\R^2$ and $\R^3$ it is linked to geometry by $\mathbf{u}\cdot\mathbf{u} = \norm{\mathbf{u}}^2$ (Pythagoras) and $\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$, where $\theta$ is the angle between the vectors (the law of cosines). We keep its three essential properties as axioms.

::: definition Inner product {#def-inner-product}
An **inner product** on a real vector space $V$ is a function assigning to each pair $u, v\in V$ a real number $\inner{u}{v}$ such that for all $u, v, w\in V$ and $a, b\in\R$:

1. $\inner{u}{v} = \inner{v}{u}$ (symmetry);
2. $\inner{au + bv}{w} = a\inner{u}{w} + b\inner{v}{w}$ (linearity in the first argument);
3. $\inner{v}{v} > 0$ for every $v\neq 0$ (positivity).

A vector space with an inner product is an **inner product space**. The **norm** (length) of $v$ is $\norm{v} = \sqrt{\inner{v}{v}}$, and the **distance** between $u$ and $v$ is $\norm{u - v}$.
:::

By symmetry the inner product is linear in the second argument too, and $\inner{0}{v} = 0$. For a **complex** vector space, symmetry is replaced by conjugate symmetry $\inner{u}{v} = \overline{\inner{v}{u}}$, so that $\inner{v}{v}$ is real; then the inner product is conjugate-linear in the second argument. The standard example on $\C^n$ is $\inner{\mathbf{z}}{\mathbf{w}} = z_1\overline{w_1} + \dots + z_n\overline{w_n}$. (Physicists put the conjugate on the first argument instead.) We concentrate on the real case; everything below holds for complex spaces with the obvious changes.

The examples that matter:

- The **dot product** on $\R^n$, $\inner{\mathbf{u}}{\mathbf{v}} = \mathbf{u}\T\mathbf{v}$.
- **Weighted** dot products $\inner{\mathbf{u}}{\mathbf{v}} = w_1u_1v_1 + \dots + w_nu_nv_n$ with all weights $w_i > 0$, used when some measurements are more reliable than others.
- On the space $C[a,b]$ of continuous functions, $\inner{f}{g} = \int_a^b f(x)g(x)\,dx$. Positivity holds because if $f$ is continuous and not identically zero, then $f^2 \ge 0$ is positive on some interval, so $\int_a^b f^2\,dx > 0$.
- On $M_{m\times n}(\R)$, $\inner{A}{B} = \tr(A\T B) = \sum_{i,j}a_{ij}b_{ij}$ — the dot product of the matrices viewed as long vectors.

Two vectors are **orthogonal**, written $u\perp v$, if $\inner{u}{v} = 0$. A **unit vector** is one with $\norm{u} = 1$; any non-zero $v$ can be **normalised** to the unit vector $v/\norm{v}$, since $\norm{cv} = \abs{c}\norm{v}$.

::: theorem Pythagoras {#thm-pythagoras}
If $u\perp v$, then $\norm{u + v}^2 = \norm{u}^2 + \norm{v}^2$.
:::

::: proof
Expanding by linearity, $\norm{u + v}^2 = \inner{u + v}{u + v} = \inner{u}{u} + 2\inner{u}{v} + \inner{v}{v} = \norm{u}^2 + 0 + \norm{v}^2$.
:::

The simplest projection decomposes a vector along another. Given $v\neq 0$ and any $u$, put $c = \inner{u}{v}/\inner{v}{v}$. Then $w = u - cv$ satisfies $\inner{w}{v} = \inner{u}{v} - c\inner{v}{v} = 0$, so

$$
u = cv + w, \qquad w\perp v, \qquad c = \frac{\inner{u}{v}}{\inner{v}{v}}.
$$ {#eq-decompose-line}

The vector $cv$ is the **projection** of $u$ onto the line through $v$. This simple decomposition proves the most important inequality in linear algebra.

::: theorem Cauchy–Schwarz inequality {#thm-cauchy-schwarz}
For all vectors $u, v$ in an inner product space,

$$
\abs{\inner{u}{v}}\le\norm{u}\,\norm{v},
$$

with equality if and only if $u$ and $v$ are linearly dependent.
:::

::: proof
If $v = 0$ both sides are $0$ and the vectors are dependent. Otherwise decompose $u = cv + w$ as in [[#eq-decompose-line]]. By Pythagoras,

$$
\norm{u}^2 = \abs{c}^2\norm{v}^2 + \norm{w}^2\ge\abs{c}^2\norm{v}^2 = \frac{\inner{u}{v}^2}{\norm{v}^2}.
$$

Multiplying by $\norm{v}^2$ and taking square roots gives the inequality. Equality holds iff $w = 0$, that is, iff $u = cv$ is a multiple of $v$.
:::

::: corollary Triangle inequality {#cor-triangle}
$\norm{u + v}\le\norm{u} + \norm{v}$ for all $u, v$.
:::

::: proof
$\norm{u + v}^2 = \norm{u}^2 + 2\inner{u}{v} + \norm{v}^2\le\norm{u}^2 + 2\norm{u}\norm{v} + \norm{v}^2 = (\norm{u} + \norm{v})^2$, by Cauchy–Schwarz.
:::

Cauchy–Schwarz guarantees that $\inner{u}{v}/(\norm{u}\norm{v})$ lies in $[-1, 1]$ for non-zero $u, v$, so we can *define* the **angle** $\theta\in[0,\pi]$ between them by

$$
\cos\theta = \frac{\inner{u}{v}}{\norm{u}\,\norm{v}}.
$$

In $\R^2$ and $\R^3$ this is the familiar angle; in other spaces it is a definition, and a useful one. Specialised to different inner products, Cauchy–Schwarz gives inequalities that look quite unrelated:

$$
\Bigl(\sum_{i=1}^n u_iv_i\Bigr)^2\le\sum_{i=1}^n u_i^2\sum_{i=1}^n v_i^2, \qquad \Bigl(\int_a^b fg\,dx\Bigr)^2\le\int_a^b f^2\,dx\int_a^b g^2\,dx.
$$

::: example Angles in two spaces {#ex-angles}
(a) Find the angle between $\mathbf{u} = (1,1,1,1)$ and $\mathbf{v} = (1,2,2,0)$ in $\R^4$. (b) Find the angle between the functions $1$ and $x$ in $C[0,1]$.
::: solution
(a) $\mathbf{u}\cdot\mathbf{v} = 5$, $\norm{\mathbf{u}} = 2$ and $\norm{\mathbf{v}} = 3$, so $\cos\theta = \frac56$ and $\theta = \arccos\frac56\approx 33.6^\circ$.

(b) $\inner{1}{x} = \int_0^1 x\,dx = \frac12$, $\norm{1}^2 = \int_0^1 1\,dx = 1$ and $\norm{x}^2 = \int_0^1 x^2\,dx = \frac13$. So $\cos\theta = \dfrac{1/2}{1\cdot 1/\sqrt3} = \dfrac{\sqrt3}{2}$, and the angle between the constant function $1$ and the function $x$ is $30^\circ$. On $[-1, 1]$ instead, $\int_{-1}^1 x\,dx = 0$ and the two functions are orthogonal: angles depend on the inner product.
:::
:::

## Orthogonal sets and orthogonal matrices

::: definition Orthogonal and orthonormal sets {#def-orthonormal}
A list $u_1, \dots, u_k$ is **orthogonal** if $\inner{u_i}{u_j} = 0$ whenever $i\neq j$, and **orthonormal** if moreover every $u_i$ is a unit vector. An **orthogonal basis** is a basis that is an orthogonal list; similarly for an **orthonormal basis**.
:::

::: theorem Orthogonal coordinates {#thm-orthogonal-coords}
An orthogonal list of non-zero vectors is linearly independent. If $u_1, \dots, u_n$ is an orthogonal basis of $V$, then every $v\in V$ satisfies

$$
v = \frac{\inner{v}{u_1}}{\inner{u_1}{u_1}}u_1 + \dots + \frac{\inner{v}{u_n}}{\inner{u_n}{u_n}}u_n,
$$ {#eq-fourier-coeffs}

and for an orthonormal basis simply $v = \inner{v}{u_1}u_1 + \dots + \inner{v}{u_n}u_n$.
:::

::: proof
Suppose $c_1u_1 + \dots + c_ku_k = 0$. Taking the inner product with $u_j$ kills every term except one: $c_j\inner{u_j}{u_j} = 0$, and $\inner{u_j}{u_j} > 0$, so $c_j = 0$. For the formula, write $v = \sum c_iu_i$ and take the inner product with $u_j$ in the same way: $\inner{v}{u_j} = c_j\inner{u_j}{u_j}$.
:::

Compare this with a general basis, where finding coordinates means solving a linear system. The numbers $\inner{v}{u_i}$ are called the **Fourier coefficients** of $v$, after the case of trigonometric functions ([[pde/fourier-series]]).

::: example Coordinates in an orthogonal basis {#ex-orth-coords}
Check that $\mathbf{u}_1 = (1,1,1)$, $\mathbf{u}_2 = (1,-1,0)$, $\mathbf{u}_3 = (1,1,-2)$ form an orthogonal basis of $\R^3$, and express $\mathbf{v} = (3, 1, -2)$ in it.
::: solution
$\mathbf{u}_1\cdot\mathbf{u}_2 = 0$, $\mathbf{u}_1\cdot\mathbf{u}_3 = 1 + 1 - 2 = 0$ and $\mathbf{u}_2\cdot\mathbf{u}_3 = 1 - 1 + 0 = 0$. Three non-zero orthogonal vectors are independent, hence a basis of $\R^3$. By [[#eq-fourier-coeffs]], with $\mathbf{v}\cdot\mathbf{u}_1 = 2$, $\mathbf{v}\cdot\mathbf{u}_2 = 2$, $\mathbf{v}\cdot\mathbf{u}_3 = 8$ and $\norm{\mathbf{u}_1}^2 = 3$, $\norm{\mathbf{u}_2}^2 = 2$, $\norm{\mathbf{u}_3}^2 = 6$:

$$
\mathbf{v} = \tfrac23\mathbf{u}_1 + 1\,\mathbf{u}_2 + \tfrac43\mathbf{u}_3.
$$

*Check:* $\tfrac23(1,1,1) + (1,-1,0) + \tfrac43(1,1,-2) = (3, 1, -2)$.
:::
:::

::: quiz
Which of these vectors are orthogonal to $(1, 2, -1)$? (Select all that apply.)
- [x] $(1, 0, 1)$
- [x] $(2, -1, 0)$
- [ ] $(1, 1, 1)$
- [x] $(0, 1, 2)$
::: solution
Compute dot products with $(1,2,-1)$: $1 + 0 - 1 = 0$; $2 - 2 + 0 = 0$; $1 + 2 - 1 = 2$; $0 + 2 - 2 = 0$. So all except $(1,1,1)$. Together, these orthogonal vectors fill the plane $x + 2y - z = 0$, which is the orthogonal complement of the line through $(1,2,-1)$.
:::
:::

A square matrix whose columns are orthonormal deserves a name.

::: definition Orthogonal matrix {#def-orthogonal-matrix}
A real $n\times n$ matrix $Q$ is **orthogonal** if $Q\T Q = I$, that is, if its columns form an orthonormal basis of $\R^n$. Then $Q^{-1} = Q\T$.
:::

(The entries of $Q\T Q$ are the dot products of the columns of $Q$, so $Q\T Q = I$ says exactly that the columns are orthonormal. By [[linear-algebra/matrices#cor-one-sided]], $Q\T Q = I$ already implies $QQ\T = I$, so the rows are orthonormal too.) Rotations, reflections and permutation matrices are orthogonal. The **complex** analogue is a **unitary** matrix, with $\overline{U}\T U = I$.

::: proposition Orthogonal matrices preserve geometry {#prop-orthogonal}
For a real $n\times n$ matrix $Q$ the following are equivalent: (a) $Q$ is orthogonal; (b) $(Q\mathbf{x})\cdot(Q\mathbf{y}) = \mathbf{x}\cdot\mathbf{y}$ for all $\mathbf{x}, \mathbf{y}$; (c) $\norm{Q\mathbf{x}} = \norm{\mathbf{x}}$ for all $\mathbf{x}$. Moreover an orthogonal matrix has $\det Q = \pm 1$.
:::

::: proof
(a)$\Rightarrow$(b): $(Q\mathbf{x})\T(Q\mathbf{y}) = \mathbf{x}\T Q\T Q\mathbf{y} = \mathbf{x}\T\mathbf{y}$. (b)$\Rightarrow$(c): take $\mathbf{y} = \mathbf{x}$. (c)$\Rightarrow$(a): the **polarisation identity** $\mathbf{x}\cdot\mathbf{y} = \frac14\bigl(\norm{\mathbf{x} + \mathbf{y}}^2 - \norm{\mathbf{x} - \mathbf{y}}^2\bigr)$ expresses dot products through lengths, so (c) implies (b); and (b) with $\mathbf{x} = \mathbf{e}_i$, $\mathbf{y} = \mathbf{e}_j$ says that the columns $Q\mathbf{e}_i$ are orthonormal. Finally $1 = \det I = \det(Q\T Q) = (\det Q)^2$.
:::

## Orthogonal complements and projections

::: definition Orthogonal complement {#def-complement}
The **orthogonal complement** of a subspace $W$ of $V$ is $W^\perp = \set{v\in V : \inner{v}{w} = 0 \text{ for all } w\in W}$.
:::

$W^\perp$ is a subspace (it is closed under combinations because the inner product is linear in its first argument), and $W\cap W^\perp = \{0\}$, since a vector in both is orthogonal to itself. If $W = \Span(w_1, \dots, w_k)$, then $v\in W^\perp$ as soon as $v\perp w_i$ for each $i$, by linearity. In $\R^3$ the orthogonal complement of a plane through the origin is its normal line, and vice versa. For matrices, orthogonal complements reveal how the four fundamental subspaces fit together.

::: theorem The four subspaces are orthogonal in pairs {#thm-fundamental}
For a real $m\times n$ matrix $A$,

$$
\operatorname{Row}(A)^\perp = \operatorname{Nul}(A) \quad\text{in } \R^n, \qquad \operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T) \quad\text{in } \R^m.
$$
:::

::: proof
The $i$-th entry of $A\mathbf{x}$ is the dot product of row $i$ of $A$ with $\mathbf{x}$. So $A\mathbf{x} = \mathbf{0}$ iff $\mathbf{x}$ is orthogonal to every row, iff $\mathbf{x}$ is orthogonal to the span of the rows. This is the first statement; the second is the first applied to $A\T$, whose rows are the columns of $A$.
:::

This explains the orthogonality we noticed in [[linear-algebra/basis-dimension#ex-four]], and with the dimension count of [[linear-algebra/basis-dimension#thm-rank]] gives Strang's picture: $\R^n$ splits into the perpendicular subspaces $\operatorname{Row}(A)$ (dimension $r$) and $\operatorname{Nul}(A)$ (dimension $n - r$), and $\R^m$ into $\operatorname{Col}(A)$ and $\operatorname{Nul}(A\T)$. The splitting is a special case of the next theorem, which is the heart of the chapter.

::: theorem Orthogonal decomposition {#thm-decomposition}
Let $W$ be a finite-dimensional subspace of an inner product space $V$, with an orthogonal basis $u_1, \dots, u_k$. Every $v\in V$ can be written uniquely as

$$
v = \hat{v} + z, \qquad \hat{v}\in W,\quad z\in W^\perp,
$$

and $\hat v$, the **orthogonal projection** of $v$ onto $W$, is

$$
\hat{v} = \proj_W v = \frac{\inner{v}{u_1}}{\inner{u_1}{u_1}}u_1 + \dots + \frac{\inner{v}{u_k}}{\inner{u_k}{u_k}}u_k.
$$ {#eq-projection}
:::

::: proof
Define $\hat v$ by [[#eq-projection]] and put $z = v - \hat v$. For each $j$, all terms but one of $\inner{\hat v}{u_j}$ vanish, leaving $\inner{\hat v}{u_j} = \inner{v}{u_j}$; hence $\inner{z}{u_j} = 0$. Being orthogonal to every basis vector of $W$, $z$ lies in $W^\perp$. For uniqueness, if $\hat v + z = \hat v' + z'$ with $\hat v, \hat v'\in W$ and $z, z'\in W^\perp$, then $\hat v - \hat v' = z' - z$ lies in $W\cap W^\perp = \{0\}$.
:::

(Every finite-dimensional subspace has an orthogonal basis — the Gram–Schmidt process below constructs one — so the decomposition always exists. Since it is unique, $\proj_W v$ does not depend on which orthogonal basis is used.) The projection solves the closest-point problem.

::: theorem Best approximation {#thm-best-approx}
With $W$ as in [[#thm-decomposition]], $\proj_W v$ is the point of $W$ closest to $v$: for every $w\in W$ with $w\neq\proj_W v$,

$$
\norm{v - \proj_W v} < \norm{v - w}.
$$
:::

::: proof
Write $v - w = (v - \hat v) + (\hat v - w)$. The first term is in $W^\perp$ and the second in $W$, so they are orthogonal and Pythagoras gives $\norm{v - w}^2 = \norm{v - \hat v}^2 + \norm{\hat v - w}^2 > \norm{v - \hat v}^2$, since $\hat v - w\neq 0$.
:::

::: widget projection
u: 3,1
v: 1,2
mode: projection
caption: Drag $\mathbf{v}$ and $\mathbf{u}$. The projection $\hat{\mathbf{v}}$ of $\mathbf{v}$ onto the line through $\mathbf{u}$ is the foot of the perpendicular from $\mathbf{v}$, and the leftover $\mathbf{v} - \hat{\mathbf{v}}$ is always perpendicular to $\mathbf{u}$ — this is [[#eq-decompose-line]]. Of all points on the line, $\hat{\mathbf{v}}$ is the closest to $\mathbf{v}$ ([[#thm-best-approx]]); the distance from $\mathbf{v}$ to the line is the length of the perpendicular part.
:::

::: example Projecting onto a plane {#ex-proj-plane}
Let $W = \Span(\mathbf{u}_1, \mathbf{u}_2)$ with $\mathbf{u}_1 = (1,1,0)$ and $\mathbf{u}_2 = (1,-1,1)$. Find the point of $W$ closest to $\mathbf{y} = (2,3,4)$ and the distance from $\mathbf{y}$ to $W$.
::: solution
The basis is orthogonal: $\mathbf{u}_1\cdot\mathbf{u}_2 = 1 - 1 + 0 = 0$. With $\mathbf{y}\cdot\mathbf{u}_1 = 5$, $\mathbf{y}\cdot\mathbf{u}_2 = 3$, $\norm{\mathbf{u}_1}^2 = 2$ and $\norm{\mathbf{u}_2}^2 = 3$, formula [[#eq-projection]] gives

$$
\hat{\mathbf{y}} = \tfrac52(1,1,0) + 1\cdot(1,-1,1) = \left(\tfrac72, \tfrac32, 1\right).
$$

The perpendicular part is $\mathbf{z} = \mathbf{y} - \hat{\mathbf{y}} = \left(-\tfrac32, \tfrac32, 3\right)$; check $\mathbf{z}\cdot\mathbf{u}_1 = 0$ and $\mathbf{z}\cdot\mathbf{u}_2 = -\tfrac32 - \tfrac32 + 3 = 0$. By [[#thm-best-approx]], $\hat{\mathbf{y}}$ is the closest point and the distance is

$$
\norm{\mathbf{z}} = \sqrt{\tfrac94 + \tfrac94 + 9} = \sqrt{\tfrac{27}{2}} = \tfrac{3\sqrt6}{2}\approx 3.67.
$$
:::
:::

::: warning The projection formula needs an orthogonal basis
Formula [[#eq-projection]] is valid only when $u_1, \dots, u_k$ are mutually orthogonal. For $W = \Span\bigl((1,0), (1,1)\bigr) = \R^2$, applying the formula blindly to $v = (0, 1)$ gives $0\cdot(1,0) + \frac12(1,1) = (\frac12, \frac12)$, which is not $v$ — although $v$ lies in $W$ and so is its own projection. With a non-orthogonal basis, first orthogonalise (Gram–Schmidt), or solve the normal equations of [[linear-algebra/least-squares]].
:::

If $W$ has an **orthonormal** basis $\mathbf{q}_1, \dots, \mathbf{q}_k$ in $\R^n$, the formula becomes $\proj_W\mathbf{v} = \sum(\mathbf{q}_i\T\mathbf{v})\mathbf{q}_i = QQ\T\mathbf{v}$, where $Q = (\mathbf{q}_1\ \cdots\ \mathbf{q}_k)$. So $QQ\T$ is the **projection matrix** onto $W$. Note that $Q\T Q = I_k$ always, but $QQ\T$ is the identity only if $k = n$.

::: corollary Complements in finite dimensions {#cor-complement}
If $V$ is finite-dimensional and $W$ is a subspace, then $V = W\oplus W^\perp$, $\dim W + \dim W^\perp = \dim V$ and $(W^\perp)^\perp = W$.
:::

::: proof
By [[#thm-decomposition]] (with an orthogonal basis of $W$ from the next section), $V = W + W^\perp$, and $W\cap W^\perp = \{0\}$, so the sum is direct and the dimensions add ([[linear-algebra/basis-dimension#thm-sum-dim]]). Clearly $W\subseteq(W^\perp)^\perp$, and by the dimension formula applied twice both have dimension $\dim V - \dim W^\perp = \dim W$, so they are equal.
:::

## The Gram–Schmidt process

Every finite-dimensional inner product space has an orthogonal basis, and there is a simple algorithm to find one: take the vectors of any basis one at a time and subtract from each its projection onto the span of the previous ones.

::: algorithm Gram–Schmidt process {#alg-gram-schmidt}
Input: linearly independent vectors $x_1, \dots, x_k$. Define

$$
\begin{aligned}
v_1 &= x_1,\\
v_2 &= x_2 - \frac{\inner{x_2}{v_1}}{\inner{v_1}{v_1}}v_1,\\
&\;\;\vdots\\
v_j &= x_j - \frac{\inner{x_j}{v_1}}{\inner{v_1}{v_1}}v_1 - \dots - \frac{\inner{x_j}{v_{j-1}}}{\inner{v_{j-1}}{v_{j-1}}}v_{j-1}.
\end{aligned}
$$

Output: the orthogonal vectors $v_1, \dots, v_k$; optionally normalise them, $q_j = v_j/\norm{v_j}$.
:::

::: theorem Gram–Schmidt works {#thm-gram-schmidt}
The vectors $v_1, \dots, v_k$ produced by [[#alg-gram-schmidt]] are non-zero and mutually orthogonal, and for each $j$

$$
\Span(v_1, \dots, v_j) = \Span(x_1, \dots, x_j).
$$

Consequently every finite-dimensional inner product space has an orthonormal basis.
:::

::: proof
By induction on $j$. For $j = 1$, $v_1 = x_1\neq 0$. Suppose $v_1, \dots, v_{j-1}$ are non-zero, orthogonal and span $W_{j-1} = \Span(x_1, \dots, x_{j-1})$. The formula says $v_j = x_j - \proj_{W_{j-1}}x_j$, so by [[#thm-decomposition]] $v_j\in W_{j-1}^\perp$: it is orthogonal to $v_1, \dots, v_{j-1}$. It is non-zero, because $x_j\notin W_{j-1}$ by independence while $\proj_{W_{j-1}}x_j\in W_{j-1}$. Finally $v_j$ is a combination of $x_j$ and $v_1, \dots, v_{j-1}$, and $x_j$ is a combination of $v_j$ and $v_1, \dots, v_{j-1}$; together with the induction hypothesis this gives $\Span(v_1, \dots, v_j) = \Span(x_1, \dots, x_j)$. Applying the process to any basis and normalising gives an orthonormal basis.
:::

::: widget projection
u: 3,1
v: 1,2
mode: gram-schmidt
caption: Gram–Schmidt in the plane. The first basis vector is kept (up to length); from the second we subtract its projection onto the first, leaving a vector perpendicular to it. Normalising gives an orthonormal basis spanning the same plane. Drag $\mathbf{v}$ close to the line of $\mathbf{u}$: the perpendicular part gets very short, and in floating-point arithmetic it would be computed inaccurately — the reason for the "modified" Gram–Schmidt and Householder methods of numerical linear algebra.
:::

In matrix form, Gram–Schmidt is a factorisation.

::: theorem QR factorisation {#thm-qr}
Let $A$ be a real $m\times n$ matrix with linearly independent columns. Then $A = QR$, where $Q$ is $m\times n$ with orthonormal columns (a basis of $\operatorname{Col}(A)$) and $R$ is $n\times n$, upper triangular, with positive diagonal entries.
:::

::: proof
Apply Gram–Schmidt to the columns $\mathbf{a}_1, \dots, \mathbf{a}_n$ and normalise, obtaining $\mathbf{q}_1, \dots, \mathbf{q}_n$, and let $Q$ have these columns. By [[#thm-gram-schmidt]], $\mathbf{a}_j\in\Span(\mathbf{q}_1, \dots, \mathbf{q}_j)$, so by [[#thm-orthogonal-coords]]

$$
\mathbf{a}_j = r_{1j}\mathbf{q}_1 + \dots + r_{jj}\mathbf{q}_j, \qquad r_{ij} = \mathbf{q}_i\cdot\mathbf{a}_j,
$$

which says $A = QR$ with $R = (r_{ij})$ upper triangular. Also $r_{jj} = \mathbf{q}_j\cdot\mathbf{a}_j = \mathbf{q}_j\cdot\mathbf{v}_j = \norm{\mathbf{v}_j} > 0$, because $\mathbf{a}_j - \mathbf{v}_j$ lies in the span of the earlier $\mathbf{q}$'s, which is orthogonal to $\mathbf{q}_j$.
:::

Since $Q\T Q = I$, the triangular factor is simply $R = Q\T A$.

::: example Gram–Schmidt and QR {#ex-qr}
Apply Gram–Schmidt to the columns of $A = \begin{pmatrix}1&1&1\\1&2&4\\1&3&9\\1&4&16\end{pmatrix}$ (the functions $1, x, x^2$ sampled at $x = 1, 2, 3, 4$), and find the QR factorisation.
::: solution
$\mathbf{v}_1 = \mathbf{x}_1 = (1,1,1,1)$, with $\norm{\mathbf{v}_1}^2 = 4$.

$\mathbf{x}_2\cdot\mathbf{v}_1 = 10$, so $\mathbf{v}_2 = (1,2,3,4) - \tfrac{10}{4}(1,1,1,1) = \left(-\tfrac32, -\tfrac12, \tfrac12, \tfrac32\right)$. Scaling does not affect orthogonality, so we may use $\mathbf{v}_2' = (-3,-1,1,3)$ instead, with $\norm{\mathbf{v}_2'}^2 = 20$.

$\mathbf{x}_3\cdot\mathbf{v}_1 = 1 + 4 + 9 + 16 = 30$ and $\mathbf{x}_3\cdot\mathbf{v}_2' = -3 - 4 + 9 + 48 = 50$, so

$$
\mathbf{v}_3 = (1,4,9,16) - \tfrac{30}{4}(1,1,1,1) - \tfrac{50}{20}(-3,-1,1,3) = (1, -1, -1, 1).
$$

Check: $\mathbf{v}_3\cdot\mathbf{v}_1 = 0$ and $\mathbf{v}_3\cdot\mathbf{v}_2' = -3 + 1 - 1 + 3 = 0$. Normalising,

$$
Q = \begin{pmatrix}\tfrac12&-\tfrac{3}{2\sqrt5}&\tfrac12\\[5pt] \tfrac12&-\tfrac{1}{2\sqrt5}&-\tfrac12\\[5pt] \tfrac12&\tfrac{1}{2\sqrt5}&-\tfrac12\\[5pt] \tfrac12&\tfrac{3}{2\sqrt5}&\tfrac12\end{pmatrix}, \qquad R = Q\T A = \begin{pmatrix}2&5&15\\0&\sqrt5&5\sqrt5\\0&0&2\end{pmatrix}.
$$

(For instance $r_{23} = \mathbf{q}_2\cdot\mathbf{x}_3 = 50/(2\sqrt5) = 5\sqrt5$.) The columns $(1,1,1,1)$, $(-3,-1,1,3)$, $(1,-1,-1,1)$ are values of polynomials of degree $0, 1, 2$ that are orthogonal on the points $1,2,3,4$ — they reappear when we fit curves to data in [[linear-algebra/least-squares]].
:::
:::

::: example Legendre polynomials and best approximation {#ex-legendre}
Apply Gram–Schmidt to $1, x, x^2$ in $C[-1,1]$ with $\inner{f}{g} = \int_{-1}^1 fg\,dx$, and find the quadratic polynomial closest to $e^x$ in this inner product.
::: solution
$v_1 = 1$, with $\inner{1}{1} = 2$. Next $\inner{x}{1} = \int_{-1}^1 x\,dx = 0$, so $v_2 = x$, with $\inner{x}{x} = \frac23$. Then $\inner{x^2}{1} = \frac23$ and $\inner{x^2}{x} = 0$, so

$$
v_3 = x^2 - \frac{2/3}{2}\cdot 1 - 0 = x^2 - \tfrac13, \qquad \inner{v_3}{v_3} = \int_{-1}^1\left(x^2 - \tfrac13\right)^2dx = \tfrac{8}{45}.
$$

These are, up to scaling, the **Legendre polynomials** $1$, $x$, $\frac12(3x^2 - 1)$. By [[#thm-best-approx]] the best quadratic approximation of $e^x$ is its projection onto $\Span(v_1, v_2, v_3)$, with coefficients $\inner{e^x}{v_i}/\inner{v_i}{v_i}$. Integrating by parts, $\int_{-1}^1 e^x\,dx = e - e^{-1}$, $\int_{-1}^1 xe^x\,dx = 2e^{-1}$ and $\int_{-1}^1 x^2e^x\,dx = e - 5e^{-1}$, so

$$
p(x) = \frac{e - e^{-1}}{2} + \frac{3}{e}\,x + \frac{15}{4}\left(e - \frac7e\right)\left(x^2 - \frac13\right)\approx 0.996 + 1.104x + 0.537x^2.
$$

Its root-mean-square error on $[-1,1]$, $\norm{e^x - p}/\sqrt2$, is about $0.027$, while the Taylor polynomial $1 + x + \frac12x^2$ — excellent near $0$ but poor near $\pm1$ — has about $2.5$ times as large an error. The projection spreads the error evenly over the interval.
:::
:::

::: widget plot
f: exp(x); sinh(1) + 3*x/e + 15/4*(e - 7/e)*(x^2 - 1/3); 1 + x + x^2/2
x: -1.2, 1.2
y: 0, 3.5
labels: e^x; \text{best } L^2 \text{ quadratic}; \text{Taylor quadratic}
caption: $e^x$ (blue) with two quadratic approximations. The Taylor polynomial matches $e^x$ perfectly at $0$ but drifts away towards $x = \pm1$ (error $0.22$ at $x = 1$). The orthogonal projection of [[#ex-legendre]] is the closest quadratic in the integral sense; its error never exceeds about $0.08$ on $[-1, 1]$. Hover to compare values.
:::

::: application Fourier series and signal compression
On $[-\pi, \pi]$ the functions $1, \cos x, \sin x, \cos 2x, \sin 2x, \dots$ are mutually orthogonal for $\inner{f}{g} = \int_{-\pi}^{\pi}fg\,dx$. The partial sums of the Fourier series of $f$ are exactly the orthogonal projections of $f$ onto the spans of the first few of these functions, so by [[#thm-best-approx]] they are the best approximations of $f$ by trigonometric polynomials in the mean-square sense ([[pde/fourier-series]]). The same principle — expand in an orthogonal basis, keep the large coefficients — underlies JPEG image compression (a cosine basis) and MP3 audio.
:::

::: quiz
$W$ is a plane through the origin in $\R^3$, and $P$ is the matrix of orthogonal projection onto $W$. Which statements are true? (Select all that apply.)
- [x] $\dim W^\perp = 1$
- [x] $P^2 = P$
- [ ] $P$ is invertible
- [x] $P\mathbf{v} = \mathbf{v}$ for every $\mathbf{v}\in W$
::: solution
$\dim W + \dim W^\perp = 3$ gives $\dim W^\perp = 1$ (the normal line). Projecting twice is the same as projecting once, because a vector of $W$ is its own projection; so $P^2 = P$ and $P\mathbf{v} = \mathbf{v}$ on $W$. But $P$ sends the normal vector to $\mathbf{0}$, so it has a non-trivial kernel and is not invertible.
:::
:::

::: history
The inequality of [[#thm-cauchy-schwarz]] for finite sums appeared in Augustin-Louis Cauchy's *Cours d'analyse* (1821). Viktor Bunyakovsky proved the version for integrals in 1859, and Hermann Schwarz rediscovered it in the 1880s in his work on minimal surfaces, which is why the inequality carries different names in different countries. The orthogonalisation process is named after the Danish actuary Jørgen Pedersen Gram, who used it in 1883 in connection with least-squares fitting by series of functions, and Erhard Schmidt, who stated it in its modern form in 1907 in his work on integral equations; Pierre-Simon Laplace had already used the procedure. Infinite-dimensional inner product spaces of functions and sequences were studied by David Hilbert and his school in the 1900s, and John von Neumann gave the axioms of an abstract Hilbert space in the late 1920s, as the mathematical setting for quantum mechanics.
:::

## Where this leads

Orthogonal projection is the key to [[linear-algebra/least-squares]], where an inconsistent system $A\mathbf{x} = \mathbf{b}$ is solved by projecting $\mathbf{b}$ onto $\operatorname{Col}(A)$, and where the QR factorisation provides the numerically reliable method. Symmetric matrices, which satisfy $\inner{A\mathbf{x}}{\mathbf{y}} = \inner{\mathbf{x}}{A\mathbf{y}}$, have orthonormal bases of eigenvectors ([[linear-algebra/spectral-theorem]]), and the singular value decomposition ([[linear-algebra/svd]]) finds orthonormal bases adapted to any matrix. Infinite-dimensional inner product spaces underlie Fourier analysis ([[pde/fourier-series]], [[pde/sturm-liouville]]), the $L^2$ spaces of [[measure-theory/lp-spaces]] and quantum mechanics; the norms defined from inner products are examples of the metrics of [[real-analysis/metric-spaces]].

::: summary
- An inner product is symmetric, linear in each argument and positive; it defines norms $\norm{v} = \sqrt{\inner{v}{v}}$, distances and angles. Examples: dot products, weighted dot products, $\int_a^b fg\,dx$, $\tr(A\T B)$.
- Cauchy–Schwarz $\abs{\inner{u}{v}}\le\norm{u}\norm{v}$ ([[#thm-cauchy-schwarz]]) gives the triangle inequality and makes angles well defined.
- Orthogonal non-zero vectors are independent, and coordinates in an orthogonal basis are $\inner{v}{u_i}/\inner{u_i}{u_i}$ ([[#thm-orthogonal-coords]]).
- Orthogonal matrices ($Q\T Q = I$) preserve lengths and angles and have $\det Q = \pm1$.
- $\operatorname{Row}(A)^\perp = \operatorname{Nul}(A)$ and $\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$ ([[#thm-fundamental]]).
- Every $v$ splits uniquely as $\proj_W v + z$ with $z\perp W$, and $\proj_W v$ is the closest point of $W$ to $v$ ([[#thm-decomposition]], [[#thm-best-approx]]).
- Gram–Schmidt turns any basis into an orthogonal one with the same nested spans ([[#thm-gram-schmidt]]); in matrix form, $A = QR$ ([[#thm-qr]]).
:::

## Exercises

::: exercise An angle in four dimensions {level=1 check="5/6"}
Find $\cos\theta$, where $\theta$ is the angle between $(1,1,1,1)$ and $(1,2,2,0)$, and verify the Cauchy–Schwarz inequality for these vectors.
::: solution
The dot product is $5$ and the lengths are $2$ and $3$, so $\cos\theta = \frac56$. Cauchy–Schwarz says $5\le 2\cdot 3 = 6$, which holds, with strict inequality because the vectors are not parallel.
:::
:::

::: exercise Distance to a line {level=1 check="sqrt(2)/2"}
Find the distance from the point $(2, 3)$ to the line through the origin in the direction $(1,1)$.
::: solution
The projection of $\mathbf{v} = (2,3)$ onto $\mathbf{u} = (1,1)$ is $\frac{5}{2}(1,1)$, and the perpendicular part is $(2,3) - (\frac52,\frac52) = (-\frac12, \frac12)$. The distance is its length, $\sqrt{\frac14 + \frac14} = \frac{\sqrt2}{2}$.
:::
:::

::: exercise An orthogonal matrix {level=1 check="-1"}
Show that $Q = \frac13\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}$ is orthogonal and find $\det Q$.
::: solution
Each column has length $\frac13\sqrt{1 + 4 + 4} = 1$, and the dot products of different columns are $\frac19(2 + 2 - 4) = 0$, $\frac19(2 - 4 + 2) = 0$, $\frac19(4 - 2 - 2) = 0$. So $Q\T Q = I$ and $\det Q = \pm1$. Expanding $\det(3Q) = 1(1 - 4) - 2(2 + 4) + 2(-4 - 2) = -3 - 12 - 12 = -27$ gives $\det Q = -27/27 = -1$. So $Q$ reverses orientation: it is in fact the reflection in the plane perpendicular to $(1, -1, -1)$.
:::
:::

::: exercise Orthonormalise {level=2}
Find an orthonormal basis of $W = \Span\bigl((1,2,2), (3,0,3)\bigr)$ and a basis of $W^\perp$.
::: solution
Gram–Schmidt: $\mathbf{v}_1 = (1,2,2)$, $\norm{\mathbf{v}_1}^2 = 9$; $(3,0,3)\cdot\mathbf{v}_1 = 9$, so $\mathbf{v}_2 = (3,0,3) - (1,2,2) = (2,-2,1)$. Both have length $3$, so $\frac13(1,2,2)$, $\frac13(2,-2,1)$ is an orthonormal basis of $W$. The complement is a line; $\mathbf{n} = (a, b, c)$ must satisfy $a + 2b + 2c = 0$ and $2a - 2b + c = 0$, giving $\mathbf{n} = (2, 1, -2)$ (the cross product of the two vectors, divided by $3$). So $W^\perp = \Span\bigl((2,1,-2)\bigr)$.
:::
:::

::: exercise A complement in four dimensions {level=2}
Find a basis of $W^\perp$ for $W = \Span\bigl((1,0,1,0), (0,1,1,1)\bigr)\subseteq\R^4$, and check that $\dim W + \dim W^\perp = 4$.
::: solution
$\mathbf{x}\in W^\perp$ iff $x_1 + x_3 = 0$ and $x_2 + x_3 + x_4 = 0$, i.e. $\mathbf{x}\in\operatorname{Nul}\begin{pmatrix}1&0&1&0\\0&1&1&1\end{pmatrix}$ (this is [[#thm-fundamental]]). With $x_3, x_4$ free: $x_1 = -x_3$, $x_2 = -x_3 - x_4$, giving the basis $(-1,-1,1,0)$, $(0,-1,0,1)$. Dimensions: $2 + 2 = 4$.
:::
:::

::: exercise Distance to a plane {level=2 check="5/3"}
Find the distance from the point $(1,1,1)$ to the plane $x + 2y + 2z = 0$.
::: solution
The plane is $W = \mathbf{n}^\perp$ with $\mathbf{n} = (1,2,2)$. The component of $\mathbf{y} = (1,1,1)$ perpendicular to $W$ is its projection onto $\mathbf{n}$, namely $\frac{\mathbf{y}\cdot\mathbf{n}}{\mathbf{n}\cdot\mathbf{n}}\mathbf{n} = \frac59\mathbf{n}$, and the distance is its length, $\frac59\cdot 3 = \frac53$.
:::
:::

::: exercise Best linear approximation {level=2 check="-1/6"}
In $C[0,1]$ with $\inner{f}{g} = \int_0^1 fg\,dx$, find the function $a + bx$ closest to $x^2$. What is the constant term $a$?
::: hint
First make $1, x$ orthogonal: replace $x$ by $x - c$ with the right constant $c$.
:::
::: solution
$\inner{x - c}{1} = \frac12 - c$, so $1$ and $x - \frac12$ are orthogonal. Now $\inner{x^2}{1} = \frac13$, $\inner{1}{1} = 1$, $\inner{x^2}{x - \frac12} = \frac14 - \frac16 = \frac1{12}$ and $\inner{x - \frac12}{x - \frac12} = \int_0^1(x - \frac12)^2dx = \frac1{12}$. The projection is

$$
\tfrac13\cdot 1 + \frac{1/12}{1/12}\left(x - \tfrac12\right) = x - \tfrac16.
$$

So the best approximation is $x - \frac16$, with $a = -\frac16$ (and $b = 1$).
:::
:::

::: exercise Parallelogram law {level=3}
Prove that in any inner product space $\norm{u + v}^2 + \norm{u - v}^2 = 2\norm{u}^2 + 2\norm{v}^2$, and interpret it for a parallelogram. Show that the norm $\norm{(x,y)}_1 = \abs{x} + \abs{y}$ on $\R^2$ does not come from any inner product.
::: solution
Expanding, $\norm{u\pm v}^2 = \norm{u}^2\pm 2\inner{u}{v} + \norm{v}^2$; adding the two cancels the middle terms. Geometrically: the sum of the squares of the diagonals of a parallelogram equals the sum of the squares of its four sides. For $\norm{\cdot}_1$ take $u = (1,0)$, $v = (0,1)$: $\norm{u + v}_1^2 + \norm{u - v}_1^2 = 4 + 4 = 8$, but $2\norm{u}_1^2 + 2\norm{v}_1^2 = 4$. Since every norm defined by an inner product satisfies the law, $\norm{\cdot}_1$ is not such a norm.
:::
:::

::: exercise Eigenvalues of orthogonal matrices {level=3}
Let $Q$ be a real orthogonal matrix and $\lambda\in\C$ an eigenvalue of $Q$ (with a possibly complex eigenvector). Prove that $\abs{\lambda} = 1$.
::: solution
Let $Q\mathbf{z} = \lambda\mathbf{z}$ with $\mathbf{z}\in\C^n$, $\mathbf{z}\neq\mathbf{0}$, and use the complex inner product $\inner{\mathbf{z}}{\mathbf{w}} = \overline{\mathbf{w}}\T\mathbf{z}$. Since $Q$ is real, $\overline{Q\mathbf{z}}\T Q\mathbf{z} = \overline{\mathbf{z}}\T Q\T Q\mathbf{z} = \overline{\mathbf{z}}\T\mathbf{z}$, i.e. $\norm{Q\mathbf{z}} = \norm{\mathbf{z}}$. But $\norm{Q\mathbf{z}} = \norm{\lambda\mathbf{z}} = \abs{\lambda}\norm{\mathbf{z}}$. Dividing by $\norm{\mathbf{z}}\neq 0$ gives $\abs{\lambda} = 1$. (For a rotation of the plane by $\theta$ the eigenvalues are $e^{\pm i\theta}$.)
:::
:::

::: exercise Bessel's inequality {level=3}
Let $e_1, \dots, e_k$ be orthonormal in an inner product space $V$. Prove that for every $v\in V$

$$
\sum_{i=1}^k\inner{v}{e_i}^2\le\norm{v}^2,
$$

with equality if and only if $v\in\Span(e_1, \dots, e_k)$.
::: solution
Let $W = \Span(e_1, \dots, e_k)$. By [[#thm-decomposition]], $v = \hat v + z$ with $\hat v = \sum\inner{v}{e_i}e_i$ and $z\perp W$. By Pythagoras (applied repeatedly to orthogonal pieces), $\norm{\hat v}^2 = \sum\inner{v}{e_i}^2$ and $\norm{v}^2 = \norm{\hat v}^2 + \norm{z}^2\ge\norm{\hat v}^2$. Equality holds iff $z = 0$, i.e. iff $v = \hat v\in W$. (For infinite orthonormal families such as the trigonometric functions, letting $k\to\infty$ shows that the squares of the Fourier coefficients of $f$ form a convergent series.)
:::
:::
