Carbon is the element that makes the Earth's surface chemistry different from every other planet we know, and it does so for two reasons that have nothing to do with biology. First, carbon bonds with itself and with four electrons, so it forms long chains and rings and can carry many different amounts of oxygen — CO, $\mathrm{CO_2}$, $\mathrm{CH_4}$, $\mathrm{CaCO_3}$ and $\mathrm{C_6H_{12}O_6}$ are all carbon, and the differences in their free energies are large enough to run a planet. Second, at the Earth's surface conditions carbon's dominant stable gas is carbon dioxide, so the atmosphere acts as the exchange counter between the rock, ocean and life reservoirs.

The numbers are startlingly asymmetric. The rock reservoir holds something like $65$–$130\times10^{6}\ \mathrm{GtC}$; the ocean $38{,}000\ \mathrm{GtC}$; soils and vegetation $2000$–$3000\ \mathrm{GtC}$; the atmosphere $890\ \mathrm{GtC}$. The fast cycle moves $100$–$200\ \mathrm{GtC}$ a year between air, ocean and land; the slow cycle moves $\sim0.3\ \mathrm{GtC}$ a year between ocean and rock. Human industry now moves $\sim11\ \mathrm{GtC}$ a year — thirty times the volcanic and weathering fluxes of the slow cycle, and about a tenth of the fast cycle's gross fluxes. That is why the atmosphere has risen from $278\ \mathrm{ppm}$ to over $420\ \mathrm{ppm}$ in 175 years, and why the carbon cycle is the chapter in which geology, chemistry and politics meet.

## The two cycles

