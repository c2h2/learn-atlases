The transistors in a modern processor are not controlled by junctions at all. Each is switched by a gate electrode separated from the silicon by an insulating layer a few atoms thick, and no current flows into the gate: a voltage on it attracts or repels charge at the silicon surface through the insulator, like a voltage on one plate of a capacitor induces charge on the other. The structure that does this — metal (or heavily doped polysilicon), oxide, semiconductor — is the **MOS capacitor**, and it is the heart of the MOSFET, of CCD and CMOS image sensors, of flash memory and of the DRAM cell. It is also the most important diagnostic tool of a CMOS process: a capacitance–voltage measurement on a MOS capacitor reveals the oxide thickness, the substrate doping and the charges trapped in the oxide and at its interface.

This chapter develops the electrostatics of the MOS capacitor, which is a one-dimensional problem much like the depletion region of [[semiconductor-devices/pn-junction]], but with a twist. As the gate voltage rises on a p-type substrate, the surface passes through three regimes: **accumulation** of holes, **depletion** of holes, and finally **inversion**, in which a thin layer of electrons forms at the surface — an n-type layer in a p-type crystal, created by the field alone. The gate voltage at which this happens is the **threshold voltage**, the most important number in digital design. We derive it, see how work functions and oxide charges shift it, and explain the characteristic shapes of the low- and high-frequency C–V curves. The MOS transistor built on this foundation is the subject of [[semiconductor-devices/mosfets]]. Silicon constants at $300\,\mathrm K$ are those of [[semiconductor-devices/carrier-statistics]]; we write $V_{th}$ for the threshold voltage to keep $V_T = kT/q$ for the thermal voltage.

## The ideal MOS structure

Consider a gate electrode on a layer of silicon dioxide of thickness $t_{ox}$, grown on a p-type substrate with acceptor concentration $N_A$; the back of the substrate is grounded through an ohmic contact. The oxide is an excellent insulator, with a band gap of about $9\,\mathrm{eV}$, a relative permittivity of $3.9$ and a breakdown field above $10^{7}\,\mathrm{V/cm}$. Its capacitance per unit area,

