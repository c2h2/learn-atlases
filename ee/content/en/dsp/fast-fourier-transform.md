Computed directly from its definition, a $4096$-point DFT needs $4096^2 = 16\,777\,216$ complex multiplications. A fast Fourier transform (FFT) computes exactly the same $4096$ numbers with $24\,576$ — about $680$ times fewer. That factor is the difference between a spectrum analyser that updates once a second and one that updates hundreds of times a second, between an OFDM modem that is impossible and one that fits on a phone chip, between an MRI scanner that reconstructs an image in hours and one that does it while the patient is still on the table. The FFT is not an approximation: it is a reorganisation of the arithmetic of [[dsp/discrete-fourier-transform]] that avoids recomputing the same partial sums over and over.

In this chapter we derive the two classic radix-2 algorithms, **decimation in time** and **decimation in frequency**, count their operations exactly, and look at the details that matter in implementations: the butterfly, bit-reversed ordering, in-place computation, trivial twiddle factors, real-valued data and word-length growth. We finish with the **Goertzel algorithm**, which computes a few DFT bins more cheaply than a full FFT and is how telephone exchanges detect touch-tone digits.

## Where the redundancy is {#sec-redundancy}

The DFT $X[k] = \sum_{n=0}^{N-1}x[n]W_N^{kn}$, with $W_N = e^{-j2\pi/N}$, needs $N$ complex multiplications per bin and $N^2$ in all. But the $N^2$ factors $W_N^{kn}$ take only $N$ distinct values, because $W_N^{kn}$ depends only on $kn$ modulo $N$, and they have strong symmetries:

