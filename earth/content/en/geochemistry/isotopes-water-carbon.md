Water, carbon and their isotopes form a single coupled system that runs from the cloud to the aquifer to the carbonate ion to the shell, and the isotope geochemistry of that system is the discipline that makes each stage **measurable**. Hydrogen and oxygen tag the water molecule itself, carbon tags the dissolved inorganic carbon that the water carries, and radiocarbon puts a clock on both. Almost every quantitative statement in hydrology, karst geomorphology, palaeoclimate and the marine carbon cycle rests on the four or five isotope relationships set out below.

## The isotopic composition of natural waters

::: definition The meteoric water line {#def-gmw}
Because 99.99 per cent of the hydrogen and oxygen in natural water is in the H$_2$O molecule, the $\delta^{2}\mathrm{H}$ and $\delta^{18}\mathrm{O}$ of a water are a **label on the molecule** that is changed only by evaporation, condensation, mixing and water–rock exchange. Global precipitation defines the **global meteoric water line**
$$
\delta^{2}\mathrm{H} = 8\,\delta^{18}\mathrm{O} + 10 \quad [\text{‰ vs VSMOW}],
$$
whose slope of 8 is the ratio of the equilibrium fractionation factors of the two systems at cloud temperature and whose intercept, the **deuterium excess**
$$
d = \delta^{2}\mathrm{H} - 8\,\delta^{18}\mathrm{O},
$$
is set by the **kinetic** conditions at the evaporating source and is therefore an independent climate variable. The global mean is $d \approx 10$ ‰; $d$ rises to 15–25 ‰ over the warm, dry subtropical sources and falls to 2–5 ‰ over the cool, humid high latitudes, and the seasonal cycle of $d$ in polar ice is one of the few direct proxies for the **location** of the moisture source rather than for the temperature at the site of deposition.

Four effects structure the isotopic composition of precipitation and are the basis of every application. The **temperature (or amount) effect** makes precipitation progressively more depleted as the temperature of condensation falls, at about $0.6$–$0.8$ ‰ of $\delta^{18}\mathrm{O}$ per °C in polar regions. The **continental effect** and the **altitude effect** are the same Rayleigh rain-out in space rather than in time, at $0.2$–$0.6$ ‰ per 100 m of elevation. The **seasonal effect** makes winter precipitation more depleted in the mid-latitudes. And the **source effect**, recorded in $d$, distinguishes moisture that evaporated from a warm, dry surface from moisture that evaporated in high humidity.
:::

::: definition Evaporation, mixing and the two-end-member test {#def-evap}
**Evaporation** of an open water body is a kinetic process and follows the Rayleigh law with an enrichment factor of $+10$ to $+14$ ‰ for $\delta^{18}\mathrm{O}$, so the residual lake water becomes progressively heavier and moves **below and to the right** of the meteoric water line on a $\delta^{2}\mathrm{H}$ against $\delta^{18}\mathrm{O}$ diagram, along an **evaporation line of slope 4–6** rather than 8. The intersection of the evaporation line with the local meteoric water line gives the isotopic composition of the **recharging** water, and the slope gives the **relative humidity** of the evaporating environment — the basis of the entire isotope hydrology of terminal lakes, from the Great Salt Lake to the salinas of the Altiplano.

**Mixing** of two waters is a straight line in isotope space, and this gives the single most useful diagnostic in hydrology: a plot of $\delta^{18}\mathrm{O}$ against **chloride**. Because chloride is conservative and both variables mix linearly, a **freshwater–seawater** mixing trend in a coastal aquifer plots on the straight line
$$
\delta^{18}\mathrm{O} = \delta_{\mathrm{fresh}} + (\delta_{\mathrm{sea}} - \delta_{\mathrm{fresh}})\frac{\mathrm{Cl}}{19{,}000},
$$
and any **deviation** from that line is a diagnostic of a third process: a shift to **higher** $\delta^{18}\mathrm{O}$ at constant chloride indicates water–rock oxygen exchange or the input of a geothermal component, and a shift to **lower** $\delta^{18}\mathrm{O}$ at high chloride indicates the release of **formation water** with a meteoric signature from compacting shale — the classic "oxygen isotope shift" of overpressured basins.
:::

::: example A coastal aquifer and the conservative-mixing test {#ex-mixing}
In a coastal limestone aquifer, a sample has chloride of 9500 mg L⁻¹ and $\delta^{18}\mathrm{O} = -1.2$ ‰. Freshwater in the aquifer has $\delta^{18}\mathrm{O} = -6.0$ ‰ and chloride of 5 mg L⁻¹, and seawater has $\delta^{18}\mathrm{O} = 0$ ‰ and chloride of 19 000 mg L⁻¹. Test whether the sample is a simple freshwater–seawater mixture.
::: solution
The chloride gives the seawater fraction directly:
$$
f_{\mathrm{sea}} = \frac{9500 - 5}{19{,}000 - 5} = 0.500 .
$$
A conservative mixture would therefore have
$$
\delta^{18}\mathrm{O} = 0.500\times 0 + 0.500\times(-6.0) = -3.0\ \text{‰}.
$$
The measured value of $-1.2$ ‰ is **1.8 ‰ heavier** than the mixing line, so the sample is **not** a simple mixture.

Three processes can produce a positive oxygen isotope shift at constant chloride, and they are distinguished by the other data. **Water–rock exchange** at depth: in a carbonate aquifer at 60–100 °C, oxygen exchange between water and rock progressively enriches the water in $^{18}\mathrm{O}$ without touching the chloride, and the shift is proportional to the water–rock ratio and to the temperature; the test is the co-varying **deuterium excess**, which is **unchanged** by oxygen exchange because hydrogen is buffered by the much larger hydrogen pool of the water. **A geothermal or deep formation-water end-member** with a heavy oxygen and a moderate chloride; the test is the **chloride, bromide, boron, ammonium and silica** chemistry, since a formation water carries millimolar ammonium and millimolar boron. **Evaporation** of the recharge before infiltration, which raises both the $\delta^{18}\mathrm{O}$ and the chloride — but which would move the sample **along** an evaporation line from the freshwater end-member and would leave a **low deuterium excess**.

The decisive test in this case is the deuterium excess: if $d$ is unchanged at 10 ‰, the shift is pure oxygen exchange with the rock and the water has been at high temperature; if $d$ is low, the water was evaporated. This is why $\delta^{2}\mathrm{H}$ and $\delta^{18}\mathrm{O}$ are **always** measured together, and why the deuterium excess, not the two ratios separately, is the variable that carries the physical information.
:::
:::

::: widget plot
f: -8 + 14*ln(x)
x: 0.1, 1
y: -42, 0
labels: \delta^{18}\text{O}
caption: Rayleigh evaporative enrichment of a lake whose initial water has $\delta^{18}\mathrm{O} = -8$ ‰, with an enrichment factor of $+14$ ‰, plotted against the fraction of water remaining. The curve is **logarithmic and unbounded**, so a lake that loses 90 per cent of its inflow by evaporation becomes 32 ‰ heavier — which is why terminal lakes such as the Dead Sea, the Great Salt Lake and Lake Texcoco carry isotope compositions far outside the range of any precipitation, and why the **$\delta^{18}\mathrm{O}$ of a closed-basin lake carbonate is a proxy for the ratio of evaporation to precipitation** rather than for either separately. The same curve, run in reverse, describes the isotopic evolution of the moisture remaining downwind of a continental evaporating source, and is the reason that the $\delta^{18}\mathrm{O}$ of precipitation in continental interiors is so strongly depleted.
:::

## Carbon in water

::: definition The carbon isotopes of the dissolved inorganic carbon {#def-dic}
Dissolved inorganic carbon in a natural water is a **mixture of two sources with very different isotope compositions**, and its $\delta^{13}\mathrm{C}$ is therefore a quantitative tracer of the mixing. Soil carbon dioxide, produced by root and microbial respiration, has $\delta^{13}\mathrm{C}$ of $-22$ to $-27$ ‰ in a C3-plant soil and of $-11$ to $-15$ ‰ under C4 vegetation, and dissolves into the water as carbonic acid. Carbonate rock has $\delta^{13}\mathrm{C}$ near $0$ ‰. In an **open system**, where the soil carbon dioxide is in excess and the water remains undersaturated, the water dissolves carbonate until its alkalinity is set by the soil carbon dioxide partial pressure, and the resulting dissolved inorganic carbon has
$$
\delta^{13}\mathrm{C}_{DIC} \approx \tfrac{1}{2}\left(\delta^{13}\mathrm{C}_{\mathrm{CO_2}} + \delta^{13}\mathrm{C}_{\mathrm{carb}}\right) + \varepsilon \approx -11\ \text{to}\ -12\ \text{‰},
$$
because half the carbon comes from the soil and half from the rock, with a small fractionation. In a **closed system**, where a fixed soil carbon dioxide pool is exhausted, the water dissolves carbonate until the carbon dioxide runs out and the dissolved inorganic carbon ends up near the **soil** value of $-25$ ‰. The two end-members are separated by the **alkalinity and the pH**, and the distinction matters because the same $\delta^{13}\mathrm{C}$ of $-12$ ‰ can mean an open-system karst water or a closed-system water that has exchanged with organic matter.

**Radiocarbon in groundwater** is the clock, and it is systematically biased by the same mixing. Soil carbon dioxide carries the atmospheric $^{14}\mathrm{C}$ activity, but **carbonate rock carries no radiocarbon at all**, so half the carbon in a karst water is "dead" from the moment it forms, and the raw radiocarbon age of a groundwater is far too old. The **Ingerson–Pearson**, **Münich (Mühlhoff–Vogel)** and **Fontes–Garnier** correction models use the $\delta^{13}\mathrm{C}$ of the dissolved inorganic carbon to estimate the fraction of dead carbon and correct the initial activity, and the correction is commonly a **factor of two** in age.
:::

::: example The dead-carbon correction {#ex-deadcarbon}
A groundwater's dissolved inorganic carbon has a $^{14}\mathrm{C}$ activity of 25 pmC (per cent modern) and a $\delta^{13}\mathrm{C}$ of $-12.0$ ‰. The soil carbon dioxide had $\delta^{13}\mathrm{C} = -25.0$ ‰ and 100 pmC, and the dissolving carbonate had $\delta^{13}\mathrm{C} = 0$ ‰ and 0 pmC. Find the corrected radiocarbon age and compare it with the uncorrected value.
::: solution
The fraction of the dissolved inorganic carbon derived from **carbonate** follows from the two-component carbon isotope balance:
$$
q_{\mathrm{carb}} = \frac{\delta^{13}\mathrm{C}_{DIC} - \delta^{13}\mathrm{C}_{\mathrm{soil}}}{\delta^{13}\mathrm{C}_{\mathrm{carb}} - \delta^{13}\mathrm{C}_{\mathrm{soil}}}
   = \frac{-12.0 - (-25.0)}{0 - (-25.0)} = \frac{13.0}{25.0} = 0.52 .
$$
The initial $^{14}\mathrm{C}$ activity of the water was therefore
$$
A_0 = (1 - q_{\mathrm{carb}})\times 100 + 0 = 48\ \mathrm{pmC}.
$$
The corrected age is
$$
t = -8033\ln\left(\frac{25}{48}\right) = 8033\times0.652 = 5{,}240\ \mathrm{yr},
$$
against an uncorrected age of $-8033\ln(0.25) = 11{,}140$ yr. **The correction halves the age.**

The correction is a **model**, and the three classical variants bracket the answer. The **Ingerson–Pearson** model assumes an open system in which the soil carbon dioxide is unlimited and gives $q_{\mathrm{carb}} = 0.5$ and $A_0 = 50$. The **Münich** model assumes a closed system in which the soil carbon dioxide pool is exhausted, giving a **larger** carbonate fraction and a **younger** corrected age. The **Fontes–Garnier** model uses the carbon isotope data as above and is the standard. If the true system was closed, the initial activity was nearer 25 pmC and the water is **essentially modern**; if the aquifer contained some "dead" carbon from old organic matter or from a deep mantle carbon dioxide, the initial activity was lower still. The practical range for this sample is therefore **2000 to 8000 years**, and the honest statement is a range, not a number.

Three further corrections are always required. **Isotopic fractionation** must be normalised to $\delta^{13}\mathrm{C} = -25$ ‰ before the age is computed. **Nuclear weapons testing** raised the atmospheric $^{14}\mathrm{C}$ to nearly 200 pmC in 1963 and the curve has declined since, so a post-1950 water has an activity **above** 100 pmC and the "age" is meaningless — but the bomb pulse is itself a **chronometer** that dates young groundwater to within a year or two. And **dispersion and mixing** with older water along the flow path make the apparent age an **average** that must be deconvolved with a flow-model or a lumped-parameter model.
:::
:::

::: definition Water–rock exchange and the palaeoaltimeter {#def-wr}
Oxygen isotope exchange between water and silicate or carbonate rock is fast enough at depth to reset the water's $\delta^{18}\mathrm{O}$ while leaving its $\delta^{2}\mathrm{H}$ almost unchanged, because the rock's oxygen reservoir is large and its hydrogen reservoir is small. In a closed batch of water and rock the final composition of both is the **mass-weighted average**
$$
\delta_{\mathrm{final}} = \frac{\delta_w + R\,\delta_r}{1 + R}, \qquad
R = \frac{m_{\mathrm{rock}}\,X_{\mathrm{O,rock}}}{m_{\mathrm{water}}\,X_{\mathrm{O,water}}},
$$
where $X_{\mathrm{O}}$ is the oxygen weight fraction, about 0.50 for a silicate or carbonate rock and 0.89 for water. The quantity $R$ is the **oxygen isotope ratio of the rock and water reservoirs**, and a measured shift in the water's $\delta^{18}\mathrm{O}$ therefore gives the **water–rock ratio** — the single most important constraint on the flux of fluid that built an orogen, formed an ore deposit or metamorphosed a terrain. The classic result is that the high-$\delta^{18}\mathrm{O}$ granites of the Scottish Caledonides require water/rock ratios of 0.1–0.5 by mass of **marine** water, and that the Grains Belt and the Idaho batholith require meteoric water fluxes comparable to a modern river.

The **palaeoaltimeter** inverts the same physics in the surface environment. The $\delta^{18}\mathrm{O}$ and $\delta^{2}\mathrm{H}$ of meteoric water decline with elevation at $0.2$–$0.6$ ‰ and $2$–$4$ ‰ per 100 m, and the structural hydroxyl of **biotite, muscovite, chlorite and volcanic glass**, and the phosphate and carbonate of **mammal enamel**, record the meteoric water at the time of their formation. Comparing the isotopic composition of a fossil mineral with that of the modern local water gives the **palaeoelevation**, and the technique has been used to argue that the Tibetan Plateau, the Altiplano and the Colorado Plateau each rose in two or three discrete episodes rather than continuously. Its weakness is that the is lapse rate is itself a **climate** variable, so a change in the measured value cannot be uniquely divided between uplift and a change in the lapse rate itself — which is why the strongest studies use the **clumped-isotope** $\Delta_{47}$ temperature of the same carbonate to constrain the surface temperature independently.
:::

::: example Open and closed system carbon in a karst water {#ex-karst}
Groundwater in a limestone aquifer has an alkalinity of 3.0 mmol L⁻¹ and a $\delta^{13}\mathrm{C}$ of the dissolved inorganic carbon of $-12.0$ ‰. A second water from the same aquifer, recharged beneath a closed cave system where soil carbon dioxide is exhausted, has a $\delta^{13}\mathrm{C}$ of $-23.0$ ‰. Taking soil carbon dioxide at $-25$ ‰ and carbonate at $0$ ‰, find the fraction of carbon derived from each source in both waters and explain the difference in their alkalinity.
::: solution
For the first water,
$$
q_{\mathrm{carb}} = \frac{-12.0 - (-25.0)}{0 - (-25.0)} = 0.52, \qquad q_{\mathrm{soil}} = 0.48 ,
$$
and for the second,
$$
q_{\mathrm{carb}} = \frac{-23.0 + 25.0}{25.0} = 0.08, \qquad q_{\mathrm{soil}} = 0.92 .
$$
The two waters therefore differ by a factor of six in the proportion of their carbon taken from the rock.

The difference is exactly what the two limiting cases of carbonate dissolution predict. In an **open system**, where the water remains in contact with a soil carbon dioxide reservoir of fixed partial pressure, the dissolution reaction
$$
\mathrm{CaCO_3} + \mathrm{H_2CO_3} \to \mathrm{Ca^{2+}} + 2\,\mathrm{HCO_3^-}
$$
takes **one** carbon from the rock and **one** from the soil for every two of alkalinity, so the dissolved inorganic carbon is a half-and-half mixture and its $\delta^{13}\mathrm{C}$ is $\tfrac{1}{2}(-25 + 0) = -12.5$ ‰ — the measured value. In a **closed system**, where a fixed pool of soil carbon dioxide is exhausted, all the carbon dioxide is consumed and the water continues to dissolve carbonate only until the carbon dioxide is gone, so the resulting dissolved inorganic carbon carries almost entirely the **soil** signature and the alkalinity produced per unit of carbon dioxide is **halved**.

The quantitative consequence is the reason the distinction matters for the carbon cycle. The **alkalinity produced per mole of carbon dioxide consumed** is 2 in the open system and 1 in the closed system, so the same volume of water passing through a soil with a given carbon dioxide content removes **twice as much carbon dioxide and twice as much carbonate** in the open system. The measured alkalinity of 3.0 mmol L⁻¹ for the open-system water is typical of a world-wide average karst water, and the flux of alkalinity from the world's carbonate terrains — about 13 Tmol yr⁻¹ of alkalinity, or 0.16 Gt C yr⁻¹ of carbon dioxide drawn down — is computed on the open-system assumption, which is why the **reconnaissance-scale** weathering flux is so sensitive to the **residence time and the degree of CO₂ depletion** in the soil zone.

The practical test is the **saturation index** and the **partial pressure of carbon dioxide** computed from the alkalinity and pH: an open-system water is close to equilibrium with a soil carbon dioxide partial pressure of $10^{-2}$ atm, whereas a closed-system water is close to equilibrium with a much lower partial pressure and is commonly **over-saturated** with respect to calcite, which is why closed-system waters precipitate cave calcite and open-system waters do not.
:::
:::

::: example Water–rock ratio from an oxygen isotope shift {#ex-wr-ratio}
Meteoric water with $\delta^{18}\mathrm{O} = -8$ ‰ circulates through a granite with $\delta^{18}\mathrm{O} = +8$ ‰ and both phases re-equilibrate. The recovered geothermal fluid has $\delta^{18}\mathrm{O} = -4$ ‰. Find the oxygen reservoir ratio $R$ and the mass water–rock ratio.
::: solution
From the batch-exchange equation,
$$
-4 = \frac{-8 + 8R}{1+R} \;\Rightarrow\; -4 - 4R = -8 + 8R \;\Rightarrow\; 4 = 12R \;\Rightarrow\; R = 0.33 .
$$
Converting to a mass ratio with $X_{\mathrm{O,rock}} = 0.50$ and $X_{\mathrm{O,water}} = 0.89$,
$$
\frac{m_{\mathrm{water}}}{m_{\mathrm{rock}}} = \frac{X_{\mathrm{O,rock}}}{R\times X_{\mathrm{O,water}}} = \frac{0.50}{0.33\times0.89} = 1.7 .
$$
A water–rock mass ratio of **1.7** is enormous — it means that each kilogram of rock was traversed by 1.7 kg of water, equivalent to a through-flow of several hundred metres of water per square metre of rock area, and it requires **fracture-controlled flow with a large catchment**, not diffusion or intergranular flow.

The number is a **minimum** for two reasons. Full re-equilibration of both phases is the maximum-exchange limit; in reality the rock's oxygen is only partly exchanged, so the same water shift is produced by a **larger** water flux through a rock that exchanged inefficiently. And the assumption that the infiltrating water had $\delta^{18}\mathrm{O}$ of $-8$ ‰ is a **palaeoclimate** assumption; if the water was $-12$ ‰, the required $R$ is 0.5 and the water–rock ratio is 1.1. The correct practice is to measure the **rock** profile as well as the fluid: a rock that has been lowered from $+8$ to $+2$ ‰ over a kilometre of section gives the same answer from the rock side and constrains the total flux through the whole column, which is what the classic studies of the Scottish Caledonides and the Idaho batholith did.
:::
:::

::: warning Isotope hydrology answers the question you can ask of a conservative tracer, and no other
The power of the hydrogen–oxygen system is that the isotope composition of water behaves as a **conservative** tracer of the water molecule, and its weakness is exactly the same. **A $\delta^{18}\mathrm{O}$ value is not a temperature** outside the narrow range where the fractionation calibration was made and where equilibrium held: a carbonate precipitated out of equilibrium, a soil nitrate that has been denitrified, and a chert precipitated at 150 °C all give temperatures that are physically meaningless. **A $\delta^{2}\mathrm{H}$ value in a hydrated mineral is not the meteoric water at the time of deformation** but at the time of the mineral's **growth or last isotopic exchange**, and a mylonite whose muscovite grew syntectonically records the syn-tectonic rain whereas one whose muscovite is inherited records nothing about the event. **A radiocarbon age of a groundwater is not an age** but an apparent age that mixes the radioactive decay, the dead-carbon correction, the mixing of waters of different ages along the flow path, and the exchange of carbon with the rock; the "mean residence time" from a lumped-parameter model is a property of the **flow model**, not of the water. **A deuterium excess is not a humidity** but a source-region variable that also responds to the sea-surface temperature, the wind speed, the season of moisture uptake and the trajectory of the air mass, and its interpretation requires an explicitly isotope-enabled general-circulation model, which is why the "palaeohumidity" literature of the 1990s has largely been rewritten. **And a lake-carbonate $\delta^{18}\mathrm{O}$ is not a rainfall amount** but the ratio of evaporation to inflow, weighted by the isotopic composition of both, so a shift of 3 ‰ can mean 30 per cent less rain, a change in the source of the inflow, or the desiccation of one of two sub-basins. The discipline is to write down the **mass-balance equation** for the specific system before interpreting any isotope value, to identify the **two or three** variables that the equation contains, and to name the **independent measurement** that would be needed to close it.
:::

::: history
**Craig** (Craig) established the SMOW standard, the global meteoric water line and the isotope mass balance of the ocean in 1961, and **Dansgaard** (Dansgaard) produced the first continuous ice-core isotope record from Camp Century in 1964. **Craig and Gordon** (Gordon) published the model of isotopic enrichment in evaporating water in 1965, and **Lal** (Lal) and **Gonfiantini** (Gonfiantini) formalised the isotope hydrology of lakes. **Ingerson and Pearson** (Pearson) gave the first dead-carbon correction for radiocarbon in groundwater in 1959, **Mühlhoff and Vogel** (Vogel) the Münich model in 1966, and **Fontes and Garnier** (Fontes) the carbon-isotope-based correction in 1973; **Mook** (Mook) and **Clark and Fritz** (Fritz) wrote the standard texts. **Taylor** (Taylor) established the oxygen and hydrogen isotope exchange systematics of granites in 1967–1977, and **Criss and Taylor** (Criss) and **Blattner and Rye** (Blattner) demonstrated the enormous meteoric water fluxes in the Idaho batholith and in Otago. **Ehleringer and Dawson** (Ehleringer) showed that plants take up **soil** rather than xylem water in 1992 and founded ecohydrological isotope studies; **Kendall, McDonnell and Burns** (Kendall) built the isotope hydrology of catchment runoff. **Poage and Chamberlain** (Chamberlain) and **Rowley, Currie and Garzione** (Currie) developed the palaeoaltimeter in 2001–2006, and **Mulch and Hren** (Mulch) applied hydrated-mineral and clumped-isotope palaeoaltimetry to the Tibetan Plateau and the Sierra Nevada. **Masson-Delmotte and Jouzel** (Masson-Delmotte) linked the ice and speleothem isotope records to isotope-enabled general-circulation models, and **Aggarwal and the IAEA Global Network of Isotopes in Precipitation** (Aggarwal) built the global isotope database on which all of it depends. **Eiler, Ghosh, Affek and Lloyd** (Eiler) developed clumped-isotope thermometry, and **Suess** (Suess) identified the fossil-fuel dilution of atmospheric carbon in 1955.
:::

## Where this leads

The meteoric water line and the isotope hydrology of catchments are in [[hydrology/water-balance]] and [[hydrology/runoff]], groundwater flow and contaminant tracers are in [[hydrology/groundwater-flow]] and [[hydrology/contaminant-transport]], the carbonate chemistry that sets the dissolved inorganic carbon composition is in [[geochemistry/aqueous-geochemistry]] and [[geochemistry/weathering-chemistry]], the ice-core and speleothem records are in [[palaeoclimate/proxies]] and [[palaeoclimate/ice-cores]], the ocean carbon cycle and its isotopes are in [[oceanography/productivity]] and [[biogeochemistry/carbon-today]], the karst and speleothem applications are in [[geomorphology/rivers]] and [[geomorphology/landscape-evolution]], and the fractionation theory is in [[geochemistry/stable-isotopes]].

::: quiz
A groundwater has $\delta^{18}\mathrm{O} = -6.0$ ‰, $\delta^{2}\mathrm{H} = -38$ ‰ and a deuterium excess of 10 ‰, and its chloride is 400 mg L⁻¹. What does the deuterium excess tell you that the two ratios do not?
- [ ] The recharge temperature.
- [x] That the water has not been evaporated and has not exchanged oxygen with rock at high temperature.
- [ ] The age of the water.
- [ ] The aquifer lithology.
::: solution
The two ratios lie on the global meteoric water line, which is consistent with **either** an unmodified meteoric water **or** a water that has undergone oxygen exchange with rock (which moves a sample horizontally, changing $\delta^{18}$O at constant $\delta^{2}$H) **or** evaporation (which moves it along a slope of 5). A deuterium excess of 10 ‰ with both ratios on the line rules out both the evaporation and the oxygen-exchange interpretations, because either would have displaced the sample off the line. The chloride of 400 mg L⁻¹ is far too high for a simple meteoric water, so the salinity must have come from **dissolution of evaporite or rock salt** rather than from seawater — which the isotope data alone cannot show, and which requires the bromide-to-chloride ratio to confirm.
:::
:::

::: summary
- The hydrogen and oxygen isotopes of water are a label on the molecule, changed only by evaporation, condensation, mixing and water–rock oxygen exchange.
- The global meteoric water line has slope 8 and the deuterium excess is an independent source-region variable; evaporation moves a water along a slope of 5.
- Isotope mixing is linear, so a plot of $\delta^{18}$O against chloride tests whether a water is a simple mixture and identifies what it is not.
- Dissolved inorganic carbon mixes soil CO$_2$ at $-25$ ‰ with carbonate rock at 0 ‰, and the mixture controls both the $\delta^{13}$C and the initial $^{14}$C activity.
- The dead-carbon correction to a groundwater radiocarbon age is commonly a factor of two and is a model, not a measurement.
- An oxygen isotope shift between water and rock gives the water–rock ratio, and the same physics inverted at the surface gives the palaeoaltimeter.
:::

## Exercises

::: exercise Deuterium excess {level=1 check="10"}
A precipitation sample has $\delta^{18}\mathrm{O} = -5.0$ ‰ and $\delta^{2}\mathrm{H} = -30$ ‰. Find its deuterium excess.
::: solution
$d = -30 - 8(-5.0) = -30 + 40 = +10$ ‰ — the global mean, indicating an oceanic source in ordinary humidity. Values above 15 ‰ indicate a warm, dry source or a continental recycling component; values below 5 ‰ indicate a cold, humid source or a high-latitude trajectory.
:::
:::

::: exercise Seawater mixing {level=1 check="-3"}
Freshwater at $\delta^{18}\mathrm{O} = -4.0$ ‰ mixes with 25 per cent seawater ($\delta^{18}\mathrm{O} = 0$ ‰). Find the mixture.
::: solution
$\delta = 0.75\times(-4.0) + 0.25\times 0 = -3.0$ ‰. Because the mixing is linear in both chloride and isotope composition, the ratio of the two tracers is a **test of conservatism**: if the chloride indicates 25 per cent seawater and the oxygen isotope indicates 40 per cent, a third process is operating.
:::
:::

::: exercise The altitude effect {level=1 check="1800"}
The local meteoric water line at the foot of a range gives $\delta^{18}\mathrm{O} = -6.0$ ‰ and a spring at altitude gives $-11.4$ ‰. Taking an altitude effect of $-0.3$ ‰ per 100 m, find the recharge altitude difference.
::: solution
$\Delta\delta = -11.4 - (-6.0) = -5.4$ ‰, and $\Delta z = 5.4/0.3\times100 = 1800$ m. The result is a **recharge** altitude, not a spring altitude, and it assumes an altitude effect measured in the same catchment in the same season; the range of 0.2–0.6 ‰ per 100 m means the answer is good to a factor of two.
:::
:::

::: exercise Evaporative enrichment {level=2 check="18.5"}
A lake with $\delta^{18}\mathrm{O} = -4.0$ ‰ loses 80 per cent of its inflow to evaporation ($\varepsilon = +14$ ‰). Find the $\delta^{18}\mathrm{O}$ of the lake water at steady state.
::: solution
At steady state the lake must be enriched relative to the inflow by $-\varepsilon\ln f$, where $f = 0.20$ is the fraction of inflow leaving as outflow rather than as vapour:
$$
\delta_{\mathrm{lake}} = -4.0 - 14\ln(0.20) = -4.0 + 22.5 = +18.5\ \text{‰}.
$$
Terminal lakes reach $+10$ to $+30$ ‰, and the difference between the lake value and the local meteoric water line is the standard measure of the **evaporation-to-precipitation ratio**.
:::
:::

::: exercise A dead-carbon correction {level=2 check="50"}
A karst water's dissolved inorganic carbon has $\delta^{13}\mathrm{C} = -13.0$ ‰ with soil CO$_2$ at $-26.0$ ‰ and carbonate at $0$ ‰. Find the initial $^{14}\mathrm{C}$ activity.
::: solution
$q_{\mathrm{carb}} = (-13.0 + 26.0)/26.0 = 0.50$, so $A_0 = (1-0.50)\times100 = 50$ pmC — the classic Ingerson–Pearson open-system result of one-half dead carbon. A measured activity of 25 pmC would then give an age of $-8033\ln(0.50) = 5{,}570$ yr rather than the uncorrected 11,140 yr.
:::
:::

::: exercise Water–rock ratio {level=2 check="0.56"}
Water at $\delta^{18}\mathrm{O} = -10$ ‰ exchanges with rock at $+10$ ‰ and both reach $0$ ‰. Find $R$ and the mass water–rock ratio.
::: solution
$0 = (-10 + 10R)/(1+R)$ gives $R = 1.0$, and
$$
\frac{m_w}{m_r} = \frac{0.50}{1.0\times0.89} = 0.56 .
$$
A water–rock mass ratio of about 0.5 — half a kilogram of water per kilogram of rock — is the value that defines a **major fossil fluid conduit**, and it is reached only where deformation has focused the flow onto a fault or shear zone; regional diffusion and intergranular flow give ratios of 0.001–0.01.
:::
:::

::: exercise A palaeoaltimeter {level=3 check="1800"}
A fossil soil carbonate at a site now at 2000 m has $\delta^{13}\mathrm{C}_{\mathrm{soil}}$-corrected $\delta^{18}\mathrm{O}$ implying a meteoric water of $-9.0$ ‰; the modern local meteoric water is $-3.6$ ‰. With an altitude effect of $-0.3$ ‰ per 100 m, find the apparent uplift, and give two reasons the number may be wrong.
::: solution
$\Delta\delta = -9.0 - (-3.6) = -5.4$ ‰, so the apparent uplift is $5.4/0.3\times100 = 1800$ m.

The number may be wrong for reasons that are not analytical. **The altitude effect is a climate variable**: a colder or more continental climate steepens the lapse rate to $-0.6$ ‰ per 100 m and halves the apparent uplift, and a change in the moisture source changes the intercept as well as the slope, so the same isotope value can be produced by 900 m of uplift in a different climate. **The carbonate may not record local meteoric water**: soil carbonates inherit a substantial **leaf-water** component that is enriched by evaporation by 2–5 ‰, and a change in the season of carbonate precipitation, in the depth of soil evaporation or in the vegetation shifts the value without any elevation change. The modern remedy is to measure the **clumped-isotope $\Delta_{47}$ temperature** of the same carbonate, which constrains the surface temperature independently and therefore constrains the lapse rate, and to pair the carbonate with the **hydrated-mineral** palaeoaltimeter from the same section, which is not affected by evaporation.
:::
:::

::: exercise The bomb pulse {level=3 check="1981"}
Atmospheric $^{14}\mathrm{C}$ peaked at 190 pmC in 1963 in the northern hemisphere and declined approximately linearly to 105 pmC by 2000. A groundwater has a **corrected** $^{14}\mathrm{C}$ activity of 148 pmC. Estimate its recharge year, and explain why the method fails for a water recharged in 1958.
::: solution
On the descending branch, the activity falls by $(190-105)/(2000-1963) = 2.30$ pmC per year, so an activity of 148 pmC corresponds to
$$
1963 + \frac{190-148}{2.30} = 1963 + 18 = 1981 .
$$
The calibration must in practice use the **measured** atmospheric curve rather than an idealisation, because the real curve has a plateau and a kink in the 1970s.

The method fails for 1958 because the atmospheric curve **rises and falls through the same value**: an activity of 148 pmC occurs on the ascending branch (about 1958) and on the descending branch (about 1981), so the measurement gives two possible ages and they differ by 23 years. The ambiguity is resolved by the **tritium** content, which peaked in 1963 and is now near pre-bomb values, by the **chlorofluorocarbon** and **sulphur hexafluoride** contents, which have monotonically rising atmospheric histories, and by the **krypton-85** content. The general lesson is that an isotope chronometer is only as good as the **monotonicity** of its atmospheric input function, and that the pairing of several transient tracers is what makes young-groundwater dating possible at all.
:::
:::
