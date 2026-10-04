The Tower of Hanoi puzzle has three pegs and a stack of $n$ discs of different sizes, piled on the first peg with the largest at the bottom. A move takes the top disc from one peg and places it on another, never on top of a smaller disc. How many moves are needed to transfer the whole stack to the third peg? Trying small cases gives $1, 3, 7, 15$ moves for $n = 1, 2, 3, 4$, which suggests $2^n - 1$. The key to *proving* this is not to look for the formula directly, but to relate the problem for $n$ discs to the problem for $n - 1$ discs: to move the bottom disc, the $n-1$ discs above it must first be moved out of the way, and afterwards moved back on top. If $T_n$ is the minimum number of moves, this gives

$$
T_n = 2T_{n-1} + 1, \qquad T_0 = 0.
$$

An equation like this, which determines each term of a sequence from earlier terms, is a **recurrence relation**. Recurrences arise whenever a problem of size $n$ can be reduced to smaller problems of the same kind, which happens constantly in counting, in probability and in the analysis of algorithms. In this chapter we learn to set up recurrences and to solve the most important class of them, the linear recurrences with constant coefficients, completely.

## Modelling with recurrences

::: definition Recurrence relation {#def-recurrence}
A **recurrence relation of order $k$** for a sequence $(a_n)_{n \ge 0}$ is an equation

$$
a_n = f(n, a_{n-1}, a_{n-2}, \dots, a_{n-k}) \qquad\text{for all } n \ge k,
$$

expressing each term from the $k$ preceding ones. The values $a_0, \dots, a_{k-1}$ are the **initial conditions**. A **solution** is a sequence satisfying the recurrence; a formula for $a_n$ in terms of $n$ alone is a **closed form**.
:::

::: proposition Recurrences determine sequences {#prop-unique}
Given a recurrence of order $k$ and values for $a_0, \dots, a_{k-1}$, there is exactly one sequence satisfying both.
:::

::: proof
*Existence:* define $a_0, \dots, a_{k-1}$ as given and then $a_n$ for $n = k, k+1, \dots$ by the recurrence — a recursive definition (see [[proofs/induction]]). *Uniqueness:* let $(a_n)$ and $(b_n)$ both satisfy the recurrence and the initial conditions. We prove $a_n = b_n$ by strong induction on $n$. For $n < k$ this is the initial conditions. For $n \ge k$, assuming $a_m = b_m$ for all $m < n$,

$$
a_n = f(n, a_{n-1}, \dots, a_{n-k}) = f(n, b_{n-1}, \dots, b_{n-k}) = b_n. \qquad
$$
:::

The proposition is used constantly: to prove that a closed form is correct, it is enough to check that it satisfies the recurrence and the initial conditions.

::: example The Tower of Hanoi {#ex-hanoi}
Prove that the minimum number of moves for $n$ discs satisfies $T_n = 2T_{n-1} + 1$, and deduce $T_n = 2^n - 1$.
::: solution
*Upper bound.* Move the top $n-1$ discs to the middle peg ($T_{n-1}$ moves, by the best method for $n-1$ discs; the bottom disc is larger than all of them, so it never gets in the way), then the largest disc to the third peg ($1$ move), then the $n-1$ discs from the middle peg on top of it ($T_{n-1}$ moves). So $T_n \le 2T_{n-1} + 1$.

*Lower bound.* Take any solution. The largest disc must move at least once. When it first moves, nothing can be on top of it and nothing on its target peg, so all $n-1$ smaller discs are stacked on the remaining peg: getting them there took at least $T_{n-1}$ moves. When the largest disc moves for the last time, onto the third peg, the smaller discs are again all on one other peg, and moving them onto the third peg afterwards takes at least $T_{n-1}$ moves. These two phases do not overlap and neither includes a move of the largest disc, so $T_n \ge 2T_{n-1} + 1$.

*Closed form.* $T_0 = 0$, and if $T_{n-1} = 2^{n-1} - 1$ then $T_n = 2(2^{n-1} - 1) + 1 = 2^n - 1$. By induction (or by [[#prop-unique]]), $T_n = 2^n - 1$ for all $n$. The legendary tower of $64$ golden discs would need $2^{64} - 1 \approx 1.8\times 10^{19}$ moves — at one move per second, about $585$ billion years.
:::
:::

The Fibonacci numbers are defined by the most famous recurrence of all:

$$
F_0 = 0, \qquad F_1 = 1, \qquad F_n = F_{n-1} + F_{n-2} \quad (n\ge 2),
$$ {#eq-fib}

giving $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, \dots$ Fibonacci's original model was a population of immortal rabbits in which each pair produces a new pair every month from its second month on; the number of pairs then satisfies [[#eq-fib]]. Fibonacci numbers turn up in many counting problems that have nothing to do with rabbits.

::: example Strings without consecutive ones {#ex-strings}
Let $b_n$ be the number of binary strings of length $n$ with no two consecutive $1$s. Find a recurrence for $b_n$ and express $b_n$ through Fibonacci numbers.
::: solution
For $n \ge 2$, split the good strings of length $n$ according to their last symbol (the sum rule).

- Those ending in $0$: deleting the final $0$ leaves a good string of length $n-1$, and appending $0$ to any good string of length $n - 1$ gives a good string. There are $b_{n-1}$ of them.
- Those ending in $1$: the symbol before the final $1$ must be $0$, so the string ends in $01$; deleting $01$ leaves an arbitrary good string of length $n-2$. There are $b_{n-2}$ of them.

Hence $b_n = b_{n-1} + b_{n-2}$, with $b_0 = 1$ (the empty string) and $b_1 = 2$. These are the Fibonacci recurrence and the values $F_2 = 1$, $F_3 = 2$ shifted by two places, so by [[#prop-unique]] $b_n = F_{n+2}$. For example, there are $F_{12} = 144$ such strings of length $10$; a computer enumeration of all $1024$ strings agrees.
:::
:::

::: quiz
You climb a staircase taking either one or two steps at a time. Which recurrence does the number $s_n$ of ways to climb $n$ steps satisfy?
- [x] $s_n = s_{n-1} + s_{n-2}$
- [ ] $s_n = 2s_{n-1}$
- [ ] $s_n = s_{n-1} + 2$
- [ ] $s_n = s_{n-1}\,s_{n-2}$
::: solution
Classify the climbs by their last move. If it is a single step, what came before is any climb of $n - 1$ steps; if it is a double step, what came before is any climb of $n - 2$ steps. The sum rule gives $s_n = s_{n-1} + s_{n-2}$ (with $s_0 = s_1 = 1$, so $s_n = F_{n+1}$). The recurrence $s_n = 2s_{n-1}$ would count sequences of $n$ independent binary choices.
:::
:::

## First-order linear recurrences

The simplest recurrences have the form $a_n = r a_{n-1} + c$ with constants $r$ and $c$: each term is a fixed multiple of the previous one, plus a constant. The Tower of Hanoi recurrence is of this type, and so are compound interest and loan repayments.

::: theorem First-order linear recurrences {#thm-first-order}
Let $a_n = r a_{n-1} + c$ for $n\ge 1$, where $r$ and $c$ are constants.

1. If $r \neq 1$, then $a_n = r^n(a_0 - L) + L$, where $L = \dfrac{c}{1-r}$.
2. If $r = 1$, then $a_n = a_0 + nc$.
:::

::: proof
1. The number $L$ is chosen so that $L = rL + c$: it is the constant solution, or **fixed point**. Subtracting this equation from the recurrence gives $a_n - L = r(a_{n-1} - L)$, so $b_n = a_n - L$ satisfies $b_n = r b_{n-1}$, and by induction $b_n = r^n b_0$. Hence $a_n = L + r^n(a_0 - L)$.
2. If $r = 1$ each step adds $c$, and by induction $a_n = a_0 + nc$.
:::

For the Tower of Hanoi, $r = 2$ and $c = 1$, so $L = -1$ and $T_n = 2^n(T_0 + 1) - 1 = 2^n - 1$, as before. The theorem also shows how the long-run behaviour depends on $r$: if $\abs{r} < 1$ the terms converge to $L$ whatever $a_0$ is, while if $\abs{r} > 1$ they move away from $L$ geometrically (unless $a_0 = L$).

::: widget cobweb
g: r*x + c
sliders: r=0.5:-1.5:1.5:0.05; c=1:-2:2:0.1
x0: 0
steps: 30
x: -4, 6
y: -4, 6
caption: Iterating $a_n = r a_{n-1} + c$ from $a_0 = 0$: the orbit bounces between the line $y = rx + c$ and the diagonal $y = x$, which cross at the fixed point $L = c/(1-r)$ (initially $L = 2$). For $0 < r < 1$ the orbit staircases into $L$; for $-1 < r < 0$ it spirals in, alternating sides; for $\lvert r\rvert > 1$ it runs away from $L$ — exactly as the closed form $a_n - L = r^n(a_0 - L)$ predicts. At $r = 1$ the lines are parallel and the terms grow linearly.
:::

::: application Repaying a loan
A loan of $B$ pounds is charged interest at rate $i$ per month and repaid by a fixed payment $P$ at the end of each month. The debt after $n$ months satisfies $a_n = (1+i)a_{n-1} - P$ with $a_0 = B$. By [[#thm-first-order]] with $r = 1 + i$ and $c = -P$, so that $L = P/i$,

$$
a_n = (1+i)^n\Bigl(B - \frac Pi\Bigr) + \frac Pi.
$$

The loan is repaid after $N$ months when $a_N = 0$, that is, when $P = \dfrac{iB(1+i)^N}{(1+i)^N - 1}$. A mortgage of $200\,000$ pounds over $25$ years ($N = 300$) at $0.4\%$ per month costs $P \approx 1146$ pounds a month, about $344\,000$ pounds in total.
:::

## Linear recurrences with constant coefficients

The Fibonacci recurrence is not of first order: each term depends on *two* previous terms. Its natural generalisation is the following.

::: definition Linear homogeneous recurrence {#def-characteristic}
A **linear homogeneous recurrence of order $k$ with constant coefficients** is

$$
a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k} \qquad (n \ge k),
$$ {#eq-linear}

where $c_1, \dots, c_k$ are constants (real or complex) with $c_k \ne 0$. Its **characteristic polynomial** is

$$
\chi(x) = x^k - c_1x^{k-1} - c_2x^{k-2} - \dots - c_{k-1}x - c_k ,
$$

and $\chi(x) = 0$ is its **characteristic equation**.
:::

"Homogeneous" means there is no extra term such as the $+1$ in the Tower of Hanoi recurrence. The idea for solving [[#eq-linear]] is to try a geometric sequence $a_n = x^n$.

::: lemma Superposition and geometric solutions {#lem-superposition}
1. If $(a_n)$ and $(b_n)$ satisfy [[#eq-linear]], then so does $(\alpha a_n + \beta b_n)$ for any constants $\alpha, \beta$.
2. For $x \ne 0$, the sequence $a_n = x^n$ satisfies [[#eq-linear]] if and only if $\chi(x) = 0$. Moreover $0$ is never a root of $\chi$, since $\chi(0) = -c_k \neq 0$.
:::

::: proof
1. Multiply the recurrence for $(a_n)$ by $\alpha$, the one for $(b_n)$ by $\beta$, and add.
2. The sequence $x^n$ satisfies [[#eq-linear]] if and only if $x^n = c_1x^{n-1} + \dots + c_kx^{n-k}$ for all $n \ge k$, that is, $x^{n-k}\chi(x) = 0$ for all $n \ge k$. As $x \neq 0$, this holds exactly when $\chi(x) = 0$.
:::

So every root of the characteristic polynomial gives a geometric solution, and by superposition so does every linear combination of them. When there are enough different roots, these are all the solutions.

::: theorem Distinct characteristic roots {#thm-distinct-roots}
Suppose the characteristic polynomial of [[#eq-linear]] has $k$ distinct roots $r_1, \dots, r_k$ (possibly complex). Then the solutions of [[#eq-linear]] are exactly the sequences

$$
a_n = A_1r_1^n + A_2r_2^n + \dots + A_kr_k^n,
$$

where $A_1, \dots, A_k$ are constants, and the constants are uniquely determined by the initial values $a_0, \dots, a_{k-1}$.
:::

::: proof
By [[#lem-superposition]], every such sequence is a solution. Conversely, let $(a_n)$ be a solution. We want constants with

$$
A_1r_1^j + A_2r_2^j + \dots + A_kr_k^j = a_j \qquad (j = 0, 1, \dots, k-1).
$$

This is a system of $k$ linear equations in $A_1, \dots, A_k$, whose coefficient matrix $(r_i^j)$ is a Vandermonde matrix with determinant $\prod_{i<j}(r_j - r_i)$. The roots are distinct, so the determinant is non-zero and the system has exactly one solution (see [[linear-algebra/determinants]]). With these constants, $b_n = \sum_i A_ir_i^n$ satisfies [[#eq-linear]] and agrees with $a_n$ for $n < k$, so $a_n = b_n$ for all $n$ by [[#prop-unique]]. Uniqueness of the constants is the uniqueness of the solution of the linear system.

For $k = 2$ no determinants are needed: the equations $A_1 + A_2 = a_0$ and $A_1r_1 + A_2r_2 = a_1$ have the unique solution $A_1 = \dfrac{a_1 - r_2a_0}{r_1 - r_2}$, $A_2 = \dfrac{r_1a_0 - a_1}{r_1 - r_2}$, as substitution confirms.
:::

::: example Two distinct roots {#ex-distinct}
Solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 1$, $a_1 = 4$.
::: solution
The characteristic equation is $x^2 - 5x + 6 = (x-2)(x-3) = 0$, with roots $2$ and $3$. So $a_n = A\cdot 2^n + B\cdot 3^n$. The initial conditions give

$$
A + B = 1, \qquad 2A + 3B = 4,
$$

so $B = 2$ and $A = -1$, and $a_n = 2\cdot 3^n - 2^n$. Check: the recurrence gives $a_2 = 5\cdot 4 - 6\cdot 1 = 14$, and the formula gives $18 - 4 = 14$.
:::
:::

The most famous application is a closed form for the Fibonacci numbers, which at first sight looks unlikely to produce integers at all.

::: corollary Binet's formula {#cor-binet}
Let $\varphi = \dfrac{1+\sqrt5}{2} \approx 1.618$ (the **golden ratio**) and $\psi = \dfrac{1-\sqrt5}{2} = -\dfrac1\varphi \approx -0.618$. Then for all $n\ge0$,

$$
F_n = \frac{\varphi^n - \psi^n}{\sqrt5}.
$$

Consequently $F_n$ is the integer nearest to $\varphi^n/\sqrt5$, and $F_{n+1}/F_n\to\varphi$ as $n\to\infty$.
:::

::: proof
The characteristic equation of [[#eq-fib]] is $x^2 - x - 1 = 0$, with distinct roots $\varphi$ and $\psi$. By [[#thm-distinct-roots]], $F_n = A\varphi^n + B\psi^n$, where $A + B = F_0 = 0$ and $A\varphi + B\psi = F_1 = 1$. So $B = -A$ and $A(\varphi - \psi) = 1$; as $\varphi - \psi = \sqrt5$, $A = 1/\sqrt5$. This proves the formula.

Since $\abs{\psi} < 1$, we have $\abs{\psi^n/\sqrt5} \le 1/\sqrt5 < \tfrac12$, so $F_n$ is an integer within $\tfrac12$ of $\varphi^n/\sqrt5$. Finally, writing $q = \psi/\varphi$, which satisfies $\abs{q} < 1$,

$$
\frac{F_{n+1}}{F_n} = \varphi\cdot\frac{1 - q^{n+1}}{1 - q^n} \longrightarrow \varphi\cdot\frac{1-0}{1-0} = \varphi. \qquad
$$
:::

::: widget sequence
a: (phi^(n+1) - (1-phi)^(n+1))/(phi^n - (1-phi)^n)
N: 20
limit: phi
epsilon: 0.01
y: 0.9, 2.1
caption: The ratios $F_{n+1}/F_n = 1, 2, 1.5, 1.667, 1.6, 1.625, \dots$ (computed from Binet's formula, since $1 - \varphi = \psi$). They alternate above and below $\varphi \approx 1.618$, and the error shrinks by a factor of about $\varphi^2 \approx 2.6$ at each step because it is controlled by $(\psi/\varphi)^n$. Shrink $\eps$ and see how $N$ grows — only logarithmically in $1/\eps$.
:::

::: quiz
What is the general solution of $a_n = 2a_{n-1} + 3a_{n-2}$?
- [x] $A\cdot 3^n + B\cdot(-1)^n$
- [ ] $A\cdot 2^n + B\cdot 3^n$
- [ ] $(A + Bn)\,3^n$
- [ ] $A\cdot(-3)^n + B$
::: solution
The characteristic equation is $x^2 - 2x - 3 = 0$, that is $(x-3)(x+1) = 0$, with distinct roots $3$ and $-1$. By [[#thm-distinct-roots]] the general solution is $A\cdot3^n + B(-1)^n$. A common slip is to drop the *minus* sign in front of $c_1x$ in $\chi(x) = x^2 - c_1x - c_2$; the resulting $x^2 + 2x - 3$ has the roots $-3$ and $1$.
:::
:::

### Repeated roots

If $\chi$ has a repeated root, [[#thm-distinct-roots]] does not provide enough geometric solutions. For example $a_n = 4a_{n-1} - 4a_{n-2}$ has $\chi(x) = (x - 2)^2$, and $A\cdot 2^n$ alone cannot match two arbitrary initial values. The missing solution is $n\,2^n$.

::: theorem Repeated characteristic roots {#thm-repeated-roots}
Suppose the characteristic polynomial $x^2 - c_1x - c_2$ of the order-$2$ recurrence $a_n = c_1a_{n-1} + c_2a_{n-2}$ (with $c_2 \ne 0$) has a double root $r$. Then the solutions are exactly the sequences

$$
a_n = (A + Bn)\,r^n,
$$

with constants $A, B$ uniquely determined by $a_0$ and $a_1$. More generally, if the characteristic polynomial of [[#eq-linear]] has distinct roots $r_1, \dots, r_s$ with multiplicities $m_1, \dots, m_s$, the solutions are exactly the sequences $a_n = \sum_{i=1}^s P_i(n)\,r_i^n$, where each $P_i$ is a polynomial of degree less than $m_i$.
:::

::: proof
We prove the order-$2$ case. A double root means $x^2 - c_1x - c_2 = (x - r)^2 = x^2 - 2rx + r^2$, so $c_1 = 2r$ and $c_2 = -r^2$, and $r \ne 0$ because $c_2 \neq 0$. We know $r^n$ is a solution; we check that $nr^n$ is one too:

$$
c_1(n-1)r^{n-1} + c_2(n-2)r^{n-2} = 2r(n-1)r^{n-1} - r^2(n-2)r^{n-2} = \bigl(2(n-1) - (n-2)\bigr)r^n = n\,r^n.
$$

By superposition every $(A + Bn)r^n$ is a solution. Given any solution $(a_n)$, the conditions $A = a_0$ and $(A+B)r = a_1$ have the unique solution $A = a_0$, $B = a_1/r - a_0$, and then $(a_n)$ and $\bigl((A+Bn)r^n\bigr)$ agree for $n = 0, 1$, hence everywhere by [[#prop-unique]].

For the general statement one checks similarly that $n^jr_i^n$ is a solution for $j < m_i$, and that the $k$ resulting sequences can match any initial values; the cleanest proof uses generating functions and partial fractions, and is given in [[discrete/generating-functions]].
:::

::: example A double root {#ex-repeated}
Solve $a_n = 4a_{n-1} - 4a_{n-2}$ with $a_0 = 1$, $a_1 = 4$.
::: solution
Here $\chi(x) = x^2 - 4x + 4 = (x-2)^2$, so $a_n = (A + Bn)2^n$. From $a_0 = 1$, $A = 1$; from $a_1 = 4$, $(1 + B)\cdot 2 = 4$, so $B = 1$. Hence $a_n = (n+1)2^n$: the terms are $1, 4, 12, 32, 80, \dots$, which agrees with $a_2 = 16 - 4 = 12$ and $a_3 = 48 - 16 = 32$ from the recurrence.
:::
:::

::: application Gambler's ruin
A gambler with $k$ pounds bets one pound at a time on tosses of a fair coin, and stops on reaching $N$ pounds or going broke. Let $p_k$ be the probability of reaching $N$. Conditioning on the first toss gives $p_k = \tfrac12p_{k+1} + \tfrac12p_{k-1}$ for $0 < k < N$, with $p_0 = 0$ and $p_N = 1$. Rearranged, $p_{k+1} = 2p_k - p_{k-1}$, whose characteristic polynomial $x^2 - 2x + 1 = (x-1)^2$ has the double root $1$. So $p_k = A + Bk$, and the boundary conditions give $A = 0$, $B = 1/N$: the probability of success is $k/N$, proportional to the starting capital. Random walks of this kind are studied in [[probability/markov-chains]].
:::

### Complex roots

A recurrence with real coefficients may have non-real characteristic roots. They come in conjugate pairs $\rho e^{\pm i\theta}$, and [[#thm-distinct-roots]] still applies, but real solutions are more conveniently written using $\rho^n e^{\pm in\theta} = \rho^n(\cos n\theta \pm i\sin n\theta)$. Since the coefficients are real, the real and imaginary parts of the complex solution $\rho^ne^{in\theta}$ are themselves solutions, so the real solutions have the form

$$
a_n = \rho^n\bigl(A\cos n\theta + B\sin n\theta\bigr).
$$

(The initial conditions $A = a_0$ and $\rho(A\cos\theta + B\sin\theta) = a_1$ can always be met, because $\sin\theta\neq0$ for a non-real root.) The factor $\rho^n$ makes the solutions grow or decay, and the trigonometric factor makes them oscillate.

::: example Complex roots {#ex-complex}
Solve $a_n = 2a_{n-1} - 2a_{n-2}$ with $a_0 = 0$, $a_1 = 1$.
::: solution
The characteristic equation $x^2 - 2x + 2 = 0$ has roots $1 \pm i = \sqrt2\,e^{\pm i\pi/4}$, so $\rho = \sqrt2$, $\theta = \pi/4$ and $a_n = 2^{n/2}\bigl(A\cos\frac{n\pi}{4} + B\sin\frac{n\pi}4\bigr)$. From $a_0 = 0$, $A = 0$. From $a_1 = 1$, $\sqrt2\cdot B\sin\frac\pi4 = B = 1$. Hence

$$
a_n = 2^{n/2}\sin\frac{n\pi}{4}: \qquad 0,\ 1,\ 2,\ 2,\ 0,\ -4,\ -8,\ -8,\ 0,\ 16,\ \dots,
$$

which agrees with the recurrence ($a_2 = 2$, $a_3 = 4 - 2 = 2$, $a_4 = 4 - 4 = 0$, …). Every fourth term is $0$, and the amplitude doubles every two steps.
:::
:::

::: widget sequence
a: 2^(n/2)*sin(n*pi/4)
start: 0
N: 24
caption: The solution $a_n = 2^{n/2}\sin(n\pi/4)$ of $a_n = 2a_{n-1} - 2a_{n-2}$. The argument $\theta = \pi/4$ of the complex roots $1\pm i$ sets the rhythm — the sign pattern repeats every $8$ steps — and their modulus $\sqrt2 > 1$ makes the oscillations grow. If the modulus were less than $1$ the oscillations would die away.
:::

## Non-homogeneous recurrences

A recurrence such as $a_n = 3a_{n-1} + 2^n$ has an extra term that does not involve the sequence. In general we consider

$$
a_n = c_1a_{n-1} + \dots + c_ka_{n-k} + g(n),
$$ {#eq-nonhom}

whose **associated homogeneous recurrence** is [[#eq-linear]] (the same with $g(n)$ deleted).

::: theorem Structure of solutions {#thm-nonhomogeneous}
If $(p_n)$ is one solution of [[#eq-nonhom]] (a **particular solution**), then the solutions of [[#eq-nonhom]] are exactly the sequences $a_n = p_n + h_n$, where $(h_n)$ is any solution of the associated homogeneous recurrence.
:::

::: proof
If $(a_n)$ solves [[#eq-nonhom]], subtracting the equation for $(p_n)$ from that for $(a_n)$ shows that $h_n = a_n - p_n$ satisfies $h_n = c_1h_{n-1} + \dots + c_kh_{n-k}$, because the terms $g(n)$ cancel. Conversely, adding the equations for $(p_n)$ and $(h_n)$ shows that $p_n + h_n$ solves [[#eq-nonhom]].
:::

So we need just *one* particular solution. For the common forcing terms it can be found by guessing a solution of the same shape as $g$, with unknown coefficients — the **method of undetermined coefficients**:

| forcing term $g(n)$ | trial particular solution |
|---|---|
| polynomial of degree $d$ | polynomial of degree $d$ |
| $C s^n$ | $D s^n$ |
| (polynomial of degree $d$)$\cdot s^n$ | (polynomial of degree $d$)$\cdot s^n$ |

with one exception, called **resonance**: if $s$ is a root of the characteristic polynomial of multiplicity $m$ (for polynomial forcing, take $s = 1$), multiply the trial solution by $n^m$.

::: example A geometric forcing term {#ex-nonhom}
Solve $a_n = 3a_{n-1} + 2^n$ with $a_0 = 1$.
::: solution
*Particular solution.* Try $p_n = D\cdot 2^n$; this is allowed because $2$ is not a root of $\chi(x) = x - 3$. Substituting, $D\cdot 2^n = 3D\cdot2^{n-1} + 2^n$; dividing by $2^{n-1}$ gives $2D = 3D + 2$, so $D = -2$ and $p_n = -2^{n+1}$.

*General solution.* The homogeneous recurrence $h_n = 3h_{n-1}$ has solutions $A\cdot3^n$, so by [[#thm-nonhomogeneous]] $a_n = A\cdot 3^n - 2^{n+1}$.

*Initial condition.* $a_0 = A - 2 = 1$ gives $A = 3$, so $a_n = 3^{n+1} - 2^{n+1}$. Check: $a_1 = 3 + 2 = 5 = 9 - 4$, and $a_2 = 15 + 4 = 19 = 27 - 8$.
:::
:::

::: warning Initial conditions go last
Fit the initial conditions to the *complete* general solution $p_n + h_n$, never to the homogeneous part alone. In [[#ex-nonhom]], fitting $A\cdot3^n$ to $a_0 = 1$ first would give $A = 1$ and the "solution" $3^n - 2^{n+1}$, which has the wrong value $-1$ at $n = 0$.
:::

::: example Resonance and merge sort {#ex-resonance}
Solve $t_m = 2t_{m-1} + 2^m$ with $t_0 = 0$.
::: solution
The trial $D\cdot2^m$ fails: substituting gives $D\cdot2^m = D\cdot2^m + 2^m$, that is $0 = 2^m$. The reason is that $2^m$ already solves the homogeneous recurrence $t_m = 2t_{m-1}$, since $2$ is a (simple) root of $\chi(x) = x - 2$. Following the resonance rule, try $p_m = Dm2^m$:

$$
Dm2^m = 2D(m-1)2^{m-1} + 2^m \iff Dm = D(m-1) + 1 \iff D = 1.
$$

So $t_m = A\cdot2^m + m2^m$, and $t_0 = 0$ gives $A = 0$: $t_m = m\,2^m$.

This recurrence describes **merge sort**, which sorts a list of $n$ items by sorting the two halves recursively and then merging the two sorted halves in about $n$ steps. Its running time satisfies $T(n) = 2T(n/2) + n$ with $T(1) = 0$; for $n = 2^m$, the sequence $t_m = T(2^m)$ satisfies exactly the recurrence above, so $T(n) = n\log_2 n$. This is far faster than the roughly $n^2/2$ comparisons of simple methods that compare every pair.
:::
:::

::: quiz
Which trial particular solution should be used for $a_n = 3a_{n-1} + 3^n$?
- [ ] $D\cdot 3^n$
- [x] $Dn\cdot 3^n$
- [ ] $Dn$
- [ ] $D\cdot 3^{n+1}$
::: solution
The forcing term $3^n$ is a solution of the homogeneous recurrence $a_n = 3a_{n-1}$ (the characteristic root is $3$), so $D\cdot3^n$ — or $D\cdot 3^{n+1}$, which is the same family — gives $0 = 3^n$. By the resonance rule we try $Dn3^n$: substituting gives $Dn = D(n-1) + 1$, so $D = 1$, and the general solution is $(A + n)3^n$.
:::
:::

::: history
The Fibonacci sequence takes its name from Leonardo of Pisa, known as Fibonacci, whose *Liber Abaci* (1202) posed the rabbit problem; Indian scholars of prosody, including Hemachandra around 1150, had already met the same numbers when counting rhythms made of short and long syllables. In the 1720s and 1730s Abraham de Moivre developed a general theory of such "recurrent series", solving linear recurrences with what we would now call the characteristic equation and generating functions. The closed form for $F_n$ is named after Jacques Binet, who published it in 1843, although de Moivre, Daniel Bernoulli and Euler had known it a century earlier. The Tower of Hanoi was invented by the French mathematician Édouard Lucas and sold as a puzzle in 1883, complete with the legend of the tower of $64$ golden discs; it was also Lucas who attached Fibonacci's name to the sequence.
:::

## Where this leads

Linear recurrences have the same structure as linear differential equations with constant coefficients ([[ode/second-order-linear]]): try exponentials, get a characteristic equation, treat repeated roots with an extra factor of $n$ (or $t$), and add a particular solution for a forcing term. The solutions of [[#eq-linear]] form a $k$-dimensional vector space, and the recurrence can be rewritten as $\mathbf{v}_n = M\mathbf{v}_{n-1}$ for a $k\times k$ matrix whose eigenvalues are the characteristic roots ([[linear-algebra/eigenvalues]]). [[discrete/generating-functions]] gives a second, more mechanical way to solve recurrences, which also handles the general repeated-root case. Recurrences describe random walks and Markov chains ([[probability/markov-chains]]), the stability of numerical methods ([[numerical-analysis/numerical-odes]]), and the running times of recursive algorithms such as those for graphs in [[discrete/graph-algorithms]].

::: summary
- A **recurrence** expresses $a_n$ through earlier terms; together with initial conditions it determines the sequence uniquely ([[#prop-unique]]), so a guessed closed form is proved by checking the recurrence and the initial values.
- To set up a recurrence, reduce a problem of size $n$ to smaller ones by classifying objects by their last (or first) step.
- **First order:** $a_n = ra_{n-1} + c$ has solution $a_n = r^n(a_0 - L) + L$ with fixed point $L = c/(1-r)$ when $r\ne1$.
- **Constant coefficients:** solve $\chi(x) = 0$; distinct roots give $a_n = \sum A_ir_i^n$ ([[#thm-distinct-roots]]); a double root $r$ gives $(A + Bn)r^n$ ([[#thm-repeated-roots]]); complex roots $\rho e^{\pm i\theta}$ give $\rho^n(A\cos n\theta + B\sin n\theta)$.
- **Binet's formula** $F_n = (\varphi^n - \psi^n)/\sqrt5$; Fibonacci numbers grow like $\varphi^n$ and $F_{n+1}/F_n\to\varphi$.
- **Non-homogeneous:** general solution = particular + homogeneous ([[#thm-nonhomogeneous]]); guess a particular solution shaped like the forcing term, multiplying by $n^m$ in the resonant case, and fit initial conditions last.
:::

## Exercises

::: exercise A first-order recurrence {level=1 check="177145"}
Let $a_0 = 1$ and $a_n = 3a_{n-1} + 4$ for $n \ge 1$. Find a closed form and compute $a_{10}$.
::: solution
By [[#thm-first-order]] with $r = 3$ and $c = 4$, the fixed point is $L = 4/(1-3) = -2$, so $a_n = 3^n(1 + 2) - 2 = 3^{n+1} - 2$. Then $a_{10} = 3^{11} - 2 = 177\,147 - 2 = 177\,145$.
:::
:::

::: exercise Two distinct roots {level=1 check="665"}
Solve $a_n = a_{n-1} + 6a_{n-2}$ with $a_0 = 0$, $a_1 = 5$, and compute $a_6$.
::: solution
The characteristic equation $x^2 - x - 6 = (x - 3)(x + 2) = 0$ has roots $3$ and $-2$, so $a_n = A\cdot3^n + B(-2)^n$. Then $A + B = 0$ and $3A - 2B = 5$, giving $A = 1$, $B = -1$: $a_n = 3^n - (-2)^n$. So $a_6 = 729 - 64 = 665$.
:::
:::

::: exercise Counting good strings {level=1 check="144"}
Using [[#ex-strings]], how many binary strings of length $10$ contain no two consecutive $1$s?
::: solution
$b_{10} = F_{12}$. Running the Fibonacci recurrence: $F_0, \dots, F_{12} = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144$, so the answer is $144$.
:::
:::

::: exercise Domino tilings {level=2 check="89"}
Let $t_n$ be the number of ways to tile a $2\times n$ rectangle with $1\times 2$ dominoes (placed horizontally or vertically). Show that $t_n = t_{n-1} + t_{n-2}$ for $n\ge2$, with $t_0 = t_1 = 1$, and find $t_{10}$.
::: hint
Look at how the leftmost column is covered.
:::
::: solution
Consider the leftmost column of a tiling. Either it is covered by one vertical domino, and the rest is a tiling of a $2\times(n-1)$ rectangle ($t_{n-1}$ ways), or its top square is covered by a horizontal domino. In the second case the bottom square must also be covered by a horizontal domino (a vertical one would overlap the first column's top square), and the two horizontal dominoes fill the first two columns, leaving a $2\times(n-2)$ rectangle ($t_{n-2}$ ways). These cases are disjoint, so $t_n = t_{n-1} + t_{n-2}$. With $t_0 = 1$ (the empty tiling) and $t_1 = 1$, we get $t_n = F_{n+1}$, so $t_{10} = F_{11} = 89$.
:::
:::

::: exercise A repeated root {level=2 check="405"}
Solve $a_n = 6a_{n-1} - 9a_{n-2}$ with $a_0 = 1$, $a_1 = 6$, and compute $a_4$.
::: solution
Here $\chi(x) = x^2 - 6x + 9 = (x - 3)^2$, so by [[#thm-repeated-roots]] $a_n = (A + Bn)3^n$. From $a_0 = 1$, $A = 1$; from $a_1 = 6$, $3(1 + B) = 6$, so $B = 1$. Thus $a_n = (n+1)3^n$ and $a_4 = 5\cdot81 = 405$. (From the recurrence: $1, 6, 27, 108, 405$.)
:::
:::

::: exercise Lines in the plane {level=2 check="56"}
$n$ straight lines are drawn in the plane so that no two are parallel and no three pass through one point. Let $R_n$ be the number of regions into which they divide the plane. Show that $R_n = R_{n-1} + n$, solve the recurrence, and find $R_{10}$.
::: solution
Add the $n$-th line to a configuration of $n-1$ lines. It meets each of the earlier lines exactly once, at $n - 1$ different points, which cut it into $n$ pieces (for $n \ge 2$, two rays and $n-2$ segments). Each piece divides one existing region into two, so the number of regions increases by exactly $n$: $R_n = R_{n-1} + n$, with $R_0 = 1$. Summing,

$$
R_n = 1 + (1 + 2 + \dots + n) = 1 + \frac{n(n+1)}{2}.
$$

(This agrees with the resonance rule: $1$ is a root of $\chi(x) = x - 1$ and the forcing term is a polynomial of degree $1$, so the particular solution is $n$ times a polynomial of degree $1$.) Hence $R_{10} = 1 + 55 = 56$.
:::
:::

::: exercise A constant forcing term {level=2 check="212"}
Solve $a_n = 5a_{n-1} - 6a_{n-2} + 2$ with $a_0 = 1$, $a_1 = 2$, and compute $a_5$.
::: solution
*Particular solution:* $1$ is not a root of $x^2 - 5x + 6$, so try a constant $C$: $C = 5C - 6C + 2$ gives $C = 1$. *General solution:* $a_n = A\cdot2^n + B\cdot3^n + 1$. The initial conditions give $A + B + 1 = 1$ and $2A + 3B + 1 = 2$, so $B = 1$, $A = -1$, and $a_n = 3^n - 2^n + 1$. Hence $a_5 = 243 - 32 + 1 = 212$. (The recurrence gives $1, 2, 6, 20, 66, 212$.)
:::
:::

::: exercise A periodic recurrence {level=2}
Prove that every solution of $a_n = a_{n-1} - a_{n-2}$ is periodic with period $6$, that is, $a_{n+6} = a_n$ for all $n \ge 0$. Explain this using the characteristic roots.
::: solution
For $n \ge 0$, applying the recurrence twice,

$$
a_{n+3} = a_{n+2} - a_{n+1} = (a_{n+1} - a_n) - a_{n+1} = -a_n,
$$

and therefore $a_{n+6} = -a_{n+3} = a_n$. The characteristic equation $x^2 - x + 1 = 0$ has the roots $e^{\pm i\pi/3}$, sixth roots of unity, so the solutions are $A\cos\frac{n\pi}3 + B\sin\frac{n\pi}{3}$, which have period $6$. For instance $a_0 = 3$, $a_1 = 7$ gives $3, 7, 4, -3, -7, -4, 3, 7, \dots$
:::
:::

::: exercise No three consecutive ones {level=3 check="504"}
Let $t_n$ be the number of binary strings of length $n$ with no three consecutive $1$s. Find a recurrence for $t_n$ and compute $t_{10}$.
::: hint
Classify the strings by how they end: $0$, $01$ or $011$.
:::
::: solution
For $n \ge 3$, a good string ends in exactly one of $0$, $01$, $011$: if it ends in $1$, look at the last $0$, which must be among the last three symbols. Deleting that ending leaves an arbitrary good string of length $n-1$, $n-2$ or $n-3$ respectively, and conversely appending any of these endings to a good string gives a good string. So

$$
t_n = t_{n-1} + t_{n-2} + t_{n-3} \qquad (n\ge3), \qquad t_0 = 1,\ t_1 = 2,\ t_2 = 4.
$$

Then $t_3, \dots, t_{10} = 7, 13, 24, 44, 81, 149, 274, 504$, so $t_{10} = 504$. (Strings of length at most $2$ cannot contain three $1$s, so $t_0, t_1, t_2$ count all strings; a brute-force count over all $1024$ strings confirms $504$.)
:::
:::

::: exercise Cassini's identity {level=3}
Prove that $F_{n+1}F_{n-1} - F_n^2 = (-1)^n$ for all $n \ge 1$.
::: hint
Use induction, and substitute $F_{n+1} = F_n + F_{n-1}$ and $F_{n+2} = F_{n+1} + F_n$.
:::
::: solution
For $n = 1$: $F_2F_0 - F_1^2 = 1\cdot 0 - 1 = -1 = (-1)^1$. Suppose the identity holds for some $n \ge 1$. Then

$$
\begin{aligned}
F_{n+2}F_n - F_{n+1}^2 &= (F_{n+1} + F_n)F_n - F_{n+1}^2 = F_n^2 + F_{n+1}\bigl(F_n - F_{n+1}\bigr) \\
&= F_n^2 - F_{n+1}F_{n-1} = -\bigl(F_{n+1}F_{n-1} - F_n^2\bigr) = -(-1)^n = (-1)^{n+1},
\end{aligned}
$$

using $F_n - F_{n+1} = -F_{n-1}$. This completes the induction. (Alternatively, the identity is the determinant of $\begin{pmatrix}1&1\\1&0\end{pmatrix}^n = \begin{pmatrix}F_{n+1}&F_n\\F_n&F_{n-1}\end{pmatrix}$, whose determinant is $(-1)^n$.)
:::
:::
