A thermocouple is welded to the frame of a large motor to measure its temperature. Its EMF is a few millivolts. But the motor frame is bonded to the building's protective earth, the data logger thirty metres away is bonded to a different point of it, and between the two flows a fraction of an ampere of leakage and return current from the motor drive. The two "grounds" therefore differ by a few hundred millivolts at $50\,\mathrm{Hz}$ and its harmonics, plus spikes at every switching edge of the drive. Connect the thermocouple between an amplifier input and the logger's ground and the reading is mostly ground noise. Measure the *difference* between the two thermocouple wires, with an amplifier that ignores the voltage they share, and the millivolts come through.

This chapter is about getting a small signal from where it is generated to where it is digitised without picking up anything on the way. The tool is the **instrumentation amplifier** (in-amp, INA): a differential amplifier with high, balanced input impedance, a gain set by one resistor, and a very high common-mode rejection ratio. We derive the classic difference amplifier and show why resistor matching limits it; then the three-op-amp instrumentation amplifier, its gain, its CMRR and its input-referred errors; and the system effects — source impedance imbalance, bias current return paths, RF rectification — that undo a good amplifier. Then we turn to the interference itself: ground loops and common-impedance coupling, capacitive and inductive coupling, and the cures — grounding schemes, shielding, twisting, guarding and galvanic isolation. The differential pair and the definitions of differential and common-mode signals and CMRR are those of [[electronics-1/differential-amplifiers]]; the op-amp circuits are those of [[circuits-1/operational-amplifiers]].

## The difference amplifier {#sec-diffamp}

