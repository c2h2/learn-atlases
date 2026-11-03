A digital circuit knows nothing about numbers. Each wire carries a voltage, and a gate reads that voltage as one of two values: **high** (near the supply, say $V_{DD} = 1.8\,\mathrm{V}$) or **low** (near $0\,\mathrm{V}$). Everything a computer does with numbers, letters, pixels or sound samples therefore rests on a choice of **code**: an agreed rule that turns a pattern of high and low wires into a meaning. Choose the code well and arithmetic becomes cheap; choose it badly and simple operations need large, slow circuits.

Why two values and not ten? A transistor switch is very good at being fully on or fully off and rather poor at holding an exact intermediate level. If a signal only has to be distinguished as "above the threshold" or "below it", every gate can restore a slightly degraded input to a clean output, so noise does not accumulate along a chain of a million gates. That **regeneration** is the real reason digital electronics works, and it is why the natural number system for hardware is base two.

In this chapter we set up the representations used throughout the course: positional numbers in binary, octal and hexadecimal; the two's complement code for signed integers and its overflow rules; fixed-point numbers for fractions; and a handful of special codes — BCD, Gray code and parity — that solve particular engineering problems. The CS atlas treats the same material from the programmer's side in [Bits, bytes and integers](/learn/cs/lesson.php?c=computer-systems&l=bits-integers); here the emphasis is on what the hardware has to do.

## Positional number systems

The decimal numeral $2026$ means $2\cdot 10^3 + 0\cdot 10^2 + 2\cdot 10^1 + 6\cdot 10^0$. Each digit is weighted by a power of the **base** (or **radix**), and the weight depends only on the digit's position. Nothing about this is special to ten.

