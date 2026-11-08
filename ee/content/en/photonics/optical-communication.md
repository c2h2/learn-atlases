A single optical fibre in a modern submarine cable carries tens of terabits per second across an ocean: more than a hundred wavelength channels, each modulated in amplitude, phase and polarisation, amplified every $50$–$80\,\mathrm{km}$ by a few metres of erbium-doped fibre, and decoded at the far end by a receiver whose digital signal processor undoes thousands of kilometres of dispersion in real time. A link inside a data centre, by contrast, may be a few hundred metres of fibre between two plug-in modules, with four-level intensity modulation and no amplifier at all. Both are optical communication systems, and both are designed with the same small set of tools: power budgets, dispersion and rise-time budgets, and — once amplifiers are involved — the optical signal-to-noise ratio.

This lesson assembles the components of the previous chapters into systems. We start with the transmitter and its modulation formats, then design point-to-point links with power and rise-time budgets, multiply the capacity with wavelength-division multiplexing, remove the attenuation limit with optical amplifiers and analyse the noise they add, and end with coherent detection, digital signal processing and the capacity of a fibre. The fibre properties come from [[photonics/optical-fibres]], the sources from [[photonics/light-sources]] and the receivers from [[photonics/photodetectors]]; the modulation and detection theory is that of [[communication-systems/digital-modulation]] and [[communication-systems/optimal-detection]].

## Transmitters and modulation {#sec-modulation}

The simplest optical signal is **intensity modulation with direct detection** (IM/DD): the transmitter switches the optical power between a high and a low level (**on–off keying**, OOK, usually with NRZ pulses), and the receiver's photodiode converts power to current. Data-centre links increasingly use **PAM4**, four power levels carrying two bits per symbol, which halves the bandwidth needed at the cost of about $4.8\,\mathrm{dB}$ of extra signal-to-noise ratio (the eye is divided into three, each a third of the height).

