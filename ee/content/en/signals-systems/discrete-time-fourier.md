The graphic equaliser in a music app, the noise-cancelling processor in a headset and the filter that cleans up an ECG trace in a hospital monitor are all digital: they operate on sequences of samples and are specified, tested and sold by their frequency response. "Flat to within $0.5\,\mathrm{dB}$ from $20\,\mathrm{Hz}$ to $20\,\mathrm{kHz}$", "$60\,\mathrm{dB}$ rejection of $50\,\mathrm{Hz}$": these are statements about the **discrete-time Fourier transform**, the frequency-domain description of discrete-time signals and systems.

The DTFT is the discrete-time counterpart of [[signals-systems/fourier-transform]], and most of its properties will look familiar. But there is one profound difference, which we already met in [[signals-systems/signals#thm-dt-sinusoid]]: discrete-time frequencies are only defined modulo $2\pi$. The spectrum of a sequence is therefore periodic in frequency, "high frequency" means $\omega = \pi$, not $\omega \to \infty$, and frequency is measured in radians per sample. With that settled, we define the transform, compute the standard pairs, list the properties and then spend most of the lesson on what engineers use the DTFT for: computing, interpreting and designing the frequency responses of digital filters given by difference equations.

## The discrete-time Fourier transform {#sec-dtft}

The derivation mirrors the continuous-time one. A finite-length sequence $x[n]$, repeated with period $N$, has DTFS coefficients $a_k = \frac1N\sum_nx[n]e^{-jk(2\pi/N)n}$ ([[signals-systems/fourier-series#def-dtfs]]), which are $\frac1N$ times samples of the function $X(e^{j\omega}) = \sum_nx[n]e^{-j\omega n}$ at $\omega = 2\pi k/N$. As $N \to \infty$ the samples fill in a continuum and the synthesis sum becomes an integral over one period of $\omega$.

::: definition Discrete-time Fourier transform {#def-dtft}
The **discrete-time Fourier transform (DTFT)** of a sequence $x[n]$ and its inverse are

$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty}x[n]\,e^{-j\omega n},\qquad x[n] = \frac{1}{2\pi}\int_{2\pi}X(e^{j\omega})\,e^{j\omega n}\,\dd\omega,
$$ {#eq-dtft}

where $\int_{2\pi}$ is an integral over any interval of length $2\pi$, usually $-\pi < \omega \le \pi$. The transform is **periodic**: $X(e^{j(\omega + 2\pi)}) = X(e^{j\omega})$. The notation $X(e^{j\omega})$ records that it is a function of $e^{j\omega}$, a point on the unit circle, and anticipates the $z$-transform $X(z)$ at $z = e^{j\omega}$.
:::

The DTFT exists, as a continuous function of $\omega$, when $x$ is absolutely summable, $\sum\lvert x[n]\rvert < \infty$; it exists in the mean-square sense when $x$ has finite energy. The inverse formula is proved by substituting the first equation into the second and using $\frac{1}{2\pi}\int_{-\pi}^{\pi}e^{j\omega(n - m)}\,\dd\omega = \delta[n - m]$. Notice the roles: the DTFT *is* a Fourier series, in the variable $\omega$ and with period $2\pi$, whose coefficients are the samples $x[n]$. Everything known about Fourier series (convergence, Gibbs phenomenon, Parseval) applies with time and frequency interchanged.

Because of the periodicity, a DT spectrum is completely described on $-\pi < \omega \le \pi$; for real signals, conjugate symmetry reduces this to $0 \le \omega \le \pi$. Frequencies near $\omega = 0$ (and near $\pm2\pi, \pm4\pi, \dots$) are **low frequencies**, slowly varying sequences. Frequencies near $\omega = \pm\pi$ are **high frequencies**: the fastest possible sequence is $(-1)^n = e^{j\pi n}$. If the sequence comes from sampling at rate $f_s$, the DT frequency $\omega$ corresponds to the CT frequency $f = \omega f_s/2\pi$, so $\omega = \pi$ is $f_s/2$, half the sampling rate. That correspondence is the subject of [[signals-systems/sampling]].

::: warning Radians per sample, and where the high frequencies are
The DT frequency $\omega$ is in radians per **sample**. It has no meaning in hertz until a sampling rate is given: $\omega = 0.2\pi$ is $1\,\mathrm{kHz}$ at $f_s = 10\,\mathrm{kHz}$ and $4.41\,\mathrm{kHz}$ at $44.1\,\mathrm{kHz}$. And do not read a DT spectrum plotted over $0 \le \omega \le 2\pi$ as "low on the left, high on the right": the right half, $\pi < \omega < 2\pi$, is the same as $-\pi < \omega < 0$, so the highest frequency is in the middle, at $\pi$. Many software tools (and the FFT) present spectra over $[0, 2\pi)$; shift them to $(-\pi, \pi]$ before interpreting.
:::

## Standard transforms {#sec-pairs}

::: example A one-sided exponential sequence {#ex-exp}
Find the DTFT of $x[n] = a^nu[n]$ with $\lvert a\rvert < 1$, and its magnitude at $\omega = 0$ and $\omega = \pi$ for $a = 0.9$ and $a = -0.9$.
::: solution
A geometric series:

$$
X(e^{j\omega}) = \sum_{n=0}^{\infty}(ae^{-j\omega})^n = \frac{1}{1 - ae^{-j\omega}},
$$

convergent because $\lvert ae^{-j\omega}\rvert = \lvert a\rvert < 1$. Its magnitude is $1/\sqrt{1 - 2a\cos\omega + a^2}$. For $a = 0.9$: at $\omega = 0$, $1/(1 - 0.9) = 10$; at $\omega = \pi$, $1/(1 + 0.9) = 0.526$. The sequence $0.9^n$ varies slowly, and its spectrum is concentrated at low frequencies. For $a = -0.9$ the values are swapped: $0.526$ at $\omega = 0$ and $10$ at $\omega = \pi$. The sequence $(-0.9)^n$ alternates in sign, the fastest possible oscillation, and its spectrum sits at high frequencies. (Indeed $(-0.9)^n = (-1)^n0.9^n = e^{j\pi n}0.9^n$, and multiplying by $e^{j\pi n}$ shifts a spectrum by $\pi$.)
:::
:::

::: example A rectangular pulse {#ex-rect}
Find the DTFT of the rectangular pulse $x[n] = 1$ for $\lvert n\rvert \le N_1$ and $0$ otherwise, which has $2N_1 + 1$ samples.
::: solution
Again a geometric series, now finite. With $r = e^{-j\omega}$,

$$
X(e^{j\omega}) = \sum_{n=-N_1}^{N_1}e^{-j\omega n} = e^{j\omega N_1}\,\frac{1 - e^{-j\omega(2N_1 + 1)}}{1 - e^{-j\omega}} .
$$

Factor $e^{-j\omega(2N_1 + 1)/2}$ from the numerator and $e^{-j\omega/2}$ from the denominator; the leftover phase factors cancel against $e^{j\omega N_1}$, leaving

$$
X(e^{j\omega}) = \frac{\sin\big(\omega(N_1 + \frac12)\big)}{\sin(\omega/2)} .
$$

At $\omega = 0$ the limit is $2N_1 + 1$, the number of samples. The first zeros are at $\omega = \pm2\pi/(2N_1 + 1)$; for $N_1 = 2$ (five samples) that is $\pm0.4\pi = \pm1.257\,\mathrm{rad/sample}$. This "periodic sinc" (the **Dirichlet kernel**) is the DT analogue of the sinc spectrum of a CT pulse: longer pulse, narrower main lobe. Unlike the sinc, it is periodic with period $2\pi$ and does not decay at large $\omega$.
:::
:::

Impulses appear as in continuous time, now repeated with period $2\pi$:

| $x[n]$ | $X(e^{j\omega})$ |
|---|---|
| $\delta[n]$ | $1$ |
| $\delta[n - n_0]$ | $e^{-j\omega n_0}$ |
| $a^nu[n]$, $\lvert a\rvert < 1$ | $\dfrac{1}{1 - ae^{-j\omega}}$ |
| $(n + 1)a^nu[n]$, $\lvert a\rvert < 1$ | $\dfrac{1}{(1 - ae^{-j\omega})^2}$ |
| $1$ for $\lvert n\rvert \le N_1$ | $\dfrac{\sin(\omega(N_1 + \frac12))}{\sin(\omega/2)}$ |
| $\dfrac{\sin Wn}{\pi n}$, $0 < W < \pi$ | $1$ for $\lvert\omega\rvert < W$, $0$ for $W < \lvert\omega\rvert \le \pi$ (periodic) |
| $1$ | $2\pi\sum_l\delta(\omega - 2\pi l)$ |
| $e^{j\omega_0n}$ | $2\pi\sum_l\delta(\omega - \omega_0 - 2\pi l)$ |
| $\cos\omega_0n$ | $\pi\sum_l\big[\delta(\omega - \omega_0 - 2\pi l) + \delta(\omega + \omega_0 - 2\pi l)\big]$ |
| $u[n]$ | $\dfrac{1}{1 - e^{-j\omega}} + \pi\sum_l\delta(\omega - 2\pi l)$ |

## Properties {#sec-properties}

::: theorem Properties of the DTFT {#thm-dtft-props}
Let $x[n] \leftrightarrow X(e^{j\omega})$ and $y[n] \leftrightarrow Y(e^{j\omega})$.

1. **Linearity:** $ax + by \leftrightarrow aX + bY$.
2. **Time shift:** $x[n - n_0] \leftrightarrow e^{-j\omega n_0}X(e^{j\omega})$.
3. **Frequency shift:** $e^{j\omega_0n}x[n] \leftrightarrow X(e^{j(\omega - \omega_0)})$; in particular $(-1)^nx[n] \leftrightarrow X(e^{j(\omega - \pi)})$.
4. **Conjugate symmetry:** for real $x$, $X(e^{-j\omega}) = X^*(e^{j\omega})$.
5. **Time reversal:** $x[-n] \leftrightarrow X(e^{-j\omega})$.
6. **Differencing:** $x[n] - x[n-1] \leftrightarrow (1 - e^{-j\omega})X(e^{j\omega})$.
7. **Differentiation in frequency:** $n\,x[n] \leftrightarrow j\,\dfrac{\dd X(e^{j\omega})}{\dd\omega}$.
8. **Convolution:** $x * y \leftrightarrow X(e^{j\omega})\,Y(e^{j\omega})$.
9. **Multiplication:** $x[n]\,y[n] \leftrightarrow \dfrac{1}{2\pi}\displaystyle\int_{2\pi}X(e^{j\theta})\,Y(e^{j(\omega - \theta)})\,\dd\theta$ (a **periodic convolution**).
10. **Parseval's relation:** $\displaystyle\sum_{n=-\infty}^{\infty}\lvert x[n]\rvert^2 = \frac{1}{2\pi}\int_{2\pi}\lvert X(e^{j\omega})\rvert^2\,\dd\omega$.
:::

::: proof
(2) $\sum_nx[n - n_0]e^{-j\omega n} = \sum_mx[m]e^{-j\omega(m + n_0)}$ with $m = n - n_0$. (3) $\sum x[n]e^{-j(\omega - \omega_0)n}$. (4) Conjugate the definition. (5) Substitute $m = -n$. (6) Linearity and (2). (7) Differentiate the definition term by term: $\frac{\dd X}{\dd\omega} = \sum(-jn)x[n]e^{-j\omega n}$, so $j\frac{\dd X}{\dd\omega} = \sum nx[n]e^{-j\omega n}$. (8) As in continuous time: $\sum_n\sum_kx[k]y[n - k]e^{-j\omega n} = \sum_kx[k]e^{-j\omega k}\sum_my[m]e^{-j\omega m}$ with $m = n - k$. (9) Insert the inverse DTFT of $X$ into $\sum x[n]y[n]e^{-j\omega n}$ and swap sum and integral. (10) is (9) evaluated at $\omega = 0$ with $y = x^*$, or the Parseval relation of Fourier series with the roles of time and frequency exchanged.
:::

Two CT properties have no direct counterpart. There is no time scaling: $x[2n]$ throws samples away, and $x[n/2]$ is undefined for odd $n$. The useful substitutes are **upsampling** (insert $L - 1$ zeros between samples), which gives $X(e^{j\omega L})$, compressing the spectrum by $L$ and creating images, and **downsampling**, whose spectrum involves aliasing; both belong to multirate processing in [[dsp]]. And there is no differentiation in time; the first difference (property 6) replaces it, and $1 - e^{-j\omega} \approx j\omega$ for small $\omega$, so the difference acts as a differentiator at low frequencies.

::: quiz
A real sequence has DTFT $X(e^{j\omega})$ with $X(e^{j0.3\pi}) = 2 - j$. What is $X(e^{j1.7\pi})$?
- [ ] $2 - j$
- [x] $2 + j$
- [ ] $-2 + j$
- [ ] It cannot be determined
::: solution
By periodicity $X(e^{j1.7\pi}) = X(e^{-j0.3\pi})$, and by conjugate symmetry of real sequences $X(e^{-j0.3\pi}) = X^*(e^{j0.3\pi}) = 2 + j$. The frequency $1.7\pi$ is really $-0.3\pi$.
:::
:::

## Frequency response of discrete-time systems {#sec-frequency-response}

By the convolution property, a DT LTI system multiplies the DTFT of its input by the **frequency response**

$$
H(e^{j\omega}) = \sum_{n=-\infty}^{\infty}h[n]\,e^{-j\omega n},
$$ {#eq-freq-response}

which is also, by [[signals-systems/convolution#thm-eigen]], the factor by which it multiplies the input $e^{j\omega n}$. In particular a real system with input $\cos(\omega_0n)$ produces $\lvert H(e^{j\omega_0})\rvert\cos(\omega_0n + \angle H(e^{j\omega_0}))$. A stable system (absolutely summable $h$) always has a continuous frequency response.

For systems described by a difference equation we do not need $h$ at all. Taking the DTFT of both sides of $\sum_ka_ky[n - k] = \sum_kb_kx[n - k]$ with the shift property gives $\big(\sum_ka_ke^{-j\omega k}\big)Y = \big(\sum_kb_ke^{-j\omega k}\big)X$, so

$$
H(e^{j\omega}) = \frac{\sum_{k=0}^{M}b_k\,e^{-j\omega k}}{\sum_{k=0}^{N}a_k\,e^{-j\omega k}} .
$$ {#eq-rational}

::: theorem Frequency response of a difference equation {#thm-rational}
A stable causal LTI system described by the difference equation $\sum_{k=0}^{N}a_ky[n - k] = \sum_{k=0}^{M}b_kx[n - k]$ has the frequency response [[#eq-rational]], a ratio of polynomials in $e^{-j\omega}$. Its coefficients can be read directly from the difference equation.
:::

The proof is the computation above; stability is needed so that the DTFTs of $h$ and $y$ exist. (If the system is unstable, [[#eq-rational]] still defines a function, but it is not the frequency response of anything; the $z$-transform sorts this out.)

::: example Frequency response from a difference equation {#ex-rational}
Find the frequency response of the system $y[n] - 0.5y[n-1] = x[n] + x[n-1]$ of [[signals-systems/convolution#ex-difference]], its gain at $\omega = 0$, $\pi/2$ and $\pi$, and describe it.
::: solution
From [[#eq-rational]], $H(e^{j\omega}) = \dfrac{1 + e^{-j\omega}}{1 - 0.5e^{-j\omega}}$.

- $\omega = 0$: $H = 2/0.5 = 4$. (Check: $\sum h[n] = 4$, found in the convolution lesson.)
- $\omega = \pi/2$: $e^{-j\pi/2} = -j$, $H = (1 - j)/(1 + 0.5j)$, $\lvert H\rvert = \sqrt2/\sqrt{1.25} = 1.265$.
- $\omega = \pi$: $e^{-j\pi} = -1$, $H = 0/1.5 = 0$.

The system is a low-pass filter whose gain falls from $4$ at DC to exactly zero at $\omega = \pi$: the factor $1 + e^{-j\omega}$ (a two-point sum) puts a zero at the highest frequency, and the feedback term $0.5y[n-1]$ boosts the low frequencies.
:::
:::

### FIR filters: the moving average

::: example The moving average and its nulls {#ex-moving-average}
Find the frequency response of the $M$-point moving average $h[n] = \frac1M$ for $0 \le n \le M - 1$. A $1\,\mathrm{kHz}$-sampled sensor signal has $50\,\mathrm{Hz}$ hum and its harmonics; choose $M$ to remove all of them, and find the gain at $10\,\mathrm{Hz}$ and $25\,\mathrm{Hz}$.
::: solution
Summing the geometric series as in [[#ex-rect]] (the pulse is now shifted to start at $n = 0$):

$$
H(e^{j\omega}) = \frac1M\sum_{n=0}^{M-1}e^{-j\omega n} = \frac1M\,\frac{1 - e^{-j\omega M}}{1 - e^{-j\omega}} = e^{-j\omega(M-1)/2}\,\frac{\sin(M\omega/2)}{M\sin(\omega/2)} .
$$

The gain is $1$ at $\omega = 0$ and zero at $\omega = 2\pi k/M$, $k = 1, \dots, M - 1$. The phase is $-\omega(M - 1)/2$ (plus jumps of $\pi$ where the real factor changes sign): linear phase, a pure delay of $(M - 1)/2$ samples.

$50\,\mathrm{Hz}$ at $f_s = 1\,\mathrm{kHz}$ is $\omega = 2\pi\cdot50/1000 = 2\pi/20$, so $M = 20$ places nulls at $2\pi k/20$, i.e. at $50k\,\mathrm{Hz}$ for $k = 1, \dots, 19$: the hum and all its harmonics up to $950\,\mathrm{Hz}$ (and, by periodicity, beyond). At $10\,\mathrm{Hz}$, $\omega = 0.02\pi$ and $\lvert H\rvert = \lvert\sin(0.2\pi)/(20\sin(0.01\pi))\rvert = 0.936$ ($-0.58\,\mathrm{dB}$); at $25\,\mathrm{Hz}$, $\lvert H\rvert = 0.637$ ($-3.9\,\mathrm{dB}$). The delay is $9.5$ samples, $9.5\,\mathrm{ms}$. The moving average is a crude low-pass filter (its sidelobes are high) but an excellent comb for a known periodic interference.
:::
:::

::: widget plot
f: abs(sin(M*x/2)/(M*sin(x/2)))
x: -3pi, 3pi
y: 0, 1.1
sliders: M=5:2:30:1
piticks: true
labels: \lvert H(e^{j\omega})\rvert
caption: Magnitude response of the $M$-point moving average over three periods of $\omega$. The response repeats every $2\pi$, so only $-\pi < \omega \le \pi$ is new information. Increase $M$: the main lobe narrows (a longer average is a sharper low-pass filter) and the nulls at $2\pi k/M$ move closer together. The sidelobes stay at about $-13\,\mathrm{dB}$ whatever $M$ is.
:::

The moving average illustrates a general fact.

::: proposition Symmetric FIR filters have linear phase {#prop-linear-phase}
If a real FIR impulse response of length $M$ is symmetric, $h[n] = h[M - 1 - n]$ for $0 \le n \le M - 1$, then

$$
H(e^{j\omega}) = e^{-j\omega(M-1)/2}A(\omega)
$$

with $A(\omega)$ real. The phase is linear (apart from jumps of $\pi$ where $A$ changes sign) and the group delay is $(M - 1)/2$ samples at every frequency.
:::

::: proof
Let $c = (M - 1)/2$ and factor out $e^{-j\omega c}$: $H(e^{j\omega}) = e^{-j\omega c}\sum_nh[n]e^{-j\omega(n - c)}$. Pair the term $n$ with the term $M - 1 - n$, for which $n - c$ is replaced by $c - n$ and, by symmetry, $h$ is the same. Each pair contributes $h[n]\big(e^{-j\omega(n - c)} + e^{j\omega(n - c)}\big) = 2h[n]\cos(\omega(n - c))$, which is real. (If $M$ is odd, the middle term $n = c$ is $h[c]$, also real.) So $A(\omega) = \sum_nh[n]\cos(\omega(n - c))$ is real.
:::

Exact linear phase is impossible for a stable, causal IIR filter with a rational response, and it is one of the main reasons FIR filters are used in audio, imaging and data communications, where waveform shape matters. Antisymmetric impulse responses, $h[n] = -h[M - 1 - n]$, give $A(\omega)$ purely imaginary instead, a linear phase plus $90^\circ$, which is what differentiators and Hilbert transformers need.

### IIR filters: the exponential smoother

::: example Designing a first-order smoother {#ex-smoother}
The **exponential smoother** $y[n] = a\,y[n-1] + (1 - a)\,x[n]$ with $0 < a < 1$ is the DT analogue of an RC filter. Find its frequency response, show that it has unit gain at DC, and choose $a$ so that its $3\,\mathrm{dB}$ cut-off is $10\,\mathrm{Hz}$ at a sampling rate of $1\,\mathrm{kHz}$.
::: solution
By [[#eq-rational]], $H(e^{j\omega}) = \dfrac{1 - a}{1 - ae^{-j\omega}}$, with $H(e^{j0}) = 1$ and

$$
\lvert H(e^{j\omega})\rvert^2 = \frac{(1 - a)^2}{1 - 2a\cos\omega + a^2} .
$$

The cut-off frequency is $\omega_c = 2\pi\cdot10/1000 = 0.0628\,\mathrm{rad/sample}$; write $c = \cos\omega_c = 0.99803$. Setting $\lvert H\rvert^2 = \frac12$ gives $2(1 - a)^2 = 1 - 2ac + a^2$, i.e.

$$
a^2 - (4 - 2c)\,a + 1 = 0,\qquad a = (2 - c) - \sqrt{(2 - c)^2 - 1} = 0.9391,
$$

taking the root inside $(0, 1)$. A quick approximation for small $\omega_c$ is $a \approx e^{-\omega_c} = 0.9391$, the value obtained by sampling the RC impulse response $e^{-t/\tau}$ with $\tau = 1/(2\pi\cdot10\,\mathrm{Hz})$. In fixed-point code one would choose $a = 1 - 2^{-4} = 0.9375$ so that the multiplication becomes a shift, moving the cut-off to about $10.3\,\mathrm{Hz}$.
:::
:::

::: widget plot
f: (1 - a)/sqrt(1 - 2*a*cos(x) + a^2); abs(sin(5*x/2)/(5*sin(x/2)))
x: -pi, pi
y: 0, 1.1
sliders: a=0.8:-0.95:0.98:0.01
piticks: true
labels: \text{smoother } (1-a)/(1-ae^{-j\omega}); \text{5-point average}
caption: The exponential smoother (blue) compared with a five-point moving average (orange). For $a$ close to $1$ the smoother is a narrow low-pass filter with no nulls and a smooth roll-off. Make $a$ negative: the same structure becomes a high-pass filter whose passband is centred on $\omega = \pi$, because the pole has moved to the other side of the unit circle.
:::

### The ideal low-pass filter and its approximations

The **ideal DT low-pass filter** with cut-off $\omega_c$ has $H = 1$ for $\lvert\omega\rvert < \omega_c$ and $0$ for $\omega_c < \lvert\omega\rvert \le \pi$. Its impulse response, by the inverse DTFT, is

$$
h[n] = \frac{1}{2\pi}\int_{-\omega_c}^{\omega_c}e^{j\omega n}\,\dd\omega = \frac{\sin\omega_cn}{\pi n},
$$ {#eq-ideal-lp}

infinitely long in both directions and so neither causal nor FIR. The simplest practical design truncates it to $\lvert n\rvert \le L$ and delays it by $L$ samples. By the multiplication property, truncation (multiplying by a rectangular window) convolves the ideal response with the Dirichlet kernel of [[#ex-rect]], producing a transition band and Gibbs ripple of about $9\%$ near the edge, whatever $L$ is. Tapered windows (Hann, Hamming, Kaiser) trade a wider transition for much smaller ripple; the design methods are in [[dsp]].

::: example How long must a truncated filter be? {#ex-transition}
A rough rule for a truncated (rectangular-window) low-pass filter of length $2L + 1$ is that its transition band has width about $\Delta\omega \approx 2\pi/(2L + 1)$, the width of the main lobe of the Dirichlet kernel divided by two. Audio at $48\,\mathrm{kHz}$ is to be low-pass filtered at $4\,\mathrm{kHz}$ with a transition band of $500\,\mathrm{Hz}$. Estimate the filter length and its delay.
::: solution
$\Delta\omega = 2\pi\cdot500/48000 = 0.0654\,\mathrm{rad/sample}$. Then $2L + 1 \approx 2\pi/0.0654 = 96$, so about $97$ taps ($L = 48$). The delay is $L = 48$ samples, $1.0\,\mathrm{ms}$. Each output sample costs about $97$ multiply–adds, about $4.7$ million per second. A sharper transition costs proportionally more taps: the frequency resolution of a filter is limited by its length, the DT form of the time–bandwidth trade-off. (A Kaiser-window or equiripple design with low ripple needs a few times more taps for the same transition.)
:::
:::

::: quiz
A causal FIR filter has impulse response $h = \{\underline{1}, 3, 3, 1\}$. What is its group delay?
- [ ] $1$ sample
- [x] $1.5$ samples
- [ ] $2$ samples
- [ ] It depends on frequency
::: solution
The impulse response is symmetric about $n = 1.5$, so $H(e^{j\omega}) = e^{-j1.5\omega}A(\omega)$ with $A$ real: linear phase with group delay $(M - 1)/2 = 1.5$ samples at all frequencies (apart from the jumps of $\pi$ where $A$ changes sign, here only at $\omega = \pi$, where $H = 0$). In fact $H = (1 + e^{-j\omega})^3$.
:::
:::

### The spectrum of a finite record

In practice we never have a whole sequence, only $N$ samples of it. Observing $x[n]$ for $0 \le n \le N - 1$ is the same as multiplying it by the rectangular window $w[n] = 1$ on that range, so by the multiplication property the spectrum we can compute is the periodic convolution of $X(e^{j\omega})$ with the window's Dirichlet kernel $W(e^{j\omega})$, whose main lobe has half-width $2\pi/N$. A single tone $\cos(\omega_0n)$, whose true spectrum is a pair of impulses, appears instead as two copies of $W$ centred on $\pm\omega_0$: the energy has **leaked** into neighbouring frequencies. Two tones closer together than about the main-lobe half-width merge into one peak.

::: example Resolving two tones {#ex-resolution}
A signal sampled at $f_s = 8\,\mathrm{kHz}$ contains tones at $1000\,\mathrm{Hz}$ and $1050\,\mathrm{Hz}$. Roughly how many samples must be analysed to see them as two separate peaks with a rectangular window, and how long a recording is that?
::: solution
The tones are $\Delta\omega = 2\pi\cdot50/8000 = 0.0393\,\mathrm{rad/sample}$ apart. Requiring the main-lobe half-width $2\pi/N$ to be no larger than $\Delta\omega$ gives $N \ge 2\pi/\Delta\omega = 8000/50 = 160$ samples, a $20\,\mathrm{ms}$ record. In hertz the rule is simply $T \gtrsim 1/\Delta f$: to separate frequencies $\Delta f$ apart you must observe for about $1/\Delta f$ seconds, regardless of the sampling rate. A tapered window, which lowers the sidelobes so that a weak tone is not hidden by a strong neighbour, widens the main lobe and needs a longer record, typically by a factor of $1.5$ to $2$.
:::
:::

::: application Digital audio equalisers
A graphic equaliser is a bank of second-order IIR sections ("biquads"), each of the form $y[n] = b_0x[n] + b_1x[n-1] + b_2x[n-2] - a_1y[n-1] - a_2y[n-2]$, tuned to a centre frequency and gain. Its overall frequency response is the product of the sections' responses, [[#eq-rational]] for each, so in decibels the bands add. Each section needs five multiplications per sample; a ten-band stereo equaliser at $48\,\mathrm{kHz}$ needs $4.8$ million multiplications per second, trivial for a modern processor but the reason early digital audio hardware used dedicated DSP chips.
:::

## Where this leads

[[signals-systems/sampling]] connects the DTFT to the CT Fourier transform: the DTFT of the samples of $x_c(t)$ is a periodic repetition of $X_c(j\Omega)$, and that repetition is aliasing. The $z$-transform of [[signals-systems/z-transform]] extends the DTFT off the unit circle, which is needed for unstable systems and gives the pole–zero picture that explains why the exponential smoother turns into a high-pass filter when $a < 0$. Sampling the DTFT at $N$ equally spaced frequencies gives the discrete Fourier transform, computed by the FFT, the workhorse of [[dsp]].

::: history
The DTFT is, mathematically, a Fourier series with the roles of time and frequency reversed, so its theory was in place long before anyone sampled a signal. It became an engineering tool with digital computation: Bernard Gold and Charles Rader's *Digital Processing of Signals* (1969) was among the first books on digital filters. Window-based FIR design was developed by James Kaiser at Bell Labs in the 1960s and 1970s (his Bessel-function window appeared in 1974), and Thomas Parks and James McClellan published their optimal equiripple FIR design algorithm in 1972.
:::

::: summary
- $X(e^{j\omega}) = \sum x[n]e^{-j\omega n}$ is periodic in $\omega$ with period $2\pi$; the inverse integrates over one period. $\omega$ is in radians per sample.
- Low frequencies are near $\omega = 0$, the highest at $\omega = \pm\pi$, which corresponds to half the sampling rate.
- $a^nu[n] \leftrightarrow 1/(1 - ae^{-j\omega})$; a rectangular pulse gives the periodic sinc (Dirichlet kernel); $e^{j\omega_0n}$ gives impulses repeated every $2\pi$.
- Shift, modulation, convolution and Parseval work as in continuous time; multiplication gives periodic convolution; there is no time scaling.
- A difference equation gives $H(e^{j\omega}) = \sum b_ke^{-j\omega k}/\sum a_ke^{-j\omega k}$, read straight off the coefficients.
- The moving average has linear phase and nulls at $2\pi k/M$; symmetric FIR filters always have linear phase. The exponential smoother is the DT RC filter.
- Ideal filters are infinitely long; truncation causes Gibbs ripple and a transition band whose width is inversely proportional to filter length.
:::

## Exercises

::: exercise Gain of a two-point average {level=1 check="sqrt(2)/2"}
Find the magnitude of the frequency response of $y[n] = \frac12(x[n] + x[n-1])$ at $\omega = \pi/2$.
::: solution
$H(e^{j\omega}) = \frac12(1 + e^{-j\omega}) = e^{-j\omega/2}\cos(\omega/2)$, so $\lvert H(e^{j\pi/2})\rvert = \cos(\pi/4) = 0.707$, the $3\,\mathrm{dB}$ point.
:::
:::

::: exercise DTFT of a short sequence {level=1}
Find the DTFT of $x[n] = \{\underline{2}, 0, -2\}$ (i.e. $x[0] = 2$, $x[2] = -2$) and its magnitude.
::: solution
$X(e^{j\omega}) = 2 - 2e^{-j2\omega} = 2e^{-j\omega}(e^{j\omega} - e^{-j\omega}) = 4j\,e^{-j\omega}\sin\omega$. Magnitude $4\lvert\sin\omega\rvert$: zero at DC and at $\pi$, maximum $4$ at $\omega = \pm\pi/2$, a band-pass shape.
:::
:::

::: exercise Converting frequencies {level=1 check="0.25*pi"}
A $6\,\mathrm{kHz}$ tone is sampled at $48\,\mathrm{kHz}$. What is its DT frequency in radians per sample?
::: solution
$\omega = 2\pi f/f_s = 2\pi\cdot6/48 = \pi/4 \approx 0.785\,\mathrm{rad/sample}$.
:::
:::

::: exercise Response to a sinusoid {level=2}
The input $x[n] = 3\cos(\pi n/3)$ is applied to the exponential smoother with $a = 0.5$. Find the steady-state output.
::: solution
$H(e^{j\pi/3}) = \frac{0.5}{1 - 0.5e^{-j\pi/3}}$. With $e^{-j\pi/3} = 0.5 - 0.866j$: denominator $1 - 0.25 + 0.433j = 0.75 + 0.433j$, magnitude $0.866$, angle $30^\circ$. So $\lvert H\rvert = 0.5/0.866 = 0.577$ and $\angle H = -30^\circ$. Output: $y[n] = 1.73\cos(\pi n/3 - \pi/6)$.
:::
:::

::: exercise Energy by Parseval {level=2 check="1/(1 - 0.36)"}
Use Parseval's relation to evaluate $\displaystyle\frac{1}{2\pi}\int_{-\pi}^{\pi}\frac{\dd\omega}{1.36 - 1.2\cos\omega}$.
::: hint
$1 - 2a\cos\omega + a^2$ with $a = 0.6$.
:::
::: solution
$1.36 - 1.2\cos\omega = \lvert1 - 0.6e^{-j\omega}\rvert^2$, so the integrand is $\lvert X\rvert^2$ for $x[n] = 0.6^nu[n]$. By Parseval the integral equals $\sum0.36^n = 1/(1 - 0.36) = 1.5625$.
:::
:::

::: exercise A high-pass filter by modulation {level=2}
Starting from the five-point moving average $h[n] = \frac15$ for $0 \le n \le 4$, construct $g[n] = (-1)^nh[n]$. Find $G(e^{j\omega})$ in terms of $H$ and describe the filter. What are its gains at $\omega = 0$ and $\pi$?
::: solution
By the frequency shift property, $G(e^{j\omega}) = H(e^{j(\omega - \pi)})$: the low-pass response shifted by $\pi$, a high-pass filter. Its gain at $\omega = \pi$ is $H(e^{j0}) = 1$, and at $\omega = 0$ it is $\lvert H(e^{-j\pi})\rvert = \lvert\sin(5\pi/2)/(5\sin(\pi/2))\rvert = 0.2$. The coefficients are $\{0.2, -0.2, 0.2, -0.2, 0.2\}$, which sum to $0.2$, confirming the DC gain.
:::
:::

::: exercise A notch filter {level=2}
Design an FIR filter $h = \{\underline{1}, b, 1\}$ that completely rejects the DT frequency $\omega_0 = \pi/3$. Find $b$ and the DC gain. Where else is the response zero?
::: solution
$H(e^{j\omega}) = 1 + be^{-j\omega} + e^{-j2\omega} = e^{-j\omega}(2\cos\omega + b)$. Zero at $\omega_0$ requires $b = -2\cos(\pi/3) = -1$. Then $H = e^{-j\omega}(2\cos\omega - 1)$, with DC gain $1$, and zeros at $\omega = \pm\pi/3$ only (in $(-\pi, \pi]$). At $f_s = 300\,\mathrm{Hz}$ this would notch out $50\,\mathrm{Hz}$ hum, but the response at $\pi$ is $\lvert2\cos\pi - 1\rvert = 3$: a three-tap notch is far from flat elsewhere.
:::
:::

::: exercise The ideal differentiator {level=3}
The ideal DT differentiator has $H(e^{j\omega}) = j\omega$ for $-\pi < \omega \le \pi$ (extended periodically). Show that its impulse response is $h[n] = \dfrac{\cos(\pi n)}{n}$ for $n \ne 0$ and $h[0] = 0$. Compare its frequency response at low frequencies with that of the first difference, and explain why the first difference is used in practice.
::: hint
Integrate $\frac{1}{2\pi}\int_{-\pi}^{\pi}j\omega e^{j\omega n}\,\dd\omega$ by parts.
:::
::: solution
For $n = 0$ the integrand $j\omega$ is odd, so $h[0] = 0$. For $n \ne 0$, by parts, $\int_{-\pi}^{\pi}\omega e^{j\omega n}\,\dd\omega = \Big[\frac{\omega e^{j\omega n}}{jn}\Big]_{-\pi}^{\pi} - \int_{-\pi}^{\pi}\frac{e^{j\omega n}}{jn}\,\dd\omega = \frac{2\pi\cos(\pi n)}{jn} - 0$. Multiplying by $\frac{j}{2\pi}$: $h[n] = \cos(\pi n)/n = (-1)^n/n$. It is infinitely long, non-causal and decays only as $1/n$ (not absolutely summable). The first difference has $1 - e^{-j\omega} = 2je^{-j\omega/2}\sin(\omega/2) \approx j\omega$ for small $\omega$, with a half-sample delay: it matches the ideal differentiator at low frequencies with just two taps, and its error at high frequencies, where $2\sin(\omega/2) < \omega$, rarely matters for oversampled signals.
:::
:::

::: exercise Smoother versus moving average {level=3}
Compare the exponential smoother with $a = 0.9$ and the moving average with $M = 19$, which have the same "memory" in the sense that $\sum_nn\,h[n]/\sum_nh[n]$, the mean delay, is $9$ samples for both. Verify that claim, and compare their gains at $\omega = 2\pi/19$ and at $\omega = \pi$.
::: hint
For $h[n] = (1 - a)a^nu[n]$, use property 7 or the sum $\sum na^n = a/(1 - a)^2$.
:::
::: solution
Smoother: $\sum h = 1$, $\sum nh[n] = (1 - a)\cdot a/(1 - a)^2 = a/(1 - a) = 9$. Moving average: mean delay $(M - 1)/2 = 9$. At $\omega = 2\pi/19 = 0.331$: the moving average has a null, $\lvert H\rvert = 0$; the smoother has $\lvert H\rvert = 0.1/\sqrt{1 - 1.8\cos0.331 + 0.81} = 0.1/\sqrt{0.1075} = 0.305$. At $\omega = \pi$: the smoother gives $0.1/1.9 = 0.053$, the moving average $\lvert\sin(19\pi/2)/(19\sin(\pi/2))\rvert = 1/19 = 0.053$, essentially the same. The moving average has nulls but high sidelobes between them (about $0.22$ near $\omega = 3\pi/19$); the smoother has a monotonic response. Which is better depends on whether the interference is at known frequencies (moving average) or spread out (smoother, or a properly designed filter).
:::
:::