::: definition Fast and slow carbon cycles {#def-two-cycles}
The **fast (biological–surface-ocean) cycle** exchanges carbon between atmosphere, vegetation, soils and the surface ocean, with reservoir turnover times of days to centuries: photosynthesis and respiration $120$ and $60\ \mathrm{GtC\,yr^{-1}}$, air–sea exchange $90\ \mathrm{GtC\,yr^{-1}}$ each way. The **slow (geological) cycle** exchanges carbon between the ocean–atmosphere system and the rock reservoir by silicate weathering (a sink, $\sim0.3\ \mathrm{GtC\,yr^{-1}}$ as carbon carried to the ocean as bicarbonate), carbonate and organic burial ($\sim0.3\ \mathrm{GtC\,yr^{-1}}$) and volcanic and metamorphic outgassing ($\sim0.1\ \mathrm{GtC\,yr^{-1}}$).
:::

| Reservoir | $\mathrm{GtC}$ | Turnover time |
|---|---|---|
| Atmosphere (2024, $422\ \mathrm{ppm}$) | 890 | 9 days per molecule, years for the pool |
| Vegetation and litter | 450–650 | decades |
| Soils (to 2 m) | 1500–2000 | centuries–millennia |
| Permafrost (to 3 m) | 1400–1600 | millennia |
| Surface ocean | 900 | years |
| Intermediate and deep ocean | 37 000 | 500–1000 yr |
| Fossil fuel reserves | $\sim1100$ (coal, oil, gas) | $10^{8}$ yr |
| Sediments and crust | $(65$–$130)\times10^{6}$ | $10^{8}$ yr |

The table explains the whole problem in one line: the reservoirs that exchange carbon on human timescales hold a few thousand gigatonnes, and the one we are drawing on holds about a thousand, of which we have already burned more than half.

::: proposition Airborne fraction and the carbon budget {#prop-budget}
For any period,
$$
\Delta F = S_\text{air} + S_\text{ocean} + S_\text{land},
$$
where $\Delta F$ is total emissions and $S$ the respective sink. The **airborne fraction** $\chi = S_\text{air}/\Delta F$ has averaged $0.45 \pm 0.13$ over 1960–2020 with no significant trend, despite emissions growing fourfold.
:::

::: proof
This is conservation of mass applied to the atmosphere, with the sinks defined as net fluxes: gross photosynthesis minus respiration for the land, the air–sea $p\mathrm{CO_2}$ gradient integrated over the ocean for the marine sink. The constancy of $\chi$ is an empirical result, not a theorem: it means the ocean and land sinks have grown in proportion to emissions, which is what a linear (concentration-driven) uptake would give. It does not mean the sinks are safe. The land sink is already visibly saturating in the tropics and is vulnerable to fire and drought, and the ocean sink per unit emissions is declining as the surface warms and stratifies ([[climate-change/attribution]]).
:::

::: example Reading the global carbon budget {#ex-budget}
In the early 2020s, emissions were $\sim11\ \mathrm{GtC\,yr^{-1}}$ (about $9.4$ from fossil fuels and cement, $1.6$ from land use), the atmospheric growth was $\sim5.2\ \mathrm{GtC\,yr^{-1}}$, the ocean sink $\sim2.7$ and the land sink $\sim3.1\ \mathrm{GtC\,yr^{-1}}$. Check the closure, find the airborne fraction, and find how much of the $\sim690\ \mathrm{GtC}$ emitted since 1850 is still in the air.
::: solution
$2.7 + 3.1 + 5.2 = 11.0\ \mathrm{GtC\,yr^{-1}}$: the budget closes by construction, because the sinks are estimated as residuals and their uncertainties ($\pm0.3$ ocean, $\pm0.9$ land) are the real error bars. The airborne fraction is $5.2/11 = 0.47$.

For the cumulative budget, the atmosphere has gained $(422 - 278)\ \mathrm{ppm}\times2.124\ \mathrm{GtC\,ppm^{-1}} = 306\ \mathrm{GtC}$ out of $\sim690\ \mathrm{GtC}$ emitted — an airborne fraction of $0.44$, consistent with the annual value. The remaining $384\ \mathrm{GtC}$ is in the ocean and land, mostly the ocean, and mostly in water that was at the surface in the last two centuries.

That last number is the reason the carbon cycle is unforgiving. Emissions of $\sim40\ \mathrm{GtCO_2\,yr^{-1}}$ against a remaining $1.5\ ^\circ\mathrm{C}$ budget of $\sim250\ \mathrm{GtCO_2}$ (IPCC AR6, 2021, Table TS.3, 50% probability) is six years of current emissions; against the $2\ ^\circ\mathrm{C}$ budget of $\sim1150\ \mathrm{GtCO_2}$ it is twenty-nine. Warming is close to linear in *cumulative* carbon, not in concentration, because the airborne fraction is roughly constant — which is the single most useful fact in climate policy.
:::
:::

::: widget plot
f: 315 + 0.6*(x-1958) + 0.0159*(x-1958)^2
x: 1958, 2024
y: 300, 440
caption: The Mauna Loa $\mathrm{CO_2}$ record, 1958–2024, fitted by a quadratic in time. Charles Keeling (Keeling) began the measurements in March 1958 at $315\ \mathrm{ppm}$ after being told by senior colleagues that the curve would be flat, because they believed the ocean would absorb any human emission. The quadratic term is the story: emissions have grown nearly exponentially, so the curve bends upward, and its slope — the atmospheric growth rate — has risen from about $0.8\ \mathrm{ppm\,yr^{-1}}$ in the 1960s to $2.4\ \mathrm{ppm\,yr^{-1}}$ in the 2010s. The record also has a sawtooth of $3\ \mathrm{ppm}$ here and $15\ \mathrm{ppm}$ at Barrow, Alaska: the Northern Hemisphere biosphere inhaling and exhaling a tenth of its annual photosynthesis every year.
:::

## The ocean's chemistry: why the sea is a poor sponge

::: definition The Revelle factor {#def-revelle}
Sea water's dissolved inorganic carbon (DIC, $\sim2000\ \mu\mathrm{mol\,kg^{-1}}$) is $90\%$ bicarbonate and $10\%$ carbonate, only $0.5\%$ free $\mathrm{CO_2}$. The **Revelle (buffer) factor**
$$
R = \frac{\partial\ln p\mathrm{CO_2}}{\partial\ln \mathrm{DIC}}
$$
measures how much the surface ocean's own $\mathrm{CO_2}$ pressure rises when carbon is added to it. For the pre-industrial surface ocean $R \approx 15$, ranging from about $10$ in the cold, carbonate-rich Southern Ocean to over $20$ in the North Pacific.
:::

::: example A sponge that fills up {#ex-revelle}
The entire $\sim306\ \mathrm{GtC}$ that humanity has emitted so far, if dissolved in the whole ocean, would raise its DIC by how much? Use an ocean mass of $1.4\times10^{21}\ \mathrm{kg}$. Then find the rise in surface $p\mathrm{CO_2}$ that the same carbon would cause (a) if mixed through the whole ocean and (b) if confined to the top $100\ \mathrm{m}$ (area $3.62\times10^{14}\ \mathrm{m^2}$), taking $R = 15$ and a pre-industrial $p\mathrm{CO_2}$ of $280\ \mu\mathrm{atm}$.
::: solution
$306\ \mathrm{GtC} = 2.55\times10^{16}\ \mathrm{mol}$. Through the whole ocean:
$$
\Delta\mathrm{DIC} = \frac{2.55\times10^{16}}{1.4\times10^{21}\ \mathrm{kg}} = 18\ \mu\mathrm{mol\,kg^{-1}},
$$
a $0.9\%$ increase, so $p\mathrm{CO_2}$ rises by $15\times0.9\% = 13\%$, from $280$ to $316\ \mu\mathrm{atm}$. Comfortable.

In the top $100\ \mathrm{m}$ the mass is $3.7\times10^{19}\ \mathrm{kg}$, so $\Delta\mathrm{DIC} = 686\ \mu\mathrm{mol\,kg^{-1}}$, a $35\%$ increase, and $p\mathrm{CO_2}$ would rise by $15\times35\% = 525\%$ — to about $1750\ \mu\mathrm{atm}$, far above the atmosphere. The ocean would not absorb our carbon; it would give carbon back.

The difference between the two answers is the whole physical oceanography of the carbon sink. The chemistry is generous only if the carbon can be buried in the interior, and that requires the deep circulation described in [[earth-system/circulation]] and [[oceanography/overturning]] — which is why the ocean sink is set by the ventilation rate, and why it will not grow much as the world warms and the overturning slows.
:::
:::

::: definition Ocean acidification and saturation state {#def-acidification}
Adding $\mathrm{CO_2}$ to sea water converts carbonate to bicarbonate: $\mathrm{CO_2} + \mathrm{CO_3^{2-}} + \mathrm{H_2O} \to 2\mathrm{HCO_3^-}$. Surface pH has fallen by $0.11$ units since the pre-industrial era (from $8.17$ to $8.06$), a $30\%$ increase in hydrogen ion concentration, and the aragonite saturation state $\Omega_\text{ar} = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]/K'_\text{sp}$ has fallen from about $3.4$ to $2.8$.
:::

The saturation state matters because calcifying organisms — pteropods, corals, the coccolithophores and foraminifera that build the deep-sea carbonate ooze — must precipitate from water that is supersaturated. Below the **lysocline** and **carbonate compensation depth** (about $4200\ \mathrm{m}$ in the Atlantic, $4800\ \mathrm{m}$ in the Pacific) $\Omega < 1$ and carbonate dissolves; the compensation depth rises when the ocean is loaded with carbon, which is the mechanism by which the slow cycle eventually neutralises a $\mathrm{CO_2}$ perturbation.

::: warning "Volcanoes emit more $\mathrm{CO_2}$ than people do" is off by a factor of thirty
Global volcanic and mid-ocean-ridge outgassing, including diffuse degassing through the sea floor, totals $0.3$–$0.4\ \mathrm{GtC\,yr^{-1}}$ (Fischer and Aiuppa, 2020). Human emissions are $\sim11\ \mathrm{GtC\,yr^{-1}}$: thirty times larger, and delivered in two centuries rather than continuously. The same arithmetic kills the related claim that "the $\mathrm{CO_2}$ comes from the oceans": the ocean is close to equilibrium with the atmosphere and cannot be a *net* source large enough to explain a $144\ \mathrm{ppm}$ rise, and its $\delta^{13}\mathrm{C}$ and oxygen isotope signatures show the opposite direction of flux. A third version — "plants would absorb it all" — fails on the mass balance of [[#ex-budget]]: the land sink exists, is about $30\%$ of emissions, and is already declining in places.
:::

::: proposition The isotopic fingerprint {#prop-isotopes}
Fossil carbon is depleted in $^{13}\mathrm{C}$ ($\delta^{13}\mathrm{C} \approx -25$‰ for coal and oil, $-42$‰ for thermogenic gas, versus $-7$‰ for pre-industrial air) and contains no $^{14}\mathrm{C}$. Therefore burning fossil fuel must lower both the $\delta^{13}\mathrm{C}$ and the $^{14}\mathrm{C}/^{12}\mathrm{C}$ of the atmosphere, while adding $\mathrm{CO_2}$ from any other plausible source (ocean, volcano, carbonate) would not lower $^{14}\mathrm{C}$. Both have fallen, as measured from the 1950s onwards and from herbarium and ice records before that.
:::

::: proof
The mass-balance argument is arithmetic. Adding $306\ \mathrm{GtC}$ of $\delta^{13}\mathrm{C} = -25$‰ carbon to a pre-industrial atmosphere of $590\ \mathrm{GtC}$ at $-7$‰ would give
$$
\delta = \frac{590\times(-7) + 306\times(-25)}{896} = -13.1\ \text{per mil} .
$$
The observed value is about $-8.4$‰: the air is much *heavier* than that, because the sinks do not remove carbon indiscriminately. Photosynthesis discriminates against $^{13}\mathrm{C}$ by about $18$‰ (C$_3$ plants) and air–sea gas exchange leaves the residual air about $1.6$‰ heavier, so the carbon that stays behind is isotopically light-depleted relative to the carbon that went in. Models that include the emitted mass, the emitted isotopic composition and the measured fractionations reproduce the observed $\delta^{13}\mathrm{C}$ decline of $1.4$‰; no combination of natural sources does, because none of them is $^{14}\mathrm{C}$-free. The $^{14}\mathrm{C}$ evidence is decisive and independent of any emissions inventory: after correcting for the artificial $^{14}\mathrm{C}$ from atmospheric nuclear testing, atmospheric $^{14}\mathrm{C}$ has fallen steadily since 1850 by exactly the amount required to dilute it with dead carbon.
:::

::: example How fast is unprecedented? {#ex-petm}
The Palaeocene–Eocene Thermal Maximum, 56 million years ago, is the best geological analogue for a carbon-cycle perturbation: a carbon isotope excursion of $5$–$6$‰ in bulk carbonates records the injection of $3000$–$10{,}000\ \mathrm{GtC}$ of light carbon, warming the planet by $5$–$8\ ^\circ\mathrm{C}$. If the release took $5$–$20\ \mathrm{kyr}$, what was its rate, and how does that compare with today's $11\ \mathrm{GtC\,yr^{-1}}$?
::: solution
At $4500\ \mathrm{GtC}$ over $10\ \mathrm{kyr}$ the rate is $0.45\ \mathrm{GtC\,yr^{-1}}$; at $10{,}000\ \mathrm{GtC}$ over $5\ \mathrm{kyr}$, $2\ \mathrm{GtC\,yr^{-1}}$. Today's $11\ \mathrm{GtC\,yr^{-1}}$ is five to twenty-five times faster (Zeebe and others, 2009, put the PETM rate at $0.8$–$1.1\ \mathrm{GtC\,yr^{-1}}$, about a tenth of the modern rate).

Why does the rate matter if the total is what sets the temperature? Because the rate sets how much of the carbon the Earth can buffer. Weathering and carbonate compensation respond on $10^{4}$–$10^{5}$ year timescales; the biological pump and the physical uptake of the ocean respond in decades to centuries but are limited by the Revelle factor and by stratification. Add carbon faster than the buffer machinery can act and the system behaves as if the buffer were absent — which is why the PETM's $\delta^{13}\mathrm{C}$ excursion is so large, and why the same excursion is now being written into the modern ocean at a rate the last 55 million years never saw ([[palaeoclimate/abrupt-change]], [[earth-history/mass-extinctions]]).
:::
:::

## The slow cycle and the thermostat

::: definition The silicate weathering thermostat {#def-thermostat}
Weathering of calcium silicate consumes atmospheric carbon dioxide:
$$
\mathrm{CaSiO_3} + 2\mathrm{CO_2} + \mathrm{H_2O} \to \mathrm{Ca^{2+}} + 2\mathrm{HCO_3^-} \to \mathrm{CaCO_3} + \mathrm{CO_2}.
$$
The flux depends on runoff, temperature, rock erodibility and $\mathrm{CO_2}$ itself, so a warmer, wetter Earth weathers faster and draws $\mathrm{CO_2}$ down. This negative feedback is credited with keeping the Phanerozoic ice-free and with ending the Snowball Earth episodes.
:::

::: example Three timescales of disappearance {#ex-timescales}
How long does the excess $306\ \mathrm{GtC}$ take to leave the atmosphere–ocean system by (a) the present weathering flux of $0.3\ \mathrm{GtC\,yr^{-1}}$, (b) the carbonate-compensation feedback, and (c) what fraction of it will the ocean hold after 1000 years, using the impulse response $f(t) = 0.2 + 0.3e^{-t/120} + 0.5e^{-t/1200}$?
::: solution
(a) At today's flux, $306/0.3 = 1000$ years — but the flux is not fixed. Weathering accelerates with warming and with higher $p\mathrm{CO_2}$, and the neutralisation of the extra acid by dissolving sea-floor and seafloor sediment carbonate roughly doubles the capacity. The assessed result is that about three quarters of the excess is removed within $10^{4}$–$10^{5}$ years.

(b) Full carbonate compensation, the dissolution of carbonate to restore alkalinity, operates with a timescale of $\sim10^{5}$ years, which is why the "geological fix" is not available on any human timescale.

(c) $f(1000) = 0.2 + 0.3\times10^{-3} + 0.5\times0.435 = 0.42$: after a millennium, about $40\%$ of a carbon pulse is still in the atmosphere–surface ocean system, and $f(\infty) = 0.2$ — one fifth of what we emit is, in effect, permanent on Holocene timescales. A pulse of $1000\ \mathrm{GtC}$ leaves $\sim200\ \mathrm{GtC}$, about $95\ \mathrm{ppm}$, in place for a quarter of a million years.

This is the number that separates the carbon cycle from most environmental problems. Most pollution can be diluted or degraded; carbon dioxide emitted today has a long tail with no off-switch, and the tail is set by chemistry, not by policy.
:::
:::

::: widget plot
f: 0.2 + 0.3*exp(-x/120) + 0.5*exp(-x/1200)
x: 0, 10000
y: 0, 1.05
caption: The fraction of an instantaneous carbon pulse that remains in the atmosphere–surface ocean system, as a three-branch impulse response of the kind used in Earth-system models of intermediate complexity. The fast branch ($120$ years) is the physical and biological uptake of the ocean; the slow branch ($1200$ years) is the mixing of carbon into the abyss and the beginning of carbonate neutralisation; the constant $0.2$ is the asymptote set by carbonate chemistry. The curve reproduces the assessed behaviour: about half the pulse gone in a few centuries, $40\%$ still present after a thousand years, and $20\%$ essentially forever. Different model families disagree by tens of per cent on the tail, and the disagreement is one of the largest structural uncertainties in long-term climate projection.
:::

::: warning The land sink is not a favour the biosphere owes us
Two claims circulate about "solutions" that the carbon cycle does not support. First, that $\mathrm{CO_2}$ fertilisation will keep the land taking up a third of our emissions: the fertilisation effect is real and measurable in experiments and in the satellite record of greenness, but it is offset by warming-induced respiration, by drought and fire, and by nutrient limits — nitrogen and phosphorus, not carbon, set the ceiling ([[biogeochemistry/nitrogen]], [[biogeochemistry/phosphorus-sulfur]]). Second, that soils and permafrost are a safe place to put carbon back: the $1400$–$1600\ \mathrm{GtC}$ of permafrost is held by temperature, not by chemistry, and a $10\%$ loss would be $150\ \mathrm{GtC}$, or $70\ \mathrm{ppm}$. Both of these are feedbacks pointing the wrong way, and both are already measurable.
:::

::: quiz
The ocean contains forty times more carbon than the atmosphere and could dissolve far more. Why has it taken only a quarter of our emissions?
- [ ] Because its surface is already saturated with carbon dioxide.
- [x] Because the surface water that contacts the air resists taking up more carbon (Revelle factor $\approx 15$), and reaching the large deep-ocean reservoir requires slow circulation.
- [ ] Because warming reduces solubility to zero.
- [ ] Because marine life uses the carbon first.
::: solution
Both parts of the second answer matter. Chemically, the surface ocean's bicarbonate–carbonate system means a $1\%$ rise in dissolved inorganic carbon raises its own $p\mathrm{CO_2}$ by about $15\%$, quickly erasing the air–sea gradient. Physically, $90\%$ of the ocean's carbon sits below the sunlit layer and is renewed on the century-to-millennium timescale of the overturning circulation. The ocean sink is therefore rate-limited by physics, not capped by chemistry — which is why it continues but cannot accelerate ([[oceanography/overturning]]).
:::
:::

::: quiz
Which single measurement most directly proves that the extra atmospheric $\mathrm{CO_2}$ comes from fossil fuel combustion rather than from the ocean or volcanoes?
- [ ] The seasonal cycle of $\mathrm{CO_2}$ at Mauna Loa.
- [ ] The observed rise in the ocean's dissolved inorganic carbon.
- [x] The decline of the atmospheric $^{14}\mathrm{C}/^{12}\mathrm{C}$ ratio after correction for nuclear testing.
- [ ] The fact that the radiative forcing of $\mathrm{CO_2}$ grows roughly logarithmically.
::: solution
Fossil carbon is radiometrically dead: any carbon that has been out of contact with the atmosphere for more than a few half-lives of $^{14}\mathrm{C}$ ($5730$ years) has none. Volcanic and oceanic carbon carry modern $^{14}\mathrm{C}$. So a falling $^{14}\mathrm{C}$ fraction, corrected for bomb testing, can only mean dilution by dead carbon; the matching $\delta^{13}\mathrm{C}$ decline of $1.4$‰ narrows the source further, to $\delta^{13}\mathrm{C} \approx -25$‰ material — coal, oil, gas and burned biomass. The seasonal cycle and the ocean's DIC rise are consistent with the budget but identify no source.
:::
:::

::: history
Carbon was recognised as a distinct substance by Joseph Black (Black) in Edinburgh in the 1750s, who called it "fixed air" and measured how much of it limestone released. Joseph Fourier's (Fourier) greenhouse analogy of 1824 and John Tyndall's (Tyndall) laboratory measurement of 1861 established that the gas matters; Svante Arrhenius (Arrhenius) in 1896 computed that doubling it would warm the surface by $5$–$6\ ^\circ\mathrm{C}$, and — a detail usually omitted — also argued that the ocean would take up most of it over centuries, so that the effect would be slow. The carbon cycle as a quantitative science begins with three people. Hans Suess (Suess) in 1955 noticed that the $\delta^{13}\mathrm{C}$ of modern wood and of the atmosphere was falling relative to nineteenth-century samples: fossil carbon was arriving, and it was light. Roger Revelle (Revelle) and Suess in 1957 computed the buffer factor that now bears Revelle's name and concluded that the surface ocean could not absorb a large human emission, so that "a large-scale geophysical experiment" was underway — the sentence that persuaded Charles David Keeling (Keeling) to go and measure the air. Keeling's Mauna Loa record, begun in 1958 with support from the International Geophysical Year, is the founding instrument of Earth-system science: continuous, calibrated, and still running. The Global Carbon Project, founded in 2006, has published an annual budget since, with the closure error of [[#ex-budget]] as its headline number.
:::

## Where this leads

The carbon cycle is the archetype of the reservoir–flux method of [[earth-system/reservoirs-fluxes]], the mechanism behind the carbon–climate feedback of [[earth-system/energy-balance]], and the reason the climate targets are stated in tonnes rather than degrees. Its deep-time version is in [[biogeochemistry/carbon-deep-time]] and [[earth-history/palaeozoic]]; its modern observational science in [[climate-system/carbon-climate]] and [[climate-change/emissions-budgets]]; its ocean machinery in [[oceanography/ocean-chemistry]] and [[oceanography/overturning]]; its isotope tools in [[geochemistry/stable-isotopes]]; and its removal, storage and hard limits in [[earth-resources/geothermal-storage]] and [[earth-resources/extraction-impacts]].

::: summary
- Two cycles share one element: a fast cycle of $100$–$200\ \mathrm{GtC\,yr^{-1}}$ with decades-scale reservoirs, and a slow cycle of $\sim0.3\ \mathrm{GtC\,yr^{-1}}$ with million-year reservoirs.
- Emissions of $\sim11\ \mathrm{GtC\,yr^{-1}}$ split roughly $47\%$ air, $25\%$ ocean, $28\%$ land; the airborne fraction has been stable at $0.45$ for sixty years.
- Warming is nearly linear in cumulative carbon because the airborne fraction is nearly constant; $250\ \mathrm{GtCO_2}$ is six years of current emissions.
- The Revelle factor of $\sim15$ means the ocean is a generous sink only if carbon reaches the deep ocean, which takes centuries.
- Fossil carbon is $^{13}\mathrm{C}$-poor and $^{14}\mathrm{C}$-free, so the falling $\delta^{13}\mathrm{C}$ and $^{14}\mathrm{C}$ of the air prove the source without needing any emissions inventory.
- Carbon added to the ocean lowers pH and carbonate saturation: $0.11$ pH units and $20\%$ of $\Omega_\text{ar}$ already, with a further $0.2$–$0.45$ units projected.
- The excess carbon leaves on $10^{4}$–$10^{5}$ year timescales; a fifth of it never leaves on Holocene timescales.
:::

## Exercises

::: exercise Reservoir turnover {level=1 check="7.4"}
The atmosphere holds $890\ \mathrm{GtC}$ and gross photosynthesis removes $120\ \mathrm{GtC\,yr^{-1}}$. Find the turnover time of atmospheric carbon with respect to photosynthesis.
::: solution
$\tau = 890/120 = 7.4\ \mathrm{yr}$. Compare with the $9$-day residence time with respect to precipitation and evaporation: the atmosphere's carbon is exchanged with the land fast, but the exchanges nearly cancel, which is why the net sink is only $3\ \mathrm{GtC\,yr^{-1}}$ out of $120$ gross.
:::
:::

::: exercise Airborne fraction {level=1 check="0.45"}
Over 1960–2020 cumulative emissions were $230\ \mathrm{GtC}$ and the atmosphere gained $104\ \mathrm{GtC}$. Find the airborne fraction.
::: solution
$\chi = 104/230 = 0.45$. The remaining $126\ \mathrm{GtC}$ went to the ocean and land, an average sink of $2.2\ \mathrm{GtC\,yr^{-1}}$.
:::
:::

::: exercise Carbon per ppm {level=1 check="2.12"}
Show that $1\ \mathrm{ppm}$ of atmospheric $\mathrm{CO_2}$ corresponds to about $2.1\ \mathrm{GtC}$, given a dry-air mass of $5.13\times10^{18}\ \mathrm{kg}$ and a molar mass ratio of $44/29$.
::: solution
Moles of dry air $= 5.13\times10^{18}/0.029 = 1.77\times10^{20}\ \mathrm{mol}$. One part per million is $1.77\times10^{14}\ \mathrm{mol}$ of $\mathrm{CO_2}$, containing $1.77\times10^{14}\times12\ \mathrm{g} = 2.12\times10^{15}\ \mathrm{g} = 2.12\ \mathrm{GtC}$.
:::
:::

::: exercise The Revelle factor {level=2 check="0.083"}
With $R = 12$, by what fraction must surface-ocean DIC rise to double its $p\mathrm{CO_2}$?
::: solution
$\Delta\mathrm{DIC}/\mathrm{DIC} = (\Delta p\mathrm{CO_2}/p\mathrm{CO_2})/R = 1/12 = 0.083$, i.e. $8.3\%$, or $167\ \mu\mathrm{mol\,kg^{-1}}$. With $R = 15$ the answer is $6.7\%$, or $133\ \mu\mathrm{mol\,kg^{-1}}$. This is the arithmetic behind the phrase "the ocean's surface is nearly saturated": a small addition of carbon produces a large rise in $p\mathrm{CO_2}$, which shuts off further uptake.
:::
:::

::: exercise Volcanoes against industry {level=2 check="3.6"}
Subaerial volcanism emits $0.13\ \mathrm{GtC\,yr^{-1}}$ and ridge and diffuse degassing brings the total to $0.4\ \mathrm{GtC\,yr^{-1}}$. Express this as a percentage of $11\ \mathrm{GtC\,yr^{-1}}$ of human emissions.
::: solution
$0.4/11 = 3.6\%$. Even the largest credible volcanic estimate leaves humanity emitting some twenty-five times more. A useful corollary: a very large explosive eruption emits $0.01$–$0.05\ \mathrm{GtC}$ of $\mathrm{CO_2}$, a few days of human emissions, and is remembered for *cooling* the planet, because its sulphate aerosol outweighs the gas.
:::
:::

::: exercise Isotopes {level=2}
Airborne carbon has $\delta^{13}\mathrm{C} = -8.4$‰ today against a pre-industrial $-7.0$‰, with $144\ \mathrm{ppm}$ added. If the added carbon were a mixture of fossil fuel ($-25$‰) and volcanic $\mathrm{CO_2}$ ($-5$‰), what mixture would be required by a naive two-box mass balance, and why is the exercise unphysical?
::: solution
Mass balance with $590\ \mathrm{GtC}$ at $-7.0$‰ and $306\ \mathrm{GtC}$ added:
$$
-8.4 = \frac{590\times(-7.0) + 306\,[f(-25) + (1-f)(-5)]}{896} \Rightarrow f(-25) + (1-f)(-5) = -11.1\ \text{per mil},
$$
so $f = 0.30$: only $30\%$ fossil. The exercise is unphysical because it ignores isotope fractionation by the sinks, which remove $^{13}\mathrm{C}$-depleted carbon preferentially and thereby make the residual air heavier than the mixture. The correct procedure is to run the carbon-cycle model with the measured fractionations and the known emissions, which reproduces the observed $-8.4$‰ only if essentially all the added carbon is fossil and land-use in origin. The $^{14}\mathrm{C}$ test settles it independently: volcanic and oceanic carbon carry modern $^{14}\mathrm{C}$, fossil carbon carries none.
:::
:::

::: exercise Permafrost feedback {level=3}
Permafrost holds $1500\ \mathrm{GtC}$ in the top $3\ \mathrm{m}$. If $10\%$ were mineralised, half as $\mathrm{CO_2}$ and half as $\mathrm{CH_4}$, find the added radiative forcing in ppm-equivalents and compare it with the $144\ \mathrm{ppm}$ of $\mathrm{CO_2}$ already added. Use $2.12\ \mathrm{GtC\,ppm^{-1}}$ and a 100-year methane global warming potential of $28$.
::: solution
$150\ \mathrm{GtC}$ total: $75\ \mathrm{GtC}$ as $\mathrm{CO_2}$, i.e. $75/2.12 = 35\ \mathrm{ppm}$; $75\ \mathrm{GtC}$ as $\mathrm{CH_4}$, which as a $\mathrm{CO_2}$-equivalent is $75\times28 = 2100\ \mathrm{GtC}$, i.e. $990\ \mathrm{ppm}$-equivalent over a century.

The methane dominates by a factor of thirty in the 100-year metric, which is exactly why permafrost is a scary feedback and why the metric choice matters so much: over a millennium methane oxidises to $\mathrm{CO_2}$ and its equivalence collapses to about $75\times8/2.12 \approx 280$ ppm-equivalent while the $\mathrm{CO_2}$ stays. Either way, a permafrost release of this size would be comparable to everything else in the industrial era, and it is not something the carbon cycle can buffer on any relevant timescale ([[climate-change/tipping-points]]).
:::
:::

::: exercise The compensation depth {level=3}
Adding carbon to the ocean lowers $\Omega_\text{ar}$ and deepens the lysocline. If the whole ocean's DIC rose by $100\ \mu\mathrm{mol\,kg^{-1}}$ with no change in alkalinity, by what fraction would surface $[\mathrm{CO_3^{2-}}]$ fall (take pre-industrial $\mathrm{DIC} = 1920$, $[\mathrm{CO_3^{2-}}] = 210\ \mu\mathrm{mol\,kg^{-1}}$)?
::: solution
Nearly all added $\mathrm{CO_2}$ reacts with carbonate: $\mathrm{CO_2} + \mathrm{CO_3^{2-}} + \mathrm{H_2O} \to 2\mathrm{HCO_3^-}$. So $100\ \mu\mathrm{mol\,kg^{-1}}$ of added carbon consumes close to $100\ \mu\mathrm{mol\,kg^{-1}}$ of carbonate, leaving $110\ \mu\mathrm{mol\,kg^{-1}}$: a fall of $48\%$.

That is the chemical reason ocean acidification is so nonlinear in its biological effect — the saturation state, not the $\mathrm{CO_2}$ concentration, is what controls calcification, and it falls by half for a DIC increase of only $5\%$. In the real ocean, dissolving carbonate from sediments supplies alkalinity and offsets roughly half of this, which is the same feedback that ultimately removes the carbon — at the cost of the deep-sea carbonate record, which will be dissolved out of the sediment in a future that we are setting up ([[palaeoclimate/ocean-sediments]]).
:::
:::

::: exercise The budget arithmetic {level=3}
Using the constant-airborne-fraction approximation ($\chi = 0.45$) and a climate sensitivity of $0.45\ ^\circ\mathrm{C}$ per $100\ \mathrm{GtC}$ of cumulative emission, find the warming at $1.5$ and $2.0\ ^\circ\mathrm{C}$ and the years remaining at $40\ \mathrm{GtCO_2\,yr^{-1}}$ from a 2025 starting point with $600\ \mathrm{GtCO_2}$ already emitted since 2020.
::: solution
$1.5\ ^\circ\mathrm{C}$ requires $1.5/0.45\times100 = 333\ \mathrm{GtC} = 1220\ \mathrm{GtCO_2}$ of cumulative emission; $2.0\ ^\circ\mathrm{C}$ requires $1630\ \mathrm{GtCO_2}$. Against the assessed AR6 budgets of $250$ and $1150\ \mathrm{GtCO_2}$ from 2020, the difference is the uncertainty in the transient response and in non-$\mathrm{CO_2}$ forcing, which is why the budgets are quoted with a $50\%$ probability and a range.

At $40\ \mathrm{GtCO_2\,yr^{-1}}$, $250\ \mathrm{GtCO_2}$ lasts $6$ years and $1150$ lasts $29$. If emissions fall by $7\%\ \mathrm{yr^{-1}}$ — the rate implied by many net-zero pledges — the same budgets last $40$ and $>100$ years, because a geometric series sums: $\sum_{t} E_0(0.93)^t = E_0/0.07 = 570\ \mathrm{GtCO_2}$ per unit of current-year emissions. This is the arithmetic that makes the *rate of decline*, not the endpoint, the binding constraint.
:::
:::

::: exercise Weathering and the habitable zone {level=3}
Silicate weathering scales approximately as $W \propto p\mathrm{CO_2}^{0.3}\exp(0.03\,T)$ with $T$ in $^\circ\mathrm{C}$. By what factor does weathering increase if $p\mathrm{CO_2}$ rises from $280$ to $1120\ \mu\mathrm{atm}$ and the surface warms by $6\ \mathrm{K}$? What does that imply for the recovery time of a $4\times\mathrm{CO_2}$ world?
::: solution
$p\mathrm{CO_2}$ factor: $(1120/280)^{0.3} = 4^{0.3} = 1.52$. Temperature factor: $e^{0.03\times6} = 1.20$. Combined: $1.82$.

So a quadrupling of $\mathrm{CO_2}$ and its accompanying warmth nearly doubles the weathering sink, which is the thermostat in action. At $1.8$ times the present flux of $0.3\ \mathrm{GtC\,yr^{-1}}$ the drawdown of the excess $\sim1200\ \mathrm{GtC}$ implied by a $4\times$ world would take $1200/0.54 = 2200$ years — but that estimate is far too fast, because weathering is limited by rock supply and by the delivery of fresh, reactive mineral surfaces, and because the biota and soils respond non-monotonically to warmth and aridity. The geological record's answer, from the PETM and the Cretaceous, is $10^{5}$–$10^{6}$ years ([[earth-system/planet-earth]], [[palaeoclimate/deep-time]]).
:::
:::
