Hang a weight from a rubber band and warm the band with a hair dryer. The band *contracts* and lifts the weight. Every other solid you know expands when heated. Now take the clear, stiff PET of a drinks bottle and the same PET spun and drawn into a polyester shirt fibre: chemically identical, one a glassy sheet and the other a flexible, strong thread. Drop a ball of "silly putty" (a lightly crosslinked silicone) and it bounces like rubber. Leave it on a table overnight and it flows into a puddle like a liquid. None of this behaviour is explained by bond strengths or functional groups. It comes from the *physics* of long chains: how they pack into crystals or fail to, how they move as a group above the glass transition, how entangled coils store and dissipate energy, and how the entropy of a stretched coil produces a force.

This chapter connects molecular structure to the properties engineers use. We start with the two states of solid polymer, **crystalline** (lamellae of folded chains, with melting temperatures controlled by lamellar thickness) and **amorphous** (a glass below $T_\mathrm{g}$, rubber or melt above it). We look at what sets $T_\mathrm{g}$ and how plasticisers and molar mass shift it, and we derive the Williams–Landel–Ferry equation from free volume. Then we treat **viscoelasticity** with spring-and-dashpot models and time–temperature superposition, **rubber elasticity** as the entropic spring of [[polymer-chemistry/polymer-solutions]] multiplied by a network, the extraordinary molar-mass dependence of **melt viscosity**, and finally **strength**: why polymers yield, craze and break, and how orientation makes fibres stronger than steel per unit mass.

## Crystalline and amorphous polymers