A laser can be modulated directly through its current, up to a few tens of gigahertz ([[photonics/light-sources#thm-modulation]]), but the carrier-density changes that do the modulating also shift its frequency (chirp). For long links and for phase modulation, the laser runs continuously and an **external modulator** imposes the data.

::: definition Mach–Zehnder modulator and half-wave voltage {#def-mzm}
A **Mach–Zehnder modulator** (MZM) is an integrated Mach–Zehnder interferometer ([[photonics/dielectric-waveguides]]) whose arm phases are changed by a voltage, in lithium niobate (the Pockels effect), indium phosphide or silicon. The **half-wave voltage** $V_\pi$ is the voltage that changes the phase difference between the arms by $\pi$. In the **push–pull** configuration, the two arms are driven with opposite phase shifts $\pm\varphi/2$, $\varphi = \pi V/V_\pi$.
:::

::: theorem Transfer function of a push–pull MZM {#thm-mzm}
A lossless push–pull MZM with ideal 3-dB splitters, driven by voltage $V$ and biased so that $V = 0$ gives full transmission, has output field and power

$$
E_{\mathrm{out}} = E_{\mathrm{in}}\cos\!\left(\frac{\pi V}{2V_\pi}\right), \qquad P_{\mathrm{out}} = P_{\mathrm{in}}\cos^2\!\left(\frac{\pi V}{2V_\pi}\right) .
$$ {#eq-mzm}

The output field is real for every $V$: a push–pull MZM modulates amplitude without chirp, and between $V = -V_\pi$ and $V = +V_\pi$ the field passes through zero and changes sign.
:::

::: proof
The input splits into two equal fields $E_{\mathrm{in}}/\sqrt2$. The arms add phases $+\varphi/2$ and $-\varphi/2$, and the second splitter recombines them with weight $1/\sqrt2$ each into the output port: $E_{\mathrm{out}} = \tfrac12E_{\mathrm{in}}(e^{j\varphi/2} + e^{-j\varphi/2}) = E_{\mathrm{in}}\cos(\varphi/2)$. With $\varphi = \pi V/V_\pi$ this is [[#eq-mzm]]. Because the two phase shifts are equal and opposite, the sum has no imaginary part: the optical phase does not vary with $V$.
:::

::: widget plot
f: cos(pi*x/2)^2; cos(pi*x/2)
x: -2.2, 2.2
y: -1.1, 1.1
vlines: -0.5; 0.5
labels: P_{\mathrm{out}}/P_{\mathrm{in}}; E_{\mathrm{out}}/E_{\mathrm{in}}
caption: Power (blue) and field (orange) transmission of a push–pull Mach–Zehnder modulator against drive voltage in units of $V_\pi$. For intensity modulation the modulator is biased at **quadrature**, the half-power point ($V = \pm V_\pi/2$, the dashed lines), where the power curve is steepest and most linear; a swing of $V_\pi$ peak-to-peak around it switches between full and zero transmission. For phase and QAM modulation it is instead biased at a null ($V = V_\pi$) and driven across it: the field then swings between positive and negative values, i.e. the optical phase jumps by $\pi$ while the power goes through zero.
:::

::: example Drive swing and extinction ratio {#ex-mzm}
A lithium niobate MZM with $V_\pi = 3.5\,\mathrm V$ is biased at quadrature. Find the extinction ratio of the output if the driver delivers a swing of (a) $3.5\,\mathrm V$, (b) $2.8\,\mathrm V$, (c) $1.75\,\mathrm V$ peak-to-peak, and the average output power relative to the input.
::: solution
At quadrature, $V = V_\pi/2 \pm\Delta V/2$ with $\Delta V$ the swing. The two levels are $\cos^2[\pi/4 \mp \pi\Delta V/4V_\pi]$.

(a) $\Delta V = V_\pi$: levels $\cos^2(0) = 1$ and $\cos^2(\pi/2) = 0$, an infinite extinction ratio (in practice limited to $25$–$30\,\mathrm{dB}$ by splitter imbalance).

(b) $\Delta V/V_\pi = 0.8$: $\cos^2(\pi/4 - 0.2\pi) = \cos^2(0.05\pi) = 0.976$ and $\cos^2(0.45\pi) = 0.0245$, a ratio of $39.9$ or $16.0\,\mathrm{dB}$.

(c) $\Delta V/V_\pi = 0.5$: $\cos^2(\pi/8) = 0.854$ and $\cos^2(3\pi/8) = 0.146$, $5.84$ or $7.7\,\mathrm{dB}$ — a large extinction-ratio penalty ([[photonics/photodetectors]]).

In every case the average output is half the input, since the levels are symmetric about quadrature: an MZM used for OOK has an intrinsic $3\,\mathrm{dB}$ modulation loss, plus a few dB of insertion loss. Driver amplifiers that swing several volts at tens of gigahertz consume watts, which is why low-$V_\pi$ thin-film lithium niobate and silicon modulators are attractive.
:::
:::

**Electro-absorption modulators** (EAMs) use the shift of a semiconductor's absorption edge under an electric field (the quantum-confined Stark effect in quantum wells). They are small, need about $2\,\mathrm V$, and can be integrated on the same chip as a DFB laser (an "electro-absorption modulated laser", EML), at the cost of a small chirp; they are the standard transmitters of $10$–$100\,\mathrm{Gb/s}$ links up to tens of kilometres. For coherent systems, an **I/Q modulator** nests two MZMs biased at null, one for the in-phase and one (after a $90^\circ$ phase shift) for the quadrature component, so that any point of a QAM constellation can be generated; two of them, one per polarisation, make a **dual-polarisation** transmitter.

## Link design {#sec-budgets}

A point-to-point link must deliver enough power to the receiver, and pulses that are still distinguishable. The first condition is the power budget, met in [[photonics/optical-fibres#ex-budget]]. The second is a budget for time.

::: algorithm Rise-time budget {#alg-rise}
For an NRZ link at bit rate $B$:
1. List the 10–90 % rise times of the components: transmitter $t_{tx}$, chromatic-dispersion spread $t_{cd} = \lvert D\rvert L\Delta\lambda$, modal spread $t_{mod}$ (multimode fibre), and receiver $t_{rx} = 0.35/B_{rx}$, where $B_{rx}$ is the receiver's 3-dB bandwidth.
2. Combine them as if they were Gaussian responses: $t_{\mathrm{sys}} = \sqrt{t_{tx}^2 + t_{cd}^2 + t_{mod}^2 + t_{rx}^2}$.
3. Require $t_{\mathrm{sys}} \le 0.7/B$ for NRZ ($0.35/B$ for RZ). If the budget fails, choose a faster component, a narrower source or a lower-dispersion wavelength.
:::

The root-sum-square rule is exact for cascaded Gaussian filters, whose rise times add in quadrature, and a good approximation for most real components. The $0.7/B$ criterion allows the rise time to take up to $70\,\%$ of the bit period. The rise-time budget is a first estimate; a full design computes the power penalty from the eye closure.

::: example Designing a 2.5 Gb/s metro link {#ex-link-design}
Design a $2.5\,\mathrm{Gb/s}$ NRZ link over $60\,\mathrm{km}$ of standard fibre ($0.25\,\mathrm{dB/km}$ including splices, $D = 17\,\mathrm{ps/(nm\cdot km)}$ at $1550\,\mathrm{nm}$), with two connectors of $0.5\,\mathrm{dB}$ and a $3\,\mathrm{dB}$ margin. Candidate components: a directly modulated DFB laser launching $0\,\mathrm{dBm}$ with an $80\,\mathrm{ps}$ rise time and an effective chirped spectral width of $0.1\,\mathrm{nm}$; a p-i-n receiver of sensitivity $-26\,\mathrm{dBm}$ and an APD receiver of sensitivity $-34\,\mathrm{dBm}$, both with $2\,\mathrm{GHz}$ bandwidth.
::: solution
**Power budget.** Losses: $60\times0.25 + 2\times0.5 = 16\,\mathrm{dB}$; the received power is $-16\,\mathrm{dBm}$. Adding the margin, we need a sensitivity of $-19\,\mathrm{dBm}$ or better. The p-i-n receiver ($-26\,\mathrm{dBm}$) suffices with $7\,\mathrm{dB}$ to spare; the APD is unnecessary.

**Rise-time budget.** $t_{tx} = 80\,\mathrm{ps}$; $t_{cd} = 17\times60\times0.1 = 102\,\mathrm{ps}$; $t_{rx} = 0.35/2\,\mathrm{GHz} = 175\,\mathrm{ps}$. Then

$$
t_{\mathrm{sys}} = \sqrt{80^2 + 102^2 + 175^2}\,\mathrm{ps} = 218\,\mathrm{ps} \le \frac{0.7}{2.5\,\mathrm{Gb/s}} = 280\,\mathrm{ps} .
$$

Both budgets close with the cheaper components. The spare $7\,\mathrm{dB}$ means the same design reaches about $60 + 7/0.25 = 88\,\mathrm{km}$ on power, but at that length $t_{cd} = 150\,\mathrm{ps}$ and $t_{\mathrm{sys}} = 245\,\mathrm{ps}$, still inside the limit. At $10\,\mathrm{Gb/s}$ the limit would be $70\,\mathrm{ps}$, which no part of this design meets.
:::
:::

## Wavelength-division multiplexing {#sec-wdm}

A fibre's low-loss window from $1260$ to $1625\,\mathrm{nm}$ spans about $50\,\mathrm{THz}$, and even the C band alone is $4.4\,\mathrm{THz}$ wide — far more than any single transmitter can modulate. **Wavelength-division multiplexing** (WDM) sends many independent channels on different wavelengths through the same fibre, each with its own transmitter and receiver, combined and separated by passive optical filters.

::: definition WDM frequency grid {#def-grid}
Dense WDM channels sit on the ITU-T G.694.1 grid of frequencies

$$
\nu_n = 193.1\,\mathrm{THz} + n\times\Delta\nu ,
$$ {#eq-grid}

with spacing $\Delta\nu = 100$, $50$ or $25\,\mathrm{GHz}$ (and, in the **flexible grid**, channel slots of any multiple of $12.5\,\mathrm{GHz}$). Near $1550\,\mathrm{nm}$, $100\,\mathrm{GHz}$ corresponds to $\Delta\lambda = \lambda_0^2\Delta\nu/c \approx 0.8\,\mathrm{nm}$. **Coarse WDM** (G.694.2) uses $18$ channels spaced $20\,\mathrm{nm}$ apart from $1271$ to $1611\,\mathrm{nm}$, wide enough for uncooled lasers.
:::

The multiplexers are filters: thin-film interference filters (stacks of quarter-wave layers forming coupled Fabry–Pérot cavities), fibre Bragg gratings, and above all **arrayed-waveguide gratings** (AWGs). An AWG is an integrated grating: light spreads from an input waveguide in a slab region, enters an array of waveguides whose lengths increase in equal steps $\Delta L$, and refocuses in a second slab. The constant length step tilts the wavefront by an amount proportional to frequency, exactly as a diffraction grating does ([[photonics/optical-waves]]), so each wavelength is focused onto a different output waveguide. A single silica or silicon chip separates $40$–$96$ channels.

Many WDM channels at milliwatt powers over thousands of kilometres also make the fibre's weak **Kerr nonlinearity** — an index change proportional to intensity — significant. It causes **self-phase modulation** (a channel modulates its own phase), **cross-phase modulation** (channels modulate each other's phase) and **four-wave mixing** (new frequencies at $\nu_i + \nu_j - \nu_k$ that fall on other channels, strongest where dispersion is zero). Nonlinearity sets an upper limit on the launched power per channel, typically $0$–$3\,\mathrm{dBm}$, which together with amplifier noise fixes the best achievable signal-to-noise ratio.

::: quiz
How many $50\,\mathrm{GHz}$ channels fit in the C band ($1530$–$1565\,\mathrm{nm}$)?
- [ ] About $35$
- [x] About $88$
- [ ] About $700$
- [ ] About $4400$
::: solution
The band is $35\,\mathrm{nm}$ wide. Converting at $1547\,\mathrm{nm}$: $\Delta\nu = c\Delta\lambda/\lambda_0^2 = 3\times10^8\times35\times10^{-9}/(1.547\times10^{-6})^2 = 4.4\,\mathrm{THz}$, which holds $4400/50 = 88$ channels. Commercial systems use $80$–$96$ channels at $50\,\mathrm{GHz}$, or about $64$ wider flexible-grid channels at $75\,\mathrm{GHz}$.
:::
:::

## Optical amplifiers {#sec-amplifiers}

Until the late 1980s, every long-distance link was a chain of **regenerators**: a receiver, electronic retiming and a new transmitter every $40$–$80\,\mathrm{km}$, one per channel, tied to one bit rate. An optical amplifier amplifies all WDM channels at once, whatever their bit rate or format, and made dense WDM economic.

The **erbium-doped fibre amplifier** (EDFA) is a few metres to tens of metres of fibre whose core is doped with erbium ions. Pumped by a semiconductor laser at $980\,\mathrm{nm}$ (or $1480\,\mathrm{nm}$), the ions are raised to an upper level from which they relax to a metastable level about $0.8\,\mathrm{eV}$ above the ground state, with a lifetime of about $10\,\mathrm{ms}$. The long lifetime allows a strong population inversion, and stimulated emission ([[photonics/light-sources#def-einstein]]) amplifies signals from about $1530$ to $1565\,\mathrm{nm}$ (and, in longer, more lightly inverted fibres, the L band to $1610\,\mathrm{nm}$) with gains of $20$–$35\,\mathrm{dB}$. Because the lifetime is so long compared with a bit period, the gain cannot follow the data and does not distort it, nor does it couple the channels to one another. **Raman amplifiers** use stimulated Raman scattering in the transmission fibre itself, pumped about $13\,\mathrm{THz}$ above the signal, and give distributed gain at any wavelength; **semiconductor optical amplifiers** are lasers with anti-reflection-coated facets, compact but with fast gain dynamics.

Every amplifier also emits spontaneously, and that light is amplified along with the signal: **amplified spontaneous emission** (ASE), the noise of optical systems.

::: theorem ASE noise and the noise figure {#thm-ase}
An optical amplifier of gain $G$ adds ASE with power spectral density, in each polarisation,

$$
S_{\mathrm{ASE}} = n_{sp}h\nu(G - 1) ,
$$ {#eq-ase}

where the **spontaneous-emission factor** $n_{sp} = N_2/(N_2 - N_1) \ge 1$ measures the inversion. For large gain its **noise figure** (the ratio of input to output signal-to-noise ratio of an ideal shot-noise-limited detector) is

$$
F_{o} \approx 2n_{sp} \ge 2 ,
$$ {#eq-nf}

so a high-gain optical amplifier with complete inversion has a noise figure of $3\,\mathrm{dB}$, and practical EDFAs $4$–$6\,\mathrm{dB}$.
:::

::: proof
A sketch; the full derivation is in Agrawal, Chapter 7, or Saleh & Teich, Chapter 15. Consider the amplifier as a sequence of short sections in which the signal gains as $\dd P/\dd z = g P$, with $g \propto N_2 - N_1$. Each section also emits spontaneously into the guided mode, in each polarisation and per unit bandwidth, a power proportional to $N_2$ — by the Einstein relations exactly $h\nu\,gN_2/(N_2 - N_1)\,\dd z = n_{sp}h\nu g\,\dd z$ per unit bandwidth (one photon per mode per unit stimulated-emission rate). That noise is amplified by the rest of the amplifier. Summing over sections, $S = n_{sp}h\nu\int_0^Lg(z)\exp(\int_z^Lg)\,\dd z = n_{sp}h\nu(G - 1)$. The dominant noise at a photodiode is the beating of signal and ASE, of variance $4\mathcal R^2GP_{\mathrm{in}}S_{\mathrm{ASE}}B_e$ in electrical bandwidth $B_e$; the input shot-noise-limited SNR is $P_{\mathrm{in}}/(2h\nu B_e)$ with $\mathcal R = q/h\nu$. Their ratio gives $F_o = 2n_{sp}(G - 1)/G + 1/G \approx 2n_{sp}$.
:::

### The optical signal-to-noise ratio of an amplified chain

A long-haul link is a chain of $N$ identical spans, each of loss $L_{\mathrm{span}}$ (a factor $\mathcal L = 10^{L_{\mathrm{span}}/10}$), each followed by an amplifier of gain $G = \mathcal L$ that restores the signal power. Every amplifier adds the same ASE, and since the signal power at each amplifier output is the same, the noise simply accumulates.

::: theorem OSNR of an amplified link {#thm-osnr}
The **optical signal-to-noise ratio**, the ratio of channel power to ASE power (both polarisations) in a reference bandwidth $B_{\mathrm{ref}}$, after $N$ spans with amplifiers of noise figure $F_o$ and gain equal to the span loss, is

$$
\mathrm{OSNR} = \frac{P_{\mathrm{ch}}}{NF_oh\nu G B_{\mathrm{ref}}} .
$$ {#eq-osnr}

With $B_{\mathrm{ref}} = 12.5\,\mathrm{GHz}$ (0.1 nm at $1550\,\mathrm{nm}$) and all quantities in decibels,

$$
\mathrm{OSNR}\,[\mathrm{dB}] = 58 + P_{\mathrm{ch}}\,[\mathrm{dBm}] - L_{\mathrm{span}}\,[\mathrm{dB}] - \mathrm{NF}\,[\mathrm{dB}] - 10\log_{10}N .
$$ {#eq-osnr-db}
:::

::: proof
Each amplifier adds ASE power $2S_{\mathrm{ASE}}B_{\mathrm{ref}} = 2n_{sp}h\nu(G - 1)B_{\mathrm{ref}} \approx F_oh\nu GB_{\mathrm{ref}}$ in both polarisations, using [[#eq-nf]] and $G \gg 1$. The ASE from one amplifier is attenuated by the next span and restored by the next amplifier, so it arrives at the end with unchanged power; the $N$ contributions are independent and add. The signal is restored to $P_{\mathrm{ch}}$ after every span. Dividing gives [[#eq-osnr]]. In decibels, $10\log_{10}[1\,\mathrm{mW}/(h\nu B_{\mathrm{ref}})] = 10\log_{10}[10^{-3}/(1.28\times10^{-19}\times1.25\times10^{10})] = 58.0$.
:::

::: widget plot
f: 58 + P - L - F - 10*log10(x)
x: 1, 150
y: 5, 40
sliders: P=0:-3:5:0.5; L=16:8:30:0.5; F=5:3:8:0.1
hlines: 13.9
labels: \mathrm{OSNR}\ (\mathrm{dB}/0.1\,\mathrm{nm})
caption: OSNR in a $0.1\,\mathrm{nm}$ reference bandwidth against the number of amplified spans $N$, from [[#eq-osnr-db]], for channel power $P$ (dBm), span loss $L$ (dB) and amplifier noise figure $F$ (dB). The horizontal line at $13.9\,\mathrm{dB}$ is the requirement of a $32\,\mathrm{GBd}$ dual-polarisation QPSK channel at a pre-FEC BER of $10^{-3}$. Each doubling of $N$ costs $3\,\mathrm{dB}$; each extra dB of span loss costs a dB of OSNR. Raise $P$ to gain OSNR — until fibre nonlinearity, not shown here, takes it away. Reduce $L$ from $16$ to $12\,\mathrm{dB}$ (shorter spans) and see the reach grow.
:::

::: example Choosing the span length of a transoceanic system {#ex-span}
A $6000\,\mathrm{km}$ submarine system uses fibre with $0.20\,\mathrm{dB/km}$ (including splices and repeater losses), amplifiers with a $5\,\mathrm{dB}$ noise figure, and $0\,\mathrm{dBm}$ per channel (the nonlinear optimum). Compute the OSNR for spans of $40$, $60$ and $80\,\mathrm{km}$, and choose the span length if $18\,\mathrm{dB}$ is needed after allowing margins. How many repeaters are needed?
::: solution
$N = 6000/L_s$ and $L_{\mathrm{span}} = 0.2L_s$ dB. By [[#eq-osnr-db]]:

| span | $N$ | $L_{\mathrm{span}}$ | OSNR |
|---|---|---|---|
| $40\,\mathrm{km}$ | $150$ | $8\,\mathrm{dB}$ | $58 + 0 - 8 - 5 - 21.8 = 23.2\,\mathrm{dB}$ |
| $60\,\mathrm{km}$ | $100$ | $12\,\mathrm{dB}$ | $58 - 12 - 5 - 20 = 21.0\,\mathrm{dB}$ |
| $80\,\mathrm{km}$ | $75$ | $16\,\mathrm{dB}$ | $58 - 16 - 5 - 18.8 = 18.2\,\mathrm{dB}$ |

Shorter spans win, because the span loss enters in decibels (exponentially in length) while the number of amplifiers enters only logarithmically. $80\,\mathrm{km}$ spans just meet $18\,\mathrm{dB}$ with no margin; $60\,\mathrm{km}$ spans give $3\,\mathrm{dB}$ to spare with $100$ repeaters (99 submerged amplifiers per fibre pair plus the terminal). Submarine systems indeed use spans of $50$–$70\,\mathrm{km}$; terrestrial systems, where each amplifier hut costs real estate and power, use $80$–$100\,\mathrm{km}$ and accept a shorter reach or regenerate.
:::
:::

::: warning OSNR is not the electrical SNR
OSNR is defined in a fixed $0.1\,\mathrm{nm}$ ($12.5\,\mathrm{GHz}$) optical bandwidth, counting noise in both polarisations, so that it can be read off an optical spectrum analyser. The SNR that sets the error rate is measured in the signal's own bandwidth. For a dual-polarisation coherent signal at symbol rate $R_s$, the two are related by $\mathrm{SNR} = \mathrm{OSNR}\cdot B_{\mathrm{ref}}/R_s$: at $32\,\mathrm{GBd}$ the SNR is $4.1\,\mathrm{dB}$ *below* the OSNR, at $8\,\mathrm{GBd}$ $1.9\,\mathrm{dB}$ above it. Always state the reference bandwidth when quoting an OSNR.
:::

## Coherent detection and digital signal processing {#sec-coherent}

Direct detection measures only power. A **coherent receiver** mixes the received field with a strong **local oscillator** (LO) laser at nearly the same frequency, in an optical $90^\circ$ hybrid, and detects the outputs with balanced photodiode pairs. Each balanced pair produces a current proportional to $\operatorname{Re}\{E_sE_{LO}^*\}$ or $\operatorname{Im}\{E_sE_{LO}^*\}$: the in-phase and quadrature components of the signal's complex envelope, exactly as in the radio quadrature demodulator of [[communication-systems/signals-spectra-channels]]. With a polarisation splitter in front, both polarisations are captured. Four photocurrents — $I$ and $Q$ for $x$ and $y$ — are digitised at $1$–$2$ samples per symbol by analogue-to-digital converters running at up to about $200\,\mathrm{GS/s}$, and everything else is digital.

Coherent detection gives three things at once. Its sensitivity is high, since the LO power multiplies the signal above thermal noise. It recovers the phase, so formats such as QPSK and 16-QAM, carrying $4$ and $8$ bits per symbol across two polarisations, can be used. And because the receiver has the full complex field, linear impairments of the fibre can be undone digitally: chromatic dispersion is the all-pass filter $H(\omega) = e^{j\beta_2\omega^2L/2}$, inverted exactly by a digital filter; polarisation rotation and polarisation-mode dispersion are undone by an adaptive $2\times2$ multiple-input multiple-output equaliser; the frequency offset and phase noise between signal and LO are tracked by carrier recovery; and a soft-decision forward-error-correction decoder corrects error rates of $10^{-2}$ to below $10^{-15}$. Dispersion compensating fibre, once installed every span, is no longer needed.

::: example OSNR requirement of a 100 Gb/s coherent channel {#ex-coherent}
A $100\,\mathrm{Gb/s}$ dual-polarisation QPSK channel runs at $R_s = 32\,\mathrm{GBd}$ (including FEC overhead). Its FEC corrects a pre-FEC BER of $10^{-3}$. For Gray-coded QPSK in additive Gaussian noise, $\mathrm{BER} = Q(\sqrt{\mathrm{SNR}})$, where $\mathrm{SNR} = E_s/N_0$ and $Q(x) = \tfrac12\operatorname{erfc}(x/\sqrt2)$. Find the required SNR and OSNR, and the reach of the terrestrial link of [[#ex-span]]'s parameters but with $80\,\mathrm{km}$ spans of $0.22\,\mathrm{dB/km}$, $\mathrm{NF} = 5.5\,\mathrm{dB}$ and $+1\,\mathrm{dBm}$ per channel, allowing $4\,\mathrm{dB}$ for implementation penalties and nonlinearity.
::: solution
$Q(\sqrt{\mathrm{SNR}}) = 10^{-3}$ needs $\sqrt{\mathrm{SNR}} = 3.09$, so $\mathrm{SNR} = 9.55$ ($9.8\,\mathrm{dB}$). Then $\mathrm{OSNR} = \mathrm{SNR}\cdot R_s/B_{\mathrm{ref}} = 9.55\times32/12.5 = 24.4$, i.e. $13.9\,\mathrm{dB}$. With $4\,\mathrm{dB}$ of penalties the system must deliver $17.9\,\mathrm{dB}$.

Each span loses $80\times0.22 = 17.6\,\mathrm{dB}$. By [[#eq-osnr-db]], $58 + 1 - 17.6 - 5.5 - 10\log_{10}N \ge 17.9$ requires $10\log_{10}N \le 18.0$, $N \le 63$ spans: about $5000\,\mathrm{km}$. In practice nonlinearity and filtering through many add–drop nodes cut this to $2000$–$4000\,\mathrm{km}$, typical of commercial $100\,\mathrm{G}$ transponders. A $400\,\mathrm{Gb/s}$ channel using 16-QAM at $64\,\mathrm{GBd}$ needs about $7\,\mathrm{dB}$ more OSNR and reaches a few hundred to a thousand kilometres.
:::
:::

### Capacity

Shannon's formula ([[information-theory/channel-capacity]]) applied to a dual-polarisation channel of bandwidth $B$ gives $C = 2B\log_2(1 + \mathrm{SNR})$. A $50\,\mathrm{GHz}$ slot at an SNR of $15\,\mathrm{dB}$ could carry $500\,\mathrm{Gb/s}$, and the $4.4\,\mathrm{THz}$ C band about $44\,\mathrm{Tb/s}$; adding the L band roughly doubles it. Unlike a linear channel, however, the SNR of a fibre cannot be raised indefinitely by launching more power, because the Kerr nonlinearity turns signal power into noise-like distortion; the capacity of a single-mode fibre therefore has a maximum at an optimum launch power, around $100\,\mathrm{Tb/s}$ over the full low-loss window for regional distances. To go beyond, research turns to more bands, multicore and few-mode fibres (**space-division multiplexing**), and nonlinearity compensation.

::: quiz
In a coherent receiver, chromatic dispersion is compensated by a digital filter. Why is this possible in a coherent receiver but not, in the same way, after direct detection?
- [ ] Direct-detection receivers are too slow to run digital filters
- [x] Dispersion is a linear phase filter on the optical field; direct detection measures only $\lvert E\rvert^2$ and discards the phase needed to invert it
- [ ] Dispersion only affects phase-modulated signals
- [ ] The local oscillator removes dispersion optically before detection
::: solution
Dispersion multiplies the field's spectrum by $e^{j\beta_2\omega^2L/2}$. A coherent receiver measures the complex field and can multiply by the inverse. A photodiode squares the magnitude; after squaring, dispersion is no longer a linear operation on the measured signal, and the phase information that would undo it is gone. Direct-detection systems either compensate optically, pre-distort at the transmitter, or live with the limit.
:::
:::

::: application Fibre to the home and data-centre optics
A **passive optical network** (PON) serves up to $64$ homes from one fibre: a passive splitter in the street divides the downstream light (at $1490$ or $1577\,\mathrm{nm}$), and the homes take turns sending upstream (at $1270$ or $1310\,\mathrm{nm}$) in time slots assigned by the central office. The $1{:}64$ split costs $18\,\mathrm{dB}$, and the power budget, not dispersion, sets a reach of about $20\,\mathrm{km}$; current systems carry $10$–$50\,\mathrm{Gb/s}$ shared. Inside data centres, pluggable modules at $400$–$1600\,\mathrm{Gb/s}$ use PAM4 at $50$–$200\,\mathrm{Gb/s}$ per lane, over parallel fibres or four to eight CWDM wavelengths in the O band, where dispersion is small enough that no DSP-based compensation is needed beyond a modest equaliser.
:::

::: history
The first commercial fibre systems, carrying telephone traffic at $45\,\mathrm{Mb/s}$ over multimode fibre at $850\,\mathrm{nm}$, were installed in 1977 in Chicago by AT&T and in Long Beach by GTE. Systems moved to single-mode fibre at $1310\,\mathrm{nm}$ in the early 1980s, and TAT-8, the first transatlantic fibre cable (1988), used regenerators at $1310\,\mathrm{nm}$. The erbium-doped fibre amplifier, reported in 1987 by David Payne's group at Southampton and Emmanuel Desurvire's at Bell Laboratories, entered transoceanic service with TAT-12/13 in 1996, and dense WDM systems followed in the late 1990s. Meint Smit proposed the arrayed-waveguide grating in 1988 and Corrado Dragone developed it at Bell Laboratories around 1991. Coherent detection had been studied intensively in the 1980s but was overtaken by amplified direct detection; it returned when Kazuro Kikuchi and others showed in the mid-2000s that digital signal processing could replace optical phase locking, and Nortel introduced commercial $40\,\mathrm{Gb/s}$ coherent transponders in 2008.
:::

## Where this leads

The remaining chapter of this course, [[photonics/photovoltaics]], uses the same semiconductor physics for energy rather than information. The modulation formats, detection theory and coding used here are developed in general in [[communication-systems/digital-modulation]], [[communication-systems/optimal-detection]] and [[information-theory/modern-codes]], and the wireless counterparts of WDM and coherent MIMO processing in [[communication-systems/wireless-communication]]. The noise accumulation of amplifier chains is the optical analogue of Friis's formula in [[electronics-2/electronic-noise]].

::: summary
- IM/DD systems switch optical power (NRZ OOK, PAM4); long and coherent links use external modulators, with the push–pull MZM giving chirp-free $P_{\mathrm{out}} = P_{\mathrm{in}}\cos^2(\pi V/2V_\pi)$.
- A link must close a power budget (launch power minus losses and margin above sensitivity) and a rise-time budget ($\sqrt{\sum t_i^2} \le 0.7/B$ for NRZ).
- WDM puts many channels on the ITU grid $193.1\,\mathrm{THz} + n\Delta\nu$; $100\,\mathrm{GHz} \approx 0.8\,\mathrm{nm}$, and the C band holds about $88$ channels at $50\,\mathrm{GHz}$.
- EDFAs amplify the whole C (and L) band with $20$–$35\,\mathrm{dB}$ of gain; their ASE noise has density $n_{sp}h\nu(G - 1)$ per polarisation, and their noise figure is at least $3\,\mathrm{dB}$.
- After $N$ spans, $\mathrm{OSNR} = 58 + P_{\mathrm{ch}} - L_{\mathrm{span}} - \mathrm{NF} - 10\log_{10}N$ (dB, $0.1\,\mathrm{nm}$); shorter spans give higher OSNR, and nonlinearity limits the launch power.
- Coherent receivers recover the complex field in both polarisations, compensate dispersion and PMD digitally, and allow QAM formats; $\mathrm{SNR} = \mathrm{OSNR}\,B_{\mathrm{ref}}/R_s$ links the optical and electrical figures.
:::

## Exercises

::: exercise The ITU grid {level=1 check="299792458/(193.1e12+12*100e9)"}
Find the vacuum wavelength of the ITU channel $n = 12$ on the $100\,\mathrm{GHz}$ grid, in metres, and its wavelength separation from $n = 11$.
::: solution
$\nu = 193.1 + 1.2 = 194.3\,\mathrm{THz}$, so $\lambda_0 = c/\nu = 1.5429\times10^{-6}\,\mathrm m$ ($1542.9\,\mathrm{nm}$). The separation is $\lambda_0^2\Delta\nu/c = (1.5429\times10^{-6})^2\times10^{11}/3\times10^8 = 0.79\,\mathrm{nm}$.
:::
:::

::: exercise Modulator drive {level=1 check="10*log10(cos(pi/4-pi*0.6/4)^2/cos(pi/4+pi*0.6/4)^2)"}
A push–pull MZM biased at quadrature is driven with a swing of $0.6V_\pi$ peak-to-peak. Find the extinction ratio in dB.
::: solution
The levels are $\cos^2(\pi/4 - 0.15\pi) = \cos^2(0.1\pi) = 0.905$ and $\cos^2(0.4\pi) = 0.0955$; the ratio is $9.47$, or $9.8\,\mathrm{dB}$.
:::
:::

::: exercise ASE power {level=1 check="10*log10(2*(10^0.5/2)*6.62607015e-34*193.1e12*99*12.5e9/1e-3)"}
An EDFA with $20\,\mathrm{dB}$ gain and a $5\,\mathrm{dB}$ noise figure operates at $193.1\,\mathrm{THz}$. Find $n_{sp}$ and the ASE power in both polarisations in a $12.5\,\mathrm{GHz}$ bandwidth at its output, in dBm.
::: solution
$F_o = 10^{0.5} = 3.16 = 2n_{sp}$, so $n_{sp} = 1.58$. $P_{\mathrm{ASE}} = 2n_{sp}h\nu(G - 1)B = 3.16\times1.28\times10^{-19}\times99\times1.25\times10^{10} = 5.0\times10^{-7}\,\mathrm W$, or $-33.0\,\mathrm{dBm}$. A channel at $0\,\mathrm{dBm}$ leaves this single amplifier with an OSNR of $33\,\mathrm{dB}$.
:::
:::

::: exercise A rise-time budget {level=2 check="sqrt(30^2+(3.5*20*1)^2+(0.35/10)^2*1e6)"}
A $10\,\mathrm{Gb/s}$ O-band link uses a laser with $30\,\mathrm{ps}$ rise time and $1\,\mathrm{nm}$ spectral width, $20\,\mathrm{km}$ of fibre with $\lvert D\rvert \le 3.5\,\mathrm{ps/(nm\cdot km)}$, and a receiver of $10\,\mathrm{GHz}$ bandwidth. Find the system rise time in picoseconds and decide whether the link closes the NRZ budget.
::: solution
$t_{cd} = 3.5\times20\times1 = 70\,\mathrm{ps}$; $t_{rx} = 0.35/10\,\mathrm{GHz} = 35\,\mathrm{ps}$. $t_{\mathrm{sys}} = \sqrt{30^2 + 70^2 + 35^2} = 83.8\,\mathrm{ps}$. The limit is $0.7/10\,\mathrm{Gb/s} = 70\,\mathrm{ps}$: the budget fails, because of the source width. A DFB laser ($\Delta\lambda \approx 0.1\,\mathrm{nm}$ effective) gives $t_{cd} = 7\,\mathrm{ps}$ and $t_{\mathrm{sys}} = 47\,\mathrm{ps}$, which passes.
:::
:::

::: exercise OSNR after a chain {level=2 check="58+2-22-6-10*log10(10)"}
Ten spans of $100\,\mathrm{km}$ at $0.22\,\mathrm{dB/km}$ are amplified by EDFAs with a $6\,\mathrm{dB}$ noise figure; the launch power is $+2\,\mathrm{dBm}$ per channel. Find the OSNR in dB ($0.1\,\mathrm{nm}$).
::: solution
$L_{\mathrm{span}} = 22\,\mathrm{dB}$. $\mathrm{OSNR} = 58 + 2 - 22 - 6 - 10 = 22\,\mathrm{dB}$.
:::
:::

::: exercise SNR from OSNR {level=2 check="16-10*log10(64/12.5)"}
A $64\,\mathrm{GBd}$ dual-polarisation signal is received with an OSNR of $16\,\mathrm{dB}$ in $0.1\,\mathrm{nm}$. Find its SNR in dB, derive the conversion formula, and decide whether 16-QAM (needing about $16.5\,\mathrm{dB}$ SNR at the FEC threshold) or QPSK (about $9.8\,\mathrm{dB}$) is possible.
::: solution
Let $P$ be the total signal power and $N_0$ the ASE density per polarisation. $\mathrm{OSNR} = P/(2N_0B_{\mathrm{ref}})$. In the receiver each polarisation carries $P/2$ with noise $N_0R_s$ in its matched-filter bandwidth, so $\mathrm{SNR} = P/(2N_0R_s) = \mathrm{OSNR}\,B_{\mathrm{ref}}/R_s$. Here $\mathrm{SNR} = 16 - 10\log_{10}(64/12.5) = 16 - 7.1 = 8.9\,\mathrm{dB}$. Neither format works at $64\,\mathrm{GBd}$ with this OSNR; QPSK would need $0.9\,\mathrm{dB}$ more, 16-QAM $7.6\,\mathrm{dB}$ more. Halving the symbol rate to $32\,\mathrm{GBd}$ raises the SNR to $11.9\,\mathrm{dB}$, enough for QPSK.
:::
:::

::: exercise Dispersion to be compensated digitally {level=2}
A $32\,\mathrm{GBd}$ coherent signal at $1550\,\mathrm{nm}$ travels $1000\,\mathrm{km}$ of fibre with $D = 17\,\mathrm{ps/(nm\cdot km)}$. Estimate the spread of arrival times across the signal bandwidth, the number of symbols over which each symbol is smeared, and the length of the digital compensating filter at two samples per symbol.
::: solution
The signal occupies about $R_s = 32\,\mathrm{GHz}$, i.e. $\Delta\lambda = \lambda_0^2R_s/c = 0.256\,\mathrm{nm}$. The delay spread is $\lvert D\rvert L\Delta\lambda = 17\times1000\times0.256 = 4360\,\mathrm{ps}$, which is $4.36\,\mathrm{ns}\times32\,\mathrm{GBd} = 140$ symbols. The filter must span this: about $280$ taps at two samples per symbol, implemented efficiently with FFTs in the frequency domain. For a $10\,000\,\mathrm{km}$ transpacific link, ten times more — a few thousand taps, still routine for a modern DSP chip.
:::
:::

::: exercise Gain and noise figure of an amplifier chain {level=3}
Two amplifiers are cascaded with a loss $\mathcal L$ (a factor less than one) between them: gains $G_1$, $G_2$ and noise figures $F_1$, $F_2$. (a) Using [[#eq-ase]] and the fact that ASE adds as independent noise, show that the cascade has $F \approx F_1 + F_2/(G_1\mathcal L)$ for large gains — the optical version of Friis's formula. (b) A two-stage EDFA has a first stage of $15\,\mathrm{dB}$ gain and $4\,\mathrm{dB}$ NF, an isolator and gain-flattening filter with $3\,\mathrm{dB}$ loss, and a second stage of $15\,\mathrm{dB}$ gain and $7\,\mathrm{dB}$ NF. Find the total gain and noise figure in dB.
::: hint
Refer the ASE of the second amplifier back to the input of the first by dividing by $G_1\mathcal L$.
:::
::: solution
(a) The ASE density at the output is $S = \tfrac12F_1h\nu G_1\cdot\mathcal LG_2 + \tfrac12F_2h\nu G_2$ (using $n_{sp}(G - 1) \approx \tfrac12FG$). Referring it to the input by dividing by the total gain $G_1\mathcal LG_2$ gives $\tfrac12h\nu[F_1 + F_2/(G_1\mathcal L)]$, which is the ASE of a single amplifier with $F = F_1 + F_2/(G_1\mathcal L)$.

(b) Gain: $15 - 3 + 15 = 27\,\mathrm{dB}$. $F_1 = 2.51$, $F_2 = 5.01$, $G_1\mathcal L = 10^{1.2} = 15.85$. $F = 2.51 + 5.01/15.85 = 2.83$, i.e. $4.5\,\mathrm{dB}$. The noisy second stage costs only $0.5\,\mathrm{dB}$, because the first stage's gain makes its noise dominant. That is why the lossy filter sits between the stages and not at the input, where its $3\,\mathrm{dB}$ would add directly to the noise figure.
:::
:::

::: exercise Designing a WDM metro ring {level=3}
A metro WDM network must carry $40$ channels of $100\,\mathrm{Gb/s}$ DP-QPSK (required OSNR $13.9\,\mathrm{dB}$ plus $5\,\mathrm{dB}$ for penalties) over a worst-case path of $600\,\mathrm{km}$, through $6$ reconfigurable add–drop nodes each with $12\,\mathrm{dB}$ of loss that must be made up by an extra amplifier. Fibre loss is $0.25\,\mathrm{dB/km}$, NF $= 5.5\,\mathrm{dB}$. (a) Choose a launch power of $+1\,\mathrm{dBm}$ per channel and find the longest span length that meets the OSNR target, treating the node amplifiers as extra spans of $12\,\mathrm{dB}$ loss. (b) What total output power must each EDFA deliver?
::: hint
Noise from spans with different losses adds in linear units: $1/\mathrm{OSNR} = \sum_i F_oh\nu G_iB_{\mathrm{ref}}/P_{\mathrm{ch}}$.
:::
::: solution
(a) The target is $18.9\,\mathrm{dB}$, i.e. $1/\mathrm{OSNR} \le 10^{-1.89} = 0.0129$. One amplifier compensating a loss $G$ contributes $F_oh\nu GB_{\mathrm{ref}}/P_{\mathrm{ch}} = 10^{(-58 - 1 + 5.5)/10}G = 4.47\times10^{-6}G$. The six node amplifiers ($G = 10^{1.2} = 15.85$) contribute $6\times7.08\times10^{-5} = 4.25\times10^{-4}$. The remaining budget, $0.0129 - 0.0004 = 0.0125$, is for the $N = 600/L_s$ fibre spans: $(600/L_s)\times4.47\times10^{-6}\times10^{0.025L_s} \le 0.0125$. Trying values: $L_s = 80\,\mathrm{km}$ gives $7.5\times4.47\times10^{-6}\times10^{2.0} = 3.35\times10^{-3}$, fine; $L_s = 100\,\mathrm{km}$: $6\times4.47\times10^{-6}\times316 = 8.5\times10^{-3}$, fine; $L_s = 110\,\mathrm{km}$: $5.45\times4.47\times10^{-6}\times562 = 0.0137$, too much. So spans up to about $105\,\mathrm{km}$; a prudent design uses $80\,\mathrm{km}$, for which $1/\mathrm{OSNR} = 3.78\times10^{-3}$ ($24.2\,\mathrm{dB}$), keeping more than $5\,\mathrm{dB}$ of margin for ageing and nonlinearity.

(b) $40$ channels at $+1\,\mathrm{dBm}$ is $1 + 10\log_{10}40 = 17\,\mathrm{dBm}$ ($50\,\mathrm{mW}$) per amplifier, a standard EDFA output; the $980\,\mathrm{nm}$ pump must supply roughly twice that.
:::
:::