$$
C_{ox} = \frac{\varepsilon_{ox}}{t_{ox}}, \qquad \varepsilon_{ox} = 3.9\varepsilon_0 = 3.45\times10^{-13}\,\mathrm{F/cm},
$$ {#eq-cox}

is the scale for everything that follows. For $t_{ox} = 10\,\mathrm{nm}$, $C_{ox} = 3.45\times10^{-7}\,\mathrm{F/cm^2} = 345\,\mathrm{nF/cm^2}$, or $3.45\,\mathrm{fF/\mu m^2}$.

::: definition Ideal MOS capacitor {#def-ideal-mos}
An **ideal** MOS capacitor has (i) no charge in the oxide or at the oxide–silicon interface, (ii) a perfectly insulating oxide, so no current flows in steady state, and (iii) a gate whose work function equals that of the semiconductor, so that with no applied voltage the bands are flat everywhere. Departures from (i) and (iii) are added later as a shift of the flat-band voltage.
:::

With no current flowing, the semiconductor is in equilibrium and its Fermi level is flat; an applied gate voltage $V_G$ simply separates the gate Fermi level from the semiconductor Fermi level by $qV_G$. Part of $V_G$ drops across the oxide and the rest across the semiconductor near its surface, where the bands bend. We describe that bending by the **surface potential** $\psi_s$, the electrostatic potential at the surface relative to the neutral bulk ($\psi_s > 0$ means the bands bend **down** towards the surface). It is convenient to measure the bulk doping by the **Fermi potential**

$$
\phi_F = \frac{E_i - E_F}{q}\Big|_{\text{bulk}} = V_T\ln\frac{N_A}{n_i},
$$ {#eq-phif}

which is $0.417\,\mathrm V$ for $N_A = 10^{17}\,\mathrm{cm^{-3}}$. At the surface, the carrier concentrations are the bulk values scaled by Boltzmann factors:

$$
p_s = N_Ae^{-\psi_s/V_T}, \qquad n_s = \frac{n_i^2}{N_A}e^{\psi_s/V_T}.
$$ {#eq-surface-conc}

## Accumulation, depletion and inversion

As $V_G$ is swept from negative to positive, the surface passes through three regimes.

::: definition Regimes of the MOS capacitor {#def-regimes}
For a p-type substrate:

- **Accumulation**, $\psi_s < 0$: the bands bend up, holes collect at the surface, $p_s > N_A$.
- **Flat band**, $\psi_s = 0$: no band bending; the gate voltage is the **flat-band voltage** $V_{FB}$ ($V_{FB} = 0$ for the ideal structure).
- **Depletion**, $0 < \psi_s < 2\phi_F$: the bands bend down, holes are pushed away, leaving a depletion region of ionised acceptors; at $\psi_s = \phi_F$ the surface is intrinsic.
- **Inversion**, $\psi_s > \phi_F$: electrons outnumber holes at the surface. By convention **strong inversion** begins when $\psi_s = 2\phi_F$, where by [[#eq-surface-conc]] $n_s = N_A$: the surface is as n-type as the bulk is p-type. The gate voltage at which this happens is the **threshold voltage** $V_{th}$.
:::

Why is $2\phi_F$ a sharp threshold? Below it, the charge in the semiconductor is almost all ionised acceptors in the depletion region, which grows only as $\sqrt{\psi_s}$. Above it, the electron concentration at the surface grows as $e^{\psi_s/V_T}$: every extra $60\,\mathrm{mV}$ of surface potential multiplies it by ten. A small further increase in $\psi_s$ therefore supplies all the extra charge that any increase of gate voltage demands, so in strong inversion the surface potential is effectively **pinned** near $2\phi_F$ and the depletion region stops growing.

### The exact surface charge

Poisson's equation with the Boltzmann concentrations, $\mathrm d^2\psi/\mathrm dx^2 = -\frac{q}{\varepsilon_s}[p(x) - n(x) - N_A + n_i^2/N_A]$, can be integrated once exactly (multiply both sides by $\mathrm d\psi/\mathrm dx$). The result, which we quote, gives the total charge per unit area in the semiconductor as a function of the surface potential:

$$
Q_s = -\,\mathrm{sgn}(\psi_s)\sqrt{2\varepsilon_skTN_A}\;F(\psi_s), \qquad F = \sqrt{e^{-\psi_s/V_T} + \frac{\psi_s}{V_T} - 1 + \frac{n_i^2}{N_A^2}\left(e^{\psi_s/V_T} - \frac{\psi_s}{V_T} - 1\right)}.
$$ {#eq-qs-exact}

The four terms of $F^2$ are, in order, the accumulated holes, the depletion charge, and (multiplied by the tiny $n_i^2/N_A^2$) the inversion electrons. The derivation is in Pierret's or Sze's text.

::: widget plot
f: log10(sqrt(8.581e-33*10^a)*sqrt(exp(-38.68*x) + 38.68*x - 1 + 10^(20 - 2*a)*(exp(38.68*x) - 38.68*x - 1))); log10(sqrt(2*1.602e-19*1.036e-12*10^a*x))
x: -0.3, 1.2
y: -9, -5
sliders: a=17:15:18:0.1
labels: \log_{10}\lvert Q_s\rvert\ \text{(exact)}; \text{depletion only}
caption: The magnitude of the semiconductor charge per unit area, $\log_{10}\lvert Q_s\rvert$ in $\mathrm{C/cm^2}$, against surface potential $\psi_s$ in volts, from [[#eq-qs-exact]], for $N_A = 10^{a}\,\mathrm{cm^{-3}}$; the second curve is the depletion charge $\sqrt{2q\varepsilon_sN_A\psi_s}$ alone. At negative $\psi_s$ (accumulation) the charge rises exponentially. Between $0$ and about $2\phi_F$ ($0.83\,\mathrm V$ for $a = 17$) the two curves coincide: depletion. Beyond, the inversion electrons take over and the charge shoots up; that knee is the threshold. Increase $a$: $2\phi_F$ moves right and the depletion charge grows.
:::

### The depletion approximation

In depletion and up to the threshold, the depletion approximation is excellent: the semiconductor charge is $Q_d = -qN_AW_d$, the depletion width is that of a one-sided junction with potential $\psi_s$,

$$
W_d = \sqrt{\frac{2\varepsilon_s\psi_s}{qN_A}}, \qquad Q_d = -\sqrt{2q\varepsilon_sN_A\psi_s},
$$ {#eq-wd}

and the potential in the silicon is parabolic, $\psi(x) = \psi_s(1 - x/W_d)^2$.

::: theorem Gate voltage and surface potential {#thm-vg-psi}
For an MOS capacitor with flat-band voltage $V_{FB}$, the gate voltage and surface potential are related by

$$
V_G = V_{FB} + \psi_s - \frac{Q_s(\psi_s)}{C_{ox}},
$$ {#eq-vg}

which in depletion becomes $V_G = V_{FB} + \psi_s + \sqrt{2q\varepsilon_sN_A\psi_s}/C_{ox}$.
:::

::: proof
The total charge is zero: the gate carries $Q_G = -Q_s$ (we ignore any oxide charge here; it is absorbed into $V_{FB}$ below). By Gauss's law the field in the oxide is $\mathcal E_{ox} = Q_G/\varepsilon_{ox}$, uniform because the oxide is charge-free, so the voltage across it is $V_{ox} = \mathcal E_{ox}t_{ox} = Q_G/C_{ox} = -Q_s/C_{ox}$. Going round the loop from the gate through the oxide and semiconductor to the substrate contact, the applied voltage minus the work-function difference equals $V_{ox} + \psi_s$; writing $V_{FB}$ for that difference (zero in the ideal case) gives [[#eq-vg]]. Inserting $Q_d$ from [[#eq-wd]] gives the depletion form.
:::

The structure is a voltage divider: the gate voltage is shared between the oxide capacitor and the semiconductor. A thinner oxide (larger $C_{ox}$) puts more of the gate voltage across the semiconductor, giving the gate tighter control over the surface — the reason oxides have been thinned with every generation of CMOS.

::: widget parametric
fx: -(0.56 + 0.02585*(a - 10)*2.302585) + t + sign(t)*sqrt(8.581e-33*10^a)*sqrt(exp(-38.68*t) + 38.68*t - 1 + 10^(20 - 2*a)*(exp(38.68*t) - 38.68*t - 1))/3.453e-7
fy: t
t: -0.2, 1.1
x: -3, 4
y: -0.25, 1.15
sliders: a=17:15:18:0.1
equal: false
caption: Surface potential $\psi_s$ (vertical, volts) against gate voltage $V_G$ (horizontal, volts) for a $10\,\mathrm{nm}$ oxide on p-type silicon with $N_A = 10^{a}\,\mathrm{cm^{-3}}$ and an $\mathrm{n^+}$ polysilicon gate (so $V_{FB} = -(0.56 + \phi_F)$), computed exactly from [[#eq-vg]] and [[#eq-qs-exact]]. In accumulation (left) $\psi_s$ barely moves below zero; in depletion it rises steadily; above threshold it saturates a little above $2\phi_F$ while $V_G$ keeps increasing — the pinning of the surface potential. Increase $a$: both the flat-band voltage and the pinning level change.
:::

## Threshold voltage

At threshold, $\psi_s = 2\phi_F$, the depletion region has reached its maximum width and the inversion charge is still negligible. Putting $\psi_s = 2\phi_F$ into the depletion form of [[#eq-vg]]:

::: theorem Threshold voltage of the MOS capacitor {#thm-vth}
For a p-type substrate,

$$
V_{th} = V_{FB} + 2\phi_F + \frac{\sqrt{4q\varepsilon_sN_A\phi_F}}{C_{ox}} = V_{FB} + 2\phi_F + \frac{qN_AW_{d,\max}}{C_{ox}},
$$ {#eq-vth}

with the maximum depletion width

$$
W_{d,\max} = \sqrt{\frac{4\varepsilon_s\phi_F}{qN_A}}.
$$ {#eq-wdmax}

Above threshold the depletion charge stays at $Q_{d,\max} = -qN_AW_{d,\max}$ and the additional gate charge is balanced by an electron **inversion charge**

$$
Q_{inv} \approx -C_{ox}(V_G - V_{th}).
$$ {#eq-qinv}

For an n-type substrate all signs reverse: $V_{th} = V_{FB} - 2\abs{\phi_F} - \sqrt{4q\varepsilon_sN_D\abs{\phi_F}}/C_{ox}$.
:::

::: proof
The first form is [[#eq-vg]] at $\psi_s = 2\phi_F$ with $Q_s = Q_d = -\sqrt{2q\varepsilon_sN_A\cdot2\phi_F}$. The second follows from $W_d$ in [[#eq-wd]] at $\psi_s = 2\phi_F$. Above threshold, $\psi_s$ is pinned at about $2\phi_F$, so the depletion charge is fixed; by [[#eq-vg]], an increase of $V_G$ beyond $V_{th}$ must be matched by additional semiconductor charge $-C_{ox}(V_G - V_{th})$, which can only be inversion electrons. (The small further increase of $\psi_s$, a few $V_T$, makes [[#eq-qinv]] slightly overestimate $\abs{Q_{inv}}$.)
:::

The three terms of [[#eq-vth]] have clear meanings: the gate must first bring the bands to flat band, then bend them by $2\phi_F$, and finally supply enough charge across the oxide to support the depletion charge of the full depletion region. The inversion charge [[#eq-qinv]] is the mobile charge that will carry the current of a MOSFET; that it is simply $C_{ox}$ times the **gate overdrive** $V_G - V_{th}$ is the key to the MOSFET equations.

::: example Threshold of an ideal capacitor {#ex-vth-ideal}
An ideal MOS capacitor ($V_{FB} = 0$) has $t_{ox} = 10\,\mathrm{nm}$ and $N_A = 10^{17}\,\mathrm{cm^{-3}}$. Find $\phi_F$, $W_{d,\max}$, the depletion charge at threshold, $V_{th}$, and the electron density in the inversion layer at $V_G = V_{th} + 1\,\mathrm V$.
::: solution
$\phi_F = 0.02585\ln(10^{17}/10^{10}) = 0.417\,\mathrm V$ and $C_{ox} = 3.45\times10^{-7}\,\mathrm{F/cm^2}$. Then

$$
W_{d,\max} = \sqrt{\frac{4(1.036\times10^{-12})(0.417)}{(1.602\times10^{-19})(10^{17})}}\,\mathrm{cm} = 1.04\times10^{-5}\,\mathrm{cm} = 0.104\,\mathrm{\mu m},
$$

$\abs{Q_{d,\max}} = qN_AW_{d,\max} = (1.602\times10^{-19})(10^{17})(1.04\times10^{-5}) = 1.66\times10^{-7}\,\mathrm{C/cm^2}$, and

$$
V_{th} = 0 + 2(0.417) + \frac{1.66\times10^{-7}}{3.45\times10^{-7}} = 0.833 + 0.482 = 1.31\,\mathrm V.
$$

At $1\,\mathrm V$ of overdrive, $\abs{Q_{inv}}/q = C_{ox}(1\,\mathrm V)/q = 3.45\times10^{-7}/1.602\times10^{-19} = 2.2\times10^{12}$ electrons per square centimetre. If this sheet were spread over a thickness of $5\,\mathrm{nm}$ it would be an electron concentration of $4\times10^{18}\,\mathrm{cm^{-3}}$ — strongly n-type, at the surface of a p-type crystal.
:::
:::

## Real MOS capacitors: work functions and oxide charge

A real gate does not have the same work function as the substrate, and real oxides contain charge. Both simply shift the C–V curve along the voltage axis, by changing the flat-band voltage.

::: theorem Flat-band voltage {#thm-vfb}
With gate work function $\phi_m$, semiconductor work function $\phi_s = \chi + (E_c - E_F)/q$, and an effective oxide charge $Q_{ox}$ per unit area located at the oxide–silicon interface,

$$
V_{FB} = \phi_{ms} - \frac{Q_{ox}}{C_{ox}}, \qquad \phi_{ms} = \phi_m - \phi_s.
$$ {#eq-vfb}

For a p-type substrate, $\phi_s = \chi + E_g/2q + \phi_F$ (with $E_i$ taken at midgap). Charge distributed through the oxide with density $\rho_{ox}(x)$ contributes $-\frac{1}{C_{ox}}\int_0^{t_{ox}}\frac{x}{t_{ox}}\rho_{ox}(x)\,\mathrm dx$, with $x$ measured from the gate.
:::

::: proof
At flat band there is no charge in the semiconductor and no band bending. Without oxide charge, the gate voltage needed is the one that aligns the vacuum levels, $V_G = \phi_m - \phi_s$: the contact-potential difference of the two materials, as in [[semiconductor-devices/diodes-photonic-devices]]. A sheet of positive charge $Q_{ox}$ at the interface must then be terminated by a negative charge on the gate, $-Q_{ox}$, so that no field reaches the silicon; that needs an extra voltage $-Q_{ox}/C_{ox}$ across the oxide. A sheet at distance $x$ from the gate induces image charge only on the gate side over the fraction $x/t_{ox}$ of the oxide, giving the weighting $x/t_{ox}$; integrating over a distribution gives the stated formula.
:::

The gate materials of practical importance are degenerate polysilicon, used until the 45 nm generation, and metals, used since. Heavily doped $\mathrm{n^+}$ polysilicon has its Fermi level essentially at $E_c$, so $\phi_m \approx \chi$ and, on a p-type substrate, $\phi_{ms} = -(E_g/2q + \phi_F) = -(0.56 + \phi_F)$. $\mathrm{p^+}$ polysilicon has $\phi_m \approx \chi + E_g/q$. Modern **metal gates** are chosen from compounds such as TiN, TiAl and TaN whose work functions can be tuned between about $4.1$ and $5.0\,\mathrm{eV}$ to set the thresholds of n- and p-channel transistors.

Four kinds of charge are found in and on the oxide:

- **Fixed oxide charge** $Q_f$, positive, located within about $2\,\mathrm{nm}$ of the interface and due to incompletely oxidised silicon. Typical densities are $10^{10}$–$10^{11}\,\mathrm{cm^{-2}}$, lowest on $(100)$ wafers.
- **Interface-trap charge** $Q_{it}$, from states in the silicon band gap at the interface (dangling bonds), whose occupation changes with $\psi_s$. Annealing in hydrogen passivates most of them, to about $10^{10}\,\mathrm{cm^{-2}eV^{-1}}$. Because their charge depends on the bias, they stretch out the C–V curve and degrade the subthreshold slope of transistors.
- **Mobile ionic charge** $Q_m$, mainly sodium and potassium ions, which drift through the oxide when heated under bias and cause threshold drift. Its control by clean processing in the late 1960s was what made MOS integrated circuits reliable.
- **Oxide-trapped charge** $Q_{ot}$, electrons or holes trapped by defects in the oxide after injection by hot carriers, tunnelling or radiation. It is a reliability and radiation-hardness concern.

::: example Flat-band and threshold voltage with an n⁺ polysilicon gate {#ex-vfb}
The capacitor of [[#ex-vth-ideal]] has an $\mathrm{n^+}$ polysilicon gate and fixed oxide charge $Q_f = q\times5\times10^{10}\,\mathrm{cm^{-2}}$ at the interface. Find $V_{FB}$ and $V_{th}$.
::: solution
$\phi_{ms} = -(0.56 + 0.417) = -0.977\,\mathrm V$. The oxide-charge term is

$$
\frac{Q_f}{C_{ox}} = \frac{(1.602\times10^{-19})(5\times10^{10})}{3.45\times10^{-7}}\,\mathrm V = 0.023\,\mathrm V,
$$

so $V_{FB} = -0.977 - 0.023 = -1.00\,\mathrm V$. Adding the ideal threshold terms from [[#ex-vth-ideal]], $V_{th} = -1.00 + 0.833 + 0.482 = 0.315\,\mathrm V$. The work-function difference lowered the threshold by a full volt. Note that the fixed charge, $5\times10^{10}\,\mathrm{cm^{-2}}$, is about one positive charge per $2\times10^{4}$ surface atoms; yet sodium contamination of only $10^{11}\,\mathrm{cm^{-2}}$ drifting to the interface would shift the threshold by a further $-0.046\,\mathrm V$, enough to upset a circuit.
:::
:::

::: example Choosing the substrate doping for a target threshold {#ex-vth-design}
An n-channel process has an $\mathrm{n^+}$ polysilicon gate, $t_{ox} = 5\,\mathrm{nm}$ and negligible oxide charge. What uniform substrate doping gives $V_{th} = 0.5\,\mathrm V$?
::: solution
Now $C_{ox} = 3.45\times10^{-13}/5\times10^{-7} = 6.91\times10^{-7}\,\mathrm{F/cm^2}$ and

$$
V_{th}(N_A) = -(0.56 + \phi_F) + 2\phi_F + \frac{\sqrt{4q\varepsilon_sN_A\phi_F}}{C_{ox}} = -0.56 + \phi_F + \frac{\sqrt{4q\varepsilon_sN_A\phi_F}}{C_{ox}},
$$

with $\phi_F = V_T\ln(N_A/n_i)$. This is not solvable in closed form, but it increases monotonically with $N_A$: $V_{th} = -0.13\,\mathrm V$ at $10^{16}$, $0.10\,\mathrm V$ at $10^{17}$, $0.46\,\mathrm V$ at $5\times10^{17}$ and $0.73\,\mathrm V$ at $10^{18}\,\mathrm{cm^{-3}}$. Bisection on $\log N_A$ gives $N_A = 5.6\times10^{17}\,\mathrm{cm^{-3}}$, for which $\phi_F = 0.461\,\mathrm V$. Check: $\sqrt{4(1.602\times10^{-19})(1.036\times10^{-12})(5.6\times10^{17})(0.461)}/6.91\times10^{-7} = 4.12\times10^{-7}/6.91\times10^{-7} = 0.60\,\mathrm V$, and $-0.56 + 0.461 + 0.60 = 0.50\,\mathrm V$. In practice the threshold is set by a shallow **threshold-adjust implant** near the surface rather than by the bulk doping, so that the substrate under the channel can stay more lightly doped (reducing junction capacitance and body effect).
:::
:::

::: warning Signs for n-type substrates and p-channel devices
For an n-type substrate (the body of a p-channel transistor), $\phi_F$ is negative, inversion means **holes** at the surface, the threshold voltage is normally negative, and the depletion charge is positive (ionised donors). The formula changes sign in two places: $V_{th} = V_{FB} - 2\abs{\phi_F} - \abs{Q_{d,\max}}/C_{ox}$. A common error is to carry the p-type formula over unchanged and obtain a positive threshold for a p-channel device. Draw the band diagram — bands bending **up** at the surface to invert n-type material — and the signs follow.
:::

## Capacitance–voltage characteristics

The small-signal capacitance of the MOS structure, $C = \mathrm dQ_G/\mathrm dV_G$, is measured by superimposing a small AC voltage on the DC gate bias. From [[#eq-vg]], $\mathrm dV_G = \mathrm d\psi_s - \mathrm dQ_s/C_{ox}$, so the structure behaves as the oxide capacitance in series with a semiconductor capacitance $C_s = -\mathrm dQ_s/\mathrm d\psi_s$:

$$
\frac1C = \frac{1}{C_{ox}} + \frac{1}{C_s}.
$$ {#eq-c-series}

The shape of the C–V curve follows from how $C_s$ behaves in each regime.

- **Accumulation**: the hole charge varies exponentially with $\psi_s$, so $C_s$ is huge and $C \approx C_{ox}$.
- **Flat band**: the semiconductor responds over a Debye length $L_D = \sqrt{\varepsilon_skT/(q^2N_A)}$, giving $C_s = \varepsilon_s/L_D$ and the **flat-band capacitance** $C_{FB} = 1/(1/C_{ox} + L_D/\varepsilon_s)$, somewhat below $C_{ox}$. For $N_A = 10^{17}\,\mathrm{cm^{-3}}$, $L_D = 12.9\,\mathrm{nm}$, and with $t_{ox} = 10\,\mathrm{nm}$, $C_{FB} = 0.70\,C_{ox}$.
- **Depletion**: $C_s = \varepsilon_s/W_d$, falling as the depletion region widens; eliminating $\psi_s$ with [[#thm-vg-psi]] gives

$$
\frac{C}{C_{ox}} = \frac{1}{\sqrt{1 + 2C_{ox}^2(V_G - V_{FB})/(q\varepsilon_sN_A)}}.
$$ {#eq-c-depletion}

- **Inversion**: what happens depends on frequency. The inversion electrons are minority carriers, and they can be supplied or removed only by thermal generation and recombination in the depletion region, which takes a time of order $0.1$–$10\,\mathrm s$ in good silicon. At **low frequency** (a slow ramp, or below about $10\,\mathrm{Hz}$) the inversion charge follows the signal; it varies exponentially with $\psi_s$, $C_s$ becomes huge again and $C$ returns to $C_{ox}$. At **high frequency** (the usual $100\,\mathrm{kHz}$ to $1\,\mathrm{MHz}$ measurement) the inversion charge cannot follow; the signal is answered by the edge of the depletion region, which is pinned at $W_{d,\max}$, and the capacitance stays at its minimum

$$
C_{\min} = \frac{1}{1/C_{ox} + W_{d,\max}/\varepsilon_s}.
$$ {#eq-cmin}

::: widget plot
f: if(x < (-(0.56+(0.02585*(a-10)*2.302585))), 1, max(1/(1 + (3.453e-13/(t*1e-7))*sqrt(4*1.036e-12*(0.02585*(a-10)*2.302585)/(1.602e-19*10^a))/1.036e-12), 1/sqrt(1 + 2*(3.453e-13/(t*1e-7))^2*(x - (-(0.56+(0.02585*(a-10)*2.302585))))/(1.602e-19*1.036e-12*10^a)))); if(x < (-(0.56+(0.02585*(a-10)*2.302585))), 1, if(x < ((-(0.56+(0.02585*(a-10)*2.302585))) + 2*(0.02585*(a-10)*2.302585) + sqrt(4*1.602e-19*1.036e-12*10^a*(0.02585*(a-10)*2.302585))/(3.453e-13/(t*1e-7))), 1/sqrt(1 + 2*(3.453e-13/(t*1e-7))^2*(x - (-(0.56+(0.02585*(a-10)*2.302585))))/(1.602e-19*1.036e-12*10^a)), 1))
x: -3, 3
y: 0, 1.1
sliders: t=10:2:30:0.5; a=17:15:18:0.1
labels: C_{HF}/C_{ox}; C_{LF}/C_{ox}
caption: High- and low-frequency C–V curves, $C/C_{ox}$ against $V_G$ in volts, in the depletion approximation (so the rounding near flat band and threshold is absent), for an $\mathrm{n^+}$ polysilicon gate on p-type silicon with oxide thickness $t$ (nm) and $N_A = 10^{a}\,\mathrm{cm^{-3}}$. Accumulation is on the left at $C_{ox}$; the drop marks depletion; at threshold the low-frequency curve jumps back to $C_{ox}$ while the high-frequency curve stays at $C_{\min}$. Thicken the oxide: $C_{\min}/C_{ox}$ rises and the threshold moves right. Raise the doping: $C_{\min}$ rises, because $W_{d,\max}$ shrinks.
:::

If the gate voltage is swept quickly into inversion, faster than generation can supply electrons, the depletion region grows beyond $W_{d,\max}$ to supply the charge with more acceptors and the capacitance falls **below** $C_{\min}$. This is **deep depletion**. It is not a curiosity: a CCD image sensor stores photo-generated electrons in deep-depletion wells, and the time a deep-depleted capacitor takes to relax back into inversion is a sensitive measure of generation lifetime.

::: example Oxide thickness and doping from a C–V curve {#ex-cv-extract}
A high-frequency C–V measurement on a capacitor of area $10^{-3}\,\mathrm{cm^2}$ on p-type silicon gives $C_{\max} = 345\,\mathrm{pF}$ in accumulation and $C_{\min} = 77.4\,\mathrm{pF}$ in inversion. Find $t_{ox}$ and $N_A$.
::: solution
In accumulation $C = C_{ox}A$, so $C_{ox} = 345\times10^{-12}/10^{-3} = 3.45\times10^{-7}\,\mathrm{F/cm^2}$ and $t_{ox} = \varepsilon_{ox}/C_{ox} = 3.45\times10^{-13}/3.45\times10^{-7} = 10\,\mathrm{nm}$. From [[#eq-cmin]], the depletion capacitance at maximum width is

$$
\frac{\varepsilon_s}{W_{d,\max}} = \left(\frac{1}{C_{\min}} - \frac{1}{C_{ox}}\right)^{-1}\frac{1}{A} = \frac{1}{(1/77.4 - 1/345)\,\mathrm{pF^{-1}}}\cdot\frac{1}{10^{-3}\,\mathrm{cm^2}} = 9.98\times10^{-8}\,\mathrm{F/cm^2},
$$

so $W_{d,\max} = 1.036\times10^{-12}/9.98\times10^{-8} = 0.104\,\mathrm{\mu m}$. Now [[#eq-wdmax]] gives $N_A = 4\varepsilon_s\phi_F/(qW_{d,\max}^2)$, but $\phi_F$ depends on $N_A$. Iterate: start with $\phi_F = 0.4\,\mathrm V$, giving $N_A = 4(1.036\times10^{-12})(0.4)/[(1.602\times10^{-19})(1.04\times10^{-5})^2] = 9.6\times10^{16}$; then $\phi_F = 0.02585\ln(9.6\times10^{6}) = 0.416\,\mathrm V$, giving $N_A = 1.00\times10^{17}\,\mathrm{cm^{-3}}$; one more step changes nothing. So $N_A = 1.0\times10^{17}\,\mathrm{cm^{-3}}$ — the capacitor of [[#ex-vth-ideal]].
:::
:::

::: quiz
A MOS capacitor on p-type silicon is measured at $1\,\mathrm{MHz}$ and again with a very slow ramp. In which regime do the two C–V curves differ?
- [ ] Accumulation, because holes cannot respond at $1\,\mathrm{MHz}$.
- [ ] Depletion, because the depletion edge cannot move at $1\,\mathrm{MHz}$.
- [x] Inversion, because the minority-carrier inversion charge can only follow slow signals.
- [ ] Nowhere; capacitance does not depend on frequency.
::: solution
In accumulation and depletion the charge that responds is made of majority holes, which move in picoseconds (the dielectric relaxation time). In inversion the responding charge would be electrons, which must be generated thermally, a process with a time constant of seconds; at $1\,\mathrm{MHz}$ they cannot follow, so only the depletion edge responds and $C$ stays at $C_{\min}$. In a MOSFET, where the source and drain supply electrons directly, the inversion layer responds quickly and the gate capacitance in inversion is close to $C_{ox}$ at all frequencies.
:::
:::

## Thin oxides and high-k dielectrics

For forty years the oxide was thinned at every CMOS generation, to keep the gate in control of ever-shorter channels ([[semiconductor-devices/mosfets]]). Below about $2\,\mathrm{nm}$ two effects became serious.

**Gate tunnelling.** Electrons tunnel directly through a thin barrier with a probability that falls exponentially with its thickness, so gate leakage rises by roughly ten times for every $0.2\,\mathrm{nm}$ of thinning. At $1.2\,\mathrm{nm}$ of SiO$_2$, about five atomic layers, the leakage reached about $100\,\mathrm{A/cm^2}$ at $1\,\mathrm V$, unacceptable for low-power chips.

**Poly depletion and quantum confinement.** A polysilicon gate is a semiconductor, so even at $10^{20}\,\mathrm{cm^{-3}}$ it develops a thin depletion layer at its interface with the oxide; and the inversion electrons are confined in a potential well a few nanometres wide, so their charge centroid lies about $1\,\mathrm{nm}$ below the interface. Both add an effective series thickness of several tenths of a nanometre to the oxide.

The industry's answer, introduced at the 45 nm generation in 2007, was the **high-k metal gate**. A gate dielectric of permittivity $\varepsilon_{hk} = k\varepsilon_0$ and physical thickness $t_{hk}$ gives the same capacitance as SiO$_2$ of **equivalent oxide thickness**

$$
\mathrm{EOT} = t_{hk}\,\frac{3.9}{k},
$$ {#eq-eot}

so a hafnium-oxide layer ($k \approx 20$–$25$) a few nanometres thick has an EOT well below $1\,\mathrm{nm}$ while being physically thick enough to suppress tunnelling. A metal gate removes poly depletion. A thin SiO$_2$ interfacial layer, about $0.5\,\mathrm{nm}$, is kept between the silicon and the high-k film because it gives a much better interface. As of 2026 leading-edge logic uses HfO$_2$-based stacks with EOT below about $1\,\mathrm{nm}$.

::: application Flash memory and image sensors
Insert a second, isolated conductor (a **floating gate**) or a charge-trapping silicon-nitride layer into the oxide of a MOS structure, and charge placed there by tunnelling shifts the threshold voltage of the device by $\Delta V_{th} = -Q/C$, where $C$ is the capacitance between the trapped charge and the control gate. That shift, read by sensing whether the transistor conducts at a given gate voltage, is the bit of a flash memory; storing several distinct threshold levels per cell gives multi-level cells, and as of 2026 commercial 3D NAND stacks more than $200$ layers of such cells vertically. In a CCD or CMOS image sensor, photo-generated electrons are collected in the depletion well under a gate or in a pinned photodiode, and the charge is later transferred and read out; the MOS physics of this chapter, including deep depletion and interface-state generation (dark current), governs their performance.
:::

::: history
The idea of controlling the conductance of a semiconductor surface with a field through an insulator was patented by Julius Lilienfeld in 1926 and by Oskar Heil in 1934, but neither could make it work: surface states screened the field. John Bardeen's theory of surface states (1947) explained the failure, and the search for a clean surface led directly to the point-contact transistor. Carl Frosch and Lincoln Derick at Bell Laboratories found in 1955–1957 that a thermally grown oxide protects and passivates the silicon surface, and Mohamed Atalla's group showed in 1957–1959 that the thermal oxide reduces surface states enough for field control; Atalla and Dawon Kahng built the first MOSFET in 1959. The theory of the MOS capacitor and its C–V characteristics was worked out in the early 1960s by Terman, Grove, Deal, Snow and others; the identification of sodium as the cause of threshold instability (Snow, Grove, Deal and Sah, 1965) and the classification of oxide charges by Bruce Deal in 1980 made MOS technology reliable. Intel introduced hafnium-based high-k metal gates in production at the 45 nm node in 2007.
:::

## Where this leads

The MOSFET of [[semiconductor-devices/mosfets]] is a MOS capacitor with $\mathrm{n^+}$ source and drain regions on either side, which supply and drain the inversion electrons. Its current is the inversion charge [[#eq-qinv]] times a velocity, its threshold voltage is [[#eq-vth]] modified by the source–body voltage (the body effect), and its subthreshold behaviour follows from the exponential growth of $n_s$ with $\psi_s$ below threshold. The gate capacitance $C_{ox}$ per unit area reappears in the delay and power of CMOS logic in [[digital-ic/cmos-inverter]] and [[digital-ic/power-dissipation]]; gate oxides and high-k stacks are fabricated as described in [[digital-ic/cmos-fabrication]].

::: summary
- The MOS capacitor is a gate, an insulator of capacitance $C_{ox} = \varepsilon_{ox}/t_{ox}$ per unit area, and a semiconductor; the gate voltage divides between the oxide and the band bending $\psi_s$ at the surface.
- On p-type silicon the surface is in accumulation for $\psi_s < 0$, depletion for $0 < \psi_s < 2\phi_F$ and strong inversion for $\psi_s > 2\phi_F$, where $\phi_F = V_T\ln(N_A/n_i)$.
- In depletion, $W_d = \sqrt{2\varepsilon_s\psi_s/(qN_A)}$ and $V_G = V_{FB} + \psi_s + \sqrt{2q\varepsilon_sN_A\psi_s}/C_{ox}$; in strong inversion $\psi_s$ is pinned near $2\phi_F$.
- The threshold voltage is $V_{th} = V_{FB} + 2\phi_F + \sqrt{4q\varepsilon_sN_A\phi_F}/C_{ox}$, and above it the inversion charge is $-C_{ox}(V_G - V_{th})$.
- The flat-band voltage $V_{FB} = \phi_{ms} - Q_{ox}/C_{ox}$ absorbs the gate–semiconductor work-function difference and oxide charges.
- The C–V curve shows $C_{ox}$ in accumulation, a fall through depletion, and in inversion either a return to $C_{ox}$ (low frequency) or a minimum $C_{\min}$ set by $W_{d,\max}$ (high frequency); $C_{\max}$ and $C_{\min}$ give $t_{ox}$ and $N_A$.
- Very thin SiO$_2$ leaks by tunnelling; high-k dielectrics with metal gates provide sub-nanometre equivalent oxide thickness.
:::

## Exercises

::: exercise Oxide capacitance {level=1 check="3.9*8.854e-12/3e-9"}
Find $C_{ox}$ in $\mathrm{F/m^2}$ for a $3\,\mathrm{nm}$ SiO$_2$ gate oxide, and the capacitance of a gate $100\,\mathrm{nm}\times1\,\mathrm{\mu m}$.
::: solution
$C_{ox} = 3.9\times8.854\times10^{-12}/(3\times10^{-9}) = 1.151\times10^{-2}\,\mathrm{F/m^2} = 11.5\,\mathrm{fF/\mu m^2}$. The gate area is $0.1\,\mathrm{\mu m^2}$, so $C = 1.15\,\mathrm{fF}$.
:::
:::

::: exercise Fermi potential and maximum depletion width {level=1 check="sqrt(4*11.7*8.854e-12*0.02585*log(1e23/1e16)/(1.602e-19*1e23))"}
Find $\phi_F$ and $W_{d,\max}$ (in metres) for p-type silicon with $N_A = 10^{17}\,\mathrm{cm^{-3}}$ ($10^{23}\,\mathrm{m^{-3}}$).
::: solution
$\phi_F = 0.02585\ln(10^{7}) = 0.417\,\mathrm V$ and $W_{d,\max} = \sqrt{4\varepsilon_s\phi_F/(qN_A)} = \sqrt{4(1.036\times10^{-10})(0.417)/(1.602\times10^{-19}\times10^{23})}\,\mathrm m = 1.04\times10^{-7}\,\mathrm m$.
:::
:::

::: exercise Equivalent oxide thickness {level=1 check="0.5e-9 + 2.5e-9*3.9/22"}
A gate stack consists of $0.5\,\mathrm{nm}$ of SiO$_2$ under $2.5\,\mathrm{nm}$ of HfO$_2$ ($k = 22$). Find the EOT in metres.
::: solution
The layers are in series, so their EOTs add: $0.5 + 2.5\times3.9/22 = 0.5 + 0.443 = 0.943\,\mathrm{nm}$. The physical thickness is $3\,\mathrm{nm}$, more than three times the EOT, which is why tunnelling is so much lower than through $0.94\,\mathrm{nm}$ of SiO$_2$.
:::
:::

::: exercise Threshold shift from oxide charge {level=2 check="-1.602e-19*2e11/(3.9*8.854e-14/20e-7)"}
A capacitor with a $20\,\mathrm{nm}$ oxide is irradiated, and $2\times10^{11}\,\mathrm{cm^{-2}}$ positive charges become trapped near the interface. Find the threshold shift in volts. How would the shift change if the charge were at the middle of the oxide?
::: solution
$C_{ox} = 3.45\times10^{-13}/2\times10^{-6} = 1.73\times10^{-7}\,\mathrm{F/cm^2}$, so $\Delta V_{th} = -qN/C_{ox} = -(1.602\times10^{-19})(2\times10^{11})/(1.73\times10^{-7}) = -0.186\,\mathrm V$. Charge at the middle has weight $x/t_{ox} = \tfrac12$, so the shift would be $-0.093\,\mathrm V$. Thin oxides are naturally radiation-hard because the shift scales with $t_{ox}$ (and very thin oxides trap little charge).
:::
:::

::: exercise A p-channel threshold {level=2}
An n-type substrate with $N_D = 10^{17}\,\mathrm{cm^{-3}}$ has a $\mathrm{p^+}$ polysilicon gate ($\phi_m = \chi + E_g/q$) and a $10\,\mathrm{nm}$ oxide, with no oxide charge. Find $V_{FB}$ and $V_{th}$.
::: solution
For n-type material $\phi_s = \chi + E_g/2q - \abs{\phi_F}$ with $\abs{\phi_F} = 0.417\,\mathrm V$, so $\phi_{ms} = (\chi + 1.12) - (\chi + 0.56 - 0.417) = 0.977\,\mathrm V$ and $V_{FB} = +0.977\,\mathrm V$. Then $V_{th} = V_{FB} - 2\abs{\phi_F} - \abs{Q_{d,\max}}/C_{ox} = 0.977 - 0.833 - 0.482 = -0.338\,\mathrm V$. The $\mathrm{p^+}$ gate gives the p-channel device a threshold of similar magnitude to that of the n-channel device of [[#ex-vfb]], which is why dual-doped polysilicon gates were used in CMOS.
:::
:::

::: exercise Flat-band capacitance {level=2 check="1/(1+3.9*sqrt(11.7*8.854e-14*0.02585/(1.602e-19*1e16))/(11.7*20e-7))"}
Find $C_{FB}/C_{ox}$ for $N_A = 10^{16}\,\mathrm{cm^{-3}}$ and $t_{ox} = 20\,\mathrm{nm}$. Why is the flat-band voltage usually read from a C–V curve at $C = C_{FB}$ rather than by eye?
::: solution
$L_D = \sqrt{\varepsilon_sV_T/(qN_A)} = \sqrt{1.036\times10^{-12}\times0.02585/(1.602\times10^{-19}\times10^{16})} = 4.09\times10^{-6}\,\mathrm{cm}$ ($40.9\,\mathrm{nm}$). Then $C_{FB}/C_{ox} = 1/(1 + C_{ox}L_D/\varepsilon_s) = 1/(1 + (\varepsilon_{ox}/\varepsilon_s)(L_D/t_{ox})) = 1/(1 + (3.9/11.7)(40.9/20)) = 1/1.682 = 0.595$. The C–V curve has no feature at flat band — it falls smoothly from accumulation into depletion — so $V_{FB}$ is found as the voltage where $C$ equals the calculated $C_{FB}$.
:::
:::

::: exercise Pinning of the surface potential {level=3}
Using [[#eq-vg]] with only the depletion and inversion terms of [[#eq-qs-exact]], estimate how much $\psi_s$ rises above $2\phi_F$ when the gate voltage of the capacitor of [[#ex-vth-ideal]] exceeds threshold by $1\,\mathrm V$.
::: hint
In strong inversion $\abs{Q_s} \approx \sqrt{2\varepsilon_skTN_A}\sqrt{(n_i^2/N_A^2)e^{\psi_s/V_T}}$ once the inversion term dominates. Write $\psi_s = 2\phi_F + \delta$.
:::
::: solution
With $\psi_s = 2\phi_F + \delta$, $(n_i^2/N_A^2)e^{\psi_s/V_T} = e^{\delta/V_T}$, so the inversion term in $F^2$ is $e^{\delta/V_T}$ (the $-\psi_s/V_T - 1$ correction is negligible once it dominates) and the depletion term is about $2\phi_F/V_T = 32.2$. Then $\abs{Q_s} \approx \sqrt{2\varepsilon_skTN_A}\sqrt{32.2 + e^{\delta/V_T}}$, with $\sqrt{2\varepsilon_skTN_A} = \sqrt{8.58\times10^{-33}\times10^{17}} = 2.93\times10^{-8}\,\mathrm{C/cm^2}$. At threshold ($\delta = 0$) this is $2.93\times10^{-8}\times5.76 = 1.69\times10^{-7}$, matching $Q_{d,\max}$. One volt of overdrive adds $C_{ox}\times1\,\mathrm V = 3.45\times10^{-7}\,\mathrm{C/cm^2}$ (less the small $\delta$), so $\abs{Q_s} \approx 5.1\times10^{-7}$, $F \approx 17.5$, $F^2 \approx 306$, $e^{\delta/V_T} \approx 274$ and $\delta \approx 0.02585\ln274 = 0.145\,\mathrm V$. Correcting the overdrive for this $\delta$ ($1 - 0.145$ instead of $1$) and iterating gives $\delta \approx 0.14\,\mathrm V$. So one volt of overdrive raises $\psi_s$ by only about $0.14\,\mathrm V$, roughly $5V_T$: the pinning is strong but not perfect, and in accurate models the threshold condition is often taken as $\psi_s = 2\phi_F + $ a few $V_T$.
:::
:::

::: exercise Deep depletion and CCD wells {level=3}
A gate on p-type silicon ($N_A = 10^{15}\,\mathrm{cm^{-3}}$, $t_{ox} = 100\,\mathrm{nm}$, ideal $V_{FB} = 0$) is pulsed to $V_G = 10\,\mathrm V$ faster than any electrons can be generated. (a) Find the surface potential and depletion width immediately after the pulse. (b) Find the maximum number of electrons per square centimetre the well can store before inversion is reached, and the number for a $5\,\mathrm{\mu m}\times5\,\mathrm{\mu m}$ pixel.
::: hint
With no inversion charge, $V_G = \psi_s + \sqrt{2q\varepsilon_sN_A\psi_s}/C_{ox}$ holds for any $\psi_s$; it is a quadratic in $\sqrt{\psi_s}$.
:::
::: solution
(a) $C_{ox} = 3.45\times10^{-8}\,\mathrm{F/cm^2}$ and $\gamma \equiv \sqrt{2q\varepsilon_sN_A}/C_{ox} = \sqrt{2(1.602\times10^{-19})(1.036\times10^{-12})(10^{15})}/3.45\times10^{-8} = 1.822\times10^{-8}/3.45\times10^{-8} = 0.528\,\mathrm{V^{1/2}}$. Solving $u^2 + 0.528u - 10 = 0$ for $u = \sqrt{\psi_s}$: $u = (-0.528 + \sqrt{0.279 + 40})/2 = 2.909$, so $\psi_s = 8.46\,\mathrm V$ and $W_d = \sqrt{2\varepsilon_s\psi_s/(qN_A)} = \sqrt{2(1.036\times10^{-12})(8.46)/(1.602\times10^{-19}\times10^{15})} = 3.31\times10^{-4}\,\mathrm{cm} = 3.3\,\mathrm{\mu m}$, far more than $W_{d,\max} = 0.88\,\mathrm{\mu m}$ for this doping.

(b) Electrons collecting at the surface lower $\psi_s$ towards the inversion value $2\phi_F = 2(0.02585)\ln(10^{5}) = 0.595\,\mathrm V$. With $V_G$ fixed, $Q_n = -C_{ox}[V_G - \psi_s - \gamma\sqrt{\psi_s}]$ evaluated at $\psi_s = 0.595\,\mathrm V$: $V_G - 0.595 - 0.528\times0.771 = 10 - 0.595 - 0.407 = 9.00\,\mathrm V$, so $\abs{Q_n} = 3.45\times10^{-8}\times9.00 = 3.10\times10^{-7}\,\mathrm{C/cm^2}$, i.e. $1.94\times10^{12}$ electrons per square centimetre. A $25\,\mathrm{\mu m^2} = 2.5\times10^{-7}\,\mathrm{cm^2}$ pixel holds up to about $4.8\times10^{5}$ electrons — the "full-well capacity" of a CCD pixel is indeed of order $10^{5}$ electrons.
:::
:::
