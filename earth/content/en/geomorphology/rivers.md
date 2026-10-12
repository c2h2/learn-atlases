A river is the landscape's plumbing and its sculptor at once. It carries the water that weathering needs, the sediment that weathering produces, and the energy that cuts the valley, and it does all three at once and in a way that leaves a self-organised form — a channel of a width, a depth and a velocity that adjust to the load and to the discharge, a long profile that smooths itself, and a planform that migrates, cuts off and abandons. The quantitative study of rivers is the most successful part of geomorphology because the physics is simple, the forms are measurable, and the whole system can be observed on the ground in a season.

## Channel geometry

::: definition Hydraulic geometry {#def-hydraulic-geometry}
A river's channel geometry scales with its discharge as power laws. **Downstream** (comparing different points on the same river at bankfull),
$$
W = aQ^{b}, \qquad d = cQ^{f}, \qquad u = kQ^{m}, \qquad b + f + m = 1,
$$
with the classic Leopold and Maddock exponents $b \approx 0.5$, $f \approx 0.4$, $m \approx 0.1$: a river grows **mostly wider**, somewhat deeper, and barely faster as it goes to the sea. **At a station** (comparing different discharges at the same cross-section),
$$
b \approx 0.1, \qquad f \approx 0.6, \qquad m \approx 0.3,
$$
so a rising flood grows **mostly deeper** and appreciably faster, and barely wider. The two sets of exponents sum to one because $Q = W d u$ in both cases, and the difference between them is the whole content of the concept of **channel form**: the channel is a fixed-ish container that the flood fills, and the river as a whole is a container that grows with the discharge it must carry.
:::

::: definition Resistance and the Manning equation {#def-manning}
The mean velocity of a uniform open-channel flow is given by the Manning (Manning) formula
$$
u = \frac{1}{n}\,R^{2/3}\,S^{1/2}, \qquad R = \frac{A}{P},
$$
where $R$ is the hydraulic radius, $S$ the energy slope and $n$ the roughness coefficient, which for natural channels runs from 0.02 for a clean straight dredged channel, through 0.03 for a natural channel with some vegetation, to 0.05–0.08 for a weedy, meandering, boulder or heavily vegetated channel. The Manning coefficient is not a physical constant but a **calibration**, and it absorbs the form drag of bars, bends, vegetation and bank irregularity into a single number; a value taken from a table is good to a factor of two, and a value calibrated on the reach's own gauging is good to ten per cent.
:::

::: example Gauging a channel {#ex-manning}
A trapezoidal river channel has a bed width of 40 m, a bankfull depth of 3 m, side slopes of 1 vertical to 1 horizontal, an energy slope of $3\times10^{-4}$ and a Manning $n$ of 0.035. Find the area, the hydraulic radius, the velocity and the bankfull discharge.
::: solution
$$
A = (b + m d)\,d = (40 + 3)\times3 = 129\ \mathrm{m^2},
$$
$$
P = b + 2d\sqrt{1 + m^2} = 40 + 2\times3\times1.414 = 48.5\ \mathrm{m}, \qquad
R = \frac{129}{48.5} = 2.66\ \mathrm{m},
$$
$$
u = \frac{1}{0.035}\times2.66^{2/3}\times(3\times10^{-4})^{1/2}
  = 28.6\times1.91\times0.0173 = 0.95\ \mathrm{m\,s^{-1}},
$$
$$
Q = 129\times0.95 = 123\ \mathrm{m^3\,s^{-1}} .
$$
The velocity of 0.95 m/s is enough to move sand up to about 2 mm as bedload and to keep silt in suspension, so this is a **sandy meandering river** — which is consistent with the wide, shallow, low-slope geometry.

The exercise's caution is the sensitivity to $n$. Had $n$ been taken as 0.03 instead of 0.035, the velocity would be 1.11 m/s and the discharge 143 m³/s, seventeen per cent higher, and the reconstructed palaeodischarge of an ancient channel would be wrong by the same amount with no indication from the rock. This is why palaeohydraulic reconstructions quote widths and depths, which are preserved, and treat the discharge as an order of magnitude, which is not.
:::
:::

::: widget plot
f: 25*exp(0.51*ln(x/100))
x: 10, 20000
y: 0, 400
labels: \text{bankfull width}
caption: Bankfull channel width as a function of discharge, $W = 25\,(Q/100)^{0.51}$ calibrated on a large meandering river with $W = 25\ \mathrm{m}$ at $Q = 100\ \mathrm{m^3\,s^{-1}}$. The curve is a power law with an exponent near one half, so a hundredfold increase in discharge gives a tenfold increase in width. The same plot drawn for depth (exponent 0.4, a factor of 6) and for velocity (exponent 0.1, a factor of 1.5) shows the whole downstream strategy of a river: it grows **wider**, not faster. The scatter about the curve is a factor of two to three and is largest for anabranching and braided rivers, whose "width" must be shared between channels, and for rivers constrained by valley walls or by engineering, where the exponent collapses toward zero and the river grows deeper and faster instead.
:::

## Meanders and their migration

::: definition Meander migration and cutoff {#def-meander-migration}
A meander migrates by **helical flow**: the water entering a bend is thrown outward by its own inertia, the resulting cross-bend pressure gradient drives a near-surface flow to the outside and a near-bed flow to the inside, the outside is scoured into a **pool** and a **cut bank**, and the inside builds a **point bar** of accretion-bedded sand and gravel. The **lateral migration rate** of a large meandering river is 1–10 m/yr, and the **meander belt width** is 10–14 times the bankfull channel width, which is the relation used to reconstruct a palaeochannel's size from the width of its preserved belt. A meander loop **cuts off** when the neck between two adjacent limbs is narrowed to about 2–2.5 channel widths, and the abandoned loop becomes an **oxbow**, which fills by crevasse splay, by lake sediment and by peat, and is the classic source of the fine-grained baffle in a fluvial reservoir.
:::

::: example The clock on a meander belt {#ex-meander-clock}
A meander belt is 720 m wide, its palaeochannel width is 55 m, and its point bars give a lateral migration rate of 1.8 m/yr. Find the time to sweep the belt once, the number of sweeps needed to build a 20-m-thick alluvial storey complex if each sweep leaves a 3-m storey, and the total time.
::: solution
The time for one lateral sweep across the belt is
$$
\frac{720}{1.8} = 400\ \mathrm{yr}.
$$
The channel width of 55 m is $720/13 = 55$ — consistent with the 10–14 width relation, so the belt is a single meander belt and not two superimposed ones. If each sweep leaves a 3-m storey and the sweeps are separated by vertical aggradation, a 20-m thick complex requires
$$
\frac{20}{3} = 6.7 \approx 7\ \text{sweeps},
$$
and if each sweep is followed by 3 m of aggradation the total time is $7\times400 = 2800\ \mathrm{yr}$ — but only if the aggradation rate is $3\ \mathrm{m}/400\ \mathrm{yr} = 7.5\ \mathrm{mm\,yr^{-1}}$, which is a fast-filling basin.

The more likely reading is that the belt **did not aggrade much** during the sweeps, because a meandering river that aggrades steepens its slope, becomes unstable and switches. The 20 m of alluvium is therefore more likely a **stack of separate storeys** separated by abandonment surfaces and palaeosols, each storey built in a few thousand years, with the whole complex representing tens of thousands of years and several avulsions rather than one continuous aggradation. The field test is the **number of palaeosols and of oxbow-fill lenses** between the storeys: seven storeys with seven soils is seven separate channel belts, and one storey with no soils is one aggrading belt.
:::
:::

::: history
The quantitative study of rivers begins with **du Buerg** and **Chezy**, whose coefficient of 1769 is the first resistance law, and with **Humphris and Manning**, whose 1880–90 formula is still the engineering standard. The **regime theory** — the idea that an alluvial channel adjusts its width, depth and slope to a stable relation with its discharge and sediment — is the work of **Lacey** (Lacey) in India in 1929 and of **Altul, Levin and Schoklitsch**, and it was superseded by the dimensional and hydraulic-geometry analysis of **Leopold and Maddock** (Maddock) in 1953, whose downstream and at-a-station exponents are still quoted verbatim. **Leopold and Wolman's** (Wolman) 1957 paper on channel pattern made the braided–meandering transition a function of stream power and load, and **Leopold, Emmett and MyRisch** (Leopold) in 1966 established the **bankfull** as the effective formative discharge. The helical-flow theory of bend scour is the classic of **Rozovski** (Rozovski) in 1957 and **Engelund** (Engelund), and the theory of meander growth and cutoff is the work of **Howard and Knutson** (Knutson) in 1984. The **stream-power incision law** and the analysis of the long profile are the synthesis of **Howard, Seidl and Dietrich** (Dietrich) in 1994 and of **Whipple and Dietrich**, and the knickpoint analysis is due to **Snider, Stock, van der Woerd and Kirby** (Kirby). The **alluvial architecture** of preserved channels — the storey, the ribbon, the lens, the compound bar — is the work of **Miall** (Miall), of **Allen** and of **Friend, Allen and Bridge**, and the **meander-belt width to channel width** relation used in reservoir modelling is the synthesis of **Leeder** (Leeder) in 1973 and of **Bridge and DiBlasco** in 2015. The underfit valley is a classic observation of the glacial geomorphologists **Chamberlin, Salisbury and Johnson**.
:::

::: example The effective discharge {#ex-effective}
A river's suspended-sediment rating is $Q_s = kQ^2$, and its flow-duration statistics are: $10\ \mathrm{m^3\,s^{-1}}$ for 200 days, $50$ for 100 days, $150$ for 50 days, $400$ for 12 days and $1000\ \mathrm{m^3\,s^{-1}}$ for 3 days. Which discharge does most of the geomorphic work, and what fraction of the year does it occupy?
::: solution
The annual work in each class is proportional to $Q^2\times(\text{days})$:
$$
\begin{array}{lccc}
Q\ (\mathrm{m^3\,s^{-1}}) & \text{days} & Q^2\times\text{days} & \text{share} \\ \hline
10 & 200 & 2.0\times10^{4} & 0.3\ \% \\
50 & 100 & 2.5\times10^{5} & 4.0\ \% \\
150 & 50 & 1.1\times10^{6} & 17.8\ \% \\
400 & 12 & 1.9\times10^{6} & 30.4\ \% \\
1000 & 3 & 3.0\times10^{6} & 47.5\ \%
\end{array}
$$
The **1000-m³/s flood, which runs for three days in 365 — less than one per cent of the year — carries 48 per cent of the sediment**. The two largest classes together, occupying four per cent of the year, carry 78 per cent of the load, and the river's ordinary flows, which occupy 96 per cent of the year, carry 22 per cent.

The **effective discharge** — the discharge at which the sediment-transport capacity is maximised over the flow-duration distribution — therefore lies at the top of the distribution, and its position depends on the **exponent of the rating** and on the **shape of the tail** of the flow-duration curve. With a rating exponent of 2 and a duration curve that falls as a power law, the effective discharge is commonly the 1–2-year flood, which is why the **bankfull** geometry is the formative one; but in a catchment with a steeper rating (exponent 3, typical of a bedload river whose capacity rises steeply with slope) the effective discharge moves to the 10–20-year flood, and the channel then forms to a flow much larger than bankfull and is overtopped in every ordinary flood.

The consequence for the landscape is that a river's form, its valley and its deposit are built by events that a field party will never see, and that a five-year measurement programme measures a river that does no work. The consequence for the rock record is that a channel sandstone's grain size records the **largest** flow that the bed could move, not the average one, and that a floodplain's mud is the deposit of the 96 per cent of the time when nothing else happens.
:::
:::

## The long profile

::: definition Grade, concavity and knickpoints {#def-long-profile}
A river at **grade** has a long profile that is smooth, concave-up and just steep enough to transport its load, and it is the profile that a river tends toward when its sediment supply and its water discharge are steady. The concavity arises because the **unit stream power** $\omega = \rho g Q S$ must be roughly constant for a uniform bed material, and since $Q$ grows downstream, $S$ must fall. The resulting profile is a power law $y \propto x^{1/\nu}$ with $\nu \approx 0.45$–$0.6$, and a **knickpoint** is a break in it — a reach of locally steepened gradient — caused by a fall of base level, a change in rock strength, an uplift, or a change in sediment supply. A knickpoint **migrates upstream** by incision at its head, and its position and steepness record the timing and the magnitude of the perturbation that made it.
:::

::: example A knickpoint's history {#ex-knickpoint}
A river's long profile is smooth and concave below a knickpoint and smooth and concave above it, with a 45-m step at the knickpoint 60 km from the mouth. The knickpoint's gradient is 0.06 against 0.008 downstream and 0.004 upstream. The river's incision follows the stream-power law with $n = 1.3$ and $K_u$ such that the downstream reach incises at 0.12 mm/yr. Estimate the incision rate at the knickpoint and the time since the perturbation.
::: solution
With $E = K_u A^m S^n$ and the same drainage area at the knickpoint and just downstream of it, the incision rate scales as $S^{1.3}$, so
$$
\frac{E_\text{knick}}{E_\text{down}} = \left(\frac{0.06}{0.008}\right)^{1.3} = 7.5^{1.3} = 13.6,
\qquad
E_\text{knick} = 13.6\times0.12 = 1.6\ \mathrm{mm\,yr^{-1}} .
$$
An incision rate of 1.6 mm/yr is an order of magnitude faster than the downstream reach, which is exactly what a knickpoint is: a reach where the river is cutting down fast enough to remove the perturbation.

The time since the perturbation cannot be obtained from the step height alone, because the knickpoint **also migrates upstream** as it consumes the step. If the knickpoint has retreated 60 km from the mouth and the retreat rate is comparable to the incision rate divided by the upstream gradient, $v \approx E/S_\text{up} = 1.6\times10^{-3}/0.004 = 0.4\ \mathrm{m\,yr^{-1}}$, the retreat took
$$
\frac{60\,000}{0.4} = 1.5\times10^{5}\ \mathrm{yr}.
$$
A 150-kyr-old perturbation — a fall of base level at the last interglacial, a terrace abandonment, a landslide dam, a rock-uplift pulse — is a normal Quaternary age, and the whole calculation is a first-order estimate that carries a factor of three.

The observation that would change it is the **drainage area at the knickpoint**. If the knickpoint sits at a change in rock from shale to sandstone, the steepness is a **lithological** knickpoint that is stationary rather than migrating, and the retreat calculation is meaningless; the test is whether the knickpoint coincides with a lithological contact, and whether the profile above it is consistent with the downstream rock's erodibility.
:::
:::

::: warning A river's form is a self-organised response, and it is not an equilibrium
Three cautions apply to every quantitative reading of a river or a palaeochannel. **The channel adjusts to the flow and the load, not to the mean.** A meandering river's form is set by its **bankfull** discharge — the flow that just fills the channel and does the most work on the banks — which is commonly the 1.5-year flood, and a channel in a catchment with a different flood frequency will have a different width for the same mean discharge. **The form is not in equilibrium with anything.** A river's slope, width and pattern are inherited from the load and the base level of the last glacial period as much as from the present, and many of the world's large rivers are **underfit or overfit** to their modern valleys: the Thames and the Missouri carry far less water than the valleys they occupy, which were cut under periglacial conditions with a meltwater discharge many times larger. **And the exhumed form is not the form.** A preserved palaeochannel's width is the width of the **scour**, which exceeds the bankfull width by 10–30 per cent; its depth is a **minimum**, because the thalweg is truncated by the next bar's accretion; and its grain size is the **bedload** size, not the suspended load, so a palaeocurrent analysis based on the median grain size of a channel sandstone under-estimates the flow's total sediment budget. The discipline is to state which variable is being reconstructed, which flow it records, and how much of the form is inherited.
:::

::: quiz
A river's bankfull width doubles between two gauging stations. Roughly what has happened to its discharge?
- [x] It has increased about fourfold.
- [ ] It has doubled.
- [ ] It has increased about eightfold.
- [ ] Nothing; width does not scale with discharge.
::: solution
With a downstream width exponent of about 0.5, $W \propto Q^{0.5}$, so a doubling of width means a fourfold increase in discharge. The depth will have grown by $4^{0.4} = 1.7$ and the velocity by $4^{0.1} = 1.5$, and $2	imes1.7	imes1.5 = 5.1$, close to four given the scatter in the exponents. The point is that a river's width is a **log-scale gauge of its discharge**, which is why a meander-belt width is the most useful single measurement in palaeohydrology.
:::
:::

## Where this leads

The flows and the bedforms are in [[sedimentology/sediment-transport]] and [[sedimentology/bedforms]], the deposits they leave are in [[sedimentology/continental-environments]], the slopes that feed them are in [[geomorphology/hillslopes]], the basins they fill are in [[geomorphology/drainage-basins]] and [[sedimentology/basins-sequences]], the floods are in [[hydrology/floods-droughts]] and [[natural-hazards/floods]], and the water that drives them is in [[hydrology/runoff]].

::: summary
- A river grows downstream mostly by getting wider (exponent 0.5), somewhat deeper (0.4) and barely faster (0.1); a flood at a fixed station grows mostly deeper.
- The Manning equation converts a channel's geometry and slope into a velocity, and its roughness coefficient is a calibration good to a factor of two at best.
- A meander migrates by helical flow at 1–10 m/yr, its belt is 10–14 channel widths wide, and it cuts off when its neck narrows to about two widths.
- A graded long profile is concave because the unit stream power must be roughly uniform, and a knickpoint is a migrating break in it.
- A river's form records its bankfull flow and its inherited load, not its mean discharge and not its present climate.
- A preserved channel's width is the scour width, its depth is a minimum, and its grain size is the bedload size.
:::

## Exercises

::: exercise Hydraulic geometry {level=1 check="10"}
A river's bankfull width follows $W \propto Q^{0.5}$. By what factor does the width grow when the discharge grows a hundredfold?
::: solution
$100^{0.5} = 10$. The width grows tenfold while the depth grows about sixfold ($100^{0.4} = 6.3$) and the velocity only half again ($100^{0.1} = 1.6$), and the product $10\times6.3\times1.6 = 100$ is the discharge, as it must be.
:::
:::

::: exercise At-a-station {level=1}
At a gauging station the at-a-station exponents are $b = 0.1$, $f = 0.6$, $m = 0.3$. When the discharge doubles, by what factor does the velocity rise?
::: solution
$2^{0.3} = 1.23$, a 23 per cent increase. The depth rises by $2^{0.6} = 1.52$ and the width by $2^{0.1} = 1.07$, and $1.07\times1.52\times1.23 = 2.0$ ✓. A flood is deeper and faster, not much wider.
:::
:::

::: exercise Manning {level=1 check="1.5"}
A rectangular channel 20 m wide carries water 2 m deep on a slope of $10^{-3}$ with $n = 0.03$. Find the velocity.
::: solution
$R = A/P = 40/24 = 1.67\ \mathrm{m}$, and $u = (1/0.03)\times1.67^{2/3}\times(10^{-3})^{1/2} = 33.3\times1.406\times0.0316 = 1.48\ \mathrm{m\,s^{-1}}$.
:::
:::

::: exercise Meander belt {level=2 check="45"}
A meander belt sandstone is 540 m wide. Estimate the palaeochannel width in metres and the range of uncertainty.
::: solution
$W = 540/12 = 45\ \mathrm{m}$, with a range of $540/14 = 39$ to $540/10 = 54\ \mathrm{m}$. The corresponding bankfull discharge, from a downstream hydraulic-geometry calibration, is of order $200$–$400\ \mathrm{m^3\,s^{-1}}$, good to a factor of three.
:::
:::

::: exercise Cutoff {level=2}
A meander loop has a wavelength of 1400 m, a channel width of 50 m, and a migration rate of 2.5 m/yr. Estimate the wavelength-to-width ratio, and say how long the loop has been migrating before it is likely to cut off.
::: solution
The wavelength-to-width ratio is $1400/50 = 28$, which is in the normal range of 10–30 for a meandering river. A loop cuts off when its neck narrows to 2–2.5 widths, that is 100–125 m. If the loop's amplitude is about a quarter of the wavelength, 350 m, and the neck began at roughly twice the amplitude, the neck must close from about 700 m to 110 m — a closure of 590 m at 2.5 m/yr, or
$$
\frac{590}{2.5} = 240\ \mathrm{yr}.
$$
A meander loop therefore has a **lifetime of a few centuries**, which is why a Holocene floodplain carries dozens of oxbows and why the oxbow population is a rough clock on the floodplain's age.
:::
:::

::: exercise Long profile {level=2 check="4.2"}
Using $E \propto S^{1.3}$, find the ratio of incision rates between a reach with $S = 0.05$ and one with $S = 0.0167$.
::: solution
$(0.05/0.0167)^{1.3} = 3.0^{1.3} = 4.2$. A tripling of the gradient more than quadruples the incision rate, which is why a knickpoint, once formed, cuts back faster than the perturbation that made it can be smoothed away by the rest of the profile.
:::
:::

::: exercise A palaeochannel {level=3}
A Carboniferous channel sandstone body is 380 m wide, 9 m thick, with a basal lag of 5-cm mud chips and trough cross-beds with 1.2-m sets. Reconstruct the channel's width, depth, flow depth and competence, and state the uncertainties.
::: solution
The **body width of 380 m is the meander-belt width**, so the channel was $380/12 = 32\ \mathrm{m}$ wide. The **9-m thickness** is the thickness of preserved sand, which is a minimum for the flow depth and is commonly the sum of two or three storeys; a single-storey interpretation gives a depth of 9 m, which for a 32-m-wide channel is a width-to-depth ratio of only 3.5 — far below the 10–40 of a meandering river. The body is therefore **multi-storey**, and a single palaeochannel was probably 2–4 m deep.

The **1.2-m trough sets** give a dune wavelength of $1.2/0.08 = 15\ \mathrm{m}$ and a flow depth of $15/6 = 2.5\ \mathrm{m}$, which agrees with the width-to-depth argument and confirms a 2–3-m flow. The **5-cm mud chips** give the competence at the peak of the formative flow. Taking a submerged density contrast of $1500\ \mathrm{kg\,m^{-3}}$ for a waterlogged mud chip and $\theta_{cr} = 0.045$,
$$
\tau = 0.045\times1500\times9.81\times0.05 = 33\ \mathrm{Pa},
$$
and for a 2.5-m flow this requires a slope of $33/(1000\times9.81\times2.5) = 1.35\times10^{-3}$ and, from Manning with $n = 0.04$, a velocity of
$$
u = 25\times2.5^{2/3}\times(1.35\times10^{-3})^{1/2} = 25\times1.84\times0.0367 = 1.7\ \mathrm{m\,s^{-1}} .
$$
The channel was therefore about 32 m wide, 2.5 m deep, flowing at about 1.7 m/s on a slope of $1.4\times10^{-3}$, with a bankfull discharge of order $135\ \mathrm{m^3\,s^{-1}}$.

The uncertainties are a factor of two in width, a factor of two in depth, a factor of two in $n$, and a factor of four in discharge. The honest statement is that this was a **medium-sized meandering river of the order of the Severn or the Tweed**, and that the reconstruction is good to a factor of three in discharge — which is the normal precision of palaeohydrology and is enough to compare basins and climates but not enough to date a flood.
:::
:::

::: exercise A river out of equilibrium {level=3}
A large river occupies a valley 2 km wide and 120 m deep but is itself only 300 m wide and 8 m deep. Its bedload is coarse gravel, coarser than anything its modern flow could move. Interpret, and say what the deposit it would leave looks like.
::: solution
The river is **underfit**. Its valley was cut by a flow much larger than the present one — by the classic estimates, a meltwater discharge several to ten times the modern bankfull — under **periglacial or glacial** conditions when the catchment was bare, the annual melt volume was large, and the sediment supply was coarse. The modern river is a small, sediment-starved trickle occupying the thalweg of a valley it did not make and cannot maintain, and its coarse bedload is a **relict lag** left behind as the meltwater streams winnowed the glacial outwash.

The deposit such a system leaves is diagnostic and is commonly misread. At the base is a **thick, coarse, structureless or crudely stratified gravel sheet** — the glacial outwash or the meltwater bedload — which the modern river is slowly reworking into a narrow, thin, cobble-and-boulder lag. Above it is a **thin, fine, organic-rich or palaeosol-bearing unit** of the Holocene, when the river lost its coarse load and its valley sides stabilised. The vertical succession is therefore a **coarsening-downward** or, more accurately, a **fining-upward megacycle** recording the transition from a glacial to an interglacial regime, and the modern channel's sand ribbon at the top is a fraction of a metre thick.

The interpretation is testable: the valley-fill gravels should carry a cold-climate pollen or beetle fauna at their base, should be ice-cored or contain dropstones if they are ice-contact, and should yield an OSL or radiocarbon age at their top of 11.7 ka or older. Where they do, the modern river's competence must never be used to interpret the formation of the valley, and the "channel sand" that a reservoir modeller might expect at the base of the succession is a metre thick rather than the 120 m the valley suggests.
:::
:::
