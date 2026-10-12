In 1821 a schoolmaster called Hans Conrad Escher, crossing the Swiss Alps, noticed that a sequence of rocks on one side of a valley was the mirror image of the sequence on the other, and in the wrong order besides. Eighty years later the Geological Survey of Great Britain had to explain a map in the Highlands in which ancient Lewisian gneiss, some of the oldest rock on Earth, lay *on top of* younger Cambrian sandstone. The only explanation was that a slab of continental crust tens of kilometres long had been moved sideways over the rocks beneath it — and the idea was rejected for decades as physically impossible, because everyone knew that rock breaks, it does not flow, and nothing can push a sheet of rock $100\ \mathrm{km}$ across a country.

They were wrong about what rock can do, and the correction is the subject of this chapter. Given enough time, enough confinement and enough temperature, rock flows; given a little less, it fractures in patterns that are predictable from the stress field; and either way it keeps a record of what happened, in the orientation of its micas, the shape of its pebbles, the wavelength of its folds and the sense of its shear. Structural geology is the discipline that turns those records into a history of forces, and it is the closest thing geology has to forensic science.

## Stress, strain, and why rock flows when you are not looking

::: definition Stress and strain {#def-stress-strain}
**Stress** is force per unit area, measured in MPa ($1\ \mathrm{MPa} = 10\ \mathrm{bar} \approx 10\ \mathrm{kgf\,cm^{-2}}$). It is a tensor: at a point it is specified by six components, or equivalently by three mutually perpendicular **principal stresses** $\sigma_1 \ge \sigma_2 \ge \sigma_3$. The **lithostatic** (confining) stress is the mean, $\sigma_\text{lith} \approx \rho g z \approx 27\ \mathrm{MPa}$ per kilometre of depth for $\rho = 2750\ \mathrm{kg\,m^{-3}}$; the **differential stress** is $\sigma_1 - \sigma_3$, and it is the differential stress, not the total, that deforms a rock. **Strain** is the change in shape and size, measured as extension $e = (l - l_0)/l_0$ or, better for large deformations, as the natural logarithm $\ln(l/l_0)$.
:::

::: proposition Whether a rock fractures or flows depends on how fast you push {#prop-brittle-ductile}
Near the surface the strength of most crustal rocks is set by friction on prospective failure planes and rises linearly with depth (Byerlee's law, $\tau \approx 0.85\,\sigma_n$ for $\sigma_n$ up to about $2\ \mathrm{kbar}$). At depth the strength is set by thermally activated crystal plasticity, which falls steeply with temperature and rises with strain rate as
$$
\dot\varepsilon = A\,\tau^{n}, \qquad n \approx 3 \text{ for quartz and olivine}.
$$
The two profiles cross, and the crossing depth — the brittle–ductile transition — moves *deeper* if you deform the rock faster and *shallower* if you deform it slowly, because a faster rate strengthens the ductile mechanism and leaves friction the weaker of the two to greater depth.
:::

::: proof
Frictional strength increases with depth as $\tau_f = \mu\rho g z$ (ignoring pore pressure), a straight line through the origin. Ductile strength at a fixed strain rate is $\tau_d = (\dot\varepsilon/A)^{1/n}$, which for an isothermal rock would be constant but for a real geotherm falls roughly exponentially with depth because $A$ contains an Arrhenius factor $\exp(-Q/RT)$ and $T$ rises with $z$. A monotonically increasing line and a monotonically decreasing curve cross once, and the strength profile of the crust is therefore a triangle with a peak at the crossing depth — the "Christmas-tree" profile of engineering seismology.

Now change the strain rate by a factor of $10^3$, as between an earthquake and a mountain belt. The ductile strength rises by $(10^3)^{1/3} = 10$, because $n = 3$, while the frictional strength does not change at all. The frictional line then has to climb further before it undercut the raised ductile curve, so the crossing moves to higher pressure — deeper. Fast deformation makes rock behave brittlely to greater depth; slow deformation lets it flow near the surface. ∎

The consequence is the single most useful idea in structural geology: **the same rock is brittle or ductile depending on the strain rate**. A quartzite deforming at $10^{-14}\ \mathrm{s^{-1}}$ (a mountain belt) flows at $150\ ^\circ\mathrm{C}$; the same quartzite hit by a fault at $10^{0}\ \mathrm{s^{-1}}$ (an earthquake) shatters. Field evidence for the transition is everywhere: the same fault carries breccia and gouge in the shallow part and mylonite below, and the boundary can be dated and offset by later faulting.
:::

::: example How strong is the crust? {#ex-strength}
Take $\rho = 2700\ \mathrm{kg\,m^{-3}}$, Byerlee friction $\mu = 0.85$ and zero pore pressure. Find the differential stress needed to fracture rock at $10\ \mathrm{km}$ depth, and the strain rate at which quartzite of effective flow-law constant $A = 2\times10^{-29}\ \mathrm{Pa^{-3}\,s^{-1}}$ would flow at that same stress.
::: solution
$$
\tau_f = 0.85\times2700\times9.81\times10^{4} = 2.3\times10^{8}\ \mathrm{Pa} = 230\ \mathrm{MPa}.
$$
Setting $\dot\varepsilon = A\tau^3$ with $\tau = 2.3\times10^{8}\ \mathrm{Pa}$:
$$
\dot\varepsilon = 2\times10^{-29}\times(2.3\times10^{8})^3 = 2\times10^{-29}\times1.22\times10^{25} = 2.4\times10^{-4}\ \mathrm{s^{-1}} .
$$
Tectonic strain rates are $10^{-15}$–$10^{-13}\ \mathrm{s^{-1}}$, some ten billion times smaller. At those rates the flow stress at $10\ \mathrm{km}$ is far below $230\ \mathrm{MPa}$, so the rock creeps rather than fractures — and the stresses actually sustained by the crust, measured from earthquakes and from borehole breakouts, are indeed $10$–$100\ \mathrm{MPa}$, not the hundreds of megapascals that a cold, strong crust would imply. This is the "weak fault" problem in another guise, and pore pressure and fluids are the usual resolution: with $\lambda = P_\text{fluid}/\sigma_\text{lith} = 0.4$ the frictional strength above drops by $40\%$.
:::
:::

::: widget plot
f: 23*x ; 400*exp(-x/8)*(er/10)^(1/3)
x: 0, 35
y: 0, 1200
sliders: er=10:1:1000
labels: frictional strength; ductile flow
caption: Strength of the crust against depth. The straight line is Byerlee friction ($23\ \mathrm{MPa}$ per kilometre, dry rock); the curve is a ductile flow law that weakens exponentially with depth. The slider is the strain rate in units of $10^{-15}\ \mathrm{s^{-1}}$, so $10$ is the reference rate. At the reference rate the two curves cross at about $7\ \mathrm{km}$, and the strength of the crust is the lower envelope of the two — a triangle peaking at the crossing. Set the slider to $1000$ (a hundred times faster) and the crossing deepens past $30\ \mathrm{km}$, so the whole modelled crust is friction-strength limited and can earthquake; set it to $1$ (ten times slower) and the crossing rises to about $1.5\ \mathrm{km}$. That single move is the difference between a fault that slips seismically and one that creeps, and it is why the seismogenic zone of most continental faults ends at $15$–$20\ \mathrm{km}$.
:::

::: example Where does the crust break? {#ex-bdt}
Use the same two laws: frictional strength $\tau_f = 0.85(1-\lambda)\rho g z$ with $\rho = 2700\ \mathrm{kg\,m^{-3}}$, and a ductile strength $\tau_d = 400\,e^{-z/8}\ \mathrm{MPa}$ with $z$ in kilometres. Find the depth of the brittle–ductile transition for dry rock and for rock with fluid pressure factor $\lambda = P_\text{fluid}/\sigma_\text{lith} = 0.4$.
::: solution
For dry rock, $\tau_f = 22.9\,z\ \mathrm{MPa}$, and solving $22.9z = 400e^{-z/8}$ gives
$$
z \approx 7.1\ \mathrm{km}, \qquad \tau \approx 163\ \mathrm{MPa}.
$$
With $\lambda = 0.4$ the frictional line is $13.8z$, and the crossing moves to
$$
z \approx 9.3\ \mathrm{km}, \qquad \tau \approx 128\ \mathrm{MPa}.
$$
Fluid pressure does two things at once: it makes the crust *weaker* (the peak strength falls by $20\%$) and it makes the brittle field *deeper*. Both matter for earthquakes. Observed seismicity in continental crust typically stops at $15$–$20\ \mathrm{km}$, which requires either a cooler crust than this simple model or a faster effective strain rate; and in the hot crust beneath Tibet and the Basin and Range, earthquakes stop at $15$–$20\ \mathrm{km}$ with no events at all below, which is the primary evidence that the middle crust there flows ductilely rather than breaking.
:::
:::

## Fractures: joints and the geometry of faulting

::: theorem Anderson's theory of faulting {#thm-anderson}
If the Earth's surface is a free surface (no shear stress on it), one principal stress must be vertical, and the style of faulting is decided by which one it is:
$$
\begin{aligned}
\sigma_1 \text{ vertical} &\Rightarrow \text{normal faulting}, && \text{faults at } \sim 30^\circ \text{ to } \sigma_1,\\
\sigma_2 \text{ vertical} &\Rightarrow \text{strike-slip faulting}, && \text{vertical faults},\\
\sigma_3 \text{ vertical} &\Rightarrow \text{reverse (thrust) faulting}, && \text{faults at } \sim 30^\circ \text{ to } \sigma_1.
\end{aligned}
$$
:::

::: proof
Take a pre-existing or incipient plane making an angle $\theta$ with $\sigma_1$. Resolving the stresses on it, the normal and shear tractions are
$$
\sigma_n = \tfrac{1}{2}(\sigma_1+\sigma_3) + \tfrac{1}{2}(\sigma_1-\sigma_3)\cos 2\theta, \qquad
\tau = \tfrac{1}{2}(\sigma_1-\sigma_3)\sin 2\theta .
$$
Failure requires $\tau = \tau_0 + \mu\sigma_n$ (the Coulomb criterion). For zero cohesion the ratio $\tau/\sigma_n$ is maximised where $\mathrm{d}(\tau/\sigma_n)/\mathrm{d}\theta = 0$, which gives $\sin 2\theta = \mu/\sqrt{1+\mu^2}$, i.e. $\theta = 45^\circ + \tfrac{1}{2}\arctan\mu$. With $\mu = 0.75$–$0.85$ this is $\theta \approx 58^\circ$–$60^\circ$ measured from $\sigma_1$, so the fault dips $30^\circ$ from the direction of $\sigma_1$ and $60^\circ$ from horizontal when $\sigma_1$ is vertical. Because the surface carries no shear traction, $\sigma_\text{vertical}$ must be a principal stress, and the three choices above follow by putting $\sigma_1$, $\sigma_2$ or $\sigma_3$ vertical. ∎
:::

::: svg
caption: The three fault types, drawn as block diagrams with the same pre-existing horizontal layering. Normal faults form where $\sigma_1$ is vertical and the crust is being extended; the hanging wall moves down, the surface subsides, and the fault dips at about $60^\circ$ (shallowing with depth into a listric curve). Reverse and thrust faults form where $\sigma_3$ is vertical and the crust is shortened; the hanging wall moves up and over, and low-angle faults flatten onto a detachment. Strike-slip faults form where $\sigma_2$ is vertical, are near-vertical, and are named for the relative motion of the far side. In all three the horizontal principal stresses are perpendicular to the slip direction, which is what makes fault populations a stress gauge.
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Block diagrams of normal, thrust and strike-slip faults">
  <style>
    .blk { fill: var(--sheet); stroke: var(--ink-2); stroke-width: 1.3; }
    .bed { stroke: var(--series-1); stroke-width: 1.6; fill: none; }
    .flt { stroke: var(--bad); stroke-width: 2.4; fill: none; }
    .arw { stroke: var(--ink); stroke-width: 2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <!-- normal -->
  <g>
    <polygon class="blk" points="20,60 200,60 200,180 20,180"/>
    <path class="bed" d="M20,95 L200,95 M20,130 L200,130"/>
    <path class="flt" d="M60,60 L150,180"/>
    <path class="bed" d="M60,60 L150,180" style="stroke: var(--bad)"/>
    <path class="arw" d="M40,70 L18,70 M180,170 L202,170"/>
    <text class="lab" x="30" y="50">normal</text>
    <text class="sub" x="30" y="200">σ1 vertical · extension · dip ~60°</text>
  </g>
  <!-- thrust -->
  <g transform="translate(260,0)">
    <polygon class="blk" points="20,60 200,60 200,180 20,180"/>
    <path class="bed" d="M20,95 L200,95 M20,130 L200,130"/>
    <path class="flt" d="M20,150 Q110,140 200,80"/>
    <path class="arw" d="M60,52 L92,52 M180,190 L148,190"/>
    <text class="lab" x="30" y="42">thrust / reverse</text>
    <text class="sub" x="30" y="200">σ3 vertical · shortening · dip &lt; 45°</text>
  </g>
  <!-- strike slip -->
  <g transform="translate(520,0)">
    <polygon class="blk" points="20,60 200,60 200,180 20,180"/>
    <path class="bed" d="M20,95 L200,95 M20,130 L200,130"/>
    <line class="flt" x1="110" y1="60" x2="110" y2="180"/>
    <path class="bed" d="M20,95 L110,95 M110,88 L200,88" style="stroke: var(--series-2)"/>
    <path class="arw" d="M70,52 L40,52 M150,68 L180,68"/>
    <text class="lab" x="30" y="42">strike-slip</text>
    <text class="sub" x="30" y="200">σ2 vertical · lateral shear · dip ~90°</text>
  </g>
</svg>
:::

Joints — extension fractures with no significant shear — are the commonest structure in the crust and the reason aquifers, hydrocarbon reservoirs and geothermal systems flow at all. They form perpendicular to the least principal stress, so a set of joints is a direct reading of the stress field; they are often spaced at a regular multiple of the bed thickness, which is evidence that the layer and its neighbours deformed together. Where a joint opens and is filled, it becomes a **vein**, and a vein is a dated, chemically analysed sample of the fluid that was present at the moment of failure.

## Folds

::: definition Fold geometry {#def-fold}
A **fold** is a curved layer or set of layers. The **hinge** is the point of maximum curvature, the **limbs** the flanking parts, the **axial plane** the surface bisecting the hinge, and the **axial surface** the trace of the axial planes through a stack of folds. Folds are **upright** (vertical axial plane), **inclined**, **overturned** (one limb inverted) or **recumbent** (horizontal axial plane). In **parallel** (concentric) folds the layer thickness measured at right angles to the bed is constant, so the inner arc is shorter than the outer and space must be made by flattening or by migration of material; in **similar** folds the thickness measured vertically is constant and the layer thickens at the hinge.
:::

::: proposition Fold wavelength is set by the thickness of the weak layer {#prop-wavelength}
When a competent layer of thickness $h$ in a less competent matrix shortens, it buckles with a wavelength
$$
L \propto h\,\left(\frac{\eta_1}{\eta_0}\right)^{1/3},
$$
so a tenfold increase in layer thickness gives only a 2.2-fold increase in wavelength, and a fold train is a measurement of the thickness of the layer that buckled.
:::

::: proof
Biot's (1961) analysis balances the work of bending the layer against the work of dragging the surrounding matrix. Bending resistance per unit length scales as $\eta_1 h^3$ (an elastic beam's rigidity goes as the cube of its thickness), while the resistance of the matrix to the flow induced by the buckle scales as $\eta_0 L$ for a wavelength $L$. Equating the two terms in the energy and minimising with respect to $L$ gives $L \propto h(\eta_1/\eta_0)^{1/3}$. The exponent $1/3$ is the observable: it means that fold wavelength is a *robust* but low-resolution indicator of layer thickness, and that a fold train with a systematic wavelength change across an outcrop is recording a change in the thickness or the viscosity of one layer. ∎
:::

::: example Shortening from a cross-section {#ex-shortening}
A marker bed can be traced for $42\ \mathrm{km}$ along a cross-section line, following its folded outcrop, and the layer-parallel length measured along the bed is $98\ \mathrm{km}$. Find the shortening. If the bed was originally horizontal and the section line is perpendicular to the strike, how much crust was lost, and where did it go?
::: solution
Shortening $= 1 - 42/98 = 0.57$, i.e. $57\%$, an extension ratio of $0.43$ or a stretch of $2.33$. Of $98\ \mathrm{km}$ of original crust, $56\ \mathrm{km}$ has been lost from the section.

It went three ways, and the balance between them is the argument of the cross-section. Some was taken up by **thrust sheets** that now lie on top of the section and have been eroded away; some by **out-of-section transport** along strike, which is why a single section always under-estimates shortening; and some by **vertical thickening**, which is what makes the topography and the root. A fold-and-thrust belt with $50\%$ shortening and no evidence of erosion is a red flag: either the section is not balanced, or the shortening is happening somewhere else.
:::
:::

Two other structures belong in the same paragraph because they are the same physics at a smaller scale. **Boudins** form when a competent layer is stretched parallel to itself and breaks into sausage-shaped segments separated by gaps filled with ductile matrix; the stretch is recoverable from the boudin length $l$ and the gap $t$ as $S = (l+t)/l$, and typical values of $1.2$–$3$ are common in deformed conglomerates and veins. **Pinch-and-swell** structures are the ductile version, without discrete breaks. Both tell you the direction of maximum extension, which in a folded terrain is often *within* the shortening direction — extension in the direction of shortening is one of the counter-intuitive facts that makes structural geology worth studying.

## Deep structure: ramps, flats, nappes and roots

::: svg
caption: A thrust system built from listric faults that flatten onto a detachment. Where a thrust ramps up section through the stratigraphy it drags the hanging wall into a fold — the ramp-flat geometry that produces the fold-and-thrust belts of the world, and the reason folds at the surface can be mapped as if they were faults. Where erosion removes the hanging wall of a ramp, an isolated outlier (**klippe**) is left above the thrust sheet (**nappe**) whose root is still exposed in the **window** or **fenster** below.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ramp-flat thrust geometry with fold, klippe and window">
  <style>
    .c1 { fill: var(--info-wash); stroke: var(--rule-2); stroke-width: 1; }
    .c2 { fill: var(--accent-wash); stroke: var(--rule-2); stroke-width: 1; }
    .c3 { fill: var(--warm-wash); stroke: var(--rule-2); stroke-width: 1; }
    .flt { stroke: var(--bad); stroke-width: 2.6; fill: none; }
    .bed { stroke: var(--series-1); stroke-width: 1.3; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .arw { stroke: var(--ink); stroke-width: 2; fill: none; }
  </style>
  <path class="c1" d="M0,120 L760,120 L760,300 L0,300 Z"/>
  <path class="c2" d="M0,120 Q120,60 260,120 L260,150 Q120,95 0,150 Z"/>
  <path class="c3" d="M0,150 Q120,95 260,150 L260,175 Q120,120 0,175 Z"/>
  <path class="flt" d="M0,240 L300,240 Q380,238 430,150 L760,150"/>
  <path class="bed" d="M300,240 Q380,238 430,150" style="stroke: var(--bad)"/>
  <path class="c2" d="M300,240 Q360,150 470,120 L760,120 L760,150 L430,150 Q380,238 300,240 Z"/>
  <path class="bed" d="M330,205 Q400,150 520,132 M350,228 Q430,175 560,150"/>
  <path class="arw" d="M600,135 L640,135 M200,255 L160,255"/>
  <text class="lab" x="470" y="105">hanging-wall fold over the ramp</text>
  <text class="lab" x="40" y="230">flat (detachment)</text>
  <text class="lab" x="330" y="270">ramp</text>
  <text class="sub" x="40" y="112">eroded surface</text>
  <text class="sub" x="520" y="180">nappe: old over young</text>
  <text class="sub" x="300" y="292">arrows show relative motion of the hanging wall</text>
</svg>
:::

Thrust faults that cut up through the stratigraphy are steep where they cut and flat where they ride along a weak layer — shale, evaporite, overpressured mud — and this **ramp-flat** geometry has two consequences that make the geometry of mountain belts predictable. First, a hanging wall carried over a ramp must bend, so **folds at the surface are the surface expression of ramps at depth**, and a cross-section drawn through a fold-and-thrust belt can be balanced bed-by-bed to test whether the interpretation is geometrically possible. Second, the whole stack can be translated tens to hundreds of kilometres on a shallow detachment, producing the nappes that took sixty years to accept: the Glarus Alps carry a slab of Helvetic nappe some $40\ \mathrm{km}$ long over the Molasse, and the West Canadian, Scandinavian and Caledonian thrust belts are similar in kind.

::: example How high does a doubled crust stand? {#ex-crustal-thickening}
The crust beneath Tibet is about $70\ \mathrm{km}$ thick against a normal $35\ \mathrm{km}$ beneath the Tarim basin. Take $\rho_c = 2800$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$. Predict the elevation difference, and compare it with the observed mean elevation of the Plateau ($4.7\ \mathrm{km}$).
::: solution
Equating the pressure at a compensation depth beneath both columns, with the Moho at depth $h_c - e$,
$$
(\rho_c - \rho_m)(h_1 - h_2) + \rho_m(e_1 - e_2) = 0 \Longrightarrow \Delta e = \frac{\rho_m - \rho_c}{\rho_m}\,\Delta h_c .
$$
With the numbers, $\Delta e = (500/3300)\times35 = 5.3\ \mathrm{km}$, against an observed $4.7\ \mathrm{km}$.

The simple Airy model over-predicts by about $10\%$, which is as good as crustal models get, and the residual is informative: it means the Tibetan lithosphere is slightly *less* dense than the simple model assumes — a thin, hot, partly foundered lithospheric root, or a crust with a low-density granitic composition and partial melt. It also means that if you double a crust you get most of a Tibet, which is why the elevation of a plateau is a barometer of crustal thickness and why the uplift of Tibet, the Altiplano and the Himalaya is recorded not only in the rocks but in the monsoon, in the carbon cycle and in the ice volume of the Northern Hemisphere ([[physical-geology/plate-tectonics]], [[palaeoclimate/deep-time]]).
:::
:::

## Orogens: where the deformation goes

Mountain belts are where the convergence budget is spent, and there are three end-member kinds, distinguished by what is being shortened and what is underneath it.

**Andean-type (arc) belts** form where oceanic lithosphere subducts beneath continental lithosphere: the crust is shortened, thickened, intruded by granites and heated, and the deformation is distributed over hundreds of kilometres. The Andes are the living example, and the Cretaceous interior of North America and the Palaeozoic of Australia are the fossil ones.

**Collisional belts** form when a continent meets a continent. Oceanic subduction cannot consume continental lithosphere, so convergence is taken up by stacking, by underthrusting of Indian crust beneath Tibet, and by escape of crust sideways along great strike-slip faults — the Altyn Tagh, Xianshuihe and Red River faults, moving tens of millimetres a year. India has converged with Asia by about $45\ \mathrm{mm\,yr^{-1}}$ for perhaps $50\ \mathrm{Myr}$, a total of some $2000\ \mathrm{km}$, and the sum of the mapped shortening in the Himalaya and Tibet accounts for only part of it: the rest is underthrust, or has been extruded eastwards, or is being taken up now.

**Accretionary belts** grow by adding material rather than by shortening what is there: slices of oceanic plateau, seamounts, island arcs and sediment prism are scraped off a subducting plate and stuck to the margin, in a process called **accretion** or **docking**. Much of the western North American Cordillera is a stack of such terranes, each with its own palaeomagnetic latitude, and the same process built much of the Palaeozoic of New Zealand and of the European Variscides.

All three are followed, when convergence stops or the plateau becomes too heavy, by **extension**: the Basin and Range province, the Aegean, the Tibetan grabens and the core complexes of the Colorado Plateau are all collapsing orogens, extending at rates comparable to the shortening that built them. A mountain belt is not a permanent feature; it is a transient, and its half-life against erosion is of order $10^8$ years.

::: warning "Folds and faults record the stress that made them"
They record the *failure*, and failure depends on the strength and orientation of pre-existing structures at least as much as on the stress. A fault that reactivates a Devonian plane of weakness at $40^\circ$ to the maximum shortening tells you almost nothing about the direction of $\sigma_1$ unless you allow for the reactivation; a fold's shape depends on the layering that was there before it folded; and a region's structure is a palimpsest of several events, with the youngest overprinting the earlier ones and the earlier ones surviving as inherited fabric. The discipline's central skill is **relative dating of structures** — cross-cutting, overprinting, inclusion, and the geometry of one fabric inside another — and only after that comes the inversion into stresses.
:::

::: quiz
A quartz vein is stretched into boudins with length $8\ \mathrm{cm}$ and gaps $4\ \mathrm{cm}$, and the boudins are separated by ductile mica. The extension direction is
- [ ] perpendicular to the boudin long axes
- [x] parallel to the boudin long axes
- [ ] cannot be determined
- [ ] at $45^\circ$ to the boudin long axes
::: solution
Boudins form by extension *along* the layer, so the stretching direction is parallel to the long axes of the boudins and to the layering. The stretch is $S = (8+4)/8 = 1.5$. The confusion arises because boudinage often accompanies folding, in which case the extension direction is *within* the shortening direction — the layer has been shortened overall but stretched along itself, which is exactly what happens when a competent bed buckles.
:::
:::

::: history
The problem of mountain structure was the great argument of nineteenth-century geology, and it was fought over one question: can rock move sideways for tens of kilometres? The "overthrust controversy" in the Scottish Highlands ran from the 1880s to about 1900, with the Geological Survey's Green and Lapworth on one side and the older vertical-tectonics school on the other; the mapping of the Moine and Ben More nappes settled it by matching the structure in the boreholes to the map. In Switzerland Albert Heim's monograph on the Glarus nappe (published in 1904 after decades of work) and Hans Schardt's identification of the same geometry in the Chablais made the Alps a thrust belt, and Eduard Suess's *Die Entstehung der Alpen* (1875) supplied the first quantitative treatment of crustal shortening. The mechanical underpinning came later and from the laboratory: Ernest Anderson's 1942 paper on faulting by internal friction gave the geometry of faulting its stress basis; John Byerlee's triaxial experiments (1968) produced the friction law that bears his name; and, decisively, the laboratory flow laws measured on wet and dry aggregates from the 1970s onward, which made it possible to say *why* the deep crust flows and to compute the strength of the crust that seismology then confirmed.
:::

## Where this leads

Stress and strain tensors, the Mohr circle and the strain ellipse are developed properly in [[structural-geology/stress]] and [[structural-geology/strain]]; the Coulomb criterion, fault rocks and the growth of faults in [[structural-geology/fractures-faults]]; folding mechanisms and cleavage in [[structural-geology/folds]]; ductile shear zones and their kinematic indicators in [[structural-geology/shear-zones]]; and the geometry of maps and balanced sections in [[structural-geology/maps-sections]]. The isostasy of [[#ex-crustal-thickening]] is treated with its flexure in [[geophysics/gravity-isostasy]] and [[geophysics/flexure]], and the use of deformed rocks as a record of orogeny in [[structural-geology/orogens]].

::: summary Key takeaways
- Differential stress deforms rock; lithostatic pressure does not. Both grow with depth, and their competition sets the style of deformation.
- Whether rock fractures or flows depends on strain rate as much as on temperature: the brittle–ductile transition shallows by a factor of $(10^3)^{1/n}$ in stress terms for a thousandfold faster deformation.
- Faults form at about $30^\circ$ to $\sigma_1$ by the Coulomb criterion, and Anderson's rule — which principal stress is vertical — predicts normal, strike-slip or thrust faulting from the stress field alone.
- Joints open perpendicular to $\sigma_3$ and are the permeability of most reservoirs; veins are dated samples of the fluid present at failure.
- Fold wavelength scales as $h(\eta_1/\eta_0)^{1/3}$, so a fold train records the thickness of the layer that buckled; shortening is measured by comparing bed length with section length.
- Ramp-flat thrust geometry links surface folds to deep ramps, makes cross-sections testable, and explains nappes, klippes and windows.
- Doubling a crust raises a plateau: $\Delta e = (\rho_m-\rho_c)\Delta h_c/\rho_m$, about $5\ \mathrm{km}$ for a $35\ \mathrm{km}$ thickening, close to Tibet.
- Structures record failure, not stress directly; relative dating of overprinting fabrics comes first, stress inversion second.
:::

## Exercises

::: exercise Lithostatic stress {level=1 check="135"}
Find the lithostatic stress at $5\ \mathrm{km}$ depth in rock of density $2750\ \mathrm{kg\,m^{-3}}$, in MPa.
::: solution
$\sigma = \rho g z = 2750\times9.81\times5000 = 1.35\times10^{8}\ \mathrm{Pa} = 135\ \mathrm{MPa}$. The useful mnemonic is $27\ \mathrm{MPa}$ per kilometre, or about $1\ \mathrm{kbar}$ per $3.7\ \mathrm{km}$.
:::
:::

::: exercise Strain {level=1 check="0.83"}
A pebble originally $3\ \mathrm{cm}$ long in one direction is now $5.5\ \mathrm{cm}$. Find the engineering strain (enter this one) and the natural strain.
::: solution
$e = (5.5-3)/3 = 0.83$; $\varepsilon = \ln(5.5/3) = 0.61$. The two measures differ by a third at this strain, which is why structural geologists state which one they are using; for small strains they coincide.
:::
:::

::: exercise Anderson's rule {level=1 check="27"}
For a Coulomb friction coefficient of $0.75$, at what angle to $\sigma_1$ does a new fault form?
::: solution
The failure plane makes an angle $45^\circ - \varphi/2$ with $\sigma_1$, where $\varphi = \arctan\mu = 36.9^\circ$:
$$
\theta = 45^\circ - 18.4^\circ = 27^\circ ,
$$
so the fault plane lies $27^\circ$ from $\sigma_1$ and $63^\circ$ from $\sigma_3$, and the conjugate pair is symmetric about $\sigma_1$. With $\sigma_1$ vertical this gives faults dipping $63^\circ$ — normal faults — and with $\sigma_3$ vertical, dips of $27^\circ$, which is why thrusts are low-angle. Observed dips of $55$–$65^\circ$ for normal faults and $20$–$35^\circ$ for thrusts are the reason $\mu \approx 0.75$ is accepted.
:::
:::

::: exercise Reactivation {level=2 check="4.1"}
A fault dips $30^\circ$ in rock with $\mu = 0.75$ and zero cohesion. Show that it cannot be reactivated as a normal fault for any stress ratio, and find the ratio $\sigma_1/\sigma_3$ needed to reactivate it as a thrust. (Enter the thrust value.)
::: solution
With $\beta$ the angle between the fault's normal and $\sigma_1$, the frictional failure criterion $\tau = \mu\sigma_n$ rearranges to
$$
\frac{\sigma_1}{\sigma_3} = \frac{D+\mu}{D-\mu}, \qquad D = \sin 2\beta - \mu\cos 2\beta .
$$
As a *normal* fault ($\sigma_1$ vertical, fault dipping $30^\circ$) the plane's normal makes $\beta = 30^\circ$ with $\sigma_1$, so $D = 0.866 - 0.375 = 0.49 < \mu$ and the ratio comes out negative: no finite horizontal extension can slip this fault, which will instead break a new plane at $60^\circ$. As a *thrust* ($\sigma_3$ vertical) the normal makes $\beta = 60^\circ$, $D = 0.866 + 0.375 = 1.24$, and
$$
\frac{\sigma_1}{\sigma_3} = \frac{1.24+0.75}{1.24-0.75} = 4.1 .
$$
This is the whole content of "inherited structure controls the map pattern": a crust full of $30^\circ$ thrusts can be shortened again along the same planes at the minimum possible stress, but cannot be extended along them at all, and will instead develop new $60^\circ$ normal faults that cut the old ones — which is exactly the cross-cutting relationship used to establish the relative order of extensional and contractional events in a orogen.
:::
:::

::: exercise Boudinage {level=2 check="2.2"}
Dolomite boudins in a shale matrix are $6\ \mathrm{cm}$ long with gaps of $7.2\ \mathrm{cm}$. Find the stretch and the engineering strain of the layer.
::: solution
$S = (l+t)/l = (6+7.2)/6 = 2.2$, so the engineering strain is $e = S - 1 = 1.2$, or $120\%$, and the natural strain is $\ln 2.2 = 0.79$. A layer that has been stretched to more than twice its length while the whole rock may have been *shortened* overall: boudinage is extension along the layer, and in a folded terrain that direction is commonly the shortening direction.
:::
:::

::: exercise Fold wavelength {level=2 check="2.2"}
Two generations of folds in the same limb differ in wavelength by a factor of 2.2, with the same viscosity contrast. What is the ratio of the competent-layer thicknesses, and what does that imply if the two generations are in the same bed?
::: solution
$L \propto h^{1/3}$, so $h_2/h_1 = 2.2^3 = 10.6$. A tenfold difference in layer thickness — or a tenfold difference in the viscosity ratio, since $L \propto (\eta_1/\eta_0)^{1/3}$ as well. If both fold generations are in the same bed, then the layer did not change thickness, so the viscosity contrast must have changed: the bed or its matrix was coarser, wetter or hotter during one of the two events. That is a real interpretation, and it is how polyphase deformation is untangled in the field.
:::
:::

::: exercise Deriving Anderson's rule {level=3}
Starting from the resolved tractions on a plane, derive the Coulomb failure angle and the expression for the differential stress at failure,
$$
\sigma_1 = \sigma_3\,\frac{1+\sin\varphi}{1-\sin\varphi} + \frac{2\tau_0\cos\varphi}{1-\sin\varphi},
$$
where $\varphi = \arctan\mu$ is the angle of internal friction. Evaluate the ratio $\sigma_1/\sigma_3$ for $\mu = 0.75$ and zero cohesion, and explain why thrust faults can reactivate at dips far from $30^\circ$.
::: solution
Write $\sigma_n$ and $\tau$ in terms of $\theta$, impose $\tau = \tau_0 + \mu\sigma_n$, and differentiate with respect to $\theta$ to find the failure orientation $\theta = 45^\circ + \varphi/2$ measured from $\sigma_1$. Substituting back and using $\mu = \tan\varphi$ gives the quoted relation; with $\tau_0 = 0$ and $\mu = 0.75$ ($\varphi = 36.9^\circ$),
$$
\frac{\sigma_1}{\sigma_3} = \frac{1+\sin 36.9^\circ}{1-\sin 36.9^\circ} = \frac{1.6}{0.4} = 4 .
$$
So a crust under a vertical load of $135\ \mathrm{MPa}$ at $5\ \mathrm{km}$ can support a horizontal differential stress of only about $340\ \mathrm{MPa}$ before normal faulting, and needs $540\ \mathrm{MPa}$ to be shortened.

Thrusts are observed at dips of $5^\circ$–$20^\circ$, far from the predicted $30^\circ$, for four reasons that are all in the equation: pore pressure (raising $\lambda$ lowers the effective $\sigma_n$ and permits low-angle failure), high fluid pressure at the base of nappes, low cohesion combined with reactivation of a very weak layer such as shale or evaporite, and dynamic support from the weight of the advancing wedge. Detachment faults at $10^\circ$ are the reason the "weak fault" problem and the "strong crust" problem are the same problem, and why fluids are usually the answer.
:::
:::

::: exercise A balanced cross-section {level=3}
A thrust sheet is mapped over $30\ \mathrm{km}$ of section. Its floor thrust is horizontal at $8\ \mathrm{km}$ depth, ramps from $8\ \mathrm{km}$ to $2\ \mathrm{km}$ depth over $10\ \mathrm{km}$ of horizontal distance, and is flat again beyond. The hanging-wall bed is horizontal at the surface and $2\ \mathrm{km}$ below it. Find the shortening contributed by this ramp, and the slip on the thrust needed to produce it.
::: solution
A ramp that rises $\Delta z = 6\ \mathrm{km}$ carries its hanging wall up the same amount, and the horizontal shortening equals the horizontal distance over which the ramp is crossed *minus* the horizontal distance the hanging wall has advanced relative to the footwall. For a ramp of dip $\alpha$ the shortening per unit slip is $\cos\alpha$ and the uplift is $\sin\alpha$, so with slip $s$ the uplift is $s\sin\alpha = 6\ \mathrm{km}$ and the shortening is $s\cos\alpha$.

The ramp's dip is $\arctan(6/10) = 31^\circ$, so $s = 6/\sin 31^\circ = 11.6\ \mathrm{km}$ and the shortening is $11.6\cos 31^\circ = 9.9\ \mathrm{km}$ — that is, the shortening equals the horizontal extent of the ramp, as it must. The exercise is the whole method of balancing sections: measure the geometry, and the slip and the shortening follow from trigonometry; if the bed lengths do not close, the interpretation is wrong, and the discrepancy tells you how much structure you have missed.
:::
:::

::: exercise The budget of a collision {level=3}
India has converged with Asia at a mean $45\ \mathrm{mm\,yr^{-1}}$ for $50\ \mathrm{Myr}$. Mapped shortening in the Himalaya is $800\ \mathrm{km}$, in Tibet $400\ \mathrm{km}$, and crustal thickening beneath Tibet accounts for a horizontal equivalent of $300\ \mathrm{km}$. Find the unaccounted shortening, and list the ways it can be taken up. How would you test each?
::: solution
Total convergence $= 45\times10^{-3}\times5\times10^{7} = 2250\ \mathrm{km}$. Accounted: $800+400+300 = 1500\ \mathrm{km}$. Unaccounted: $750\ \mathrm{km}$, a third of the budget.

Four candidates, each testable. (i) **Underthrusting of Indian crust** beneath Tibet, tested by deep seismic reflection and by the tomographic imaging of the Indian lithosphere in the upper mantle. (ii) **Eastward extrusion** along the great strike-slip faults, tested by geodesy (a few millimetres per year on each fault) and by the offset of markers. (iii) **Erosion of the orogen**, which removes mass rather than shortening it, tested by sediment budgets in the Bengal and Indus fans — of order $10^9\ \mathrm{t\,yr^{-1}}$ at present, and much larger in the past. (iv) **Out-of-section rotation** and vertical-axis block rotation, tested by palaeomagnetism, which has documented rotations of tens of degrees in Tibet. The point of the exercise is that a structural budget, like a carbon budget, is only as good as its closure — and that a $30\%$ discrepancy is not a failure but the research programme.
:::
:::
