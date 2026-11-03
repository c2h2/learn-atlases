A finite-state machine with a hundred states is designed state by state. A 32-bit counter has four billion states and nobody draws its diagram; it is built instead from a highly regular structure, one flip-flop and a little identical logic per bit. **Registers** (groups of flip-flops that load together), **shift registers** and **counters** are the regular sequential circuits, and they are as fundamental to sequential design as multiplexers and adders are to combinational design.

They also lead to the most important design style for anything larger than a small controller: **register-transfer level** (RTL) design, in which a system is a **datapath** of registers, adders, multiplexers and the like, steered by a small FSM **controller**. Processors, DSP engines, network interfaces and cryptographic accelerators are all designed this way. This chapter builds the regular circuits, analyses their timing, and then designs a small datapath with its controller.

## Registers

An **$n$-bit register** is $n$ D flip-flops sharing a clock, storing an $n$-bit word. Most registers also have a **load enable** $E$: on a clock edge the register loads its input when $E = 1$ and keeps its contents when $E = 0$. As in [[digital-logic/latches-flip-flops]], the enable is realised by a 2-to-1 multiplexer in front of each flip-flop, $D_i = E\,X_i + \overline{E}\,Q_i$, not by gating the clock.

A **register file** is an array of registers with addressed read and write ports: a decoder on the write address selects which register's enable to raise, and multiplexers on the read addresses select which register drives each output ([[digital-logic/combinational-building-blocks]]). A processor's 32 general-purpose registers are a register file with two read ports and one write port.

## Shift registers

