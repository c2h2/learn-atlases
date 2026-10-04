A *substitution cipher* encodes a message by replacing each letter of the alphabet with a letter: A by Q, B by W, C by E, and so on. For the recipient to decode the message, two different letters must never be replaced by the same letter — otherwise a received Q might stand for either of them. And if every letter of the alphabet is used as a replacement, then every letter that arrives can be decoded. These two properties of the rule "letter ↦ replacement", called injectivity and surjectivity, and the question of when such a rule can be run backwards, are at the heart of this chapter.

After sets, functions are the most important notion in mathematics. In school a function is usually a formula such as $x^2 + 1$. But the rule that assigns to each person their year of birth, or to each non-empty finite set of integers its largest element, is just as much a function, and no formula is involved. In this chapter we define functions in terms of sets ([[proofs/sets]]), introduce the vocabulary of injective, surjective and bijective functions, study composition and inverses, and see how a function acts on whole subsets of its domain through images and preimages.

## What is a function?

::: definition Function {#def-function}
Let $A$ and $B$ be sets. A **function** (or **map**) $f$ from $A$ to $B$, written $f\colon A\to B$, assigns to each element $a\in A$ exactly one element $f(a)\in B$, called the **value** of $f$ at $a$, or the **image** of $a$. The set $A$ is the **domain** of $f$ and $B$ is its **codomain**. The **range** (or **image**) of $f$ is the set of values actually taken,

$$
f(A) = \set{f(a) : a\in A}\subseteq B.
$$
:::

The word "assigns" is made precise using sets. Formally, a function $f\colon A\to B$ is a subset $f\subseteq A\times B$ ([[proofs/sets#def-cartesian-product]]) such that for every $a\in A$ there is exactly one $b\in B$ with $(a,b)\in f$, and we then write $b = f(a)$. This subset is what we draw as the **graph** of $f$, so the formal definition says that a function *is* its graph — or, to be precise, its graph together with the codomain $B$, which the graph alone does not determine. In practice we think of a function as a rule and write $a \mapsto f(a)$ ("$a$ maps to $f(a)$"); for instance $x\mapsto x^2+1$ is the function $\R\to\R$ whose graph is the parabola $\set{(x, x^2+1) : x\in\R}$.

Two functions $f$ and $g$ are **equal** if they have the same domain, the same codomain, and $f(a) = g(a)$ for every $a$ in the domain. The codomain is part of the data: $x\mapsto x^2$ as a function $\R\to\R$ and as a function $\R\to[0,\infty)$ are different functions, and we shall see that one of them is surjective and the other is not. On the other hand, the formula is not part of the data: $x\mapsto (x+1)^2$ and $x\mapsto x^2+2x+1$ are the same function $\R \to \R$.

Some functions appear so often that they have names.

- The **identity** $\id_A\colon A\to A$, $\id_A(a) = a$.
- A **constant** function $A\to B$, $a\mapsto b_0$ for a fixed $b_0\in B$.
- The **inclusion** $S \to A$, $s\mapsto s$, of a subset $S\subseteq A$.
- The **characteristic function** $\chi_S\colon A\to\set{0,1}$ of a subset $S\subseteq A$, with $\chi_S(a) = 1$ if $a\in S$ and $\chi_S(a) = 0$ otherwise.
- The **projections** $A\times B\to A$, $(a,b)\mapsto a$, and $A\times B\to B$, $(a,b)\mapsto b$.
- A **sequence** $(x_n)$ of real numbers is a function $\N\to\R$, $n\mapsto x_n$.

For functions between small finite sets an **arrow diagram** shows everything: draw the domain and the codomain, and an arrow from each $a$ to $f(a)$. The definition says that *exactly one arrow leaves each element of the domain*. Nothing is required of the codomain: an element of $B$ may receive many arrows, one, or none.

::: widget mapping
domain: 1; 2; 3; 4
codomain: a; b; c; d
map: 1>b; 2>a; 3>d; 4>b
caption: An arrow diagram of a function from $\set{1,2,3,4}$ to $\set{a,b,c,d}$. Two arrows arrive at $b$ and none at $c$, so the function is neither injective nor surjective. Change where $4$ goes so that the function becomes a bijection, and notice that with four elements on each side, curing one defect cures the other ([[#thm-finite]]).
:::

### Is it a function?

To check that a proposed rule really defines a function $A\to B$ we must check two things: every element of $A$ is assigned a value, and that value lies in $B$; and no element is assigned two different values. The second condition is called being **well defined**, and it is the one that is easy to overlook.

::: example Is it a function? {#ex-is-function}
Which of the following rules define functions?
(a) $f\colon\R\to\R$, $f(x) = 1/x$.
(b) $g\colon[0,\infty)\to\R$, $g(x) = $ "the real number $y$ with $y^2 = x$".
(c) $h\colon\Q\to\Z$, $h(p/q) = p$ for integers $p$, $q$ with $q \neq 0$.
(d) $k\colon\Q\to\Q$, $k(p/q) = p^2/q^2$ for integers $p$, $q$ with $q \neq 0$.
::: solution
(a) Not a function: $0$ is in the domain but $1/0$ is undefined. Restricting the domain to $\R\setminus\set{0}$ repairs this.

(b) Not a function: for $x = 4$ both $y = 2$ and $y = -2$ satisfy $y^2 = x$, so the rule does not single out one value. Insisting on $y \ge 0$ gives the square-root function $x \mapsto \sqrt x$, which is a function.

(c) Not a function, because it is not well defined. A rational number has many representations as a fraction: $\frac12 = \frac24$, yet the rule gives $h(\frac12) = 1$ and $h(\frac24) = 2$. The proposed value depends on how the input is written, not on the input itself.

(d) A function. If $\frac pq = \frac{p'}{q'}$ then $\frac{p^2}{q^2} = \bigl(\frac pq\bigr)^2 = \bigl(\frac{p'}{q'}\bigr)^2 = \frac{p'^2}{q'^2}$, so the value does not depend on the representation: $k$ is simply $x\mapsto x^2$ on $\Q$.
:::
:::

Questions of well-definedness arise whenever the elements of the domain have several names — fractions, as here, and equivalence classes in [[proofs/relations]].

## Injective, surjective and bijective functions

::: definition Injective {#def-injective}
A function $f\colon A\to B$ is **injective** (or **one-to-one**, or an **injection**) if different elements of $A$ have different images; equivalently,

$$
\forall a_1,a_2\in A\quad \bigl(f(a_1) = f(a_2) \Rightarrow a_1 = a_2\bigr).
$$ {#eq-injective}
:::

::: definition Surjective {#def-surjective}
A function $f\colon A\to B$ is **surjective** (or **onto**, or a **surjection**) if every element of $B$ is the image of some element of $A$:

$$
\forall b\in B\ \ \exists a\in A\quad f(a) = b.
$$

Equivalently, the range equals the codomain: $f(A) = B$.
:::

::: definition Bijective {#def-bijective}
A function is **bijective** (a **bijection**, or a **one-to-one correspondence**) if it is both injective and surjective. Equivalently, for every $b\in B$ there is *exactly one* $a\in A$ with $f(a) = b$.
:::

In an arrow diagram: injective means no element of $B$ receives two arrows; surjective means every element of $B$ receives at least one arrow; bijective means every element of $B$ receives exactly one arrow, so that the arrows pair off the elements of $A$ with the elements of $B$.

Condition [[#eq-injective]] is the contrapositive of "$a_1\neq a_2\Rightarrow f(a_1)\neq f(a_2)$", which is the more intuitive form; the version in the definition is the one to use in proofs, because equations are easier to manipulate than inequations. The definitions also dictate what proofs look like.

- **Injective:** let $a_1, a_2\in A$ with $f(a_1) = f(a_2)$, and deduce $a_1 = a_2$.
- **Surjective:** let $b\in B$ be arbitrary; find, usually by solving $f(a) = b$ in scratch work, an element $a$ with $f(a) = b$, and check that it lies in $A$.
- **Not injective:** exhibit $a_1\neq a_2$ with $f(a_1) = f(a_2)$.
- **Not surjective:** exhibit one $b\in B$ and show that $f(a) \ne b$ for every $a\in A$.

::: example A linear bijection {#ex-linear}
Prove that $f\colon\R\to\R$, $f(x) = 3x - 5$, is a bijection.
::: solution
*Injective.* Let $x_1,x_2\in\R$ with $f(x_1) = f(x_2)$. Then $3x_1 - 5 = 3x_2 - 5$, so $3x_1 = 3x_2$ and $x_1 = x_2$.

*Surjective.* Let $y\in\R$. Scratch work: $3x - 5 = y$ means $x = (y+5)/3$. So put $x = (y+5)/3$; this is a real number, and $f(x) = 3\cdot\frac{y+5}{3} - 5 = y$.

Hence $f$ is bijective. The same argument works for $x\mapsto mx+c$ whenever $m\neq0$.
:::
:::

::: example Squaring, and the role of the codomain {#ex-square}
Consider the rule $x\mapsto x^2$ with each of the following domains and codomains: (a) $\R\to\R$; (b) $\R\to[0,\infty)$; (c) $[0,\infty)\to\R$; (d) $[0,\infty)\to[0,\infty)$. Which are injective, and which are surjective?
::: solution
*Injectivity.* On the domain $\R$ the function is not injective, since $(-1)^2 = 1^2$ while $-1\neq 1$. On the domain $[0,\infty)$ it is injective: if $x_1^2 = x_2^2$ with $x_1,x_2\ge0$, then $0 = x_1^2 - x_2^2 = (x_1 - x_2)(x_1+x_2)$, so $x_1 = x_2$ or $x_1 + x_2 = 0$; in the second case both numbers are non-negative with sum zero, so $x_1 = x_2 = 0$. Either way $x_1 = x_2$.

*Surjectivity.* With codomain $\R$ the function is not surjective, since $-1$ is not the square of any real number. With codomain $[0,\infty)$ it is surjective: every $y\ge0$ equals $(\sqrt y)^2$, and $\sqrt y$ lies in both of the possible domains.

So (a) is neither injective nor surjective, (b) is surjective but not injective, (c) is injective but not surjective, and (d) is bijective. One rule gives four different functions with four different combinations of properties.
:::
:::

For a function $f\colon\R\to\R$ the definitions have a picture. The solutions of $f(x) = c$ are the points where the graph meets the horizontal line $y = c$. So $f$ is injective exactly when every horizontal line meets the graph *at most* once, surjective exactly when every horizontal line meets it *at least* once, and bijective when every horizontal line meets it exactly once: the **horizontal line test**.

::: widget plot
f: x^3 - a*x; c
x: -2.5, 2.5
y: -4, 4
sliders: a=1.5:-2:3:0.1; c=0.5:-3:3:0.05
labels: x^3 - ax; y = c
caption: The horizontal line test for $f(x) = x^3 - ax$. Move $c$ to slide the horizontal line up and down, and count the intersections. For $a = 1.5$ some lines (those with $\lvert c\rvert < 1/\sqrt2\approx 0.71$) meet the graph three times, so $f$ is not injective; but every line meets it at least once, so $f$ is surjective. Now set $a \le 0$: the graph becomes increasing, every line meets it exactly once, and $f$ is a bijection of $\R$.
:::

::: quiz
Let $f\colon\Z\to\Z$ be given by $f(n) = 2n$, and $g\colon\Z\to\Z$ by $g(n) = \lfloor n/2\rfloor$, the greatest integer that is at most $n/2$. Which statement is true?
- [ ] Both are bijections.
- [x] $f$ is injective but not surjective; $g$ is surjective but not injective.
- [ ] $f$ is surjective but not injective; $g$ is injective but not surjective.
- [ ] Neither is injective.
::: solution
If $2n_1 = 2n_2$ then $n_1 = n_2$, so $f$ is injective; but $f(n)$ is always even, so $1$ is not a value and $f$ is not surjective. For $g$, every $m\in\Z$ equals $g(2m)$, so $g$ is surjective; but $g(0) = g(1) = 0$, so $g$ is not injective. On infinite sets injectivity and surjectivity are independent of each other — contrast [[#thm-finite]].
:::
:::

### Functions between finite sets

For finite sets of the same size the two conditions coincide, which often halves the work.

::: theorem Injective equals surjective for finite sets of equal size {#thm-finite}
Let $A$ and $B$ be finite sets with $\abs A = \abs B$, and let $f\colon A\to B$. Then $f$ is injective if and only if $f$ is surjective, and hence if and only if it is bijective.
:::

::: proof
Let $n = \abs A = \abs B$ and list the elements of $A$ as $a_1,\dots,a_n$. The range is $f(A) = \set{f(a_1),\dots,f(a_n)}$.

If $f$ is injective, the $n$ values $f(a_1),\dots,f(a_n)$ are distinct, so $\abs{f(A)} = n = \abs B$. A subset $S$ of a finite set $B$ with $\abs S = \abs B$ is all of $B$: otherwise $B\setminus S$ is non-empty and $\abs S = \abs B - \abs{B\setminus S} < \abs B$. Hence $f(A) = B$, and $f$ is surjective.

If $f$ is not injective, two of the values $f(a_1),\dots,f(a_n)$ coincide, so the list contains at most $n-1$ distinct elements and $\abs{f(A)}\le n-1 < \abs B$. Then $f(A)\neq B$ and $f$ is not surjective. This is the contrapositive of "surjective implies injective".
:::

The same counting shows that if $\abs A > \abs B$ there is no injection $A\to B$ — the **pigeonhole principle** ([[discrete/advanced-counting#thm-pigeonhole]]) — and that if $\abs A < \abs B$ there is no surjection $A \to B$. [[#thm-finite]] fails for infinite sets: the quiz above gives an injection $\Z\to\Z$ that is not surjective. Indeed, being in bijection with a proper subset of itself is characteristic of infinite sets, as we shall see in [[proofs/cardinality]].

::: example Counting functions {#ex-counting}
How many functions are there from $A = \set{1,2,3}$ to $B = \set{a,b,c,d}$? How many of them are injective, and how many surjective?
::: solution
A function is determined by choosing $f(1)$, $f(2)$ and $f(3)$ independently, each in $4$ ways, so there are $4^3 = 64$ functions. For an injection, $f(1)$ can be chosen in $4$ ways, then $f(2)$ must differ from $f(1)$ ($3$ ways), and $f(3)$ must differ from both ($2$ ways): $4\cdot3\cdot2 = 24$ injections. There are no surjections, since the range has at most $3$ elements and cannot be all of $B$.

In general there are $n^m$ functions from an $m$-element set to an $n$-element set, of which $n(n-1)\cdots(n-m+1)$ are injective. Counting surjections is harder and is done with inclusion–exclusion in [[discrete/advanced-counting]].
:::
:::

## Composition

::: definition Composition {#def-composition}
Let $f\colon A\to B$ and $g\colon B\to C$. The **composition** $g\circ f\colon A\to C$ is the function

$$
(g\circ f)(a) = g\bigl(f(a)\bigr)\qquad(a\in A).
$$
:::

Read $g\circ f$ as "$g$ after $f$": first apply $f$, then $g$. For $g\circ f$ to make sense the values of $f$ must lie in the domain of $g$. Composition is not commutative: for $f(x) = x+1$ and $g(x) = x^2$ on $\R$, $(g\circ f)(x) = (x+1)^2$ while $(f\circ g)(x) = x^2+1$, and these differ at $x = 1$, where they are $4$ and $2$. It is, however, associative.

::: proposition Associativity and identities {#prop-associative}
Let $f\colon A\to B$, $g\colon B\to C$ and $h\colon C\to D$. Then $h\circ(g\circ f) = (h\circ g)\circ f$, and $f\circ\id_A = f = \id_B\circ f$.
:::

::: proof
Both $h\circ(g\circ f)$ and $(h\circ g)\circ f$ are functions from $A$ to $D$, and for each $a\in A$

$$
\bigl(h\circ(g\circ f)\bigr)(a) = h\bigl((g\circ f)(a)\bigr) = h\bigl(g(f(a))\bigr) = (h\circ g)\bigl(f(a)\bigr) = \bigl((h\circ g)\circ f\bigr)(a).
$$

Similarly, $(f\circ\id_A)(a) = f(a) = (\id_B\circ f)(a)$ for every $a \in A$.
:::

Because of associativity we may write $h\circ g\circ f$ without brackets.

::: theorem Composition and injectivity, surjectivity {#thm-composition}
Let $f\colon A\to B$ and $g\colon B\to C$.

1. If $f$ and $g$ are injective, so is $g\circ f$.
2. If $f$ and $g$ are surjective, so is $g\circ f$.
3. If $f$ and $g$ are bijective, so is $g\circ f$.
4. If $g\circ f$ is injective, then $f$ is injective.
5. If $g\circ f$ is surjective, then $g$ is surjective.
:::

::: proof
1. Suppose $(g\circ f)(a_1) = (g\circ f)(a_2)$, that is, $g(f(a_1)) = g(f(a_2))$. Since $g$ is injective, $f(a_1) = f(a_2)$; since $f$ is injective, $a_1 = a_2$.
2. Let $c\in C$. Since $g$ is surjective there is $b\in B$ with $g(b) = c$, and since $f$ is surjective there is $a\in A$ with $f(a) = b$. Then $(g\circ f)(a) = g(b) = c$.
3. Combine 1 and 2.
4. Suppose $f(a_1) = f(a_2)$. Applying $g$ gives $(g\circ f)(a_1) = (g\circ f)(a_2)$, and since $g\circ f$ is injective, $a_1 = a_2$.
5. Let $c\in C$. There is $a\in A$ with $g(f(a)) = c$, so $b = f(a)$ is an element of $B$ with $g(b) = c$.
:::

Parts 4 and 5 cannot be strengthened: even if $g\circ f$ is bijective, $f$ need not be surjective and $g$ need not be injective. For example, let $A = \set{1}$, $B = \set{1,2}$, $C = \set{1}$, $f(1) = 1$ and $g(1) = g(2) = 1$. Then $g\circ f = \id_A$ is a bijection, but $f$ misses $2$ and $g$ sends $1$ and $2$ to the same point.

## Inverse functions

A bijection can be run backwards: since each $b\in B$ comes from exactly one $a\in A$, we may send $b$ back to that $a$.

::: definition Inverses {#def-inverse}
Let $f\colon A\to B$. A function $g\colon B\to A$ is a **left inverse** of $f$ if $g\circ f = \id_A$, a **right inverse** of $f$ if $f\circ g = \id_B$, and an **inverse** (or two-sided inverse) of $f$ if it is both:

$$
g\bigl(f(a)\bigr) = a \ \text{ for all } a\in A \qquad\text{and}\qquad f\bigl(g(b)\bigr) = b \ \text{ for all } b\in B.
$$

If $f$ has an inverse, $f$ is called **invertible**.
:::

::: theorem Bijections are exactly the invertible functions {#thm-inverse}
A function $f\colon A\to B$ is bijective if and only if it has an inverse. In that case the inverse is unique; it is denoted $f^{-1}\colon B\to A$, and $f^{-1}(b)$ is the unique $a\in A$ with $f(a) = b$. Moreover $f^{-1}$ is itself bijective, with $(f^{-1})^{-1} = f$.
:::

::: proof
Suppose $g$ is an inverse of $f$. Then $g\circ f = \id_A$ is injective, so $f$ is injective by [[#thm-composition]], part 4; and $f\circ g = \id_B$ is surjective, so $f$ is surjective by part 5. Thus $f$ is bijective.

Conversely, suppose $f$ is bijective. For each $b\in B$ there is exactly one $a\in A$ with $f(a) = b$ — at least one by surjectivity, at most one by injectivity — and we define $g(b)$ to be this $a$. Then $g\colon B\to A$ is a function, and $f(g(b)) = b$ for every $b \in B$ by construction. For $a\in A$, the element $g(f(a))$ is the unique element of $A$ that $f$ maps to $f(a)$; since $a$ itself is such an element, $g(f(a)) = a$. Hence $g$ is an inverse of $f$.

*Uniqueness.* If $g$ and $h$ are both inverses of $f$, then by associativity ([[#prop-associative]])

$$
g = g\circ\id_B = g\circ(f\circ h) = (g\circ f)\circ h = \id_A\circ h = h.
$$

Finally, the equations $f^{-1}\circ f = \id_A$ and $f\circ f^{-1} = \id_B$ say precisely that $f$ is an inverse of $f^{-1}$. So $f^{-1}$ is invertible, hence bijective by the first part, and $(f^{-1})^{-1} = f$ by uniqueness.
:::

In practice, to invert a bijection $f$ we solve the equation $y = f(x)$ for $x$; the solution, as a function of $y$, is $f^{-1}(y)$.

::: example Inverting a fractional linear function {#ex-mobius}
Show that $f\colon\R\setminus\set3\to\R\setminus\set2$, $f(x) = \dfrac{2x+1}{x-3}$, is a well-defined bijection, and find $f^{-1}$.
::: solution
*Well defined.* For $x \ne 3$ the denominator is non-zero. We must also check that every value lies in the codomain, that is, $f(x)\neq 2$: if $\frac{2x+1}{x-3} = 2$ then $2x+1 = 2x-6$, which is impossible.

*Finding the inverse.* For $y\neq 2$, solve $y = \frac{2x+1}{x-3}$:

$$
y(x-3) = 2x+1 \iff yx - 2x = 3y+1 \iff x(y-2) = 3y+1 \iff x = \frac{3y+1}{y-2}.
$$

So define $g\colon\R\setminus\set2\to\R\setminus\set3$ by $g(y) = \frac{3y+1}{y-2}$. It is well defined: the denominator is non-zero, and $g(y) = 3$ would mean $3y+1 = 3y-6$, which is impossible.

*Checking.* Rather than relying on the chain of equivalences, we verify both compositions directly. For $x\neq 3$, multiplying numerator and denominator by $x - 3$,

$$
g(f(x)) = \frac{3\cdot\frac{2x+1}{x-3} + 1}{\frac{2x+1}{x-3} - 2} = \frac{3(2x+1) + (x-3)}{(2x+1) - 2(x-3)} = \frac{7x}{7} = x,
$$

and for $y\neq 2$, multiplying by $y - 2$,

$$
f(g(y)) = \frac{2\cdot\frac{3y+1}{y-2}+1}{\frac{3y+1}{y-2} - 3} = \frac{2(3y+1) + (y-2)}{(3y+1) - 3(y-2)} = \frac{7y}{7} = y.
$$

So $g$ is an inverse of $f$; by [[#thm-inverse]], $f$ is a bijection and $f^{-1} = g$. Notice how the excluded points match up: the domain of $f$ omits $3$, where $f$ blows up, and the codomain omits $2$, the horizontal asymptote, which $f$ never reaches.
:::
:::

::: warning Two meanings of f⁻¹
The symbol $f^{-1}$ denotes the inverse *function* only when $f$ is a bijection, and it never means the reciprocal $1/f$: $\sin^{-1}$, the inverse of $\sin$ restricted to $[-\frac\pi2,\frac\pi2]$, is not $1/\sin$. Worse, the same symbol is used for preimages: $f^{-1}(T)$, for a *set* $T$, makes sense for every function, bijective or not (see below). Write $f^{-1}$ for an inverse function only after checking that $f$ is bijective.
:::

### One-sided inverses

What about functions that are only injective, or only surjective?

::: theorem One-sided inverses {#thm-one-sided}
Let $f\colon A\to B$ with $A\neq\varnothing$.

1. $f$ has a left inverse if and only if $f$ is injective.
2. $f$ has a right inverse if and only if $f$ is surjective.
:::

::: proof
1. If $g\circ f = \id_A$, then $f$ is injective by [[#thm-composition]], part 4. Conversely, let $f$ be injective. Fix some $a_0\in A$, which is possible since $A\neq\varnothing$, and define $g\colon B\to A$ by

$$
g(b) = \begin{cases} \text{the unique } a\in A \text{ with } f(a) = b, & \text{if } b\in f(A),\\ a_0, & \text{if } b\notin f(A).\end{cases}
$$

The first case is unambiguous because $f$ is injective. For every $a\in A$ we have $f(a)\in f(A)$ and $g(f(a)) = a$, so $g\circ f = \id_A$.

2. If $f\circ g = \id_B$, then $f$ is surjective by [[#thm-composition]], part 5. Conversely, let $f$ be surjective. For each $b\in B$ the set $\set{a\in A : f(a) = b}$ is non-empty; choose one of its elements and call it $g(b)$. Then $f(g(b)) = b$ for every $b$, so $f\circ g = \id_B$.
:::

The proof of part 2 makes a choice for every $b\in B$ at once. When $B$ is infinite and no rule tells us which element to pick, the right to make infinitely many arbitrary choices is exactly the **axiom of choice**, one of the axioms of ZFC mentioned in [[proofs/sets]]; in fact the statement "every surjection has a right inverse" is equivalent to the axiom of choice. The hypothesis $A\ne\varnothing$ in part 1 excludes a degenerate case: the empty function $\varnothing\to B$ is injective, but if $B\neq\varnothing$ there is no function at all from $B$ to $\varnothing$.

::: example One-sided inverses of the shift {#ex-shift}
Let $s\colon\N\to\N$, $s(n) = n+1$. Show that $s$ has infinitely many left inverses but no right inverse.
::: solution
$s$ is injective, since $n_1+1 = n_2+1$ implies $n_1 = n_2$, but not surjective, since $1$ is not a value. By [[#thm-one-sided]] it has a left inverse and no right inverse. The left inverses can be written down explicitly: for each $k\in\N$ define

$$
g_k(n) = \begin{cases} n-1, & n\ge 2,\\ k, & n = 1.\end{cases}
$$

Then $g_k(s(n)) = g_k(n+1) = n$ for every $n\in\N$, so each $g_k$ is a left inverse, and different values of $k$ give different functions. The value at $1$ is arbitrary because $1$ is not in the range of $s$, so the equation $g\circ s = \id_\N$ places no condition on it. No $g_k$ is a right inverse: $s(g_k(1)) = k+1\neq 1$.
:::
:::

::: quiz
Let $f\colon A\to B$ and $g\colon B\to A$ satisfy $g\circ f = \id_A$. Which conclusion is justified?
- [x] $f$ is injective and $g$ is surjective.
- [ ] $f$ is surjective and $g$ is injective.
- [ ] $f$ and $g$ are both bijections.
- [ ] $f\circ g = \id_B$.
::: solution
By [[#thm-composition]], part 4, since $g\circ f$ is injective, $f$ is injective; by part 5, since $g\circ f$ is surjective, $g$ is surjective. Nothing more follows: the shift $s$ and its left inverse $g_1$ in [[#ex-shift]] satisfy $g_1\circ s = \id_\N$, yet $s$ is not surjective, $g_1$ is not injective ($g_1(1) = g_1(2) = 1$), and $s\circ g_1\neq\id_\N$.
:::
:::

## Images and preimages

A function acts not only on elements but also on whole subsets.

::: definition Image and preimage {#def-image-preimage}
Let $f\colon A\to B$. For $S\subseteq A$, the **image** of $S$ is

$$
f(S) = \set{f(a) : a\in S}\subseteq B,
$$

and for $T\subseteq B$, the **preimage** (or **inverse image**) of $T$ is

$$
f^{-1}(T) = \set{a\in A : f(a)\in T}\subseteq A.
$$
:::

The preimage is defined for every function; $f^{-1}(T)$ is notation for a set and does not presuppose an inverse function. When $f$ is bijective, the preimage of $T$ under $f$ coincides with the image of $T$ under the inverse function $f^{-1}$, so the notation causes no clash.

::: example Images and preimages of the squaring map {#ex-images}
Let $f\colon\R\to\R$, $f(x) = x^2$. Find $f([-1,2])$, $f^{-1}([1,4])$, $f^{-1}(\set{-1})$ and $f^{-1}\bigl(f([0,1])\bigr)$.
::: solution
- As $x$ runs over $[-1,1]$, $x^2$ runs over $[0,1]$; as $x$ runs over $[1,2]$, $x^2$ runs over $[1,4]$. So $f([-1,2]) = [0,4]$.
- $x\in f^{-1}([1,4])$ means $1\le x^2\le 4$, that is, $1\le\abs x\le2$. So $f^{-1}([1,4]) = [-2,-1]\cup[1,2]$.
- No real number has square $-1$, so $f^{-1}(\set{-1}) = \varnothing$.
- $f([0,1]) = [0,1]$, and $f^{-1}([0,1]) = \set{x : 0 \le x^2\le 1} = [-1,1]$. So $f^{-1}(f([0,1])) = [-1,1]$, which is strictly larger than $[0,1]$. Taking the image and then the preimage need not return the original set, because $f$ is not injective.
:::
:::

How do images and preimages interact with the set operations? Preimages are perfectly behaved; images only partly so.

::: theorem Images and preimages of unions and intersections {#thm-image-preimage}
Let $f\colon A\to B$, let $S_1,S_2\subseteq A$ and let $T, T_1,T_2\subseteq B$. Then

1. $f(S_1\cup S_2) = f(S_1)\cup f(S_2)$;
2. $f(S_1\cap S_2)\subseteq f(S_1)\cap f(S_2)$, with equality if $f$ is injective;
3. $f^{-1}(T_1\cup T_2) = f^{-1}(T_1)\cup f^{-1}(T_2)$;
4. $f^{-1}(T_1\cap T_2) = f^{-1}(T_1)\cap f^{-1}(T_2)$;
5. $f^{-1}(B\setminus T) = A\setminus f^{-1}(T)$.
:::

::: proof
1. $b\in f(S_1\cup S_2)$ means that $b = f(a)$ for some $a$ lying in $S_1$ or in $S_2$, which says exactly that $b\in f(S_1)$ or $b\in f(S_2)$.
2. If $b\in f(S_1\cap S_2)$, then $b = f(a)$ with $a\in S_1$ and $a \in S_2$, so $b\in f(S_1)$ and $b\in f(S_2)$. Now suppose that $f$ is injective and $b\in f(S_1)\cap f(S_2)$, say $b = f(a_1) = f(a_2)$ with $a_1\in S_1$ and $a_2\in S_2$. Injectivity gives $a_1 = a_2$, which therefore lies in $S_1\cap S_2$, so $b\in f(S_1\cap S_2)$.
3. For $a\in A$: $a\in f^{-1}(T_1\cup T_2) \iff f(a)\in T_1\cup T_2 \iff \bigl(f(a)\in T_1 \text{ or } f(a)\in T_2\bigr) \iff a\in f^{-1}(T_1)\cup f^{-1}(T_2)$.
4. The same chain with "and" in place of "or".
5. For $a\in A$: $a\in f^{-1}(B\setminus T)\iff f(a)\notin T\iff a\notin f^{-1}(T) \iff a\in A\setminus f^{-1}(T)$.
:::

The inclusion in part 2 can be strict. For $f(x) = x^2$ on $\R$, take $S_1 = \set{-1}$ and $S_2 = \set{1}$: then $f(S_1\cap S_2) = f(\varnothing) = \varnothing$, but $f(S_1)\cap f(S_2) = \set1$. Two different points with the same image are exactly what injectivity forbids. Images do not respect complements either: $f\bigl((-\infty,0)\bigr) = (0,\infty)$, which is not the complement of $f\bigl([0,\infty)\bigr) = [0,\infty)$.

::: remark Why preimages matter
Preimages commute with *all* the set operations — including unions and intersections of arbitrary families, by the same one-line proofs. This is why many central definitions in later courses are phrased in terms of preimages: a function between topological spaces is continuous when the preimage of every open set is open ([[topology/continuous-maps]]); a function is measurable when preimages of measurable sets are measurable ([[measure-theory/measurable-functions]]); and the probability that a random variable $X$ takes a value in $T$ is the probability of the event $X^{-1}(T)$ ([[probability/discrete-random-variables]]).
:::

::: widget mapping
domain: 1; 2; 3; 4; 5
codomain: a; b; c
map: 1>a; 2>b; 3>b; 4>c; 5>a
caption: A surjection from a five-element set onto a three-element set. The preimage of $\set{b}$ is $\set{2,3}$, and the preimages of $\set a$, $\set b$ and $\set c$ split the domain into three disjoint pieces. Try to make the function injective by editing arrows: it cannot be done, because five arrows must land on three points (the pigeonhole principle).
:::

::: history
The word *function* was used by Gottfried Wilhelm Leibniz from the 1670s for quantities, such as slopes and tangent lengths, attached to a curve, and Leonhard Euler introduced the notation $f(x)$ in 1734. In his *Introductio* (1748) Euler defined a function as an analytic expression — a formula — and that was the usual view, although by 1755 he allowed any quantity that depends on another. Work on Fourier series forced a broader view: in 1837 Peter Gustav Lejeune Dirichlet stressed that $y$ is a function of $x$ whenever a value of $y$ is assigned to each $x$ in an interval, by any rule whatever, not necessarily a single formula. Richard Dedekind's *Was sind und was sollen die Zahlen?* (1888) treated mappings between arbitrary sets as fundamental objects, and the definition of a function as a set of ordered pairs became standard in the early twentieth century. The words injection, surjection and bijection were introduced by the Bourbaki group of French mathematicians in the mid-twentieth century.
:::

## Where this leads

Bijections are the right notion of "same size" for infinite sets, and [[proofs/cardinality]] builds on everything in this chapter; Cantor's theorem, for instance, says that no function $A\to\mathcal{P}(A)$ is surjective. A relation ([[proofs/relations]]) is what a function becomes when the condition "exactly one output" is dropped. The bijections from a set to itself form a group under composition ([[abstract-algebra/groups]]), and for finite sets these are the permutations of [[abstract-algebra/permutation-groups]]. In linear algebra a linear map is injective exactly when its kernel is zero, and a square matrix is invertible exactly when its determinant is non-zero ([[linear-algebra/linear-maps]], [[linear-algebra/determinants]]). Counting functions of each kind is a basic task of [[discrete/counting]].

::: summary
- A function $f\colon A\to B$ assigns to each element of the domain $A$ exactly one value in the codomain $B$; formally it is a subset of $A\times B$, its graph. Domain and codomain are part of the function, and a proposed rule must be checked to be well defined.
- $f$ is injective if $f(a_1) = f(a_2)$ implies $a_1 = a_2$, surjective if every $b\in B$ is a value, and bijective if both; for real functions this is the horizontal line test.
- Prove injectivity by assuming $f(a_1) = f(a_2)$; prove surjectivity by solving $f(a) = b$ for an arbitrary $b$; disprove either with one explicit counterexample.
- For finite sets of the same size, injective $\iff$ surjective ([[#thm-finite]]); for infinite sets the two properties are independent.
- Composition is associative but not commutative. It preserves injectivity, surjectivity and bijectivity; if $g\circ f$ is injective then $f$ is, and if $g\circ f$ is surjective then $g$ is.
- A function has a two-sided inverse exactly when it is bijective, and the inverse is unique ([[#thm-inverse]]); left inverses go with injectivity and right inverses with surjectivity.
- Preimages respect unions, intersections and complements; images respect unions, but in general only $f(S_1\cap S_2)\subseteq f(S_1)\cap f(S_2)$.
:::

## Exercises

::: exercise Which rules are functions? {level=1}
Decide which of the following define functions, giving a reason.
(a) $f\colon\R\to\R$, $f(x) = \dfrac{1}{x^2+1}$.
(b) $g\colon\R\to\R$, $g(x) = \sqrt{x}$.
(c) $h\colon\Q\to\Q$, $h\bigl(\frac pq\bigr) = \dfrac{p+1}{q}$, for integers $p$, $q$ with $q\ne 0$.
(d) $k\colon\Z\to\N$, $k(n) = n^2+1$.
::: solution
(a) Yes: $x^2+1\ge1 > 0$, so the formula gives exactly one real number for each real $x$.

(b) No: $g(-1)$ is not a real number. (It is a function on the domain $[0,\infty)$.)

(c) No, it is not well defined: $\frac12 = \frac24$, but the rule gives $\frac{2}{2} = 1$ for the first representation and $\frac34$ for the second.

(d) Yes: for every integer $n$, $n^2 + 1$ is a positive integer, so it lies in $\N$.
:::
:::

::: exercise Injective or surjective? {level=1}
For each function, decide whether it is injective and whether it is surjective.
(a) $f\colon\Z\to\Z$, $f(n) = n+3$.
(b) $g\colon\Z\to\Z$, $g(n) = 3n$.
(c) $h\colon\R\to\R$, $h(x) = x^3$.
(d) $k\colon\R\to[-1,1]$, $k(x) = \sin x$.
::: solution
(a) Bijective: $n_1+3 = n_2+3$ gives $n_1 = n_2$, and every $m\in\Z$ equals $f(m-3)$.

(b) Injective, since $3n_1 = 3n_2$ implies $n_1 = n_2$, but not surjective: $1$ is not a multiple of $3$.

(c) Bijective. If $x_1^3 = x_2^3$ then $0 = x_1^3 - x_2^3 = (x_1 - x_2)(x_1^2 + x_1x_2 + x_2^2)$. The second factor equals $\bigl(x_1 + \frac{x_2}{2}\bigr)^2 + \frac34x_2^2$, which vanishes only when $x_1 = x_2 = 0$; so in every case $x_1 = x_2$. Every $y\in\R$ equals $h\bigl(\sqrt[3]{y}\bigr)$.

(d) Surjective, since $\sin$ takes every value in $[-1,1]$ (already on $[-\frac\pi2,\frac\pi2]$), but not injective: $\sin 0 = \sin\pi = 0$.
:::
:::

::: exercise Counting injections {level=1 check="60"}
How many injective functions are there from $[3]$ to $[5]$?
::: solution
Choose $f(1)$ in $5$ ways, then $f(2)\neq f(1)$ in $4$ ways, then $f(3)$ different from both in $3$ ways: $5\cdot4\cdot3 = 60$ injections.
:::
:::

::: exercise Images and preimages {level=2}
Let $f\colon\R\to\R$, $f(x) = x^2 - 2x$. Find $f([0,3])$, $f^{-1}([-1,3])$ and $f^{-1}(\set{-2})$.
::: hint
Complete the square.
:::
::: solution
Write $f(x) = (x-1)^2 - 1$.

- On $[0,3]$, $x-1$ runs over $[-1,2]$, so $(x-1)^2$ runs over $[0,4]$ and $f(x)$ over $[-1,3]$. Thus $f([0,3]) = [-1,3]$.
- The inequality $f(x)\ge -1$ holds for every $x$, and $f(x)\le 3 \iff (x-1)^2\le 4\iff -2\le x-1\le 2\iff -1\le x\le 3$. So $f^{-1}([-1,3]) = [-1,3]$.
- $f(x) = -2$ would require $(x-1)^2 = -1$, which is impossible, so $f^{-1}(\set{-2}) = \varnothing$.
:::
:::

::: exercise Two compositions {level=2}
Let $f,g\colon\R\to\R$ be $f(x) = 2x+1$ and $g(x) = x^2-3$. Find formulas for $g\circ f$ and $f\circ g$, and show that $(g\circ f)(x)\neq(f\circ g)(x)$ for every real $x$.
::: solution
$(g\circ f)(x) = (2x+1)^2 - 3 = 4x^2+4x-2$ and $(f\circ g)(x) = 2(x^2-3)+1 = 2x^2-5$. They agree exactly when $4x^2+4x-2 = 2x^2-5$, that is, when $2x^2+4x+3 = 0$. But $2x^2+4x+3 = 2(x+1)^2+1 \ge 1$ for every real $x$ (equivalently, the discriminant $16 - 24 = -8$ is negative), so the two compositions differ at every point.
:::
:::

::: exercise Surjections from four elements onto three {level=2 check="36"}
How many surjective functions are there from $[4]$ onto $[3]$?
::: hint
In a surjection $[4]\to[3]$, exactly one value is taken twice.
:::
::: solution
Four elements are mapped onto three values with each value hit at least once, so exactly one value is hit twice and the other two once each. Choose the value that is hit twice ($3$ ways), choose the two elements of $[4]$ mapped to it ($\binom42 = 6$ ways), and map the remaining two elements bijectively onto the remaining two values ($2$ ways). The total is $3\cdot6\cdot2 = 36$.
:::
:::

::: exercise A partial converse {level=2}
Let $f\colon A\to B$ and $g\colon B\to C$. Prove that if $g\circ f$ is surjective and $g$ is injective, then $f$ is surjective.
::: solution
Let $b\in B$. Since $g\circ f$ is surjective, there is $a\in A$ with $g(f(a)) = g(b)$. As $g$ is injective, $f(a) = b$. So every $b \in B$ is a value of $f$.
:::
:::

::: exercise An integer linear map {level=3}
Show that $f\colon\Z\times\Z\to\Z\times\Z$, $f(m,n) = (2m+n,\ m+n)$, is a bijection, and find its inverse. Is $g\colon\Z\times\Z\to\Z\times\Z$, $g(m,n) = (2m+n,\ n)$, a bijection?
::: hint
Solve $u = 2m+n$, $v = m+n$ for $m$ and $n$, and check that the solution consists of integers.
:::
::: solution
Solving $u = 2m+n$ and $v = m+n$: subtracting gives $m = u-v$, and then $n = v - m = 2v - u$. Define $h\colon\Z\times\Z\to\Z\times\Z$ by $h(u,v) = (u-v,\ 2v-u)$. Then

$$
f(h(u,v)) = \bigl(2(u-v)+(2v-u),\ (u-v)+(2v-u)\bigr) = (u, v),
$$

$$
h(f(m,n)) = \bigl((2m+n)-(m+n),\ 2(m+n)-(2m+n)\bigr) = (m,n).
$$

So $h$ is an inverse of $f$, and by [[#thm-inverse]] $f$ is a bijection with $f^{-1}(u,v) = (u-v,\ 2v-u)$.

The map $g$ is injective — if $(2m+n,\ n) = (2m'+n',\ n')$ then $n = n'$ and then $m = m'$ — but not surjective: in $g(m,n)$ the first coordinate $2m+n$ has the same parity as the second coordinate $n$, so for example $(1, 0)$ is not a value. Over $\Z$, unlike over $\R$, a linear map with non-zero determinant need not be surjective; one can show it is a bijection of $\Z^2$ exactly when its determinant is $\pm1$, as it is for $f$.
:::
:::

::: exercise Images of preimages {level=3}
Let $f\colon A\to B$. Prove that $f(f^{-1}(T))\subseteq T$ for every $T\subseteq B$, and that equality holds for every $T$ if and only if $f$ is surjective. Then prove that $S\subseteq f^{-1}(f(S))$ for every $S\subseteq A$, with equality for every $S$ if and only if $f$ is injective.
::: solution
*Images of preimages.* If $b\in f(f^{-1}(T))$, then $b = f(a)$ for some $a\in f^{-1}(T)$, that is, some $a$ with $f(a)\in T$; so $b\in T$. If $f$ is surjective and $b\in T$, choose $a$ with $f(a) = b$; then $a\in f^{-1}(T)$, so $b = f(a)\in f(f^{-1}(T))$, and equality holds. Conversely, if equality holds for every $T$, take $T = B$: then $f(A) = f(f^{-1}(B)) = B$, so $f$ is surjective.

*Preimages of images.* If $a\in S$ then $f(a)\in f(S)$, so $a\in f^{-1}(f(S))$. Suppose $f$ is injective and $a\in f^{-1}(f(S))$; then $f(a) = f(s)$ for some $s\in S$, so $a = s\in S$, and equality holds. Conversely, suppose equality holds for every $S$, and let $f(a_2) = f(a_1)$. Taking $S = \set{a_1}$ gives $a_2\in f^{-1}(f(\set{a_1})) = \set{a_1}$, so $a_2 = a_1$, and $f$ is injective.
:::
:::

::: exercise Iterating a bijection of a finite set {level=3}
Let $A$ be a finite set and $f\colon A\to A$ an injective function, and write $f^k = f\circ\cdots\circ f$ ($k$ factors). Prove that $f^k = \id_A$ for some $k\ge1$. Show that the conclusion fails for the injective map $s\colon\N\to\N$, $s(n) = n+1$.
::: hint
There are only finitely many functions $A\to A$, so the iterates $f, f^2, f^3,\dots$ cannot all be different.
:::
::: solution
By [[#thm-finite]], $f$ is a bijection, so it has an inverse $f^{-1}$ ([[#thm-inverse]]). There are only $N = \abs A^{\abs A}$ functions from $A$ to $A$, so among the $N+1$ functions $f^1, f^2, \dots, f^{N+1}$ two must coincide: $f^i = f^j$ for some $1\le i<j$. Compose both sides on the left with $f^{-1}$, $i$ times. Using associativity and $f^{-1}\circ f = \id_A$, the left side becomes $\id_A$ and the right side becomes $f^{j-i}$. So $f^k = \id_A$ with $k = j-i\ge1$.

For the shift, $s^k(n) = n+k$, so $s^k(1) = k+1\neq1$ for every $k\ge1$ and no iterate is the identity. There is no contradiction: $s$ is injective but not surjective, which is possible only because $\N$ is infinite.
:::
:::
