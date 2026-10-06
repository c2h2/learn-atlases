Two towns exchange residents every year: $20\%$ of the people in town $A$ move to town $B$, and $30\%$ of the people in $B$ move to $A$. If $\mathbf{x}_k = (a_k, b_k)$ records the populations after $k$ years, then

$$
\mathbf{x}_{k+1} = A\mathbf{x}_k, \qquad A = \begin{pmatrix}0.8&0.3\\0.2&0.7\end{pmatrix},
$$

so $\mathbf{x}_k = A^k\mathbf{x}_0$. What happens in the long run? Computing $A^{100}$ by brute force is unappealing, and it would not explain anything. But two vectors behave very simply under $A$:

$$
A\begin{pmatrix}3\\2\end{pmatrix} = \begin{pmatrix}3\\2\end{pmatrix}, \qquad A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}0.5\\-0.5\end{pmatrix} = 0.5\begin{pmatrix}1\\-1\end{pmatrix}.
$$

$A$ leaves the first unchanged and halves the second. Any starting vector is a combination $\mathbf{x}_0 = c_1(3,2) + c_2(1,-1)$, and then

$$
\mathbf{x}_k = A^k\mathbf{x}_0 = c_1\begin{pmatrix}3\\2\end{pmatrix} + c_2\,(0.5)^k\begin{pmatrix}1\\-1\end{pmatrix} \longrightarrow c_1\begin{pmatrix}3\\2\end{pmatrix}.
$$

Whatever the initial populations, they settle in the ratio $3 : 2$, and the deviation from that ratio halves every year. The vectors $(3,2)$ and $(1,-1)$ are **eigenvectors** of $A$ and the numbers $1$ and $0.5$ are the corresponding **eigenvalues**. This chapter shows how to find them, when there are enough of them to form a basis — in which case the matrix becomes diagonal — and how they control powers, recurrences and dynamical systems.

## Eigenvalues and eigenvectors

