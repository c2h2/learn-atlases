In 1937 a 21-year-old MIT student, Claude Shannon, noticed that the relay networks used in telephone exchanges obey exactly the algebra that George Boole had invented eighty years earlier to describe logical reasoning. Two switch contacts in series conduct only if both are closed: that is AND. Two in parallel conduct if either is closed: that is OR. A normally closed contact, which opens when its relay is energised, is NOT. Once a circuit is written as an algebraic expression, the algebra can simplify it, prove two circuits equivalent, or synthesise a circuit from a specification — no more trial and error with wiring.

That observation is still the working method of digital design. A modern chip contains billions of transistors, but the designer, and the synthesis software, reasons about it in Boolean algebra. This chapter builds that algebra from a short list of axioms, introduces the logic gates that implement its operations, and shows that every Boolean function, however complicated, can be written in a standard **canonical form** built from AND, OR and NOT — or from NAND gates alone. The mathematical side of the same subject, propositional logic, is treated in [Propositional logic](/learn/maths/lesson.php?c=discrete&l=propositional-logic); here we care about circuits, costs and voltages.

## Logic values and logic gates

A **logic signal** takes one of two values, written $0$ and $1$ (or false and true, low and high). In **positive logic**, which we use throughout, a high voltage means $1$. The electrical meaning of "high" is fixed by the logic family.

