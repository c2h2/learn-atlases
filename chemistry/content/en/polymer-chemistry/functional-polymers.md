Until the 1970s a polymer was, almost by definition, an electrical insulator. Polyethylene was wrapped round cables precisely because it conducts nothing. Then, in 1977, Hideki Shirakawa, Alan MacDiarmid and Alan Heeger exposed films of polyacetylene to iodine vapour and watched their conductivity rise by more than seven orders of magnitude, into the range of metals. That result changed what polymers were expected to do. Today we ask polymers to emit light in phone displays, to carry ions in batteries, to swell or collapse when the temperature crosses body temperature, to carry a drug through the bloodstream and release it over weeks, to hold a wound closed and then disappear, to remember a shape, to heal a scratch, and, more and more urgently, to break down or be recycled when we have finished with them. These are **functional polymers**: materials chosen not for strength or cheapness but for a property that does something.

This chapter surveys four families, using the physical chemistry of the earlier chapters to explain how each works. **Conducting and semiconducting polymers** owe their behaviour to conjugation, band gaps and doping. **Stimuli-responsive polymers and gels** use the Flory–Huggins thermodynamics of [[polymer-chemistry/polymer-solutions]] run in reverse, with a lower critical solution temperature as a switch, plus shape memory and dynamic networks. **Biomedical polymers** cover PEG, degradable sutures and controlled drug release by diffusion. **Polymers designed to degrade or be recycled** close the chapter: hydrolysis kinetics, composting standards, and chemical, enzymatic and mechanical recycling, with the scale of the plastics problem stated as of 2026.

## Conducting and semiconducting polymers

A saturated polymer such as polyethylene has a large energy gap (about $8\ \mathrm{eV}$) between its filled σ-bonding orbitals and its empty σ* orbitals. No electrons can be excited across that gap at room temperature, so it is an insulator. A **conjugated** polymer, with alternating single and double bonds along its backbone, has π orbitals delocalised along the chain. As the conjugation length grows, the π levels crowd together into bands. The gap between the filled π band (valence band, built from HOMOs) and the empty π* band (conduction band, built from LUMOs) narrows from about $5\ \mathrm{eV}$ for ethene into the visible and near-infrared. Conjugated polymers are therefore coloured semiconductors.

