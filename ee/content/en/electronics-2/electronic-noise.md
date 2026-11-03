Turn the volume of an amplifier up with nothing connected and you hear a gentle hiss. It is not interference and it cannot be shielded away: it is the sound of electrons in the resistors and transistors themselves, jostled by heat and arriving in discrete packets. This **electronic noise** sets the floor beneath which no signal can be detected. It decides how faint a radio station a receiver can pick up, how small a heartbeat an ECG can see, how many effective bits a data converter delivers ([[electronics-2/data-converters]]), and how far a deep-space probe can be heard. In 1965 Arno Penzias and Robert Wilson, chasing an unexplained $3.5\,\mathrm{K}$ excess in the noise of a radio antenna, found it was the cosmic microwave background.

This chapter treats noise quantitatively. We describe random signals by their **power spectral density** and learn how noise powers add and pass through filters. We derive the two fundamental mechanisms — **thermal noise** $4kTR$ and **shot noise** $2qI$ — and meet the empirical **flicker** ($1/f$) noise. We then build noise models of diodes, BJTs and MOSFETs, represent a whole amplifier by two input-referred sources $e_n$ and $i_n$, define the **noise figure**, find the source resistance that minimises it, and cascade stages with **Friis's formula**. Probability ideas are used lightly; see [Maths Atlas: probability](/learn/maths/lesson.php?c=probability&l=continuous-random-variables) for variance and the normal distribution, and [[random-signals]] for the full theory of random processes.

## Describing noise

A noise voltage $v_n(t)$ is a random signal with zero mean. Its size is measured by its **mean-square** value $\overline{v_n^2}$ (a power, in $\mathrm{V^2}$) or its **RMS** value $\sqrt{\overline{v_n^2}}$. How that power is distributed over frequency is described by the spectral density.

