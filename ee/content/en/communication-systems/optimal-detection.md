A receiver for digital signals does not need to reproduce the waveform it receives. It needs to answer one question per symbol: *which of the $M$ possible signals was sent?* Noise makes the answer uncertain, so the question becomes one of statistical decision, and it has a precise optimal solution. For additive white Gaussian noise the solution is remarkably simple. Correlate the received signal with each basis function (or, equivalently, pass it through a **matched filter** and sample), plot the resulting point in the signal space of [[communication-systems/digital-modulation]], and choose the nearest constellation point. Everything else — the error probability of every modulation, the $E_b/N_0$ needed for a given bit error rate, the comparison of coherent and noncoherent receivers — follows from distances in that space and the Gaussian tail function $Q$.

This lesson derives that receiver from first principles. We show that projecting onto the signal space loses nothing, that the maximum a posteriori and maximum-likelihood rules reduce to thresholds and minimum distance, and that the probability of error between two signals is $Q(d/\sqrt{2N_0})$. From this one formula we compute the bit and symbol error rates of BPSK, QPSK, M-PSK, QAM and FSK, quote the results for noncoherent receivers, and show how these numbers enter a link design. The matched filter itself was derived in [[random-signals/optimal-filtering]] as the filter that maximises output SNR; here it reappears as part of the optimal decision rule.

## The detection problem {#sec-problem}

During one symbol interval $[0, T)$ the transmitter sends $s_m(t)$, one of $M$ known signals, with **prior probability** $\pi_m$ (usually $1/M$). The receiver observes

