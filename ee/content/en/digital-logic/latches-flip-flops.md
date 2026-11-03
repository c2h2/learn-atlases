The circuits of the previous chapters forget. Remove the inputs of an adder and its outputs collapse; it cannot count, cannot wait for the next keystroke, cannot remember which instruction comes next. A digital system needs **state**: bits that persist after the inputs that set them have gone. The essential trick is feedback. Connect the output of a logic circuit back to its own input and the circuit can hold itself in a condition indefinitely — it becomes a memory.

This chapter builds memory from the bottom up: from a pair of cross-coupled inverters, the simplest **bistable** circuit, through the SR and D **latches**, to the edge-triggered **flip-flop** that underpins every synchronous system. Along the way we meet the timing parameters — setup, hold and clock-to-output times — that decide how fast a circuit may be clocked and whether it works at all, and the unavoidable phenomenon of **metastability**, which haunts every interface with the asynchronous outside world.

## Bistability

Take two inverters and connect the output of each to the input of the other. If the first outputs $1$, the second outputs $0$, which keeps the first at $1$: the loop is self-consistent. Equally, the opposite assignment is self-consistent. The circuit has two **stable states** and holds whichever one it is put in for as long as power is applied. This is the storage cell inside every static RAM ([[digital-logic/memories-programmable-logic]]) and every flip-flop.

To see why the states are stable, let $v_1$ and $v_2$ be the two node voltages and $f$ the inverter's voltage transfer characteristic, so that in equilibrium $v_2 = f(v_1)$ and $v_1 = f(v_2)$. Plotting the first curve and the mirror image of the second (the inverse function) on the same axes gives the famous **butterfly diagram**; equilibria are where the curves cross.

::: widget plot
f: 1/(1 + exp(g*(x - 0.5))); 0.5 + ln(1/x - 1)/g
x: 0.001, 0.999
y: 0, 1
sliders: g=12:2:30:0.5
labels: v_2 = f(v_1); v_1 = f(v_2)
equal: true
caption: The butterfly diagram of two cross-coupled inverters (voltages normalised to $V_{DD} = 1$, an idealised inverter with steepness $g$). The curves cross three times: near $(0, 1)$ and $(1, 0)$ — the two stable states — and at $(0.5, 0.5)$, the metastable point. Reduce $g$ below $4$ and the outer crossings vanish: when the inverter's gain at the switching threshold, $g/4$, falls below $1$, the loop cannot store a bit.
:::