::: definition Noise spectral density {#def-psd}
The (one-sided) **power spectral density** $S_v(f)$ of a noise voltage, in $\mathrm{V^2/Hz}$, is defined so that the mean-square noise in a narrow band $\Delta f$ around $f$ is $S_v(f)\,\Delta f$, and the total mean-square noise is

$$
\overline{v_n^2} = \int_0^\infty S_v(f)\,\mathrm{d}f.
$$ {#eq-psd}

Its square root, the **noise density** $e_n = \sqrt{S_v}$, is quoted in $\mathrm{nV/\sqrt{Hz}}$; current noise $i_n$ is quoted in $\mathrm{pA/\sqrt{Hz}}$. Noise whose density is constant with frequency is called **white**.
:::

Three rules do almost all the work.

- **Uncorrelated noise sources add in power.** If $v_1$ and $v_2$ are independent, $\overline{(v_1 + v_2)^2} = \overline{v_1^2} + \overline{v_2^2}$, because the cross term $2\overline{v_1v_2}$ averages to zero. RMS values add like the sides of a right-angled triangle: $3\,\mathrm{nV/\sqrt{Hz}}$ and $4\,\mathrm{nV/\sqrt{Hz}}$ make $5$.
- **Filtering.** Noise of density $S_{in}(f)$ passing through a linear system $H(j2\pi f)$ emerges with density $S_{out}(f) = \abs{H}^2S_{in}(f)$.
- **Gaussian amplitude.** Noise made of many independent small contributions has a normal amplitude distribution (by the central limit theorem). Its peak-to-peak value is not fixed, but it lies within $\pm3.3\sigma$ (a span of $6.6$ RMS) $99.9\,\%$ of the time.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -3.3
b: 3.3
caption: The amplitude distribution of Gaussian noise of unit RMS value. The shaded region, $\pm3.3$ RMS, contains $99.9\,\%$ of the samples; this is why data sheets convert RMS to "peak-to-peak" noise by multiplying by about $6.6$. Move $a$ and $b$ to see how rarely the noise exceeds $\pm4$ RMS, but notice that it is never impossible.
:::

::: theorem Noise bandwidth of a single-pole filter {#thm-enbw}
The **equivalent noise bandwidth** $B_n$ of a filter with peak gain $H_0$ is the width of an ideal brick-wall filter of gain $H_0$ that passes the same white-noise power: $B_n = \int_0^\infty\abs{H(j2\pi f)}^2\,\mathrm{d}f\,/H_0^2$. For a single-pole low-pass filter with $3\,\mathrm{dB}$ frequency $f_c$,

$$
B_n = \frac{\pi}{2}f_c = 1.57f_c.
$$ {#eq-enbw}
:::

::: proof
For $\abs{H}^2 = 1/(1 + (f/f_c)^2)$, $\int_0^\infty\mathrm{d}f/(1 + f^2/f_c^2) = f_c[\arctan(f/f_c)]_0^\infty = f_c\pi/2$.
:::

A second-order Butterworth low-pass filter has $B_n = 1.11f_c$; steeper filters approach $f_c$. White noise of density $e_n$ through a filter of noise bandwidth $B_n$ gives an RMS output of $H_0e_n\sqrt{B_n}$.

::: warning Densities need a bandwidth
A noise density in $\mathrm{nV/\sqrt{Hz}}$ is not a voltage. To find an RMS noise voltage, multiply the density by the square root of the noise bandwidth — not the $3\,\mathrm{dB}$ bandwidth — and always add *powers*, never RMS voltages, of independent sources. A common slip is to quote "$10\,\mathrm{nV/\sqrt{Hz}}$ over $20\,\mathrm{kHz}$" as $200\,\mathrm{\mu V}$ instead of $10\,\mathrm{nV}\times\sqrt{20\,000} = 1.41\,\mu\mathrm{V}$.
:::

## Thermal noise

The free electrons in a resistor move randomly with thermal energy. At any instant slightly more are moving one way than the other, and the resistor's open-circuit voltage fluctuates. The fluctuation depends only on the resistance and the temperature.

::: theorem Johnson–Nyquist thermal noise {#thm-thermal}
A resistor $R$ at absolute temperature $T$ behaves as a noiseless resistor in series with a noise voltage source of one-sided density

$$
\overline{v_n^2} = 4kTR\,\Delta f,
$$ {#eq-thermal}

or equivalently in parallel with a noise current source $\overline{i_n^2} = 4kT\Delta f/R$, where $k = 1.381\times10^{-23}\,\mathrm{J/K}$ is Boltzmann's constant. The noise is white up to frequencies of order $kT/h \approx 6\,\mathrm{THz}$ at room temperature, and its amplitude is Gaussian.
:::

::: proof
We give the argument from equipartition. Connect $R$ across a capacitor $C$. In thermal equilibrium the capacitor, a system with one quadratic energy term, has mean stored energy $\tfrac12C\overline{v_C^2} = \tfrac12kT$ (equipartition of energy), so

$$
\overline{v_C^2} = \frac{kT}{C}.
$$

Suppose the resistor's noise is white with density $S$. The $RC$ circuit is a single-pole low-pass filter with $f_c = 1/(2\pi RC)$, so by [[#thm-enbw]]

$$
\overline{v_C^2} = S\cdot\frac{\pi}{2}\cdot\frac{1}{2\pi RC} = \frac{S}{4RC}.
$$

Equating the two expressions gives $S = 4kTR$. The Norton form follows by dividing by $R^2$. (Nyquist's 1928 derivation, using a transmission line terminated at both ends, also gives the quantum correction that makes the noise fall above $kT/h$.)
:::

Numbers worth remembering at $300\,\mathrm{K}$: a $1\,\mathrm{k\Omega}$ resistor has $e_n = 4.07\,\mathrm{nV/\sqrt{Hz}}$, and the density scales as $\sqrt R$: $0.91\,\mathrm{nV/\sqrt{Hz}}$ for $50\,\Omega$, $129\,\mathrm{nV/\sqrt{Hz}}$ for $1\,\mathrm{M\Omega}$. The available noise power that a resistor can deliver to a matched load is $\overline{v_n^2}/(4R) = kT\Delta f$, independent of $R$: $-174\,\mathrm{dBm/Hz}$ at $290\,\mathrm{K}$, the famous noise floor of radio engineering.

::: corollary kT/C noise {#cor-ktc}
A capacitor $C$ charged through any resistive switch and then disconnected holds a random voltage of mean-square value $kT/C$, independent of the resistance.
:::

::: proof
This is the intermediate result in the proof of [[#thm-thermal]]: a larger $R$ gives more noise density but a proportionally smaller bandwidth, and the two cancel. When the switch opens, the voltage at that instant is frozen.
:::

A $1\,\mathrm{pF}$ sampling capacitor holds $\sqrt{kT/C} = 64\,\mu\mathrm{V}$ RMS at $300\,\mathrm{K}$; a $10\,\mathrm{fF}$ capacitor $644\,\mu\mathrm{V}$. This is why the sampling capacitors of high-resolution ADCs ([[electronics-2/data-converters#ex-track-hold]]) and the pixels of image sensors cannot be made arbitrarily small.

::: example Noise of a resistor in a bandwidth {#ex-resistor}
A $10\,\mathrm{k\Omega}$ resistor at $300\,\mathrm{K}$ is followed by an ideal amplifier with a bandwidth of $20\,\mathrm{kHz}$ (brick-wall). Find the RMS noise voltage and its approximate peak-to-peak value. What is the RMS noise if the bandwidth is instead set by a single-pole filter with $f_c = 20\,\mathrm{kHz}$?
::: solution
$e_n = \sqrt{4kTR} = \sqrt{4\times1.381\times10^{-23}\times300\times10^4} = 12.9\,\mathrm{nV/\sqrt{Hz}}$. Over $20\,\mathrm{kHz}$: $12.9\,\mathrm{nV}\times\sqrt{2\times10^4} = 1.82\,\mu\mathrm{V}$ RMS, about $12\,\mu\mathrm{V}$ peak-to-peak ($6.6\times$ RMS). With a single-pole filter the noise bandwidth is $1.57\times20\,\mathrm{kHz} = 31.4\,\mathrm{kHz}$, giving $2.28\,\mu\mathrm{V}$ RMS.
:::
:::

## Shot noise and flicker noise

### Shot noise

A current that crosses a potential barrier — the junction of a diode or the base–emitter junction of a BJT — consists of individual electrons arriving at random, independent times. The current fluctuates about its mean like rain on a roof.

::: theorem Shot noise {#thm-shot}
A DC current $I$ made of independent carriers of charge $q$ crossing a barrier carries a white noise current of one-sided density

$$
\overline{i_n^2} = 2qI\,\Delta f,
$$ {#eq-shot}

where $q = 1.602\times10^{-19}\,\mathrm{C}$, up to frequencies comparable with the inverse of the carrier transit time.
:::

::: proof
(Sketch.) Model the current as a train of impulses $q\,\delta(t - t_k)$ at the times $t_k$ of a Poisson process of rate $\lambda = I/q$. By Campbell's theorem, the fluctuation of such a train has a two-sided spectral density equal to $\lambda q^2 = qI$, flat as long as each pulse is short compared with the period of interest. The one-sided density is twice this, $2qI$. A full treatment is in Papoulis's *Probability, Random Variables and Stochastic Processes*, or in [[random-signals]].
:::

A current of $1\,\mathrm{mA}$ carries $17.9\,\mathrm{pA/\sqrt{Hz}}$ of shot noise, and $1\,\mu\mathrm{A}$ carries $0.57\,\mathrm{pA/\sqrt{Hz}}$. The *relative* noise falls as current rises ($\sqrt{2q/I}$ per root hertz), so shot noise matters most for small currents: photodiodes, the base current of a BJT, the leakage of a JFET gate. A current in an ordinary resistor or metal wire, where the carriers do not cross a barrier independently, shows thermal noise but not shot noise.

### Flicker noise

Almost every electronic device also shows noise whose density rises at low frequencies, roughly as $1/f$. In MOSFETs it is due mainly to carriers being trapped and released by defects at the gate-oxide interface; in resistors it depends on the material (carbon composition and thick-film resistors are much noisier than metal-film or wirewound ones). It is called **flicker** or **$1/f$ noise**, and it is described empirically:

$$
S_v(f) = e_{nw}^2\left(1 + \frac{f_c}{f}\right),
$$ {#eq-flicker}

where $e_{nw}$ is the white noise density and $f_c$ the **$1/f$ corner frequency**, at which the two contributions are equal. For a MOSFET the input-referred flicker density is approximately $K/(C_{ox}WLf)$, with $K$ a process constant: it falls with gate area. Typical corners are a few hertz to $100\,\mathrm{Hz}$ for bipolar op-amps and $1$–$100\,\mathrm{kHz}$ for small CMOS devices.

::: widget plot
f: log10(e*sqrt(1 + 10^c/10^x)); log10(e) + 0*x
x: -1, 6
y: 0, 4
sliders: e=10:1:30:0.5; c=3:0:5:0.1
labels: \log_{10}(e_n\ /\ \mathrm{nV/\sqrt{Hz}}); \text{white floor}
caption: Input noise density (log scale) against $x = \log_{10}(f/\mathrm{Hz})$ for white density $e$ (in $\mathrm{nV/\sqrt{Hz}}$) and $1/f$ corner $f_c = 10^c\,\mathrm{Hz}$ (sliders). Below the corner the density rises at $10\,\mathrm{dB}$ per decade (a slope of $-\tfrac12$ on this log-of-amplitude scale). Raise the corner to $100\,\mathrm{kHz}$, typical of a small CMOS device, and the whole audio band is dominated by flicker noise.
:::

Flicker noise has an unpleasant property: the mean-square noise between $f_1$ and $f_2$ is $e_{nw}^2f_c\ln(f_2/f_1)$, the same for every decade. It never "averages out" with longer measurements, which is why precision DC measurements use **chopper** and **auto-zero** amplifiers that move the signal away from DC before amplification.

::: example Low-frequency noise of an op-amp {#ex-flicker}
An op-amp has a white input noise density of $10\,\mathrm{nV/\sqrt{Hz}}$ and a $1/f$ corner of $1\,\mathrm{kHz}$. Find its RMS and peak-to-peak input noise in the band $0.1$–$10\,\mathrm{Hz}$, the band data sheets use to specify low-frequency noise.
::: solution
Integrating [[#eq-flicker]] from $0.1$ to $10\,\mathrm{Hz}$:

$$
\overline{v_n^2} = e_{nw}^2\Bigl[f_c\ln\frac{10}{0.1} + (10 - 0.1)\Bigr] = (10^{-8})^2\,[1000\times4.605 + 9.9] = 4.61\times10^{-13}\,\mathrm{V^2},
$$

so the RMS noise is $0.679\,\mu\mathrm{V}$, almost all of it flicker, and the peak-to-peak value about $6.6\times0.679 = 4.5\,\mu\mathrm{V}$. A zero-drift op-amp with no $1/f$ noise and the same white density would give only $10\,\mathrm{nV}\times\sqrt{9.9} = 31\,\mathrm{nV}$ RMS in this band.
:::
:::

## Noise models of devices

Each device model of [[electronics-1/small-signal-amplifiers]] acquires noise sources, each placed where the physical mechanism acts.

- **Diode**: a shot-noise current $2qI_D$ in parallel with the junction (the small-signal resistance $r_d = V_T/I_D$ is not a thermal-noise source; its noise is the shot noise, which happens to equal half the thermal noise of a resistor $r_d$).
- **BJT**: collector shot noise $2qI_C$ from collector to emitter; base shot noise $2qI_B$ from base to emitter; thermal noise $4kTr_b$ of the base spreading resistance in series with the base; and a flicker component in the base current.
- **MOSFET**: channel thermal noise $\overline{i_d^2} = 4kT\gamma g_m\,\Delta f$ from drain to source, with $\gamma = 2/3$ for a long-channel device in saturation and roughly $1$–$2$ in short-channel devices; and flicker noise, usually represented as a voltage source $K/(C_{ox}WLf)$ in series with the gate. The gate draws only the tiny shot noise of its leakage current at low frequencies.

Referred to the input, these models give the device's equivalent input noise voltage and current. For the MOSFET, dividing the drain current noise by $g_m^2$:

$$
e_n^2 = \frac{4kT\gamma}{g_m} + \frac{K}{C_{ox}WLf}, \qquad i_n \approx 0 \text{ at low frequencies}.
$$ {#eq-mos-noise}

For the BJT, the collector shot noise referred to the base is $2qI_C/g_m^2 = 2kT/g_m$, using $g_m = qI_C/(kT)$:

$$
e_n^2 = 4kT\Bigl(r_b + \frac{1}{2g_m}\Bigr), \qquad i_n^2 = 2qI_B = \frac{2qI_C}{\beta}.
$$ {#eq-bjt-noise}

The designer's levers are visible at once: **larger $g_m$** (more bias current) lowers the voltage noise; for a BJT it also raises the current noise, so there is an optimum. A MOSFET with $g_m = 1\,\mathrm{mS}$ and $\gamma = 2/3$ has $3.3\,\mathrm{nV/\sqrt{Hz}}$ of white input noise; a BJT at $I_C = 1\,\mathrm{mA}$ has $0.46\,\mathrm{nV/\sqrt{Hz}}$ from shot noise plus $1.29\,\mathrm{nV/\sqrt{Hz}}$ from a $100\,\Omega$ base resistance.

::: quiz
A MOSFET input stage is biased at four times its original drain current, with the same overdrive voltage (so $W$ is also four times larger). How does its white input-referred noise voltage density change?
- [ ] It is unchanged, because the overdrive is the same.
- [ ] It doubles, because there is more current to make noise.
- [x] It halves, because $g_m$ is four times larger and $e_n \propto 1/\sqrt{g_m}$.
- [ ] It falls by four, because $e_n \propto 1/g_m$.
::: solution
At fixed overdrive $g_m = 2I_D/V_{ov}$ is proportional to $I_D$, so it quadruples. By [[#eq-mos-noise]] the white part of $e_n^2$ is $4kT\gamma/g_m$, which falls by four, and $e_n$ falls by two. The four-times-larger gate area also halves the flicker noise density. Low noise costs power and area.
:::
:::

## Amplifier noise and noise figure

A whole amplifier, however complicated, can be summarised by two noise sources at its input.

::: theorem Input-referred noise sources {#thm-input-referred}
Any linear noisy two-port amplifier is equivalent to the same amplifier made noiseless, preceded by a noise voltage source $e_n$ in series with its input and a noise current source $i_n$ in parallel with it. Driven by a source of resistance $R_s$ (with its own thermal noise), the total equivalent input noise density is

$$
e_{ni}^2 = e_n^2 + i_n^2R_s^2 + 4kTR_s,
$$ {#eq-total-input}

assuming $e_n$ and $i_n$ are uncorrelated.
:::

::: proof
The amplifier's internal sources produce some output noise. With the input short-circuited ($R_s = 0$) the output noise, divided by the gain, defines $e_n$: a series voltage source is the only input-referred source that acts with the input shorted. With the input open ($R_s \to \infty$) the output noise, divided by the transimpedance gain, defines $i_n$: only a shunt current source acts with the input open. By linearity, the two sources together reproduce the output noise for any source impedance (if the internal sources contribute partly to both, $e_n$ and $i_n$ are correlated, and a correlation term must be added). With a source $R_s$, $e_n$ appears directly at the input, $i_n$ flows through $R_s$ to give $i_nR_s$, and the source contributes $4kTR_s$; the three add in power.
:::

### Noise figure

::: definition Noise factor and noise figure {#def-noise-figure}
The **noise factor** $F$ of an amplifier with source resistance $R_s$ at the standard temperature $T_0 = 290\,\mathrm{K}$ is the ratio of the total output noise to the output noise that would be present if the amplifier were noiseless:

$$
F = \frac{\mathrm{SNR}_{in}}{\mathrm{SNR}_{out}} = 1 + \frac{e_n^2 + i_n^2R_s^2}{4kT_0R_s}.
$$ {#eq-noise-figure}

The **noise figure** is $\mathrm{NF} = 10\log_{10}F\,\mathrm{dB}$. The **noise temperature** of the amplifier is $T_e = (F - 1)T_0$: the temperature to which the source resistance would have to be raised to produce the amplifier's added noise.
:::

The noise figure measures how much an amplifier degrades the signal-to-noise ratio relative to the irreducible noise of the source itself. It depends on $R_s$: a source of low resistance has little thermal noise, so the amplifier's voltage noise dominates; a source of high resistance turns the current noise $i_n$ into a large voltage.

::: theorem Optimum source resistance {#thm-optimum}
For uncorrelated $e_n$ and $i_n$, the noise factor is minimised by the source resistance

$$
R_{s,\text{opt}} = \frac{e_n}{i_n},
$$ {#eq-ropt}

at which

$$
F_{\min} = 1 + \frac{e_ni_n}{2kT_0}.
$$ {#eq-fmin}
:::

::: proof
Write $F - 1 = (e_n^2/R_s + i_n^2R_s)/(4kT_0)$. The bracket is minimised where its derivative vanishes: $-e_n^2/R_s^2 + i_n^2 = 0$, so $R_s = e_n/i_n$. Substituting, $e_n^2/R_s + i_n^2R_s = e_ni_n + e_ni_n = 2e_ni_n$, and $F_{\min} - 1 = 2e_ni_n/(4kT_0)$.
:::

The product $e_ni_n$ is the amplifier's intrinsic noise quality; the ratio $e_n/i_n$ says what source it suits. Bipolar amplifiers ($e_n \sim 1\,\mathrm{nV/\sqrt{Hz}}$, $i_n \sim 1\,\mathrm{pA/\sqrt{Hz}}$) suit sources of hundreds of ohms to a few kilohms; JFET and CMOS amplifiers ($e_n \sim 5$–$20\,\mathrm{nV/\sqrt{Hz}}$, $i_n \sim 1\,\mathrm{fA/\sqrt{Hz}}$) suit sources of megohms, such as piezoelectric sensors and photodiodes.

::: widget plot
f: log10(sqrt(e^2 + (i*1e-3*10^x)^2 + 0.01601*10^x)); log10(e) + 0*x; log10(i*1e-3*10^x); log10(sqrt(0.01601*10^x))
x: 1, 7
y: -0.5, 4
sliders: e=4:0.5:20:0.5; i=1:0.01:10:0.01
labels: \text{total } e_{ni}; e_n; i_nR_s; \sqrt{4kT_0R_s}
caption: Noise densities (log of $\mathrm{nV/\sqrt{Hz}}$) referred to the input against $x = \log_{10}(R_s/\Omega)$, for an amplifier with voltage noise $e$ (in $\mathrm{nV/\sqrt{Hz}}$) and current noise $i$ (in $\mathrm{pA/\sqrt{Hz}}$). At low $R_s$ the amplifier's $e_n$ dominates; at high $R_s$ its $i_nR_s$ dominates; in between, the source's own thermal noise comes closest to the total. Slide $i$ down to $0.01\,\mathrm{pA/\sqrt{Hz}}$ (a JFET input) and watch the optimum move to megohms.
:::

::: example Noise figure and optimum source {#ex-noise-figure}
An op-amp has $e_n = 4\,\mathrm{nV/\sqrt{Hz}}$ and $i_n = 1\,\mathrm{pA/\sqrt{Hz}}$ (white, uncorrelated). Find its noise figure for source resistances of $100\,\Omega$, $1\,\mathrm{k\Omega}$ and $100\,\mathrm{k\Omega}$, and the optimum source resistance and minimum noise figure.
::: solution
At $T_0 = 290\,\mathrm{K}$, $4kT_0 = 1.60\times10^{-20}\,\mathrm{J}$. Using [[#eq-noise-figure]]:

| $R_s$ | $4kT_0R_s$ ($\mathrm{nV^2/Hz}$) | $e_n^2 + i_n^2R_s^2$ ($\mathrm{nV^2/Hz}$) | $F$ | NF |
|---|---|---|---|---|
| $100\,\Omega$ | $1.60$ | $16 + 0.01$ | $11.0$ | $10.4\,\mathrm{dB}$ |
| $1\,\mathrm{k\Omega}$ | $16.0$ | $16 + 1$ | $2.06$ | $3.1\,\mathrm{dB}$ |
| $100\,\mathrm{k\Omega}$ | $1601$ | $16 + 10^4$ | $7.26$ | $8.6\,\mathrm{dB}$ |

By [[#thm-optimum]], $R_{s,\text{opt}} = 4\,\mathrm{nV}/1\,\mathrm{pA} = 4\,\mathrm{k\Omega}$ and $F_{\min} = 1 + 4\times10^{-21}/(2\times1.381\times10^{-23}\times290) = 1.50$, $\mathrm{NF}_{\min} = 1.76\,\mathrm{dB}$. Note that adding a series resistor to a $100\,\Omega$ source to "match" the optimum would make things worse: it adds noise. The optimum tells us which amplifier to choose for a given source, or what turns ratio a transformer should have, not to degrade the source.
:::
:::

::: example A microphone preamplifier {#ex-microphone}
A dynamic microphone has a source resistance of $200\,\Omega$ and produces $10\,\mathrm{mV}$ RMS at a loud level. It feeds a preamplifier with $e_n = 1\,\mathrm{nV/\sqrt{Hz}}$ and $i_n = 2\,\mathrm{pA/\sqrt{Hz}}$, followed by a $20\,\mathrm{kHz}$ (brick-wall) bandwidth. Find the total input noise, the signal-to-noise ratio, and the noise figure, at $300\,\mathrm{K}$.
::: solution
The source contributes $\sqrt{4kTR_s} = 1.82\,\mathrm{nV/\sqrt{Hz}}$; $i_nR_s = 0.40\,\mathrm{nV/\sqrt{Hz}}$; and $e_n = 1\,\mathrm{nV/\sqrt{Hz}}$. In total, $e_{ni} = \sqrt{3.31 + 0.16 + 1}\,\mathrm{nV/\sqrt{Hz}} = 2.12\,\mathrm{nV/\sqrt{Hz}}$, and over $20\,\mathrm{kHz}$ the RMS noise is $2.12\,\mathrm{nV}\times141 = 0.299\,\mu\mathrm{V}$. The SNR is $20\log_{10}(10\,\mathrm{mV}/0.299\,\mu\mathrm{V}) = 90.5\,\mathrm{dB}$. With a noiseless amplifier it would be $91.8\,\mathrm{dB}$, so the noise figure is about $1.3\,\mathrm{dB}$: the preamplifier adds little to the microphone's own noise. A CMOS op-amp with $e_n = 10\,\mathrm{nV/\sqrt{Hz}}$ would give $e_{ni} = 10.2\,\mathrm{nV/\sqrt{Hz}}$ and an SNR of $76.8\,\mathrm{dB}$ — the reason microphone preamplifiers use bipolar input stages.
:::
:::

### Cascaded stages: Friis's formula

::: theorem Friis's formula {#thm-friis}
For a cascade of stages with noise factors $F_1, F_2, F_3, \ldots$ and available power gains $G_1, G_2, \ldots$, each measured with the output impedance of the preceding stage as its source,

$$
F = F_1 + \frac{F_2 - 1}{G_1} + \frac{F_3 - 1}{G_1G_2} + \cdots.
$$ {#eq-friis}
:::

::: proof
Work with available noise powers per unit bandwidth. The source delivers $kT_0$. The first stage amplifies it to $G_1kT_0$ and adds noise $(F_1 - 1)G_1kT_0$ referred to its output (by the definition of $F_1$). The second stage amplifies everything by $G_2$ and adds $(F_2 - 1)G_2kT_0$ of its own. The total output noise of two stages is therefore $G_1G_2kT_0[F_1 + (F_2 - 1)/G_1]$, and dividing by the noise $G_1G_2kT_0$ that a noiseless cascade would deliver gives $F = F_1 + (F_2 - 1)/G_1$. Induction adds the further terms.
:::

The first stage dominates: its noise enters in full, while the noise of each later stage is divided by the gain before it. A receiver therefore places a **low-noise amplifier** (LNA) with modest gain and the lowest possible noise figure as close to the antenna as possible, and any loss before it — a cable, a filter, a switch — adds directly to the noise figure (a passive loss $L$ has $F = L$).

::: example A receiver chain {#ex-friis}
A receiver consists of an LNA ($\mathrm{NF} = 1\,\mathrm{dB}$, gain $15\,\mathrm{dB}$), a mixer ($\mathrm{NF} = 10\,\mathrm{dB}$, gain $10\,\mathrm{dB}$) and an IF amplifier ($\mathrm{NF} = 15\,\mathrm{dB}$). Find the overall noise figure, and compare with the chain without the LNA.
::: solution
In linear terms: $F_1 = 1.259$, $G_1 = 31.6$; $F_2 = 10$, $G_2 = 10$; $F_3 = 31.6$. By [[#eq-friis]],

$$
F = 1.259 + \frac{9}{31.6} + \frac{30.6}{316} = 1.259 + 0.285 + 0.097 = 1.640, \qquad \mathrm{NF} = 2.15\,\mathrm{dB}.
$$

Without the LNA, $F = 10 + 30.6/10 = 13.06$, $\mathrm{NF} = 11.2\,\mathrm{dB}$. The LNA improves the sensitivity by $9\,\mathrm{dB}$, nearly a factor of eight in power, which for a radio link can mean nearly three times the range in free space.
:::
:::

::: quiz
A $2\,\mathrm{dB}$-loss coaxial cable is placed between an antenna and an LNA with a noise figure of $1\,\mathrm{dB}$ and high gain. What is the noise figure of the combination?
- [ ] $1\,\mathrm{dB}$
- [ ] $2\,\mathrm{dB}$
- [x] $3\,\mathrm{dB}$
- [ ] $1.26\,\mathrm{dB}$
::: solution
A passive loss at $T_0$ has $F = L$ and gain $1/L$. By Friis, $F = L + (F_{\mathrm{LNA}} - 1)L = LF_{\mathrm{LNA}}$, so the noise figures in dB add: $2 + 1 = 3\,\mathrm{dB}$. This is why LNAs are mounted at the antenna (masthead amplifiers, the low-noise blocks of satellite dishes).
:::
:::

## Low-noise design

The analysis above leads to a short list of principles.

1. **Get gain early.** By Friis's formula, the first stage sets the noise. Avoid lossy components and resistive attenuators ahead of it, and give it enough gain that later stages do not matter.
2. **Match the amplifier to the source.** Choose the device technology by $R_{s,\text{opt}} = e_n/i_n$: bipolar for low-impedance sources (microphones, strain gauges, thermocouples, $50\,\Omega$ RF), JFET or CMOS for high-impedance sources (piezoelectric sensors, photodiodes, electrodes). A transformer of turns ratio $n$ presents $n^2R_s$ to the amplifier and can move the source towards the optimum without adding noise.
3. **Keep resistances small.** Every resistor in the signal path, including the feedback resistors of an op-amp circuit, adds $4kTR$. In a non-inverting amplifier the parallel combination $R_1\parallel R_2$ appears in series with the input; keep it well below the source resistance.
4. **Spend current and area.** Input-referred white noise falls as $1/\sqrt{g_m}$, so low noise costs bias current; flicker noise falls with gate area.
5. **Limit the bandwidth.** RMS noise grows as $\sqrt{B_n}$: filter to the band the signal needs, and no wider.
6. **Escape $1/f$ noise** by modulation: chopper and auto-zero amplifiers, lock-in amplifiers and AC excitation of bridges move the signal to a frequency above the flicker corner.

::: application Noise at the limits
Radio astronomy receivers cool their LNAs to about $15\,\mathrm{K}$ to reach noise temperatures of a few kelvin; the deep-space network listens for spacecraft whose signals arrive at around $10^{-20}\,\mathrm{W}$. Photon-counting optical receivers and superconducting qubit readout chains work at the quantum limit, where the noise temperature cannot fall below $hf/k$. At the other extreme, a battery-powered ECG front end must achieve below $1\,\mu\mathrm{V}$ RMS in $0.5$–$150\,\mathrm{Hz}$ on a few microwatts, which is achieved (as of 2026) with chopper-stabilised CMOS amplifiers.
:::

::: history
Walter Schottky predicted shot noise in 1918, in work on valve amplifiers, and in 1925 John B. Johnson at Bell Laboratories observed the excess low-frequency "flicker effect" in valves. Johnson then measured the noise of resistors as a function of resistance and temperature, and in 1928 he and Harry Nyquist published back-to-back papers in *Physical Review*: the measurement, and the thermodynamic derivation of $4kTR$. Harald Friis defined the noise figure of a receiver and derived his cascade formula in 1944. In 1965 Arno Penzias and Robert Wilson's careful accounting of every contribution to their antenna's noise temperature revealed the cosmic microwave background, earning them the 1978 Nobel Prize in Physics.
:::

## Where this leads

Noise sets the ultimate limit of every circuit in this course: the precision of the op-amps of [[electronics-2/operational-amplifier-design]], the dynamic range of [[electronics-2/active-filters]], and the resolution of [[electronics-2/data-converters]]. Random processes and their spectra are developed rigorously in [[random-signals]], and the effect of noise on digital communication — error probability as a function of signal-to-noise ratio — in [[communication-systems]] and [[information-theory]], where Shannon's capacity formula $C = B\log_2(1 + \mathrm{SNR})$ shows that noise, not bandwidth alone, limits the rate of information. Low-noise sensor interfaces are designed in [[instrumentation/bridges-signal-conditioning]] and RF low-noise amplifiers in [[rf-microwave/rf-amplifiers]].

::: summary
- Noise is described by its power spectral density; independent sources add in power, filters multiply the density by $\abs{H}^2$, and a single-pole filter has noise bandwidth $1.57f_c$.
- Thermal noise of a resistor is $4kTR$ per hertz ($4.07\,\mathrm{nV/\sqrt{Hz}}$ for $1\,\mathrm{k\Omega}$ at $300\,\mathrm{K}$); a sampled capacitor holds $kT/C$, independent of $R$.
- Shot noise of a current crossing a barrier is $2qI$ per hertz; flicker noise rises as $1/f$ below a corner frequency and contributes equally in every decade.
- A MOSFET has input noise $e_n^2 = 4kT\gamma/g_m$ plus $1/f$; a BJT has $e_n^2 = 4kT(r_b + 1/(2g_m))$ and $i_n^2 = 2qI_B$.
- Any amplifier reduces to input sources $e_n$ and $i_n$: total input noise $e_n^2 + i_n^2R_s^2 + 4kTR_s$.
- Noise factor $F = 1 + (e_n^2 + i_n^2R_s^2)/(4kT_0R_s)$ is minimised at $R_s = e_n/i_n$, giving $F_{\min} = 1 + e_ni_n/(2kT_0)$.
- Friis's formula $F = F_1 + (F_2 - 1)/G_1 + \cdots$: the first stage dominates, so get low-noise gain early.
:::

## Exercises

::: exercise Thermal noise density {level=1 check="sqrt(4*1.380649e-23*300*50e3)"}
Find the thermal noise density, in $\mathrm{V/\sqrt{Hz}}$, of a $50\,\mathrm{k\Omega}$ resistor at $300\,\mathrm{K}$.
::: solution
$\sqrt{4kTR} = \sqrt{4\times1.381\times10^{-23}\times300\times5\times10^4} = 28.8\,\mathrm{nV/\sqrt{Hz}}$.
:::
:::

::: exercise Shot noise {level=1 check="sqrt(2*1.602176634e-19*10e-6)"}
A photodiode carries a photocurrent of $10\,\mu\mathrm{A}$. What is its shot-noise current density in $\mathrm{A/\sqrt{Hz}}$?
::: solution
$\sqrt{2qI} = \sqrt{2\times1.602\times10^{-19}\times10^{-5}} = 1.79\,\mathrm{pA/\sqrt{Hz}}$.
:::
:::

::: exercise kT/C {level=1 check="sqrt(1.380649e-23*300/0.5e-12)"}
What is the RMS noise voltage, in volts, sampled onto a $0.5\,\mathrm{pF}$ capacitor at $300\,\mathrm{K}$?
::: solution
$\sqrt{kT/C} = \sqrt{1.381\times10^{-23}\times300/5\times10^{-13}} = 91.0\,\mu\mathrm{V}$.
:::
:::

::: exercise Adding noise sources {level=2}
An amplifier with $e_n = 6\,\mathrm{nV/\sqrt{Hz}}$ and negligible $i_n$ is driven from a $2.2\,\mathrm{k\Omega}$ source at $300\,\mathrm{K}$, and its output is filtered by a single-pole filter with $f_c = 10\,\mathrm{kHz}$. Find the total input-referred RMS noise.
::: solution
The source gives $\sqrt{4kT\times2200} = 6.04\,\mathrm{nV/\sqrt{Hz}}$; with $e_n$, the total is $\sqrt{36 + 36.5} = 8.51\,\mathrm{nV/\sqrt{Hz}}$. The noise bandwidth is $1.57\times10\,\mathrm{kHz} = 15.7\,\mathrm{kHz}$, so the RMS noise is $8.51\,\mathrm{nV}\times\sqrt{15\,700} = 1.07\,\mu\mathrm{V}$.
:::
:::

::: exercise Noise figure from noise temperature {level=2 check="10*log10(1+35/290)"}
An LNA has a noise temperature of $35\,\mathrm{K}$. What is its noise figure in dB?
::: solution
$F = 1 + T_e/T_0 = 1 + 35/290 = 1.121$, $\mathrm{NF} = 0.50\,\mathrm{dB}$.
:::
:::

::: exercise Choosing an op-amp {level=2}
A piezoelectric sensor behaves at the frequencies of interest as a source resistance of $10\,\mathrm{M\Omega}$. Compare the total input noise density (at $300\,\mathrm{K}$) with (a) a bipolar op-amp with $e_n = 3\,\mathrm{nV/\sqrt{Hz}}$, $i_n = 0.4\,\mathrm{pA/\sqrt{Hz}}$, and (b) a JFET op-amp with $e_n = 10\,\mathrm{nV/\sqrt{Hz}}$, $i_n = 2\,\mathrm{fA/\sqrt{Hz}}$.
::: solution
The source itself contributes $\sqrt{4kT\times10^7} = 407\,\mathrm{nV/\sqrt{Hz}}$. (a) $i_nR_s = 0.4\times10^{-12}\times10^7 = 4\,\mu\mathrm{V/\sqrt{Hz}}$, which dominates: total $\approx 4.02\,\mu\mathrm{V/\sqrt{Hz}}$, ten times the source noise ($\mathrm{NF} \approx 20\,\mathrm{dB}$). (b) $i_nR_s = 20\,\mathrm{nV/\sqrt{Hz}}$, so the total is $\sqrt{10^2 + 20^2 + 407^2} = 408\,\mathrm{nV/\sqrt{Hz}}$: essentially only the source noise ($\mathrm{NF} \approx 0.01\,\mathrm{dB}$). The JFET op-amp is the right choice, although its $e_n$ is three times higher.
:::
:::

::: exercise A BJT input stage {level=2}
A BJT with $r_b = 50\,\Omega$ and $\beta = 200$ is biased at $I_C$. (a) Find $e_n$ and $i_n$ at $300\,\mathrm{K}$ for $I_C = 100\,\mu\mathrm{A}$ and $1\,\mathrm{mA}$. (b) Find $R_{s,\text{opt}}$ for each.
::: solution
With $g_m = I_C/V_T$, $V_T = 25.85\,\mathrm{mV}$:

(a) $I_C = 100\,\mu\mathrm{A}$: $g_m = 3.87\,\mathrm{mS}$, $1/(2g_m) = 129\,\Omega$, $e_n = \sqrt{4kT(50 + 129)} = 1.72\,\mathrm{nV/\sqrt{Hz}}$; $I_B = 0.5\,\mu\mathrm{A}$, $i_n = \sqrt{2qI_B} = 0.40\,\mathrm{pA/\sqrt{Hz}}$. $I_C = 1\,\mathrm{mA}$: $1/(2g_m) = 12.9\,\Omega$, $e_n = \sqrt{4kT\times62.9} = 1.02\,\mathrm{nV/\sqrt{Hz}}$; $I_B = 5\,\mu\mathrm{A}$, $i_n = 1.27\,\mathrm{pA/\sqrt{Hz}}$.

(b) $R_{s,\text{opt}} = e_n/i_n = 4.3\,\mathrm{k\Omega}$ at $100\,\mu\mathrm{A}$ and $0.80\,\mathrm{k\Omega}$ at $1\,\mathrm{mA}$. Raising the collector current moves the optimum to lower source resistances, which is how designers tune a bipolar front end to its source.
:::
:::

::: exercise Optimum bias for a BJT {level=3}
Neglecting $r_b$, show that for a BJT with current gain $\beta$ driven from source resistance $R_s$, the noise factor is minimised when $I_C = V_T\sqrt\beta/R_s$, and that then $F_{\min} = 1 + 1/\sqrt\beta$. Evaluate for $\beta = 100$ and $R_s = 1\,\mathrm{k\Omega}$.
::: hint
Write $e_n^2 = 2kTV_T/I_C$ and $i_n^2 = 2qI_C/\beta$, substitute into [[#eq-noise-figure]] with $T_0 = T$, and minimise over $I_C$.
:::
::: solution
With $e_n^2 = 4kT/(2g_m) = 2kTV_T/I_C$ and $i_n^2 = 2qI_C/\beta$,

$$
F - 1 = \frac{1}{4kTR_s}\Bigl(\frac{2kTV_T}{I_C} + \frac{2qI_CR_s^2}{\beta}\Bigr) = \frac{V_T}{2I_CR_s} + \frac{I_CR_s}{2V_T\beta},
$$

using $q/(kT) = 1/V_T$. The sum $a/I_C + bI_C$ is minimised at $I_C = \sqrt{a/b}$: $I_C^2 = (V_T/2R_s)(2V_T\beta/R_s) = V_T^2\beta/R_s^2$, so $I_C = V_T\sqrt\beta/R_s$. At this current the two terms are equal, each $1/(2\sqrt\beta)$, so $F_{\min} = 1 + 1/\sqrt\beta$. For $\beta = 100$ and $R_s = 1\,\mathrm{k\Omega}$: $I_C = 25.85\,\mathrm{mV}\times10/1\,\mathrm{k\Omega} = 0.26\,\mathrm{mA}$ and $F_{\min} = 1.1$, $\mathrm{NF} = 0.41\,\mathrm{dB}$ (rising when $r_b$ is included). A high-$\beta$ transistor is a low-noise transistor.
:::
:::

::: exercise Designing a low-noise receiver front end {level=3}
A satellite receiver must achieve an overall noise figure below $1.0\,\mathrm{dB}$. The chain is: a feed with $0.2\,\mathrm{dB}$ loss, an LNA, a $3\,\mathrm{dB}$ filter loss, and a downconverter with $\mathrm{NF} = 8\,\mathrm{dB}$. (a) If the LNA has $\mathrm{NF} = 0.5\,\mathrm{dB}$, what minimum gain does it need? (b) Express the result as a system noise temperature.
::: hint
Losses at $290\,\mathrm{K}$ have $F = L$ and $G = 1/L$. Apply Friis's formula with the feed loss first.
:::
::: solution
Linear values: feed $L_1 = 1.047$ ($F_1 = 1.047$, $G_1 = 0.955$); LNA $F_2 = 1.122$, gain $G_2$; filter $F_3 = 1.995$, $G_3 = 0.501$; downconverter $F_4 = 6.31$.

$$
F = 1.047 + \frac{0.122}{0.955} + \frac{0.995}{0.955G_2} + \frac{5.31}{0.955G_2\times0.501} = 1.175 + \frac{1.042 + 11.10}{G_2}.
$$

The target $F \le 10^{0.1} = 1.259$ requires $12.14/G_2 \le 0.084$, so $G_2 \ge 144$, about $21.6\,\mathrm{dB}$; a practical design would use $25$–$30\,\mathrm{dB}$ (often two LNA stages). (b) With exactly this gain, $T_e = (F - 1)T_0 = 0.259\times290 = 75\,\mathrm{K}$; the feed loss and LNA alone contribute $(1.175 - 1)\times290 = 51\,\mathrm{K}$, the rest coming from the later stages.
:::
:::
