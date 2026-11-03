A processor running at $4\,\mathrm{GHz}$ gives each pipeline stage $250\,\mathrm{ps}$, about twenty-five fan-out-of-four inverter delays in a process like our reference process. Of those, the flip-flops at the start and end of the stage take three or four for themselves, and the uncertainty in when the clock edges arrive takes one or two more. Close to a fifth of every cycle is therefore spent not computing but *sequencing* — and the clock network that delivers those edges, to millions of flip-flops spread over several square centimetres, can consume a third of the chip's power. The circuits that hold state and the network that times them are as important to performance as the logic itself.

The behavioural side of sequential logic — latches and flip-flops as black boxes, setup and hold times, the setup and hold constraints and metastability — is developed in [[digital-logic/latches-flip-flops]]. This chapter opens the boxes. We build CMOS latches from transmission gates and inverters, assemble flip-flops from them and see where their setup, hold and clock-to-Q delays come from. We extend the timing constraints to include clock **jitter**, analyse latch-based design and **time borrowing**, and then turn to the clock itself: how it is generated, distributed with low **skew**, and what that costs in power. Transmission gates and inverter delays come from [[digital-ic/static-cmos-logic]] and [[digital-ic/cmos-inverter]].

## CMOS latches

A latch is transparent while its clock is active — its output follows its input — and opaque while the clock is inactive, holding the last value. In CMOS the natural building blocks are a transmission gate, which can connect or disconnect a node, and an inverter, which restores and drives it.

### Dynamic latches

The simplest latch is a transmission gate followed by an inverter. While the clock $\phi$ is high, the transmission gate conducts and the inverter's input follows $D$; the output is $\overline{D}$. When $\phi$ falls, the transmission gate opens and the inverter's input node is left floating, holding its value as charge on its capacitance — the gate capacitance of the inverter plus the diffusion capacitance of the transmission gate. This **dynamic latch** uses only four transistors, but, like every floating node of [[digital-ic/dynamic-logic]], it loses its value through leakage after some nanoseconds or microseconds and is vulnerable to coupling noise. It cannot be used when the clock may be stopped.

### Static latches

