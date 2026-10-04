Diagonalisation is the ideal: in a basis of eigenvectors a matrix becomes diagonal, and powers, exponentials and differential equations become easy. But some matrices do not have enough eigenvectors. The shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has only one eigenvector direction, and the matrix $B$ of [[linear-algebra/eigenvalues#ex-defective]] has a repeated eigenvalue with a one-dimensional eigenspace. What is the simplest form to which *every* square matrix can be brought by a change of basis?

The answer is the **Jordan canonical form**: over the complex numbers, every square matrix is similar to a block diagonal matrix whose blocks look like

$$
J_3(\lambda) = \begin{pmatrix}\lambda&1&0\\0&\lambda&1\\0&0&\lambda\end{pmatrix},
$$

with an eigenvalue on the diagonal and $1$s just above it. Diagonal matrices are the case where all blocks are $1\times 1$. The Jordan form is unique up to the order of the blocks, so it answers completely the question of when two matrices are similar. On the way we meet two results of independent importance: the **Cayley–Hamilton theorem**, which says that every matrix satisfies its own characteristic equation, and the **minimal polynomial**, which detects diagonalisability exactly. Throughout, $A$ is an $n\times n$ matrix over a field $\F$; for the Jordan form itself we need the characteristic polynomial to split into linear factors, which is automatic over $\C$.

## Polynomials in a matrix and the Cayley–Hamilton theorem

For a polynomial $q(t) = c_0 + c_1t + \dots + c_dt^d$ we define $q(A) = c_0I + c_1A + \dots + c_dA^d$. Since powers of $A$ commute with each other, polynomials in $A$ behave like polynomials: $(q + r)(A) = q(A) + r(A)$ and $(qr)(A) = q(A)r(A) = r(A)q(A)$. If $A\mathbf{v} = \lambda\mathbf{v}$, then $A^k\mathbf{v} = \lambda^k\mathbf{v}$, and so

$$
q(A)\mathbf{v} = q(\lambda)\mathbf{v}.
$$ {#eq-poly-eigen}

The space $M_n(\F)$ has dimension $n^2$, so the $n^2 + 1$ matrices $I, A, A^2, \dots, A^{n^2}$ are linearly dependent: *some* non-zero polynomial of degree at most $n^2$ kills $A$. Remarkably, there is always one of degree only $n$.

::: theorem Cayley–Hamilton theorem {#thm-cayley-hamilton}
Every square matrix satisfies its characteristic equation: if $p_A(t) = \det(A - tI)$, then $p_A(A) = O$.
:::

::: proof
Let $C(t) = \operatorname{adj}(A - tI)$ be the adjugate of $A - tI$ ([[linear-algebra/determinants#thm-adjugate]]). Its entries are cofactors of $A - tI$, so they are polynomials in $t$ of degree at most $n - 1$, and we can write $C(t) = C_0 + C_1t + \dots + C_{n-1}t^{n-1}$ with constant matrices $C_k$. Write $p_A(t) = c_0 + c_1t + \dots + c_nt^n$. The adjugate formula gives, for every $t$,

$$
(A - tI)(C_0 + C_1t + \dots + C_{n-1}t^{n-1}) = (c_0 + c_1t + \dots + c_nt^n)I.
$$

Both sides are polynomials in $t$ whose coefficients are matrices; they agree for infinitely many values of $t$, so their coefficients agree entry by entry. Comparing the coefficients of $1, t, \dots, t^n$:

$$
AC_0 = c_0I,\quad AC_1 - C_0 = c_1I,\quad \dots,\quad AC_{n-1} - C_{n-2} = c_{n-1}I,\quad -C_{n-1} = c_nI.
$$

Multiply these equations on the left by $I, A, A^2, \dots, A^n$ respectively and add. The left-hand sides telescope to $AC_0 + (A^2C_1 - AC_0) + \dots + (A^nC_{n-1} - A^{n-1}C_{n-2}) - A^nC_{n-1} = O$, while the right-hand sides add up to $c_0I + c_1A + \dots + c_nA^n = p_A(A)$. So $p_A(A) = O$.
:::

::: warning A tempting false proof
"Substitute $t = A$ into $p_A(t) = \det(A - tI)$ to get $\det(A - A) = \det O = 0$." This is wrong twice over: $\det(A - tI)$ is a *number* for each scalar $t$, and putting a matrix in place of $t$ inside the determinant is not the same as evaluating the polynomial $p_A$ at $A$; and the conclusion "$= 0$" is a scalar, whereas $p_A(A)$ is a *matrix* that we want to show is the zero matrix. The theorem is genuinely deep, which is why the proof above needs the adjugate.
:::

::: example Using Cayley–Hamilton {#ex-cayley-hamilton}
Verify the theorem for $A = \begin{pmatrix}1&2\\3&4\end{pmatrix}$, and use it to find $A^{-1}$ and $A^3$.
::: solution
$p_A(t) = t^2 - 5t - 2$ (trace $5$, determinant $-2$). Now $A^2 = \begin{pmatrix}7&10\\15&22\end{pmatrix}$, and

$$
A^2 - 5A - 2I = \begin{pmatrix}7 - 5 - 2&10 - 10\\15 - 15&22 - 20 - 2\end{pmatrix} = O.
$$

Rearranging $A^2 - 5A = 2I$ as $A\cdot\frac12(A - 5I) = I$ gives $A^{-1} = \frac12(A - 5I) = \begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$, in agreement with [[linear-algebra/matrices#ex-elementary]]. For powers, $A^2 = 5A + 2I$ lets us reduce any polynomial in $A$ to a combination of $I$ and $A$: $A^3 = 5A^2 + 2A = 5(5A + 2I) + 2A = 27A + 10I$.
:::
:::

## The minimal polynomial

The characteristic polynomial kills $A$, but it may not be the simplest polynomial that does.

::: definition Minimal polynomial {#def-minimal-poly}
The **minimal polynomial** $m_A$ of a square matrix $A$ is the monic polynomial (leading coefficient $1$) of smallest degree such that $m_A(A) = O$.
:::

A non-zero polynomial killing $A$ exists by Cayley–Hamilton; dividing by its leading coefficient makes it monic; so a monic annihilating polynomial of smallest degree exists.

::: theorem Properties of the minimal polynomial {#thm-minimal-poly}
1. A polynomial $q$ satisfies $q(A) = O$ if and only if $m_A$ divides $q$. In particular $m_A$ is unique, and $m_A$ divides $p_A$.
2. The roots of $m_A$ are exactly the eigenvalues of $A$.
3. Similar matrices have the same minimal polynomial.
:::

::: proof
1. If $q = sm_A$ then $q(A) = s(A)m_A(A) = O$. Conversely, divide with remainder: $q = sm_A + r$ with $\deg r < \deg m_A$ (see [[abstract-algebra/polynomials]]). Then $r(A) = q(A) - s(A)m_A(A) = O$. If $r\neq 0$, dividing $r$ by its leading coefficient would give a monic annihilating polynomial of smaller degree than $m_A$, which is impossible; so $r = 0$. If $m$ and $m'$ are both minimal, each divides the other and both are monic, so $m = m'$. By Cayley–Hamilton, $m_A$ divides $p_A$.
2. If $\lambda$ is an eigenvalue with eigenvector $\mathbf{v}$, then by [[#eq-poly-eigen]] $\mathbf{0} = m_A(A)\mathbf{v} = m_A(\lambda)\mathbf{v}$, so $m_A(\lambda) = 0$. Conversely, every root of $m_A$ is a root of $p_A$, because $m_A$ divides $p_A$, hence an eigenvalue.
3. If $B = P^{-1}AP$ then $q(B) = P^{-1}q(A)P$ for every polynomial $q$, so $q(B) = O$ iff $q(A) = O$.
:::

So if $p_A(t) = \pm(t - \lambda_1)^{m_1}\cdots(t - \lambda_k)^{m_k}$ with distinct $\lambda_i$, then $m_A(t) = (t - \lambda_1)^{e_1}\cdots(t - \lambda_k)^{e_k}$ with $1\le e_i\le m_i$. The exponents $e_i$ carry exactly the information about diagonalisability.

::: theorem Minimal polynomial criterion {#thm-diag-minpoly}
$A$ is diagonalisable over $\F$ if and only if its minimal polynomial is a product of *distinct* linear factors, $m_A(t) = (t - \lambda_1)(t - \lambda_2)\cdots(t - \lambda_k)$ with $\lambda_1, \dots, \lambda_k\in\F$ distinct.
:::

::: proof
Suppose $A = PDP^{-1}$ with $D$ diagonal, and let $\lambda_1, \dots, \lambda_k$ be the distinct eigenvalues. For $q(t) = \prod_i(t - \lambda_i)$, the diagonal matrix $q(D)$ has entries $q(d_{jj}) = 0$, so $q(A) = Pq(D)P^{-1} = O$. Thus $m_A$ divides $q$; and $m_A$ has every $\lambda_i$ as a root, so $m_A = q$.

Conversely, suppose $m_A(t) = \prod_{i=1}^k(t - \lambda_i)$ with distinct $\lambda_i$. Consider the Lagrange polynomials

$$
\ell_i(t) = \prod_{j\neq i}\frac{t - \lambda_j}{\lambda_i - \lambda_j}, \qquad i = 1, \dots, k.
$$

The polynomial $\ell_1 + \dots + \ell_k - 1$ has degree less than $k$ and vanishes at the $k$ points $\lambda_1, \dots, \lambda_k$ (since $\ell_i(\lambda_j)$ is $1$ for $j = i$ and $0$ otherwise), so it is zero: $\sum_i\ell_i(t) = 1$. Hence every vector satisfies $\mathbf{v} = \sum_i\ell_i(A)\mathbf{v}$. Moreover $(t - \lambda_i)\ell_i(t)$ is a constant multiple of $m_A(t)$, so $(A - \lambda_iI)\ell_i(A)\mathbf{v} = \mathbf{0}$: each $\ell_i(A)\mathbf{v}$ lies in the eigenspace $E_{\lambda_i}$. So the eigenvectors span $\F^n$, a basis can be chosen among them, and $A$ is diagonalisable ([[linear-algebra/eigenvalues#thm-diagonalisation]]).
:::

::: example Two matrices with the same characteristic polynomial {#ex-minpoly}
Find the minimal polynomials of $A = \begin{pmatrix}2&1&-1\\0&0&2\\0&-1&3\end{pmatrix}$ and $B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$ from [[linear-algebra/eigenvalues#ex-diag3]] and [[linear-algebra/eigenvalues#ex-defective]].
::: solution
Both have $p(t) = (2 - t)^2(1 - t)$, so each minimal polynomial is $(t - 2)(t - 1)$ or $(t - 2)^2(t - 1)$. Test the smaller candidate:

$$
(A - 2I)(A - I) = \begin{pmatrix}0&1&-1\\0&-2&2\\0&-1&1\end{pmatrix}\begin{pmatrix}1&1&-1\\0&-1&2\\0&-1&2\end{pmatrix} = O,
$$

so $m_A(t) = (t - 2)(t - 1)$, with distinct factors — consistent with $A$ being diagonalisable. For $B$,

$$
(B - 2I)(B - I) = \begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\begin{pmatrix}-1&1&2\\0&1&0\\-1&1&2\end{pmatrix} = \begin{pmatrix}0&1&0\\0&0&0\\0&1&0\end{pmatrix}\neq O,
$$

so $m_B(t) = (t - 2)^2(t - 1)$. By [[#thm-diag-minpoly]], $B$ is not diagonalisable. The repeated factor $(t - 2)^2$ signals a Jordan block of size $2$ for the eigenvalue $2$, as we will see.
:::
:::

::: quiz
A $3\times 3$ matrix has characteristic polynomial $-(t - 1)^2(t - 3)$. Which polynomials could be its minimal polynomial? (Select all that apply.)
- [x] $(t - 1)(t - 3)$
- [x] $(t - 1)^2(t - 3)$
- [ ] $(t - 1)^2$
- [ ] $(t - 1)(t - 3)^2$
::: solution
By [[#thm-minimal-poly]] the minimal polynomial divides the characteristic polynomial and has every eigenvalue, $1$ and $3$, as a root. That leaves $(t - 1)(t - 3)$ (the diagonalisable case) and $(t - 1)^2(t - 3)$ (a Jordan block of size $2$ for the eigenvalue $1$). $(t - 1)^2$ misses the eigenvalue $3$, and $(t - 3)^2$ does not divide the characteristic polynomial.
:::
:::

## Generalised eigenvectors and the primary decomposition

When there are too few eigenvectors, we enlarge the eigenspaces.

::: definition Generalised eigenvector {#def-generalised}
A non-zero vector $\mathbf{v}$ is a **generalised eigenvector** of $A$ for the eigenvalue $\lambda$ if $(A - \lambda I)^k\mathbf{v} = \mathbf{0}$ for some $k\ge 1$.
:::

Ordinary eigenvectors are the case $k = 1$. For the shear $S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$, $(S - I)^2 = O$, so every non-zero vector of $\R^2$ is a generalised eigenvector for $\lambda = 1$, although only the multiples of $(1,0)$ are eigenvectors.

::: theorem Primary decomposition {#thm-primary}
Suppose $p_A(t) = \pm(t - \lambda_1)^{m_1}\cdots(t - \lambda_k)^{m_k}$ with distinct $\lambda_i\in\F$, and put $K_i = \operatorname{Nul}\bigl((A - \lambda_iI)^{m_i}\bigr)$. Then

1. $\F^n = K_1\oplus K_2\oplus\dots\oplus K_k$;
2. each $K_i$ is **invariant** under $A$ ($A\mathbf{v}\in K_i$ whenever $\mathbf{v}\in K_i$);
3. $\dim K_i = m_i$, the algebraic multiplicity of $\lambda_i$;
4. $K_i$ consists of $\mathbf{0}$ and all the generalised eigenvectors for $\lambda_i$ — it is the **generalised eigenspace** of $\lambda_i$.
:::

::: proof
Let $q_i(t) = \prod_{j\neq i}(t - \lambda_j)^{m_j}$. These polynomials have no common root, so by the Euclidean algorithm for polynomials (Bézout's identity, [[abstract-algebra/polynomials]]) there are polynomials $a_i$ with $a_1q_1 + \dots + a_kq_k = 1$. Hence

$$
I = a_1(A)q_1(A) + \dots + a_k(A)q_k(A).
$$

*1, spanning.* For $\mathbf{v}\in\F^n$ put $\mathbf{v}_i = a_i(A)q_i(A)\mathbf{v}$, so $\mathbf{v} = \sum\mathbf{v}_i$. Then $(A - \lambda_iI)^{m_i}\mathbf{v}_i = a_i(A)\bigl[(t - \lambda_i)^{m_i}q_i\bigr](A)\mathbf{v} = \pm a_i(A)p_A(A)\mathbf{v} = \mathbf{0}$ by Cayley–Hamilton, so $\mathbf{v}_i\in K_i$.

*1, directness.* Suppose $\mathbf{w}_1 + \dots + \mathbf{w}_k = \mathbf{0}$ with $\mathbf{w}_j\in K_j$. For $j\neq i$, $q_i$ contains the factor $(t - \lambda_j)^{m_j}$, so $q_i(A)\mathbf{w}_j = \mathbf{0}$. Applying $a_i(A)q_i(A)$ to the sum therefore gives $a_i(A)q_i(A)\mathbf{w}_i = \mathbf{0}$. On the other hand $\mathbf{w}_i = \sum_ja_j(A)q_j(A)\mathbf{w}_i$, and for $j\neq i$ the factor $(t - \lambda_i)^{m_i}$ in $q_j$ kills $\mathbf{w}_i$; so $\mathbf{w}_i = a_i(A)q_i(A)\mathbf{w}_i = \mathbf{0}$.

*2.* $A$ commutes with $(A - \lambda_iI)^{m_i}$, so $(A - \lambda_iI)^{m_i}A\mathbf{v} = A(A - \lambda_iI)^{m_i}\mathbf{v} = \mathbf{0}$ for $\mathbf{v}\in K_i$.

*3.* Choose a basis of each $K_i$ and combine them into a basis of $\F^n$ (possible by 1). Since each $K_i$ is invariant, $A$ is similar to a block diagonal matrix $\diag(A_1, \dots, A_k)$, where $A_i$ represents $A$ on $K_i$. If $A_i\mathbf{u} = \mu\mathbf{u}$ for some $\mathbf{u}\neq\mathbf{0}$ in $K_i$, then $\mathbf{0} = (A - \lambda_iI)^{m_i}\mathbf{u} = (\mu - \lambda_i)^{m_i}\mathbf{u}$, so $\mu = \lambda_i$: the only eigenvalue of $A_i$ is $\lambda_i$, and since $p_{A_i}$ divides $p_A$ it splits, so $p_{A_i}(t) = (\lambda_i - t)^{\dim K_i}$. The determinant of a block diagonal matrix is the product of the determinants of the blocks, so $p_A = \prod_ip_{A_i}$, and comparing the multiplicity of the root $\lambda_i$ gives $\dim K_i = m_i$.

*4.* Let $(A - \lambda_iI)^k\mathbf{v} = \mathbf{0}$ and write $\mathbf{v} = \sum_j\mathbf{v}_j$ with $\mathbf{v}_j\in K_j$. Each $(A - \lambda_iI)^k\mathbf{v}_j$ lies in $K_j$ and they sum to $\mathbf{0}$, so by directness each is $\mathbf{0}$. For $j\neq i$, the matrix $A_j - \lambda_iI$ is invertible ($\lambda_i$ is not an eigenvalue of $A_j$), so $\mathbf{v}_j = \mathbf{0}$. Thus $\mathbf{v} = \mathbf{v}_i\in K_i$.
:::

So the generalised eigenspaces always have the "right" dimensions and always fill the whole space, even when the eigenspaces do not. On $K_i$, the matrix $A$ acts as $\lambda_iI + N_i$, where $N_i = (A - \lambda_iI)$ restricted to $K_i$ satisfies $N_i^{m_i} = O$: it is **nilpotent**. It remains to understand nilpotent maps.

## Jordan chains and the Jordan form

::: definition Jordan block and Jordan matrix {#def-jordan-block}
The $k\times k$ **Jordan block** with eigenvalue $\lambda$ is the matrix $J_k(\lambda)$ with $\lambda$ in every diagonal position, $1$ in every position directly above the diagonal, and $0$ elsewhere. A **Jordan matrix** is a block diagonal matrix $\diag\bigl(J_{k_1}(\lambda_1), \dots, J_{k_s}(\lambda_s)\bigr)$ whose blocks are Jordan blocks (the $\lambda_i$ need not be distinct).
:::

Write $J_k(\lambda) = \lambda I + N$, where $N$ has $1$s above the diagonal. Then $N\mathbf{e}_1 = \mathbf{0}$ and $N\mathbf{e}_j = \mathbf{e}_{j-1}$ for $j\ge 2$: the standard basis vectors form a **chain**

$$
\mathbf{e}_k\xrightarrow{\ N\ }\mathbf{e}_{k-1}\xrightarrow{\ N\ }\cdots\xrightarrow{\ N\ }\mathbf{e}_1\xrightarrow{\ N\ }\mathbf{0},
$$

so $N^k = O$ but $N^{k-1}\neq O$. Only $\mathbf{e}_1$ is an eigenvector of $J_k(\lambda)$; the others are generalised eigenvectors. Conversely, if a nilpotent map $N$ and a vector $\mathbf{v}$ satisfy $N^k\mathbf{v} = \mathbf{0}\neq N^{k-1}\mathbf{v}$, then in the basis $N^{k-1}\mathbf{v}, \dots, N\mathbf{v}, \mathbf{v}$ of their span, $N$ has the matrix $J_k(0)$. The heart of the Jordan form is that every nilpotent map has a basis made of such chains.

::: lemma Structure of nilpotent maps {#lem-nilpotent}
Let $N$ be a nilpotent linear operator on a finite-dimensional space $V$. Then there are vectors $\mathbf{w}_1, \dots, \mathbf{w}_s\in V$ and integers $k_1, \dots, k_s\ge 1$ such that $N^{k_i}\mathbf{w}_i = \mathbf{0}$ and the vectors

$$
N^j\mathbf{w}_i \qquad (1\le i\le s,\ 0\le j < k_i)
$$

form a basis of $V$. Consequently, in a suitable basis $N$ has the matrix $\diag\bigl(J_{k_1}(0), \dots, J_{k_s}(0)\bigr)$.
:::

::: proof
Induction on $\dim V$; the case $\dim V\le 1$ is clear (then $N = 0$). Since $N$ is nilpotent it is not injective, so $U = \Img N$ has smaller dimension than $V$, and $N$ maps $U$ into itself. By the induction hypothesis applied to $N$ on $U$, there are $\mathbf{u}_1, \dots, \mathbf{u}_p\in U$ and integers $l_i\ge 1$ such that the vectors $N^j\mathbf{u}_i$ ($0\le j < l_i$) form a basis of $U$ and $N^{l_i}\mathbf{u}_i = \mathbf{0}$. Since $\mathbf{u}_i\in\Img N$, choose $\mathbf{w}_i$ with $N\mathbf{w}_i = \mathbf{u}_i$.

*The vectors $N^j\mathbf{w}_i$ ($1\le i\le p$, $0\le j\le l_i$) are independent.* Suppose $\sum_{i,j}c_{ij}N^j\mathbf{w}_i = \mathbf{0}$. Applying $N$ gives $\sum_{i,j}c_{ij}N^j\mathbf{u}_i = \mathbf{0}$; the terms with $j = l_i$ vanish and the rest are basis vectors of $U$, so $c_{ij} = 0$ for $j < l_i$. What remains is $\sum_ic_{il_i}N^{l_i}\mathbf{w}_i = \sum_ic_{il_i}N^{l_i - 1}\mathbf{u}_i = \mathbf{0}$, and these are again basis vectors of $U$, so the remaining coefficients vanish too.

*Completing the basis.* Extend this independent list $\mathcal{L}$ to a basis of $V$ by vectors $\mathbf{y}_1, \dots, \mathbf{y}_q$. Each $N\mathbf{y}_k$ lies in $U$, which is spanned by the vectors $N^j\mathbf{u}_i = N(N^j\mathbf{w}_i)$; so $N\mathbf{y}_k = N\mathbf{x}_k$ for some $\mathbf{x}_k\in\Span\mathcal{L}$. Replace $\mathbf{y}_k$ by $\mathbf{z}_k = \mathbf{y}_k - \mathbf{x}_k$: the list $\mathcal{L}, \mathbf{z}_1, \dots, \mathbf{z}_q$ is still a basis (we subtracted vectors in the span of $\mathcal{L}$), and $N\mathbf{z}_k = \mathbf{0}$. This basis consists of the chains $\mathbf{w}_i, N\mathbf{w}_i, \dots, N^{l_i}\mathbf{w}_i$ (length $k_i = l_i + 1$) and the chains $\mathbf{z}_k$ of length $1$, as required.
:::

::: theorem Jordan canonical form {#thm-jordan}
Let $A$ be an $n\times n$ matrix whose characteristic polynomial splits over $\F$ (for example, any complex matrix). Then $A$ is similar to a Jordan matrix $J$, called the **Jordan form** of $A$, which is unique up to the order of the blocks. For each eigenvalue $\lambda$:

1. the number of blocks with eigenvalue $\lambda$ is the geometric multiplicity $\dim E_\lambda$;
2. the total size of these blocks is the algebraic multiplicity of $\lambda$;
3. the size of the largest of these blocks is the exponent of $(t - \lambda)$ in the minimal polynomial;
4. for each $j\ge 1$, the number of blocks of size at least $j$ is

$$
\dim\operatorname{Nul}(A - \lambda I)^j - \dim\operatorname{Nul}(A - \lambda I)^{j-1} = \rank(A - \lambda I)^{j-1} - \rank(A - \lambda I)^j.
$$ {#eq-block-count}
:::

::: proof
*Existence.* By [[#thm-primary]], $\F^n$ is the direct sum of the invariant subspaces $K_i$, and on $K_i$ the matrix acts as $\lambda_iI + N_i$ with $N_i$ nilpotent. By [[#lem-nilpotent]], $K_i$ has a basis in which $N_i$ is a direct sum of blocks $J_k(0)$, so $\lambda_iI + N_i$ is a direct sum of blocks $J_k(\lambda_i)$. Putting the bases of all the $K_i$ together gives a basis of $\F^n$ in which $A$ is a Jordan matrix.

*Counting formula and uniqueness.* For a single block, $(J_k(\lambda) - \lambda I)^j = N^j$ has rank $\max(k - j, 0)$, so $\dim\operatorname{Nul}(J_k(\lambda) - \lambda I)^j = \min(j, k)$; for a block with a different eigenvalue $\mu$, $J_k(\mu) - \lambda I$ is invertible and contributes nothing to the null space. Dimensions of null spaces add over the blocks of $J$, and they are similarity invariants, so

$$
\dim\operatorname{Nul}(A - \lambda I)^j - \dim\operatorname{Nul}(A - \lambda I)^{j-1} = \sum_{\text{blocks } J_k(\lambda)}\bigl(\min(j, k) - \min(j - 1, k)\bigr),
$$

and each term in the sum is $1$ if $k\ge j$ and $0$ otherwise. This proves [[#eq-block-count]] (the rank form follows by rank–nullity). Since the right-hand side depends only on $A$, the number of blocks of each size is determined by $A$: the Jordan form is unique up to order. Statement 1 is the case $j = 1$; statement 2 follows from part 3 of [[#thm-primary]]; for statement 3, $q(J_k(\lambda)) = O$ for $q = (t - \lambda)^e$ exactly when $e\ge k$, and a polynomial kills a block diagonal matrix iff it kills each block.
:::

In particular **two matrices with split characteristic polynomials are similar if and only if they have the same Jordan form** — the complete answer to the similarity question raised in [[linear-algebra/linear-maps]]. A basis in which $A$ takes Jordan form consists of **Jordan chains**: for a block of size $k$ with eigenvalue $\lambda$, vectors $\mathbf{v}_1, \dots, \mathbf{v}_k$ with

$$
(A - \lambda I)\mathbf{v}_1 = \mathbf{0}, \qquad (A - \lambda I)\mathbf{v}_j = \mathbf{v}_{j-1}\quad(j = 2, \dots, k),
$$

so that $A\mathbf{v}_j = \lambda\mathbf{v}_j + \mathbf{v}_{j-1}$ — exactly what the columns of $J_k(\lambda)$ say.

::: widget transform2d
matrix: 1,1; 0,1
eigen: true
caption: The shear $J_2(1)$, the simplest matrix that cannot be diagonalised. There is only one eigenvector line, the $x$-axis. The vector $\mathbf{e}_2$ is a generalised eigenvector: $(A - I)\mathbf{e}_2 = \mathbf{e}_1$, so $A\mathbf{e}_2 = \mathbf{e}_2 + \mathbf{e}_1$ — it is moved along the eigenvector direction. Change the bottom-left entry from $0$ to a small number such as $0.05$: two eigenvector lines appear, very close together. Jordan blocks are the limit as distinct eigenvectors merge.
:::

## Computing the Jordan form

The procedure follows the theory: find the eigenvalues and their algebraic multiplicities; for each eigenvalue compute the ranks of $(A - \lambda I)^j$ and read off the block sizes from [[#eq-block-count]]; then build Jordan chains from the top down, choosing $\mathbf{v}_k$ in $\operatorname{Nul}(A - \lambda I)^k$ but not in $\operatorname{Nul}(A - \lambda I)^{k-1}$ and setting $\mathbf{v}_{j-1} = (A - \lambda I)\mathbf{v}_j$.

::: example A 3×3 Jordan form {#ex-jordan3}
Find the Jordan form $J$ of $B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$ and an invertible $P$ with $B = PJP^{-1}$.
::: solution
From [[#ex-minpoly]]: $p_B(t) = (2 - t)^2(1 - t)$, the eigenvalue $2$ has a $1$-dimensional eigenspace spanned by $\mathbf{v}_1 = (1, 0, 1)$, and the eigenvalue $1$ has the eigenvector $\mathbf{w} = (2, 0, 1)$. So the eigenvalue $2$ has one block, of size $2$:

$$
J = \begin{pmatrix}2&1&0\\0&2&0\\0&0&1\end{pmatrix}.
$$

For the chain we need $\mathbf{v}_2$ with $(B - 2I)\mathbf{v}_2 = \mathbf{v}_1$:

$$
\begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\begin{pmatrix}a\\b\\c\end{pmatrix} = \begin{pmatrix}1\\0\\1\end{pmatrix} \iff -2a + b + 2c = 1,\ -a + b + c = 1.
$$

Subtracting gives $c = a$, and then $b = 1$; take $\mathbf{v}_2 = (0, 1, 0)$. With $P = (\mathbf{v}_1\ \mathbf{v}_2\ \mathbf{w}) = \begin{pmatrix}1&0&2\\0&1&0\\1&0&1\end{pmatrix}$ we have $BP = PJ$. *Check* the middle column: $B\mathbf{v}_2 = (1, 2, 1) = \mathbf{v}_1 + 2\mathbf{v}_2$, as the second column of $J$ requires.
:::
:::

::: example Block sizes from ranks {#ex-jordan4}
Find the Jordan form of $M = \begin{pmatrix}2&2&0&-1\\-1&2&1&0\\0&2&2&-1\\-1&0&1&2\end{pmatrix}$ and a Jordan basis.
::: solution
The characteristic polynomial is $(t - 2)^4$, so $2$ is the only eigenvalue. Let $N = M - 2I$:

$$
N = \begin{pmatrix}0&2&0&-1\\-1&0&1&0\\0&2&0&-1\\-1&0&1&0\end{pmatrix}, \qquad N^2 = \begin{pmatrix}-1&0&1&0\\0&0&0&0\\-1&0&1&0\\0&0&0&0\end{pmatrix}, \qquad N^3 = O.
$$

The ranks are $\rank N = 2$ (rows 3 and 4 repeat rows 1 and 2), $\rank N^2 = 1$ and $\rank N^3 = 0$. By [[#eq-block-count]] the number of blocks of size $\ge 1$ is $4 - 2 = 2$, of size $\ge 2$ is $2 - 1 = 1$, and of size $\ge 3$ is $1 - 0 = 1$. So there is one block of size $3$ and one of size $1$:

$$
J = \begin{pmatrix}2&1&0&0\\0&2&1&0\\0&0&2&0\\0&0&0&2\end{pmatrix}, \qquad m_M(t) = (t - 2)^3.
$$

For the long chain choose $\mathbf{v}_3$ with $N^2\mathbf{v}_3\neq\mathbf{0}$, for instance $\mathbf{v}_3 = \mathbf{e}_3$; then $\mathbf{v}_2 = N\mathbf{v}_3 = (0,1,0,1)$ and $\mathbf{v}_1 = N\mathbf{v}_2 = (1,0,1,0)$, an eigenvector. The eigenspace $\operatorname{Nul}(N)$ is $2$-dimensional, spanned by $(1,0,1,0)$ and $(0,1,0,2)$; take $\mathbf{w} = (0,1,0,2)$, independent of $\mathbf{v}_1$, as the chain of length $1$. Then $P = (\mathbf{v}_1\ \mathbf{v}_2\ \mathbf{v}_3\ \mathbf{w})$ is invertible and $M = PJP^{-1}$.
:::
:::

::: quiz
A $4\times 4$ matrix has characteristic polynomial $(t - 2)^4$ and minimal polynomial $(t - 2)^2$. Which Jordan forms are possible? (Select all that apply.)
- [x] $J_2(2)\oplus J_2(2)$
- [x] $J_2(2)\oplus J_1(2)\oplus J_1(2)$
- [ ] $J_4(2)$
- [ ] $J_3(2)\oplus J_1(2)$
::: solution
The block sizes add up to $4$ and the largest block has size $2$ (the exponent in the minimal polynomial). The possibilities are $2 + 2$ and $2 + 1 + 1$. They are distinguished by the geometric multiplicity: $\dim E_2 = 2$ for the first and $3$ for the second. Blocks of size $4$ or $3$ would need $(t - 2)^4$ or $(t - 2)^3$ in the minimal polynomial.
:::
:::

## Powers, exponentials and differential equations

Jordan blocks are easy to compute with because $J_k(\lambda) = \lambda I + N$ with $\lambda I$ and $N$ commuting and $N^k = O$. The binomial theorem therefore applies and stops after $k$ terms:

$$
J_k(\lambda)^m = \sum_{j=0}^{k-1}\binom{m}{j}\lambda^{m-j}N^j, \qquad\text{e.g.}\qquad J_3(\lambda)^m = \begin{pmatrix}\lambda^m & m\lambda^{m-1} & \binom m2\lambda^{m-2}\\ 0&\lambda^m&m\lambda^{m-1}\\0&0&\lambda^m\end{pmatrix}.
$$ {#eq-jordan-power}

Similarly, the **matrix exponential** $e^{tA} = \sum_{m\ge 0}\frac{t^m}{m!}A^m$ of a Jordan block is

$$
e^{tJ_3(\lambda)} = e^{\lambda t}\left(I + tN + \frac{t^2}{2}N^2\right) = e^{\lambda t}\begin{pmatrix}1&t&\frac{t^2}{2}\\0&1&t\\0&0&1\end{pmatrix}.
$$

Since $A = PJP^{-1}$ gives $A^m = PJ^mP^{-1}$ and $e^{tA} = Pe^{tJ}P^{-1}$, these formulas handle every matrix. The new feature compared with the diagonalisable case is the **polynomial factors** $m\lambda^{m-1}$ and $te^{\lambda t}$, produced by the off-diagonal $1$s.

::: example A defective linear system {#ex-jordan-ode}
Solve $\mathbf{x}'(t) = A\mathbf{x}(t)$ with $A = J_2(-1) = \begin{pmatrix}-1&1\\0&-1\end{pmatrix}$ and $\mathbf{x}(0) = (0, 1)$.
::: solution
The solution is $\mathbf{x}(t) = e^{tA}\mathbf{x}(0)$ with $e^{tA} = e^{-t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$, so $\mathbf{x}(t) = (te^{-t}, e^{-t})$. Directly: the second equation $x_2' = -x_2$ gives $x_2 = e^{-t}$, and then $x_1' = -x_1 + e^{-t}$ with $x_1(0) = 0$ is solved by $x_1 = te^{-t}$ (check: $x_1' = e^{-t} - te^{-t} = -x_1 + e^{-t}$). The factor $t$ is the signature of a Jordan block; in mechanics it appears at critical damping, and in forced oscillations at resonance ([[ode/linear-systems]]).
:::
:::

::: widget phaseplane
matrix: -1,1; 0,-1
x: -3, 3
y: -3, 3
caption: The phase portrait of $\mathbf{x}' = J_2(-1)\mathbf{x}$, a **degenerate node**. All solutions decay to the origin, and all of them become tangent to the single eigenvector line (the $x$-axis) as they approach it — there is no second straight-line solution. Change the top-right entry to $0$ to get $-I$, whose portrait is a star of straight lines, or make the diagonal entries slightly different to see two eigenvector lines emerge.
:::

::: application Transient growth
For $\abs{\lambda} < 1$, every entry of $J_k(\lambda)^m$ tends to $0$ as $m\to\infty$, so $A^m\to O$ whenever all eigenvalues of $A$ lie inside the unit circle. But the off-diagonal entries $m\lambda^{m-1}$ first *grow*: for $\lambda = 0.8$ the entry $m(0.8)^{m-1}$ rises to about $2.05$ at $m = 4$ and $m = 5$ before decaying, and in a $3\times 3$ block the corner entry $\binom m2(0.8)^{m-2}$ climbs to about $7.5$. In models of populations, economies or fluid flows, such transient amplification can matter more than the eventual decay, and it is invisible to the eigenvalues alone. (For a large block with $\abs{\lambda}$ close to $1$, the transient peak can be enormous.)
:::

::: widget plot
f: 0.8^x; x*0.8^(x - 1); x*(x - 1)/2*0.8^(x - 2)
x: 0, 40
y: 0, 8
labels: \lambda^m; m\lambda^{m-1}; \binom m2\lambda^{m-2}
caption: The three distinct entries of $J_3(0.8)^m$ from [[#eq-jordan-power]], plotted against $m$. The diagonal entry $0.8^m$ decays steadily, but the entries above the diagonal first grow — $m\,0.8^{m-1}$ peaks at about $2.05$ (at $m = 4, 5$) and $\binom m2 0.8^{m-2}$ at about $7.55$ (at $m = 9, 10$) — before the exponential decay wins. Eigenvalues predict the long-run behaviour; the Jordan structure governs the transient.
:::

::: remark The Jordan form is not computed numerically
The Jordan form depends discontinuously on the entries of the matrix: $\begin{pmatrix}1&1\\ \eps&1\end{pmatrix}$ is diagonalisable with eigenvalues $1\pm\sqrt\eps$ for every $\eps > 0$, but it is the Jordan block $J_2(1)$ at $\eps = 0$. Since rounding errors perturb every entry, floating-point computation cannot reliably decide which Jordan form a matrix has. Numerical software uses the **Schur decomposition** instead: every complex matrix is unitarily similar to an upper triangular matrix, $A = UTU^*$, which can be computed stably (by the QR algorithm). For matrices whose characteristic polynomial does not split — for instance over $\Q$ — there is a substitute, the **rational canonical form**, built from companion matrices.
:::

::: history
Camille Jordan published the canonical form in his *Traité des substitutions et des équations algébriques* (1870), in the setting of linear substitutions over finite fields, arising from Galois theory. Karl Weierstrass had developed the equivalent theory of elementary divisors in 1868, for pairs of quadratic and bilinear forms, and in 1874 Jordan and Leopold Kronecker conducted a sharp public dispute over the merits and priority of the two approaches. The Cayley–Hamilton theorem is named after Arthur Cayley, who stated it in his 1858 memoir on matrices, checked it for $2\times 2$ matrices and reported checking the $3\times 3$ case, and William Rowan Hamilton, who had proved a version for linear functions of quaternions in 1853. The first proof for matrices of every size was given by Ferdinand Georg Frobenius in 1878, in the paper in which he also introduced the minimal polynomial.
:::

## Where this leads

The Jordan form completes the classification of square matrices up to similarity, and it is the natural setting for the matrix exponential and the solution of linear systems of differential equations ([[ode/linear-systems]]), including the stability theory of [[ode/nonlinear-systems]]. Its algebraic underpinning is the structure theorem for finitely generated modules over a principal ideal domain: the space $\F^n$ becomes a module over the polynomial ring $\F[t]$, with $t$ acting as $A$, and the Jordan and rational canonical forms are the two ways of decomposing it ([[abstract-algebra/rings]], [[abstract-algebra/polynomials]]). In numerical work the Schur decomposition and the singular value decomposition ([[linear-algebra/svd]]) take its place. Infinite-dimensional analogues — the spectral theory of operators that are not self-adjoint — are a central topic of functional analysis.

::: summary
- Every matrix satisfies its characteristic equation, $p_A(A) = O$ (Cayley–Hamilton, [[#thm-cayley-hamilton]]); so $A^{-1}$ and all powers of $A$ are polynomials in $A$ of degree less than $n$.
- The minimal polynomial divides every annihilating polynomial, in particular $p_A$, and has the same roots ([[#thm-minimal-poly]]); $A$ is diagonalisable iff $m_A$ has no repeated factors ([[#thm-diag-minpoly]]).
- The generalised eigenspaces $\operatorname{Nul}(A - \lambda_iI)^{m_i}$ have dimension equal to the algebraic multiplicities and decompose $\F^n$ as a direct sum ([[#thm-primary]]).
- Every nilpotent map has a basis of chains ([[#lem-nilpotent]]); hence every matrix with split characteristic polynomial is similar to a Jordan matrix, unique up to the order of blocks ([[#thm-jordan]]).
- Number of blocks for $\lambda$ = geometric multiplicity; total size = algebraic multiplicity; largest size = exponent in $m_A$; blocks of size $\ge j$: $\rank(A - \lambda I)^{j-1} - \rank(A - \lambda I)^j$.
- Powers and exponentials of Jordan blocks contain polynomial factors $m\lambda^{m-1}$, $te^{\lambda t}$, which cause degenerate nodes and transient growth.
- The Jordan form is a theoretical tool; numerically, Schur and SVD decompositions are used.
:::

## Exercises

::: exercise An inverse from Cayley–Hamilton {level=1 check="3/5"}
Verify the Cayley–Hamilton theorem for $A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$ and use it to find $A^{-1}$. What is the $(1,1)$ entry of $A^{-1}$?
::: solution
$p_A(t) = t^2 - 5t + 5$. Then $A^2 = \begin{pmatrix}5&5\\5&10\end{pmatrix}$ and $A^2 - 5A + 5I = \begin{pmatrix}5 - 10 + 5&5 - 5\\5 - 5&10 - 15 + 5\end{pmatrix} = O$. Rearranging, $A(5I - A) = 5I$, so $A^{-1} = \frac15(5I - A) = \frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$, with $(1,1)$ entry $\frac35$.
:::
:::

::: exercise Degree of a minimal polynomial {level=1 check="3"}
What is the minimal polynomial of the Jordan matrix $J_3(2)\oplus J_1(2)$? What is its degree?
::: solution
By [[#thm-jordan]], the minimal polynomial is $(t - \lambda)^{e}$ with $e$ the size of the largest block: $m(t) = (t - 2)^3$, of degree $3$ — while the characteristic polynomial $(t - 2)^4$ has degree $4$. (This is the Jordan form of the matrix $M$ of [[#ex-jordan4]].)
:::
:::

::: exercise A 2×2 Jordan form {level=1}
Find the Jordan form of $A = \begin{pmatrix}3&1\\-1&1\end{pmatrix}$ and a matrix $P$ with $A = PJP^{-1}$.
::: solution
$p(t) = t^2 - 4t + 4 = (t - 2)^2$. Since $A - 2I = \begin{pmatrix}1&1\\-1&-1\end{pmatrix}\neq O$, the eigenspace is $1$-dimensional (spanned by $\mathbf{v}_1 = (1, -1)$) and $J = J_2(2) = \begin{pmatrix}2&1\\0&2\end{pmatrix}$. For the chain solve $(A - 2I)\mathbf{v}_2 = \mathbf{v}_1$: $a + b = 1$, so take $\mathbf{v}_2 = (1, 0)$. Then $P = \begin{pmatrix}1&1\\-1&0\end{pmatrix}$, and indeed $A\mathbf{v}_2 = (3, -1) = \mathbf{v}_1 + 2\mathbf{v}_2$.
:::
:::

::: exercise Reading block sizes {level=2 check="3"}
A $6\times 6$ matrix $A$ has the single eigenvalue $5$, with $\rank(A - 5I) = 3$, $\rank(A - 5I)^2 = 1$ and $(A - 5I)^3 = O$. Find its Jordan form. What is the size of the largest block?
::: solution
By [[#eq-block-count]]: blocks of size $\ge 1$: $6 - 3 = 3$; of size $\ge 2$: $3 - 1 = 2$; of size $\ge 3$: $1 - 0 = 1$; of size $\ge 4$: $0$. So there is one block of size $3$, one of size $2$ ($2 - 1$) and one of size $1$ ($3 - 2$): $J = J_3(5)\oplus J_2(5)\oplus J_1(5)$, with sizes adding to $6$. The largest block has size $3$, and $m_A(t) = (t - 5)^3$.
:::
:::

::: exercise A power of a defective matrix {level=2 check="112"}
For $A = \begin{pmatrix}3&1\\-1&1\end{pmatrix}$, show that $(A - 2I)^2 = O$ and deduce a formula for $A^m$. What is the $(1,1)$ entry of $A^5$?
::: solution
$(A - 2I)^2 = \begin{pmatrix}1&1\\-1&-1\end{pmatrix}^2 = O$ (by Cayley–Hamilton, since $p_A(t) = (t - 2)^2$). With $N = A - 2I$, the binomial theorem gives $A^m = (2I + N)^m = 2^mI + m2^{m-1}N$, all higher terms vanishing. For $m = 5$: $A^5 = 32I + 80N = \begin{pmatrix}112&80\\-80&-48\end{pmatrix}$. The $(1,1)$ entry is $112$.
:::
:::

::: exercise A degenerate node {level=2 check="1/e"}
For the solution $\mathbf{x}(t) = (x_1(t), x_2(t))$ of $\mathbf{x}' = \begin{pmatrix}-1&1\\0&-1\end{pmatrix}\mathbf{x}$ with $\mathbf{x}(0) = (0, 1)$, find $x_1(1)$, and the time at which $x_1$ is largest.
::: solution
By [[#ex-jordan-ode]], $x_1(t) = te^{-t}$, so $x_1(1) = e^{-1} = \frac1e$. Since $x_1'(t) = (1 - t)e^{-t}$, the maximum is at $t = 1$: the component $x_1$ is driven up by $x_2$ before both decay — a continuous-time version of transient growth.
:::
:::

::: exercise Possible Jordan forms {level=2}
List all possible Jordan forms (up to the order of blocks) of a $5\times 5$ matrix with characteristic polynomial $-(t - 1)^3(t - 4)^2$ and minimal polynomial $(t - 1)^2(t - 4)$.
::: solution
For the eigenvalue $4$: total size $2$, largest block $1$, so $J_1(4)\oplus J_1(4)$. For the eigenvalue $1$: total size $3$, largest block $2$, so $J_2(1)\oplus J_1(1)$. There is exactly one possibility: $J = J_2(1)\oplus J_1(1)\oplus J_1(4)\oplus J_1(4)$.
:::
:::

::: exercise Nilpotent matrices {level=3}
Prove that if $A$ is an $n\times n$ matrix with $A^k = O$ for some $k\ge 1$, then $A^n = O$. Deduce that a nilpotent matrix has $p_A(t) = (-t)^n$.
::: solution
$m_A$ divides $t^k$ by [[#thm-minimal-poly]], so $m_A(t) = t^j$ for some $j\ge 1$. It also divides $p_A$, which has degree $n$; so $j\le n$, and $A^n = A^{n-j}A^j = O$. Every eigenvalue is a root of $m_A = t^j$, hence $0$; so over $\C$ the characteristic polynomial, which has leading term $(-t)^n$ and only the root $0$, is $(-t)^n$.
:::
:::

::: exercise A matrix is similar to its transpose {level=3}
Prove that every complex square matrix $A$ is similar to $A\T$.
::: hint
First show that $J_k(\lambda)\T$ is similar to $J_k(\lambda)$, using the permutation matrix that reverses the order of the basis.
:::
::: solution
Let $R$ be the $k\times k$ matrix with $1$s on the anti-diagonal ($R\mathbf{e}_j = \mathbf{e}_{k+1-j}$), so $R = R^{-1}$. Conjugating by $R$ reverses the order of rows and columns, which turns the $1$s above the diagonal of $J_k(\lambda)$ into $1$s below it: $RJ_k(\lambda)R = J_k(\lambda)\T$. Hence each Jordan block is similar to its transpose, and so is any Jordan matrix $J$ (conjugate block by block). Now if $A = PJP^{-1}$, then $A\T = (P^{-1})\T J\T P\T$ is similar to $J\T$, which is similar to $J$, which is similar to $A$. Since similarity is transitive, $A\T$ is similar to $A$.
:::
:::

::: exercise Diagonalisable plus nilpotent {level=3}
Prove that every complex square matrix can be written as $A = D + N$ with $D$ diagonalisable, $N$ nilpotent and $DN = ND$. (This is the **Jordan–Chevalley decomposition**.)
::: solution
Write $A = PJP^{-1}$ with $J$ a Jordan matrix, and split $J = \Lambda + M$, where $\Lambda$ is the diagonal part of $J$ and $M$ consists of the $1$s above the diagonal. $M$ is nilpotent (it is strictly upper triangular). On each block, $\Lambda$ is the scalar matrix $\lambda I$, which commutes with everything; so $\Lambda M = M\Lambda$. Put $D = P\Lambda P^{-1}$ and $N = PMP^{-1}$. Then $A = D + N$, $D$ is diagonalisable, $N^n = PM^nP^{-1} = O$, and $DN = P\Lambda MP^{-1} = PM\Lambda P^{-1} = ND$. (One can show that $D$ and $N$ are uniquely determined and are polynomials in $A$.)
:::
:::
