A new product, working perfectly on the bench, goes to the EMC test laboratory and fails: at $3\,\mathrm{m}$ its radiated emissions exceed the limit by $8\,\mathrm{dB}$ at $125\,\mathrm{MHz}$, the fifth harmonic of a $25\,\mathrm{MHz}$ crystal. The culprit turns out to be not the circuit board, whose signals are carefully routed over a ground plane, but a $1\,\mathrm{m}$ USB cable, along which a few microamperes of common-mode current flow — a millionth of the signal current. The same product, placed next to a walkie-talkie, resets itself; and a static spark from a user's finger to a connector shell scrambles its display. None of this shows up in a circuit simulation, because a schematic assumes that wires carry current only where they are drawn and that "ground" is everywhere the same.

**Electromagnetic compatibility** (EMC) is the discipline that deals with this: making equipment that does not emit disturbances beyond agreed limits and that keeps working in the presence of the disturbances it will meet. It is a legal requirement — no electronic product can be sold in the EU, the USA, China and most other markets without demonstrating compliance — and a matter of engineering judgement, because the coupling paths are parasitic and invisible. This chapter organises the subject around the source–path–victim model. We derive the spectrum of digital signals and the radiated fields of differential- and common-mode currents, which explain why cables dominate emissions; treat shielding, filtering, grounding and PCB layout as the means of breaking the paths; and summarise the immunity tests and the emission standards and their limits. The low-frequency coupling mechanisms — common-impedance, capacitive and inductive coupling, ground loops — were treated in [[instrumentation/instrumentation-amplifiers]], and radiation from antennas in [[rf-microwave/antennas]]; the fields themselves are those of [[electromagnetics/maxwells-equations]].

## Sources, paths and victims {#sec-model}