::: definition Logic levels and noise margins {#def-levels}
A logic family guarantees that a driving gate's output is at most $V_{OL}$ when low and at least $V_{OH}$ when high, and that a receiving gate interprets any input below $V_{IL}$ as $0$ and any input above $V_{IH}$ as $1$. Inputs between $V_{IL}$ and $V_{IH}$ are **forbidden**: their interpretation is not guaranteed. The **noise margins**

$$
NM_L = V_{IL} - V_{OL}, \qquad NM_H = V_{OH} - V_{IH}
$$ {#eq-nm}

are the largest noise voltages that can be added to a valid output without the next input becoming ambiguous.
:::

::: example Noise margins of a 3.3 V family {#ex-nm}
The JEDEC low-voltage TTL-compatible levels for $3.3\,\mathrm{V}$ logic are $V_{OL} = 0.4\,\mathrm{V}$, $V_{OH} = 2.4\,\mathrm{V}$, $V_{IL} = 0.8\,\mathrm{V}$ and $V_{IH} = 2.0\,\mathrm{V}$. Find the noise margins. Can a gate of this family safely drive an input that requires $V_{IH} = 0.7\,V_{DD}$?
::: solution
By [[#eq-nm]], $NM_L = 0.8 - 0.4 = 0.4\,\mathrm{V}$ and $NM_H = 2.4 - 2.0 = 0.4\,\mathrm{V}$. Up to $0.4\,\mathrm{V}$ of noise in either state is tolerated.

An input with $V_{IH} = 0.7\times 3.3 = 2.31\,\mathrm{V}$ would leave $NM_H = 2.4 - 2.31 = 0.09\,\mathrm{V}$: positive, so it works on paper, but with less than $0.1\,\mathrm{V}$ of margin it is fragile. (Real CMOS outputs with light loads usually swing to within a few tens of millivolts of the rails, much better than the guaranteed $2.4\,\mathrm{V}$; the guaranteed figure is what you must design to.)
:::
:::

The transfer characteristic behind these numbers — why a CMOS inverter has a sharp threshold and how it restores levels — is derived in [[digital-ic/cmos-inverter]]. From here on we work with the logic values only.

A **logic gate** is a circuit whose output is a fixed Boolean function of its present inputs. The basic gates are:

| gate | expression | output is 1 when | notes |
|---|---|---|---|
| NOT (inverter) | $\overline{A}$ | $A = 0$ | the bubble on a symbol means inversion |
| AND | $A\cdot B$ or $AB$ | all inputs are 1 | |
| OR | $A + B$ | at least one input is 1 | |
| NAND | $\overline{AB}$ | not all inputs are 1 | cheapest gate in CMOS |
| NOR | $\overline{A + B}$ | all inputs are 0 | |
| XOR | $A \oplus B$ | an odd number of inputs are 1 | |
| XNOR | $\overline{A\oplus B}$ | an even number of inputs are 1 | equality detector for two bits |

Their truth tables for two inputs, with inputs listed in binary counting order:

| $A$ | $B$ | AND | OR | NAND | NOR | XOR | XNOR |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

In schematics the AND gate is drawn as a D shape, the OR gate as a curved shield, XOR as an OR with an extra curved line on the input side, and a small circle (**bubble**) at an output or input marks inversion. AND, OR, NAND, NOR, XOR and XNOR all extend to more inputs; the number of inputs is the gate's **fan-in**.

::: remark Why CMOS prefers inverting gates
A static CMOS gate pulls its output high through p-channel transistors and low through n-channel transistors, and a single stage can only produce an output that *falls* when an input *rises*. So the natural one-stage gates are NOT, NAND and NOR; AND and OR are a NAND or NOR followed by an inverter, one stage slower and larger. NAND is usually preferred over NOR because its slow p-channel transistors are in parallel rather than in series. See [[digital-ic/static-cmos-logic]].
:::

## The axioms of Boolean algebra

We want to manipulate expressions like $A\overline{B} + \overline{A}(B + C)$ with the same confidence as ordinary algebra. The cleanest foundation is a short list of axioms from which everything else follows.

::: axiom Boolean algebra {#ax-boolean}
A **Boolean algebra** is a set $\mathbb{B}$ with two binary operations $+$ (OR) and $\cdot$ (AND), a unary operation $\overline{\phantom{x}}$ (NOT) and two distinct elements $0$ and $1$, such that for all $x, y, z \in \mathbb{B}$:

| | OR form | AND form |
|---|---|---|
| A1 identity | $x + 0 = x$ | $x \cdot 1 = x$ |
| A2 complement | $x + \overline{x} = 1$ | $x \cdot \overline{x} = 0$ |
| A3 commutativity | $x + y = y + x$ | $xy = yx$ |
| A4 distributivity | $x + yz = (x+y)(x+z)$ | $x(y+z) = xy + xz$ |

The switching algebra of logic circuits is the case $\mathbb{B} = \{0, 1\}$, with the operations defined by the truth tables above.
:::

Two features are unlike ordinary algebra. First, *both* distributive laws hold: OR distributes over AND as well as AND over OR. In real numbers $x + yz = (x+y)(x+z)$ is false, so beware of habits from school algebra. Second, there are no inverses: $x + y = x + z$ does not imply $y = z$ (take $x = 1$).

### Duality

The axiom table has a striking symmetry: the right-hand column is the left-hand column with $+$ and $\cdot$ exchanged and $0$ and $1$ exchanged.

::: theorem Principle of duality {#thm-duality}
The **dual** of a Boolean expression is obtained by exchanging $+$ with $\cdot$ and $0$ with $1$ (variables and complements are unchanged). If an identity follows from the axioms, so does its dual.
:::

::: proof
Each axiom's dual is again an axiom (A1–A4 are listed in dual pairs). A proof of an identity is a chain of axiom applications; replacing every step by the dual axiom gives a valid proof of the dual identity.
:::

Duality halves the work: every theorem below comes with a free twin.

### Theorems

The following identities are the everyday tools. In switching algebra each can be proved by **perfect induction** — checking every combination of variable values in a truth table — and each also follows from the axioms.

::: theorem Basic Boolean identities {#thm-identities}
For all Boolean $x, y, z$:

| | OR form | AND form |
|---|---|---|
| T1 null element | $x + 1 = 1$ | $x\cdot 0 = 0$ |
| T2 idempotence | $x + x = x$ | $x x = x$ |
| T3 involution | $\overline{\overline{x}} = x$ | |
| T4 associativity | $(x+y)+z = x+(y+z)$ | $(xy)z = x(yz)$ |
| T5 absorption | $x + xy = x$ | $x(x+y) = x$ |
| T6 combining | $xy + x\overline{y} = x$ | $(x+y)(x+\overline{y}) = x$ |
| T7 simplification | $x + \overline{x}y = x + y$ | $x(\overline{x} + y) = xy$ |
| T8 consensus | $xy + \overline{x}z + yz = xy + \overline{x}z$ | $(x+y)(\overline{x}+z)(y+z) = (x+y)(\overline{x}+z)$ |
:::

::: proof
We prove the OR forms from the axioms; the AND forms follow by [[#thm-duality]].

*T2:* $x + x = (x+x)\cdot 1 = (x+x)(x+\overline{x}) = x + x\overline{x} = x + 0 = x$, using A1, A2, A4 (OR over AND), A2 and A1.

*T1:* $x + 1 = x + (x + \overline{x}) = (x + x) + \overline{x} = x + \overline{x} = 1$ (A2, T4, T2, A2). Associativity T4 also follows from the axioms but the derivation is long; in switching algebra it is immediate by perfect induction.

*T5:* $x + xy = x\cdot 1 + xy = x(1 + y) = x\cdot 1 = x$ (A1, A4, T1, A1).

*T6:* $xy + x\overline{y} = x(y + \overline{y}) = x\cdot 1 = x$.

*T7:* $x + \overline{x}y = (x + \overline{x})(x + y) = 1\cdot(x+y) = x + y$ (A4 OR over AND, A2, A1).

*T8:* insert $1 = x + \overline{x}$ into the third term:
$$
xy + \overline{x}z + yz(x + \overline{x}) = xy + xyz + \overline{x}z + \overline{x}yz = xy(1 + z) + \overline{x}z(1 + y) = xy + \overline{x}z.
$$

*T3:* both $x$ and $\overline{\overline{x}}$ are complements of $\overline{x}$ (they satisfy A2 with it), and a complement is unique: if $a + y = 1$, $ay = 0$, $a + z = 1$ and $az = 0$, then $y = y(a + z) = ay + yz = 0 + yz = az + yz = z(a + y) = z$.
:::

The consensus theorem says that the term $yz$ is redundant whenever both $xy$ and $\overline{x}z$ are present: whenever $yz = 1$, either $x = 1$ (so $xy = 1$) or $x = 0$ (so $\overline{x}z = 1$). The term $yz$ is the **consensus** of $xy$ and $\overline{x}z$. It will matter twice later: as a redundant term to remove in minimisation, and as a term to *add* to prevent glitches ([[digital-logic/logic-minimisation]]).

::: theorem De Morgan's laws {#thm-demorgan}
For all Boolean $x_1, \dots, x_n$,

$$
\overline{x_1 + x_2 + \cdots + x_n} = \overline{x_1}\,\overline{x_2}\cdots\overline{x_n}, \qquad \overline{x_1 x_2 \cdots x_n} = \overline{x_1} + \overline{x_2} + \cdots + \overline{x_n}.
$$ {#eq-demorgan}
:::

::: proof
For two variables, we show that $\overline{x}\,\overline{y}$ is a complement of $x + y$; uniqueness of complements (proof of T3) then gives $\overline{x+y} = \overline{x}\,\overline{y}$. Indeed

$$
(x + y) + \overline{x}\,\overline{y} = x + (y + \overline{x}\,\overline{y}) = x + (y + \overline{x}) = 1 + y = 1,
$$

using T7 twice in the form $u + \overline{u}v = u + v$ (with $u = y$, then $u = x$) and T1; and

$$
(x + y)\,\overline{x}\,\overline{y} = x\overline{x}\,\overline{y} + y\,\overline{y}\,\overline{x} = 0 + 0 = 0.
$$

The second law is the dual. The $n$-variable forms follow by induction, grouping $x_1 + \dots + x_n = x_1 + (x_2 + \dots + x_n)$.
:::

In words: *to complement an expression, replace every variable by its complement, exchange AND and OR, and exchange $0$ and $1$* — the dual, with every literal complemented. Keep the original grouping by adding parentheses: $\overline{A + BC} = \overline{A}\,(\overline{B} + \overline{C})$, not $\overline{A}\,\overline{B} + \overline{C}$.

::: widget truthtable
formula: ~(A & B & C)
compare: ~A | ~B | ~C
caption: De Morgan's law for three inputs, checked by perfect induction. All eight rows agree, so a NAND gate is the same as an OR gate with inverted inputs. Edit the second formula to the tempting mistake `~A & ~B & ~C` and see which rows break.
:::

::: warning Complementing a product is not complementing each factor
$\overline{AB} \ne \overline{A}\,\overline{B}$. At $A = 1$, $B = 0$ the left side is $\overline{0} = 1$ and the right side is $0\cdot 1 = 0$. The bar over a whole product is a NAND; bars over each variable feeding an AND form a NOR. When you break a long bar in an expression you must change the operator underneath it (De Morgan); you may never just split it.
:::

::: example Algebraic simplification {#ex-simplify}
Simplify $F = \overline{A}\,\overline{B}\,\overline{C} + \overline{A}\,\overline{B}C + \overline{A}BC + ABC$, and $G = \overline{(A + \overline{B})\,\overline{C}} + \overline{A}$.
::: solution
For $F$, pair terms that differ in one variable and use the combining theorem T6:

$$
F = \overline{A}\,\overline{B}(\overline{C} + C) + BC(\overline{A} + A) = \overline{A}\,\overline{B} + BC.
$$

Four 3-literal products became two 2-literal products. A truth table confirms $F = 1$ exactly for $ABC \in \{000, 001, 011, 111\}$ in both forms.

For $G$, apply De Morgan to the long bar first, then to $\overline{A + \overline{B}}$:

$$
\overline{(A + \overline{B})\,\overline{C}} = \overline{A + \overline{B}} + \overline{\overline{C}} = \overline{A}B + C .
$$

So $G = \overline{A}B + C + \overline{A} = \overline{A}(B + 1) + C = \overline{A} + C$, by T1 (or absorption T5).
:::
:::

::: quiz
Which identity is **false** in Boolean algebra?
- [ ] $A + BC = (A + B)(A + C)$
- [ ] $A + \overline{A}B = A + B$
- [x] $A + AB = A + B$
- [ ] $AB + \overline{A}C + BC = AB + \overline{A}C$
::: solution
By absorption, $A + AB = A$, not $A + B$: at $A = 0$, $B = 1$ the left side is $0$ and $A + B = 1$. The others are the OR-over-AND distributive law, simplification T7 and consensus T8, all valid. The pair T5/T7 is easily confused: absorption swallows a term that contains $A$ itself, while simplification removes a *complemented* $\overline{A}$ from a term.
:::
:::

## Truth tables and canonical forms

A **Boolean function** of $n$ variables assigns $0$ or $1$ to each of the $2^n$ input combinations, so it is completely described by a **truth table** with $2^n$ rows. Since each row can independently be $0$ or $1$, there are $2^{2^n}$ different functions: $16$ of two variables, $256$ of three, $65\,536$ of four. Many expressions describe the same function, and the truth table is the arbiter: two expressions are equal exactly when their truth tables are.

We number the rows by reading the inputs as a binary number, with the first-listed variable as the MSB. For $F(A, B, C)$, row $5$ is $A = 1$, $B = 0$, $C = 1$.

::: definition Literals, minterms and maxterms {#def-minterm}
A **literal** is a variable or its complement. For a function of $n$ variables, a **minterm** is an AND of $n$ literals, one per variable; minterm $m_i$ is the one that equals $1$ in row $i$ only (variable uncomplemented where row $i$ has a $1$). A **maxterm** is an OR of $n$ literals, one per variable; maxterm $M_i$ equals $0$ in row $i$ only (variable complemented where row $i$ has a $1$). By De Morgan, $M_i = \overline{m_i}$.
:::

For three variables, $m_5 = A\overline{B}C$ and $M_5 = \overline{A} + B + \overline{C}$.

The crucial tool for the canonical forms is a way of splitting a function about one variable.

::: theorem Shannon expansion {#thm-shannon}
For any Boolean function $F$ and any of its variables $x$,

$$
F(x, y, \dots) = \overline{x}\,F(0, y, \dots) + x\,F(1, y, \dots) = \bigl(x + F(0, y, \dots)\bigr)\bigl(\overline{x} + F(1, y, \dots)\bigr).
$$ {#eq-shannon}

The functions $F(0, \dots)$ and $F(1, \dots)$ are the **cofactors** of $F$ with respect to $x$.
:::

::: proof
Perfect induction on $x$. If $x = 0$, the sum-of-products form gives $1\cdot F(0,\dots) + 0\cdot F(1,\dots) = F(0, \dots)$, which is $F$ at $x = 0$. If $x = 1$ it gives $F(1, \dots)$. The product form is the dual and is checked the same way: at $x = 0$ it is $F(0, \dots)\cdot 1$, at $x = 1$ it is $1\cdot F(1, \dots)$.
:::

The first form of [[#eq-shannon]] is exactly a two-input multiplexer: $x$ selects between the two cofactors. Applying the expansion to every variable in turn produces a sum of minterms.

::: theorem Canonical forms {#thm-canonical}
Every Boolean function $F$ of $n$ variables can be written uniquely as the OR of the minterms of the rows where $F = 1$ (the **canonical sum of products**, or **sum of minterms**), and uniquely as the AND of the maxterms of the rows where $F = 0$ (the **canonical product of sums**):

$$
F = \sum_{i:\,F_i = 1} m_i = \prod_{i:\,F_i = 0} M_i .
$$ {#eq-canonical}
:::

::: proof
A minterm $m_i$ is $1$ in row $i$ and $0$ elsewhere, so the OR of the minterms for the rows $\{i : F_i = 1\}$ is $1$ exactly in those rows; it therefore agrees with $F$ everywhere. Different sets of minterms give different truth tables, so the set — hence the canonical form — is unique. The product of maxterms is the dual statement: $M_i$ is $0$ in row $i$ only, so the AND of the maxterms for $\{i : F_i = 0\}$ is $0$ exactly where $F$ is $0$.
:::

We abbreviate with minterm and maxterm lists: $F(A,B,C) = \sum m(3, 5, 6, 7) = \prod M(0, 1, 2, 4)$. The two lists always partition $\{0, \dots, 2^n - 1\}$.

::: example The majority function {#ex-majority}
The three-input **majority** function $\mathrm{MAJ}(A, B, C)$ is $1$ when at least two inputs are $1$. Give its truth table, both canonical forms, and a simpler expression.
::: solution
The rows with two or more ones are $011$, $101$, $110$, $111$, i.e. rows $3, 5, 6, 7$:

| row | $A$ | $B$ | $C$ | MAJ |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 2 | 0 | 1 | 0 | 0 |
| 3 | 0 | 1 | 1 | 1 |
| 4 | 1 | 0 | 0 | 0 |
| 5 | 1 | 0 | 1 | 1 |
| 6 | 1 | 1 | 0 | 1 |
| 7 | 1 | 1 | 1 | 1 |

Canonical SOP: $\mathrm{MAJ} = \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC$.

Canonical POS (rows $0, 1, 2, 4$): $\mathrm{MAJ} = (A + B + C)(A + B + \overline{C})(A + \overline{B} + C)(\overline{A} + B + C)$.

To simplify the SOP, use idempotence T2 to copy $ABC$ three times, and combine each copy with one of the other terms (T6):

$$
\mathrm{MAJ} = (\overline{A}BC + ABC) + (A\overline{B}C + ABC) + (AB\overline{C} + ABC) = BC + AC + AB .
$$

Three 2-input ANDs and a 3-input OR replace four 3-input ANDs and a 4-input OR. The same function is the carry output of a full adder, $c_{i+1} = \mathrm{MAJ}(a_i, b_i, c_i)$ — compare [[digital-logic/number-systems#eq-bitadd]].
:::
:::

::: widget truthtable
formula: (~A & B & C) | (A & ~B & C) | (A & B & ~C) | (A & B & C)
compare: (A & B) | (B & C) | (A & C)
caption: The canonical sum of minterms of the majority function against the simplified form $AB + BC + AC$. Each sub-formula has its own column; the final columns agree in every row, so the circuits are equivalent. Try replacing the second formula by `(A & B) | C` to see a near miss.
:::

The terms "sum" and "product" are borrowed from arithmetic; any expression that is an OR of ANDs of literals is a **sum of products** (SOP), and an AND of ORs of literals is a **product of sums** (POS). Canonical forms are SOP and POS forms in which every term contains every variable. They are rarely the cheapest circuits, but they always exist, they are easy to read off a truth table, and they are the starting point for minimisation in [[digital-logic/logic-minimisation]].

::: quiz
$F(A, B, C) = \sum m(0, 2, 5)$. Which is its canonical product of sums?
- [ ] $\prod M(0, 2, 5)$
- [x] $\prod M(1, 3, 4, 6, 7)$
- [ ] $\prod M(2, 5, 7)$
- [ ] $\prod M(1, 3, 4)$
::: solution
The maxterm list contains exactly the rows where $F = 0$, which are all the rows *not* in the minterm list: $\{0,\dots,7\}\setminus\{0,2,5\} = \{1, 3, 4, 6, 7\}$. Using the same numbers in both lists is a common slip: $\prod M(0,2,5)$ is $0$ exactly in rows $0, 2, 5$, so it is the complement $\overline{F}$, not $F$.
:::
:::

## Universal gates and gate-level design

A set of gates is **functionally complete** if every Boolean function can be built from gates of that set alone. [[#thm-canonical]] shows that $\{\text{AND}, \text{OR}, \text{NOT}\}$ is complete. Remarkably, one gate is enough.

::: theorem NAND and NOR are universal {#thm-universal}
Every Boolean function can be implemented using only two-input NAND gates. The same holds for NOR gates.
:::

::: proof
It suffices to build NOT, AND and OR, because they are complete. With NAND:

$$
\overline{A} = \overline{A\cdot A}, \qquad AB = \overline{\overline{AB}} = \mathrm{NAND}\bigl(\mathrm{NAND}(A,B), \mathrm{NAND}(A,B)\bigr), \qquad A + B = \overline{\overline{A}\,\overline{B}} = \mathrm{NAND}(\overline{A}, \overline{B}),
$$

using T2 for the inverter and De Morgan for OR. The NOR case is the dual: $\overline{A} = \overline{A + A}$, $A + B = \overline{\overline{A+B}}$, and $AB = \overline{\overline{A} + \overline{B}}$.
:::

Building each AND and OR separately out of NANDs would be wasteful. The efficient route is to notice that an SOP circuit maps *directly* onto two levels of NAND gates.

::: proposition NAND–NAND realisation of SOP {#prop-nandnand}
A sum of products $F = P_1 + P_2 + \cdots + P_k$, where each $P_j$ is a product of literals, equals

$$
F = \overline{\overline{P_1}\;\overline{P_2}\cdots\overline{P_k}} ,
$$

so it is implemented by one NAND gate per product term feeding a single $k$-input NAND gate. Dually, a product of sums is implemented by two levels of NOR gates.
:::

::: proof
Apply De Morgan's law [[#eq-demorgan]] to $\overline{\overline{P_1}\cdots\overline{P_k}}$ to get $\overline{\overline{P_1}} + \cdots + \overline{\overline{P_k}} = P_1 + \cdots + P_k$ by involution. Each $\overline{P_j}$ is a NAND of the literals of $P_j$. The POS case is the dual.
:::

In schematic terms, an AND–OR circuit becomes NAND–NAND by drawing a bubble at each AND output and at each OR input: the two bubbles on every internal wire cancel, and an OR with bubbled inputs *is* a NAND. This manipulation is called **bubble pushing**; it lets you read a NAND–NAND schematic as the AND–OR circuit it really is.

::: example A buzzer in NAND gates only {#ex-buzzer}
A car's warning buzzer $Z$ must sound when the ignition is on ($I = 1$) and the driver's seat belt is not fastened ($S = 0$), or when the ignition is off, the key is still in the lock ($K = 1$) and the driver's door is open ($D = 1$). Write $Z$, implement it with NAND gates only, and count the gates.
::: solution
Directly from the words, $Z = I\,\overline{S} + \overline{I}\,K\,D$. This is already a minimal sum of products (neither term can be dropped or shortened: dropping $\overline{I}$ from the second term would make the buzzer sound with the belt fastened, the engine running and the door open).

By [[#prop-nandnand]], $Z = \overline{\overline{I\,\overline{S}}\cdot\overline{\overline{I}\,K\,D}}$. The circuit needs:

- two inverters for $\overline{S}$ and $\overline{I}$, each a NAND with its inputs tied together;
- a 2-input NAND forming $\overline{I\overline{S}}$;
- a 3-input NAND forming $\overline{\overline{I}KD}$;
- a 2-input NAND combining them into $Z$.

That is five NAND gates in total, three logic levels deep counting the input inverters (often the complemented inputs are available for free from the flip-flops or switches that produce them, leaving two levels).

Check two cases: $I = 1$, $S = 0$ gives $\overline{I\overline{S}} = 0$, so $Z = \overline{0\cdot x} = 1$. ✓ $I = 1$, $S = 1$, $K = D = 1$: $\overline{I\overline{S}} = 1$ and $\overline{\overline{I}KD} = \overline{0} = 1$, so $Z = \overline{1\cdot 1} = 0$. ✓
:::
:::

### Exclusive OR and parity

XOR deserves a section of its own because it appears in every adder, comparator, error-detecting code and cryptographic circuit. Its algebraic properties:

- $A \oplus B = A\overline{B} + \overline{A}B$, and $\overline{A \oplus B} = AB + \overline{A}\,\overline{B}$ (XNOR, "$A$ equals $B$");
- $A \oplus 0 = A$, $A \oplus 1 = \overline{A}$ (XOR with a control bit is a *programmable inverter*), $A \oplus A = 0$;
- XOR is commutative and associative, so $A_1 \oplus A_2 \oplus \cdots \oplus A_n$ is well defined: it is $1$ exactly when an odd number of the $A_i$ are $1$ — the **parity** function;
- AND distributes over XOR: $A(B \oplus C) = AB \oplus AC$. With AND as multiplication and XOR as addition, $\{0, 1\}$ is the field of integers modulo $2$, the algebra behind linear codes and CRCs.

The parity of $n$ bits is the worst case for two-level logic: its canonical SOP has $2^{n-1}$ minterms, no two of which can be combined (any two minterms of the parity function differ in at least two variables). A tree of $n-1$ two-input XOR gates is far cheaper.

::: example A three-way light switch {#ex-staircase}
A stairwell light is controlled by three switches $A$, $B$, $C$ (bottom, middle landing, top). Flipping any one switch must change the state of the light. With all switches down ($0$), the light is off. Find the logic function and its cost as SOP and as XOR gates.
::: solution
Starting from $000$ (light off), each single flip changes the light, so the light's state is the parity of the number of switches that are up: $L = A \oplus B \oplus C$, with minterms $\sum m(1, 2, 4, 7)$ (rows with one or three ones).

As SOP, $L = \overline{A}\,\overline{B}C + \overline{A}B\overline{C} + A\overline{B}\,\overline{C} + ABC$: four 3-input ANDs, one 4-input OR and inverters, and no simplification is possible because every pair of minterms differs in two or more variables. As XOR gates, $L = (A \oplus B) \oplus C$ needs just two 2-input XOR gates. Electricians realise the same function with two "two-way" switches and one "intermediate" switch that crosses two wires — a mechanical XOR.
:::
:::

::: application From gates to chips
Logic was once built from catalogue chips such as the 7400 (four 2-input NAND gates in one package) of the TTL family introduced by Texas Instruments in the 1960s; small "single-gate" packages of the same functions are still used to patch a design together. As of 2026 almost all logic is instead synthesised into standard-cell libraries on application-specific chips, or into look-up tables in FPGAs. A standard-cell library contains hundreds of cells — NAND, NOR and inverters in several drive strengths, but also complex cells like AND-OR-INVERT ($\overline{AB + CD}$) that implement a whole two-level expression in a single CMOS stage. The Boolean algebra in this chapter is how the synthesis tool decides which cells to use.
:::

::: history
George Boole's *An Investigation of the Laws of Thought* (1854) treated logical propositions as algebraic variables taking the values 0 and 1. Augustus De Morgan, Boole's contemporary and correspondent, stated the laws now named after him in his *Formal Logic* (1847). Charles Sanders Peirce observed in the 1880s that a single operation — what we call NOR — suffices for all of logic, and Henry Sheffer published the corresponding result for NAND (the "Sheffer stroke") in 1913. Edward Huntington gave sets of independent axioms for Boolean algebra in 1904; the four dual pairs used above are of his kind. Claude Shannon's 1937 master's thesis, published in 1938 as *A Symbolic Analysis of Relay and Switching Circuits*, joined the algebra to engineering; the expansion [[#eq-shannon]] appears there and carries his name, although Boole had already used it.
:::

## Where this leads

The canonical forms are correct but expensive. [[digital-logic/logic-minimisation]] develops systematic methods — Karnaugh maps and the Quine–McCluskey algorithm — for finding the cheapest SOP and POS forms, and introduces the timing glitches that the consensus theorem can cure. The Shannon expansion becomes the multiplexer of [[digital-logic/combinational-building-blocks]] and the look-up table of an FPGA in [[digital-logic/memories-programmable-logic]]. How gates are built from transistors, and why NAND is faster than NOR, is the subject of [[digital-ic/static-cmos-logic]].

::: summary
- Logic levels and noise margins ($NM_L = V_{IL} - V_{OL}$, $NM_H = V_{OH} - V_{IH}$) define the interface between voltages and logic values.
- The basic gates are NOT, AND, OR, NAND, NOR, XOR and XNOR; in CMOS the inverting gates are the cheap ones.
- Boolean algebra rests on four dual pairs of axioms; every identity has a dual. Both distributive laws hold, and there are no inverses.
- Key identities: absorption $x + xy = x$, simplification $x + \overline{x}y = x + y$, combining $xy + x\overline{y} = x$, consensus $xy + \overline{x}z + yz = xy + \overline{x}z$, and De Morgan's laws.
- A function of $n$ variables is a truth table of $2^n$ rows; there are $2^{2^n}$ functions. Each has a unique canonical sum of minterms and product of maxterms, whose index lists are complementary.
- Shannon's expansion $F = \overline{x}F_{x=0} + xF_{x=1}$ underlies the canonical forms, multiplexers and LUTs.
- NAND (and NOR) alone are functionally complete; an SOP maps directly onto two levels of NAND gates.
- XOR is addition modulo 2; the $n$-input parity function is cheap as an XOR tree and maximally expensive as SOP.
:::

## Exercises

::: exercise Evaluating an expression {level=1 check="1"}
Evaluate $F = \overline{A}B + A\overline{C} + \overline{B}C$ at $A = 1$, $B = 0$, $C = 0$.
::: solution
$\overline{A}B = 0\cdot 0 = 0$; $A\overline{C} = 1\cdot 1 = 1$; $\overline{B}C = 1\cdot 0 = 0$. So $F = 0 + 1 + 0 = 1$.
:::
:::

::: exercise Applying De Morgan {level=1}
Write the complement of $F = A + \overline{B}C$ as a product of sums, with bars only on single variables.
::: solution
$\overline{F} = \overline{A + \overline{B}C} = \overline{A}\cdot\overline{\overline{B}C} = \overline{A}\,(B + \overline{C})$. Note the parentheses: the AND of $\overline{B}$ and $C$ became an OR under the bar.
:::
:::

::: exercise Counting minterms {level=1 check="8"}
How many minterms does the canonical sum of products of $F = A \oplus B \oplus C \oplus D$ contain?
::: solution
$F$ is $1$ on the input rows with an odd number of ones. Of the $16$ rows, $\binom41 + \binom43 = 4 + 4 = 8$ have an odd number of ones, so the canonical SOP has $8$ minterms.
:::
:::

::: exercise Canonical forms from an expression {level=2}
Find the minterm and maxterm lists of $F(A, B, C) = A + \overline{B}C$.
::: solution
$F = 1$ whenever $A = 1$: rows $4, 5, 6, 7$. When $A = 0$, $F = \overline{B}C$, which is $1$ only at $B = 0$, $C = 1$: row $1$. So $F = \sum m(1, 4, 5, 6, 7) = \prod M(0, 2, 3)$. As a check, the POS is $(A + B + C)(A + \overline{B} + C)(A + \overline{B} + \overline{C})$, which is $0$ only at $A = 0$ with $(B, C) \ne (0, 1)$.
:::
:::

::: exercise Dual consensus {level=2}
Simplify $G = (A + B)(\overline{A} + C)(B + C)$, then multiply out the result to a sum of two products.
::: hint
Use the AND form of the consensus theorem T8.
:::
::: solution
By the AND form of consensus with $x = A$, $y = B$, $z = C$, the factor $(B + C)$ is redundant: $G = (A + B)(\overline{A} + C)$. Multiplying out,

$$
(A + B)(\overline{A} + C) = A\overline{A} + AC + \overline{A}B + BC = AC + \overline{A}B + BC = AC + \overline{A}B,
$$

where the last step is the OR form of consensus. So $G = AC + \overline{A}B$, which is a two-input multiplexer selecting $C$ when $A = 1$ and $B$ when $A = 0$.
:::
:::

::: exercise XOR from NAND gates {level=2}
Show that four 2-input NAND gates suffice to build $A \oplus B$: let $T = \overline{AB}$, and output $\overline{\overline{AT}\cdot\overline{BT}}$.
::: solution
The output is a NAND of $\overline{AT}$ and $\overline{BT}$, so by De Morgan it equals $AT + BT = (A + B)T = (A + B)\overline{AB}$. By De Morgan again $\overline{AB} = \overline{A} + \overline{B}$, so the output is $(A + B)(\overline{A} + \overline{B}) = A\overline{A} + A\overline{B} + \overline{A}B + B\overline{B} = A\overline{B} + \overline{A}B = A \oplus B$. The gates are: one for $T$, one each for $\overline{AT}$ and $\overline{BT}$, and the output gate — four in all.
:::
:::

::: exercise NOR is complete {level=2}
Using only 2-input NOR gates, construct NOT, OR and AND, and state how many NOR gates each needs.
::: solution
NOT: $\overline{A} = \overline{A + A}$, one gate with its inputs tied. OR: $A + B = \overline{\overline{A + B}}$, a NOR followed by a NOR-inverter, two gates. AND: by De Morgan $AB = \overline{\overline{A} + \overline{B}}$, so invert both inputs (two gates) and NOR them (one gate), three gates. Since NOT, AND and OR are complete, so is NOR.
:::
:::

::: exercise A design from words {level=2}
A chemical reactor has three temperature sensors $A$, $B$, $C$, each $1$ when its reading is too high. A shutdown signal $S$ must be raised if at least two sensors agree that the temperature is too high, but sensor $A$ is known to be unreliable, so $A$ together with exactly one other sensor is not enough unless the other sensor is $B$. Write the truth table, the canonical SOP and a simplified expression for $S$.
::: hint
List the rows with two or more ones, then remove the one excluded by the reliability rule.
:::
::: solution
Rows with at least two ones: $011$ ($B$, $C$), $101$ ($A$, $C$), $110$ ($A$, $B$), $111$. The rule says $A$ with only $C$ (row $101$) is not enough; $A$ with $B$ (row $110$) is. So $S = \sum m(3, 6, 7) = \overline{A}BC + AB\overline{C} + ABC$. Copying $ABC$ and combining: $(\overline{A}BC + ABC) + (AB\overline{C} + ABC) = BC + AB = B(A + C)$. So $S = B(A + C)$: shutdown requires $B$ together with at least one of the others.
:::
:::

::: exercise Self-dual functions {level=3 check="16"}
A function is **self-dual** if it equals its own dual, which for switching functions means $F(\overline{x_1}, \dots, \overline{x_n}) = \overline{F(x_1, \dots, x_n)}$. Show that the majority function is self-dual, and count the self-dual functions of three variables.
::: hint
Rows $i$ and $7 - i$ are complements of each other.
:::
::: solution
For majority, complementing all three inputs turns "at least two ones" into "at least two zeros", i.e. "at most one one", which is exactly the complement of majority. So $\mathrm{MAJ}$ is self-dual (consistent with its dual $(A+B)(B+C)(A+C)$ being equal to $AB + BC + AC$).

Complementing all inputs maps row $i$ to row $7 - i$. Self-duality requires $F_{7-i} = \overline{F_i}$, so the eight rows fall into four pairs $\{0,7\}, \{1,6\}, \{2,5\}, \{3,4\}$, and in each pair the value of one row determines the other. The free choices are the four values $F_0, F_1, F_2, F_3$, giving $2^4 = 16$ self-dual functions. (In general there are $2^{2^{n-1}}$.)
:::
:::

::: exercise Proving consensus by Shannon expansion {level=3}
Use the Shannon expansion [[#eq-shannon]] about $x$ to prove the consensus theorem $xy + \overline{x}z + yz = xy + \overline{x}z$, and explain in one sentence why the theorem is useful in reverse.
::: solution
Let $L = xy + \overline{x}z + yz$. Its cofactors are $L(x{=}0) = z + yz = z$ (absorption) and $L(x{=}1) = y + yz = y$. By Shannon, $L = \overline{x}z + xy$. The right-hand side $R = xy + \overline{x}z$ has the same cofactors, $R(x{=}0) = z$ and $R(x{=}1) = y$, so $L = R$.

Used in reverse, the theorem allows a designer to *add* the redundant consensus term $yz$ without changing the function; when $y = z = 1$ and $x$ switches, that term holds the output at $1$ and removes the momentary glitch that can otherwise occur as one product turns off before the other turns on — a static hazard, studied in [[digital-logic/logic-minimisation]].
:::
:::
