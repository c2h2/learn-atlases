A sigma–delta audio converter samples its input at several megahertz with a one-bit quantiser and delivers 24-bit words at $48\,\mathrm{kHz}$. A software radio digitises a slice of spectrum $20\,\mathrm{MHz}$ wide and then extracts a single $200\,\mathrm{kHz}$ channel at a rate ten times lower. A music player receives a $44.1\,\mathrm{kHz}$ file and must feed a $48\,\mathrm{kHz}$ loudspeaker path. In each case the sampling rate changes inside the processing chain. Systems that do this are **multirate** systems, and they are among the most economical tools in DSP: when a signal occupies only a small part of the band, lowering the rate lowers every later cost in proportion, and the filters that make the change possible can be arranged so that they never compute a sample that is about to be thrown away.

This chapter develops the two basic operations, **downsampling** and **upsampling**, and their effect on spectra; the **decimator** and **interpolator** that combine them with filters; rational sample-rate conversion; the **noble identities** and the **polyphase** decomposition that make these systems efficient; multistage designs; and finally the **two-channel filter bank**, which splits a signal into subbands and puts it back together with the aliasing cancelled. The filters themselves are the linear-phase FIR filters of [[dsp/fir-filter-design]]; the frequency-domain tools are those of [[dsp/discrete-time-systems]] and of the sampling theorem in [[signals-systems/sampling]].

## Downsampling and decimation {#sec-downsampling}

