The canonical forms of [[digital-logic/boolean-algebra]] always work, but they are extravagant. The canonical sum of products of a 4-variable function with ten true rows needs ten 4-input AND gates and a 10-input OR gate; a well-chosen equivalent may need three small ANDs. Every literal removed is a transistor pair saved, a wire not routed, a little less capacitance to charge on every clock cycle and, often, a shorter delay. **Logic minimisation** is the search for the cheapest expression of a given function.

For two-level circuits (sum of products or product of sums) the problem has a complete theory, due to Quine and McCluskey, and a beautiful graphical shortcut for up to four or five variables, the Karnaugh map. This chapter develops both, shows how unspecified "don't-care" inputs make circuits cheaper still, explains why the minimal circuit is not always the safest (hazards), and ends with multilevel logic, where real synthesis tools spend most of their effort.

## Implicants and the cost of a circuit

We measure the cost of a two-level SOP expression by its number of **literals** (each literal is a gate input on the first level) and, secondarily, by the number of **product terms** (each is a gate, and an input of the OR gate). Products of a single literal need no AND gate. The literal count is a good proxy for transistor count and area in CMOS.

::: definition Implicants and prime implicants {#def-implicant}
Let $F$ be a Boolean function. A product term $P$ is an **implicant** of $F$ if $P = 1$ implies $F = 1$ (every minterm of $P$ is a minterm of $F$). An implicant is **prime** if removing any literal from it gives a product that is no longer an implicant. A prime implicant is **essential** if it covers some minterm of $F$ that no other prime implicant covers.
:::

Removing a literal from a product doubles the number of minterms it covers, so a prime implicant is a product that is "as large as possible" while staying inside the true set of $F$. For the majority function $\mathrm{MAJ} = \sum m(3, 5, 6, 7)$, the product $ABC$ is an implicant but not prime, since $AB$ is also an implicant; $AB$, $AC$ and $BC$ are the prime implicants, and all three are essential ($AB$ alone covers $m_6$, $AC$ alone $m_5$, $BC$ alone $m_3$).

::: theorem Minimal SOPs consist of prime implicants {#thm-prime}
Every minimum-cost sum-of-products expression for $F$ (minimum literals) is a sum of prime implicants of $F$. Every essential prime implicant appears in every minimal SOP.
:::

::: proof
Each product $P$ in an SOP for $F$ is an implicant, since $P = 1$ forces the sum to $1$. If $P$ is not prime, some literal can be deleted to give an implicant $P'$ covering all the minterms of $P$ and more, all of which are minterms of $F$. Replacing $P$ by $P'$ leaves the sum equal to $F$ and removes one literal, so the original was not minimal. An essential prime implicant covers a minterm that no other prime implicant covers; since a minimal SOP consists only of prime implicants and must cover that minterm, it must include the essential one.
:::

So minimisation splits into two steps: **(1) find all prime implicants**, and **(2) choose a cheapest subset that covers every minterm**. The Karnaugh map does both by eye; the Quine–McCluskey method does both by table.

## Karnaugh maps

Two minterms are **adjacent** if they differ in exactly one variable, like $\overline{A}BC$ and $ABC$; by the combining theorem they merge into a single product with that variable removed. The $2^n$ minterms are the corners of an $n$-dimensional cube, adjacent minterms joined by edges, and a product term with $n - k$ literals is a $k$-dimensional sub-cube of $2^k$ corners. A **Karnaugh map** flattens this cube onto a grid in which adjacent minterms are adjacent cells.

::: definition Karnaugh map {#def-kmap}
A **Karnaugh map** of a function of $n$ variables is a grid of $2^n$ cells, one per minterm, whose rows and columns are labelled by the values of subsets of the variables listed in **Gray-code order** ($00, 01, 11, 10$), so that cells that are horizontally or vertically next to each other — including across the left–right and top–bottom edges, which wrap around — are adjacent minterms. Each cell holds the function's value: $1$, $0$, or $\times$ for a don't-care.
:::

For four variables $A, B, C, D$ with $AB$ labelling the rows and $CD$ the columns, the minterm numbers sit in the cells as follows:

| $AB \backslash CD$ | $00$ | $01$ | $11$ | $10$ |
|---|---|---|---|---|
| $00$ | $0$ | $1$ | $3$ | $2$ |
| $01$ | $4$ | $5$ | $7$ | $6$ |
| $11$ | $12$ | $13$ | $15$ | $14$ |
| $10$ | $8$ | $9$ | $11$ | $10$ |

Notice the order $\dots 3, 2$ and $\dots 12, \dots 8$: binary order would put $10$ next to $01$, which differ in two bits. Gray order is what makes geometry match algebra ([[digital-logic/number-systems#def-gray]]).

::: theorem Rectangles are products {#thm-rect}
On a Karnaugh map, a set of $2^k$ cells forming a rectangle (with wrap-around) whose sides are powers of two corresponds to a single product term with $n - k$ literals: the variables that are constant over the rectangle appear (complemented where constant $0$), and the $k$ variables that take both values over it disappear. Conversely, every product term is such a rectangle.
:::

::: proof
A row label in Gray order with $r$ bits: any run of $2^j$ consecutive (cyclic) labels that is *aligned* in this way — the whole set, either half, or any aligned quarter like $\{01, 11\}$ or $\{10, 00\}$ — consists of all labels in which a fixed subset of $r - j$ bits takes fixed values and the remaining $j$ bits take all $2^j$ combinations. (For $r = 2$: $\{00, 01\}$ fixes the first bit at $0$; $\{01, 11\}$ fixes the second at $1$; $\{11, 10\}$ fixes the first at $1$; $\{10, 00\}$, wrapping, fixes the second at $0$.) A rectangle is a product of such a row set and such a column set, so it is the set of minterms in which $n - k$ variables are fixed and $k$ are free — exactly the minterms of the product of the $n - k$ fixed literals. Reading the argument backwards, every product of literals is such a rectangle.
:::

::: algorithm Minimisation with a Karnaugh map {#alg-kmap}
1. Fill in the map: a $1$ in every cell of the on-set, $\times$ for don't-cares, $0$ (or blank) elsewhere.
2. Find the prime implicants: for each $1$, find the largest rectangles of size $1, 2, 4, 8, \dots$ that contain it and contain only $1$s and $\times$s. Remember the wrap-around edges and the four corners of a 4-variable map.
3. Mark the **essential** prime implicants: those containing a $1$ covered by no other prime implicant. Include them all.
4. Cover any remaining $1$s with as few, and as large, prime implicants as possible. Don't-cares are used when they enlarge a rectangle and are never required to be covered.
5. Read off each rectangle as a product (constant variables only) and OR them.
:::

::: example A four-variable map with corners {#ex-kmap4}
Minimise $F(A, B, C, D) = \sum m(0, 2, 4, 5, 6, 7, 8, 10, 13, 15)$.
::: solution
The map:

| $AB \backslash CD$ | $00$ | $01$ | $11$ | $10$ |
|---|---|---|---|---|
| $00$ | 1 | 0 | 0 | 1 |
| $01$ | 1 | 1 | 1 | 1 |
| $11$ | 0 | 1 | 1 | 0 |
| $10$ | 1 | 0 | 0 | 1 |

*Prime implicants.* The four corners $0, 2, 8, 10$ form a rectangle through both wrap-arounds: $B = 0$ and $D = 0$ throughout, so it is $\overline{B}\,\overline{D}$. The square $5, 7, 13, 15$ in the middle has $B = 1$, $D = 1$: $BD$. Row $01$ (cells $4, 5, 7, 6$) is $\overline{A}B$. The cells $0, 4, 2, 6$ (columns $00$ and $10$ wrap together, rows $00$ and $01$) form $\overline{A}\,\overline{D}$. These four are all the prime implicants.

*Essential.* Cell $8$ is covered only by $\overline{B}\,\overline{D}$, and cell $13$ only by $BD$, so both are essential. They cover $0, 2, 5, 7, 8, 10, 13, 15$.

*Remaining.* Cells $4$ and $6$ are still uncovered. Either $\overline{A}B$ or $\overline{A}\,\overline{D}$ covers both, at equal cost. So there are two minimal solutions:

$$
F = \overline{B}\,\overline{D} + BD + \overline{A}B \qquad\text{or}\qquad F = \overline{B}\,\overline{D} + BD + \overline{A}\,\overline{D},
$$

each with six literals instead of the canonical form's forty. A minimal expression need not be unique.
:::
:::

### Product of sums from the zeros

The zeros of $F$ are the ones of $\overline{F}$. Grouping the zeros gives a minimal SOP for $\overline{F}$, and De Morgan turns it into a minimal POS for $F$. In [[#ex-kmap4]] the zeros are cells $1, 3, 9, 11$ (rectangle $\overline{B}D$) and $12, 14$ (cells with $A = B = 1$, $D = 0$: $AB\overline{D}$). Hence $\overline{F} = \overline{B}D + AB\overline{D}$ and

$$
F = (B + \overline{D})(\overline{A} + \overline{B} + D),
$$

five literals — one fewer than the best SOP. Which form is cheaper depends on the function, so a careful designer tries both; a POS maps onto NOR–NOR logic just as an SOP maps onto NAND–NAND ([[digital-logic/boolean-algebra#prop-nandnand]]).

::: widget truthtable
formula: (~B & ~D) | (B & D) | (~A & B)
compare: (B | ~D) & (~A | ~B | D)
caption: The minimal SOP and the minimal POS of the function in the example above. Both columns are $1$ in exactly the ten rows $0, 2, 4, 5, 6, 7, 8, 10, 13, 15$ (counting rows from $0$ with $A$ as the most significant bit). Change the last term of the first formula to `~A & ~D` — the other minimal solution — and check that it is still equivalent.
:::

### Cyclic functions

Not every function has essential prime implicants. On a three-variable map with $AB$ labelling four columns and $C$ two rows, consider $F = \sum m(0, 1, 2, 5, 6, 7)$:

| $C \backslash AB$ | $00$ | $01$ | $11$ | $10$ |
|---|---|---|---|---|
| $0$ | 1 | 1 | 1 | 0 |
| $1$ | 1 | 0 | 1 | 1 |

Its six prime implicants are the pairs $\overline{A}\,\overline{B}$ ($m_0, m_1$), $\overline{A}\,\overline{C}$ ($m_0, m_2$), $B\overline{C}$ ($m_2, m_6$), $AB$ ($m_6, m_7$), $AC$ ($m_5, m_7$) and $\overline{B}C$ ($m_1, m_5$). They form a ring around the map: each minterm lies in exactly two of them, and none is essential. Choosing alternate members of the ring gives two minimal covers of three terms, $\overline{A}\,\overline{C} + \overline{B}C + AB$ and $\overline{A}\,\overline{B} + B\overline{C} + AC$. When the map has no obvious starting point, pick any cell, try each prime implicant that covers it, and compare the results — the systematic version is Petrick's method below.

## Don't-care conditions

Often some input combinations can never occur, or their output does not matter. A BCD digit uses only the patterns $0000$ to $1001$, so a circuit that decodes BCD may do anything at all for inputs $1010$ to $1111$. Such rows are **don't-cares**, marked $\times$ or listed separately as $d(\dots)$. The designer may treat each don't-care as $0$ or $1$, whichever gives the cheaper circuit.

::: example A prime-digit detector {#ex-prime}
A circuit receives a BCD digit $ABCD$ and outputs $1$ when the digit is prime ($2$, $3$, $5$ or $7$). Minimise it with and without using the don't-cares $d(10, \dots, 15)$.
::: solution
The map, with don't-cares in rows $AB = 11$ and cells $1011$, $1010$:

| $AB \backslash CD$ | $00$ | $01$ | $11$ | $10$ |
|---|---|---|---|---|
| $00$ | 0 | 0 | 1 | 1 |
| $01$ | 0 | 1 | 1 | 0 |
| $11$ | × | × | × | × |
| $10$ | 0 | 0 | × | × |

*Without don't-cares* (treat × as $0$): cells $2, 3$ form $\overline{A}\,\overline{B}C$; cells $5, 7$ form $\overline{A}BD$. Result: $F = \overline{A}\,\overline{B}C + \overline{A}BD$, six literals.

*With don't-cares*: cells $2, 3, 11, 10$ (column $CD = 11, 10$, rows $00$ and $10$ wrapping) form the rectangle $\overline{B}C$; cells $5, 7, 13, 15$ form $BD$. Result: $F = \overline{B}C + BD$, four literals.

The two circuits agree on all ten legal BCD inputs and differ only on inputs that cannot occur — for example, on $1011$ the second outputs $1$. If those inputs *can* in fact occur (a fault, a power-up state), the don't-care assumption becomes a bug; make sure it is justified.
:::
:::

::: warning Don't-cares are a promise about the environment
A don't-care is not a property of the circuit but an assumption about its inputs. Document it, and if the inputs come from outside the chip (a switch, a bus, another designer's block), check that the assumption holds. In hardware description languages a don't-care output is written `'x'` or via a `default` that assigns `x`; a synthesis tool will then exploit it, and the simulated and synthesised behaviours may differ on those inputs.
:::

::: quiz
On a 4-variable Karnaugh map, which group of cells is **not** a valid single product term?
- [ ] cells $0, 2, 8, 10$ (the four corners)
- [ ] cells $1, 3, 9, 11$
- [x] cells $5, 7, 13, 6$
- [ ] cells $4, 5, 12, 13$
::: solution
Cells $0, 2, 8, 10$ are $\overline{B}\,\overline{D}$; cells $1, 3, 9, 11$ are $\overline{B}D$; cells $4, 5, 12, 13$ are $B\overline{C}$. Cells $5, 7, 13, 6$ form an L shape, not a rectangle: $5 = 0101$, $7 = 0111$, $13 = 1101$, $6 = 0110$, and no set of literals is common to exactly these four (they would need two free variables, but $A$, $C$ and $D$ all vary). Only rectangles of power-of-two sides are products ([[#thm-rect]]).
:::
:::

## The Quine–McCluskey method

Karnaugh maps rely on the eye to see rectangles, and the eye fails beyond five or six variables. The **Quine–McCluskey method** performs the same two steps by a mechanical procedure that a computer (or a patient person) can run for any number of variables.

::: algorithm Quine–McCluskey {#alg-qm}
*Step 1: prime implicants.* Write each minterm and don't-care in binary and group them by the number of $1$s. Compare every term in group $k$ with every term in group $k+1$: if two terms differ in exactly one bit position (and have their dashes in the same positions), write the merged term with a dash ($-$) in that position in the next column, and tick both originals. Repeat on the new column until no merges are possible. The unticked terms are the prime implicants.

*Step 2: covering.* Build the **prime implicant chart**: a row for each prime implicant, a column for each minterm (not the don't-cares), with a mark where the implicant covers the minterm. Select the essential prime implicants (columns with a single mark), delete the columns they cover, and then choose a cheapest set of remaining rows covering all remaining columns — by row and column dominance, or exhaustively by Petrick's method.
:::

::: example Quine–McCluskey on four variables {#ex-qm}
Minimise $F(A, B, C, D) = \sum m(0, 1, 2, 5, 6, 7, 8, 9, 10, 14)$.
::: solution
*Column 1* (minterms by number of ones):

| ones | minterms |
|---|---|
| 0 | $0 = 0000$ |
| 1 | $1 = 0001$, $2 = 0010$, $8 = 1000$ |
| 2 | $5 = 0101$, $6 = 0110$, $9 = 1001$, $10 = 1010$ |
| 3 | $7 = 0111$, $14 = 1110$ |

*Column 2* (pairs differing in one bit): $(0,1) = 000{-}$, $(0,2) = 00{-}0$, $(0,8) = {-}000$; $(1,5) = 0{-}01$, $(1,9) = {-}001$, $(2,6) = 0{-}10$, $(2,10) = {-}010$, $(8,9) = 100{-}$, $(8,10) = 10{-}0$; $(5,7) = 01{-}1$, $(6,7) = 011{-}$, $(6,14) = {-}110$, $(10,14) = 1{-}10$. Every minterm is ticked.

*Column 3* (merging pairs with dashes in the same place): $(0,1,8,9) = {-}00{-}$, $(0,2,8,10) = {-}0{-}0$, $(2,6,10,14) = {-}{-}10$. These tick $000{-}$, $100{-}$, ${-}000$, ${-}001$, $00{-}0$, $10{-}0$, ${-}010$, $0{-}10$, ${-}110$, $1{-}10$. No further merges are possible.

The unticked terms are the prime implicants:

| prime implicant | product | covers |
|---|---|---|
| ${-}00{-}$ | $\overline{B}\,\overline{C}$ | 0, 1, 8, 9 |
| ${-}0{-}0$ | $\overline{B}\,\overline{D}$ | 0, 2, 8, 10 |
| ${-}{-}10$ | $C\overline{D}$ | 2, 6, 10, 14 |
| $0{-}01$ | $\overline{A}\,\overline{C}D$ | 1, 5 |
| $01{-}1$ | $\overline{A}BD$ | 5, 7 |
| $011{-}$ | $\overline{A}BC$ | 6, 7 |

*Covering.* Minterm $9$ is covered only by $\overline{B}\,\overline{C}$, and $14$ only by $C\overline{D}$: both are essential. Together they cover $0, 1, 2, 6, 8, 9, 10, 14$. The remaining minterms $5$ and $7$ are both covered by $\overline{A}BD$, whereas any other choice needs two terms. So

$$
F = \overline{B}\,\overline{C} + C\overline{D} + \overline{A}BD ,
$$

seven literals. The prime implicant $\overline{B}\,\overline{D}$ exists but is not needed: everything it covers is covered by the others.
:::
:::

When no essential implicants remain but columns are still uncovered, **Petrick's method** writes the covering condition as a Boolean expression: for each uncovered minterm, an OR of the (names of the) implicants that cover it; the AND of these clauses, multiplied out and simplified by absorption, lists every irredundant cover, from which the cheapest is chosen. For the cyclic function above, with implicants named $P_1 = \overline{A}\,\overline{B}$, $P_2 = \overline{A}\,\overline{C}$, $P_3 = B\overline{C}$, $P_4 = AB$, $P_5 = AC$, $P_6 = \overline{B}C$, the condition is $(P_1 + P_2)(P_2 + P_3)(P_3 + P_4)(P_4 + P_5)(P_5 + P_6)(P_6 + P_1)$, whose smallest products are $P_1P_3P_5$ and $P_2P_4P_6$.

::: quiz
In step 1 of the Quine–McCluskey method, which pair of terms can be merged?
- [ ] $01{-}1$ and $0{-}11$
- [x] $1{-}01$ and $1{-}11$
- [ ] $0011$ and $0101$
- [ ] $10{-}0$ and $1{-}10$
::: solution
Two terms merge only if their dashes are in the same positions and they differ in exactly one other bit. $1{-}01$ and $1{-}11$ have the dash in the same place and differ only in the third bit, giving $1{-}{-}1$. The first pair has dashes in different places; $0011$ and $0101$ differ in two bits; $10{-}0$ and $1{-}10$ again have their dashes in different positions.
:::
:::

::: remark How hard is minimisation?
Both steps can explode. A function of $n$ variables can have on the order of $3^n/n$ prime implicants, and the covering step is an instance of the set-cover problem, which is NP-hard. Exact two-level minimisation is therefore practical only up to a few dozen variables. Industrial tools use heuristics: **Espresso**, developed at IBM and the University of California, Berkeley, in the early 1980s, iteratively expands, reduces and makes irredundant a cover without ever listing all prime implicants, and gives near-minimal results for functions with hundreds of inputs.
:::

## Hazards: when minimal is not safe

Gates have delay. Consider $F = AB + \overline{A}C$ with $B = C = 1$. Logically $F = A + \overline{A} = 1$ whatever $A$ does. But suppose $A$ falls from $1$ to $0$. The term $AB$ turns off immediately, while $\overline{A}C$ can only turn on after the inverter producing $\overline{A}$ has switched. For that inverter delay, both terms are $0$ and the output dips to $0$ — a brief **glitch**.

::: definition Static and dynamic hazards {#def-hazard}
A **static-1 hazard** is a possibility that an output which should stay at $1$ during an input change momentarily goes to $0$; a **static-0 hazard** is a momentary $1$ on an output that should stay $0$. A **dynamic hazard** is a possibility that an output that should change once changes three or more times. Hazards arise from unequal path delays and depend on the circuit's structure, not only on its Boolean function.
:::

::: widget plot
f: 4 + 1 - heaviside(x - 1); 2 + heaviside(x - 1 - d); max(1 - heaviside(x - 1), heaviside(x - 1 - d))
x: 0, 4
y: -0.5, 5.5
sliders: d=0.5:0:1.5:0.05
labels: A \text{ (offset 4)}; \overline{A} \text{ after inverter delay } d \text{ (offset 2)}; F = AB + \overline{A}C \text{ with } B = C = 1
caption: A static-1 hazard. When $A$ falls at $t = 1$, the term $AB$ switches off at once but $\overline{A}C$ only switches on after the inverter delay $d$. The output $F$ drops to $0$ for a time $d$ although logically it should stay at $1$. Drag $d$ to $0$: the glitch vanishes only for a perfectly fast inverter, which does not exist.
:::

On a Karnaugh map, a static-1 hazard in a two-level SOP circuit appears as two *adjacent* $1$ cells covered by *different* product terms, with no single term covering both. The cure follows from the consensus theorem ([[digital-logic/boolean-algebra#thm-identities]]): add the consensus term, here $BC$, which covers the transition and holds the output at $1$ while $A$ changes.

::: theorem Hazard-free two-level logic {#thm-hazardfree}
A two-level SOP circuit is free of static-1 hazards for all single-input changes if and only if every pair of adjacent minterms of $F$ is covered by a common product term. Including *all* prime implicants of $F$ is sufficient.
:::

::: proof
If the inputs change in one variable between two adjacent minterms that are both covered by a product $P$, then $P$ does not depend on the changing variable and stays at $1$ throughout, holding the OR output high; no glitch is possible. If no product covers both, then the product holding the output at $1$ before the change depends on the changing variable, and so does the product that holds it afterwards; for suitable delays the first turns off before the second turns on, and the output glitches. Finally, if all prime implicants are present, any two adjacent minterms of $F$ merge into an implicant of two cells, which is contained in some prime implicant: that prime implicant covers both.
:::

Hazards matter wherever a glitch is *seen*: on an asynchronous reset or clock input, on a write-enable to a memory, or on any signal leaving the chip. In synchronous designs ([[digital-logic/hardware-description]]) combinational outputs are only sampled by flip-flops after they have settled, so glitches on internal logic are harmless and minimal logic is fine — one of the great simplifications of synchronous design.

::: example Removing a hazard {#ex-hazard}
The function $F = \overline{A}\,\overline{B} + BC$ is built as a two-level NAND–NAND circuit. Find the input change that can cause a static-1 hazard and give a hazard-free SOP.
::: solution
On a map of $A, B, C$, the term $\overline{A}\,\overline{B}$ covers $m_0, m_1$ and $BC$ covers $m_3, m_7$. The cells $m_1 = 001$ and $m_3 = 011$ are adjacent (they differ in $B$) and both are $1$, but no single term covers both. So with $A = 0$, $C = 1$, a change of $B$ can glitch: when $B$ falls, $BC$ turns off at once, but $\overline{A}\,\overline{B}$ turns on only after the inverter producing $\overline{B}$ has switched, and for that interval $F$ dips to $0$.

The consensus of $\overline{A}\,\overline{B}$ and $BC$ (with respect to $B$) is $\overline{A}C$, which covers $m_1$ and $m_3$. The hazard-free form is

$$
F = \overline{A}\,\overline{B} + BC + \overline{A}C ,
$$

logically equal to the original (consensus theorem) but with one more gate. The prime implicants of $F$ are exactly these three, in agreement with [[#thm-hazardfree]].
:::
:::

## Multilevel logic

Two-level forms are easy to analyse, but they are rarely the cheapest circuits once gates may be cascaded. **Factoring** pulls common literals out of terms:

$$
F = AC + AD + BC + BD = (A + B)(C + D)
$$

needs four literals as a product of sums (and is already a minimal POS), but eight literals as a minimal SOP. In general, factored forms of depth three or more can be exponentially smaller than any two-level form: the $n$-input parity function needs $n\,2^{n-1}$ literals in SOP but only $2(n-1)$ XOR inputs as a tree.

Multilevel optimisation also shares logic between outputs. If one output needs $AB + C$ and another $AB + D$, a single AND gate for $AB$ feeds both ORs. Synthesis tools perform these transformations — factoring, extracting common subexpressions, re-substitution — on networks of thousands of nodes, trading area against delay, since every extra level costs a gate delay.

::: example Factoring to save gates {#ex-factor}
Compare the cost of $F = ACE + ACF + ADE + ADF + BCE + BCF + BDE + BDF$ as a two-level SOP and in factored form, counting literals and two-input gates.
::: solution
The sum is the expansion of $(A + B)(C + D)(E + F)$: each term picks one literal from each bracket. The SOP has $8$ terms of $3$ literals, $24$ literals; as two-input gates, each 3-literal AND costs $2$ gates ($16$) and the 8-input OR costs $7$, $23$ gates in all. Moreover, none of its terms can be merged, so this SOP is already minimal among sums of products.

The factored form has $6$ literals: three 2-input OR gates and two 2-input AND gates, $5$ gates, with a depth of three gate levels instead of the five of a tree-built SOP ($2$ levels of AND, $3$ of OR). The factored form is smaller *and* faster here; usually the trade-off is less one-sided.
:::
:::

::: application What a synthesis tool does
Writing `assign y = (a & b) | (a & c);` in a hardware description language does not fix the gates. As of 2026, logic synthesis tools — commercial ones from the large EDA vendors, and open-source flows built on Berkeley's ABC — convert the description into an and-inverter graph, apply rounds of rewriting, balancing and two-level minimisation (Espresso-style) on small windows, then map the result onto the cells of a standard-cell library or onto the look-up tables of an FPGA, minimising area subject to timing constraints. Hand minimisation is rarely needed for production logic, but it teaches exactly the transformations the tools perform, and you need it to read and check their output.
:::

::: history
Edward Veitch described a chart for simplifying truth functions in 1952, and Maurice Karnaugh of Bell Labs refined it into the map named after him in "The Map Method for Synthesis of Combinational Logic Circuits" (1953). The philosopher Willard Van Orman Quine posed the problem of finding minimal sums of products and introduced prime implicants in 1952; Edward McCluskey turned the idea into the tabular algorithm in 1956, and Stanley Petrick gave his method for the covering step the same year. David Huffman and Stephen Unger developed the theory of hazards in the 1950s. Espresso, by Robert Brayton, Gary Hachtel, Curtis McMullen and Alberto Sangiovanni-Vincentelli, was described in their 1984 book *Logic Minimization Algorithms for VLSI Synthesis*.
:::

## Where this leads

Minimised logic is the inside of every building block in [[digital-logic/combinational-building-blocks]], and the next-state logic of every state machine in [[digital-logic/finite-state-machines]], where don't-cares from unused state codes are exploited exactly as in [[#ex-prime]]. Programmable logic arrays ([[digital-logic/memories-programmable-logic]]) implement minimised SOPs directly, so their size is set by the number of distinct product terms. The timing view of hazards becomes static timing analysis in [[digital-logic/hardware-description]].

::: summary
- Cost is measured by literals and product terms; a minimal SOP is a sum of prime implicants and contains every essential prime implicant ([[#thm-prime]]).
- On a Karnaugh map, rows and columns are in Gray order, edges wrap around, and every rectangle of $2^k$ cells with power-of-two sides is a product with $n - k$ literals ([[#thm-rect]]).
- Minimise by finding prime implicants (largest rectangles), taking the essentials, then covering the rest cheaply; the minimal form need not be unique, and cyclic functions have no essential implicants.
- Group the zeros to get a minimal POS; compare SOP and POS costs.
- Don't-cares may be set to $0$ or $1$ freely, but they are assumptions about the inputs.
- Quine–McCluskey finds all prime implicants by merging terms that differ in one bit, then solves the covering problem with a chart (and Petrick's method when needed); exact minimisation is NP-hard in general.
- Two-level SOP circuits are free of static-1 hazards iff adjacent ones share a product term; consensus terms remove hazards.
- Multilevel factoring and sharing can be much cheaper than any two-level form.
:::

## Exercises

::: exercise A three-variable map {level=1}
Minimise $F(A, B, C) = \sum m(0, 2, 4, 5, 6)$.
::: solution
The cells with $C = 0$ are $0, 2, 4, 6$: all are $1$, giving the rectangle $\overline{C}$ (a whole row of the map). The remaining $1$, $m_5 = 101$, pairs with $m_4 = 100$ to give $A\overline{B}$. So $F = \overline{C} + A\overline{B}$, three literals.
:::
:::

::: exercise The four corners {level=1}
Minimise $F(A, B, C, D) = \sum m(0, 2, 8, 10)$ and explain why these four cells are a valid group.
::: solution
The four corners of the map are mutually adjacent through the wrap-around: $0 = 0000$, $2 = 0010$, $8 = 1000$, $10 = 1010$ have $B = 0$ and $D = 0$ in common and take all four combinations of $A$ and $C$. So $F = \overline{B}\,\overline{D}$.
:::
:::

::: exercise Counting literals of a cyclic function {level=1 check="6"}
How many literals does a minimal SOP of $F(A, B, C) = \sum m(0, 1, 2, 5, 6, 7)$ have?
::: solution
From the cyclic-function discussion, every prime implicant has two literals, none is essential, and a minimal cover needs three of them, for example $\overline{A}\,\overline{C} + \overline{B}C + AB$. That is $6$ literals. (Two terms cover at most four of the six minterms, so three are necessary.)
:::
:::

::: exercise Using don't-cares {level=2}
Minimise $F(A, B, C, D) = \sum m(1, 3, 7, 11, 15) + d(0, 2, 5)$.
::: solution
The column $CD = 11$ (cells $3, 7, 15, 11$) is all ones: $CD$. That leaves $m_1$. It can join the don't-cares $0, 2$ and $m_3$ in the rectangle $\overline{A}\,\overline{B}$ (row $00$), or join $m_3$, $m_7$ and the don't-care $5$ in $\overline{A}D$. Both have two literals, so $F = CD + \overline{A}\,\overline{B}$ or $F = CD + \overline{A}D$, four literals. Without the don't-cares the best is $CD + \overline{A}\,\overline{B}D$, five literals.
:::
:::

::: exercise A minimal product of sums {level=2}
Find a minimal POS for $F(A, B, C, D) = \sum m(0, 1, 2, 3, 4, 6, 8, 9, 10, 11)$, and compare its cost with the minimal SOP.
::: solution
The zeros are $5, 7, 12, 13, 14, 15$. On the map, $5, 7, 13, 15$ form $BD$ and $12, 13, 14, 15$ (row $11$) form $AB$, so $\overline{F} = BD + AB$ and $F = (\overline{B} + \overline{D})(\overline{A} + \overline{B})$, four literals. The minimal SOP from the ones is $F = \overline{B} + \overline{A}\,\overline{D}$, three literals (rows $00$ and $10$ give $\overline{B}$; cells $0, 2, 4, 6$ give $\overline{A}\,\overline{D}$). The SOP is cheaper here, and indeed the POS multiplies out to $\overline{B} + \overline{A}\,\overline{D}$.
:::
:::

::: exercise A seven-segment decoder segment {level=2}
A BCD-to-seven-segment decoder drives segment $a$ (the top bar), which is lit for the digits $0, 2, 3, 5, 6, 7, 8, 9$. Using the don't-cares $10$–$15$, find a minimal SOP for $a(A, B, C, D)$.
::: hint
Large rectangles are available: whole rows and columns that include the don't-care row $AB = 11$.
:::
::: solution
Fill ones at $0, 2, 3, 5, 6, 7, 8, 9$ and × at $10$–$15$. Prime implicants that help: $A$ (rows $11$ and $10$: cells $8$–$15$, using don't-cares), $C$ (columns $11$ and $10$: cells $2, 3, 6, 7, 10, 11, 14, 15$), $BD$ (cells $5, 7, 13, 15$) and $\overline{B}\,\overline{D}$ (corners $0, 2, 8, 10$). Each is essential: $m_9$ only by $A$, $m_3$ and $m_6$ only by $C$, $m_5$ only by $BD$, $m_0$ only by $\overline{B}\,\overline{D}$. So

$$
a = A + C + BD + \overline{B}\,\overline{D},
$$

six literals. Without the don't-cares a minimal SOP needs four terms with $3 + 2 + 3 + 3 = 11$ literals, for example $\overline{A}C + \overline{A}BD + A\overline{B}\,\overline{C} + \overline{B}\,\overline{C}\,\overline{D}$.
:::
:::

::: exercise Finding a hazard {level=2}
The circuit $F = AB + \overline{B}C$ is built in two-level AND–OR logic. For which input values and which changing input can a static-1 hazard occur? Give the hazard-free SOP.
::: solution
The term $AB$ covers cells $110$ and $111$, and $\overline{B}C$ covers $001$ and $101$. The cells $111$ and $101$ are adjacent ones (they differ in $B$) but lie in different terms. So with $A = 1$, $C = 1$, a change of $B$ may glitch: when $B$ falls, $AB$ turns off at once while $\overline{B}C$ waits for the inverter producing $\overline{B}$. The consensus term with respect to $B$ is $AC$, giving the hazard-free $F = AB + \overline{B}C + AC$.
:::
:::

::: exercise Quine–McCluskey with don't-cares {level=3}
Use the Quine–McCluskey method to find all prime implicants and a minimal SOP of $F(A, B, C, D) = \sum m(4, 8, 10, 11, 12, 15) + d(9, 14)$.
::: hint
Include the don't-cares in step 1 but not as columns of the chart in step 2.
:::
::: solution
*Step 1.* Groups: one $1$: $4 = 0100$, $8 = 1000$; two: $9 = 1001$, $10 = 1010$, $12 = 1100$; three: $11 = 1011$, $14 = 1110$; four: $15 = 1111$.

Pairs: $(4,12) = {-}100$, $(8,9) = 100{-}$, $(8,10) = 10{-}0$, $(8,12) = 1{-}00$, $(9,11) = 10{-}1$, $(10,11) = 101{-}$, $(10,14) = 1{-}10$, $(12,14) = 11{-}0$, $(11,15) = 1{-}11$, $(14,15) = 111{-}$.

Quads: $(8,9,10,11) = 10{-}{-}$, $(8,10,12,14) = 1{-}{-}0$, $(10,11,14,15) = 1{-}1{-}$. Only ${-}100$ is not absorbed into a quad.

Prime implicants: $B\overline{C}\,\overline{D}$ (${-}100$: 4, 12), $A\overline{B}$ ($10{-}{-}$: 8, 9, 10, 11), $A\overline{D}$ ($1{-}{-}0$: 8, 10, 12, 14), $AC$ ($1{-}1{-}$: 10, 11, 14, 15).

*Step 2.* Columns $4, 8, 10, 11, 12, 15$. Minterm $4$ is covered only by $B\overline{C}\,\overline{D}$, and $15$ only by $AC$: both essential. They cover $4, 12, 10, 11, 15$. Minterm $8$ remains, covered by $A\overline{B}$ or $A\overline{D}$, both two literals. Minimal SOPs:

$$
F = B\overline{C}\,\overline{D} + AC + A\overline{B} \quad\text{or}\quad F = B\overline{C}\,\overline{D} + AC + A\overline{D},
$$

seven literals.
:::
:::

::: exercise Factoring a multiplexer tree {level=3}
Show that the function $F = \overline{S_1}\,\overline{S_0}D_0 + \overline{S_1}S_0D_1 + S_1\overline{S_0}D_2 + S_1S_0D_3$ (a 4-to-1 multiplexer) has a minimal SOP of 12 literals, and give a factored form with fewer literals. Which form has fewer gate levels?
::: hint
For the SOP, check whether any pair of terms can be merged. For the factored form, use the Shannon expansion about $S_1$.
:::
::: solution
Each product contains one data literal and a distinct pair of select literals. Any two products differ in at least one select literal *and* in their data literal, so no two of them merge; each product is prime (deleting any literal admits an input combination where $F = 0$; e.g. deleting $D_0$ from the first makes it $1$ when $S_1 = S_0 = 0$, $D_0 = 0$). All four are essential (each alone covers the minterms where only its data input is $1$), so the minimal SOP is the given 12-literal form.

Factoring about $S_1$: $F = \overline{S_1}(\overline{S_0}D_0 + S_0D_1) + S_1(\overline{S_0}D_2 + S_0D_3)$, with $10$ literals, a tree of three 2-to-1 multiplexers. The SOP has two gate levels (plus the select inverters); the factored form has four (AND–OR for the inner multiplexers, then AND–OR again). The factored form is smaller but slower — the typical multilevel trade-off.
:::
:::

::: exercise Hazard-free cover {level=3}
Prove that the sum of *all* prime implicants of $F$ (the **complete sum**) equals $F$, and use [[#thm-hazardfree]] to explain why it is free of static-1 hazards. Is the complete sum of $F = \sum m(0, 2, 4, 5, 6, 7, 8, 10, 13, 15)$ larger than its minimal SOP?
::: solution
Every minterm of $F$ is an implicant, contained in at least one prime implicant (extend it by deleting literals until it is prime), so the complete sum covers every minterm; and each prime implicant is an implicant, so the complete sum is $1$ only where $F$ is. Hence it equals $F$. Two adjacent minterms of $F$ merge into a two-cell implicant, which is contained in a prime implicant; since all prime implicants are present, a common term covers the pair, so by [[#thm-hazardfree]] there is no static-1 hazard for single-input changes.

For the function of [[#ex-kmap4]] the prime implicants are $\overline{B}\,\overline{D}$, $BD$, $\overline{A}B$ and $\overline{A}\,\overline{D}$, so the complete sum has four terms and eight literals, against six literals for either minimal SOP. Hazard freedom costs one extra term here.
:::
:::
