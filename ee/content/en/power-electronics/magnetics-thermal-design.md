Open a power supply and two kinds of component dominate its volume: the **magnetics** — inductors and transformers, wound on ferrite or powdered-iron cores — and the **heat sinks** and fans that carry the losses away. The semiconductors that do the switching are small by comparison. Nor are these components available off the shelf in the way resistors are: a converter's inductor and transformer are usually designed for it, turn by turn, and its thermal path is designed with the circuit, because the temperature of the switches determines both their losses and their life. A converter whose schematic is perfect can still fail because an inductor saturates on a load transient, a transformer runs hot from eddy currents in its windings, or a MOSFET's junction climbs past its rating on a summer day.

This chapter covers both disciplines. We model inductors and transformers with magnetic circuits, derive the role of the air gap, and develop the **area-product** method for sizing a core; we examine copper losses (including skin and proximity effects) and core losses (with the Steinmetz equation), and find the flux density that minimises a transformer's total loss. Then we turn losses into temperatures with **thermal resistance** networks, size heat sinks, and see how a temperature-dependent loss can run away. The magnetic-circuit ideas come from [[electric-machines/magnetic-circuits]] and [[electromagnetics/induction-inductance]]; the losses to be removed were computed in [[power-electronics/power-switches]].

## Magnetic circuits and the air gap

A winding of $N$ turns carrying current $i$ around a core produces a **magnetomotive force** (MMF) $Ni$ that drives flux $\phi$ around the core's closed path, opposed by the path's **reluctance**.

