Three points determine a parabola. Suppose we want the quadratic $y = a + bx + cx^2$ whose graph passes through $(1, 2)$, $(2, 3)$ and $(3, 6)$. Substituting each point gives one condition on the unknown coefficients:

$$
\begin{aligned} a + b + c &= 2,\\ a + 2b + 4c &= 3,\\ a + 3b + 9c &= 6. \end{aligned}
$$ {#eq-parabola}

Each condition is a *linear* equation in $a, b, c$: the unknowns appear only to the first power, multiplied by constants and added together. Problems of this shape are everywhere — fitting curves to points, balancing chemical reactions, computing currents in a circuit, equilibrium prices in an economy, the forces in the members of a bridge and, with millions of unknowns, the simulations behind weather forecasts and aircraft design. Every time, the same three questions come up.

1. Is there a solution at all? This is the question of **existence**.
2. If there is one, is it the only one? This is the question of **uniqueness**.
3. How do we find all the solutions, efficiently and reliably?

This chapter answers all three with a single algorithm, **Gaussian elimination**, which reduces any system to a standard form from which the answers can simply be read off. The facts proved here — about pivots, free variables and the shape of solution sets — reappear in every later chapter of the course.

## Linear equations and their solutions

::: definition Linear system {#def-system}
A **linear equation** in the unknowns $x_1, \dots, x_n$ is an equation that can be written in the form

$$
a_1x_1 + a_2x_2 + \dots + a_nx_n = b,
$$

where the **coefficients** $a_1, \dots, a_n$ and the right-hand side $b$ are given numbers. A **system of linear equations** (or **linear system**) is a finite list of linear equations in the same unknowns. A **solution** of the system is a list $(s_1, \dots, s_n)$ of numbers that satisfies every equation when $s_j$ is substituted for $x_j$, and the set of all solutions is the **solution set**. A system is **consistent** if it has at least one solution and **inconsistent** if it has none. Two systems are **equivalent** if they have the same solution set.
:::

For now the numbers are real. The algebra of this chapter works word for word over the complex numbers, or over any field such as the integers modulo a prime (see [[abstract-algebra/fields-galois]]), because we only ever add, subtract, multiply and divide by non-zero numbers. The one change over a finite field is that a free variable can take only finitely many values, so "infinitely many solutions" must be read as "more than one solution".

The equation $3x_1 = 2x_2 - 7$ is linear, because it can be rearranged to $3x_1 - 2x_2 = -7$. The equations $x_1x_2 = 1$, $\sqrt{x_1} + x_2 = 3$ and $\sin x_1 = 0$ are not: a product of unknowns, a root of an unknown or a function applied to an unknown all destroy linearity.

### The row picture and the column picture

Consider the system

$$
\begin{aligned} 2x - y &= 1,\\ x + y &= 5. \end{aligned}
$$ {#eq-small}

In the **row picture** we look at one equation at a time. Each equation describes a line in the plane, and a solution is a point lying on both lines. Adding the two equations gives $3x = 6$, so $x = 2$ and then $y = 3$: the lines cross at $(2, 3)$. Two lines in the plane can meet in exactly one point, be parallel and never meet, or coincide and share infinitely many points. In three unknowns each equation describes a plane in space, and the solutions of a system are the points common to all the planes.

::: widget plot
f: 3 - x; (c - a*x)/2
x: -2, 6
y: -2, 5
sliders: a=1:-3:4:0.5; c=4:-2:8:0.5
labels: x + y = 3; ax + 2y = c
equal: true
caption: The row picture of the system $x + y = 3$, $ax + 2y = c$. At the start the lines cross at the single solution $(2, 1)$. Move $a$ to $2$: the lines become parallel and the system is inconsistent — unless you also set $c = 6$, when the two lines coincide and every point of the line is a solution. Exactly one, none, or infinitely many: we will prove that no other number of solutions is possible.
:::

In the **column picture** we read the system [[#eq-small]] vertically, as a single equation between vectors:

$$
x\begin{pmatrix}2\\1\end{pmatrix} + y\begin{pmatrix}-1\\1\end{pmatrix} = \begin{pmatrix}1\\5\end{pmatrix}.
$$

Now the question is: *which combination of the column vectors $(2,1)$ and $(-1,1)$ produces the vector $(1,5)$?* The answer, $2(2,1) + 3(-1,1) = (1, 5)$, is the same solution seen differently. The row picture is easier to draw, but the column picture is the one that generalises, and it is the point of view of the rest of this course.

### Matrix notation

A rectangular array of numbers with $m$ rows and $n$ columns is an $m \times n$ **matrix**. The entry in row $i$ and column $j$ of a matrix $A$ is written $a_{ij}$. A column vector with $n$ entries is an $n\times 1$ matrix, and the set of all such vectors with real entries is $\R^n$; we write vectors in bold, $\mathbf{x} = (x_1, \dots, x_n)$, and add them and multiply them by numbers entry by entry. The column picture suggests the following definition, which is the basic operation of the subject.

::: definition Matrix–vector product {#def-matvec}
Let $A$ be an $m\times n$ matrix with columns $\mathbf{a}_1, \dots, \mathbf{a}_n \in \R^m$, and let $\mathbf{x} \in \R^n$. The **product** $A\mathbf{x}$ is the vector in $\R^m$

$$
A\mathbf{x} = x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \dots + x_n\mathbf{a}_n.
$$

A sum of this kind — numbers times vectors, added — is called a **linear combination** of $\mathbf{a}_1, \dots, \mathbf{a}_n$ with **weights** $x_1, \dots, x_n$.
:::

Reading off entry $i$ of the linear combination gives the familiar **row–column rule**: the $i$-th entry of $A\mathbf{x}$ is $a_{i1}x_1 + a_{i2}x_2 + \dots + a_{in}x_n$, the $i$-th row of $A$ multiplied entry by entry against $\mathbf{x}$ and summed. So the system of $m$ equations

$$
\begin{aligned} a_{11}x_1 + \dots + a_{1n}x_n &= b_1\\ &\;\;\vdots\\ a_{m1}x_1 + \dots + a_{mn}x_n &= b_m \end{aligned}
$$

is exactly the single equation $A\mathbf{x} = \mathbf{b}$, where $A = (a_{ij})$ is the **coefficient matrix** and $\mathbf{b} = (b_1, \dots, b_m)$. Checking entry by entry from the row–column rule, the product has two properties we shall use constantly:

$$
A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v}, \qquad A(c\mathbf{u}) = c\,(A\mathbf{u}) \qquad (\mathbf{u}, \mathbf{v}\in\R^n,\ c\in\R).
$$ {#eq-linear}

For elimination we only need the numbers in the system, not the names of the unknowns. The **augmented matrix** $[\,A \mid \mathbf{b}\,]$ is $A$ with the column $\mathbf{b}$ attached; for the parabola system [[#eq-parabola]] it is

$$
\left[\begin{array}{ccc|c} 1&1&1&2\\ 1&2&4&3\\ 1&3&9&6 \end{array}\right].
$$

Each row of the augmented matrix records one equation, and each column (before the bar) records the coefficients of one unknown.

## Elementary row operations

The idea of elimination is to replace a system by a simpler one with the *same* solutions, over and over, until the solutions are obvious. Three kinds of step are allowed.

::: definition Elementary row operations {#def-row-ops}
The **elementary row operations** on a matrix are:

1. **Replacement:** add a multiple of one row to a different row, $R_i \to R_i + cR_j$ with $i \ne j$;
2. **Interchange:** swap two rows, $R_i \leftrightarrow R_j$;
3. **Scaling:** multiply a row by a *non-zero* number, $R_i \to cR_i$ with $c \neq 0$.

Two matrices are **row equivalent** if one can be obtained from the other by a finite sequence of elementary row operations.
:::

::: theorem Row operations preserve solutions {#thm-row-ops}
If the augmented matrices of two linear systems are row equivalent, then the two systems have the same solution set.
:::

::: proof
A sequence of operations is performed one step at a time, so it is enough to consider a single elementary row operation turning a system $S$ into a system $S'$.

*Every solution of $S$ solves $S'$.* An interchange only reorders the equations, and scaling multiplies both sides of one equation by $c$, so neither can affect a solution. For a replacement $R_i \to R_i + cR_j$, suppose $(s_1,\dots,s_n)$ satisfies equations $i$ and $j$:

$$
a_{i1}s_1 + \dots + a_{in}s_n = b_i, \qquad a_{j1}s_1 + \dots + a_{jn}s_n = b_j.
$$

Adding $c$ times the second identity to the first gives $(a_{i1} + ca_{j1})s_1 + \dots + (a_{in} + ca_{jn})s_n = b_i + cb_j$, which is the new equation $i$. All other equations are unchanged.

*Every solution of $S'$ solves $S$.* Each operation can be undone by an operation of the same type: $R_i \to R_i + cR_j$ is undone by $R_i \to R_i - cR_j$ (row $j$ itself was not changed), an interchange is undone by the same interchange, and $R_i \to cR_i$ is undone by $R_i \to c^{-1}R_i$, which is allowed because $c \neq 0$. So $S$ is obtained from $S'$ by an elementary row operation, and the first part, applied in this direction, shows that every solution of $S'$ solves $S$.
:::

The second half of the proof is why scaling by zero is forbidden: $R_i \to 0\cdot R_i$ wipes out an equation and cannot be undone, so it can enlarge the solution set. Because row operations are reversible, row equivalence is an equivalence relation (reflexive, symmetric and transitive — see [[proofs/relations]]).

::: warning Two operations at once
It is tempting to save time by performing $R_1 \to R_1 - R_2$ and $R_2 \to R_2 - R_1$ "simultaneously", both computed from the *old* rows. This is not a sequence of elementary row operations, and it can lose information: the two new rows are negatives of each other, so one equation has effectively been thrown away. Several replacements may be done in one step only if they all use the same unchanged pivot row, as in "subtract multiples of $R_1$ from every row below it".
:::

## Echelon forms and Gaussian elimination

Which systems are "obviously" solvable? Those in which each equation involves fewer unknowns than the one above it, so that we can solve from the bottom up.

::: definition Echelon forms {#def-echelon}
The **leading entry** of a non-zero row is its leftmost non-zero entry. A matrix is in **row echelon form** if

1. all zero rows are below all non-zero rows, and
2. the leading entry of each non-zero row lies strictly to the right of the leading entry of the row above it.

It is in **reduced row echelon form** (RREF) if, in addition,

3. every leading entry equals $1$, and
4. each leading $1$ is the only non-zero entry in its column.

The positions of the leading entries of an echelon form of $A$ are its **pivot positions**, the leading entries themselves are **pivots**, and the columns containing them are the **pivot columns**.
:::

Condition 2 forces every entry below a leading entry to be zero, which gives echelon forms their staircase shape. With $\blacksquare$ standing for a non-zero entry and $*$ for any entry, typical echelon and reduced echelon forms look like this:

$$
\begin{pmatrix} \blacksquare & * & * & * & *\\ 0 & \blacksquare & * & * & *\\ 0&0&0&\blacksquare & *\\ 0&0&0&0&0 \end{pmatrix}
\qquad\qquad
\begin{pmatrix} 1 & 0 & * & 0 & *\\ 0 & 1 & * & 0 & *\\ 0&0&0&1 & *\\ 0&0&0&0&0 \end{pmatrix}.
$$

::: quiz
Which of these matrices are in reduced row echelon form? (More than one answer may be correct.)
- [x] $\begin{pmatrix}1&0&2\\0&1&3\end{pmatrix}$
- [ ] $\begin{pmatrix}1&2&0\\0&2&1\end{pmatrix}$
- [ ] $\begin{pmatrix}1&3&0\\0&0&0\\0&0&1\end{pmatrix}$
- [x] $\begin{pmatrix}0&1&5&0\\0&0&0&1\end{pmatrix}$
::: solution
The first and last are in RREF: zero rows (none) at the bottom, leading entries are $1$, step to the right, and are alone in their columns. In the second matrix the leading entry of row 2 is $2$, not $1$ (it is in row echelon form but not reduced). The third has a zero row above a non-zero row. Note that the entries $2, 3$ and $5$ in non-pivot columns are allowed to be anything.
:::
:::

The algorithm that produces an echelon form is the systematic version of what you did at school when you "eliminated $x$" from a pair of equations.

::: algorithm Gauss–Jordan elimination {#alg-gauss-jordan}
Input: an $m \times n$ matrix $A$. Output: a matrix in reduced row echelon form, row equivalent to $A$.

1. Find the leftmost column that is not entirely zero (ignoring rows already used as pivot rows). It is a pivot column.
2. If necessary, interchange rows so that the top unused row has a non-zero entry — the pivot — in this column.
3. Use replacements $R_i \to R_i - (a_{ik}/a_{pk})R_p$ to create zeros in the pivot column below the pivot (here $R_p$ is the pivot row and $k$ the pivot column).
4. Mark the pivot row as used and repeat steps 1–3 on the rows below it, until no non-zero rows remain. The matrix is now in row echelon form.
5. Working from the bottom pivot upwards, scale each pivot row to make its pivot $1$, and use replacements to create zeros above the pivot.
:::

Steps 1–4 (the **forward phase**) are **Gaussian elimination**; step 5 (the **backward phase**) completes **Gauss–Jordan elimination**. Instead of step 5 one often stops at an echelon form and solves the equations from the last to the first, which is called **back substitution**. Each pass of steps 1–3 uses up one row, so the algorithm stops after at most $m$ passes; and since it uses only elementary row operations, the result is row equivalent to $A$.

::: example Fitting the parabola {#ex-parabola}
Solve the system [[#eq-parabola]] and find the parabola through $(1,2)$, $(2,3)$, $(3,6)$.
::: solution
We write $R_2 - R_1$ above an arrow for the replacement $R_2 \to R_2 - R_1$. The first column is a pivot column with pivot $1$ in row 1; clear the entries below it:

$$
\left[\begin{array}{ccc|c} 1&1&1&2\\ 1&2&4&3\\ 1&3&9&6 \end{array}\right]
\xrightarrow[R_3 - R_1]{R_2 - R_1}
\left[\begin{array}{ccc|c} 1&1&1&2\\ 0&1&3&1\\ 0&2&8&4 \end{array}\right]
\xrightarrow{R_3 - 2R_2}
\left[\begin{array}{ccc|c} 1&1&1&2\\ 0&1&3&1\\ 0&0&2&2 \end{array}\right].
$$

This is an echelon form, with pivots $1, 1, 2$ in the three coefficient columns. Back substitution: the last row says $2c = 2$, so $c = 1$; the second says $b + 3c = 1$, so $b = -2$; the first says $a + b + c = 2$, so $a = 3$. Alternatively, continue with the backward phase:

$$
\xrightarrow{\frac12 R_3}
\left[\begin{array}{ccc|c} 1&1&1&2\\ 0&1&3&1\\ 0&0&1&1 \end{array}\right]
\xrightarrow[R_1 - R_3]{R_2 - 3R_3}
\left[\begin{array}{ccc|c} 1&1&0&1\\ 0&1&0&-2\\ 0&0&1&1 \end{array}\right]
\xrightarrow{R_1 - R_2}
\left[\begin{array}{ccc|c} 1&0&0&3\\ 0&1&0&-2\\ 0&0&1&1 \end{array}\right].
$$

The RREF is the system $a = 3$, $b = -2$, $c = 1$, so the unique parabola is $y = 3 - 2x + x^2$. *Check:* at $x = 1, 2, 3$ it gives $2, 3, 6$.
:::
:::

::: widget rowreduce
matrix: 1,1,1,2; 1,2,4,3; 1,3,9,6
caption: Step through the elimination of [[#ex-parabola]] one row operation at a time. Watch the forward phase build the staircase of pivots, then the backward phase clear the entries above each pivot until the identity appears on the left and the solution $(3, -2, 1)$ on the right.
:::

Different choices of row operations lead to different echelon forms — you could, for instance, swap the first two rows at the start. Remarkably, the *reduced* echelon form at the end is always the same.

::: theorem Uniqueness of the reduced echelon form {#thm-rref-unique}
Every matrix is row equivalent to one and only one matrix in reduced row echelon form.
:::

::: proof
Existence is given by [[#alg-gauss-jordan]]. For uniqueness, suppose $R$ and $S$ are in RREF and both row equivalent to $A$; then $R$ and $S$ are row equivalent to each other. We prove by induction on the number $n$ of columns that two row equivalent $m\times n$ matrices in RREF are equal.

If $n = 1$, a matrix in RREF is either the zero column or the column $(1, 0, \dots, 0)$. Row operations turn a zero column into a zero column and a non-zero column into a non-zero column, so $R = S$.

Now let $n \ge 2$ and assume the result for $n - 1$ columns. Delete the last column of $R$ and $S$ to obtain $R'$ and $S'$. These are still in RREF, and the row operations turning $R$ into $S$ turn $R'$ into $S'$, because row operations act on each column separately. By the induction hypothesis $R' = S'$, so $R$ and $S$ can differ only in their last column. Suppose, for a contradiction, that $r_{in} \neq s_{in}$ for some row $i$.

Apply [[#thm-row-ops]] to the homogeneous systems $R\mathbf{x} = \mathbf{0}$ and $S\mathbf{x} = \mathbf{0}$, whose augmented matrices are row equivalent: they have the same solutions. If $\mathbf{x}$ is a solution then $(R - S)\mathbf{x} = R\mathbf{x} - S\mathbf{x} = \mathbf{0}$. The only non-zero column of $R - S$ is the last one, so entry $i$ of $(R-S)\mathbf{x}$ is $(r_{in} - s_{in})x_n$, and therefore $x_n = 0$. Thus *every* solution of $R\mathbf{x} = \mathbf{0}$ has $x_n = 0$. If the last column of $R$ were not a pivot column, we could solve $R\mathbf{x} = \mathbf{0}$ with $x_n = 1$ (set $x_n = 1$, the other non-pivot unknowns $0$, and solve each row for its pivot unknown). Hence the last column is a pivot column of $R$, and by the same argument of $S$. In a matrix in RREF a pivot column in the last position is the standard column with a single $1$ in the first row that is zero in all earlier columns. That row is determined by $R' = S'$, so the last columns of $R$ and $S$ are equal — a contradiction. Hence $R = S$.
:::

Consequently the pivot positions of a matrix are well defined: they are the positions of the leading $1$s in its RREF, and every echelon form of the matrix has its pivots in exactly these positions (the backward phase does not move pivots). The number of pivots will be called the **rank** of the matrix in [[linear-algebra/basis-dimension]].

## Reading off the solutions

Once the augmented matrix is in RREF, the solution set can be written down at once. Unknowns whose columns are pivot columns are called **basic variables**; the others are **free variables**.

::: example A system with free variables {#ex-free}
Solve

$$
\begin{aligned} x_1 + 2x_2 + x_3 \phantom{{}-3x_4} &= 5,\\ 2x_1 + 4x_2 + 3x_3 - \phantom{3}x_4 &= 12,\\ -x_1 - 2x_2 + 2x_3 - 3x_4 &= 1. \end{aligned}
$$
::: solution
Row reduce the augmented matrix:

$$
\left[\begin{array}{cccc|c} 1&2&1&0&5\\ 2&4&3&-1&12\\ -1&-2&2&-3&1 \end{array}\right]
\xrightarrow[R_3 + R_1]{R_2 - 2R_1}
\left[\begin{array}{cccc|c} 1&2&1&0&5\\ 0&0&1&-1&2\\ 0&0&3&-3&6 \end{array}\right]
\xrightarrow[R_1 - R_2]{R_3 - 3R_2}
\left[\begin{array}{cccc|c} 1&2&0&1&3\\ 0&0&1&-1&2\\ 0&0&0&0&0 \end{array}\right].
$$

After the first step the second column has no possible pivot (its entries below row 1 are zero), so the next pivot is in column 3. The pivot columns are 1 and 3, so $x_1, x_3$ are basic and $x_2, x_4$ are free. The zero row says $0 = 0$ and imposes nothing. The two remaining equations, solved for the basic variables, are

$$
x_1 = 3 - 2x_2 - x_4, \qquad x_3 = 2 + x_4.
$$

The free variables may take any values: writing $x_2 = s$ and $x_4 = t$, the general solution is

$$
\mathbf{x} = \begin{pmatrix} x_1\\x_2\\x_3\\x_4\end{pmatrix} = \begin{pmatrix} 3\\0\\2\\0\end{pmatrix} + s\begin{pmatrix} -2\\1\\0\\0\end{pmatrix} + t\begin{pmatrix} -1\\0\\1\\1\end{pmatrix}, \qquad s, t \in \R.
$$

This is the **parametric vector form** of the solution set: a two-dimensional plane in $\R^4$. *Check:* $s = t = 0$ gives $(3, 0, 2, 0)$, and indeed $3 + 0 + 2 = 5$, $6 + 0 + 6 - 0 = 12$, $-3 - 0 + 4 - 0 = 1$.
:::
:::

::: widget rowreduce
matrix: 1,2,1,0,5; 2,4,3,-1,12; -1,-2,2,-3,1
caption: The elimination of [[#ex-free]]. Notice that column 2 never receives a pivot: after the first step everything below row 1 in that column is already zero, so the algorithm moves on to column 3. Non-pivot columns of the coefficient matrix are exactly the free variables.
:::

::: warning Free variables are not zero
Free variables are not "unknowns we failed to find" and should not be set to zero in the answer. They are parameters: each choice of values gives a different solution, and the general solution must keep them. Setting them to zero produces just one particular solution.
:::

The example shows the general pattern, which we now prove.

::: theorem Existence and uniqueness {#thm-exist-unique}
A linear system is consistent if and only if the last column of its augmented matrix is not a pivot column — that is, if and only if an echelon form of the augmented matrix has no row of the form

$$
\left[\begin{array}{ccc|c} 0 & \cdots & 0 & d\end{array}\right] \qquad\text{with } d \neq 0.
$$

If the system is consistent, it has exactly one solution when there are no free variables (every column of the coefficient matrix is a pivot column), and infinitely many solutions when there is at least one free variable.
:::

::: proof
By [[#thm-row-ops]] we may replace the augmented matrix by its RREF $R$ without changing the solution set. If the last column of $R$ is a pivot column, then the corresponding row of $R$ is $[\,0 \cdots 0 \mid 1\,]$, the equation $0 = 1$, which no list of numbers satisfies; the system is inconsistent.

Otherwise every pivot lies in a coefficient column. Each non-zero row of $R$ then contains exactly one basic variable (with coefficient $1$), the remaining terms involve only free variables (pivot columns are zero outside their pivot), and the zero rows say $0 = 0$. So the system is equivalent to a list of equations of the form

$$
x_{p} = d_p - (\text{a linear combination of free variables}),
$$

one for each basic variable $x_p$. Choosing arbitrary values for the free variables and computing the basic variables from these equations gives a solution, and every solution arises in this way, from the values it assigns to the free variables. Thus solutions correspond one-to-one to choices of values for the free variables. If there are none, there is exactly one solution; if there is at least one free variable, each of its infinitely many values gives a different solution.
:::

::: corollary Zero, one or infinitely many {#cor-012}
A system of linear equations has either no solution, exactly one solution, or infinitely many solutions.
:::

::: proof
This is a restatement of the three cases in [[#thm-exist-unique]]: inconsistent; consistent with no free variables; consistent with a free variable.
:::

No linear system has exactly two or exactly seventeen solutions — a sharp contrast with polynomial equations such as $x^2 = 1$. [[#exr-two-solutions]] gives a second, more geometric proof.

::: example An inconsistent system {#ex-inconsistent}
Show that the following system has no solution, and describe the geometry:

$$
\begin{aligned} x + 2y - z &= 1,\\ 2x + 5y + z &= 4,\\ 3x + 7y \phantom{{}+z} &= 6. \end{aligned}
$$
::: solution
Row reduce:

$$
\left[\begin{array}{ccc|c} 1&2&-1&1\\ 2&5&1&4\\ 3&7&0&6 \end{array}\right]
\xrightarrow[R_3 - 3R_1]{R_2 - 2R_1}
\left[\begin{array}{ccc|c} 1&2&-1&1\\ 0&1&3&2\\ 0&1&3&3 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|c} 1&2&-1&1\\ 0&1&3&2\\ 0&0&0&1 \end{array}\right].
$$

The last row is the equation $0 = 1$, so by [[#thm-exist-unique]] the system is inconsistent. The reason is visible in the original equations: the left-hand side of the third equation is the sum of the first two, but $1 + 4 = 5 \neq 6$.

Geometrically, each equation is a plane in $\R^3$. No two of the planes are parallel (their normal vectors $(1,2,-1)$, $(2,5,1)$, $(3,7,0)$ are not multiples of one another), so each pair meets in a line. The three lines of intersection are parallel to each other — each points in the direction $(7, -3, 1)$, which solves the homogeneous system with this coefficient matrix — so the planes form the sides of an infinite triangular prism with no point in common.
:::
:::

::: example A system with a parameter {#ex-parameter}
For which values of $k$ does the system

$$
\begin{aligned} x + y + kz &= 1,\\ x + ky + z &= 1,\\ kx + y + z &= 1 \end{aligned}
$$

have no solution, exactly one solution, or infinitely many solutions?
::: solution
Eliminate $x$ using row 1, then add the new rows 2 and 3:

$$
\left[\begin{array}{ccc|c} 1&1&k&1\\ 1&k&1&1\\ k&1&1&1 \end{array}\right]
\xrightarrow[R_3 - kR_1]{R_2 - R_1}
\left[\begin{array}{ccc|c} 1&1&k&1\\ 0&k-1&1-k&0\\ 0&1-k&1-k^2&1-k \end{array}\right]
\xrightarrow{R_3 + R_2}
\left[\begin{array}{ccc|c} 1&1&k&1\\ 0&k-1&1-k&0\\ 0&0&2-k-k^2&1-k \end{array}\right].
$$

Factorise $2 - k - k^2 = (1-k)(2+k)$. We must be careful not to treat an expression as a pivot when it might be zero, so we split into cases.

- If $k = 1$, rows 2 and 3 are zero and the system is the single equation $x + y + z = 1$: consistent with two free variables, so **infinitely many** solutions (a plane).
- If $k = -2$, the last row is $[\,0\;\;0\;\;0 \mid 3\,]$, so there is **no** solution.
- Otherwise $k - 1 \neq 0$ and $(1-k)(2+k) \neq 0$, so there are three pivots and **exactly one** solution. Dividing row 3 by $(1-k)$ gives $(2 + k)z = 1$, so $z = \frac{1}{k+2}$; row 2 divided by $k-1$ gives $y - z = 0$; and row 1 gives $x = 1 - y - kz = 1 - \frac{1+k}{k+2} = \frac{1}{k+2}$. So $x = y = z = \dfrac{1}{k+2}$.

A quick sanity check: adding the three original equations gives $(k+2)(x+y+z) = 3$, which is impossible when $k = -2$ — consistent with our answer.
:::
:::

::: quiz
The augmented matrix of a system in the unknowns $x_1, x_2, x_3, x_4$ has the echelon form $\left[\begin{array}{cccc|c} 2&1&0&3&1\\ 0&0&5&1&0\\ 0&0&0&0&0\end{array}\right]$. How many solutions does the system have?
- [ ] None
- [ ] Exactly one
- [x] Infinitely many
- [ ] Exactly two, one for each pivot
::: solution
There is no row $[\,0\;0\;0\;0 \mid d\,]$ with $d \neq 0$, so the system is consistent. The pivots are in columns 1 and 3, so $x_2$ and $x_4$ are free. By [[#thm-exist-unique]] a consistent system with a free variable has infinitely many solutions — here a two-parameter family.
:::
:::

## Homogeneous systems and the shape of solution sets

A system $A\mathbf{x} = \mathbf{0}$, with every right-hand side zero, is called **homogeneous**. It is always consistent, because $\mathbf{x} = \mathbf{0}$ — the **trivial solution** — satisfies it. The interesting question is whether there are **non-trivial** solutions.

::: theorem More unknowns than equations {#thm-more-unknowns}
A homogeneous system with more unknowns than equations has infinitely many solutions; in particular it has a non-trivial solution.
:::

::: proof
Suppose there are $m$ equations and $n > m$ unknowns. Each pivot occupies its own row, so an echelon form has at most $m$ pivots, and hence at most $m$ of the $n$ coefficient columns are pivot columns. Since $n > m$, at least one variable is free. The system is consistent (it has the trivial solution), so by [[#thm-exist-unique]] it has infinitely many solutions.
:::

This small theorem is the engine behind the theory of dimension in [[linear-algebra/basis-dimension]]. The next result explains why the solution set in [[#ex-free]] looked like a fixed vector plus combinations of other vectors.

::: theorem Structure of the solution set {#thm-structure}
Suppose the system $A\mathbf{x} = \mathbf{b}$ is consistent and $\mathbf{p}$ is one solution of it (a **particular solution**). Then the solution set of $A\mathbf{x} = \mathbf{b}$ is

$$
\{\, \mathbf{p} + \mathbf{h} \;:\; A\mathbf{h} = \mathbf{0} \,\},
$$

the set of vectors obtained by adding to $\mathbf{p}$ a solution of the homogeneous system.
:::

::: proof
If $A\mathbf{h} = \mathbf{0}$, then by [[#eq-linear]] $A(\mathbf{p} + \mathbf{h}) = A\mathbf{p} + A\mathbf{h} = \mathbf{b} + \mathbf{0} = \mathbf{b}$, so $\mathbf{p} + \mathbf{h}$ is a solution. Conversely, if $A\mathbf{x} = \mathbf{b}$, put $\mathbf{h} = \mathbf{x} - \mathbf{p}$. Then $A\mathbf{h} = A\mathbf{x} - A\mathbf{p} = \mathbf{b} - \mathbf{b} = \mathbf{0}$, and $\mathbf{x} = \mathbf{p} + \mathbf{h}$ has the required form.
:::

::: intuition Parallel flats
The solutions of $A\mathbf{x} = \mathbf{0}$ form a line, plane or higher-dimensional "flat" through the origin. [[#thm-structure]] says that the solutions of $A\mathbf{x} = \mathbf{b}$, when there are any, form the *parallel* flat through $\mathbf{p}$. In [[#ex-free]] the homogeneous solutions are $s(-2,1,0,0) + t(-1,0,1,1)$, a plane through the origin in $\R^4$, and the full solution set is that plane shifted by $\mathbf{p} = (3,0,2,0)$. The same principle — general solution = particular solution + homogeneous solution — governs linear differential equations ([[ode/second-order-linear]]).
:::

::: example Balancing a chemical equation {#ex-propane}
When propane burns, $x_1\,\mathrm{C_3H_8} + x_2\,\mathrm{O_2} \to x_3\,\mathrm{CO_2} + x_4\,\mathrm{H_2O}$. Find the smallest positive whole numbers $x_1, \dots, x_4$ that balance the equation.
::: solution
Atoms are conserved, so each element gives one linear equation:

$$
\text{C: } 3x_1 = x_3, \qquad \text{H: } 8x_1 = 2x_4, \qquad \text{O: } 2x_2 = 2x_3 + x_4.
$$

This is a homogeneous system of $3$ equations in $4$ unknowns, so [[#thm-more-unknowns]] guarantees a non-trivial solution. Row reducing the coefficient matrix,

$$
\begin{pmatrix} 3&0&-1&0\\ 8&0&0&-2\\ 0&2&-2&-1 \end{pmatrix} \sim \begin{pmatrix} 1&0&0&-\tfrac14\\ 0&1&0&-\tfrac54\\ 0&0&1&-\tfrac34 \end{pmatrix},
$$

so $x_4$ is free and $x_1 = \tfrac14 x_4$, $x_2 = \tfrac54x_4$, $x_3 = \tfrac34 x_4$. The smallest positive whole-number solution has $x_4 = 4$:

$$
\mathrm{C_3H_8} + 5\,\mathrm{O_2} \to 3\,\mathrm{CO_2} + 4\,\mathrm{H_2O}.
$$

(Here $\sim$ means "is row equivalent to"; the intermediate steps are routine.) The free variable reflects a physical fact: any multiple of a balanced equation is balanced.
:::
:::

::: quiz
A homogeneous linear system has $4$ equations and $6$ unknowns. What can you conclude?
- [ ] It may be inconsistent.
- [ ] It has exactly one solution, $\mathbf{x} = \mathbf{0}$.
- [x] It has infinitely many solutions.
- [ ] Nothing, without knowing the coefficients.
::: solution
A homogeneous system is never inconsistent, since $\mathbf{0}$ is a solution. With at most $4$ pivots among $6$ columns, at least two variables are free, so by [[#thm-more-unknowns]] there are infinitely many solutions — whatever the coefficients.
:::
:::

## How much work is elimination?

For a system of $n$ equations in $n$ unknowns, the forward phase clears column $k$ by updating each of the $n - k$ rows below the pivot. Each update needs one division for the multiplier and then a multiplication and a subtraction for each of the remaining $n - k + 1$ entries of the row, including the right-hand side. The number of multiplications is therefore about

$$
\sum_{k=1}^{n-1} (n-k)(n-k+1) \approx \sum_{j=1}^{n} j^2 \approx \frac{n^3}{3},
$$

with the same number of subtractions: roughly $\tfrac23 n^3$ arithmetic operations. Back substitution costs only about $n^2$. Doubling the size of a system multiplies the work by eight; a dense system with $n = 10\,000$ unknowns needs about $7\times 10^{11}$ operations, a second or two on a modern computer. The systems arising from engineering simulations can have millions of unknowns but are **sparse** — almost all coefficients are zero — and are solved by methods that exploit this ([[numerical-analysis/iterative-methods]]).

::: remark Pivoting in floating-point arithmetic
In exact arithmetic any non-zero entry can serve as a pivot. On a computer, which rounds every result to about 16 significant digits, a tiny pivot is disastrous. Take $\eps = 10^{-20}$ and the system $\eps x_1 + x_2 = 1$, $x_1 + x_2 = 2$, whose solution is very close to $x_1 = x_2 = 1$. Using $\eps$ as the pivot gives the multiplier $10^{20}$ and the second equation $(1 - 10^{20})x_2 = 2 - 10^{20}$. Both sides round to $-10^{20}$, so the computer finds $x_2 = 1$, and then the first equation gives $x_1 = (1 - x_2)/\eps = 0$ — completely wrong. Interchanging the rows first, so that the pivot is $1$, gives the correct answer. Practical codes therefore use **partial pivoting**: in each column they choose the entry of largest absolute value as the pivot. See [[numerical-analysis/direct-methods]].
:::

::: history
The oldest known account of elimination is in the Chinese classic *Nine Chapters on the Mathematical Art*, compiled during the Han dynasty and annotated by Liu Hui in 263. Its eighth chapter, *Fangcheng* ("rectangular arrays"), arranges the coefficients of a system in columns on a counting board and eliminates unknowns by subtracting multiples of one column from another — including negative numbers, for which the book gives rules. In Europe the method was taught as school algebra, for instance in Isaac Newton's *Arithmetica Universalis* (1707). Carl Friedrich Gauss used it systematically for the "normal equations" of least squares in his astronomical work of 1809–1810, which is how it came to bear his name. The "Jordan" of Gauss–Jordan elimination is the German geodesist Wilhelm Jordan, who described the reduced form in his handbook of surveying in 1888 — not the Camille Jordan of the Jordan canonical form ([[linear-algebra/jordan-form]]).
:::

## Where this leads

Elimination is the workhorse of the whole subject. In [[linear-algebra/matrices]] each row operation becomes multiplication by an elementary matrix, and the forward phase becomes the factorisation $A = LU$. The pivot count becomes the **rank** in [[linear-algebra/basis-dimension]], where the free variables give a basis for the solutions of $A\mathbf{x} = \mathbf{0}$. In [[linear-algebra/linear-maps]] the count "pivots plus free variables equals unknowns" becomes the rank–nullity theorem, and [[#thm-structure]] reappears as the statement that the solutions of $T(v) = w$ form a translate of the kernel of $T$. When a system has no solution — as most real data sets do — [[linear-algebra/least-squares]] finds the best approximate one. Efficient and stable elimination for large systems is the subject of [[numerical-analysis/direct-methods]].

::: summary
- A linear system is a list of equations $a_{i1}x_1 + \dots + a_{in}x_n = b_i$, written compactly as $A\mathbf{x} = \mathbf{b}$, where $A\mathbf{x}$ is the combination $x_1\mathbf{a}_1 + \dots + x_n\mathbf{a}_n$ of the columns of $A$.
- Elementary row operations (replacement, interchange, non-zero scaling) are reversible, so they do not change the solution set ([[#thm-row-ops]]).
- Gauss–Jordan elimination brings any matrix to reduced row echelon form, and that form is unique ([[#thm-rref-unique]]); pivot positions are therefore well defined.
- A system is consistent exactly when there is no pivot in the last column of the augmented matrix; a consistent system has a unique solution if there are no free variables and infinitely many otherwise ([[#thm-exist-unique]]).
- Hence a linear system has $0$, $1$ or infinitely many solutions — never any other number.
- A homogeneous system with more unknowns than equations has non-trivial solutions ([[#thm-more-unknowns]]).
- The general solution of $A\mathbf{x} = \mathbf{b}$ is a particular solution plus the general solution of $A\mathbf{x} = \mathbf{0}$ ([[#thm-structure]]).
- Elimination costs about $\tfrac23n^3$ operations for $n$ equations; on a computer, choose large pivots.
:::

## Exercises

::: exercise A square system {level=1}
Solve the system $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$ by Gaussian elimination and back substitution.
::: solution
$$
\left[\begin{array}{ccc|c} 1&1&1&6\\ 2&-1&1&3\\ 1&2&-1&2 \end{array}\right]
\xrightarrow[R_3 - R_1]{R_2 - 2R_1}
\left[\begin{array}{ccc|c} 1&1&1&6\\ 0&-3&-1&-9\\ 0&1&-2&-4 \end{array}\right]
\xrightarrow{R_2 \leftrightarrow R_3}
\left[\begin{array}{ccc|c} 1&1&1&6\\ 0&1&-2&-4\\ 0&-3&-1&-9 \end{array}\right]
\xrightarrow{R_3 + 3R_2}
\left[\begin{array}{ccc|c} 1&1&1&6\\ 0&1&-2&-4\\ 0&0&-7&-21 \end{array}\right].
$$

Back substitution: $-7z = -21$ gives $z = 3$; $y - 2z = -4$ gives $y = 2$; $x + y + z = 6$ gives $x = 1$. The unique solution is $(x, y, z) = (1, 2, 3)$, which satisfies all three original equations. (The interchange was not necessary, but it avoids fractions.)
:::
:::

::: exercise Recognising echelon forms {level=1}
For each matrix, say whether it is in row echelon form, reduced row echelon form, or neither:

$$
A = \begin{pmatrix}1&4&0&2\\0&0&1&5\\0&0&0&0\end{pmatrix},\quad
B = \begin{pmatrix}2&1&3\\0&0&4\\0&1&0\end{pmatrix},\quad
C = \begin{pmatrix}1&0&3\\0&1&2\\0&0&1\end{pmatrix},\quad
D = \begin{pmatrix}0&3&1\\0&0&2\end{pmatrix}.
$$
::: solution
$A$ is in reduced row echelon form: leading $1$s in columns 1 and 3, zeros above and below them, zero row at the bottom. $B$ is in neither form: the leading entry of row 3 (column 2) is to the *left* of the leading entry of row 2 (column 3). $C$ is in row echelon form but not reduced, because the pivot in column 3 has non-zero entries $3$ and $2$ above it. $D$ is in row echelon form (leading entries in columns 2 and 3) but not reduced, since the leading entries are not $1$ and there is a $1$ above the second pivot.
:::
:::

::: exercise Burning ethane {level=1 check="7"}
Balance the equation $x_1\,\mathrm{C_2H_6} + x_2\,\mathrm{O_2} \to x_3\,\mathrm{CO_2} + x_4\,\mathrm{H_2O}$ with the smallest positive whole numbers. What is $x_2$?
::: solution
Carbon gives $2x_1 = x_3$, hydrogen gives $6x_1 = 2x_4$, oxygen gives $2x_2 = 2x_3 + x_4$. Taking $x_1$ as the free variable, $x_3 = 2x_1$, $x_4 = 3x_1$ and $x_2 = \tfrac12(4x_1 + 3x_1) = \tfrac72 x_1$. The smallest whole-number solution has $x_1 = 2$: $2\,\mathrm{C_2H_6} + 7\,\mathrm{O_2} \to 4\,\mathrm{CO_2} + 6\,\mathrm{H_2O}$, so $x_2 = 7$.
:::
:::

::: exercise Parametric vector form {level=2}
Find the general solution of the system with augmented matrix

$$
\left[\begin{array}{cccc|c} 1&-2&-1&-1&3\\ -2&4&3&4&-7\\ 3&-6&1&5&5 \end{array}\right]
$$

in parametric vector form, and check your answer.
::: solution
Row reduce:

$$
\xrightarrow[R_3 - 3R_1]{R_2 + 2R_1}
\left[\begin{array}{cccc|c} 1&-2&-1&-1&3\\ 0&0&1&2&-1\\ 0&0&4&8&-4 \end{array}\right]
\xrightarrow[R_1 + R_2]{R_3 - 4R_2}
\left[\begin{array}{cccc|c} 1&-2&0&1&2\\ 0&0&1&2&-1\\ 0&0&0&0&0 \end{array}\right].
$$

There is no pivot in the last column, so the system is consistent. The pivot columns are 1 and 3, so $x_2 = s$ and $x_4 = t$ are free, and $x_1 = 2 + 2s - t$, $x_3 = -1 - 2t$:

$$
\mathbf{x} = \begin{pmatrix} 2\\0\\-1\\0\end{pmatrix} + s\begin{pmatrix} 2\\1\\0\\0\end{pmatrix} + t\begin{pmatrix} -1\\0\\-2\\1\end{pmatrix}, \qquad s, t\in\R.
$$

*Check:* the particular solution $(2, 0, -1, 0)$ gives $2 + 1 = 3$, $-4 - 3 = -7$, $6 - 1 = 5$, and each of the two direction vectors gives $\mathbf{0}$ when substituted into the left-hand sides (for instance $(2,1,0,0)$ gives $2 - 2 = 0$, $-4 + 4 = 0$, $6 - 6 = 0$), as [[#thm-structure]] predicts.
:::
:::

::: exercise When is it inconsistent? {level=2 check="2"}
Find the value of $h$ for which the system $x + hy = 4$, $3x + 6y = 8$ has no solution. Show that there is no value of $h$ for which it has infinitely many solutions.
::: solution
$R_2 \to R_2 - 3R_1$ gives $\left[\begin{array}{cc|c} 1&h&4\\ 0&6-3h&-4 \end{array}\right]$. If $6 - 3h \neq 0$ there are two pivots and a unique solution. If $h = 2$ the second row is $[\,0\;\;0\mid -4\,]$, so the system is inconsistent. Infinitely many solutions would need a consistent system with a free variable, which happens only if the second row is entirely zero — impossible, since its last entry is $-4$ for every $h$. The answer is $h = 2$.
:::
:::

::: exercise A cubic through four points {level=2 check="34"}
Find the cubic polynomial $p(x) = a + bx + cx^2 + dx^3$ with $p(-1) = 2$, $p(0) = 1$, $p(1) = 2$ and $p(2) = 11$, and compute $p(3)$.
::: solution
The conditions are $a - b + c - d = 2$, $a = 1$, $a + b + c + d = 2$, $a + 2b + 4c + 8d = 11$. With $a = 1$: $-b + c - d = 1$ and $b + c + d = 1$; adding gives $2c = 2$, so $c = 1$ and $b + d = 0$. The last equation becomes $2b + 8d = 6$; with $b = -d$ this is $6d = 6$, so $d = 1$ and $b = -1$. Hence $p(x) = 1 - x + x^2 + x^3$ (check: $p(2) = 1 - 2 + 4 + 8 = 11$), and $p(3) = 1 - 3 + 9 + 27 = 34$.
:::
:::

::: exercise Traffic flow {level=2 check="300"}
Four one-way streets form a loop $A \to B \to C \to D \to A$ with flows $x_1$ (from $A$ to $B$), $x_2$ ($B$ to $C$), $x_3$ ($C$ to $D$) and $x_4$ ($D$ to $A$), in cars per hour. In addition $300$ cars per hour enter at $A$, $200$ leave at $B$, $100$ enter at $C$ and $200$ leave at $D$. At each junction the flow in equals the flow out. Find the general solution, and the smallest possible value of $x_1$ if all flows must be non-negative.
::: solution
The junction equations are $A$: $300 + x_4 = x_1$; $B$: $x_1 = x_2 + 200$; $C$: $x_2 + 100 = x_3$; $D$: $x_3 = x_4 + 200$. The augmented matrix in the unknowns $x_1, \dots, x_4$ reduces to

$$
\left[\begin{array}{cccc|c} 1&0&0&-1&300\\ 0&1&0&-1&100\\ 0&0&1&-1&200\\ 0&0&0&0&0 \end{array}\right],
$$

(the fourth equation is a consequence of the others, because total inflow $400$ equals total outflow $400$). With $x_4 = t$ free, the general solution is $(x_1, x_2, x_3, x_4) = (300 + t,\ 100 + t,\ 200 + t,\ t)$. All flows are non-negative exactly when $t \ge 0$, so the smallest possible value of $x_1$ is $300$, attained when the street from $D$ to $A$ carries no traffic.
:::
:::

::: exercise Two solutions force infinitely many {level=3 #exr-two-solutions}
Without using echelon forms, prove that if the system $A\mathbf{x} = \mathbf{b}$ has two different solutions $\mathbf{p} \neq \mathbf{q}$, then it has infinitely many solutions.
::: hint
Look at the points $\mathbf{p} + t(\mathbf{q} - \mathbf{p})$ on the line through $\mathbf{p}$ and $\mathbf{q}$.
:::
::: solution
For each real number $t$ put $\mathbf{x}_t = \mathbf{p} + t(\mathbf{q} - \mathbf{p}) = (1-t)\mathbf{p} + t\mathbf{q}$. By the linearity properties [[#eq-linear]],

$$
A\mathbf{x}_t = (1-t)A\mathbf{p} + tA\mathbf{q} = (1-t)\mathbf{b} + t\mathbf{b} = \mathbf{b},
$$

so every $\mathbf{x}_t$ is a solution. If $t \neq t'$ then $\mathbf{x}_t - \mathbf{x}_{t'} = (t - t')(\mathbf{q} - \mathbf{p}) \neq \mathbf{0}$, because $\mathbf{q} - \mathbf{p} \neq \mathbf{0}$; so different values of $t$ give different solutions, and there are infinitely many. Geometrically: if a solution set contains two points, it contains the whole line through them.
:::
:::

::: exercise Interchange is redundant {level=3}
Show that an interchange $R_1 \leftrightarrow R_2$ can be achieved by a sequence of three replacements followed by one scaling. (So, strictly speaking, only two kinds of elementary row operation are needed.)
::: solution
Write the two rows as $\mathbf{r}$ and $\mathbf{s}$ and track the pair (row 1, row 2):

$$
(\mathbf{r}, \mathbf{s}) \xrightarrow{R_1 + R_2} (\mathbf{r} + \mathbf{s}, \mathbf{s}) \xrightarrow{R_2 - R_1} (\mathbf{r} + \mathbf{s}, -\mathbf{r}) \xrightarrow{R_1 + R_2} (\mathbf{s}, -\mathbf{r}) \xrightarrow{-1\cdot R_2} (\mathbf{s}, \mathbf{r}).
$$

Each step is a legitimate elementary row operation using the *current* rows, and the final result has the two rows interchanged. All other rows are untouched.
:::
:::

::: exercise A consistency condition {level=3}
Let $A = \begin{pmatrix}1&2&3\\2&5&7\\3&7&10\end{pmatrix}$. Find a condition on $b_1, b_2, b_3$ that is necessary and sufficient for $A\mathbf{x} = \mathbf{b}$ to be consistent, and prove that for such $\mathbf{b}$ the system has infinitely many solutions.
::: solution
Row reduce the augmented matrix with a general right-hand side:

$$
\left[\begin{array}{ccc|c} 1&2&3&b_1\\ 2&5&7&b_2\\ 3&7&10&b_3 \end{array}\right]
\xrightarrow[R_3 - 3R_1]{R_2 - 2R_1}
\left[\begin{array}{ccc|c} 1&2&3&b_1\\ 0&1&1&b_2 - 2b_1\\ 0&1&1&b_3 - 3b_1 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|c} 1&2&3&b_1\\ 0&1&1&b_2 - 2b_1\\ 0&0&0&b_3 - b_2 - b_1 \end{array}\right].
$$

By [[#thm-exist-unique]] the system is consistent if and only if the last column is not a pivot column, that is, if and only if $b_3 - b_1 - b_2 = 0$, i.e. $b_3 = b_1 + b_2$. (This reflects the fact that row 3 of $A$ is the sum of rows 1 and 2.) When the condition holds, the pivots are in columns 1 and 2 only, so $x_3$ is a free variable and, again by [[#thm-exist-unique]], there are infinitely many solutions.
:::
:::
