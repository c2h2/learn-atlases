A flood is not an event, it is a **quantile**. Nothing about the flood of 2021 distinguishes it hydrologically from the flood of 2007 except that one of them has a name, and the entire content of flood hydrology is the statement that a discharge of $532\ \mathrm{m^{3}\,s^{-1}}$ at this gauge has a **one-in-a-hundred chance** of being equalled or exceeded in any year — a statement that is **unfalsifiable**, **record-length-dependent**, **distribution-dependent** and **non-stationary**, and on which bridges, levees, insurance premiums and building permits are written. Drought is the same problem in reverse and worse, because a drought has no natural **threshold**, no **annual maximum**, and no agreed **definition**.

## Flood frequency

::: definition Return period, exceedance probability and the plotting position {#def-return-period}
The **return period** $T$ of a flood is the **mean recurrence interval** of the event, so its **annual exceedance probability** is $p = 1/T$, and the probability of **at least one** exceedance in $n$ years is
$$
P(\text{at least one in } n) = 1 - \left(1 - \frac{1}{T}\right)^{n} .
$$
A "100-year flood" therefore has a **10 per cent** chance in ten years, an **18 per cent** chance in twenty and a **63 per cent** chance in a century — the arithmetic that every floodplain manager must repeat and that almost no member of the public believes. Two further clarifications are permanent: the return period is a **long-run mean**, so the **waiting time** between two 100-year floods can be one year, and the **flood of record** in an $n$-year series is only the **$n$-year** flood, never the maximum possible — the largest flood in a 60-year record has a Weibull **plotting position** of
$$
p = \frac{i - 0.5}{n + 0.25} = \frac{0.5}{60.25} = 0.0083, \qquad T = 120\ \text{years},
$$
which means the record's **largest** event is by construction a **120-year** flood and says **nothing** about the 500-year one.

The **plotting position** itself is a choice, and the four common formulae — **Weibull** $(i-0.5)/(n+0.25)$, **Hazen** $(i-0.5)/n$, **Gringorten** $(i-0.44)/(n+0.12)$ and **Cunnane** $(i-0.30)/(n+0.04)$ — disagree by 10–20 per cent in the return period of the **largest** event, which is the only part of the curve that matters for a design. **Weibull** is unbiased for the **normal** distribution and is the international default; **Gringorten** is unbiased for the **Gumbel** and is preferred in the United Kingdom and by the **World Meteorological Organization**.
:::

::: definition The extreme-value distributions and their tails {#def-ev}
The **Fisher–Tippett–Gnedenko** theorem says that the only possible limits of normalised maxima are three families, combined in the **generalised extreme-value** (GEV) distribution
$$
F(x) = \exp\left\{-\left[1 + k\left(\frac{x - \mu}{\alpha}\right)\right]^{-1/k}\right\},
$$
with $k$ the **shape**: $k = 0$ is the **Gumbel** (EV I, an **exponential** tail), $k > 0$ the **Fréchet** (EV II, a **power-law** tail) and $k < 0$ the **Weibull** (EV III, a **bounded** tail). The practical choices are
$$
\begin{array}{l|l|l}
\text{distribution} & \text{tail} & \text{where it is used} \\ \hline
\textbf{Gumbel (EV1)} & \text{exponential} & \text{temperate snow-fed and maritime rivers} \\
\textbf{GEV} & \text{fitted} & \text{the international default since 1990} \\
\textbf{Log-Pearson III} & \text{heavy} & \text{the United States standard, monsoon and convective rivers} \\
\textbf{Log-normal} & \text{moderate} & \text{historical, low-data regions} \\
\textbf{POT--GPD} & \text{heavy} & \text{partial duration series, tropical cyclone regions}
\end{array}
$$
and the choice is **not** a detail: on a 60-year record the **100-year** flood estimated from a **Gumbel** and from a **log-Pearson III** fit to the **same** data differ by **30–60 per cent**, and the two cannot be distinguished by any goodness-of-fit test available at that record length. This is the **identification problem** at the heart of the subject, and the reason the professional practice is to **report the distribution with the estimate**, to use **L-moments** rather than ordinary moments for the fitting, and to **regionally pool** the data so that the shape parameter is estimated from a **homogeneous region** of a hundred catchments rather than from the sixty years of one.
:::

::: definition Partial duration series and the at-risk period {#def-pot}
The **annual maximum** series throws away information: a year with two large floods contributes only one. The **partial duration series** (POT) or **peaks-over-threshold** (POT) method takes every independent peak above a **threshold** $x_0$, models the **arrivals** as a **Poisson** process and the **exceedances** as a **generalised Pareto** distribution, and is more **efficient** — it uses 2–3 times the information — but introduces two new choices, the **threshold** and the **independence** criterion (usually 5–14 days). The **Poisson** return period is
$$
T = \frac{\nu}{-\ln(1 - p)} \approx \frac{\nu}{\lambda}, \qquad \nu = \frac{\text{number of peaks}}{\text{years at risk}},
$$
and the **at-risk period** matters: in a **snowmelt** regime the floods can occur only from April to June, so the "annual" exceedance probability of a given flood is **three times** its probability **within** the season, and a design that ignores the seasonality **underestimates** the seasonal hazard.

The **POT** method is essential in **tropical-cyclone** and **convective** regimes, where the annual maximum is a **mixture** of two populations — the large-cyclone floods and the ordinary convective floods — and a **single** extreme-value distribution fitted to the mixture **underestimates** the cyclone tail badly. The **Peaks-over-Threshold with a mixture**, the **Expected Maximum** method of **Jenkinson** and the **Joint Return Period** analysis of the **Joint Probability** school are the standard treatments, and they are the reason the design wave and design flood of the **Gulf of Mexico**, the **Bay of Bengal** and the **China Sea** are computed by a method that would be over-elaborate in a temperate river.
:::

::: example A Gumbel flood-frequency analysis {#ex-gumbel}
A 45-year record of annual maximum floods has a mean of $250\ \mathrm{m^{3}\,s^{-1}}$ and a standard deviation of $90\ \mathrm{m^{3}\,s^{-1}}$. Fit a **Gumbel** distribution and find the 10-, 50- and 100-year floods, and the probability of at least one 100-year flood in the 30-year life of a bridge.
::: solution
The Gumbel quantile is $x_T = \mu + \sigma K_T$ with
$$
K_T = \frac{\sqrt{6}}{\pi}\left[y_T - 0.5772\right], \qquad y_T = -\ln\!\left[-\ln\!\left(1 - \frac{1}{T}\right)\right],
$$
so
$$
\begin{array}{c|ccc}
T\ (\text{years}) & 10 & 50 & 100 \\ \hline
y_T & 2.250 & 3.902 & 4.600 \\
K_T & 1.305 & 2.592 & 3.137 \\
x_T\ (\mathrm{m^{3}\,s^{-1}}) & 367 & 483 & 532
\end{array}
$$
and the probability of at least one 100-year flood in 30 years is $1 - 0.99^{30} = 26$ per cent.

The **uncertainty** is the part that must be reported. With both parameters **estimated** from the record, the standard error of the quantile is approximately
$$
\mathrm{SE}(x_T) = \frac{\sigma}{\sqrt{n}}\left[1 + 0.53(y_T - 0.536) + 0.588(y_T - 0.536)^{2}\right]^{1/2} = \frac{90}{\sqrt{45}}\times3.587 = 48\ \mathrm{m^{3}\,s^{-1}},
$$
giving a 95 per cent interval of $\pm 94\ \mathrm{m^{3}\,s^{-1}}$, or $\pm 18$ per cent on the 100-year flood. That interval is a **sampling** interval **only**: it assumes the Gumbel is the **right** distribution, that the record is **stationary**, and that the annual maxima are **independent**. Relaxing each of those assumptions adds 10–30 per cent, and the **total** uncertainty of a 100-year flood from a 45-year record is realistically a **factor of 1.5 either way** — which is why a competent flood study quotes a **range** and an **epistemic** discussion, and why a competent client ignores both.

The **record length** is the dominant control. The standard error scales as $1/\sqrt{n}$ and the **reduced variate** $y_T$ grows as $\ln T$, so the **relative** uncertainty of the design flood grows with the return period and shrinks only as the square root of the record: to halve the uncertainty of the 100-year flood the record must be **four times** longer, and the world's 40-year records can never be made adequate by waiting. The three remedies are **historical flood information** — the **flood marks**, **archival documents**, **church records** and **newspaper** accounts that extend the record to 200–1000 years and are the standard practice in Europe, China and the Middle East — **regional frequency analysis**, which borrows the **shape** from a hundred neighbouring catchments, and **paleoflood hydrology**, which reads the **great-flood deposits** in the channel and the **overbank** sediments and routinely finds floods 30–80 per cent larger than the at-site statistical estimate.
:::
:::

::: widget plot
f: 250 + 70.173*(-ln(-ln(1-1/x))-0.5772)
x: 2, 500
y: 230, 660
labels: x_T\ (\text{m}^3\text{/s})
caption: The **Gumbel** flood-frequency curve for a record with a mean of $250\ \mathrm{m^{3}\,s^{-1}}$ and a standard deviation of $90\ \mathrm{m^{3}\,s^{-1}}$, plotted against the return period on a linear axis. The curve's **concavity** is the whole of the difficulty: the flood rises **logarithmically** with the return period, so the **500-year** flood is only **21 per cent** larger than the **100-year** one and the extrapolation from a 45-year record to a 500-year event is an extrapolation of a **factor of eleven** in probability along a curve whose **curvature** is estimated from **forty-five points**. The **log-Pearson III** fit to the same data would give a **heavier** tail and a 500-year flood 40–60 per cent larger, and the two curves **cross** near the record's largest event — which is why the choice of distribution is **invisible** in the data and **decisive** in the design, and why the honest presentation of a flood-frequency study is **two or three curves** with the design recommendation justified by the **regional** rather than the **at-site** evidence.
:::

::: example The flood of record and the paleoflood {#ex-paleo}
A gauging station has 60 years of annual maxima, the largest of which is $600\ \mathrm{m^{3}\,s^{-1}}$. A paleoflood survey finds **four** overbank deposits from floods larger than $900\ \mathrm{m^{3}\,s^{-1}}$ in a 900-year exposure, and the channel's **hydraulic-geometry** reconstruction gives $950$, $1020$, $1180$ and $1400\ \mathrm{m^{3}\,s^{-1}}$. Combine the records and estimate the 1000-year flood.
::: solution
The **systematic** record contributes 60 years with a maximum of 600; the **non-systematic** record contributes 900 years with **four** known exceedances of 900 and **no** information between 600 and 900 except that the record's own maxima are below it. The combined record has an **effective length** of 900 years with **four** events above $900\ \mathrm{m^{3}\,s^{-1}}$, so the **exceedance rate** above that threshold is $4/900 = 4.4\times10^{-3}\ \mathrm{yr^{-1}}$ — a **return period of 225 years** for the **smallest** of the four, $950\ \mathrm{m^{3}\,s^{-1}}$.

Extrapolating a **Pareto-type** tail, $Q(T) = 950\,(T/225)^{1/b}$, and the four ordered magnitudes give a tail slope of $b \approx 2.5$, so
$$
Q(1000) = 950\times\left(\frac{1000}{225}\right)^{1/2.5} = 950\times1.82 = 1730\ \mathrm{m^{3}\,s^{-1}} .
$$
The **systematic-only** Gumbel estimate for the same return period is about $800\ \mathrm{m^{3}\,s^{-1}}$ — **less than half** the paleoflood value.

This is not a hypothetical. In the **Drava**, the **Meuse**, the **Yellow**, the **Colorado**, the **Amazon** and the rivers of **central Texas** and **southern France**, paleoflood surveys have found floods **1.3 to 2.5 times** the at-site statistical estimate from a 50–80-year record, and in several cases the paleoflood has since been **realised** — the **1993 Mississippi**, the **2002 Elbe**, the **2013 Elbe and Danube**, the **2021 Ahr** — with the design structures sized on the statistical estimate failing as the paleoflood record predicted they would. The **maximum probable flood** of a **dam spillway** design is now required in most countries to be **tested against** the paleoflood evidence, and the **ICOLD**, **USACE** and **British Dam Society** guidance all require it.

The **method's** weaknesses are known and quantified. The **dating** of a deposit to a **century** is easy and to a **year** is rare, so the **rate** is uncertain; the **deposition threshold** — the discharge above which a given site **records** — must be established by **hydraulic modelling** and is the dominant error; the **exposure** must be dated and undisturbed; and the **censoring** must be handled by a **likelihood** that treats the systematic record as **exact** and the historical record as **interval-censored** — the **maximum likelihood with censored data** of **O'Connell** (O'Connell) and its descendants, which is now the standard software implementation. Done properly, a 300-year **historical** record with five or six documented events reduces the uncertainty of the 100-year flood by a **third**, which is why the **EU Floods Directive** now requires historical information in every **flood hazard map**.
:::
:::

## Low flows and droughts

::: definition The flow duration curve and the low-flow indices {#def-lowflow}
Where the flood is a **quantile of the annual maxima**, the low flow is a **quantile of the whole record**. The **flow duration curve** plots the discharge $Q$ exceeded in a fraction $a$ of the time against $a$ on **probability** paper, and it is **remarkably** log-linear over three to four orders of magnitude,
$$
\ln Q = \ln Q_{50} - b\,\Phi^{-1}(a),
$$
whose **slope** $b$ is the **catchment's storage memory**: $b < 0.3$ for a **chalk**, a **karst** or a **thick till** and $b > 0.8$ for a **steep, thin-soiled, urbanised** catchment. The curve's **lower third** is the **ecological** part of the regime, and the management indices are
$$
\textbf{7Q10}: \text{the lowest 7-day mean with a 10-year return period}, \qquad
\textbf{BFI}: \frac{\text{baseflow}}{\text{total flow}}, \qquad
\textbf{MRF}: \text{the minimum annual daily flow}.
$$
The **7Q10** is the legal basis of **effluent-consent** and **abstraction-licence** decisions across North America and much of Europe, and it is estimated by a **log-Pearson III** or **Weibull** fit to the annual minima of the 7-day moving average — a **30-year** record giving an uncertainty of 20–30 per cent, which is larger than most of the **consents** written on it.
:::

::: definition The four droughts and their indices {#def-drought}
**Meteorological** drought (a deficit of precipitation), **agricultural** drought (a deficit of soil moisture), **hydrological** drought (a deficit of streamflow and groundwater) and **socio-economic** drought (a demand that exceeds the supply) are **different phenomena with different lags**, and the lag is the point: a **precipitation** deficit of three months becomes a **soil-moisture** deficit in **weeks**, a **streamflow** deficit in **months** and a **groundwater** deficit in **one to three years**, so the **hydrological** drought of 2022 was the **meteorological** drought of 2019–2021, and the **socio-economic** drought arrives **after** the hydrological one has ended.

The indices divide by what they normalise:
$$
\begin{array}{lll}
\textbf{SPI} & \text{McKee, 1993} & \text{the standardised anomaly of the } k\text{-month precipitation, gamma-fitted} \\
\textbf{SPEI} & \text{Vicente-Serrano, 2010} & \text{the SPI of the precipitation minus the potential evapotranspiration} \\
\textbf{PDSI} & \text{Palmer, 1965} & \text{a two-layer soil-moisture model with a } \text{Climatically Appropriate} \text{ normalisation} \\
\textbf{ESI / SSI} & \text{various} & \text{the SPI applied to evaporation and to streamflow} \\
\textbf{RDI, SDI} & \text{various} & \text{the standardised deficit of the streamflow volume}
\end{array}
$$
The **SPI** is the **WMO** standard because it is **simple**, **stationarity-based** and **comparable** between climates, and its **classes** are $-1$ to $-1.49$ **moderate**, $-1.5$ to $-1.99$ **severe** and $\le -2$ **extreme**. Its **weaknesses** are that it uses **no** evaporation and therefore **cannot** see a **warm** dry spell that a **cold** one would not produce, that its **gamma** fit is **unstable** at the dry tail where the classification lives, and that it is **stationary** by construction. The **SPEI** answers the first by using the **climatic water balance**, and the **sc-PDSI** the second by **self-calibrating** the Palmer coefficients; and all three share the **stationarity** assumption, which is why the current research is on **non-stationary** SPI with a **covariate** and on the **evaporative demand** index as a **flash-drought** precursor.
:::

::: example The standardised precipitation index {#ex-spi}
A monitoring station's 6-month precipitation total for the current October is $120\ \mathrm{mm}$. The 1961–2020 distribution of the October 6-month total is fitted by a **gamma** distribution whose non-exceedance probability at $120\ \mathrm{mm}$ is $F = 0.040$. Compute the **SPI-6** and classify it.
::: solution
The SPI is the **standard normal** variate with the same non-exceedance probability,
$$
\mathrm{SPI} = \Phi^{-1}(0.040) = -1.75,
$$
which is a **severe** drought ($-1.5$ to $-1.99$). Had the index been computed at the **3-month** scale the answer would probably have been different, because the SPI at different **accumulation scales** measures different **reservoirs**: **SPI-3** tracks the **soil moisture** and the **agricultural** drought, **SPI-6** the **root-zone** and the **spring snowpack**, and **SPI-12** to **SPI-24** the **groundwater** and the **reservoir** storage.

The **equidistribution** step — the transformation of the gamma probability to a standard normal — is what makes the SPI **comparable** between a **desert** and a **rainforest**, and it is also its most delicate part. The **gamma** distribution has a **shape** parameter that must be **fitted** to the **dry tail** from a **60-year** record, and the fitted tail is **unstable**: a change in the **fitting month**, in the **base period**, or in the **zero-inflation** treatment of the **dry** climates moves the SPI by **0.2 to 0.5** units, which is **half a drought class**. The **GUM**, **Pearson III** and **mixed** distributions give SPI values differing by 0.3 at the extreme tail, and the **WMO** guidance on the choice is **advisory**.

The **policy** consequence is real and often unnoticed. A **drought declaration**, an **emergency irrigation release**, a **crop-insurance** payout and a **drought-relief** budget are all triggered at **SPI = $-1.5$** or **$-2.0$**, so a **0.3-unit** methodological difference in the index can **decide** whether a region is declared in drought — and the **sensitivity** of the index to the **base period** means that a **warming** climate mechanically **reduces** the computed SPI of a **given** precipitation total, so a **fixed** threshold declares **more** droughts as the climate warms even if the **absolute** water shortage is unchanged.
:::
:::

::: example The 7Q10 and an abstraction licence {#ex-7q10}
A 30-year record of the annual lowest 7-day mean flow has a log-mean of $\log_{10}(4.2)$ and a log-standard-deviation of $0.28$. Estimate the **7Q10**, and decide whether a licence to abstract $0.6\ \mathrm{m^{3}\,s^{-1}}$ is defensible.
::: solution
Fitting a **Gumbel** distribution to the **negated** logarithms of the annual lowest 7-day means, the 10-year low is
$$
\log_{10} Q_{7Q10} = \mu_{\ln} - K_{10}\,\sigma_{\ln} = \log_{10}(4.2) - 1.305\times0.28 = 0.6232 - 0.3654 = 0.2578,
$$
so $Q_{7Q10} = 10^{0.258} = 1.81\ \mathrm{m^{3}\,s^{-1}}$.

A licence to abstract $0.6\ \mathrm{m^{3}\,s^{-1}}$ would remove **33 per cent** of the 10-year low flow, which is **not** defensible: the usual regulatory test is that an abstraction should not reduce the **7Q10** by more than **10 per cent**, and the usual **ecological** floor is a **Q95** or **Q90** habitat flow that this abstraction would breach. The licence is also **unsafe** for a second reason that the arithmetic conceals: the **7Q10** from a **30-year** record has an uncertainty of **20–30 per cent**, so the true value may be $1.3\ \mathrm{m^{3}\,s^{-1}}$, at which the abstraction removes **46 per cent**.

The **groundwater** connection is what makes low-flow management hard. A river fed by a **chalk** aquifer has a **7Q10** that is nearly **proportional** to the **groundwater storage**, and the storage responds to a **recharge** deficit with a **lag of one to three years** — so a licence granted on a **wet-period** record authorises an abstraction that will breach the floor in the **third** year of a drought, and the licence **cannot be withdrawn** in time. This is the mechanism of the **English**, **French** and **Australian** drought-order disputes, and it is why the modern practice is to **condition** abstraction licences on a **drought trigger** — a **recharge** or **storage** threshold at which the licence is **suspended** — rather than to size them on a **flow** statistic.
:::
:::

::: warning A return period is a property of a model, not of a river, and a drought index is a property of a definition
Nine errors are structural. **The distribution is chosen by the software**: the Gumbel, GEV and log-Pearson III fits to the same 50-year record differ by 30–60 per cent at the 100-year point and **cannot** be distinguished by a chi-square, **Kolmogorov–Smirnov** or **L-moment** diagnostic at that record length, so the "best-fitting" distribution is the one the **default** selected. **The record is treated as stationary**: the annual maxima of most regulated, drained, urbanised and afforested catchments have a **trend** and a **step**, and a stationary fit to a **non-stationary** series gives a design flood that is **wrong for the future** and **wrong for the past**. **The flood of record is treated as the maximum**: the largest flood in a 60-year record is a **120-year** flood by construction, and the practice of designing to "the largest we have seen" has failed more dams than any statistical error. **The paleoflood is ignored**: where the paleoflood record exists it usually **exceeds** the statistical estimate by 30–80 per cent, and a spillway designed on the statistics alone is, in a growing number of basins, **known** to be undersized. **The seasonality is ignored**: a snowmelt or cyclone regime has an **at-risk period** of three months, so the annual exceedance probability is not the seasonal one, and the design that ignores this **underestimates** the seasonal hazard by a factor of three. **The drought has no definition**: the SPI, SPEI, PDSI and the streamflow indices disagree on whether a given year was a drought, and the disagreement is **largest** in the **warm dry** climates where the answer matters most. **The lag is ignored**: a hydrological drought lags its meteorological cause by months to years, so an index computed on the **current** season **misses** the drought that is **already** in the groundwater, and the **relief** arrives after the **damage**. **The flash drought is missed**: a drought that develops in **two to three weeks** by a combination of a **high vapour-pressure deficit** and a **heat wave**, with **no** precipitation deficit, is **invisible** to every precipitation index and is the **fastest-growing** type under warming. **And the human dimension is left out**: over the **Colorado**, the **Murray–Darling**, the **Aral**, the **Jordan** and the **North China Plain** the "drought" is a **demand** that exceeds a **over-allocated** supply, and an index computed on the **natural** climate reports a **meteorological** normal while the **socio-economic** drought deepens.
:::

::: history
**Fuller** (Fuller) fitted the first **flood-frequency** curve to 25 United States rivers in 1914 and introduced the **recurrence interval**; **Freeman** (Freeman) and **Foster** (Foster) extended the method in the 1920s and 1930s, and **Hazen** (Hazen) and **Bliss** (Bliss) wrote the first flood-frequency manuals. **Fisher and Tippett** (Fisher) proved the **extreme-value** limit theorem in 1928, **Gumbel** (Gumbel) brought it to hydrology in 1941 and published *Statistics of Extremes* in 1958, **Langbein** (Langbein) developed the **partial duration series** in 1949, **Jenkinson** (Jenkinson) the **annual-highest-observations** method in 1955, and **Dalrymple** (Dalrymple) the flood-frequency chapter of the **Handbook of Hydrology**'s predecessor in 1960. The **log-Pearson III** became the United States standard through the **Water Resources Council** bulletins of 1967–1976, **Hosking, Wallis and Wood** (Hosking) introduced **L-moments** and the **regional GEV** in 1985–1993, and **Archfield and Villarini** (Villarini) the modern **regional** practice. **O'Connell** (O'Connell) brought **historical floods** into the likelihood in 1984, **Kjeldsen, and the European historical-flood school** (Kjeldsen) extended it in 2014, and **Kochel and Baker** (Kochel) wrote the **paleohydrology** treatise in 1988. **Searcy** (Searcy) introduced the **flow duration curve** in 1959, **Smakhtin** (Smakhtin) wrote the **low-flow hydrology** review in 2001, and **Nathan and McMahon** (McMahon) the standard **recession and low-flow** methods. **Palmer** (Palmer) defined the **PDSI** for the **US Weather Bureau** in 1965, **McKee, Doesken and Kleist** (McKee) the **SPI** at the 1993 **American Meteorological Society** meeting, **Guttman** (Guttman) its distributional critique in 1999, **Wells, Goddard and Hayes** (Wells) the **self-calibrating PDSI** and the concept of the **flash drought** in 2004, **Vicente-Serrano, Begueria and Lopez-Moreno** (Vicente-Serrano) the **SPEI** in 2010, **Sheffield, and the global drought school** (Sheffield) the global drought diagnostics in 2012, and **Yuan and Liu** (Yuan) the **flash-drought** diagnostics of the 2020s.
:::
## Where this leads

The hydrograph that the flood statistics summarise is derived in [[hydrology/runoff]], the antecedent moisture that controls it in [[hydrology/soil-water]] and the snowmelt that sets the seasonal regime in [[hydrology/snow]], the design storm in [[hydrology/precipitation-evaporation]], the hazard, the exposure and the risk in [[natural-hazards/floods]] and [[natural-hazards/risk]], the storms that deliver the extremes in [[meteorology/storms]] and [[natural-hazards/storms]], the low flows' aquifer in [[hydrology/groundwater-flow]] and [[hydrology/aquifers-wells]], the channel that carries the flood and records the paleoflood in [[geomorphology/rivers]] and [[geomorphology/drainage-basins]], the extreme-value statistics in [[climate-system/climate-statistics]], the observed trends in [[climate-change/observed-change]] and [[climate-change/extremes]], the drought's fire and heat in [[natural-hazards/wildfire-drought-heat]], and the water allocation in [[earth-resources/groundwater-resources]].

::: quiz
A town's levee protects against the 100-year flood. The record used to size it is 40 years long. What is the chance that the design flood is exceeded at least once in the levee's 50-year life, and what is the main additional uncertainty?
- [ ] 1 per cent; none, the design is conservative.
- [x] 39 per cent; that the true 100-year flood is larger than the estimate from a 40-year record.
- [ ] 50 per cent; the levee's height.
- [ ] 10 per cent; the rainfall gauge error.
::: solution
$1 - 0.99^{50} = 39$ per cent. The second and larger problem is **epistemic**: the 100-year flood estimated from a 40-year record is uncertain by a factor of order 1.5, and where a paleoflood record exists it typically puts the true 100-year flood 30–80 per cent above the statistical estimate. The levee is therefore more likely to be overtopped than the "1 per cent a year" phrase suggests.
:::
:::

::: summary
- A return period is an annual exceedance probability, not a countdown: a 100-year flood has a 63 per cent chance of occurring in a century.
- The largest flood in an n-year record is by construction an n-year flood; the design flood always lies beyond the record.
- The choice of extreme-value distribution changes the 100-year flood by 30–60 per cent and cannot be resolved by a goodness-of-fit test at any realistic record length.
- Paleoflood and historical records routinely show floods 1.3–2.5 times the at-site statistical estimate and are now required for dam spillways and EU flood hazard maps.
- Low flows are quantiles of the whole record, not of annual maxima; the flow duration curve's slope is the catchment's storage memory.
- Droughts come in four kinds with lags of weeks to years between them, and every drought index is a definition, not a measurement.
- The uncertainty of a flood or drought estimate is dominated by the record length, the distributional choice and the assumption of stationarity — in that order.
:::

## Exercises

::: exercise Exceedance probability {level=1 check="0.26"}
Find the probability of at least one 100-year flood in a 30-year period.
::: solution
$p = 1 - 0.99^{30} = 0.26$. The same arithmetic for a 20-year design life gives 18 per cent and for a 100-year one 63 per cent, which is the number that should be quoted whenever a "100-year" standard is defended in public.
:::
:::

::: exercise The plotting position {level=1 check="120"}
Find the Weibull return period of the largest flood in a 60-year annual-maxima record.
::: solution
$p = (1 - 0.5)/(60 + 0.25) = 0.0083$, so $T = 120$ years. The **record's largest event is only a 120-year flood**, and the design flood of any consequence lies beyond it.
:::
:::

::: exercise The Gumbel quantile {level=1 check="315"}
For a record with $\mu = 250$ and $\sigma = 90\ \mathrm{m^{3}\,s^{-1}}$, find the 5-year flood.
::: solution
$K_5 = 0.719$, so $x_5 = 250 + 90\times0.719 = 315\ \mathrm{m^{3}\,s^{-1}}$. The **5-year** flood is only **26 per cent** above the mean annual flood, which is why the **channel-forming** discharge — the one that does the geomorphic work — is a **1- to 2-year** event and why a river that is "restored" to its 5-year bankfull will not survive a decade of ordinary floods.
:::
:::

::: exercise Peak-over-threshold {level=2 check="0.33"}
A river's mean number of independent peaks above $400\ \mathrm{m^{3}\,s^{-1}}$ is 0.4 per year. Find the annual exceedance probability of that flood.
::: solution
For a **Poisson** arrival process, $p = 1 - e^{-\lambda}$, and $e^{-0.4} = 0.670$, so $p = 0.33$ and $T = 3.0$ years. The approximation $p \approx \lambda$ is good only for small $\lambda$; at $\lambda = 0.4$ it **underestimates** the probability by 25 per cent, and the error grows as the threshold is lowered.
:::
:::

::: exercise The flow duration curve {level=2 check="1.24"}
A flow duration curve has $Q_{20} = 12\ \mathrm{m^{3}\,s^{-1}}$ and $Q_{80} = 1.5\ \mathrm{m^{3}\,s^{-1}}$. Find the slope $b$ of $\ln Q$ against the standard normal deviate, and classify the catchment.
::: solution
$\Phi^{-1}(0.20) = -0.8416$ and $\Phi^{-1}(0.80) = +0.8416$, so
$$
b = \frac{\ln(12) - \ln(1.5)}{2\times0.8416} = \frac{2.079}{1.683} = 1.24 .
$$
A slope of **1.24** is a **steep, flashy, low-storage** catchment — a thin-soiled upland or an urbanised one — against $b < 0.3$ for a chalk or a karst. The **same** catchment will have a **flood** risk and a **drought** risk that are both **high**, because a low-storage catchment neither attenuates the peak nor sustains the baseflow.
:::
:::

::: exercise The standardised precipitation index {level=2 check="-1.75"}
Find the SPI for a 6-month total whose gamma non-exceedance probability is 0.040, and classify it.
::: solution
$\mathrm{SPI} = \Phi^{-1}(0.040) = -1.75$, a **severe** drought. At the **12-month** scale the same station's total might have an SPI of $-0.8$, and the two are **both correct** — they describe the **root zone** and the **groundwater** respectively, and the policy error is to use one where the other is required.
:::
:::

::: exercise The uncertainty of the design flood {level=3 check="94"}
For the 45-year record of the worked example ($\mu = 250$, $\sigma = 90\ \mathrm{m^{3}\,s^{-1}}$), find the 95 per cent confidence half-width of the 100-year flood using the Gumbel standard-error formula.
::: solution
With $y_{100} = 4.600$,
$$
\mathrm{SE}(x_{100}) = \frac{90}{\sqrt{45}}\left[1 + 0.53(4.064) + 0.588(4.064)^{2}\right]^{1/2} = 13.42\times3.587 = 48\ \mathrm{m^{3}\,s^{-1}},
$$
and the 95 per cent half-width is $1.96\times48 = 94\ \mathrm{m^{3}\,s^{-1}}$, or **18 per cent** of the $532\ \mathrm{m^{3}\,s^{-1}}$ estimate.

That figure is the **sampling** error **alone**, and it is the **smallest** of the components. The **distributional** choice contributes 15–30 per cent, the **non-stationarity** of a regulated or urbanised catchment 10–40 per cent, the **gauge** rating extrapolation 5–20 per cent, and the **areal** reduction of the design storm 10–25 per cent. Combined in quadrature the total is **35–50 per cent**, and the professional convention of quoting the 100-year flood to **three significant figures** is therefore indefensible — the honest statement is "between 400 and 750 m³ s⁻¹, best estimate 530".
:::
:::

::: exercise The drought lag {level=3 check="2020"}
A catchment's groundwater storage responds to a recharge deficit with a lag of 18 months and its streamflow with a lag of 4 months. A precipitation deficit begins in October 2018. In which year does the **hydrological** drought of the **groundwater** system first become visible, and what does that imply for a drought declaration made in spring 2019?
::: solution
The **groundwater** drought becomes visible about **18 months** later, in **spring 2020**, and the **streamflow** drought in **spring 2019**. A declaration made in **spring 2019** on the basis of the **streamflow** is therefore **correct but incomplete**: the deeper and longer-lasting **groundwater** drought has **not yet arrived**, will **persist** for one to three years after the rain returns, and will **not** be captured by a declaration that is **withdrawn** when the rivers recover.

The **policy** failure is systematic and documented across Europe, Australia and the western United States. The **declaration** is triggered by a **precipitation** or **streamflow** index with a **months-long** memory, the **relief** is withdrawn when that index recovers, and the **groundwater** — which supplies half the abstraction in the affected regions — is still at a **record low** and will take **two to five wet winters** to refill. The remedy is a **groundwater** or **storage** index in the declaration rule, and the reason it is rarely used is that **groundwater levels are measured far less densely than streamflow** and, in most countries, far less densely than is required to compute one.
:::
:::
