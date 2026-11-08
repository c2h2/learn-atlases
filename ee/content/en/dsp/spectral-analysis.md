A test engineer feeds a pure $10\,\mathrm{kHz}$ sine wave into a new 16-bit analog-to-digital converter, records $65\,536$ samples, and computes an FFT. The plot should show one tall line, a few small harmonics produced by the converter's non-linearity, and a flat floor of quantisation and thermal noise $140\,\mathrm{dB}$ below the tone. Whether it does depends almost entirely on choices the engineer made before pressing "run": the window, the record length, the exact frequency of the test tone, and how many records were averaged. Choose badly and the tone's "skirts" bury the harmonics, the noise floor jumps about by $10\,\mathrm{dB}$ from bin to bin, or the measured amplitude is $4\,\mathrm{dB}$ low. **Spectral analysis** is the craft of estimating the frequency content of a signal from a finite record, and of knowing how far to trust the estimate.

Two kinds of signal need different treatment. For **deterministic** components — tones, harmonics, carriers — the question is how well a finite record resolves them and measures their amplitudes; the answer is governed by **windowing**, whose trade-off between main-lobe width and sidelobe level we met in [[dsp/fir-filter-design]]. For **random** components — noise, vibration, speech viewed statistically — the target is the power spectral density of [[random-signals/correlation-spectra]], and the question is statistical: the raw **periodogram** is biased by the window and, worse, its variance does not decrease as the record grows. **Averaging** (Bartlett's and Welch's methods) trades resolution for variance. Finally, for signals whose spectrum changes in time, the **short-time Fourier transform** gives a time–frequency picture, the spectrogram. Throughout, the computation is the DFT of [[dsp/discrete-fourier-transform]], evaluated by the FFT of [[dsp/fast-fourier-transform]].

## Windows and the spectrum of a finite record {#sec-windows}

We observe $N$ samples $x[n]$, $0 \le n \le N - 1$, of a longer signal, and multiply them by a **window** $w[n]$ (the rectangular window $w = 1$ if we do nothing). The DTFT of the windowed record is, by the multiplication property,