$$
r(t) = s_m(t) + w(t), \qquad 0 \le t < T ,
$$ {#eq-awgn-model}

where $w(t)$ is white Gaussian noise of two-sided power spectral density $N_0/2$, independent of the signal (the AWGN channel of [[communication-systems/signals-spectra-channels#def-awgn]]). We assume perfect timing and, for coherent detection, a known carrier phase; ISI is absent (each symbol is detected on its own, as Nyquist pulses allow). A **detector** maps each received waveform to a decision $\hat m$. The quality measure is the **symbol error probability** $P_s = \Prob(\hat m \ne m)$, or the bit error probability $P_b$.

### From waveforms to vectors

The signals lie in an $N$-dimensional space with orthonormal basis $\phi_1, \dots, \phi_N$. The receiver computes the projections

$$
r_i = \int_0^Tr(t)\,\phi_i(t)\,\dd t = s_{mi} + w_i, \qquad i = 1, \dots, N ,
$$ {#eq-projection}

which form the **received vector** $\mathbf r = \mathbf s_m + \mathbf w$. The device computing them is a bank of $N$ correlators, or equivalently $N$ filters with impulse responses $\phi_i(T - t)$ sampled at $t = T$ (the matched filters of [[random-signals/optimal-filtering]]).

::: theorem Sufficient statistic for AWGN {#thm-sufficient}
The noise components $w_i = \int_0^Tw(t)\phi_i(t)\,\dd t$ are independent Gaussian random variables with zero mean and variance $N_0/2$. The part of $r(t)$ outside the signal space, $r(t) - \sum_ir_i\phi_i(t)$, is independent of $\mathbf r$ and of the transmitted symbol. Hence $\mathbf r$ is a **sufficient statistic**: an optimal decision can be based on $\mathbf r$ alone.
:::

::: proof
Each $w_i$ is a linear functional of a Gaussian process, hence Gaussian, with $\E[w_i] = 0$. Using $\E[w(t)w(u)] = \frac{N_0}{2}\delta(t - u)$,

$$
\E[w_iw_j] = \int_0^T\!\!\int_0^T\phi_i(t)\phi_j(u)\,\frac{N_0}{2}\delta(t - u)\,\dd t\,\dd u = \frac{N_0}{2}\int_0^T\phi_i(t)\phi_j(t)\,\dd t = \frac{N_0}{2}\delta_{ij} .
$$

Uncorrelated jointly Gaussian variables are independent. The remainder $w'(t) = w(t) - \sum_iw_i\phi_i(t)$ contains no signal (the signal lies entirely in the span of the $\phi_i$), and $\E[w'(t)w_j] = \frac{N_0}{2}\phi_j(t) - \frac{N_0}{2}\phi_j(t) = 0$, so it is uncorrelated with, and being jointly Gaussian independent of, every $w_j$. It therefore carries no information about which signal was sent, either directly or through $\mathbf r$, and can be discarded.
:::

This is the decisive simplification. A problem about random waveforms has become a problem about a random point in $\R^N$: a constellation point plus a spherically symmetric Gaussian cloud with variance $N_0/2$ in every direction. The noise is the same in every direction, so only distances can matter.

## Optimal decision rules {#sec-decision}

::: theorem MAP and ML detection {#thm-map}
The decision rule that minimises the probability of error is the **maximum a posteriori** (MAP) rule: choose the $m$ that maximises $\Prob(s_m \mid \mathbf r)$, equivalently

$$
\hat m = \arg\max_m\ \pi_m\,f(\mathbf r \mid s_m) .
$$ {#eq-map}

For equally likely signals this is the **maximum-likelihood** (ML) rule $\hat m = \arg\max_mf(\mathbf r \mid s_m)$. In AWGN the ML rule is the **minimum-distance** rule

$$
\hat m = \arg\min_m\ \lVert\mathbf r - \mathbf s_m\rVert^2 = \arg\max_m\Big(\mathbf r\cdot\mathbf s_m - \frac{E_m}{2}\Big) ,
$$ {#eq-min-distance}

and the MAP rule is $\hat m = \arg\max_m\big(\mathbf r\cdot\mathbf s_m - \frac{E_m}{2} + \frac{N_0}{2}\ln\pi_m\big)$.
:::

::: proof
The probability of a correct decision is $\int\Prob(\text{correct} \mid \mathbf r)f(\mathbf r)\,\dd\mathbf r$, and for each observed $\mathbf r$ the conditional probability that a decision $\hat m$ is correct is the posterior $\Prob(s_{\hat m} \mid \mathbf r)$. Choosing the largest posterior for every $\mathbf r$ maximises the integrand pointwise, hence the integral. By Bayes' rule $\Prob(s_m \mid \mathbf r) = \pi_mf(\mathbf r \mid s_m)/f(\mathbf r)$, and $f(\mathbf r)$ does not depend on $m$, giving [[#eq-map]].

By [[#thm-sufficient]], given $s_m$ the vector $\mathbf r$ is Gaussian with mean $\mathbf s_m$ and covariance $\frac{N_0}{2}\mathbf I$:

$$
f(\mathbf r \mid s_m) = (\pi N_0)^{-N/2}\exp\Big(-\frac{\lVert\mathbf r - \mathbf s_m\rVert^2}{N_0}\Big) .
$$

Maximising this is minimising $\lVert\mathbf r - \mathbf s_m\rVert^2 = \lVert\mathbf r\rVert^2 - 2\mathbf r\cdot\mathbf s_m + E_m$, and $\lVert\mathbf r\rVert^2$ is common to all $m$. With priors, take the logarithm of $\pi_mf(\mathbf r \mid s_m)$, drop the common terms and multiply by $N_0/2$.
:::

The rule divides the signal space into **decision regions**, one per signal: the region of $\mathbf s_m$ is the set of points closer to $\mathbf s_m$ than to any other signal point. For equally likely signals the boundaries are the perpendicular bisectors between neighbouring points (a **Voronoi** partition). The second form of [[#eq-min-distance]] shows that the receiver needs only the correlations $\mathbf r\cdot\mathbf s_m = \int r(t)s_m(t)\,\dd t$, corrected by half the energy; for constant-energy constellations (PSK, FSK) even that correction drops out.

::: quiz
A receiver's correlators use reference waveforms $2\phi_i(t)$ instead of $\phi_i(t)$, and the decision thresholds are scaled to match. How does its error probability compare with that of the correctly normalised receiver?
- [x] It is the same
- [ ] It is lower, because the signal components are doubled
- [ ] It is higher, because the noise variance is quadrupled
- [ ] It depends on the modulation
::: solution
Scaling the reference multiplies the signal part of every projection by $2$ and the noise part by $2$ as well (its variance by $4$). The ratio of distance to noise standard deviation, which is all that enters $Q(d/2\sigma)$, is unchanged. Only operations that treat signal and noise differently — such as integrating over the right interval and matching the pulse shape — affect performance.
:::
:::

::: warning One-sided and two-sided noise density
Throughout this lesson the noise has two-sided density $N_0/2$, so each projection has variance $\sigma^2 = N_0/2$, and all error formulas are written in $E_b/N_0$ with this $N_0$ (the one-sided density, $kT_{\mathrm{sys}}$ for thermal noise). Some texts write $\eta$ or $N_0$ for the *two-sided* density; with that convention every $E_b/N_0$ in the formulas below changes by a factor of two, i.e. $3\,\mathrm{dB}$. BPSK needing $9.6\,\mathrm{dB}$ for $P_b = 10^{-5}$ is the benchmark that tells you which convention a source uses.
:::

## Binary signalling {#sec-binary}

::: theorem Error probability of two signals {#thm-binary-pe}
Two equally likely signals separated by distance $d = \lVert\mathbf s_1 - \mathbf s_2\rVert$ in AWGN, detected by the ML rule, have error probability

$$
P_e = Q\Big(\frac{d}{2\sigma}\Big) = Q\Big(\frac{d}{\sqrt{2N_0}}\Big) = Q\Big(\sqrt{\frac{d^2}{2N_0}}\Big) ,
$$ {#eq-binary-pe}

where $Q(x) = \frac{1}{\sqrt{2\pi}}\int_x^\infty e^{-u^2/2}\,\dd u$ is the Gaussian tail probability.
:::

::: proof
The decision boundary is the perpendicular bisector of the segment from $\mathbf s_1$ to $\mathbf s_2$. Suppose $\mathbf s_1$ is sent. An error occurs when $\mathbf r = \mathbf s_1 + \mathbf w$ lies on the far side of the bisector, i.e. when the component of $\mathbf w$ along the unit vector $\mathbf u = (\mathbf s_2 - \mathbf s_1)/d$ exceeds $d/2$. Since the noise is spherically symmetric, $\mathbf w\cdot\mathbf u$ is Gaussian with mean $0$ and variance $\sigma^2 = N_0/2$, whatever the direction of $\mathbf u$. So $P_e = \Prob(\mathbf w\cdot\mathbf u > d/2) = Q(d/(2\sigma))$, and by symmetry the same holds when $\mathbf s_2$ is sent. Substituting $\sigma = \sqrt{N_0/2}$ gives $d/(2\sigma) = d/\sqrt{2N_0}$.
:::

Only the distance matters, not the shape of the signals. With the squared distances of [[communication-systems/digital-modulation]]:

| binary scheme | $d^2$ | $P_b$ |
|---|---|---|
| BPSK (antipodal) | $4E_b$ | $Q\big(\sqrt{2E_b/N_0}\big)$ |
| coherent orthogonal FSK | $2E_b$ | $Q\big(\sqrt{E_b/N_0}\big)$ |
| OOK (average energy $E_b$) | $2E_b$ | $Q\big(\sqrt{E_b/N_0}\big)$ |

The BPSK result is the benchmark of digital communication: $P_b = 10^{-5}$ requires $Q(x) = 10^{-5}$, $x = 4.265$, so $E_b/N_0 = x^2/2 = 9.09$, or $9.6\,\mathrm{dB}$. Coherent FSK and OOK need twice the energy, $12.6\,\mathrm{dB}$. As $Q(x) \approx e^{-x^2/2}/(x\sqrt{2\pi})$ for large $x$, error probabilities fall roughly exponentially in $E_b/N_0$: at high SNR, each decibel cuts the error rate by a large factor.

::: widget plot
f: log10(0.5*(1 - erf(sqrt(10^(x/10))))); log10(0.5*(1 - erf(sqrt(10^(x/10)/2)))); log10(0.5*exp(-10^(x/10)/2)); log10(0.375*(1 - erf(sqrt(0.4*10^(x/10)))))
x: 0, 16
y: -8, 0
labels: \text{BPSK, QPSK}; \text{coherent BFSK, OOK}; \text{noncoherent BFSK}; \text{16-QAM (Gray)}
caption: Bit error probability, as $\log_{10}P_b$, against $E_b/N_0$ in decibels. Read off the $E_b/N_0$ needed for $P_b = 10^{-5}$ (the line at $-5$): $9.6\,\mathrm{dB}$ for BPSK, $12.6\,\mathrm{dB}$ for coherent orthogonal BFSK (exactly $3\,\mathrm{dB}$ to the right), $13.4\,\mathrm{dB}$ for noncoherent BFSK and for 16-QAM. All the curves steepen as they fall: at $P_b = 10^{-6}$ BPSK needs only $0.9\,\mathrm{dB}$ more than at $10^{-5}$. Hover over the curves to compare the schemes at a fixed $E_b/N_0$.
:::

::: example Received power for a BPSK link {#ex-bpsk-link}
A BPSK link carries $1\,\mathrm{Mbit/s}$ and must achieve $P_b = 10^{-6}$. The receiver has a noise figure of $5\,\mathrm{dB}$ (reference temperature $290\,\mathrm{K}$). (a) Find the required $E_b/N_0$. (b) Find the required received power in dBm. (c) What received power would coherent BFSK need?
::: solution
(a) $Q(x) = 10^{-6}$ gives $x = 4.753$, so $E_b/N_0 = x^2/2 = 11.3$, i.e. $10.5\,\mathrm{dB}$.

(b) $N_0 = kT_0F$: $-174\,\mathrm{dBm/Hz} + 5\,\mathrm{dB} = -169\,\mathrm{dBm/Hz}$. The received power is $P_R = E_bR_b = (E_b/N_0)\,N_0R_b$, so in decibels

$$
P_R = 10.5 - 169 + 10\log_{10}(10^6) = 10.5 - 169 + 60 = -98.5\,\mathrm{dBm} .
$$

(c) Coherent BFSK needs $E_b/N_0 = 13.5\,\mathrm{dB}$, so $P_R = -95.5\,\mathrm{dBm}$: twice the power, which in free space means $1/\sqrt2$ of the range.
:::
:::

### Unequal priors

When one symbol is much more likely than the other, the MAP threshold moves towards the less likely symbol's point, so that ambiguous observations are attributed to the likely one.

::: example A MAP threshold {#ex-map-threshold}
Antipodal signals $\pm a$ (projections) are received in noise of variance $\sigma^2 = N_0/2$, with $\Prob(+a) = \pi_1$ and $\Prob(-a) = \pi_0$. (a) Derive the MAP threshold. (b) For $a = 1$, $E_b/N_0 = a^2/N_0 = 4$ ($6\,\mathrm{dB}$), $\pi_0 = 0.8$ and $\pi_1 = 0.2$, compare the error probabilities of the ML and MAP rules.
::: solution
(a) Decide $+a$ when $\pi_1e^{-(r - a)^2/N_0} > \pi_0e^{-(r + a)^2/N_0}$. Taking logarithms, $(r + a)^2 - (r - a)^2 = 4ar > N_0\ln(\pi_0/\pi_1)$, so the threshold is

$$
\gamma = \frac{N_0}{4a}\ln\frac{\pi_0}{\pi_1} = \frac{\sigma^2}{2a}\ln\frac{\pi_0}{\pi_1} .
$$

(b) $N_0 = 0.25$, $\sigma = 0.354$, $\gamma = \frac{0.25}{4}\ln4 = 0.0866$. ML ($\gamma = 0$): $P_e = Q(a/\sigma) = Q(2.83) = 2.34\times10^{-3}$, whatever the priors. MAP: $P_e = \pi_1Q\big((a - \gamma)/\sigma\big) + \pi_0Q\big((a + \gamma)/\sigma\big) = 0.2Q(2.583) + 0.8Q(3.073) = 1.82\times10^{-3}$, a $22\,\%$ reduction. The improvement is modest unless the priors are very unequal or the SNR is low; this is why practical receivers use the ML rule and spend effort instead on making symbols equally likely (by source coding or scrambling).
:::
:::

::: widget plot
f: p*exp(-(x - 1)^2/(2*s^2))/(s*sqrt(2*pi)); (1 - p)*exp(-(x + 1)^2/(2*s^2))/(s*sqrt(2*pi))
x: -3, 3
y: 0, 1.2
sliders: p=0.5:0.05:0.95:0.01; s=0.5:0.2:1.2:0.01
labels: \pi_1 f(r\mid +1); \pi_0 f(r\mid -1)
caption: The two weighted likelihoods for antipodal signals $\pm1$ in Gaussian noise of standard deviation $s$; $p$ is the prior probability of $+1$. The MAP rule decides for whichever curve is higher, so the threshold is where they cross. With $p = 0.5$ the crossing is at $0$ (the ML threshold). Raise $p$: the blue curve grows and the crossing moves left, towards the less likely symbol. Raise $s$: the curves overlap more, and the same priors move the threshold further, since $\gamma = (s^2/2)\ln((1 - p)/p)$.
:::

## M-ary signalling {#sec-mary}

For more than two signals the exact error probability is an integral of the Gaussian density over the complement of a decision region, which has a closed form only for special shapes. Two tools cover nearly all practical cases.

::: theorem Union bound and nearest-neighbour approximation {#thm-union}
For equally likely signals with ML detection,

$$
P_s \le \frac1M\sum_{m=1}^{M}\sum_{k \ne m}Q\Big(\frac{d_{mk}}{\sqrt{2N_0}}\Big) ,
$$ {#eq-union}

where $d_{mk} = \lVert\mathbf s_m - \mathbf s_k\rVert$. At high SNR the terms with $d_{mk} = d_{\min}$ dominate, giving the **nearest-neighbour approximation**

$$
P_s \approx \bar K\,Q\Big(\sqrt{\frac{d_{\min}^2}{2N_0}}\Big) ,
$$ {#eq-nearest}

with $\bar K$ the average number of nearest neighbours per point.
:::

::: proof
Given $s_m$, an error means that $\mathbf r$ is closer to some $\mathbf s_k$ than to $\mathbf s_m$. The probability of a union of events is at most the sum of their probabilities, and the event "closer to $\mathbf s_k$ than to $\mathbf s_m$" is a binary decision with probability $Q(d_{mk}/\sqrt{2N_0})$ by [[#thm-binary-pe]]. Average over $m$. Because $Q(x)$ behaves like $e^{-x^2/2}$ for large $x$, the terms with larger distances are smaller by factors that grow without bound as $N_0 \to 0$, which leaves only the nearest neighbours.
:::

The approximations are very accurate where it matters, as the next example shows. With Gray coding, almost every symbol error is to a neighbour and flips one bit, so $P_b \approx P_s/\log_2M$.

::: example Union bound for 8-PSK {#ex-8psk-union}
An 8-PSK signal is received at $E_s/N_0 = 14\,\mathrm{dB}$. (a) Evaluate each term of the union bound, grouped by distance. (b) Compare the bound with the nearest-neighbour approximation and with the exact value $6.680\times10^{-3}$ (from numerical integration over the wedge-shaped decision region). (c) Estimate $P_b$ with Gray coding, and compare with BPSK at the same $E_b/N_0$.
::: solution
(a) $E_s/N_0 = 25.12$. The point at angular separation $2\pi k/8$ is at distance $d_k = 2\sqrt{E_s}\sin(\pi k/8)$, so the $Q$ argument is $d_k/\sqrt{2N_0} = \sqrt{2E_s/N_0}\sin(\pi k/8) = 7.088\sin(\pi k/8)$. Each point has two neighbours at $k = 1, 2, 3$ and one at $k = 4$:

| $k$ | argument | $Q$ | count |
|---|---|---|---|
| $1$ | $2.712$ | $3.34\times10^{-3}$ | $2$ |
| $2$ | $5.012$ | $2.7\times10^{-7}$ | $2$ |
| $3$ | $6.548$ | $2.9\times10^{-11}$ | $2$ |
| $4$ | $7.088$ | $6.8\times10^{-13}$ | $1$ |

(b) The union bound is $2(3.34\times10^{-3}) + 2(2.7\times10^{-7}) + \dots = 6.6802\times10^{-3}$; the nearest-neighbour approximation keeps only the first row, $6.6797\times10^{-3}$, which agrees with the exact value to four digits. The union bound overestimates by less than $0.01\,\%$: the regions it counts twice are far out in the Gaussian tail.

(c) $P_b \approx P_s/3 = 2.23\times10^{-3}$. The energy per bit is $E_b/N_0 = 14 - 10\log_{10}3 = 9.23\,\mathrm{dB}$, at which BPSK (or QPSK) would achieve $Q(\sqrt{2 \times 8.37}) = 2.1\times10^{-5}$, a hundred times better. That is the price of 8-PSK's extra bit per symbol, about $3.6\,\mathrm{dB}$ of $E_b/N_0$ at equal error rate.
:::
:::

::: theorem Error rates of standard modulations {#thm-mary-rates}
With coherent ML detection in AWGN:

- **QPSK** (Gray): $P_b = Q\big(\sqrt{2E_b/N_0}\big)$, exactly as BPSK, and $P_s = 2Q - Q^2$ with $Q = Q\big(\sqrt{2E_b/N_0}\big)$.
- **M-PSK**: $P_s \approx 2Q\Big(\sqrt{2E_s/N_0}\,\sin\dfrac{\pi}{M}\Big)$ for $M \ge 4$.
- **Square M-QAM**: $P_s = 1 - (1 - P_{\sqrt M})^2$, where $P_{\sqrt M} = 2\Big(1 - \dfrac{1}{\sqrt M}\Big)Q\Big(\sqrt{\dfrac{3E_s}{(M - 1)N_0}}\Big)$ is the error probability of each $\sqrt M$-level PAM coordinate.
- **Orthogonal M-FSK**: $P_s \le (M - 1)\,Q\big(\sqrt{E_s/N_0}\big)$, and $P_b = \dfrac{M/2}{M - 1}P_s$.
:::

::: proof
*QPSK.* The decision regions are the four quadrants, and the two coordinates carry independent BPSK symbols of energy $E_b$ in independent noise. Each coordinate is wrong with probability $Q = Q(\sqrt{2E_b/N_0})$; with Gray mapping each coordinate carries one bit, so $P_b = Q$, and the symbol is correct only if both are: $P_s = 1 - (1 - Q)^2 = 2Q - Q^2$.

*M-PSK.* Each point has two nearest neighbours at $d_{\min} = 2\sqrt{E_s}\sin(\pi/M)$; [[#eq-nearest]] gives $2Q\big(d_{\min}/\sqrt{2N_0}\big) = 2Q\big(\sqrt{2E_s/N_0}\sin(\pi/M)\big)$.

*QAM.* The decision regions are rectangles, so the two coordinates are decided independently. For a $\sqrt M$-level PAM coordinate with spacing $d$, the $\sqrt M - 2$ inner points err on either side with probability $Q(d/(2\sigma))$ each, and the two outer points on one side only: averaged, $P_{\sqrt M} = 2(1 - 1/\sqrt M)Q(d/(2\sigma))$. With $d^2 = 6E_s/(M - 1)$ from [[communication-systems/digital-modulation#thm-qam-energy]] and $\sigma^2 = N_0/2$, $d/(2\sigma) = \sqrt{3E_s/((M - 1)N_0)}$. A symbol is correct when both coordinates are.

*FSK.* Every pair of orthogonal signals has $d^2 = 2E_s$; the union bound has $M - 1$ equal terms. By symmetry, given a symbol error, each of the $M - 1$ wrong symbols is equally likely, and a given bit differs in $M/2$ of them, so $P_b = \frac{M/2}{M - 1}P_s$.
:::

The QPSK result deserves emphasis: QPSK has the same bit error rate as BPSK at the same $E_b/N_0$ and needs half the bandwidth. The table lists the $E_b/N_0$ needed by each scheme, computed from these formulas.

| modulation | $E_b/N_0$ for $P_b = 10^{-5}$ | for $10^{-6}$ |
|---|---|---|
| BPSK, QPSK | $9.6\,\mathrm{dB}$ | $10.5\,\mathrm{dB}$ |
| DPSK (binary) | $10.3\,\mathrm{dB}$ | $11.2\,\mathrm{dB}$ |
| coherent BFSK | $12.6\,\mathrm{dB}$ | $13.5\,\mathrm{dB}$ |
| noncoherent BFSK | $13.4\,\mathrm{dB}$ | $14.2\,\mathrm{dB}$ |
| 8-PSK | $13.0\,\mathrm{dB}$ | $14.0\,\mathrm{dB}$ |
| 16-QAM | $13.4\,\mathrm{dB}$ | $14.4\,\mathrm{dB}$ |
| 64-QAM | $17.8\,\mathrm{dB}$ | $18.8\,\mathrm{dB}$ |

::: example QPSK versus 16-QAM for a 20 Mbit/s link {#ex-qam-link}
A $20\,\mathrm{Mbit/s}$ link must achieve $P_b = 10^{-6}$ with a receiver of noise figure $7\,\mathrm{dB}$. (a) Find the required received power for QPSK and for 16-QAM. (b) With $\alpha = 0.25$, find the bandwidth of each. (c) Which would you choose for a satellite link and which for a terrestrial point-to-point microwave link in a crowded band?
::: solution
(a) $N_0 = -174 + 7 = -167\,\mathrm{dBm/Hz}$ and $10\log_{10}(20\times10^6) = 73.0\,\mathrm{dB}$. QPSK: $P_R = 10.5 - 167 + 73.0 = -83.5\,\mathrm{dBm}$. 16-QAM: $P_R = 14.4 - 167 + 73.0 = -79.6\,\mathrm{dBm}$, which is $3.9\,\mathrm{dB}$ more.

(b) QPSK: $R_s = 10\,\mathrm{Mbaud}$, $B = 12.5\,\mathrm{MHz}$. 16-QAM: $R_s = 5\,\mathrm{Mbaud}$, $B = 6.25\,\mathrm{MHz}$.

(c) A satellite link is power-limited (the transmitter is far away and its power is costly) and its transponder amplifiers work best with constant-envelope signals: QPSK. A terrestrial link in a licensed band is bandwidth-limited and has SNR to spare over a short hop: 16-QAM (or larger) packs twice the data into the channel for $3.9\,\mathrm{dB}$ more power.
:::
:::

::: quiz
At $E_b/N_0 = 10\,\mathrm{dB}$, rank BPSK, DPSK, coherent BFSK and noncoherent BFSK from lowest to highest bit error rate.
- [x] BPSK, DPSK, coherent BFSK, noncoherent BFSK
- [ ] BPSK, coherent BFSK, DPSK, noncoherent BFSK
- [ ] DPSK, BPSK, noncoherent BFSK, coherent BFSK
- [ ] BPSK, DPSK, noncoherent BFSK, coherent BFSK
::: solution
With $E_b/N_0 = 10$: BPSK $Q(\sqrt{20}) = 3.9\times10^{-6}$; DPSK $\frac12e^{-10} = 2.3\times10^{-5}$; coherent BFSK $Q(\sqrt{10}) = 7.8\times10^{-4}$; noncoherent BFSK $\frac12e^{-5} = 3.4\times10^{-3}$. DPSK is antipodal at heart, so it stays close to BPSK; FSK is orthogonal and $3\,\mathrm{dB}$ behind, and noncoherent detection costs a little more.
:::
:::

## Noncoherent detection {#sec-noncoherent}

A coherent receiver needs the carrier phase, which must be recovered by a phase-locked loop and may be unavailable at the start of a burst or on a rapidly changing channel. A **noncoherent** receiver treats the phase as unknown and uniformly distributed. For binary orthogonal FSK, the optimal noncoherent receiver correlates the received signal with both the cosine and the sine of each tone, forms the **envelopes** $\ell_k = \sqrt{r_{k,c}^2 + r_{k,s}^2}$, and chooses the larger one.

::: theorem Noncoherent BFSK and DPSK {#thm-noncoherent}
For binary orthogonal FSK with envelope detection,

$$
P_b = \frac12\exp\Big(-\frac{E_b}{2N_0}\Big) .
$$ {#eq-ncfsk}

For binary differential PSK, detected by comparing the phase of each symbol with that of the previous one,

$$
P_b = \frac12\exp\Big(-\frac{E_b}{N_0}\Big) .
$$ {#eq-dpsk}
:::

::: proof {collapsed}
*Sketch for FSK.* Each envelope is the length of a two-dimensional Gaussian vector with per-component variance $\sigma^2 = N_0/2$. In the branch without signal the envelope is Rayleigh; in the signal branch, Rician with amplitude $A = \sqrt{E_b}$ (the phase only rotates the vector). An error occurs when the Rayleigh envelope exceeds the Rician one: $P_b = \int_0^\infty f_{\text{Rice}}(r)\,e^{-r^2/(2\sigma^2)}\,\dd r$, since $\Prob(\text{Rayleigh} > r) = e^{-r^2/(2\sigma^2)}$. Completing the square in the exponent turns the integrand into $\frac12e^{-A^2/(4\sigma^2)}$ times another Rician density, which integrates to one, giving $\frac12e^{-E_b/(4\sigma^2)} = \frac12e^{-E_b/(2N_0)}$ (exercise [[#ex-ncfsk-derivation]]).

*Sketch for DPSK.* Two consecutive symbols form a signal of duration $2T$ and energy $2E_b$; "same phase" and "phase reversed" are orthogonal on that interval. DPSK is thus noncoherent orthogonal signalling with energy $2E_b$, and the FSK formula with $E_b$ replaced by $2E_b$ gives [[#eq-dpsk]].
:::

At $P_b = 10^{-5}$ noncoherent BFSK needs $13.4\,\mathrm{dB}$, only $0.8\,\mathrm{dB}$ more than coherent BFSK, and DPSK needs $10.3\,\mathrm{dB}$, $0.7\,\mathrm{dB}$ more than BPSK. The penalty for ignoring the phase is small for binary signalling at low error rates, which explains the long popularity of FSK and DPSK in simple, cheap, or bursty systems (pagers, Bluetooth's GFSK, the Bell 202 modem, early Wi-Fi's DBPSK).

## Matched filters and practical receivers {#sec-matched}

The correlator outputs $r_i = \int_0^Tr(t)\phi_i(t)\,\dd t$ can be produced by filters. A filter with impulse response $h_i(t) = \phi_i(T - t)$ has output at $t = T$ equal to $\int r(\tau)\phi_i(\tau)\,\dd\tau = r_i$. This is the **matched filter** of [[random-signals/optimal-filtering]], which maximises the output SNR at the sampling instant; its maximum SNR $2E/N_0$ is precisely $d^2/(2N_0)$ for an antipodal pair with $E = d^2/4$, the square of the $Q$-function argument in [[#eq-binary-pe]].

For a pulse-shaped linear modulation, $\phi(t)$ is the transmitted pulse $p(t)$ (on a carrier), so the receive filter should be matched to $p$: $H_R(f) = P^*(f)$, up to a delay. Combining this with Nyquist's criterion from [[communication-systems/baseband-transmission]] fixes the design: the overall response $P(f)H_R(f) = \lvert P(f)\rvert^2$ must be a raised cosine, so $\lvert P(f)\rvert$ is a **root raised cosine**. With root-raised-cosine filters at both ends, a receiver sampling once per symbol is simultaneously free of ISI and optimal for white noise, and the error rates of [[#thm-mary-rates]] apply to a continuous stream of symbols, not just to an isolated one.

::: definition Coding gain and implementation loss {#def-coding-gain}
The **implementation loss** of a receiver is the additional $E_b/N_0$ it needs, compared with the theoretical curve, to reach a given error rate (because of imperfect synchronisation, filters, quantisation, phase noise). The **coding gain** of an error-correcting code is the reduction in required $E_b/N_0$, at a given bit error rate, relative to uncoded transmission with the same modulation, after accounting for the rate reduction ($E_b$ is the energy per *information* bit).
:::

Real modems typically have $1$ to $2\,\mathrm{dB}$ of implementation loss, and modern codes (turbo, LDPC, polar) provide coding gains of $7$ to $9\,\mathrm{dB}$ at $10^{-5}$ to $10^{-6}$, bringing systems within about $1\,\mathrm{dB}$ of the Shannon limit drawn in [[communication-systems/digital-modulation]].

::: application Deep-space links
NASA's deep-space probes are the extreme power-limited case: a probe in the outer solar system delivers well under a femtowatt ($10^{-15}\,\mathrm{W}$) to a $70\,\mathrm{m}$ antenna on Earth. The design is a direct application of this lesson: BPSK or QPSK (the most power-efficient antipodal signals), coherent detection with very narrow phase-locked loops, cryogenically cooled receivers to lower $N_0$, and powerful codes — convolutional codes with Viterbi decoding in the Voyager era, concatenated with Reed–Solomon codes, and turbo and LDPC codes today — to operate at $E_b/N_0$ of $1$ to $2\,\mathrm{dB}$ instead of BPSK's uncoded $9.6\,\mathrm{dB}$.
:::

## Where this leads

The error rates derived here assume a constant received signal. In a fading radio channel the received $E_b/N_0$ itself is random, and averaging $Q(\sqrt{2\gamma})$ over its distribution turns the steep exponential curves into slow straight lines; [[communication-systems/wireless-communication]] computes the loss and shows how diversity restores the steepness. Error-correcting codes, which close most of the remaining gap to the Shannon limit, are developed in [[information-theory/linear-block-codes]], [[information-theory/convolutional-codes]] and [[information-theory/modern-codes]]. The same detection theory, with targets in place of symbols, is the basis of radar detection in [[rf-microwave/wireless-links-radar]].

::: history
The matched filter was introduced by Dwight O. North in a classified RCA report of 1943 on signal detection in radar, and independently by J. H. Van Vleck and David Middleton (report 1944, published 1946), who coined the name. Vladimir Kotelnikov's 1947 doctoral thesis, *The theory of optimum noise immunity* (published in Russian in 1956 and in English in 1959), formulated detection of known signals in Gaussian noise geometrically and derived the error probabilities of the basic binary schemes. Philip Woodward's *Probability and Information Theory, with Applications to Radar* (1953) and the statistical decision theory of Abraham Wald gave the Bayesian framework. John Wozencraft and Irwin Jacobs's *Principles of Communication Engineering* (1965) made signal-space detection, with its union bounds and decision regions, the standard way the subject is taught.
:::

::: summary
- Projecting the received signal onto the signal-space basis (correlators or matched filters) loses nothing: the noise components are independent $\Normal(0, N_0/2)$ and the rest is irrelevant.
- The MAP rule minimises error probability; for equal priors in AWGN it is the minimum-distance (ML) rule, implemented by correlations minus half-energies.
- Two signals at distance $d$: $P_e = Q(d/\sqrt{2N_0})$. BPSK and QPSK achieve $P_b = Q(\sqrt{2E_b/N_0})$ ($9.6\,\mathrm{dB}$ for $10^{-5}$); orthogonal FSK and OOK need $3\,\mathrm{dB}$ more.
- The union bound and nearest-neighbour approximation $P_s \approx \bar KQ(d_{\min}/\sqrt{2N_0})$ give accurate M-ary error rates; with Gray coding $P_b \approx P_s/\log_2M$.
- M-QAM's error rate follows from independent $\sqrt M$-PAM decisions; each step up (16 → 64 → 256) costs about $4$ to $5\,\mathrm{dB}$ of $E_b/N_0$.
- Noncoherent BFSK ($\frac12e^{-E_b/2N_0}$) and DPSK ($\frac12e^{-E_b/N_0}$) cost under $1\,\mathrm{dB}$ at $10^{-5}$ compared with their coherent counterparts.
- Root-raised-cosine filters at both ends give zero ISI and matched filtering at once; required received power is $P_R = (E_b/N_0)\,N_0R_b$.
:::

## Exercises

::: exercise BPSK at 6 dB {level=1 check="2.39e-3"}
Find the bit error probability of BPSK at $E_b/N_0 = 6\,\mathrm{dB}$, to three significant figures.
::: solution
$E_b/N_0 = 3.981$, so $P_b = Q(\sqrt{7.962}) = Q(2.822) = 2.39\times10^{-3}$.
:::
:::

::: exercise Energy per bit {level=1 check="3.64e-20"}
A receiver has $N_0 = 4\times10^{-21}\,\mathrm{W/Hz}$. Find the energy per bit in joules that BPSK needs for $P_b = 10^{-5}$, to three significant figures.
::: solution
$E_b/N_0 = 9.09$ ($9.59\,\mathrm{dB}$), so $E_b = 9.09 \times 4\times10^{-21} = 3.64\times10^{-20}\,\mathrm{J}$. At $1\,\mathrm{Mbit/s}$ this is a received power of $3.64\times10^{-14}\,\mathrm{W}$, about $-104\,\mathrm{dBm}$.
:::
:::

::: exercise Noncoherent FSK {level=1 check="0.5*exp(-10^1.2/2)"}
Find $P_b$ for noncoherent binary FSK at $E_b/N_0 = 12\,\mathrm{dB}$.
::: solution
$E_b/N_0 = 15.85$, so $P_b = \frac12e^{-7.92} = 1.81\times10^{-4}$.
:::
:::

::: exercise Exact QPSK symbol error {level=2 check="2*0.000190908-0.000190908^2"}
Find the symbol error probability of QPSK at $E_b/N_0 = 8\,\mathrm{dB}$, and compare it with twice the bit error probability.
::: solution
$E_b/N_0 = 6.310$; $Q = Q(\sqrt{12.62}) = Q(3.552) = 1.909\times10^{-4}$. $P_s = 2Q - Q^2 = 3.818\times10^{-4}$, essentially $2P_b$ because double errors (both coordinates wrong) are very rare.
:::
:::

::: exercise A threshold for unequal priors {level=2 check="0.1/2*log(9)"}
Antipodal projections $\pm1$ are received in Gaussian noise of variance $\sigma^2 = 0.1$, with $\Prob(-1) = 0.9$. Find the MAP threshold.
::: solution
$\gamma = \frac{\sigma^2}{2a}\ln\frac{\pi_0}{\pi_1} = \frac{0.1}{2}\ln9 = 0.110$. The receiver decides $+1$ only when $r > 0.110$.
:::
:::

::: exercise A DPSK link budget {level=2 check="9.3-174+4+10*log10(250000)"}
A DPSK telemetry link at $250\,\mathrm{kbit/s}$ needs $P_b = 10^{-4}$. The receiver noise figure is $4\,\mathrm{dB}$. Find the required received power in dBm.
::: solution
$\frac12e^{-E_b/N_0} = 10^{-4}$ gives $E_b/N_0 = \ln5000 = 8.52$, i.e. $9.3\,\mathrm{dB}$. $P_R = 9.3 - 174 + 4 + 54.0 = -106.7\,\mathrm{dBm}$.
:::
:::

::: exercise Union bound for 16-QAM {level=2}
For 16-QAM, count the nearest neighbours of corner, edge and inner points and find $\bar K$. Write the nearest-neighbour approximation for $P_s$ in terms of $E_b/N_0$ and compare with the exact result [[#thm-mary-rates]] at high SNR.
::: solution
Corners (4 points) have $2$ neighbours, edge points (8) have $3$, inner points (4) have $4$: $\bar K = (8 + 24 + 16)/16 = 3$. With $d^2 = 0.4E_s = 1.6E_b$: $P_s \approx 3Q\big(\sqrt{0.8E_b/N_0}\big)$. The exact formula gives $P_{\sqrt M} = 1.5Q(\sqrt{E_s/(5N_0)}) = 1.5Q(\sqrt{0.8E_b/N_0})$ and $P_s = 2P_{\sqrt M} - P_{\sqrt M}^2 \approx 3Q(\cdot)$: the same, apart from the negligible square term.
:::
:::

::: exercise Noncoherent FSK from Rician statistics {level=3 #ex-ncfsk-derivation}
In noncoherent BFSK, the envelope of the signal branch has the Rician density $f(r) = \frac{r}{\sigma^2}e^{-(r^2 + A^2)/(2\sigma^2)}I_0(Ar/\sigma^2)$, and that of the other branch is Rayleigh with $\Prob(\ell > r) = e^{-r^2/(2\sigma^2)}$. Show that $P_b = \frac12e^{-A^2/(4\sigma^2)}$, and with $A^2 = E_b$, $\sigma^2 = N_0/2$, obtain [[#eq-ncfsk]].
::: hint
Substitute $u = \sqrt2\,r$ and recognise a Rician density with amplitude $A/\sqrt2$.
:::
::: solution
$P_b = \int_0^\infty\frac{r}{\sigma^2}e^{-(2r^2 + A^2)/(2\sigma^2)}I_0(Ar/\sigma^2)\,\dd r$. With $u = \sqrt2r$, $r\,\dd r = u\,\dd u/2$ and $Ar = (A/\sqrt2)u$:

$$
P_b = \frac12\int_0^\infty\frac{u}{\sigma^2}e^{-(u^2 + A^2)/(2\sigma^2)}I_0\Big(\frac{(A/\sqrt2)u}{\sigma^2}\Big)\dd u .
$$

Write $e^{-A^2/(2\sigma^2)} = e^{-A^2/(4\sigma^2)}e^{-(A/\sqrt2)^2/(2\sigma^2)}$. What remains inside the integral is the Rician density with amplitude $A/\sqrt2$, which integrates to $1$. So $P_b = \frac12e^{-A^2/(4\sigma^2)}$, and with $A^2 = E_b$, $\sigma^2 = N_0/2$: $P_b = \frac12e^{-E_b/(2N_0)}$.
:::
:::

::: exercise Choosing a modulation for a power and bandwidth budget {level=3}
A link must carry $30\,\mathrm{Mbit/s}$ in a channel of $12\,\mathrm{MHz}$ with root-raised-cosine pulses ($\alpha = 0.2$) at $P_b \le 10^{-6}$. The received power is $-75\,\mathrm{dBm}$ and the noise figure $6\,\mathrm{dB}$. (a) Which square QAM sizes fit the bandwidth? (b) Find the available $E_b/N_0$. (c) Which constellation do you choose, and what margin remains?
::: hint
Use the table of required $E_b/N_0$ values, and remember that bandwidth constrains the symbol rate while power constrains $E_b/N_0$.
:::
::: solution
(a) $R_s \le 12/1.2 = 10\,\mathrm{Mbaud}$, so at least $3$ bits per symbol: 16-QAM ($R_s = 7.5\,\mathrm{Mbaud}$, $9\,\mathrm{MHz}$) and larger fit; QPSK ($15\,\mathrm{Mbaud}$, $18\,\mathrm{MHz}$) does not.

(b) $E_b/N_0 = P_R - N_0 - 10\log_{10}R_b = -75 - (-174 + 6) - 74.8 = 18.2\,\mathrm{dB}$.

(c) 16-QAM needs $14.4\,\mathrm{dB}$, leaving $3.8\,\mathrm{dB}$ of margin; 64-QAM needs $18.8\,\mathrm{dB}$, $0.6\,\mathrm{dB}$ short. Choose 16-QAM. The margin covers implementation loss ($1$ to $2\,\mathrm{dB}$) and some fading; if the power rose by a few decibels, 64-QAM would allow halving the occupied bandwidth to $6\,\mathrm{MHz}$.
:::
:::
