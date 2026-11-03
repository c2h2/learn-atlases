A traffic-light controller, a USB protocol engine, the control unit of a processor, the debouncing logic behind a keypad, a vending machine: each of them watches its inputs, remembers a little about the past, and acts. The right abstraction for all of them is the **finite-state machine** (FSM). Its memory is a register holding one of finitely many **states**; at every clock edge, combinational logic computes the next state from the present state and the inputs, and other logic computes the outputs.

The FSM is the point where the two halves of the course meet: the flip-flops of [[digital-logic/latches-flip-flops]] hold the state, and the combinational design of [[digital-logic/logic-minimisation]] produces the logic around them. It is also the place where design method matters most. A state machine coded straight from a vague idea almost always has an unhandled case; one drawn as a state diagram first, checked against the specification, and then converted mechanically into logic usually works the first time. This chapter teaches that method: the two kinds of machine (Moore and Mealy), the complete design procedure from words to gates, the choice of state encoding, and the minimisation of the number of states.

The same mathematical object appears in computer science as the finite automaton, used to recognise languages; see [Finite automata](/learn/cs/lesson.php?c=theory-of-computation&l=finite-automata). The engineering emphasis here is on outputs, clocks and hardware cost.

## Synchronous sequential circuits

A **synchronous sequential circuit** consists of a **state register** of $n$ flip-flops, all clocked by the same clock, together with combinational logic. The register's contents $S$ are the **present state**. The **next-state logic** computes $S^+ = \delta(S, X)$ from the present state and the input $X$; at the next clock edge the register loads $S^+$. The **output logic** computes the output $Z$.

