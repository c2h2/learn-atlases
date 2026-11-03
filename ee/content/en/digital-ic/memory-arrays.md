Look at the die photograph of any large processor and the most regular-looking regions — fine-grained rectangles repeated hundreds of times — are memory. Caches, register files, branch predictors and buffers often occupy more than half of the die, and in AI accelerators, whose performance depends on keeping data close to the arithmetic, the share of SRAM is larger still. Off the processor, every computer's main memory is DRAM, and its storage is NAND flash. More bits of memory are manufactured each year than any other product of the semiconductor industry, and the circuits that store, find and read those bits are among the most carefully optimised in electronics.

The logical organisation of memories — words, addresses, rows and columns, the SRAM and DRAM cells and the charge-sharing read of a DRAM — is introduced in [[digital-logic/memories-programmable-logic]]. This chapter is about the circuits. We start with the architecture of an array and the **decoders** that select a row, sized by logical effort. Then the six-transistor **SRAM cell**: the transistor ratios that make it readable without being disturbed and writable without being overpowered, the **static noise margin**, and the effect of variation. **Sense amplifiers** detect the small bit-line signals that make memories fast. We then turn to the **DRAM** cell's retention and its boosted word line, to **flash** memory's floating-gate and charge-trap cells with several bits per cell, and finally to redundancy and error correction, which make arrays of billions of cells manufacturable. The cross-coupled inverters of the SRAM cell were analysed in [[digital-logic/latches-flip-flops]], and sizing by logical effort in [[digital-ic/static-cmos-logic]].

## Array architecture

A memory of $2^n$ words of $m$ bits is built as one or more rectangular arrays of cells. Horizontal **word lines** select a row; vertical **bit lines** carry data to and from the cells of each column. A read proceeds in a fixed sequence:

1. the **row decoder** turns the row address into a single active word line, through **word-line drivers** large enough to charge the long word line quickly;
2. every cell in the selected row drives its bit line (or bit-line pair);
3. **column multiplexers** select the columns belonging to the addressed word;
4. **sense amplifiers** detect the small signal on each selected bit line and amplify it to a logic level;
5. output drivers deliver the data.

Writes use **write drivers** that force the selected bit lines to the new values. Between accesses the bit lines are **precharged**. A large memory is divided into **sub-arrays** (banks, mats), each with its own decoders and sense amplifiers, so that word lines and bit lines stay short: a bit line with $256$ cells has a quarter of the capacitance of one with $1024$, and the signal a cell can develop on it in a given time is four times larger. The **array efficiency**, the fraction of area occupied by cells rather than periphery, is typically $50$–$70\,\%$.

### Decoders

A row decoder for $2^k$ rows is $2^k$ AND gates, each of $k$ inputs drawn from the true or complemented address bits. It is a classic problem for logical effort: the electrical effort is large (the word line is a long, heavily loaded wire) and so is the branching (each address bit drives half of all the decoder gates).

