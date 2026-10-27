A grain on a bed is held there by its weight and by the friction of its neighbours, and it is moved when the fluid's drag and lift exceed them. Everything else in sedimentology — the shape of a bedform, the sorting of a sand, the geometry of a reservoir, the architecture of a basin fill — follows from the balance between those two forces and from the way the flow behaves once it is doing the moving. This lesson is the mechanics behind the grain-size statistics of the last one.

## The flow and its stress

::: definition Shear velocity and boundary shear stress {#def-shear}
For a wide, uniform open-channel flow of depth $H$ and energy slope $S$, the **boundary shear stress** — the tangential force per unit area that the water exerts on the bed — is
$$
\tau_0 = \rho_f\, g\, H\, S ,
$$
and the **shear velocity** is
$$
u_* = \sqrt{\tau_0/\rho_f} .
$$
The shear velocity, not the mean velocity, is the quantity that governs grain movement, because it is the velocity scale of the turbulent eddies in the viscous sublayer that actually exert the force on a grain. For a flow of 1.5 m depth and a slope of $3\times10^{-5}$ it is 0.021 m/s, whereas the mean velocity may be 1.1 m/s — a factor of fifty, and the reason a river that looks slow can move coarse sand and a river that looks fast can move nothing at all.
:::

::: definition The Shields parameter {#def-shields}
The **Shields parameter** is the ratio of the fluid's entraining force to the grain's resisting weight,
$$
\theta = \frac{\tau_0}{(\rho_s - \rho_f)\, g\, d} ,
$$
a dimensionless grain diameter and a dimensionless stress. Motion begins at a **critical Shields parameter** $\theta_{cr}$ that is a function of the particle Reynolds number $\mathrm{Re}_* = u_* d/\nu$: it is about 0.045 for sand between 0.1 and 2 mm, rises to 0.1 or more for very fine sand and coarse silt because of interparticle cohesion, and rises again for gravels whose beds are interlocked. The **Shields diagram** plots $\theta_{cr}$ against $\mathrm{Re}_*$ and is the single most-used diagram in sediment-transport analysis; the **Hjulström diagram** is its ancestor, drawn in velocity rather than stress units.
:::

::: example Is the bed moving? {#ex-shields}
A lowland river has a depth of 1.5 m, a slope of $3\times10^{-5}$, a mean velocity of 1.1 m/s, and a bed of sand with $d_{50} = 0.25\ \mathrm{mm}$. Take $\rho_s = 2650$ and $\rho_f = 1000\ \mathrm{kg\,m^{-3}}$, $\nu = 10^{-6}\ \mathrm{m^2\,s^{-1}}$. Find $\tau_0$, $u_*$, $\theta$ and the flow's Reynolds number, and say whether the bed is mobile and in what mode.
::: solution
$$
\tau_0 = 1000\times9.81\times1.5\times3\times10^{-5} = 0.44\ \mathrm{Pa}, \qquad
u_* = \sqrt{0.44/1000} = 0.021\ \mathrm{m\,s^{-1}} ,
$$
$$
\theta = \frac{0.44}{1650\times9.81\times2.5\times10^{-4}} = \frac{0.44}{4.05} = 0.109 .
$$
With $\theta_{cr} = 0.045$ the bed is stressed at **2.4 times the threshold**, so it is mobile. The flow Reynolds number is $uH/\nu = 1.1\times1.5/10^{-6} = 1.7\times10^{6}$, so the flow is fully turbulent.

The mode follows from the **Rouse number**,
$$
P = \frac{w}{\kappa u_*} = \frac{0.030}{0.4\times0.021} = 3.6 ,
$$
where $w = 0.030\ \mathrm{m\,s^{-1}}$ is the Ferguson–Church settling velocity of a 0.25-mm grain. A Rouse number above 2.5 means the grain cannot be held in suspension by turbulent diffusion: it moves as **bedload**, by rolling and saltation, in a layer a few grain diameters thick next to the bed. The river is therefore a bedload-transporting stream, and its bed is a rippled or duned surface rather than a plane bed with a cloud of suspended sand above it.

The largest grain that this flow could move at all is found by setting $\theta = \theta_{cr}$:
$$
d_{cr} = \frac{\tau_0}{(\rho_s - \rho_f) g\,\theta_{cr}} = \frac{0.44}{1650\times9.81\times0.045} = 0.61\ \mathrm{mm},
$$
so the flow could move granules up to 0.6 mm and nothing coarser. A gravel bar of 20-mm pebbles in the same channel is therefore **relict**, a deposit of a flood that has not returned in a thousand years, and reading it as a modern bed would give a palaeohydraulic reconstruction too large by an order of magnitude.
:::
:::

::: widget plot
f: 0.045*(1+0.15/x+0.3/(x*x))
x: 0.5, 100
y: 0.03, 0.30
labels: \text{critical Shields parameter}
caption: The critical Shields parameter as a function of particle Reynolds number, in the form of the classical Shields curve. The minimum of about 0.045 lies at $\mathrm{Re}_* \approx 10$–$100$, which is the sand range; the curve rises steeply to the left, where interparticle cohesion and electrostatic attraction become important relative to the grain's weight, and gently to the right, where the bed becomes rough and the grains shield one another. The rise to the left is the reason that a mud, whose grains are individually weightless, requires a **higher** shear stress for erosion than a fine sand does, and why muds are eroded only by the largest floods and are then preserved as the laminated drapes of a turbidite's upper part.
:::

## Modes of transport

::: definition Suspension, saltation and solution {#def-modes}
Sediment moves in three mechanical modes and one chemical one. **Dissolved load** is the ionic product of weathering and is not a sedimentological process in the sense used here. **Suspension** is transport within the flow, supported by turbulent eddies, and requires a Rouse number $P = w/(\kappa u_*) \lesssim 2.5$; suspended grains follow the fluid and are deposited only when the flow dies. **Saltation** is a succession of short hops along the bed, each hop launched by a turbulent burst and terminated by impact, and it is the dominant mode for sand between 0.1 and 1 mm; saltating grains do the work of entrainment, and a bed of saltating sand is many times more efficient at moving more sand than a stationary one. **Bedload** is rolling, sliding and creeping in continuous contact with the bed, and it dominates for coarse sand and gravel. **Traction** in the classical sense — the continuous rolling that produces imbrication and the chevron cross-bedding of a gravel bar — is the coarsest case of bedload.
:::

::: proposition The Rouse profile {#prop-rouse}
In a uniform turbulent flow the time-mean concentration of suspended sediment decreases upward as
$$
\frac{c(z)}{c(a)} = \left(\frac{a\,(h - z)}{z\,(h - a)}\right)^{P}, \qquad P = \frac{w}{\kappa u_*},
$$
where $a$ is a reference height, $h$ the flow depth and $\kappa = 0.4$ the von Kármán constant. The **Rouse number** $P$ therefore controls the whole vertical distribution: as $P \to 0$ the concentration is uniform and the sediment is wash load, and as $P$ exceeds about 2.5 the concentration is confined to a thin layer at the bed.
:::

::: proof
Equate the downward flux of grains by settling, $w c$, with the upward diffusive flux, $-\varepsilon_s\, dc/dz$, where the sediment diffusion coefficient is taken equal to the momentum eddy viscosity $\varepsilon_s = \kappa u_* z$. Then
$$
w c = \kappa u_* z\frac{dc}{dz} \quad\Longrightarrow\quad \frac{dc}{c} = -P\,\frac{dz}{z},
$$
which integrates to $c \propto z^{-P}$. Applying the boundary condition of zero net flux at the free surface, $w c = \kappa u_*(h - z)\,dc/dz$, gives the full Rouse form above. The proof rests on the assumption that sediment diffuses at the same rate as momentum, which is roughly true for sand and badly wrong for flocculated mud, whose aggregates are porous, break up in turbulence, and have an effective settling velocity that depends on the concentration itself.
:::

::: example Wash load, suspended load and bedload {#ex-rouse}
Three materials are carried by the flow of [[#ex-shields]]: a 2-µm clay, a 62-µm silt and the 250-µm sand of the bed. Compute the Rouse number and the ratio of the concentration at mid-depth to that near the bed for each, taking $\kappa u_* = 0.0084\ \mathrm{m\,s^{-1}}$.
::: solution
Settling velocities from the Ferguson–Church formula are $3.4\times10^{-7}$, $3.1\times10^{-6}$ and $3.0\times10^{-2}\ \mathrm{m\,s^{-1}}$, giving
$$
P_\text{clay} = \frac{3.4\times10^{-7}}{0.0084} = 4\times10^{-5}, \quad
P_\text{silt} = \frac{3.1\times10^{-6}}{0.0084} = 3.7\times10^{-4}, \quad
P_\text{sand} = \frac{0.030}{0.0084} = 3.6 .
$$
For $P \ll 1$ the Rouse profile is essentially uniform, so clay and silt are **wash load**: their concentration is the same at every depth and is set not by the flow's competence but by the supply from the catchment. For the sand, taking $a = 0.05h$ and $z = 0.5h$,
$$
\frac{c(0.5h)}{c(0.05h)} = \left(\frac{0.05\times0.5}{0.5\times0.45}\right)^{3.6} = (0.111)^{3.6} = 4\times10^{-4},
$$
so the sand concentration at mid-depth is **two and a half thousand times lower** than near the bed. The sand is a bedload material confined to the lowest few per cent of the flow.

This is the mechanical basis of the field distinction between **washover** and **bedload** deposits. A deposit of wash load is a mud whose thickness records the supply of fines from the land and nothing whatever about the flow that laid it, which is why mud rhythmites are a rain gauge and not a current meter. A deposit of bedload is a sand whose grain size records the flow's stress at the bed and nothing about the supply, which is why a sand body's grain-size trend is a palaeohydraulic instrument. The two carry opposite and complementary information, and a stratigraphic column is read by alternating between them.
:::
:::

::: quiz
A mud and a fine sand lie side by side on a shelf where the bottom stress reaches 0.10 Pa during storms and is 0.01 Pa otherwise. What happens?
- [ ] Both are eroded by every storm and neither is preserved.
- [x] The sand is repeatedly reworked and well sorted; the mud, whose threshold is comparable or higher and is raised further by any microbial mat, escapes erosion and is preserved.
- [ ] The mud is eroded first because its grains are smaller.
- [ ] Neither moves, because 0.01 Pa is below both thresholds.
::: solution
Threshold is not a function of grain size alone. Below about 0.1 mm the critical Shields parameter rises steeply because interparticle cohesion scales with the contact area while the grain's submerged weight scales with its volume, so a mud's erosion threshold is comparable to or greater than a fine sand's, and biological bonding raises it further. The sand is therefore the mobile phase and the mud the surviving one, which is why storm beds are sand bodies draped in undisturbed mud.
:::
:::

::: history
The quantitative study of sediment transport begins with the experiments of Fréminville and du Buysson in the 1860s on the movement of sand and gravel in flumes, and with Gilbert's (Gilbert) monographs of 1877 and 1914, which established from the field that a stream's competence and its capacity are separate properties and that both vary through a flood. The dimensionless threshold curve was measured by Albert Shields (Shields) in his 1936 dissertation, and it remains the most reproduced diagram in the subject; the empirical entrainment-and-deposition curve of Krynine and Hjulström (Hjulström) of 1935, drawn in velocity units, became the standard teaching figure. The Rouse equation is from Hunter Rouse's (Rouse) 1937 paper, and the Meyer–Peter and Müller (Müller) formula of 1948 was fitted to Swiss alpine stream data and is still the bedload equation of engineering practice. The turbulence-based synthesis of Einstein, of Bagnold — whose 1941 and 1966 books made sediment transport a branch of fluid mechanics rather than of hydraulic engineering — and of Yalin established the physics, and the modern era of field measurement, acoustic sediment profiling and numerical modelling began with the recognition in the 1970s that the thresholds measured in a laboratory flume systematically over-predict the movement of natural beds, because natural beds are sorted, armoured, biologically bonded and full of pre-existing failures.
:::

## How much sediment moves

::: proposition Bedload transport {#prop-mpm}
For a bed of uniform sand or gravel stressed above its threshold, the bedload flux per unit channel width is given by the Meyer–Peter and Müller relation
$$
q_b = 8\,\bigl(R g d^3\bigr)^{1/2}\,\bigl(\theta - \theta_{cr}\bigr)^{3/2},
$$
in $\mathrm{m^2\,s^{-1}}$. The transport rate is therefore a **strongly nonlinear** function of the excess stress: doubling the shear stress above threshold raises the flux by a factor of about $2^{3/2} = 2.8$ if the excess also doubles, and by much more if the stress is far above threshold.
:::

::: example A gravel bed in flood {#ex-mpm}
A mountain stream carries a bed of 10-mm gravel and, during a flood, a boundary shear stress of 10 Pa. Take $\theta_{cr} = 0.045$. Find the bedload flux, and find the stress needed to double it.
::: solution
$$
\theta = \frac{10}{1650\times9.81\times0.010} = 0.0618, \qquad
\theta - \theta_{cr} = 0.0168 ,
$$
$$
\bigl(R g d^3\bigr)^{1/2} = \bigl(1.65\times9.81\times10^{-6}\bigr)^{1/2} = 4.02\times10^{-3}\ \mathrm{m\,s^{-1/2}},
$$
$$
q_b = 8\times4.02\times10^{-3}\times(0.0168)^{3/2} = 8\times4.02\times10^{-3}\times2.18\times10^{-3} = 7.0\times10^{-5}\ \mathrm{m^2\,s^{-1}} .
$$
Over a 5-m-wide channel this is $3.5\times10^{-4}\ \mathrm{m^3\,s^{-1}}$ of gravel, or about $30\ \mathrm{m^3}$ per day — enough to build a bar in a century and to move a fan in a millennium.

To double the flux the excess $(\theta - \theta_{cr})$ must increase by $2^{2/3} = 1.59$ times, to $0.0267$, so $\theta$ must reach $0.0717$ and
$$
\tau_0 = 0.0717\times1650\times9.81\times0.010 = 11.6\ \mathrm{Pa}.
$$
A **sixteen per cent increase in shear stress doubles the gravel flux**. This is the reason that a landscape's erosion is done by its largest and rarest floods, and why the geomorphic work of a river is concentrated in events that occur for a few hours in a decade: the transport law is a power of the excess stress, and the stress distribution is skewed, so the product of the two is dominated by the tail.
:::
:::

::: example Palaeohydraulics from a conglomerate {#ex-palaeo}
A conglomerate contains imbricated clasts whose **mean** diameter is 60 mm and whose **maximum** clast is 200 mm. Estimate the boundary shear stress and the mean flow velocity, taking $\theta_{cr} = 0.045$, a Manning roughness of $n = 0.04$, and a hydraulic radius of 1 m.
::: solution
Setting $\theta = \theta_{cr}$ gives the stress just sufficient to move a clast of each size:
$$
\tau = 0.045\times1650\times9.81\,d = 728\,d\ \mathrm{Pa},
$$
so $\tau = 43.7\ \mathrm{Pa}$ for the 60-mm mean and $145.7\ \mathrm{Pa}$ for the 200-mm maximum. Combining $\tau_0 = \rho_f g R S$ with Manning's equation $u = R^{2/3}S^{1/2}/n$ eliminates the slope,
$$
u = \frac{R^{1/6}}{n}\left(\frac{\tau_0}{\rho_f g}\right)^{1/2},
$$
which for $R = 1\ \mathrm{m}$ gives
$$
u = 25\times(0.00445)^{1/2} = 1.7\ \mathrm{m\,s^{-1}} \quad\text{and}\quad u = 25\times(0.01485)^{1/2} = 3.1\ \mathrm{m\,s^{-1}} .
$$
The flow was therefore a fast, deep, steep mountain stream, and the note that $u$ depends on the hydraulic radius only as $R^{1/6}$ means the estimate is insensitive to the assumed depth: doubling the depth changes the velocity by only twelve per cent.

The two estimates differ by a factor of two, and the difference is the whole difficulty of the method. The **mean** clast size records the stress that moved the bed as a whole, and the **maximum** clast records the largest flood that ever passed. A palaeohydraulic reconstruction should quote both and should say which is meant, because a fan built by floods of 3 m/s and a fan built by flows of 1.7 m/s have entirely different deposit architectures — the first is a debris- and bedload-dominated alluvial fan with thick, poorly sorted sheets, and the second is a braided river with organized, imbricated, well-drained bars.
:::
:::

::: warning Threshold effects make the rock record lie about average conditions
Because motion begins abruptly at a threshold, a deposit records the **maximum** stress a flow attained while it was being deposited, not its average stress, and it records nothing at all about the many flows that were too weak to move the bed. Three systematic errors follow. A **relict lag** of coarse gravel or of shells on a modern seafloor records the largest event since the last sea-level lowstand, not the present regime, and using it as a modern-process measurement has produced many wrong palaeohydraulic reconstructions. A **stagnant mud** records nothing about the currents that pass over it, because its threshold is above their stress; a mud-rich succession may therefore be the deposit of a quiet environment or of an environment whose flows were simply below the mud's erosion threshold, and the two are not distinguished by the mud itself. And **the grain size of a sandstone is a threshold measurement, not an average**: the $d_{50}$ of a turbidite bed records the stress at the moment the flow's competence fell through that size, which happens at the end of the bed-forming phase, so the bed's **basal** grain size is the better estimator of the flow's peak competence and the **top** of the bed systematically under-estimates it. Every graded bed is a record of a flow dying, and reading its mean grain size as its mean flow strength biases the reconstruction low by a factor that can be two in stress.
:::

## Where this leads

The bedforms that these stresses produce are in [[sedimentology/bedforms]]; the environments whose flows have these stresses are in [[sedimentology/continental-environments]] and [[sedimentology/marine-environments]]; the grain-size statistics used to read the flows are in [[sedimentology/sediment-grains]]; and the rivers whose beds these laws describe are in [[geomorphology/rivers]], with their waves and currents in [[oceanography/waves-tides]].

::: summary
- The force that moves sediment is the boundary shear stress $\tau_0 = \rho_f g H S$, and the velocity scale that matters is the shear velocity $u_* = \sqrt{\tau_0/\rho_f}$.
- Motion begins at a critical Shields parameter of about 0.045 for sand, higher for mud because of cohesion and higher for gravel because of interlocking.
- The Rouse number $P = w/(\kappa u_*)$ decides whether a grain is wash load, suspended load or bedload, and it controls the whole vertical concentration profile.
- Bedload flux is a power $3/2$ of the excess stress, so landscape erosion is done by the rare largest flows.
- Deposits record threshold-crossing events, not average conditions, and the top of a graded bed systematically under-estimates the flow's peak strength.
- Mud's high erosion threshold means a mud can accumulate in a current, and a mud-rich rock is not evidence of quiet water.
:::

## Exercises

::: exercise Shear stress {level=1 check="0.98"}
Find the boundary shear stress of a flow 2 m deep on a slope of $5\times10^{-5}$.
::: solution
$\tau_0 = 1000\times9.81\times2\times5\times10^{-5} = 0.98\ \mathrm{Pa}$. This is a typical large-river value, and it is enough to move sand up to about 1.3 mm.
:::
:::

::: exercise Shields parameter {level=1 check="0.045"}
A bed of 1-mm sand is stressed by $\tau_0 = 0.73\ \mathrm{Pa}$. Find $\theta$ and say whether the bed moves.
::: solution
$\theta = 0.73/(1650\times9.81\times10^{-3}) = 0.73/16.2 = 0.045$. The bed is **exactly at threshold**, which is the condition that defines the critical Shields curve and the reason the curve is so difficult to measure: at threshold the bed moves so slowly that "no motion" and "incipient motion" are separated by weeks of observation.
:::
:::

::: exercise Rouse number {level=1 check="1.0"}
A silt grain with $w = 0.008\ \mathrm{m\,s^{-1}}$ is carried by a flow with $u_* = 0.02\ \mathrm{m\,s^{-1}}$. Find the Rouse number and the mode of transport.
::: solution
$P = 0.008/(0.4\times0.02) = 1.0$. With $P$ between 0.06 and 1.2 the grain is **in suspension** with a strong vertical concentration gradient — concentrated near the bed but present throughout the flow. This is the classic suspended-load condition.
:::
:::

::: exercise Cohesion and threshold {level=2}
The critical Shields parameter for 5-µm mud is about 1.0 and for 100-µm sand about 0.045. Find the ratio of the shear stresses needed to erode the two, and explain why mud flats survive in environments where sand is actively moving.
::: solution
$$
\frac{\tau_{cr}(\text{mud})}{\tau_{cr}(\text{sand})} = \frac{1.0\times(\rho_s - \rho_f) g\times5\times10^{-6}}{0.045\times(\rho_s - \rho_f) g\times1\times10^{-4}} = \frac{1.0\times5\times10^{-6}}{0.045\times10^{-4}} = \frac{5\times10^{-6}}{4.5\times10^{-6}} = 1.1 .
$$
The two thresholds are **nearly the same stress**, about 0.08 Pa, even though the mud grain is twenty times smaller. The mud survives in sandy environments not because its grains are individually heavy — they are not — but because they are **bonded**: by electrochemical forces when freshly deposited, and within days by the extracellular polymers of the microbial mat that colonises it, which can raise the erosion threshold by an order of magnitude. This is the **bedform-biota** interaction, and it is the reason that the Proterozoic, before animals burrowed and broke up microbial mats, preserved vast areas of stromatolitic and microbially induced sedimentary structure that the Phanerozoic does not make.
:::
:::

::: exercise Transport nonlinearity {level=2 check="2.8"}
If bedload flux scales as $(\theta - \theta_{cr})^{3/2}$ and the shear stress on a gravel bed rises from 1.5 to 2.0 times its threshold value, by what factor does the flux rise?
::: solution
At $1.5\,\theta_{cr}$ the excess is $0.5\,\theta_{cr}$ and at $2.0\,\theta_{cr}$ it is $1.0\,\theta_{cr}$, so the excess doubles and the flux rises by
$$
\left(\frac{1.0}{0.5}\right)^{3/2} = 2^{1.5} = 2.8 .
$$
The message is that a modest increase in flood magnitude produces a large increase in sediment flux, and that the largest few per cent of floods do most of the geomorphic work.
:::
:::

::: exercise Relict deposits {level=2}
On the inner shelf 30 m deep off a large river, divers find a lag of 20-mm pebbles and well-preserved shallow-water shells. Modern current meters record bottom stresses of 0.3 Pa, and the pebbles require 1.5 Pa to move. Interpret.
::: solution
The pebbles are **relict**. They require five times the stress the modern ocean delivers, so they were emplaced by a flow that no longer exists. The two candidates are a storm of a magnitude not seen in the instrumental record, and — far more likely on an inner shelf — a **lowerstand** deposit laid down when sea level was 100 m lower and this site was a river bed or a beach. The well-preserved shells argue against a high-energy origin for the shells themselves, so the shells are probably younger than the pebbles and have colonised the lag since it was abandoned.

The general rule is that an inner shelf is a giant relict surface, because the last glacial-interglacial cycle moved the shoreline across it and left its coarsest deposits behind. Modern-process studies on such a shelf must first establish that the bed is **facially modern**, which is why the standard practice is to date the shells, to look for burrowing and for a modern fauna, and to compare the clast imbrication with the present drift direction.
:::
:::

::: exercise A graded bed {level=3}
A turbidite bed 1.2 m thick fines upward from 1.0 mm at its base to 0.05 mm at its top, and is overlain by 3 cm of mud. Using $\theta_{cr} = 0.045$, compute the basal and top boundary shear stresses, and explain why the mean grain size of the bed is a poor estimator of the flow.
::: solution
$$
\tau_\text{base} = 0.045\times1650\times9.81\times10^{-3} = 0.73\ \mathrm{Pa}, \qquad
\tau_\text{top} = 0.045\times1650\times9.81\times5\times10^{-5} = 0.036\ \mathrm{Pa}.
$$
The stress fell by a factor of twenty between the base and the top of the bed. The mean grain size of the bed, about 0.2 mm on a linear average and coarser on a $\phi$ average, corresponds to a stress of about 0.15 Pa — a value the flow attained only briefly and never again, and one that describes neither its peak nor its end.

The correct procedure is to use the **basal** grain size as the estimator of peak competence and the **bed thickness** as the estimator of the flow's duration and total mass, and to accept that the two together are a poor constraint on the flow velocity unless the bed's thickness and the flow's deposit thickness are separately known. This is why the quantitative palaeohydraulics of turbidites has moved away from grain size and toward the direct measurement of the flows themselves, which became possible only in 1987, when the timing of a 2000-km submarine cable break on the Congo Deep Sea Fan revealed that the flow that caused it had travelled some 1400 km in 25 hours and had reached a velocity of order 10 m/s at the head of the fan — the first direct measurement of a turbidity current's velocity, and one that came from a telecommunications fault report.
:::
:::

::: exercise A synthesis {level=3}
A fluvial sandbody has a $d_{50}$ that fines from 0.6 mm at its axis to 0.1 mm at 4 km from it, a sorting that improves from 1.1 $\phi$ to 0.35 $\phi$ in the same direction, and a skewness that changes from $-0.15$ to $+0.20$. Propose a depositional model and identify the observation that would distinguish it from a shoreline sand.
::: solution
All three trends are consistent with **decreasing flow competence away from a channel axis**: the grain size falls, the sorting improves as the flow becomes more winnowing relative to its total load, and the skewness becomes positive as the fines are progressively removed. The model that produces this pattern is a **channel-fill and overbank or crevasse-splay system**, in which the axis is the active channel and the flanks are the waning deposits of its floods, or a **submarine channel and its levees and spillover deposits**.

A shoreline sand gives the same three trends in the same directions — seaward the waves winnow, the sorting improves and the skewness becomes coarser. The distinguishing observations are three. **Sedimentary structures**: a fluvial sand has trough and tabular cross-bedding with unidirectional or bimodal palaeocurrents and mud drapes of flood waning, while a shoreface sand has hummocky and wave-ripple cross-lamination with oscillatory parting lineations. **The bounding surfaces**: a channel is incised into its own overbank mud with a scoured base, and a shoreface sand passes upward and landward into offshore mud with a gradational, bioturbated base and no incision. **The palaeontological and palaeocurrent geometry**: a shoreface sand has a fauna of marine infauna and a palaeocurrent field aligned with the palaeoshoreline and with the wave-dominated transport direction, whereas a channel has a freshwater or brackish fauna and a palaeocurrent field aligned with the drainage. The grain-size trends alone cannot distinguish them, and the whole of facies analysis is the refusal to interpret a grain size without its sedimentary structures.
:::
:::