::: definition Electromagnetic compatibility {#def-emc}
**Electromagnetic compatibility** is the ability of equipment or a system to function satisfactorily in its electromagnetic environment without introducing intolerable electromagnetic disturbances to anything in that environment. It has two sides: **emissions**, the disturbances a device produces, and **immunity** (or susceptibility, its opposite), its ability to work in the presence of disturbances. Each is either **conducted** (along cables, measured as voltages or currents, usually from $9\,\mathrm{kHz}$ or $150\,\mathrm{kHz}$ to $30\,\mathrm{MHz}$) or **radiated** (through space, measured as field strengths, usually above $30\,\mathrm{MHz}$).
:::

Every interference problem has three parts: a **source** (a clock, a switching converter, a motor, a radio transmitter, an electrostatic discharge), a **coupling path** (a shared conductor, a capacitance, a mutual inductance, a cable acting as an antenna) and a **victim** (a radio receiver, a sensor input, a reset line). Removing any one of the three solves the problem; the art is to find the cheapest. At the source: slower edges, lower currents, smaller loops, spread-spectrum clocking. On the path: filtering, shielding, separation, layout. At the victim: bandwidth limiting, differential inputs, software that tolerates glitches.

EMC uses decibels for everything, because the quantities span many orders of magnitude: voltages in $\mathrm{dB\mu V}$ ($20\log_{10}(V/1\,\mathrm{\mu V})$), currents in $\mathrm{dB\mu A}$, fields in $\mathrm{dB\mu V/m}$. A limit of $40\,\mathrm{dB\mu V/m}$ is $100\,\mathrm{\mu V/m}$.

### Near and far fields

Close to a source, within roughly $\lambda/2\pi$, the fields are dominated by stored, quasi-static terms: a high-voltage, low-current source (a dipole-like conductor) produces mainly an electric field, and a high-current, low-voltage loop mainly a magnetic field. This is the regime of capacitive and inductive coupling. Beyond about $\lambda/2\pi$ ($48\,\mathrm{cm}$ at $100\,\mathrm{MHz}$, $48\,\mathrm{m}$ at $1\,\mathrm{MHz}$) the radiated terms dominate, $E$ and $H$ are perpendicular, fall off as $1/r$, and their ratio is the impedance of free space, $\eta_0 = \sqrt{\mu_0/\varepsilon_0} \approx 377\,\Omega$. Radiated emission limits are specified in the far field (at $3$ or $10\,\mathrm{m}$ above $30\,\mathrm{MHz}$), so radiation, not quasi-static coupling, is what the test measures.

## Spectra of digital signals {#sec-spectra}

The main source of emissions in digital equipment is the clock and data signals themselves. A clock is a periodic trapezoidal waveform: amplitude $A$, period $T = 1/f_0$, pulse width $\tau$ (measured at half amplitude) and rise and fall times $t_r$. Its Fourier series ([[signals-systems/fourier-series]]) shows how much energy lies at each harmonic.

::: theorem Spectral envelope of a trapezoidal pulse train {#thm-trapezoid}
A periodic trapezoidal waveform with amplitude $A$, period $T$, pulse width $\tau$ and equal rise and fall times $t_r$ has harmonics at $nf_0$ with one-sided amplitudes

$$
c_n = 2A\frac{\tau}{T}\,\left\lvert\frac{\sin(\pi n f_0\tau)}{\pi nf_0\tau}\right\rvert\,\left\lvert\frac{\sin(\pi nf_0t_r)}{\pi nf_0t_r}\right\rvert .
$$ {#eq-trapezoid}

Their envelope is bounded by $2A\tau/T$ up to $f_1 = 1/(\pi\tau)$, falls at $20\,\mathrm{dB}$ per decade from $f_1$ to $f_2 = 1/(\pi t_r)$, and at $40\,\mathrm{dB}$ per decade above $f_2$.
:::

::: proof
A trapezoid of half-amplitude width $\tau$ and edge time $t_r$ is the convolution of a rectangle of width $\tau$ and height $A$ with a rectangle of width $t_r$ and unit area. Convolution in time is multiplication of transforms ([[signals-systems/fourier-transform]]), and the transform of a unit-area rectangle of width $w$ is $\sin(\pi fw)/(\pi fw)$; so one pulse has transform $A\tau\,\mathrm{sinc}(\pi f\tau)\,\mathrm{sinc}(\pi ft_r)$ (with $\mathrm{sinc}\,x = \sin x/x$). The Fourier series coefficients of the periodic train are this transform at $f = nf_0$ divided by $T$, and the one-sided amplitude doubles them for $n \ge 1$, giving [[#eq-trapezoid]]. For the envelope, bound each sinc factor by $\min(1, 1/(\pi fw))$: the first factor starts falling as $1/f$ at $f = 1/(\pi\tau)$, the second at $1/(\pi t_r)$.
:::

The lesson is that the **rise time**, not the clock frequency, determines the high-frequency content. A $3.3\,\mathrm{V}$, $50\,\mathrm{MHz}$ clock with $50\,\%$ duty cycle ($\tau = 10\,\mathrm{ns}$) and $t_r = 1\,\mathrm{ns}$ has an envelope of $2A\tau/T = 3.3\,\mathrm{V}$ ($130.4\,\mathrm{dB\mu V}$) to $f_1 = 31.8\,\mathrm{MHz}$, then $-20\,\mathrm{dB/decade}$ to $f_2 = 318\,\mathrm{MHz}$, and $-40\,\mathrm{dB/decade}$ beyond. Slowing the edges to $3\,\mathrm{ns}$ moves $f_2$ down to $106\,\mathrm{MHz}$ and lowers the envelope at $1\,\mathrm{GHz}$ by $20\log_{10}3 = 9.5\,\mathrm{dB}$ — without changing the logic at all. Fast logic families used on slow signals are a classic EMC mistake.

::: widget plot
f: 20*log10(2*3.3*d) + min(0, -20*log10(pi*10^x*d/f0)) + min(0, -20*log10(pi*10^x*tr*1e-9))
x: 6, 10
y: 40, 140
sliders: tr=1:0.1:10:0.1; d=0.5:0.05:0.5:0.01; f0=50e6:1e6:200e6:1e6
labels: \text{envelope of } c_n\ (\mathrm{dB\mu V})
caption: Upper bound of the harmonic amplitudes of a $3.3\,\mathrm{V}$ trapezoidal clock (dBμV) against $\log_{10}$ of frequency in hertz ($6$ is $1\,\mathrm{MHz}$, $9$ is $1\,\mathrm{GHz}$), for clock frequency $f_0$, duty cycle $d$ and rise time $t_r$ in nanoseconds. The two corners are $1/(\pi\tau)$ and $1/(\pi t_r)$. Increase $t_r$ from $1$ to $5\,\mathrm{ns}$ and watch everything above a few hundred megahertz drop by $14\,\mathrm{dB}$, while the low harmonics, which carry the logic function, do not move.
:::

::: example The fifth harmonic of a clock {#ex-harmonic}
Find the amplitude, in volts and in $\mathrm{dB\mu V}$, of the $250\,\mathrm{MHz}$ harmonic of a $3.3\,\mathrm{V}$, $50\,\mathrm{MHz}$ clock with $50\,\%$ duty cycle, for rise times of $1\,\mathrm{ns}$ and $3\,\mathrm{ns}$. What is special about the even harmonics?
::: solution
Here $n = 5$, $\tau/T = 0.5$ and $2A\tau/T = 3.3\,\mathrm{V}$. The first sinc factor in [[#eq-trapezoid]] is $\lvert\sin(5\pi/2)/(5\pi/2)\rvert = 1/7.854 = 0.127$. The second is $\sin(\pi\times250\times10^6t_r)/(\pi\times250\times10^6t_r)$: for $t_r = 1\,\mathrm{ns}$ its argument is $\pi/4$ and its value $0.900$; for $t_r = 3\,\mathrm{ns}$ the argument is $3\pi/4$ and the value $0.300$. So $c_5 = 3.3\times0.127\times0.900 = 0.378\,\mathrm{V}$ ($111.6\,\mathrm{dB\mu V}$) with $1\,\mathrm{ns}$ edges and $3.3\times0.127\times0.300 = 0.126\,\mathrm{V}$ ($102.0\,\mathrm{dB\mu V}$) with $3\,\mathrm{ns}$ edges: $9.5\,\mathrm{dB}$ less. For $n$ even, $\sin(n\pi/2) = 0$: a waveform with exactly $50\,\%$ duty cycle has no even harmonics. Real clocks have a slight duty-cycle error, so the even harmonics appear, but well below the odd ones.
:::
:::

## Radiation from differential- and common-mode currents {#sec-radiation}

A signal on a pair of conductors — a trace and its return plane, the two wires of a cable — can be decomposed, like the voltages of [[electronics-1/differential-amplifiers]], into two current modes.

::: definition Differential-mode and common-mode currents {#def-dm-cm-current}
For currents $I_1$ and $I_2$ flowing in the same direction on two parallel conductors, the **differential-mode** current is $I_{DM} = \tfrac12(I_1 - I_2)$ and the **common-mode** current is $I_{CM} = \tfrac12(I_1 + I_2)$, so that $I_1 = I_{CM} + I_{DM}$ and $I_2 = I_{CM} - I_{DM}$. The differential-mode current is the intended signal, flowing out on one conductor and back on the other; the common-mode current flows in the same direction on both and must return by some other path — through stray capacitance to the surroundings.
:::

The common-mode current is not drawn on any schematic. It is driven by voltage differences between "grounds" of the same system — the voltage across the inductance of a return path, for example — and it returns through the capacitance between the cable and its surroundings. It is usually tiny, and that is exactly why it is dangerous: it radiates far more efficiently than the differential-mode current.

::: theorem Radiated fields of DM and CM currents {#thm-radiation}
For electrically small structures (dimensions much less than $\lambda$), at distance $r$ in the far field and in the direction of maximum radiation, in free space:

(a) a differential-mode current $I_{DM}$ (RMS, at frequency $f$) around a loop of area $A$ produces

$$
\lvert E_{DM}\rvert = \frac{\pi\eta_0}{c^2}\,\frac{f^2AI_{DM}}{r} = 1.316\times10^{-14}\,\frac{f^2AI_{DM}}{r}\ \mathrm{V/m};
$$ {#eq-dm}

(b) a common-mode current $I_{CM}$ on each of two conductors of length $L$ (total $2I_{CM}$) produces

$$
\lvert E_{CM}\rvert = \frac{\eta_0}{c}\,\frac{fLI_{CM}}{r} = 1.257\times10^{-6}\,\frac{fLI_{CM}}{r}\ \mathrm{V/m},
$$ {#eq-cm}

with all quantities in SI units. Over a reflecting ground plane, as on a test site, the measured fields can be up to twice ($6\,\mathrm{dB}$) larger.
:::

::: proof
These are the far fields of the two elementary antennas ([[rf-microwave/antennas]]). (a) A small loop of area $A$ carrying current $I$ radiates $\lvert E\rvert = \eta_0k^2IA\sin\theta/(4\pi r)$ with $k = 2\pi f/c$; at $\theta = 90^\circ$ this is $\eta_0\pi f^2IA/(c^2r)$, and $\pi\times376.73/(2.998\times10^8)^2 = 1.316\times10^{-14}$. (b) A short (Hertzian) dipole of length $L$ with uniform current $I$ radiates $\lvert E\rvert = \eta_0kIL\sin\theta/(4\pi r) = \eta_0fIL\sin\theta/(2cr)$. The two conductors carry $I_{CM}$ each in the same direction, and since they are much closer together than $\lambda$, their fields add like those of a single dipole with current $2I_{CM}$: $\lvert E\rvert = \eta_0fLI_{CM}/(cr)$, and $376.73/2.998\times10^8 = 1.257\times10^{-6}$. (The DM currents in the two conductors are opposite, and the dipole terms cancel, leaving only the much weaker loop radiation.)
:::

The two formulas differ in their dependence on frequency ($f^2$ against $f$) and enormously in their constants.

::: example Microamperes of common mode {#ex-dm-cm}
A PCB loop of area $2\,\mathrm{cm^2}$ ($2\times10^{-4}\,\mathrm{m^2}$) carries a $100\,\mathrm{MHz}$ harmonic of $20\,\mathrm{mA}$ (differential mode). A $1\,\mathrm{m}$ cable attached to the board carries $5\,\mathrm{\mu A}$ of common-mode current at the same frequency. Estimate both fields at $3\,\mathrm{m}$ and compare them with the FCC Class B limit of $43.5\,\mathrm{dB\mu V/m}$ ($150\,\mathrm{\mu V/m}$) for $88$–$216\,\mathrm{MHz}$.
::: solution
By [[#eq-dm]]: $E_{DM} = 1.316\times10^{-14}\times(10^8)^2\times2\times10^{-4}\times0.02/3 = 1.75\times10^{-4}\,\mathrm{V/m} = 175\,\mathrm{\mu V/m}$, or $44.9\,\mathrm{dB\mu V/m}$.

By [[#eq-cm]]: $E_{CM} = 1.257\times10^{-6}\times10^8\times1\times5\times10^{-6}/3 = 2.10\times10^{-4}\,\mathrm{V/m} = 210\,\mathrm{\mu V/m}$, or $46.4\,\mathrm{dB\mu V/m}$.

Both exceed the limit, and $5\,\mathrm{\mu A}$ of common-mode current radiates more than $20\,\mathrm{mA}$ of differential-mode current, four thousand times larger. (A $1\,\mathrm{m}$ cable is a third of a wavelength at $100\,\mathrm{MHz}$, so the small-antenna formula is only an estimate; near the cable's resonances the field can be higher still.) Halving the loop area gains $6\,\mathrm{dB}$ on the DM term; reducing $I_{CM}$ to $1\,\mathrm{\mu A}$ with a ferrite or a filtered connector gains $14\,\mathrm{dB}$ on the CM term. In practice, cables attached to a product are its main antennas.
:::
:::

::: widget plot
f: 20*log10(1.316e-14*(x*1e6)^2*A*1e-4*Id*1e-3/3/1e-6); 20*log10(1.257e-6*x*1e6*L*Ic*1e-6/3/1e-6); if(x < 88, 40, if(x < 216, 43.5, if(x < 960, 46, 54)))
x: 30, 1000
y: 0, 80
sliders: A=2:0.1:20:0.1; Id=20:1:100:1; L=1:0.1:2:0.1; Ic=5:0.1:20:0.1
labels: E_{DM}\ (\mathrm{dB\mu V/m}); E_{CM}\ (\mathrm{dB\mu V/m}); \text{FCC Class B, } 3\,\mathrm{m}
caption: Estimated fields at $3\,\mathrm{m}$ (dBμV/m) against frequency in megahertz, for a differential-mode loop of area $A$ (cm²) carrying $I_{DM}$ (mA) and a cable of length $L$ (m) carrying $I_{CM}$ (μA), with the FCC Class B limit. The DM field rises at $40\,\mathrm{dB}$ per decade, the CM field at $20\,\mathrm{dB}$ per decade. Find the common-mode current that just meets the limit at $100\,\mathrm{MHz}$ with a $1\,\mathrm{m}$ cable: about $3.6\,\mathrm{\mu A}$. (The model ignores cable resonances and the fall of real harmonic spectra with frequency.)
:::

::: quiz
A product's emissions are dominated by its $2\,\mathrm{m}$ power cable at $60\,\mathrm{MHz}$. Which change is likely to help most?
- [ ] Making the PCB signal loops smaller
- [ ] Doubling the thickness of the copper on the PCB
- [x] Adding a common-mode choke or clamp-on ferrite where the cable leaves the enclosure
- [ ] Twisting the two power conductors more tightly
::: solution
Radiation from a cable is common-mode radiation: [[#eq-cm]] depends on $I_{CM}$ and the cable length, not on the board's loop areas or on how tightly the conductors are twisted (twisting reduces the DM loop area and the cable's pickup of magnetic fields, not its CM current). A common-mode choke adds impedance to the CM path only, reducing $I_{CM}$; the DM power current is unaffected.
:::
:::

## Shielding {#sec-shielding}

A conducting enclosure attenuates fields passing through it by reflection at its surfaces and absorption in its thickness.

::: definition Shielding effectiveness {#def-se}
The **shielding effectiveness** of a barrier is $\mathrm{SE} = 20\log_{10}(E_0/E_1)$ dB (or the same with $H$), the ratio of the field at a point without the shield to the field with it. For a solid conducting sheet it is the sum of an **absorption loss** $A$, a **reflection loss** $R$ and a multiple-reflection correction $B$ (negligible when $A > 10\,\mathrm{dB}$).
:::

::: proposition Absorption loss {#prop-absorption}
A wave crossing a conducting sheet of thickness $t$ is attenuated by

$$
A = 20\log_{10}e^{t/\delta} = 8.686\,\frac{t}{\delta}\ \mathrm{dB}, \qquad \delta = \frac{1}{\sqrt{\pi f\mu\sigma}},
$$ {#eq-absorption}

where $\delta$ is the skin depth; the absorption loss is independent of the type of field.
:::

::: proof
In a good conductor, a plane wave decays as $e^{-z/\delta}$ with $\delta = 1/\sqrt{\pi f\mu\sigma}$ ([[electromagnetics/plane-waves]]). Over thickness $t$ the amplitude falls by $e^{-t/\delta}$, which is $20\log_{10}e\cdot t/\delta = 8.686\,t/\delta$ dB.
:::

In copper ($\sigma = 5.8\times10^7\,\mathrm{S/m}$), $\delta = 66\,\mathrm{\mu m}$ at $1\,\mathrm{MHz}$ and $6.6\,\mathrm{\mu m}$ at $100\,\mathrm{MHz}$; a $0.1\,\mathrm{mm}$ copper foil absorbs $13\,\mathrm{dB}$ at $1\,\mathrm{MHz}$ and $130\,\mathrm{dB}$ at $100\,\mathrm{MHz}$. Reflection loss in the far field is also large for good conductors, about $168 - 10\log_{10}(\mu_rf/\sigma_r)$ dB ($\sigma_r$ relative to copper) — $108\,\mathrm{dB}$ for copper at $1\,\mathrm{MHz}$. For electric fields and plane waves, any reasonable metal sheet is therefore a near-perfect shield above a megahertz. The exceptions are **low-frequency magnetic fields**, for which reflection is small (the wave impedance of a magnetic near field is low and close to that of the metal) and the skin depth is millimetres: at $50\,\mathrm{Hz}$, $\delta = 9.3\,\mathrm{mm}$ in copper. Only thick steel or high-permeability alloys shield them, by diverting flux.

In practice, a shield's performance is set not by its material but by its **apertures**: seams, ventilation slots, display windows, connector cut-outs and, above all, cables that pass through without a filter or a $360^\circ$ bond.

::: proposition Slot leakage {#prop-slot}
A slot of length $l$ (its longest dimension) behaves as a slot antenna; for $l < \lambda/2$ its shielding effectiveness is approximately

$$
\mathrm{SE} \approx 20\log_{10}\frac{\lambda}{2l}\ \mathrm{dB},
$$ {#eq-slot}

falling to $0\,\mathrm{dB}$ when $l = \lambda/2$, where the slot resonates.
:::

The derivation (from the field diffracted by an aperture; see Ott, Chapter 6) is beyond this course, but the scaling is what matters: SE depends on the *longest* dimension, not the area. A $10\,\mathrm{cm}$ seam at $1\,\mathrm{GHz}$ ($\lambda = 30\,\mathrm{cm}$) gives only $3.5\,\mathrm{dB}$; the same open area as ten $1\,\mathrm{cm}$ holes gives about $23.5\,\mathrm{dB}$, less a few decibels for the number of holes. Ventilation is therefore provided by arrays of small holes or honeycomb waveguides, seams are closed with conductive gaskets or screws every few centimetres, and every cable through the shield wall is either shielded and bonded all round to it, or filtered at the wall.

::: widget plot
f: max(0, 20*log10(150/(x*l))); max(0, 20*log10(150/(x*l/10)))
x: 10, 3000
y: 0, 60
sliders: l=0.1:0.01:0.5:0.01
labels: \text{slot of length } l; \text{slot of length } l/10
caption: Shielding effectiveness of an aperture (dB) against frequency in megahertz, for a slot of length $l$ in metres (slider) and for one ten times shorter. A $10\,\mathrm{cm}$ slot is useless above about $1\,\mathrm{GHz}$, where it is a half-wave resonator. Cutting the longest dimension by ten buys $20\,\mathrm{dB}$ at every frequency: what matters is the length of the seam, not the area of the hole.
:::

::: quiz
A steel enclosure $1\,\mathrm{mm}$ thick, whose solid walls would give over $100\,\mathrm{dB}$ of shielding at $500\,\mathrm{MHz}$, has a lid fastened by two screws $30\,\mathrm{cm}$ apart. What sets its shielding at $500\,\mathrm{MHz}$?
- [ ] The wall thickness: about $100\,\mathrm{dB}$
- [x] The $30\,\mathrm{cm}$ seam between the screws, which is a half-wave slot at $500\,\mathrm{MHz}$: close to $0\,\mathrm{dB}$
- [ ] The steel's permeability
- [ ] The paint on the lid
::: solution
At $500\,\mathrm{MHz}$, $\lambda = 60\,\mathrm{cm}$, so the gap between the screws is $\lambda/2$ long and by [[#eq-slot]] the seam is a resonant slot antenna with essentially no shielding. More screws (every $3\,\mathrm{cm}$ gives about $20\,\mathrm{dB}$) or a conductive gasket fix it; thicker walls do not.
:::
:::

## Filtering, grounding and layout {#sec-filtering}

### Mains filters and conducted emissions

Conducted emissions are measured on the mains leads with a **line impedance stabilisation network** (LISN), which presents a defined impedance of $50\,\Omega$ in parallel with $50\,\mathrm{\mu H}$ to each line from $150\,\mathrm{kHz}$ to $30\,\mathrm{MHz}$, isolates the test from the mains' own noise, and couples the noise voltage to the EMI receiver. Switch-mode power supplies are the usual offenders: their fast voltage edges drive common-mode current through the stray capacitance between the switching node (often the transistor tab) and the earthed heatsink or chassis, and their input current pulses drive differential-mode noise.

A mains **EMI filter** attacks each mode separately: **X capacitors** across the lines and series (differential-mode) inductance for DM noise; **Y capacitors** from each line to earth and a **common-mode choke** — two windings on one high-permeability core, wound so that the DM fluxes cancel and the CM fluxes add — for CM noise. A common-mode choke of $10\,\mathrm{mH}$ presents almost no impedance to the $50\,\mathrm{Hz}$ load current, which is differential, but $9.4\,\mathrm{k\Omega}$ to common-mode noise at $150\,\mathrm{kHz}$.

::: example Sizing a common-mode filter {#ex-filter}
A power supply's common-mode emissions measured on the LISN exceed the limit by $34\,\mathrm{dB}$ at $150\,\mathrm{kHz}$. A filter of a common-mode choke $L$ and two Y capacitors of $2.2\,\mathrm{nF}$ (so $4.4\,\mathrm{nF}$ total to earth) is to be added; treat it as a second-order LC low-pass with attenuation of $40\,\mathrm{dB}$ per decade above $f_0 = 1/(2\pi\sqrt{LC})$. Choose $L$ for $40\,\mathrm{dB}$ of attenuation at $150\,\mathrm{kHz}$ (a $6\,\mathrm{dB}$ margin). What limits the size of the Y capacitors?
::: solution
Forty decibels at $150\,\mathrm{kHz}$ with $40\,\mathrm{dB/decade}$ requires $f_0 = 15\,\mathrm{kHz}$. Then $L = 1/[(2\pi f_0)^2C] = 1/[(9.42\times10^4)^2\times4.4\times10^{-9}] = 25.6\,\mathrm{mH}$ — a large but standard common-mode choke. The Y capacitors are limited by safety: they pass a leakage current to the protective earth of $2\pi\times50\times4.4\times10^{-9}\times230 = 0.32\,\mathrm{mA}$, and product safety standards cap this touch current (at values ranging from about $0.25\,\mathrm{mA}$ for some double-insulated equipment to a few milliamperes for earthed equipment). Medical equipment allows far less, which is why its filters rely on larger chokes. In practice the attenuation is less than the ideal $40\,\mathrm{dB/decade}$, because the filter's source and load impedances are not those assumed and because the choke's winding capacitance shorts it out at tens of megahertz.
:::
:::

### Return currents and PCB layout

At low frequency a return current spreads out in a ground plane along the path of least *resistance*; above a few tens of kilohertz it follows the path of least *inductance*, which is directly beneath the signal trace, because that minimises the loop area. This single fact explains most PCB layout rules for EMC.

- Use a continuous ground plane under all fast signals, and never route a fast trace across a slot or split in it: the return current must detour around the gap, creating a large loop that radiates (by [[#eq-dm]]) and a voltage across the gap that drives common-mode currents onto cables.
- Keep the loops of fast-switching currents small: in a buck converter, the input capacitor, switch and diode (or synchronous switch) must form a tight loop; decoupling capacitors go right at the IC's power pins with vias to the plane.
- A decoupling capacitor is an LC series circuit (its equivalent series inductance of about $0.5$–$1\,\mathrm{nH}$ plus the vias) and is inductive above its self-resonance; several values in parallel, or the plane capacitance of closely spaced power and ground planes, cover the higher frequencies.
- Group circuits by function and speed, with the fastest away from the connectors; bring all cables out along one edge, so that no high-frequency voltage exists between the cable grounds; filter or bond each cable at its entry.

::: warning Splitting the ground plane
A common folklore remedy, cutting the ground plane into "analog" and "digital" halves joined at one point, usually makes EMC worse: any trace that crosses the split loses its return path, and the two halves form a slot antenna driven by the voltage between them. A single unbroken plane with careful *placement* (so that digital return currents do not flow under analog circuits) is the better solution for almost all mixed-signal boards; mixed-signal converters' data sheets that say "AGND and DGND" mean the pins, which are connected to the same plane at the converter.
:::

## Immunity {#sec-immunity}

Emissions limits protect radio services; immunity tests check that equipment survives what it will meet. The basic test methods are in the IEC 61000-4 series, with levels set by product or generic standards (IEC 61000-6-1 for residential and light-industrial environments, 61000-6-2 for industrial ones).

| test | standard | what it simulates | typical residential level |
|---|---|---|---|
| electrostatic discharge | IEC 61000-4-2 | a charged person touching the equipment | $\pm4\,\mathrm{kV}$ contact, $\pm8\,\mathrm{kV}$ air |
| radiated RF field | IEC 61000-4-3 | radio transmitters, phones | $3\,\mathrm{V/m}$, $80\,\mathrm{MHz}$–$6\,\mathrm{GHz}$, 80 % AM at $1\,\mathrm{kHz}$ |
| electrical fast transients | IEC 61000-4-4 | bursts from switched inductive loads | $\pm1\,\mathrm{kV}$ on mains, $\pm0.5\,\mathrm{kV}$ on signal lines |
| surge | IEC 61000-4-5 | lightning-induced and switching surges | $\pm1\,\mathrm{kV}$ line–line, $\pm2\,\mathrm{kV}$ line–earth, $1.2/50\,\mathrm{\mu s}$ |
| conducted RF | IEC 61000-4-6 | RF currents induced on cables | $3\,\mathrm{V}$, $150\,\mathrm{kHz}$–$80\,\mathrm{MHz}$ |
| voltage dips and interruptions | IEC 61000-4-11 | mains disturbances | dips to $0$–$70\,\%$ for $0.5$–$25$ cycles |

Results are judged against **performance criteria**: (A) normal operation within specification during the test; (B) temporary degradation with self-recovery; (C) loss of function that requires operator intervention, without damage. A product standard assigns a criterion to each test.

The circuit-level defences mirror the emission ones: limit the bandwidth of every input to what it needs (an RC filter in front of an in-amp, [[instrumentation/instrumentation-amplifiers]]); divert transient currents to the chassis at the connector, with transient-voltage-suppression diodes and short, wide connections, before they reach the circuit; use differential and isolated interfaces; and design software to detect and recover from upsets (watchdogs, checks on corrupted data).

::: example An ESD current {#ex-esd}
The IEC 61000-4-2 contact-discharge current has a first peak of $3.75\,\mathrm{A}$ per kilovolt with a rise time of about $0.8\,\mathrm{ns}$. At $4\,\mathrm{kV}$, estimate the voltage induced in a $2\,\mathrm{cm}\times1\,\mathrm{cm}$ signal loop whose centre is $5\,\mathrm{cm}$ from the discharge path, treating the path as a long straight wire and the field as uniform over the loop.
::: solution
The peak current is $4\times3.75 = 15\,\mathrm{A}$, with $\dd i/\dd t \approx 15/0.8\times10^{-9} = 1.9\times10^{10}\,\mathrm{A/s}$. The field at $5\,\mathrm{cm}$ is $B = \mu_0i/(2\pi r)$, so $\dd B/\dd t = \mu_0(\dd i/\dd t)/(2\pi r) = 2\times10^{-7}\times1.9\times10^{10}/0.05 = 7.5\times10^4\,\mathrm{T/s}$. By Faraday's law the EMF is $A\,\dd B/\dd t = 2\times10^{-4}\times7.5\times10^4 = 15\,\mathrm{V}$ for about a nanosecond — ample to flip a logic input or a reset line. Reducing the loop area and keeping sensitive traces away from the connectors where discharges land are the cures; the ESD current must be steered to chassis at the point of entry.
:::
:::

## Standards and compliance {#sec-standards}

Emission limits are set by international (CISPR, part of the IEC) and national bodies. As of 2026 the main ones for electronic products are:

- **CISPR 32** (EN 55032 in Europe) for multimedia and information-technology equipment, with **CISPR 35** for its immunity; **CISPR 11** for industrial, scientific and medical equipment; **CISPR 14-1** for household appliances; **CISPR 25** for components in vehicles.
- In the USA, **FCC Part 15** for unintentional radiators (digital devices), with Class A (commercial and industrial) and the stricter Class B (residential).
- In the European Union, the **EMC Directive 2014/30/EU** requires equipment to meet its essential requirements, normally by applying harmonised standards (the EN versions of the CISPR and IEC 61000 standards), and the manufacturer then affixes the CE mark.

| emission (Class B) | frequency | limit |
|---|---|---|
| conducted, mains (CISPR 32) | $0.15$–$0.5\,\mathrm{MHz}$ | $66$ to $56\,\mathrm{dB\mu V}$ quasi-peak (falling with $\log f$), $56$ to $46$ average |
| | $0.5$–$5\,\mathrm{MHz}$ | $56\,\mathrm{dB\mu V}$ quasi-peak, $46$ average |
| | $5$–$30\,\mathrm{MHz}$ | $60\,\mathrm{dB\mu V}$ quasi-peak, $50$ average |
| radiated at $10\,\mathrm{m}$ (CISPR 32) | $30$–$230\,\mathrm{MHz}$ | $30\,\mathrm{dB\mu V/m}$ quasi-peak |
| | $230$–$1000\,\mathrm{MHz}$ | $37\,\mathrm{dB\mu V/m}$ quasi-peak |
| radiated at $3\,\mathrm{m}$ (FCC Part 15) | $30$–$88$, $88$–$216$, $216$–$960$, $>960\,\mathrm{MHz}$ | $40.0$, $43.5$, $46.0$, $54.0\,\mathrm{dB\mu V/m}$ |

Measurements use an EMI receiver (or a spectrum analyser meeting CISPR 16) with standard bandwidths — $9\,\mathrm{kHz}$ from $150\,\mathrm{kHz}$ to $30\,\mathrm{MHz}$, $120\,\mathrm{kHz}$ from $30$ to $1000\,\mathrm{MHz}$ — and **peak**, **quasi-peak** and **average** detectors. The quasi-peak detector, with defined charge and discharge time constants, weights impulsive interference by its repetition rate, approximating how annoying it is to an AM or analog TV listener; a peak scan is fast and always reads at least as high, so it is used for pre-scans, with quasi-peak measurements made only where the peak exceeds the limit. Radiated tests are made on open-area test sites or in semi-anechoic chambers, with the antenna height scanned from $1$ to $4\,\mathrm{m}$ and the product rotated to find the maximum.

::: application Pre-compliance and design for EMC
Full compliance testing in an accredited laboratory costs days of chamber time, and a failure means a redesign. Most teams therefore do **pre-compliance** work: near-field magnetic and electric probes on a spectrum analyser to find the hot spots on a board, a current clamp around each cable to measure $I_{CM}$ (from which [[#eq-cm]] estimates the field), and a LISN on the bench for conducted emissions. A current-clamp reading of $10\,\mathrm{dB\mu A}$ ($3.2\,\mathrm{\mu A}$) at $100\,\mathrm{MHz}$ on a $1\,\mathrm{m}$ cable is already close to the Class B limit, which gives a concrete design target long before the chamber.
:::

## Where this leads

The antenna formulas behind [[#thm-radiation]] are developed in [[rf-microwave/antennas]], and the coupling of fields to transmission lines (cables) in [[electromagnetics/transmission-lines]]. The switching converters that dominate conducted emissions, and their input filters, are designed in [[power-electronics/dc-dc-converters]] and [[power-electronics/magnetics-thermal-design]]. Signal-integrity concerns on fast digital boards — reflections, crosstalk, power-distribution networks — overlap strongly with EMC and are treated in [[digital-ic/interconnect]]. For the whole subject, Ott's *Electromagnetic Compatibility Engineering* and Paul's *Introduction to Electromagnetic Compatibility* are the standard references.

::: history
Radio interference was a regulatory problem almost as soon as there was radio: the International Special Committee on Radio Interference (CISPR) was founded in 1934 to agree methods of measuring it, and its quasi-peak detector was defined to match the annoyance of interference to AM broadcast listeners. Military EMC standards, such as the US MIL-STD-461 first issued in 1967, came from the problems of packing radios, radars and electronics into aircraft and ships. The rise of personal computers led the US Federal Communications Commission to adopt emission limits for digital devices in 1979, and the European EMC Directive, first issued in 1989 and in force from 1996, made immunity as well as emissions a legal requirement. The IEC 61000 series, which codified the immunity tests, was published from the 1990s.
:::

::: summary
- EMC has two sides, emissions and immunity, each conducted or radiated; every problem has a source, a coupling path and a victim, and breaking any one solves it.
- The spectrum of a trapezoidal clock is flat to $1/(\pi\tau)$, falls at $20\,\mathrm{dB/decade}$ to $1/(\pi t_r)$ and at $40\,\mathrm{dB/decade}$ beyond: rise time controls high-frequency emissions.
- Differential-mode radiation from a loop is $1.316\times10^{-14}f^2AI_{DM}/r$; common-mode radiation from a cable is $1.257\times10^{-6}fLI_{CM}/r$; microamperes of common-mode current on cables usually dominate.
- Solid conducting shields have large absorption ($8.686\,t/\delta$ dB) and reflection losses except for low-frequency magnetic fields; apertures with SE $\approx 20\log_{10}(\lambda/2l)$ and unfiltered cables set real shielding.
- Mains filters use X capacitors and DM inductance for differential noise, Y capacitors and common-mode chokes for common-mode noise; Y capacitance is limited by leakage-current safety limits.
- High-frequency return currents flow under the signal trace: keep planes unbroken, loops small, decoupling close, cables on one edge and filtered or bonded at entry.
- Immunity tests (IEC 61000-4-x: ESD, radiated RF, EFT, surge, conducted RF, dips) and emission standards (CISPR 32, FCC Part 15, EU EMC Directive) define the legal targets.
:::

## Exercises

::: exercise Decibel units {level=1 check="20*log10(200)"}
Express a field strength of $200\,\mathrm{\mu V/m}$ in $\mathrm{dB\mu V/m}$.
::: solution
$20\log_{10}200 = 46.0\,\mathrm{dB\mu V/m}$ — the FCC Class B limit for $216$–$960\,\mathrm{MHz}$ at $3\,\mathrm{m}$.
:::
:::

::: exercise Spectral corners {level=1 check="1/(pi*2e-9)"}
A $3.3\,\mathrm{V}$ clock has $2\,\mathrm{ns}$ rise and fall times. At what frequency, in hertz, does its harmonic envelope begin to fall at $40\,\mathrm{dB}$ per decade?
::: solution
$f_2 = 1/(\pi t_r) = 1/(\pi\times2\times10^{-9}) = 159\,\mathrm{MHz}$.
:::
:::

::: exercise Skin depth {level=1 check="1/sqrt(pi*1e6*4e-7*pi*3.5e7)"}
Find the skin depth, in metres, of aluminium ($\sigma = 3.5\times10^7\,\mathrm{S/m}$, $\mu_r = 1$) at $1\,\mathrm{MHz}$.
::: solution
$\delta = 1/\sqrt{\pi\times10^6\times4\pi\times10^{-7}\times3.5\times10^7} = 85\,\mathrm{\mu m}$.
:::
:::

::: exercise Common-mode current limit {level=2 check="10^(43.5/20)*1e-6*3/(1.257e-6*150e6*1.5)"}
A $1.5\,\mathrm{m}$ cable must not produce more than $43.5\,\mathrm{dB\mu V/m}$ at $3\,\mathrm{m}$ at $150\,\mathrm{MHz}$. Using [[#eq-cm]], find the maximum common-mode current in amperes.
::: solution
$43.5\,\mathrm{dB\mu V/m} = 150\,\mathrm{\mu V/m}$. $I_{CM} = Er/(1.257\times10^{-6}fL) = 1.5\times10^{-4}\times3/(1.257\times10^{-6}\times1.5\times10^8\times1.5) = 1.59\,\mathrm{\mu A}$.
:::
:::

::: exercise Differential-mode loop {level=2}
A $200\,\mathrm{MHz}$ harmonic of $5\,\mathrm{mA}$ flows around a loop of $4\,\mathrm{cm^2}$. Find the field at $3\,\mathrm{m}$ in $\mathrm{dB\mu V/m}$. By how much must the loop area be reduced to meet $43.5\,\mathrm{dB\mu V/m}$ with $6\,\mathrm{dB}$ of margin?
::: solution
$E = 1.316\times10^{-14}\times(2\times10^8)^2\times4\times10^{-4}\times5\times10^{-3}/3 = 3.51\times10^{-4}\,\mathrm{V/m} = 50.9\,\mathrm{dB\mu V/m}$. The target is $37.5\,\mathrm{dB\mu V/m}$, $13.4\,\mathrm{dB}$ lower, so the area must be divided by $10^{13.4/20} = 4.7$, to about $0.85\,\mathrm{cm^2}$ — achievable by routing the trace directly over its return plane.
:::
:::

::: exercise Aperture {level=2 check="20*log10(3e8/2.4e9/(2*0.02))"}
A ventilation slot $2\,\mathrm{cm}$ long is cut in an enclosure. Estimate its shielding effectiveness, in dB, at $2.4\,\mathrm{GHz}$.
::: solution
$\lambda = 12.5\,\mathrm{cm}$; $\mathrm{SE} \approx 20\log_{10}(12.5/4) = 9.9\,\mathrm{dB}$. Wi-Fi frequencies pass a $2\,\mathrm{cm}$ slot almost freely; a grid of $5\,\mathrm{mm}$ holes would do about $12\,\mathrm{dB}$ better.
:::
:::

::: exercise A ground plane as a shield {level=2 check="8.686*35e-6*sqrt(pi*100e6*4e-7*pi*5.8e7)"}
Find the absorption loss, in dB, of a $35\,\mathrm{\mu m}$ copper ground plane at $100\,\mathrm{MHz}$.
::: solution
$\delta = 6.6\,\mathrm{\mu m}$, so $A = 8.686\times35/6.6 = 46\,\mathrm{dB}$. A PCB plane is a reasonable shield against fields from the far side — which is why components on one side of a four-layer board couple much less to traces on the other.
:::
:::

::: exercise Common-mode choke impedance {level=2 check="2*pi*1e6*10e-3"}
What impedance, in ohms, does an ideal $10\,\mathrm{mH}$ common-mode choke present to common-mode current at $1\,\mathrm{MHz}$, and what to the differential-mode $50\,\mathrm{Hz}$ load current?
::: solution
$2\pi\times10^6\times10^{-2} = 62.8\,\mathrm{k\Omega}$ to common mode. To differential mode the fluxes of the two windings cancel and the impedance is only that of the leakage inductance and winding resistance — ideally zero. (In reality winding capacitance makes the choke capacitive above a few megahertz, which is why ferrite beads or a second, smaller choke are added for higher frequencies.)
:::
:::

::: exercise Rise time and emissions {level=3}
A $25\,\mathrm{MHz}$ clock ($50\,\%$ duty) drives a $20\,\mathrm{cm}$ trace on a board. (a) Using [[#eq-trapezoid]], compare the envelope at $500\,\mathrm{MHz}$ for rise times of $0.5\,\mathrm{ns}$ and $4\,\mathrm{ns}$. (b) The receiving logic needs edges faster than $5\,\mathrm{ns}$. Propose how to obtain $4\,\mathrm{ns}$ edges from a driver with $0.5\,\mathrm{ns}$ edges, and give the component value if the trace and load present $15\,\mathrm{pF}$. (c) What other benefit does the change bring?
::: solution
(a) $\tau = 20\,\mathrm{ns}$, $f_1 = 15.9\,\mathrm{MHz}$. For $t_r = 0.5\,\mathrm{ns}$, $f_2 = 637\,\mathrm{MHz}$, so $500\,\mathrm{MHz}$ is below $f_2$ and the envelope is $2A\tau/T\times f_1/f$. For $t_r = 4\,\mathrm{ns}$, $f_2 = 79.6\,\mathrm{MHz}$, and at $500\,\mathrm{MHz}$ the envelope has an extra factor $f_2/f = 0.159$, i.e. $16\,\mathrm{dB}$ lower. (b) Add a series resistor at the driver: with $15\,\mathrm{pF}$, a $10$–$90\,\%$ rise of $2.2RC = 4\,\mathrm{ns}$ needs $R = 4/(2.2\times15) = 121\,\Omega$; a $120\,\Omega$ resistor (or a ferrite bead, or a slower logic family). (c) The series resistor also source-terminates the trace, reducing ringing and reflections, and reduces the peak current drawn from the supply, and therefore the noise on the power and ground planes.
:::
:::

::: exercise Diagnosing a failure {level=3}
A data logger fails radiated emissions by $10\,\mathrm{dB}$ at $48$, $96$ and $144\,\mathrm{MHz}$ only when its $2\,\mathrm{m}$ sensor cable is connected. With the cable disconnected it passes. A current clamp on the cable reads $18\,\mathrm{dB\mu A}$ at $96\,\mathrm{MHz}$. (a) Is this DM or CM radiation, and what is the likely source? (b) Check that the clamp reading is consistent with the failure using [[#eq-cm]] (take the FCC limit of $43.5\,\mathrm{dB\mu V/m}$ at $3\,\mathrm{m}$). (c) Propose three fixes in order of cost.
::: solution
(a) Emissions that depend on the cable are common-mode: the harmonics of a $48\,\mathrm{MHz}$ clock (a USB or processor clock) drive a voltage between the board's ground at the cable connector and the rest of the system — for example across the inductance of a ground return path — which pushes CM current onto the cable. (b) $18\,\mathrm{dB\mu A} = 7.9\,\mathrm{\mu A}$; with $L = 2\,\mathrm{m}$, $E = 1.257\times10^{-6}\times9.6\times10^7\times2\times7.9\times10^{-6}/3 = 6.4\times10^{-4}\,\mathrm{V/m} = 56\,\mathrm{dB\mu V/m}$ by the small-antenna formula, which overestimates for a cable longer than $\lambda/2$ ($1.56\,\mathrm{m}$); a measured excess of $10\,\mathrm{dB}$ ($53.5\,\mathrm{dB\mu V/m}$) is consistent. (c) In order of cost: a clamp-on ferrite on the cable at the logger ($5$–$10\,\mathrm{dB}$); filter the cable's signal lines at the connector with RC or ferrite-bead filters to the chassis, and bond the cable shield $360^\circ$ to the enclosure; and, at the next board revision, move the connector near the board's ground reference point, keep the $48\,\mathrm{MHz}$ circuitry away from it, and make sure no clock trace crosses a split plane.
:::
:::
