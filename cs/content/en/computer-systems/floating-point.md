During the Gulf War, on 25 February 1991, a Patriot missile battery at Dhahran failed to intercept an incoming Scud missile, which struck a barracks and killed 28 soldiers. The US General Accounting Office traced the failure to arithmetic. The system counted time in tenths of a second and converted the count to seconds by multiplying by $0.1$, held in a 24-bit fixed-point register. But $0.1$ has no finite binary expansion, so the register held a value about $9.5 \times 10^{-8}$ too small. After the battery had been running for about 100 hours — $3.6$ million tenths of a second — the accumulated error was about $0.34$ seconds, enough for the predicted position of a target moving at more than 1,600 m/s to be off by over half a kilometre.

Representing real numbers in a fixed number of bits forces approximation, and approximation has consequences that a programmer must be able to predict. [[programming-1/values-types]] met the symptoms: `0.1 + 0.2` is not `0.3`. This chapter explains the cause. We define the IEEE 754 floating-point formats bit by bit, including the special values (zeros, infinities, NaNs) and the gradual underflow of subnormal numbers; we state and prove the basic error bound for correctly rounded arithmetic; and we use it to understand the pitfalls — non-associativity, cancellation, accumulation, conversions — and how to avoid them.

C code was compiled with GCC 15.2 on x86-64 Linux as `gcc -std=c17 -Wall -Wextra` (plus `-lm` where `<math.h>` is used) without optimisation unless stated; on x86-64, `float` and `double` arithmetic is carried out by the SSE unit in exactly the IEEE single and double formats. Numbers were checked with Python 3.14.

## Binary fractions and fixed point

Positional notation extends to the right of the binary point. The binary numeral $b_m \ldots b_1 b_0 . b_{-1} b_{-2} \ldots b_{-n}$ denotes

$$
\sum_{i=-n}^{m} b_i \, 2^{i},
$$

so $101.11_2 = 4 + 1 + \tfrac12 + \tfrac14 = 5.75$, and $0.0011_2 = \tfrac{3}{16}$. Shifting the binary point one place left divides by two, just as moving the decimal point divides by ten. A finite binary fraction always equals $m/2^k$ for integers $m$ and $k$; as [[programming-1/values-types]] proved, a number such as $\tfrac{1}{10}$ is not of that form, and its binary expansion $0.000110011001100\ldots_2$ repeats forever.

A **fixed-point** representation stores a binary fraction with a fixed number of bits on each side of the point — effectively an integer scaled by a constant $2^{-k}$. Fixed point is simple and exact for sums, and it is still used in signal processing and in money (as integer pence), but it covers a narrow range: with 32 bits and 16 fraction bits we can represent nothing larger than $32768$ and nothing between $0$ and $2^{-16}$. Scientific computing needs numbers from the size of an atom to the size of a galaxy in the same program. The solution, as in scientific notation $6.022 \times 10^{23}$, is to let the point *float*: store significant digits and an exponent separately.

## The IEEE 754 formats

