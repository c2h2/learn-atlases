An economy has two sectors, steel and electricity. Each unit of steel uses 0.2 units of steel and 0.4 units of electricity as intermediate inputs; each unit of electricity uses 0.3 units of steel and 0.1 units of electricity. Final demand is 60 units of steel and 80 of electricity. How much must each sector produce in total — intermediates plus final demand — for those final demands to be feasible?

The question is a system of two linear equations in two unknowns. **Wassily Leontief** organised a whole economy this way, in an **input–output table**, and the same linear algebra — matrices, inverses, determinants, Cramer's rule — solves every linear model in economics: multi-market equilibrium, the Keynesian multiplier with several sectors, a first-order approximation to a nonlinear system. This chapter develops those tools as economists use them. Full proofs live in the [Maths Atlas linear algebra course](/a/maths/course.php?c=linear-algebra); we cite them and compute.

## Systems of linear equations

A **linear equation** in $n$ unknowns is $a_1 x_1 + \cdots + a_n x_n = b$. A **system** of $m$ such equations can be written

$$
A \mathbf{x} = \mathbf{b},
$$ {#eq-system}

where $A$ is the $m \times n$ matrix of coefficients, $\mathbf{x} \in \R^n$ is the column of unknowns and $\mathbf{b} \in \R^m$ is the column of constants. Two markets that clear, two sectors that meet final demand, two national-accounting identities — each is a case of [[#eq-system]].

::: definition Matrix operations {#def-matrix}
An $m \times n$ **matrix** is a rectangular array of real numbers with $m$ rows and $n$ columns. Matrices of the same shape add entrywise; a scalar multiplies every entry. The **product** $AB$ is defined when the number of columns of $A$ equals the number of rows of $B$, and $(AB)_{ik} = \sum_j A_{ij} B_{jk}$. The **transpose** $A\T$ swaps rows and columns. The $n \times n$ **identity** $I$ has ones on the diagonal and zeros elsewhere, and $AI = IA = A$ whenever the products make sense.
:::

Matrix multiplication is associative but not commutative: $AB$ and $BA$ need not even both be defined, and when they are they need not be equal. In an input–output model that fact has content: the matrix of input requirements $A$ and a diagonal matrix of prices do not commute, because a price change in one sector is an input-cost change in another.

The elementary method of solving [[#eq-system]] is **row reduction** (Gaussian elimination): replace rows by linear combinations of rows until the system is triangular, then back-substitute. The algorithm, with exact fractions, is in the [Maths Atlas](/a/maths/lesson.php?c=linear-algebra&l=linear-systems). A system has a unique solution, infinitely many, or none, according as the row-reduced form has a pivot in every variable column and a consistent right-hand side, a free variable, or an inconsistent row $(0\ \cdots\ 0 \mid c)$ with $c \neq 0$.

::: example Two markets {#ex-two-markets}
Demand for good 1 is $q_1 = 12 - 2 p_1 + p_2$ and demand for good 2 is $q_2 = 8 + p_1 - p_2$; the goods are substitutes. Supply is $q_1 = p_1$ and $q_2 = 2 p_2$. Find the equilibrium prices.
::: solution
Market clearing gives
$$
12 - 2p_1 + p_2 = p_1, \qquad 8 + p_1 - p_2 = 2p_2,
$$
which rearranges to
$$
3p_1 - p_2 = 12, \qquad -p_1 + 3p_2 = 8.
$$
In matrix form,
$$
\begin{pmatrix} 3 & -1 \\ -1 & 3 \end{pmatrix} \begin{pmatrix} p_1 \\ p_2 \end{pmatrix} = \begin{pmatrix} 12 \\ 8 \end{pmatrix}.
$$
Row-reducing: add one-third of row 1 to row 2 to obtain $\bigl(3,\ -1 \mid 12\bigr)$ and $\bigl(0,\ 8/3 \mid 12\bigr)$, so $p_2 = 12 \cdot 3/8 = 4.5$ and $p_1 = (12 + 4.5)/3 = 5.5$. Then $q_1 = 5.5$ and $q_2 = 9$. The off-diagonal $+1$ and $+1$ in demand are the cross-price effects: a rise in $p_2$ raises demand for good 1, so the two markets have to be solved together.
:::
:::

::: widget rowreduce
matrix: 3,-1,12; -1,3,8
augmented: true
caption: Row reduction of the two-market system in [[#ex-two-markets]]. Step through the elementary operations until the reduced row-echelon form $\bigl(I \mid \mathbf{p}^*\bigr)$ appears; the last column is the equilibrium, $p_1 = 11/2$, $p_2 = 9/2$.
:::

## Inverses, determinants and Cramer's rule

When $A$ is square, [[#eq-system]] has a unique solution for every $\mathbf{b}$ if and only if $A$ is **invertible**: there exists $A^{-1}$ with $A A^{-1} = A^{-1} A = I$, and then $\mathbf{x} = A^{-1} \mathbf{b}$. Invertibility is equivalent to $\det A \neq 0$, to full rank, and to the homogeneous system $A\mathbf{x} = \mathbf{0}$ having only the trivial solution. Proofs of these equivalences are in the [Maths Atlas](/a/maths/lesson.php?c=linear-algebra&l=determinants).

For $2 \times 2$ matrices the formulae are short enough to use by hand:

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}, \qquad \det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad-bc.
$$ {#eq-inv2}

::: definition Determinant, $2\times 2$ and $3\times 3$ {#def-det}
The **determinant** of a $2 \times 2$ matrix is $ad-bc$ as in [[#eq-inv2]]. For a $3 \times 3$ matrix it is the cofactor expansion

$$
\det A = a_{11}(a_{22}a_{33}-a_{23}a_{32}) - a_{12}(a_{21}a_{33}-a_{23}a_{31}) + a_{13}(a_{21}a_{32}-a_{22}a_{31}).
$$

In general, $\det A$ is the unique alternating multilinear function of the columns with $\det I = 1$; it changes sign under a column swap, and $\det(AB) = \det A \cdot \det B$.
:::

**Cramer's rule** expresses each unknown as a ratio of determinants: $x_j = \det A_j / \det A$, where $A_j$ is $A$ with column $j$ replaced by $\mathbf{b}$. It is a poor algorithm for large systems (row reduction is cheaper) and a good device for seeing how one exogenous variable feeds into one endogenous variable: the dependence is a ratio of two polynomials in the parameters.

::: example Cramer's rule in two markets {#ex-cramer}
Apply Cramer's rule to [[#ex-two-markets]].
::: solution
$\det A = 9 - 1 = 8$. Replacing the first column by $(12,8)\T$ gives $\det A_1 = 12\cdot 3 - (-1)\cdot 8 = 36+8 = 44$, so $p_1 = 44/8 = 5.5$. Replacing the second column gives $\det A_2 = 3\cdot 8 - 12\cdot(-1) = 24+12 = 36$, so $p_2 = 36/8 = 4.5$. The same numbers as before; the point of Cramer is the formula $p_1 = \det A_1 / \det A$ as a function of the demand intercepts, ready for a derivative.
:::
:::

::: warning Invertibility is not generic in the economic sense
A randomly chosen square matrix is almost surely invertible, but the matrices that arise in economics are often singular by construction: a Walrasian system of excess demands satisfies Walras's law, so the $n$ market-clearing equations are dependent and one must drop a market and normalise a price. Never invert first and ask questions later; check the rank, and check whether the model has a missing equation or a missing normalisation.
:::

## The Leontief input–output model

Divide an economy into $n$ sectors. Let $a_{ij}$ be the units of good $i$ required as an intermediate input to produce one unit of good $j$, and write $A = (a_{ij})$ for the **technology matrix**. Let $\mathbf{x}$ be the vector of gross outputs and $\mathbf{d}$ the vector of **final demands** (consumption, investment, government, net exports). Accounting then says that gross output equals intermediates plus final demand:

$$
\mathbf{x} = A \mathbf{x} + \mathbf{d},
$$ {#eq-leontief}

or $(I - A)\mathbf{x} = \mathbf{d}$. If $I - A$ is invertible, $\mathbf{x} = (I-A)^{-1} \mathbf{d}$. The matrix $(I-A)^{-1}$ is the **Leontief inverse**. Its $(i,j)$-entry is the extra gross output of sector $i$ needed, directly and indirectly, to deliver one extra unit of final demand for sector $j$.

::: proposition Hawkins–Simon condition, $2 \times 2$ {#prop-hawkins-simon}
Let $A$ be a $2 \times 2$ non-negative matrix. Then $I-A$ has a non-negative inverse if and only if $1 - a_{11} > 0$ and $\det(I-A) > 0$. In that case, for every $\mathbf{d} \ge \mathbf{0}$ there is a unique $\mathbf{x} \ge \mathbf{0}$ satisfying [[#eq-leontief]].
:::
::: proof
Write $I-A = \begin{pmatrix} 1-a_{11} & -a_{12} \\ -a_{21} & 1-a_{22} \end{pmatrix}$. By [[#eq-inv2]] the inverse is $1/\Delta$ times $\begin{pmatrix} 1-a_{22} & a_{12} \\ a_{21} & 1-a_{11} \end{pmatrix}$, where $\Delta = \det(I-A)$. Non-negativity of the inverse requires $\Delta > 0$ and $1-a_{11} > 0$, $1-a_{22} > 0$; but $1-a_{22} = \bigl(\Delta + a_{12}a_{21}\bigr)/(1-a_{11})$, so $1-a_{22} > 0$ follows from the two stated inequalities. Then $\mathbf{x} = (I-A)^{-1}\mathbf{d} \ge \mathbf{0}$ whenever $\mathbf{d} \ge \mathbf{0}$. Conversely, if $(I-A)^{-1} \ge 0$, taking $\mathbf{d} = \mathbf{e}_1$ and $\mathbf{e}_2$ shows that both columns of the inverse are non-negative, which forces the same sign conditions.
:::

The economic content is that each sector must produce more than it uses of its own output ($a_{ii} < 1$) and that the two sectors together must not swallow the whole economy in a cycle of intermediate demand ($\det(I-A) > 0$). For $n > 2$ the Hawkins–Simon conditions are that all leading principal minors of $I-A$ are positive; see Takayama, *Mathematical Economics* (1985), or the Perron–Frobenius discussion in the [Maths Atlas](/a/maths/lesson.php?c=linear-algebra&l=eigenvalues).

::: example A two-sector economy {#ex-leontief}
Let $A = \begin{pmatrix} 0.2 & 0.3 \\ 0.4 & 0.1 \end{pmatrix}$ and $\mathbf{d} = \begin{pmatrix} 60 \\ 80 \end{pmatrix}$. Compute the Leontief inverse and the gross-output vector.
::: solution
$I-A = \begin{pmatrix} 0.8 & -0.3 \\ -0.4 & 0.9 \end{pmatrix}$, with determinant $0.72 - 0.12 = 0.6$. The Hawkins–Simon conditions hold: $0.8 > 0$ and $0.6 > 0$. Then

$$
(I-A)^{-1} = \frac{1}{0.6} \begin{pmatrix} 0.9 & 0.3 \\ 0.4 & 0.8 \end{pmatrix} = \begin{pmatrix} 1.5 & 0.5 \\ 2/3 & 4/3 \end{pmatrix}.
$$

Gross output is $\mathbf{x} = (I-A)^{-1}\mathbf{d} = \begin{pmatrix} 1.5\cdot 60 + 0.5\cdot 80 \\ (2/3)\cdot 60 + (4/3)\cdot 80 \end{pmatrix} = \begin{pmatrix} 130 \\ 440/3 \end{pmatrix} \approx \begin{pmatrix} 130 \\ 146.67 \end{pmatrix}$. To deliver 60 of steel to final demand the economy must produce 130, because steel and electricity both eat steel; the extra 70 is intermediate. The $(1,2)$-entry $0.5$ says that one extra unit of final demand for electricity requires, directly and indirectly, half a unit of steel.
:::
:::

::: widget rowreduce
matrix: 0.8,-0.3,1,0; -0.4,0.9,0,1
augmented: 2
caption: Invert $I-A$ for [[#ex-leontief]] by row-reducing $\bigl(I-A \mid I\bigr)$. The right-hand $2\times 2$ block becomes $(I-A)^{-1} = \bigl(\begin{smallmatrix} 3/2 & 1/2 \\ 2/3 & 4/3 \end{smallmatrix}\bigr)$. The bar sits after column 2.
:::

Leontief's original tables (for the United States of 1919, 1929 and 1939, published in 1941 as *The Structure of American Economy*) were on the order of $40 \times 40$. Modern national tables run to dozens or hundreds of sectors; the World Input–Output Database covers more than 40 countries. The arithmetic is the same. What the model leaves out is substitution: $A$ is fixed, so a shock to one sector cannot be absorbed by changing input mix. For substitution one needs the production functions of [[mathematical-economics/functions-of-several-variables]] and the cost minimisation of [[mathematical-economics/constrained-optimisation]].

::: quiz
In a productive two-sector Leontief economy, an increase in final demand for sector 2
- [ ] raises gross output of sector 2 only
- [x] raises gross output of both sectors, in general
- [ ] lowers gross output of sector 1, because resources move
- [ ] has no effect on gross output of sector 1 if $a_{12} = 0$ and $a_{21} = 0$
::: solution
$(I-A)^{-1}$ is non-negative, and it is positive in both off-diagonal entries whenever $A$ has any indirect link between the sectors. Even if $a_{12} = 0$, a chain through other coefficients can make the $(1,2)$-entry of the inverse positive. Only if the sectors are completely disconnected ($A$ block-diagonal with a $1\times 1$ block for sector 1) does extra demand for 2 leave $x_1$ unchanged. The last option is therefore true in a special case, but the general answer is that both outputs rise.
:::
:::

## Quadratic forms

A **quadratic form** on $\R^n$ is a function $Q(\mathbf{x}) = \mathbf{x}\T H \mathbf{x}$ for a symmetric matrix $H$. The second-order Taylor expansion of a function $f$ of several variables is $f(\mathbf{a}+\mathbf{h}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12 \mathbf{h}\T Hf(\mathbf{a})\, \mathbf{h}$, so the Hessian quadratic form decides whether a critical point is a maximum, a minimum or a saddle. That classification is the next two chapters; the linear algebra it needs is here.

::: definition Definite matrices {#def-definite}
A symmetric $n \times n$ matrix $H$ is **positive definite** if $\mathbf{x}\T H \mathbf{x} > 0$ for every $\mathbf{x} \neq \mathbf{0}$, **positive semidefinite** if $\mathbf{x}\T H \mathbf{x} \ge 0$ for every $\mathbf{x}$, and **negative definite** or **semidefinite** with the inequalities reversed. It is **indefinite** if $Q$ takes both positive and negative values.
:::

::: proposition Leading-minor test, $2 \times 2$ {#prop-leading-minors}
Let $H = \begin{pmatrix} h_{11} & h_{12} \\ h_{12} & h_{22} \end{pmatrix}$ be symmetric. Then $H$ is positive definite if and only if $h_{11} > 0$ and $\det H > 0$; negative definite if and only if $h_{11} < 0$ and $\det H > 0$. If $\det H < 0$, then $H$ is indefinite.
:::
::: proof
$Q(x,y) = h_{11} x^2 + 2 h_{12} xy + h_{22} y^2$. If $h_{11} \neq 0$, complete the square: $Q = h_{11} \bigl(x + (h_{12}/h_{11}) y\bigr)^2 + \bigl((\det H)/h_{11}\bigr) y^2$. Both coefficients are positive for all $(x,y) \neq \mathbf{0}$ precisely when $h_{11} > 0$ and $\det H > 0$; both are negative when $h_{11} < 0$ and $\det H > 0$. If $\det H < 0$ the two coefficients have opposite signs, so $Q$ takes both signs. (If $h_{11} = 0$ and $\det H > 0$ then $-h_{12}^2 > 0$, which is impossible, so this case does not arise.)
:::

The test is the $n = 2$ case of **Sylvester's criterion**: $H$ is positive definite iff every leading principal minor is positive; negative definite iff the leading minors alternate in sign, starting with $h_{11} < 0$. Equivalently, $H$ is positive definite iff every eigenvalue is positive ([spectral theorem](/a/maths/lesson.php?c=linear-algebra&l=spectral-theorem)). For the Hessian of a profit function we will want *negative* definite — a hill, not a bowl.

::: example A profit Hessian {#ex-hessian-sign}
Let $\pi(q_1, q_2) = 12 q_1 + 8 q_2 - q_1^2 - q_1 q_2 - q_2^2$. The Hessian of $\pi$ is constant. Is the critical point a maximum?
::: solution
$\pi_{q_1} = 12 - 2q_1 - q_2$, $\pi_{q_2} = 8 - q_1 - 2q_2$. The Hessian is $H = \begin{pmatrix} -2 & -1 \\ -1 & -2 \end{pmatrix}$. Then $h_{11} = -2 < 0$ and $\det H = 4-1 = 3 > 0$, so $H$ is negative definite and the critical point is a strict local maximum. Solving the first-order conditions, $2q_1 + q_2 = 12$ and $q_1 + 2q_2 = 8$, gives $q_1 = 16/3$, $q_2 = 4/3$ by the same algebra as [[#ex-two-markets]] with a different right-hand side.
:::
:::

A national-accounting identity is also a linear system, just a very simple one. In a closed economy, $Y = C + I + G$ and $C = c Y$ rearrange to $(1-c)Y - I = G$, one equation in one unknown if $I$ and $G$ are given. Adding a second sector, or a government budget $T = \tau Y$, or an import equation $M = m Y$, enlarges $A$ but does not change the method: stack the identities, invert, and read off multipliers as entries of $A^{-1}$. The Keynesian multiplier $1/(1-c)$ is the $1 \times 1$ case of the Leontief inverse.

## Where this leads

Linear systems are the first-order conditions of quadratic optimisation and the first-order approximations of nonlinear ones. The Leontief inverse is a multiplier: it converts a final-demand shock into a gross-output shock, sector by sector, and the same inverse appears in the Keynesian cross with intermediate goods. Quadratic forms classify the critical points of [[mathematical-economics/unconstrained-optimisation]] and the bordered Hessians of [[mathematical-economics/constrained-optimisation]]. Eigenvalues, which we have used only as a test, return as growth rates and as stability conditions in [[mathematical-economics/difference-and-differential-equations]].

::: history
**1750, Gabriel Cramer.** *Introduction à l'analyse des lignes courbes* states the determinant rule for solving $n$ linear equations that now bears his name; Leibniz had the $3 \times 3$ case in correspondence with l'Hôpital in 1693.

**1936–1941, Wassily Leontief.** Leontief's input–output tables of the American economy, collected in *The Structure of American Economy, 1919–1929* (1941), turned a linear system into an empirical description of production. He was awarded the 1973 Nobel Prize in Economic Sciences for this work.

**1949, David Hawkins and Herbert Simon.** Their *Econometrica* paper gives the necessary and sufficient conditions on $I-A$ for a non-negative Leontief inverse — the productive-economy test of [[#prop-hawkins-simon]].
:::

::: summary
- A linear model is $A\mathbf{x} = \mathbf{b}$. It is solved by row reduction; when $A$ is square and invertible, by $\mathbf{x} = A^{-1}\mathbf{b}$ or by Cramer's rule.
- A $2 \times 2$ inverse and determinant are the formulae in [[#eq-inv2]]. Invertibility fails when $\det A = 0$, which in economic models often signals a missing normalisation.
- The **Leontief** system is $(I-A)\mathbf{x} = \mathbf{d}$. If the Hawkins–Simon conditions hold, $(I-A)^{-1} \ge 0$ converts final demand into the gross output required, directly and indirectly.
- A symmetric matrix is **positive definite** when all leading principal minors are positive (Sylvester), or when all eigenvalues are positive. Negative definite Hessians characterise local maxima.
:::

## Exercises

::: exercise A $2 \times 2$ inverse {level=1}
Invert $A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$ and use the inverse to solve $A\mathbf{x} = \begin{pmatrix} 2 \\ 8 \end{pmatrix}$.
::: solution
$\det A = 12-2 = 10$, so $A^{-1} = \tfrac{1}{10}\begin{pmatrix} 3 & -1 \\ -2 & 4 \end{pmatrix}$. Then $\mathbf{x} = A^{-1}\begin{pmatrix} 2 \\ 8 \end{pmatrix} = \tfrac{1}{10}\begin{pmatrix} 6-8 \\ -4+32 \end{pmatrix} = \begin{pmatrix} -0.2 \\ 2.8 \end{pmatrix}$.
:::
:::

::: exercise Row reduction {level=1}
Solve $2x + y = 5$, $x - 3y = -1$ by row reduction.
::: solution
The augmented matrix is $\bigl(\begin{smallmatrix} 2 & 1 & 5 \\ 1 & -3 & -1 \end{smallmatrix}\bigr)$. Swap rows, then subtract twice the new row 1 from row 2: $\bigl(\begin{smallmatrix} 1 & -3 & -1 \\ 0 & 7 & 7 \end{smallmatrix}\bigr)$. So $y = 1$ and $x - 3 = -1$, $x = 2$.
:::
:::

::: exercise Cramer's rule {level=1 check="3"}
Using Cramer's rule, find $x$ in $2x + y = 8$, $x + 2y = 7$. (Enter the value of $x$.)
::: solution
$\det A = 4 - 1 = 3$. Replacing the first column by $(8,7)\T$ gives $\det A_1 = 8\cdot 2 - 1\cdot 7 = 16 - 7 = 9$, so $x = 9/3 = 3$. Then $y = 2$.
:::
:::

::: exercise A Leontief calculation {level=2}
Let $A = \begin{pmatrix} 0.1 & 0.5 \\ 0.3 & 0.2 \end{pmatrix}$ and $\mathbf{d} = \begin{pmatrix} 40 \\ 50 \end{pmatrix}$. Verify the Hawkins–Simon conditions, compute $(I-A)^{-1}$, and find $\mathbf{x}$.
::: solution
$I-A = \begin{pmatrix} 0.9 & -0.5 \\ -0.3 & 0.8 \end{pmatrix}$. Then $1-a_{11} = 0.9 > 0$ and $\det(I-A) = 0.72 - 0.15 = 0.57 > 0$, so Hawkins–Simon holds. The inverse is $\tfrac{1}{0.57}\begin{pmatrix} 0.8 & 0.5 \\ 0.3 & 0.9 \end{pmatrix} = \begin{pmatrix} 80/57 & 50/57 \\ 10/19 & 30/19 \end{pmatrix} \approx \begin{pmatrix} 1.404 & 0.877 \\ 0.526 & 1.579 \end{pmatrix}$. Then $x_1 = (80\cdot 40 + 50\cdot 50)/57 = (3200+2500)/57 = 5700/57 = 100$ and $x_2 = (0.3\cdot 40 + 0.9\cdot 50)/0.57 = (12+45)/0.57 = 57/0.57 = 100$. Gross outputs are $(100, 100)$.
:::
:::

::: exercise A multiplier {level=2}
In [[#ex-leontief]], final demand for electricity rises by 6 units, steel demand unchanged. By how much do the two gross outputs rise? Which entry of the Leontief inverse did you use?
::: solution
$\Delta \mathbf{x} = (I-A)^{-1} \begin{pmatrix} 0 \\ 6 \end{pmatrix} = 6 \times$ (second column of the inverse) $= 6 \begin{pmatrix} 0.5 \\ 4/3 \end{pmatrix} = \begin{pmatrix} 3 \\ 8 \end{pmatrix}$. Steel output rises by 3 even though steel final demand did not change: the extra electricity uses steel, and the extra steel uses electricity, and so on. The relevant entries are $L_{12} = 1/2$ and $L_{22} = 4/3$.
:::
:::

::: exercise Classify a quadratic form {level=2}
Classify $Q(x,y) = 2x^2 - 4xy + 3y^2$ as positive definite, negative definite or indefinite, using [[#prop-leading-minors]].
::: solution
$H = \begin{pmatrix} 2 & -2 \\ -2 & 3 \end{pmatrix}$. Then $h_{11} = 2 > 0$ and $\det H = 6-4 = 2 > 0$, so $Q$ is positive definite. Completing the square: $Q = 2\bigl(x-y\bigr)^2 + y^2$, which is visibly non-negative and zero only at the origin.
:::
:::

::: exercise An indefinite Hessian {level=3}
A firm with two products has $\pi(q_1,q_2) = 10q_1 + 10q_2 - q_1^2 + 4 q_1 q_2 - q_2^2$. Compute the Hessian, classify it, and find the critical point. What does the classification say about that point?
::: hint
Compute the four second partials; the test is [[#prop-leading-minors]].
:::
::: solution
$\pi_{q_1} = 10 - 2q_1 + 4q_2$, $\pi_{q_2} = 10 + 4q_1 - 2q_2$. The Hessian is $H = \begin{pmatrix} -2 & 4 \\ 4 & -2 \end{pmatrix}$. Then $h_{11} = -2 < 0$ but $\det H = 4 - 16 = -12 < 0$, so $H$ is indefinite: the critical point is a saddle. Solving the first-order conditions, $-2q_1 + 4q_2 = -10$ and $4q_1 - 2q_2 = -10$, or $q_1 - 2q_2 = 5$ and $2q_1 - q_2 = -5$. From the first, $q_1 = 5 + 2q_2$; substitute: $10 + 4q_2 - q_2 = -5$, $10 + 3q_2 = -5$, $q_2 = -5$, $q_1 = -5$. Both outputs negative: even as a formal stationary point the candidate is economically inadmissible, and because $H$ is indefinite it would not have been a maximum in any case. The cross-term $+4q_1 q_2$ is too strong: the products are such complements in demand (or such rivals in cost) that the quadratic form bends up along $q_1 = q_2$ and down along $q_1 = -q_2$.
:::
:::

::: exercise Open Leontief with labour {level=3}
Suppose each unit of steel requires 2 units of labour and each unit of electricity requires 1 unit of labour, in addition to the intermediate requirements of [[#ex-leontief]]. Final demand is unchanged. How much labour is needed in total? Write the labour requirement as a row vector times $(I-A)^{-1}\mathbf{d}$.
::: hint
If $\boldsymbol\ell\T$ is the row of direct labour coefficients, total labour is $\boldsymbol\ell\T \mathbf{x} = \boldsymbol\ell\T (I-A)^{-1}\mathbf{d}$.
:::
::: solution
Direct labour is $\boldsymbol\ell\T = (2,\ 1)$, and $\mathbf{x} = \begin{pmatrix} 130 \\ 440/3 \end{pmatrix}$, so total labour is $2\cdot 130 + 440/3 = 260 + 146.\overline{6} = 406.\overline{6}$. Equivalently, the **total labour-requirement vector** is $\boldsymbol\ell\T (I-A)^{-1} = (2,\ 1)\begin{pmatrix} 1.5 & 0.5 \\ 2/3 & 4/3 \end{pmatrix} = \bigl(3 + 2/3,\ 1 + 4/3\bigr) = \bigl(11/3,\ 7/3\bigr)$. Then $(11/3)\cdot 60 + (7/3)\cdot 80 = 220 + 560/3 = (660+560)/3 = 1220/3 = 406.\overline{6}$. One extra unit of steel final demand requires $11/3$ units of labour, directly and indirectly; one extra unit of electricity final demand requires $7/3$.
:::
:::

