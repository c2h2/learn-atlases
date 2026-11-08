At the far end of an optical link, after a hundred kilometres of fibre, the signal may have dwindled to a few microwatts — tens of thousands of photons per bit at $10\,\mathrm{Gb/s}$, and far fewer for long-haul systems. The receiver must turn this faint light back into clean bits, at the full data rate, with an error rate of one in a billion or better. How well it can do so depends on two things: how efficiently the detector converts photons to electrons, and how much noise is added in the process — by the randomness of the photons themselves, by the detector's dark current, and above all by the amplifier that follows. The minimum optical power that achieves the required error rate is the receiver's **sensitivity**, and it is one of the two numbers (the other being transmitter power) that fix the loss a link can tolerate.

The photodiode was introduced in [[semiconductor-devices/diodes-photonic-devices]], with its responsivity $\mathcal R = \eta q/h\nu$, its cut-off wavelength $\lambda_c = 1.24/E_g$ and the efficiency–speed trade-off of the p-i-n structure. This lesson develops the photodiode into a receiver: the bandwidth limits of p-i-n diodes, the internal gain and excess noise of avalanche photodiodes, the noise sources of a receiver and its signal-to-noise ratio, the relation between noise and bit error rate, and the fundamental quantum limit. The noise concepts — shot noise, thermal noise, noise bandwidth — come from [[electronics-2/electronic-noise]] and [[random-signals/gaussian-noise]].

## Photodetection and its statistics {#sec-statistics}

An ideal photodetector produces one electron for each absorbed photon, and the photons of even a perfectly steady laser beam arrive at random. For coherent light, the number of photons counted in a time interval follows a **Poisson distribution**: if the mean count is $\bar n$, the probability of counting exactly $n$ is $\bar n^ne^{-\bar n}/n!$, and the variance equals the mean. This randomness is not a defect of the source or the detector; it is the quantum nature of light, and it sets a floor below which no receiver can go.