$$
W_N^{k + N} = W_N^k,\qquad W_N^{k + N/2} = -W_N^k,\qquad W_N^{2k} = W_{N/2}^k .
$$ {#eq-twiddle-identities}

The first is periodicity, the second says that half a turn round the unit circle changes the sign, and the third says that the squares of the $N$-th roots of unity are the $(N/2)$-th roots of unity. An FFT is any algorithm that exploits these identities to share work between bins. The **twiddle factors** $W_N^k$ are the roots of unity that appear as multipliers in the algorithm.

## Decimation in time {#sec-dit}

Let $N$ be even. Split the input into its even-indexed and odd-indexed samples, $g[m] = x[2m]$ and $h[m] = x[2m + 1]$, $0 \le m \le N/2 - 1$ — this splitting is what "decimation in time" refers to.

::: theorem Decimation-in-time decomposition {#thm-dit}
Let $G[k]$ and $H[k]$ be the $(N/2)$-point DFTs of $g[m] = x[2m]$ and $h[m] = x[2m+1]$. Then for $0 \le k \le N/2 - 1$,

$$
X[k] = G[k] + W_N^k\,H[k],\qquad X[k + N/2] = G[k] - W_N^k\,H[k].
$$ {#eq-dit}
:::

::: proof
Separate the even and odd terms of the DFT sum and use $W_N^{2mk} = W_{N/2}^{mk}$ from [[#eq-twiddle-identities]]:

$$
X[k] = \sum_{m=0}^{N/2-1}x[2m]W_N^{2mk} + \sum_{m=0}^{N/2-1}x[2m+1]W_N^{(2m+1)k} = \sum_mg[m]W_{N/2}^{mk} + W_N^k\sum_mh[m]W_{N/2}^{mk}.
$$

The two sums are $G[k]$ and $H[k]$ for $0 \le k \le N/2 - 1$, and since $(N/2)$-point DFTs are periodic with period $N/2$, they are $G[k]$ and $H[k]$ again when $k$ is replaced by $k + N/2$. The twiddle factor, however, changes sign: $W_N^{k + N/2} = -W_N^k$. This gives both equations [[#eq-dit]].
:::

So one $N$-point DFT is two $(N/2)$-point DFTs plus $N/2$ complex multiplications (by $W_N^k$) and $N$ complex additions. The pair of equations [[#eq-dit]] has a characteristic shape, the **butterfly**: two inputs $a = G[k]$ and $b = H[k]$, one multiplication $t = W_N^kb$, and two outputs $a + t$ and $a - t$. Drawn as a flow graph, the lines from $a$ and $b$ to the two outputs cross like the wings of a butterfly.

If $N = 2^\nu$, the same split applies to each half-length DFT, and again to the quarter-length ones, until we reach 1-point DFTs, which are the samples themselves. The result is $\nu = \log_2N$ **stages** of $N/2$ butterflies each.

::: theorem Operation count of the radix-2 FFT {#thm-fft-count}
For $N = 2^\nu$, the radix-2 decimation-in-time FFT uses

$$
\frac N2\log_2N \text{ complex multiplications}\quad\text{and}\quad N\log_2N \text{ complex additions},
$$ {#eq-fft-count}

compared with $N^2$ multiplications and $N(N - 1)$ additions for the direct DFT.
:::

::: proof
Let $C(N)$ be the number of complex multiplications. A 1-point DFT costs nothing, $C(1) = 0$, and [[#thm-dit]] gives the recurrence $C(N) = 2C(N/2) + N/2$. Dividing by $N$, $C(N)/N = C(N/2)/(N/2) + 1/2$, so $C(N)/N$ increases by $\frac12$ each time $N$ doubles; after $\nu$ doublings from $N = 1$, $C(N)/N = \nu/2$, i.e. $C(N) = \frac N2\log_2N$. The additions satisfy $A(N) = 2A(N/2) + N$ with $A(1) = 0$, which in the same way gives $A(N) = N\log_2N$.
:::

The counts in [[#eq-fft-count]] treat every twiddle factor as a genuine multiplication. Many are trivial: $W_N^0 = 1$ appears in every butterfly of the first stage, and $W_N^{N/4} = -j$ only swaps real and imaginary parts and changes a sign. Skipping the multiplications by $\pm1$ and $\pm j$ leaves $\frac N2\log_2N - \frac{3N}{2} + 2$ non-trivial complex multiplications: $2$ for $N = 8$ (instead of $12$), $3586$ for $N = 1024$ (instead of $5120$). Higher-radix algorithms save more, as we discuss in [[#sec-practice]].

::: example A four-point FFT by hand {#ex-fft4}
Compute the DFT of $x = \{1, 2, 3, 4\}$ with [[#thm-dit]] and compare with [[dsp/discrete-fourier-transform#ex-dft4]].
::: solution
Even samples $g = \{1, 3\}$, odd samples $h = \{2, 4\}$. A 2-point DFT is a single butterfly with twiddle $W_2^0 = 1$: $\{a + b, a - b\}$. So $G = \{4, -2\}$ and $H = \{6, -2\}$. With $W_4^0 = 1$ and $W_4^1 = -j$:

$$
\begin{aligned}
X[0] &= G[0] + H[0] = 10, & X[2] &= G[0] - H[0] = -2,\\
X[1] &= G[1] + (-j)H[1] = -2 + 2j, & X[3] &= G[1] - (-j)H[1] = -2 - 2j.
\end{aligned}
$$

These agree with the direct computation. The FFT used one non-trivial-looking multiplication (by $-j$, which is really a swap) instead of the $16$ in the matrix product.
:::
:::

### Bit reversal and in-place computation

Follow where each input sample goes in an 8-point decimation-in-time FFT. The first split separates even and odd indices, $\{0, 2, 4, 6\}$ and $\{1, 3, 5, 7\}$; the second splits each again, $\{0, 4\}, \{2, 6\}, \{1, 5\}, \{3, 7\}$. The 2-point DFTs at the first stage therefore combine samples $0$ and $4$, $2$ and $6$, $1$ and $5$, $3$ and $7$. If the inputs are stored in the order in which the first stage needs them, that order is

| position | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---|---|---|---|---|---|---|---|
| binary | $000$ | $001$ | $010$ | $011$ | $100$ | $101$ | $110$ | $111$ |
| input index | $0$ | $4$ | $2$ | $6$ | $1$ | $5$ | $3$ | $7$ |
| index in binary | $000$ | $100$ | $010$ | $110$ | $001$ | $101$ | $011$ | $111$ |

The input index is the position with its bits reversed: **bit-reversed order**. It arises because each split sorts by the lowest remaining bit of the index. With the inputs in bit-reversed order, the three stages can be computed **in place**: each butterfly reads two memory locations and writes its two results back to the same locations, so the FFT needs no storage beyond the $N$ complex numbers (plus a table of twiddle factors). At stage $s$ ($s = 1, 2, 3$) the butterflies pair locations $2^{s-1}$ apart, using twiddles $W_{2^s}^k$; the output emerges in natural order $X[0], \dots, X[7]$.

::: quiz
In a 16-point radix-2 decimation-in-time FFT with bit-reversed input, which input sample is stored in position $3$?
- [ ] $x[3]$
- [x] $x[12]$
- [ ] $x[6]$
- [ ] $x[9]$
::: solution
Position $3$ is $0011$ in four bits; reversed, $1100 = 12$. So $x[12]$ is stored there. (Position $6 = 0110$ holds $x[6]$, because $0110$ is a palindrome; position $9 = 1001$ holds $x[9]$ for the same reason.)
:::
:::

### A recursive implementation

The theorem translates almost word for word into a recursive program. The version below counts its twiddle multiplications, so that we can check [[#thm-fft-count]], and compares its output with the direct DFT.

```python
import cmath

mults = 0

def fft(x):
    """Recursive radix-2 decimation-in-time FFT; len(x) must be a power of 2."""
    global mults
    N = len(x)
    if N == 1:
        return list(x)
    G = fft(x[0::2])                      # DFT of the even-indexed samples
    H = fft(x[1::2])                      # DFT of the odd-indexed samples
    X = [0] * N
    for k in range(N // 2):
        t = cmath.exp(-2j * cmath.pi * k / N) * H[k]   # twiddle factor W_N^k
        mults += 1
        X[k] = G[k] + t                   # butterfly
        X[k + N // 2] = G[k] - t
    return X

def dft(x):
    N = len(x)
    return [sum(x[n] * cmath.exp(-2j * cmath.pi * k * n / N) for n in range(N))
            for k in range(N)]

x = [1, 2, 3, 4, 0, -1, 0.5, 2]
X = fft(x)
print([complex(round(z.real, 4), round(z.imag, 4)) for z in X])
print(max(abs(a - b) for a, b in zip(X, dft(x))))
for N in (8, 64, 1024):
    mults = 0
    fft([0.0] * N)
    print(N, mults, N * N)
```

```text
[(11.5+0j), (1.7071-6.0355j), (-2.5+5j), (0.2929-1.0355j), (-2.5-0j), (0.2929+1.0355j), (-2.5-5j), (1.7071+6.0355j)]
8.840052795286715e-15
8 12 64
64 192 4096
1024 5120 1048576
```

The FFT and the direct DFT agree to within $10^{-14}$, rounding error, and the multiplication counts are exactly $\frac N2\log_2N$: $12$, $192$ and $5120$. A production FFT would precompute the twiddle factors, work in place on a bit-reversed array instead of creating new lists, and stop the recursion at a larger "leaf" size with hand-optimised small DFTs, but the arithmetic would be the same.

::: widget plot
f: 2*x*log10(2); log10(x) + (x - 1)*log10(2)
x: 1, 20
y: 0, 12
labels: \log_{10}N^2\ \text{(direct DFT)}; \log_{10}\big(\tfrac N2\log_2N\big)\ \text{(radix-2 FFT)}
caption: Complex multiplications for a DFT of length $N = 2^x$, on a logarithmic vertical scale (the vertical axis is the number of decimal digits). Hover over $x = 10$ ($N = 1024$): about $10^6$ for the direct sum against $5\times10^3$ for the FFT. The gap widens without limit: at $x = 20$ ($N \approx 10^6$, a modest image) the direct DFT needs $10^{12}$ multiplications and the FFT $10^7$.
:::

## Decimation in frequency {#sec-dif}

The dual algorithm splits the *outputs* into even and odd bins instead of splitting the inputs.

::: theorem Decimation-in-frequency decomposition {#thm-dif}
For even $N$, define the half-length sequences

$$
a[n] = x[n] + x[n + N/2],\qquad b[n] = \big(x[n] - x[n + N/2]\big)W_N^n,\qquad 0 \le n \le N/2 - 1.
$$

Then the even-indexed DFT outputs are the $(N/2)$-point DFT of $a$, and the odd-indexed outputs are the $(N/2)$-point DFT of $b$:

$$
X[2r] = \sum_{n=0}^{N/2-1}a[n]W_{N/2}^{rn},\qquad X[2r+1] = \sum_{n=0}^{N/2-1}b[n]W_{N/2}^{rn}.
$$ {#eq-dif}
:::

::: proof
Split the DFT sum into its first and second halves: $X[k] = \sum_{n=0}^{N/2-1}\big(x[n] + x[n + N/2]W_N^{kN/2}\big)W_N^{kn}$, and $W_N^{kN/2} = (-1)^k$. For $k = 2r$, the factor is $+1$ and $W_N^{2rn} = W_{N/2}^{rn}$, giving the first equation. For $k = 2r + 1$ the factor is $-1$ and $W_N^{(2r+1)n} = W_N^nW_{N/2}^{rn}$, giving the second.
:::

The decimation-in-frequency butterfly takes $x[n]$ and $x[n + N/2]$, forms their sum and difference, and only then multiplies the difference by the twiddle — the reverse order of the decimation-in-time butterfly. The operation count is the same, [[#eq-fft-count]]. The input is in natural order and the output emerges in bit-reversed order. This is convenient for fast convolution ([[dsp/discrete-fourier-transform#alg-overlap]]): a decimation-in-frequency forward transform produces bit-reversed spectra, the multiplication by $H[k]$ does not care about the order (if $H[k]$ is stored in the same order), and a decimation-in-time inverse transform accepts bit-reversed input and produces natural-order output, so no reordering is ever done.

::: remark Computing the inverse DFT with an FFT
The IDFT differs from the DFT only by the sign of the exponent and the factor $1/N$. Taking complex conjugates, $x[n] = \frac1N\big(\sum_kX^*[k]W_N^{kn}\big)^*$: conjugate the spectrum, apply the forward FFT, conjugate the result and divide by $N$. No separate inverse routine is needed.
:::

## Practical FFTs {#sec-practice}

### Higher radices and mixed radices

The decimation can use factors other than $2$. A **radix-4** algorithm splits into four interleaved subsequences; its butterflies have twiddles $1, -j, -1, j$ internally, which are free, so it needs about $25\%$ fewer non-trivial multiplications than radix-2 when $N$ is a power of $4$. The **split-radix** algorithm, which uses radix 2 for the even outputs and radix 4 for the odd ones, has the lowest known operation count for power-of-two lengths among the classic algorithms. If $N = N_1N_2$ for any factors, the Cooley–Tukey idea expresses an $N$-point DFT as $N_2$ DFTs of length $N_1$, twiddle multiplications, and $N_1$ DFTs of length $N_2$, so any highly composite length is fast; prime lengths can be handled by Rader's or Bluestein's algorithm, which turn the DFT into a convolution. Libraries such as FFTW choose among these at run time by timing candidate plans on the actual machine, because on modern processors memory access patterns and vector instructions matter at least as much as the multiplication count.

### Real-valued data

Most signals are real, but the FFT is a complex algorithm. Feeding it real data wastes half its work, because the output has conjugate symmetry and half the bins are redundant. Two tricks recover the waste.

::: proposition Two real DFTs for the price of one {#prop-two-real}
Let $x[n]$ and $y[n]$ be real sequences of length $N$, and let $Z[k]$ be the DFT of $z[n] = x[n] + jy[n]$. Then

$$
X[k] = \frac{Z[k] + Z^*[((N - k))_N]}{2},\qquad Y[k] = \frac{Z[k] - Z^*[((N - k))_N]}{2j}.
$$ {#eq-two-real}
:::

::: proof
By linearity $Z[k] = X[k] + jY[k]$. Since $x$ and $y$ are real, $X^*[((N - k))_N] = X[k]$ and similarly for $Y$ ([[dsp/discrete-fourier-transform#thm-dft-props]], property 4). Hence $Z^*[((N - k))_N] = X^*[((N - k))_N] - jY^*[((N - k))_N] = X[k] - jY[k]$. Adding and subtracting this from $Z[k] = X[k] + jY[k]$ gives the result.
:::

::: example Two real transforms with one complex FFT {#ex-two-real}
Let $x = \{1, 2, 3, 4\}$ and $y = \{1, 0, -1, 0\}$. Compute the 4-point DFT of $z = x + jy$ and use [[#prop-two-real]] to obtain $X[1]$ and $Y[1]$.
::: solution
$z = \{1 + j, 2, 3 - j, 4\}$. With the rows of the 4-point DFT matrix ($W_4 = -j$):

$$
\begin{aligned}
Z[0] &= (1 + j) + 2 + (3 - j) + 4 = 10,\\
Z[1] &= (1 + j) - 2j - (3 - j) + 4j = -2 + 4j,\\
Z[2] &= (1 + j) - 2 + (3 - j) - 4 = -2,\\
Z[3] &= (1 + j) + 2j - (3 - j) - 4j = -2.
\end{aligned}
$$

For $k = 1$, $((N - k))_N = 3$ and $Z^*[3] = -2$, so

$$
X[1] = \frac{(-2 + 4j) + (-2)}{2} = -2 + 2j,\qquad Y[1] = \frac{(-2 + 4j) - (-2)}{2j} = \frac{4j}{2j} = 2 .
$$

Both agree with the direct transforms, $X = \{10, -2 + 2j, -2, -2 - 2j\}$ from [[dsp/discrete-fourier-transform#ex-dft4]] and $Y = \{0, 2, 0, 2\}$ (since $y[n] = \cos(\pi n/2)$). One complex transform plus $O(N)$ extra additions has replaced two.
:::
:::

The same idea computes one real DFT of length $2N$ with a complex FFT of length $N$, by packing the even samples into the real part and the odd ones into the imaginary part and then performing one extra stage of decimation-in-time butterflies.

### Word length and scaling

In fixed-point arithmetic, each butterfly stage can double the magnitude of the data: $\lvert a \pm W b\rvert \le \lvert a\rvert + \lvert b\rvert$. Over $\nu$ stages the values can grow by $2^\nu = N$ (a constant input of amplitude $A$ produces $X[0] = NA$). To avoid overflow, fixed-point FFTs divide by $2$ at each stage (a one-bit right shift), producing $X[k]/N$. The rounding at each stage adds noise; analyses of this (Welch, Oppenheim and Weinstein) show that with scaling at every stage the output noise-to-signal ratio grows in proportion to $N$, i.e. about half a bit of precision is lost each time $N$ doubles, a reason that long fixed-point FFTs use **block floating point**, scaling a stage only when overflow would actually occur. In floating point, the FFT is remarkably accurate: its relative error grows only like $\log_2N$, whereas the direct DFT sum accumulates error like $\sqrt N$ or worse.

::: example Real-time spectrum budget {#ex-budget}
A real-time audio spectrum display computes a $4096$-point FFT of a mono signal at $48\,\mathrm{kHz}$ every $1024$ samples (blocks overlap by $75\%$). Using [[#thm-fft-count]], how many real multiplications per second does the FFT need, and what is the update rate? How would the real-data trick change this?
::: solution
One FFT costs $\frac{4096}{2}\times12 = 24\,576$ complex multiplications, i.e. $4\times24\,576 = 98\,304$ real multiplications. A new FFT starts every $1024$ samples, $48000/1024 = 46.9$ times per second, which is the update rate. The cost is $98\,304\times46.9 = 4.6\times10^6$ real multiplications per second, a few percent of a modest DSP core. Since the input is real, the $4096$-point real FFT can be done with one $2048$-point complex FFT plus a final stage of $2048$ butterflies, roughly halving the cost to about $2.5\times10^6$ multiplications per second. By comparison, the direct DFT would need $4\times4096^2\times46.9 = 3.1\times10^9$ real multiplications per second.
:::
:::

## The Goertzel algorithm {#sec-goertzel}

An FFT computes all $N$ bins. When only a few are needed — a handful of tones to detect, a single frequency to monitor — it is cheaper to compute each one by itself. The **Goertzel algorithm** does this with a second-order recursion that needs one real multiplication per input sample.

The idea is to write a single bin as the output of a filter. Since $W_N^{-kN} = 1$,

$$
X[k] = \sum_{m=0}^{N-1}x[m]W_N^{km} = \sum_{m=0}^{N-1}x[m]W_N^{-k(N - m)},
$$

which is the value at $n = N$ of the convolution of $x$ with $h_k[n] = W_N^{-kn}u[n]$, i.e. of the output of the first-order complex filter $1/(1 - W_N^{-k}z^{-1})$. Multiplying numerator and denominator by $1 - W_N^kz^{-1}$ makes the denominator real:

$$
H_k(z) = \frac{1 - W_N^kz^{-1}}{1 - 2\cos(2\pi k/N)\,z^{-1} + z^{-2}} .
$$ {#eq-goertzel}

The recursive part has the single real coefficient $c = 2\cos(2\pi k/N)$, and the numerator, which involves a complex multiplication, needs to be evaluated only once, at the end.

::: algorithm Goertzel algorithm {#alg-goertzel}
To compute bin $k$ of the $N$-point DFT of $x[0], \dots, x[N-1]$:

1. Set $c = 2\cos(2\pi k/N)$ and $s[-1] = s[-2] = 0$.
2. For $n = 0, 1, \dots, N - 1$: $s[n] = x[n] + c\,s[n-1] - s[n-2]$.
3. Then $X[k] = s[N-1] - W_N^k\,s[N-2]$ (up to a phase factor $W_N^{-k}$, irrelevant for magnitude), and
   $\lvert X[k]\rvert^2 = s[N-1]^2 + s[N-2]^2 - c\,s[N-1]\,s[N-2]$.

For real input, step 2 costs one real multiplication and two additions per sample; step 3 a few operations per bin.
:::

The magnitude formula follows from $\lvert s_1 - W s_2\rvert^2 = s_1^2 + s_2^2 - 2s_1s_2\cos(2\pi k/N)$ for real $s_1$, $s_2$. The total cost for $K$ bins is about $KN$ real multiplications, which beats an FFT ($2N\log_2N$ real multiplications, roughly) when $K < 2\log_2N$. A further advantage is that $k$ need not be an integer: the recursion works for any frequency, not only the bin centres.

::: example Detecting a touch-tone digit {#ex-dtmf}
Telephone keypads signal digits with dual-tone multi-frequency (DTMF) signalling: one tone from the row group $697$, $770$, $852$, $941\,\mathrm{Hz}$ and one from the column group $1209$, $1336$, $1477$, $1633\,\mathrm{Hz}$. A classic detector at $f_s = 8\,\mathrm{kHz}$ uses blocks of $N = 205$ samples ($25.6\,\mathrm{ms}$). Choose the Goertzel bin and coefficient for $770\,\mathrm{Hz}$, and compare the cost of eight Goertzel filters with a $256$-point FFT.
::: solution
The bin spacing is $f_s/N = 8000/205 = 39.0\,\mathrm{Hz}$. For $770\,\mathrm{Hz}$, $Nf/f_s = 205\times770/8000 = 19.73$, so the nearest bin is $k = 20$ (centre $780.5\,\mathrm{Hz}$), and $c = 2\cos(2\pi\cdot20/205) = 1.63586$. Doing the same for all eight tones gives $k = 18, 20, 22, 24, 31, 34, 38, 42$; the value $N = 205$ was chosen because it puts every tone within about $0.27$ of a bin centre.

The standard-library program below runs [[#alg-goertzel]] on the digit "5" ($770 + 1336\,\mathrm{Hz}$, unit amplitudes) and prints $\lvert X[k]\rvert$ for each of the eight bins.

```python
import math

def goertzel_power(x, k):
    """|X[k]|^2 of the len(x)-point DFT, by the Goertzel recursion."""
    N = len(x)
    c = 2 * math.cos(2 * math.pi * k / N)
    s1 = s2 = 0.0
    for v in x:
        s1, s2 = v + c * s1 - s2, s1      # s[n] = x[n] + c s[n-1] - s[n-2]
    return s1 * s1 + s2 * s2 - c * s1 * s2

fs, N = 8000, 205
x = [math.sin(2 * math.pi * 770 * n / fs) + math.sin(2 * math.pi * 1336 * n / fs)
     for n in range(N)]
for f in (697, 770, 852, 941, 1209, 1336, 1477, 1633):
    k = round(N * f / fs)
    print(f, k, round(math.sqrt(goertzel_power(x, k)), 1))
```

```text
697 18 14.6
770 20 90.4
852 22 10.6
941 24 5.9
1209 31 7.4
1336 34 93.8
1477 38 5.7
1633 42 2.7
```

The two transmitted tones stand out by a factor of about six over the largest other bin (an on-bin unit sinusoid would give $N/2 = 102.5$; the $770\,\mathrm{Hz}$ tone, $0.27$ bins off centre, loses about $1\,\mathrm{dB}$). These values agree with a direct DFT to all printed digits. The cost is $8\times205 = 1640$ real multiplications per block. A $256$-point complex FFT (the block zero-padded) needs $128\times8 = 1024$ complex, i.e. $4096$ real multiplications — two and a half times more — and gives bins at the wrong frequencies.
:::
:::

::: widget plot
f: sqrt(sum(cos(m*2*pi*(x/8000 - round(N*770/8000)/N)), m, 0, N - 1)^2 + sum(sin(m*2*pi*(x/8000 - round(N*770/8000)/N)), m, 0, N - 1)^2)/N
x: 600, 1000
y: 0, 1.05
sliders: N=205:50:400:1
vlines: 697; 770; 852; 941
labels: \lvert H_k\rvert\ \text{normalised, bin nearest } 770\,\mathrm{Hz}
caption: Frequency response (normalised to $1$ at its centre) of the DFT bin nearest $770\,\mathrm{Hz}$ for a block of $N$ samples at $8\,\mathrm{kHz}$; dashed lines mark the four DTMF row tones. At $N = 205$ the bin passes $770\,\mathrm{Hz}$ at $-1.1\,\mathrm{dB}$ and rejects $697$ and $852\,\mathrm{Hz}$ by more than $21\,\mathrm{dB}$. Reduce $N$ towards $100$: the main lobe widens and the neighbouring tones leak in, so short blocks cannot separate the tones. Increase $N$: the bin becomes more selective, but the block takes longer than a short key press allows.
:::

::: quiz
A system must monitor the power at $3$ specific frequencies in blocks of $N = 1024$ samples. Roughly how do a Goertzel bank and a radix-2 FFT compare in real multiplications per block?
- [x] Goertzel about $3\times1024 \approx 3000$; FFT about $4\times5120 \approx 20\,000$
- [ ] Both about $20\,000$
- [ ] Goertzel about $3\times1024^2$; FFT about $20\,000$
- [ ] The FFT is always cheaper
::: solution
Each Goertzel filter costs one real multiplication per sample, $1024$ per bin, so three bins cost about $3072$. The complex FFT costs $\frac N2\log_2N = 5120$ complex, about $20\,480$ real multiplications (about half that with a real-input FFT). For a few bins Goertzel wins; for more than about $2\log_2N = 20$ bins the FFT does.
:::
:::

::: application The FFT in modern systems
Every OFDM system — Wi-Fi, 4G and 5G cellular, digital television and DSL — transmits data on hundreds or thousands of subcarriers by computing an inverse FFT at the transmitter and an FFT at the receiver for every symbol: a 5G receiver performs FFTs of up to $4096$ points tens of thousands of times per second ([[communication-systems/wireless-communication]]). Medical imaging reconstructs MRI images with two- and three-dimensional FFTs, radar systems compute range–Doppler maps with FFTs across pulses, and audio codecs such as MP3 and AAC use a fast cosine transform computed with FFT techniques. Multidimensional FFTs are computed as one-dimensional FFTs along each axis in turn.
:::

::: history
Carl Friedrich Gauss used a divide-and-conquer method for trigonometric interpolation around 1805, in work on the orbits of the asteroids Pallas and Juno that was published only posthumously; the connection was recognised by Michael Heideman, Don Johnson and Sidney Burrus in 1984. Partial rediscoveries followed, including by Danielson and Lanczos in 1942, who used the doubling lemma of [[#thm-dit]] for X-ray crystallography. The modern era began with James Cooley and John Tukey's paper of 1965, written at IBM after Richard Garwin needed fast Fourier analysis for detecting nuclear tests. Gerald Goertzel published his algorithm in 1958, before the FFT; Charles Rader's prime-length algorithm appeared in 1968 and the split-radix algorithm was given its name and modern form by Pierre Duhamel and Henk Hollmann in 1984.
:::

## Where this leads

With the FFT, the DFT costs a few operations per sample, and everything built on it becomes practical: fast convolution ([[dsp/discrete-fourier-transform]]), frequency-sampling filter design ([[dsp/fir-filter-design]]), DFT filter banks with polyphase front ends ([[dsp/multirate-processing]]) and the averaged periodograms and spectrograms of [[dsp/spectral-analysis]]. The butterfly structure itself reappears in the hardware of [[computer-architecture/parallel-architectures]] and in the OFDM modulators of [[communication-systems/wireless-communication]].

::: summary
- An FFT computes the exact DFT by exploiting $W_N^{k + N/2} = -W_N^k$ and $W_N^{2k} = W_{N/2}^k$ to share partial sums between bins.
- Decimation in time splits the input into even and odd samples: $X[k] = G[k] + W_N^kH[k]$, $X[k + N/2] = G[k] - W_N^kH[k]$, a butterfly.
- For $N = 2^\nu$ there are $\nu$ stages of $N/2$ butterflies: $\frac N2\log_2N$ complex multiplications and $N\log_2N$ additions, against $N^2$ for the direct sum.
- With bit-reversed input (decimation in time) or bit-reversed output (decimation in frequency) the FFT runs in place; pairing the two avoids all reordering in fast convolution.
- Real data can be handled at about half the cost by packing two real sequences, or the even and odd halves of one, into one complex FFT.
- Fixed-point FFTs grow by up to a factor $N$ and must be scaled by $\frac12$ per stage or use block floating point.
- The Goertzel algorithm computes one bin with one real multiplication per sample; it wins when fewer than about $2\log_2N$ bins are needed, as in DTMF detection.
:::

## Exercises

::: exercise How much faster? {level=1 check="1024^2/(512*10)"}
Compute the ratio of complex multiplications between the direct DFT and the radix-2 FFT for $N = 1024$.
::: solution
Direct: $1024^2 = 1\,048\,576$. FFT: $\frac{1024}{2}\times10 = 5120$. Ratio $204.8$.
:::
:::

::: exercise Stages and butterflies {level=1}
How many stages, butterflies per stage and butterflies in total does a 256-point radix-2 FFT have? How many distinct twiddle factors does its last stage use?
::: solution
$\nu = \log_2256 = 8$ stages of $N/2 = 128$ butterflies: $1024$ butterflies in all. The last stage (decimation in time) combines two 128-point DFTs with twiddles $W_{256}^k$, $k = 0, \dots, 127$: $128$ distinct factors.
:::
:::

::: exercise Bit reversal {level=1 check="11"}
In a 16-point decimation-in-time FFT with bit-reversed input, which input sample sits in position $13$?
::: solution
$13 = 1101_2$; reversed, $1011_2 = 11$. So $x[11]$.
:::
:::

::: exercise A four-point FFT {level=2}
Compute the DFT of $x = \{1, 0, -1, 0\}$ with the decimation-in-time butterflies of [[#thm-dit]]. Check it with the direct definition.
::: solution
$g = \{1, -1\}$, $h = \{0, 0\}$, so $G = \{0, 2\}$ and $H = \{0, 0\}$. Then $X[0] = 0$, $X[2] = 0$, $X[1] = G[1] + (-j)H[1] = 2$, $X[3] = G[1] - (-j)H[1] = 2$: $X = \{0, 2, 0, 2\}$. Directly, $x[n] = \cos(\pi n/2)$, which has bins $\pm1$ with value $N/2 = 2$. Agreed.
:::
:::

::: exercise Two real transforms at once {level=2}
With $x = \{1, 2, 3, 4\}$ and $y = \{1, 0, -1, 0\}$, the DFT of $z = x + jy$ is $Z = \{10, -2 + 4j, -2, -2\}$. Use [[#prop-two-real]] to recover $X[2]$, $X[3]$, $Y[0]$ and $Y[3]$, and compare with the previous exercise.
::: solution
$X[2] = \frac12(Z[2] + Z^*[2]) = -2$. $X[3] = \frac12(Z[3] + Z^*[1]) = \frac12(-2 + (-2 - 4j)) = -2 - 2j$. $Y[0] = \frac{1}{2j}(Z[0] - Z^*[0]) = 0$. $Y[3] = \frac{1}{2j}(Z[3] - Z^*[1]) = \frac{1}{2j}(-2 + 2 + 4j) = 2$. These match $X = \{10, -2 + 2j, -2, -2 - 2j\}$ and $Y = \{0, 2, 0, 2\}$.
:::
:::

::: exercise Goertzel coefficients {level=2 check="2*cos(2*pi*31/205)"}
For the DTMF detector of [[#ex-dtmf]], find the bin index and Goertzel coefficient $c$ for the $1209\,\mathrm{Hz}$ column tone. (Enter $c$.)
::: solution
$205\times1209/8000 = 30.98$, so $k = 31$, centre $31\times8000/205 = 1209.8\,\mathrm{Hz}$. Then $c = 2\cos(2\pi\cdot31/205) = 2\cos(0.9502) = 1.16314$.
:::
:::

::: exercise A large transform {level=2 check="32768*16*4e-9"}
A processor performs one complex multiplication every $4\,\mathrm{ns}$ and additions for free. How long does a $65\,536$-point radix-2 FFT take, in seconds, by [[#eq-fft-count]]? How long would the direct DFT take?
::: solution
$\frac N2\log_2N = 32\,768\times16 = 524\,288$ complex multiplications, $2.10\,\mathrm{ms}$. Direct: $65\,536^2 = 4.29\times10^9$ multiplications, $17.2\,\mathrm{s}$, about $8200$ times longer.
:::
:::

::: exercise Counting non-trivial twiddles {level=3}
Show that a radix-2 decimation-in-time FFT of length $N = 2^\nu$ ($\nu \ge 2$) has $\frac N2\log_2N - \frac{3N}{2} + 2$ twiddle multiplications other than by $1$ or $-j$.
::: hint
Write $T(N)$ for the number of non-trivial multiplications. The final stage multiplies by $W_N^k$, $k = 0, \dots, N/2 - 1$, of which $k = 0$ and $k = N/4$ are trivial. Find a recurrence for $T$ and solve it.
:::
::: solution
The last stage contributes $N/2 - 2$ non-trivial multiplications (for $N \ge 4$), and the two half-length FFTs contribute $2T(N/2)$, so $T(N) = 2T(N/2) + N/2 - 2$, with $T(2) = 0$ (a 2-point DFT has twiddle $1$ only). Try $T(N) = \frac N2\log_2N - \frac{3N}{2} + 2$: $T(2) = 1 - 3 + 2 = 0$ ✓, and $2T(N/2) + N/2 - 2 = \frac N2(\log_2N - 1) - \frac{3N}{2} + 4 + \frac N2 - 2 = \frac N2\log_2N - \frac{3N}{2} + 2$ ✓. By induction the formula holds. For $N = 1024$ it gives $3586$, $30\%$ fewer than $5120$.
:::
:::

::: exercise Deriving the inverse with decimation in frequency {level=3}
Write the IDFT $x[n] = \frac1N\sum_kX[k]W_N^{-kn}$ and derive a decimation-in-frequency style algorithm that computes the *even* output samples $x[2r]$ from an $(N/2)$-point IDFT. What sequence is transformed, and what extra operations are needed?
::: solution
The roles of $n$ and $k$ are exchanged and $W_N$ replaced by $W_N^{-1}$. Split the sum over $k$ into halves: $x[n] = \frac1N\sum_{k=0}^{N/2-1}\big(X[k] + (-1)^nX[k + N/2]\big)W_N^{-kn}$. For $n = 2r$: $x[2r] = \frac12\cdot\frac{1}{N/2}\sum_{k=0}^{N/2-1}\big(X[k] + X[k + N/2]\big)W_{N/2}^{-kr}$, i.e. half the $(N/2)$-point IDFT of $A[k] = X[k] + X[k + N/2]$. For odd outputs, $x[2r+1]$ is half the $(N/2)$-point IDFT of $B[k] = \big(X[k] - X[k + N/2]\big)W_N^{-k}$. The extra work is $N$ additions and $N/2$ multiplications by $W_N^{-k}$ at each level, exactly as in the forward algorithm, plus the overall factor $1/N$ (one factor $\frac12$ per stage).
:::
:::

::: exercise Choosing between FFT and Goertzel {level=3}
A vibration monitor samples at $f_s = 10\,\mathrm{kHz}$ and must report the amplitude at the shaft frequency and its first $K - 1$ harmonics every second, with a bin width of at most $1\,\mathrm{Hz}$. Choose $N$ for an FFT (a power of $2$) and for Goertzel, and find the number of harmonics $K$ above which the FFT is cheaper, counting $4$ real multiplications per complex multiplication and halving the FFT cost for real input.
::: solution
Bin width $f_s/N \le 1\,\mathrm{Hz}$ needs $N \ge 10\,000$. Goertzel can use exactly $N = 10\,000$ (one second of data), and since $k$ need not be an integer, it can sit exactly on each harmonic: cost $10\,000K$ real multiplications per second. The FFT needs $N = 16\,384$ ($1.64\,\mathrm{s}$ of data, or zero padding of one second): $\frac N2\log_2N = 8192\times14 = 114\,688$ complex multiplications, i.e. $458\,752$ real, halved for real input to about $229\,000$. The FFT is cheaper when $10\,000K > 229\,000$, i.e. for $K \ge 23$ harmonics. For a typical monitor tracking fewer than about twenty harmonics, Goertzel filters are cheaper and, as a bonus, are centred exactly on the harmonics.
:::
:::