::: definition Downsampler and upsampler {#def-down-up}
The **downsampler** by an integer $M$ (written $\downarrow M$) keeps every $M$-th sample: $y[n] = x[nM]$.

The **upsampler** by an integer $L$ ($\uparrow L$) inserts $L - 1$ zeros between samples:
$$
y[n] = \begin{cases}x[n/L], & n \text{ a multiple of } L,\\ 0, & \text{otherwise}.\end{cases}
$$
Both are linear but **time-varying**: delaying the input by one sample does not delay the output of $\downarrow M$ by a whole number of samples.
:::

If $x[n]$ came from sampling $x_c(t)$ at interval $T$, then $x[nM]$ is the same signal sampled at interval $MT$. The sampling theorem tells us what to expect: unless $x_c$ is band-limited to $\pi/(MT)$, the slower sampling aliases. The discrete-time statement is exact.

::: theorem Spectrum after downsampling {#thm-downsampling}
If $y[n] = x[nM]$, then

$$
Y(e^{j\omega}) = \frac1M\sum_{k=0}^{M-1}X\big(e^{j(\omega - 2\pi k)/M}\big),\qquad Y(z) = \frac1M\sum_{k=0}^{M-1}X\big(z^{1/M}W_M^k\big),
$$ {#eq-downsampling}

where $W_M = e^{-j2\pi/M}$.
:::

::: proof
Define the intermediate sequence $x_p[n] = x[n]$ when $n$ is a multiple of $M$ and $0$ otherwise. The identity $\frac1M\sum_{k=0}^{M-1}W_M^{-kn} = 1$ if $M \mid n$ and $0$ otherwise (a sum of the $M$-th roots of unity, the orthogonality relation of [[dsp/discrete-fourier-transform#eq-orthogonality]]) gives $x_p[n] = x[n]\cdot\frac1M\sum_kW_M^{-kn}$, so

$$
X_p(z) = \sum_nx[n]\frac1M\sum_kW_M^{-kn}z^{-n} = \frac1M\sum_kX(zW_M^k).
$$

Now $y[n] = x_p[nM]$, and since $x_p$ is zero except at multiples of $M$, $Y(z) = \sum_nx_p[nM]z^{-n} = \sum_mx_p[m]z^{-m/M} = X_p(z^{1/M})$. Substituting gives [[#eq-downsampling]]; on the unit circle $z^{1/M}W_M^k = e^{j(\omega - 2\pi k)/M}$.
:::

The formula has two parts. Each copy $X(e^{j\omega/M})$ is the original spectrum **stretched** by a factor $M$ — what occupied $[0, \pi/M]$ now occupies $[0, \pi]$ — and the $M - 1$ shifted copies are its **aliases**. If $X(e^{j\omega}) = 0$ for $\pi/M \le \lvert\omega\rvert \le \pi$, the stretched copies do not overlap and $x$ can be recovered from $y$. Otherwise the tails fold back. The cure is the same as in analog sampling: low-pass filter first.

::: widget plot
f: sum(max(0, 1 - abs(x - 2*pi*m)/B), m, -1, 1); sum(max(0, 1 - abs((x - 2*pi*l)/M)/B), l, -M, M)/M
x: -pi, pi
y: 0, 1.1
sliders: M=2:1:6:1; B=1.2:0.2:3.1:0.01
piticks: true
labels: X(e^{j\omega}); Y(e^{j\omega})\ \text{after}\ \downarrow M
caption: A triangular spectrum of half-width $B$ (blue) and the spectrum after downsampling by $M$ (orange), from [[#eq-downsampling]]. Start with $M = 2$ and $B = 1.2$: since $B < \pi/2$, the stretched copy reaches $\pm2.4$ and its neighbours do not overlap it — the triangle survives, wider and lower by $1/M$. Increase $B$ beyond $\pi/M$ or increase $M$: the stretched copies overlap and add, the sum no longer returns to zero, and the shape of the original is lost. That overlap is aliasing, and no later processing can undo it.
:::

::: definition Decimator {#def-decimator}
A **decimator** by $M$ is a low-pass filter $H(z)$ followed by $\downarrow M$. Ideally $H$ has gain $1$ for $\lvert\omega\rvert < \pi/M$ and $0$ for $\pi/M \le \lvert\omega\rvert \le \pi$; in practice it is specified with a passband edge $\omega_p$ covering the band to be kept and a stopband edge $\omega_s \le \pi/M$ (or, if aliasing into the transition band is acceptable, $\omega_s \le 2\pi/M - \omega_p$).
:::

The relaxed stopband edge works because the band $\pi/M < \omega < 2\pi/M - \omega_p$ aliases onto $\omega_p < \omega < \pi/M$ after downsampling, a region that will be discarded or that contains nothing of interest. It is widely used in multistage designs.

## Upsampling and interpolation {#sec-upsampling}

::: theorem Spectrum after upsampling {#thm-upsampling}
If $y$ is $x$ upsampled by $L$, then $Y(z) = X(z^L)$ and

$$
Y(e^{j\omega}) = X(e^{j\omega L}).
$$ {#eq-upsampling}
:::

::: proof
$Y(z) = \sum_ny[n]z^{-n} = \sum_mx[m]z^{-mL} = X(z^L)$, because only the samples $n = mL$ are non-zero.
:::

The spectrum is **compressed** by $L$: one period of $X$ now occupies $2\pi/L$, so the interval $[-\pi, \pi]$ contains $L$ copies — the baseband copy around $\omega = 0$ and $L - 1$ **images** around $2\pi k/L$. Zero insertion creates no aliasing and loses no information, but the images are spurious high-frequency content (the zeros make the waveform spiky). Removing them is the job of the interpolation filter.

::: definition Interpolator {#def-interpolator}
An **interpolator** by $L$ is $\uparrow L$ followed by a low-pass filter $G(z)$ with cut-off $\pi/L$ and passband gain $L$.
:::

The gain $L$ is needed because zero insertion spreads the energy of each input sample over $L$ output samples: after filtering only one of the $L$ spectral copies remains, with height $1$ instead of $L$ copies summing to the signal. In the time domain, an ideal interpolation filter $g[n] = \operatorname{sinc}$-like with $g[0] = 1$ and $g[kL] = 0$ for $k \ne 0$ passes the original samples through unchanged and fills the zeros with band-limited interpolated values — the digital version of the reconstruction formula of [[signals-systems/sampling]]. Linear interpolation is the special case $g = \{1/L, 2/L, \dots, 1, \dots, 1/L\}$, a triangular filter that suppresses images only modestly.

::: widget plot
f: sum(max(0, 1 - abs(L*x - 2*pi*m)/B), m, -L, L)
x: -pi, pi
y: 0, 1.1
sliders: L=3:1:6:1; B=2.5:0.5:3.1:0.01
piticks: true
labels: Y(e^{j\omega}) = X(e^{j\omega L})
caption: The spectrum after upsampling by $L$ a signal whose spectrum is a triangle of half-width $B$. The baseband copy now has half-width $B/L$, and $L - 1$ images appear centred on $\pm2\pi/L, \pm4\pi/L, \dots$. An interpolation filter with cut-off $\pi/L$ and gain $L$ keeps only the central copy. Reduce $B$: gaps open between the copies, so a filter with a gentle transition band suffices — oversampled signals are cheap to interpolate. With $B$ close to $\pi$ the copies touch and the filter must be very sharp.
:::

::: quiz
A signal sampled at $8\,\mathrm{kHz}$ is upsampled by $L = 3$ by zero insertion, without filtering. At which frequencies (in the new $24\,\mathrm{kHz}$ rate) does a $1\,\mathrm{kHz}$ tone now appear?
- [ ] Only at $1\,\mathrm{kHz}$
- [ ] At $1$ and $3\,\mathrm{kHz}$
- [x] At $1$, $7$ and $9\,\mathrm{kHz}$
- [ ] At $3$, $6$ and $9\,\mathrm{kHz}$
::: solution
By [[#eq-upsampling]] the spectrum repeats every $8\,\mathrm{kHz}$ on the new axis: the tone at $\pm1\,\mathrm{kHz}$ gives images at $8 \pm 1$ and $16 \pm 1\,\mathrm{kHz}$; folded into $0$–$12\,\mathrm{kHz}$ these are $1$, $7$, $9\,\mathrm{kHz}$ (since $15$ and $17$ fold to $9$ and $7$). An interpolation filter with cut-off $4\,\mathrm{kHz}$ removes the images.
:::
:::

## Rational rate conversion {#sec-rational}

A change of rate by a rational factor $L/M$ is an interpolation by $L$ followed by a decimation by $M$. The interpolation filter and the decimation filter are adjacent and run at the same intermediate rate $Lf_s$, so they merge into a single low-pass filter with

$$
\text{cut-off } \omega_c = \min\Big(\frac\pi L, \frac\pi M\Big),\qquad \text{gain } L .
$$ {#eq-rational}

The order matters: upsampling first preserves the full band; decimating first would discard information. To convert $44.1\,\mathrm{kHz}$ to $48\,\mathrm{kHz}$, reduce $48\,000/44\,100 = 160/147$ ($\gcd = 300$): $L = 160$, $M = 147$. The intermediate rate is $160\times44.1\,\mathrm{kHz} = 7.056\,\mathrm{MHz}$, and the filter must pass $0$–$20\,\mathrm{kHz}$ and reject everything above $22.05\,\mathrm{kHz}$ — a transition of $2.05\,\mathrm{kHz}$ at $7.056\,\mathrm{MHz}$, about $0.03\%$ of the rate, so its length is in the thousands. Computed naively, the cost would be absurd; the next section shows that almost all of it can be avoided.

## Noble identities and polyphase structures {#sec-polyphase}

Filtering followed by downsampling computes $M$ outputs and throws away $M - 1$ of them. Zero insertion followed by filtering multiplies mostly by zeros. Both wastes are removed by moving the filters to the low-rate side.

::: theorem Noble identities {#thm-noble}
For any $G(z)$:

1. $G(z^M)$ followed by $\downarrow M$ is equivalent to $\downarrow M$ followed by $G(z)$;
2. $\uparrow L$ followed by $G(z^L)$ is equivalent to $G(z)$ followed by $\uparrow L$.
:::

::: proof
(1) Let $V(z) = G(z^M)X(z)$. By [[#eq-downsampling]], the output is $\frac1M\sum_kG\big((z^{1/M}W_M^k)^M\big)X(z^{1/M}W_M^k) = G(z)\frac1M\sum_kX(z^{1/M}W_M^k)$, because $(z^{1/M}W_M^k)^M = zW_M^{kM} = z$. That is $G(z)$ applied to the downsampled $x$. (2) By [[#eq-upsampling]], the left side gives $G(z^L)X(z^L)$ and the right side gives $(GX)(z^L)$, which is the same.
:::

A filter in $z^M$ has non-zero coefficients only every $M$ samples, so the identities apply to pieces of a filter once it has been split into such pieces.

::: definition Polyphase decomposition {#def-polyphase}
The **type-1 polyphase decomposition** of $H(z) = \sum_nh[n]z^{-n}$ into $M$ components is

$$
H(z) = \sum_{k=0}^{M-1}z^{-k}E_k(z^M),\qquad E_k(z) = \sum_nh[nM + k]z^{-n} .
$$ {#eq-polyphase}

The $k$-th **polyphase component** $e_k[n] = h[nM + k]$ collects every $M$-th coefficient starting at $h[k]$.
:::

Combining the two results gives the **polyphase decimator**. Substitute [[#eq-polyphase]] into the decimator $H(z)$ followed by $\downarrow M$: each branch is $z^{-k}$ then $E_k(z^M)$ then $\downarrow M$, and by the first noble identity $E_k(z^M)$ followed by $\downarrow M$ becomes $\downarrow M$ followed by $E_k(z)$. The structure is a delay chain (equivalently a commutator) that deals the input samples round $M$ branches, a short filter $E_k$ in each branch running at the output rate, and an adder. Every multiplication now produces a sample that is kept. Each $E_k$ has about $N/M$ taps for a prototype of length $N$, so the cost is $N$ multiplications per *output* sample, i.e. $N/M$ per input sample: an $M$-fold saving. The **polyphase interpolator** is the transpose: $L$ short filters run at the input rate, and their outputs are interleaved by a commutator, so no multiplication by an inserted zero is ever performed.

For rational conversion the same idea selects, for each output sample, the one polyphase branch (of the $L$-component decomposition of the merged filter) that lines up with it, and evaluates only that branch: the $44.1 \to 48\,\mathrm{kHz}$ converter costs $N/L$ multiplications per output sample, a few tens, however long the prototype.

::: example A polyphase decimator {#ex-polyphase}
A decimator by $M = 3$ uses the $9$-tap filter $h = \{h_0, h_1, \dots, h_8\}$. Write the polyphase components, draw the structure in words, and compare the multiplication rates with the direct implementation for an input at $48\,\mathrm{kHz}$.
::: solution
By [[#eq-polyphase]] with $M = 3$: $E_0(z) = h_0 + h_3z^{-1} + h_6z^{-2}$, $E_1(z) = h_1 + h_4z^{-1} + h_7z^{-2}$, $E_2(z) = h_2 + h_5z^{-1} + h_8z^{-2}$, so $H(z) = E_0(z^3) + z^{-1}E_1(z^3) + z^{-2}E_2(z^3)$.

**Structure.** The input $x[n]$ feeds a chain of two delays. Branch $k$ takes $x[n - k]$, downsamples it by $3$ (giving $x[3m - k]$) and filters it with the three-tap $E_k$ at $16\,\mathrm{kHz}$; the three branch outputs are added to give $y[m]$. Check one output: $y[m] = \sum_ih_ix[3m - i]$, and the branch sums give $\sum_jh_{3j}x[3m - 3j] + \sum_jh_{3j+1}x[3m - 1 - 3j] + \sum_jh_{3j+2}x[3m - 2 - 3j]$, the same nine terms.

**Cost.** Direct: $9$ multiplications per input sample, $9\times48\,000 = 432\,000$ per second, two thirds of them wasted. Polyphase: $9$ per output sample, $9\times16\,000 = 144\,000$ per second, three times fewer. (Exploiting symmetry of a linear-phase $h$ halves the direct cost but is harder to combine with the polyphase split; the polyphase saving is the larger one.)
:::
:::

::: example Cost of a 44.1 to 48 kHz converter {#ex-src-cost}
The converter of [[#sec-rational]] ($L = 160$, $M = 147$) must pass $0$–$20\,\mathrm{kHz}$ with $\delta_p = 0.001$ and reject images and aliases by $80\,\mathrm{dB}$ ($\delta_s = 10^{-4}$) from $22.05\,\mathrm{kHz}$. Estimate the length of the merged filter and the multiplications per second of a direct implementation and of a polyphase one.
::: solution
At the intermediate rate $7.056\,\mathrm{MHz}$, the transition $20$–$22.05\,\mathrm{kHz}$ is $\Delta\omega = 2\pi\times2050/7.056\times10^6 = 1.825\times10^{-3}\,\mathrm{rad/sample}$. With [[dsp/fir-filter-design#eq-pm-order]], $-10\log_{10}(10^{-7}) - 13 = 57$ and $M \approx 57/(2.324\times1.825\times10^{-3}) = 13\,436$: about $13\,437$ taps.

**Direct.** Computing every intermediate sample costs $13\,437\times7.056\times10^6 = 9.5\times10^{10}$ multiplications per second, for an output of which only one sample in $147$ is kept, and most of whose inputs are inserted zeros.

**Polyphase.** Split the filter into $L = 160$ components of $\lceil13\,437/160\rceil = 84$ taps. Each output sample $y[m]$ corresponds to intermediate index $147m$; it needs only the component $k = 147m \bmod 160$, applied to the $84$ most recent *input* samples. The cost is $84$ multiplications per output sample, $84\times48\,000 = 4.0\times10^6$ per second — over $20\,000$ times less, and well within a small processor. The full $13\,437$ coefficients must still be stored (or computed on the fly from a smaller table by interpolation, as many converters do).
:::
:::

::: warning Decimation is not just taking every $M$-th sample
Throwing away samples without first filtering aliases every component between $\pi/M$ and $\pi$ into the new band, irreversibly. In code, `y = x[::M]` is downsampling, not decimation. Equally, an interpolation filter needs gain $L$; forgetting it leaves the output $L$ times (or $20\log_{10}L$ decibels) too small. And because $\downarrow M$ is time-varying, it cannot be moved freely through a filter: only the noble identities, with $G(z^M)$, allow it.
:::

::: quiz
Which of these systems is equivalent to "filter with $G(z) = 1 + 2z^{-1}$, then downsample by $3$"?
- [ ] Downsample by $3$, then filter with $1 + 2z^{-3}$
- [ ] Downsample by $3$, then filter with $1 + 2z^{-1}$
- [x] Neither: the noble identity needs the filter to be a function of $z^3$, which $1 + 2z^{-1}$ is not
- [ ] Both of the above
::: solution
The first noble identity moves $G(z^M)$ across $\downarrow M$, turning it into $G(z)$. Here $1 + 2z^{-1}$ is not of the form $G(z^3)$; the correct efficient form uses the polyphase components $E_0 = 1$, $E_1 = 2$, $E_2 = 0$: $y[m] = x[3m] + 2x[3m - 1]$. "Downsample then filter with $1 + 2z^{-1}$" would give $x[3m] + 2x[3m - 3]$, a different system.
:::
:::

## Multistage design {#sec-multistage}

When $M$ is large, a single decimation filter must have a transition band that is narrow compared with the *input* rate, and FIR length grows as the inverse of the transition width. Splitting $M = M_1M_2$ into two stages helps because the first stage needs only to protect the band that will survive the second: its transition band can be wide. The second stage, which has the sharp transition, runs at the reduced rate, so its many taps are computed rarely.

::: example A two-stage decimator {#ex-multistage}
A signal sampled at $128\,\mathrm{kHz}$ is to be decimated by $16$ to $8\,\mathrm{kHz}$, keeping $0$–$3.4\,\mathrm{kHz}$ with passband ripple $\delta_p = 0.01$ and suppressing aliases by $60\,\mathrm{dB}$ ($\delta_s = 0.001$, stopband from $4\,\mathrm{kHz}$). Compare a single stage with two stages $8\times2$, using the order estimate [[dsp/fir-filter-design#eq-pm-order]] and counting multiplications per second in polyphase form.
::: solution
**One stage.** Transition $3.4$–$4\,\mathrm{kHz}$ at $128\,\mathrm{kHz}$: $\Delta\omega = 2\pi\times600/128\,000 = 0.02945$. Then $M \approx \big(-10\log_{10}(10^{-5}) - 13\big)/(2.324\times0.02945) = 37/0.06845 = 541$, about $542$ taps. In polyphase form it costs $542$ multiplications per output sample: $542\times8000 = 4.34\times10^6$ per second.

**Two stages.** Each stage gets half the passband ripple, $\delta_p = 0.005$, so that the cascade still meets $0.01$; both keep $\delta_s = 0.001$, and $-10\log_{10}(5\times10^{-6}) - 13 = 40.0$.

- *Stage 1*, $128 \to 16\,\mathrm{kHz}$ ($M_1 = 8$): it must keep $0$–$3.4\,\mathrm{kHz}$ and remove whatever would alias into $0$–$4\,\mathrm{kHz}$ at the final rate. After this stage the rate is $16\,\mathrm{kHz}$, and stage 2 will remove $4$–$8\,\mathrm{kHz}$; so stage 1 need only reject components that fold onto $0$–$4\,\mathrm{kHz}$, i.e. those above $16 - 4 = 12\,\mathrm{kHz}$. Transition $3.4$–$12\,\mathrm{kHz}$: $\Delta\omega = 2\pi\times8600/128\,000 = 0.4222$, order $40.0/(2.324\times0.4222) = 40.8$, so $42$ taps; cost $42\times16\,000 = 0.67\times10^6$ per second.
- *Stage 2*, $16 \to 8\,\mathrm{kHz}$ ($M_2 = 2$): transition $3.4$–$4\,\mathrm{kHz}$ at $16\,\mathrm{kHz}$: $\Delta\omega = 0.2356$, order $40.0/(2.324\times0.2356) = 73.1$, so $75$ taps; cost $75\times8000 = 0.60\times10^6$ per second.

The total is $1.27\times10^6$ multiplications per second, $3.4$ times fewer than one stage, with $117$ coefficients instead of $542$. Trying the other splits shows why the large factor should come first: $4\times4$ costs $(16\times32\,000) + (148\times8000) = 1.70\times10^6$, and $2\times8$ costs $(8\times64\,000) + (294\times8000) = 2.86\times10^6$, because its sharp second stage must make the narrow $600\,\mathrm{Hz}$ transition relative to a $64\,\mathrm{kHz}$ input rate.
:::
:::

Two special filters make the stages even cheaper. A **half-band filter** (for $M = 2$) is a linear-phase FIR filter with $\omega_p + \omega_s = \pi$ and $\delta_p = \delta_s$; its response satisfies $H(e^{j\omega}) + H(e^{j(\pi - \omega)}) = 1$ (up to the delay), which forces every second coefficient to zero apart from the centre one, halving the multiplications again. A **cascaded integrator–comb (CIC) filter** of order $N$ and rate change $R$, $H(z) = \big((1 - z^{-R})/(1 - z^{-1})\big)^N$, is $N$ running sums; built as $N$ integrators at the high rate and $N$ differences (combs) at the low rate after the noble identity, it needs no multiplications at all, only additions with $N\log_2R$ extra bits of word growth. CIC filters do the first, very large rate reductions in sigma–delta converters and digital down-converters; a short FIR filter after them corrects their drooping passband.

## Two-channel filter banks {#sec-filter-banks}

A **filter bank** splits a signal into subbands, each of which can be processed, coded with its own number of bits or transmitted at its own reduced rate, and then recombines them. The basic building block has two channels.

The **analysis bank** applies a low-pass filter $H_0(z)$ and a high-pass filter $H_1(z)$, each followed by $\downarrow 2$, so the total rate is unchanged. The **synthesis bank** upsamples each channel by $2$, filters with $F_0(z)$ and $F_1(z)$, and adds. Because neither $H_0$ nor $H_1$ is an ideal half-band filter, each channel aliases. The question is whether the synthesis can cancel the aliasing.

::: theorem Alias cancellation and distortion in a two-channel bank {#thm-two-channel}
The output of the two-channel bank is

$$
\hat X(z) = T(z)X(z) + A(z)X(-z),
$$ {#eq-two-channel}

with the **distortion function** $T(z) = \tfrac12\big[H_0(z)F_0(z) + H_1(z)F_1(z)\big]$ and the **alias function** $A(z) = \tfrac12\big[H_0(-z)F_0(z) + H_1(-z)F_1(z)\big]$. The choice

$$
F_0(z) = H_1(-z),\qquad F_1(z) = -H_0(-z)
$$ {#eq-alias-cancel}

makes $A(z) = 0$ for any $H_0$, $H_1$. If in addition $T(z) = cz^{-d}$, the bank has **perfect reconstruction**: $\hat x[n] = cx[n - d]$.
:::

::: proof
For $M = 2$, [[#eq-downsampling]] followed by [[#eq-upsampling]] gives: $\downarrow2$ then $\uparrow2$ maps $V(z)$ to $\tfrac12[V(z) + V(-z)]$ (the down-up pair keeps the even samples and zeros the odd ones, and $\tfrac12[V(z) + V(-z)] = \sum_{n\ \mathrm{even}}v[n]z^{-n}$). With $V_i = H_iX$, channel $i$ contributes $\tfrac12F_i(z)[H_i(z)X(z) + H_i(-z)X(-z)]$. Adding the two channels gives [[#eq-two-channel]]. Substituting [[#eq-alias-cancel]] into $A$: $\tfrac12[H_0(-z)H_1(-z) - H_1(-z)H_0(-z)] = 0$.
:::

The original **quadrature mirror filter** (QMF) bank of Croisier, Esteban and Galand takes $H_1(z) = H_0(-z)$, a high-pass filter that mirrors the low-pass one about $\omega = \pi/2$. With [[#eq-alias-cancel]] this gives $T(z) = \tfrac12[H_0^2(z) - H_0^2(-z)]$. With linear-phase FIR $H_0$ this can be made very nearly, but (except for trivial filters) not exactly, a pure delay; orthogonal and biorthogonal designs relax $H_1 = H_0(-z)$ and achieve perfect reconstruction exactly, which is the starting point of wavelets.

::: example The Haar filter bank {#ex-haar}
Take $H_0(z) = (1 + z^{-1})/\sqrt2$ and $H_1(z) = H_0(-z) = (1 - z^{-1})/\sqrt2$, with the synthesis filters of [[#eq-alias-cancel]]. Find $T(z)$ and describe what each channel computes.
::: solution
$F_0(z) = H_1(-z) = (1 + z^{-1})/\sqrt2$ and $F_1(z) = -H_0(-z) = -(1 - z^{-1})/\sqrt2$. Then

$$
T(z) = \tfrac12\Big[\tfrac12(1 + z^{-1})^2 - \tfrac12(1 - z^{-1})^2\Big] = \tfrac14\big[4z^{-1}\big] = z^{-1} .
$$

The aliasing cancels by construction and the distortion is a one-sample delay: perfect reconstruction. The low-pass channel computes the scaled pair sums $(x[2m] + x[2m - 1])/\sqrt2$ and the high-pass channel the pair differences $(x[2m] - x[2m - 1])/\sqrt2$, at half the rate. From the sum and difference of each pair, the pair is recovered exactly. The filters are poor frequency splitters (their responses $\sqrt2\cos(\omega/2)$ and $\sqrt2\sin(\omega/2)$ overlap heavily), yet the bank is perfect: the aliasing in each channel is cancelled by the other.
:::
:::

::: application Filter banks in practice
MP3 and AAC audio coders split audio into $32$ subbands with a pseudo-QMF polyphase filter bank, or into hundreds of frequency lines with the modified discrete cosine transform (MDCT), an orthogonal lapped transform with perfect reconstruction; bits are then allocated to each band according to a model of hearing. JPEG 2000 compresses images with iterated two-channel biorthogonal wavelet banks applied along rows and columns. Digital radio receivers and 5G base stations use **DFT filter banks** — a polyphase decimator followed by an FFT — to separate hundreds of channels at once at roughly the cost of one channel filter plus one FFT per block, and the OFDM modulation of Wi-Fi and LTE can be viewed as a synthesis filter bank whose filters are rectangular windows.
:::

::: history
Sample-rate change was first analysed in the context of sampled-data control and of speech processing in the 1960s; Ronald Schafer and Lawrence Rabiner's 1973 paper on digital interpolation and Ronald Crochiere and Rabiner's work on optimal multistage decimation (1975) and their book *Multirate Digital Signal Processing* (1983) established the field. Maurice Bellanger and colleagues introduced polyphase networks for digital filtering in 1976. Alain Croisier, Daniel Esteban and Claude Galand presented quadrature mirror filters for subband speech coding in 1976. Perfect-reconstruction two-channel banks were found by Mark Smith and Thomas Barnwell (1984) and by Fred Mintzer (1985), and P. P. Vaidyanathan unified the theory of $M$-channel banks with paraunitary polyphase matrices in the late 1980s. Eugene Hogenauer published the CIC filter in 1981. Ingrid Daubechies's compactly supported orthogonal wavelets (1988) turned out to be iterated perfect-reconstruction filter banks.
:::

## Where this leads

Multirate techniques are everywhere a signal crosses a boundary between rates: in sigma–delta and oversampling converters ([[electronics-2/data-converters]]), in the digital down-converters of communication receivers ([[communication-systems]]), and in audio and image coding. Spectral analysis with a bank of bandpass filters — the short-time Fourier transform of [[dsp/spectral-analysis]] — is exactly a DFT filter bank with decimation, and its trade-off between time and frequency resolution is the trade-off between the length of the polyphase filters and the decimation factor.

::: summary
- Downsampling by $M$ stretches the spectrum by $M$ and adds $M - 1$ aliases, [[#eq-downsampling]]; a decimator filters to $\pi/M$ first.
- Upsampling by $L$ compresses the spectrum and creates $L - 1$ images, [[#eq-upsampling]]; an interpolator removes them with a low-pass filter of cut-off $\pi/L$ and gain $L$.
- Rate change by $L/M$ is interpolation by $L$ then decimation by $M$, with one merged filter of cut-off $\min(\pi/L, \pi/M)$.
- The noble identities move a filter in $z^M$ across a rate changer; with the polyphase decomposition they make decimators and interpolators compute only samples that are kept, saving a factor of $M$ or $L$.
- Large rate changes are cheapest in several stages, with the largest factor first, half-band filters for factors of two and CIC filters for the first large reduction.
- In a two-channel filter bank, choosing $F_0(z) = H_1(-z)$ and $F_1(z) = -H_0(-z)$ cancels aliasing; perfect reconstruction further needs $T(z)$ to be a delay, as in the Haar bank.
:::

## Exercises

::: exercise Decimation cut-off {level=1 check="6000"}
A $48\,\mathrm{kHz}$ signal is decimated by $4$. What is the ideal cut-off of the decimation filter, in rad/sample and in hertz? (Enter hertz.)
::: solution
$\omega_c = \pi/4$, which at $48\,\mathrm{kHz}$ is $\frac{\pi/4}{2\pi}\times48\,000 = 6000\,\mathrm{Hz}$, the Nyquist frequency of the new $12\,\mathrm{kHz}$ rate.
:::
:::

::: exercise Conversion factors {level=1 check="160"}
Find the smallest integers $L$ and $M$ for converting $44.1\,\mathrm{kHz}$ to $48\,\mathrm{kHz}$, and the cut-off of the merged filter at the intermediate rate. (Enter $L$.)
::: solution
$48\,000/44\,100 = 480/441 = 160/147$, so $L = 160$, $M = 147$. The cut-off is $\min(\pi/160, \pi/147) = \pi/160$ at the intermediate rate $7.056\,\mathrm{MHz}$, i.e. $22.05\,\mathrm{kHz}$: the Nyquist frequency of the lower of the two rates.
:::
:::

::: exercise Polyphase components {level=1}
Write the polyphase components for $M = 2$ of $h = \{1, 2, 3, 4, 5, 6\}$ and check that $H(z) = E_0(z^2) + z^{-1}E_1(z^2)$.
::: solution
$E_0(z) = 1 + 3z^{-1} + 5z^{-2}$, $E_1(z) = 2 + 4z^{-1} + 6z^{-2}$. Then $E_0(z^2) + z^{-1}E_1(z^2) = 1 + 3z^{-2} + 5z^{-4} + 2z^{-1} + 4z^{-3} + 6z^{-5} = 1 + 2z^{-1} + 3z^{-2} + 4z^{-3} + 5z^{-4} + 6z^{-5}$.
:::
:::

::: exercise Polyphase savings {level=2 check="16e6"}
A $64$-tap FIR decimation filter reduces a $1\,\mathrm{MHz}$ sample stream by $4$. How many multiplications per second does the polyphase implementation need, and how many does the direct one?
::: solution
Direct: $64$ per input sample, $64\times10^6$ per second. Polyphase: four $16$-tap branches at $250\,\mathrm{kHz}$, i.e. $64$ per output sample, $64\times250\,000 = 16\times10^6$ per second.
:::
:::

::: exercise Downsampling by two {level=2}
Show directly from the definition that downsampling by $2$ gives $Y(z) = \tfrac12\big[X(z^{1/2}) + X(-z^{1/2})\big]$, and find $Y$ when $x[n] = a^nu[n]$.
::: solution
$\tfrac12[X(w) + X(-w)] = \sum_nx[n]\tfrac12(1 + (-1)^n)w^{-n} = \sum_{n\ \mathrm{even}}x[n]w^{-n}$. Putting $w = z^{1/2}$ and $n = 2m$: $\sum_mx[2m]z^{-m} = Y(z)$. For $x[n] = a^nu[n]$, $y[m] = a^{2m}u[m]$, so $Y(z) = 1/(1 - a^2z^{-1})$. Check with the formula: $\tfrac12\Big[\frac{1}{1 - az^{-1/2}} + \frac{1}{1 + az^{-1/2}}\Big] = \frac{1}{1 - a^2z^{-1}}$.
:::
:::

::: exercise CIC word growth {level=2 check="4096"}
A third-order CIC decimator ($N = 3$) reduces the rate by $R = 16$. Find its DC gain and the number of extra bits its registers need.
::: solution
$H(1) = \lim_{z\to1}\big((1 - z^{-R})/(1 - z^{-1})\big)^N = R^N = 16^3 = 4096$, i.e. $N\log_2R = 12$ extra bits. With a $14$-bit input the registers need $26$ bits; two's-complement wrap-around in the integrators is harmless because the combs subtract it out, provided the registers are wide enough for the final result.
:::
:::

::: exercise Interpolation filter specification {level=2}
A $16\,\mathrm{kHz}$ speech signal with content up to $7\,\mathrm{kHz}$ is to be interpolated by $3$ to $48\,\mathrm{kHz}$. Give the passband and stopband edges and the passband gain of the interpolation filter, in hertz at the $48\,\mathrm{kHz}$ rate. What would be the effect of a stopband starting at $9\,\mathrm{kHz}$ instead?
::: solution
After zero insertion the images are centred at $16$ and $32\,\mathrm{kHz}$; the first image occupies $16 - 7 = 9$ to $16 + 7 = 23\,\mathrm{kHz}$. The filter must pass $0$–$7\,\mathrm{kHz}$ with gain $3$ and reject from $9\,\mathrm{kHz}$ — which is already the edge of the first image. A stopband from $8\,\mathrm{kHz}$ (the old Nyquist frequency, $\pi/3$ at the new rate) is the conventional choice; a stopband from $9\,\mathrm{kHz}$ is also valid here, because nothing lies between $7$ and $9\,\mathrm{kHz}$, and widens the transition from $1$ to $2\,\mathrm{kHz}$, halving the filter length.
:::
:::

::: exercise Alias cancellation {level=3}
For the QMF bank with $H_1(z) = H_0(-z)$ and synthesis filters [[#eq-alias-cancel]], show that $T(e^{j\omega}) = \tfrac12[H_0^2(e^{j\omega}) - H_0^2(e^{j(\omega - \pi)})]$, and that if $H_0$ is a linear-phase FIR filter of odd order $N$ with amplitude $A(\omega)$, then $\lvert T\rvert = \tfrac12\big(A^2(\omega) + A^2(\pi - \omega)\big)$. What condition on $A$ gives a flat overall response?
::: hint
Write $H_0(e^{j\omega}) = A(\omega)e^{-j\omega N/2}$ and evaluate $e^{-j(\omega - \pi)N}$ for odd $N$.
:::
::: solution
$T(z) = \tfrac12[H_0(z)F_0(z) + H_1(z)F_1(z)] = \tfrac12[H_0(z)H_0(z) - H_0(-z)H_0(-z)]$, and $-z = e^{j(\omega - \pi)}$ on the circle. With $H_0 = Ae^{-j\omega N/2}$, $H_0^2(e^{j\omega}) = A^2(\omega)e^{-j\omega N}$ and $H_0^2(e^{j(\omega - \pi)}) = A^2(\omega - \pi)e^{-j(\omega - \pi)N} = -A^2(\pi - \omega)e^{-j\omega N}$ for odd $N$ (using $e^{j\pi N} = -1$ and $A$ even). Hence $T = \tfrac12e^{-j\omega N}\big(A^2(\omega) + A^2(\pi - \omega)\big)$: linear phase, with magnitude $\tfrac12(A^2(\omega) + A^2(\pi - \omega))$. The response is flat if $A^2(\omega) + A^2(\pi - \omega) = 2$ — a **power-complementary** pair. Linear-phase FIR filters (other than the Haar filter) can satisfy this only approximately, which is why QMF banks with linear-phase filters have small amplitude ripple.
:::
:::

::: exercise Design a multistage decimator {level=3 check="1080000"}
A $100\,\mathrm{kHz}$ signal is to be decimated by $10$ to $10\,\mathrm{kHz}$, keeping $0$–$4\,\mathrm{kHz}$ with $\delta_p = 0.01$ and $60\,\mathrm{dB}$ alias suppression (stopband from $5\,\mathrm{kHz}$). Using [[dsp/fir-filter-design#eq-pm-order]] and polyphase implementations, compare one stage with the splits $5\times2$ and $2\times5$, giving each stage half the passband ripple. Enter the multiplications per second of the best design.
::: solution
**One stage:** $\Delta\omega = 2\pi\times1000/100\,000 = 0.0628$, order $37/(2.324\times0.0628) = 253.4$, $255$ taps, $255\times10\,000 = 2.55\times10^6$ per second.

**$5\times2$:** stage 1 ($100 \to 20\,\mathrm{kHz}$) keeps $0$–$4\,\mathrm{kHz}$ and rejects above $20 - 5 = 15\,\mathrm{kHz}$: $\Delta\omega = 2\pi\times11/100 = 0.691$, order $40.0/(2.324\times0.691) = 24.9$, $26$ taps, $26\times20\,000 = 0.52\times10^6$. Stage 2 ($20 \to 10\,\mathrm{kHz}$): $\Delta\omega = 2\pi\times1/20 = 0.314$, order $54.8$, $56$ taps, $56\times10\,000 = 0.56\times10^6$. Total $1.08\times10^6$.

**$2\times5$:** stage 1 ($100 \to 50\,\mathrm{kHz}$) rejects above $45\,\mathrm{kHz}$: order $6.7$, $8$ taps, $8\times50\,000 = 0.40\times10^6$. Stage 2 ($50 \to 10\,\mathrm{kHz}$): $\Delta\omega = 2\pi/50 = 0.126$, order $137.0$, so $M = 138$ and $139$ taps, $139\times10\,000 = 1.39\times10^6$. Total $1.79\times10^6$.

The $5\times2$ split is best, $2.4$ times cheaper than one stage — again the larger factor first.
:::
:::
