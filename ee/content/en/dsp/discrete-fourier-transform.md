A spectrum analyser app on a phone listens to $4096$ samples of microphone signal at $44.1\,\mathrm{kHz}$ and, about ten times a second, draws a curve showing how much energy there is at each frequency from $0$ to $22\,\mathrm{kHz}$. It cannot do that with the DTFT of [[signals-systems/discrete-time-fourier]]: the DTFT needs every sample of the signal, from $n = -\infty$ to $\infty$, and produces a function of a continuous frequency variable. The app has a finite block of numbers and must produce a finite list of numbers. The transform that does this is the **discrete Fourier transform (DFT)**: $N$ samples in, $N$ complex frequency values out, computed by a finite sum.

The DFT is the transform that computers actually compute, and so it is the bridge between Fourier theory and practice. In this chapter we define it, show that its outputs are samples of the DTFT, and work out what that sampling does in the time domain. We derive its properties, the most important and least intuitive of which is that multiplying DFTs corresponds to **circular** rather than linear convolution, and we learn how to use the DFT nonetheless to compute the ordinary convolutions that filters perform, by zero padding and by the overlap-add and overlap-save methods. Interpreting DFTs of real signals — leakage, bins and resolution — is introduced here and completed in [[dsp/spectral-analysis]]; computing them quickly is [[dsp/fast-fourier-transform]].

## The DFT and its inverse {#sec-definition}

Throughout, we write

$$
W_N = e^{-j2\pi/N},
$$

a primitive $N$-th root of unity: $W_N^N = 1$, and $W_N^k$ for $k = 0, 1, \dots, N - 1$ are the $N$ points equally spaced round the unit circle.