::: proposition Free-electron estimate of the HOMO–LUMO gap of a polyene {#prop-free-electron}
Model the $N$ π electrons of a linear conjugated chain of $N$ carbon atoms as particles in a one-dimensional box of length $L \approx Nl$, with $l = 0.139\ \mathrm{nm}$ the average C–C distance. Two electrons occupy each level, so the highest occupied level is $n = N/2$, and the lowest excitation energy is
$$
\Delta E = E_{N/2+1} - E_{N/2} = \frac{h^2(N+1)}{8m_\mathrm{e}L^2} \approx \frac{h^2}{8m_\mathrm{e}l^2}\cdot\frac{N+1}{N^2} \;\longrightarrow\; 0 \quad (N \to \infty).
$$ {#eq-free-electron}
The model predicts that an infinite polyene is a metal. Real polyacetylene has a gap of about $1.5\ \mathrm{eV}$, because the bonds alternate in length (the Peierls distortion), and the model fails quantitatively for long chains.
:::

::: proof
The energy levels of a particle of mass $m_\mathrm{e}$ in a box of length $L$ are $E_n = n^2h^2/(8m_\mathrm{e}L^2)$ (see [[quantum-chemistry]]). With $N$ electrons, two per level, levels $1$ to $N/2$ are filled. The HOMO–LUMO gap is
$$
E_{N/2+1} - E_{N/2} = \frac{h^2}{8m_\mathrm{e}L^2}\left[\left(\frac{N}{2}+1\right)^2 - \left(\frac{N}{2}\right)^2\right] = \frac{h^2}{8m_\mathrm{e}L^2}(N + 1) .
$$
With $L = Nl$, this is $\frac{h^2}{8m_\mathrm{e}l^2}\cdot\frac{N+1}{N^2}$, which falls as $1/N$ for large $N$ and vanishes in the infinite chain. The bands then meet and the half-filled band would conduct. The failure is physical. A one-dimensional half-filled band is unstable against a distortion that doubles the unit cell (Peierls' theorem). Alternating short and long bonds open a gap at the Fermi level and lower the energy of the filled states more than they raise anything else. The equal-bond-length "metal" never forms. $\blacksquare$
:::

::: example Colour of a conjugated chain {#ex-polyene}
Using [[#eq-free-electron]], estimate the wavelength of the lowest absorption of hexa-1,3,5-triene ($N = 6$) and of a polyene with $N = 22$ (the chromophore length of β-carotene). Compare with experiment: about $258\ \mathrm{nm}$ for hexatriene and about $450\ \mathrm{nm}$ for β-carotene.
::: solution
For $N = 6$, $L = 6(0.139\ \mathrm{nm}) = 0.834\ \mathrm{nm}$:
$$
\Delta E = \frac{(6.626\times10^{-34}\ \mathrm{J\,s})^2(7)}{8(9.109\times10^{-31}\ \mathrm{kg})(0.834\times10^{-9}\ \mathrm{m})^2} = 6.06\times10^{-19}\ \mathrm{J} = 3.78\ \mathrm{eV},
$$
so $\lambda = hc/\Delta E = 328\ \mathrm{nm}$. For $N = 22$, $L = 3.06\ \mathrm{nm}$, $\Delta E = 0.92\ \mathrm{eV}$ and $\lambda = 1340\ \mathrm{nm}$.

The model gets the trend right (longer conjugation means a redder absorption) and is fair for the short chain, within about 30%. It fails badly for the long chain: it predicts infrared absorption, whereas β-carotene is orange because it absorbs blue light near $450\ \mathrm{nm}$. The real gap saturates at about $2.5\ \mathrm{eV}$ for carotenoids and about $1.5\ \mathrm{eV}$ for polyacetylene, because of bond alternation and electron–electron repulsion. Conjugated polymers behave as semiconductors, not as one-dimensional metals.
:::
:::

**Doping** turns these semiconductors into conductors. Oxidation (p-doping, with iodine, $\mathrm{FeCl_3}$ or electrochemically) removes electrons from the π system, and reduction (n-doping, with alkali metals) adds them. Counter-ions enter the film to balance the charge. The charges do not sit in rigid bands. A positive charge on the chain distorts the bond alternation around it over a few repeat units, forming a **polaron**, a radical cation dressed in a local lattice distortion. At higher doping, polarons pair into spinless **bipolarons**. Charge moves along chains by polaron migration and between chains by hopping, so conductivity depends strongly on chain order, film morphology and doping level. Conductivity is $\sigma = ne\mu$, with $n$ the carrier density and $\mu$ the mobility. Mobilities in disordered polymer films are small ($10^{-4}$ to $1\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$, against about $1400$ for crystalline silicon), so high conductivity requires a high carrier density, a few percent of the repeat units.

::: example How heavily is a conducting polymer doped? {#ex-doping}
An iodine-doped polyacetylene film has conductivity $\sigma = 5.0\times10^{2}\ \mathrm{S\,cm^{-1}}$. Assuming a carrier mobility of $1.0\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$ and a density of $1.16\ \mathrm{g\,cm^{-3}}$ for $\mathrm{(CH)}_x$ ($13.02\ \mathrm{g\,mol^{-1}}$ per CH), estimate the carrier density and the fraction of CH units that carry a charge.
::: solution
$$
n = \frac{\sigma}{e\mu} = \frac{5.0\times10^{2}\ \mathrm{S\,cm^{-1}}}{(1.602\times10^{-19}\ \mathrm{C})(1.0\ \mathrm{cm^2\,V^{-1}\,s^{-1}})} = 3.1\times10^{21}\ \mathrm{cm^{-3}} .
$$
The density of CH units is $(1.16/13.02)\times6.022\times10^{23} = 5.37\times10^{22}\ \mathrm{cm^{-3}}$, so the charged fraction is $3.1\times10^{21}/5.37\times10^{22} = 0.058$, about one charge per 17 CH units. This matches the doping levels of several percent found by elemental analysis (as triiodide, $\mathrm{I_3^-}$). A metal such as copper has a carrier density of about $8\times10^{22}\ \mathrm{cm^{-3}}$ and a mobility of tens of $\mathrm{cm^2\,V^{-1}\,s^{-1}}$. Doped polymers come close in carrier density but fall short in mobility, the price of disorder.
:::
:::

Polyacetylene itself is unstable in air. The conducting polymers in use are aromatic or heteroaromatic. **Poly(3,4-ethylenedioxythiophene)** doped with poly(styrene sulfonate) (PEDOT:PSS) is a water-processable conductor used as a transparent electrode, an antistatic coating and the hole-transport layer of organic devices. **Polyaniline** and **polypyrrole** are used in sensors and corrosion protection. Undoped, conjugated polymers are the active layers of **organic light-emitting diodes** (electrons and holes injected from opposite electrodes recombine on the chain to give an exciton that emits light, first reported for poly(*p*-phenylenevinylene) in 1990), of **organic photovoltaics** and of **organic field-effect transistors**. In all of these, the band gap is set by molecular design, for example by alternating electron-rich and electron-poor units along a "donor–acceptor" backbone to narrow the gap and absorb more of the solar spectrum. Ion-conducting polymers are a separate class, conducting by segmental motion rather than by electrons. Examples are poly(ethylene oxide)–lithium salt electrolytes and the perfluorosulfonic acid membranes (Nafion) of fuel cells. Their conductivity follows the WLF temperature dependence of [[polymer-chemistry/polymer-properties#prop-wlf]], because the ions move only as fast as the chains around them.

## Stimuli-responsive polymers

### Polymers that precipitate on heating

Most polymer–solvent pairs become *more* miscible on heating. Their $\chi$ falls with temperature, and they show an upper critical solution temperature ([[polymer-chemistry/polymer-solutions#prop-critical]]). Many water-soluble polymers do the opposite. Poly(*N*-isopropylacrylamide) (PNIPAM) dissolves in cold water but precipitates sharply when warmed above about $32\ ^\circ\mathrm{C}$, its **lower critical solution temperature** (LCST). Poly(ethylene oxide), methylcellulose, poly(vinyl methyl ether) and many proteins do the same.

::: proposition Thermodynamic condition for an LCST {#prop-lcst}
A solution that is homogeneous at low temperature phase-separates on heating if its free energy of mixing has a **negative enthalpy** and a **negative entropy** of mixing, so that $\Delta_\text{mix}G = \Delta_\text{mix}H - T\Delta_\text{mix}S$ changes sign from negative to positive as $T$ rises. In Flory–Huggins form, with $\chi = A + B/T$, an LCST requires $B < 0$ (so that $\chi$ *increases* with temperature) and $A > \tfrac12$. For long chains, the theta temperature on the LCST side, where $\chi = \tfrac12$, is
$$
\Theta_\text{LCST} = \frac{-B}{A - \tfrac12} .
$$ {#eq-lcst}
:::

::: proof
Phase separation requires mixing to become unfavourable. With $\Delta_\text{mix}H < 0$ and $\Delta_\text{mix}S < 0$, $\Delta_\text{mix}G < 0$ only when $T < \Delta_\text{mix}H/\Delta_\text{mix}S$ (both negative, so the ratio is positive). Above that temperature the entropy penalty dominates, and the components demix. In Flory–Huggins theory, the interaction parameter $\chi$ is a free energy per contact divided by $k_\mathrm{B}T$, $\chi = (\Delta h - T\Delta s)/k_\mathrm{B}T = B/T + A$, with $B = \Delta h/k_\mathrm{B}$ and $A = -\Delta s/k_\mathrm{B}$. A negative contact enthalpy (favourable hydrogen bonds between water and amide) gives $B < 0$, and a negative contact entropy (water ordered around the isopropyl groups) gives $A > 0$. Then $\chi$ rises with $T$, and setting $\chi = \tfrac12$, the critical value for infinite chains, gives $A + B/T = \tfrac12$, so $T = -B/(A - \tfrac12)$, which is positive only if $A > \tfrac12$. $\blacksquare$
:::

The molecular picture is the **hydrophobic effect**. At low temperature, water forms ordered, hydrogen-bonded cages around the polymer's hydrophobic isopropyl groups and hydrogen-bonds to its amide groups. Mixing is enthalpically favoured, but entropically costly because the water is ordered. On heating, the $-T\Delta S$ term grows, and releasing the ordered water by collapsing the chains becomes favourable. A single PNIPAM chain undergoes a **coil-to-globule transition**, and a crosslinked PNIPAM gel expels most of its water and shrinks to a fraction of its volume within a degree or two. The transition can be tuned by copolymerisation. Hydrophilic comonomers raise the LCST, and hydrophobic ones lower it, so it can be placed between room temperature and body temperature. This is the basis of injectable gels that set in the body, of cell-culture surfaces that release cells on cooling, and of "smart" valves.

::: widget plot
f: a + b/x; 0.5
x: 270, 340
y: 0.3, 0.7
sliders: a=2.10:1:3:0.01; b=-488:-800:-200:1
labels: \chi(T) = A + B/T; \chi = \tfrac12
caption: The Flory–Huggins parameter of a polymer with an LCST, $\chi = A + B/T$ with $B < 0$, against temperature in kelvin, and the critical value $\chi = \tfrac12$ for long chains ([[#prop-lcst]]). The defaults, $A = 2.10$ and $B = -488\ \mathrm{K}$ (illustrative values chosen to mimic PNIPAM), cross $\chi = \tfrac12$ at $305\ \mathrm{K}$ ($32\ ^\circ\mathrm{C}$). Below that temperature water is a good solvent, and above it the polymer separates. Make $B$ less negative (weaker hydrogen bonding, as with a more hydrophobic comonomer) and the crossing moves to lower temperature. Make $A$ smaller (less ordering of water) and it moves higher. For a UCST system $B$ would be positive and the curve would fall with temperature.
:::

**Hydrogels** are crosslinked hydrophilic networks that hold many times their own mass of water, such as poly(2-hydroxyethyl methacrylate) contact lenses, polyacrylamide electrophoresis gels and the sodium polyacrylate of nappies. Their swelling is a balance between the Flory–Huggins mixing free energy, which drives water in, and the rubber elasticity of [[polymer-chemistry/polymer-properties#prop-rubber]], which resists stretching of the network. This is the Flory–Rehner theory. **Polyelectrolyte gels** such as partly neutralised poly(acrylic acid) swell enormously because the counter-ions trapped in the gel add an osmotic pressure. They swell less in salt water, which screens it, and they respond to pH as the carboxylic acid groups ($\mathrm{p}K_\mathrm{a} \approx 4.5$) ionise. A superabsorbent can take up hundreds of times its mass of pure water, but far less of urine or brine.

### Shape memory, self-healing and dynamic networks

A **shape-memory polymer** is a network (chemical or physical) with a switching transition, usually $T_\mathrm{g}$ or a melting point, inside its use range. Heated above the switch, it is rubbery and can be deformed. Cooled under load, the temporary shape is frozen in, as the glassy or crystalline phase locks the chains. Reheated, the network's entropic elasticity pulls it back to the permanent shape set by its crosslinks. Uses include heat-shrink tubing (crosslinked polyethylene, switched at $T_\mathrm{m}$), and self-tightening sutures and stents are under development.

Conventional thermosets cannot be reshaped or recycled, because their crosslinks are permanent ([[polymer-chemistry/step-growth]]). **Dynamic covalent networks** replace some or all crosslinks by bonds that exchange under a trigger. In the **vitrimers** introduced by Leibler and co-workers in 2011, transesterification exchanges ester links at high temperature, catalysed by zinc salts. The *number* of crosslinks is conserved, so the material never dissolves, but the network topology rearranges, so it can flow and be remoulded and welded like a glass. Its viscosity falls in an Arrhenius fashion, as silica glass does, rather than following WLF. Disulfide, boronic ester, imine and Diels–Alder exchange chemistries give related **self-healing** and recyclable networks. Supramolecular polymers held together by multiple hydrogen bonds (such as the ureidopyrimidinone units of Meijer's group) heal by re-forming their non-covalent links.

## Polymers in medicine

Medical polymers are chosen for **biocompatibility**, the absence of harmful responses in the specific application, and often for controlled **degradation**. Examples are polymeric implants (UHMWPE hip-joint liners, PMMA bone cement, silicone), soft contact lenses (hydrogels), sutures and scaffolds (degradable polyesters), and drug delivery systems. This section is for education only and gives no medical advice. Dosage values below are illustrative, not clinical.

**Poly(ethylene glycol)** (PEG) is water-soluble, flexible and strongly hydrated, so it resists protein adsorption. Attaching PEG chains to a protein drug (**PEGylation**) increases its hydrodynamic size, so the kidneys clear it more slowly, and shields it from enzymes and antibodies. The first PEGylated protein drug was approved in the United States in 1990, and dozens have followed. PEG also coats lipid nanoparticles, including those of the mRNA vaccines, and anti-PEG antibodies, found in a fraction of the population, are an active subject of study.

**Degradable polyesters** made by ring-opening polymerisation ([[polymer-chemistry/controlled-polymerisation]]) are the workhorse of absorbable devices. They are poly(glycolic acid) (PGA, the first synthetic absorbable suture, introduced around 1970), poly(lactic acid) (PLA), their copolymers (PLGA) and poly(ε-caprolactone) (PCL). Their ester bonds hydrolyse in body fluid, and the products, lactic and glycolic acid, are metabolised. Their rates span weeks (PGA, amorphous PLGA 50:50) to years (crystalline PLLA, PCL), set by crystallinity, hydrophobicity and $T_\mathrm{g}$, because water must get in before hydrolysis can happen.

### Diffusion-controlled release

The simplest controlled-release device is a polymer matrix with a drug dispersed or dissolved in it. The drug leaves by diffusion. For a slab of thickness $L$ releasing from both faces, Fick's second law gives a release curve that starts as the square root of time.

::: proposition Fickian release from a slab {#prop-release}
A slab of thickness $L$, with drug initially uniform at concentration $c_0$ and diffusion coefficient $D$, placed in a well-stirred sink (surface concentration zero), releases a fraction
$$
\frac{M_t}{M_\infty} = 1 - \sum_{k=0}^{\infty}\frac{8}{(2k+1)^2\pi^2}\exp\!\left[-\frac{(2k+1)^2\pi^2Dt}{L^2}\right]
\;\approx\; 4\left(\frac{Dt}{\pi L^2}\right)^{1/2} \quad\left(\frac{M_t}{M_\infty} \lesssim 0.6\right).
$$ {#eq-release}
Release is proportional to $t^{1/2}$ at early times and approaches completion exponentially, with the slowest mode decaying with time constant $L^2/(\pi^2D)$.
:::

::: proof
At early times, before the two depletion fronts meet in the middle, each face behaves as the surface of a semi-infinite medium. The concentration profile is $c(x, t) = c_0\,\mathrm{erf}\bigl(x/2\sqrt{Dt}\bigr)$, which satisfies Fick's second law, $\partial c/\partial t = D\,\partial^2c/\partial x^2$, with $c = 0$ at the surface and $c = c_0$ far inside. The flux out through the surface is $D(\partial c/\partial x)_{x=0} = Dc_0/\sqrt{\pi Dt} = c_0\sqrt{D/\pi t}$. Integrating over time gives the amount released per unit area through one face, $2c_0\sqrt{Dt/\pi}$. Two faces give $4c_0\sqrt{Dt/\pi}$, and dividing by the total load per unit area, $c_0L$, gives the short-time form. The full series comes from separating variables on $0 < x < L$ with $c = 0$ at both faces. The solution is $c = \sum_kb_k\sin[(2k+1)\pi x/L]\,e^{-(2k+1)^2\pi^2Dt/L^2}$ with $b_k = 4c_0/[(2k+1)\pi]$ (the Fourier sine series of a constant). Integrating $c$ over the slab and subtracting from $c_0L$ gives [[#eq-release]]. $\blacksquare$
:::

The $t^{1/2}$ law means a matrix device releases fastest at first ("burst") and then slows. Zero-order (constant-rate) release, often wanted clinically, needs a different design. A **reservoir** device, with a drug core inside a rate-controlling membrane, gives constant flux while the core remains saturated. **Surface-eroding** polymers, such as polyanhydrides, are hydrophobic enough that water cannot penetrate, so they erode layer by layer and release drug in proportion to the eroded volume. In practice, release exponents are diagnosed by fitting $M_t/M_\infty = kt^n$. For a slab, $n = 0.5$ indicates Fickian diffusion, $n = 1$ indicates zero-order (erosion- or swelling-controlled) release, and values in between indicate mixed mechanisms.

::: widget plot
f: 1 - 8/pi^2*(exp(-d*pi^2*x) + exp(-9*d*pi^2*x)/9 + exp(-25*d*pi^2*x)/25 + exp(-49*d*pi^2*x)/49); 4*sqrt(d*x/pi)
x: 0, 10
y: 0, 1.05
sliders: d=0.05:0.01:0.3:0.01
labels: \text{exact series (four terms)}; \text{short-time}\ 4\sqrt{Dt/\pi L^2}
hlines: 1
caption: Fractional release $M_t/M_\infty$ from a slab against time ([[#prop-release]]), with time in arbitrary units and the slider setting $D/L^2$ in the same units. The two curves agree to within 1% up to about 60% release, after which the square-root law overshoots and the true curve bends towards completion. Doubling the slab thickness divides $D/L^2$ by four and stretches every release time by four, which is how release duration is designed. The early square-root rise is the "burst" that reservoir and surface-eroding devices are designed to avoid.
:::

::: example Designing a release period {#ex-release}
A drug-loaded polymer film $1.0\ \mathrm{mm}$ thick releases from both faces, and the drug's diffusion coefficient in the polymer is $1.0\times10^{-13}\ \mathrm{m^2\,s^{-1}}$. Estimate the time for 50% release. What thickness would double that time? (Illustrative values, not a clinical design.)
::: solution
Set $4(Dt/\pi L^2)^{1/2} = 0.50$, so $Dt/\pi L^2 = (0.125)^2 = 0.015625$, and
$$
t_{1/2} = \frac{0.015625\,\pi L^2}{D} = \frac{0.015625\times3.1416\times(1.0\times10^{-3}\ \mathrm{m})^2}{1.0\times10^{-13}\ \mathrm{m^2\,s^{-1}}} = 4.9\times10^{5}\ \mathrm{s} \approx 5.7\ \mathrm{days} .
$$
The full series gives 49.95% at this time, so the short-time form is essentially exact here. Because $t_{1/2} \propto L^2$, doubling the time needs a film $\sqrt2$ times thicker, $1.4\ \mathrm{mm}$. If the polymer also degrades over this period (PLGA), $D$ increases as the molar mass falls, and release accelerates in a later phase. That is a common, and designed-for, feature of degradable depots.
:::
:::

## Polymers designed to degrade

### Hydrolysis and chain scission

A polyester degrades by hydrolysis of ester links in its backbone. Each scission of a backbone bond turns one molecule into two, so the number-average molar mass falls in a simple way.

::: proposition Random chain scission {#prop-scission}
If backbone links are broken at random, with a first-order rate constant $k$ per link, in a polymer of number-average molar mass $\bar{M}_{\mathrm{n},0}$ and repeat-unit molar mass $M_0$, then for small extents of degradation
$$
\frac{1}{\bar{M}_\mathrm{n}(t)} = \frac{1}{\bar{M}_{\mathrm{n},0}} + \frac{kt}{M_0},
$$ {#eq-scission}
and the number of scissions per original chain is $s = \bar{M}_{\mathrm{n},0}/\bar{M}_\mathrm{n} - 1$. If the reaction is autocatalysed by the carboxylic acid end groups it creates, the rate grows with the concentration of ends, and $\ln\bar{M}_\mathrm{n}$ falls roughly linearly in time instead.
:::

::: proof
Work per unit mass of polymer. The number of molecules (in moles) is $1/\bar{M}_\mathrm{n}$, and the number of backbone links is about $1/M_0$ (one per repeat unit, for long chains). Each scission increases the number of molecules by exactly one. With first-order random scission and small conversion of links, the moles of links broken by time $t$ are $(1/M_0)(1 - e^{-kt}) \approx kt/M_0$. So $1/\bar{M}_\mathrm{n}(t) = 1/\bar{M}_{\mathrm{n},0} + kt/M_0$. Multiplying by $\bar{M}_{\mathrm{n},0}$, the number of molecules per original molecule is $\bar{M}_{\mathrm{n},0}/\bar{M}_\mathrm{n}$, and subtracting one gives the scissions per original chain. With autocatalysis, the rate per link is $k'[\mathrm{COOH}] \propto 1/\bar{M}_\mathrm{n}$, so $\mathrm{d}(1/\bar{M}_\mathrm{n})/\mathrm{d}t \propto 1/\bar{M}_\mathrm{n}$. This gives exponential growth of $1/\bar{M}_\mathrm{n}$, that is, $\ln\bar{M}_\mathrm{n}$ decreasing linearly. $\blacksquare$
:::

The molar mass falls long before any mass is lost. A PLA device loses most of its strength when $\bar{M}_\mathrm{n}$ has dropped below about $2\times10^{4}$, while it still looks intact, and it loses mass only when the fragments become short enough to dissolve (oligomers of fewer than about ten units). In thick devices, autocatalysis makes the interior, where acid ends accumulate, degrade faster than the surface, where they diffuse away. Large PLA implants can therefore hollow out from the inside ("heterogeneous bulk erosion").

::: example How fast is a PLA implant degrading? {#ex-scission}
A poly(L-lactide) part ($M_0 = 72.06\ \mathrm{g\,mol^{-1}}$ per lactic acid unit) has $\bar{M}_\mathrm{n} = 1.00\times10^{5}\ \mathrm{g\,mol^{-1}}$ initially and $5.00\times10^{4}\ \mathrm{g\,mol^{-1}}$ after 30 days in buffer at $37\ ^\circ\mathrm{C}$ (illustrative data). Assuming random, non-autocatalytic scission, find $k$ and predict $\bar{M}_\mathrm{n}$ after 90 days. How many scissions has each original chain suffered by then?
::: solution
From [[#eq-scission]]:
$$
k = \frac{M_0}{t}\left(\frac{1}{\bar{M}_\mathrm{n}} - \frac{1}{\bar{M}_{\mathrm{n},0}}\right) = \frac{72.06}{30\ \mathrm{d}}\,(2.00\times10^{-5} - 1.00\times10^{-5}) = 2.4\times10^{-5}\ \mathrm{d^{-1}} .
$$
Each ester link has about a one-in-forty-thousand chance per day of being cut. After 90 days, $1/\bar{M}_\mathrm{n} = 1.00\times10^{-5} + 3\times1.00\times10^{-5} = 4.00\times10^{-5}$, so $\bar{M}_\mathrm{n} = 2.5\times10^{4}\ \mathrm{g\,mol^{-1}}$, and $s = 10^{5}/2.5\times10^{4} - 1 = 3$ scissions per original chain. Only $3/1388$ of the links, 0.2%, have been cut, yet the molar mass has fallen fourfold. A doubling of the rate after the first month in the real data would signal autocatalysis.
:::
:::

### Biodegradable, compostable, bio-based

::: warning "Bio-based", "biodegradable" and "compostable" are different claims {#warn-bio}
These three words are often used as if they meant the same thing. They do not. **Bio-based** describes the *origin* of the carbon: PLA from maize sugar, or bio-polyethylene from sugar-cane ethanol. Bio-polyethylene is chemically identical to fossil polyethylene and no more degradable. **Biodegradable** describes the *fate*: conversion by microorganisms into $\mathrm{CO_2}$ (or $\mathrm{CH_4}$), water and biomass. It is meaningless without the environment and the timescale. **Compostable** is a tested claim of biodegradation under defined composting conditions. The European standard EN 13432 for packaging requires, among other things, at least 90% biodegradation within six months and 90% disintegration within twelve weeks in *industrial* composting (about $58\ ^\circ\mathrm{C}$). PLA meets it in industrial composting but degrades very slowly in a garden heap, in soil or in the sea, because at low temperature it is a glass ($T_\mathrm{g} \approx 55$–$60\ ^\circ\mathrm{C}$) that water penetrates slowly. Polyhydroxyalkanoates such as poly(3-hydroxybutyrate), made by bacteria, and some aliphatic polyesters degrade in more environments. A fossil-derived polyester (PBAT, PCL) can be compostable, and a bio-based one may not be. Judge each claim against its stated standard.
:::

### Recycling

Polymers can be kept in use in four ways, in decreasing order of the value they retain.

- **Mechanical recycling** sorts, washes, melts and re-extrudes. It is the dominant route for PET bottles and HDPE. Each pass shortens chains by thermal and hydrolytic scission and mixes in contaminants and incompatible polymers. By [[polymer-chemistry/polymer-solutions]], immiscible blends phase-separate and are weak, so quality degrades ("downcycling") unless streams are pure or compatibilisers are added.
- **Chemical recycling** depolymerises to monomers or oligomers. PET is converted by glycolysis, methanolysis or hydrolysis (the reverse of [[polymer-chemistry/step-growth#prop-equilibrium]]), PMMA and polystyrene by thermal unzipping above their ceiling temperatures ([[polymer-chemistry/radical-polymerisation#prop-ceiling]]), and nylon-6 back to caprolactam. Polyolefins, which do not unzip cleanly, are pyrolysed to oils and gases, an energy-intensive route whose environmental benefit depends on what the products replace.
- **Enzymatic recycling** uses hydrolases. In 2016 Yoshida and co-workers reported the bacterium *Ideonella sakaiensis*, whose PETase and MHETase enzymes break PET down to terephthalic acid and ethane-1,2-diol. In 2020 Tournier and co-workers described an engineered leaf-compost cutinase that depolymerised 90% of pre-treated PET within ten hours. Enzymes work best on amorphous PET, near its $T_\mathrm{g}$, where the chains are mobile.
- **Design for recycling**: single-material packaging in place of laminates, removable labels and adhesives, and dynamic-covalent thermosets that can be reprocessed.

The scale of the problem is large. As of 2026, the most recent industry figures (Plastics Europe, *Plastics – the fast Facts 2024*) put world plastics production at about $414$ million tonnes in 2023, roughly $50\ \mathrm{kg}$ per person. The OECD's *Global Plastics Outlook* (2022) estimated that of about $353$ million tonnes of plastic waste generated in 2019, only about 9% was recycled, about 19% was incinerated, about 50% went to sanitary landfill and about 22% was mismanaged (dumped, burned in the open or leaked to the environment). Regulation is tightening. The EU Single-Use Plastics Directive (2019/904) sets recycled-content targets for PET drinks bottles (25% by 2025, 30% for all plastic bottles by 2030), and the EU Packaging and Packaging Waste Regulation (2025) extends recycled-content and recyclability requirements. A legally binding global plastics treaty has been under negotiation through the United Nations Environment Programme since 2022. Its fifth negotiating session, held in two parts (Busan, 2024; Geneva, 2025), ended without an agreed text. These figures change from year to year, and the cited sources should be checked for updates.

::: quiz
A food container is labelled "made from 100% plant-based plastic". Which conclusion is justified?
- [ ] It will biodegrade in a home compost heap within a few months.
- [ ] It is necessarily PLA and can be industrially composted.
- [x] Nothing about its degradability follows: "plant-based" describes the source of the carbon, and the material might be bio-polyethylene or bio-PET, chemically identical to their fossil equivalents.
- [ ] It must have a lower glass-transition temperature than a fossil-based plastic.
::: solution
See [[#warn-bio]]. Bio-based refers to origin, not fate. Bio-PE and bio-PET are drop-in replacements with the same durability and recycling routes as the fossil versions. Even for PLA, compostability is an industrial-composting claim (EN 13432), not a home-compost one. The glass transition depends on the chemistry of the chain, not on whether its carbon came from a plant.
:::
:::

::: history
**Hideki Shirakawa**, **Alan MacDiarmid** and **Alan Heeger** reported highly conducting iodine-doped polyacetylene in 1977 and shared the 2000 Nobel Prize in Chemistry "for the discovery and development of conductive polymers". In 1990 **Jeremy Burroughes**, **Richard Friend** and co-workers at Cambridge reported electroluminescence from poly(*p*-phenylenevinylene) (*Nature* 347, 539), the start of polymer LEDs. **Michael Heskins** and **James Guillet** described the phase transition of aqueous PNIPAM in 1968, and **Toyoichi Tanaka**'s studies of the volume phase transition of gels (from 1978) made responsive gels a field. Synthetic absorbable sutures of poly(glycolic acid) were introduced around 1970. **Frank Davis** and **Abraham Abuchowski** pioneered protein PEGylation in the 1970s, and the first PEGylated drug was approved in the United States in 1990. **Robert Langer** and **Judah Folkman** showed in 1976 that macromolecules could be released over long periods from polymer matrices, founding controlled drug delivery. **Ludwik Leibler**'s group introduced vitrimers in 2011 (*Science* 334, 965). **Shosuke Yoshida**, **Kohei Oda** and co-workers reported the PET-degrading bacterium *Ideonella sakaiensis* in 2016 (*Science* 351, 1196).
:::

## Where this leads

Functional polymers bring the whole course together. Syntheses rely on [[polymer-chemistry/controlled-polymerisation]] for end groups, blocks and degradable backbones. Responsive behaviour is the Flory–Huggins thermodynamics of [[polymer-chemistry/polymer-solutions]], and devices depend on the glass transition, networks and viscoelasticity of [[polymer-chemistry/polymer-properties]]. Sustainable polymer design, with life-cycle assessment, atom economy, renewable feedstocks and catalysis for depolymerisation, is the subject of [[green-chemistry]]. The band picture of conjugated chains connects to [[materials-chemistry]], and the quantum mechanics of the particle in a box to [[quantum-chemistry]]. The diffusion equation used for drug release is solved in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: summary
- Conjugation narrows the π–π* gap, but bond alternation (the Peierls distortion) keeps it at about 1.5 eV. The free-electron model gets the trend right but fails for long chains. Doping creates polarons and bipolarons, giving $\sigma = ne\mu$ up to metallic values with a few percent of charges per repeat unit. Uses include PEDOT:PSS, OLEDs, OPVs and transistors.
- An LCST needs negative enthalpy and entropy of mixing ($\chi = A + B/T$ with $B < 0$, $A > \tfrac12$). PNIPAM collapses near 32 °C through the hydrophobic effect. Hydrogels balance mixing against network elasticity (Flory–Rehner), and polyelectrolyte gels respond to pH and salt.
- Shape memory uses a $T_\mathrm{g}$ or $T_\mathrm{m}$ switch plus entropic recovery. Vitrimers and dynamic covalent networks exchange bonds to allow reprocessing and healing.
- PEGylation prolongs circulation. Degradable polyesters (PGA, PLA, PLGA, PCL) hydrolyse at rates set by crystallinity and water uptake.
- Matrix release is Fickian, $M_t/M_\infty \approx 4(Dt/\pi L^2)^{1/2}$ with times $\propto L^2$. Reservoirs and surface erosion approach zero-order release.
- Random scission gives $1/\bar{M}_\mathrm{n} = 1/\bar{M}_{\mathrm{n},0} + kt/M_0$. Strength is lost long before mass, and autocatalysis accelerates the interior.
- Bio-based, biodegradable and compostable (EN 13432) are distinct claims. As of 2026, about 414 Mt of plastics are produced a year (2023 data) and only about 9% of plastic waste is recycled (OECD, 2019 data). Mechanical, chemical and enzymatic recycling each have limits rooted in polymer chemistry.
:::

## Exercises

::: exercise Carriers in a doped film {level=1 check="1.25"}
A doped conjugated-polymer film has $\sigma = 1.0\times10^{2}\ \mathrm{S\,cm^{-1}}$ and hole mobility $0.50\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$. What is the carrier density? (Enter $n$ in units of $10^{21}\ \mathrm{cm^{-3}}$, to three significant figures.)
::: solution
$n = \sigma/(e\mu) = 100/(1.602\times10^{-19}\times0.50) = 1.25\times10^{21}\ \mathrm{cm^{-3}}$.
:::
:::

::: exercise Square-root release {level=1 check="4"}
A matrix device releases 20% of its drug in the first hour, following Fickian slab kinetics. How long from the start does it take to release 40%? (Enter the time in hours.)
::: solution
At early times $M_t/M_\infty \propto t^{1/2}$, so doubling the fraction released takes four times as long: $t = 4\ \mathrm{h}$. (40% is still in the range where the square-root law holds.)
:::
:::

::: exercise Scissions per chain {level=1 check="9"}
A polyester's number-average molar mass falls by hydrolysis from $9.0\times10^{4}$ to $9.0\times10^{3}\ \mathrm{g\,mol^{-1}}$. On average, how many scissions has each original chain suffered? (Enter $s$.)
::: solution
$s = \bar{M}_{\mathrm{n},0}/\bar{M}_\mathrm{n} - 1 = 10 - 1 = 9$. Nine cuts turn each chain into ten fragments.
:::
:::

::: exercise Locating an LCST {level=2 check="305"}
An aqueous polymer has $\chi = A + B/T$ with $A = 2.10$ and $B = -488\ \mathrm{K}$. At what temperature does $\chi$ reach $\tfrac12$, the long-chain critical value? Is water a better or a worse solvent above that temperature? (Enter $T$ in K.)
::: solution
From [[#eq-lcst]], $\Theta = -B/(A - \tfrac12) = 488/1.60 = 305\ \mathrm{K}$ ($32\ ^\circ\mathrm{C}$). Above this temperature $\chi > \tfrac12$, so water is a *worse* solvent and the polymer separates. This is the reverse of a UCST system.
:::
:::

::: exercise Free-electron estimate for a decapentaene {level=2 check="579"}
Use [[#eq-free-electron]] with $L = Nl$, $l = 0.139\ \mathrm{nm}$, to estimate the wavelength of the lowest absorption of a linear polyene with $N = 10$ conjugated carbons. (Enter $\lambda$ in nm, to three significant figures.)
::: solution
$L = 1.39\ \mathrm{nm}$. $\Delta E = h^2(11)/(8m_\mathrm{e}L^2) = (4.390\times10^{-67})(11)/[8(9.109\times10^{-31})(1.932\times10^{-18})] = 3.43\times10^{-19}\ \mathrm{J} = 2.14\ \mathrm{eV}$, so $\lambda = hc/\Delta E = 579\ \mathrm{nm}$. The real decapentaene absorbs near $330$–$340\ \mathrm{nm}$. The free-electron model increasingly overestimates the wavelength as the chain lengthens, because it ignores bond alternation.
:::
:::

::: exercise Half-release time of a thick film {level=2 check="54.5"}
A drug diffuses out of a $2.0\ \mathrm{mm}$ polymer film through both faces with $D = 1.0\times10^{-12}\ \mathrm{m^2\,s^{-1}}$. Estimate the time to 50% release with the short-time form of [[#eq-release]]. (Enter $t_{1/2}$ in hours, to three significant figures.)
::: solution
$t_{1/2} = (0.125)^2\pi L^2/D = 0.015625\times3.1416\times4.0\times10^{-6}/1.0\times10^{-12} = 1.96\times10^{5}\ \mathrm{s} = 54.5\ \mathrm{h}$. Compared with [[#ex-release]], the film is twice as thick ($\times4$) and $D$ is ten times larger ($\div10$), so the time is $0.4$ times as long.
:::
:::

::: exercise A degradation rate constant {level=3 check="0.000113"}
(a) Derive [[#eq-scission]], stating your assumptions. (b) A PLA sample ($M_0 = 72.06\ \mathrm{g\,mol^{-1}}$) has $\bar{M}_\mathrm{n} = 8.0\times10^{4}$ initially and $4.0\times10^{4}\ \mathrm{g\,mol^{-1}}$ after 8 weeks. Find $k$ per week. (c) Measurements at 16 weeks give $\bar{M}_\mathrm{n} = 1.5\times10^{4}$. Is the degradation random or autocatalytic? (Enter $k$ in $\mathrm{week^{-1}}$, to three significant figures.)
::: solution
(a) See the proof of [[#prop-scission]]. The assumptions are random scission at all backbone links, first order in links, a small fraction of links broken, and no loss of short chains from the sample. Each scission adds one molecule, so $1/\bar{M}_\mathrm{n}$ grows by the moles of links cut per unit mass, $kt/M_0$.

(b) $k = M_0(1/\bar{M}_\mathrm{n} - 1/\bar{M}_{\mathrm{n},0})/t = 72.06\times(2.5\times10^{-5} - 1.25\times10^{-5})/8 = 1.13\times10^{-4}\ \mathrm{week^{-1}}$.

(c) The random model predicts $1/\bar{M}_\mathrm{n} = 1.25\times10^{-5} + 2\times1.25\times10^{-5} = 3.75\times10^{-5}$ at 16 weeks, so $\bar{M}_\mathrm{n} = 2.7\times10^{4}$. The measured $1.5\times10^{4}$ is much lower. In the autocatalytic model, $\ln\bar{M}_\mathrm{n}$ falls linearly: halving in 8 weeks predicts $2.0\times10^{4}$ at 16 weeks, closer but still too high. The degradation is accelerating, which is consistent with autocatalysis by the accumulating acid end groups, and perhaps with growing water uptake as the polymer loses crystallinity or $T_\mathrm{g}$ falls.
:::
:::

::: exercise Doping level of polyacetylene {level=3 check="0.116"}
Iodine-doped polyacetylene films have been made with $\sigma \approx 1.0\times10^{3}\ \mathrm{S\,cm^{-1}}$. Assuming $\mu = 1.0\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$, a density of $1.16\ \mathrm{g\,cm^{-3}}$ and that each carrier is one positive charge on the chain balanced by one $\mathrm{I_3^-}$ ion, find the fraction of CH units bearing a charge, and the mass fraction of iodine in the doped film. Comment on the result. (Enter the charged fraction to three significant figures.)
::: hint
Find the carrier density, then compare with the density of CH units. For the mass fraction, $\mathrm{(CH I_{3y})}_x$ with $y$ the charged fraction.
:::
::: solution
$n = 1.0\times10^{3}/(1.602\times10^{-19}\times1.0) = 6.24\times10^{21}\ \mathrm{cm^{-3}}$. CH units: $5.37\times10^{22}\ \mathrm{cm^{-3}}$ (from [[#ex-doping]]). Fraction $y = 6.24\times10^{21}/5.37\times10^{22} = 0.116$. Per CH unit, the film carries $3y = 0.349$ iodine atoms, so the iodine mass fraction is $(0.349\times126.9)/(13.02 + 0.349\times126.9) = 44.3/57.3 = 0.77$. More than three-quarters of the "polymer" film, by mass, is iodine. The film is better described as a salt of a polycation than as a lightly doped semiconductor, unlike silicon, where dopants are parts per million. The doping also swells the film and changes the chain packing, which is one reason conductivity depends so strongly on processing.
:::
:::
