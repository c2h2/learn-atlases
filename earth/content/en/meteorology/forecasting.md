Lewis Richardson sat through the First World War doing arithmetic by hand, and in 1922 published the result: a six-hour forecast of a depression over central Europe, computed from a graphical grid of $211$ points at $200\ \mathrm{km}$ spacing, taking about six weeks of labour and getting the pressure change wrong by $145\ \mathrm{mb}$. The error was not the method's fault. Richardson had started from a pressure field whose vertical structure he had smoothed by hand, and the smoothing had launched a spurious gravity wave that destroyed the calculation in two steps; and the calculation was in any case as hard as the weather, since the atmosphere's information doubles its error every two days. Twenty-eight years later, on the ENIAC with a memory of a thousand 20-digit numbers, Jule Charney, Ragnar Fjørtoft and John von Neumann ran a barotropic model over a quarter of a continent and produced a usable twelve-hour forecast in five weeks of machine time. Today the European Centre for Medium-Range Weather Forecasts runs a $9\ \mathrm{km}$ global model fifty times a day, ingesting eleven million observations per cycle, and its ten-day forecast is as good as its four-day forecast of 1980.

::: definition The observing system {#def-observing}
No single instrument sees the whole atmosphere, and the art of observation is the arrangement of complementary ones. **Surface stations**: about $2000$ synoptic reports three-hourly and $10{,}000$ automatic stations hourly, giving pressure, temperature, dew point, wind, cloud and precipitation — over $70\%$ of them in the Northern Hemisphere, and the network over the ocean is ships, buoys and oil rigs. **Upper air**: $1100$ radiosonde stations releasing instrument-carrying balloons twice daily, ascending at $5\ \mathrm{m\,s^{-1}}$ and reporting pressure, temperature, humidity and wind to $30\ \mathrm{km}$ while drifting $200\ \mathrm{km}$ downwind, plus $10^5$ commercial aircraft soundings a day below cruise level, wind profilers, and the radiosonde's replacement by GPS radio-occultation limb sounding from satellites. **Satellites**: geostationary imagers taking a disc image every ten minutes in visible, near-infrared, thermal infrared at $10.8$, $12$ and $13.4\ \mu\mathrm{m}$ and a water-vapour band at $6.2$ and $7.3\ \mu\mathrm{m}$; polar orbiters carrying microwave sounders that see through cloud and measure the temperature and humidity of layers $2\ \mathrm{km}$ thick, scatterometers that read the sea-surface stress from the capillary-wave backscatter, altimeters that read the wave height and the wind, and lidars that profile the wind and the aerosol. **Radar**: a national Doppler network every five minutes in reflectivity and radial velocity, and since the 2000s dual-polarisation, which distinguishes rain from hail from snow from a migrating bird.

The numbers matter because the model needs $10^7$ to $10^8$ independent pieces of information to specify the state, and gets about $10^7$ observations a day, of which $95\%$ are satellite radiances that are not the variables the model carries. Converting a radiance into a temperature profile is the **observation operator**, and the whole of modern data assimilation is the business of combining them.
:::

::: example What one balloon is worth {#ex-sonde}
A radiosonde costs $\pounds 80$ to fly and reports a vertical profile every two seconds to $25\ \mathrm{km}$. A satellite microwave sounder costs a billion pounds and reports a radiance every $100\ \mathrm{km}$ every three hours. In what sense is the balloon more valuable, and in what sense less?
::: solution
The balloon gives a **direct**, calibrated measurement of temperature, pressure and humidity with an accuracy of $0.3\ \mathrm{K}$, $0.1\ \mathrm{hPa}$ and $3\%$ of relative humidity, and a vertical resolution of $10\ \mathrm{m}$. It is the standard against which the satellite is calibrated, and the reason the reanalyses of the twentieth century are unreliable before 1958 is not the lack of satellites but the lack of radiosondes. It is also, in the model's own currency, nearly worthless: one profile per $100{,}000\ \mathrm{km^2}$ twice a day contributes a few hundred observations to an analysis that needs millions, and it cannot be assimilated without an operator, since it is already in the model's variables.

The satellite is the opposite. Its $10^6$ soundings a day over a hemisphere are indirect, biased by the surface emissivity, by cloud liquid water and by an imperfect knowledge of the atmospheric absorption, and each one is only useful through a radiative-transfer calculation and a covariance model. But the Southern Hemisphere's forecast skill improved more from the launch of one microwave sounder in 2006 than from a decade of surface-station additions, and the ten-day forecast horizon of the Southern Hemisphere, which lagged the Northern by two days in 1990, now lags it by less than one. The honest summary is that the balloon is worth more per flight and the satellite is worth more per pound by four orders of magnitude, and that the observing system is a portfolio in which the expensive, indirect, all-seeing instruments are calibrated and checked by the cheap, direct, nearly invisible ones.
:::
:::

## Assimilation, and the two-week wall

::: proposition Error growth and the predictability limit {#prop-predictability}
Small errors in the atmospheric state grow exponentially, at a rate set by the same instability that makes the weather. Writing the r.m.s. error $E(t) = E_0 e^{t/\tau}$, observations and model experiments give a doubling time $\tau\ln 2$ of about **two days** for the large scales, and a saturation value $E_\infty$ equal to the climatological variability of the field. Prediction ceases when $E$ reaches $E_\infty$, so the horizon is
$$
t_\text{max} = \tau\ln\frac{E_\infty}{E_0},
$$
and every reduction in the initial error buys only a logarithmic gain: halving $E_0$ adds $\tau\ln 2 \approx 2$ days. With $E_0$ at the present analysis error of a few hundred metres of geopotential and $E_\infty$ at a thousand times that, the ceiling is about **two weeks**, and this is not an engineering limit but a property of the equations. Lorenz put it in 1969 as a question about a butterfly in Brazil and a tornado in Texas, and the correct answer is that the butterfly's atmosphere is not the same as the tornado's, but that the atmosphere's error doubling time is two days and nothing can be done about it except to make the initial state better and to forecast statistics rather than states.
:::

::: widget plot
f: e0*exp(x/2.9) ; 100
x: 0, 20
y: 0, 110
sliders: e0=1:0.1:20
labels: error (per cent of climatological variance)
caption: The growth of forecast error, as a fraction of the climatological variance, from an initial error set by the slider, with the two-day doubling time of the proposition and the horizontal line at the point where the forecast has no more information than the season's average. The curves are all the same shape and differ only in where they start, which is the whole story of the last forty years of forecasting: better observations and better assimilation have moved the curves to the right by a roughly constant amount, and the improvement per year has been steady at about one day of skill per decade. The practical horizon, taken as the point where the anomaly correlation of the $500\ \mathrm{hPa}$ pattern falls below $0.6$, is now $8.5$ days in the Northern Hemisphere and $7.5$ in the Southern, and the theoretical wall at two weeks has not moved at all.
:::

::: example The value of a better initial state {#ex-assimilation}
A centre reduces its analysis error by $20\%$ through the assimilation of a new satellite instrument. How much forecast skill does this buy, and how would you detect the improvement in a verification record dominated by noise?
::: solution
With $t_\text{max} = \tau\ln(E_\infty/E_0)$ and $\tau = 2.9$ days, a $20\%$ reduction in $E_0$ adds
$$
\Delta t = \tau\ln\frac{1}{0.8} = 2.9\times0.223 = 0.65\ \mathrm{days},
$$
fifteen hours of usable forecast — a large, expensive, entirely real improvement, and one that would be invisible in a year of verification at any single lead time shorter than seven days, because the day-to-day scatter of the skill is larger than the improvement.

The detection is done with the **paired-t test** over a verification period long enough that the standard error of the mean difference is smaller than the effect: for the anomaly correlation at ten days, whose daily standard deviation is about $0.15$ and whose correlation between the two experiments' daily scores is $0.9$, the required sample is of order $300$ days. This is why the operational centres run "targeted observation experiments" and publish in the quarterly journal rather than announcing an improvement after a month, and why the claim that a new instrument has improved forecasts is a statistical claim that most public discussion of observing systems does not make.
:::
:::

::: svg
caption: The assimilation cycle, as run twice a day by the operational centres. Observations arrive on a global telecommunications network with a deadline; the previous forecast, six hours old, provides the background; the two are combined in a variational minimisation or an ensemble filter that costs more computer time than the forecast itself; the resulting analysis is the best estimate of the state at the cycle time and the initial condition for the next forecast. The loop is what makes the system self-correcting: the model's own error is continually reined in by the observations, and the observations are continually recalibrated against the model's first guess. The failure mode is the reverse — an observation that is wrong in a way the operator does not know, or a background whose error covariance is wrong, can corrupt an analysis and the corruption propagates for days.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data assimilation cycle">
  <style>
    .box { fill: var(--surface); stroke: var(--ink-2); stroke-width: 1.4; }
    .flow { stroke: var(--series-1); stroke-width: 2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <rect class="box" x="40" y="60" width="150" height="60" rx="6"/>
  <rect class="box" x="270" y="60" width="150" height="60" rx="6"/>
  <rect class="box" x="500" y="60" width="180" height="60" rx="6"/>
  <rect class="box" x="380" y="190" width="180" height="60" rx="6"/>
  <rect class="box" x="120" y="190" width="160" height="60" rx="6"/>
  <path class="flow" d="M190,90 L270,90"/>
  <path class="flow" d="M420,90 L500,90"/>
  <path class="flow" d="M590,120 C590,170 560,190 520,205"/>
  <path class="flow" d="M380,220 L280,220"/>
  <path class="flow" d="M200,190 C200,150 240,120 300,110"/>
  <text class="lab" x="58" y="84">observations</text>
  <text class="sub" x="52" y="102">satellite, sonde, radar</text>
  <text class="lab" x="292" y="84">quality control</text>
  <text class="sub" x="288" y="102">reject 5 per cent</text>
  <text class="lab" x="518" y="84">assimilation</text>
  <text class="sub" x="512" y="102">4D-Var plus ensemble</text>
  <text class="lab" x="404" y="214">analysis</text>
  <text class="sub" x="396" y="232">the initial condition</text>
  <text class="lab" x="146" y="214">forecast</text>
  <text class="sub" x="136" y="232">6 hours ahead, 9 km</text>
  <text class="sub" x="40" y="286">the loop runs twice a day; the background is the previous forecast, six hours old</text>
</svg>
:::

::: definition Ensembles, and what a probability means {#def-ensemble}
A single forecast is a sample from a distribution, and the **ensemble** supplies the distribution: fifty-one runs of the same model from fifty-one perturbed initial conditions, each drawn consistently with the analysis error, and with the physics perturbed stochastically in the better systems. The ensemble's **spread** should equal its error, and when it does the system is **reliable**: of the days forecast with a $40\%$ chance of rain, forty per cent should rain. Reliability is necessary but not sufficient — a forecast of the climatological probability every day is perfectly reliable and useless — and the second quality is **sharpness**, the width of the distribution. The trade is measured by the **Brier score** for a binary event,
$$
\text{BS} = \frac{1}{N}\sum (f_i - o_i)^2 = \text{reliability} - \text{resolution} + \text{uncertainty},
$$
and by the continuous ranked probability score for a distribution. A forecast is "better" if it is reliable and sharper.

The public "forty per cent chance of rain" is defined as the probability that at least $0.2\ \mathrm{mm}$ falls at the point in the stated period, and it is a statement about the ensemble, not about your garden: a $40\%$ day may be a dry morning and a wet afternoon over half the city, and the number that matters for a flood warning is not the probability of rain but the distribution of its amount and its location.
:::

::: example Reading a forecast {#ex-reading}
A forecast issued at 06:00 for a point says: "precipitation probability $40\%$, most likely between 15:00 and 19:00; $850\ \mathrm{hPa}$ temperature $12\ ^\circ\mathrm{C}$; ensemble mean $6\ \mathrm{mm}$ with a spread of $12\ \mathrm{mm}$; the members split into two groups, one tracking the low north of the point and one south." Interpret for a farmer who must decide whether to spread slurry, given the rule that spreading is prohibited within six hours of rain of more than $1\ \mathrm{mm}$.
::: solution
The decision is asymmetric and the distribution, not the mean, decides it. The $40\%$ probability of any measurable rain is not the probability of the $1\ \mathrm{mm}$ threshold being exceeded in the relevant window, which the ensemble can give directly and which, given the split tracks and the fact that the rain falls with the northern group, is closer to $30\%$ if the point lies south of the mean track and $60\%$ if north. The spread of $12\ \mathrm{mm}$ against a mean of $6$ says the distribution is nearly exponential and the members disagree about whether it rains at all, not about how much.

The bimodality is the important information and is exactly what the mean destroys: a $6\ \mathrm{mm}$ ensemble mean from a bimodal distribution describes no member. The forecaster's job here is not to average but to identify which regime the point is in — and the discriminator is the position of the surface low, whose analysis error at six hours is $20\ \mathrm{km}$ and whose ten-day error is $200\ \mathrm{km}$. For the farmer the answer is a conditional one: if the deterministic and the northern cluster both keep the low to the north, the rain is likely and the spreading must wait; if the southern cluster is gaining members through the morning, the window is real. This is what a human forecaster adds to a model, and it is why the operational warning systems of every country keep a person in the loop for decisions of this shape.
:::
:::

::: example When to issue a warning {#ex-warning}
A surge of more than $3\ \mathrm{m}$ is forecast for a city of $400{,}000$ people. Evacuating the exposed district costs $\pounds 5\ \mathrm{M}$ in disruption and, if it is ordered too often, costs credibility. A surge of that size hitting an unevacuated district is estimated to cause $\pounds 500\ \mathrm{M}$ of loss and some hundreds of deaths. At what forecast probability should the evacuation be ordered, and what false-alarm rate is tolerable?
::: solution
For a binary decision with a cost $C$ of acting and a loss $L$ of failing to act, the expected cost of acting is $C$ and of not acting is $pL$, so the threshold is
$$
p^* = \frac{C}{C+L} = \frac{5}{505} = 1\%.
$$
The warning should be issued whenever the probability exceeds one per cent. This is the arithmetic behind every "worst case" warning policy, and it explains why a meteorological service that waits for a $50\%$ probability of a catastrophic surge is not being cautious but is being negligent by a factor of fifty in expected loss.

The consequence is a high false-alarm rate, and the numbers are worth stating plainly: a service that warns at $p>0.01$ and is well calibrated will warn on many occasions that do not flood, and the public's response to warnings decays with the number of false alarms — the "warning fatigue" measured in every evacuation study from Hurricane Eva of 1982, which produced a $90\%$ evacuation of Mauritius for a storm that then turned away, onwards. The answer is not to raise the threshold, which multiplies the deaths, but to make the warning conditional and graded — the "be ready" tier of the Dutch and the Bangladeshi systems — and to communicate the probability rather than the outcome. The comparison that ends the argument is Bangladesh: the 1970 Bhola cyclone killed $300{,}000$–$500{,}000$ people with no warning system at all, and the 2007 Sidr cyclone, of comparable intensity and with a forecast issued seventy-two hours ahead and a coastal evacuation of $1.9$ million, killed about $3500$. The forecast was not better than 1970's by a factor of a hundred; the last mile was.
:::
:::

::: warning The model is not the atmosphere
Three of the model's most important processes are not resolved and cannot be. **Convection** is represented by a parameterisation that decides, from the model's average profiles, how much water to move upward in an hour — a scheme written in 1974 whose descendants still run, and one that at a resolution of $9\ \mathrm{km}$ is being asked to do the job of the explicit simulation it was designed to replace. At $4\ \mathrm{km}$ the model is in the "**grey zone**", where some of the convection is resolved and some is parameterised and the two double-count. **Cloud and radiation** are computed from grid-box mean humidities with an assumed sub-grid distribution, because the model cannot see a cloud. **The boundary layer** is a diffusion with a coefficient a million times molecular. None of this means the model is wrong; it means that its output at the scale of a thunderstorm is a guess about a process, not a simulation of one, and that the difference between a good forecast and a bad one of a convective event is usually the initial condition rather than the physics. The newer machine-learning models, trained on the reanalyses, beat the physical models on the raw skill scores at three to seven days and are trained on seventy years of a climate that is changing; they have no explicit physics, they cannot be asked about a process, and their errors are largest for the extremes that matter. They will be used, and they will be used together with the physical models, and the honest position in 2025 is that nobody knows how much of their advantage will survive the decade.
:::

::: quiz
The main reason that a ten-day forecast cannot be made as accurate as a one-day forecast, even with a perfect model and perfect observations, is:
- [ ] The parameterisation of convection
- [x] The exponential growth of unavoidable small errors, with a doubling time of about two days
- [ ] The lack of observations over the oceans
- [ ] The chaos of turbulence, which makes the equations unsolvable
::: solution
The equations are solvable and the model is good; the atmosphere amplifies any error, however small, at a rate that gives a doubling time of about two days, so a perfect analysis is impossible in practice and even a $1\ \mathrm{mm}$ initial error saturates in a fortnight. Better observations and better physics both help, but only logarithmically: this is the two-week wall, and it is a property of the fluid, not of the computer.
:::
:::

::: history
Richardson's 1922 *Weather Prediction by Numerical Process* contains, besides the failed calculation, the design of a "forecast factory" — ten thousand clerks working in a domed hall the size of the Royal Albert Hall, passing results to one another, with one man in a basement who stops the calculation when it goes wrong. It took twenty-eight years and the electronic computer to build it, and the first successful run, on the ENIAC in April 1950, was a barotropic model that had to be reprogrammed by hand for each step and produced its twelve-hour forecast in five weeks. Operational numerical forecasting began in 1955 in Washington and Stockholm; the primitive equations replaced the barotropic model in 1960; the first global forecast was made in 1966 at the U.S. Navy's Weather Service, and the first satellite, TIROS-1, in 1960, so that by 1972 the model had begun to be run without the surface observations that had been its whole evidence in 1950. The variational assimilation of Le Dimet and Le Derell and of François Rabier's school replaced successive correction in the late 1980s, and the 4D-Var, which fits the model trajectory to observations over a window rather than the state at an instant, became operational at ECMWF in 1997. Ensemble forecasting, developed independently at ECMWF by Molteni and Palmer and at the National Centers for Environmental Prediction by Sela and Toth, became operational in both centres in 1992, and the ensemble is now the forecast: the deterministic run is a special case that the public is shown because it is easier to print. The verification of forecasts is older than any of it: the U.S. Weather Bureau began scoring its forecasters in 1901, and the anomaly correlation, the metric by which the last forty years of improvement have been measured, was adopted in the 1960s.
:::

## Where this leads

The equations the model integrates are derived in [[atmospheric-dynamics/equations-of-motion]] and their balanced approximation in [[atmospheric-dynamics/balanced-flow]]; the parameterised physics is in [[atmospheric-dynamics/cloud-physics]] and [[atmospheric-dynamics/boundary-layer]]; the use of the same machinery for climate projection, where the target is the statistics rather than the state, is in [[climate-modelling/model-hierarchy]] and [[climate-modelling/ensembles-scenarios]]; the reanalyses that assimilate the whole twentieth century are in [[palaeoclimate/last-two-millennia]]; and the effect of all this on the death rate from storms is in [[natural-hazards/risk-reduction]].

::: summary Key takeaways
- The observing system is a portfolio: 2000 surface stations, 1100 radiosonde launches a day, and 10^7 satellite radiances per cycle of which 95 per cent are not in the model's variables.
- Data assimilation combines a six-hour-old forecast with new observations; the analysis is the initial condition, and the loop runs twice a day.
- Error doubles every two days, so the horizon grows only logarithmically with the quality of the initial state: a 20 per cent better analysis buys fifteen hours.
- The two-week wall is a property of the equations, not of the computer.
- Ensembles replace the single forecast with a distribution; a good forecast is reliable and sharp, and the ensemble mean of a bimodal distribution describes no member.
- Convection, cloud and the boundary layer are parameterised, which is why a 9 km model forecasts a storm's environment well and its location badly.
- Skill has improved by about one day per decade, and the improvement is measurable only with hundreds of days of verification.
:::

## Exercises

::: exercise Error doubling {level=1 check="8.6"}
With a doubling time of two days, how long does an initial error of $1$ unit take to reach $20$ units?
::: solution
$t = 2\log_2 20 = 2\times4.32 = 8.6$ days. (Enter to one decimal: $8.6$.)
:::
:::

::: exercise Radiosonde drift {level=1 check="80"}
A radiosonde ascends at $5\ \mathrm{m\,s^{-1}}$ to $20\ \mathrm{km}$ in a $20\ \mathrm{m\,s^{-1}}$ mean wind. How far does it drift, in km?
::: solution
The ascent takes $20{,}000/5 = 4000\ \mathrm{s}$, so the drift is $20\times4000 = 8\times10^4\ \mathrm{m} = 80\ \mathrm{km}$. The balloon's report is therefore not a vertical column above the station but a slanted sounding $80\ \mathrm{km}$ downwind, which matters when the station is near a coast or a front.
:::
:::

::: exercise The value of observations {level=1 check="1.4"}
A centre reduces its initial error by a factor of two. How many days of extra forecast does the two-day doubling time buy?
::: solution
$\Delta t = \tau\ln 2 = 2\times0.693 = 1.4$ days. (Enter to one decimal: $1.4$.) This is the reason the billion-dollar satellite programmes are justified by fractions of a day.
:::
:::

::: exercise Brier score {level=2 check="0.21"}
You forecast a $30\%$ chance of rain on ten days, and it rains on three of them. Find the Brier score.
::: solution
$\text{BS} = [3(0.3-1)^2 + 7(0.3-0)^2]/10 = [3\times0.49 + 7\times0.09]/10 = [1.47+0.63]/10 = 0.21$. The climatological reference, forecasting the $30\%$ frequency always, gives the same value here, so the forecast has no resolution; the skill score is zero.
:::
:::

::: exercise CFL and the time step {level=2 check="96"}
A model with a $15\ \mathrm{km}$ grid and a semi-implicit treatment of sound waves allows a time step of $15\ \mathrm{min}$. How many steps does it take to integrate a 24-hour forecast?
::: solution
$24\times60/15 = 96$ steps. (Enter to the nearest unit: $96$.) The cost of a forecast scales as the number of steps times the number of grid points, and halving the grid spacing at fixed forecast length multiplies the cost by $16$ — four from the extra points in three dimensions and one from the shorter step — which is the reason the resolution of operational models has doubled only twice since 1995.
:::
:::

::: exercise Ensemble spread {level=2 check="0.8"}
An ensemble's spread at five days is $240\ \mathrm{m}$ of $500\ \mathrm{hPa}$ geopotential and its root-mean-square error is $300\ \mathrm{m}$. Find the ratio that a reliable system should have, and state whether this ensemble is over- or under-dispersive.
::: solution
A reliable ensemble has a spread-to-error ratio of $1$; here it is $240/300 = 0.8$, so the ensemble is **under-dispersive** and its probabilities are over-confident. Under-dispersion is the common fault of ensemble systems and is corrected by inflating the perturbations or by adding stochastic physics.
:::
:::

::: exercise The forecast factory {level=3}
Richardson's forecast factory required ten thousand clerks each doing one arithmetic operation every twenty seconds. Estimate the number of operations in a modern $10\ \mathrm{km}$ global forecast to ten days, and the number of clerks it would need.
::: solution
A $10\ \mathrm{km}$ global model has about $10^7$ columns and $10^2$ levels, so $10^9$ prognostic values per variable and perhaps $10^{10}$ in all. With a $20\ \mathrm{min}$ step, ten days is $720$ steps, and each step does perhaps $10^2$ operations per value in the dynamics and $10^3$ with the physics, giving
$$
10^{10}\times10^3\times720 \approx 7\times10^{15}
$$
operations. At one operation per clerk per twenty seconds, the factory needs $7\times10^{15}\times20/(86400\times365) = 1.6\times10^6$ clerk-years for a single forecast — which is why Richardson's scheme was never built and why the answer was a machine a thousand million times faster than a clerk. The modern centre runs $10^{21}$ operations per forecast day on a machine of $10^{18}$ floating-point operations per second, and the whole ten-day ensemble of fifty-one members costs about a million processor-hours.
:::
:::

::: exercise The predictability of a thunderstorm {level=3}
Individual convective cells are initiated at locations that vary by several kilometres from one afternoon to the next, and the analysis error at the mesoscale is $2\ \mathrm{K}$ in temperature and $2\ \mathrm{m\,s^{-1}}$ in wind. Explain quantitatively why the location of a thunderstorm cannot be forecast more than a few hours ahead, while the probability of thunder somewhere in a region can be forecast three days ahead.
::: solution
The cell's position is set by where the boundary-layer convergence lines are, which are features with a horizontal scale of a few kilometres and a life of an hour; an initial-condition error of $2\ \mathrm{K}$ in temperature displaces the convergence by
$$
\delta x \sim \frac{c_p\,\delta T}{g}\frac{z}{\partial\theta/\partial x}
$$
of order $5\ \mathrm{km}$, and the error in the position of a feature grows at the rate of the error-doubling at that scale, which is much faster than the synoptic doubling — of order a few hours rather than two days. Once the cell exists, its own cold pool and outflow determine the next cell's location, so the error compounds.

The regional probability is a different quantity: it depends on the environment — the cape, the shear, the capping inversion, the large-scale ascent — whose errors grow at the synoptic rate and whose thresholds are broad. A forecast of "a $40\%$ chance of thunderstorms over the county" is a statement about the environment and is skilful for days; a forecast of "a storm at the airfield at 16:40" is a statement about a realisation and is skilful for less than an hour. Every convective warning system in the world is built on this distinction, and every public complaint that "you said thunderstorms and we got none" is a complaint about the difference between a distribution and a sample.
:::
:::

::: exercise The last mile {level=2 check="1.4"}
A warning service needs a forecast probability above $20\%$ to evacuate, and the cost-loss threshold of the worked example gives $p^* = 1\%$. If the service warns only when the probability exceeds $20\%$, by what factor does its policy exceed the expected-loss optimum in terms of the threshold probability?
::: solution
$0.20/0.01 = 20$: the service requires twenty times the probability that minimises expected loss, and in doing so accepts nineteen times the expected damage. The factor is the ratio of the two thresholds, and the reason real services set it high is not arithmetic but behavioural — the cost of a false alarm is not only the $\pounds 5\ \mathrm{M}$ of disruption but the erosion of trust that makes the next warning less effective. The honest way to handle that is to include the credibility cost in $C$ and to publish the value used, rather than to leave an undisclosed and much larger threshold inside the decision.
:::
:::