::: definition Discrete Fourier transform {#def-dft}
The **$N$-point DFT** of a sequence $x[n]$, $0 \le n \le N - 1$, is

$$
X[k] = \sum_{n=0}^{N-1}x[n]\,W_N^{kn} = \sum_{n=0}^{N-1}x[n]\,e^{-j2\pi kn/N},\qquad k = 0, 1, \dots, N - 1,
$$ {#eq-dft}

and the **inverse DFT (IDFT)** is

$$
x[n] = \frac1N\sum_{k=0}^{N-1}X[k]\,W_N^{-kn},\qquad n = 0, 1, \dots, N - 1.
$$ {#eq-idft}

The index $k$ is the **bin** number; bin $k$ corresponds to the normalised frequency $\omega_k = 2\pi k/N$ and, for samples taken at rate $f_s$, to $f_k = kf_s/N$ hertz.
:::

::: theorem Inversion {#thm-inversion}
The IDFT [[#eq-idft]] recovers $x[n]$ from the DFT [[#eq-dft]]. The key identity is the orthogonality of the roots of unity:

$$
\sum_{k=0}^{N-1}W_N^{k(n - m)} = \begin{cases} N, & n - m \equiv 0 \pmod N,\\ 0, & \text{otherwise}.\end{cases}
$$ {#eq-orthogonality}
:::

::: proof
If $n - m$ is a multiple of $N$, every term is $1$ and the sum is $N$. Otherwise $q = W_N^{n - m} \ne 1$, and the geometric series gives $\sum_{k=0}^{N-1}q^k = (1 - q^N)/(1 - q) = 0$ because $q^N = W_N^{N(n-m)} = 1$. Now substitute [[#eq-dft]] (with summation variable $m$) into the right-hand side of [[#eq-idft]] and exchange the finite sums:

$$
\frac1N\sum_{k=0}^{N-1}\sum_{m=0}^{N-1}x[m]W_N^{km}W_N^{-kn} = \frac1N\sum_{m=0}^{N-1}x[m]\sum_{k=0}^{N-1}W_N^{k(m - n)} = \frac1N\,x[n]\cdot N = x[n],
$$

since for $0 \le m, n \le N - 1$ the inner sum is non-zero only for $m = n$.
:::

In matrix form, $\mathbf X = \mathbf F_N\mathbf x$ where $\mathbf F_N$ is the $N\times N$ **DFT matrix** with entries $(\mathbf F_N)_{kn} = W_N^{kn}$. The inversion theorem says $\mathbf F_N^{-1} = \frac1N\mathbf F_N^*$ (the conjugate, which is also the conjugate transpose because $\mathbf F_N$ is symmetric), so $\frac{1}{\sqrt N}\mathbf F_N$ is a unitary matrix: the DFT is, up to scale, a rotation of $\C^N$ into the basis of sampled complex exponentials. For $N = 4$, with $W_4 = -j$,

$$
\mathbf F_4 = \begin{bmatrix}1 & 1 & 1 & 1\\ 1 & -j & -1 & j\\ 1 & -1 & 1 & -1\\ 1 & j & -1 & -j\end{bmatrix}.
$$

::: example A four-point DFT {#ex-dft4}
Compute the DFT of $x = \{1, 2, 3, 4\}$, check it with Parseval's relation $\sum\lvert x[n]\rvert^2 = \frac1N\sum\lvert X[k]\rvert^2$, and recover $x[1]$ with the IDFT.
::: solution
Multiplying by $\mathbf F_4$ row by row:

$$
\begin{aligned}
X[0] &= 1 + 2 + 3 + 4 = 10,\\
X[1] &= 1 - 2j - 3 + 4j = -2 + 2j,\\
X[2] &= 1 - 2 + 3 - 4 = -2,\\
X[3] &= 1 + 2j - 3 - 4j = -2 - 2j.
\end{aligned}
$$

$X[0]$ is the sum of the samples (the DC term). $X[3] = X[1]^*$, as we will see is always the case for real $x$. Parseval: $\sum x^2 = 1 + 4 + 9 + 16 = 30$ and $\frac14(100 + 8 + 4 + 8) = 30$. The IDFT at $n = 1$ uses the conjugate row $1, j, -1, -j$: $x[1] = \frac14\big(10 + j(-2 + 2j) - (-2) - j(-2 - 2j)\big) = \frac14(10 - 2j - 2 + 2 + 2j - 2) = \frac14\cdot8 = 2$.
:::
:::

The direct computation is easy to program. The following standard-library Python implements [[#eq-dft]] and [[#eq-idft]] literally (at a cost of $N^2$ complex multiplications) and repeats the example; we also use it to multiply two DFTs, which we will interpret in [[#sec-circular]].

```python
import cmath

def dft(x):
    N = len(x)
    return [sum(x[n] * cmath.exp(-2j * cmath.pi * k * n / N) for n in range(N))
            for k in range(N)]

def idft(X):
    N = len(X)
    return [sum(X[k] * cmath.exp(2j * cmath.pi * k * n / N) for k in range(N)) / N
            for n in range(N)]

def show(v):
    return [complex(round(z.real, 4), round(z.imag, 4)) for z in v]

x = [1, 2, 3, 4]
h = [1, 1, 0, 0]
X, Hk = dft(x), dft(h)
print(show(X))
print(show(idft([a * b for a, b in zip(X, Hk)])))
```

```text
[(10-0j), (-2+2j), (-2-0j), (-2-2j)]
[(5+0j), (3-0j), (5-0j), (7+0j)]
```

(The `-0j` entries are rounding residues of size $10^{-15}$ printed with their sign.) The second line is not the linear convolution of $x$ with $h = \{1, 1\}$, which would be $\{1, 3, 5, 7, 4\}$: the last sample $4$ has been added to the first. Explaining this is the main business of the chapter.

::: widget complexplane
mode: roots
n: 8
caption: The eight points $W_8^{-k} = e^{j2\pi k/8}$ on the unit circle are the frequencies of the eight-point DFT: bin $k$ correlates the signal with the sequence $e^{j2\pi kn/8}$, which steps round this octagon $k$ points at a time. Change $n$ to see the frequency grids of other DFT lengths. Bin $N/2$ (the point $-1$) is the Nyquist frequency; bins above it are the negative frequencies $k - N$.
:::

## The DFT as samples of the DTFT {#sec-sampling}

Extend $x[n]$, $0 \le n \le N - 1$, by zeros outside that range. Its DTFT is $X(e^{j\omega}) = \sum_{n=0}^{N-1}x[n]e^{-j\omega n}$, and comparing with [[#eq-dft]],

$$
X[k] = X(e^{j\omega})\Big|_{\omega = 2\pi k/N}.
$$ {#eq-dft-samples}

The DFT of a finite sequence is the DTFT sampled at $N$ equally spaced frequencies. That is reassuring, but it raises two questions. What happens if the sequence is longer than $N$, or infinite — what sequence has as its DFT the samples of a given DTFT? And what is the DFT "doing" to the sequence, given that sampling in one domain usually means periodic repetition in the other?

::: theorem Sampling the DTFT {#thm-sampling-dtft}
Let $x[n]$ be any absolutely summable sequence with DTFT $X(e^{j\omega})$, and let $\tilde X[k] = X(e^{j2\pi k/N})$ for $0 \le k \le N - 1$. Then the IDFT of $\tilde X[k]$ is the **time-aliased** sequence

$$
\tilde x[n] = \sum_{r=-\infty}^{\infty}x[n - rN],\qquad 0 \le n \le N - 1.
$$ {#eq-time-aliasing}

In particular, if $x[n]$ is zero outside $0 \le n \le N - 1$, then $\tilde x[n] = x[n]$ and the samples determine $x$ (and hence the whole DTFT); if $x$ is longer than $N$, the samples determine only the wrapped-around sum.
:::

::: proof
Substitute the DTFT into the IDFT and exchange the order of summation (allowed by absolute summability):

$$
\frac1N\sum_{k=0}^{N-1}\Big(\sum_{m=-\infty}^{\infty}x[m]e^{-j2\pi km/N}\Big)e^{j2\pi kn/N} = \sum_{m=-\infty}^{\infty}x[m]\,\frac1N\sum_{k=0}^{N-1}W_N^{k(m - n)}.
$$

By [[#eq-orthogonality]], the inner sum is $1$ when $m = n + rN$ for some integer $r$ and $0$ otherwise, which leaves $\sum_rx[n + rN]$, the same as [[#eq-time-aliasing]] with $r$ replaced by $-r$.
:::

This is the sampling theorem with time and frequency exchanged. Sampling a signal in time at rate $f_s$ repeats its spectrum every $f_s$ ([[signals-systems/sampling]]); sampling a spectrum at spacing $2\pi/N$ repeats the sequence every $N$ samples. If the sequence is no longer than $N$, the copies do not overlap and nothing is lost. Otherwise they overlap and add, which is **time-domain aliasing**.

::: example Sampling the DTFT of an infinite sequence {#ex-time-aliasing}
The DTFT of $x[n] = (0.5)^nu[n]$ is $X(e^{j\omega}) = 1/(1 - 0.5e^{-j\omega})$. Sample it at $N = 4$ frequencies and find the sequence whose 4-point DFT these samples are.
::: solution
By [[#thm-sampling-dtft]], the answer is $\tilde x[n] = \sum_{r\ge0}(0.5)^{n + 4r} = (0.5)^n\sum_{r\ge0}(0.0625)^r = \dfrac{(0.5)^n}{1 - 0.5^4}$ for $0 \le n \le 3$ (only $r \le 0$ in [[#eq-time-aliasing]] contributes, i.e. the copies shifted to the left):

$$
\tilde x = \{1.0667,\ 0.5333,\ 0.2667,\ 0.1333\}.
$$

Computing the IDFT of the four samples $1/(1 - 0.5W_4^k)$ numerically gives the same values. The tail of the exponential beyond $n = 3$ has been folded back onto the first four samples, raising each by the factor $1/0.9375$. With $N = 16$ the factor would be $1/(1 - 0.5^{16}) = 1.000015$: when $x[n]$ has decayed to negligible values within $N$ samples, time aliasing is negligible too.
:::
:::

### Zero padding and the picket fence

Sampling a sequence's DTFT more densely is easy: append zeros to make it longer, and take a longer DFT. **Zero padding** a length-$L$ sequence to length $N > L$ leaves its DTFT unchanged (the extra samples are zero) but samples it at $N$ points instead of $L$.

::: example What zero padding shows {#ex-zero-padding}
Compute the 4-point DFT of $x = \{1, 1, 1, 1\}$ and the 8-point DFT of the same sequence padded with four zeros. Interpret both with the DTFT $X(e^{j\omega}) = e^{-j3\omega/2}\sin(2\omega)/\sin(\omega/2)$.
::: solution
4-point DFT: $X[0] = 4$ and $X[k] = \sum_{n=0}^{3}(-j)^{kn} = 0$ for $k = 1, 2, 3$ by [[#eq-orthogonality]]. The DFT says "pure DC", which is correct: the four samples are exactly one period of a constant.

8-point DFT: $X[k] = \sum_{n=0}^{3}e^{-j\pi kn/4}$, giving

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---|---|---|---|---|---|---|---|
| $X[k]$ | $4$ | $1 - 2.414j$ | $0$ | $1 - 0.414j$ | $0$ | $1 + 0.414j$ | $0$ | $1 + 2.414j$ |
| $\lvert X[k]\rvert$ | $4$ | $2.613$ | $0$ | $1.082$ | $0$ | $1.082$ | $0$ | $2.613$ |

The magnitudes are $\lvert\sin(2\omega)/\sin(\omega/2)\rvert$ at $\omega = \pi k/4$: for $k = 1$, $\sin(\pi/2)/\sin(\pi/8) = 1/0.3827 = 2.613$. The 4-point DFT sampled the Dirichlet kernel exactly at its zeros; the 8-point DFT also samples it between them and reveals the sidelobes. Both are correct; they are different samples of the same DTFT. Zero padding does not add information about the signal, it interpolates the spectrum we already had.
:::
:::

::: warning Zero padding does not improve resolution
It is tempting to think that padding a $256$-sample record to $4096$ points gives "16 times finer frequency resolution". It gives 16 times more closely spaced samples of the same DTFT, whose main lobes still have width set by the $256$ samples of data. Two tones $20\,\mathrm{Hz}$ apart in a record of $T = 256/f_s$ seconds are separable only if $T \gtrsim 1/(20\,\mathrm{Hz})$, however many zeros are added. Resolution comes from record length; zero padding only makes the plotted curve smoother and the peak easier to locate.
:::

The DFT is a **picket fence**: we see the DTFT only through the gaps at $\omega_k = 2\pi k/N$. A tone that falls exactly on a bin appears as a single line; a tone between bins appears as a spread of values, smaller at its peak and leaking into every other bin. This is the effect of observing only $N$ samples, multiplied by an implicit rectangular window.

::: widget plot
f: sqrt(sum(cos(k*(x - pi*(4 + d)/8)), k, 0, 15)^2 + sum(sin(k*(x - pi*(4 + d)/8)), k, 0, 15)^2)
x: 0, pi
y: 0, 17
sliders: d=0:0:1:0.01
vlines: 0; pi/8; pi/4; 3*pi/8; pi/2; 5*pi/8; 3*pi/4; 7*pi/8; pi
piticks: true
labels: \lvert X(e^{j\omega})\rvert\ \text{of } 16\text{ samples of } e^{j\omega_0 n}
caption: The DTFT magnitude of $16$ samples of a complex tone at $\omega_0 = 2\pi(4 + d)/16$; the grey lines are the bins $\omega_k = 2\pi k/16$ of the 16-point DFT. With $d = 0$ the tone sits on bin $4$, the curve passes through $16$ there and through zero at every other bin, and the DFT shows a single line. Move $d$ to $0.5$: the tone falls between bins $4$ and $5$, both read about $10.2$ (a $3.9\,\mathrm{dB}$ "scalloping" loss) and every other bin picks up leakage.
:::

## Properties of the DFT {#sec-properties}

Because the DFT only knows samples $0$ to $N - 1$, and because by [[#thm-sampling-dtft]] those samples behave as one period of a periodic sequence, all index arithmetic in the DFT is **modulo $N$**. We write $((n))_N$ for $n$ reduced modulo $N$ into $\{0, \dots, N-1\}$. A **circular shift** by $m$ is $x[((n - m))_N]$: the samples move right by $m$ and those that fall off the end reappear at the start. A **circular reversal** is $x[((-n))_N]$, which keeps $x[0]$ and reverses the order of the rest.

::: theorem Properties of the DFT {#thm-dft-props}
Let $x[n] \leftrightarrow X[k]$ and $y[n] \leftrightarrow Y[k]$ be $N$-point DFT pairs.

1. **Linearity:** $ax[n] + by[n] \leftrightarrow aX[k] + bY[k]$.
2. **Circular time shift:** $x[((n - m))_N] \leftrightarrow W_N^{km}X[k]$.
3. **Modulation:** $W_N^{-ln}x[n] \leftrightarrow X[((k - l))_N]$.
4. **Conjugate symmetry:** if $x$ is real, $X[((N - k))_N] = X^*[k]$; so $X[0]$ is real, $X[N/2]$ is real for even $N$, and $\lvert X[k]\rvert$ is symmetric about $N/2$.
5. **Duality:** if $x[n] \leftrightarrow X[k]$ then $X[n] \leftrightarrow Nx[((-k))_N]$.
6. **Parseval:** $\displaystyle\sum_{n=0}^{N-1}x[n]y^*[n] = \frac1N\sum_{k=0}^{N-1}X[k]Y^*[k]$, and in particular $\sum\lvert x[n]\rvert^2 = \frac1N\sum\lvert X[k]\rvert^2$.
7. **Circular convolution:** $(x \circledast_N y)[n] \leftrightarrow X[k]\,Y[k]$, where $(x \circledast_N y)[n] = \sum_{m=0}^{N-1}x[m]\,y[((n - m))_N]$.
:::

::: proof
(2) $\sum_nx[((n - m))_N]W_N^{kn}$: put $l = ((n - m))_N$; as $n$ runs over $0, \dots, N-1$ so does $l$, and $W_N^{kn} = W_N^{k(l + m)}$ because $W_N^{kN} = 1$. So the sum is $W_N^{km}X[k]$. (3) $\sum_nx[n]W_N^{(k - l)n} = X[((k - l))_N]$, the periodicity of $W_N$ again. (4) Conjugate [[#eq-dft]] for real $x$: $X^*[k] = \sum x[n]W_N^{-kn} = \sum x[n]W_N^{(N - k)n} = X[((N - k))_N]$. (5) Compare [[#eq-dft]] with $N$ times [[#eq-idft]] evaluated at $-k$.

(6) Insert the IDFT of $X$ and $Y$ into the left side and use [[#eq-orthogonality]] to collapse the double sum over $k$ and $k'$ to $k = k'$:

$$
\sum_nx[n]y^*[n] = \frac{1}{N^2}\sum_{k,k'}X[k]Y^*[k']\sum_nW_N^{-(k - k')n} = \frac1N\sum_kX[k]Y^*[k].
$$

(7) Take the DFT of the circular convolution and exchange the sums: $\sum_mx[m]\sum_ny[((n - m))_N]W_N^{kn} = \sum_mx[m]W_N^{km}Y[k] = X[k]Y[k]$, using (2) for the inner sum.
:::

Property 4 halves the work of storing and interpreting the DFT of a real signal: only bins $0$ to $N/2$ are independent, and the plotted "spectrum" of real data shows only those. Property 2 says that a circular shift changes only the phase of the DFT, by an amount proportional to frequency, just as a delay does for the DTFT. Property 7 is the one that matters most for computing.

::: quiz
A real sequence of length $N = 10$ has $X[3] = 1 + 2j$. Which of the following is necessarily true?
- [ ] $X[-3] = 1 + 2j$
- [x] $X[7] = 1 - 2j$
- [ ] $X[3]$ must be real
- [ ] $X[13] = 1 - 2j$
::: solution
For real $x$, $X[((N - k))_N] = X^*[k]$, so $X[10 - 3] = X[7] = (1 + 2j)^* = 1 - 2j$. Indices outside $0, \dots, 9$ are taken modulo $10$, so "$X[-3]$" and "$X[13]$" would mean $X[7]$ and $X[3]$, which are $1 - 2j$ and $1 + 2j$, contradicting the first and last options. Only $X[0]$ and $X[5]$ are necessarily real.
:::
:::

## Circular and linear convolution {#sec-circular}

The convolution property of the DTFT says that filtering multiplies spectra; property 7 says that multiplying DFTs performs a **circular** convolution. The two agree only when the circular wrap-around does no harm.

::: example Circular convolution by hand {#ex-circular}
Compute the 4-point circular convolution of $x = \{1, 2, 3, 4\}$ with $h = \{1, 1, 0, 0\}$, compare with the linear convolution, and explain the program output in [[#sec-definition]].
::: solution
With $h[((n - m))_4]$ non-zero only for $((n - m))_4 \in \{0, 1\}$, each output is $y[n] = x[n] + x[((n - 1))_4]$:

$$
y[0] = x[0] + x[3] = 5,\quad y[1] = x[1] + x[0] = 3,\quad y[2] = 5,\quad y[3] = 7 .
$$

The linear convolution is $x * h = \{1, 3, 5, 7, 4\}$, of length $5$. The circular result is the linear one with its fifth sample wrapped round onto the first: $1 + 4 = 5$. That is exactly the program's output, because multiplying the two 4-point DFTs computes the circular convolution.
:::
:::

The example illustrates the general rule, which follows from [[#thm-sampling-dtft]]. The product $X(e^{j\omega})H(e^{j\omega})$ is the DTFT of the linear convolution $x * h$; sampled at $N$ points, it is the DFT of the time-aliased version of $x * h$. So the circular convolution is the linear convolution wrapped around modulo $N$.

::: theorem Linear convolution with the DFT {#thm-linear-via-dft}
Let $x$ have length $L$ and $h$ have length $M$. Then the $N$-point circular convolution of $x$ and $h$ (both zero-padded to length $N$) equals

$$
(x \circledast_N h)[n] = \sum_{r}(x * h)[n + rN],\qquad 0 \le n \le N - 1,
$$

and it equals the linear convolution $x * h$ for all $n$ if and only if $N \ge L + M - 1$. If $N < L + M - 1$, the first $L + M - 1 - N$ samples are corrupted by wrap-around and the remaining ones are correct.
:::

::: proof
The linear convolution has length $L + M - 1$, and its DTFT is $X(e^{j\omega})H(e^{j\omega})$, whose samples at $2\pi k/N$ are $X[k]H[k]$ by [[#eq-dft-samples]] (the DFTs of the zero-padded sequences). By [[#thm-sampling-dtft]], the IDFT of those samples is the time-aliased linear convolution, which is the first statement. The copies shifted by $\pm N$ overlap the unshifted one only if $L + M - 1 > N$, and then the overlap is the tail of length $L + M - 1 - N$ that lands on $n = 0, 1, \dots, L + M - 2 - N$.
:::

To filter a block of data with the DFT, therefore: zero-pad both $x$ and $h$ to $N \ge L + M - 1$, take their DFTs, multiply, and take the IDFT. For a long FIR filter this is much cheaper than direct convolution once the DFTs are computed by the FFT, a method known as **fast convolution**.

### Filtering long signals: overlap-add and overlap-save

A real-time filter cannot wait for the whole input. The input is cut into blocks and each is processed with a DFT of fixed size $N$, using one of two methods. Suppose the FIR filter has length $M$.

::: algorithm Overlap-add and overlap-save {#alg-overlap}
Choose a DFT size $N$ (usually a power of $2$) and precompute $H[k]$, the $N$-point DFT of $h$ zero-padded to $N$. Let $L = N - M + 1$.

**Overlap-add.** Split $x$ into non-overlapping blocks $x_r[n] = x[n + rL]$, $0 \le n \le L - 1$. For each block, zero-pad to $N$, compute $Y_r[k] = X_r[k]H[k]$ and $y_r = \mathrm{IDFT}(Y_r)$, which is the full linear convolution $x_r * h$ of length $L + M - 1 = N$. Add the overlapping tails: $y[n] = \sum_ry_r[n - rL]$, each block's last $M - 1$ samples overlapping the next block's first $M - 1$.

**Overlap-save.** Take overlapping input blocks of length $N$ that start every $L$ samples, each containing the last $M - 1$ samples of the previous block followed by $L$ new ones. Compute the $N$-point circular convolution with $h$. By [[#thm-linear-via-dft]], its first $M - 1$ samples are corrupted by wrap-around; discard them and keep the last $L$, which are correct output samples.
:::

Both methods produce exactly the same output as direct convolution (apart from rounding). Overlap-add needs additions of overlapping tails; overlap-save needs no additions but copies the overlapping input. Both delay the output by at least one block, which matters in hearing aids and live sound but not in offline processing.

::: example Choosing a block size {#ex-block-size}
A $101$-tap FIR equaliser is to be applied to audio at $48\,\mathrm{kHz}$ by overlap-save with an FFT of size $N = 256$, $512$ or $1024$. Using the FFT cost of $\frac N2\log_2N$ complex multiplications per transform (derived in [[dsp/fast-fourier-transform]]), compare the cost per output sample with direct convolution, and give the block latency for $N = 512$. Repeat the comparison for a $1001$-tap filter.
::: solution
Each block costs one forward FFT, $N$ complex multiplications by $H[k]$ and one inverse FFT: $N\log_2N + N$ complex multiplications, producing $L = N - M + 1$ new outputs. For $M = 101$:

| $N$ | $L = N - 100$ | complex mults per block | per output sample |
|---|---|---|---|
| $256$ | $156$ | $2304$ | $14.8$ |
| $512$ | $412$ | $5120$ | $12.4$ |
| $1024$ | $924$ | $11\,264$ | $12.2$ |

A complex multiplication is four real multiplications, so $N = 512$ costs about $50$ real multiplications per output sample, against $101$ for direct convolution: a saving of a factor of two. (Real-signal tricks from [[dsp/fast-fourier-transform]] halve the FFT cost again.) Going beyond $N = 512$ barely helps, while the latency grows: with $N = 512$ the processor must collect $L = 412$ new samples, $8.6\,\mathrm{ms}$ at $48\,\mathrm{kHz}$, before it can compute their outputs.

For $M = 1001$ and $N = 2048$: $L = 1048$, $2048\times11 + 2048 = 24\,576$ complex multiplications per block, $23.5$ per sample, about $94$ real multiplications against $1001$ — more than ten times cheaper. With $N = 4096$ ($L = 3096$) it falls to $17.2$ complex, about $69$ real. The rule of thumb is to choose $N$ between about $2M$ and $8M$: the longer the filter, the more fast convolution wins.
:::
:::

::: quiz
A $64$-tap FIR filter is applied by overlap-save with $256$-point DFTs. How many output samples does each block yield, and which ones are discarded?
- [ ] $256$; none
- [ ] $192$; the last $64$
- [x] $193$; the first $63$
- [ ] $193$; the last $63$
::: solution
By [[#thm-linear-via-dft]] with an $N = 256$ block and $M = 64$, the wrap-around corrupts the first $M - 1 = 63$ samples of each circular convolution. The remaining $L = N - M + 1 = 193$ are valid outputs, so each new block advances the input by $193$ samples.
:::
:::

::: application Fast convolution in practice
Convolution reverb in music production applies the measured impulse response of a concert hall, often two or three seconds long — $100\,000$ taps or more at $48\,\mathrm{kHz}$ — to a dry recording. Direct convolution would need several billion multiplications per second per channel; overlap-save with large FFTs needs a few tens of millions. To avoid the latency of one huge block, real-time reverbs use **partitioned convolution**: the impulse response is cut into segments of increasing size, the early segments processed with small FFTs (low latency) and the later ones with large FFTs (low cost). The same idea runs the long adaptive filters of acoustic echo cancellers in conference phones.
:::

::: history
The finite trigonometric sums that make up the DFT were used for interpolation by Alexis Clairaut in 1754 and by Joseph-Louis Lagrange in 1762, and by Carl Friedrich Gauss around 1805 in fitting asteroid orbits, long before Fourier's work on heat. They became "the DFT" only with digital computers: after James Cooley and John Tukey published the fast algorithm in 1965, Thomas Stockham showed in 1966 how to use it for fast convolution, and the overlap-add and overlap-save methods were described by Stockham and by Helms in the late 1960s. The terminology of bins, leakage and picket fences was popularised by Fredric Harris's 1978 survey of windows.
:::

## Where this leads

The direct DFT costs $N^2$ complex multiplications, which for $N = 4096$ is about $17$ million — the reason nobody computes it directly. [[dsp/fast-fourier-transform]] reduces this to about $25\,000$. The DFT's view of the spectrum through a picket fence, after an implicit rectangular window, is the starting point of [[dsp/spectral-analysis]], where windows, averaging and the statistics of noisy spectra are developed. The relation between sampling the spectrum and time-aliasing reappears in [[dsp/fir-filter-design]], where the frequency-sampling method designs a filter by specifying its DFT, and the DFT matrix reappears in the DFT filter banks of [[dsp/multirate-processing]] and in OFDM transmission ([[communication-systems/wireless-communication]]).

::: summary
- The $N$-point DFT $X[k] = \sum_{n=0}^{N-1}x[n]W_N^{kn}$ maps $N$ samples to $N$ frequency values; the IDFT inverts it thanks to the orthogonality of the roots of unity.
- Bin $k$ is the frequency $\omega_k = 2\pi k/N$, i.e. $f_k = kf_s/N$; bins above $N/2$ are negative frequencies, and real signals have $X[N - k] = X^*[k]$.
- The DFT samples the DTFT; sampling the DTFT at $N$ points aliases the sequence in time with period $N$.
- Zero padding samples the same DTFT more densely; it does not improve resolution, which is set by the record length.
- All index arithmetic is modulo $N$: shifts are circular, and multiplying DFTs performs circular convolution.
- Circular convolution equals linear convolution when $N \ge L + M - 1$; otherwise the first $L + M - 1 - N$ samples are corrupted by wrap-around.
- Overlap-add and overlap-save filter long signals block by block; with FFTs they beat direct convolution for filters longer than a few dozen taps, at the cost of a block of latency.
:::

## Exercises

::: exercise Impulses {level=1}
Find the 4-point DFTs of $\delta[n] = \{1, 0, 0, 0\}$ and of $\delta[n - 1] = \{0, 1, 0, 0\}$. How are they related?
::: solution
$\delta[n] \leftrightarrow \{1, 1, 1, 1\}$: equal energy at every frequency. $\delta[n - 1] \leftrightarrow W_4^k = \{1, -j, -1, j\}$. By the shift property the second is the first multiplied by $W_4^{k}$: same magnitudes, linearly increasing phase.
:::
:::

::: exercise Bin spacing {level=1 check="44100/4096"}
A $4096$-point DFT is applied to audio sampled at $44.1\,\mathrm{kHz}$. What is the bin spacing in hertz, and which bin is nearest to $1\,\mathrm{kHz}$?
::: solution
$\Delta f = f_s/N = 44100/4096 = 10.77\,\mathrm{Hz}$. $1000/10.77 = 92.9$, so bin $93$ ($1001.4\,\mathrm{Hz}$) is the nearest.
:::
:::

::: exercise An alternating sequence {level=1}
Compute the 4-point DFT of $x = \{1, -1, 1, -1\}$ and interpret it.
::: solution
$X[k] = \sum_n(-1)^n(-j)^{kn}$. $X[0] = 0$, $X[1] = 1 + j - 1 - j = 0$, $X[2] = 1 + 1 + 1 + 1 = 4$, $X[3] = 0$. All the energy is in bin $2 = N/2$, the Nyquist frequency, because $(-1)^n = e^{j\pi n}$. Parseval: $4 = \frac14\cdot16$.
:::
:::

::: exercise A circular convolution {level=2}
Compute the 4-point circular convolution of $\{1, 2, 0, 0\}$ and $\{3, 0, 0, 1\}$ directly, and say which DFT size would give the linear convolution.
::: solution
$y[n] = \sum_mx[m]h[((n - m))_4]$ with only $x[0] = 1$, $x[1] = 2$ non-zero: $y[n] = h[n] + 2h[((n - 1))_4]$, so $y[0] = 3 + 2\cdot1 = 5$, $y[1] = 0 + 2\cdot3 = 6$, $y[2] = 0 + 0 = 0$, $y[3] = 1 + 0 = 1$: $\{5, 6, 0, 1\}$. The linear convolution has length $2 + 4 - 1 = 5$ (it is $\{3, 6, 0, 1, 2\}$, and wrapping its last sample onto the first gives $5$); a DFT size of $N \ge 5$ reproduces it.
:::
:::

::: exercise DFT of a sampled cosine {level=2}
Find the 8-point DFT of $x[n] = \cos(2\pi\cdot3n/8)$, $0 \le n \le 7$, without computing any sums.
::: solution
$\cos(2\pi\cdot3n/8) = \frac12\big(W_8^{-3n} + W_8^{3n}\big) = \frac12\big(W_8^{-3n} + W_8^{-5n}\big)$. By [[#eq-orthogonality]], $W_8^{-ln}$ has DFT $8\delta[k - l]$, so $X[3] = X[5] = 4$ and all other bins are $0$. Bin $5$ is the negative frequency $-3$. The tone completes exactly three cycles in the record, so there is no leakage.
:::
:::

::: exercise How large a DFT? {level=2 check="128"}
A $50$-sample signal is to be filtered with a $30$-tap FIR filter by multiplying DFTs. What is the minimum DFT size, and what is the smallest power of $2$ that works?
::: solution
$N \ge L + M - 1 = 50 + 30 - 1 = 79$. The smallest power of $2$ is $128$.
:::
:::

::: exercise Scalloping loss {level=2 check="-20*log10(16*sin(pi/32))"}
A complex tone $e^{j\omega_0n}$ with $\omega_0 = 2\pi\cdot4.5/16$ is analysed with a 16-point DFT. Find $\lvert X[4]\rvert$ and $\lvert X[8]\rvert$, and the loss in decibels of the largest bin relative to an on-bin tone of the same amplitude (the answer box takes the loss as a negative number of decibels).
::: hint
$X[k] = \sum_{n=0}^{15}e^{j2\pi(4.5 - k)n/16}$ is a geometric series; its magnitude is $\lvert\sin(\pi(k - 4.5))/\sin(\pi(k - 4.5)/16)\rvert$.
:::
::: solution
$\lvert X[4]\rvert = \lvert\sin(-\pi/2)/\sin(-\pi/32)\rvert = 1/0.09802 = 10.20$, and $\lvert X[5]\rvert$ is the same. $\lvert X[8]\rvert = 1/\sin(3.5\pi/16) = 1/0.6344 = 1.576$. An on-bin tone gives $16$. The loss is $20\log_{10}(10.20/16) = -3.91\,\mathrm{dB}$, the worst-case **scalloping loss** of the rectangular window. Every other bin has picked up leakage that falls off only as $1/\lvert k - 4.5\rvert$.
:::
:::

::: exercise Parseval's relation {level=3}
Prove $\sum_{n=0}^{N-1}\lvert x[n]\rvert^2 = \frac1N\sum_{k=0}^{N-1}\lvert X[k]\rvert^2$ using the matrix form $\mathbf X = \mathbf F_N\mathbf x$ and the fact that $\mathbf F_N^*\mathbf F_N = N\mathbf I$, and deduce that the DFT of white noise with variance $\sigma^2$ per sample has $\E\lvert X[k]\rvert^2 = N\sigma^2$ in every bin.
::: hint
$\sum\lvert X[k]\rvert^2 = \mathbf X^H\mathbf X$, where $^H$ is the conjugate transpose. For the noise, compute $\E\lvert X[k]\rvert^2 = \sum_n\sum_m\E\{x[n]x^*[m]\}W_N^{k(n - m)}$.
:::
::: solution
$\mathbf F_N$ is symmetric, so $\mathbf F_N^H = \mathbf F_N^*$, and $\mathbf F_N^*\mathbf F_N = N\mathbf I$ is [[#eq-orthogonality]] written entry by entry. Then $\mathbf X^H\mathbf X = \mathbf x^H\mathbf F_N^H\mathbf F_N\mathbf x = N\mathbf x^H\mathbf x$, which is Parseval. For zero-mean white noise, $\E\{x[n]x^*[m]\} = \sigma^2\delta[n - m]$, so the double sum collapses to $\sum_n\sigma^2 = N\sigma^2$ for every $k$. A tone of amplitude $A$ on bin $k$ gives $\lvert X[k]\rvert = NA$, i.e. $\lvert X[k]\rvert^2 = N^2A^2$, so the tone-to-noise ratio per bin grows in proportion to $N$: this is the **processing gain** of the DFT, used in [[dsp/spectral-analysis]].
:::
:::

::: exercise Why overlap-save discards the first samples {level=3}
In overlap-save with block length $N$ and filter length $M$, the $r$-th input block is $x_r[n] = x[n + rL - (M - 1)]$, $0 \le n \le N - 1$, with $L = N - M + 1$. Show directly from the definition of circular convolution that $(x_r \circledast_N h)[n] = y[n + rL - (M - 1)]$ for $M - 1 \le n \le N - 1$, where $y = x * h$, and that this is not true in general for $n < M - 1$.
::: solution
$(x_r \circledast_N h)[n] = \sum_{m=0}^{M-1}h[m]\,x_r[((n - m))_N]$, since $h[m] = 0$ for $m \ge M$. If $n \ge M - 1$, then $0 \le n - m \le N - 1$ for all $0 \le m \le M - 1$, so no wrap-around occurs and the sum is $\sum_mh[m]x[n - m + rL - (M - 1)] = y[n + rL - (M - 1)]$. If $n < M - 1$, the terms with $m > n$ use $x_r[n - m + N]$, samples from the end of the block, instead of the earlier inputs that the linear convolution needs; those outputs are wrong and are discarded. The valid outputs $n = M - 1, \dots, N - 1$ are $L$ consecutive samples of $y$, and successive blocks advance by $L$, so they tile the output exactly.
:::
:::
