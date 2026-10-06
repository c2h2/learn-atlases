A disease affects $1\%$ of a population. A test for it is $95\%$ accurate in both directions: it is positive for $95\%$ of people who have the disease and negative for $95\%$ of people who do not. You take the test and it comes back positive. How likely is it that you have the disease?

Most people answer $95\%$. The correct answer is about $16\%$. The test is good, but the disease is rare, and among everyone who tests positive the healthy people who were unlucky outnumber the sick people by about five to one. Getting this right requires a precise way of updating probabilities when new information arrives, and that is what **conditional probability** provides.

This chapter defines conditional probability and derives its three workhorse rules: the multiplication rule, the law of total probability and Bayes' theorem. It then turns to **independence**, the situation in which information about one event tells us nothing about another. Independence is the single most important modelling assumption in probability, and also one of the most frequently abused.

## Conditioning on an event {#conditioning}

Roll a red die and a blue die, and suppose you are told only that the total is $8$. What is now the probability that at least one die shows a six?

Before the information, all $36$ outcomes were equally likely. Once we know the total is $8$, only five outcomes remain possible,

$$
B = \{(2,6), (3,5), (4,4), (5,3), (6,2)\},
$$

and there is no reason to favour any of them over the others, so each now has probability $\tfrac15$. Two of them contain a six, so the updated probability is $\tfrac25$, compared with $\tfrac{11}{36} \approx 0.31$ before. Learning that $B$ occurred has shrunk the sample space to $B$ and rescaled the probabilities inside it. In terms of the original probabilities, $\tfrac25 = \dfrac{2/36}{5/36} = \dfrac{\Prob(A\cap B)}{\Prob(B)}$, where $A$ is the event "at least one six". This motivates the general definition.

