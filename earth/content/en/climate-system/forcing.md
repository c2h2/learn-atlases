Radiative forcing is the unit in which the causes of climate change are compared. It answers a single question in a single number: by how many watts per square metre does this perturbation — a gas, a smoke cloud, a cut-down forest, a volcano, the eleven-year sunspot cycle — shift the balance at the top of the atmosphere, once the stratosphere has had time to settle? Without such a quantity there is no way to decide whether aviation or agriculture or coal matters more, and with it there is a ranking, a budget, and an arithmetic that carries you from emissions to degrees.

The concept is also the most abused quantity in the field, because a watt is a watt only if the climate responds to every watt the same way. It does not. Both halves of this chapter matter: how forcings are computed, and what their limits are.

## The definition and its adjustments

::: definition Radiative forcing and effective radiative forcing {#def-forcing}
The **radiative forcing** of a perturbation is the change in the net (downward minus upward) irradiance at the tropopause, with stratospheric temperatures allowed to adjust to radiative equilibrium and with tropospheric temperatures, water vapour, clouds and surface conditions held at their original values. The **effective radiative forcing** (ERF) relaxes the last condition and allows the fast, within-a-year adjustments of clouds, water vapour and lapse rate, while still excluding the slow feedback of surface temperature change. Both are in $\mathrm{W\,m^{-2}}$, both are global annual means, and neither is a temperature.
:::

The stratospheric adjustment is not a technicality. Carbon dioxide absorbs little solar radiation, but it cools the stratosphere by emitting infrared to space; when that layer cools, it emits less downward, which is an extra loss. Allowing the stratosphere to adjust reduces the forcing of a doubling from $4.4$ to $3.7\ \mathrm{W\,m^{-2}}$, a reduction of $16\%$ that every assessment has carried since 1990. The fast tropospheric adjustments are larger still for some agents: for methane they add about $15\%$, and for black carbon deposited on snow the adjustments more than double the temperature effect of the nominal forcing.

::: proposition The closed-form forcings, and why carbon dioxide is logarithmic while methane is a square root {#prop-forcing-formulae}
For well-mixed gases the forcing is, to a few per cent over the range of interest,
$$
\Delta F_{\mathrm{CO}_2} = 5.35\ln\frac{C}{C_0}, \qquad
\Delta F_{\mathrm{CH}_4} = 0.0365\left(\sqrt{M}-\sqrt{M_0}\right)\left(1 + 1.69\times10^{-5}(M-M_0) + 0.0032(\sqrt{N}-\sqrt{N_0})\right),
$$
$$
\Delta F_{\mathrm{N_2O}} = 0.12\left(\sqrt{N}-\sqrt{N_0}\right)\times(\text{same bracket}),
$$
with concentrations in ppm for carbon dioxide and ppb for the others, and with the bracket accounting for the spectral overlap between methane and nitrous oxide (Myhre and others, 1998).
:::

::: proof
The two functional forms come from the shape of the absorption bands. In a pressure-broadened atmosphere the optical depth of an *isolated* line grows as the square root of the absorbing mass, because the line widens into its own wings as more gas is added; a band made of comparable lines therefore saturates as $\sqrt{C}$, which is why methane and nitrous oxide — narrow bands of similar-strength lines — follow the square-root law. The $15\ \mu\mathrm{m}$ carbon dioxide band is different: it contains lines spanning four orders of magnitude in strength, so as concentration rises, successively weaker lines come into play and the total absorption grows roughly in proportion to the logarithm of the amount. The logarithm is not an approximation to a saturation curve; it is what a very wide range of line strengths does. This is also why the formulae are valid only over the range they were fitted to: the carbon dioxide expression is good to about $10\%$ between $200$ and $1{,}200\ \mathrm{ppm}$, and the methane expression degrades above about $2{,}000\ \mathrm{ppb}$.
:::

::: example The forcing of the industrial era, computed {#ex-era}
Using the closed forms, find the forcings of carbon dioxide ($278 \to 410\ \mathrm{ppm}$), methane ($722 \to 1{,}870\ \mathrm{ppb}$) and nitrous oxide ($270 \to 332\ \mathrm{ppb}$) between 1750 and 2019.
::: solution
$$
\Delta F_{\mathrm{CO_2}} = 5.35\ln\frac{410}{278} = 2.08,\quad
\Delta F_{\mathrm{CH_4}} = 0.0365(43.2 - 26.9)\times1.025 = 0.61,\quad
\Delta F_{\mathrm{N_2O}} = 0.12(18.2 - 16.4)\times1.025 = 0.22\ \mathrm{W\,m^{-2}} .
$$

The three sum to $2.9\ \mathrm{W\,m^{-2}}$, and adding the halocarbons (about $0.3$ and falling, because the Montreal Protocol works) gives roughly $3.2$ — consistent with the assessed well-mixed greenhouse-gas total of $+3.07\ \mathrm{W\,m^{-2}}$ for 2019 relative to 1750 (IPCC AR6, 2021). Carbon dioxide alone is about seven tenths of it. Note that the assessed total is *not* the sum of the individual best estimates: the terms are constrained jointly, and the aerosol and sensitivity uncertainties are strongly anti-correlated, which is why an assessment's headline total is never obtained by adding its table.
:::
:::

::: widget plot
f: 5.35*ln(x/278)
x: 278, 700
y: 0, 5.2
caption: Carbon-dioxide radiative forcing against concentration, relative to the pre-industrial $278\ \mathrm{ppm}$. The curve passes through $2.1\ \mathrm{W\,m^{-2}}$ at today's $410$, $3.7$ at the doubling ($556$) and $4.9$ at $700$. Because it is a logarithm, the *increments* are linear in the number of doublings: each further doubling costs the same $3.7\ \mathrm{W\,m^{-2}}$ whether you start from $278$ or from $1{,}112\ \mathrm{ppm}$.
:::

## The budget of causes

::: definition Forcing efficacy {#def-efficacy}
The **efficacy** $\varepsilon$ of a forcing agent is the ratio of its global mean surface temperature change per unit forcing to that of a reference carbon-dioxide forcing of the same magnitude, so that $\Delta T = \varepsilon\lambda\Delta F$ with $\lambda$ the climate sensitivity parameter. Efficacy differs from one because agents are applied in different places, at different times of day and different heights, and therefore excite different feedbacks.
:::

::: example The scale of the causes {#ex-scale}
Rank these by forcing in $\mathrm{W\,m^{-2}}$: the eleven-year solar cycle ($\Delta\text{TSI} \approx 1.7\ \mathrm{W\,m^{-2}}$); the 1991 Pinatubo eruption; a carbon-dioxide doubling; the change in summer insolation at $65\ ^\circ\mathrm{N}$ between a precession extreme and today; total anthropogenic forcing in 2019.
::: solution
Solar cycle: $1.7\times(1 - 0.30)/4 = 0.30\ \mathrm{W\,m^{-2}}$, usually quoted as $0.22$–$0.30$. Pinatubo: the stratospheric sulphate cloud gave a forcing of order $-2$ to $-3\ \mathrm{W\,m^{-2}}$ for about eighteen months and cooled the globe by about $0.4\ \mathrm{K}$. Carbon-dioxide doubling: $3.7\ \mathrm{W\,m^{-2}}$ (or $3.91$ in the AR6 calibration). $65\ ^\circ\mathrm{N}$ summer insolation over a precession cycle: up to $21\ \mathrm{W\,m^{-2}}$, but in one season at one latitude. Total anthropogenic in 2019: $+2.7\ \mathrm{W\,m^{-2}}$ (likely range $2.0$–$3.5$).

The ordering is the answer to the two most common objections in one line. The sun's cycle is an order of magnitude weaker than our forcing and oscillates rather than trends. Orbital forcing is locally enormous — five times a carbon-dioxide doubling — but it is seasonal and regional, and ice ages are its *amplified* consequence, produced by ice-sheet dynamics, ice-albedo feedback and the carbon cycle, not by the insolation alone. Nobody claims $21\ \mathrm{W\,m^{-2}}$ of seasonal insolation change is small; the claim is that $2.7\ \mathrm{W\,m^{-2}}$ of sustained global forcing is not small either.
:::
:::

::: warning A watt is not a watt: efficacy ranges from about one half to four
Black carbon deposited on snow is applied over bright, high-altitude, snow-covered ground, where it removes reflection in the season when the Sun is up and the surface is otherwise an almost perfect mirror; its efficacy is assessed at two to four times that of carbon dioxide. Tropospheric ozone, formed in the polluted boundary layer of the Northern Hemisphere, has an efficacy nearer $0.6$–$0.8$ for global mean temperature, because much of it sits over land and is quickly rained out. Stratospheric ozone depletion in the 1990s had an efficacy of about two for the Southern Hemisphere, because it changed the wind as well as the heat. Comparing agents purely in $\mathrm{W\,m^{-2}}$ is therefore a first approximation, and for short-lived climate forcers — methane, hydrofluorocarbons, black carbon, contrails — it can be wrong by a factor of three. The quantity that is genuinely comparable across agents and times is the model- or observation-based temperature response, which is why the metrics used in emissions policy (the global warming potential and its successors) integrate the response rather than the forcing.
:::

::: example From tonnes to degrees in three steps {#ex-tco2}
Take the airborne fraction of emissions as $0.45$, $2.12\ \mathrm{GtC}$ per ppm, and $3.664\ \mathrm{GtCO_2}$ per $\mathrm{GtC}$. Find the forcing of $1{,}000\ \mathrm{GtCO_2}$ emitted from a pre-industrial state, and the transient warming implied by the assessed transient climate response of $0.45\ ^\circ\mathrm{C}$ per $1{,}000\ \mathrm{GtCO_2}$. What does the ratio tell you?
::: solution
$1{,}000\ \mathrm{GtCO_2} = 273\ \mathrm{GtC}$; at $45\%$ airborne, $123\ \mathrm{GtC}$ stays in the air, which is $123/2.12 = 58\ \mathrm{ppm}$, giving
$$
\Delta F = 5.35\ln\frac{336}{278} = 1.01\ \mathrm{W\,m^{-2}} .
$$

The assessed transient response is $0.45\ ^\circ\mathrm{C}$ per $1{,}000\ \mathrm{GtCO_2}$ (IPCC AR6: $0.45$ [0.27–0.63]), so the transient response parameter is $0.45/1.01 = 0.45\ \mathrm{K}$ per $\mathrm{W\,m^{-2}}$, or $2.2\ \mathrm{W\,m^{-2}}$ per kelvin. That sits exactly where it should: between the no-feedback Planck response of $3.3$ and the equilibrium net feedback of $1.16$, because the transient response is the feedbacks only partly run. The whole chain — tonnes to parts per million to watts to kelvin — is three multiplications, and it is the calculation behind every carbon budget in the IPCC's mitigation chapters ([[climate-change/emissions-budgets]]).
:::
:::

::: widget plot
f: 0.0365*(sqrt(x)-sqrt(722))
x: 722, 2200
y: 0, 1.4
caption: Methane's direct radiative forcing against concentration, relative to the pre-industrial $722\ \mathrm{ppb}$, showing the square-root form. At the modern $1{,}870\ \mathrm{ppb}$ the curve reads $0.60\ \mathrm{W\,m^{-2}}$ before the overlap correction and $0.61$ after it. The square root has a policy consequence that the logarithm does not: because the curve is steepest at low concentration, methane's forcing per tonne *falls* as its abundance rises, so a given reduction is worth slightly less each decade that we delay it — the opposite of the intuition that a scarce mitigation option gets more valuable with scarcity.
:::

## How the budget is built, and how it fails

The forcing budget is assembled from three kinds of input. Well-mixed gases come from the closed forms above, which are calibrated against line-by-line radiative transfer and are accurate to a few per cent. Ozone and its precursors require a chemistry-transport model, because ozone is not emitted but made from methane, carbon monoxide, volatile organics and nitrogen oxides in a photochemistry that depends on temperature, water vapour and circulation. Aerosols require a general-circulation model and are the weakest link by a wide margin: the direct scattering and absorption of sunlight (aerosol-radiation interactions) is measured reasonably well, but the indirect effect — how aerosol particles change the number, size, lifetime and reflectivity of cloud droplets, and how some of them seed ice — is inferred from satellites with an uncertainty of a factor of three or more.

::: example The aerosol term is the reason the past is hard {#ex-aerosol}
Total anthropogenic aerosol forcing is assessed at about $-1.1\ \mathrm{W\,m^{-2}}$ with a likely range of $-1.7$ to $-0.4$. If the true value were $-0.4$ rather than $-1.1$, what would it imply for the temperature we should already have seen, and for the sensitivity?
::: solution
With $0.7\ \mathrm{W\,m^{-2}}$ less masking, the net forcing since 1750 would be about $3.4$ rather than $2.7\ \mathrm{W\,m^{-2}}$, or $25\%$ larger. Since the observed warming is fixed at about $1.1\ \mathrm{K}$, the implied response per unit forcing would be $20\%$ *smaller* — the climate would have to be less sensitive to explain the same warming with a bigger forcing.

This is the reason the aerosol range and the climate-sensitivity range are anti-correlated in every assessment, and why narrowing either one alone is not possible: the historical record constrains their *ratio*, not either term. It is also why the clean-air programmes of the 1970s onwards have an uncomfortable arithmetic attached to them. Sulphate aerosol over Europe and North America has fallen by roughly half since 1980, unmasking perhaps $0.2$–$0.4\ \mathrm{W\,m^{-2}}$ and contributing a tenth of a degree to observed warming — a real and intended benefit of air-quality policy that also removes the only large negative term in the budget ([[climate-change/observed-change]]).
:::
:::

::: quiz
Why does allowing the stratosphere to adjust *reduce* the radiative forcing of carbon dioxide?
- [ ] Because the stratosphere is transparent to infrared.
- [x] Because carbon dioxide cools the stratosphere, and a colder stratosphere emits less radiation back down, which is an additional energy loss that partly offsets the tropospheric trapping.
- [ ] Because ozone reforms in the stratosphere.
- [ ] Because it does not; the adjustment increases it.
::: solution
The stratosphere is in radiative equilibrium and is not convecting, so more carbon dioxide means it radiates more energy to space and cools. That cooling reduces the downwelling flux it sends back towards the tropopause. The net effect is a $16\%$ reduction of the forcing of a doubling, from $4.4$ to $3.7\ \mathrm{W\,m^{-2}}$ — and it is the reason the observed stratosphere has cooled by about $1\ \mathrm{K}$ per decade, a fingerprint that no alternative hypothesis reproduces.
:::
:::

::: history
Milankovitch (Milankovitch) in 1920 computed the insolation of the past as the first quantitative forcing problem. Möller (Möller) in 1963 and Lacis & Hansen (Lacis) in 1974 produced the first band-model forcings of carbon dioxide with stratospheric adjustment. Mitchell (Mitchell) in 1971 and Rasool and Schneider (Schneider) in 1971 argued that anthropogenic aerosols might dominate and cause cooling — an argument that was wrong in its conclusion, because it ignored the residence time of aerosols (days) against carbon dioxide's centuries, but right in identifying the term that still dominates the uncertainty. Hansen and others (Hansen) in 1997 and 2000 built the first full forcing budget including aerosols in a general-circulation model. Myhre and others (Myhre) published the closed-form formulae of 1998 that every inventory still uses. Forster and Taylor (Forster) in 2006 introduced the *adjusted* forcing to cover agents with fast responses; Shine and others (Shine) in 2003 introduced efficacy; the IPCC Fifth Assessment in 2013 adopted effective radiative forcing as the standard metric, and AR6 in 2021 assessed the total anthropogenic ERF at $+2.7\ \mathrm{W\,m^{-2}}$ with the aerosol term still four-tenths wide either side. Velders and others (Velders) showed in 2007 that the Montreal Protocol had by then avoided about $1\ \mathrm{W\,m^{-2}}$ of halocarbon forcing by 2100 — the largest climate benefit of any single treaty, delivered as a side effect of protecting the ozone layer.
:::

## Where this leads

Forcing is the input to the feedback algebra of [[climate-system/feedbacks-sensitivity]], to the emissions-budget arithmetic of [[climate-change/emissions-budgets]] and to the attribution fingerprints of [[climate-change/attribution]]. The aerosol physics is in [[atmospheric-chemistry/aerosols]], the ozone chemistry in [[atmospheric-chemistry/tropospheric-ozone]], the stratospheric cooling observations in [[climate-change/observed-change]], and the orbital forcing of the ice ages in [[palaeoclimate/orbital-cycles]].

::: summary
- Radiative forcing is the perturbed minus original net irradiance at the tropopause with the stratosphere adjusted; effective radiative forcing additionally allows fast tropospheric adjustments.
- Carbon dioxide forcing is logarithmic because its band spans four orders of magnitude of line strength; methane and nitrous oxide are square-root because their bands saturate.
- The industrial-era forcings are $+2.1$ (CO$_2$), $+0.6$ (CH$_4$), $+0.2$ (N$_2$O), about $+0.3$ (halocarbons, falling), about $-1.1$ (aerosols, the largest uncertainty), $-0.15$ (land-use albedo), net $+2.7\ \mathrm{W\,m^{-2}}$.
- Efficacy ranges from about $0.6$ for tropospheric ozone to $2$–$4$ for black carbon on snow, so watts are only approximately comparable.
- Orbital forcing at $65\ ^\circ\mathrm{N}$ is five times a carbon-dioxide doubling but seasonal; the solar cycle is ten times weaker than our forcing and does not trend.
- Tonnes to degrees is three multiplications, and the transient response parameter it implies ($2.2\ \mathrm{W\,m^{-2}\,K^{-1}}$) falls between the Planck and equilibrium values, as it must.
:::

## Exercises

::: exercise Doubling {level=1 check="3.7"}
Find the radiative forcing of a carbon-dioxide doubling from $278\ \mathrm{ppm}$.
::: solution
$5.35\ln 2 = 3.7\ \mathrm{W\,m^{-2}}$. The AR6 calibration gives $3.91$, a $6\%$ difference that propagates directly into the equilibrium sensitivity.
:::
:::

::: exercise Today's forcing {level=1 check="2.2"}
Find the carbon-dioxide forcing at $422\ \mathrm{ppm}$ relative to $278\ \mathrm{ppm}$.
::: solution
$5.35\ln(422/278) = 2.23\ \mathrm{W\,m^{-2}}$, about $60\%$ of a doubling. With the net feedback of $1.16\ \mathrm{W\,m^{-2}\,K^{-1}}$ this implies $1.9\ ^\circ\mathrm{C}$ of *equilibrium* warming already committed, against the $1.1\ ^\circ\mathrm{C}$ so far realised — the gap is the ocean's thermal inertia.
:::
:::

::: exercise Square root versus logarithm {level=2 check="0.61"}
Find the methane forcing from $722$ to $1{,}870\ \mathrm{ppb}$ with the closed form, ignoring the overlap bracket.
::: solution
$0.0365(\sqrt{1870} - \sqrt{722}) = 0.0365\times16.37 = 0.60\ \mathrm{W\,m^{-2}}$. Including the overlap with nitrous oxide raises it to $0.61$.
:::
:::

::: exercise Solar against anthropogenic {level=2 check="0.30"}
Total solar irradiance varies by $1.7\ \mathrm{W\,m^{-2}}$ between solar minimum and maximum. Find the effective radiative forcing of the cycle and compare it with the forcing of $1{,}000\ \mathrm{GtCO_2}$.
::: solution
$1.7\times0.70/4 = 0.30\ \mathrm{W\,m^{-2}}$, against $1.0\ \mathrm{W\,m^{-2}}$ for $1{,}000\ \mathrm{GtCO_2}$ and $2.7\ \mathrm{W\,m^{-2}}$ for all of industrialisation. The solar cycle is also a cycle: its mean over eleven years is zero, and satellite records show no trend in total irradiance since 1979 while the planet has warmed by $0.7\ \mathrm{K}$.
:::
:::

::: exercise Volcanoes as an experiment {level=2 check="0.85"}
Pinatubo gave a forcing of $-2.8\ \mathrm{W\,m^{-2}}$ in 1992. Find the no-feedback temperature response and explain why the observed cooling was only about $0.4\ \mathrm{K}$.
::: solution
$-2.8/3.3 = -0.85\ \mathrm{K}$ with no feedbacks, and $-2.8/1.16 = -2.4\ \mathrm{K}$ at equilibrium. The observed $0.4\ \mathrm{K}$ is far below both because the forcing lasted barely two years. The mixed layer has a heat capacity of $4.1\times10^{8}\ \mathrm{J\,m^{-2}\,K^{-1}}$, so $2.8\ \mathrm{W\,m^{-2}}$ applied for two years ($1.8\times10^{8}\ \mathrm{J\,m^{-2}}$) moves it by $0.43\ \mathrm{K}$ — within error of what was seen. The equilibrium number is simply irrelevant on a two-year forcing; that is the whole reason a short-lived agent cannot be judged by its equilibrium effect, and it is the same arithmetic that makes methane's hundred-year metric differ so much from its twenty-year one.
:::
:::

::: exercise Efficacy {level=2 check="0.3"}
Black carbon on snow has a nominal forcing of $0.1\ \mathrm{W\,m^{-2}}$ and an efficacy of three. Find its temperature effect in $\mathrm{W\,m^{-2}}$-equivalent carbon dioxide, and explain why the number is large.
::: solution
$0.1\times3 = 0.3\ \mathrm{W\,m^{-2}}$-equivalent, so this single short-lived agent is worth about a tenth of the carbon-dioxide forcing despite twenty times less radiative effect. The efficacy is large because the forcing is applied where the surface is bright, cold and stable, so the local feedbacks (snow-albedo, and the fact that nothing evaporates there) amplify it, and because it is applied in spring when the Sun is up over the snow.
:::
:::

::: exercise The forcing of a mitigation {level=3}
A shipping regulation cuts sulphate emissions, reducing the aerosol forcing by $0.15\ \mathrm{W\,m^{-2}}$. Using the net feedback of $1.16\ \mathrm{W\,m^{-2}\,K^{-1}}$ and a transient parameter of $2.2$, find the equilibrium and the near-term warming, and say what else changes.
::: solution
Equilibrium $0.15/1.16 = 0.13\ \mathrm{K}$; near-term $0.15/2.2 = 0.07\ \mathrm{K}$, mostly realised within a decade because the forcing is over the Northern Hemisphere oceans and the response is fast.

The honest accounting has to include the fact that the same regulation cuts black carbon too, which is warming, so the two partly cancel; that shipping also emits carbon dioxide, which is permanent; and that the health benefit of removing particulates is measured in millions of avoided premature deaths per year and dwarfs the climate effect in every metric except centuries of carbon. This is the standard structure of a short-lived-forcer policy problem, and it is why "which aerosol?" is a more useful question than "how much?".
:::
:::

::: exercise Range arithmetic {level=3}
The 2019 total anthropogenic ERF is $2.72\ \mathrm{W\,m^{-2}}$ with a likely range of $1.96$–$3.48$, and the net feedback parameter is $1.16\ [0.9$–$1.6]\ \mathrm{W\,m^{-2}\,K^{-1}}$. Find the implied equilibrium warming range and explain why the joint range is narrower than the product of the two.
::: solution
Naively, $1.96/1.6 = 1.2\ ^\circ\mathrm{C}$ at the low end and $3.48/0.9 = 3.9\ ^\circ\mathrm{C}$ at the high end — a factor of three. The assessed equilibrium warming for the current forcing is much tighter, because the two uncertainties are anti-correlated: a large forcing combined with a large feedback would have produced more warming than we observe, and the historical record rules that combination out. The joint distribution is what the data constrain, and the marginal ranges are what the tables print, which is why reading a table of best estimates as if it were a joint distribution overstates the worst case.
:::
:::

::: exercise The Montreal dividend {level=3}
Halocarbon concentrations were projected to reach four times their 2000 levels by 2100 without the Montreal Protocol, giving about $1\ \mathrm{W\,m^{-2}}$ of extra forcing. Estimate the avoided warming and compare the treaty's benefit with the Paris Agreement's near-term effect.
::: solution
At the transient parameter of $2.2\ \mathrm{W\,m^{-2}\,K^{-1}}$, $1\ \mathrm{W\,m^{-2}}$ is $0.45\ \mathrm{K}$ by 2100 and about $0.9\ \mathrm{K}$ at equilibrium. For comparison, the pledge-based pathways of the early 2020s were consistent with roughly $2.4\ ^\circ\mathrm{C}$ of warming by 2100 against the $3.6$ of the high-emission pathway — a benefit of order $1\ \mathrm{K}$, the same size as the Montreal Protocol's, but negotiated over decades and delivered only if implemented, whereas the ozone treaty was agreed in 1987 and delivered its benefit automatically once the substitutes were engineered. The comparison is not a counsel of despair about climate policy; it is evidence that when the physics is well characterised, the substitutes exist and the treaty works, the ozone problem got solved — and that methane and aerosols, both of which have cheap abatement available, are the halocarbon-shaped opportunities of this problem.
:::
:::
