A landscape is a solution to a system of equations in which rock uplift, climate, rock strength and time are the parameters — a solution that may be steady, may be migrating, or may not exist. The last thirty years have turned the study of landform evolution from a **historical** discipline, which asked how a particular valley got its shape, into a **predictive** one, which asks what shape a given uplift and rainfall field must produce and what the landscape's deviation from that shape reveals. The tools are a small number of rate laws, three isotope systems, and the recognition that most landscapes are not in the state their forms suggest.

## Rate laws and steady state

::: definition The stream-power incision law {#def-stream-power}
Bedrock-channel incision is written as a power law in drainage area and slope,
$$
E = K\,A^{m}\,S^{n},
$$
where $A$ is the upstream area (a proxy for the flood's competence and for the tool supply), $S$ the channel slope, $n \approx 1$ (the incision is roughly proportional to the stream power per unit bed area), $m \approx 0.2$–$0.6$, and $K$ a coefficient that lumps the rock strength, the climate, the channel width and the tools. A channel at **steady state** with a uniform uplift rate $U$ has $E = U$ everywhere, so
$$
S = \left(\frac{U}{K}\right)^{1/n} A^{-m/n},
$$
and a log-log plot of slope against drainage area is a **straight line of gradient $-\theta$**, where $\theta = m/n$ is the **concavity**. Deviations from the straight line are the whole of the method: a **knickpoint** is a break in the line, and it records a change in $U$, in $K$ or in the base level that has not yet propagated upstream.
:::

::: definition Steady state, dynamic equilibrium and the graded profile {#def-steady-state}
A landscape is in **steady state** when its form is constant in time, so that the local denudation rate equals the local rock-uplift rate everywhere. It is in **dynamic equilibrium** when the form fluctuates about a mean that is constant — the condition of a real landscape, whose form is set by the balance between the **rate of work done by the flows** and the **rate at which the boundary conditions supply potential energy**. A **graded river** is the fluvial case: a profile whose slope is just steep enough to transport the sediment supplied to it, so that neither degradation nor aggradation occurs. A **critical taper** is the wedge case: a fold-and-thrust belt or an accretionary prism whose surface slope $\alpha_c$ adjusts so that the driving and resisting forces balance,
$$
\tan\alpha_c = (1-\lambda)\,\tan\phi
$$
for a cohesionless wedge on a horizontal decollement, with $\lambda$ the pore-pressure ratio and $\phi$ the internal friction angle of the wedge material; a basal slope $\alpha_b$ and a basal cohesion modify the expression but not its message. A landscape whose relief exceeds the **critical threshold** fails, and the resulting **topographic self-organisation** limits the relief of a range independently of the uplift rate.
:::

::: example Is this profile steady? {#ex-slope-area}
A mountain-belt channel reach gives the following slope–area pairs, measured from a 5-m DEM:
$A = 10^2, 10^3, 10^4, 10^5\ \mathrm{m^2}$ with $S = 0.190, 0.060, 0.019, 0.006$. Find the concavity, and say whether the reach is in steady state. A further reach at $A = 10^{3.5}\ \mathrm{m^2}$ has $S = 0.055$ while the fitted line predicts 0.034. Interpret.
::: solution
Taking logarithms, $\log S$ falls from $-0.72$ at $\log A = 2$ to $-2.22$ at $\log A = 5$, so
$$
\theta = \frac{2.22 - 0.72}{5 - 2} = \frac{1.50}{3} = 0.50 .
$$
The reach plots as a straight line of concavity 0.50 over three orders of magnitude of drainage area, which with $n = 1$ implies $m = 0.5$ — the value expected for a channel whose incision is set by the **shear stress** with a channel width that scales as $A^{0.5}$, or by the **unit stream power** with $A^{0.5}$ width scaling. The reach is **consistent with** steady state, but the concavity alone does not prove it: a uniform $K$ and a uniform uplift are also required, and the concavity is insensitive to both.

The second reach lies **well above** the fitted line: $S = 1.9\,A^{-0.5} = 1.9/56.2 = 0.034$ at $A = 3162\ \mathrm{m^2}$, so its slope is 1.6 times the equilibrium value for its drainage area. It is therefore **incising faster than the rest of the profile**, and the interpretation is a **knickpoint**: a break in the boundary condition (a base-level fall, a lithological contact, a glacial overdeepening, a tectonic step) that has propagated up to this point and whose effect has not yet passed. The **height of the knickpoint above the fitted profile** measures the **magnitude** of the perturbation and its **position** measures how far it has migrated, so with an independent age the knickpoint gives the **celerity** of the profile's adjustment — typically 1–50 km/Myr, which is the speed at which a landscape remembers a change in its boundary conditions.

The caution is that a straight slope–area line can also be produced by a **spatially varying $K$** that happens to mimic the equilibrium form, and by a **transport-limited** reach whose slope is set by the tools rather than by the incision. The discriminating tests are the **concavity of the tributaries** (which should match the trunk in steady state), the **channel-width exponent**, and an **independent denudation rate** from cosmogenic nuclides compared with the rock uplift.
:::
:::

::: widget loglog
f: 1.9/sqrt(x)
x: 100, 1000000
y: 0.001, 0.30
labels: \text{slope}
caption: The steady-state slope–area relation $S = 1.9\,A^{-0.5}$ for a concavity of 0.5. A reach that plots **on** the line is adjusting at the rate its boundary conditions require; a reach that plots **above** it is incising too fast and contains a knickpoint; a reach **below** it is being deposited on or is protected by a downstream control. The log-log presentation is not cosmetic — the power law is the observation, and the straightness of the line over three to five orders of magnitude of drainage area is one of the most robust empirical facts in the subject.
:::

::: example How fast does a knickpoint climb? {#ex-knickpoint}
A trunk stream 60 km long from its mouth to its divide has a knickpoint 40 km upstream of the mouth. A strath terrace at the knickpoint's base, cut at the old base level, is dated by $^{10}$Be at 1.2 Ma, and the knickpoint is independently known to have formed at 3.0 Ma when a fall in base level began. Find the knickpoint's celerity, and estimate when the whole profile will have adjusted.
::: solution
The knickpoint has retreated 40 km in
$$
3.0 - 1.2 = 1.8\ \mathrm{Myr},
$$
giving a celerity of
$$
c = \frac{40}{1.8} = 22\ \mathrm{km\,Myr^{-1}} = 22\ \mathrm{mm\,yr^{-1}} .
$$
The remaining 20 km to the divide would be consumed in
$$
\frac{20}{22} = 0.9\ \mathrm{Myr},
$$
so the profile will be wholly adjusted within about a million years — geologically instantaneous, and the reason that a landscape records a tectonic or eustatic event as a **transient wave** rather than as a permanent feature.

Three cautions make the estimate weaker than it looks. The **celerity is not constant**: it is proportional to the knickpoint's steepness and to the incision efficiency, both of which change as the knickpoint passes through different lithologies and as the drainage area above it shrinks. The **date of the terrace is the date of the abandonment**, which is the date the knickpoint passed it, so the 1.2 Ma is well constrained — but the 3.0 Ma "formation" age is usually an inference from a marine or offshore record of the base-level fall, and an error of 0.3 Myr there changes the celerity by 20 per cent. And the **knickpoint may not be a single feature**: a sequence of base-level falls produces a sequence of knickpoints, and a slope–area plot with several breaks may be being read as one.

The method's real value is comparative. Celerities of 5–100 km/Myr measured worldwide are **one to two orders of magnitude slower than the rates of channel incision at the knickpoint itself**, which tells us that a landscape's adjustment to a change in its boundary conditions is **much slower than the change**, and that most of the world's channels are therefore **not** in steady state with their present uplift and base level. This is the central result of the transient-landscape school, and it reframes the question from "what is the equilibrium form?" to "what perturbation is this landscape currently responding to?"
:::
:::

## Measuring the rates

::: definition Cosmogenic nuclides and thermochronology {#def-cosmo}
Cosmogenic nuclides measure **denudation rates averaged over $10^3$–$10^6$ yr**. In situ-produced $^{10}$Be in quartz accumulates at a production rate $P$ that falls exponentially with depth in the rock with an attenuation length $L \approx 174\ \mathrm{g\,cm^{-2}}$, and is lost by radioactive decay ($\lambda = 4.6\times10^{-7}\ \mathrm{yr^{-1}}$) and by the erosion that brings the rock to the surface. At **steady state** the concentration is
$$
N = \frac{P}{\lambda + E/L},
$$
so a measured $N$ gives the catchment-averaged denudation rate $E$ directly. A **low** concentration means **fast** erosion. The $^{26}$Al/$^{10}$Be ratio tests whether the assumption of steady state is valid, because the two nuclides have different half-lives and a ratio inconsistent with steady exposure records a buried or a complex history. **Low-temperature thermochronology** — apatite fission track, (U–Th)/He, and $^{4}$He/$^{3}$He — measures the **cooling rate** as rock passes through its closure temperature of 40–120 °C, and therefore the denudation rate over $10^6$–$10^7$ yr at depths of 1–4 km; an **age–elevation relationship** gives the long-term average exhumation rate and, when it breaks slope, the time at which the range's incision accelerated.
:::

::: example A catchment's denudation rate from 10Be {#ex-10be}
Quartz from the sand of a mountain river's load gives a $^{10}$Be concentration of $1.5\times10^{4}$ atoms/g. Take a sea-level, high-latitude production rate of $P = 4.5\ \mathrm{atoms\,g^{-1}\,yr^{-1}}$, an elevation correction factor of 1.6 for the catchment's mean height, $\lambda = 4.6\times10^{-7}\ \mathrm{yr^{-1}}$ and $L = 174\ \mathrm{g\,cm^{-2}}$. Find the catchment-averaged denudation rate in mm/yr, and compare it with the rate implied by the river's modern suspended load.
::: solution
The catchment production rate is $P = 4.5\times1.6 = 7.2\ \mathrm{atoms\,g^{-1}\,yr^{-1}}$, so
$$
\lambda + \frac{E}{L} = \frac{P}{N} = \frac{7.2}{1.5\times10^{4}} = 4.8\times10^{-4}\ \mathrm{yr^{-1}},
$$
$$
\frac{E}{L} = 4.8\times10^{-4} - 4.6\times10^{-7} \approx 4.8\times10^{-4}\ \mathrm{yr^{-1}}, \qquad
E = 8.3\times10^{-2}\ \mathrm{g\,cm^{-2}\,yr^{-1}} .
$$
At a rock density of $2650\ \mathrm{kg\,m^{-3}}$, $1\ \mathrm{mm\,yr^{-1}} = 0.265\ \mathrm{g\,cm^{-2}\,yr^{-1}}$, so
$$
E = \frac{8.3\times10^{-2}}{0.265} = 0.31\ \mathrm{mm\,yr^{-1}} .
$$
Note that the **decay term is negligible** — the erosion dominates the loss — which is why cosmogenic nuclides are sensitive to erosion rates of $0.01$–$10\ \mathrm{mm\,yr^{-1}}$ and useless below about $0.005\ \mathrm{mm\,yr^{-1}}$, where the concentration saturates at $P/\lambda \approx 1.6\times10^{7}$ atoms/g.

If the same catchment's modern suspended load gives 0.5 mm/yr, the two agree within the analytical uncertainty, and the catchment is **in steady state over the $10^4$-yr averaging period**. If the modern load gave 2 mm/yr, the discrepancy would mean that the present is **not** typical — that the catchment is adjusting to a recent perturbation, most often the deglaciation of 15 kyr ago, whose sediment stores are still being evacuated. This is the single most important comparison in modern geomorphology, and it commonly shows the modern rate exceeding the cosmogenic one by a factor of two to ten in formerly glaciated and tectonically active catchments.
:::
:::

## The argument about landforms

::: history The denudation chronologists and their critics {#hist-denudation}
**Davis** (Davis) proposed in 1899 the **geographic cycle of erosion** — youth, maturity and age, with a **peneplain** as the end product — and it dominated American geography for fifty years. **Sabine** (Sabine) and **Woodward** (Woodward) attacked it in the 1920s and 1930s; **Johnson** (Johnson) proposed **pediplanation** in 1931, in which slopes retreat in parallel to leave a **pediplain** rather than a low-angle plain being cut down; **Grossmann** and **Tricart** (Tricart) and **Büdel** (Büdel) added the climatic and the periglacial dimensions; and **Howard** (Howard) in 1967 gave the decisive critique, showing by flume experiment that a **dissected plateau** evolves by the **parallel retreat of its slopes** with the interfluve area shrinking, not by the lowering of divides, and that the Davisian "youthful" stage is reproduced by any rapidly incising plateau whatever its age. **King** (King) generalised this into **uniformitarianism of slope retreat** and the **pediplaine** in his 1953 and 1967 books, and **Twenhofel**, **Budel**, **Wayland and Rudnicki**, and **Cotton** carried the argument into the Southern Hemisphere. The **passim planation** and **etchplain** concepts of **Wooldrige and Macfarlane** (Woolridge) and of **Ollier and Mabbutt** (Mabbutt) and **Vidal Romanach** (Romanach) extended the argument to the deeply weathered surfaces of the tropics. The modern position, established by **Ahnert** (Ahnert) in 1987 and by **Summerfield**'s (Summerfield) 1991 *Global Geomorphology*, is that **both** end-member morphologies occur, that which one you see depends on the **ratio of the incision rate to the slope-denudation rate** and on the rock's resistance, and that the argument itself was unproductive because it was framed as a contest between two global morphogenetic systems rather than as a question about the relative rates of two processes. The **modern quantitative version** of the same question — whether divides retreat or lower — is asked through the **hypsometric and slope-area statistics** of a landscape and through **cosmogenic nuclide ratios between summit and valley**, and it has found old, low-relief surfaces on passive margins that have apparently survived at 1–10 m/Myr for over 100 Myr, which remains one of the subject's genuine puzzles.
:::

::: example How old can a landscape be? {#ex-old-landscape}
A passive-margin highland has a low-relief summit surface at 900 m, dissected by valleys to a local relief of 400 m. Apatite (U–Th)/He ages from the summit surface are 500–700 Ma with no age–elevation gradient; apatite fission-track ages from a valley side at the same locality are 200–300 Ma and do define an age–elevation gradient. Cosmogenic $^{10}$Be from the modern valley floors gives 0.008 mm/yr. Reconstruct the history and say what is and is not established.
::: solution
The three datasets measure three different timescales and three different depths. The **apatite (U–Th)/He** system closes at 60–70 °C, so it records the time at which the rock passed through about 2–2.5 km depth; the **fission-track** system closes at 90–110 °C, so it records a slightly deeper and earlier passage.

The **500–700 Ma He ages with no age–elevation gradient** mean the summit's rocks cooled through 70 °C in the Neoproterozoic and have since been **exhumed at a rate too slow to produce a measurable age gradient** — below about 2–3 m/Myr. The **200–300 Ma fission-track ages on the valley side, with a gradient**, mean the valley's rocks passed through 100 °C much later and are still being exhumed. The two together require that the **summit surface is a Neoproterozoic surface** that has been preserved with a denudation rate of a few m/Myr for 500 Myr, while the **valleys have cut into it** since the Mesozoic at a somewhat faster rate. The **$^{10}$Be rate of 0.008 mm/yr = 8 m/Myr** on the modern valley floors is consistent with the valley-side thermochronology and confirms that the dissection is **still active**.

What is **established**: that the summit surface is old, that it has been nearly static, and that the relief is young relative to it. What is **not established**: whether the summit surface is a **planation surface** cut by waves or by a water table at or near base level, or whether it is a **pediplain** cut by parallel retreat, or whether it is simply the **residual upper surface of a thick sandstone or gneiss** whose structure happens to be flat. The thermochronology constrains the **rate** of vertical motion, not the **process** that made the form. And the 500 Myr of near-static denudation is itself the puzzle: a surface that old should have been destroyed by the rifting, the sediment loading and the climate changes of the intervening eons, and the fact that such surfaces are found on passive margins worldwide — in eastern Brazil, West Africa, India, Australia and Norway — means that our understanding of how relief is generated and destroyed over $10^8$ yr is incomplete.
:::
:::

::: quiz
A catchment's cosmogenic $^{10}$Be denudation rate is 0.15 mm/yr and its modern suspended-plus-dissolved load gives 1.4 mm/yr. What is the best reading?
- [ ] One of the two measurements is wrong.
- [ ] The catchment is in steady state.
- [x] The present is not typical — the catchment is evacuating a sediment store or adjusting to a recent perturbation.
- [ ] The cosmogenic rate is a maximum estimate and must be too low.
::: solution
The two rates average over wildly different windows — the cosmogenic rate over $10^4$ to $10^5$ yr, the modern load over a few years — and a factor-of-ten mismatch is the normal signature of a landscape that is **adjusting**, most often to the deglaciation of the last glacial period, to a recent uplift or base-level change, or to human disturbance of the hillslopes. Both numbers can be perfectly correct. The conclusion of steady state would require agreement, and the conclusion that one is wrong is a refusal to interpret; the cosmogenic rate is not a maximum estimate but a time average that is dominated by the low rates between the events.
:::
:::

## Where this leads

The rate laws are applied to faults in [[structural-geology/rifts]] and [[structural-geology/orogens]], to the flexure that sets a coast's position in [[geomorphology/drainage-basins]] and [[glaciology/ice-sheets]], the cosmogenic methods are in [[geochemistry/geochronology]] and [[palaeoclimate/dating]], the thermochronology is in [[geochemistry/geochronology]], the glacial control on relief is in [[geomorphology/glacial-landscapes]], and the sediment flux to the sea is in [[sedimentology/basins-sequences]] and [[oceanography/sea-level]].

::: summary
- A landscape may be in steady state, in which its denudation equals its uplift; the slope–area plot is the test.
- A concavity of $\theta = m/n$ and a straight slope–area line are consistent with steady state; a knickpoint is a record of a perturbation.
- Cosmogenic nuclides give $10^3$–$10^6$-yr average denudation rates; thermochronology gives $10^6$–$10^8$-yr exhumation rates; the modern load gives the present.
- Agreement among the three is evidence of steady state; disagreement is evidence of a perturbation and is the more interesting result.
- The Davisian cycle was rightly abandoned, but the question it asked — whether divides retreat or lower — is still open and is now asked quantitatively.
- Some landscapes are far older than the processes that shaped them, and old surfaces on passive margins remain unexplained.
:::

## Exercises

::: exercise Concavity {level=1 check="0.35"}
A slope–area fit gives $\log S = 0.8 - 0.35\log A$. Find the concavity and, with $n = 1$, the area exponent $m$.
::: solution
$\theta = 0.35$ and $m = \theta n = 0.35$. A concavity of 0.35 is low for a steep mountain channel (where 0.4–0.6 is typical) and is characteristic of a **transport-influenced** or a **lithologically uniform** lowland river, or of a reach whose width grows rapidly with discharge.
:::
:::

::: exercise Knickpoint {level=1}
A trunk stream's slope–area plot is a straight line from $A = 10^3$ to $10^7\ \mathrm{m^2}$, with a single reach at $A = 5\times10^5\ \mathrm{m^2}$ whose slope is three times the fitted value. What is the reach, and which way does the perturbation propagate?
::: solution
The reach is a **knickpoint** — a break in the profile where incision has accelerated. The perturbation propagates **upstream**, as the knickpoint retreats toward the divide, and its celerity is the rate at which the break in the slope–area line migrates up the network.
:::
:::

::: exercise Steady state {level=1}
A range is being uplifted uniformly at 0.4 mm/yr and its catchments give a cosmogenic denudation rate of $0.42 \pm 0.06\ \mathrm{mm\,yr^{-1}}$. Is it in steady state?
::: solution
Yes, within the uncertainty: the denudation equals the uplift. The range's relief, hypsometry and channel profiles should therefore all be time-invariant, and any **knickpoint, any mismatch between tributary and trunk concavity, and any hypsometric anomaly** must record either a local perturbation or an error in one of the two rates.
:::
:::

::: exercise Cosmogenic rate {level=2 check="0.08"}
With $P = 7.2\ \mathrm{atoms\,g^{-1}\,yr^{-1}}$, find the denudation rate for a $^{10}$Be concentration of $6.0\times10^{4}$ atoms/g.
::: solution
$P/N = 1.2\times10^{-4}$, so $E/L \approx 1.195\times10^{-4}$ and $E = 0.0208\ \mathrm{g\,cm^{-2}\,yr^{-1}} = 0.0208/0.265 = 0.078\ \mathrm{mm\,yr^{-1}}$. A low denudation rate of this order is typical of a **cratonic, arid or deeply weathered** terrain, and it is approaching the range where the decay term begins to matter.
:::
:::

::: exercise A graded reach {level=2}
A channel carries a sediment load of $3\times10^{5}\ \mathrm{m^3\,yr^{-1}}$ with a width of 20 m, a discharge of $60\ \mathrm{m^3\,s^{-1}}$ and a slope of 0.0015. If the slope is halved by a dam-induced degradation and the width and grain size are unchanged, is the reach still graded?
::: solution
The stream power per unit bed area is $\omega = \rho_w g R S \approx \rho_w g d S$, which is **proportional to the slope** for a fixed geometry. Halving the slope halves the power, and the transport capacity of a reach goes as a high power of the excess shear stress — roughly $(\theta/\theta_{cr} - 1)^{1.5}$ in the Meyer–Peter formula, which for a typical $\theta/\theta_{cr}$ of 2 gives a capacity that falls by a factor of 2–4 when the slope halves. The reach is therefore **no longer graded**: it carries less than its supply, deposits, and aggrades until the slope is restored or the extra sediment is spread over a longer reach.

This is the mechanism of the **downstream degradation and upstream aggradation** behind a dam, and of the **bedload starvation** that has turned many European and American rivers into incising, coarsening, armoured channels.
:::
:::

::: exercise The topographic threshold {level=3 check="0.58"}
A nonlinear hillslope flux law is $q = K S / \left(1 - (S/S_c)^2\right)$, where the flux diverges as the slope $S$ approaches the critical slope $S_c$. Take $S_c = 0.9\tan\theta_r$ with a regolith angle of repose $\theta_r = 34^\circ$. Find the slope at which the flux is ten times the linear-law value, and say what it implies for a range's relief.
::: solution
The flux ratio to the linear law is $1/(1 - (S/S_c)^2)$, so a factor of ten requires
$$
1 - (S/S_c)^2 = 0.10, \qquad S/S_c = \sqrt{0.90} = 0.949 .
$$
With $S_c = 0.9\tan 34^\circ = 0.9\times0.674 = 0.607$,
$$
S = 0.949\times0.607 = 0.58 .
$$
A slope of 0.58 is 30° — already steep — and at that slope the hillslope exports **ten times** what a linear diffusion would predict.

The implication is the **relief-limiting** result. Because the flux rises so steeply as the slope approaches $S_c$, a range cannot be pushed much above the critical slope by tectonics: any attempt to steepen it produces a disproportionate increase in sediment export, which removes the relief as fast as it is created. The **erosion–slope curve therefore acts as a clamp on relief**, and the predicted maximum relief of a range is set by $S_c$ — that is, by the **angle of repose of its regolith**, which is set by its rock strength, its friction angle and its pore pressure. This is the "critical topography" or "topographic slope–area" result of Hales and of Montgomery and Brandon (Brandon), and it explains the observed upper envelope of catchment slopes in the Sierra Nevada, the Andes, the Alps and Taiwan, all of which lie near a common threshold of 0.3–0.6 whatever their uplift rate.

The corollary is that in a range at the threshold the **denudation rate becomes independent of the slope** and is set instead by the **rate at which rock is supplied to the slopes by incision**, so the range's sediment flux records the tectonics rather than the climate — which is why marine sediment flux is a usable tectonic proxy in steep orogens and a poor one in low-relief, diffusion-limited terrain.
:::
:::

::: exercise A range's sediment budget {level=3}
A coastal range of $2\times10^{4}\ \mathrm{km^2}$ delivers $4\times10^{7}\ \mathrm{m^3\,yr^{-1}}$ of sediment to its offshore basin. Its mean relief is 1.4 km and its mean slope is 0.35. Find the mean denudation rate, the denudation rate required to keep the relief steady, and the range's remaining lifetime if the uplift stops.
::: solution
The mean denudation rate is
$$
E = \frac{4\times10^{7}}{2\times10^{10}} = 2.0\times10^{-3}\ \mathrm{m\,yr^{-1}} = 2.0\ \mathrm{mm\,yr^{-1}} .
$$
The rate required to keep the relief steady **is** the rate that equals the uplift, and since the relief is observed to be steady the uplift must also be 2.0 mm/yr. If the uplift stopped, the range would be reduced by diffusion, and the diffusive decay of a relief of wavelength $W$ has a timescale
$$
\tau = \frac{W^2}{\pi^2 D}, \qquad D = \frac{E}{S} = \frac{2.0}{0.35} = 5.7\ \mathrm{m^2\,yr^{-1}} .
$$
With $W = 40\ \mathrm{km}$,
$$
\tau = \frac{(4\times10^{4})^2}{9.87\times5.7} = 2.9\times10^{7}\ \mathrm{yr} = 29\ \mathrm{Myr}.
$$
The range would lose most of its relief in about **30 Myr** — the same order as the observed lifetime of many exhumed ranges, and the reason that a range with no ongoing uplift is expected to be gone within a few tens of millions of years.

The caveats are that the linear diffusion coefficient $D = E/S$ is valid only for slopes well below the angle of repose, that a range with slopes near the threshold for landsliding has an effective $D$ that rises steeply with slope and therefore decays **faster** than this estimate, and that the sediment flux itself will fall as the relief falls, so the decay is exponential rather than linear. The estimate is therefore an **upper bound** on the lifetime, and the observed 10–20 Myr for the Appalachians' remnants, the Scottish Highlands and the Urals is consistent with it.
:::
:::

::: exercise The old-surface problem {level=3}
A passive-margin surface has a cosmogenic $^{10}$Be denudation rate of 0.006 mm/yr, an apatite He age of 400 Ma, and a relief of 350 m. Assume the surface has been stable since 400 Ma and find the total denudation, the depth of rock removed, and the contradiction.
::: solution
At 0.006 mm/yr for $4\times10^{8}$ yr the total denudation is
$$
6\times10^{-6}\times4\times10^{8} = 2400\ \mathrm{m} = 2.4\ \mathrm{km}.
$$
The contradiction is that the surface has **survived the removal of 2.4 km of rock**. A planation surface cut at or near base level cannot survive the removal of kilometres of overburden unless it is continuously **rejuvenated** — uplifted as it is exhumed, so that it stays near the base level that cuts it. And a surface that is continuously uplifted and exhumed cannot have a **flat age–elevation relationship** in the thermochronology, because the exhumation would bring deeper, older-closure-age rocks to the surface and produce a gradient.

Three resolutions are live. The **$^{10}$Be rate may not be representative**, because a deeply weathered or mantled surface produces a low nuclide concentration for reasons of **storage and reworking** rather than slow bedrock erosion — the nuclides measure the **regolith production rate**, not the bedrock lowering rate, and a thick steady-state saprolite can give a spuriously low rate. The **thermochronological ages may be partially reset** by a Mesozoic thermal event, in which case the 400 Ma is not an exhumation age. And the surface may be a **composite** — a mosaic of old and young surfaces at similar elevations, whose average looks old and flat but whose parts are not.

The honest conclusion is that the "old" passive-margin surfaces are among the least understood objects in the earth sciences, that the dating methods and the process understanding are both too weak to settle it, and that the discriminating observations are the **paired $^{10}$Be and $^{26}$Al concentrations** (which test the steady-state assumption directly), the **basin-scale sediment budget** from the offshore stratigraphy, and the **low-temperature thermochronology of a summit-to-valley transect** rather than of a single profile.
:::
:::
