An audio interface records at $96\,\mathrm{kHz}$ and must deliver $48\,\mathrm{kHz}$ files. Before it throws away every second sample it must remove everything above $24\,\mathrm{kHz}$, while leaving the band up to $20\,\mathrm{kHz}$ untouched to within a few hundredths of a decibel, and it must not smear transients by delaying some frequencies more than others. That job is done by a **finite impulse response (FIR) filter** with exactly linear phase: a symmetric list of perhaps a hundred coefficients. Choosing those coefficients to meet a specification with as few taps as possible is **FIR filter design**, and it is the subject of this chapter.

FIR filters were introduced as computations in [[dsp/discrete-time-systems]]. Their attractions are that they are always stable, that they can have exactly linear phase, and that they are easy to implement in fixed point. Their drawback is length: a sharp filter may need hundreds of taps where an IIR filter ([[dsp/iir-filter-design]]) needs ten coefficients. We first make the specification precise, then classify linear-phase filters, and then develop three design methods: the **window method**, including Kaiser's design formulas; **frequency sampling**, which uses the DFT of [[dsp/discrete-fourier-transform]]; and **optimal equiripple** design by the Parks–McClellan algorithm.

## Specifications {#sec-spec}

An ideal low-pass filter, with gain $1$ up to a cut-off and $0$ beyond, has an infinitely long, non-causal impulse response ([[signals-systems/discrete-time-fourier]]). Real filters are specified by a tolerance scheme.