::: definition IEEE 754 binary format {#def-ieee}
A binary floating-point format with $k$ exponent bits and $f$ fraction bits stores a number in $1 + k + f$ bits as three fields: a **sign** bit $s$, an **exponent field** $E$ (read as a $k$-bit unsigned integer) and a **fraction field** $M = 0.m_1m_2\ldots m_f$ (read as a binary fraction). Let the **bias** be $B = 2^{k-1} - 1$. The value is

- **normalised** if $0 < E < 2^k - 1$: $\;(-1)^s \times 1.m_1\ldots m_f \times 2^{E - B}$;
- **subnormal** (also called denormalised) if $E = 0$: $\;(-1)^s \times 0.m_1\ldots m_f \times 2^{1 - B}$;
- **special** if $E = 2^k - 1$ (all ones): $(-1)^s \infty$ if $M = 0$, and **NaN** ("not a number") otherwise.

The number of significant bits, counting the implicit leading bit, is the **precision** $p = f + 1$.
:::

Every part of the definition has a reason. Normalised numbers have a leading $1$ before the binary point, and since it is always $1$ it is not stored — the **implicit leading bit** buys one bit of precision for free. The exponent is stored with a bias rather than in two's complement so that, as we prove below, bit patterns of positive floats compare in the same order as the numbers. Subnormal numbers fill the gap between zero and the smallest normalised number, and the special values make every operation return *something*: $1/0$ is $+\infty$ rather than a crash, and $0/0$ is a NaN that propagates through later operations.

The two formats used by C's `float` and `double` are:

| format | C type | bits | $k$ | $f$ | $p$ | bias | largest finite | smallest normal | smallest subnormal | $\varepsilon = 2^{1-p}$ |
|---|---|---|---|---|---|---|---|---|---|---|
| binary32 (single) | `float` | 32 | 8 | 23 | 24 | 127 | $\approx 3.40 \times 10^{38}$ | $2^{-126} \approx 1.18 \times 10^{-38}$ | $2^{-149} \approx 1.40 \times 10^{-45}$ | $2^{-23} \approx 1.19 \times 10^{-7}$ |
| binary64 (double) | `double` | 64 | 11 | 52 | 53 | 1023 | $\approx 1.80 \times 10^{308}$ | $2^{-1022} \approx 2.23 \times 10^{-308}$ | $2^{-1074} \approx 4.94 \times 10^{-324}$ | $2^{-52} \approx 2.22 \times 10^{-16}$ |

Here $\varepsilon$, **machine epsilon**, is the distance from $1$ to the next larger representable number. The 2008 revision of the standard also defines binary16 ("half precision", 5 exponent and 10 fraction bits) and binary128, and decimal formats; machine-learning hardware also widely uses the non-IEEE bfloat16 (8 exponent and 7 fraction bits) as of 2026.

We can inspect the fields of a `float` by copying its bits into a `uint32_t` (copying with `memcpy` is the well-defined way; reading a `float` through an `int *` violates C's aliasing rules):

```c
#include <stdio.h>
#include <stdint.h>
#include <string.h>

/* Print sign, exponent and fraction fields of a float. */
static void fields(float f) {
    uint32_t u;
    memcpy(&u, &f, sizeof u);           /* copy the bits: no undefined behaviour */
    unsigned sign = u >> 31;
    unsigned exp  = (u >> 23) & 0xff;
    unsigned frac = u & 0x7fffff;
    printf("%-14g 0x%08x  s=%u e=%3u f=0x%06x\n", f, u, sign, exp, frac);
}

int main(void) {
    fields(1.0f);
    fields(-0.75f);
    fields(0.1f);
    fields(3.0e38f * 10.0f);            /* overflows to +infinity */
    fields(1.0e-45f);                   /* smallest positive subnormal */
    fields(0.0f / 0.0f);                /* not a number */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o fbits fbits.c && ./fbits
1              0x3f800000  s=0 e=127 f=0x000000
-0.75          0xbf400000  s=1 e=126 f=0x400000
0.1            0x3dcccccd  s=0 e=123 f=0x4ccccd
inf            0x7f800000  s=0 e=255 f=0x000000
1.4013e-45     0x00000001  s=0 e=  0 f=0x000001
-nan           0xffc00000  s=1 e=255 f=0x400000
```

Read the lines against [[#def-ieee]]. $1.0 = 1.0 \times 2^0$, so $E = 0 + 127 = 127$ and the fraction is zero. $-0.75 = -1.1_2 \times 2^{-1}$: sign $1$, $E = 126$, and fraction $.1_2$, whose top bit is the $2^{22}$ bit, `0x400000`. The pattern for $0.1$ has $E = 123$, so $0.1 \approx 1.6 \times 2^{-4}$, and the fraction `0x4ccccd` is the repeating pattern $1100\,1100\ldots$ cut off and rounded *up* in its last bit (the `d` rather than `c`), so the stored `float` is slightly larger than $0.1$; it is exactly $13421773/2^{27} = 0.100000001490116\ldots$. The quiet NaN produced by the SSE unit for $0/0$ has the sign bit set, which is why it prints as `-nan`; the sign of a NaN carries no meaning.

::: example Encoding a number {#ex-encode}
Find the `float` bit pattern of $-6.25$, in hexadecimal.
::: solution
$6.25 = 110.01_2 = 1.1001_2 \times 2^2$. So $s = 1$, the exponent is $2$, stored as $E = 2 + 127 = 129 = 1000\,0001_2$, and the fraction field is $1001$ followed by nineteen zeros. Concatenating sign, exponent and fraction:

$$
1 \;|\; 1000\,0001 \;|\; 1001\,0000\,0000\,0000\,0000\,000 ,
$$

and regrouping into fours from the left: $1100\,0000\,1100\,1000\,0000\ldots = $ `0xc0c80000`. Python confirms: `struct.pack('>f', -6.25).hex()` is `'c0c80000'`.
:::
:::

### A toy format

Real formats have too many values to list. To see the whole structure, take an 8-bit format with $k = 4$ exponent bits and $f = 3$ fraction bits (precision $p = 4$, bias $7$). Then:

| description | bits $s\,E\,M$ | $E$ | value |
|---|---|---|---|
| zero | 0 0000 000 | 0 | $0$ |
| smallest subnormal | 0 0000 001 | 0 | $\tfrac18 \times 2^{-6} = \tfrac{1}{512}$ |
| largest subnormal | 0 0000 111 | 0 | $\tfrac78 \times 2^{-6} = \tfrac{7}{512}$ |
| smallest normalised | 0 0001 000 | 1 | $1 \times 2^{-6} = \tfrac{1}{64} = \tfrac{8}{512}$ |
| one | 0 0111 000 | 7 | $1$ |
| next after one | 0 0111 001 | 7 | $\tfrac98$ |
| largest normalised | 0 1110 111 | 14 | $\tfrac{15}{8} \times 2^{7} = 240$ |
| infinity | 0 1111 000 | 15 | $+\infty$ |
| NaN | 0 1111 $\ne 000$ | 15 | NaN |

Notice the smooth transition at the bottom: the largest subnormal is $7/512$ and the smallest normalised number is $8/512$, exactly one step further. That is why subnormals use the exponent $1 - B$ rather than $0 - B$. Without them, there would be a gap from $0$ to $1/64$ sixty-four times as wide as the spacing just above it, and $x - y$ could be zero for distinct $x$ and $y$; with them, $x - y = 0$ implies $x = y$. This property is called **gradual underflow**.

::: widget floatline
p: 4
emin: -6
emax: 7
value: 19
caption: Every non-negative value of the 8-bit toy format ($p = 4$, exponents $-6$ to $7$). Switch on the log scale to see all fourteen binades: within each power-of-two interval the eight values are evenly spaced, and the spacing doubles from one interval to the next. Subnormals (switch them off and on) fill the region next to zero with the same spacing as the first binade. The value $19$ lies exactly halfway between $18$ and $20$; watch it round to $20$, whose significand $1.010_2$ ends in $0$. Values of $248$ or more (half a gap above the largest finite value, $240$) overflow to $\infty$.
:::

## Ordering, spacing and rounding

Two useful properties follow from the layout.

::: theorem Bit patterns order like values {#thm-order}
For non-negative floating-point numbers $x$ and $y$ in an IEEE binary format (including $+0$ and $+\infty$, excluding NaN), $x < y$ if and only if the bit pattern of $x$, read as an unsigned integer, is less than that of $y$.
:::

::: proof
For a non-negative number the sign bit is $0$, so the unsigned value of the pattern is $U = E \cdot 2^f + m$, where $m = 2^f M$ is the fraction field read as an integer, $0 \le m < 2^f$. Compare two numbers with fields $(E, m)$ and $(E', m')$. If $E = E'$, both numbers are $c\cdot(\text{leading bit} + m/2^f)$ for the same positive constant $c$, so the one with larger $m$ is larger, and so is its $U$. If $E < E'$, then $U < U'$ because $m < 2^f \le 2^f(E' - E)$. We must show that the number is also smaller. Every number with exponent field $E$ is less than $2^{E - B + 1}$ (a significand is below $2$; for $E = 0$, below $1 \times 2^{1-B}$), while every number with exponent field $E' \ge 1$ is at least $2^{E' - B} \ge 2^{E - B + 1}$. Infinity has the largest exponent field and zero fraction, and exceeds every finite number. So the orders agree.
:::

This is why the exponent is biased: comparing, sorting and searching non-negative floats can be done with integer instructions. (Negative numbers order in reverse, because the representation is sign–magnitude; a standard trick flips their bits first.)

Between consecutive powers of two the spacing is uniform. In the **binade** $[2^e, 2^{e+1})$ the representable numbers are $(1 + j\,2^{-f}) \times 2^e$ for $j = 0, 1, \ldots, 2^f - 1$, so the gap between neighbours — the **unit in the last place**, $\operatorname{ulp}$ — is $2^{e - f} = 2^{e - p + 1}$. The gap is proportional to the size of the numbers: floats have roughly constant *relative* precision. In single precision, the integers are exactly representable up to $2^{24} = 16\,777\,216$, but in the binade $[2^{24}, 2^{25})$ the spacing is $2$, so $16\,777\,217$ is not a `float`.

### Rounding

Most real numbers lie between two representable numbers, and the standard says which to choose. The default **rounding mode**, used unless a program asks otherwise, is **round to nearest, ties to even**: choose the nearest representable number; if the real number lies exactly halfway, choose the one whose last significand bit is $0$. The standard also provides rounding towards $+\infty$, towards $-\infty$ and towards zero, used in interval arithmetic and when converting to integers.

Why ties to even rather than "round half up" as at school? If halfway cases always rounded up, a long sum of such values would drift upwards on average. Rounding to even goes up half the time and down half the time, so the bias cancels in aggregate.

::: example Rounding in the toy format {#ex-round}
Round $5.5$, $0.3$, $19$ and $100$ to the toy 8-bit format, and give the relative error of each.
::: solution
**$5.5$** $= 101.1_2 = 1.011_2 \times 2^2$ fits in four significant bits, so it is exact: $E = 2 + 7 = 9 = 1001_2$, fraction $011$, pattern $0\,1001\,011$ = `0x4b`. Error $0$.

**$0.3$** $= 1.0011\,0011\ldots_2 \times 2^{-2}$. In the binade $[\tfrac14, \tfrac12)$ the spacing is $2^{-2-3} = \tfrac{1}{32}$, so the candidates are $\tfrac{9}{32} = 0.28125$ and $\tfrac{10}{32} = 0.3125$. Since $0.3 \times 32 = 9.6$, the nearer is $\tfrac{10}{32}$. Relative error $\abs{0.3125 - 0.3}/0.3 \approx 0.0417$.

**$19$** $= 10011_2 = 1.0011_2 \times 2^4$ has five significant bits. In $[16, 32)$ the spacing is $2^{4-3} = 2$; the neighbours are $18 = 1.001_2 \times 2^4$ and $20 = 1.010_2 \times 2^4$, and $19$ is exactly halfway. Ties go to the even significand, $1.010_2$, so $19 \mapsto 20$. Relative error $1/19 \approx 0.0526$.

**$100$** $= 1.1001_2 \times 2^6$. In $[64, 128)$ the spacing is $8$, and the neighbours are $96 = 1.100_2 \times 2^6$ and $104 = 1.101_2 \times 2^6$. Again a tie; the even one is $96$. Relative error $0.04$.

All three relative errors are below $2^{-p} = \tfrac{1}{16} = 0.0625$, as the next theorem guarantees.
:::
:::

::: theorem Relative error of rounding {#thm-rel-error}
Let $\operatorname{fl}(x)$ denote $x$ rounded to nearest in a binary format of precision $p$, and let $x$ be a real number whose magnitude lies in the normalised range (between the smallest normalised number and the largest finite number). Then

$$
\operatorname{fl}(x) = x(1 + \delta) \quad\text{with}\quad \abs{\delta} \le u = 2^{-p} = \tfrac{\varepsilon}{2} .
$$ {#eq-fl}

The number $u$ is called the **unit roundoff**: $2^{-24} \approx 5.96 \times 10^{-8}$ for `float` and $2^{-53} \approx 1.11 \times 10^{-16}$ for `double`.
:::

::: proof
Without loss of generality $x > 0$. Choose $e$ with $2^e \le x < 2^{e+1}$. The representable numbers in this binade are spaced $2^{e-p+1}$ apart, and $2^{e+1}$ is itself representable (or, at the very top of the range, $x$ is within half a gap of the largest finite number by assumption), so $x$ lies between two representable neighbours at distance $2^{e-p+1}$. The nearest of them is within half the gap: $\abs{\operatorname{fl}(x) - x} \le 2^{e-p}$. Dividing by $x \ge 2^e$ gives $\abs{\delta} = \abs{\operatorname{fl}(x) - x}/x \le 2^{e-p}/2^e = 2^{-p}$.
:::

In the subnormal range the *absolute* error is still at most half the subnormal spacing, but the relative error can be large: a subnormal number near the bottom of the range has only one or two significant bits.

## Floating-point arithmetic

The heart of IEEE 754 is a single rule.

::: definition Correctly rounded operation {#def-correct-rounding}
IEEE 754 requires addition, subtraction, multiplication, division, square root and fused multiply–add to be **correctly rounded**: the result of $x \circledast y$ must be the exact mathematical result rounded by the current rounding mode, $x \circledast y = \operatorname{fl}(x \ast y)$. Overflow produces $\pm\infty$ (in round-to-nearest), and invalid operations such as $0/0$, $\infty - \infty$ and $\sqrt{-1}$ produce NaN.
:::

Combined with [[#thm-rel-error]], every single operation has relative error at most $u$ (when the result is in the normalised range): $x \oplus y = (x + y)(1 + \delta)$ with $\abs{\delta} \le u$. That is the best possible guarantee — and it is also what makes floating-point arithmetic *different* from real arithmetic. Each operation is accurate, but the familiar algebraic laws fail:

- Addition and multiplication are commutative ($x \oplus y = y \oplus x$), since the exact results are equal.
- They are **not associative**. With `double a = 1e16, b = -1e16, c = 1.0`, `(a + b) + c` is $1$, but `a + (b + c)` is $0$: $b + c = -10^{16} + 1$ rounds back to $-10^{16}$ because the spacing of doubles near $10^{16}$ is $2$.
- Multiplication does not distribute over addition, and $x \otimes (1/x)$ need not be exactly $1$.
- $x = x$ fails for NaN: every comparison involving a NaN is false except `!=`, which is true. (`x != x` is the classic test for NaN; `isnan(x)` says it better.)

```c
double nan = 0.0 / 0.0;
printf("nan == nan: %d, nan != nan: %d\n", nan == nan, nan != nan);   /* 0, 1 */
printf("%.17g\n", 0.1 + 0.2);                                         /* 0.30000000000000004 */
```

Non-associativity has a direct practical consequence: compilers may not reorder floating-point operations, so a C compiler cannot vectorise a sum such as `for (...) s += a[i];` by adding four partial sums at once unless you allow it (`-ffast-math` or `-fassociative-math`). Those flags permit *value-changing* optimisations, and `-ffast-math` additionally assumes that NaNs and infinities never occur; use them only where you have checked that the results remain acceptable.

::: quiz
In IEEE double precision with round-to-nearest, which statements are always true for finite doubles `x`, `y`, `z` whose results do not overflow?
- [x] `x + y == y + x`
- [ ] `(x + y) + z == x + (y + z)`
- [x] `x * 1.0 == x`
- [ ] `x / 10.0 * 10.0 == x`
- [x] If `x - y == 0` then `x == y`
::: solution
Commutativity holds because each side is the correctly rounded value of the same real number $x + y$. Multiplying by $1$ is exact. Associativity fails (the $10^{16}$ example), and dividing by $10$ then multiplying by $10$ rounds twice — it happens to give back small integers, but `0.11 / 10.0 * 10.0` is `0.10999999999999999`. The last statement is true *because of subnormals* (gradual underflow): the exact difference of two distinct doubles is a multiple of the smallest subnormal, so it is representable or at least as large as that subnormal, and never rounds to zero. Without subnormals it could fail.
:::
:::

### Cancellation and accumulation

[[#thm-rel-error]] bounds the error of one operation relative to its *own* result. Trouble starts when results are combined. Subtracting two nearly equal numbers is exact — that is a theorem:

::: lemma Sterbenz {#lem-sterbenz}
If $x$ and $y$ are floating-point numbers in the same binary format with $y/2 \le x \le 2y$, then $x - y$ is exactly representable, so $x \ominus y = x - y$.
:::

::: proof
Assume $0 < y \le x \le 2y$ (the case $x < y$ is symmetric, and $x, y$ have the same sign by hypothesis). Let $2^e$ be the spacing ($\operatorname{ulp}$) of $y$; then $x$, whose exponent is at least that of $y$, is an integer multiple of $2^e$ too, as is $x - y$. Since $0 \le x - y \le y$, the difference is a multiple of $2^e$ no larger than $y$. Every multiple of $2^e$ in $[0, y]$ is representable: write it as $j\,2^e$ with $0 \le j \le y/2^e < 2^p$, an integer with at most $p$ bits times a power of two that is at least the exponent of the smallest subnormal. Hence $x - y$ is representable and the correctly rounded result is exact.
:::

So subtraction itself introduces no error — but it exposes the errors *already present* in $x$ and $y$. If $x$ and $y$ each carry a relative error of $10^{-16}$ and agree in their first twelve digits, their difference keeps only four correct digits. This is **catastrophic cancellation**.

::: example Cancellation in $1 - \cos x$ {#ex-cancel}
Evaluate $f(x) = (1 - \cos x)/x^2$ at $x = 10^{-8}$ in double precision. The true value is very close to $\tfrac12$ (since $1 - \cos x \approx x^2/2$). Explain what goes wrong and fix it.
::: solution
```c
#include <stdio.h>
#include <math.h>

int main(void) {
    double x = 1e-8;
    double naive  = (1.0 - cos(x)) / (x * x);
    double s      = sin(x / 2);
    double stable = 2.0 * s * s / (x * x);   /* 1 - cos x = 2 sin^2(x/2) */
    printf("naive  = %.17g\n", naive);
    printf("stable = %.17g\n", stable);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o cancel cancel.c -lm && ./cancel
naive  = 0
stable = 0.5
```

$\cos(10^{-8}) = 1 - 5 \times 10^{-17} + \cdots$. The doubles just below $1$ are spaced $2^{-53} \approx 1.1 \times 10^{-16}$ apart, so the correctly rounded cosine is exactly $1.0$, and the subtraction (exact, by [[#lem-sterbenz]]) gives $0$. All the information was lost in rounding $\cos x$, *before* the subtraction. The identity $1 - \cos x = 2\sin^2(x/2)$ computes the same quantity without subtracting nearly equal numbers; every operation in it has small relative error, and the result is accurate to full precision. Rewriting a formula to avoid cancellation is the main tool of numerically careful code; other standard examples are `log1p(x)` for $\ln(1 + x)$ and `expm1(x)` for $e^x - 1$ in `<math.h>`.
:::
:::

Errors also accumulate in long computations. Adding $n$ numbers left to right can incur an error that grows proportionally to $n u$ times the sum of the magnitudes, and adding small numbers to a large running total loses them entirely once they fall below half an ulp of the total.

::: example Summing a series in two orders {#ex-harmonic}
Sum $\sum_{k=1}^{10^7} 1/k$ in `float`, forwards and backwards, and compare with a `double` sum.
::: solution
```c
#include <stdio.h>

int main(void) {
    const int n = 10000000;
    float up = 0.0f, down = 0.0f;
    for (int k = 1; k <= n; k++) up += 1.0f / k;      /* largest terms first */
    for (int k = n; k >= 1; k--) down += 1.0f / k;    /* smallest terms first */
    double exact = 0.0;
    for (int k = n; k >= 1; k--) exact += 1.0 / k;
    printf("float, forwards : %.7f\n", up);
    printf("float, backwards: %.7f\n", down);
    printf("double          : %.7f\n", exact);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o harmonic harmonic.c && ./harmonic
float, forwards : 15.4036827
float, backwards: 16.6860313
double          : 16.6953114
```

The true value is $16.695311\ldots$ (the `double` sum agrees with Python's exactly rounded `math.fsum` to all digits shown). Summed forwards, the `float` total stops growing well before the end: once it reaches about $15.4$, its ulp is $2^{3-23} \approx 9.5 \times 10^{-7}$, and every later term $1/k < 4.8 \times 10^{-7}$ is less than half an ulp, so `up + 1.0f/k` rounds back to `up`. Millions of terms are simply discarded. Summed backwards, the small terms are added to each other first, while the total is small and its ulp is fine; the result is accurate to about three units in the fifth significant digit. Better still are **compensated summation** (Kahan's algorithm, [[#ex-kahan]]), pairwise summation (used by NumPy), or a wider accumulator.
:::
:::

::: warning Comparing floats with `==`
Because nearly every result is rounded, testing computed floats for exact equality is almost always a bug: `0.1 + 0.2 == 0.3` is false. Compare with a tolerance appropriate to the computation, usually relative: `fabs(a - b) <= 1e-12 * fmax(fabs(a), fabs(b))`. But do not overcorrect: there is no universal "epsilon", a tolerance of $10^{-9}$ is meaningless for quantities of size $10^{-12}$, and exact comparisons are correct when values are known to be exact (small integers, powers of two, a value compared with a copy of itself).
:::

## Floating point in C

C's `float` and `double` are IEEE binary32 and binary64 on every mainstream platform (the standard's Annex F describes the IEEE binding; GCC on x86-64 conforms). `long double` is the x87 80-bit extended format on x86-64 Linux ($p = 64$) but simply a `double` on some other platforms; avoid relying on it.

Conversions follow the rules of [[#def-ieee]] and rounding:

| conversion | behaviour |
|---|---|
| `int` → `double` | exact (every 32-bit integer has at most 32 significant bits $\le 53$) |
| `int` → `float` | rounded: `(float) 16777217` is `16777216.0f` |
| `long` → `double` | rounded for magnitudes beyond $2^{53}$ |
| `float` → `double` | exact |
| `double` → `float` | rounded; may overflow to $\pm\infty$ or underflow to a subnormal or zero |
| `double` → `int` | **truncated towards zero**: `(int) 3.9` is `3`, `(int) -3.9` is `-3`; *undefined behaviour* if the result does not fit (x86-64's `cvttsd2si` then returns `0x80000000`, but do not rely on it) |

The last row is where the Ariane 5 failed: a conversion to a 16-bit integer of a value that did not fit. Use `round`, `floor`, `ceil` or `lrint` from `<math.h>` when you want something other than truncation, and check the range before converting.

The `<math.h>` and `<fenv.h>` headers also give access to IEEE features: `isnan`, `isinf`, `isfinite`, `nextafter` (the neighbouring float), `fma` (fused multiply–add: $\operatorname{fl}(xy + z)$ with a single rounding), and `fesetround` for directed rounding. Fused multiply–add was standardised in IEEE 754-2008 and is implemented in hardware on modern x86-64 and ARM processors.

::: application Printing and reading floats exactly
`printf("%g")` shows six significant digits, which hides most rounding: `0.1 + 0.2` prints as `0.3`. To print a `double` so that it reads back as exactly the same value, use `%.17g` (17 significant digits always suffice for binary64; 9 for binary32) or the exact hexadecimal format `%a`, which prints `0x1.999999999999ap-4` for `0.1`. Since C99, `strtod` and hexadecimal float literals such as `0x1.8p1` (which is $3.0$) read these back exactly. Data files and network protocols that carry floats as text should use one of these forms.
:::

::: history
Konrad Zuse's Z3 (1941) already used binary floating point. Through the 1960s and 1970s each manufacturer had its own format and its own rounding behaviour — IBM's System/360 used base 16, and some machines could compute $x \ne y$ yet $x - y = 0$ — so numerical software had to be rewritten for each machine. In 1976 Intel hired William Kahan to design the arithmetic of its 8087 coprocessor (shipped 1980), and Kahan, Jerome Coonen and Harold Stone wrote the proposal that became **IEEE 754-1985**. It mandated correct rounding, gradual underflow, infinities and NaNs. Kahan received the 1989 Turing Award. The standard was revised in 2008 (adding fused multiply–add, binary16, binary128 and decimal formats) and in 2019 (clarifications and new recommended operations). David Goldberg's survey *What Every Computer Scientist Should Know About Floating-Point Arithmetic* (1991) remains the classic introduction.
:::

## Where this leads

The instructions that move and operate on floats (`movsd`, `addsd`, `cvttsd2si`) and the registers that hold them (`%xmm0`–`%xmm15`) appear in [[computer-systems/machine-code]]. The analysis of error propagation through whole algorithms — condition numbers, backward stability, why some algorithms are reliable and others are not — is numerical analysis ([Maths Atlas: floating-point arithmetic](/learn/maths/lesson.php?c=numerical-analysis&l=floating-point)). Floating point also underlies [[graphics]], where accumulated error shows up as cracks between triangles, and the reduced-precision formats used to train language models ([LLM Atlas](/learn/llm/)).

::: summary
- A binary float stores a sign, a biased exponent and a fraction: normalised values $(-1)^s \times 1.M \times 2^{E-B}$ with an implicit leading $1$; subnormals $0.M \times 2^{1-B}$ give **gradual underflow**; the all-ones exponent encodes $\pm\infty$ and NaN ([[#def-ieee]]).
- `float` is binary32 ($p = 24$, $\varepsilon = 2^{-23}$), `double` is binary64 ($p = 53$, $\varepsilon = 2^{-52}$). Spacing is uniform within each binade and doubles at each power of two; non-negative floats order like their bit patterns ([[#thm-order]]).
- The default rounding is to nearest, ties to even; in the normal range $\operatorname{fl}(x) = x(1+\delta)$ with $\abs{\delta} \le 2^{-p}$ ([[#thm-rel-error]]), and every basic operation is correctly rounded.
- Floating-point addition is commutative but not associative; NaN is not equal to itself; compilers do not reorder float arithmetic unless told to.
- Subtraction of nearby numbers is exact ([[#lem-sterbenz]]) but exposes earlier errors (**cancellation**); rewrite formulas, sum small terms first or use compensated summation.
- Never compare computed floats with `==`; never store money in floats; check ranges before converting floats to integers (truncation, undefined on overflow).
:::

## Exercises

::: exercise Decoding a float {level=1 check="12.375"}
What number has the `float` bit pattern `0x41460000`? (Enter the value.)
::: solution
In binary, `0x41460000` is $0100\,0001\,0100\,0110\,0000\ldots$. The sign is $0$; the next eight bits are $1000\,0010 = 130$, so the exponent is $130 - 127 = 3$; the fraction field is $1000\,1100\ldots_2$, so the significand is $1.100011_2 = 1 + \tfrac12 + \tfrac1{32} + \tfrac1{64} = 1.546875$. The value is $1.546875 \times 8 = 12.375$.
:::
:::

::: exercise Toy-format counting {level=1 check="119"}
How many positive finite values does the 8-bit toy format of this chapter ($k = 4$, $f = 3$) have? (Enter the number.)
::: solution
Positive finite numbers have sign $0$, exponent field $E \in \set{0, \ldots, 14}$ and any fraction, except that $E = 0$ with fraction $000$ is zero. That is $15 \times 8 - 1 = 119$ values: $7$ subnormals and $14 \times 8 = 112$ normalised numbers. Equivalently, they are the patterns `0x01` to `0x77`, and $0x77 = 119$.
:::
:::

::: exercise Gaps between floats {level=1 check="2^(-13)"}
What is the spacing between consecutive `float` values in the interval $[1024, 2048)$? (Enter the gap.)
::: solution
$1024 = 2^{10}$, so the binade is $e = 10$, and the spacing is $2^{e - p + 1} = 2^{10 - 24 + 1} = 2^{-13} \approx 1.22 \times 10^{-4}$. So a `float` near $1500$ resolves only about four decimal places, which is why single precision is risky for, say, coordinates in metres over a few kilometres measured to the micrometre.
:::
:::

::: exercise Rounding to nearest even {level=2 check="10.25"}
Round each binary number to two bits after the binary point using round-to-nearest-even: $10.01011_2$, $10.01100_2$, $10.10100_2$, $10.11101_2$. Give the results in decimal. (Enter the sum of the four results.)
::: solution
Two bits after the point means a spacing of $\tfrac14$; the digits after the second fractional bit decide. $10.01|011$: the remainder $0.011_2$ of a step is less than half ($0.1_2$), so round down to $10.01_2 = 2.25$. $10.01|100$: exactly half; the candidates are $10.01$ and $10.10$, and the even one (last bit $0$) is $10.10_2 = 2.5$. $10.10|100$: exactly half between $10.10$ and $10.11$; even is $10.10_2 = 2.5$. $10.11|101$: more than half, round up to $11.00_2 = 3$. Sum: $2.25 + 2.5 + 2.5 + 3 = 10.25$.
:::
:::

::: exercise Largest odd integer {level=2 check="2^24 - 1"}
What is the largest odd integer exactly representable as a `float`? Justify. (Enter it.)
::: solution
An integer $n$ with $2^{24} \le n < 2^{25}$ lies in a binade with spacing $2^{24 - 24 + 1} = 2$, so only even integers are representable there, and in higher binades the spacing is larger still and a power of two at least $2$. Below $2^{24}$, every integer has at most 24 significant bits and is representable. So the largest odd representable integer is $2^{24} - 1 = 16\,777\,215$, pattern `0x4b7fffff`.
:::
:::

::: exercise Quadratic formula without cancellation {level=2}
The roots of $x^2 + bx + c = 0$ are $(-b \pm \sqrt{b^2 - 4c})/2$. For $b = 10^8$, $c = 1$, the small root is about $-10^{-8}$. Explain why the usual formula computes it badly in double precision, and give a formula that computes both roots accurately.
::: solution
With $b = 10^8$, $b^2 - 4c = 10^{16} - 4$ is computed exactly, but its square root $10^8\sqrt{1 - 4 \times 10^{-16}} \approx 10^8 - 2 \times 10^{-8}$ must be rounded to a double, and near $10^8$ doubles are spaced $2^{26-52} \approx 1.49 \times 10^{-8}$ apart: the computed root is `99999999.999999985`. Then $-b + \sqrt{\cdots}$ subtracts two nearly equal numbers, and the rounding error of the square root, of relative size $10^{-16}$, becomes a relative error of about $25\%$ in the difference: in GCC 15.2 the formula gives $-7.45 \times 10^{-9}$ instead of $-1.00 \times 10^{-8}$. The fix uses Vieta's relation $x_1 x_2 = c$. Compute the large root without cancellation, $x_1 = (-b - \operatorname{sgn}(b)\sqrt{b^2 - 4c})/2$, in which both terms have the same sign, then $x_2 = c / x_1$. Here $x_1 = -10^8$ and $x_2 = c/x_1$ prints as `-1e-08`, correct to full precision.
:::
:::

::: exercise Kahan summation {#ex-kahan level=3}
Implement compensated summation in C for an array of `float`s: keep a running sum $s$ and a correction $c$, and for each $x$ compute `y = x - c; t = s + y; c = (t - s) - y; s = t;`. Explain what $c$ holds, and test it on the forwards harmonic sum of [[#ex-harmonic]]. Why must it not be compiled with `-ffast-math`?
::: solution
```c
#include <stdio.h>

int main(void) {
    const int n = 10000000;
    float s = 0.0f, c = 0.0f;           /* sum and running compensation */
    for (int k = 1; k <= n; k++) {
        float y = 1.0f / k - c;         /* correct the term by the last error */
        float t = s + y;                /* low bits of y are lost here ...   */
        c = (t - s) - y;                /* ... and recovered here (negated)  */
        s = t;
    }
    printf("Kahan, forwards: %.7f\n", s);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o kahan kahan.c && ./kahan
Kahan, forwards: 16.6953106
```

When $s$ is large and $y$ small, `t = s + y` keeps only the high part of $y$. Then `t - s` is exact (by [[#lem-sterbenz]], since $t$ and $s$ are close) and equals the part of $y$ that was actually added; subtracting $y$ leaves the negated lost part in $c$, which is fed back into the next term. The result, $16.6953106$, is the `float` nearest the true sum $16.6953114\ldots$ (the neighbouring floats are $16.6953106$ and $16.6953125$) — far better than the $15.40$ of naive summation. Under `-ffast-math` the compiler may simplify `(t - s) - y` algebraically to `((s + y) - s) - y = 0`, deleting the correction: an optimisation valid for real numbers but not for floats. With GCC 15.2, `gcc -O2 -ffast-math` indeed changes the printed result to `16.4196701`.
:::
:::

::: exercise Ordering negative floats {level=3}
[[#thm-order]] covers non-negative floats. Define a function `uint32_t key(float x)` such that for all non-NaN floats $x < y$ implies `key(x) < key(y)` and $x = y$ (with $-0 = +0$ treated as equal or as $-0 < +0$, your choice) is consistent. Prove it works.
::: solution
```c
#include <stdint.h>
#include <string.h>

uint32_t key(float x) {
    uint32_t u;
    memcpy(&u, &x, sizeof u);
    return (u & 0x80000000u) ? ~u : (u | 0x80000000u);
}
```

For $x \ge +0$ (sign bit $0$), the key is the pattern with the top bit set: $2^{31} + U(x)$, which by [[#thm-order]] increases with $x$, and lies in $[2^{31}, 2^{32})$. For $x \le -0$ (sign bit $1$), the pattern is $2^{31} + U(\abs{x})$, and its complement is $2^{32} - 1 - 2^{31} - U(\abs{x}) = 2^{31} - 1 - U(\abs{x})$, which lies in $[0, 2^{31})$ and *decreases* as $\abs{x}$ increases, i.e. increases with $x$. Every negative key is below every non-negative key. So keys order exactly like values; $-0$ gets key $2^{31} - 1$ and $+0$ gets $2^{31}$, so this version puts $-0 < +0$. Radix sorts of floating-point data use exactly this transformation.
:::
:::
