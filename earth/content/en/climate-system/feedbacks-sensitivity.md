A feedback is a change that changes something else, which changes the temperature again. The whole of climate-sensitivity science is the question of how much extra warming the planet manufactures for itself once you push it, and the answer — that the Earth roughly triples the warming that carbon dioxide alone would produce — is the reason a physical problem with a well-measured forcing has produced a range of outcomes wide enough to matter.

The forcing is known to a few per cent. The feedbacks are known to a factor of two. That asymmetry, not any doubt about the physics of infrared absorption, is what "uncertainty in climate science" actually means.

## The algebra

::: definition Feedback parameter, feedback fraction, amplification {#def-feedback}
Let $\lambda_0$ be the **Planck response**, the increase in outgoing radiation per kelvin of surface warming with everything else fixed, $\lambda_0 = 4\sigma T^3 \approx 3.2$–$3.3\ \mathrm{W\,m^{-2}\,K^{-1}}$. If a process changes the top-of-atmosphere balance by $f_i\Delta T$ per kelvin of warming, it is a feedback with parameter $f_i$, positive if it adds energy (destabilising). The balance is
$$
(\lambda_0 - \textstyle\sum_i f_i)\,\Delta T = \Delta F, \qquad \lambda_\text{net} = \lambda_0 - \sum_i f_i ,
$$
and the **amplification** relative to the no-feedback response is $A = \lambda_0/\lambda_\text{net}$. The **loop gain** is $g = f/\lambda_0$, so $A = 1/(1-g)$.
:::

::: definition Equilibrium climate sensitivity, transient response, realised warming {#def-ecs}
The **equilibrium climate sensitivity** (ECS) is the global mean surface temperature change after the climate has fully adjusted to a doubling of carbon dioxide, $\mathrm{ECS} = F_{2\times}/\lambda_\text{net}$ with $F_{2\times} = 3.7\ \mathrm{W\,m^{-2}}$ ($3.91$ in the AR6 calibration). The **transient climate response** (TCR) is the warming at the moment of doubling in an experiment where carbon dioxide rises by $1\%$ a year, roughly $70$ years. The **adjusted or realised warming ratio** (ACR) is the ratio of the warming at the time of quadrupling in such a ramp to the ECS, typically $0.7$–$0.8$. These are three different numbers about the same physics, and confusing them is the most common quantitative error in public discussion.
:::

::: proposition Why a positive feedback does not mean runaway {#prop-runaway}
A positive feedback with $f < \lambda_0$ produces a finite, convergent warming: $A = 1/(1 - f/\lambda_0)$ is bounded for $f < \lambda_0$ and diverges only as $f \to \lambda_0$. The divergence at $f = \lambda_0$ is the runaway greenhouse, and it is a genuine physical boundary — the point at which the atmosphere can no longer radiate the planet's heat to space at any surface temperature.
:::

::: proof
Iterate the response. A forcing $\Delta F$ warms the surface by $\Delta F/\lambda_0$; that warming releases $f\Delta T$ of extra forcing, which warms it by $f\Delta T/\lambda_0$ more, and so on, giving
$$
\Delta T = \frac{\Delta F}{\lambda_0}\left(1 + g + g^2 + \cdots\right) = \frac{\Delta F}{\lambda_0}\frac{1}{1-g}, \qquad g = \frac{f}{\lambda_0} < 1 .
$$
The geometric series converges for $g < 1$, which is the condition for a stable climate. With the assessed total feedback $f = 2.0\ \mathrm{W\,m^{-2}\,K^{-1}}$ and $\lambda_0 = 3.2$, $g = 0.63$ and $A = 2.7$: the system is stable, but it is stable in the way a heavy door on a soft closer is stable — it travels a long way before it stops. The Earth's current state is nowhere near $g = 1$; the Simpson–Nakamura limit of about $300\ \mathrm{W\,m^{-2}}$ of maximum infrared flux is the corresponding hard ceiling, and the planet emits $240$.
:::

::: example One feedback at a time {#ex-decomp}
In a standard decomposition (Soden and others, 2008) the response to a carbon-dioxide doubling in one model is built up feedback by feedback: $1.17\ \mathrm{K}$ with none, $1.84$ with water vapour, $2.40$ adding clouds, $2.72$ adding the lapse rate, $2.94$ adding surface albedo and $2.99$ with everything. Convert this into feedback parameters and amplifications.
::: solution
Since $\lambda_\text{net} = F_{2\times}/\Delta T$, the successive net feedback parameters are $3.16$, $2.01$, $1.54$, $1.36$, $1.26$, $1.24\ \mathrm{W\,m^{-2}\,K^{-1}}$, and the individual feedbacks are therefore

| added feedback | $f_i\ (\mathrm{W\,m^{-2}\,K^{-1}})$ | amplification after |
|---|---|---|
| water vapour | $1.15$ | $1.57$ |
| clouds | $0.47$ | $2.05$ |
| lapse rate | $0.18$ | $2.32$ |
| surface albedo | $0.10$ | $2.51$ |
| remaining | $0.02$ | $2.56$ |

Two lessons. The water-vapour feedback is the largest and the surface-albedo feedback the smallest in a model that has already lost most of its summer sea ice — the ranking changes with the climate state, which is why albedo dominates in palaeoclimate and clouds dominate in the present problem. And the decomposition is **path-dependent**: adding the feedbacks in a different order gives different individual values for the same total, because they interact. Any table of feedback strengths is a convention, not a measurement, until the order and the protocol are stated.
:::
:::

::: widget plot
f: 3.7/(3.2-x)
x: 0, 2.4
y: 0, 10
caption: Equilibrium climate sensitivity as a function of the total feedback strength $f$, $\mathrm{ECS} = 3.7/(3.2 - f)$. The curve is flat for small feedbacks and then explodes: $f = 1.0$ gives $1.9\ ^\circ\mathrm{C}$, $f = 2.0$ gives $3.1$, $f = 2.4$ gives $4.6$ and $f = 2.9$ gives $12$. This is why a cloud feedback uncertain by $\pm0.5\ \mathrm{W\,m^{-2}\,K^{-1}}$ — which is the size of the uncertainty — produces a sensitivity range of several degrees, and why the sensitivity distribution is skewed with a long high tail rather than symmetric.
:::

## The five feedbacks

::: definition The water-vapour feedback {#def-wv}
A warmer atmosphere holds more water vapour, following Clausius–Clapeyron at about $7\%$ per kelvin, and water vapour absorbs in the terrestrial infrared. With relative humidity approximately conserved — which is what general-circulation models and observations both show over most of the globe — the extra vapour adds $1.0$–$1.3\ \mathrm{W\,m^{-2}}$ of forcing per kelvin of surface warming. It is the largest single feedback and the best understood: it is a thermodynamic consequence of warming, not a hypothesis about it.
:::

::: definition The lapse-rate feedback and the surface-albedo feedback {#def-lr-sa}
The **lapse-rate feedback** is the change in outgoing radiation caused by the fact that a warming tropics warms more aloft than at the surface, following a moist adiabat; since emission to space comes largely from the upper troposphere, the tropics radiate more efficiently, giving a *negative* tropical feedback of $-0.3$ to $-0.5\ \mathrm{W\,m^{-2}\,K^{-1}}$. Around the Antarctic and Arctic the sign reverses, because the surface sits in a temperature inversion and warms while the free troposphere barely does, and the continents warm faster than the oceans at every height. The global net is therefore small and of either sign, assessed slightly positive at $+0.2$ to $+0.4\ \mathrm{W\,m^{-2}\,K^{-1}}$ — one of the few places where a textbook sign and an assessed sign disagree, and the reason the careful literature reports "lapse rate plus water vapour" as a single quantity. The **surface-albedo feedback** is the exposure of dark ocean and land as snow and ice retreat, worth $+0.1$ to $+0.7\ \mathrm{W\,m^{-2}\,K^{-1}}$ globally and far more regionally; it is the main reason the Arctic warms two to four times faster than the globe.
:::

::: warning Clouds are the whole uncertainty, and here is why they are hard
Clouds do two opposite jobs. They reflect sunlight, which cools, and they trap outgoing infrared, which warms; the net cloud forcing today is about $-16\ \mathrm{W\,m^{-2}}$, so the cooling wins by a factor of two. A warming world could make clouds more reflective (more liquid water in a more stable boundary layer), or thinner (shallower, shallower trade-wind cumulus decks), or higher and thinner (which warms), or it could shift them poleward out of the bright tropics (which warms). The assessed cloud feedback is $+0.2$ to $+0.8\ \mathrm{W\,m^{-2}\,K^{-1}}$ with a spread of about $\pm0.5$, and that single term accounts for most of the difference between a model with ECS $2.4$ and one with ECS $4.5$. The physical difficulty is scale: the feedback is controlled by the entrainment of dry air into centimetre-scale cumulus towers and by whether a model's droplets activate on the right number of aerosol particles, neither of which is resolved in a $100\ \mathrm{km}$ grid box. Process models at metre resolution now say the low-cloud feedback is probably positive; they do not yet say by how much.
:::

::: example How much does one cloud feedback matter? {#ex-cloudspread}
Two models agree on everything except the cloud feedback. Model A has $\lambda_\text{net} = 1.37\ \mathrm{W\,m^{-2}\,K^{-1}}$; model B's cloud feedback is $0.5\ \mathrm{W\,m^{-2}\,K^{-1}}$ more positive. Find both sensitivities, and the warming each implies for $2.9\ \mathrm{W\,m^{-2}}$ of forcing held constant for a thousand years.
::: solution
Model A: $3.7/1.37 = 2.7\ ^\circ\mathrm{C}$. Model B: $3.7/0.87 = 4.3\ ^\circ\mathrm{C}$. At $2.9\ \mathrm{W\,m^{-2}}$ they give $2.1$ and $3.3\ ^\circ\mathrm{C}$.

A single unresolved process, uncertain by half a watt per square metre per kelvin, moves the answer by $1.2\ ^\circ\mathrm{C}$ — which is about the difference between the Paris Agreement being achievable and it being impossible. Note also the nonlinearity: the same $0.5$ reduction applied to a model with $\lambda_\text{net} = 0.9$ would take the sensitivity from $4.1$ to $9.3$. Sensitivity is a ratio with the uncertain quantity in the denominator, so errors are amplified asymmetrically and the distribution of plausible sensitivities has a fat upper tail. Every Bayesian assessment of ECS inherits that skew.
:::
:::

::: widget plot
f: 3.7/x
x: 0.8, 3.4
y: 1, 6
caption: Equilibrium climate sensitivity against the net feedback parameter, $\mathrm{ECS} = 3.7/\lambda_\text{net}$. The assessed value $\lambda_\text{net} = 1.16\ \mathrm{W\,m^{-2}\,K^{-1}}$ (IPCC AR6, 2021) gives $3.2\ ^\circ\mathrm{C}$, and the likely range of sensitivities $2.5$–$4.0\ ^\circ\mathrm{C}$ corresponds to $\lambda_\text{net}$ between $1.48$ and $0.93$ — a range of half a watt, which is less than the uncertainty in the aerosol forcing alone. The vertical asymptote at zero is the runaway limit; the fact that the assessed range sits far from it is the reason "runaway climate change" is not a scientific claim.
:::

## Three ways to measure the unmeasurable

::: example The historical constraint and its pattern-effect bias {#ex-historical}
Observed warming since 1850–1900 is $1.09\ \mathrm{K}$ and the 2019 anthropogenic effective forcing is $2.7\ \mathrm{W\,m^{-2}}$. Estimate the realised response parameter, and explain why this estimate of ECS is biased low.
::: solution
$\Delta T/\Delta F = 1.09/2.7 = 0.40\ \mathrm{K}$ per $\mathrm{W\,m^{-2}}$, equivalent to $\lambda = 2.5\ \mathrm{W\,m^{-2}\,K^{-1}}$ — a long way from the equilibrium $1.16$. Two corrections are needed. The first is the transient deficit: the ocean has not finished responding, and the realised warming ratio is $0.7$–$0.8$ even at quadrupling, so the equilibrium response is larger than the observed one by $25$–$40\%$. The second is the **pattern effect**.

The historical forcing was applied in a peculiar pattern: sulphate aerosols sat over the industrial Northern Hemisphere and its oceans, keeping that region cool and, more importantly, keeping the tropical Pacific sea-surface pattern in a state that *increased* low cloud and exported heat to depth. Model experiments in which only the aerosol forcing varies reproduce this pattern and give an ECS-like response $0.4$–$0.6\ \mathrm{K}$ larger than the historical fit (Andrews and others, 2019; Sherwood and others, 2020). Correcting for it is the main reason the historical line of evidence, once dismissed as too uncertain, now agrees with the palaeoclimate and process lines.
:::
:::

::: example The palaeoclimate constraint {#ex-palaeo}
During the Pliocene Warm Period, about three million years ago, carbon dioxide was $380$–$450\ \mathrm{ppm}$ and global mean temperature was $2.5$–$3\ ^\circ\mathrm{C}$ above pre-industrial, with sea level $5$–$25\ \mathrm{m}$ higher. Estimate the sensitivity implied by the forcing alone, and state the two reasons the estimate is not simply $\Delta T/\Delta F$.
::: solution
The forcing of $420\ \mathrm{ppm}$ relative to $278$ is $5.35\ln(420/278) = 2.2\ \mathrm{W\,m^{-2}}$. With $\Delta T \approx 2.75\ \mathrm{K}$ this gives $\lambda_\text{net} = 0.80\ \mathrm{W\,m^{-2}\,K^{-1}}$ and an ECS of $4.6\ ^\circ\mathrm{C}$ — above the assessed likely range.

First, the Pliocene included feedbacks that the standard ECS definition excludes: the retreat of the West Antarctic and Greenland ice sheets, the loss of Arctic sea ice, and changes in vegetation and in the ocean's carbon uptake. These are "slow" or "long" feedbacks, and including them raises the apparent sensitivity, which is why palaeoclimate constrains a *higher* sensitivity than the ECS definition contemplates. Second, the equilibrium assumption is only approximately right: three million years is long for ice sheets but not for the deep ocean, whose heat uptake was still ongoing. The AR6 synthesis of the Pliocene, the Last Glacial Maximum, the mid-Holocene and the PETM assessed ECS at $3.4\ ^\circ\mathrm{C}$ with a likely range of $2.2$–$5.6\ ^\circ\mathrm{C}$ — the widest of the three lines, and the only one that samples climates with no ice sheets in it.
:::
:::

::: quiz
Which single feedback contributes most to the spread of equilibrium climate sensitivity between models?
- [ ] Water vapour, because humidity is poorly observed.
- [ ] Surface albedo, because sea ice is hard to model.
- [x] Clouds, especially the low clouds of the subtropical trade-wind regions.
- [ ] The lapse rate, because it depends on convection.
::: solution
Clouds. Water vapour is thermodynamically pinned by Clausius–Clapeyron and contributes little to the *spread*; the lapse rate and surface albedo are moderately well constrained by theory and by satellite observations of the seasonal cycle. Low-cloud amount and reflectivity in the eastern subtropical oceans respond to stability, aerosol and entrainment in ways that depend on sub-grid parameterisation, and models disagree in sign as well as magnitude.
:::
:::

::: history
Svante Arrhenius (Arrhenius) in 1896 included a water-vapour feedback by assuming relative humidity was conserved — an assumption that has survived every model since. Guy Callendar (Callendar) in 1938 estimated a sensitivity of about $2\ ^\circ\mathrm{C}$ from the observed record. Mikhail Budyko (Budyko) in 1969 made the ice-albedo feedback the centre of climate theory and, with it, the possibility of hysteresis and of two stable states. William Sellers (Sellers) in 1973 showed that the sensitivity of one-dimensional models to cloud amount and height was so large that the cloud feedback had to be settled before anything could be said. Alan Robock (Robock) in 1983 demonstrated that the sign of the cloud response depends on whether cloud liquid water or cloud amount is held fixed, which is why the field spent a decade arguing past each other. The Charney report (Charney) of 1979 set the range $1.5$–$4.5\ ^\circ\mathrm{C}$ and named clouds and the ocean as the two open questions. Schlesinger (Schlesinger) and Manabe produced the first balanced coupled-model estimates in the 1990s and 2000s. Andrew Abbot (Abbot), Daniel Koll (Koll) and Tapio Schneider (Schneider) showed in the 2010s that the maximum infrared flux a saturated atmosphere can carry — the Simpson–Nakamura limit, first derived in 1927 — is about $300\ \mathrm{W\,m^{-2}}$, giving the runaway a hard number. Steven Sherwood (Sherwood), Kari Storelvmo (Storelvmo) and others narrowed the range with observational constraints in 2016–2020, Storelvmo by arguing that sensitivities below $2\ ^\circ\mathrm{C}$ require cloud feedbacks that no physical model can produce; the CMIP6 ensemble briefly pushed the upper end to $5.3\ ^\circ\mathrm{C}$ before several of its high-sensitivity models were shown to have a low-cloud parameterisation inconsistent with the observed seasonal cycle. AR6 (2021) concluded $3.2\ ^\circ\mathrm{C}$, likely above $2.5$ and extremely unlikely above $5$ — the first time an assessment said that low sensitivities could be ruled out.
:::

## Where this leads

Sensitivity converts forcing into warming in [[climate-system/forcing]]; the ocean's role in delaying the answer is in [[climate-system/heat-transport]] and [[oceanography/overturning]]; the observations used to constrain the feedbacks are in [[climate-change/observed-change]]; the resulting projections are in [[climate-modelling/ensembles-scenarios]]; and the ice-albedo and slow feedbacks that dominate deep time are in [[palaeoclimate/deep-time]] and [[glaciology/ice-sheets]].

::: summary
- Feedbacks are written as $\lambda_\text{net}\Delta T = \Delta F$ with $\lambda_\text{net} = \lambda_0 - \sum f_i$; the amplification is $\lambda_0/\lambda_\text{net}$ and diverges only as $\lambda_\text{net} \to 0$.
- The Planck response alone gives $1.1\ \mathrm{K}$ for a doubling; water vapour nearly doubles it; clouds, lapse rate and surface albedo bring the total to about three times.
- Clouds contribute most of the spread because they both cool and warm, and because the processes that decide which dominate are sub-grid.
- ECS, TCR and realised warming are different numbers: $3.2$, $1.8$ and $1.1\ ^\circ\mathrm{C}$ respectively for the present, and the ocean has so far delivered only about half of the warming the current forcing commits to.
- Three independent lines — the historical record with its pattern-effect correction, the palaeoclimate of ice-free and ice-age worlds, and process models of clouds — now agree that sensitivity is around $3\ ^\circ\mathrm{C}$ and almost certainly above $2$.
- A positive feedback is not a runaway: the assessed loop gain is $0.63$, and the hard ceiling is the $300\ \mathrm{W\,m^{-2}}$ Simpson–Nakamura limit against the planet's current $240$.
:::

## Exercises

::: exercise Amplification {level=1 check="1.6"}
A feedback has $f = 1.2\ \mathrm{W\,m^{-2}\,K^{-1}}$ and $\lambda_0 = 3.2$. Find the amplification and the loop gain.
::: solution
$A = 3.2/(3.2 - 1.2) = 1.6$; $g = 1.2/3.2 = 0.38$. The feedback adds $60\%$ to the warming.
:::
:::

::: exercise Sensitivity from the feedback parameter {level=1 check="3.2"}
Find the ECS for $\lambda_\text{net} = 1.16\ \mathrm{W\,m^{-2}\,K^{-1}}$ and $F_{2\times} = 3.7\ \mathrm{W\,m^{-2}}$.
::: solution
$3.7/1.16 = 3.2\ ^\circ\mathrm{C}$, the AR6 best estimate. Using the AR6 forcing of $3.91$ gives $3.4\ ^\circ\mathrm{C}$; assessments differ by which calibration they use, which is worth checking before quoting a number.
:::
:::

::: exercise Clausius–Clapeyron {level=2 check="1.07"}
By what factor does saturation vapour pressure increase over $1\ \mathrm{K}$ of warming near $288\ \mathrm{K}$?
::: solution
With $L/R_v = 5{,}400\ \mathrm{K}$, the factor is $\exp[5400\times1/288^2] = 1.067$, about $7\%$. Holding relative humidity fixed therefore raises column water vapour by about $7\%$, which is the physical content of the water-vapour feedback and of the observed intensification of heavy rainfall.
:::
:::

::: exercise The cloud swing {level=2 check="4.3"}
Model A has $\lambda_\text{net} = 1.37$ and model B has a cloud feedback $0.5\ \mathrm{W\,m^{-2}\,K^{-1}}$ stronger. Find both ECS values.
::: solution
$3.7/1.37 = 2.7$ and $3.7/0.87 = 4.3\ ^\circ\mathrm{C}$. The $1.6\ ^\circ\mathrm{C}$ difference comes from one term in one parameterisation.
:::
:::

::: exercise Loop gain near the boundary {level=2 check="9.3"}
Find the amplification for $f = 2.8$ and $\lambda_0 = 3.2$, and for $f = 3.0$.
::: solution
$A = 3.2/0.4 = 8.0$ and $3.2/0.2 = 16$. Sensitivity is hypersensitive near $g = 1$: the same increment of feedback is worth ten times more warming there than at $g = 0.4$. This is the mathematical reason the sensitivity distribution has a long upper tail and why ruling out high sensitivities is much harder than ruling out low ones.
:::
:::

::: exercise Committed warming {level=2 check="2.5"}
The 2022 anthropogenic effective forcing is $2.9\ \mathrm{W\,m^{-2}}$ and realised warming is $1.2\ \mathrm{K}$. Find the equilibrium warming implied by the assessed feedback parameter and the fraction already realised.
::: solution
$2.9/1.16 = 2.5\ ^\circ\mathrm{C}$, of which $1.2/2.5 = 48\%$ has appeared. Holding emissions at zero is the only way to stop the number rising; holding them constant at today's level keeps adding forcing, and the committed warming grows with every year of delay.
:::
:::

::: exercise The transient deficit {level=3}
In a $1\%$-per-year carbon-dioxide increase, the warming at doubling (year 70) is $1.8\ \mathrm{K}$ and at quadrupling (year 140) it is $4.6\ \mathrm{K}$ against an ECS of $3.2\ \mathrm{K}$ per doubling. Find the TCR and the realised warming ratio, and explain why the ratio is below one.
::: solution
$\mathrm{TCR} = 1.8\ \mathrm{K}$, so $\mathrm{ACR} = 4.6/(2\times3.2) = 0.72$. The ratio is below one because the ocean has a mixed-layer heat capacity of $4\times10^{8}\ \mathrm{J\,m^{-2}\,K^{-1}}$ and a diffusive time scale of centuries: heat is being buried faster than the surface can radiate it back, which is the same effect that makes a volcanic cooling of $-2.8\ \mathrm{W\,m^{-2}}$ produce only $0.4\ \mathrm{K}$.
:::
:::

::: exercise An emergent constraint {level=3}
Across a model ensemble, ECS correlates with observed mean low-cloud reflectivity in the eastern subtropics with $r = -0.72$. The ensemble mean ECS is $3.6\ ^\circ\mathrm{C}$ with a spread of $0.8$, the observed reflectivity lies $0.9$ standard deviations above the ensemble mean, and the regression slope is $-1.4\ ^\circ\mathrm{C}$ per standard deviation. Estimate the constrained ECS and its residual uncertainty.
::: solution
$\mathrm{ECS} = 3.6 + (-1.4)(0.9) = 2.3\ ^\circ\mathrm{C}$. With $r^2 = 0.52$, the residual scatter is $0.8\sqrt{1 - 0.52} = 0.55\ ^\circ\mathrm{C}$, so roughly $2.3 \pm 0.6\ ^\circ\mathrm{C}$ — but only as good as the assumption that the correlation is causal and that the real world lies inside the ensemble's range of behaviour.

This is how most modern sensitivity constraints work, and their weaknesses are known: models that are wrong for the same reason correlate with each other, satellite reflectivities carry retrieval biases over the dark ocean, and an ensemble that does not contain the truth cannot constrain it. The reason AR6 moved to a narrower range than the CMIP6 ensemble spread is precisely that several such constraints, using different observations and different physics, pointed the same way.
:::
:::

::: exercise Slow feedbacks {level=3}
The Last Glacial Maximum was about $5\ ^\circ\mathrm{C}$ colder than pre-industrial with carbon dioxide at $190\ \mathrm{ppm}$; the Pliocene was about $2.75\ ^\circ\mathrm{C}$ warmer at $420\ \mathrm{ppm}$. Estimate the feedback parameter implied by each, and explain why the glacial value is larger in magnitude than the modern assessed value.
::: solution
Glacial: $\Delta F = 5.35\ln(190/278) = -2.0\ \mathrm{W\,m^{-2}}$, so $\lambda = 2.0/5 = 0.40\ \mathrm{W\,m^{-2}\,K^{-1}}$. Pliocene: $2.2/2.75 = 0.80$. Both are far below the assessed $1.16$.

The reason is that both worlds engaged feedbacks that the modern ECS definition excludes: enormous ice sheets and ice-albedo change in the glacial case, and ice-sheet, vegetation and permafrost changes in the Pliocene. The lesson cuts both ways. Sensitivity measured in a world with big ice sheets or none is not the sensitivity of the world we are in — and the world we are entering, once West Antarctica and Greenland are committed, will behave more like the Pliocene number than the Holocene one. That is the content of the claim that the slow feedbacks make the long-run answer worse than the ECS suggests.
:::
:::
