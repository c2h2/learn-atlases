A bit is an abstraction; a wire carries voltages. Between the PCM encoder of [[communication-systems/pulse-code-modulation]] and the cable, fibre or circuit-board trace lies a design problem that every Ethernet port, USB link and DSL modem solves: turn a sequence of symbols into a continuous waveform that fits the channel's bandwidth, carries no troublesome DC component, lets the receiver recover the clock, and arrives with each symbol still distinguishable from its neighbours. Transmission in which the signal's spectrum extends down to (or near) zero frequency, with no carrier, is called **baseband** transmission.

The central difficulty is **intersymbol interference** (ISI). A channel of finite bandwidth cannot pass a rectangular pulse unchanged: it smears each pulse in time, so that the tail of one symbol overlaps the next and corrupts the receiver's decision. Make the pulses short to avoid overlap and their spectrum becomes too wide for the channel; make them long and they overlap. Harry Nyquist resolved the dilemma in 1928: pulses may overlap freely, provided that each one passes through zero at every other symbol's sampling instant. This lesson develops the spectra of line codes, Nyquist's criterion for zero ISI, the raised-cosine family of pulses that meets it with realistic filters, the eye diagram that engineers use to see ISI and noise margins at a glance, and the equalisers that correct a channel's distortion.

## Pulse-amplitude signals and line codes {#sec-line-codes}

Almost every digital baseband signal has the same form. A sequence of **symbols** $a_k$, each taken from a finite alphabet, is sent at a **symbol rate** $R_s = 1/T$ symbols per second (**baud**) by scaling and shifting one **pulse shape** $p(t)$:

$$
x(t) = \sum_{k=-\infty}^{\infty} a_k\,p(t - kT) .
$$ {#eq-pam-signal}

With $M$ possible symbol values each symbol carries $\log_2M$ bits, so the **bit rate** is $R_b = R_s\log_2M$. Binary signalling ($M = 2$) has $R_b = R_s$; 4-level PAM sends two bits per symbol at half the symbol rate. Keeping symbols and bits apart is essential: bandwidth is set by the *symbol* rate.

::: definition Line codes {#def-line-code}
A **line code** maps bits to symbols and pulses for transmission on a cable. The common binary codes, with bit period $T$ and amplitude $A$, are:

- **unipolar NRZ** (non-return-to-zero): $1 \mapsto +A$, $0 \mapsto 0$, for the whole bit period;
- **polar NRZ**: $1 \mapsto +A$, $0 \mapsto -A$, for the whole bit period;
- **bipolar** or **alternate mark inversion** (AMI): $0 \mapsto 0$, and successive $1$s are sent alternately as $+A$ and $-A$, usually with half-width (return-to-zero) pulses;
- **Manchester** (split-phase): $1 \mapsto +A$ for the first half of the bit and $-A$ for the second; $0 \mapsto$ the reverse. Every bit has a transition at its centre.
:::

Which code is best depends on the channel. Transformer-coupled telephone pairs and AC-coupled receivers block DC, so a code with a strong low-frequency content suffers from **baseline wander**: long runs of equal bits drift towards zero. A receiver also needs transitions to keep its clock aligned, and a long run of identical NRZ bits has none. Bandwidth matters too. All of these properties can be read from the power spectral density.

::: theorem Power spectral density of a PAM signal {#thm-pam-psd}
Let the symbols $a_k$ form a wide-sense stationary sequence with autocorrelation $R_a(m) = \E[a_ka_{k+m}]$, and let the time origin be uniformly random over one symbol period. Then the signal [[#eq-pam-signal]] has power spectral density

$$
S_x(f) = \frac{\lvert P(f)\rvert^2}{T}\sum_{m=-\infty}^{\infty} R_a(m)\,e^{-j2\pi fmT} .
$$ {#eq-pam-psd}

If the symbols are uncorrelated with mean $\mu_a$ and variance $\sigma_a^2$, this becomes

$$
S_x(f) = \frac{\sigma_a^2}{T}\lvert P(f)\rvert^2 + \frac{\mu_a^2}{T^2}\sum_{n=-\infty}^{\infty}\Big\lvert P\Big(\frac nT\Big)\Big\rvert^2\delta\Big(f - \frac nT\Big) .
$$ {#eq-pam-psd-uncorr}
:::

::: proof {collapsed}
With the random offset $\theta$ uniform on $[0, T)$, independent of the symbols, the signal is wide-sense stationary. Its autocorrelation is

$$
R_x(\tau) = \E\Big[\sum_k\sum_l a_ka_l\,p(t - kT - \theta)\,p(t + \tau - lT - \theta)\Big] = \sum_m R_a(m)\sum_k\frac1T\int_0^T p(t - kT - \theta)\,p(t + \tau - kT - mT - \theta)\,\dd\theta ,
$$

writing $l = k + m$. The sum over $k$ of integrals over one period combines into a single integral over all time, $\frac1T\int p(u)\,p(u + \tau - mT)\,\dd u = \frac1T r_p(\tau - mT)$, where $r_p$ is the deterministic autocorrelation of $p$, whose transform is $\lvert P(f)\rvert^2$. Hence $R_x(\tau) = \frac1T\sum_mR_a(m)r_p(\tau - mT)$, and transforming term by term (a shift by $mT$ multiplies by $e^{-j2\pi fmT}$) gives [[#eq-pam-psd]]. For uncorrelated symbols $R_a(0) = \sigma_a^2 + \mu_a^2$ and $R_a(m) = \mu_a^2$ otherwise; the sum $\sum_m e^{-j2\pi fmT}$ equals $\frac1T\sum_n\delta(f - n/T)$ (the Poisson sum formula), which produces the spectral lines of [[#eq-pam-psd-uncorr]].
:::

Two lessons follow at once. The **shape** of the spectrum comes from the pulse, through $\lvert P(f)\rvert^2$; the **correlation** of the symbols reshapes it, which is how AMI removes DC. And a nonzero symbol mean wastes power in discrete spectral lines that carry no information.

::: example Spectra of four line codes {#ex-line-code-psd}
Find the power spectral densities of unipolar NRZ, polar NRZ, Manchester and AMI (half-width pulses) for equally likely independent bits, and their first-null bandwidths. Evaluate for $10\,\mathrm{Mbit/s}$ Manchester (10BASE-T Ethernet) and $1.544\,\mathrm{Mbit/s}$ AMI (T1).
::: solution
Write $\operatorname{sinc}(u) = \sin(\pi u)/(\pi u)$ in this solution. A full-width rectangle has $\lvert P(f)\rvert^2 = T^2\operatorname{sinc}^2(fT)$.

*Polar NRZ:* $a_k = \pm A$, $\mu_a = 0$, $\sigma_a^2 = A^2$: $S = A^2T\operatorname{sinc}^2(fT)$. First null at $1/T = R_b$.

*Unipolar NRZ:* $a_k \in \{0, A\}$, $\mu_a = A/2$, $\sigma_a^2 = A^2/4$: $S = \frac{A^2T}{4}\operatorname{sinc}^2(fT) + \frac{A^2}{4}\delta(f)$. The lines at $n/T$, $n \ne 0$, vanish because $\operatorname{sinc}(n) = 0$; the DC line holds half the power. First null at $R_b$.

*Manchester:* the pulse is $+A$ then $-A$ for $T/2$ each, $P(f) = AT\operatorname{sinc}(fT/2)\cdot j\sin(\pi fT/2)e^{-j\pi fT}$ (two half-width rectangles of opposite sign), and $a_k = \pm1$: $S = A^2T\operatorname{sinc}^2(fT/2)\sin^2(\pi fT/2)$. It is zero at DC and its first null is at $2/T$.

*AMI:* $a_k \in \{0, \pm A\}$; a $1$ occurs with probability $\tfrac12$ and successive marks alternate, so $R_a(0) = A^2/2$, $R_a(\pm1) = -A^2/4$ (both bits must be $1$, probability $\tfrac14$, and then they have opposite signs), and $R_a(m) = 0$ for $\lvert m\rvert \ge 2$. The sum in [[#eq-pam-psd]] is $\frac{A^2}{2}(1 - \cos2\pi fT) = A^2\sin^2(\pi fT)$. With half-width pulses $\lvert P\rvert^2 = \frac{T^2}{4}\operatorname{sinc}^2(fT/2)$, so $S = \frac{A^2T}{4}\operatorname{sinc}^2(fT/2)\sin^2(\pi fT)$: zero at DC, peak near $f = 1/(2T)$, first null at $1/T$.

For 10BASE-T, Manchester's first null is at $2R_b = 20\,\mathrm{MHz}$, twice the $10\,\mathrm{MHz}$ of polar NRZ: the price of guaranteed transitions and zero DC. For T1, AMI's spectrum peaks near $772\,\mathrm{kHz}$ and has its first null at $1.544\,\mathrm{MHz}$, with no energy at DC, so it passes through the line transformers of the telephone plant.
:::
:::

::: widget plot
f: sinc(pi*x)^2; sinc(pi*x/2)^2*sin(pi*x/2)^2; 0.25*sinc(pi*x/2)^2*sin(pi*x)^2
x: 0, 3
y: 0, 1.05
labels: \text{polar NRZ}; \text{Manchester}; \text{AMI (RZ)}
caption: Power spectral densities of three binary line codes, normalised to $A^2T$, against $fT$ (frequency in multiples of the bit rate). Polar NRZ has its maximum at DC, which a transformer or capacitor would block. Manchester and AMI both vanish at $f = 0$, but Manchester spreads its power to about twice the bit rate, while AMI stays mostly below the bit rate. Hover over each curve to read where it peaks: Manchester near $0.74R_b$, AMI near $0.46R_b$.
:::

::: remark Beyond the basic codes
Practical links choose codes for more than spectrum. **Block codes** such as 8b/10b (Gigabit Ethernet, PCI Express 1 and 2) map each 8-bit byte to a 10-bit word chosen to keep the running number of ones and zeros balanced and to guarantee transitions, for $25\,\%$ overhead; 64b/66b cuts the overhead to $3\,\%$. **Scramblers** randomise the data so that long runs become improbable. **Multilevel codes** reduce the symbol rate for a given bit rate: 2B1Q in ISDN sends two bits per 4-level symbol, and 100BASE-TX uses the three-level MLT-3.
:::

## Intersymbol interference and Nyquist's criterion {#sec-nyquist}

At the receiver the signal has passed through the transmit filter, the channel and a receive filter. Their combined effect on one symbol is an overall pulse, which we again call $p(t)$, so the received signal is $y(t) = \sum_ka_kp(t - kT) + n(t)$. The receiver samples $y$ once per symbol, at $t = mT$ (choosing the time origin at the pulse peak), and decides on $a_m$ from the sample

$$
y(mT) = a_m\,p(0) + \underbrace{\sum_{k \ne m}a_k\,p\big((m - k)T\big)}_{\text{intersymbol interference}} + n(mT) .
$$ {#eq-isi}

::: definition Intersymbol interference {#def-isi}
The middle term of [[#eq-isi]] is **intersymbol interference**: the contribution of the other symbols to the sample of symbol $m$. A pulse produces **zero ISI** at rate $1/T$ if

$$
p(nT) = \begin{cases}1, & n = 0,\\ 0, & n \ne 0,\end{cases}
$$ {#eq-zero-isi}

normalising $p(0) = 1$. The worst-case ISI for symbols of maximum magnitude $a_{\max}$ is $a_{\max}\sum_{n \ne 0}\lvert p(nT)\rvert$, and the ratio $D = \sum_{n \ne 0}\lvert p(nT)\rvert/\lvert p(0)\rvert$ is the **peak distortion**.
:::

The condition is on the *samples* only: between sampling instants the pulses may overlap as much as they like. Which spectra $P(f)$ have such samples?

::: theorem Nyquist's criterion for zero ISI {#thm-nyquist}
A pulse $p(t)$ with Fourier transform $P(f)$ satisfies the zero-ISI condition [[#eq-zero-isi]] if and only if

$$
\sum_{k=-\infty}^{\infty}P\Big(f - \frac kT\Big) = T \quad\text{for all } f .
$$ {#eq-nyquist}
:::

::: proof
Sample $p(t)$ with an impulse train of period $T$: $p_\delta(t) = \sum_np(nT)\delta(t - nT)$. By the spectrum-of-a-sampled-signal theorem ([[signals-systems/sampling#thm-spectrum]]), its transform is $P_\delta(f) = \frac1T\sum_kP(f - k/T)$. On the other hand, the zero-ISI condition holds if and only if $p_\delta(t) = \delta(t)$, whose transform is $1$. Hence [[#eq-zero-isi]] holds if and only if $\frac1T\sum_kP(f - k/T) = 1$, which is [[#eq-nyquist]].
:::

The criterion says that copies of $P(f)$ shifted by multiples of the symbol rate must add up to a constant. Its most important consequence concerns bandwidth.

::: corollary Minimum bandwidth {#cor-min-bandwidth}
A zero-ISI pulse at symbol rate $R_s = 1/T$ needs a bandwidth of at least $R_s/2$ hertz (the **Nyquist bandwidth**). The only pulse that achieves it is

$$
p(t) = \frac{\sin(\pi t/T)}{\pi t/T}, \qquad P(f) = \begin{cases}T, & \lvert f\rvert < \dfrac{1}{2T},\\ 0, & \text{otherwise.}\end{cases}
$$ {#eq-sinc-pulse}

Equivalently, a channel of bandwidth $B$ can carry at most $2B$ independent symbols per second without ISI.
:::

::: proof
If $P(f) = 0$ for $\lvert f\rvert \ge B$ with $B < 1/(2T)$, then at $f = 1/(2T)$ every shifted copy $P(1/(2T) - k/T)$ is zero, since each argument has magnitude at least $1/(2T) > B$; the sum is $0 \ne T$, violating [[#eq-nyquist]]. With $B = 1/(2T)$ the copies do not overlap (apart from the band edges), so each must equal $T$ on its own band: $P$ is the rectangle, whose inverse transform is the sinc pulse.
:::

The sinc pulse is ideal on paper and useless in practice. Its spectrum requires a brick-wall filter, which cannot be built. Worse, its tails decay only as $1/t$, so the sum $\sum_n\lvert p(\epsilon T - nT)\rvert$ of its samples at a slightly wrong time diverges like the harmonic series: a small **timing error** produces unbounded worst-case ISI. We need pulses that use a little more bandwidth in exchange for faster-decaying tails.

## Raised-cosine pulses {#sec-raised-cosine}

The criterion [[#eq-nyquist]] is satisfied by any spectrum that falls from $T$ to $0$ with **odd symmetry** about the Nyquist frequency $1/(2T)$, so that the falling edge of one copy and the rising edge of the next add to a constant. The most widely used family gives that edge the shape of half a cosine cycle.

::: definition Raised-cosine pulse {#def-raised-cosine}
The **raised-cosine** spectrum with **roll-off factor** $\alpha \in [0, 1]$ is

$$
P(f) = \begin{cases}T, & \lvert f\rvert \le \dfrac{1 - \alpha}{2T},\\[1.5ex] \dfrac T2\Big[1 + \cos\Big(\dfrac{\pi T}{\alpha}\Big(\lvert f\rvert - \dfrac{1 - \alpha}{2T}\Big)\Big)\Big], & \dfrac{1 - \alpha}{2T} < \lvert f\rvert \le \dfrac{1 + \alpha}{2T},\\[1.5ex] 0, & \lvert f\rvert > \dfrac{1 + \alpha}{2T},\end{cases}
$$ {#eq-rc-spectrum}

and the corresponding pulse is

$$
p(t) = \frac{\sin(\pi t/T)}{\pi t/T}\cdot\frac{\cos(\pi\alpha t/T)}{1 - (2\alpha t/T)^2} .
$$ {#eq-rc-pulse}

Its bandwidth is

$$
B = \frac{(1 + \alpha)R_s}{2} .
$$ {#eq-rc-bandwidth}
:::

::: theorem Raised-cosine pulses have zero ISI {#thm-rc-zero-isi}
For every $\alpha \in [0, 1]$ the raised-cosine pulse satisfies [[#eq-zero-isi]], and for $\alpha > 0$ its tails decay as $1/\lvert t\rvert^3$.
:::

::: proof
In the time domain: the first factor of [[#eq-rc-pulse]] is the sinc pulse, which is $1$ at $t = 0$ and $0$ at $t = nT$, $n \ne 0$. The second factor is $1$ at $t = 0$ and finite at every $t = nT$ (where the denominator vanishes, at $t = \pm T/(2\alpha)$, the numerator $\cos(\pi/2)$ vanishes too and the limit is $\pi/4$). So the product keeps the sinc's zeros. For large $\lvert t\rvert$ the first factor decays as $1/\lvert t\rvert$ and the second as $1/t^2$, giving $1/\lvert t\rvert^3$.

In the frequency domain: on the transition band put $f = \frac{1}{2T} + \nu$ with $\lvert\nu\rvert \le \frac{\alpha}{2T}$. Then $P(\frac{1}{2T} + \nu) = \frac T2[1 + \cos(\frac{\pi T}{\alpha}(\nu + \frac{\alpha}{2T}))] = \frac T2[1 - \sin(\frac{\pi T\nu}{\alpha})]$, and the copy shifted by $1/T$ gives $P(\frac{1}{2T} + \nu - \frac1T) = P(-\frac{1}{2T} + \nu) = P(\frac{1}{2T} - \nu) = \frac T2[1 + \sin(\frac{\pi T\nu}{\alpha})]$. Their sum is $T$, so [[#eq-nyquist]] holds.
:::

At $\alpha = 0$ the raised cosine is the sinc pulse with bandwidth $R_s/2$; at $\alpha = 1$ (the "full" raised cosine) it uses bandwidth $R_s$, twice the minimum, but its tails die quickly and it has extra zero crossings that make timing recovery easy. Practical systems choose $\alpha$ between about $0.1$ (bandwidth-critical cable and satellite systems) and $0.5$. In a receiver limited by white noise the overall raised-cosine response is split equally between transmitter and receiver: each has a **root-raised-cosine** filter $\sqrt{P(f)}$. The receive filter is then matched to the transmitted pulse, which [[communication-systems/optimal-detection]] shows is optimal for noise, and the cascade still has zero ISI.

::: widget plot
f: sinc(pi*x)*cos(pi*a*x)/(1 - (2*a*x)^2 + 1e-12); sinc(pi*x)
x: -5, 5
y: -0.3, 1.05
sliders: a=0.5:0:1:0.05
labels: \text{raised cosine}, \alpha; \text{sinc} (\alpha = 0)
caption: The raised-cosine pulse (blue) for roll-off $\alpha$, with time in symbol periods, against the minimum-bandwidth sinc pulse (orange). Both pass through zero at every nonzero integer, the sampling instants of the other symbols: zero ISI. Increase $\alpha$: the blue tails shrink rapidly, so a small timing error picks up little interference, at the cost of a bandwidth $(1 + \alpha)$ times the minimum. At $\alpha = 1$ the pulse also crosses zero at $\pm1.5, \pm2.5, \dots$.
:::

::: example Choosing the symbol alphabet and roll-off {#ex-modem-design}
Data at $R_b = 48\,\mathrm{kbit/s}$ must be sent over a baseband channel whose usable bandwidth is $16\,\mathrm{kHz}$, using raised-cosine pulses. (a) Can binary signalling be used? (b) Choose $M$ and $\alpha$. (c) What is the spectral efficiency?
::: solution
(a) Binary: $R_s = 48\,\mathrm{kbaud}$ needs $B = (1 + \alpha) \times 24\,\mathrm{kHz} \ge 24\,\mathrm{kHz}$, more than $16\,\mathrm{kHz}$ for every $\alpha$. Impossible.

(b) 4-level PAM: $R_s = 48/2 = 24\,\mathrm{kbaud}$ and $B = (1 + \alpha) \times 12\,\mathrm{kHz} \le 16\,\mathrm{kHz}$ requires $\alpha \le 1/3$. Choose $\alpha = 0.25$, giving $B = 15\,\mathrm{kHz}$ with $1\,\mathrm{kHz}$ to spare for filter tolerances. (8-PAM would allow $\alpha = 1$ but, as [[communication-systems/optimal-detection]] shows, needs about $6\,\mathrm{dB}$ more power than 4-PAM for the same error rate.)

(c) $\eta = R_b/B = 48/15 = 3.2\,\mathrm{bit/s/Hz}$. Generally a baseband $M$-ary raised-cosine system achieves $\eta = 2\log_2M/(1 + \alpha)$.
:::
:::

::: quiz
A raised-cosine system with $\alpha = 0.5$ occupies $3\,\mathrm{MHz}$ of baseband bandwidth and uses 4-level symbols. What is the bit rate?
- [ ] $3\,\mathrm{Mbit/s}$
- [ ] $6\,\mathrm{Mbit/s}$
- [x] $8\,\mathrm{Mbit/s}$
- [ ] $12\,\mathrm{Mbit/s}$
::: solution
$B = (1 + \alpha)R_s/2$ gives $R_s = 2 \times 3/1.5 = 4\,\mathrm{Mbaud}$, and two bits per symbol give $8\,\mathrm{Mbit/s}$. $12\,\mathrm{Mbit/s}$ ignores the roll-off; $6\,\mathrm{Mbit/s}$ confuses the bandwidth with the symbol rate.
:::
:::

## Eye diagrams {#sec-eye}

Nyquist's criterion is a statement about an ideal pulse. Real systems have imperfect filters, timing jitter and noise, and engineers need to see how close they are to the ideal. The tool is the **eye diagram**.

::: definition Eye diagram {#def-eye}
An **eye diagram** is formed by overlaying many segments of the received waveform $y(t)$, each spanning one or two symbol periods and triggered by the symbol clock, so that every possible pattern of neighbouring symbols appears superimposed. For binary signalling the traces form an opening — the **eye** — around each sampling instant. Its **vertical opening** at the sampling instant is the worst-case distance between the lowest "$+1$" trace and the highest "$-1$" trace; its **horizontal opening** is the range of sampling times over which the eye is open.
:::

The eye is read like a map of the receiver's margins. The best sampling time is where the eye is widest vertically. The vertical opening, divided by its value without ISI, is the fraction of the noise margin that survives ISI. The slope of the sides shows the sensitivity to timing error, and the spread of the zero crossings shows the jitter that a clock-recovery circuit will see. An eye that is closed means that some symbol patterns are decided wrongly even without noise.

::: widget plot
f: sum((2*mod(floor(1337/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(714/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(1650/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(397/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(1170/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(1877/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(170/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5); sum((2*mod(floor(925/2^(k + 5)), 2) - 1)*if(abs(1 - (2*a*(x - k))^2) < 1e-6, pi/4*sinc(pi/(2*a)), sinc(pi*(x - k))*cos(pi*a*(x - k))/(1 - (2*a*(x - k))^2)), k, -5, 5)
x: -1, 1
y: -1.8, 1.8
sliders: a=0.5:0.05:1:0.05
caption: A binary eye diagram: eight received waveforms, each the sum of eleven raised-cosine pulses carrying a different pattern of $\pm1$ symbols, drawn over two symbol periods centred on a sampling instant at $t = 0$ (time in symbol periods). At $t = 0$ every trace passes exactly through $+1$ or $-1$: zero ISI. Move away from the centre and the traces spread. Reduce the roll-off $\alpha$: the eye narrows horizontally and the overshoots grow, so a timing error costs more; at $\alpha = 1$ the zero crossings also bunch together at $t = \pm0.5$, which helps clock recovery.
:::

::: quiz
An oscilloscope shows a binary eye diagram whose vertical opening at the best sampling instant is $60\,\%$ of the opening of an ISI-free signal of the same amplitude. By how many decibels has the worst-case noise margin been reduced?
- [ ] $2.2\,\mathrm{dB}$
- [x] $4.4\,\mathrm{dB}$
- [ ] $6.0\,\mathrm{dB}$
- [ ] $8.9\,\mathrm{dB}$
::: solution
The noise margin is a voltage, so the loss is $20\log_{10}(0.6) = -4.4\,\mathrm{dB}$: the signal power would have to rise by $4.4\,\mathrm{dB}$ to restore the worst-case error rate. Using $10\log_{10}$ gives the wrong answer $2.2\,\mathrm{dB}$.
:::
:::

::: example The eye's sensitivity to timing error {#ex-timing}
Binary $\pm1$ symbols are sent with raised-cosine pulses, but the receiver samples $0.1T$ late. Find the signal term and the worst-case ISI for $\alpha = 0$, $0.25$, $0.5$ and $1$, and state which eyes remain open.
::: solution
The sample of symbol $0$ is $p(0.1T) + \sum_{n \ne 0}a_np(0.1T - nT)$. The signal term is $p(0.1T)$ and the worst-case ISI is $\sum_{n \ne 0}\lvert p(0.1T - nT)\rvert$. Summing [[#eq-rc-pulse]] numerically (two thousand terms each side):

| $\alpha$ | $p(0.1T)$ | worst-case ISI | vertical opening |
|---|---|---|---|
| $0$ | $0.984$ | $\approx1.6$ (grows without bound as more terms are added) | closed |
| $0.25$ | $0.983$ | $0.331$ | $0.652$ |
| $0.5$ | $0.981$ | $0.197$ | $0.785$ |
| $1$ | $0.974$ | $0.079$ | $0.896$ |

The vertical opening is signal minus worst-case ISI. For the sinc pulse the ISI sum behaves like $0.1\sum 1/n$, the harmonic series, which diverges: with a long enough random sequence some pattern always closes the eye. A modest roll-off fixes this completely; $\alpha = 0.5$ keeps $79\,\%$ of the opening at a $10\,\%$ timing error.
:::
:::

## Channel distortion and equalisation {#sec-equalisation}

Nyquist's criterion applies to the *overall* pulse: transmit filter, channel and receive filter together. When the channel is known and fixed, the filters can be designed so that the total is a raised cosine. Often the channel is neither known nor fixed (a telephone line of unknown length, a cable that changes with temperature), and its distortion produces ISI that the designer must estimate and remove.

::: example ISI from a first-order channel {#ex-rc-channel}
Polar NRZ pulses of amplitude $\pm A$ and duration $T$ pass through a channel that behaves as a first-order RC low-pass filter with time constant $\tau$, and are sampled at the end of each bit. (a) Show that the worst-case vertical eye opening, normalised to $A$, is $1 - 2e^{-T/\tau}$. (b) For a cable with $3\text{-dB}$ bandwidth $500\,\mathrm{kHz}$, evaluate it at $1$ and $3\,\mathrm{Mbit/s}$ and find the highest bit rate for which the eye is open. (c) If without ISI the sample would have $A/\sigma = 4$ ($\sigma$ the RMS noise), estimate the worst-case error probability $Q(\text{opening}\times A/\sigma)$ at $1\,\mathrm{Mbit/s}$.
::: solution
(a) A pulse of height $A$ on $[0, T)$ charges the RC output to $A(1 - e^{-x})$ at $t = T$, with $x = T/\tau$, and afterwards decays as $A(1 - e^{-x})e^{-(t - T)/\tau}$. So the sample of the current bit is $\pm A(1 - e^{-x})$ and the bit sent $m$ periods earlier contributes $\pm A(1 - e^{-x})e^{-mx}$. The worst case adds all past contributions with the wrong sign:

$$
\text{opening} = (1 - e^{-x}) - (1 - e^{-x})\sum_{m=1}^{\infty}e^{-mx} = (1 - e^{-x}) - e^{-x} = 1 - 2e^{-x} .
$$

(b) $\tau = 1/(2\pi \times 500\,\mathrm{kHz}) = 318\,\mathrm{ns}$. At $1\,\mathrm{Mbit/s}$, $x = 1\,\mathrm{\mu s}/318\,\mathrm{ns} = 3.14$ and the opening is $1 - 2e^{-3.14} = 0.914$. At $3\,\mathrm{Mbit/s}$, $x = 1.047$ and the opening is $1 - 2 \times 0.351 = 0.298$: the eye is less than a third open. It closes when $e^{-x} = \tfrac12$, i.e. $T = \tau\ln2$, so the highest rate is $R_b = 1/(\tau\ln2) = 2\pi \times 500\,\mathrm{kHz}/0.693 = 4.53\,\mathrm{Mbit/s}$.

(c) Without ISI, $Q(4) = 3.2\times10^{-5}$. With the worst pattern, $Q(0.914 \times 4) = Q(3.65) = 1.3\times10^{-4}$, four times larger, although the eye is still $91\,\%$ open. Because $Q$ falls so steeply, small losses of eye opening cost a lot of error rate; the average over patterns is better than the worst case but of the same order.
:::
:::

The **equaliser** is a filter in the receiver that undoes the channel's distortion. The most common form is a **transversal** (tapped-delay-line, FIR) filter whose taps are spaced by one symbol period, so it can be designed directly on the sampled pulse.

::: algorithm Zero-forcing equaliser {#alg-zero-forcing}
Given the samples $p_n = p(nT)$ of the received pulse, find $2N + 1$ tap weights $c_{-N}, \dots, c_N$ such that the equalised pulse $q_n = \sum_{k=-N}^{N}c_kp_{n-k}$ satisfies $q_0 = 1$ and $q_n = 0$ for $1 \le \lvert n\rvert \le N$:

1. Form the $(2N + 1)\times(2N + 1)$ matrix $\mathbf P$ with entries $P_{nk} = p_{n-k}$, $n, k = -N, \dots, N$.
2. Solve $\mathbf P\mathbf c = \mathbf e_0$, where $\mathbf e_0$ has a $1$ in the centre position and zeros elsewhere.
3. Check the residual ISI $q_n$ for $\lvert n\rvert > N$, which the equaliser does not control.
:::

The zero-forcing equaliser approximates the inverse of the channel. Its weakness is noise: where the channel response is small the inverse has a large gain, which amplifies the noise. The **minimum-mean-square-error** equaliser balances residual ISI against noise enhancement, and **adaptive** equalisers adjust their taps continuously from the data by the least-mean-squares algorithm; these belong to [[random-signals/optimal-filtering]] and [[dsp]].

::: example A three-tap zero-forcing equaliser {#ex-zf}
The received pulse samples are $p_{-1} = 0.1$, $p_0 = 1$, $p_1 = -0.2$, $p_2 = 0.05$, and all others are zero. Design a 3-tap zero-forcing equaliser and compare the peak distortion before and after.
::: solution
The equations $q_{-1} = 0$, $q_0 = 1$, $q_1 = 0$ are

$$
\begin{bmatrix}1 & 0.1 & 0\\ -0.2 & 1 & 0.1\\ 0.05 & -0.2 & 1\end{bmatrix}\begin{bmatrix}c_{-1}\\ c_0\\ c_1\end{bmatrix} = \begin{bmatrix}0\\ 1\\ 0\end{bmatrix} ,
$$

(row $n$ holds $p_{n-k}$ for $k = -1, 0, 1$). The solution is $c_{-1} = -0.0961$, $c_0 = 0.9611$, $c_1 = 0.1970$. The equalised samples outside the controlled range are $q_{-2} = c_{-1}p_{-1} = -0.0096$, $q_2 = c_{-1}p_3 + c_0p_2 + c_1p_1 = 0.0481 - 0.0394 = 0.0086$ and $q_3 = c_1p_2 = 0.0099$.

Peak distortion before: $(0.1 + 0.2 + 0.05)/1 = 0.35$. After: $0.0096 + 0.0086 + 0.0099 = 0.028$, more than ten times smaller. The worst-case eye opening rises from $65\,\%$ to $97\,\%$. A longer equaliser would push the residual ISI further out and make it smaller still.
:::
:::

::: warning Bits, symbols and bandwidth
The Nyquist limit is on the **symbol** rate: $R_s \le 2B$, not $R_b \le 2B$. A bandwidth of $B$ hertz carries $2B\log_2M$ bits per second with $M$-level symbols, and there is no limit from Nyquist alone on how large $M$ can be. The limit comes from noise: more levels packed into the same peak amplitude are closer together and easier to confuse. Hartley's formula $R = 2B\log_2M$ and Shannon's capacity $C = B\log_2(1 + S/N)$ are connected exactly by this argument.
:::

::: application Partial-response signalling
Instead of fighting the brick-wall problem with excess bandwidth, **partial-response** (correlative) coding introduces a controlled amount of ISI that the receiver knows about. In **duobinary** signalling each transmitted pulse is $p(t) = \operatorname{sinc}(t/T) + \operatorname{sinc}((t - T)/T)$, whose spectrum $2T\cos(\pi fT)e^{-j\pi fT}$ fits in the minimum bandwidth $1/(2T)$ but falls smoothly to zero at its edge, so it can be realised. Each sample is the sum of two adjacent symbols, taking three values. A simple precoder at the transmitter lets the receiver decide each bit from one sample without error propagation. Variants are used in optical transmission and were used in magnetic recording read channels (PRML), where the channel's own response is shaped into a partial-response pulse.
:::

## Where this leads

Every result here carries over to carrier-modulated systems, where the real symbols $a_k$ become complex points of a constellation and the pulse shapes the complex envelope: in [[communication-systems/digital-modulation]] a raised-cosine QPSK or QAM signal occupies $(1 + \alpha)R_s$ hertz around its carrier. The noise that we have so far treated with a single $A/\sigma$ is analysed properly in [[communication-systems/optimal-detection]], which shows that the receive filter should be matched to the transmitted pulse and computes the resulting error probabilities. Multipath radio channels produce ISI far worse than a cable's; [[communication-systems/wireless-communication]] avoids equalising them by splitting the data across many slow subcarriers (OFDM).

::: history
Harry Nyquist of AT&T analysed telegraph transmission in two papers: "Certain factors affecting telegraph speed" (1924) and "Certain topics in telegraph transmission theory" (Transactions of the AIEE, 1928). The second showed that $2B$ independent pulses per second can be sent through a bandwidth $B$ and derived the condition on the spectrum for undistorted pulse samples now called Nyquist's criterion, including the vestigial-symmetry construction behind raised-cosine pulses. Ralph Hartley's paper of the same year related the information rate to the bandwidth and the number of distinguishable levels. Adam Lender introduced duobinary signalling in 1963. Robert Lucky at Bell Laboratories invented the automatic and adaptive equaliser in 1965–66, which made data transmission at several kilobits per second over the switched telephone network practical.
:::

::: summary
- A baseband PAM signal is $\sum_ka_kp(t - kT)$; bandwidth is set by the symbol rate $R_s = 1/T$, and $R_b = R_s\log_2M$.
- Its PSD is $\lvert P(f)\rvert^2/T$ times the spectrum of the symbol sequence: the pulse sets the shape, symbol correlation (AMI) or pulse design (Manchester) removes DC, and a nonzero symbol mean wastes power in spectral lines.
- Zero ISI requires $p(nT) = \delta_n$, equivalently $\sum_kP(f - k/T) = T$ (Nyquist's criterion); the minimum bandwidth is $R_s/2$, reached only by the impractical sinc pulse.
- Raised-cosine pulses with roll-off $\alpha$ satisfy the criterion with bandwidth $(1 + \alpha)R_s/2$ and tails decaying as $1/t^3$; root-raised-cosine filters split the shaping between transmitter and receiver.
- The eye diagram displays ISI, noise margin and timing sensitivity; small roll-off makes the eye narrow and sensitive to timing error.
- Channel distortion causes ISI that a zero-forcing (or MMSE, or adaptive) transversal equaliser removes, at the risk of enhancing noise.
:::

## Exercises

::: exercise Nyquist bandwidth {level=1 check="4800"}
Find the minimum bandwidth in hertz needed to send $9600$ binary symbols per second without ISI.
::: solution
$B_{\min} = R_s/2 = 4800\,\mathrm{Hz}$, achieved only with sinc pulses.
:::
:::

::: exercise Raised-cosine bandwidth {level=1 check="750000"}
A system sends $1\,\mathrm{Mbaud}$ with raised-cosine pulses of roll-off $\alpha = 0.5$. Find the baseband bandwidth in hertz.
::: solution
$B = (1 + \alpha)R_s/2 = 1.5 \times 10^6/2 = 750\,\mathrm{kHz}$.
:::
:::

::: exercise Multilevel bit rate {level=1 check="6e6"}
An 8-level PAM system runs at $2\,\mathrm{Mbaud}$. Find the bit rate in bits per second, and the bandwidth with $\alpha = 0.25$.
::: solution
$R_b = 2\times10^6 \times \log_28 = 6\,\mathrm{Mbit/s}$. $B = 1.25 \times 2\times10^6/2 = 1.25\,\mathrm{MHz}$.
:::
:::

::: exercise The DC line of unipolar NRZ {level=2 check="0.5"}
For unipolar NRZ with equally likely independent bits, find the fraction of the total power carried by the DC spectral line. Why is this power wasted?
::: solution
The total power is $\E[a^2] = A^2/2$. The line at $f = 0$ has weight $\mu_a^2\lvert P(0)\rvert^2/T^2 = (A/2)^2 = A^2/4$. The fraction is $0.5$. The line is a deterministic component, known in advance, so it carries no information; it also cannot pass an AC-coupled link. Polar NRZ with the same peak-to-peak swing $A$ (levels $\pm A/2$) has power $A^2/4$ and the same random part.
:::
:::

::: exercise Maximum roll-off {level=2 check="1/3"}
In [[#ex-modem-design]], what is the largest roll-off factor that 4-level PAM can use? What would it be for 16-level PAM?
::: solution
$(1 + \alpha) \times 12\,\mathrm{kHz} \le 16\,\mathrm{kHz}$ gives $\alpha \le 1/3$. With 16 levels, $R_s = 12\,\mathrm{kbaud}$ and $(1 + \alpha)6 \le 16$ allows any $\alpha \le 1$; the full raised cosine fits with $4\,\mathrm{kHz}$ to spare.
:::
:::

::: exercise A pulse between samples {level=2 check="sin(pi/2)/(pi/2)*cos(pi/4)/0.75"}
Find the value of a raised-cosine pulse with $\alpha = 0.5$ at $t = T/2$, halfway between two sampling instants.
::: solution
From [[#eq-rc-pulse]] with $t/T = 1/2$: $\frac{\sin(\pi/2)}{\pi/2}\cdot\frac{\cos(\pi/4)}{1 - 0.25} = 0.6366 \times 0.7071/0.75 = 0.600$.
:::
:::

::: exercise A zero-forcing equaliser {level=2 check="1/0.88"}
The sampled pulse is $p_{-1} = 0.2$, $p_0 = 1$, $p_1 = 0.3$ (others zero). Find the centre tap $c_0$ of the 3-tap zero-forcing equaliser and the residual ISI samples.
::: solution
Solve $\begin{bmatrix}1 & 0.2 & 0\\ 0.3 & 1 & 0.2\\ 0 & 0.3 & 1\end{bmatrix}\mathbf c = (0, 1, 0)^{\mathsf T}$. From rows 1 and 3, $c_{-1} = -0.2c_0$ and $c_1 = -0.3c_0$; row 2 gives $c_0(1 - 0.06 - 0.06) = 1$, so $c_0 = 1/0.88 = 1.136$, $c_{-1} = -0.227$, $c_1 = -0.341$. Residual: $q_{-2} = c_{-1}p_{-1} = -0.045$, $q_2 = c_1p_1 = -0.102$. The peak distortion falls from $0.5$ to $0.148$.
:::
:::

::: exercise Zeros of the full raised cosine {level=3}
Show that for $\alpha = 1$ the raised-cosine pulse can be written $p(t) = \dfrac{\sin(2\pi t/T)}{(2\pi t/T)(1 - 4t^2/T^2)}$, and deduce that it crosses zero at $t = \pm1.5T, \pm2T, \pm2.5T, \dots$ as well as at the sampling instants. Why does this help a receiver recover the symbol clock from the zero crossings of a polar signal?
::: hint
Use $\sin\theta\cos\theta = \tfrac12\sin2\theta$.
:::
::: solution
With $\alpha = 1$, $p(t) = \frac{\sin(\pi t/T)\cos(\pi t/T)}{(\pi t/T)(1 - 4t^2/T^2)} = \frac{\frac12\sin(2\pi t/T)}{(\pi t/T)(1 - 4t^2/T^2)} = \frac{\sin(2\pi t/T)}{(2\pi t/T)(1 - 4t^2/T^2)}$. The numerator vanishes at $t = kT/2$ for every integer $k \ne 0$. At $k = \pm1$ the denominator also vanishes, and the limit is $\frac{\sin(\pi + 2\pi\epsilon)}{\pi(-4\epsilon)}\to\frac12$ (writing $t/T = \tfrac12 + \epsilon$), so $p(\pm T/2) = \tfrac12$. All other half-integer multiples of $T$ are zeros. Consequently, when symbol $a_0 = +1$ is followed by $a_1 = -1$, the waveform at $t = T/2$ is $\tfrac12 - \tfrac12$ plus contributions from other symbols at $t = T/2 - nT$, which are all zero: the transition crosses zero *exactly* midway between sampling instants, whatever the other symbols. Zero crossings with no jitter give a clock-recovery circuit a clean timing reference.
:::
:::

::: exercise Duobinary signalling {level=3}
In duobinary signalling the overall pulse is $p(t) = \operatorname{sinc}(t/T) + \operatorname{sinc}((t - T)/T)$ with $\operatorname{sinc}u = \sin(\pi u)/(\pi u)$. (a) Show that $P(f) = 2T\cos(\pi fT)e^{-j\pi fT}$ for $\lvert f\rvert < 1/(2T)$ and zero outside. (b) With $a_k = \pm1$, show that the samples $y(kT) = a_k + a_{k-1}$ take three values, and explain why a single decision error can propagate if the receiver decodes $a_k = y(kT) - \hat a_{k-1}$. (c) The transmitter instead sends $a_k = 2d_k - 1$ with the precoded bits $d_k = b_k \oplus d_{k-1}$. Show that $b_k = 1$ if and only if $y(kT) = 0$, so each bit is decided from one sample.
::: solution
(a) $\operatorname{sinc}(t/T)$ has transform $T$ on $\lvert f\rvert < 1/(2T)$; the delayed copy has $Te^{-j2\pi fT}$. The sum is $T(1 + e^{-j2\pi fT}) = Te^{-j\pi fT}(e^{j\pi fT} + e^{-j\pi fT}) = 2T\cos(\pi fT)e^{-j\pi fT}$, which falls to zero at the band edge $\lvert f\rvert = 1/(2T)$.

(b) $p(0) = 1$, $p(T) = 1$ and $p(nT) = 0$ otherwise, so $y(kT) = a_k + a_{k-1} \in \{-2, 0, +2\}$. Subtracting the previous *decision* means that a wrong $\hat a_{k-1}$ makes $\hat a_k$ wrong too, and so on: errors propagate.

(c) $y = a_k + a_{k-1} = 2(d_k + d_{k-1} - 1)$. If $b_k = 0$ then $d_k = d_{k-1}$, so $y = \pm2$; if $b_k = 1$ then $d_k \ne d_{k-1}$, so $d_k + d_{k-1} = 1$ and $y = 0$. Hence the rule "$\hat b_k = 1$ if $\lvert y(kT)\rvert < 1$, else $0$" uses only the current sample, and an error affects only one bit.
:::
:::
