The transistor was invented as a bipolar device. The point-contact transistor of December 1947 and the junction transistor that Shockley conceived a few weeks later both work by injecting minority carriers across one junction and collecting them at another, and for the next twenty-five years almost every amplifier, radio and computer was built from bipolar junction transistors (BJTs). MOSFETs have since taken over digital logic, but the BJT remains the device of choice wherever high transconductance, low noise, precise matching or high speed at modest voltage matter: in radio-frequency front ends, in high-speed optical-link drivers, in precision analogue circuits and voltage references, and — in its silicon–germanium heterojunction form — in the millimetre-wave radar and communication chips of cars and base stations.

A BJT is two pn junctions back to back, sharing a very thin middle region. Its operation is the pn-junction theory of [[semiconductor-devices/pn-junction]] applied twice, with one crucial change: the middle region, the **base**, is much thinner than a diffusion length, so carriers injected into it from one junction diffuse across and are collected by the other before they can recombine. A small base current controls a large collector current, and that is amplification. In this chapter we derive the terminal currents from the minority-carrier profile in the base, identify the factors that set the current gain, build the **Ebers–Moll model** that describes all regions of operation, and examine the effects — base-width modulation (the **Early effect**), high injection and transit time — that limit real transistors. Circuit applications follow in [[electronics-1/bjt-circuits]].

## Structure and modes of operation

An **npn** transistor has a heavily doped n-type **emitter** ($\mathrm{n^+}$, typically $10^{19}$–$10^{20}\,\mathrm{cm^{-3}}$), a thin p-type **base** ($10^{17}$–$10^{18}\,\mathrm{cm^{-3}}$, a neutral width $W_B$ of $0.02$–$0.3\,\mathrm{\mu m}$), and a more lightly doped n-type **collector** ($10^{16}$–$10^{17}\,\mathrm{cm^{-3}}$) on top of a heavily doped buried layer that carries the current to the collector contact. A **pnp** transistor has all dopings reversed; everything below holds for it with electrons and holes exchanged and all voltage and current signs reversed. We treat the npn, which is faster because the minority carriers in its base are the more mobile electrons.

We use the terminal voltages $V_{BE}$ and $V_{BC}$ and define all three terminal currents as flowing **into** the device, with the emitter current written as $I_E$ flowing out for the npn, as is customary: $I_E = I_C + I_B$.

| mode | emitter–base junction | collector–base junction | use |
|---|---|---|---|
| forward active | forward ($V_{BE} > 0$) | reverse ($V_{BC} < 0$) | amplification |
| saturation | forward | forward | closed switch |
| cut-off | reverse | reverse | open switch |
| reverse active | reverse | forward | rarely used (poor gain) |

## The forward-active transistor

