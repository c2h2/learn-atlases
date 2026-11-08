In about an hour and a half the Earth intercepts more energy from the Sun than humanity uses in a year. Photovoltaic (PV) panels convert a fifth of the sunlight falling on them directly into electricity, with no moving parts, and they have become the cheapest source of new electrical energy in much of the world: global installed capacity passed a terawatt in 2022 and has been growing by hundreds of gigawatts a year since. A panel is a string of silicon solar cells, each a large-area pn junction a fraction of a millimetre thick; a power plant is millions of them, connected through inverters to the grid.

[[semiconductor-devices/diodes-photonic-devices]] introduced the solar cell as a photodiode delivering power, with $I = I_0(e^{V/V_T} - 1) - I_L$, the open-circuit voltage $V_{oc} = V_T\ln(I_L/I_0 + 1)$, the fill factor and the efficiency, and [[power-electronics/power-electronics-applications]] showed how a converter tracks the maximum power point. This lesson fills in what lies between: where the photocurrent comes from (the solar spectrum, absorption and collection of carriers), why efficiency is limited (the Shockley–Queisser detailed-balance limit, derived from first principles), what real cells lose (series and shunt resistance, temperature), and how cells become modules and systems whose annual energy output we can predict.

## Sunlight {#sec-sun}

The Sun radiates approximately as a blackbody at $5772\,\mathrm K$. Outside the atmosphere, at the mean Earth–Sun distance, the irradiance is the **solar constant**, $1361\,\mathrm{W/m^2}$. Passing through the atmosphere, light is scattered (more strongly at short wavelengths, by Rayleigh scattering) and absorbed in bands by water vapour, oxygen, ozone and carbon dioxide; the losses grow with the length of the path.

