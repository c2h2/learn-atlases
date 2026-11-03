Look inside a standard-cell library and you find a few hundred cells: inverters and buffers in a dozen strengths, NAND and NOR gates with up to four inputs, AND-OR-INVERT and OR-AND-INVERT gates, multiplexers, XORs, adders, latches and flip-flops. Synthesis software assembles every random-logic block on a chip from these cells and chooses, for each instance, which strength to use. Two questions sit underneath that process. How is a gate for a given Boolean function built from transistors? And how large should each gate be, so that a path of several gates is as fast as possible?

This chapter answers both. The first half generalises the CMOS inverter of [[digital-ic/cmos-inverter]] to **complementary static gates**: a pull-down network of nMOS transistors and a dual pull-up network of pMOS transistors, sized so that every gate drives as strongly as an inverter. The second half develops the method of **logical effort**, which extends the tapered-buffer result of [[digital-ic/cmos-inverter#thm-buffer]] to paths made of arbitrary gates and turns circuit sizing into a few lines of arithmetic. We end with two alternatives to complementary logic that trade robustness for fewer transistors: ratioed logic and **pass-transistor** and **transmission-gate** logic. Boolean algebra and De Morgan's laws are assumed from [[digital-logic/boolean-algebra]].

## Complementary CMOS gates

The inverter connects its output to ground through an nMOS transistor when the input is high and to $V_{DD}$ through a pMOS transistor when the input is low. A general static CMOS gate does the same with *networks* of transistors.

::: definition Complementary static CMOS gate {#def-static-gate}
A **complementary static CMOS gate** with inputs $x_1, \dots, x_n$ and output $Y$ consists of a **pull-down network** (PDN) of nMOS transistors between $Y$ and ground and a **pull-up network** (PUN) of pMOS transistors between $V_{DD}$ and $Y$, every transistor being driven by one of the inputs. The networks are designed so that, for every input combination, exactly one of them conducts.
:::

Think of each network as a switch network with a **conduction function**: a Boolean function of the inputs that is $1$ when the network connects its two terminals. An nMOS transistor with gate $x$ conducts when $x = 1$, so it is a switch with conduction function $x$; a pMOS transistor conducts when $x = 0$, conduction function $\overline{x}$. Transistors in **series** conduct only if all conduct (AND of their conduction functions); transistors in **parallel** conduct if any does (OR).

::: theorem Dual networks give a complementary gate {#thm-dual}
Let the pull-down network be a series–parallel network of nMOS transistors with conduction function $G(x_1, \dots, x_n)$. Build the pull-up network from pMOS transistors driven by the same inputs, replacing every series connection by a parallel one and every parallel connection by a series one (the **dual** network). Then the pull-up network conducts exactly when $G = 0$, and the gate computes $Y = \overline{G}$ with no static current for any input.
:::

::: proof
By induction on the structure of the network. A single nMOS transistor with gate $x$ has conduction function $x$; its dual, one pMOS with gate $x$, has $\overline{x}$, the complement. Suppose networks $N_1$ and $N_2$ have conduction functions $G_1$, $G_2$ and their duals have $\overline{G_1}$, $\overline{G_2}$. Their series combination conducts with $G_1G_2$; its dual, the parallel combination of the duals, conducts with $\overline{G_1} + \overline{G_2} = \overline{G_1G_2}$ by De Morgan's law. Their parallel combination conducts with $G_1 + G_2$; its dual, the series combination of the duals, conducts with $\overline{G_1}\,\overline{G_2} = \overline{G_1 + G_2}$. So the pull-up network always conducts exactly when the pull-down network does not. When $G = 1$ the output is connected to ground only, so $Y = 0$; when $G = 0$ it is connected to $V_{DD}$ only, so $Y = 1$. In neither case is there a path from $V_{DD}$ to ground.
:::

The construction gives an algorithm. Write the function as the *complement* of an expression built from AND and OR of uncomplemented inputs: $Y = \overline{G}$. Build $G$ in nMOS (AND → series, OR → parallel), and build the dual in pMOS.

- **NAND**: $Y = \overline{AB}$. Pull-down: $A$ and $B$ in series. Pull-up: $A$ and $B$ in parallel.
- **NOR**: $Y = \overline{A + B}$. Pull-down: parallel. Pull-up: series.
- **AOI21** (AND-OR-INVERT): $Y = \overline{AB + C}$. Pull-down: ($A$ series $B$) in parallel with $C$. Pull-up: ($A$ parallel $B$) in series with $C$.

::: example A compound gate {#ex-compound}
Design a single complementary gate for $Y = \overline{(A + B)\,C + D}$. How many transistors does it use, compared with building it from two-input NAND and NOR gates and inverters?
::: solution
Here $G = (A + B)C + D$. Pull-down network: $A \parallel B$, in series with $C$; that combination in parallel with $D$. The pull-up network is the dual: ($A$ series $B$), in parallel with $C$; that combination in series with $D$. Check one case: $A = 1$, $B = C = D = 0$. Pull-down: $A$ conducts but $C$ does not, and $D$ does not, so no path to ground. Pull-up: $D$'s pMOS conducts (its input is $0$); $C$'s pMOS conducts, so the parallel branch conducts; the output is pulled high. Indeed $G = (1)(0) + 0 = 0$ and $Y = 1$.

The gate uses $8$ transistors (two per input). With two-input gates: $A + B$ is a NOR followed by an inverter ($6$ transistors), the AND with $C$ is a NAND plus inverter ($6$), the OR with $D$ a NOR ($4$) — $16$ transistors and five gate delays rather than one. (Smarter factoring with De Morgan reduces this, but never to $8$.)
:::
:::

::: widget truthtable
formula: ~(((A | B) & C) | D)
compare: ((~A & ~B) | ~C) & ~D
caption: The compound gate of [[#ex-compound]]. The second formula is the conduction function of its pull-up network read off the transistors — ($A$ series $B$) parallel $C$, then series $D$, with each pMOS conducting when its input is $0$. The two columns agree in every row, as [[#thm-dual]] guarantees: the pull-up conducts exactly when the pull-down does not.
:::

### What a single gate can compute

Every input of a complementary gate drives an nMOS in the pull-down and a pMOS in the pull-up. Raising any input can only turn nMOS transistors on and pMOS transistors off, so it can only make the output fall or stay the same.

::: proposition Single-stage gates are inverting {#prop-unate}
The output of a single-stage complementary CMOS gate is a **negative-unate** function of each input: if the output is $0$ for some input combination, it remains $0$ when any input is changed from $0$ to $1$. Consequently non-inverting functions such as AND, OR and buffers, and non-unate functions such as XOR, cannot be built in one stage; they need a second stage or complemented inputs.
:::

::: proof
Changing an input $x$ from $0$ to $1$ turns on the nMOS transistors it drives and turns off the pMOS transistors it drives. A conducting path in the pull-down network remains conducting (transistors are only added to it), and a non-conducting pull-up network remains non-conducting (transistors are only removed from it). So if $Y = 0$ before the change, it is $0$ afterwards.
:::

This is why the NAND, NOR and AOI/OAI families dominate cell libraries, and why the AND gate in a library is a NAND followed by an inverter. XOR is built either from complementary gates with both polarities of each input available (a 12-transistor version is common) or from transmission gates (below).

::: quiz
Which function **cannot** be implemented as a single complementary static CMOS stage, even with as many transistors as you like?
- [ ] $\overline{AB + CD}$
- [ ] $\overline{A(B + C + D)}$
- [x] $\overline{A}B$
- [ ] $\overline{A + B + C + D}$
::: solution
$\overline{A}B$ rises when $B$ rises, so it is not negative-unate in $B$ and violates [[#prop-unate]]. It needs an inverter on $A$ followed by a NOR: $\overline{A}B = \overline{A + \overline{B}}$, which in turn requires $\overline{B}$. The other three are complements of AND–OR expressions of uncomplemented inputs, which [[#thm-dual]] builds directly.
:::
:::

## Transistor sizing for equal drive

A gate is easiest to reason about if, in the worst case, it drives its output as strongly as a reference inverter. In the reference process of [[digital-ic/cmos-inverter#def-refproc]], the unit inverter has an nMOS of width $1$ (in units of $0.1\,\mathrm{\mu m}$) and a pMOS of width $2$, each with effective resistance $R = 10\,\mathrm{k\Omega}$. Transistors in series add their resistances, so $k$ transistors in series must each be $k$ times wider to present a total resistance $R$. Transistors in parallel need no widening for the worst case, which is when only one of them is on.

| gate | nMOS widths | pMOS widths | input capacitance (units of $C_g$ per $0.1\,\mathrm{\mu m}$) |
|---|---|---|---|
| inverter | 1 | 2 | 3 |
| NAND2 | 2, 2 (series) | 2, 2 (parallel) | 4 |
| NOR2 | 1, 1 (parallel) | 4, 4 (series) | 5 |
| NAND3 | 3, 3, 3 | 2, 2, 2 | 5 |
| NOR3 | 1, 1, 1 | 6, 6, 6 | 7 |
| AOI21 | $A, B$: 2, 2; $C$: 1 | $A, B$: 4, 4; $C$: 4 | $A, B$: 6; $C$: 5 |

For the AOI21 $\overline{AB + C}$, the worst pull-down path is through $A$ and $B$ in series (each width $2$), or through $C$ alone (width $1$). The worst pull-up path passes through one of $A$, $B$ and through $C$, two in series, so all pMOS have width $4$.

The table shows why NAND gates are preferred to NOR gates: a NOR's pMOS transistors, already slow, are in series and must be made very wide, so the NOR presents far more input capacitance for the same drive. A NOR with more than three or four inputs is almost never used.

::: warning Input order in a series stack matters
The table sizes gates for the worst-case resistance, but the transistors of a series stack are not interchangeable in delay. In a NAND2 the transistor nearest the output switches its own drain capacitance plus that of the internal node between the transistors, while the one nearest ground does not see the internal node when the other transistor is already on. If one input arrives late (the **critical input**), connect it to the transistor **nearest the output**: when it finally switches, the internal node has already been discharged through the lower transistor, and only the output capacitance remains. Connecting it at the bottom can add a noticeable fraction of a gate delay. The body effect also raises the threshold of the upper transistors in a stack ([[semiconductor-devices/mosfets]]), another reason to keep stacks short.
:::

## Logical effort

Sizing a single gate for equal drive is only half of the problem. In a path of several gates, a larger gate drives its load faster but loads its own driver more. The **method of logical effort**, introduced by Sutherland and Sproull in 1991, captures the trade-off in a delay model in which each gate is described by two numbers.

### The delay of one gate

Measure delays in units of $\tau = 0.69\,RC_{inv}$, where $C_{inv}$ is the input capacitance of the unit inverter: in the reference process, $\tau = 2.07\,\mathrm{ps}$. By [[digital-ic/cmos-inverter#eq-stage-delay]], an inverter driving $h$ times its own input capacitance has delay $(h + p_{inv})\tau$ with $p_{inv} = 1$. A gate sized for equal drive has the same output resistance as an inverter of the same scale, but a larger input capacitance.

::: definition Logical effort, electrical effort and parasitic delay {#def-le}
For a gate driving a load $C_{out}$ from an input of capacitance $C_{in}$:

- the **logical effort** $g$ of that input is the ratio of its input capacitance to that of an inverter that delivers the same output current: $g = C_{in}/C_{inv}$ for a gate sized to the unit inverter's drive;
- the **electrical effort** (or fan-out) is $h = C_{out}/C_{in}$;
- the **parasitic delay** $p$ is the delay of the gate driving no load, in units of $\tau$, due to its own diffusion capacitance;
- the **stage effort** is $f = gh$.

The delay of the gate is

$$
d = gh + p = f + p \qquad\text{(in units of } \tau\text{)}.
$$ {#eq-le-delay}
:::

::: proposition Logical effort of NAND and NOR gates {#prop-le-values}
With pMOS twice as resistive as nMOS at equal width, and diffusion capacitance per width equal to gate capacitance per width, an $n$-input NAND gate has

$$
g_{\text{NAND}} = \frac{n + 2}{3}, \qquad g_{\text{NOR}} = \frac{2n + 1}{3}, \qquad p_{\text{NAND}} = p_{\text{NOR}} = n\,p_{inv} = n.
$$ {#eq-le-nand}
:::

::: proof
Size the gate to drive like a unit inverter. An $n$-input NAND has $n$ series nMOS of width $n$ and $n$ parallel pMOS of width $2$; each input drives one of each, so its capacitance is $n + 2$ units against the inverter's $3$: $g = (n + 2)/3$. An $n$-input NOR has parallel nMOS of width $1$ and series pMOS of width $2n$: each input sees $1 + 2n$ units, so $g = (2n + 1)/3$.

For the parasitic delay, count the diffusion width connected to the output. In the NAND, all $n$ pMOS drains ($2n$) and the top nMOS drain ($n$) are at the output: $3n$ units, against $3$ for the inverter. In the NOR, the $n$ nMOS drains ($n$) and the top pMOS drain ($2n$) give again $3n$. Since an inverter's parasitic delay is $p_{inv} = 1$ for $3$ units, both gates have $p = n$. (Internal nodes of the stacks add a little more, which we neglect.)
:::

| gate | $g$ | $p$ |
|---|---|---|
| inverter | $1$ | $1$ |
| NAND2, NAND3, NAND4 | $4/3$, $5/3$, $2$ | $2$, $3$, $4$ |
| NOR2, NOR3, NOR4 | $5/3$, $7/3$, $3$ | $2$, $3$, $4$ |
| AOI21 | $A, B$: $2$; $C$: $5/3$ | $7/3$ |
| 2:1 multiplexer (transmission gates, per data input) | $2$ | $4$ |
| XOR2 (per input, both polarities) | $4$ | $4$ |

Logical effort measures how much worse a gate is than an inverter at *producing output current per unit of input capacitance*. It is a property of the topology, not of the size, and it grows with the number of inputs because series transistors must be widened.

::: example Delay of a fan-out-of-four NAND3 {#ex-nand3}
In the reference process, what is the delay of a NAND3 gate driving four identical NAND3 gates (one input of each)? How large is it compared with an FO4 inverter?
::: solution
Each fan-out gate presents the same input capacitance as the driver's input, so $h = 4$. With $g = 5/3$ and $p = 3$, [[#eq-le-delay]] gives $d = \tfrac53\times4 + 3 = 9.67$, i.e. $9.67\times2.07 = 20.0\,\mathrm{ps}$. The FO4 inverter has $d = 4 + 1 = 5$, or $10.4\,\mathrm{ps}$: the NAND3 is almost twice as slow at the same fan-out, $2.67\tau$ of the difference from its logical effort and $2\tau$ from its parasitic delay.
:::
:::

::: widget plot
f: x + 1; (n + 2)/3*x + n; (2n + 1)/3*x + n
x: 0, 6
y: 0, 25
sliders: n=2:2:4:1
labels: \text{inverter}; \text{NAND}_n; \text{NOR}_n
caption: Delay $d = gh + p$ in units of $\tau$ against electrical effort $h$ for an inverter and for $n$-input NAND and NOR gates in the reference process. Each line's slope is the gate's logical effort and its intercept the parasitic delay. Move $n$ from $2$ to $4$: the NOR line steepens much faster than the NAND line, because its slow pMOS are the ones placed in series. At $h = 4$ and $n = 2$ the delays are $5$, $7.3$ and $8.7$.
:::

### Paths of gates

Now consider a path of $N$ gates, from a primary input of capacitance $C_{in}$ to a load $C_{out}$. Some gates also drive other gates off the path; the **branching effort** of a node is

$$
b = \frac{C_{\text{on path}} + C_{\text{off path}}}{C_{\text{on path}}},
$$

the factor by which the total load exceeds the part that continues along the path.

::: definition Path efforts {#def-path-effort}
For a path of $N$ stages, the **path logical effort** is $G = \prod g_i$, the **path branching effort** $B = \prod b_i$, the **path electrical effort** $H = C_{out}/C_{in}$, and the **path effort** $F = GBH = \prod f_i$. The **path parasitic delay** is $P = \sum p_i$, and the path delay is $D = \sum f_i + P$.
:::

The product of the stage efforts equals $GBH$ because the electrical efforts of the stages multiply to $H$ times the product of the branching factors: each stage's load is the next stage's input capacitance times $b_i$.

::: theorem Minimum path delay {#thm-le-path}
For a path with fixed $N$, $G$, $B$, $H$ and $P$, the delay is minimised when every stage bears the same effort

$$
\hat f = F^{1/N} = (GBH)^{1/N},
$$ {#eq-fhat}

and the minimum delay is

$$
\hat D = NF^{1/N} + P.
$$ {#eq-dhat}

The gate sizes that achieve it follow by working backwards from the load: a gate with logical effort $g_i$ whose load is $C_{out,i}$ needs input capacitance $C_{in,i} = g_iC_{out,i}/\hat f$.
:::

::: proof
The stage efforts are constrained only by their product, $\prod f_i = F$, which is fixed by the path's topology and the end capacitances; the designer chooses the sizes of the intermediate gates, and hence how $F$ is divided among the stages. Exactly as in [[digital-ic/cmos-inverter#thm-buffer]], the arithmetic–geometric mean inequality gives $\sum f_i \ge NF^{1/N}$, with equality when all $f_i$ are equal. The parasitic delays do not depend on size, so $P$ is unaffected. Finally $f_i = g_ih_i = g_iC_{out,i}/C_{in,i} = \hat f$ gives the stated input capacitance.
:::

The best number of stages is also the same as for the inverter chain: adding inverters to a path changes $N$ and $P$ but not $F$, and the delay is minimised when $\hat f$ is about $3.6$ (for $p_{inv} = 1$), in practice anywhere from $2.4$ to $6$. A path whose $\hat f$ is much larger than $4$ is too short — add buffering; one whose $\hat f$ is below about $2.5$ has too many stages.

::: algorithm Sizing a path by logical effort {#alg-le}
1. Compute $G = \prod g_i$, $B = \prod b_i$ and $H = C_{out}/C_{in}$, and $F = GBH$.
2. Estimate the best number of stages $\hat N \approx \log_4 F$; if the path has far fewer or more stages, consider adding inverters or restructuring the logic.
3. Compute $\hat f = F^{1/N}$ and $\hat D = N\hat f + P$.
4. Working from the output back to the input, size each gate: $C_{in,i} = g_iC_{out,i}/\hat f$, where $C_{out,i}$ includes off-path loads.
5. Check that the first gate's computed input capacitance equals the specified $C_{in}$ (it must, up to rounding).
:::

::: example Sizing a path with branching {#ex-le-path}
A path runs from an input of capacitance $10$ units (units of $C_g$ for $0.1\,\mathrm{\mu m}$ of gate) through a NAND2, then a NOR2, then an inverter, to a load of $300$ units. The NAND2's output drives three identical NOR2 gates, only one of which is on the path. Find the minimum delay and the gate sizes. Would a different number of stages be faster?
::: solution
$G = \tfrac43\times\tfrac53\times1 = 2.22$, $B = 3$, $H = 300/10 = 30$, so $F = 2.22\times3\times30 = 200$. With $N = 3$, $\hat f = 200^{1/3} = 5.85$ and $P = 2 + 2 + 1 = 5$, so

$$
\hat D = 3\times5.85 + 5 = 22.5 \quad(\times\,2.07\,\mathrm{ps} = 46.7\,\mathrm{ps}).
$$

Sizes, from the output: the inverter's input is $C = 1\times300/5.85 = 51.3$ units. Each NOR2 drives $51.3$, so its input is $\tfrac53\times51.3/5.85 = 14.6$ units. The NAND2 drives three NOR2 inputs, $3\times14.6 = 43.9$, so its input is $\tfrac43\times43.9/5.85 = 10.0$ units — the specified input capacitance, as step 5 requires. In transistor widths: the inverter has $W_n = 51.3/3 = 17.1$ and $W_p = 34.2$ units; each NOR2 input ($1 + 4 = 5$ units for the unit-drive NOR2) is scaled by $14.6/5 = 2.92$, giving nMOS $2.92$ and pMOS $11.7$; the NAND2 ($2 + 2 = 4$ units) is scaled by $2.5$, giving nMOS and pMOS of $5$ each.

The stage effort $5.85$ is above the optimum, so a longer path would help. Adding an inverter would invert the output; adding two keeps the logic and gives $N = 5$, $\hat f = 200^{1/5} = 2.89$, $P = 7$ and $\hat D = 14.4 + 7 = 21.4$, about $5\,\%$ faster. The improvement is small because the optimum is flat; designers often accept the shorter path.
:::
:::

::: example Choosing the structure of an 8-input AND {#ex-and8}
An 8-input AND gate must drive a load ten times its input capacitance ($H = 10$). Compare (a) NAND8 followed by an inverter, (b) NAND4 followed by NOR2, (c) NAND2–NOR2–NAND2–inverter. Assume the NAND8 has $g = 10/3$, $p = 8$.
::: solution
All three compute the AND (check (b): NOR2 of two NAND4 outputs is $\overline{\overline{ABCD} + \overline{EFGH}} = ABCDEFGH$). With $B = 1$:

(a) $G = \tfrac{10}3$, $F = 33.3$, $N = 2$, $P = 9$: $\hat D = 2\sqrt{33.3} + 9 = 11.5 + 9 = 20.5$.

(b) $G = 2\times\tfrac53 = 3.33$, $F = 33.3$, $N = 2$, $P = 4 + 2 = 6$: $\hat D = 11.5 + 6 = 17.5$.

(c) $G = \tfrac43\times\tfrac53\times\tfrac43\times1 = 2.96$, $F = 29.6$, $N = 4$, $P = 2 + 2 + 2 + 1 = 7$: $\hat D = 4\times29.6^{1/4} + 7 = 9.3 + 7 = 16.3$.

The four-stage design is fastest, even though it has twice as many gates in series: its stage effort, $2.33$, is near the optimum, while the two-stage designs carry $5.8$ per stage. If instead $H = 1$, the efforts become $3.33$, $3.33$ and $2.96$, and (b) wins with $\hat D = 2\sqrt{3.33} + 6 = 9.65$ against $12.2$ for (c). **The best structure depends on the load**: few, complex stages for light loads; more, simpler stages for heavy ones.
:::
:::

::: intuition What logical effort says about design
The delay formula $\hat D = N(GBH)^{1/N} + P$ separates the three things that make a path slow. $H$ is set by the job — how big the load is compared with what the input may present. $B$ is the cost of fan-out to other logic. $G$ is the cost of computing, of using gates more complicated than inverters, and it is only weakly reduced by clever choices of gate. And $P$ is the price of every stage's own capacitance. A good designer reduces $G$ and $P$ by restructuring logic, puts large loads at the end of long paths, and keeps the effort of each stage near four. The method makes these trade-offs visible in a way that a circuit simulator, which gives one number for one design, does not.
:::

::: quiz
A path has path effort $F = 64$ and three stages. Its designer upsizes the second gate by a factor of two "to make it faster". What happens to the path delay?
- [ ] it decreases, because the second gate now drives its load faster
- [x] it increases, because the stage efforts are no longer equal
- [ ] it is unchanged, because $F$ is unchanged
- [ ] it depends only on the parasitic delays
::: solution
With equal efforts $\hat f = 4$ per stage, $\sum f_i = 12$. Doubling the second gate's size halves its own stage effort (to $2$) but doubles the electrical effort of the first stage (to $8$); the third stage is unchanged at $4$. Now $\sum f_i = 8 + 2 + 4 = 14 > 12$. The product is still $64$, but the sum is no longer minimal. Parasitic delays are independent of size.
:::
:::

## Ratioed logic

Complementary gates need two transistors per input. **Ratioed logic** replaces the whole pull-up network by a single always-on load and relies on the pull-down network being strong enough to win the fight. In **pseudo-nMOS** logic the load is a pMOS transistor with its gate grounded.

::: proposition Low output level of pseudo-nMOS {#prop-pseudo}
In a pseudo-nMOS inverter whose pMOS load (gain factor $k_p$, always on with $V_{SG} = V_{DD}$) is saturated and whose nMOS pull-down (gain factor $k_n$, $V_{GS} = V_{DD}$) is in triode, the low output level satisfies

$$
\frac{k_p}{2}(V_{DD} - \lvert V_{th,p}\rvert)^2 = k_n\left[(V_{DD} - V_{th,n})V_{OL} - \frac{V_{OL}^2}{2}\right],
$$ {#eq-vol}

and a static current equal to the left-hand side flows whenever the output is low.
:::

::: proof
With the output low, the pMOS has $V_{SD} = V_{DD} - V_{OL}$, larger than its overdrive $V_{DD} - \lvert V_{th,p}\rvert$ when $V_{OL} < \lvert V_{th,p}\rvert$, so it is saturated and carries $\tfrac{k_p}2(V_{DD} - \lvert V_{th,p}\rvert)^2$. The nMOS has $V_{DS} = V_{OL}$, small compared with its overdrive, so it is in triode. Equating the two currents gives [[#eq-vol]].
:::

With $V_{DD} = 1\,\mathrm V$, thresholds of $0.3\,\mathrm V$ and $k_n = 4k_p$, [[#eq-vol]] becomes $0.245 = 2.8V_{OL} - 2V_{OL}^2$, so $V_{OL} = 0.094\,\mathrm V$: not $0$, but a comfortable valid low. The logic levels now depend on the transistor **ratio** — hence the name. Pseudo-nMOS gates are fast to fall (the weak pMOS barely opposes the pull-down) and compact, which suits wide NOR functions such as the address decoders and programmable-logic arrays where many inputs are ORed; but they dissipate static power whenever their output is low, and are used today only in special places, often with the load turned off when idle.

## Pass-transistor and transmission-gate logic

A transistor can also be used as a **pass transistor**, a switch in series with a signal rather than a pull-up or pull-down to a rail. A single transistor then implements a 2:1 multiplexer branch, and a few of them can compute functions that would take many more in complementary logic. The catch is that MOS switches are not ideal.

::: theorem Threshold drop through a pass transistor {#thm-vth-drop}
An nMOS pass transistor with gate at $V_{DD}$ passes a $0$ perfectly, but charges its output only to

$$
V_{out} = V_{DD} - V_{th,n}(V_{SB} = V_{out}),
$$ {#eq-vth-drop}

where the threshold includes the body effect because the source, which is the output, is raised above the grounded body. Dually, a pMOS pass transistor with gate at $0$ passes a $1$ perfectly but pulls its output down only to $\lvert V_{th,p}\rvert$.
:::

::: proof
When the nMOS discharges its output towards $0$, the terminal at $0$ is the source and $V_{GS} = V_{DD} > V_{th,n}$ throughout, so the transistor stays on until the output reaches $0$. When it charges the output from a $V_{DD}$ input, the output side is the source: $V_{GS} = V_{DD} - V_{out}$. The transistor turns off when $V_{GS}$ falls to the threshold, i.e. when $V_{out} = V_{DD} - V_{th,n}$, with $V_{th,n}$ evaluated at $V_{SB} = V_{out}$ ([[semiconductor-devices/mosfets]]). (Strictly, it continues to charge slowly by subthreshold conduction, but over normal time scales the output stops about a threshold below $V_{DD}$.) The pMOS case is the mirror image.
:::

::: example A degraded high level {#ex-vth-drop}
An nMOS pass transistor in a process with $V_{DD} = 1.0\,\mathrm V$, $V_{th0} = 0.3\,\mathrm V$, body-effect coefficient $\gamma = 0.3\,\mathrm{V^{1/2}}$ and $2\phi_F = 0.8\,\mathrm V$ passes a logic $1$. Find the output level. Is it a valid high for a symmetric inverter with $V_{IH} = 0.55\,\mathrm V$? Does that inverter draw static current?
::: solution
By [[#eq-vth-drop]], $V_{out} = 1.0 - 0.3 - 0.3(\sqrt{0.8 + V_{out}} - \sqrt{0.8})$. Iterate from $V_{out} = 0.7$: $0.7 - 0.3(1.225 - 0.894) = 0.601$; then $0.7 - 0.3(\sqrt{1.401} - 0.894) = 0.613$; then $0.612$, which is converged. So $V_{out} = 0.61\,\mathrm V$, a $0.39\,\mathrm V$ drop.

$0.61\,\mathrm V$ is above $V_{IH} = 0.55\,\mathrm V$, so the next inverter reads it as a $1$, but with only $60\,\mathrm{mV}$ of margin. Worse, its pMOS sees $V_{SG} = 1.0 - 0.61 = 0.39\,\mathrm V > \lvert V_{th,p}\rvert = 0.3\,\mathrm V$: it is slightly on, and static current flows through the inverter while its output is low. Pass-transistor circuits therefore use **level restorers** — a weak pMOS feedback from the inverter's output to its input that pulls the degraded high up to $V_{DD}$ — or use transmission gates.
:::
:::

::: definition Transmission gate {#def-tg}
A **transmission gate** is an nMOS and a pMOS transistor connected in parallel, with complementary gate signals $S$ and $\overline{S}$. When $S = 1$ both transistors are on and the gate passes both logic levels without a threshold drop: the nMOS passes the $0$ strongly and the pMOS the $1$. When $S = 0$ both are off.
:::

As the output of a transmission gate charges towards $V_{DD}$, the nMOS weakens and the pMOS strengthens, and the parallel combination has a roughly constant resistance over the whole swing. Two transmission gates with complementary controls make a compact 2:1 multiplexer, $Y = \overline{S}A + SB$, with $4$ transistors instead of the $12$ of a complementary AND-OR implementation (plus the inverter for $\overline{S}$, often already available). A transmission-gate XOR, $A\oplus B$, passes $B$ when $A = 0$ and $\overline{B}$ when $A = 1$. Multiplexer-rich circuits such as barrel shifters, adders' sum logic and the latches of [[digital-ic/sequential-circuits-clocking]] use transmission gates extensively.

Transmission gates have no gain: they do not restore levels and do not isolate their output from their input. A signal passing through a chain of them sees a growing RC ladder, and the delay of a chain of $n$ switches each of resistance $R$, with capacitance $C$ at each intermediate node, grows quadratically. Using the Elmore delay of an RC ladder ([[digital-ic/interconnect]]),

$$
t_{chain} \approx 0.69\,RC\,\frac{n(n + 1)}{2}.
$$ {#eq-tg-chain}

Long chains must therefore be broken by inverters or buffers every few stages.

::: example Buffering a transmission-gate chain {#ex-tg-chain}
A signal passes through $12$ transmission gates in series, each with $R = 10\,\mathrm{k\Omega}$, and each internal node has $C = 0.6\,\mathrm{fF}$. Find the delay of the unbuffered chain. A buffer with delay $15\,\mathrm{ps}$ may be inserted after every $m$ gates (restoring a strong drive). Find the best $m$ among the divisors of $12$ and the resulting delay.
::: solution
$0.69RC = 0.69\times10^4\times0.6\times10^{-15} = 4.14\,\mathrm{ps}$. Unbuffered, by [[#eq-tg-chain]], $t = 4.14\times12\times13/2 = 323\,\mathrm{ps}$.

Buffered in $12/m$ segments of $m$ gates, each segment costs $4.14\,m(m + 1)/2 + 15\,\mathrm{ps}$:

| $m$ | segments | delay |
|---|---|---|
| 2 | 6 | $6(12.4 + 15) = 165\,\mathrm{ps}$ |
| 3 | 4 | $4(24.8 + 15) = 159\,\mathrm{ps}$ |
| 4 | 3 | $3(41.4 + 15) = 169\,\mathrm{ps}$ |
| 6 | 2 | $2(86.9 + 15) = 204\,\mathrm{ps}$ |

$m = 3$ is best, halving the delay. Treating $m$ as continuous, the total $\tfrac{n}{m}[0.69RC\,m(m + 1)/2 + t_{buf}]$ is minimised at $m = \sqrt{2t_{buf}/0.69RC} = \sqrt{30/4.14} = 2.7$.
:::
:::

::: widget plot
f: 4.14*x*(x + 1)/2; x/m*(4.14*m*(m + 1)/2 + b)
x: 0, 20
y: 0, 500
sliders: m=3:1:8:1; b=15:5:40:1
labels: \text{unbuffered}; \text{buffer every } m
caption: Delay in picoseconds of a chain of $n$ transmission gates (horizontal axis) with $0.69RC = 4.14\,\mathrm{ps}$ per switch, unbuffered and with a buffer of delay $b$ (ps) after every $m$ gates (the buffered curve is drawn as if $n/m$ could be fractional). The unbuffered delay grows as $n^2$; buffering makes it linear in $n$. Increase $b$: the best spacing $m$ grows as $\sqrt{b}$.
:::

## Design and practice

Real libraries depart from the idealised sizing above in several ways. Cells come in discrete **drive strengths** (often called X1, X2, X4, …), so the continuous sizes of [[#thm-le-path]] are rounded, which costs little because the optimum is flat. Many cells have a **skewed** pMOS/nMOS ratio, favouring the rising or the falling transition for paths whose critical edge is known. Each cell is usually offered with several threshold voltages, so that a synthesis tool can use fast, leaky low-threshold cells only on critical paths ([[digital-ic/power-dissipation]]). In FinFET and nanosheet processes, widths come in whole numbers of fins or sheets, which quantises sizes further, and the pMOS is nearly as strong as the nMOS, which lowers the logical effort of NOR gates.

Timing tools do not use logical effort directly; they use tables of delay against input slope and load for every cell, characterised by circuit simulation. But the method remains the best way for a designer to understand *why* a path is slow and to explore structures before committing to one. Its numbers agree with simulation to within about $10$–$20\,\%$ for ordinary static gates.

::: history
Frank Wanlass's complementary MOS circuits of 1963 already used series and parallel transistor networks to build NAND and NOR gates. The theory of switching networks as Boolean functions goes back to Claude Shannon's master's thesis of 1937, which mapped series and parallel relay contacts to AND and OR. Pass-transistor logic was popular in the nMOS era of the late 1970s, and Mead and Conway's 1980 textbook used it extensively; complementary pass-transistor logic (CPL) was published by Yano and colleagues at Hitachi in 1990. Ivan Sutherland and Robert Sproull presented logical effort at the Advanced Research in VLSI conference in 1991, building on Sutherland's earlier work on fast asynchronous circuits, and with David Harris published the book *Logical Effort: Designing Fast CMOS Circuits* in 1999.
:::

## Where this leads

Dynamic gates ([[digital-ic/dynamic-logic]]) remove the pull-up network altogether, lowering logical effort further at the cost of robustness. Transmission gates and cross-coupled inverters make the latches and flip-flops of [[digital-ic/sequential-circuits-clocking]], whose delays are computed with the methods of this chapter. Logical effort sizes the decoders and word-line drivers of [[digital-ic/memory-arrays]]. When gates are far apart, the wire between them becomes part of the load and its resistance part of the drive, which [[digital-ic/interconnect]] adds to the model; and the capacitance switched in every gate determines the power of [[digital-ic/power-dissipation]]. Arithmetic circuits built from these gates — adders, multipliers — are treated in [[computer-architecture/computer-arithmetic]].

::: summary
- A complementary static gate has an nMOS pull-down network with conduction function $G$ and a dual pMOS pull-up network; it computes $Y = \overline{G}$ with full swing and no static current.
- Single-stage CMOS gates are negative-unate: AND, OR and XOR need a second stage or complemented inputs.
- For equal drive, each of $k$ series transistors is made $k$ times wider; NAND gates are preferred to NOR because their slow pMOS are in parallel.
- Logical effort models gate delay as $d = gh + p$ in units of $\tau$; $g_{\text{NAND}n} = (n + 2)/3$, $g_{\text{NOR}n} = (2n + 1)/3$, $p = n$.
- A path's minimum delay is $\hat D = N(GBH)^{1/N} + P$, reached with equal stage efforts; gates are sized backwards from the load with $C_{in} = gC_{out}/\hat f$, and the best stage effort is about $4$.
- Pseudo-nMOS gates are ratioed: compact but with $V_{OL} > 0$ and static power.
- Pass transistors lose a threshold (an nMOS passes a weak $1$, a pMOS a weak $0$); transmission gates pass both levels, but chains of them have quadratic delay and must be buffered.
:::

## Exercises

::: exercise Logical effort of a NAND4 {level=1 check="2*3 + 4"}
Find the delay, in units of $\tau$, of a NAND4 gate whose electrical effort is $h = 3$.
::: solution
$g = (4 + 2)/3 = 2$ and $p = 4$, so $d = 2\times3 + 4 = 10$.
:::
:::

::: exercise Sizing a NOR3 {level=1}
Give the nMOS and pMOS widths (in units where the unit inverter is $1$ and $2$) of a NOR3 gate with the same worst-case drive as the unit inverter, and its logical effort.
::: solution
The three nMOS are in parallel: width $1$ each. The three pMOS are in series and must each be $3\times2 = 6$ wide. Each input drives $1 + 6 = 7$ units against the inverter's $3$, so $g = 7/3$, in agreement with [[#eq-le-nand]].
:::
:::

::: exercise Pull-up network of an OAI22 {level=1}
Draw (in words) the pull-down and pull-up networks of $Y = \overline{(A + B)(C + D)}$ and size them for unit drive.
::: solution
$G = (A + B)(C + D)$: the pull-down network is ($A \parallel B$) in series with ($C \parallel D$); every worst-case path has two nMOS in series, so all four are width $2$. The pull-up is the dual: ($A$ series $B$) in parallel with ($C$ series $D$); each branch has two pMOS in series, so all four are width $4$. Each input sees $2 + 4 = 6$ units: $g = 2$.
:::
:::

::: exercise A two-stage path {level=2 check="2*sqrt(4/3*20) + 3"}
A NAND2 drives an inverter, which drives a load $20$ times the NAND2's input capacitance. Find the minimum delay in units of $\tau$, and the size of the inverter as a multiple of the NAND2's input capacitance.
::: solution
$G = 4/3$, $H = 20$, $F = 26.7$, $\hat f = \sqrt{26.7} = 5.16$, $P = 2 + 1 = 3$, so $\hat D = 10.3 + 3 = 13.3$. The inverter's input capacitance is $1\times20C_{in}/5.16 = 3.87\,C_{in}$; check: the NAND2 then has $h = 3.87$ and $f = \tfrac43\times3.87 = 5.16$.
:::
:::

::: exercise Pseudo-nMOS levels and power {level=2 check="0.5*100e-6*0.49"}
A pseudo-nMOS NOR gate has a pMOS load with $k_p = 100\,\mathrm{\mu A/V^2}$ and nMOS pull-downs with $k_n = 400\,\mathrm{\mu A/V^2}$ each, $V_{DD} = 1.0\,\mathrm V$ and thresholds of $0.3\,\mathrm V$. Find the static current in amperes when exactly one input is high, the corresponding $V_{OL}$, and $V_{OL}$ when two inputs are high.
::: solution
The load current is $\tfrac12(100\times10^{-6})(0.7)^2 = 24.5\,\mathrm{\mu A}$. With one input high, [[#eq-vol]] gives $24.5 = 400(0.7V_{OL} - V_{OL}^2/2)$ (currents in µA), i.e. $2V_{OL}^2 - 2.8V_{OL} + 0.245 = 0$, so $V_{OL} = 0.094\,\mathrm V$. With two inputs high the pull-down is twice as strong ($k_n = 800$): $4V_{OL}^2 - 5.6V_{OL} + 0.245 = 0$, $V_{OL} = (5.6 - \sqrt{31.36 - 3.92})/8 = 0.045\,\mathrm V$. The static power is $24.5\,\mathrm{\mu W}$ whenever the output is low.
:::
:::

::: exercise Input ordering in a NAND3 {level=2}
In a NAND3 gate the three inputs arrive at different times: $A$ first, $B$ later, $C$ last. Which input should drive the nMOS nearest the output? Explain in terms of the internal nodes that must be discharged after the last input arrives.
::: solution
$C$, the latest, should be at the top (nearest the output). Before it arrives, $A$ and $B$ are already high, so their transistors (lower in the stack) are on and both internal nodes have been discharged to ground. When $C$ rises, only the output capacitance must be discharged, through the three series transistors. If $C$ were at the bottom, the internal nodes above it would still be charged (they sit between the output and the off transistor), and $C$'s transistor would have to discharge them as well as the output, increasing the delay.
:::
:::

::: exercise Optimum stages for a decoder path {level=2}
A path with logical effort $G = 2.5$ and no branching must drive a load $H = 400$. Find the best number of stages (assume the logic can be padded with inverters) and the resulting minimum delay if the logic gates contribute $P = 6$ and each added inverter adds $1$ to $P$. The logic alone has $2$ stages.
::: solution
$F = 2.5\times400 = 1000$. $\log_4 1000 = 4.98$, so about $5$ stages, i.e. $3$ added inverters (the polarity may force $4$ or $6$). For $N = 5$: $\hat f = 1000^{0.2} = 3.98$, $P = 6 + 3 = 9$, $\hat D = 19.9 + 9 = 28.9$. For comparison $N = 2$: $\hat D = 2\sqrt{1000} + 6 = 69.2$; $N = 4$: $4\times5.62 + 8 = 30.5$; $N = 6$: $6\times3.16 + 10 = 29.0$. Five or six stages are both close to optimal.
:::
:::

::: exercise Transmission-gate XOR {level=3}
Design an XOR gate $Y = A\oplus B$ from two transmission gates and inverters, given only $A$ and $B$ (not their complements). Count the transistors and explain why the output must be buffered if it drives a large load or a long chain of further transmission gates.
::: hint
$A\oplus B$ equals $B$ when $A = 0$ and $\overline{B}$ when $A = 1$: a 2:1 multiplexer controlled by $A$.
:::
::: solution
Generate $\overline{A}$ and $\overline{B}$ with two inverters ($4$ transistors). Transmission gate 1 passes $B$ to $Y$ and is on when $A = 0$ (nMOS gate $\overline{A}$, pMOS gate $A$); transmission gate 2 passes $\overline{B}$ to $Y$ and is on when $A = 1$ (nMOS gate $A$, pMOS gate $\overline{A}$). Exactly one is on for each $A$, so $Y = \overline{A}B + A\overline{B}$. The total is $4 + 4 = 8$ transistors, against $12$ for a typical complementary XOR (which also needs both input polarities). The output is driven through the transmission gate from either $B$ (an input of the gate) or the inverter producing $\overline{B}$, so it has no drive of its own: a heavy load on $Y$ loads the circuit that drives $B$, and cascading such XORs builds the quadratic RC chain of [[#eq-tg-chain]]. An output inverter (and an extra inverter on the input to keep the polarity) restores drive and isolation.
:::
:::

::: exercise Logical effort from first principles {level=3}
A gate is built with pMOS transistors that are $\rho$ times as resistive as nMOS transistors of the same width (instead of $\rho = 2$). (a) Find the unit inverter's input capacitance and the logical efforts of NAND$n$ and NOR$n$ as functions of $\rho$ and $n$. (b) For a FinFET-like process with $\rho = 1.2$, evaluate $g$ for NAND2 and NOR2 and comment.
::: solution
(a) The unit inverter has nMOS width $1$ and pMOS width $\rho$, so $C_{inv} = 1 + \rho$. The NAND$n$ has series nMOS of width $n$ and parallel pMOS of width $\rho$: $g = (n + \rho)/(1 + \rho)$. The NOR$n$ has parallel nMOS of width $1$ and series pMOS of width $n\rho$: $g = (1 + n\rho)/(1 + \rho)$. For $\rho = 2$ these are $(n + 2)/3$ and $(2n + 1)/3$.

(b) $g_{\text{NAND2}} = 3.2/2.2 = 1.45$ and $g_{\text{NOR2}} = 3.4/2.2 = 1.55$. With nearly equal nMOS and pMOS strength, NAND and NOR gates have almost the same logical effort, and the strong preference for NAND gates weakens. (The parasitic delays are still about $n$ for both.)
:::
:::

::: exercise An AOI path {level=3}
A path consists of an AOI21 gate (driven on its $A$ input), followed by a NAND2, followed by an inverter that drives $180$ units; the AOI21's input presents $6$ units. The AOI21 output drives two identical NAND2 gates, only one of which is on the path. Find $F$, the minimum delay and the gate sizes.
::: hint
Use $g = 2$ and $p = 7/3$ for the $A$ input of the AOI21; the branching effort at its output is $2$.
:::
::: solution
$G = 2\times\tfrac43\times1 = 2.67$, $B = 2$, $H = 180/6 = 30$, $F = 2.67\times2\times30 = 160$. With $N = 3$, $\hat f = 160^{1/3} = 5.43$, $P = 7/3 + 2 + 1 = 5.33$, $\hat D = 16.3 + 5.33 = 21.6$ ($44.8\,\mathrm{ps}$). Sizes: inverter input $180/5.43 = 33.1$ units; each NAND2 input $\tfrac43\times33.1/5.43 = 8.13$ units; the AOI21 drives two of them, $16.3$ units, so its $A$ input is $2\times16.3/5.43 = 6.0$ units, as specified.
:::
:::
