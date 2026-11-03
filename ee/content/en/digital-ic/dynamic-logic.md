Static CMOS gates pay twice for every input: once in an nMOS transistor that pulls the output down and again in a pMOS transistor that pulls it up. The pMOS half is the expensive half. It is slow, so it must be wide; it is often in series, so it must be wider still; and every input drives its capacitance, which is why the logical effort of a NOR gate grows so quickly with fan-in ([[digital-ic/static-cmos-logic#prop-le-values]]). **Dynamic logic** removes the pull-up network altogether. The output node is charged high by a single clocked pMOS transistor during a **precharge** phase, and then, during an **evaluate** phase, the nMOS network either discharges it or leaves it floating high. A wide OR gate that would be hopelessly slow in static CMOS becomes one of the fastest structures on the chip.

The price is fragility. A dynamic gate holds its high output as charge on a capacitor, with nothing actively driving it, so anything that removes or redistributes charge — leakage, coupling from neighbouring wires, charge sharing with internal nodes, a glitch on an input — can corrupt it, and once discharged it cannot recover until the next precharge. For a decade or more dynamic and **domino** logic gave the fastest microprocessors their fastest paths; today, with leakier transistors and larger variation, it survives mainly in memory arrays, register files and a few special datapaths. Understanding it remains essential, both for those circuits and because its failure mechanisms — charge sharing, leakage, coupling noise — are those of every node that is ever left floating. This chapter builds on static gates and logical effort from [[digital-ic/static-cmos-logic]].

## Precharge and evaluate

::: definition Dynamic gate {#def-dynamic}
A **dynamic gate** has an output node $X$, a pMOS **precharge transistor** from $V_{DD}$ to $X$ driven by the clock $\phi$, and an nMOS pull-down network with conduction function $G$ between $X$ and ground. In a **footed** gate, an nMOS **foot** (evaluation) transistor driven by $\phi$ is in series with the pull-down network at its ground end; an **unfooted** gate omits it. The gate operates in two phases:

- **precharge** ($\phi = 0$): the precharge transistor charges $X$ to $V_{DD}$; the foot is off, so no current flows even if $G = 1$;
- **evaluate** ($\phi = 1$): the precharge transistor is off; if $G = 1$, the pull-down network discharges $X$ to $0$, and if $G = 0$, $X$ remains high, held only by its capacitance.

The output during evaluation is $X = \overline{G}$.
:::

A dynamic NOR4, for example, has four parallel nMOS transistors and a foot, six transistors instead of the eight of a static NOR4, and its inputs see only nMOS capacitance. A dynamic NAND has a series stack, like its static counterpart, but no series pMOS.

Several properties follow immediately.

- **Fewer transistors**: $n + 2$ for $n$ inputs (footed) instead of $2n$.
- **Lower input capacitance and logical effort**, as computed below.
- **No static current and no contention** during evaluation: the precharge transistor is off, so the pull-down does not fight a pull-up, unlike ratioed pseudo-nMOS logic ([[digital-ic/static-cmos-logic#prop-pseudo]]).
- **Only one transition per cycle**: in evaluation the output can only fall, and a fallen output stays low until the next precharge. Glitches cannot propagate in the usual way, but neither can they be undone.
- **A low input noise margin**: the pull-down transistors begin to conduct as soon as an input exceeds $V_{th,n}$, and any conduction during evaluation removes charge irreversibly. The low-level noise margin of a dynamic gate is therefore about $V_{th,n}$, not the $0.45\,V_{DD}$ of a static inverter.
- **A minimum clock frequency**: a high output is a floating node, and leakage slowly discharges it, so it must be refreshed by a precharge within a bounded time.

### Why the foot?

In a footed gate the pull-down network is disconnected from ground during precharge. Without the foot, if an input is high while $\phi = 0$, the precharge pMOS and the conducting pull-down network form a path from $V_{DD}$ to ground: the output does not fully precharge and current flows. Unfooted gates are faster (one fewer series transistor, lower logical effort) but are safe only if every input is guaranteed to be low throughout precharge — which is true when the inputs come from other domino gates that are themselves precharged, as we shall see.

### Logical effort of dynamic gates

::: proposition Logical effort of dynamic gates {#prop-le-dynamic}
Sizing the pull-down network to the drive of a unit inverter's nMOS (resistance $R$ for width $1$), and comparing input capacitance with the unit inverter's $3$ units, the logical efforts for the falling (evaluation) transition are

| gate | footed | unfooted |
|---|---|---|
| inverter | $2/3$ | $1/3$ |
| NAND2 | $1$ | $2/3$ |
| NOR$n$ | $2/3$ | $1/3$ |
:::

::: proof
In a footed dynamic inverter the input transistor and the foot are in series, so each must have width $2$ for total resistance $R$; the input sees $2$ units, $g = 2/3$. A footed NAND2 has three series transistors (two inputs and the foot), each of width $3$: $g = 3/3 = 1$. In a footed NOR, each input transistor is in series only with the shared foot, so input and foot are width $2$: $g = 2/3$, independent of $n$. Without the foot, the series stacks are one shorter: widths $1$, $2$ and $1$, giving $g = 1/3$, $2/3$ and $1/3$. The precharge pMOS is driven by the clock, not by the data inputs, so it adds nothing to the logical effort of a data input.
:::

The unfooted dynamic NOR has *one ninth* of the logical effort of a static NOR4 ($g = 3$), and its logical effort does not increase with the number of inputs. This is the reason for dynamic logic. Its parasitic delay does grow with fan-in, since every input transistor adds its drain to the output node.

::: example Delay of a wide OR {#ex-wide-or}
An 8-input OR must drive a load $H = 10$ times its input capacitance. Compare (a) static NOR4 followed by NAND2; (b) an unfooted dynamic NOR8 followed by an inverter skewed to favour its rising output, with $g = 5/6$ and $p = 5/6$ for the inverter and $p = 3$ for the dynamic gate; (c) the same with a footed dynamic gate, with $p = 17/3$.
::: solution
(a) $G = 3\times\tfrac43 = 4$, $F = 40$, $P = 4 + 2 = 6$: $\hat D = 2\sqrt{40} + 6 = 12.6 + 6 = 18.6$.

(b) $G = \tfrac13\times\tfrac56 = 0.278$, $F = 2.78$, $P = 3 + 0.83 = 3.83$: $\hat D = 2\sqrt{2.78} + 3.83 = 3.33 + 3.83 = 7.2$.

(c) $G = \tfrac23\times\tfrac56 = 0.556$, $F = 5.56$, $P = 5.67 + 0.83 = 6.5$: $\hat D = 2\times2.36 + 6.5 = 11.2$.

In units of $\tau = 2.07\,\mathrm{ps}$, the unfooted domino OR is about $15\,\mathrm{ps}$ against $39\,\mathrm{ps}$ for the static version — more than twice as fast. The comparison flatters the dynamic gate somewhat: it ignores the keeper (which fights the pull-down), the time needed for precharge, and the fact that the static path computes both rising and falling outputs while the dynamic one evaluates only in one direction. But a factor of about two is typical, and it was decisive for high-performance design.
:::
:::

## The monotonicity problem and domino logic

Dynamic gates cannot simply be connected in series. Suppose the output $X_1$ of one dynamic gate drives an input of a second dynamic gate, both clocked by $\phi$. At the start of evaluation $X_1$ is precharged high. Even if gate 1 is going to discharge, it takes a gate delay to do so, and during that time the second gate sees a *high* input and begins to discharge its own output $X_2$. When $X_1$ finally falls, the transistor it drives turns off — but the charge already removed from $X_2$ is gone.

::: theorem Monotonicity requirement {#thm-monotone}
A dynamic gate evaluates correctly only if each of its inputs is **monotonically rising** during the evaluate phase: an input may stay low, stay high, or make a single transition from low to high, but must never make a high-to-low transition. Since the output of a dynamic gate can only fall during evaluation, the output of one dynamic gate cannot be used directly as the input of another.
:::

::: proof
During evaluation the output node can only lose charge: the precharge transistor is off, so the only paths from $X$ lead through nMOS transistors to ground. If an input that is high at some instant later falls, the pull-down network may have conducted during the interval it was high, discharging $X$ partly or fully, even though the final input values give $G = 0$. The lost charge cannot be restored before the next precharge, so the output is wrong. If every input only rises, the set of conducting transistors only grows; the network conducts at the end if and only if $G = 1$, and if it never conducts, $X$ remains high. Conversely, a precharged dynamic output starts high and can only fall, so it is monotonically *falling* — exactly the wrong kind of signal for the next gate.
:::

::: example Tracing a monotonicity failure {#ex-monotone}
Gate 1 is a footed dynamic inverter with input $A$; gate 2 is a footed dynamic inverter whose input is gate 1's output $X_1$. Both outputs are precharged high and both feet switch on at $t = 0$. $A = 1$ throughout evaluation, so gate 1 should give $X_1 = 0$ and gate 2 should give $X_2 = 1$. Each gate takes $20\,\mathrm{ps}$ to discharge its output fully, and discharges it at a roughly constant rate. Gate 1's output crosses the threshold of gate 2's input transistor at $t \approx 15\,\mathrm{ps}$. What is $X_2$ at the end of evaluation?
::: solution
From $t = 0$ to about $15\,\mathrm{ps}$, $X_1$ is above the threshold of gate 2's input transistor, so gate 2's pull-down conducts — at first strongly (its input is at $V_{DD}$), then more weakly as $X_1$ falls. As a crude estimate, gate 2 discharges for roughly $10$–$15\,\mathrm{ps}$ of its $20\,\mathrm{ps}$ full-discharge time, losing more than half its charge: $X_2$ falls to below $0.5\,V_{DD}$ and stays there. The inverter that reads $X_2$ may well interpret this as a $0$, the wrong answer, and in any case the node is badly degraded. The correct output $X_2 = 1$ would require that $X_1$ were low at the start of evaluation, which it cannot be.
:::
:::

The cure is to place a static inverter after every dynamic gate. The inverter's output is low during precharge (because the dynamic node is high) and can only rise during evaluation: it is monotonically rising, as the next dynamic gate requires.

::: definition Domino logic {#def-domino}
A **domino gate** is a dynamic gate followed by a static inverter. Its output is low during precharge and rises at most once during evaluation, computing the non-inverting function $G$. Cascaded domino gates, all clocked by the same $\phi$, evaluate one after another like a row of falling dominoes: the first gate's output rises, which triggers the second, and so on.
:::

The output inverter is usually **skewed**: its pMOS is sized for the rising output that matters during evaluation, and its nMOS is made small, because the falling output only occurs during precharge, when there is plenty of time. A HI-skew inverter with pMOS width $2$ and nMOS width $1/2$ has the drive of a unit inverter for the rising output but an input capacitance of only $2.5$ units: $g = 5/6$. The inverter also isolates the dynamic node from the output load, which may be a long wire with coupling noise, and provides a convenient place to attach a **keeper** (below).

Domino gates that are fed only by other domino gates have inputs that are low throughout precharge, so they can be **unfooted**. Only the first gate in a chain, whose inputs come from static logic or registers, needs a foot. There is one subtlety: an unfooted gate must not begin precharging until its inputs have fallen, otherwise the precharge pMOS fights the still-conducting pull-down. In practice the precharge of later stages is delayed slightly, or the clock is made to ripple through the chain.

### Living with non-inverting logic

By [[digital-ic/static-cmos-logic#prop-unate]] a single static gate can only compute inverting functions. A domino gate is the opposite: it computes only **positive-unate** (non-inverting) functions such as AND, OR and AND-OR combinations. That is unfortunate, because many useful functions — XOR in adders and parity trees, for example — are not unate. Two solutions are used.

- **Dual-rail domino.** Compute every signal and its complement in two domino gates, one implementing $G$ and the other $\overline{G}$, each with its pull-down network built from the true and complementary inputs as needed. Each signal pair is then $(0, 0)$ during precharge and becomes $(1, 0)$ or $(0, 1)$ during evaluation. This doubles the hardware, but the pair also acts as a completion signal, useful in self-timed circuits.
- **Restructuring the logic** so that inversions occur only at the inputs or outputs of a domino block, where static logic can provide them.

A third family, **NP-domino** (or NORA, "no race" logic), alternates nMOS dynamic gates with pMOS dynamic gates that precharge low and evaluate high on the complementary clock, so that the falling output of one feeds the next directly; it saves the inverters but needs careful attention to noise, and pMOS dynamic gates are slow.

::: quiz
A designer connects the output of a domino OR gate (dynamic stage plus inverter) to the input of a second domino AND gate clocked by the same $\phi$. Is the monotonicity requirement satisfied?
- [x] yes: the domino output is low in precharge and can only rise during evaluation
- [ ] no: the domino output falls during evaluation
- [ ] only if the second gate is unfooted
- [ ] only if both gates are footed
::: solution
The dynamic node of the first gate is high in precharge and can only fall during evaluation; the inverter after it turns that into a signal that is low in precharge and can only rise. That is exactly the monotonically rising input the second gate needs ([[#thm-monotone]]). Whether the second gate needs a foot is a separate question: since its input is low during precharge, it may be unfooted.
:::
:::

## Charge sharing

The dynamic node is not the only capacitance in the pull-down network. Consider a dynamic NAND2 with inputs $A$ (top transistor, connected to the output $X$) and $B$ (bottom), and an internal node $Y$ between them with capacitance $C_Y$. Suppose that in the previous evaluation phase $B$ was high and $A$ low, so that $Y$ was discharged to $0$ through $B$ and the foot, while $X$ stayed high. The gate then precharges $X$ (but not $Y$, which the precharge transistor cannot reach while $A$ is low), and in the next evaluation phase $B$ is low and $A$ high. The correct output is $X = \overline{AB} = 1$, and the pull-down network does not conduct to ground. But the transistor $A$ is now on, connecting $X$ to the uncharged node $Y$: charge flows from $C_X$ to $C_Y$ and the output voltage drops.

::: proposition Charge sharing {#prop-charge-sharing}
A dynamic node of capacitance $C_X$, precharged to $V_{DD}$, is connected through an nMOS transistor whose gate is at $V_{DD}$ to an internal node of capacitance $C_Y$ initially at $0$. Charge is conserved and the internal node can rise at most to $V_{DD} - V_{th,n}$. Then:

- if $C_X/(C_X + C_Y) \le 1 - V_{th,n}/V_{DD}$, the two nodes equalise at
$$
V_X = V_{DD}\,\frac{C_X}{C_X + C_Y};
$$ {#eq-cs-a}
- otherwise the internal node stops at $V_{DD} - V_{th,n}$ and
$$
V_X = V_{DD} - \frac{C_Y}{C_X}\,(V_{DD} - V_{th,n}).
$$ {#eq-cs-b}

In both cases $V_X$ is the larger of the two expressions.
:::

::: proof
The total charge $C_XV_{DD}$ is conserved, since no current flows to ground or from the supply. If the transistor stays on until the voltages are equal, the common voltage is $C_XV_{DD}/(C_X + C_Y)$, which is [[#eq-cs-a]]; this is possible only if that voltage does not exceed $V_{DD} - V_{th,n}$, because the transistor, with its gate at $V_{DD}$, turns off when its source (node $Y$) reaches $V_{DD} - V_{th,n}$. If the equal-sharing value would exceed $V_{DD} - V_{th,n}$, the transistor turns off first, with $Y$ at $V_{DD} - V_{th,n}$; charge conservation, $C_XV_{DD} = C_XV_X + C_Y(V_{DD} - V_{th,n})$, gives [[#eq-cs-b]]. At the boundary between the two cases, both formulas give $V_X = V_{DD} - V_{th,n}$, and on either side the valid one is the larger (the transistor turning off can only *limit* the charge transferred).
:::

::: example How much does the output drop? {#ex-charge-sharing}
A dynamic gate has $C_X = 4\,\mathrm{fF}$ on its output node. In the worst case one internal node of $C_Y = 1\,\mathrm{fF}$ is uncharged at the start of evaluation. With $V_{DD} = 1.0\,\mathrm V$ and $V_{th,n} = 0.3\,\mathrm V$ (ignoring the body effect), find the output voltage after charge sharing. Repeat for two such internal nodes in series ($C_Y = 2\,\mathrm{fF}$ in total, both reached through conducting transistors). Will a HI-skew output inverter with a switching threshold of $0.6\,\mathrm V$ misread either case?
::: solution
One node: the equal-sharing value is $4/5 = 0.80\,\mathrm V$, above $V_{DD} - V_{th,n} = 0.7\,\mathrm V$, so case [[#eq-cs-b]] applies: $V_X = 1.0 - \tfrac14(0.7) = 0.825\,\mathrm V$.

Two nodes: equal sharing gives $4/6 = 0.667\,\mathrm V$, below $0.7\,\mathrm V$, so [[#eq-cs-a]] applies and $V_X = 0.667\,\mathrm V$.

The skewed inverter, whose threshold has been raised to make its rising output fast, is uncomfortably close to misreading the second case: $0.667\,\mathrm V$ is only $67\,\mathrm{mV}$ above its switching threshold, and any further noise — coupling, leakage — could make the domino output glitch high. Even when the inverter reads correctly, its pMOS is partly on, wasting power. The usual fixes are to precharge the internal nodes too (extra pMOS on the internal nodes, clocked like the main precharge transistor), to order the inputs so that internal nodes tend to stay charged, and to add a keeper.
:::
:::

::: widget plot
f: max(1/(1 + x), 1 - x*(1 - t)); s
x: 0, 2
y: 0, 1
sliders: t=0.3:0.1:0.5:0.01; s=0.6:0.4:0.8:0.01
labels: V_X/V_{DD}\ \text{after sharing}; \text{output inverter threshold}
caption: Output of a dynamic node after charge sharing, as a fraction of $V_{DD}$, against the ratio $C_Y/C_X$ of the internal capacitance to the output capacitance, from [[#prop-charge-sharing]] with $V_{th,n}/V_{DD} = t$. For small $C_Y$ the internal node is limited to $V_{DD} - V_{th,n}$ and the drop is linear; beyond the kink the two nodes share charge equally. The horizontal line is the switching threshold $s$ of the output inverter: the gate fails where the curve crosses it. With $t = 0.3$ and a HI-skew inverter at $s = 0.6$, the internal capacitance must stay below about two-thirds of the output capacitance.
:::

## Leakage, keepers and noise

### Leakage and the minimum clock frequency

A high dynamic node in evaluation is isolated: the precharge transistor is off and the pull-down network is off. But neither is perfectly off. Subthreshold leakage through the pull-down network ([[semiconductor-devices/mosfets]]), junction leakage and gate leakage slowly discharge the node. If the leakage current is $I_{leak}$, the node droops at the rate $I_{leak}/C_X$, and after a time $t$ has lost

$$
\Delta V = \frac{I_{leak}\,t}{C_X}.
$$ {#eq-droop}

A wide dynamic NOR is the worst case: it has many parallel off transistors, each leaking.

::: example Minimum clock frequency without a keeper {#ex-droop}
A dynamic NOR16 has $C_X = 5\,\mathrm{fF}$. Each of its $16$ off input transistors leaks $0.5\,\mathrm{nA}$ at room temperature, and the leakage rises by a factor of $10$ at $100\,^\circ\mathrm C$. The output must not droop by more than $0.1\,\mathrm V$ during evaluation. Find the longest allowed evaluation phase at each temperature, and the minimum clock frequency for a $50\,\%$ duty cycle.
::: solution
At room temperature $I_{leak} = 16\times0.5 = 8\,\mathrm{nA}$. By [[#eq-droop]], $t = C_X\Delta V/I_{leak} = 5\times10^{-15}\times0.1/8\times10^{-9} = 62.5\,\mathrm{ns}$. With a $50\,\%$ duty cycle the clock period may be at most $125\,\mathrm{ns}$: $f_{min} = 8\,\mathrm{MHz}$.

At $100\,^\circ\mathrm C$, $I_{leak} = 80\,\mathrm{nA}$, $t = 6.25\,\mathrm{ns}$, and $f_{min} = 80\,\mathrm{MHz}$.

These are long times compared with a $1\,\mathrm{GHz}$ clock, but they matter: the chip cannot be stopped or slowed for testing or power saving with its dynamic nodes floating, and in a leaky low-threshold process the margins shrink by further orders of magnitude.
:::
:::

::: widget plot
f: max(1 - max(i - k, 0)*x/(c*1000), 0)
x: 0, 100
y: 0, 1.05
sliders: i=8:1:100:1; c=5:1:20:0.5; k=0:0:50:1
hlines: 0.9; 0.6
labels: V_X\ \text{in volts}
caption: Droop of a floating dynamic node (volts) against time in nanoseconds, for leakage $i$ (nA), node capacitance $c$ (fF) and keeper current $k$ (nA), from [[#eq-droop]]. The upper line is the $0.1\,\mathrm V$ droop budget of [[#ex-droop]], the lower one the threshold of a HI-skew output inverter. With the defaults the budget is used up after $62.5\,\mathrm{ns}$. Raise $i$ to $80$ (the hot corner): the node fails within a few nanoseconds. Then raise $k$ above $i$: the keeper holds the node indefinitely.
:::

### Keepers

A **keeper** is a weak pMOS transistor from $V_{DD}$ to the dynamic node, with its gate driven by the output of the domino inverter. When the dynamic node is high, the inverter output is low and the keeper is on, replacing charge lost to leakage and charge sharing and holding the node high indefinitely. When the pull-down network discharges the node, the keeper initially fights it; as soon as the node falls past the inverter's threshold, the inverter output rises and turns the keeper off.

The keeper must therefore be strong enough to overcome the worst-case leakage and noise, and weak enough not to slow evaluation unduly — another **ratio** constraint, like pseudo-nMOS. Typically the keeper is sized to supply about a tenth of the current of the weakest pull-down path. In leaky processes a keeper strong enough to hold a wide NOR against the leakage of all its inputs may slow the gate so much that its advantage over static logic disappears; this was one of the main reasons dynamic logic retreated after the 90 nm generation. **Conditional** or **delayed** keepers, which turn on more strongly only after the evaluation window, are a partial remedy.

::: example Sizing a keeper {#ex-keeper}
In the reference process (nMOS $1\,\mathrm{k\Omega\cdot\mu m}$, saturation current about $0.75\,\mathrm{mA/\mu m}$; pMOS half as strong), the weakest pull-down path of a domino gate is a single nMOS of width $0.2\,\mathrm{\mu m}$ in series with a foot of the same width. The worst-case leakage of the dynamic node at high temperature is $1\,\mu\mathrm A$, and the keeper must supply at least five times that. Choose the keeper width if keeper current should be no more than a tenth of the pull-down current, and check both conditions.
::: solution
Two equal transistors in series have twice the resistance of one, so the pull-down path behaves like a single nMOS of width $0.1\,\mathrm{\mu m}$, with saturation current about $0.75\times0.1 = 75\,\mathrm{\mu A}$. The keeper should then supply at most $7.5\,\mathrm{\mu A}$. A pMOS of width $W_k$ supplies about $0.375\,W_k\,\mathrm{mA/\mu m}$ when fully on, so $W_k \le 7.5/375 = 0.02\,\mathrm{\mu m}$ — narrower than any real transistor. Keepers are therefore made **long** rather than narrow: a minimum-width ($0.1\,\mathrm{\mu m}$) pMOS with its channel five times longer than minimum supplies roughly $0.375\times0.1/5\,\mathrm{mA} = 7.5\,\mathrm{\mu A}$.

That is $7.5$ times the $1\,\mathrm{\mu A}$ leakage, satisfying the factor-of-five requirement. The evaluation slows because the pull-down's net current is reduced by about $10\,\%$ while the keeper is on. If the leakage were ten times higher, no keeper could satisfy both conditions, and the gate would have to be redesigned (fewer parallel inputs, higher-threshold transistors, or static logic).
:::
:::

::: warning Floating nodes are not memories
A dynamic node holds its value only for a limited time and only if nothing disturbs it. Coupling from a neighbouring wire that switches low can pull it down by a fraction $C_c/(C_c + C_X)$ of the swing ([[digital-ic/interconnect]]); an alpha particle or neutron strike can deposit enough charge to flip it; and the clock signal itself couples through the gate–drain overlap of the precharge transistor (**clock feedthrough**), briefly pushing the node above $V_{DD}$. A static gate recovers from all of these because it is actively driven; a dynamic node without a keeper does not. Never route long wires over unprotected dynamic nodes, and never assume a dynamic node survives a stopped clock.
:::

### Noise margins

The input of a dynamic gate is unforgiving of noise on a *low* input: as soon as it exceeds $V_{th,n}$, the pull-down transistor conducts and removes charge irreversibly. With $V_{th,n} = 0.3\,\mathrm V$ and some subthreshold conduction below it, the effective low-level noise margin is perhaps $0.2$–$0.25\,\mathrm V$, about half that of a static gate. Domino outputs must therefore be routed carefully, kept short, and shielded from aggressors, and the inputs from static logic must be stable before evaluation begins.

::: quiz
Which change makes a domino gate *more* robust against charge sharing but *slower*?
- [ ] removing the foot transistor
- [x] increasing the keeper strength
- [ ] skewing the output inverter further towards the rising transition
- [ ] increasing the number of parallel inputs
::: solution
A stronger keeper replaces more of the charge lost to sharing and leakage, but fights the pull-down network harder during evaluation, slowing the falling transition. Removing the foot makes the gate faster, not more robust. Skewing the inverter further raises its switching threshold, which makes the gate *more* sensitive to a drooping dynamic node. More parallel inputs add leakage and diffusion capacitance.
:::
:::

## Timing of domino pipelines

A domino gate does useful work only during evaluation; precharge is overhead. In the simplest scheme all gates in a block evaluate during the high phase of the clock and precharge during the low phase, and the evaluated results must be captured by a latch at the end of the evaluation phase. The precharge time and the latch delay then come out of every cycle. Two refinements reduce this overhead.

- **Two-phase domino.** Alternate blocks are clocked by $\phi$ and $\overline{\phi}$: while one block evaluates, the next precharges, and each block's outputs are held by the latching behaviour of the following block's evaluation. Latches at the block boundaries can be removed.
- **Skew-tolerant domino**, developed by David Harris in the late 1990s, uses several overlapping clock phases so that gates in each phase begin evaluating before the previous phase precharges. This hides the precharge time, tolerates clock skew, and allows time borrowing across phase boundaries, in the manner of the latch-based timing of [[digital-ic/sequential-circuits-clocking]].

Dynamic outputs must be held stable while the next stage samples them, which in a domino chain means that a gate must not precharge until all gates it drives have finished evaluating. That **hold-type** constraint on the precharge is the dynamic counterpart of the hold constraint on flip-flops.

## Design and practice

Dynamic logic reached its peak in the high-frequency microprocessors of the 1990s and early 2000s, where the fastest integer units, comparators and register files were built largely from domino gates. Several trends then pushed it back:

- **Leakage** grew by orders of magnitude as thresholds fell, requiring ever stronger keepers that ate into the speed advantage, and increasing the risk to wide dynamic nodes.
- **Variation** in threshold voltage and in the timing of clock edges reduced the margins of a style that depends on ratios and timing.
- **Power**: every domino node is precharged and (if its function evaluates to $1$) discharged every cycle, so its activity factor is high regardless of how often its logical value changes; a clocked precharge transistor and keeper add load to the clock network. Static logic switches only when its inputs change ([[digital-ic/power-dissipation]]).
- **Design tools**: static logic is supported by fully automated synthesis and timing; dynamic logic needs custom design and verification.

As of 2026, essentially all random logic in commercial chips is static CMOS. Dynamic circuits remain where their advantages are overwhelming and their environment is controlled: the precharged bit lines of SRAM arrays and register files, which are wide dynamic NOR gates read by sense amplifiers ([[digital-ic/memory-arrays]]); content-addressable memories, whose match lines are dynamic NOR gates spanning a whole word; and some high-speed comparators and decoders. Precharged structures also reappear in low-swing on-chip buses.

::: application Register-file read ports
A register file with many read ports is a classic dynamic structure. Each read port has a bit line per bit, shared by all the registers in the file; the selected register's cells pull down their bit lines through two series transistors (one driven by the stored bit, one by the read word line), and a precharge pMOS restores the bit lines between reads. Each bit line is a dynamic NOR of up to dozens of inputs, with a keeper and a skewed inverter at the end — exactly the gate analysed above. Splitting long bit lines into local and global segments, each a domino stage, limits leakage and charge sharing.
:::

::: history
Dynamic, clocked circuits were essential in the nMOS era of the 1970s: they saved the static power of resistive loads, and the multiphase clocking schemes of early microprocessors and DRAMs relied on charge stored on nodes. Domino CMOS logic was described by R. H. Krambeck, Charles M. Lee and Hung-Fai Stephen Law of Bell Laboratories in 1982, who named it after the way gates trigger one another in sequence. NORA (no-race) logic was proposed by Nelson Gonçalves and Hugo De Man in 1983, and zipper logic soon after. Dynamic and domino circuits were used extensively for the fastest paths of the high-frequency microprocessors of the 1990s and early 2000s, including several generations of DEC's Alpha and Intel's Pentium 4, before rising leakage and variation led most designs back to static logic.
:::

## Where this leads

The precharge–evaluate principle reappears throughout [[digital-ic/memory-arrays]]: precharged bit lines, sense amplifiers that resolve small voltage differences, and dynamic decoders. The latches that capture domino outputs, and the clocking schemes that hide the precharge time, are developed in [[digital-ic/sequential-circuits-clocking]]. Coupling noise on floating nodes is quantified in [[digital-ic/interconnect]], and the power cost of precharging every cycle is compared with static logic in [[digital-ic/power-dissipation]].

::: summary
- A dynamic gate precharges its output high through a clocked pMOS and then evaluates through an nMOS network: $X = \overline{G}$ with no pull-up network, no contention and very low logical effort (unfooted NOR: $g = 1/3$ for any fan-in).
- A foot transistor prevents short-circuit current during precharge; it can be omitted when the inputs are guaranteed low in precharge.
- Inputs to a dynamic gate must rise monotonically during evaluation, so dynamic gates cannot be cascaded directly; domino logic adds a static (skewed) inverter after each dynamic stage and computes non-inverting functions.
- Charge sharing with internal nodes lowers the dynamic output to $V_{DD}C_X/(C_X + C_Y)$, or to $V_{DD} - (C_Y/C_X)(V_{DD} - V_{th,n})$ if the internal node is limited by the threshold.
- Leakage makes the dynamic node droop at $I_{leak}/C_X$, setting a minimum clock frequency; a weak keeper holds the node but fights evaluation.
- Dynamic gates have low noise margins and are sensitive to coupling and clock feedthrough; as of 2026 they are used mainly in memories, register files and CAMs rather than random logic.
:::

## Exercises

::: exercise Transistor count {level=1 check="8 + 2"}
How many transistors does a footed dynamic NOR8 gate have, not counting a keeper or output inverter?
::: solution
Eight input nMOS, one precharge pMOS and one foot nMOS: $10$ transistors, against $16$ for a static NOR8.
:::
:::

::: exercise Logical effort of a footed NAND3 {level=1 check="4/3"}
Find the logical effort of a footed dynamic NAND3 gate sized for unit-inverter drive.
::: solution
Three input transistors and the foot are in series; each must be $4$ units wide for total resistance $R$. Each input sees $4$ units against the inverter's $3$: $g = 4/3$, the same as a static NAND2.
:::
:::

::: exercise Charge sharing {level=1 check="1 - 0.3*0.7"}
A dynamic node of $10\,\mathrm{fF}$ precharged to $V_{DD} = 1\,\mathrm V$ shares charge with internal nodes totalling $3\,\mathrm{fF}$, initially at $0$, through transistors with $V_{th,n} = 0.3\,\mathrm V$. Find the final output voltage in volts.
::: solution
Equal sharing would give $10/13 = 0.769\,\mathrm V$, which exceeds $V_{DD} - V_{th,n} = 0.7\,\mathrm V$, so the internal nodes stop at $0.7\,\mathrm V$ and [[#eq-cs-b]] applies: $V_X = 1 - \tfrac{3}{10}\times0.7 = 0.79\,\mathrm V$. Using the equal-sharing formula here would underestimate the output by $21\,\mathrm{mV}$.
:::
:::

::: exercise Leakage time constant {level=2 check="2e-15*0.15/(20e-9)"}
A dynamic node of $2\,\mathrm{fF}$ leaks $20\,\mathrm{nA}$ at the worst-case corner. How long, in seconds, can it be left floating before it droops by $0.15\,\mathrm V$?
::: solution
By [[#eq-droop]], $t = C\Delta V/I = 2\times10^{-15}\times0.15/2\times10^{-8} = 15\,\mathrm{ns}$.
:::
:::

::: exercise Precharging the internal node {level=2}
For the dynamic NAND2 of the charge-sharing discussion, with $C_X = 3\,\mathrm{fF}$ and $C_Y = 1.5\,\mathrm{fF}$, $V_{DD} = 1\,\mathrm V$, $V_{th,n} = 0.3\,\mathrm V$: (a) find the worst-case output after charge sharing; (b) a small pMOS is added to precharge $Y$ to $V_{DD}$ during the precharge phase. What is the worst case now, and what does the extra transistor cost?
::: solution
(a) Equal sharing would give $3/4.5 = 0.667\,\mathrm V < 0.7\,\mathrm V$, so $V_X = 0.667\,\mathrm V$. (b) With $Y$ precharged, both nodes start at $V_{DD}$ and connecting them moves no charge: $V_X = V_{DD}$. The cost is one more transistor and its clock load, a little more capacitance on $Y$ (which the pull-down network must discharge when $G = 1$, slowing evaluation slightly) and extra clock power.
:::
:::

::: exercise Wide OR in static and domino {level=2}
Repeat [[#ex-wide-or]] for a load $H = 1$. Which design is fastest, and by how much?
::: solution
(a) Static: $F = 4$, $\hat D = 2\times2 + 6 = 10$. (b) Unfooted domino: $F = 0.278$, $\hat D = 2\sqrt{0.278} + 3.83 = 1.05 + 3.83 = 4.9$. (c) Footed domino: $F = 0.556$, $\hat D = 2\times0.745 + 6.5 = 8.0$. The unfooted domino is still twice as fast as static; note that with $F < 1$ the stage effort is below $1$, which means the path has more stages than it needs — at light loads the parasitic delays dominate, and the footed gate's large parasitic delay erodes most of its advantage.
:::
:::

::: exercise Monotonicity with an inverting static gate {level=2}
A domino OR gate's output drives a static inverter, whose output drives a domino AND gate on the same clock. Explain whether the AND gate evaluates correctly, and suggest two ways to implement the intended function $\overline{(A + B)}\cdot C$ in domino logic.
::: solution
The domino OR output is low in precharge and may rise during evaluation; the static inverter's output is therefore high in precharge and may *fall* during evaluation — a monotonically falling input, which violates [[#thm-monotone]]. The AND gate may begin to discharge while the inverter output is still high and give a wrong result. Remedies: (1) dual-rail domino — build a domino NOR (computing $\overline{A + B} = \overline{A}\,\overline{B}$ from complementary inputs $\overline{A}$, $\overline{B}$ supplied by the dual rail) and feed its rising output to the AND; (2) restructure so that the inversion is at the primary inputs: compute $\overline{A}\,\overline{B}\,C$ directly as a single domino AND3 of the complemented inputs, generated by static logic before evaluation begins.
:::
:::

::: exercise Keeper versus leakage {level=3}
A domino gate has a pull-down path equivalent to a single nMOS of width $0.1\,\mathrm{\mu m}$ ($75\,\mathrm{\mu A}$ saturation current in the reference process). Its dynamic node has $C_X = 4\,\mathrm{fF}$, and the output inverter switches at $0.6\,\mathrm V$. (a) Without a keeper, how long does the gate take to discharge the node from $1.0$ to $0.6\,\mathrm V$, assuming a constant current? (b) A keeper supplying $I_k$ is added. Express the new delay in terms of $I_k$ and find the keeper current that slows the gate by $15\,\%$. (c) The leakage of the dynamic node is $I_{leak}$, and the keeper must be at least $5I_{leak}$. Up to what leakage can the gate be held with a slowdown of at most $15\,\%$?
::: hint
While the keeper is on, the net discharge current is the pull-down current minus the keeper current.
:::
::: solution
(a) $t = C\Delta V/I = 4\times10^{-15}\times0.4/75\times10^{-6} = 21.3\,\mathrm{ps}$.

(b) With the keeper on throughout (it turns off only when the inverter switches, i.e. at the end of the interval), $t' = C\Delta V/(I_n - I_k)$, so $t'/t = I_n/(I_n - I_k)$. A $15\,\%$ slowdown requires $I_n/(I_n - I_k) = 1.15$, i.e. $I_k = I_n(1 - 1/1.15) = 0.130\,I_n = 9.8\,\mathrm{\mu A}$.

(c) $I_{leak} \le I_k/5 = 1.96\,\mathrm{\mu A}$. A wide gate with dozens of leaky inputs at high temperature can exceed this, in which case either the keeper must be stronger (and the gate slower), the inputs fewer, or the transistors given a higher threshold.
:::
:::

::: exercise Dual-rail domino XOR {level=3}
Design a dual-rail domino gate that computes both $A\oplus B$ and $\overline{A\oplus B}$ from dual-rail inputs $(A, \overline{A})$ and $(B, \overline{B})$. Give each pull-down network, count transistors (footed, with output inverters but no keepers), and explain why the outputs satisfy the monotonicity requirement even though XOR is not a unate function.
::: solution
$A\oplus B = A\overline{B} + \overline{A}B$: the pull-down network of the true-output gate is ($A$ series $\overline{B}$) in parallel with ($\overline{A}$ series $B$), discharging its dynamic node when the XOR is $1$; the inverter's output is then $A\oplus B$. The complementary gate implements $\overline{A\oplus B} = AB + \overline{A}\,\overline{B}$: ($A$ series $B$) parallel with ($\overline{A}$ series $\overline{B}$). Each gate has $4$ pull-down transistors, a precharge pMOS, a foot and a $2$-transistor inverter: $8$ transistors, $16$ for the pair. The internal nodes of the series stacks can be shared between the two gates in some layouts, saving a little. In dual-rail form every input rail is low in precharge and exactly one rail of each pair rises during evaluation; all four rails are therefore monotonically rising, and the gates see only rising inputs. The non-unateness of XOR is absorbed by having both polarities of each input available as separate monotone signals.
:::
:::
