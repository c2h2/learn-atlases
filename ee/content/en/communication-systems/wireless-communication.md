Walk a few steps with a phone pressed to your ear and the received signal strength can change by a factor of a thousand, rising and falling every few centimetres. Step behind a building and the average drops tenfold. Move a kilometre from the base station and it falls by another factor of ten thousand. None of the links in [[communication-systems/optimal-detection]] behaved like this: there the received energy per bit was a fixed number, and the error probability fell off a cliff once $E_b/N_0$ passed $10\,\mathrm{dB}$ or so. A radio channel between moving terminals in a cluttered environment is a different kind of channel, and modern wireless systems — cellular networks, Wi-Fi, Bluetooth — are built around its peculiarities.

This lesson describes the radio channel on three scales. **Path loss** sets the average received power over kilometres and is the basis of the **link budget**. **Shadowing** by buildings and terrain varies that average over tens of metres. **Multipath fading**, the interference between copies of the signal arriving by different routes, varies the signal over fractions of a wavelength and, for wideband signals, across frequency. We compute how badly fading degrades the error rates of the previous lesson and how **diversity** recovers them, show how **OFDM** turns a frequency-selective channel into many simple flat ones, and outline the **multiple-access** methods by which many users share a band, ending with the frequency reuse that makes cellular networks possible.

## Path loss and the link budget {#sec-path-loss}

In free space, power radiated by a transmitter spreads over spheres of growing area, and the receiving antenna collects the fraction that falls on its effective area.

