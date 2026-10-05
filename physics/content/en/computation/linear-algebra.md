Most of a physics computation, once the differential equation has been replaced by a grid or a step, is a linear equation. A finite-difference Laplacian becomes a matrix. A least-squares fit of a line to laboratory points is a matrix. A small oscillation about equilibrium is an eigenvalue of a matrix. This chapter does those three jobs on systems small enough to finish by hand, and it records the residual, so that a later program can be judged by the same test.

The numbers below were computed directly, in ordinary arithmetic, and then checked by solving the same equations a second way. Nothing is a fit to a picture. The integrator of [[computation/integrating-motion]] is the time-stepping cousin of this chapter: there the diagnostic was energy, and here it is a residual. Random samples and the normal equations of a larger fit reappear in [[computation/random-sampling]].

## A linear system {#system}

A system of $n$ linear equations in $n$ unknowns is $A\mathbf{x} = \mathbf{b}$. The entry $A_{ij}$ multiplies the $j$-th unknown in the $i$-th equation. For $n = 2$ or $n = 3$ one can see the algebra. The same algebra, with a pivot and a residual, is what a program does for $n = 10^4$.

::: definition Residual {#def-residual}
Given a proposed solution $\mathbf{x}$, the **residual** is the vector $\mathbf{r} = \mathbf{b} - A\mathbf{x}$. The solution is exact when $\mathbf{r} = \mathbf{0}$. A numerical solution is acceptable for the problem in hand when $\mathbf{r}$ is small beside $\mathbf{b}$ on the scale you care about, which is a decision you must state, not a property of the matrix.
:::

The residual is not the error $\mathbf{x}_{\text{true}} - \mathbf{x}$. A matrix can turn a small residual into a large error in $\mathbf{x}$, or a large residual into a modest one. Reporting $\mathbf{r}$ is still the first duty, because $\mathbf{r}$ can be computed without knowing $\mathbf{x}_{\text{true}}$. The map from residual to error is the condition of $A$, taken up after elimination works on a well-behaved example.

::: example A residual you can see {#ex-residual-see}
For $2x + y = 4$ and $x - y = -1$, someone proposes $(x, y) = (1, 1)$. Compute the residual.
::: solution
The first equation wants $2(1) + 1 = 3$, and the right-hand side is $4$, so the first component of $\mathbf{r}$ is $4 - 3 = 1$. The second wants $1 - 1 = 0$ against $-1$, so the second component is $-1 - 0 = -1$. Thus $\mathbf{r} = (1,\, -1)$. The proposal is not the solution. The solution is $(1, 2)$, because $2(1) + 2 = 4$ and $1 - 2 = -1$, and that proposal has residual zero.
:::
:::

## Gaussian elimination {#elimination}

Elimination clears a column under the pivot, one column at a time, until the system is triangular. Back-substitution then starts at the bottom.

Take the system whose solution will turn out to be $x = 1$, $y = 2$, $z = -1$:

$$
\begin{aligned}
x + y + z &= 2, \\
2x + y - z &= 5, \\
x - y + 2z &= -3.
\end{aligned}
$$

Subtract twice the first equation from the second, and subtract the first from the third:

$$
\begin{aligned}
x + y + z &= 2, \\
- y - 3z &= 1, \\
- 2y + z &= -5.
\end{aligned}
$$

The second of those new equations, multiplied by $2$ and subtracted from the third, clears $y$:

$$
(-2y + z) - 2(-y - 3z) = -5 - 2(1),
$$

which is $7z = -7$, so $z = -1$. Then $-y - 3(-1) = 1$, so $-y = -2$ and $y = 2$. Then $x + 2 + (-1) = 2$, so $x = 1$.

The same arithmetic is a matrix. The system is $A\mathbf{x} = \mathbf{b}$ with

$$
A = \begin{pmatrix} 1 & 1 & 1 \\ 2 & 1 & -1 \\ 1 & -1 & 2 \end{pmatrix}, \qquad \mathbf{b} = \begin{pmatrix} 2 \\ 5 \\ -3 \end{pmatrix}, \qquad \mathbf{x} = \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix}.
$$

Row by row, $A\mathbf{x}$ returns $(2,\, 5,\, -3)$, so the residual is the zero vector. The triangular coefficient matrix produced above has diagonal entries $1$, $-1$ and $7$. Their product is $-7$.

::: proposition Pivots and the determinant {#prop-pivots}
If Gaussian elimination on a square matrix finishes with no row exchanges, the determinant equals the product of the pivots.
::: proof
Adding a multiple of one row to a different row does not change the determinant, and every clearing step is of that kind. The original matrix and the final upper-triangular matrix therefore have the same determinant. The determinant of a triangular matrix is the product of its diagonal entries, and those entries are the pivots.
:::
:::

For this $A$ there were no exchanges, so $\det A = 1 \cdot (-1) \cdot 7 = -7$. A later remark will say why quoting "$-7$" is a weak certificate that $\mathbf{x}$ is accurate. The product of the pivots is still the right way to see that a unique solution existed: the product was not zero.

::: algorithm Gaussian elimination, $n = 3$ {#alg-gauss}
Write the equations so that the first unknown appears in the first equation with a nonzero coefficient, the pivot. Subtract a multiple of equation $1$ from equations $2$ and $3$ to clear that unknown below the pivot. Repeat for the second unknown in the remaining $2 \times 2$ block. Solve the last equation, then substitute upward.
:::

The multiplier that clears entry $A_{i1}$ using pivot $A_{11}$ is $A_{i1}/A_{11}$. If the pivot is zero, that multiplier does not exist and two rows must be swapped before the division. If the pivot is merely small, the multiplier is large, and any error already present in the pivot row is multiplied by a large number and poured into the rows below. Swapping so that the pivot is the largest available entry in the column is **partial pivoting**. It does not repair a genuinely ill-conditioned matrix. It does stop the method from inventing a huge multiplier when another equation would have offered a pivot of ordinary size.

::: example The same system from the bottom {#ex-backsub}
Use $z = -1$ and the equation $-y - 3z = 1$ only. Recover $y$, and check it in $x - y + 2z = -3$ together with $x = 1$.
::: solution
$-y - 3(-1) = 1$ gives $-y + 3 = 1$, so $y = 2$. Then $x - y + 2z = 1 - 2 + 2(-1) = -3$, which matches the third right-hand side. The triple $(1,\, 2,\, -1)$ meets all three original equations, so the residual is the zero vector. A program that prints this triple and a residual of size $10^{-15}$ is showing rounding, not a second solution.
:::
:::

::: warning A small pivot
A multiplier larger than $1$ amplifies any error already stored in the pivot row, and back-substitution then divides by that same small pivot. In three-significant-digit chopping, $10^{-3}\, x + y = 1$ and $x + y = 2$ come back as $(x, y) = (2.00,\, 0.998)$ when $10^{-3}$ is kept as the pivot. The exact solution is $x = 1/0.999 = 1.001001\ldots$ and $y = 0.998999\ldots$. Swap the rows first, so the pivot is $1$, and the same chopping returns $x = 1.00$. Partial pivoting is that swap. It does not repair a matrix whose rows are genuinely almost parallel. The arithmetic is [[#ex-pivot]].
:::

::: example Three-digit chopping, with and without a swap {#ex-pivot}
Solve $10^{-3}\, x + y = 1$ and $x + y = 2$ by elimination, chopping every result to three significant digits. Do it twice: once with the first equation as the pivot row, and once after swapping. Chopping means writing a number as $\pm\, d.dd \times 10^{e}$ and dropping further digits, with no rounding up.
::: solution
The exact solution is $x = 1/0.999 = 1.001001\ldots$ and $y = 1 - 10^{-3} x = 0.998999\ldots$.

Without a swap the multiplier is $1/10^{-3} = 1000$, already three digits. The scaled first equation is $x + 1000\, y = 1000$. Subtract it from the second equation. The coefficient of $x$ is $1 - 1 = 0$. The coefficient of $y$ is $1 - 1000 = -999$, and $-999 = -9.99 \times 10^{2}$ keeps three digits. The right-hand side is $2 - 1000 = -998$. The new equation is $-999\, y = -998$, so

$$
y = \frac{998}{999} = 0.998998\ldots,
$$

which chops to $0.998$. Back-substitute into the stored first equation $10^{-3}\, x + y = 1$:

$$
10^{-3}\, x = 1 - 0.998 = 0.002, \qquad x = \frac{0.002}{10^{-3}} = 2.00.
$$

The computed pair is $(2.00,\, 0.998)$. Its residual against the original equations is $(0,\, -0.998)$: the first equation is met and the second is missed by almost $1$. The error in $y$ was about $10^{-3}$. Dividing by the pivot $10^{-3}$ turned that into an error of about $1$ in $x$.

Now swap, so the pivot equation is $x + y = 2$ and the multiplier is $10^{-3}$. The new second equation has

$$
y\text{ coefficient } 1 - 10^{-3} = 0.999, \qquad \text{right-hand side } 1 - 2 \times 10^{-3} = 0.998.
$$

Thus $y = 0.998/0.999 = 0.998998\ldots$, which again chops to $0.998$. Back-substitution in $x + y = 2$ gives $x = 2 - 0.998 = 1.002$, and $1.002$ chops to $1.00$. Three digits now agree with the exact $1.001$. The only change was which equation supplied the pivot.
:::
:::

## Least squares {#least}

Four points do not lie on a straight line: $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$. A model $y = a + bx$ has two free numbers and four conditions. There is no $(a, b)$ that meets all four. The least-squares choice minimises the sum of squared vertical residuals

$$
S(a, b) = \sum_{i=1}^{4} \bigl(y_i - a - b x_i\bigr)^2.
$$

Set $\partial S/\partial a = 0$ and $\partial S/\partial b = 0$. The derivatives bring down a factor $-2$ and the residual, and the stationarity conditions are the **normal equations**

$$
\begin{aligned}
n a + \Bigl(\sum x_i\Bigr) b &= \sum y_i, \\
\Bigl(\sum x_i\Bigr) a + \Bigl(\sum x_i^2\Bigr) b &= \sum x_i y_i.
\end{aligned}
$$

::: theorem Normal equations for a straight line {#thm-normal}
For the model $y = a + bx$ and $n$ points, the values of $a$ and $b$ that minimise $S$ satisfy the $2 \times 2$ system above, provided one actually computes the sums. The second-derivative test is unnecessary for the direction of the result: $S$ is a sum of squares, bounded below by zero, and the normal equations are linear, so the critical point they produce is the minimum.
::: proof
Differentiate under the sum. $\partial S/\partial a = -2 \sum (y_i - a - b x_i)$ and $\partial S/\partial b = -2 \sum x_i (y_i - a - b x_i)$. Set both to zero, cancel the common factor $-2$, and expand. The coefficient of $a$ in the first equation is the number of points. The coefficient of $b$ in the first equation is $\sum x_i$, which is also the coefficient of $a$ in the second. The coefficient of $b$ in the second is $\sum x_i^2$.
:::
:::

For the four points,

$$
\sum x = 6,\quad \sum y = 9,\quad \sum xy = 18,\quad \sum x^2 = 14,\quad n = 4.
$$

The normal equations are $4a + 6b = 9$ and $6a + 14b = 18$. Multiply the first by $3$ and the second by $2$:

$$
12a + 18b = 27, \qquad 12a + 28b = 36.
$$

Subtract: $10b = 9$, so $b = 0.9$. Then $4a + 6(0.9) = 9$, so $4a = 3.6$ and $a = 0.9$. The fitted line is

$$
y = 0.9 + 0.9\, x.
$$

::: example Residuals of the fit {#ex-rss}
Compute the four residuals of $y = 0.9 + 0.9x$ and the residual sum of squares.
::: solution
At $x = 0, 1, 2, 3$ the line predicts $0.9$, $1.8$, $2.7$, $3.6$. The data are $1$, $2$, $2$, $4$. The residuals (data minus line) are

$$
0.1,\quad 0.2,\quad -0.7,\quad 0.4.
$$

The sum of squares is $0.01 + 0.04 + 0.49 + 0.16 = 0.70$. No other $a$ and $b$ make this sum smaller. A sum of $0.70$ on four points is not a claim that the line is a law of nature. It is the size of the miss. The point at $x = 2$ contributes $0.49$ of the $0.70$.
:::
:::

::: widget plot
f: 0.9+0.9*x
x: -0.2, 3.2
y: 0, 4.5
caption: The least-squares line y = 0.9 + 0.9x for the points (0, 1), (1, 2), (2, 2) and (3, 4). The points themselves are not drawn. The line passes near them and through none of them. The residual sum of squares is 0.70.
:::

The normal equations are a $2 \times 2$ system and can be ill-conditioned even when a fit is exact, if all the $x_i$ lie far from the origin and close to each other. Forming $\sum x_i^2$ by hand on $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ is harmless. The next four points show the same sums becoming hostile.

::: example A line that six digits cannot see {#ex-centre}
The points $(1000,\, 12)$, $(1001,\, 12.01)$, $(1002,\, 12.02)$, $(1003,\, 12.03)$ lie on $y = 2 + 0.01\, x$. Form the normal equations, record the denominator $n\sum x^2 - (\sum x)^2$, and then chop both terms of that denominator to six significant digits. Repeat the fit after replacing each $x$ by $x - 1001.5$.
::: solution
The sums are $n = 4$, $\sum x = 4006$, $\sum y = 48.06$, $\sum xy = 48132.14$ and $\sum x^2 = 4012014$. The denominator of $b$ is

$$
4 \times 4012014 - 4006^2 = 16048056 - 16048036 = 20.
$$

Solving the normal equations in exact arithmetic returns $a = 2$ and $b = 1/100$, which is the line the points lie on. The residual sum of squares is zero. The two numbers that were subtracted are equal through the first six digits: chopping $16048056$ and $16048036$ to six significant digits produces $16048000$ twice, and the denominator becomes $0$. A program that forms the normal equations in six-digit arithmetic reports that it cannot find a slope, for four points that sit on a straight line.

The eigenvalues of the normal matrix $\begin{pmatrix} 4 & 4006 \\ 4006 & 4012014 \end{pmatrix}$ are approximately $4.012018 \times 10^{6}$ and $4.985 \times 10^{-6}$. The condition number, their ratio, is about $8.048 \times 10^{11}$. A change in the data at the eleventh digit can move the computed $(a, b)$ by a digit in front of the decimal point. That is the same phenomenon as the nearly parallel rows in the condition section below, produced here by the choice of origin rather than by the physics.

Centre the abscissae: $x' = x - 1001.5$ takes the values $-3/2$, $-1/2$, $1/2$, $3/2$. Then $\sum x' = 0$ and $\sum (x')^2 = 5$. The model is $y = a' + b x'$, with the same slope $b$. Now

$$
b = \frac{\sum x' y}{\sum (x')^2} = \frac{1/20}{5} = \frac{1}{100}, \qquad a' = \frac{48.06}{4} = 12.015,
$$

and $a = a' - b \times 1001.5 = 12.015 - 10.015 = 2$. The centred normal matrix is diagonal, with entries $4$ and $5$, so its condition number is $5/4 = 1.25$. Six-digit arithmetic has no trouble with the denominator $5$. The fitted line is the same line. The origin moved.
:::
:::

## Eigenvalues {#eigen}

A square matrix $A$ acts on a vector. An **eigenvector** is a direction that $A$ does not rotate, and the **eigenvalue** is the stretch along that direction: $A\mathbf{v} = \lambda \mathbf{v}$ with $\mathbf{v} \neq \mathbf{0}$. Small oscillations, principal axes of an inertia tensor, and the modes of a coupled spring all ask for those directions. The analytical theory is [[analytical-mechanics/small-oscillations]]. Here the question is how to get a number.

For a symmetric $2 \times 2$ matrix the characteristic polynomial is enough. Take

$$
A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}.
$$

Then $\det(A - \lambda I) = (2 - \lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 1)(\lambda - 3)$. The eigenvalues are $\lambda_1 = 1$ and $\lambda_2 = 3$. A vector for $\lambda = 3$ satisfies $(2 - 3)v_1 + v_2 = 0$, so $v_2 = v_1$. Normalise: $\mathbf{v}_2 = (1,\, 1)/\sqrt{2}$. A vector for $\lambda = 1$ satisfies $v_2 = -v_1$, so $\mathbf{v}_1 = (1,\, -1)/\sqrt{2}$.

::: definition Eigenpair and residual {#def-eigen}
A number $\lambda$ and a nonzero vector $\mathbf{v}$ are an **eigenpair** of $A$ when $A\mathbf{v} - \lambda \mathbf{v} = \mathbf{0}$. For a proposed pair, the **eigenresidual** is the vector $A\mathbf{v} - \lambda \mathbf{v}$. Its length is zero for an exact pair. Report the length, and also say whether $\mathbf{v}$ was scaled to length $1$, because stretching $\mathbf{v}$ stretches the residual.
:::

Both exact pairs of this $A$ have eigenresidual of length $0$, to machine precision, once $\mathbf{v}$ is the normalised vector above. That check is the eigenvalue cousin of $\mathbf{r} = \mathbf{b} - A\mathbf{x}$.

Large symmetric matrices are not solved by expanding a characteristic polynomial. The polynomial's roots are a poor way to compute eigenvalues even for moderate $n$, because the roots are sensitive to the coefficients. Power iteration is the small method that shows the idea of working with $A\mathbf{v}$ instead of with the polynomial.

::: algorithm Power iteration {#alg-power}
Start with a nonzero vector $\mathbf{v}^{(0)}$. Repeat: replace $\mathbf{w} = A\mathbf{v}$, then $\mathbf{v} = \mathbf{w}/\lVert\mathbf{w}\rVert$. The length $\lVert A\mathbf{v}\rVert$ approaches the eigenvalue of largest magnitude, provided that eigenvalue is real, simple, and strictly larger in magnitude than the others, and provided the start is not exactly orthogonal to its eigenvector.
:::

On this $A$, start with $\mathbf{v}^{(0)} = (1,\, 0)$. The first six normalised vectors and the Rayleigh quotient $\mathbf{v}\cdot A\mathbf{v}$ (which equals $\lambda$ for an exact unit eigenvector) are:

| Step | $v_1$ | $v_2$ | $\mathbf{v}\cdot A\mathbf{v}$ |
| --- | --- | --- | --- |
| 1 | $0.894427$ | $0.447214$ | $2.800000$ |
| 2 | $0.780869$ | $0.624695$ | $2.975610$ |
| 3 | $0.732793$ | $0.680451$ | $2.997260$ |
| 4 | $0.715782$ | $0.698324$ | $2.999695$ |
| 5 | $0.710011$ | $0.704191$ | $2.999966$ |
| 6 | $0.708076$ | $0.706136$ | $2.999996$ |

The target is $\mathbf{v}_2 = (0.707107,\, 0.707107)$ and $\lambda = 3$. Six multiplications by a $2 \times 2$ matrix have produced a Rayleigh quotient wrong in the sixth decimal. The smaller eigenvalue $\lambda = 1$ does not appear. Power iteration is built to find the dominant one. Obtaining $\lambda = 1$ needs a different start in a method that removes the direction already found, or the characteristic polynomial, which for $n = 2$ is the honest tool.

The table is not a coincidence of rounding. Write $\mathbf{u} = (1,\, 1)/\sqrt{2}$ for $\lambda = 3$ and $\mathbf{w} = (1,\, -1)/\sqrt{2}$ for $\lambda = 1$. These two vectors are orthonormal, and the start decomposes as

$$
(1,\, 0) = \frac{\mathbf{u} + \mathbf{w}}{\sqrt{2}}.
$$

Each multiplication by $A$ multiplies the $\mathbf{u}$ piece by $3$ and the $\mathbf{w}$ piece by $1$, so the unwanted direction is lighter, relative to the dominant direction, by a factor $1/3$ at every step.

::: proposition Rayleigh quotient after $k$ steps {#prop-rayleigh}
For this $A$ and this start, the Rayleigh quotient after $k$ normalisations is exactly

$$
R_k = \frac{3^{2k+1} + 1}{3^{2k} + 1}.
$$

In particular $R_1 = 14/5 = 2.8$ and $R_6 = 1594324/531442 = 3 - 2/531442$, which equals $2.999996$ to six decimal places.
::: proof
Apply $A$ $k$ times: $A^{k}(1,\, 0) = (3^{k}\, \mathbf{u} + \mathbf{w})/\sqrt{2}$. The vectors $\mathbf{u}$ and $\mathbf{w}$ are orthonormal, so

$$
\lVert 3^{k}\, \mathbf{u} + \mathbf{w} \rVert = \sqrt{3^{2k} + 1}.
$$

The normalised vector is therefore $\mathbf{v} = (3^{k}\, \mathbf{u} + \mathbf{w}) / \sqrt{3^{2k} + 1}$, and

$$
A\mathbf{v} = \bigl(3^{k+1}\, \mathbf{u} + \mathbf{w}\bigr) / \sqrt{3^{2k} + 1}.
$$

Their dot product is $(3^{2k+1} + 1)/(3^{2k} + 1)$, because every cross term $\mathbf{u}\cdot\mathbf{w}$ vanishes. For $k = 1$ the fraction is $28/10 = 14/5$. For $k = 6$, $3^{12} = 531441$ and $3^{13} = 1594323$, so

$$
R_6 = \frac{1594324}{531442} = 3 - \frac{2}{531442}.
$$

The subtraction $3 - 2/531442$ is $2.999996236\ldots$, and the sixth row of the table is that number chopped to six decimals.
:::
:::

The factor $3^{-k}$ is the whole rate. After six steps it equals $1/729 \approx 1.372 \times 10^{-3}$, which is why the sixth vector still differs from $(1,\, 1)/\sqrt{2}$ in the third digit after the point and why a further step would gain about another factor of three. If the two eigenvalues had been $3$ and $2.9$, the same proof would replace $1/3$ by $2.9/3 \approx 0.967$, and six steps would barely move. Power iteration is fast only when one eigenvalue is well clear of the others in magnitude.

::: example One step of the power method {#ex-power}
Apply $A$ once to $(1,\, 0)$, normalise, and compute the Rayleigh quotient.
::: solution
$A(1,\, 0) = (2,\, 1)$, whose length is $\sqrt{5} = 2.236068$. The normalised vector is $(2,\, 1)/\sqrt{5} = (0.894427,\, 0.447214)$. Then

$$
A\mathbf{v} = \frac{1}{\sqrt{5}}\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} 2 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{5}}\begin{pmatrix} 5 \\ 4 \end{pmatrix},
$$

and $\mathbf{v}\cdot A\mathbf{v} = (2\cdot 5 + 1\cdot 4)/5 = 14/5 = 2.8$. The first row of the table is that arithmetic, not a rounded mystery.
:::
:::

## Condition {#condition}

Return to residuals and errors. The $2 \times 2$ matrix $\begin{pmatrix} 1 & 1 \\ 1 & 1.001 \end{pmatrix}$ is invertible. Its determinant is $0.001$. The solution of $A\mathbf{x} = (2,\, 2.001)$ is exactly $(1,\, 1)$. Change the right-hand side by a small amount, to $(2,\, 2)$, and the second equation is now the same as the first up to that $0.001$. Solving gives a very different $\mathbf{x}$.

Explicitly, $x + y = 2$ and $x + 1.001 y = 2$ imply $0.001 y = 0$, so $y = 0$ and $x = 2$. A change of $0.001$ in one entry of $\mathbf{b}$ moved the solution from $(1,\, 1)$ to $(2,\, 0)$. The residual of $(2,\, 0)$ in the *original* system $A\mathbf{x} = (2,\, 2.001)$ is $(0,\, 0.001)$, which looks tiny beside $\mathbf{b}$. The error in $\mathbf{x}$ is not tiny. A small residual does not certify a small error when the rows of $A$ are nearly parallel.

::: example Determinant and a warning, not a test {#ex-det}
By [[#prop-pivots]] the matrix of the chapter's $3 \times 3$ elimination has determinant $-7$. Why is "the determinant equals $-7$" a weak way to decide that the solution $(1, 2, -1)$ is accurate?
::: solution
The determinant's size depends on the units of the rows. Multiplying every equation by $10$ multiplies the determinant by $10^3$ and does not make the solution more accurate. A residual that you have computed, entry by entry, is in the units of $\mathbf{b}$ and can be compared with the data. The determinant cannot. Use the determinant to see that the pivot product was nonzero, so a unique solution exists. Use the residual to see whether the vector you are holding is that solution.
:::
:::

The practical rule in this course is short. After elimination, multiply $A$ by the computed $\mathbf{x}$ and subtract from $\mathbf{b}$. After an eigenpair, multiply $A$ by $\mathbf{v}$ and subtract $\lambda\mathbf{v}$. If those vectors are not small, the method has not finished, whatever the textbook formula promised. If they are small and the matrix is nearly singular, say so, and do not quote twelve digits of $\mathbf{x}$.

::: history Gauss, Legendre, and the power method
The method of least squares was published by Adrien-Marie Legendre in 1805, in *Nouvelles méthodes pour la détermination des orbites des comètes*. Carl Friedrich Gauss published it in 1809, in *Theoria motus corporum coelestium*, and said he had used it since 1795. The priority argument is about that unpublished use. Both men wanted an orbit from more observations than unknowns, which is the situation of the four points and the two coefficients. Systematic elimination of linear systems is older than Gauss's name for it. What the nineteenth-century astronomical calculations contributed was the habit of organising the multipliers so that a large set could be finished without losing a column. The power iteration in [[#alg-power]] is a twentieth-century tool for the dominant eigenvalue. Richard von Mises published a practical version in 1929. For the $2 \times 2$ matrix of this chapter the characteristic polynomial is still the shorter route, and the iteration is here so that the residual of an eigenpair is a number you have seen shrink.
:::

::: summary
- A computed solution of $A\mathbf{x} = \mathbf{b}$ is checked by the residual $\mathbf{b} - A\mathbf{x}$, which is zero for the elimination example $(x, y, z) = (1, 2, -1)$. With no row exchanges, $\det A$ equals the product of the pivots, here $-7$.
- Partial pivoting avoids a needlessly small pivot. In three-significant-digit chopping, keeping $10^{-3}$ as a pivot turns the solution of $10^{-3} x + y = 1$, $x + y = 2$ into $x = 2$ instead of $x = 1.001$.
- The points $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ have the least-squares line $y = 0.9 + 0.9x$, and the residual sum of squares is $0.70$.
- Points that lie on a line can still make the normal matrix nearly singular if the $x$ values sit far from the origin. Subtracting the mean of $x$ leaves the line unchanged and, in the example, drops the condition number from about $8.05 \times 10^{11}$ to $1.25$.
- The symmetric matrix with $2$ on the diagonal and $1$ off it has eigenvalues $3$ and $1$. Power iteration from $(1, 0)$ approaches the eigenvalue $3$, and the Rayleigh quotient after $k$ steps is $(3^{2k+1}+1)/(3^{2k}+1)$. After six steps it is $2.999996$.
- A small residual can sit on a large error in $\mathbf{x}$ when the rows of $A$ are nearly parallel. Quote the residual together with that warning.
:::

## Exercises

::: exercise Clear one column {level=1}
In the $3 \times 3$ system, the first equation is $x + y + z = 2$ and the second is $2x + y - z = 5$. After subtracting twice the first from the second, what equation remains?
::: solution
$(2x + y - z) - 2(x + y + z) = 5 - 4$, so $-y - 3z = 1$. The unknown $x$ is gone. This is the second equation of the triangular system used in the chapter.
:::
:::

::: exercise Finish the triple {level=1 check="1"}
The triangular equations include $7z = -7$ and $-y - 3z = 1$. Find $x$ from $x + y + z = 2$. The check is the value of $x$.
::: solution
$z = -1$. Then $-y - 3(-1) = 1$, so $y = 2$. Then $x + 2 - 1 = 2$, so $x = 1$.
:::
:::

::: exercise Chopped elimination {level=2 check="2"}
Chop every result to three significant digits and do not swap rows. For $10^{-3}\, x + y = 1$ and $x + y = 2$, elimination produces which value of $x$? The exact value, before chopping, is $1.001$ to three decimals.
::: hint
The multiplier is $10^{3}$. After subtraction the second equation is $-999\, y = -998$. Chop $998/999$ to three digits before back-substitution.
:::
::: solution
$y = 998/999 = 0.998998\ldots$ chops to $0.998$. Then $10^{-3}\, x = 1 - 0.998 = 0.002$, so $x = 2$. The same steps are written out in [[#ex-pivot]].
:::
:::

::: exercise Slope of the fit {level=1 check="0.9"}
The normal equations for $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ are $4a + 6b = 9$ and $6a + 14b = 18$. Find $b$.
::: hint
Eliminate $a$. One way is to multiply the first equation by $3$ and the second by $2$.
:::
::: solution
$12a + 18b = 27$ and $12a + 28b = 36$. Subtract: $10b = 9$, so $b = 0.9$. Then $a = 0.9$ as well.
:::
:::

::: exercise Sum of squared misses {level=2 check="0.7"}
Using $a = b = 0.9$, compute the residual sum of squares at the four data points.
::: solution
Predictions: $0.9$, $1.8$, $2.7$, $3.6$. Residuals against $1$, $2$, $2$, $4$: $0.1$, $0.2$, $-0.7$, $0.4$. Squares: $0.01$, $0.04$, $0.49$, $0.16$. Sum: $0.70$.
:::
:::

::: exercise Characteristic polynomial {level=2}
For $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$, compute $\det(A - \lambda I)$ and the two eigenvalues.
::: solution
$A - \lambda I = \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix}$, and the determinant is $(2-\lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 1)(\lambda - 3)$. The eigenvalues are $1$ and $3$.
:::
:::

::: exercise Rayleigh quotient after one step {level=2 check="2.8"}
Power iteration for this $A$ starts at $(1, 0)$. After one normalisation, the Rayleigh quotient $\mathbf{v}\cdot A\mathbf{v}$ equals what number?
::: solution
$A(1, 0) = (2, 1)$, normalised to $(2, 1)/\sqrt{5}$. The quotient is $14/5 = 2.8$, as in [[#ex-power]].
:::
:::

::: exercise A vector for $\lambda = 1$ {level=2}
Find a unit eigenvector of the same $A$ for $\lambda = 1$, and give the length of its eigenresidual.
::: solution
$(A - I)\mathbf{v} = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}\mathbf{v} = \mathbf{0}$ forces $v_2 = -v_1$. The unit choice is $(1,\, -1)/\sqrt{2}$. Then $A\mathbf{v} = 1\cdot\mathbf{v}$ exactly, so the eigenresidual has length $0$.
:::
:::

::: exercise Nearly parallel rows {level=3}
Solve $x + y = 2$ and $x + 1.001 y = 2$ exactly. Compare with the solution of $x + y = 2$ and $x + 1.001 y = 2.001$, which is $(1, 1)$. What changed in $\mathbf{b}$, and what changed in $\mathbf{x}$?
::: solution
Subtract the equations of the first system: $0.001 y = 0$, so $y = 0$ and $x = 2$. The second system has right-hand side $(2,\, 2.001)$ and solution $(1, 1)$. One entry of $\mathbf{b}$ changed by $0.001$. The solution moved from $(1, 1)$ to $(2, 0)$, a change of length $\sqrt{2}$. The matrix is the same. A residual computed for $(2, 0)$ against the second right-hand side is small, of size $0.001$, while the error in $\mathbf{x}$ is not. This is the condition warning in the chapter.
:::
:::

::: exercise Why the normal equations are linear {level=3}
$S(a, b) = \sum (y_i - a - b x_i)^2$. Show that $\partial S/\partial a = 0$ is a linear equation in $a$ and $b$, and name the sums that appear as coefficients.
::: solution
$\partial S/\partial a = -2\sum(y_i - a - b x_i) = 0$ cancels $-2$ and expands to $n a + (\sum x_i) b = \sum y_i$. The coefficient of $a$ is the number of points. The coefficient of $b$ is $\sum x_i$. The right-hand side is $\sum y_i$. Nothing in those coefficients depends on $a$ or $b$, so the equation is linear. The companion $\partial S/\partial b = 0$ brings an extra factor $x_i$ inside the sum and is the second normal equation.
:::
:::

::: quiz
The four points $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ are fitted by $y = a + bx$ in the least-squares sense. Which statement is true?
- [ ] The line passes through all four points, because four points determine a line.
- [ ] There is no best line, because four conditions cannot be met by two unknowns.
- [x] The line $y = 0.9 + 0.9x$ minimises the sum of squared vertical residuals, and that sum equals $0.70$. It passes through none of the four points.
- [ ] The slope is $\sum y / \sum x = 9/6 = 1.5$, with no role for $\sum x^2$.
::: solution
Two unknowns cannot satisfy four independent conditions, so the line misses the points. Least squares still selects a unique minimiser of $S$ by the normal equations, and for these points that minimiser is $a = b = 0.9$ with $S = 0.70$. The ratio $\sum y/\sum x$ is not the slope. The slope is the second unknown in the $2 \times 2$ system, and $\sum x^2 = 14$ enters that system.
:::
:::