::: definition Positional representation {#def-positional}
Let $b \ge 2$ be an integer. A string of digits $d_{n-1}d_{n-2}\dots d_1d_0$ with each $d_i \in \{0, 1, \dots, b-1\}$ represents, in **base $b$**, the integer

$$
N = \sum_{i=0}^{n-1} d_i\, b^i .
$$ {#eq-positional}

Digit $d_0$ is the **least significant digit** and $d_{n-1}$ the **most significant**. In base $2$ the digits are called **bits**; the least and most significant bits are written LSB and MSB. A string with digits after a radix point, $d_{n-1}\dots d_0.d_{-1}d_{-2}\dots d_{-m}$, represents $\sum_{i=-m}^{n-1} d_i b^i$.
:::

We mark the base with a subscript or a prefix when there is any doubt: $1011_2 = 11_{10}$, and in program code `0b1011`, `0x7EA`. Three bases are common in hardware:

| base | name | digits | why it is used |
|---|---|---|---|
| $2$ | binary | $0, 1$ | the native representation of bits on wires |
| $8$ | octal | $0$–$7$ | groups of three bits; Unix file permissions, some older machines |
| $16$ | hexadecimal | $0$–$9$, $\mathrm{A}$–$\mathrm{F}$ | groups of four bits; addresses, register dumps, colour values |

::: theorem Range and uniqueness of n-digit representations {#thm-range}
In base $b$, every integer $N$ with $0 \le N \le b^n - 1$ has exactly one $n$-digit representation [[#eq-positional]] (with leading zeros allowed), and no integer outside that range has one. In particular $n$ bits represent the $2^n$ unsigned integers $0, 1, \dots, 2^n - 1$, and an unsigned integer $N \ge 1$ needs $\lceil \log_2(N+1) \rceil$ bits.
:::

::: proof
*Range.* The smallest value is $0$ (all digits $0$) and the largest has every digit $b-1$: $\sum_{i=0}^{n-1}(b-1)b^i = (b-1)\dfrac{b^n - 1}{b - 1} = b^n - 1$ by the geometric sum.

*Existence and uniqueness* by induction on $n$. For $n = 1$ the single digit is $N$ itself. For $n > 1$, any representation gives $N = d_0 + b\,M$ with $M = \sum_{i=1}^{n-1} d_i b^{i-1}$ and $0 \le d_0 < b$. By the division algorithm there is exactly one such pair: $d_0 = N \bmod b$ and $M = \lfloor N/b \rfloor$. Since $N \le b^n - 1$, $M \le b^{n-1} - 1$, so by the induction hypothesis $M$ has exactly one $(n-1)$-digit representation. Hence $N$ has exactly one $n$-digit one.

*Bits needed.* $N$ fits in $n$ bits iff $N \le 2^n - 1$, that is $2^n \ge N + 1$, that is $n \ge \log_2(N+1)$; the least such integer is $\lceil \log_2(N+1)\rceil$.
:::

The proof is also an algorithm. The remainder of $N$ divided by $b$ is the last digit, and the quotient holds all the others, so repeated division peels digits off from the right.

::: algorithm Base conversion {#alg-convert}
*Integer part.* To write an integer $N$ in base $b$: divide $N$ by $b$; the remainder is $d_0$. Divide the quotient by $b$; the remainder is $d_1$. Continue until the quotient is $0$. The digits come out least significant first.

*Fraction part.* To write a fraction $0 \le F < 1$ in base $b$: multiply $F$ by $b$; the integer part is $d_{-1}$. Keep the fractional part and repeat; the integer parts give $d_{-2}, d_{-3}, \dots$, most significant first. Stop when the fractional part is $0$ or enough digits have been produced.

*Between binary and base $2^k$.* Group the bits in fours (hexadecimal) or threes (octal) starting at the radix point, and replace each group by one digit.
:::

::: example Converting a year {#ex-2026}
Write $2026_{10}$ in binary, octal and hexadecimal.
::: solution
Repeated division by $2$, recording remainders:

| $N$ | $2026$ | $1013$ | $506$ | $253$ | $126$ | $63$ | $31$ | $15$ | $7$ | $3$ | $1$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $N \bmod 2$ | $0$ | $1$ | $0$ | $1$ | $0$ | $1$ | $1$ | $1$ | $1$ | $1$ | $1$ |

Reading the remainders from right to left gives $2026_{10} = 111\,1110\,1010_2$, eleven bits — as [[#thm-range]] predicts, because $2^{10} = 1024 \le 2026 < 2048 = 2^{11}$.

For hexadecimal, group from the right in fours: $0111\;1110\;1010 = \mathrm{7\,E\,A}$, so $2026 = \mathrm{7EA}_{16}$. Check: $7\cdot 256 + 14\cdot 16 + 10 = 1792 + 224 + 10 = 2026$.

For octal, group in threes: $011\;111\;101\;010 = 3\,7\,5\,2$, so $2026 = 3752_8$. Check: $3\cdot 512 + 7\cdot 64 + 5\cdot 8 + 2 = 1536 + 448 + 40 + 2 = 2026$.
:::
:::

Fractions behave less pleasantly. Multiplying $0.1$ by $2$ repeatedly gives integer parts $0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, \dots$, so

$$
0.1_{10} = 0.0\overline{0011}_2 ,
$$

a repeating binary fraction. A fraction $p/q$ in lowest terms has a finite base-$b$ expansion exactly when every prime factor of $q$ divides $b$; since $10 = 2\cdot 5$, the factor $5$ in $1/10$ makes the binary expansion infinite. Any finite binary store of $0.1$ is therefore an approximation — the root of the famous `0.1 + 0.2 != 0.3` in floating-point software.

::: warning Hexadecimal is a notation, not a different number
Writing a register value as `0xB6`, `0b10110110` or $182$ changes nothing in the hardware: the same eight wires carry the same voltages. Hexadecimal exists only because humans read `B6` faster than `10110110`. Whether those eight bits *mean* $182$, $-74$ or the letter code of some character depends on the code the designer has chosen, which is the subject of the rest of this chapter.
:::

## Unsigned binary arithmetic

Binary addition is decimal addition with a smaller table: $0+0 = 0$, $0+1 = 1$, $1+1 = 10_2$ (write $0$, carry $1$), and $1+1+1 = 11_2$ (write $1$, carry $1$). At each bit position $i$ we add two operand bits $a_i$, $b_i$ and an incoming carry $c_i$, producing a sum bit $s_i$ and an outgoing carry $c_{i+1}$:

$$
a_i + b_i + c_i = s_i + 2\,c_{i+1}.
$$ {#eq-bitadd}

This single equation is the specification of the **full adder**, the circuit we build in [[digital-logic/combinational-building-blocks]]. Chaining $n$ of them gives an $n$-bit adder.

An $n$-bit adder can only hold results up to $2^n - 1$. If the true sum is larger, the final carry $c_n$ is $1$ and the $n$ stored bits are the sum **modulo $2^n$**. For unsigned numbers $c_n = 1$ therefore signals **overflow** (out of range). Subtraction $a - b$ of unsigned numbers is done by the same adder, as we shall see, and there a *missing* carry signals a negative result (a **borrow**).

Multiplication in binary is particularly simple, because each partial product is either $0$ or a shifted copy of the multiplicand. Multiplying by $2^k$ is a shift left by $k$ places, and dividing by $2^k$ (discarding the remainder) a shift right by $k$ places — free in hardware, since it is only a rewiring.

::: quiz
An 8-bit unsigned adder computes $200 + 100$. What are the eight result bits, read as an unsigned number, and the carry out?
- [ ] $300$ and carry $0$
- [x] $44$ and carry $1$
- [ ] $255$ and carry $1$ (the result saturates)
- [ ] $100$ and carry $1$
::: solution
$200 + 100 = 300 = 256 + 44$. The adder keeps the sum modulo $2^8 = 256$, which is $44 = 0010\,1100_2$, and sets the carry out to $1$ to record the lost $256$. An ordinary adder does not saturate; saturating arithmetic (common in signal processors) needs extra logic that detects overflow and substitutes the maximum value.
:::
:::

## Signed integers and two's complement

To represent negative numbers we must give some of the $2^n$ bit patterns negative meanings. Three schemes have been used.

- **Sign–magnitude**: the MSB is a sign ($1$ for negative), the remaining $n-1$ bits the magnitude. Natural for people, but it has two zeros ($+0$ and $-0$) and addition must compare signs and magnitudes before deciding whether to add or subtract.
- **Ones' complement**: a negative number is formed by inverting every bit of the positive one. Still two zeros, and an addition needs an "end-around carry".
- **Two's complement**: the MSB is given a *negative* weight. One zero, and the ordinary unsigned adder works unchanged.

Every modern processor uses two's complement for integers. (Sign–magnitude survives in floating-point formats, where the sign is stored separately.)

::: definition Two's complement {#def-twos}
The $n$-bit **two's complement** value of the bit string $a_{n-1}a_{n-2}\dots a_0$ is

$$
A = -a_{n-1}\,2^{n-1} + \sum_{i=0}^{n-2} a_i\, 2^i .
$$ {#eq-twos}

The MSB $a_{n-1}$ is the **sign bit**: $A < 0$ exactly when $a_{n-1} = 1$. The representable range is $-2^{n-1} \le A \le 2^{n-1} - 1$; for $n = 8$, from $-128$ to $+127$.
:::

The pattern with only the sign bit set, $1000\dots0$, is the most negative number $-2^{n-1}$; the all-ones pattern $11\dots1$ is $-2^{n-1} + (2^{n-1} - 1) = -1$. A useful way to see the code: the bit pattern of a negative number $A$ is the unsigned pattern of $A + 2^n$. On a circle of $2^n$ positions, two's complement simply relabels the upper half of the unsigned numbers as negatives.

::: widget modular
n: 16
mode: clock
a: 5
caption: A 4-bit register is a clock with 16 positions. Read the positions $8$ to $15$ as $-8$ to $-1$ and you have 4-bit two's complement: adding $5$ to $-3$ (position $13$) lands on $2$, the right signed answer, by exactly the same step as the unsigned sum $13 + 5 = 18 \equiv 2$. Try $a = 5$ from position $6$: the hand passes from $7$ to $8$, i.e. from $+7$ to $-8$ — signed overflow.
:::

### Negation, sign extension and subtraction

::: theorem Two's complement negation {#thm-negate}
Let $\overline{A}$ denote the bitwise complement of the $n$-bit pattern $A$ (every bit inverted). Then, in $n$-bit two's complement arithmetic,

$$
-A = \overline{A} + 1 ,
$$ {#eq-negate}

valid for every representable $A$ except $A = -2^{n-1}$, whose negation $+2^{n-1}$ is not representable (the formula returns $-2^{n-1}$ again).
:::

::: proof
Bit by bit, $a_i + \overline{a_i} = 1$, so as unsigned numbers $A + \overline{A} = 11\dots1_2 = 2^n - 1$. Hence $\overline{A} + 1 = 2^n - A$, which is congruent to $-A$ modulo $2^n$. Two's complement addition is arithmetic modulo $2^n$ with the patterns read as representatives in $[-2^{n-1}, 2^{n-1} - 1]$, so $\overline{A} + 1$ is the pattern of $-A$ whenever $-A$ lies in that range — that is, for every $A$ except $-2^{n-1}$.
:::

::: theorem Sign extension {#thm-signext}
An $n$-bit two's complement number keeps its value when it is widened to $n + k$ bits by copying the sign bit into the $k$ new high positions.
:::

::: proof
It is enough to add one bit. The $(n+1)$-bit pattern $a_{n-1}a_{n-1}a_{n-2}\dots a_0$ has value

$$
-a_{n-1}2^{n} + a_{n-1}2^{n-1} + \sum_{i=0}^{n-2}a_i 2^i = -a_{n-1}2^{n-1} + \sum_{i=0}^{n-2}a_i 2^i ,
$$

the value [[#eq-twos]] of the original. Repeat $k$ times.
:::

Subtraction now costs almost nothing. Since $A - B = A + \overline{B} + 1$, an adder computes $A - B$ if every bit of $B$ passes through an inverter and the carry into the least significant position is set to $1$. That is how a single adder in an arithmetic logic unit performs both operations ([[digital-logic/combinational-building-blocks]]).

::: example Negative numbers in 8 bits {#ex-neg45}
Find the 8-bit two's complement patterns of $-45$ and of $-128$, and the value of the pattern $\mathrm{B6}_{16}$.
::: solution
$45 = 32 + 8 + 4 + 1 = 0010\,1101_2$. By [[#thm-negate]], invert and add one: $1101\,0010 + 1 = 1101\,0011_2 = \mathrm{D3}_{16}$. Check with [[#eq-twos]]: $-128 + 64 + 16 + 2 + 1 = -45$. ✓

$-128$ is the sign bit alone: $1000\,0000_2 = 80_{16}$. Applying the negation rule gives $0111\,1111 + 1 = 1000\,0000$ again: $+128$ does not exist in 8 bits.

$\mathrm{B6}_{16} = 1011\,0110_2$. Its unsigned value is $128 + 32 + 16 + 4 + 2 = 182$; as two's complement the sign bit has weight $-128$, so the value is $-128 + 54 = -74$. Equivalently $182 - 256 = -74$.
:::
:::

### Overflow

Two's complement addition uses the unsigned adder, so it can be wrong in exactly one way: the true sum may lie outside $[-2^{n-1}, 2^{n-1} - 1]$. The carry out $c_n$ is no help here — adding $-1 + (-1)$ produces a carry out but a perfectly correct result $-2$.

::: theorem Signed overflow {#thm-overflow}
When two $n$-bit two's complement numbers are added, the stored result is wrong (signed **overflow**) if and only if either of the following equivalent conditions holds:

1. both operands have the same sign and the result has the opposite sign;
2. the carry into the sign position differs from the carry out of it, $c_{n-1} \ne c_n$; that is, $V = c_{n-1} \oplus c_n = 1$.

Adding two numbers of opposite sign can never overflow.
:::

::: proof
The exact sum of two numbers of opposite sign lies between them, hence in range. If both are non-negative the sum is at most $2^n - 2$ and overflows only into $[2^{n-1}, 2^n - 2]$, whose patterns have sign bit $1$; if both are negative the sum is at least $-2^n$ and overflows only into $[-2^n, -2^{n-1} - 1]$, which wraps to patterns with sign bit $0$. This proves condition 1.

For condition 2 look at the sign position, where the adder forms $a_{n-1} + b_{n-1} + c_{n-1} = s_{n-1} + 2c_n$ by [[#eq-bitadd]]. If $a_{n-1} = b_{n-1} = 0$, then $c_n = 0$ and $s_{n-1} = c_{n-1}$: the result is negative (overflow) iff $c_{n-1} = 1 \ne c_n$. If $a_{n-1} = b_{n-1} = 1$, then $c_n = 1$ and $s_{n-1} = c_{n-1}$: the result is non-negative (overflow) iff $c_{n-1} = 0 \ne c_n$. If the signs differ, $c_n = c_{n-1}$, and there is no overflow. In every case overflow $\iff c_{n-1} \ne c_n$.
:::

::: example Detecting overflow {#ex-overflow}
In 8-bit two's complement, compute $100 + 50$ and $(-100) + (-50)$, and give the flags $C = c_8$ and $V$.
::: solution
$100 = 0110\,0100$, $50 = 0011\,0010$. Adding:

$$
\begin{aligned}
&\;\;0110\,0100\\
+\;&\;\;0011\,0010\\
\hline
&\;\;1001\,0110
\end{aligned}
$$

The pattern $1001\,0110$ reads as $-128 + 22 = -106$. Two positive operands gave a negative result, so $V = 1$. In the sign column $c_7 = 1$ (from $1 + 0$ in bit 6 plus the carry from bit 5) and $c_8 = 0$, so $c_7 \oplus c_8 = 1$, agreeing. The true sum $150$ exceeds $127$; the stored value is $150 - 256 = -106$.

$-100 = 1001\,1100$ and $-50 = 1100\,1110$. Their sum is $1\,0110\,1010$: the carry out $C = 1$, and the eight stored bits $0110\,1010 = 106$. Two negatives gave a positive, so $V = 1$; here $c_8 = 1$ and $c_7 = 0$. The true sum $-150$ is below $-128$, and $-150 + 256 = 106$.

In both cases the C flag alone tells you nothing about signed correctness: it is $0$ in the first and $1$ in the second.
:::
:::

::: warning Carry and overflow are different flags
Processors set both a carry flag $C = c_n$ and an overflow flag $V = c_{n-1}\oplus c_n$ after every addition, because the hardware does not know whether you meant the operands as unsigned or signed. $C$ indicates unsigned overflow; $V$ indicates signed overflow. Testing the wrong flag is a classic source of bugs in assembly code and in hand-written ALU checkers.
:::

::: quiz
In 4-bit two's complement, which of these additions overflows?
- [ ] $(-3) + (-4)$
- [ ] $7 + (-8)$
- [x] $5 + 4$
- [ ] $(-1) + (-1)$
::: solution
The range is $-8$ to $7$. $(-3) + (-4) = -7$, $7 + (-8) = -1$ and $(-1) + (-1) = -2$ are all in range; $5 + 4 = 9$ is not. The adder produces $0101 + 0100 = 1001$, which reads as $-7$: two positives, a negative result.
:::
:::

## Fixed-point numbers

Many signals are not integers: a filter coefficient of $0.3$, a voltage of $-2.75\,\mathrm{V}$. The cheapest way to handle fractions in hardware is to keep integer arithmetic and simply *agree* where the binary point is.

::: definition Fixed-point format {#def-fixed}
In this course a signed **Q$m$.$n$** number is an $(m+n)$-bit two's complement integer $k$ interpreted as the value $x = k \cdot 2^{-n}$: $m$ bits (including the sign bit) lie to the left of the binary point and $n$ bits to the right. Its **resolution** (the value of one LSB) is $2^{-n}$ and its range is

$$
-2^{m-1} \le x \le 2^{m-1} - 2^{-n}.
$$ {#eq-qrange}

A real number $r$ is **quantised** to $k = \operatorname{round}(r\,2^n)$, with error at most half an LSB, $\abs{r - k2^{-n}} \le 2^{-n-1}$, provided $r$ lies in range.
:::

Adding two numbers in the same Q format is plain integer addition. Multiplying a Q$m_1$.$n_1$ number by a Q$m_2$.$n_2$ number gives an exact product with $n_1 + n_2$ fraction bits, in format Q$(m_1 + m_2)$.$(n_1 + n_2)$; to return to the original width the hardware shifts right by $n_2$ bits (discarding or rounding the low bits) and checks that the high bits are merely sign copies.

::: warning Q-format conventions differ
There is no single standard. Many DSP manuals write Q15 for a 16-bit format with 15 fraction bits and do *not* count the sign bit (our Q1.15); others write Q$m$.$n$ with $m$ excluding the sign. Always check the total width: $m + n$ should equal the register size in the convention you are reading.
:::

The figure shows the staircase that quantisation imposes on a continuous value, and the error it introduces.

::: widget plot
f: round(x*2^n)/2^n; x - round(x*2^n)/2^n
x: -1, 1
y: -1, 1
sliders: n=3:0:8:1
labels: \text{quantised } x; \text{error}
caption: Quantising $x$ to $n$ fraction bits. The staircase has steps of $2^{-n}$, and the error (orange) is a sawtooth that never exceeds half a step. Increase $n$ by one and the error halves: each extra bit buys about $6\,\mathrm{dB}$ of signal-to-quantisation-noise ratio.
:::

::: example A filter coefficient in Q1.15 {#ex-q115}
A 16-bit DSP stores coefficients in Q1.15. Find the stored integer for $0.3$ and for $-0.75$, the quantisation error of $0.3$, and the Q1.15 result of the product $0.5 \times (-0.75)$.
::: solution
The resolution is $2^{-15} = 1/32768 \approx 3.05\times 10^{-5}$ and the range is $[-1, 1 - 2^{-15}]$ by [[#eq-qrange]].

$0.3 \times 32768 = 9830.4$, which rounds to $k = 9830 = \mathrm{2666}_{16}$. The stored value is $9830/32768 = 0.299987793\ldots$, an error of $1.22\times 10^{-5}$, below the half-LSB bound $1.53 \times 10^{-5}$.

$-0.75 \times 32768 = -24576$ exactly, a 16-bit pattern of $65536 - 24576 = 40960 = \mathrm{A000}_{16}$.

$0.5$ is $16384$. The integer product is $16384 \times (-24576) = -402\,653\,184$, a Q2.30 number. Shifting right by 15 bits (an arithmetic shift, which copies the sign bit) gives $-402\,653\,184 / 32768 = -12288$, and $-12288/32768 = -0.375$, exactly the true product.
:::
:::

::: example Choosing a fixed-point format {#ex-design-q}
A sensor produces voltages between $-5\,\mathrm{V}$ and $+5\,\mathrm{V}$ that must be stored in 16-bit registers with a resolution of $1\,\mathrm{mV}$ or better, the value $1$ in the register representing $1\,\mathrm{V}$. Choose a Q$m$.$n$ format with $m + n = 16$.
::: solution
*Range.* We need $2^{m-1} - 2^{-n} \ge 5$ and $-2^{m-1} \le -5$. With $m = 3$ the range is about $\pm 4$, too small; $m = 4$ gives $[-8, 8 - 2^{-12}]$, enough.

*Resolution.* With $m = 4$, $n = 12$ and the LSB is $2^{-12}\,\mathrm{V} = 0.244\,\mathrm{mV}$, better than the required $1\,\mathrm{mV}$.

So Q4.12 meets both requirements. (Q5.11 would also work, with an LSB of $0.488\,\mathrm{mV}$ and range $\pm 16\,\mathrm{V}$, but it wastes a bit of resolution on range we do not need. The general rule: give the integer part just enough bits for the largest magnitude and spend the rest on resolution.)
:::
:::

Fixed point has a fixed absolute resolution: tiny values are stored with few significant bits. **Floating point** instead stores a sign, an exponent and a significand, giving roughly constant *relative* precision over an enormous range at the cost of a much more complex adder. It is treated in [Floating point](/learn/cs/lesson.php?c=computer-systems&l=floating-point) and, from the hardware side, in [[computer-architecture/computer-arithmetic]].

## Codes for special purposes

A **code** is any agreed mapping between values and bit patterns. Binary and two's complement are codes chosen for cheap arithmetic; other codes are chosen for different virtues.

### Binary-coded decimal

In **binary-coded decimal** (BCD, or 8421 code) each decimal digit is stored in its own 4-bit group: $2026$ becomes $0010\;0000\;0010\;0110$. Only ten of the sixteen 4-bit patterns are used, so BCD wastes about 17 % of the storage ($\log_2 10/4 \approx 0.83$), and arithmetic needs a correction step. In exchange, conversion to and from decimal digits is trivial, which is why BCD appears in clocks, meters, seven-segment displays and financial arithmetic where decimal rounding must be exact.

To add two BCD digits, add them as binary numbers; if the 4-bit result exceeds $9$ or a carry out of the group occurs, add $6 = 0110_2$ to skip the six unused patterns and pass a carry to the next digit.

::: example A BCD addition {#ex-bcd}
Add the BCD numbers $27$ and $38$.
::: solution
In BCD, $27 = 0010\,0111$ and $38 = 0011\,1000$. Binary addition of the low digits gives $0111 + 1000 = 1111 = 15$, larger than $9$, so add $0110$: $1111 + 0110 = 1\,0101$. The low digit is $0101 = 5$ with a carry of $1$. The high digits give $0010 + 0011 + 1 = 0110 = 6$, which is valid. The result is $0110\,0101 = 65$ in BCD, and indeed $27 + 38 = 65$.

Note what plain binary addition of the two 8-bit patterns would have given: $0010\,0111 + 0011\,1000 = 0101\,1111 = \mathrm{5F}_{16}$, not a BCD number at all. The $+6$ correction is what turns $\mathrm{5F}$ into $65$.
:::
:::

### Gray code

Imagine a rotary shaft encoder: a disc with tracks of transparent and opaque segments read by a row of light sensors, giving the shaft angle as a 3-bit number. Between positions $3 = 011$ and $4 = 100$ all three bits change. The sensors are never perfectly aligned, so as the disc turns the reader may briefly see $111$ or $000$ — values wildly far from the truth. The cure is a code in which consecutive values differ in exactly one bit.

::: definition Gray code {#def-gray}
The $n$-bit **(reflected binary) Gray code** of the binary number $b_{n-1}\dots b_0$ is $g_{n-1}\dots g_0$ with

$$
g_{n-1} = b_{n-1}, \qquad g_i = b_{i+1} \oplus b_i \quad (0 \le i \le n-2),
$$ {#eq-gray}

that is, $G = B \oplus (B \gg 1)$. The inverse is $b_{n-1} = g_{n-1}$, $b_i = b_{i+1} \oplus g_i$: each binary bit is the exclusive OR of all Gray bits at or above its position.
:::

| value | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---|---|---|---|---|---|---|---|
| binary | $000$ | $001$ | $010$ | $011$ | $100$ | $101$ | $110$ | $111$ |
| Gray | $000$ | $001$ | $011$ | $010$ | $110$ | $111$ | $101$ | $100$ |

::: proposition Unit distance of the Gray code {#prop-gray}
Consecutive values $B$ and $B + 1$ (and also $2^n - 1$ and $0$) have Gray codes that differ in exactly one bit.
:::

::: proof
Incrementing $B$ changes a block of bits: if $B$ ends in a $0$ followed by $k \ge 0$ ones, $B+1$ ends in a $1$ followed by $k$ zeros, and the bits above are unchanged. Let the changing $0$ be at position $j$. For $i > j$, both $b_i$ and $b_{i+1}$ are unchanged, so $g_i$ is unchanged. For $i < j$, both $b_i$ and $b_{i+1}$ flip (from $1$ to $0$, with $b_j$ going $0\to1$ at $i = j-1$), so $g_i = b_{i+1}\oplus b_i$ is unchanged. At $i = j$ only $b_j$ flips (and $b_{j+1}$ does not), so $g_j$ flips. Exactly one Gray bit changes. For the wrap from $11\dots1$ to $00\dots0$, the Gray codes are $10\dots0$ and $00\dots0$, which differ only in the MSB.
:::

The name "reflected" describes a recursive construction: list the $(n-1)$-bit code, then the same list in reverse order, and prefix the first half with $0$ and the second with $1$. Gray codes appear in shaft encoders, in the labelling of Karnaugh-map rows and columns ([[digital-logic/logic-minimisation]]), and — critically — in the read and write pointers of asynchronous FIFOs, where a counter value must be passed safely between two clock domains ([[digital-logic/hardware-description]]).

::: example Decoding a Gray value {#ex-gray}
An encoder outputs the 4-bit Gray code $1101$. What position is it?
::: solution
Using the inverse rule, from the top: $b_3 = g_3 = 1$; $b_2 = b_3 \oplus g_2 = 1 \oplus 1 = 0$; $b_1 = b_2 \oplus g_1 = 0 \oplus 0 = 0$; $b_0 = b_1 \oplus g_0 = 0 \oplus 1 = 1$. So $B = 1001_2 = 9$. Check forwards with [[#eq-gray]]: $1001 \oplus 0100 = 1101$. ✓
:::
:::

### Parity, distance and character codes

The **Hamming distance** between two bit strings is the number of positions in which they differ; the Gray code has distance $1$ between neighbours. Error-detecting codes go the other way and make legal codewords *far* apart. The simplest adds a **parity bit** $p = a_{n-1}\oplus\dots\oplus a_0$ (even parity), so every legal word has an even number of ones and its codewords are at distance $\ge 2$; any single-bit error makes the count odd and is detected. Codes with larger distance can correct errors, as developed in [[information-theory/linear-block-codes]].

Text is coded too. **ASCII** assigns 7-bit codes to 128 characters (`A` is $41_{16}$, `a` is $61_{16}$ — the two cases differ only in bit 5, a deliberate design choice); **Unicode**, encoded on most systems as UTF-8, extends this to well over a hundred thousand characters with variable-length sequences of bytes.

::: application Where the codes live
Open the datasheet of a real-time clock chip and you will find the time stored in BCD registers, ready for a display. An absolute rotary encoder on a robot joint outputs Gray code. An audio codec delivers 24-bit two's complement samples. A microcontroller's memory bus may carry a parity or ECC bit with every byte. Choosing a representation is the first design decision in nearly every digital system.
:::

::: history
Positional notation with a zero reached Europe from India via Arabic mathematics; the binary system as arithmetic was published by Gottfried Wilhelm Leibniz in 1703. Early relay and vacuum-tube computers were often decimal — ENIAC (1945) computed with ten-position ring counters — but John von Neumann's 1945 *First Draft of a Report on the EDVAC* argued for binary because of its simpler circuits, and binary machines prevailed. Two's complement was used in the EDSAC (1949) and in many later machines, and became universal with the minicomputers and microprocessors of the 1960s and 1970s. Frank Gray of Bell Labs filed his patent on "pulse code communication" using the reflected binary code in 1947; it was granted in 1953.
:::

## Where this leads

Two's complement addition, subtraction and overflow detection reappear as circuits in [[digital-logic/combinational-building-blocks]], where the full adder of [[#eq-bitadd]] is built from gates. Gray code returns as the ordering of Karnaugh maps in [[digital-logic/logic-minimisation]] and in state assignment for [[digital-logic/finite-state-machines]]. Fast multipliers, dividers and floating-point units are the subject of [[computer-architecture/computer-arithmetic]], and finite word-length effects in filters are studied in [[dsp/filter-structures]]. The next chapter, [[digital-logic/boolean-algebra]], gives us the algebra in which all these circuits are designed.

::: summary
- An $n$-digit base-$b$ string represents $\sum d_i b^i$; $n$ bits cover the unsigned integers $0$ to $2^n - 1$ uniquely ([[#thm-range]]). Convert by repeated division (integers) and repeated multiplication (fractions); group bits in fours for hexadecimal.
- Many decimal fractions, such as $0.1$, have infinite binary expansions and can only be approximated.
- An $n$-bit adder computes modulo $2^n$; for unsigned numbers the carry out $C$ signals overflow.
- Two's complement gives the MSB weight $-2^{n-1}$; the range is $-2^{n-1}$ to $2^{n-1} - 1$, negation is "invert and add one" and widening copies the sign bit.
- Subtraction is $A + \overline{B} + 1$ on the same adder; signed overflow is $V = c_{n-1}\oplus c_n$, which can only happen when the operands have the same sign.
- Q$m$.$n$ fixed point is an integer scaled by $2^{-n}$: resolution $2^{-n}$, error at most half an LSB; products have $n_1 + n_2$ fraction bits.
- BCD stores decimal digits in 4-bit groups and needs a $+6$ correction in addition; Gray code changes one bit between neighbours; a parity bit detects any single-bit error.
:::

## Exercises

::: exercise Binary to decimal {level=1 check="173"}
What is the unsigned value of $1010\,1101_2$?
::: solution
$128 + 32 + 8 + 4 + 1 = 173$. In hexadecimal it is $\mathrm{AD}_{16} = 10\cdot 16 + 13 = 173$.
:::
:::

::: exercise Hexadecimal to binary and decimal {level=1 check="48879"}
Write $\mathrm{BEEF}_{16}$ in binary and find its unsigned decimal value.
::: solution
Each hex digit becomes four bits: $\mathrm{B} = 1011$, $\mathrm{E} = 1110$, $\mathrm{E} = 1110$, $\mathrm{F} = 1111$, so $\mathrm{BEEF}_{16} = 1011\,1110\,1110\,1111_2$. Its value is $11\cdot 4096 + 14 \cdot 256 + 14\cdot 16 + 15 = 45056 + 3584 + 224 + 15 = 48879$.
:::
:::

::: exercise Bits for a counter {level=1 check="10"}
A counter must count from $0$ up to $1000$ inclusive. How many flip-flops (bits) does it need?
::: solution
By [[#thm-range]], $\lceil \log_2 1001\rceil$ bits. Since $2^9 = 512 < 1001 \le 1024 = 2^{10}$, it needs $10$ bits.
:::
:::

::: exercise A two's complement pattern {level=1 check="-100"}
What value does the 8-bit two's complement pattern $\mathrm{9C}_{16}$ represent?
::: solution
$\mathrm{9C}_{16} = 1001\,1100_2$. With [[#eq-twos]]: $-128 + 16 + 8 + 4 = -100$. Alternatively, its unsigned value is $156$, and $156 - 256 = -100$.
:::
:::

::: exercise Converting a fraction {level=2}
Convert $13.6875_{10}$ to binary and to hexadecimal, and state whether $0.2_{10}$ has a finite binary expansion.
::: solution
Integer part: $13 = 1101_2$. Fraction by repeated doubling: $0.6875\times2 = 1.375$ (digit $1$), $0.375 \times 2 = 0.75$ ($0$), $0.75\times2 = 1.5$ ($1$), $0.5 \times 2 = 1.0$ ($1$), remainder $0$. So $13.6875 = 1101.1011_2 = \mathrm{D.B}_{16}$ (check: $13 + 11/16 = 13.6875$).

$0.2 = 1/5$ has the factor $5$ in its denominator, which does not divide $2$, so its binary expansion is infinite: $0.2 = 0.\overline{0011}_2$.
:::
:::

::: exercise Subtraction with flags {level=2}
Using 8-bit two's complement, compute $45 - 100$ with the adder, as $45 + \overline{100} + 1$. Give the result bits, the carry out $C$, the overflow flag $V$, and the signed result.
::: hint
First form $\overline{100}$; then add with a carry in of $1$.
:::
::: solution
$45 = 0010\,1101$ and $100 = 0110\,0100$, so $\overline{100} = 1001\,1011$. Adding with carry in $1$: $0010\,1101 + 1001\,1011 + 1 = 1100\,1001$, with no carry out, so $C = 0$. As two's complement, $1100\,1001 = -128 + 64 + 8 + 1 = -55$, the correct value of $45 - 100$, so $V = 0$ (the operands of the addition, $45$ and $-101$, have opposite signs, so overflow is impossible by [[#thm-overflow]]). For an unsigned subtraction $C = 0$ means "a borrow occurred": as unsigned numbers, $45 < 100$.
:::
:::

::: exercise Gray code of a counter {level=2}
Write the 4-bit Gray codes of $6$, $7$ and $8$, and verify that each pair of neighbours differs in exactly one bit. Then decode the Gray value $0111$.
::: solution
With $G = B \oplus (B\gg1)$: $6 = 0110 \to 0110 \oplus 0011 = 0101$; $7 = 0111 \to 0111\oplus0011 = 0100$; $8 = 1000 \to 1000 \oplus 0100 = 1100$. $0101$ and $0100$ differ in bit 0 only; $0100$ and $1100$ in bit 3 only. ✓

Decoding $0111$: $b_3 = 0$, $b_2 = 0\oplus1 = 1$, $b_1 = 1\oplus1 = 0$, $b_0 = 0\oplus 1 = 1$, so $B = 0101 = 5$.
:::
:::

::: exercise Fixed-point product {level=2 check="-0.75"}
Two Q4.4 numbers (8 bits, 4 fraction bits) have bit patterns $0001\,1000$ and $1111\,1000$. Find their values, the exact product, and the Q4.4 result after shifting right by 4 bits. Give the final value.
::: solution
$0001\,1000 = 24$, so the first value is $24/16 = 1.5$. $1111\,1000 = -8$, so the second is $-8/16 = -0.5$. The integer product is $24 \times (-8) = -192$, a Q8.8 number worth $-192/256 = -0.75$. Shifting right by 4 bits gives $-12$, which in Q4.4 is $-12/16 = -0.75$. The final value is $-0.75$. The exact product $1.5\times(-0.5) = -0.75$ is representable in Q4.4, so no rounding is involved.
:::
:::

::: exercise Proving the parity property {level=3}
Show that the even-parity code on $n$ data bits (append $p = a_{n-1}\oplus\cdots\oplus a_0$) has minimum Hamming distance exactly $2$, and explain why this means it detects every single-bit error but cannot correct any.
::: hint
How does the parity of the number of ones change when one bit flips?
:::
::: solution
Every codeword has an even number of ones, because $p$ is $1$ exactly when the data has an odd number of ones. Flipping one bit changes the number of ones by $\pm1$, making it odd, so no two codewords are at distance $1$: the minimum distance is at least $2$. It is exactly $2$: take any data word, flip one data bit and the parity bit; both are codewords at distance $2$. A single-bit error produces a word with odd parity, which is not a codeword, so it is detected. But such a word is at distance $1$ from several codewords (flipping any one of its bits restores even parity), so the receiver cannot tell which bit was wrong: no correction is possible. Correcting one error needs minimum distance $3$.
:::
:::

::: exercise A saturating adder {level=3}
A digital audio mixer adds 16-bit two's complement samples and must *saturate*: a result that overflows is replaced by $+32767$ or $-32768$ instead of wrapping. Using [[#thm-overflow]], describe the logic that decides when to saturate and which limit to output, in terms of the operand sign bits $a_{15}$, $b_{15}$ and the raw sum bit $s_{15}$.
::: hint
Overflow can only occur when $a_{15} = b_{15}$, and then the correct sign is that common sign.
:::
::: solution
Overflow occurs exactly when the operands have the same sign and the raw result has the other sign:

$$
V = \overline{a_{15}}\,\overline{b_{15}}\,s_{15} + a_{15}\,b_{15}\,\overline{s_{15}} .
$$

When $V = 0$, output the raw sum. When $V = 1$, the true sum has the sign of the operands: if $a_{15} = 0$ (both positive) output $+32767 = 0111\,1111\,1111\,1111$; if $a_{15} = 1$ (both negative) output $-32768 = 1000\,0000\,0000\,0000$. Note the saturated value is "$a_{15}$ followed by fifteen copies of $\overline{a_{15}}$", so the whole circuit is the adder, one overflow detector and a 16-bit two-way multiplexer selecting between the raw sum and that constant. Without saturation, a loud signal that slightly exceeds full scale would wrap from $+32767$ to about $-32768$, an audible full-scale click; saturation turns it into mild clipping instead.
:::
:::