::: definition Conditional probability {#def-conditional}
Let $B$ be an event with $\Prob(B) > 0$. The **conditional probability of $A$ given $B$** is

$$
\Prob(A \mid B) = \frac{\Prob(A \cap B)}{\Prob(B)}.
$$ {#eq-conditional}
:::

The definition keeps the relative sizes of the probabilities of outcomes inside $B$, discards everything outside $B$, and divides by $\Prob(B)$ so that the total is again $1$.

::: widget venn
sets: 2
expr: A & B
caption: Conditioning on $B$ makes $B$ the new sample space. The shaded region $A \cap B$ is the part of $A$ that is still possible, and $\Prob(A \mid B)$ is its share of the circle $B$, not of the whole rectangle. Type `B` and then `A & B'` to compare $\Prob(A\mid B)$ with $\Prob(A \mid B^c)$, the share of the region outside $B$ that lies in $A$.
:::

A conditional probability is a probability in its own right: all the rules of [[probability/probability-spaces]] apply to it.

::: theorem Conditional probability is a probability measure {#thm-cond-measure}
Let $(\Omega, \mathcal{F}, \Prob)$ be a probability space and $B \in \mathcal{F}$ with $\Prob(B) > 0$. Then $Q(A) = \Prob(A \mid B)$ defines a probability measure $Q$ on $(\Omega, \mathcal{F})$, and $Q(B) = 1$.
:::

::: proof
We check Kolmogorov's axioms. Non-negativity: $Q(A) = \Prob(A\cap B)/\Prob(B) \ge 0$. Normalisation: $Q(\Omega) = \Prob(B)/\Prob(B) = 1$, and likewise $Q(B) = 1$. Countable additivity: if $A_1, A_2, \ldots$ are pairwise disjoint, so are $A_1 \cap B, A_2 \cap B, \ldots$, and $\bigl(\bigcup_n A_n\bigr) \cap B = \bigcup_n (A_n \cap B)$. Hence

$$
Q\Bigl(\bigcup_n A_n\Bigr) = \frac{\Prob\bigl(\bigcup_n (A_n\cap B)\bigr)}{\Prob(B)} = \sum_n \frac{\Prob(A_n \cap B)}{\Prob(B)} = \sum_n Q(A_n).
$$
:::

Consequently $\Prob(A^c \mid B) = 1 - \Prob(A\mid B)$, $\Prob(A_1 \cup A_2 \mid B) = \Prob(A_1\mid B) + \Prob(A_2 \mid B) - \Prob(A_1\cap A_2 \mid B)$, and so on: every theorem about probabilities holds for conditional probabilities given a fixed event $B$.

::: warning P(A | B) is not P(B | A)
The two conditional probabilities answer different questions and can be wildly different. Almost every professional footballer is male, so $\Prob(\text{male} \mid \text{professional footballer})$ is close to $1$; but $\Prob(\text{professional footballer}\mid\text{male})$ is tiny. Confusing the two, sometimes called the *inverse fallacy*, is behind the diagnostic-test error in the introduction: $\Prob(\text{positive}\mid\text{ill}) = 0.95$, but $\Prob(\text{ill}\mid\text{positive})$ is only about $0.16$. Bayes' theorem, below, is the correct way to turn one into the other.
:::

::: quiz
A card is drawn from a well-shuffled deck. Let $A$ be "the card is a king" and $B$ be "the card is a face card" (jack, queen or king). Which statement is true?
- [ ] $\Prob(A \mid B) = \Prob(B \mid A) = \tfrac13$
- [x] $\Prob(A\mid B) = \tfrac13$ and $\Prob(B\mid A) = 1$
- [ ] $\Prob(A\mid B) = \tfrac{1}{13}$ and $\Prob(B \mid A) = \tfrac{3}{13}$
- [ ] $\Prob(A\mid B) = \tfrac{4}{52}$, because conditioning does not change the probability of a king
::: solution
Here $A \subseteq B$, so $A \cap B = A$. Then $\Prob(A\mid B) = \dfrac{4/52}{12/52} = \dfrac13$: a third of the face cards are kings. And $\Prob(B \mid A) = \dfrac{4/52}{4/52} = 1$: every king is a face card. The two conditional probabilities differ, as they usually do.
:::
:::

## The multiplication rule {#multiplication}

Rearranging [[#eq-conditional]] gives $\Prob(A \cap B) = \Prob(B)\,\Prob(A\mid B)$. This is often the natural way to *compute* the probability of an intersection, because in many experiments conditional probabilities are what we know directly: when cards are dealt one at a time, the chance of the second card given the first is easy to write down. Repeating the argument gives a rule for any number of events.

::: theorem Multiplication rule (chain rule) {#thm-chain-rule}
If $A_1, \ldots, A_n$ are events with $\Prob(A_1 \cap \dots \cap A_{n-1}) > 0$, then

$$
\Prob(A_1 \cap A_2 \cap \dots \cap A_n) = \Prob(A_1)\,\Prob(A_2 \mid A_1)\,\Prob(A_3 \mid A_1\cap A_2)\cdots\Prob(A_n \mid A_1 \cap\dots\cap A_{n-1}).
$$ {#eq-chain}
:::

::: proof
All the conditioning events have positive probability, because $A_1 \supseteq A_1\cap A_2 \supseteq \dots \supseteq A_1\cap\dots\cap A_{n-1}$ and the last has positive probability, so every factor is defined. We use induction on $n$. For $n = 1$ the statement is $\Prob(A_1) = \Prob(A_1)$. Suppose it holds for $n - 1$ events, and write $C = A_1 \cap \dots \cap A_{n-1}$. By the definition of conditional probability, $\Prob(C \cap A_n) = \Prob(C)\,\Prob(A_n \mid C)$, and by the induction hypothesis $\Prob(C)$ equals the product of the first $n - 1$ factors in [[#eq-chain]]. Multiplying by $\Prob(A_n\mid C)$ gives the formula for $n$ events.
:::

::: example Three aces {#ex-three-aces}
Three cards are dealt from a well-shuffled deck. Find the probability that all three are aces.
::: solution
Let $A_i$ be the event that the $i$-th card is an ace. The first card is an ace with probability $\tfrac{4}{52}$. Given that it is, the second is drawn from $51$ cards of which $3$ are aces, so $\Prob(A_2 \mid A_1) = \tfrac{3}{51}$; similarly $\Prob(A_3\mid A_1\cap A_2) = \tfrac{2}{50}$. By the multiplication rule,

$$
\Prob(A_1\cap A_2\cap A_3) = \frac{4}{52}\cdot\frac{3}{51}\cdot\frac{2}{50} = \frac{1}{5525}.
$$

As a check, counting gives the same answer: $\binom43\big/\binom{52}{3} = 4/22\,100 = 1/5525$. The multiplication rule is often the quicker route, and it is the natural one when the experiment happens in stages.
:::
:::

A convenient way to organise such calculations is a **tree diagram**: each stage of the experiment branches according to its possible results, each branch is labelled with its conditional probability given the path so far, and the probability of a complete path is the product of the labels along it.

## Total probability and Bayes' theorem {#bayes}

Often we know how likely an event is under each of several scenarios, and how likely each scenario is. The law of total probability combines this information.

::: definition Partition {#def-partition}
Events $B_1, B_2, \ldots$ (finitely or countably many) form a **partition** of $\Omega$ if they are pairwise disjoint and $\bigcup_i B_i = \Omega$: exactly one of them occurs.
:::

::: theorem Law of total probability {#thm-total-probability}
If $B_1, B_2, \ldots$ is a partition of $\Omega$ with $\Prob(B_i) > 0$ for every $i$, then for every event $A$

$$
\Prob(A) = \sum_i \Prob(A \mid B_i)\,\Prob(B_i).
$$ {#eq-total-probability}
:::

::: proof
The events $A\cap B_i$ are pairwise disjoint (because the $B_i$ are) and their union is $A \cap \bigcup_i B_i = A\cap\Omega = A$. By countable (or finite) additivity and the multiplication rule,

$$
\Prob(A) = \sum_i \Prob(A\cap B_i) = \sum_i \Prob(A\mid B_i)\,\Prob(B_i).
$$
:::

The simplest partition is $\{B, B^c\}$, which gives $\Prob(A) = \Prob(A\mid B)\Prob(B) + \Prob(A\mid B^c)\Prob(B^c)$. In words: the overall probability of $A$ is a weighted average of its conditional probabilities, weighted by how likely each scenario is.

Now reverse the question. Having observed $A$, how likely is each scenario? This is the problem of reasoning from effects back to causes, and its solution is Bayes' theorem.

::: theorem Bayes' theorem {#thm-bayes}
Let $B_1, B_2, \ldots$ be a partition of $\Omega$ with $\Prob(B_i) > 0$ for all $i$, and let $A$ be an event with $\Prob(A) > 0$. Then for each $j$

$$
\Prob(B_j \mid A) = \frac{\Prob(A\mid B_j)\,\Prob(B_j)}{\sum_i \Prob(A\mid B_i)\,\Prob(B_i)}.
$$ {#eq-bayes}
:::

::: proof
By the definition of conditional probability and the multiplication rule, $\Prob(B_j \mid A) = \dfrac{\Prob(B_j\cap A)}{\Prob(A)} = \dfrac{\Prob(A\mid B_j)\Prob(B_j)}{\Prob(A)}$, and the denominator equals the sum in [[#eq-bayes]] by the law of total probability.
:::

In this context $\Prob(B_j)$ is called the **prior** probability of the scenario $B_j$ (before observing $A$), $\Prob(B_j \mid A)$ its **posterior** probability (after observing $A$), and $\Prob(A\mid B_j)$ the **likelihood** of the observation under $B_j$. Bayes' theorem says that the posterior is proportional to likelihood times prior; the denominator just rescales the numbers so that they add up to $1$.

::: example Which machine made the faulty part? {#ex-machines}
A factory has three machines. Machine 1 makes $50\%$ of the output with a defect rate of $1\%$, machine 2 makes $30\%$ with a defect rate of $2\%$, and machine 3 makes $20\%$ with a defect rate of $3\%$. A part chosen at random is defective. Find the probability that it was made by machine 3.
::: solution
Let $M_i$ be the event that the part comes from machine $i$ (a partition) and $D$ the event that it is defective. By the law of total probability,

$$
\Prob(D) = 0.01 \times 0.5 + 0.02\times 0.3 + 0.03 \times 0.2 = 0.005 + 0.006 + 0.006 = 0.017.
$$

By Bayes' theorem,

$$
\Prob(M_3\mid D) = \frac{0.03\times 0.2}{0.017} = \frac{6}{17} \approx 0.353.
$$

Similarly $\Prob(M_1 \mid D) = \tfrac{5}{17}$ and $\Prob(M_2\mid D) = \tfrac{6}{17}$. Machine 3 makes only a fifth of the parts, but more than a third of the defective ones; machine 1 makes half the parts but under a third of the defective ones.
:::
:::

::: example The diagnostic test {#ex-diagnostic}
Solve the problem from the introduction: prevalence $1\%$, **sensitivity** $\Prob(+\mid D) = 0.95$ and **specificity** $\Prob(-\mid D^c) = 0.95$. Find $\Prob(D\mid +)$.
::: solution
Here $D$ is "has the disease" and $+$ is "tests positive". The partition is $\{D, D^c\}$ with $\Prob(D) = 0.01$, and $\Prob(+\mid D^c) = 1 - 0.95 = 0.05$ is the false-positive rate. By Bayes' theorem,

$$
\Prob(D\mid +) = \frac{0.95 \times 0.01}{0.95\times 0.01 + 0.05\times 0.99} = \frac{0.0095}{0.059} = \frac{19}{118} \approx 0.161.
$$

The same calculation in **natural frequencies** is easier to believe. Picture $10\,000$ people: $100$ are ill, of whom $95$ test positive; $9900$ are healthy, of whom $5\%$, that is $495$, also test positive. Of the $95 + 495 = 590$ positives only $95$ are ill, and $95/590 \approx 0.161$. The false positives win because they are a small fraction of a very large group.
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.95
specificity: 0.95
caption: The diagnostic test as natural frequencies. Each dot is a person; the positives are those flagged by the test. Raise the prevalence to $10\%$ and watch $\Prob(\text{ill}\mid +)$ jump to about $0.68$; then return to $1\%$ and raise the specificity to $0.99$. For rare conditions it is the false-positive rate, not the sensitivity, that matters most.
:::

Bayes' theorem is especially transparent in terms of **odds**. The odds on an event $E$ are $\Prob(E)/\Prob(E^c)$; for example, probability $0.2$ corresponds to odds of $0.2/0.8 = 1/4$, "4 to 1 against".

::: proposition Bayes' theorem in odds form {#prop-odds}
Let $D$ be an event with $0 < \Prob(D) < 1$, and $A$ an event with $\Prob(A\mid D^c) > 0$. Then

$$
\frac{\Prob(D\mid A)}{\Prob(D^c\mid A)} = \frac{\Prob(A\mid D)}{\Prob(A\mid D^c)}\cdot\frac{\Prob(D)}{\Prob(D^c)} .
$$

In words: **posterior odds = likelihood ratio × prior odds**.
:::

::: proof
The conditional probabilities on the left are defined, because $\Prob(A) \ge \Prob(A\cap D^c) = \Prob(A\mid D^c)\Prob(D^c) > 0$. Write both posterior probabilities using Bayes' theorem with the partition $\{D, D^c\}$. They have the same denominator $\Prob(A)$, which cancels in the ratio:

$$
\frac{\Prob(D\mid A)}{\Prob(D^c\mid A)} = \frac{\Prob(A\mid D)\Prob(D)/\Prob(A)}{\Prob(A\mid D^c)\Prob(D^c)/\Prob(A)} = \frac{\Prob(A\mid D)}{\Prob(A\mid D^c)}\cdot\frac{\Prob(D)}{\Prob(D^c)}.
$$
:::

For the diagnostic test the prior odds are $1/99$ and the **likelihood ratio** of a positive result is $0.95/0.05 = 19$, so the posterior odds are $19/99$, which is the probability $19/118$ again. The likelihood ratio measures the strength of the evidence, independently of the prior. If a second, independent test (in a sense made precise below) is also positive, the odds are multiplied by $19$ once more: $361/99$, a probability of $361/460 \approx 0.785$.

::: widget plot
f: s*x/(s*x + (1 - t)*(1 - x))
x: 0, 0.3
y: 0, 1
sliders: s=0.95:0.5:1:0.01; t=0.95:0.8:0.999:0.001
labels: P(\text{ill} \mid +)
caption: The probability of illness given a positive test, as a function of the prevalence $x$, for sensitivity $s$ and specificity $t$. At low prevalence the curve rises steeply from $0$: for rare conditions even an excellent test produces mostly false positives. Move $t$ towards $0.999$ and see how much more a positive result then means.
:::

::: warning The base-rate fallacy and the prosecutor's fallacy
Ignoring the prior $\Prob(D)$ — the **base rate** — is the most common error in reasoning about evidence. Its courtroom version is the **prosecutor's fallacy**: "the chance of this evidence if the defendant were innocent is one in a million, so the chance that he is innocent is one in a million". This confuses $\Prob(\text{evidence}\mid\text{innocent})$ with $\Prob(\text{innocent}\mid\text{evidence})$; in a city of ten million people, about ten innocent people would match the evidence. In the English trial of Sally Clark (1999), an expert witness estimated the chance of two sudden infant deaths in one family as about $1$ in $73$ million, by squaring an estimate of $1$ in $8543$ for a single death. The squaring wrongly assumed independence, and the figure was open to being read as the probability of innocence. The Royal Statistical Society publicly criticised the statistical evidence in 2001, and the conviction was overturned in 2003.
:::

::: example The Monty Hall problem {#ex-monty-hall}
In a game show a car is hidden behind one of three doors, equally likely to be behind each, and goats are behind the other two. You pick door 1. The host, who knows where the car is, always opens one of the other two doors to reveal a goat, choosing at random if both hide goats. He opens door 3. Should you switch to door 2?
::: solution
Let $C_i$ be the event that the car is behind door $i$, so $\Prob(C_i) = \tfrac13$, and let $H_3$ be the event that the host opens door 3. Under the stated rules,

$$
\Prob(H_3 \mid C_1) = \tfrac12, \qquad \Prob(H_3\mid C_2) = 1, \qquad \Prob(H_3\mid C_3) = 0,
$$

because if the car is behind door 1 the host chooses at random between doors 2 and 3, if it is behind door 2 he is forced to open door 3, and he never reveals the car. By Bayes' theorem,

$$
\Prob(C_2\mid H_3) = \frac{1 \cdot \tfrac13}{\tfrac12\cdot\tfrac13 + 1\cdot\tfrac13 + 0\cdot\tfrac13} = \frac{1/3}{1/2} = \frac23 .
$$

So switching wins with probability $\tfrac23$ and staying with probability $\tfrac13$. The intuition: your first choice is right with probability $\tfrac13$, and nothing the host does can change that, since he can always open a goat door; the remaining $\tfrac23$ is concentrated on the one door he leaves closed. The answer depends on the host's rules. If he opened one of the other doors *at random* and happened to reveal a goat, switching would win with probability only $\tfrac12$ (see the exercises).
:::
:::

::: remark Simpson's paradox
The law of total probability expresses an overall rate as a weighted average of rates in subgroups, and different weights can reverse a comparison. A frequently quoted 1986 study of kidney-stone treatments reported success rates of $78\%$ ($273/350$) for treatment A and $83\%$ ($289/350$) for treatment B, so B looked better overall. Yet A was better for small stones ($81/87 \approx 93\%$ against $234/270 \approx 87\%$) *and* for large stones ($192/263 \approx 73\%$ against $55/80 \approx 69\%$). The explanation is that A was used mostly on the harder, large stones. A comparison that ignores such a **confounding** variable can point the wrong way; we return to this in [[statistics/regression]].
:::

::: quiz
A rare condition affects $1$ person in $1000$. A screening test has sensitivity $99\%$ and a false-positive rate of $2\%$. Roughly what proportion of people who test positive have the condition?
- [ ] About $99\%$
- [ ] About $50\%$
- [x] About $5\%$
- [ ] About $0.1\%$
::: solution
In $100\,000$ people, $100$ have the condition and about $99$ of them test positive, while about $2\%$ of the $99\,900$ others, roughly $1998$, also test positive. So $\Prob(\text{condition}\mid +) \approx 99/(99 + 1998) \approx 0.047$. The answer $99\%$ is the sensitivity — the base-rate fallacy in action.
:::
:::

## Independence {#independence}

Sometimes learning that $B$ occurred does not change the probability of $A$ at all: $\Prob(A\mid B) = \Prob(A)$. Multiplying by $\Prob(B)$ turns this into a symmetric condition that also makes sense when $\Prob(B) = 0$.

::: definition Independence of two events {#def-independent}
Events $A$ and $B$ are **independent** if

$$
\Prob(A\cap B) = \Prob(A)\,\Prob(B).
$$

When $\Prob(B) > 0$ this is equivalent to $\Prob(A\mid B) = \Prob(A)$, and when $\Prob(A) > 0$ to $\Prob(B \mid A) = \Prob(B)$.
:::

For example, for two fair dice the events "the red die shows $6$" and "the blue die shows an even number" are independent: the intersection has $3$ of the $36$ outcomes, and $\tfrac{3}{36} = \tfrac16\cdot\tfrac12$. Less obviously, "the total is $7$" and "the red die shows $6$" are also independent: $\Prob(\text{total } 7 \mid \text{red } 6) = \tfrac16 = \Prob(\text{total } 7)$. (The total $8$ is a different story: see the exercises.) Independence is a numerical property of the probability measure, and it need not correspond to any physical separation.

If knowing that $B$ occurred tells us nothing about $A$, then knowing that $B$ did *not* occur should tell us nothing either.

::: theorem Independence and complements {#thm-indep-complements}
If $A$ and $B$ are independent, then so are $A$ and $B^c$, $A^c$ and $B$, and $A^c$ and $B^c$.
:::

::: proof
$A$ is the disjoint union of $A\cap B$ and $A\cap B^c$, so

$$
\Prob(A\cap B^c) = \Prob(A) - \Prob(A\cap B) = \Prob(A) - \Prob(A)\Prob(B) = \Prob(A)\bigl(1 - \Prob(B)\bigr) = \Prob(A)\,\Prob(B^c).
$$

So $A$ and $B^c$ are independent. Exchanging the roles of $A$ and $B$ shows that $A^c$ and $B$ are independent, and applying the first statement to the independent pair $A^c, B$ shows that $A^c$ and $B^c$ are independent.
:::

::: warning Independent is not the same as mutually exclusive
If $A$ and $B$ are mutually exclusive and both have positive probability, they are *dependent*: $\Prob(A\cap B) = 0 \ne \Prob(A)\Prob(B)$. Indeed, learning that $B$ occurred tells you for certain that $A$ did not, which is as far from "no information" as possible. Mutually exclusive events cannot happen together; independent events happen together exactly as often as chance alone predicts.
:::

For more than two events, independence must be required of every subfamily.

::: definition Mutual independence {#def-mutual}
Events $A_1, A_2, \ldots, A_n$ are (**mutually**) **independent** if for every choice of distinct indices $i_1 < i_2 < \dots < i_k$ (with $2 \le k \le n$)

$$
\Prob(A_{i_1}\cap A_{i_2}\cap\dots\cap A_{i_k}) = \Prob(A_{i_1})\,\Prob(A_{i_2})\cdots\Prob(A_{i_k}).
$$

An infinite family of events is independent if every finite subfamily is. The events are **pairwise independent** if the condition holds for $k = 2$, that is, for every pair.
:::

For three events this means four equations: one for each of the three pairs and one for the triple. The next example shows that the pairwise equations do not imply the last one.

::: example Pairwise but not mutually independent {#ex-pairwise}
Toss two fair coins. Let $A$ be "the first coin shows heads", $B$ "the second coin shows heads" and $C$ "the two coins show the same face". Show that $A$, $B$, $C$ are pairwise independent but not mutually independent.
::: solution
The four outcomes $HH, HT, TH, TT$ are equally likely, and $A = \{HH, HT\}$, $B = \{HH, TH\}$, $C = \{HH, TT\}$ each have probability $\tfrac12$. Each pairwise intersection is $\{HH\}$, of probability $\tfrac14 = \tfrac12\cdot\tfrac12$, so the three pairs are independent. But

$$
\Prob(A\cap B\cap C) = \Prob(\{HH\}) = \tfrac14 \neq \tfrac18 = \Prob(A)\Prob(B)\Prob(C).
$$

Any two of the events determine the third (if both coins show heads, they agree), so the triple is far from independent.
:::
:::

The most important source of independent events is **repeated trials**: tossing a coin many times, testing components from a production line, sampling with replacement. We model such experiments by declaring events that depend on different trials to be independent; the probability of a sequence of results is then the product of the probabilities of the individual results. If each trial is a "success" with probability $p$, the probability of at least one success in $n$ independent trials is, by the complement rule and independence of the complements,

$$
1 - (1-p)^n .
$$ {#eq-at-least-one}

This is the calculation of the Chevalier de Méré's bets in [[probability/probability-spaces]], now justified for any experiment made of independent stages.

::: example Reliability of a system {#ex-reliability}
A system has three components that work independently, each with probability $0.9$. Component 1 is in series with a parallel pair formed by components 2 and 3: the system works if component 1 works *and* at least one of components 2 and 3 works. Find the probability that the system works.
::: solution
Let $W_i$ be the event that component $i$ works. The parallel pair fails only if both fail, which by independence (of the complements, [[#thm-indep-complements]]) has probability $0.1 \times 0.1 = 0.01$; so it works with probability $0.99$. The event "pair works" is built from $W_2$ and $W_3$ only, and is independent of $W_1$ (events determined by disjoint groups of independent events are independent; see the exercises for a special case). Hence

$$
\Prob(\text{system works}) = \Prob(W_1)\,\Prob(W_2\cup W_3) = 0.9\times 0.99 = 0.891.
$$

Duplicating component 2 has raised the reliability of that stage from $0.9$ to $0.99$; the system is now limited by the single component 1.
:::
:::

Finally, independence can hold *conditionally* on some information while failing unconditionally, and vice versa.

::: definition Conditional independence {#def-cond-indep}
Events $A$ and $B$ are **conditionally independent given** an event $C$ with $\Prob(C) > 0$ if $\Prob(A\cap B\mid C) = \Prob(A\mid C)\,\Prob(B\mid C)$.
:::

Two runs of the diagnostic test of [[#ex-diagnostic]] are usually modelled as conditionally independent given the patient's true status: given that you are ill, each run is positive with probability $0.95$, independently; given that you are well, each is positive with probability $0.05$. This is what justified multiplying the odds by $19$ twice. But the two results are *not* independent unconditionally: by the law of total probability

$$
\Prob(\text{both } +) = 0.01\times0.95^2 + 0.99\times 0.05^2 = 0.0115, \qquad \text{while} \qquad \Prob(+)^2 = 0.059^2 \approx 0.0035.
$$

A first positive result makes illness more likely, which in turn makes a second positive result more likely. Information flows between the two results through the hidden status of the patient.

::: quiz
A fair die is rolled once. Let $A = \{2, 4, 6\}$ ("even") and $B = \{1, 2, 3, 4\}$. Are $A$ and $B$ independent?
- [x] Yes
- [ ] No, because they overlap
- [ ] No, because $B$ contains more outcomes than $A$
- [ ] It cannot be decided without repeating the experiment
::: solution
$\Prob(A) = \tfrac12$, $\Prob(B) = \tfrac23$ and $A\cap B = \{2,4\}$ has probability $\tfrac13 = \tfrac12\cdot\tfrac23$. So they are independent, even though both concern the same roll. Equivalently, $\Prob(A \mid B) = \tfrac{2}{4} = \tfrac12 = \Prob(A)$: half of the outcomes in $B$ are even, just as half of all outcomes are.
:::
:::

::: history
The theorem named after the Reverend Thomas Bayes appeared in "An essay towards solving a problem in the doctrine of chances", found among his papers after his death in 1761 and published by his friend Richard Price in the *Philosophical Transactions of the Royal Society* in 1763. Bayes was concerned with inferring the unknown chance of an event from the number of times it had occurred. Pierre-Simon Laplace, apparently unaware of Bayes's essay, stated the principle of "the probability of causes from events" in a memoir of 1774 and developed it into a general method of inference, which became known as **inverse probability**. The Monty Hall problem was posed by the statistician Steve Selvin in letters to *The American Statistician* in 1975 and became famous in 1990, when Marilyn vos Savant's correct answer in her magazine column *Ask Marilyn* drew thousands of letters, many of them from readers with doctorates, insisting that she was wrong.
:::

## Where this leads {#where-next}

Conditioning is the main tool of probability. In [[probability/discrete-random-variables]] repeated independent trials give the binomial and geometric distributions; independence of random variables appears in [[probability/joint-distributions]]; conditioning on a random variable leads to conditional expectation in [[probability/expectation]]; and the Markov property of [[probability/markov-chains]] is a statement about conditional probabilities. Bayes' theorem, applied to unknown parameters instead of events, is the foundation of [[statistics/bayesian]].

::: summary
- $\Prob(A\mid B) = \Prob(A\cap B)/\Prob(B)$ restricts the sample space to $B$ and renormalises; for fixed $B$ it is a probability measure ([[#thm-cond-measure]]).
- Multiplication rule: $\Prob(A_1\cap\dots\cap A_n) = \Prob(A_1)\Prob(A_2\mid A_1)\cdots$, the natural tool for experiments in stages and tree diagrams.
- Law of total probability: $\Prob(A) = \sum_i \Prob(A\mid B_i)\Prob(B_i)$ over a partition.
- Bayes' theorem turns $\Prob(A\mid B_j)$ into $\Prob(B_j\mid A)$: posterior $\propto$ likelihood $\times$ prior, or posterior odds $=$ likelihood ratio $\times$ prior odds.
- Never ignore the base rate: $\Prob(A\mid B)$ and $\Prob(B\mid A)$ can be very different.
- $A$, $B$ independent means $\Prob(A\cap B) = \Prob(A)\Prob(B)$; it is preserved by taking complements and is quite different from being mutually exclusive.
- Mutual independence of several events requires the product rule for every subfamily; pairwise independence is weaker, and conditional independence neither implies nor follows from independence.
:::

## Exercises

::: exercise A conditional probability {level=1 check="1/2"}
Events $A$ and $B$ have $\Prob(A) = 0.5$, $\Prob(B) = 0.4$ and $\Prob(A\cap B) = 0.2$. Find $\Prob(A\mid B)$, and decide whether $A$ and $B$ are independent.
::: solution
$\Prob(A\mid B) = 0.2/0.4 = 0.5$. Since this equals $\Prob(A)$ (equivalently $0.2 = 0.5\times0.4$), the events are independent.
:::
:::

::: exercise Three hearts {level=1 check="11/850"}
Three cards are dealt from a well-shuffled deck. Find the probability that all three are hearts.
::: solution
By the multiplication rule, $\dfrac{13}{52}\cdot\dfrac{12}{51}\cdot\dfrac{11}{50} = \dfrac{1716}{132\,600} = \dfrac{11}{850} \approx 0.0129$.
:::
:::

::: exercise Total 8 and a six {level=1}
Two fair dice are rolled. Are the events "the total is $8$" and "the red die shows $6$" independent?
::: solution
$\Prob(\text{total } 8) = \tfrac{5}{36}$, $\Prob(\text{red } 6) = \tfrac16$, and the intersection is $\{(6,2)\}$ with probability $\tfrac{1}{36}$. Since $\tfrac{5}{36}\cdot\tfrac{1}{6} = \tfrac{5}{216} \ne \tfrac{1}{36}$, they are not independent: $\Prob(\text{total } 8\mid\text{red } 6) = \tfrac16 > \tfrac{5}{36}$. (Contrast the total $7$, which is reachable whatever the red die shows.)
:::
:::

::: exercise Two urns {level=2 check="3/4"}
Urn I contains $3$ red and $2$ blue balls; urn II contains $1$ red and $4$ blue balls. A fair coin is tossed to choose an urn and a ball is drawn from it. The ball is red. What is the probability that it came from urn I?
::: solution
By Bayes' theorem with the partition $\{\text{I}, \text{II}\}$,

$$
\Prob(\text{I}\mid\text{red}) = \frac{\tfrac35\cdot\tfrac12}{\tfrac35\cdot\tfrac12 + \tfrac15\cdot\tfrac12} = \frac{3/10}{4/10} = \frac34 .
$$
:::
:::

::: exercise A spam filter {level=2 check="25/28"}
Of all email arriving at an address, $40\%$ is spam. The word "free" appears in $25\%$ of spam messages and in $2\%$ of other messages. Find the probability that a message containing "free" is spam.
::: solution
With $S$ = spam and $W$ = contains "free",

$$
\Prob(S\mid W) = \frac{0.25\times0.4}{0.25\times0.4 + 0.02\times0.6} = \frac{0.1}{0.112} = \frac{25}{28} \approx 0.893.
$$

In odds form: prior odds $0.4/0.6 = \tfrac23$, likelihood ratio $0.25/0.02 = 12.5$, posterior odds $\tfrac{25}{3}$, probability $\tfrac{25}{28}$. Naive Bayes spam filters combine many such likelihood ratios, one per word, by assuming conditional independence of the words given the class.
:::
:::

::: exercise How many positive tests? {level=2 check="4"}
For the test of [[#ex-diagnostic]] (prevalence $1\%$, sensitivity and specificity $95\%$), assume repeated tests are conditionally independent given the patient's status. What is the smallest number of consecutive positive results after which the probability of illness exceeds $0.99$?
::: hint
Use the odds form: each positive result multiplies the odds by $19$.
:::
::: solution
After $k$ positive results the odds are $19^k/99$. Probability above $0.99$ means odds above $99$, so we need $19^k > 99^2 = 9801$, that is $k > \ln 9801/\ln 19 \approx 3.12$. Hence $k = 4$. (Three positives give probability $0.9858$; four give $0.9992$.)
:::
:::

::: exercise Independence and unions {level=2}
Suppose $A$ is independent of $B$, $A$ is independent of $C$, and $B \cap C = \varnothing$. Prove that $A$ is independent of $B\cup C$.
::: solution
Since $B$ and $C$ are disjoint, so are $A\cap B$ and $A\cap C$, and $A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$. Therefore

$$
\Prob\bigl(A\cap(B\cup C)\bigr) = \Prob(A)\Prob(B) + \Prob(A)\Prob(C) = \Prob(A)\bigl(\Prob(B) + \Prob(C)\bigr) = \Prob(A)\,\Prob(B\cup C).
$$

(Without the disjointness assumption the conclusion can fail: in [[#ex-pairwise]], $C$ is independent of $A$ and of $B$, but $\Prob(C \cap (A\cup B)) = \tfrac14$ while $\Prob(C)\Prob(A\cup B) = \tfrac12\cdot\tfrac34 = \tfrac38$.)
:::
:::

::: exercise A careless host {level=3 check="1/2"}
In the Monty Hall game, suppose the host does not know where the car is: he opens one of the two doors you did not choose at random, each with probability $\tfrac12$. You choose door 1, and he happens to open door 3, revealing a goat. What is the probability that switching to door 2 wins?
::: solution
Let $G$ be the event "host opens door 3 and reveals a goat". Now $\Prob(G\mid C_1) = \tfrac12$, $\Prob(G\mid C_2) = \tfrac12$ (he opens door 3 with probability $\tfrac12$, and it hides a goat) and $\Prob(G\mid C_3) = 0$. By Bayes' theorem

$$
\Prob(C_2\mid G) = \frac{\tfrac12\cdot\tfrac13}{\tfrac12\cdot\tfrac13+\tfrac12\cdot\tfrac13 + 0} = \frac12 .
$$

Switching and staying are now equally good. The difference from [[#ex-monty-hall]] is that a careless host who reveals a goat has given you information about door 1 as well: had the car been behind door 2 or door 3, he would have had a chance of revealing it.
:::
:::

::: exercise Positive association is symmetric {level=3}
Let $A$ and $B$ be events with $\Prob(A) > 0$ and $\Prob(B) > 0$. Prove that $\Prob(A\mid B) > \Prob(A)$ if and only if $\Prob(B\mid A) > \Prob(B)$. Deduce that if $\Prob(A \mid B) > \Prob(A)$ and $\Prob(B) < 1$, then $\Prob(A\mid B^c) < \Prob(A)$.
::: hint
Both inequalities are equivalent to $\Prob(A\cap B) > \Prob(A)\Prob(B)$. For the second part, use the law of total probability.
:::
::: solution
Multiplying by $\Prob(B) > 0$, the inequality $\Prob(A\mid B) > \Prob(A)$ is equivalent to $\Prob(A\cap B) > \Prob(A)\Prob(B)$. Multiplying by $\Prob(A) > 0$, so is $\Prob(B\mid A) > \Prob(B)$. Hence the two are equivalent.

For the second part, the law of total probability gives

$$
\Prob(A) = \Prob(A\mid B)\Prob(B) + \Prob(A\mid B^c)\bigl(1 - \Prob(B)\bigr),
$$

so $\Prob(A)$ is a weighted average of $\Prob(A\mid B)$ and $\Prob(A\mid B^c)$ with weights $\Prob(B)$ and $1 - \Prob(B)$, both positive. An average lies strictly between two unequal numbers; since $\Prob(A\mid B) > \Prob(A)$, we must have $\Prob(A\mid B^c) < \Prob(A)$. If evidence $B$ would raise your belief in $A$, then its absence must lower it.
:::
:::

::: exercise Complements of independent events {level=3}
Prove that if $A_1, \ldots, A_n$ are mutually independent, then so are $A_1^c, A_2, \ldots, A_n$. Deduce that replacing any of the events by their complements preserves mutual independence, and that $\Prob(A_1\cup\dots\cup A_n) = 1 - \prod_{i=1}^n \bigl(1 - \Prob(A_i)\bigr)$.
::: solution
Take any subfamily. If it does not contain $A_1^c$, the product rule holds by assumption. Otherwise it is $A_1^c, A_{i_1}, \ldots, A_{i_k}$ with $2 \le i_1 < \dots < i_k$; let $C = A_{i_1}\cap\dots\cap A_{i_k}$, so $\Prob(C) = \prod_j \Prob(A_{i_j})$ and $\Prob(A_1 \cap C) = \Prob(A_1)\Prob(C)$ by independence. Then

$$
\Prob(A_1^c\cap C) = \Prob(C) - \Prob(A_1\cap C) = \bigl(1 - \Prob(A_1)\bigr)\Prob(C) = \Prob(A_1^c)\prod_{j=1}^k\Prob(A_{i_j}).
$$

So $A_1^c, A_2, \ldots, A_n$ are mutually independent. Since the definition is symmetric in the events, the same argument complements any one event, and repeating it complements any set of them. In particular $A_1^c, \ldots, A_n^c$ are independent, and by De Morgan's law

$$
\Prob\Bigl(\bigcup_i A_i\Bigr) = 1 - \Prob\Bigl(\bigcap_i A_i^c\Bigr) = 1 - \prod_{i=1}^n\bigl(1 - \Prob(A_i)\bigr).
$$
:::
:::