::: theorem Friis transmission equation {#thm-friis}
A transmitter of power $P_T$ with antenna gain $G_T$ and a receiver with antenna gain $G_R$, separated by a distance $d$ in free space (in each other's far field, with matched polarisation), give a received power

$$
P_R = P_TG_TG_R\Big(\frac{\lambda}{4\pi d}\Big)^2 ,
$$ {#eq-friis}

where $\lambda = c/f$ is the wavelength. In decibels, $P_R = P_T + G_T + G_R - L_{fs}$ with the **free-space path loss**

$$
L_{fs} = 20\log_{10}\frac{4\pi d}{\lambda}\ \mathrm{dB} .
$$ {#eq-fspl}
:::

::: proof
An isotropic source spreads $P_T$ uniformly over a sphere of area $4\pi d^2$; an antenna of gain $G_T$ concentrates it, giving a power density $P_TG_T/(4\pi d^2)$ in its main direction. A receiving antenna of gain $G_R$ has an **effective area** $A_e = G_R\lambda^2/(4\pi)$, a result from antenna theory (derived in [[rf-microwave/antennas]] by reciprocity and a thermodynamic argument). The received power is density times area:

$$
P_R = \frac{P_TG_T}{4\pi d^2}\cdot\frac{G_R\lambda^2}{4\pi} = P_TG_TG_R\Big(\frac{\lambda}{4\pi d}\Big)^2 . \qquad
$$
:::

The free-space loss grows by $20\,\mathrm{dB}$ per decade of distance and by $20\,\mathrm{dB}$ per decade of frequency. The frequency dependence is not a property of space but of fixed-gain antennas: an antenna of fixed *area* has a gain that grows as $f^2$, which exactly cancels it. Near the ground, reflections and obstructions make the loss grow faster than $d^2$.

::: definition Log-distance path loss and shadowing {#def-path-loss}
The **log-distance model** gives the path loss at distance $d$ as

$$
L(d) = L(d_0) + 10n\log_{10}\frac{d}{d_0} + X_\sigma\ \ \mathrm{dB} ,
$$ {#eq-log-distance}

where $L(d_0)$ is the loss at a reference distance $d_0$ (often the free-space value at $1\,\mathrm m$ indoors or $100\,\mathrm m$ outdoors), $n$ is the **path-loss exponent** ($2$ in free space, about $2.7$–$3.5$ in urban cells, $3$–$4$ inside buildings), and $X_\sigma$ is **shadowing**, modelled as a zero-mean Gaussian random variable in decibels (**log-normal shadowing**) with standard deviation $\sigma$ of typically $4$ to $10\,\mathrm{dB}$.
:::

::: definition Link budget {#def-link-budget}
A **link budget** is the accounting, in decibels, of every gain and loss between transmitter and detector:

$$
\frac{E_b}{N_0} = P_T + G_T + G_R - L - L_{\mathrm{other}} - \big(-174\,\mathrm{dBm/Hz} + F\big) - 10\log_{10}R_b ,
$$ {#eq-link-budget}

with powers in dBm, $L$ the path loss, $L_{\mathrm{other}}$ cable, body and penetration losses, and $F$ the receiver noise figure. The **link margin** is the difference between the available and the required $E_b/N_0$ (or SNR); it must cover shadowing and fading.
:::

::: example A Wi-Fi link budget {#ex-wifi-budget}
A $2.4\,\mathrm{GHz}$ access point transmits $20\,\mathrm{dBm}$ in a $20\,\mathrm{MHz}$ channel; both antennas have $2\,\mathrm{dBi}$ of gain, and the client's noise figure is $7\,\mathrm{dB}$. (a) Find the free-space loss at $1\,\mathrm m$ and at $100\,\mathrm m$. (b) Indoors, with $n = 3$ beyond $d_0 = 1\,\mathrm m$, find the received power and SNR at $50\,\mathrm m$. (c) Allowing $8\,\mathrm{dB}$ for shadowing, which modulation can be sustained if 64-QAM with its code needs an SNR of about $25\,\mathrm{dB}$ and 16-QAM about $18\,\mathrm{dB}$?
::: solution
(a) $\lambda = c/f = 0.125\,\mathrm m$. At $1\,\mathrm m$: $20\log_{10}(4\pi/0.125) = 40.1\,\mathrm{dB}$; at $100\,\mathrm m$: $40.1 + 40 = 80.1\,\mathrm{dB}$.

(b) $L(50) = 40.1 + 30\log_{10}50 = 40.1 + 51.0 = 91.0\,\mathrm{dB}$, so $P_R = 20 + 2 + 2 - 91.0 = -67.0\,\mathrm{dBm}$. The noise power is $-174 + 10\log_{10}(2\times10^7) + 7 = -174 + 73.0 + 7 = -94.0\,\mathrm{dBm}$. The SNR is $27.0\,\mathrm{dB}$.

(c) With an $8\,\mathrm{dB}$ shadowing margin the planning SNR is $19\,\mathrm{dB}$: enough for 16-QAM, not for 64-QAM. In practice the rate adapts to the actual SNR packet by packet, so a client in a good spot gets 64-QAM and one behind a wall falls back.
:::
:::

## Multipath fading {#sec-multipath}

A radio signal reaches the receiver along many paths — direct, reflected from buildings, scattered by foliage and vehicles — with different delays $\tau_i$ and amplitudes $a_i$. For a transmitted complex envelope $\tilde x(t)$, the received envelope is

$$
\tilde y(t) = \sum_ia_i\,e^{-j2\pi f_c\tau_i}\,\tilde x(t - \tau_i) .
$$ {#eq-multipath}

Each path contributes a phase $2\pi f_c\tau_i$, which changes by $2\pi$ when its length changes by one wavelength ($12.5\,\mathrm{cm}$ at $2.4\,\mathrm{GHz}$). Small movements therefore change the phases completely, and the paths add sometimes constructively and sometimes destructively: the received amplitude **fades**. Two time scales and two frequency scales characterise the result.

::: definition Delay spread and coherence bandwidth {#def-coherence-bandwidth}
The **RMS delay spread** $\sigma_\tau$ is the standard deviation of the path delays, weighted by path power. The **coherence bandwidth** $B_c$ is the frequency separation over which the channel's frequency response remains strongly correlated; an often-used estimate (for correlation $0.5$) is

$$
B_c \approx \frac{1}{5\sigma_\tau} .
$$ {#eq-coherence-bw}

A signal of bandwidth $B \ll B_c$ sees **flat fading** (all its frequencies fade together, and there is no ISI); a signal with $B \gtrsim B_c$ sees **frequency-selective fading** (different frequencies fade differently, equivalent to ISI in time).
:::

::: definition Doppler spread and coherence time {#def-coherence-time}
A receiver moving at speed $v$ sees each path's frequency shifted by up to the **maximum Doppler frequency** $f_D = v/\lambda$. The **coherence time** $T_c$, over which the channel stays approximately constant, is of order $1/f_D$; for the classical model of uniformly scattered paths around a moving receiver (Clarke's model) the correlation falls to $0.5$ at

$$
T_c \approx \frac{0.423}{f_D} .
$$ {#eq-coherence-time}

A symbol much shorter than $T_c$ sees **slow fading** (constant over the symbol); otherwise the fading is **fast**.
:::

::: widget plot
f: 10*log10(1 + a^2 + 2*a*cos(2*pi*x*t))
x: 0, 20
y: -30, 8
sliders: a=0.8:0:1:0.01; t=1:0.1:5:0.05
labels: \lvert H(f)\rvert^2\ \mathrm{[dB]}
caption: Frequency response of a two-path channel, a direct path of amplitude $1$ plus an echo of relative amplitude $a$ delayed by $t$ microseconds, across a $20\,\mathrm{MHz}$ band (frequency in megahertz relative to the band edge). The response has notches every $1/t$ megahertz, so the coherence bandwidth is of order $1/t$. Lengthen the delay: the notches crowd together and a $20\,\mathrm{MHz}$ signal suffers frequency-selective fading. Raise $a$ towards $1$: the notches deepen without limit; with $a = 1$ the response is $2\cos(\pi ft)$, which vanishes exactly. A narrowband signal sitting in a notch is lost entirely, whatever its power.
:::

::: example Fading parameters of a cellular channel {#ex-coherence}
An LTE terminal at $2\,\mathrm{GHz}$ travels at $120\,\mathrm{km/h}$ in an urban macrocell with RMS delay spread $1\,\mathrm{\mu s}$. (a) Find $f_D$ and $T_c$. (b) Find $B_c$. (c) LTE uses OFDM with $15\,\mathrm{kHz}$ subcarriers, symbols of about $71\,\mathrm{\mu s}$ (including the cyclic prefix) and a $20\,\mathrm{MHz}$ channel. Classify the fading seen by one subcarrier symbol and by the whole channel.
::: solution
(a) $\lambda = 0.15\,\mathrm m$ and $v = 33.3\,\mathrm{m/s}$, so $f_D = v/\lambda = 222\,\mathrm{Hz}$ and $T_c \approx 0.423/222 = 1.9\,\mathrm{ms}$.

(b) $B_c \approx 1/(5 \times 1\,\mathrm{\mu s}) = 200\,\mathrm{kHz}$.

(c) A $15\,\mathrm{kHz}$ subcarrier is far narrower than $200\,\mathrm{kHz}$, so each subcarrier sees flat fading, and a $71\,\mathrm{\mu s}$ symbol is far shorter than $1.9\,\mathrm{ms}$, so the fading is slow. The whole $20\,\mathrm{MHz}$ channel spans about $100$ coherence bandwidths: severely frequency selective. A single-carrier $20\,\mathrm{MHz}$ signal would need an equaliser spanning many symbols; OFDM avoids that, as we shall see. The channel must be re-estimated every millisecond or so, which is why LTE scatters reference symbols across time and frequency.
:::
:::

### Rayleigh fading and its cost

When there are many paths of comparable strength and no dominant one, the received complex envelope gain $h = \sum_ia_ie^{-j\theta_i}$ is a sum of many independent terms with random phases. By the central limit theorem it is a zero-mean complex Gaussian variable, and its magnitude $\lvert h\rvert$ has a **Rayleigh** distribution, exactly as the envelope of narrowband noise did in [[communication-systems/noise-in-analog-systems]]. (With a strong direct path the magnitude is **Rician** instead.) The instantaneous SNR $\gamma = \lvert h\rvert^2E_b/N_0$ is then exponentially distributed with mean $\bar\gamma$:

$$
f(\gamma) = \frac{1}{\bar\gamma}e^{-\gamma/\bar\gamma}, \qquad \gamma \ge 0 .
$$ {#eq-exponential}

A deep fade is not rare: the probability that $\gamma$ is more than $10\,\mathrm{dB}$ below its mean is $1 - e^{-0.1} = 9.5\,\%$, and $20\,\mathrm{dB}$ below, $1\,\%$.

::: theorem BPSK in Rayleigh fading {#thm-rayleigh-ber}
For coherent BPSK over a slowly varying flat Rayleigh channel with perfect channel knowledge at the receiver, the average bit error probability at average SNR $\bar\gamma = \E[\lvert h\rvert^2]E_b/N_0$ is

$$
\bar P_b = \int_0^\infty Q\big(\sqrt{2\gamma}\big)\frac{1}{\bar\gamma}e^{-\gamma/\bar\gamma}\,\dd\gamma = \frac12\Big(1 - \sqrt{\frac{\bar\gamma}{1 + \bar\gamma}}\Big) \approx \frac{1}{4\bar\gamma}\quad(\bar\gamma \gg 1) .
$$ {#eq-rayleigh-ber}
:::

::: proof
Integrate by parts with $u = Q(\sqrt{2\gamma})$ and $\dd v = \frac{1}{\bar\gamma}e^{-\gamma/\bar\gamma}\dd\gamma$, $v = -e^{-\gamma/\bar\gamma}$. Since $\frac{\dd}{\dd\gamma}Q(\sqrt{2\gamma}) = -\frac{1}{\sqrt{2\pi}}e^{-\gamma}\cdot\frac{1}{\sqrt{2\gamma}}$,

$$
\bar P_b = \Big[-Q(\sqrt{2\gamma})e^{-\gamma/\bar\gamma}\Big]_0^\infty - \int_0^\infty\frac{e^{-\gamma}}{2\sqrt{\pi\gamma}}e^{-\gamma/\bar\gamma}\,\dd\gamma = \frac12 - \frac{1}{2\sqrt\pi}\int_0^\infty\gamma^{-1/2}e^{-\gamma(1 + 1/\bar\gamma)}\,\dd\gamma .
$$

The last integral is $\Gamma(\tfrac12)(1 + 1/\bar\gamma)^{-1/2} = \sqrt\pi\sqrt{\bar\gamma/(1 + \bar\gamma)}$, which gives the closed form. For large $\bar\gamma$, $\sqrt{\bar\gamma/(1 + \bar\gamma)} = (1 + 1/\bar\gamma)^{-1/2} \approx 1 - \frac{1}{2\bar\gamma}$, so $\bar P_b \approx \frac{1}{4\bar\gamma}$.
:::

The result is sobering. In AWGN, BPSK reaches $10^{-5}$ at $9.6\,\mathrm{dB}$; in Rayleigh fading it needs $44\,\mathrm{dB}$, more than two thousand times the power. The error rate falls only as $1/\bar\gamma$ — ten times more power buys ten times fewer errors — because the average is dominated by the deep fades, during which the link is lost whatever the mean SNR. Adding power is the wrong remedy. The right one is to avoid relying on any single faded channel.

## Diversity {#sec-diversity}

**Diversity** sends or receives the same information over several channels that fade independently: antennas spaced half a wavelength or more apart (**space diversity**), carriers separated by more than $B_c$ (**frequency diversity**), or time slots separated by more than $T_c$, combined with coding and interleaving (**time diversity**). The probability that *all* branches fade at once is much smaller than that of any one.

::: theorem Maximal-ratio combining {#thm-mrc}
Let a symbol $x$ be received on $L$ branches as $r_\ell = h_\ell x + n_\ell$, with independent noises of equal variance. The linear combination $y = \sum_\ell w_\ell^*r_\ell$ that maximises the output SNR uses $w_\ell = h_\ell$ (**maximal-ratio combining**, MRC), and its SNR is the sum of the branch SNRs:

$$
\gamma_{\mathrm{MRC}} = \sum_{\ell=1}^{L}\gamma_\ell .
$$ {#eq-mrc}

For BPSK with $L$ independent Rayleigh branches of equal average SNR $\bar\gamma$, the average bit error probability is

$$
\bar P_b = \Big(\frac{1 - \mu}{2}\Big)^L\sum_{k=0}^{L-1}\binom{L - 1 + k}{k}\Big(\frac{1 + \mu}{2}\Big)^k \approx \binom{2L - 1}{L}\Big(\frac{1}{4\bar\gamma}\Big)^L, \qquad \mu = \sqrt{\frac{\bar\gamma}{1 + \bar\gamma}} .
$$ {#eq-mrc-ber}
:::

::: proof
The combiner output is $y = \big(\sum_\ell w_\ell^*h_\ell\big)x + \sum_\ell w_\ell^*n_\ell$. With $E_s = \E\lvert x\rvert^2$ and noise variance $N_0$ per branch, the SNR is

$$
\gamma = \frac{E_s\big\lvert\sum_\ell w_\ell^*h_\ell\big\rvert^2}{N_0\sum_\ell\lvert w_\ell\rvert^2} \le \frac{E_s\sum_\ell\lvert w_\ell\rvert^2\sum_\ell\lvert h_\ell\rvert^2}{N_0\sum_\ell\lvert w_\ell\rvert^2} = \sum_\ell\frac{E_s\lvert h_\ell\rvert^2}{N_0} = \sum_\ell\gamma_\ell ,
$$

by the Cauchy–Schwarz inequality, with equality when $w_\ell \propto h_\ell$. The sum of $L$ independent exponential variables with mean $\bar\gamma$ has a gamma (chi-square with $2L$ degrees of freedom) distribution; averaging $Q(\sqrt{2\gamma})$ over it, by repeated integration by parts as in [[#thm-rayleigh-ber]], gives the closed form, which is derived in full in Proakis and Salehi or Goldsmith (see references). Its high-SNR form follows from $(1 - \mu)/2 \approx 1/(4\bar\gamma)$, $(1 + \mu)/2 \approx 1$ and $\sum_{k=0}^{L-1}\binom{L - 1 + k}{k} = \binom{2L - 1}{L}$.
:::

The exponent $L$ is the **diversity order**: on a log–log plot the error curve has slope $-L$ instead of $-1$. Each branch also adds its average SNR (an **array gain** of $L$), but the change of slope is what matters.

::: widget plot
f: log10(0.5*(1 - erf(sqrt(10^(x/10))))); log10(((1 - sqrt(10^(x/10)/(1 + 10^(x/10))))/2)^L*sum(binom(L - 1 + k, k)*((1 + sqrt(10^(x/10)/(1 + 10^(x/10))))/2)^k, k, 0, L - 1))
x: 0, 40
y: -6, 0
sliders: L=1:1:4:1
labels: \text{AWGN}; \text{Rayleigh, } L \text{ branches (MRC)}
caption: Bit error probability of BPSK ($\log_{10}P_b$) against the average SNR per branch $\bar\gamma$ in decibels: without fading (blue) and in Rayleigh fading with $L$-branch maximal-ratio combining (orange). With $L = 1$ the fading curve is a straight line falling one decade per $10\,\mathrm{dB}$; $10^{-3}$ needs $24\,\mathrm{dB}$ against $6.8\,\mathrm{dB}$ without fading. Step $L$ up: the slope becomes $L$ decades per $10\,\mathrm{dB}$, and at $L = 4$ the requirement for $10^{-3}$ falls to about $4\,\mathrm{dB}$ per branch. Diversity, not power, is the cure for fading.
:::

::: example How much does diversity save? {#ex-diversity}
A BPSK link in Rayleigh fading must achieve an average $P_b = 10^{-3}$. Find the average SNR per branch needed with no diversity, with two-branch MRC and with four-branch MRC, and compare with AWGN. What fade margin would a designer who ignored diversity have to allow?
::: solution
AWGN: $Q(\sqrt{2\gamma}) = 10^{-3}$ at $\gamma = 6.8\,\mathrm{dB}$.

$L = 1$: $\frac12(1 - \mu) = 10^{-3}$ gives $\mu = 0.998$, $\bar\gamma = \mu^2/(1 - \mu^2) = 249$, i.e. $24.0\,\mathrm{dB}$ (the approximation $1/(4\bar\gamma)$ gives $250$).

$L = 2$: solving [[#eq-mrc-ber]] numerically gives $\bar\gamma = 11.1\,\mathrm{dB}$ per branch; the approximation $3/(16\bar\gamma^2) = 10^{-3}$ gives $\bar\gamma = 13.7$, $11.4\,\mathrm{dB}$.

$L = 4$: $\bar\gamma = 4.0\,\mathrm{dB}$ per branch ($10.0\,\mathrm{dB}$ total over the four branches).

Without diversity the link needs a fade margin of $24.0 - 6.8 = 17.2\,\mathrm{dB}$ over AWGN. A second receive antenna cuts it to $4.3\,\mathrm{dB}$ — saving $13\,\mathrm{dB}$, a factor of twenty in transmit power, for the cost of an antenna and a receiver chain. At $10^{-5}$ the saving is larger still: $44.0\,\mathrm{dB}$ without diversity against $21.3\,\mathrm{dB}$ with two branches.
:::
:::

::: application Transmit diversity and MIMO
Handsets have little room for antennas, so base stations provide diversity from the transmit side. Siavash Alamouti's 1998 space–time block code sends two symbols from two antennas over two symbol periods ($x_1, x_2$, then $-x_2^*, x_1^*$) and lets a single-antenna receiver obtain full second-order diversity with simple linear processing. With several antennas at *both* ends the channel becomes a matrix, and Gerard Foschini (1996) and Emre Telatar showed that its capacity grows in proportion to the smaller number of antennas: **multiple-input multiple-output** (MIMO) systems send several independent streams in the same band. Wi-Fi and LTE use up to 4 or 8 streams; 5G base stations use arrays of 64 or more elements to form beams towards individual users.
:::

::: quiz
A receiver has two antennas mounted so close together, in a channel with so little scattering, that they see *identical* fading (fully correlated). What does maximal-ratio combining achieve compared with one antenna?
- [ ] Diversity order $2$ and $3\,\mathrm{dB}$ array gain
- [x] $3\,\mathrm{dB}$ array gain but diversity order $1$
- [ ] Diversity order $2$ but no array gain
- [ ] Nothing at all
::: solution
With $h_1 = h_2 = h$ the combined SNR is $2\gamma$: the signal adds coherently while the independent noises add in power, a $3\,\mathrm{dB}$ gain. But both branches fade together, so the error curve still falls as $1/\bar\gamma$: diversity order $1$. Antennas must be far enough apart (about half a wavelength or more in rich scattering, much more at a base station) for their fading to be nearly independent.
:::
:::

## OFDM {#sec-ofdm}

A $20\,\mathrm{MHz}$ single-carrier signal in a channel with microsecond delay spreads suffers ISI over dozens of symbols. **Orthogonal frequency-division multiplexing** (OFDM) avoids this by dividing the band into $N$ narrow **subcarriers**, each carrying a slow stream of QAM symbols. Each subcarrier is narrower than $B_c$, so it sees flat fading: a single complex gain, corrected by one multiplication.

::: definition OFDM symbol {#def-ofdm}
An **OFDM symbol** of useful duration $T$ carries $N$ complex data symbols $X_0, \dots, X_{N-1}$ on subcarriers spaced $\Delta f = 1/T$ apart:

$$
\tilde x(t) = \sum_{k=0}^{N-1}X_k\,e^{j2\pi k\Delta f\,t}, \qquad 0 \le t < T .
$$ {#eq-ofdm}

Sampled at $t = nT/N$, this is $x[n] = \sum_kX_ke^{j2\pi kn/N}$, $N$ times the inverse DFT of the data. The transmitter therefore computes an $N$-point inverse FFT; the receiver recovers the symbols with an FFT. Before transmission, the last $N_{cp}$ samples are copied to the front of the block as a **cyclic prefix**.
:::

The subcarriers overlap in frequency (each has a $\sin(\pi fT)/(\pi fT)$-shaped spectrum), yet they do not interfere: over one interval of length $T$, $\int_0^Te^{j2\pi k\Delta ft}e^{-j2\pi l\Delta ft}\,\dd t = T\delta_{kl}$ when $\Delta f = 1/T$, the noncoherent orthogonality condition of [[communication-systems/digital-modulation#thm-fsk-orthogonal]]. The spacing is the closest possible for orthogonal tones with arbitrary phases, so OFDM's spectrum is almost rectangular, with efficiency approaching $\log_2M$ bit/s/Hz.

::: theorem The cyclic prefix diagonalises the channel {#thm-cyclic-prefix}
Let the discrete-time channel have impulse response $h[0], \dots, h[L_h - 1]$, and let the cyclic prefix length satisfy $N_{cp} \ge L_h - 1$. After the receiver discards the prefix and takes the $N$-point DFT of the remaining samples, the output on subcarrier $k$ is

$$
Y_k = H_k\,X_k + W_k, \qquad H_k = \sum_{n=0}^{L_h-1}h[n]e^{-j2\pi kn/N} ,
$$ {#eq-ofdm-diag}

where $W_k$ is the DFT of the noise. Subcarriers do not interfere with each other, and successive OFDM symbols do not interfere.
:::

::: proof
The channel output is the linear convolution $y[n] = \sum_mh[m]\,s[n - m]$ of the transmitted block $s$ (prefix followed by $x[0], \dots, x[N-1]$). For $n = 0, \dots, N - 1$ (indexing from the end of the prefix), the samples $s[n - m]$ with $m \le L_h - 1 \le N_{cp}$ reach back at most into the prefix, where $s[n - m] = x[(n - m) \bmod N]$ by construction. Hence on the kept samples

$$
y[n] = \sum_mh[m]\,x[(n - m) \bmod N] ,
$$

a **circular** convolution, and they are untouched by the previous OFDM symbol, whose echoes die out within the prefix. By the circular convolution property of the DFT ([[dsp/discrete-fourier-transform]]), the DFT of a circular convolution is the product of DFTs: $Y_k = H_kX_k$. Adding the noise and using linearity gives [[#eq-ofdm-diag]].
:::

The receiver estimates each $H_k$ from known **pilot** symbols and divides (a one-tap equaliser per subcarrier). The prefix costs a fraction $N_{cp}/(N + N_{cp})$ of time and energy, so its length is chosen just longer than the channel's maximum excess delay. Subcarriers that fall in a deep fade lose their data, which error-correcting coding spread across the band recovers: OFDM turns frequency selectivity into frequency diversity.

::: example OFDM numerology of Wi-Fi {#ex-wifi-ofdm}
IEEE 802.11a/g uses a $20\,\mathrm{MHz}$ sampling rate, a 64-point FFT, a $0.8\,\mathrm{\mu s}$ cyclic prefix, and $48$ data subcarriers plus $4$ pilots. (a) Find the subcarrier spacing, the useful symbol duration, the total symbol duration and the prefix overhead. (b) Find the bit rate with 64-QAM and a rate-$3/4$ code. (c) What delay spread can the prefix absorb, and how does it compare with an indoor environment ($\sigma_\tau \approx 50\,\mathrm{ns}$, maximum excess delay a few hundred nanoseconds)?
::: solution
(a) $\Delta f = 20\,\mathrm{MHz}/64 = 312.5\,\mathrm{kHz}$; $T = 1/\Delta f = 3.2\,\mathrm{\mu s}$; with the prefix the symbol lasts $4.0\,\mathrm{\mu s}$, and the overhead is $0.8/4.0 = 20\,\%$.

(b) Each symbol carries $48 \times 6 \times \frac34 = 216$ information bits every $4\,\mathrm{\mu s}$: $54\,\mathrm{Mbit/s}$, the maximum rate of 802.11a/g.

(c) The prefix absorbs echoes up to $0.8\,\mathrm{\mu s}$ ($16$ samples), several times the excess delay of a typical indoor channel, with room for outdoor short-range links. The coherence bandwidth indoors, $1/(5 \times 50\,\mathrm{ns}) = 4\,\mathrm{MHz}$, is more than ten subcarriers wide, so each subcarrier is flat to a very good approximation.
:::
:::

::: quiz
An OFDM system keeps its bandwidth and cyclic-prefix duration fixed but doubles the number of subcarriers. Which statement is true?
- [ ] The prefix overhead doubles and the system becomes more robust to Doppler
- [x] The prefix overhead roughly halves, but the system becomes more sensitive to Doppler
- [ ] Nothing changes, because the bandwidth is the same
- [ ] The subcarrier spacing doubles
::: solution
Doubling $N$ at the same bandwidth halves the spacing $\Delta f$ and doubles the useful duration $T = 1/\Delta f$, so a fixed prefix is a smaller fraction of the symbol. But the channel must now stay constant over a longer symbol, and a given Doppler shift is a larger fraction of the narrower spacing, so inter-carrier interference grows. The choice of $N$ trades the two, as in the next example.
:::
:::

::: example Designing an OFDM numerology {#ex-ofdm-design}
A new system will use a $20\,\mathrm{MHz}$ channel in an outdoor environment with maximum excess delay $5\,\mathrm{\mu s}$ and a maximum Doppler frequency of $200\,\mathrm{Hz}$. The cyclic-prefix overhead must not exceed $10\,\%$, and to keep inter-carrier interference from Doppler negligible the subcarrier spacing should be at least $100f_D$. Choose the prefix length, the subcarrier spacing and the FFT size.
::: solution
The prefix must cover the excess delay: $T_{cp} = 5\,\mathrm{\mu s}$. Overhead $T_{cp}/(T + T_{cp}) \le 0.1$ requires $T \ge 9T_{cp} = 45\,\mathrm{\mu s}$, i.e. $\Delta f = 1/T \le 22.2\,\mathrm{kHz}$. The Doppler condition requires $\Delta f \ge 100 \times 200 = 20\,\mathrm{kHz}$. Choose $\Delta f = 20\,\mathrm{kHz}$: $T = 50\,\mathrm{\mu s}$, overhead $5/55 = 9.1\,\%$.

The band holds $20\,\mathrm{MHz}/20\,\mathrm{kHz} = 1000$ subcarriers, so use a 1024-point FFT at a sampling rate of $1024 \times 20\,\mathrm{kHz} = 20.48\,\mathrm{MHz}$, leaving a few edge subcarriers empty as guard bands. The prefix is $5\,\mathrm{\mu s} \times 20.48\,\mathrm{MHz} = 102.4$, rounded up to $103$ samples. The two constraints left a narrow window: LTE, designed for higher speeds, chose $15\,\mathrm{kHz}$ and a shorter normal prefix of $4.7\,\mathrm{\mu s}$.
:::
:::

::: warning OFDM's peak-to-average power ratio
An OFDM signal is the sum of many independent subcarriers, so by the central limit theorem its samples are nearly Gaussian, with occasional peaks $10$ to $12\,\mathrm{dB}$ above the average power. The power amplifier must stay linear over these peaks or it will spread energy into neighbouring channels and distort the constellation. That forces it to run well below saturation, at low efficiency — a serious problem for battery-powered handsets. LTE therefore uses a precoded variant with a lower peak-to-average ratio (single-carrier FDMA) on the uplink.
:::

## Multiple access and cellular systems {#sec-multiple-access}

A band must be shared among many users. The classical **multiple-access** methods divide the signal space: **FDMA** gives each user a frequency channel (analog cellular, AMPS); **TDMA** gives each user time slots in a shared carrier (GSM: eight users per $200\,\mathrm{kHz}$ carrier); **CDMA** lets all users transmit at once over the whole band, each multiplying its data by a distinct high-rate spreading code, so that a receiver correlating with one code sees the others as noise suppressed by the **processing gain** (the ratio of chip rate to bit rate: $3.84\,\mathrm{Mchip/s}$ for $12.2\,\mathrm{kbit/s}$ speech in WCDMA is $315$, or $25\,\mathrm{dB}$); and **OFDMA** assigns groups of OFDM subcarriers in groups of symbols to different users (LTE, 5G, Wi-Fi 6), combining frequency and time division with the scheduler's freedom to give each user the subcarriers on which it currently fades least.

The **cellular concept** reuses the same frequencies in cells far enough apart that their interference is tolerable. With hexagonal cells of radius $R$, frequencies are divided among a **cluster** of $N$ cells, and cells using the same channel set (co-channel cells) are separated by $D = R\sqrt{3N}$.

::: proposition Co-channel interference in a hexagonal layout {#prop-sir}
For a mobile at the edge of its cell, with path-loss exponent $n$ and six co-channel interferers at distance approximately $D$, the signal-to-interference ratio is approximately

$$
\frac SI \approx \frac{R^{-n}}{6D^{-n}} = \frac{(D/R)^n}{6} = \frac{(\sqrt{3N})^n}{6} .
$$ {#eq-sir}
:::

::: proof
The received signal power from the serving base station at distance $R$ is proportional to $R^{-n}$. The first ring of co-channel cells in a hexagonal layout contains six cells whose base stations are about $D$ from the mobile, each contributing a power proportional to $D^{-n}$; more distant rings contribute much less when $n \ge 3$. The ratio is $(D/R)^n/6$. The relation $D/R = \sqrt{3N}$ is a property of hexagonal geometry for the allowed cluster sizes $N = i^2 + ij + j^2$.
:::

::: example Choosing the cluster size {#ex-reuse}
An analog FM cellular system needs $S/I \ge 18\,\mathrm{dB}$. With $n = 4$, compare clusters of $N = 3, 4, 7$ and $12$. A digital system with coding works at $S/I = 9\,\mathrm{dB}$: which cluster size can it use, and how does its capacity compare?
::: solution
From [[#eq-sir]] with $n = 4$, $S/I = 9N^2/6 = 1.5N^2$: $N = 3$ gives $13.5$ ($11.3\,\mathrm{dB}$), $N = 4$ gives $24$ ($13.8\,\mathrm{dB}$), $N = 7$ gives $73.5$ ($18.7\,\mathrm{dB}$), $N = 12$ gives $216$ ($23.3\,\mathrm{dB}$). The analog system needs $N = 7$, the cluster used by AMPS. The digital system can use $N = 3$ (or even $N = 1$ with interference-averaging techniques), so each cell gets $7/3 = 2.3$ times as many channels from the same spectrum, before counting any gain from more efficient modulation. This is a large part of why the industry went digital.
:::
:::

## Where this leads

This lesson closes the course, and opens several others. The antennas and RF hardware that appear here as gains and noise figures are designed in [[rf-microwave]], whose chapter [[rf-microwave/wireless-links-radar]] treats link budgets and radar in more detail. The coding that turns frequency and time diversity into reliability, and the capacity of fading and MIMO channels, belong to [[information-theory]]. The FFTs at the heart of OFDM are in [[dsp/fast-fourier-transform]], and the channel estimation and tracking in every receiver use the estimation methods of [[random-signals/estimation-kalman]].

::: history
Harald Friis of Bell Laboratories published his transmission formula in 1946. In December 1947 Douglas H. Ring, also at Bell Labs, described in an internal memorandum the idea of a cellular network of low-power base stations reusing frequencies. R. H. Clarke's 1968 statistical theory of mobile radio reception explained Rayleigh fading and the Doppler spectrum, and William C. Jakes's *Microwave Mobile Communications* (1974) collected the theory and its simulation. The first US commercial cellular system, AMPS (analog FM, $30\,\mathrm{kHz}$ channels, 7-cell reuse), opened in Chicago in 1983. Digital systems followed: GSM (TDMA, 1991), IS-95 CDMA, developed by Qualcomm and first deployed commercially in 1995, and third-generation WCDMA. Robert Chang described OFDM in 1966 and Weinstein and Ebert proposed the DFT implementation in 1971; it entered broadcasting (DAB, DVB-T), DSL, Wi-Fi (IEEE 802.11a, 1999) and finally cellular systems with LTE, first launched commercially in 2009. Alamouti's transmit-diversity code (1998) and Foschini's layered space–time architecture (1996) began the MIMO era.
:::

::: summary
- Free-space path loss is $20\log_{10}(4\pi d/\lambda)$; terrestrial loss grows as $10n\log_{10}d$ with $n \approx 3$–$4$, plus log-normal shadowing of $4$–$10\,\mathrm{dB}$. A link budget adds gains and losses in decibels to find $E_b/N_0$ and the margin.
- Multipath makes the channel vary over distance (coherence time $T_c \approx 0.423/f_D$, with $f_D = v/\lambda$) and over frequency (coherence bandwidth $B_c \approx 1/(5\sigma_\tau)$).
- Without a dominant path the gain is Rayleigh and the SNR exponential; BPSK's average error rate becomes $\frac12(1 - \sqrt{\bar\gamma/(1 + \bar\gamma)}) \approx 1/(4\bar\gamma)$, needing about $24\,\mathrm{dB}$ for $10^{-3}$ instead of $6.8\,\mathrm{dB}$.
- Diversity over $L$ independent branches with maximal-ratio combining adds the branch SNRs and makes $P_b \propto \bar\gamma^{-L}$; two branches save over $10\,\mathrm{dB}$.
- OFDM sends data on $N$ orthogonal subcarriers spaced $1/T$, generated by an IFFT; a cyclic prefix longer than the channel memory turns the channel into $N$ flat subchannels $Y_k = H_kX_k$.
- FDMA, TDMA, CDMA and OFDMA share the spectrum; cellular reuse with cluster size $N$ gives $S/I \approx (\sqrt{3N})^n/6$, and digital systems' tolerance of interference allows tighter reuse.
:::

## Exercises

::: exercise Free-space loss {level=1 check="20*log10(4*pi*1000/(299792458/900e6))"}
Find the free-space path loss in decibels at $900\,\mathrm{MHz}$ over $1\,\mathrm{km}$.
::: solution
$\lambda = 0.333\,\mathrm m$; $L = 20\log_{10}(4\pi \times 1000/0.333) = 20\log_{10}(37\,730) = 91.5\,\mathrm{dB}$.
:::
:::

::: exercise Doppler frequency {level=1 check="(100/3.6)/(299792458/900e6)"}
Find the maximum Doppler frequency in hertz for a car at $100\,\mathrm{km/h}$ receiving a $900\,\mathrm{MHz}$ signal.
::: solution
$v = 27.8\,\mathrm{m/s}$ and $\lambda = 0.333\,\mathrm m$, so $f_D = v/\lambda = 83.4\,\mathrm{Hz}$.
:::
:::

::: exercise Probability of a deep fade {level=1 check="1-exp(-0.01)"}
In Rayleigh fading, find the probability that the instantaneous SNR is more than $20\,\mathrm{dB}$ below its mean.
::: solution
$\Prob(\gamma < 0.01\bar\gamma) = 1 - e^{-0.01} = 0.00995$, about $1\,\%$.
:::
:::

::: exercise Rayleigh error rate {level=2 check="0.5*(1-sqrt(100/101))"}
Find the average bit error probability of BPSK in Rayleigh fading at $\bar\gamma = 20\,\mathrm{dB}$, and compare it with AWGN at the same SNR and with the approximation $1/(4\bar\gamma)$.
::: solution
$\bar P_b = \frac12(1 - \sqrt{100/101}) = 2.48\times10^{-3}$; the approximation gives $2.50\times10^{-3}$. In AWGN, $Q(\sqrt{200}) \approx 10^{-45}$: fading turns an essentially perfect link into one with a bit in error every four hundred.
:::
:::

::: exercise A cellular link budget {level=2 check="43+15+0-128-(-174+7+10*log10(5e6))"}
A base station transmits $43\,\mathrm{dBm}$ with an antenna gain of $15\,\mathrm{dBi}$; the handset antenna has $0\,\mathrm{dBi}$ and a noise figure of $7\,\mathrm{dB}$. The path loss at the cell edge is $128\,\mathrm{dB}$. Find the SNR in decibels in a $5\,\mathrm{MHz}$ channel, and the margin if the required SNR is $-5\,\mathrm{dB}$ (a robust coded mode).
::: solution
$P_R = 43 + 15 + 0 - 128 = -70\,\mathrm{dBm}$. Noise: $-174 + 7 + 67.0 = -100.0\,\mathrm{dBm}$. $\mathrm{SNR} = 30.0\,\mathrm{dB}$, a margin of $35\,\mathrm{dB}$, comfortably covering shadowing ($\approx 8\,\mathrm{dB}$), building penetration ($10$–$20\,\mathrm{dB}$) and body loss.
:::
:::

::: exercise Cyclic prefix length {level=2 check="144"}
LTE samples a $20\,\mathrm{MHz}$ channel at $30.72\,\mathrm{MHz}$ with a 2048-point FFT. Its normal cyclic prefix (on most symbols) lasts $4.6875\,\mathrm{\mu s}$. Find the prefix length in samples, the subcarrier spacing, and the prefix overhead.
::: solution
$4.6875\times10^{-6} \times 30.72\times10^6 = 144$ samples. $\Delta f = 30.72\,\mathrm{MHz}/2048 = 15\,\mathrm{kHz}$, so $T = 66.7\,\mathrm{\mu s}$ and the overhead is $4.7/71.4 = 6.6\,\%$.
:::
:::

::: exercise Reuse and interference {level=2 check="10*log10(1.5*16)"}
Using [[#eq-sir]] with $n = 4$, find $S/I$ in decibels for $N = 4$. What cluster size would $n = 3$ require to reach $18\,\mathrm{dB}$?
::: solution
$S/I = 1.5 \times 16 = 24$, i.e. $13.8\,\mathrm{dB}$. With $n = 3$: $(\sqrt{3N})^3/6 \ge 63.1$ gives $(3N)^{1.5} \ge 378.6$, $3N \ge 52.3$, $N \ge 17.4$; the next allowed size is $N = 19$. A lower path-loss exponent lets interference travel further, so reuse must be sparser.
:::
:::

::: exercise Selection diversity {level=3}
A selection combiner picks the branch with the largest instantaneous SNR among $L$ independent Rayleigh branches of mean $\bar\gamma$. (a) Show that the probability that the output SNR is below a threshold $\gamma_0$ (the **outage probability**) is $(1 - e^{-\gamma_0/\bar\gamma})^L$. (b) For an outage of $1\,\%$, find the required $\bar\gamma/\gamma_0$ in decibels for $L = 1, 2, 4$. (c) Why is selection simpler than MRC to implement, and roughly how much does it lose?
::: hint
The maximum is below $\gamma_0$ only if every branch is.
:::
::: solution
(a) Each branch has $\Prob(\gamma_\ell < \gamma_0) = 1 - e^{-\gamma_0/\bar\gamma}$; independence gives the product.

(b) $1 - e^{-x} = 0.01^{1/L}$ with $x = \gamma_0/\bar\gamma$. $L = 1$: $x = -\ln0.99 = 0.01005$, $\bar\gamma/\gamma_0 = 99.5$, i.e. $20.0\,\mathrm{dB}$. $L = 2$: $0.01^{1/2} = 0.1$, $x = 0.1054$, $\bar\gamma/\gamma_0 = 9.49$, $9.8\,\mathrm{dB}$. $L = 4$: $0.01^{1/4} = 0.316$, $x = 0.380$, $\bar\gamma/\gamma_0 = 2.63$, $4.2\,\mathrm{dB}$.

(c) Selection needs only an SNR measurement per branch and a switch, not coherent phase alignment and weighting; one receiver chain can serve all antennas. It achieves the same diversity order $L$ (the outage falls as $\bar\gamma^{-L}$) but forgoes the array gain: for BPSK at $\bar P_b = 10^{-3}$ it needs $12.6\,\mathrm{dB}$ per branch with $L = 2$ against MRC's $11.1\,\mathrm{dB}$, a loss of $1.5\,\mathrm{dB}$, growing to $3.3\,\mathrm{dB}$ for $L = 4$.
:::
:::

::: exercise Two-path channel and OFDM {level=3}
A channel has impulse response $h[0] = 1$, $h[3] = 0.9$ (all other taps zero), and is used with $N = 64$ subcarriers. (a) Find $\lvert H_k\rvert$ and the indices of the weakest subcarriers. (b) What is the minimum cyclic-prefix length in samples? (c) If the prefix were only $2$ samples, explain qualitatively what would go wrong. (d) Why should the coded data of one codeword be spread across subcarriers rather than placed on adjacent ones?
::: solution
(a) $H_k = 1 + 0.9e^{-j2\pi\cdot3k/64}$, so $\lvert H_k\rvert^2 = 1.81 + 1.8\cos(6\pi k/64)$. The minimum, $\lvert H_k\rvert = 0.1$ ($-20\,\mathrm{dB}$), occurs where $\cos(6\pi k/64) = -1$, i.e. $3k/64 = \tfrac12, \tfrac32, \tfrac52$: $k = 10.67, 32, 53.33$. Subcarrier $32$ is exactly in the notch, and $k = 10, 11, 53, 54$ are close ($\lvert H\rvert \approx 0.2$). The maximum, $1.9$, is at $k = 0, 21.3, 42.7$.

(b) $N_{cp} \ge L_h - 1 = 3$ samples.

(c) With a $2$-sample prefix the echo delayed by $3$ samples reaches into the previous OFDM symbol's data, so the kept samples are no longer a circular convolution: each symbol suffers interference from the previous one (inter-symbol interference), and the subcarriers lose orthogonality (inter-carrier interference). The one-tap equaliser can no longer remove the channel exactly, leaving an error floor.

(d) The notches are a few subcarriers wide and spaced about $21$ subcarriers apart, so adjacent subcarriers fade together. Spreading (interleaving) a codeword's bits across the band makes their fades nearly independent, so the code sees a few erased symbols it can correct rather than a burst it cannot: frequency diversity.
:::
:::
