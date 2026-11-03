Every instruction that computes — `add`, `slt`, `mul`, `div`, a floating-point multiply–add in a neural-network kernel — ends up in an arithmetic circuit, and those circuits sit on the critical path of the processor. If the adder takes too long, the whole processor must run at a slower clock; if the multiplier is too large, there is less room for cache. A modern core performs a 64-bit addition in a fraction of a nanosecond, a multiplication in three or four clock cycles and a double-precision fused multiply–add, with correct rounding, in about four. This chapter explains how.

[[digital-logic/combinational-building-blocks]] has already built the ripple-carry adder, the carry-lookahead adder and a simple ALU, and [[digital-logic/registers-counters]] a sequential shift-and-add multiplier. We take those as the starting point and go further in four directions: faster adders and the trade-off between their delay and area; multipliers that reduce many partial products at once; division, the slowest of the basic operations; and floating-point numbers, with the hardware for their addition, multiplication and rounding. The software view of IEEE 754 — what a programmer must know about rounding errors and special values — is in [Floating point](/learn/cs/lesson.php?c=computer-systems&l=floating-point); here we concentrate on how the hardware produces those results.

## Faster addition

Recall the basic facts. In bit position $i$ an adder **generates** a carry if $g_i = a_ib_i = 1$ and **propagates** an incoming carry if $p_i = a_i \oplus b_i = 1$; the carries obey $c_{i+1} = g_i + p_ic_i$, and the sum is $s_i = p_i \oplus c_i$. A ripple-carry adder evaluates this recurrence one bit at a time, so its delay grows linearly with the width $n$. Carry lookahead expands the recurrence so that groups of carries are computed in parallel, and a tree of lookahead units brings the delay down to $O(\log n)$.

Between these two extremes lie several practical designs. Which one a designer chooses depends on how much area and power may be spent for a given delay, and on the wiring the technology allows.

### Carry-select adders

The slow part of addition is waiting for the carry. A **carry-select adder** avoids the wait by guessing: it splits the $n$ bits into blocks of $k$ bits and, for every block except the first, computes the block's sum *twice* — once assuming the incoming carry is $0$ and once assuming it is $1$. Both versions are computed in parallel, as soon as the operands arrive. When the real carry into the block becomes known, a multiplexer selects the correct sum and the correct carry out. The carry no longer ripples through every bit; it passes through one multiplexer per block.

