A finished processor die is a slab of silicon about $0.8\,\mathrm{mm}$ thick and the size of a fingernail. Almost all of its function lives in the top ten micrometres: a single layer of transistors at the surface, and above it a stack of a dozen or more levels of copper wiring embedded in insulating glass. Every feature in those layers was printed by shining light through a **mask** onto a light-sensitive film, and then etching, implanting or depositing material wherever the film had been removed. A leading-edge chip as of 2026 needs between seventy and a hundred such patterning steps and several hundred processing steps in all, spread over two to three months in a factory that costs twenty billion dollars or more.

A circuit designer does not run that factory, but cannot ignore it either. The process fixes what can be drawn: how narrow a gate can be, how close two wires may run, which layers can touch. It fixes the parasitic resistances and capacitances that will set the delay of every gate in the chapters that follow. And it fixes the price: the number of good dies a wafer yields depends steeply on how large each die is. This chapter describes the CMOS process from the designer's point of view. We look at the unit steps — lithography, oxidation, implantation, deposition and etching — with the simple physical models behind each, follow a complete twin-well CMOS flow, and then turn to the designer's interface to the process: layers and masks, design rules, stick diagrams and layout. We end with yield and cost. The transistor physics is assumed from [[semiconductor-devices/mosfets]] and [[semiconductor-devices/mos-capacitor]].

## The unit processes

Integrated circuits are made by the **planar process**: a sequence of steps, each applied to the whole wafer at once, in which a pattern is transferred into or onto the surface. The wafer is a single crystal of silicon, grown from a melt by the Czochralski method, sliced and polished. Production wafers have been $300\,\mathrm{mm}$ in diameter since the early 2000s; one wafer carries hundreds of large dies or thousands of small ones, and every die receives the same treatment.

### Photolithography

Patterning starts with **photolithography**. The wafer is coated with a thin film of **photoresist**, a polymer whose solubility changes when it is exposed to light. A projection **scanner** images the pattern of a mask (also called a reticle) onto the resist, usually reduced four times. In a **positive** resist the exposed areas dissolve in the developer; in a **negative** resist the unexposed areas do. The remaining resist then protects the material underneath during the next step — an etch or an implant — after which it is stripped.

The smallest feature a lens can print is limited by diffraction. An optical system of **numerical aperture** $\mathrm{NA} = n\sin\theta$ (where $\theta$ is the half-angle of the cone of light collected and $n$ the refractive index of the medium in front of the wafer) cannot resolve details much finer than the wavelength divided by $\mathrm{NA}$.