::: definition Static transmission-gate latch {#def-tg-latch}
A **static transmission-gate latch** consists of an input transmission gate controlled by $\phi$ (on when $\phi = 1$), a forward inverter driving the output, and a feedback loop formed by a second inverter and a **feedback transmission gate** controlled by $\overline{\phi}$ (on when $\phi = 0$). When $\phi = 1$ the latch is transparent and the feedback is broken; when $\phi = 0$ the input is disconnected and the two inverters form a closed bistable loop that holds the stored value indefinitely.
:::

Breaking the feedback while the input is applied avoids a **ratio** fight: if the feedback were always connected, the input driver would have to overpower the feedback inverter, as in an SRAM write. Some compact latches do keep the feedback permanently connected but make the feedback inverter very weak; that saves the feedback transmission gate and one clock load at the cost of a ratio constraint and slower writes.

Practical latches add an input inverter, so that the input transmission gate is driven by a strong, local signal rather than by whatever long wire carries $D$, and an output inverter, so that the stored node is isolated from the load and from noise on the output wire. A robust static latch therefore has three inverters, two transmission gates and the clock inverter that generates $\overline{\phi}$ locally: about twelve transistors.

### Clocked CMOS

An alternative to the transmission gate is to put the clocked transistors inside the inverter's stack. In a **clocked CMOS** (C²MOS) stage, the input drives an nMOS and a pMOS as in an inverter, and in series with each there is a clocked transistor: an nMOS gated by $\phi$ and a pMOS gated by $\overline{\phi}$. When $\phi = 1$ both clocked transistors conduct and the stage inverts; when $\phi = 0$ both are off and the output floats, holding its value dynamically. A master–slave register made of two C²MOS stages on opposite clock phases has an important property: if $\phi$ and $\overline{\phi}$ are both momentarily high or both low because of clock skew (**clock overlap**), at most one of the pull-down or pull-up paths of each stage is enabled, and data cannot race through both stages. C²MOS stages are used in low-power and dynamic register designs.

## Flip-flops

An edge-triggered D flip-flop is two latches in series, a **master** transparent when the clock is low and a **slave** transparent when it is high. While the clock is low, the master follows $D$ and the slave holds the previous output. At the rising edge the master closes, capturing the value of $D$, and the slave opens, passing it to $Q$. At no time are both latches transparent (in the ideal case), so the input never races straight to the output.

The **transmission-gate master–slave flip-flop** is the workhorse of standard-cell libraries: two static transmission-gate latches on complementary clocks, with a local clock buffer generating $\phi$ and $\overline{\phi}$ from the incoming clock so that every flip-flop sees sharp, locally generated phases. It typically has about twenty to twenty-four transistors including input and output inverters.

### Where the timing parameters come from

The setup, hold and clock-to-Q times of [[digital-logic/latches-flip-flops]] are not independent numbers; they follow from the delays inside the flip-flop.

::: proposition Timing of a master–slave flip-flop {#prop-ff-timing}
Consider a positive-edge transmission-gate master–slave flip-flop with an input inverter. Let $t_{inv}$ and $t_{tg}$ be the delays of an inverter and a transmission gate inside the flip-flop. To first order:

- **Setup time**: before the rising edge closes the master's input transmission gate, the new data must have passed through the input inverter and the input transmission gate and set the master's storage loop, including its forward and feedback inverters, so that the loop is in the correct state when the feedback closes:
$$
t_{setup} \approx t_{inv} + t_{tg} + 2t_{inv}.
$$
- **Clock-to-Q delay**: after the edge, the slave's input transmission gate opens and the value propagates through it and the output stages:
$$
t_{pcq} \approx t_{tg} + 2t_{inv}
$$
  (one inverter of the slave loop and the output inverter).
- **Hold time**: the input must stay stable until the master's input transmission gate is fully off; with locally generated $\phi$ and $\overline{\phi}$, this happens about one clock-inverter delay after the edge, partly compensated by the delay of the input inverter, so $t_{hold} \approx 0$ and may be slightly positive or negative.
:::

The precise values depend on sizing and on how the parameters are defined (most libraries define setup and hold by the input timing at which the clock-to-Q delay degrades by a set percentage), and are found by simulation. But the estimate shows what matters: a flip-flop's **sequencing overhead**, $t_{pcq} + t_{setup}$, is about six to seven inverter-like stages, which with stage delays of about half an FO4 delay comes to roughly three to four FO4 delays.

::: example Sequencing overhead {#ex-overhead}
In the reference process (FO4 $= 10.4\,\mathrm{ps}$), a library flip-flop has $t_{pcq} = 35\,\mathrm{ps}$ and $t_{setup} = 25\,\mathrm{ps}$. A design targets a cycle time of $20$ FO4. What fraction of the cycle is sequencing overhead? What would it be at $12$ FO4, a cycle typical of the most aggressive pipelines of the early 2000s?
::: solution
$20$ FO4 $= 208\,\mathrm{ps}$; the overhead is $60\,\mathrm{ps}$, or $29\,\%$ of the cycle — leaving only about $148\,\mathrm{ps}$ ($14$ FO4) for logic. At $12$ FO4 ($125\,\mathrm{ps}$), the overhead is $48\,\%$. Deep pipelining has diminishing returns: halving the logic per stage does not halve the cycle time, because the sequencing overhead stays the same. Together with the growth of power, this is why processor pipelines stopped deepening after the mid-2000s.
:::
:::

### Faster alternatives

Because the overhead matters so much, many faster sequencing elements have been invented.

- **Pulsed latches.** A single latch is made transparent for a short **pulse** of width $t_{pw}$ after each rising clock edge, generated by a local pulse generator shared by a group of latches. Its overhead is a single latch delay $t_{pdq}$, roughly half that of a flip-flop. The price is a much harder hold constraint: the latch is transparent for $t_{pw}$ after the edge, so the hold time grows by roughly $t_{pw}$, and every short path must be padded with delay.
- **Sense-amplifier flip-flops.** A precharged differential sense amplifier, like those that read SRAM bit lines ([[digital-ic/memory-arrays]]), samples the input at the clock edge and resolves quickly, followed by a cross-coupled latch to hold the result; the StrongARM processor of 1996 used this style.
- **Flip-flops with built-in logic.** A multiplexer or a few gates can be merged into the master stage, hiding part of their delay in the flip-flop.

## Timing constraints with skew and jitter

The setup and hold constraints of [[digital-logic/latches-flip-flops]] include **clock skew**, the difference in arrival time of the same clock edge at two registers. A real clock also has **jitter**, a variation of the edge times from cycle to cycle.

::: definition Clock skew and jitter {#def-skew-jitter}
Let $t_k(i)$ be the time at which the $k$-th clock edge reaches register $i$. The **skew** between registers $i$ and $j$ is the systematic, edge-independent part of $t_k(j) - t_k(i)$. **Jitter** is the variation of the edge times about their ideal positions, $t_k(i) - kT_c - (\text{offset of } i)$; **cycle-to-cycle jitter** $t_{jit}$ bounds how much one clock period at a register can be shorter than the nominal $T_c$. Skew arises mainly from the static mismatch of clock paths; jitter from noise in the clock source and in the supply of the clock buffers.
:::

::: theorem Setup and hold constraints with skew and jitter {#thm-ff-constraints}
For a register-to-register path with logic propagation delay $t_{pd}$ and contamination delay $t_{cd}$, skew bounded by $t_{skew}$ in either direction, and cycle-to-cycle jitter bounded by $t_{jit}$, correct operation requires

$$
T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew} + t_{jit},
$$ {#eq-setup-jit}

$$
t_{ccq} + t_{cd} \ge t_{hold} + t_{skew}.
$$ {#eq-hold-jit}
:::

::: proof
The setup constraint compares the launch of data by one clock edge with its capture by the *next* edge. The derivation in [[digital-logic/latches-flip-flops]] gives $T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew}$ when the period is exactly $T_c$. If the interval between the launching and capturing edges, as seen at the capturing register, can be shorter by up to $t_{jit}$, the available time shrinks by $t_{jit}$, giving [[#eq-setup-jit]]. The hold constraint compares data launched and captured by the *same* edge; jitter from the common clock source shifts that edge equally at both registers and cancels, so only skew (which includes any uncorrelated local variation) appears, as in [[#eq-hold-jit]].
:::

::: example Maximum frequency with skew and jitter {#ex-fmax}
A path has $t_{pd} = 300\,\mathrm{ps}$ and $t_{cd} = 10\,\mathrm{ps}$, between flip-flops with $t_{pcq} = 35\,\mathrm{ps}$, $t_{ccq} = 25\,\mathrm{ps}$, $t_{setup} = 25\,\mathrm{ps}$ and $t_{hold} = 10\,\mathrm{ps}$. The clock network has $20\,\mathrm{ps}$ of skew and $15\,\mathrm{ps}$ of cycle-to-cycle jitter. Find the maximum clock frequency and check the hold constraint.
::: solution
By [[#eq-setup-jit]], $T_c \ge 35 + 300 + 25 + 20 + 15 = 395\,\mathrm{ps}$, so $f_{max} = 2.53\,\mathrm{GHz}$. Without skew and jitter it would be $1/360\,\mathrm{ps} = 2.78\,\mathrm{GHz}$: clock uncertainty costs $9\,\%$ of the frequency.

Hold, by [[#eq-hold-jit]]: $t_{ccq} + t_{cd} = 35\,\mathrm{ps} \ge t_{hold} + t_{skew} = 30\,\mathrm{ps}$. The constraint is met with only $5\,\mathrm{ps}$ of margin; if the skew between these two registers could reach $30\,\mathrm{ps}$, a delay buffer would be needed on this short path.
:::
:::

::: widget plot
f: (o + s)/x*100; 2*d/x*100
x: 8, 40
y: 0, 70
sliders: o=5.8:2:8:0.1; s=1.5:0:4:0.1; d=1.7:1:3:0.1
labels: \text{flip-flops: } (t_{pcq} + t_{setup} + t_{skew})/T_c; \text{latches: } 2t_{pdq}/T_c
caption: Percentage of the cycle lost to sequencing against the cycle time in FO4 delays (horizontal axis). For flip-flops the overhead is $t_{pcq} + t_{setup}$ (slider $o$, in FO4) plus skew and jitter ($s$, FO4); for a two-phase latch design it is two latch delays ($d$ each) and skew drops out, as long as data arrive while the latches are transparent. The defaults correspond to [[#ex-overhead]] and [[#ex-fmax]]. At $20$ FO4 the flip-flop design loses about a third of the cycle; shorten the cycle and the loss grows rapidly, which is the case for latch-based design in the fastest circuits.
:::

### Latch-based design and time borrowing

Flip-flops make each pipeline stage a hard boundary: if one stage's logic needs $10\,\mathrm{ps}$ more than its cycle allows, the whole design must slow down, even if the next stage has time to spare. **Two-phase latch-based design** relaxes this. Replace each flip-flop by two latches on complementary phases, $\phi_1$ and $\phi_2$, and distribute the logic between them, so that each half-cycle contains about half of the stage's logic.

::: theorem Latch-based timing and time borrowing {#thm-borrow}
In a two-phase system of transparent latches with $50\,\%$ duty cycle, in which every data signal arrives at each latch while it is transparent, the cycle time must satisfy

$$
T_c \ge 2t_{pdq} + t_{pd1} + t_{pd2},
$$ {#eq-latch-cycle}

where $t_{pd1}$ and $t_{pd2}$ are the logic delays of the two half-cycles and $t_{pdq}$ is the latch's D-to-Q delay. Clock skew does not enter. A half-cycle may use more than $T_c/2 - t_{pdq}$ for its logic by **borrowing** time from the next half-cycle, by at most

$$
t_{borrow} \le \frac{T_c}{2} - t_{setup} - t_{skew}.
$$ {#eq-borrow}
:::

::: proof
If data arrive at a latch while it is transparent, they pass through after $t_{pdq}$, regardless of the clock's exact timing. Following the data around one full cycle — through latch 1, logic 1, latch 2, logic 2 and back to latch 1 — the total delay is $2t_{pdq} + t_{pd1} + t_{pd2}$, and it must not exceed $T_c$ if the data are to keep up with the clock on average; this is [[#eq-latch-cycle]]. Since the clock edges are not on this path (the latches are transparent when the data arrive), skew does not appear.

The data may arrive at latch 2 at any time during its transparent half-cycle, but no later than $t_{setup}$ before it closes. Latch 2 opens at $T_c/2$ after latch 1 opens and closes at $T_c$; data leaving latch 1 near its opening edge may therefore arrive at latch 2 up to $T_c/2 - t_{setup}$ after latch 2 opens, which is the most that half-cycle 1 can borrow from half-cycle 2. If latch 2's clock can arrive early by $t_{skew}$, its closing edge moves earlier and the borrowing limit shrinks by $t_{skew}$, giving [[#eq-borrow]].
:::

::: example Time borrowing in a latch pipeline {#ex-borrow}
A pipeline stage of $440\,\mathrm{ps}$ of logic is split unevenly between two half-cycles: $300\,\mathrm{ps}$ in the first and $140\,\mathrm{ps}$ in the second. Latches have $t_{pdq} = t_{pcq} = 20\,\mathrm{ps}$ and $t_{setup} = 15\,\mathrm{ps}$; skew is negligible. (a) Can the stage run at $T_c = 500\,\mathrm{ps}$ with two-phase latches? How much time is borrowed, and is it within the limit? (b) What cycle time would the same logic need if each half were bounded by flip-flops ($t_{pcq} = 35\,\mathrm{ps}$, $t_{setup} = 25\,\mathrm{ps}$), with both flip-flop stages on the same clock?
::: solution
(a) By [[#eq-latch-cycle]], $2\times20 + 300 + 140 = 480\,\mathrm{ps} \le 500\,\mathrm{ps}$: the stage fits. Tracing it: data leave latch 1 at $20\,\mathrm{ps}$, arrive at latch 2 at $320\,\mathrm{ps}$ — $70\,\mathrm{ps}$ after it opened at $250\,\mathrm{ps}$, so $70\,\mathrm{ps}$ are borrowed — leave it at $340\,\mathrm{ps}$, and arrive back at latch 1 at $480\,\mathrm{ps}$, before it reopens at $500\,\mathrm{ps}$. The limit [[#eq-borrow]] is $250 - 15 = 235\,\mathrm{ps}$, so $70\,\mathrm{ps}$ is well within it.

(b) With flip-flops, each stage needs its logic plus $60\,\mathrm{ps}$ of overhead, and both stages run at the same period: $T_c \ge 300 + 60 = 360\,\mathrm{ps}$ per stage, i.e. $720\,\mathrm{ps}$ for the two stages that the latch design completes in $500\,\mathrm{ps}$. Even if the logic were perfectly balanced ($220\,\mathrm{ps}$ per stage), the flip-flop design would need $2\times280 = 560\,\mathrm{ps}$: latches save the extra overhead and absorb the imbalance.
:::
:::

Latch-based design was used in many high-performance processors and is still used in custom datapaths. Its costs are a more complicated timing analysis (static timing tools must trace borrowing through chains of latches), a harder hold problem (each latch is transparent for half a cycle, so the race between the two phases must be controlled, often with non-overlapping clocks), and the need to distribute two clock phases. Most synthesised logic uses flip-flops.

::: quiz
In a flip-flop-based design, one path misses its setup time by $15\,\mathrm{ps}$ while the next pipeline stage has $40\,\mathrm{ps}$ of slack. Which technique uses the slack without changing the logic?
- [ ] adding a delay buffer to the failing path
- [x] delaying the clock of the flip-flop at the end of the failing path by about $15$–$40\,\mathrm{ps}$ (useful skew)
- [ ] reducing the hold time of the flip-flops
- [ ] increasing the clock jitter
::: solution
If the capturing flip-flop's clock arrives later, the failing path gains that much time, and the next stage, which that same flip-flop launches, loses the same amount — it has $40\,\mathrm{ps}$ to spare. This deliberate **useful skew** is the flip-flop analogue of time borrowing; physical design tools apply it automatically. It must be checked against the hold constraints of all paths ending at the delayed flip-flop. Adding delay to the failing path makes it worse, and hold time and jitter are not the problem.
:::
:::

## Generating and distributing the clock

### Clock generation

An on-chip clock of several gigahertz cannot be brought in through a package pin. Instead a **phase-locked loop** (PLL) multiplies a low-frequency reference — typically a crystal oscillator at tens of megahertz — by an integer or fractional factor $N$. A voltage-controlled oscillator (usually a ring oscillator of the kind described in [[digital-ic/cmos-inverter]], or an LC oscillator for low jitter) produces the output clock; a divider by $N$ brings it down to the reference frequency; a phase detector compares the divided clock with the reference; and a loop filter turns the phase error into the oscillator's control voltage. In lock, $f_{out} = Nf_{ref}$ and the output's edges are aligned with the reference. Large chips contain many PLLs, one per clock domain, and the frequency of each can be changed on the fly for dynamic voltage and frequency scaling ([[digital-ic/power-dissipation]]). The PLL's own noise and the supply noise on the clock buffers set the jitter.

### Distribution networks

The clock must then reach every flip-flop on the chip at, ideally, the same instant. The network is a tree of buffers and wires whose root is the PLL and whose leaves are the clock inputs of the registers; because it is so large and so heavily loaded, it is designed separately from the logic.

- **H-trees.** A recursive H-shaped pattern of wires delivers the clock from the centre of a square region to the centres of its four quadrants, then from each of those to the centres of their quadrants, and so on. Every root-to-leaf path has the same length and the same sequence of buffers, so in an ideal world the skew is zero.
- **Grids** (meshes). A dense grid of wide metal lines, driven from many points, shorts together the outputs of the final tree level. Local mismatches are averaged out, so the skew is low and robust to variation, at the cost of large wire capacitance and power.
- **Spines** and **hybrids**: trees driving a few long, wide spines from which short local branches reach the flip-flops; many processors use a global H-tree or spine driving regional grids, with local buffers at the leaves.

::: proposition Wire length of an H-tree {#prop-htree}
An H-tree of $n$ levels covering a square of side $D$ reaches $4^n$ leaf points, the centres of a $2^n\times2^n$ array of equal squares, and uses a total wire length

$$
L_{tot} = \tfrac32 D\,(2^n - 1).
$$ {#eq-htree}
:::

::: proof
The first H in a square of side $D$ has a horizontal bar of length $D/2$ joining the centres of the left and right halves, and at each end a vertical bar of length $D/2$ joining the centres of two quadrants: $\tfrac32D$ of wire, reaching the $4$ quadrant centres. Level $k$ consists of $4^{k-1}$ such H's, each in a square of side $D/2^{k-1}$, so it uses $4^{k-1}\times\tfrac32D/2^{k-1} = \tfrac32D\,2^{k-1}$ of wire. Summing the geometric series over $k = 1, \dots, n$ gives $\tfrac32D(2^n - 1)$, and after $n$ levels there are $4^n$ leaves.
:::

::: example The cost of an H-tree {#ex-htree}
A $10\,\mathrm{mm}\times10\,\mathrm{mm}$ die is clocked by a $6$-level H-tree. How many leaves does it have, how much wire does it use, and what is the wire capacitance at $0.2\,\mathrm{fF/\mu m}$? What power does that capacitance alone draw at $3\,\mathrm{GHz}$ and $0.8\,\mathrm V$?
::: solution
$4^6 = 4096$ leaves, each serving a region of $10/64 = 0.156\,\mathrm{mm}$ on a side. By [[#eq-htree]], $L_{tot} = 1.5\times10\times63 = 945\,\mathrm{mm}$ of wire. Its capacitance is $945\times10^3\,\mathrm{\mu m}\times0.2\,\mathrm{fF/\mu m} = 189\,\mathrm{pF}$. The clock toggles every cycle (activity factor $1$), so the dynamic power ([[digital-ic/power-dissipation]]) is $CV_{DD}^2f = 189\times10^{-12}\times0.64\times3\times10^9 = 0.36\,\mathrm W$ — for the global wires alone, before the buffers, the local distribution and the hundreds of thousands of flip-flop clock inputs at the leaves, which typically add several times as much.
:::
:::

### Sources of skew

Even a perfectly symmetric tree has skew in practice:

- **Mismatched loads**: leaves that drive more flip-flops are slower; designers balance loads or tune buffer sizes and wire lengths.
- **Process variation**: random variation of transistor thresholds and wire widths makes nominally identical buffers differ.
- **Supply and temperature gradients**: buffers in a hot or drooping region of the chip are slower.
- **Wire RC**: the distributed resistance and capacitance of long clock wires, treated in [[digital-ic/interconnect]], makes their delay sensitive to small differences in width and coupling.

Random variations add statistically. If each buffer level contributes an independent delay error of standard deviation $\sigma_b$, two leaves whose paths diverge after the first $m$ of $n$ levels have $2(n - m)$ independent buffers between them, and their skew has standard deviation $\sigma_b\sqrt{2(n - m)}$. Designers budget for about three standard deviations.

::: example Statistical skew {#ex-stat-skew}
A clock tree has $8$ buffer levels from the PLL to the flip-flops, and each buffer has a random delay variation of standard deviation $1.5\,\mathrm{ps}$, independent from buffer to buffer. Estimate the $3\sigma$ skew between two flip-flops whose clock paths separate after the second level, and between two whose paths separate at the root.
::: solution
After separating at level $2$, each path has $6$ buffers of its own, so the difference involves $12$ independent errors: $\sigma = 1.5\sqrt{12} = 5.2\,\mathrm{ps}$, and the $3\sigma$ skew is $15.6\,\mathrm{ps}$. Separating at the root, $16$ independent errors: $\sigma = 1.5\times4 = 6.0\,\mathrm{ps}$, $3\sigma = 18\,\mathrm{ps}$. Flip-flops that communicate should therefore share as much of the clock tree as possible; clock-tree synthesis tools cluster communicating registers under common branches.
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=5.2
a: -15.6
b: 15.6
caption: Distribution of the skew in picoseconds between the two flip-flops of [[#ex-stat-skew]] whose paths separate after the second level ($\sigma = 5.2\,\mathrm{ps}$). The shaded interval is the $\pm3\sigma$ budget of $\pm15.6\,\mathrm{ps}$, which contains $99.7\,\%$ of pairs. Change $\sigma$ to $6$ (separation at the root) and see how much wider the tails become. With millions of flip-flop pairs on a chip, a few pairs will lie beyond $3\sigma$; the hold constraints of short paths must be checked with margin.
:::

::: warning Skew is not the same everywhere
Skew is a property of a *pair* of registers, not of the chip. A clock network with a global skew of $30\,\mathrm{ps}$ between its farthest corners may have only $5\,\mathrm{ps}$ between neighbouring flip-flops that actually communicate. Using the worst global figure in every timing check wastes performance; using a local figure for registers that are in fact far apart in the tree gives optimistic results and, for hold checks, broken silicon. Timing tools compute the skew of each launching–capturing pair from the actual clock paths, and remove the common part of the path (**common-path pessimism removal**).
:::

::: quiz
Supply noise adds $10\,\mathrm{ps}$ of cycle-to-cycle jitter to a clock that comes from a single PLL. Which constraint must be re-checked?
- [x] the setup constraint of every path, since a cycle can now be $10\,\mathrm{ps}$ shorter
- [ ] the hold constraint of every path, since the edges move
- [ ] both, by the same amount
- [ ] neither, since jitter averages out over many cycles
::: solution
Jitter changes the time between *consecutive* edges, which is what the setup constraint [[#eq-setup-jit]] measures. The hold constraint compares launch and capture by the *same* edge; jitter common to both registers shifts that edge equally at both and cancels. (Jitter that is not common — for instance from noise on one branch's buffers — behaves like skew and does enter the hold check.) Averaging is no help: a single short cycle is enough to cause a setup failure.
:::
:::

### Clock power

The clock is the busiest net on the chip: it switches twice per cycle, and it drives the largest total capacitance — the global wires, every buffer and the clock input of every flip-flop and latch. Clock networks often account for $20$–$40\,\%$ of a processor's dynamic power. The techniques of [[digital-ic/power-dissipation]] — above all **clock gating**, which stops the clock to idle registers — attack it directly. Some designs have used **resonant clocking**, in which an inductor resonates with the clock capacitance so that energy sloshes back and forth instead of being dissipated each cycle; AMD shipped a resonant clock mesh in a 32 nm processor in 2012.

::: application Adaptive clocking against supply droop
When a large block of a processor suddenly becomes active, the supply voltage can droop by tens of millivolts for a few nanoseconds before the voltage regulator responds. Slower gates during the droop could cause setup failures at the nominal frequency. Instead of adding a fixed margin to every cycle, many processors since the 2010s detect droops with on-die sensors and briefly stretch the clock period, or use a clock generated from a delay line powered by the same drooping supply, so that the clock slows down together with the logic.
:::

## Metastability in circuit terms

The probability that a flip-flop is still unresolved a time $t_r$ after sampling a changing input falls as $e^{-t_r/\tau}$ ([[digital-logic/latches-flip-flops]]), where $\tau$ is the regeneration time constant of the cross-coupled pair in the master or slave latch. For two identical cross-coupled inverters with total transconductance $G_m = g_{mn} + g_{mp}$ at the switching threshold and node capacitance $C$, the analysis of the bistable pair in [[digital-logic/latches-flip-flops]] gives $\tau = RC/(A - 1)$ with output resistance $R$ and gain $A = G_mR$; for $A \gg 1$,

$$
\tau \approx \frac{C}{G_m}.
$$ {#eq-tau-meta}

A fast synchroniser therefore has small, lightly loaded storage nodes and strongly conducting transistors near $V_M$.

::: example Regeneration time constant and MTBF {#ex-tau}
A synchroniser flip-flop in the reference process has a storage node capacitance of $0.6\,\mathrm{fF}$ (a unit inverter's input and diffusion) and a total transconductance at $V_M$ of $0.15\,\mathrm{mS}$. Estimate $\tau$. With $T_0 = 10\,\mathrm{ps}$, a $2\,\mathrm{GHz}$ clock and an asynchronous input changing $10^8$ times per second, find the mean time between failures of a two-flip-flop synchroniser that allows $t_r = 400\,\mathrm{ps}$.
::: solution
By [[#eq-tau-meta]], $\tau = 0.6\times10^{-15}/0.15\times10^{-3} = 4\,\mathrm{ps}$. Using the MTBF formula of [[digital-logic/latches-flip-flops]], $\mathrm{MTBF} = e^{t_r/\tau}/(T_0f_cf_d) = e^{100}/(10^{-11}\times2\times10^9\times10^8) = 2.7\times10^{43}/(2\times10^6) = 1.3\times10^{37}\,\mathrm s$. That is safe beyond any doubt — but the exponent is sensitive. At a reduced supply where the transconductance at $V_M$ falls by a factor of five, $\tau$ rises to $20\,\mathrm{ps}$ and the MTBF becomes $e^{20}/(2\times10^6) = 240\,\mathrm s$: a failure every four minutes. Synchronisers must be checked at the lowest voltage and worst temperature at which the chip runs.
:::
:::

::: history
Transmission-gate latches and master–slave flip-flops date from the earliest CMOS logic families of the late 1960s; the clocked CMOS (C²MOS) register was described by Y. Suzuki, K. Odagawa and T. Abe in 1973 for calculator circuits. John Earle of IBM published the "Earle latch" in 1965, merging logic into a latch so that a carry-save adder could be pipelined with minimum overhead — an early example of reducing sequencing overhead. Phase-locked loops became standard for on-chip clock generation in microprocessors in the early 1990s, notably in a 1992 Intel design by Ian Young and colleagues. The DEC Alpha 21064 of 1992 drove its $200\,\mathrm{MHz}$ clock from a single, very large central driver; later Alphas and most high-performance processors adopted hierarchical trees and grids with distributed buffers. Pulsed latches and sense-amplifier flip-flops became common in high-performance designs in the late 1990s.
:::

## Where this leads

The sequencing elements of this chapter bound every pipeline stage designed in [[computer-architecture/pipelining]]. The wires of the clock tree, and the repeaters that drive them, are analysed in [[digital-ic/interconnect]]; the clock's share of power and the clock-gating and power-gating techniques that reduce it are in [[digital-ic/power-dissipation]]. Sense amplifiers like those in sense-amplifier flip-flops read the bit lines of [[digital-ic/memory-arrays]], whose synchronous interfaces are registered by the flip-flops studied here.

::: summary
- CMOS latches are built from transmission gates and inverters; static latches close a feedback loop when opaque, dynamic latches store charge and must be refreshed by the clock.
- A master–slave flip-flop is two latches on complementary phases; its setup time, clock-to-Q delay and hold time follow from the internal inverter and transmission-gate delays, and its sequencing overhead $t_{pcq} + t_{setup}$ is about three to four FO4 delays.
- With skew and cycle-to-cycle jitter, $T_c \ge t_{pcq} + t_{pd} + t_{setup} + t_{skew} + t_{jit}$, while the hold constraint $t_{ccq} + t_{cd} \ge t_{hold} + t_{skew}$ is unaffected by common jitter.
- Two-phase latch design needs $T_c \ge 2t_{pdq} + t_{pd1} + t_{pd2}$, is insensitive to skew, and lets a half-cycle borrow up to $T_c/2 - t_{setup} - t_{skew}$ from the next.
- Clocks are generated by PLLs and distributed by H-trees, grids and spines; an $n$-level H-tree reaches $4^n$ leaves with $\tfrac32D(2^n - 1)$ of wire.
- Random skew adds in quadrature over the unshared part of two clock paths; the clock network consumes a large fraction of dynamic power.
- The metastability time constant of a latch is $\tau \approx C/G_m$, and grows sharply at low supply voltages.
:::

## Exercises

::: exercise Transistor count of a latch {level=1 check="12"}
Count the transistors in a static transmission-gate latch with an input inverter, forward and feedback inverters, an output inverter, and input and feedback transmission gates (not counting the clock inverter).
::: solution
The four inverters (input, forward, feedback and output) have $8$ transistors and the two transmission gates $4$, a total of $12$. The local clock inverter adds $2$ more, but it is usually shared by the master and slave of a flip-flop (and sometimes by several flip-flops), so it is conventionally not counted as part of the latch.
:::
:::

::: exercise Maximum frequency {level=1 check="1/(40e-12 + 250e-12 + 30e-12 + 25e-12 + 10e-12)"}
Find the maximum clock frequency in hertz for $t_{pcq} = 40\,\mathrm{ps}$, $t_{pd} = 250\,\mathrm{ps}$, $t_{setup} = 30\,\mathrm{ps}$, $t_{skew} = 25\,\mathrm{ps}$ and $t_{jit} = 10\,\mathrm{ps}$.
::: solution
$T_c = 40 + 250 + 30 + 25 + 10 = 355\,\mathrm{ps}$, so $f_{max} = 2.82\,\mathrm{GHz}$, by [[#eq-setup-jit]].
:::
:::

::: exercise H-tree leaves {level=1 check="1.5*0.02*(2^5 - 1)"}
A $20\,\mathrm{mm}$ square die uses a $5$-level H-tree. Find the total wire length in metres and the number of leaves.
::: solution
By [[#eq-htree]], $L = 1.5\times20\,\mathrm{mm}\times31 = 930\,\mathrm{mm} = 0.93\,\mathrm m$; $4^5 = 1024$ leaves.
:::
:::

::: exercise Hold fix {level=2 check="40e-12"}
A shift register connects flip-flops directly ($t_{cd} = 0$). The flip-flops have $t_{ccq} = 20\,\mathrm{ps}$ and $t_{hold} = 15\,\mathrm{ps}$, and the worst skew between adjacent stages is $45\,\mathrm{ps}$. What minimum contamination delay, in seconds, must be inserted between stages?
::: solution
By [[#eq-hold-jit]], $t_{cd} \ge t_{hold} + t_{skew} - t_{ccq} = 15 + 45 - 20 = 40\,\mathrm{ps}$. A buffer chain with at least $40\,\mathrm{ps}$ of contamination delay is needed — or, better, the clock tree should be arranged so that adjacent stages share the same leaf and the skew between them is small.
:::
:::

::: exercise Pulsed-latch hold {level=2}
A pulsed latch is transparent for $t_{pw} = 40\,\mathrm{ps}$ after each rising edge and has hold time $t_{hold} = 10\,\mathrm{ps}$ measured from the *end* of the pulse, $t_{ccq} = 15\,\mathrm{ps}$ and $t_{pdq} = 25\,\mathrm{ps}$. With $10\,\mathrm{ps}$ of skew, (a) write and evaluate the hold constraint, (b) compare the sequencing overhead with a flip-flop of $t_{pcq} + t_{setup} = 60\,\mathrm{ps}$.
::: solution
(a) New data launched at the rising edge must not reach the next latch before its pulse has ended and the hold time has passed: $t_{ccq} + t_{cd} \ge t_{pw} + t_{hold} + t_{skew}$, so $t_{cd} \ge 40 + 10 + 10 - 15 = 45\,\mathrm{ps}$. Every short path needs $45\,\mathrm{ps}$ of contamination delay, against about $0$–$15\,\mathrm{ps}$ for typical flip-flops. (b) If data arrive during the pulse, the overhead is just $t_{pdq} = 25\,\mathrm{ps}$, saving $35\,\mathrm{ps}$ per cycle over the flip-flop, and skew within the pulse is absorbed. The price is the hold-fixing buffers, which cost area and power.
:::
:::

::: exercise Borrowing limit {level=2 check="1e-9/2 - 30e-12 - 20e-12"}
A two-phase latch design runs at $1\,\mathrm{GHz}$ with $t_{setup} = 30\,\mathrm{ps}$ and $t_{skew} = 20\,\mathrm{ps}$. What is the maximum time, in seconds, that one half-cycle can borrow from the next?
::: solution
By [[#eq-borrow]], $t_{borrow} \le 500 - 30 - 20 = 450\,\mathrm{ps}$.
:::
:::

::: exercise Clock power and gating {level=2}
A chip has $2\,\mathrm{nF}$ of total clock capacitance (wires, buffers and flip-flop clock inputs) and runs at $2.5\,\mathrm{GHz}$ from $0.75\,\mathrm V$. (a) Find the clock power. (b) If $60\,\%$ of the clock capacitance is in regions whose registers are idle $70\,\%$ of the time, how much does ideal clock gating of those regions save?
::: solution
(a) $P = CV^2f = 2\times10^{-9}\times0.5625\times2.5\times10^9 = 2.81\,\mathrm W$. (b) The gateable capacitance is $1.2\,\mathrm{nF}$, idle $70\,\%$ of the time, so the average switched capacitance falls by $0.84\,\mathrm{nF}$, saving $0.84/2\times2.81 = 1.18\,\mathrm W$, $42\,\%$ of the clock power. (The gating cells themselves add a little capacitance and their enable logic must meet its own timing.)
:::
:::

::: exercise Skew budget from statistics {level=3}
A clock tree has $n$ buffer levels with independent delay variations of $\sigma_b$ each, and flip-flops that communicate always share the first $m$ levels. (a) Show that the $3\sigma$ skew between communicating flip-flops is $3\sigma_b\sqrt{2(n - m)}$. (b) For $n = 10$ and $\sigma_b = 2\,\mathrm{ps}$, how many shared levels are needed to keep the $3\sigma$ skew below $12\,\mathrm{ps}$? (c) Why does a clock grid reduce the effective $n - m$?
::: solution
(a) The skew is the difference of the two path delays. The shared levels contribute equally to both and cancel; each path has $n - m$ unshared buffers with independent errors, so the difference is a sum of $2(n - m)$ independent errors, with variance $2(n - m)\sigma_b^2$. Three standard deviations is $3\sigma_b\sqrt{2(n - m)}$.

(b) $6\sqrt{2(10 - m)} \le 12$ requires $2(10 - m) \le 4$, i.e. $m \ge 8$: the flip-flops must share all but the last two levels.

(c) A grid shorts together the outputs of many buffers at one level; the voltage on the grid is driven by the average of those buffers, whose random errors partially cancel (the standard deviation of an average of $k$ independent errors is $\sigma_b/\sqrt k$). The levels above the grid then contribute much less to the skew of any pair, as if they were shared, and only the short local branches below the grid remain unshared.
:::
:::

::: exercise A flip-flop from latches with clock overlap {level=3}
A master–slave flip-flop built from two transmission-gate latches uses $\phi$ and $\overline{\phi}$, but the inverter that generates $\overline{\phi}$ has a delay $t_d = 15\,\mathrm{ps}$, so after each clock edge both latches are briefly transparent (or both opaque). (a) After the rising edge of $\phi$, which overlap occurs, and what race can it cause? (b) The delay from $D$ through the master's input inverter and transmission gate to its storage node is $t_{DM} = 10\,\mathrm{ps}$. Estimate the hold time caused by the overlap, and check it for a path with $t_{ccq} + t_{cd} = 20\,\mathrm{ps}$ and $10\,\mathrm{ps}$ of skew. (c) How does the C²MOS register avoid this problem?
::: hint
Determine which latch is transparent when $\phi = 1$ and when $\overline{\phi} = 1$, and what happens while $\overline{\phi}$ lags $\phi$.
:::
::: solution
(a) Let the master be transparent when $\phi = 0$ (its input gate's nMOS is driven by $\overline{\phi}$) and the slave when $\phi = 1$. At the rising edge of $\phi$, $\overline{\phi}$ remains high for $15\,\mathrm{ps}$, so the master's input gate is still partly on (its nMOS) while the slave has opened: both are transparent, and new data arriving at $D$ just after the edge could race through both latches to $Q$ — an effective hold-time increase of about $t_d$.

(b) A change of $D$ at time $t$ after the edge reaches the master's storage node at $t + t_{DM}$; it corrupts the captured value if that happens before the master's input gate has fully turned off at $t_d = 15\,\mathrm{ps}$. So $D$ must be held until $t_{hold} \approx t_d - t_{DM} = 5\,\mathrm{ps}$ after the edge. For the path given, $t_{ccq} + t_{cd} = 20\,\mathrm{ps} \ge t_{hold} + t_{skew} = 15\,\mathrm{ps}$, so the flip-flop is safe with $5\,\mathrm{ps}$ to spare. A slower clock inverter would raise the hold time further; real libraries generate both phases locally with matched delays so that the overlap is only a few picoseconds.

(c) In a C²MOS stage the clocked transistors are in series with the data transistors: with both clocks high, only the pull-down path of one stage and the pull-up path of the other are enabled, so a rising input can only propagate through one of the two stages and a falling input through the other. Data cannot pass both stages during either kind of overlap, provided the overlap is short compared with the stage delays.
:::
:::
