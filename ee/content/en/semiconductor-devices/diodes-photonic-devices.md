The ideal diode equation of [[semiconductor-devices/pn-junction]] is one of the great successes of device physics, but measure a real silicon diode and you will find that it is not quite right. At low forward bias the current rises one decade per $120\,\mathrm{mV}$ rather than $60$; at high current it bends over; in reverse bias it does not saturate but creeps upwards with voltage, and it is thousands of times larger than $I_0$. Each discrepancy has a clear physical cause, and each matters in practice: leakage limits how long a DRAM cell holds its data and how dark a camera pixel's image is; series resistance limits power rectifiers; stored charge limits how fast a diode switches.

This chapter takes the junction into the real world in three steps. First we add **generation and recombination in the depletion region**, high injection, series resistance and charge storage to obtain the behaviour of real pn diodes. Second we study the **metal–semiconductor contact**, which can be either a fast, low-voltage **Schottky** rectifier or an **ohmic** contact with no rectification at all — every device needs ohmic contacts, so this is not optional. Third we let light in and out: the junction as a **photodiode**, as a **solar cell**, and as a **light-emitting diode**, where the band gap and the direct or indirect nature of the gap from [[semiconductor-devices/crystals-energy-bands]] decide everything. Silicon constants at $300\,\mathrm K$ are those of [[semiconductor-devices/carrier-statistics]].

## Real pn diodes

### Generation in the depletion region