::: definition Eigenvalue and eigenvector {#def-eigen}
Let $T$ be a linear operator on a vector space $V$ over $\F$ (for instance $T(\mathbf{x}) = A\mathbf{x}$ for an $n\times n$ matrix $A$). A scalar $\lambda\in\F$ is an **eigenvalue** of $T$ if there is a **non-zero** vector $v\in V$ with

$$
T(v) = \lambda v.
$$

Such a $v$ is an **eigenvector** for $\lambda$. The set $E_\lambda = \ker(T - \lambda I) = \set{v\in V : Tv = \lambda v}$ is the **eigenspace** of $\lambda$; it consists of the eigenvectors for $\lambda$ together with $0$, and it is a subspace (a kernel).
:::

An eigenvector is a direction that $T$ does not turn: it is only stretched, shrunk or reversed, by the factor $\lambda$. Geometry supplies many examples in the plane:

- the projection onto a line $L$ has eigenvalue $1$ (eigenspace $L$) and eigenvalue $0$ (the perpendicular line);
- the reflection in $L$ has eigenvalues $1$ (on $L$) and $-1$ (perpendicular to $L$), as in [[linear-algebra/linear-maps#ex-reflection]];
- the shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has the single eigenvalue $1$ with eigenspace the $x$-axis;
- a rotation by $90^\circ$ turns every non-zero vector, so it has **no** real eigenvalues.

Eigenvalues are not confined to matrices. On the space of infinitely differentiable functions, $D(e^{\lambda x}) = \lambda e^{\lambda x}$, so every real number $\lambda$ is an eigenvalue of differentiation, with eigenvector $e^{\lambda x}$ — which is why exponentials solve linear differential equations.

::: widget transform2d
matrix: 4,1; 2,3
eigen: true
vector: 1,0
caption: Apply the matrix (play the animation or move $t$ to $1$), then drag the vector $\mathbf{v}$. In most directions $A\mathbf{x}$ points somewhere else; only along the two highlighted lines is $A\mathbf{x}$ parallel to $\mathbf{x}$. Along $(1,1)$ vectors are stretched by $5$, and along $(1,-2)$ by $2$ — these are the eigenvectors of [[#ex-2x2]]. Edit the matrix to a rotation such as $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ and the eigenvector lines disappear.
:::

How do we find eigenvalues? $\lambda$ is an eigenvalue exactly when the equation $(A - \lambda I)\mathbf{v} = \mathbf{0}$ has a non-trivial solution, and determinants detect exactly that.

::: theorem The characteristic equation {#thm-char-eq}
Let $A$ be an $n\times n$ matrix. A scalar $\lambda$ is an eigenvalue of $A$ if and only if

$$
\det(A - \lambda I) = 0.
$$
:::

::: proof
$\lambda$ is an eigenvalue iff $(A - \lambda I)\mathbf{v} = \mathbf{0}$ for some $\mathbf{v}\neq\mathbf{0}$, iff $A - \lambda I$ is singular (by [[linear-algebra/matrices#thm-imt]]), iff $\det(A - \lambda I) = 0$ (by [[linear-algebra/determinants#thm-det-invertible]]).
:::

::: definition Characteristic polynomial {#def-charpoly}
The **characteristic polynomial** of an $n\times n$ matrix $A$ is $p_A(\lambda) = \det(A - \lambda I)$.
:::

Expanding the determinant shows that $p_A$ is a polynomial in $\lambda$ of degree $n$. (Some books use $\det(\lambda I - A)$, which differs by the factor $(-1)^n$ and has the same roots.) For a $2\times 2$ matrix,

$$
p_A(\lambda) = \begin{vmatrix}a - \lambda & b\\ c & d-\lambda\end{vmatrix} = \lambda^2 - (a + d)\lambda + (ad - bc) = \lambda^2 - (\tr A)\lambda + \det A.
$$ {#eq-char2}

So the recipe is: **find the eigenvalues as the roots of $p_A$; then, for each eigenvalue, find the eigenspace as the null space of $A - \lambda I$** by elimination.

::: example A 2×2 matrix {#ex-2x2}
Find the eigenvalues and eigenvectors of $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$.
::: solution
By [[#eq-char2]], $p_A(\lambda) = \lambda^2 - 7\lambda + 10 = (\lambda - 2)(\lambda - 5)$, so the eigenvalues are $2$ and $5$.

For $\lambda = 5$: $A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$, which reduces to $\begin{pmatrix}1&-1\\0&0\end{pmatrix}$; so $v_1 = v_2$ and $E_5 = \Span\bigl((1,1)\bigr)$.

For $\lambda = 2$: $A - 2I = \begin{pmatrix}2&1\\2&1\end{pmatrix}$, so $2v_1 + v_2 = 0$ and $E_2 = \Span\bigl((1,-2)\bigr)$.

*Check:* $A(1,1) = (5,5)$ and $A(1,-2) = (2, -4)$. Note that $2 + 5 = 7 = \tr A$ and $2\cdot 5 = 10 = \det A$.
:::
:::

That check is no coincidence.

::: proposition Trace, determinant and similarity {#prop-trace-det}
1. Similar matrices have the same characteristic polynomial, hence the same eigenvalues.
2. If $p_A$ factors over $\C$ as $p_A(\lambda) = (\lambda_1 - \lambda)(\lambda_2 - \lambda)\cdots(\lambda_n - \lambda)$, listing the eigenvalues with repetition, then

$$
\det A = \lambda_1\lambda_2\cdots\lambda_n \qquad\text{and}\qquad \tr A = \lambda_1 + \lambda_2 + \dots + \lambda_n.
$$
3. The eigenvalues of a triangular matrix are its diagonal entries.
:::

::: proof
1. If $B = P^{-1}AP$, then $B - \lambda I = P^{-1}(A - \lambda I)P$, so by the product rule $\det(B - \lambda I) = \det(A - \lambda I)$.
2. Put $\lambda = 0$: $\det A = p_A(0) = \lambda_1\cdots\lambda_n$. For the trace, compare the coefficients of $\lambda^{n-1}$. On the right it is $(-1)^{n-1}(\lambda_1 + \dots + \lambda_n)$. On the left, in the Leibniz expansion of $\det(A - \lambda I)$ every permutation other than the identity misses at least two diagonal entries, so its term has degree at most $n - 2$ in $\lambda$; the coefficient of $\lambda^{n-1}$ therefore comes from the diagonal product $(a_{11} - \lambda)\cdots(a_{nn} - \lambda)$ alone, and equals $(-1)^{n-1}(a_{11} + \dots + a_{nn})$.
3. $A - \lambda I$ is triangular, so $p_A(\lambda) = (a_{11} - \lambda)\cdots(a_{nn} - \lambda)$ by [[linear-algebra/determinants#thm-triangular]].
:::

Part 1 means that eigenvalues belong to the *operator*, not to the matrix that represents it in a particular basis — as they must, since $Tv = \lambda v$ makes no reference to a basis.

::: warning Row reduction changes eigenvalues
Row operations preserve solution sets, null spaces and rank, but **not** eigenvalues: $\begin{pmatrix}4&1\\2&3\end{pmatrix}$ has eigenvalues $2$ and $5$, while its echelon form $\begin{pmatrix}4&1\\0&5/2\end{pmatrix}$ has eigenvalues $4$ and $\tfrac52$. Find the eigenvalues from $\det(A - \lambda I)$ first; use elimination only afterwards, on $A - \lambda I$, to find each eigenspace.
:::

::: widget plot
f: x^2 - t*x + d
x: -2, 9
y: -6, 12
sliders: t=7:-4:10:0.5; d=10:-5:20:0.5
labels: p(\lambda) = \lambda^2 - t\lambda + d
hlines: 0
caption: The characteristic polynomial of a $2\times 2$ matrix with trace $t$ and determinant $d$ (here $x$ plays the role of $\lambda$). Its roots are the eigenvalues — at the start $2$ and $5$, as in [[#ex-2x2]]. Increase $d$ past $t^2/4 = 12.25$: the parabola lifts off the axis and the eigenvalues become a complex conjugate pair. At $d = t^2/4$ exactly there is a repeated eigenvalue.
:::

::: quiz
$\mathbf{v}$ is an eigenvector of $A$ with eigenvalue $3$. What is $A^2\mathbf{v} - 2A\mathbf{v}$?
- [ ] $\mathbf{0}$
- [x] $3\mathbf{v}$
- [ ] $9\mathbf{v}$
- [ ] It cannot be determined without knowing $A$.
::: solution
$A\mathbf{v} = 3\mathbf{v}$, so $A^2\mathbf{v} = A(3\mathbf{v}) = 3A\mathbf{v} = 9\mathbf{v}$. Hence $A^2\mathbf{v} - 2A\mathbf{v} = 9\mathbf{v} - 6\mathbf{v} = 3\mathbf{v}$. In general $q(A)\mathbf{v} = q(\lambda)\mathbf{v}$ for any polynomial $q$ — here $q(x) = x^2 - 2x$ and $q(3) = 3$.
:::
:::

## Multiplicities

An eigenvalue can be repeated in two different senses.

::: definition Algebraic and geometric multiplicity {#def-multiplicity}
Let $\lambda$ be an eigenvalue of $A$. Its **algebraic multiplicity** is its multiplicity as a root of $p_A$ (the exponent of $(\lambda - t)$ in the factorisation of $p_A(t)$), and its **geometric multiplicity** is $\dim E_\lambda = \dim\operatorname{Nul}(A - \lambda I)$, the number of independent eigenvectors for $\lambda$.
:::

For the shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$, $p(t) = (1 - t)^2$, so the eigenvalue $1$ has algebraic multiplicity $2$; but $A - I = \begin{pmatrix}0&1\\0&0\end{pmatrix}$ has a $1$-dimensional null space, so the geometric multiplicity is $1$. The reverse inequality never happens.

::: theorem Geometric multiplicity is at most algebraic {#thm-geo-alg}
For every eigenvalue $\lambda$ of an $n\times n$ matrix $A$, $\quad 1\le\dim E_\lambda\le$ (algebraic multiplicity of $\lambda$).
:::

::: proof
$\dim E_\lambda\ge 1$ because an eigenvalue has an eigenvector. Let $k = \dim E_\lambda$, choose a basis $\mathbf{v}_1, \dots, \mathbf{v}_k$ of $E_\lambda$ and extend it to a basis $\mathbf{v}_1, \dots, \mathbf{v}_n$ of $\F^n$ ([[linear-algebra/basis-dimension#thm-dim-facts]]). Let $P$ be the invertible matrix with these columns. Since $A\mathbf{v}_j = \lambda\mathbf{v}_j$ for $j\le k$, the first $k$ columns of $P^{-1}AP$ are $\lambda\mathbf{e}_1, \dots, \lambda\mathbf{e}_k$:

$$
P^{-1}AP = \begin{pmatrix}\lambda I_k & B\\ O & C\end{pmatrix}
$$

for some blocks $B$ and $C$. Expanding $\det(P^{-1}AP - tI)$ along the first column $k$ times (each time the only non-zero entry is $\lambda - t$ at the top) gives $p_A(t) = (\lambda - t)^k\det(C - tI)$, using [[#prop-trace-det]]. So $(\lambda - t)^k$ divides $p_A(t)$, and the algebraic multiplicity is at least $k$.
:::

## Diagonalisation

The ideal situation is the one in the introduction: enough eigenvectors to form a basis.

::: definition Diagonalisable {#def-diagonalisable}
A square matrix $A$ is **diagonalisable** if it is similar to a diagonal matrix, that is, if $A = PDP^{-1}$ for some invertible $P$ and diagonal $D$. A linear operator on a finite-dimensional space is diagonalisable if the space has a basis consisting of eigenvectors of the operator.
:::

::: theorem Diagonalisation theorem {#thm-diagonalisation}
An $n\times n$ matrix $A$ is diagonalisable if and only if it has $n$ linearly independent eigenvectors. In that case $A = PDP^{-1}$, where the columns of $P$ are $n$ independent eigenvectors and the diagonal entries of $D$ are the corresponding eigenvalues, in the same order.
:::

::: proof
Let $P$ have columns $\mathbf{v}_1, \dots, \mathbf{v}_n$ and let $D = \diag(\lambda_1, \dots, \lambda_n)$. Column $j$ of $AP$ is $A\mathbf{v}_j$, and column $j$ of $PD$ is $\lambda_j\mathbf{v}_j$. So

$$
AP = PD \iff A\mathbf{v}_j = \lambda_j\mathbf{v}_j \text{ for every } j.
$$

If $A$ has independent eigenvectors $\mathbf{v}_1,\dots,\mathbf{v}_n$, then $P$ is invertible (its columns are independent, [[linear-algebra/matrices#thm-imt]]) and $AP = PD$ gives $A = PDP^{-1}$. Conversely, if $A = PDP^{-1}$ then $AP = PD$, so the columns of $P$ are eigenvectors (non-zero, since $P$ is invertible) and they are independent.
:::

In the language of [[linear-algebra/linear-maps#thm-change-basis]]: $D$ is the matrix of $\mathbf{x}\mapsto A\mathbf{x}$ in the basis of eigenvectors. Where do independent eigenvectors come from? Distinct eigenvalues supply them automatically.

::: theorem Distinct eigenvalues give independent eigenvectors {#thm-distinct}
If $v_1, \dots, v_k$ are eigenvectors of $T$ with distinct eigenvalues $\lambda_1, \dots, \lambda_k$, then $v_1, \dots, v_k$ are linearly independent.
:::

::: proof
Suppose not. By the linear dependence lemma ([[linear-algebra/vector-spaces#lem-dependence]]) there is a smallest $j$ with $v_j\in\Span(v_1, \dots, v_{j-1})$; then $v_1, \dots, v_{j-1}$ are independent (by minimality of $j$) and $v_j = c_1v_1 + \dots + c_{j-1}v_{j-1}$. Apply $T$, and also multiply by $\lambda_j$:

$$
\lambda_jv_j = c_1\lambda_1v_1 + \dots + c_{j-1}\lambda_{j-1}v_{j-1}, \qquad \lambda_jv_j = c_1\lambda_jv_1 + \dots + c_{j-1}\lambda_jv_{j-1}.
$$

Subtracting, $0 = c_1(\lambda_1 - \lambda_j)v_1 + \dots + c_{j-1}(\lambda_{j-1} - \lambda_j)v_{j-1}$. By independence each $c_i(\lambda_i - \lambda_j) = 0$, and since the eigenvalues are distinct, each $c_i = 0$. Then $v_j = 0$, which is impossible for an eigenvector.
:::

::: corollary {#cor-distinct}
An $n\times n$ matrix with $n$ distinct eigenvalues is diagonalisable.
:::

::: proof
Choose one eigenvector for each eigenvalue. By [[#thm-distinct]] these $n$ vectors are independent, so [[#thm-diagonalisation]] applies.
:::

With repeated eigenvalues we need to count more carefully. The complete answer is the following criterion.

::: theorem Criterion for diagonalisability {#thm-diag-criterion}
An $n\times n$ matrix $A$ over $\F$ is diagonalisable over $\F$ if and only if

1. its characteristic polynomial splits into linear factors over $\F$, $p_A(t) = (\lambda_1 - t)^{m_1}\cdots(\lambda_r - t)^{m_r}$ with $\lambda_1, \dots, \lambda_r\in\F$ distinct; and
2. for every eigenvalue, geometric multiplicity equals algebraic multiplicity: $\dim E_{\lambda_i} = m_i$.

In that case, putting together bases of the eigenspaces gives a basis of $\F^n$ consisting of eigenvectors.
:::

::: proof
First a lemma: *if $w_i\in E_{\lambda_i}$ for $i = 1, \dots, r$ and $w_1 + \dots + w_r = 0$, then every $w_i = 0$.* Indeed, the non-zero $w_i$ would be eigenvectors with distinct eigenvalues satisfying a dependence relation (all coefficients $1$), contradicting [[#thm-distinct]]. It follows that if we choose a basis of each eigenspace, the combined list $\mathcal{L}$ is independent: in a relation, group the terms by eigenspace to get vectors $w_i \in E_{\lambda_i}$ with $\sum w_i = 0$; then each $w_i = 0$, and independence of each basis makes all coefficients zero.

Suppose 1 and 2 hold. Then $\mathcal{L}$ has $\sum\dim E_{\lambda_i} = \sum m_i = \deg p_A = n$ independent eigenvectors, so $A$ is diagonalisable by [[#thm-diagonalisation]].

Conversely, let $A = PDP^{-1}$ with $D$ diagonal. By [[#prop-trace-det]], $p_A = p_D = \prod_j (d_{jj} - t)$, which splits. For each eigenvalue $\lambda$, the algebraic multiplicity is the number of diagonal entries of $D$ equal to $\lambda$, and this is also $\dim\operatorname{Nul}(D - \lambda I)$. Finally $\mathbf{x}\mapsto P\mathbf{x}$ maps $\operatorname{Nul}(D - \lambda I)$ isomorphically onto $\operatorname{Nul}(A - \lambda I)$, because $(A - \lambda I)P\mathbf{x} = P(D - \lambda I)\mathbf{x}$. So the multiplicities agree.
:::

Condition 1 always holds over $\C$, by the fundamental theorem of algebra ([[complex-analysis/cauchy-theorem]]); over $\R$ it fails for rotations. Condition 2 is the real obstacle, as the next two examples show: the same characteristic polynomial, with opposite outcomes.

::: example Diagonalising a 3×3 matrix {#ex-diag3}
Diagonalise $A = \begin{pmatrix}2&1&-1\\0&0&2\\0&-1&3\end{pmatrix}$.
::: solution
*Eigenvalues.* Expand $\det(A - tI)$ along the first column:

$$
p_A(t) = (2 - t)\begin{vmatrix}-t&2\\-1&3 - t\end{vmatrix} = (2 - t)\bigl(t^2 - 3t + 2\bigr) = (2 - t)^2(1 - t).
$$

So $\lambda = 2$ has algebraic multiplicity $2$ and $\lambda = 1$ has multiplicity $1$.

*Eigenspaces.* For $\lambda = 2$:

$$
A - 2I = \begin{pmatrix}0&1&-1\\0&-2&2\\0&-1&1\end{pmatrix}\sim\begin{pmatrix}0&1&-1\\0&0&0\\0&0&0\end{pmatrix},
$$

so $x_2 = x_3$ with $x_1, x_3$ free: $E_2 = \Span\bigl((1,0,0),\ (0,1,1)\bigr)$, of dimension $2$. For $\lambda = 1$: $A - I = \begin{pmatrix}1&1&-1\\0&-1&2\\0&-1&2\end{pmatrix}$, giving $x_2 = 2x_3$ and $x_1 = -x_2 + x_3 = -x_3$, so $E_1 = \Span\bigl((-1, 2, 1)\bigr)$.

*Conclusion.* Geometric and algebraic multiplicities agree ($2 = 2$ and $1 = 1$), so $A$ is diagonalisable:

$$
A = PDP^{-1}, \qquad P = \begin{pmatrix}1&0&-1\\0&1&2\\0&1&1\end{pmatrix}, \qquad D = \begin{pmatrix}2&0&0\\0&2&0\\0&0&1\end{pmatrix}.
$$

*Check* one column: $A(-1, 2, 1) = (-2 + 2 - 1,\ 0 + 0 + 2,\ 0 - 2 + 3) = (-1, 2, 1)$. Rather than computing $P^{-1}$, it is easier to verify $AP = PD$ column by column.
:::
:::

::: example A matrix that cannot be diagonalised {#ex-defective}
Show that $B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$ has the same characteristic polynomial as $A$ in [[#ex-diag3]] but is not diagonalisable.
::: solution
Expanding along the second row (whose only non-zero entry is $2 - t$),

$$
p_B(t) = (2 - t)\begin{vmatrix}-t&2\\-1&3 - t\end{vmatrix} = (2 - t)(t^2 - 3t + 2) = (2 - t)^2(1 - t).
$$

For $\lambda = 2$:

$$
B - 2I = \begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\sim\begin{pmatrix}1&0&-1\\0&1&0\\0&0&0\end{pmatrix},
$$

which has rank $2$, so $E_2 = \Span\bigl((1, 0, 1)\bigr)$ is only $1$-dimensional, while the algebraic multiplicity is $2$. By [[#thm-diag-criterion]], $B$ is not diagonalisable: its eigenvectors, $(1,0,1)$ and the eigenvector $(2,0,1)$ for $\lambda = 1$, span only a plane. Such a matrix is called **defective**; the best substitute for diagonalisation is the Jordan form of [[linear-algebra/jordan-form]].
:::
:::

::: quiz
A $3\times 3$ real matrix has eigenvalues $1$, $2$ and $3$. Which statements must be true? (Select all that apply.)
- [x] It is diagonalisable.
- [x] It is invertible.
- [x] Its determinant is $6$ and its trace is $6$.
- [ ] It is symmetric.
::: solution
Three distinct eigenvalues give three independent eigenvectors, so it is diagonalisable ([[#cor-distinct]]). By [[#prop-trace-det]], $\det A = 1\cdot2\cdot3 = 6\neq 0$, so it is invertible, and $\tr A = 1 + 2 + 3 = 6$. But it need not be symmetric: $\begin{pmatrix}1&1&0\\0&2&1\\0&0&3\end{pmatrix}$ is a counterexample.
:::
:::

## Powers of a matrix

If $A = PDP^{-1}$, the factors $P^{-1}P$ cancel in pairs in a product of $k$ copies of $A$:

$$
A^k = PD^kP^{-1}, \qquad D^k = \diag(\lambda_1^k, \dots, \lambda_n^k).
$$ {#eq-powers}

Equivalently, in coordinates relative to the eigenvector basis, $A^k$ simply multiplies the $j$-th coordinate by $\lambda_j^k$. This makes long-term behaviour transparent: the components along eigenvectors with $\abs{\lambda} < 1$ die out, those with $\abs{\lambda} > 1$ grow, and the largest $\abs{\lambda}$ eventually dominates.

::: example Fibonacci numbers {#ex-fibonacci}
The Fibonacci numbers are $F_0 = 0$, $F_1 = 1$ and $F_{k+1} = F_k + F_{k-1}$. Find a formula for $F_k$.
::: solution
Put $\mathbf{u}_k = (F_{k+1}, F_k)$. The recurrence says

$$
\mathbf{u}_k = \begin{pmatrix}1&1\\1&0\end{pmatrix}\mathbf{u}_{k-1}, \qquad\text{so}\qquad \mathbf{u}_k = A^k\mathbf{u}_0, \quad \mathbf{u}_0 = \begin{pmatrix}1\\0\end{pmatrix}.
$$

Here $p_A(\lambda) = \lambda^2 - \lambda - 1$, with roots $\varphi = \frac{1 + \sqrt5}{2}\approx 1.618$ and $\psi = \frac{1-\sqrt5}{2}\approx -0.618$. Since $\lambda^2 = \lambda + 1$ for both, $A(\lambda, 1) = (\lambda + 1, \lambda) = \lambda(\lambda, 1)$: the eigenvectors are $(\varphi, 1)$ and $(\psi, 1)$. Write $\mathbf{u}_0$ in terms of them: $(1, 0) = \frac{1}{\varphi - \psi}\bigl[(\varphi, 1) - (\psi, 1)\bigr]$, with $\varphi - \psi = \sqrt5$. Then

$$
\mathbf{u}_k = \frac{1}{\sqrt5}\left[\varphi^k\begin{pmatrix}\varphi\\1\end{pmatrix} - \psi^k\begin{pmatrix}\psi\\1\end{pmatrix}\right],
$$

and the second entry gives **Binet's formula**

$$
F_k = \frac{\varphi^k - \psi^k}{\sqrt5}.
$$

Since $\abs{\psi} < 1$, the term $\psi^k/\sqrt5$ is tiny ($F_k$ is the nearest integer to $\varphi^k/\sqrt5$), and $F_{k+1}/F_k\to\varphi$, the golden ratio. *Check:* $k = 2$ gives $\frac{\varphi^2 - \psi^2}{\sqrt5} = \frac{(\varphi - \psi)(\varphi + \psi)}{\sqrt5} = \varphi + \psi = 1 = F_2$.
:::
:::

The introductory example is a **Markov chain**: the columns of $A$ are non-negative and sum to $1$, so the total population is conserved. Such a matrix always has the eigenvalue $1$ (each column of $A - I$ sums to $0$, so the rows of $A - I$ add up to the zero row and $A - I$ is singular), and an eigenvector for $1$ with entries summing to $1$ is a **steady state**. For the two towns it is $(0.6, 0.4)$. The figure below shows the same chain in the convention of probability theory, where the transition matrix acts on row vectors and so is the transpose of $A$.

::: widget markov
matrix: 0.8,0.2; 0.3,0.7
states: Town A; Town B
start: 0
steps: 20
caption: The two-town chain of the introduction, started with everyone in town A. The distribution converges to the stationary distribution $(0.6, 0.4)$ — the eigenvector for eigenvalue $1$, scaled so its entries sum to $1$. The other eigenvalue, $0.5$, sets the speed: the distance from equilibrium halves at each step.
:::

::: application Google's PageRank
A random surfer on the web follows a random link from each page (and occasionally jumps to a random page). The long-run fraction of time spent on each page is the steady state of a gigantic Markov chain — an eigenvector for the eigenvalue $1$ of a matrix with billions of rows. Ranking pages by this eigenvector was the original idea behind Google's search engine. It is computed by the **power method**, which simply applies the matrix repeatedly: by [[#eq-powers]], $A^k\mathbf{x}_0$ lines up with the eigenvector of the dominant eigenvalue. See [[probability/markov-chains]] and [[numerical-analysis/iterative-methods]].
:::

## Complex eigenvalues

A real matrix can have complex eigenvalues, and they come in conjugate pairs: $p_A$ has real coefficients, so if $p_A(\lambda) = 0$ then $p_A(\bar\lambda) = \overline{p_A(\lambda)} = 0$; and conjugating $A\mathbf{v} = \lambda\mathbf{v}$ gives $A\bar{\mathbf{v}} = \bar\lambda\bar{\mathbf{v}}$. Over $\C$ the rotation $R_\theta$ of [[linear-algebra/linear-maps#eq-rotation]] has eigenvalues $e^{\pm i\theta} = \cos\theta\pm i\sin\theta$; when $\theta$ is not a multiple of $\pi$ these are not real, and $R_\theta$ is diagonalisable over $\C$ but not over $\R$. In real terms, a pair of complex eigenvalues means rotation combined with scaling.

::: proposition Rotation–scaling form {#prop-rotation-scaling}
Let $A$ be a real $2\times 2$ matrix with a non-real eigenvalue $\lambda = a - bi$ ($b\neq 0$) and eigenvector $\mathbf{v} = \mathbf{x} + i\mathbf{y}$ with $\mathbf{x}, \mathbf{y}\in\R^2$. Then $P = (\mathbf{x}\ \ \mathbf{y})$ is invertible and

$$
P^{-1}AP = \begin{pmatrix}a&-b\\b&a\end{pmatrix} = r\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix},
$$

where $r = \abs{\lambda} = \sqrt{a^2 + b^2}$ and $\theta$ is the angle with $\cos\theta = a/r$, $\sin\theta = b/r$.
:::

::: proof
Comparing real and imaginary parts of $A(\mathbf{x} + i\mathbf{y}) = (a - bi)(\mathbf{x} + i\mathbf{y}) = (a\mathbf{x} + b\mathbf{y}) + i(a\mathbf{y} - b\mathbf{x})$ gives $A\mathbf{x} = a\mathbf{x} + b\mathbf{y}$ and $A\mathbf{y} = -b\mathbf{x} + a\mathbf{y}$, which say exactly that $AP = P\begin{pmatrix}a&-b\\b&a\end{pmatrix}$. If $\mathbf{x}, \mathbf{y}$ were dependent over $\R$, then $\mathbf{v}$ would be a complex multiple of a real vector $\mathbf{w}\neq\mathbf{0}$, and $A\mathbf{w} = \lambda\mathbf{w}$ with $A$ and $\mathbf{w}$ real would force $\lambda$ to be real. So $P$ is invertible.
:::

::: example Spiralling outwards {#ex-complex}
Find the eigenvalues of $A = \begin{pmatrix}1&-2\\1&3\end{pmatrix}$ and describe the behaviour of $A^k\mathbf{x}$.
::: solution
$p_A(\lambda) = \lambda^2 - 4\lambda + 5$, with roots $\lambda = 2\pm i$. For $\lambda = 2 - i$: $A - \lambda I = \begin{pmatrix}-1 + i & -2\\ 1 & 1 + i\end{pmatrix}$; the second row gives $v_1 = -(1 + i)v_2$, so $\mathbf{v} = (-1 - i, 1) = (-1, 1) + i(-1, 0)$. With $P = \begin{pmatrix}-1&-1\\1&0\end{pmatrix}$, [[#prop-rotation-scaling]] gives

$$
P^{-1}AP = \begin{pmatrix}2&-1\\1&2\end{pmatrix} = \sqrt5\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}, \qquad \tan\theta = \tfrac12.
$$

(Check: $AP = \begin{pmatrix}-3&-1\\2&-1\end{pmatrix}$ and $P\begin{pmatrix}2&-1\\1&2\end{pmatrix} = \begin{pmatrix}-3&-1\\2&-1\end{pmatrix}$.) So in the coordinates given by $P$, each application of $A$ rotates by $\theta\approx 26.6^\circ$ and stretches by $\abs{\lambda} = \sqrt5$: the points $A^k\mathbf{x}$ spiral outwards along a distorted spiral. Had $\abs{\lambda}$ been less than $1$ they would spiral in to $\mathbf{0}$.
:::
:::

::: application Linear differential equations
For the system $\mathbf{x}'(t) = A\mathbf{x}(t)$, an eigenvector $\mathbf{v}$ with eigenvalue $\lambda$ gives the solution $\mathbf{x}(t) = e^{\lambda t}\mathbf{v}$, since both sides equal $\lambda e^{\lambda t}\mathbf{v}$. If $A$ is diagonalisable, every solution is a combination of these, and the signs of the real parts of the eigenvalues decide stability: all negative means every solution decays to $\mathbf{0}$. Complex eigenvalues produce oscillations — the spirals of the phase plane. This is the subject of [[ode/linear-systems]].
:::

::: history
Eigenvalue problems arose in eighteenth-century mechanics. Leonhard Euler studied the rotation of rigid bodies and found their principal axes, and Joseph-Louis Lagrange recognised these axes as what we now call the eigenvectors of the inertia matrix; characteristic equations also appeared in Lagrange's and Pierre-Simon Laplace's work on small oscillations and on the slow ("secular") perturbations of planetary orbits. Augustin-Louis Cauchy generalised these ideas to any number of variables in 1829, proving in particular that the roots are real for symmetric systems. He called them *characteristic roots*, a name that survives in "characteristic polynomial". The German prefix *eigen-* ("own", "proper") was introduced by David Hilbert in 1904, in his work on integral equations (*Eigenwert*, *Eigenfunktion*); English kept the hybrid words "eigenvalue" and "eigenvector", although "characteristic value" and "proper value" remained in use for a long time.
:::

## Where this leads

Symmetric matrices are always diagonalisable, and by an orthogonal matrix — the spectral theorem of [[linear-algebra/spectral-theorem]]; the singular value decomposition ([[linear-algebra/svd]]) extends the idea to all rectangular matrices. Matrices that are not diagonalisable are brought to Jordan form in [[linear-algebra/jordan-form]], where the Cayley–Hamilton theorem also appears. Eigenvalues govern the stability of equilibria of differential equations ([[ode/linear-systems]], [[ode/nonlinear-systems]]), the long-run behaviour of Markov chains ([[probability/markov-chains]]), linear recurrences ([[discrete/recurrences]]), vibration modes and quantum energy levels; and the computation of eigenvalues of large matrices is a major topic of numerical analysis.

::: summary
- $\lambda$ is an eigenvalue of $A$ when $A\mathbf{v} = \lambda\mathbf{v}$ for some $\mathbf{v}\neq\mathbf{0}$; the eigenspace $E_\lambda = \operatorname{Nul}(A - \lambda I)$.
- Eigenvalues are the roots of the characteristic polynomial $\det(A - \lambda I)$ ([[#thm-char-eq]]); for $2\times2$ matrices it is $\lambda^2 - (\tr A)\lambda + \det A$.
- Similar matrices have the same characteristic polynomial; the product of the eigenvalues is $\det A$ and their sum is $\tr A$ ([[#prop-trace-det]]).
- $A = PDP^{-1}$ with $D$ diagonal exactly when $A$ has $n$ independent eigenvectors, which form the columns of $P$ ([[#thm-diagonalisation]]).
- Eigenvectors for distinct eigenvalues are independent; $n$ distinct eigenvalues guarantee diagonalisability ([[#thm-distinct]]).
- In general: diagonalisable iff $p_A$ splits and geometric $=$ algebraic multiplicity for each eigenvalue ([[#thm-diag-criterion]]); always $1\le$ geometric $\le$ algebraic.
- $A^k = PD^kP^{-1}$ turns powers, recurrences and Markov chains into scalar problems; complex eigenvalues of real matrices mean rotation with scaling by $\abs{\lambda}$.
:::

## Exercises

::: exercise A symmetric 2×2 matrix {level=1 check="3"}
Find the eigenvalues and eigenvectors of $\begin{pmatrix}1&2\\2&1\end{pmatrix}$. What is the largest eigenvalue?
::: solution
$p(\lambda) = \lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1)$. For $\lambda = 3$: $A - 3I = \begin{pmatrix}-2&2\\2&-2\end{pmatrix}$, eigenvector $(1, 1)$. For $\lambda = -1$: $A + I = \begin{pmatrix}2&2\\2&2\end{pmatrix}$, eigenvector $(1, -1)$. The largest eigenvalue is $3$. (The eigenvectors are perpendicular — a feature of symmetric matrices explained in [[linear-algebra/spectral-theorem]].)
:::
:::

::: exercise Testing a candidate {level=1}
Is $\lambda = 2$ an eigenvalue of $\begin{pmatrix}3&2\\3&8\end{pmatrix}$? If so, find an eigenvector, and find the other eigenvalue without solving a quadratic.
::: solution
$A - 2I = \begin{pmatrix}1&2\\3&6\end{pmatrix}$ has determinant $6 - 6 = 0$, so $2$ is an eigenvalue; its null space is spanned by $(-2, 1)$ (check: $A(-2,1) = (-4, 2)$). Since the eigenvalues sum to $\tr A = 11$, the other is $9$ (and indeed $2\cdot 9 = 18 = \det A$).
:::
:::

::: exercise Determinant from eigenvalues {level=1 check="-8"}
A $3\times 3$ matrix has eigenvalues $2$, $-1$ and $4$. Find its trace and its determinant. What is the determinant?
::: solution
By [[#prop-trace-det]], $\det A = 2\cdot(-1)\cdot 4 = -8$ and $\tr A = 2 - 1 + 4 = 5$.
:::
:::

::: exercise A large power {level=2 check="2047"}
Diagonalise $A = \begin{pmatrix}3&-2\\1&0\end{pmatrix}$ and find a formula for $A^k$. What is the $(1,1)$ entry of $A^{10}$?
::: solution
$p(\lambda) = \lambda^2 - 3\lambda + 2 = (\lambda - 1)(\lambda - 2)$. Eigenvectors: for $\lambda = 1$, $A - I = \begin{pmatrix}2&-2\\1&-1\end{pmatrix}$ gives $(1,1)$; for $\lambda = 2$, $A - 2I = \begin{pmatrix}1&-2\\1&-2\end{pmatrix}$ gives $(2, 1)$. With $P = \begin{pmatrix}1&2\\1&1\end{pmatrix}$, $P^{-1} = \begin{pmatrix}-1&2\\1&-1\end{pmatrix}$:

$$
A^k = P\begin{pmatrix}1&0\\0&2^k\end{pmatrix}P^{-1} = \begin{pmatrix}1&2^{k+1}\\1&2^k\end{pmatrix}\begin{pmatrix}-1&2\\1&-1\end{pmatrix} = \begin{pmatrix}2^{k+1} - 1 & 2 - 2^{k+1}\\ 2^k - 1 & 2 - 2^k\end{pmatrix}.
$$

For $k = 1$ this gives back $A$. The $(1,1)$ entry of $A^{10}$ is $2^{11} - 1 = 2047$.
:::
:::

::: exercise Long-run proportions {level=2 check="5/6"}
Each day a machine is either working or broken. A working machine is still working the next day with probability $0.9$; a broken one is repaired by the next day with probability $0.5$. With $\mathbf{x}_k = (\text{P(working)}, \text{P(broken)})$ on day $k$, write $\mathbf{x}_{k+1} = M\mathbf{x}_k$ and find the long-run probability that the machine is working.
::: solution
$M = \begin{pmatrix}0.9&0.5\\0.1&0.5\end{pmatrix}$ (column $j$ lists where state $j$ goes). The steady state solves $(M - I)\mathbf{x} = \mathbf{0}$: $-0.1x_1 + 0.5x_2 = 0$, so $x_1 = 5x_2$; normalising $x_1 + x_2 = 1$ gives $\mathbf{x} = (\tfrac56, \tfrac16)$. The other eigenvalue is $\tr M - 1 = 0.4$, with $\abs{0.4} < 1$, so every starting distribution converges to this steady state. The long-run probability of working is $\tfrac56$.
:::
:::

::: exercise A matrix with a parameter {level=2}
For which real $k$ is $\begin{pmatrix}1&k\\1&1\end{pmatrix}$ diagonalisable over $\R$?
::: solution
$p(\lambda) = (1 - \lambda)^2 - k$, with roots $\lambda = 1\pm\sqrt k$. If $k > 0$ there are two distinct real eigenvalues, so the matrix is diagonalisable by [[#cor-distinct]]. If $k < 0$ the eigenvalues are not real, so it is not diagonalisable over $\R$ (though it is over $\C$). If $k = 0$ the matrix is $\begin{pmatrix}1&0\\1&1\end{pmatrix}$ with the single eigenvalue $1$ of algebraic multiplicity $2$, but $A - I = \begin{pmatrix}0&0\\1&0\end{pmatrix}$ has rank $1$, so the eigenspace is $1$-dimensional and the matrix is not diagonalisable. Answer: exactly for $k > 0$.
:::
:::

::: exercise A matrix whose eighth power is scalar {level=2}
Let $A = \begin{pmatrix}3&-5\\1&-1\end{pmatrix}$. Find its eigenvalues and show that $A^8 = 16I$.
::: solution
$p(\lambda) = \lambda^2 - 2\lambda + 2$, so $\lambda = 1\pm i = \sqrt2\,e^{\pm i\pi/4}$. The eigenvalues are distinct, so $A = PDP^{-1}$ over $\C$ with $D = \diag(1 + i, 1 - i)$, and $A^8 = PD^8P^{-1}$. Now $(1\pm i)^8 = (\sqrt2)^8e^{\pm 2\pi i} = 16$, so $D^8 = 16I$ and $A^8 = P(16I)P^{-1} = 16I$. (Directly: $A^2 = \begin{pmatrix}4&-10\\2&-4\end{pmatrix}$ and $A^4 = (A^2)^2 = -4I$, so $A^8 = 16I$.)
:::
:::

::: exercise Inverses and powers {level=2}
Let $\mathbf{v}$ be an eigenvector of $A$ with eigenvalue $\lambda$. Prove that $\mathbf{v}$ is an eigenvector of $A^k$ (eigenvalue $\lambda^k$) for every $k\ge 1$, and that if $A$ is invertible then $\lambda\neq 0$ and $\mathbf{v}$ is an eigenvector of $A^{-1}$ with eigenvalue $1/\lambda$.
::: solution
By induction, $A^k\mathbf{v} = A(A^{k-1}\mathbf{v}) = A(\lambda^{k-1}\mathbf{v}) = \lambda^{k-1}A\mathbf{v} = \lambda^k\mathbf{v}$. If $A$ is invertible and $\lambda = 0$, then $A\mathbf{v} = \mathbf{0}$ with $\mathbf{v}\neq\mathbf{0}$, contradicting invertibility; so $\lambda\neq 0$. Applying $A^{-1}$ to $A\mathbf{v} = \lambda\mathbf{v}$ gives $\mathbf{v} = \lambda A^{-1}\mathbf{v}$, so $A^{-1}\mathbf{v} = \lambda^{-1}\mathbf{v}$.
:::
:::

::: exercise AB and BA {level=3}
Let $A$ and $B$ be $n\times n$ matrices. Prove that $AB$ and $BA$ have the same eigenvalues.
::: hint
Treat $\lambda\neq 0$ and $\lambda = 0$ separately. For $\lambda\neq 0$, if $AB\mathbf{v} = \lambda\mathbf{v}$, look at $B\mathbf{v}$.
:::
::: solution
Let $\lambda\neq 0$ be an eigenvalue of $AB$ with eigenvector $\mathbf{v}$. Then $\mathbf{w} = B\mathbf{v}\neq\mathbf{0}$, since otherwise $\lambda\mathbf{v} = AB\mathbf{v} = \mathbf{0}$. And $BA\mathbf{w} = B(AB\mathbf{v}) = \lambda B\mathbf{v} = \lambda\mathbf{w}$, so $\lambda$ is an eigenvalue of $BA$. By symmetry every non-zero eigenvalue of $BA$ is one of $AB$. Finally, $0$ is an eigenvalue of $AB$ iff $\det(AB) = 0$ iff $\det A\det B = 0$ iff $\det(BA) = 0$ iff $0$ is an eigenvalue of $BA$. (In fact $AB$ and $BA$ even have the same characteristic polynomial.)
:::
:::

::: exercise Projections are diagonalisable {level=3}
Let $A$ be an $n\times n$ matrix with $A^2 = A$. Prove that every eigenvalue of $A$ is $0$ or $1$, and that $A$ is diagonalisable.
::: hint
For the second part use the decomposition $\F^n = \operatorname{Nul}(A)\oplus\operatorname{Col}(A)$ of [[linear-algebra/linear-maps#exr-projection]].
:::
::: solution
If $A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v}\neq\mathbf{0}$, then $\lambda\mathbf{v} = A\mathbf{v} = A^2\mathbf{v} = \lambda^2\mathbf{v}$, so $\lambda^2 = \lambda$ and $\lambda\in\{0, 1\}$. For diagonalisability: every $\mathbf{x}$ splits as $\mathbf{x} = (\mathbf{x} - A\mathbf{x}) + A\mathbf{x}$ with $A(\mathbf{x} - A\mathbf{x}) = \mathbf{0}$ and $A(A\mathbf{x}) = A\mathbf{x}$; so $\F^n = E_0 + E_1$, where $E_0 = \operatorname{Nul}(A)$ and $E_1 = \operatorname{Col}(A)$ (every vector of $\operatorname{Col}(A)$ is fixed by $A$). By [[#thm-distinct]] the sum is direct, so a basis of $E_0$ together with a basis of $E_1$ is a basis of $\F^n$ consisting of eigenvectors. By [[#thm-diagonalisation]], $A$ is diagonalisable, with $D$ having $\rank A$ ones and $n - \rank A$ zeros on the diagonal.
:::
:::