::: definition Photocurrent and dark current {#def-photocurrent}
A photodetector of responsivity $\mathcal R$ illuminated with optical power $P$ delivers a mean **photocurrent** $I_p = \mathcal RP$, where $\mathcal R = \eta q/h\nu = \eta\lambda_0/1.240\,\mathrm{\mu m}$ A/W ([[semiconductor-devices/diodes-photonic-devices#def-responsivity]]). In addition it delivers a **dark current** $I_d$ in the absence of light, from thermal generation in the depletion region and surface leakage. Both currents consist of discrete, independent charge carriers.
:::

::: theorem Shot noise of a photocurrent {#thm-shot}
A current $I$ made of independent electrons arriving as a Poisson process, observed through a filter of noise bandwidth $B$, has a fluctuation of mean-square value

$$
\sigma_s^2 = \overline{i_s^2} = 2qIB .
$$ {#eq-shot}

For a photodiode $I = I_p + I_d$.
:::

::: proof
A short derivation (a general one, via Campbell's theorem, is in [[random-signals/gaussian-noise]]). Average the current over a time $T$: the measured value is $i = qn/T$, where $n$ is the Poisson-distributed number of electrons, with mean $\bar n = IT/q$ and variance $\bar n$. The variance of $i$ is $q^2\bar n/T^2 = qI/T$. An averaging window of length $T$ is a filter with noise bandwidth $B = 1/2T$ (its frequency response is $\mathrm{sinc}(\pi fT)$, and $\int_0^\infty\mathrm{sinc}^2(\pi fT)\,\dd f = 1/2T$). Substituting $T = 1/2B$ gives $\sigma^2 = 2qIB$. The same result holds for any filter, with $B$ its noise bandwidth.
:::

Shot noise grows only as the square root of the signal current, so the **signal-to-noise ratio** of an ideal detector (no dark current, no amplifier noise) is

$$
\mathrm{SNR} = \frac{I_p^2}{2qI_pB} = \frac{I_p}{2qB} = \frac{\eta P}{2h\nu B} ,
$$ {#eq-snr-quantum}

the number of photoelectrons counted in a time $1/2B$. One microwatt at $1550\,\mathrm{nm}$ on a detector with $\mathcal R = 0.9\,\mathrm{A/W}$ in a $1\,\mathrm{GHz}$ bandwidth gives $\mathrm{SNR} = 0.9\times10^{-6}/(2\times1.6\times10^{-19}\times10^9) = 2.8\times10^3$, or $34.5\,\mathrm{dB}$ — a ceiling set by physics.

### The quantum limit

For digital on–off keying the quantum limit can be stated without any Gaussian approximation. Suppose the receiver simply counts photons in each bit slot and decides "1" if it counts at least one, "0" otherwise. With no dark counts, a "0" (no light) is never mistaken. A "1" carrying a mean of $N_1$ photons is mistaken only if no photon is counted, with Poisson probability $e^{-N_1}$.

::: theorem Quantum limit of direct detection {#thm-quantum-limit}
An ideal photon-counting receiver for equally likely on–off-keyed bits, in which a "1" carries a mean of $N_1$ photons and a "0" none, has bit error probability

$$
P_e = \tfrac12e^{-N_1} .
$$ {#eq-quantum-limit}

A bit error rate of $10^{-9}$ requires $N_1 = \ln(1/2\times10^{-9}) = 20$ photons per "1", an average of $\bar N = 10$ photons per bit. The corresponding average power at bit rate $B$ is $P = \bar Nh\nu B$.
:::

::: proof
Errors occur only on "1"s, which occur half the time, and each is in error with probability $\Prob\{n = 0\} = e^{-N_1}$. Hence $P_e = \tfrac12e^{-N_1}$. Solving $\tfrac12e^{-N_1} = 10^{-9}$ gives $N_1 = 20.0$. The average over "1"s and "0"s is $10$ photons, and $P = 10h\nu B$.
:::

At $10\,\mathrm{Gb/s}$ and $1550\,\mathrm{nm}$ the quantum limit is $10\times1.28\times10^{-19}\times10^{10}\,\mathrm W = 12.8\,\mathrm{nW}$, or $-48.9\,\mathrm{dBm}$. Practical direct-detection receivers need $20$–$30\,\mathrm{dB}$ more, almost entirely because of amplifier noise. Closing that gap is what avalanche photodiodes, optical preamplifiers and coherent receivers are for.

::: example How many photons per bit? {#ex-photons-per-bit}
A $10\,\mathrm{Gb/s}$ receiver at $1550\,\mathrm{nm}$ works at an average power of $-21\,\mathrm{dBm}$. How many photons arrive per bit on average, and how many in a "1"? Compare with the quantum limit, and say what the number would be at $-30\,\mathrm{dBm}$.
::: solution
$-21\,\mathrm{dBm}$ is $10^{-2.1}\,\mathrm{mW} = 7.94\,\mathrm{\mu W}$. One bit lasts $100\,\mathrm{ps}$ and one photon carries $h\nu = 1.28\times10^{-19}\,\mathrm J$, so the average number per bit is

$$
\bar N = \frac{P}{h\nu B} = \frac{7.94\times10^{-6}}{1.28\times10^{-19}\times10^{10}} = 6.2\times10^3 ,
$$

and a "1" carries twice that, $12\,400$ photons. That is $620$ times ($28\,\mathrm{dB}$) more than the $10$ photons per bit of the quantum limit. At $-30\,\mathrm{dBm}$ the count is $780$ photons per bit, still large enough that the Poisson distribution of the counts is close to Gaussian — the justification for the Gaussian noise model used below.
:::
:::

## The p-i-n photodiode {#sec-pin}

A **p-i-n photodiode** has a lightly doped intrinsic layer of thickness $W$ between thin p$^+$ and n$^+$ contact layers. Under a reverse bias of a few volts the i-layer is fully depleted, so photons absorbed there generate pairs that are swept out by the field at close to their saturation velocity. For fibre communication at $1.3$–$1.6\,\mathrm{\mu m}$, the i-layer is In$_{0.53}$Ga$_{0.47}$As ($E_g = 0.75\,\mathrm{eV}$, $\lambda_c = 1.65\,\mathrm{\mu m}$), lattice-matched to InP contacts that are transparent at these wavelengths; at $850\,\mathrm{nm}$ silicon or GaAs is used; in silicon photonics, germanium grown on silicon.

### Efficiency

Light entering through the top contact is partly reflected at the surface and is absorbed exponentially with coefficient $\alpha$ in the i-layer. If the contact layer is thin and transparent, the quantum efficiency is

$$
\eta = (1 - R_s)\left(1 - e^{-\alpha W}\right) ,
$$ {#eq-eta}

where $R_s$ is the surface reflectance (reduced to below $1\,\%$ by an anti-reflection coating). For InGaAs, $\alpha \approx 0.8\times10^4\,\mathrm{cm^{-1}}$ at $1550\,\mathrm{nm}$: a $1\,\mathrm{\mu m}$ layer absorbs $55\,\%$ of the light and a $3\,\mathrm{\mu m}$ layer $91\,\%$. A thick i-layer is efficient; the question is whether it is fast enough.

### Bandwidth

Two time constants limit the speed of a p-i-n diode.

- **Transit time.** Carriers generated across the i-layer take up to $W/v_{\mathrm{sat}}$ to reach the contacts, with saturation velocities of about $6\times10^6\,\mathrm{cm/s}$ (an average of electrons and holes) in InGaAs. For uniform generation across the layer the resulting impulse response is roughly rectangular, and its 3-dB bandwidth is

  $$
  f_{tr} \approx \frac{0.45\,v_{\mathrm{sat}}}{W} .
  $$ {#eq-ftr}

- **RC time constant.** The depleted layer is a parallel-plate capacitor, $C_j = \epsilon A/W$, which with the load resistance $R_L$ (and the series resistance of the diode) forms a low-pass filter with $f_{RC} = 1/2\pi R_LC_j$.

Making $W$ thinner raises $f_{tr}$ but increases $C_j$ and lowers $f_{RC}$; making the area smaller helps the RC limit but makes the detector harder to illuminate. Approximating the combined response as $1/f_{3\mathrm{dB}}^2 = 1/f_{tr}^2 + 1/f_{RC}^2$, the bandwidth is greatest when the two limits are equal.

::: widget plot
f: 27/x; 1.6466e6*x/(R*D^2); 1/sqrt((x/27)^2 + (R*D^2/(1.6466e6*x))^2)
x: 0.1, 4
y: 0, 80
sliders: D=30:10:80:1; R=50:25:100:5
labels: f_{tr}\ (\mathrm{GHz}); f_{RC}\ (\mathrm{GHz}); f_{3\mathrm{dB}}
caption: Bandwidth limits of an InGaAs p-i-n photodiode against i-layer thickness $W$ in micrometres, for a detector of diameter $D$ in micrometres and load resistance $R$ in ohms ($v_{\mathrm{sat}} = 6\times10^6\,\mathrm{cm/s}$, $\epsilon_r = 13.9$). The transit-time limit (blue) falls as $1/W$; the RC limit (orange) rises in proportion to $W$; the combined bandwidth (green) peaks where they cross. At $D = 30\,\mathrm{\mu m}$, $R = 50\,\Omega$ the optimum is $W \approx 0.86\,\mathrm{\mu m}$ and about $22\,\mathrm{GHz}$. Enlarge the detector: the optimum moves to thicker layers and lower bandwidth. High-speed detectors are small.
:::

::: example Designing a 10 Gb/s photodiode {#ex-pin-design}
Design the i-layer thickness of a top-illuminated InGaAs p-i-n photodiode of diameter $30\,\mathrm{\mu m}$ into a $50\,\Omega$ load, using the parameters of the widget, for the widest bandwidth. Find the bandwidth, the quantum efficiency (with a perfect anti-reflection coating) and the responsivity at $1550\,\mathrm{nm}$. Is it suitable for a $10\,\mathrm{Gb/s}$ receiver, and what would you change to improve the efficiency?
::: solution
The area is $A = \pi(15\,\mathrm{\mu m})^2 = 7.07\times10^{-10}\,\mathrm{m^2}$. Setting $f_{tr} = f_{RC}$:

$$
\frac{0.45v_{\mathrm{sat}}}{W} = \frac{W}{2\pi R_L\epsilon A} \quad\Rightarrow\quad W = \sqrt{0.45v_{\mathrm{sat}}\cdot2\pi R_L\epsilon A} = \sqrt{0.45\times6\times10^4\times2\pi\times50\times1.231\times10^{-10}\times7.07\times10^{-10}} = 0.86\,\mathrm{\mu m}.
$$

Then $f_{tr} = 0.45\times6\times10^4/0.86\times10^{-6} = 31.4\,\mathrm{GHz}$, $C_j = \epsilon A/W = 101\,\mathrm{fF}$, $f_{RC} = 31.5\,\mathrm{GHz}$ and the combined bandwidth $31.4/\sqrt2 = 22\,\mathrm{GHz}$, ample for $10\,\mathrm{Gb/s}$ (which needs about $7\,\mathrm{GHz}$). The efficiency is only $\eta = 1 - e^{-0.8\times0.86} = 0.50$ and $\mathcal R = 0.50\times1.55/1.240 = 0.62\,\mathrm{A/W}$.

Since $22\,\mathrm{GHz}$ is three times more than needed, we can thicken the layer: at $W = 2\,\mathrm{\mu m}$, $f_{tr} = 13.5\,\mathrm{GHz}$, $f_{RC} = 73\,\mathrm{GHz}$, $f_{3\mathrm{dB}} = 13.3\,\mathrm{GHz}$, and $\eta = 0.80$, $\mathcal R = 1.0\,\mathrm{A/W}$. Further options: a reflective back contact so light crosses the layer twice; a **waveguide photodiode**, illuminated from the side so that light is absorbed along the length while carriers cross the thin layer — decoupling efficiency from transit time; or a smaller diameter if the fibre coupling allows.
:::
:::

## Avalanche photodiodes {#sec-apd}

When the signal is so weak that the photocurrent is buried in amplifier noise, it helps to amplify the current inside the detector, before the amplifier adds its noise. An **avalanche photodiode** (APD) does this by impact ionisation: in a region of very high field, close to breakdown, a carrier gains enough energy between collisions to create a new electron–hole pair, which can in turn ionise, and so on. Each primary photoelectron is multiplied into an average of $M$ electrons, the **avalanche gain**, typically $5$–$20$ in InGaAs/InP APDs and up to $100$ or more in silicon.

The multiplication is itself random: some primaries produce many secondaries, others few. The shot noise of the primary current is therefore amplified by more than $M^2$.

::: theorem Excess noise of an APD (McIntyre) {#thm-excess}
An APD with mean gain $M$ multiplies the primary shot noise to

$$
\sigma_s^2 = 2qM^2F(M)(I_p + I_d)B, \qquad F(M) = kM + (1 - k)\left(2 - \frac1M\right) ,
$$ {#eq-excess}

where $F$ is the **excess noise factor** and $k$ is the ratio of the ionisation coefficients of the less-ionising to the more-ionising carrier, with injection of the more-ionising carrier into the multiplication region. $F \ge 1$ always; $F \approx 2$ when $k \to 0$, and $F \approx kM$ for $kM \gg 1$.
:::

::: proof
The derivation, by solving for the mean and mean-square number of carriers produced by the avalanche in a uniform field, is in R. J. McIntyre, *IEEE Trans. Electron Devices* 13, 164 (1966), and in Saleh & Teich, Chapter 19. The structure of the result can be seen from the definition $F = \overline{m^2}/\bar m^2$, the mean-square gain divided by the square of the mean gain: the multiplied noise is $2q\overline{m^2}I_pB = 2qM^2FI_pB$. If only one kind of carrier ionises ($k = 0$), the avalanche is a simple branching process that ends when the carriers leave the region, and its gain fluctuates with a variance close to $M^2$, giving $F \to 2$. If both carriers ionise ($k > 0$), secondary holes travelling backwards start new chains, the process feeds back on itself, and rare large bursts make $F$ grow in proportion to $M$.
:::

Material matters. Silicon has $k \approx 0.02$ for electrons and makes excellent low-noise APDs at visible and $850\,\mathrm{nm}$ wavelengths. InP, used as the multiplication layer of InGaAs APDs ("separate absorption and multiplication" structures), has $k \approx 0.4$–$0.5$; InAlAs about $0.2$; germanium nearly $1$. Avalanche gain also builds up over several transit times, which gives an APD a **gain–bandwidth product** of order $100$–$300\,\mathrm{GHz}$: at $10\,\mathrm{Gb/s}$ the useful gain is limited to about $10$.

::: warning The gain multiplies the noise too
An APD does not improve the signal-to-noise ratio of the photocurrent itself: with $F > 1$ it makes it worse. It helps only because it raises the signal above *amplifier* noise, which it does not multiply. If a receiver is already shot-noise-limited (for example, because an optical amplifier precedes it), an APD only adds excess noise. Increasing $M$ beyond its optimum also lowers the SNR, because the excess noise grows faster than the signal.
:::

::: example When dark current matters {#ex-dark}
A germanium photodiode in a silicon-photonic receiver has a dark current of $1\,\mathrm{\mu A}$ at its operating bias, much more than an InGaAs diode ($\sim10\,\mathrm{nA}$). The receiver has $B = 7.5\,\mathrm{GHz}$ and $\sigma_T = 1.2\,\mathrm{\mu A}$. (a) Is the dark-current shot noise significant for a p-i-n receiver? (b) A germanium APD with the same dark current, all of it multiplied, is used at $M = 10$ with $F = 5.95$. Is it significant now?
::: solution
(a) $\sqrt{2qI_dB} = \sqrt{2\times1.602\times10^{-19}\times10^{-6}\times7.5\times10^9} = 49\,\mathrm{nA}$. Its variance is $(0.049/1.2)^2 = 0.17\,\%$ of the thermal variance: negligible.

(b) Multiplied, the dark noise becomes $\sqrt{2qM^2FI_dB} = 49\,\mathrm{nA}\times10\times\sqrt{5.95} = 1.20\,\mathrm{\mu A}$, as large as the thermal noise — the APD's benefit is largely lost. This is why dark current is a key APD specification and why germanium, with its large dark current and $k$ near $1$, makes poor APDs; practical germanium-on-silicon APDs use silicon as the multiplication layer, where $k$ is small and only the photocurrent generated in the germanium is injected. Real APD dark current also has an unmultiplied surface component, which adds noise only at $M = 1$.
:::
:::

## Receiver noise and signal-to-noise ratio {#sec-snr}

The photodiode is followed by a **front-end amplifier**, almost always a **transimpedance amplifier** (TIA): an inverting amplifier with a feedback resistor $R_f$ that converts the photocurrent into a voltage with low input impedance, so that the photodiode capacitance does not limit the bandwidth as much as a plain load resistor would. Its noise is described by an equivalent input noise current. For a resistor $R$ at temperature $T$ the thermal noise current is $4k_BTB/R$ ([[electronics-2/electronic-noise]]); the amplifier adds more, which is summarised by a noise figure $F_n$:

$$
\sigma_T^2 = \frac{4k_BTF_nB}{R_L} ,
$$ {#eq-thermal}

with $R_L$ the load (or feedback) resistance. Rather than computing it from components, receiver data sheets often quote an **input-referred noise current**, for example $1.2\,\mathrm{\mu A}$ rms over the bandwidth of a $10\,\mathrm{Gb/s}$ TIA.

::: theorem Signal-to-noise ratio of an optical receiver {#thm-snr}
A receiver with an APD of gain $M$ and excess noise factor $F(M)$ (for a p-i-n diode, $M = F = 1$), responsivity $\mathcal R$, dark current $I_d$ and input-referred thermal noise variance $\sigma_T^2$ has, for received optical power $P$,

$$
\mathrm{SNR} = \frac{(M\mathcal RP)^2}{2qM^2F(M)(\mathcal RP + I_d)B + \sigma_T^2} .
$$ {#eq-snr}

When $\sigma_T^2$ dominates (the **thermal-noise limit**), $\mathrm{SNR} \propto P^2$; when shot noise dominates (the **shot-noise limit**), $\mathrm{SNR} \propto P$. For $kM \gg 1$, the SNR is maximised by the gain

$$
M_{\mathrm{opt}} \approx \left(\frac{\sigma_T^2}{kqB(\mathcal RP + I_d)}\right)^{1/3} .
$$ {#eq-mopt}
:::

::: proof
The signal is the multiplied photocurrent $M\mathcal RP$, and the noise sources — multiplied shot noise [[#eq-excess]] and thermal noise — are independent, so their variances add. Dividing numerator and denominator by $M^2$, $\mathrm{SNR} = (\mathcal RP)^2/[2qF(M)(\mathcal RP + I_d)B + \sigma_T^2/M^2]$. With $F \approx kM$ the denominator is $2qkM(\mathcal RP + I_d)B + \sigma_T^2/M^2$, which has its minimum where its derivative with respect to $M$ vanishes: $2qk(\mathcal RP + I_d)B = 2\sigma_T^2/M^3$, giving [[#eq-mopt]].
:::

::: widget plot
f: 10*log10((0.9*x*1e-3*10^(P/10))^2/(2*1.602e-19*7.5e9*x^2*(k*x + (1 - k)*(2 - 1/x))*0.9*1e-3*10^(P/10) + (1.2e-6)^2)); 10*log10((0.9*1e-3*10^(P/10))^2/(2*1.602e-19*7.5e9*0.9*1e-3*10^(P/10)))
x: 1, 60
y: 0, 35
sliders: P=-30:-40:-15:0.5; k=0.5:0.02:1:0.01
labels: \mathrm{SNR}\ (\mathrm{dB}),\ \text{APD}; \text{shot-noise limit}
caption: Signal-to-noise ratio of a $10\,\mathrm{Gb/s}$ receiver (noise bandwidth $7.5\,\mathrm{GHz}$, $\mathcal R = 0.9\,\mathrm{A/W}$, thermal noise $1.2\,\mathrm{\mu A}$ rms) against APD gain $M$, for received power $P$ in dBm and ionisation ratio $k$, from [[#eq-snr]]. The orange line is the shot-noise limit of a perfect p-i-n diode with no amplifier noise. At $M = 1$ (a p-i-n diode) thermal noise dominates and the SNR is far below that limit. Raising $M$ improves the SNR until excess noise takes over; the optimum is broad. Reduce $k$ to $0.02$ (silicon-like): the optimum gain rises and the SNR approaches the limit within $3\,\mathrm{dB}$ ($F \to 2$). Raise $P$: the optimum gain falls.
:::

::: quiz
An optical amplifier is added in front of an APD receiver, raising the signal so much that the receiver becomes limited by the amplified noise of the light rather than by thermal noise. What is now the best APD gain?
- [x] $M = 1$, or as low as the APD allows
- [ ] The same optimum as before
- [ ] As high as possible, to amplify the signal further
- [ ] $M = 1/k$
::: solution
The APD multiplies signal and optical noise alike, and adds its own excess noise $F(M)$ on top. Its only benefit is to lift the signal above thermal noise, which no longer dominates. With $\sigma_T$ negligible, [[#eq-mopt]] gives $M_{\mathrm{opt}} \to 1$. Optically preamplified receivers use p-i-n diodes.
:::
:::

## Bit error rate and sensitivity {#sec-ber}

For a digital receiver the figure of merit is the bit error rate (BER). After the front end and a filter, the receiver samples the signal once per bit and compares it with a threshold. If a "1" produces a mean current $I_1$ with Gaussian noise of standard deviation $\sigma_1$, and a "0" produces $I_0$ with $\sigma_0$, errors occur when the noise pushes a sample across the threshold. The Gaussian model fits thermal noise exactly and amplified shot noise well when many electrons are counted per bit. (Optimal detection in Gaussian noise is developed in [[communication-systems/optimal-detection]].)

::: theorem Bit error rate and the Q factor {#thm-q}
For equally likely bits and the threshold that minimises errors (approximately $I_{th} = (\sigma_0I_1 + \sigma_1I_0)/(\sigma_0 + \sigma_1)$), the bit error rate is

$$
\mathrm{BER} = \frac12\operatorname{erfc}\!\left(\frac{Q}{\sqrt2}\right) \approx \frac{e^{-Q^2/2}}{Q\sqrt{2\pi}}, \qquad Q = \frac{I_1 - I_0}{\sigma_1 + \sigma_0} .
$$ {#eq-ber}

$\mathrm{BER} = 10^{-9}$ requires $Q = 6.0$, and $10^{-12}$ requires $Q = 7.0$.
:::

::: proof
A "1" is in error when its sample falls below $I_{th}$, with probability $\tfrac12\operatorname{erfc}((I_1 - I_{th})/\sigma_1\sqrt2)$; a "0" when it exceeds $I_{th}$, with probability $\tfrac12\operatorname{erfc}((I_{th} - I_0)/\sigma_0\sqrt2)$. The BER is the average of the two. With the stated threshold, $(I_1 - I_{th})/\sigma_1 = (I_{th} - I_0)/\sigma_0 = (I_1 - I_0)/(\sigma_0 + \sigma_1) = Q$, so both probabilities equal $\tfrac12\operatorname{erfc}(Q/\sqrt2)$. (This threshold equalises the two arguments; the exact minimum differs slightly when $\sigma_0 \neq \sigma_1$, but negligibly.) The asymptotic form follows from $\operatorname{erfc}(x) \approx e^{-x^2}/(x\sqrt\pi)$.
:::

::: widget plot
f: log10(0.5*(1 - erf(x/sqrt(2)))); log10(exp(-x^2/2)/(x*sqrt(2*pi)))
x: 1, 8
y: -15, 0
hlines: -9; -12
labels: \log_{10}\mathrm{BER}; \text{asymptotic form}
caption: Bit error rate (logarithmic) against the $Q$ factor, from [[#eq-ber]], with the asymptotic approximation $e^{-Q^2/2}/(Q\sqrt{2\pi})$. The curve is very steep: going from $Q = 6$ to $Q = 7$ (a $1.3\,\mathrm{dB}$ increase in a thermal-noise-limited receiver's optical power) lowers the BER a thousandfold, from $10^{-9}$ to $10^{-12}$. Systems with forward error correction operate at a pre-correction BER of about $10^{-3}$–$10^{-2}$, i.e. $Q \approx 2.3$–$3$, and let the decoder do the rest.
:::

::: theorem Sensitivity of a thermal-noise-limited p-i-n receiver {#thm-sensitivity}
For on–off keying with $I_0 = 0$ (infinite extinction ratio) and thermal noise dominating, the average received power needed for a given $Q$ is

$$
\bar P_{\mathrm{rec}} = \frac{Q\sigma_T}{\mathcal R} .
$$ {#eq-sensitivity}
:::

::: proof
The average power is the mean of $P_1$ and $P_0 = 0$, so $I_1 = 2\mathcal R\bar P$. With $\sigma_0 = \sigma_1 = \sigma_T$, $Q = I_1/2\sigma_T = \mathcal R\bar P/\sigma_T$, which gives [[#eq-sensitivity]].
:::

Sensitivity of a thermal-noise-limited receiver therefore scales as $\sigma_T \propto \sqrt B$: doubling the bit rate costs $1.5\,\mathrm{dB}$ of sensitivity (more in practice, since faster amplifiers are noisier).

::: example Sensitivity of p-i-n and APD receivers {#ex-sensitivity}
A $10\,\mathrm{Gb/s}$ receiver has noise bandwidth $7.5\,\mathrm{GHz}$ and input-referred thermal noise $\sigma_T = 1.2\,\mathrm{\mu A}$ rms. Find its sensitivity at $\mathrm{BER} = 10^{-9}$ (a) with a p-i-n photodiode of $\mathcal R = 0.9\,\mathrm{A/W}$, (b) with an InGaAs/InP APD of the same primary responsivity, $k = 0.5$, used at $M = 10$, and (c) compare both with the quantum limit.
::: solution
(a) By [[#eq-sensitivity]], $\bar P = 6\times1.2\times10^{-6}/0.9 = 8.0\,\mathrm{\mu W}$, or $-21.0\,\mathrm{dBm}$. Check the assumption: at this power the "1" current is $14.4\,\mathrm{\mu A}$, with shot noise $\sqrt{2qIB} = 0.19\,\mathrm{\mu A}$, small compared with $1.2\,\mathrm{\mu A}$.

(b) With the APD, $F = 0.5\times10 + 0.5\times(2 - 0.1) = 5.95$. Now $I_1 = 2M\mathcal R\bar P$, $\sigma_0 = \sigma_T$ and $\sigma_1 = \sqrt{2qM^2F\cdot2\mathcal R\bar P\,B + \sigma_T^2}$. The condition $Q = I_1/(\sigma_0 + \sigma_1) = 6$ is solved numerically for $\bar P$: $\bar P = 1.09\,\mathrm{\mu W}$, i.e. $-29.6\,\mathrm{dBm}$. (Check: $I_1 = 2\times10\times0.9\times1.09\,\mathrm{\mu A} = 19.6\,\mathrm{\mu A}$; the multiplied shot noise of a \"1\" is $\sqrt{2\times1.6\times10^{-19}\times100\times5.95\times1.96\times10^{-6}\times7.5\times10^9} = 1.67\,\mathrm{\mu A}$, so $\sigma_1 = \sqrt{1.67^2 + 1.2^2} = 2.06\,\mathrm{\mu A}$ and $Q = 19.6/(1.2 + 2.06) = 6.0$.) The APD improves the sensitivity by $8.6\,\mathrm{dB}$. Optimising $M$ numerically gives $M \approx 18$ and $-30.3\,\mathrm{dBm}$, only $0.7\,\mathrm{dB}$ better — the optimum is flat, and the gain–bandwidth product argues for the lower gain.

(c) The quantum limit at $10\,\mathrm{Gb/s}$ is $-48.9\,\mathrm{dBm}$ ([[#thm-quantum-limit]]). The p-i-n receiver is $28\,\mathrm{dB}$ away from it and the APD receiver $19\,\mathrm{dB}$; the gap is amplifier noise.
:::
:::

::: quiz
A thermal-noise-limited p-i-n receiver has a BER of $10^{-9}$. The received optical power is reduced by $1\,\mathrm{dB}$. Roughly what is the new BER?
- [ ] $10^{-8}$
- [x] Between $10^{-7}$ and $10^{-6}$
- [ ] $10^{-3}$
- [ ] Still $10^{-9}$, since $1\,\mathrm{dB}$ is within the noise
::: solution
In the thermal limit $Q \propto P$. A $1\,\mathrm{dB}$ drop multiplies $P$, and so $Q$, by $10^{-0.1} = 0.794$: $Q$ goes from $6.0$ to $4.77$, and $\tfrac12\operatorname{erfc}(4.77/\sqrt2) = 9\times10^{-7}$. A one-decibel loss costs three orders of magnitude in BER — the steepness of the waterfall curve.
:::
:::

### Real-world penalties

Several effects make a real receiver need more power than [[#eq-sensitivity]] predicts, and link budgets allocate a **power penalty** in decibels for each.

- **Finite extinction ratio.** Lasers biased above threshold transmit some power for a "0": $P_0 = rP_1$. For the same average power the eye opening $I_1 - I_0$ shrinks, and in the thermal limit the penalty is $\delta_{ex} = 10\log_{10}[(1 + r)/(1 - r)]$ — $0.87\,\mathrm{dB}$ for an extinction ratio of $10\,\mathrm{dB}$ ($r = 0.1$).
- **Intersymbol interference** from dispersion or limited bandwidth closes the eye.
- **Timing jitter** samples the eye away from its centre.
- **Relative intensity noise** of the laser and **mode-partition noise** of multimode lasers add power-proportional noise that no increase of power can overcome — a **BER floor**.

::: application Optically preamplified and coherent receivers
Placing an optical amplifier ([[photonics/optical-communication]]) before the photodiode raises the signal so far above thermal noise that the receiver is limited instead by the amplifier's spontaneous-emission noise; such receivers come within about $3$–$6\,\mathrm{dB}$ of the quantum limit. **Coherent receivers** mix the weak signal with a strong local-oscillator laser on a pair of balanced photodiodes; the large LO power raises the signal above thermal noise without excess noise and gives access to the phase and polarisation of the light, so that phase-modulated and QAM formats can be detected and dispersion removed digitally. **Single-photon avalanche diodes** biased above breakdown count individual photons for lidar and quantum communication.
:::

::: history
Heinrich Hertz observed in 1887 that ultraviolet light helps sparks to jump, and Albert Einstein explained the photoelectric effect in 1905 by light quanta of energy $h\nu$, the work cited for his 1921 Nobel Prize. Walter Schottky predicted shot noise in vacuum tubes in 1918; John Johnson measured thermal noise and Harry Nyquist explained it in 1928. Jun-ichi Nishizawa invented the p-i-n diode in 1950. Avalanche multiplication of photocurrent in silicon and germanium was studied in the early 1960s, and Richard McIntyre published the theory of avalanche excess noise in 1966. Stewart Personick's 1973 papers in the *Bell System Technical Journal* established the method of calculating optical receiver sensitivity that is still used.
:::

## Where this leads

The sensitivity found here is the starting point of the power budget in [[photonics/optical-communication]], where optical amplifiers change the dominant noise from thermal to amplified spontaneous emission, and the signal-to-noise ratio is measured optically. The noise and detection theory is general: the matched filter and the Q-function reappear in [[communication-systems/optimal-detection]], and the Gaussian approximations used here are examined in [[random-signals/gaussian-noise]]. Run as a power source with no bias, a large-area photodiode becomes the solar cell of [[photonics/photovoltaics]].

::: summary
- A photodetector delivers $I_p = \mathcal RP$ with $\mathcal R = \eta\lambda_0/1.24\,\mathrm{\mu m}$ A/W; photon arrivals are random, giving shot noise $2qIB$.
- The quantum limit of on–off keying is $P_e = \tfrac12e^{-N_1}$: $10$ photons per bit on average for $\mathrm{BER} = 10^{-9}$, $-48.9\,\mathrm{dBm}$ at $10\,\mathrm{Gb/s}$ and $1550\,\mathrm{nm}$.
- A p-i-n diode trades efficiency $1 - e^{-\alpha W}$ against transit-time bandwidth $0.45v_{\mathrm{sat}}/W$; capacitance $\epsilon A/W$ sets an RC limit, and the best bandwidth is where the two are equal.
- An APD multiplies the photocurrent by $M$ but adds excess noise $F(M) = kM + (1 - k)(2 - 1/M)$; low $k$ (silicon) is best, and the optimum gain balances excess noise against amplifier noise.
- The receiver SNR is $(M\mathcal RP)^2/[2qM^2F(\mathcal RP + I_d)B + \sigma_T^2]$; most direct-detection receivers are thermal-noise-limited.
- With Gaussian noise $\mathrm{BER} = \tfrac12\operatorname{erfc}(Q/\sqrt2)$, $Q = (I_1 - I_0)/(\sigma_1 + \sigma_0)$; $Q = 6$ gives $10^{-9}$, and the BER falls about a thousandfold per decibel near there.
- A thermal-noise-limited p-i-n receiver needs $\bar P = Q\sigma_T/\mathcal R$; extinction ratio, ISI and jitter add power penalties.
:::

## Exercises

::: exercise Responsivity and photocurrent {level=1 check="0.85*1.31/1.23984*20e-6"}
An InGaAs photodiode has quantum efficiency $85\,\%$ at $1310\,\mathrm{nm}$. Find its responsivity and the photocurrent produced by $20\,\mathrm{\mu W}$, in amperes.
::: solution
$\mathcal R = 0.85\times1.31/1.240 = 0.898\,\mathrm{A/W}$; $I_p = 0.898\times20\,\mathrm{\mu A} = 18.0\,\mathrm{\mu A} = 1.80\times10^{-5}\,\mathrm A$.
:::
:::

::: exercise Shot noise {level=1 check="sqrt(2*1.602e-19*50e-6*2e9)"}
A photocurrent of $50\,\mathrm{\mu A}$ is observed in a noise bandwidth of $2\,\mathrm{GHz}$. Find the rms shot-noise current in amperes.
::: solution
$\sigma = \sqrt{2qIB} = \sqrt{2\times1.602\times10^{-19}\times5\times10^{-5}\times2\times10^9} = 1.79\times10^{-7}\,\mathrm A$, or $0.18\,\mathrm{\mu A}$.
:::
:::

::: exercise Quantum-limited sensitivity {level=1 check="10*log10(10*6.62607015e-34*299792458/1.31e-6*2.5e9/1e-3)"}
Find the quantum-limited sensitivity, in dBm, of an on–off-keyed receiver at $2.5\,\mathrm{Gb/s}$ and $1310\,\mathrm{nm}$ for $\mathrm{BER} = 10^{-9}$.
::: solution
$h\nu = 1.517\times10^{-19}\,\mathrm J$; $\bar P = 10h\nu B = 10\times1.517\times10^{-19}\times2.5\times10^9 = 3.79\,\mathrm{nW}$, i.e. $10\log_{10}(3.79\times10^{-6}) = -54.2\,\mathrm{dBm}$.
:::
:::

::: exercise Transit-time and RC limits {level=2 check="1/sqrt((3e-6/(0.45*1e5))^2+(2*pi*50*11.7*8.854e-12*pi*(50e-6)^2/3e-6)^2)"}
A silicon p-i-n photodiode for $850\,\mathrm{nm}$ has an i-layer $3\,\mathrm{\mu m}$ thick, a diameter of $100\,\mathrm{\mu m}$, $\epsilon_r = 11.7$ and $v_{\mathrm{sat}} = 10^7\,\mathrm{cm/s}$, and drives $50\,\Omega$. Find $f_{tr}$, $C_j$, $f_{RC}$ and the combined bandwidth, in hertz.
::: solution
$f_{tr} = 0.45\times10^5/3\times10^{-6} = 15\,\mathrm{GHz}$. $A = \pi(50\,\mathrm{\mu m})^2 = 7.85\times10^{-9}\,\mathrm{m^2}$, $C_j = 11.7\times8.854\times10^{-12}\times7.85\times10^{-9}/3\times10^{-6} = 0.271\,\mathrm{pF}$, $f_{RC} = 1/(2\pi\times50\times0.271\,\mathrm{pF}) = 11.7\,\mathrm{GHz}$. Combined: $1/\sqrt{1/15^2 + 1/11.7^2} = 9.3\,\mathrm{GHz}$ ($9.3\times10^9\,\mathrm{Hz}$). The absorption efficiency at $850\,\mathrm{nm}$ ($\alpha = 850\,\mathrm{cm^{-1}}$) is only $1 - e^{-0.255} = 22\,\%$, the price of speed in an indirect-gap material.
:::
:::

::: exercise Excess noise factor {level=2 check="0.45*12+(1-0.45)*(2-1/12)"}
Compute $F(M)$ for an InP-multiplication APD with $k = 0.45$ at $M = 12$, and for a silicon APD with $k = 0.02$ at $M = 100$. Give the first.
::: solution
InP: $F = 0.45\times12 + 0.55\times(2 - 1/12) = 5.40 + 1.054 = 6.45$ ($8.1\,\mathrm{dB}$). Silicon: $F = 0.02\times100 + 0.98\times(2 - 0.01) = 2.0 + 1.95 = 3.95$ ($6.0\,\mathrm{dB}$) — despite eight times more gain, less excess noise.
:::
:::

::: exercise Extinction-ratio penalty {level=2 check="10*log10((1+10^(-0.8))/(1-10^(-0.8)))"}
Derive the power penalty $\delta_{ex} = 10\log_{10}[(1 + r)/(1 - r)]$ of a thermal-noise-limited receiver for a transmitter with $P_0 = rP_1$, and evaluate it in dB for an extinction ratio of $8\,\mathrm{dB}$.
::: solution
With average power $\bar P = (P_1 + P_0)/2 = P_1(1 + r)/2$, the eye opening is $I_1 - I_0 = \mathcal R P_1(1 - r) = 2\mathcal R\bar P(1 - r)/(1 + r)$. In the thermal limit $Q = (I_1 - I_0)/2\sigma_T$, so the same $Q$ needs $\bar P$ larger by $(1 + r)/(1 - r)$ than with $r = 0$. For $8\,\mathrm{dB}$, $r = 10^{-0.8} = 0.158$ and $\delta_{ex} = 10\log_{10}(1.158/0.842) = 1.38\,\mathrm{dB}$.
:::
:::

::: exercise A 2.5 Gb/s receiver from components {level=2 check="6*sqrt(4*1.380649e-23*300*2*1.9e9/50)/0.9"}
A $2.5\,\mathrm{Gb/s}$ receiver has a noise bandwidth of $1.9\,\mathrm{GHz}$, a $50\,\Omega$ load at $300\,\mathrm K$ followed by an amplifier of noise figure $3\,\mathrm{dB}$ ($F_n = 2$), and a p-i-n diode with $\mathcal R = 0.9\,\mathrm{A/W}$. Find $\sigma_T$ and the sensitivity in watts for $\mathrm{BER} = 10^{-9}$. How much better would a TIA with an effective $R_f = 1\,\mathrm{k\Omega}$ (same $F_n$) be, in dB?
::: solution
$\sigma_T = \sqrt{4k_BTF_nB/R_L} = \sqrt{4\times1.381\times10^{-23}\times300\times2\times1.9\times10^9/50} = 1.12\,\mathrm{\mu A}$. Sensitivity $\bar P = 6\times1.12/0.9\,\mathrm{\mu W} = 7.5\,\mathrm{\mu W}$ ($7.5\times10^{-6}\,\mathrm W$, $-21.3\,\mathrm{dBm}$). With $R_f = 1\,\mathrm{k\Omega}$, $\sigma_T$ falls by $\sqrt{20}$, a factor of $4.47$, and so does $\bar P$: $6.5\,\mathrm{dB}$ better. That is the point of the transimpedance amplifier: a large feedback resistor gives low noise, and the amplifier's gain keeps the input impedance — and so the RC time constant — low.
:::
:::

::: exercise Optimum avalanche gain {level=3}
(a) Starting from [[#eq-snr]] with $F(M) = kM + (1 - k)(2 - 1/M)$ and no approximation, write the condition for the optimum gain as a polynomial equation in $M$. (b) For $\sigma_T = 1.2\,\mathrm{\mu A}$, $B = 7.5\,\mathrm{GHz}$, $\mathcal RP = 1\,\mathrm{\mu A}$, $I_d = 0$ and $k = 0.5$, evaluate the approximation [[#eq-mopt]] and solve the exact condition numerically. (c) What SNR results, and how far is it from the shot-noise limit?
::: hint
Minimise $D(M) = 2qI_pB\,F(M) + \sigma_T^2/M^2$, where $F(M) = kM + 2(1 - k) - (1 - k)/M$.
:::
::: solution
(a) $\dd D/\dd M = 2qI_pB[k + (1 - k)/M^2] - 2\sigma_T^2/M^3 = 0$, i.e. $kM^3 + (1 - k)M - \sigma_T^2/(qI_pB) = 0$.

(b) $\sigma_T^2/(qI_pB) = 1.44\times10^{-12}/(1.602\times10^{-19}\times10^{-6}\times7.5\times10^9) = 1199$. The approximation gives $M = (1199/0.5)^{1/3} = 13.4$. The exact cubic $0.5M^3 + 0.5M - 1199 = 0$ gives $M = 13.36$ — the approximation is excellent, because $kM \gg 1$.

(c) At $M = 13.4$, $F = 6.68 + 0.5(2 - 0.075) = 7.64$. The SNR is $I_p^2/[2qI_pBF + \sigma_T^2/M^2] = 10^{-12}/[1.84\times10^{-14} + 8.07\times10^{-15}] = 37.8$ ($15.8\,\mathrm{dB}$). The shot-noise limit is $I_p/2qB = 416$ ($26.2\,\mathrm{dB}$), $10.4\,\mathrm{dB}$ better; without the APD ($M = 1$) the SNR would be $10^{-12}/(1.44\times10^{-12} + 2.4\times10^{-15}) = 0.69$, or $-1.6\,\mathrm{dB}$.
:::
:::

::: exercise Designing a receiver for a long unamplified link {level=3}
A $2.5\,\mathrm{Gb/s}$ link at $1550\,\mathrm{nm}$ must span $150\,\mathrm{km}$ of fibre with $0.2\,\mathrm{dB/km}$ including splices, with $1\,\mathrm{dB}$ of connector loss and a $3\,\mathrm{dB}$ system margin. The DFB transmitter launches $+3\,\mathrm{dBm}$ with an extinction ratio of $10\,\mathrm{dB}$; dispersion costs a $1\,\mathrm{dB}$ penalty. (a) What receiver sensitivity is required? (b) Can the p-i-n receiver of the previous exercise (with $R_f = 1\,\mathrm{k\Omega}$) meet it? (c) If not, would an InGaAs/InP APD with an $8\,\mathrm{dB}$ improvement suffice?
::: solution
(a) The loss is $150\times0.2 + 1 = 31\,\mathrm{dB}$; with margin and dispersion penalty, $35\,\mathrm{dB}$. The extinction-ratio penalty is $0.87\,\mathrm{dB}$, which we add to the receiver's requirement. The received power is $3 - 31 = -28\,\mathrm{dBm}$, so the receiver must reach $\mathrm{BER} = 10^{-9}$ at $-28 - 3 - 1 - 0.87 = -32.9\,\mathrm{dBm}$ with an ideal-extinction signal.

(b) The p-i-n TIA receiver had $-21.3 - 6.5 = -27.8\,\mathrm{dBm}$: about $5\,\mathrm{dB}$ short.

(c) With the APD, $-27.8 - 8 = -35.8\,\mathrm{dBm}$, which meets $-32.9\,\mathrm{dBm}$ with $2.9\,\mathrm{dB}$ to spare. Unamplified links of this length are typical of submarine festoons and rural routes; beyond about $200\,\mathrm{km}$, optical amplifiers are cheaper than further receiver improvement.
:::
:::
