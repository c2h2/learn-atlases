On 4 June 1996 the first Ariane 5 rocket veered off course 37 seconds after launch and was destroyed. The inquiry traced the loss to a single line of flight software: a 64-bit floating-point number describing the rocket's horizontal velocity was converted to a 16-bit signed integer. On the slower Ariane 4, for which the code had been written, the value always fitted. On Ariane 5 it did not, the conversion raised an exception that nothing handled, and the guidance computers shut down. Nothing was wrong with the mathematics; what was wrong was an assumption about how many **bits** a number needs.

Here is a smaller surprise, in C on any ordinary computer:

```c
int a = -1;
unsigned b = 0;
if (a < b) printf("-1 < 0u\n"); else printf("-1 >= 0u\n");
```

This prints `-1 >= 0u`. In [[programming-1/values-types]] integers were exact and unbounded, because Python hides their representation. A C `int` is not an integer in the mathematical sense: it is a fixed-length pattern of bits, and the operations on it are defined on the patterns. This chapter makes those patterns explicit. We introduce binary and hexadecimal notation and the byte, define the two standard ways of reading a bit pattern as a number — **unsigned** and **two's complement** — prove what addition, negation and multiplication actually compute, and use the results to explain overflow, the signed/unsigned trap above, and a class of security bugs.

All C in this chapter was compiled with GCC 15.2 as `gcc -std=c17 -Wall -Wextra` on x86-64 Linux, and checked with `-fsanitize=address,undefined`. The integer sizes quoted are those of that platform (the "LP64" model used by Linux, macOS and the BSDs on 64-bit hardware).

## Bits, bytes and hexadecimal

A **bit** is a quantity with two values, written $0$ and $1$. Electronic circuits represent the two values reliably as two voltage ranges, which is why digital computers are binary (how transistors and gates do this is the subject of [EE Atlas: digital logic](/learn/ee/)). A single bit can say yes or no; meaning comes from grouping bits and agreeing on how to interpret the group.

