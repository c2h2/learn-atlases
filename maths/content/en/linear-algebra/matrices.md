In the previous chapter a matrix was bookkeeping: a compact way of writing down the coefficients of a linear system. In this chapter matrices become objects in their own right, which can be added, multiplied, transposed and inverted. The guiding idea is that an $m \times n$ matrix $A$ is a *machine* that turns a vector $\mathbf{x} \in \R^n$ into the vector $A\mathbf{x} \in \R^m$. Feeding the output of one machine into another produces a new machine, and the rule for multiplying matrices is forced on us by asking what the combined machine is.

Here is a small instance. The matrix $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ rotates the plane by $90^\circ$ anticlockwise (it sends $\mathbf{e}_1 = (1,0)$ to $(0,1)$ and $\mathbf{e}_2 = (0,1)$ to $(-1,0)$), and $S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ is a horizontal shear. Rotating and then shearing is again a map of the form $\mathbf{x} \mapsto M\mathbf{x}$ — but with which matrix $M$? And is it the same as shearing first and then rotating? Answering these questions leads to matrix multiplication, to its most surprising feature (the order matters), and then to inverses, elementary matrices and the factorisation $A = LU$, which is Gaussian elimination written as a product.

## Sums, scalar multiples and the identity

::: definition Matrix operations {#def-matrix-ops}
Let $A = (a_{ij})$ and $B = (b_{ij})$ be $m \times n$ matrices and $c$ a number. The **sum** $A + B$ and the **scalar multiple** $cA$ are the $m\times n$ matrices with entries

$$
(A + B)_{ij} = a_{ij} + b_{ij}, \qquad (cA)_{ij} = c\,a_{ij}.
$$

The **zero matrix** $O$ has every entry $0$. A matrix is **square** if $m = n$; the **diagonal entries** of a square matrix are $a_{11}, a_{22}, \dots, a_{nn}$, and the $n\times n$ **identity matrix** $I_n$ (or just $I$) has diagonal entries $1$ and all other entries $0$. Its columns are the **standard basis vectors** $\mathbf{e}_1, \dots, \mathbf{e}_n$.
:::

Since these operations act entry by entry, they obey the same rules as the arithmetic of numbers: $A + B = B + A$, $(A + B) + C = A + (B + C)$, $A + O = A$, $c(A + B) = cA + cB$, $(c + d)A = cA + dA$, and so on. Matrices of different sizes cannot be added. The identity matrix leaves every vector alone: $I\mathbf{x} = x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n = \mathbf{x}$.

## Matrix multiplication

Let $B$ be $n\times p$ and $A$ be $m \times n$. Then $\mathbf{x} \mapsto B\mathbf{x}$ takes $\R^p$ to $\R^n$, and $\mathbf{y} \mapsto A\mathbf{y}$ takes $\R^n$ to $\R^m$; doing one after the other takes $\mathbf{x} \in \R^p$ to $A(B\mathbf{x}) \in \R^m$. Write $\mathbf{b}_1, \dots, \mathbf{b}_p$ for the columns of $B$. Since $B\mathbf{x} = x_1\mathbf{b}_1 + \dots + x_p\mathbf{b}_p$, the linearity rules [[linear-algebra/linear-systems#eq-linear]] give

$$
A(B\mathbf{x}) = x_1 A\mathbf{b}_1 + \dots + x_p A\mathbf{b}_p .
$$

This is the matrix–vector product of $\mathbf{x}$ with the matrix whose columns are $A\mathbf{b}_1, \dots, A\mathbf{b}_p$. That matrix *is* the composite machine, and we call it $AB$.

::: definition Matrix product {#def-product}
If $A$ is $m \times n$ and $B$ is $n\times p$ with columns $\mathbf{b}_1, \dots, \mathbf{b}_p$, the **product** $AB$ is the $m\times p$ matrix

$$
AB = \begin{pmatrix} A\mathbf{b}_1 & A\mathbf{b}_2 & \cdots & A\mathbf{b}_p \end{pmatrix}.
$$

The product is defined only when the number of columns of $A$ equals the number of rows of $B$.
:::

::: theorem Products compose maps {#thm-compose}
If $A$ is $m\times n$ and $B$ is $n \times p$, then $A(B\mathbf{x}) = (AB)\mathbf{x}$ for every $\mathbf{x} \in \R^p$. The $(i,j)$ entry of $AB$ is given by the **row–column rule**

$$
(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj} = \sum_{k=1}^n a_{ik}b_{kj}.
$$ {#eq-row-col}
:::

::: proof
The first statement is the computation just before [[#def-product]]: $A(B\mathbf{x}) = x_1A\mathbf{b}_1 + \dots + x_pA\mathbf{b}_p$, which by [[linear-algebra/linear-systems#def-matvec]] is $(AB)\mathbf{x}$. For the second, column $j$ of $AB$ is $A\mathbf{b}_j$, and by the row–column rule for a matrix times a vector its $i$-th entry is $\sum_k a_{ik}(\mathbf{b}_j)_k = \sum_k a_{ik}b_{kj}$.
:::

So the $(i,j)$ entry of $AB$ is "row $i$ of $A$ times column $j$ of $B$". There are two other useful ways to read a product, both immediate from [[#eq-row-col]]:

- **Row $i$ of $AB$** is (row $i$ of $A$)$\,B$, a combination of the *rows* of $B$ with weights from row $i$ of $A$.
- **Column–row expansion:** $AB = \mathbf{a}_1\mathbf{r}_1 + \mathbf{a}_2\mathbf{r}_2 + \dots + \mathbf{a}_n\mathbf{r}_n$, where $\mathbf{a}_k$ is column $k$ of $A$ and $\mathbf{r}_k$ is row $k$ of $B$; each term (column times row) is an $m\times p$ matrix of rank one. This view returns with the singular value decomposition in [[linear-algebra/svd]].

::: example Computing products {#ex-product}
Let $A = \begin{pmatrix}1&2&0\\-1&1&3\end{pmatrix}$ and $B = \begin{pmatrix}2&1\\0&-1\\1&4\end{pmatrix}$. Compute $AB$ and $BA$.
::: solution
$A$ is $2\times 3$ and $B$ is $3\times 2$, so $AB$ is $2\times 2$ and $BA$ is $3\times 3$. By the row–column rule,

$$
AB = \begin{pmatrix} 1\cdot2 + 2\cdot0 + 0\cdot1 & 1\cdot1 + 2\cdot(-1) + 0\cdot 4\\ -1\cdot2 + 1\cdot0 + 3\cdot1 & -1\cdot1 + 1\cdot(-1) + 3\cdot4 \end{pmatrix} = \begin{pmatrix}2&-1\\1&10\end{pmatrix},
$$

$$
BA = \begin{pmatrix} 2-1 & 4+1 & 0+3\\ 0+1 & 0-1 & 0-3\\ 1-4 & 2+4 & 0+12 \end{pmatrix} = \begin{pmatrix}1&5&3\\1&-1&-3\\-3&6&12\end{pmatrix}.
$$

The two products do not even have the same size. As a check on $BA$ by columns: its first column should be $B$ times the first column $(1,-1)$ of $A$, which is $1\cdot(2,0,1) - 1\cdot(1,-1,4) = (1, 1, -3)$. It is.
:::
:::

::: theorem Rules of matrix algebra {#thm-algebra}
Whenever the sizes make the expressions defined,

1. $A(BC) = (AB)C$ (associativity);
2. $A(B + C) = AB + AC$ and $(B + C)A = BA + CA$ (distributivity);
3. $c(AB) = (cA)B = A(cB)$ for every number $c$;
4. $I_mA = A = AI_n$ for every $m\times n$ matrix $A$.
:::

::: proof
For associativity, let $A$ be $m\times n$, $B$ be $n\times p$ and $C$ be $p\times q$. Using [[#eq-row-col]] twice and exchanging the order of two finite sums,

$$
\bigl((AB)C\bigr)_{ij} = \sum_{l=1}^{p} (AB)_{il}\,c_{lj} = \sum_{l=1}^p\sum_{k=1}^n a_{ik}b_{kl}c_{lj} = \sum_{k=1}^n a_{ik}\sum_{l=1}^p b_{kl}c_{lj} = \sum_{k=1}^n a_{ik}(BC)_{kj} = \bigl(A(BC)\bigr)_{ij}.
$$

(More conceptually: both sides are the matrix of the map "apply $C$, then $B$, then $A$".) For the first distributive law, $\bigl(A(B + C)\bigr)_{ij} = \sum_k a_{ik}(b_{kj} + c_{kj}) = (AB)_{ij} + (AC)_{ij}$; the second and rule 3 are proved the same way. For rule 4, column $j$ of $I_mA$ is $I_m\mathbf{a}_j = \mathbf{a}_j$, and column $j$ of $AI_n$ is $A\mathbf{e}_j = \mathbf{a}_j$.
:::

Associativity means we can write $ABC$ without brackets, and define **powers** of a square matrix: $A^0 = I$, $A^k = AA\cdots A$ ($k$ factors), with $A^jA^k = A^{j+k}$. What we may *not* do is change the order of the factors.

::: example Order matters {#ex-noncommute}
With the rotation $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ and shear $S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ from the introduction, compute $SR$ ("rotate, then shear") and $RS$ ("shear, then rotate"). Find also two non-zero matrices whose product is $O$.
::: solution
By the row–column rule,

$$
SR = \begin{pmatrix}1&1\\0&1\end{pmatrix}\begin{pmatrix}0&-1\\1&0\end{pmatrix} = \begin{pmatrix}1&-1\\1&0\end{pmatrix}, \qquad RS = \begin{pmatrix}0&-1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix} = \begin{pmatrix}0&-1\\1&1\end{pmatrix}.
$$

So $SR \neq RS$: the composite depends on the order. Note the order convention: in $SR\mathbf{x} = S(R\mathbf{x})$ the matrix nearest $\mathbf{x}$ acts first.

For a zero product, take $C = \begin{pmatrix}1&2\\2&4\end{pmatrix}$ and $D = \begin{pmatrix}2&-2\\-1&1\end{pmatrix}$. Each column of $D$ is a multiple of $(2,-1)$, and $C(2,-1) = (0,0)$, so $CD = O$, although neither factor is zero. In the other order, $DC = \begin{pmatrix}-2&-4\\1&2\end{pmatrix} \neq O$.
:::
:::

::: widget transform2d
matrix: 1,-1; 1,0
caption: This is $SR$, "rotate by $90^\circ$, then shear". Watch where the unit square goes, then edit the entries to $RS = \begin{pmatrix}0&-1\\1&1\end{pmatrix}$ ("shear, then rotate"). The two pictures differ, which is what $SR \neq RS$ means geometrically. The columns of the matrix are always the images of $\mathbf{e}_1$ and $\mathbf{e}_2$.
:::

::: warning Familiar algebra that fails for matrices
Three habits from the arithmetic of numbers must be unlearned.

- **No commutativity:** in general $AB \neq BA$. Consequently $(A + B)^2 = A^2 + AB + BA + B^2$, which equals $A^2 + 2AB + B^2$ only when $AB = BA$.
- **Zero divisors:** $AB = O$ does not imply $A = O$ or $B = O$, as [[#ex-noncommute]] shows.
- **No cancellation:** $AB = AC$ does not imply $B = C$. With the matrices $C$ and $D$ of [[#ex-noncommute]], $CD = O = CO$ although $D \neq O$. Cancellation *is* valid when the common factor is invertible — multiply on the left by its inverse.
:::

::: quiz
$A$ is $3\times 4$ and $B$ is $4 \times 2$. Which statement is correct?
- [x] $AB$ is defined and is $3\times 2$; $BA$ is not defined.
- [ ] $AB$ is $4\times 4$.
- [ ] Both $AB$ and $BA$ are defined, but they are different.
- [ ] $AB$ is not defined because the matrices have different sizes.
::: solution
$AB$ needs (columns of $A$) $=$ (rows of $B$): $4 = 4$, and the result has the rows of $A$ and the columns of $B$, so it is $3\times 2$. For $BA$ we would need (columns of $B$) $=$ (rows of $A$), that is $2 = 3$, which fails.
:::
:::

## The transpose

::: definition Transpose {#def-transpose}
The **transpose** of an $m\times n$ matrix $A$ is the $n\times m$ matrix $A\T$ with $(A\T)_{ij} = a_{ji}$: the rows of $A\T$ are the columns of $A$. A square matrix is **symmetric** if $A\T = A$ and **skew-symmetric** if $A\T = -A$.
:::

For example, $\begin{pmatrix}1&2&0\\-1&1&3\end{pmatrix}\T = \begin{pmatrix}1&-1\\2&1\\0&3\end{pmatrix}$. Directly from the definition, $(A\T)\T = A$, $(A + B)\T = A\T + B\T$ and $(cA)\T = cA\T$. Column vectors become row vectors, and the **dot product** of $\mathbf{x}, \mathbf{y}\in\R^n$ can be written as a matrix product: $\mathbf{x}\cdot\mathbf{y} = \mathbf{x}\T\mathbf{y} = x_1y_1 + \dots + x_ny_n$. Transposes interact with products in a way that is easy to get wrong.

::: theorem Transpose of a product {#thm-transpose-product}
If $A$ is $m\times n$ and $B$ is $n\times p$, then $(AB)\T = B\T A\T$.
:::

::: proof
Both sides are $p\times m$. For each $i, j$, using [[#eq-row-col]],

$$
\bigl((AB)\T\bigr)_{ij} = (AB)_{ji} = \sum_{k=1}^n a_{jk}b_{ki} = \sum_{k=1}^n (B\T)_{ik}(A\T)_{kj} = (B\T A\T)_{ij}.
$$
:::

Note that $A\T B\T$ would not even be defined in general (it needs $m = p$). The reversal is natural — to undo "put on socks, then shoes" you remove the shoes first — and the same reversal happens for inverses below. One consequence: for any matrix $A$, the products $A\T A$ and $AA\T$ are symmetric, because $(A\T A)\T = A\T (A\T)\T = A\T A$. These matrices will be central in [[linear-algebra/least-squares]] and [[linear-algebra/svd]].

## The inverse of a matrix

A number $a\neq 0$ has a reciprocal $a^{-1}$ with $a^{-1}a = 1$, which lets us solve $ax = b$ as $x = a^{-1}b$. For matrices the analogous role is played by the inverse.

::: definition Invertible matrix {#def-inverse}
A square $n\times n$ matrix $A$ is **invertible** (or **non-singular**) if there is an $n\times n$ matrix $B$ with

$$
AB = I \quad\text{and}\quad BA = I.
$$

Such a $B$ is called an **inverse** of $A$. A square matrix that is not invertible is **singular**.
:::

::: proposition Properties of inverses {#prop-inverse}
1. An invertible matrix has exactly one inverse, written $A^{-1}$.
2. If $A$ is invertible, then for every $\mathbf{b}$ the system $A\mathbf{x} = \mathbf{b}$ has the unique solution $\mathbf{x} = A^{-1}\mathbf{b}$.
3. If $A$ and $B$ are invertible $n\times n$ matrices, so are $A^{-1}$, $AB$ and $A\T$, with
   $(A^{-1})^{-1} = A$, $(AB)^{-1} = B^{-1}A^{-1}$ and $(A\T)^{-1} = (A^{-1})\T$.
:::

::: proof
1. If $B$ and $C$ are both inverses of $A$, then $B = BI = B(AC) = (BA)C = IC = C$.
2. $\mathbf{x} = A^{-1}\mathbf{b}$ is a solution because $A(A^{-1}\mathbf{b}) = (AA^{-1})\mathbf{b} = \mathbf{b}$. If $\mathbf{x}$ is any solution, multiplying $A\mathbf{x} = \mathbf{b}$ on the left by $A^{-1}$ gives $\mathbf{x} = A^{-1}\mathbf{b}$, so there is only one.
3. The equations $AA^{-1} = A^{-1}A = I$ say that $A$ is an inverse of $A^{-1}$. Next, using associativity,

   $$
   (AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I, \qquad (B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}B = I.
   $$

   Finally, by [[#thm-transpose-product]], $A\T(A^{-1})\T = (A^{-1}A)\T = I\T = I$ and $(A^{-1})\T A\T = (AA^{-1})\T = I$.
:::

For $2\times 2$ matrices there is an explicit formula. The number $ad - bc$ appearing in it is the determinant, the subject of [[linear-algebra/determinants]].

::: theorem Inverse of a 2×2 matrix {#thm-inverse-2x2}
The matrix $A = \begin{pmatrix}a&b\\c&d\end{pmatrix}$ is invertible if and only if $ad - bc \neq 0$, and then

$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$ {#eq-inv2}
:::

::: proof
Put $C = \begin{pmatrix}d&-b\\-c&a\end{pmatrix}$. Multiplying out, $AC = \begin{pmatrix}ad - bc & 0\\ 0 & ad-bc\end{pmatrix} = (ad-bc)I$, and likewise $CA = (ad-bc)I$. If $ad - bc \neq 0$, dividing by it shows that $\frac{1}{ad-bc}C$ is an inverse of $A$. If $ad - bc = 0$, then $AC = O$; were $A$ invertible, multiplying on the left by $A^{-1}$ would give $C = O$, so $a = b = c = d = 0$ and $A = O$, which is certainly not invertible (since $OB = O \neq I$ for every $B$). So $A$ is singular.
:::

::: warning Do not invert to solve
Although $\mathbf{x} = A^{-1}\mathbf{b}$ is a beautiful formula, computing $A^{-1}$ and then multiplying is the wrong way to solve a system numerically: it costs about three times as much as elimination and is usually less accurate. Inverses are a tool for *reasoning*; for *computing*, use elimination or the $LU$ factorisation below. Also beware of "rules" such as $(A + B)^{-1} = A^{-1} + B^{-1}$, which is false (try $A = B = I$).
:::

::: quiz
$A$ and $B$ are invertible $n\times n$ matrices. Which of these identities hold for all such $A$ and $B$? (Select all that apply.)
- [x] $(AB)^{-1} = B^{-1}A^{-1}$
- [ ] $(AB)^{-1} = A^{-1}B^{-1}$
- [x] $(A\T)^{-1} = (A^{-1})\T$
- [ ] $(A + B)^{-1} = A^{-1} + B^{-1}$
::: solution
The first and third are parts of [[#prop-inverse]]. The second fails because the order of the factors must be reversed: $(AB)(A^{-1}B^{-1})$ cannot be simplified unless $A$ and $B$ commute, and for the non-commuting matrices of [[#ex-noncommute]] it is not $I$. The last fails already for $A = B = I$: $(2I)^{-1} = \tfrac12 I$, not $2I$. (Also $A + B$ need not be invertible at all: take $B = -A$.)
:::
:::

## Elementary matrices

Each step of Gaussian elimination can itself be performed by a matrix multiplication. This turns facts about elimination into facts about matrices.

::: definition Elementary matrix {#def-elementary}
An **elementary matrix** is a matrix obtained from an identity matrix $I_m$ by a single elementary row operation.
:::

For example, with $m = 3$, the operations $R_3 \to R_3 - 4R_1$, $R_1 \leftrightarrow R_2$ and $R_2 \to 5R_2$ give

$$
E_1 = \begin{pmatrix}1&0&0\\0&1&0\\-4&0&1\end{pmatrix},\qquad E_2 = \begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix},\qquad E_3 = \begin{pmatrix}1&0&0\\0&5&0\\0&0&1\end{pmatrix}.
$$

::: theorem Row operations are multiplications {#thm-elementary}
Let $E$ be the elementary matrix obtained by applying a row operation to $I_m$. Then for every $m\times n$ matrix $A$, the product $EA$ is the matrix obtained by applying the same row operation to $A$. Moreover $E$ is invertible, and $E^{-1}$ is the elementary matrix of the reverse operation.
:::

::: proof
By the row form of the product, row $i$ of $EA$ is (row $i$ of $E$)$\,A$, and if row $i$ of $E$ is $\mathbf{e}_k\T$ then this is row $k$ of $A$. For a replacement $R_i \to R_i + cR_j$, rows other than $i$ of $E$ are the rows $\mathbf{e}_k\T$ of $I$, so the corresponding rows of $EA$ are those of $A$; and row $i$ of $E$ is $\mathbf{e}_i\T + c\,\mathbf{e}_j\T$, so row $i$ of $EA$ is (row $i$ of $A$) $+\ c\,$(row $j$ of $A$). This is the replacement applied to $A$. Interchanges and scalings are checked in the same way.

Now let $F$ be the elementary matrix of the reverse operation (which exists by the proof of [[linear-algebra/linear-systems#thm-row-ops]]). By the first part, $FE$ is the result of applying the reverse operation to $E$; since $E$ came from $I$ by the original operation, $FE = I$. In the same way $EF = I$. So $E^{-1} = F$.
:::

::: widget transform2d
matrix: 1,0; 2,1
caption: The elementary matrix of $R_2 \to R_2 + 2R_1$ acting on the plane: it sends $(x, y)$ to $(x, 2x + y)$, a **shear** that slides each point vertically by twice its $x$-coordinate. The unit square becomes a parallelogram of the same area. Change the $2$ to $-2$ to see the inverse shear, which undoes it.
:::

Now we can prove the central theorem about square matrices: invertibility can be detected in many different-looking ways, all of which turn out to be the same.

::: theorem The invertible matrix theorem (first version) {#thm-imt}
For an $n\times n$ matrix $A$, the following statements are equivalent.

1. $A$ is invertible.
2. $A$ has a left inverse: $CA = I$ for some $n\times n$ matrix $C$.
3. The equation $A\mathbf{x} = \mathbf{0}$ has only the trivial solution.
4. $A$ has $n$ pivot positions; equivalently, the reduced row echelon form of $A$ is $I_n$.
5. $A$ is a product of elementary matrices.
6. The equation $A\mathbf{x} = \mathbf{b}$ has at least one solution for every $\mathbf{b}\in\R^n$.
7. $A$ has a right inverse: $AD = I$ for some $n\times n$ matrix $D$.
:::

::: proof
We prove $1\Rightarrow2\Rightarrow3\Rightarrow4\Rightarrow5\Rightarrow1$ and then $1\Rightarrow7\Rightarrow6\Rightarrow4$.

($1\Rightarrow2$) Take $C = A^{-1}$.

($2\Rightarrow3$) If $A\mathbf{x} = \mathbf{0}$ then $\mathbf{x} = I\mathbf{x} = CA\mathbf{x} = C\mathbf{0} = \mathbf{0}$.

($3\Rightarrow4$) The homogeneous system is consistent, so by [[linear-algebra/linear-systems#thm-exist-unique]] uniqueness of its solution means there are no free variables: all $n$ columns are pivot columns. Since pivots move strictly down and to the right, the pivot of column $k$ must be in row $k$, and in reduced echelon form a pivot column is a standard basis vector. Hence the RREF is $(\mathbf{e}_1 \cdots \mathbf{e}_n) = I_n$.

($4\Rightarrow5$) There are elementary matrices with $E_k\cdots E_2E_1A = I$, by [[#thm-elementary]]. Multiplying on the left by $E_1^{-1}E_2^{-1}\cdots E_k^{-1}$ gives $A = E_1^{-1}\cdots E_k^{-1}$, and each $E_i^{-1}$ is elementary.

($5\Rightarrow1$) Elementary matrices are invertible, and products of invertible matrices are invertible by [[#prop-inverse]].

($1\Rightarrow7$) Take $D = A^{-1}$.

($7\Rightarrow6$) Given $\mathbf{b}$, the vector $\mathbf{x} = D\mathbf{b}$ satisfies $A\mathbf{x} = AD\mathbf{b} = \mathbf{b}$.

($6\Rightarrow4$) Suppose 4 fails. Choose elementary matrices with $EA = R$, where $E = E_k\cdots E_1$ and $R$ is the RREF of $A$. Then $R$ has fewer than $n$ pivots, so its last row is zero. Put $\mathbf{b} = E^{-1}\mathbf{e}_n$. Applying the same row operations to the augmented matrix gives $E\,[\,A\mid\mathbf{b}\,] = [\,R\mid\mathbf{e}_n\,]$, whose last row is $[\,0\ \cdots\ 0\mid 1\,]$. So $A\mathbf{x} = \mathbf{b}$ is inconsistent, and 6 fails.
:::

The theorem will grow as the course proceeds: [[linear-algebra/basis-dimension]], [[linear-algebra/determinants]] and [[linear-algebra/eigenvalues]] each add conditions to the list. Two consequences are worth stating separately.

::: corollary One-sided inverses suffice {#cor-one-sided}
If $A$ and $B$ are $n\times n$ matrices with $AB = I$, then $A$ and $B$ are invertible and $B = A^{-1}$ (so also $BA = I$).
:::

::: proof
$AB = I$ is condition 7 for $A$, so $A$ is invertible, and then $B = A^{-1}(AB) = A^{-1}I = A^{-1}$. Since $B$ is the inverse of $A$, it is invertible with inverse $A$.
:::

::: algorithm Computing an inverse {#alg-inverse}
To invert an $n \times n$ matrix $A$, row reduce the $n\times 2n$ matrix $[\,A\mid I\,]$. If the left block reduces to $I$, the result is $[\,I \mid A^{-1}\,]$. If the left block acquires fewer than $n$ pivots, $A$ is not invertible.
:::

Why this works: if $E_k\cdots E_1 A = I$, then $E_k\cdots E_1 = A^{-1}$ by [[#cor-one-sided]], and the same operations turn the right-hand block $I$ into $E_k\cdots E_1I = A^{-1}$. If $A$ has fewer than $n$ pivots, it is singular by [[#thm-imt]].

::: example Inverting a 3×3 matrix {#ex-inverse}
Find the inverse of $A = \begin{pmatrix}1&1&1\\1&2&2\\1&2&3\end{pmatrix}$.
::: solution
Row reduce $[\,A\mid I\,]$:

$$
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 1&2&2&0&1&0\\ 1&2&3&0&0&1 \end{array}\right]
\xrightarrow[R_3 - R_1]{R_2 - R_1}
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 0&1&1&-1&1&0\\ 0&1&2&-1&0&1 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 0&1&1&-1&1&0\\ 0&0&1&0&-1&1 \end{array}\right]
$$

$$
\xrightarrow[R_1 - R_3]{R_2 - R_3}
\left[\begin{array}{ccc|ccc} 1&1&0&1&1&-1\\ 0&1&0&-1&2&-1\\ 0&0&1&0&-1&1 \end{array}\right]
\xrightarrow{R_1 - R_2}
\left[\begin{array}{ccc|ccc} 1&0&0&2&-1&0\\ 0&1&0&-1&2&-1\\ 0&0&1&0&-1&1 \end{array}\right].
$$

The left block is $I$, so $A$ is invertible and

$$
A^{-1} = \begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

*Check:* the first row of $AA^{-1}$ is $(1,1,1)A^{-1} = (2-1+0,\ -1+2-1,\ 0-1+1) = (1,0,0)$, and the other rows work out similarly. Notice that $A$ and $A^{-1}$ are both symmetric, as [[#exr-sym-inverse]] predicts.
:::
:::

::: widget rowreduce
matrix: 1,1,1,1,0,0; 1,2,2,0,1,0; 1,2,3,0,0,1
augmented: false
caption: [[#alg-inverse]] for the matrix of [[#ex-inverse]]. The same row operations act on both halves; when the left half becomes $I$, the right half has become $A^{-1}$. Try to predict each step before you take it.
:::

::: example Factorising into elementary matrices {#ex-elementary}
Write $A = \begin{pmatrix}1&2\\3&4\end{pmatrix}$ and $A^{-1}$ as products of elementary matrices.
::: solution
Reduce $A$ to $I$, recording the elementary matrix of each step:

$$
\begin{pmatrix}1&2\\3&4\end{pmatrix} \xrightarrow{R_2 - 3R_1} \begin{pmatrix}1&2\\0&-2\end{pmatrix} \xrightarrow{-\frac12 R_2} \begin{pmatrix}1&2\\0&1\end{pmatrix} \xrightarrow{R_1 - 2R_2} \begin{pmatrix}1&0\\0&1\end{pmatrix},
$$

with $E_1 = \begin{pmatrix}1&0\\-3&1\end{pmatrix}$, $E_2 = \begin{pmatrix}1&0\\0&-\frac12\end{pmatrix}$, $E_3 = \begin{pmatrix}1&-2\\0&1\end{pmatrix}$. Thus $E_3E_2E_1A = I$, so

$$
A^{-1} = E_3E_2E_1 = \begin{pmatrix}-2&1\\ \tfrac32&-\tfrac12\end{pmatrix}, \qquad A = E_1^{-1}E_2^{-1}E_3^{-1} = \begin{pmatrix}1&0\\3&1\end{pmatrix}\begin{pmatrix}1&0\\0&-2\end{pmatrix}\begin{pmatrix}1&2\\0&1\end{pmatrix}.
$$

The formula [[#eq-inv2]] confirms $A^{-1}$: $ad - bc = 4 - 6 = -2$ and $\frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix} = \begin{pmatrix}-2&1\\ \frac32 & -\frac12\end{pmatrix}$. Geometrically, $A$ is a shear, followed by a stretch-and-reflection, followed by another shear.
:::
:::

::: quiz
$A$ is a $4\times 4$ matrix and the equation $A\mathbf{x} = \mathbf{0}$ has a non-trivial solution. Which of the following must be true? (Select all that apply.)
- [x] $A$ is not invertible.
- [x] For some $\mathbf{b}$, the system $A\mathbf{x} = \mathbf{b}$ has no solution.
- [x] The reduced row echelon form of $A$ has a row of zeros.
- [ ] $A$ has a column of zeros.
::: solution
Condition 3 of [[#thm-imt]] fails, so every condition fails: $A$ is singular (not 1), some $A\mathbf{x} = \mathbf{b}$ is inconsistent (not 6), and $A$ has fewer than $4$ pivots, so the last row of its RREF is zero (not 4). But $A$ need not have a zero column: the $4\times 4$ matrix with rows $(1,1,0,0)$, $(1,1,0,0)$, $(0,0,1,0)$, $(0,0,0,1)$ has the non-trivial solution $(1,-1,0,0)$ and no zero column.
:::
:::

## The LU factorisation

When the same coefficient matrix appears with many right-hand sides — as in engineering, where one structure is tested under many loads — it would be wasteful to repeat the elimination each time. The cure is to record the elimination once, as a factorisation.

::: definition LU factorisation {#def-lu}
A square matrix $L$ is **lower triangular** if all its entries above the diagonal are zero, and **unit** lower triangular if moreover its diagonal entries are $1$; $U$ is **upper triangular** if all entries below the diagonal are zero. An **LU factorisation** of an $m\times n$ matrix $A$ is a factorisation $A = LU$ with $L$ an $m\times m$ unit lower triangular matrix and $U$ an $m\times n$ matrix in row echelon form.
:::

::: theorem Elimination is a factorisation {#thm-lu}
Suppose Gaussian elimination brings $A$ to an echelon form $U$ using only replacements $R_i \to R_i - \ell_{ip}R_p$ in which a multiple of the $p$-th pivot row is subtracted from a row below it ($i > p$). Then $A = LU$, where $L$ is the unit lower triangular matrix whose entry in position $(i, p)$ is the multiplier $\ell_{ip}$ (and $0$ if no such step was taken).
:::

::: proof
The replacements using pivot row $p$ subtract $\ell_{ip}$ times row $p$ from row $i$ for each $i > p$. Since they all use the same, unchanged row $p$, together they amount to multiplication on the left by

$$
L_p = I - \boldsymbol{\ell}_p\mathbf{e}_p\T, \qquad \boldsymbol{\ell}_p = (0, \dots, 0, \ell_{p+1,p}, \dots, \ell_{m,p}),
$$

because $(I - \boldsymbol{\ell}_p\mathbf{e}_p\T)A = A - \boldsymbol{\ell}_p(\text{row } p \text{ of } A)$. The key fact is that $\mathbf{e}_q\T\boldsymbol{\ell}_p$, the $q$-th entry of $\boldsymbol{\ell}_p$, is zero whenever $q \le p$. Hence

$$
(I - \boldsymbol{\ell}_p\mathbf{e}_p\T)(I + \boldsymbol{\ell}_p\mathbf{e}_p\T) = I - \boldsymbol{\ell}_p(\mathbf{e}_p\T\boldsymbol{\ell}_p)\mathbf{e}_p\T = I,
$$

so $L_p^{-1} = I + \boldsymbol{\ell}_p\mathbf{e}_p\T$. Elimination gives $L_r\cdots L_2L_1A = U$, so $A = L_1^{-1}L_2^{-1}\cdots L_r^{-1}U$. Expanding the product $(I + \boldsymbol{\ell}_1\mathbf{e}_1\T)(I + \boldsymbol{\ell}_2\mathbf{e}_2\T)\cdots(I + \boldsymbol{\ell}_r\mathbf{e}_r\T)$, every term containing two or more factors $\boldsymbol{\ell}_p\mathbf{e}_p\T$ and $\boldsymbol{\ell}_q\mathbf{e}_q\T$ with $p < q$ (in that order) contains $\mathbf{e}_p\T\boldsymbol{\ell}_q = 0$. Therefore

$$
L = L_1^{-1}\cdots L_r^{-1} = I + \boldsymbol{\ell}_1\mathbf{e}_1\T + \dots + \boldsymbol{\ell}_r\mathbf{e}_r\T,
$$

which has $1$s on the diagonal and the multiplier $\ell_{ip}$ in position $(i,p)$: the multipliers simply drop into place.
:::

To solve $A\mathbf{x} = LU\mathbf{x} = \mathbf{b}$, put $\mathbf{y} = U\mathbf{x}$ and solve two triangular systems: first $L\mathbf{y} = \mathbf{b}$ by **forward substitution** (top to bottom), then $U\mathbf{x} = \mathbf{y}$ by back substitution. The factorisation costs about $\tfrac23 n^3$ operations once; each further right-hand side costs only about $2n^2$.

::: example Factorise, then solve {#ex-lu}
Find an LU factorisation of $A = \begin{pmatrix}2&1&1\\4&-6&0\\-2&7&2\end{pmatrix}$ and use it to solve $A\mathbf{x} = (5, -2, 9)$.
::: solution
Eliminate, recording the multipliers:

$$
\begin{pmatrix}2&1&1\\4&-6&0\\-2&7&2\end{pmatrix}
\xrightarrow[R_3 - (-1)R_1]{R_2 - 2R_1}
\begin{pmatrix}2&1&1\\0&-8&-2\\0&8&3\end{pmatrix}
\xrightarrow{R_3 - (-1)R_2}
\begin{pmatrix}2&1&1\\0&-8&-2\\0&0&1\end{pmatrix} = U.
$$

The multipliers are $\ell_{21} = 2$, $\ell_{31} = -1$, $\ell_{32} = -1$, so

$$
A = LU = \begin{pmatrix}1&0&0\\2&1&0\\-1&-1&1\end{pmatrix}\begin{pmatrix}2&1&1\\0&-8&-2\\0&0&1\end{pmatrix}.
$$

Forward substitution in $L\mathbf{y} = (5,-2,9)$: $y_1 = 5$; $2y_1 + y_2 = -2$ gives $y_2 = -12$; $-y_1 - y_2 + y_3 = 9$ gives $y_3 = 9 + 5 - 12 = 2$. Back substitution in $U\mathbf{x} = (5, -12, 2)$: $x_3 = 2$; $-8x_2 - 2x_3 = -12$ gives $x_2 = 1$; $2x_1 + x_2 + x_3 = 5$ gives $x_1 = 1$. So $\mathbf{x} = (1, 1, 2)$, and indeed $A\mathbf{x} = (2 + 1 + 2,\ 4 - 6,\ -2 + 7 + 4) = (5, -2, 9)$.
:::
:::

::: remark When row interchanges are needed
Not every matrix has an LU factorisation. If $\begin{pmatrix}0&1\\1&1\end{pmatrix} = \begin{pmatrix}1&0\\ \ell&1\end{pmatrix}\begin{pmatrix}u_{11}&u_{12}\\0&u_{22}\end{pmatrix}$, then comparing $(1,1)$ entries gives $u_{11} = 0$, and then the $(2,1)$ entry $\ell u_{11} = 0 \neq 1$ — impossible. The fix is to interchange rows first. In general one proves that every square matrix has a factorisation $PA = LU$, where $P$ is a **permutation matrix** (the identity with its rows reordered) recording the interchanges. This is what numerical libraries compute, choosing the interchanges for stability as in [[linear-algebra/linear-systems]]; see [[numerical-analysis/direct-methods]].
:::

::: application Counting walks in a network
Label the vertices of a network $1, \dots, n$ and let $A$ be its **adjacency matrix**: $a_{ij} = 1$ if there is a link from $i$ to $j$ and $0$ otherwise. Then the $(i,j)$ entry of $A^k$ is the number of walks of length $k$ from $i$ to $j$. For $k = 1$ this is the definition; and if it holds for $k$, then $(A^{k+1})_{ij} = \sum_l (A^k)_{il}a_{lj}$ counts, for each possible last-but-one vertex $l$, the walks of length $k$ from $i$ to $l$ that can be followed by a link from $l$ to $j$ — so it holds for $k + 1$ by induction ([[proofs/induction]]). Matrix powers therefore measure connectivity, an idea used in the analysis of social networks and, via eigenvectors, in ranking web pages ([[linear-algebra/eigenvalues]], [[discrete/graphs]]).
:::

::: history
Arthur Cayley's *A memoir on the theory of matrices* (1858) was the first treatment of matrices as algebraic objects. Cayley defined their sum and product — the product chosen precisely so that it represents the composition of two linear substitutions, as in [[#def-product]] — observed that multiplication is not commutative, and introduced the inverse. The word *matrix* had been coined in 1850 by his friend James Joseph Sylvester, who chose the Latin word for "womb" because an array of numbers gives birth to many determinants (its minors). The interpretation of Gaussian elimination as a factorisation $A = LU$ came much later, with the rise of mechanical and electronic computation: it appears in the work of the Polish astronomer Tadeusz Banachiewicz in 1938, and Alan Turing's 1948 paper *Rounding-off errors in matrix processes* analysed elimination in exactly this form.
:::

## Where this leads

Matrix multiplication is composition of linear maps, a point of view developed fully in [[linear-algebra/linear-maps]], where every linear map between finite-dimensional spaces is shown to be given by a matrix. The invertible matrix theorem will gain new conditions in terms of rank ([[linear-algebra/basis-dimension]]), the determinant ([[linear-algebra/determinants]]) and eigenvalues ([[linear-algebra/eigenvalues]]). Factorisations are the organising principle of numerical linear algebra: after $A = LU$ we will meet $A = QR$ ([[linear-algebra/inner-products]]), $A = PDP^{-1}$ ([[linear-algebra/eigenvalues]]), $A = QDQ\T$ ([[linear-algebra/spectral-theorem]]) and $A = U\Sigma V\T$ ([[linear-algebra/svd]]). The invertible matrices of a given size form a group under multiplication, a central example in [[abstract-algebra/groups]].

::: summary
- The product $AB$ is defined so that $(AB)\mathbf{x} = A(B\mathbf{x})$: its columns are $A\mathbf{b}_j$, and $(AB)_{ij} = \sum_k a_{ik}b_{kj}$ ([[#thm-compose]]).
- Matrix multiplication is associative and distributive but **not commutative**; products can vanish without either factor vanishing, and cancellation fails.
- $(AB)\T = B\T A\T$ and $(AB)^{-1} = B^{-1}A^{-1}$: the order reverses.
- $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ is invertible exactly when $ad - bc\neq 0$ ([[#thm-inverse-2x2]]).
- Every row operation is left multiplication by an invertible elementary matrix ([[#thm-elementary]]).
- The invertible matrix theorem: for square $A$, being invertible is equivalent to $A\mathbf{x} = \mathbf{0}$ having only the trivial solution, to $A$ having $n$ pivots, to $A\mathbf{x} = \mathbf{b}$ always being solvable, and to having a one-sided inverse ([[#thm-imt]]).
- Compute $A^{-1}$ by row reducing $[\,A\mid I\,]$ — but solve systems by elimination, not by inverting.
- Gaussian elimination without interchanges is the factorisation $A = LU$, with the multipliers stored in $L$ ([[#thm-lu]]).
:::

## Exercises

::: exercise Practice with products {level=1}
Let $A = \begin{pmatrix}2&-1\\0&3\end{pmatrix}$, $B = \begin{pmatrix}1&4\\-2&1\end{pmatrix}$ and $\mathbf{x} = \begin{pmatrix}1\\1\end{pmatrix}$. Compute $AB$, $BA$, $(AB)\mathbf{x}$ and $A(B\mathbf{x})$.
::: solution
By the row–column rule, $AB = \begin{pmatrix}2+2 & 8-1\\ 0-6 & 0+3\end{pmatrix} = \begin{pmatrix}4&7\\-6&3\end{pmatrix}$ and $BA = \begin{pmatrix}2+0 & -1+12\\ -4+0 & 2+3\end{pmatrix} = \begin{pmatrix}2&11\\-4&5\end{pmatrix}$, so $AB \neq BA$. Next $(AB)\mathbf{x} = (4 + 7, -6 + 3) = (11, -3)$, while $B\mathbf{x} = (5, -1)$ and $A(B\mathbf{x}) = (10 + 1, 0 - 3) = (11, -3)$, the same, as [[#thm-compose]] guarantees.
:::
:::

::: exercise When is it singular? {level=1 check="3"}
For which value of $k$ is the matrix $\begin{pmatrix}1&k\\2&6\end{pmatrix}$ singular? For the other values of $k$, give its inverse.
::: solution
By [[#thm-inverse-2x2]] the matrix is singular exactly when $1\cdot 6 - 2k = 0$, i.e. $k = 3$. Otherwise its inverse is $\dfrac{1}{6 - 2k}\begin{pmatrix}6&-k\\-2&1\end{pmatrix}$.
:::
:::

::: exercise Inverting by row reduction {level=1}
Use [[#alg-inverse]] to find the inverse of $\begin{pmatrix}1&0&2\\0&1&1\\1&1&4\end{pmatrix}$.
::: solution
$$
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 1&1&4&0&0&1 \end{array}\right]
\xrightarrow{R_3 - R_1}
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 0&1&2&-1&0&1 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 0&0&1&-1&-1&1 \end{array}\right]
$$

and then $R_2 \to R_2 - R_3$, $R_1 \to R_1 - 2R_3$ give

$$
\left[\begin{array}{ccc|ccc} 1&0&0&3&2&-2\\ 0&1&0&1&2&-1\\ 0&0&1&-1&-1&1 \end{array}\right], \qquad\text{so}\qquad A^{-1} = \begin{pmatrix}3&2&-2\\1&2&-1\\-1&-1&1\end{pmatrix}.
$$

Check one entry of $AA^{-1}$: row 3 of $A$ times column 1 of $A^{-1}$ is $3 + 1 - 4 = 0$, as it should be.
:::
:::

::: exercise Solving with an LU factorisation {level=2}
Find the LU factorisation of $A = \begin{pmatrix}1&2&1\\2&5&4\\3&8&9\end{pmatrix}$ and use it to solve $A\mathbf{x} = (4, 11, 20)$.
::: solution
$R_2 - 2R_1$ and $R_3 - 3R_1$ give rows $(0,1,2)$ and $(0,2,6)$; then $R_3 - 2R_2$ gives $(0,0,2)$. So

$$
L = \begin{pmatrix}1&0&0\\2&1&0\\3&2&1\end{pmatrix}, \qquad U = \begin{pmatrix}1&2&1\\0&1&2\\0&0&2\end{pmatrix}.
$$

Forward substitution in $L\mathbf{y} = (4, 11, 20)$: $y_1 = 4$, $y_2 = 11 - 8 = 3$, $y_3 = 20 - 12 - 6 = 2$. Back substitution in $U\mathbf{x} = \mathbf{y}$: $x_3 = 1$, $x_2 = 3 - 2 = 1$, $x_1 = 4 - 2 - 1 = 1$. So $\mathbf{x} = (1, 1, 1)$. For another right-hand side, only the two cheap triangular solves need to be repeated.
:::
:::

::: exercise Counting walks {level=2 check="4"}
A network has vertices $1, 2, 3, 4$ and two-way links $1$–$2$, $2$–$3$, $3$–$1$ and $3$–$4$. Write down its adjacency matrix $A$, compute $A^2$ and $A^3$, and find the number of walks of length $3$ from vertex $1$ to vertex $3$.
::: solution
$$
A = \begin{pmatrix}0&1&1&0\\1&0&1&0\\1&1&0&1\\0&0&1&0\end{pmatrix},\qquad A^2 = \begin{pmatrix}2&1&1&1\\1&2&1&1\\1&1&3&0\\1&1&0&1\end{pmatrix},\qquad A^3 = \begin{pmatrix}2&3&4&1\\3&2&4&1\\4&4&2&3\\1&1&3&0\end{pmatrix}.
$$

The $(1,3)$ entry of $A^3$ is $4$. Directly: the walks are $1\,2\,1\,3$, $1\,3\,1\,3$, $1\,3\,2\,3$ and $1\,3\,4\,3$.
:::
:::

::: exercise Squares of sums {level=2}
Prove that for $n\times n$ matrices, $(A + B)^2 = A^2 + 2AB + B^2$ if and only if $AB = BA$. Find two $2\times 2$ matrices for which the identity fails.
::: solution
By distributivity, $(A + B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$. This equals $A^2 + 2AB + B^2$ if and only if $AB + BA = 2AB$, i.e. $BA = AB$. For a failure take the non-commuting $R$ and $S$ of [[#ex-noncommute]]: $(R + S)^2 = \begin{pmatrix}1&0\\1&1\end{pmatrix}^2 = \begin{pmatrix}1&0\\2&1\end{pmatrix}$, while $R^2 + 2RS + S^2 = \begin{pmatrix}-1&0\\0&-1\end{pmatrix} + \begin{pmatrix}0&-2\\2&2\end{pmatrix} + \begin{pmatrix}1&2\\0&1\end{pmatrix} = \begin{pmatrix}0&0\\2&2\end{pmatrix}$.
:::
:::

::: exercise Symmetric inverses {level=2 #exr-sym-inverse}
Prove that if $A$ is symmetric and invertible, then $A^{-1}$ is symmetric.
::: solution
By [[#prop-inverse]], $(A^{-1})\T = (A\T)^{-1}$, and $A\T = A$, so $(A^{-1})\T = A^{-1}$.
:::
:::

::: exercise Triangular matrices {level=3}
Prove that the product of two upper triangular $n\times n$ matrices is upper triangular, and that an upper triangular matrix with non-zero diagonal entries is invertible with an upper triangular inverse.
::: hint
For the second part, think about what [[#alg-inverse]] does to an upper triangular matrix.
:::
::: solution
Let $A$ and $B$ be upper triangular, so $a_{ik} = 0$ for $i > k$ and $b_{kj} = 0$ for $k > j$. If $i > j$, then in $(AB)_{ij} = \sum_k a_{ik}b_{kj}$ every term has $k < i$ (so $a_{ik} = 0$) or $k \ge i > j$ (so $b_{kj} = 0$); hence $(AB)_{ij} = 0$ and $AB$ is upper triangular.

Now let $U$ be upper triangular with non-zero diagonal entries. It is already in echelon form with $n$ pivots, so it is invertible by [[#thm-imt]]. Row reduce $[\,U \mid I\,]$ by scaling each row by the reciprocal of its diagonal entry and then using replacements $R_i \to R_i - cR_j$ with $j > i$ only (clearing the entries above each pivot, working from the bottom up). The elementary matrices of these operations are upper triangular (a scaling is diagonal; $R_i \to R_i - cR_j$ with $j>i$ puts $-c$ in position $(i,j)$ above the diagonal). Since $U^{-1}$ is the product of these elementary matrices, it is upper triangular by the first part.
:::
:::

::: exercise A nilpotent perturbation {level=3}
A square matrix $N$ is **nilpotent** if $N^k = O$ for some $k\ge 1$. Prove that then $I - N$ is invertible, with $(I - N)^{-1} = I + N + N^2 + \dots + N^{k-1}$. Use this to invert $\begin{pmatrix}1&-2&3\\0&1&-4\\0&0&1\end{pmatrix}$.
::: solution
Multiply out, using distributivity; the sum telescopes:

$$
(I - N)(I + N + \dots + N^{k-1}) = (I + N + \dots + N^{k-1}) - (N + N^2 + \dots + N^k) = I - N^k = I.
$$

By [[#cor-one-sided]] this one equation already shows that $I - N$ is invertible with the stated inverse. For the example, $I - N$ with $N = \begin{pmatrix}0&2&-3\\0&0&4\\0&0&0\end{pmatrix}$, and $N^2 = \begin{pmatrix}0&0&8\\0&0&0\\0&0&0\end{pmatrix}$, $N^3 = O$. Hence

$$
(I - N)^{-1} = I + N + N^2 = \begin{pmatrix}1&2&5\\0&1&4\\0&0&1\end{pmatrix}.
$$

(This is the finite version of the geometric series $1/(1 - x) = 1 + x + x^2 + \cdots$.)
:::
:::

::: exercise The trace of a commutator {level=3 #exr-trace}
The **trace** of a square matrix is the sum of its diagonal entries, $\tr A = a_{11} + \dots + a_{nn}$. Prove that $\tr(AB) = \tr(BA)$ for all $n\times n$ matrices $A, B$, and deduce that there are no $n\times n$ real matrices with $AB - BA = I$.
::: solution
By the row–column rule,

$$
\tr(AB) = \sum_{i=1}^n (AB)_{ii} = \sum_{i=1}^n\sum_{k=1}^n a_{ik}b_{ki} = \sum_{k=1}^n\sum_{i=1}^n b_{ki}a_{ik} = \sum_{k=1}^n (BA)_{kk} = \tr(BA).
$$

The trace is additive, so $\tr(AB - BA) = \tr(AB) - \tr(BA) = 0$, whereas $\tr I = n \neq 0$. Hence $AB - BA \neq I$. (In quantum mechanics the position and momentum operators satisfy a relation of the form $AB - BA = cI$ with $c \neq 0$; this exercise shows that they cannot be represented by finite matrices.)
:::
:::
