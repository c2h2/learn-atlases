No thermometer has ever measured climate. Every instrument measures a weather at a place at an hour, and climate is what the statistics of those measurements look like when the noise has been averaged away and the gaps have been filled honestly. That is why this chapter is a statistics chapter: not because climate is a social science in disguise, but because the signal we care about — a tenth of a degree a decade against a daily scatter of several kelvin — is smaller than the noise by three orders of magnitude, and can only be recovered by knowing the noise well.

The standard shorthand is that "climate is what you expect, weather is what you get". It is not wrong, but it is incomplete in a way that has cost real money in impact assessment. A climate is not a mean. It is a distribution: of means, variances, covariances, seasonal cycles, autocorrelations, and of the tails, which is where the deaths and the insurance claims live. Two places can share an annual mean temperature and one of them will have frosts that kill maize and the other will not.

## What a climate record actually is

::: definition Climate normal and climate {#def-normal}
The World Meteorological Organization defines a **climate normal** as a thirty-year average of a variable, currently 1991–2020. Formally, the **climate** of a variable $X$ at a place is the probability law of $X$ — its moments, its seasonal modulation, its dependence structure and its tails — conditioned on the slowly varying boundary conditions (greenhouse gas concentrations, insolation, ice-sheet geometry) that are treated as fixed over the averaging window.
:::

The second half of that definition is the operative one. A climate is not stationary: the 1991–2020 normal differs from the 1961–1990 normal by about $0.2\ ^\circ\mathrm{C}$ globally, and the difference is not sampling noise. Every estimate of a climate statistic is therefore an estimate of a *moving* distribution, and the whole craft of the subject lies in separating the drift from the wander.

::: definition Anomaly, homogenisation and coverage {#def-anomaly}
Climate data are almost never used as absolute values but as **anomalies** — departures from a local reference period. Anomaly averaging works because the spatial correlation of anomalies is far longer-ranged than that of the variable itself: a cold-air outbreak makes $-12\ \mathrm{K}$ anomalies over a continent, whereas the absolute temperature differs by $40\ \mathrm{K}$ between the same two stations. **Homogenisation** is the statistical removal of non-climatic step changes (station moves, instrument changes, a new screen, an urbanising environment) using the records of neighbouring stations; **coverage** is the fraction of the surface represented by the network, which for the early twentieth century is under $30\%$ over land and much less over ocean.
:::

The practical numbers are worth memorising. The global surface temperature record used by the IPCC (HadCRUT5, Berkeley Earth, GISTEMP, Copernicus/ERA5) is built from roughly $7{,}000$ land stations with long records and from $10^{8}$ marine observations, mostly ship engine-room intake and, since the 2010s, drifting-buoy measurements. Sea surface temperature records were re-bias-corrected in the 2010s for the change from bucket sampling to engine-room intakes and drifting buoys, a systematic difference of order $0.3\ ^\circ\mathrm{C}$ whose correction moved the early twentieth-century baseline by a few hundredths of a degree and changed the estimated rate of early-century warming (HadCRUT5, 2020).

::: example How much of the record is actually there? {#ex-coverage}
Land is $29\%$ of the surface. Suppose the land station network represents each measurement by an influence radius of $250\ \mathrm{km}$ and that $7{,}000$ stations are reporting in 1900 and $30{,}000$ in 2000. Estimate the fraction of land covered in each year, and explain why the global mean is better determined in 1900 than the land mean of central Africa or the Arctic.
::: solution
Each station covers $\pi(2.5\times10^{5})^2 = 2.0\times10^{11}\ \mathrm{m^2}$, so $7{,}000$ stations cover $1.4\times10^{15}\ \mathrm{m^2}$ — nearly ten times the land area of $1.49\times10^{14}\ \mathrm{m^2}$. The discs overlap heavily, so nominal *area* coverage is complete while *representativeness* is not: the stations are concentrated in North America, Europe and East Asia. In 1900 Africa north of the Sahara, the Amazon, Siberia, Antarctica and most of the ocean had almost no stations.

The resolution of the paradox is that the global mean is a weighted average in which the well-sampled regions constrain the poorly sampled ones through the covariance structure of the field — the technique of **kriging** used by GISTEMP and Berkeley Earth. A region with no stations is not unmeasured if its neighbours are, provided the spatial correlation length ($\sim2{,}000\ \mathrm{km}$ for annual surface temperature) is respected. It is, however, much less well measured, and the uncertainty bands in the early twentieth century are wider for that reason, not because the thermometers were worse.
:::
:::

## The statistics of a noisy, correlated series

::: definition Red noise and effective degrees of freedom {#def-rednoise}
Many climate variables behave to first order as a first-order autoregressive process, $\mathrm{AR}(1)$,
$$
x_{t+1} = \rho x_t + \sigma\epsilon_t ,
$$
with lag-one correlation $\rho > 0$: a **red** spectrum, more power at low frequency than white noise. A series of $n$ values with lag-one correlation $\rho$ carries only
$$
n_\text{eff} \approx n\,\frac{1-\rho}{1+\rho}
$$
independent degrees of freedom, so the standard error of its mean is larger than $\sigma/\sqrt{n}$ by $\sqrt{(1+\rho)/(1-\rho)}$.
:::

::: proof
The variance of the sample mean of a stationary series is $\mathrm{Var}(\bar x) = \frac{\sigma^2}{n}\sum_{k=-n}^{n}(1-|k|/n)\rho^{|k|}\times2$-sided; for large $n$ the sum tends to $(1+\rho)/(1-\rho)$, giving the result. The physical origin of $\rho > 0$ is memory: the ocean mixed layer, soil moisture and sea ice all integrate, so this month's anomaly is a partial predictor of next month's. Ignoring it is the commonest error in casual climate statistics, and it is the reason a "significant trend" claimed from a short correlated series is so often not.
:::

::: example Is the 1998–2012 "hiatus" significant? {#ex-hiatus}
Annual global mean surface temperature has a standard deviation of about $0.09\ \mathrm{K}$ about a smooth trend and a lag-one autocorrelation of about $0.15$. Fifteen years of data give an estimated trend of $0.005\ \mathrm{K\,yr^{-1}}$ with the long-term trend near $0.019\ \mathrm{K\,yr^{-1}}$. Estimate the standard error of a 15-year trend and say whether the difference is significant.
::: solution
For a linear trend fitted to $n$ values with residual standard deviation $\sigma_e$ and lag-one correlation $\rho$, the standard error is approximately
$$
\mathrm{SE}(b) \approx \frac{\sigma_e}{\sqrt{\sum(t-\bar t)^2}}\sqrt{\frac{1+\rho}{1-\rho}} = \frac{\sigma_e}{\sigma_t\sqrt{n}}\times1.36,
$$
with $\sigma_t = (n-1)/\sqrt{12} = 4.04\ \mathrm{yr}$ for $n = 15$. Hence $\mathrm{SE}(b) = 0.09\times1.36/(4.04\times\sqrt{15}) = 0.008\ \mathrm{K\,yr^{-1}}$. The difference between the observed and long-term trend is $0.014\ \mathrm{K\,yr^{-1}}$, or $1.8$ standard errors: not significant at the $5\%$ level.

That is the whole statistical answer to the hiatus. The 1998–2012 slope was never anomalous; it was a $1.8\sigma$ low draw from a distribution with a wide standard error, taken up by a natural experiment in noise amplification: 1998 was an extreme El Niño at the start of the window and the strong La Niña of 2010–2011 sat near its end. The physical answer — extra heat moved into the deep Atlantic and Southern Oceans by the wind and by the Pacific's decadal pattern — is in [[climate-system/variability]].
:::
:::

::: widget plot
f: 0.85^x
x: 0, 60
y: 0, 1
caption: The autocorrelation function of an $\mathrm{AR}(1)$ process with $\rho = 0.85$, the value appropriate to *monthly* global mean surface temperature. Memory decays to $1/e$ in $1/|\ln\rho| = 6$ months, so sixty monthly values carry about $60\times(1-0.85)/(1+0.85) = 5$ independent observations, not sixty. This is why statements about "the warmest month in 140 years" are far stronger evidence than statements about "the temperature has risen for five consecutive months", and why the standard errors in every climate trend table look embarrassingly large: the atmosphere has a short memory and the ocean a long one, and neither is white noise.
:::

## Extremes: where the damage is

::: definition Generalised extreme value distribution and return level {#def-gev}
Under weak conditions the distribution of block maxima (annual maximum temperature, annual maximum daily rainfall) converges to the **generalised extreme value** family,
$$
G(x) = \exp\left\{-\left[1 + \xi\frac{x-\mu}{\sigma}\right]^{-1/\xi}\right\},
$$
with location $\mu$, scale $\sigma$ and shape $\xi$. The $\xi = 0$ member is the Gumbel distribution, appropriate for temperature-like variables; $\xi > 0$ (heavy-tailed) is found for some rainfall and wind extremes. The **return level** $x_p$ for return period $p$ years solves $G(x_p) = 1 - 1/p$.
:::

::: proposition A warmer world does not merely shift the mean {#prop-tails}
If daily temperature anomalies are Gaussian with standard deviation $\sigma$ and the mean warms by $\Delta\mu$, the probability of exceeding a fixed threshold $T$ changes by the factor
$$
\frac{P(X > T - \Delta\mu)}{P(X > T)} = \exp\left(\frac{2\Delta\mu(T-\mu) - \Delta\mu^2}{2\sigma^2}\right),
$$
which grows without bound as $T$ moves into the tail. A $1\sigma$ shift multiplies the probability of a $2\sigma$ event by $7$, of a $3\sigma$ event by $17$ and of a $4\sigma$ event by $43$.
:::

::: proof
For a Gaussian, $\ln P(X > T) \approx -(T-\mu)^2/2\sigma^2$ in the tail (up to slowly varying factors). Substituting $\mu \to \mu + \Delta\mu$ and subtracting gives the exponent above. The result is the reason the "climate is just the mean" view fails: the mean shift is a small change in one parameter and a huge change in the far tail. Hansen and others (2012) used exactly this to show that the area of the globe experiencing $+3\sigma$ summer temperature anomalies grew from about $0.2\%$ in the 1950s to about $10\%$ by the 2010s — a fifty-fold increase from a shift of order $0.8\ \mathrm{K}$ in the mean, which is larger than the Gaussian prediction because land warms faster than the global mean and because soil-moisture feedbacks widen the distribution as well as moving it.
:::

::: example The 100-year event, twice {#ex-return}
Annual maximum temperature at a station is fitted by a Gumbel distribution with $\mu = 34.0\ ^\circ\mathrm{C}$ and $\sigma = 1.4\ ^\circ\mathrm{C}$. Find the 50-year and 100-year return levels. If the mean warms by $1.6\ ^\circ\mathrm{C}$ with unchanged $\sigma$, by what factor does the frequency of exceeding the old 100-year level increase?
::: solution
The Gumbel quantile is $x_p = \mu - \sigma\ln[-\ln(1 - 1/p)]$. For $p = 50$, $-\ln(1-0.02) = 0.0202$ and $\ln 0.0202 = -3.90$, so $x_{50} = 34.0 + 1.4\times3.90 = 39.5\ ^\circ\mathrm{C}$. For $p = 100$, $x_{100} = 34.0 + 1.4\times4.60 = 40.4\ ^\circ\mathrm{C}$.

After warming, exceeding $40.4\ ^\circ\mathrm{C}$ is as likely as exceeding $40.4 - 1.6 = 38.8\ ^\circ\mathrm{C}$ was before it, which is the $1 - \exp\{-\exp[-(38.8-34)/1.4]\} = 1/31$ level: the 100-year event becomes a 31-year event, a factor of $3.2$.

The general rule of thumb, robust across variables and climates, is that a $1\ ^\circ\mathrm{C}$ warming of a Gumbel-distributed maximum with $\sigma \approx 1.4\ ^\circ\mathrm{C}$ multiplies the frequency of the historical 100-year extreme by about three. This is the number that appears in heat early-warning statistics and in the design-code arguments, and it is why the observed record of "record-breaking" events is not evidence of anything beyond a shifting distribution: the ratio of record-breakers to record-setters in a stationary climate should be about one, and in the last two decades it has been about two to one globally.
:::
:::

::: widget plot
f: 34 - 1.4*ln(-ln(1-1/x))
x: 2, 200
y: 34, 42
caption: The Gumbel return-level curve for annual maximum temperature with $\mu = 34.0\ ^\circ\mathrm{C}$, $\sigma = 1.4\ ^\circ\mathrm{C}$: the temperature exceeded on average once in $p$ years. Note the shape — the curve is concave and rises steeply only at large $p$, so the 100-year level is only $0.9\ ^\circ\mathrm{C}$ above the 50-year level, and a modest warming converts rare events into common ones. Fitting $\mu$ as a linear function of year (or of global mean temperature) is the standard **non-stationary extreme value** method, and it is how the "has climate change made this heatwave more likely?" question is answered quantitatively in the attribution literature ([[climate-change/attribution]]).
:::

## Measuring the mean of the world

::: definition Uncertainty and the calibrated language {#def-uncertainty}
Assessed climate statements use a calibrated likelihood scale: *virtually certain* $>99\%$, *very likely* $95$–$100\%$, *likely* $66$–$100\%$, *about as likely as not* $33$–$66\%$, *unlikely* $0$–$33\%$. Uncertainty is decomposed into **measurement** error (instrument, siting, sampling), **coverage** error (unsampled regions and depths), **method** error (homogenisation, bias correction, interpolation) and **model** error (structural and parametric).
:::

The headline result of a century and a half of measurement is that the global mean surface temperature for the 2011–2020 decade was $1.09\ ^\circ\mathrm{C}$ above 1850–1900 (IPCC AR6, *very likely*, range $0.95$–$1.20$), that the last decade has exceeded the warmest of any in at least 125,000 years, and that the warming is larger over land ($1.59\ ^\circ\mathrm{C}$) than over ocean ($0.88\ ^\circ\mathrm{C}$), and larger still in the Arctic. Three independent lines — station and ship thermometers, reanalyses that assimilate them with a model, and satellite microwave sounding — agree on the trend to within a few hundredths of a degree per decade, which is the strongest form of validation available in a science where you cannot run the experiment twice.

::: example Diurnal asymmetry and what it diagnoses {#ex-diurnal}
Globally, nightly minimum temperatures have risen faster than daily maxima since 1950, by roughly $0.25\ ^\circ\mathrm{C}$ more over land. Give three mechanisms that produce this asymmetry and one that would produce the opposite.
::: solution
(i) Increased cloudiness and water vapour trap outgoing long-wave radiation at night, when there is no incoming solar to offset it. (ii) Soil-moisture decline shifts the surface energy balance from latent to sensible heat, and the effect is largest in the dry afternoon-to-night transition. (iii) Aerosol decreases and urbanisation raise the minimum disproportionately, because cities store heat by day and release it after sunset. The opposite signature — maxima rising faster than minima — is produced by strong deforestation or irrigation change, or by dust and volcanic aerosol, which cool the daytime maximum.

The asymmetry is diagnostic, not incidental: it constrains which forcing is at work. A greenhouse-gas-only forcing predicts the observed pattern; an aerosol-dominated one predicts the reverse. This is a small example of the general logic of **fingerprinting**, in which different causes are distinguished not by the amount of warming but by its spatial, seasonal, diurnal and vertical pattern ([[climate-change/attribution]]).
:::
:::

::: warning Three ways this chapter's statistics get abused
First, **cherry-picking the window**: the standard error of a 15-year global trend is about $0.008\ \mathrm{K\,yr^{-1}}$, so any trend over a decade or two can be made to look anomalous, and no claim about a trend shorter than about 25 years is informative. Second, **confusing the distribution with the mean**: "2023 was the warmest year" and "the mean has risen $1.1\ ^\circ\mathrm{C}$" are statements about different objects, and the first is far more sensitive to ENSO phase than the second. Third, **treating a return period as a promise**: a 100-year event has a $63\%$ chance of occurring at least once in a century and a $37\%$ chance of not occurring at all, and under a non-stationary distribution the number changes every decade — quoting a fixed return period for a city whose 100-year level has already risen $1.5\ ^\circ\mathrm{C}$ understates the hazard silently.
:::

::: quiz
Why do climate records use temperature anomalies rather than absolute temperatures?
- [ ] Because thermometers are not calibrated internationally.
- [x] Because anomalies are spatially smoother and more homogeneous, so a sparse network can estimate a global mean without resolving the huge absolute gradients.
- [ ] Because anomalies are normally distributed and absolute temperatures are not.
- [ ] To make warming look larger.
::: solution
Absolute surface temperature varies by $60\ \mathrm{K}$ between the stations in a single analysis and its spatial correlation length is short; the anomaly field has a correlation length of order $2{,}000\ \mathrm{km}$ and, crucially, a missing station's anomaly can be estimated from neighbours far away. Anomalies also cancel the elevation and siting offsets that make raw station comparisons meaningless. The convention is a variance-reduction trick, not a rhetorical one.
:::
:::

::: history
The instrument record begins with the systematic observations of the eighteenth century and the first global synthesis by Alexander von Humboldt (Humboldt) in the 1820s, who mapped isotherms and noticed the latitudinal temperature contrast between hemispheres. Joseph Henry and Joseph Rowan at the Smithsonian built the first continental network in the 1850s using volunteer observers; the invention of the telegraph turned weather into a synchronised, spatially extended object for the first time, and the International Meteorological Organisation founded in 1873 was the first international scientific body. The idea that the record itself might be contaminated is nearly as old: the British Association for the Advancement of Science warned about urban warming in 1878. The modern statistical treatment begins with Harold Jeffreys and then with Mitchell (Mitchell)'s 1976 paper on the detection of the greenhouse effect, which introduced the "signal-to-noise" framing, and with the "detection and attribution" revolution of the 1990s. Homogenisation matured with the U.S. Historical Climatology Network in the 1990s; the current generation of datasets (HadCRUT5, 2020; Berkeley Earth, 2019 onwards; ERA5, 2020) is defined by explicit uncertainty ensembles rather than single best estimates. The WMO's thirty-year normal, established in 1931 and updated every decade since, is the quiet administrative convention that makes the word "climate" mean something measurable.
:::

## Where this leads

The statistics developed here are the tools used in every later chapter: the trend estimates of [[climate-change/observed-change]], the significance tests of [[climate-change/attribution]], the return-level projections of [[climate-change/extremes]], the noise decomposition of [[climate-system/variability]], the model evaluation of [[climate-modelling/evaluation]] and the palaeo-analogue reasoning of [[palaeoclimate/dating]]. The next chapter closes the loop back to physics, with the energy budget that sets the mean in the first place.

::: summary
- Climate is a probability law, not a mean: means, variances, dependence and tails, conditioned on slowly varying boundary conditions.
- Records are built from anomalies, homogenised against neighbours, and interpolated with kriging; coverage, not thermometer quality, dominates early-century uncertainty.
- Climate series are red: with lag-one correlation $\rho$ a series of $n$ values carries $n(1-\rho)/(1+\rho)$ degrees of freedom, which is why trend standard errors are large and short windows are uninformative.
- Extreme maxima follow a Gumbel or generalised extreme value law; a $1\sigma$ mean shift multiplies $3\sigma$ event frequency by about seven.
- Global warming is $1.09\ ^\circ\mathrm{C}$ above 1850–1900 for 2011–2020, larger on land than ocean, largest in the Arctic, and confirmed by three independent measurement families.
- Nightly minima have risen faster than daily maxima, which is a fingerprint of greenhouse forcing rather than aerosol.
:::

## Exercises

::: exercise Effective degrees of freedom {level=1 check="18"}
An annual temperature series of 100 years has lag-one autocorrelation $0.7$. Find the effective number of independent observations.
::: solution
$n_\text{eff} = 100\times(1-0.7)/(1+0.7) = 17.6$, about $18$. The standard error of the 100-year mean is therefore $\sqrt{100/17.6} = 2.4$ times larger than the naive $\sigma/10$.
:::
:::

::: exercise Anomalies {level=1 check="0.2"}
The 1961–1990 normal of a station is $8.4\ ^\circ\mathrm{C}$ and the 1991–2020 normal is $8.6\ ^\circ\mathrm{C}$. What is the anomaly of the later period relative to the earlier, and why is this number more trustworthy than either normal?
::: solution
$0.2\ ^\circ\mathrm{C}$. Both normals carry the station's siting and instrument bias, which largely cancels in the difference; the anomaly is a change at one place, not a comparison between places, and is therefore far less sensitive to representativeness error.
:::
:::

::: exercise Trend standard error {level=1 check="0.0022"}
A 30-year temperature series has residual standard deviation $0.10\ \mathrm{K}$ about the trend and no autocorrelation. Find the standard error of the trend ($\sigma_t = (n-1)/\sqrt{12}$).
::: solution
$\sigma_t = 29/3.464 = 8.37\ \mathrm{yr}$, so $\mathrm{SE}(b) = 0.10/(8.37\times\sqrt{30}) = 0.0022\ \mathrm{K\,yr^{-1}}$. With $\rho = 0.15$ the factor $\sqrt{1.15/0.85} = 1.16$ gives $0.0025\ \mathrm{K\,yr^{-1}}$. A trend of $0.019\ \mathrm{K\,yr^{-1}}$ is thus $8\sigma$ — which is why the long-term warming trend is not in doubt.
:::
:::

::: exercise Gaussian tails {level=2 check="16.9"}
By what factor does a $1\sigma$ warming increase the frequency of $3\sigma$ events, exactly and by the asymptotic formula?
::: solution
Exactly, $Q(2)/Q(3) = 0.0228/0.00135 = 16.9$. The asymptotic exponent gives $\exp[(2\times1\times3 - 1)/2] = e^{2.5} = 12.2$, about $30\%$ low because the tail approximation drops the $1/x$ prefactor. For $4\sigma$ the exact ratio is $43$. The exponential sensitivity to the threshold is the point: the same warming that is a rounding error in the mean is an order-of-magnitude change in the tail.
:::
:::

::: exercise Return levels {level=2 check="42.7"}
With Gumbel $\mu = 34.0\ ^\circ\mathrm{C}$, $\sigma = 1.4\ ^\circ\mathrm{C}$, find the 500-year return level of annual maximum temperature.
::: solution
$-\ln(1 - 1/500) = 0.002002$; $\ln(0.002002) = -6.215$; $x_{500} = 34.0 + 1.4\times6.215 = 42.7\ ^\circ\mathrm{C}$. The logarithmic growth means that extrapolating far beyond the data length is essentially unconstrained by the data.
:::
:::

::: exercise Return period arithmetic {level=2 check="0.63"}
What is the probability of at least one 100-year event in a century?
::: solution
$1 - (1 - 0.01)^{100} = 1 - 0.366 = 0.63$. The complementary $37\%$ is why "we did not have a 100-year flood, so the design level is too high" is not a valid inference from a single century.
:::
:::

::: exercise Mann–Kendall {level=3}
A 20-year series shows 170 concordant and 20 discordant pairs. Compute the Mann–Kendall statistic $S$, its variance under the null, and the standardised test statistic.
::: solution
$S = 170 - 20 = 150$. With no ties, $\mathrm{Var}(S) = n(n-1)(2n+5)/18 = 20\times19\times45/18 = 950$, so $Z = (150 - 1)/\sqrt{950} = 4.84$. The trend is significant at far better than $1\%$. The Mann–Kendall test is rank-based, so it is insensitive to outliers and to the shape of the distribution — which is why it is preferred for rainfall and hydrological series — but it assumes no autocorrelation, and serial correlation inflates its significance badly, returning to the problem of [[#def-rednoise]].
:::
:::

::: exercise Coverage and averaging {level=3}
A network measures 40 grid cells, of which 30 report. The missing 10 are all in the polar region, which warms twice as fast as the global mean. If the true global trend is $0.20\ \mathrm{K\,decade^{-1}}$, what trend does the incomplete network report, and what is the general lesson?
::: solution
The true global trend is $(30\times0.20 + 10\times0.40)/40 = 0.25\ \mathrm{K\,decade^{-1}}$; dropping the polar cells reports $0.20$, a $20\%$ underestimate. If instead the missing cells are filled by kriging from neighbours, the estimate is unbiased provided the covariance model is right.

The lesson is that missing data are only harmless when missing at random, and in the observing systems that matter they are not: the Arctic, the tropics, the deep ocean and the Southern Ocean are exactly the places with the largest changes and the fewest measurements. This is why the polar-orbiting satellite era after 1979 and the Argo float array after 2004 produced measurable revisions to the estimated rate of warming and of ocean heat uptake, rather than merely narrowing the error bars ([[climate-change/observed-change]]).
:::
:::

::: exercise Non-stationary extremes {level=3}
Daily rainfall maxima at a station are Gumbel with $\sigma = 12\ \mathrm{mm}$. Over 1960–2020 the mean increased by $0.9\ \mathrm{mm}$ and the shape parameter is $\xi = 0.12$. Estimate the change in the 50-year return level, and explain why the mean shift alone is a poor description.
::: solution
With a stationary fit the 50-year level is $\mu + 12\times3.90 = \mu + 46.8\ \mathrm{mm}$. Adding a mean shift of $0.9\ \mathrm{mm}$ gives $+0.9\ \mathrm{mm}$, a $1.9\%$ increase. But with $\xi > 0$ the scale of the upper tail also responds to warming at the Clausius–Clapeyron rate: if $\sigma$ grows by $7\%$ per kelvin and the relevant warming is $1.2\ \mathrm{K}$, $\sigma$ rises by $10\%$, adding $0.1\times12\times3.90 = 4.7\ \mathrm{mm}$ — five times the mean-shift effect.

This is the standard result for heavy-tailed variables: the extreme changes far more than the central tendency, and a model or a bias correction that matches mean rainfall will still badly under-predict the 50-year event. It is why convective-allowing resolution and stochastic parameterisation of convection matter for rainfall extremes, and why the observed increase in sub-daily rainfall intensity is close to $7\%\ \mathrm{K^{-1}}$ while the increase in mean precipitation is a few per cent ([[climate-change/extremes]]).
:::
:::