::: proposition Delay of a uniform carry-select adder {#prop-carryselect}
Let a ripple-carry block of $k$ bits take $k\,t_c$ to produce its carry out, and a multiplexer take $t_m$. An $n$-bit carry-select adder made of $n/k$ blocks of $k$ bits has delay approximately

$$
T(k) = k\,t_c + \frac{n}{k}\,t_m ,
$$ {#eq-cs-delay}

which is smallest for $k^\ast = \sqrt{n\,t_m/t_c}$, where $T(k^\ast) = 2\sqrt{n\,t_c\,t_m}$.
:::

::: proof
All blocks start at time $0$ and finish both of their speculative additions after $k\,t_c$. At that moment the carry out of the first block is known. Each later block then needs one multiplexer delay to select its carry out once its carry in is known, so the carry into the last block is ready after $k\,t_c + (n/k - 1)\,t_m$, and one more multiplexer selects the final sum bits: $T = k\,t_c + (n/k)\,t_m$. Treating $k$ as continuous, $T'(k) = t_c - n t_m/k^2 = 0$ gives $k^\ast = \sqrt{n t_m/t_c}$; since $T''(k) = 2nt_m/k^3 > 0$ this is a minimum, and substituting, $T(k^\ast) = \sqrt{n t_c t_m} + \sqrt{n t_c t_m}$.
:::

The delay therefore grows like $\sqrt{n}$ rather than $n$. The price is area: every block after the first is duplicated, plus a row of multiplexers, so the adder is almost twice the size of a ripple-carry adder.

::: example Choosing a block size {#ex-cs}
In a certain process a full adder's carry path takes $t_c = 40\,\mathrm{ps}$ and a 2:1 multiplexer $t_m = 50\,\mathrm{ps}$. Compare a 32-bit ripple-carry adder with carry-select adders of block sizes $4$ and $8$.
::: solution
*Ripple carry:* $32 \times 40\,\mathrm{ps} = 1280\,\mathrm{ps}$ for the carry, slightly more for the last sum bit.

*Carry select*, from [[#eq-cs-delay]]:

- $k = 4$: $4\times 40 + 8 \times 50 = 160 + 400 = 560\,\mathrm{ps}$;
- $k = 8$: $8\times 40 + 4\times 50 = 320 + 200 = 520\,\mathrm{ps}$.

The optimum is $k^\ast = \sqrt{32 \times 50/40} = \sqrt{40} = 6.3$ with $T = 2\sqrt{32\times 40\times 50}\,\mathrm{ps} = 506\,\mathrm{ps}$; $k = 8$ is within $3\,\%$ of it and divides $32$ evenly. Both designs are about $2.5$ times faster than the ripple-carry adder. A further improvement uses blocks of *increasing* size, since later blocks have more time before their carry in arrives (the "square-root" carry-select adder).
:::
:::

::: widget plot
f: x*tc + n*tm/x
x: 1, 32
y: 0, 1500
sliders: n=32:8:64:8; tc=40:10:100:5; tm=50:10:150:5
labels: T(k)\ \text{in ps}
caption: The delay of an $n$-bit carry-select adder against the block size $k$ (on the horizontal axis). Small blocks pay for many multiplexers, large blocks for long ripples; the minimum lies at $k = \sqrt{n t_m/t_c}$. Double $n$ and see the minimum delay rise by only $\sqrt2$. Make the multiplexer slower and the best block grows.
:::

### Prefix adders

The fastest adders compute all carries with a parallel-prefix network built from the associative carry operator $(g, p)\circ(g', p') = (g + pg', pp')$ of [[digital-logic/combinational-building-blocks]]. Because the operator is associative, the $n$ group generate signals $G_{i:0}$ can be computed in $\lceil\log_2 n\rceil$ levels. Different networks trade the number of operator cells against the fan-out and wiring: the **Kogge–Stone** adder uses $\log_2 n$ levels with fan-out $2$ but about $n\log_2 n$ cells and long wires; the **Brent–Kung** adder uses about $2\log_2 n$ levels but only about $2n$ cells. A 64-bit Kogge–Stone adder needs $6$ prefix levels. High-performance integer units use prefix adders or hybrids, often with carry-select at the top level.

### Carry-save addition

When many numbers must be added — the partial products of a multiplication, or the terms of a dot product — it is wasteful to resolve the carries after every addition. A **carry-save adder** postpones them.

::: definition Carry-save adder {#def-csa}
A **carry-save adder** (CSA, or 3:2 compressor) is a row of $n$ independent full adders. It takes three $n$-bit numbers $x$, $y$, $z$ and produces a sum word $s$ and a carry word $c$ with

$$
s_i = x_i \oplus y_i \oplus z_i, \qquad c_{i+1} = x_iy_i + x_iz_i + y_iz_i ,
$$

so that $x + y + z = s + c$ (with $c_0 = 0$, the carry word shifted one place left).
:::

The identity holds bit by bit: a full adder satisfies $x_i + y_i + z_i = s_i + 2c_{i+1}$, and summing over $i$ with weights $2^i$ gives $x + y + z = s + c$. No carry travels between positions, so a CSA has the delay of **one** full adder whatever its width. Only at the very end, when two numbers remain, is a fast carry-propagating adder needed.

## Multiplication

Multiplying two $n$-bit unsigned numbers $a$ and $b$ produces a $2n$-bit product. Written out in binary, it is a sum of **partial products**:

$$
a \times b = \sum_{i=0}^{n-1} b_i\,a\,2^i ,
$$ {#eq-partials}

where each partial product $b_i\,a$ is either $0$ or $a$ — a row of AND gates — shifted left $i$ places. The sequential multiplier of [[digital-logic/registers-counters]] adds one partial product per clock cycle, so it needs $n$ cycles for an $n$-bit multiplication. That is far too slow for a processor in which multiplication is common; the hardware multipliers in today's cores finish a 64-bit multiplication in three or four cycles. They do so by attacking two problems: there are too many partial products, and adding them one after the other is too slow.

### Booth recoding: fewer partial products

The first trick reduces the number of partial products by using a signed-digit representation of the multiplier.

::: theorem Radix-4 Booth recoding {#thm-booth}
Let $b = b_{n-1}\dots b_1b_0$ be an $n$-bit two's complement number with $n$ even, and set $b_{-1} = 0$. Define the digits

$$
d_j = -2b_{2j+1} + b_{2j} + b_{2j-1}, \qquad j = 0, 1, \dots, \tfrac n2 - 1 .
$$ {#eq-booth}

Then each $d_j \in \{-2, -1, 0, 1, 2\}$ and $b = \sum_{j=0}^{n/2-1} d_j\,4^j$.
:::

::: proof
The bounds are clear: $d_j$ is at least $-2$ (for bits $1,0,0$) and at most $2$ (for $0,1,1$). For the sum, collect the coefficient of each bit. Bit $b_{2j}$ appears only in $d_j$, with weight $4^j = 2^{2j}$. Bit $b_{2j+1}$ appears in $d_j$ with coefficient $-2$, contributing $-2\cdot 4^j = -2^{2j+1}$, and in $d_{j+1}$ (as $b_{2(j+1)-1}$) with coefficient $1$, contributing $4^{j+1} = 2^{2j+2}$; the total is $2^{2j+2} - 2^{2j+1} = 2^{2j+1}$, the correct weight — except for the top bit $b_{n-1}$, $n-1 = 2j+1$ with $j = n/2 - 1$, for which there is no digit $d_{j+1}$, leaving $-2^{n-1}$. So

$$
\sum_j d_j 4^j = -b_{n-1}2^{n-1} + \sum_{i=0}^{n-2} b_i 2^i ,
$$

which is the value of $b$ in two's complement.
:::

Each digit is read from an overlapping window of three bits:

| $b_{2j+1}\,b_{2j}\,b_{2j-1}$ | 000 | 001 | 010 | 011 | 100 | 101 | 110 | 111 |
|---|---|---|---|---|---|---|---|---|
| $d_j$ | $0$ | $+1$ | $+1$ | $+2$ | $-2$ | $-1$ | $-1$ | $0$ |

Each partial product $d_j\,a$ is then $0$, $\pm a$ or $\pm 2a$: a shift by one place and an optional negation (invert the bits and add $1$, where the $+1$ is slipped into a spare position of the adder tree). An $n$-bit multiplier now has $n/2$ partial products instead of $n$, and signed numbers are handled without any special correction step.

::: example Booth recoding {#ex-booth}
Recode the 8-bit multiplier $b = 01101101_2 = 109$ and check the result.
::: solution
Append $b_{-1} = 0$ and read windows of three bits, moving two places at a time from the right:

- $j = 0$: $b_1b_0b_{-1} = 010 \Rightarrow d_0 = +1$;
- $j = 1$: $b_3b_2b_1 = 110 \Rightarrow d_1 = -1$;
- $j = 2$: $b_5b_4b_3 = 101 \Rightarrow d_2 = -1$;
- $j = 3$: $b_7b_6b_5 = 011 \Rightarrow d_3 = +2$.

Check: $1 - 1\cdot 4 - 1\cdot 16 + 2\cdot 64 = 1 - 4 - 16 + 128 = 109$. The product $109a$ is formed as $a - 4a - 16a + 128a$: four partial products instead of the five non-zero ones ($b$ has five $1$ bits) or eight rows of the plain array.
:::
:::

### Adder trees: adding partial products in parallel

The second trick adds all the partial products at once with carry-save adders. Each CSA turns three numbers into two, so a layer of CSAs reduces $m$ operands to about $2m/3$. Arranged as a tree — a **Wallace tree** (1964) or the slightly more economical **Dadda tree** (1965) — the CSAs reduce the partial products to two numbers in a logarithmic number of levels, and a single fast adder produces the final product.

::: proposition Depth of a carry-save tree {#prop-dadda}
Define $h_1 = 2$ and $h_{L+1} = \lfloor 3h_L/2\rfloor$, giving $2, 3, 4, 6, 9, 13, 19, 28, 42, 63, 94, \dots$. A tree of 3:2 compressors can reduce $m$ operands to two in $L$ levels if and only if $m \le h_{L+1}$. Hence the number of levels grows like $\log_{3/2}(m/2)$.
:::

::: proof
One level turns each group of three operands into two and passes any remaining one or two operands through unchanged, so from $m$ operands it leaves $2\lfloor m/3\rfloor + (m \bmod 3)$, which is $\lceil 2m/3 \rceil$. Conversely, to end with at most $h$ operands after one level, we may start with at most $\lfloor 3h/2\rfloor$: a group of three gives two, and $\lfloor 3h/2\rfloor$ operands give $\lceil 2\lfloor 3h/2 \rfloor/3\rceil \le h$, while $\lfloor 3h/2\rfloor + 1$ give more than $h$. Applying this backwards from the final $h_1 = 2$ operands, $h_{L+1}$ is the largest number of operands that $L$ levels can reduce to two. The ratio $h_{L+1}/h_L \to 3/2$ gives the logarithmic growth.
:::

(The proposition counts whole operands; real trees work column by column on the bits of equal weight, which is how the Dadda method saves full adders, but the number of levels is the same.)

::: example Designing a 32-bit multiplier {#ex-mult32}
Estimate the delay of a $32\times 32$-bit multiplier with and without Booth recoding, if a full adder (one CSA level) takes $60\,\mathrm{ps}$, Booth recoding and partial-product selection take $80\,\mathrm{ps}$, generating plain partial products (AND gates) takes $30\,\mathrm{ps}$, and the final 64-bit prefix adder takes $250\,\mathrm{ps}$.
::: solution
*Without Booth recoding* there are $32$ partial products. From the sequence in [[#prop-dadda]], $28 < 32 \le 42 = h_9$, so $8$ CSA levels are needed. Delay $\approx 30 + 8\times 60 + 250 = 760\,\mathrm{ps}$.

*With radix-4 Booth recoding* there are $16$ partial products (for unsigned operands one more row is needed to handle the top bit, giving $17$). Since $13 < 17 \le 19 = h_7$, $6$ levels suffice. Delay $\approx 80 + 6\times 60 + 250 = 690\,\mathrm{ps}$.

Booth recoding saves two CSA levels, and — more importantly for cost — halves the number of full adders in the tree, at the price of slower and larger partial-product selection. At a clock of $4\,\mathrm{GHz}$ ($250\,\mathrm{ps}$ per cycle), either multiplier is split across three pipeline stages, which is why integer multiplication has a latency of three cycles on many processors but a throughput of one per cycle.
:::
:::

RISC-V's M extension provides `mul` (the low 32 bits of the product, the same for signed and unsigned operands) and `mulh`, `mulhu`, `mulhsu` (the high 32 bits for signed × signed, unsigned × unsigned and signed × unsigned). A compiler that needs the full 64-bit product issues `mulh` and `mul` with the same operands, and the specification recommends that hardware fuse the pair into one multiplication.

::: quiz
Why does a carry-save adder have the same delay for 8-bit and 64-bit operands?
- [ ] because it uses carry lookahead internally
- [x] because its full adders are independent: no carry passes from one bit position to the next
- [ ] because it only adds two numbers
- [ ] because the delay is dominated by the final adder
::: solution
A CSA is a row of unconnected full adders; each output pair $(s_i, c_{i+1})$ depends only on the three input bits of position $i$. Its delay is one full-adder delay for any width. The carries are only resolved later, by a single carry-propagating adder, whose delay does depend on width.
:::
:::

## Division

Division is the slowest of the four basic operations and the least frequent, so processors spend less hardware on it. The hardware algorithms are versions of long division in base 2.

::: algorithm Restoring division {#alg-restoring}
To divide an $n$-bit unsigned dividend $N$ by a non-zero divisor $D$: clear an $(n+1)$-bit remainder register $A$ and load $N$ into the quotient register $Q$. Repeat $n$ times:

1. Shift the pair $(A, Q)$ left by one bit, so that the top bit of $Q$ enters the bottom of $A$.
2. Subtract: $A \leftarrow A - D$.
3. If $A \ge 0$, set the lowest bit of $Q$ to $1$. Otherwise set it to $0$ and **restore** $A \leftarrow A + D$.

At the end, $Q = \lfloor N/D \rfloor$ and $A = N \bmod D$.
:::

The algorithm is ordinary long division: at each step it asks whether the divisor "goes into" the current partial remainder, and the answer is one quotient bit.

::: example Dividing 13 by 3 {#ex-div}
Trace restoring division of $N = 13 = 1101_2$ by $D = 3 = 0011_2$ with $n = 4$.
::: solution
Start with $A = 0000$, $Q = 1101$. In the table, "trial" is $A - D$ after the shift.

| step | $A$ after shift | $Q$ after shift | trial $A - D$ | action | $A$ | $Q$ |
|---|---|---|---|---|---|---|
| 1 | $0001$ | $101\_$ | $-2$ | restore, $q = 0$ | $0001$ | $1010$ |
| 2 | $0011$ | $010\_$ | $0$ | keep, $q = 1$ | $0000$ | $0101$ |
| 3 | $0000$ | $101\_$ | $-3$ | restore, $q = 0$ | $0000$ | $1010$ |
| 4 | $0001$ | $010\_$ | $-2$ | restore, $q = 0$ | $0001$ | $0100$ |

The quotient is $Q = 0100_2 = 4$ and the remainder $A = 1$: indeed $13 = 4\times 3 + 1$.
:::
:::

The restore step costs an extra addition in every step that fails. **Non-restoring division** skips it: after a negative result it keeps the negative remainder and *adds* $D$ in the next step instead of subtracting (since $2(A + D) - D = 2A + D$), giving one addition or subtraction per quotient bit. Either way, a radix-2 divider produces one bit per cycle, so a 64-bit division takes over $64$ cycles. Faster dividers use **SRT division** (after Sweeney, Robertson and Tocher), which chooses each quotient digit from a redundant set such as $\{-2, \dots, 2\}$ by looking up only the top few bits of the remainder and divisor in a table; radix-4 or radix-16 SRT produces two or four quotient bits per cycle. Division by iteration — Newton–Raphson or Goldschmidt methods built on the multiplier — converges quadratically and is used in some floating-point units.

::: warning Division by zero does not trap in RISC-V
On many ISAs integer division by zero raises an exception. RISC-V does not: `div` by zero returns $-1$ (all ones), `divu` returns $2^{32} - 1$, and `rem`/`remu` return the dividend. The only signed overflow, $-2^{31}/(-1)$, returns $-2^{31}$ with remainder $0$. Quotients are rounded towards zero, and the remainder has the sign of the dividend, so `div` of $-7$ by $2$ gives $-3$ and `rem` gives $-1$. Software that must detect division by zero tests the divisor with a branch.
:::

## Floating-point numbers

Integers cannot represent $6.02\times 10^{23}$ or $1.6\times 10^{-19}$ in 32 bits, and fixed-point numbers ([[digital-logic/number-systems]]) cover a range only as wide as their word length allows. **Floating-point** numbers trade precision for range by storing a number in scientific notation, $\pm m \times 2^e$, with a fixed number of significant bits.

::: definition IEEE 754 binary floating point {#def-ieee}
A **binary floating-point format** with $w$ exponent bits and $f$ fraction bits stores a sign bit $s$, a biased exponent $E$ (an unsigned $w$-bit integer) and a fraction $F$ ($f$ bits), with bias $B = 2^{w-1} - 1$. The value represented is

- **normal**, for $1 \le E \le 2^w - 2$: $\;(-1)^s \times 1.F \times 2^{E - B}$;
- **subnormal**, for $E = 0$, $F \ne 0$: $\;(-1)^s \times 0.F \times 2^{1 - B}$; and $\pm 0$ for $E = 0$, $F = 0$;
- **infinity** $\pm\infty$ for $E = 2^w - 1$, $F = 0$, and **NaN** (not a number) for $E = 2^w - 1$, $F \ne 0$.

The standard formats are binary16 ($w = 5$, $f = 10$), binary32 or single precision ($w = 8$, $f = 23$, $B = 127$) and binary64 or double precision ($w = 11$, $f = 52$, $B = 1023$).
:::

For normal numbers the leading $1$ of the significand is not stored — the **hidden bit** — so binary32 has $24$ bits of precision. Its largest finite value is $(2 - 2^{-23})\times 2^{127} \approx 3.40\times 10^{38}$, the smallest normal value $2^{-126} \approx 1.18\times 10^{-38}$, and the gap between $1$ and the next larger number, the **machine epsilon**, is $2^{-23} \approx 1.19\times 10^{-7}$. For binary64 it is $2^{-52} \approx 2.22\times 10^{-16}$. The order of the fields — sign, exponent, fraction — is chosen so that positive floating-point numbers compare in the same order as their bit patterns read as integers, which lets the hardware compare floats with an integer comparator.

::: example Encoding a number {#ex-encode-fp}
Encode $-6.25$ in binary32, and decode `0x42290000`.
::: solution
*Encoding.* $6.25 = 110.01_2 = 1.1001_2 \times 2^2$. Sign $s = 1$. Biased exponent $E = 2 + 127 = 129 = 10000001_2$. Fraction: the bits after the binary point, $1001$, padded with zeros to $23$ bits. The word is

$$
1\;10000001\;10010000000000000000000_2 = \texttt{0xC0C80000}.
$$

*Decoding* `0x42290000` $= 0\;10000100\;01010010000000000000000_2$: sign $0$, $E = 132$, exponent $132 - 127 = 5$, significand $1.0101001_2 = 1 + \tfrac14 + \tfrac1{16} + \tfrac1{128} = 1.3203125$. The value is $1.3203125 \times 32 = 42.25$.
:::
:::

### Rounding

Most real numbers, and most results of arithmetic on floating-point numbers, fall between two representable values. IEEE 754 requires that the basic operations $+$, $-$, $\times$, $\div$, $\sqrt{\ }$ and fused multiply–add be **correctly rounded**: the result is the exact mathematical result, rounded to a representable number according to the current rounding mode. The default mode is **round to nearest, ties to even**: choose the nearer representable value, and in a tie the one whose last significand bit is $0$. The other modes round towards $0$, $+\infty$ or $-\infty$ and are used in interval arithmetic.

::: widget floatline
p: 4
emin: -2
emax: 2
value: 3.15625
caption: Every number of a toy binary format with $4$ significant bits and exponents from $-2$ to $2$. The gaps double at every power of two, so the *relative* spacing stays roughly constant. The marked value $3.15625$ is the exact sum in [[#ex-fpadd]]; drag it and watch which neighbour it rounds to. Values near $0$ show the subnormal numbers filling the gap below the smallest normal number.
:::

The hardware cannot compute the exact result to unlimited precision and then round. It does not need to: three extra bits beyond the significand are enough.

::: proposition Guard, round and sticky bits {#prop-grs}
For addition and subtraction of two floating-point numbers with $p$-bit significands, it suffices to keep the aligned operands to $p$ bits plus three more: a **guard** bit $G$ and a **round** bit $R$ (the next two bits below the significand), and a **sticky** bit $S$ equal to the OR of all bits shifted out beyond $R$. With these, the result can be correctly rounded in every rounding mode.
:::

::: proof
*Sketch.* After the smaller operand has been shifted right to align the exponents, the exact sum has $p$ bits above the rounding position and an unlimited tail below. Rounding to nearest needs to know whether the tail is less than, equal to or greater than half a unit in the last place (ulp); directed rounding needs to know whether it is zero. Both are determined by the first tail bit and by whether any later tail bit is $1$ — the OR of the later bits is exactly the sticky bit. A second bit is needed because the result may have to be normalised by shifting *left* one place, when a subtraction cancels the leading bit: the guard bit then moves into the significand and the round bit becomes the first tail bit. Cancellation by more than one place happens only when the exponents differ by at most one, in which case the alignment shift is at most one place and no bits beyond the guard bit are lost. A full proof is in Parhami's *Computer Arithmetic* and in Goldberg's survey "What Every Computer Scientist Should Know About Floating-Point Arithmetic".
:::

### Floating-point addition

::: algorithm Floating-point addition {#alg-fpadd}
To add $x = (-1)^{s_x}m_x 2^{e_x}$ and $y = (-1)^{s_y}m_y 2^{e_y}$ with $e_x \ge e_y$ (swap if necessary):

1. **Align**: shift $m_y$ right by $e_x - e_y$ places, keeping $G$, $R$ and $S$.
2. **Add or subtract** the significands (subtract if the signs differ), giving the result exponent $e_x$.
3. **Normalise**: if the sum is $2$ or more, shift right one place and add $1$ to the exponent; if it is less than $1$ (after cancellation), shift left until the leading bit is $1$, subtracting from the exponent.
4. **Round** using $G$, $R$, $S$; if rounding carries out of the top ($1.11\dots1 + $ ulp), normalise again.
5. **Check** for overflow (exponent too large: $\pm\infty$), underflow (subnormal or zero) and special operands (NaN, $\infty$).
:::

::: example Adding with guard, round and sticky bits {#ex-fpadd}
In a toy format with $p = 4$ significant bits, add $x = 1.011_2 \times 2^1$ ($2.75$) and $y = 1.101_2\times 2^{-2}$ ($0.40625$) with round to nearest, ties to even.
::: solution
*Align.* $e_x - e_y = 3$, so shift $y$ right three places: $1.101 \to 0.001101$. Keep three fraction bits $0.001$, then $G = 1$, $R = 0$ and $S = 1$ (the OR of the remaining bit $1$).

*Add.* $1.011 + 0.001 = 1.100$, with $GRS = 101$ carried along. The sum is already normalised (between $1$ and $2$).

*Round.* $G = 1$ means the tail is at least half an ulp, and $R + S = 1$ means it is more than half: round up. $1.100 + 0.001 = 1.101$.

*Result:* $1.101_2\times 2^1 = 3.25$. Check: the exact sum is $3.15625$; the representable neighbours are $3.0$ ($1.100\times 2^1$) and $3.25$, and $3.15625$ is nearer to $3.25$. Without the sticky bit, the tail would look like exactly half an ulp ($GR = 10$), the tie-to-even rule would choose $1.100$, and the result $3.0$ would be wrong.
:::
:::

### Floating-point multiplication

Multiplication is simpler in one respect: no alignment is needed. The sign of the product is $s_x \oplus s_y$, the exponents add, and the significands multiply:

$$
x\times y = (-1)^{s_x\oplus s_y}\,(m_x m_y)\,2^{e_x + e_y}.
$$

With biased exponents, $E = E_x + E_y - B$. The significand product lies in $[1, 4)$, so at most one right shift normalises it; then it is rounded to $p$ bits. The significand multiplier is an integer multiplier of the kind built above, $24\times 24$ bits for binary32 and $53\times 53$ for binary64, and it dominates the area of the unit.

::: example A binary32 multiplication {#ex-fpmul}
Multiply $x = -6.25$ (`0xC0C80000`) by $y = 0.75$ (`0x3F400000`) in binary32.
::: solution
$x = -1.1001_2 \times 2^2$ ($E_x = 129$) and $y = 1.1_2\times 2^{-1}$ ($E_y = 126$).

*Sign:* $1 \oplus 0 = 1$.

*Exponent:* $E = 129 + 126 - 127 = 128$.

*Significands:* $1.1001_2 \times 1.1_2 = 1.1001 + 0.11001 = 10.01011_2$.

*Normalise:* $10.01011 = 1.001011 \times 2^1$, so $E = 129$. No bits are lost, so no rounding is needed.

*Result:* $-1.001011_2 \times 2^{2} = -4.6875$, encoded $1\;10000001\;00101100\dots0_2$ = `0xC0960000`. Check: $6.25 \times 0.75 = 4.6875$.
:::
:::

The most important floating-point operation in modern workloads is the **fused multiply–add** (FMA), $a\times b + c$ with a *single* rounding at the end. It is both more accurate than a separate multiply and add (one rounding instead of two) and faster, because the addition of $c$ is merged into the carry-save tree of the multiplier. Dot products, matrix multiplication, polynomial evaluation and the inner loops of neural networks are chains of FMAs. RISC-V provides it as `fmadd.s` and `fmadd.d`.

::: warning Floating-point addition is not associative
Because every operation rounds, $(x + y) + z$ need not equal $x + (y + z)$. In binary64, $(10^{20} + (-10^{20})) + 1 = 1$, but $10^{20} + (-10^{20} + 1) = 0$, since $-10^{20} + 1$ rounds to $-10^{20}$. A compiler may therefore not reorder floating-point sums unless told it may (for example with `-ffast-math`), and a parallel reduction that adds numbers in a different order from a sequential loop can legitimately give a different answer. Testing floating-point results with `==` is almost always a mistake.
:::

::: quiz
In binary32, how many bits of precision does a normal number carry?
- [ ] $23$, the width of the fraction field
- [x] $24$, the fraction plus the hidden leading $1$
- [ ] $32$, the width of the word
- [ ] $8$, the width of the exponent
::: solution
For normal numbers the significand is $1.F$, and the leading $1$ is implied rather than stored. So the $23$-bit fraction gives $24$ significant bits, and every integer up to $2^{24} = 16\,777\,216$ is exactly representable.
:::
:::

## Design and practice

An arithmetic unit is designed to a latency and throughput target, and the circuits of this chapter are combined to meet it. The table gives typical latencies of a high-performance core as of 2026 (in clock cycles at $4$–$6\,\mathrm{GHz}$); they vary between designs but the ordering does not.

| operation | latency (cycles) | issue rate |
|---|---|---|
| integer add, logic, shift | $1$ | several per cycle |
| integer multiply, 64-bit | $3$–$4$ | one or more per cycle |
| integer divide, 64-bit | about $10$–$20$ | one per several cycles |
| FP add, multiply, FMA (binary64) | $2$–$5$ | two per cycle, also on vectors |
| FP divide, square root (binary64) | about $13$–$20$ | one per several cycles |

Three lessons follow from it. First, a single-cycle integer add is non-negotiable, because addition computes every address and every branch condition; it is the main reason for the effort spent on fast adders. Second, multiplication is pipelined: a new multiplication can start every cycle even though each takes several. Third, division is rare enough that compilers avoid it: division by a constant is replaced by multiplication by a precomputed reciprocal and a shift, and division by a power of two by a shift.

::: application Low-precision arithmetic for machine learning
Neural-network inference and training tolerate low precision but need enormous throughput. As of 2026, accelerators and GPUs multiply in binary16, in **bfloat16** (1 sign, 8 exponent, 7 fraction bits: the range of binary32 with less precision), and in 8-bit and even 4-bit floating-point formats, accumulating the products in binary32. Since the area of a multiplier grows roughly with the square of the significand width, a bfloat16 multiplier ($8\times 8$ significand bits) is about a ninth of the size of a binary32 one ($24\times 24$), and a chip can hold many times more of them. The same carry-save trees and rounding logic described here are replicated thousands of times in matrix units.
:::

::: history
Carry-lookahead and carry-select ideas date from the early electronic computers of the 1950s; the carry-select adder was described by O. J. Bedrij in 1962. Andrew Booth devised his recoding at Birkbeck College, London, in 1950–51 to speed up multiplication on his relay and valve machines; the radix-4 form used today was published by O. L. MacSorley in 1961. Christopher Wallace proposed the carry-save tree in 1964 and Luigi Dadda refined it in 1965. Floating point appeared in Konrad Zuse's Z3 (1941), and every manufacturer used its own formats until the IEEE 754 standard of 1985, developed under the leadership of William Kahan, who received the Turing Award in 1989 for this work; revisions in 2008 and 2019 added fused multiply–add, binary16 and decimal formats. In 1994 Thomas Nicely found that the Pentium's SRT divider gave wrong results for some operands because five entries were missing from its digit-selection table; Intel replaced the processors at a cost of about \$475 million, and formal verification of arithmetic units has been standard practice since.
:::

## Where this leads

The ALU and its adder become the central component of the datapath in [[computer-architecture/single-cycle-processor]], whose clock period is set partly by the adder delay computed here. Multi-cycle operations such as multiplication and division return in [[computer-architecture/pipelining]], where they create hazards of their own, and the vector and matrix units of [[computer-architecture/parallel-architectures]] replicate floating-point multipliers by the thousand. At transistor level, the speed of these circuits depends on the logic families of [[digital-ic/static-cmos-logic]]. Algorithms that use floating point well — and the error analysis that tells you when they do not — belong to numerical analysis; see [Floating point](/learn/cs/lesson.php?c=computer-systems&l=floating-point) for the programmer's view.

::: summary
- Carry-select adders compute each block's sum for both possible carries and select; with block size $k$ the delay is $k t_c + (n/k)t_m$, minimised at $k = \sqrt{n t_m/t_c}$ ([[#prop-carryselect]]). Prefix adders reach $\log_2 n$ levels.
- A carry-save adder turns three numbers into two in one full-adder delay, independent of width ([[#def-csa]]).
- Fast multipliers reduce the number of partial products with radix-4 Booth recoding ([[#thm-booth]]) and add them in a carry-save tree of depth about $\log_{3/2}(m/2)$ ([[#prop-dadda]]), followed by one fast adder.
- Division is done by restoring, non-restoring or SRT algorithms, one or a few quotient bits per cycle; it is the slowest basic operation.
- IEEE 754 numbers have a sign, a biased exponent and a fraction with a hidden bit ([[#def-ieee]]); binary32 has $24$ bits of precision and machine epsilon $2^{-23}$.
- Operations are correctly rounded, by default to nearest with ties to even; guard, round and sticky bits suffice for addition ([[#prop-grs]]).
- Floating-point addition aligns, adds, normalises and rounds; multiplication adds exponents and multiplies significands; FMA rounds only once. Floating-point addition is not associative.
:::

## Exercises

::: exercise Encoding a float {level=1}
Encode $10.375$ in binary32 and give the result in hexadecimal.
::: solution
$10.375 = 1010.011_2 = 1.010011_2\times 2^3$. Sign $0$, $E = 3 + 127 = 130 = 10000010_2$, fraction $010011$ followed by $17$ zeros. The word is $0\;10000010\;01001100000000000000000_2$ = `0x41260000`.
:::
:::

::: exercise Decoding a float {level=1 check="-0.75"}
What number does the binary32 word `0xBF400000` represent?
::: solution
`0xBF400000` $= 1\;01111110\;10000000000000000000000_2$. Sign $1$, $E = 126$, exponent $-1$, significand $1.1_2 = 1.5$. Value $-1.5\times 2^{-1} = -0.75$.
:::
:::

::: exercise Tree depth {level=1 check="6"}
How many levels of carry-save adders are needed to reduce $16$ partial products to two?
::: solution
The sequence of [[#prop-dadda]] is $2, 3, 4, 6, 9, 13, 19, \dots$. Since $13 < 16 \le 19 = h_7$, six levels are needed: $16 \to 11 \to 8 \to 6 \to 4 \to 3 \to 2$ (each level leaves $\lceil 2m/3\rceil$ operands).
:::
:::

::: exercise Booth recoding of a negative number {level=2}
Recode the 8-bit two's complement number $11100011_2$ ($-29$) into radix-4 Booth digits and check the value.
::: solution
With $b_{-1} = 0$: $b = 1110\,0011$ has $b_7 \dots b_0 = 1,1,1,0,0,0,1,1$, so $b_1b_0b_{-1} = 1,1,0 \Rightarrow -1$; $b_3b_2b_1 = 0,0,1 \Rightarrow +1$; $b_5b_4b_3 = 1,0,0 \Rightarrow -2$; $b_7b_6b_5 = 1,1,1 \Rightarrow 0$. The digits from $d_0$ to $d_3$ are $-1, +1, -2, 0$, and $-1 + 4 - 2\cdot 16 + 0 = -29$. Correct, and only three non-zero partial products are needed.
:::
:::

::: exercise A division trace {level=2}
Trace restoring division of $11$ by $4$ with $n = 4$ bits.
::: solution
Start $A = 0000$, $Q = 1011$.

1. Shift: $A = 0001$, $Q = 011\_$; $1 - 4 < 0$: restore, $Q = 0110$.
2. Shift: $A = 0010$, $Q = 110\_$; $2 - 4 < 0$: restore, $Q = 1100$.
3. Shift: $A = 0101$, $Q = 100\_$; $5 - 4 = 1 \ge 0$: $A = 0001$, $Q = 1001$.
4. Shift: $A = 0011$, $Q = 001\_$; $3 - 4 < 0$: restore, $Q = 0010$.

Quotient $Q = 2$, remainder $A = 3$: $11 = 2\times 4 + 3$. (Dividing by a power of two this way is wasteful: a shift gives the quotient and an AND the remainder.)
:::
:::

::: exercise Carry-select design {level=2 check="720"}
A 64-bit carry-select adder is built from uniform blocks with $t_c = 30\,\mathrm{ps}$ per bit and $t_m = 60\,\mathrm{ps}$ per multiplexer. Which power-of-two block size minimises the delay of [[#eq-cs-delay]], and what is that delay in picoseconds?
::: solution
$T(k) = 30k + 64\times 60/k$. $T(4) = 120 + 960 = 1080$, $T(8) = 240 + 480 = 720$, $T(16) = 480 + 240 = 720$, $T(32) = 960 + 120 = 1080$ ps. Block sizes $8$ and $16$ tie at $720\,\mathrm{ps}$; the continuous optimum $k^\ast = \sqrt{64\times 60/30} = 11.3$ gives $679\,\mathrm{ps}$. A designer would choose $k = 8$ (smaller multiplexer fan-out on the select line) or use non-uniform blocks.
:::
:::

::: exercise Ties to even {level=2}
In the toy format with $p = 4$, compute with round to nearest, ties to even: (a) $1.000_2 + 1.000_2\times 2^{-4}$; (b) $1.001_2 + 1.000_2\times 2^{-4}$; (c) $1.000_2 + 1.001_2\times 2^{-3}$. Give $G$, $R$, $S$ in each case.
::: solution
(a) Aligning $1.000\times 2^{-4}$ shifts it four places: $0.0001$; the kept bits are $0.000$, $G = 1$, $R = 0$, $S = 0$. The tail is exactly half an ulp: a tie. The sum $1.000$ ends in $0$, so it stays: result $1.0$ (exact sum $1.0625$).

(b) Same alignment, sum $1.001$ with $GRS = 100$: a tie again, but now the last bit is $1$, so round up to the even neighbour $1.010$: result $1.25$ (exact $1.1875$, halfway between $1.125$ and $1.25$).

(c) $1.001\times 2^{-3}$ shifted three places is $0.001001$: kept $0.001$, $G = 0$, $R = 0$, $S = 1$. The tail is below half an ulp: round down. Sum $1.001 = 1.125$ (exact $1.140625$).
:::
:::

::: exercise The first missing integer {level=3 check="16777217"}
What is the smallest positive integer that cannot be represented exactly in binary32? Explain.
::: hint
How far apart are consecutive binary32 numbers between $2^{24}$ and $2^{25}$?
:::
::: solution
Integers up to $2^{24}$ need at most $24$ significant bits and are exact. Between $2^{24}$ and $2^{25}$ the exponent is $24$ and the $24$-bit significand has its last bit worth $2^{24-23} = 2$, so only even integers are representable. The first missing integer is $2^{24} + 1 = 16\,777\,217$; it is a tie between $2^{24}$ and $2^{24}+2$ and rounds to the even significand, $2^{24}$. This is why a binary32 counter incremented by $1$ stops at $16\,777\,216$.
:::
:::

::: exercise A 64-bit multiplier {level=3}
Design the partial-product reduction of a $64\times 64$-bit unsigned multiplier with radix-4 Booth recoding. How many partial products are there, how many CSA levels are needed, and how many levels would be needed without recoding? If a CSA level takes $50\,\mathrm{ps}$, the recoding $70\,\mathrm{ps}$ and the final 128-bit adder $300\,\mathrm{ps}$, can the multiplier be split into three pipeline stages for a $5\,\mathrm{GHz}$ clock, allowing $40\,\mathrm{ps}$ per stage for the pipeline register?
::: solution
Radix-4 recoding of a 64-bit unsigned multiplier gives $64/2 = 32$ digits plus one extra partial product for the top bit: $33$ partial products. From the sequence $\dots, 28, 42, \dots$, $28 < 33 \le 42 = h_9$: $8$ CSA levels. Without recoding, $64$ partial products and $63 < 64 \le 94 = h_{11}$: $10$ levels.

Total logic delay with recoding: $70 + 8\times 50 + 300 = 770\,\mathrm{ps}$. At $5\,\mathrm{GHz}$ the cycle is $200\,\mathrm{ps}$, of which $160\,\mathrm{ps}$ is available for logic after the register overhead. Three stages give $480\,\mathrm{ps}$ of logic timTotal logic delay with recoding: $70 + 8\times 50 + 300 = 770\,\mathrm{ps}$. At $5\,\mathrm{GHz}$ the cycle is $200\,\mathrm{ps}$, of which $160\,\mathrm{ps}$ is left for logic after the register overhead. Three stages offer only $3\times 160 = 480\,\mathrm{ps}$: not enough. Even a perfect split needs $\lceil 770/160\rceil = 5$ stages.

A CSA level cannot be cut in half, but suppose the final adder can be cut anywhere. Packing greedily: stage 1, recoding and one level ($120\,\mathrm{ps}$; a second level would make $170$); stages 2 and 3, three levels each ($150\,\mathrm{ps}$); stage 4, the last level and $110\,\mathrm{ps}$ of the adder; stage 5, $160\,\mathrm{ps}$ of adder; stage 6, the remaining $30\,\mathrm{ps}$. Six stages, because the $50\,\mathrm{ps}$ granularity wastes time in the first three. With a faster $250\,\mathrm{ps}$ adder, stage 5 would hold the remaining $140\,\mathrm{ps}$ and five stages would do. Real 64-bit multipliers at such clock rates reach a latency of $3$–$4$ cycles only with faster circuits than these round numbers assume — 4:2 compressors, carefully tuned prefix adders and custom layout — which shows how tight the timing of a multiplier is.
:::
:::

::: exercise Proving the carry-save identity {level=3}
Prove that a carry-save adder satisfies $x + y + z = s + c$, and show that a 4:2 compressor (two CSAs in series, reducing four numbers to two) has the delay of two full adders regardless of width.
::: solution
For each bit position, a full adder computes $s_i$ and $c_{i+1}$ with $x_i + y_i + z_i = s_i + 2c_{i+1}$ (the sum of three bits is between $0$ and $3$, and $s_i$, $c_{i+1}$ are its binary digits). Multiplying by $2^i$ and summing over $i = 0, \dots, n-1$:

$$
\sum_i (x_i + y_i + z_i)2^i = \sum_i s_i 2^i + \sum_i c_{i+1}2^{i+1}, \quad\text{i.e.}\quad x + y + z = s + c,
$$

where $c = \sum_{i=1}^{n} c_i 2^i$ is the carry word (with $n+1$ bits). For four numbers $w, x, y, z$: the first CSA gives $s' + c' = w + x + y$, the second adds $z$: $s + c = s' + c' + z = w + x + y + z$. Bit $i$ of the second CSA depends on $s'_i$, $c'_i$ and $z_i$, and $c'_i$ comes from position $i-1$ of the first CSA — one position over, not a chain. So every output bit is ready after two full-adder delays, whatever $n$ is.
:::
:::