In deriving the ideal diode equation we assumed no generation or recombination inside the depletion region. Under reverse bias that is a poor assumption. The depletion region is almost empty of carriers, so $np \ll n_i^2$, and by the Shockley–Read–Hall formula [[semiconductor-devices/carrier-transport#eq-srh]] the net rate $U$ is negative: traps there **generate** electron–hole pairs, and the field sweeps them out immediately as a current.

::: proposition Generation current {#prop-generation}
In a reverse-biased junction with $n, p \ll n_i$ throughout the depletion region and traps at midgap, the net generation rate is $G = n_i/(2\tau_0)$ with $\tau_0 = \tfrac12(\tau_{n0} + \tau_{p0})$, and the generation current is

$$
I_{\text{gen}} = \frac{qAn_iW}{2\tau_0},
$$ {#eq-igen}

where $W$ is the depletion width at the applied bias.
:::

::: proof
Put $n, p \to 0$ and $n_1 = p_1 = n_i$ (midgap traps) in [[semiconductor-devices/carrier-transport#eq-srh]]: $U = -n_i^2/[\tau_{p0}n_i + \tau_{n0}n_i] = -n_i/(\tau_{n0} + \tau_{p0}) = -n_i/(2\tau_0)$. Every pair generated in the volume $AW$ is separated by the field, the electron going to the n side and the hole to the p side, so the current is $q$ times the generation rate times the volume.
:::

Two features distinguish it from the ideal saturation current $I_0$. It is proportional to $n_i$, not $n_i^2$, so in silicon at room temperature it is far larger. And it grows with reverse voltage, because $W \propto \sqrt{V_{bi} - V_A}$: the reverse current does not saturate.

::: example Leakage of a real diode {#ex-leakage}
For the diode of [[semiconductor-devices/pn-junction#ex-diode]] ($1\,\mathrm{mm^2}$, $I_0 = 5.9\times10^{-14}\,\mathrm A$, $W = 0.906\,\mathrm{\mu m}$ at $-5\,\mathrm V$), take $\tau_0 = 1\,\mathrm{\mu s}$. Compare the generation current at $-5\,\mathrm V$ with $I_0$. How do they change on heating to $350\,\mathrm K$?
::: solution
By [[#eq-igen]],

$$
I_{\text{gen}} = \frac{(1.602\times10^{-19})(10^{-2}\,\mathrm{cm^2})(10^{10}\,\mathrm{cm^{-3}})(0.906\times10^{-4}\,\mathrm{cm})}{2\times10^{-6}\,\mathrm s} = 7.3\times10^{-10}\,\mathrm A,
$$

about $12\,000$ times $I_0$. At room temperature the reverse current of a silicon diode is almost entirely generation current. Heating to $350\,\mathrm K$ multiplies $n_i^2$, hence $I_0$, by about $770$ ([[semiconductor-devices/pn-junction]]), but $n_i$ only by $\sqrt{770} \approx 28$. The generation current still dominates at $350\,\mathrm K$ ($2\times10^{-8}$ against $4.6\times10^{-11}\,\mathrm A$), but the diffusion component catches up at a few hundred degrees Celsius. In germanium, with its much smaller gap, $n_i$ is so large that the diffusion current dominates even at room temperature.
:::
:::

### Recombination at low forward bias and the ideality factor

Under forward bias $np = n_i^2e^{V_A/V_T} > n_i^2$ in the depletion region and the traps there cause net **recombination**. The rate is largest where $n = p$, at which point $n = p = n_ie^{V_A/2V_T}$; inserting this into the SRH formula gives a peak rate of about $(n_i/2\tau_0)e^{V_A/2V_T}$, and integrating over the region gives

$$
I_{\text{rec}} \approx \frac{qAn_iW}{2\tau_0}\,e^{V_A/2V_T}
$$ {#eq-irec}

(a more careful integration changes the prefactor by a factor of order one, but not the exponent). This current grows only as $e^{V_A/2V_T}$, one decade per $119\,\mathrm{mV}$, but its prefactor is much larger than $I_0$, so it dominates at low forward bias. At higher bias the diffusion current, growing as $e^{V_A/V_T}$, overtakes it.

The measured characteristic is therefore summarised by an **ideality factor** $n$:

$$
I = I_S\left(e^{V_A/nV_T} - 1\right), \qquad 1 \le n \le 2,
$$ {#eq-ideality}

with $n \approx 2$ where recombination dominates, $n \approx 1$ where diffusion dominates, and $n$ rising back towards $2$ at **high injection**, when the injected minority concentration approaches the majority doping and the law of the junction becomes $p_n(x_n) \approx n_ie^{V_A/2V_T}$ (because now $n \approx p$ at the edge). At still higher currents the **series resistance** $R_s$ of the neutral regions and contacts takes over: the junction sees only $V_A - IR_s$, and the curve bends towards a straight line on a linear plot. Circuit simulators model the whole characteristic with $I_S$, $n$ and $R_s$ (SPICE parameters `IS`, `N`, `RS`).

::: widget plot
f: log10(5.9e-14*exp(x/0.02585)); log10(2e-10*10^(-t)*exp(x/(2*0.02585))); log10(5.9e-14*exp(x/0.02585) + 2e-10*10^(-t)*exp(x/(2*0.02585)))
x: 0, 0.75
y: -14, 0
sliders: t=0:-2:2:0.1
labels: \text{diffusion } (n=1); \text{recombination } (n=2); \text{total}
caption: Forward characteristic, $\log_{10} I$ (amperes) against $V_A$ (volts), of the $1\,\mathrm{mm^2}$ diode of the examples: the ideal diffusion current, the depletion-region recombination current for $W \approx 0.25\,\mathrm{\mu m}$ and lifetime $\tau_0 = 10^{t}\,\mathrm{\mu s}$, and their sum. With $\tau_0 = 1\,\mathrm{\mu s}$ the two components cross near $0.42\,\mathrm V$; below that the total has slope one decade per $119\,\mathrm{mV}$ ($n = 2$), above it one decade per $60\,\mathrm{mV}$ ($n = 1$). Shorten the lifetime ($t < 0$, a contaminated wafer): recombination dominates up to higher bias. Measuring the slope of such a plot is a quick test of material quality.
:::

### Switching and reverse recovery

A forward-biased diode stores minority charge $Q = \tau I_F$ in its neutral regions (the charge-control relation of [[semiconductor-devices/pn-junction]]). If the circuit suddenly reverses the voltage, the diode cannot block at once: as long as there is excess minority charge at the depletion edge, the law of the junction keeps the junction forward biased, and a large **reverse** current $I_R$, limited only by the external circuit, flows as the stored charge is pulled out. Only when the excess concentration at the edge has fallen to zero does the junction voltage reverse and the current decay to its leakage value. The duration of the constant-current phase is the **storage time**. A charge-control analysis, in which the stored charge obeys $\mathrm dQ/\mathrm dt = i - Q/\tau$, gives for a long diode

$$
t_s \approx \tau\ln\left(1 + \frac{I_F}{I_R}\right).
$$ {#eq-storage}

With $\tau = 1\,\mathrm{\mu s}$ and $I_F = I_R = 10\,\mathrm{mA}$, $t_s = 0.69\,\mathrm{\mu s}$. A rectifier on a $50\,\mathrm{Hz}$ supply does not care; a diode in a $100\,\mathrm{kHz}$ switching converter, whose $10\,\mathrm{\mu s}$ period this would seriously disturb, does. **Fast-recovery diodes** are made with lifetimes reduced to nanoseconds by gold or platinum doping or by electron irradiation, at the price of more leakage; Schottky diodes, which store almost no minority charge, avoid the problem altogether.

## Metal–semiconductor contacts

Every device must be connected to metal wires. Whether a metal–semiconductor contact rectifies or conducts freely in both directions depends on the energy barrier that forms between them.

::: definition Work function and electron affinity {#def-workfunction}
The **vacuum level** $E_0$ is the energy of an electron at rest just outside the material. The **work function** $q\phi$ is the energy needed to take an electron from the Fermi level to the vacuum level, $q\phi = E_0 - E_F$. The **electron affinity** $q\chi$ of a semiconductor is the energy from the bottom of the conduction band to the vacuum level, $q\chi = E_0 - E_c$; it does not depend on doping. For silicon $\chi = 4.05\,\mathrm V$. Typical metal work functions are $\phi_m = 4.1\,\mathrm V$ (Al), $4.55\,\mathrm V$ (W), $5.1\,\mathrm V$ (Au) and $5.65\,\mathrm V$ (Pt).
:::

When a metal is brought into contact with n-type silicon whose work function $\phi_s$ is smaller than $\phi_m$, electrons flow from the semiconductor into the metal until the Fermi levels align. The electrons leave behind ionised donors, so a depletion region forms in the semiconductor — just as on the n side of a $\mathrm{p^+n}$ junction, with the metal playing the role of the very heavily doped side — and the bands bend up towards the interface. Electrons in the metal see a barrier of height $q\phi_B$ to enter the semiconductor; electrons in the semiconductor see the built-in barrier $qV_{bi}$.

::: theorem Schottky–Mott barrier {#thm-schottky-mott}
In the ideal model, with no interface states, the barrier height between a metal and an n-type semiconductor is

$$
\phi_{Bn} = \phi_m - \chi,
$$ {#eq-phib}

and the built-in potential is $V_{bi} = \phi_{Bn} - (E_c - E_F)/q$. For a p-type semiconductor the hole barrier is $\phi_{Bp} = E_g/q - (\phi_m - \chi)$.
:::

::: proof
At the interface the vacuum level is continuous, so the conduction-band edge of the semiconductor lies $q\chi$ below it and the metal Fermi level $q\phi_m$ below it; their difference, $q(\phi_m - \chi)$, is the barrier seen from the metal. Deep in the semiconductor $E_c$ lies $E_c - E_F$ above the common Fermi level, while at the interface it lies $q\phi_{Bn}$ above it, so the bands bend by $q\phi_{Bn} - (E_c - E_F) = qV_{bi}$. For holes the barrier is measured from $E_F$ down to $E_v$ at the interface, which is $E_g - q\phi_{Bn}$.
:::

In practice the Schottky–Mott rule works poorly for silicon and most covalent semiconductors. Measured barriers on n-type silicon range only from about $0.5$ to $0.9\,\mathrm{V}$ although metal work functions range much more widely, because **interface states** in the gap pin the Fermi level near a characteristic energy roughly one third of the gap above $E_v$. Barrier heights are therefore taken from measurement: about $0.70\,\mathrm V$ for Al, $0.67$ for W, $0.80$ for Au, and $0.6$–$0.85$ for the metal silicides used in integrated circuits (TiSi$_2$ about $0.6$, PtSi about $0.85$).

### The Schottky diode

Current in a Schottky diode is carried by **majority carriers**: electrons in the semiconductor with enough thermal energy to pass over the barrier enter the metal. The process is **thermionic emission**, the same physics as emission from a hot cathode.

::: theorem Thermionic-emission current {#thm-thermionic}
For a Schottky contact on n-type silicon with barrier $\phi_{Bn}$,

$$
I = AA^{**}T^2e^{-\phi_{Bn}/V_T}\left(e^{V_A/V_T} - 1\right),
$$ {#eq-thermionic}

where $A$ is the area and $A^{**}$ the effective **Richardson constant**, $120(m^*/m_0)\,\mathrm{A\,cm^{-2}K^{-2}}$ for free electrons and about $110\,\mathrm{A\,cm^{-2}K^{-2}}$ for electrons in n-type silicon.
:::

A sketch of the derivation: the electrons in the semiconductor with enough kinetic energy towards the interface to surmount the barrier have a Boltzmann population proportional to $e^{-(\phi_{Bn} - V_A)/V_T}$; integrating their velocity over the half-Maxwellian gives the flux $A^{**}T^2e^{-(\phi_{Bn} - V_A)/V_T}/q$. The flow from metal to semiconductor faces the fixed barrier $\phi_{Bn}$ and is unchanged by bias; it equals the forward flow at $V_A = 0$, which gives the $-1$. The full theory, including image-force lowering of the barrier and tunnelling through it, is in Sze and Ng.

Two practical differences from a pn diode follow. The saturation current is very much larger, so the forward voltage at a given current is several tenths of a volt lower. And since no minority carriers are injected there is essentially no stored charge, so Schottky diodes switch in picoseconds.

::: example Schottky versus pn diode {#ex-schottky}
A tungsten-silicide Schottky diode on n-type silicon has $\phi_{Bn} = 0.70\,\mathrm V$, $A^{**} = 110\,\mathrm{A\,cm^{-2}K^{-2}}$ and area $1\,\mathrm{mm^2}$. Find its saturation current and the forward voltage at $1\,\mathrm{mA}$, and compare with the pn diode of the same area from [[semiconductor-devices/pn-junction#ex-diode]] ($0.609\,\mathrm V$). If $N_D = 10^{16}\,\mathrm{cm^{-3}}$, what is $V_{bi}$?
::: solution
The saturation current density is

$$
J_S = A^{**}T^2e^{-\phi_{Bn}/V_T} = 110\times(300)^2\times e^{-0.70/0.02585}\,\mathrm{A/cm^2} = 9.9\times10^{6}\times1.74\times10^{-12} = 1.72\times10^{-5}\,\mathrm{A/cm^2},
$$

so $I_S = 1.72\times10^{-7}\,\mathrm A$ for $10^{-2}\,\mathrm{cm^2}$, three million times the pn diode's $I_0$. At $1\,\mathrm{mA}$, $V_A = V_T\ln(10^{-3}/1.72\times10^{-7}) = 0.02585\times8.67 = 0.224\,\mathrm V$, nearly $0.39\,\mathrm V$ less than the pn diode. With $E_c - E_F = 0.209\,\mathrm V$ for $10^{16}\,\mathrm{cm^{-3}}$ ([[semiconductor-devices/carrier-statistics#ex-ionisation]]), $V_{bi} = 0.70 - 0.21 = 0.49\,\mathrm V$. The price is a reverse leakage of $0.17\,\mathrm{\mu A}$ — large and, through $T^2e^{-\phi_B/V_T}$, strongly temperature dependent. Schottky rectifiers are the choice for low-voltage, high-current power supplies, where saving $0.3$–$0.4\,\mathrm V$ of forward drop at tens of amperes matters more than leakage.
:::
:::

### Ohmic contacts

An **ohmic contact** is one whose resistance is negligible compared with the device it connects, in both directions of current. There are two ways to make one. If the metal work function is smaller than that of an n-type semiconductor, the bands bend **down** at the interface, electrons accumulate, and there is no barrier at all. Fermi-level pinning makes this hard to achieve in silicon, so the standard method is the second: dope the semiconductor so heavily under the contact ($10^{20}\,\mathrm{cm^{-3}}$ or more) that the depletion region is only a few nanometres thick, and electrons **tunnel** straight through the barrier. A contact is characterised by its **specific contact resistivity** $\rho_c$ (in $\Omega\,\mathrm{cm^2}$); the resistance of a contact of area $A_c$ is $\rho_c/A_c$. With $\rho_c \approx 10^{-8}\,\Omega\,\mathrm{cm^2}$, typical of silicided contacts on heavily doped silicon, a contact $20\,\mathrm{nm}\times20\,\mathrm{nm}$ would have $\rho_c/A_c = 10^{-8}/(4\times10^{-12}) = 2.5\,\mathrm{k\Omega}$ — comparable with the transistor itself. As of 2026, contact resistance is one of the main limits on the performance of the most advanced logic transistors, and $\rho_c$ well below $10^{-9}\,\Omega\,\mathrm{cm^2}$ is the target.

::: quiz
Why does a Schottky diode switch much faster than a pn diode?
- [ ] Its depletion region is thinner, so its capacitance is smaller.
- [x] Its current is carried by majority carriers, so almost no minority charge is stored that must be removed.
- [ ] Its barrier is lower, so the voltage swing is smaller.
- [ ] Electrons move faster in metals than in semiconductors.
::: solution
In a pn diode the forward current is sustained by injected minority carriers that take a lifetime (or a transit time) to disappear; reverse recovery is the time taken to remove them. In a Schottky diode the electrons crossing the barrier are majority carriers in the semiconductor and simply become part of the electron sea in the metal within about $10^{-13}\,\mathrm s$. Only the depletion capacitance must be charged, and that is fast.
:::
:::

## Light and semiconductors

A photon of energy $h\nu \ge E_g$ can be absorbed by lifting an electron from the valence band to the conduction band, creating an electron–hole pair. In the other direction, an electron and hole that recombine radiatively emit a photon of energy close to $E_g$. These two processes are the basis of all semiconductor optoelectronics.

### Absorption

A beam of photon flux $\Phi_0$ (photons per unit area per second) entering a semiconductor is attenuated exponentially, $\Phi(x) = \Phi_0e^{-\alpha x}$, where the **absorption coefficient** $\alpha$ depends strongly on wavelength. Its reciprocal is the **penetration depth**. In silicon, whose gap is indirect, $\alpha$ rises slowly above the gap: about $64\,\mathrm{cm^{-1}}$ at $1000\,\mathrm{nm}$ (penetration depth $156\,\mathrm{\mu m}$), $850\,\mathrm{cm^{-1}}$ at $800\,\mathrm{nm}$ ($12\,\mathrm{\mu m}$), and $1.1\times10^{4}\,\mathrm{cm^{-1}}$ at $500\,\mathrm{nm}$ ($0.9\,\mathrm{\mu m}$). In direct-gap GaAs, $\alpha$ jumps to about $10^{4}\,\mathrm{cm^{-1}}$ just above the gap. That is why a crystalline silicon solar cell must be $100$–$200\,\mathrm{\mu m}$ thick to absorb the red and near-infrared, whereas a GaAs cell absorbs the same light in a couple of micrometres.

### Photodiodes

Light absorbed in or near the depletion region of a reverse-biased junction generates pairs that the field separates: electrons are swept to the n side and holes to the p side. Pairs generated within about a diffusion length of the depletion region can also diffuse to its edge and be collected. The result is a **photocurrent** $I_L$ flowing in the reverse direction, proportional to the optical power.

::: definition Quantum efficiency and responsivity {#def-responsivity}
The **external quantum efficiency** $\eta$ of a photodetector is the number of electrons of photocurrent per incident photon. Its **responsivity** is the photocurrent per unit optical power,

$$
\mathcal R = \frac{I_L}{P_{\text{opt}}} = \frac{\eta q}{h\nu} = \eta\frac{\lambda}{1.240\,\mathrm{\mu m}}\ \mathrm{A/W}.
$$ {#eq-responsivity}
:::

::: example A data-link photodiode {#ex-photodiode}
A silicon photodiode with quantum efficiency $\eta = 0.8$ at $850\,\mathrm{nm}$ receives $1\,\mathrm{\mu W}$. Find its responsivity and photocurrent, and the minimum depletion width that absorbs at least $57\,\%$ of the light that enters if the absorption coefficient is $850\,\mathrm{cm^{-1}}$.
::: solution
By [[#eq-responsivity]], $\mathcal R = 0.8\times0.850/1.240 = 0.548\,\mathrm{A/W}$, so $I_L = 0.548\,\mathrm{\mu A}$. The fraction absorbed in a depth $d$ is $1 - e^{-\alpha d}$; for $57\,\%$ we need $\alpha d = \ln(1/0.43) = 0.84$, so $d = 0.84/850\,\mathrm{cm} = 10\,\mathrm{\mu m}$. A depletion region that wide needs a very lightly doped intrinsic layer between the p and n regions: this is the **p-i-n photodiode**. With $10^{13}\,\mathrm{cm^{-3}}$ residual doping the layer is fully depleted at less than $1\,\mathrm V$, and carriers cross it at about $v_{\text{sat}}$ in $10\,\mu\mathrm m/(10^{7}\,\mathrm{cm/s}) = 0.1\,\mathrm{ns}$. Making the layer thicker improves efficiency but slows the detector: the classic responsivity–bandwidth trade-off of photodetectors, developed in [[photonics/photodetectors]].
:::
:::

::: widget plot
f: if(x < 1.240/g, e*x/1.240, 0); x/1.240
x: 0.3, 1.9
y: 0, 1.6
sliders: e=0.8:0.1:1:0.01; g=1.12:0.6:1.5:0.01
labels: \mathcal R(\lambda)\ (\mathrm{A/W}); \eta = 1
caption: Responsivity of an idealised photodiode against wavelength in micrometres, for quantum efficiency $\eta$ (slider $e$) and band gap $E_g$ (slider $g$, in eV), from [[#eq-responsivity]]. Each photon gives at most one electron, so longer-wavelength photons, which carry less energy, give more current per watt — up to the cut-off $\lambda_c = 1.240/E_g$, beyond which the material is transparent. Try $g = 1.12$ (silicon), $0.66$ (germanium) and $0.75$ (InGaAs, the material of fibre-optic receivers). Real silicon responsivity falls off gradually before the cut-off because the indirect gap absorbs weakly there.
:::

The **avalanche photodiode** operates close to breakdown, where impact ionisation multiplies each photogenerated carrier by a gain of $10$–$100$; it is used when the signal is so weak that amplifier noise would otherwise dominate. Biased **above** breakdown and quenched after each event, it detects single photons (a single-photon avalanche diode), as in the lidar sensors of phones and cars.

### Solar cells

A solar cell is a photodiode with no bias supply: it is a large-area junction that delivers power to a load. The photocurrent flows from n to p inside the cell, which is the direction of reverse current, and adds to the ordinary diode current:

$$
I = I_0\left(e^{V/V_T} - 1\right) - I_L,
$$ {#eq-solar}

with $V$ and $I$ in the passive (diode) convention. In the fourth quadrant of the I–V plane, $V > 0$ and $I < 0$, the cell delivers power. Two points define the characteristic.

::: definition Solar-cell figures of merit {#def-solar}
The **short-circuit current** is $I_{sc} = I_L$ (at $V = 0$). The **open-circuit voltage** is the voltage at $I = 0$,

$$
V_{oc} = V_T\ln\left(\frac{I_L}{I_0} + 1\right).
$$ {#eq-voc}

The **fill factor** is $FF = P_{\max}/(V_{oc}I_{sc})$, where $P_{\max} = V_{mp}I_{mp}$ is the largest power the cell can deliver, at the **maximum power point**. The **efficiency** is $P_{\max}/P_{\text{in}}$, with the standard incident irradiance $P_{\text{in}} = 100\,\mathrm{mW/cm^2}$ (AM1.5G spectrum, $25\,^\circ\mathrm C$).
:::

The open-circuit voltage is the point where the photocurrent is exactly cancelled by the forward diode current; physically, it is the separation of the quasi-Fermi levels that the light produces. A good cell needs a small $I_0$: long lifetimes and good surface passivation.

::: example A silicon solar cell {#ex-solar}
A silicon cell has $J_{sc} = 40\,\mathrm{mA/cm^2}$ under standard illumination and $J_0 = 10^{-12}\,\mathrm{A/cm^2}$. Find $V_{oc}$, the maximum power point, the fill factor and the efficiency, assuming ideal-diode behaviour and no series resistance. What $J_0$ would raise $V_{oc}$ to $0.70\,\mathrm V$?
::: solution
By [[#eq-voc]],

$$
V_{oc} = 0.02585\ln\left(\frac{0.040}{10^{-12}}\right) = 0.02585\times24.41 = 0.631\,\mathrm V.
$$

The delivered power density is $P(V) = V[J_{sc} - J_0(e^{V/V_T} - 1)]$. Setting $\mathrm dP/\mathrm dV = 0$ gives $J_{sc} + J_0 = J_0e^{V/V_T}(1 + V/V_T)$, solved numerically: $V_{mp} = 0.551\,\mathrm V$, $J_{mp} = 38.2\,\mathrm{mA/cm^2}$, so

$$
P_{\max} = 0.551\times38.2 = 21.0\,\mathrm{mW/cm^2}, \qquad FF = \frac{21.0}{0.631\times40} = 0.834, \qquad \eta = \frac{21.0}{100} = 21.0\,\%.
$$

(The empirical formula $FF = [v_{oc} - \ln(v_{oc} + 0.72)]/(v_{oc} + 1)$ with $v_{oc} = V_{oc}/V_T = 24.4$ gives the same $0.834$.) For $V_{oc} = 0.70\,\mathrm V$ we need $J_0 = J_{sc}/(e^{0.70/V_T} - 1) = 0.040/5.8\times10^{11} = 6.9\times10^{-14}\,\mathrm{A/cm^2}$, fourteen times smaller: this is what passivated-contact and heterojunction cell designs achieve.
:::
:::

::: widget plot
f: L - 1000*10^c*(exp(x/0.02585) - 1); x*(L - 1000*10^c*(exp(x/0.02585) - 1))
x: 0, 0.75
y: 0, 45
sliders: L=40:10:45:0.5; c=-12:-14:-10:0.1
labels: J\ (\mathrm{mA/cm^2}); P\ (\mathrm{mW/cm^2})
caption: Current density delivered by a solar cell (in $\mathrm{mA/cm^2}$) and power density (in $\mathrm{mW/cm^2}$) against terminal voltage, for photocurrent $L$ and saturation current $J_0 = 10^{c}\,\mathrm{A/cm^2}$. Hover on the peak of the power curve to read the maximum power point; at $L = 40$, $c = -12$ it is about $21\,\mathrm{mW/cm^2}$ at $0.55\,\mathrm V$. Lower $c$ by one: $V_{oc}$ rises by $60\,\mathrm{mV}$ and the efficiency by about two percentage points. Halve the light ($L = 20$): the current halves but $V_{oc}$ falls by only $18\,\mathrm{mV}$.
:::

::: remark The limits of single-junction cells
Photons with $h\nu < E_g$ are not absorbed, and those with $h\nu > E_g$ waste their excess energy as heat when the carriers relax to the band edges. Balancing these losses, together with the unavoidable radiative recombination, gives the **Shockley–Queisser limit**, about $33\,\%$ for the best gap of $1.3$–$1.4\,\mathrm{eV}$ and about $32\,\%$ for silicon's $1.12\,\mathrm{eV}$; Auger recombination lowers the practical limit for silicon to about $29\,\%$. As of 2026 the best laboratory silicon cells are just under $28\,\%$ and commercial modules $21$–$24\,\%$; perovskite-on-silicon tandem cells, which split the spectrum between two gaps, have exceeded $34\,\%$ in the laboratory.
:::

### Light-emitting diodes

Forward-bias a junction in a direct-gap semiconductor and the injected minority carriers recombine radiatively, emitting photons of energy close to $E_g$. That is a **light-emitting diode**. Its efficiency is a product of factors:

$$
\eta_{\text{ext}} = \eta_{\text{inj}}\,\eta_{\text{rad}}\,\eta_{\text{extr}},
$$ {#eq-led-efficiency}

the fraction of the current injected into the active layer, the fraction of recombination there that is radiative (rather than SRH or Auger), and the fraction of generated photons that escape from the chip. The **wall-plug efficiency** — optical power out over electrical power in — is $\eta_{\text{ext}}\,h\nu/(qV_F)$.

Silicon is hopeless as an LED: its indirect gap makes radiative recombination so slow that SRH recombination wins almost every time ($\eta_{\text{rad}} \sim 10^{-6}$). Modern LEDs use **heterostructures** of direct-gap compound semiconductors: a thin **quantum-well** active layer of smaller gap sandwiched between layers of larger gap, which traps both electrons and holes in the same thin region and makes radiative recombination fast. Red and amber LEDs use AlGaInP on GaAs; blue and green LEDs use InGaN quantum wells in GaN, with the emission wavelength set by the indium content. A **white LED** is a blue LED coated with a yellow-emitting phosphor (cerium-doped yttrium aluminium garnet).

Extraction is a serious problem because semiconductors have high refractive indices. Light reaching the top surface at more than the critical angle $\theta_c = \arcsin(1/n_r)$ is totally internally reflected, so only rays inside an **escape cone** leave the chip.

::: example Extraction from a GaN LED {#ex-led}
(a) For GaN ($n_r = 2.4$) emitting into air, find the critical angle and the fraction of isotropically emitted light that falls inside the escape cone of one face (neglect Fresnel reflection). (b) A blue LED at $470\,\mathrm{nm}$ ($h\nu = 2.64\,\mathrm{eV}$) operates at $3.0\,\mathrm V$ with external quantum efficiency $70\,\%$. Find its wall-plug efficiency.
::: solution
(a) $\theta_c = \arcsin(1/2.4) = 24.6^\circ$. The fraction of the full sphere of directions inside a cone of half-angle $\theta_c$ is the solid angle over $4\pi$:

$$
\frac{2\pi(1 - \cos\theta_c)}{4\pi} = \frac{1 - \cos24.6^\circ}{2} = \frac{1 - 0.909}{2} = 0.045.
$$

Only $4.5\,\%$ of the light escapes through a flat top face (for GaAs, $n_r = 3.5$, it is $2.1\,\%$). Real LEDs reach extraction efficiencies of $80\,\%$ or more by roughening or patterning the surfaces, shaping the chip, using reflective back contacts and encapsulating in a dome of high-index epoxy or silicone, so that light gets many chances to escape.

(b) $\eta_{\text{wp}} = \eta_{\text{ext}}h\nu/(qV_F) = 0.70\times2.64/3.0 = 0.62$. Sixty-two per cent of the electrical power leaves as blue light; the rest heats the chip. The forward voltage exceeds $h\nu/q$ because of series resistance and the energy that carriers lose entering the quantum wells.
:::
:::

::: application Lasers, and why LEDs need direct gaps
If the injected carrier density is high enough that the quasi-Fermi-level separation $F_n - F_p$ exceeds the photon energy, stimulated emission outweighs absorption and the junction provides optical **gain**. Put it in a resonant cavity — the cleaved facets of the chip are mirrors with about $30\,\%$ reflectance — and above a threshold current it lases. Semiconductor lasers drive fibre-optic communication, data-centre links, barcode scanners and lidar; they are covered in [[photonics/light-sources]]. Like LEDs they are made from direct-gap materials, for the same reason: in silicon the slow radiative rate cannot win against the competing losses. Silicon photonics, which builds waveguides, modulators and germanium detectors on silicon chips, obtains its light from III–V lasers bonded onto the silicon.
:::

::: history
Ferdinand Braun reported rectification at metal–sulphide point contacts in 1874, and crystal detectors of galena or silicon with a "cat's whisker" were used in radio receivers from about 1906. Walter Schottky in 1938 and Nevill Mott in 1939 explained rectification by a barrier in the semiconductor; John Bardeen's 1947 theory of surface states explained why barrier heights depend so weakly on the metal. The silicon solar cell was announced by Daryl Chapin, Calvin Fuller and Gerald Pearson at Bell Laboratories in 1954, with an efficiency of about $6\,\%$, and powered the Vanguard 1 satellite in 1958. Electroluminescence from silicon carbide was observed by Henry Round in 1907 and studied by Oleg Losev in the 1920s; the first visible-light LED, of GaAsP, was made by Nick Holonyak at General Electric in 1962. Efficient blue LEDs based on GaN, made possible by Isamu Akasaki and Hiroshi Amano's growth of high-quality GaN and p-type doping (1989) and by Shuji Nakamura's work at Nichia (1993), earned the three the 2014 Nobel Prize in Physics. William Shockley and Hans-Joachim Queisser published their efficiency limit in 1961.
:::

## Where this leads

The bipolar transistor of [[semiconductor-devices/bipolar-transistors]] is two pn junctions sharing a thin base; the generation and recombination currents of this chapter limit its gain at low current, and charge storage limits its switching speed. Schottky contacts reappear as the clamps that keep bipolar logic out of saturation and as the gates of GaAs and GaN field-effect transistors; ohmic contacts and their resistance are a central concern in [[semiconductor-devices/mosfets]] and [[digital-ic/cmos-fabrication]]. Photodiodes, LEDs, lasers and solar cells are developed at the system level in [[photonics]], including [[photonics/photodetectors]], [[photonics/light-sources]] and [[photonics/photovoltaics]]. Diode circuits — rectifiers, clamps, regulators — are the subject of [[electronics-1/diode-circuits]], and the converters that use Schottky and fast-recovery diodes appear in [[power-electronics]].

::: summary
- Real silicon diodes leak mainly by generation in the depletion region, $I_{\text{gen}} = qAn_iW/2\tau_0$, proportional to $n_i$ and growing with reverse voltage; it exceeds the ideal $I_0$ by orders of magnitude at room temperature.
- In forward bias, depletion-region recombination gives a current $\propto e^{V/2V_T}$ that dominates at low bias; the characteristic is summarised by $I = I_S(e^{V/nV_T} - 1)$ with ideality factor $1 \le n \le 2$, plus series resistance at high current.
- Stored minority charge causes reverse recovery, with storage time $t_s \approx \tau\ln(1 + I_F/I_R)$.
- A metal on a semiconductor forms a Schottky barrier ($\phi_B = \phi_m - \chi$ ideally, but pinned in practice); Schottky diodes conduct by thermionic emission of majority carriers, with low forward voltage, high leakage and no charge storage.
- Ohmic contacts are made by tunnelling through a thin barrier on heavily doped semiconductor; their specific resistivity $\rho_c$ limits advanced devices.
- Photodiodes convert photons to current with responsivity $\eta\lambda/1.24\,\mathrm{A/W}$ ($\lambda$ in µm) up to the cut-off $\lambda_c = 1.24/E_g$.
- A solar cell obeys $I = I_0(e^{V/V_T} - 1) - I_L$; $V_{oc} = V_T\ln(I_L/I_0 + 1)$, and the efficiency is set by $J_{sc}$, $V_{oc}$ and the fill factor.
- LEDs need direct-gap materials; their external efficiency is the product of injection, radiative and extraction efficiencies, and extraction is limited by total internal reflection.
:::

## Exercises

::: exercise Generation current density {level=1 check="1.602e-19*1e10*2e-4/(2*1e-5)*1e4"}
A reverse-biased silicon junction has a depletion width of $2\,\mathrm{\mu m}$ and an effective generation lifetime $\tau_0 = 10\,\mathrm{\mu s}$. Find the generation current density, in $\mathrm{A/m^2}$.
::: solution
$J_{\text{gen}} = qn_iW/(2\tau_0) = (1.602\times10^{-19})(10^{10})(2\times10^{-4})/(2\times10^{-5}) = 1.6\times10^{-8}\,\mathrm{A/cm^2} = 1.6\times10^{-4}\,\mathrm{A/m^2}$.
:::
:::

::: exercise Responsivity {level=1 check="0.9*1.55/1.240"}
An InGaAs photodiode has quantum efficiency $0.9$ at $1550\,\mathrm{nm}$. What is its responsivity in $\mathrm{A/W}$?
::: solution
$\mathcal R = \eta\lambda/1.240 = 0.9\times1.55/1.240 = 1.125\,\mathrm{A/W}$. Responsivities above $1\,\mathrm{A/W}$ are possible because each $0.8\,\mathrm{eV}$ photon carries less than $1\,\mathrm{eV}$ of energy.
:::
:::

::: exercise Barrier height from Schottky–Mott {level=1}
Using the ideal Schottky–Mott rule, find the barrier heights of aluminium ($\phi_m = 4.1\,\mathrm V$) and platinum ($5.65\,\mathrm V$) on n-type silicon, and the hole barrier of platinum on p-type silicon. Comment on the measured values ($0.70$ and $0.9\,\mathrm V$ on n-type).
::: solution
Al: $4.1 - 4.05 = 0.05\,\mathrm V$, which would be essentially ohmic. Pt: $5.65 - 4.05 = 1.60\,\mathrm V$, larger than the gap, which is impossible; the corresponding hole barrier on p-type would be $1.12 - 1.60 < 0$. The measured $0.70$ and $0.9\,\mathrm V$ show strong Fermi-level pinning: the barrier depends on the metal only weakly.
:::
:::

::: exercise Ideality factor from data {level=2 check="(0.30-0.20)/(0.02585*log(12.3/1.86))"}
A diode carries $1.86\,\mathrm{nA}$ at $0.20\,\mathrm V$ and $12.3\,\mathrm{nA}$ at $0.30\,\mathrm V$. Find the ideality factor in this range, and say which current mechanism dominates.
::: solution
$n = \Delta V/(V_T\ln(I_2/I_1)) = 0.10/(0.02585\ln6.61) = 0.10/(0.02585\times1.889) = 2.05$. The current is dominated by recombination in the depletion region (the expected $n = 2$).
:::
:::

::: exercise Storage time {level=2 check="2e-6*log(1+20/5)"}
A diode with lifetime $2\,\mathrm{\mu s}$ conducts $20\,\mathrm{mA}$ and is suddenly switched so that a reverse current of $5\,\mathrm{mA}$ is drawn. Estimate the storage time in seconds. How much faster would it be with $I_R = 20\,\mathrm{mA}$?
::: solution
$t_s = \tau\ln(1 + I_F/I_R) = 2\,\mathrm{\mu s}\times\ln5 = 3.2\,\mathrm{\mu s}$. With $I_R = 20\,\mathrm{mA}$, $t_s = 2\ln2 = 1.39\,\mathrm{\mu s}$: pulling the charge out harder empties the diode faster.
:::
:::

::: exercise Solar cell temperature dependence {level=2}
The cell of [[#ex-solar]] heats to $60\,^\circ\mathrm C$ ($333\,\mathrm K$) in the sun. Taking $J_0 \propto T^3e^{-E_g/kT}$ and $J_{sc}$ unchanged, find the new $V_{oc}$ and the change per kelvin.
::: solution
$J_0(333)/J_0(300) = (333/300)^3\exp[-12\,997(1/333 - 1/300)] = 1.368\times e^{4.293} = 1.368\times73.2 = 100$. So $J_0 = 1.0\times10^{-10}\,\mathrm{A/cm^2}$, $V_T = 0.02870\,\mathrm V$ and $V_{oc} = 0.02870\ln(0.040/10^{-10}) = 0.02870\times19.81 = 0.568\,\mathrm V$. The fall is $63\,\mathrm{mV}$ over $33\,\mathrm K$, about $-1.9\,\mathrm{mV/K}$, or $-0.3\,\%$ per kelvin relative. This is why solar panels produce less power on hot days.
:::
:::

::: exercise Ohmic contact design {level=2 check="1e-8/(0.5*1e-6)^2*1e4"}
A contact to a heavily doped source has $\rho_c = 10^{-8}\,\Omega\,\mathrm{cm^2}$. Find the resistance, in ohms, of a square contact $0.5\,\mathrm{\mu m}$ on a side, and the side length that gives $100\,\Omega$.
::: solution
$A_c = (0.5\times10^{-4})^2 = 2.5\times10^{-9}\,\mathrm{cm^2}$, so $R = 10^{-8}/2.5\times10^{-9} = 4\,\Omega$. For $100\,\Omega$, $A_c = 10^{-10}\,\mathrm{cm^2}$, a side of $10^{-5}\,\mathrm{cm} = 0.1\,\mathrm{\mu m}$. Resistance rises as the inverse square of the dimension, which is why contacts are a scaling bottleneck.
:::
:::

::: exercise Maximum power point {level=3}
(a) Show that the maximum power point of an ideal solar cell satisfies $e^{v_{mp}}(1 + v_{mp}) = 1 + J_{sc}/J_0$, with $v_{mp} = V_{mp}/V_T$. (b) Show that, approximately, $V_{mp} \approx V_{oc} - V_T\ln(1 + V_{oc}/V_T)$. (c) Check (b) against [[#ex-solar]].
::: solution
(a) $P = V[J_{sc} - J_0(e^{V/V_T} - 1)]$. $\mathrm dP/\mathrm dV = J_{sc} + J_0 - J_0e^{V/V_T} - (V/V_T)J_0e^{V/V_T} = 0$, i.e. $e^{v}(1 + v) = 1 + J_{sc}/J_0 = e^{v_{oc}}$.

(b) Taking logarithms, $v_{mp} = v_{oc} - \ln(1 + v_{mp}) \approx v_{oc} - \ln(1 + v_{oc})$, since the logarithm varies slowly.

(c) $v_{oc} = 24.41$, so $v_{mp} \approx 24.41 - \ln25.41 = 24.41 - 3.235 = 21.18$ and $V_{mp} \approx 0.5474\,\mathrm V$. One more iteration, $24.41 - \ln(22.18) = 21.31$, gives $0.551\,\mathrm V$, the exact value.
:::
:::

::: exercise Choosing an LED material {level=3}
A designer needs an LED emitting at $630\,\mathrm{nm}$ (red) with good efficiency. (a) What band gap is required? (b) Explain why $\mathrm{GaAs_{1-x}P_x}$ becomes inefficient beyond $x \approx 0.45$, given that GaAsP becomes indirect there with $E_g \approx 1.98\,\mathrm{eV}$, and why AlGaInP is used instead. (c) Estimate the minimum forward voltage.
::: solution
(a) $E_g \approx hc/\lambda = 1.240/0.630 = 1.97\,\mathrm{eV}$ (the emission peak lies slightly above the gap, by about $kT/2$, so the gap must be marginally smaller).

(b) Above $x \approx 0.45$ the X-valley conduction-band minimum falls below the Γ minimum and the alloy becomes indirect, so radiative recombination becomes slow and SRH wins; the efficiency collapses just where a $630\,\mathrm{nm}$ emitter is needed (GaAsP red LEDs work at about $650$–$660\,\mathrm{nm}$, where the gap is still direct). $\mathrm{(Al_xGa_{1-x})_{0.5}In_{0.5}P}$, lattice-matched to GaAs, remains direct up to about $2.2\,\mathrm{eV}$ ($560\,\mathrm{nm}$), so it covers red to amber efficiently.

(c) The quasi-Fermi-level separation must be at least about $h\nu$, so $V_F \gtrsim 1.97\,\mathrm V$; with series resistance and heterojunction offsets real red LEDs operate at $2.0$–$2.2\,\mathrm V$.
:::
:::
