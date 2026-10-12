A catchment is a **non-linear, time-varying, spatially distributed** system, and the unit hydrograph — the assumption that it is **linear**, **time-invariant** and can be described by a **single curve** — is one of the most successful wrong ideas in science. It has been used for ninety years to design every bridge, culvert, levee and spillway on Earth, to forecast every flood the warning services issue, and to estimate every design flood that has never been observed. It works because the **non-linearity** of a catchment is mostly in the **amount** of runoff the storm generates, which is computed separately by the infiltration and storage calculations of [[hydrology/soil-water]], and only mildly in the **way** that water travels once it is moving.

## The hydrograph and its decomposition

::: definition The hydrograph, the unit hydrograph and its three assumptions {#def-uh}
A **storm hydrograph** is the discharge at the outlet against time, and it is decomposed into a **direct runoff** — the quick response of the storm, overland flow, throughflow and the fast pipe and fracture network — and a **baseflow** — the slow drainage of the storage that was already there. The **unit hydrograph** of **Sherman** (1932) is the direct-runoff hydrograph that would result from **one unit** (1 mm, or 1 inch) of **excess** rainfall falling **uniformly** over the catchment for a **uniform** duration, and the method rests on three assumptions:
$$
\begin{aligned}
&\textbf{linearity:} && Q(t) = \sum_{i} E_i\,u(t - i\,\Delta t) \\
&\textbf{time-invariance:} && u \ \text{does not depend on when the storm falls} \\
&\textbf{superposition:} && \text{successive bursts of excess add their responses}
\end{aligned}
$$
Given a storm of excess $E_1, E_2, \ldots$ in successive intervals and a measured direct-runoff hydrograph $Q_1, Q_2, \ldots$, the unit hydrograph is recovered by **deconvolution**, and applied to a new storm by **convolution**. Where no measured storm exists, the **synthetic** unit hydrographs — the **USGS triangular**, the **USACE**, the **gamma** or **Nash cascade**, and the **Clark** storage model — supply a curve from the catchment's **area**, **time of concentration** and **lag time**.

The **failures** of the assumptions are systematic and known. **Linearity fails** because the fast flowpaths are **saturated** only in wet conditions, so a catchment's unit hydrograph derived from a **small** storm **underpredicts** the peak of a **large** one by 20–50 per cent — the **non-linearity** that the **variable source area** produces and that the **Single Event Catchment Analysis** of the UK attempts to remove. **Time-invariance fails** because the **vegetation**, the **soil moisture** and the **snow** change seasonally, so a **winter** unit hydrograph is **faster** and **larger** than a **summer** one on the same catchment. **And the uniformity of the excess fails** most seriously of all: a **convective** storm whose centre falls over the **fast** part of the catchment gives a peak **twice** that of the same total depth falling over the **slow** part, and the **spatial** distribution of the excess is the largest single source of error in a unit-hydrograph forecast.
:::

::: definition Time of concentration, lag and the shape parameters {#def-tc}
The **time of concentration** $t_{\mathrm{c}}$ is the time for water to travel from the **hydraulically most remote** point to the outlet, and it sets the **scale** of the unit hydrograph. It is never measured and always **estimated**, by empirical formulae whose disagreement on the same catchment is a factor of two:
$$
\textbf{Kirpich:}\quad t_{\mathrm{c}} = 0.0195\,L^{0.77}S^{-0.385}\ \text{minutes}, \qquad
\textbf{McColl:}\quad t_{\mathrm{c}} = \frac{L}{670\,V}, \qquad
\textbf{FAA:}\quad t_{\mathrm{c}} = \frac{3.62\,A^{0.6}}{S^{0.3}} ,
$$
with $L$ the longest flowpath in metres and $S$ the slope in m m⁻¹. The **lag time** $t_{\mathrm{p}}$ — the time from the **centroid** of the excess to the **peak** — is then taken as a fraction of $t_{\mathrm{c}}$, most commonly $t_{\mathrm{p}} = 0.6\,t_{\mathrm{c}}$ or the **USACE** $t_{\mathrm{p}} = 0.55\,t_{\mathrm{c}} + t_{\mathrm{r}}/4$, and the **triangular unit hydrograph** has a **base time** of $t_{\mathrm{b}} = 2.01\,t_{\mathrm{p}}$ and a **peak** of $Q_{\mathrm{p}} = 0.208\,A/t_{\mathrm{p}}$ with $A$ in km² and $Q$ in m³ s⁻¹ per mm.

The **Nash cascade** replaces the triangle with the **gamma** distribution obtained from $n$ **linear reservoirs** in series,
$$
q(t) = \frac{1}{K\,\Gamma(n)}\left(\frac{t}{K}\right)^{n-1} e^{-t/K}, \qquad t_{\mathrm{p}} = (n-1)K,
$$
whose two parameters have physical readings: $K$ is the **travel-time** scale and $n$ the **dispersion** or the **number of storage elements**, and $n$ is observed to **decrease** with **catchment area** — from 5–8 on a hillslope to 1.5–2.5 on a large river — because a larger catchment has a **broader** distribution of travel times. The **flood wave** itself is the **kinematic** or **diffusive** response of the channel, whose **celerity** exceeds the **water velocity** by a factor of $1/m$ (with $m$ the velocity–discharge exponent, 5/3 for a **Manning** channel), so a flood **peak** travels **faster** than the **water** that carries it — the reason a **flood wave** arrives before the **tracer** you released with it.
:::

::: example Deriving a unit hydrograph by deconvolution {#ex-deconv}
A catchment receives $E_1 = 20\ \mathrm{mm}$ of excess in the first 2-hour interval and $E_2 = 30\ \mathrm{mm}$ in the second, and nothing afterwards. The measured direct-runoff hydrograph at 2-hour intervals is $100$, $450$, $650$, $380$, $140$, $30\ \mathrm{m^{3}\,s^{-1}}$. Derive the 2-hour unit hydrograph and the catchment area.
::: solution
The convolution $Q_j = \sum_i E_i\,u_{j-i+1}$ is inverted step by step:
$$
u_1 = \frac{Q_1}{E_1} = \frac{100}{20} = 5, \qquad
u_2 = \frac{Q_2 - E_2 u_1}{E_1} = \frac{450 - 150}{20} = 15,
$$
$$
u_3 = \frac{650 - 30\times15}{20} = 10, \qquad
u_4 = \frac{380 - 30\times10}{20} = 4, \qquad
u_5 = \frac{140 - 30\times4}{20} = 1,
$$
and the check is $Q_6 = E_2 u_5 = 30\times1 = 30$ ✓. The unit hydrograph is therefore $(5, 15, 10, 4, 1)\ \mathrm{m^{3}\,s^{-1}}$ per mm, and its volume must equal 1 mm over the catchment:
$$
A = \frac{\sum u_i\,\Delta t}{0.001} = \frac{35\times7200}{0.001} = 2.52\times10^{8}\ \mathrm{m^{2}} = 252\ \mathrm{km^{2}} .
$$

The **arithmetic** is trivial and the **judgement** is everything. The **baseflow** must be removed **first**, and the separation is a **choice** — the straight-line method, the **Pettyjohn** and **Henn** filter, the **Eckhardt** recursive filter, the **recession-continuity** method — that changes the derived unit hydrograph's **volume** and therefore the **area**, and a **wrong** separation gives an **area** that disagrees with the **map**, which is the standard check. The **excess** must be computed **independently**, and if it is instead **fitted** then the deconvolution is **circular** and the unit hydrograph has no predictive content. And the **result must be tested**: a unit hydrograph whose **peak** is **negative**, whose **time to peak** is **less** than the interval, or whose **area** disagrees with the **map** by more than 10 per cent is a **numerical artefact** of a badly chosen baseflow or a **spatially non-uniform** storm.

The **practical** rule that follows is that a **single** storm gives a **single** unit hydrograph and that **no** hydrologist uses one. The standard practice is to derive unit hydrographs from **ten to twenty** storms, **average** them, and **report** the **scatter** — and the scatter, which is 20–40 per cent in the peak and 1–3 hours in the time to peak, is the **honest** uncertainty of every design flood computed by the method.
:::
:::

::: widget plot
f: ((x/6)*(x/6)*exp(-x/6))/12
x: 0, 48
y: 0, 0.05
labels: q(t)
caption: The **Nash cascade** unit hydrograph for $n = 3$ linear reservoirs with a storage coefficient $K = 6\ \mathrm{h}$ — the gamma distribution $q = (t/K)^{n-1}e^{-t/K}/(K\Gamma(n))$. The **peak** falls at $t_{\mathrm{p}} = (n-1)K = 12\ \mathrm{h}$ and the curve is **skewed**, rising in 12 hours and falling in 30, which is the **universal** asymmetry of real hydrographs and the reason the **triangular** unit hydrograph, whose rising limb is half the base time, is a **poor** representation of the recession. The two parameters have a **physical reading** that the triangle lacks: $K$ is the **travel-time** scale, which sets the **flood wave's speed**, and $n$ is the **number of storage elements**, which sets the **attenuation**. A **steep, small, urbanised** catchment has $n \approx 1.5$ and a **sharp** peak; a **large, flat, forested, peat-mossed** catchment has $n \approx 5$ and a **broad** one; and the **change** in $n$ between a **pre-** and **post-development** fit is a better measure of a catchment's **urbanisation** than the change in the peak, because it is **dimensionless** and therefore **comparable** between catchments.
:::

::: example Time of concentration and the rational method {#ex-rational}
A 2-km² urban catchment has a longest flowpath of 5000 m and a slope of 0.02 m m⁻¹. Find the Kirpich time of concentration, and the peak discharge for a 10-year storm with an intensity of $60\ \mathrm{mm\,h^{-1}}$ and a runoff coefficient of 0.40.
::: solution
$$
t_{\mathrm{c}} = 0.0195\times5000^{0.77}\times0.02^{-0.385} = 0.0195\times703\times4.51 = 62\ \mathrm{min},
$$
and the **rational method** gives
$$
Q = C\,i\,A = 0.40\times\frac{60\times10^{-3}}{3600}\ \mathrm{m\,s^{-1}} \times 2\times10^{6}\ \mathrm{m^{2}} = 13.3\ \mathrm{m^{3}\,s^{-1}} .
$$
The **duration** of the design storm is therefore **62 minutes**, because the rational method's whole content is that the peak occurs when the **whole** catchment is contributing, which requires a storm at least as long as $t_{\mathrm{c}}$.

The method's **economy** — one intensity from an IDF curve, one coefficient from a table, one area from a map — is why it is used for every small drainage design on Earth, and its **limitations** are correspondingly important. It gives a **peak** and **no hydrograph**, so it cannot be used for a **reservoir**, a **routing** study or a **water-quality** model. It assumes the **rainfall intensity is uniform** over the catchment and **constant** for the whole duration, which is **false** for the convective storms that produce the design event, and it therefore **underpredicts** the peak when the storm's **centre** moves with the flow and **overpredicts** it when the storm is **stationary** over the **headwaters**. And the **runoff coefficient** $C$ is a **tabulated** number that hides the whole of the antecedent condition, so the same catchment is assigned the same $C$ in a **drought** and after a **week of rain**, when its real coefficient may differ by a factor of three.

The **rule of thumb** that follows is that the rational method is defensible for catchments **below about 50 ha** and **return periods below 50 years**, that the **Kirpich** formula is defensible for **steep** rural catchments and **not** for **flat** or **urban** ones — where the **inlet** and **pipe** times dominate and the **overland** formula overestimates $t_{\mathrm{c}}$ — and that for anything larger, more frequent, or more consequential, the **unit hydrograph** with a **spatially distributed** excess is the minimum standard.
:::
:::

## Routing, recession and the catchment's memory

::: definition The recession and the catchment's memory {#def-recession}
Between storms the discharge falls as the storages drain, and for a **linear reservoir** the fall is **exponential**,
$$
Q(t) = Q_0\,e^{-t/k}, \qquad k = \frac{S}{Q},
$$
with $k$ the **recession constant** in days and $S$ the storage. A **semi-log** plot of the daily discharge against time is therefore a **straight line** whose **slope** gives $k$, and real recessions are **concave upward** on that plot because the **fast** storages — the variable saturation zone and the pipe network — drain first and the **slow** ones — the deep fracture and matrix groundwater — take over. The **master recession curve**, obtained by overlaying the recessions of many events, is the **best estimate of the catchment's storage structure** available from the stream alone, and the **baseflow index** — the ratio of the baseflow to the total flow — is the **single best index** of a catchment's geology, ranging from **0.95** on a **chalk** or a **karst** aquifer to **0.25** on a **clay** or a **shale**.

The recession constant is a **hydraulic** measurement of the **aquifer** beneath the catchment: $k$ is related to the **drainage-interval spacing**, the **transmissivity** and the **specific yield** by the **Boussinesq** solution, and a **chalk** catchment with a $k$ of 60 days and a **clay** catchment with a $k$ of 3 days differ in their **low flows**, their **water quality**, their **ecology** and their **vulnerability to abstraction** in exactly the way that one number predicts. The **recession** is therefore the **cheapest** and most **under-used** source of hydrogeological information in the world.
:::

::: definition Flood routing and the Muskingum method {#def-routing}
**Routing** propagates a hydrograph downstream through a **reach** of river, a **reservoir** or a **floodplain**. The **Muskingum** method assumes the reach's storage is a linear combination of the **inflow** and **outflow**,
$$
S = K\left[X I + (1 - X)O\right], \qquad 0 \le X \le 0.5,
$$
which with the continuity equation gives the explicit scheme
$$
O_2 = C_0 I_2 + C_1 I_1 + C_2 O_1, \qquad C_0 + C_1 + C_2 = 1,
$$
with $K$ the **travel time** through the reach (hours) and $X$ the **wedge** parameter, which is $0$ for a **pure reservoir** (no wedge), $0.5$ for a **pure translation** (no attenuation) and $0.05$–$0.3$ for a natural river. The method **attenuates** and **delays** the peak, and its **weaknesses** are that $K$ and $X$ must be **calibrated** from a past flood and are **discharge-dependent**, that it **cannot** represent **backwater** from a tributary or a tide, and that it **conserves mass** but not **momentum**, so it fails badly where the **hydraulic** flow is **unsteady** and **looped** — the tidal reaches and the leveed floodplains.
:::

::: example The recession constant and the baseflow {#ex-recession}
After a storm a river's daily mean discharge falls from $20$ to $10\ \mathrm{m^{3}\,s^{-1}}$ in 15 days and continues to fall at the same semi-log slope. Find the recession constant, the storage if the mean discharge over the period was $14\ \mathrm{m^{3}\,s^{-1}}$, and the time for the flow to fall from 20 to $2\ \mathrm{m^{3}\,s^{-1}}$.
::: solution
$$
k = \frac{15}{\ln(20/10)} = \frac{15}{0.693} = 21.6\ \text{days},
$$
and the storage, from $S = kQ$ with the mean discharge, is
$$
S = 21.6\times14\times86{,}400 = 2.6\times10^{7}\ \mathrm{m^{3}} .
$$

The time to fall to $2\ \mathrm{m^{3}\,s^{-1}}$ is
$$
t = k\ln\frac{20}{2} = 21.6\times2.303 = 50\ \text{days}.
$$
A recession constant of **22 days** is a **groundwater-dominated** catchment — a chalk, a sandstone, a karst or a thick till — and the 50-day fall to one-tenth of the storm flow is the reason such a catchment's rivers **run** in a three-month drought and a **clay** catchment's do not.

The **concavity** of the real recession is the information. A **single** straight line on the semi-log plot is the signature of a **single** linear reservoir, which no real catchment is; the **upper** part of the recession, in the first 1–3 days, has a $k$ of **1–5 days** and is the **variable-source-area** and **pipe-flow** storage, and the **lower** part has a $k$ of **20–100 days** and is the **deep groundwater**. Fitting the two segments separately gives the **two-reservoir** structure of the catchment, and the **ratio** of the two $k$ values is a measure of the **importance** of the fast pathways — which is why the **recession analysis** of a **karst** catchment shows a $k$ of 0.5 days after a storm and 90 days in a drought, and why the same catchment floods in an hour and nearly stops flowing in a month.

The **abstraction** consequence is direct. A licence to abstract $0.5\ \mathrm{m^{3}\,s^{-1}}$ from a catchment whose **7Q10** — the lowest 7-day mean flow with a 10-year return period — is $1.2\ \mathrm{m^{3}\,s^{-1}}$ is a licence to **reduce** the drought flow by **40 per cent**, and the **7Q10** is computed from the **recession** of the record, so the **recession constant** is the number on which the **legality** of a water supply depends and the **ecology** of the river downstream.
:::
:::

::: example Muskingum routing through a reach {#ex-muskingum}
A river reach has $K = 12\ \mathrm{h}$ and $X = 0.15$, and the routing time step is $\Delta t = 6\ \mathrm{h}$. The inflow rises from $20$ to $50\ \mathrm{m^{3}\,s^{-1}}$ between two steps and the previous outflow was $25\ \mathrm{m^{3}\,s^{-1}}$. Find the coefficients and the new outflow, and state what the method has done to the flood wave.
::: solution
$$
C_0 = \frac{0.5\Delta t - KX}{0.5\Delta t + K(1-X)} = \frac{3 - 1.8}{3 + 10.2} = 0.091, \quad
C_1 = \frac{3 + 1.8}{13.2} = 0.364, \quad
C_2 = \frac{-3 + 10.2}{13.2} = 0.545,
$$
which sum to 1.000 as they must, and
$$
O_2 = 0.091\times50 + 0.364\times20 + 0.545\times25 = 4.5 + 7.3 + 13.6 = 25.5\ \mathrm{m^{3}\,s^{-1}} .
$$
The inflow has risen by **150 per cent** and the outflow by **2 per cent**: the reach has **attenuated** the rise almost completely and **delayed** it by a lag of order $K(1 - 2X) = 12\times0.70 = 8.4\ \mathrm{h}$.

The **stability** of the scheme is the practical snare. The coefficients are **positive** and the scheme **stable** only if $0.5\Delta t < K(1 - X)$, which here is $3 < 10.2$ ✓; a time step **longer** than that makes $C_2$ **negative** and the outflow **oscillates** and **diverges**, which is the standard first failure of a student's routing code. And the **calibration** is the conceptual snare: $K$ and $X$ are fitted to **one** flood and then applied to **another** of a different size, when in reality $K$ **decreases** with discharge (a bigger flood travels **faster**) and $X$ **increases** (a bigger flood is **less** attenuated), so a **calibrated** Muskingum reaches **overpredicts** the attenuation of a **large** flood — which is exactly the direction of error that gets a **downstream** town flooded.

The **physical** alternative is the **Saint-Venant** equations, which conserve **mass** and **momentum** and reproduce the **hysteresis** of the stage–discharge loop that a real flood shows — the same discharge at a **rising** stage and at a **falling** stage differs by 20–40 per cent in a **backwater**-affected reach — and the modern practice is **Saint-Venant** for **design** and **Muskingum** for **real-time forecasting**, where its **explicit** form and its **one-step** memory make it fast enough to run a hundred times an hour on a hundred tributaries.
:::
:::

::: warning A unit hydrograph is a hypothesis about a catchment, and it is always derived from a storm that was not the design storm
Seven errors recur in every practice. **The baseflow separation determines the answer**: the derived unit hydrograph's volume is the **area** times 1 mm, so a separation that removes too little baseflow gives a **too-small** unit hydrograph and a **too-small** design flood, and the difference between the **Eckhardt** and **recession-continuity** filters is routinely 15–30 per cent of the peak. **The excess is fitted, not measured**: if the excess is chosen to make the deconvolution "work", the unit hydrograph is a **restatement** of the observed hydrograph and has **no** predictive skill — and a large fraction of published unit hydrographs are of this kind. **The linearity is assumed where it fails**: on a catchment whose fast pathways are **dry** except in large storms, a unit hydrograph derived from a **10-mm** event **underpredicts** the peak of a **100-mm** event by 30–50 per cent, and the error is **one-signed** and **grows** with the design return period — which is the worst possible combination. **The spatial pattern is ignored**: the same total depth falling on the **headwaters** or the **lower catchment** changes the peak by a factor of two, and a design storm generated as a **uniform** depth is a **physically impossible** and usually **conservative** fiction. **The time of concentration is a formula**: the disagreement between **Kirpich**, **McColl**, **FAA**, **Tc = L/V** and the **time-to-peak of the observed hydrograph** on the same catchment is a factor of two, and the design peak is **inversely proportional** to $t_{\mathrm{p}}$, so the formula choice alone moves the peak by a factor of two. **The recession is fitted with one exponential**: a two-reservoir catchment fitted with one gives a **recession constant** that is **too small** for the drought and **too large** for the storm, and the **7Q10** derived from it is wrong by tens of per cent. **And the flood of record is treated as the maximum**: the **flood of record** in a 30-year series is a **30-year** flood, not the **maximum possible**, and a design based on "we have never seen a bigger one" is the most common cause of catastrophic overtopping in the history of the profession — the 1889 **South Fork**, the 1975 **Banqiao**, the 2009 **Gleno** and the 2011 **Barrington** failures all followed it.
:::

::: history
The first **rational-method** formula is the work of **Kuichling** (Kuichling) in 1889 and the first **flood-frequency** curve that of **Fuller** (Fuller) in 1914. **Sherman** (Sherman) invented the **unit hydrograph** from the **Green River** at Nashville and the storm runoff of New England in 1932, **Putnam** (Putnam) gave the **storage-indicating** routing method in 1932, **McCarthy** (McCarthy) of the **US Army Corps of Engineers** the **Muskingum** method in 1938, and **Clark** (Clark) its **reservoir** variant in 1945. **Kirpich** (Kirpich) published his time-of-concentration formula in 1940, **McColl** (McColl) his in 1945, the **US Army Air Corps** the **FAA** method in 1952, and **Mockus** (Mockus) the **S-curve** and the design-storm procedures of the **National Engineering Handbook** in 1957–1972. **Nash** (Nash) published the **cascade of linear reservoirs** in 1957, **Gray** (Gray) the **USACE** synthetic unit hydrograph in 1973, and **Potter** (Potter) the **triangular** unit hydrograph in 1978. **Rodriguez-Iturbe and Eagleson** (Rodriguez-Iturbe) founded the **geomorphologically based** unit hydrograph in 1966–1969 and **Rinaldo, Rodriguez-Iturbe and the Venice and Princeton groups** (Rinaldo) developed it through the 1990s. **Kirkby** (Kirkby) and **Beven and Kirchner** (Beven) produced the **topmodel** and the **variable source area** hydrograph in 1977–1982. **Arnberger** (Arnberger) introduced the **recession-curve analysis** in 1961, **Pettyjohn and Henn** (Pettyjohn) the **digital baseflow filter** in 1969, **Nathan and McMahon** (McMahon) the review of **recession methods** in 1990, and **Eckhardt** (Eckhardt) his recursive filter in 2005. **Linsley, Kohler and Paulhus** (Linsley) wrote the standard *Hydrology for Engineers* from 1949, **Chow, Maidment and Mays** (Chow) *Applied Hydrology* in 1988, and **Singh** (Singh) the two *Hydrologic Systems* volumes on unit-hydrograph theory in 1988.
:::
## Where this leads

The infiltration and antecedent moisture that produce the excess are in [[hydrology/soil-water]] and the evapotranspiration that sets them in [[hydrology/precipitation-evaporation]], the snowmelt hydrograph in [[hydrology/snow]], the flood statistics in [[hydrology/floods-droughts]] and the hazard in [[natural-hazards/floods]], the baseflow's aquifer in [[hydrology/groundwater-flow]] and [[hydrology/aquifers-wells]], the channel that routes the wave in [[geomorphology/rivers]], the drainage network that shapes the hydrograph in [[geomorphology/drainage-basins]] and [[geomorphology/hillslopes]], the flow duration curve and the ecology in [[earth-resources/groundwater-resources]], the digital elevation model from which every time of concentration comes in [[remote-sensing/gis-data]] and [[remote-sensing/spatial-analysis]], and the catchment response to warming in [[climate-system/hydrological-cycle]].

::: quiz
A catchment's unit hydrograph is derived from a 12-mm storm and applied to a 120-mm design storm. In which direction is the error, and why?
- [ ] It overpredicts, because the linear model adds too much fast flow.
- [x] It underpredicts, because the fast flowpaths only operate when the catchment is wet.
- [ ] It is unbiased, because the unit hydrograph is linear by construction.
- [ ] It depends only on the storm duration.
::: solution
The **variable source area**, the pipe network and the shallow perched storages are **dry** in a small storm and **fully active** in a large one, so the true response **steepens** with storm size while the linear model keeps the same shape. The unit hydrograph therefore **underpredicts** the design peak, typically by 20–50 per cent, and the error grows with the return period.
:::
:::

::: summary
- The unit hydrograph assumes linearity, time-invariance and superposition; all three fail systematically, and the failure is one-signed — it underpredicts large storms.
- The baseflow separation and the excess estimate, not the arithmetic of the deconvolution, determine the derived unit hydrograph and every design flood built on it.
- The time of concentration is always estimated and the empirical formulae disagree by a factor of two, which propagates directly into the design peak.
- The Nash cascade's two parameters have physical readings: a travel-time scale and a number of storage elements that decreases with catchment area.
- The recession constant is a cheap hydrogeological measurement and the baseflow index the best single index of a catchment's geology.
- Muskingum routing attenuates and delays but must use a time step shorter than $2K(1-X)$ and calibrated parameters that are discharge-dependent.
:::

## Exercises

::: exercise The rational method {level=1 check="4.4"}
Find the peak discharge for a catchment with $C = 0.35$, $i = 45\ \mathrm{mm\,h^{-1}}$ and $A = 1\ \mathrm{km^{2}}$.
::: solution
$Q = 0.35\times(45\times10^{-3}/3600)\times10^{6} = 4.4\ \mathrm{m^{3}\,s^{-1}}$. The metric shortcut is $Q = CiA/360$ with $Q$ in m³ s⁻¹, $i$ in mm h⁻¹ and $A$ in **hectares**, which gives $0.35\times45\times100/360 = 4.4$ — and the shortcut is worth memorising because the **unit** error between km² and ha is a factor of a hundred and is the commonest blunder in the method.
:::
:::

::: exercise The recession {level=1 check="23.7"}
A river's discharge falls from $30$ to $10\ \mathrm{m^{3}\,s^{-1}}$ in 26 days. Find the recession constant.
::: solution
$k = 26/\ln 3 = 26/1.0986 = 23.7\ \mathrm{d}$. A $k$ of about **24 days** is a groundwater-fed catchment; a $k$ of 1–3 days is a steep, thin-soiled or urbanised one, and the difference is the difference between a river that runs in August and one that does not.
:::
:::

::: exercise The triangular unit hydrograph {level=1 check="2.8"}
Find the peak of the triangular unit hydrograph for a 100-km² catchment with a lag time of 10 h, taking the base time as $2.01\,t_{\mathrm{p}}$.
::: solution
Setting the triangle's volume equal to 1 mm over the catchment,
$$
0.5\,Q_{\mathrm{p}}\times2.01\,t_{\mathrm{p}}\times3600 = 10^{-3}\times A\times10^{6}
\quad\Longrightarrow\quad
Q_{\mathrm{p}} = \frac{A}{3.62\,t_{\mathrm{p}}} = \frac{100}{36.2} = 2.8\ \mathrm{m^{3}\,s^{-1}\ per\ mm} .
$$
The **volume constraint** is the whole of the method: the triangle's shape is fixed by the two ratios $t_{\mathrm{p}}/t_{\mathrm{c}}$ and $t_{\mathrm{b}}/t_{\mathrm{p}}$, and its **height** is then **forced** by the requirement that it deliver 1 mm. A unit hydrograph whose volume does not equal 1 mm over the mapped area has a **wrong baseflow separation**, a **wrong area** or a **wrong excess**, and the volume check is the first thing to make on any derived curve.
:::
:::

::: exercise Nash cascade {level=2 check="12"}
A Nash-cascade unit hydrograph has $n = 3$ and $K = 6\ \mathrm{h}$. Find the time to peak, and its ratio to a base time taken at $t = 8K$.
::: solution
$t_{\mathrm{p}} = (n-1)K = 2\times6 = 12\ \mathrm{h}$. The ratio to a base time of $8K = 48\ \mathrm{h}$ is $12/48 = 0.25$ — the **rising limb occupies a quarter** of the hydrograph and the recession three-quarters, which is the universal asymmetry of real storm hydrographs.
:::
:::

::: exercise Convolution {level=2 check="650"}
Using the unit hydrograph $(5, 15, 10, 4, 1)\ \mathrm{m^{3}\,s^{-1}}$ per mm, find the direct runoff at the third time step for a storm with excesses of 20 and 30 mm in the first two intervals.
::: solution
$Q_3 = E_1 u_3 + E_2 u_2 = 20\times10 + 30\times15 = 200 + 450 = 650\ \mathrm{m^{3}\,s^{-1}}$. Note that the **second**, larger burst contributes **more** to the third step than the first, smaller one, because it is multiplied by the **earlier**, larger unit-hydrograph ordinate — the arithmetic of superposition and the reason a storm's **peak timing** relative to its **volume** matters as much as its total.
:::
:::

::: exercise The baseflow index {level=2 check="0.9"}
A chalk catchment has a mean annual flow of $2.0\ \mathrm{m^{3}\,s^{-1}}$ and a mean annual baseflow of $1.8\ \mathrm{m^{3}\,s^{-1}}$. Find the baseflow index, and state three consequences.
::: solution
$\mathrm{BFI} = 1.8/2.0 = 0.90$. The three consequences are: **low flows** are high and stable, so the river supports abstraction and ecology through a drought; **storm peaks** are low and delayed, so the flood risk is modest; and **water quality** is good but **vulnerable**, because the same high permeability that stores the water transmits **nitrate**, **pesticide** and **faecal coliforms** through the **macropores** to the abstraction point within days of application — which is why chalk aquifers supply most of England's drinking water and most of its **nitrate vulnerable zones**.
:::
:::

::: exercise Muskingum stability {level=3 check="20.4"}
A reach has $K = 12\ \mathrm{h}$ and $X = 0.15$. Find the largest time step for which the Muskingum coefficients remain positive.
::: solution
The condition is $0.5\,\Delta t < K(1 - X)$, and $K(1-X) = 12\times0.85 = 10.2\ \mathrm{h}$, so the largest stable time step is $\Delta t = 2\times10.2 = 20.4\ \mathrm{h}$.

The practical point is that the limit is **generous** and is rarely the binding constraint; what binds is **accuracy**. A time step of 20 h would give a **C₂** of zero and a **pure translation** with no attenuation, so the scheme must be run at a **small fraction** of the stability limit — conventionally $\Delta t \le K/5$ — and the **calibration** must be done at the **same** time step as the **application**, because a Muskingum reach calibrated at 1 h and applied at 6 h gives a **different** attenuation. This is a **numerical** artefact and not a physical one, and it is one of the commonest silent errors in operational flood forecasting.
:::
:::

::: exercise The non-linearity of the unit hydrograph {level=3 check="1.5"}
A catchment's unit hydrograph derived from a 10-mm storm has a peak of $3.0\ \mathrm{m^{3}\,s^{-1}}$ per mm. A 100-mm storm on the same catchment gives an observed peak of $450\ \mathrm{m^{3}\,s^{-1}}$. Find the ratio of the observed to the linearly predicted peak, and give two mechanisms.
::: solution
The linear prediction is $3.0\times100 = 300\ \mathrm{m^{3}\,s^{-1}}$, so the ratio is $450/300 = 1.5$ — the linear model **underpredicts** by 50 per cent.

The two mechanisms are the **expansion of the contributing area** and the **activation of the fast pathways**. In the small storm only the **near-channel** wetland and the **permanently saturated** hollows contribute, so the response is **slow** and **small**; in the large storm the **water table reaches the surface** over the whole floodplain and the **pipe network** fills, so a much **larger** area contributes through a much **faster** pathway. Both act in the same direction, and both are **threshold** processes, which is why the runoff coefficient of a catchment is a **step function** of the antecedent wetness rather than a smooth curve, and why the **largest** floods on record so often come from storms that were **not** the largest on record.
:::
:::