::: definition Air mass and standard test conditions {#def-airmass}
The **air mass** is the length of the light's path through the atmosphere relative to the vertical path, $\mathrm{AM} = 1/\cos\theta_z$ for a Sun at zenith angle $\theta_z$ (accurate to about $\theta_z = 70^\circ$). The spectrum outside the atmosphere is AM0. Solar cells are rated under **standard test conditions** (STC): the **AM1.5G** spectrum ($\theta_z = 48.2^\circ$, including scattered "global" light from the sky), normalised to an irradiance of $1000\,\mathrm{W/m^2}$, with the cell at $25\,^\circ\mathrm C$. A module's **rated power** in **watts-peak** (Wp) is its output under STC.
:::

What matters for a solar cell is not the power but the number of photons above its band gap, since each absorbed photon gives at most one electron. The maximum possible short-circuit current density is

$$
J_{sc,\max} = q\int_{E_g}^{\infty}\Phi(E)\,\dd E ,
$$ {#eq-jsc-max}

where $\Phi(E)$ is the photon flux per unit area per unit photon energy. For the AM1.5G spectrum this is $43.8\,\mathrm{mA/cm^2}$ for silicon ($E_g = 1.12\,\mathrm{eV}$) and $32\,\mathrm{mA/cm^2}$ for GaAs ($1.42\,\mathrm{eV}$). The best silicon cells reach $42\,\mathrm{mA/cm^2}$, so almost every photon above the gap is already collected; the remaining losses are in voltage and fill factor.

## Generation and collection {#sec-collection}

A photon absorbed at depth $x$ creates an electron–hole pair there; the photocurrent is the fraction of these pairs that reach the junction and are separated before they recombine.

::: definition Quantum efficiency and the photocurrent {#def-qe}
The **external quantum efficiency** $\mathrm{EQE}(\lambda)$ of a solar cell is the number of electrons delivered to the external circuit at short circuit per incident photon of wavelength $\lambda$. The **internal quantum efficiency** $\mathrm{IQE}$ counts per photon *entering* the cell, $\mathrm{EQE} = (1 - R(\lambda))\,\mathrm{IQE}$ for front reflectance $R$. The short-circuit current density is

$$
J_{sc} = q\int\mathrm{EQE}(\lambda)\,\Phi_\lambda(\lambda)\,\dd\lambda ,
$$ {#eq-jsc}

with $\Phi_\lambda$ the incident photon flux per unit wavelength.
:::

Most of a silicon cell is a lightly doped **base**, typically p-type, $150$–$180\,\mathrm{\mu m}$ thick, with a thin, heavily doped n$^+$ **emitter** on top. Electrons generated in the base must diffuse to the junction; minority-carrier **diffusion lengths** $L = \sqrt{D\tau}$ of several hundred micrometres in good wafers let them do so.

::: theorem Collection from a thick base {#thm-collection}
Let photons of flux $\Phi_0$ enter a semi-infinite base with absorption coefficient $\alpha$, generating pairs at the rate $G(x) = \alpha\Phi_0e^{-\alpha x}$, and let the junction at $x = 0$ collect every minority carrier that reaches it. With diffusion length $L$, the collected flux is

$$
\frac{J}{q} = \Phi_0\,\frac{\alpha L}{1 + \alpha L} ,
$$ {#eq-collection}

so the internal quantum efficiency is $\alpha L/(1 + \alpha L)$: close to $1$ when light is absorbed within a diffusion length ($\alpha L \gg 1$), and about $\alpha L$ when it is absorbed much deeper.
:::

::: proof
The excess minority-carrier density $n(x)$ obeys the steady-state diffusion equation $D\,n'' - n/\tau + G(x) = 0$, with $n(0) = 0$ (the junction removes carriers) and $n \to 0$ deep in the base. A particular solution is $n_p = Ce^{-\alpha x}$: substituting, $C(D\alpha^2 - 1/\tau) = -\alpha\Phi_0$, so $C = \alpha\Phi_0\tau/(1 - \alpha^2L^2)$. Adding the homogeneous solution that satisfies the boundary conditions, $n = C(e^{-\alpha x} - e^{-x/L})$. The flux of carriers into the junction is $Dn'(0) = DC(-\alpha + 1/L) = (D/L)C(1 - \alpha L)$. With $D/L = L/\tau$,

$$
Dn'(0) = \frac{L}{\tau}\cdot\frac{\alpha\Phi_0\tau(1 - \alpha L)}{(1 - \alpha L)(1 + \alpha L)} = \Phi_0\frac{\alpha L}{1 + \alpha L} .
$$

(The case $\alpha L = 1$ follows by continuity.)
:::

Blue light, absorbed within a micrometre, is collected efficiently from the base — but much of it is absorbed in the heavily doped emitter, where lifetimes are short; that is why emitters are made thin and their surfaces passivated. Near-infrared light, with $\alpha$ below $100\,\mathrm{cm^{-1}}$ in silicon, penetrates further than the wafer is thick. Cells therefore use **light trapping**: a textured surface of micrometre-sized pyramids, etched into the crystal, refracts light obliquely into the wafer, and a reflective rear sends it back, so that the light bounces many times. For a perfectly random (Lambertian) texture the path length is enhanced by up to $4n^2$, about $50$ for silicon — the **Yablonovitch limit**. Texturing also reduces reflection, because a ray reflected from one pyramid face strikes another; with a silicon nitride anti-reflection coating ($n \approx 2$, a quarter-wave thick, as in [[electromagnetics/reflection-refraction]]), front reflection falls to a few per cent, which is why cells look dark blue or black.

::: example Collection at two wavelengths {#ex-collection}
In a silicon cell with a base diffusion length of $300\,\mathrm{\mu m}$, find the internal quantum efficiency predicted by [[#eq-collection]] at $800\,\mathrm{nm}$ ($\alpha = 850\,\mathrm{cm^{-1}}$) and $1000\,\mathrm{nm}$ ($\alpha = 64\,\mathrm{cm^{-1}}$). What would light trapping that lengthens the effective path tenfold do at $1000\,\mathrm{nm}$?
::: solution
At $800\,\mathrm{nm}$: $\alpha L = 850\times0.03 = 25.5$, $\mathrm{IQE} = 25.5/26.5 = 0.96$. At $1000\,\mathrm{nm}$: $\alpha L = 64\times0.03 = 1.92$, $\mathrm{IQE} = 1.92/2.92 = 0.66$. The model assumes an infinitely thick base, while a real wafer is only about $160\,\mathrm{\mu m}$ thick, through which a single pass absorbs just $1 - e^{-64\times0.016} = 64\,\%$ of the $1000\,\mathrm{nm}$ light; the rest leaves through the back. Lengthening the path tenfold raises the effective absorption to $1 - e^{-10.2} \approx 1$, and the collection is then limited by the diffusion length, since carriers are generated throughout the wafer, all within about one diffusion length of the junction. Good light trapping is worth about $2$–$3\,\mathrm{mA/cm^2}$ in a silicon cell.
:::
:::

## The detailed-balance limit {#sec-sq}

How efficient can a single-junction solar cell be? Two losses are unavoidable whatever the material. Photons with $h\nu < E_g$ are not absorbed. Photons with $h\nu > E_g$ create carriers that lose their excess energy $h\nu - E_g$ as heat within picoseconds (**thermalisation**). If every absorbed photon gave one electron at a voltage $E_g/q$, the efficiency would be the **ultimate efficiency**

$$
u(E_g) = \frac{E_g\int_{E_g}^\infty\Phi(E)\,\dd E}{\int_0^\infty E\,\Phi(E)\,\dd E} ,
$$ {#eq-ultimate}

which for a $5772\,\mathrm K$ blackbody has its maximum, $44\,\%$, at $E_g \approx 1.1\,\mathrm{eV}$.

::: widget plot
f: (x/(8.617e-5*T))*sum(exp(-k*x/(8.617e-5*T))*((x/(8.617e-5*T))^2/k + 2*(x/(8.617e-5*T))/k^2 + 2/k^3), k, 1, 60)/(pi^4/15); 1 - (15/pi^4)*sum(exp(-k*x/(8.617e-5*T))*((x/(8.617e-5*T))^3/k + 3*(x/(8.617e-5*T))^2/k^2 + 6*(x/(8.617e-5*T))/k^3 + 6/k^4), k, 1, 60)
x: 0.3, 3
y: 0, 1
sliders: T=5772:4000:7000:10
labels: u(E_g)\ \text{(ultimate efficiency)}; \text{fraction lost below the gap}
caption: For a blackbody sun at temperature $T$, the ultimate efficiency $u(E_g)$ (blue) — every absorbed photon delivering exactly $E_g$ — and the fraction of the incident energy carried by photons below the gap (orange), against band gap in electronvolts. The gap between the orange curve and $1 - u$ is the thermalisation loss. A small gap absorbs almost everything but wastes most of each photon's energy as heat; a large gap keeps each photon's energy but lets most photons through. The best compromise is near $1.1\,\mathrm{eV}$ — close to silicon's gap. Raise $T$: the optimum moves to larger gaps.
:::

But a cell cannot deliver $E_g/q$ per electron. Any body at temperature $T_c$ emits thermal radiation, and a solar cell, which absorbs well above its gap, is by the same token a good emitter there. Under forward bias $V$ this emission grows by $e^{qV/k_BT_c}$, because the quasi-Fermi levels separate by $qV$ — it is the light of an LED. In the ideal cell this radiative recombination is the only loss mechanism, and it fixes the dark saturation current.

::: theorem Shockley–Queisser limit {#thm-sq}
Consider a cell at temperature $T_c$ that absorbs every photon with $E > E_g$, has no non-radiative recombination and collects every carrier, and emits from its front surface only. Its current density is

$$
J(V) = J_{sc} - J_0\left(e^{qV/k_BT_c} - 1\right), \qquad J_0 = q\,\frac{2\pi}{h^3c^2}\int_{E_g}^{\infty}\frac{E^2\,\dd E}{e^{E/k_BT_c} - 1} ,
$$ {#eq-sq}

with $J_{sc}$ from [[#eq-jsc-max]]. Its efficiency $\eta = \max_V VJ(V)/P_{\mathrm{in}}$ under AM1.5G has a maximum of $33.7\,\%$ at $E_g = 1.34\,\mathrm{eV}$; for silicon's $1.12\,\mathrm{eV}$ it is about $32$–$33\,\%$.
:::

::: proof
**Detailed balance.** In the dark, at $V = 0$, the cell is in equilibrium with its surroundings at $T_c$: it absorbs the blackbody photon flux from a hemisphere above its gap and must emit exactly as much. The blackbody photon flux through a surface into a hemisphere, per unit energy, is $(2\pi/h^3c^2)E^2/(e^{E/k_BT_c} - 1)$ (Planck's law integrated over the hemisphere with the $\cos\theta$ projection factor, which contributes $\pi$). Each emitted photon above the gap corresponds to one recombination event, so the equilibrium recombination current density is $J_0$ as stated.

**Under bias.** With quasi-Fermi levels separated by $qV$, the occupancy factor $f_c(1 - f_v)$ governing emission is multiplied by $e^{qV/k_BT_c}$ (for $E - qV \gg k_BT_c$), so the emitted flux becomes $J_0e^{qV/k_BT_c}/q$. The thermal radiation absorbed from the surroundings is unchanged, $J_0/q$. The net current is the solar generation minus the net recombination: $J = J_{sc} - J_0(e^{qV/k_BT_c} - 1)$.

**Efficiency.** Maximising $VJ(V)$ numerically for each $E_g$ with the AM1.5G spectrum gives the stated values; with a $5772\,\mathrm K$ blackbody sun normalised to $1000\,\mathrm{W/m^2}$ the curve has the same shape with a maximum near $30\,\%$ at $1.3$–$1.4\,\mathrm{eV}$ (the AM1.5G spectrum, depleted in the ultraviolet and with infrared absorption bands, delivers more photons per watt in the useful range).
:::

::: example The radiative limit of silicon {#ex-sq}
For $E_g = 1.12\,\mathrm{eV}$ and $T_c = 300\,\mathrm K$, the integral in [[#eq-sq]] gives $J_0 = 8.2\times10^{-17}\,\mathrm{A/cm^2}$. Taking the AM1.5G value $J_{sc} = 43.8\,\mathrm{mA/cm^2}$, find $V_{oc}$ in the radiative limit and compare it with the $0.631\,\mathrm V$ of the cell in [[semiconductor-devices/diodes-photonic-devices#ex-solar]]. Where does the difference come from?
::: solution
$V_{oc} = (k_BT_c/q)\ln(J_{sc}/J_0 + 1) = 0.02585\ln(0.0438/8.2\times10^{-17}) = 0.02585\times33.9 = 0.877\,\mathrm V$. The practical cell, with $J_0 = 10^{-12}\,\mathrm{A/cm^2}$, has a dark current twelve thousand times larger, costing $0.02585\ln(12\,000) = 0.24\,\mathrm V$. Silicon's indirect gap makes radiative recombination slow, so non-radiative processes dominate: Auger recombination, intrinsic to the material and growing as the cube of the carrier density, limits silicon to about $V_{oc} \approx 0.76\,\mathrm V$ and an efficiency near $29.4\,\%$; defect (SRH) recombination in the bulk and at surfaces and contacts accounts for the rest. The best laboratory silicon cells reach $V_{oc} \approx 0.75\,\mathrm V$. Even in the radiative limit $V_{oc}$ is $0.24\,\mathrm V$ below $E_g/q$: the price of a cell that must be in thermal contact with its surroundings and absorbs from a narrow solid angle but emits into a hemisphere.
:::
:::

The limit can be exceeded only by breaking an assumption. **Concentrating** sunlight by a factor $X$ raises $J_{sc}$ by $X$ and $V_{oc}$ by $(k_BT/q)\ln X$, increasing the limit to about $40\,\%$ at full concentration ($X = 46\,000$). **Multi-junction** (tandem) cells stack junctions of decreasing gap, each absorbing the part of the spectrum just above its own gap and so reducing thermalisation: two junctions allow about $45\,\%$, and III–V multi-junction cells under concentration have exceeded $47\,\%$ in the laboratory. Perovskite-on-silicon tandems aim to bring tandem efficiencies to flat panels at low cost.

::: quiz
Why does a solar cell with a band gap of $0.7\,\mathrm{eV}$ have a lower efficiency limit than one with $1.34\,\mathrm{eV}$, even though it absorbs more photons?
- [ ] It reflects more light from its surface
- [x] Each photon delivers at most about $E_g$ of energy, so the excess energy of the many high-energy photons is lost as heat, and its voltage is low
- [ ] Narrow-gap materials cannot form pn junctions
- [ ] The short-circuit current saturates at low gaps
::: solution
The $0.7\,\mathrm{eV}$ cell absorbs more photons — its $J_{sc}$ is much higher — but its open-circuit voltage is below $0.5\,\mathrm V$, because $J_0$ grows roughly as $e^{-E_g/k_BT}$. Thermalisation wastes the energy above $0.7\,\mathrm{eV}$ of every visible photon. In the blackbody calculation the $0.7\,\mathrm{eV}$ cell reaches about $22\,\%$, against $30\,\%$ near $1.34\,\mathrm{eV}$.
:::
:::

## Real cells {#sec-real}

A practical cell departs from the ideal diode in three ways: recombination in the depletion region and at defects (ideality factors above $1$, a second diode in the model), resistance in the emitter, the contact grid and the metal fingers (**series resistance** $R_s$), and leakage paths across the junction at edges and defects (**shunt resistance** $R_{sh}$).

::: definition Single-diode model with parasitic resistances {#def-single-diode}
Per unit area, with current density $J$ delivered to the load (generator convention) at terminal voltage $V$,

$$
J = J_L - J_0\left[\exp\!\left(\frac{V + JR_s}{nV_T}\right) - 1\right] - \frac{V + JR_s}{R_{sh}} ,
$$ {#eq-single-diode}

where $R_s$ and $R_{sh}$ are specific resistances in $\Omega\cdot\mathrm{cm^2}$ and $n$ is the ideality factor. The **characteristic resistance** of the cell is $R_{ch} = V_{oc}/J_{sc}$; parasitic resistances matter when $R_s$ is not small, or $R_{sh}$ not large, compared with $R_{ch}$.
:::

The equation is implicit in $J$, but it becomes explicit if we use the voltage across the diode, $V_d = V + JR_s$, as a parameter: $J = J_L - J_0(e^{V_d/nV_T} - 1) - V_d/R_{sh}$ and then $V = V_d - JR_s$. The widget below draws the characteristic that way.

::: widget parametric
fx: t - (L - 1000*10^c*(exp(t/(n*0.02585)) - 1) - 1000*t/S)*R/1000
fy: L - 1000*10^c*(exp(t/(n*0.02585)) - 1) - 1000*t/S
t: 0, 0.8
x: 0, 0.75
y: 0, 45
sliders: R=0.5:0:3:0.05; S=3000:20:5000:10; L=40:20:44:0.5; c=-12:-14:-9:0.1; n=1:1:2:0.05
trace: false
equal: false
caption: Current density (mA/cm²) against terminal voltage (V) of a solar cell from the single-diode model [[#eq-single-diode]], drawn parametrically through the diode voltage. Sliders: series resistance $R$ ($\Omega\cdot\mathrm{cm^2}$), shunt resistance $S$ ($\Omega\cdot\mathrm{cm^2}$), photocurrent $L$ (mA/cm²), $J_0 = 10^c\,\mathrm{A/cm^2}$ and ideality $n$. Increase $R$: the curve tilts near $V_{oc}$ and the "knee" softens, lowering the fill factor without changing $V_{oc}$. Lower $S$ to $50$: the flat part tilts and the current falls with voltage. Raise $n$ to $2$ with $c = -9$ (recombination-dominated, as in a poor cell): $V_{oc}$ and the fill factor both drop.
:::

::: example The cost of series resistance {#ex-rs}
The ideal silicon cell of [[semiconductor-devices/diodes-photonic-devices#ex-solar]] ($J_L = 40\,\mathrm{mA/cm^2}$, $J_0 = 10^{-12}\,\mathrm{A/cm^2}$, $n = 1$) has $V_{oc} = 0.631\,\mathrm V$, $FF = 0.834$ and $21.0\,\%$ efficiency. Find its characteristic resistance, and the fill factor and efficiency with $R_s = 1\,\Omega\cdot\mathrm{cm^2}$. Compare with the estimate $FF \approx FF_0(1 - R_s/R_{ch})$. What does $1\,\Omega\cdot\mathrm{cm^2}$ mean for a full-size $15.6\times15.6\,\mathrm{cm}$ cell?
::: solution
$R_{ch} = V_{oc}/J_{sc} = 0.631/0.040 = 15.8\,\Omega\cdot\mathrm{cm^2}$. Solving [[#eq-single-diode]] numerically and maximising $VJ$ gives, with $R_s = 1\,\Omega\cdot\mathrm{cm^2}$, $V_{mp} = 0.516\,\mathrm V$, $J_{mp} = 37.9\,\mathrm{mA/cm^2}$, $P_{\max} = 19.6\,\mathrm{mW/cm^2}$: $FF = 19.6/(0.631\times40) = 0.776$ and $\eta = 19.6\,\%$. The estimate gives $0.834\times(1 - 1/15.8) = 0.781$, close. A single ohm·cm² costs $1.4$ percentage points of efficiency.

The cell area is $243\,\mathrm{cm^2}$, so $1\,\Omega\cdot\mathrm{cm^2}$ is a lumped resistance of $1/243 = 4.1\,\mathrm{m\Omega}$ carrying $J_{sc}A = 9.7\,\mathrm A$: a voltage drop of $40\,\mathrm{mV}$ at short circuit. Every milliohm counts, which is why cells have many thin silver fingers, several busbars or wires, and why modules increasingly use cells cut in half (halving the current and quartering the $I^2R$ loss in the interconnects).
:::
:::

### Temperature

Solar cells get hot: $20$–$40\,\mathrm K$ above ambient in full sun. The photocurrent rises slightly with temperature (the gap shrinks, so more photons are absorbed), but the open-circuit voltage falls substantially, because $J_0 \propto T^\gamma e^{-E_{g0}/k_BT}$ rises steeply. Differentiating $V_{oc} = (k_BT/q)\ln(J_{sc}/J_0)$ gives

$$
\frac{\dd V_{oc}}{\dd T} \approx -\frac{E_{g0}/q - V_{oc} + \gamma k_BT/q}{T} ,
$$ {#eq-dvoc-dt}

with $E_{g0} \approx 1.17\,\mathrm{eV}$ the gap of silicon extrapolated to $0\,\mathrm K$ and $\gamma \approx 3$. For $V_{oc} = 0.63\,\mathrm V$ at $300\,\mathrm K$ this is $-(1.17 - 0.63 + 0.078)/300 = -2.1\,\mathrm{mV/K}$, or $-0.33\,\%$ per kelvin, and the maximum power falls by about $0.3$–$0.4\,\%/\mathrm K$ for silicon modules. Cells with higher $V_{oc}$ (heterojunction cells, wide-gap materials such as CdTe) have smaller temperature coefficients — a real advantage in hot climates. Module data sheets give the **nominal operating cell temperature** (NOCT, typically $45\,^\circ\mathrm C$ at $800\,\mathrm{W/m^2}$, $20\,^\circ\mathrm C$ ambient and $1\,\mathrm{m/s}$ wind), from which the cell temperature is estimated as $T_c \approx T_a + (\mathrm{NOCT} - 20\,^\circ\mathrm C)\,G/800\,\mathrm{W\,m^{-2}}$.

::: warning Rated power is not typical power
A module's rated power is its output at $1000\,\mathrm{W/m^2}$ with the cells at $25\,^\circ\mathrm C$ — a combination that rarely occurs outdoors, since at full sun the cells are typically at $50$–$65\,^\circ\mathrm C$. A $400\,\mathrm{Wp}$ module with a coefficient of $-0.35\,\%/\mathrm K$ at $61\,^\circ\mathrm C$ cell temperature gives $400\times(1 - 0.0035\times36) = 350\,\mathrm W$ at $1000\,\mathrm{W/m^2}$. Energy yield calculations must use the irradiance and temperature actually expected, and peak watts should never be confused with average power: a $4\,\mathrm{kWp}$ rooftop system in central Europe averages about $0.45\,\mathrm{kW}$ over the year.
:::

::: quiz
Two identical modules are installed, one in Hamburg (in-plane irradiation $1100\,\mathrm{kWh/m^2}$ a year) and one in Seville ($1900\,\mathrm{kWh/m^2}$). Which estimate of the ratio of their annual energy outputs is most realistic?
- [ ] $1$, since they have the same rated power
- [ ] Exactly $1900/1100 = 1.73$
- [x] Somewhat less than $1.73$, because the module in Seville runs hotter
- [ ] More than $1.73$, because efficiency rises with irradiance
::: solution
Energy scales with irradiation through [[#eq-yield]], but the performance ratio is not the same: the Seville module spends more time at high cell temperatures, losing $0.3$–$0.4\,\%$ of power per kelvin, so its PR is a few per cent lower. (Efficiency does rise slightly from low to moderate irradiance, but this is a smaller effect.) A ratio of about $1.65$ is typical.
:::
:::

## Modules and arrays {#sec-modules}

A single silicon cell delivers about $0.6\,\mathrm V$, far too little to be useful, at $10\,\mathrm A$ or more. A **module** connects $60$ or $72$ cells (or $120$ or $144$ half-cells) in series, giving $30$–$50\,\mathrm V$, laminated between glass and a polymer back sheet with an encapsulant. Modules are connected in series into **strings** to reach the input voltage of an inverter, and strings in parallel.

Series connection forces every cell to carry the same current. If one cell is shaded, its photocurrent falls, and the rest of the string drives the current through it in reverse: the shaded cell becomes a load, dissipating the power of its neighbours, and can overheat (a **hot spot**) or break down. To prevent this, a module includes **bypass diodes**, usually three, each across a group of $20$–$24$ cells. When a group cannot carry the string current, its diode conducts and the group is skipped, at the cost of its voltage and a diode drop of about $0.4\,\mathrm V$. The string's power–voltage curve then has several local maxima, one for each combination of bypassed groups, which a simple perturb-and-observe tracker ([[power-electronics/power-electronics-applications#alg-po]]) can mistake for the global maximum; modern inverters periodically sweep the whole curve.

::: example A shaded cell {#ex-shading}
A $60$-cell module has three bypass diodes, each across $20$ cells. At full sun each cell has $V_{mp} = 0.55\,\mathrm V$ and $I_{mp} = 9.0\,\mathrm A$, so the module delivers $33\,\mathrm V$, $297\,\mathrm W$. A leaf covers one cell completely. Estimate the module's output (a) with the bypass diodes, (b) without them, and (c) the power the shaded cell would have to dissipate without bypass diodes if the string kept running at $9\,\mathrm A$.
::: solution
(a) The group containing the shaded cell cannot carry $9\,\mathrm A$, so its bypass diode conducts. The other two groups deliver $40\times0.55 = 22\,\mathrm V$ at $9\,\mathrm A$, minus $0.4\,\mathrm V$ for the diode: $21.6\times9 = 194\,\mathrm W$, about two-thirds of full power, from one leaf on one of sixty cells.

(b) Without bypass diodes, the module current is limited to what the shaded cell can pass: almost nothing in forward operation. Its output falls nearly to zero — or, in a string, the other modules force current through it.

(c) If the string drives $9\,\mathrm A$ through the module, the $59$ illuminated cells generate $59\times0.55 = 32.5\,\mathrm V$, and the shaded cell must absorb that voltage in reverse (if it does not break down first): $32.5\times9 = 290\,\mathrm W$ concentrated in one $240\,\mathrm{cm^2}$ cell — more than enough to char the encapsulant and crack the glass. With the bypass diode, the reverse voltage across the shaded cell is limited to the $19$ cells of its group plus a diode drop, about $11\,\mathrm V$, and the current through it to its reverse leakage.
:::
:::

## Photovoltaic systems {#sec-systems}

The energy a PV system delivers over a year depends on the irradiation at the site, the orientation of the modules, and the losses between the module ratings and the grid.

::: definition Energy yield and performance ratio {#def-yield}
The **in-plane irradiation** $H$ is the solar energy received per unit area of the module plane over a period, in $\mathrm{kWh/m^2}$. Since the rated power is defined at $1\,\mathrm{kW/m^2}$, $H$ in $\mathrm{kWh/m^2}$ equals the **peak sun hours**: the number of hours at STC irradiance that would deliver the same energy. The energy delivered by a system of rated power $P_{\mathrm{STC}}$ is

$$
E = P_{\mathrm{STC}}\cdot\frac{H}{1\,\mathrm{kW/m^2}}\cdot\mathrm{PR} ,
$$ {#eq-yield}

where the **performance ratio** PR ($0.75$–$0.9$ for good systems) collects temperature losses, low-irradiance efficiency, soiling, mismatch and shading, cable and inverter losses. The **specific yield** $E/P_{\mathrm{STC}}$ is in kWh/kWp, and the **capacity factor** is the average power divided by $P_{\mathrm{STC}}$.
:::

Annual in-plane irradiation ranges from about $1000\,\mathrm{kWh/m^2}$ in northern Europe to $2500\,\mathrm{kWh/m^2}$ in deserts; tilting modules towards the equator at roughly the latitude angle maximises it for a fixed mounting, and single-axis trackers, which turn the modules to follow the Sun from east to west, add $15$–$25\,\%$ in sunny climates and are standard in large plants. Capacity factors are $10$–$25\,\%$.

::: example Sizing a residential system {#ex-sizing}
A household uses $4500\,\mathrm{kWh}$ a year. Its roof receives an in-plane irradiation of $1400\,\mathrm{kWh/m^2}$ per year, and the expected performance ratio is $0.80$. Modules are rated $400\,\mathrm{Wp}$, with $V_{oc} = 49.0\,\mathrm V$ and $V_{mp} = 41.0\,\mathrm V$ at STC, temperature coefficients $-0.28\,\%/\mathrm K$ for $V_{oc}$ and $-0.29\,\%/\mathrm K$ for $V_{mp}$, and an area of $1.9\,\mathrm{m^2}$. The single-string inverter accepts at most $600\,\mathrm V$ and tracks the maximum power point between $150$ and $500\,\mathrm V$. Size the array and check the string voltage over cell temperatures from $-10$ to $70\,^\circ\mathrm C$.
::: solution
**Rated power.** By [[#eq-yield]], $P_{\mathrm{STC}} = E/(H\cdot\mathrm{PR}) = 4500/(1400\times0.80) = 4.02\,\mathrm{kWp}$. Ten modules give $4.0\,\mathrm{kWp}$ and an expected $4.0\times1400\times0.8 = 4480\,\mathrm{kWh}$ a year, on $19\,\mathrm{m^2}$ of roof. The capacity factor is $4480/(4.0\times8760) = 12.8\,\%$.

**Maximum voltage.** The highest voltage occurs at open circuit on a cold, bright morning. At $-10\,^\circ\mathrm C$, $35\,\mathrm K$ below STC, $V_{oc} = 49.0\times(1 + 0.0028\times35) = 53.8\,\mathrm V$ per module, and ten in series give $538\,\mathrm V < 600\,\mathrm V$. (Eleven would give $592\,\mathrm V$, uncomfortably close; twelve would exceed the limit and could destroy the inverter.)

**MPPT window.** On a hot day, at $70\,^\circ\mathrm C$, $V_{mp} = 41.0\times(1 - 0.0029\times45) = 35.6\,\mathrm V$, and the string gives $356\,\mathrm V$; on a cold day $V_{mp} \approx 41.0\times1.10 = 45.2\,\mathrm V$, $452\,\mathrm V$. Both are inside the $150$–$500\,\mathrm V$ tracking range, so the design of one string of ten modules works. The household will still draw from the grid in winter and at night, since production and consumption do not coincide in time; a battery or a time-of-use tariff addresses that.
:::
:::

::: application From cells to the grid
Utility-scale plants connect thousands of strings to central or string inverters ([[power-electronics/inverters]]) and step up to transmission voltages; the inverters must ride through grid faults and supply reactive power as grid codes require ([[power-systems]]). Because PV output follows the Sun, high penetration produces the "duck curve" of net demand — low at midday, steep in the evening — which batteries, flexible demand and transmission must flatten. In space, multi-junction III–V cells of $30\,\%$ efficiency power almost every satellite, where mass and radiation hardness matter more than cost.
:::

::: history
Edmond Becquerel observed a photovoltaic effect in an electrolytic cell in 1839. William Adams and Richard Day found in 1876 that selenium produced a current when illuminated, and Charles Fritts built selenium cells of about $1\,\%$ efficiency in 1883. Daryl Chapin, Calvin Fuller and Gerald Pearson at Bell Laboratories announced the diffused silicon pn-junction cell in 1954, with about $6\,\%$ efficiency, and solar cells powered the Vanguard 1 satellite from 1958. William Shockley and Hans-Joachim Queisser published their detailed-balance limit in 1961. Eli Yablonovitch derived the $4n^2$ light-trapping limit in 1982. Martin Green's group at the University of New South Wales developed the passivated emitter and rear cell (PERC) in the 1980s, and it became the dominant industrial cell design in the late 2010s, since largely succeeded by passivated-contact (TOPCon) and heterojunction cells. Akihiro Kojima, Tsutomu Miyasaka and colleagues reported the first perovskite solar cells in 2009.
:::

## Where this leads

The converters that interface PV arrays with batteries and the grid, including maximum-power-point tracking, are in [[power-electronics/power-electronics-applications]] and [[power-electronics/inverters]]; the integration of variable renewable generation into power systems is a theme of [[power-systems]]. The semiconductor physics behind the losses — recombination mechanisms, ideality factors, contacts — is developed in [[semiconductor-devices/diodes-photonic-devices]]. The detailed-balance argument used here also explains the efficiency limits of LEDs ([[photonics/light-sources]]) and of thermophotovoltaic converters, and it connects photovoltaics to the radiation physics of [[photonics/optical-waves]].

::: summary
- Solar cells are rated under AM1.5G at $1000\,\mathrm{W/m^2}$ and $25\,^\circ\mathrm C$; the photon flux above the gap sets $J_{sc,\max}$, $43.8\,\mathrm{mA/cm^2}$ for silicon.
- The photocurrent is $q\int\mathrm{EQE}\,\Phi\,\dd\lambda$; collection from a thick base is $\alpha L/(1 + \alpha L)$, and texturing plus reflective rears trap weakly absorbed light (up to $4n^2$).
- Below-gap transmission and thermalisation limit the ultimate efficiency to $44\,\%$; including unavoidable radiative recombination, the Shockley–Queisser limit is $33.7\,\%$ at $1.34\,\mathrm{eV}$, and Auger recombination limits silicon to about $29\,\%$.
- Real cells follow the single-diode model with series and shunt resistance; the fill factor falls roughly as $1 - R_s/R_{ch}$ with $R_{ch} = V_{oc}/J_{sc}$.
- $V_{oc}$ falls by about $2\,\mathrm{mV/K}$ per silicon cell, and module power by $0.3$–$0.4\,\%/\mathrm K$; cells run $20$–$40\,\mathrm K$ above ambient.
- Modules put cells in series with bypass diodes against shading and hot spots; string voltages must be checked at the coldest open-circuit and hottest MPP conditions.
- Annual energy is $E = P_{\mathrm{STC}}\cdot H\cdot\mathrm{PR}$, with $H$ the in-plane irradiation in peak sun hours and PR about $0.8$.
:::

## Exercises

::: exercise Air mass {level=1 check="1/cos(60*pi/180)"}
Find the air mass when the Sun is $30^\circ$ above the horizon.
::: solution
The zenith angle is $60^\circ$, so $\mathrm{AM} = 1/\cos60^\circ = 2.0$.
:::
:::

::: exercise Short-circuit current from a flat EQE {level=1 check="1.602e-19*0.9*2.7e21/10"}
A cell has $\mathrm{EQE} = 0.9$ for every photon above its gap, and the incident flux of such photons is $2.7\times10^{21}\,\mathrm{m^{-2}\,s^{-1}}$. Find $J_{sc}$ in $\mathrm{mA/cm^2}$.
::: solution
$J_{sc} = q\,\mathrm{EQE}\,\Phi = 1.602\times10^{-19}\times0.9\times2.7\times10^{21} = 389\,\mathrm{A/m^2} = 38.9\,\mathrm{mA/cm^2}$.
:::
:::

::: exercise Temperature and open-circuit voltage {level=1 check="0.68-0.0021*(60-25)"}
A silicon cell has $V_{oc} = 0.68\,\mathrm V$ at $25\,^\circ\mathrm C$ and a temperature coefficient of $-2.1\,\mathrm{mV/K}$. Find $V_{oc}$ at $60\,^\circ\mathrm C$, in volts.
::: solution
$V_{oc} = 0.68 - 0.0021\times35 = 0.607\,\mathrm V$, $11\,\%$ less.
:::
:::

::: exercise Internal quantum efficiency {level=2 check="1e4*20e-4/(1+1e4*20e-4)"}
Light with $\alpha = 10^4\,\mathrm{cm^{-1}}$ enters a thick base with a diffusion length of $20\,\mathrm{\mu m}$ (a poor multicrystalline wafer). Find the IQE from [[#eq-collection]], and the diffusion length needed to collect $90\,\%$ of light with $\alpha = 100\,\mathrm{cm^{-1}}$.
::: solution
$\alpha L = 10^4\times2\times10^{-3} = 20$, $\mathrm{IQE} = 20/21 = 0.952$. For $90\,\%$ at $\alpha = 100\,\mathrm{cm^{-1}}$: $\alpha L/(1 + \alpha L) = 0.9$ gives $\alpha L = 9$, $L = 900\,\mathrm{\mu m}$ — longer than the wafer is thick, so in practice collection of such light depends on light trapping and a passivated rear surface rather than on the base alone.
:::
:::

::: exercise Fill factor with series resistance {level=2 check="0.83*(1-0.6/(0.70/0.042))"}
A cell has $V_{oc} = 0.70\,\mathrm V$, $J_{sc} = 42\,\mathrm{mA/cm^2}$ and an intrinsic fill factor $FF_0 = 0.83$. Estimate its fill factor with $R_s = 0.6\,\Omega\cdot\mathrm{cm^2}$ and its efficiency.
::: solution
$R_{ch} = 0.70/0.042 = 16.7\,\Omega\cdot\mathrm{cm^2}$, $r_s = 0.036$, $FF = 0.83\times0.964 = 0.800$. $\eta = 0.70\times42\times0.800/100 = 23.5\,\%$.
:::
:::

::: exercise Specific yield and capacity factor {level=2 check="1900*0.83/8760"}
A plant in a sunny region receives $1900\,\mathrm{kWh/m^2}$ per year in the module plane and has a performance ratio of $0.83$. Find its specific yield in kWh/kWp and its capacity factor (as a fraction).
::: solution
Specific yield $= H\cdot\mathrm{PR} = 1900\times0.83 = 1577\,\mathrm{kWh/kWp}$. Capacity factor $= 1577/8760 = 0.18$, or $18\,\%$.
:::
:::

::: exercise A bypassed string {level=2}
A string of $12$ modules, each with three bypass diodes and an MPP of $40\,\mathrm V$ at $10\,\mathrm A$, is partly shaded so that two cell groups in different modules are bypassed. Estimate the string voltage and power at the string's main maximum, and explain why the string might have a second local maximum at a lower current.
::: solution
Each group contributes about $40/3 = 13.3\,\mathrm V$. With two groups bypassed (each costing its $13.3\,\mathrm V$ plus about $0.4\,\mathrm V$ diode drop), the string gives $12\times40 - 2\times13.7 = 452.6\,\mathrm V$ at $10\,\mathrm A$, about $4.5\,\mathrm{kW}$ instead of $4.8\,\mathrm{kW}$. At a lower current — the reduced photocurrent of the shaded groups — the shaded groups can conduct and the bypass diodes turn off; the string then delivers the full $480\,\mathrm V$ but at the shaded groups' current. If they are lightly shaded (say $8\,\mathrm A$), this second maximum, $480\times8 = 3.8\,\mathrm{kW}$, is close to the first, and a tracker can settle on the wrong one.
:::
:::

::: exercise The radiative dark current {level=3}
(a) Show that for $E_g \gg k_BT_c$, [[#eq-sq]] gives $J_0 \approx q(2\pi/h^3c^2)k_BT_c(E_g^2 + 2E_gk_BT_c + 2k_B^2T_c^2)e^{-E_g/k_BT_c}$. (b) Evaluate it for $E_g = 1.12\,\mathrm{eV}$ at $300\,\mathrm K$ and confirm the value used in [[#ex-sq]]. (c) By how much does the radiative $V_{oc}$ change per $0.1\,\mathrm{eV}$ of band gap, at fixed $J_{sc}$?
::: hint
For $E \gg k_BT$ replace $1/(e^{E/k_BT} - 1)$ by $e^{-E/k_BT}$ and integrate $E^2e^{-E/k_BT}$ by parts.
:::
::: solution
(a) $\int_{E_g}^\infty E^2e^{-E/k_BT}\,\dd E = k_BTe^{-E_g/k_BT}(E_g^2 + 2E_gk_BT + 2k_B^2T^2)$, by parts twice, which gives the formula.

(b) In SI units, $k_BT = 4.142\times10^{-21}\,\mathrm J$, $E_g = 1.794\times10^{-19}\,\mathrm J$, $E_g/k_BT = 43.3$, $e^{-43.32} = 1.53\times10^{-19}$. The bracket is $(3.219 + 0.149 + 0.003)\times10^{-38} = 3.371\times10^{-38}\,\mathrm{J^2}$. The prefactor is $2\pi/(h^3c^2) = 2\pi/(2.909\times10^{-100}\times8.988\times10^{16}) = 2.403\times10^{83}\,\mathrm{J^{-3}\,m^{-2}\,s^{-1}}$. So $J_0 = 1.602\times10^{-19}\times2.403\times10^{83}\times4.142\times10^{-21}\times3.371\times10^{-38}\times1.53\times10^{-19} = 8.2\times10^{-13}\,\mathrm{A/m^2} = 8.2\times10^{-17}\,\mathrm{A/cm^2}$, the value used in [[#ex-sq]] (the approximation $e^{-E/k_BT}$ for the Bose–Einstein factor is excellent here).

(c) $V_{oc} = (k_BT/q)\ln(J_{sc}/J_0)$ and $\ln J_0 \approx -E_g/k_BT + $ slowly varying terms, so $\partial V_{oc}/\partial E_g \approx 1/q$: each $0.1\,\mathrm{eV}$ of gap adds about $0.1\,\mathrm V$ (slightly less, since the bracket grows). The voltage deficit $E_g/q - V_{oc}$ in the radiative limit is nearly independent of the gap, about $0.25$–$0.3\,\mathrm V$.
:::
:::

::: exercise Designing a two-junction tandem {level=3}
A two-terminal tandem stacks a top cell of gap $E_1$ on a silicon bottom cell; the two are in series, so they must carry the same current. Using the blackbody model of the lesson, the photon-limited current densities above $1.12$, $1.6$, $1.7$ and $1.9\,\mathrm{eV}$ are $39.1$, $23.7$, $21.2$ and $16.6\,\mathrm{mA/cm^2}$. (a) For each candidate top gap ($1.6$, $1.7$, $1.9\,\mathrm{eV}$), find the current available to each subcell, assuming the top cell absorbs everything above its gap and the bottom cell everything between the gaps. (b) Which top gap matches the currents? (c) Estimate the tandem's open-circuit voltage if each subcell reaches $E_g/q - 0.4\,\mathrm V$.
::: solution
(a) Top cell: the current above $E_1$; bottom cell: $39.1$ minus that. $1.6\,\mathrm{eV}$: top $23.7$, bottom $15.4\,\mathrm{mA/cm^2}$. $1.7\,\mathrm{eV}$: top $21.2$, bottom $17.9$. $1.9\,\mathrm{eV}$: top $16.6$, bottom $22.5$.

(b) The series current is the smaller of the two: $15.4$, $17.9$ and $16.6\,\mathrm{mA/cm^2}$. The best match is near $1.7$–$1.75\,\mathrm{eV}$ (interpolating, equal currents of about $19.5\,\mathrm{mA/cm^2}$ occur near $1.77\,\mathrm{eV}$). Perovskite compositions with gaps of $1.65$–$1.7\,\mathrm{eV}$ are used in practice, slightly below the match because real top cells are not fully absorbing and the AM1.5G spectrum differs from a blackbody.

(c) With $E_1 = 1.7\,\mathrm{eV}$: $V_{oc} \approx (1.7 - 0.4) + (1.12 - 0.4) = 1.30 + 0.72 = 2.02\,\mathrm V$, at about $18\,\mathrm{mA/cm^2}$ — roughly the same current as a single silicon cell would deliver from half its photons, but at nearly three times the voltage. With a fill factor of $0.8$, $P \approx 2.02\times17.9\times0.8 = 29\,\mathrm{mW/cm^2}$ under the $100\,\mathrm{mW/cm^2}$ blackbody model, about $29\,\%$ — consistent with laboratory perovskite–silicon tandems above $30\,\%$ under AM1.5G.
:::
:::