::: definition Tolerance scheme of a low-pass filter {#def-tolerance}
A low-pass specification consists of a **passband edge** $\omega_p$, a **stopband edge** $\omega_s > \omega_p$, a **passband ripple** $\delta_p$ and a **stopband ripple** $\delta_s$, and requires

$$
1 - \delta_p \le \lvert H(e^{j\omega})\rvert \le 1 + \delta_p\quad (0 \le \omega \le \omega_p),\qquad \lvert H(e^{j\omega})\rvert \le \delta_s\quad (\omega_s \le \omega \le \pi).
$$ {#eq-tolerance}

The interval $\omega_p < \omega < \omega_s$ is the **transition band**, of width $\Delta\omega = \omega_s - \omega_p$, on which nothing is required. In decibels, the **peak passband ripple** is $A_p = 20\log_{10}\frac{1 + \delta_p}{1 - \delta_p}$ and the **minimum stopband attenuation** is $A_s = -20\log_{10}\delta_s$.
:::

For example, $\delta_p = 0.01$ gives $A_p = 0.17\,\mathrm{dB}$ and $\delta_s = 0.001$ gives $A_s = 60\,\mathrm{dB}$. The difficulty of a specification is governed mainly by two numbers: the ripples (in decibels) and the transition width relative to the sampling rate. The length of an FIR filter is, to a good approximation, proportional to the attenuation in decibels and inversely proportional to $\Delta\omega$, as each design method will confirm.

## Linear-phase FIR filters {#sec-linear-phase}

From [[dsp/discrete-time-systems#thm-group-delay]], a filter with $H(e^{j\omega}) = A(\omega)e^{-j\omega M/2}$, $A$ real, delays every frequency by the same $M/2$ samples and so preserves waveform shape. An FIR filter of order $M$ (length $M + 1$) has this property when its coefficients are symmetric or antisymmetric about $n = M/2$.

::: theorem The four types of linear-phase FIR filter {#thm-types}
Let $h[n]$, $0 \le n \le M$, be real with $h[n] = \pm h[M - n]$. Then $H(e^{j\omega}) = e^{-j\omega M/2}\,j^{\,\epsilon}A(\omega)$ with $A$ real, $\epsilon = 0$ for symmetric and $\epsilon = 1$ for antisymmetric $h$, and:

| type | symmetry | $M$ | $A(\omega)$ | forced zeros |
|---|---|---|---|---|
| I | symmetric | even | $\sum_n h[n]\cos(\omega(n - M/2))$ | none |
| II | symmetric | odd | $\sum_n h[n]\cos(\omega(n - M/2))$ | $\omega = \pi$ ($z = -1$) |
| III | antisymmetric | even | $-\sum_n h[n]\sin(\omega(n - M/2))$ | $\omega = 0$ and $\omega = \pi$ |
| IV | antisymmetric | odd | $-\sum_n h[n]\sin(\omega(n - M/2))$ | $\omega = 0$ ($z = 1$) |

Moreover the zeros of $H(z)$ occur in groups: if $z_0$ is a zero, so are $1/z_0$, $z_0^*$ and $1/z_0^*$.
:::

::: proof
Factor out $e^{-j\omega M/2}$ and pair the terms $n$ and $M - n$, for which $n - M/2$ changes sign. For symmetric $h$ the pair gives $h[n](e^{-j\omega(n - M/2)} + e^{j\omega(n - M/2)}) = 2h[n]\cos(\omega(n - M/2))$, real; for antisymmetric $h$ it gives $-2jh[n]\sin(\omega(n - M/2))$, which is $j$ times a real number. (For even $M$ the middle term is $h[M/2]$, which must vanish if $h$ is antisymmetric.) This gives the formula for $A$.

The forced zeros follow by evaluating at $\omega = 0$ or $\pi$. For type II, $M$ odd, each $n - M/2$ is an odd multiple of $\tfrac12$, so $\cos(\pi(n - M/2)) = 0$ for every term and $A(\pi) = 0$. For types III and IV, $\sin(0) = 0$ gives $A(0) = 0$; for type III, $n - M/2$ is an integer, so $\sin(\pi(n - M/2)) = 0$ and also $A(\pi) = 0$.

For the zero pattern: the symmetry $h[n] = \pm h[M - n]$ is equivalent to $H(z) = \pm z^{-M}H(z^{-1})$. If $H(z_0) = 0$ then $H(1/z_0) = \pm z_0^{-M}H(z_0) = 0$; and since $h$ is real, zeros also come in conjugate pairs.
:::

The table is a design rule. A **high-pass** or **band-stop** filter needs gain at $\omega = \pi$, so it cannot be type II or III; a **differentiator** or **Hilbert transformer** needs the factor $j$ and a zero at DC, so it is type III or IV. The reciprocal zero pairs explain why linear-phase FIR filters are never minimum-phase (unless all zeros lie on the unit circle): every zero inside the circle has a partner outside.

::: quiz
A designer needs a linear-phase high-pass FIR filter with $40$ taps. What is wrong?
- [ ] Nothing: any symmetric filter will do
- [x] $40$ taps means odd order $M = 39$; a symmetric filter is then type II with a forced zero at $\omega = \pi$, and an antisymmetric one (type IV) has a forced zero at DC — fine for high-pass, but it adds a $90^\circ$ phase shift
- [ ] FIR filters cannot be high-pass
- [ ] Linear-phase filters must have an odd number of taps
::: solution
With an even number of taps the order is odd. A symmetric (type II) filter has $H(-1) = 0$, which kills the passband of a high-pass filter. A type IV filter is possible but has the extra factor $j$, which is usually unwanted in a frequency-selective filter. The standard fix is to use $41$ taps, type I.
:::
:::

## The window method {#sec-window}

The simplest design starts from the ideal response and makes it finite. The ideal low-pass filter with cut-off $\omega_c$, delayed by $M/2$ samples so that it is centred on the middle of a length-$(M+1)$ filter, has

$$
h_d[n] = \frac{\sin\big(\omega_c(n - M/2)\big)}{\pi(n - M/2)}\qquad (h_d[M/2] = \omega_c/\pi \text{ if } M \text{ is even}).
$$ {#eq-ideal-lp}

Other ideal responses follow from it: a high-pass filter is $\delta[n - M/2] - h_d[n]$ (for even $M$), and a band-pass filter is the difference of two low-pass filters.

::: definition Window design {#def-window-design}
The **window method** designs the FIR filter $h[n] = h_d[n]\,w[n]$, $0 \le n \le M$, where $h_d$ is the delayed ideal impulse response and $w[n]$ is a **window**, a symmetric sequence that is zero outside $0 \le n \le M$.
:::

By the multiplication property of the DTFT, the resulting frequency response is the periodic convolution

$$
H(e^{j\omega}) = \frac{1}{2\pi}\int_{-\pi}^{\pi}H_d(e^{j\theta})\,W(e^{j(\omega - \theta)})\,\dd\theta .
$$ {#eq-window-conv}

Convolving the ideal brick wall with $W$ has two effects, and the shape of the window controls both. The **main lobe** of $W$ smears the discontinuity into a transition band of width roughly equal to the main-lobe width; the **sidelobes** of $W$ slide across the edge as $\omega$ moves, producing ripples on both sides of it. Since the passband and stopband ripples are produced by the same sidelobes, the window method gives $\delta_p \approx \delta_s$. The rectangular window (plain truncation) has the narrowest main lobe but high sidelobes, giving the Gibbs overshoot of about $9\%$ whatever $M$ is. Tapered windows reduce the sidelobes at the cost of a wider main lobe.

The standard windows, for $0 \le n \le M$, are

$$
\begin{aligned}
\text{Hann:}\quad& w[n] = 0.5 - 0.5\cos(2\pi n/M),\\
\text{Hamming:}\quad& w[n] = 0.54 - 0.46\cos(2\pi n/M),\\
\text{Blackman:}\quad& w[n] = 0.42 - 0.5\cos(2\pi n/M) + 0.08\cos(4\pi n/M).
\end{aligned}
$$

Their properties, measured on windows of order $M = 50$ and $100$ and on low-pass filters designed with them, are:

| window | main-lobe width | peak sidelobe | filter $A_s$ | transition width $\Delta\omega$ |
|---|---|---|---|---|
| rectangular | $4\pi/(M+1)$ | $-13\,\mathrm{dB}$ | $21\,\mathrm{dB}$ | $1.8\pi/M$ |
| Hann | $8\pi/M$ | $-31\,\mathrm{dB}$ | $44\,\mathrm{dB}$ | $6.2\pi/M$ |
| Hamming | $8\pi/M$ | $-43\,\mathrm{dB}$ | $53\,\mathrm{dB}$ | $6.6\pi/M$ |
| Blackman | $12\pi/M$ | $-58\,\mathrm{dB}$ | $74\,\mathrm{dB}$ | $11\pi/M$ |

Two features stand out. The attenuation of the filter depends only on the window shape, not on $M$: a longer filter has a narrower transition but the same ripple. And the filter's attenuation is better than the window's sidelobe level, because the ripple is the *integral* of the sidelobes over the passband.

::: widget plot
f: 20*log10(abs(sum((w/pi)*sinc(w*(k - L))*cos(x*(k - L)), k, 0, 2*L)) + 1e-6); 20*log10(abs(sum((w/pi)*sinc(w*(k - L))*(0.54 - 0.46*cos(pi*k/L))*cos(x*(k - L)), k, 0, 2*L)) + 1e-6)
x: 0, pi
y: -100, 5
sliders: L=20:5:60:1; w=1.571:0.3:2.8:0.01
piticks: true
labels: \text{rectangular}; \text{Hamming}
caption: Magnitude in decibels of a window-designed low-pass filter of order $M = 2L$ with cut-off $\omega_c = w$, using the rectangular window (blue) and the Hamming window (orange). Increase $L$: the transition bands narrow in proportion to $1/L$, but the highest stopband ripple stays near $-21\,\mathrm{dB}$ for the rectangular window and $-53\,\mathrm{dB}$ for the Hamming window. Filter length buys sharpness; window shape buys attenuation.
:::

::: example An eleven-tap Hamming low-pass filter {#ex-hamming11}
Design an $11$-tap ($M = 10$) low-pass filter with cut-off $\omega_c = \pi/4$ using the Hamming window. List the coefficients, find the DC gain and normalise it.
::: solution
With $M/2 = 5$ and $\omega_c/\pi = 0.25$, [[#eq-ideal-lp]] gives $h_d[5] = 0.25$, $h_d[5 \pm 1] = \sin(\pi/4)/\pi = 0.22508$, $h_d[5 \pm 2] = 1/(2\pi) = 0.15915$, $h_d[5 \pm 3] = 0.07503$, $h_d[5 \pm 4] = 0$, $h_d[5 \pm 5] = -0.04502$. The Hamming window has $w[5] = 1$, $w[4] = w[6] = 0.912$, $w[3] = w[7] = 0.682$, $w[2] = w[8] = 0.398$, $w[1] = w[9] = 0.168$, $w[0] = w[10] = 0.08$. Multiplying,

$$
h = \{-0.0036,\ 0,\ 0.0299,\ 0.1086,\ 0.2053,\ 0.25,\ 0.2053,\ 0.1086,\ 0.0299,\ 0,\ -0.0036\}.
$$

The DC gain is $\sum h[n] = 0.930$ ($-0.63\,\mathrm{dB}$): with so few taps, the windowed sinc does not integrate to $1$. Dividing every coefficient by $0.930$ fixes it. Before normalisation, the magnitude at $\omega = \pi/4$ is $0.503$ ($-6\,\mathrm{dB}$, as expected at the cut-off of a window design, where the response passes halfway), $-29.7\,\mathrm{dB}$ at $\pi/2$ and about $-48$ to $-50\,\mathrm{dB}$ near $\pi$. The transition width $6.6\pi/10 = 0.66\pi$ is very wide; this is a sketch of a filter, not a sharp one.
:::
:::

### The Kaiser window

The fixed windows offer only a few attenuation levels. James Kaiser's window has a shape parameter $\beta$ that trades main-lobe width against sidelobe level continuously,

$$
w[n] = \frac{I_0\Big(\beta\sqrt{1 - \big((n - M/2)/(M/2)\big)^2}\Big)}{I_0(\beta)},\qquad 0 \le n \le M,
$$ {#eq-kaiser}

where $I_0$ is the zeroth-order modified Bessel function of the first kind, $I_0(x) = \sum_{k\ge0}\big((x/2)^k/k!\big)^2$. With $\beta = 0$ it is the rectangular window; with $\beta \approx 5$ it resembles the Hamming window. Kaiser found empirical formulas that give $\beta$ and $M$ directly from the specification.

::: algorithm Kaiser window design {#alg-kaiser}
Given $\omega_p$, $\omega_s$ and $\delta = \min(\delta_p, \delta_s)$:

1. $A = -20\log_{10}\delta$ and $\Delta\omega = \omega_s - \omega_p$.
2. $\beta = 0.1102(A - 8.7)$ for $A > 50$; $\beta = 0.5842(A - 21)^{0.4} + 0.07886(A - 21)$ for $21 \le A \le 50$; $\beta = 0$ for $A < 21$.
3. $M = \left\lceil\dfrac{A - 8}{2.285\,\Delta\omega}\right\rceil$.
4. $h[n] = h_d[n]\,w[n]$ with $\omega_c = (\omega_p + \omega_s)/2$ and $w$ from [[#eq-kaiser]].
5. Check the response; if the specification is missed, increase $M$ (or $A$) slightly and repeat.
:::

::: example A Kaiser design {#ex-kaiser}
Design a low-pass filter with $\omega_p = 0.4\pi$, $\omega_s = 0.6\pi$ and $\delta_p = \delta_s = 0.001$. Compare its length with Hamming and Blackman designs.
::: solution
$A = 60\,\mathrm{dB}$ and $\Delta\omega = 0.2\pi$. Then $\beta = 0.1102(60 - 8.7) = 5.653$ and $M = \lceil52/(2.285\times0.2\pi)\rceil = \lceil36.2\rceil = 37$, with $\omega_c = 0.5\pi$. The standard-library program below carries out [[#alg-kaiser]] and measures the peak errors in the passband and stopband.

```python
import math

def i0(x):
    """Modified Bessel function I0 by its power series."""
    s = term = 1.0
    k = 0
    while term > 1e-12 * s:
        k += 1
        term *= (x / (2 * k)) ** 2
        s += term
    return s

def kaiser_lowpass(wp, ws, A, M=None):
    """Kaiser-window low-pass: edges in rad/sample, attenuation A in dB."""
    if A > 50:
        beta = 0.1102 * (A - 8.7)
    elif A >= 21:
        beta = 0.5842 * (A - 21) ** 0.4 + 0.07886 * (A - 21)
    else:
        beta = 0.0
    if M is None:                                     # filter order
        M = math.ceil((A - 8) / (2.285 * (ws - wp)))
    wc, a = (wp + ws) / 2, M / 2
    h = []
    for n in range(M + 1):
        ideal = wc / math.pi if n == a else math.sin(wc * (n - a)) / (math.pi * (n - a))
        h.append(ideal * i0(beta * math.sqrt(1 - ((n - a) / a) ** 2)) / i0(beta))
    return h, beta

def amplitude(h, w):
    a = (len(h) - 1) / 2
    return sum(hn * math.cos(w * (n - a)) for n, hn in enumerate(h))

def peak_errors(h, wp, ws, K=2000):
    dp = max(abs(amplitude(h, wp * i / K) - 1) for i in range(K + 1))
    ds = max(abs(amplitude(h, ws + (math.pi - ws) * i / K)) for i in range(K + 1))
    return dp, ds

for A, M in ((60, None), (61, None), (61, 38)):
    h, beta = kaiser_lowpass(0.4 * math.pi, 0.6 * math.pi, A, M)
    dp, ds = peak_errors(h, 0.4 * math.pi, 0.6 * math.pi)
    print(A, len(h) - 1, round(beta, 3), round(dp, 5), round(ds, 5))
```

```text
60 37 5.653 0.00113 0.00096
61 37 5.763 0.00101 0.00092
61 38 5.763 0.00099 0.00099
```

The first design misses the passband specification slightly ($\delta_p = 0.00113$, $58.9\,\mathrm{dB}$), as Kaiser's empirical formulas sometimes do. Designing for $A = 61\,\mathrm{dB}$ and taking $M = 38$ meets both specifications: $39$ taps.

A Hamming window gives only $53\,\mathrm{dB}$, so it cannot meet the specification at any length. A Blackman window gives $74\,\mathrm{dB}$ but needs $11\pi/M \le 0.2\pi$, i.e. $M \ge 55$: $56$ taps, more than the Kaiser design, because it over-achieves the attenuation. Kaiser's adjustable $\beta$ spends exactly the attenuation required.
:::
:::

::: warning The window method's edges are not the specification's edges
In a window design, the response at the nominal cut-off $\omega_c$ is about $\tfrac12$ ($-6\,\mathrm{dB}$), not $-3\,\mathrm{dB}$, and the transition band extends about $\Delta\omega/2$ on each side of $\omega_c$. Place $\omega_c$ midway between $\omega_p$ and $\omega_s$, not at $\omega_p$. Then always check the designed response against the tolerance scheme: the tables and formulas are approximations, and a design that is "nearly" right in the passband can fail by a fraction of a decibel.
:::

## Frequency sampling {#sec-frequency-sampling}

A second approach specifies the filter by its DFT. By [[dsp/discrete-fourier-transform#thm-sampling-dtft]], a length-$N$ filter is determined by $N$ samples of its frequency response at $\omega_k = 2\pi k/N$; between them the response interpolates smoothly. To obtain linear phase, the samples are taken as $H[k] = A_ke^{-j2\pi k\alpha/N}$ with $\alpha = (N - 1)/2$, real amplitudes $A_k$ and $A_{N-k} = A_k$. For type I (odd $N$) the inverse DFT then reduces to

$$
h[n] = \frac1N\Big[A_0 + 2\sum_{k=1}^{(N-1)/2}A_k\cos\big(2\pi k(n - \alpha)/N\big)\Big],\qquad 0 \le n \le N - 1.
$$ {#eq-freq-sampling}

The filter's response equals $A_k$ exactly at each bin. Setting the samples to $1$ in the passband and $0$ in the stopband gives a response with large ripples between the samples, for the same reason as truncation: an abrupt step. The remedy is to leave one or two **transition samples** with intermediate values, chosen to minimise the stopband ripple.

::: example Frequency sampling with a transition sample {#ex-freq-sampling}
Design a $15$-tap low-pass filter by frequency sampling with $A_0 = A_1 = A_2 = 1$ and $A_4 = \dots = A_7 = 0$. Compare $A_3 = 0$ with an optimised transition value $A_3 = T$.
::: solution
With $N = 15$ the bins are $2\pi k/15$, so the passband samples cover $0 \le \omega \le 0.267\pi$. Using [[#eq-freq-sampling]] with $A_3 = 0$, the coefficients are

$$
h = \{0.0581, 0, -0.0667, -0.0777, 0, 0.1419, 0.2777, 0.3333, 0.2777, 0.1419, 0, -0.0777, -0.0667, 0, 0.0581\},
$$

and the response, computed on a fine grid, has a peak stopband ripple (for $\omega \ge 2\pi\cdot3/15 = 0.4\pi$) of $-15.1\,\mathrm{dB}$ and a passband ripple of about $0.10$. Searching $T$ in steps of $0.001$ for the smallest peak ripple beyond the next bin ($\omega \ge 2\pi\cdot4/15$) gives $T = 0.41$, with a stopband ripple of $-41.2\,\mathrm{dB}$ and passband ripple $0.043$. One transition sample has bought about $26\,\mathrm{dB}$ of attenuation, at the cost of doubling the transition width from $2\pi/15$ to $4\pi/15$. With two transition samples, attenuations of $60$ to $70\,\mathrm{dB}$ are reachable.
:::
:::

Frequency sampling is attractive when the desired response is irregular (an equaliser defined by measured gains at a set of frequencies), and for some lengths it can be implemented very cheaply as a comb filter followed by a bank of resonators, one per non-zero sample.

## Optimal equiripple design {#sec-equiripple}

Neither windows nor frequency sampling make the best use of the filter's degrees of freedom. A window design has its largest ripples next to the transition band and much smaller ones far from it: the filter is better than necessary in most of the stopband. The **optimal** design spreads the error evenly.

For a type I filter, $A(\omega) = \sum_{m=0}^{L}c_m\cos(m\omega)$ with $L = M/2$ is a polynomial of degree $L$ in $\cos\omega$. Given a desired response $D(\omega)$ ($1$ in the passband, $0$ in the stopband) and a positive weight $W(\omega)$ (for example $1$ in the passband and $\delta_p/\delta_s$ in the stopband, so that a single weighted error represents both ripples), the **minimax** problem is to choose $c_0, \dots, c_L$ to minimise

$$
\lVert E\rVert_\infty = \max_{\omega\in F}\lvert W(\omega)\big(A(\omega) - D(\omega)\big)\rvert,
$$

where $F$ is the union of the passband and stopband.

::: theorem Alternation theorem {#thm-alternation}
$A(\omega) = \sum_{m=0}^{L}c_m\cos(m\omega)$ is the unique minimax approximation to $D$ on the closed set $F$ with weight $W$ if and only if the weighted error $E(\omega)$ attains its maximum magnitude $\lVert E\rVert_\infty$ with alternating signs at at least $L + 2$ frequencies $\omega_1 < \omega_2 < \dots < \omega_{L+2}$ in $F$.
:::

The proof is the Chebyshev alternation theorem for polynomial approximation (see a numerical analysis text, or Oppenheim and Schafer §7.7). Its consequence is the **equiripple** shape: an optimal filter has ripples of equal height throughout the passband and, at a different height set by the weight, throughout the stopband.

The **Parks–McClellan algorithm** finds the optimum by the **Remez exchange**: guess $L + 2$ extremal frequencies; solve the $L + 2$ linear equations $W(\omega_i)(A(\omega_i) - D(\omega_i)) = (-1)^i\delta$ for the coefficients and the ripple $\delta$; locate the actual extrema of the resulting error on a dense grid; replace the guesses by them; and repeat until the extremal set stops changing. It converges in a few iterations, and every filter-design package implements it (`remez` or `firpm`).

A useful estimate of the order needed is due to Kaiser:

$$
M \approx \frac{-10\log_{10}(\delta_p\delta_s) - 13}{2.324\,\Delta\omega}.
$$ {#eq-pm-order}

For the specification of [[#ex-kaiser]], $-10\log_{10}(10^{-6}) = 60$ and $M \approx 47/(2.324\times0.2\pi) = 32.2$, so an equiripple filter of order about $33$ (34 taps) meets a specification for which the Kaiser window needed order $38$. The saving grows when $\delta_p$ and $\delta_s$ differ: the window method must satisfy the smaller of the two in both bands, while the equiripple design uses the weight to give each band exactly its own ripple.

::: quiz
An equiripple low-pass design has $\delta_p = 0.01$, $\delta_s = 0.001$ and transition width $0.05\pi$. Roughly what order does [[#eq-pm-order]] predict?
- [ ] About $50$
- [x] About $100$
- [ ] About $200$
- [ ] About $25$
::: solution
$-10\log_{10}(10^{-5}) - 13 = 37$, and $2.324\times0.05\pi = 0.365$, so $M \approx 101$. Halving the transition width doubles the order.
:::
:::

::: example Choosing a method for a decimation filter {#ex-design-choice}
The $96 \to 48\,\mathrm{kHz}$ converter of the introduction needs passband edge $20\,\mathrm{kHz}$, stopband edge $24\,\mathrm{kHz}$, passband ripple $\delta_p = 0.001$ ($0.017\,\mathrm{dB}$) and stopband attenuation $80\,\mathrm{dB}$ ($\delta_s = 10^{-4}$). Estimate the length with a Kaiser window and with an equiripple design, and the delay.
::: solution
At $f_s = 96\,\mathrm{kHz}$, $\omega_p = 2\pi\cdot20/96 = 0.4167\pi$ and $\omega_s = 2\pi\cdot24/96 = 0.5\pi$, so $\Delta\omega = 0.0833\pi = 0.2618$. Kaiser window: it must achieve $\delta = \min(\delta_p, \delta_s) = 10^{-4}$, $A = 80\,\mathrm{dB}$, so $M = (80 - 8)/(2.285\times0.2618) = 120.4$, order $121$ or a little more after checking. Equiripple: $-10\log_{10}(10^{-7}) - 13 = 57$, $M \approx 57/(2.324\times0.2618) = 93.7$, about $94$. The equiripple filter is about $22\%$ shorter. Its delay is $47$ samples, $0.49\,\mathrm{ms}$. (Because only every second output sample is kept, a polyphase implementation computes only half the outputs, [[dsp/multirate-processing]]; and since $\omega_s = \pi/2$ this is nearly a half-band filter, in which almost every second coefficient is zero.)
:::
:::

::: application Linear phase where it matters
Linear-phase FIR filters dominate where waveform shape carries information. Digital audio sample-rate converters and oversampling DAC filters use FIR filters with hundreds of taps so that transients are not smeared. Data receivers use FIR pulse-shaping and matched filters (raised-cosine filters, [[communication-systems/baseband-transmission]]) because group-delay variation would cause intersymbol interference. Image processing uses short two-dimensional FIR kernels for blurring and edge detection because a non-linear phase would shift edges by different amounts in different directions. Where waveform shape does not matter but cost does — a hum filter, a tone detector — an IIR filter is usually the better choice.
:::

::: history
Windowing a Fourier series to reduce the Gibbs phenomenon goes back to Fejér's averaging (1900) and to Lanczos's sigma factors. Richard Hamming and Julius von Hann gave their names to the raised-cosine windows used in spectral analysis by Blackman and Tukey (1958), and James Kaiser, at Bell Laboratories, introduced the Bessel-function window with its design formulas in 1974. Frequency-sampling design was developed by Lawrence Rabiner, Bernard Gold and C. A. McGonegal around 1970. In 1972 Thomas Parks and James McClellan, at Rice University, combined the Remez exchange algorithm (Evgeny Remez, 1934) with the Chebyshev alternation theorem to design optimal equiripple filters; their program, published with Rabiner in 1973, became the standard FIR design tool.
:::

## Where this leads

FIR filters designed here are realised in [[dsp/filter-structures]], where coefficient quantisation and the symmetric structure that halves the number of multiplications are discussed. Long FIR filters are applied efficiently by fast convolution ([[dsp/discrete-fourier-transform]]) or, when the sampling rate changes, by polyphase decomposition ([[dsp/multirate-processing]]). The windows themselves return in [[dsp/spectral-analysis]], where the same trade-off between main-lobe width and sidelobe level governs frequency resolution and leakage.

::: summary
- A filter specification gives band edges and ripples; FIR length grows in proportion to the attenuation in decibels and inversely with the transition width.
- Symmetric or antisymmetric FIR filters have exactly linear phase; the four types differ in forced zeros at $\omega = 0$ and $\pi$, which decide which filters each type can realise.
- The window method multiplies the ideal impulse response by a window; the window's main lobe sets the transition width and its sidelobes the ripple, which is the same in both bands and independent of length.
- Rectangular, Hann, Hamming and Blackman windows give about $21$, $44$, $53$ and $74\,\mathrm{dB}$; the Kaiser window's $\beta$ and Kaiser's formula for $M$ match any attenuation.
- Frequency sampling specifies the DFT of the filter; transition samples greatly reduce the ripple.
- Optimal equiripple filters (Parks–McClellan) satisfy the alternation theorem and need the fewest taps, especially when the passband and stopband ripples differ.
- Always check a designed response against the specification: the design formulas are approximations.
:::

## Exercises

::: exercise Ripples in decibels {level=1 check="60"}
Convert $\delta_s = 0.001$ to stopband attenuation and $\delta_p = 0.01$ to peak-to-peak passband ripple, both in decibels. (Enter the stopband attenuation.)
::: solution
$A_s = -20\log_{10}0.001 = 60\,\mathrm{dB}$. $A_p = 20\log_{10}(1.01/0.99) = 0.174\,\mathrm{dB}$.
:::
:::

::: exercise Which type? {level=1}
Classify $h = \{1, 2, 2, 1\}$ and $h = \{1, 0, -1\}$ as linear-phase types, give their group delays, and say whether each could be used as a high-pass filter.
::: solution
$\{1, 2, 2, 1\}$: symmetric, $M = 3$ odd, type II, delay $1.5$ samples; $H(-1) = 1 - 2 + 2 - 1 = 0$, so it cannot be high-pass. $\{1, 0, -1\}$: antisymmetric, $M = 2$, type III, delay $1$; zeros at $\omega = 0$ and $\pi$ ($H(z) = 1 - z^{-2}$), so it is band-pass only, not high-pass.
:::
:::

::: exercise An ideal high-pass filter {level=1}
Write the impulse response of an ideal high-pass filter with cut-off $\omega_c$, delayed by $M/2$ samples ($M$ even), and its value at $n = M/2$.
::: solution
$h_d[n] = \delta[n - M/2] - \dfrac{\sin(\omega_c(n - M/2))}{\pi(n - M/2)}$, with $h_d[M/2] = 1 - \omega_c/\pi$. It is "all-pass minus low-pass".
:::
:::

::: exercise Hamming length {level=2 check="132"}
A low-pass filter needs $50\,\mathrm{dB}$ attenuation and a transition width of $0.05\pi$. Which fixed window should be used, and what order $M$ does the table give?
::: solution
Hann gives only $44\,\mathrm{dB}$; Hamming gives $53\,\mathrm{dB}$, enough. Its transition width is $6.6\pi/M \le 0.05\pi$, so $M \ge 132$ ($133$ taps).
:::
:::

::: exercise Kaiser parameters {level=2 check="45"}
Find $\beta$ and the order $M$ from [[#alg-kaiser]] for $A = 40\,\mathrm{dB}$ and $\Delta\omega = 0.1\pi$. (Enter $M$.)
::: solution
$21 \le A \le 50$: $\beta = 0.5842\times19^{0.4} + 0.07886\times19 = 1.897 + 1.498 = 3.395$. $M = \lceil32/(2.285\times0.1\pi)\rceil = \lceil44.6\rceil = 45$.
:::
:::

::: exercise Equiripple order {level=2 check="51"}
Use [[#eq-pm-order]] to estimate the order of an equiripple filter with $\delta_p = 0.01$, $\delta_s = 0.001$ and $\Delta\omega = 0.1\pi$, rounded up.
::: solution
$M \approx (50 - 13)/(2.324\times0.1\pi) = 37/0.730 = 50.7$, so $M = 51$. A Kaiser window would need $A = 60\,\mathrm{dB}$ in both bands: $M = 52/(2.285\times0.1\pi) = 72.4$, about $40\%$ longer.
:::
:::

::: exercise A tiny frequency-sampling filter {level=2 check="3/7"}
Design a $7$-tap filter by frequency sampling with $A_0 = A_1 = 1$ and $A_2 = A_3 = 0$. Give all coefficients and enter $h[3]$.
::: solution
From [[#eq-freq-sampling]] with $N = 7$, $\alpha = 3$: $h[n] = \frac17\big(1 + 2\cos(2\pi(n - 3)/7)\big)$, giving $h = \{-0.1146, 0.0793, 0.3210, 0.4286, 0.3210, 0.0793, -0.1146\}$, with $h[3] = 3/7$. Check: $\sum h = A_0 = 1$, the DC gain.
:::
:::

::: exercise Forced zero of type II {level=3}
Prove directly from $H(z) = z^{-M}H(z^{-1})$ that a symmetric filter of odd order has $H(-1) = 0$, and deduce that an antisymmetric filter of any order has $H(1) = 0$.
::: solution
Put $z = -1$: $H(-1) = (-1)^{-M}H(-1) = -H(-1)$ for odd $M$, so $H(-1) = 0$. For antisymmetric $h$, $H(z) = -z^{-M}H(z^{-1})$; at $z = 1$, $H(1) = -H(1)$, so $H(1) = 0$. (At $z = -1$ an antisymmetric filter gives $H(-1) = -(-1)^MH(-1)$, which forces a zero when $M$ is even: type III.)
:::
:::

::: exercise A band-pass design {level=3}
Design (give $h_d[n]$, the window and the order) a linear-phase band-pass filter passing $0.3\pi$ to $0.5\pi$ with transition bands $0.1\pi$ wide on each side and at least $50\,\mathrm{dB}$ attenuation. Explain why the result has the same attenuation as a low-pass Hamming design.
::: hint
A band-pass filter is the difference of two low-pass filters; put each cut-off in the middle of its transition band.
:::
::: solution
Cut-offs $\omega_1 = 0.25\pi$ and $\omega_2 = 0.55\pi$ (midway through the transition bands $0.2\pi$–$0.3\pi$ and $0.5\pi$–$0.6\pi$). Ideal response, delayed by $M/2$: $h_d[n] = \dfrac{\sin(\omega_2(n - M/2)) - \sin(\omega_1(n - M/2))}{\pi(n - M/2)}$, with $h_d[M/2] = (\omega_2 - \omega_1)/\pi = 0.3$. Hamming ($53\,\mathrm{dB}$) with $6.6\pi/M \le 0.1\pi$ gives $M = 66$ (type I, $67$ taps). By [[#eq-window-conv]], each edge of the ideal band-pass response is smeared by the same window spectrum, so near each edge the error is that of a low-pass design with the same window; as long as the edges are separated by more than the main-lobe width ($8\pi/66 = 0.12\pi$, less than the $0.2\pi$ passband), the ripples from the two edges add only weakly and the attenuation stays about $53\,\mathrm{dB}$. Verify numerically before use.
:::
:::