::: example Sizing a 256-row decoder {#ex-decoder}
A decoder has $8$ address bits and $256$ word lines. Each address bit and its complement are available with an input capacitance of $10$ units (a unit being the gate capacitance of $0.1\,\mathrm{\mu m}$ of transistor in the reference process), and each word line presents $1280$ units ($128\,\mathrm{fF}$: the access transistors of the row plus the wire). Each true or complemented address bit drives $128$ of the $256$ decoder gates. Using a NAND4–NOR2 structure for the 8-input AND plus inverters as needed, find the path effort, the best number of stages and the minimum delay.
::: solution
$G = g_{\text{NAND4}}\,g_{\text{NOR2}} = 2\times\tfrac53 = 3.33$; $B = 128$; $H = 1280/10 = 128$. So $F = GBH = 3.33\times128\times128 = 54\,600$. The best number of stages is $\log_4F = 7.9$, about $8$: two logic stages plus six inverters (an even number, keeping the word line active high). With $N = 8$, $\hat f = 54\,600^{1/8} = 3.91$ and $P = 4 + 2 + 6\times1 = 12$, so

$$
\hat D = 8\times3.91 + 12 = 43.3 \quad(\times\,2.07\,\mathrm{ps} = 90\,\mathrm{ps}).
$$

With only the two logic stages the delay would be $2\sqrt{54\,600} + 6 = 473$, eleven times worse. In practice the branching is handled by **predecoding**: two $4$-to-$16$ predecoders (each a NAND4 plus inverter) produce $32$ predecoded lines, and each word-line driver is a NAND2 of one line from each predecoder followed by an inverter chain. That keeps the gates near the array simple (one NAND2 per row, matching the narrow pitch of a row of cells) without changing $F$ much.
:::
:::

The decoder gates near the array must fit in the height of one row of cells, a severe layout constraint; this is why the final stages are simple NAND2 gates and inverters, and why word-line drivers are often laid out on both sides of the array, driving alternate rows.

## The six-transistor SRAM cell

The 6T SRAM cell consists of two cross-coupled inverters — pull-down nMOS transistors $M_1$, $M_3$ and pull-up pMOS transistors $M_2$, $M_4$ — storing complementary values on nodes $Q$ and $\overline{Q}$, and two nMOS **access transistors** $M_5$, $M_6$ connecting those nodes to the bit lines $BL$ and $\overline{BL}$ when the word line $WL$ is high. In **hold** mode the word line is low and the cell is a bistable latch. The cell must be designed for two conflicting operations.

### Read stability

Suppose $Q = 0$ and $\overline{Q} = 1$, and both bit lines are precharged to $V_{DD}$. When the word line rises, $M_5$ connects the high bit line $BL$ to the low node $Q$, and current flows from $BL$ through $M_5$ and the pull-down $M_1$ to ground. That current discharges $BL$ slowly, which is the read signal; but it also raises the voltage of $Q$ above ground, because $M_5$ and $M_1$ form a voltage divider. If $Q$ rises past the switching threshold of the other inverter, the cell flips — a **read upset**.

::: definition Cell ratio and pull-up ratio {#def-cell-ratio}
The **cell ratio** of a 6T SRAM cell is $CR = k_{pd}/k_{ax}$, the ratio of the gain factor of a pull-down nMOS to that of an access nMOS (with equal lengths, the ratio of their widths). The **pull-up ratio** is $PR = k_{pu}/k_{ax}$, the ratio of the gain factor of a pull-up pMOS to that of an access transistor.
:::

::: proposition Read disturb voltage {#prop-read}
During a read of a cell storing $Q = 0$, with $BL$ held at $V_{DD}$, the access transistor is saturated and the pull-down transistor is in triode. In the long-channel square-law model, neglecting the body effect, the voltage $V_Q$ to which the low node rises satisfies

$$
\frac{k_{ax}}{2}\,(V_{DD} - V_Q - V_{th})^2 = k_{pd}\left[(V_{DD} - V_{th})V_Q - \frac{V_Q^2}{2}\right].
$$ {#eq-read}

The cell reads without upset if $V_Q$ stays below the threshold $V_{th}$ of the opposite pull-down transistor, with margin; this requires a cell ratio larger than a minimum that depends on $V_{DD}$ and $V_{th}$.
:::

::: proof
The access transistor has its gate at $V_{DD}$ (the word line), its drain at $V_{DD}$ (the bit line) and its source at $Q$: $V_{GS} = V_{DS} = V_{DD} - V_Q$, so $V_{DS} > V_{GS} - V_{th}$ and it is saturated. The pull-down transistor has its gate at $\overline{Q} = V_{DD}$ and $V_{DS} = V_Q$, small, so it is in triode. Equating the two currents gives [[#eq-read]]. The right side increases with $k_{pd}$ for fixed $V_Q$, so a larger cell ratio forces a smaller $V_Q$. If $V_Q$ approached the threshold of $M_3$ (whose gate is $Q$), $M_3$ would start to discharge $\overline{Q}$, the positive feedback of the latch would take over, and the cell would flip.
:::

::: example Choosing the cell ratio {#ex-read}
For $V_{DD} = 1.0\,\mathrm V$ and $V_{th} = 0.3\,\mathrm V$, find the read disturb voltage $V_Q$ for cell ratios of $1$, $1.5$ and $2$. What cell ratio keeps $V_Q \le 0.2\,\mathrm V$?
::: solution
Solve [[#eq-read]] for $V_Q$ (it is a quadratic; numerically by bisection is simplest). With $CR = k_{pd}/k_{ax}$, divide by $k_{ax}$:

$$
\tfrac12(0.7 - V_Q)^2 = CR\,\bigl(0.7V_Q - \tfrac12V_Q^2\bigr).
$$

$CR = 1$: $V_Q = 0.205\,\mathrm V$. $CR = 1.5$: $V_Q = 0.158\,\mathrm V$. $CR = 2$: $V_Q = 0.128\,\mathrm V$. For $V_Q = 0.2\,\mathrm V$ exactly, $CR = \tfrac12(0.5)^2/(0.14 - 0.02) = 0.125/0.12 = 1.04$. Real cells use $CR \approx 1.5$–$2$, because velocity saturation makes the access transistor (which is saturated) relatively stronger than the square law suggests, and because random variation can make one cell's access transistor much stronger than its pull-down.
:::
:::

### Writability

To write a $1$ into a cell storing $Q = 0$, the write driver pulls $\overline{BL}$ to $0$ (and holds $BL$ at $V_{DD}$). The access transistor $M_6$ must then pull the node $\overline{Q}$, currently held high by the pull-up $M_4$, down far enough for the cell to flip. This is a fight between $M_6$ (nMOS, in triode) and $M_4$ (pMOS, saturated).

::: proposition Write condition {#prop-write}
In the square-law model, with $\overline{BL}$ at $0$, the node $\overline{Q}$ settles at the voltage $V$ satisfying

$$
\frac{k_{pu}}{2}\,(V_{DD} - \lvert V_{th,p}\rvert)^2 = k_{ax}\left[(V_{DD} - V_{th,n})V - \frac{V^2}{2}\right],
$$ {#eq-write}

and the write succeeds if $V$ falls below the threshold $V_{th,n}$ of the pull-down transistor it drives. This requires a pull-up ratio $PR = k_{pu}/k_{ax}$ below a maximum.
:::

::: proof
The pull-up $M_4$ has its gate at $Q = 0$ and its source at $V_{DD}$, so $V_{SG} = V_{DD}$; its $V_{SD} = V_{DD} - V$ is large, so it is saturated. The access transistor $M_6$ has its gate at $V_{DD}$ and its source at $\overline{BL} = 0$, so $V_{GS} = V_{DD}$ and $V_{DS} = V$, small: triode. Equating currents gives [[#eq-write]]. Once $V$ is below $V_{th,n}$, the pull-down $M_1$ (gate $\overline{Q}$) turns off, $Q$ rises through $M_2$ and $M_5$ (from $BL = V_{DD}$), which turns $M_4$ off and $M_3$ on, and regeneration completes the write. A larger $k_{pu}$ raises $V$, so the pull-up must be weak enough.
:::

With $V_{DD} = 1\,\mathrm V$ and thresholds of $0.3\,\mathrm V$, requiring $V \le 0.3\,\mathrm V$ in [[#eq-write]] gives $PR \le 2(0.21 - 0.045)/0.49 = 0.67$. Since $k_p \approx k_n/2$ at equal width, the pull-up may be up to about $1.3$ times as wide as the access transistor; in practice the pull-ups are made as small as possible. A typical 6T cell therefore has the strength ordering **pull-down > access > pull-up**, with all transistors near minimum size and the pull-downs about $1.5$–$2$ times stronger than the access transistors.

::: quiz
A designer makes the access transistors of an SRAM cell twice as wide, to read faster. What happens to read stability and writability?
- [ ] both improve
- [x] read stability gets worse, writability gets better
- [ ] read stability gets better, writability gets worse
- [ ] neither changes, since the cell ratio is a ratio of the two inverters
::: solution
Wider access transistors halve the cell ratio $k_{pd}/k_{ax}$, so the low node rises further during a read ([[#prop-read]]) and the cell is more easily upset. They also halve the pull-up ratio $k_{pu}/k_{ax}$, so the access transistor overpowers the pull-up more easily during a write ([[#prop-write]]). The two requirements pull the access transistor's strength in opposite directions; the cell design is a compromise between them.
:::
:::

### Static noise margin

The voltage ratios above are a first check. The standard measure of an SRAM cell's robustness is the **static noise margin** (SNM), defined from the butterfly diagram of the two cross-coupled inverters ([[digital-logic/latches-flip-flops]]).

::: definition Static noise margin {#def-snm}
Plot the transfer characteristic of one inverter of the cell, $V_{\overline Q} = f_1(V_Q)$, and the mirror image of the other, $V_Q = f_2(V_{\overline Q})$, on the same axes. The **static noise margin** is the side of the largest square that fits inside the smaller of the two lobes of the resulting butterfly. It is the largest DC noise voltage that, applied in series with both inverter inputs in the most unfavourable polarity, does not flip the cell. The **hold SNM** uses the inverters with the word line low; the **read SNM** uses their characteristics with the access transistors on and the bit lines at $V_{DD}$, which raise the low output level.
:::

During a read, each inverter's low output is not $0$ but the read disturb voltage $V_Q$ of [[#prop-read]], and its transfer curve is flattened. The butterfly's lobes shrink, and the read SNM is typically less than half of the hold SNM. Seevinck, List and Lohstroh showed in 1987 how to compute the SNM analytically and from simulation; it is now the standard figure quoted for every SRAM cell.

::: widget plot
f: r + (1 - r)/(1 + exp(g*(x - 0.5))); 0.5 + ln(max((1 - r)/max(x - r, 0.0001) - 1, 0.0001))/g
x: 0, 1
y: 0, 1
sliders: r=0:0:0.3:0.01; g=15:6:30:0.5
labels: V_{\overline Q} = f(V_Q); V_Q = f(V_{\overline Q})
caption: Butterfly diagram of an SRAM cell (voltages normalised to $V_{DD}$), with an idealised inverter of steepness $g$ whose low output level is raised to $r$ by the read current through the access transistor. With $r = 0$ (hold) the lobes are large; the static noise margin is the side of the largest square that fits in a lobe. Raise $r$ to $0.15$–$0.2$, typical of a read: the lobes shrink markedly. Reduce $g$ as well (a lower supply gives less gain) and at some point the lobes vanish and the cell cannot hold its data during a read.
:::

### Variation and the minimum voltage

SRAM cells use the smallest transistors on the chip, and small transistors vary. The threshold voltage of a MOSFET has a random component from the discrete number and positions of dopant atoms, line-edge roughness and gate-metal grain orientation, whose standard deviation follows **Pelgrom's law**:

$$
\sigma(\Delta V_{th}) = \frac{A_{V_T}}{\sqrt{WL}},
$$ {#eq-pelgrom}

for the threshold difference between two nominally identical transistors, where $A_{V_T}$ is a process constant of about $1$–$2\,\mathrm{mV\cdot\mu m}$ in modern processes. For a cell transistor with $W = 50\,\mathrm{nm}$ and $L = 30\,\mathrm{nm}$, $\sqrt{WL} = 0.039\,\mathrm{\mu m}$, and with $A_{V_T} = 1.5\,\mathrm{mV\cdot\mu m}$ the standard deviation is about $39\,\mathrm{mV}$. A memory with $10^8$ cells must work when its worst cell is a $6\sigma$ outlier, where thresholds may be $0.2\,\mathrm V$ away from nominal. That, not the nominal design, sets the lowest supply at which the array works, called $V_{min}$.

Because SRAM limits the supply, modern chips use **assist circuits** that strengthen one operation temporarily: lowering the word-line voltage during reads (improving read stability), driving the bit line slightly below ground during writes (**negative bit line**, improving writability), or collapsing the cell supply during writes. Arrays are often on a separate, slightly higher supply rail than logic. For register files and low-voltage caches, the **8T cell** adds a separate two-transistor read port, so that reading never disturbs the storage nodes and the cell can be optimised for writing alone.

As of 2026 the densest 6T cells in leading processes have areas of about $0.02\,\mathrm{\mu m^2}$, and SRAM density has been improving much more slowly than logic density, because the cell's transistors cannot be shrunk without losing stability; this is one motivation for alternative on-chip memories and for stacking SRAM dies on top of logic.

## Sense amplifiers

A cell has a minimum-size access and pull-down transistor in series, so its read current is small — of the order of $10$–$50\,\mathrm{\mu A}$ — while its bit line, shared by hundreds of cells, has a capacitance of tens of femtofarads. Discharging the bit line fully would take nanoseconds. Instead, the read stops as soon as a **small differential signal** has developed between $BL$ and $\overline{BL}$, and a sense amplifier amplifies it to a full logic level.

::: example Bit-line sensing time {#ex-sense}
A bit line with $256$ cells has $C_{BL} = 50\,\mathrm{fF}$, and the cell read current is $20\,\mathrm{\mu A}$. How long does it take to develop a $100\,\mathrm{mV}$ differential signal, and how long would a full $1\,\mathrm V$ swing take? A latch-type sense amplifier with regeneration time constant $\tau = 4\,\mathrm{ps}$ then amplifies the $100\,\mathrm{mV}$ signal to $1\,\mathrm V$; how long does that take?
::: solution
The precharged $BL$ discharges at $I/C_{BL}$ while $\overline{BL}$ stays at $V_{DD}$. Developing $100\,\mathrm{mV}$ takes $t = C_{BL}\Delta V/I = 50\times10^{-15}\times0.1/20\times10^{-6} = 250\,\mathrm{ps}$; a full swing would take $2.5\,\mathrm{ns}$. The sense amplifier, a cross-coupled latch whose imbalance grows as $e^{t/\tau}$ ([[digital-ic/sequential-circuits-clocking#eq-tau-meta]]), needs $\tau\ln(1/0.1) = 4\times2.30 = 9.2\,\mathrm{ps}$. Sensing a small swing cuts the bit-line time by a factor of ten and saves the energy of charging the bit lines back from a full swing.
:::
:::

The most common circuit is the **latch-type sense amplifier**: a cross-coupled inverter pair, connected to the bit lines through isolation transistors or directly, enabled by a **sense-enable** signal that turns on its tail current once enough signal has developed. Its two disadvantages are offset and timing. Mismatch between its transistors creates an input-referred **offset**, by [[#eq-pelgrom]]: with sense-amplifier transistors of $0.5\,\mathrm{\mu m}\times0.1\,\mathrm{\mu m}$ and $A_{V_T} = 1.5\,\mathrm{mV\cdot\mu m}$, $\sigma = 1.5/\sqrt{0.05} = 6.7\,\mathrm{mV}$, and a $6\sigma$ design needs a bit-line signal of at least $40\,\mathrm{mV}$ plus margin for noise. And the sense-enable signal must fire neither too early (before the signal exceeds the offset) nor too late (wasting time): it is generated by a **replica** bit line, a dummy column of cells that tracks the real ones across process, voltage and temperature.

::: warning Sense too early and you read noise
A sense amplifier decides on the sign of whatever differential voltage it sees at the moment it is enabled, including its own offset, coupling noise from neighbouring bit lines and leakage from the unselected cells on the column. A design that works with nominal transistors may fail in the slowest corner, where the cell current is lowest, or in the presence of a strong neighbour. Timing margins of memories are set by statistical analysis of the weakest cell, the worst sense-amplifier offset and the slowest corner together, not by nominal values.
:::

## DRAM

A DRAM cell is one access transistor and one capacitor $C_s$, storing a bit as charge. A read connects the cell to a bit line precharged to $V_{DD}/2$, producing a signal $\Delta V = \pm\tfrac{V_{DD}}2C_s/(C_s + C_{BL})$ by charge sharing ([[digital-logic/memories-programmable-logic]]), which a sense amplifier — a cross-coupled latch connected to the bit line and a reference bit line — amplifies and writes back into the cell. Three circuit problems dominate DRAM design.

**Retention.** The stored charge leaks away through the access transistor's subthreshold current, junction leakage and gate-induced drain leakage. Every row must be refreshed within the retention time, which the DDR standards set at $64\,\mathrm{ms}$ at normal temperature. That requires extraordinarily low leakage.

::: example Leakage budget of a DRAM cell {#ex-retention}
A DRAM cell has $C_s = 10\,\mathrm{fF}$ and must lose no more than $0.2\,\mathrm V$ of its stored high level in $64\,\mathrm{ms}$. What is the maximum average leakage current? Compare with the off-current of a logic transistor, about $1\,\mathrm{nA}$ for a $100\,\mathrm{nm}$-wide low-threshold device.
::: solution
$I_{max} = C_s\Delta V/t = 10\times10^{-15}\times0.2/0.064 = 3.1\times10^{-14}\,\mathrm A = 31\,\mathrm{fA}$. That is about $30\,000$ times less than the logic transistor. DRAM access transistors therefore have high thresholds, long recessed or buried channels, word lines held below ground when off (a negative off-voltage, which pushes the transistor deep into subthreshold), and are kept cool: the retention time halves for every $10$ degrees or so of temperature rise, which is why DRAM refreshes twice as often above $85\,^\circ\mathrm C$.
:::
:::

**The boosted word line.** A high-threshold nMOS access transistor with its gate at $V_{DD}$ could write only $V_{DD} - V_{th}$ into the capacitor ([[digital-ic/static-cmos-logic#thm-vth-drop]]), losing a large part of the signal. DRAM word lines are therefore driven to a boosted voltage $V_{PP}$ above the array supply by more than a threshold (including the body effect). The DDR4 standard, for example, supplies a separate $2.5\,\mathrm V$ rail for this purpose.

**Signal and noise.** The bit-line signal is about $100\,\mathrm{mV}$, and the arrays are dense, so coupling between bit lines is severe. **Folded** bit lines place the reference bit line next to the active one in the same array, so that noise couples equally into both and is rejected as common mode; denser **open** bit-line arrays place them in adjacent arrays and rely on careful layout. The storage capacitor itself is a tall, narrow cylinder or pillar above the transistor, with an aspect ratio of fifty or more, in a cell occupying about $6F^2$ (where $F$ is the half-pitch of the word and bit lines).

As of 2026, DRAM processes are in their "1b/1c" generations with half-pitches in the low teens of nanometres, the cell capacitance has stayed of order $10\,\mathrm{fF}$ only by making the capacitors ever taller, and three-dimensionally stacked DRAM cells are being developed as the next step.

## Flash memory

Flash memory stores a bit as charge on an insulated electrode — a polysilicon **floating gate** or, in modern 3D NAND, a **charge-trap** layer of silicon nitride — between the control gate and the channel of a MOSFET. The charge shifts the transistor's threshold voltage as seen from the control gate.

::: proposition Threshold shift of a floating-gate transistor {#prop-flash}
Let the floating gate be coupled to the control gate by $C_{CG}$ and to the channel, source, drain and body by capacitances totalling $C_{rest}$, so that $C_T = C_{CG} + C_{rest}$. If a charge $Q_{FG}$ is stored on the floating gate, the threshold voltage measured at the control gate is

$$
V_{th,CG} = \frac{C_T}{C_{CG}}\,V_{th,FG} - \frac{Q_{FG}}{C_{CG}},
$$ {#eq-flash}

where $V_{th,FG}$ is the threshold of the underlying transistor referred to its floating gate. Stored electrons ($Q_{FG} < 0$) raise the threshold by $\lvert Q_{FG}\rvert/C_{CG}$.
:::

::: proof
With the source, drain and body at ground, the floating gate is the middle node of a capacitive divider, and charge conservation on it gives $C_{CG}(V_{FG} - V_{CG}) + C_{rest}V_{FG} = Q_{FG}$, so $V_{FG} = (C_{CG}V_{CG} + Q_{FG})/C_T$. The transistor turns on when $V_{FG}$ reaches $V_{th,FG}$; solving for $V_{CG}$ gives [[#eq-flash]]. The ratio $C_{CG}/C_T$ is the **coupling ratio**, typically $0.5$–$0.7$.
:::

Each electron on a gate coupled by $C_{CG} = 1\,\mathrm{fF}$ shifts the threshold by $q/C_{CG} = 0.16\,\mathrm{mV}$, so a shift of a volt or so corresponds to a few thousand electrons in an older cell. In a modern cell the capacitances are much smaller and a few hundred electrons — or fewer — separate one stored level from the next; the loss of a handful of them over years sets the cell's **retention**.

Cells are **programmed** (electrons added) by **Fowler–Nordheim tunnelling** through the thin tunnel oxide under a high control-gate voltage of about $15$–$20\,\mathrm V$, or in NOR flash by **channel hot-electron injection**, and **erased** by tunnelling in the opposite direction. The high voltages are generated on chip by charge pumps. Each program–erase cycle damages the tunnel oxide slightly, so cells wear out after some thousands of cycles in dense NAND to around $10^5$ in NOR.

**NOR and NAND arrays.** In **NOR flash** each cell connects a bit line to ground, as in a NOR gate: any cell can be read directly and quickly, which suits code storage executed in place. In **NAND flash** cells are connected in series **strings** of dozens to hundreds, sharing a single bit-line contact: the unselected word lines of a string are driven to a pass voltage that turns their cells on regardless of their charge, and the selected word line is set to a read voltage, so that the string conducts only if the selected cell's threshold is below it. NAND has no contacts inside the string and is far denser, at the cost of slow random access: it is read and programmed in pages of kilobytes and erased in blocks of megabytes.

**Multi-level cells.** Since a cell's threshold is an analogue quantity, it can store more than one bit by being programmed to one of $2^b$ threshold levels: two bits (MLC), three (TLC) or four (QLC). The levels must fit in a threshold window of a few volts, and each level is a distribution (programming is imprecise, and charge leaks and disturbs over time), so more bits per cell mean narrower spacing, slower and more careful programming, more errors and lower endurance. Strong error-correcting codes in the controller make QLC usable.

::: widget plot
f: sum(exp(-(x - 0.5 - k*w/(2^b - 1))^2/(2*s^2)), k, 0, 2^b - 1)
x: 0, 6
y: 0, 1.2
sliders: b=3:1:4:1; s=0.12:0.05:0.4:0.01; w=5:3:5.5:0.1
labels: \text{cells per threshold level (relative)}
caption: Threshold-voltage distributions (horizontal axis in volts) of a multi-level flash page storing $b$ bits per cell in a threshold window of $w$ volts, each level a Gaussian of standard deviation $s$ (V). With $b = 3$ (TLC, eight levels) and $s = 0.12\,\mathrm V$ the levels are well separated. Switch to $b = 4$ (QLC, sixteen levels): the spacing falls to about $0.33\,\mathrm V$. Widen $s$ to $0.2\,\mathrm V$, as after many program–erase cycles or long storage, and the distributions overlap: the read thresholds between them misclassify a growing fraction of cells, which the error-correcting code must repair.
:::

**3D NAND.** Planar NAND stopped shrinking around the $15\,\mathrm{nm}$ generation, when neighbouring cells interfered too strongly and too few electrons were left per cell. Since 2013 NAND has instead grown vertically: dozens to hundreds of word-line layers are stacked, and the channels are vertical polysilicon cylinders through the stack, each surrounded by a charge-trap layer, with each layer forming one cell of the string. As of 2026, products with around $200$ to over $300$ layers are in volume production, storing a terabit or more per die.

::: example Levels in a QLC cell {#ex-qlc}
A QLC cell has a usable threshold window of $5\,\mathrm V$. (a) What is the spacing between adjacent levels? (b) If the control-gate coupling capacitance is $C_{CG} = 0.2\,\mathrm{fF}$, how many electrons separate adjacent levels? (c) If the read thresholds are placed midway between levels and each level's distribution is Gaussian with $\sigma = 0.1\,\mathrm V$, what fraction of cells of one level are misread as a neighbouring level (on one side)?
::: solution
(a) Sixteen levels need fifteen gaps: $5/15 = 0.33\,\mathrm V$.

(b) By [[#prop-flash]], $\Delta Q = C_{CG}\Delta V_{th} = 0.2\times10^{-15}\times0.333 = 6.7\times10^{-17}\,\mathrm C$, about $416$ electrons.

(c) The read threshold is $0.167\,\mathrm V$ from the level centre, i.e. $1.67\sigma$; the one-sided tail probability of a Gaussian beyond $1.67\sigma$ is about $4.8\,\%$. That raw error rate is far too high to use without coding — real devices keep $\sigma$ smaller by careful, iterative program-and-verify and rely on strong error-correcting codes (LDPC) that correct raw bit error rates of the order of $10^{-3}$–$10^{-2}$.
:::
:::

## Redundancy and error correction

A memory chip with billions of cells cannot be manufactured without defective cells. Two techniques make it work anyway.

**Redundancy.** Each array includes **spare rows and columns**. After testing, the addresses of faulty rows and columns are programmed into fuses (laser-blown links or electrically programmable elements), and comparators in the decoder redirect accesses from a faulty line to a spare. If defects that each kill one row arrive as a Poisson process with mean $\lambda$ per array ([[digital-ic/cmos-fabrication#thm-yield]]), an array with $s$ spare rows works if it has at most $s$ such defects:

$$
Y = \sum_{j=0}^{s}e^{-\lambda}\frac{\lambda^j}{j!}.
$$ {#eq-redundancy}

With $\lambda = 2$, an array without spares yields $e^{-2} = 13.5\,\%$; with four spare rows, $e^{-2}(1 + 2 + 2 + \tfrac43 + \tfrac23) = 7e^{-2} = 94.7\,\%$. A few per cent of extra area turns an unmanufacturable array into a profitable one.

**Error-correcting codes.** Soft errors — bits flipped by alpha particles from packaging materials or by neutrons from cosmic rays — and the occasional weak cell that fails in the field are corrected by codes. Caches and server DRAM use **single-error-correcting, double-error-detecting** (SECDED) Hamming codes, which protect a $64$-bit word with $8$ check bits (a $(72, 64)$ code); DDR5 devices include on-die ECC as well. Flash uses much stronger BCH and LDPC codes over whole pages. To keep a single particle strike from flipping several bits of the same word, the bits of each word are **interleaved** physically, so that adjacent cells belong to different words.

::: quiz
Why are the bits of one word spread across non-adjacent columns of an SRAM array rather than stored side by side?
- [ ] to make the column multiplexer smaller
- [x] so that a particle strike or defect affecting several adjacent cells corrupts at most one bit of any word, which SECDED can correct
- [ ] to equalise the bit-line capacitances
- [ ] because adjacent cells cannot be read at the same time
::: solution
A single energetic particle can deposit charge in several neighbouring cells, and some defects affect adjacent cells. With interleaving, those cells belong to different words, each of which suffers at most a single-bit error that the $(72, 64)$ code corrects. Interleaving also simplifies the layout of column multiplexers, but its main purpose is error resilience.
:::
:::

## Design and practice

Memory design is a balance between density, speed, power and robustness at the margin. On processor chips, the levels of the cache hierarchy use different cells and organisations: small, fast register files with multi-port 8T or larger cells; level-1 caches optimised for latency; large last-level caches optimised for density and leakage, with power gating of unused ways and drowsy modes that lower the cell supply when idle. Some processors stack extra SRAM dies directly on top of the logic die with hybrid bonding to increase cache capacity without enlarging the die. Off chip, DRAM is organised into banks and ranks behind interfaces such as DDR5, LPDDR5X and stacked high-bandwidth memory (HBM), whose memory controllers schedule activations and refreshes ([[computer-architecture/memory-hierarchy]]). Emerging non-volatile memories — magnetoresistive RAM (MRAM), resistive RAM and ferroelectric memories — are in production as embedded memories in some processes as of 2026, mainly replacing embedded flash in microcontrollers, but have not displaced SRAM or DRAM for main storage.

::: application The memory wall
Processor speed has grown much faster than DRAM latency, which has stayed around $50$–$100\,\mathrm{ns}$ for decades because it is set by the RC delays of long word and bit lines, the time to sense a small charge, and the precharge and restore cycle. A processor running at $4\,\mathrm{GHz}$ waits hundreds of cycles for a DRAM access. Caches built from the SRAM arrays of this chapter hide most of that latency, and wide interfaces and many banks provide bandwidth; the energy of moving data from DRAM, hundreds of times that of an arithmetic operation on it, is one of the main drivers of the trend to put more memory close to, or on top of, the logic.
:::

::: history
The six-transistor static cell grew out of the bipolar and MOS flip-flop memories of the mid-1960s; Intel's 1101 (1969) was an early MOS SRAM. Robert Dennard invented the one-transistor DRAM cell at IBM in 1967, and Intel's 1103 of 1970 became the first commercially successful DRAM. Dawon Kahng and Simon Sze proposed the floating-gate memory transistor at Bell Laboratories in 1967, and Dov Frohman at Intel invented the EPROM in 1971. Fujio Masuoka at Toshiba invented flash memory, presenting NOR flash in 1984 and NAND flash in 1987. Evert Seevinck, Frans List and Jan Lohstroh published their analysis of the static noise margin of SRAM cells in 1987, and Marcel Pelgrom and colleagues their model of transistor mismatch in 1989. Toshiba proposed vertical "bit-cost scalable" NAND in 2007, and Samsung began volume production of 3D NAND in 2013.
:::

## Where this leads

The arrays of this chapter are the building blocks of the memory hierarchy analysed in [[computer-architecture/memory-hierarchy]], and of the block RAMs and configuration memory of FPGAs in [[digital-logic/memories-programmable-logic]]. Their sense amplifiers are close relatives of the comparators used in [[electronics-2/data-converters]]. Embedded flash and its successors store the programs of the microcontrollers in [[embedded-systems/microcontrollers]].

::: summary
- A memory array consists of a cell matrix with row decoders and word-line drivers, precharged bit lines, column multiplexers and sense amplifiers; large memories are divided into sub-arrays to keep lines short.
- Decoders have large electrical and branching efforts; logical effort gives the best number of stages (about $\log_4 F$), and predecoding keeps the gates at the array simple.
- The 6T SRAM cell needs pull-down $>$ access $>$ pull-up: the cell ratio limits the read-disturb voltage, and the pull-up ratio must be small enough for the access transistor to win a write.
- The static noise margin, the largest square in the butterfly diagram, measures robustness; reads shrink it, and Pelgrom mismatch $\sigma = A_{V_T}/\sqrt{WL}$ in tiny cells sets the minimum supply.
- Sense amplifiers resolve bit-line signals of tens of millivolts, saving time and energy; their offset and enable timing set the required signal.
- DRAM cells need leakage of tens of femtoamperes for $64\,\mathrm{ms}$ retention and boosted word lines to write full levels; flash cells shift their threshold by $Q/C_{CG}$ and store several bits per cell in 3D NAND strings.
- Spare rows and columns, with yield $\sum_{j\le s}e^{-\lambda}\lambda^j/j!$, and error-correcting codes make billion-cell arrays manufacturable and reliable.
:::

## Exercises

::: exercise Organising the array {level=1 check="8"}
A $64\,\mathrm{KiB}$ SRAM is built as $8$ sub-arrays of $256$ rows by $256$ columns each. How many row-address bits does each sub-array's decoder need?
::: solution
Each sub-array has $256 = 2^8$ rows, so $8$ row-address bits. (Check of capacity: $8\times256\times256 = 524\,288$ bits $= 64\,\mathrm{KiB}$.) Of the $16$ address bits of a $64\,\mathrm{Ki}\times8$ organisation, $3$ select the sub-array, $8$ the row and $5$ the column group (each row of $256$ cells holds $32$ interleaved bytes).
:::
:::

::: exercise Bit-line signal time {level=1 check="80e-15*0.08/30e-6"}
A bit line of $80\,\mathrm{fF}$ is discharged by a cell current of $30\,\mathrm{\mu A}$. How long, in seconds, until the differential signal reaches $80\,\mathrm{mV}$?
::: solution
$t = C\Delta V/I = 80\times10^{-15}\times0.08/30\times10^{-6} = 213\,\mathrm{ps}$.
:::
:::

::: exercise Pelgrom mismatch {level=1 check="1.2/sqrt(0.2*0.05)"}
With $A_{V_T} = 1.2\,\mathrm{mV\cdot\mu m}$, find the standard deviation, in millivolts, of the threshold mismatch of a transistor pair with $W = 0.2\,\mathrm{\mu m}$ and $L = 0.05\,\mathrm{\mu m}$.
::: solution
$\sigma = 1.2/\sqrt{0.01} = 12\,\mathrm{mV}$, by [[#eq-pelgrom]]. Quadrupling the area would halve it.
:::
:::

::: exercise Read disturb with a weaker cell {level=2}
A cell is designed with $CR = 1.5$ at $V_{DD} = 1\,\mathrm V$ and $V_{th} = 0.3\,\mathrm V$. Because of random variation, one cell's access transistor is $30\,\%$ stronger and its pull-down $20\,\%$ weaker than nominal. Find its read-disturb voltage and compare with the nominal $0.158\,\mathrm V$.
::: solution
The effective cell ratio is $1.5\times0.8/1.3 = 0.923$. Solving $\tfrac12(0.7 - V)^2 = 0.923(0.7V - V^2/2)$ by bisection gives $V_Q = 0.215\,\mathrm V$ — close to the threshold of the opposite pull-down. Including the threshold variations themselves (which this exercise ignores) can push such a cell over the edge, which is why read stability is analysed statistically.
:::
:::

::: exercise Write margin {level=2 check="2*(0.7*0.2 - 0.02)/0.49"}
Using [[#eq-write]] with $V_{DD} = 1\,\mathrm V$ and both thresholds $0.3\,\mathrm V$, find the largest pull-up ratio $PR$ for which the written node falls to $0.2\,\mathrm V$ or below.
::: solution
Setting $V = 0.2$: $\tfrac{PR}{2}(0.49) = 0.7\times0.2 - 0.02 = 0.12$, so $PR = 0.24/0.49 = 0.49$. A stricter write requirement forces a weaker pull-up.
:::
:::

::: exercise DRAM signal {level=2 check="0.55*8/(8 + 60)"}
A DRAM cell of $8\,\mathrm{fF}$ shares charge with a bit line of $60\,\mathrm{fF}$ precharged to $V_{DD}/2 = 0.55\,\mathrm V$. Find the read signal in volts for a stored $1$, and the largest bit-line capacitance for which the signal is at least $50\,\mathrm{mV}$.
::: solution
$\Delta V = 0.55\times8/68 = 64.7\,\mathrm{mV}$. For $\Delta V \ge 0.05$: $8/(8 + C_{BL}) \ge 0.0909$, so $C_{BL} \le 80\,\mathrm{fF}$. Longer bit lines must be split.
:::
:::

::: exercise Redundancy {level=2 check="exp(-3)*(1 + 3 + 9/2 + 27/6 + 81/24 + 243/120 + 729/720)"}
Defects that each kill one row arrive as a Poisson process with mean $3$ per array. Find the yield (as a fraction) of an array with $6$ spare rows. How many spares give $99\,\%$?
::: solution
By [[#eq-redundancy]], $Y = e^{-3}\sum_{j=0}^{6}3^j/j! = 0.0498\times(1 + 3 + 4.5 + 4.5 + 3.375 + 2.025 + 1.0125) = 0.0498\times19.41 = 0.966$. Adding the $j = 7$ term ($0.0216$) gives $0.988$ and $j = 8$ ($0.0081$) gives $0.996$, so $8$ spares give over $99\,\%$.
:::
:::

::: exercise Floating-gate charge {level=3}
A floating-gate cell has $C_{CG} = 0.5\,\mathrm{fF}$ and $C_{rest} = 0.3\,\mathrm{fF}$, and the underlying transistor has $V_{th,FG} = 0.5\,\mathrm V$. (a) Find the erased threshold seen at the control gate (no stored charge). (b) How many electrons must be stored to raise it to $3\,\mathrm V$? (c) During a read, the unselected cells of a NAND string have their control gates at a pass voltage $V_{pass} = 6\,\mathrm V$. What is their floating-gate voltage if they store the charge of (b), and why must $V_{pass}$ not be too high?
::: solution
(a) $C_T = 0.8\,\mathrm{fF}$; by [[#eq-flash]] with $Q = 0$, $V_{th,CG} = (0.8/0.5)\times0.5 = 0.8\,\mathrm V$.

(b) The shift needed is $2.2\,\mathrm V$, so $\lvert Q\rvert = C_{CG}\times2.2 = 1.1\times10^{-15}\,\mathrm C$, about $6900$ electrons.

(c) $V_{FG} = (C_{CG}V_{CG} + Q)/C_T = (0.5\times6 - 1.1)/0.8 = 2.4\,\mathrm V$, comfortably above $V_{th,FG}$, so the cell conducts whatever its state. Too high a pass voltage would create a field across the tunnel oxide large enough to inject a few electrons on every read (**read disturb**), slowly programming the unselected cells; controllers count reads per block and refresh heavily read blocks.
:::
:::

::: exercise Designing a word-line driver {level=3}
A word line drives $512$ cells, each presenting $0.15\,\mathrm{fF}$ of access-transistor gate capacitance, plus $0.2\,\mathrm{fF/\mu m}$ of wire over a row $130\,\mathrm{\mu m}$ long, with wire resistance $3\,\Omega/\mathrm{\mu m}$. The final NAND2 of the decoder, at the row pitch, can present only $4$ units ($0.4\,\mathrm{fF}$) of input capacitance. (a) Find the word-line capacitance and its distributed RC delay. (b) Design the inverter chain between the NAND2 and the word line (logical effort, reference process) and find the driver delay. (c) Is it worth driving the word line from both ends?
::: hint
Use [[digital-ic/interconnect#eq-t50-distributed]] for the wire and treat the cell gates as distributed along it.
:::
::: solution
(a) $C_{WL} = 512\times0.15 + 130\times0.2 = 76.8 + 26 = 103\,\mathrm{fF}$, and $R_{WL} = 390\,\Omega$. With the gate load distributed uniformly along the line, the far-end delay is about $0.38R_{WL}C_{WL} = 0.38\times390\times103\times10^{-15} = 15\,\mathrm{ps}$.

(b) In units of $0.1\,\mathrm{fF}$, $H = 1030/4 = 258$ for the NAND2 plus the chain, with $G = 4/3$: $F = 344$, $\log_4F = 4.2$, so about $4$ stages — the NAND2 and three inverters (odd number of inverters makes the word line active high when the NAND2 output is low). $\hat f = 344^{1/4} = 4.31$, $P = 2 + 3 = 5$, $\hat D = 17.2 + 5 = 22.2\tau = 46\,\mathrm{ps}$. The last inverter has input $1030/4.31 = 239$ units, about $80$ times unit size.

(c) Driving from both ends halves the length seen by each driver, cutting the distributed delay to a quarter ($3.8\,\mathrm{ps}$) and halving each driver's load, but doubles the drivers and their area. With the wire delay only a third of the driver delay here, a single driver is adequate; for longer rows or more resistive word lines (such as polysilicon or tungsten word lines in DRAM), segmented or double-ended word lines are used.
:::
:::