::: definition Shift register {#def-shift}
A **shift register** is a chain of flip-flops in which, at each clock edge, every flip-flop loads the output of its neighbour: for a right shift, $Q_{i}^+ = Q_{i+1}$ for $i < n-1$, and the end flip-flop $Q_{n-1}$ loads a **serial input** $S_{in}$. After $n$ clock edges, $n$ serial bits have been stored in parallel; conversely, a word loaded in parallel leaves at $Q_0$ one bit per cycle.
:::

The four classical arrangements are serial-in serial-out (a delay line of $n$ cycles), **serial-in parallel-out** (SIPO, a deserialiser), **parallel-in serial-out** (PISO, a serialiser) and parallel-in parallel-out. A **universal shift register** offers all of them, choosing each flip-flop's input with a 4-to-1 multiplexer controlled by a 2-bit mode $M_1M_0$: hold ($D_i = Q_i$), shift right ($D_i = Q_{i+1}$), shift left ($D_i = Q_{i-1}$) or parallel load ($D_i = X_i$).

Serial links are shift registers at each end. An SPI peripheral (see [[embedded-systems/serial-communication]]) contains a PISO register that shifts data out on one clock edge and a SIPO register that shifts data in on the other; a multi-gigabit serial transceiver is, at its core, a very fast shift register with a clock recovered from the data. Shifting a binary number one place left or right also multiplies or divides it by $2$, as in the multiplier below.

::: warning Shift registers are a hold-time hazard
Between two adjacent flip-flops of a shift register there is no logic at all, so $t_{cd} = 0$ and the hold constraint $t_{ccq} \ge t_{hold} + t_{skew}$ ([[digital-logic/latches-flip-flops#thm-setuphold]]) has no margin to spare. If the clock reaches the second flip-flop late, the new value from the first can race through and both flip-flops load the same bit, losing data. Clock-tree tools take care over such chains, and scan chains in test mode — very long shift registers through every flip-flop of a chip — are the classic place where hold buffers are inserted.
:::

## Counters

A **counter** is a register whose next state is a fixed function of its present state, cycling through a sequence of values; usually it also has an enable and a reset. The **modulus** is the length of the cycle.

### Ripple counters

The simplest binary counter uses toggle flip-flops, each clocked by the output of the previous one. The least significant flip-flop toggles on every clock edge; each other flip-flop toggles when its predecessor falls from $1$ to $0$ — which is exactly when a carry passes into that bit position. Each stage divides the frequency by two, so an $n$-stage **ripple counter** counts modulo $2^n$ with only $n$ flip-flops and no other logic.

The price is timing. Flip-flop $k$ cannot change until flip-flop $k-1$ has changed, so the changes ripple: after the clock edge, bit $k$ is correct only after $(k+1)\,t_{pcq}$. During the ripple the counter passes through wrong intermediate values: going from $0111$ to $1000$, it shows $0110$, $0100$, $0000$ and only then $1000$. A decoder looking for the value $0000$ would produce a short false pulse.

::: widget plot
f: sum(2^k*mod(floor((x - (k + 1)*d)/2^k), 2), k, 0, 3); mod(floor(x - d), 16)
x: 1, 17
y: -1, 16
sliders: d=0.1:0:0.25:0.01
labels: \text{ripple counter}; \text{synchronous counter}
caption: The value shown by a 4-bit counter against time in clock periods, when each flip-flop has clock-to-Q delay $d$ (in clock periods). The synchronous counter's bits all change together, $d$ after each edge. The ripple counter's bit $k$ changes $(k+1)d$ after the edge, so at $t = 8$ the value passes through $6$, $4$ and $0$ before reaching $8$. Increase $d$ and watch the false values widen; set $d = 0$ and the two curves coincide.
:::

::: example Ripple-counter timing {#ex-ripple}
An 8-bit ripple counter is built from flip-flops with $t_{pcq} = 2\,\mathrm{ns}$ (a discrete logic family). How long after a clock edge is its output guaranteed to be stable, and what is the maximum clock frequency if a synchronous circuit must sample the full count every cycle, with $t_{setup} = 3\,\mathrm{ns}$?
::: solution
The worst case is a transition such as $0111\,1111 \to 1000\,0000$, in which all eight bits change in sequence. The most significant bit settles after $8 \times 2 = 16\,\mathrm{ns}$. For the count to be sampled correctly at the next edge, $T_c \ge 16 + 3 = 19\,\mathrm{ns}$, i.e. $f \le 52.6\,\mathrm{MHz}$. The counter itself would happily count much faster — each flip-flop only needs to toggle at its own rate — but its *output* is not usable as a number at that rate. This is why ripple counters are used only as frequency dividers, where only the final output matters.
:::
:::

::: widget plot
f: mod(floor(x), 2); 2 + mod(floor(x/2), 2); 4 + mod(floor(x/4), 2); 6 + mod(floor(x/8), 2)
x: 0, 16
y: -0.5, 7.5
labels: Q_0; Q_1 \text{ (offset 2)}; Q_2 \text{ (offset 4)}; Q_3 \text{ (offset 6)}
caption: Timing diagram of an ideal 4-bit binary counter over sixteen clock periods. Each bit is a square wave at half the frequency of the bit below it, so bit $k$ divides the clock frequency by $2^{k+1}$. Read the four traces vertically at any time to get the count in binary; note that bit $k$ changes exactly when all lower bits fall from $1$ to $0$.
:::

::: quiz
A 4-bit synchronous binary counter is clocked at $16\,\mathrm{MHz}$. What is the frequency of the square wave on its most significant bit $Q_3$?
- [ ] $2\,\mathrm{MHz}$
- [x] $1\,\mathrm{MHz}$
- [ ] $4\,\mathrm{MHz}$
- [ ] $0.5\,\mathrm{MHz}$
::: solution
Bit $k$ completes one period every $2^{k+1}$ clock cycles, so $Q_3$ has period $16$ cycles and frequency $16\,\mathrm{MHz}/16 = 1\,\mathrm{MHz}$. ($Q_0$ toggles every cycle and runs at $8\,\mathrm{MHz}$.)
:::
:::

### Synchronous counters

In a **synchronous counter** every flip-flop is clocked by the same clock, and logic decides which ones change. Counting up by one in binary flips bit $i$ exactly when all lower bits are $1$ (the carry into position $i$).

::: proposition Synchronous binary counter {#prop-synccount}
An $n$-bit binary up-counter built from T flip-flops (or D flip-flops with $D_i = T_i \oplus Q_i$) has the toggle conditions

$$
T_0 = E, \qquad T_i = E\,Q_0Q_1\cdots Q_{i-1} = T_{i-1}Q_{i-1} \quad (1 \le i \le n-1),
$$ {#eq-toggle}

where $E$ is the count enable. Equivalently, the counter is a register loading $Q + E$ from an incrementer. The **terminal count** output $TC = E\,Q_0Q_1\cdots Q_{n-1}$ is $1$ in the cycle before the counter wraps from $2^n - 1$ to $0$.
:::

::: proof
Adding $1$ to $Q = q_{n-1}\dots q_0$ is the ripple addition of [[digital-logic/combinational-building-blocks#eq-carry]] with $b = 0$ and $c_0 = 1$: then $g_i = 0$ and $p_i = q_i$, so the carries are $c_0 = 1$, $c_{i} = q_{i-1}c_{i-1} = q_0\cdots q_{i-1}$, and the sum bits are $s_i = q_i \oplus c_i$. Bit $i$ therefore changes iff $c_i = 1$, which is the toggle condition [[#eq-toggle]] (with $E$ gating the whole increment). The counter wraps exactly when all bits are $1$ and it is enabled, which is $TC$.
:::

The chain $T_i = T_{i-1}Q_{i-1}$ is a ripple of AND gates — but, unlike the ripple counter, it is combinational logic between the flip-flops, so all bits still change at the same instant, $t_{pcq}$ after the edge. Its delay only limits the clock period through the setup constraint. For long counters the AND chain is replaced by a lookahead tree, exactly as in adders, or the counter is split into blocks whose terminal counts enable the next block. The $TC$ output also makes counters **cascadable**: the $TC$ of a low 4-bit counter enables a high 4-bit counter to make an 8-bit one.

### Modulo-N counters and frequency division

A counter with modulus $N$ that is not a power of two counts $0, 1, \dots, N-1$ and returns to $0$. Two methods:

- detect the final value $N - 1$ and use it to apply a **synchronous** reset (or load of $0$) at the next edge;
- design the counter as an FSM with $N$ states and minimise its logic using the unused codes as don't-cares.

Avoid the tempting third method, detecting the value $N$ and applying an *asynchronous* reset: the counter then briefly enters state $N$, the reset pulse is a glitch whose width depends on gate delays, and some flip-flops may fail to reset.

::: example A modulo-6 counter {#ex-mod6}
Design a synchronous counter that counts $0, 1, 2, 3, 4, 5, 0, \dots$ with three D flip-flops $Q_2Q_1Q_0$, using codes $6$ and $7$ as don't-cares. Where do the unused states go?
::: solution
The next state of $q$ is $(q + 1) \bmod 6$. Tabulating the bits of the next state:

| $Q_2Q_1Q_0$ | 000 | 001 | 010 | 011 | 100 | 101 | 110 | 111 |
|---|---|---|---|---|---|---|---|---|
| next | 001 | 010 | 011 | 100 | 101 | 000 | × | × |

From Karnaugh maps with $6$ and $7$ as don't-cares:

$$
D_0 = \overline{Q_0}, \qquad D_1 = Q_1\overline{Q_0} + \overline{Q_2}\,\overline{Q_1}Q_0, \qquad D_2 = Q_1Q_0 + Q_2\overline{Q_0} .
$$

*Unused states.* Evaluate the equations at the illegal codes. At $110$: $D_2 = 0 + 1 = 1$, $D_1 = 1 + 0 = 1$, $D_0 = 1$, so $110 \to 111$. At $111$: $D_2 = 1 + 0 = 1$, $D_1 = 0 + 0 = 0$, $D_0 = 0$, so $111 \to 100$. Either illegal state returns to the main cycle within two clock edges; the counter is self-starting. (A modulo-6 counter followed by a divide-by-2 stage forms a divide-by-12, as used to derive hours from a clock.)
:::
:::

::: example A clock divider {#ex-divider}
An FPGA board has a $50\,\mathrm{MHz}$ oscillator, and an LED must blink at $1\,\mathrm{Hz}$ with a 50 % duty cycle. Design the divider and state its size.
::: solution
A $1\,\mathrm{Hz}$ square wave toggles every $0.5\,\mathrm{s}$, i.e. every $25\,000\,000$ clock cycles. Use a counter of modulus $N = 25\,000\,000$ whose terminal count toggles a flip-flop driving the LED. The counter needs $\lceil\log_2 25\,000\,000\rceil = 25$ bits ($2^{24} = 16\,777\,216 < 25\times 10^6 \le 2^{25} = 33\,554\,432$), plus the toggle flip-flop: $26$ flip-flops in all. (The top bit of a 26-bit counter of modulus $5\times10^7$ would also have a period of one second, but it would not be a 50 % square wave, because the modulus is not a power of two.)

Important: the LED flip-flop should be clocked by the $50\,\mathrm{MHz}$ clock and *enabled* by the terminal count, not clocked by the counter's output. Using a counter bit as a clock creates a new clock domain with its own skew ([[digital-logic/hardware-description]]).
:::
:::

### Ring and Johnson counters

A shift register whose output is fed back to its input circulates its contents. Loaded with a single $1$, an $n$-bit **ring counter** cycles through $n$ one-hot states — a ready-made one-hot state sequence with no decoding logic. If the *inverted* output is fed back instead, the result is a **Johnson counter** (twisted-ring counter). Starting from all zeros, a 4-bit Johnson counter goes

$$
0000 \to 1000 \to 1100 \to 1110 \to 1111 \to 0111 \to 0011 \to 0001 \to 0000 ,
$$

eight states with $4$ flip-flops. In general an $n$-bit Johnson counter has modulus $2n$; every transition changes exactly one bit (it is a Gray-like code), and each state can be decoded by a single two-input AND gate. Both counters leave most codes unused ($2^n - n$ and $2^n - 2n$), and a stray state can circulate forever, so practical designs add logic that corrects illegal patterns.

### Linear-feedback shift registers

If the feedback into a shift register is the XOR of several of its bits, the register runs through a long, pseudo-random-looking sequence.

::: definition Linear-feedback shift register {#def-lfsr}
An $n$-bit **linear-feedback shift register** (LFSR) shifts its contents by one position per clock and feeds into the vacated position the XOR of a fixed set of **tap** bits. Each configuration corresponds to a **feedback polynomial** over the integers modulo $2$. An LFSR whose sequence visits all $2^n - 1$ non-zero states before repeating is **maximal-length**; it is maximal-length exactly when its feedback polynomial is primitive.
:::

The all-zero state maps to itself (XOR of zeros is zero), so a maximal-length sequence is as long as it can possibly be. Primitive polynomials exist for every $n$ and are tabulated; for $n = 4$, $x^4 + x^3 + 1$ is one.

::: example A 4-bit LFSR {#ex-lfsr}
A 4-bit register $Q_3Q_2Q_1Q_0$ shifts left each cycle ($Q_3 \leftarrow Q_2$, $Q_2 \leftarrow Q_1$, $Q_1 \leftarrow Q_0$) and loads $Q_0 \leftarrow Q_3 \oplus Q_2$ (feedback polynomial $x^4 + x^3 + 1$). List its states starting from $0001$, and find the period.
::: solution
Computing the feedback bit $Q_3\oplus Q_2$ each time:

$$
\begin{aligned}
&0001 \to 0010 \to 0100 \to 1001 \to 0011 \to 0110 \to 1101 \to 1010 \\
&\to 0101 \to 1011 \to 0111 \to 1111 \to 1110 \to 1100 \to 1000 \to 0001 .
\end{aligned}
$$

All fifteen non-zero states appear before $0001$ recurs: the period is $15 = 2^4 - 1$, so this LFSR is maximal-length. One XOR gate and four flip-flops make a counter of modulus $15$ — much cheaper than a binary counter's incrementer, if the order of the states does not matter.
:::
:::

LFSRs generate pseudo-random bit sequences (PRBS) for testing serial links, scramble data so that long runs of identical bits are avoided, compute cyclic redundancy checks (CRCs — the division of a message polynomial by a generator polynomial, done one bit per cycle; see [[information-theory/cyclic-codes]]), and generate test patterns for built-in self-test.

::: quiz
How many distinct states does a 6-bit Johnson counter cycle through, and how many does a maximal-length 6-bit LFSR cycle through?
- [ ] $6$ and $64$
- [x] $12$ and $63$
- [ ] $12$ and $64$
- [ ] $64$ and $63$
::: solution
A Johnson counter of $n$ bits has $2n = 12$ states. A maximal-length LFSR visits every non-zero state, $2^6 - 1 = 63$; the all-zero state is a fixed point of the feedback, so it is excluded.
:::
:::

## Register-transfer level design

Larger sequential systems are designed by separating **what is computed** from **when it is computed**.

::: definition Datapath and controller {#def-rtl}
In **register-transfer level** design a system is split into a **datapath** — registers, together with the combinational blocks (adders, multiplexers, comparators, shifters) that connect them — and a **controller**, an FSM that in each clock cycle chooses which **register transfers** happen by driving the datapath's control signals (multiplexer selects, register enables, ALU function codes). The datapath returns **status signals** (comparison results, flags, counter terminal counts) to the controller. A register transfer is written $R \leftarrow f(R_1, R_2, \dots)$: at the next clock edge, register $R$ loads the value of the function.
:::

The design method is:

1. Write the algorithm as a sequence of register transfers, grouped into clock cycles; transfers in the same cycle happen simultaneously.
2. Allocate registers and functional units, and add multiplexers wherever a register or unit input has more than one source.
3. Identify the control signals and status signals.
4. Design the controller as an FSM ([[digital-logic/finite-state-machines]]) whose outputs are the control signals for each step.

::: example A shift-and-add multiplier {#ex-mult}
Design a sequential multiplier for two 4-bit unsigned numbers $A$ and $B$ using one 4-bit adder, and trace it for $A = 1011$ ($11$) and $B = 1101$ ($13$).
::: solution
*Algorithm.* Binary long multiplication: for each bit $b_i$ of the multiplier, from least significant upwards, add $A\cdot b_i$ shifted by $i$ places into the product. Instead of shifting $A$ left, shift the partial product right, so that the adder always works on the same four bit positions.

*Datapath.* An 8-bit product register $P = (P_H, P_L)$ with a carry flip-flop $C$; a 4-bit register for $A$; a 4-bit adder computing $P_H + A$; a 2-bit counter $K$ for the four iterations. Initially $P_H = 0000$ and $P_L = B$, so the current multiplier bit is always $P_0$, the LSB of $P$. Each iteration takes two register transfers:

- if $P_0 = 1$: $(C, P_H) \leftarrow P_H + A$ (otherwise $C \leftarrow 0$);
- then shift $(C, P_H, P_L)$ right by one: $P \leftarrow (C, P_7, \dots, P_1)$.

*Controller.* States $\mathit{IDLE}$ (wait for $\mathit{start}$, load $A$, $P_H \leftarrow 0$, $P_L \leftarrow B$, $K \leftarrow 0$), $\mathit{ADD}$ (conditional add, controlled by status $P_0$), $\mathit{SHIFT}$ (shift, $K \leftarrow K + 1$; if $K$ was $3$, go to $\mathit{DONE}$, else to $\mathit{ADD}$), $\mathit{DONE}$ (assert $\mathit{ready}$). The status signals are $P_0$ and the counter's terminal count.

*Trace* ($A = 1011$):

| step | $C$ | $P_H$ | $P_L$ | note |
|---|---|---|---|---|
| initial | – | 0000 | 1101 | $P_0 = 1$ |
| add 0 | 0 | 1011 | 1101 | $0 + 11 = 11$ |
| shift 0 | | 0101 | 1110 | $P_0 = 0$ |
| add 1 | 0 | 0101 | 1110 | no add |
| shift 1 | | 0010 | 1111 | $P_0 = 1$ |
| add 2 | 0 | 1101 | 1111 | $2 + 11 = 13$ |
| shift 2 | | 0110 | 1111 | $P_0 = 1$ |
| add 3 | 1 | 0001 | 1111 | $6 + 11 = 17 = 1\,0001$ |
| shift 3 | | 1000 | 1111 | done |

The product is $1000\,1111_2 = 143 = 11 \times 13$. ✓ The multiplication takes $8$ cycles (plus load), with one adder; an array multiplier would take one (long) cycle with sixteen adders' worth of logic ([[computer-architecture/computer-arithmetic]]). Merging the add and shift into one transfer per cycle, $P \leftarrow (P_H + A\cdot P_0, P_L) \gg 1$, halves the cycle count at the cost of a longer critical path.
:::
:::

::: remark Algorithmic state machines
Controllers for RTL designs are often drawn as **ASM charts**: flowchart-like diagrams in which each state box lists the register transfers performed in that state, decision diamonds test status signals, and conditional output ovals show Mealy-type actions. An ASM chart is a state diagram annotated with the datapath operations, and it translates directly into HDL code.
:::

::: application Counters and registers in the real world
A microcontroller's timer peripheral is a 16- or 32-bit synchronous counter with a prescaler (a programmable modulo-$N$ divider), compare registers that raise an interrupt when the count matches, and capture registers that store the count when an input pin changes ([[embedded-systems/timers-interrupts]]). Ethernet and PCI Express links scramble data with LFSRs and protect each frame with a 32-bit CRC computed by an LFSR-like circuit processing many bits per clock. Every flip-flop of a modern chip also belongs to a scan chain, a long shift register used during manufacturing test to load and unload test patterns.
:::

::: history
The first electronic counters were scale-of-two circuits built from Eccles–Jordan flip-flops; C. E. Wynn-Williams at the Cavendish Laboratory built thyratron-based binary counters for counting particles in 1931–32, making him one of the pioneers of digital electronics. Decade ring counters of ten flip-flops each formed the accumulators of ENIAC (1945). Shift-register sequences and their connection to polynomials over the integers modulo 2 were developed in the 1950s; Solomon Golomb's book *Shift Register Sequences* (1967) became the standard reference. The datapath-plus-controller view goes back to the 1950s design of computer control units; Christopher Clare's book *Designing Logic Systems Using State Machines* (1973) introduced the ASM chart, developed at Hewlett-Packard.
:::

## Where this leads

Registers and counters are the raw material of processor datapaths ([[computer-architecture/single-cycle-processor]] and [[computer-architecture/pipelining]], where pipeline registers separate stages), and of the timers and serial interfaces of [[embedded-systems/timers-interrupts]]. Large arrays of storage — memories — need denser cells than flip-flops; they are the subject of [[digital-logic/memories-programmable-logic]]. The RTL style of this chapter is exactly the style in which hardware is described in Verilog, in [[digital-logic/hardware-description]].

::: summary
- A register is $n$ flip-flops with a common clock; a load enable is a multiplexer in front of each flip-flop, never a gated clock.
- Shift registers move data one position per cycle and convert between serial and parallel; with no logic between flip-flops they are hold-time critical.
- Ripple counters are tiny but their bits settle in sequence, showing false intermediate values; synchronous counters change all bits together, with toggle conditions $T_i = Q_0\cdots Q_{i-1}$ (the carries of an incrementer).
- Modulo-$N$ counters use a synchronous reset or FSM design with don't-cares; check where unused states go; clock dividers should produce enables, not new clocks.
- Ring counters give $n$ one-hot states, Johnson counters $2n$ states with single-bit changes; a maximal-length LFSR visits all $2^n - 1$ non-zero states using only XOR feedback.
- RTL design separates a datapath of registers and functional units from an FSM controller that issues register transfers and reads status signals.
:::

## Exercises

::: exercise Loading a serial register {level=1 check="8"}
An 8-bit serial-in parallel-out shift register starts cleared. How many clock edges are needed before an 8-bit serial word is available in parallel?
::: solution
One bit enters per clock edge, so $8$ edges place all eight bits in the register.
:::
:::

::: exercise Johnson counter states {level=1 check="10"}
How many states does a 5-bit Johnson counter cycle through?
::: solution
$2n = 10$. Starting from $00000$: $10000, 11000, 11100, 11110, 11111, 01111, 00111, 00011, 00001$, then back to $00000$.
:::
:::

::: exercise Ripple settling time {level=1 check="24e-9"}
A 12-bit ripple counter is built from flip-flops with $t_{pcq} = 2\,\mathrm{ns}$. What is the worst-case time after a clock edge before its output is stable? Give the answer in seconds.
::: solution
In the worst case ($0111\,1111\,1111 \to 1000\,0000\,0000$) all twelve stages change in sequence: $12 \times 2\,\mathrm{ns} = 24\,\mathrm{ns} = 2.4\times10^{-8}\,\mathrm{s}$.
:::
:::

::: exercise Toggle conditions {level=2}
For a 4-bit synchronous binary up-counter with enable $E$, write the toggle conditions $T_0$ to $T_3$ and the terminal count. Which bits toggle on the clock edge after the count $1011$ (with $E = 1$)?
::: solution
By [[#eq-toggle]], $T_0 = E$, $T_1 = EQ_0$, $T_2 = EQ_0Q_1$, $T_3 = EQ_0Q_1Q_2$, and $TC = EQ_0Q_1Q_2Q_3$. At $1011$ ($Q_3Q_2Q_1Q_0$), $Q_0 = Q_1 = 1$ and $Q_2 = 0$, so $T_0 = T_1 = T_2 = 1$ and $T_3 = 0$: bits $0$, $1$ and $2$ toggle, giving $1100$ ($11 + 1 = 12$). ✓
:::
:::

::: exercise Dividing a clock {level=2 check="16"}
A $50\,\mathrm{MHz}$ clock must be divided to produce a $1\,\mathrm{kHz}$ enable pulse (one cycle high every millisecond). How many bits does the modulo-$N$ counter need?
::: solution
$N = 50\times10^6/10^3 = 50\,000$, and $\lceil\log_2 50\,000\rceil = 16$, since $2^{15} = 32\,768 < 50\,000 \le 65\,536 = 2^{16}$. The counter counts $0$ to $49\,999$ and its terminal count is the enable.
:::
:::

::: exercise A 3-bit LFSR {level=2}
A 3-bit LFSR shifts left and loads $Q_0 \leftarrow Q_2 \oplus Q_1$ (polynomial $x^3 + x^2 + 1$). List the states from $001$ and determine whether it is maximal-length.
::: solution
$001 \to 010 \to 101 \to 011 \to 111 \to 110 \to 100 \to 001$. Seven states, $2^3 - 1$: maximal-length.
:::
:::

::: exercise A universal shift register cell {level=2}
Write the input equation $D_i$ of bit $i$ of a universal shift register with mode inputs $M_1M_0$ ($00$ hold, $01$ shift right, $10$ shift left, $11$ load $X_i$), as a sum of products.
::: solution
It is a 4-to-1 multiplexer selected by $M_1M_0$ ([[digital-logic/combinational-building-blocks#eq-mux]]):

$$
D_i = \overline{M_1}\,\overline{M_0}\,Q_i + \overline{M_1}M_0\,Q_{i+1} + M_1\overline{M_0}\,Q_{i-1} + M_1M_0\,X_i ,
$$

with $Q_{n}$ replaced by the right-shift serial input and $Q_{-1}$ by the left-shift serial input at the two ends.
:::
:::

::: exercise A GCD datapath {level=3}
Euclid's algorithm by subtraction computes $\gcd(a, b)$ for positive integers: while $a \ne b$, replace the larger by the larger minus the smaller; the common final value is the GCD. Design a datapath and controller for 8-bit operands, and trace it for $a = 48$, $b = 18$. How many iterations does it take?
::: hint
You need two registers, one subtractor or two, a comparator, and multiplexers to load either the inputs or a difference.
:::
::: solution
*Datapath.* Registers $R_a$ and $R_b$. Each has a 2-to-1 multiplexer on its input choosing between the external operand (for loading) and a difference. Two subtractors compute $R_a - R_b$ and $R_b - R_a$ (or one subtractor with multiplexed inputs). Status signals: $\mathit{eq} = (R_a = R_b)$ and $\mathit{gt} = (R_a > R_b)$, from the subtractor flags ([[digital-logic/combinational-building-blocks]]).

*Controller.* $\mathit{IDLE}$: on $\mathit{start}$, load both registers. $\mathit{RUN}$: if $\mathit{eq}$, go to $\mathit{DONE}$; else if $\mathit{gt}$, $R_a \leftarrow R_a - R_b$; else $R_b \leftarrow R_b - R_a$; stay in $\mathit{RUN}$. $\mathit{DONE}$: assert $\mathit{ready}$; the result is in $R_a$.

*Trace:* $(48, 18) \to (30, 18) \to (12, 18) \to (12, 6) \to (6, 6)$. Four subtraction iterations; $\gcd(48, 18) = 6$. Note the number of iterations depends on the data — for $(255, 1)$ it would be $254$ — so the controller's $\mathit{ready}$ handshake is essential.
:::
:::

::: exercise The longest LFSR {level=3}
Prove that an $n$-bit LFSR cannot have a period longer than $2^n - 1$, and that the all-zero state is a fixed point. Why must the state register be initialised to a non-zero value at reset?
::: solution
The next state is a function of the present state only, so the sequence of states from any starting point is eventually periodic, and each state has exactly one successor. If the all-zero state is reached, the feedback is the XOR of zeros, $0$, and shifting zeros in produces the all-zero state again: it is a fixed point. A cycle containing any non-zero state therefore cannot contain the zero state (otherwise it would be stuck there), so it lies within the $2^n - 1$ non-zero states and has length at most $2^n - 1$. If the register powered up or were reset to zero it would stay there forever, producing a constant output; the reset must load a non-zero seed.
:::
:::

::: exercise A faster counter {level=3}
A 32-bit synchronous counter's toggle chain $T_i = T_{i-1}Q_{i-1}$ is built from 2-input AND gates of delay $25\,\mathrm{ps}$; the flip-flops have $t_{pcq} = 40\,\mathrm{ps}$ and $t_{setup} = 30\,\mathrm{ps}$, and the XOR before each flip-flop's $D$ input takes $30\,\mathrm{ps}$. Find the maximum clock frequency, and the improvement if the AND chain is replaced by a balanced tree that forms each $T_i$ in $\lceil\log_2 (i+1)\rceil$ levels.
::: solution
*Chain.* $T_{31}$ requires $31$ AND gates in series after the flip-flop outputs (from $T_0 = E$: $T_1 = EQ_0$ is one gate, $T_{31}$ is the $31$st). The critical path is $t_{pcq} + 31\times25 + 30 + t_{setup} = 40 + 775 + 30 + 30 = 875\,\mathrm{ps}$, so $f_{max} = 1.14\,\mathrm{GHz}$.

*Tree.* $T_{31} = E\,Q_0\cdots Q_{30}$ is a 32-input AND, which a tree of 2-input gates forms in $\lceil\log_2 32\rceil = 5$ levels. The critical path becomes $40 + 5\times25 + 30 + 30 = 225\,\mathrm{ps}$, so $f_{max} = 4.44\,\mathrm{GHz}$ — almost four times faster, at the cost of more AND gates (a prefix-AND network, the same structure as the carry network of a prefix adder).
:::
:::