::: definition Bit vector {#def-bit-vector}
A **bit vector** of width $w$ is a sequence $\vec{x} = [x_{w-1}, x_{w-2}, \ldots, x_1, x_0]$ of $w$ bits, written with the **most significant bit** $x_{w-1}$ on the left and the **least significant bit** $x_0$ on the right. There are $2^w$ bit vectors of width $w$. A **byte** is a bit vector of width $8$; it has $256$ possible values.
:::

The byte is the smallest unit of memory a program can address: memory is, to a first approximation, a huge array of bytes, each identified by a number called its **address** (pointers and addresses are the subject of [[computer-systems/c-programming]]). Larger values occupy several consecutive bytes. On x86-64 Linux the C types have these sizes:

| C type | bytes | bits | typical use |
|---|---|---|---|
| `char`, `unsigned char` | 1 | 8 | characters, raw bytes |
| `short` | 2 | 16 | |
| `int`, `unsigned` | 4 | 32 | the default integer |
| `long`, `unsigned long` | 8 | 64 | |
| `long long` | 8 | 64 | |
| `void *` and other pointers | 8 | 64 | addresses |
| `size_t` | 8 | 64 | sizes and array indices |

The C standard only guarantees minimum sizes (an `int` has at least 16 bits, a `long` at least 32), and Windows on x86-64 keeps `long` at 32 bits. When the exact width matters, use the types of `<stdint.h>`: `int8_t`, `uint16_t`, `int32_t`, `uint64_t` and so on have exactly the stated number of bits.

### Hexadecimal

Writing 32 or 64 bits in binary is error-prone, and decimal hides the bit structure. **Hexadecimal** (base 16) is the compromise: each hex digit `0`–`9`, `a`–`f` stands for exactly four bits, so a byte is two hex digits and a 32-bit word is eight. In C and in this course hexadecimal numbers carry the prefix `0x`.

| hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | a | b | c | d | e | f |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| binary | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| decimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |

Converting between binary and hex is a matter of grouping bits in fours *from the right*. Converting to and from decimal needs arithmetic: a hex numeral $h_{k-1}\ldots h_1h_0$ has value $\sum_i h_i 16^i$, and repeated division by $16$ produces the digits of a decimal number from the right.

::: example Converting between bases {#ex-hex}
Write $0x3\mathrm{A}7$ in binary and decimal, and write $1000$ in hexadecimal.
::: solution
Each hex digit becomes four bits: $3 = 0011$, $\mathrm{A} = 1010$, $7 = 0111$, so $0x3\mathrm{A}7 = 0011\,1010\,0111_2$ (the leading zeros may be dropped: $1110100111_2$). Its value is $3\cdot 16^2 + 10 \cdot 16 + 7 = 768 + 160 + 7 = 935$.

For $1000$: $1000 = 62 \cdot 16 + 8$, $62 = 3\cdot 16 + 14$, $3 = 0 \cdot 16 + 3$. Reading the remainders from last to first gives $3, 14, 8$, that is $1000 = 0x3\mathrm{E}8$. Check: $3 \cdot 256 + 14 \cdot 16 + 8 = 768 + 224 + 8 = 1000$. Python agrees: `hex(1000)` is `'0x3e8'` and `0x3a7` is `935`.
:::
:::

A useful landmark: $2^{10} = 1024 \approx 10^3$, so $2^{20} \approx 10^6$, $2^{30} \approx 10^9$ and $2^{32} = 4\,294\,967\,296 \approx 4.3 \times 10^9$. This is why memory sizes use the binary prefixes KiB ($2^{10}$ bytes), MiB ($2^{20}$) and GiB ($2^{30}$).

### Byte order

A 4-byte `int` occupies four addresses. Which byte goes first? Two conventions exist. A **little-endian** machine stores the least significant byte at the lowest address; a **big-endian** machine stores the most significant byte first. x86-64 and (in their usual configuration) ARM processors are little-endian; network protocols traditionally transmit big-endian ("network byte order"), so code that sends integers over a network converts them with `htonl` and friends ([[networks]]).

We can look at the bytes directly by reading an object through a pointer to `unsigned char`, which C allows for any object:

```c
#include <stdio.h>
#include <stddef.h>

/* Print the bytes of any object, lowest address first. */
static void show_bytes(const void *p, size_t n) {
    const unsigned char *b = p;
    for (size_t i = 0; i < n; i++)
        printf(" %02x", b[i]);
    printf("\n");
}

int main(void) {
    int x = 0x01234567;
    int y = -12345;
    unsigned u = (unsigned) y;      /* same bits, read as unsigned */
    printf("x       :"); show_bytes(&x, sizeof x);
    printf("y       :"); show_bytes(&y, sizeof y);
    printf("y = %d, (unsigned) y = %u, hex 0x%x\n", y, u, u);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o bytes bytes.c && ./bytes
x       : 67 45 23 01
y       : c7 cf ff ff
y = -12345, (unsigned) y = 4294954951, hex 0xffffcfc7
```

The bytes of `0x01234567` come out "backwards", least significant first: the machine is little-endian. The second line already shows the subject of the rest of the chapter: the negative number $-12345$ is stored as the bit pattern `0xffffcfc7`, and the *same* pattern, read as an unsigned number, is $4\,294\,954\,951$. To understand why, we need precise definitions of both readings.

## Bit-level operations

Before reading bit vectors as numbers, consider operations on the bits themselves. C provides the Boolean operations of [Maths Atlas: propositional logic](/learn/maths/lesson.php?c=proofs&l=propositional-logic) applied **bitwise**, position by position: `&` (and), `|` (or), `^` (exclusive or) and `~` (not). They work on any integer type.

```c
unsigned x = 0x69, y = 0x55;     /* 0110 1001 and 0101 0101 */
x & y    /* 0x41  = 0100 0001 : bits set in both            */
x | y    /* 0x7d  = 0111 1101 : bits set in either          */
x ^ y    /* 0x3c  = 0011 1100 : bits set in exactly one     */
~x       /* 0xffffff96 : all 32 bits flipped                */
```

These are not the logical operators `&&`, `||` and `!`, which treat a whole value as true (non-zero) or false (zero) and short-circuit: `0x69 && 0x55` is `1`, while `0x69 & 0x55` is `0x41`. Confusing the two is a classic bug.

Bitwise operations obey the laws of Boolean algebra in each bit position, so identities such as De Morgan's law `~(x & y) == (~x | ~y)` hold for whole words. Exclusive or has the extra property that every value is its own inverse: `x ^ x == 0` and `x ^ 0 == x`, so `(x ^ y) ^ y == x`. That is the basis of parity checks, of simple checksums and of the one-time pad in [[cryptography]].

::: widget truthtable
formula: (p xor q) xor q
compare: p
caption: One bit position of the identity `(x ^ y) ^ y == x`. Each row is one possible pair of bits; the last column agrees with $p$ in every row, so the identity holds in every bit position and therefore for whole words. Try replacing the formula with `~(p & q)` and the comparison with `~p | ~q` to check De Morgan's law.
:::

The main use of bitwise operations is **masking**: selecting, setting or clearing chosen bits of a word using a **mask**, a constant with ones in the positions of interest.

| goal | expression | example with `x = 0x89abcdef` |
|---|---|---|
| keep the low byte | `x & 0xff` | `0xef` |
| clear the low byte | `x & ~0xff` | `0x89abcd00` |
| set the low byte to all ones | `x \| 0xff` | `0x89abcdff` |
| flip the low byte | `x ^ 0xff` | `0x89abcd10` |
| test bit $k$ | `(x >> k) & 1` | bit 0 is `1` |

Writing `~0xff` instead of `0xffffff00` makes the code independent of the word size, a small but real gain in portability.

### Shifts

The **left shift** `x << k` moves every bit $k$ places to the left, discarding the $k$ bits that fall off the top and filling the bottom with zeros. The **right shift** `x >> k` moves bits to the right. Two kinds of right shift exist. A **logical** right shift fills the top with zeros; an **arithmetic** right shift fills it with copies of the most significant bit, which, as we shall see, preserves the sign of a two's-complement number. In C, right shifts of unsigned values are logical. Right shifts of negative signed values are *implementation-defined*; GCC, Clang and MSVC all use arithmetic shifts, so `-16 >> 2` is `-4` on every mainstream compiler.

Shifting by $k \ge w$ or by a negative amount is undefined behaviour in C. On x86-64 the hardware happens to use only the low 5 bits of the count for 32-bit shifts (so `x << 32` would often give `x`), but a C compiler is entitled to assume such shifts never happen.

## Unsigned integers

The first way to read a bit vector as a number is the ordinary binary positional system.

::: definition Unsigned encoding {#def-b2u}
For a bit vector $\vec{x}$ of width $w$, its **unsigned value** is

$$
B2U_w(\vec{x}) = \sum_{i=0}^{w-1} x_i 2^i .
$$ {#eq-b2u}

The smallest value is $UMin_w = 0$ (all zeros) and the largest is $UMax_w = \sum_{i=0}^{w-1} 2^i = 2^w - 1$ (all ones).
:::

For example $B2U_4([1011]) = 8 + 0 + 2 + 1 = 11$, and $UMax_{32} = 4\,294\,967\,295$, which C calls `UINT_MAX`.

::: theorem Uniqueness of unsigned encoding {#thm-b2u-bijection}
$B2U_w$ is a bijection from the $2^w$ bit vectors of width $w$ onto the integers $\set{0, 1, \ldots, 2^w - 1}$.
:::

::: proof
Every value lies in the range because $0 \le B2U_w(\vec{x}) \le \sum_i 2^i = 2^w - 1$. The domain and the range both have $2^w$ elements, so it suffices to prove that $B2U_w$ is injective. Suppose $\vec{x} \ne \vec{y}$, and let $k$ be the highest position in which they differ, say $x_k = 1$ and $y_k = 0$. The positions above $k$ contribute equally to both values, so

$$
B2U_w(\vec{x}) - B2U_w(\vec{y}) = 2^k + \sum_{i<k} (x_i - y_i)2^i \ge 2^k - \sum_{i<k} 2^i = 2^k - (2^k - 1) = 1 > 0 .
$$

Hence the values differ.
:::

The inverse of $B2U_w$ is the familiar procedure for writing a number in binary: repeatedly divide by two and record the remainders.

## Two's complement

Negative numbers need a different reading. One could reserve the top bit for a sign and use the rest as a magnitude (**sign–magnitude**), but then there are two zeros, $+0$ and $-0$, and the addition circuit must compare signs and subtract. The representation used by essentially every processor since the 1960s does something cleverer: it gives the most significant bit a *negative* weight.

::: definition Two's-complement encoding {#def-b2t}
For a bit vector $\vec{x}$ of width $w$, its **two's-complement value** is

$$
B2T_w(\vec{x}) = -x_{w-1} 2^{w-1} + \sum_{i=0}^{w-2} x_i 2^i .
$$ {#eq-b2t}

The most significant bit is the **sign bit**: it is $1$ exactly when the value is negative. The smallest value is $TMin_w = -2^{w-1}$ (pattern $10\cdots0$) and the largest is $TMax_w = 2^{w-1} - 1$ (pattern $01\cdots1$).
:::

For $w = 4$, the sixteen patterns read as follows:

| bits | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| unsigned | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| two's complement | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | −8 | −7 | −6 | −5 | −4 | −3 | −2 | −1 |

Three facts stand out. Non-negative values have the same pattern in both encodings. All ones means $-1$. And the range is asymmetric: $TMin_4 = -8$ has no positive partner, because $+8$ would need a fifth bit. For 32 bits, $TMin_{32} = -2\,147\,483\,648$ (`INT_MIN`) and $TMax_{32} = 2\,147\,483\,647$ (`INT_MAX`).

::: theorem Two's complement and unsigned {#thm-t2u}
$B2T_w$ is a bijection from bit vectors of width $w$ onto $\set{-2^{w-1}, \ldots, 2^{w-1}-1}$, and for every bit vector

$$
B2U_w(\vec{x}) = B2T_w(\vec{x}) + x_{w-1} 2^w .
$$ {#eq-t2u}

So the two readings agree when the sign bit is $0$ and differ by exactly $2^w$ when it is $1$. In particular $B2U_w(\vec{x}) \equiv B2T_w(\vec{x}) \pmod{2^w}$.
:::

::: proof
Subtracting [[#eq-b2t]] from [[#eq-b2u]], every term cancels except the top one: $B2U_w(\vec{x}) - B2T_w(\vec{x}) = x_{w-1}2^{w-1} - (-x_{w-1}2^{w-1}) = x_{w-1}2^w$, which is [[#eq-t2u]]. For bijectivity, the map $u \mapsto u$ for $u < 2^{w-1}$ and $u \mapsto u - 2^w$ for $u \ge 2^{w-1}$ is a bijection from $\set{0, \ldots, 2^w - 1}$ onto $\set{-2^{w-1}, \ldots, 2^{w-1}-1}$; by [[#eq-t2u]], $B2T_w = $ this map $\circ\, B2U_w$, a composition of bijections ([[#thm-b2u-bijection]]).
:::

This explains the output of `show_bytes`: $-12345$ is negative, so its 32-bit pattern has unsigned value $-12345 + 2^{32} = 4\,294\,954\,951 = $ `0xffffcfc7`.

The congruence in [[#thm-t2u]] is the real reason two's complement is so successful. Arranged on a circle, the $2^w$ bit patterns are the residues modulo $2^w$; unsigned and two's complement are just two choices of *representative* for each residue, one in $[0, 2^w)$ and one in $[-2^{w-1}, 2^{w-1})$. Since the hardware computes on residues, the same adder serves both.

::: widget modular
n: 16
mode: clock
a: 5
caption: The sixteen 4-bit patterns arranged on a clock: addition of 4-bit integers is addition modulo $16$. Read positions $0$–$7$ as themselves and $8$–$15$ either as unsigned $8$–$15$ or as two's-complement $-8$ to $-1$ (subtract $16$). Step forward from $7$: unsigned arithmetic goes to $8$, but in two's complement $7 + 1$ lands on $-8$ — that is overflow. Notice that the jump between $15$ and $0$ is where *unsigned* arithmetic wraps, and the jump between $7$ and $8$ is where *signed* arithmetic wraps.
:::

::: example Negating in two's complement {#ex-negate}
Find the 8-bit two's-complement patterns of $53$ and $-53$, and check that "flip all the bits and add one" turns one into the other.
::: solution
$53 = 32 + 16 + 4 + 1$, so its pattern is $0011\,0101$ (`0x35`). By [[#thm-t2u]], $-53$ has the pattern whose unsigned value is $-53 + 256 = 203 = 128 + 64 + 8 + 2 + 1$, that is $1100\,1011$ (`0xcb`).

Flipping the bits of $0011\,0101$ gives $1100\,1010$, and adding one gives $1100\,1011$: the pattern of $-53$. In the other direction, flipping $1100\,1011$ gives $0011\,0100$, and adding one gives $0011\,0101 = 53$.

The rule always works: for any $\vec{x}$, the unsigned values of $\vec{x}$ and $\sim\vec{x}$ add up to $UMax_w = 2^w - 1$ (each position contributes exactly one $1$), so $\sim x + 1 \equiv -x \pmod{2^w}$, which by [[#thm-t2u]] is exactly two's-complement negation. In C, `-x == ~x + 1` for every `unsigned x`, and for every `int x` except `INT_MIN`, whose negation overflows.
:::
:::

::: quiz
An 8-bit value has the pattern `0x9c`. Which statements are correct?
- [x] As an unsigned number it is $156$.
- [x] As a two's-complement number it is $-100$.
- [ ] As a two's-complement number it is $-28$.
- [ ] It cannot be read as a two's-complement number because the top bit is set.
::: solution
`0x9c` $= 1001\,1100_2 = 128 + 16 + 8 + 4 = 156$ unsigned. The sign bit is $1$, so by [[#thm-t2u]] the two's-complement value is $156 - 256 = -100$. (Ignoring the sign bit and negating the rest, $-28$, would be the sign–magnitude reading, which no modern integer hardware uses.)
:::
:::

## Conversions, extension and truncation

C programs constantly move values between integer types of different widths and signedness. The rules are simple once stated in terms of bits.

**Between signed and unsigned of the same width**, C keeps the bit pattern and changes its interpretation. By [[#thm-t2u]], converting a negative `int` $x$ to `unsigned` gives $x + 2^{32}$, and converting an `unsigned` $u \ge 2^{31}$ to `int` gives $u - 2^{32}$. (Strictly, the C17 standard defines unsigned-to-signed conversion of out-of-range values as implementation-defined; every mainstream compiler keeps the bits, and C23 requires two's complement.)

The dangerous part is that C performs this conversion *implicitly*. When an operator has one signed and one unsigned operand of the same rank, the signed operand is converted to unsigned (the "usual arithmetic conversions"). In `a < b` with `int a = -1` and `unsigned b = 0`, $a$ becomes $2^{32} - 1$, which is not less than $0$. GCC can warn about this:

```console
$ gcc -std=c17 -Wall -Wextra -o conv conv.c
conv.c: In function 'main':
conv.c:6:11: warning: comparison of integer expressions of different signedness: 'int' and 'unsigned int' [-Wsign-compare]
    6 |     if (a < b)                       /* a is converted to unsigned! */
      |           ^
```

::: warning `sizeof` and string lengths are unsigned
`sizeof` and `strlen` return `size_t`, an unsigned 64-bit type. A loop such as `for (int i = 0; i <= strlen(s) - 1; i++)` misbehaves when `s` is empty: `strlen(s) - 1` is not $-1$ but $2^{64}-1$, and the loop runs far past the end of the string. Likewise `for (size_t i = n - 1; i >= 0; i--)` never terminates, because an unsigned `i` is always $\ge 0$. Prefer `i < strlen(s)`, count down with `for (size_t i = n; i-- > 0; )`, compile with `-Wall -Wextra`, and read every sign-comparison warning.
:::

**Widening** a value to a larger type must preserve it. For unsigned values we add zeros at the top (**zero extension**). For two's-complement values we copy the sign bit into the new positions (**sign extension**).

::: theorem Sign extension preserves value {#thm-sign-ext}
Let $\vec{x} = [x_{w-1}, \ldots, x_0]$ and let $\vec{x}' = [x_{w-1}, \ldots, x_{w-1}, x_{w-1}, x_{w-2}, \ldots, x_0]$ be $\vec{x}$ extended to width $w + k$ by $k$ copies of its sign bit. Then $B2T_{w+k}(\vec{x}') = B2T_w(\vec{x})$.
:::

::: proof
By induction on $k$; the case $k = 0$ is trivial, so it suffices to show that adding one copy of the sign bit preserves the value. Write $s = x_{w-1}$. In $\vec{x}$ the top bit contributes $-s2^{w-1}$. In the extended vector of width $w+1$, position $w$ contributes $-s2^{w}$ and position $w-1$ now has positive weight $+s2^{w-1}$; together $-s2^w + s2^{w-1} = -s2^{w-1}$. All lower positions are unchanged, so the values are equal.
:::

**Narrowing** a value to fewer bits (**truncation**) keeps the low $k$ bits and drops the rest. For unsigned numbers that computes $x \bmod 2^k$; for two's complement the low $k$ bits are then reinterpreted, which can change the sign. These rules account for the output of the following program:

```c
#include <stdio.h>

int main(void) {
    short s = -12345;
    int widened = s;                 /* sign extension */
    unsigned short us = (unsigned short) s;
    int zero_ext = us;               /* zero extension */
    printf("%d %d %d\n", widened, us, zero_ext);
    int big = 53191;
    short t = (short) big;           /* truncation: keep low 16 bits */
    printf("%d\n", t);
    return 0;
}
```

```console
$ ./conv2
-12345 53191 53191
-12345
```

::: example Reading a conversion table {#ex-convert}
With 16-bit `short`, explain each number printed above.
::: solution
$-12345$ as a 16-bit pattern has unsigned value $-12345 + 2^{16} = 53191$ (`0xcfc7`). Assigning the `short` to an `int` sign-extends to `0xffffcfc7`, which is still $-12345$ by [[#thm-sign-ext]]. Converting the `short` to `unsigned short` keeps the bits, giving $53191$, and widening that to `int` zero-extends to `0x0000cfc7` $= 53191$.

Truncating the `int` $53191$ (`0x0000cfc7`) to 16 bits keeps `0xcfc7`, whose two's-complement value is $53191 - 65536 = -12345$. A positive number became negative because its 16-bit truncation has the sign bit set.
:::
:::

## Integer arithmetic

We can now say exactly what the machine computes. Write $x +^u_w y$ for the result of adding two $w$-bit unsigned numbers and $x +^t_w y$ for two's-complement addition.

::: theorem Unsigned addition {#thm-uadd}
For $0 \le x, y < 2^w$,

$$
x +^u_w y = (x + y) \bmod 2^w = \begin{cases} x + y & \text{if } x + y < 2^w, \\ x + y - 2^w & \text{if } 2^w \le x + y < 2^{w+1} \text{ (overflow)}. \end{cases}
$$

Overflow occurred if and only if the result is less than $x$ (equivalently, less than $y$).
:::

::: proof
The exact sum satisfies $0 \le x + y \le 2^{w+1} - 2$, so it needs at most $w + 1$ bits. The adder produces the low $w$ bits, which is the sum modulo $2^w$; since $x + y < 2^{w+1}$, subtracting $2^w$ at most once suffices. For the test: without overflow, $s = x + y \ge x$. With overflow, $s = x + (y - 2^w)$ and $y - 2^w < 0$, so $s < x$.
:::

So `UINT_MAX + 1u` is $0$, a defined result in C: unsigned arithmetic is arithmetic modulo $2^w$ by definition of the language. The test in the theorem is how careful C code checks unsigned addition: `if (x + y < x) /* overflowed */`.

::: theorem Two's-complement addition {#thm-tadd}
For $-2^{w-1} \le x, y < 2^{w-1}$, let $s = x + y$ be the exact sum. Then

$$
x +^t_w y = \begin{cases} s - 2^w & \text{if } s \ge 2^{w-1} \text{ (positive overflow)}, \\ s & \text{if } -2^{w-1} \le s < 2^{w-1}, \\ s + 2^w & \text{if } s < -2^{w-1} \text{ (negative overflow)}. \end{cases}
$$

Overflow happens exactly when $x$ and $y$ have the same sign and the result has the opposite sign.
:::

::: proof
The hardware adds the patterns as unsigned numbers. By [[#thm-t2u]] their unsigned values are congruent to $x$ and $y$ modulo $2^w$, so by [[#thm-uadd]] the resulting pattern's unsigned value is congruent to $x + y$, and again by [[#thm-t2u]] its two's-complement value $r$ satisfies $r \equiv s \pmod{2^w}$ and $-2^{w-1} \le r < 2^{w-1}$. Since $-2^w \le s \le 2^w - 2$, the unique such $r$ is given by the three cases. If $x$ and $y$ have opposite signs, then $s$ lies between them, inside the range, so there is no overflow. Positive overflow needs $s \ge 2^{w-1}$, so both operands are non-negative, and the result $s - 2^w$ lies in $[-2^{w-1}, -2)$, which is negative; negative overflow is symmetric.
:::

Subtraction is addition of the negation, and negation is "flip and add one" ([[#ex-negate]]). Multiplication behaves the same way: the low $w$ bits of the product of two $w$-bit numbers are the same whether the operands are read as unsigned or as two's complement (both are the product modulo $2^w$), so a single instruction computes the truncated product for both; only the high half of a $2w$-bit product depends on the interpretation. Because multiplication instructions were historically slow, compilers replace multiplications and divisions by constants with shifts and additions where profitable: $14x = (x \ll 4) - (x \ll 1)$, and $x \ll k = x \cdot 2^k$ modulo $2^w$.

Division by a power of two is a right shift for unsigned numbers. For negative two's-complement numbers, an arithmetic right shift rounds *down* ($-7 \gg 2 = \lfloor -7/4 \rfloor = -2$), but C's division truncates towards zero ($-7/4 = -1$). The fix is to add a **bias** of $2^k - 1$ before shifting negative values: $\lfloor (x + 2^k - 1)/2^k \rfloor = \lceil x / 2^k \rceil$. Here is GCC's code for `int div4(int x) { return x / 4; }` at `-O2` on x86-64 (assembly is explained in [[computer-systems/machine-code]]):

```text
div4:
    testl   %edi, %edi        # set flags from x
    leal    3(%rdi), %eax     # eax = x + 3
    cmovns  %edi, %eax        # if x >= 0, eax = x instead (no bias)
    sarl    $2, %eax          # arithmetic shift right by 2
    ret
```

::: example Overflow in 8 bits {#ex-overflow8}
Compute $100 +^t_8 50$, $(-100) +^t_8 (-50)$ and $100 +^u_8 200$, giving the bit patterns.
::: solution
$100 = 0110\,0100$ and $50 = 0011\,0010$. Their bit sum is $1001\,0110$, unsigned $150$. The exact sum $150 \ge 2^7 = 128$, so by [[#thm-tadd]] there is positive overflow and the result is $150 - 256 = -106$. Two positive operands gave a negative result, the signature of overflow.

$-100 = 1001\,1100$ and $-50 = 1100\,1110$. Their unsigned sum is $156 + 206 = 362$, truncated to $362 - 256 = 106 = 0110\,1010$. The exact sum $-150 < -128$, so negative overflow: $-150 + 256 = 106$. Two negatives gave a positive.

$100 + 200 = 300 \ge 256$, so unsigned overflow: $300 - 256 = 44 = 0010\,1100$. The result $44$ is less than both operands, as [[#thm-uadd]] predicts.
:::
:::

### Signed overflow is undefined in C

The hardware wraps on signed overflow exactly as [[#thm-tadd]] says, and on x86-64 an `add` instruction never traps. The C language, however, does not promise that behaviour: **signed integer overflow is undefined behaviour**. The standard imposes no requirement at all on a program that does it, and optimising compilers exploit that freedom by assuming overflow never happens. Consider

```c
int bigger(int x) { return x + 1 > x; }   /* true unless x + 1 overflows... */
```

Under wrapping arithmetic `bigger(INT_MAX)` would be $0$. But since overflow "cannot happen", $x + 1 > x$ is always true, and GCC at `-O2` compiles the function to

```text
bigger:
    movl    $1, %eax          # return 1, unconditionally
    ret
```

A check written as `if (x + 1 < x)` to detect overflow is therefore not just wrong but likely to be deleted. The sanitiser catches the overflow when the program runs:

```console
$ gcc -std=c17 -Wall -Wextra -fsanitize=undefined -o overflow overflow.c && ./overflow
overflow.c:9:5: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'
UINT_MAX + 1 = 0
INT_MAX = 2147483647
INT_MAX + 1 = -2147483648
```

Correct code tests *before* the operation, using only values that are in range (for $b > 0$, `a > INT_MAX - b` means `a + b` would overflow), or uses the checked-arithmetic built-ins of GCC and Clang, which C23 standardises as `ckd_add` in `<stdckdint.h>`:

```c
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

/* Add two ints; return false (and leave *sum unspecified) on overflow. */
static bool add_ok(int a, int b, int *sum) {
    return !__builtin_add_overflow(a, b, sum);   /* GCC and Clang builtin */
}

int main(void) {
    int s;
    if (add_ok(40, 2, &s))
        printf("40 + 2 = %d\n", s);
    if (!add_ok(INT_MAX, 1, &s))
        printf("INT_MAX + 1 overflows\n");
    return 0;
}
```

```console
$ ./ckd
40 + 2 = 42
INT_MAX + 1 overflows
```

::: application Integer overflow as a security bug
A common pattern in C is to allocate space for `n` records of `size` bytes with `malloc(n * size)`. If an attacker controls `n`, the product can overflow and wrap to a small number: with 32-bit arithmetic, $n = 2^{30} + 1$ and a size of $4$ give $2^{32} + 4 \equiv 4$, so the program allocates 4 bytes and then writes over $4$ GiB of records past the end of the buffer. Bugs of this shape have been found in image decoders, network protocol parsers and operating-system kernels. The defences are systematic: check `n > SIZE_MAX / size` before multiplying, use `calloc(n, size)` (which must fail on overflow) or C23's `ckd_mul`, validate every length field read from untrusted input against a sensible maximum, and test with `-fsanitize=undefined` and fuzzing. How out-of-bounds writes are exploited and contained is covered conceptually in [[computer-systems/machine-code]] and in [[security]].
:::

::: quiz
On x86-64 with GCC, which of these C expressions have undefined behaviour? (Assume `int` is 32 bits.)
- [x] `INT_MAX + 1`
- [ ] `UINT_MAX + 1u`
- [x] `-INT_MIN`
- [ ] `(unsigned) -1`
- [x] `1 << 32`
::: solution
`INT_MAX + 1` and `-INT_MIN` overflow `int`, which is undefined. `1 << 32` shifts a 32-bit value by its full width, also undefined. `UINT_MAX + 1u` is unsigned arithmetic, defined to wrap to $0$, and `(unsigned) -1` is a well-defined conversion giving $2^{32} - 1$.
:::
:::

::: history
Gottfried Wilhelm Leibniz described binary arithmetic in his 1703 *Explication de l'arithmétique binaire*. Claude Shannon's 1937 master's thesis showed that Boolean algebra describes switching circuits, and John von Neumann's *First Draft of a Report on the EDVAC* (1945) argued for binary rather than decimal arithmetic in a stored-program computer, noting the simplicity of binary circuits. Early machines used a variety of signed representations — the UNIVAC 1100 series and the CDC 6600 used ones' complement — but two's complement, used for example by EDSAC (1949), won out; IBM's System/360 (announced 1964) made the 8-bit byte, byte addressing and two's-complement integers an industry standard. C (Dennis Ritchie, 1972) allowed all three signed representations until the C23 standard (ISO/IEC 9899:2024) finally required two's complement.
:::

## Where this leads

Integers are half of the numbers a program uses; [[computer-systems/floating-point]] builds the other half, real-number approximations, from the same bit-level ideas. [[computer-systems/c-programming]] uses the sizes and conversions of this chapter to explain pointers and memory layout, and [[computer-systems/machine-code]] shows the instructions — `add`, `imul`, `sar`, `movs`/`movz` for sign and zero extension — and the condition flags that record carries and overflows. Modular arithmetic on fixed-width words is also the setting of hash functions in [[data-structures]] and of much of [[cryptography]].

::: summary
- A $w$-bit pattern has $2^w$ values; hexadecimal writes four bits per digit. x86-64 is **little-endian**: the least significant byte is stored at the lowest address.
- Bitwise `& | ^ ~` act position by position; masks select bits; `<<` fills with zeros; `>>` is logical for unsigned and (on all mainstream compilers) arithmetic for signed values.
- **Unsigned**: $B2U_w(\vec{x}) = \sum x_i 2^i$, range $[0, 2^w - 1]$. **Two's complement** gives the top bit weight $-2^{w-1}$, range $[-2^{w-1}, 2^{w-1} - 1]$, and the two readings differ by $2^w$ when the sign bit is set ([[#thm-t2u]]).
- Conversions between signed and unsigned keep the bits; C converts signed to unsigned implicitly in mixed expressions, so `-1 < 0u` is false. Widening uses zero or sign extension ([[#thm-sign-ext]]); narrowing truncates.
- Addition, subtraction and multiplication compute the exact result modulo $2^w$ ([[#thm-uadd]], [[#thm-tadd]]). Unsigned wrap-around is defined in C; **signed overflow is undefined behaviour**, and compilers optimise on the assumption that it never happens.
- Check for overflow before it happens or with `__builtin_add_overflow` / `ckd_add`; unchecked size calculations are a classic source of security vulnerabilities.
:::

## Exercises

::: exercise Hex and binary {level=1 check="173"}
Write `0xad` in binary and in decimal, and write $0b1110\,0110$ in hexadecimal. (Enter the decimal value of `0xad`.)
::: solution
$\mathrm{a} = 1010$ and $\mathrm{d} = 1101$, so `0xad` $= 1010\,1101_2 = 10 \cdot 16 + 13 = 173$. Grouping $1110\,0110$ in fours gives $\mathrm{e}$ and $6$: `0xe6` $= 230$.
:::
:::

::: exercise Two's-complement values {level=1 check="-87"}
What integer does the 8-bit two's-complement pattern $1010\,1001$ represent? (Enter the value.)
::: solution
By [[#eq-b2t]], $-128 + 32 + 8 + 1 = -87$. Equivalently its unsigned value is $169$ and $169 - 256 = -87$ ([[#thm-t2u]]). Check by negation: flipping gives $0101\,0110 = 86$ and adding one gives $87$.
:::
:::

::: exercise Masks {level=1}
Write C expressions, valid for any width of `unsigned x`, that (a) set the least significant byte of `x` to zero and keep the rest, (b) keep only the least significant byte, (c) complement every bit except the least significant byte, (d) test whether bit 3 of `x` is set.
::: solution
(a) `x & ~0xffu`. (b) `x & 0xffu`. (c) `x ^ ~0xffu` — exclusive or with $1$ flips a bit and with $0$ leaves it. (d) `(x >> 3) & 1u`, or `(x & 0x8u) != 0`. Using `~0xffu` instead of a literal such as `0xffffff00` makes (a) and (c) correct for 16-, 32- and 64-bit types alike.
:::
:::

::: exercise Overflow by hand {level=2 check="56"}
Compute $(-100) +^t_8 (-100)$ with 8-bit two's-complement addition, give the bit pattern of the result, and say which kind of overflow occurred. (Enter the 8-bit result as a signed integer.)
::: solution
$-100$ has the pattern $1001\,1100$ (unsigned $156$). Adding the patterns as unsigned numbers gives $156 + 156 = 312$, truncated to $312 - 256 = 56 = 0011\,1000$. The sign bit is $0$, so the result is $+56$. The exact sum $-200$ is below $TMin_8 = -128$, so this is **negative overflow**, and by [[#thm-tadd]] the result is $-200 + 256 = 56$: two negative operands produced a positive result.
:::
:::

::: exercise Sign extension and truncation {level=2 check="-25"}
A variable `int x = 487;` is assigned to a `signed char` (8 bits, two's complement, keeping the low byte), and the result is assigned back to an `int`. What is the final value? (Enter it.)
::: solution
$487 = 256 + 231$, so the low byte is $231 = 1110\,0111$ (`0xe7`). As an 8-bit two's-complement number this is $231 - 256 = -25$. Widening back to `int` sign-extends to `0xffffffe7`, which by [[#thm-sign-ext]] is still $-25$. (Converting an out-of-range value to a signed type was implementation-defined before C23; GCC documents that it keeps the low bits.)
:::
:::

::: exercise Asymmetric range {level=2}
Prove that for every $w \ge 1$ the two's-complement negation of $TMin_w$ is $TMin_w$ itself, and that $TMin_w$ is the only non-zero value equal to its own negation.
::: solution
Two's-complement negation computes the unique $r \in [-2^{w-1}, 2^{w-1})$ with $r \equiv -x \pmod{2^w}$ (as in [[#thm-tadd]], since $-x = \sim x + 1$ modulo $2^w$). For $x = -2^{w-1}$, $-x = 2^{w-1} \equiv 2^{w-1} - 2^w = -2^{w-1}$, and $-2^{w-1}$ is in range, so $r = TMin_w$.

Conversely suppose $x \ne 0$ and $r = x$, so $x \equiv -x$, that is $2^w \mid 2x$, or $2^{w-1} \mid x$. In the range $[-2^{w-1}, 2^{w-1})$ the multiples of $2^{w-1}$ are $0$ and $-2^{w-1}$ only. So $x = TMin_w$. This is why `abs(INT_MIN)` overflows (undefined in C) and why `-x < 0` does not imply `x > 0`.
:::
:::

::: exercise Multiplying by constants {level=2 check="3"}
Express $x \cdot 28$ using shifts and at most one addition or subtraction, and say how many operations (shifts plus additions/subtractions) your expression uses. (Enter that number.)
::: solution
$28 = 32 - 4 = 2^5 - 2^2$, so $28x = (x \ll 5) - (x \ll 2)$: two shifts and one subtraction, $3$ operations. (The alternative $16 + 8 + 4$ needs three shifts and two additions.) Both are correct modulo $2^w$ for signed and unsigned $x$, because $x \ll k \equiv 2^k x$ and the identity holds in modular arithmetic. Modern compilers often prefer a single `imul` or an `lea` sequence; the choice depends on the processor's instruction costs.
:::
:::

::: exercise Safe allocation {level=3}
Write a C function `void *alloc_array(size_t n, size_t size)` that returns `NULL` instead of allocating too little when `n * size` would overflow. Prove that your test detects overflow exactly.
::: solution
```c
#include <stdint.h>
#include <stdlib.h>

void *alloc_array(size_t n, size_t size) {
    if (size != 0 && n > SIZE_MAX / size)
        return NULL;                 /* n * size would exceed SIZE_MAX */
    return malloc(n * size);
}
```

Let $M = $ `SIZE_MAX` $= 2^{64} - 1$ and $s = $ `size` $> 0$. The product $ns$ fits exactly when $ns \le M$, that is $n \le M/s$, that is (since $n$ is an integer) $n \le \lfloor M/s \rfloor$, which is the C expression `SIZE_MAX / size`. So `n > SIZE_MAX / size` holds exactly when $ns > M$, i.e. exactly when the multiplication would wrap. When $s = 0$ the product is $0$ and cannot overflow. The division itself is safe because $s \ne 0$. In real code, `calloc(n, size)` performs the same check (and zeroes the memory), and C23 offers `ckd_mul(&total, n, size)`.
:::
:::

::: exercise Detecting signed overflow without undefined behaviour {level=3}
Write a C expression using only `a`, `b`, `INT_MAX`, `INT_MIN`, comparisons and `-` that is true exactly when `a + b` would overflow for `int a, b`, and never itself overflows. Justify it with [[#thm-tadd]].
::: solution
```c
(b > 0 && a > INT_MAX - b) || (b < 0 && a < INT_MIN - b)
```
By [[#thm-tadd]] overflow requires $a$ and $b$ to have the same sign. If $b > 0$, then $INT\_MAX - b$ lies in $[0, INT\_MAX)$, so computing it cannot overflow, and $a + b > INT\_MAX$ iff $a > INT\_MAX - b$. If $b < 0$, $INT\_MIN - b$ lies in $(INT\_MIN, 0)$, again in range, and $a + b < INT\_MIN$ iff $a < INT\_MIN - b$. If $b = 0$ there is no overflow and both disjuncts are false. Unlike `a + b < a`, which the compiler may delete, every subexpression here is evaluated on in-range values.
:::
:::
