A hillslope is the part of the landscape where the rock is being moved downhill and nothing is being cut down: it is the diffusive element of topography, and it is the reason that mountains have slopes rather than cliffs and that a fault scarp, given time, becomes a smooth gradient. The quantitative study of hillslopes is the oldest and, in its diffusion model, the most successful part of quantitative geomorphology — and its central discovery is that the answer depends on whether the slope is covered with soil.

## Diffusion and its limits

::: definition The linear diffusion model {#def-diffusion}
On a **soil-mantled, transport-limited** hillslope the soil flux per unit width is proportional to the local gradient,
$$
\mathbf{q}_s = -K\,\nabla z ,
$$
with $K$ in $\mathrm{m^2\,yr^{-1}}$, and conservation of mass gives
$$
\frac{\partial z}{\partial t} = K\,\nabla^2 z + U ,
$$
where $U$ is the rate at which bedrock is converted to soil at the base. This is the **linear diffusion equation**, and it says that a hillslope profile smooths itself the way heat does. Its solutions are the reason that a fault scarp degrades into a bell curve, that a convex ridge crest rounds off, and that a hilly topography decays toward a peneplain at a rate set by $K$ and by the relief. Typical values of $K$ for soil-mantled slopes in temperate and arid mountains are $10$–$1000\ \mathrm{m^2\,yr^{-1}}$, measured from deformed ground surfaces of known age, from cosmogenic nuclides, or from the steady-state relation between $K$, the relief and the denudation rate.
:::

::: definition The scarp solution {#def-scarp}
A fault scarp of initial vertical offset $h_0$ and zero initial width degrades under pure diffusion into the error-function profile
$$
z(x,t) = \frac{h_0}{2}\,\mathrm{erfc}\!\left(\frac{x}{2\sqrt{Kt}}\right),
$$
whose **maximum slope** is
$$
\left.\frac{\partial z}{\partial x}\right|_{x=0} = \frac{h_0}{\sqrt{\pi K t}}
$$
and whose width between the 10 and 90 per cent points is $1.82\sqrt{Kt}$. Measuring the present maximum slope of a scarp whose offset is known from a trench gives $Kt$, and with $K$ known from an independent scarp of known age, it gives the **age of the faulting event**. This is the method of the classic fault-scarp chronologies of the Basin and Range, Italy and New Zealand, and it is one of the few ways to date individual prehistoric earthquakes.
:::

::: example Dating a fault scarp {#ex-scarp}
Trenching across a normal fault shows a cumulative vertical offset of 4.0 m from the most recent three events, the youngest of which degraded the surface now measured. The scarp's present maximum surface slope is 0.45. Take $K = 0.01\ \mathrm{m^2\,yr^{-1}}$ and find the age of the youngest event. Then explain why the answer is an upper bound.
::: solution
From the maximum-slope relation,
$$
\sqrt{\pi K t} = \frac{h_0}{s} = \frac{4.0}{0.45} = 8.89\ \mathrm{m}, \qquad
Kt = \frac{79.0}{\pi} = 25.2\ \mathrm{m^2}, \qquad
t = \frac{25.2}{0.01} = 2500\ \mathrm{yr}.
$$
The youngest event is therefore about **2500 years old**.

The answer is an upper bound for four reasons, and all four push the age older rather than younger. The diffusion model **breaks down when the slope exceeds the angle of repose** of the soil, which for a fresh 4-m scarp it certainly does: the first centuries of degradation are dominated by dry ravel, block-toppling and shallow landsliding at the crest, which are much faster than diffusion, so the model applied to a young scarp over-estimates $Kt$ and therefore the age. The scarp's offset is **not all from one event** — the trench shows three — and if part of the 4 m was inherited and already degraded, the effective $h_0$ for the youngest event is smaller and the age is younger. The $K$ value is **borrowed** from another site, and $K$ varies by an order of magnitude with the climate, the soil thickness and the vegetation. And the surface may have been **biologically and agriculturally reworked**, which flattens the scarp and makes it look older. The method's honest output is an age with a factor-of-two uncertainty, and its best applications are to scarps in undisturbed arid ground with a $K$ calibrated on independently dated surfaces.
:::
:::

::: widget plot
f: 0.5*(1-erf(x/(2*sqrt(25))))
x: -60, 60
y: -0.05, 1.05
labels: \text{scarp profile}
caption: The diffused profile of a fault scarp of unit height, $z = \tfrac{1}{2}\,\mathrm{erfc}(x/2\sqrt{Kt})$, drawn for $Kt = 25\ \mathrm{m^2}$. The original vertical face has become a smooth S whose width between the 10 and 90 per cent points is $1.82\sqrt{Kt} = 9.1\ \mathrm{m}$ and whose maximum slope is $1/\sqrt{\pi K t} = 0.11$. The profile is drawn for a scarp whose height is conserved: pure diffusion conserves mass, so the sediment is not lost from the section but merely spread out, and a real scarp that sheds fines into a channel or that is truncated by a later fault does not obey this. The same curve describes a diffusing soil-mantled ridge crest, a degraded moraine, a buried channel belt and the topographic expression of a dyke, which is why the method is used to date any of them.
:::

## The two limits and the slope–area law

::: definition Detachment and transport limits {#def-two-limits}
A **soil-mantled** hillslope is **transport limited**: the soil production rate exceeds the removal rate, a thick mantle exists, and the flux is set by the transport law — diffusion, or a nonlinear law that allows the flux to diverge as the slope approaches the angle of repose. A **bedrock** hillslope is **detachment limited**: the removal capacity exceeds the rate at which the rock can be detached, the mantle is thin or absent, and the erosion rate is set by the weathering or the plucking rate. The two behave in opposite ways. A transport-limited slope steepens until the flux balances the production, and its **gradient increases with the local incision rate**. A detachment-limited slope's gradient is set by the rock's strength and by the incision law, and it too steepens with incision — which is why the two cannot be told apart from a single slope measurement and require the regolith, the cosmogenic nuclide concentration, or the bedrock exposure.
:::

::: proposition The slope–area relation {#prop-slope-area}
A steady-state, uniform-lithology, detachment-limited river profile obeys
$$
S = k_s\,A^{-\theta}, \qquad \theta = \frac{m}{n},
$$
where $S$ is the channel gradient, $A$ the drainage area, and $m$ and $n$ the exponents of the stream-power incision law $E = K_u A^m S^n$. A log–log plot of gradient against area is therefore a straight line whose **concavity** $\theta$ is diagnostic of the incision mechanism and whose **steepness** $k_s$ is diagnostic of the rock, the climate and the uplift. The observed values are $\theta \approx 0.4$–$0.5$ for many mountain rivers, and the **channel-head threshold** — the point at which a hillslope gives way to a channel — occurs where the product $S A^{0.4}$ exceeds a critical value that is a property of the soil and the climate.
:::

::: example From hillslope to channel {#ex-slopearea}
A mountain catchment's channel network gives $S = 0.02$ at a drainage area of $1\ \mathrm{km^2}$ and follows a concavity of $\theta = 0.45$. Find the gradient at $100\ \mathrm{km^2}$ and at $10\,000\ \mathrm{km^2}$. Then find the gradient at the channel head if the channel heads lie at $A = 2\times10^{4}\ \mathrm{m^2}$, and say what the result means.
::: solution
$$
A = 100\ \mathrm{km^2}:\quad S = 0.02\times100^{-0.45} = 0.02\times0.126 = 0.0025;
$$
$$
A = 10\,000\ \mathrm{km^2}:\quad S = 0.02\times10\,000^{-0.45} = 0.02\times0.0159 = 0.00032 .
$$
The gradient falls by a factor of 63 over four orders of magnitude of area, which is the **concavity** that makes a long profile a smooth concave-up curve rather than a straight line.

At the channel head, $A = 2\times10^{4}\ \mathrm{m^2} = 0.02\ \mathrm{km^2}$, and
$$
S = 0.02\times0.02^{-0.45} = 0.02\times5.82 = 0.12 .
$$
A gradient of 0.12 is 12 per cent, or 7 degrees — a steep, bouldery rill. The observation that channel heads occur at a **nearly constant gradient** of 0.1–0.4, or equivalently at a nearly constant value of $S A^{0.4}$, is the field signature of a **threshold**: the hillslope above the head can carry its water and its soil without incising, and at the head the combination of the gradient, the contributing area and therefore the subsurface water pressure first exceeds what the soil can hold. The consequence is that the **drainage density** — the total channel length per unit area — is set by the threshold, and that a wetter or weaker-soil climate has a higher threshold-satisfying area, more channel heads, a denser network and a more dissected landscape.
:::
:::

::: history
Hillslope studies begin with the **hillslope-contour debate** of the 1880s, in which Davis (Davis) proposed that a landscape passes through a youthful, mature and senile cycle of erosion and that slopes steepen and then retreat, and in which Savigny and Penck (Penck) replied that slopes retreat in parallel. Penck's parallel retreat, published in 1914 in his **Alpine Vergletschung** and in the morphology of the Alps, and Davis's cycle together set the terms of the subject for fifty years. The diffusion model was introduced independently by **Gilbert** (Gilbert) in 1909, who wrote the flux as proportional to the gradient in his study of the Michigan shore, and by **Fahn** and **Ludwik** in the 1950s, and it was formalised by **Culling** (Culling) in 1963 and by **Sloan** and **Kirkby**; Howard's (Howard) 1967 paper on the diffusion of a ridge and the calibration of $K$ from a till plateau is the founding quantitative study. The nonlinear, angle-of-repose-limited law is the work of **Kirkby**, of **Carson** and of **Hanks and Schubert**, and its modern form is due to **Andrews and Hanks** (Hanks) in the fault-scarp context. The fault-scarp diffusion dating method is the development of **Bonilla, Borrego, Ray, Sharp, Wallace and Wells** (Wallace) in the 1960s and 1970s on the Basin and Range faults, of **Cowles, Machette** and of **Ellis, Stock, Harkins** in Italy and New Zealand. The **stream-power incision law** and the slope–area analysis are the work of **Howard, Seidl, Dietrich, Whipple, Kirby and Lea** (Lea) in the late 1980s and 1990s, and the channel-head threshold is the synthesis of **Montgomery and Dietrich** (Dietrich) in 1988 and 1992. The **soil production function** and the kinetically versus transport-limited dichotomy are the work of **Heimsath, Dietrich, Nishiizumi and Finkel** (Finkel) in 1997.
:::

::: example The flux that diverges {#ex-nonlinear}
A soil-mantled slope has $K = 200\ \mathrm{m^2\,yr^{-1}}$ and an angle of repose of $30^\circ$ ($\tan\theta_r = 0.577$). Using the nonlinear law
$$
q_s = \frac{K\,\nabla z}{1 - (\nabla z/\tan\theta_r)^2},
$$
find the soil flux per unit width at gradients of 0.2, 0.4 and 0.55, and compare with the linear law.
::: solution
$$
\begin{array}{lccc}
\nabla z & \text{linear } q_s\ (\mathrm{m^2\,yr^{-1}}) & \text{nonlinear } q_s & \text{ratio} \\ \hline
0.20 & 40 & 45 & 1.1 \\
0.40 & 80 & 154 & 1.9 \\
0.55 & 110 & 1204 & 10.9
\end{array}
$$
At a gradient of 0.2 the two laws differ by ten per cent and the linear law is safe. At 0.4 they differ by a factor of two. At 0.55, which is 95 per cent of the tangent of the angle of repose, the nonlinear flux is **eleven times** the linear one and is on the point of diverging.

The consequence is a fundamental one about how landscapes respond. Under the linear law a slope can steepen indefinitely and the flux rises only proportionally, so a doubled incision rate gives a doubled gradient. Under the nonlinear law the flux rises **faster than the gradient**, so a slope need steepen only a little to carry a much larger flux, and near the angle of repose a small steepening releases an enormous flux — which in reality means that the slope fails. The nonlinear law therefore predicts what every mountain range shows: that the maximum hillslope gradient in a range is **bounded** near the angle of repose of the local material, that the range's mean relief is set by the spacing of its valleys rather than by its slopes, and that the flux from a range is controlled by how much of its area is at the critical gradient rather than by how steep its average slope is.
:::
:::

::: example A retreating escarpment {#ex-escarpment}
A 200-m-high sandstone escarpment, 8 km long, retreats in parallel by scarp-face weathering and debris ravel at 6 mm/yr of retreat. Find the volumetric and mass sediment flux, and find the thickness of the talus apron it builds if the debris spreads over a 2-km-wide wedge. What does the apron record?
::: solution
The volumetric flux is
$$
0.006\ \mathrm{m\,yr^{-1}}\times200\ \mathrm{m}\times8000\ \mathrm{m} = 9600\ \mathrm{m^3\,yr^{-1}},
$$
and at a bulk density of $2.2\ \mathrm{Mg\,m^{-3}}$ the mass flux is
$$
9600\times2200 = 2.1\times10^{7}\ \mathrm{kg\,yr^{-1}} = 21\,000\ \mathrm{t\,yr^{-1}} .
$$
Spread over an apron $2\ \mathrm{km}\times8\ \mathrm{km} = 1.6\times10^{7}\ \mathrm{m^2}$, the accumulation rate is
$$
\frac{9600}{1.6\times10^{7}} = 6\times10^{-4}\ \mathrm{m\,yr^{-1}} = 0.6\ \mathrm{mm\,yr^{-1}},
$$
which builds a 60-m-thick apron in 100 kyr.

The apron is the **archive of the escarpment's retreat**. If the escarpment has retreated 12 km from its original position at 6 mm/yr, the retreat took $12\,000/0.006 = 2\ \mathrm{Myr}$, and the apron beneath and in front of the escarpment should be about 2 Myr old at its base, should thicken toward the escarpment, and should fine and thin away from it. The three tests of the parallel-retreat model are therefore: that the escarpment's **height is constant** along its length (because it retreats without lowering), that the apron's **age increases away from the escarpment** in proportion to the distance, and that the escarpment's **length shrinks** as it is consumed from the ends. Where the height is not constant, or where the apron is absent because the rivers carry the debris away, the model fails and the escarpment is being lowered rather than retreated — which is the behaviour of a wet, fluvially dissected scarp rather than of an arid one.
:::
:::

## The processes and the debate

::: definition Hillslope processes {#def-processes}
**Soil creep** is the slow downslope movement of the soil, driven by the downslope component of gravity acting on a material whose viscosity is lowered by wetting, drying, freezing and bioturbation; the classic mechanism is the **rate-process law** of Godson and Morgan (Morgan), in which each wetting, drying or freeze–thaw cycle adds a small irreversible strain. Measured creep velocities are 1–50 mm/yr at the surface and fall exponentially with depth. **Bioturbation** — earthworms, ants, moles, roots, burrows and the turning of soil by tree throw — mixes the profile and drives it downslope on a gradient, and in many temperate and tropical landscapes it dominates the physical creep by an order of magnitude. **Solifluction** is the downslope flow of water-saturated soil over an impermeable or frozen layer, at 10–100 mm/yr, and it builds the lobes of periglacial terrain. **Soil erosion** by raindrop impact, sheet and rill flow, and gully incision is the process that agriculture has accelerated by one to two orders of magnitude. **Mass wasting** — landslides, debris flows, rockfalls and earthflows — is the process that carries the material past the strength limit of the slope, and it is treated in [[natural-hazards/landslides]].
:::

::: warning The hillslope–climate debate was never really settled, and both sides were right
The argument between Penck (Penck), who held in 1914 that a slope's form records the **age** of the surface under a process regime fixed at the outset, and the climatic school of Troll and Budel (Budel), who held that it records the **climate** under which it was shaped, was declared closed in favour of the climatic school by the tropical geomorphologists, who found different slope forms in different climates on surfaces of the same age. It was reopened by the quantitative school of the 1960s and 1970s — Howard, Luke, Kirkby and Young — who showed that a diffusion model with a constant $K$ produces slope forms that are **indistinguishable** from the climatic types, and that the same morphology can be produced by a young wet slope or an old dry one. Both readings survive because both mechanisms operate and their products are geometrically similar. The modern resolution is not to choose but to **date the surface**: with a cosmogenic exposure age, a cosmogenic catchment-averaged denudation rate, or a dated stratum sealed beneath the slope, the ambiguity collapses, and the answer in most well-dated cases is that the slope records a **combination** — a form inherited from a periglacial past, modified by an interglacial present, and dissected by a Holocene base-level fall. The lesson generalises to the whole of geomorphology: **a landform's shape is not a measurement of the process that made it until the landform has been dated**, and the discipline's history is largely the history of that caution.
:::

::: quiz
A hillslope carries a 2-m soil, has a convex-up profile, and gives a cosmogenic nuclide concentration that is low for its latitude. What limits its erosion?
- [x] The transport capacity: it is transport limited, and the flux is set by the transport law.
- [ ] The weathering rate: it is detachment limited.
- [ ] The channel at its base: it is a bedrock channel.
- [ ] Nothing; it is not eroding.
::: solution
A thick soil means the weathering front produces regolith faster than the slope removes it, and a low nuclide concentration means the surface has been shielded by soil for a long time — both are the signature of a transport-limited slope. Its erosion rate is set by the transport law and the gradient, and it will respond to an increase in incision by steepening rather than by thinning.
:::
:::

## Where this leads

The weathering that supplies the soil is in [[geomorphology/weathering]] and the soil itself is in [[geomorphology/soils]], the rivers that cut the valleys between the slopes are in [[geomorphology/rivers]] and the basins they drain are in [[geomorphology/drainage-basins]], the landslides are in [[natural-hazards/landslides]], the flexure that sets the boundary conditions is in [[geophysics/flexure]], and the sediment budget of the whole system is in [[sedimentology/basins-sequences]].

::: summary
- A soil-mantled hillslope behaves as a diffusing medium, with a flux proportional to the gradient and a diffusivity of 10–1000 m²/yr.
- A fault scarp degrades into an error-function profile whose maximum slope is $h_0/\sqrt{\pi K t}$, which is how prehistoric earthquakes are dated.
- A slope is transport limited if it carries soil and detachment limited if it is bare, and the two respond differently to a change in incision.
- A steady river profile follows $S = k_s A^{-\theta}$ with $\theta \approx 0.45$, and channel heads occur at a threshold in $S A^{0.4}$.
- Creep, bioturbation, solifluction, erosion and mass wasting are the agents, and bioturbation is commonly the fastest.
- A slope's form records both its climate and its age, and the two cannot be separated without dating the surface.
:::

## Exercises

::: exercise Diffusion scaling {level=1 check="2.7"}
A scarp with $Kt = 9\ \mathrm{m^2}$ has a maximum slope of 0.5. What was its original offset?
::: solution
$h_0 = s\sqrt{\pi K t} = 0.5\times\sqrt{28.3} = 0.5\times5.32 = 2.7\ \mathrm{m}$.
:::
:::

::: exercise Scarp width {level=1 check="9.1"}
With $Kt = 25\ \mathrm{m^2}$, what is the width of a diffused scarp between its 10 and 90 per cent points?
::: solution
$1.82\sqrt{Kt} = 1.82\times5 = 9.1\ \mathrm{m}$. The scarp's visible expression is a 9-m-wide ramp, and a survey line across it will not resolve the fault trace itself.
:::
:::

::: exercise Slope–area {level=1 check="0.005"}
A river follows $S = k_s A^{-0.5}$ with $k_s$ such that $S = 0.02$ at $A = 1\ \mathrm{km^2}$. Find $S$ at $16\ \mathrm{km^2}$.
::: solution
$S = 0.02\times16^{-0.5} = 0.02/4 = 0.005$. Each fourfold increase in area halves the gradient when $\theta = 0.5$.
:::
:::

::: exercise Angle of repose {level=2}
The linear diffusion law predicts that the soil flux increases without limit as the gradient rises. What is the physical limit, and what law replaces the linear one near it?
::: solution
The limit is the **angle of repose** $\theta_r$ of the soil, at which the downslope component of gravity equals the frictional resistance and the slope fails. The nonlinear law that replaces the linear one is
$$
q_s = \frac{K\,\nabla z}{1 - (\nabla z/\tan\theta_r)^2},
$$
which is identical to the linear law at low gradients and diverges as the gradient approaches the tangent of the angle of repose. Its consequence is that a steep convex hillslope develops a **cliff** rather than an arbitrarily steep soil profile, that the model produces the sharp break between the soil-mantled slope and the bedrock scarp that the linear law cannot, and that the steady-state profile of a mountain range is bounded in gradient by the rock's or the soil's friction rather than by the diffusivity.
:::
:::

::: exercise Creep {level=2 check="2.6"}
A soil creep velocity at the surface is 6 mm/yr and falls exponentially with a decay depth of 0.5 m. For a 1-m-thick soil, find the depth-averaged velocity in mm/yr.
::: solution
The depth-averaged velocity over a thick profile is the surface value times the decay depth divided by the depth, so for a 1-m profile
$$
\bar{v} = \frac{v_0 d}{H}\left(1 - e^{-H/d}\right) = \frac{6\times0.5}{1}\left(1 - e^{-2}\right) = 3\times0.865 = 2.6\ \mathrm{mm\,yr^{-1}} .
$$
The volumetric flux per unit width is $2.6\times10^{-3}\times1 = 2.6\times10^{-3}\ \mathrm{m^2\,yr^{-1}}$, and the equivalent denudation rate is $2.6\ \mathrm{mm\,yr^{-1}}$ of soil. This is an order of magnitude faster than most soil-mantled catchments deliver, which is why creep measured in a pit near the surface cannot be added up into a catchment denudation rate: the deep, slow part of the profile does most of the work and the fast surface part is a small fraction of the flux.
:::
:::

::: exercise The diffusion time of a ridge {level=1 check="16200"}
A sinusoidal ridge train has a wavelength of 4 km and a diffusivity of $25\ \mathrm{m^2\,yr^{-1}}$. The amplitude of a sinusoid decays as $\exp[-K(2\pi/\lambda)^2 t]$. Find the time for the amplitude to fall to $1/e$.
::: solution
$t = \lambda^2/(4\pi^2 K) = 1.6\times10^{7}/(39.5\times25) = 1.6\times10^{7}/987 = 16\,200\ \mathrm{yr}$. A 4-km ridge train is smoothed away by diffusion in sixteen thousand years, which is nothing on a geological timescale. The survival of relief therefore requires that incision keeps re-creating it faster than diffusion destroys it, and the ratio of the incision rate to $K/\lambda^2$ is the dimensionless number that decides whether a landscape is diffusive or youthful.
:::
:::

::: exercise A steady-state slope {level=3}
A soil-mantled divide has a relief of 120 m between a ridge crest and a valley floor 800 m away, a diffusivity $K = 200\ \mathrm{m^2\,yr^{-1}}$, and a uniform denudation rate $U$ at the base. Find the steady-state maximum gradient and the denudation rate, and say what happens if the river incision doubles.
::: solution
For a steady-state one-dimensional divide with uniform production, the half-width $L = 800\ \mathrm{m}$ carries a flux $q = U L$ per unit width at the valley, and with $q = K\,S$ the gradient at the valley is
$$
S = \frac{U L}{K}.
$$
The steady-state profile is a parabola whose crest-to-valley relief is $h = U L^2/(2K)$, so
$$
U = \frac{2Kh}{L^2} = \frac{2\times200\times120}{800^2} = \frac{48\,000}{640\,000} = 0.075\ \mathrm{m\,yr^{-1}} = 75\ \mathrm{mm\,yr^{-1}},
$$
and the maximum (valley) gradient is
$$
S = \frac{0.075\times800}{200} = 0.30 \quad (17^\circ).
$$
A denudation rate of 75 mm/yr is far above any measured for a soil-mantled landscape — the world's fastest-eroding mountains reach 10–20 mm/yr — so the system **cannot be at steady state with this $K$**. Either the diffusivity is much larger, or the relief is inherited from a wetter and more erodible past, or the slopes are failing by landsliding, which the diffusion law does not represent.

If the river incision doubled, the model predicts that the slopes would steepen to carry the doubled flux, that the gradient would rise to 0.60 (31 degrees), and that this would exceed the angle of repose — so the slopes would **fail**, the channels would be fed by landslides, and the effective transport law would be the landslide rate rather than the creep law. This is the observed behaviour of wet mountain ranges, and it is why the diffusion model works in the dry and semi-arid ranges and fails in the very wet ones.
:::
:::

::: exercise A landscape that is not in equilibrium {level=3}
A dissected plateau in a temperate region carries three surfaces: a flat upland at 620 m with a 3-m deeply leached soil; a bench at 480 m with a 1-m soil and a lag of vein quartz; and a modern valley floor at 300 m incised into the same bedrock. Cosmogenic nuclide concentrations in the upland soil give a denudation rate of 6 µm/yr and in the bench 40 µm/yr. Interpret.
::: solution
The three surfaces are a **flight of strath or weathering-surface terraces** recording a **dissection history**, and the denudation rates date them. The upland at 620 m, with its 3-m leached soil and its low denudation rate of 6 µm/yr, is an **ancient, near-steady, low-relief weathering surface** — a **pediment** or **etchplain** — on which the rock has been weathering in place for millions of years at a rate that keeps the mantle thin. The bench at 480 m, with its thinner soil, its quartz lag and its denudation rate seven times higher, is a **younger, actively dissecting surface** — the former upland, now truncated by the retreating escarpment and being stripped. The valley floor at 300 m is the **modern base level**, and the 320 m of incision between the upland and the valley is the amount of dissection that has happened since the upland surface was formed.

The interpretation is a **transient, migrating escarpment**: the upland is being consumed from below, the escarpment retreats headward at a rate set by the incision at its base, and the bench is the debris of the retreat. The denudation rates are consistent: the upland is in the low-rate "weathering-limited" state and the escarpment and bench in the high-rate "transport-limited" state, and the mean rate over the whole catchment lies between them.

The weakest link is the assumption that the upland's 6 µm/yr is a **long-term average**. A cosmogenic nuclide concentration averages the last few tens of thousands of years, and if the upland has only recently been isolated by the escarpment's retreat, its low rate may be a young feature rather than a proof of great antiquity. The test is the **cosmogenic depth profile**: a surface that has been stable for millions of years has a nuclide concentration that falls exponentially with depth with the production attenuation length, whereas a surface that was stripped of its mantle 20 kyr ago has a depleted profile that has not yet recovered.
:::
:::