$$
X_w(e^{j\omega}) = \sum_{n=0}^{N-1}w[n]x[n]e^{-j\omega n} = \frac{1}{2\pi}\int_{-\pi}^{\pi}X(e^{j\theta})W(e^{j(\omega - \theta)})\,\dd\theta ,
$$ {#eq-windowed}

and the $N$-point DFT samples it at the **bins** $\omega_k = 2\pi k/N$, i.e. at $f_k = kf_s/N$ hertz. For a single complex tone $Ae^{j\omega_0n}$ the integral collapses to $AW(e^{j(\omega - \omega_0)})$: the spectrum we see is the window's transform, centred on the tone. A real sinusoid $A\cos(\omega_0n)$ gives two such copies of height $A/2$, at $\pm\omega_0$.

Two effects follow. **Resolution**: two tones closer than about the main-lobe width of $W$ merge into one peak. **Leakage**: the sidelobes of a strong tone spread its power over the whole band and can hide a weak tone far away. As in filter design, narrow main lobes and low sidelobes cannot be had together; the rectangular window has the narrowest main lobe and the highest sidelobes.

::: definition Figures of merit of a window {#def-window-merit}
For a window $w[n]$ of length $N$:

- the **coherent gain** $\mathrm{CG} = \frac1N\sum_nw[n]$ is the factor by which the window reduces the peak response to a tone exactly on a bin;
- the **equivalent noise bandwidth** $\mathrm{ENBW} = N\dfrac{\sum_nw^2[n]}{\big(\sum_nw[n]\big)^2}$ bins is the width of the ideal rectangular filter that would pass the same white-noise power as one bin of the windowed DFT, for the same peak gain;
- the **scalloping loss** is the drop in the peak response when the tone lies halfway between two bins, $\lvert W(e^{j\pi/N})\rvert/\lvert W(1)\rvert$;
- the **peak sidelobe level** is the height of the highest sidelobe relative to the main lobe, and the **sidelobe roll-off** is the rate at which sidelobes decay.
:::

Measured on periodic windows of length $N = 1024$ (the values hardly depend on $N$):

| window | main lobe (null to null) | peak sidelobe | roll-off | CG | ENBW (bins) | scalloping loss |
|---|---|---|---|---|---|---|
| rectangular | $\pm1$ bin | $-13.3\,\mathrm{dB}$ | $6\,\mathrm{dB/oct}$ | $1$ | $1.00$ | $3.92\,\mathrm{dB}$ |
| Hann | $\pm2$ bins | $-31.5\,\mathrm{dB}$ | $18\,\mathrm{dB/oct}$ | $0.50$ | $1.50$ | $1.42\,\mathrm{dB}$ |
| Hamming | $\pm2$ bins | $-42.7\,\mathrm{dB}$ | $6\,\mathrm{dB/oct}$ | $0.54$ | $1.36$ | $1.75\,\mathrm{dB}$ |
| Blackman | $\pm3$ bins | $-58.1\,\mathrm{dB}$ | $18\,\mathrm{dB/oct}$ | $0.42$ | $1.73$ | $1.10\,\mathrm{dB}$ |
| flat-top | $\pm5$ bins | $-93\,\mathrm{dB}$ | — | $0.22$ | $3.77$ | $0.01\,\mathrm{dB}$ |

The Hann window is the usual default: its sidelobes start at $-31\,\mathrm{dB}$ but fall rapidly, so leakage far from a tone is small. Blackman and the Kaiser windows with large $\beta$ are used when weak components lie near strong ones; **flat-top** windows sacrifice resolution to make the scalloping loss negligible, which is what calibrated amplitude measurements need.

::: widget plot
f: 20*log10(sqrt(sum(cos(2*pi*k*(x - 16.5)/64) + 10^(G/20)*cos(2*pi*k*(x - 16.5 - d)/64), k, 0, 63)^2 + sum(sin(2*pi*k*(x - 16.5)/64) + 10^(G/20)*sin(2*pi*k*(x - 16.5 - d)/64), k, 0, 63)^2)/64 + 1e-9); 20*log10(sqrt(sum((0.5 - 0.5*cos(2*pi*k/64))*(cos(2*pi*k*(x - 16.5)/64) + 10^(G/20)*cos(2*pi*k*(x - 16.5 - d)/64)), k, 0, 63)^2 + sum((0.5 - 0.5*cos(2*pi*k/64))*(sin(2*pi*k*(x - 16.5)/64) + 10^(G/20)*sin(2*pi*k*(x - 16.5 - d)/64)), k, 0, 63)^2)/32 + 1e-9)
x: 0, 32
y: -90, 5
sliders: d=6.3:1:15:0.1; G=-40:-80:0:1
labels: \text{rectangular}; \text{Hann}
caption: Spectra (in dB, horizontal axis in DFT bins) of a $64$-sample record containing a strong complex tone at bin $16.5$ — halfway between bins, the worst case for leakage — and a second tone $d$ bins higher and $G$ decibels weaker; both windows are normalised by their coherent gain. With $G = -40\,\mathrm{dB}$ and $d = 6.3$, the weak tone is invisible under the rectangular window's leakage but stands clear with the Hann window. Now set $G = 0$ and reduce $d$ towards $1$: the rectangular window still shows a clear dip between the two equal tones at $d = 1.5$ bins, while the Hann window needs about $d = 2.5$ for a comparable dip. Resolution and dynamic range pull in opposite directions.
:::

::: example Seeing a weak tone next to a strong one {#ex-leakage}
A record of $N = 1024$ samples at $f_s = 1024\,\mathrm{Hz}$ contains $\cos(2\pi\cdot100.5\,t)$ and a tone $60\,\mathrm{dB}$ weaker at $110\,\mathrm{Hz}$. Which of the rectangular, Hann and Blackman windows reveal the weak tone?
::: solution
The bins are $1\,\mathrm{Hz}$ apart, so the strong tone lies exactly between bins $100$ and $101$ and the weak tone sits on bin $110$, $9.5$ bins away. What matters is the strong tone's leakage into bin $110$, relative to its own peak response. Computing the windowed DFTs (normalised so that an on-bin tone of amplitude $1$ reads $0\,\mathrm{dB}$):

| window | leakage of strong tone at bin 110 | weak tone at bin 110 |
|---|---|---|
| rectangular | $-29.2\,\mathrm{dB}$ | $-60\,\mathrm{dB}$ (buried) |
| Hann | $-68.5\,\mathrm{dB}$ | $-60\,\mathrm{dB}$ (visible, $8.5\,\mathrm{dB}$ clear) |
| Blackman | $-76.4\,\mathrm{dB}$ | $-60\,\mathrm{dB}$ (visible, $16\,\mathrm{dB}$ clear) |

The rectangular window's sidelobes decay only as $1/(\pi\times\text{distance in bins})$: at $9.5$ bins, $20\log_{10}(1/(9.5\pi)) = -29.5\,\mathrm{dB}$, matching the computation. The Hann window's sidelobes, falling at $18\,\mathrm{dB}$ per octave, are $39\,\mathrm{dB}$ lower there. Note that the strong tone's own peak reads $-3.9$, $-1.4$ and $-1.1\,\mathrm{dB}$ with the three windows: the scalloping losses of the table.
:::
:::

::: warning Zero padding does not improve resolution
Appending zeros to a record before the FFT samples the same windowed DTFT [[#eq-windowed]] more densely ([[dsp/discrete-fourier-transform#ex-zero-padding]]). It interpolates the plot — useful for locating a peak precisely or for reducing the scalloping loss — but it cannot separate two tones that the main lobe of the original length-$N$ window merges. Only a longer record (in time) improves resolution: about $f_s/N = 1/T_{\mathrm{rec}}$ hertz for the rectangular window and twice that for Hann.
:::

### Measuring amplitudes and the noise floor

For a real tone $A\cos(\omega_0n)$ exactly on bin $k_0$, the DFT magnitude is $\lvert X[k_0]\rvert = \tfrac12AN\cdot\mathrm{CG}$, so the amplitude is recovered as

$$
A = \frac{2\lvert X[k_0]\rvert}{N\cdot\mathrm{CG}} .
$$ {#eq-amplitude}

Off-bin tones read low by up to the scalloping loss, unless a flat-top window or interpolation between bins is used. The best way to avoid both leakage and scalloping in a test setup is **coherent sampling**: choose the test frequency so that an integer number $J$ of periods fits exactly in the record, $f_0 = Jf_s/N$; then the tone falls exactly on bin $J$ and, with the rectangular window, leaks nothing at all. Choosing $J$ odd (coprime with a power-of-two $N$) makes every sample hit a different phase of the waveform, so the quantisation error is spread over many codes.

White noise behaves differently. Its power is spread over all $N$ bins, so the **noise per bin** falls as $N$ grows while the tone's bin stays fixed. For a full-scale sinusoid with signal-to-noise ratio $\mathrm{SNR}$ (in dB), the noise floor of an $N$-point rectangular-window DFT lies

$$
\mathrm{SNR} + 10\log_{10}\frac N2 \quad\text{decibels below the tone}
$$ {#eq-processing-gain}

(the noise is shared among the $N/2$ positive-frequency bins). The term $10\log_{10}(N/2)$ is the FFT's **processing gain**; a window raises the floor by $10\log_{10}\mathrm{ENBW}$ relative to the tone. The floor on the plot is not the noise; the noise is the floor integrated over all bins.

::: example Reading a converter test spectrum {#ex-adc-floor}
A 12-bit converter with $\mathrm{SNR} = 74\,\mathrm{dB}$ is tested with a full-scale tone, a $4096$-point FFT and a Hann window. Where does the noise floor lie relative to the tone, and can a third harmonic at $-95\,\mathrm{dB}$ relative to the tone (dBc) be seen?
::: solution
With the rectangular window, [[#eq-processing-gain]] puts the floor $74 + 10\log_{10}2048 = 74 + 33.1 = 107.1\,\mathrm{dB}$ below the tone. The Hann window's equivalent noise bandwidth of $1.5$ bins raises the noise per bin by $10\log_{10}1.5 = 1.8\,\mathrm{dB}$ relative to the tone's peak, so the floor is at about $-105.4\,\mathrm{dBc}$. The harmonic, at $-95\,\mathrm{dBc}$, stands about $10\,\mathrm{dB}$ above it and is clearly visible, even though the converter's total noise is only $74\,\mathrm{dB}$ below the tone: the FFT spreads that noise over $2048$ bins. Conversely, to compute the SNR from the plot, the noise must be summed over all bins except those of the tone and its harmonics, and divided by the window's ENBW; reading the floor and quoting it as the SNR overstates the converter by $33\,\mathrm{dB}$.
:::
:::

::: quiz
A spectrum analyser displays a tone at $-10\,\mathrm{dBm}$ and a noise floor at $-100\,\mathrm{dBm}$ per bin. The user doubles the FFT length (with the same sampling rate and window). What happens?
- [ ] The tone falls by $3\,\mathrm{dB}$ and the floor stays the same
- [x] The tone stays the same and the floor falls by $3\,\mathrm{dB}$
- [ ] Both fall by $3\,\mathrm{dB}$
- [ ] Nothing: the signal has not changed
::: solution
A tone's power lands in one bin (with the amplitude normalisation of [[#eq-amplitude]]), whatever $N$; the noise power is divided among twice as many bins, each half as wide, so the noise per bin halves: $-3\,\mathrm{dB}$. Doubling $N$ halves the resolution bandwidth.
:::
:::

## The periodogram {#sec-periodogram}

Now let $x[n]$ be a sample function of a zero-mean wide-sense stationary process with autocorrelation $R_x[m]$ and power spectral density $S_x(e^{j\omega}) = \sum_mR_x[m]e^{-j\omega m}$ ([[random-signals/correlation-spectra]]). The natural estimate of $S_x$ from $N$ samples is the squared magnitude of their DFT, normalised.

::: definition Periodogram {#def-periodogram}
The **periodogram** of $x[0], \dots, x[N - 1]$ is

$$
\hat S(e^{j\omega}) = \frac1N\Big\lvert\sum_{n=0}^{N-1}x[n]e^{-j\omega n}\Big\rvert^2 ,
$$ {#eq-periodogram}

evaluated at the bins as $\hat S[k] = \lvert X[k]\rvert^2/N$. With a window, the **modified periodogram** is $\hat S_w(e^{j\omega}) = \lvert\sum_nw[n]x[n]e^{-j\omega n}\rvert^2/\sum_nw^2[n]$.
:::

Multiplying out [[#eq-periodogram]] shows that the periodogram is the DTFT of the biased sample autocorrelation $\hat R[m] = \frac1N\sum_nx[n + m]x[n]$, the discrete analogue of the Wiener–Khinchin theorem. Two questions decide whether it is a good estimate: is it centred on the truth (bias), and does it settle down as $N$ grows (variance)?

::: theorem Mean of the periodogram {#thm-periodogram-mean}
The expected value of the modified periodogram is the true spectrum smoothed by the window's spectral kernel:

$$
\E\{\hat S_w(e^{j\omega})\} = \frac{1}{2\pi}\int_{-\pi}^{\pi}S_x(e^{j\theta})\,\frac{\lvert W(e^{j(\omega - \theta)})\rvert^2}{\sum_nw^2[n]}\,\dd\theta .
$$ {#eq-periodogram-mean}

For the rectangular window the kernel is the **Fejér kernel** $\frac1N\big(\sin(N\omega/2)/\sin(\omega/2)\big)^2$. The kernel has unit area, so as $N \to \infty$ the periodogram is **asymptotically unbiased** wherever $S_x$ is continuous.
:::

::: proof
Expand the square: $\E\{\hat S_w\} = \frac{1}{U}\sum_n\sum_{n'}w[n]w[n']\E\{x[n]x[n']\}e^{-j\omega(n - n')}$ with $U = \sum w^2$. Substitute $\E\{x[n]x[n']\} = R_x[n - n'] = \frac{1}{2\pi}\int S_x(e^{j\theta})e^{j\theta(n - n')}\dd\theta$ and exchange sum and integral: the double sum becomes $\sum_nw[n]e^{-j(\omega - \theta)n}\sum_{n'}w[n']e^{j(\omega - \theta)n'} = \lvert W(e^{j(\omega - \theta)})\rvert^2$. The kernel's area is $\frac{1}{2\pi U}\int\lvert W\rvert^2\dd\theta = \frac{1}{U}\sum w^2 = 1$ by Parseval. As $N$ grows the kernel narrows (its width is about $2\pi/N$ times a constant) while keeping unit area, so it tends to a delta function.
:::

The bias is the smearing of [[#eq-windowed]] in statistical form: a peak in $S_x$ is broadened to the main-lobe width, and the sidelobes leak power from strong regions of the spectrum into weak ones. For spectra with a large dynamic range — the steep roll-off of a filtered noise, a spectrum with deep notches — a tapered window is essential even for random signals.

::: theorem Variance of the periodogram {#thm-periodogram-var}
Let $x[n]$ be white Gaussian noise of variance $\sigma^2$. At the bins $0 < k < N/2$, the periodogram values $\hat S[k]$ are independent, each exponentially distributed with mean $\sigma^2$ and therefore with **standard deviation $\sigma^2$**, whatever $N$. For a general Gaussian process with smooth spectrum, approximately $\Var\{\hat S(e^{j\omega})\} \approx S_x^2(e^{j\omega})$ for large $N$, and $\hat S/S_x$ is approximately $\chi^2_2/2$.
:::

::: proof
For $0 < k < N/2$ write $X[k] = A_k - jB_k$ with $A_k = \sum_nx[n]\cos(2\pi kn/N)$ and $B_k = \sum_nx[n]\sin(2\pi kn/N)$. These are linear combinations of independent Gaussian variables, hence jointly Gaussian with zero mean. Their covariances follow from the orthogonality of the sampled cosines and sines: $\E\{A_k^2\} = \sigma^2\sum_n\cos^2(2\pi kn/N) = N\sigma^2/2$, likewise $\E\{B_k^2\} = N\sigma^2/2$, and $\E\{A_kB_l\} = 0$, $\E\{A_kA_l\} = \E\{B_kB_l\} = 0$ for $k \ne l$ in this range. So the $A_k$, $B_k$ are independent Gaussians of variance $N\sigma^2/2$, and

$$
\hat S[k] = \frac{A_k^2 + B_k^2}{N} = \frac{\sigma^2}{2}\Big(\frac{A_k^2}{N\sigma^2/2} + \frac{B_k^2}{N\sigma^2/2}\Big) = \frac{\sigma^2}{2}\chi^2_2 ,
$$

a chi-squared variable with two degrees of freedom, i.e. exponential, with mean $\frac{\sigma^2}{2}\times2 = \sigma^2$ and variance $\frac{\sigma^4}{4}\times4 = \sigma^4$. The general case follows by viewing a Gaussian process with smooth spectrum as white noise filtered by $H$ with $\lvert H\rvert^2 = S_x$: for large $N$, $X[k] \approx H(e^{j\omega_k})X_{\mathrm{white}}[k]$.
:::

This is the central fact of spectral estimation: **the periodogram is not consistent**. A longer record gives more bins, each as noisy as before; the estimate does not converge to $S_x$. The plot of a raw periodogram of noise is a ragged band whose individual values vary by a factor of ten or more ($\Prob\{\hat S < 0.1S\} = 1 - e^{-0.1} = 9.5\%$; $\Prob\{\hat S > 3S\} = e^{-3} = 5\%$), and its standard deviation of $5.6\,\mathrm{dB}$ makes it useless for reading off a level to better than a few decibels.

## Averaging: Bartlett and Welch {#sec-averaging}

If one periodogram has a relative standard deviation of $100\%$, the average of $K$ independent periodograms has $1/\sqrt K$. The data must come from somewhere: from a fixed record of $N_{\mathrm{tot}}$ samples, we cut $K$ shorter segments, losing resolution in exchange for stability.

::: algorithm Welch's method {#alg-welch}
Given a record of $N_{\mathrm{tot}}$ samples, a segment length $N$, a window $w$ and an overlap of $N - D$ samples (hop $D$):

1. Form the segments $x_i[n] = x[n + iD]$, $0 \le n \le N - 1$, $i = 0, \dots, K - 1$, with $K = \lfloor(N_{\mathrm{tot}} - N)/D\rfloor + 1$.
2. Compute each modified periodogram $\hat S_i[k] = \lvert\mathrm{FFT}\{w[n]x_i[n]\}[k]\rvert^2/\sum_nw^2[n]$.
3. Average: $\hat S_{\mathrm W}[k] = \frac1K\sum_i\hat S_i[k]$.
4. Scale to physical units: multiply by $1/f_s$ for a two-sided PSD in units$^2$/Hz, and double the bins $0 < k < N/2$ for a one-sided PSD.

**Bartlett's method** is the special case of the rectangular window with no overlap ($D = N$).
:::

For Bartlett's method with independent segments, [[#thm-periodogram-var]] gives $\Var\{\hat S_{\mathrm B}\} \approx S_x^2/K$ and $K\hat S_{\mathrm B}/S_x \approx \chi^2_{2K}/2$; the resolution, set by the segment length, worsens to about $f_s/N = Kf_s/N_{\mathrm{tot}}$. Welch's overlap recovers some of what tapering wastes: a Hann window discards the data near the segment ends, and overlapping segments by $50\%$ reuses them. Adjacent segments are then correlated, and Welch showed that for $50\%$ overlap

$$
\Var\{\hat S_{\mathrm W}\} \approx \frac{S_x^2}{K}\big(1 + 2c^2\big),\qquad c = \frac{\sum_nw[n]w[n + N/2]}{\sum_nw^2[n]} ,
$$ {#eq-welch-var}

with $c^2 = 0.028$ for the Hann window. With $50\%$ overlap a record yields almost twice as many segments as without, and each counts almost as an independent one: overlapped Hann segments give nearly the variance of Bartlett's method with the window's low leakage.

The **resolution–variance trade-off** is then explicit. With record duration $T_{\mathrm{rec}}$, a resolution bandwidth $B_r$ (about $\mathrm{ENBW}\times f_s/N$) and the number of segments are tied together: roughly $K \approx B_rT_{\mathrm{rec}}$ for non-overlapping segments, so

$$
\frac{\text{standard deviation}}{\text{mean}} \approx \frac{1}{\sqrt{B_rT_{\mathrm{rec}}}} ,
$$ {#eq-bt-product}

the same law as for the analog spectrum analyser in [[random-signals/correlation-spectra]]. In decibels, for large $K$, the standard deviation of $10\log_{10}\hat S$ is about $4.34/\sqrt{K}\,\mathrm{dB}$.

::: widget distribution
dist: chisq
params: k=2
normal: true
caption: The distribution of $2K\hat S/S$ for an average of $K$ independent periodogram values is chi-squared with $k = 2K$ degrees of freedom. At $k = 2$ (a single periodogram) it is the exponential distribution, with standard deviation equal to its mean — the raggedness of a raw periodogram. Increase $k$ to $20$ ($K = 10$) and to $60$ ($K = 30$): the relative spread $\sqrt{2/k} = 1/\sqrt K$ shrinks and the distribution approaches the normal curve, which is why averaged spectra look smooth and can be given simple error bars.
:::

::: example Designing a vibration measurement {#ex-welch-design}
A vibration signal is sampled at $f_s = 10\,\mathrm{kHz}$. Its PSD is to be estimated with resolution bandwidth no worse than $2\,\mathrm{Hz}$ and with a standard deviation of at most $0.5\,\mathrm{dB}$ in each bin. Choose the window, the segment length and the overlap, and find the record length needed.
::: solution
**Window and segment length.** Use a Hann window for low leakage. Its resolution bandwidth is $\mathrm{ENBW}\times f_s/N = 1.5\times10\,000/N \le 2$, so $N \ge 7500$; take $N = 8192$, giving bins $1.22\,\mathrm{Hz}$ apart and a resolution bandwidth of $1.83\,\mathrm{Hz}$.

**Number of averages.** A standard deviation of $0.5\,\mathrm{dB}$ means $4.34/\sqrt{K_{\mathrm{eff}}} \le 0.5$, i.e. a relative standard deviation $\le 0.115$ and $K_{\mathrm{eff}} \ge 75.4$ independent segments' worth. With $50\%$ overlap, [[#eq-welch-var]] requires $K \ge 75.4\times(1 + 2\times0.028) = 79.6$, so $K = 80$ segments.

**Record length.** Eighty segments with hop $D = 4096$ span $(K - 1)D + N = 79\times4096 + 8192 = 331\,776$ samples, i.e. $33.2\,\mathrm{s}$. Without overlap, $76$ segments of $8192$ samples would need $622\,592$ samples, $62.3\,\mathrm{s}$: overlap almost halves the measurement time. Halving the required standard deviation to $0.25\,\mathrm{dB}$ would quadruple it, and halving the resolution bandwidth would double it — the product law [[#eq-bt-product]].
:::
:::

::: remark Parametric estimates
Averaged periodograms assume nothing about the signal. When a short record must yield sharp spectral peaks, **parametric** methods fit a model instead: an autoregressive model $x[n] = -\sum_{k=1}^{p}a_kx[n - k] + e[n]$ has spectrum $\sigma_e^2/\lvert A(e^{j\omega})\rvert^2$, and its coefficients follow from the sample autocorrelation by the Yule–Walker equations, solved by the Levinson–Durbin recursion whose reflection coefficients are those of the lattice in [[dsp/filter-structures]]. Such estimates resolve peaks much closer than $1/T_{\mathrm{rec}}$ when the model fits, and produce convincing but false peaks when it does not. Burg's method, the multitaper method of Thomson and subspace methods (MUSIC, ESPRIT) for sinusoids in noise are described in Stoica and Moses.
:::

## The short-time Fourier transform {#sec-stft}

Speech, music, radar returns and machine run-ups have spectra that change in time. A single long FFT averages those changes away; what we want is a sequence of spectra, each of a short stretch of signal.

::: definition Short-time Fourier transform {#def-stft}
The **short-time Fourier transform** (STFT) with window $w[n]$ of length $N$ and hop $D$ is

$$
X[m, k] = \sum_{n=0}^{N-1}w[n]\,x[n + mD]\,e^{-j2\pi kn/N},
$$ {#eq-stft}

the DFT of the $m$-th windowed frame. The **spectrogram** is $\lvert X[m, k]\rvert^2$, displayed as an image with time $mD/f_s$ horizontally, frequency $kf_s/N$ vertically and power as brightness.
:::

Each STFT bin can be read in two ways. Along $k$ for fixed $m$, it is the spectrum of one frame. Along $m$ for fixed $k$, it is the output of a band-pass filter with impulse response $w[-n]e^{j2\pi kn/N}$, decimated by $D$: the STFT *is* a DFT filter bank of the kind built in [[dsp/multirate-processing]]. The window then sets both resolutions at once. A frame of duration $T_w = N/f_s$ has frequency resolution of about $\mathrm{ENBW}/T_w$ hertz and time resolution of about $T_w$: their product is a constant of order one, an instance of the **uncertainty principle** of Fourier analysis (for Gaussian windows, the product of the RMS durations in time and frequency reaches its minimum $1/4\pi$). A wide window gives a **narrowband spectrogram** that resolves the harmonics of a voice; a short window gives a **wideband spectrogram** that resolves the individual glottal pulses.

::: example Window length for a chirp {#ex-chirp}
A bat call at $f_s = 192\,\mathrm{kHz}$ sweeps downwards at a rate of $r = 10\,\mathrm{kHz}$ per millisecond. Choose the STFT frame length that gives the sharpest spectrogram trace.
::: solution
During a frame of length $T_w$ the frequency changes by $rT_w$; this smears the trace in frequency. The window itself smears it by about $1/T_w$ (times the ENBW, which we ignore here). The total width $rT_w + 1/T_w$ is smallest when the two are equal: $T_w = 1/\sqrt r$. With $r = 10^7\,\mathrm{Hz/s}$, $T_w = 1/\sqrt{10^7} = 316\,\mathrm{\mu s}$, about $61$ samples; a $64$-sample Hann frame ($333\,\mathrm{\mu s}$) with a hop of $8$ to $16$ samples gives a smooth trace about $2\times3.2 = 6.3\,\mathrm{kHz}$ wide. A $1024$-sample frame would smear the trace over $53\,\mathrm{kHz}$; a $16$-sample frame would give $12\,\mathrm{kHz}$ of window smear.
:::
:::

::: quiz
A spectrum is averaged over $K = 25$ independent Hann-windowed segments. Roughly how much does the estimate in a typical bin fluctuate (one standard deviation)?
- [ ] About $5.6\,\mathrm{dB}$, the same as a single periodogram
- [x] About $0.9\,\mathrm{dB}$
- [ ] About $0.2\,\mathrm{dB}$
- [ ] It does not fluctuate: averaging removes the randomness
::: solution
The relative standard deviation is $1/\sqrt{25} = 0.2$, i.e. $4.34\times0.2 = 0.87\,\mathrm{dB}$. Averaging reduces the fluctuation in proportion to $1/\sqrt K$ but never removes it.
:::
:::

::: application Spectral analysis in the laboratory
Every modern spectrum analyser is, at least in part, an FFT analyser: it digitises an intermediate-frequency band, applies a window chosen by its "resolution bandwidth" setting, and averages periodograms (displayed as "trace average" or "video bandwidth"). Its flat-top window makes amplitude readings accurate to a few hundredths of a decibel. Converter data sheets quote SNR, SFDR and THD measured with coherent sampling and long FFTs, exactly as in this chapter ([[instrumentation/data-acquisition]]). Vibration monitoring of turbines and bearings averages Welch spectra over minutes to detect the growth of a fault line a few decibels above the floor, and speech recognisers start from mel-scaled spectrograms with $25\,\mathrm{ms}$ frames hopped every $10\,\mathrm{ms}$.
:::

::: history
Arthur Schuster introduced the periodogram in 1898 to search for hidden periodicities in meteorological and sunspot data, and found that it fluctuated wildly. Maurice Bartlett explained the inconsistency and proposed averaging in 1948, and Ralph Blackman and John Tukey's 1958 monograph *The Measurement of Power Spectra* made windowed autocorrelation estimates standard practice. The sound spectrograph of Ralph Koenig, H. K. Dunn and L. Y. Lacy at Bell Laboratories, described in 1946, displayed time–frequency pictures of speech, the same year in which Dennis Gabor's *Theory of Communication* analysed signals in "elementary" time–frequency cells. After the FFT of Cooley and Tukey (1965), Peter Welch's averaged, overlapped periodogram (1967) became the default estimator. John Burg's maximum-entropy method (1967), Fredric Harris's 1978 survey of windows and David Thomson's multitaper method (1982) shaped modern practice.
:::

## Where this leads

Spectral estimation closes this course but opens several others. Communication receivers use FFT-based spectrum sensing and channel estimation ([[communication-systems]]); the measurement of converter and amplifier distortion with coherent FFTs is part of [[instrumentation/data-acquisition]] and [[electronics-2/data-converters]]; and the statistical side — confidence intervals, detection of a tone in noise — rests on the Gaussian theory of [[random-signals/gaussian-noise]] and the estimation theory of [[random-signals/estimation-kalman]].

::: summary
- A finite record is always windowed; its spectrum is the true spectrum convolved with the window's transform, which limits resolution (main lobe) and causes leakage (sidelobes).
- Windows are compared by main-lobe width, sidelobe level and roll-off, coherent gain, equivalent noise bandwidth and scalloping loss; Hann is the usual default, Blackman for high dynamic range, flat-top for amplitude accuracy.
- Zero padding interpolates the spectrum but does not improve resolution; only a longer record does. Coherent sampling avoids leakage in test measurements.
- The FFT noise floor lies $\mathrm{SNR} + 10\log_{10}(N/2)$ below a full-scale tone: the noise per bin falls with $N$.
- The periodogram is asymptotically unbiased but inconsistent: each value is about $S\chi^2_2/2$, with standard deviation equal to its mean whatever $N$.
- Averaging $K$ segments (Bartlett, or Welch with windows and $50\%$ overlap) reduces the relative standard deviation to about $1/\sqrt K$ at the cost of resolution; resolution bandwidth times record duration fixes the attainable accuracy.
- The STFT is a sequence of windowed DFTs, equivalently a DFT filter bank; its window length trades time resolution against frequency resolution.
:::

## Exercises

::: exercise Bin spacing {level=1 check="48000/4096"}
What is the spacing of the bins of a $4096$-point FFT of audio sampled at $48\,\mathrm{kHz}$, in hertz?
::: solution
$f_s/N = 48\,000/4096 = 11.72\,\mathrm{Hz}$. The record lasts $85.3\,\mathrm{ms}$, the reciprocal of the spacing.
:::
:::

::: exercise Amplitude from a Hann-windowed FFT {level=1 check="1"}
A $4096$-point FFT of a Hann-windowed sinusoid has a peak of magnitude $1024$ at a bin, and the tone is known to lie exactly on that bin. Find the amplitude of the sinusoid.
::: solution
By [[#eq-amplitude]] with $\mathrm{CG} = 0.5$: $A = 2\times1024/(4096\times0.5) = 1$. If the tone had been halfway between bins, the peak would have been $1.42\,\mathrm{dB}$ lower (about $870$) and the uncorrected estimate $0.85$.
:::
:::

::: exercise Resolving two tones {level=1}
Two tones $3\,\mathrm{Hz}$ apart are to be resolved in data sampled at $1\,\mathrm{kHz}$. Estimate the shortest record for the rectangular and for the Hann window.
::: solution
The rectangular window resolves tones about one to one and a half bins apart and the Hann window about two bins apart (the main lobe of each tone must not swallow the other). Bins of width $3/1.5 = 2\,\mathrm{Hz}$ (rectangular) need $T_{\mathrm{rec}} = 0.5\,\mathrm{s}$, $N = 500$; bins of $1.5\,\mathrm{Hz}$ (Hann) need $T_{\mathrm{rec}} \approx 0.67\,\mathrm{s}$, $N \approx 667$, in practice $1024$. Zero padding would not help.
:::
:::

::: exercise Variance of a periodogram {level=2 check="0.5"}
White Gaussian noise has variance $\sigma^2 = 2$. What is the standard deviation of a single periodogram value at a bin $0 < k < N/2$, and of the Bartlett average of $K = 16$ independent segments? (Enter the second.)
::: solution
By [[#thm-periodogram-var]], a single value has mean $\sigma^2 = 2$ and standard deviation $2$, independent of $N$. Averaging $16$ independent values divides the variance by $16$ and the standard deviation by $4$: $0.5$.
:::
:::

::: exercise Noise floor of a 16-bit converter {level=2 check="98+10*log10(32768)"}
A 16-bit converter has $\mathrm{SNR} = 98\,\mathrm{dB}$ for a full-scale sine. How far below the tone (in dB) does the noise floor of a $65\,536$-point rectangular-window FFT lie?
::: solution
By [[#eq-processing-gain]], $98 + 10\log_{10}32\,768 = 98 + 45.2 = 143.2\,\mathrm{dB}$. With a Hann window the floor rises by $10\log_{10}1.5 = 1.8\,\mathrm{dB}$ relative to the tone, to $141.4\,\mathrm{dB}$ below it.
:::
:::

::: exercise Welch record length {level=2 check="51200"}
How many samples does a Welch estimate with $K = 99$ segments of $N = 1024$ samples and $50\%$ overlap need?
::: solution
With hop $D = 512$: $(K - 1)D + N = 98\times512 + 1024 = 51\,200$ samples. Without overlap, $99\times1024 = 101\,376$.
:::
:::

::: exercise Coherent sampling {level=2 check="41*1e6/4096"}
A converter sampling at $1\,\mathrm{MHz}$ is tested with a $4096$-point FFT and a tone near $10\,\mathrm{kHz}$. Choose a coherent test frequency $f_0 = Jf_s/N$ with $J$ odd and as close as possible to $10\,\mathrm{kHz}$, and enter it in hertz.
::: solution
$10\,000\times4096/10^6 = 40.96$, so the nearest odd integer is $J = 41$: $f_0 = 41\times10^6/4096 = 10\,009.77\,\mathrm{Hz}$. Exactly $41$ periods fit in the record, the tone falls on bin $41$, and with the rectangular window there is no leakage; because $41$ is odd and $4096$ a power of two, the $4096$ samples hit $4096$ distinct phases of the sine.
:::
:::

::: exercise Bias of the periodogram for a tone {level=3}
Let $x[n] = A\cos(\omega_0n + \phi)$ with $\phi$ uniformly distributed on $[0, 2\pi)$, so that $x$ is WSS with $R_x[m] = \tfrac{A^2}2\cos(\omega_0m)$. Use [[#thm-periodogram-mean]] to find $\E\{\hat S(e^{j\omega})\}$ for the rectangular window, and show that the peak value grows in proportion to $N$. Explain why this is consistent with $S_x$ containing delta functions.
::: hint
$S_x(e^{j\theta}) = \frac{\pi A^2}{2}\big[\delta(\theta - \omega_0) + \delta(\theta + \omega_0)\big]$ on $(-\pi, \pi]$.
:::
::: solution
Substituting the delta functions in [[#eq-periodogram-mean]] with the Fejér kernel $F_N(\omega) = \frac1N\big(\sin(N\omega/2)/\sin(\omega/2)\big)^2$ gives

$$
\E\{\hat S(e^{j\omega})\} = \frac{A^2}{4}\big[F_N(\omega - \omega_0) + F_N(\omega + \omega_0)\big].
$$

At $\omega = \omega_0$, $F_N(0) = N$, so (ignoring the small contribution of the other term) the peak is $A^2N/4$, growing linearly with $N$, while the width of the main lobe shrinks like $1/N$; the area under each lobe, $\frac{1}{2\pi}\int\frac{A^2}{4}F_N\,\dd\omega = A^2/4$, stays fixed. As $N \to \infty$ the expected periodogram tends to the delta functions of $S_x$, each carrying power $A^2/4$, a total of $A^2/2$, the power of the sinusoid. This is why a tone in an FFT plot "rises out of the noise" as $N$ grows: its peak grows as $N$ while the noise floor stays at $\sigma^2$.
:::
:::

::: exercise Design a spectrogram {level=3}
A speech signal sampled at $16\,\mathrm{kHz}$ is to be displayed (a) as a narrowband spectrogram that resolves harmonics of a voice with fundamental frequency $120\,\mathrm{Hz}$ and (b) as a wideband spectrogram that resolves individual glottal pulses. Choose Hann frame lengths and hops for each, explaining the trade-off, and estimate the number of FFTs per second in (a) with $75\%$ overlap.
::: solution
(a) To resolve harmonics $120\,\mathrm{Hz}$ apart with a Hann window (resolution about two bins), the bins should be at most about $60\,\mathrm{Hz}$ apart: $T_w \ge 1/60\,\mathrm{s} = 16.7\,\mathrm{ms}$. A frame of $30$–$40\,\mathrm{ms}$ is typical; take $N = 512$ ($32\,\mathrm{ms}$, bins $31.25\,\mathrm{Hz}$, resolution bandwidth $47\,\mathrm{Hz}$). The price is time smearing over $32\,\mathrm{ms}$, nearly four pitch periods, so individual pulses blur into horizontal harmonic lines. With $75\%$ overlap the hop is $128$ samples ($8\,\mathrm{ms}$), giving $16\,000/128 = 125$ FFTs per second.

(b) To resolve glottal pulses $8.3\,\mathrm{ms}$ apart, the frame must be shorter than a pitch period, say $3$–$5\,\mathrm{ms}$: $N = 64$ ($4\,\mathrm{ms}$, bins $250\,\mathrm{Hz}$). Harmonics are no longer resolved — the frequency resolution of about $375\,\mathrm{Hz}$ spans three harmonics — but each pulse appears as a vertical striation, and the broad formant regions show as dark bands. A hop of $16$ samples ($1\,\mathrm{ms}$) makes the striations visible. The two pictures are complementary views of the same signal, limited by the same time–frequency product.
:::
:::
