Nobody designs a processor gate by gate. Designers think in blocks — "a 32-bit adder here, a multiplexer choosing between two operands there, a decoder selecting one of eight registers" — and only the blocks themselves are designed at the gate level, once, carefully, and then reused. This chapter builds the standard **combinational** blocks: circuits whose outputs depend only on their present inputs, with no memory. They are the multiplexer, the decoder and encoder, the adder in its slow and fast forms, the comparator, the shifter, and the arithmetic logic unit that combines them.

Two threads run through the chapter. One is *function*: each block is a Boolean function with many inputs, and we use the algebra of [[digital-logic/boolean-algebra]] and the minimisation of [[digital-logic/logic-minimisation]] to build it. The other is *speed*. Once the blocks are wired into a datapath, the time a signal needs to travel through them sets the clock frequency of the whole system. The adder is where these threads meet most dramatically: the obvious design is slow, and the fast designs are among the most elegant ideas in digital engineering.

## Timing of combinational logic

A real gate does not respond instantly. When an input changes, the output starts to change after a short interval and settles after a longer one.

::: definition Propagation and contamination delay {#def-delay}
The **propagation delay** $t_{pd}$ of a combinational circuit is the maximum time from an input change until all outputs have reached their final values. The **contamination delay** $t_{cd}$ is the minimum time from an input change until any output starts to change. For a network of gates, $t_{pd}$ is the sum of the gate propagation delays along the slowest input-to-output path, the **critical path**; $t_{cd}$ is the sum of contamination delays along the fastest path, the **short path**.
:::

Between $t_{cd}$ and $t_{pd}$ the output is unknown and may glitch ([[digital-logic/logic-minimisation#def-hazard]]). For hand analysis we use a crude but useful model: every gate costs one **gate delay** $t_g$, so delay is counted in logic levels. Real delays depend on the gate type, its fan-out and the wire it drives; [[digital-ic/static-cmos-logic]] treats them properly. As a rough scale, a lightly loaded gate in a recent CMOS process switches in the order of $10\,\mathrm{ps}$, while a heavily loaded gate or a long wire costs many times that.

Both delays will matter. The propagation delay limits how fast the system can be clocked; the contamination delay limits how *little* logic may sit between two flip-flops before data races through ([[digital-logic/latches-flip-flops]]).

## Multiplexers

::: definition Multiplexer {#def-mux}
A **$2^k$-to-1 multiplexer** (mux) has $2^k$ data inputs $D_0, \dots, D_{2^k - 1}$, $k$ select inputs $S_{k-1}\dots S_0$, and one output $Y = D_s$, where $s$ is the unsigned number on the select lines. As a Boolean expression,

$$
Y = \sum_{s=0}^{2^k - 1} m_s(S_{k-1}, \dots, S_0)\, D_s ,
$$ {#eq-mux}

where $m_s$ is the $s$-th minterm of the select variables. The 2-to-1 case is $Y = \overline{S}D_0 + SD_1$.
:::

A mux is a switch steered by a number: it chooses which operand reaches an adder, which register drives a bus, which of several results leaves an ALU. Large muxes are built as trees: a 4-to-1 mux is two 2-to-1 muxes controlled by $S_0$ feeding a third controlled by $S_1$ — the Shannon expansion ([[digital-logic/boolean-algebra#thm-shannon]]) applied twice. In CMOS a 2-to-1 mux can also be built from two **transmission gates** (an nMOS and a pMOS transistor in parallel acting as a bidirectional switch), which is smaller than the AND–OR form.

The Shannon expansion also shows that a mux is a **universal** function block.

::: theorem Multiplexers implement any function {#thm-muxlogic}
Any Boolean function of $n$ variables can be implemented by a $2^n$-to-1 multiplexer with the variables on the select lines and the truth-table values ($0$ or $1$) on the data inputs. It can also be implemented by a $2^{n-1}$-to-1 multiplexer with $n - 1$ of the variables on the select lines and each data input connected to $0$, $1$, the remaining variable $x$, or $\overline{x}$.
:::

::: proof
For the first form, put $D_s = F_s$ (the value in row $s$) in [[#eq-mux]]: $Y = \sum_s m_s F_s$, the canonical sum of minterms of $F$ ([[digital-logic/boolean-algebra#thm-canonical]]). For the second, use the select variables to choose a row *pair* that differs only in $x$. In that pair $F$ is a function of $x$ alone, and there are only four such functions: $0$, $1$, $x$ and $\overline{x}$. Connecting $D_s$ to the right one of the four makes $Y = F$ in both rows of every pair.
:::

The second form is how a **look-up table** (LUT) in an FPGA works: a small memory holds the $2^n$ truth-table bits, and the inputs drive the select lines of a mux tree that reads one of them out ([[digital-logic/memories-programmable-logic]]).

::: example A majority gate from a multiplexer {#ex-muxmaj}
Implement the majority function $\mathrm{MAJ}(A, B, C)$ with one 4-to-1 multiplexer, using $A$ and $B$ as select inputs.
::: solution
Pair the truth-table rows by $AB$:

| $AB$ | rows | $\mathrm{MAJ}$ for $C = 0, 1$ | data input |
|---|---|---|---|
| $00$ | $0, 1$ | $0, 0$ | $D_0 = 0$ |
| $01$ | $2, 3$ | $0, 1$ | $D_1 = C$ |
| $10$ | $4, 5$ | $0, 1$ | $D_2 = C$ |
| $11$ | $6, 7$ | $1, 1$ | $D_3 = 1$ |

So connect $D_0$ to ground, $D_1$ and $D_2$ to $C$, $D_3$ to the supply. Check: by [[#eq-mux]], $Y = \overline{A}BC + A\overline{B}C + AB$, which equals $AB + BC + AC$ (expand $AB = AB(C + \overline{C})$ and regroup).
:::
:::

::: quiz
What is the smallest multiplexer that can implement an arbitrary Boolean function of $5$ variables, using only constants, one variable and its complement on the data inputs?
- [ ] a 32-to-1 multiplexer
- [x] a 16-to-1 multiplexer
- [ ] an 8-to-1 multiplexer
- [ ] a 4-to-1 multiplexer
::: solution
By the second form of [[#thm-muxlogic]], four of the variables go on the select lines of a $2^4 = 16$-to-1 multiplexer and each data input is $0$, $1$, $x$ or $\overline{x}$ for the fifth variable $x$. An 8-to-1 mux would leave two variables for each data input, and there are sixteen functions of two variables, not four.
:::
:::

## Decoders and encoders

::: definition Decoder {#def-decoder}
An **$n$-to-$2^n$ decoder** has $n$ inputs $A_{n-1}\dots A_0$ and $2^n$ outputs $Y_0, \dots, Y_{2^n - 1}$, with $Y_i = m_i(A_{n-1}, \dots, A_0)$: exactly one output, the one numbered by the input, is $1$. A decoder with an **enable** input $E$ has $Y_i = E\,m_i$, so all outputs are $0$ when $E = 0$.
:::

A decoder turns a binary number into a **one-hot** code — one wire per value — which is what is needed to select one memory row of many, one register of a register file, or one chip on a bus. Since it produces every minterm, a decoder plus OR gates implements any set of functions of the same inputs: $F = \sum m(1, 2, 4, 7)$ is the OR of $Y_1, Y_2, Y_4, Y_7$. Large decoders are built from small ones: the enable inputs let a 2-to-4 decoder on the top two address bits enable one of four 3-to-8 decoders on the low three bits, forming a 5-to-32 decoder. In memories ([[digital-logic/memories-programmable-logic]]) the address decoder is often split into a **predecoder** for groups of bits and a final AND per row, which is faster and smaller.

The inverse operation, from one-hot back to binary, is an **encoder**. A plain encoder assumes exactly one input is active; in practice several may be, and a **priority encoder** reports the highest-numbered active input together with a *valid* flag.

::: example A 4-input priority encoder {#ex-prio}
Design a priority encoder with inputs $I_3, I_2, I_1, I_0$ ($I_3$ highest priority), a 2-bit output $Y_1Y_0$ giving the number of the highest active input, and an output $V$ that is $1$ when any input is active.
::: solution
The behaviour, with × for "either value":

| $I_3$ | $I_2$ | $I_1$ | $I_0$ | $Y_1$ | $Y_0$ | $V$ |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | × | × | 0 |
| 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | × | 0 | 1 | 1 |
| 0 | 1 | × | × | 1 | 0 | 1 |
| 1 | × | × | × | 1 | 1 | 1 |

$Y_1$ is $1$ when $I_3$ or $I_2$ is active: $Y_1 = I_3 + I_2$ (the output in the first row is don't-care, and choosing $0$ there is consistent). $Y_0$ is $1$ in the last row and in the row with $I_1$ highest: $Y_0 = I_3 + \overline{I_3}\,\overline{I_2}I_1 = I_3 + \overline{I_2}I_1$, using simplification T7 ([[digital-logic/boolean-algebra#thm-identities]]). Finally $V = I_3 + I_2 + I_1 + I_0$. Priority encoders like this arbitrate interrupt requests and find the leading one in floating-point normalisation.
:::
:::

::: remark Tristate buffers and buses
A **tristate buffer** has a data input, an enable and an output that is either driven (to the input value) or **high-impedance** (Z, electrically disconnected). Several tristate outputs can share one wire, a **bus**, provided exactly one is enabled at a time — a decoder generates the enables. Two drivers enabled at once with different values fight, drawing a large current. Inside modern chips buses are usually replaced by multiplexers, which have no such failure mode; tristate drivers survive at chip pins.
:::

## Adders

### Half and full adders

A **half adder** adds two bits: sum $s = a \oplus b$, carry $c = ab$. A **full adder** adds two bits and a carry in, implementing [[digital-logic/number-systems#eq-bitadd]]:

::: proposition Full-adder equations {#prop-fa}
The full adder with inputs $a, b, c_{in}$ has outputs

$$
s = a \oplus b \oplus c_{in}, \qquad c_{out} = ab + c_{in}(a \oplus b) = ab + ac_{in} + bc_{in} .
$$ {#eq-fa}
:::

::: proof
The sum bit is $1$ when $a + b + c_{in}$ is odd, which is the parity of the three bits. The carry is $1$ when $a + b + c_{in} \ge 2$, the majority function, whose minimal SOP is $ab + ac_{in} + bc_{in}$ ([[digital-logic/boolean-algebra#ex-majority]]). For the middle form: if $a = b$, then $a\oplus b = 0$ and $c_{out} = ab = a$, which is the majority; if $a \ne b$, then $ab = 0$, $a \oplus b = 1$ and $c_{out} = c_{in}$, again the majority (the tie between $a$ and $b$ is broken by $c_{in}$).
:::

::: widget truthtable
formula: (A & B) | (C & (A xor B))
compare: (A & B) | (A & C) | (B & C)
caption: The carry of a full adder in its two forms: $ab + c_{in}(a\oplus b)$ on top, the majority $ab + ac_{in} + bc_{in}$ below, with $C$ standing for the carry in. They agree in every row. The first form reuses the XOR $a \oplus b$ already needed for the sum, which is why real full adders are built that way. Replace the formula by `A xor B xor C` to see the sum bit.
:::

### Ripple-carry adder

Connecting $n$ full adders in a chain, the carry out of bit $i$ driving the carry in of bit $i + 1$, gives the **ripple-carry adder**. It is small — $n$ full adders — and slow, because bit $n - 1$ cannot settle until the carry has rippled through all the stages below it. To analyse it, define for each bit

$$
g_i = a_i b_i, \qquad p_i = a_i \oplus b_i ,
$$ {#eq-gp}

the **generate** and **propagate** signals. Bit $i$ generates a carry regardless of its carry in when $g_i = 1$ (both operand bits are $1$), and propagates its incoming carry when $p_i = 1$ (exactly one is $1$). From [[#eq-fa]],

$$
c_{i+1} = g_i + p_i c_i, \qquad s_i = p_i \oplus c_i .
$$ {#eq-carry}

In the gate-delay model, $g_i$ and $p_i$ are ready after $1\,t_g$, and each carry takes $2\,t_g$ more (an AND and an OR). So $c_i$ is ready at $(1 + 2i)\,t_g$, and the most significant sum bit at

$$
t_{ripple} = (1 + 2(n-1) + 1)\,t_g = 2n\,t_g .
$$ {#eq-tripple}

The delay grows linearly with the word length. For $n = 64$ that is $128$ gate delays — far too slow for a processor clocked at several gigahertz.

### Carry lookahead

The recurrence [[#eq-carry]] can be unrolled. Substituting it into itself,

$$
\begin{aligned}
c_1 &= g_0 + p_0 c_0,\\
c_2 &= g_1 + p_1 g_0 + p_1 p_0 c_0,\\
c_3 &= g_2 + p_2 g_1 + p_2 p_1 g_0 + p_2 p_1 p_0 c_0,\\
c_4 &= g_3 + p_3 g_2 + p_3 p_2 g_1 + p_3 p_2 p_1 g_0 + p_3 p_2 p_1 p_0 c_0 .
\end{aligned}
$$ {#eq-cla4}

Each carry is a two-level SOP of the $g$s, $p$s and $c_0$: "a carry leaves bit $3$ if some bit generated one and every bit above it propagated it". A **carry-lookahead adder** (CLA) computes all of them in parallel in $2\,t_g$ after the $p$s and $g$s. The cost is gates with large fan-in; beyond about four bits the terms become impractically wide, so lookahead is applied hierarchically. Define the **block generate and propagate** of bits $3..0$,

$$
G_{3:0} = g_3 + p_3 g_2 + p_3 p_2 g_1 + p_3 p_2 p_1 g_0, \qquad P_{3:0} = p_3 p_2 p_1 p_0 ,
$$

so that $c_4 = G_{3:0} + P_{3:0}\,c_0$: the 4-bit block behaves like a single "super-bit" with its own generate and propagate, and the same lookahead equations combine four blocks into a 16-bit group.

The key structural fact is that the generate–propagate pair combines with an associative operator.

::: theorem The carry operator {#thm-carryop}
Define on pairs $(g, p)$ the operator

$$
(g_H, p_H) \circ (g_L, p_L) = (g_H + p_H g_L,\; p_H p_L),
$$ {#eq-circ}

which gives the generate and propagate of the concatenation of a high block $H$ and an adjacent low block $L$. Then $\circ$ is associative, and the carry into bit $i + 1$ is the generate of $(g_i, p_i) \circ (g_{i-1}, p_{i-1}) \circ \cdots \circ (g_0, p_0) \circ (c_0, 0)$.
:::

::: proof
*Meaning.* The combined block generates a carry if $H$ generates one, or if $L$ generates one and $H$ propagates it; it propagates an incoming carry iff both blocks do. This is [[#eq-circ]].

*Associativity.* For three blocks,

$$
\bigl((g_2, p_2)\circ(g_1, p_1)\bigr)\circ(g_0, p_0) = \bigl(g_2 + p_2 g_1 + p_2 p_1 g_0,\; p_2 p_1 p_0\bigr),
$$

and

$$
(g_2, p_2)\circ\bigl((g_1, p_1)\circ(g_0, p_0)\bigr) = \bigl(g_2 + p_2(g_1 + p_1 g_0),\; p_2 p_1 p_0\bigr),
$$

which is the same pair after distributing $p_2$.

*Carries.* Treat the carry in as a bit with $g = c_0$, $p = 0$. By induction using [[#eq-carry]], the generate of the combination of bits $i..0$ and the carry-in pair is $g_i + p_i c_i = c_{i+1}$.
:::

Because $\circ$ is associative, the $n$ carries are **prefix** combinations, and they can be computed by a tree in $\lceil\log_2 n\rceil$ levels of $\circ$ cells instead of a chain of $n$. This is the idea of **parallel-prefix adders**. The Kogge–Stone adder computes all prefixes in $\log_2 n$ levels with $n\log_2 n - n + 1$ cells; the Brent–Kung adder uses only $2n - 2 - \log_2 n$ cells at the cost of $2\log_2 n - 1$ levels. With two-input gates each $\circ$ cell costs $2\,t_g$ (an AND–OR), so a prefix adder takes about $(2\log_2 n + 2)\,t_g$ including the $p$/$g$ and sum XOR levels.

::: widget plot
f: 2*x; 2*log2(x) + 2
x: 1, 64
y: 0, 130
labels: \text{ripple carry } 2n; \text{prefix (Kogge–Stone) } 2\log_2 n + 2
vlines: 32
caption: Adder delay in gate delays against the word length $n$. The ripple-carry adder grows linearly; the parallel-prefix adder grows with $\log_2 n$. Hover at $n = 32$: $64$ against $12$ gate delays. The two are equal only for tiny adders, which is why small adders inside larger blocks are often still built as ripple chains.
:::

::: example Delays of 16-bit adders {#ex-cla16}
In the gate-delay model (every gate, of any fan-in up to five, costs $t_g$), find the delay of the most significant sum bit of a 16-bit adder built (a) as a ripple-carry adder, (b) from four 4-bit CLA blocks whose block carries ripple from block to block, and (c) with a second level of lookahead across the four blocks.
::: solution
In all cases $p_i$ and $g_i$ are ready at $1\,t_g$.

(a) By [[#eq-tripple]], $2n = 32\,t_g$.

(b) Each block's $P$ (one AND) and $G$ (AND–OR) are ready at $1 + 2 = 3\,t_g$. The block carries then ripple: $C_4 = G_{3:0} + P_{3:0}c_0$ at $5$, $C_8$ at $7$, $C_{12}$ at $9$. Inside the last block, $c_{13}, c_{14}, c_{15}$ follow from $C_{12}$ and the local $p, g$ by [[#eq-cla4]] in $2\,t_g$, at $11$, and $s_{15} = p_{15}\oplus c_{15}$ at $12\,t_g$.

(c) With the lookahead equations applied to the block signals, $C_4$, $C_8$, $C_{12}$ (and $C_{16}$) are all two-level functions of the $G$s, $P$s and $c_0$, ready at $3 + 2 = 5\,t_g$. The internal carries follow at $7$ and the top sum bit at $8\,t_g$.

So the delay falls from $32$ to $12$ to $8$ gate delays, at the price of extra, wider gates.
:::
:::

::: example Choosing an adder for a clock target {#ex-adder-design}
A 32-bit processor datapath must complete an addition within $900\,\mathrm{ps}$ (a $1\,\mathrm{GHz}$ clock less $100\,\mathrm{ps}$ of register overhead). In the target process a two-input gate costs about $t_g = 20\,\mathrm{ps}$ in this application. Which of a ripple-carry and a Kogge–Stone adder meets the target, and at what cost in $\circ$ cells?
::: solution
Ripple carry: $2n\,t_g = 64 \times 20\,\mathrm{ps} = 1280\,\mathrm{ps}$, which exceeds $900\,\mathrm{ps}$: it fails.

Kogge–Stone: $(2\log_2 32 + 2)\,t_g = (2\cdot5 + 2) \times 20\,\mathrm{ps} = 240\,\mathrm{ps}$, comfortably inside the budget. Its prefix network has $n\log_2 n - n + 1 = 32\cdot 5 - 32 + 1 = 129$ cells, each an AND–OR and an AND, in addition to the $32$ $p$/$g$ cells and $32$ sum XORs; the ripple adder needs only $32$ full adders.

A Brent–Kung adder ($2\log_2 32 - 1 = 9$ levels, so about $(2\cdot 9 + 2)\times 20 = 400\,\mathrm{ps}$, with $2\cdot32 - 2 - 5 = 57$ cells) also meets the target at less than half the prefix area — a good compromise, and the kind of choice that synthesis tools make automatically from a timing constraint.
:::
:::

### Subtraction and overflow

By [[digital-logic/number-systems#thm-negate]], $A - B = A + \overline{B} + 1$. An **adder–subtractor** puts an XOR gate on each $B$ input, controlled by a signal $\mathit{SUB}$ that also drives the carry in: with $\mathit{SUB} = 0$ the XORs pass $B$ and $c_0 = 0$; with $\mathit{SUB} = 1$ they invert $B$ and $c_0 = 1$. The signed overflow flag is $V = c_{n-1} \oplus c_n$ ([[digital-logic/number-systems#thm-overflow]]), one more XOR.

::: quiz
A 32-bit ripple-carry adder is replaced by a carry-lookahead or prefix adder. What happens to its delay and area, roughly?
- [ ] Both fall, because the lookahead adder has fewer gates
- [x] Delay falls from proportional to $n$ to proportional to $\log n$; area rises
- [ ] Delay is unchanged, but glitches disappear
- [ ] Delay falls to a constant independent of $n$, at no extra cost
::: solution
Lookahead replaces the carry chain by a tree of generate–propagate combinations, so the number of logic levels grows with $\log_2 n$ instead of $n$; the price is more gates and wiring (for Kogge–Stone, about $n\log_2 n$ cells). No adder has delay independent of $n$, because the top carry depends on all $2n$ operand bits and gates have bounded fan-in.
:::
:::

## Comparators and shifters

An **equality comparator** checks $A = B$ for $n$-bit words: each bit pair goes through an XNOR, and an $n$-input AND (a tree) combines them,

$$
(A = B) = \prod_{i=0}^{n-1}\overline{a_i \oplus b_i}.
$$

A **magnitude comparator** decides $A > B$. For unsigned numbers, scan from the top: $A > B$ if at the highest position where they differ, $a_i = 1$ and $b_i = 0$. For two bits this gives

$$
(A > B) = a_1\overline{b_1} + \overline{(a_1\oplus b_1)}\,a_0\overline{b_0} .
$$

For wide words the cheapest method is usually to subtract and look at the flags: for unsigned operands $A < B$ exactly when the subtraction $A - B$ produces no carry out ($C = 0$); for signed operands $A < B$ exactly when $N \oplus V = 1$, where $N$ is the result's sign bit (exercise [[#exr-slt]]).

A **shifter** moves a word left or right by a variable amount $k$. A **barrel shifter** for $n = 2^m$ bits uses $m$ levels of 2-to-1 multiplexers: level $j$ shifts by $2^j$ positions or not, depending on bit $j$ of $k$. A 32-bit barrel shifter thus needs $5$ levels of $32$ muxes, $160$ in all, and has a delay of $5$ mux delays whatever the shift amount. Shifting right *arithmetically* fills the vacated bits with copies of the sign bit (dividing a two's complement number by $2^k$, rounding towards $-\infty$); shifting right *logically* fills them with zeros.

## Arithmetic logic units

An **arithmetic logic unit** (ALU) bundles several operations behind a common interface: two $n$-bit operands $A$ and $B$, a function code $F$, an $n$-bit result $Y$ and a set of **flags** describing the result.

::: example A four-function ALU {#ex-alu}
Design a 4-bit ALU with function code $F_1F_0$: $00$ for $A\cdot B$ (bitwise AND), $01$ for $A + B$ (bitwise OR), $10$ for $A$ plus $B$, $11$ for $A$ minus $B$, with flags $Z$ (result zero), $N$ (result negative), $C$ (carry out) and $V$ (signed overflow). Then give the result and flags for $A = 0101$, $B = 0111$, $F = 11$.
::: solution
*Datapath.* One adder–subtractor with $\mathit{SUB} = F_0$ computes $A \pm B$ (for $F_1 = 1$, $F_0$ distinguishes add from subtract). A bank of AND gates and a bank of OR gates compute the logical results. A 4-to-1 multiplexer per bit, selected by $F_1F_0$, picks $A\cdot B$, $A + B$, the sum, or the difference — or, more economically, a 2-to-1 mux on $F_0$ picks between AND and OR, and a second on $F_1$ picks between that and the adder output.

*Flags.* $N = y_3$; $Z = \overline{y_3 + y_2 + y_1 + y_0}$ (a 4-input NOR); $C = c_4$ and $V = c_3 \oplus c_4$ from the adder, meaningful only for the arithmetic functions (gate them with $F_1$).

*Example.* $F = 11$ computes $0101 + \overline{0111} + 1 = 0101 + 1000 + 1 = 1110$. No carry leaves bit $3$ ($5 + 8 + 1 = 14 < 16$), so $C = 0$, which for unsigned operands says $A < B$ ($5 < 7$). The carry into bit 3 is also $0$ (bits $2..0$: $101 + 000 + 1 = 110$, no carry), so $V = 0 \oplus 0 = 0$. The result $1110$ is $-2$ in two's complement, correct for $5 - 7$; $N = 1$, $Z = 0$.
:::
:::

::: warning Flags mean different things for different operations
The carry flag after a subtraction is "no borrow": $C = 1$ when $A \ge B$ as unsigned numbers. Some processor families (ARM, for example) store it this way; others (x86) store the inverted borrow. The overflow flag after a logical operation is meaningless. When you write an ALU, specify for every function which flags are defined and how — and when you use a processor's flags, read its manual.
:::

::: application Blocks in a processor
A simple 32-bit processor core ([[computer-architecture/single-cycle-processor]]) contains, among other things, a 32-bit ALU with a prefix adder, a 32-bit barrel shifter, a 5-to-32 decoder selecting the register to write, and two 32-to-1 multiplexers of 32-bit words reading the two source registers — over a thousand 2-to-1 mux equivalents just for register reads. Every one of these is a block from this chapter. As of 2026, the adders in high-performance processor cores and GPU arithmetic units are parallel-prefix designs tuned by hand or by tools, while microcontrollers often keep ripple or carry-select adders to save area and power.
:::

::: history
Binary adders built from relays appear in George Stibitz's "Model K" breadboard of 1937 at Bell Labs, and adders built from vacuum tubes in the electronic computers of the 1940s. The carry-lookahead principle was described by Weinberger and Smith in 1958 for the adders of fast computers. The general theory of parallel-prefix computation was given by Ladner and Fischer in 1980; the Kogge–Stone adder takes its name from Peter Kogge and Harold Stone's 1973 paper on recurrence solving, and the Brent–Kung adder from Richard Brent and H. T. Kung's 1982 paper on regular adder layouts.
:::

## Where this leads

The ALU, register file and multiplexers of this chapter are the datapath of the processors in [[computer-architecture/single-cycle-processor]]; fast multipliers, dividers and floating-point units are developed in [[computer-architecture/computer-arithmetic]]. The delays introduced here combine with flip-flop timing in [[digital-logic/latches-flip-flops]] to set the maximum clock frequency, and the decoder reappears as the row decoder of every memory in [[digital-logic/memories-programmable-logic]]. The transistor-level design of adders and multiplexers is part of [[digital-ic/static-cmos-logic]].

::: summary
- Combinational blocks are characterised by their function and by their propagation delay $t_{pd}$ (slowest path) and contamination delay $t_{cd}$ (fastest path).
- A $2^k$-to-1 multiplexer computes $\sum m_s D_s$; with a suitable data assignment it implements any function, the principle of the FPGA look-up table.
- A decoder generates all minterms of its inputs (one-hot outputs); a priority encoder reports the highest active input and a valid flag.
- The full adder computes $s = a\oplus b\oplus c$ and $c_{out} = ab + c(a\oplus b)$; with $g = ab$ and $p = a\oplus b$ the carry obeys $c_{i+1} = g_i + p_ic_i$.
- A ripple-carry adder is small but takes about $2n$ gate delays; lookahead and parallel-prefix adders use the associative operator $(g_H, p_H)\circ(g_L, p_L) = (g_H + p_Hg_L, p_Hp_L)$ to reach delays proportional to $\log_2 n$ at greater area.
- Subtraction uses $A + \overline{B} + 1$; comparisons use the flags ($C$ for unsigned, $N\oplus V$ for signed); a barrel shifter uses $\log_2 n$ levels of multiplexers.
- An ALU selects among arithmetic and logical results with multiplexers and reports $Z$, $N$, $C$, $V$ flags whose meaning depends on the operation.
:::

## Exercises

::: exercise Select lines {level=1 check="5"}
How many select inputs does a 32-to-1 multiplexer have?
::: solution
$2^k = 32$ gives $k = 5$ select inputs.
:::
:::

::: exercise A full adder by hand {level=1}
Give the outputs $s$ and $c_{out}$ of a full adder for each of the inputs $(a, b, c_{in}) = (1, 0, 1)$ and $(1, 1, 1)$, and the corresponding values of $g$ and $p$.
::: solution
For $(1, 0, 1)$: $1 + 0 + 1 = 2 = 10_2$, so $s = 0$, $c_{out} = 1$; $g = 1\cdot 0 = 0$, $p = 1 \oplus 0 = 1$ — the bit propagates the incoming carry. For $(1, 1, 1)$: $1 + 1 + 1 = 3 = 11_2$, so $s = 1$, $c_{out} = 1$; $g = 1$, $p = 0$ — the bit generates a carry by itself.
:::
:::

::: exercise Decoder outputs {level=1}
A 3-to-8 decoder with an active-high enable has inputs $A_2A_1A_0 = 101$. Which output is $1$ when $E = 1$, and which when $E = 0$? How would you implement $F = \sum m(0, 3, 5)$ with this decoder?
::: solution
With $E = 1$, only $Y_5$ is $1$ (since $101_2 = 5$). With $E = 0$, no output is $1$. $F$ is the OR of $Y_0$, $Y_3$ and $Y_5$, a single 3-input OR gate fed by the decoder (with $E = 1$).
:::
:::

::: exercise A function on a multiplexer {level=2}
Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$ with a 4-to-1 multiplexer whose select inputs are $A$ (MSB) and $B$.
::: solution
Pairing the rows by $AB$: $00$ (rows 0, 1): $F = 0, 1$, so $D_0 = C$. $01$ (rows 2, 3): $1, 0$, so $D_1 = \overline{C}$. $10$ (rows 4, 5): $0, 0$, so $D_2 = 0$. $11$ (rows 6, 7): $1, 1$, so $D_3 = 1$. One inverter provides $\overline{C}$.
:::
:::

::: exercise Ripple delay in seconds {level=2 check="1.94e-9"}
A 64-bit ripple-carry adder is built from full adders with a carry-in-to-carry-out delay of $30\,\mathrm{ps}$ and a carry-in-to-sum delay of $50\,\mathrm{ps}$. Assuming the carry into bit $0$ arrives at time $0$ and all operand bits are ready earlier, when is the most significant sum bit valid? Give the answer in seconds.
::: solution
The carry must ripple through bits $0$ to $62$ to reach the carry input of bit $63$: $63 \times 30\,\mathrm{ps} = 1890\,\mathrm{ps}$. Bit $63$ then needs $50\,\mathrm{ps}$ to form its sum. Total $1940\,\mathrm{ps} = 1.94\times10^{-9}\,\mathrm{s}$.
:::
:::

::: exercise A 2-bit magnitude comparator {level=2}
Design a circuit that outputs $1$ when the unsigned 2-bit number $A_1A_0$ is greater than $B_1B_0$. Give a minimal SOP.
::: hint
There are $6$ true rows among the $16$. A Karnaugh map in the variables $A_1, A_0, B_1, B_0$ helps.
:::
::: solution
$A > B$ in the rows $(A, B) = (1,0), (2,0), (2,1), (3,0), (3,1), (3,2)$. On a map these give three prime implicants, all essential:

$$
(A > B) = A_1\overline{B_1} + A_1A_0\overline{B_0} + A_0\overline{B_1}\,\overline{B_0} .
$$

The first term covers $A \ge 2 > B$; the second covers $A = 3$ with $B$ even ($B = 0$ or $2$); the third covers odd $A$ with $B = 0$. It is equivalent to the "scan from the top" form $A_1\overline{B_1} + \overline{(A_1\oplus B_1)}A_0\overline{B_0}$, but has eight literals and no XOR.
:::
:::

::: exercise Priority encoder check {level=2}
For the priority encoder of [[#ex-prio]], find $Y_1Y_0$ and $V$ for the inputs $I_3I_2I_1I_0 = 0110$ and $0000$, and explain why the outputs $Y_1Y_0$ in the second case do not matter.
::: solution
For $0110$: $Y_1 = I_3 + I_2 = 1$, $Y_0 = I_3 + \overline{I_2}I_1 = 0 + 0 = 0$, so $Y_1Y_0 = 10$ (input $2$ is the highest active one, even though input $1$ is also active), and $V = 1$. For $0000$: $Y_1 = 0$, $Y_0 = 0$ and $V = 0$. The receiver must ignore $Y$ when $V = 0$ — the code $00$ would otherwise be confused with "input $0$ active".
:::
:::

::: exercise A BCD adder digit {level=3}
A one-digit BCD adder adds two BCD digits and a carry in with a 4-bit binary adder, producing a 4-bit sum $S_3S_2S_1S_0$ and carry $C_4$; when the true sum exceeds $9$ a second adder adds $0110$ and the digit carry out is $1$. Derive the correction signal $K$ (sum $> 9$) as a function of $C_4$ and the $S$ bits, using don't-cares for impossible sums.
::: hint
The largest possible sum is $9 + 9 + 1 = 19$. When $C_4 = 0$, the sum is $S_3S_2S_1S_0$ and the correction is needed for $10$ to $15$.
:::
::: solution
If $C_4 = 1$ the sum is $16$ to $19$, so $K = 1$. If $C_4 = 0$, $K = 1$ exactly for $S = 1010$ to $1111$ ($10$ to $15$). On a 4-variable map of $S_3S_2S_1S_0$ these six cells are rows $S_3S_2 = 11$ (cells $12$–$15$) and cells $1010$, $1011$ — the rectangles $S_3S_2$ and $S_3S_1$. Hence

$$
K = C_4 + S_3S_2 + S_3S_1 .
$$

When $K = 1$ the second adder adds $0110$ to $S$ (ignoring its carry) and the digit carry out is $K$. Check $7 + 5 = 12$: $S = 1100$, $C_4 = 0$, $K = S_3S_2 = 1$, and $1100 + 0110 = 1\,0010$, i.e. digit $2$ with carry $1$: $12$. ✓ Check $9 + 9 + 1 = 19$: binary $1\,0011$, $C_4 = 1$, so $K = 1$ and $0011 + 0110 = 1001$: digit $9$, carry $1$. ✓
:::
:::

::: exercise Signed comparison from flags {#exr-slt level=3}
Prove that, for $n$-bit two's complement operands, $A < B$ if and only if $N \oplus V = 1$ after the subtraction $A - B$, where $N$ is the sign bit of the stored result and $V$ the overflow flag.
::: solution
Let $D = A - B$ be the exact difference. If $V = 0$, the stored result equals $D$, so its sign bit $N$ is $1$ iff $D < 0$ iff $A < B$; and $N \oplus 0 = N$. If $V = 1$, the stored result is $D \mp 2^n$, which has the opposite sign to $D$ (the exact value lies outside the range and wraps around by $2^n$): $N = 1$ iff $D \ge 0$. So $A < B$ iff $D < 0$ iff $N = 0$ iff $N \oplus 1 = 1$. In both cases $A < B \iff N \oplus V = 1$. Example in 4 bits: $A = 5$, $B = -4$: the subtraction overflows ($9 > 7$) and gives $1001$, $N = 1$, $V = 1$, $N\oplus V = 0$: correctly, $5 \not< -4$.
:::
:::

::: exercise Hierarchical decoder design {level=3}
Design a 6-to-64 decoder using only 2-to-4 decoders with enable, and count how many are needed and how many decoder levels the signal passes through. Compare with predecoding: three 2-to-4 decoders on bit pairs followed by 64 three-input AND gates.
::: solution
*Tree.* The top level is one 2-to-4 decoder on $A_5A_4$; its four outputs enable four 2-to-4 decoders on $A_3A_2$, whose $16$ outputs enable sixteen 2-to-4 decoders on $A_1A_0$, giving $64$ outputs. That is $1 + 4 + 16 = 21$ decoders and three decoder levels in series (each one's enable waits for the level above).

*Predecoding.* Three 2-to-4 decoders, one each for $A_5A_4$, $A_3A_2$ and $A_1A_0$, produce three one-hot groups of four lines. Output $Y_i$ is the AND of one line from each group, selected by the three digit pairs of $i$, so $64$ three-input ANDs are needed. The path is one decoder level plus one AND: shorter than the tree, and the decoders are only three. This is why memory row decoders are built with predecoders ([[digital-logic/memories-programmable-logic]]).
:::
:::