::: definition Reluctance and inductance of a gapped core {#def-reluctance}
A magnetic path of length $\ell$, cross-section $A$ and permeability $\mu$ has **reluctance** $\mathcal R = \ell/(\mu A)$. A core of magnetic path length $\ell_c$ and relative permeability $\mu_r$, with an air gap of length $g$, both of cross-section $A_c$, has total reluctance

$$
\mathcal R = \frac{\ell_c}{\mu_r\mu_0A_c} + \frac{g}{\mu_0A_c},
$$

and a winding of $N$ turns on it has **inductance** $L = N^2/\mathcal R$. The flux is $\phi = Ni/\mathcal R$ and the flux density $B = \phi/A_c$.
:::

Ferrite has $\mu_r$ of $2000$–$3000$, so the core's own reluctance is that of an air path $\ell_c/\mu_r$ long: a few hundredths of a millimetre for a typical core. A gap of even half a millimetre therefore dominates the reluctance, and the inductance becomes

$$
L \approx \frac{\mu_0N^2A_c}{g} ,
$$ {#eq-gap-inductance}

nearly independent of the core material's permeability — which varies by $\pm25\,\%$ with temperature and between batches. That is the first reason for gapping an inductor: the gap makes the inductance predictable. The second reason is energy.

::: theorem Energy storage in the gap {#thm-gap-energy}
In a gapped inductor the stored energy $W = \frac12Li^2$ resides almost entirely in the air gap, where the energy density is $B^2/(2\mu_0)$. The maximum energy the core can store before saturating is

$$
W_{max} = \frac{B_{max}^2}{2\mu_0}A_cg\left(1 + \frac{\ell_c}{\mu_rg}\right) \approx \frac{B_{max}^2}{2\mu_0}A_cg ,
$$

so it is the gap volume, not the core, that stores energy: without a gap, a high-permeability core saturates at a very small current.
:::

::: proof
The magnetic energy density in a linear medium is $B^2/(2\mu)$. The flux density is the same, $B$, in core and gap (same cross-section, fringing neglected), so the energy in the gap is $\frac{B^2}{2\mu_0}A_cg$ and in the core $\frac{B^2}{2\mu_r\mu_0}A_c\ell_c$; their ratio is $\ell_c/(\mu_rg)$, a few percent. As a check, $W = \frac12Li^2 = \frac12\frac{N^2}{\mathcal R}i^2 = \frac12\mathcal R\phi^2$, and with $\mathcal R \approx g/(\mu_0A_c)$ and $\phi = BA_c$ this gives $\frac{B^2}{2\mu_0}A_cg$. The flux density is limited by saturation, $B \le B_{max}$; hence $W_{max}$.
:::

A **transformer**, by contrast, ideally stores no energy: its windings' MMFs cancel except for the small magnetising MMF, and it is built without a gap to keep the magnetising inductance high. The flyback's coupled inductor ([[power-electronics/isolated-converters]]) is an inductor with two windings, and it is gapped.

::: quiz
An inductor's gap is doubled while its turns are kept the same. Neglecting the core's reluctance, what happens to the inductance and to the current at which the core saturates?
- [ ] Both halve.
- [x] The inductance halves and the saturation current doubles, so the maximum stored energy doubles.
- [ ] The inductance doubles and the saturation current halves.
- [ ] Nothing changes, because the core material is the same.
::: solution
$L = \mu_0N^2A_c/g$ halves. Saturation occurs at $B_{max} = \mu_0NI/g$, i.e. $I_{sat} = B_{max}g/(\mu_0N)$, which doubles. The maximum energy $\frac12LI_{sat}^2$ therefore doubles, in line with [[#thm-gap-energy]]: it is proportional to the gap volume. To restore the inductance, the designer adds turns ($\sqrt2$ times as many), keeping the doubled energy capacity at the cost of more copper.
:::
:::

## Designing an inductor

An inductor design must meet four constraints at once:

1. **Inductance**: $L = \mu_0N^2A_c/g$.
2. **No saturation**: the peak flux density $B_{pk} = LI_{pk}/(NA_c)$ must stay below $B_{max}$ (for ferrite, $0.25$–$0.35\,\mathrm{T}$ at operating temperature; for powdered iron and amorphous alloys, $1$–$1.5\,\mathrm{T}$). This follows from $N\phi = Li$.
3. **The winding fits**: $N$ turns of wire of cross-section $A_w$ must fit in the core's window area $W_a$, with a **fill factor** $K_u$ (typically $0.3$–$0.5$, allowing for insulation, bobbin and gaps): $NA_w \le K_uW_a$.
4. **The copper is not overloaded**: the current density $J = I_{rms}/A_w$ must stay below a value set by the allowed temperature rise, typically $3$–$6\,\mathrm{A/mm^2}$ for natural cooling.

::: theorem Area-product sizing {#thm-area-product}
A core can carry an inductor of inductance $L$, peak current $I_{pk}$ and RMS current $I_{rms}$ at flux density $B_{max}$, current density $J$ and fill factor $K_u$ only if its **area product** satisfies

$$
A_p = W_aA_c \ge \frac{LI_{pk}I_{rms}}{B_{max}JK_u} .
$$ {#eq-area-product}

Once a core is chosen, the turns and gap follow:

$$
N = \frac{LI_{pk}}{B_{max}A_c},\qquad g = \frac{\mu_0N^2A_c}{L} .
$$ {#eq-turns-gap}
:::

::: proof
From constraint 2 at equality, $N = LI_{pk}/(B_{max}A_c)$. From constraint 4, the wire area is $A_w = I_{rms}/J$. Constraint 3 then reads $\frac{LI_{pk}}{B_{max}A_c}\cdot\frac{I_{rms}}{J} \le K_uW_a$; multiplying through by $A_c$ gives [[#eq-area-product]]. The gap follows from constraint 1. The numerator $LI_{pk}I_{rms}$ is close to twice the peak stored energy when the ripple is small ($I_{rms} \approx I_{pk}$), which is why core size scales with stored energy. (A refinement, the **core geometry** method $K_g$ of Erickson and Maksimović, specifies the copper loss instead of the current density, and includes the mean length per turn.)
:::

::: example A 100 µH, 10 A inductor {#ex-inductor}
Design a ferrite inductor of $100\,\mathrm{\mu H}$ for a converter with a DC current of $10\,\mathrm{A}$ and a peak-to-peak ripple of $2\,\mathrm{A}$, using $B_{max} = 0.3\,\mathrm{T}$, $J = 5\,\mathrm{A/mm^2}$ and $K_u = 0.4$. The candidate core has $A_c = 1.6\,\mathrm{cm^2}$, $W_a = 1.5\,\mathrm{cm^2}$, a mean length per turn of $6.6\,\mathrm{cm}$ and an effective volume of $10\,\mathrm{cm^3}$. Find the turns, gap, wire size and copper loss, and estimate the core loss given that the ferrite loses $100\,\mathrm{mW/cm^3}$ at $100\,\mathrm{kHz}$ and $0.1\,\mathrm{T}$ peak, scaling as $B^{2.5}$.
::: solution
$I_{pk} = 11\,\mathrm{A}$ and, for a triangle on a DC level, $I_{rms} = \sqrt{10^2 + 2^2/12} = 10.02\,\mathrm{A}$. By [[#eq-area-product]], $A_p \ge 10^{-4}\times11\times10.02/(0.3\times5\times10^6\times0.4) = 1.84\times10^{-8}\,\mathrm{m^4} = 1.84\,\mathrm{cm^4}$. The core offers $1.6\times1.5 = 2.4\,\mathrm{cm^4}$: it is large enough.

Turns: $N = 10^{-4}\times11/(0.3\times1.6\times10^{-4}) = 22.9$, so $N = 23$. Gap: $g = 4\pi\times10^{-7}\times23^2\times1.6\times10^{-4}/10^{-4} = 1.06\,\mathrm{mm}$ (in practice somewhat larger, because fringing flux around the gap raises the effective area; and in an E-core with the gap in all legs, half of it in each of the two paths, or the whole of it in the centre leg).

Wire: $A_w = 10.02/5 = 2.0\,\mathrm{mm^2}$; the winding occupies $23\times2.0 = 46\,\mathrm{mm^2}$ of the $0.4\times150 = 60\,\mathrm{mm^2}$ available. Copper: length $23\times0.066 = 1.52\,\mathrm{m}$, resistance at $100^\circ\mathrm{C}$ ($\rho = 2.25\times10^{-8}\,\Omega\,\mathrm m$) $2.25\times10^{-8}\times1.52/(2.0\times10^{-6}) = 17\,\mathrm{m\Omega}$, loss $10.02^2\times0.017 = 1.71\,\mathrm{W}$.

Core: only the ripple changes the flux. $\Delta B = L\Delta i/(NA_c) = 10^{-4}\times2/(23\times1.6\times10^{-4}) = 0.054\,\mathrm{T}$ peak to peak, i.e. $0.027\,\mathrm{T}$ peak. The loss density is $100\times(0.27)^{2.5} = 3.8\,\mathrm{mW/cm^3}$, or $38\,\mathrm{mW}$ in the core. The inductor is **copper-loss limited**: the DC current sets the flux peak, while only the small ripple causes core loss. (The AC copper loss of the $0.58\,\mathrm{A}$ RMS ripple is small too, even though the wire's diameter, $1.6\,\mathrm{mm}$, exceeds twice the skin depth at $100\,\mathrm{kHz}$.)
:::
:::

## Losses in magnetic components

### Copper loss, skin and proximity effects

At DC the winding loss is $I_{rms}^2R_{dc}$. At high frequency the current crowds towards the surface of each conductor.

::: definition Skin depth {#def-skin-depth}
In a conductor of resistivity $\rho$ and permeability $\mu_0$, a sinusoidal current of frequency $f$ is confined approximately to a surface layer of thickness

$$
\delta = \sqrt{\frac{\rho}{\pi f\mu_0}} ,
$$

the **skin depth**. For copper at $100^\circ\mathrm{C}$ ($\rho = 2.3\times10^{-8}\,\Omega\,\mathrm m$), $\delta = 0.24\,\mathrm{mm}$ at $100\,\mathrm{kHz}$ and $0.11\,\mathrm{mm}$ at $500\,\mathrm{kHz}$.
:::

The skin depth follows from the diffusion equation for the field inside a conductor ([[electromagnetics/plane-waves]]). A round wire much thicker than $2\delta$ carries the AC current in an annulus about $\delta$ thick, so its AC resistance is much higher than its DC resistance. Worse is the **proximity effect**: in a multi-layer winding, the field of the layers below induces eddy currents in each layer, and the AC resistance of a winding of $m$ layers of thickness much greater than $\delta$ grows roughly as $m^2$ (Dowell's analysis). Remedies are conductors thinner than about a skin depth — **Litz wire**, made of many individually insulated strands twisted so that each occupies every position equally; copper foil of thickness near $\delta$ — and **interleaving** primary and secondary layers in a transformer, which lowers the field between them and hence $m$.

### Core loss

A ferrite core driven by an alternating flux loses energy by hysteresis and by eddy currents in the material. Manufacturers characterise the loss with sinusoidal excitation, and designers fit the data with an empirical law.

::: definition Steinmetz equation {#def-steinmetz}
The core-loss density of a magnetic material under sinusoidal flux of peak value $\hat B$ and frequency $f$ is approximated by

$$
P_v = kf^{\alpha}\hat B^{\beta},
$$ {#eq-steinmetz}

where $k$, $\alpha$ and $\beta$ are fitted to measurements over a limited range of frequency and flux density; for power ferrites typically $\alpha \approx 1.2$–$1.6$ and $\beta \approx 2.3$–$2.8$. The loss also depends on temperature, usually with a minimum near $80$–$100^\circ\mathrm{C}$ for power ferrites.
:::

The non-sinusoidal (rectangular-voltage, triangular-flux) waveforms of converters lose somewhat more or less than a sinusoid of the same peak, depending on the rate of change of flux; the **improved generalised Steinmetz equation** (iGSE) accounts for this. For a first design, using [[#eq-steinmetz]] with the peak flux density is adequate.

::: theorem Loss-minimising flux density of a transformer {#thm-optimum-flux}
For a transformer of fixed core, window and frequency, let the core loss be $P_{fe} = k_{fe}\hat B^\beta$ and suppose the winding fills the window whatever the number of turns. Then the copper loss varies as $P_{cu} = k_{cu}/\hat B^2$, and the total loss is minimised when

$$
P_{fe} = \frac{2}{\beta}P_{cu} .
$$ {#eq-optimum-flux}
:::

::: proof
By Faraday's law the peak flux density is inversely proportional to the number of turns: $\hat B = \lambda/(2NA_c)$ for an applied volt-second $\lambda$ per half-cycle. With the window full, the wire area per turn is $K_uW_a/N$ (shared between windings in fixed proportion), so the winding resistance is proportional to $N\cdot N = N^2$ (length times the reciprocal of area), and the copper loss at a given current to $N^2 \propto 1/\hat B^2$. Then $P = k_{fe}\hat B^\beta + k_{cu}\hat B^{-2}$, and $\dd P/\dd\hat B = \beta k_{fe}\hat B^{\beta - 1} - 2k_{cu}\hat B^{-3} = 0$ gives $\beta P_{fe} = 2P_{cu}$. The second derivative is positive, so this is a minimum. With $\beta \approx 2.5$, the core loss at the optimum is about $80\,\%$ of the copper loss: the two are nearly equal.
:::

::: widget plot
f: x^b; 1/x^2; x^b + 1/x^2
x: 0.4, 1.8
y: 0, 6
sliders: b=2.6:0:3:0.05
labels: P_{fe}; P_{cu}; P_{total}
caption: Core, copper and total loss of a transformer against peak flux density (normalised so that the two losses are equal at $1$), with the Steinmetz exponent $\beta$ on the slider. Fewer turns raise the flux density — so core loss rises steeply, as $\hat B^\beta$ — but lower the copper loss as $1/\hat B^2$. The minimum lies slightly to the left of the crossing, where $P_{fe} = (2/\beta)P_{cu}$, and is flat: a design within $\pm20\,\%$ of the optimum flux loses only a few percent more. At high frequency the optimum flux falls well below saturation, which is why high-frequency transformers are loss-limited rather than saturation-limited.
:::

::: example Losses of the full-bridge transformer {#ex-xfmr-loss}
The transformer of [[power-electronics/isolated-converters#ex-full-bridge]] has $N_p = 24$ on a core with $A_c = 2.4\,\mathrm{cm^2}$ and effective volume $20\,\mathrm{cm^3}$, and runs at $100\,\mathrm{kHz}$ from $400\,\mathrm{V}$ at $D = 0.735$. The ferrite loses $80\,\mathrm{mW/cm^3}$ at $100\,\mathrm{kHz}$ and $0.1\,\mathrm{T}$, with $\beta = 2.6$. Estimate the core loss, and the copper loss at which this design would be optimal. Should the designer add or remove turns if the measured copper loss is $1.5\,\mathrm{W}$?
::: solution
From [[power-electronics/isolated-converters#prop-full-bridge]], $\hat B = V_gDT_s/(4N_pA_c) = 400\times0.735\times10^{-5}/(4\times24\times2.4\times10^{-4}) = 0.128\,\mathrm{T}$. The loss density is $80\times(1.276)^{2.6} = 151\,\mathrm{mW/cm^3}$, so $P_{fe} = 0.151\times20 = 3.0\,\mathrm{W}$.

By [[#eq-optimum-flux]], the design would be optimal if $P_{cu} = (\beta/2)P_{fe} = 1.3\times3.0 = 3.9\,\mathrm{W}$. A measured $1.5\,\mathrm{W}$ means the copper is under-used and the core over-driven: adding turns lowers $\hat B$ and the core loss steeply while raising the copper loss as $N^2$. With $N_p = 28$ (keeping the turns ratio, so $N_s$ also rises) the flux falls to $0.109\,\mathrm{T}$, the core loss to $3.0\times(24/28)^{2.6} = 2.0\,\mathrm{W}$ and the copper loss to $1.5\times(28/24)^2 = 2.0\,\mathrm{W}$: the total drops from $4.5\,\mathrm{W}$ to $4.0\,\mathrm{W}$. (The flux remains far below saturation; the gain is in loss, not in safety margin.)
:::
:::

::: warning Saturation is decided by the worst transient, not the steady state
The steady-state peak current is not the largest current an inductor will see. At start-up, during a load step, or when current limiting acts, the inductor current can overshoot well above $I_{pk}$, and ferrite's saturation flux density falls by about a fifth between $25^\circ\mathrm{C}$ and $100^\circ\mathrm{C}$. A ferrite inductor that saturates loses almost all its inductance abruptly, and the current then rises at $V/L_{sat}$ — destroying the switch within microseconds unless cycle-by-cycle current limiting catches it. Size $B_{max}$ for the current-limit setting at maximum temperature, or use a powdered-iron core, whose distributed gap makes it saturate gradually.
:::

## Thermal design

Every watt of loss must leave the device as heat. In steady state the temperature rise along each part of the heat path is proportional to the heat flowing through it, just as a voltage drop is proportional to current — so heat paths are modelled as resistor networks.

::: definition Thermal resistance {#def-thermal-resistance}
The **thermal resistance** between two points of a heat path is $R_\theta = \Delta T/P$, the temperature difference per watt of heat flowing between them, in $\mathrm{K/W}$. For a power device on a heat sink the path is junction → case ($R_{\theta jc}$, from the datasheet) → heat sink ($R_{\theta cs}$, set by the thermal interface material) → ambient ($R_{\theta sa}$, set by the heat sink and airflow). In steady state

$$
T_j = T_a + P\left(R_{\theta jc} + R_{\theta cs} + R_{\theta sa}\right).
$$ {#eq-thermal-chain}
:::

The analogy is exact: temperature ↔ voltage, heat flow ↔ current, thermal resistance ↔ resistance, and heat capacity ↔ capacitance to the ambient reference. Several devices on one heat sink inject their losses into a shared node; the heat sink's temperature is $T_s = T_a + R_{\theta sa}\sum P_k$, and each junction sits $P_k(R_{\theta jc} + R_{\theta cs})$ above it. A conduction-cooled design adds the resistances of the printed-circuit board and its copper planes, which dominate for surface-mount devices.

::: example Choosing a heat sink {#ex-heat-sink}
A MOSFET in a TO-220 package dissipates $6\,\mathrm{W}$. Its datasheet gives $R_{\theta jc} = 1.0\,\mathrm{K/W}$ and $T_{j,max} = 150^\circ\mathrm{C}$; the design rule is to keep $T_j \le 110^\circ\mathrm{C}$ at the maximum ambient of $45^\circ\mathrm{C}$ inside the enclosure. A silicone insulating pad gives $R_{\theta cs} = 0.5\,\mathrm{K/W}$. What heat-sink thermal resistance is needed? What would the junction reach without a heat sink, given $R_{\theta ja} = 62\,\mathrm{K/W}$ for the bare package?
::: solution
The total allowed resistance is $(110 - 45)/6 = 10.8\,\mathrm{K/W}$, so $R_{\theta sa} \le 10.8 - 1.0 - 0.5 = 9.3\,\mathrm{K/W}$ — a modest extruded aluminium heat sink in natural convection. The heat sink runs at $45 + 6\times9.3 = 101^\circ\mathrm{C}$, the case at $104^\circ\mathrm{C}$, the junction at $110^\circ\mathrm{C}$.

Without a heat sink the junction would rise by $6\times62 = 372\,\mathrm{K}$ — impossible; the device would fail long before. A bare TO-220 can dissipate only about $(110 - 45)/62 \approx 1\,\mathrm{W}$. Note also that $R_{DS(on)}$ at $110^\circ\mathrm{C}$ is roughly $1.6$ times its $25^\circ\mathrm{C}$ value, so the $6\,\mathrm{W}$ must have been computed with the hot resistance ([[power-electronics/power-switches]]).
:::
:::

::: quiz
Two MOSFETs, each dissipating $5\,\mathrm{W}$ with $R_{\theta jc} + R_{\theta cs} = 1.5\,\mathrm{K/W}$, share one heat sink of $R_{\theta sa} = 4\,\mathrm{K/W}$ in a $40^\circ\mathrm C$ ambient. What is each junction temperature?
- [ ] $67.5^\circ\mathrm C$
- [x] $87.5^\circ\mathrm C$
- [ ] $95^\circ\mathrm C$
- [ ] $107.5^\circ\mathrm C$
::: solution
Both losses flow through the heat sink: $T_s = 40 + 4\times(5 + 5) = 80^\circ\mathrm C$. Each junction is $5\times1.5 = 7.5\,\mathrm K$ above that: $87.5^\circ\mathrm C$. Treating each device as if it had the heat sink to itself ($40 + 5\times5.5 = 67.5^\circ\mathrm C$) is a common and dangerous error.
:::
:::

### Electrothermal feedback and thermal runaway

The loss of a device depends on its temperature, and its temperature on its loss. For a MOSFET, $R_{DS(on)}(T) \approx R_{25}[1 + a(T - 25^\circ\mathrm{C})]$ with $a \approx 0.005$–$0.008\,\mathrm{K^{-1}}$.

::: proposition Thermal runaway {#prop-runaway}
Let a device have loss $P(T_j)$ and a thermal resistance $R_\theta$ to an ambient at $T_a$. A steady operating point is a solution of $T_j = T_a + R_\theta P(T_j)$, and it is stable if

$$
R_\theta\,\frac{\dd P}{\dd T_j} < 1 .
$$

For a MOSFET with $P = I_{rms}^2R_{25}[1 + a(T_j - 25)]$, the operating point is

$$
T_j = \frac{T_a + R_\theta I_{rms}^2R_{25}(1 - 25a)}{1 - R_\theta I_{rms}^2R_{25}a} ,
$$

which exists only if $R_\theta I_{rms}^2R_{25}a < 1$; otherwise the temperature runs away.
:::

::: proof
With thermal capacitance $C_\theta$, the junction obeys $C_\theta\,\dd T_j/\dd t = P(T_j) - (T_j - T_a)/R_\theta$. Linearising about an equilibrium $T^\ast$, a perturbation $\tilde T$ obeys $C_\theta\,\dd\tilde T/\dd t = [P'(T^\ast) - 1/R_\theta]\tilde T$, which decays iff $P'(T^\ast) < 1/R_\theta$. For the linear loss model, substituting $P$ into $T_j = T_a + R_\theta P$ and solving the linear equation gives the formula; the slope condition $R_\theta I_{rms}^2R_{25}a < 1$ is the same for every temperature because $P$ is linear in $T_j$, and when it fails the heating line is steeper than the cooling line and there is no intersection at a physically meaningful temperature.
:::

::: widget plot
f: u^2*0.01*(1 + 0.007*(x - 25)); (x - 40)/r
x: 25, 200
y: 0, 12
sliders: u=20:1:35:0.5; r=5:1:40:0.5
labels: P(T_j)\ \text{generated (W)}; (T_j - T_a)/R_\theta\ \text{removed (W)}
caption: Heat generated by a MOSFET of $R_{25} = 10\,\mathrm{m\Omega}$ and temperature coefficient $0.7\,\%/\mathrm K$ carrying an RMS current $u$ (amperes), and heat removed through a thermal resistance $r$ (K/W) to a $40^\circ\mathrm C$ ambient, against junction temperature. The operating point is where the lines cross. Increase $r$ (a smaller heat sink) or $u$: the crossing moves to the right ever faster, and once the generation line is steeper than the removal line the crossing disappears — thermal runaway. Real devices fail before the lines stop meeting, because the crossing passes $150^\circ\mathrm C$ first.
:::

::: example Electrothermal operating point {#ex-runaway}
A MOSFET with $R_{25} = 10\,\mathrm{m\Omega}$ and $a = 0.007\,\mathrm{K^{-1}}$ carries $20\,\mathrm{A}$ RMS through $R_\theta = 5\,\mathrm{K/W}$ to a $40^\circ\mathrm C$ ambient. Find the junction temperature and loss, and the thermal resistance at which runaway would occur.
::: solution
$I_{rms}^2R_{25} = 400\times0.01 = 4\,\mathrm{W}$ at $25^\circ\mathrm{C}$, and $R_\theta I_{rms}^2R_{25}a = 5\times4\times0.007 = 0.14$. By [[#prop-runaway]], $T_j = [40 + 5\times4\times(1 - 0.175)]/(1 - 0.14) = (40 + 16.5)/0.86 = 65.7^\circ\mathrm{C}$, and $P = 4[1 + 0.007\times40.7] = 5.14\,\mathrm{W}$. (Ignoring the temperature dependence would have predicted $60^\circ\mathrm{C}$.) Runaway requires $R_\theta \ge 1/(4\times0.007) = 35.7\,\mathrm{K/W}$; but long before that, at $R_\theta \approx 15\,\mathrm{K/W}$, the junction already passes $150^\circ\mathrm{C}$.
:::
:::

### Transients and reliability

For short pulses the junction's heat capacity matters, and datasheets give a **transient thermal impedance** $Z_{\theta jc}(t)$, the temperature rise per watt after a power step of duration $t$; it rises from almost zero for microsecond pulses to $R_{\theta jc}$ for long ones, and is often represented by a ladder of RC sections (a Foster or Cauer network). A converter's switching losses arrive in pulses at $f_s$, far faster than any thermal time constant, so only their average matters; but motor drives at low output frequency, and pulsed loads, heat and cool the junction every fundamental cycle. **Thermal cycling** — repeated swings $\Delta T_j$ — fatigues bond wires and solder layers, and the number of cycles to failure falls steeply with $\Delta T_j$ (roughly as $\Delta T_j^{-5}$ in the empirical Coffin–Manson fits used for IGBT modules). Thermal design therefore aims not only at a safe maximum temperature but at small temperature swings.

::: application Cooling in an EV traction inverter
An $800\,\mathrm{V}$, $250\,\mathrm{kW}$ silicon-carbide traction inverter that is $98.5\,\%$ efficient must still remove almost $4\,\mathrm{kW}$ from semiconductor dies with a total area of a few square centimetres. It uses a liquid-cooled pin-fin baseplate soldered or sintered directly to the power module's substrate, with a water–glycol loop at up to $65^\circ\mathrm{C}$ shared with the motor and battery; junction-to-coolant thermal resistances are around $0.1$–$0.2\,\mathrm{K/W}$ per switch position. Sintered-silver die attach and copper bond clips replace solder and aluminium wires to survive the thermal cycling of urban driving. The inverter's mass and volume are set more by its cooling and its DC-link capacitor than by its semiconductors.
:::

::: history
Charles Proteus Steinmetz published his empirical law for hysteresis loss, $\propto\hat B^{1.6}$, in 1892, from measurements on iron at power frequencies; the generalised form with a frequency exponent is the modern descendant. Ferrites suitable for high-frequency power magnetics were developed by J. L. Snoek and colleagues at Philips in the Netherlands during the 1940s, and they made high-frequency switch-mode transformers practical. P. L. Dowell's 1966 paper on eddy currents in transformer windings gave the layer-by-layer analysis of proximity loss still used today. Litz wire takes its name from the German *Litzendraht*, "stranded wire".
:::

## Where this leads

Every converter in [[power-electronics/dc-dc-converters]], [[power-electronics/isolated-converters]] and [[power-electronics/inverters]] needs the magnetics and thermal design of this chapter before it can be built; the applications of [[power-electronics/power-electronics-applications]] are often decided by power density, which is magnetics and cooling more than semiconductors. The transformer and inductor models connect to the machine theory of [[electric-machines/transformers]], and the thermal-network analogy to the circuit analysis of [[circuits-1]].

::: summary
- A gapped core has $L \approx \mu_0N^2A_c/g$: the gap fixes the inductance and stores almost all the energy, $\frac{B^2}{2\mu_0}A_cg$.
- An inductor must satisfy inductance, saturation ($B_{pk} = LI_{pk}/(NA_c) < B_{max}$), window fill and current-density constraints; together they require $A_p = W_aA_c \ge LI_{pk}I_{rms}/(B_{max}JK_u)$.
- At high frequency copper loss rises through the skin effect ($\delta = \sqrt{\rho/(\pi f\mu_0)}$, $0.24\,\mathrm{mm}$ at $100\,\mathrm{kHz}$) and the proximity effect; Litz wire, foil and interleaving reduce it.
- Core loss follows Steinmetz, $P_v = kf^\alpha\hat B^\beta$; a transformer's total loss is minimised when $P_{fe} = (2/\beta)P_{cu}$, roughly equal losses.
- DC inductors are usually copper- and saturation-limited; high-frequency transformers are core-loss-limited.
- Thermal resistances add in series: $T_j = T_a + P(R_{\theta jc} + R_{\theta cs} + R_{\theta sa})$; temperature-dependent losses shift the operating point and can run away when $R_\theta\,\dd P/\dd T \ge 1$.
:::

## Exercises

::: exercise Inductance of a gapped core {level=1 check="4*pi*1e-7*900*1e-4/5e-4"}
A winding of $30$ turns is placed on a ferrite core with $A_c = 1\,\mathrm{cm^2}$ and a $0.5\,\mathrm{mm}$ gap. Neglecting the core's reluctance and fringing, find the inductance in henries.
::: solution
$L = \mu_0N^2A_c/g = 4\pi\times10^{-7}\times900\times10^{-4}/(5\times10^{-4}) = 226\,\mathrm{\mu H}$.
:::
:::

::: exercise Skin depth at 500 kHz {level=1 check="sqrt(1.72e-8/(pi*5e5*4*pi*1e-7))"}
Find the skin depth in metres of copper at $20^\circ\mathrm{C}$ ($\rho = 1.72\times10^{-8}\,\Omega\,\mathrm m$) at $500\,\mathrm{kHz}$. What strand diameter would you choose for Litz wire at this frequency?
::: solution
$\delta = \sqrt{1.72\times10^{-8}/(\pi\times5\times10^5\times4\pi\times10^{-7})} = 93\,\mathrm{\mu m}$. Strands of about $0.05$–$0.1\,\mathrm{mm}$ diameter (around AWG 40–44) are typical, well below $2\delta$, so that the proximity effect in a bundle of many strands stays small.
:::
:::

::: exercise Heat-sink requirement {level=1 check="(125-40)/20 - 0.8 - 0.2"}
An IGBT dissipates $20\,\mathrm{W}$ with $R_{\theta jc} = 0.8\,\mathrm{K/W}$ and $R_{\theta cs} = 0.2\,\mathrm{K/W}$. Find the largest heat-sink thermal resistance (in K/W) that keeps the junction at $125^\circ\mathrm{C}$ in a $40^\circ\mathrm{C}$ ambient.
::: solution
$R_{\theta sa} \le (125 - 40)/20 - 0.8 - 0.2 = 4.25 - 1.0 = 3.25\,\mathrm{K/W}$.
:::
:::

::: exercise Forward-converter turns {level=2 check="48*0.45*5e-6/(0.2*0.5e-4)"}
A forward converter on $48\,\mathrm{V}$ runs at up to $D = 0.45$ at $200\,\mathrm{kHz}$ on a core with $A_c = 0.5\,\mathrm{cm^2}$. What is the minimum number of primary turns (as a real number, before rounding) for a flux swing $\Delta B \le 0.2\,\mathrm{T}$?
::: solution
$N_p \ge V_gDT_s/(\Delta BA_c) = 48\times0.45\times5\times10^{-6}/(0.2\times0.5\times10^{-4}) = 10.8$; use $11$ turns. Here the flux swings from zero to $\Delta B$ (unipolar), so the peak is $0.2\,\mathrm{T}$.
:::
:::

::: exercise Halving the flux {level=2 check="2^2.6"}
A transformer's core loss follows $P_v \propto\hat B^{2.6}$. By what factor does the core loss fall if the turns are doubled (halving $\hat B$), and by what factor does the copper loss rise if the window stays full?
::: solution
Core loss falls by $2^{2.6} = 6.06$; copper loss rises by $2^2 = 4$ (twice the length, half the area per turn). Whether this helps depends on where the design sits relative to [[#eq-optimum-flux]].
:::
:::

::: exercise Energy in the gap {level=2 check="0.5*100e-6*11^2"}
For the inductor of [[#ex-inductor]], compute the peak stored energy in joules from $\frac12LI_{pk}^2$ and from $\frac{B_{pk}^2}{2\mu_0}A_cg$, and explain why they agree.
::: solution
$\frac12LI_{pk}^2 = 0.5\times10^{-4}\times121 = 6.05\,\mathrm{mJ}$. With $B_{pk} = LI_{pk}/(NA_c) = 0.299\,\mathrm{T}$ and $A_cg = 1.6\times10^{-4}\times1.064\times10^{-3} = 1.70\times10^{-7}\,\mathrm{m^3}$: $\frac{0.299^2}{2\times4\pi\times10^{-7}}\times1.70\times10^{-7} = 6.05\,\mathrm{mJ}$. They agree because the gap was computed from $L = \mu_0N^2A_c/g$ with the core's reluctance neglected, which is exactly the assumption that all the energy is in the gap ([[#thm-gap-energy]]).
:::
:::

::: exercise A pulse of power {level=2 check="100*0.5*(1 - exp(-0.2))"}
A device whose junction-to-case thermal impedance is modelled as a single RC section with $R = 0.5\,\mathrm{K/W}$ and $\tau = 50\,\mathrm{ms}$ dissipates a $100\,\mathrm{W}$ pulse lasting $10\,\mathrm{ms}$. Find the junction temperature rise in kelvin at the end of the pulse, and compare it with the steady-state rise.
::: solution
$\Delta T = PR(1 - e^{-t/\tau}) = 100\times0.5\times(1 - e^{-0.2}) = 9.06\,\mathrm{K}$, against $50\,\mathrm{K}$ in steady state: the junction's heat capacity absorbs most of a short pulse. This is why devices can survive surge currents far above their continuous rating.
:::
:::

::: exercise The optimum flux density {level=3}
For a transformer with $P_{fe} = k_{fe}\hat B^\beta$ and $P_{cu} = k_{cu}\hat B^{-2}$, (a) find the optimum $\hat B$ in terms of $k_{fe}$, $k_{cu}$ and $\beta$; (b) express the minimum total loss as a multiple of $P_{cu}$ at the optimum; (c) with $\beta = 2.6$ and the two losses equal at $\hat B_1$, find the optimum as a fraction of $\hat B_1$.
::: solution
(a) $\beta k_{fe}\hat B^{\beta - 1} = 2k_{cu}\hat B^{-3}$, so $\hat B_{opt} = (2k_{cu}/(\beta k_{fe}))^{1/(\beta + 2)}$. (b) At the optimum $P_{fe} = (2/\beta)P_{cu}$, so $P_{tot} = P_{cu}(1 + 2/\beta)$. (c) Equal losses at $\hat B_1$ means $k_{fe}\hat B_1^\beta = k_{cu}\hat B_1^{-2}$, so $k_{cu}/k_{fe} = \hat B_1^{\beta + 2}$ and $\hat B_{opt}/\hat B_1 = (2/\beta)^{1/(\beta + 2)} = (0.769)^{0.217} = 0.945$: the optimum lies about $5\,\%$ below the crossing, as the figure shows.
:::
:::

::: exercise Designing the buck inductor {level=3}
Design an inductor for the buck converter of [[power-electronics/dc-dc-converters#ex-buck-design]] ($3.3\,\mathrm{\mu H}$, $I_{out} = 5\,\mathrm{A}$, $\Delta i_L = 1.45\,\mathrm{A}$, $500\,\mathrm{kHz}$), allowing for a current limit of $8\,\mathrm{A}$ that the core must not saturate at. Use $B_{max} = 0.3\,\mathrm{T}$, $J = 6\,\mathrm{A/mm^2}$, $K_u = 0.35$. (a) Find the required area product. (b) For a small core with $A_c = 0.2\,\mathrm{cm^2}$ and $W_a = 0.15\,\mathrm{cm^2}$, find the turns, gap and wire area, and check the window. (c) Comment on the winding at $500\,\mathrm{kHz}$.
::: solution
(a) Size saturation for the current limit: $A_p \ge LI_{lim}I_{rms}/(B_{max}JK_u)$ with $I_{rms} = \sqrt{25 + 1.45^2/12} = 5.02\,\mathrm{A}$: $3.3\times10^{-6}\times8\times5.02/(0.3\times6\times10^6\times0.35) = 2.1\times10^{-10}\,\mathrm{m^4} = 0.021\,\mathrm{cm^4}$. (b) The core offers $0.03\,\mathrm{cm^4}$. $N = LI_{lim}/(B_{max}A_c) = 3.3\times10^{-6}\times8/(0.3\times2\times10^{-5}) = 4.4$, so $5$ turns; $g = \mu_0\times25\times2\times10^{-5}/(3.3\times10^{-6}) = 0.19\,\mathrm{mm}$; $A_w = 5.02/6 = 0.84\,\mathrm{mm^2}$; the winding needs $4.2\,\mathrm{mm^2}$ of the $0.35\times15 = 5.25\,\mathrm{mm^2}$ available — it fits. (c) The skin depth at $500\,\mathrm{kHz}$ is about $0.1\,\mathrm{mm}$, so a single round wire of $0.84\,\mathrm{mm^2}$ ($1.03\,\mathrm{mm}$ diameter) would have high AC resistance for the ripple; but with only $5$ turns, a single layer of copper foil or flat wire, and a ripple of only $0.42\,\mathrm{A}$ RMS, the AC loss is modest. Commercial inductors of this kind use a flat-wire single-layer winding or a moulded powdered-iron construction.
:::
:::