::: proposition Rayleigh resolution and depth of focus {#prop-rayleigh}
A projection lithography system of wavelength $\lambda$ and numerical aperture $\mathrm{NA}$ prints a minimum half-pitch (critical dimension)

$$
\mathrm{CD} = k_1\frac{\lambda}{\mathrm{NA}},
$$ {#eq-rayleigh}

with a depth of focus

$$
\mathrm{DOF} = k_2\frac{\lambda}{\mathrm{NA}^2}.
$$ {#eq-dof}

The factors $k_1$ and $k_2$ depend on the illumination, the mask and the resist. Diffraction theory sets the limit $k_1 \ge 0.25$ for a periodic pattern of lines and spaces imaged with partially coherent light.
:::

A sketch of the reason: a grating of pitch $p$ diffracts light into orders at angles $\sin\theta_m = m\lambda/p$. To form any image at all, the lens must collect at least two orders. With illumination tilted so that the zeroth order enters at one edge of the pupil and the first order at the other, the two can be separated by up to $2\,\mathrm{NA}$ in $\sin\theta$, so $\lambda/p \le 2\,\mathrm{NA}$, i.e. a half-pitch $p/2 \ge 0.25\,\lambda/\mathrm{NA}$. The depth of focus shrinks as $1/\mathrm{NA}^2$ because the phase difference between orders that travel at different angles grows quadratically with the angle when the wafer is out of focus. A full treatment is in Plummer, Deal and Griffin, chapter 5.

Equation [[#eq-rayleigh]] lists the only three ways to print smaller features, and the industry has used all three. The wavelength fell from the mercury lines ($436$ and $365\,\mathrm{nm}$) to excimer lasers (KrF at $248\,\mathrm{nm}$, ArF at $193\,\mathrm{nm}$) and finally to **extreme ultraviolet** (EUV) light at $13.5\,\mathrm{nm}$. The numerical aperture rose towards $1$, and beyond it with **immersion** lithography, in which water ($n = 1.44$ at $193\,\mathrm{nm}$) fills the gap between lens and wafer, allowing $\mathrm{NA} = 1.35$. And $k_1$ was pushed down towards its limit with **resolution enhancement techniques**: off-axis illumination, phase-shifting masks, and **optical proximity correction** (OPC), in which the mask shapes are deliberately distorted — with serifs, hammerheads and sub-resolution assist bars — so that the printed shapes come out as intended.

::: example Resolution of immersion and EUV scanners {#ex-resolution}
Estimate the minimum half-pitch for (a) ArF immersion lithography with $\mathrm{NA} = 1.35$ and $k_1 = 0.28$, (b) EUV with $\mathrm{NA} = 0.33$ and $k_1 = 0.4$, (c) "high-NA" EUV with $\mathrm{NA} = 0.55$ and the same $k_1$. Compare the depths of focus of (a) and (c), taking $k_2 = 1$.
::: solution
By [[#eq-rayleigh]]:

(a) $\mathrm{CD} = 0.28\times193/1.35 = 40\,\mathrm{nm}$.

(b) $\mathrm{CD} = 0.4\times13.5/0.33 = 16.4\,\mathrm{nm}$.

(c) $\mathrm{CD} = 0.4\times13.5/0.55 = 9.8\,\mathrm{nm}$.

By [[#eq-dof]], the depth of focus is $193/1.35^2 = 106\,\mathrm{nm}$ for (a) and $13.5/0.55^2 = 45\,\mathrm{nm}$ for (c). The high-NA tool resolves four times finer than immersion but tolerates less than half the focus error, so the wafer must be flatter and the resist thinner. This is one reason why chemical–mechanical polishing (below) is applied after nearly every layer.
:::
:::

A $40\,\mathrm{nm}$ half-pitch is an $80\,\mathrm{nm}$ pitch, yet ArF immersion was used to make metal layers with pitches near $40\,\mathrm{nm}$. The trick is **multiple patterning**. In litho–etch–litho–etch (LELE) a dense pattern is split between two masks, each with twice the pitch. In **self-aligned double patterning** (SADP), a coarse pattern of "mandrels" is printed, a thin film is deposited conformally over it and etched back so that it remains only on the sidewalls, and the mandrels are removed: two lines now stand where one was printed. Repeating the trick (SAQP) quarters the pitch. Each pass adds masks, steps, cost and the risk of misalignment between the two halves of a pattern, which is why EUV, despite its own difficulties, was introduced into volume production in 2019. As of 2026, EUV with $\mathrm{NA} = 0.33$ prints the critical layers of every leading logic process, and the first high-NA tools are installed for process development, with their use in volume production expected later in the decade.

::: quiz
Which change does **not** reduce the minimum printable half-pitch in [[#eq-rayleigh]]?
- [ ] filling the gap between lens and wafer with water
- [ ] moving from $193\,\mathrm{nm}$ to $13.5\,\mathrm{nm}$ light
- [x] increasing the depth of focus by stopping down the lens
- [ ] adding optical proximity correction to the mask
::: solution
Water raises the refractive index and hence $\mathrm{NA}$; EUV lowers $\lambda$; OPC lowers the effective $k_1$. Stopping down the lens lowers $\mathrm{NA}$: the depth of focus improves as $1/\mathrm{NA}^2$, but the resolution worsens as $1/\mathrm{NA}$. Resolution and depth of focus pull in opposite directions.
:::
:::

### Thermal oxidation

Silicon's great advantage over every other semiconductor is its native oxide. Heating a wafer to $800$–$1200\,^\circ\mathrm C$ in oxygen (**dry oxidation**) or steam (**wet oxidation**) grows a layer of amorphous $\mathrm{SiO_2}$ whose interface with the silicon has very few defects. The oxide grows *into* the silicon: oxygen must diffuse through the oxide already formed to react at the interface, and about $0.44$ of the final thickness is silicon consumed.

::: theorem Deal–Grove oxidation law {#thm-deal-grove}
Suppose oxidant arrives at the oxide surface at a fixed concentration $C^*$, diffuses through the oxide with diffusivity $D$, and reacts at the Si–SiO$_2$ interface at a rate $k_sC_i$ proportional to its concentration $C_i$ there. If $N_1$ oxidant molecules are incorporated per unit volume of oxide, the oxide thickness $x$ satisfies

$$
x^2 + Ax = B(t + \tau), \qquad A = \frac{2D}{k_s}, \quad B = \frac{2DC^*}{N_1},
$$ {#eq-deal-grove}

where $\tau$ accounts for an initial thickness $x_0$: $\tau = (x_0^2 + Ax_0)/B$.
:::

::: proof
In steady state the oxidant flux $F$ is the same through the oxide and into the reaction: by Fick's law, $F = D(C^* - C_i)/x$, and at the interface $F = k_sC_i$. Eliminating $C_i$,

$$
C_i = \frac{C^*}{1 + k_sx/D}, \qquad F = \frac{k_sC^*}{1 + k_sx/D}.
$$

Each unit volume of oxide consumes $N_1$ molecules, so the interface advances at $\mathrm dx/\mathrm dt = F/N_1$:

$$
\left(1 + \frac{k_sx}{D}\right)\frac{\mathrm dx}{\mathrm dt} = \frac{k_sC^*}{N_1}.
$$

Multiply by $2D/k_s$ and integrate from $x_0$ at $t = 0$: $x^2 - x_0^2 + A(x - x_0) = Bt$, which is [[#eq-deal-grove]].
:::

The law has two limits. For thin oxides ($x \ll A$) the growth is **linear**, $x \approx (B/A)(t + \tau)$, limited by the interface reaction. For thick oxides ($x \gg A$) it is **parabolic**, $x \approx \sqrt{Bt}$, limited by diffusion through the oxide. Steam diffuses much faster than oxygen and is far more soluble in the oxide, so wet oxidation is used for thick isolation oxides; dry oxidation, slower and more controllable, was used for gate oxides. The measured constants fit the law well above about $30\,\mathrm{nm}$; for thinner dry oxides the initial growth is faster than predicted, which Deal and Grove absorbed into $\tau$.

::: example Growing a field oxide {#ex-oxide}
At $1000\,^\circ\mathrm C$ the Deal–Grove constants for dry oxidation are $A = 0.165\,\mathrm{\mu m}$, $B = 0.0117\,\mathrm{\mu m^2/h}$ and $\tau = 0.37\,\mathrm h$. How long does it take to grow $0.1\,\mathrm{\mu m}$ of oxide? What thickness is reached after $3\,\mathrm h$? How much silicon is consumed in the first case?
::: solution
Solve [[#eq-deal-grove]] for $t$:

$$
t = \frac{x^2 + Ax}{B} - \tau = \frac{0.01 + 0.0165}{0.0117} - 0.37 = 2.265 - 0.37 = 1.89\,\mathrm h.
$$

For $t = 3\,\mathrm h$, solve the quadratic for $x$:

$$
x = \frac{-A + \sqrt{A^2 + 4B(t + \tau)}}{2} = \frac{-0.165 + \sqrt{0.0272 + 4(0.0117)(3.37)}}{2} = 0.133\,\mathrm{\mu m}.
$$

Running $1.6$ times longer gave only $1.33$ times the thickness: the growth is already slowing towards the parabolic regime. The silicon consumed for $0.1\,\mathrm{\mu m}$ of oxide is $0.44\times0.1 = 44\,\mathrm{nm}$.
:::
:::

::: widget plot
f: (-0.165 + sqrt(0.165^2 + 4*0.0117*(x + 0.37)))/2; (-0.226 + sqrt(0.226^2 + 4*0.287*x))/2; sqrt(0.287*x)
x: 0, 6
y: 0, 1.4
labels: \text{dry O}_2; \text{wet (steam)}; \sqrt{Bt}\ \text{(wet, parabolic limit)}
caption: Oxide thickness in micrometres against time in hours at $1000\,^\circ\mathrm C$ from the Deal–Grove law [[#eq-deal-grove]], dry ($A = 0.165\,\mathrm{\mu m}$, $B = 0.0117\,\mathrm{\mu m^2/h}$) and wet ($A = 0.226\,\mathrm{\mu m}$, $B = 0.287\,\mathrm{\mu m^2/h}$). Hover over the curves: after one hour the wet oxide is about seven times thicker than the dry one. The wet curve approaches the parabolic limit $\sqrt{Bt}$ from below as the thickness grows past $A$.
:::

Gate dielectrics in modern processes are no longer thermal oxides. Below about $1.2\,\mathrm{nm}$ silicon dioxide leaks by direct tunnelling, and since the 45 nm generation (2007) the gate stack has been a thin interfacial oxide topped by a **high-k** dielectric, usually hafnium oxide, deposited atom layer by atom layer ([[semiconductor-devices/mos-capacitor]]). Thermal oxidation remains essential for interfaces, sacrificial layers and isolation liners.

### Ion implantation and diffusion

Dopants are introduced by **ion implantation**: ions of boron, phosphorus or arsenic are accelerated to energies from a few hundred electronvolts to a few mega-electronvolts and fired into the wafer, through openings in a resist or oxide mask. The dose $Q$ (ions per square centimetre) is measured precisely by integrating the beam current. The ions slow down by collisions with nuclei and electrons and come to rest at a spread of depths.

::: proposition Gaussian implant profile {#prop-implant}
To a first approximation the implanted concentration is

$$
N(x) = \frac{Q}{\sqrt{2\pi}\,\Delta R_p}\exp\!\left[-\frac{(x - R_p)^2}{2\Delta R_p^2}\right],
$$ {#eq-implant}

where the **projected range** $R_p$ and the **straggle** $\Delta R_p$ increase with ion energy and decrease with ion mass. If the wafer was uniformly doped with the opposite type at concentration $N_B$, a junction forms where $N(x) = N_B$; the deeper one is at

$$
x_j = R_p + \Delta R_p\sqrt{2\ln\frac{N_p}{N_B}}, \qquad N_p = \frac{Q}{\sqrt{2\pi}\,\Delta R_p}.
$$ {#eq-xj}
:::

The Gaussian is the distribution of the sum of many small random displacements — the central limit theorem applied to the ion's path — and its area is the dose. Setting $N(x) = N_B$ and solving for $x$ gives [[#eq-xj]]. Real profiles are skewed, and in a crystal some ions travel far along open channels between atomic rows (**channelling**); wafers are therefore tilted about $7^\circ$ during implantation, and accurate profiles come from Monte Carlo simulation.

Implantation knocks silicon atoms out of their lattice sites and leaves the dopants mostly in interstitial, electrically inactive positions. An **anneal** — today a rapid thermal "spike" lasting about a second, or a millisecond laser or flash anneal — repairs the damage and activates the dopants. While the wafer is hot, dopants also **diffuse**, which spreads the profile; the total thermal budget of the process is therefore carefully limited, and modern flows minimise the time spent above about $1000\,^\circ\mathrm C$ to keep junctions shallow.

::: example A boron well implant {#ex-implant}
Boron is implanted into an n-type wafer with $N_B = 10^{16}\,\mathrm{cm^{-3}}$ at a dose $Q = 10^{13}\,\mathrm{cm^{-2}}$, at an energy giving $R_p = 0.10\,\mathrm{\mu m}$ and $\Delta R_p = 0.035\,\mathrm{\mu m}$. Find the peak concentration and the depth of the pn junction, ignoring diffusion during the anneal.
::: solution
With $\Delta R_p = 3.5\times10^{-6}\,\mathrm{cm}$,

$$
N_p = \frac{10^{13}}{\sqrt{2\pi}\times3.5\times10^{-6}} = 1.14\times10^{18}\,\mathrm{cm^{-3}}.
$$

Then $\ln(N_p/N_B) = \ln 114 = 4.74$ and by [[#eq-xj]]

$$
x_j = 0.10 + 0.035\sqrt{2\times4.74} = 0.10 + 0.035\times3.08 = 0.208\,\mathrm{\mu m}.
$$

The implanted layer is p-type from close to the surface down to about $0.21\,\mathrm{\mu m}$ (there is also a shallow junction near the surface, where the profile's tail is below $N_B$ only if $R_p$ is more than a few straggles deep — here $N(0) = N_pe^{-4.08} = 1.9\times10^{16} > N_B$, so the layer reaches the surface).
:::
:::

::: widget plot
f: log10(max(10^q/(sqrt(2*pi)*s*1e-4)*exp(-(x - r)^2/(2*s^2)), 1)); b
x: 0, 0.5
y: 14, 20
sliders: q=13:11:16:0.1; r=0.1:0.02:0.3:0.005; s=0.035:0.005:0.1:0.001; b=16:14:18:0.1
labels: \log_{10}N(x); \log_{10}N_B
caption: An implanted Gaussian profile [[#eq-implant]], $\log_{10}$ of the concentration in $\mathrm{cm^{-3}}$ against depth in micrometres, for dose $10^{q}\,\mathrm{cm^{-2}}$, projected range $r$ and straggle $s$ (both in µm), with the background doping $10^{b}$. The junction is where the curves cross. Raise the dose by a decade: the peak rises by a decade but the junction moves only slightly deeper, because $x_j$ depends on the logarithm of $N_p/N_B$. Raise the energy (larger $r$ and $s$) to bury the profile; a high-energy implant of this kind forms a **retrograde well**, more heavily doped below the surface than at it.
:::

### Deposition, etching and planarisation

Films that cannot be grown from the substrate are **deposited**. **Chemical vapour deposition** (CVD) reacts gases at the hot wafer surface to form polysilicon, silicon nitride or oxide; **physical vapour deposition** (sputtering) knocks atoms off a target to coat the wafer with metals; **atomic layer deposition** (ALD) builds a film one monolayer per cycle by alternating two self-limiting surface reactions, giving perfectly conformal films a few nanometres thick — high-k gate dielectrics, metal-gate work-function layers and diffusion barriers are all made this way. Copper is put down by **electroplating** onto a thin sputtered seed layer.

Patterns are cut into films by **etching**. Wet chemical etches are isotropic: they undercut the mask as fast as they etch down. **Reactive-ion etching** in a plasma combines chemical attack by radicals with directional ion bombardment, and can cut vertical sidewalls with depth-to-width ratios of fifty or more; it is used for every critical layer.

Every deposition and etch leaves topography, and topography is fatal to lithography with a $45\,\mathrm{nm}$ depth of focus. **Chemical–mechanical polishing** (CMP), introduced by IBM in the 1980s, grinds the wafer flat with a slurry of abrasive particles in a reactive solution. CMP made two crucial process modules possible: shallow-trench isolation and copper damascene wiring. Because the polish rate depends on the local density of the pattern, design rules require minimum and maximum densities of each layer in every window of the chip, and layout tools fill empty regions with electrically useless **dummy fill** shapes to meet them.

## A twin-well CMOS process

We now put the unit steps together into a CMOS flow. The version below is a planar, polysilicon-gate, twin-well process of the kind used from the 1990s to the 65 nm generation; it shows clearly how each layer of a layout is made. Afterwards we note what changes in FinFET and nanosheet processes.

::: algorithm Planar twin-well CMOS process flow {#alg-flow}
1. **Substrate.** Start with a lightly doped p-type wafer, often with a lightly doped epitaxial layer on a heavily doped substrate.
2. **Isolation.** Grow a thin pad oxide and deposit silicon nitride; pattern the **active** mask, etch trenches $300$–$400\,\mathrm{nm}$ deep around the active regions, fill them with deposited oxide and polish back to the nitride by CMP (**shallow-trench isolation**, STI). Strip the nitride.
3. **Wells.** With the **n-well** mask, implant phosphorus where pMOS transistors will go; with the complementary **p-well** mask, implant boron for the nMOS. Further shallow implants set the threshold voltages.
4. **Gate stack.** Grow the gate dielectric and deposit polysilicon; pattern the **poly** mask — the most critical step, since it defines the channel length — and etch.
5. **Extensions and spacers.** Implant shallow, lightly doped source/drain extensions, self-aligned to the gate (n-type with the **n-select** mask, p-type with **p-select**). Deposit a conformal nitride film and etch it back anisotropically so that it remains only as **spacers** on the gate sidewalls.
6. **Source and drain.** Implant the heavy $\mathrm{n^+}$ and $\mathrm{p^+}$ source/drain regions through the select masks, now offset from the gate by the spacers, and anneal. The same implants dope the polysilicon gates and form the well and substrate contacts.
7. **Silicide.** Deposit a metal such as nickel and react it with exposed silicon: a low-resistance silicide forms on sources, drains and gates but not on the oxide and spacers (**self-aligned silicide**, salicide).
8. **Contacts.** Deposit and planarise a pre-metal dielectric, etch **contact** holes with the contact mask, and fill them with tungsten.
9. **Interconnect.** Build each metal level by the copper **dual-damascene** process (below), with a **via** mask and a **metal** mask per level.
10. **Passivation.** Cover the chip with a protective nitride and open the bond or bump pads.
:::

Two features of this flow are worth noticing. First, the source and drain implants are **self-aligned** to the gate: the gate itself, already patterned, masks the channel, so the source and drain edges line up with the gate edges automatically and the select masks need only be coarsely aligned. The self-aligned gate, introduced around 1968, is the reason MOS transistors could be made small and fast. Second, the polysilicon of step 4 does double duty as the gate electrode and as a short-range wiring layer.

**Copper damascene.** Copper cannot be dry-etched cleanly, so the wiring is made the other way round, as in the ancient inlay technique the process is named after. The insulator — a porous, carbon-doped "low-k" glass with relative permittivity around $2.5$–$3$ instead of $3.9$ for $\mathrm{SiO_2}$ — is deposited first, and trenches (for wires) and holes (for vias) are etched into it. A thin barrier of tantalum nitride and tantalum stops copper from diffusing into the dielectric and silicon, a copper seed is sputtered, the trenches are filled by electroplating, and CMP removes the excess copper from the surface, leaving copper only in the trenches. In dual damascene the via and the wire above it are filled in one step. The lower metal levels have the finest pitches; upper levels are progressively thicker and wider, for long global wires and the power grid ([[digital-ic/interconnect]]).

**Modern devices.** In FinFET processes (since 2011) the channel is a fin of silicon a few nanometres wide, etched into the substrate, and the gate wraps over it; in gate-all-around nanosheet processes (Samsung from 2022, TSMC's N2 and Intel's 18A in volume production from late 2025) the channel is a stack of thin horizontal silicon sheets grown between sacrificial SiGe layers that are later etched away, so the gate surrounds each sheet. Both use a **replacement metal gate**: a dummy polysilicon gate defines the self-aligned source and drain (now grown epitaxially, with SiGe in pMOS for strain), and is then removed and replaced by the high-k dielectric and work-function metals. The newest step, **backside power delivery**, moves the power wiring beneath the transistors, to the back of a thinned wafer; Intel's 18A introduced it in 2025, and TSMC's A16 process is scheduled to follow in 2026.

::: warning A layout is not a cross-section
The layers in a layout editor are **mask layers**, not physical layers, and the mapping between them is not one-to-one. There is no "gate" layer: a transistor exists wherever poly crosses active. The $\mathrm{n^+}$ and $\mathrm{p^+}$ regions are not drawn directly; they are the intersection of active with the n-select or p-select mask, minus the area under poly. The STI oxide is everywhere active is *not*. Reading a layout as if it were a picture of the physical structure leads to wrong conclusions about which regions are connected.
:::

## Latch-up

The twin-well structure contains a parasitic device that can destroy the chip. In an inverter, the $\mathrm{p^+}$ source of the pMOS, the n-well and the p-substrate form a vertical pnp transistor; the $\mathrm{n^+}$ source of the nMOS, the p-substrate and the n-well form a lateral npn. The collector of each is the base of the other: together they form a **pnpn thyristor** between $V_{DD}$ and ground. Normally both are off, because the well is tied to $V_{DD}$ and the substrate to ground through **taps**. But if a transient — an input overshoot, a radiation strike, a supply surge — injects current into the well or substrate, the resistance $R_{well}$ or $R_{sub}$ between the injection point and the nearest tap can develop enough voltage to forward-bias one of the base–emitter junctions.

::: proposition Latch-up condition {#prop-latchup}
Neglecting the shunting effect of the well and substrate resistances, the parasitic thyristor sustains itself once triggered if the current gains of the two parasitic transistors satisfy

$$
\beta_{npn}\,\beta_{pnp} > 1.
$$ {#eq-latchup}

The shunt resistances divert part of each collector current from the base it feeds, so the actual condition is stricter; low $R_{well}$ and $R_{sub}$ (taps close to every transistor) raise the trigger current and the current needed to hold the latched state.
:::

::: proof
Suppose the npn carries collector current $I_1$. It flows out of the n-well, which is the base of the pnp, and so drives the pnp base with $I_1$, giving a pnp collector current $\beta_{pnp}I_1$. That current flows into the p-substrate, the npn's base, and produces an npn collector current $\beta_{npn}\beta_{pnp}I_1$. Going once round the loop multiplies the current by $\beta_{npn}\beta_{pnp}$. If this loop gain exceeds $1$, any small current grows until it is limited by external resistance: the structure latches into a low-impedance state that shorts $V_{DD}$ to ground, and stays there until the supply is removed. With shunts, each base receives only the part of the collector current not drawn off by the resistor, which reduces the effective gains.
:::

Latch-up is prevented by layout rules and process design: a maximum distance from any transistor to a well or substrate tap, **guard rings** of tap diffusion around I/O transistors (which are most exposed to injected currents), retrograde wells and epitaxial wafers on heavily doped substrates (which lower $R_{sub}$ and the parasitic gains), and, completely, by silicon-on-insulator wafers, where each transistor sits on buried oxide and the thyristor does not exist.

## Layout and design rules

The designer's description of a chip is its **layout**: a set of polygons on each mask layer. Turning a schematic into layout by hand is now done only for standard cells, memory cells and critical analogue blocks; the rest is placed and routed by software from a library of cells. But the cells themselves, and the rules that every layout must satisfy, determine the density and the parasitics of the whole chip.

::: definition Design rules {#def-design-rules}
**Design rules** are the geometric constraints a layout must satisfy so that it can be manufactured with acceptable yield: minimum **widths** of shapes on each layer, minimum **spacings** between shapes on the same layer, minimum **enclosures** (overlaps) of one layer by another, and minimum **extensions** of one layer beyond another. **Lambda rules** express them all as integer multiples of a single scale $\lambda$, about half the minimum drawn gate length, so that a design can be moved to a new process by changing $\lambda$ alone.
:::

Lambda rules were introduced by Mead and Conway around 1980 and were adequate down to about the $0.25\,\mathrm{\mu m}$ generation. Modern processes use absolute rules in nanometres, numbering in the thousands, with **restricted design rules**: gates only in one direction on a fixed pitch, only certain widths allowed, and wires on multiple-patterned layers assigned to "colours" (masks) that must alternate. For learning, a simplified lambda rule set is ideal; the following is based on the scalable CMOS rules once used by the MOSIS university service.

| rule | value |
|---|---|
| active width / spacing | $3\lambda$ / $3\lambda$ |
| poly width (drawn gate length) / poly spacing | $2\lambda$ / $3\lambda$ |
| poly extension beyond active (gate end cap) | $2\lambda$ |
| active extension beyond poly (source/drain) | $3\lambda$ |
| contact size | $2\lambda\times2\lambda$ |
| enclosure of contact by active, poly or metal 1 | $1\lambda$ |
| contact to gate spacing | $2\lambda$ |
| metal 1 width / spacing | $3\lambda$ / $3\lambda$ |
| n-well enclosure of $\mathrm{p^+}$ active | $6\lambda$ |
| n-well spacing to $\mathrm{n^+}$ active | $6\lambda$ |

Why do these rules exist? Widths are set by resolution: a line narrower than the minimum may print broken. Spacings are set by resolution too, and by electrical isolation: two wires drawn too close may print as one. Enclosures allow for **misalignment** between masks: a contact must land wholly on the active region beneath it even if the contact mask is shifted by the overlay error. The gate end cap ensures that the poly still crosses the whole active region if it prints short (line-end shortening) or is misaligned, since otherwise a sliver of diffusion would connect source and drain.

### Stick diagrams and Euler paths

A **stick diagram** is a cartoon of a layout: each layer is a coloured line (by convention green for diffusion, red for poly, blue for metal), with crossings of poly over diffusion marking transistors and crosses marking contacts, but no dimensions. It is the quickest way to plan the topology of a cell before drawing polygons.

In a well-planned static CMOS cell, the nMOS transistors sit in a horizontal strip of n-type diffusion near the ground rail at the bottom, the pMOS transistors in a strip of p-type diffusion in an n-well near the $V_{DD}$ rail at the top, and the gate inputs run vertically in poly, each crossing both strips: input $A$ gates both its nMOS and its pMOS transistor with one straight poly line. Adjacent transistors that share a source or drain node can share the diffusion between them, which saves a contact and a spacing and reduces the parasitic capacitance of that node. The question is whether the transistors can be ordered so that *every* pair of neighbours in each strip shares a node, with the *same* order of inputs in both strips.

::: definition Euler path {#def-euler}
Represent a transistor network as a graph whose vertices are circuit nodes and whose edges are transistors, each labelled by its gate input. An **Euler path** is a path through the graph that traverses every edge exactly once. A network whose graph has an Euler path can be laid out as one unbroken strip of diffusion, with the transistors in the order of the path. If the pull-down and pull-up graphs of a gate have Euler paths with the **same sequence of input labels**, the whole gate can be laid out with straight vertical poly gates and two unbroken diffusion strips.
:::

By Euler's theorem from graph theory (see [Graph algorithms](/learn/maths/lesson.php?c=discrete&l=graph-algorithms) in Maths Atlas), a connected graph has an Euler path if and only if it has zero or two vertices of odd degree. A series–parallel network built by the method of [[digital-ic/static-cmos-logic]] always has one between its two terminal nodes; the work is in finding a sequence common to both networks.

::: example Euler path for an AOI22 gate {#ex-euler}
The gate $Y = \overline{AB + CD}$ has a pull-down network of $A$ and $B$ in series, in parallel with $C$ and $D$ in series, and a pull-up network of $A \parallel B$ in series with $C \parallel D$. Find an input order that gives unbroken diffusion strips in both networks.
::: solution
*Pull-down graph.* Nodes: $Y$, an internal node $x$ between $A$ and $B$, an internal node $z$ between $C$ and $D$, and ground. Edges: $A$ ($Y$–$x$), $B$ ($x$–GND), $C$ ($Y$–$z$), $D$ ($z$–GND). Every node has degree $2$, so there is an Euler circuit, e.g. $x \xrightarrow{A} Y \xrightarrow{C} z \xrightarrow{D} \mathrm{GND} \xrightarrow{B} x$: the sequence $A, C, D, B$.

*Pull-up graph.* Nodes: $V_{DD}$, internal node $m$, and $Y$. Edges: $A$ and $B$ both $V_{DD}$–$m$, $C$ and $D$ both $m$–$Y$. Try the same sequence: $V_{DD} \xrightarrow{A} m \xrightarrow{C} Y \xrightarrow{D} m \xrightarrow{B} V_{DD}$. Every step follows an edge from the current node, and every edge is used once, so $A, C, D, B$ is an Euler path of both graphs.

In the layout, the four poly gates run vertically in the order $A, C, D, B$. The nMOS strip reads $x$ | $A$ | $Y$ | $C$ | $z$ | $D$ | GND | $B$ | $x$. Its two ends are the same internal node $x$, so the two end pieces of diffusion must be joined by a short metal strap; every other neighbouring pair of transistors shares its node directly. The pMOS strip, following the path from $V_{DD}$, reads $V_{DD}$ | $A$ | $m$ | $C$ | $Y$ | $D$ | $m$ | $B$ | $V_{DD}$. Node $m$ appears twice and needs a metal strap; $Y$ is contacted once in each strip and the two contacts are joined in metal. The order $A, B, D, C$ (by the symmetry of the gate) works equally well.
:::
:::

### Estimating layout dimensions

Lambda rules let us estimate cell sizes quickly. Along a diffusion strip, a contacted source or drain region needs the contact ($2\lambda$), its active enclosure ($1\lambda$) and the contact-to-gate spacing ($2\lambda$): $5\lambda$. Each gate is $2\lambda$. Between two gates that share an uncontacted node the poly spacing of $3\lambda$ suffices; between two gates that share a contacted node, $2\lambda + 2\lambda + 2\lambda = 6\lambda$.

::: example Diffusion lengths in a NAND2 layout {#ex-nand-layout}
Using the rule table, find the length of the diffusion strip for the two series nMOS transistors of a two-input NAND gate (a) laid out with shared diffusion and (b) as two separate transistors connected by metal; and (c) for the two parallel pMOS transistors with shared diffusion. For a process with $\lambda = 25\,\mathrm{nm}$, give (a) in nanometres.
::: solution
(a) Contacted end (output) $5\lambda$, gate $2\lambda$, uncontacted internal node $3\lambda$, gate $2\lambda$, contacted end (ground) $5\lambda$: total $17\lambda$.

(b) Each separate transistor is $5 + 2 + 5 = 12\lambda$ long, and the two must be separated by the active spacing $3\lambda$: $12 + 3 + 12 = 27\lambda$, $60\,\%$ longer, with two extra contacts and a metal strap, and with the internal node now carrying the capacitance of two contacted diffusions instead of one small uncontacted one.

(c) The pMOS transistors are in parallel between $V_{DD}$ and the output, so the strip reads $V_{DD}$ | $A$ | $Y$ | $B$ | $V_{DD}$: $5 + 2 + 6 + 2 + 5 = 20\lambda$, with the shared output contact in the middle.

With $\lambda = 25\,\mathrm{nm}$, (a) is $17\times25 = 425\,\mathrm{nm}$.
:::
:::

In standard-cell libraries every cell has the same height, measured in **tracks** of metal 1 pitch, so that cells abut in rows and share the power rails at top and bottom; widths vary in multiples of the gate pitch. As of 2026, leading libraries use cells about five to six tracks high, with contacted gate pitches near $45$–$50\,\mathrm{nm}$.

::: quiz
In a layout, where does an nMOS transistor exist?
- [ ] wherever the n-select mask is drawn
- [x] wherever poly crosses active inside the n-select region
- [ ] wherever metal 1 crosses poly
- [ ] wherever a contact is drawn on active
::: solution
A transistor's channel is the region of active covered by poly; the select mask determines whether the source and drain on either side become $\mathrm{n^+}$ (nMOS) or $\mathrm{p^+}$ (pMOS). Metal crossing poly is just two insulated wires, and a contact on active connects a source or drain to metal.
:::
:::

## Yield and cost

Every wafer contains defects: particles that land on it during processing, scratches, crystal faults, pattern failures. A single defect in the wrong place kills a die. The fraction of dies that work, the **yield**, depends on how large the dies are, and with it the cost of each good die.

::: theorem Poisson and negative-binomial yield {#thm-yield}
If killer defects are scattered independently and uniformly at random with density $D_0$ per unit area, a die of area $A$ is good with probability

$$
Y = e^{-AD_0}.
$$ {#eq-poisson-yield}

If instead the defect density varies from wafer to wafer and region to region, with $D$ following a gamma distribution of mean $D_0$ and shape parameter $\alpha$ (the **clustering parameter**), the average yield is

$$
Y = \left(1 + \frac{AD_0}{\alpha}\right)^{-\alpha}.
$$ {#eq-nb-yield}
:::

::: proof
For uniform independent defects, the number $K$ falling in a die of area $A$ is Poisson-distributed with mean $\mu = AD_0$, because it counts rare independent events over an area (the limit of a binomial with many small cells). A die is good if $K = 0$, which has probability $e^{-\mu}$.

If $D$ is random with density $f(D) = \dfrac{D^{\alpha-1}e^{-D/\theta}}{\Gamma(\alpha)\theta^{\alpha}}$ and mean $\alpha\theta = D_0$, the yield is the average of $e^{-AD}$:

$$
Y = \int_0^\infty e^{-AD}f(D)\,\mathrm dD = \frac{1}{\Gamma(\alpha)\theta^\alpha}\int_0^\infty D^{\alpha-1}e^{-D(A + 1/\theta)}\,\mathrm dD = \frac{(A + 1/\theta)^{-\alpha}}{\theta^\alpha} = (1 + A\theta)^{-\alpha},
$$

using $\int_0^\infty D^{\alpha-1}e^{-sD}\mathrm dD = \Gamma(\alpha)s^{-\alpha}$. With $\theta = D_0/\alpha$ this is [[#eq-nb-yield]]. As $\alpha\to\infty$ the gamma distribution concentrates at $D_0$ and the formula tends to $e^{-AD_0}$.
:::

Clustering makes large dies *less* sensitive to defects than the Poisson model predicts: if defects bunch together, several land on one die that was already dead, sparing others. Typical values of $\alpha$ are between $0.5$ and $5$. For a mature process the killer defect density is around $0.05$–$0.1\,\mathrm{cm^{-2}}$; a new process starts several times higher and "learns" its way down over a year or two.

The number of dies on a wafer is not simply the wafer area divided by the die area, because square dies do not tile a circle: partial dies around the edge are lost. A widely used estimate for a wafer of diameter $d$ is

$$
N_{\text{die}} \approx \frac{\pi(d/2)^2}{A} - \frac{\pi d}{\sqrt{2A}},
$$ {#eq-dpw}

where the second term counts roughly the dies whose diagonals ($\sqrt{2A}$) straddle the circumference $\pi d$.

::: example Cost of a good die {#ex-cost}
A processed $300\,\mathrm{mm}$ wafer costs $\$20\,000$ and the killer defect density is $D_0 = 0.1\,\mathrm{cm^{-2}}$ (Poisson). Find the cost of a good die of area (a) $100\,\mathrm{mm^2}$ and (b) $200\,\mathrm{mm^2}$, ignoring test and packaging.
::: solution
(a) $A = 100\,\mathrm{mm^2} = 1\,\mathrm{cm^2}$. By [[#eq-dpw]],

$$
N_{\text{die}} = \frac{\pi(150)^2}{100} - \frac{\pi(300)}{\sqrt{200}} = 706.9 - 66.6 = 640.
$$

The yield is $e^{-0.1} = 0.905$, so there are $579$ good dies and each costs $20\,000/579 = \$34.5$.

(b) $A = 2\,\mathrm{cm^2}$: $N_{\text{die}} = 353.4 - 47.1 = 306$, $Y = e^{-0.2} = 0.819$, $251$ good dies, $\$79.7$ each.

Doubling the area multiplied the cost by $2.3$: the wafer holds slightly fewer than half as many dies (more edge loss), and each is less likely to work. For large dies the penalty becomes severe, which is the economic case for **chiplets**: splitting a large design into several smaller dies that are tested separately and then assembled in one package (see [[#exr-chiplet]]).
:::
:::

::: widget plot
f: 100*exp(-x*D); 100*(1 + x*D/a)^(-a)
x: 0, 8
y: 0, 100
sliders: D=0.1:0.02:1:0.01; a=2:0.5:10:0.1
labels: \text{Poisson}; \text{negative binomial}
caption: Yield in per cent against die area in $\mathrm{cm^2}$ for defect density $D_0 = D$ (per $\mathrm{cm^2}$) and clustering parameter $\alpha = a$. Small dies yield well under either model. For large dies the clustered model is more optimistic: at $D = 0.1$, a $6\,\mathrm{cm^2}$ die (near the largest a scanner can expose in one field, $26\times33\,\mathrm{mm}$) yields $55\,\%$ in the Poisson model and $59\,\%$ with $\alpha = 2$. Raise $a$ towards $10$ and the two curves merge. Raise $D$ to $0.5$, a young process: large dies become almost unmanufacturable.
:::

::: application Redundancy and binning
Real products recover yield in two ways. Memories include spare rows and columns that replace defective ones, programmed by blowing fuses after test ([[digital-ic/memory-arrays]]); since memory occupies a large share of a processor's area, this makes many dies with a defect in a cache usable. Processors are also **binned**: a die with one defective core is sold as a model with fewer cores, and dies that do not reach the top clock frequency, because of process variation rather than defects, are sold as slower grades. The yield a manufacturer quotes is therefore not one number but a distribution over product grades.
:::

::: history
Jean Hoerni's planar process (1959) at Fairchild, which used the oxide both as a diffusion mask and as protection for junctions, made the integrated circuit manufacturable, and Robert Noyce used it to build monolithic circuits with deposited aluminium interconnect. Jules Andrus and Walter Bond at Bell Laboratories had adapted photoresists from printing to pattern oxide on silicon in the mid-1950s. Bruce Deal and Andrew Grove published their model of thermal oxidation in 1965, and ion implantation, patented by William Shockley in 1954, replaced diffusion from gases for doping in the 1970s. Carver Mead and Lynn Conway's *Introduction to VLSI Systems* (1980) introduced lambda rules and taught a generation of students to lay out chips, which were fabricated through the MOSIS service from 1981. IBM introduced chemical–mechanical polishing in the 1980s and copper damascene wiring in 1997–1998. Extreme-ultraviolet lithography, pursued from the 1980s and developed into production scanners by ASML, entered volume manufacturing in 2019.
:::

## Where this leads

The process sets the parameters of everything that follows. The transistor's on-current and its gate and diffusion capacitances determine the inverter delay in [[digital-ic/cmos-inverter]]; the layout of series and parallel stacks, with shared diffusion found by Euler paths, appears again when we size complex gates in [[digital-ic/static-cmos-logic]]. The copper and low-k dielectric of the damascene process set the resistance and capacitance per unit length of wires in [[digital-ic/interconnect]], and the threshold-adjust implants, which trade speed for leakage, return in [[digital-ic/power-dissipation]]. Yield and redundancy are central to the design of large memory arrays in [[digital-ic/memory-arrays]].

::: summary
- Integrated circuits are made by the planar process: photolithography patterns a resist, and etching, implantation or deposition transfers the pattern; a modern chip needs many tens of masks.
- Lithographic resolution is $\mathrm{CD} = k_1\lambda/\mathrm{NA}$ and depth of focus $k_2\lambda/\mathrm{NA}^2$; immersion, EUV, resolution enhancement and multiple patterning have kept features shrinking.
- Thermal oxide grows by the Deal–Grove law $x^2 + Ax = B(t + \tau)$, linear for thin and parabolic for thick oxides; implanted dopants follow a roughly Gaussian profile set by range and straggle.
- A twin-well CMOS flow builds isolation, wells, gate stack, self-aligned source and drain, silicide, contacts and copper damascene interconnect; FinFET and nanosheet processes keep this structure with a replacement metal gate.
- The parasitic pnpn thyristor causes latch-up if $\beta_{npn}\beta_{pnp} > 1$ and a trigger forward-biases a junction; well and substrate taps and guard rings prevent it.
- Layouts must satisfy width, spacing, enclosure and extension rules; lambda rules express them in one scalable unit. Euler paths common to the pull-up and pull-down graphs give compact cells with unbroken diffusion.
- Yield falls exponentially with die area, $Y = e^{-AD_0}$ (or $(1 + AD_0/\alpha)^{-\alpha}$ with clustering), so the cost per good die grows faster than the area.
:::

## Exercises

::: exercise Resolution of a KrF scanner {level=1 check="124e-9"}
A KrF scanner ($\lambda = 248\,\mathrm{nm}$) has $\mathrm{NA} = 0.8$ and is used with $k_1 = 0.4$. Find the minimum half-pitch in metres.
::: solution
$\mathrm{CD} = 0.4\times248/0.8 = 124\,\mathrm{nm} = 1.24\times10^{-7}\,\mathrm m$, by [[#eq-rayleigh]]. This was the regime of the $130\,\mathrm{nm}$ generation around 2001.
:::
:::

::: exercise Wet oxidation time {level=1 check="(0.25 + 0.226*0.5)/0.287*3600"}
At $1000\,^\circ\mathrm C$ wet oxidation has $A = 0.226\,\mathrm{\mu m}$, $B = 0.287\,\mathrm{\mu m^2/h}$ and $\tau = 0$. How long, in seconds, does it take to grow $0.5\,\mathrm{\mu m}$ of oxide on bare silicon?
::: solution
$t = (x^2 + Ax)/B = (0.25 + 0.113)/0.287 = 1.265\,\mathrm h = 4550\,\mathrm s$, by [[#eq-deal-grove]].
:::
:::

::: exercise Poisson yield {level=1 check="exp(-0.16)"}
A die of area $80\,\mathrm{mm^2}$ is made in a process with $D_0 = 0.2\,\mathrm{cm^{-2}}$. Find the Poisson yield (as a fraction).
::: solution
$AD_0 = 0.8\times0.2 = 0.16$, so $Y = e^{-0.16} = 0.852$.
:::
:::

::: exercise Clustering helps large dies {level=2 check="(1 + 0.5/3)^(-3)"}
For a $2\,\mathrm{cm^2}$ die with $D_0 = 0.25\,\mathrm{cm^{-2}}$, compute the yield from the negative-binomial model with $\alpha = 3$ (as a fraction), and compare with the Poisson yield.
::: solution
$AD_0 = 0.5$, so $Y = (1 + 0.5/3)^{-3} = (1.1667)^{-3} = 0.630$. The Poisson value is $e^{-0.5} = 0.607$. Clustering raises the yield by about two percentage points here; the difference grows with $AD_0$.
:::
:::

::: exercise A shallow arsenic implant {level=2}
Arsenic is implanted into p-type silicon with $N_B = 10^{17}\,\mathrm{cm^{-3}}$ at a dose of $10^{15}\,\mathrm{cm^{-2}}$, with $R_p = 30\,\mathrm{nm}$ and $\Delta R_p = 11\,\mathrm{nm}$. Find the peak concentration and the junction depth, ignoring diffusion. Is the peak below the solid solubility of arsenic in silicon, about $2\times10^{21}\,\mathrm{cm^{-3}}$?
::: solution
$N_p = 10^{15}/(\sqrt{2\pi}\times1.1\times10^{-6}) = 3.63\times10^{20}\,\mathrm{cm^{-3}}$, comfortably below the solubility. $\ln(N_p/N_B) = \ln(3630) = 8.20$, so by [[#eq-xj]] $x_j = 30 + 11\sqrt{16.4} = 30 + 44.5 = 74.5\,\mathrm{nm}$. Real profiles after anneal are somewhat deeper, because arsenic diffuses during activation; this is why source/drain anneals are kept to fractions of a second.
:::
:::

::: exercise Euler path for an OAI-type gate {level=2}
Find a common Euler path for the pull-down and pull-up networks of $Y = \overline{A(B + C)}$, in which the pull-down network is $A$ in series with ($B \parallel C$) and the pull-up network is $A$ in parallel with ($B$ in series with $C$). Draw the order of the diffusion nodes in each strip.
::: hint
In the pull-down graph the output node has degree $1$, so an Euler path must start or end there.
:::
::: solution
Pull-down: nodes $Y$, $x$, GND with edges $A$ ($Y$–$x$), $B$ and $C$ (both $x$–GND). The odd-degree vertices are $Y$ (degree 1) and $x$ (degree 3), so a path runs from $Y$ to $x$: $Y \xrightarrow{A} x \xrightarrow{B} \mathrm{GND} \xrightarrow{C} x$, sequence $A, B, C$.

Pull-up: nodes $V_{DD}$, $m$, $Y$ with edges $A$ ($V_{DD}$–$Y$), $B$ ($V_{DD}$–$m$), $C$ ($m$–$Y$). The path $Y \xrightarrow{A} V_{DD} \xrightarrow{B} m \xrightarrow{C} Y$ has the same sequence $A, B, C$.

The strips read: nMOS $Y$ | $A$ | $x$ | $B$ | GND | $C$ | $x$ (the two $x$ regions are joined in metal); pMOS $Y$ | $A$ | $V_{DD}$ | $B$ | $m$ | $C$ | $Y$ (the two $Y$ regions are joined in metal, and $m$ needs no contact).
:::
:::

::: exercise Cost of doubling the die {level=2 check="20000/((pi*150^2/200 - pi*300/sqrt(400))*exp(-0.4))"}
Repeat part (b) of [[#ex-cost]] for a young process with $D_0 = 0.2\,\mathrm{cm^{-2}}$. What is the cost of a good $200\,\mathrm{mm^2}$ die in dollars?
::: solution
$N_{\text{die}} = 306$ as before; $Y = e^{-0.4} = 0.670$; good dies $= 205$; cost $= 20\,000/205 = \$97.5$. Early in a process's life, large dies are much more expensive than the steady-state figure suggests.
:::
:::

::: exercise A large die or two chiplets? {#exr-chiplet level=3}
A design occupies $600\,\mathrm{mm^2}$ as a single die. Alternatively it can be split into two chiplets of $330\,\mathrm{mm^2}$ each (the extra $30\,\mathrm{mm^2}$ per chiplet is for the die-to-die interface). Wafers cost $\$20\,000$, $D_0 = 0.1\,\mathrm{cm^{-2}}$ (Poisson), and chiplets are tested before assembly so only good ones are packaged. (a) Compare the silicon cost per working product. (b) Assembling two chiplets costs $\$40$ more than packaging one die, and $2\,\%$ of assemblies fail. Which option is cheaper?
::: hint
Use [[#eq-dpw]] and [[#eq-poisson-yield]] for each die size; a product needs one good large die or two good chiplets.
:::
::: solution
(a) Large die: $A = 6\,\mathrm{cm^2}$, $N_{\text{die}} = 117.8 - 27.2 = 90.6$, $Y = e^{-0.6} = 0.549$, $49.7$ good dies per wafer, $\$402$ each. Chiplet: $A = 3.3\,\mathrm{cm^2}$, $N_{\text{die}} = 214.2 - 36.7 = 177.5$, $Y = e^{-0.33} = 0.719$, $127.6$ good dies, $\$156.7$ each, so $\$313$ of silicon per product — $22\,\%$ less than the single die, despite using $10\,\%$ more area.

(b) The chiplet product costs $313 + 40 = \$353$ before assembly loss; dividing by $0.98$ for the failed assemblies gives $\$360$ per working product, still less than $\$402$. The advantage grows with die size and defect density, and shrinks for small dies; it is the reason large processors and AI accelerators have moved to chiplets since about 2019.
:::
:::

::: exercise Linear and parabolic constants {level=3}
(a) Show from [[#thm-deal-grove]] that the growth rate is $\mathrm dx/\mathrm dt = B/(2x + A)$, and find the thickness at which the rate has fallen to half its initial (thin-oxide) value $B/A$. (b) The parabolic constant $B$ is proportional to the oxidant solubility $C^*$, which is proportional to the oxidant pressure (Henry's law). If a high-pressure oxidation at $10$ atmospheres is used instead of $1$ atmosphere, by what factor do $A$, $B$ and the time to grow a thick oxide change?
::: solution
(a) Differentiating $x^2 + Ax = B(t + \tau)$ gives $(2x + A)\,\mathrm dx/\mathrm dt = B$. The rate is half of $B/A$ when $2x + A = 2A$, i.e. $x = A/2$: $83\,\mathrm{nm}$ for dry oxidation at $1000\,^\circ\mathrm C$.

(b) $A = 2D/k_s$ does not depend on $C^*$, so it is unchanged; $B = 2DC^*/N_1$ rises ten times. In the parabolic regime $t \approx x^2/B$ falls ten times; in the linear regime $t \approx Ax/B$ also falls ten times. High-pressure oxidation therefore gives the same oxide at a lower temperature or in a shorter time, reducing the thermal budget and dopant diffusion.
:::
:::

::: exercise Loop gain with shunts {level=3}
In the latch-up structure, the npn's base is shunted to ground by $R_{sub}$ and the pnp's base is shunted to $V_{DD}$ by $R_{well}$, and each base–emitter junction conducts once its voltage reaches about $0.7\,\mathrm V$. (a) Explain why a current $I$ injected into the substrate cannot trigger latch-up if $IR_{sub} < 0.7\,\mathrm V$. (b) In a certain process the substrate resistance from an nMOS source to its nearest tap is about $20\,\Omega$ per micrometre of distance. What is the largest tap distance for which an injected current of $1\,\mathrm{mA}$ cannot trigger latch-up?
::: solution
(a) The injected current flows to the substrate tap through $R_{sub}$, raising the local substrate (the npn base) by $IR_{sub}$ above the grounded $\mathrm{n^+}$ source (the npn emitter). Below about $0.7\,\mathrm V$ the npn conducts negligibly, so no collector current flows into the well and the regenerative loop of [[#prop-latchup]] never starts. Only once the npn turns on does the loop gain matter.

(b) We need $IR_{sub} < 0.7\,\mathrm V$, i.e. $R_{sub} < 0.7/10^{-3} = 700\,\Omega$, so the distance must be less than $700/20 = 35\,\mathrm{\mu m}$. Design rules of this kind specify a maximum distance from any diffusion to a tap; standard-cell libraries satisfy it by placing tap cells at regular intervals along every row.
:::
:::