A polymer can crystallise only if its chains are regular enough to pack into a lattice. Linear polyethylene, isotactic polypropylene, nylons, PET and PTFE crystallise. Atactic polystyrene, atactic PMMA and polycarbonate (whose bulky, kinked repeat unit crystallises only with great difficulty) do not, and they are used as transparent glasses. Even crystallisable polymers never crystallise completely. Chains are entangled and cannot disentangle fast enough, so a semicrystalline polymer is a composite of crystalline and amorphous regions. Its **crystallinity** ranges from 30–50% (LDPE, PET as moulded) up to 70–90% (HDPE, PTFE), measured by DSC ([[polymer-chemistry/polymer-characterisation#def-crystallinity]]), X-ray diffraction or density.

The crystalline regions are thin plates, **lamellae**, about 5–25 nm thick and microns wide. The chains run roughly perpendicular to the lamellar surface. A chain several micrometres long, $10^{4}$ bonds, crosses a 10 nm lamella many times by folding back at its surfaces or leaving it and re-entering elsewhere. Chains that leave one lamella and enter another, called **tie molecules**, bind the lamellae together. They are the source of the toughness of semicrystalline polymers. When crystallised from the melt, lamellae grow outwards from nuclei and branch, forming spherical **spherulites** up to millimetres across. Spherulites scatter light, which is why semicrystalline polymers are translucent or opaque, while amorphous glasses are clear.

### Why thin crystals melt low

Because lamellae are thin, a large fraction of their chain units sit at fold surfaces, which carry an excess free energy. This depresses the melting point below that of an infinitely thick crystal.

::: proposition Gibbs–Thomson equation for lamellar melting {#prop-gibbs-thomson}
A lamellar crystal of thickness $\ell$ (much smaller than its lateral dimensions), with fold-surface free energy $\sigma_\mathrm{e}$ per unit area and enthalpy of fusion $\Delta h_\mathrm{f}$ per unit volume of crystal, melts at
$$
T_\mathrm{m} = T_\mathrm{m}^\circ\left(1 - \frac{2\sigma_\mathrm{e}}{\Delta h_\mathrm{f}\,\ell}\right),
$$ {#eq-gibbs-thomson}
where $T_\mathrm{m}^\circ$ is the **equilibrium melting temperature** of an infinitely thick crystal.
:::

::: proof
Consider a lamella of area $A$ and thickness $\ell$. Relative to the melt, its Gibbs energy is
$$
\Delta G = -A\ell\,\Delta g_\mathrm{f} + 2A\sigma_\mathrm{e},
$$
where $\Delta g_\mathrm{f}$ is the bulk free energy of fusion per unit volume (positive below $T_\mathrm{m}^\circ$). The lateral surfaces are neglected because they are small compared with the two fold surfaces. Melting occurs where $\Delta G = 0$, so $\Delta g_\mathrm{f} = 2\sigma_\mathrm{e}/\ell$. Near $T_\mathrm{m}^\circ$, $\Delta g_\mathrm{f} = \Delta h_\mathrm{f} - T\Delta s_\mathrm{f}$ with $\Delta s_\mathrm{f} = \Delta h_\mathrm{f}/T_\mathrm{m}^\circ$, so $\Delta g_\mathrm{f} \approx \Delta h_\mathrm{f}(T_\mathrm{m}^\circ - T)/T_\mathrm{m}^\circ$, treating $\Delta h_\mathrm{f}$ as constant over the small interval. Setting this equal to $2\sigma_\mathrm{e}/\ell$ and solving for $T$:
$$
T_\mathrm{m} = T_\mathrm{m}^\circ - \frac{2\sigma_\mathrm{e}T_\mathrm{m}^\circ}{\Delta h_\mathrm{f}\ell} = T_\mathrm{m}^\circ\left(1 - \frac{2\sigma_\mathrm{e}}{\Delta h_\mathrm{f}\ell}\right). \qquad\blacksquare
$$
:::

Lamellar thickness is set kinetically. Crystallising at a small supercooling gives thick lamellae, and quenching gives thin ones. The melting point of a semicrystalline polymer therefore depends on its thermal history, and a broad DSC endotherm reflects a broad distribution of lamellar thicknesses. Annealing just below $T_\mathrm{m}$ thickens the lamellae and raises their melting point. A plot of $T_\mathrm{m}$ against $1/\ell$ is linear, and its intercept gives $T_\mathrm{m}^\circ$ (the Hoffman–Weeks construction uses the crystallisation temperature for the same purpose).

::: example Melting point of polyethylene lamellae {#ex-lamellae}
For polyethylene, take $T_\mathrm{m}^\circ = 414.6\ \mathrm{K}$, $\sigma_\mathrm{e} = 0.090\ \mathrm{J\,m^{-2}}$ and $\Delta h_\mathrm{f} = 2.93\times10^{8}\ \mathrm{J\,m^{-3}}$ ($293\ \mathrm{J\,g^{-1}}$ times a crystal density of about $1.00\ \mathrm{g\,cm^{-3}}$). Find the melting points of lamellae $10$ and $20\ \mathrm{nm}$ thick, and the number of $\mathrm{CH_2}$ units spanning a $20\ \mathrm{nm}$ lamella.
::: solution
The correction factor is $2\sigma_\mathrm{e}/(\Delta h_\mathrm{f}\ell)$.

- $\ell = 10\ \mathrm{nm}$: $2(0.090)/[(2.93\times10^{8})(1.0\times10^{-8})] = 0.0614$, so $T_\mathrm{m} = 414.6(1 - 0.0614) = 389\ \mathrm{K}$ ($116\ ^\circ\mathrm{C}$).
- $\ell = 20\ \mathrm{nm}$: the factor halves to $0.0307$, so $T_\mathrm{m} = 402\ \mathrm{K}$ ($129\ ^\circ\mathrm{C}$).

Commercial HDPE melts at $130$–$135\ ^\circ\mathrm{C}$, which corresponds to lamellae of 20–30 nm. LDPE melts near $110\ ^\circ\mathrm{C}$: its short branches cannot enter the crystal and limit the lamellae to under 10 nm. In the all-*trans* zigzag each $\mathrm{CH_2}$ advances $0.127\ \mathrm{nm}$ along the chain axis, so a $20\ \mathrm{nm}$ lamella is crossed by stems of about 160 carbons. A chain of $10^{4}$ backbone carbons can traverse it some 60 times.
:::
:::

## The glass transition

Cool a polymer melt and, if it does not crystallise, it becomes steadily more viscous. Then, over a range of a few kelvin, it changes from a rubbery or liquid state into a hard, brittle glass. The modulus rises by a factor of about a thousand, and the thermal expansion coefficient and heat capacity drop. This is the **glass transition**, at temperature $T_\mathrm{g}$. It is not a phase transition in the thermodynamic sense: no latent heat is released and no structural order appears. Instead it marks the temperature at which the cooperative motion of chain segments, rearrangements involving perhaps tens of backbone bonds, becomes too slow to follow the experiment. Below $T_\mathrm{g}$, the chains are frozen into a disordered conformation. Above it, they wriggle on timescales of seconds or faster.

::: definition Glass-transition temperature {#def-tg}
The **glass-transition temperature** $T_\mathrm{g}$ is the temperature range over which an amorphous polymer (or the amorphous fraction of a semicrystalline one) changes between a glassy state, with segmental motion frozen, and a rubbery or liquid state, with large-scale segmental motion. It is identified by a step in heat capacity (DSC), a change in slope of specific volume against temperature (dilatometry), or a maximum in mechanical loss (DMA). Because it is a kinetic transition, $T_\mathrm{g}$ depends on the measurement timescale. It rises by about $3\ \mathrm{K}$ per tenfold increase in cooling rate or frequency. Values are quoted for a stated method, and for DSC usually at $10$–$20\ \mathrm{K\,min^{-1}}$.
:::

Representative glass-transition temperatures (approximate, from standard compilations) show what controls $T_\mathrm{g}$:

| polymer | $T_\mathrm{g}$ / °C | what dominates |
|---|---|---|
| poly(dimethylsiloxane) | $-125$ | very flexible Si–O–Si backbone |
| *cis*-1,4-polyisoprene (natural rubber) | $-70$ | flexible backbone, small side group |
| polypropylene (isotactic, amorphous part) | $-10$ | methyl side group |
| poly(vinyl acetate) | $30$ | polar ester side group |
| poly(ethylene terephthalate) | $75$ | rigid aromatic ring in the backbone |
| poly(vinyl chloride) | $80$ | polar C–Cl, dipolar attraction |
| polystyrene | $100$ | bulky phenyl side group |
| poly(methyl methacrylate) | $105$ | α-methyl plus ester |
| bisphenol A polycarbonate | $150$ | stiff aromatic backbone |

$T_\mathrm{g}$ rises with backbone stiffness (rings in the chain), bulky or rigid side groups that hinder rotation, polar or hydrogen-bonding interactions between chains, and crosslinking. It falls with flexible backbone links (–O–, –Si–O–), with long flexible side chains, which space the backbones apart, and with small molecules dissolved in the polymer. Those small molecules are **plasticisers**. Phthalate or adipate esters turn rigid PVC ($T_\mathrm{g} \approx 80\ ^\circ\mathrm{C}$) into the flexible material of cables and flooring. Water plasticises nylons and many biopolymers.

Two empirical rules quantify the effects of molar mass and of plasticiser.

::: proposition Molar-mass and composition dependence of Tg (empirical) {#prop-fox}
1. **Fox–Flory**: for a linear polymer of number-average molar mass $\bar{M}_\mathrm{n}$,
$$
T_\mathrm{g} = T_\mathrm{g}^\infty - \frac{K_\mathrm{g}}{\bar{M}_\mathrm{n}},
$$ {#eq-fox-flory}
with $T_\mathrm{g}^\infty$ the limit for infinite chains and $K_\mathrm{g}$ a constant (about $10^{5}\ \mathrm{K\,g\,mol^{-1}}$ for polystyrene).
2. **Fox equation**: for a miscible blend or plasticised polymer with mass fractions $w_1$, $w_2$ of components with glass transitions $T_{\mathrm{g}1}$, $T_{\mathrm{g}2}$ (in kelvin),
$$
\frac{1}{T_\mathrm{g}} = \frac{w_1}{T_{\mathrm{g}1}} + \frac{w_2}{T_{\mathrm{g}2}} .
$$ {#eq-fox}
Both are empirical, rationalised by free-volume arguments.
:::

::: proof Free-volume rationale
*Fox–Flory.* Chain ends are more mobile than chain middles and carry extra free volume, say $\theta$ per end. A sample of unit mass has $2N_\mathrm{A}/\bar{M}_\mathrm{n}$ ends, adding free volume $2N_\mathrm{A}\theta/\bar{M}_\mathrm{n}$. Suppose the glass forms when the free volume per unit mass falls to a fixed critical value, and the free volume of the infinite chain grows above $T_\mathrm{g}^\infty$ as $\alpha_\mathrm{f}(T - T_\mathrm{g}^\infty)$, with $\alpha_\mathrm{f}$ the expansion coefficient of free volume. Then the short-chain sample reaches the critical free volume at a temperature lower by $\Delta T$, where $\alpha_\mathrm{f}\Delta T = 2N_\mathrm{A}\theta/\bar{M}_\mathrm{n}$. This gives $T_\mathrm{g} = T_\mathrm{g}^\infty - K_\mathrm{g}/\bar{M}_\mathrm{n}$ with $K_\mathrm{g} = 2N_\mathrm{A}\theta/\alpha_\mathrm{f}$. The number-average appears because the correction counts *ends*, which is to say chains.

*Fox equation.* If the free volumes of the components add in proportion to their amounts, and each component's free-volume expansion coefficient is inversely proportional to its own $T_\mathrm{g}$ (an empirical regularity, the Simha–Boyer rule $\Delta\alpha\,T_\mathrm{g} \approx$ constant), then requiring the critical free volume at the blend's $T_\mathrm{g}$ gives $\sum_iw_i(T_\mathrm{g} - T_{\mathrm{g}i})/T_{\mathrm{g}i} = 0$, which rearranges to [[#eq-fox]]. The assumptions are rough, so the result is a rule of thumb. More flexible forms such as the Gordon–Taylor equation, with a fitted constant, describe data better. $\blacksquare$
:::

### Time–temperature superposition and the WLF equation

Above $T_\mathrm{g}$, every relaxation process of an amorphous polymer, whether segmental motion, stress relaxation, creep or melt flow, speeds up with temperature by the same factor. This is the principle of **time–temperature superposition**. Data measured at different temperatures can be shifted along the logarithmic time (or frequency) axis by a **shift factor** $a_T$ to form one master curve. Near $T_\mathrm{g}$, $a_T$ does not follow an Arrhenius law. Its apparent activation energy rises steeply on cooling, which is the signature of cooperative motion that needs free volume.

::: proposition Williams–Landel–Ferry equation {#prop-wlf}
For $T_\mathrm{g} \le T \lesssim T_\mathrm{g} + 100\ \mathrm{K}$, the shift factor relative to $T_\mathrm{g}$ is
$$
\log_{10}a_T = \log_{10}\frac{\tau(T)}{\tau(T_\mathrm{g})} = -\frac{C_1(T - T_\mathrm{g})}{C_2 + T - T_\mathrm{g}},
$$ {#eq-wlf}
with $C_1 \approx 17.4$ and $C_2 \approx 52\ \mathrm{K}$ for many polymers (the "universal" values $17.44$ and $51.6\ \mathrm{K}$). The form follows from the Doolittle free-volume equation with fractional free volume $f_\mathrm{g} \approx 0.025$ at $T_\mathrm{g}$, increasing above $T_\mathrm{g}$ with expansion coefficient $\alpha_\mathrm{f} \approx 4.8\times10^{-4}\ \mathrm{K^{-1}}$.
:::

::: proof
Doolittle's empirical equation for the viscosity of liquids, interpreted by Cohen and Turnbull, relates the relaxation time to the fractional free volume $f$: $\ln\tau = \ln A + B/f$, with $B$ of order one. Above $T_\mathrm{g}$, $f$ grows linearly: $f = f_\mathrm{g} + \alpha_\mathrm{f}(T - T_\mathrm{g})$. Then
$$
\ln\frac{\tau(T)}{\tau(T_\mathrm{g})} = B\left(\frac{1}{f} - \frac{1}{f_\mathrm{g}}\right) = -\frac{B}{f_\mathrm{g}}\cdot\frac{\alpha_\mathrm{f}(T - T_\mathrm{g})}{f_\mathrm{g} + \alpha_\mathrm{f}(T - T_\mathrm{g})} = -\frac{B}{f_\mathrm{g}}\cdot\frac{T - T_\mathrm{g}}{f_\mathrm{g}/\alpha_\mathrm{f} + T - T_\mathrm{g}} .
$$
Converting to base-10 logarithms gives [[#eq-wlf]] with $C_1 = B/(2.303f_\mathrm{g})$ and $C_2 = f_\mathrm{g}/\alpha_\mathrm{f}$. With $B = 1$, $f_\mathrm{g} = 0.025$ and $\alpha_\mathrm{f} = 4.8\times10^{-4}\ \mathrm{K^{-1}}$, $C_1 = 17.4$ and $C_2 = 52\ \mathrm{K}$, which recovers the universal constants. $\blacksquare$
:::

::: widget plot
f: -c1*x/(c2 + x)
x: 0, 120
y: -16, 0
sliders: c1=17.44:10:25:0.1; c2=51.6:30:100:0.5
labels: \log_{10}a_T\ \text{(WLF)}
points: 10, -2.831; 50, -8.583
caption: The WLF shift factor [[#eq-wlf]] against $T - T_\mathrm{g}$, with $C_1$ and $C_2$ on the sliders (defaults: the universal values). Ten kelvin above $T_\mathrm{g}$, relaxation is already about 700 times faster than at $T_\mathrm{g}$. At $T_\mathrm{g} + 50\ \mathrm{K}$, it is $10^{8.6}$ times faster. The curve is steep near $T_\mathrm{g}$ and flattens at higher temperature, unlike an Arrhenius law, which would be a straight line against $1/T$. The marked points are the two temperatures compared in [[#ex-wlf]]. A process lasting a second at $T_\mathrm{g} + 50$ takes days at $T_\mathrm{g} + 10$. Raising $C_2$ (more free volume at $T_\mathrm{g}$) softens the curve.
:::

::: example Physical ageing, by the WLF clock {#ex-wlf}
A stress-relaxation process in an amorphous polymer takes $1.0\ \mathrm{s}$ at $T_\mathrm{g} + 50\ \mathrm{K}$. Using the universal WLF constants, how long does it take at $T_\mathrm{g} + 10\ \mathrm{K}$?
::: solution
From [[#eq-wlf]]:
$$
\log_{10}a_T(T_\mathrm{g}+50) = -\frac{17.44\times50}{51.6 + 50} = -8.583,
\qquad
\log_{10}a_T(T_\mathrm{g}+10) = -\frac{17.44\times10}{51.6 + 10} = -2.831 .
$$
The ratio of times is $10^{-2.831 - (-8.583)} = 10^{5.752} = 5.6\times10^{5}$. The process therefore takes $5.6\times10^{5}\ \mathrm{s}$, about $6.5$ days, at $T_\mathrm{g} + 10$. Forty kelvin changes the timescale by nearly six orders of magnitude. This is why polymers are processed far above $T_\mathrm{g}$, and why a glassy part used near its $T_\mathrm{g}$ slowly creeps and densifies ("physical ageing") over months.
:::
:::

## Viscoelasticity

A polymer above $T_\mathrm{g}$ is neither an elastic solid nor a viscous liquid. It is both, depending on how fast you deform it. The simplest description combines an elastic **spring** (stress $\sigma = E\varepsilon$, Hooke) with a viscous **dashpot** (stress $\sigma = \eta\,\mathrm{d}\varepsilon/\mathrm{d}t$, Newton).

::: definition Maxwell and Kelvin–Voigt models {#def-maxwell}
- The **Maxwell model** is a spring and a dashpot in **series**. The same stress acts on both, and the strains add: $\mathrm{d}\varepsilon/\mathrm{d}t = (1/E)\,\mathrm{d}\sigma/\mathrm{d}t + \sigma/\eta$. Its relaxation time is $\tau = \eta/E$. Held at a fixed strain $\varepsilon_0$, it **relaxes** its stress as $\sigma(t) = E\varepsilon_0e^{-t/\tau}$. Under fixed stress it flows indefinitely. It is the model of a viscoelastic *liquid*.
- The **Kelvin–Voigt model** is a spring and a dashpot in **parallel**. Both share the same strain, and the stresses add: $\sigma = E\varepsilon + \eta\,\mathrm{d}\varepsilon/\mathrm{d}t$. Under a constant stress $\sigma_0$ it **creeps** towards $\sigma_0/E$ as $\varepsilon(t) = (\sigma_0/E)(1 - e^{-t/\tau})$, and it recovers fully when the stress is removed. It is the model of a viscoelastic *solid*.

Real polymers need a spectrum of relaxation times. A generalised Maxwell model (many Maxwell elements in parallel) gives $E(t) = \sum_iE_ie^{-t/\tau_i}$.
:::

::: example Stress relaxation and creep in the two models {#ex-maxwell}
A polymer above its $T_\mathrm{g}$ is modelled by a spring $E = 2.0\ \mathrm{MPa}$ and a dashpot $\eta = 2.0\times10^{5}\ \mathrm{Pa\,s}$. (a) As a Maxwell element, it is suddenly stretched to a strain of $0.10$ and held there. Find the initial stress and the stress after $0.50\ \mathrm{s}$. (b) As a Kelvin–Voigt element, it carries a constant stress of $0.20\ \mathrm{MPa}$ from $t = 0$. Find the strain after $0.10\ \mathrm{s}$ and the limiting strain.
::: solution
Both models have $\tau = \eta/E = 2.0\times10^{5}/2.0\times10^{6} = 0.10\ \mathrm{s}$.

(a) Immediately after the step the dashpot has not moved, so the spring carries all the strain: $\sigma(0) = E\varepsilon_0 = (2.0\ \mathrm{MPa})(0.10) = 0.20\ \mathrm{MPa}$. After $0.50\ \mathrm{s}$, which is five relaxation times, $\sigma = 0.20\,e^{-5} = 1.3\times10^{-3}\ \mathrm{MPa}$. Over 99% of the stress has relaxed as the dashpot flowed.

(b) $\varepsilon(t) = (\sigma_0/E)(1 - e^{-t/\tau})$. The limit is $\sigma_0/E = 0.10$, and at $t = \tau = 0.10\ \mathrm{s}$ the strain is $0.10(1 - e^{-1}) = 0.063$. The parallel dashpot delays the elastic response without ever letting the material flow.

Real polymers do both: an instantaneous elastic strain, a delayed elastic strain and, unless crosslinked, permanent flow. The four-element Burgers model (a Maxwell element in series with a Kelvin–Voigt element) is the simplest model that shows all three.
:::
:::

The best experimental probe is **dynamic mechanical analysis**. A small sinusoidal strain $\varepsilon = \varepsilon_0\sin\omega t$ is applied, and the stress response is resolved into a part in phase with the strain (the **storage modulus** $E'$, elastic energy stored and returned) and a part $90^\circ$ out of phase (the **loss modulus** $E''$, energy dissipated as heat). Their ratio is the **loss tangent** $\tan\delta = E''/E'$. For a single Maxwell element,
$$
E'(\omega) = E\frac{\omega^2\tau^2}{1 + \omega^2\tau^2},
\qquad
E''(\omega) = E\frac{\omega\tau}{1 + \omega^2\tau^2} .
$$ {#eq-maxwell-dynamic}
At low frequency ($\omega\tau \ll 1$), the material has time to flow: $E'$ is small and the response is liquid-like. At high frequency it has no time to flow: $E' \to E$ and the response is solid-like. The loss peaks where $\omega\tau = 1$. That peak is how $T_\mathrm{g}$ is located in a DMA temperature scan at fixed frequency: as temperature passes through $T_\mathrm{g}$, the segmental relaxation time sweeps through $1/\omega$.

::: widget plot
f: 10^(2*x)/(1+10^(2*x)); 10^x/(1+10^(2*x))
x: -3, 3
y: 0, 1.05
labels: E'/E\ \text{(storage)}; E''/E\ \text{(loss)}
vlines: 0
caption: The storage and loss moduli of a single Maxwell element [[#eq-maxwell-dynamic]], normalised by the spring modulus $E$, against $\log_{10}(\omega\tau)$. At slow deformation (left) the dashpot flows and the material stores almost nothing: it is a liquid. At fast deformation (right) the dashpot cannot move and the material is a spring: a solid. The loss modulus peaks at $\omega\tau = 1$ (the vertical line) with height $E/2$, where the material dissipates most energy per cycle. Silly putty has $\tau$ of about a second. Bounced, it is on the right, and left on a table overnight, on the far left. By time–temperature superposition, heating moves the whole picture to the right ($\tau$ falls), so a fixed-frequency experiment sees the same curves when temperature is scanned.
:::

A plot of modulus against temperature at a fixed timescale (say $10\ \mathrm{s}$) summarises the mechanical life of an amorphous polymer. It shows a **glassy plateau** ($E \approx 1$–$3\ \mathrm{GPa}$), a drop of about three decades through the **glass-transition region**, and then a **rubbery plateau** ($E \approx 0.1$–$1\ \mathrm{MPa}$). The rubbery plateau exists because the chains are entangled: entanglements act as temporary crosslinks. Its length grows with molar mass. Finally comes **flow**, as chains disentangle. A crosslinked rubber has no flow region, and its rubbery plateau continues until the polymer decomposes. A semicrystalline polymer keeps a high modulus up to $T_\mathrm{m}$, because its crystallites hold the amorphous regions together.

## Rubber elasticity

A rubber is a network of flexible chains above $T_\mathrm{g}$, joined at crosslinks (by sulfur bridges in vulcanised rubber), so that the chains between crosslinks can explore conformations but the network cannot flow. Stretching the rubber stretches each network strand. By [[polymer-chemistry/polymer-solutions#eq-entropic-spring]], each strand resists with a force proportional to its extension and to the absolute temperature. The network adds up those forces.

::: proposition Affine network theory of rubber elasticity {#prop-rubber}
For an ideal network of $\nu$ elastically effective strands per unit volume, each a Gaussian chain, deformed **affinely** (every strand end-to-end vector scales like the sample) at constant volume, a uniaxial extension ratio $\lambda = L/L_0$ gives the nominal (engineering) stress
$$
\sigma = \nu k_\mathrm{B}T\left(\lambda - \frac{1}{\lambda^2}\right) = \frac{\rho RT}{M_\mathrm{c}}\left(\lambda - \frac{1}{\lambda^2}\right),
$$ {#eq-rubber}
where $\rho$ is the density and $M_\mathrm{c}$ the number-average molar mass of a strand between crosslinks. The shear modulus is $G = \nu k_\mathrm{B}T = \rho RT/M_\mathrm{c}$, and the small-strain Young's modulus is $E = 3G$.
:::

::: proof
A Gaussian strand with end-to-end vector $\mathbf{R} = (x, y, z)$ has entropy $S = S_0 - (3k_\mathrm{B}/2\langle R^2\rangle_0)(x^2 + y^2 + z^2)$ ([[polymer-chemistry/polymer-solutions#eq-entropic-spring]]). In the undeformed network, assume the strands have their unperturbed dimensions, so $\langle x^2\rangle = \langle y^2\rangle = \langle z^2\rangle = \langle R^2\rangle_0/3$. A deformation with principal extension ratios $\lambda_x, \lambda_y, \lambda_z$ maps $x \to \lambda_xx$ and so on (the affine assumption). Averaging over the strands, the entropy change per strand is
$$
\Delta S = -\frac{3k_\mathrm{B}}{2\langle R^2\rangle_0}\cdot\frac{\langle R^2\rangle_0}{3}\left(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3\right) = -\frac{k_\mathrm{B}}{2}\left(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3\right).
$$
For uniaxial extension at constant volume, $\lambda_x = \lambda$ and $\lambda_y = \lambda_z = \lambda^{-1/2}$ (so $\lambda_x\lambda_y\lambda_z = 1$). For an ideal rubber the internal energy does not change, so the work of deformation per unit volume is $W = -T\nu\Delta S = \tfrac12\nu k_\mathrm{B}T(\lambda^2 + 2/\lambda - 3)$. The nominal stress is the derivative of $W$ with respect to $\lambda$ (force per undeformed area, since $\mathrm{d}L = L_0\,\mathrm{d}\lambda$):
$$
\sigma = \frac{\mathrm{d}W}{\mathrm{d}\lambda} = \nu k_\mathrm{B}T\left(\lambda - \frac{1}{\lambda^2}\right).
$$
With $\nu = \rho N_\mathrm{A}/M_\mathrm{c}$ strands per unit volume, $\nu k_\mathrm{B}T = \rho RT/M_\mathrm{c}$. For small strain, $\lambda = 1 + \varepsilon$ and $\lambda - \lambda^{-2} \approx 3\varepsilon$, so $E = 3\nu k_\mathrm{B}T$, which is $3G$ for an incompressible solid. $\blacksquare$
:::

Three predictions follow, and each is observed. **The modulus is tiny.** For a typical $M_\mathrm{c}$ of a few thousand, $G$ is about $0.5\ \mathrm{MPa}$, against $1\ \mathrm{GPa}$ for a glass and $80\ \mathrm{GPa}$ for steel. The restoring force comes from entropy, not from bond stretching. **The modulus is proportional to absolute temperature.** A stretched rubber held at fixed length pulls harder when heated, and a rubber under a fixed load contracts when heated. This is the **Gough–Joule effect** with which the chapter opened, the signature of entropic elasticity. **The modulus measures crosslink density**, which gives a way to measure $M_\mathrm{c}$, either mechanically or from equilibrium swelling in a solvent (the Flory–Rehner theory, which combines [[#eq-rubber]] with the Flory–Huggins free energy). Real rubbers deviate from [[#eq-rubber]] at moderate extensions (the Mooney–Rivlin correction) and stiffen sharply at large ones, as the strands approach full extension or crystallise under strain. Strain-induced crystallisation is why natural rubber is so tough.

::: example A natural-rubber band {#ex-rubber}
A vulcanised natural rubber ($\rho = 0.91\ \mathrm{g\,cm^{-3}}$) has $M_\mathrm{c} = 5.0\times10^{3}\ \mathrm{g\,mol^{-1}}$ between crosslinks. At $25\ ^\circ\mathrm{C}$, find its shear modulus, the nominal stress at an extension ratio of 2, and the force needed to hold a band of cross-section $2.0\ \mathrm{mm}\times1.0\ \mathrm{mm}$ at that extension. By what factor does the force change if the band is warmed to $75\ ^\circ\mathrm{C}$ at constant length?
::: solution
$$
G = \frac{\rho RT}{M_\mathrm{c}} = \frac{(910\ \mathrm{kg\,m^{-3}})(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})}{5.0\ \mathrm{kg\,mol^{-1}}} = 4.5\times10^{5}\ \mathrm{Pa} = 0.45\ \mathrm{MPa} .
$$
At $\lambda = 2$: $\sigma = G(2 - 0.25) = 0.79\ \mathrm{MPa}$. On the undeformed cross-section of $2.0\times10^{-6}\ \mathrm{m^2}$, the force is $(7.9\times10^{5})(2.0\times10^{-6}) = 1.6\ \mathrm{N}$, about the weight of 160 g. Warming to $348.15\ \mathrm{K}$ at constant length multiplies the force by $348.15/298.15 = 1.17$. The band pulls 17% harder when hot. (Thermal expansion slightly offsets this at very small extensions, which causes the "thermoelastic inversion" below about 10% strain.)
:::
:::

## Melt viscosity and entanglement

The zero-shear viscosity of a polymer melt depends on molar mass in two regimes. Below a **critical molar mass** $M_\mathrm{c}'$ (about twice the entanglement molar mass $M_\mathrm{e}$, typically $10^{4}$–$4\times10^{4}$), $\eta_0 \propto M$. Each chain is dragged through its neighbours like a bead necklace in a viscous liquid (the Rouse model). Above $M_\mathrm{c}'$,
$$
\eta_0 \propto M_\mathrm{w}^{3.4},
$$ {#eq-melt}
an exponent so consistent across polymers that it is almost universal. Above $M_\mathrm{c}'$ the chains are entangled. De Gennes (1971), and Doi and Edwards after him, explained this with **reptation**: an entangled chain is confined to a tube formed by its neighbours and can escape only by sliding along its own length, like a snake. The time to escape grows as $M^3$, and the viscosity with it. Fluctuations of the tube length bring the exponent closer to the observed 3.4.

The practical consequence is a trade-off. Mechanical strength and toughness rise with molar mass, while processability falls very steeply. Doubling $M_\mathrm{w}$ raises melt viscosity by $2^{3.4} = 10.6$. Polymers for injection moulding are therefore made with the lowest molar mass that gives acceptable properties. Ultra-high-molar-mass polyethylene ($M \sim 5\times10^{6}$) is so viscous that it cannot be melt-processed conventionally and is sintered or gel-spun instead. Melts are also **shear-thinning**: at high shear rates the chains disentangle and align, and viscosity falls by orders of magnitude. Without that, extrusion would be impossible. Shear-thinning is captured by the frequency dependence of [[#eq-maxwell-dynamic]] for a spectrum of relaxation times.

::: warning Tg is not a melting point, and polymers do not "melt" at Tg {#warn-tg}
Students often treat $T_\mathrm{g}$ as a low-temperature melting point. They are different in kind. **Melting** ($T_\mathrm{m}$) is a first-order phase transition of the *crystalline* regions, with a latent heat, an equilibrium temperature $T_\mathrm{m}^\circ$, and a dependence on lamellar thickness. The **glass transition** is a kinetic freezing of *amorphous* segmental motion, with a step in heat capacity, no latent heat, and a value that shifts with measurement timescale. Amorphous polymers (atactic PS, PMMA, PC) have a $T_\mathrm{g}$ and no $T_\mathrm{m}$. Semicrystalline polymers have both, with, as a rough empirical rule, $T_\mathrm{g} \approx (0.5$–$0.7)\,T_\mathrm{m}$ in kelvin. Above $T_\mathrm{g}$ an amorphous polymer is a *rubber* (if entangled or crosslinked) before it is a liquid. Its viscosity falls continuously, and there is no temperature at which it "becomes a liquid". Do not quote $T_\mathrm{g}$ without the method and rate, and do not use it as a maximum service temperature for semicrystalline polymers: HDPE is in daily use 140 K above its $T_\mathrm{g}$ because its crystallites hold it together.
:::

## Strength, yielding and orientation

Loaded in tension, polymers show four broad types of behaviour (typical, approximate values):

| type | example | Young's modulus | strength | elongation at break |
|---|---|---|---|---|
| brittle glass | polystyrene | $\sim 3\ \mathrm{GPa}$ | $\sim 40\ \mathrm{MPa}$ | $\sim 2\%$ |
| ductile glass | polycarbonate | $\sim 2.3\ \mathrm{GPa}$ | $\sim 65\ \mathrm{MPa}$ | $\sim 100\%$ |
| semicrystalline | HDPE | $\sim 1\ \mathrm{GPa}$ | $\sim 30\ \mathrm{MPa}$ | several hundred % |
| elastomer | vulcanised rubber | $\sim 1$–$3\ \mathrm{MPa}$ | $\sim 20\ \mathrm{MPa}$ | $\sim 500\%$ |

Brittle glasses such as polystyrene fail by **crazing**: thin, crack-like zones form, bridged by fibrils of highly drawn polymer that eventually rupture. Ductile polymers **yield**. A neck forms and propagates along the specimen (**cold drawing**), and the chains in the neck become highly oriented along the stretching direction. Toughness requires chains long enough to entangle and span crazes. Below a minimum molar mass (around $2M_\mathrm{e}$) a glassy polymer has almost no strength, and above it strength rises roughly as $\sigma_\infty - A/\bar{M}_\mathrm{n}$, approaching a plateau. Short chains are defects. Rubber particles in high-impact polystyrene and ABS ([[polymer-chemistry/copolymerisation]]) toughen brittle glasses by initiating many small crazes that absorb energy instead of one catastrophic crack.

**Orientation** is the route to strength. A covalent C–C chain loaded along its axis is extremely strong and stiff. The theoretical modulus of an all-*trans* polyethylene chain is about $250$–$300\ \mathrm{GPa}$. An isotropic polymer uses almost none of this, because its load is carried by weak van der Waals contacts between chains. Drawing aligns the chains. **Gel-spun ultra-high-molar-mass polyethylene** fibres (Dyneema, Spectra) are drawn so that chains are nearly fully extended and aligned. They reach moduli above $100\ \mathrm{GPa}$ and tensile strengths of about $3\ \mathrm{GPa}$, and with a density below that of water they are about ten times stronger than steel per unit mass. **Aramid** fibres (Kevlar) reach similar strengths through rigid, liquid-crystalline chains that align spontaneously when spun. The difference between a polyethylene bag and a polyethylene rope used to moor ships is not chemistry, but molar mass and orientation.

::: quiz
A vulcanised rubber band is stretched to twice its length and clamped. It is then heated from $20\ ^\circ\mathrm{C}$ to $80\ ^\circ\mathrm{C}$ (well above its $T_\mathrm{g}$, below any degradation). What happens to the tension, according to ideal rubber elasticity?
- [ ] It falls, because the rubber softens on heating like other solids.
- [x] It rises by about 20%, because the stress of an entropic network is proportional to absolute temperature.
- [ ] It is unchanged, because the extension ratio is fixed.
- [ ] It rises by a factor of four, because the temperature in °C has quadrupled.
::: solution
By [[#prop-rubber]], at fixed $\lambda$ the stress is proportional to $T$ in kelvin: $353/293 = 1.20$, a rise of 20%. Heating makes the chains' thermal motion more vigorous, and they pull harder towards their higher-entropy, coiled states. Energetic solids soften on heating, but entropic networks stiffen. The Celsius ratio is meaningless, because only absolute temperature enters $k_\mathrm{B}T$.
:::
:::

::: history
**John Gough** reported in 1805 that a stretched strip of natural rubber warms when stretched and contracts when heated, and **James Joule** measured the effect quantitatively in 1859. **Charles Goodyear** discovered vulcanisation by heating rubber with sulfur in 1839 (patented in 1844), turning a sticky, temperature-sensitive gum into a durable elastomer. **Werner Kuhn** (1936) and **Eugene Guth** and **Hubert James** (1940s) developed the statistical theory of rubber elasticity, and **Leslie Treloar**'s experiments and book (*The Physics of Rubber Elasticity*, 1949) tested it in detail. **Thomas Fox** and **Paul Flory** described the molar-mass dependence of $T_\mathrm{g}$ in 1950. **Malcolm Williams**, **Robert Landel** and **John Ferry** published the WLF equation in 1955 (*Journal of the American Chemical Society* 77, 3701). **Andrew Keller** showed in 1957 that polyethylene single crystals grown from solution are thin lamellae of folded chains (*Philosophical Magazine* 2, 1171). **Pierre-Gilles de Gennes** proposed reptation in 1971, and **Masao Doi** and **Sam Edwards** built it into a theory of melt rheology from 1978. Gel-spun polyethylene fibres were developed at DSM in the Netherlands in the late 1970s by **Paul Smith** and **Piet Lemstra**.
:::

## Where this leads

The thermal transitions here are measured by DSC and DMA ([[polymer-chemistry/polymer-characterisation]]). The network physics of [[#prop-rubber]] continues in hydrogels and shape-memory polymers in [[polymer-chemistry/functional-polymers]], where $T_\mathrm{g}$ and the rubbery plateau are used as switches. The chain statistics behind entropic elasticity are developed in [[polymer-chemistry/polymer-solutions]], and the step-growth networks whose crosslink densities set the modulus are made in [[polymer-chemistry/step-growth]]. Crystal structures and diffraction of polymer crystals connect to [[materials-chemistry/crystal-structures]]. Mechanics of materials (stress, strain, moduli) is developed in Physics Atlas ([/learn/physics/](/learn/physics/)).

::: summary
- Regular chains crystallise into folded-chain lamellae (5–25 nm) organised in spherulites. They are always semicrystalline, with tie molecules giving toughness. The Gibbs–Thomson equation $T_\mathrm{m} = T_\mathrm{m}^\circ(1 - 2\sigma_\mathrm{e}/\Delta h_\mathrm{f}\ell)$ links melting point to lamellar thickness.
- The glass transition is a kinetic freezing of segmental motion. It is raised by stiff backbones, bulky or polar groups and crosslinks, and lowered by flexible links and plasticisers. Fox–Flory ($T_\mathrm{g} = T_\mathrm{g}^\infty - K/\bar{M}_\mathrm{n}$) and Fox ($1/T_\mathrm{g} = \sum w_i/T_{\mathrm{g}i}$) are empirical rules.
- Above $T_\mathrm{g}$, all relaxations shift together (time–temperature superposition) according to WLF, $\log a_T = -C_1(T-T_\mathrm{g})/(C_2 + T - T_\mathrm{g})$, which follows from free volume.
- Viscoelasticity: Maxwell (series, stress relaxation, liquid) and Kelvin–Voigt (parallel, creep, solid). $E'$ and $E''$ in oscillation, with the loss peak at $\omega\tau = 1$. The modulus–temperature curve runs glassy → transition → rubbery plateau → flow.
- Rubber elasticity is entropic: $\sigma = (\rho RT/M_\mathrm{c})(\lambda - \lambda^{-2})$, with a modulus of about 1 MPa, proportional to $T$ (Gough–Joule) and to crosslink density.
- Melt viscosity scales as $M$ below and $M_\mathrm{w}^{3.4}$ above the entanglement threshold (reptation), which sets the strength–processability trade-off. Melts shear-thin.
- Polymers fail by crazing or yield by cold drawing. Strength needs entanglement, and orientation (gel-spun UHMWPE, aramids) turns covalent chain strength into fibre strength.
:::

## Exercises

::: exercise Modulus of a rubber {level=1 check="0.237"}
A rubber network has $M_\mathrm{c} = 1.0\times10^{4}\ \mathrm{g\,mol^{-1}}$ and density $0.95\ \mathrm{g\,cm^{-3}}$. What is its shear modulus at $300\ \mathrm{K}$? (Enter $G$ in MPa, to three significant figures.)
::: solution
$G = \rho RT/M_\mathrm{c} = (950)(8.314)(300)/(10.0) = 2.37\times10^{5}\ \mathrm{Pa} = 0.237\ \mathrm{MPa}$. Halving $M_\mathrm{c}$ (twice the crosslink density) doubles it.
:::
:::

::: exercise Plasticised PVC {level=1 check="280"}
PVC ($T_\mathrm{g} = 354\ \mathrm{K}$) is mixed with 30% by mass of a phthalate plasticiser ($T_\mathrm{g} = 188\ \mathrm{K}$). Estimate the $T_\mathrm{g}$ of the mixture with the Fox equation. (Enter $T_\mathrm{g}$ in K, to three significant figures.)
::: solution
$1/T_\mathrm{g} = 0.70/354 + 0.30/188 = 1.977\times10^{-3} + 1.596\times10^{-3} = 3.573\times10^{-3}\ \mathrm{K^{-1}}$, so $T_\mathrm{g} = 280\ \mathrm{K}$ ($7\ ^\circ\mathrm{C}$). At room temperature the plasticised PVC is above its $T_\mathrm{g}$ and so is flexible, which is the purpose.
:::
:::

::: exercise A longer chain in the extruder {level=1 check="3.97"}
In the entangled regime, by what factor does the zero-shear melt viscosity rise when $M_\mathrm{w}$ is increased by 50%? (Enter the factor to three significant figures.)
::: solution
$\eta_0 \propto M_\mathrm{w}^{3.4}$, so the factor is $1.5^{3.4} = e^{3.4\ln1.5} = e^{1.379} = 3.97$. A 50% longer chain is four times harder to push through a die.
:::
:::

::: exercise Lamellar thickness from a melting point {level=2 check="22.2"}
A polyethylene sample melts at $130.0\ ^\circ\mathrm{C}$. Using the data of [[#ex-lamellae]], estimate the lamellar thickness. (Enter $\ell$ in nm, to three significant figures.)
::: solution
Rearrange [[#eq-gibbs-thomson]]: $\ell = 2\sigma_\mathrm{e}T_\mathrm{m}^\circ/[\Delta h_\mathrm{f}(T_\mathrm{m}^\circ - T_\mathrm{m})]$. With $T_\mathrm{m} = 403.15\ \mathrm{K}$, $T_\mathrm{m}^\circ - T_\mathrm{m} = 11.45\ \mathrm{K}$, so $\ell = 2(0.090)(414.6)/[(2.93\times10^{8})(11.45)] = 2.22\times10^{-8}\ \mathrm{m} = 22.2\ \mathrm{nm}$.
:::
:::

::: exercise Speeding up a relaxation {level=2 check="0.0134"}
A relaxation process in an amorphous polymer has a relaxation time of $1.0\times10^{3}\ \mathrm{s}$ at $T_\mathrm{g}$. Using the universal WLF constants, what is its relaxation time at $T_\mathrm{g} + 20\ \mathrm{K}$? (Enter $\tau$ in s, to three significant figures.)
::: solution
$\log_{10}a_T = -17.44\times20/(51.6 + 20) = -4.872$, so $\tau = 1.0\times10^{3}\times10^{-4.872} = 1.34\times10^{-2}\ \mathrm{s}$. Twenty kelvin take a process from a quarter of an hour to a hundredth of a second.
:::
:::

::: exercise Tg of a low-molar-mass polystyrene {level=2 check="353"}
Using the Fox–Flory equation with $T_\mathrm{g}^\infty = 373\ \mathrm{K}$ and $K_\mathrm{g} = 1.0\times10^{5}\ \mathrm{K\,g\,mol^{-1}}$, find $T_\mathrm{g}$ of a polystyrene with $\bar{M}_\mathrm{n} = 5.0\times10^{3}\ \mathrm{g\,mol^{-1}}$. (Enter $T_\mathrm{g}$ in K.)
::: solution
$T_\mathrm{g} = 373 - 1.0\times10^{5}/5000 = 373 - 20 = 353\ \mathrm{K}$. At $\bar{M}_\mathrm{n} = 10^{5}$ the correction is only 1 K, so commercial polystyrenes all have $T_\mathrm{g}$ close to $100\ ^\circ\mathrm{C}$.
:::
:::

::: exercise Stress–strain of an ideal rubber {level=3 check="1.30"}
(a) Derive [[#eq-rubber]] from the entropy of a Gaussian strand, stating the affine and constant-volume assumptions. (b) For a rubber with $G = 0.45\ \mathrm{MPa}$, find the nominal stress at $\lambda = 3$. (c) Why do real rubbers fall below this prediction at moderate $\lambda$ but rise far above it near $\lambda = 6$? (Enter the stress of part (b) in MPa, to three significant figures.)
::: solution
(a) As in the proof of [[#prop-rubber]]: $\Delta S$ per strand $= -\tfrac12k_\mathrm{B}(\lambda_x^2 + \lambda_y^2 + \lambda_z^2 - 3)$ with $\lambda_y = \lambda_z = \lambda^{-1/2}$, $W = -T\nu\Delta S$, and $\sigma = \mathrm{d}W/\mathrm{d}\lambda = \nu k_\mathrm{B}T(\lambda - \lambda^{-2})$.

(b) $\sigma = 0.45(3 - 1/9) = 0.45\times2.889 = 1.30\ \mathrm{MPa}$.

(c) At moderate extension, crosslink junctions fluctuate and do not move affinely, which softens the response (the Mooney–Rivlin $C_2$ term). Near $\lambda \approx 6$, strands approach their full contour length, where the Gaussian approximation fails and the force rises steeply (Langevin-chain statistics). Natural rubber also crystallises under strain, which reinforces it. Hence the upturn in the stress–strain curve before break.
:::
:::

::: exercise Where is the loss peak? {level=3 check="15.9"}
For a single Maxwell element, show from [[#eq-maxwell-dynamic]] that the loss modulus has its maximum at $\omega\tau = 1$, with height $E/2$. A rubbery polymer is modelled as a Maxwell element with $E = 1.0\ \mathrm{MPa}$ and $\eta = 1.0\times10^{4}\ \mathrm{Pa\,s}$. At what oscillation frequency (in hertz) does a DMA experiment see the loss maximum? (Enter $\nu$ in Hz, to three significant figures.)
::: solution
Let $u = \omega\tau$. Then $E''/E = u/(1+u^2)$, and $\mathrm{d}/\mathrm{d}u = (1 + u^2 - 2u^2)/(1+u^2)^2 = (1 - u^2)/(1+u^2)^2$, which is zero at $u = 1$. There $E''/E = 1/2$. The relaxation time is $\tau = \eta/E = 1.0\times10^{4}/1.0\times10^{6} = 1.0\times10^{-2}\ \mathrm{s}$, so the peak is at $\omega = 1/\tau = 100\ \mathrm{rad\,s^{-1}}$, or $\nu = \omega/2\pi = 15.9\ \mathrm{Hz}$. By time–temperature superposition, heating the sample shortens $\tau$ and moves the peak to higher frequency. At fixed frequency, scanning temperature moves $\tau$ through $1/\omega$, which is how DMA locates $T_\mathrm{g}$.
:::
:::
