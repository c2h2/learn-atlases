Twenty-three people are in a room. Is it more likely than not that two of them share a birthday? Most people's instinct says no: there are 365 possible birthdays and only 23 people. The instinct is wrong. The probability of a shared birthday is about $0.507$, and with 50 people it is about $0.970$. Questions like this, where intuition is unreliable but careful reasoning gives a definite answer, are what probability theory is for.

To reason carefully about chance we need a precise language. What exactly is an "event"? What does it mean to give it a probability, and which rules must those numbers obey? This chapter answers these questions with the framework that Andrey Kolmogorov introduced in 1933 and on which all of modern probability rests. A **probability space** has three ingredients: a set of possible outcomes, a collection of events, and a rule that assigns each event a probability. From three short axioms we derive the familiar rules for complements and unions, the inclusion–exclusion formula and the continuity of probability, and then put them to work on problems with equally likely outcomes, the birthday problem among them.

## Outcomes and events {#outcomes-events}

A **random experiment** is any procedure whose result is not determined in advance: tossing a coin, rolling two dice, measuring the lifetime of a light bulb, asking a randomly chosen voter how they will vote. We do not try to predict the result. Instead we list everything that *could* happen.

::: definition Sample space and events {#def-sample-space}
The **sample space** of an experiment is a set $\Omega$ whose elements, called **outcomes**, describe the possible results, in such a way that each performance of the experiment produces exactly one outcome $\omega \in \Omega$. An **event** is a subset $A \subseteq \Omega$. We say that the event $A$ **occurs** if the outcome $\omega$ lies in $A$.
:::

Some examples, in increasing order of size:

- Tossing a coin once: $\Omega = \{H, T\}$.
- Rolling a red die and a blue die: $\Omega = \{(i, j) : 1 \le i, j \le 6\}$, with $36$ outcomes. The event "the total is $7$" is $\{(1,6),\allowbreak (2,5),\allowbreak (3,4),\allowbreak (4,3),\allowbreak (5,2),\allowbreak (6,1)\}$.
- Tossing a coin until the first head appears and recording the number of tosses: $\Omega = \{1, 2, 3, \ldots\}$, a countably infinite set.
- Measuring the lifetime of a light bulb in hours: $\Omega = [0, \infty)$, an uncountable set.

Choosing $\Omega$ is part of the modelling. For the two dice we could have taken $\Omega = \{2, 3, \ldots, 12\}$, the possible totals, but this coarser description loses information (we can no longer ask whether the red die shows a six) and, as we shall see, its outcomes are not equally likely. A good sample space records enough detail to decide every event we care about.

Because events are sets, the operations of set theory ([[proofs/sets]]) become logical operations on events:

| set notation | meaning for events |
|---|---|
| $\Omega$ | the certain event |
| $\varnothing$ | the impossible event |
| $A^c = \Omega \setminus A$ | $A$ does not occur |
| $A \cup B$ | $A$ or $B$ (or both) occurs |
| $A \cap B$ | $A$ and $B$ both occur |
| $A \setminus B = A \cap B^c$ | $A$ occurs but $B$ does not |
| $A \subseteq B$ | whenever $A$ occurs, $B$ occurs |
| $A \cap B = \varnothing$ | $A$ and $B$ are **mutually exclusive** (disjoint) |

The same applies to infinitely many events: $\bigcup_n A_n$ is the event that at least one $A_n$ occurs, and $\bigcap_n A_n$ the event that all of them occur. De Morgan's laws, $\bigl(\bigcup_n A_n\bigr)^c = \bigcap_n A_n^c$ and $\bigl(\bigcap_n A_n\bigr)^c = \bigcup_n A_n^c$, say that "not at least one" means "none", and "not all" means "at least one fails". They are used constantly, because the complement of a complicated event is often much simpler.

::: widget venn
sets: 2
expr: (A | B)'
caption: The shaded region is $(A \cup B)^c$, the event "neither $A$ nor $B$". Type `A' & B'` and the same region is shaded: this is De Morgan's law. Then try `(A - B) | (B - A)`, the event that exactly one of $A$ and $B$ occurs. You can also click regions to shade them, and the figure finds a matching expression.
:::

::: quiz
Which of the following describe the event "exactly one of $A$ and $B$ occurs"? (More than one answer may be correct.)
- [x] $(A \cap B^c) \cup (A^c \cap B)$
- [ ] $A \cup B$
- [x] $(A \cup B) \setminus (A \cap B)$
- [ ] $A^c \cup B^c$
::: solution
"Exactly one" means "$A$ but not $B$, or $B$ but not $A$", which is the first set. Equivalently it is "at least one, but not both", the third set. The union $A\cup B$ also contains outcomes where both occur, and $A^c \cup B^c = (A\cap B)^c$ means "not both", which includes outcomes where neither occurs.
:::
:::

## Kolmogorov's axioms {#axioms}

What properties should probabilities have? Imagine repeating an experiment $N$ times and counting the number $N_A$ of repetitions in which the event $A$ occurs. The **relative frequency** $N_A/N$ lies between $0$ and $1$; it equals $1$ for the certain event $\Omega$; and if $A$ and $B$ are mutually exclusive then $N_{A \cup B} = N_A + N_B$, so relative frequencies add. Whatever probability "is", it ought to share these properties. Kolmogorov's idea was to take them as axioms, strengthening additivity from two events to a countable sequence of events.

First, though, we must settle which subsets of $\Omega$ count as events. When $\Omega$ is finite or countable we can, and do, allow every subset. When $\Omega$ is uncountable, such as the interval $[0,1]$, it turns out to be impossible to assign a "length-like" probability to every subset consistently (the classical counterexample, the Vitali set, is discussed in [[measure-theory/lebesgue-measure]]). The fix is to restrict attention to a collection of subsets that is large enough for all practical purposes and closed under the operations we need.

::: definition Event space (σ-algebra) {#def-sigma-algebra}
A collection $\mathcal{F}$ of subsets of $\Omega$ is a **σ-algebra** on $\Omega$ if

1. $\Omega \in \mathcal{F}$;
2. if $A \in \mathcal{F}$ then $A^c \in \mathcal{F}$;
3. if $A_1, A_2, \ldots \in \mathcal{F}$ then $\bigcup_{n=1}^\infty A_n \in \mathcal{F}$.

In probability the members of $\mathcal{F}$ are the **events**, and $\mathcal{F}$ is also called the **event space**.
:::

Several closure properties follow at once. Since $\Omega \in \mathcal{F}$, its complement $\varnothing$ is in $\mathcal{F}$. Taking $A_n = \varnothing$ for $n > k$ in (3) shows that finite unions $A_1 \cup \dots \cup A_k$ are events. By De Morgan's law $\bigcap_n A_n = \bigl(\bigcup_n A_n^c\bigr)^c$, so countable intersections are events too, and so is $A \setminus B = A \cap B^c$. In short: any set built from countably many events by the usual operations is again an event. For a finite or countable $\Omega$ the **power set** $2^\Omega$ (all subsets) is a σ-algebra, and it is the one we use.

::: definition Probability measure and probability space {#def-prob-space}
Let $\mathcal{F}$ be a σ-algebra on $\Omega$. A **probability measure** on $(\Omega, \mathcal{F})$ is a function $\Prob\colon \mathcal{F} \to \R$ satisfying **Kolmogorov's axioms**:

1. (non-negativity) $\Prob(A) \ge 0$ for every $A \in \mathcal{F}$;
2. (normalisation) $\Prob(\Omega) = 1$;
3. (countable additivity) if $A_1, A_2, \ldots \in \mathcal{F}$ are pairwise disjoint, meaning $A_i \cap A_j = \varnothing$ whenever $i \neq j$, then

$$
\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \sum_{n=1}^\infty \Prob(A_n).
$$ {#eq-countable-additivity}

The triple $(\Omega, \mathcal{F}, \Prob)$ is called a **probability space**.
:::

::: remark What the axioms do not say
The axioms do not tell us what probability *means*. Probabilities may be long-run frequencies (the chance that a die shows six), consequences of symmetry (each of 52 cards is equally likely to be on top of a well-shuffled deck), or degrees of belief (the probability that a particular defendant is guilty). The axioms are the rules that every one of these interpretations must obey, and the mathematics developed from them applies to all of them. The "degree of belief" reading is the basis of [[statistics/bayesian]].
:::

The simplest way to build a probability space is to give each outcome a weight.

::: proposition Discrete probability spaces {#prop-discrete}
Let $\Omega$ be finite or countably infinite and let $p\colon \Omega \to [0, \infty)$ satisfy $\sum_{\omega \in \Omega} p(\omega) = 1$. Then

$$
\Prob(A) = \sum_{\omega \in A} p(\omega) \qquad (A \subseteq \Omega)
$$ {#eq-discrete}

defines a probability measure on $(\Omega, 2^\Omega)$. Conversely, every probability measure on $(\Omega, 2^\Omega)$ is of this form, with $p(\omega) = \Prob(\{\omega\})$.
:::

::: proof
The sums in [[#eq-discrete]] have non-negative terms, so they are well defined (possibly as infinite series) and their value does not depend on the order of summation ([[calculus-2/convergence-tests#thm-rearrangement]]). Clearly $\Prob(A) \ge 0$ and $\Prob(\Omega) = 1$. If $A_1, A_2, \ldots$ are pairwise disjoint, each $\omega$ in their union lies in exactly one $A_n$, and a series of non-negative terms may be split into groups and summed group by group, so

$$
\Prob\Bigl(\bigcup_n A_n\Bigr) = \sum_{\omega \in \bigcup_n A_n} p(\omega) = \sum_{n} \sum_{\omega \in A_n} p(\omega) = \sum_n \Prob(A_n).
$$

For the converse, let $\Prob$ be any probability measure on $(\Omega, 2^\Omega)$ and put $p(\omega) = \Prob(\{\omega\}) \ge 0$. Every $A \subseteq \Omega$ is the countable disjoint union of the singletons $\{\omega\}$, $\omega \in A$, so countable additivity gives $\Prob(A) = \sum_{\omega\in A} p(\omega)$; taking $A = \Omega$ shows that the weights sum to $1$.
:::

For example, a die loaded so that six has probability $\tfrac14$ and each other face $\tfrac{3}{20}$ is a valid model, since $5 \cdot \tfrac{3}{20} + \tfrac14 = 1$, and the probability of an even score is $\tfrac{3}{20} + \tfrac{3}{20} + \tfrac{1}{4} = \tfrac{11}{20}$.

## Consequences of the axioms {#consequences}

Everything else about probability is derived from the three axioms. The first batch of consequences contains the rules you have probably used since school; the point now is that they are *theorems*.

::: theorem Basic properties {#thm-basic}
Let $(\Omega, \mathcal{F}, \Prob)$ be a probability space and $A, B \in \mathcal{F}$. Then

1. $\Prob(\varnothing) = 0$;
2. (finite additivity) if $A_1, \ldots, A_k$ are pairwise disjoint events, $\Prob(A_1 \cup \dots \cup A_k) = \Prob(A_1) + \dots + \Prob(A_k)$;
3. (complement rule) $\Prob(A^c) = 1 - \Prob(A)$;
4. (monotonicity) if $A \subseteq B$ then $\Prob(B \setminus A) = \Prob(B) - \Prob(A)$, and hence $\Prob(A) \le \Prob(B)$;
5. $0 \le \Prob(A) \le 1$;
6. (addition rule) $\Prob(A \cup B) = \Prob(A) + \Prob(B) - \Prob(A \cap B)$.
:::

::: proof
(1) The sets $A_n = \varnothing$, $n \ge 1$, are pairwise disjoint with union $\varnothing$, so countable additivity gives $\Prob(\varnothing) = \sum_{n=1}^\infty \Prob(\varnothing)$. If $\Prob(\varnothing)$ were positive the right-hand side would be infinite, so $\Prob(\varnothing) = 0$.

(2) Put $A_n = \varnothing$ for $n > k$. The sequence $A_1, A_2, \ldots$ is pairwise disjoint with union $A_1 \cup \dots \cup A_k$, so by countable additivity and (1) the probability of the union is $\sum_{n=1}^k \Prob(A_n) + 0$.

(3) $\Omega = A \cup A^c$ is a disjoint union, so $1 = \Prob(\Omega) = \Prob(A) + \Prob(A^c)$ by (2).

(4) If $A \subseteq B$ then $B = A \cup (B \setminus A)$, a disjoint union, so $\Prob(B) = \Prob(A) + \Prob(B \setminus A)$. Rearranging gives the formula, and since $\Prob(B\setminus A) \ge 0$ we get $\Prob(A) \le \Prob(B)$.

(5) $\Prob(A) \ge 0$ is an axiom, and $\Prob(A) \le \Prob(\Omega) = 1$ by (4).

(6) Write $A \cup B = A \cup \bigl(B \setminus (A \cap B)\bigr)$, a disjoint union. By (2) and then (4) applied to $A \cap B \subseteq B$,

$$
\Prob(A \cup B) = \Prob(A) + \Prob\bigl(B \setminus (A\cap B)\bigr) = \Prob(A) + \Prob(B) - \Prob(A \cap B).
$$
:::

The addition rule corrects for double counting: outcomes in $A \cap B$ are counted once in $\Prob(A)$ and again in $\Prob(B)$, so one copy is subtracted.

::: warning Adding probabilities of events that overlap
"The chance of at least one six in two rolls of a die is $\tfrac16 + \tfrac16 = \tfrac13$" is wrong, because the events "six on the first roll" and "six on the second roll" are not mutually exclusive. With $36$ equally likely outcomes, the addition rule gives $\tfrac{6}{36} + \tfrac{6}{36} - \tfrac{1}{36} = \tfrac{11}{36}$. The complement rule gives the same answer more quickly: there are $5^2 = 25$ outcomes with no six, so the probability is $1 - \tfrac{25}{36} = \tfrac{11}{36}$. Taken to six rolls, the faulty reasoning would claim that a six is certain.
:::

Even when we cannot compute the probability of a union exactly, we can bound it.

::: theorem Boole's inequality (the union bound) {#thm-union-bound}
For any events $A_1, A_2, \ldots$,

$$
\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) \le \sum_{n=1}^\infty \Prob(A_n).
$$

The same holds for finitely many events.
:::

::: proof
Make the events disjoint by removing what has already been counted: let $B_1 = A_1$ and $B_n = A_n \setminus (A_1 \cup \dots \cup A_{n-1})$ for $n \ge 2$. Each $B_n$ is an event and $B_n \subseteq A_n$. The $B_n$ are pairwise disjoint, because an outcome in $B_n$ is not in any earlier $A_k$, hence not in any earlier $B_k$. And $\bigcup_n B_n = \bigcup_n A_n$: if $\omega$ lies in some $A_n$, let $n$ be the *smallest* such index; then $\omega \in B_n$. By countable additivity and monotonicity,

$$
\Prob\Bigl(\bigcup_n A_n\Bigr) = \Prob\Bigl(\bigcup_n B_n\Bigr) = \sum_n \Prob(B_n) \le \sum_n \Prob(A_n).
$$

For finitely many events, take $A_n = \varnothing$ beyond the last one.
:::

The union bound is crude but remarkably useful: if each of $100$ components of a machine fails with probability at most $10^{-4}$, then *whatever* the dependence between failures, the probability that at least one fails is at most $100 \cdot 10^{-4} = 0.01$.

For an exact formula we extend the addition rule to more events. With three events, $\Prob(A\cup B\cup C)$ is obtained by adding the three single probabilities, subtracting the three pairwise intersections (each counted twice), and adding back the triple intersection (which has now been added three times and subtracted three times). In general:

::: theorem Inclusion–exclusion {#thm-inclusion-exclusion}
For events $A_1, \ldots, A_n$,

$$
\Prob\Bigl(\bigcup_{i=1}^n A_i\Bigr) = \sum_{k=1}^n (-1)^{k+1} S_k, \qquad S_k = \sum_{1 \le i_1 < i_2 < \dots < i_k \le n} \Prob(A_{i_1} \cap A_{i_2} \cap \dots \cap A_{i_k}).
$$ {#eq-incl-excl}

So $S_1$ is the sum of the single probabilities, $S_2$ the sum over pairs, and so on, and the signs alternate.
:::

::: proof
Induction on $n$. For $n = 1$ there is nothing to prove, and $n = 2$ is the addition rule ([[#thm-basic]]). Suppose the formula holds for any $n$ events, and let $A_1, \ldots, A_{n+1}$ be events. Put $U = A_1 \cup \dots \cup A_n$. By the addition rule,

$$
\Prob(U \cup A_{n+1}) = \Prob(U) + \Prob(A_{n+1}) - \Prob(U \cap A_{n+1}).
$$

Now $U \cap A_{n+1} = \bigcup_{i=1}^n (A_i \cap A_{n+1})$, a union of $n$ events, so by the induction hypothesis

$$
\Prob(U \cap A_{n+1}) = \sum_{k=1}^n (-1)^{k+1} \sum_{i_1 < \dots < i_k \le n} \Prob(A_{i_1} \cap \dots \cap A_{i_k} \cap A_{n+1}).
$$

Consider any intersection of $j$ of the events $A_1, \ldots, A_{n+1}$. If it does not involve $A_{n+1}$, it appears in the expansion of $\Prob(U)$ (induction hypothesis again) with sign $(-1)^{j+1}$. If it does involve $A_{n+1}$ and $j = 1$, it is the term $\Prob(A_{n+1})$, with sign $+1$. If it involves $A_{n+1}$ and $j \ge 2$, it is one of the terms above with $k = j-1$, and the minus sign in front of $\Prob(U\cap A_{n+1})$ turns its sign into $-(-1)^{j} = (-1)^{j+1}$. So every intersection of $j$ events appears exactly once, with sign $(-1)^{j+1}$, which is the formula for $n+1$ events.
:::

::: quiz
Events $A$ and $B$ have $\Prob(A) = 0.7$ and $\Prob(B) = 0.6$. What can be said about $\Prob(A \cap B)$ without further information?
- [ ] It equals $0.42$.
- [x] It lies between $0.3$ and $0.6$.
- [ ] It is at most $0.3$.
- [ ] Nothing: any value in $[0, 0.6]$ is possible.
::: solution
By the addition rule, $\Prob(A\cap B) = \Prob(A) + \Prob(B) - \Prob(A \cup B) \ge 0.7 + 0.6 - 1 = 0.3$, since $\Prob(A\cup B) \le 1$. Also $A \cap B \subseteq B$, so $\Prob(A\cap B) \le 0.6$. Both extremes can occur (for instance $B \subseteq A$ gives $0.6$). The value $0.42 = 0.7 \times 0.6$ would require the events to be *independent*, a notion we meet in [[probability/conditional-probability]] and which nothing here guarantees.
:::
:::

The last basic property connects probability with limits. It is where countable additivity, rather than mere finite additivity, really matters.

::: theorem Continuity of probability {#thm-continuity}
1. If $A_1 \subseteq A_2 \subseteq A_3 \subseteq \cdots$ are events, then $\displaystyle\Prob\Bigl(\bigcup_{n=1}^\infty A_n\Bigr) = \lim_{n\to\infty} \Prob(A_n)$.
2. If $A_1 \supseteq A_2 \supseteq A_3 \supseteq \cdots$ are events, then $\displaystyle\Prob\Bigl(\bigcap_{n=1}^\infty A_n\Bigr) = \lim_{n\to\infty} \Prob(A_n)$.
:::

::: proof
(1) Let $B_1 = A_1$ and $B_n = A_n \setminus A_{n-1}$ for $n \ge 2$: the "new" outcomes that enter at stage $n$. The $B_n$ are pairwise disjoint, $A_n = B_1 \cup \dots \cup B_n$, and $\bigcup_n A_n = \bigcup_n B_n$. By countable additivity, and then finite additivity,

$$
\Prob\Bigl(\bigcup_{n} A_n\Bigr) = \sum_{k=1}^\infty \Prob(B_k) = \lim_{n\to\infty} \sum_{k=1}^n \Prob(B_k) = \lim_{n\to\infty} \Prob(A_n).
$$

(2) The complements $A_n^c$ increase, and $\bigl(\bigcap_n A_n\bigr)^c = \bigcup_n A_n^c$ by De Morgan's law. By part (1) and the complement rule,

$$
\Prob\Bigl(\bigcap_n A_n\Bigr) = 1 - \Prob\Bigl(\bigcup_n A_n^c\Bigr) = 1 - \lim_{n\to\infty}\bigl(1 - \Prob(A_n)\bigr) = \lim_{n\to\infty} \Prob(A_n).
$$
:::

::: example A fair coin eventually shows heads {#ex-eventually-heads}
A fair coin is tossed repeatedly. Show that the probability that it *never* shows heads is $0$.
::: solution
Let $T_n$ be the event that the first $n$ tosses are all tails. Among the $2^n$ equally likely sequences of $n$ tosses exactly one is all tails, so $\Prob(T_n) = 2^{-n}$. The events decrease, $T_1 \supseteq T_2 \supseteq \cdots$, because if the first $n+1$ tosses are tails then so are the first $n$. "Never heads" is the event that every $T_n$ occurs, namely $\bigcap_n T_n$. By [[#thm-continuity]],

$$
\Prob(\text{never heads}) = \lim_{n\to\infty} 2^{-n} = 0.
$$

Note that "never heads" is not an *impossible* event (the all-tails sequence makes sense); it simply has probability zero.
:::
:::

## Equally likely outcomes {#equally-likely}

The oldest kind of probability model is the one in which every outcome is equally likely. When $\Omega$ is finite, [[#prop-discrete]] with the constant weight $p(\omega) = 1/\lvert\Omega\rvert$ gives the following.

::: corollary Classical probability {#cor-classical}
If $\Omega$ is finite and all outcomes are equally likely, then for every event $A$

$$
\Prob(A) = \frac{\lvert A\rvert}{\lvert\Omega\rvert} = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}.
$$
:::

Computing probabilities thus becomes a matter of counting, and the tools of [[discrete/counting]] apply: the multiplication principle, the $n!/(n-k)!$ ordered selections of $k$ objects from $n$, and the $\binom{n}{k}$ unordered ones.

::: example Totals of two dice {#ex-two-dice}
Two fair dice are rolled. Find the probability that the total is $7$, and the probability that it is $8$.
::: solution
Use the $36$ ordered outcomes $(i, j)$, which are equally likely for fair dice. A total of $7$ arises from $(1,6),\allowbreak (2,5),\allowbreak (3,4),\allowbreak (4,3),\allowbreak (5,2),\allowbreak (6,1)$, so $\Prob(\text{total } 7) = \tfrac{6}{36} = \tfrac16$. A total of $8$ arises from $(2,6),\allowbreak (3,5),\allowbreak (4,4),\allowbreak (5,3),\allowbreak (6,2)$, so $\Prob(\text{total }8) = \tfrac{5}{36}$. In general the number of ways to obtain the totals $2, 3, \ldots, 12$ is

| total | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ways | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

so the eleven possible totals are far from equally likely.
:::
:::

::: example The Chevalier de Méré's two bets {#ex-de-mere}
A seventeenth-century gambler bet at even odds on (a) at least one six in four rolls of a die, and (b) at least one double six in $24$ rolls of a pair of dice. He reasoned that both bets were equally good, since $4/6 = 24/36$. Compute the two probabilities.
::: solution
(a) The sample space is $\{1,\ldots,6\}^4$, with $6^4 = 1296$ equally likely outcomes. The complement "no six" consists of the $5^4 = 625$ sequences using only $1, \ldots, 5$. Hence

$$
\Prob(\text{at least one six}) = 1 - \frac{5^4}{6^4} = \frac{671}{1296} \approx 0.5177.
$$

(b) Now the sample space is the set of sequences of $24$ ordered pairs, with $36^{24}$ equally likely outcomes, of which $35^{24}$ contain no double six. So

$$
\Prob(\text{at least one double six}) = 1 - \Bigl(\frac{35}{36}\Bigr)^{24} \approx 0.4914.
$$

The first bet is favourable and the second slightly unfavourable. The ratio argument fails because it treats the probability of "at least one" as proportional to the number of attempts, the overlapping-events mistake from the warning above.
:::
:::

::: example A full house {#ex-full-house}
A poker hand of $5$ cards is dealt from a well-shuffled standard deck of $52$. What is the probability of a **full house** (three cards of one rank and two of another, such as three kings and two sevens)?
::: solution
All $\binom{52}{5} = 2\,598\,960$ hands are equally likely. Count full houses by the multiplication principle: choose the rank of the triple ($13$ ways), choose three of the four suits of that rank ($\binom43 = 4$), choose a different rank for the pair ($12$ ways), and choose two of its four suits ($\binom42 = 6$). This gives $13 \cdot 4 \cdot 12 \cdot 6 = 3744$ hands, so

$$
\Prob(\text{full house}) = \frac{3744}{2\,598\,960} \approx 0.00144,
$$

about one hand in $694$. Note that the ranks for the triple and the pair are chosen *in order*: kings-over-sevens and sevens-over-kings are different hands, which is why we multiply by $13 \cdot 12$ and not by $\binom{13}{2}$.
:::
:::

We can now settle the opening question.

::: example The birthday problem {#ex-birthday}
Assume that birthdays are equally likely to fall on each of $365$ days (ignore 29 February). Find the probability that among $n$ people at least two share a birthday.
::: solution
Record the birthdays of the $n$ people in order: $\Omega$ is the set of sequences of length $n$ from $365$ days, so $\lvert\Omega\rvert = 365^n$, all equally likely. Let $A$ be the event that two people share a birthday. Its complement $A^c$, "all birthdays different", consists of the sequences with no repeats; there are $365 \cdot 364 \cdots (365 - n + 1)$ of them. Hence

$$
\Prob(A) = 1 - \frac{365 \cdot 364 \cdots (365-n+1)}{365^n} = 1 - \prod_{k=0}^{n-1}\Bigl(1 - \frac{k}{365}\Bigr).
$$

For $n = 22$ this is $0.4757$ and for $n = 23$ it is $0.5073$, so $23$ is the smallest group in which a shared birthday is more likely than not. The surprise disappears once we count *pairs*: $23$ people form $\binom{23}{2} = 253$ pairs, and each pair is a chance for a coincidence.
:::
:::

::: widget plot
f: 1 - prod((365 - k)/365, k, 0, floor(x) - 1)
x: 1, 80
y: 0, 1
hlines: 0.5
vlines: 23
labels: P(\text{shared birthday})
caption: The probability that at least two of $n$ people share a birthday, as a function of $n$. It passes $\tfrac12$ at $n = 23$ and exceeds $0.99$ from $n = 57$. Hover over the curve to read off values: the steepest rise is between $10$ and $40$ people.
:::

::: warning "Equally likely" is an assumption, not a default
The formula $\lvert A\rvert/\lvert\Omega\rvert$ is valid only when the outcomes really are equally likely, and that is a fact about the experiment, not about the way we chose to list outcomes. In the *Encyclopédie* of 1754 Jean le Rond d'Alembert argued that the probability of at least one head in two tosses of a coin is $\tfrac23$, listing the outcomes as "head on the first toss", "tail then head", "two tails". These three outcomes are not equally likely; the first has probability $\tfrac12$. Using the four equally likely ordered outcomes $HH, HT, TH, TT$ gives the correct answer $\tfrac34$. Similarly the eleven totals of two dice are not equally likely, while the $36$ ordered pairs are.
:::

::: quiz
Three fair coins are tossed. A friend argues: "the number of heads is $0$, $1$, $2$ or $3$, so the probability of exactly one head is $\tfrac14$." What is the correct probability?
- [ ] $\tfrac14$
- [ ] $\tfrac13$
- [x] $\tfrac38$
- [ ] $\tfrac12$
::: solution
The $8$ ordered outcomes $HHH, HHT, \ldots, TTT$ are equally likely, and exactly three of them ($HTT$, $THT$, $TTH$) contain one head. So the probability is $\tfrac38$. The four possible *numbers* of heads are not equally likely: they have probabilities $\tfrac18, \tfrac38, \tfrac38, \tfrac18$.
:::
:::

Inclusion–exclusion becomes powerful when combined with counting. The next example is one of the classics of probability, studied by Pierre Rémond de Montmort in 1708.

::: example The matching problem {#ex-matching}
A secretary puts $n$ letters into $n$ addressed envelopes at random, so that all $n!$ arrangements are equally likely. What is the probability that no letter is in its correct envelope? What happens as $n \to \infty$?
::: solution
Let $A_i$ be the event that letter $i$ is in its correct envelope. We want $1 - \Prob(A_1 \cup \dots \cup A_n)$. For any $k$ distinct indices $i_1 < \dots < i_k$, the arrangements with letters $i_1, \ldots, i_k$ correct are the arrangements of the remaining $n - k$ letters, so

$$
\Prob(A_{i_1} \cap \dots \cap A_{i_k}) = \frac{(n-k)!}{n!}.
$$

There are $\binom{n}{k}$ choices of the indices, so $S_k = \binom{n}{k}\dfrac{(n-k)!}{n!} = \dfrac{1}{k!}$. By [[#thm-inclusion-exclusion]],

$$
\Prob(\text{no letter correct}) = 1 - \sum_{k=1}^n \frac{(-1)^{k+1}}{k!} = \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

For $n = 4$ this is $1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} = \tfrac38$. As $n \to \infty$ the sum converges to the exponential series $\sum_k (-1)^k/k! = e^{-1} \approx 0.3679$ ([[calculus-2/taylor-series]]). Already for $n = 7$ the answer agrees with $e^{-1}$ to four decimal places: the chance of no match is essentially the same for ten letters as for ten million.
:::
:::

## Infinite sample spaces {#infinite}

Nothing in the axioms requires $\Omega$ to be finite. When $\Omega$ is countably infinite, [[#prop-discrete]] still applies: any non-negative weights with total $1$ define a probability measure. When $\Omega$ is uncountable, probabilities of individual outcomes no longer determine everything, and probabilities of intervals or regions take their place.

::: example Waiting for the first head {#ex-first-head}
A fair coin is tossed until it first shows heads. Let $\Omega = \{1, 2, 3, \ldots\}$ record the number of tosses needed. The first head occurs at toss $n$ exactly when the first $n$ tosses are $T\cdots TH$, one of $2^n$ equally likely sequences, so we take $p(n) = 2^{-n}$. Check that this is a probability measure, and find the probability that the first head occurs on an even-numbered toss.
::: solution
The weights are positive and form a geometric series with sum $\sum_{n\ge1} 2^{-n} = \frac{1/2}{1 - 1/2} = 1$, so [[#prop-discrete]] applies. (The sum being exactly $1$ agrees with [[#ex-eventually-heads]]: no probability is left over for "never".) The event "even toss" is $\{2, 4, 6, \ldots\}$, so

$$
\Prob(\text{even}) = \sum_{k=1}^\infty 2^{-2k} = \sum_{k=1}^\infty 4^{-k} = \frac{1/4}{1 - 1/4} = \frac13.
$$

The odd tosses therefore have probability $\tfrac23$: the first toss alone already contributes $\tfrac12$.
:::
:::

For an uncountable sample space, consider choosing a point "uniformly at random" from $\Omega = [0, 1]$. The natural requirement is that the probability of landing in an interval equals its length:

$$
\Prob([a, b]) = b - a \qquad (0 \le a \le b \le 1).
$$ {#eq-uniform}

That there is a probability measure with this property, defined on a σ-algebra containing all intervals (the **Borel sets**), is a genuine theorem: it is the construction of Lebesgue measure in [[measure-theory/lebesgue-measure]]. Granting it, monotonicity shows that a single point has probability zero: $\{x\} \subseteq [x - \eps, x + \eps]$, so $\Prob(\{x\}) \le 2\eps$ for every $\eps > 0$. There is no contradiction with countable additivity, because $[0,1]$ is uncountable and additivity says nothing about uncountable unions. A consequence is that every countable set, such as the set of rational numbers in $[0,1]$, has probability zero.

::: warning Probability zero does not mean impossible
For a uniform point $X$ in $[0,1]$, every particular value has probability $0$, yet some value occurs. "$\Prob(A) = 0$" means that $A$ is negligible for the purposes of probability, not that $A$ cannot happen; likewise $\Prob(A) = 1$ means $A$ happens **almost surely**, not that it is certain. The distinction is harmless in finite models, where the only event of probability zero we need is $\varnothing$, but essential in continuous ones.
:::

The same idea in two dimensions gives **geometric probability**: if a point is chosen uniformly from a region $R$ of the plane, the probability that it lands in $A \subseteq R$ is $\operatorname{area}(A)/\operatorname{area}(R)$.

::: example Meeting for lunch {#ex-meeting}
Two friends each arrive at a café at a random time between 12:00 and 13:00, and each waits $15$ minutes for the other before leaving. Assuming the pair of arrival times is uniformly distributed over the square of possibilities, what is the probability that they meet?
::: solution
Measure time in hours after noon, so the arrival times $(x, y)$ form a uniform point in the unit square $[0,1]^2$. They meet exactly when $\lvert x - y\rvert \le \tfrac14$. The complementary region consists of two right-angled triangles, $y > x + \tfrac14$ and $x > y + \tfrac14$, each with legs of length $\tfrac34$ and hence area $\tfrac12\bigl(\tfrac34\bigr)^2 = \tfrac{9}{32}$. Therefore

$$
\Prob(\text{meet}) = 1 - 2 \cdot \frac{9}{32} = \frac{7}{16} = 0.4375.
$$
:::
:::

Geometric probability also gives a way to *estimate* areas by simulation, which is the idea behind the Monte Carlo method. A uniform point in the unit square lands inside the quarter disc $x^2 + y^2 \le 1$ with probability $\pi/4$, so the fraction of random points that land there estimates $\pi/4$.

::: widget montecarlo
mode: pi
n: 1000
caption: Each dot is a uniform random point in the unit square; the proportion inside the quarter circle estimates $\Prob(\text{inside}) = \pi/4$, so four times it estimates $\pi$. Increase $n$ and rerun a few times: the estimates scatter less, but slowly — to gain one more correct digit you need about $100$ times as many points. The reason is the $1/\sqrt{n}$ law of [[probability/limit-theorems]].
:::

::: remark Bertrand's paradox
"Choose a chord of a circle at random" does not specify a probability space. In his *Calcul des probabilités* (1889) Joseph Bertrand asked for the probability that a random chord is longer than the side of the inscribed equilateral triangle, and obtained three different answers: $\tfrac13$ if the two endpoints are chosen uniformly on the circle, $\tfrac12$ if a uniform point on a random radius is taken as the chord's midpoint, and $\tfrac14$ if the midpoint is chosen uniformly in the disc. Each answer is correct for its own model. The lesson is that "at random" has no meaning until a sample space and a probability measure are fixed.
:::

::: history
Games of chance are ancient, but their mathematics is not. Gerolamo Cardano analysed dice in his *Liber de ludo aleae*, written around 1564 and published only in 1663. The subject is usually dated to 1654, when Blaise Pascal and Pierre de Fermat exchanged letters about problems put to Pascal by the gambler Antoine Gombaud, the Chevalier de Méré, including how to divide the stakes of an interrupted game (the "problem of points"). Christiaan Huygens wrote the first printed treatise, *De ratiociniis in ludo aleae* (1657), and Jacob Bernoulli's *Ars Conjectandi* (published posthumously in 1713) went far beyond games. Pierre-Simon Laplace's *Théorie analytique des probabilités* (1812) made the classical definition — favourable cases divided by equally possible cases — the standard one. Paradoxes such as Bertrand's showed that this definition was not enough, and in 1900 David Hilbert included the axiomatisation of probability in his sixth problem. The answer came in Andrey Kolmogorov's *Grundbegriffe der Wahrscheinlichkeitsrechnung* (1933), which founded probability on the measure theory of Borel and Lebesgue using the axioms of this chapter.
:::

## Where this leads {#where-next}

The probability space is the stage on which everything else happens. In [[probability/conditional-probability]] we learn how probabilities change when we receive partial information, which leads to Bayes' theorem and the notion of independence. Numerical quantities attached to outcomes, such as the total of two dice or the number of tosses until a head, are **random variables**, studied from [[probability/discrete-random-variables]] onwards. The measure-theoretic side of this chapter — σ-algebras, the construction of Lebesgue measure and integration with respect to a probability measure — is developed fully in [[measure-theory/sigma-algebras]], [[measure-theory/lebesgue-measure]] and [[measure-theory/lebesgue-integral]].

::: summary
- A probability space $(\Omega, \mathcal{F}, \Prob)$ consists of a sample space of outcomes, a σ-algebra of events and a probability measure obeying Kolmogorov's axioms: non-negativity, $\Prob(\Omega) = 1$ and countable additivity ([[#def-prob-space]]).
- Events are sets; "or", "and", "not" are union, intersection, complement, and De Morgan's laws convert between them.
- On a countable sample space a probability measure is the same thing as a set of non-negative weights summing to $1$ ([[#prop-discrete]]).
- Consequences of the axioms: $\Prob(A^c) = 1 - \Prob(A)$, monotonicity, $\Prob(A\cup B) = \Prob(A) + \Prob(B) - \Prob(A\cap B)$, the union bound and inclusion–exclusion.
- Probability is continuous along increasing and decreasing sequences of events ([[#thm-continuity]]).
- With finitely many equally likely outcomes, $\Prob(A) = \lvert A\rvert/\lvert\Omega\rvert$ and probability reduces to counting — but equal likelihood must be justified. The complement is often easier to count ("at least one" versus "none").
- In continuous models single outcomes have probability $0$; probability zero does not mean impossible.
:::

## Exercises

::: exercise Three coins {level=1 check="3/8"}
Three fair coins are tossed. Find the probability of exactly two heads.
::: solution
Of the $8$ equally likely outcomes, $HHT$, $HTH$ and $THH$ have exactly two heads, so the probability is $\tfrac38$.
:::
:::

::: exercise Exactly one of two events {level=1 check="1/2"}
Events $A$ and $B$ satisfy $\Prob(A) = 0.6$, $\Prob(B) = 0.5$ and $\Prob(A \cap B) = 0.3$. Find the probability that exactly one of $A$ and $B$ occurs.
::: solution
By the addition rule $\Prob(A\cup B) = 0.6 + 0.5 - 0.3 = 0.8$. "Exactly one" is $(A\cup B) \setminus (A \cap B)$, and $A\cap B \subseteq A \cup B$, so by monotonicity ([[#thm-basic]]) its probability is $0.8 - 0.3 = 0.5$.
:::
:::

::: exercise A high total {level=1 check="1/6"}
Two fair dice are rolled. Find the probability that the total is at least $10$.
::: solution
Totals $10$, $11$, $12$ arise in $3 + 2 + 1 = 6$ of the $36$ equally likely ordered outcomes, so the probability is $\tfrac{6}{36} = \tfrac16$.
:::
:::

::: exercise A committee {level=2 check="5/6"}
A committee of $3$ is chosen at random from $6$ women and $4$ men. Find the probability that it contains at least one man.
::: hint
Count the complement.
:::
::: solution
All $\binom{10}{3} = 120$ committees are equally likely. The complement "no man" means all three are women: $\binom63 = 20$ committees. Hence $\Prob(\text{at least one man}) = 1 - \tfrac{20}{120} = \tfrac56$.
:::
:::

::: exercise Four of a kind {level=2 check="1/4165"}
Find the probability that a $5$-card poker hand contains four cards of the same rank.
::: solution
Choose the rank of the four ($13$ ways); all four cards of that rank are then in the hand, and the fifth card is any of the remaining $48$. So there are $13 \cdot 48 = 624$ such hands out of $\binom{52}{5} = 2\,598\,960$, and the probability is $\tfrac{624}{2\,598\,960} = \tfrac{1}{4165} \approx 0.00024$.
:::
:::

::: exercise Sharing your birthday {level=2 check="253"}
With the assumptions of [[#ex-birthday]], what is the smallest number $n$ of other people such that the probability that at least one of them has the same birthday as *you* exceeds $\tfrac12$?
::: hint
For a fixed day, the number of sequences of $n$ birthdays avoiding it is $364^n$.
:::
::: solution
Among the $365^n$ equally likely sequences of birthdays of the $n$ others, $364^n$ avoid your birthday. So we need $1 - (364/365)^n > \tfrac12$, that is $n \ln(365/364) > \ln 2$, or

$$
n > \frac{\ln 2}{\ln(365/364)} \approx 252.65.
$$

Hence $n = 253$ (for which the probability is $0.5005$, while for $n = 252$ it is $0.4991$). This is about eleven times the answer to the birthday problem: there, any of the $\binom{n}{2}$ pairs can match; here, only the $n$ pairs involving you count.
:::
:::

::: exercise Divisible by 2, 3 or 5 {level=2 check="0.734"}
An integer is chosen uniformly at random from $1, 2, \ldots, 1000$. Find the probability that it is divisible by at least one of $2$, $3$ and $5$.
::: solution
Let $A_2$, $A_3$, $A_5$ be the events of divisibility by $2$, $3$, $5$. The number of multiples of $m$ in $\{1, \ldots, 1000\}$ is $\lfloor 1000/m\rfloor$, and divisibility by two or three of these primes means divisibility by their product. Inclusion–exclusion ([[#thm-inclusion-exclusion]]) gives the count

$$
500 + 333 + 200 - 166 - 100 - 66 + 33 = 734,
$$

using $\lfloor 1000/6\rfloor = 166$, $\lfloor 1000/10\rfloor = 100$, $\lfloor 1000/15\rfloor = 66$ and $\lfloor 1000/30\rfloor = 33$. The probability is $\tfrac{734}{1000} = 0.734$.
:::
:::

::: exercise Bonferroni's inequality {level=3}
Prove that for any events $A_1, \ldots, A_n$,

$$
\Prob(A_1 \cap A_2 \cap \dots \cap A_n) \ge 1 - \sum_{i=1}^n \Prob(A_i^c).
$$

Deduce that if each of $20$ statements is true with probability at least $0.995$, then all $20$ are true simultaneously with probability at least $0.9$.
::: hint
Apply the union bound to the complements.
:::
::: solution
By De Morgan's law, $(A_1\cap\dots\cap A_n)^c = A_1^c \cup \dots \cup A_n^c$. By the complement rule and the union bound ([[#thm-union-bound]]),

$$
\Prob\Bigl(\bigcap_{i} A_i\Bigr) = 1 - \Prob\Bigl(\bigcup_i A_i^c\Bigr) \ge 1 - \sum_{i=1}^n \Prob(A_i^c).
$$

In the application each $\Prob(A_i^c) \le 0.005$, so the probability that all $20$ hold is at least $1 - 20 \times 0.005 = 0.9$. No assumption about the relationship between the statements is needed. This is the idea behind the Bonferroni correction for multiple tests ([[statistics/hypothesis-testing#thm-bonferroni]]).
:::
:::

::: exercise No uniform distribution on the integers {level=3}
Prove that there is no probability measure on $(\N, 2^{\N})$, where $\N = \{1, 2, 3, \ldots\}$, under which all the singletons $\{n\}$ have the same probability. (So "choose a positive integer uniformly at random" is meaningless.)
::: solution
Suppose $\Prob(\{n\}) = c$ for every $n$. The singletons are pairwise disjoint with union $\N$, so countable additivity gives

$$
1 = \Prob(\N) = \sum_{n=1}^\infty \Prob(\{n\}) = \sum_{n=1}^\infty c.
$$

If $c = 0$ the right-hand side is $0$, and if $c > 0$ it diverges to $\infty$. Neither equals $1$, a contradiction. (Finite additivity alone would not rule out such a "measure"; countable additivity does.)
:::
:::

::: exercise Breaking a stick {level=3 check="1/4"}
A stick of length $1$ is broken at two points chosen so that the pair of break points $(x, y)$ is a uniform point of the unit square. Find the probability that the three pieces can form a triangle.
::: hint
Three lengths form a triangle exactly when each is less than half of the total. Treat the cases $x < y$ and $x > y$ separately and draw the regions.
:::
::: solution
Three positive lengths with sum $1$ form a (non-degenerate) triangle exactly when each is less than $\tfrac12$: the triangle inequality $a < b + c$ is equivalent to $a < 1 - a$, that is $a < \tfrac12$. If $x < y$ the pieces are $x$, $y - x$ and $1 - y$, and the conditions are

$$
x < \tfrac12, \qquad y - x < \tfrac12, \qquad y > \tfrac12 .
$$

In the triangle $\{0 < x < y < 1\}$ (area $\tfrac12$) these conditions cut out the triangle with vertices $(0, \tfrac12)$, $(\tfrac12, \tfrac12)$ and $(\tfrac12, 1)$, of area $\tfrac18$. By symmetry the case $x > y$ contributes another $\tfrac18$, and the event $x = y$ has probability zero. Hence the probability is $\tfrac18 + \tfrac18 = \tfrac14$.
:::
:::

::: exercise Continuity from above, directly {level=3}
In [[#thm-continuity]] part (2) was deduced from part (1). Give a direct proof: if $A_1 \supseteq A_2 \supseteq \cdots$ and $A = \bigcap_n A_n$, show that $A_1 \setminus A$ is the disjoint union of the sets $A_k \setminus A_{k+1}$, $k \ge 1$, and use this to prove $\Prob(A) = \lim_n \Prob(A_n)$.
::: solution
If $\omega \in A_1 \setminus A$, then $\omega$ is not in every $A_n$; let $m$ be the smallest index with $\omega \notin A_{m+1}$. Then $\omega \in A_m$ (all of $A_1, \ldots, A_m$ contain $\omega$, by minimality of $m$), so $\omega \in A_m \setminus A_{m+1}$. Conversely each $A_k \setminus A_{k+1}$ lies in $A_1$ and misses $A_{k+1} \supseteq A$, so it lies in $A_1 \setminus A$. The sets $A_k \setminus A_{k+1}$ are pairwise disjoint: if $j < k$, then $A_k \subseteq A_{j+1}$, so $A_k\setminus A_{k+1}$ lies inside $A_{j+1}$, which is disjoint from $A_j \setminus A_{j+1}$. By countable additivity and part (4) of [[#thm-basic]],

$$
\Prob(A_1) - \Prob(A) = \sum_{k=1}^\infty \bigl(\Prob(A_k) - \Prob(A_{k+1})\bigr) = \lim_{n\to\infty} \bigl(\Prob(A_1) - \Prob(A_{n+1})\bigr),
$$

since the partial sums telescope. Cancelling $\Prob(A_1)$ gives $\Prob(A) = \lim_n \Prob(A_{n+1}) = \lim_n \Prob(A_n)$.
:::
:::
