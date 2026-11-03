A register file of 32 words is built from flip-flops. A gigabyte of main memory is not: a flip-flop needs some twenty transistors, and $8\times10^9$ bits would need far more transistors than any chip can hold. Large memories trade the flip-flop's speed and convenience for density, packing each bit into a cell of six transistors (static RAM), one transistor and one capacitor (dynamic RAM) or a single transistor with a trapped charge (flash), and they organise those cells into two-dimensional arrays with shared decoders and amplifiers at the edges.

The same array idea gives programmable logic. A read-only memory is a truth table in silicon; a programmable logic array is a configurable sum of products; and a field-programmable gate array is a sea of small memories used as truth tables, flip-flops and programmable wiring, all set by configuration bits. This chapter explains how memories are organised and how their cells work at the level a logic designer needs, and how logic is mapped onto programmable devices. The transistor-level design of memory arrays is treated in [[digital-ic/memory-arrays]].

## Memory organisation

::: definition Memory array {#def-memory}
A **$2^n \times m$ memory** stores $2^n$ **words** of $m$ bits. An $n$-bit **address** selects one word; a **read** delivers the selected word on the data outputs, and a **write** replaces it with the word on the data inputs. The **capacity** is $2^n m$ bits. Memory that keeps its contents without power is **non-volatile**; otherwise it is **volatile**.
:::

Capacities use binary prefixes: $1\,\mathrm{Ki} = 2^{10} = 1024$, $1\,\mathrm{Mi} = 2^{20}$, $1\,\mathrm{Gi} = 2^{30}$. A "$64\,\mathrm{Ki}\times 8$" memory has $2^{16}$ addresses of one byte each.

Physically the bits sit in a two-dimensional **array** of cells. Horizontal **word lines** run along the rows; vertical **bit lines** run along the columns. A **row decoder** takes some of the address bits and raises exactly one word line, connecting every cell in that row to its bit line. At the bottom of the columns, **sense amplifiers** detect the small signals the cells produce, and a **column multiplexer** driven by the remaining address bits selects the $m$ bits of the addressed word out of the whole row. The array is kept roughly square, because a very tall array has long, slow bit lines and a very wide one long, slow word lines.

::: example Organising a 1 Mbit memory {#ex-org}
A $128\,\mathrm{Ki} \times 8$ SRAM is to be built as a square array. How many address bits are there, how are they split between rows and columns, and how wide is the column multiplexer?
::: solution
$128\,\mathrm{Ki} = 2^{17}$ words, so the address has $17$ bits, and the capacity is $2^{17}\times 8 = 2^{20}$ bits $= 1\,\mathrm{Mi}$bit. A square array has $\sqrt{2^{20}} = 2^{10} = 1024$ rows of $1024$ cells. Ten address bits drive a 10-to-1024 row decoder. Each row holds $1024/8 = 128$ words, so the other $7$ address bits drive the column multiplexers: eight 128-to-1 multiplexers, one per data bit, each choosing one column out of a group of $128$. (Real designs interleave the bits of a word across the row so that one defective column affects only one bit of many words.)
:::
:::

Speed is limited by the decoder, the word line, the bit line and the sense amplifier, in that order; large memories are divided into many smaller **sub-arrays** or **banks** to keep each of these short.

## Read-only memory

A **read-only memory** (ROM) stores fixed contents: the $2^n\times m$ ROM is an $n$-input, $m$-output combinational circuit whose truth table is the stored data. Conversely, any combinational function can be implemented by storing its truth table in a ROM — the address lines are the inputs, and each data bit is one output.

::: proposition A ROM is a decoder and an OR array {#prop-rom}
A $2^n \times m$ ROM is equivalent to an $n$-to-$2^n$ decoder generating all minterms of the address, followed by $m$ OR gates, where OR gate $j$ has an input from minterm $i$ exactly when bit $j$ of word $i$ is $1$. Hence output $j$ is the canonical sum of products $\sum_{i:\,w_{ij} = 1} m_i$.
:::

::: proof
For address $a$, exactly one decoder output, $m_a$, is $1$ ([[digital-logic/combinational-building-blocks#def-decoder]]). OR gate $j$ then outputs $1$ iff it has an input from $m_a$, i.e. iff $w_{aj} = 1$. So the outputs are word $a$, and output $j$ is the OR of the minterms of the addresses whose word has bit $j$ set.
:::

A ROM therefore implements the canonical form directly, without any minimisation: it pays for all $2^n$ minterms whether the function needs them or not. That is wasteful for functions with simple minimal forms, but ideal for irregular functions such as code converters, character generators, sine tables or the microcode of a processor's control unit.

The technologies differ in how and how often the contents can be set:

| type | programmed by | erasable | typical use |
|---|---|---|---|
| mask ROM | the manufacturer, via a mask layer | no | very high-volume fixed code |
| PROM / OTP | the user, by blowing fuses or antifuses once | no | small secure or calibration data |
| EPROM | the user, electrically | by ultraviolet light | historical firmware |
| EEPROM | the user, electrically | electrically, byte by byte | configuration data |
| flash | the user, electrically | electrically, in large blocks | firmware, solid-state storage |

**Flash memory** stores each bit as charge on a floating gate (or in a charge-trap layer) that shifts the threshold voltage of a transistor. NOR flash connects cells in parallel and allows fast random reads, so microcontrollers execute code directly from it; NAND flash connects cells in series strings, which is far denser but supports only page-wise reads and block-wise erasure. As of 2026 NAND flash chips stack several hundred layers of cells vertically and store three or four bits per cell by distinguishing eight or sixteen threshold levels.

::: example A ROM multiplier {#ex-rom}
How large a ROM is needed to implement a $4\times 4$-bit unsigned multiplier as a look-up table, and what is stored at address $1011\,0110$?
::: solution
The two 4-bit operands form an 8-bit address, so there are $2^8 = 256$ words. The largest product is $15\times15 = 225 < 256$, so each word needs $8$ bits. The ROM is $256\times 8 = 2048$ bits. Address $1011\,0110$ holds the product of $1011 = 11$ and $0110 = 6$, namely $66 = 0100\,0010_2$.

The table grows as $2^{2n}\times 2n$ bits: an $8\times 8$ multiplier needs $2^{16}\times16 = 1\,\mathrm{Mi}$bit, and a $16\times16$ one $2^{32}\times 32 = 128\,\mathrm{Gi}$bit — which is why multipliers are built from adders ([[computer-architecture/computer-arithmetic]]), and ROMs are used only for small or irregular functions.
:::
:::

## Static RAM

A **static RAM** (SRAM) cell is the bistable pair of cross-coupled inverters of [[digital-logic/latches-flip-flops#prop-bistable]], plus two **access transistors** that connect its two nodes to a complementary pair of bit lines, $BL$ and $\overline{BL}$, when the word line is high. The cell has six transistors (**6T**) and holds its bit as long as power is applied — "static" because it needs no refreshing.

- **Read.** Both bit lines are **precharged** high. The word line rises; on the side storing $0$, the cell's nMOS transistor slowly discharges its bit line through the access transistor. Long before the swing is complete, a **sense amplifier** — itself a cross-coupled latch — detects a difference of some tens of millivolts between $BL$ and $\overline{BL}$ and amplifies it to a full logic level. The cell transistors must be sized so that the read current cannot flip the cell (**read stability**).
- **Write.** Write drivers force one bit line to $0$ and the other to $1$; when the word line rises, the strong drivers overpower the cell's inverters and flip it if necessary (**writability**). The tension between read stability and writability is the central problem of SRAM cell design.

SRAM is fast — a few hundred picoseconds per access for on-chip arrays — and is used for caches, register files of large size and the block memories of FPGAs. As of 2026 the high-density SRAM cells of the most advanced logic processes occupy about $0.02\,\mathrm{\mu m^2}$, and SRAM often takes more than half of the area of a large processor or AI accelerator chip.

Externally, a memory is **asynchronous** if a read is a combinational function of the address (the data appears an access time after the address changes) and **synchronous** if address and control are registered on a clock edge and the data appears after one or more cycles. On-chip memories and FPGA block RAMs are almost always synchronous, which fits the timing discipline of [[digital-logic/latches-flip-flops]]: a synchronous RAM is, to a designer, a very large register file with a one-cycle read latency.

::: quiz
A synchronous single-port RAM has a one-cycle read latency. In cycle $t$ the address $5$ is presented with a read request; in cycle $t+1$ address $9$ is presented with a write of value $42$. When is the data of address $5$ available, and what value is it?
- [ ] in cycle $t$; whatever address 5 holds
- [x] in cycle $t+1$; the value address 5 held at the clock edge ending cycle $t$
- [ ] in cycle $t+1$; the value $42$
- [ ] in cycle $t+2$; whatever address 5 holds then
::: solution
The address is registered at the clock edge that ends cycle $t$, and the read data appears during cycle $t+1$. It is the content of address $5$, unaffected by the write to address $9$. The write itself takes effect at the edge ending cycle $t+1$. (If the write had been to address $5$ *in the same cycle as the read*, the result would depend on the RAM's "read-during-write" behaviour, which the datasheet must specify: old data, new data or undefined.)
:::
:::

## Dynamic RAM

A **dynamic RAM** (DRAM) cell is a single access transistor and a capacitor $C_s$: the bit is stored as charge, a full $V_{DD}$ for a $1$ and $0\,\mathrm{V}$ for a $0$. One transistor per bit instead of six makes DRAM several times denser than SRAM, which is why main memories are DRAM. The cost is in reading.

::: theorem DRAM charge sharing {#thm-chargeshare}
Let a DRAM cell with storage capacitance $C_s$ hold voltage $V_{cell} \in \{0, V_{DD}\}$, and let its bit line, of capacitance $C_{BL}$, be precharged to $V_{DD}/2$ and left floating. When the access transistor connects the two, the bit-line voltage changes by

$$
\Delta V = \pm\frac{V_{DD}}{2}\,\frac{C_s}{C_s + C_{BL}},
$$ {#eq-chargeshare}

positive for a stored $1$ and negative for a stored $0$. The read is **destructive**: afterwards the cell holds the bit-line voltage, not its original value.
:::

::: proof
Charge is conserved on the isolated pair of capacitors. Before connection the total charge is $C_sV_{cell} + C_{BL}V_{DD}/2$; afterwards both are at a common voltage $V_f$, so

$$
V_f = \frac{C_sV_{cell} + C_{BL}V_{DD}/2}{C_s + C_{BL}}, \qquad V_f - \frac{V_{DD}}{2} = \frac{C_s\,(V_{cell} - V_{DD}/2)}{C_s + C_{BL}},
$$

and $V_{cell} - V_{DD}/2 = \pm V_{DD}/2$. The cell now holds $V_f$, which differs from $V_{DD}/2$ by only $\abs{\Delta V}$, so its original level is lost unless it is rewritten.
:::

Because the bit line is much larger than the cell ($C_{BL}$ is typically several times $C_s$), $\Delta V$ is only some tens to a hundred millivolts. A sense amplifier compares the bit line with a reference (a neighbouring precharged bit line), amplifies the difference to a full swing, and — since it stays connected — **restores** the full value into the cell. Reading a row therefore reads and rewrites every cell in it.

::: widget plot
f: (V/2)/(1 + x)
x: 0.5, 15
y: 0, 0.6
sliders: V=1.1:0.8:1.5:0.05
vlines: 5
labels: \Delta V \text{ in volts}
caption: The read signal of a DRAM cell, $\Delta V = \tfrac{V_{DD}}{2}\,C_s/(C_s + C_{BL})$, against the ratio $r = C_{BL}/C_s$ on the horizontal axis. With $r = 5$ and $V_{DD} = 1.1\,\mathrm{V}$ the signal is about $92\,\mathrm{mV}$. Longer bit lines (more cells per column) raise $r$ and shrink the signal; this is why DRAM arrays are cut into short sub-arrays despite the cost of extra sense amplifiers.
:::

The charge also leaks away through the access transistor and the junction, so every cell must be read and rewritten — **refreshed** — periodically. The DDR standards of JEDEC require every row to be refreshed within $64\,\mathrm{ms}$ at normal temperature; the memory controller issues refresh commands, during which the bank cannot be accessed.

::: example DRAM read signal and refresh overhead {#ex-dram}
(a) A DRAM cell has $C_s = 20\,\mathrm{fF}$ on a bit line of $C_{BL} = 100\,\mathrm{fF}$, with an array voltage $V_{DD} = 1.1\,\mathrm{V}$. Find the read signal. (b) A DDR4 device must receive $8192$ refresh commands every $64\,\mathrm{ms}$, each blocking it for $t_{RFC} = 350\,\mathrm{ns}$. What fraction of the time is lost to refresh?
::: solution
(a) By [[#eq-chargeshare]], $\Delta V = 0.55\times 20/(20 + 100) = 0.55/6 = 0.0917\,\mathrm{V} \approx 92\,\mathrm{mV}$.

(b) The refresh interval is $64\,\mathrm{ms}/8192 = 7.8\,\mathrm{\mu s}$, and each refresh takes $350\,\mathrm{ns}$, so the fraction is $350\,\mathrm{ns}/7.8\,\mathrm{\mu s} = 0.045$, about $4.5$ %. Larger devices take longer to refresh, which is why newer standards add per-bank and same-bank refresh modes that keep the other banks available.
:::
:::

A DRAM chip is organised in **banks**, each an array of rows. An access first **activates** a row — reads the whole row (thousands of bits) into the sense amplifiers, which act as a **row buffer** — then **reads or writes** columns from the row buffer, and finally **precharges** the bit lines for the next row. Column accesses to an already open row are fast; opening a new row costs tens of nanoseconds. Memory controllers reorder requests to exploit open rows, and processors fetch whole cache lines in **bursts** from consecutive columns. As of 2026, DDR5 modules for computers and LPDDR5/5X for phones are the mainstream DRAM interfaces, and high-bandwidth memory (HBM) stacks of DRAM dies sit next to AI accelerators. See [[computer-architecture/memory-hierarchy]] for how these memories are used.

::: warning Volatile, non-volatile and "read-only"
SRAM and DRAM lose their contents when power is removed; ROM and flash do not. "Read-only" today usually means "rarely written": flash and EEPROM are written electrically but slowly, with a limited number of erase cycles (from about $10^3$ for dense NAND to $10^5$ or more for NOR and EEPROM), so they need wear-levelling for frequent updates. Do not keep a rapidly changing counter in flash.
:::

## Programmable logic devices

A ROM implements every minterm. Most functions need far fewer product terms, which suggests a device that implements a configurable *sum of minimised products*.

::: definition PLA and PAL {#def-pla}
A **programmable logic array** (PLA) with $n$ inputs, $p$ product terms and $m$ outputs has a programmable **AND plane**, in which each of the $p$ AND gates can be connected to any of the $2n$ literals, followed by a programmable **OR plane**, in which each of the $m$ OR gates can be connected to any of the $p$ products. A **programmable array logic** (PAL) device has a programmable AND plane but a fixed OR plane: each output is the OR of its own dedicated group of product terms.
:::

The size of a PLA is set by the number of *distinct* product terms in the minimised functions, so multiple-output minimisation, which shares products between outputs, pays off directly. Classic PAL devices such as the 22V10 (still made in small numbers) added a flip-flop and output multiplexer — a **macrocell** — to each output, making small state machines possible. **Complex PLDs** (CPLDs) put many PAL-like blocks on one chip with a switch matrix between them; they are non-volatile and start instantly, which keeps them in use for "glue" and power-sequencing logic.

::: example A three-output PLA {#ex-pla}
Implement $F_1 = A\overline{B} + AC$, $F_2 = AC + BC$ and $F_3 = A\overline{B} + B\overline{C}$ in a PLA. How many product terms and programmable connections are needed?
::: solution
The distinct products are $P_1 = A\overline{B}$, $P_2 = AC$, $P_3 = BC$, $P_4 = B\overline{C}$; $P_1$ and $P_2$ are each shared by two outputs. So the PLA needs $p = 4$ product terms, with $n = 3$ inputs and $m = 3$ outputs.

AND plane: each product uses two literals, $8$ connections (out of $p\times 2n = 24$ possible). OR plane: $F_1 = P_1 + P_2$, $F_2 = P_2 + P_3$, $F_3 = P_1 + P_4$, $6$ connections (out of $12$). Without sharing, the three outputs would need six product terms. A PAL with a fixed OR plane could not share $P_1$ and $P_2$ and would also need six.
:::
:::

## Field-programmable gate arrays

A **field-programmable gate array** (FPGA) abandons sum-of-products structure altogether. Its logic is built from small memories used as truth tables.

::: definition Look-up table and logic block {#def-lut}
A **$k$-input look-up table** ($k$-LUT) is a $2^k \times 1$ memory whose $k$ address inputs are the logic inputs and whose stored bits are the truth table of the desired function; reading it is a $2^k$-to-1 multiplexer tree selecting one configuration bit ([[digital-logic/combinational-building-blocks#thm-muxlogic]]). An FPGA **logic block** combines one or more LUTs with flip-flops, multiplexers that choose between the LUT output and its registered version, and a dedicated fast **carry chain** for adders. Logic blocks are embedded in a grid of programmable **routing**: wire segments joined by switches controlled by configuration bits.
:::

::: theorem LUT capacity and decomposition {#thm-lut}
A $k$-LUT implements any Boolean function of up to $k$ inputs in the same time. A function of $k + j$ inputs can be implemented with $2^j$ $k$-LUTs computing its cofactors with respect to $j$ of the inputs, followed by a $2^j$-to-1 multiplexer tree selected by those inputs.
:::

::: proof
The first statement holds because the LUT stores an arbitrary truth table of $2^k$ entries and its read path does not depend on the contents. For the second, apply the Shannon expansion ([[digital-logic/boolean-algebra#thm-shannon]]) about $j$ of the variables: $F = \sum_{s} m_s(x_1, \dots, x_j)\,F_s$, where the $2^j$ cofactors $F_s$ are functions of the remaining $k$ variables. Each cofactor fits in one $k$-LUT, and the sum is a multiplexer selected by $x_1, \dots, x_j$ ([[digital-logic/combinational-building-blocks#eq-mux]]).
:::

The decomposition is a worst case; most real functions of many inputs are far cheaper, because they are built from smaller sub-functions that each fit a LUT. As of 2026 the mainstream FPGAs from AMD (formerly Xilinx) and Intel's Altera use 6-input LUTs, often **fracturable** into two smaller LUTs sharing inputs, together with dedicated multiplexers that combine neighbouring LUTs into 7- and 8-input functions.

Beyond logic blocks, an FPGA contains **block RAMs** (synchronous SRAMs of tens of kilobits each, configurable in width and depth), **DSP blocks** (hard multiplier–accumulators), clock-management circuits (PLLs), high-speed serial transceivers, and often hard processor cores. Most FPGAs store their configuration in SRAM cells, so they must load a **bitstream** from an external flash memory at power-up; some families use on-chip flash or antifuses instead, and start instantly.

::: example Mapping onto LUTs {#ex-lutmap}
How many 6-LUTs does an 8-to-1 multiplexer need, without and with a dedicated 2-to-1 multiplexer following each pair of LUTs?
::: solution
An 8-to-1 mux has $8 + 3 = 11$ inputs, too many for one LUT. A 4-to-1 mux has $4 + 2 = 6$ inputs and fits in one 6-LUT. Using the Shannon expansion about the top select bit $S_2$, the 8-to-1 mux is two 4-to-1 muxes (on $D_0..D_3$ and $D_4..D_7$, both selected by $S_1S_0$) followed by a 2-to-1 mux selected by $S_2$.

Without dedicated muxes, the final 2-to-1 mux (3 inputs) needs a third LUT: $3$ LUTs and two LUT levels of delay. With a dedicated mux after the pair of LUTs (a feature of common FPGA logic blocks), it needs $2$ LUTs plus the mux, with much less delay than a second LUT and routing.
:::
:::

::: quiz
A designer needs the function $F = A_1 \oplus A_2 \oplus \cdots \oplus A_{12}$ (12-input parity) in an FPGA with 6-input LUTs. How many LUTs does a good mapping use?
- [ ] $64$, by the Shannon decomposition of [[#thm-lut]]
- [x] $3$: two LUTs each compute the parity of six inputs, and a third XORs the two results
- [ ] $12$, one per input
- [ ] $1$, since parity is a simple function
::: solution
Parity is associative, so it decomposes into the XOR of two 6-input parities, each fitting one LUT, and a 2-input XOR in a third LUT (or in a LUT that also absorbs further inputs). The Shannon bound $2^{12-6} = 64$ LUTs (plus multiplexers) is a worst case for arbitrary functions; structured functions are much cheaper. One LUT cannot do it because it has only six inputs.
:::
:::

::: application ASIC or FPGA?
An application-specific integrated circuit is faster, smaller and lower-power for the same function — roughly an order of magnitude on each measure — but its masks for an advanced process cost millions of dollars and it takes months to manufacture. An FPGA can be reprogrammed in seconds and costs nothing to "re-spin". FPGAs therefore dominate prototyping (large ASICs are verified on racks of FPGAs before tape-out), low- and medium-volume products, network and radio equipment whose standards keep changing, and hardware accelerators that must be updated in the field. The largest FPGAs as of 2026 offer several million logic cells.
:::

::: history
Robert Dennard of IBM invented the one-transistor DRAM cell in 1966 and patented it in 1968; Intel's 1103 (1970) was the first commercially successful DRAM chip. Fujio Masuoka at Toshiba invented flash memory in the early 1980s, presenting NOR flash in 1984 and NAND flash in 1987. Programmable array logic was introduced by Monolithic Memories in 1978 (the PAL, by John Birkner and H. T. Chua), building on earlier field-programmable logic arrays from Signetics. Xilinx, co-founded by Ross Freeman, Bernard Vonderschmitt and James Barnett in 1984, shipped the first commercial FPGA, the XC2064 with 64 configurable logic blocks, in 1985.
:::

## Where this leads

Memories are the bottom layers of the memory hierarchy ([[computer-architecture/memory-hierarchy]]), and their circuit design — cell sizing, sense amplifiers, decoders, redundancy — is covered in [[digital-ic/memory-arrays]]. FPGAs are the platform on which most students first implement the designs of this course; the next chapter, [[digital-logic/hardware-description]], shows how designs are written in Verilog, synthesised into LUTs, flip-flops and block RAMs, and checked for timing.

::: summary
- A $2^n\times m$ memory is an array of cells with a row decoder raising one word line, bit lines, sense amplifiers and a column multiplexer; arrays are kept roughly square and split into banks.
- A ROM is a decoder followed by an OR array: it stores a truth table, implementing every function in canonical form. Mask ROM, OTP, EEPROM and flash differ in how they are programmed and erased.
- SRAM stores a bit in a 6T bistable cell: fast and static, used for caches and FPGA block RAM. Synchronous memories register the address and deliver data one cycle later.
- DRAM stores charge on a capacitor: read signal $\Delta V = \pm\frac{V_{DD}}{2}\frac{C_s}{C_s + C_{BL}}$, destructive reads restored by the sense amplifier, and periodic refresh (every $64\,\mathrm{ms}$ in DDR standards).
- PLAs implement multiple-output SOPs with programmable AND and OR planes, so shared products save area; PALs fix the OR plane.
- FPGAs implement logic in $k$-input LUTs (any function of $k$ inputs; wider functions by Shannon decomposition), with flip-flops, carry chains, block RAMs and DSP blocks in programmable routing.
:::

## Exercises

::: exercise Address width {level=1 check="16"}
How many address lines does a $64\,\mathrm{Ki}\times 16$ memory need?
::: solution
$64\,\mathrm{Ki} = 2^{16}$ words, so $16$ address lines. The data width ($16$ bits) does not affect the address width.
:::
:::

::: exercise Capacity in bytes {level=1 check="4194304"}
What is the capacity, in bytes, of a $2^{20}\times32$ memory?
::: solution
$2^{20}\times 32 = 2^{25}$ bits $= 2^{22}$ bytes $= 4\,194\,304$ bytes $= 4\,\mathrm{MiB}$.
:::
:::

::: exercise A ROM code converter {level=1 check="128"}
A BCD-to-seven-segment decoder is implemented in a byte-wide ROM (8 data bits per word), with the 4-bit digit as the address and one data bit per segment. How many bits does the ROM hold?
::: solution
$2^4 = 16$ words of $8$ bits: $16\times 8 = 128$ bits. The seven segments use $16\times 7 = 112$ of them; the eighth bit of each word is free and could drive the decimal point. Only $10$ of the $16$ addresses are needed; the other six words can hold patterns for "E", or blank.
:::
:::

::: exercise DRAM signal {level=2 check="0.6*15/105"}
A DRAM array runs at $V_{DD} = 1.2\,\mathrm{V}$ with $C_s = 15\,\mathrm{fF}$ and $C_{BL} = 90\,\mathrm{fF}$. Find the read signal $\abs{\Delta V}$ in volts.
::: solution
By [[#eq-chargeshare]], $\abs{\Delta V} = 0.6\times 15/(15 + 90) = 0.6/7 = 0.0857\,\mathrm{V} \approx 86\,\mathrm{mV}$.
:::
:::

::: exercise Refresh overhead {level=2}
A DDR5 device needs a refresh command on average every $3.9\,\mathrm{\mu s}$ at normal temperature, and each all-bank refresh takes $295\,\mathrm{ns}$. What fraction of the time is the device busy refreshing? What happens at high temperature, where the refresh interval is halved?
::: solution
$295\,\mathrm{ns}/3.9\,\mathrm{\mu s} = 0.076$, about $7.6$ %. With the interval halved to $1.95\,\mathrm{\mu s}$ the fraction doubles to about $15$ %, a significant loss of bandwidth. Leakage rises steeply with temperature, so hot DRAM must be refreshed more often; per-bank refresh modes reduce the impact by keeping other banks available.
:::
:::

::: exercise Sharing in a PLA {level=2}
Two functions are $F_1 = \sum m(3, 5, 7)$ and $F_2 = \sum m(3, 6, 7)$ of $A, B, C$. Minimise each separately and count the product terms; then find a PLA implementation that shares products, and count again.
::: solution
Separately: $F_1 = AC + BC$ and $F_2 = AB + BC$, four product terms in total but only three distinct ($AC$, $BC$, $AB$), since $BC$ appears in both. A PLA can share $BC$: $p = 3$ product terms, with $F_1 = AC + BC$ and $F_2 = AB + BC$. (Here the separate minimal forms already share a term; in general, multiple-output minimisation may choose a non-minimal form for one output to share more terms.)
:::
:::

::: exercise A wide function on LUTs {level=2 check="3"}
How many 6-LUTs are needed, by [[#thm-lut]], to implement an arbitrary function of $7$ inputs, if multiplexers must also be built from LUTs?
::: solution
Shannon expansion about one variable: two cofactors of $6$ inputs, each in one 6-LUT, and a 2-to-1 multiplexer (3 inputs) in a third LUT: $3$ LUTs. With a dedicated multiplexer in the logic block, $2$ LUTs suffice.
:::
:::

::: exercise Designing a cell capacitance {level=3}
A DRAM's sense amplifier needs at least $100\,\mathrm{mV}$ of read signal to work reliably, the array voltage is $1.1\,\mathrm{V}$, and each bit line has a capacitance of $0.25\,\mathrm{fF}$ per attached cell plus $20\,\mathrm{fF}$ fixed. (a) With $C_s = 20\,\mathrm{fF}$, how many cells can share a bit line? (b) If 512 cells per bit line are required, what $C_s$ is needed?
::: hint
Write $C_{BL} = 20 + 0.25N$ (in fF) and require $0.55\,C_s/(C_s + C_{BL}) \ge 0.1$.
:::
::: solution
The condition $0.55\,C_s/(C_s + C_{BL}) \ge 0.1$ rearranges to $0.45\,C_s \ge 0.1\,C_{BL}$, i.e. $C_{BL} \le 4.5\,C_s$.

(a) With $C_s = 20\,\mathrm{fF}$: $C_{BL} \le 90\,\mathrm{fF}$, so $20 + 0.25N \le 90$ and $N \le 280$ cells.

(b) With $N = 512$: $C_{BL} = 20 + 128 = 148\,\mathrm{fF}$, so $C_s \ge 148/4.5 = 32.9\,\mathrm{fF}$. Building such capacitors in a tiny cell area is why DRAM capacitors are tall cylinders etched deep into the chip; the alternative is shorter bit lines and more sense amplifiers.
:::
:::

::: exercise Organising an SRAM {level=3}
Design the organisation of a $4\,\mathrm{Mi}$bit SRAM with a 16-bit word as a square array: give the number of words, address bits, rows and columns, the row-decoder size and the column multiplexing. Then split it into $4$ banks of $1\,\mathrm{Mi}$bit each, square again, and say how the address bits are used.
::: solution
*Single array.* $2^{22}$ bits $/16 = 2^{18}$ words, so $18$ address bits. A square array has $2^{11} = 2048$ rows and $2048$ columns. The row decoder is 11-to-2048. Each row holds $2048/16 = 128$ words, so $7$ address bits drive sixteen 128-to-1 column multiplexers.

*Four banks.* Each bank is $2^{20}$ bits $= 1024\times1024$, holding $2^{16}$ words. Two address bits select the bank (enabling its decoder and sense amplifiers), ten select the row (10-to-1024 decoder per bank) and $6$ select the column ($1024/16 = 64$ words per row, so sixteen 64-to-1 multiplexers per bank): $2 + 10 + 6 = 18$ bits. The bit lines and word lines are half as long, so each access is faster and uses less energy, and only one bank needs to be activated per access.
:::
:::

::: exercise ROM versus gates {level=3}
A combinational function of $10$ inputs and $4$ outputs is needed. Compare a ROM implementation with a two-level implementation if each output's minimal SOP has about $6$ product terms of $4$ literals and no products are shared. Which is better, and when would the answer change?
::: solution
ROM: $2^{10}\times4 = 4096$ bits, plus a 10-to-1024 decoder. Two-level logic: $4\times6 = 24$ products of $4$ literals, i.e. $96$ AND inputs and $24$ OR inputs, roughly a hundred gate inputs: far smaller than $4096$ ROM cells. The gates win.

The ROM wins when the function is irregular — when its minimal SOP has hundreds of products, close to the number of minterms — as for arbitrary tables (sine values, character fonts, cryptographic S-boxes), or when the function must be changeable (a flash-based table or FPGA LUTs). The ROM's cost depends only on the number of inputs and outputs, the gates' cost on the function's structure.
:::
:::