Bias the emitter–base junction forward and the collector–base junction in reverse. Electrons from the emitter are injected into the base, where they are minority carriers. The law of the junction ([[semiconductor-devices/pn-junction#thm-law-junction]]) fixes their concentration at the two edges of the neutral base:

$$
n_p(0) = n_{p0}\,e^{V_{BE}/V_T}, \qquad n_p(W_B) = n_{p0}\,e^{V_{BC}/V_T} \approx 0,
$$

where $n_{p0} = n_i^2/N_B$ and $x$ is measured from the emitter edge of the neutral base. Because $W_B \ll L_B$ (the electron diffusion length in the base), almost no electrons recombine on the way across, and the solution of the minority-carrier diffusion equation is a straight line — the short-base limit met in [[semiconductor-devices/carrier-transport]]:

$$
\Delta n(x) \approx n_{p0}\left(e^{V_{BE}/V_T} - 1\right)\left(1 - \frac{x}{W_B}\right).
$$ {#eq-base-profile}

The electrons diffuse down this gradient to the collector junction, where the field of the reverse-biased junction sweeps them into the collector. Meanwhile two smaller currents flow: holes are injected from the base back into the emitter (the emitter–base junction is a forward-biased diode, after all), and a few electrons recombine with holes in the base. Both are supplied by the base contact and make up the base current.

::: theorem Terminal currents in the forward-active mode {#thm-active-currents}
For an npn transistor with uniformly doped regions, emitter area $A$, neutral base width $W_B \ll L_B$ and neutral emitter width $W_E \ll L_E$ (both "short"), under low-level injection and in forward-active mode,

$$
I_C = I_S\,e^{V_{BE}/V_T}, \qquad I_S = \frac{qAn_i^2D_B}{N_BW_B},
$$ {#eq-ic}

$$
I_B = \underbrace{\frac{qAn_i^2D_E}{N_EW_E}e^{V_{BE}/V_T}}_{\text{holes into emitter}} + \underbrace{\frac{qAn_i^2W_B}{2N_B\tau_B}e^{V_{BE}/V_T}}_{\text{recombination in base}},
$$ {#eq-ib}

where $D_B$ and $\tau_B$ are the diffusion coefficient and lifetime of electrons in the base and $D_E$ that of holes in the emitter. (The $-1$ terms are dropped, since $e^{V_{BE}/V_T}$ is enormous in active operation.)
:::

::: proof
The collector current is the electron diffusion current at the collector edge of the base, $-qAD_B\,\mathrm d\Delta n/\mathrm dx$ in magnitude; from the straight-line profile [[#eq-base-profile]] the slope is $-n_{p0}e^{V_{BE}/V_T}/W_B$, so $I_C = qAD_Bn_{p0}e^{V_{BE}/V_T}/W_B$, which is [[#eq-ic]] with $n_{p0} = n_i^2/N_B$. The hole current injected into a short emitter, terminated by an ohmic contact at distance $W_E$, is the short-diode current of [[semiconductor-devices/pn-junction]] with $p_{n0} = n_i^2/N_E$: $qAD_En_i^2e^{V_{BE}/V_T}/(N_EW_E)$. The recombination current is the stored electron charge in the base divided by the lifetime: the triangular profile holds $Q_B = qA\cdot\tfrac12n_{p0}e^{V_{BE}/V_T}W_B$, so $Q_B/\tau_B = qAn_i^2W_Be^{V_{BE}/V_T}/(2N_B\tau_B)$. Each recombined electron requires one hole from the base contact, and each hole injected into the emitter also comes from the base contact, so the two add to give $I_B$.
:::

Since both base-current terms are proportional to $e^{V_{BE}/V_T}$, as is $I_C$, their ratio is a constant: the **common-emitter current gain**.

::: definition Current gains {#def-gains}
The **common-emitter current gain** is $\beta_F = I_C/I_B$ and the **common-base current gain** is $\alpha_F = I_C/I_E = \beta_F/(1 + \beta_F)$. The latter factorises as $\alpha_F = \gamma\,\alpha_T$, the product of the **emitter injection efficiency** $\gamma$ (the fraction of emitter current that is electrons injected into the base) and the **base transport factor** $\alpha_T$ (the fraction of those electrons that reach the collector).
:::

From [[#eq-ic]] and [[#eq-ib]],

$$
\frac{1}{\beta_F} = \frac{I_B}{I_C} = \frac{D_EN_BW_B}{D_BN_EW_E} + \frac{W_B^2}{2D_B\tau_B} = \frac{D_EN_BW_B}{D_BN_EW_E} + \frac{W_B^2}{2L_B^2}.
$$ {#eq-beta}

The two terms are $1/\beta$ contributions from back-injection and from base recombination, and they tell the designer what to do: dope the emitter much more heavily than the base ($N_E \gg N_B$), and make the base much thinner than a diffusion length. The **Gummel number**, the integrated base doping $N_BW_B$ (more generally $\int N_B\,\mathrm dx$), appears in $I_S$ and in the first term: a transistor with half the base charge has twice the saturation current.

::: example Current gain of a silicon npn {#ex-beta}
An npn transistor has emitter area $10\,\mathrm{\mu m}\times10\,\mathrm{\mu m}$, $N_E = 10^{19}\,\mathrm{cm^{-3}}$, $W_E = 0.2\,\mathrm{\mu m}$, $N_B = 10^{17}\,\mathrm{cm^{-3}}$, $W_B = 0.2\,\mathrm{\mu m}$ and an electron lifetime in the base of $1\,\mathrm{\mu s}$. (a) Find $I_S$, $\gamma$, $\alpha_T$ and $\beta_F$, ignoring heavy-doping effects. (b) Band-gap narrowing in the emitter reduces its gap by about $\Delta E_g = 70\,\mathrm{meV}$, which multiplies the effective $n_i^2$ there by $e^{\Delta E_g/kT}$. Recalculate $\beta_F$. (c) Find $V_{BE}$ at $I_C = 1\,\mathrm{mA}$.
::: solution
(a) Mobilities from [[semiconductor-devices/carrier-transport#eq-mobility-fit]]: electrons in the base, $\mu_n(10^{17}) = 801$, so $D_B = 20.7\,\mathrm{cm^2/s}$ and $L_B = \sqrt{20.7\times10^{-6}} = 45.5\,\mathrm{\mu m}$; holes in the emitter, $\mu_p(10^{19}) = 57.0$, so $D_E = 1.47\,\mathrm{cm^2/s}$. With $A = 10^{-6}\,\mathrm{cm^2}$:

$$
I_S = \frac{(1.602\times10^{-19})(10^{-6})(10^{20})(20.7)}{(10^{17})(0.2\times10^{-4})} = 1.66\times10^{-16}\,\mathrm A.
$$

The two terms of [[#eq-beta]] are

$$
\frac{D_EN_BW_B}{D_BN_EW_E} = \frac{1.47\times10^{17}}{20.7\times10^{19}} = 7.11\times10^{-4}, \qquad \frac{W_B^2}{2L_B^2} = \frac{(0.2)^2}{2(45.5)^2} = 9.7\times10^{-6},
$$

so $\gamma = 1/(1 + 7.11\times10^{-4}) = 0.99929$, $\alpha_T = 1 - 9.7\times10^{-6} = 0.99999$, and $\beta_F = 1/(7.21\times10^{-4}) = 1390$. Back-injection into the emitter dominates; base recombination is almost negligible in a modern thin base.

(b) Band-gap narrowing multiplies the emitter term by $e^{0.070/0.02585} = e^{2.708} = 15.0$, so $1/\beta_F = 15.0\times7.11\times10^{-4} + 9.7\times10^{-6} = 1.067\times10^{-2}$ and $\beta_F = 94$. This is a realistic value: heavy doping in the emitter is the main limit on the gain of silicon homojunction transistors, and it is why the ideal formula overestimates $\beta$ by an order of magnitude.

(c) $V_{BE} = V_T\ln(I_C/I_S) = 0.02585\ln(10^{-3}/1.66\times10^{-16}) = 0.02585\times29.43 = 0.761\,\mathrm V$. Larger transistors need less: a device of ten times the area needs $60\,\mathrm{mV}$ less for the same current.
:::
:::

::: warning β is not a well-controlled parameter
The gain $\beta_F$ depends on emitter doping, band-gap narrowing, base width and lifetime, all of which vary from wafer to wafer, and it changes with current and temperature (increasing by roughly $0.5$–$1\,\%$ per kelvin). Data sheets quote ranges such as $100$–$300$. The collector current as a function of $V_{BE}$, on the other hand, is governed by $I_S$ and the exponential and is very predictable, and transistors on the same chip match to within a percent. Good circuit design therefore never relies on a particular value of $\beta$; it uses feedback, or relies on $V_{BE}$ matching between nearby transistors.
:::

### Real gain: the Gummel plot

Plotting $\log I_C$ and $\log I_B$ against $V_{BE}$ (at fixed $V_{BC} = 0$) gives the **Gummel plot**, the standard characterisation of a bipolar process. In the ideal model both are straight lines of slope one decade per $60\,\mathrm{mV}$, separated by a constant $\log\beta_F$. A real transistor departs at both ends. At **low current** the base current acquires a component from recombination in the emitter–base depletion region, varying as $e^{V_{BE}/2V_T}$ ([[semiconductor-devices/diodes-photonic-devices]]); it dominates at small $V_{BE}$, so $\beta$ falls at low current. At **high current**, the electron concentration injected into the base approaches the base doping; the holes in the base increase to keep it neutral, which in effect raises the Gummel number, and $I_C$ grows only as $e^{V_{BE}/2V_T}$ (**high-level injection**, or the Webster effect). Series resistances then flatten both curves further.

::: widget plot
f: log10(1e-16*exp(x/0.02585)/(0.5*(1 + sqrt(1 + 4*1e-16*exp(x/0.02585)/0.01)))); log10(1e-16*exp(x/0.02585)/150 + 10^s*exp(x/(2*0.02585)))
x: 0.3, 0.95
y: -12, 0
sliders: s=-14.5:-16:-12:0.1
labels: \log_{10} I_C; \log_{10} I_B
caption: Gummel plot ($\log_{10}$ of current in amperes against $V_{BE}$ in volts) of a transistor with $I_S = 10^{-16}\,\mathrm A$, ideal gain $150$, a knee current for high injection of $10\,\mathrm{mA}$, and a non-ideal base-current component $10^{s}e^{V_{BE}/2V_T}$ from depletion-region recombination. The vertical gap between the curves is $\log_{10}\beta$. Hover between $0.6$ and $0.7\,\mathrm V$: the curves are nearly parallel and $\beta \approx 145$–$148$. At low $V_{BE}$ the base current bends to slope $1/2$ and $\beta$ collapses; at high $V_{BE}$ the collector current bends over. Raise $s$ (a poorer emitter–base junction): the region of good gain shrinks.
:::

::: widget parametric
fx: log10(1e-16*exp(t/0.02585)/(0.5*(1 + sqrt(1 + 4*1e-16*exp(t/0.02585)/0.01))))
fy: (1e-16*exp(t/0.02585)/(0.5*(1 + sqrt(1 + 4*1e-16*exp(t/0.02585)/0.01))))/(1e-16*exp(t/0.02585)/150 + 10^s*exp(t/(2*0.02585)))
t: 0.3, 0.95
x: -11, -1
y: 0, 170
sliders: s=-14.5:-16:-12:0.1
equal: false
caption: The same transistor's current gain $\beta = I_C/I_B$ (vertical) against $\log_{10} I_C$ (horizontal), traced as $V_{BE} = t$ runs from $0.3$ to $0.95\,\mathrm V$. The gain has a broad maximum near $150$ over several decades of current and falls off at both ends: recombination in the depletion region at low current, high injection at high current. Designers bias transistors in the flat middle; move $s$ and see how quickly the low-current gain suffers.
:::

## The Ebers–Moll model

To describe a transistor in every mode, including saturation, we must allow both junctions to be forward biased. Because the minority-carrier diffusion equation is linear, the base profile is the **superposition** of a profile injected from the emitter junction and one injected from the collector junction.

::: theorem Ebers–Moll equations (transport form) {#thm-ebers-moll}
For any combination of junction voltages, the terminal currents of an ideal npn transistor are

$$
I_C = I_S\left(e^{V_{BE}/V_T} - e^{V_{BC}/V_T}\right) - \frac{I_S}{\beta_R}\left(e^{V_{BC}/V_T} - 1\right),
$$ {#eq-em-ic}

$$
I_B = \frac{I_S}{\beta_F}\left(e^{V_{BE}/V_T} - 1\right) + \frac{I_S}{\beta_R}\left(e^{V_{BC}/V_T} - 1\right),
$$ {#eq-em-ib}

and $I_E = I_C + I_B$. Here $\beta_F$ is the forward and $\beta_R$ the reverse common-emitter gain. Equivalently, in terms of the common-base gains $\alpha_F$, $\alpha_R$ and the junction saturation currents $I_{ES} = I_S/\alpha_F$ and $I_{CS} = I_S/\alpha_R$,

$$
I_E = I_{ES}\left(e^{V_{BE}/V_T} - 1\right) - \alpha_RI_{CS}\left(e^{V_{BC}/V_T} - 1\right), \qquad I_C = \alpha_FI_{ES}\left(e^{V_{BE}/V_T} - 1\right) - I_{CS}\left(e^{V_{BC}/V_T} - 1\right),
$$

with the **reciprocity** relation $\alpha_FI_{ES} = \alpha_RI_{CS} = I_S$.
:::

::: proof
In the short base, with boundary values $\Delta n(0) = n_{p0}(e^{V_{BE}/V_T} - 1)$ and $\Delta n(W_B) = n_{p0}(e^{V_{BC}/V_T} - 1)$, the profile is the straight line between them, and the electron current crossing the base towards the collector is $qAD_B[\Delta n(0) - \Delta n(W_B)]/W_B = I_S[(e^{V_{BE}/V_T} - 1) - (e^{V_{BC}/V_T} - 1)] = I_S(e^{V_{BE}/V_T} - e^{V_{BC}/V_T})$. This transport current enters the collector terminal. In addition, each forward-biased junction draws a base current: the emitter junction $(I_S/\beta_F)(e^{V_{BE}/V_T} - 1)$ by back-injection into the emitter and base recombination, as in [[#thm-active-currents]], and the collector junction $(I_S/\beta_R)(e^{V_{BC}/V_T} - 1)$ by the analogous processes, with the collector playing the role of the emitter. The latter flows out of the collector terminal into the base, so it is subtracted from $I_C$. This gives [[#eq-em-ic]] and [[#eq-em-ib]]. The coefficient of the transport term is the same, $I_S$, in both directions because the same base profile carries the current either way; this is reciprocity, a consequence of the linearity and symmetry of the diffusion problem. Rewriting with $\alpha = \beta/(1 + \beta)$ gives the second form.
:::

The model has a simple circuit form: two diodes (the base–emitter and base–collector junctions) and a current source $I_S(e^{V_{BE}/V_T} - e^{V_{BC}/V_T})$ from collector to emitter. Its reverse gain $\beta_R$ is small, typically $0.1$–$5$, because the collector is lightly doped and large, so the collector junction injects holes freely into it — the device is very asymmetric. The Gummel–Poon model used in SPICE adds the Early effect, high injection and the non-ideal base current to this skeleton.

### Saturation

When both junctions are forward biased, the base–collector junction injects electrons back into the base, the base profile flattens, and the collector current falls below $\beta_FI_B$. The transistor is **saturated**: the collector–emitter voltage is small and nearly independent of current, which is what makes the BJT a good closed switch.

::: example Collector–emitter saturation voltage {#ex-vcesat}
Show from [[#thm-ebers-moll]] that a transistor driven with base current $I_B$ and carrying collector current $I_C < \beta_FI_B$ has

$$
V_{CE,\text{sat}} = V_T\ln\frac{1 + (1 + I_C/I_B)/\beta_R}{1 - I_C/(\beta_FI_B)},
$$

and evaluate it for $\beta_F = 100$, $\beta_R = 1$, $I_C = 10\,\mathrm{mA}$ with $I_B = 1\,\mathrm{mA}$ and with $I_B = 0.2\,\mathrm{mA}$.
::: solution
In saturation both exponentials are large and the $-1$ terms can be dropped. Write $a = e^{V_{BE}/V_T}$, $b = e^{V_{BC}/V_T}$. Then

$$
I_C = I_S\left[a - b\left(1 + \frac{1}{\beta_R}\right)\right], \qquad I_B = I_S\left[\frac{a}{\beta_F} + \frac{b}{\beta_R}\right].
$$

Eliminating $I_S a$: from the second, $I_Sa = \beta_F(I_B - I_Sb/\beta_R)$; substituting in the first, $I_C = \beta_FI_B - I_Sb(\beta_F/\beta_R + 1 + 1/\beta_R)$, so $I_Sb = (\beta_FI_B - I_C)/[(1 + \beta_F)/\beta_R + 1]$. Then $I_Sa = I_C + I_Sb(1 + 1/\beta_R)$. Since $V_{CE} = V_{BE} - V_{BC} = V_T\ln(a/b)$, after a little algebra (dividing numerator and denominator by $\beta_FI_B$)

$$
\frac{a}{b} = \frac{1 + (1 + I_C/I_B)/\beta_R}{1 - I_C/(\beta_FI_B)},
$$

which is the stated result. With $I_C/I_B = 10$: $V_{CE,\text{sat}} = 0.02585\ln\frac{1 + 11}{1 - 0.1} = 0.02585\ln13.33 = 67\,\mathrm{mV}$. With $I_C/I_B = 50$: $0.02585\ln\frac{52}{0.5} = 0.02585\ln104 = 120\,\mathrm{mV}$. The harder the transistor is overdriven (the smaller the **forced beta** $I_C/I_B$ compared with $\beta_F$), the lower $V_{CE,\text{sat}}$. Measured values, typically $0.1$–$0.3\,\mathrm V$, are higher because of the collector series resistance.
:::
:::

Saturation is fast to enter and slow to leave: the forward-biased collector junction fills the base and collector with excess minority charge that must be removed before the transistor can turn off, exactly like the reverse recovery of a diode. Bipolar logic families avoided it by clamping the base–collector junction with a Schottky diode (Schottky TTL) or by never saturating at all (emitter-coupled logic).

::: quiz
A transistor in forward-active mode has $\alpha_F = 0.995$. What is $\beta_F$, and what fraction of the emitter current is base current?
- [ ] $\beta_F = 0.995$; the base current is $0.5\,\%$ of $I_C$.
- [x] $\beta_F = 199$; the base current is $0.5\,\%$ of $I_E$.
- [ ] $\beta_F = 995$; the base current is $0.1\,\%$ of $I_E$.
- [ ] $\beta_F = 200$; the base current is $5\,\%$ of $I_E$.
::: solution
$\beta_F = \alpha_F/(1 - \alpha_F) = 0.995/0.005 = 199$. Since $I_C = \alpha_FI_E$, the base current is $I_E - I_C = (1 - \alpha_F)I_E = 0.005I_E$. Small changes in $\alpha$ near one produce large changes in $\beta$: $\alpha = 0.99$ gives $\beta = 99$ and $\alpha = 0.999$ gives $999$.
:::
:::

## The Early effect

In the ideal model, $I_C$ in forward-active mode does not depend on $V_{CE}$ at all. In reality the output characteristics slope upwards. The reason is that the collector–base depletion region extends partly into the base, and when $V_{CB}$ increases it widens and eats into the neutral base. The neutral base width $W_B$ shrinks, the gradient of the base profile steepens, and $I_C \propto 1/W_B$ increases. James Early described this **base-width modulation** in 1952.

::: proposition Early voltage {#prop-early}
For small changes in $V_{CB}$, the collector current in forward-active mode is

$$
I_C \approx I_S\,e^{V_{BE}/V_T}\left(1 + \frac{V_{CE}}{V_A}\right),
$$ {#eq-early}

where the **Early voltage** is

$$
V_A = \frac{Q_B}{C_{jc}} = \frac{qAN_BW_B}{C_{jc}},
$$ {#eq-va}

the ratio of the majority charge in the neutral base to the collector–base depletion capacitance (both for the same area).
:::

::: proof
From [[#eq-ic]], $I_C \propto 1/(N_BW_B) = qA/Q_B$, where $Q_B = qAN_BW_B$ is the hole charge in the neutral base. Increasing $V_{CB}$ by $\mathrm dV_{CB}$ uncovers additional acceptor charge at the base edge of the collector depletion region, $\mathrm dQ = C_{jc}\,\mathrm dV_{CB}$, all of which is removed from the neutral base: $\mathrm dQ_B = -C_{jc}\,\mathrm dV_{CB}$. Hence

$$
\frac{1}{I_C}\frac{\mathrm dI_C}{\mathrm dV_{CB}} = -\frac{1}{Q_B}\frac{\mathrm dQ_B}{\mathrm dV_{CB}} = \frac{C_{jc}}{Q_B} = \frac{1}{V_A}.
$$

With $V_{BE}$ fixed, $\mathrm dV_{CE} = \mathrm dV_{CB}$, so to first order $I_C$ grows linearly with $V_{CE}$ with slope $I_C/V_A$. Extrapolated backwards, all the output curves meet the voltage axis near $V_{CE} = -V_A$, which is how the Early voltage is measured.
:::

The Early voltage sets the small-signal output resistance $r_o = V_A/I_C$, which limits the voltage gain of a single-transistor amplifier to $g_mr_o = V_A/V_T$ — the **intrinsic gain** — as you will see in [[electronics-1/small-signal-amplifiers]]. To increase $V_A$, the base must hold a lot of charge (a large Gummel number) and the collector must be lightly doped compared with the base, so that the depletion region spreads mainly into the collector. These are the same choices that increase $V_{BE}$ and reduce speed: as usual in device design, everything is a trade-off.

::: example Early voltage of the transistor {#ex-early}
For the transistor of [[#ex-beta]] ($N_B = 10^{17}\,\mathrm{cm^{-3}}$, neutral base width $0.2\,\mathrm{\mu m}$ at the operating point), with collector doping $N_C = 10^{16}\,\mathrm{cm^{-3}}$ and $V_{CB} = 5\,\mathrm V$, find $C_{jc}$ per unit area, $V_A$, and the output resistance at $I_C = 1\,\mathrm{mA}$. How far does the collector depletion region reach into the base?
::: solution
The collector–base junction has $V_{bi} = 0.02585\ln(10^{17}\times10^{16}/10^{20}) = 0.774\,\mathrm V$. At $V_{CB} = 5\,\mathrm V$ it is the junction of [[semiconductor-devices/pn-junction#ex-junction]] at $-5\,\mathrm V$: $W = 0.906\,\mathrm{\mu m}$, of which $x_p = 0.082\,\mathrm{\mu m}$ lies in the base. So $C_{jc}/A = \varepsilon_s/W = 1.036\times10^{-12}/0.906\times10^{-4} = 1.14\times10^{-8}\,\mathrm{F/cm^2}$ and

$$
V_A = \frac{qN_BW_B}{C_{jc}/A} = \frac{(1.602\times10^{-19})(10^{17})(0.2\times10^{-4})}{1.14\times10^{-8}} = 28\,\mathrm V.
$$

At $1\,\mathrm{mA}$, $r_o = V_A/I_C = 28\,\mathrm{k\Omega}$, and the intrinsic gain is $V_A/V_T = 28/0.02585 = 1080$. If the collector were doped as heavily as the base, the depletion region would split equally and $C_{jc}$ would rise, lowering $V_A$; with $N_C = 10^{15}\,\mathrm{cm^{-3}}$ it would be several times higher.
:::
:::

::: widget plot
f: 1e3*1e-14*exp(0.62/0.02585)*(1 - 2*exp(-x/0.02585))*(1 + x/a); 1e3*1e-14*exp(0.64/0.02585)*(1 - 2*exp(-x/0.02585))*(1 + x/a); 1e3*1e-14*exp(0.66/0.02585)*(1 - 2*exp(-x/0.02585))*(1 + x/a); 1e3*1e-14*exp(0.68/0.02585)*(1 - 2*exp(-x/0.02585))*(1 + x/a)
x: 0, 10
y: 0, 4
sliders: a=50:10:200:1
labels: V_{BE}=0.62; 0.64; 0.66; 0.68\,\mathrm V
caption: Output characteristics, $I_C$ in milliamperes against $V_{CE}$ in volts, for four values of $V_{BE}$, from the Ebers–Moll model with $I_S = 10^{-14}\,\mathrm A$, $\beta_R = 1$, and an Early voltage $V_A = a$ volts. Below about $0.1\,\mathrm V$ the transistor is saturated and the current collapses; above it the curves are nearly flat but slope upwards by $I_C/V_A$. Each $20\,\mathrm{mV}$ step in $V_{BE}$ multiplies the current by $2.17$. Reduce $a$: the slopes increase in proportion to the current, so all the curves, extended to the left, meet at $V_{CE} = -V_A$.
:::

## Speed limits

How fast can a BJT respond? A change in collector current requires a change in the charge stored in the device — mainly the electrons in the base, plus the charges on the junction capacitances — and that charge must be supplied by the base current. The central figure of merit is the **unity-gain frequency** $f_T$, the frequency at which the small-signal common-emitter current gain $\abs{h_{fe}}$ falls to one. It is related to the total emitter-to-collector delay $\tau_{EC}$ by $f_T = 1/(2\pi\tau_{EC})$, with

$$
\tau_{EC} = \tau_B + \tau_C + \frac{V_T}{I_C}(C_{je} + C_{jc}) + r_cC_{jc}.
$$ {#eq-tau-ec}

The first term is the **base transit time**, the stored base charge per unit current. From the triangular profile, $Q_B = qA\tfrac12n(0)W_B$ and $I_C = qAD_Bn(0)/W_B$, so

$$
\tau_B = \frac{Q_B}{I_C} = \frac{W_B^2}{2D_B}.
$$ {#eq-tau-b}

The second, $\tau_C \approx W_{C}/(2v_{\text{sat}})$, is the transit time through the collector depletion region of width $W_C$. The third is the time to charge the junction capacitances through the emitter's small-signal resistance $V_T/I_C$; it dominates at low current, so $f_T$ rises with $I_C$. At high current $f_T$ falls again because of the **Kirk effect**: when the electron density in the collector depletion region, $J_C/(qv_{\text{sat}})$, becomes comparable with the collector doping $N_C$, the electrons cancel the donor charge, the high-field region moves to the far side of the collector and the base effectively widens. The onset is at about $J_K = qN_Cv_{\text{sat}}$, which for $N_C = 10^{16}\,\mathrm{cm^{-3}}$ is $1.6\times10^{4}\,\mathrm{A/cm^2}$, i.e. $16\,\mathrm{mA}$ for the transistor of [[#ex-beta]]. Fast transistors therefore use more heavily doped collectors, at the cost of breakdown voltage: the product $f_T\times BV_{CEO}$ is roughly constant for a given material (the **Johnson limit**, about $200$–$500\,\mathrm{GHz\,V}$ for silicon).

::: example Designing the base for speed {#ex-ft}
The base of the transistor of [[#ex-beta]] has $D_B = 20.7\,\mathrm{cm^2/s}$. (a) What base transit time and upper bound on $f_T$ does $W_B = 0.2\,\mathrm{\mu m}$ give? (b) What maximum base width allows $f_T = 20\,\mathrm{GHz}$ if the base transit time may use at most the whole delay budget? (c) What does thinning the base do to $\beta$, $V_A$ and the base resistance?
::: solution
(a) $\tau_B = W_B^2/2D_B = (0.2\times10^{-4})^2/(2\times20.7) = 9.66\times10^{-12}\,\mathrm s$, so $f_T \le 1/(2\pi\tau_B) = 16.5\,\mathrm{GHz}$.

(b) $\tau_B \le 1/(2\pi\times20\times10^{9}) = 7.96\,\mathrm{ps}$ requires $W_B \le \sqrt{2D_B\tau_B} = \sqrt{2\times20.7\times7.96\times10^{-12}}\,\mathrm{cm} = 1.82\times10^{-5}\,\mathrm{cm} = 0.18\,\mathrm{\mu m}$. In practice the other delays take a large share of the budget, so a $20\,\mathrm{GHz}$ transistor needs a base under $0.1\,\mathrm{\mu m}$ and a small, heavily doped collector.

(c) A thinner base raises $\beta$ (both terms of [[#eq-beta]] fall) but reduces the Gummel number, which lowers $V_A$ ([[#eq-va]]), raises the base sheet resistance (slowing the device through $r_bC_{jc}$) and makes punch-through — the collector depletion region reaching right across the base to the emitter — likely at low voltage. The remedy is to dope the base more heavily, which in a homojunction lowers $\beta$. That impasse is what the heterojunction transistor resolves.
:::
:::

::: application Silicon–germanium heterojunction transistors
In a **heterojunction bipolar transistor** (HBT) the base is made of a material with a smaller band gap than the emitter. In the SiGe HBT, the base is a strained $\mathrm{Si_{1-x}Ge_x}$ layer with $x$ up to about $0.3$, whose gap is smaller by roughly $0.1$–$0.2\,\mathrm{eV}$. The larger $n_i^2$ in the base multiplies the electron injection, and hence $\beta$, by $e^{\Delta E_g/kT}$, so the base can be doped very heavily (above $10^{19}\,\mathrm{cm^{-3}}$) and made very thin (about $10$–$20\,\mathrm{nm}$) while keeping good gain, low base resistance and a high Early voltage. Grading the germanium fraction across the base adds a built-in field that sweeps electrons through it faster. As of 2026 the fastest production SiGe processes reach $f_T$ of about $300$–$500\,\mathrm{GHz}$ and maximum oscillation frequencies $f_{\max}$ of up to about $700\,\mathrm{GHz}$; they are used in automotive radar at $77\,\mathrm{GHz}$, optical transceivers and test equipment. III–V HBTs (InGaP/GaAs, InP) dominate mobile-phone power amplifiers.
:::

::: remark Breakdown in the common-emitter connection
A transistor with the base open breaks down at a lower collector–emitter voltage than its collector–base junction alone. Holes generated by avalanche multiplication in the collector junction flow into the base, act as base current and are multiplied by $\beta$; the loop runs away when $\beta(M - 1) = 1$, where $M$ is the multiplication factor. With the empirical form $M = 1/[1 - (V/BV_{CBO})^m]$ ($m \approx 3$–$6$) this gives $BV_{CEO} \approx BV_{CBO}/\beta^{1/m}$. A transistor with $BV_{CBO} = 60\,\mathrm V$, $\beta = 94$ and $m = 4$ has $BV_{CEO} \approx 60/3.1 = 19\,\mathrm V$.
:::

::: history
John Bardeen and Walter Brattain demonstrated the point-contact transistor at Bell Laboratories on 16 December 1947 (shown to the management on 23 December). William Shockley conceived the junction transistor in January 1948, published its theory in 1949, and the first grown-junction transistors were made by Morgan Sparks and Gordon Teal in 1950–1951. The three shared the 1956 Nobel Prize in Physics. Gordon Teal's group at Texas Instruments produced the first commercial silicon transistors in 1954. J. J. Ebers and J. L. Moll published their large-signal model in 1954, and James Early described base-width modulation in 1952. Herbert Kroemer proposed the wide-gap emitter in 1957 (sharing the 2000 Nobel Prize for heterostructures), Hermann Gummel and H. C. Poon published their integral charge-control model in 1970, and the first SiGe HBTs were demonstrated at IBM in 1987, with commercial SiGe BiCMOS following in the late 1990s.
:::

## Where this leads

The BJT's exponential $I_C$–$V_{BE}$ law gives it the largest transconductance per unit current of any transistor, $g_m = I_C/V_T$; small-signal models built from the results of this chapter ($g_m$, $r_\pi = \beta/g_m$, $r_o = V_A/I_C$, $C_\pi$, $C_\mu$) are developed in [[electronics-1/bjt-circuits]] and [[electronics-1/small-signal-amplifiers]], and the frequency limits in [[electronics-1/amplifier-frequency-response]]. The precise $V_{BE}$ matching and its temperature coefficient are the basis of current mirrors ([[electronics-1/current-mirrors]]), differential pairs and bandgap references. Many of the same ideas — injection over a barrier, charge control, transit time — return in the MOSFET operating below threshold in [[semiconductor-devices/mosfets]].

::: summary
- A BJT is two junctions sharing a base much thinner than a diffusion length; in forward-active mode electrons injected from the emitter diffuse across a linear profile and are collected.
- $I_C = I_Se^{V_{BE}/V_T}$ with $I_S = qAn_i^2D_B/(N_BW_B)$, inversely proportional to the Gummel number; the base current is back-injection into the emitter plus base recombination.
- $1/\beta_F = D_EN_BW_B/(D_BN_EW_E) + W_B^2/(2L_B^2)$: a heavily doped emitter and thin base give high gain; band-gap narrowing in the emitter limits silicon homojunction gain to around $100$.
- The Ebers–Moll model superposes forward and reverse injection and describes all modes, including saturation with $V_{CE,\text{sat}}$ of about $0.1\,\mathrm V$.
- Base-width modulation gives the Early effect, $I_C \propto 1 + V_{CE}/V_A$ with $V_A = Q_B/C_{jc}$, and an output resistance $V_A/I_C$.
- $\beta$ falls at low current (depletion-region recombination) and at high current (high injection, Kirk effect).
- Speed is limited by the base transit time $W_B^2/2D_B$, collector transit time and capacitance charging, giving $f_T = 1/(2\pi\tau_{EC})$; SiGe heterojunction transistors break the gain–speed trade-off of homojunctions.
:::

## Exercises

::: exercise Gains {level=1 check="250/251"}
A transistor has $\beta_F = 250$. Find $\alpha_F$. If $I_E = 5\,\mathrm{mA}$, find $I_C$ and $I_B$.
::: solution
$\alpha_F = \beta_F/(1 + \beta_F) = 250/251 = 0.99602$. $I_C = \alpha_FI_E = 4.980\,\mathrm{mA}$ and $I_B = I_E/(1 + \beta_F) = 19.9\,\mathrm{\mu A}$.
:::
:::

::: exercise Base-emitter voltage {level=1 check="0.02585*log(2e-3/1e-15)"}
A transistor has $I_S = 10^{-15}\,\mathrm A$. Find the $V_{BE}$, in volts, that gives $I_C = 2\,\mathrm{mA}$ at $300\,\mathrm K$.
::: solution
$V_{BE} = V_T\ln(I_C/I_S) = 0.02585\ln(2\times10^{12}) = 0.02585\times28.32 = 0.732\,\mathrm V$.
:::
:::

::: exercise Base transit time {level=1 check="(0.05e-6)^2/(2*25e-4)"}
Find the base transit time, in seconds, for $W_B = 50\,\mathrm{nm}$ and $D_B = 25\,\mathrm{cm^2/s}$, and the corresponding bound on $f_T$.
::: solution
$\tau_B = (5\times10^{-6}\,\mathrm{cm})^2/(2\times25) = 5\times10^{-13}\,\mathrm s = 0.5\,\mathrm{ps}$; $1/(2\pi\tau_B) = 318\,\mathrm{GHz}$. Modern SiGe bases are this thin or thinner, and the other delays then dominate.
:::
:::

::: exercise Emitter efficiency design {level=2 check="200/201"}
In a transistor with equal emitter and base widths, $D_B/D_E = 10$. What ratio $N_E/N_B$ is needed for an emitter injection efficiency of $0.999$, and what is $\beta$ if base recombination is negligible? Give $\gamma$ for $N_E/N_B = 20$ (the value to enter).
::: solution
$1/\gamma - 1 = D_EN_BW_B/(D_BN_EW_E) = (1/10)(N_B/N_E)$. For $\gamma = 0.999$, $1/\gamma - 1 = 1.001\times10^{-3}$, so $N_E/N_B = 100/1.001 \approx 100$, and $\beta = 1/(10^{-3}) \approx 1000$ (ignoring band-gap narrowing). For $N_E/N_B = 20$: $1/\gamma - 1 = 1/200$, $\gamma = 200/201 = 0.995$, $\beta = 200$.
:::
:::

::: exercise Early voltage from measurements {level=2 check="1.00/(0.05/8) - 2"}
At fixed $V_{BE}$ a transistor carries $1.00\,\mathrm{mA}$ at $V_{CE} = 2\,\mathrm V$ and $1.05\,\mathrm{mA}$ at $V_{CE} = 10\,\mathrm V$. Find the Early voltage in volts and the output resistance at $1\,\mathrm{mA}$.
::: solution
Extrapolating the straight line $I_C = I_0(1 + V_{CE}/V_A)$ through the two points: the slope is $0.05\,\mathrm{mA}/8\,\mathrm V = 6.25\,\mathrm{\mu A/V}$, and the line reaches zero at $V_{CE} = 2 - 1.00/0.00625 = 2 - 160 = -158\,\mathrm V$. So $V_A = 158\,\mathrm V$ and $r_o = 1/(6.25\times10^{-6}) = 160\,\mathrm{k\Omega}$ at about $1\,\mathrm{mA}$.
:::
:::

::: exercise Kirk-effect current {level=2 check="1.602e-19*5e16*1e6*1e7*1e-2*(2e-6*20e-6)"}
A transistor has an emitter $2\,\mathrm{\mu m}\times20\,\mathrm{\mu m}$ and collector doping $5\times10^{16}\,\mathrm{cm^{-3}}$. Estimate the collector current, in amperes, at which the Kirk effect sets in ($v_{\text{sat}} = 10^{7}\,\mathrm{cm/s}$).
::: solution
$J_K = qN_Cv_{\text{sat}} = (1.602\times10^{-19})(5\times10^{16})(10^{7}) = 8.0\times10^{4}\,\mathrm{A/cm^2}$. The area is $4\times10^{-7}\,\mathrm{cm^2}$, so $I_K = 32\,\mathrm{mA}$. Above this the base widens into the collector and $f_T$ and $\beta$ fall.
:::
:::

::: exercise Recombination-limited gain {level=2}
An old alloy-junction transistor had a base $W_B = 10\,\mathrm{\mu m}$ wide with $L_B = 50\,\mathrm{\mu m}$, and a perfect emitter ($\gamma = 1$). Find $\alpha_T$ and $\beta$. What base width gives $\beta = 1000$?
::: solution
$1 - \alpha_T \approx W_B^2/(2L_B^2) = 100/5000 = 0.02$, so $\alpha_T = 0.98$ and $\beta = 0.98/0.02 = 49$. For $\beta = 1000$ we need $W_B^2/(2L_B^2) = 10^{-3}$, i.e. $W_B = L_B\sqrt{2\times10^{-3}} = 50\times0.0447 = 2.2\,\mathrm{\mu m}$. Reducing base widths from tens of micrometres to fractions of a micrometre, by diffusion and then by implantation and epitaxy, was the history of BJT improvement.
:::
:::

::: exercise Reciprocity and the Ebers–Moll parameters {level=3}
A transistor has $\alpha_F = 0.99$, $\alpha_R = 0.5$ and $I_{ES} = 10^{-15}\,\mathrm A$. (a) Find $I_S$, $I_{CS}$, $\beta_F$ and $\beta_R$. (b) With the emitter open ($I_E = 0$) and the collector–base junction reverse biased, show that the collector current is $I_{CBO} = I_{CS}(1 - \alpha_F\alpha_R)$, and evaluate it.
::: solution
(a) $I_S = \alpha_FI_{ES} = 0.99\times10^{-15}\,\mathrm A$, $I_{CS} = I_S/\alpha_R = 1.98\times10^{-15}\,\mathrm A$, $\beta_F = 0.99/0.01 = 99$, $\beta_R = 0.5/0.5 = 1$.

(b) With $I_E = 0$ the emitter equation gives $I_{ES}(e^{V_{BE}/V_T} - 1) = \alpha_RI_{CS}(e^{V_{BC}/V_T} - 1)$, and with $V_{BC} \ll 0$ the bracket on the right is $-1$, so $I_{ES}(e^{V_{BE}/V_T} - 1) = -\alpha_RI_{CS}$ (the emitter floats slightly reverse biased). The collector equation then gives $I_C = \alpha_F(-\alpha_RI_{CS}) + I_{CS} = I_{CS}(1 - \alpha_F\alpha_R) = 1.98\times10^{-15}\times0.505 = 1.0\times10^{-15}\,\mathrm A$, flowing into the collector. (Real leakage is dominated by generation in the depletion region and is much larger.)
:::
:::

::: exercise Temperature dependence of V_BE {level=3 check="-(1.12+3*0.02585-0.70)/300"}
Taking $I_S \propto T^3e^{-E_g/kT}$ (ignoring the temperature dependence of $D_B$), show that at fixed collector current $\mathrm dV_{BE}/\mathrm dT = -(E_g/q + 3V_T - V_{BE})/T$, and evaluate it in volts per kelvin for $V_{BE} = 0.70\,\mathrm V$ at $300\,\mathrm K$. Explain why a transistor biased at fixed $V_{BE}$ is at risk of thermal runaway, and how an emitter resistor helps.
::: hint
Write $V_{BE} = V_T\ln(I_C/I_S)$ and differentiate, using $\mathrm d\ln I_S/\mathrm dT = 3/T + E_g/(kT^2)$.
:::
::: solution
$\mathrm dV_{BE}/\mathrm dT = V_{BE}/T - V_T\,\mathrm d\ln I_S/\mathrm dT = V_{BE}/T - V_T(3/T + E_g/kT^2) = -(E_g/q + 3V_T - V_{BE})/T$. Numerically $-(1.12 + 0.0776 - 0.70)/300 = -1.66\,\mathrm{mV/K}$. At fixed $V_{BE}$, the collector current increases by a factor $e^{1.66/25.85} \approx 1.066$ per kelvin, so heating by dissipation increases the current, which increases the dissipation — positive feedback that can destroy the device. An emitter resistor $R_E$ converts the current increase into a voltage $\Delta I_CR_E$ that reduces the junction voltage, providing negative feedback; this is why bias circuits in [[electronics-1/bjt-circuits]] use it.
:::
:::
