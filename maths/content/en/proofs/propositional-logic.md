Here is a puzzle that most people get wrong. Four cards lie on a table. Each card has a letter on one side and a number on the other, and the visible faces are

$$
\boxed{\;\text{A}\;}\qquad\boxed{\;\text{K}\;}\qquad\boxed{\;4\;}\qquad\boxed{\;7\;}
$$

Someone claims: *if a card has a vowel on one side, then it has an even number on the other side.* Which cards must you turn over to find out whether the claim is true for these four cards?

Most people choose A and 4, or A alone. The correct answer is **A and 7**, for reasons we will see in [[#converse-contrapositive]]. The puzzle was devised by the psychologist Peter Wason in 1966, and it shows that our everyday feeling for the word "if" is unreliable.

Mathematics cannot afford that. A proof is a chain of statements in which each follows from the previous ones, and to check such a chain we must know exactly what words like *not*, *and*, *or* and *if … then* mean. In this chapter we make those words precise with truth tables, learn to decide when two statements say the same thing, identify the forms of argument that are valid, and prove that a handful of connectives suffice to express every logical combination. The next chapter, [[proofs/quantifiers]], adds *for all* and *there exists*; together they form the language in which every later course is written.

## Propositions

::: definition Proposition {#def-proposition}
A **proposition** (or **statement**) is a declarative sentence that is either true or false, but not both. Its **truth value** is T if it is true and F if it is false.
:::

For example, "$7$ is a prime number" is a true proposition and "$2 + 2 = 5$" a false one. "Every even integer greater than $2$ is the sum of two primes" (Goldbach's conjecture of 1742) is a proposition although nobody knows whether it is true: being a proposition is a matter of *having* a truth value, not of our knowing it. On the other hand, "Is $7$ prime?" and "Let $x = 3$" are not propositions, and neither is "$x^2 > 4$", which is true for some $x$ and false for others — it is a *predicate*, the subject of [[proofs/quantifiers]]. Nor is "this sentence is false": if it were true it would be false, and vice versa. Such self-referential sentences (the *liar paradox*) are excluded.

**Propositional logic** studies how the truth value of a compound statement depends on the truth values of its parts, regardless of what the parts are about. We use letters $p, q, r, \dots$, called **propositional variables**, to stand for arbitrary propositions, and build **formulas** such as $(p \land q) \Rightarrow \neg r$ from them using the connectives defined next.

## Connectives and truth tables

There are five basic ways of combining propositions. Each is defined by a **truth table**, listing the truth value of the compound for every combination of truth values of its parts.

::: definition The logical connectives {#def-connectives}
Let $p$ and $q$ be propositions.

- The **negation** $\neg p$ ("not $p$") is true when $p$ is false, and false when $p$ is true.
- The **conjunction** $p \land q$ ("$p$ and $q$") is true when both $p$ and $q$ are true, and false otherwise.
- The **disjunction** $p \lor q$ ("$p$ or $q$") is true when at least one of $p$, $q$ is true, and false when both are false.
- The **implication** or **conditional** $p \Rightarrow q$ ("if $p$ then $q$") is false when $p$ is true and $q$ is false, and true otherwise. Here $p$ is the **hypothesis** (or antecedent) and $q$ the **conclusion** (or consequent).
- The **biconditional** $p \Leftrightarrow q$ ("$p$ if and only if $q$") is true when $p$ and $q$ have the same truth value, and false otherwise.

In table form:

| $p$ | $q$ | $\neg p$ | $p \land q$ | $p \lor q$ | $p \Rightarrow q$ | $p \Leftrightarrow q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |
:::

A few comments on how these match ordinary language.

- **Conjunction.** "$7$ is prime *but* $9$ is not" is logically a conjunction; words like "but" and "although" add a flavour of contrast that logic ignores.
- **Disjunction.** In mathematics "or" is always **inclusive**: "$n$ is even or $n$ is a multiple of $3$" is true for $n = 6$. Everyday English sometimes means the **exclusive or** ("soup or salad" on a set menu), which we write $p \oplus q$: true when exactly one of $p, q$ is true. When a mathematician means "exactly one", they say so.
- **Biconditional.** "If and only if" is abbreviated **iff**. The statement $p \Leftrightarrow q$ says that $p$ and $q$ stand or fall together.
- **Implication** is the subtle one, and has a section of its own below.

To save brackets we use the convention that $\neg$ binds most tightly, then $\land$ and $\lor$, then $\Rightarrow$ and $\Leftrightarrow$. So $\neg p \land q$ means $(\neg p)\land q$, and $p \land q \Rightarrow r$ means $(p\land q)\Rightarrow r$. A mixture such as $p \land q \lor r$ is ambiguous, and we always bracket it.

### Truth tables of compound formulas

To find the truth table of a compound formula, list every combination of truth values of its variables and work outwards from the innermost parts, one column per subformula. A formula with $n$ variables needs $2^n$ rows, since each variable independently takes one of two values (the product rule of [[discrete/counting]]); by convention the first variable alternates in blocks of $2^{n-1}$ rows and the last alternates every row.

::: example Exclusive or from the basic connectives {#ex-xor}
Construct the truth table of $(p \lor q) \land \neg(p \land q)$ and describe in words when it is true.
::: solution
We add a column for each subformula, working from the inside out:

| $p$ | $q$ | $p \lor q$ | $p \land q$ | $\neg(p \land q)$ | $(p\lor q)\land\neg(p\land q)$ |
|---|---|---|---|---|---|
| T | T | T | T | F | F |
| T | F | T | F | T | T |
| F | T | T | F | T | T |
| F | F | F | F | T | F |

The formula is true exactly when one of $p$, $q$ is true and the other false: it expresses the exclusive or $p \oplus q$, "$p$ or $q$, but not both", with $\neg(p\land q)$ saying "but not both".
:::
:::

::: widget truthtable
formula: (p | q) & ~(p & q)
compare: p xor q
caption: The table builds the formula column by column, then compares it with $p \oplus q$: the final columns agree in every row, so the two formulas are logically equivalent. Edit the first formula to $p \lor q$ and watch the first row become the only disagreement — that row is the whole difference between inclusive and exclusive "or".
:::

### Translating English into symbols

Much of the work in using logic is translation: choose a variable for each simple statement, then identify the connectives.

::: example Rain and umbrellas {#ex-translate}
Let $p$ be "it is raining", $q$ be "I take an umbrella" and $r$ be "I get wet". Translate:

1. If it is raining and I don't take an umbrella, then I get wet.
2. I get wet only if it is raining.
3. Taking an umbrella is sufficient for not getting wet.
4. I don't get wet unless it is raining.
::: solution
1. The hypothesis is the conjunction "raining and no umbrella": $(p \land \neg q) \Rightarrow r$.
2. "$A$ only if $B$" means that $A$ cannot happen without $B$: whenever $A$ is true, $B$ is true. So this is $r \Rightarrow p$. (It is *not* $p \Rightarrow r$: it does not say that rain makes me wet.)
3. "$A$ is sufficient for $B$" means $A \Rightarrow B$, so this is $q \Rightarrow \neg r$.
4. "$A$ unless $B$" means "if not $B$, then $A$". Here $A$ is "I don't get wet", so we get $\neg p \Rightarrow \neg r$. We will see in [[#thm-contrapositive]] that this is logically equivalent to sentence 2: two different English sentences, one logical content.
:::
:::

## The meaning of implication

Why should $p \Rightarrow q$ be *true* when $p$ is false? Consider a statement we certainly want to count as true:

$$
\text{for every integer } n:\quad \text{if } n \text{ is divisible by } 4, \text{ then } n \text{ is even.}
$$

Test it on particular integers. For $n = 8$ the hypothesis and conclusion are both true (row T, T). For $n = 6$ the hypothesis is false but the conclusion true (row F, T). For $n = 3$ both are false (row F, F). If the implications for $n = 6$ and $n = 3$ were false, our perfectly good statement would be false. The only row that can refute an implication is "hypothesis true, conclusion false" — and no integer is divisible by $4$ without being even. The truth table of $\Rightarrow$ is forced on us by the way mathematicians use "if … then" with variables.

Another way to see it: $p \Rightarrow q$ is a *promise*. "If you finish the problem sheet, I'll buy you a coffee" is broken only if you finish and I don't pay up. If you don't finish, the promise is kept whatever I do.

When $p$ is false, $p \Rightarrow q$ is said to be **vacuously true**. For example, "if $2 + 2 = 5$ then the Moon is made of cheese" is true. This sounds odd only because in conversation "if … then" suggests a causal link; the logical implication asserts only that the combination "$p$ true, $q$ false" does not occur.

There are many ways of saying $p \Rightarrow q$ in English, and you should be able to recognise them all:

| English | Symbols |
|---|---|
| if $p$, then $q$; $p$ implies $q$; $q$ if $p$; $q$ whenever $p$ | $p \Rightarrow q$ |
| $p$ only if $q$ | $p \Rightarrow q$ |
| $p$ is sufficient for $q$; $q$ is necessary for $p$ | $p \Rightarrow q$ |
| not $p$ unless $q$ (if not $q$, then not $p$) | $\neg q \Rightarrow \neg p$, equivalently $p \Rightarrow q$ |
| $p$ if and only if $q$; $p$ is necessary and sufficient for $q$ | $p \Leftrightarrow q$ |

The phrase "only if" causes the most trouble. "$p$ only if $q$" says that $p$ can be true only when $q$ is true; so if $p$ is true, $q$ must be true. That is $p \Rightarrow q$, the same as "if $p$ then $q$" — the word "only" reverses the direction of "if".

::: quiz
For which truth values of $p$ and $q$ is the statement "$p$ only if $q$" false?
- [ ] $p$ false and $q$ true
- [x] $p$ true and $q$ false
- [ ] $p$ and $q$ both false
- [ ] It is never false
::: solution
"$p$ only if $q$" means $p \Rightarrow q$, which is false exactly in the row where the hypothesis $p$ is true and the conclusion $q$ is false. In every other row it is true (vacuously so when $p$ is false).
:::
:::

## Logical equivalence and the laws of logic

Some formulas are true however the truth values of their variables are chosen. Others say the same thing as each other in different words. Both ideas are central to proofs.

::: definition Tautology and contradiction {#def-tautology}
A formula is a **tautology** if it is true for every assignment of truth values to its variables, and a **contradiction** if it is false for every assignment. A formula that is neither is **contingent**.
:::

The formula $p \lor \neg p$ is a tautology (the *law of excluded middle*: every proposition is true or false), and $p \land \neg p$ is a contradiction. The formula $p \Rightarrow q$ is contingent.

::: definition Logical equivalence {#def-equivalent}
Two formulas $P$ and $Q$ are **logically equivalent**, written $P \equiv Q$, if they have the same truth value for every assignment of truth values to their variables. Equivalently, $P \equiv Q$ means that $P \Leftrightarrow Q$ is a tautology.
:::

Note that $\equiv$ is not a connective: $P \Leftrightarrow Q$ is a formula, true or false depending on the variables, while $P \equiv Q$ is a claim *about* two formulas. Equivalent statements are interchangeable in any argument, so a hard statement may be replaced by an easier equivalent one — the basis of several techniques in [[proofs/proof-techniques]].

The single most useful pair of equivalences tells us how to negate "and" and "or".

::: theorem De Morgan's laws {#thm-de-morgan}
For all propositions $p$ and $q$,

$$
\neg(p \land q) \equiv \neg p \lor \neg q \qquad\text{and}\qquad \neg(p \lor q) \equiv \neg p \land \neg q.
$$
:::

::: proof
We compare truth tables, with one row for each of the four assignments:

| $p$ | $q$ | $\neg(p\land q)$ | $\neg p \lor \neg q$ | $\neg(p\lor q)$ | $\neg p \land \neg q$ |
|---|---|---|---|---|---|
| T | T | F | F | F | F |
| T | F | T | T | F | F |
| F | T | T | T | F | F |
| F | F | T | T | T | T |

The third and fourth columns agree in every row, and so do the fifth and sixth. Hence both equivalences hold.
:::

In words: "not both" means "at least one is not", and "neither" means "both are not". The negation of "$x > 0$ and $y > 0$" is "$x \le 0$ or $y \le 0$" — *not* "$x \le 0$ and $y \le 0$".

::: widget truthtable
formula: ~(p & q)
compare: ~p | ~q
caption: The two final columns agree in all four rows: this is De Morgan's law. Now change the second formula to the tempting but wrong $\neg p \land \neg q$ (type ~p & ~q) and find the rows where the "law" fails.
:::

De Morgan's laws are part of a longer list of standard equivalences. In the table, $\top$ denotes any tautology and $\bot$ any contradiction.

::: theorem Laws of propositional logic {#thm-laws}
For all propositions $p$, $q$, $r$:

| law | equivalences |
|---|---|
| commutative | $p \land q \equiv q \land p$, $\quad p \lor q \equiv q \lor p$ |
| associative | $(p \land q) \land r \equiv p \land (q \land r)$, $\quad (p \lor q) \lor r \equiv p \lor (q \lor r)$ |
| distributive | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$, $\quad p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ |
| identity | $p \land \top \equiv p$, $\quad p \lor \bot \equiv p$ |
| domination | $p \lor \top \equiv \top$, $\quad p \land \bot \equiv \bot$ |
| idempotent | $p \land p \equiv p$, $\quad p \lor p \equiv p$ |
| double negation | $\neg\neg p \equiv p$ |
| complement | $p \lor \neg p \equiv \top$, $\quad p \land \neg p \equiv \bot$ |
| absorption | $p \land (p \lor q) \equiv p$, $\quad p \lor (p \land q) \equiv p$ |
| implication | $p \Rightarrow q \equiv \neg p \lor q$ |
| biconditional | $p \Leftrightarrow q \equiv (p \Rightarrow q) \land (q \Rightarrow p)$ |
:::

::: proof
Each law can be checked with a truth table of at most eight rows. A quicker method, which also explains *why* the laws hold, is to split into cases according to the value of one variable. We illustrate with the less obvious ones.

*Distributive law (first form).* If $p$ is false, both $p \land (q\lor r)$ and $(p\land q)\lor(p\land r)$ are false. If $p$ is true, then $p \land (q \lor r)$ has the value of $q \lor r$, and $(p\land q)\lor(p\land r)$ has the value of $q \lor r$ too. The two sides agree in all cases. The second form is proved the same way: if $p$ is true both sides are true, and if $p$ is false both sides have the value of $q \land r$.

*Absorption.* If $p$ is true, $p \lor q$ is true, so $p \land (p\lor q)$ is true; if $p$ is false, $p \land (p \lor q)$ is false. Either way it has the value of $p$. Similarly, if $p$ is true then $p \lor (p\land q)$ is true, and if $p$ is false then $p\land q$ is false and so is $p\lor(p\land q)$.

*Implication.* $\neg p \lor q$ is false only when $\neg p$ and $q$ are both false, that is, when $p$ is true and $q$ is false — exactly the row in which $p \Rightarrow q$ is false.

*Biconditional.* $(p \Rightarrow q)\land(q\Rightarrow p)$ is false exactly when one of the implications fails, that is, when one of $p, q$ is true and the other false — exactly when $p \Leftrightarrow q$ is false.

The remaining laws follow directly from the definitions of the connectives.
:::

::: remark Algebra with equivalences
We may calculate with these laws as with algebraic identities. In any equivalence we may **substitute** formulas for the variables (from De Morgan, $\neg\bigl((a \lor b) \land c\bigr) \equiv \neg(a\lor b) \lor \neg c$), and **replacing** a part of a formula by an equivalent one gives an equivalent formula, because the truth value of the whole depends only on the truth values of its parts. By associativity we may write $p \land q \land r$ without brackets.
:::

::: example Simplifying a formula {#ex-simplify}
Show that $\neg\bigl(p \lor (\neg p \land q)\bigr) \equiv \neg p \land \neg q$.
::: solution
We apply the laws one step at a time, naming each:

$$
\begin{aligned}
\neg\bigl(p \lor (\neg p \land q)\bigr) &\equiv \neg p \land \neg(\neg p \land q) && \text{De Morgan}\\
&\equiv \neg p \land (\neg\neg p \lor \neg q) && \text{De Morgan}\\
&\equiv \neg p \land (p \lor \neg q) && \text{double negation}\\
&\equiv (\neg p \land p) \lor (\neg p \land \neg q) && \text{distributive}\\
&\equiv \bot \lor (\neg p \land \neg q) && \text{complement (and commutativity)}\\
&\equiv \neg p \land \neg q && \text{commutativity, identity.}
\end{aligned}
$$

A truth table would confirm this, but the chain of laws also works for formulas with too many variables for a table.
:::
:::

::: example Negating an implication {#ex-negate-implication}
Find a formula without $\Rightarrow$ equivalent to $\neg(p \Rightarrow q)$, and use it to negate "if $n$ is prime, then $n$ is odd".
::: solution
By the implication law, De Morgan and double negation,

$$
\neg(p \Rightarrow q) \equiv \neg(\neg p \lor q) \equiv \neg\neg p \land \neg q \equiv p \land \neg q.
$$

This matches the truth table: an implication is false exactly when its hypothesis is true and its conclusion false. So the negation of "if $n$ is prime, then $n$ is odd" is "$n$ is prime and $n$ is even". For $n = 2$ this negation is true, so the implication is false for $n = 2$; that single value of $n$ is what makes the general claim "every prime is odd" false.
:::
:::

::: warning The negation of an implication is not an implication
It is tempting to negate "if $p$ then $q$" as "if $p$ then not $q$", or as "if not $p$ then not $q$". Both are wrong. The negation of $p\Rightarrow q$ is the conjunction $p \land \neg q$: to refute an implication you must exhibit a situation in which the hypothesis holds *and* the conclusion fails. Check the row $p$ = F: there $p \Rightarrow q$ is true, so its negation must be false — and $p\land\neg q$ is false, but $p\Rightarrow\neg q$ is true.
:::

::: quiz
Which statement is the negation of "if it is sunny, then we go to the beach"?
- [ ] If it is not sunny, then we do not go to the beach.
- [ ] If it is sunny, then we do not go to the beach.
- [x] It is sunny and we do not go to the beach.
- [ ] It is not sunny and we go to the beach.
::: solution
$\neg(p \Rightarrow q) \equiv p \land \neg q$: the promise is broken exactly when it is sunny and we stay at home. A negation must be false whenever the original is true. On a cloudy day when we stay at home, the original statement is (vacuously) true — and so are the first two options, so neither of them is its negation. The last option is false on a sunny day spent at home, when the original is false.
:::
:::

## Converse and contrapositive {#converse-contrapositive}

Every implication has three relatives, and confusing them is one of the commonest logical errors in mathematics.

::: definition Converse, contrapositive and inverse {#def-converse}
For the implication $p \Rightarrow q$:

- its **converse** is $q \Rightarrow p$;
- its **contrapositive** is $\neg q \Rightarrow \neg p$;
- its **inverse** is $\neg p \Rightarrow \neg q$.
:::

::: theorem An implication is equivalent to its contrapositive {#thm-contrapositive}
For all propositions $p$ and $q$:

1. $p \Rightarrow q \equiv \neg q \Rightarrow \neg p$;
2. $q \Rightarrow p \equiv \neg p \Rightarrow \neg q$ (the converse is equivalent to the inverse);
3. $p \Rightarrow q$ is **not** logically equivalent to its converse $q \Rightarrow p$.
:::

::: proof
1. Using the laws of [[#thm-laws]],

$$
\neg q \Rightarrow \neg p \;\equiv\; \neg\neg q \lor \neg p \;\equiv\; q \lor \neg p \;\equiv\; \neg p \lor q \;\equiv\; p \Rightarrow q,
$$

by the implication law, double negation, commutativity and the implication law again.

2. This is part 1 with the roles of $p$ and $q$ exchanged.

3. To show two formulas are *not* equivalent we need just one assignment on which they differ. Take $p$ false and $q$ true: then $p \Rightarrow q$ is true but $q \Rightarrow p$ is false.
:::

::: widget truthtable
formula: p -> q
compare: ~q -> ~p
caption: An implication and its contrapositive have identical truth tables. Replace the second formula by the converse $q \Rightarrow p$ (type q -> p) and the tables disagree in two rows; then try the inverse ~p -> ~q, which agrees with the converse everywhere.
:::

Now the card puzzle at the start of the chapter can be settled properly. For each card the rule says $V \Rightarrow E$, where $V$ is "this card has a vowel" and $E$ is "this card has an even number". A card can violate the rule only if $V$ is true and $E$ false. The A card has $V$ true, so we must look for $E$. The K card has $V$ false, so the rule holds for it vacuously. The 4 card has $E$ true, and $V \Rightarrow E$ is true whatever $V$ is. The 7 card has $E$ false; by the contrapositive $\neg E \Rightarrow \neg V$, it obeys the rule only if its letter is a consonant, so it must be checked. People who turn the 4 are testing the converse $E \Rightarrow V$, which the rule never asserted.

::: example Converse, contrapositive and inverse {#ex-converse}
Write down the converse, contrapositive and inverse of the statement "if an integer $n$ is a multiple of $6$, then $n$ is even", and decide which are true for every integer $n$.
::: solution
- **Statement:** if $n$ is a multiple of $6$, then $n$ is even. True: if $n = 6k$ then $n = 2(3k)$.
- **Converse:** if $n$ is even, then $n$ is a multiple of $6$. False: $n = 2$ is even but not a multiple of $6$.
- **Contrapositive:** if $n$ is odd, then $n$ is not a multiple of $6$. True, as it must be by [[#thm-contrapositive]]: it is equivalent to the statement.
- **Inverse:** if $n$ is not a multiple of $6$, then $n$ is odd. False ($n = 4$), as it must be, being equivalent to the false converse.

Note that one counterexample suffices to refute a "for every $n$" claim, while the true claims needed an argument covering every $n$.
:::
:::

### Necessary and sufficient conditions

When $p \Rightarrow q$ holds, $p$ is a **sufficient condition** for $q$ (knowing $p$ is enough to conclude $q$) and $q$ is a **necessary condition** for $p$ (without $q$, there is no $p$ — this is the contrapositive). When both $p \Rightarrow q$ and $q \Rightarrow p$ hold, $p$ is **necessary and sufficient** for $q$, and by the biconditional law $p \Leftrightarrow q$. Many theorems have this form, and their proofs usually come in two halves, one for each direction. For example, for an integer $n$, "$n^2$ is even" is necessary and sufficient for "$n$ is even"; we prove both directions in [[proofs/proof-techniques]].

::: quiz
For a real number $x$, the condition "$x > 2$" is ____ for "$x^2 > 4$".
- [x] sufficient but not necessary
- [ ] necessary but not sufficient
- [ ] necessary and sufficient
- [ ] neither necessary nor sufficient
::: solution
If $x > 2$ then $x^2 > 4$, so the condition is sufficient. It is not necessary: $x = -3$ satisfies $x^2 > 4$ without satisfying $x > 2$. The necessary and sufficient condition is $\abs{x} > 2$.
:::
:::

::: warning Proving the converse by mistake
When asked to prove "if $p$ then $q$", a common error is to assume $q$ and deduce $p$ — which proves the converse, a different statement. Before starting any proof, write down clearly what you may assume (the hypothesis) and what you must reach (the conclusion).
:::

## Valid arguments

A mathematical argument draws a conclusion from premises. Logic cannot tell us whether the premises are true, but it can tell us whether the conclusion *follows* from them.

::: definition Valid argument {#def-valid}
An **argument** consists of formulas $P_1, \dots, P_k$, the **premises**, and a formula $C$, the **conclusion**. It is **valid** if $C$ is true for every assignment of truth values that makes all the premises true; equivalently, if

$$
(P_1 \land P_2 \land \dots \land P_k) \Rightarrow C
$$

is a tautology. We then write $P_1, \dots, P_k \;\therefore\; C$.
:::

Validity is a property of the *form* of an argument. "If pigs can fly, then $2$ is odd; pigs can fly; therefore $2$ is odd" is valid, although its conclusion is false: validity only guarantees that *true premises* lead to a true conclusion. A valid argument whose premises are actually true is called **sound**, and a proof is meant to be a chain of sound steps.

::: theorem Rules of inference {#thm-inference}
The following argument forms are valid:

1. **Modus ponens:** $\;p,\; p \Rightarrow q \;\therefore\; q$.
2. **Modus tollens:** $\;\neg q,\; p \Rightarrow q \;\therefore\; \neg p$.
3. **Hypothetical syllogism:** $\;p \Rightarrow q,\; q \Rightarrow r \;\therefore\; p \Rightarrow r$.
4. **Disjunctive syllogism:** $\;p \lor q,\; \neg p \;\therefore\; q$.
5. **Proof by cases:** $\;p \lor q,\; p \Rightarrow r,\; q \Rightarrow r \;\therefore\; r$.
:::

::: proof
In each case we consider an arbitrary assignment that makes all the premises true and show that it makes the conclusion true.

1. If $p$ is true and $p \Rightarrow q$ is true, then $q$ cannot be false, since "$p$ true, $q$ false" is the one row where $p\Rightarrow q$ is false. So $q$ is true.
2. If $\neg q$ is true then $q$ is false. If $p$ were true, $p \Rightarrow q$ would be false; so $p$ is false and $\neg p$ is true.
3. Suppose $p\Rightarrow q$ and $q \Rightarrow r$ are true. The conclusion $p \Rightarrow r$ could fail only if $p$ were true and $r$ false. But then $q$ is true by modus ponens applied to $p$ and $p\Rightarrow q$, and then $r$ is true by modus ponens applied to $q$ and $q\Rightarrow r$ — contradicting $r$ false. So $p \Rightarrow r$ is true.
4. If $\neg p$ is true then $p$ is false, and since $p \lor q$ is true, $q$ must be true.
5. Since $p\lor q$ is true, $p$ is true or $q$ is true. If $p$ is true, modus ponens with $p\Rightarrow r$ gives $r$; if $q$ is true, modus ponens with $q \Rightarrow r$ gives $r$. Either way $r$ is true.
:::

Two invalid forms are so common that they have names. **Affirming the consequent** — "$q$, $p\Rightarrow q$, therefore $p$" — is invalid: the assignment $p$ false, $q$ true makes both premises true and the conclusion false. **Denying the antecedent** — "$\neg p$, $p\Rightarrow q$, therefore $\neg q$" — is invalid for the same reason, as the same assignment shows.

::: widget truthtable
formula: ((p -> q) & (q -> r)) -> (p -> r)
caption: The final column is T in all eight rows, so this formula is a tautology — which is exactly the statement that hypothetical syllogism is valid. Now type ((p -> q) & q) -> p (affirming the consequent): it is no longer a tautology, and the row with $p$ false, $q$ true is the counterexample.
:::

::: example Checking an argument {#ex-argument}
Is the following argument valid? "If the program compiles, then the tests run. If the tests run and pass, then we deploy. The program compiled, but we did not deploy. Therefore the tests did not pass."
::: solution
Let $c$ be "the program compiles", $t$ "the tests run", $s$ "the tests pass" and $d$ "we deploy". The premises are

$$
c \Rightarrow t, \qquad (t \land s) \Rightarrow d, \qquad c, \qquad \neg d,
$$

and the conclusion is $\neg s$. Rather than write a table with $16$ rows, we chain rules of inference:

1. From $c$ and $c\Rightarrow t$, modus ponens gives $t$.
2. From $\neg d$ and $(t\land s)\Rightarrow d$, modus tollens gives $\neg(t \land s)$, which by De Morgan is $\neg t \lor \neg s$.
3. From $\neg t \lor \neg s$ and $t$ (that is, $\neg\neg t$), disjunctive syllogism gives $\neg s$.

Each step is valid, so the argument is valid.
:::
:::

::: example Knights and knaves {#ex-knights}
On an island, every inhabitant is a *knight*, who always tells the truth, or a *knave*, who always lies. You meet two inhabitants, $A$ and $B$. $A$ says: "At least one of us is a knave." What are $A$ and $B$?
::: solution
Let $a$ be "$A$ is a knight" and $b$ be "$B$ is a knight". $A$'s statement is $\neg a \lor \neg b$. A knight's statements are true and a knave's are false, so $A$'s statement is true exactly when $A$ is a knight: the situation is described by $a \Leftrightarrow (\neg a \lor \neg b)$. We look for the rows in which this holds:

| $a$ | $b$ | $\neg a \lor \neg b$ | $a \Leftrightarrow (\neg a \lor \neg b)$ |
|---|---|---|---|
| T | T | F | F |
| T | F | T | T |
| F | T | T | F |
| F | F | T | F |

Exactly one row is consistent: $A$ is a knight and $B$ is a knave. Directly: if $A$ were a knave his statement would be false, so neither would be a knave — absurd. So $A$ is a knight, and his true statement makes $B$ a knave.
:::
:::

## Normal forms and functional completeness

A truth table with $n$ variables is a function that assigns T or F to each of the $2^n$ rows. Since each row can be given either value independently, there are $2^{2^n}$ such **truth functions**: $16$ of two variables, $256$ of three. We have only five connectives. Can every truth function be written as a formula?

::: definition Normal forms {#def-dnf}
A **literal** is a propositional variable or its negation. A formula is in **disjunctive normal form (DNF)** if it is a disjunction of one or more conjunctions of literals, such as $(p \land \neg q) \lor (\neg p \land q \land r)$. It is in **conjunctive normal form (CNF)** if it is a conjunction of one or more disjunctions of literals, such as $(p \lor q) \land (\neg p \lor \neg r)$.
:::

::: theorem Every truth function has a DNF formula {#thm-dnf}
Let $f$ be any truth function of the variables $p_1, \dots, p_n$. Then there is a formula in disjunctive normal form, using only $\neg$, $\land$ and $\lor$, whose truth table is $f$.
:::

::: proof
If $f$ takes the value F in every row, the formula $p_1 \land \neg p_1$ (a DNF with a single conjunction) has the same truth table. Otherwise, for each row $R$ in which $f$ takes the value T, form the conjunction

$$
m_R = \ell_1 \land \ell_2 \land \dots \land \ell_n, \qquad \text{where } \ell_i = \begin{cases} p_i & \text{if } p_i \text{ is T in row } R,\\ \neg p_i & \text{if } p_i \text{ is F in row } R.\end{cases}
$$

Each literal $\ell_i$ is true in row $R$, so $m_R$ is true in row $R$. In any other row $S$, some variable $p_i$ has a different value from its value in $R$, so $\ell_i$ is false in $S$ and so is $m_R$. Thus $m_R$ is true in row $R$ and nowhere else.

Let $D$ be the disjunction of the $m_R$ over all rows $R$ in which $f$ is T. In such a row, one of the disjuncts (namely $m_R$) is true, so $D$ is true. In a row where $f$ is F, every disjunct $m_R$ comes from a different row and is therefore false, so $D$ is false. Hence $D$ has truth table $f$.
:::

The conjunctions $m_R$ are called **minterms**. Applying the theorem to $\neg f$ and then De Morgan's laws turns a DNF for $\neg f$ into a CNF for $f$, so every truth function has a CNF formula too.

::: example The majority function {#ex-majority}
Find a formula for the majority function of three variables, which is true exactly when at least two of $p, q, r$ are true, and simplify it.
::: solution
The majority function is T in four rows: TTT, TTF, TFT and FTT. The construction in the proof of [[#thm-dnf]] gives

$$
(p \land q \land r) \lor (p \land q \land \neg r) \lor (p \land \neg q \land r) \lor (\neg p \land q \land r).
$$

To simplify, use the idempotent law to write the first minterm three times (since $m \equiv m \lor m \lor m$) and pair one copy with each of the others. For example, by the distributive, complement and identity laws,

$$
(p\land q\land r)\lor(p\land q\land\neg r) \equiv (p\land q)\land(r\lor\neg r) \equiv (p\land q)\land\top \equiv p\land q.
$$

The other two pairs give $p\land r$ and $q\land r$ in the same way, so

$$
\operatorname{maj}(p,q,r) \equiv (p\land q)\lor(p\land r)\lor(q\land r),
$$

which says "some two of them are true" — exactly the definition.
:::
:::

A set of connectives is **functionally complete** if every truth function can be expressed using only those connectives. [[#thm-dnf]] says that $\{\neg, \land, \lor\}$ is functionally complete, and we can do better.

::: corollary Two connectives suffice {#cor-complete}
The sets $\{\neg, \land\}$ and $\{\neg, \lor\}$ are functionally complete.
:::

::: proof
By [[#thm-dnf]] every truth function is expressed by a formula using $\neg$, $\land$ and $\lor$. By De Morgan's laws and double negation, $p \lor q \equiv \neg(\neg p \land \neg q)$, so every $\lor$ can be replaced by an expression using only $\neg$ and $\land$; replacing the occurrences one at a time keeps the formula equivalent. Similarly $p \land q \equiv \neg(\neg p \lor \neg q)$ eliminates $\land$ in favour of $\neg$ and $\lor$.
:::

In fact a single connective suffices: the **NAND** connective $p \uparrow q = \neg(p\land q)$ is functionally complete on its own (see the exercises). Not every set is complete, though; $\{\land, \lor\}$ is not, because a formula built from $p$ and $q$ with only $\land$ and $\lor$ is true whenever $p$ and $q$ are both true, so it can never express $\neg p$.

::: application Circuits and satisfiability
In his 1937 master's thesis Claude Shannon showed that switching circuits obey the laws of propositional logic, with switches in series acting as $\land$ and in parallel as $\lor$. Logic gates on a chip compute $\neg$, $\land$, $\lor$ and NAND, and the functional completeness of NAND is why a chip can be built from copies of a single kind of gate. A harder question is **satisfiability**: is a given formula true for *some* assignment? A truth table needs $2^n$ rows, about $1.3 \times 10^{30}$ for $n = 100$, and satisfiability was the first problem shown to be NP-complete (Stephen Cook, 1971). Even so, modern SAT solvers handle industrial formulas with millions of variables and are used to verify hardware and software.
:::

::: history
Aristotle's syllogisms (4th century BC) dealt with statements such as "all men are mortal"; the Stoic logicians, above all Chrysippus in the 3rd century BC, analysed compound propositions built with "and", "or" and "if". The truth-functional reading of "if" was proposed by Philo the Dialectician around 300 BC, and the debate over conditionals was so lively that the poet Callimachus joked that even the crows on the rooftops were discussing it. Logic became algebra in 1847, when George Boole's *The Mathematical Analysis of Logic* and Augustus De Morgan's *Formal Logic* both appeared; the laws named after De Morgan were already known to medieval logicians. Truth tables in the modern form were used in 1921 by both Emil Post and Ludwig Wittgenstein, and Post proved that same year that every tautology can be derived from a small set of axioms.
:::

## Where this leads

Mathematical statements usually talk about *objects* — "$n$ is even", "for every $\eps > 0$ there is a $\delta > 0$" — so [[proofs/quantifiers]] adds predicates and the quantifiers "for all" and "there exists"; De Morgan's laws reappear there as rules for negating quantified statements. In [[proofs/proof-techniques]], the equivalences $p \Rightarrow q \equiv \neg q \Rightarrow \neg p$ and $\neg(p \Rightarrow q) \equiv p \land \neg q$ become proof by contrapositive and proof by contradiction. The connectives $\land$, $\lor$, $\neg$ correspond to intersection, union and complement of sets in [[proofs/sets]], and to "and", "or" and "not" for events in [[probability/probability-spaces]]. With $\oplus$ as addition and $\land$ as multiplication, truth values form a ring in the sense of [[abstract-algebra/rings]].

::: summary
- A proposition has a definite truth value. The connectives $\neg$, $\land$, $\lor$, $\Rightarrow$, $\Leftrightarrow$ are defined by truth tables; a formula in $n$ variables has $2^n$ rows.
- "Or" is inclusive. $p\Rightarrow q$ is false only when $p$ is true and $q$ false (vacuously true when $p$ is false); "$p$ only if $q$", "$p$ is sufficient for $q$" and "$q$ is necessary for $p$" all mean $p \Rightarrow q$.
- $P \equiv Q$ means the formulas agree in every row. The laws of logic ([[#thm-laws]]), especially De Morgan's laws $\neg(p\land q)\equiv\neg p\lor\neg q$ and $\neg(p\lor q)\equiv\neg p\land\neg q$, let us simplify formulas algebraically.
- An implication is equivalent to its contrapositive $\neg q\Rightarrow\neg p$ but not to its converse $q \Rightarrow p$. Its negation is $p \land \neg q$, not another implication.
- An argument is valid if every assignment making the premises true makes the conclusion true. Modus ponens, modus tollens, hypothetical syllogism, disjunctive syllogism and proof by cases are valid; affirming the consequent and denying the antecedent are not.
- Every truth function can be written in disjunctive normal form ([[#thm-dnf]]), so $\{\neg,\land,\lor\}$ — and even $\{\neg,\land\}$ or NAND alone — is functionally complete.
:::

## Exercises

::: exercise The biconditional {level=1}
Write out the truth tables of $p \Leftrightarrow q$ and of $(p \Rightarrow q)\land(q\Rightarrow p)$, and confirm that they are logically equivalent.
::: solution
| $p$ | $q$ | $p\Rightarrow q$ | $q \Rightarrow p$ | $(p\Rightarrow q)\land(q\Rightarrow p)$ | $p\Leftrightarrow q$ |
|---|---|---|---|---|---|
| T | T | T | T | T | T |
| T | F | F | T | F | F |
| F | T | T | F | F | F |
| F | F | T | T | T | T |

The last two columns agree in every row, so the formulas are logically equivalent. This is why proofs of "$p$ if and only if $q$" are usually split into the two directions $p \Rightarrow q$ and $q \Rightarrow p$.
:::
:::

::: exercise Translation {level=1}
Let $p$ be "the function $f$ is differentiable", $q$ be "$f$ is continuous" and $r$ be "$f$ is bounded". Write in symbols:

1. $f$ is continuous but not differentiable.
2. $f$ is continuous only if it is bounded.
3. Differentiability is sufficient for continuity.
4. $f$ is not bounded unless it is continuous.
::: solution
1. "But" is a conjunction: $q \land \neg p$.
2. "$A$ only if $B$" is $A \Rightarrow B$: $q \Rightarrow r$.
3. "$A$ is sufficient for $B$" is $A \Rightarrow B$: $p \Rightarrow q$.
4. "$A$ unless $B$" is "if not $B$ then $A$": $\neg q \Rightarrow \neg r$, which by [[#thm-contrapositive]] is equivalent to $r \Rightarrow q$.
:::
:::

::: exercise Counting rows {level=1 check="5"}
In how many of the eight rows of its truth table is $(p \lor q) \Rightarrow r$ true?
::: solution
The implication is false exactly when $p \lor q$ is true and $r$ is false. The disjunction $p\lor q$ is true for $3$ of the $4$ choices of $(p,q)$, and $r$ must be F, so the formula is false in $3$ rows and true in the other $8 - 3 = 5$.
:::
:::

::: exercise Exportation {level=2}
Using the laws in [[#thm-laws]] (not a truth table), prove that $p \Rightarrow (q \Rightarrow r) \equiv (p \land q) \Rightarrow r$.
::: solution
$$
\begin{aligned}
p \Rightarrow (q \Rightarrow r) &\equiv \neg p \lor (\neg q \lor r) && \text{implication law, twice}\\
&\equiv (\neg p \lor \neg q) \lor r && \text{associative}\\
&\equiv \neg(p \land q) \lor r && \text{De Morgan}\\
&\equiv (p \land q) \Rightarrow r && \text{implication law.}
\end{aligned}
$$

This equivalence is used constantly: to prove "if $p$, then if $q$, then $r$" we assume both $p$ and $q$ and deduce $r$.
:::
:::

::: exercise Valid or not? {level=2}
Decide whether each argument is valid. For a valid argument name the rules used; for an invalid one give an assignment of truth values showing it.

1. If I revise, I pass. If I pass, I am happy. I am not happy. Therefore I did not revise.
2. If $f$ is differentiable, then $f$ is continuous. $f$ is not differentiable. Therefore $f$ is not continuous.
::: solution
1. Let $r$, $p$, $h$ be "I revise", "I pass", "I am happy". From $r \Rightarrow p$ and $p\Rightarrow h$, hypothetical syllogism gives $r \Rightarrow h$; with $\neg h$, modus tollens gives $\neg r$. **Valid.**
2. With $d$ = "$f$ is differentiable" and $c$ = "$f$ is continuous", the form is $d \Rightarrow c,\ \neg d \;\therefore\; \neg c$: denying the antecedent. **Invalid**: with $d$ false and $c$ true both premises are true and the conclusion false. A concrete instance is $f(x) = \abs{x}$, which is continuous but not differentiable at $0$.
:::
:::

::: exercise Two islanders {level=2}
On the island of [[#ex-knights]], $A$ says "$B$ is a knight" and $B$ says "$A$ and I are of opposite types". Determine what $A$ and $B$ are.
::: hint
Write down two biconditionals, one for each speaker, and test the four rows.
:::
::: solution
With $a$, $b$ as before, $A$'s statement gives $a \Leftrightarrow b$, and $B$'s statement "$a$ and $b$ have different values" gives $b \Leftrightarrow (a \oplus b)$.

- If $b$ is true, $B$'s statement is true, so $a$ and $b$ differ and $a$ is false. But then $A$ is a knave whose statement "$B$ is a knight" is true — impossible.
- So $b$ is false. Then $A$'s statement "$B$ is a knight" is false, so $A$ is a knave: $a$ is false. Check $B$: $B$ says they are of opposite types, but both are knaves, so the statement is false — consistent with $B$ being a knave.

Both are knaves.
:::
:::

::: exercise Symmetric connectives {level=2 check="8"}
A truth function $f(p,q)$ of two variables is *symmetric* if $f(p,q) = f(q,p)$ for all truth values. How many of the $16$ truth functions of two variables are symmetric?
::: solution
Symmetry imposes only the condition $f(\mathrm{T},\mathrm{F}) = f(\mathrm{F},\mathrm{T})$ (the rows TT and FF are unchanged by swapping $p$ and $q$). So a symmetric function is determined by three free choices — its value on TT, on FF, and the common value on TF and FT — giving $2^3 = 8$. Examples are $\land$, $\lor$, $\Leftrightarrow$, $\oplus$, NAND, NOR and the two constant functions; $\Rightarrow$ is not symmetric.
:::
:::

::: exercise NAND is enough {level=3}
Define $p \uparrow q = \neg(p \land q)$. Prove that $\{\uparrow\}$ is functionally complete.
::: hint
By [[#cor-complete]] it is enough to express $\neg p$ and $p \land q$ using $\uparrow$ alone.
:::
::: solution
By the idempotent law, $p \uparrow p = \neg(p \land p) \equiv \neg p$. Then, using double negation,

$$
(p\uparrow q)\uparrow(p\uparrow q) \equiv \neg(p \uparrow q) = \neg\neg(p\land q) \equiv p \land q.
$$

So both $\neg$ and $\land$ can be expressed with $\uparrow$ alone. Given any truth function, [[#cor-complete]] provides a formula for it using only $\neg$ and $\land$; replacing each $\neg A$ by $A \uparrow A$ and each $A\land B$ by $(A\uparrow B)\uparrow(A\uparrow B)$ (working from the innermost subformulas outwards) gives an equivalent formula using only $\uparrow$. Hence $\{\uparrow\}$ is functionally complete. (For the record, $p \lor q \equiv (p\uparrow p)\uparrow(q\uparrow q)$.)
:::
:::

::: exercise An incomplete set {level=3}
Prove that $\{\land, \lor, \Rightarrow\}$ is not functionally complete.
::: hint
What is the truth value of such a formula when every variable is true?
:::
::: solution
Claim: every formula built from variables using only $\land$, $\lor$ and $\Rightarrow$ is true under the assignment that makes every variable true. A variable on its own is true under this assignment. If $A$ and $B$ are formulas that are true under it, then so are $A \land B$, $A \lor B$ and $A \Rightarrow B$ (each connective gives T on the input T, T). Every formula is built from variables by finitely many such steps, so by working up from the variables (formally, by induction on the number of connectives, see [[proofs/induction]]) every such formula is true under the all-true assignment.

The truth function $\neg p$ is false when $p$ is true, so no formula in these connectives can express it. Hence the set is not functionally complete.
:::
:::