::: proposition Stability of the cross-coupled pair {#prop-bistable}
Let each inverter have a smooth transfer characteristic $f$ with small-signal gain $A = -f'(V_M)$ at the switching threshold $V_M = f(V_M)$, and suppose each node has a capacitance $C$ that is charged through an output resistance $R$. Then the equilibrium at $(V_M, V_M)$ is unstable when $A > 1$, and a small deviation grows as

$$
\Delta v(t) = \Delta v(0)\, e^{t/\tau}, \qquad \tau = \frac{RC}{A - 1} .
$$ {#eq-meta-growth}

The two outer equilibria, where $\abs{f'} < 1$, are stable.
:::

::: proof
Model each inverter output as a voltage source $f(\text{input})$ behind a resistance $R$ charging the node capacitance $C$:

$$
RC\,\dot v_1 = f(v_2) - v_1, \qquad RC\,\dot v_2 = f(v_1) - v_2 .
$$

Near $(V_M, V_M)$ write $v_k = V_M + x_k$ and linearise, $f(V_M + x) \approx V_M - A x$:

$$
RC\,\dot x_1 = -A x_2 - x_1, \qquad RC\,\dot x_2 = -A x_1 - x_2 .
$$

The difference $\Delta v = x_1 - x_2$ obeys $RC\,\dot{\Delta v} = (A - 1)\Delta v$, whose solution is [[#eq-meta-growth]]; it grows when $A > 1$. (The sum $x_1 + x_2$ decays with time constant $RC/(A + 1)$.) At an outer equilibrium the same linearisation applies with gain $\abs{f'} < 1$, and then both the sum and the difference decay: small disturbances die out.
:::

So a bistable circuit needs a loop gain above $1$, and it has a third, **metastable** equilibrium between the stable ones, like a ball balanced on the crest of a hill between two valleys. A circuit that finds itself near the crest will eventually fall into one valley, but the time it takes, $\tau\ln(\text{swing}/\Delta v(0))$, grows without bound as the initial offset $\Delta v(0)$ shrinks. We return to this at the end of the chapter.

## Latches

The cross-coupled inverters remember but cannot be told what to remember. Replacing the inverters by gates with an extra input gives control.

### The SR latch

::: definition SR latch {#def-sr}
An **SR latch** is two cross-coupled NOR gates with inputs $S$ (set) and $R$ (reset) and outputs $Q$ and $\overline{Q}$:

$$
Q = \overline{R + \overline{Q}}, \qquad \overline{Q} = \overline{S + Q} .
$$

Its behaviour is:

| $S$ | $R$ | next $Q$ | action |
|---|---|---|---|
| 0 | 0 | $Q$ | hold |
| 1 | 0 | 1 | set |
| 0 | 1 | 0 | reset |
| 1 | 1 | — | both outputs $0$; not allowed |

With the restriction $SR = 0$, the next state is given by the **characteristic equation** $Q^+ = S + \overline{R}\,Q$.
:::

The input $S = R = 1$ is excluded not because it is harmful in itself — it forces both $Q$ and $\overline{Q}$ to $0$, so they are no longer complements — but because of what happens when it is *removed*. If $S$ and $R$ fall to $0$ at the same moment, both NOR gates see two zeros and both try to rise; the latch may oscillate or settle into the metastable state, and the final state depends on tiny delay differences. A design must guarantee that $S$ and $R$ are never active together. The same latch made of NAND gates has active-low inputs, written $\overline{S}$ and $\overline{R}$.

::: example Tracing an SR latch {#ex-sr}
A NOR SR latch starts with $Q = 0$. The inputs $(S, R)$ take the sequence $(0,0)$, $(1,0)$, $(0,0)$, $(0,1)$, $(0,0)$. Trace $Q$ and $\overline{Q}$, assuming each change has time to settle.
::: solution
- $(0,0)$: hold; $Q = 0$, $\overline{Q} = \overline{0 + 0} = 1$.
- $(1,0)$: $\overline{Q} = \overline{1 + Q} = 0$, then $Q = \overline{0 + 0} = 1$. Set.
- $(0,0)$: $\overline{Q} = \overline{0 + 1} = 0$ and $Q = \overline{0 + 0} = 1$: the latch holds $Q = 1$ although $S$ has gone. This is memory.
- $(0,1)$: $Q = \overline{1 + \overline{Q}} = 0$, then $\overline{Q} = \overline{0 + 0} = 1$. Reset.
- $(0,0)$: hold $Q = 0$.

Note the order of events on set: $\overline{Q}$ falls first (one gate delay), then $Q$ rises (a second gate delay). The input pulse must last at least two gate delays or the latch may not capture it.
:::
:::

A common practical use is a **switch debouncer**: the two contacts of a changeover switch drive $S$ and $R$ of a latch. The contact bounces open and closed for milliseconds, but each bounce only repeats a set (or reset) that has already happened, so $Q$ makes a single clean transition.

### The D latch

The SR latch has two problems: the forbidden input, and no notion of *when* to store. The **D latch** solves both. It has a data input $D$ and a clock (or enable) input $C$.

::: definition D latch {#def-dlatch}
A **D latch** is **transparent** while $C = 1$: its output follows the input, $Q = D$. While $C = 0$ it is **opaque**: it holds the value $D$ had when $C$ fell. Its characteristic equation is

$$
Q^+ = C\,D + \overline{C}\,Q .
$$ {#eq-dlatch}
:::

One construction feeds an SR latch with $S = CD$ and $R = C\overline{D}$, which can never both be $1$. In CMOS, a D latch is usually a 2-to-1 multiplexer whose output loops back to its $C = 0$ input — exactly [[#eq-dlatch]], which *is* the mux equation of [[digital-logic/combinational-building-blocks#def-mux]].

That second form has a trap. Written as two-level logic, $CD + \overline{C}Q$ has a static-1 hazard when $C$ falls with $D = Q = 1$ ([[digital-logic/logic-minimisation#thm-hazardfree]]): for an instant neither term is $1$, the output may dip, and because the output feeds back, a dip can be *latched* as a wrong value. A gate-level latch must include the consensus term $DQ$; transistor-level latches avoid the issue by construction. Hazards that are harmless in combinational logic become bugs inside feedback loops.

::: quiz
A D latch has $C = 1$ from $t = 0$ to $t = 10\,\mathrm{ns}$ and $C = 0$ afterwards. $D$ is $0$ until $3\,\mathrm{ns}$, $1$ from $3$ to $7\,\mathrm{ns}$, and $0$ after $7\,\mathrm{ns}$. What is $Q$ at $t = 12\,\mathrm{ns}$?
- [ ] $1$, because $D$ was $1$ while the latch was enabled
- [x] $0$, the value of $D$ when $C$ fell
- [ ] undefined, because $D$ changed while $C = 1$
- [ ] $1$, the value of $D$ at the rising edge of $C$
::: solution
While $C = 1$ the latch is transparent and $Q$ follows $D$: $0$, then $1$, then $0$ again after $7\,\mathrm{ns}$. When $C$ falls at $10\,\mathrm{ns}$, $D = 0$, so the latch holds $0$. A latch is level-sensitive: the last value before the closing edge is the one stored. (An edge-triggered flip-flop on the rising edge of $C$ would instead have stored the value at $t = 0$, which is $0$ here as well; on a falling-edge flip-flop it would also be $0$.)
:::
:::

## Edge-triggered flip-flops

A transparent latch is awkward in a system where the output of one storage element feeds, through logic, the input of another — or of itself. While the clock is high, a change can race through the latch, through the logic, and back to the input, changing the stored value several times in one clock phase. What we want is a storage element that samples its input at a single *instant*.

::: definition D flip-flop {#def-dff}
A **positive-edge-triggered D flip-flop** copies its input $D$ to its output $Q$ at each rising edge of the clock $\mathit{CLK}$ and holds $Q$ constant at all other times. Its characteristic equation, with $Q^+$ the value after the next active edge, is $Q^+ = D$. A negative-edge-triggered flip-flop does the same at falling edges.
:::

The standard construction is the **master–slave** flip-flop: two D latches in series, the first (master) clocked by $\overline{\mathit{CLK}}$ and the second (slave) by $\mathit{CLK}$. While $\mathit{CLK} = 0$ the master is transparent and follows $D$, while the slave is opaque and holds the old output. When $\mathit{CLK}$ rises the master closes, capturing $D$ at that instant, and the slave opens, passing the captured value to $Q$. While $\mathit{CLK} = 1$, changes on $D$ are blocked by the closed master. At no time is there a transparent path from $D$ to $Q$. The flip-flop is therefore about twice the size of a latch — in a standard-cell library typically some twenty transistors.

### Variants

Practical flip-flops add control inputs.

- **Enable**: $Q^+ = E\,D + \overline{E}\,Q$, a multiplexer in front of $D$ that recirculates $Q$ when $E = 0$. This is the correct way to make a register "not load" on some cycles; gating the clock instead is a specialist technique with its own hazards ([[digital-logic/hardware-description]]).
- **Synchronous reset**: $Q^+ = \overline{\mathit{RST}}\,D$, a reset that takes effect at the next clock edge.
- **Asynchronous reset or set**: an input that forces $Q$ immediately, regardless of the clock, by acting directly on the latches. Used to put a system into a known state at power-up.

Two historical flip-flop types are still met in textbooks and older designs, defined by their characteristic equations:

$$
\text{JK:}\quad Q^+ = J\overline{Q} + \overline{K}Q, \qquad\qquad \text{T (toggle):}\quad Q^+ = T \oplus Q .
$$ {#eq-jkt}

A JK flip-flop behaves like an SR flip-flop ($J$ = set, $K$ = reset) except that $J = K = 1$ toggles the output instead of being forbidden; a T flip-flop toggles when $T = 1$ and holds when $T = 0$, which suits counters ([[digital-logic/registers-counters]]). Both are built from a D flip-flop with logic in front of $D$, which is how all modern libraries realise them.

::: example A T flip-flop from a D flip-flop {#ex-tff}
Build a T flip-flop and a JK flip-flop from a D flip-flop and gates, and give the excitation table of the JK flip-flop (the inputs needed for each transition $Q \to Q^+$).
::: solution
Since $Q^+ = D$ for the D flip-flop, set $D$ equal to the desired characteristic equation [[#eq-jkt]]: for a T flip-flop $D = T \oplus Q$ (one XOR gate with $Q$ fed back); for a JK flip-flop $D = J\overline{Q} + \overline{K}Q$ (an AND–OR with $\overline{Q}$ and $Q$ fed back).

Excitation table of the JK flip-flop, from $Q^+ = J\overline{Q} + \overline{K}Q$:

| $Q$ | $Q^+$ | $J$ | $K$ |
|---|---|---|---|
| 0 | 0 | 0 | × |
| 0 | 1 | 1 | × |
| 1 | 0 | × | 1 |
| 1 | 1 | × | 0 |

For $Q = 0$, $Q^+ = J$, so $K$ is irrelevant; for $Q = 1$, $Q^+ = \overline{K}$, so $J$ is irrelevant. The many don't-cares are why JK flip-flops once gave cheap next-state logic in counters built from discrete chips.
:::
:::

## Timing of flip-flops

An edge-triggered flip-flop samples "at the clock edge", but no physical circuit samples at a mathematical instant. The master latch needs its input to be stable for a short window around the edge, and the output appears only after a delay.

::: definition Flip-flop timing parameters {#def-fftiming}
For an edge-triggered flip-flop:

- the **setup time** $t_{setup}$ is how long before the clock edge $D$ must be stable;
- the **hold time** $t_{hold}$ is how long after the clock edge $D$ must remain stable;
- the **clock-to-Q propagation delay** $t_{pcq}$ is the maximum time from the clock edge until $Q$ has settled to its new value;
- the **clock-to-Q contamination delay** $t_{ccq}$ is the minimum time from the clock edge until $Q$ starts to change.

If $D$ changes inside the **aperture** from $t_{setup}$ before to $t_{hold}$ after the edge, the flip-flop's behaviour is not guaranteed: it may store either value, or go metastable.
:::

Typical values in a modern process are a few tens of picoseconds each; the hold time can be close to zero or even negative.

Now consider the basic structure of every synchronous circuit: a register $R_1$ whose output passes through combinational logic (propagation delay $t_{pd}$, contamination delay $t_{cd}$) to the input of a register $R_2$, both clocked by the same clock of period $T_c$.

::: theorem Setup and hold constraints {#thm-setuphold}
Let the clock edge reach $R_2$ later than $R_1$ by $\delta$ (positive or negative), and let $t_{skew} \ge \abs{\delta}$ bound this **clock skew**. The circuit works for every data pattern if and only if

$$
T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew} \qquad\text{(setup constraint)}
$$ {#eq-setup}

and

$$
t_{ccq} + t_{cd} \ge t_{hold} + t_{skew} \qquad\text{(hold constraint)}.
$$ {#eq-hold}
:::

::: proof
Measure time from a clock edge at $R_1$.

*Setup.* The data launched by $R_1$ at this edge is stable at $R_1$'s output by $t_{pcq}$ and at the end of the logic by $t_{pcq} + t_{pd}$. It is captured by $R_2$ at the *next* edge, which reaches $R_2$ at $T_c + \delta$, and must be stable $t_{setup}$ before that: $t_{pcq} + t_{pd} + t_{setup} \le T_c + \delta$. The worst case is $\delta = -t_{skew}$ (the capturing clock arrives early), which gives [[#eq-setup]].

*Hold.* At the same edge, $R_2$ captures the data launched one cycle earlier, at time $\delta$, and that data must stay stable until $\delta + t_{hold}$. The *new* data launched by $R_1$ at time $0$ can start to change $R_1$'s output at $t_{ccq}$ and reach $R_2$ at $t_{ccq} + t_{cd}$ at the earliest. We need $t_{ccq} + t_{cd} \ge \delta + t_{hold}$; the worst case is $\delta = +t_{skew}$ (the capturing clock arrives late), which gives [[#eq-hold]].

Both inequalities are necessary as well as sufficient, because a data pattern that exercises the critical path (or the short path) makes the corresponding arrival time actually occur.
:::

The two constraints have very different characters. The **setup constraint** involves the clock period: if it fails, slow the clock down (or shorten the logic) and the circuit works. The **hold constraint** does not involve $T_c$ at all: if it fails, *no clock frequency* fixes it, and the chip is broken. Hold violations are fixed by adding delay (buffers) to short paths, which design tools do automatically. Notice also that skew hurts both constraints.

::: example Maximum clock frequency and a hold check {#ex-timing}
Flip-flops have $t_{pcq} = 50\,\mathrm{ps}$, $t_{ccq} = 30\,\mathrm{ps}$, $t_{setup} = 40\,\mathrm{ps}$ and $t_{hold} = 50\,\mathrm{ps}$. Between two registers the logic has $t_{pd} = 600\,\mathrm{ps}$ on its slowest path and $t_{cd} = 10\,\mathrm{ps}$ on its fastest (one bit passes through a single fast gate). (a) Find the maximum clock frequency with no skew. (b) Is the hold constraint met? If not, fix it. (c) Repeat (a) and (b) with $50\,\mathrm{ps}$ of skew.
::: solution
(a) By [[#eq-setup]], $T_c \ge 50 + 600 + 40 = 690\,\mathrm{ps}$, so $f_{max} = 1/690\,\mathrm{ps} = 1.45\,\mathrm{GHz}$.

(b) By [[#eq-hold]], $t_{ccq} + t_{cd} = 30 + 10 = 40\,\mathrm{ps}$, which is less than $t_{hold} = 50\,\mathrm{ps}$: a hold violation, independent of the clock frequency. The short path needs at least $10\,\mathrm{ps}$ more contamination delay; inserting a buffer with $t_{cd} = 15\,\mathrm{ps}$ (and, say, $t_{pd} = 25\,\mathrm{ps}$) gives $30 + 25 = 55 \ge 50\,\mathrm{ps}$. The buffer is only on the short path, so the critical path and $f_{max}$ are unchanged.

(c) With $t_{skew} = 50\,\mathrm{ps}$, $T_c \ge 690 + 50 = 740\,\mathrm{ps}$, so $f_{max} = 1.35\,\mathrm{GHz}$. The hold constraint becomes $t_{ccq} + t_{cd} \ge 50 + 50 = 100\,\mathrm{ps}$: the short path now needs $t_{cd} \ge 70\,\mathrm{ps}$, so the buffering must be increased to about $60\,\mathrm{ps}$ of extra contamination delay.
:::
:::

::: warning Hold violations cannot be fixed by slowing the clock
A frequent misconception is that every timing problem goes away at a low enough clock frequency. Setup violations do; hold violations do not, because the race is between two events triggered by the *same* clock edge. Back-to-back flip-flops with no logic between them (as in a shift register) are the classic hold-risk case: there $t_{cd} = 0$, so the design relies on $t_{ccq} \ge t_{hold} + t_{skew}$, which library flip-flops are designed to satisfy only for small skew.
:::

::: quiz
A design fails its setup constraint by $20\,\mathrm{ps}$ at the target frequency. Which change does **not** help?
- [ ] reducing the clock frequency
- [ ] restructuring the critical path to remove a logic level
- [x] adding a buffer to the shortest path
- [ ] using flip-flops with a smaller $t_{pcq}$
::: solution
The setup constraint $T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew}$ is helped by a longer $T_c$, a smaller $t_{pd}$ or a smaller $t_{pcq}$. A buffer on the shortest path increases $t_{cd}$, which helps the hold constraint, and does nothing for setup (unless the short path is also critical, in which case it makes setup worse).
:::
:::

## Metastability and synchronisers

The setup and hold constraints can be guaranteed when the data comes from a register on the same clock. But a push button, a sensor or a signal from a different clock domain changes whenever it likes. Sooner or later it will change inside the aperture of the flip-flop that samples it. The master latch is then caught with its internal nodes near the metastable point of [[#prop-bistable]], and the flip-flop output may hover at an invalid level, or oscillate, for an unbounded time before resolving.

Metastability cannot be prevented — any bistable device that must make a decision in finite time can fail to decide (a result sometimes called Buridan's principle). What can be done is to make failure astronomically unlikely by *waiting*.

::: theorem Metastability failure rate {#thm-mtbf}
Suppose an asynchronous input with $f_d$ transitions per second is sampled by a flip-flop clocked at $f_c$, and the flip-flop's output is used a time $t_r$ (the **resolution time**) after the clock edge. Then the probability that a given transition leaves the flip-flop unresolved after $t_r$ is approximately $f_c T_0\, e^{-t_r/\tau}$, and the **mean time between failures** is

$$
\mathrm{MTBF} = \frac{e^{t_r/\tau}}{T_0\, f_c\, f_d},
$$ {#eq-mtbf}

where $\tau$ is the regeneration time constant of [[#eq-meta-growth]] and $T_0$ is a constant of the flip-flop with dimensions of time (an effective aperture width).
:::

::: proof
*Sketch.* By [[#eq-meta-growth]], an initial imbalance $\Delta v(0)$ resolves to a full logic swing $V_s$ after $\tau\ln(V_s/\Delta v(0))$, so the flip-flop is still unresolved at $t_r$ iff $\abs{\Delta v(0)} < V_s e^{-t_r/\tau}$. Near the metastable point the initial imbalance is roughly proportional to the time between the data transition and the clock edge, so this happens iff the transition falls in a window of width proportional to $e^{-t_r/\tau}$ around the edge; call it $T_0 e^{-t_r/\tau}$. A transition arriving at a random time with respect to a clock of period $1/f_c$ falls in this window with probability $T_0 e^{-t_r/\tau} f_c$. With $f_d$ transitions per second, failures occur at the rate $f_d f_c T_0 e^{-t_r/\tau}$, whose reciprocal is [[#eq-mtbf]]. A full treatment, including the measurement of $\tau$ and $T_0$, is in Wakerly's and Dally's texts listed in the course references.
:::

The exponential is everything. Each extra $\tau$ of waiting multiplies the MTBF by $e \approx 2.7$; each extra $23\tau$ multiplies it by $10^{10}$. The standard **synchroniser** is therefore two flip-flops in series on the receiving clock: the first may go metastable, but the second samples it a full clock period later, giving $t_r \approx T_c - t_{setup}$ with no logic in between.

::: widget plot
f: x/(tau*ln(10)) - 5
x: 0, 2
y: -5, 40
sliders: tau=0.02:0.01:0.1:0.005
hlines: 9.5
labels: \log_{10}(\mathrm{MTBF}/\mathrm{s})
caption: The logarithm of the MTBF in seconds against the resolution time $t_r$ in nanoseconds, for $T_0 f_c f_d = 10^5\,\mathrm{s^{-1}}$ ($T_0 = 20\,\mathrm{ps}$, $f_c = 500\,\mathrm{MHz}$, $f_d = 10\,\mathrm{MHz}$). The dashed line is $100$ years ($\approx 10^{9.5}\,\mathrm{s}$). A straight line on a log scale: every few hundred picoseconds of waiting buys many orders of magnitude. Increase $\tau$ (in ns) to see why an old, slow technology needs a longer synchroniser.
:::

::: example Designing a synchroniser {#ex-sync}
A $500\,\mathrm{MHz}$ system ($T_c = 2\,\mathrm{ns}$) samples an asynchronous signal that changes $10^7$ times per second. The flip-flops have $\tau = 20\,\mathrm{ps}$, $T_0 = 20\,\mathrm{ps}$ and $t_{setup} = 100\,\mathrm{ps}$. (a) With a single flip-flop whose output goes through logic with $t_{pd} = 1.6\,\mathrm{ns}$ before the next register, what is the MTBF? (b) What resolution time is needed for an MTBF of $100$ years? (c) What does a two-flip-flop synchroniser achieve?
::: solution
Here $T_0 f_c f_d = 20\times10^{-12} \times 5\times10^{8}\times 10^{7} = 10^5\,\mathrm{s^{-1}}$.

(a) The flip-flop output must be resolved early enough to pass the logic: $t_r = T_c - t_{pd} - t_{setup} = 2 - 1.6 - 0.1 = 0.3\,\mathrm{ns}$. Then $\mathrm{MTBF} = e^{300/20}/10^5 = e^{15}/10^5 = 3.27\times10^6/10^5 \approx 33\,\mathrm{s}$. The system would fail about twice a minute.

(b) $100$ years $\approx 3.16\times10^9\,\mathrm{s}$. We need $e^{t_r/\tau} \ge 3.16\times10^9\times10^5 = 3.16\times10^{14}$, i.e. $t_r \ge \tau\ln(3.16\times10^{14}) = 20\,\mathrm{ps}\times 33.4 = 668\,\mathrm{ps}$.

(c) With two flip-flops and no logic between them, $t_r = T_c - t_{setup} = 1.9\,\mathrm{ns}$ (strictly, less the first flip-flop's $t_{pcq}$, which changes little). Then $\mathrm{MTBF} = e^{95}/10^5 \approx 1.8\times10^{36}\,\mathrm{s}$, about $6\times10^{28}$ years — the failure has, for all practical purposes, been designed out. The cost is one extra cycle of latency on the synchronised signal.
:::
:::

::: warning Never synchronise a multi-bit value bit by bit
If a binary counter value is passed between clock domains through one synchroniser per bit, a change from $0111$ to $1000$ may be sampled with some bits old and some new, giving any of the sixteen values. Synchronise a single control bit and use it to qualify a stable bus, or pass Gray-coded values in which only one bit changes at a time ([[digital-logic/number-systems#def-gray]]); the asynchronous FIFO in [[digital-logic/hardware-description]] does the latter.
:::

::: application Flip-flops in a modern chip
A large processor or FPGA design contains millions of flip-flops, and as of 2026 a significant share of a chip's clock power is spent toggling their clock inputs. Libraries therefore offer many flavours: scan flip-flops with a multiplexer for manufacturing test, flip-flops with built-in enables, retention flip-flops that keep their state while the surrounding logic is powered off, and dedicated synchroniser cells with small $\tau$. Their setup, hold and clock-to-Q times, characterised over voltage and temperature, are the numbers that static timing analysis tools plug into [[#eq-setup]] and [[#eq-hold]].
:::

::: history
William Eccles and F. W. Jordan described the "trigger relay", a pair of cross-coupled vacuum-tube amplifiers with two stable states, in a British patent filed in 1918 and in *The Radio Review* in 1919; it was the electronic flip-flop of the first electronic counters and computers. The name "flip-flop" was in use by the 1940s. The master–slave principle, sampling through two alternately transparent stages, was used in the relay and tube machines of the 1940s and 1950s and was standard in integrated JK flip-flops by the 1960s. Metastability was recognised as a fundamental problem in the early 1970s: Thomas Chaney and Charles Molnar published oscilloscope measurements of anomalous flip-flop behaviour in 1973.
:::

## Where this leads

With flip-flops and combinational logic we can build any synchronous sequential circuit: the next chapter, [[digital-logic/finite-state-machines]], shows how to specify and design them, and [[digital-logic/registers-counters]] builds the most common ones. The setup and hold constraints become the core of static timing analysis in [[digital-logic/hardware-description]], where synchronisers and clock-domain crossings are also revisited. Transistor-level latch and flip-flop design, clock distribution and skew are covered in [[digital-ic/sequential-circuits-clocking]].

::: summary
- Feedback creates memory: two cross-coupled inverters with loop gain above $1$ have two stable states and one metastable state, from which they escape as $e^{t/\tau}$.
- The SR latch has the characteristic equation $Q^+ = S + \overline{R}Q$ with $SR = 0$ required; the D latch is transparent when $C = 1$ and holds when $C = 0$, $Q^+ = CD + \overline{C}Q$.
- An edge-triggered D flip-flop ($Q^+ = D$ at each active edge) is two latches in master–slave arrangement; JK and T flip-flops are D flip-flops with next-state logic.
- Flip-flops are characterised by $t_{setup}$, $t_{hold}$, $t_{pcq}$ and $t_{ccq}$.
- Setup: $T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew}$, fixed by slowing the clock or shortening logic. Hold: $t_{ccq} + t_{cd} \ge t_{hold} + t_{skew}$, independent of the clock and fixed by adding delay to short paths.
- Asynchronous inputs inevitably cause metastability; $\mathrm{MTBF} = e^{t_r/\tau}/(T_0f_cf_d)$ grows exponentially with resolution time, so a two-flip-flop synchroniser is usually enough.
- Never pass a multi-bit binary value between clock domains bit by bit.
:::

## Exercises

::: exercise SR latch inputs {level=1}
A NOR SR latch holds $Q = 1$. What are $Q$ and $\overline{Q}$ after the inputs $(S, R) = (1, 0)$, then $(0, 0)$, then $(1, 1)$? Why is the last input a problem?
::: solution
$(1, 0)$ sets the latch; since $Q$ was already $1$, nothing changes: $Q = 1$, $\overline{Q} = 0$. $(0,0)$ holds: still $Q = 1$, $\overline{Q} = 0$. $(1,1)$ forces both NOR outputs to $0$: $Q = \overline{Q} = 0$, so the outputs are no longer complements, and when both inputs return to $0$ together the final state is unpredictable (race, possible metastability).
:::
:::

::: exercise Maximum frequency {level=1 check="1/(80e-12+420e-12+30e-12)"}
A register-to-register path has $t_{pcq} = 80\,\mathrm{ps}$, logic $t_{pd} = 420\,\mathrm{ps}$ and $t_{setup} = 30\,\mathrm{ps}$, with no skew. What is the maximum clock frequency, in hertz?
::: solution
$T_c \ge 80 + 420 + 30 = 530\,\mathrm{ps}$, so $f_{max} = 1/(530\times10^{-12}\,\mathrm{s}) = 1.89\,\mathrm{GHz}$.
:::
:::

::: exercise Characteristic equations {level=1}
Using [[#eq-jkt]], find $Q^+$ for a JK flip-flop with $Q = 1$ and $(J, K) = (1, 1)$, and for a T flip-flop with $Q = 0$ and $T = 1$.
::: solution
JK: $Q^+ = J\overline{Q} + \overline{K}Q = 1\cdot 0 + 0\cdot 1 = 0$: it toggles from $1$ to $0$. T: $Q^+ = T\oplus Q = 1\oplus0 = 1$: it toggles from $0$ to $1$.
:::
:::

::: exercise Latch or flip-flop {level=2}
A signal $D$ is $1$ from $t = 2$ to $4\,\mathrm{ns}$ and $0$ otherwise. A clock is high from $3$ to $5\,\mathrm{ns}$ (and low before and after). Give the stored value at $t = 6\,\mathrm{ns}$ of (a) a D latch transparent while the clock is high, (b) a rising-edge D flip-flop, (c) a falling-edge D flip-flop.
::: solution
(a) The latch is transparent from $3$ to $5\,\mathrm{ns}$; $D$ is $1$ until $4$ and $0$ after, so $Q$ follows to $0$ and holds $0$ when the clock falls at $5\,\mathrm{ns}$. (b) At the rising edge ($3\,\mathrm{ns}$) $D = 1$, so the flip-flop stores $1$. (c) At the falling edge ($5\,\mathrm{ns}$) $D = 0$, so it stores $0$.
:::
:::

::: exercise A hold fix {level=2 check="40e-12"}
Flip-flops have $t_{ccq} = 25\,\mathrm{ps}$ and $t_{hold} = 45\,\mathrm{ps}$, and the clock skew is bounded by $20\,\mathrm{ps}$. What minimum contamination delay must every register-to-register path have? Give the answer in seconds.
::: solution
By [[#eq-hold]], $t_{cd} \ge t_{hold} + t_{skew} - t_{ccq} = 45 + 20 - 25 = 40\,\mathrm{ps} = 4.0\times10^{-11}\,\mathrm{s}$.
:::
:::

::: exercise Skew budget {level=2 check="60e-12"}
A design with $t_{pcq} = 60\,\mathrm{ps}$, $t_{setup} = 40\,\mathrm{ps}$ and a critical path of $t_{pd} = 840\,\mathrm{ps}$ must run at $1\,\mathrm{GHz}$. What is the largest clock skew the setup constraint tolerates? Give the answer in seconds.
::: solution
$T_c = 1000\,\mathrm{ps} \ge 60 + 840 + 40 + t_{skew}$, so $t_{skew} \le 60\,\mathrm{ps} = 6\times10^{-11}\,\mathrm{s}$.
:::
:::

::: exercise A D latch from NAND gates {level=2}
A D latch is built as an SR latch of cross-coupled NAND gates (active-low inputs $\overline{S}$, $\overline{R}$), with $\overline{S} = \overline{CD}$ and $\overline{R} = \overline{C\overline{D}}$. Show that the forbidden SR input can never occur, and that the latch is transparent when $C = 1$ and holds when $C = 0$.
::: solution
The forbidden NAND-latch input is $\overline{S} = \overline{R} = 0$, i.e. $CD = 1$ and $C\overline{D} = 1$ simultaneously, which needs $D = \overline{D}$: impossible. When $C = 0$, both $\overline{S}$ and $\overline{R}$ are $1$, the NAND latch's hold input, so $Q$ holds. When $C = 1$: if $D = 1$, $\overline{S} = 0$ and $\overline{R} = 1$, which sets $Q = 1$; if $D = 0$, $\overline{S} = 1$, $\overline{R} = 0$, which resets $Q = 0$. So $Q = D$ while $C = 1$: transparent.
:::
:::

::: exercise Synchroniser resolution time {level=3}
A synchroniser must achieve an MTBF of at least $1000$ years ($3.16\times10^{10}\,\mathrm{s}$) for an input changing $5\times10^{6}$ times per second, sampled at $f_c = 1\,\mathrm{GHz}$, with flip-flops having $\tau = 15\,\mathrm{ps}$ and $T_0 = 30\,\mathrm{ps}$, $t_{setup} = 30\,\mathrm{ps}$ and $t_{pcq} = 40\,\mathrm{ps}$. Is a two-flip-flop synchroniser enough? If the clock rose to $4\,\mathrm{GHz}$, how many flip-flops would be needed?
::: hint
Each additional flip-flop adds one clock period of resolution time (approximately $T_c - t_{pcq} - t_{setup}$).
:::
::: solution
$T_0 f_c f_d = 30\times10^{-12}\times10^{9}\times5\times10^{6} = 1.5\times10^{5}\,\mathrm{s^{-1}}$. Required: $e^{t_r/\tau} \ge 3.16\times10^{10}\times1.5\times10^5 = 4.74\times10^{15}$, so $t_r \ge 15\,\mathrm{ps}\times\ln(4.74\times10^{15}) = 15\times 36.1 = 542\,\mathrm{ps}$.

At $1\,\mathrm{GHz}$ a two-flip-flop synchroniser gives $t_r \approx 1000 - 40 - 30 = 930\,\mathrm{ps}$: enough, with margin.

At $4\,\mathrm{GHz}$, $T_c = 250\,\mathrm{ps}$, and $f_c$ is four times larger, so the required $t_r$ grows to $15\times\ln(4\times4.74\times10^{15}) = 15\times 37.5 = 562\,\mathrm{ps}$. Each synchroniser stage adds about $250 - 70 = 180\,\mathrm{ps}$. Two stages give $180\,\mathrm{ps}$ of resolution, three give $360$, four give $540$ — still short of $562\,\mathrm{ps}$ — and five give $720\,\mathrm{ps}$. So five flip-flops are needed (four resolution intervals of $180\,\mathrm{ps}$ each). Fast clocks make synchronisation expensive, which is one reason clock-domain crossings are often placed at a slower clock.
:::
:::

::: exercise Metastable time constant {level=3}
Two cross-coupled inverters each have a gain $A = 5$ at the switching threshold, an output resistance of $10\,\mathrm{k\Omega}$ and a node capacitance of $2\,\mathrm{fF}$. Find $\tau$ from [[#prop-bistable]], and the time for an imbalance of $1\,\mathrm{\mu V}$ to grow to $1\,\mathrm{V}$.
::: solution
$RC = 10^4 \times 2\times10^{-15} = 2\times10^{-11}\,\mathrm{s} = 20\,\mathrm{ps}$ and $\tau = RC/(A - 1) = 20/4 = 5\,\mathrm{ps}$. The growth from $10^{-6}\,\mathrm{V}$ to $1\,\mathrm{V}$ takes $\tau\ln(10^6) = 5\times13.8 = 69\,\mathrm{ps}$. (The linear model is only accurate near the metastable point; the final part of the swing, where the gain falls, takes somewhat longer.) An imbalance of $10^{-12}\,\mathrm{V}$ would take twice as long, $138\,\mathrm{ps}$: every factor of $10^6$ smaller in the initial offset adds the same $69\,\mathrm{ps}$.
:::
:::

::: exercise Two-phase latch timing {level=3}
Instead of flip-flops, a pipeline uses D latches, alternately transparent on $\mathit{CLK}$ high and $\mathit{CLK}$ low (non-overlapping), with combinational logic between consecutive latches. Explain qualitatively why a slow logic stage can "borrow" time from the next stage in this scheme, which is impossible with flip-flops.
::: solution
With flip-flops, data must arrive before a fixed edge, so each stage has exactly one clock period. With latches, a latch is transparent for a whole phase: if data arrives late but while the latch is still open, it simply passes through, and the next stage starts later, eating into its own time. As long as the total delay of consecutive stages fits within the total time available (and data arrives before each latch closes, less its setup time), the circuit works. This **time borrowing** lets latch-based designs absorb imbalances between stages, at the cost of more complicated timing analysis and of hold constraints between latches of opposite phases.
:::
:::