Recall ([[electronics-1/differential-amplifiers#def-dm-cm]]) that two input voltages $v_1, v_2$ decompose into a differential part $v_d = v_1 - v_2$ and a common-mode part $v_{cm} = \tfrac12(v_1 + v_2)$, and that an amplifier's response $v_o = A_dv_d + A_{cm}v_{cm}$ defines its common-mode rejection ratio $\mathrm{CMRR} = \lvert A_d/A_{cm}\rvert$. For instrumentation we usually quote the CMRR in decibels and also use its effect referred to the input: a CMRR of $100\,\mathrm{dB}$ makes $1\,\mathrm{V}$ of common mode look like $10\,\mathrm{\mu V}$ of differential signal.

The simplest differential amplifier is one op-amp and four resistors. Input $v_1$ drives the non-inverting input through a divider $R_3$ (in series) and $R_4$ (to ground); input $v_2$ drives the inverting input through $R_1$, with feedback resistor $R_2$ from the output.

::: theorem Difference amplifier {#thm-diffamp}
With an ideal op-amp, the output of the difference amplifier is

$$
v_o = \frac{R_4}{R_3 + R_4}\left(1 + \frac{R_2}{R_1}\right)v_1 - \frac{R_2}{R_1}v_2 .
$$ {#eq-diffamp}

If $R_4/R_3 = R_2/R_1 = G$, then $v_o = G(v_1 - v_2)$ and $A_{cm} = 0$. If instead $R_4/R_3 = G(1 + \delta)$ with a small ratio mismatch $\delta$, then $A_d \approx G$, $A_{cm} \approx G\delta/(1 + G)$ and

$$
\mathrm{CMRR} \approx \frac{1 + G}{\lvert\delta\rvert}.
$$ {#eq-cmrr-mismatch}

With four resistors each of tolerance $\pm\varepsilon$, the worst case is $\lvert\delta\rvert \approx 4\varepsilon$ and $\mathrm{CMRR}_{\min} \approx (1 + G)/(4\varepsilon)$.
:::

::: proof
The non-inverting input sits at $v_+ = v_1R_4/(R_3 + R_4)$, and the virtual short makes $v_- = v_+$. The non-inverting amplifier formula for the path from $v_+$ and the inverting formula for $v_2$ superpose ([[circuits-1/operational-amplifiers]]): $v_o = (1 + R_2/R_1)v_+ - (R_2/R_1)v_2$, which is [[#eq-diffamp]]. With $R_4/R_3 = G$, $R_4/(R_3 + R_4) = G/(1 + G)$ and $v_o = Gv_1 - Gv_2$. With $R_4/R_3 = G(1 + \delta)$, put $v_1 = v_2 = v_{cm}$:

$$
A_{cm} = \frac{G(1 + \delta)(1 + G)}{1 + G(1 + \delta)} - G = \frac{G\delta}{1 + G + G\delta} \approx \frac{G\delta}{1 + G},
$$

and $A_d \approx G$ to first order in $\delta$. Their ratio is [[#eq-cmrr-mismatch]]. In the worst case $R_4$ and $R_1$ are high by $\varepsilon$ and $R_3$ and $R_2$ low, so $R_4R_1/(R_3R_2) \approx 1 + 4\varepsilon$.
:::

Two consequences shape all instrumentation amplifier design. First, the CMRR of a resistor-ratio circuit is set by **matching**, not by the op-amp: $0.1\,\%$ resistors at unity gain give only $(1 + 1)/(4\times0.001) = 500$, or $54\,\mathrm{dB}$; laser-trimmed thin-film networks matched to $0.01\,\%$ or better are needed for $80$–$100\,\mathrm{dB}$. Second, CMRR improves with gain, as $1 + G$: the differential signal is amplified, the common-mode error is not. Third — a defect — the input resistances are low and unequal: $v_2$ sees $R_1$ and $v_1$ sees $R_3 + R_4$, so any source resistance adds to them and upsets the ratio match.

::: widget plot
f: 20*log10((1 + G)/(4*x/100)); 20*log10((1 + G)/(x/100))
x: 0.001, 1
y: 20, 140
sliders: G=1:1:1000:1
labels: \text{worst case, } \lvert\delta\rvert = 4\varepsilon; \text{typical, } \lvert\delta\rvert \approx \varepsilon
caption: CMRR in dB of a resistor-ratio difference amplifier against the resistor tolerance $\varepsilon$ in per cent, for gain $G$ (slider). One per cent resistors at unity gain give a worst case of about $34\,\mathrm{dB}$ — useless for instrumentation. Each factor of ten in matching buys $20\,\mathrm{dB}$; so does each factor of ten in gain, which is why an instrumentation amplifier puts its gain in front of the difference stage.
:::

## The three-op-amp instrumentation amplifier {#sec-inamp}

The difference amplifier's weaknesses — low, unequal input impedance and CMRR limited at low gain — are cured by putting two non-inverting amplifiers in front of it. Op-amps $A_1$ and $A_2$ receive $v_1$ and $v_2$ at their non-inverting inputs. Each has a feedback resistor $R$ from its output to its inverting input, and a single gain resistor $R_G$ connects the two inverting inputs. Their outputs $v_{o1}$ and $v_{o2}$ drive a difference amplifier $A_3$ of gain $G_2$ (often $1$).

::: theorem Three-op-amp instrumentation amplifier {#thm-inamp}
With ideal op-amps, the first stage gives

$$
v_{o1} - v_{o2} = \left(1 + \frac{2R}{R_G}\right)(v_1 - v_2), \qquad \frac{v_{o1} + v_{o2}}{2} = \frac{v_1 + v_2}{2},
$$ {#eq-inamp-stage1}

so its differential gain is $G_1 = 1 + 2R/R_G$ and its common-mode gain is exactly $1$, whatever the resistor values. The overall output is $v_o = G_1G_2(v_1 - v_2)$, and if the difference stage has rejection $\mathrm{CMRR}_2$, the amplifier's CMRR is

$$
\mathrm{CMRR} \approx G_1\cdot\mathrm{CMRR}_2 .
$$ {#eq-inamp-cmrr}

The input impedances are those of op-amp non-inverting inputs: very high and nearly equal.
:::

::: proof
By the virtual short, the inverting inputs of $A_1$ and $A_2$ are at $v_1$ and $v_2$, so a current $i = (v_1 - v_2)/R_G$ flows through $R_G$. No current enters the op-amp inputs, so the same $i$ flows through both feedback resistors, out of $A_1$'s output and into $A_2$'s. Hence $v_{o1} = v_1 + iR$ and $v_{o2} = v_2 - iR$. Subtracting gives $v_{o1} - v_{o2} = (v_1 - v_2)(1 + 2R/R_G)$; adding gives $v_{o1} + v_{o2} = v_1 + v_2$. Mismatch between the two resistors $R$ changes $G_1$ slightly but not the common-mode result, because a common-mode input makes $i = 0$, so neither $R$ carries current. The difference stage then sees a differential input $G_1v_d$ and a common-mode input $v_{cm}$; with its own gains $G_2$ and $A_{cm2} = G_2/\mathrm{CMRR}_2$, the output is $G_1G_2v_d + (G_2/\mathrm{CMRR}_2)v_{cm}$, and the ratio of the gains is [[#eq-inamp-cmrr]].
:::

The single resistor $R_G$ sets the gain, and integrated in-amps contain everything else, laser-trimmed. A common form is $G = 1 + 49.4\,\mathrm{k\Omega}/R_G$, so $G = 100$ needs $R_G = 499\,\Omega$ (an E96 value). Because the first stage carries the gain and passes the common mode at unity, the CMRR of an integrated in-amp rises with gain: typical DC figures are $90\,\mathrm{dB}$ at $G = 1$, $110\,\mathrm{dB}$ at $G = 10$ and $130\,\mathrm{dB}$ at $G = 100$–$1000$, until the op-amps' own common-mode rejection and the stray capacitances set a ceiling.

### Errors referred to the input

An in-amp's offsets and noise are specified **referred to the input** (RTI) as two terms: an input-stage term and an output-stage term divided by the gain,

$$
V_{OS,\text{RTI}} = V_{OSI} + \frac{V_{OSO}}{G}, \qquad e_{n,\text{RTI}} = \sqrt{e_{ni}^2 + \left(\frac{e_{no}}{G}\right)^2},
$$ {#eq-rti}

with noises (uncorrelated) added in quadrature. For example, $V_{OSI} = 50\,\mathrm{\mu V}$ and $V_{OSO} = 500\,\mathrm{\mu V}$ give $55\,\mathrm{\mu V}$ RTI at $G = 100$ but $550\,\mathrm{\mu V}$ at $G = 1$. High gain in the first stage is therefore good for offset, noise and CMRR alike; the limit is the output swing, since the first stage must not saturate on the amplified differential signal *plus* the common-mode voltage.

::: example An in-amp for a bridge {#ex-inamp-bridge}
A $350\,\Omega$ strain-gauge bridge excited at $10\,\mathrm{V}$ produces up to $\pm20\,\mathrm{mV}$ on a common-mode voltage of $5\,\mathrm{V}$. An in-amp with $G = 1 + 49.4\,\mathrm{k\Omega}/R_G$, CMRR $= 110\,\mathrm{dB}$ at the chosen gain, $V_{OSI} = 25\,\mathrm{\mu V}$ and $V_{OSO} = 250\,\mathrm{\mu V}$ drives a $\pm10\,\mathrm{V}$ ADC. Choose $R_G$, and find the input-referred errors due to the common mode and the offset.
::: solution
Fill about $80\,\%$ of the range: $G = 8\,\mathrm{V}/20\,\mathrm{mV} = 400$, so $R_G = 49.4\,\mathrm{k}/399 = 123.8\,\Omega$; with the E96 value $124\,\Omega$, $G = 399.4$. The common-mode error referred to the input is $v_{cm}/\mathrm{CMRR} = 5\,\mathrm{V}/10^{5.5} = 5/316\,228 = 15.8\,\mathrm{\mu V}$, a constant offset as long as the excitation is constant ($0.08\,\%$ of full scale). The offset is $25 + 250/399 = 25.6\,\mathrm{\mu V}$ RTI. Both are constant and removed by a zero calibration at no load; what remains is their *drift* with temperature, typically $0.1$–$1\,\mathrm{\mu V/K}$ RTI. Finally, check the first stage: $v_{o1,2} = v_{cm} \pm G_1v_d/2$; with the whole gain in the first stage that is $5 \pm 4\,\mathrm{V}$, which a $\pm15\,\mathrm{V}$ supply handles, but on a single $5\,\mathrm{V}$ supply it would not. Integrated in-amps specify an allowed input common-mode range that shrinks as the output swings, and it must be checked.
:::
:::

### What the amplifier cannot fix

A CMRR measured at the in-amp's pins assumes perfectly balanced sources. Real sources are not.

::: proposition CMRR degradation by source imbalance {#prop-imbalance}
Let each input of a perfect differential amplifier have a common-mode impedance $Z_{cm}$ to ground (input capacitance, protection components, cable capacitance), and let the two source resistances differ by $\Delta R_s$, with $R_s \ll \lvert Z_{cm}\rvert$. A common-mode voltage $v_{cm}$ then produces a differential input

$$
v_d \approx v_{cm}\,\frac{\Delta R_s}{Z_{cm}}, \qquad \lvert v_d\rvert \approx \omega C_{cm}\,\Delta R_s\,\lvert v_{cm}\rvert \quad\text{for } Z_{cm} = \frac{1}{j\omega C_{cm}},
$$ {#eq-imbalance}

so the system CMRR cannot exceed $1/(\omega C_{cm}\Delta R_s)$.
:::

::: proof
Each input forms a divider of the common-mode source through $R_{si}$ and $Z_{cm}$: $v_i = v_{cm}Z_{cm}/(Z_{cm} + R_{si}) \approx v_{cm}(1 - R_{si}/Z_{cm})$ for $R_{si} \ll \lvert Z_{cm}\rvert$. The difference is $v_1 - v_2 \approx v_{cm}(R_{s2} - R_{s1})/Z_{cm}$, giving [[#eq-imbalance]].
:::

::: example ECG electrodes {#ex-ecg}
Two ECG electrodes have skin–electrode resistances differing by $\Delta R_s = 10\,\mathrm{k\Omega}$. The input capacitance to ground of each amplifier input, including the cable, is $C_{cm} = 10\,\mathrm{pF}$, and the body carries $1\,\mathrm{V}$ of $50\,\mathrm{Hz}$ common-mode voltage. Find the resulting differential error and the effective CMRR. How large must $Z_{cm}$ be for $0.1\,\%$ of a $1\,\mathrm{mV}$ ECG?
::: solution
At $50\,\mathrm{Hz}$, $\lvert Z_{cm}\rvert = 1/(2\pi\times50\times10^{-11}) = 318\,\mathrm{M\Omega}$, and by [[#eq-imbalance]] $\lvert v_d\rvert = 1\,\mathrm{V}\times10^4/3.18\times10^8 = 31.4\,\mathrm{\mu V}$: an effective CMRR of $90\,\mathrm{dB}$, whatever the amplifier's own CMRR. For $1\,\mathrm{\mu V}$ of error, $\lvert Z_{cm}\rvert \ge 10^4/10^{-6} = 10^{10}\,\Omega$, i.e. $C_{cm} \le 0.32\,\mathrm{pF}$ — impractical. ECG amplifiers attack the common-mode voltage instead: a **right-leg drive** amplifier senses $v_{cm}$ and drives the body through a third electrode to cancel it, reducing $v_{cm}$ by the loop gain, typically $30$–$40\,\mathrm{dB}$; and **guarded** (driven) cable shields, at the common-mode potential, eliminate the cable's share of $C_{cm}$.
:::
:::

::: warning Every input needs a DC path to ground
An op-amp input draws a bias current, nanoamperes to picoamperes. If the source is floating — a thermocouple insulated from everything, a transformer secondary, an AC-coupled input with no resistor to ground — the bias currents charge the stray capacitances and the inputs drift until the amplifier saturates, often over seconds or minutes, which makes the fault mysterious. Provide a return path: tie one input to ground through a resistor (say $10\,\mathrm{k\Omega}$–$1\,\mathrm{M\Omega}$) or both inputs through equal large resistors, which keeps the source balanced. A thermocouple that is welded to grounded metal already has a path — and then the problem is the ground loop.
:::

::: application RF rectification and input filters
Instrumentation amplifiers have bandwidths of only tens to hundreds of kilohertz, but their input transistors respond to radio-frequency interference at hundreds of megahertz, rectify it in their non-linear junctions, and produce a DC offset that looks exactly like a signal. A mobile phone transmitting next to a strain-gauge cable can shift the reading by microvolts. The standard cure is an RC filter at the inputs: a series resistor $R$ in each lead, a capacitor $C_c$ from each input to ground (common-mode filter) and a capacitor $C_d \ge 10C_c$ across the inputs (differential filter). The large $C_d$ makes the differential bandwidth $1/(2\pi R(2C_d + C_c))$ and swamps the mismatch of the two $C_c$, which would otherwise convert common-mode RF into differential mode by [[#eq-imbalance]]. With $R = 4.02\,\mathrm{k\Omega}$, $C_c = 1\,\mathrm{nF}$ and $C_d = 10\,\mathrm{nF}$, the differential corner is $1.9\,\mathrm{kHz}$ and the common-mode corner $40\,\mathrm{kHz}$.
:::

::: quiz
An in-amp with a data-sheet CMRR of $120\,\mathrm{dB}$ at $50\,\mathrm{Hz}$ is connected to a thermocouple through leads whose resistances differ by $50\,\Omega$; each input has $100\,\mathrm{pF}$ of cable capacitance to the shield, which is grounded. What limits the system CMRR at $50\,\mathrm{Hz}$?
- [ ] The amplifier: $120\,\mathrm{dB}$
- [x] Both: the source imbalance alone limits it to about $116\,\mathrm{dB}$
- [ ] The source imbalance: about $60\,\mathrm{dB}$
- [ ] Nothing: thermocouples have zero source resistance
::: solution
$\omega C_{cm}\Delta R_s = 2\pi\times50\times10^{-10}\times50 = 1.57\times10^{-6}$, so the imbalance alone limits the CMRR to $1/(1.57\times10^{-6}) = 6.4\times10^5$, i.e. $116\,\mathrm{dB}$. That is comparable with the amplifier's $120\,\mathrm{dB}$, and the two error terms ($1.57\times10^{-6}$ and $10^{-6}$ of $v_{cm}$) combine to between about $112$ and $116\,\mathrm{dB}$ depending on their relative phase. At $5\,\mathrm{kHz}$ (drive harmonics) the imbalance term is a hundred times worse, about $76\,\mathrm{dB}$.
:::
:::

## Grounds, ground loops and common-impedance coupling {#sec-ground}

"Ground" in a schematic is a node at zero volts. In hardware it is a conductor — a PCB plane, a chassis, a green-and-yellow earth wire — with resistance and inductance, carrying currents. Two points on it are at the same potential only if no current flows between them.

::: definition Common-impedance coupling and ground loops {#def-groundloop}
**Common-impedance coupling** occurs when two circuits share a conductor: the current of one develops a voltage across the shared impedance that appears in the other. A **ground loop** is a closed conducting path formed when a signal circuit is grounded at more than one point; the potential difference between the grounding points, and any magnetic flux through the loop, drive a current around it, and part of the resulting voltage appears in series with the signal.
:::

::: example A single-ended measurement over a ground loop {#ex-groundloop}
A sensor at a machine is connected to a data logger $5\,\mathrm{m}$ away; both are grounded locally, and the $5\,\mathrm{m}$ ground conductor between them ($1.5\,\mathrm{mm^2}$ copper) carries $2\,\mathrm{A}$ of return current from other equipment. Find the ground potential difference. What error results (a) with a single-ended input referred to the logger's ground and (b) with a differential input of CMRR $100\,\mathrm{dB}$?
::: solution
The conductor's resistance is $\rho l/A = 1.72\times10^{-8}\times5/1.5\times10^{-6} = 57\,\mathrm{m\Omega}$, so the ground difference is $2\times0.057 = 115\,\mathrm{mV}$ (more at high frequency, where the wire's inductance of about $1\,\mathrm{\mu H/m}$ dominates). (a) A single-ended input measures sensor output plus $115\,\mathrm{mV}$: for a $10\,\mathrm{mV}$ signal, a disaster. (b) A differential input sees the ground difference as common mode: $115\,\mathrm{mV}/10^5 = 1.15\,\mathrm{\mu V}$ referred to the input. The differential measurement has not removed the ground loop; it has made the amplifier ignore it.
:::
:::

The cures follow from the definition.

- **Measure differentially**: treat the ground difference as common mode and reject it, as above. This works as long as the common-mode voltage stays within the amplifier's input range and its frequency within the CMRR bandwidth.
- **Single-point grounding**: connect each subsystem's ground to one star point, so that no ground conductor carries another circuit's current. Good at low frequencies; at high frequencies the long star wires have too much inductance, and **multipoint grounding** to a low-impedance plane is used instead. Mixed-signal boards use one solid ground plane, with analog and digital parts placed so that their return currents do not cross.
- **Break the loop**: if the loop cannot be avoided, insert something that passes the signal but not the loop current — a differential receiver, a common-mode choke (high impedance to loop current, none to the signal pair), a transformer, an optocoupler or an isolation amplifier ([[#sec-isolation]]).

::: warning Never break the protective earth
The tempting fix for a hum loop — cutting the earth conductor of an instrument's mains lead or using a "cheater" plug — removes the protection against electric shock if an internal fault makes the case live. Ground loops are fixed in the signal path (differential inputs, isolation, a single shield connection), never by disconnecting safety earths.
:::

## Electric and magnetic coupling; shielding {#sec-coupling}

Interference reaches a circuit through electric fields (capacitive coupling), magnetic fields (inductive coupling) or, at high frequency, as radiated electromagnetic waves ([[instrumentation/electromagnetic-compatibility]]). The first two are near-field effects and have distinct cures.

### Capacitive coupling

A conductor at voltage $v_n$ (a mains lead, a switching node) and a victim conductor with impedance $R$ to ground are coupled by the mutual capacitance $C_{12}$; the victim has capacitance $C_2$ to ground.

::: proposition Capacitive coupling {#prop-capacitive}
The voltage induced on the victim is

$$
\mathbf{V}_c = \mathbf{V}_n\,\frac{j\omega RC_{12}}{1 + j\omega R(C_{12} + C_2)} \approx j\omega RC_{12}\mathbf{V}_n \quad\text{when } \omega R(C_{12} + C_2) \ll 1 .
$$ {#eq-capacitive}

It is proportional to frequency, to the victim impedance and to the mutual capacitance, and it behaves as a current source $j\omega C_{12}\mathbf{V}_n$ injected into the victim.
:::

::: proof
The victim node has three branches: $C_{12}$ to the source, $C_2$ to ground and $R$ to ground. KCL gives $j\omega C_{12}(\mathbf{V}_n - \mathbf{V}_c) = \mathbf{V}_c(1/R + j\omega C_2)$, so $\mathbf{V}_c = \mathbf{V}_nj\omega RC_{12}/(1 + j\omega R(C_{12} + C_2))$. For small $\omega R(C_{12} + C_2)$ the denominator is $1$.
:::

For a $230\,\mathrm{V}$, $50\,\mathrm{Hz}$ conductor coupled by $10\,\mathrm{pF}$ to a victim of $1\,\mathrm{M\Omega}$, $\lvert V_c\rvert = 2\pi\times50\times10^6\times10^{-11}\times230 = 0.72\,\mathrm{V}$: the reason high-impedance probes hum when touched. With a $10\,\mathrm{k\Omega}$ victim it is $7.2\,\mathrm{mV}$, still large compared with a thermocouple. The cures: lower the victim impedance, increase separation (lowers $C_{12}$), and above all **shield**: a grounded conductor surrounding the victim intercepts the field lines, so $C_{12}$ becomes the tiny capacitance through gaps and ends. An electric shield works only if it is connected to the reference of the victim circuit; a floating shield couples the interference straight through. Connecting it at one point is enough, because no current needs to flow in it.

### Inductive coupling

A current $i_n$ in a nearby conductor produces a magnetic flux through the loop formed by the victim circuit and its return path, inducing an EMF in series with the signal.

::: theorem Magnetically induced voltage {#thm-inductive}
By Faraday's law, a loop of area $A$ in a uniform sinusoidal flux density of amplitude $B$ at angle $\theta$ to its normal has an induced EMF of amplitude

$$
V_m = \omega BA\cos\theta = \omega M I_n,
$$ {#eq-inductive}

where $M$ is the mutual inductance between the source circuit carrying $I_n$ and the victim loop. The EMF is in series with the loop and does not depend on the loop's impedance.
:::

::: proof
Faraday's law ([[electromagnetics/induction-inductance]]) gives $v = -\dd\Phi/\dd t$, and for $\Phi = BA\cos\theta\cos\omega t$ the amplitude of $-\dd\Phi/\dd t$ is $\omega BA\cos\theta$. Since $\Phi = Mi_n$ by definition of mutual inductance, $V_m = \omega MI_n$.
:::

The difference from capacitive coupling is the cure. A thin aluminium or copper shield, a perfect electric shield, does almost nothing against a $50\,\mathrm{Hz}$ magnetic field, because the skin depth in copper at $50\,\mathrm{Hz}$ is $9\,\mathrm{mm}$. What works is reducing the **loop area**: run signal and return conductors together and **twist** them. Each twist reverses the orientation of the small loop between the wires, so the EMFs of successive half-twists cancel; a twisted pair reduces magnetic pickup by $20$–$40\,\mathrm{dB}$ relative to parallel wires. At low frequencies, high-permeability (mu-metal) shields divert the flux. At high frequencies (above about $100\,\mathrm{kHz}$), a coaxial or overall shield grounded at both ends works magnetically too: the induced current in the shield creates an opposing flux, so the signal current returns on the shield rather than the ground plane, and the net loop area shrinks to the cable's own.

::: example Pickup from a power cable {#ex-magnetic}
A conductor carrying $10\,\mathrm{A}$ at $50\,\mathrm{Hz}$ runs $10\,\mathrm{cm}$ from a sensor circuit whose leads, $5\,\mathrm{mm}$ apart over $20\,\mathrm{cm}$, form a loop of $10\,\mathrm{cm^2}$, oriented for maximum pickup. Find the induced voltage. What does a twisted pair achieve, and what about the $5\,\mathrm{kHz}$ harmonic of a motor drive at $1\,\mathrm{A}$?
::: solution
The field of a long straight conductor is $B = \mu_0I/(2\pi r) = 4\pi\times10^{-7}\times10/(2\pi\times0.1) = 20\,\mathrm{\mu T}$. By [[#eq-inductive]], $V_m = 2\pi\times50\times2\times10^{-5}\times10^{-3} = 6.3\,\mathrm{\mu V}$ (amplitude), a significant error for a thermocouple ($0.15\,^\circ\mathrm{C}$). Twisting reduces it by $30\,\mathrm{dB}$ or so, to about $0.2\,\mathrm{\mu V}$. The drive harmonic gives $\omega BA$ with $\omega$ a hundred times and $B$ a tenth: $V_m = 63\,\mathrm{\mu V}$. Inductive pickup rises with frequency, which is why fast current edges in drives and converters are the worst magnetic offenders.
:::
:::

::: widget plot
f: 20*log10(2*pi*x*R*C*230/sqrt(1 + (2*pi*x*R*2*C)^2)); 20*log10(2*pi*x*M*I)
x: 10, 100000
y: -160, 60
sliders: R=10000:100:1000000:100; C=1e-11:1e-12:1e-10:1e-12; M=1e-8:1e-9:1e-7:1e-9; I=10:0.1:100:0.1
labels: \text{capacitive, } 230\,\mathrm{V}\text{ source}; \text{inductive}
caption: Interference voltage (dB relative to $1\,\mathrm{V}$) against frequency in hertz, for capacitive coupling from a $230\,\mathrm{V}$ conductor into a victim of impedance $R$ through $C_{12} = C$ (with $C_2 = C$), and for inductive coupling with mutual inductance $M$ (henries) from a current $I$ (amperes). Both rise at $20\,\mathrm{dB}$ per decade. Lower $R$ to see the capacitive pickup fall — a low-impedance circuit is immune to electric fields but not to magnetic ones, whose pickup does not depend on $R$ at all.
:::

::: quiz
A low-level sensor cable passes close to a transformer and picks up $50\,\mathrm{Hz}$ hum. Wrapping the cable in grounded aluminium foil makes no difference. What is the most likely mechanism and cure?
- [ ] Capacitive coupling; ground the foil at both ends
- [x] Magnetic coupling; twist the conductors (reduce the loop area) or reroute the cable away from the transformer
- [ ] Capacitive coupling; use a higher-impedance amplifier
- [ ] Ground loop; disconnect the transformer's earth
::: solution
A grounded foil is an excellent electric shield, so if it changes nothing the coupling is not capacitive. A transformer's leakage field is magnetic, and a thin non-magnetic shield is transparent to it at $50\,\mathrm{Hz}$ (skin depth about $12\,\mathrm{mm}$ in aluminium). Reduce the loop area by twisting the pair, increase the distance (the field of a transformer falls roughly as $1/r^3$), or use a mu-metal shield. Disconnecting an earth is never a cure.
:::
:::

### Shield grounding and guarding

Where should the shield of a cable be grounded? At low frequencies (below roughly $100\,\mathrm{kHz}$), at **one end only**, so that no ground-loop current flows in it; the end is the one where the signal circuit is grounded (usually the amplifier end for a floating sensor, the sensor end for a grounded one), so that the shield is at the same potential as the signal conductors and carries no capacitive current into them. At high frequencies, where one-end grounding leaves the shield as an antenna and where the loop current is limited by inductance anyway, at **both ends** (or every metre), with low-inductance $360^\circ$ connections to the connector shells. Many installations combine the two: shield grounded solidly at one end and through a capacitor of a few nanofarads at the other.

A **guard** goes further than a shield: it is a conductor surrounding the signal path and *driven* at the same potential as the signal, usually by a buffer. With no voltage across the insulation between signal and guard, no leakage current flows and the cable capacitance does not load the source. Guards are used for picoampere measurements (electrometers, photodiodes, pH electrodes), for high-impedance capacitive sensors, and as the driven shields of ECG leads. On a PCB, a guard ring of copper around a high-impedance input pin, driven at the input's potential, keeps surface leakage away from it.

## Isolation {#sec-isolation}

When the common-mode voltage is hundreds of volts — a current shunt in the high side of a motor drive, a cell voltage at the top of a $400\,\mathrm{V}$ battery stack, a patient connected to mains-powered equipment — or when a ground loop simply must be broken, the input and output must be **galvanically isolated**: no conductive path between them.

::: definition Isolation amplifier {#def-isolation}
An **isolation amplifier** transmits a signal across an insulating **isolation barrier** by a non-conductive coupling — magnetic (a transformer, often with the signal modulated on a carrier), capacitive (a modulated signal through small high-voltage capacitors on silicon dioxide) or optical (an LED and photodetector). Its input side has its own floating ground and power supply. Its key ratings are the **isolation voltage** (withstand rating, e.g. $5\,\mathrm{kV}$ RMS for one minute), the **working voltage** it can sustain permanently, and the **isolation-mode rejection ratio** (IMRR), the ratio of an isolation-mode voltage between the two grounds to the error it produces referred to the input.
:::

The barrier's stray capacitance, a few picofarads, is what limits the IMRR at high frequency: fast common-mode transients (tens of kilovolts per microsecond in silicon-carbide and gallium-nitride drives) push displacement currents $C\,\dd v/\dd t$ across it, and **common-mode transient immunity** (CMTI) is therefore a headline specification of modern digital isolators.

::: example Isolating a high-side shunt {#ex-isolation}
A $1\,\mathrm{m\Omega}$ shunt in the positive lead of a $400\,\mathrm{V}$ DC link carries up to $\pm100\,\mathrm{A}$. An isolation amplifier with a $\pm250\,\mathrm{mV}$ input range, a fixed gain of $8.2$ and an IMRR of $140\,\mathrm{dB}$ at DC is used. Find the full-scale output, and the error referred to the input from the $400\,\mathrm{V}$ isolation-mode voltage. What happens with a non-isolated differential amplifier?
::: solution
At $100\,\mathrm{A}$ the shunt voltage is $100\,\mathrm{mV}$, giving $0.82\,\mathrm{V}$ at the output (using $40\,\%$ of the input range, leaving room for overcurrent detection). The isolation-mode error is $400\,\mathrm{V}/10^7 = 40\,\mathrm{\mu V}$, equivalent to $40\,\mathrm{mA}$ — negligible. A non-isolated differential amplifier would need an input common-mode range including $400\,\mathrm{V}$; resistive attenuators (high-voltage difference amplifiers) can do this, but by [[#thm-diffamp]] the attenuation by, say, $50$ reduces the signal too, and with $0.01\,\%$ matching and $G = 1/50$ the worst-case CMRR is only $(1 + 0.02)/(4\times10^{-4}) = 2550$, so the common-mode error referred to the input is $400/2550 = 0.16\,\mathrm{V}$ — an apparent $160\,\mathrm{A}$. Isolation is the only practical solution, and it also protects the controller from the power stage.
:::
:::

::: application Medical isolation
Equipment connected to patients must limit the leakage current that can flow through the body. IEC 60601-1 sets limits such as $10\,\mathrm{\mu A}$ of patient leakage in normal condition for "CF" (cardiac floating) applied parts, which may contact the heart. Mains-frequency leakage through $10\,\mathrm{pF}$ of barrier capacitance at $230\,\mathrm{V}$ is $0.72\,\mathrm{\mu A}$, so isolation barriers with a few picofarads are acceptable, while the power supply's own transformer capacitance must also be controlled. ECG front ends combine an isolated supply, isolated data link, input protection against defibrillator pulses of several kilovolts, and right-leg drive.
:::

## Where this leads

The isolated, amplified and filtered signal now goes to the converter: anti-aliasing, multiplexing and the choice of ADC are the subject of [[instrumentation/data-acquisition]]. The interference mechanisms met here — common-impedance, capacitive and inductive coupling — are the low-frequency half of [[instrumentation/electromagnetic-compatibility]], which adds radiation, emissions limits and immunity tests. Amplifier noise, which sets the floor beneath all the interference, is treated in [[electronics-2/electronic-noise]], and the design of the op-amps inside an in-amp in [[electronics-2/operational-amplifier-design]].

::: history
Differential amplifiers for physiological signals were built with vacuum tubes in the 1930s: Bryan Matthews's balanced amplifier (1934) and Otto Schmitt's work on cathode-coupled circuits addressed exactly the ECG and EEG common-mode problem. The three-op-amp instrumentation amplifier became common with integrated op-amps in the late 1960s, and monolithic in-amps with laser-trimmed thin-film resistors — Analog Devices' AD520 and AD521 in the 1970s and the widely used AD620 in the early 1990s — made $100\,\mathrm{dB}$ CMRR a catalogue part. Isolation amplifiers using modulated transformers appeared in the 1970s for medical and industrial use; capacitive and magnetic digital isolators, integrated on silicon from the early 2000s, have largely replaced optocouplers for data. Ralph Morrison's *Grounding and Shielding Techniques in Instrumentation* (first edition 1967) and Henry Ott's *Noise Reduction Techniques in Electronic Systems* (1976) turned grounding from folklore into engineering.
:::

::: summary
- A four-resistor difference amplifier has CMRR $\approx (1 + G)/\lvert\delta\rvert$, limited by resistor-ratio mismatch $\delta$ (worst case $4\varepsilon$ for tolerance $\varepsilon$), and low, unequal input impedances.
- The three-op-amp in-amp has gain $1 + 2R/R_G$, a first stage with exactly unity common-mode gain, CMRR $\approx G_1\cdot\mathrm{CMRR}_2$ rising with gain, and high, balanced input impedances.
- Offsets and noise are specified RTI as input-stage terms plus output-stage terms divided by $G$.
- Source-impedance imbalance limits the system CMRR to $1/(\omega C_{cm}\Delta R_s)$; inputs need a DC bias-return path; RC input filters stop RF rectification.
- Ground loops arise from multiple ground connections; cure by differential measurement, single-point or plane grounding, or isolation — never by cutting safety earth.
- Capacitive pickup $\approx j\omega RC_{12}V_n$ is cured by low impedance and grounded electric shields; magnetic pickup $\omega BA$ by small loop area and twisting (and mu-metal or both-ends-grounded shields).
- Isolation amplifiers and digital isolators break galvanic paths for high common-mode voltages and safety; IMRR and CMTI specify their rejection.
:::

## Exercises

::: exercise Gain resistor {level=1 check="49.4e3/99"}
An in-amp has $G = 1 + 49.4\,\mathrm{k\Omega}/R_G$. Find $R_G$, in ohms, for $G = 100$.
::: solution
$R_G = 49.4\,\mathrm{k\Omega}/99 = 499\,\Omega$.
:::
:::

::: exercise Common-mode error {level=1 check="2/10^(100/20)"}
An amplifier with a CMRR of $100\,\mathrm{dB}$ has $2\,\mathrm{V}$ of common-mode voltage at its input. What is the equivalent differential input error, in volts?
::: solution
$2/10^5 = 20\,\mathrm{\mu V}$.
:::
:::

::: exercise Matching and CMRR {level=1 check="20*log10(2/(4*0.0001))"}
A unity-gain difference amplifier uses resistors matched to $\pm0.01\,\%$. Find its worst-case CMRR in decibels.
::: solution
$(1 + 1)/(4\times10^{-4}) = 5000$, i.e. $74\,\mathrm{dB}$.
:::
:::

::: exercise Isolation-mode error {level=1 check="1000/10^(140/20)"}
An isolation amplifier with an IMRR of $140\,\mathrm{dB}$ has $1\,\mathrm{kV}$ between its input and output grounds. What is the error referred to the input, in volts?
::: solution
$1000/10^7 = 100\,\mathrm{\mu V}$.
:::
:::

::: exercise Offset referred to input {level=2 check="30e-6+600e-6/250"}
An in-amp has an input-stage offset of $30\,\mathrm{\mu V}$ and an output-stage offset of $600\,\mathrm{\mu V}$. Find the worst-case offset referred to the input, in volts, at $G = 250$, and the output offset.
::: solution
RTI: $30 + 600/250 = 32.4\,\mathrm{\mu V}$. Output: $250\times32.4 = 8.1\,\mathrm{mV}$.
:::
:::

::: exercise Capacitive pickup {level=2}
A $1\,\mathrm{m}$ signal wire runs alongside a lead carrying a $100\,\mathrm{kHz}$, $10\,\mathrm{V}$ peak switching waveform (fundamental only), with a mutual capacitance of $20\,\mathrm{pF/m}$. The victim circuit has $1\,\mathrm{k\Omega}$ to ground and $100\,\mathrm{pF}$ of capacitance to ground. Find the induced voltage. By how much does a shield reducing $C_{12}$ to $0.1\,\mathrm{pF}$ help?
::: solution
$\omega R(C_{12} + C_2) = 2\pi\times10^5\times10^3\times1.2\times10^{-10} = 0.075$, small. $\lvert V_c\rvert \approx \omega RC_{12}V_n = 2\pi\times10^5\times10^3\times2\times10^{-11}\times10 = 0.126\,\mathrm{V}$ peak (more precisely $0.126/\sqrt{1 + 0.075^2} = 0.125\,\mathrm{V}$). With $0.1\,\mathrm{pF}$: $0.63\,\mathrm{mV}$, a reduction of $200$ ($46\,\mathrm{dB}$).
:::
:::

::: exercise Loop area {level=2 check="2*pi*60*50e-6*0.02*0.002"}
A sensor cable runs for $2\,\mathrm{m}$ with its two conductors $2\,\mathrm{cm}$ apart (not twisted), in a $60\,\mathrm{Hz}$ magnetic field of $50\,\mathrm{\mu T}$ amplitude normal to the loop. Find the induced EMF amplitude in volts. What is it if the conductors are $2\,\mathrm{mm}$ apart?
::: solution
$A = 2\times0.02 = 0.04\,\mathrm{m^2}$: $V = \omega BA = 2\pi\times60\times5\times10^{-5}\times0.04 = 0.754\,\mathrm{mV}$. At $2\,\mathrm{mm}$: $A = 0.004\,\mathrm{m^2}$, $V = 75.4\,\mathrm{\mu V}$. Twisting would reduce it further by one or two orders of magnitude.
:::
:::

::: exercise Common-mode input range {level=2}
An in-amp has $G_1 = 100$ in its first stage and $G_2 = 1$; its op-amps can swing to within $1.5\,\mathrm{V}$ of their $\pm5\,\mathrm{V}$ rails. The differential input is $\pm30\,\mathrm{mV}$. Over what range of common-mode voltage does it work?
::: solution
The first-stage outputs are $v_{cm} \pm G_1v_d/2 = v_{cm} \pm 1.5\,\mathrm{V}$; they must stay within $\pm3.5\,\mathrm{V}$, so $\lvert v_{cm}\rvert \le 2\,\mathrm{V}$. The input pins themselves (also within the op-amps' input range) and the difference stage must also be checked; the first-stage outputs are usually the limit at high gain, which is why in-amp data sheets give the allowed input common-mode range as a function of output voltage.
:::
:::

::: exercise Mismatched gain resistors in the first stage {level=3}
In the three-op-amp in-amp, let the two first-stage feedback resistors be $R(1 + \alpha)$ and $R(1 - \alpha)$. Show that the first stage still has a common-mode gain of exactly $1$ on both outputs and find its differential gain. Then show that the overall CMRR is still limited only by the difference stage, as in [[#eq-inamp-cmrr]].
::: solution
With $v_1 = v_2 = v_{cm}$, the inverting inputs are both at $v_{cm}$, so the current through $R_G$ is zero and so is the current through each feedback resistor: $v_{o1} = v_{o2} = v_{cm}$, whatever their values. For a differential input, $i = v_d/R_G$, $v_{o1} = v_1 + iR(1 + \alpha)$, $v_{o2} = v_2 - iR(1 - \alpha)$, so $v_{o1} - v_{o2} = v_d(1 + 2R/R_G)$: the $\alpha$ terms cancel in the difference (they add $\alpha iR$ to both outputs, a small common-mode shift proportional to $v_d$, which the difference stage rejects). Since the first stage passes $v_{cm}$ unchanged and multiplies $v_d$ by $G_1$, the analysis of [[#thm-inamp]] applies unchanged.
:::
:::

::: exercise Designing a thermocouple front end {level=3}
Design the input of a type K thermocouple channel ($0$–$1000\,^\circ\mathrm{C}$, about $41\,\mathrm{mV}$ full scale) for a $\pm2.5\,\mathrm{V}$ ADC, in a plant with up to $\pm2\,\mathrm{V}$ of $50\,\mathrm{Hz}$ ground difference and nearby radio transmitters. Specify: the in-amp gain; the bias return; the RC input filter (corner below $10\,\mathrm{Hz}$ differential); the minimum CMRR at $50\,\mathrm{Hz}$ for an error below $0.1\,^\circ\mathrm{C}$; and the thermocouple's grounding.
::: hint
Remember the source-imbalance limit, and that the input filter's resistors appear as source resistance.
:::
::: solution
*Gain*: $2.0\,\mathrm{V}/41\,\mathrm{mV} \approx 49$; take $G = 50$ ($2.05\,\mathrm{V}$ at $1000\,^\circ\mathrm{C}$). *Bias return*: for an insulated (ungrounded) junction, connect the negative input to the amplifier's ground through $10\,\mathrm{k\Omega}$, or both inputs through $1\,\mathrm{M\Omega}$ each. For a grounded junction, no return resistor: the ground loop is the return, and the $2\,\mathrm{V}$ appears as common mode. *Filter*: with $R = 10\,\mathrm{k\Omega}$ in each lead, $C_d = 1\,\mathrm{\mu F}$ (film) and $C_c = 0.1\,\mathrm{\mu F}$, the differential corner is $1/(2\pi\times10^4\times2.1\times10^{-6}) = 7.6\,\mathrm{Hz}$ and the common-mode corner $159\,\mathrm{Hz}$. *CMRR*: $0.1\,^\circ\mathrm{C}$ is $4.1\,\mathrm{\mu V}$, so $2\,\mathrm{V}/\mathrm{CMRR} \le 4.1\,\mathrm{\mu V}$ requires $\mathrm{CMRR} \ge 4.9\times10^5$ ($114\,\mathrm{dB}$) at $50\,\mathrm{Hz}$, including the filter: mismatch of the $C_c$ capacitors ($\pm5\,\%$) with $R = 10\,\mathrm{k\Omega}$ gives a CM-to-DM conversion of about $\omega R\Delta C_c = 2\pi\times50\times10^4\times5\times10^{-9} = 1.6\times10^{-2}$ before the differential filter, which then attenuates the converted signal at $50\,\mathrm{Hz}$ by $50/7.6 = 6.6$ — still far too much. So either reduce $C_c$ drastically (say $1\,\mathrm{nF}$, $1\,\%$, giving $3\times10^{-5}$, divided by $6.6$: $5\times10^{-6}$, about $106\,\mathrm{dB}$, plus digital $50\,\mathrm{Hz}$ rejection in an integrating ADC), or, better, use an isolated input so that the $2\,\mathrm{V}$ never appears. *Grounding*: prefer insulated junctions with the shield grounded at the amplifier end; if junctions are grounded, use an isolated channel. This design shows why industrial thermocouple modules are almost always isolated and use integrating converters with $50/60\,\mathrm{Hz}$ rejection.
:::
:::
