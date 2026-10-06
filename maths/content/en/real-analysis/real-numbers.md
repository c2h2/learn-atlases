Calculus makes confident promises. A continuous function that is negative at one point and positive at another must be zero somewhere in between. An increasing sequence that never exceeds $10$ must settle down to a limit. A continuous function on a closed interval attains a largest value. None of these promises is about functions alone: each one depends on the number system the function lives in.

To see this, pretend for a moment that the only numbers are the rationals $\Q$. The function $f(x) = x^2 - 2$ is a perfectly good continuous function on $\Q$; it satisfies $f(1) = -1 < 0$ and $f(2) = 2 > 0$, yet there is no rational $x$ with $f(x) = 0$, because (as we prove below) no fraction squares to $2$. Squeezing in on the "root" shows what goes wrong:

| $x$ | $1.4$ | $1.41$ | $1.414$ | $1.4142$ |
|---|---|---|---|---|
| $x^2$ | $1.96$ | $1.9881$ | $1.999396$ | $1.99996164$ |

| $x$ | $1.5$ | $1.42$ | $1.415$ | $1.4143$ |
|---|---|---|---|---|
| $x^2$ | $2.25$ | $2.0164$ | $2.002225$ | $2.00024449$ |

The rationals close in from both sides on a point where there is nothing. The graph of $f$ over $\Q$ crosses the axis through a hole. So the intermediate value theorem is *false* over $\Q$, and any proof of it must use some property that $\R$ has and $\Q$ lacks.

That property is **completeness**, and this chapter is about it. We describe $\R$ by axioms — the familiar rules of arithmetic and order, plus one more — and then derive from the extra axiom the facts on which all of analysis rests: the existence of suprema, the Archimedean property, the density of the rationals, the nested interval property and the uncountability of $\R$.

## Numbers with gaps

The first gap ever found is still the best example. We use the convention, kept throughout this course, that $\N = \set{1, 2, 3, \dots}$.