::: definition Finite-state machine {#def-fsm}
A **finite-state machine** is a tuple $(\mathcal{S}, \mathcal{X}, \mathcal{Z}, \delta, \lambda, s_0)$: a finite set of states $\mathcal{S}$, an input alphabet $\mathcal{X}$, an output alphabet $\mathcal{Z}$, a **next-state function** $\delta : \mathcal{S}\times\mathcal{X}\to\mathcal{S}$, an output function $\lambda$, and an initial (reset) state $s_0$. In a **Moore machine** the output depends only on the state, $\lambda : \mathcal{S}\to\mathcal{Z}$. In a **Mealy machine** it depends on the state and the present input, $\lambda : \mathcal{S}\times\mathcal{X}\to\mathcal{Z}$.
:::

In hardware, the alphabets are sets of bit patterns: with $k$ input wires, $\mathcal{X} = \{0, 1\}^k$. The state set is encoded in $n \ge \lceil\log_2\abs{\mathcal{S}}\rceil$ flip-flops (see [[digital-logic/number-systems#thm-range]]); how each abstract state is mapped to a bit pattern is the **state assignment**.

The difference between the two kinds of machine is visible in time. A Moore output changes only after a clock edge, and is stable for the whole cycle: it is a function of the flip-flop outputs alone. A Mealy output reacts to an input change *within* the cycle, through combinational logic, so it can respond one cycle earlier — but it also passes any input glitch straight through, and it creates a combinational path from input to output that adds to the timing of whatever circuit receives it.

### State diagrams and state tables

An FSM is described by a **state diagram**: a circle for each state, an arrow for each transition labelled with the input that causes it. In a Moore diagram the output is written inside the state circle; in a Mealy diagram it is written on the arrow after a slash, as `input/output`. The same information in tabular form is the **state table**, with one row per present state and one column per input value.

::: example A sequence detector, Moore and Mealy {#ex-101}
A circuit receives a serial bit stream $X$, one bit per clock cycle, and must output $Z = 1$ whenever the last three bits received were $1, 0, 1$. Overlapping occurrences count: the stream $10101$ contains two. Draw up Moore and Mealy state tables.
::: solution
*Moore.* A state must remember how much of the pattern $101$ has just been seen:

- $S_0$: no progress (the last bit was $0$ and not preceded by $1$, or nothing yet);
- $S_1$: the last bit was $1$;
- $S_2$: the last two bits were $1, 0$;
- $S_3$: the last three bits were $1, 0, 1$ — output $1$.

From $S_3$, an input $0$ gives the suffix $10$ (go to $S_2$, since the final $1$ of the pattern can start a new one), and an input $1$ gives suffix $11$, whose useful part is a single $1$ ($S_1$).

| present state | next, $X = 0$ | next, $X = 1$ | output $Z$ |
|---|---|---|---|
| $S_0$ | $S_0$ | $S_1$ | 0 |
| $S_1$ | $S_2$ | $S_1$ | 0 |
| $S_2$ | $S_0$ | $S_3$ | 0 |
| $S_3$ | $S_2$ | $S_1$ | 1 |

*Mealy.* The output can be attached to the transition that completes the pattern, so the "pattern complete" state is not needed:

| present state | $X = 0$ | $X = 1$ |
|---|---|---|
| $A$ (no progress) | $A/0$ | $B/0$ |
| $B$ (seen $1$) | $C/0$ | $B/0$ |
| $C$ (seen $10$) | $A/0$ | $B/1$ |

The Mealy machine has three states instead of four, and raises $Z$ in the same cycle as the final $1$ arrives; the Moore machine raises it one cycle later, after the clock edge that enters $S_3$.
:::
:::

The behaviour of a machine under random inputs can be explored by treating it as a Markov chain: if each input bit is $1$ with probability $\tfrac12$, independently, every transition of the Moore detector happens with probability $\tfrac12$.

::: widget markov
matrix: 0.5,0.5,0,0; 0,0.5,0.5,0; 0.5,0,0,0.5; 0,0.5,0.5,0
states: S0; S1; S2; S3
steps: 30
caption: The Moore detector for $101$ driven by fair random bits. Each arrow is a transition taken with probability $\tfrac12$. Run the walk and look at the stationary distribution: the machine spends $\tfrac18$ of its time in $S_3$, which is the probability that three random bits are $1, 0, 1$ — a useful sanity check on any detector.
:::

::: theorem Moore and Mealy machines are equivalent {#thm-mooremealy}
For every Moore machine there is a Mealy machine with the same states producing the same output sequence one clock cycle earlier, and for every Mealy machine there is a Moore machine with at most $\abs{\mathcal{S}}\cdot\abs{\mathcal{Z}}$ states producing the same output sequence one clock cycle later.
:::

::: proof
*Moore to Mealy.* Keep $\mathcal{S}$ and $\delta$, and put the output of the *destination* state on each transition: $\lambda'(s, x) = \lambda(\delta(s, x))$. The Moore machine outputs $\lambda(s_{t+1})$ during cycle $t+1$; the Mealy machine outputs the same value during cycle $t$.

*Mealy to Moore.* Let the new states be pairs $(s, z)$ meaning "in state $s$, and the output produced by the transition that led here was $z$". Define $\delta'((s, z), x) = (\delta(s, x), \lambda(s, x))$ and the Moore output $\lambda'((s, z)) = z$. Then the output during cycle $t+1$ is the Mealy output of the transition taken in cycle $t$. Only pairs that are reachable need to be kept, so there are at most $\abs{\mathcal{S}}\abs{\mathcal{Z}}$ states.
:::

Applied to [[#ex-101]], the Mealy-to-Moore construction splits $B$ into $(B, 0)$ and $(B, 1)$; the pairs reachable are $(A,0)$, $(B,0)$, $(C,0)$ and $(B,1)$, which are exactly $S_0$, $S_1$, $S_2$, $S_3$ of the Moore table.

## The design procedure

::: algorithm FSM design {#alg-fsm}
1. **Specify.** Identify the inputs, outputs and clock; decide Moore or Mealy; write down what must happen in every situation, including reset.
2. **State diagram.** Choose states that capture exactly what must be remembered; draw every transition for every input value (an FSM must be *complete*: every state needs an outgoing transition for every input).
3. **State table.** Tabulate next state and outputs.
4. **Minimise** the number of states if the diagram may contain redundant states (see below).
5. **Assign** a binary code to each state.
6. **Derive** the next-state and output equations from the encoded table, using unused codes as don't-cares, and minimise them.
7. **Implement and verify.** Draw the circuit (or write the HDL), simulate it on test sequences including reset and unusual inputs, and check timing.
:::

::: example Completing the Moore 101 detector {#ex-101-design}
Implement the Moore detector of [[#ex-101]] with D flip-flops, using the binary state assignment $S_0 = 00$, $S_1 = 01$, $S_2 = 10$, $S_3 = 11$ (bits $Q_1Q_0$).
::: solution
*Encoded table.* Writing the next state as $Q_1^+Q_0^+$:

| $Q_1Q_0$ | $X$ | $Q_1^+Q_0^+$ | $Z$ |
|---|---|---|---|
| 00 | 0 | 00 | 0 |
| 00 | 1 | 01 | 0 |
| 01 | 0 | 10 | 0 |
| 01 | 1 | 01 | 0 |
| 10 | 0 | 00 | 0 |
| 10 | 1 | 11 | 0 |
| 11 | 0 | 10 | 1 |
| 11 | 1 | 01 | 1 |

*Next-state equations.* With D flip-flops, $D_1 = Q_1^+$ and $D_0 = Q_0^+$. Reading the minterms (rows numbered by $Q_1Q_0X$): $Q_1^+ = \sum m(2, 5, 6)$ and $Q_0^+ = \sum m(1, 3, 5, 7)$. A Karnaugh map gives

$$
D_1 = Q_0\overline{X} + Q_1\overline{Q_0}X, \qquad D_0 = X, \qquad Z = Q_1Q_0 .
$$

$D_0 = X$ is easy to see: in every case $Q_0^+$ is $1$ exactly when the last bit was $1$ — in this assignment, bit $Q_0$ simply stores the previous input.

*Circuit.* Two D flip-flops; $D_0$ wired to $X$; $D_1$ from two AND gates and an OR (or three NANDs); $Z$ from one AND. A reset input forces $Q_1Q_0 = 00$.

*Check* on the input $1, 0, 1, 0, 1$ from $S_0$: states $S_1$ ($01$), $S_2$ ($10$), $S_3$ ($11$, $Z = 1$), $S_2$, $S_3$ ($Z = 1$). Two detections, as required for overlapping occurrences.
:::
:::

::: widget truthtable
formula: (Q0 & ~X) | (Q1 & ~Q0 & X)
compare: (~Q1 & Q0 & ~X) | (Q1 & ~Q0 & X) | (Q1 & Q0 & ~X)
caption: The minimised next-state equation $D_1 = Q_0\overline{X} + Q_1\overline{Q_0}X$ against the canonical sum of its three minterms, rows $2$, $5$ and $6$ of the encoded state table. The two agree on all eight combinations of present state and input.
:::

For the Mealy version, encode $A = 00$, $B = 01$, $C = 10$ and treat $11$ as unused. The same procedure, with the two rows of code $11$ as don't-cares, gives $D_1 = Q_0\overline{X}$, $D_0 = X$ and $Z = Q_1X$: slightly smaller, and with the combinational path from $X$ to $Z$ that characterises a Mealy machine.

### Analysis: from a circuit to its behaviour

The procedure also runs backwards. Given a sequential circuit, write the flip-flop input equations, tabulate the next state and outputs for every present state and input, assign names to the state codes, and draw the diagram. This is how you check a design you did not write, or the output of a synthesis tool.

::: example Analysing a circuit {#ex-analysis}
A circuit has one D flip-flop with $D = X \oplus Q$ and output $Z = Q$, starting from $Q = 0$ after reset. What does it compute?
::: solution
The state table has two states:

| $Q$ | $X = 0$ | $X = 1$ | $Z$ |
|---|---|---|---|
| 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

An input $0$ leaves the state alone and an input $1$ toggles it: this is a T flip-flop with $T = X$ ([[digital-logic/latches-flip-flops#eq-jkt]]). Starting from $0$, $Q$ is $1$ exactly when an odd number of $1$s have been received. The circuit is a **serial parity generator**: after $n$ bits, $Z$ is the XOR of all of them.
:::
:::

::: quiz
In a Mealy machine, the output $Z$ changes in the middle of a clock cycle. What is the most likely cause?
- [ ] the state register was clocked
- [x] an input changed, since Mealy outputs depend combinationally on the inputs
- [ ] a setup-time violation in the state register
- [ ] nothing can cause this; outputs of synchronous machines only change at clock edges
::: solution
A Mealy output is $\lambda(S, X)$, so it follows the inputs through combinational logic and can change whenever they do. Only Moore outputs (functions of the flip-flop outputs alone) are guaranteed to change only after clock edges. If a stable, glitch-free output is needed from a Mealy machine, register it — at the cost of one cycle of latency, which turns it into a Moore output.
:::
:::

## State assignment

The choice of codes does not change what the machine does, but it changes the cost and speed of its logic. With $S$ states in $n$ bits there are $2^n!/(2^n - S)!$ possible assignments — $24$ for four states in two bits, $6720$ for five states in three bits — although many are equivalent up to permuting or complementing the state bits. Common strategies:

- **Binary** (minimum width): states numbered $0, 1, 2, \dots$ in $\lceil\log_2 S\rceil$ flip-flops. Fewest flip-flops, often more complex logic.
- **Gray**: consecutive states along the main path of the diagram get codes differing in one bit; good for machines that mostly step through a sequence, since each transition changes one flip-flop.
- **One-hot**: one flip-flop per state, exactly one of which is $1$. The next-state equation of state $s$ is simply the OR, over all transitions into $s$, of (source flip-flop AND input condition), and each output is an OR of state bits.
- **Output-oriented**: choose codes so that the outputs are some of the state bits themselves, giving glitch-free registered outputs with no output logic.

Heuristics for small machines: give **adjacent codes** (differing in one bit) to states that have the same next state for some input, to states that are next states of the same state, and to states with the same outputs — this places their $1$s side by side on the Karnaugh maps of the next-state logic. Synthesis tools apply such rules automatically and often choose one-hot encoding for FPGAs, which have plentiful flip-flops but small logic blocks.

::: example One-hot encoding {#ex-onehot}
Write the one-hot next-state equations for the Moore 101 detector of [[#ex-101]], with flip-flops $S_0, S_1, S_2, S_3$.
::: solution
Read the transitions *into* each state from the state table:

- into $S_0$: from $S_0$ and $S_2$ on $X = 0$;
- into $S_1$: from $S_0$, $S_1$ and $S_3$ on $X = 1$;
- into $S_2$: from $S_1$ and $S_3$ on $X = 0$;
- into $S_3$: from $S_2$ on $X = 1$.

Hence

$$
S_0^+ = \overline{X}(S_0 + S_2), \quad S_1^+ = X(S_0 + S_1 + S_3), \quad S_2^+ = \overline{X}(S_1 + S_3), \quad S_3^+ = XS_2, \quad Z = S_3 .
$$

Four flip-flops instead of two, but every equation can be written down from the diagram without a Karnaugh map, and each depends on only a few signals. Reset must put the register in $1000$ (only $S_0$ set). Note that $S_1^+ = X$ whenever the machine is in a legal one-hot state, because exactly one of $S_0, \ldots, S_3$ is $1$ and $S_0 + S_1 + S_3 = \overline{S_2}$; so $S_1^+ = X\overline{S_2}$ is a valid simplification under that assumption.
:::
:::

::: warning Unused states must go somewhere
With binary encoding of $5$ states in $3$ flip-flops, three codes are unused; with one-hot encoding of $4$ states in $4$ flip-flops, $12$ of the $16$ codes are illegal. Treating unused codes as don't-cares minimises logic, but a glitch, a radiation-induced bit flip or a bad power-up could put the machine into one, and the don't-care choices decide what happens next — possibly an endless loop among illegal states. For safety-relevant machines, check where every unused code leads, or add logic that forces illegal codes back to the reset state.
:::

::: quiz
A machine has $12$ states. Which statement about its encodings is correct?
- [ ] Binary encoding needs $3$ flip-flops and one-hot needs $12$.
- [x] Binary encoding needs $4$ flip-flops, leaving $4$ unused codes; one-hot needs $12$ flip-flops.
- [ ] Gray encoding needs fewer flip-flops than binary encoding.
- [ ] One-hot encoding always gives a slower circuit, because it has more flip-flops.
::: solution
$\lceil\log_2 12\rceil = 4$ and $2^4 - 12 = 4$ codes are unused. Gray encoding uses the same number of bits as binary; it only changes which codes are given to which states. One-hot uses more flip-flops but its next-state logic is usually shallower, so it is often *faster*, which is why FPGA tools favour it.
:::
:::

## State minimisation

A state diagram drawn from a specification often has more states than necessary — two states that, whatever input sequence follows, produce the same outputs. Such states can be merged.

::: definition Equivalent states {#def-equiv}
Two states $s$ and $t$ of a machine are **equivalent**, $s \equiv t$, if for every finite input sequence the machine produces the same output sequence starting from $s$ as starting from $t$. They are **$k$-equivalent**, $s \equiv_k t$, if this holds for every input sequence of length at most $k$.
:::

Equivalence is an equivalence relation, and the states can be grouped into its classes. The machine whose states are these classes, with transitions inherited from any member, behaves identically and has no two equivalent states: it is the **minimal** machine.

::: theorem State minimisation by partition refinement {#thm-minimise}
Let $P_1$ be the partition of the states by their outputs (for a Mealy machine, by the output for every input value). Given $P_k$, form $P_{k+1}$ by splitting each block so that two states stay together only if, for every input $x$, their next states lie in the same block of $P_k$. Then $P_k$ is exactly the partition into $k$-equivalence classes; the sequence stops changing after at most $\abs{\mathcal{S}} - 1$ steps; and the final partition is the partition into equivalence classes.
:::

::: proof
*$P_k$ is $k$-equivalence*, by induction. For $k = 1$, states are $1$-equivalent iff they give the same output for every single input, which is the definition of $P_1$. Suppose $P_k$ is $k$-equivalence. States $s, t$ are $(k+1)$-equivalent iff they are $1$-equivalent and, for each input $x$, the remaining $k$ outputs from $\delta(s, x)$ and $\delta(t, x)$ agree on every sequence, i.e. $\delta(s,x) \equiv_k \delta(t, x)$. (Since $(k+1)$-equivalence implies $k$-equivalence, we may refine $P_k$ rather than $P_1$.) That is exactly the rule defining $P_{k+1}$.

*Termination.* Each $P_{k+1}$ refines $P_k$. If $P_{k+1} = P_k$, the rule produces the same partition forever after. Otherwise $P_{k+1}$ has at least one more block. A partition of $\abs{\mathcal{S}}$ states has at most $\abs{\mathcal{S}}$ blocks and $P_1$ has at least one, so at most $\abs{\mathcal{S}} - 1$ strict refinements are possible.

*Limit.* If $P_k = P_{k+1}$ then $P_k = P_m$ for all $m \ge k$, so $k$-equivalent states are $m$-equivalent for every $m$, i.e. equivalent.
:::

::: example Minimising a naive detector {#ex-minimise}
A designer implements the $101$ detector as a Moore machine whose state is simply the last three input bits, $b_2b_1b_0$ — eight states, from $000$ to $111$. On input $x$ the next state is $b_1b_0x$, and the output is $1$ only in state $101$. Minimise the machine.
::: solution
*$P_1$* (by output): $\{000, 001, 010, 011, 100, 110, 111\}$ and $\{101\}$.

*$P_2$.* For each state in the first block, find the blocks of its two successors. On $x = 1$ the states $010$ and $110$ go to $101$ (the second block); all others go to the first block for both inputs. So the first block splits into $\{000, 001, 011, 100, 111\}$ and $\{010, 110\}$.

*$P_3$.* Now check successors against $P_2$. On $x = 0$, the states $001$, $011$, $111$ go to $010$ or $110$ (block $\{010, 110\}$), while $000$ and $100$ go to $000$ (first block). So $\{000, 001, 011, 100, 111\}$ splits into $\{000, 100\}$ and $\{001, 011, 111\}$. The block $\{010, 110\}$: on $0$ both go to $100$, on $1$ both to $101$: it stays.

*$P_4$.* $\{000, 100\}$: successors $000$ and $001$, same blocks for both. $\{001, 011, 111\}$: successors on $0$ are $010$, $110$, $110$ (same block), on $1$ are $011$, $111$, $111$ (same block). No change, so $P_3$ is final.

The four classes are $\{000, 100\}$ ("no progress" — it is irrelevant whether a $1$ came three bits ago), $\{001, 011, 111\}$ ("last bit $1$"), $\{010, 110\}$ ("last two bits $10$") and $\{101\}$: exactly $S_0$, $S_1$, $S_2$, $S_3$ of [[#ex-101]]. Eight states shrank to four, saving a flip-flop and simplifying the logic.
:::
:::

For machines with unspecified next states or outputs (**incompletely specified** machines), equivalence is replaced by *compatibility*, which is not transitive, and minimisation becomes a covering problem much like the one in Quine–McCluskey; Mealy's and later papers treat it, and the textbooks of Katz and Kohavi cover it in detail.

::: example A traffic-light controller {#ex-traffic}
A main road and a side road meet at a junction. A sensor $C$ is $1$ while a car waits on the side road. The controller is clocked every $5\,\mathrm{s}$. Specification: main road green until a car is detected; then main yellow for one tick; then side green for as long as cars keep arriving on the side road (at least one tick); then side yellow for one tick; then back to main green. Design a Moore controller with a Gray-code state assignment.
::: solution
*States:* $MG$ (main green, side red), $MY$ (main yellow, side red), $SG$ (side green, main red), $SY$ (side yellow, main red).

*Transitions:* $MG \to MY$ if $C = 1$, else stay; $MY \to SG$; $SG \to SY$ if $C = 0$, else stay; $SY \to MG$.

*Assignment.* The states form a cycle, so a Gray assignment gives each transition a one-bit change: $MG = 00$, $MY = 01$, $SG = 11$, $SY = 10$.

*Encoded table* (rows $Q_1Q_0C$):

| $Q_1Q_0$ | $C = 0$ | $C = 1$ |
|---|---|---|
| $00$ ($MG$) | $00$ | $01$ |
| $01$ ($MY$) | $11$ | $11$ |
| $11$ ($SG$) | $10$ | $11$ |
| $10$ ($SY$) | $00$ | $00$ |

*Equations.* $Q_1^+$ is $1$ in rows $01x$ and $11x$, i.e. whenever $Q_0 = 1$: $D_1 = Q_0$. $Q_0^+ = \sum m(1, 2, 3, 7)$, which minimises to

$$
D_0 = \overline{Q_1}C + \overline{Q_1}Q_0 + Q_0C .
$$

*Outputs* (Moore): main green $= \overline{Q_1}\,\overline{Q_0}$, main yellow $= \overline{Q_1}Q_0$, main red $= Q_1$; side green $= Q_1Q_0$, side yellow $= Q_1\overline{Q_0}$, side red $= \overline{Q_1}$. Because the outputs are functions of the state only, the lamps change only at clock ticks and never glitch between two colours — and since main red $= Q_1$ and side red $= \overline{Q_1}$, at least one road always sees red, the most important safety property.
:::
:::

::: application State machines everywhere
The control logic of almost every digital chip is a collection of FSMs: bus and memory controllers, serial-link protocol engines (I²C, SPI, USB, PCI Express link training), cache controllers, power-management sequencers. As of 2026, synthesis tools recognise state machines in HDL code, re-encode them (often one-hot on FPGAs, binary or Gray on ASICs) and report unreachable states. Formal verification tools prove properties such as "the two roads are never green together" over all reachable states, which for machines with many interacting registers is far beyond what simulation can cover.
:::

::: history
George Mealy's "A Method for Synthesizing Sequential Circuits" appeared in the *Bell System Technical Journal* in 1955, and Edward Moore's "Gedanken-experiments on Sequential Machines" in the 1956 volume *Automata Studies*; Moore's paper introduced the partition method for identifying distinguishable states. David Huffman's 1954 work on the synthesis of sequential switching circuits, including state minimisation, preceded both. In computer science the same structures arose from Warren McCulloch and Walter Pitts's 1943 model of neurons and Stephen Kleene's 1956 theory of regular events; the minimisation of automata by partition refinement was later made efficient by John Hopcroft's $O(n\log n)$ algorithm (1971).
:::

## Where this leads

Counters and shift registers ([[digital-logic/registers-counters]]) are FSMs with especially regular structure, and a processor's control unit is an FSM steering a datapath — the register-transfer design method of that chapter. [[digital-logic/hardware-description]] shows how to write FSMs in Verilog so that synthesis produces exactly the intended machine. The Markov-chain view used for the detector above is developed for probabilistic systems in [[random-signals]], and controllers in embedded systems are often FSMs written in software ([[embedded-systems/embedded-system-design]]).

::: summary
- A synchronous FSM is a state register plus next-state logic $S^+ = \delta(S, X)$ and output logic; Moore outputs depend on the state only, Mealy outputs on state and input.
- Mealy machines may need fewer states and respond a cycle earlier; Moore outputs are glitch-free and change only at clock edges. Each kind can be converted into the other ([[#thm-mooremealy]]).
- Design: specify, draw a complete state diagram, tabulate, minimise, assign codes, derive and minimise the equations (unused codes as don't-cares), implement and verify.
- Binary encoding minimises flip-flops; Gray suits sequential paths; one-hot gives simple, fast logic; output encoding gives registered outputs.
- Unused state codes need a defined, safe behaviour.
- Equivalent states are found by partition refinement: split by outputs, then by successor blocks, until nothing changes ([[#thm-minimise]]).
:::

## Exercises

::: exercise Counting flip-flops {level=1 check="4"}
A machine has $10$ states. How many flip-flops does a binary encoding need? (A one-hot encoding needs $10$.)
::: solution
$\lceil\log_2 10\rceil = 4$, since $2^3 = 8 < 10 \le 16 = 2^4$. Six of the sixteen codes are unused.
:::
:::

::: exercise Moore or Mealy {level=1}
For each of these output equations, say whether the machine is Moore or Mealy: (a) $Z = Q_1\overline{Q_0}$; (b) $Z = Q_0 \oplus X$; (c) $Z = Q_2$.
::: solution
(a) Moore: a function of state bits only. (b) Mealy: depends on the input $X$. (c) Moore; moreover the output is a state bit itself, so it needs no output logic and is glitch-free.
:::
:::

::: exercise Analysing equations {level=1}
A machine has flip-flops $Q_1Q_0$ with $D_1 = Q_0$, $D_0 = \overline{Q_1}$, no inputs, and starts at $00$. List the states it visits.
::: solution
The next state is $(D_1, D_0) = (Q_0, \overline{Q_1})$. From $00$ it is $01$; from $01$ it is $11$; from $11$ it is $10$; from $10$ it is $00$. So the sequence is $00, 01, 11, 10, 00, \dots$: a 2-bit Gray-code counter (a **Johnson counter** of two bits, see [[digital-logic/registers-counters]]).
:::
:::

::: exercise A Mealy detector for 11 {level=2}
Design a Mealy machine that outputs $Z = 1$ in every cycle in which the present input and the previous input are both $1$. Give the state table and the equations with a D flip-flop.
::: solution
Two states suffice: $A$ (previous input $0$, or reset) and $B$ (previous input $1$). Table: $A$: $X = 0 \to A/0$, $X = 1 \to B/0$; $B$: $X = 0 \to A/0$, $X = 1 \to B/1$. Encoding $A = 0$, $B = 1$: the next state is always the input, $D = X$, and $Z = QX$. The flip-flop simply delays the input by one cycle, and an AND gate compares the delayed and present bits.
:::
:::

::: exercise Mealy to Moore {level=2}
Convert the Mealy $11$ detector of the previous exercise into a Moore machine using the construction in [[#thm-mooremealy]], and compare the output timing.
::: solution
The reachable pairs are $(A, 0)$, $(B, 0)$ and $(B, 1)$ (state $A$ is only entered with output $0$). Transitions: $(A,0)$ on $0 \to (A,0)$, on $1 \to (B,0)$; $(B,0)$ on $0 \to (A,0)$, on $1 \to (B,1)$; $(B,1)$ on $0 \to (A,0)$, on $1 \to (B,1)$. Moore outputs $0, 0, 1$. Three states instead of two, and $Z$ now rises in the cycle *after* the second $1$ has arrived (after the clock edge that enters $(B,1)$), one cycle later than the Mealy output.
:::
:::

::: exercise State minimisation {level=2}
Minimise the Mealy machine with the state table below (entries are next state / output).

| state | $X = 0$ | $X = 1$ |
|---|---|---|
| $A$ | $B/0$ | $C/0$ |
| $B$ | $A/0$ | $D/1$ |
| $C$ | $E/0$ | $C/0$ |
| $D$ | $A/0$ | $D/1$ |
| $E$ | $A/0$ | $C/0$ |
::: hint
$P_1$ groups states with the same output row: $(0, 0)$ or $(0, 1)$.
:::
::: solution
$P_1 = \{A, C, E\}, \{B, D\}$. For $P_2$, check successors: $A \to (B, C)$ lies in blocks (2nd, 1st); $C \to (E, C)$ in (1st, 1st); $E \to (A, C)$ in (1st, 1st). So $A$ splits off: $P_2 = \{A\}, \{C, E\}, \{B, D\}$. $B$ and $D$ both go to $(A, D)$: together. For $P_3$: $C \to (E, C)$ is in blocks ($\{C,E\}$, $\{C,E\}$), while $E \to (A, C)$ is in ($\{A\}$, $\{C,E\}$): they split. $P_3 = \{A\}, \{B, D\}, \{C\}, \{E\}$. For $P_4$, $B$ and $D$ still both go to $(A, D)$, so $P_4 = P_3$. The minimal machine has four states, with $D$ merged into $B$:

| state | $X = 0$ | $X = 1$ |
|---|---|---|
| $A$ | $B/0$ | $C/0$ |
| $B$ | $A/0$ | $B/1$ |
| $C$ | $E/0$ | $C/0$ |
| $E$ | $A/0$ | $C/0$ |
:::
:::

::: exercise One-hot traffic lights {level=2}
Write the one-hot next-state equations for the traffic-light controller of [[#ex-traffic]].
::: solution
With flip-flops $MG, MY, SG, SY$: into $MG$ from $MG$ with $\overline{C}$ and from $SY$ unconditionally; into $MY$ from $MG$ with $C$; into $SG$ from $MY$ and from $SG$ with $C$; into $SY$ from $SG$ with $\overline{C}$. So

$$
MG^+ = MG\,\overline{C} + SY, \quad MY^+ = MG\,C, \quad SG^+ = MY + SG\,C, \quad SY^+ = SG\,\overline{C} .
$$

The lamp outputs are ORs of state bits: main red $= SG + SY$, side red $= MG + MY$.
:::
:::

::: exercise A serial adder {level=3}
Two unsigned numbers arrive serially, least significant bit first, on inputs $A$ and $B$, one bit pair per clock cycle. Design a Mealy machine that outputs the sum bits serially on $S$. How many states are needed, and what are the equations? What changes if the numbers arrive most significant bit first?
::: hint
What must be remembered from one bit position to the next?
:::
::: solution
Only the carry must be remembered, so two states: $Q = $ carry into the present bit position, reset to $0$ before each addition. From the full-adder equations ([[digital-logic/combinational-building-blocks#prop-fa]]):

$$
S = A \oplus B \oplus Q, \qquad D = Q^+ = AB + AQ + BQ .
$$

The output depends on the present inputs, so it is a Mealy machine. One full adder and one flip-flop add numbers of any length, at one bit per cycle — the classic area–time trade-off against the parallel adders of the previous chapters.

Most significant bit first, no finite-state machine can produce the sum bits on the fly: the value of the present sum bit depends on whether a carry will come from lower bits that have not arrived yet, which may require remembering an unbounded amount of input (the run of $1$s whose carry is still undecided). The machine can only output the result with a delay, or must buffer the whole word.
:::
:::

::: exercise A serial two's complementer {level=3}
A number arrives serially, least significant bit first. Design a Mealy machine whose output is the two's complement negation of the input, also least significant bit first. Verify it on the 8-bit input $0110\,1000$.
::: hint
Negation is "invert and add one". Starting from the least significant bit, how far does the "+1" carry propagate?
:::
::: solution
Adding $1$ to the inverted number propagates a carry through the low-order positions where the original number had $0$s (inverted to $1$s) and stops at the first $1$ of the original. So: copy bits unchanged up to and including the first $1$, then invert every later bit. Two states: $Q = 0$ ("no $1$ seen yet") and $Q = 1$ ("first $1$ seen"). Equations: $Z = X \oplus Q$, $D = Q + X$.

Check on $0110\,1000$ (LSB first the bits are $0, 0, 0, 1, 0, 1, 1, 0$): outputs $0, 0, 0, 1$ (copied, $Q$ becomes $1$ after the first $1$), then inverted $1, 0, 0, 1$. Reassembled MSB first: $1001\,1000$. And indeed $0110\,1000 = 104$, while $1001\,1000 = 152 = 256 - 104$, the 8-bit pattern of $-104$. ✓
:::
:::

::: exercise A safe state machine {level=3}
The binary-encoded Moore 101 detector of [[#ex-101-design]] uses all four codes. Suppose instead the five-state machine "$S_0, \dots, S_4$" of some other design is encoded in three bits with codes $000$ to $100$ and its next-state logic was minimised with codes $101$, $110$, $111$ as don't-cares. Explain how you would determine whether the machine can lock up in illegal states, and give two ways to make it safe.
::: solution
Take the final, minimised next-state equations and evaluate them for each illegal code and each input value. This yields the actual successor of each illegal state (the don't-cares have been resolved to specific values by the minimisation). Draw these transitions: if every illegal code leads, possibly after several steps, to a legal state for every input sequence, the machine recovers by itself (perhaps after producing wrong outputs for a few cycles). If some illegal codes lead only to each other for some input sequence, the machine can lock up.

Two remedies: (1) do not use the unused codes as don't-cares; instead specify their next state as the reset state $S_0$ and re-minimise (slightly larger logic); or (2) add a detector for illegal codes (here $Q_2(Q_1 + Q_0)$) that forces a synchronous reset. Synthesis tools offer a "safe" FSM option that does essentially the second.
:::
:::