::: theorem √2 is irrational {#thm-sqrt2-irrational}
There is no rational number $x$ with $x^2 = 2$.
:::

::: proof
Suppose, for a contradiction, that $x = p/q$ with $p, q \in \Z$, $q \ge 1$, and $x^2 = 2$. Cancelling common factors, we may assume that $p$ and $q$ are not both even. From $p^2 = 2q^2$ we see that $p^2$ is even. The square of an odd number is odd ($(2k+1)^2 = 2(2k^2 + 2k) + 1$), so $p$ itself is even, say $p = 2r$. Then $4r^2 = 2q^2$, so $q^2 = 2r^2$ is even and, by the same argument, $q$ is even. Thus $p$ and $q$ are both even, contradicting our choice. Hence no such $x$ exists.
:::

Similar arguments show that $\sqrt3$, $\sqrt5$ and $\sqrt[3]{2}$ are irrational; in general $\sqrt{n}$ is irrational unless $n$ is a perfect square, a consequence of unique factorisation ([[number-theory/primes]]). The rationals are full of holes, even though they are crowded together: between any two rationals $a < b$ lies another, $(a+b)/2$, and hence infinitely many. "Dense" and "without gaps" are different properties, and analysis needs the second.

::: intuition What "no gaps" should mean
Imagine cutting the number line with a knife. In $\R$ the knife always hits a number: either the left piece has a largest element or the right piece has a smallest one. In $\Q$ we can cut at $\sqrt2$ — put every rational $x$ with $x < 0$ or $x^2 < 2$ on the left — and then the left piece has no largest element and the right piece no smallest. The completeness axiom below turns "the knife always hits a number" into a statement about upper bounds that we can use in proofs.
:::

## Ordered fields

Everything we do with real numbers in algebra follows from a short list of rules. It is worth writing them down once, because they are exactly what $\Q$ and $\R$ have in common.

::: definition Ordered field {#def-ordered-field}
A **field** is a set $F$ with two operations, addition and multiplication, such that for all $x, y, z \in F$:

1. $x + y = y + x$, $(x + y) + z = x + (y + z)$, there is an element $0$ with $x + 0 = x$, and every $x$ has a negative $-x$ with $x + (-x) = 0$;
2. $xy = yx$, $(xy)z = x(yz)$, there is an element $1 \neq 0$ with $1x = x$, and every $x \neq 0$ has an inverse $x^{-1} = 1/x$ with $x x^{-1} = 1$;
3. $x(y + z) = xy + xz$.

An **ordered field** is a field with a relation $<$ such that for all $x, y, z \in F$:

4. (trichotomy) exactly one of $x < y$, $x = y$, $y < x$ holds;
5. (transitivity) if $x < y$ and $y < z$ then $x < z$;
6. if $x < y$ then $x + z < y + z$;
7. if $x < y$ and $0 < z$ then $xz < yz$.
:::

We write $x \le y$ for "$x < y$ or $x = y$", and $y > x$ for $x < y$; $x$ is **positive** if $x > 0$. Both $\Q$ and $\R$ are ordered fields. The complex numbers form a field that cannot be ordered at all ([[#exr-1-5]]), and neither can any finite field.

Every familiar rule for manipulating inequalities can be derived from axioms 4–7. Here are the ones we use most; deriving them once shows how the axioms are used.

::: proposition Rules for inequalities {#prop-order}
In any ordered field:

1. $x > 0$ if and only if $-x < 0$;
2. if $x \neq 0$ then $x^2 > 0$; in particular $1 > 0$;
3. if $x < y$ and $z < 0$ then $xz > yz$;
4. if $0 < x < y$ then $0 < 1/y < 1/x$.
:::

::: proof
(1) If $x > 0$, adding $-x$ to both sides (axiom 6) gives $0 + (-x) < x + (-x)$, that is $-x < 0$. Conversely, if $-x < 0$, adding $x$ gives $0 < x$.

(2) If $x > 0$, axiom 7 with $z = x$ gives $x\cdot x > 0\cdot x = 0$. If $x < 0$, then $-x > 0$ by (1), and $x^2 = (-x)^2 > 0$ by the first case. Since $1 \neq 0$ and $1 = 1^2$, we get $1 > 0$.

(3) From $z < 0$ we get $-z > 0$ by (1), so axiom 7 gives $x(-z) < y(-z)$, that is $-xz < -yz$. Adding $xz + yz$ to both sides (axiom 6) gives $yz < xz$.

(4) First, $1/x > 0$: it is non-zero (since $x\cdot(1/x) = 1 \neq 0$), and if it were negative then axiom 7 with $z = x > 0$ would give $1 = (1/x)\,x < 0\cdot x = 0$, contradicting (2). Likewise $1/y > 0$, so $(1/x)(1/y) > 0$ by axiom 7. Multiplying $x < y$ by this positive number gives $1/y < 1/x$.
:::

The **absolute value** of $x$ is $\abs{x} = x$ if $x \ge 0$ and $\abs{x} = -x$ if $x < 0$. It satisfies $\abs{x} \ge 0$, $\abs{xy} = \abs{x}\,\abs{y}$ and $-\abs{x} \le x \le \abs{x}$, and for $a \ge 0$ the inequality $\abs{x} \le a$ is equivalent to $-a \le x \le a$. We think of $\abs{x - y}$ as the **distance** between $x$ and $y$; the next inequality says that a detour can never shorten a journey.

::: theorem Triangle inequality {#thm-triangle}
For all $x, y$ in an ordered field,

$$
\abs{x + y} \le \abs{x} + \abs{y} \qquad\text{and}\qquad \bigl\lvert \abs{x} - \abs{y} \bigr\rvert \le \abs{x - y}.
$$
:::

::: proof
Adding $-\abs{x} \le x \le \abs{x}$ and $-\abs{y} \le y \le \abs{y}$ gives $-(\abs{x} + \abs{y}) \le x + y \le \abs{x} + \abs{y}$, which is the first inequality. For the second, apply the first to $x = (x - y) + y$: $\abs{x} \le \abs{x - y} + \abs{y}$, so $\abs{x} - \abs{y} \le \abs{x - y}$. Exchanging $x$ and $y$ gives $\abs{y} - \abs{x} \le \abs{y - x} = \abs{x - y}$. The two together say $\bigl\lvert\abs{x} - \abs{y}\bigr\rvert \le \abs{x-y}$.
:::

In the form $\abs{a - c} \le \abs{a - b} + \abs{b - c}$ (put $x = a - b$, $y = b - c$) the triangle inequality is the single most used inequality in analysis. One more small principle is used constantly to prove that two numbers are equal.

::: lemma The ε-principle {#lem-eps-principle}
If $a \le b + \eps$ for every $\eps > 0$, then $a \le b$. Consequently, if $\abs{x - y} < \eps$ for every $\eps > 0$, then $x = y$.
:::

::: proof
Suppose instead that $a > b$, and take $\eps = (a - b)/2 > 0$ (note $2 = 1 + 1 > 0$). Then $b + \eps = (a + b)/2 < a$, because $a + b < 2a$ is equivalent to $b < a$. This contradicts the hypothesis. For the second statement, $\abs{x-y} \le 0 + \eps$ for all $\eps>0$ gives $\abs{x - y} \le 0$, so $x = y$.
:::

## Suprema and infima

A set of numbers can have a largest element, like $\set{1, 2, 3}$; it can fail to have one while still being trapped below some number, like the interval $(0, 1)$; or it can be unbounded, like $\N$. The concept that tames the middle case is the least upper bound.

::: definition Upper bounds, supremum and infimum {#def-sup}
Let $A$ be a subset of an ordered field.

- A number $M$ is an **upper bound** of $A$ if $a \le M$ for every $a \in A$; if $A$ has an upper bound it is **bounded above**.
- A number $s$ is a **supremum** or **least upper bound** of $A$ if (i) $s$ is an upper bound of $A$, and (ii) $s \le M$ for every upper bound $M$ of $A$. We write $s = \sup A$.
- **Lower bounds**, **bounded below** and the **infimum** or **greatest lower bound** $\inf A$ are defined in the same way with the inequalities reversed.

$A$ is **bounded** if it is bounded above and below. If $\sup A$ belongs to $A$ it is called the **maximum** $\max A$; similarly $\min A = \inf A$ when $\inf A \in A$.
:::

A set has at most one supremum: if $s$ and $s'$ both qualify, each is an upper bound and each is below every upper bound, so $s \le s'$ and $s' \le s$. The supremum need not belong to the set, and that is the whole point — it describes the "top edge" of a set that may have no top element. Condition (ii) is awkward to verify directly, because it speaks about all upper bounds at once; the following reformulation is what we use in practice.

::: lemma Approximation property {#lem-sup-approx}
Let $s$ be an upper bound of a set $A$. Then $s = \sup A$ if and only if for every $\eps > 0$ there is an element $a \in A$ with $a > s - \eps$.

Similarly, if $m$ is a lower bound of $A$, then $m = \inf A$ if and only if for every $\eps > 0$ there is an $a \in A$ with $a < m + \eps$.
:::

::: proof
Suppose $s = \sup A$ and let $\eps > 0$. Since $s - \eps < s$ and $s$ is the *least* upper bound, $s - \eps$ is not an upper bound of $A$; so some $a \in A$ satisfies $a > s - \eps$.

Conversely, suppose the condition holds, and let $M$ be any upper bound of $A$. If $M < s$, put $\eps = s - M > 0$; the condition gives $a \in A$ with $a > s - \eps = M$, contradicting that $M$ is an upper bound. Hence $M \ge s$ for every upper bound $M$, and $s = \sup A$. The statement for infima is proved in the same way with all inequalities reversed.
:::

In words: nothing in $A$ lies above $s$, but elements of $A$ come arbitrarily close to $s$ from below.

::: example An open interval {#ex-sup-interval}
Let $A = (0, 1) = \set{x : 0 < x < 1}$. Show that $\sup A = 1$, $\inf A = 0$, and that $A$ has neither a maximum nor a minimum.
::: solution
Every $a \in A$ satisfies $a < 1$, so $1$ is an upper bound. Let $\eps > 0$. If $\eps \ge 1$, the element $a = \tfrac12$ satisfies $a > 0 \ge 1 - \eps$. If $\eps < 1$, take $a = 1 - \eps/2$; then $0 < a < 1$, so $a \in A$, and $a > 1 - \eps$. By [[#lem-sup-approx]], $\sup A = 1$.

Since $1 \notin A$, the supremum is not a maximum. In fact no element $m \in A$ is largest: the midpoint $(m+1)/2$ also lies in $A$ and exceeds $m$. The argument for $\inf A = 0$ is the mirror image: $0$ is a lower bound, and for $0 < \eps < 1$ the element $\eps/2 \in A$ satisfies $\eps/2 < 0 + \eps$ (for $\eps \ge 1$ use $\tfrac12$).
:::
:::

::: example Suprema add {#ex-sup-sum}
Let $A$ and $B$ be non-empty sets with suprema, and let $A + B = \set{a + b : a \in A,\ b \in B}$. Prove that $\sup(A + B) = \sup A + \sup B$.
::: solution
Write $\alpha = \sup A$ and $\beta = \sup B$. For $a \in A$ and $b \in B$ we have $a \le \alpha$ and $b \le \beta$, so $a + b \le \alpha + \beta$: thus $\alpha + \beta$ is an upper bound of $A + B$.

Let $\eps > 0$. By [[#lem-sup-approx]] applied with $\eps/2$, there are $a \in A$ with $a > \alpha - \eps/2$ and $b \in B$ with $b > \beta - \eps/2$. Then $a + b \in A + B$ and

$$
a + b > (\alpha - \tfrac{\eps}{2}) + (\beta - \tfrac{\eps}{2}) = (\alpha + \beta) - \eps.
$$

By [[#lem-sup-approx]] again, $\sup(A + B) = \alpha + \beta$. Splitting $\eps$ into two halves, one for each set, is a pattern you will meet in almost every proof of the next chapter.
:::
:::

::: quiz
Let $A = \set{x \in \R : x^2 < 4}$. Which statement is true?
- [ ] $\sup A = 2$, and $2$ is the maximum of $A$
- [x] $\sup A = 2$, and $A$ has no maximum
- [ ] $\sup A = 4$
- [ ] $A$ is not bounded above
::: solution
$x^2 < 4$ means $-2 < x < 2$, so $A$ is the open interval $(-2, 2)$. Exactly as in [[#ex-sup-interval]], $2$ is an upper bound and points of $A$ come arbitrarily close to it, so $\sup A = 2$; but $2 \notin A$, so there is no maximum. The number $4$ is an upper bound, but not the *least* one.
:::
:::

## The completeness axiom

So far nothing distinguishes $\R$ from $\Q$. The distinction is a single axiom.

::: axiom Completeness {#ax-completeness}
Every non-empty subset of $\R$ that is bounded above has a supremum in $\R$.
:::

A **complete ordered field** is an ordered field in which every non-empty set that is bounded above has a supremum. We take as our starting point that **$\R$ is a complete ordered field**: it satisfies the axioms of [[#def-ordered-field]] together with [[#ax-completeness]]. Every theorem of this course is deduced from these axioms.

::: remark Does such a field exist, and is it unique?
Both questions have the answer one would hope for. A complete ordered field can be *constructed* from $\Q$. In Dedekind's construction a real number is a "cut": a non-empty set $L \subsetneq \Q$ with no largest element such that $q \in L$ and $p < q$ imply $p \in L$ (think of $L$ as the rationals to the left of the number). Cuts are added and multiplied in the natural way, $L \le L'$ means $L \subseteq L'$, and the supremum of a bounded family of cuts is simply their union — which is why completeness becomes easy to prove. Cantor's alternative construction uses Cauchy sequences of rationals. Moreover any two complete ordered fields are isomorphic by a unique bijection preserving addition, multiplication and order, so the axioms describe $\R$ completely. The final chapters of Spivak's *Calculus* carry out the construction by cuts and prove the uniqueness; chapter 5 of Tao's *Analysis I* builds $\R$ from Cauchy sequences.
:::

Completeness for suprema implies completeness for infima: we do not need a separate axiom.

::: corollary Infima exist {#cor-inf}
Every non-empty subset $A \subseteq \R$ that is bounded below has an infimum, and $\inf A = -\sup(-A)$, where $-A = \set{-a : a \in A}$.
:::

::: proof
If $m$ is a lower bound of $A$, then $-m$ is an upper bound of $-A$ (because $a \ge m$ implies $-a \le -m$), and $-A$ is non-empty. By [[#ax-completeness]], $s = \sup(-A)$ exists. For every $a \in A$ we have $-a \le s$, so $a \ge -s$: thus $-s$ is a lower bound of $A$. If $m$ is any lower bound of $A$, then $-m$ is an upper bound of $-A$, so $s \le -m$, that is $m \le -s$. Hence $-s$ is the greatest lower bound: $\inf A = -s$.
:::

Now we can fill the gap we found at the start. The proof is a model of how completeness is used: define a set, take its supremum, and show that the supremum does what we want by ruling out every alternative.

::: theorem Existence of √2 {#thm-sqrt2}
There is exactly one positive real number $s$ with $s^2 = 2$.
:::

::: proof
We use the fact that for positive numbers, $0 < x < y$ implies $x^2 < xy < y^2$.

Let $A = \set{x \in \R : x > 0 \text{ and } x^2 < 2}$. Then $1 \in A$, so $A \neq \varnothing$. Also $A$ is bounded above by $2$: if $x \ge 2$ then $x^2 \ge 4 > 2$, so $x \notin A$. By the completeness axiom $s = \sup A$ exists, and $s \ge 1 > 0$. We show that $s^2 < 2$ and $s^2 > 2$ are both impossible.

*Suppose $s^2 < 2$.* We find $h > 0$ with $(s + h)^2 < 2$. For $0 < h \le 1$ we have $h^2 \le h$, so

$$
(s + h)^2 = s^2 + 2sh + h^2 \le s^2 + h(2s + 1).
$$

Choose $h = \tfrac12\min\bigl(1, \tfrac{2 - s^2}{2s+1}\bigr)$. Then $0 < h \le 1$ and $h(2s+1) \le \tfrac12(2 - s^2) < 2 - s^2$, so $(s+h)^2 < 2$. Thus $s + h \in A$, although $s + h > s$ — contradicting that $s$ is an upper bound of $A$.

*Suppose $s^2 > 2$.* Put $h = \dfrac{s^2 - 2}{2s} > 0$. Then $h < \dfrac{s^2}{2s} = \dfrac{s}{2}$, so $s - h > 0$, and

$$
(s - h)^2 = s^2 - 2sh + h^2 > s^2 - 2sh = s^2 - (s^2 - 2) = 2.
$$

Now $s - h$ is an upper bound of $A$: if some $x \in A$ had $x > s - h > 0$, then $x^2 > (s-h)^2 > 2$, contradicting $x \in A$. But $s - h < s$, contradicting that $s$ is the *least* upper bound.

By trichotomy, $s^2 = 2$. For uniqueness, if $s, t > 0$ and $s^2 = t^2 = 2$, then $0 = s^2 - t^2 = (s - t)(s + t)$ with $s + t > 0$, so $s = t$.
:::

We write $\sqrt2$ for this number. The same method produces $\sqrt[n]{a}$ for every $a > 0$ and $n \in \N$ ([[#exr-1-10]]). Look back at the proof and notice that the two cases used nothing but the ordered-field axioms; completeness entered only once, to guarantee that $s$ exists. That observation proves that $\Q$ is not complete.

::: example The rationals are not complete {#ex-q-incomplete}
Let $B = \set{x \in \Q : x > 0 \text{ and } x^2 < 2}$. Show that $B$ is a non-empty subset of $\Q$, bounded above in $\Q$, that has no supremum in $\Q$.
::: solution
$1 \in B$, and $2$ is a rational upper bound, as before. Suppose $r \in \Q$ were the least upper bound of $B$ among rationals. Run the proof of [[#thm-sqrt2]] with $r$ in place of $s$. If $r^2 < 2$, the number $h = \tfrac12\min\bigl(1, \tfrac{2-r^2}{2r+1}\bigr)$ is *rational*, so $r + h$ is a rational element of $B$ larger than $r$ — impossible. If $r^2 > 2$, then $h = (r^2 - 2)/(2r)$ is rational, and $r - h$ is a *rational* upper bound of $B$ smaller than $r$ — impossible. So $r^2 = 2$, which contradicts [[#thm-sqrt2-irrational]]. Hence $B$ has no supremum in $\Q$. (In $\R$, of course, $\sup B = \sqrt2$: see the quiz below.)
:::
:::

::: warning Bounded sets need not contain their supremum
The completeness axiom promises that $\sup A$ *exists*, not that it belongs to $A$. Do not write "let $a = \sup A$, an element of $A$" — for $A = (0, 1)$ that is false. When you need an element of $A$ near the supremum, use [[#lem-sup-approx]]: for each $\eps > 0$ there is $a \in A$ with $\sup A - \eps < a \le \sup A$. Also, the axiom needs both hypotheses: the empty set has no supremum (every real number is an upper bound of $\varnothing$, and there is no least one), and $\N$ has none because it is not bounded above.
:::

## The Archimedean property and density

Our next consequence sounds too obvious to need proof: the natural numbers are not bounded above. But it does need proof, and the proof needs completeness — there are ordered fields in which it fails (see the remark below).

::: theorem Archimedean property {#thm-archimedean}
$\N$ is not bounded above in $\R$. Equivalently:

1. for every $x \in \R$ there is $n \in \N$ with $n > x$;
2. for every $\eps > 0$ there is $n \in \N$ with $1/n < \eps$.
:::

::: proof
Suppose that $\N$ were bounded above. Since $\N$ is non-empty, the completeness axiom gives $s = \sup\N$. The number $s - 1$ is smaller than $s$, so it is not an upper bound of $\N$: there is $n \in \N$ with $n > s - 1$. But then $n + 1 \in \N$ and $n + 1 > s$, contradicting that $s$ is an upper bound. So $\N$ is unbounded, which is statement 1.

For statement 2, let $\eps > 0$ and apply statement 1 to $x = 1/\eps$: there is $n \in \N$ with $n > 1/\eps > 0$, and by [[#prop-order]](4) this gives $1/n < \eps$.
:::

::: remark Non-Archimedean fields
The Archimedean property is not a consequence of the ordered-field axioms alone. Consider the field $\R(t)$ of rational functions $p(t)/q(t)$, and call such a function positive when the leading coefficients of $p$ and $q$ have the same sign. This makes $\R(t)$ an ordered field in which $t - n$ is positive for every $n \in \N$: the element $t$ is "infinitely large" and $1/t$ is a positive "infinitesimal" smaller than every $1/n$. By [[#thm-archimedean]], such a field cannot be complete.
:::

The Archimedean property is what lets us conclude "$\abs{x} < 1/n$ for every $n$, so $x = 0$" — a step that combines it with [[#lem-eps-principle]] and that we will take for granted from now on. It also gives the exact value of many suprema and infima.

::: example A set with a maximum but no minimum {#ex-sup-alternating}
Let $A = \set{(-1)^n + \tfrac1n : n \in \N}$. Find $\sup A$ and $\inf A$, and decide whether they are attained.
::: solution
The first few elements are $0, \tfrac32, -\tfrac23, \tfrac54, -\tfrac45, \tfrac76, \dots$ For even $n$ the element is $1 + \tfrac1n \le 1 + \tfrac12 = \tfrac32$, with equality at $n = 2$; for odd $n$ it is $-1 + \tfrac1n \le 0$. So $\tfrac32$ is an upper bound that belongs to $A$: $\sup A = \max A = \tfrac32$.

Every element exceeds $-1$: odd-indexed ones are $-1 + \tfrac1n > -1$ and even-indexed ones exceed $1$. So $-1$ is a lower bound. Given $\eps > 0$, the Archimedean property gives $m \in \N$ with $1/m < \eps$; then $n = 2m + 1$ is odd and $-1 + \tfrac1n < -1 + \tfrac1m < -1 + \eps$. By [[#lem-sup-approx]], $\inf A = -1$. It is not attained, since every element is strictly greater than $-1$.
:::
:::

::: widget sequence
a: 1 - 1/n
N: 40
limit: 1
epsilon: 0.08
y: 0, 1.1
caption: The set $\set{1 - 1/n : n \in \N}$ has supremum $1$, which it never reaches. Drag $\eps$ smaller: however thin the band below $1$, some points of the set enter it — this is the approximation property [[#lem-sup-approx]]. The first index that enters is the first $n$ with $1/n < \eps$, and the Archimedean property is exactly the guarantee that such an $n$ exists.
:::

::: example Why 0.999… equals 1 {#ex-decimal}
What does the infinite decimal $0.999\ldots$ mean, and why does it equal $1$?
::: solution
An infinite decimal $0.d_1 d_2 d_3 \ldots$ is *defined* as the supremum of its finite truncations $0.d_1\ldots d_n$; this set is bounded above by $1$, so the supremum exists by completeness. For $0.999\ldots$ the truncations are $t_n = 1 - 10^{-n}$, so we must show $\sup\set{1 - 10^{-n} : n \in \N} = 1$.

Clearly $1$ is an upper bound. Let $\eps > 0$. By the Archimedean property there is $n$ with $1/n < \eps$, and $10^n \ge n$ (by induction: $10^{n+1} = 10\cdot 10^n \ge 10n \ge n + 1$), so $10^{-n} \le 1/n < \eps$ and $t_n > 1 - \eps$. By [[#lem-sup-approx]] the supremum is $1$. So $0.999\ldots$ and $1$ are two names for the same real number — not an approximation, an identity.
:::
:::

Between any two real numbers, however close, there is a rational number. This is what lets us approximate real numbers by fractions (and computers approximate them by finite binary fractions).

::: theorem Density of the rationals {#thm-q-dense}
If $a, b \in \R$ and $a < b$, there is a rational number $q$ with $a < q < b$.
:::

::: proof
By the Archimedean property choose $n \in \N$ with $1/n < b - a$. We look for an integer $m$ with $a < m/n < b$, that is $na < m < nb$; since $nb - na > 1$, the interval $(na, nb)$ is longer than $1$ and should contain an integer.

Let $S = \set{k \in \Z : k > na}$. By the Archimedean property $S$ is non-empty, and it is bounded below: choosing $j \in \N$ with $j > -na$, every $k \in S$ satisfies $k > na > -j$. A non-empty set of integers that is bounded below has a least element (this is the well-ordering principle, equivalent to induction: see [[proofs/induction]]). Let $m$ be the least element of $S$. Then $m > na$, while $m - 1 \notin S$ gives $m - 1 \le na$. Hence

$$
na < m \le na + 1 < na + n(b - a) = nb,
$$

and dividing by $n$ gives $a < m/n < b$. Take $q = m/n$.
:::

The irrational numbers are dense too: between any two reals there is an irrational one ([[#exr-1-7]]). So both $\Q$ and $\R \setminus \Q$ are scattered through every interval, however short — a fact that produces some remarkable functions in [[real-analysis/continuity]].

::: quiz
Let $B = \set{x \in \Q : x > 0,\ x^2 < 2}$, the set from [[#ex-q-incomplete]], now regarded as a subset of $\R$. What is $\sup B$?
- [x] $\sqrt2$
- [ ] It does not exist, because $\sqrt2$ is not rational
- [ ] $1.4142$
- [ ] $2$
::: solution
$\sqrt2$ is an upper bound: if $x > 0$ and $x \ge \sqrt2$ then $x^2 \ge 2$. Given $\eps > 0$ (we may assume $\eps < \sqrt2$), [[#thm-q-dense]] gives a rational $q$ with $\sqrt2 - \eps < q < \sqrt2$; then $q > 0$ and $q^2 < 2$, so $q \in B$. By [[#lem-sup-approx]], $\sup B = \sqrt2$. The supremum exists in $\R$ even though it is not in $\Q$ — that is precisely the gap that completeness fills.
:::
:::

## Nested intervals and uncountability

Completeness has a useful geometric form: a shrinking sequence of closed intervals always traps at least one point.

::: theorem Nested interval property {#thm-nested-intervals}
For each $n \in \N$ let $I_n = [a_n, b_n]$ be a closed bounded interval ($a_n \le b_n$), and suppose $I_1 \supseteq I_2 \supseteq I_3 \supseteq \cdots$. Then $\bigcap_{n=1}^\infty I_n \neq \varnothing$. If, in addition, for every $\eps > 0$ some interval has length $b_n - a_n < \eps$, then the intersection consists of exactly one point.
:::

::: proof
Nesting means $a_1 \le a_2 \le a_3 \le \cdots$ and $b_1 \ge b_2 \ge b_3 \ge \cdots$, with $a_n \le b_n$ for each $n$. First, every left end-point lies below every right end-point: if $m \le n$ then $a_m \le a_n \le b_n$, and if $m > n$ then $a_m \le b_m \le b_n$. So the set $A = \set{a_m : m \in \N}$ is non-empty and every $b_n$ is an upper bound for it. Let $x = \sup A$, which exists by completeness. Then $a_n \le x$ for all $n$ because $x$ is an upper bound of $A$, and $x \le b_n$ for all $n$ because $x$ is the *least* upper bound and each $b_n$ is an upper bound. Hence $x \in I_n$ for every $n$.

If $x$ and $y$ both lie in every $I_n$, then $\abs{x - y} \le b_n - a_n$ for every $n$. Under the extra hypothesis, for each $\eps > 0$ we can choose $n$ with $b_n - a_n < \eps$, so $\abs{x - y} < \eps$ for every $\eps > 0$, and $x = y$ by [[#lem-eps-principle]].
:::

::: warning Both "closed" and "bounded" matter
The open intervals $(0, \tfrac1n)$ are nested, but no real number lies in all of them: a common point $x$ would satisfy $0 < x < 1/n$ for every $n$, contradicting the Archimedean property. The closed but unbounded intervals $[n, \infty)$ are nested and also have empty intersection. And in $\Q$ the theorem fails even for closed bounded intervals: the rational intervals produced by bisecting towards $\sqrt2$ have no rational point in common.
:::

The bisection method for solving equations is the nested interval property in action. Start with an interval $[a_1, b_1]$ on which $f(x) = x^2 - 2$ changes sign; at each step test the midpoint and keep the half on which the sign still changes.

::: widget newton
f: x^2 - 2
method: bisection
x0: 1
x1: 2
steps: 8
x: 0.8, 2.2
caption: Bisection for $x^2 - 2$ on $[1, 2]$. Step through the iterations: each interval is half of the previous one and still contains a sign change, so the intervals are nested with lengths $2^{-n}$. [[#thm-nested-intervals]] says they close down on exactly one real number — $\sqrt2$. Run the same procedure inside $\Q$ and the intervals close down on nothing.
:::

::: application Bisection on a computer
The nested interval property is the theoretical guarantee behind the bisection method of [[numerical-analysis/root-finding]]. Each step halves the interval, so it gains one binary digit of accuracy: starting from $[1, 2]$, after $50$ steps the interval has length $2^{-50} \approx 8.9\times10^{-16}$, which is about the precision of double-precision arithmetic. The method is slow compared with Newton's method, but it cannot fail once a sign change has been found — a robustness that ultimately comes from the completeness of $\R$ together with the intermediate value theorem of [[real-analysis/continuity]].
:::

Our last theorem shows that completeness makes $\R$ enormously larger than $\Q$. Recall from [[proofs/cardinality]] that a set is **countable** if its elements can be listed as a finite or infinite sequence $x_1, x_2, x_3, \dots$, and that $\Q$ is countable.

::: theorem The real numbers are uncountable {#thm-r-uncountable}
For every sequence $x_1, x_2, x_3, \dots$ of real numbers there is a real number $x$ that is different from every $x_n$. Hence $\R$ is not countable.
:::

::: proof
We construct closed bounded intervals $I_1 \supseteq I_2 \supseteq \cdots$, each of positive length, such that $x_n \notin I_n$.

Let $I_1 = [x_1 + 1, x_1 + 2]$, which does not contain $x_1$. Suppose $I_n = [a_n, b_n]$ with $a_n < b_n$ has been chosen, and put $\ell = b_n - a_n > 0$. The closed thirds

$$
J = \bigl[a_n,\ a_n + \tfrac{\ell}{3}\bigr] \qquad\text{and}\qquad K = \bigl[a_n + \tfrac{2\ell}{3},\ b_n\bigr]
$$

are disjoint, so $x_{n+1}$ lies in at most one of them. Let $I_{n+1}$ be one of $J$, $K$ that does not contain $x_{n+1}$. Then $I_{n+1} \subseteq I_n$, it has positive length $\ell/3$, and $x_{n+1} \notin I_{n+1}$.

By [[#thm-nested-intervals]] there is a real number $x$ in every $I_n$. For each $n$, $x \in I_n$ while $x_n \notin I_n$, so $x \neq x_n$. Thus the sequence $(x_n)$ misses $x$, and no sequence can list all real numbers.
:::

Cantor's other proof of [[#thm-r-uncountable]], the **diagonal argument** (1891), works with digits instead of intervals. Given any list $x_1, x_2, x_3, \dots$ of numbers in $(0,1)$, write $x_n = 0.d_{n1}d_{n2}d_{n3}\ldots$ in decimal and put $x = 0.e_1e_2e_3\ldots$, where $e_n = 4$ if $d_{nn} = 5$ and $e_n = 5$ otherwise. Then $x \in (0,1)$, and its $n$-th digit differs from that of $x_n$. Only an expansion ending in endless $0$s or endless $9$s has a twin (such as $0.1000\ldots = 0.0999\ldots$), so the expansion of $x$, made of $4$s and $5$s, is its only one, and $x \neq x_n$ for every $n$. So not even $(0,1)$ can be listed; decimal expansions are treated in detail in [[proofs/cardinality]].

::: widget cantor
mode: diagonal
size: 8
caption: The diagonal argument for infinite sequences of $0$s and $1$s. Row $s_n$ is the $n$-th sequence on a list; the new sequence $d$ flips the $n$-th digit of $s_n$, so it differs from every $s_n$ in at least one place and is on nobody's list. Click digits to change the list, draw a new list, or add $d$ to it: the new diagonal always escapes. The argument above does the same with decimal digits, using only $4$ and $5$ to avoid double expansions.
:::

Since $\Q$ is countable and $\R$ is not, the irrational numbers are uncountable: in the sense of cardinality, almost every real number is irrational. In [[measure-theory/lebesgue-measure]] the same conclusion appears in the language of length: $\Q$ can be covered by intervals of total length as small as we like.

::: quiz
Which of the following statements holds in *every* ordered field, and would therefore be true even in a field without the completeness axiom?
- [ ] For every $\eps > 0$ there is $n \in \N$ with $1/n < \eps$.
- [x] Between any two distinct elements there is a third.
- [ ] Every non-empty set that is bounded above has a supremum.
- [ ] Every positive element has a square root.
::: solution
If $a < b$ then $a < (a+b)/2 < b$ in any ordered field — this uses only the axioms of [[#def-ordered-field]]. The other three fail in some ordered field: the Archimedean property fails in $\R(t)$ (where $1/t$ is smaller than every $1/n$), completeness and square roots both fail in $\Q$ ($2$ has no square root there).
:::
:::

::: history
That the diagonal of a square is incommensurable with its side — that $\sqrt2$ is not a ratio of whole numbers — was discovered in Greece in the fifth century BC and is traditionally credited to the Pythagoreans. Eudoxus of Cnidus answered the crisis with a theory of proportion, preserved in Book V of Euclid's *Elements* (around 300 BC), that compares two magnitudes by comparing all their rational multiples. Mathematicians then used real numbers for two thousand years without defining them. In autumn 1858, while teaching calculus at the Polytechnic in Zurich, Richard Dedekind was dissatisfied with appeals to geometric intuition in proving that a bounded increasing quantity has a limit; his answer, the construction of real numbers by cuts, was published in *Stetigkeit und irrationale Zahlen* (1872). In the same year Georg Cantor, independently of Charles Méray (1869), built the reals from Cauchy sequences of rationals. Cantor proved that $\R$ is uncountable in 1874, by an argument close to the nested-interval proof above, and gave the diagonal argument in 1891. In 1900 David Hilbert proposed describing the real numbers axiomatically, as an ordered field with a completeness axiom — the point of view of this chapter.
:::

## Where this leads

Completeness is the engine of the whole course. In [[real-analysis/sequences]] it becomes the monotone convergence theorem ([[real-analysis/sequences#thm-monotone]]) — a bounded increasing sequence converges to its supremum — and then the Bolzano–Weierstrass theorem and the Cauchy criterion, which are equivalent forms of the same axiom. In [[real-analysis/continuity]] it yields the intermediate value and extreme value theorems, settling the example that opened this chapter, and in [[real-analysis/riemann-integral]] it guarantees that upper and lower integrals exist. In [[real-analysis/metric-spaces]] completeness is generalised from $\R$ to spaces of points, sequences and functions, and the countable–uncountable distinction returns in [[measure-theory/lebesgue-measure]], where countable sets turn out to have length zero.

::: summary
- $\Q$ has gaps: no rational squares to $2$ ([[#thm-sqrt2-irrational]]), so the intermediate value theorem fails over $\Q$.
- $\R$ is a **complete ordered field**: the field and order axioms of [[#def-ordered-field]] plus the completeness axiom — every non-empty set bounded above has a least upper bound.
- $s = \sup A$ means: $s$ is an upper bound, and for every $\eps > 0$ some $a \in A$ exceeds $s - \eps$ ([[#lem-sup-approx]]). The supremum need not belong to $A$.
- Typical use of completeness: define a set, take its supremum, rule out the alternatives — as in the existence of $\sqrt2$ ([[#thm-sqrt2]]).
- The Archimedean property ($\N$ is unbounded; $1/n < \eps$ for some $n$) follows from completeness and gives the density of $\Q$ ([[#thm-q-dense]]).
- Nested closed bounded intervals have a common point ([[#thm-nested-intervals]]); this underlies bisection and proves that $\R$ is uncountable ([[#thm-r-uncountable]]).
- The ε-principle: if $\abs{x - y} < \eps$ for every $\eps > 0$ then $x = y$ ([[#lem-eps-principle]]).
:::

## Exercises

::: exercise A supremum that is not attained {level=1 check="1"}
Find $\sup\set{\dfrac{n}{n+1} : n \in \N}$, prove your answer, and decide whether the set has a maximum and a minimum.
::: solution
Since $\dfrac{n}{n+1} = 1 - \dfrac{1}{n+1} < 1$, the number $1$ is an upper bound. Given $\eps > 0$, the Archimedean property gives $n$ with $\tfrac1n < \eps$; then $\tfrac{1}{n+1} < \tfrac1n < \eps$, so $\tfrac{n}{n+1} > 1 - \eps$. By [[#lem-sup-approx]] the supremum is $1$. It is not a maximum, because every element is strictly less than $1$. The elements increase with $n$, so the minimum is the first one, $\tfrac12$, and $\inf = \min = \tfrac12$.
:::
:::

::: exercise The supremum of a solution set {level=1 check="2"}
Let $A = \set{x \in \R : x^2 - 3x + 2 < 0}$. Find $\sup A$.
::: solution
$x^2 - 3x + 2 = (x - 1)(x - 2)$ is negative exactly when one factor is positive and the other negative, that is when $1 < x < 2$. So $A = (1, 2)$. As in [[#ex-sup-interval]], $2$ is an upper bound, and for $0 < \eps < 1$ the element $2 - \eps/2 \in A$ exceeds $2 - \eps$ (for $\eps \ge 1$ use $\tfrac32$). Hence $\sup A = 2$, not attained.
:::
:::

::: exercise A minimum {level=1 check="2"}
Find $\inf\set{x + \dfrac1x : x > 0}$ and show that it is a minimum.
::: solution
For $x > 0$,

$$
x + \frac1x - 2 = \frac{x^2 - 2x + 1}{x} = \frac{(x-1)^2}{x} \ge 0,
$$

so $2$ is a lower bound. It is attained at $x = 1$, where $1 + \tfrac11 = 2$. A lower bound that belongs to the set is its minimum, so the infimum is $2$.
:::
:::

::: exercise Maximum via absolute value {level=1}
Prove that $\max(x, y) = \dfrac{x + y + \abs{x - y}}{2}$ and $\min(x, y) = \dfrac{x + y - \abs{x - y}}{2}$ for all real $x, y$.
::: solution
If $x \ge y$ then $\abs{x - y} = x - y$, so $\tfrac12(x + y + \abs{x-y}) = \tfrac12(2x) = x = \max(x, y)$ and $\tfrac12(x + y - \abs{x - y}) = y = \min(x,y)$. If $x < y$ then $\abs{x - y} = y - x$, and the same formulas give $y$ and $x$ respectively.
:::
:::

::: exercise Fields that cannot be ordered {level=2}
(a) Show that in an ordered field, $1 + 1 + \cdots + 1 \neq 0$ for any number of terms. Deduce that a finite field cannot be ordered.
(b) Show that the field $\C$ of complex numbers cannot be made into an ordered field.
::: hint
Use [[#prop-order]]: $1 > 0$, and squares of non-zero elements are positive.
:::
::: solution
(a) By [[#prop-order]], $1 > 0$. If $s_k = 1 + \cdots + 1$ ($k$ terms) is positive, then $s_{k+1} = s_k + 1 > s_k > 0$ by axiom 6 and transitivity. By induction every $s_k > 0$, so $s_k \neq 0$. In a finite field the elements $s_1, s_2, s_3, \dots$ cannot all be distinct, so $s_j = s_k$ for some $j < k$, and then $s_{k-j} = s_k - s_j = 0$, which is impossible in an ordered field.

(b) Suppose $\C$ had an order satisfying axioms 4–7. Since $i \neq 0$, [[#prop-order]](2) gives $i^2 > 0$, that is $-1 > 0$. But $1 > 0$ as well, and by [[#prop-order]](1) $-1 > 0$ forces $1 < 0$. By trichotomy $1 < 0$ and $1 > 0$ cannot both hold — a contradiction.
:::
:::

::: exercise Scaling a set {level=2}
Let $A \subseteq \R$ be non-empty and bounded, and $cA = \set{ca : a \in A}$. Prove that $\sup(cA) = c\sup A$ if $c > 0$, and $\sup(cA) = c\inf A$ if $c < 0$.
::: solution
Let $c > 0$ and $s = \sup A$. For $a \in A$, $a \le s$ gives $ca \le cs$, so $cs$ is an upper bound of $cA$. Given $\eps > 0$, choose $a \in A$ with $a > s - \eps/c$ ([[#lem-sup-approx]]); then $ca > cs - \eps$. Hence $\sup(cA) = cs$.

Let $c < 0$ and $m = \inf A$. For $a \in A$, $a \ge m$ gives $ca \le cm$ ([[#prop-order]](3)), so $cm$ is an upper bound of $cA$. Given $\eps > 0$, choose $a \in A$ with $a < m + \eps/\abs{c}$ (the infimum version of [[#lem-sup-approx]]); multiplying by $c = -\abs{c}$ gives $ca > cm - \eps$. Hence $\sup(cA) = cm = c\inf A$.
:::
:::

::: exercise Irrationals are dense {level=2}
Prove that between any two real numbers $a < b$ there is an irrational number.
::: hint
Apply [[#thm-q-dense]] to the interval $(a - \sqrt2, b - \sqrt2)$.
:::
::: solution
Since $a - \sqrt2 < b - \sqrt2$, [[#thm-q-dense]] gives a rational $q$ with $a - \sqrt2 < q < b - \sqrt2$. Then $x = q + \sqrt2$ satisfies $a < x < b$. If $x$ were rational, $\sqrt2 = x - q$ would be rational (a difference of rationals), contradicting [[#thm-sqrt2-irrational]]. So $x$ is irrational.
:::
:::

::: exercise Supremum versus infimum {level=2}
Let $A \subseteq \R$ be non-empty and bounded. Prove that $\inf A \le \sup A$, with equality if and only if $A$ has exactly one element.
::: solution
Pick any $a \in A$ (possible since $A \neq \varnothing$). Then $\inf A \le a \le \sup A$. If $A = \set{a}$, then $a$ is both the largest and the smallest element, so $\inf A = \sup A = a$. Conversely, suppose $\inf A = \sup A = c$. For every $a \in A$ we have $c \le a \le c$, so $a = c$; thus $A = \set{c}$.
:::
:::

::: exercise Elements crowd towards the supremum {level=2}
Let $A$ be non-empty and bounded above, with $s = \sup A \notin A$. Prove that for every $\eps > 0$ the interval $(s - \eps, s)$ contains infinitely many elements of $A$.
::: solution
Suppose that for some $\eps > 0$ the interval $(s - \eps, s)$ contains only finitely many elements of $A$. It contains at least one, by [[#lem-sup-approx]]; let $a^*$ be the largest of these finitely many elements. Since $s \notin A$, every element of $A$ is $< s$, so $a^* < s$. Put $\eps' = s - a^* > 0$. By [[#lem-sup-approx]] there is $a \in A$ with $a > s - \eps'= a^*$. Then $a^* < a < s$ and $a > s - \eps$, so $a$ is an element of $A$ in $(s - \eps, s)$ larger than $a^*$, contradicting the choice of $a^*$.
:::
:::

::: exercise n-th roots {level=3}
Let $a > 0$ and $n \in \N$. Prove that there is exactly one $x > 0$ with $x^n = a$.
::: hint
Let $A = \set{x > 0 : x^n < a}$ and $s = \sup A$. For $0 < h \le 1$ the binomial theorem gives $(s+h)^n - s^n \le hK$ with $K = (s+1)^n - s^n$, and for $0 < t < s$ the factorisation $s^n - t^n = (s - t)(s^{n-1} + s^{n-2}t + \cdots + t^{n-1})$ gives $s^n - t^n \le (s - t)\,n s^{n-1}$.
:::
::: solution
For $0 < x < y$ we have $x^n < y^n$ (multiply the inequalities $x < y$ together $n$ times), which gives uniqueness and will be used below. Let $A = \set{x > 0 : x^n < a}$.

*$A$ is non-empty and bounded above.* The number $t = a/(1 + a)$ satisfies $0 < t < 1$ and $t < a$, so $t^n \le t < a$ and $t \in A$. If $x \ge 1 + a$ then $x \ge 1$, so $x^n \ge x \ge 1 + a > a$ and $x \notin A$; hence $1 + a$ is an upper bound. Let $s = \sup A > 0$.

*The hint's inequalities.* For $0 < h \le 1$, $(s + h)^n - s^n = \sum_{k=1}^n \binom{n}{k} s^{n-k}h^k \le h\sum_{k=1}^n \binom nk s^{n-k} = hK$, where $K = (s+1)^n - s^n > 0$, because $h^k \le h$. For $0 < t < s$ each of the $n$ terms of $s^{n-1} + s^{n-2}t + \cdots + t^{n-1}$ is at most $s^{n-1}$.

*$s^n < a$ is impossible.* Let $h = \min\bigl(1, \tfrac{a - s^n}{2K}\bigr) > 0$. Then $(s + h)^n \le s^n + hK \le s^n + \tfrac12(a - s^n) < a$, so $s + h \in A$, contradicting that $s$ is an upper bound.

*$s^n > a$ is impossible.* Let $h = \min\bigl(\tfrac s2, \tfrac{s^n - a}{2ns^{n-1}}\bigr) > 0$ and $t = s - h \in (0, s)$. Then $t^n \ge s^n - h\,n s^{n-1} \ge s^n - \tfrac12(s^n - a) > a$. If some $x \in A$ had $x > t$, then $x^n > t^n > a$, which is impossible; so $t$ is an upper bound of $A$ smaller than $s$, a contradiction.

Hence $s^n = a$, and $s$ is the unique positive $n$-th root of $a$.
:::
:::

::: exercise Nested intervals imply completeness {level=3}
Let $F$ be an ordered field with the Archimedean property in which the nested interval property ([[#thm-nested-intervals]], including the uniqueness part) holds. Prove that every non-empty subset of $F$ that is bounded above has a supremum. (So, for Archimedean ordered fields, the nested interval property is equivalent to completeness.)
::: hint
Bisect: start with $[a_1, b_1]$ where $a_1$ is not an upper bound and $b_1$ is. Keep the half whose left end is not an upper bound and whose right end is.
:::
::: solution
Let $A \subseteq F$ be non-empty with an upper bound $b_1$. Pick $a \in A$ and put $a_1 = a - 1$, which is not an upper bound (since $a > a_1$). Given $[a_n, b_n]$ with $a_n$ not an upper bound of $A$ and $b_n$ an upper bound, let $c = (a_n + b_n)/2$. If $c$ is an upper bound, set $[a_{n+1}, b_{n+1}] = [a_n, c]$; otherwise set $[a_{n+1}, b_{n+1}] = [c, b_n]$. The intervals are nested, the invariant is preserved, and $b_n - a_n = (b_1 - a_1)/2^{n-1}$.

These lengths can be made smaller than any $\eps > 0$: by the Archimedean property choose $n$ with $n > (b_1 - a_1)/\eps$, and use $2^{n-1} \ge n$. By the nested interval property there is exactly one $s$ in every $[a_n, b_n]$. We show $s = \sup A$.

*$s$ is an upper bound.* If some $x \in A$ had $x > s$, choose $n$ with $b_n - a_n < x - s$; then $b_n \le a_n + (b_n - a_n) < s + (x - s) = x$ (using $a_n \le s$), so $b_n$ is not an upper bound — contradiction.

*Approximation.* Given $\eps > 0$, choose $n$ with $b_n - a_n < \eps$. Since $a_n$ is not an upper bound, there is $x \in A$ with $x > a_n \ge b_n - \eps \ge s - \eps$. By [[#lem-sup-approx]] (whose proof uses only the ordered-field axioms), $s = \sup A$.
:::
:::

::: exercise Dyadic rationals are dense {level=3}
A **dyadic rational** is a number of the form $m/2^k$ with $m \in \Z$ and $k \in \N$. Prove that between any two real numbers $a < b$ there is a dyadic rational, and deduce that every real number is the supremum of the dyadic rationals below it.
::: solution
By the Archimedean property choose $k \in \N$ with $1/k < b - a$; since $2^k \ge k$, also $1/2^k < b - a$. Now repeat the proof of [[#thm-q-dense]] with $n = 2^k$: the least integer $m$ with $m > 2^k a$ satisfies $2^k a < m \le 2^k a + 1 < 2^k b$, so $a < m/2^k < b$.

For the second part, let $x \in \R$ and $D_x = \set{d \text{ dyadic} : d < x}$. It is non-empty (apply the first part to $(x - 1, x)$) and bounded above by $x$. Given $\eps > 0$, the first part gives a dyadic $d$ with $x - \eps < d < x$, so $d \in D_x$ and $d > x - \eps$. By [[#lem-sup-approx]], $\sup D_x = x$. (This is how a computer's binary fractions can approximate every real number.)
:::
:::
